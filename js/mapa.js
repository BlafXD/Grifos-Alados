// ═══════════════════════════════════════════════════════════════════
//  MAPA.JS — Anotações · Mapa / Linha do tempo (quadro visual)
//  Editor de nós no estilo Draw.io: cartões arrastáveis, ligações com
//  seta, pan + zoom e um botão para auto-organizar tudo em linha do
//  tempo (ordem topológica das setas). Convive com a árvore de Ramos
//  (anotacoes.js) dentro da mesma aba, em sub-abas.
//
//  Tudo salvo no localStorage do navegador — sobrevive a F5 e ao fechar
//  a aba, como o resto do app. Chave própria, separada dos Ramos.
// ═══════════════════════════════════════════════════════════════════

(function () {
  'use strict';

  const STORAGE_KEY = 'grifosAlados.anotacoesMapa';
  const RAMOS_KEY   = 'grifosAlados.anotacoes';   // só leitura: importar dos Ramos

  // Mesmas categorias/cores dos Ramos, para o mapa falar a mesma língua.
  const CATS = [
    { chave: 'ideia',    nome: 'Ideia',    cor: '#7a3fa6' },
    { chave: 'encontro', nome: 'Encontro', cor: '#b3261e' },
    { chave: 'narracao', nome: 'Narração', cor: '#2f6f9e' },
    { chave: 'npc',      nome: 'NPC',      cor: '#1f7a6b' },
    { chave: 'lugar',    nome: 'Lugar',    cor: '#9a6a1a' },
    { chave: 'tesouro',  nome: 'Tesouro',  cor: '#8a7320' },
    { chave: 'regra',    nome: 'Regra',    cor: '#4a5a6a' },
    { chave: 'outro',    nome: 'Outro',    cor: '#6e6256' },
  ];
  const CAT_POR_CHAVE = {};
  CATS.forEach(c => { CAT_POR_CHAVE[c.chave] = c; });

  const LARGURA_NO = 210;          // casado com .mp-no { width } no CSS
  const ZOOM_MIN = 0.3, ZOOM_MAX = 2.4;

  const esc = window.GA_esc;

  let dados = { nos: [], ligacoes: [], view: { x: 40, y: 40, zoom: 1 } };

  // referências de DOM (preenchidas em montar)
  let painel, viewport, canvas, svg, edgeDels, dica;
  const elNo = {};                 // id do nó → elemento DOM

  // estado de interação
  let arrasto = null;              // { tipo:'no'|'pan', ... }
  let ligandoDe = null;            // id do nó de origem ao criar ligação
  let zTopo = 10;                  // z-index crescente (nó arrastado vem à frente)
  let jaAjustou = false;           // fit() automático só na 1ª exibição
  let montado = false;
  let cascata = 0;                 // leve deslocamento p/ nós novos não nascerem um sobre o outro
  const GRADE = 20;                // passo do ímã de alinhamento (snap)
  const selec = new Set();         // nós selecionados (Shift+clique) para agrupar

  // ── PERSISTÊNCIA ─────────────────────────────────────────────────
  function carregar() {
    try {
      const txt = localStorage.getItem(STORAGE_KEY);
      if (txt) dados = JSON.parse(txt);
    } catch (e) {
      console.warn('[mapa] Não foi possível carregar:', e.message);
    }
    normalizar();
  }

  function normalizar() {
    if (!dados || typeof dados !== 'object') dados = {};
    if (!Array.isArray(dados.nos)) dados.nos = [];
    if (!Array.isArray(dados.ligacoes)) dados.ligacoes = [];
    dados.snap = !!dados.snap;
    if (!dados.view || typeof dados.view !== 'object') dados.view = { x: 40, y: 40, zoom: 1 };
    dados.view.x = Number(dados.view.x) || 0;
    dados.view.y = Number(dados.view.y) || 0;
    dados.view.zoom = limitar(Number(dados.view.zoom) || 1, ZOOM_MIN, ZOOM_MAX);

    dados.nos.forEach(n => {
      if (!n.id) n.id = uid('n');
      n.x = Number(n.x) || 0;
      n.y = Number(n.y) || 0;
      n.w = Number(n.w) > 0 ? Number(n.w) : LARGURA_NO;
      n.h = Number(n.h) > 0 ? Number(n.h) : 0;       // 0 = altura automática (cresce com o texto)
      if (typeof n.titulo !== 'string') n.titulo = '';
      if (typeof n.texto !== 'string') n.texto = '';
      if (typeof n.cat !== 'string' || !CAT_POR_CHAVE[n.cat]) n.cat = 'ideia';
      // o texto agora é HTML (negrito/itálico/tamanho por trecho) — sanitiza
      n.texto = limparHtml(n.texto);
      n.cor = (typeof n.cor === 'string' && /^#[0-9a-fA-F]{3,8}$/.test(n.cor)) ? n.cor : '';  // cor própria
      n.travado = !!n.travado;                        // trava (não move/edita)
      n.recolhido = !!n.recolhido;                    // recolhido (só o título)
    });
    // descarta ligações órfãs ou duplicadas
    const ids = new Set(dados.nos.map(n => n.id));
    const vistos = new Set();
    dados.ligacoes = dados.ligacoes.filter(l => {
      if (!l || !ids.has(l.de) || !ids.has(l.para) || l.de === l.para) return false;
      const chave = l.de + '→' + l.para;
      if (vistos.has(chave)) return false;
      vistos.add(chave);
      if (!l.id) l.id = uid('l');
      if (typeof l.rotulo !== 'string') l.rotulo = '';
      return true;
    });
  }

  let _timer = null;
  function _gravar() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(dados)); }
    catch (e) { console.warn('[mapa] Não foi possível salvar:', e.message); }
  }
  function salvar() { clearTimeout(_timer); _timer = setTimeout(_gravar, 250); }
  function salvarAgora() { clearTimeout(_timer); _gravar(); }

  // ── AUXILIARES ───────────────────────────────────────────────────
  function uid(p) {
    return p + '_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }
  function limitar(v, min, max) { return Math.max(min, Math.min(max, v)); }
  function noPorId(id) { return dados.nos.find(n => n.id === id) || null; }
  // cor efetiva de um nó: a própria (se definida) ou a da categoria
  function corDoNo(no) {
    if (no && typeof no.cor === 'string' && /^#[0-9a-fA-F]{3,8}$/.test(no.cor)) return no.cor;
    return (CAT_POR_CHAVE[no && no.cat] || CAT_POR_CHAVE.outro).cor;
  }

  // ── TEXTO RICO ────────────────────────────────────────────────────
  // Sanitiza o HTML do corpo: mantém só formatação inline segura. Vital
  // ao renderizar conteúdo vindo de um backup .json (evita HTML malicioso).
  const TAGS_OK = { B: 1, STRONG: 1, I: 1, EM: 1, U: 1, BR: 1, DIV: 1, P: 1, SPAN: 1 };
  function filtrarEstilo(s) {
    const ok = [];
    String(s || '').split(';').forEach(par => {
      const i = par.indexOf(':');
      if (i < 0) return;
      const prop = par.slice(0, i).trim().toLowerCase();
      const val = par.slice(i + 1).trim();
      if (/^(font-size|font-weight|font-style|text-decoration|color)$/.test(prop) &&
          !/url\(|expression|javascript:/i.test(val)) ok.push(prop + ':' + val);
    });
    return ok.join(';');
  }
  function limparHtml(html) {
    const cont = document.createElement('div');
    cont.innerHTML = String(html == null ? '' : html);
    (function processar(pai) {
      let n = pai.firstChild;
      while (n) {
        const prox = n.nextSibling;
        if (n.nodeType === 1) {
          if (!TAGS_OK[n.tagName]) {                 // tag não permitida → desembrulha
            while (n.firstChild) pai.insertBefore(n.firstChild, n);
            pai.removeChild(n);
            processar(pai);
            return;
          }
          const estilo = filtrarEstilo(n.getAttribute('style') || '');
          while (n.attributes.length) n.removeAttribute(n.attributes[0].name);
          if (estilo) n.setAttribute('style', estilo);
          processar(n);
        } else if (n.nodeType !== 3) {
          pai.removeChild(n);                          // comentários etc.
        }
        n = prox;
      }
    })(cont);
    return cont.innerHTML;
  }
  // a seleção atual está dentro deste corpo editável?
  function selecaoDentro(corpo) {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return false;
    return corpo.contains(sel.getRangeAt(0).commonAncestorContainer);
  }
  // envolve o trecho selecionado num <span> com tamanho relativo (A+/A−)
  function envolverSelecao(tamanhoEm) {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0 || sel.isCollapsed) return;
    const range = sel.getRangeAt(0);
    const span = document.createElement('span');
    span.style.fontSize = tamanhoEm;
    try { range.surroundContents(span); }
    catch (e) { span.appendChild(range.extractContents()); range.insertNode(span); }
    sel.removeAllRanges();
    const novo = document.createRange();
    novo.selectNodeContents(span);
    sel.addRange(novo);
  }

  // converte um ponto da tela (clientX/Y) para coordenadas do mundo (canvas)
  function telaParaMundo(clientX, clientY) {
    const r = viewport.getBoundingClientRect();
    return {
      x: (clientX - r.left - dados.view.x) / dados.view.zoom,
      y: (clientY - r.top  - dados.view.y) / dados.view.zoom,
    };
  }

  function aplicarView() {
    canvas.style.transform =
      `translate(${dados.view.x}px, ${dados.view.y}px) scale(${dados.view.zoom})`;
  }

  // ═══════════════════════════════════════════════════════════════
  //  MONTAGEM DA ESTRUTURA
  // ═══════════════════════════════════════════════════════════════
  function montar() {
    if (montado) return;
    painel = document.getElementById('anotacoes-mapa');
    if (!painel) return;

    painel.innerHTML = `
      <div class="mp-toolbar">
        <button class="mp-btn mp-btn--destaque" data-mp-acao="novo">＋ Novo nó</button>
        <button class="mp-btn" data-mp-acao="organizar" title="Alinha os nós em ordem (segue as setas) numa linha do tempo">⟳ Linha do tempo</button>
        <button class="mp-btn" data-mp-acao="raias" title="Fases (a cadeia de setas) viram colunas no topo; cada detalhe desce na raia da fase a que se liga">≋ Raias</button>
        <button class="mp-btn" data-mp-acao="importar-ramos" title="Cria nós a partir da sua árvore de Ramos (pai → filho)">⤵ Trazer dos Ramos</button>
        <button class="mp-btn" data-mp-acao="snap" title="Ímã de alinhamento: encaixa os nós numa grade ao arrastar">🧲 Grade</button>
        <button class="mp-btn" data-mp-acao="agrupar" title="Junta os nós selecionados (Shift+clique) num só bloco" disabled>⿴ Agrupar</button>
        <input id="mpBusca" class="mp-busca-inp" type="search" placeholder="🔍 buscar nó…" title="Realça os nós que contêm o texto">
        <span class="mp-toolbar-sep"></span>
        <button class="mp-btn" data-mp-acao="tela-cheia" title="Abre só o mapa em tela cheia (Esc sai)">⛶ Tela cheia</button>
        <button class="mp-btn" data-mp-acao="zoom-menos" title="Diminuir zoom">🔍−</button>
        <button class="mp-btn" data-mp-acao="ajustar" title="Enquadrar tudo">⤢ Ajustar</button>
        <button class="mp-btn" data-mp-acao="zoom-mais" title="Aumentar zoom">🔍＋</button>
        <button class="mp-btn" data-mp-acao="exportar" title="Salvar um .json com o mapa inteiro (posições dos cards incluídas)">⬇ Backup</button>
        <button class="mp-btn" data-mp-acao="exportar-txt" title="Salvar um .txt legível da linha do tempo — ótimo p/ ler, imprimir ou entregar a uma IA">📄 Texto</button>
        <button class="mp-btn" data-mp-acao="importar" title="Carregar um backup .json do mapa">⬆ Importar</button>
        <button class="mp-btn mp-btn--perigo" data-mp-acao="limpar" title="Apagar todos os nós e ligações">🗑 Limpar</button>
        <input type="file" id="mpImportFile" accept=".json,application/json" hidden>
      </div>
      <div class="mp-dica" hidden></div>
      <div class="mp-viewport">
        <div class="mp-canvas">
          <svg class="mp-links" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="mp-seta" viewBox="0 0 10 10" refX="9" refY="5"
                      markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M0,0 L10,5 L0,10 z" fill="context-stroke"></path>
              </marker>
            </defs>
          </svg>
          <div class="mp-edge-dels"></div>
        </div>
        <div class="mp-vazio" hidden>
          <strong>Quadro em branco</strong>
          <span>Clique em <em>＋ Novo nó</em> ou <em>⤵ Trazer dos Ramos</em> para começar.</span>
        </div>
      </div>
      <p class="mp-rodape">
        Arraste o cabeçalho p/ mover · <kbd>◢</kbd> redimensiona · <kbd>●</kbd> liga ·
        <b>selecione um trecho do texto</b> e use B / I / A− / A+ na barra do nó (cor, recolher e 🔒 valem no bloco todo) ·
        <kbd>Shift</kbd>+clique seleciona nós p/ <b>⿴ agrupar</b> · clique no meio de uma seta p/ <b>rotular</b>.
      </p>`;

    viewport = painel.querySelector('.mp-viewport');
    canvas   = painel.querySelector('.mp-canvas');
    svg      = painel.querySelector('.mp-links');
    edgeDels = painel.querySelector('.mp-edge-dels');
    dica     = painel.querySelector('.mp-dica');

    // eventos (delegados no painel)
    painel.addEventListener('click', aoClicar);
    painel.addEventListener('input', aoDigitar);
    painel.addEventListener('change', aoMudar);
    painel.addEventListener('paste', aoColar);
    painel.addEventListener('mousedown', e => {
      // ao clicar num botão de formatar, NÃO roubar o foco/seleção do texto
      if (e.target.closest('[data-mp-fmt]')) e.preventDefault();
    });
    viewport.addEventListener('pointerdown', aoPointerDown);
    viewport.addEventListener('wheel', aoRodar, { passive: false });
    document.addEventListener('pointermove', aoPointerMove);
    document.addEventListener('pointerup', aoPointerUp);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') { cancelarLigacao(); limparSelecao(); } });

    window.addEventListener('beforeunload', salvarAgora);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') salvarAgora();
    });
    document.addEventListener('fullscreenchange', aoMudarTamanhoQuadro);
    painel.addEventListener('dblclick', aoDuploClique);

    // reflete o estado salvo do ímã de alinhamento no botão
    const btnSnap = painel.querySelector('[data-mp-acao="snap"]');
    if (btnSnap) btnSnap.classList.toggle('mp-btn--ativo', !!dados.snap);

    montado = true;
    aplicarView();
    renderTudo();
  }

  // ═══════════════════════════════════════════════════════════════
  //  RENDER
  // ═══════════════════════════════════════════════════════════════
  function renderTudo() {
    if (!montado) return;
    canvas.querySelectorAll('.mp-no').forEach(n => n.remove());
    for (const k in elNo) delete elNo[k];

    dados.nos.forEach(no => {
      const el = criarElementoNo(no);
      canvas.appendChild(el);
      elNo[no.id] = el;
      posicionar(el, no);
    });

    const vazio = painel.querySelector('.mp-vazio');
    if (vazio) vazio.hidden = dados.nos.length > 0;

    desenharLigacoes();
  }

  function criarElementoNo(no) {
    const cor = corDoNo(no);
    const el = document.createElement('div');
    el.className = 'mp-no'
      + (no.h ? ' mp-no--fixa' : '')
      + (no.travado ? ' mp-no--travado' : '')
      + (no.recolhido ? ' mp-no--recolhido' : '')
      + (selec.has(no.id) ? ' mp-no--sel' : '');
    el.dataset.id = no.id;
    el.style.setProperty('--cor', cor);
    el.style.width = (no.w || LARGURA_NO) + 'px';
    if (no.h) el.style.height = no.h + 'px';

    let ops = '';
    CATS.forEach(c => {
      ops += `<option value="${c.chave}" ${c.chave === no.cat ? 'selected' : ''}>${c.nome}</option>`;
    });
    const ro = no.travado ? 'readonly' : '';
    const dis = no.travado ? 'disabled' : '';
    const editavel = no.travado ? 'false' : 'true';

    el.innerHTML = `
      <div class="mp-no-cab">
        <span class="mp-no-grip" title="Arraste para mover">⠿</span>
        <select class="mp-no-cat" title="Categoria" ${dis}>${ops}</select>
        <span class="mp-no-espaco"></span>
        <button class="mp-no-dup" title="Duplicar nó">⧉</button>
        <button class="mp-no-del" title="Remover nó">✕</button>
      </div>
      <div class="mp-no-fmt">
        <button class="mp-fmt-btn" data-mp-fmt="b" title="Negrito (só no trecho selecionado)"><b>B</b></button>
        <button class="mp-fmt-btn" data-mp-fmt="i" title="Itálico (só no trecho selecionado)"><i>I</i></button>
        <button class="mp-fmt-btn" data-mp-fmt="menor" title="Diminuir o trecho selecionado">A−</button>
        <button class="mp-fmt-btn" data-mp-fmt="maior" title="Aumentar o trecho selecionado">A+</button>
        <label class="mp-fmt-cor" title="Cor do bloco"><input type="color" class="mp-no-cor" value="${cor}" ${dis}></label>
        <span class="mp-fmt-sep"></span>
        <button class="mp-fmt-btn ${no.recolhido ? 'mp-fmt-on' : ''}" data-mp-fmt="recolher" title="Recolher / expandir">${no.recolhido ? '⊞' : '⊟'}</button>
        <button class="mp-fmt-btn ${no.travado ? 'mp-fmt-on' : ''}" data-mp-fmt="lock" title="${no.travado ? 'Destravar' : 'Travar'}">${no.travado ? '🔒' : '🔓'}</button>
      </div>
      <input class="mp-no-titulo" type="text" value="${esc(no.titulo)}" placeholder="Título…" ${ro}>
      <div class="mp-no-texto" contenteditable="${editavel}" data-ph="Anote o evento, a cena, o segredo…">${limparHtml(no.texto)}</div>
      <button class="mp-no-handle" title="Ligar a outro nó">●</button>
      <span class="mp-no-resize" title="Arraste para redimensionar · 2 cliques volta ao automático">◢</span>`;
    return el;
  }

  function posicionar(el, no) {
    el.style.left = no.x + 'px';
    el.style.top  = no.y + 'px';
  }

  // re-renderiza UM nó no lugar (após formatar/travar/recolher) sem refazer o resto
  function renderUmNo(no) {
    const antigo = elNo[no.id];
    if (!antigo) { renderTudo(); return; }
    const novo = criarElementoNo(no);
    novo.style.zIndex = antigo.style.zIndex;
    antigo.replaceWith(novo);
    elNo[no.id] = novo;
    posicionar(novo, no);
    desenharLigacoes();
  }

  // ── geometria das setas ──────────────────────────────────────────
  function caixa(el) {
    return {
      cx: el.offsetLeft + el.offsetWidth / 2,
      cy: el.offsetTop + el.offsetHeight / 2,
      w: el.offsetWidth,
      h: el.offsetHeight,
    };
  }
  // ponto na borda do retângulo (centro cx,cy) na direção de (ax,ay)
  function borda(cx, cy, w, h, ax, ay) {
    const dx = ax - cx, dy = ay - cy;
    if (!dx && !dy) return { x: cx, y: cy };
    const sx = dx ? (w / 2) / Math.abs(dx) : Infinity;
    const sy = dy ? (h / 2) / Math.abs(dy) : Infinity;
    const s = Math.min(sx, sy);
    return { x: cx + dx * s, y: cy + dy * s };
  }

  function desenharLigacoes() {
    if (!montado) return;
    // mantém <defs>, troca só os caminhos
    const defs = svg.querySelector('defs');
    svg.innerHTML = '';
    if (defs) svg.appendChild(defs);

    let extra = '';
    dados.ligacoes.forEach(l => {
      const a = elNo[l.de], b = elNo[l.para];
      if (!a || !b) return;
      const A = caixa(a), B = caixa(b);
      if (!A.w || !B.w) return;                 // painel oculto: sem medidas
      const p1 = borda(A.cx, A.cy, A.w, A.h, B.cx, B.cy);
      const p2 = borda(B.cx, B.cy, B.w, B.h, A.cx, A.cy);
      const cor = corDoNo(noPorId(l.de));

      // curva ADAPTATIVA: controles na vertical quando a ligação é mais
      // vertical (sobe/desce) e na horizontal quando é mais horizontal —
      // assim as setas ficam rentes nas duas direções.
      let d;
      if (Math.abs(B.cy - A.cy) > Math.abs(B.cx - A.cx)) {
        const my = (p1.y + p2.y) / 2;
        d = `M ${p1.x} ${p1.y} C ${p1.x} ${my}, ${p2.x} ${my}, ${p2.x} ${p2.y}`;
      } else {
        const mx = (p1.x + p2.x) / 2;
        d = `M ${p1.x} ${p1.y} C ${mx} ${p1.y}, ${mx} ${p2.y}, ${p2.x} ${p2.y}`;
      }

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('class', 'mp-link-path');
      path.setAttribute('d', d);
      path.setAttribute('stroke', cor);
      path.setAttribute('marker-end', 'url(#mp-seta)');
      svg.appendChild(path);

      const mxp = (p1.x + p2.x) / 2, myp = (p1.y + p2.y) / 2;
      const temRot = l.rotulo && l.rotulo.trim();
      extra += `<button class="mp-edge-del" data-mp-edge="${l.id}" title="Remover ligação"
                  style="left:${mxp}px;top:${myp}px">✕</button>`;
      extra += `<div class="mp-edge-rot${temRot ? '' : ' mp-edge-rot--vazio'}" data-mp-edge-rot="${l.id}"
                  title="Clique para rotular a seta" style="left:${mxp}px;top:${myp}px">${temRot ? esc(l.rotulo) : '＋'}</div>`;
    });
    edgeDels.innerHTML = extra;
  }

  // ═══════════════════════════════════════════════════════════════
  //  INTERAÇÃO — arrastar nós, pan, zoom, ligar
  // ═══════════════════════════════════════════════════════════════
  function aoPointerDown(e) {
    if (e.button !== 0) return;

    // durante uma ligação, o clique apenas conclui/cancela — não arrasta nem dá pan
    if (ligandoDe) { e.preventDefault(); return; }
    // Shift = seleção múltipla: o clique seleciona, não arrasta nem dá pan
    if (e.shiftKey) { e.preventDefault(); return; }

    const noEl = e.target.closest('.mp-no');
    const no = noEl ? noPorId(noEl.dataset.id) : null;

    // alça de ligação ou clique em campo: não arrasta nem dá pan
    if (e.target.closest('.mp-no-handle')) return;
    if (e.target.closest('.mp-no-resize')) { if (no && !no.travado) iniciarResize(e, noEl); return; }
    if (noEl) {
      const naCab = e.target.closest('.mp-no-cab');
      const emControle = e.target.closest('select, button, input, textarea, label');
      if (naCab && !emControle && no && !no.travado) { iniciarArrastoNo(e, noEl); }
      return;                                   // dentro do nó: edição normal
    }
    // fundo do quadro → pan
    iniciarPan(e);
  }

  function iniciarArrastoNo(e, noEl) {
    const no = noPorId(noEl.dataset.id);
    if (!no) return;
    cancelarLigacao();
    arrasto = { tipo: 'no', no, el: noEl, sx: e.clientX, sy: e.clientY, ox: no.x, oy: no.y, moveu: false };
    noEl.style.zIndex = ++zTopo;
    canvas.classList.add('mp--arrastando');
    e.preventDefault();
  }

  function iniciarResize(e, noEl) {
    const no = noPorId(noEl.dataset.id);
    if (!no) return;
    cancelarLigacao();
    noEl.classList.add('mp-no--fixa');             // ao redimensionar, passa a ter altura fixa
    arrasto = { tipo: 'resize', no, el: noEl, sx: e.clientX, sy: e.clientY,
                ow: noEl.offsetWidth, oh: noEl.offsetHeight };
    noEl.style.zIndex = ++zTopo;
    canvas.classList.add('mp--arrastando');
    e.preventDefault();
  }

  function iniciarPan(e) {
    arrasto = { tipo: 'pan', sx: e.clientX, sy: e.clientY, ox: dados.view.x, oy: dados.view.y };
    viewport.classList.add('mp--panning');
    e.preventDefault();
  }

  function aoPointerMove(e) {
    if (!arrasto) return;
    if (arrasto.tipo === 'no') {
      const dx = (e.clientX - arrasto.sx) / dados.view.zoom;
      const dy = (e.clientY - arrasto.sy) / dados.view.zoom;
      if (Math.abs(dx) + Math.abs(dy) > 1) arrasto.moveu = true;
      let nx = arrasto.ox + dx, ny = arrasto.oy + dy;
      if (dados.snap) { nx = Math.round(nx / GRADE) * GRADE; ny = Math.round(ny / GRADE) * GRADE; }
      arrasto.no.x = nx; arrasto.no.y = ny;
      posicionar(arrasto.el, arrasto.no);
      desenharLigacoes();
    } else if (arrasto.tipo === 'resize') {
      let w = arrasto.ow + (e.clientX - arrasto.sx) / dados.view.zoom;
      let h = arrasto.oh + (e.clientY - arrasto.sy) / dados.view.zoom;
      if (dados.snap) { w = Math.round(w / GRADE) * GRADE; h = Math.round(h / GRADE) * GRADE; }
      arrasto.no.w = Math.max(150, Math.round(w));
      arrasto.no.h = Math.max(80, Math.round(h));
      arrasto.el.style.width = arrasto.no.w + 'px';
      arrasto.el.style.height = arrasto.no.h + 'px';
      desenharLigacoes();
    } else if (arrasto.tipo === 'pan') {
      dados.view.x = arrasto.ox + (e.clientX - arrasto.sx);
      dados.view.y = arrasto.oy + (e.clientY - arrasto.sy);
      aplicarView();
    }
  }

  function aoPointerUp() {
    if (!arrasto) return;
    if (arrasto.tipo === 'no' || arrasto.tipo === 'resize') canvas.classList.remove('mp--arrastando');
    if (arrasto.tipo === 'pan') viewport.classList.remove('mp--panning');
    arrasto = null;
    salvar();
  }

  function aoRodar(e) {
    e.preventDefault();
    const r = viewport.getBoundingClientRect();
    const cx = e.clientX - r.left, cy = e.clientY - r.top;
    const antes = dados.view.zoom;
    const z = limitar(antes * (e.deltaY < 0 ? 1.12 : 1 / 1.12), ZOOM_MIN, ZOOM_MAX);
    // mantém o ponto sob o cursor parado
    dados.view.x = cx - (cx - dados.view.x) * (z / antes);
    dados.view.y = cy - (cy - dados.view.y) * (z / antes);
    dados.view.zoom = z;
    aplicarView();
    salvar();
  }

  // ── ligações (clique na alça → clique no destino) ────────────────
  function iniciarLigacao(id) {
    if (ligandoDe === id) { cancelarLigacao(); return; }
    ligandoDe = id;
    canvas.classList.add('mp--ligando');
    Object.values(elNo).forEach(el => el.classList.remove('mp-no--origem'));
    if (elNo[id]) elNo[id].classList.add('mp-no--origem');
    mostrarDica('Ligando — clique no nó de destino. (Esc cancela)');
  }
  function cancelarLigacao() {
    if (!ligandoDe) return;
    ligandoDe = null;
    canvas.classList.remove('mp--ligando');
    Object.values(elNo).forEach(el => el.classList.remove('mp-no--origem'));
    esconderDica();
  }
  function concluirLigacao(idDestino) {
    if (!ligandoDe || idDestino === ligandoDe) { cancelarLigacao(); return; }
    const existe = dados.ligacoes.some(l => l.de === ligandoDe && l.para === idDestino);
    if (!existe) {
      dados.ligacoes.push({ id: uid('l'), de: ligandoDe, para: idDestino });
      desenharLigacoes();
      salvar();
    }
    cancelarLigacao();
  }
  function mostrarDica(txt) { if (dica) { dica.textContent = txt; dica.hidden = false; } }
  function esconderDica() { if (dica) dica.hidden = true; }

  // ═══════════════════════════════════════════════════════════════
  //  CLIQUES (toolbar, alças, deletar, concluir ligação)
  // ═══════════════════════════════════════════════════════════════
  function aoClicar(e) {
    // Shift+clique num nó → entra/sai da seleção (para agrupar)
    if (e.shiftKey) {
      const n = e.target.closest('.mp-no');
      if (n) { alternarSelecao(n.dataset.id); return; }
    }

    const acaoBtn = e.target.closest('[data-mp-acao]');
    if (acaoBtn) { despacharAcao(acaoBtn.dataset.mpAcao); return; }

    const fmt = e.target.closest('[data-mp-fmt]');
    if (fmt) { acaoFormato(fmt.closest('.mp-no').dataset.id, fmt.dataset.mpFmt); return; }

    const rot = e.target.closest('[data-mp-edge-rot]');
    if (rot) { editarRotulo(rot.dataset.mpEdgeRot); return; }

    const edge = e.target.closest('[data-mp-edge]');
    if (edge) { removerLigacao(edge.dataset.mpEdge); return; }

    const handle = e.target.closest('.mp-no-handle');
    if (handle) { iniciarLigacao(handle.closest('.mp-no').dataset.id); return; }

    const dup = e.target.closest('.mp-no-dup');
    if (dup) { duplicarNo(dup.closest('.mp-no').dataset.id); return; }

    const del = e.target.closest('.mp-no-del');
    if (del) { removerNo(del.closest('.mp-no').dataset.id); return; }

    // se estou ligando, um clique num nó conclui a ligação
    if (ligandoDe) {
      const noEl = e.target.closest('.mp-no');
      if (noEl) { concluirLigacao(noEl.dataset.id); return; }
      cancelarLigacao();
    }
  }

  function despacharAcao(acao) {
    if (acao === 'novo') return novoNo();
    if (acao === 'organizar') return organizarLinhaDoTempo();
    if (acao === 'raias') return organizarRaias();
    if (acao === 'importar-ramos') return importarDosRamos();
    if (acao === 'zoom-mais') return zoomPasso(1.18);
    if (acao === 'zoom-menos') return zoomPasso(1 / 1.18);
    if (acao === 'ajustar') return ajustar();
    if (acao === 'exportar') return exportarMapa();
    if (acao === 'exportar-txt') return exportarTextoMapa();
    if (acao === 'importar') { const i = document.getElementById('mpImportFile'); if (i) i.click(); return; }
    if (acao === 'limpar') return limparTudo();
    if (acao === 'snap') return alternarSnap();
    if (acao === 'tela-cheia') return alternarTelaCheia();
    if (acao === 'agrupar') return agruparSelecionados();
  }

  // ── formatação ───────────────────────────────────────────────────
  // travar/recolher mudam o nó inteiro; negrito/itálico/tamanho agem
  // SÓ no trecho selecionado dentro do corpo (texto rico).
  function acaoFormato(id, tipo) {
    const no = noPorId(id);
    if (!no) return;
    if (tipo === 'lock') { no.travado = !no.travado; renderUmNo(no); salvar(); return; }
    if (tipo === 'recolher') { no.recolhido = !no.recolhido; renderUmNo(no); salvar(); return; }
    if (no.travado) return;

    const corpo = elNo[id] && elNo[id].querySelector('.mp-no-texto');
    if (!corpo) return;
    if (!selecaoDentro(corpo)) { corpo.focus(); return; }   // precisa de cursor/seleção no texto
    if (tipo === 'b') document.execCommand('bold');
    else if (tipo === 'i') document.execCommand('italic');
    else if (tipo === 'maior') envolverSelecao('1.18em');
    else if (tipo === 'menor') envolverSelecao('0.85em');
    no.texto = corpo.innerHTML;                            // guarda o resultado (sanitiza no render)
    desenharLigacoes();
    salvar();
  }

  // ── rótulo de uma seta (clique no ＋/texto do meio dela) ───────────
  function editarRotulo(idLig) {
    const lig = dados.ligacoes.find(l => l.id === idLig);
    if (!lig) return;
    const novo = prompt('Texto da seta (deixe vazio para remover):', lig.rotulo || '');
    if (novo === null) return;
    lig.rotulo = novo.trim();
    desenharLigacoes();
    salvar();
  }

  // ── seleção múltipla (Shift+clique) → agrupar ─────────────────────
  function alternarSelecao(id) {
    if (selec.has(id)) selec.delete(id); else selec.add(id);
    const el = elNo[id];
    if (el) el.classList.toggle('mp-no--sel', selec.has(id));
    atualizarBotaoAgrupar();
  }
  function limparSelecao() {
    selec.forEach(id => { const el = elNo[id]; if (el) el.classList.remove('mp-no--sel'); });
    selec.clear();
    atualizarBotaoAgrupar();
  }
  function atualizarBotaoAgrupar() {
    const b = painel.querySelector('[data-mp-acao="agrupar"]');
    if (!b) return;
    b.disabled = selec.size < 2;
    b.textContent = selec.size >= 2 ? `⿴ Agrupar (${selec.size})` : '⿴ Agrupar';
  }

  function agruparSelecionados() {
    if (selec.size < 2) { alert('Selecione 2 ou mais nós com Shift+clique para agrupar.'); return; }
    const ids = [...selec];
    const nos = ids.map(noPorId).filter(Boolean);
    if (nos.length < 2) { limparSelecao(); return; }
    if (!confirm(`Agrupar ${nos.length} nós em um só? O conteúdo é juntado num bloco e os originais somem (não há desfazer). Recomenda-se fazer backup.`)) return;

    const setIds = new Set(ids);
    const x = Math.min.apply(null, nos.map(n => n.x));
    const y = Math.min.apply(null, nos.map(n => n.y));
    const w = Math.max.apply(null, nos.map(n => n.w || LARGURA_NO));
    const titulo = (nos.map(n => n.titulo).find(t => t && t.trim()) || 'Grupo').trim();
    const texto = nos.map(n => {
      const t = (n.titulo || '').trim();
      const c = (n.texto || '').trim();              // já é HTML
      return '• ' + (t ? '<b>' + esc(t) + '</b>' + (c ? ' — ' : '') : '') + c;
    }).join('<br>');
    const novo = {
      id: uid('n'), cat: nos[0].cat, cor: nos[0].cor || '', w: Math.max(w, 240), h: 0,
      travado: false, recolhido: false,
      titulo, texto, x, y,
    };
    // religa as setas: internas somem; externas passam a apontar ao novo nó
    dados.ligacoes.forEach(l => {
      const de = setIds.has(l.de), pa = setIds.has(l.para);
      if (de && pa) { l._drop = true; return; }
      if (de) l.de = novo.id;
      if (pa) l.para = novo.id;
    });
    dados.ligacoes = dados.ligacoes.filter(l => !l._drop);
    dados.nos = dados.nos.filter(n => !setIds.has(n.id));
    dados.nos.push(novo);
    selec.clear();
    normalizar();
    renderTudo();
    atualizarBotaoAgrupar();
    salvar();
  }

  // ── busca: realça quem casa e apaga o resto ───────────────────────
  function buscar(q) {
    const sa = window.GA_semAcento || (s => String(s).toLowerCase());
    const termo = sa(q).trim();
    dados.nos.forEach(no => {
      const el = elNo[no.id];
      if (!el) return;
      if (!termo) { el.classList.remove('mp-no--apaga', 'mp-no--match'); return; }
      const bate = sa(no.titulo + ' ' + no.texto).indexOf(termo) !== -1;
      el.classList.toggle('mp-no--match', bate);
      el.classList.toggle('mp-no--apaga', !bate);
    });
  }

  function alternarSnap() {
    dados.snap = !dados.snap;
    const b = painel.querySelector('[data-mp-acao="snap"]');
    if (b) b.classList.toggle('mp-btn--ativo', dados.snap);
    salvar();
  }

  // ── TELA CHEIA — Fullscreen API, com fallback CSS (maximizado) ─────
  function alternarTelaCheia() {
    if (painel.classList.contains('mp--maximizado')) {     // saindo do fallback CSS
      painel.classList.remove('mp--maximizado');
      aoMudarTamanhoQuadro();
      return;
    }
    if (document.fullscreenElement === painel) {
      if (document.exitFullscreen) document.exitFullscreen();
      return;
    }
    if (painel.requestFullscreen) {
      painel.requestFullscreen().catch(() => { painel.classList.add('mp--maximizado'); aoMudarTamanhoQuadro(); });
    } else {
      painel.classList.add('mp--maximizado');
      aoMudarTamanhoQuadro();
    }
  }

  // chamado ao entrar/sair de tela cheia (ou maximizar): atualiza o botão e as setas
  function aoMudarTamanhoQuadro() {
    const b = painel.querySelector('[data-mp-acao="tela-cheia"]');
    const cheio = (document.fullscreenElement === painel) || painel.classList.contains('mp--maximizado');
    if (b) b.textContent = cheio ? '⛶ Sair' : '⛶ Tela cheia';
    desenharLigacoes();
  }

  // duplo-clique na alça de redimensionar volta o nó ao tamanho automático
  function aoDuploClique(e) {
    const rh = e.target.closest('.mp-no-resize');
    if (!rh) return;
    const no = noPorId(rh.closest('.mp-no').dataset.id);
    if (!no) return;
    no.w = LARGURA_NO; no.h = 0;
    renderTudo();
    salvar();
  }

  // ── edição de campos (sem re-render: mantém o foco) ───────────────
  function aoDigitar(e) {
    if (e.target.id === 'mpBusca') { buscar(e.target.value); return; }
    const noEl = e.target.closest('.mp-no');
    if (!noEl) return;
    const no = noPorId(noEl.dataset.id);
    if (!no) return;
    if (e.target.classList.contains('mp-no-titulo')) { no.titulo = e.target.value; salvar(); }
    else if (e.target.classList.contains('mp-no-texto')) {
      no.texto = e.target.innerHTML;
      desenharLigacoes();                       // altura pode mudar → setas acompanham
      salvar();
    }
  }

  // colar limpo no corpo do nó (junta as quebras duras de PDF, igual às
  // caixas de texto rico do Bestiário/Combates — sem isso o navegador
  // colaria cada linha copiada como um <div> à parte, quebrando o layout)
  function aoColar(e) {
    const corpo = e.target.closest('.mp-no-texto');
    if (!corpo) return;
    e.preventDefault();
    const bruto = (e.clipboardData || window.clipboardData).getData('text/plain');
    const limpo = window.GA_limparQuebras(bruto);
    const sel = window.getSelection();
    if (!sel.rangeCount || !corpo.contains(sel.getRangeAt(0).commonAncestorContainer)) return;
    sel.deleteFromDocument();
    sel.getRangeAt(0).insertNode(document.createTextNode(limpo));
    sel.collapseToEnd();
    const no = noPorId(corpo.closest('.mp-no').dataset.id);
    if (no) {
      no.texto = corpo.innerHTML;
      desenharLigacoes();
      salvar();
    }
  }

  function aoMudar(e) {
    if (e.target.id === 'mpImportFile') { aoEscolherArquivo(e); return; }
    const noEl = e.target.closest('.mp-no');
    if (!noEl) return;
    const no = noPorId(noEl.dataset.id);
    if (!no) return;
    if (e.target.classList.contains('mp-no-cat')) {
      no.cat = e.target.value;
      noEl.style.setProperty('--cor', corDoNo(no));   // categoria não sobrepõe cor própria
      const inp = noEl.querySelector('.mp-no-cor');
      if (inp && !no.cor) inp.value = corDoNo(no);
      desenharLigacoes();
      salvar();
    } else if (e.target.classList.contains('mp-no-cor')) {
      if (no.travado) return;
      no.cor = e.target.value;
      noEl.style.setProperty('--cor', corDoNo(no));
      desenharLigacoes();                       // a seta segue a cor do nó de origem
      salvar();
    }
  }

  // ═══════════════════════════════════════════════════════════════
  //  AÇÕES
  // ═══════════════════════════════════════════════════════════════
  function novoNo() {
    const r = viewport.getBoundingClientRect();
    const centro = telaParaMundo(r.left + r.width / 2, r.top + r.height / 2);
    const off = (cascata++ % 6) * 26;             // cascata leve p/ não nascerem um sobre o outro
    const no = {
      id: uid('n'), cat: 'ideia', titulo: '', texto: '', w: LARGURA_NO, h: 0,
      x: Math.round(centro.x - LARGURA_NO / 2 + off), y: Math.round(centro.y - 40 + off),
    };
    dados.nos.push(no);
    renderTudo();
    salvar();
    const el = elNo[no.id];
    if (el) { el.style.zIndex = ++zTopo; const t = el.querySelector('.mp-no-titulo'); if (t) t.focus(); }
  }

  // Duplica um nó (mesma categoria/tamanho/texto), deslocado um pouco.
  // Atalho ideal para criar vários blocos de fase iguais (começo, meio, fim…).
  function duplicarNo(id) {
    const no = noPorId(id);
    if (!no) return;
    const copia = { ...no, id: uid('n'), x: no.x + 26, y: no.y + 26 };
    dados.nos.push(copia);
    renderTudo();
    salvar();
    const el = elNo[copia.id];
    if (el) el.style.zIndex = ++zTopo;
  }

  function removerNo(id) {
    const no = noPorId(id);
    if (!no) return;
    const temConteudo = no.titulo || no.texto;
    if (temConteudo && !confirm('Remover este nó e as ligações dele?')) return;
    selec.delete(id);
    dados.nos = dados.nos.filter(n => n.id !== id);
    dados.ligacoes = dados.ligacoes.filter(l => l.de !== id && l.para !== id);
    renderTudo();
    atualizarBotaoAgrupar();
    salvar();
  }

  function removerLigacao(id) {
    dados.ligacoes = dados.ligacoes.filter(l => l.id !== id);
    desenharLigacoes();
    salvar();
  }

  function zoomPasso(fator) {
    const r = viewport.getBoundingClientRect();
    const cx = r.width / 2, cy = r.height / 2;
    const antes = dados.view.zoom;
    const z = limitar(antes * fator, ZOOM_MIN, ZOOM_MAX);
    dados.view.x = cx - (cx - dados.view.x) * (z / antes);
    dados.view.y = cy - (cy - dados.view.y) * (z / antes);
    dados.view.zoom = z;
    aplicarView();
    salvar();
  }

  // enquadra todos os nós dentro da viewport
  function ajustar() {
    if (!dados.nos.length) {
      dados.view = { x: 40, y: 40, zoom: 1 };
      aplicarView(); salvar(); return;
    }
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    dados.nos.forEach(n => {
      const el = elNo[n.id];
      const w = el ? el.offsetWidth : LARGURA_NO;
      const h = el ? el.offsetHeight : 90;
      minX = Math.min(minX, n.x); minY = Math.min(minY, n.y);
      maxX = Math.max(maxX, n.x + w); maxY = Math.max(maxY, n.y + h);
    });
    const pad = 50;
    const larg = (maxX - minX) + pad * 2, alt = (maxY - minY) + pad * 2;
    const vw = viewport.clientWidth, vh = viewport.clientHeight;
    if (!vw || !vh) return;                     // painel oculto
    const z = limitar(Math.min(vw / larg, vh / alt), ZOOM_MIN, ZOOM_MAX);
    dados.view.zoom = z;
    dados.view.x = (vw - larg * z) / 2 - (minX - pad) * z;
    dados.view.y = (vh - alt * z) / 2 - (minY - pad) * z;
    aplicarView();
    salvar();
  }

  // ── auto-organizar em LINHA DO TEMPO (ordem topológica das setas) ──
  function organizarLinhaDoTempo() {
    if (!dados.nos.length) return;
    const ordem = ordenarTopologico();
    const GAP_X = LARGURA_NO + 80;
    const baseX = 60, baseY = 80;
    ordem.forEach((id, i) => {
      const no = noPorId(id);
      if (!no) return;
      no.x = baseX + i * GAP_X;                 // tudo numa fileira → esquerda p/ direita = tempo
      no.y = baseY;
      if (elNo[id]) posicionar(elNo[id], no);   // move o elemento existente → transição CSS anima
    });
    ajustar();                                  // enquadra a nova linha
    redesenharDuranteAnim(400);                 // as setas acompanham o deslize dos nós
    salvar();
  }

  // redesenha as ligações a cada quadro por ~ms (acompanha animações CSS de posição)
  function redesenharDuranteAnim(ms) {
    const t0 = performance.now();
    (function passo(t) {
      desenharLigacoes();
      if (t - t0 < ms) requestAnimationFrame(passo);
    })(t0);
  }

  // ── auto-organizar em RAIAS ───────────────────────────────────────
  // A "espinha" = a cadeia MAIS LONGA de setas (as fases). Vira a linha
  // de cima, uma coluna por fase. Cada outro nó (detalhe) cai na coluna
  // da fase a que se liga e é empilhado abaixo, em raias.
  function organizarRaias() {
    if (!dados.nos.length) return;
    const ids = dados.nos.map(n => n.id);
    const saida = {}, entrada = {};
    ids.forEach(id => { saida[id] = []; entrada[id] = []; });
    dados.ligacoes.forEach(l => {
      if (saida[l.de] && entrada[l.para]) { saida[l.de].push(l.para); entrada[l.para].push(l.de); }
    });

    // caminho mais longo (DP em ordem topológica reversa) → a espinha (fases)
    const ordem = ordenarTopologico();
    const dist = {}, prox = {};
    for (let i = ordem.length - 1; i >= 0; i--) {
      const id = ordem[i];
      dist[id] = 0; prox[id] = null;
      saida[id].forEach(v => {
        if (saida[v].length === 0) return;        // não estende a espinha por uma folha (detalhe sem saída)
        if ((dist[v] + 1) > dist[id]) { dist[id] = dist[v] + 1; prox[id] = v; }
      });
    }
    let ini = ordem[0];
    ordem.forEach(id => { if (dist[id] > dist[ini]) ini = id; });
    const naEspinha = new Set();
    const espinha = [];
    for (let id = ini; id && !naEspinha.has(id); id = prox[id]) { espinha.push(id); naEspinha.add(id); }

    // coluna de cada nó: fases pela posição na espinha; detalhes herdam a
    // coluna de quem aponta para eles (ou de quem eles apontam) na espinha
    const coluna = {};
    espinha.forEach((id, i) => { coluna[id] = i; });
    ordem.forEach(id => {
      if (naEspinha.has(id)) return;
      let col = null;
      entrada[id].forEach(p => { if (col == null && coluna[p] != null) col = coluna[p]; });
      if (col == null) saida[id].forEach(v => { if (col == null && coluna[v] != null) col = coluna[v]; });
      coluna[id] = (col == null) ? espinha.length : col;     // sem vínculo → coluna extra à direita
    });

    // medidas para espaçar bem
    const larg = id => (elNo[id] ? elNo[id].offsetWidth : (noPorId(id).w || LARGURA_NO));
    const alt  = id => (elNo[id] ? elNo[id].offsetHeight : 90);
    let maxW = LARGURA_NO;
    ids.forEach(id => { maxW = Math.max(maxW, larg(id)); });
    const COL_W = maxW + 70, X0 = 60, Y_FASE = 40;
    let faseMaxH = 0;
    espinha.forEach(id => { faseMaxH = Math.max(faseMaxH, alt(id)); });
    const Y_DET0 = Y_FASE + (faseMaxH || 90) + 60;

    // fases na linha de cima
    espinha.forEach((id, i) => {
      const no = noPorId(id); if (!no) return;
      no.x = X0 + i * COL_W; no.y = Y_FASE;
      if (elNo[id]) posicionar(elNo[id], no);
    });
    // detalhes empilhados por coluna, na ordem topológica (mantém a sequência)
    const proxY = {};
    ordem.forEach(id => {
      if (naEspinha.has(id)) return;
      const no = noPorId(id); if (!no) return;
      const col = coluna[id];
      const y = (proxY[col] != null) ? proxY[col] : Y_DET0;
      no.x = X0 + col * COL_W; no.y = y;
      proxY[col] = y + alt(id) + 28;
      if (elNo[id]) posicionar(elNo[id], no);
    });

    ajustar();
    redesenharDuranteAnim(440);
    salvar();
  }

  // Kahn: respeita o sentido das setas (de → para). Sobras (ciclos/soltos)
  // entram na ordem atual da esquerda p/ direita, depois por criação.
  function ordenarTopologico() {
    const ids = dados.nos.map(n => n.id);
    const grau = {}, adj = {};
    ids.forEach(id => { grau[id] = 0; adj[id] = []; });
    dados.ligacoes.forEach(l => {
      if (adj[l.de] && grau[l.para] != null) { adj[l.de].push(l.para); grau[l.para]++; }
    });
    // ordem-base estável: posição x atual, e depois a ordem do array
    const ordemBase = ids.slice().sort((a, b) => {
      const na = noPorId(a), nb = noPorId(b);
      return (na.x - nb.x) || (ids.indexOf(a) - ids.indexOf(b));
    });
    const fila = ordemBase.filter(id => grau[id] === 0);
    const saida = [], visto = new Set();
    while (fila.length) {
      const id = fila.shift();
      if (visto.has(id)) continue;
      visto.add(id); saida.push(id);
      adj[id].forEach(v => { if (--grau[v] <= 0 && !visto.has(v)) fila.push(v); });
      fila.sort((a, b) => ordemBase.indexOf(a) - ordemBase.indexOf(b));
    }
    ordemBase.forEach(id => { if (!visto.has(id)) saida.push(id); });  // sobras
    return saida;
  }

  function limparTudo() {
    if (dados.nos.length && !confirm('Apagar TODOS os nós e ligações do mapa? (Os Ramos não são afetados.)')) return;
    dados = { nos: [], ligacoes: [], view: { x: 40, y: 40, zoom: 1 } };
    aplicarView();
    renderTudo();
    salvarAgora();
  }

  // ═══════════════════════════════════════════════════════════════
  //  TRAZER DOS RAMOS — converte a árvore de anotacoes.js em nós
  // ═══════════════════════════════════════════════════════════════
  function importarDosRamos() {
    let ramos = [];
    try {
      const txt = localStorage.getItem(RAMOS_KEY);
      const obj = txt ? JSON.parse(txt) : null;
      if (obj && Array.isArray(obj.ramos)) ramos = obj.ramos;
    } catch (e) { /* ignora */ }

    if (!ramos.length) {
      alert('Não há Ramos para trazer. Crie anotações na sub-aba "📜 Ramos" primeiro.');
      return;
    }
    if (dados.nos.length &&
        !confirm('Isto cria nós a partir dos seus Ramos e adiciona ao mapa atual. Continuar?')) return;

    const GAP_X = LARGURA_NO + 80, GAP_Y = 130;
    let linha = 0;                              // contador de linhas (y) em profundidade DFS

    function visitar(ramo, prof, idPai) {
      const cat = (typeof ramo.cat === 'string' && CAT_POR_CHAVE[ramo.cat]) ? ramo.cat : 'outro';
      const no = {
        id: uid('n'), cat, w: LARGURA_NO, h: 0,
        titulo: typeof ramo.titulo === 'string' ? ramo.titulo : '',
        // o corpo do Ramo é texto puro → vira HTML seguro (com quebras de linha)
        texto: window.GA_nl2br ? window.GA_nl2br(ramo.texto || '') : esc(ramo.texto || ''),
        x: 60 + prof * GAP_X,
        y: 60 + linha * GAP_Y,
      };
      dados.nos.push(no);
      if (idPai) dados.ligacoes.push({ id: uid('l'), de: idPai, para: no.id });
      linha++;
      (Array.isArray(ramo.filhos) ? ramo.filhos : []).forEach(f => visitar(f, prof + 1, no.id));
    }

    ramos.forEach(r => visitar(r, 0, null));
    renderTudo();
    salvarAgora();
    setTimeout(ajustar, 30);
  }

  // ═══════════════════════════════════════════════════════════════
  //  BACKUP / IMPORTAÇÃO (.json) do mapa
  // ═══════════════════════════════════════════════════════════════
  function exportarMapa() {
    if (!dados.nos.length) { alert('Não há nada para exportar — crie ao menos um nó.'); return; }
    const pacote = {
      app: 'Grifos Alados', tipo: 'anotacoes-mapa', versao: 1,
      exportadoEm: new Date().toISOString(),
      nos: dados.nos, ligacoes: dados.ligacoes, view: dados.view,
    };
    baixarTxt(`mapa_anotacoes_${carimboArquivo()}.json`, JSON.stringify(pacote, null, 2));
  }

  // Exporta um .txt legível: os nós na ordem da linha do tempo (ordem das
  // setas), com categoria, texto e para onde cada um aponta. Bom para ler,
  // imprimir ou entregar a uma IA enxergar a história e as ideias.
  function exportarTextoMapa() {
    if (!dados.nos.length) { alert('Não há nada para exportar — crie ao menos um nó.'); return; }
    const ordem = ordenarTopologico();
    const linhas = [
      '══════════════════════════════════════════════',
      '   GRIFOS ALADOS · MAPA / LINHA DO TEMPO',
      `   Exportado em ${new Date().toLocaleString('pt-BR')}`,
      `   ${dados.nos.length} nó(s) · ${dados.ligacoes.length} ligação(ões)`,
      '══════════════════════════════════════════════',
      '',
    ];
    ordem.forEach((id, i) => {
      const no = noPorId(id);
      if (!no) return;
      const cat = (CAT_POR_CHAVE[no.cat] || CAT_POR_CHAVE.outro).nome;
      linhas.push(`${i + 1}. [${cat}] ${(no.titulo || '(sem título)').trim()}`);
      const txtPlano = (window.htmlParaTexto ? window.htmlParaTexto(no.texto) : String(no.texto || '')).trim();
      if (txtPlano) txtPlano.split('\n').forEach(l => linhas.push(`      ${l.trim()}`));
      const saidas = dados.ligacoes.filter(l => l.de === id)
        .map(l => { const d = noPorId(l.para); return d ? (d.titulo || '(sem título)') : '?'; });
      if (saidas.length) linhas.push(`      → conecta a: ${saidas.join(' · ')}`);
      linhas.push('');
    });
    baixarTxt(`mapa_anotacoes_${carimboArquivo()}.txt`, linhas.join('\n'));
  }

  function aoEscolherArquivo(e) {
    const input = e.target;
    if (!input.files || !input.files.length) return;
    const arq = input.files[0];
    input.value = '';
    const leitor = new FileReader();
    leitor.onload = () => {
      let parsed;
      try { parsed = JSON.parse(leitor.result); }
      catch (err) { alert('Arquivo inválido — não é um backup .json do mapa.'); return; }
      if (parsed && parsed.tipo && parsed.tipo !== 'anotacoes-mapa') {
        alert('Este arquivo é um backup de "' + parsed.tipo + '", não do Mapa.'); return;
      }
      if (!parsed || !Array.isArray(parsed.nos)) { alert('Backup sem nós — verifique o arquivo.'); return; }
      abrirModalImportar(parsed);
    };
    leitor.onerror = () => alert('Não foi possível ler o arquivo.');
    leitor.readAsText(arq);
  }

  function abrirModalImportar(pacote) {
    const nNos = pacote.nos.length;
    const nLig = Array.isArray(pacote.ligacoes) ? pacote.ligacoes.length : 0;
    const overlay = GA_abrirModal(`
      <div class="ga-modal-cab">
        <span>⬆ Importar mapa</span>
        <button class="ga-modal-x" data-ga-fechar title="Fechar">✕</button>
      </div>
      <p class="ga-modal-dica">O arquivo traz <strong>${nNos} nó${nNos !== 1 ? 's' : ''}</strong>
        e ${nLig} ligação${nLig !== 1 ? 'ões' : ''}. Você tem ${dados.nos.length} nó${dados.nos.length !== 1 ? 's' : ''} no mapa.</p>
      <div class="ga-modal-acoes">
        <button class="ga-btn-sec" data-ga-fechar>Cancelar</button>
        <button class="ga-btn-sec" data-imp-modo="adicionar">➕ Adicionar</button>
        <button class="ga-btn-principal" data-imp-modo="substituir">♻ Substituir tudo</button>
      </div>`);

    overlay.addEventListener('click', e => {
      const btn = e.target.closest('[data-imp-modo]');
      if (!btn) return;
      const novosNos = pacote.nos.map(n => ({ ...n, id: uid('n') }));
      const idAntigoParaNovo = {};
      pacote.nos.forEach((n, i) => { idAntigoParaNovo[n.id] = novosNos[i].id; });
      const novasLig = (pacote.ligacoes || [])
        .filter(l => idAntigoParaNovo[l.de] && idAntigoParaNovo[l.para])
        .map(l => ({ id: uid('l'), de: idAntigoParaNovo[l.de], para: idAntigoParaNovo[l.para] }));

      const modo = btn.dataset.impModo;
      if (modo === 'substituir') {
        if (dados.nos.length && !confirm('Isto APAGA o mapa atual e coloca o do arquivo no lugar. Continuar?')) return;
        dados.nos = novosNos;
        dados.ligacoes = novasLig;
        if (pacote.view) dados.view = pacote.view;
      } else {
        dados.nos = dados.nos.concat(novosNos);
        dados.ligacoes = dados.ligacoes.concat(novasLig);
      }
      normalizar();
      overlay._fechar();
      aplicarView();
      renderTudo();
      salvarAgora();
      // ao SUBSTITUIR, mantém posições e enquadramento idênticos ao do arquivo;
      // ao ADICIONAR (ou se o arquivo não trouxe view), enquadra para mostrar tudo
      if (modo === 'adicionar' || !pacote.view) setTimeout(ajustar, 30);
    });
  }

  // ═══════════════════════════════════════════════════════════════
  //  SUB-ABAS (📜 Ramos | 🗺 Mapa) + inicialização
  // ═══════════════════════════════════════════════════════════════
  function ligarSubabas() {
    const secao = document.getElementById('anotacoes');
    if (!secao) return;
    const bar = secao.querySelector('.an-subtabs');
    if (!bar) return;
    bar.addEventListener('click', e => {
      const btn = e.target.closest('[data-an-tab]');
      if (!btn) return;
      const alvo = btn.dataset.anTab;
      bar.querySelectorAll('[data-an-tab]').forEach(b =>
        b.classList.toggle('an-subtab--ativa', b === btn));
      secao.querySelectorAll('[data-an-panel]').forEach(p => {
        p.hidden = (p.dataset.anPanel !== alvo);
      });
      if (alvo === 'mapa') aoMostrarMapa();
      else if (painel) painel.classList.remove('mp--maximizado');   // sai do maximizado ao trocar de sub-aba
    });
  }

  // quando o painel do mapa fica visível, as medidas passam a existir:
  // reaplica a view, redesenha as setas e, na 1ª vez, enquadra tudo.
  function aoMostrarMapa() {
    if (!montado) montar();
    aplicarView();
    desenharLigacoes();
    if (!jaAjustou && dados.nos.length) { ajustar(); jaAjustou = true; }
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (!document.getElementById('anotacoes-mapa')) return;
    carregar();
    montar();
    ligarSubabas();

    // se a aba Anotações for aberta com o Mapa já ativo, reenquadra
    const navLink = document.querySelector('.nav-link[data-section="anotacoes"]');
    if (navLink) navLink.addEventListener('click', () => {
      const mapaAtivo = document.querySelector('.an-subtab--ativa');
      if (mapaAtivo && mapaAtivo.dataset.anTab === 'mapa') setTimeout(aoMostrarMapa, 0);
    });
    window.addEventListener('resize', () => { if (montado) desenharLigacoes(); });
  });

})();
