// ═══════════════════════════════════════════════════════════════════
//  CRIACAO-ITENS.JS — Sub-aba "🔨 Criação de Itens" (consulta rápida)
//  Calculadora de melhorias/encantos (preço + CD, com "Outros CD" e
//  fração de fabricação editáveis) + cards de regras recolhíveis.
//  Lê window.GA_CRIACAO_ITENS (dados) e window.LojaCompleta (catálogo,
//  para a busca de item — carregar DEPOIS de loja_completa.js).
//  Mesmo motor de cards/busca de acoes.js (.vc-*/.cr-*/.prog-table).
// ═══════════════════════════════════════════════════════════════════
(function () {
  'use strict';

  const esc       = window.GA_esc;
  const nl2br     = window.GA_nl2br;
  const semAcento = window.GA_semAcento;

  const CHAVE_TABELA = 'grifosAlados.criacaoItensTabela';

  // categorias de item geral (kind 'misc') que podem receber melhorias
  const CATS_MISC_ELEGIVEIS = new Set(['Ferramentas', 'Vestuário', 'Esotéricos']);

  // opções da categoria (define a CD base de fabricação)
  const CATEGORIA_OPCOES = [
    { id: 'arma-simples',    rotulo: 'Arma simples',                        cd: 15 },
    { id: 'arma-marcial',    rotulo: 'Arma marcial, exótica ou de fogo',    cd: 20 },
    { id: 'armadura-leve',   rotulo: 'Armadura leve ou escudo',             cd: 15 },
    { id: 'armadura-pesada', rotulo: 'Armadura pesada',                     cd: 20 },
    { id: 'ferramenta',      rotulo: 'Ferramenta',                          cd: 20 },
    { id: 'vestuario',       rotulo: 'Vestuário',                           cd: 20 },
    { id: 'esoterico',       rotulo: 'Esotérico (exige treino em Misticismo)', cd: 20 },
    { id: 'personalizado',   rotulo: 'Personalizado (CD editável)',         cd: null },
  ];

  // ── formatação ─────────────────────────────────────────────────────
  function fmtT(n) {
    const v = Number(n) || 0;
    return 'T$ ' + v.toLocaleString('pt-BR', { maximumFractionDigits: 2 });
  }
  function fmtSinal(n) {
    const v = Number(n) || 0;
    return (v >= 0 ? '+' : '') + v.toLocaleString('pt-BR', { maximumFractionDigits: 2 });
  }

  // ── tabela de preços editável (melhorias/encantos) — persistida ────
  function tabelaPadrao() {
    const D = window.GA_CRIACAO_ITENS;
    return {
      melhorias: D.MELHORIAS_PADRAO.map(m => ({ n: m.n, preco: m.preco, cd: m.cd })),
      encantos:  D.ENCANTOS_PADRAO.map(e => ({ n: e.n, preco: e.preco, cd: e.cd, estimado: !!e.estimado })),
    };
  }
  function carregarTabela() {
    try {
      const txt = localStorage.getItem(CHAVE_TABELA);
      if (txt) {
        const t = JSON.parse(txt);
        if (t && Array.isArray(t.melhorias) && Array.isArray(t.encantos)) return t;
      }
    } catch (e) { console.warn('[criacao-itens] não foi possível carregar a tabela:', e.message); }
    return tabelaPadrao();
  }
  function salvarTabela(tab) {
    try { localStorage.setItem(CHAVE_TABELA, JSON.stringify(tab)); }
    catch (e) { console.warn('[criacao-itens] não foi possível salvar a tabela:', e.message); }
  }

  let TAB = null; // carregada no init()

  // ── catálogo de itens (via LojaCompleta) ────────────────────────────
  function itemElegivel(it) {
    if (it.kind === 'weapon' || it.kind === 'armor') return true;
    if (it.kind === 'misc') return CATS_MISC_ELEGIVEIS.has(it.categoria);
    return false;
  }
  function categoriaAutoDetectada(it) {
    if (it.kind === 'weapon') return 'arma-marcial';
    if (it.kind === 'armor')  return (it.categoria === 'Armaduras Pesadas') ? 'armadura-pesada' : 'armadura-leve';
    if (it.categoria === 'Ferramentas') return 'ferramenta';
    if (it.categoria === 'Vestuário')   return 'vestuario';
    if (it.categoria === 'Esotéricos')  return 'esoterico';
    return 'personalizado';
  }
  function itensBuscar(termo) {
    const LC = (typeof LojaCompleta !== 'undefined') ? LojaCompleta : window.LojaCompleta;
    if (!LC || !LC.catalogoNomes) return [];
    const t = semAcento(String(termo || '').trim());
    if (!t) return [];
    const vistos = new Set();
    const out = [];
    LC.catalogoNomes().forEach(it => {
      if (!itemElegivel(it)) return;
      const chave = semAcento(it.nome);
      if (vistos.has(chave) || chave.indexOf(t) < 0) return;
      vistos.add(chave);
      const st = LC.statsDeItem ? LC.statsDeItem(it.nome) : null;
      out.push({ nome: it.nome, kind: it.kind, categoria: it.categoria, preco: st ? st.preco : null });
    });
    out.sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
    return out.slice(0, 25);
  }

  // ── cards de referência (mesmo motor de acoes.js) ───────────────────
  function tabelaHTML(t) {
    if (!t || !Array.isArray(t.cab) || !Array.isArray(t.linhas)) return '';
    const key = Number.isInteger(t.destaque) ? t.destaque : -1;
    const cls = i => (i === key ? ' class="prog-col-key"' : '');
    const ths = t.cab.map((c, i) => `<th${cls(i)}>${esc(c)}</th>`).join('');
    const trs = t.linhas.map(linha =>
      `<tr>${linha.map((c, i) => `<td${cls(i)}>${esc(c)}</td>`).join('')}</tr>`).join('');
    const cap  = t.titulo ? `<caption>${esc(t.titulo)}</caption>` : '';
    const nota = t.nota ? `<p class="prog-table-nota">${esc(t.nota)}</p>` : '';
    return `<div class="prog-table-wrap"><table class="prog-table">${cap}` +
           `<thead><tr>${ths}</tr></thead><tbody>${trs}</tbody></table></div>${nota}`;
  }
  function cardRegra(r) {
    const txtTab = r.tabela
      ? [(r.tabela.cab || []).join(' '), ...(r.tabela.linhas || []).map(l => l.join(' ')), r.tabela.nota || ''].join(' ')
      : '';
    const busca = semAcento([r.titulo, r.texto, txtTab, r.grupo].join(' '));
    const corpo = [
      r.texto ? `<div class="vc-regras">${nl2br(r.texto)}</div>` : '',
      tabelaHTML(r.tabela),
    ].join('');
    const cls = 'vc-card vc-card--regra' + (r.tabela ? ' vc-card--tabela' : '');
    return `
      <details class="${cls}" data-busca="${esc(busca)}">
        <summary class="vc-card-cab"><span class="vc-card-nome">${esc(r.titulo)}</span></summary>
        <div class="vc-card-corpo">${corpo}</div>
      </details>`;
  }

  // ── a calculadora ────────────────────────────────────────────────────
  function htmlCalculadora() {
    const catOpts = CATEGORIA_OPCOES.map(c => `<option value="${c.id}">${esc(c.rotulo)}</option>`).join('');
    return `
      <div class="ci-calc">
        <div class="ci-calc-cab">🔨 Calculadora — melhorias e encantos</div>

        <div class="ci-item-modo">
          <button type="button" class="ci-modo-btn ci-modo-btn--ativo" data-ci-modo="catalogo">📖 Item do catálogo</button>
          <button type="button" class="ci-modo-btn" data-ci-modo="custom">✏ Personalizado</button>
        </div>

        <div class="ci-item-catalogo">
          <input type="text" class="ci-busca-item" placeholder="Buscar item elegível (arma, armadura, escudo, ferramenta, vestuário, esotérico)…" autocomplete="off">
          <div class="ci-item-resultados" hidden></div>
        </div>

        <div class="ci-item-custom" hidden>
          <input type="text" class="ci-custom-nome" placeholder="Nome do item">
          <input type="number" class="ci-custom-preco" placeholder="Preço base (T$)" min="0" step="0.1" value="0">
        </div>

        <div class="ci-item-escolhido" hidden></div>

        <div class="ci-calc-linha">
          <label>Categoria (define a CD base de fabricação)</label>
          <select class="ci-select ci-categoria">${catOpts}</select>
        </div>
        <div class="ci-calc-linha ci-cd-custom-linha" hidden>
          <label>CD base (personalizada)</label>
          <input type="number" class="ci-input ci-cd-custom" value="15" step="1">
        </div>

        <div class="ci-calc-grade">
          <div class="ci-campo">
            <label>Melhorias</label>
            <select class="ci-select ci-melhorias"></select>
          </div>
          <div class="ci-campo">
            <label>Encantos</label>
            <select class="ci-select ci-encantos"></select>
          </div>
          <div class="ci-campo">
            <label>Outros CD</label>
            <input type="number" class="ci-input ci-outros-cd" value="0" step="1">
          </div>
          <div class="ci-campo">
            <label>Fração p/ fabricar</label>
            <div class="ci-fracao-wrap">
              <select class="ci-select ci-fracao">
                <option value="3">1/3 (padrão)</option>
                <option value="4">1/4</option>
                <option value="5">1/5</option>
                <option value="6">1/6</option>
                <option value="custom">Outra…</option>
              </select>
              <input type="number" class="ci-input ci-fracao-custom" hidden min="1" step="1" value="3">
            </div>
          </div>
        </div>

        <div class="ci-resultado"></div>

        <details class="ci-ajustes">
          <summary>⚙ Ajustar tabela de preços (melhorias / encantos)</summary>
          <div class="ci-ajustes-corpo"></div>
        </details>
      </div>`;
  }

  function htmlAjustes() {
    const linha = (arr, rotuloSingular) => arr.map(x => `
      <tr>
        <td>${x.n} ${rotuloSingular}${x.n > 1 ? 's' : ''}${x.estimado ? ' <span class="ci-ajustes-estimado">⚠ estimado</span>' : ''}</td>
        <td><input type="number" class="ci-aj-preco" data-tipo="${rotuloSingular === 'melhoria' ? 'melhorias' : 'encantos'}" data-n="${x.n}" value="${x.preco}" min="0" step="1"></td>
        <td><input type="number" class="ci-aj-cd" data-tipo="${rotuloSingular === 'melhoria' ? 'melhorias' : 'encantos'}" data-n="${x.n}" value="${x.cd}" min="0" step="1"></td>
      </tr>`).join('');
    return `
      <p class="ci-ajustes-nota">O valor de 2 encantos não veio confirmado no Regras.txt (o livro só cita 1 e 3 nos exemplos) — está marcado ⚠ como estimativa. Se sua edição tiver outro número, corrija aqui; fica salvo automaticamente neste navegador.</p>
      <table class="ci-ajustes-tabela">
        <thead><tr><th>Melhorias</th><th>Aumento no preço (T$)</th><th>Aumento na CD</th></tr></thead>
        <tbody>${linha(TAB.melhorias, 'melhoria')}</tbody>
      </table>
      <table class="ci-ajustes-tabela">
        <thead><tr><th>Encantos</th><th>Aumento no preço (T$)</th><th>Aumento na CD</th></tr></thead>
        <tbody>${linha(TAB.encantos, 'encanto')}</tbody>
      </table>
      <button type="button" class="ci-restaurar" data-ci-restaurar>↺ Restaurar padrão do livro</button>`;
  }

  function popularSelectContagem(sel, arr, unidadeSingular) {
    const atual = sel.value;
    let opts = `<option value="0">Nenhum${unidadeSingular === 'melhoria' ? 'a' : ''}</option>`;
    arr.forEach(x => {
      const aviso = x.estimado ? ' ⚠' : '';
      opts += `<option value="${x.n}">${x.n} (${fmtSinal(x.preco)} T$ · CD ${fmtSinal(x.cd)})${aviso}</option>`;
    });
    sel.innerHTML = opts;
    if ([...sel.options].some(o => o.value === atual)) sel.value = atual;
  }

  function render() {
    const cont = document.getElementById('criacao-itens-content');
    if (!cont) return;

    const D = window.GA_CRIACAO_ITENS;
    if (!D || !Array.isArray(D.REGRAS) || !D.REGRAS.length) {
      cont.innerHTML = `<div class="cr-erro"><strong>Os dados não carregaram.</strong><br>
        Verifique se <code>js/criacao-itens-data.js</code> está incluído antes de <code>js/criacao-itens.js</code>.</div>`;
      return;
    }

    TAB = carregarTabela();

    const ordem = [];
    const grupos = {};
    D.REGRAS.forEach(r => {
      const g = r.grupo || 'Regras';
      if (!grupos[g]) { grupos[g] = []; ordem.push(g); }
      grupos[g].push(r);
    });
    const blocos = ordem.map(g => `
      <div class="vc-grupo">
        <h2 class="vc-grupo-titulo">${esc(g)}</h2>
        <div class="vc-lista">${grupos[g].map(cardRegra).join('')}</div>
      </div>`).join('');

    cont.innerHTML = `
      <div class="cr-cabecalho">
        <h1>🔨 Criação de Itens</h1>
        <p class="cr-sub">Monte um item superior/mágico na calculadora (preço e CD saem prontos) ou consulte as regras de fabricação, Ofício, itens superiores e itens mágicos.</p>
      </div>
      ${htmlCalculadora()}
      <input class="cr-busca" type="text" placeholder="Buscar regra (ofício, consertar, encantos, emulsão, bebida…)" autocomplete="off">
      ${blocos}`;

    wireCalculadora(cont);

    // ── busca (filtra os cards de regra) ──
    const busca = cont.querySelector('.cr-busca');
    busca.addEventListener('input', () => {
      const termo = semAcento(busca.value.trim());
      cont.querySelectorAll('.vc-card').forEach(c => {
        const bate = !termo || c.dataset.busca.indexOf(termo) >= 0;
        c.style.display = bate ? '' : 'none';
        c.open = !!termo && bate;
      });
      cont.querySelectorAll('.vc-grupo').forEach(g => {
        const algum = Array.from(g.querySelectorAll('.vc-card')).some(c => c.style.display !== 'none');
        g.style.display = algum ? '' : 'none';
      });
    });
  }

  function wireCalculadora(cont) {
    const elModoBtns    = cont.querySelectorAll('[data-ci-modo]');
    const elCatalogo     = cont.querySelector('.ci-item-catalogo');
    const elCustom       = cont.querySelector('.ci-item-custom');
    const elBuscaItem    = cont.querySelector('.ci-busca-item');
    const elResultados   = cont.querySelector('.ci-item-resultados');
    const elCustomNome   = cont.querySelector('.ci-custom-nome');
    const elCustomPreco  = cont.querySelector('.ci-custom-preco');
    const elEscolhido    = cont.querySelector('.ci-item-escolhido');
    const elCategoria    = cont.querySelector('.ci-categoria');
    const elCdCustomLin  = cont.querySelector('.ci-cd-custom-linha');
    const elCdCustom     = cont.querySelector('.ci-cd-custom');
    const elMelhorias    = cont.querySelector('.ci-melhorias');
    const elEncantos     = cont.querySelector('.ci-encantos');
    const elOutrosCD     = cont.querySelector('.ci-outros-cd');
    const elFracao       = cont.querySelector('.ci-fracao');
    const elFracaoCustom = cont.querySelector('.ci-fracao-custom');
    const elResultado    = cont.querySelector('.ci-resultado');
    const elAjustesCorpo = cont.querySelector('.ci-ajustes-corpo');

    let itemAtual = { nome: '', preco: 0 }; // { nome, preco }

    popularSelectContagem(elMelhorias, TAB.melhorias, 'melhoria');
    popularSelectContagem(elEncantos,  TAB.encantos,  'encanto');

    function atualizarEscolhido() {
      if (!itemAtual.nome) { elEscolhido.hidden = true; return; }
      elEscolhido.hidden = false;
      elEscolhido.innerHTML = `Item base: <b>${esc(itemAtual.nome)}</b> — preço ${fmtT(itemAtual.preco)}`;
    }

    // ── modo catálogo × personalizado ──
    elModoBtns.forEach(btn => btn.addEventListener('click', () => {
      elModoBtns.forEach(b => b.classList.toggle('ci-modo-btn--ativo', b === btn));
      const modo = btn.dataset.ciModo;
      elCatalogo.hidden = (modo !== 'catalogo');
      elCustom.hidden   = (modo !== 'custom');
      if (modo === 'custom') {
        itemAtual = { nome: elCustomNome.value.trim(), preco: parseFloat(elCustomPreco.value) || 0 };
        elCategoria.value = 'personalizado';
        elCdCustomLin.hidden = false;
      } else {
        itemAtual = { nome: '', preco: 0 };
        elResultados.hidden = true;
        elBuscaItem.value = '';
      }
      atualizarEscolhido();
      recalcular();
    }));

    // ── busca no catálogo ──
    elBuscaItem.addEventListener('input', () => {
      const achados = itensBuscar(elBuscaItem.value);
      if (!elBuscaItem.value.trim()) { elResultados.hidden = true; return; }
      elResultados.hidden = false;
      if (!achados.length) {
        elResultados.innerHTML = `<div class="ci-item-resultado ci-item-resultado--vazio">Nada encontrado (só armas, armaduras, escudos, ferramentas, vestuário ou esotéricos podem receber melhorias).</div>`;
        return;
      }
      elResultados.innerHTML = achados.map(it => `
        <div class="ci-item-resultado" data-nome="${esc(it.nome)}" data-kind="${esc(it.kind)}" data-categoria="${esc(it.categoria)}" data-preco="${it.preco == null ? '' : it.preco}">
          <span class="ci-item-resultado-nome">${esc(it.nome)}</span>
          <span class="ci-item-resultado-preco">${it.preco == null ? 'sem preço' : fmtT(it.preco)}</span>
        </div>`).join('');
    });
    elResultados.addEventListener('click', e => {
      const linha = e.target.closest('.ci-item-resultado[data-nome]');
      if (!linha) return;
      itemAtual = { nome: linha.dataset.nome, preco: parseFloat(linha.dataset.preco) || 0 };
      const catId = categoriaAutoDetectada({ kind: linha.dataset.kind, categoria: linha.dataset.categoria });
      elCategoria.value = catId;
      elCdCustomLin.hidden = (catId !== 'personalizado');
      elBuscaItem.value = itemAtual.nome;
      elResultados.hidden = true;
      atualizarEscolhido();
      recalcular();
    });

    // ── personalizado ──
    elCustomNome.addEventListener('input', () => { itemAtual.nome = elCustomNome.value.trim(); atualizarEscolhido(); recalcular(); });
    elCustomPreco.addEventListener('input', () => { itemAtual.preco = parseFloat(elCustomPreco.value) || 0; atualizarEscolhido(); recalcular(); });

    // ── categoria / CD ──
    elCategoria.addEventListener('change', () => {
      elCdCustomLin.hidden = (elCategoria.value !== 'personalizado');
      recalcular();
    });
    elCdCustom.addEventListener('input', recalcular);
    elMelhorias.addEventListener('change', recalcular);
    elEncantos.addEventListener('change', recalcular);
    elOutrosCD.addEventListener('input', recalcular);
    elFracao.addEventListener('change', () => {
      elFracaoCustom.hidden = (elFracao.value !== 'custom');
      recalcular();
    });
    elFracaoCustom.addEventListener('input', recalcular);

    function recalcular() {
      const catId = elCategoria.value;
      const catOpcao = CATEGORIA_OPCOES.find(c => c.id === catId);
      const cdBase = (catId === 'personalizado') ? (parseFloat(elCdCustom.value) || 0) : catOpcao.cd;

      const nMelhorias = parseInt(elMelhorias.value, 10) || 0;
      const nEncantos  = parseInt(elEncantos.value, 10) || 0;
      const outrosCD   = parseFloat(elOutrosCD.value) || 0;

      const linMelhoria = TAB.melhorias.find(m => m.n === nMelhorias);
      const linEncanto  = TAB.encantos.find(e => e.n === nEncantos);
      const precoMelhorias = linMelhoria ? linMelhoria.preco : 0;
      const cdMelhorias    = linMelhoria ? linMelhoria.cd    : 0;
      const precoEncantos  = linEncanto  ? linEncanto.preco  : 0;
      const cdEncantos     = linEncanto  ? linEncanto.cd     : 0;

      const precoBase  = itemAtual.preco || 0;
      const precoFinal = precoBase + precoMelhorias + precoEncantos;
      const cdFinal    = cdBase + cdMelhorias + cdEncantos + outrosCD;

      let divisor = 3;
      if (elFracao.value === 'custom') divisor = parseFloat(elFracaoCustom.value) || 3;
      else divisor = parseFloat(elFracao.value) || 3;
      if (divisor <= 0) divisor = 3;
      // o livro arredonda o custo de fabricação para baixo quando a divisão
      // não é exata (ex.: T$500/3 vira "T$166", não "T$166,67")
      const custoFabricacao = Math.floor(precoFinal / divisor);

      const partes = [];
      if (precoBase)      partes.push(fmtT(precoBase) + ' do item');
      if (precoMelhorias) partes.push(fmtT(precoMelhorias) + ' (' + nMelhorias + ' melhoria' + (nMelhorias > 1 ? 's' : '') + ')');
      if (precoEncantos)  partes.push(fmtT(precoEncantos) + ' (' + nEncantos + ' encanto' + (nEncantos > 1 ? 's' : '') + ')');

      const partesCD = [String(cdBase) + ' base'];
      if (cdMelhorias) partesCD.push(fmtSinal(cdMelhorias) + ' melhorias');
      if (cdEncantos)  partesCD.push(fmtSinal(cdEncantos) + ' encantos');
      if (outrosCD)    partesCD.push(fmtSinal(outrosCD) + ' outros');

      const avisoEstimado = (linEncanto && linEncanto.estimado)
        ? `<div class="ci-res-aviso">⚠ O valor de ${nEncantos} encanto${nEncantos > 1 ? 's' : ''} é uma estimativa (não confirmada no Regras.txt) — confira no seu livro. Você pode corrigir em "⚙ Ajustar tabela de preços" logo abaixo.</div>`
        : '';

      elResultado.innerHTML = `
        <div class="ci-res-nome">${esc(itemAtual.nome || 'Item sem nome')}</div>
        <div class="ci-res-grade">
          <div class="ci-res-bloco">
            <div class="ci-res-rot">Preço final</div>
            <div class="ci-res-val">${fmtT(precoFinal)}</div>
            <div class="ci-res-detalhe">${partes.length ? partes.join(' + ') : 'sem custo adicional'}</div>
          </div>
          <div class="ci-res-bloco">
            <div class="ci-res-rot">CD para fabricar</div>
            <div class="ci-res-val">${cdFinal}</div>
            <div class="ci-res-detalhe">${partesCD.join(' + ')}</div>
          </div>
          <div class="ci-res-bloco">
            <div class="ci-res-rot">Custo de fabricação (1/${divisor})</div>
            <div class="ci-res-val">${fmtT(custoFabricacao)}</div>
            <div class="ci-res-detalhe">matéria-prima gasta ao fabricar</div>
          </div>
        </div>
        ${avisoEstimado}`;
    }

    // ── ajustar tabela de preços ──
    function renderAjustes() {
      elAjustesCorpo.innerHTML = htmlAjustes();
      elAjustesCorpo.querySelectorAll('.ci-aj-preco, .ci-aj-cd').forEach(inp => {
        inp.addEventListener('input', () => {
          const tipo = inp.dataset.tipo, n = +inp.dataset.n;
          const linha = TAB[tipo].find(x => x.n === n);
          if (!linha) return;
          if (inp.classList.contains('ci-aj-preco')) linha.preco = parseFloat(inp.value) || 0;
          else linha.cd = parseFloat(inp.value) || 0;
          salvarTabela(TAB);
          popularSelectContagem(elMelhorias, TAB.melhorias, 'melhoria');
          popularSelectContagem(elEncantos,  TAB.encantos,  'encanto');
          recalcular();
        });
      });
      elAjustesCorpo.querySelector('[data-ci-restaurar]').addEventListener('click', () => {
        TAB = tabelaPadrao();
        salvarTabela(TAB);
        popularSelectContagem(elMelhorias, TAB.melhorias, 'melhoria');
        popularSelectContagem(elEncantos,  TAB.encantos,  'encanto');
        renderAjustes();
        recalcular();
      });
    }
    renderAjustes();

    recalcular();
  }

  function init() {
    if (!document.getElementById('criacao-itens-content')) return;
    try { render(); }
    catch (err) {
      console.error('[criacao-itens] falha ao renderizar:', err);
      const cont = document.getElementById('criacao-itens-content');
      if (cont) cont.innerHTML = `<div class="cr-erro"><strong>Erro ao montar a aba:</strong><br>${esc(err && err.message || err)}</div>`;
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();