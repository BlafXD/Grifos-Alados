// ═══════════════════════════════════════════════════════════════════
//  URBANO.JS — Sub-aba "🏙 Vida Urbana" (consulta rápida)
//  Lê window.REGRAS_URBANO e monta cards recolhíveis (<details>),
//  agrupados, com busca. Só leitura. Mesmo motor de acoes.js
//  (reutiliza as classes .vc-* / .cr-* / .prog-table).
// ═══════════════════════════════════════════════════════════════════
(function () {
  'use strict';

  const esc = window.GA_esc;
  const nl2br = window.GA_nl2br;
  const semAcento = window.GA_semAcento;

  // Tabela de regra (.prog-table) a partir de { cab, linhas, destaque, nota, titulo }.
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
    const cls = 'vc-card vc-card--regra' + (r.tabela ? ' vc-card--tabela' : '');
    return `
      <details class="${cls}" data-busca="${esc(busca)}">
        <summary class="vc-card-cab"><span class="vc-card-nome">${esc(r.titulo)}</span></summary>
        <div class="vc-card-corpo">${corpo}</div>
      </details>`;
  }

  function render() {
    const cont = document.getElementById('urbano-content');
    if (!cont) return;

    const regras = Array.isArray(window.REGRAS_URBANO) ? window.REGRAS_URBANO : [];
    if (!regras.length) {
      cont.innerHTML = `<div class="cr-erro"><strong>Os dados não carregaram.</strong><br>
        Verifique se <code>js/urbano-data.js</code> está incluído antes de <code>js/urbano.js</code>.</div>`;
      return;
    }

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
        <h1>🏙 Vida Urbana</h1>
        <p class="cr-sub">Aventuras em cidades: como criá-las, tipos de comunidade (aldeia, vila,
          cidade, metrópole), Lei &amp; Ordem, perseguições e elementos urbanos — clique para abrir.
          Os limites de economia das comunidades também estão no seletor da aba 🏪 Loja.</p>
      </div>

      <div class="cul-calc urb-rolador">
        <div class="cul-calc-cab">🏃 Eventos de perseguição — Tabela 6-5</div>
        <div class="cul-calc-controles">
          <button type="button" id="urbRolarEvento" class="urb-btn">🎲 Rolar 1d20</button>
          <span class="urb-dica">Uma rolagem por rodada da perseguição. Em zonas especialmente
            movimentadas, aumente a CD dos obstáculos em +5.</span>
        </div>
        <div id="urbEventoOut" class="cul-resultado urb-resultado" hidden></div>
      </div>

      <input class="cr-busca" type="text" placeholder="Buscar regra (aldeia, perseguição, multidão, telhado…)" autocomplete="off">
      ${blocos}`;

    // ── rolador de eventos de perseguição (Tabela 6-5) ──────────────
    const EFEITO_EVENTO = {
      'Nenhum':    'A rodada segue sem eventos — todos correm normalmente.',
      'Obstáculo': 'Todos os participantes fazem o teste. Quem falhar percorre METADE da distância nesta rodada (arredonde para baixo, para o incremento de 1,5m mais próximo).',
      'Atalho':    'Cada participante ESCOLHE se faz o teste. Quem passar avança o DOBRO da distância nesta rodada; quem falhar avança apenas metade.',
    };
    const btnRolar = cont.querySelector('#urbRolarEvento');
    const outRolar = cont.querySelector('#urbEventoOut');
    if (btnRolar && outRolar) {
      btnRolar.addEventListener('click', () => {
        const eventos = window.URBANO_EVENTOS_PERSEGUICAO || [];
        const d20 = 1 + Math.floor(Math.random() * 20);
        const ev  = eventos.find(e => d20 >= e.de && d20 <= e.ate);
        if (!ev) return;
        const icone = ev.evento === 'Nenhum' ? '🕊' : ev.evento === 'Obstáculo' ? '🚧' : '🪜';
        outRolar.hidden = false;
        outRolar.innerHTML = `
          <div class="urb-res-topo">
            <span class="urb-res-d20" title="Resultado do d20">🎲 ${d20}</span>
            <strong>${icone} ${esc(ev.evento)}</strong>
            ${ev.teste ? `<span class="urb-res-teste">— teste de ${esc(ev.teste)}</span>` : ''}
          </div>
          ${ev.exemplo ? `<div class="urb-res-exemplo">“${esc(ev.exemplo)}”</div>` : ''}
          <div class="urb-res-efeito">${esc(EFEITO_EVENTO[ev.evento] || '')}</div>`;
      });
    }

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
    if (!document.getElementById('urbano-content')) return;
    try { render(); }
    catch (err) {
      console.error('[urbano] falha ao renderizar:', err);
      const cont = document.getElementById('urbano-content');
      if (cont) cont.innerHTML = `<div class="cr-erro"><strong>Erro ao montar a aba:</strong><br>${esc(err && err.message || err)}</div>`;
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
