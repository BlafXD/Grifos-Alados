// ═══════════════════════════════════════════════════════════════════
//  DEVOTOS.JS — Sub-aba "🙏 Poderes Concedidos" (consulta rápida)
//  Lê window.GA_DEVOTOS (js/devotos-data.js): os 20 deuses do Panteão
//  e todos os poderes concedidos, agrupados por deus, com busca global
//  e navegação por divindade. Cada deus abre com um card do culto
//  (crenças, obrigações & restrições, símbolo, energia, arma, devotos)
//  seguido dos cards de poder (⭐ = lista básica, ✨ = habilidade mágica).
// ═══════════════════════════════════════════════════════════════════
(function () {
  'use strict';

  const esc = window.GA_esc;
  const nl2br = window.GA_nl2br;
  const semAcento = window.GA_semAcento;

  // cor de destaque por energia canalizada — só um reforço visual
  const COR_ENERGIA = { 'Positiva': '#9a6a1a', 'Negativa': '#4a3a5a', 'Qualquer': '#6e6256' };

  // texto → HTML com tooltips de termos de regra (condições etc.)
  function marcar(txt) {
    const base = window.ItensDescricoes ? window.ItensDescricoes.marcar(txt || '') : esc(txt || '');
    return base.replace(/\n/g, '<br>');
  }

  function cardRegra(titulo, texto, aberto) {
    return `
      <details class="vc-card vc-card--regra" data-busca="${esc(semAcento(titulo + ' ' + texto))}"${aberto ? ' open' : ''}>
        <summary class="vc-card-cab"><span class="vc-card-nome">📖 ${esc(titulo)}</span></summary>
        <div class="vc-card-corpo"><div class="vc-regras">${nl2br(texto)}</div></div>
      </details>`;
  }

  // Card de apresentação do culto de um deus
  function cardCulto(d, basicosNomes) {
    const busca = semAcento([d.nome, d.titulo, 'culto', 'obrigações', 'crenças', d.devotos, d.arma, d.simbolo, d.obrigacoes, d.crencas].join(' '));
    return `
      <details class="vc-card dev-culto" data-busca="${esc(busca)}" style="--cor:${COR_ENERGIA[d.energia] || '#6e6256'}">
        <summary class="vc-card-cab">
          <span class="vc-card-nome">${d.icone} O culto de ${esc(d.nome)}</span>
          <span class="vc-card-meta">Crenças · Obrigações &amp; Restrições</span>
        </summary>
        <div class="vc-card-corpo">
          <p class="dev-lore">${esc(d.lore)}</p>
          <p><strong>Crenças &amp; Objetivos.</strong> ${esc(d.crencas)}</p>
          <div class="dev-obrig">
            <strong>Obrigações &amp; Restrições.</strong> ${marcar(d.obrigacoes)}
            <p class="dev-obrig-pena">Violar as O&amp;R: o devoto perde todos os PM e só os recupera a partir do próximo dia; nova violação na mesma aventura exige penitência (perícia Religião).</p>
          </div>
          <p class="dev-meta"><strong>Símbolo sagrado.</strong> ${esc(d.simbolo)}. · <strong>Canalizar energia.</strong> ${esc(d.energia)}. · <strong>Arma preferida.</strong> ${esc(d.arma)}.</p>
          <p class="dev-meta"><strong>Devotos.</strong> ${esc(d.devotos)}</p>
          <p class="dev-meta"><strong>Poderes concedidos.</strong> ${esc(basicosNomes.join(', '))}.</p>
        </div>
      </details>`;
  }

  // Card de um poder concedido (dentro do grupo de um deus)
  function cardPoder(p, d, G) {
    const outros = p.deuses.filter(ch => ch !== d.chave)
      .map(ch => (G.deusPorChave[ch] || {}).nome || ch);
    const badges =
      p.magica ? '<span class="dev-badge dev-badge--magica" title="Conta como habilidade mágica (é anulada por áreas antimagia etc.)">✨ habilidade mágica</span>' : '';
    const busca = semAcento([p.nome, d.nome, p.texto, p.magica ? 'habilidade mágica' : ''].join(' '));
    return `
      <details class="vc-card dev-poder" data-busca="${esc(busca)}">
        <summary class="vc-card-cab">
          <span class="vc-card-nome">${esc(p.nome)}</span>
          <span class="vc-card-meta">${badges}</span>
        </summary>
        <div class="vc-card-corpo">
          <div class="vc-regras">${marcar(p.texto)}</div>
          ${outros.length ? `<p class="dev-meta">Também concedido por: ${esc(outros.join(', '))}.</p>` : ''}
        </div>
      </details>`;
  }

  function render() {
    const cont = document.getElementById('devotos-content');
    if (!cont) return;

    const G = window.GA_DEVOTOS;
    if (!G || !Array.isArray(G.deuses) || !G.deuses.length) {
      cont.innerHTML = `<div class="cr-erro"><strong>Os dados não carregaram.</strong><br>
        Verifique se <code>js/devotos-data.js</code> está incluído antes de <code>js/devotos.js</code>.</div>`;
      return;
    }

    // navegação por deus (rolagem até o grupo)
    let nav = '';
    G.deuses.forEach(d => {
      nav += `<button type="button" class="dev-ir" data-dev-ir="dev-${d.chave}" title="${esc(d.titulo)}">${d.icone} ${esc(d.nome)}</button>`;
    });

    // grupos por deus: card do culto + poderes (básicos primeiro)
    let grupos = '';
    G.deuses.forEach(d => {
      const poderes = G.poderesDoDeus(d.chave);
      const basicosNomes = d.basicos.map(ch => (G.poderPorChave[ch] || {}).nome).filter(Boolean);
      const cards = poderes.map(p => cardPoder(p, d, G)).join('');
      grupos += `
        <div class="vc-grupo dev-grupo" id="dev-${d.chave}">
          <h2 class="vc-grupo-titulo">${d.icone} ${esc(d.nome)} — ${esc(d.titulo)}</h2>
          <div class="vc-lista">${cardCulto(d, basicosNomes)}${cards}</div>
        </div>`;
    });

    const r = G.regras || {};
    const regrasTxt = [r.intro, '', 'ESCOLHENDO SEU DEUS', r.escolhendo, '', 'VIOLANDO AS OBRIGAÇÕES & RESTRIÇÕES', r.violacao, '', 'PODERES CONCEDIDOS', r.poderes].filter(x => x != null).join('\n');

    cont.innerHTML = `
      <div class="cr-cabecalho">
        <h1>🙏 Poderes Concedidos</h1>
        <p class="cr-sub">Os 20 deuses do Panteão de Arton com suas Crenças, Obrigações &amp; Restrições e todos os poderes concedidos
        (✨ = habilidade mágica). Para usar numa ficha: na aba ⚔ Combates, abra a ferramenta
        <strong>🙏 Devoto &amp; poder concedido</strong> da criatura — ou, ao inserir NPCs do Guia, use "⚙ Regras especiais" no modal
        <strong>👤 Guia de NPCs</strong> (as fichas d'O Templo são devotas por regra).</p>
      </div>
      <input class="cr-busca" type="text" placeholder="Buscar poder ou deus (kiai, aura de medo, Khalmyr, habilidade mágica…)" autocomplete="off">
      <div class="dev-nav">${nav}</div>
      <div class="vc-grupo">
        <h2 class="vc-grupo-titulo">📖 Como funciona</h2>
        <div class="vc-lista">
          ${cardRegra('Devotos, deuses e poderes concedidos', regrasTxt, false)}
          ${cardRegra('NPCs d\'O Templo (Guia de NPCs)', r.templo || '', false)}
        </div>
      </div>
      ${grupos}`;

    // navegação: rola até o grupo do deus
    cont.addEventListener('click', e => {
      const btn = e.target.closest('[data-dev-ir]');
      if (!btn) return;
      const alvo = document.getElementById(btn.dataset.devIr);
      if (alvo) alvo.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    // busca global (mesmo comportamento das outras sub-abas)
    const busca = cont.querySelector('.cr-busca');
    busca.addEventListener('input', () => {
      const termo = semAcento(busca.value.trim());
      cont.querySelectorAll('[data-busca]').forEach(el => {
        const bate = !termo || el.dataset.busca.indexOf(termo) >= 0;
        el.style.display = bate ? '' : 'none';
        if (el.tagName === 'DETAILS') el.open = !!termo && bate;
      });
      cont.querySelectorAll('.vc-grupo').forEach(gr => {
        const algum = Array.from(gr.querySelectorAll('[data-busca]')).some(c => c.style.display !== 'none');
        gr.style.display = algum ? '' : 'none';
      });
      // a régua de navegação some junto quando a busca está ativa
      const navEl = cont.querySelector('.dev-nav');
      if (navEl) navEl.style.display = termo ? 'none' : '';
    });
  }

  function init() {
    if (!document.getElementById('devotos-content')) return;
    try { render(); }
    catch (err) {
      console.error('[devotos] falha ao renderizar:', err);
      const cont = document.getElementById('devotos-content');
      if (cont) cont.innerHTML = `<div class="cr-erro"><strong>Erro ao montar a aba:</strong><br>${esc(err && err.message || err)}</div>`;
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
