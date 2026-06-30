// ═══════════════════════════════════════════════════════════════════
//  ANIMAIS.JS — Sub-aba "🐎 Animais & Montarias" (consulta rápida)
//  Lê window.ANIMAIS_COMPRA, ANIMAIS_EQUIP, PARCEIRO_TIPOS,
//  MONTARIAS e ANIMAIS_REGRAS. Só leitura, com busca global.
// ═══════════════════════════════════════════════════════════════════
(function () {
  'use strict';

  const esc = window.GA_esc;
  const nl2br = window.GA_nl2br;
  const semAcento = window.GA_semAcento;

  // Bloco de níveis Iniciante / Veterano / Mestre.
  function tiers(o) {
    const row = (rot, txt) => (txt && txt !== '—')
      ? `<div class="am-tier"><span class="am-tier-rot">${rot}</span><span class="am-tier-txt">${nl2br(txt)}</span></div>`
      : '';
    return `<div class="am-tiers">${row('Iniciante', o.ini)}${row('Veterano', o.vet)}${row('Mestre', o.mes)}</div>`;
  }

  // ── cards por tipo ───────────────────────────────────────────────
  function cardCompra(a) {
    const busca = semAcento([a.nome, a.tipo, a.texto, a.preco].join(' '));
    const desloc = a.deslocMetros ? `<span class="am-badge am-badge--desl">desloc. ${a.deslocMetros} m</span>` : '';
    return `
      <div class="am-item" data-busca="${esc(busca)}">
        <div class="am-item-cab">
          <span class="am-item-nome">${esc(a.nome)}</span>
          <span class="am-badge">${esc(a.preco)}</span>
        </div>
        <div class="am-item-tags">${a.tipo ? `<span class="am-tag">${esc(a.tipo)}</span>` : ''}${desloc}</div>
        <p class="am-item-txt">${esc(a.texto)}</p>
      </div>`;
  }

  function cardEquip(e) {
    const busca = semAcento([e.nome, e.texto, e.preco].join(' '));
    const esp = (e.espacos != null) ? `<span class="am-tag">${e.espacos} espaço${e.espacos !== 1 ? 's' : ''}</span>` : '';
    return `
      <div class="am-item" data-busca="${esc(busca)}">
        <div class="am-item-cab">
          <span class="am-item-nome">${esc(e.nome)}</span>
          <span class="am-badge">${esc(e.preco)}</span>
        </div>
        <div class="am-item-tags">${esp}</div>
        <p class="am-item-txt">${esc(e.texto)}</p>
      </div>`;
  }

  function cardTipo(t) {
    const busca = semAcento([t.nome, t.desc, t.ini, t.vet, t.mes, t.obs].join(' '));
    return `
      <details class="vc-card am-card" data-busca="${esc(busca)}">
        <summary class="vc-card-cab">
          <span class="vc-card-nome">${esc(t.nome)}</span>
          <span class="vc-card-meta">${esc(t.desc || '')}</span>
        </summary>
        <div class="vc-card-corpo">
          ${tiers(t)}
          ${t.obs ? `<p class="am-obs">${esc(t.obs)}</p>` : ''}
        </div>
      </details>`;
  }

  function cardMontaria(m) {
    const busca = semAcento([m.nome, m.tamanho, m.fonte, m.obs, m.ini, m.vet, m.mes, m.nota].join(' '));
    const meta = [m.tamanho, m.fonte].filter(Boolean).join(' · ');
    return `
      <details class="vc-card am-card" data-busca="${esc(busca)}">
        <summary class="vc-card-cab">
          <span class="vc-card-nome">${esc(m.nome)}</span>
          <span class="vc-card-meta">${esc(meta)}</span>
        </summary>
        <div class="vc-card-corpo">
          ${m.obs ? `<p class="am-obs">${esc(m.obs)}</p>` : ''}
          ${tiers(m)}
          ${m.nota ? `<div class="vc-regras"><span class="vc-regras-rot">Observação</span>${nl2br(m.nota)}</div>` : ''}
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
    const cont = document.getElementById('animais-content');
    if (!cont) return;

    const compra = Array.isArray(window.ANIMAIS_COMPRA) ? window.ANIMAIS_COMPRA : [];
    const equip  = Array.isArray(window.ANIMAIS_EQUIP) ? window.ANIMAIS_EQUIP : [];
    const tipos  = Array.isArray(window.PARCEIRO_TIPOS) ? window.PARCEIRO_TIPOS : [];
    const monts  = Array.isArray(window.MONTARIAS) ? window.MONTARIAS : [];
    const regras = Array.isArray(window.ANIMAIS_REGRAS) ? window.ANIMAIS_REGRAS : [];

    if (!compra.length && !monts.length) {
      cont.innerHTML = `<div class="cr-erro"><strong>Os dados não carregaram.</strong><br>
        Verifique se <code>js/animais-data.js</code> está incluído antes de <code>js/animais.js</code>.</div>`;
      return;
    }

    // montarias agrupadas por fonte (na ordem de aparição)
    const fontes = [];
    monts.forEach(m => { if (fontes.indexOf(m.fonte) < 0) fontes.push(m.fonte); });
    let gruposMont = '';
    fontes.forEach(f => {
      const doGrupo = monts.filter(m => m.fonte === f).map(cardMontaria).join('');
      gruposMont += `<div class="am-fonte"><h3 class="am-fonte-titulo">${esc(f)}</h3><div class="vc-lista">${doGrupo}</div></div>`;
    });

    cont.innerHTML = `
      <div class="cr-cabecalho">
        <h1>🐎 Animais &amp; Montarias</h1>
        <p class="cr-sub">Compráveis, equipamentos e benefícios de parceiro (iniciante / veterano / mestre).</p>
      </div>
      <input class="cr-busca" type="text" placeholder="Buscar animal, montaria, equipamento (cavalo, grifo, estribos…)" autocomplete="off">
      ${grupo('🛒 Animais compráveis', compra.map(cardCompra).join(''))}
      ${grupo('🎽 Equipamentos de montaria', equip.map(cardEquip).join(''))}
      ${grupo('🤝 Tipos de parceiro', tipos.map(cardTipo).join(''))}
      <div class="vc-grupo">
        <h2 class="vc-grupo-titulo">🐎 Bestiário de montarias</h2>
        ${gruposMont}
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
      // some grupos/fontes vazios
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
    if (!document.getElementById('animais-content')) return;
    try { render(); }
    catch (err) {
      console.error('[animais] falha ao renderizar:', err);
      const cont = document.getElementById('animais-content');
      if (cont) cont.innerHTML = `<div class="cr-erro"><strong>Erro ao montar a aba:</strong><br>${esc(err && err.message || err)}</div>`;
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
