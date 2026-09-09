// ════════════════════════════════════════════════════════════════════
//  FICHA.JS — a ficha de personagem, feita dentro do site
//  Localização: /grifos-alados/js/ficha.js
//
//  Carregada nas DUAS páginas: sub-aba "✍ Ficha" da 📖 Fichas no
//  index.html, e a aba 📖 Ficha inteira no jogadores.html. Cada um monta
//  as fichas no navegador dele — nada de login por enquanto (decidido em
//  08/09/2026: "local agora, mesa depois"). A forma do dado já está
//  pronta para subir para a mesa sem ser refeita.
//
//  O QUE ELA CALCULA, e o que não:
//   • calcula — PV e PM máximos, Defesa, carga, CD, e o valor de cada
//     uma das 29 perícias (Tormenta 20 JdA; fórmulas em ficha-data.js);
//   • não calcula — raça, origem, poder, magia, item. Nada disso vira
//     tabela: são caixas de texto ricas, iguais às do bestiário. Foi o
//     combinado com ele: "o que importa é a matemática das perícias,
//     vida, pm e etc... O restante é só blocos enormes para escrever".
//
//  O site NÃO POLICIA: não confere quantas perícias você treinou nem
//  pré-requisito de poder. Conta e mostra; a escolha é do jogador.
//
//  ⚠ NADA AQUI CONHECE CRIATURA. A ficha do jogador não fala com o
//  bestiário, com a aba ⚗ Criar Ameaça nem com o statblock — pedido
//  dele, em 08/09/2026. Ver docs/ficha-do-jogador.md.
// ════════════════════════════════════════════════════════════════════
(function () {
  'use strict';

  const esc = window.GA_esc;
  const D = window.GA_FichaData;
  const STORAGE_KEY = 'grifosAlados.fichasPersonagem';

  let dados = { fichas: [], aberta: null };
  let ultimaRolagem = '';       // o detalhe da última rolagem, para a faixa
  let secao = null;             // a <section> que hospeda a aba

  // ── PERSISTÊNCIA ─────────────────────────────────────────────────
  let _timer = null;
  function salvar() { clearTimeout(_timer); _timer = setTimeout(gravar, 250); }
  function salvarAgora() { clearTimeout(_timer); gravar(); }
  function gravar() {
    try { window.GA_guardar(STORAGE_KEY, JSON.stringify(dados)); }
    catch (e) { console.warn('[ficha] não deu para salvar:', e && e.message); }
  }
  function carregar() {
    try {
      const txt = localStorage.getItem(STORAGE_KEY);
      if (txt) dados = JSON.parse(txt);
    } catch (e) { console.warn('[ficha] não deu para carregar:', e && e.message); }
    if (!dados || typeof dados !== 'object') dados = {};
    if (!Array.isArray(dados.fichas)) dados.fichas = [];
    dados.fichas = dados.fichas.map(normalizar);
    if (!dados.fichas.some(f => f.id === dados.aberta)) {
      dados.aberta = dados.fichas.length ? dados.fichas[0].id : null;
    }
  }

  // Toda ficha salva ganha os campos do modelo de agora — fichas velhas
  // não podem quebrar a tela por falta de um bloco novo.
  function normalizar(f) {
    f = f || {};
    f.id = f.id || novoId();
    ['nome', 'jogador', 'raca', 'origem', 'divindade'].forEach(k => {
      if (typeof f[k] !== 'string') f[k] = '';
    });
    if (typeof f.tamanho !== 'string') f.tamanho = 'Médio';
    if (typeof f.deslocamento !== 'number') f.deslocamento = 9;
    if (!Array.isArray(f.classes)) f.classes = [{ classe: '', nivel: 1 }];
    f.classes = f.classes.map(c => ({
      classe: String((c && c.classe) || ''),
      nivel: Math.max(0, parseInt((c && c.nivel), 10) || 0),
    }));
    if (!f.classes.length) f.classes = [{ classe: '', nivel: 1 }];

    f.atributos = f.atributos || {};
    D.ATRIBUTOS.forEach(a => {
      if (typeof f.atributos[a.chave] !== 'number') f.atributos[a.chave] = 0;
    });
    f.pv = f.pv || {}; f.pm = f.pm || {};
    if (typeof f.pv.atual  !== 'number') f.pv.atual  = null;   // null = cheio
    if (typeof f.pv.temp   !== 'number') f.pv.temp   = 0;
    if (typeof f.pv.outros !== 'number') f.pv.outros = 0;
    if (typeof f.pm.atual  !== 'number') f.pm.atual  = null;
    if (typeof f.pm.outros !== 'number') f.pm.outros = 0;

    f.defesa = f.defesa || {};
    ['armadura', 'escudo', 'outros', 'penalidade'].forEach(k => {
      if (typeof f.defesa[k] !== 'number') f.defesa[k] = 0;
    });
    f.carga = f.carga || {};
    ['usada', 'outros'].forEach(k => { if (typeof f.carga[k] !== 'number') f.carga[k] = 0; });
    if (typeof f.cdAtributo !== 'string') f.cdAtributo = 'int';

    f.pericias = f.pericias || {};
    D.PERICIAS.forEach(p => {
      const e = f.pericias[p.chave] || {};
      f.pericias[p.chave] = {
        treinada: e.treinada === true,
        outros: typeof e.outros === 'number' ? e.outros : 0,
      };
    });

    if (!Array.isArray(f.ataques)) f.ataques = [];
    f.ataques = f.ataques.map(a => ({
      id: (a && a.id) || novoId(),
      nome: String((a && a.nome) || ''),
      pericia: (a && a.pericia === 'pontaria') ? 'pontaria' : 'luta',
      extra: (a && typeof a.extra === 'number') ? a.extra : 0,
      dano: String((a && a.dano) || ''),
      critico: String((a && a.critico) || ''),
      tipo: String((a && a.tipo) || ''),
      alcance: String((a && a.alcance) || ''),
    }));

    f.blocos = f.blocos || {};
    BLOCOS.forEach(b => { if (typeof f.blocos[b.campo] !== 'string') f.blocos[b.campo] = ''; });
    return f;
  }

  function novoId() { return 'f' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }
  function fichaAberta() { return dados.fichas.find(f => f.id === dados.aberta) || null; }

  const BLOCOS = [
    { campo: 'racaOrigem',    titulo: '🌿 Habilidades de raça e origem',
      dica: 'O que a raça e a origem lhe deram — copie do livro ou escreva com suas palavras…' },
    { campo: 'classePoderes', titulo: '⚔ Habilidades de classe e poderes',
      dica: 'Habilidades de classe, poderes, capacidades de caminho…' },
    { campo: 'magias',        titulo: '✨ Magias',
      dica: 'Círculo, custo, execução, alcance, duração, efeito. A aba 📚 Consultas → ✨ Magias tem as 254 do livro para copiar.' },
    { campo: 'inventario',    titulo: '🎒 Inventário',
      dica: 'Armas, armaduras, itens e tibares. A 🏪 Loja traz preço e espaços de cada coisa.' },
    { campo: 'anotacoes',     titulo: '📜 Anotações',
      dica: 'História, aliados, contatos, dívidas, o que ficou pendente…' },
  ];

  // ═══ AS CONTAS ════════════════════════════════════════════════════
  //  Todas saem do livro (Tormenta 20 — Edição Jogo do Ano). Nada disto
  //  é guardado: subir de nível é trocar um número, e a ficha inteira se
  //  acerta sozinha.

  // Nível de personagem é a soma dos níveis de classe (p. 40).
  function nivel(f) {
    const n = f.classes.reduce((s, c) => s + (c.nivel || 0), 0);
    return Math.max(1, n);
  }
  function atr(f, chave) { return f.atributos[chave] || 0; }

  // PV: a PRIMEIRA classe dá o PV inicial dela; o primeiro nível de uma
  // classe nova dá PV de nível subsequente, não do 1º (p. 40).
  function pvMax(f) {
    const con = atr(f, 'con');
    let total = 0;
    f.classes.forEach((c, i) => {
      const C = D.classe(c.classe);
      const n = c.nivel || 0;
      if (!C || n <= 0) return;
      total += (i === 0)
        ? C.pvBase + con + (n - 1) * (C.pvNivel + con)
        : n * (C.pvNivel + con);
    });
    return total + (f.pv.outros || 0);
  }
  function pmMax(f) {
    let total = 0;
    f.classes.forEach(c => {
      const C = D.classe(c.classe);
      if (C) total += Math.max(0, c.nivel || 0) * C.pmNivel;
    });
    return total + (f.pm.outros || 0);
  }
  // Defesa = 10 + Destreza + armadura + escudo (p. 106)
  function defesa(f) {
    return 10 + atr(f, 'des') + f.defesa.armadura + f.defesa.escudo + f.defesa.outros;
  }
  // Carga = 10 espaços + 2 por ponto de Força, ou −1 por ponto negativo (p. 141)
  function cargaMax(f) {
    const F = atr(f, 'for');
    return (F >= 0 ? 10 + 2 * F : 10 + F) + (f.carga.outros || 0);
  }
  // Treino: +2 (1º–6º), +4 (7º–14º), +6 (15º+) — p. 114
  function treino(n, treinada) {
    if (!treinada) return 0;
    return n >= 15 ? 6 : n >= 7 ? 4 : 2;
  }
  // Perícia = ⌊nível ÷ 2⌋ + atributo-chave + treino + outros − armadura
  function valorPericia(f, chave) {
    const P = D.pericia(chave);
    if (!P) return 0;
    const n = nivel(f), e = f.pericias[chave] || {};
    let v = Math.floor(n / 2) + atr(f, P.atr) + treino(n, e.treinada) + (e.outros || 0);
    if (P.armadura) v -= Math.abs(f.defesa.penalidade || 0);
    return v;
  }
  // CD das suas habilidades = 10 + ⌊nível ÷ 2⌋ + atributo-chave
  function cdBase(f) { return 10 + Math.floor(nivel(f) / 2) + atr(f, f.cdAtributo); }
  function valorAtaque(f, a) { return valorPericia(f, a.pericia) + (a.extra || 0); }
  function pvAtual(f) { return f.pv.atual == null ? pvMax(f) : f.pv.atual; }
  function pmAtual(f) { return f.pm.atual == null ? pmMax(f) : f.pm.atual; }

  function sinal(v) { return (v >= 0 ? '+' : '') + v; }
  // Os quatro patamares, com as faixas do livro (p. 39): iniciante 1–4,
  // veterano 5–10, campeão 11–16, lenda 17–20. Certas habilidades mudam
  // com o patamar, por isso ele aparece ao lado do nível.
  function patamar(n) {
    return n >= 17 ? 'lenda' : n >= 11 ? 'campeão' : n >= 5 ? 'veterano' : 'iniciante';
  }

  // ═══ ROLAR ════════════════════════════════════════════════════════
  //  Passa pelo GA_Rolagens: se ele estiver numa mesa, a rolagem aparece
  //  na tela de todo mundo; se não estiver, o publicar sai fora sozinho e
  //  o resultado ainda volta para a faixa aqui de cima. Um caminho só.
  function rolar(expr, rotulo) {
    if (!window.GA_Rolagens || !window.GA_Dados) return;
    try {
      const r = window.GA_Rolagens.rolarEPublicar(expr, rotulo);
      ultimaRolagem = '<strong>' + esc(rotulo) + '</strong> — ' + r.detalhe;
    } catch (err) {
      ultimaRolagem = '⚠ ' + esc(err.message || 'não deu para rolar');
    }
    const faixa = secao && secao.querySelector('[data-fi-rolagem]');
    if (faixa) { faixa.innerHTML = '🎲 ' + ultimaRolagem; faixa.hidden = false; }
  }
  function d20(valor) { return valor === 0 ? '1d20' : '1d20' + sinal(valor); }
  function quem(f) { return f.nome || 'personagem sem nome'; }

  // ═══ RENDER ═══════════════════════════════════════════════════════
  function render() {
    const cont = document.getElementById('ficha-content');
    if (!cont) return;
    const f = fichaAberta();

    let html = `
      <div class="fi-cabecalho">
        <h1>Ficha de Personagem</h1>
        <p class="fi-subtitulo">A matemática do livro, feita sozinha — o resto é seu, para escrever</p>
      </div>
      <div class="fi-barra">
        ${dados.fichas.map(x => `
          <button type="button" class="fi-aba ${x.id === dados.aberta ? 'fi-aba--ativa' : ''}"
                  data-acao="abrir" data-id="${esc(x.id)}">
            ${esc(x.nome || '(sem nome)')}
          </button>`).join('')}
        <button type="button" class="fi-add" data-acao="nova">＋ Nova ficha</button>
      </div>
      <p class="fi-rolagem" data-fi-rolagem ${ultimaRolagem ? '' : 'hidden'}>${ultimaRolagem ? '🎲 ' + ultimaRolagem : ''}</p>`;

    if (!f) {
      html += `
        <p class="fi-vazio">Nenhuma ficha ainda.<br>
        Clique em <strong>＋ Nova ficha</strong>: escolha a classe e o nível, digite os seis atributos,
        e o resto — PV, PM, Defesa, carga e as 29 perícias — sai sozinho.</p>`;
      cont.innerHTML = html;
      return;
    }

    html += bloqueIdentidade(f) + blocoNumeros(f) + blocoPericias(f) + blocoAtaques(f) + blocoTextos(f);
    html += `
      <div class="fi-rodape">
        <button type="button" class="fi-remover" data-acao="remover" data-id="${esc(f.id)}"
                title="Apagar esta ficha deste navegador">🗑 Apagar esta ficha</button>
      </div>`;
    cont.innerHTML = html;
  }

  // ── IDENTIDADE ───────────────────────────────────────────────────
  function bloqueIdentidade(f) {
    const opsTam = D.TAMANHOS.map(t =>
      `<option value="${esc(t)}" ${t === f.tamanho ? 'selected' : ''}>${esc(t)}</option>`).join('');
    const linhasClasse = f.classes.map((c, i) => {
      const ops = ['<option value="">— classe —</option>'].concat(D.CLASSES.map(C =>
        `<option value="${C.chave}" ${C.chave === c.classe ? 'selected' : ''}>${esc(C.nome)}</option>`)).join('');
      return `
        <div class="fi-classe">
          <select class="fi-sel" data-campo="classes.${i}.classe" title="Classe">${ops}</select>
          <input class="fi-num fi-num--nivel" type="number" min="0" max="20" value="${c.nivel}"
                 data-campo="classes.${i}.nivel" title="Nível nesta classe">
          ${f.classes.length > 1
            ? `<button type="button" class="fi-mini fi-mini--x" data-acao="tira-classe" data-i="${i}" title="Tirar esta classe">✕</button>`
            : ''}
        </div>`;
    }).join('');

    return `
      <div class="fi-cartao fi-ident">
        <div class="fi-ident-nomes">
          <label class="fi-campo fi-campo--largo">
            <span class="fi-rot">Personagem</span>
            <input class="fi-txt fi-txt--nome" type="text" value="${esc(f.nome)}" data-campo="nome"
                   placeholder="o nome dele" autocomplete="off">
          </label>
          <label class="fi-campo">
            <span class="fi-rot">Jogador</span>
            <input class="fi-txt" type="text" value="${esc(f.jogador)}" data-campo="jogador"
                   placeholder="quem joga" autocomplete="off">
          </label>
        </div>
        <div class="fi-ident-linha">
          <label class="fi-campo"><span class="fi-rot">Raça</span>
            <input class="fi-txt" type="text" value="${esc(f.raca)}" data-campo="raca" placeholder="humano, elfo…" autocomplete="off"></label>
          <label class="fi-campo"><span class="fi-rot">Origem</span>
            <input class="fi-txt" type="text" value="${esc(f.origem)}" data-campo="origem" placeholder="acólito, batedor…" autocomplete="off"></label>
          <label class="fi-campo"><span class="fi-rot">Divindade</span>
            <input class="fi-txt" type="text" value="${esc(f.divindade)}" data-campo="divindade" placeholder="ou nenhuma" autocomplete="off"></label>
          <label class="fi-campo fi-campo--curto"><span class="fi-rot">Tamanho</span>
            <select class="fi-sel" data-campo="tamanho">${opsTam}</select></label>
          <label class="fi-campo fi-campo--curto"><span class="fi-rot">Desloc. (m)</span>
            <input class="fi-num" type="number" min="0" step="1.5" value="${f.deslocamento}" data-campo="deslocamento"></label>
        </div>
        <div class="fi-ident-classes">
          <span class="fi-rot">Classe(s) e nível</span>
          <div class="fi-classes">
            ${linhasClasse}
            <button type="button" class="fi-mini" data-acao="add-classe" title="Multiclasse: acrescentar outra classe">＋</button>
          </div>
          <span class="fi-nivel-selo">Nível <strong data-der="nivel">${nivel(f)}</strong>
            <em data-der="patamar">${patamar(nivel(f))}</em></span>
        </div>
      </div>`;
  }

  // ── OS NÚMEROS: atributos · vida e mana · defesa e carga ─────────
  function blocoNumeros(f) {
    const atrs = D.ATRIBUTOS.map(a => `
      <label class="fi-atr">
        <span class="fi-atr-nome">${esc(a.curto)}</span>
        <input class="fi-atr-val" type="number" value="${f.atributos[a.chave]}"
               data-campo="atributos.${a.chave}" title="${esc(a.nome)} — em T20 o valor já é o modificador">
      </label>`).join('');

    const opsCd = D.ATRIBUTOS.map(a =>
      `<option value="${a.chave}" ${a.chave === f.cdAtributo ? 'selected' : ''}>${esc(a.curto)}</option>`).join('');

    return `
      <div class="fi-numeros">
        <div class="fi-cartao fi-atributos">
          <h2 class="fi-cartao-tit">Atributos</h2>
          <div class="fi-atr-grade">${atrs}</div>
          <p class="fi-nota">Em Tormenta 20 o valor <em>já é</em> o modificador: Força 3 soma +3.
            Digite o total, com o que a raça deu.</p>
        </div>

        <div class="fi-cartao fi-vida">
          <h2 class="fi-cartao-tit">Vida &amp; Mana</h2>
          <div class="fi-medidor">
            <span class="fi-medidor-rot">PV</span>
            <button type="button" class="fi-passo" data-acao="pv-menos" title="−1 PV">−</button>
            <input class="fi-medidor-val" type="number" value="${pvAtual(f)}" data-campo="pv.atual" title="PV atual">
            <span class="fi-medidor-max">/ <strong data-der="pvmax">${pvMax(f)}</strong></span>
            <button type="button" class="fi-passo" data-acao="pv-mais" title="+1 PV">+</button>
          </div>
          <div class="fi-barra-pv"><span data-der="pvbarra" style="width:${porcento(pvAtual(f), pvMax(f))}%"></span></div>
          <div class="fi-medidor">
            <span class="fi-medidor-rot">PM</span>
            <button type="button" class="fi-passo" data-acao="pm-menos" title="−1 PM">−</button>
            <input class="fi-medidor-val" type="number" value="${pmAtual(f)}" data-campo="pm.atual" title="PM atual">
            <span class="fi-medidor-max">/ <strong data-der="pmmax">${pmMax(f)}</strong></span>
            <button type="button" class="fi-passo" data-acao="pm-mais" title="+1 PM">+</button>
          </div>
          <div class="fi-extras">
            <label class="fi-extra"><span>PV temporários</span>
              <input class="fi-num" type="number" value="${f.pv.temp}" data-campo="pv.temp"></label>
            <label class="fi-extra"><span>PV de outras fontes</span>
              <input class="fi-num" type="number" value="${f.pv.outros}" data-campo="pv.outros"
                     title="O que poderes e itens somam ao PV máximo"></label>
            <label class="fi-extra"><span>PM de outras fontes</span>
              <input class="fi-num" type="number" value="${f.pm.outros}" data-campo="pm.outros"></label>
          </div>
          <p class="fi-conta" data-der="pvconta">${contaPv(f)}</p>
        </div>

        <div class="fi-cartao fi-defesa">
          <h2 class="fi-cartao-tit">Defesa &amp; Carga</h2>
          <div class="fi-grande">
            <span class="fi-grande-rot">Defesa</span>
            <strong class="fi-grande-val" data-der="defesa">${defesa(f)}</strong>
          </div>
          <p class="fi-conta" data-der="defconta">${contaDefesa(f)}</p>
          <div class="fi-extras">
            <label class="fi-extra"><span>Armadura</span>
              <input class="fi-num" type="number" value="${f.defesa.armadura}" data-campo="defesa.armadura"></label>
            <label class="fi-extra"><span>Escudo</span>
              <input class="fi-num" type="number" value="${f.defesa.escudo}" data-campo="defesa.escudo"></label>
            <label class="fi-extra"><span>Outros</span>
              <input class="fi-num" type="number" value="${f.defesa.outros}" data-campo="defesa.outros"></label>
            <label class="fi-extra"><span>Penal. armadura</span>
              <input class="fi-num" type="number" value="${f.defesa.penalidade}" data-campo="defesa.penalidade"
                     title="O número do livro (ex.: 5). Cai só em Acrobacia, Furtividade e Ladinagem."></label>
          </div>
          <div class="fi-linhas">
            <div class="fi-linha">
              <span>Carga</span>
              <span><input class="fi-num fi-num--mini" type="number" value="${f.carga.usada}" data-campo="carga.usada"
                     title="Espaços ocupados"> / <strong data-der="cargamax">${cargaMax(f)}</strong> espaços</span>
            </div>
            <div class="fi-linha">
              <span>CD das suas habilidades</span>
              <span><strong data-der="cd">${cdBase(f)}</strong>
                <select class="fi-sel fi-sel--mini" data-campo="cdAtributo" title="Atributo-chave das suas habilidades">${opsCd}</select></span>
            </div>
            <div class="fi-linha">
              <span>Deslocamento</span>
              <span><strong data-der="desloc">${f.deslocamento}</strong> m (<strong data-der="quadrados">${quadrados(f.deslocamento)}</strong> quadrados)</span>
            </div>
          </div>
        </div>
      </div>`;
  }

  // O mapa é em quadrados de 1,5 m; os METROS é que mandam, e o quadrado
  // é conta — a mesma política do resto do site.
  function quadrados(m) { return Math.round(((m || 0) / 1.5) * 10) / 10; }
  function porcento(a, b) { return b > 0 ? Math.max(0, Math.min(100, Math.round(a / b * 100))) : 0; }

  function contaPv(f) {
    const c = f.classes.filter(x => D.classe(x.classe) && x.nivel > 0);
    if (!c.length) return 'Escolha a classe e o nível para o PV e o PM aparecerem.';
    const con = atr(f, 'con');
    const partes = c.map((x, i) => {
      const C = D.classe(x.classe);
      return i === 0
        ? `${esc(C.nome)}: ${C.pvBase}${sinalCon(con)} + ${x.nivel - 1}×(${C.pvNivel}${sinalCon(con)})`
        : `${esc(C.nome)}: ${x.nivel}×(${C.pvNivel}${sinalCon(con)})`;
    });
    const pm = c.map(x => `${D.classe(x.classe).pmNivel}×${x.nivel}`).join(' + ');
    return `PV = ${partes.join(' + ')}${f.pv.outros ? ' ' + sinal(f.pv.outros) : ''} · PM = ${pm}${f.pm.outros ? ' ' + sinal(f.pm.outros) : ''}`;
  }
  function sinalCon(con) { return con === 0 ? '' : (con > 0 ? ' + ' + con : ' − ' + Math.abs(con)); }
  function contaDefesa(f) {
    const p = ['10', 'Des ' + sinal(atr(f, 'des'))];
    if (f.defesa.armadura) p.push('armadura ' + sinal(f.defesa.armadura));
    if (f.defesa.escudo)   p.push('escudo ' + sinal(f.defesa.escudo));
    if (f.defesa.outros)   p.push('outros ' + sinal(f.defesa.outros));
    return p.join(' + ').replace(/\+ -/g, '− ');
  }

  // ── PERÍCIAS ─────────────────────────────────────────────────────
  function blocoPericias(f) {
    const n = nivel(f);
    const linhas = D.PERICIAS.map(p => {
      const e = f.pericias[p.chave];
      const v = valorPericia(f, p.chave);
      const marcas =
        (p.resist   ? '<span class="fi-selo fi-selo--res" title="Teste de resistência">resistência</span>' : '') +
        (p.ataque   ? '<span class="fi-selo fi-selo--atq" title="Teste de ataque ' + esc(p.ataque) + '">ataque</span>' : '') +
        (p.treinada ? '<span class="fi-selo" title="Só pode ser usada se você for treinado nela">só treinada</span>' : '') +
        (p.armadura ? '<span class="fi-selo fi-selo--arm" title="Sofre a penalidade de armadura">armadura</span>' : '');
      return `
        <li class="fi-per ${e.treinada ? 'fi-per--treinada' : ''}">
          <button type="button" class="fi-per-check" data-acao="treinar" data-p="${p.chave}"
                  title="${e.treinada ? 'Treinada — clique para destreinar' : 'Marcar como treinada'}"
                  aria-pressed="${e.treinada}">${e.treinada ? '✓' : ''}</button>
          <button type="button" class="fi-per-rolar" data-acao="rolar-pericia" data-p="${p.chave}"
                  title="Rolar 1d20 + ${sinal(v)}">
            <span class="fi-per-nome">${esc(p.nome)}</span>
            <span class="fi-per-atr">${esc(atrCurto(p.atr))}</span>
            <span class="fi-per-val" data-der="per:${p.chave}">${sinal(v)}</span>
          </button>
          <input class="fi-num fi-num--mini" type="number" value="${e.outros}"
                 data-campo="pericias.${p.chave}.outros" title="Outros bônus nesta perícia">
          <span class="fi-per-marcas">${marcas}</span>
        </li>`;
    }).join('');

    return `
      <div class="fi-cartao fi-pericias">
        <h2 class="fi-cartao-tit">Perícias
          <span class="fi-cartao-nota">⌊nível ÷ 2⌋ + atributo + treino <span data-der="treino">${sinal(treino(n, true))}</span> − penalidade de armadura</span>
        </h2>
        <ul class="fi-per-lista">${linhas}</ul>
        <p class="fi-nota">Clique no nome para rolar. O ✓ marca treinada — o site não confere quantas você pode treinar,
          isso é escolha sua. As <em>só treinada</em> aparecem mesmo sem treino porque o livro proíbe o uso, não a rolagem.</p>
      </div>`;
  }
  function atrCurto(chave) {
    const a = D.ATRIBUTOS.find(x => x.chave === chave);
    return a ? a.curto : chave;
  }

  // ── ATAQUES ──────────────────────────────────────────────────────
  function blocoAtaques(f) {
    const linhas = f.ataques.map((a, i) => `
      <li class="fi-atq">
        <input class="fi-txt fi-txt--atq" type="text" value="${esc(a.nome)}" data-campo="ataques.${i}.nome"
               placeholder="espada longa" autocomplete="off">
        <select class="fi-sel fi-sel--mini" data-campo="ataques.${i}.pericia" title="Com qual perícia se ataca">
          <option value="luta" ${a.pericia === 'luta' ? 'selected' : ''}>Luta</option>
          <option value="pontaria" ${a.pericia === 'pontaria' ? 'selected' : ''}>Pontaria</option>
        </select>
        <input class="fi-num fi-num--mini" type="number" value="${a.extra}" data-campo="ataques.${i}.extra"
               title="Bônus extra deste ataque (arma mágica, poder…)">
        <button type="button" class="fi-atq-val" data-acao="rolar-ataque" data-i="${i}"
                title="Rolar o ataque">${sinal(valorAtaque(f, a))}</button>
        <input class="fi-txt fi-txt--mini" type="text" value="${esc(a.dano)}" data-campo="ataques.${i}.dano"
               placeholder="1d8+3" autocomplete="off">
        <button type="button" class="fi-atq-dano" data-acao="rolar-dano" data-i="${i}"
                title="Rolar o dano">🎲</button>
        <input class="fi-txt fi-txt--mini" type="text" value="${esc(a.critico)}" data-campo="ataques.${i}.critico"
               placeholder="19/×3" autocomplete="off">
        <input class="fi-txt fi-txt--mini" type="text" value="${esc(a.tipo)}" data-campo="ataques.${i}.tipo"
               placeholder="corte" autocomplete="off">
        <input class="fi-txt fi-txt--mini" type="text" value="${esc(a.alcance)}" data-campo="ataques.${i}.alcance"
               placeholder="corpo a corpo" autocomplete="off">
        <button type="button" class="fi-mini fi-mini--x" data-acao="tira-ataque" data-i="${i}" title="Tirar este ataque">✕</button>
      </li>`).join('');

    return `
      <div class="fi-cartao fi-ataques">
        <h2 class="fi-cartao-tit">Ataques
          <span class="fi-cartao-nota">o valor de ataque <em>é</em> a perícia — Luta ou Pontaria</span>
        </h2>
        <div class="fi-atq-cab">
          <span>Arma</span><span>Perícia</span><span>Extra</span><span>Ataque</span>
          <span>Dano</span><span></span><span>Crítico</span><span>Tipo</span><span>Alcance</span><span></span>
        </div>
        <ul class="fi-atq-lista">${linhas || '<li class="fi-atq-vazio">Nenhum ataque ainda.</li>'}</ul>
        <button type="button" class="fi-add fi-add--menor" data-acao="add-ataque">＋ Acrescentar ataque</button>
        <p class="fi-nota">O dano de corpo a corpo e de arremesso soma a Força — escreva o total aqui (ex.: <code>1d8+3</code>).</p>
      </div>`;
  }

  // ── OS BLOCOS DE TEXTO ───────────────────────────────────────────
  function blocoTextos(f) {
    const barra = window.GA_barraRica ? window.GA_barraRica() : '';
    return BLOCOS.map(b => `
      <div class="fi-cartao fi-bloco">
        <h2 class="fi-cartao-tit">${b.titulo}</h2>
        <div class="ga-rich-wrap ga-rich-wrap--barra" data-jog-edita>
          ${barra}
          <div class="fi-texto ga-rich" contenteditable="true" spellcheck="true"
               data-campo="blocos.${b.campo}" data-ph="${esc(b.dica)}">${f.blocos[b.campo] || ''}</div>
        </div>
      </div>`).join('');
  }

  // ═══ SÓ OS NÚMEROS, SEM REDESENHAR ════════════════════════════════
  //  Redesenhar a aba a cada tecla tira o cursor do campo. Então quem
  //  muda de valor é marcado com data-der e reescrito aqui.
  function atualizarDerivados() {
    const f = fichaAberta();
    if (!f || !secao) return;
    const n = nivel(f);
    secao.querySelectorAll('[data-der]').forEach(el => {
      const d = el.dataset.der;
      if (d.slice(0, 4) === 'per:') { el.textContent = sinal(valorPericia(f, d.slice(4))); return; }
      if (d.slice(0, 4) === 'atq:') { el.textContent = sinal(valorAtaque(f, f.ataques[+d.slice(4)] || {})); return; }
      if (d === 'nivel')     el.textContent = n;
      if (d === 'patamar')   el.textContent = patamar(n);
      if (d === 'treino')    el.textContent = sinal(treino(n, true));
      if (d === 'pvmax')     el.textContent = pvMax(f);
      if (d === 'pmmax')     el.textContent = pmMax(f);
      if (d === 'defesa')    el.textContent = defesa(f);
      if (d === 'cargamax')  el.textContent = cargaMax(f);
      if (d === 'cd')        el.textContent = cdBase(f);
      if (d === 'desloc')    el.textContent = f.deslocamento;
      if (d === 'quadrados') el.textContent = quadrados(f.deslocamento);
      if (d === 'pvconta')   el.innerHTML = contaPv(f);
      if (d === 'defconta')  el.innerHTML = contaDefesa(f);
      if (d === 'pvbarra')   el.style.width = porcento(pvAtual(f), pvMax(f)) + '%';
    });
    // o botão de ataque não é [data-der] (é botão), mas o valor dele muda
    secao.querySelectorAll('[data-acao="rolar-ataque"]').forEach(b => {
      const a = f.ataques[+b.dataset.i];
      if (a) b.textContent = sinal(valorAtaque(f, a));
    });
  }

  // ═══ ESCRITAS ═════════════════════════════════════════════════════
  //  'atributos.for', 'pericias.percepcao.outros', 'ataques.0.dano'…
  function gravarCampo(f, caminho, valor) {
    const p = caminho.split('.');
    let alvo = f;
    for (let i = 0; i < p.length - 1; i++) {
      alvo = alvo[p[i]];
      if (!alvo) return;
    }
    alvo[p[p.length - 1]] = valor;
  }

  function aoEntrada(e) {
    const el = e.target;
    if (!el || !el.dataset) return;
    const campo = el.dataset.campo;
    if (!campo) return;
    const f = fichaAberta();
    if (!f) return;

    if (el.classList.contains('ga-rich')) {
      gravarCampo(f, campo, window.GA_limparHtml ? window.GA_limparHtml(el.innerHTML) : el.innerHTML);
      return salvar();
    }
    if (el.type === 'number') {
      const bruto = String(el.value).trim();
      // PV/PM atuais em branco voltam a "cheio" (null); o resto vira 0
      const ehAtual = (campo === 'pv.atual' || campo === 'pm.atual');
      const v = bruto === '' ? (ehAtual ? null : 0) : (parseFloat(bruto) || 0);
      gravarCampo(f, campo, v);
    } else {
      gravarCampo(f, campo, el.value);
    }
    // o nome do personagem também é o rótulo da aba — esse precisa redesenhar
    if (campo === 'nome') {
      const aba = secao.querySelector('.fi-aba--ativa');
      if (aba) aba.textContent = f.nome || '(sem nome)';
    }
    atualizarDerivados();
    salvar();
  }

  function aoMudar(e) {
    const el = e.target;
    if (!el || !el.dataset || !el.dataset.campo) return;
    const f = fichaAberta();
    if (!f) return;
    if (el.tagName === 'SELECT') {
      const campo = el.dataset.campo;
      gravarCampo(f, campo, el.value);
      salvar();
      // trocar de classe muda PV, PM e todas as perícias — e o rótulo da
      // conta por extenso; redesenhar é mais honesto que remendar
      if (campo.indexOf('classes.') === 0) return render();
      atualizarDerivados();
    }
  }

  function aoClicar(e) {
    const btn = e.target.closest('[data-acao]');
    if (!btn) return;
    const acao = btn.dataset.acao;
    const f = fichaAberta();

    if (acao === 'nova') {
      const nova = normalizar({ nome: '' });
      dados.fichas.push(nova);
      dados.aberta = nova.id;
      salvar(); return render();
    }
    if (acao === 'abrir') {
      dados.aberta = btn.dataset.id;
      ultimaRolagem = '';
      salvar(); return render();
    }
    if (!f) return;

    if (acao === 'remover') {
      if (!confirm('Apagar a ficha de ' + (f.nome || 'sem nome') + '? Isto não tem volta.')) return;
      dados.fichas = dados.fichas.filter(x => x.id !== f.id);
      dados.aberta = dados.fichas.length ? dados.fichas[0].id : null;
      salvar(); return render();
    }
    if (acao === 'add-classe')  { f.classes.push({ classe: '', nivel: 1 }); salvar(); return render(); }
    if (acao === 'tira-classe') { f.classes.splice(+btn.dataset.i, 1); if (!f.classes.length) f.classes.push({ classe: '', nivel: 1 }); salvar(); return render(); }
    if (acao === 'add-ataque')  { f.ataques.push({ id: novoId(), nome: '', pericia: 'luta', extra: 0, dano: '', critico: '', tipo: '', alcance: '' }); salvar(); return render(); }
    if (acao === 'tira-ataque') { f.ataques.splice(+btn.dataset.i, 1); salvar(); return render(); }

    if (acao === 'treinar') {
      const p = btn.dataset.p;
      f.pericias[p].treinada = !f.pericias[p].treinada;
      salvar(); return render();
    }
    if (acao === 'pv-menos' || acao === 'pv-mais' || acao === 'pm-menos' || acao === 'pm-mais') {
      const ehPv = acao.slice(0, 2) === 'pv';
      const passo = acao.slice(-4) === 'mais' ? 1 : -1;
      const agora = ehPv ? pvAtual(f) : pmAtual(f);
      const teto  = ehPv ? pvMax(f)   : pmMax(f);
      const novo  = Math.min(teto, agora + passo);   // sem teto para baixo: PV negativo existe
      if (ehPv) f.pv.atual = novo; else f.pm.atual = Math.max(0, novo);
      const campo = secao.querySelector('[data-campo="' + (ehPv ? 'pv' : 'pm') + '.atual"]');
      if (campo) campo.value = ehPv ? f.pv.atual : f.pm.atual;
      atualizarDerivados(); return salvar();
    }
    if (acao === 'rolar-pericia') {
      const p = D.pericia(btn.dataset.p);
      if (p) rolar(d20(valorPericia(f, p.chave)), quem(f) + ' · ' + p.nome);
      return;
    }
    if (acao === 'rolar-ataque') {
      const a = f.ataques[+btn.dataset.i];
      if (a) rolar(d20(valorAtaque(f, a)), quem(f) + ' · ' + (a.nome || 'ataque'));
      return;
    }
    if (acao === 'rolar-dano') {
      const a = f.ataques[+btn.dataset.i];
      if (a && a.dano.trim()) rolar(a.dano.trim(), quem(f) + ' · dano de ' + (a.nome || 'ataque'));
      return;
    }
  }

  // ═══ AS SUB-ABAS DA 📖 FICHAS ═════════════════════════════════════
  //  Só o index.html tem duas: a ficha feita aqui e os PDFs importados
  //  (js/fichas.js, que continua dono do #fichas-content sem saber disto).
  //  No jogadores.html a aba é só a ficha, e esta função não acha nada.
  const SUBABA_KEY = 'grifosAlados.fichaSubaba';
  function ligarSubabas() {
    const nav = document.querySelector('[data-fi-subtabs]');
    if (!nav) return;
    let atual = 'ficha';
    try { atual = localStorage.getItem(SUBABA_KEY) || 'ficha'; } catch (e) {}
    function mostrar(qual) {
      try { localStorage.setItem(SUBABA_KEY, qual); } catch (e) {}
      nav.querySelectorAll('[data-fi-tab]').forEach(b =>
        b.classList.toggle('fi-subtab--ativa', b.dataset.fiTab === qual));
      document.querySelectorAll('[data-fi-panel]').forEach(p => {
        p.hidden = p.dataset.fiPanel !== qual;
      });
    }
    nav.addEventListener('click', e => {
      const b = e.target.closest('[data-fi-tab]');
      if (b) mostrar(b.dataset.fiTab);
    });
    mostrar(atual);
  }

  // ═══ INÍCIO ═══════════════════════════════════════════════════════
  function init() {
    ligarSubabas();
    const cont = document.getElementById('ficha-content');
    if (!cont || !D) return;                 // página que não tem a aba
    secao = cont.closest('section') || cont;
    carregar();
    render();
    secao.addEventListener('click', aoClicar);
    secao.addEventListener('input', aoEntrada);
    secao.addEventListener('change', aoMudar);
    secao.addEventListener('mousedown', window.GA_richDescMousedown);
    secao.addEventListener('paste', window.GA_richPaste);
    window.addEventListener('beforeunload', salvarAgora);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') salvarAgora();
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
