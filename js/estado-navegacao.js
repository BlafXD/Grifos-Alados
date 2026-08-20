// ═══════════════════════════════════════════════════════════════════
//  ESTADO-NAVEGACAO.JS — Voltar para onde você estava depois do F5
//  Guarda a aba aberta, a sub-aba e a rolagem de cada aba; ao recarregar,
//  devolve tudo em vez de cair em Notícias.
//
//  sessionStorage de propósito (e não localStorage): F5 e "voltar" mantêm
//  o lugar, mas abrir o site numa guia nova começa em Notícias, como antes.
//
//  A restauração CLICA nos próprios botões em vez de mexer nas classes na
//  mão — assim reaproveita a montagem que cada aba já faz no clique (a
//  Loja, por exemplo, só monta o conteúdo quando o link do menu é clicado).
//  Por isso este arquivo é carregado por ÚLTIMO: o listener de
//  DOMContentLoaded dele roda depois que todos os módulos registraram os
//  seus.
// ═══════════════════════════════════════════════════════════════════
(function () {
  'use strict';

  const CHAVE = 'grifosAlados.navegacao';
  // os sistemas de sub-aba do app: Consultas, Anotações, Loja e a estante
  // de livros das Fichas Prontas
  const ATTRS_SUBABA = ['data-cr-tab', 'data-an-tab', 'data-painel', 'data-fp-livro-aba'];
  const SEL_SUBABA = ATTRS_SUBABA.map(a => '[' + a + ']').join(', ');

  let estado;
  try { estado = JSON.parse(sessionStorage.getItem(CHAVE) || '{}') || {}; }
  catch (e) { estado = {}; }
  if (!estado.scroll || typeof estado.scroll !== 'object') estado.scroll = {};
  if (!estado.subaba || typeof estado.subaba !== 'object') estado.subaba = {};

  function gravar() {
    try { sessionStorage.setItem(CHAVE, JSON.stringify(estado)); } catch (e) {}
  }

  function secaoAtiva() {
    const s = document.querySelector('section.active');
    return s ? s.id : null;
  }

  function seletorDe(btn) {
    for (let i = 0; i < ATTRS_SUBABA.length; i++) {
      const v = btn.getAttribute(ATTRS_SUBABA[i]);
      if (v) return '[' + ATTRS_SUBABA[i] + '="' + v + '"]';
    }
    return null;
  }

  function anotarRolagem() {
    const id = secaoAtiva();
    if (!id) return;
    estado.secao = id;
    estado.scroll[id] = window.scrollY;
  }

  // ── registro contínuo ───────────────────────────────────────────
  let agendado = false;
  window.addEventListener('scroll', function () {
    if (agendado) return;
    agendado = true;
    requestAnimationFrame(function () { agendado = false; anotarRolagem(); });
  }, { passive: true });

  // Captura: precisamos ler a seção ATUAL antes de o handler da aba trocá-la.
  document.addEventListener('click', function (e) {
    if (!e.target || !e.target.closest) return;

    const link = e.target.closest('.nav-link[data-section]');
    if (link) {
      anotarRolagem();                       // rolagem da aba que estamos deixando
      estado.secao = link.dataset.section;
      gravar();
      return;
    }

    const sub = e.target.closest(SEL_SUBABA);
    if (sub) {
      const id = secaoAtiva();
      const sel = seletorDe(sub);
      if (id && sel) { estado.subaba[id] = sel; gravar(); }
    }
  }, true);

  window.addEventListener('pagehide', function () { anotarRolagem(); gravar(); });
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') { anotarRolagem(); gravar(); }
  });

  // ── restauração ─────────────────────────────────────────────────
  // O navegador também tenta devolver a rolagem sozinho, mas a altura da
  // página só existe depois que a aba monta — deixamos essa parte conosco.
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

  function irPara(y) {
    if (!y) return;
    // Se o usuário já começou a mexer, não brigamos com ele.
    let cancelado = false;
    ['wheel', 'touchstart', 'keydown', 'mousedown'].forEach(function (ev) {
      window.addEventListener(ev, function () { cancelado = true; },
        { once: true, passive: true });
    });

    window.scrollTo(0, y);
    // A página ainda cresce depois (fontes, imagens, abas que montam sob
    // demanda), então reaplicamos por um instante até a altura assentar.
    let tentativas = 0;
    (function tentar() {
      if (cancelado || tentativas++ >= 6) return;
      if (Math.abs(window.scrollY - y) > 2) window.scrollTo(0, y);
      setTimeout(tentar, 80);
    })();
    window.addEventListener('load', function () {
      if (!cancelado) window.scrollTo(0, y);
    }, { once: true });
  }

  function restaurar() {
    // Devolve ao script.js a rolagem de TODAS as abas, não só a restaurada:
    // assim trocar de aba depois do F5 continua caindo onde você parou.
    if (window.GA_scrollPorSecao) {
      Object.keys(estado.scroll).forEach(function (id) {
        window.GA_scrollPorSecao[id] = estado.scroll[id];
      });
    }

    const alvo = estado.secao;
    if (!alvo) return;

    const secao = document.getElementById(alvo);
    const link = document.querySelector('.nav-link[data-section="' + alvo + '"]');
    if (!secao || !link) return;             // aba não existe nesta página

    if (!secao.classList.contains('active')) link.click();

    const sel = estado.subaba[alvo];
    if (sel) {
      const btn = secao.querySelector(sel);
      if (btn) btn.click();
    }

    irPara(estado.scroll[alvo] || 0);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', restaurar);
  } else {
    restaurar();
  }
})();
