// ═══════════════════════════════════════════════════════════════════
//  SYNC-JOGADOR.JS — "Mesa ao vivo" (lado dos JOGADORES)
//  Carregado só no jogadores.html. Assina no Firebase os dados que o
//  mestre transmite (loja rolada, viagens, bases), grava no localStorage
//  local e recarrega a página (com rolagem preservada) quando algo muda —
//  as abas re-renderizam sozinhas a partir do localStorage, como sempre.
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
  const INTERVALO_MIN_RELOAD = 4000;   // não recarrega em rajada
  let ultimaCarga = Date.now();
  let reloadAgendado = false;

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

  function recarregar() {
    if (reloadAgendado) return;
    const espera = Math.max(0, INTERVALO_MIN_RELOAD - (Date.now() - ultimaCarga));
    reloadAgendado = true;
    setTimeout(() => {
      // guarda onde o jogador estava para voltar ao mesmo lugar
      try {
        const ativa = document.querySelector('section.active');
        sessionStorage.setItem('gaJog.secao', ativa ? ativa.id : '');
        sessionStorage.setItem('gaJog.scroll', String(window.scrollY || 0));
      } catch (e) {}
      location.reload();
    }, espera + 300);
  }

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
      const dados = snap.val() || {};
      let mudou = false;
      Object.keys(CHAVES).forEach(nome => {
        const v = dados[nome];
        if (typeof v !== 'string') return;
        let atual = null;
        try { atual = localStorage.getItem(CHAVES[nome]); } catch (e) {}
        if (atual !== v) {
          try { localStorage.setItem(CHAVES[nome], v); mudou = true; } catch (e) {}
        }
      });
      if (mudou) {
        chip('📡 A mesa mudou — atualizando…');
        recarregar();
      }
    }, err => {
      chip('⚠ Sem permissão para ler a sala "' + sala + '" — confira as regras do banco.', 'ga-jog-chip--off');
      console.warn('[sync-jogador]', err && err.message);
    });

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
