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

// ── TEXTO RICO (contenteditable) — sanitização compartilhada ─────────
// Mantém só formatação inline segura e preserva as descrições penduradas
// (📖: span.ga-tip[data-tip]). Vital ao renderizar conteúdo vindo de um
// backup .json (evita HTML malicioso). Usado pelo Mapa, Ramos, Viagem e Bases.
window.GA_limparHtml = (function () {
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
          // preserva as descrições penduradas (📖): span.ga-tip[data-tip]
          // — a nuvem é desenhada pelo itens-descricoes.js (texto puro)
          const ehTip = n.tagName === 'SPAN' && /(^|\s)ga-tip(\s|$)/.test(n.className || '');
          const tip = ehTip ? n.getAttribute('data-tip') : null;
          while (n.attributes.length) n.removeAttribute(n.attributes[0].name);
          if (estilo) n.setAttribute('style', estilo);
          if (ehTip && tip) {
            n.className = 'ga-tip';
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

// ── CAMPOS RICOS COM 📖 DESCRIÇÃO (Ramos, Viagem, Bases) ─────────────
// Handlers compartilhados: cada aba os registra nos listeners da própria
// seção. Ao concluir qualquer mudança, disparam 'input' no campo — o
// handler de input da aba salva, como numa digitação normal.

// Clique no 📖 flutuante (.ga-rich-btn): mousedown + preventDefault para
// NÃO perder a seleção (o truque do aoMousedownToolbar do Combate).
window.GA_richDescMousedown = function (e) {
  const btn = e.target.closest('[data-rich-desc]');
  if (!btn) return;
  e.preventDefault();
  const wrap = btn.closest('.ga-rich-wrap');
  const editor = wrap && wrap.querySelector('.ga-rich');
  if (!editor || !window.GA_Tip) return;
  const abriu = window.GA_Tip.editarSelecao(editor, () => {
    editor.dispatchEvent(new Event('input', { bubbles: true }));
  });
  if (!abriu) editor.focus();   // sem trecho selecionado: devolve o cursor
};

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
const scrollPorSecao = {};

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
