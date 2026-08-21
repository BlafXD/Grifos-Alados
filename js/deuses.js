// ═══════════════════════════════════════════════════════════════════
//  DEUSES.JS — Sub-aba "⛩ Deuses de Arton" (aba 📚 Consultas)
//  Localização: /grifos-alados/js/deuses.js
//
//  Lê window.DEUSES_ARTON_ARTIGOS e monta um verbete recolhível por
//  divindade: quadro de dados (símbolo sagrado, arma preferida,
//  canalização, lema), abertura e as seções do livro — motivações,
//  relações, igreja e clero, e como o avatar se manifesta.
//
//  Existe nas DUAS edições: é lore, não é ficha. As FICHAS dos avatares
//  moram na aba 📕 Fichas Prontas, que só o mestre tem — quando ela está
//  carregada, cada verbete ganha um rodapé apontando para lá.
// ═══════════════════════════════════════════════════════════════════
(function () {
  'use strict';

  const esc = window.GA_esc;
  const nl2br = window.GA_nl2br;
  const semAcento = window.GA_semAcento;

  // a aba de fichas só existe no index.html (mestre)
  function temFichas() {
    const B = window.GA_FichasProntas;
    return !!(B && typeof B.ficha === 'function' && window.FICHAS_DEUSES_ARTON);
  }

  // "Símbolo Sagrado. Um sol dourado." → rótulo em negrito
  function quadroDados(txt) {
    return String(txt || '').split('\n').filter(Boolean).map(l => {
      const m = l.match(/^([A-ZÀ-Ý][^.]{2,28})\.\s*([^]*)$/);
      return m
        ? `<div class="dv-dado"><dt>${esc(m[1])}</dt><dd>${esc(m[2])}</dd></div>`
        : `<div class="dv-dado"><dd>${esc(l)}</dd></div>`;
    }).join('');
  }

  function paragrafos(txt) {
    return String(txt || '').split('\n\n').filter(p => p.trim())
      .map(p => `<p>${nl2br(p.trim())}</p>`).join('');
  }

  function card(d) {
    const busca = semAcento([d.nome, d.epiteto, d.dados, d.abertura,
      (d.secoes || []).map(s => s.titulo + ' ' + s.texto).join(' ')].join(' '));
    const secoes = (d.secoes || []).map(s => `
      <section class="dv-secao">
        <h3 class="dv-secao-titulo">${esc(s.titulo)}</h3>
        ${paragrafos(s.texto)}
      </section>`).join('');
    const rodape = temFichas()
      ? `<p class="dv-ficha">⚔ A ficha do <strong>Avatar de ${esc(d.nome)}</strong>
           (ND ${esc(d.nd)}) está na aba <strong>📕 Fichas Prontas → ⛩ Deuses de Arton</strong>.</p>`
      : '';
    return `
      <details class="vc-card dv-card" data-busca="${esc(busca)}" data-dv="${esc(d.chave)}">
        <summary class="vc-card-cab">
          <span class="vc-card-nome">${esc(d.nome)}</span>
          <span class="vc-card-meta">${esc(d.epiteto)}</span>
        </summary>
        <div class="vc-card-corpo">
          <dl class="dv-dados">${quadroDados(d.dados)}</dl>
          ${d.abertura ? `<div class="dv-abertura">${paragrafos(d.abertura)}</div>` : ''}
          ${secoes}
          ${rodape}
        </div>
      </details>`;
  }

  function render() {
    const cont = document.getElementById('deuses-content');
    if (!cont) return;

    const dados = window.DEUSES_ARTON_ARTIGOS;
    const deuses = (dados && Array.isArray(dados.deuses)) ? dados.deuses : [];
    if (!deuses.length) {
      cont.innerHTML = `<div class="cr-erro"><strong>Os dados não carregaram.</strong><br>
        Verifique se <code>js/deuses-artigos-data.js</code> está incluído antes de
        <code>js/deuses.js</code>.</div>`;
      return;
    }

    // atalhos para pular direto ao verbete
    const atalhos = deuses.map(d =>
      `<button type="button" class="dv-atalho" data-dv-ir="${esc(d.chave)}">${esc(d.nome)}</button>`).join('');

    cont.innerHTML = `
      <div class="cr-cabecalho">
        <h1>⛩ Deuses de Arton</h1>
        <p class="cr-sub">Os vinte Deuses Maiores do Panteão: o que cada um quer, como se dá com os
        outros, como é a igreja dele e de que forma seu avatar aparece em Arton. O quadro de dados
        abre cada verbete — símbolo sagrado, arma preferida, canalização e lema.
        <em>${esc(dados.livro || '')}${dados.fonte ? ' · ' + esc(dados.fonte) : ''}.</em></p>
      </div>
      <nav class="dv-atalhos" aria-label="Ir para um deus">${atalhos}</nav>
      <input class="cr-busca" type="text" autocomplete="off"
             placeholder="Buscar deus, símbolo, arma preferida, lema (cimitarra, corrente de espinhos, tibar…)">
      <div class="vc-grupo">
        <div class="vc-lista dv-lista">${deuses.map(card).join('')}</div>
      </div>`;

    const busca = cont.querySelector('.cr-busca');
    busca.addEventListener('input', () => {
      const termo = semAcento(busca.value.trim());
      cont.querySelectorAll('[data-busca]').forEach(el => {
        const bate = !termo || el.dataset.busca.indexOf(termo) >= 0;
        el.style.display = bate ? '' : 'none';
        if (el.tagName === 'DETAILS') el.open = !!termo && bate;
      });
      cont.querySelectorAll('.dv-atalho').forEach(b => {
        const alvo = cont.querySelector(`[data-dv="${b.dataset.dvIr}"]`);
        b.hidden = !!(alvo && alvo.style.display === 'none');
      });
    });

    cont.addEventListener('click', e => {
      const ir = e.target.closest('[data-dv-ir]');
      if (!ir) return;
      const alvo = cont.querySelector(`[data-dv="${ir.dataset.dvIr}"]`);
      if (!alvo) return;
      alvo.open = true;
      alvo.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  function init() {
    if (!document.getElementById('deuses-content')) return;
    try { render(); }
    catch (err) {
      console.error('[deuses] falha ao renderizar:', err);
      const cont = document.getElementById('deuses-content');
      if (cont) cont.innerHTML = `<div class="cr-erro"><strong>Erro ao montar a aba:</strong><br>${esc(err && err.message || err)}</div>`;
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
