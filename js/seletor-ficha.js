/* ═══════════════════════════════════════════════════════════════════
   SELETOR DE FICHA COM FILTRO — um componente só para o site inteiro
   (ideia 12, 26/11/2026). Pedido dele: na hora de escolher uma ficha
   aparecia tudo empilhado — as dele, as dos jogadores, as de campanhas
   antigas. Agora todo seletor de ficha ganha dois filtros e uma busca:
     • Campanha: esta (a do endereço) · todas · sem campanha · cada uma
     • Conta:    todas · minhas · cada jogador
     • 🔎 nome
   COMO USAR: o seletor é um contêiner [data-sf="<escopo>"] com
     - os controles de GA_SeletorFicha.controles(escopo, itens) dentro;
     - os itens (botões OU <option>) marcados com GA_SeletorFicha.attrs(item).
   O filtro só ESCONDE itens (hidden) — nada é redesenhado, então serve
   tanto para a barra de abas da Ficha quanto para um <select> do Caderno.
   O escolhido fica lembrado por escopo, só neste navegador.
   Item: { id, nome, mesa, mesaNome, contaSo, dono, donoNome, minha }
   ═══════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  const PREFIXO = 'grifosAlados.filtroFicha.';
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  //  a campanha do endereço (?mesa= / ?sala=); sem ela, a mesa conectada
  function salaAtual() {
    try { if (window.GA_Sala && window.GA_Sala.id) return window.GA_Sala.id; } catch (e) {}
    try { const e = window.GA_Mesa && window.GA_Mesa.estado(); return (e && e.mesaId) || ''; } catch (e) { return ''; }
  }
  function lerFiltro(escopo) {
    let f = null;
    try { f = JSON.parse(localStorage.getItem(PREFIXO + escopo) || 'null'); } catch (e) {}
    f = (f && typeof f === 'object') ? f : {};
    //  sem nada guardado: com campanha no endereço, começa NELA
    if (typeof f.camp !== 'string') f.camp = salaAtual() ? '__esta__' : '__todas__';
    if (typeof f.conta !== 'string') f.conta = '__todas__';
    f.busca = '';                          // a busca não sobrevive ao F5, de propósito
    return f;
  }
  function gravarFiltro(escopo, f) {
    try { localStorage.setItem(PREFIXO + escopo, JSON.stringify({ camp: f.camp, conta: f.conta })); } catch (e) {}
  }

  //  data-* que o filtro lê em cada item
  function attrs(it) {
    const camp = it.contaSo ? '__conta__' : (it.mesa || '__sem__');
    return ` data-sf-item data-sf-camp="${esc(camp)}" data-sf-dono="${esc(it.minha ? '__minhas__' : (it.dono || ''))}"` +
      ` data-sf-nome="${esc(String(it.nome || '').toLowerCase())}"`;
  }

  function controles(escopo, itens) {
    const f = lerFiltro(escopo), sala = salaAtual();
    const camps = {}, contas = {};
    (itens || []).forEach(it => {
      if (it.mesa && !it.contaSo) camps[it.mesa] = it.mesaNome || camps[it.mesa] || it.mesa;
      if (!it.minha && it.dono) contas[it.dono] = it.donoNome || contas[it.dono] || 'jogador';
    });
    try {
      const minhas = (window.GA_Mesa && window.GA_Mesa.minhasMesas && window.GA_Mesa.minhasMesas()) || {};
      Object.keys(camps).forEach(c => { if (minhas[c]) camps[c] = minhas[c]; });
    } catch (e) {}
    const op = (v, rot, sel) => `<option value="${esc(v)}"${sel === v ? ' selected' : ''}>${esc(rot)}</option>`;
    let opsCamp = (sala ? op('__esta__', 'esta campanha (' + (camps[sala] || sala) + ')', f.camp) : '') +
      op('__todas__', 'todas', f.camp) + op('__sem__', 'sem campanha', f.camp) + op('__conta__', '🔒 só na conta', f.camp);
    Object.keys(camps).sort((a, b) => String(camps[a]).localeCompare(String(camps[b]))).forEach(c => {
      if (c !== sala) opsCamp += op(c, camps[c], f.camp);
    });
    let opsConta = op('__todas__', 'todas', f.conta) + op('__minhas__', 'só as minhas', f.conta);
    Object.keys(contas).forEach(u => { opsConta += op(u, contas[u], f.conta); });
    const temContas = Object.keys(contas).length > 0;
    return `<span class="sf-filtros" data-sf-filtros>
        <label class="sf-campo">Campanha <select data-sf-camp-sel aria-label="Filtrar fichas por campanha">${opsCamp}</select></label>
        ${temContas ? `<label class="sf-campo">Conta <select data-sf-conta-sel aria-label="Filtrar fichas por conta">${opsConta}</select></label>` : ''}
        <input type="search" class="sf-busca" data-sf-busca placeholder="buscar ficha" aria-label="Buscar ficha pelo nome" autocomplete="off">
        <span class="sf-conta-vazio" data-sf-vazio hidden>nenhuma ficha neste filtro</span>
      </span>`;
  }

  function casa(el, f, sala) {
    const camp = el.getAttribute('data-sf-camp') || '__sem__';
    const dono = el.getAttribute('data-sf-dono') || '';
    const nome = el.getAttribute('data-sf-nome') || '';
    if (f.camp === '__esta__' && camp !== sala) return false;
    if (f.camp !== '__esta__' && f.camp !== '__todas__' && camp !== f.camp) return false;
    if (f.conta === '__minhas__' && dono !== '__minhas__') return false;
    if (f.conta !== '__todas__' && f.conta !== '__minhas__' && dono !== f.conta) return false;
    if (f.busca && nome.indexOf(f.busca) < 0) return false;
    return true;
  }

  //  Aplica o filtro num contêiner [data-sf]. O item ESCOLHIDO (aba ativa,
  //  option selecionada) nunca some — esconder o que está aberto confunde.
  function aplicar(raiz) {
    if (!raiz) return;
    const escopo = raiz.getAttribute('data-sf');
    const f = raiz._sfFiltro || (raiz._sfFiltro = lerFiltro(escopo));
    const sala = salaAtual();
    let vis = 0;
    raiz.querySelectorAll('[data-sf-item]').forEach(el => {
      const ativo = el.selected || el.classList.contains('fi-aba--ativa') || el.getAttribute('aria-current') === 'true';
      const ok = ativo || casa(el, f, sala);
      const alvo = el.closest('[data-sf-embrulho]') || el;
      alvo.hidden = !ok;
      if (ok) vis++;
    });
    //  optgroup sem nada visível some junto
    raiz.querySelectorAll('optgroup').forEach(g => {
      g.hidden = !Array.prototype.some.call(g.querySelectorAll('[data-sf-item]'), o => !o.hidden);
    });
    const vazio = raiz.querySelector('[data-sf-vazio]');
    if (vazio) vazio.hidden = vis > 0;
  }
  function aplicarTodos(raiz) {
    (raiz || document).querySelectorAll('[data-sf]').forEach(aplicar);
  }

  function aoMexer(e) {
    const t = e.target;
    if (!t || !t.closest) return;
    const filtros = t.closest('[data-sf-filtros]');
    if (!filtros) return;
    const raiz = filtros.closest('[data-sf]');
    if (!raiz) return;
    const escopo = raiz.getAttribute('data-sf');
    const f = raiz._sfFiltro || (raiz._sfFiltro = lerFiltro(escopo));
    if (t.hasAttribute('data-sf-camp-sel')) f.camp = t.value;
    else if (t.hasAttribute('data-sf-conta-sel')) f.conta = t.value;
    else if (t.hasAttribute('data-sf-busca')) f.busca = String(t.value || '').trim().toLowerCase();
    else return;
    e.stopPropagation();                    // o filtro não é um campo da ficha
    gravarFiltro(escopo, f);
    //  todos os seletores do MESMO escopo andam juntos
    document.querySelectorAll('[data-sf="' + escopo + '"]').forEach(r => {
      r._sfFiltro = Object.assign(r._sfFiltro || {}, { camp: f.camp, conta: f.conta, busca: f.busca });
      aplicar(r);
    });
  }
  document.addEventListener('change', aoMexer, true);
  document.addEventListener('input', aoMexer, true);

  window.GA_SeletorFicha = { attrs: attrs, controles: controles, aplicar: aplicar, aplicarTodos: aplicarTodos };
})();
