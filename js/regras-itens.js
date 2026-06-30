// ═══════════════════════════════════════════════════════════════════
//  REGRAS-ITENS.JS — Sub-aba "⚔ Arsenal & Regras" (consulta rápida)
//  Lê window.REGRAS_ITENS e monta cards recolhíveis (<details>),
//  agrupados, com busca. Só leitura. Reutiliza as classes .vc-* / .cr-*.
// ═══════════════════════════════════════════════════════════════════
(function () {
  'use strict';

  const esc = window.GA_esc;
  const nl2br = window.GA_nl2br;
  const semAcento = window.GA_semAcento;

  // Monta uma tabela de regra (.prog-table) a partir de { cab, linhas, destaque, nota, titulo }.
  // destaque = índice (0-based) da coluna a realçar (ex.: "Normal" nos passos de dano).
  function tabelaHTML(t) {
    if (!t || !Array.isArray(t.cab) || !Array.isArray(t.linhas)) return '';
    const key = Number.isInteger(t.destaque) ? t.destaque : -1;
    const cls = i => (i === key ? ' class="prog-col-key"' : '');
    const ths = t.cab.map((c, i) => `<th${cls(i)}>${esc(c)}</th>`).join('');
    const trs = t.linhas.map(linha =>
      `<tr>${linha.map((c, i) => `<td${cls(i)}>${esc(c)}</td>`).join('')}</tr>`).join('');
    const cap  = t.titulo ? `<caption>${esc(t.titulo)}</caption>` : '';
    const nota = t.nota ? `<p class="prog-table-nota">${esc(t.nota)}</p>` : '';
    return `<div class="prog-table-wrap"><table class="prog-table">${cap}` +
           `<thead><tr>${ths}</tr></thead><tbody>${trs}</tbody></table></div>${nota}`;
  }

  function cardRegra(r) {
    // indexa também o conteúdo da tabela para a busca encontrar (ex.: "4d12").
    const txtTab = r.tabela
      ? [(r.tabela.cab || []).join(' '),
         ...(r.tabela.linhas || []).map(l => l.join(' ')),
         r.tabela.nota || ''].join(' ')
      : '';
    const busca = semAcento([r.titulo, r.texto, txtTab, r.grupo].join(' '));
    const corpo = [
      r.texto ? `<div class="vc-regras">${nl2br(r.texto)}</div>` : '',
      tabelaHTML(r.tabela),
    ].join('');
    // regras com tabela ocupam a linha inteira (a tabela precisa de largura).
    const cls = 'vc-card vc-card--regra' + (r.tabela ? ' vc-card--tabela' : '');
    return `
      <details class="${cls}" data-busca="${esc(busca)}">
        <summary class="vc-card-cab"><span class="vc-card-nome">${esc(r.titulo)}</span></summary>
        <div class="vc-card-corpo">${corpo}</div>
      </details>`;
  }

  function render() {
    const cont = document.getElementById('arsenal-content');
    if (!cont) return;

    const regras = Array.isArray(window.REGRAS_ITENS) ? window.REGRAS_ITENS : [];
    if (!regras.length) {
      cont.innerHTML = `<div class="cr-erro"><strong>Os dados não carregaram.</strong><br>
        Verifique se <code>js/regras-itens-data.js</code> está incluído antes de <code>js/regras-itens.js</code>.</div>`;
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
        <h1>⚔ Arsenal &amp; Regras</h1>
        <p class="cr-sub">Regras gerais de armas, ataques desarmados &amp; naturais, armaduras, alquímicos, venenos, condições de itens e alimentação — clique para abrir.</p>
      </div>
      <input class="cr-busca" type="text" placeholder="Buscar regra (crítico, exótica, veneno, embriaguez…)" autocomplete="off">
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
    if (!document.getElementById('arsenal-content')) return;
    try { render(); }
    catch (err) {
      console.error('[regras-itens] falha ao renderizar:', err);
      const cont = document.getElementById('arsenal-content');
      if (cont) cont.innerHTML = `<div class="cr-erro"><strong>Erro ao montar a aba:</strong><br>${esc(err && err.message || err)}</div>`;
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
