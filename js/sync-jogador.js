// ═══════════════════════════════════════════════════════════════════
//  SYNC-JOGADOR.JS — "Mesa ao vivo" (lado dos JOGADORES)
//  Carregado só no jogadores.html. Assina no Firebase os dados que o
//  mestre transmite (loja rolada, viagens, bases), grava no localStorage
//  local e RE-RENDERIZA só a aba afetada (sem recarregar a página — nada
//  de piscar a tela nem perder a sub-aba aberta da Loja).
//  Sala: jogadores.html?sala=nome (padrão "mesa").
// ═══════════════════════════════════════════════════════════════════
(function () {
  'use strict';

  const CHAVES = {
    lojaLog:        'grifosAlados.lojaLog',
    lojaLogSel:     'grifosAlados.lojaLogSel',
    lojaComunidade: 'grifosAlados.lojaComunidade',
    viagens:        'grifosAlados.viagens',
    bases:          'grifosAlados.bases',
  };
  // cada chave pertence a um módulo; cada módulo é redesenhado UMA vez.
  const MODULO = {
    lojaLog: 'loja', lojaLogSel: 'loja', lojaComunidade: 'loja',
    viagens: 'viagem', bases: 'bases',
  };
  function redesenhar(mod) {
    try {
      if (mod === 'loja'   && window.GA_Loja)   return GA_Loja.recarregar(), true;
      if (mod === 'viagem' && window.GA_Viagem) return GA_Viagem.recarregar(), true;
      if (mod === 'bases'  && window.GA_Bases)  return GA_Bases.recarregar(), true;
    } catch (e) { console.warn('[sync-jogador] re-render', mod, e && e.message); }
    return false;   // módulo não está nesta página
  }

  const sala = (new URLSearchParams(location.search).get('sala') || 'mesa').trim() || 'mesa';

  function chip(texto, classe) {
    let el = document.getElementById('gaJogChip');
    if (!el) {
      el = document.createElement('div');
      el.id = 'gaJogChip';
      document.body.appendChild(el);
    }
    el.className = 'ga-jog-chip ' + (classe || '');
    el.innerHTML = texto;
  }

  // Escreve o que mudou no localStorage e redesenha as abas afetadas.
  function aplicar(dados) {
    const mods = new Set();
    Object.keys(CHAVES).forEach(nome => {
      const v = dados[nome];
      if (typeof v !== 'string') return;
      let atual = null;
      try { atual = localStorage.getItem(CHAVES[nome]); } catch (e) {}
      if (atual !== v) {
        try { localStorage.setItem(CHAVES[nome], v); mods.add(MODULO[nome]); } catch (e) {}
      }
    });
    mods.forEach(redesenhar);
    return mods.size > 0;
  }

  // ── "📝 Inventário dos jogadores" — a ÚNICA coisa que jogadores.html
  //  consegue ESCREVER de volta (ver bases.js e MODO-JOGADOR.md). Um
  //  espelho à parte de dados.bases — não mexe em nada que é só do
  //  mestre. Qualquer jogador pode escrever (é uma caixa livre,
  //  compartilhada por todos que abrirem o link da sala).
  const CHAVE_INV_JOGADORES = 'grifosAlados.basesJogadoresInventario';
  let dbRef = null, timerInv = null, pendenteInv = {};

  function aplicarInventarioJogadores(dados) {
    let atual = null;
    try { atual = localStorage.getItem(CHAVE_INV_JOGADORES); } catch (e) {}
    const v = JSON.stringify(dados || {});
    if (atual === v) return;   // nada mudou (inclui o "eco" da própria escrita) → não redesenha
    try { localStorage.setItem(CHAVE_INV_JOGADORES, v); } catch (e) {}
    // Se o jogador está digitando numa dessas caixas agora, não arranca o
    // foco dele: atualiza só as OUTRAS caixas no lugar, sem re-render.
    const focado = document.activeElement;
    const digitando = focado && focado.dataset && focado.dataset.campoCompart === 'invjogadores';
    if (digitando) {
      const mapa = dados || {};
      document.querySelectorAll('[data-campo-compart="invjogadores"]').forEach(area => {
        if (area === focado) return;
        const novo = typeof mapa[area.dataset.baseId] === 'string' ? mapa[area.dataset.baseId] : '';
        if (area.value !== novo) area.value = novo;
      });
      return;
    }
    redesenhar('bases');
  }

  function escreverInventarioJogadores(baseId, texto) {
    pendenteInv[baseId] = texto;
    if (timerInv) clearTimeout(timerInv);
    timerInv = setTimeout(() => {
      const paraEnviar = pendenteInv; pendenteInv = {};
      if (!dbRef) return;
      Object.keys(paraEnviar).forEach(id => {
        dbRef.child(id).set(paraEnviar[id])
          .catch(e => console.warn('[sync-jogador] não deu para escrever:', e && e.message));
      });
    }, 900);
  }
  window.GA_SyncJogador = { escreverInventario: escreverInventarioJogadores };

  function init() {
    if (typeof firebase === 'undefined' || !window.GA_FIREBASE || !window.GA_FIREBASE.apiKey) {
      chip('🕯 Mesa ao vivo não configurada — mostrando a última cópia guardada neste aparelho.', 'ga-jog-chip--off');
      return;
    }
    let db;
    try {
      firebase.initializeApp(window.GA_FIREBASE);
      db = firebase.database();
    } catch (e) {
      chip('⚠ Não deu para falar com a mesa: ' + e.message, 'ga-jog-chip--off');
      return;
    }

    chip('📡 Conectando à sala <strong>' + sala + '</strong>…');

    db.ref('mesas/' + sala + '/dados').on('value', snap => {
      aplicar(snap.val() || {});
    }, err => {
      chip('⚠ Sem permissão para ler a sala "' + sala + '" — confira as regras do banco.', 'ga-jog-chip--off');
      console.warn('[sync-jogador]', err && err.message);
    });

    dbRef = db.ref('mesas/' + sala + '/jogadores/inventario');
    dbRef.on('value', snap => aplicarInventarioJogadores(snap.val() || {}),
      err => console.warn('[sync-jogador] inventário dos jogadores:', err && err.message));

    db.ref('mesas/' + sala + '/meta/atualizadoEm').on('value', snap => {
      const ts = snap.val();
      if (!ts) { chip('📡 Sala <strong>' + sala + '</strong> — aguardando o mestre transmitir.'); return; }
      const d = new Date(ts);
      chip('📡 Sala <strong>' + sala + '</strong> · mesa atualizada às <strong>' +
        d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) + '</strong>', 'ga-jog-chip--on');
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
