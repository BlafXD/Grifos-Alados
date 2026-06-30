// ═══════════════════════════════════════════════════════════════════
//  VEICULOS.JS — Sub-aba "🚗 Veículos" (consulta rápida)
//  Lê window.VEICULOS e window.VEICULOS_REGRAS e monta cards
//  recolhíveis (<details>) com busca. Só leitura.
// ═══════════════════════════════════════════════════════════════════
(function () {
  'use strict';

  const esc = window.GA_esc;
  const nl2br = window.GA_nl2br;
  const semAcento = window.GA_semAcento;

  // Linha de estatística (rótulo + valor), só se houver valor.
  // wide=true ocupa a linha inteira da grade (valores longos: defesa, tripulação…).
  function stat(rot, val, wide) {
    val = (val == null ? '' : String(val)).trim();
    if (!val) return '';
    const cls = 'vc-stat' + (wide ? ' vc-stat--wide' : '');
    return `<div class="${cls}"><span class="vc-stat-rot">${esc(rot)}</span><span class="vc-stat-val">${esc(val)}</span></div>`;
  }

  function cardVeiculo(v) {
    const busca = semAcento([v.nome, v.tamanho, v.desloc, v.descricao, v.regras, v.preco].join(' '));
    const stats =
      // curtas — grade de 2 colunas
      stat('Preço', v.preco) +
      stat('Tamanho', v.tamanho) +
      stat('Deslocamento', v.desloc) +
      stat('Pontos de Vida', v.pv) +
      (v.rd ? stat('Redução de Dano', v.rd) : '') +
      (v.tracao ? stat('Tração', v.tracao) : '') +
      // longas — linha inteira (evita espremer texto em meia-coluna)
      stat('Defesa', v.defesa, true) +
      stat('Tripulação', v.tripulacao, true) +
      stat('Passageiros / Carga', v.capacidade, true) +
      (v.cobertura ? stat('Cobertura', v.cobertura, true) : '');

    return `
      <details class="vc-card" data-busca="${esc(busca)}">
        <summary class="vc-card-cab">
          <span class="vc-card-nome">${esc(v.nome)}</span>
          <span class="vc-card-meta">${esc(v.preco)} · ${esc(v.tamanho)} · ${esc(v.desloc)}</span>
        </summary>
        <div class="vc-card-corpo">
          ${v.descricao ? `<p class="vc-desc">${esc(v.descricao)}</p>` : ''}
          <div class="vc-stats">${stats}</div>
          ${v.regras ? `<div class="vc-regras"><span class="vc-regras-rot">Regras especiais</span>${nl2br(v.regras)}</div>` : ''}
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

  function render() {
    const cont = document.getElementById('veiculos-content');
    if (!cont) return;

    const veics = Array.isArray(window.VEICULOS) ? window.VEICULOS : [];
    const regras = Array.isArray(window.VEICULOS_REGRAS) ? window.VEICULOS_REGRAS : [];

    if (!veics.length && !regras.length) {
      cont.innerHTML = `<div class="cr-erro"><strong>Os dados não carregaram.</strong><br>
        Verifique se <code>js/veiculos-data.js</code> está incluído antes de <code>js/veiculos.js</code>.</div>`;
      return;
    }

    cont.innerHTML = `
      <div class="cr-cabecalho">
        <h1>🚗 Veículos</h1>
        <p class="cr-sub">Estatísticas, preços e regras de uso — clique para abrir.</p>
      </div>
      <input class="cr-busca" type="text" placeholder="Buscar veículo ou regra (carroça, balão, atropelamento…)" autocomplete="off">
      <div class="vc-grupo">
        <h2 class="vc-grupo-titulo">Veículos</h2>
        <div class="vc-lista">${veics.map(cardVeiculo).join('')}</div>
      </div>
      <div class="vc-grupo">
        <h2 class="vc-grupo-titulo">📖 Regras de veículos</h2>
        <div class="vc-lista">${regras.map(cardRegra).join('')}</div>
      </div>`;

    const busca = cont.querySelector('.cr-busca');
    busca.addEventListener('input', () => {
      const termo = semAcento(busca.value.trim());
      cont.querySelectorAll('.vc-card').forEach(c => {
        const bate = !termo || c.dataset.busca.indexOf(termo) >= 0;
        c.style.display = bate ? '' : 'none';
        c.open = !!termo && bate;            // abre os que casam durante a busca
      });
      cont.querySelectorAll('.vc-grupo').forEach(g => {
        const algum = Array.from(g.querySelectorAll('.vc-card')).some(c => c.style.display !== 'none');
        g.style.display = algum ? '' : 'none';
      });
    });
  }

  function init() {
    if (!document.getElementById('veiculos-content')) return;
    try { render(); }
    catch (err) {
      console.error('[veiculos] falha ao renderizar:', err);
      const cont = document.getElementById('veiculos-content');
      if (cont) cont.innerHTML = `<div class="cr-erro"><strong>Erro ao montar a aba:</strong><br>${esc(err && err.message || err)}</div>`;
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
