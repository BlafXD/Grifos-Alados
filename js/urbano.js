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

  // ── PERSEGUIÇÃO — distância por rodada (p. 270–271) ───────────────
  // "Cada participante faz um teste de Atletismo por rodada [...] soma a
  // distância que cada participante percorreu com o número diretamente
  // acima na sua coluna". O modificador aqui é o TOTAL já pronto (Atletismo
  // do personagem com o ajuste de deslocamento do livro já somado — ver o
  // exemplo de Sotnas/Vallefar, p. 271), em quadrados de 1,5m. Calculadora
  // de mesa: não é salva, como a de Culinária.
  const perseg = { rodada: 0, participantes: [
    { nome: 'Perseguidor', papel: 'perseguidor', mod: 0, distancia: 0 },
    { nome: 'Fugitivo',    papel: 'fugitivo',    mod: 0, distancia: 6 },
  ] };

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

      <div class="cul-calc urb-rolador" id="urbPerseg">
        <div class="cul-calc-cab">🏃 Perseguição — distância por rodada (p. 270–271)</div>
        <p class="urb-dica">O modificador de cada participante é o total já pronto para a corrida
          (Atletismo + o ajuste de +/−2 por 1,5m de deslocamento acima/abaixo de 9m, já somado).
          "Rodar rodada" soma 1d20 + modificador aos quadrados de cada um.</p>
        <div id="urbPergLinhas"></div>
        <button type="button" id="urbPergAdd" class="urb-btn urb-btn--sec">＋ participante</button>
        <div class="urb-perg-acoes">
          <button type="button" id="urbPergRodar" class="urb-btn">🎲 Rodar rodada</button>
          <button type="button" id="urbPergReset" class="urb-btn urb-btn--sec">↺ Reiniciar</button>
          <span class="urb-dica">Rodada atual: <strong id="urbPergRodada">0</strong>. Um personagem corre
            por 1 + Constituição rodadas antes de precisar de Fortitude (CD 15 +1 por teste anterior) para não ficar fatigado.</span>
        </div>
        <div id="urbPergResultado"></div>
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

    // ── rastreador de distância da perseguição ───────────────────────
    function pergAtualizar() {
      const linhas = cont.querySelector('#urbPergLinhas');
      const rodadaEl = cont.querySelector('#urbPergRodada');
      const out = cont.querySelector('#urbPergResultado');
      if (!linhas) return;
      rodadaEl.textContent = String(perseg.rodada);

      linhas.innerHTML = perseg.participantes.map((p, i) => `
        <div class="urb-perg-linha" data-i="${i}">
          <input type="text" class="urb-perg-nome" data-campo="nome" data-i="${i}" value="${esc(p.nome)}" aria-label="Nome do participante">
          <select class="urb-perg-papel" data-campo="papel" data-i="${i}" aria-label="Papel na perseguição">
            <option value="perseguidor" ${p.papel === 'perseguidor' ? 'selected' : ''}>perseguidor</option>
            <option value="fugitivo" ${p.papel === 'fugitivo' ? 'selected' : ''}>fugitivo</option>
          </select>
          <label class="urb-perg-campo">mod. <input type="number" class="urb-perg-mod" data-campo="mod" data-i="${i}" value="${p.mod}"></label>
          <label class="urb-perg-campo">quadrados <input type="number" class="urb-perg-dist" data-campo="distancia" data-i="${i}" value="${p.distancia}"></label>
          ${perseg.participantes.length > 1 ? `<button type="button" class="urb-perg-rm" data-i="${i}" title="Remover" aria-label="Remover participante">✕</button>` : ''}
        </div>`).join('');

      const perseguidores = perseg.participantes.filter(p => p.papel === 'perseguidor');
      const fugitivos = perseg.participantes.filter(p => p.papel === 'fugitivo');
      let alcance = '';
      perseguidores.forEach(pr => fugitivos.forEach(fu => {
        if (pr.distancia > fu.distancia) alcance += `<p class="urb-perg-alcance">🎯 ${esc(pr.nome)} alcançou ${esc(fu.nome)} — a perseguição termina aqui (ele se rende ou vira combate).</p>`;
      }));
      out.innerHTML = alcance;
    }
    const pergLinhas = cont.querySelector('#urbPergLinhas');
    if (pergLinhas) {
      pergLinhas.addEventListener('input', e => {
        const i = +e.target.dataset.i;
        const campo = e.target.dataset.campo;
        if (Number.isNaN(i) || !perseg.participantes[i] || !campo) return;
        if (campo === 'mod' || campo === 'distancia') perseg.participantes[i][campo] = +e.target.value || 0;
        else perseg.participantes[i][campo] = e.target.value;
      });
      pergLinhas.addEventListener('change', e => {
        const i = +e.target.dataset.i;
        if (!Number.isNaN(i) && e.target.dataset.campo === 'papel') perseg.participantes[i].papel = e.target.value;
      });
      pergLinhas.addEventListener('click', e => {
        const btn = e.target.closest('.urb-perg-rm');
        if (!btn) return;
        perseg.participantes.splice(+btn.dataset.i, 1);
        pergAtualizar();
      });
    }
    const btnAdd = cont.querySelector('#urbPergAdd');
    if (btnAdd) btnAdd.addEventListener('click', () => {
      perseg.participantes.push({ nome: 'Novo', papel: 'perseguidor', mod: 0, distancia: 0 });
      pergAtualizar();
    });
    const btnRodar = cont.querySelector('#urbPergRodar');
    if (btnRodar) btnRodar.addEventListener('click', () => {
      perseg.rodada++;
      const rolagens = perseg.participantes.map(p => {
        const d20 = 1 + Math.floor(Math.random() * 20);
        const avanco = Math.max(0, d20 + p.mod);
        p.distancia += avanco;
        return `${esc(p.nome)}: 🎲${d20} + ${p.mod} = ${avanco} quadrados (total ${p.distancia})`;
      });
      pergAtualizar();
      const out = cont.querySelector('#urbPergResultado');
      out.innerHTML = `<p class="urb-perg-rolagens">${rolagens.join('<br>')}</p>` + out.innerHTML;
    });
    const btnReset = cont.querySelector('#urbPergReset');
    if (btnReset) btnReset.addEventListener('click', () => {
      perseg.rodada = 0;
      perseg.participantes.forEach(p => { p.distancia = 0; });
      pergAtualizar();
    });
    pergAtualizar();

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
