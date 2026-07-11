// ═══════════════════════════════════════════════════════════════════
//  CONDICOES.JS — Sub-aba "🌀 Condições" (Consultas rápidas)
//  Lista de Condições do Tormenta20: busca, filtro por tipo de efeito
//  e cards com o texto integral. Lê window.GA_CONDICOES.
//  Termos citados dentro dos textos (desprevenido, lento…) ganham a
//  nuvem de definição via ItensDescricoes.marcar (hover; clique fixa).
// ═══════════════════════════════════════════════════════════════════
(function () {
  'use strict';

  const esc = window.GA_esc;
  const semAcento = window.GA_semAcento;

  let tipoAtivo = '';   // '' = todas · 'sem' = sem tipo · chave do tipo

  function tipoInfo(chave) {
    const G = window.GA_CONDICOES;
    return (G.TIPOS || []).find(t => t.chave === chave) || null;
  }

  function badgeTipo(chave) {
    const t = tipoInfo(chave);
    if (!t) return '';
    return `<span class="cond-badge" style="--cor:${t.cor}">${esc(t.nome)}</span>`;
  }

  function cardCondicao(c) {
    const t = tipoInfo(c.tipo);
    const busca = semAcento([c.nome, c.texto, t ? t.nome : ''].join(' '));
    const corpo = window.ItensDescricoes ? window.ItensDescricoes.marcar(c.texto) : esc(c.texto);
    return `
      <details class="vc-card vc-card--regra" data-busca="${esc(busca)}" data-tipo="${esc(c.tipo || 'sem')}">
        <summary class="vc-card-cab">
          <span class="vc-card-nome">${esc(c.nome)}</span>
          ${badgeTipo(c.tipo)}
        </summary>
        <div class="vc-card-corpo"><div class="vc-regras">${corpo}</div></div>
      </details>`;
  }

  function aplicarFiltro(cont) {
    const termo = semAcento(cont.querySelector('.cr-busca').value.trim());
    cont.querySelectorAll('.vc-card').forEach(c => {
      const bateTermo = !termo || c.dataset.busca.indexOf(termo) >= 0;
      const bateTipo = !tipoAtivo || c.dataset.tipo === tipoAtivo;
      const bate = bateTermo && bateTipo;
      c.style.display = bate ? '' : 'none';
      c.open = !!termo && bate;
    });
  }

  function render() {
    const cont = document.getElementById('condicoes-content');
    if (!cont) return;
    const G = window.GA_CONDICOES;
    if (!G || !Array.isArray(G.LISTA) || !G.LISTA.length) {
      cont.innerHTML = `<div class="cr-erro"><strong>Os dados não carregaram.</strong><br>
        Verifique se <code>js/condicoes-data.js</code> está incluído antes de <code>js/condicoes.js</code>.</div>`;
      return;
    }

    const chips = [{ chave: '', nome: 'Todas', cor: '#6e6256' }]
      .concat(G.TIPOS)
      .concat([{ chave: 'sem', nome: 'Sem tipo', cor: '#8a7f70' }])
      .map(t => `<button type="button" class="cond-chip ${tipoAtivo === t.chave ? 'cond-chip--on' : ''}"
                         data-cond-tipo="${esc(t.chave)}" style="--cor:${t.cor}">${esc(t.nome)}</button>`)
      .join('');

    cont.innerHTML = `
      <div class="cr-cabecalho">
        <h1>🌀 Condições</h1>
        <p class="cr-sub">Lista de Condições do Tormenta20 — o texto completo de cada uma, com o tipo de efeito.
          Passe o mouse nos termos citados para ver a definição; clique para fixar a nuvem.</p>
      </div>

      <div class="cond-intro">${esc(G.intro)}</div>

      <div class="cond-chips" role="group" aria-label="Filtrar por tipo de efeito">${chips}</div>

      <input class="cr-busca" type="text" placeholder="Buscar condição (cego, medo, deslocamento, –5…)" autocomplete="off">

      <div class="vc-grupo">
        <div class="vc-lista">${G.LISTA.map(cardCondicao).join('')}</div>
      </div>`;

    cont.querySelector('.cr-busca').addEventListener('input', () => aplicarFiltro(cont));
    cont.querySelector('.cond-chips').addEventListener('click', e => {
      const btn = e.target.closest('[data-cond-tipo]');
      if (!btn) return;
      tipoAtivo = btn.dataset.condTipo;
      cont.querySelectorAll('.cond-chip').forEach(ch =>
        ch.classList.toggle('cond-chip--on', ch === btn));
      aplicarFiltro(cont);
    });
  }

  function init() {
    if (!document.getElementById('condicoes-content')) return;
    try { render(); }
    catch (err) {
      console.error('[condicoes] falha ao renderizar:', err);
      const cont = document.getElementById('condicoes-content');
      if (cont) cont.innerHTML = `<div class="cr-erro"><strong>Erro ao montar a aba:</strong><br>${esc(err && err.message || err)}</div>`;
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
