// ═══════════════════════════════════════════════════════════════════
//  ACESSIBILIDADE.JS — o que o CSS sozinho não alcança
//
//  Carregado logo depois do script.js (precisa do GA_abrirModal e do
//  GA_esc) e ANTES das abas — assim a gaveta e a semântica já existem
//  quando o estado-navegacao.js restaura a aba no F5 clicando nos
//  próprios links.
//
//  Cinco frentes:
//
//  1. A GAVETA DE SEÇÕES no celular. O menu tem 13 seções (~1500px);
//     numa tela de 390px apareciam três e meia, sem nenhum sinal de
//     que rolava. A gaveta é o PRÓPRIO <nav> reestilizado, então os
//     links continuam sendo os mesmos elementos e ninguém mais no app
//     precisa saber que ela existe.
//
//  2. O MENU FALANDO QUE É MENU. Eram 13 <a href="#"> — um leitor de
//     tela anunciava treze "links para #" e não dizia qual estava
//     aberta. Viram abas de verdade (tablist/tab/tabpanel), navegáveis
//     pelas setas, e trocar de aba passa a ser anunciado em voz.
//
//  3. AS TABELAS LARGAS. Metade já rolava dentro de .prog-table-wrap,
//     mas rolava em silêncio e só com o dedo/mouse: uma div que rola e
//     não recebe foco é conteúdo trancado para quem usa teclado.
//
//  4. OS BOTÕES DE UM CARACTERE (✕ ✎ 🗑 ＋). O desenho fica igual; o
//     alvo do dedo cresce por baixo, e o `title` que já existia vira
//     nome de verdade para o leitor de tela.
//
//  5. O PAINEL ⚙. Tamanho do texto, contraste, movimento e foco.
//     O tamanho é o que mais importa: as 869 declarações de fonte
//     deste site são TODAS em rem (zero px), então mexer na raiz
//     escala texto, respiro e botão juntos, sem quebrar layout.
// ═══════════════════════════════════════════════════════════════════
(function () {
  'use strict';

  const CHAVE   = 'grifosAlados.acessibilidade';
  const RAIZ    = document.documentElement;
  const LARGURA_GAVETA = 820;          // o mesmo 820px do acessibilidade.css
  const esc = window.GA_esc || function (s) { return String(s == null ? '' : s); };

  // ── as preferências ─────────────────────────────────────────────
  // O <head> já aplicou o que estava salvo (antes da primeira pintura,
  // senão a página piscaria no tamanho errado a cada F5). Aqui só
  // relemos para o painel saber em que pé estão.
  let prefs = {};
  try { prefs = JSON.parse(localStorage.getItem(CHAVE) || '{}') || {}; }
  catch (e) { prefs = {}; }

  const CHAVES_CLASSE = {
    contraste:    'ga-contraste',
    semMovimento: 'ga-sem-movimento',
    focoForte:    'ga-foco-forte'
  };

  let ligado = false;                 // já passamos pelo iniciar()?

  function aplicarPrefs() {
    if (prefs.texto) RAIZ.setAttribute('data-ga-texto', prefs.texto);
    else RAIZ.removeAttribute('data-ga-texto');
    Object.keys(CHAVES_CLASSE).forEach(function (k) {
      RAIZ.classList.toggle(CHAVES_CLASSE[k], !!prefs[k]);
    });
    // mudar o tamanho do texto muda a régua de TUDO o que foi medido:
    // que tabela ainda corta, que botãozinho ainda cabe ampliado
    if (ligado) agendarVarredura();
  }

  function guardarPrefs() {
    const grava = window.GA_guardar || function (c, v) {
      try { localStorage.setItem(c, v); return true; } catch (e) { return false; }
    };
    grava(CHAVE, JSON.stringify(prefs));
  }

  // Sem escolha explícita, o celular já começa um degrau acima (o CSS
  // faz isso sozinho); o painel precisa saber disso para marcar o
  // degrau certo em vez de mentir que está no "Padrão".
  function textoEfetivo() {
    if (prefs.texto) return Number(prefs.texto);
    return window.matchMedia('(max-width: ' + LARGURA_GAVETA + 'px)').matches ? 3 : 2;
  }

  aplicarPrefs();


  // ══════════════════════════════════════════════════════════════
  //  A VOZ — o que o leitor de tela escuta quando a tela muda
  // ══════════════════════════════════════════════════════════════
  let caixaAnuncio = null;

  function montarAnuncio() {
    caixaAnuncio = document.createElement('div');
    caixaAnuncio.id = 'ga-anuncio';
    caixaAnuncio.setAttribute('role', 'status');
    caixaAnuncio.setAttribute('aria-live', 'polite');
    caixaAnuncio.setAttribute('aria-atomic', 'true');
    document.body.appendChild(caixaAnuncio);
  }

  // O leitor só lê o que MUDA. Repetir a mesma frase (trocar duas vezes
  // para a mesma aba) não dispararia nada — por isso o espaço no fim.
  let ecoAnterior = '';
  function anunciar(txt) {
    if (!caixaAnuncio) return;
    const t = (txt === ecoAnterior) ? txt + ' ' : txt;
    ecoAnterior = t;
    caixaAnuncio.textContent = t;
  }
  window.GA_anunciar = anunciar;


  // ══════════════════════════════════════════════════════════════
  //  SALTO PARA O CONTEÚDO
  //  Quem navega por Tab atravessava as 13 seções do menu antes de
  //  chegar em qualquer notícia — e de novo a cada troca de aba.
  // ══════════════════════════════════════════════════════════════
  function montarSalto() {
    const alvo = document.getElementById('ga-conteudo');
    if (!alvo) return;
    const a = document.createElement('a');
    a.className = 'ga-salto';
    a.href = '#ga-conteudo';
    a.textContent = '↓ Pular para o conteúdo';
    a.addEventListener('click', function (e) {
      e.preventDefault();
      alvo.focus();
      alvo.scrollIntoView({ block: 'start' });
    });
    document.body.insertBefore(a, document.body.firstChild);
  }


  // ══════════════════════════════════════════════════════════════
  //  RODÍZIO DE FOCO (setas do teclado)
  //  Vale para as abas do menu, para as sub-abas e para a régua de
  //  tamanhos do painel: em todas, Tab entra e sai do grupo UMA vez
  //  e as setas andam por dentro. Sem isto, as 15 sub-abas das
  //  Consultas são 15 paradas de Tab antes do primeiro perigo.
  // ══════════════════════════════════════════════════════════════
  function rodizio(itens, opts) {
    opts = opts || {};
    if (!itens.length) return;

    function focar(i) {
      const alvo = itens[(i + itens.length) % itens.length];
      itens.forEach(function (b) { b.tabIndex = -1; });
      alvo.tabIndex = 0;
      alvo.focus();
    }

    itens.forEach(function (item, i) {
      item.addEventListener('keydown', function (e) {
        const k = e.key;
        let d = 0;
        if (k === 'ArrowRight' || k === 'ArrowDown') d = 1;
        else if (k === 'ArrowLeft' || k === 'ArrowUp') d = -1;
        else if (k === 'Home') { e.preventDefault(); return focar(0); }
        else if (k === 'End')  { e.preventDefault(); return focar(itens.length - 1); }
        else if ((k === ' ' || k === 'Spacebar') && item.tagName === 'A') {
          // <a> responde a Enter sozinho, mas não à barra de espaço
          e.preventDefault();
          item.click();
          return;
        }
        if (!d) return;
        e.preventDefault();
        focar(i + d);
      });
    });
  }

  // Devolve o tabindex ao item ativo depois que o grupo perde o foco —
  // senão o Tab voltaria para o último item visitado com a seta, e não
  // para a aba que está realmente aberta.
  function fixarRodizio(itens, ativo) {
    itens.forEach(function (b) { b.tabIndex = (b === ativo) ? 0 : -1; });
  }


  // ══════════════════════════════════════════════════════════════
  //  1 · O MENU VIRA ABAS DE VERDADE
  // ══════════════════════════════════════════════════════════════
  const nav      = document.getElementById('main-nav');
  const navInner = nav && nav.querySelector('.nav-inner');
  const links    = nav ? Array.prototype.slice.call(nav.querySelectorAll('.nav-link')) : [];

  function semanticaDoMenu() {
    if (!navInner || !links.length) return;

    navInner.setAttribute('role', 'tablist');
    navInner.setAttribute('aria-label', 'Seções da gazeta');

    links.forEach(function (a) {
      const id = a.dataset.section;
      const sec = document.getElementById(id);
      a.setAttribute('role', 'tab');
      a.id = a.id || 'ga-aba-' + id;
      if (sec) {
        a.setAttribute('aria-controls', sec.id);
        sec.setAttribute('role', 'tabpanel');
        sec.setAttribute('aria-labelledby', a.id);
        // um tabpanel precisa poder receber o foco: é para onde o
        // leitor de tela vai depois de escolher a seção
        if (!sec.hasAttribute('tabindex')) sec.tabIndex = -1;
      }
      // o emoji é enfeite: sem isto o leitor anuncia
      // "presente Recompensas", "espada Combates"…
      envolverEmoji(a);
    });

    rodizio(links);
    sincronizarMenu();
  }

  // Separa o emoji do começo do rótulo e o esconde do leitor de tela.
  function envolverEmoji(el) {
    if (el.dataset.gaEmoji) return;
    const t = el.textContent;
    const m = t.match(/^(\s*[^\p{L}\p{N}]+\s*)(.+)$/u);
    if (!m) { el.dataset.gaEmoji = 'nao'; return; }
    el.textContent = '';
    const ico = document.createElement('span');
    ico.setAttribute('aria-hidden', 'true');
    ico.textContent = m[1];
    el.appendChild(ico);
    el.appendChild(document.createTextNode(m[2]));
    el.dataset.gaEmoji = 'sim';
  }

  // Nome limpo da seção (sem o emoji), para anunciar e para a barra.
  function rotuloDe(a) {
    return (a.textContent || '').replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
  }

  function linkAtivo() {
    return links.filter(function (a) { return a.classList.contains('active'); })[0] || links[0];
  }

  function sincronizarMenu() {
    const ativo = linkAtivo();
    links.forEach(function (a) {
      a.setAttribute('aria-selected', a === ativo ? 'true' : 'false');
    });
    fixarRodizio(links, ativo);

    const rot = document.querySelector('.ga-menu-atual');
    if (rot && ativo) rot.textContent = rotuloDe(ativo);

    // na faixa horizontal (tablet/desktop) a seção aberta podia estar
    // fora da tela — sem isto, ela some e ninguém a acha
    if (ativo && nav && nav.scrollWidth > nav.clientWidth + 4) {
      const r = ativo.getBoundingClientRect();
      const rn = nav.getBoundingClientRect();
      if (r.left < rn.left + 8 || r.right > rn.right - 8) {
        nav.scrollTo({
          left: ativo.offsetLeft - (nav.clientWidth - ativo.offsetWidth) / 2,
          behavior: 'auto'
        });
      }
    }
  }


  // ══════════════════════════════════════════════════════════════
  //  2 · A GAVETA (celular)
  // ══════════════════════════════════════════════════════════════
  let btnMenu = null, veu = null, focoAntesDaGaveta = null;

  function noCelular() {
    return window.matchMedia('(max-width: ' + LARGURA_GAVETA + 'px)').matches;
  }

  function montarGaveta() {
    if (!nav || !navInner) return;

    // a barra fixa que substitui o menu no celular
    const barra = document.createElement('div');
    barra.className = 'ga-barra-movel';
    barra.innerHTML =
      '<button type="button" class="ga-menu-btn" aria-expanded="false" aria-controls="main-nav">' +
        '<span class="ga-menu-hamb" aria-hidden="true">☰</span>' +
        '<span class="ga-sr">Seções da gazeta — seção aberta: </span>' +
        '<span class="ga-menu-atual">Notícias</span>' +
        '<span class="ga-menu-dica" aria-hidden="true">trocar</span>' +
      '</button>' +
      '<button type="button" class="ga-barra-acess" ' +
        'aria-label="Acessibilidade: tamanho do texto, contraste e movimento">⚙</button>';
    nav.parentNode.insertBefore(barra, nav.nextSibling);
    btnMenu = barra.querySelector('.ga-menu-btn');
    btnMenu.addEventListener('click', function () {
      document.body.classList.contains('ga-gaveta-aberta') ? fecharGaveta() : abrirGaveta();
    });
    barra.querySelector('.ga-barra-acess').addEventListener('click', abrirPainel);

    // o cabeçalho da gaveta (título + ✕)
    const cab = document.createElement('div');
    cab.className = 'ga-gaveta-cab';
    cab.innerHTML =
      '<span class="ga-gaveta-tit">✦ Seções ✦</span>' +
      '<button type="button" class="ga-gaveta-x" aria-label="Fechar o menu de seções">✕</button>';
    nav.insertBefore(cab, navInner);
    cab.querySelector('.ga-gaveta-x').addEventListener('click', fecharGaveta);

    // escolher uma seção fecha a gaveta
    nav.addEventListener('click', function (e) {
      if (e.target.closest('.nav-link') && noCelular()) fecharGaveta({ paraOConteudo: true });
    });
  }

  const TRANCAVEIS = ['header', 'main', 'footer', '.ga-barra-movel'];
  const temInert = 'inert' in HTMLElement.prototype;

  function trancar(el, sim) {
    if (!el) return;
    if (temInert) { el.inert = sim; return; }
    // navegador sem `inert`: trancamos na mão o que ele trancaria
    if (sim) el.setAttribute('aria-hidden', 'true');
    else el.removeAttribute('aria-hidden');
    el.querySelectorAll('a[href], button, input, select, textarea, [tabindex]')
      .forEach(function (f) {
        if (sim) {
          if (f.dataset.gaTab === undefined) f.dataset.gaTab = f.getAttribute('tabindex') || '';
          f.setAttribute('tabindex', '-1');
        } else if (f.dataset.gaTab !== undefined) {
          if (f.dataset.gaTab) f.setAttribute('tabindex', f.dataset.gaTab);
          else f.removeAttribute('tabindex');
          delete f.dataset.gaTab;
        }
      });
  }

  function trancarFundo(sim) {
    TRANCAVEIS.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el) { trancar(el, sim); });
    });
  }

  // A gaveta FECHADA continua na tela (só empurrada para fora por um
  // transform), então sem isto o Tab passearia por 13 links invisíveis
  // antes de chegar na primeira notícia — e o leitor de tela leria o
  // menu inteiro duas vezes.
  function sincronizarGaveta() {
    if (!nav) return;
    trancar(nav, noCelular() && !document.body.classList.contains('ga-gaveta-aberta'));
  }

  function abrirGaveta() {
    if (!nav) return;
    focoAntesDaGaveta = document.activeElement;
    document.body.classList.add('ga-gaveta-aberta');
    sincronizarGaveta();
    if (btnMenu) btnMenu.setAttribute('aria-expanded', 'true');

    veu = document.createElement('button');
    veu.type = 'button';
    veu.className = 'ga-veu';
    veu.tabIndex = -1;                 // clicável, mas fora do Tab: quem
    veu.setAttribute('aria-hidden', 'true');   // fecha pelo teclado usa Esc
    veu.addEventListener('click', fecharGaveta);
    document.body.appendChild(veu);

    trancarFundo(true);
    document.addEventListener('keydown', aoTeclarNaGaveta, true);

    // o foco entra na seção aberta, não no topo: é o "você está aqui"
    (linkAtivo() || nav.querySelector('.ga-gaveta-x')).focus();
  }

  function fecharGaveta(opts) {
    if (!document.body.classList.contains('ga-gaveta-aberta')) return;
    document.body.classList.remove('ga-gaveta-aberta');
    sincronizarGaveta();
    if (btnMenu) btnMenu.setAttribute('aria-expanded', 'false');
    if (veu) { veu.remove(); veu = null; }
    trancarFundo(false);
    document.removeEventListener('keydown', aoTeclarNaGaveta, true);

    // Escolheu uma seção: o foco desce para o conteúdo novo (a gaveta
    // acabou de sumir, e sem isto o foco cairia no <body> — quem usa
    // leitor de tela voltaria ao começo da página).
    if (opts && opts.paraOConteudo) {
      const sec = document.querySelector('section.active');
      if (sec) { sec.focus(); return; }
    }
    // Fechou sem escolher (Esc, ✕, toque no véu): o foco volta para o
    // botão ☰. Voltar para o <body> — que é onde ele estava se a gaveta
    // foi aberta por toque — deixaria o teclado no começo da página.
    const volta = (focoAntesDaGaveta && focoAntesDaGaveta !== document.body &&
                   document.contains(focoAntesDaGaveta)) ? focoAntesDaGaveta : btnMenu;
    if (volta) volta.focus();
    focoAntesDaGaveta = null;
  }

  function aoTeclarNaGaveta(e) {
    if (e.key === 'Escape') { e.preventDefault(); fecharGaveta(); return; }
    if (e.key !== 'Tab' || temInert) return;   // com inert o fundo já não recebe Tab
    const focaveis = nav.querySelectorAll('a[href], button:not([disabled])');
    if (!focaveis.length) return;
    const primeiro = focaveis[0], ultimo = focaveis[focaveis.length - 1];
    if (e.shiftKey && document.activeElement === primeiro) { e.preventDefault(); ultimo.focus(); }
    else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primeiro.focus(); }
  }

  // Girar o aparelho para a horizontal (ou abrir o teclado) pode passar
  // dos 820px com a gaveta aberta: ali ela deixa de ser gaveta, volta a
  // ser a faixa de sempre — e a trava do fundo ficaria presa para
  // sempre se ninguém desfizesse.
  window.matchMedia('(max-width: ' + LARGURA_GAVETA + 'px)')
    .addEventListener('change', function () {
      fecharGaveta();
      sincronizarGaveta();
    });


  // ══════════════════════════════════════════════════════════════
  //  3 · AS SUB-ABAS
  //  Cinco sistemas diferentes com a mesma forma: um botão por painel
  //  e uma classe "--ativa". Todos ganham semântica de aba e setas.
  // ══════════════════════════════════════════════════════════════
  const GRUPOS_SUBABA = [
    { btn: '.cr-subtab',  ativa: 'cr-subtab--ativa', painel: 'data-cr-panel', tab: 'crTab' },
    { btn: '.an-subtab',  ativa: 'an-subtab--ativa', painel: 'data-an-panel', tab: 'anTab' },
    { btn: '.fi-subtab',  ativa: 'fi-subtab--ativa', painel: 'data-fi-panel', tab: 'fiTab' },
    { btn: '.ca-subtab',  ativa: 'ca-subtab--ativa', painel: null,            tab: 'caTab' },
    { btn: '.loja-aba',   ativa: 'ativa',            painel: null,            tab: 'painel' }
  ];

  function ligarSubAbas(raiz) {
    GRUPOS_SUBABA.forEach(function (g) {
      const botoes = Array.prototype.slice.call((raiz || document).querySelectorAll(g.btn));
      if (!botoes.length) return;

      // agrupa por pai: a mesma classe pode aparecer em mais de um
      // lugar da página (a estante de livros das Fichas Prontas)
      const porPai = new Map();
      botoes.forEach(function (b) {
        if (!porPai.has(b.parentElement)) porPai.set(b.parentElement, []);
        porPai.get(b.parentElement).push(b);
      });

      porPai.forEach(function (itens, pai) {
        if (!pai.dataset.gaTablist) {
          pai.dataset.gaTablist = '1';
          pai.setAttribute('role', 'tablist');
          if (!pai.getAttribute('aria-label') && pai.tagName !== 'NAV') {
            pai.setAttribute('aria-label', 'Sub-seções');
          }
          rodizio(itens);
        }
        itens.forEach(function (b) {
          b.setAttribute('role', 'tab');
          envolverEmoji(b);
          if (g.painel) {
            const chave = b.dataset[g.tab];
            const painel = document.querySelector('[' + g.painel + '="' + chave + '"]');
            if (painel) {
              if (!painel.id) painel.id = 'ga-painel-' + chave;
              b.setAttribute('aria-controls', painel.id);
              painel.setAttribute('role', 'tabpanel');
            }
          }
        });
        sincronizarGrupo(itens, g.ativa);
      });
    });
  }

  function sincronizarGrupo(itens, clsAtiva) {
    let ativo = null;
    itens.forEach(function (b) {
      const on = b.classList.contains(clsAtiva);
      b.setAttribute('aria-selected', on ? 'true' : 'false');
      if (on) ativo = b;
    });
    fixarRodizio(itens, ativo || itens[0]);
  }

  // As sub-abas trocam sempre por clique (inclusive o do
  // estado-navegacao.js no F5), então basta escutar o clique — depois
  // que o handler da aba já mexeu nas classes.
  document.addEventListener('click', function (e) {
    if (!e.target || !e.target.closest) return;
    GRUPOS_SUBABA.forEach(function (g) {
      const b = e.target.closest(g.btn);
      if (!b || !b.parentElement) return;
      setTimeout(function () {
        const itens = Array.prototype.slice.call(b.parentElement.querySelectorAll(g.btn));
        sincronizarGrupo(itens, g.ativa);
        agendarVarredura();
      }, 0);
    });
  });


  // ══════════════════════════════════════════════════════════════
  //  4 · TABELAS QUE ROLAM E BOTÕES DE UM CARACTERE
  //  Uma varredura só, na seção aberta, depois que ela termina de se
  //  montar. Só a aberta porque elemento em `display:none` mede zero:
  //  não dá para saber se uma tabela coube numa seção invisível.
  // ══════════════════════════════════════════════════════════════
  function cuidarDasTabelas(raiz) {
    raiz.querySelectorAll('table').forEach(function (t) {
      if (t.dataset.gaRola) return;
      t.dataset.gaRola = '1';

      // Já vem dentro de um invólucro que rola (.prog-table-wrap e
      // parentes)? Então aproveitamos ele em vez de criar outro.
      const pai = t.parentElement;
      let pista;
      if (pai && pai !== raiz &&
          /auto|scroll/.test(getComputedStyle(pai).overflowX) &&
          pai.children.length === 1) {
        pista = pai;
      } else {
        pista = document.createElement('div');
        pista.className = 'ga-rola--nosso';
        t.parentNode.insertBefore(pista, t);
        pista.appendChild(t);
      }
      pista.classList.add('ga-rola');
      // O título da tabela quase sempre JÁ começa com "Tabela 3-7:…"
      // (é como o livro as numera), e "Tabela: Tabela 3-7" é o tipo de
      // gagueira que o leitor de tela lê inteira.
      const cap = t.querySelector('caption');
      const tit = cap ? cap.textContent.trim() : '';
      pista.dataset.gaRotulo =
        (tit ? (/^tabela\b/i.test(tit) ? tit : 'Tabela: ' + tit) : 'Tabela') +
        ' — role para os lados para ver todas as colunas';

      const dica = document.createElement('p');
      dica.className = 'ga-rola-dica';
      dica.setAttribute('aria-hidden', 'true');   // já está no aria-label da região
      dica.textContent = '↔ arraste ou use as setas para ver a tabela inteira';
      pista.parentNode.insertBefore(dica, pista.nextSibling);
    });
  }

  // Só a tabela que REALMENTE não coube vira região focável. Marcar
  // todas seria pior que não marcar nenhuma: numa aba com 16 tabelas,
  // seriam 16 paradas de Tab e 16 marcos anunciados pelo leitor de tela
  // — a maioria por tabelas que cabiam inteiras na tela.
  function medirTabelas(raiz) {
    (raiz || document).querySelectorAll('.ga-rola').forEach(function (p) {
      const corta = p.scrollWidth > p.clientWidth + 2;
      p.classList.toggle('ga-rola--corta', corta);
      if (corta) {
        p.tabIndex = 0;
        p.setAttribute('role', 'region');
        p.setAttribute('aria-label', p.dataset.gaRotulo || 'Tabela');
      } else {
        p.removeAttribute('tabindex');
        p.removeAttribute('role');
        p.removeAttribute('aria-label');
      }
    });
  }

  // ── os ✕ ✎ 🗑 ＋ de um caractere ──
  const SO_SIMBOLO = /^[^\p{L}\p{N}]{1,3}$/u;

  const SEL_INTERATIVO = 'button, a[href], input:not([type=hidden]), select, textarea, summary, [role="button"]';

  function cuidarDosBotoezinhos(raiz) {
    raiz.querySelectorAll('button, [role="button"], summary').forEach(function (b) {
      if (b.dataset.gaAlvo) return;
      const txt = (b.textContent || '').trim();
      if (!SO_SIMBOLO.test(txt)) return;

      // O elemento que JÁ usa ::after para desenhar alguma coisa fica
      // de fora: sobrescrever apagaria o desenho.
      let ocupado = false;
      try {
        const c = getComputedStyle(b, '::after').content;
        ocupado = c && c !== 'none' && c !== 'normal';
      } catch (e) {}
      b.dataset.gaAlvo = ocupado ? 'nao' : '1';

      // o `title` que já existia vira nome de verdade: "✕" era lido
      // como "sinal de multiplicação" ou como nada
      const t = (b.getAttribute('title') || '').trim();
      if (t && !b.getAttribute('aria-label')) b.setAttribute('aria-label', t);
    });
  }

  // O alvo ampliado é uma caixa invisível MAIOR que o botão — e caixa
  // invisível maior que o botão rouba o toque do vizinho. Numa fileira
  // apertada como [−][12][+] (Viagem, Criar Ameaça, Bases), 44px em
  // cima de um botão de 27px passam por cima dos dois lados: o dedo
  // acertaria o alvo errado, que é PIOR que o alvo pequeno.
  //
  // Então a ampliação é medida antes de valer, e só vale onde couber.
  // A conta refaz-se a cada varredura porque depende do tamanho do
  // texto e da largura da tela — as duas coisas que este arquivo mexe.
  function medirAlvos(raiz) {
    const min = parseFloat(getComputedStyle(document.documentElement).fontSize) * 2.75;
    (raiz || document).querySelectorAll('[data-ga-alvo="1"]').forEach(function (b) {
      const r = b.getBoundingClientRect();
      if (!r.width || (r.width >= min && r.height >= min)) {
        b.classList.remove('ga-alvo');           // escondido, ou já grande
        return;
      }
      const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      const W = Math.max(r.width, min), H = Math.max(r.height, min);
      const esq = cx - W / 2, dir = cx + W / 2, cima = cy - H / 2, baixo = cy + H / 2;

      // os vizinhos que importam são os da mesma fileira: o avô cobre
      // o [−][campo][+] inteiro sem varrer a aba toda
      const ninho = (b.parentElement && b.parentElement.parentElement) || b.parentElement;
      let bate = false;
      if (ninho) {
        const vizinhos = ninho.querySelectorAll(SEL_INTERATIVO);
        for (let i = 0; i < vizinhos.length && !bate; i++) {
          const o = vizinhos[i];
          if (o === b || b.contains(o) || o.contains(b)) continue;
          const q = o.getBoundingClientRect();
          if (!q.width) continue;
          bate = esq < q.right && dir > q.left && cima < q.bottom && baixo > q.top;
        }
      }
      b.classList.toggle('ga-alvo', !bate);
    });
  }

  let pendente = null;
  function agendarVarredura() {
    clearTimeout(pendente);
    pendente = setTimeout(varrer, 220);
  }

  function varrer() {
    const sec = document.querySelector('section.active');
    if (!sec) return;
    cuidarDasTabelas(sec);
    cuidarDosBotoezinhos(sec);
    ligarSubAbas(sec);
    medir(sec);
  }

  // Tudo o que depende de MEDIDA (e portanto do tamanho do texto e da
  // largura da tela) mora aqui, para refazer-se junto.
  function medir(raiz) {
    medirTabelas(raiz);
    medirAlvos(raiz);
  }


  // ══════════════════════════════════════════════════════════════
  //  5 · O PAINEL ⚙
  // ══════════════════════════════════════════════════════════════
  const PASSOS = [
    { n: 1, rot: 'Menor',  a: '0.8rem'  },
    { n: 2, rot: 'Padrão', a: '0.95rem' },
    { n: 3, rot: 'Maior',  a: '1.15rem' },
    { n: 4, rot: 'Grande', a: '1.4rem'  },
    { n: 5, rot: 'Enorme', a: '1.7rem'  }
  ];

  const CHAVES_PAINEL = [
    { id: 'contraste', tit: 'Mais contraste',
      sub: 'Escurece os rótulos apagados e engrossa as bordas do pergaminho.' },
    { id: 'semMovimento', tit: 'Menos movimento',
      sub: 'Desliga as transições e a textura de papel que cobre a página.' },
    { id: 'focoForte', tit: 'Foco sempre visível',
      sub: 'Mostra o anel de foco também para quem navega com o mouse.' }
  ];

  function abrirPainel() {
    if (!window.GA_abrirModal) return;

    const efetivo = textoEfetivo();
    const regua = PASSOS.map(function (p) {
      return '<button type="button" class="ga-pref-passo" role="radio" data-ga-texto="' + p.n + '"' +
             ' aria-checked="' + (p.n === efetivo ? 'true' : 'false') + '">' +
             '<span class="ga-pref-passo-a" style="font-size:' + p.a + '" aria-hidden="true">A</span>' +
             '<span class="ga-pref-passo-n">' + esc(p.rot) + '</span></button>';
    }).join('');

    const chaves = CHAVES_PAINEL.map(function (c) {
      return '<button type="button" class="ga-pref-chave" data-ga-chave="' + c.id + '"' +
             ' aria-pressed="' + (prefs[c.id] ? 'true' : 'false') + '">' +
             '<span class="ga-pref-chave-txt">' + esc(c.tit) +
             '<small>' + esc(c.sub) + '</small></span>' +
             '<span class="ga-pref-chave-luz" aria-hidden="true"></span></button>';
    }).join('');

    const overlay = window.GA_abrirModal(
      '<div class="ga-modal-cab" id="ga-pref-tit">' +
        '<span><span aria-hidden="true">⚙</span> Acessibilidade</span>' +
        '<button type="button" class="ga-modal-x" data-ga-fechar aria-label="Fechar">✕</button>' +
      '</div>' +
      '<p class="ga-modal-dica">Fica salvo neste navegador e vale para a gazeta inteira — ' +
        'a edição do mestre e a dos jogadores.</p>' +

      '<div class="ga-pref-grupo">' +
        '<span class="ga-pref-rot" id="ga-pref-texto-rot">Tamanho do texto</span>' +
        '<div class="ga-pref-regua" role="radiogroup" aria-labelledby="ga-pref-texto-rot">' + regua + '</div>' +
        '<p class="ga-pref-nota">Escala a gazeta inteira — texto, botões e tabelas juntos. ' +
          'No celular ela já começa em <em>Maior</em>.</p>' +
      '</div>' +

      '<div class="ga-pref-grupo">' +
        '<span class="ga-pref-rot">Leitura</span>' + chaves +
      '</div>' +

      '<div class="ga-modal-acoes">' +
        '<button type="button" class="ga-btn-sec" data-ga-padrao>Voltar ao padrão</button>' +
        '<button type="button" class="ga-btn-principal" data-ga-fechar>Pronto</button>' +
      '</div>');

    const modal = overlay.querySelector('.ga-modal');
    modal.setAttribute('aria-labelledby', 'ga-pref-tit');

    const passos = Array.prototype.slice.call(overlay.querySelectorAll('.ga-pref-passo'));
    rodizio(passos);
    fixarRodizio(passos, passos[efetivo - 1]);

    function marcarRegua(n) {
      passos.forEach(function (b) {
        b.setAttribute('aria-checked', Number(b.dataset.gaTexto) === n ? 'true' : 'false');
      });
      fixarRodizio(passos, passos[n - 1]);
    }

    overlay.addEventListener('click', function (e) {
      const passo = e.target.closest('.ga-pref-passo');
      if (passo) {
        const n = Number(passo.dataset.gaTexto);
        prefs.texto = n;
        aplicarPrefs(); guardarPrefs(); marcarRegua(n);
        anunciar('Tamanho do texto: ' + PASSOS[n - 1].rot);
        return;
      }
      const chave = e.target.closest('[data-ga-chave]');
      if (chave) {
        const id = chave.dataset.gaChave;
        prefs[id] = !prefs[id];
        aplicarPrefs(); guardarPrefs();
        chave.setAttribute('aria-pressed', prefs[id] ? 'true' : 'false');
        const nome = CHAVES_PAINEL.filter(function (c) { return c.id === id; })[0].tit;
        anunciar(nome + (prefs[id] ? ': ligado' : ': desligado'));
        return;
      }
      if (e.target.closest('[data-ga-padrao]')) {
        prefs = {};
        aplicarPrefs(); guardarPrefs();
        marcarRegua(textoEfetivo());
        overlay.querySelectorAll('[data-ga-chave]').forEach(function (b) {
          b.setAttribute('aria-pressed', 'false');
        });
        anunciar('Preferências de acessibilidade de volta ao padrão.');
      }
    });
  }

  // ── o selo no canto do masthead ──
  // Os dois cantos de baixo já têm dono: o 📡 na direita e a coluna de
  // rolagens/iniciativa na esquerda.
  function montarSelo() {
    const cab = document.querySelector('header');
    if (!cab) return;
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'ga-selo-acess';
    b.innerHTML = '<span class="ga-selo-acess-icone" aria-hidden="true">⚙</span>' +
                  '<span class="ga-selo-acess-rot">Acessibilidade</span>';
    b.setAttribute('aria-label', 'Acessibilidade: tamanho do texto, contraste e movimento');
    b.addEventListener('click', abrirPainel);
    cab.appendChild(b);
  }


  // ══════════════════════════════════════════════════════════════
  //  LIGAR TUDO
  // ══════════════════════════════════════════════════════════════
  function iniciar() {
    montarAnuncio();
    montarSalto();
    montarSelo();
    montarGaveta();
    semanticaDoMenu();
    sincronizarGaveta();

    // o script.js publica --nav-h medindo quem gruda no topo — e quem
    // gruda no celular é a barra ☰, que só existe depois do montarGaveta
    if (window.ajustarAlturaNav) window.ajustarAlturaNav();

    // Trocar de aba não recarrega nada: para quem enxerga a página
    // inteira muda, para quem ouve não acontecia NADA. Observamos a
    // classe .active porque a troca vem de três lugares (o clique, o
    // estado-navegacao.js no F5 e a gaveta).
    const secoes = document.querySelectorAll('section[id]');
    const olho = new MutationObserver(function (muts) {
      let mudou = false;
      muts.forEach(function (m) {
        if (m.target.classList.contains('active')) mudou = true;
      });
      if (!mudou) return;
      sincronizarMenu();
      const ativo = linkAtivo();
      if (ativo) anunciar('Seção ' + rotuloDe(ativo) + ' aberta.');
      agendarVarredura();
    });
    secoes.forEach(function (s) {
      olho.observe(s, { attributes: true, attributeFilter: ['class'] });
    });

    // As abas montam o conteúdo sob demanda (a Loja só existe depois do
    // clique). Uma varredura debounced dá conta sem observar tudo.
    const conteudo = document.getElementById('ga-conteudo') || document.body;
    new MutationObserver(agendarVarredura)
      .observe(conteudo, { childList: true, subtree: true });

    // girar o aparelho muda tudo o que foi medido
    window.addEventListener('resize', function () { medir(); });

    ligado = true;
    varrer();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar);
  } else {
    iniciar();
  }

  window.GA_Acess = {
    abrirPainel: abrirPainel,
    anunciar: anunciar,
    prefs: function () { return Object.assign({}, prefs); }
  };
})();
