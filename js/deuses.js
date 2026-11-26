// ═══════════════════════════════════════════════════════════════════
//  DEUSES.JS — Sub-aba "⛩ Deuses de Arton" (aba 📚 Consultas)
//  Localização: /grifos-alados/js/deuses.js
//
//  Dois lados, escolhidos por um alternador no topo:
//   • Maiores — os vinte do Panteão (window.DEUSES_ARTON_ARTIGOS): quadro
//     de dados, abertura e seções do livro (motivações, igreja, avatar…).
//   • Menores — os 63 verbetes do Guia de Deuses Menores + Deuses de Arton
//     (window.GA_DEUSES_MENORES): crenças, símbolo, arma, devotos,
//     obrigações, o poder concedido e a lore. Catálogo puro dos livros,
//     sem nada de campanha (veio do antigo Caderno).
//
//  Existe nas DUAS edições: é lore, não é ficha. As FICHAS dos avatares
//  moram na aba 📕 Fichas Prontas, que só o mestre tem — quando ela está
//  carregada, cada verbete maior ganha um rodapé apontando para lá.
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

  // ── um verbete MAIOR ─────────────────────────────────────────────
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

  // ── um verbete MENOR ─────────────────────────────────────────────
  function cardMenor(g) {
    const busca = semAcento([g.nome, g.natureza, g.crencas, g.devotos,
      g.poderNome, g.arma, g.simbolo, g.lore].join(' '));
    const campos = [
      ['Crenças e objetivos', g.crencas],
      ['Símbolo sagrado', g.simbolo],
      ['Energia', g.energia],
      ['Arma preferida', g.arma],
      ['Devotos', g.devotos],
      ['Obrigações e restrições', g.obrigacoes],
    ].filter(([, v]) => v).map(([t, v]) =>
      `<section class="dv-secao"><h3 class="dv-secao-titulo">${esc(t)}</h3><p>${nl2br(String(v))}</p></section>`).join('');
    return `
      <details class="vc-card dv-card" data-busca="${esc(busca)}" data-dv="${esc(g.id)}">
        <summary class="vc-card-cab">
          <span class="vc-card-nome">${esc(g.nome)}</span>
          <span class="vc-card-meta">${esc(g.natureza || '')} · status ${esc(g.status)}</span>
        </summary>
        <div class="vc-card-corpo">
          <p class="cr-sub">${esc(g.livro)}, p. ${esc(g.pagina)}</p>
          ${campos}
          ${g.poderNome ? `<section class="dv-secao"><h3 class="dv-secao-titulo">${esc(g.poderNome)}</h3><p>${nl2br(String(g.poderTexto || ''))}</p></section>` : ''}
          ${g.lore ? `<details class="dv-lore"><summary>História e informações sobre a divindade</summary>${paragrafos(g.lore)}</details>` : ''}
        </div>
      </details>`;
  }

  // ── a busca viva, compartilhada pelos dois lados ─────────────────
  //  (mostra/esconde os [data-busca] e, nos Maiores, os atalhos)
  function ligarBusca(corpo) {
    const busca = corpo.querySelector('.cr-busca');
    if (!busca) return;
    busca.addEventListener('input', () => {
      const termo = semAcento(busca.value.trim());
      corpo.querySelectorAll('[data-busca]').forEach(el => {
        const bate = !termo || el.dataset.busca.indexOf(termo) >= 0;
        el.style.display = bate ? '' : 'none';
        if (el.tagName === 'DETAILS') el.open = !!termo && bate;
      });
      corpo.querySelectorAll('.dv-atalho').forEach(b => {
        const alvo = corpo.querySelector(`[data-dv="${b.dataset.dvIr}"]`);
        b.hidden = !!(alvo && alvo.style.display === 'none');
      });
    });
    corpo.addEventListener('click', e => {
      const ir = e.target.closest('[data-dv-ir]');
      if (!ir) return;
      const alvo = corpo.querySelector(`[data-dv="${ir.dataset.dvIr}"]`);
      if (!alvo) return;
      alvo.open = true;
      alvo.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  function montarMaiores(corpo) {
    const dados = window.DEUSES_ARTON_ARTIGOS;
    const deuses = (dados && Array.isArray(dados.deuses)) ? dados.deuses : [];
    if (!deuses.length) {
      corpo.innerHTML = `<div class="cr-erro"><strong>Os dados não carregaram.</strong><br>
        Verifique se <code>js/deuses-artigos-data.js</code> está incluído antes de
        <code>js/deuses.js</code>.</div>`;
      return;
    }
    const atalhos = deuses.map(d =>
      `<button type="button" class="dv-atalho" data-dv-ir="${esc(d.chave)}">${esc(d.nome)}</button>`).join('');
    corpo.innerHTML = `
      <div class="cr-cabecalho">
        <h1>⛩ Deuses Maiores</h1>
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
    ligarBusca(corpo);
  }

  function montarMenores(corpo) {
    const lista = window.GA_DEUSES_MENORES;
    if (!Array.isArray(lista) || !lista.length) {
      corpo.innerHTML = `<div class="cr-erro"><strong>Os dados não carregaram.</strong><br>
        Verifique se <code>js/deuses-menores-data.js</code> está incluído.</div>`;
      return;
    }
    corpo.innerHTML = `
      <div class="cr-cabecalho">
        <h1>✨ Deuses Menores</h1>
        <p class="cr-sub">${lista.length} divindades menores: os verbetes do Guia de Deuses Menores e
        os três de Deuses de Arton. Cada uma concede um poder; devotos de classes divinas recebem PM
        adicionais iguais a 1 + status divino, limitados pelo nível, em lugar do segundo poder
        (Deuses de Arton, p. 231).</p>
      </div>
      <input class="cr-busca" type="text" autocomplete="off"
             placeholder="Buscar nome, natureza, conceito, devoto ou poder concedido…">
      <div class="vc-grupo">
        <div class="vc-lista dv-lista">${lista.map(cardMenor).join('')}</div>
      </div>`;
    ligarBusca(corpo);
  }

  function render() {
    const cont = document.getElementById('deuses-content');
    if (!cont) return;
    cont.innerHTML = `
      <nav class="dv-modo" aria-label="Deuses maiores ou menores">
        <button type="button" class="cr-subtab cr-subtab--ativa" data-dv-modo="maiores">⛩ Maiores</button>
        <button type="button" class="cr-subtab" data-dv-modo="menores">✨ Menores</button>
      </nav>
      <div id="dv-corpo"></div>`;
    const barra = cont.querySelector('.dv-modo');
    barra.addEventListener('click', e => {
      const b = e.target.closest('[data-dv-modo]');
      if (!b) return;
      barra.querySelectorAll('[data-dv-modo]').forEach(x => x.classList.toggle('cr-subtab--ativa', x === b));
      mostrar(b.dataset.dvModo);
    });
    mostrar('maiores');
  }

  function mostrar(modo) {
    const corpo = document.getElementById('dv-corpo');
    if (!corpo) return;
    try {
      if (modo === 'menores') montarMenores(corpo);
      else montarMaiores(corpo);
    } catch (err) {
      console.error('[deuses] falha ao renderizar', modo, err);
      corpo.innerHTML = `<div class="cr-erro"><strong>Erro ao montar:</strong><br>${esc(err && err.message || err)}</div>`;
    }
  }

  function init() {
    if (!document.getElementById('deuses-content')) return;
    try { render(); }
    catch (err) {
      console.error('[deuses] falha ao renderizar:', err);
      const cont = document.getElementById('deuses-content');
      if (cont) cont.innerHTML = `<div class="cr-erro"><strong>Erro ao montar a aba:</strong><br>${esc(err && err.message || err)}</div>`;
    }
    //  As fichas dos avatares vêm no pacote do bestiário, que chega depois da
    //  página (GA_Pacotes): quando ele chega, os cards dos Maiores ganham o
    //  atalho para a ficha do avatar.
    document.addEventListener('ga-pacote', e => {
      if (!(e.detail && e.detail.nome === 'bestiario')) return;
      const ativo = document.querySelector('#deuses-content [data-dv-modo].cr-subtab--ativa');
      if (!ativo || ativo.dataset.dvModo === 'maiores') mostrar('maiores');
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
