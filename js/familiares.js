// ═══════════════════════════════════════════════════════════════════
//  FAMILIARES.JS — Sub-aba "🦉 Familiares" (consulta rápida)
//  Lê window.FAMILIARES e FAMILIARES_REGRAS (js/familiares-data.js).
//  Só leitura, com busca. Mesma linguagem visual da 🐎 Animais &
//  Montarias: cards <details> com o benefício aberto no corpo.
// ═══════════════════════════════════════════════════════════════════
(function () {
  'use strict';

  const esc = window.GA_esc;
  const nl2br = window.GA_nl2br;
  const semAcento = window.GA_semAcento;

  function cardFamiliar(f) {
    const busca = semAcento([f.nome, f.nd, f.secao, f.fonte, f.beneficio, f.exige, f.tambemParceiro, f.nota].join(' '));
    const meta = ['ND ' + f.nd, f.secao].filter(Boolean).join(' · ');
    return `
      <details class="vc-card am-card" data-busca="${esc(busca)}">
        <summary class="vc-card-cab">
          <span class="vc-card-nome">${esc(f.nome)}</span>
          <span class="vc-card-meta">${esc(meta)}</span>
        </summary>
        <div class="vc-card-corpo">
          <div class="am-tiers">
            <div class="am-tier">
              <span class="am-tier-rot">Familiar</span>
              <span class="am-tier-txt">${nl2br(f.beneficio)}</span>
            </div>
            ${f.exige ? `<div class="am-tier">
              <span class="am-tier-rot">Exige</span>
              <span class="am-tier-txt">${nl2br(f.exige)}</span>
            </div>` : ''}
            ${f.tambemParceiro ? `<div class="am-tier">
              <span class="am-tier-rot">Também é</span>
              <span class="am-tier-txt">${esc(f.tambemParceiro)} — veja a aba 🐎 Animais &amp; Montarias</span>
            </div>` : ''}
          </div>
          ${f.nota ? `<p class="am-obs">${esc(f.nota)}</p>` : ''}
        </div>
      </details>`;
  }

  function cardRegra(r) {
    const busca = semAcento([r.titulo, r.texto].join(' '));
    return `
      <details class="vc-card vc-card--regra" data-busca="${esc(busca)}">
        <summary class="vc-card-cab"><span class="vc-card-nome">${esc(r.titulo)}</span></summary>
        <div class="vc-card-corpo"><div class="vc-regras">${nl2br(r.texto)}</div></div>
      </details>`;
  }

  function grupo(titulo, htmlCards) {
    return `<div class="vc-grupo"><h2 class="vc-grupo-titulo">${esc(titulo)}</h2><div class="vc-lista">${htmlCards}</div></div>`;
  }

  function render() {
    const cont = document.getElementById('familiares-content');
    if (!cont) return;

    const fams = Array.isArray(window.FAMILIARES) ? window.FAMILIARES : [];
    const regras = Array.isArray(window.FAMILIARES_REGRAS) ? window.FAMILIARES_REGRAS : [];

    if (!fams.length) {
      cont.innerHTML = `<div class="cr-erro"><strong>Os dados não carregaram.</strong><br>
        Verifique se <code>js/familiares-data.js</code> está incluído antes de <code>js/familiares.js</code>.</div>`;
      return;
    }

    // agrupa por fonte, na ordem de aparição (hoje só Ameaças de Arton)
    const fontes = [];
    fams.forEach(f => { if (fontes.indexOf(f.fonte) < 0) fontes.push(f.fonte); });
    let gruposFam = '';
    fontes.forEach(fo => {
      const doGrupo = fams.filter(f => f.fonte === fo).map(cardFamiliar).join('');
      gruposFam += `<div class="am-fonte"><h3 class="am-fonte-titulo">${esc(fo)}</h3><div class="vc-lista">${doGrupo}</div></div>`;
    });

    cont.innerHTML = `
      <div class="cr-cabecalho">
        <h1>🦉 Familiares</h1>
        <p class="cr-sub">O benefício que cada criatura dá quando é invocada como familiar — separado do que ela dá como parceiro.</p>
      </div>
      <input class="cr-busca" type="text" placeholder="Buscar familiar (estirge, dragão, frio, PM temporário…)" autocomplete="off">
      <div class="vc-grupo">
        <h2 class="vc-grupo-titulo">🦉 Bestiário de familiares</h2>
        ${gruposFam}
      </div>
      ${grupo('📖 Regras', regras.map(cardRegra).join(''))}`;

    const busca = cont.querySelector('.cr-busca');
    busca.addEventListener('input', () => {
      const termo = semAcento(busca.value.trim());
      cont.querySelectorAll('[data-busca]').forEach(el => {
        const bate = !termo || el.dataset.busca.indexOf(termo) >= 0;
        el.style.display = bate ? '' : 'none';
        if (el.tagName === 'DETAILS') el.open = !!termo && bate;
      });
      cont.querySelectorAll('.am-fonte').forEach(g => {
        const algum = Array.from(g.querySelectorAll('[data-busca]')).some(c => c.style.display !== 'none');
        g.style.display = algum ? '' : 'none';
      });
      cont.querySelectorAll('.vc-grupo').forEach(g => {
        const algum = Array.from(g.querySelectorAll('[data-busca]')).some(c => c.style.display !== 'none');
        g.style.display = algum ? '' : 'none';
      });
    });
  }

  function init() {
    if (!document.getElementById('familiares-content')) return;
    try { render(); }
    catch (err) {
      console.error('[familiares] falha ao renderizar:', err);
      const cont = document.getElementById('familiares-content');
      if (cont) cont.innerHTML = `<div class="cr-erro"><strong>Erro ao montar a aba:</strong><br>${esc(err && err.message || err)}</div>`;
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
