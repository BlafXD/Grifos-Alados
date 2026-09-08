// ═══════════════════════════════════════════════════════════════════
//  SYNC-JOGADOR.JS — "Mesa ao vivo" (lado dos JOGADORES)
//  Carregado só no jogadores.html. Assina no Firebase os dados que o
//  mestre transmite (loja rolada, viagens, bases), grava no localStorage
//  local e RE-RENDERIZA só a aba afetada (sem recarregar a página — nada
//  de piscar a tela nem perder a sub-aba aberta da Loja).
//  Sala: jogadores.html?sala=nome (padrão "mesa").
//
//  LER a mesa é aberto a quem tem o link — de propósito, é o ".read": true
//  das regras. ESCREVER exige entrar com o Google: só as contas que o
//  mestre listou nas regras do banco passam (ver MODO-JOGADOR.md). Daí o
//  bloco "QUEM PODE ESCREVER", lá embaixo.
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

  // O chip do rodapé tem duas partes que mudam em horas diferentes: o
  // estado da sala (o sync escreve) e a linha de login (o bloco "QUEM PODE
  // ESCREVER" escreve). Por isso ele não é mais um innerHTML só — uma parte
  // não pode apagar a outra.
  function chipRaiz() {
    let el = document.getElementById('gaJogChip');
    if (!el) {
      el = document.createElement('div');
      el.id = 'gaJogChip';
      el.className = 'ga-jog-chip';
      el.innerHTML = '<span class="ga-jog-chip-txt"></span><span class="ga-jog-chip-auth"></span>';
      el.addEventListener('click', e => {
        if (!(e.target instanceof Element)) return;
        if (e.target.closest('[data-jog-entrar]')) entrar();
        else if (e.target.closest('[data-jog-sair]')) sair();
        else if (e.target.closest('[data-jog-mesa]')) irParaMesa();
      });
      document.body.appendChild(el);
    }
    return el;
  }
  function chip(texto, classe) {
    const el = chipRaiz();
    el.className = 'ga-jog-chip ' + (classe || '');
    el.querySelector('.ga-jog-chip-txt').innerHTML = texto;
  }
  function chipAuth(html) {
    chipRaiz().querySelector('.ga-jog-chip-auth').innerHTML = html;
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
          .catch(e => {
            // o banco recusou: ou ninguém entrou, ou a conta não está na
            // lista da regra. Em vez de morrer no console, o chip conta.
            if (ehSemPermissao(e)) marcarSemPermissao();
            console.warn('[sync-jogador] não deu para escrever:', e && e.message);
          });
      });
    }, 900);
  }
  window.GA_SyncJogador = {
    escreverInbox: escreverInbox,
    // nome antigo, mantido para não quebrar chamadas soltas
    escreverInventario: (baseId, html) => escreverInbox(baseId, 'jogadores', html),
    podeEscrever: () => podeEscrever(),
  };

  // ═══ QUEM PODE ESCREVER — o papel na mesa ═════════════════════════
  //  Conta e papel são assunto do mesa.js (GA_Mesa): aqui só se reflete
  //  a resposta dele. A garantia DURA continua sendo do banco — a regra
  //  de `jogadores/inventario` só aceita quem está em `membros`.
  //  A leitura da mesa continua aberta: quem só quer ver a Loja e a
  //  gazeta não precisa entrar em conta nenhuma.
  //  Sem Firebase configurado (ou com o CDN fora do ar) nada disso existe:
  //  a página vira a cópia local de sempre e as caixas continuam como
  //  eram, porque não há banco nenhum para proteger.
  const esc = window.GA_esc;
  let mesa = null;             // último estado que o GA_Mesa mandou
  let semPermissao = false;    // o banco recusou uma escrita nossa

  function temMesa() { return !!(window.GA_Mesa && mesa && mesa.configurado); }
  // `escreve` já desconta o espectador, que é membro e mesmo assim não
  // escreve nada — é o papel de quem só assiste à mesa.
  function podeEscrever() { return !temMesa() ? true : (mesa.escreve && !semPermissao); }

  // Trava/destrava as caixas e redesenha a linha de login do chip.
  function refletirLogin() {
    if (window.GA_ModoJogador && window.GA_ModoJogador.permitirEdicao) {
      // o cadeado só aparece depois que o Firebase responde: piscar
      // "travado" para quem já estava logado seria mentira de meio segundo
      window.GA_ModoJogador.permitirEdicao(podeEscrever(), !!(mesa && mesa.pronto));
    }
    desenharAuth();
  }

  const BOTAO_MESA = '<button type="button" class="ga-jog-auth-btn" data-jog-mesa>abrir a aba 🎲 Mesa</button>';

  function desenharAuth() {
    if (!temMesa()) return chipAuth('');
    if (!mesa.usuario) {
      return chipAuth('<button type="button" class="ga-jog-auth-btn" data-jog-entrar>🔑 Entrar com o Google para escrever</button>');
    }
    if (semPermissao) {
      return chipAuth('<span class="ga-jog-auth-erro">🔒 o banco recusou a escrita — confira o seu lugar na mesa</span>' + BOTAO_MESA);
    }
    if (!mesa.souMembro) {
      return chipAuth('<span class="ga-jog-auth-erro">🔒 você ainda não está nesta mesa</span>' +
        (mesa.temPedido ? '<span class="ga-jog-auth-quem">pedido enviado, esperando o mestre</span>' : BOTAO_MESA));
    }
    if (!mesa.escreve) {   // espectador: está na mesa, mas só olha
      return chipAuth('<span class="ga-jog-auth-quem">👁 você está como <strong>espectador</strong></span>' +
        '<button type="button" class="ga-jog-auth-sair" data-jog-sair>sair</button>');
    }
    chipAuth('<span class="ga-jog-auth-quem">✍ escrevendo como <strong>' +
      esc((mesa.usuario.displayName || mesa.usuario.email || 'você')) + '</strong>' +
      (mesa.papelRotulo && mesa.papelRotulo !== 'jogador' ? ' · ' + esc(mesa.papelRotulo) : '') + '</span>' +
      '<button type="button" class="ga-jog-auth-sair" data-jog-sair>sair</button>');
  }

  function entrar() { if (window.GA_Mesa) window.GA_Mesa.entrar(); }
  function sair() {
    semPermissao = false;
    if (window.GA_Mesa) window.GA_Mesa.sair();
  }
  // O lugar de pedir para entrar é a aba 🎲 Mesa — leva a pessoa até lá
  // em vez de explicar onde fica.
  function irParaMesa() {
    const link = document.querySelector('.nav-link[data-section="mesa"]');
    if (link) link.click();
    const sec = document.getElementById('mesa');
    if (sec) sec.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }

  function ehSemPermissao(e) {
    const c = ((e && (e.code || e.message)) || '').toString().toLowerCase();
    return c.indexOf('permission') >= 0;
  }
  function marcarSemPermissao() {
    if (semPermissao) return;
    semPermissao = true;
    refletirLogin();   // re-trava: não adianta continuar escrevendo
  }

  // Clique numa caixa travada não pode cair no vazio: o botão de entrar
  // pisca para dizer por onde se resolve. Fase de captura, como o resto do
  // modo-jogador — as caixas usam listeners delegados.
  function aoClicarTravado(e) {
    if (podeEscrever() || !(e.target instanceof Element)) return;
    if (!e.target.closest('[data-jog-edita]')) return;
    const btn = document.querySelector('[data-jog-entrar]');
    if (!btn) return;
    btn.classList.remove('ga-jog-auth-btn--pisca');
    void btn.offsetWidth;                      // reinicia a animação
    btn.classList.add('ga-jog-auth-btn--pisca');
  }

  function init() {
    if (typeof firebase === 'undefined' || !window.GA_FIREBASE || !window.GA_FIREBASE.apiKey) {
      chip('🕯 Mesa ao vivo não configurada — mostrando a última cópia guardada neste aparelho.', 'ga-jog-chip--off');
      return;
    }
    let db;
    try {
      // o app é um só para o site inteiro (o mesa.js pode já ter criado)
      if (!(firebase.apps && firebase.apps.length)) firebase.initializeApp(window.GA_FIREBASE);
      db = firebase.database();
    } catch (e) {
      chip('⚠ Não deu para falar com a mesa: ' + e.message, 'ga-jog-chip--off');
      return;
    }
    document.addEventListener('click', aoClicarTravado, true);

    // Quem manda no login e no papel é o mesa.js. `semPermissao` só se
    // zera quando a PESSOA ou o PAPEL mudam — senão qualquer respiro do
    // banco destravaria a caixa para outra escrita recusada.
    let quemEra = '';
    if (window.GA_Mesa) {
      window.GA_Mesa.aoMudar(e => {
        mesa = e;
        const quem = (e.usuario ? e.usuario.uid : '') + '/' + (e.papel || '');
        if (quem !== quemEra) { quemEra = quem; semPermissao = false; }
        refletirLogin();
      });
    } else {
      refletirLogin();
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
