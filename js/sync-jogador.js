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
        if (window.GA_guardar(CHAVES[nome], v)) mods.add(MODULO[nome]);
      }
    });
    // o mestre retransmite logo depois de absorver uma edição dos jogadores
    // — se alguém ainda estiver escrevendo, espera ele sair da caixa em vez
    // de redesenhar por baixo do cursor
    mods.forEach(mod => {
      if (digitando()) adiarRedesenho(mod);
      else atualizar(mod);
    });
    return mods.size > 0;
  }

  // Redesenha uma aba com os dados do mestre e reaplica por cima o que ainda
  // está na caixa de entrada — o que um jogador escreveu há pouco e o mestre
  // ainda não absorveu não pode sumir da tela no meio do caminho.
  function atualizar(mod) {
    redesenhar(mod);
    absorver(inboxLocal());
  }

  // ── CAIXA DE ENTRADA — o que jogadores.html consegue ESCREVER de volta
  //  (ver GA_Inbox no script.js e MODO-JOGADOR.md): a caixa "📝 Inventário
  //  dos jogadores", Residentes e Inventário de uma base, e o diário e as
  //  paradas VISÍVEIS de uma viagem. Um espelho à parte do arquivo do
  //  mestre — não mexe em nada que seja só dele. Qualquer jogador escreve
  //  (são caixas compartilhadas por todos que abrirem o link da sala).
  const CHAVE_INV_JOGADORES = 'grifosAlados.basesJogadoresInventario';
  let dbRef = null, timerInv = null, pendenteInv = {};

  function inboxLocal() { return window.GA_Inbox ? window.GA_Inbox.mapa() : {}; }

  // Leva as edições da caixa de entrada para o arquivo local (assim a edição
  // de um jogador aparece para os outros mesmo com o mestre fora do ar).
  // `false` = não somos o dono, então a entrada NÃO é esvaziada — quem faz
  // isso é o mestre, ao absorver. Devolve true se alguma aba se redesenhou.
  function absorver(mapa) {
    let redesenhou = false;
    [window.GA_Bases, window.GA_Viagem].forEach(mod => {
      try {
        if (mod && mod.receberInbox && mod.receberInbox(mapa, false)) redesenhou = true;
      } catch (e) { console.warn('[sync-jogador] absorver edições:', e && e.message); }
    });
    return redesenhou;
  }

  // Está com o cursor dentro de alguma caixa que os jogadores editam?
  // Redesenhar a aba agora arrancaria o foco no meio da digitação.
  function digitando() {
    const f = document.activeElement;
    return !!(f && f.closest && f.closest('[data-jog-edita]'));
  }
  // Faz o trabalho adiado assim que a pessoa sair da caixa (uma passagem só,
  // com tudo o que se acumulou enquanto ela escrevia).
  const modsAdiados = new Set();
  let absorcaoAdiada = false, ouvindoSaida = false;
  function aoSair() {
    document.removeEventListener('focusout', aoSair);
    ouvindoSaida = false;
    setTimeout(() => {
      if (digitando()) return agendarSaida();   // pulou direto para outra caixa
      const mods = Array.from(modsAdiados); modsAdiados.clear();
      const precisa = absorcaoAdiada || mods.length;
      absorcaoAdiada = false;
      mods.forEach(mod => redesenhar(mod));
      if (precisa) absorver(inboxLocal());
    }, 0);
  }
  function agendarSaida() {
    if (ouvindoSaida) return;
    ouvindoSaida = true;
    document.addEventListener('focusout', aoSair);
  }
  function adiarRedesenho(mod) { modsAdiados.add(mod); agendarSaida(); }
  function adiarAbsorcao()     { absorcaoAdiada = true; agendarSaida(); }

  function aplicarInventarioJogadores(dados) {
    let atual = null;
    try { atual = localStorage.getItem(CHAVE_INV_JOGADORES); } catch (e) {}
    const v = JSON.stringify(dados || {});
    if (atual === v) return;   // nada mudou (inclui o "eco" da própria escrita) → não redesenha
    window.GA_guardar(CHAVE_INV_JOGADORES, v);

    // Se o jogador está digitando numa dessas caixas agora, não arranca o
    // foco dele: atualiza só as OUTRAS caixas no lugar, sem re-render, e
    // deixa a absorção para quando ele sair.
    if (digitando()) {
      const focado = document.activeElement;
      const mapa = dados || {};
      document.querySelectorAll('[data-campo-compart="invjogadores"]').forEach(area => {
        if (area === focado) return;
        const entrada = window.GA_basesInboxDe ? window.GA_basesInboxDe(area.dataset.baseId, mapa) : {};
        const novo = window.GA_invJogadoresHtml
          ? window.GA_invJogadoresHtml(entrada.jogadores || '') : (entrada.jogadores || '');
        if (area.innerHTML !== novo) area.innerHTML = novo;
      });
      adiarAbsorcao();
      return;
    }
    if (absorver(dados || {})) return;   // alguma aba já redesenhou
    redesenhar('bases');   // a caixa que mora só na entrada pode ter mudado
  }

  // Guarda um campo da caixa de entrada no banco. `campo` é 'jogadores' (a
  // caixa que é só deles) ou 'residentes'/'inventario' (edição que segue
  // para o mestre absorver). Junta rajadas de digitação em um envio só.
  function escreverInbox(baseId, campo, html) {
    (pendenteInv[baseId] || (pendenteInv[baseId] = {}))[campo] = html;
    if (timerInv) clearTimeout(timerInv);
    timerInv = setTimeout(() => {
      const paraEnviar = pendenteInv; pendenteInv = {};
      if (!dbRef) return;
      Object.keys(paraEnviar).forEach(id => {
        dbRef.child(id).update(paraEnviar[id])
          .catch(e => console.warn('[sync-jogador] não deu para escrever:', e && e.message));
      });
    }, 900);
  }
  window.GA_SyncJogador = {
    escreverInbox: escreverInbox,
    // nome antigo, mantido para não quebrar chamadas soltas
    escreverInventario: (baseId, html) => escreverInbox(baseId, 'jogadores', html),
  };

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
