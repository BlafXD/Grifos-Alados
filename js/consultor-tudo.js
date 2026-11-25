// ═══════════════════════════════════════════════════════════════════
//  CONSULTOR-TUDO.JS — Sub-aba "🔎 Consultor de tudo" (aba 📚 Consultas)
//
//  É a antiga "Busca de regras" do Caderno da campanha, agora solta: sem
//  mesa, sem campanha, sem "fixar". Usa só o índice do GA_BuscaRegras, que
//  varre os catálogos já carregados (poderes, magias, condições, ações,
//  regras, itens, criaturas, perigos e deuses). Busca sem acento.
//
//  Monta sob demanda — só quando a sub-aba é aberta pela primeira vez —
//  porque montar o índice toca em muitos catálogos; assim nada é feito à
//  toa no carregamento da página.
// ═══════════════════════════════════════════════════════════════════
(function () {
  'use strict';
  const esc = window.GA_esc;
  let montado = false;

  function painel() { return document.getElementById('consultor-content'); }
  const linhas = s => `<div class="ga-texto">${esc(s)}</div>`;

  function resultados(q, tipo) {
    const B = window.GA_BuscaRegras;
    if (!B) return '<div class="cr-erro"><strong>A busca não carregou.</strong></div>';
    if (!q.trim()) return '<p class="cr-sub">Digite para buscar em regras, poderes, magias, condições, itens, criaturas, perigos e deuses.</p>';
    const r = B.buscar(q, tipo);
    if (!r.length) return '<p class="cr-sub">Nada encontrado para essa busca.</p>';
    const topo = r.slice(0, 80);
    return `<p class="cr-sub">${r.length} resultado${r.length === 1 ? '' : 's'}${r.length > 80 ? ' — mostrando os 80 primeiros; refine a busca para ver o resto' : ''}.</p>` +
      topo.map(x => `
        <details class="vc-card">
          <summary class="vc-card-cab">
            <span class="vc-card-nome">${esc(x.nome)}</span>
            <span class="vc-card-meta">${esc(x.tipo)}</span>
          </summary>
          <div class="vc-card-corpo">
            <p class="cr-sub">${esc(x.fonte)}</p>
            ${linhas(x.conteudo)}
          </div>
        </details>`).join('');
  }

  function montar() {
    const cont = painel();
    if (!cont || montado) return;
    const B = window.GA_BuscaRegras;
    const tipos = B ? [...new Set(B.indice().map(r => r.tipo))].sort((a, b) => a.localeCompare(b, 'pt-BR')) : [];
    cont.innerHTML = `
      <div class="cr-cabecalho">
        <h1>🔎 Consultor de tudo</h1>
        <p class="cr-sub">Uma busca só, em tudo o que o site conhece — regras, poderes, magias, condições, itens, criaturas, perigos e deuses. Não precisa de acento.</p>
      </div>
      <input class="cr-busca" id="consultor-q" type="text" autocomplete="off"
             placeholder="Buscar em tudo (ex.: agarrar, bola de fogo, caído, aço de thasun, lobo…)">
      <label class="cr-filtro">Categoria
        <select id="consultor-tipo"><option value="">Todas</option>${tipos.map(t => `<option value="${esc(t)}">${esc(t)}</option>`).join('')}</select>
      </label>
      <div id="consultor-res" class="vc-lista"></div>`;

    const q = cont.querySelector('#consultor-q');
    const tipo = cont.querySelector('#consultor-tipo');
    const res = cont.querySelector('#consultor-res');
    let t;
    const correr = () => { res.innerHTML = resultados(q.value, tipo.value); };
    q.addEventListener('input', () => { clearTimeout(t); t = setTimeout(correr, 200); });
    tipo.addEventListener('change', correr);
    correr();
    montado = true;
  }

  function init() {
    const sec = document.getElementById('perigos');
    if (!sec) return;
    // monta na primeira vez que a sub-aba "Consultor de tudo" é aberta
    sec.addEventListener('click', e => {
      if (e.target.closest('[data-cr-tab="consultor"]')) montar();
    });
    // caso o painel já comece visível (navegação direta), monta de uma vez
    const p = painel();
    if (p && !p.hidden) montar();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
