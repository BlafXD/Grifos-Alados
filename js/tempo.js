// ═══════════════════════════════════════════════════════════════════
//  TEMPO.JS — Tempo entre aventuras (Tormenta 20)
//  Ferramenta do mestre para resolver o tempo entre aventuras:
//    • Busca       — rolador de 2d12 (Tabela 6-6), conta sucessos e rola
//                    recompensas/castigos (Tabelas 6-7 e 1d6).
//    • Treinamento — três testes CD 10 + ½ nível; benefícios do próximo nível.
//    • Custo de Vida — calculadora da variante (custo mensal × descanso).
//    • Registro por jogador — diário das ações mensais (salvo no navegador).
//    • Tabelas de referência — 6-6, 6-7, recompensas & castigos.
//  Os roladores são transitórios (não são salvos); o registro é persistido.
// ═══════════════════════════════════════════════════════════════════

(function () {
  'use strict';

  const STORAGE_KEY = 'grifosAlados.tempo';

  const BUSCAS        = window.TEMPO_BUSCAS || [];
  const CONSEQ        = window.TEMPO_CONSEQUENCIAS || [];
  const RC            = window.TEMPO_RECOMP_CASTIGO || [];
  const RECOMPENSAS   = window.TEMPO_RECOMPENSAS || [];
  const CASTIGOS      = window.TEMPO_CASTIGOS || [];
  const CUSTO_VIDA    = window.TEMPO_CUSTO_VIDA || [];
  const TREINO_BENEF  = window.TEMPO_TREINO_BENEFICIOS || [];
  const MEDIDAS       = window.TEMPO_MEDIDAS || [];
  const ACOES         = window.TEMPO_ACOES || [];

  let dados = { config: { medida: 'mes', custoVida: 'medio' }, jogadores: [] };

  // Estado transitório dos roladores (não é salvo — reinicia a cada carga).
  let ui = {
    busca:  { nivel: 1, ousada: false, desc: '', p1: '', p2: '', p3: null, suc: [false, false, false], resultados: null },
    treino: { nivel: 1, atributo: '', pago: false, suc: [false, false, false] },
  };

  // ── PERSISTÊNCIA ─────────────────────────────────────────────────
  function carregar() {
    try {
      const txt = localStorage.getItem(STORAGE_KEY);
      if (txt) dados = JSON.parse(txt);
    } catch (e) { console.warn('[tempo] não carregou:', e.message); }
    if (!dados || typeof dados !== 'object') dados = {};
    if (!dados.config || typeof dados.config !== 'object') dados.config = {};
    if (!MEDIDAS.some(m => m.chave === dados.config.medida)) dados.config.medida = 'mes';
    if (!CUSTO_VIDA.some(c => c.chave === dados.config.custoVida)) dados.config.custoVida = 'medio';
    if (!Array.isArray(dados.jogadores)) dados.jogadores = [];
    dados.jogadores.forEach(normalizarJogador);
  }

  let _t = null;
  function _gravar() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(dados)); }
    catch (e) { console.warn('[tempo] não salvou:', e.message); }
  }
  function salvar()      { clearTimeout(_t); _t = setTimeout(_gravar, 250); }
  function salvarAgora() { clearTimeout(_t); _gravar(); }

  // ── AUXILIARES ───────────────────────────────────────────────────
  function uid(p) { return p + '_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
  const esc = window.GA_esc;
  const d = n => Math.floor(Math.random() * n) + 1;

  function normalizarJogador(j) {
    if (!j.id) j.id = uid('jg');
    if (typeof j.nome !== 'string') j.nome = '';
    if (!CUSTO_VIDA.some(c => c.chave === j.custoVida)) j.custoVida = 'medio';
    if (!Array.isArray(j.acoes)) j.acoes = [];
    j.acoes.forEach(a => {
      if (!a.id) a.id = uid('ac');
      if (typeof a.mes !== 'string') a.mes = '';
      if (!ACOES.some(x => x.chave === a.tipo)) a.tipo = 'busca';
      if (typeof a.nota !== 'string') a.nota = '';
    });
  }

  const custoVidaDef = ch => CUSTO_VIDA.find(c => c.chave === ch) || CUSTO_VIDA[1];
  const cdBusca  = () => 20 + Math.floor((ui.busca.nivel || 0) / 2) + (ui.busca.ousada ? 5 : 0);
  const cdTreino = () => 10 + Math.floor((ui.treino.nivel || 0) / 2);

  function descRecompensa(nome) { const b = nome.split(' (')[0]; const r = RECOMPENSAS.find(x => x.nome === b); return r ? r.desc : ''; }
  function descCastigo(nome)    { const b = nome.split(' (')[0]; const c = CASTIGOS.find(x => x.nome === b); return c ? c.desc : ''; }

  // ═══════════════════════════════════════════════════════════════
  //  RENDERIZAÇÃO
  // ═══════════════════════════════════════════════════════════════
  function render() {
    const cont = document.getElementById('tempo-content');
    if (!cont) return;
    cont.innerHTML =
      blocoCabecalho() +
      blocoBusca() +
      blocoTreinamento() +
      blocoCustoVida() +
      blocoRegistro() +
      blocoReferencia();
  }

  function blocoCabecalho() {
    const medOpts = MEDIDAS.map(m =>
      `<option value="${m.chave}" ${m.chave === dados.config.medida ? 'selected' : ''}>${esc(m.nome)}</option>`).join('');
    return `
      <div class="tp-cabecalho">
        <h1>Tempo entre Aventuras</h1>
        <p class="tp-subtitulo">O aperitivo da campanha: trabalho, treinamento e buscas entre uma missão e outra</p>
        <label class="tp-medida">Uma ação
          <select class="tp-select" data-campo="medida">${medOpts}</select>
        </label>
      </div>`;
  }

  // ── BUSCA ──
  function blocoBusca() {
    const b = ui.busca;
    const p3 = b.p3;
    const sucCount = b.suc.filter(Boolean).length;
    const conseq = CONSEQ.find(c => c.s === sucCount) || CONSEQ[0];

    const chks = b.suc.map((on, i) =>
      `<label class="tp-suc"><input type="checkbox" data-campo="busca-suc" data-i="${i}" ${on ? 'checked' : ''}><span>${i + 1}º</span></label>`).join('');

    let resultadosHtml = '';
    if (b.resultados) {
      if (!b.resultados.length) {
        resultadosHtml = `<div class="tp-resultado tp-resultado--neutro">Nenhuma consequência (1 sucesso).</div>`;
      } else {
        resultadosHtml = b.resultados.map(r => `
          <div class="tp-resultado tp-resultado--${r.tipo}">
            <span class="tp-resultado-rot">${r.tipo === 'recompensa' ? '🎁 Recompensa' : '⚠ Castigo'} · 1d6 = ${r.d}</span>
            <strong>${esc(r.nome)}</strong>
            ${r.desc ? `<span class="tp-resultado-desc">${esc(r.desc)}</span>` : ''}
          </div>`).join('');
      }
    }

    return `
      <div class="tp-bloco tp-busca">
        <h2 class="tp-bloco-tit">🔎 Busca</h2>
        <p class="tp-bloco-dica">Qualquer meta que não seja ganhar dinheiro ou poder. Três perícias (1ª do jogador, 2ª do mestre, 3ª aleatória), cada teste com CD 20 + ½ nível.</p>

        <label class="tp-campo tp-campo--full">Descrição da busca
          <input class="tp-input" type="text" data-campo="busca-desc" value="${esc(b.desc)}" placeholder="ex.: investigar o paradeiro do vampiro">
        </label>

        <div class="tp-linha">
          <label class="tp-campo">Perícia 1 — jogador
            <input class="tp-input" type="text" data-campo="busca-p1" value="${esc(b.p1)}" placeholder="ex.: Investigação">
          </label>
          <label class="tp-campo">Perícia 2 — mestre
            <input class="tp-input" type="text" data-campo="busca-p2" value="${esc(b.p2)}" placeholder="ex.: Diplomacia">
          </label>
          <div class="tp-campo">
            <span class="tp-campo-rot">Perícia 3 — aleatória (2d12)</span>
            <div class="tp-p3">
              <button class="tp-btn-dado" data-acao="busca-rolar-p3">🎲 Rolar</button>
              ${p3 ? `<span class="tp-p3-out"><strong>${p3.n}</strong> · ${esc(p3.pericia)} — ${esc(p3.ex)}</span>` : `<span class="tp-p3-vazio">—</span>`}
            </div>
          </div>
        </div>

        <div class="tp-linha tp-linha--cd">
          <label class="tp-campo tp-campo--nivel">Nível do personagem
            <input class="tp-input tp-input--num" type="number" min="1" max="20" data-campo="busca-nivel" value="${esc(b.nivel)}">
          </label>
          <div class="tp-cd">CD dos testes: <strong class="tp-cd-val">${cdBusca()}</strong></div>
          <label class="tp-chk"><input type="checkbox" data-campo="busca-ousada" ${b.ousada ? 'checked' : ''}> Busca ousada (+5 na CD; recompensa extra com 2-3 sucessos)</label>
        </div>

        <div class="tp-linha tp-linha--suc">
          <span class="tp-suc-rot">Sucessos nos 3 testes:</span>
          ${chks}
          <span class="tp-suc-cont">${sucCount} de 3 → <strong>${esc(conseq.txt)}</strong></span>
        </div>

        <div class="tp-acoes-linha">
          <button class="tp-btn" data-acao="busca-rolar-conseq">🎲 Rolar consequência</button>
          <button class="tp-btn tp-btn--sec" data-acao="busca-limpar">↺ Limpar</button>
        </div>
        ${resultadosHtml ? `<div class="tp-resultados">${resultadosHtml}</div>` : ''}
      </div>`;
  }

  // ── TREINAMENTO ──
  function blocoTreinamento() {
    const t = ui.treino;
    const sucCount = t.suc.filter(Boolean).length;
    const chks = t.suc.map((on, i) =>
      `<label class="tp-suc"><input type="checkbox" data-campo="treino-suc" data-i="${i}" ${on ? 'checked' : ''}><span>${i + 1}º</span></label>`).join('');

    const passou = sucCount >= 2;
    const custoPago = 100 * (t.nivel || 0);
    let resultado = '';
    if (passou) {
      resultado = `
        <div class="tp-resultado tp-resultado--recompensa">
          <span class="tp-resultado-rot">✔ Passou (${sucCount}/3) — escolha um benefício do próximo nível:</span>
          <ul class="tp-benef">${TREINO_BENEF.map(x => `<li>${esc(x.txt)}</li>`).join('')}</ul>
        </div>`;
    } else if (sucCount >= 0) {
      resultado = `<div class="tp-resultado tp-resultado--neutro">${sucCount} sucesso${sucCount !== 1 ? 's' : ''} — passa com 2 ou mais. Falhar não traz penalidade (só o tempo perdido).</div>`;
    }

    return `
      <div class="tp-bloco tp-treino">
        <h2 class="tp-bloco-tit">📈 Treinamento</h2>
        <p class="tp-bloco-dica">Descreva o treino e escolha um atributo relacionado. Faça três testes (CD 10 + ½ nível). Passando em ≥2, ganha um benefício do próximo nível (perdido ao subir de nível).</p>

        <div class="tp-linha tp-linha--cd">
          <label class="tp-campo">Atributo / descrição do treino
            <input class="tp-input" type="text" data-campo="treino-atributo" value="${esc(t.atributo)}" placeholder="ex.: Força (exercícios físicos)">
          </label>
          <label class="tp-campo tp-campo--nivel">Nível do personagem
            <input class="tp-input tp-input--num" type="number" min="1" max="20" data-campo="treino-nivel" value="${esc(t.nivel)}">
          </label>
          <div class="tp-cd">CD dos testes: <strong class="tp-cd-val">${cdTreino()}</strong></div>
        </div>

        <div class="tp-linha tp-linha--suc">
          <span class="tp-suc-rot">Sucessos nos 3 testes:</span>
          ${chks}
        </div>

        <label class="tp-chk"><input type="checkbox" data-campo="treino-pago" ${t.pago ? 'checked' : ''}> Variante: pagar pelo treino (T$ 100 × nível = <strong>T$ ${custoPago.toLocaleString('pt-BR')}</strong>, pago antes dos testes)</label>

        <div class="tp-acoes-linha">
          <button class="tp-btn tp-btn--sec" data-acao="treino-limpar">↺ Limpar</button>
        </div>
        ${resultado}
      </div>`;
  }

  // ── CUSTO DE VIDA ──
  function blocoCustoVida() {
    const sel = custoVidaDef(dados.config.custoVida);
    const opts = CUSTO_VIDA.map(c =>
      `<option value="${c.chave}" ${c.chave === dados.config.custoVida ? 'selected' : ''}>${esc(c.nome)} — T$ ${c.preco}/mês</option>`).join('');
    return `
      <div class="tp-bloco tp-custovida">
        <h2 class="tp-bloco-tit">💰 Custo de Vida <span class="tp-bloco-tag">variante</span></h2>
        <p class="tp-bloco-dica">Em vez de pagar cada refeição e estadia, pague um custo mensal de sustento. Ele define a condição de descanso padrão.</p>
        <div class="tp-linha tp-linha--cd">
          <label class="tp-campo">Padrão de vida
            <select class="tp-select" data-campo="custovida-ref">${opts}</select>
          </label>
          <div class="tp-custovida-out">
            <span class="tp-custovida-preco">T$ ${sel.preco}/mês</span>
            <span class="tp-custovida-cond">Descanso: <strong>${esc(sel.cond)}</strong></span>
            <span class="tp-custovida-desc">${esc(sel.desc)}</span>
          </div>
        </div>
      </div>`;
  }

  // ── REGISTRO POR JOGADOR ──
  function blocoRegistro() {
    let cards = '';
    if (!dados.jogadores.length) {
      cards = `<p class="tp-vazio-mini">Nenhum jogador no registro. Adicione um para anotar as ações de cada um.</p>`;
    } else {
      cards = dados.jogadores.map((j, ji) => {
        const cvOpts = CUSTO_VIDA.map(c =>
          `<option value="${c.chave}" ${c.chave === j.custoVida ? 'selected' : ''}>${esc(c.nome)} (T$ ${c.preco})</option>`).join('');
        let acoesHtml = '';
        if (!j.acoes.length) {
          acoesHtml = `<p class="tp-vazio-mini">Sem ações registradas.</p>`;
        } else {
          acoesHtml = j.acoes.map((a, ai) => {
            const tipoOpts = ACOES.map(x =>
              `<option value="${x.chave}" ${x.chave === a.tipo ? 'selected' : ''}>${x.icone} ${esc(x.nome)}</option>`).join('');
            return `
              <div class="tp-acao">
                <input class="tp-input tp-input--mes" type="text" data-campo="acao-mes" data-j="${ji}" data-a="${ai}" value="${esc(a.mes)}" placeholder="quando (ex.: Mês 1)">
                <select class="tp-select tp-select--tipo" data-campo="acao-tipo" data-j="${ji}" data-a="${ai}">${tipoOpts}</select>
                <input class="tp-input tp-input--nota" type="text" data-campo="acao-nota" data-j="${ji}" data-a="${ai}" value="${esc(a.nota)}" placeholder="o que fez / resultado…">
                <button class="tp-mini tp-mini--del" data-acao="del-acao" data-j="${ji}" data-a="${ai}" title="Remover ação">✕</button>
              </div>`;
          }).join('');
        }
        return `
          <div class="tp-jogador">
            <div class="tp-jogador-cab">
              <input class="tp-input tp-jogador-nome" type="text" data-campo="jogador-nome" data-j="${ji}" value="${esc(j.nome)}" placeholder="Nome do personagem / jogador">
              <label class="tp-jogador-cv">Custo de vida
                <select class="tp-select tp-select--mini" data-campo="jogador-cv" data-j="${ji}">${cvOpts}</select>
              </label>
              <button class="tp-mini tp-mini--del" data-acao="del-jogador" data-j="${ji}" title="Remover jogador">✕</button>
            </div>
            <div class="tp-acoes">${acoesHtml}</div>
            <button class="tp-add tp-add--acao" data-acao="add-acao" data-j="${ji}">＋ Ação</button>
          </div>`;
      }).join('');
    }
    return `
      <div class="tp-bloco tp-registro">
        <h2 class="tp-bloco-tit">🧑‍🤝‍🧑 Registro por jogador</h2>
        <p class="tp-bloco-dica">Anote o que cada personagem fez no tempo livre — uma ação por ${esc((MEDIDAS.find(m => m.chave === dados.config.medida) || MEDIDAS[0]).nome.toLowerCase().replace('por ', ''))}.</p>
        ${cards}
        <button class="tp-add tp-add--jogador" data-acao="add-jogador">＋ Jogador</button>
      </div>`;
  }

  // ── REFERÊNCIA (tabelas) ──
  function blocoReferencia() {
    const busca66 = BUSCAS.map(x => `<tr><td>${x.n}</td><td>${esc(x.pericia)}</td><td>${esc(x.ex)}</td></tr>`).join('');
    const conseq67 = CONSEQ.map(x => `<tr><td>${x.s}</td><td>${esc(x.txt)}</td></tr>`).join('');
    const rc = RC.map(x => `<tr><td>${x.d}</td><td>${esc(x.recompensa)}</td><td>${esc(x.castigo)}</td></tr>`).join('');
    const recDesc = RECOMPENSAS.map(x => `<li><strong>${esc(x.nome)}.</strong> ${esc(x.desc)}</li>`).join('');
    const casDesc = CASTIGOS.map(x => `<li><strong>${esc(x.nome)}.</strong> ${esc(x.desc)}</li>`).join('');

    return `
      <div class="tp-bloco tp-ref">
        <h2 class="tp-bloco-tit">📖 Tabelas de referência</h2>

        <details class="tp-det">
          <summary>Tabela 6-6 · Desafios de Buscas (2d12)</summary>
          <table class="tp-tabela"><thead><tr><th>2d12</th><th>Perícia</th><th>Exemplo</th></tr></thead><tbody>${busca66}</tbody></table>
        </details>

        <details class="tp-det">
          <summary>Tabela 6-7 · Consequências de Buscas</summary>
          <table class="tp-tabela"><thead><tr><th>Sucessos</th><th>Consequência</th></tr></thead><tbody>${conseq67}</tbody></table>
        </details>

        <details class="tp-det">
          <summary>Recompensas &amp; Castigos (role 1d6 por consequência)</summary>
          <table class="tp-tabela"><thead><tr><th>1d6</th><th>Recompensa</th><th>Castigo</th></tr></thead><tbody>${rc}</tbody></table>
          <div class="tp-ref-cols">
            <div><h4 class="tp-ref-sub">🎁 Recompensas</h4><ul class="tp-ref-lista">${recDesc}</ul></div>
            <div><h4 class="tp-ref-sub">⚠ Castigos</h4><ul class="tp-ref-lista">${casDesc}</ul></div>
          </div>
        </details>
      </div>`;
  }

  // ═══════════════════════════════════════════════════════════════
  //  EVENTOS
  // ═══════════════════════════════════════════════════════════════
  function aoClicar(e) {
    const alvo = e.target.closest('[data-acao]');
    if (!alvo) return;
    const acao = alvo.dataset.acao;

    if (acao === 'busca-rolar-p3') {
      const n = d(12) + d(12);
      ui.busca.p3 = BUSCAS.find(x => x.n === n) || null;
      render(); return;
    }
    if (acao === 'busca-rolar-conseq') {
      ui.busca.resultados = rolarConsequencia();
      render(); return;
    }
    if (acao === 'busca-limpar') {
      ui.busca.suc = [false, false, false]; ui.busca.p3 = null; ui.busca.resultados = null;
      render(); return;
    }
    if (acao === 'treino-limpar') {
      ui.treino.suc = [false, false, false];
      render(); return;
    }
    if (acao === 'add-jogador') {
      dados.jogadores.push({ id: uid('jg'), nome: '', custoVida: dados.config.custoVida || 'medio', acoes: [] });
      salvar(); render(); return;
    }
    if (acao === 'del-jogador') {
      const j = dados.jogadores[+alvo.dataset.j];
      if (j && (j.nome || j.acoes.length) && !confirm('Remover este jogador e suas ações?')) return;
      dados.jogadores.splice(+alvo.dataset.j, 1);
      salvar(); render(); return;
    }
    if (acao === 'add-acao') {
      const j = dados.jogadores[+alvo.dataset.j];
      if (j) { j.acoes.push({ id: uid('ac'), mes: '', tipo: 'busca', nota: '' }); salvar(); render(); }
      return;
    }
    if (acao === 'del-acao') {
      const j = dados.jogadores[+alvo.dataset.j];
      if (j) { j.acoes.splice(+alvo.dataset.a, 1); salvar(); render(); }
      return;
    }
  }

  function rolarConsequencia() {
    const sucCount = ui.busca.suc.filter(Boolean).length;
    const conseq = CONSEQ.find(c => c.s === sucCount) || CONSEQ[0];
    let qtd = conseq.qtd;
    if (ui.busca.ousada && sucCount >= 2) qtd += 1;   // variante ousada: recompensa a mais
    const res = [];
    for (let i = 0; i < qtd; i++) {
      const roll = d(6);
      const linha = RC[roll - 1];
      if (conseq.tipo === 'recompensa') {
        res.push({ tipo: 'recompensa', d: roll, nome: linha.recompensa, desc: descRecompensa(linha.recompensa) });
      } else if (conseq.tipo === 'castigo') {
        res.push({ tipo: 'castigo', d: roll, nome: linha.castigo, desc: descCastigo(linha.castigo) });
      }
    }
    return res;   // pode ser [] (nenhuma consequência)
  }

  // input — campos de texto/número (não re-renderiza; mantém o foco)
  function aoEntrada(e) {
    const el = e.target;
    const campo = el.dataset && el.dataset.campo;
    if (!campo) return;

    if (campo === 'busca-desc') { ui.busca.desc = el.value; return; }
    if (campo === 'busca-p1')   { ui.busca.p1 = el.value; return; }
    if (campo === 'busca-p2')   { ui.busca.p2 = el.value; return; }
    if (campo === 'busca-nivel') {
      ui.busca.nivel = parseInt(el.value, 10) || 0;
      atualizarCD(el, '.tp-busca', cdBusca()); return;
    }
    if (campo === 'treino-atributo') { ui.treino.atributo = el.value; return; }
    if (campo === 'treino-nivel') {
      ui.treino.nivel = parseInt(el.value, 10) || 0;
      atualizarCD(el, '.tp-treino', cdTreino());
      // atualiza o custo do treino pago, se visível
      const card = el.closest('.tp-treino');
      const strong = card && card.querySelector('.tp-chk strong');
      if (strong) strong.textContent = 'T$ ' + (100 * (ui.treino.nivel || 0)).toLocaleString('pt-BR');
      return;
    }
    // registro por jogador
    if (campo === 'jogador-nome') { const j = dados.jogadores[+el.dataset.j]; if (j) { j.nome = el.value; salvar(); } return; }
    if (campo === 'acao-mes')  { const j = dados.jogadores[+el.dataset.j]; if (j && j.acoes[+el.dataset.a]) { j.acoes[+el.dataset.a].mes = el.value; salvar(); } return; }
    if (campo === 'acao-nota') { const j = dados.jogadores[+el.dataset.j]; if (j && j.acoes[+el.dataset.a]) { j.acoes[+el.dataset.a].nota = el.value; salvar(); } return; }
  }

  function atualizarCD(el, escopo, valor) {
    const card = el.closest(escopo);
    const cd = card && card.querySelector('.tp-cd-val');
    if (cd) cd.textContent = valor;
  }

  // change — selects e checkboxes (re-renderiza p/ recalcular)
  function aoMudar(e) {
    const el = e.target;
    const campo = el.dataset && el.dataset.campo;
    if (!campo) return;

    if (campo === 'medida') { dados.config.medida = el.value; salvar(); render(); return; }
    if (campo === 'custovida-ref') { dados.config.custoVida = el.value; salvar(); render(); return; }

    if (campo === 'busca-suc') { ui.busca.suc[+el.dataset.i] = el.checked; ui.busca.resultados = null; render(); return; }
    if (campo === 'busca-ousada') { ui.busca.ousada = el.checked; ui.busca.resultados = null; render(); return; }
    if (campo === 'treino-suc') { ui.treino.suc[+el.dataset.i] = el.checked; render(); return; }
    if (campo === 'treino-pago') { ui.treino.pago = el.checked; render(); return; }

    if (campo === 'jogador-cv') { const j = dados.jogadores[+el.dataset.j]; if (j) { j.custoVida = el.value; salvar(); render(); } return; }
    if (campo === 'acao-tipo')  { const j = dados.jogadores[+el.dataset.j]; if (j && j.acoes[+el.dataset.a]) { j.acoes[+el.dataset.a].tipo = el.value; salvar(); } return; }
  }

  // ── INICIALIZAÇÃO ────────────────────────────────────────────────
  function init() {
    const secao = document.getElementById('tempo');
    if (!secao) return;
    carregar();
    try { render(); }
    catch (err) {
      console.error('[tempo] falha ao renderizar:', err);
      const cont = document.getElementById('tempo-content');
      if (cont) cont.innerHTML = `<div class="tp-erro"><strong>Erro ao montar a aba:</strong><br>${esc(err && err.message ? err.message : String(err))}</div>`;
    }
    secao.addEventListener('click', aoClicar);
    secao.addEventListener('input', aoEntrada);
    secao.addEventListener('change', aoMudar);
    window.addEventListener('beforeunload', salvarAgora);
    document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') salvarAgora(); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

})();
