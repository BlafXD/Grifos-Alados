// ═══════════════════════════════════════════════════════════════════
//  MODO-JOGADOR.JS — trava de "só visualizar" do jogadores.html
//  Os jogadores navegam, buscam, abrem descrições e nuvens — mas não
//  rolam, não editam e não apagam nada. A garantia DURA é do banco
//  (só o mestre escreve); aqui é a experiência: esconder/bloquear os
//  controles de mestre para ninguém se confundir.
//
//  Política: Consultas (#perigos) é livre (é tudo material de regra,
//  incluindo a calculadora de Culinária, que não guarda nada). Loja,
//  Viagem e Bases ficam só-leitura, fora as caixas [data-jog-edita]:
//  liberamos navegação (abas da loja, busca, recolher/expandir, nuvens
//  ga-tip) e bloqueamos o resto na
//  fase de captura — os módulos usam listeners delegados, então o
//  stopPropagation aqui impede qualquer handler de rodar.
// ═══════════════════════════════════════════════════════════════════
(function () {
  'use strict';

  document.documentElement.classList.add('ga-jogador');

  // sempre permitidos, em qualquer aba. As caixas marcadas com
  // [data-jog-edita] são as que os jogadores escrevem de propósito (na aba
  // Bases: Residentes, Inventário da base e o Inventário dos jogadores; na
  // Viagem: o diário e as paradas que o mestre revelou) — entram inteiras,
  // com a barra de formatação delas.
  const PERMITIDOS =
    '.nav-link, .cr-subtab, .nc-camp-aba, summary, .ga-tip, .ga-tip-pop, ' +
    '.loja-aba, .loja-busca, .cr-busca, .vg-toggle, .bs-toggle, .vg-regras, ' +
    '[data-jog-edita]';

  function bloquearClique(e) {
    const t = e.target;
    if (!(t instanceof Element)) return;
    if (t.closest(PERMITIDOS)) return;
    const sec = t.closest('section');
    if (!sec || sec.id === 'perigos') return;        // Consultas: à vontade
    if (t.closest('button, [data-acao], [data-rich-desc], [data-aj-toggle], ' +
                  '[data-log-ver], [data-log-limpar], select, input, label, [contenteditable]')) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  function bloquearEntrada(e) {
    const t = e.target;
    if (!(t instanceof Element)) return;
    if (t.closest('.loja-busca, .cr-busca')) return;   // buscar pode, sempre
    if (t.closest('[data-jog-edita]')) return;         // as caixas que são deles
    const sec = t.closest('section');
    if (!sec || sec.id === 'perigos') return;
    e.stopPropagation();                             // nenhum handler salva nada
  }

  // as caixas ricas deixam de ser editáveis — menos as marcadas com
  // [data-jog-edita], que existem para eles escreverem
  function travarEdicao() {
    document.querySelectorAll('[contenteditable="true"]').forEach(el => {
      if (el.closest('[data-jog-edita]')) return;
      el.setAttribute('contenteditable', 'false');
    });
  }

  function init() {
    document.addEventListener('click',  bloquearClique, true);
    document.addEventListener('input',  bloquearEntrada, true);
    document.addEventListener('change', bloquearEntrada, true);
    document.addEventListener('paste',  bloquearEntrada, true);

    travarEdicao();
    // qualquer re-render futuro (troca de loja no histórico etc.) re-trava
    new MutationObserver(travarEdicao)
      .observe(document.body, { childList: true, subtree: true });

    // volta para onde o jogador estava antes do auto-recarregar do sync
    let secao = '', scroll = 0;
    try {
      secao = sessionStorage.getItem('gaJog.secao') || '';
      scroll = parseInt(sessionStorage.getItem('gaJog.scroll'), 10) || 0;
      sessionStorage.removeItem('gaJog.secao');
      sessionStorage.removeItem('gaJog.scroll');
    } catch (e) {}
    if (secao) {
      const link = document.querySelector('.nav-link[data-section="' + secao + '"]');
      if (link) link.click();
    }
    if (scroll) setTimeout(() => window.scrollTo({ top: scroll, behavior: 'auto' }), 60);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
