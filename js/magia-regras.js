// ═══════════════════════════════════════════════════════════════════
//  MAGIA-REGRAS.JS — Sub-aba "✨ Regras de Magia" (consulta rápida)
//  Lê window.REGRAS_MAGIA e monta cards recolhíveis (<details>),
//  agrupados, com busca. Só leitura. Reutiliza as classes .vc-* / .cr-*.
//  Espelha regras-itens.js / ameacas.js.
// ═══════════════════════════════════════════════════════════════════
(function () {
  'use strict';

  const esc = window.GA_esc;
  const nl2br = window.GA_nl2br;
  const semAcento = window.GA_semAcento;

  function cardRegra(r) {
    const busca = semAcento([r.titulo, r.texto, r.grupo].join(' '));
    return `
      <details class="vc-card vc-card--regra" data-busca="${esc(busca)}">
        <summary class="vc-card-cab"><span class="vc-card-nome">${esc(r.titulo)}</span></summary>
        <div class="vc-card-corpo"><div class="vc-regras">${nl2br(r.texto)}</div></div>
      </details>`;
  }

  function render() {
    const cont = document.getElementById('magia-content');
    if (!cont) return;

    const regras = Array.isArray(window.REGRAS_MAGIA) ? window.REGRAS_MAGIA : [];
    if (!regras.length) {
      cont.innerHTML = `<div class="cr-erro"><strong>Os dados não carregaram.</strong><br>
        Verifique se <code>js/magia-regras-data.js</code> está incluído antes de <code>js/magia-regras.js</code>.</div>`;
      return;
    }

    // Agrupa preservando a ordem de inserção dos grupos.
    const ordem = [];
    const grupos = {};
    regras.forEach(r => {
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
        <h1>✨ Regras de Magia</h1>
        <p class="cr-sub">Regras gerais de magia e conjuração — clique para abrir.</p>
      </div>
      <input class="cr-busca" type="text" placeholder="Buscar regra (sem custo, simulada…)" autocomplete="off">
      ${blocos}`;

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

  function init() {
    if (!document.getElementById('magia-content')) return;
    try { render(); }
    catch (err) {
      console.error('[magia-regras] falha ao renderizar:', err);
      const cont = document.getElementById('magia-content');
      if (cont) cont.innerHTML = `<div class="cr-erro"><strong>Erro ao montar a aba:</strong><br>${esc(err && err.message || err)}</div>`;
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
