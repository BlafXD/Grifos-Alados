// ═══════════════════════════════════════════════════════════════════
//  PERIGOS.JS — Aba "Perigos & Ambientes" (consulta rápida)
//  Lê window.PERIGOS_REFERENCIA (perigos simples, clima, terrenos,
//  armadilhas, doenças, maldições, Tormenta, ermos) e também
//  window.PERIGOS_COMPLEXOS (reaproveitados como uma categoria).
//
//  Tudo é só leitura: cards recolhíveis (<details>), filtro por
//  categoria e busca que varre nome + texto.
// ═══════════════════════════════════════════════════════════════════

(function () {
  'use strict';

  const REF = window.PERIGOS_REFERENCIA || { categorias: [], entradas: [] };
  const COMPLEXOS = Array.isArray(window.PERIGOS_COMPLEXOS) ? window.PERIGOS_COMPLEXOS : [];

  const esc = window.GA_esc;
  const nl2br = window.GA_nl2br;
  // semAcento: remove acentos para busca (NFD + descarte de combining marks).
  const semAcento = window.GA_semAcento;
  // Como nl2br, mas marca termos de regra (condições etc.) com tooltip.
  const marcarBr = t => (window.ItensDescricoes
    ? window.ItensDescricoes.marcar(t || '').replace(/\n/g, '<br>')
    : nl2br(t || ''));

  // Lista de categorias, com os perigos complexos no fim (se houver).
  function categorias() {
    const cats = (REF.categorias || []).slice();
    if (COMPLEXOS.length) cats.push({ chave: 'complexos', nome: 'Perigos Complexos', icone: '⚠' });
    return cats;
  }

  // Corpo formatado de um perigo complexo (Objetivo/Efeito/Ações/Descrição).
  function corpoComplexo(d) {
    let h = '';
    if (d.descricao) h += `<p class="pa-lore">${nl2br(d.descricao)}</p>`;
    if (d.objetivo)  h += `<div class="pa-bloco"><span class="pa-bloco-rot">Objetivo</span><div>${marcarBr(d.objetivo)}</div></div>`;
    if (d.efeito)    h += `<div class="pa-bloco"><span class="pa-bloco-rot">Efeito</span><div>${marcarBr(d.efeito)}</div></div>`;
    if (d.acoes)     h += `<div class="pa-bloco"><span class="pa-bloco-rot">Ações dos personagens</span><div>${marcarBr(d.acoes)}</div></div>`;
    return h;
  }

  // Itens de uma categoria, no formato comum de renderização.
  function itensDaCategoria(chave) {
    if (chave === 'complexos') {
      return COMPLEXOS.map(d => ({
        nome: d.nome, nd: d.nd, fonte: d.fonte,
        corpo: corpoComplexo(d),
        busca: semAcento(`${d.nome} ${d.objetivo || ''} ${d.efeito || ''} ${d.acoes || ''}`),
      }));
    }
    return (REF.entradas || []).filter(e => e.cat === chave).map(e => ({
      nome: e.nome, nd: e.nd, fonte: e.fonte,
      corpo: marcarBr(e.texto || ''),
      busca: semAcento(`${e.nome} ${e.texto || ''}`),
    }));
  }

  function cardItem(it) {
    const nd = it.nd ? `<span class="pa-nd">ND ${esc(it.nd)}</span>` : '';
    const fonte = it.fonte ? `<span class="pa-fonte">${esc(it.fonte)}</span>` : '';
    return `
      <details class="pa-item" data-busca="${esc(it.busca)}">
        <summary class="pa-item-cab">
          <span class="pa-item-seta">▸</span>
          <span class="pa-item-nome">${esc(it.nome)}</span>
          ${nd}${fonte}
        </summary>
        <div class="pa-item-corpo">${it.corpo}</div>
      </details>`;
  }

  function render() {
    const cont = document.getElementById('perigos-content');
    if (!cont) return;

    // Diagnóstico: se os dados não carregaram, avisa na própria tela.
    if (!window.PERIGOS_REFERENCIA && !COMPLEXOS.length) {
      cont.innerHTML = `<div class="pa-erro"><strong>Os dados não carregaram.</strong><br>
        Verifique se <code>js/perigos-data.js</code> está sendo incluído no index.html
        ANTES de <code>js/perigos.js</code>.</div>`;
      return;
    }

    const cats = categorias();

    let botoes = `<button class="pa-cat-btn pa-cat-btn--ativo" data-filtro-cat="">✦ Todos</button>`;
    cats.forEach(c => {
      botoes += `<button class="pa-cat-btn" data-filtro-cat="${c.chave}">${c.icone || ''} ${esc(c.nome)}</button>`;
    });

    let secoes = '';
    cats.forEach(c => {
      const itens = itensDaCategoria(c.chave);
      if (!itens.length) return;
      secoes += `
        <div class="pa-cat" data-cat="${c.chave}">
          <h2 class="pa-cat-titulo">
            <span class="pa-cat-icone">${c.icone || ''}</span>
            ${esc(c.nome)}
            <span class="pa-cat-contador">${itens.length}</span>
          </h2>
          <div class="pa-cat-itens">
            ${itens.map(cardItem).join('')}
          </div>
        </div>`;
    });

    cont.innerHTML = `
      <div class="pa-cabecalho">
        <h1>Perigos &amp; Ambientes</h1>
        <p class="pa-subtitulo">Consulta rápida — perigos, clima, terrenos, armadilhas, doenças, maldições, Tormenta e ermos</p>
      </div>
      <div class="pa-barra">
        <input class="pa-busca" type="text" autocomplete="off"
               placeholder="🔍 Buscar (ex.: fosso, montanha, varíola, tempestade…)">
        <div class="pa-cats">${botoes}</div>
      </div>
      <div class="pa-resultados">${secoes}</div>
      <p class="pa-vazio" hidden>Nada encontrado para a busca.</p>`;
  }

  // ── FILTRO (categoria + busca) ───────────────────────────────────
  let _catAtiva = '';

  function aplicarFiltro() {
    const cont = document.getElementById('perigos-content');
    if (!cont) return;
    const busca = cont.querySelector('.pa-busca');
    const termo = busca ? semAcento(busca.value.trim()) : '';

    let totalVisivel = 0;
    cont.querySelectorAll('.pa-cat').forEach(sec => {
      const naCategoria = (_catAtiva === '' || sec.dataset.cat === _catAtiva);
      let visiveisNaSec = 0;
      sec.querySelectorAll('.pa-item').forEach(item => {
        const casaBusca = (termo === '' || item.dataset.busca.indexOf(termo) >= 0);
        const mostra = naCategoria && casaBusca;
        item.hidden = !mostra;
        if (mostra) {
          visiveisNaSec++;
          item.open = (termo !== '');   // abre os achados; recolhe quando a busca esvazia
        }
      });
      sec.hidden = (visiveisNaSec === 0);
      totalVisivel += visiveisNaSec;
    });

    const vazio = cont.querySelector('.pa-vazio');
    if (vazio) vazio.hidden = (totalVisivel > 0);
  }

  function aoClicar(e) {
    const btn = e.target.closest('[data-filtro-cat]');
    if (!btn) return;
    _catAtiva = btn.dataset.filtroCat;
    const cont = document.getElementById('perigos-content');
    cont.querySelectorAll('.pa-cat-btn').forEach(b => b.classList.remove('pa-cat-btn--ativo'));
    btn.classList.add('pa-cat-btn--ativo');
    aplicarFiltro();
  }

  function aoDigitar(e) {
    if (!e.target.classList || !e.target.classList.contains('pa-busca')) return;
    aplicarFiltro();
  }

  // ── INICIALIZAÇÃO ────────────────────────────────────────────────
  function init() {
    const secao = document.getElementById('perigos');
    if (!secao) return;
    try {
      render();
    } catch (err) {
      // Em vez de ficar em branco, mostra o erro na tela (e no console).
      console.error('[perigos] falha ao renderizar:', err);
      const cont = document.getElementById('perigos-content');
      if (cont) {
        cont.innerHTML = `<div class="pa-erro"><strong>Erro ao montar a aba:</strong><br>
          ${esc(err && err.message ? err.message : String(err))}</div>`;
      }
    }
    secao.addEventListener('click', aoClicar);
    secao.addEventListener('input', aoDigitar);
  }

  // Roda já se o DOM estiver pronto; senão, espera o DOMContentLoaded.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
