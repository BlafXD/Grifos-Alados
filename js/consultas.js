// ═══════════════════════════════════════════════════════════════════
//  CONSULTAS.JS — Hub das sub-abas de "Consultas rápidas"
//  Alterna entre os painéis [data-cr-panel] conforme o botão
//  [data-cr-tab] clicado. Cada painel é populado pelo seu próprio js
//  (perigos.js, veiculos.js, animais.js). Carregado por último.
// ═══════════════════════════════════════════════════════════════════
(function () {
  'use strict';

  function init() {
    const sec = document.getElementById('perigos');
    if (!sec) return;
    const bar = sec.querySelector('.cr-subtabs');
    if (!bar) return;

    bar.addEventListener('click', e => {
      const btn = e.target.closest('[data-cr-tab]');
      if (!btn) return;
      const alvo = btn.dataset.crTab;
      bar.querySelectorAll('[data-cr-tab]').forEach(b =>
        b.classList.toggle('cr-subtab--ativa', b === btn));
      sec.querySelectorAll('[data-cr-panel]').forEach(p => {
        p.hidden = (p.dataset.crPanel !== alvo);
      });
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
