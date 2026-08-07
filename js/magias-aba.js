// ═══════════════════════════════════════════════════════════════════
//  MAGIAS-ABA.JS — Sub-aba "✨ Magias" (Consultas rápidas)
//  Compêndio das 254 magias: busca por nome/texto e filtros por
//  círculo, tipo (arcana/divina/universal) e escola. Cada card abre
//  com o texto integral do livro.
//
//  Dados:  window.GA_MAGIAS (js/magias-data.js)
//  Corpo:  Magias.htmlCorpo / Magias.textoPuro (js/magias.js) — as
//          mesmas funções que a Loja usa nos pergaminhos, para os dois
//          lugares mostrarem a magia igual.
//  Preço do pergaminho: Magias.precoPergaminho (só como referência).
//  Reutiliza as classes .vc-* / .cr-* / .cond-chip das Consultas.
// ═══════════════════════════════════════════════════════════════════
(function () {
  'use strict';

  const esc = window.GA_esc;
  const semAcento = window.GA_semAcento;

  const ESCOLAS = ['Abjuração', 'Adivinhação', 'Convocação', 'Encantamento',
                   'Evocação', 'Ilusão', 'Necromancia', 'Transmutação'];
  const TIPOS = ['Arcana', 'Divina', 'Universal'];

  // filtros ativos ('' = todos)
  const filtro = { circulo: '', tipo: '', escola: '' };

  function cardMagia(m) {
    const busca = semAcento([
      m.nome, m.tipo, m.escola, m.resumo || '',
      m.descricao.join(' '), m.truque || '',
      m.aprimoramentos.map(a => a.texto).join(' '),
    ].join(' '));

    const preco = (typeof Magias !== 'undefined')
      ? Magias.precoPergaminho(m.circulo).toLocaleString('pt-BR') : null;
    const corpo = (typeof Magias !== 'undefined' && Magias.htmlCorpo)
      ? Magias.htmlCorpo(m.nome) : '';
    const puro = (typeof Magias !== 'undefined' && Magias.textoPuro)
      ? Magias.textoPuro(m.nome) : '';

    return `
      <details class="vc-card mag-verbete mag-verbete--${m.tipo.toLowerCase()}"
               data-busca="${esc(busca)}" data-circulo="${m.circulo}"
               data-tipo="${esc(m.tipo)}" data-escola="${esc(m.escola)}">
        <summary class="vc-card-cab">
          <span class="vc-card-nome">${esc(m.nome)}</span>
          <span class="vc-card-meta">
            <span class="mag-selo mag-selo--${m.tipo.toLowerCase()}">${esc(m.tipo)}</span>
            ${esc(m.escola)} · ${m.circulo}º círculo · ${m.pm} PM
          </span>
        </summary>
        <div class="vc-card-corpo">
          ${m.resumo ? `<p class="mag-resumo">${esc(m.resumo)}</p>` : ''}
          ${corpo}
          <div class="mag-rodape">
            ${preco ? `<span class="mag-pergaminho" title="Preço do pergaminho desta magia na Loja">📜 Pergaminho: T$ ${preco}</span>` : ''}
            <button type="button" class="ga-desc-copiar" data-ga-copiar="${esc(puro).replace(/"/g, '&quot;')}"
                    title="Copiar o texto completo da magia">⧉ Copiar</button>
          </div>
        </div>
      </details>`;
  }

  function grupoChips(campo, itens, rotuloTodos) {
    const chips = [{ v: '', txt: rotuloTodos }]
      .concat(itens.map(i => ({ v: String(i.v != null ? i.v : i), txt: i.txt || String(i) })))
      .map(c => `<button type="button" class="cond-chip ${filtro[campo] === c.v ? 'cond-chip--on' : ''}"
                         data-mag-campo="${campo}" data-mag-valor="${esc(c.v)}">${esc(c.txt)}</button>`)
      .join('');
    return `<div class="cond-chips" role="group">${chips}</div>`;
  }

  function aplicarFiltro(cont) {
    const termo = semAcento(cont.querySelector('.cr-busca').value.trim());
    let achou = 0;
    cont.querySelectorAll('.mag-verbete').forEach(c => {
      const d = c.dataset;
      const bate = (!termo || d.busca.indexOf(termo) >= 0)
                && (!filtro.circulo || d.circulo === filtro.circulo)
                && (!filtro.tipo || d.tipo === filtro.tipo)
                && (!filtro.escola || d.escola === filtro.escola);
      c.style.display = bate ? '' : 'none';
      // abre sozinho só quando a busca por texto reduziu bastante a lista
      c.open = !!termo && bate;
      if (bate) achou++;
    });
    // esconde o grupo de um círculo que ficou sem nenhuma magia visível
    cont.querySelectorAll('.vc-grupo').forEach(g => {
      const algum = Array.from(g.querySelectorAll('.mag-verbete'))
        .some(c => c.style.display !== 'none');
      g.style.display = algum ? '' : 'none';
    });
    const aviso = cont.querySelector('.mag-contagem');
    if (aviso) {
      aviso.textContent = achou
        ? `${achou} magia${achou !== 1 ? 's' : ''}`
        : 'Nenhuma magia com esses filtros.';
      aviso.classList.toggle('mag-contagem--vazia', !achou);
    }
  }

  function render() {
    const cont = document.getElementById('magias-content');
    if (!cont) return;

    const lista = Array.isArray(window.GA_MAGIAS) ? window.GA_MAGIAS : [];
    if (!lista.length) {
      cont.innerHTML = `<div class="cr-erro"><strong>Os dados não carregaram.</strong><br>
        Verifique se <code>js/magias-data.js</code> está incluído antes de <code>js/magias-aba.js</code>.</div>`;
      return;
    }

    // agrupa por círculo, cada grupo em ordem alfabética
    const porCirculo = {};
    lista.forEach(m => { (porCirculo[m.circulo] = porCirculo[m.circulo] || []).push(m); });
    const blocos = [1, 2, 3, 4, 5].filter(c => porCirculo[c]).map(c => {
      const magias = porCirculo[c].slice().sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
      const pm = (typeof Magias !== 'undefined') ? Magias.PM_POR_CIRCULO[c] : '';
      return `
        <div class="vc-grupo" data-circulo="${c}">
          <h2 class="vc-grupo-titulo">${c}º Círculo${pm ? ` — ${pm} PM` : ''}</h2>
          <div class="vc-lista">${magias.map(cardMagia).join('')}</div>
        </div>`;
    }).join('');

    cont.innerHTML = `
      <div class="cr-cabecalho">
        <h1>✨ Magias</h1>
        <p class="cr-sub">As ${lista.length} magias do Tormenta20 — texto integral, com estatísticas,
          truque e aprimoramentos. Clique para abrir; passe o mouse nos termos citados para ver a
          definição.</p>
      </div>

      <input class="cr-busca" type="text" autocomplete="off"
             placeholder="Buscar magia (bola de fogo, dano de fogo, atordoado…)">

      <div class="mag-filtros">
        <div class="mag-filtro-linha">
          <span class="mag-filtro-rot">Círculo</span>
          ${grupoChips('circulo', [1, 2, 3, 4, 5].map(c => ({ v: c, txt: `${c}º` })), 'Todos')}
        </div>
        <div class="mag-filtro-linha">
          <span class="mag-filtro-rot">Tipo</span>
          ${grupoChips('tipo', TIPOS, 'Todas')}
        </div>
        <div class="mag-filtro-linha">
          <span class="mag-filtro-rot">Escola</span>
          ${grupoChips('escola', ESCOLAS, 'Todas')}
        </div>
      </div>

      <p class="mag-contagem">${lista.length} magias</p>

      ${blocos}`;

    cont.querySelector('.cr-busca').addEventListener('input', () => aplicarFiltro(cont));
    cont.querySelector('.mag-filtros').addEventListener('click', e => {
      const btn = e.target.closest('[data-mag-campo]');
      if (!btn) return;
      const campo = btn.dataset.magCampo;
      // clicar no chip já ativo volta para "todos"
      filtro[campo] = (filtro[campo] === btn.dataset.magValor) ? '' : btn.dataset.magValor;
      btn.parentElement.querySelectorAll('.cond-chip').forEach(ch =>
        ch.classList.toggle('cond-chip--on', ch.dataset.magValor === filtro[campo]));
      aplicarFiltro(cont);
    });
  }

  // O compêndio inteiro são ~6.200 nós de DOM. Montar isso no load de
  // toda página dobraria o peso do documento por uma aba que começa
  // escondida — então só montamos quando a sub-aba é aberta.
  let montado = false;

  function montar() {
    if (montado) return;
    montado = true;
    try { render(); }
    catch (err) {
      console.error('[magias-aba] falha ao renderizar:', err);
      const cont = document.getElementById('magias-content');
      if (cont) cont.innerHTML = `<div class="cr-erro"><strong>Erro ao montar a aba:</strong><br>${esc(err && err.message || err)}</div>`;
    }
  }

  function init() {
    const cont = document.getElementById('magias-content');
    if (!cont) return;
    const botao = document.querySelector('[data-cr-tab="magias"]');
    if (botao) botao.addEventListener('click', montar);
    if (!cont.hidden) montar();          // painel já visível: monta agora
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
