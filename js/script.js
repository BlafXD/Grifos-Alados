// ═══════════════════════════════════════════════════════════════════
//  UTILITÁRIOS DE EXPORTAÇÃO (compartilhados por todos os módulos)
//  Servem para gerar os arquivos .txt que o mestre envia no Discord.
// ═══════════════════════════════════════════════════════════════════

// ── Texto: escape de HTML e normalização de busca (compartilhados) ──
// Antes cada módulo mantinha a própria cópia destas; agora todos usam estas.
window.GA_esc = function (s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
};
window.GA_nl2br = function (s) { return window.GA_esc(s).replace(/\n/g, '<br>'); };
// Remove acentos para busca, SEM regex (descarta os combining marks U+0300–U+036F).
window.GA_semAcento = function (s) {
  const nfd = String(s || '').normalize('NFD');
  let out = '';
  for (let i = 0; i < nfd.length; i++) {
    const c = nfd.charCodeAt(i);
    if (c >= 768 && c <= 879) continue;   // 0x300–0x36F = acentos combinantes
    out += nfd[i];
  }
  return out.toLowerCase();
};

// Baixa um conteúdo de texto como arquivo .txt.
window.baixarTxt = function (nomeArquivo, conteudo) {
  const blob = new Blob([conteudo], { type: 'text/plain;charset=utf-8' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url;
  a.download = nomeArquivo;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};

// Carimbo de data para nomes de arquivo: 2026-06-17_14-30
window.carimboArquivo = function () {
  const d = new Date(), p = n => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}_${p(d.getHours())}-${p(d.getMinutes())}`;
};

// Junta linhas quebradas (ex.: texto colado de um PDF) em parágrafos
// corridos, mantendo como parágrafos separados só as linhas em branco
// ou que comecem um novo item (marcador de lista/numeração).
window.GA_limparQuebras = function (texto) {
  const linhas = String(texto == null ? '' : texto)
    .replace(/\r\n?/g, '\n')
    .split('\n');

  function iniciaItem(linha) {
    return /^\s*([•‣▪●◦*–—-]\s|\d+[.)]\s)/.test(linha);
  }

  const blocos = [];
  let atual = '';

  for (let i = 0; i < linhas.length; i++) {
    const linha = linhas[i].trim();

    if (linha === '') {                       // linha em branco = novo parágrafo
      if (atual) { blocos.push(atual); atual = ''; }
      continue;
    }
    if (atual === '') { atual = linha; continue; }

    const novoItem        = iniciaItem(linha);
    const fechouFrase     = /[.!?]$/.test(atual);          // bloco anterior terminou em pontuação
    const comecaMaiuscula = /^[A-ZÀ-Ý]/.test(linha);

    if (novoItem || (fechouFrase && comecaMaiuscula)) {
      blocos.push(atual);                     // nova linha
      atual = linha;
    } else {
      atual += ' ' + linha;                   // continuação da mesma frase
    }
  }
  if (atual) blocos.push(atual);

  return blocos.join('\n');
};

// Converte um trecho de HTML (ex.: caixa de ataques das fichas) em texto
// plano, preservando as quebras de linha de <br>, <div> e <p>.
window.htmlParaTexto = function (html) {
  if (html == null) return '';
  const div = document.createElement('div');
  div.innerHTML = String(html)
    .replace(/<\s*br\s*\/?>/gi, '\n')
    .replace(/<\/\s*(div|p|li)\s*>/gi, '\n');
  const txt = div.textContent || div.innerText || '';
  return txt.replace(/ /g, ' ').replace(/[ \t]+\n/g, '\n').trim();
};

// ── CAIXA DE ENTRADA DOS JOGADORES (compartilhada) ───────────────────
// Estamos na visão dos jogadores (jogadores.html)? Lá quase tudo é só
// leitura, mas alguns campos são editáveis de propósito.
window.GA_ehJogador = function () {
  return document.documentElement.classList.contains('ga-jogador');
};

// O ÚNICO caminho do banco em que os jogadores têm permissão de escrita é
// `mesas/<sala>/jogadores/inventario` (ver MODO-JOGADOR.md). Tudo o que
// eles escrevem passa por aqui: um objeto { [id]: { campo: html } }, com
// `id` sendo o id da base, da entrada do diário ou da parada — ids são
// únicos no app inteiro, então as abas convivem no mesmo mapa sem colidir.
// Quem consome: bases.js e viagem.js (gravar/limpar) e os dois syncs.
window.GA_Inbox = (function () {
  const CHAVE = 'grifosAlados.basesJogadoresInventario';

  function mapa() {
    try { return JSON.parse(localStorage.getItem(CHAVE) || '{}') || {}; }
    catch (e) { return {}; }
  }
  // Uma entrada pode ser a string antiga (a caixa "Inventário dos
  // jogadores", de quando só ela existia) ou o objeto novo.
  function de(id, m) {
    const v = (m || mapa())[id];
    if (typeof v === 'string') return { jogadores: v };
    return (v && typeof v === 'object') ? v : {};
  }
  // Grava um campo na caixa de entrada (espelho local + banco).
  function gravar(id, campo, html) {
    const m = mapa();
    const entrada = de(id, m);
    entrada[campo] = html;
    m[id] = entrada;
    try { localStorage.setItem(CHAVE, JSON.stringify(m)); } catch (e) {}
    try {
      if (window.GA_SyncJogador && window.GA_SyncJogador.escreverInbox) {
        window.GA_SyncJogador.escreverInbox(id, campo, html);
      }
    } catch (e) {}
  }
  // Tira um campo da caixa de entrada (só o mestre chega aqui: acabou de
  // absorver a edição para o arquivo dele, ou está limpando a caixa deles).
  function limpar(id, campo) {
    const m = mapa();
    const entrada = de(id, m);
    if (!(campo in entrada)) return false;
    delete entrada[campo];
    if (Object.keys(entrada).length) m[id] = entrada;
    else delete m[id];
    try { localStorage.setItem(CHAVE, JSON.stringify(m)); } catch (e) {}
    try { window.GA_SyncMestre && window.GA_SyncMestre.limparInbox &&
          window.GA_SyncMestre.limparInbox(id, campo); } catch (e) {}
    return true;
  }
  // As caixas viraram texto rico: a entrada passou a guardar HTML. O que foi
  // escrito ANTES disso é texto puro — reconhece pela ausência de tags e
  // converte na hora (as quebras de linha viram <br>).
  function html(bruto) {
    if (!bruto) return '';
    return /<[a-z][a-z0-9]*[\s/>]/i.test(bruto)
      ? window.GA_limparHtml(bruto)
      : window.GA_nl2br(bruto);
  }

  return { CHAVE: CHAVE, mapa: mapa, de: de, gravar: gravar, limpar: limpar, html: html };
})();

// ── GRIFOS (cores + caixa de leitura) — vocabulário compartilhado ────
// Nasceram na aba Combates (por isso as classes ainda se chamam mz-*) e
// hoje valem em qualquer campo rico do app. Os nomes de classe NÃO mudam:
// tudo o que já foi grifado e salvo continua valendo.
window.GA_GRIFOS = [
  { cls: 'mz-azul',     cor: '#bcdcee', nome: 'Azul — lore / falas' },
  { cls: 'mz-amarelo',  cor: '#f3e3a3', nome: 'Amarelo — ler em voz alta' },
  { cls: 'mz-vermelho', cor: '#f0c3bb', nome: 'Vermelho — segredo / perigo (só mestre)' },
  { cls: 'mz-verde',    cor: '#c4e3bd', nome: 'Verde — revelar aos jogadores' },
];
// classe da "caixa de leitura" (boxed) + seletor de tudo que "✦ Remover" desembrulha
window.GA_GRIFO_CAIXA   = 'mz-leitura';
window.GA_GRIFO_SELETOR = window.GA_GRIFOS.map(g => '.' + g.cls).join(', ') + ', .' + window.GA_GRIFO_CAIXA;

// ── TEXTO RICO (contenteditable) — sanitização compartilhada ─────────
// Mantém só formatação inline segura e preserva as descrições penduradas
// (※: span.ga-tip[data-tip]) e os grifos (span.mz-*). Vital ao renderizar
// conteúdo vindo de um backup .json (evita HTML malicioso) ou da caixa que
// os jogadores escrevem. Usado pelo Mapa, Ramos, Viagem, Bases e Combates.
window.GA_limparHtml = (function () {
  const TAGS_OK = { B: 1, STRONG: 1, I: 1, EM: 1, U: 1, BR: 1, DIV: 1, P: 1, SPAN: 1 };
  // únicas classes que sobrevivem à limpeza: as do grifo e a da descrição
  const CLASSES_OK = { 'ga-tip': 1 };
  CLASSES_OK[window.GA_GRIFO_CAIXA] = 1;
  window.GA_GRIFOS.forEach(g => { CLASSES_OK[g.cls] = 1; });
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
  return function (html) {
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
          // preserva as descrições penduradas (※): span.ga-tip[data-tip]
          // — a nuvem é desenhada pelo itens-descricoes.js (texto puro) —
          // e os grifos/caixas de leitura aplicados pela barra (span.mz-*)
          const classes = String(n.getAttribute('class') || '')
            .split(/\s+/).filter(c => CLASSES_OK[c]);
          const ehTip = classes.indexOf('ga-tip') >= 0;
          const tip = ehTip ? n.getAttribute('data-tip') : null;
          while (n.attributes.length) n.removeAttribute(n.attributes[0].name);
          if (estilo) n.setAttribute('style', estilo);
          if (classes.length) n.setAttribute('class', classes.join(' '));
          if (ehTip && tip) {
            n.setAttribute('data-tip', tip);
            n.setAttribute('tabindex', '0');
          }
          processar(n);
        } else if (n.nodeType !== 3) {
          pai.removeChild(n);                          // comentários etc.
        }
        n = prox;
      }
    })(cont);
    return cont.innerHTML;
  };
})();

// ── CAMPOS RICOS COM ※ DESCRIÇÃO (Ramos, Viagem, Bases) ─────────────
// Handlers compartilhados: cada aba os registra nos listeners da própria
// seção. Ao concluir qualquer mudança, disparam 'input' no campo — o
// handler de input da aba salva, como numa digitação normal.

// Envolve a seleção num <span class="…"> ('grifar') ou desembrulha todos
// os grifos tocados pela seleção ('desgrifar'). Só mexe dentro de `editor`.
// Retorna true se mudou alguma coisa. Mesma mecânica do Combate.
window.GA_aplicarGrifo = function (editor, acao, cor) {
  const sel = window.getSelection();
  if (!sel.rangeCount || sel.isCollapsed) return false;
  const range = sel.getRangeAt(0);
  if (!editor.contains(range.commonAncestorContainer)) return false;

  if (acao === 'grifar') {
    const span = document.createElement('span');
    span.className = cor || window.GA_GRIFOS[0].cls;
    try {
      range.surroundContents(span);
    } catch (err) {
      // a seleção atravessa mais de um elemento → extrai e reinsere
      span.appendChild(range.extractContents());
      range.insertNode(span);
    }
  } else {
    editor.querySelectorAll(window.GA_GRIFO_SELETOR).forEach(span => {
      if (sel.containsNode(span, true)) {
        while (span.firstChild) span.parentNode.insertBefore(span.firstChild, span);
        span.parentNode.removeChild(span);
      }
    });
    editor.normalize();
  }
  return true;
};

// HTML da barra de formatação de um campo rico (cores + caixa de leitura +
// ※ descrição + remover). Vai DENTRO do .ga-rich-wrap, antes do editor —
// é assim que o handler de mousedown acha o campo a que ela pertence.
window.GA_barraRica = function () {
  const esc = window.GA_esc;
  const sw = window.GA_GRIFOS.map(g =>
    `<button type="button" class="ga-barra-btn ga-barra-btn--sw" data-rich-acao="grifar"
             data-cor="${g.cls}" style="--sw:${g.cor}"
             title="Grifar: ${esc(g.nome)}"><span class="ga-barra-sw"></span></button>`).join('');
  return `
      <div class="ga-barra">
        <span class="ga-barra-rot">Grifar</span>${sw}
        <button type="button" class="ga-barra-btn ga-barra-btn--box" data-rich-acao="grifar" data-cor="${window.GA_GRIFO_CAIXA}"
                title="Marcar o trecho como caixa de leitura (boxed, estilo livro de aventura)">▣ Caixa</button>
        <button type="button" class="ga-barra-btn ga-barra-btn--desc" data-rich-acao="descrever"
                title="Pendurar uma descrição no trecho selecionado — escreva a sua ou busque na base (itens, magias, condições…). A nuvem aparece ao passar o mouse; CLIQUE no trecho para fixá-la e copiar">※ Descrição</button>
        <button type="button" class="ga-barra-btn ga-barra-btn--limpa" data-rich-acao="desgrifar"
                title="Tirar o grifo / a caixa do trecho selecionado">✦ Remover</button>
        <span class="ga-barra-dica">selecione · grife ou Ctrl+B / Ctrl+I</span>
      </div>`;
};

// Clique no ※ flutuante (.ga-rich-btn) ou em qualquer botão da barra rica:
// mousedown + preventDefault para NÃO perder a seleção (o truque do
// aoMousedownToolbar do Combate).
window.GA_richDescMousedown = function (e) {
  const btn = e.target.closest('[data-rich-desc], [data-rich-acao]');
  if (!btn) return;
  e.preventDefault();
  const wrap = btn.closest('.ga-rich-wrap');
  const editor = wrap && wrap.querySelector('.ga-rich');
  if (!editor || !editor.isContentEditable) return;   // campo em modo vitrine
  const avisar = () => editor.dispatchEvent(new Event('input', { bubbles: true }));

  const acao = btn.dataset.richAcao;
  if (acao === 'grifar' || acao === 'desgrifar') {
    if (window.GA_aplicarGrifo(editor, acao, btn.dataset.cor)) avisar();
    return;
  }
  // ※ Descrição (botão flutuante ou o da barra)
  if (!window.GA_Tip) return;
  const abriu = window.GA_Tip.editarSelecao(editor, avisar);
  if (!abriu) editor.focus();   // sem trecho selecionado: devolve o cursor
};

// Ctrl+B / Ctrl+I. Usa execCommand — depreciado, mas é o jeito universal e
// estável de formatar um contenteditable. Retorna true se formatou.
window.GA_richAtalho = function (e) {
  if (!(e.ctrlKey || e.metaKey) || e.altKey) return false;
  const k = (e.key || '').toLowerCase();
  if (k !== 'b' && k !== 'i') return false;
  e.preventDefault();
  document.execCommand(k === 'b' ? 'bold' : 'italic', false, null);
  return true;
};

// Atalhos valem em TODO campo .ga-rich do app, sem cada aba registrar nada.
// (o Combate tem os seus próprios, nas caixas .mz-ataques)
document.addEventListener('keydown', function (e) {
  const alvo = e.target;
  if (!alvo || !alvo.closest) return;
  const editor = alvo.closest('.ga-rich');
  if (!editor || !editor.isContentEditable) return;
  if (window.GA_richAtalho(e)) editor.dispatchEvent(new Event('input', { bubbles: true }));
});

// Colar limpo nos campos ricos: junta as quebras "duras" de PDF e insere
// como texto puro (sem arrastar HTML de fora).
window.GA_richPaste = function (e) {
  const editor = e.target.closest('.ga-rich');
  if (!editor) return;
  e.preventDefault();
  const limpo = window.GA_limparQuebras((e.clipboardData || window.clipboardData).getData('text/plain'));
  const sel = window.getSelection();
  if (!sel.rangeCount) return;
  sel.deleteFromDocument();
  sel.getRangeAt(0).insertNode(document.createTextNode(limpo));
  sel.collapseToEnd();
  editor.dispatchEvent(new Event('input', { bubbles: true }));
};

// Abre um modal genérico com o HTML informado. Fecha ao clicar fora,
// no botão [data-ga-fechar] ou com Esc. Retorna o elemento do overlay.
window.GA_abrirModal = function (htmlInterno) {
  const overlay = document.createElement('div');
  overlay.className = 'ga-modal-overlay';
  overlay.innerHTML = `<div class="ga-modal" role="dialog" aria-modal="true">${htmlInterno}</div>`;
  document.body.appendChild(overlay);

  function fechar() {
    overlay.remove();
    document.removeEventListener('keydown', aoTeclar);
  }
  function aoTeclar(e) { if (e.key === 'Escape') fechar(); }

  overlay.addEventListener('click', e => {
    if (e.target === overlay || e.target.closest('[data-ga-fechar]')) fechar();
  });
  document.addEventListener('keydown', aoTeclar);

  overlay._fechar = fechar;
  return overlay;
};

const links    = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

// ── MEMÓRIA DE ROLAGEM POR ABA ───────────────────────────────────────
// Cada aba lembra onde a câmera estava quando o usuário a deixou. Assim,
// rolar recompensas e voltar para Combate não "teleporta" mais para o topo.
// Fica em window porque o estado-navegacao.js repovoa este mapa depois de
// um F5 — senão a memória valeria só para a aba restaurada.
const scrollPorSecao = window.GA_scrollPorSecao = {};

function secaoAtivaId() {
  const s = document.querySelector('section.active');
  return s ? s.id : null;
}

links.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = link.dataset.section;

    // Guarda a rolagem da aba que estamos deixando, antes de trocar.
    const atual = secaoAtivaId();
    if (atual) scrollPorSecao[atual] = window.scrollY;
    if (atual === target) return;   // já estamos nela — nada a fazer

    links.forEach(l => l.classList.remove('active'));
    sections.forEach(s => s.classList.remove('active'));

    link.classList.add('active');
    document.getElementById(target).classList.add('active');

    // Restaura a câmera onde o usuário deixou esta aba (ou topo, na 1ª vez).
    // Instantâneo (sem 'smooth') para não animar uma descida longa.
    window.scrollTo({ top: scrollPorSecao[target] || 0, behavior: 'auto' });
  });
});

// ── MASTHEAD DINÂMICO ────────────────────────────────────────────────
// Ano corrente de Arton (lore) e fundação do periódico ficam num só lugar
// — mude ANO_ARTON e tudo (cabeçalho + rodapé) acompanha.
const ANO_ARTON = 1424;
const ANO_FUNDACAO = ANO_ARTON - 7;          // VOL. VII → fundado há 7 anos

function preencherMasthead() {
  const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
  const fund = document.getElementById('mh-fundacao');
  if (fund) fund.textContent = ANO_FUNDACAO;

  const pub = document.getElementById('mh-publicado');
  if (pub) {
    const data = new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
    pub.textContent = `⚜ Publicado em ${cap(data)} de ${ANO_ARTON} ⚜`;
  }
  const anoRodape = document.getElementById('mh-ano-rodape');
  if (anoRodape) anoRodape.textContent = ANO_ARTON;
}
preencherMasthead();

// ── ALTURA DO MENU ───────────────────────────────────────────────────
// Publica a altura real do nav em --nav-h para as sub-abas (Consultas,
// Anotações) grudarem logo abaixo dele — mesmo quando o menu quebra linha.
function ajustarAlturaNav() {
  const nav = document.getElementById('main-nav');
  if (nav) document.documentElement.style.setProperty('--nav-h', nav.offsetHeight + 'px');
}
ajustarAlturaNav();
window.addEventListener('load', ajustarAlturaNav);
window.addEventListener('resize', ajustarAlturaNav);
if (window.ResizeObserver) {
  const navEl = document.getElementById('main-nav');
  if (navEl) new ResizeObserver(ajustarAlturaNav).observe(navEl);
}
