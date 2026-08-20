// ═══════════════════════════════════════════════════════════════════
//  NPCS.JS — Sub-aba "👤 Guia de NPCs" (consulta rápida)
//  Lê window.GUIA_NPCS (js/npcs-data.js): fichas genéricas do livro
//  Guia de NPCs, por categoria, com busca global.
//
//  Hoje esta sub-aba só existe no jogadores.html: na página do mestre o
//  Guia mora na aba 📕 Fichas Prontas (js/fichas-prontas.js), junto com
//  os bestiários e com as regras de raça / truque / devoto. Onde a aba
//  ⚔ Combates estiver carregada, cada ficha ganha um botão que envia uma
//  cópia para lá (GA_Monstros.inserirNPC — entra na cena narrada ou, sem
//  cena narrada, numa sessão própria).
//
//  O desenho do statblock mora em js/statblock.js, compartilhado com a
//  aba 📕 Fichas Prontas do mestre.
// ═══════════════════════════════════════════════════════════════════
(function () {
  'use strict';

  const esc = window.GA_esc;
  const nl2br = window.GA_nl2br;
  const semAcento = window.GA_semAcento;
  const SB = window.GA_Statblock;

  const blocoHtml = f => SB.bloco(f.texto);

  // Esta sub-aba hoje só existe no jogadores.html — no index.html o Guia
  // mora na aba 📕 Fichas Prontas, ao lado dos bestiários. Sem a aba de
  // Combates carregada não há para onde enviar ficha, então o botão nem
  // aparece (se o mestre trouxer a sub-aba de volta, ele volta junto).
  const temCombate = () => !!(window.GA_Monstros && window.GA_Monstros.inserirNPC);

  function cardFicha(f, cat) {
    const busca = semAcento([f.nome, 'nd ' + f.nd, f.tipo, f.resumo, cat.nome, f.texto].join(' '));
    const acoes = temCombate() ? `
          <div class="npc-acoes">
            <button type="button" class="npc-enviar" data-npc-enviar="${f.chave}"
                    title="Insere uma cópia editável desta ficha na cena narrada (ou numa sessão própria) da aba ⚔ Combates">⚔ Enviar para o combate</button>
            <span class="npc-envio-info" hidden></span>
          </div>` : '';
    return `
      <details class="vc-card npc-card" data-busca="${esc(busca)}" style="--cor:${cat.cor || '#6e6256'}">
        <summary class="vc-card-cab">
          <span class="vc-card-nome">${esc(f.nome)} <span class="npc-nd">ND ${esc(f.nd)}</span></span>
          <span class="vc-card-meta">${esc(f.tipo || '')}</span>
        </summary>
        <div class="vc-card-corpo">
          <div class="npc-block">${blocoHtml(f)}</div>${acoes}
        </div>
      </details>`;
  }

  function cardRegra(r) {
    const busca = semAcento([r.titulo, r.texto].join(' '));
    return `
      <details class="vc-card vc-card--regra" data-busca="${esc(busca)}">
        <summary class="vc-card-cab"><span class="vc-card-nome">📖 ${esc(r.titulo)}</span></summary>
        <div class="vc-card-corpo"><div class="vc-regras">${nl2br(r.texto)}</div></div>
      </details>`;
  }

  function cardItem(it) {
    const busca = semAcento([it.nome, it.meta, it.texto].join(' '));
    return `
      <details class="vc-card npc-card--item" data-busca="${esc(busca)}">
        <summary class="vc-card-cab">
          <span class="vc-card-nome">${esc(it.nome)}</span>
          <span class="vc-card-meta">${esc(it.meta || '')}</span>
        </summary>
        <div class="vc-card-corpo"><div class="vc-regras">${nl2br(it.texto)}</div></div>
      </details>`;
  }

  function render() {
    const cont = document.getElementById('npcs-content');
    if (!cont) return;

    const g = window.GUIA_NPCS || {};
    const cats = Array.isArray(g.categorias) ? g.categorias : [];
    const regras = Array.isArray(g.regras) ? g.regras : [];
    const itens = Array.isArray(g.itens) ? g.itens : [];

    if (!cats.length) {
      cont.innerHTML = `<div class="cr-erro"><strong>Os dados não carregaram.</strong><br>
        Verifique se <code>js/npcs-data.js</code> está incluído antes de <code>js/npcs.js</code>.</div>`;
      return;
    }

    let grupos = '';
    cats.forEach(cat => {
      const cards = (cat.fichas || []).map(f => cardFicha(f, cat)).join('');
      const caixas = regras.filter(r => r.cat === cat.chave).map(cardRegra).join('');
      grupos += `
        <div class="vc-grupo">
          <h2 class="vc-grupo-titulo">${esc(cat.icone || '')} ${esc(cat.nome)}</h2>
          ${cat.intro ? `<p class="npc-intro">${nl2br(cat.intro)}</p>` : ''}
          <div class="vc-lista">${cards}${caixas}</div>
        </div>`;
    });

    const gerais = regras.filter(r => r.cat === 'geral' || !r.cat).map(cardRegra).join('');

    cont.innerHTML = `
      <div class="cr-cabecalho">
        <h1>👤 Guia de NPCs</h1>
        <p class="cr-sub">Fichas genéricas do povo de Arton — plebe, templo, lei, crime, corte e mercenários.${
          temCombate()
            ? ` O botão <strong>⚔ Enviar para o combate</strong> insere uma cópia editável na cena narrada da aba ⚔ Combates
        (sem cena narrada, cria a sessão "👤 NPCs do Guia").`
            : ''}</p>
      </div>
      <input class="cr-busca" type="text" placeholder="Buscar NPC (acólito, guarda, ND 2, nezumi, peçonha…)" autocomplete="off">
      ${grupos}
      ${gerais ? `<div class="vc-grupo"><h2 class="vc-grupo-titulo">📖 Regras gerais</h2><div class="vc-lista">${gerais}</div></div>` : ''}
      ${itens.length ? `<div class="vc-grupo"><h2 class="vc-grupo-titulo">🗡 Itens especiais citados nas fichas</h2><div class="vc-lista">${itens.map(cardItem).join('')}</div></div>` : ''}`;

    // busca global (mesmo comportamento das outras sub-abas)
    const busca = cont.querySelector('.cr-busca');
    busca.addEventListener('input', () => {
      const termo = semAcento(busca.value.trim());
      cont.querySelectorAll('[data-busca]').forEach(el => {
        const bate = !termo || el.dataset.busca.indexOf(termo) >= 0;
        el.style.display = bate ? '' : 'none';
        if (el.tagName === 'DETAILS') el.open = !!termo && bate;
      });
      cont.querySelectorAll('.vc-grupo').forEach(gr => {
        const algum = Array.from(gr.querySelectorAll('[data-busca]')).some(c => c.style.display !== 'none');
        gr.style.display = algum ? '' : 'none';
      });
    });

    // enviar para o combate
    cont.addEventListener('click', e => {
      const btn = e.target.closest('[data-npc-enviar]');
      if (!btn) return;
      const api = window.GA_Monstros;
      const info = btn.parentElement.querySelector('.npc-envio-info');
      if (!api || typeof api.inserirNPC !== 'function') {
        if (info) { info.hidden = false; info.textContent = 'A aba ⚔ Combates não carregou.'; }
        return;
      }
      const r = api.inserirNPC(btn.dataset.npcEnviar);
      if (!r) return;
      if (info) {
        info.hidden = false;
        info.innerHTML = r.narrada
          ? `✓ <strong>${esc(r.nome)}</strong> entrou na cena narrada "${esc(r.cena)}"`
          : `✓ <strong>${esc(r.nome)}</strong> entrou em ${esc(r.sessao)} · ${esc(r.cena)} (aba ⚔ Combates)`;
        clearTimeout(info._timer);
        info._timer = setTimeout(() => { info.hidden = true; }, 5000);
      }
    });
  }

  function init() {
    if (!document.getElementById('npcs-content')) return;
    try { render(); }
    catch (err) {
      console.error('[npcs] falha ao renderizar:', err);
      const cont = document.getElementById('npcs-content');
      if (cont) cont.innerHTML = `<div class="cr-erro"><strong>Erro ao montar a aba:</strong><br>${esc(err && err.message || err)}</div>`;
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
