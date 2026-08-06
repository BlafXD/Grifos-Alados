// ═══════════════════════════════════════════════════════════════════
//  SYNC-MESTRE.JS — "📡 Mesa ao vivo" (lado do MESTRE)
//  Carregado só no index.html. Publica no Firebase Realtime Database,
//  a cada salvamento, as chaves do localStorage que os jogadores podem
//  ver (loja rolada, viagens e bases). A página dos jogadores
//  (jogadores.html + sync-jogador.js) assina essas chaves e se atualiza.
//
//  Sem js/firebase-config.js preenchido (ou sem internet/CDN), tudo
//  aqui fica quieto e o site segue 100% offline como sempre foi.
//  Segurança: LER é público (quem tiver o link da sala); ESCREVER só o
//  mestre logado — garantido pelas REGRAS do banco (ver MODO-JOGADOR.md),
//  não por esconder botão.
// ═══════════════════════════════════════════════════════════════════
(function () {
  'use strict';

  // chave curta no banco → chave real no localStorage
  const CHAVES = {
    lojaLog:        'grifosAlados.lojaLog',
    lojaLogSel:     'grifosAlados.lojaLogSel',
    lojaComunidade: 'grifosAlados.lojaComunidade',
    viagens:        'grifosAlados.viagens',
    bases:          'grifosAlados.bases',
  };
  const NOME_POR_CHAVE = {};
  Object.keys(CHAVES).forEach(n => { NOME_POR_CHAVE[CHAVES[n]] = n; });

  const SALA_KEY = 'grifosAlados.syncSala';
  const esc = window.GA_esc;

  let inicializado = false;
  let db = null;
  let usuario = null;
  let pendentes = new Set();
  let timer = null;
  let ultimoEnvio = null;     // Date do último push OK
  let ultimoErro = '';

  function temConfig() {
    return typeof firebase !== 'undefined' && window.GA_FIREBASE && window.GA_FIREBASE.apiKey;
  }
  function sala() {
    let s = '';
    try { s = (localStorage.getItem(SALA_KEY) || '').trim(); } catch (e) {}
    return s || 'mesa';
  }

  // ── Firebase (só toca se houver config) ──────────────────────────
  function conectar() {
    if (inicializado || !temConfig()) return;
    try {
      firebase.initializeApp(window.GA_FIREBASE);
      db = firebase.database();
      firebase.auth().onAuthStateChanged(u => {
        usuario = u;
        atualizarBotao();
        if (u) enviarTudo();          // sessão retomada → foto completa
      });
      // "Inventário dos jogadores" (caixa livre, escrita por eles em
      // jogadores.html — ver sync-jogador.js) é um espelho à parte, fora
      // do pacote normal de 'bases': ninguém que não seja o mestre logado
      // consegue tocar em dados.bases, então isolamos a escrita deles
      // aqui, e só ESCUTAMOS (leitura é sempre pública nas regras do
      // banco). Funciona mesmo sem o mestre estar logado.
      db.ref('mesas/' + sala() + '/jogadores/inventario').on('value', snap => {
        aplicarInventarioJogadores(snap.val() || {});
      }, err => console.warn('[sync] leitura de inventário dos jogadores:', err && err.message));
      inicializado = true;
    } catch (e) {
      ultimoErro = e.message;
      console.warn('[sync] Firebase não inicializou:', e.message);
    }
  }

  const CHAVE_INV_JOGADORES = 'grifosAlados.basesJogadoresInventario';

  // Aqui somos o DONO do arquivo: o que os jogadores escreveram em
  // Residentes / Inventário da base e no diário / nas paradas de uma viagem
  // entra no arquivo do mestre e a caixa de entrada é esvaziada (senão uma
  // edição velha voltaria por cima da próxima edição dele). O salvamento
  // retransmite para todos. Devolve true se alguma aba já se redesenhou.
  function absorver(mapa) {
    let redesenhou = false;
    [window.GA_Bases, window.GA_Viagem].forEach(mod => {
      try {
        if (mod && mod.receberInbox && mod.receberInbox(mapa, true)) redesenhou = true;
      } catch (e) { console.warn('[sync] absorver edições dos jogadores:', e && e.message); }
    });
    return redesenhou;
  }

  // Absorver no meio de uma digitação arrancaria o foco do mestre — espera
  // ele sair do campo (uma vez só) e absorve o que ficou guardado.
  let absorcaoAdiada = false;
  function adiarAbsorcao() {
    if (absorcaoAdiada) return;
    absorcaoAdiada = true;
    document.addEventListener('focusout', function sair() {
      document.removeEventListener('focusout', sair);
      absorcaoAdiada = false;
      setTimeout(() => { if (!digitando()) absorver(inboxLocal()); }, 0);
    });
  }
  function digitando() {
    const f = document.activeElement;
    return !!(f && (f.tagName === 'INPUT' || f.tagName === 'TEXTAREA' ||
                    (f.getAttribute && f.getAttribute('contenteditable') === 'true')));
  }
  function inboxLocal() {
    return window.GA_Inbox ? window.GA_Inbox.mapa() : {};
  }

  function aplicarInventarioJogadores(dados) {
    let atual = null;
    try { atual = localStorage.getItem(CHAVE_INV_JOGADORES); } catch (e) {}
    const v = JSON.stringify(dados || {});
    if (atual === v) return;
    try { localStorage.setItem(CHAVE_INV_JOGADORES, v); } catch (e) {}

    // Se o mestre está digitando em algum campo agora, não re-renderiza a
    // aba (arrancaria o foco). Atualiza só as caixas de leitura no lugar e
    // deixa as edições dos jogadores para quando ele sair do campo — elas
    // ficam guardadas na caixa de entrada até serem absorvidas.
    if (digitando()) {
      const mapa = dados || {};
      document.querySelectorAll('[data-campo-compart="invjogadores"]').forEach(area => {
        const entrada = window.GA_basesInboxDe ? window.GA_basesInboxDe(area.dataset.baseId, mapa) : {};
        const novo = window.GA_invJogadoresHtml
          ? window.GA_invJogadoresHtml(entrada.jogadores || '') : (entrada.jogadores || '');
        if (area.innerHTML !== novo) area.innerHTML = novo;
      });
      adiarAbsorcao();
      return;
    }
    if (absorver(dados || {})) return;   // alguma aba já redesenhou
    // ninguém mudou de conteúdo, mas a caixa "📝 Inventário dos jogadores"
    // (que mora só na entrada) pode ter mudado → redesenha as Bases
    try { window.GA_Bases && window.GA_Bases.recarregar && window.GA_Bases.recarregar(); } catch (e) {}
  }

  // Apaga um campo da caixa de entrada — o mestre já tem permissão de
  // escrita em qualquer caminho da sala, então isso funciona com a mesma
  // conta logada, sem precisar de mais nada.
  //  update({campo: null}) em vez de remove() no filho: se a entrada ainda
  //  for a string antiga (formato pré-caixa-de-entrada), remover um filho
  //  dela não faria nada — já o update troca a string por um objeto sem
  //  aquele campo, que é exatamente o que queremos.
  function limparInbox(baseId, campo) {
    if (!db) return;
    const patch = {}; patch[campo] = null;
    db.ref('mesas/' + sala() + '/jogadores/inventario/' + baseId).update(patch)
      .catch(e => console.warn('[sync] não deu para limpar:', e && e.message));
  }
  window.GA_SyncMestre = {
    limparInbox: limparInbox,
    limparInventarioJogadores: baseId => limparInbox(baseId, 'jogadores'),
  };

  function refDados() { return db.ref('mesas/' + sala() + '/dados'); }

  // O que está marcado "só o mestre vê" (visivelJogadores: false) NUNCA sai
  // daqui — filtrado antes mesmo de virar pacote para o Firebase. Não é só
  // esconder na tela: o jogador não tem como inspecionar o que nunca chegou
  // até o banco dele. Vale para bases inteiras, viagens inteiras e, dentro
  // de uma viagem visível, para cada linha do diário e cada parada.
  const visivel = x => x && x.visivelJogadores !== false;

  function valorParaEnviar(nome, v) {
    if (v == null || (nome !== 'bases' && nome !== 'viagens')) return v;
    try {
      const dados = JSON.parse(v);
      if (nome === 'bases' && dados && Array.isArray(dados.bases)) {
        dados.bases = dados.bases.filter(visivel);
        return JSON.stringify(dados);
      }
      if (nome === 'viagens' && dados && Array.isArray(dados.viagens)) {
        dados.viagens = dados.viagens.filter(visivel).map(vg => {
          const copia = Object.assign({}, vg);
          copia.diario  = (vg.diario  || []).filter(visivel);
          copia.paradas = (vg.paradas || []).filter(visivel);
          return copia;
        });
        return JSON.stringify(dados);
      }
    } catch (e) { console.warn('[sync] não deu para filtrar o que é só do mestre:', e.message); }
    return v;
  }

  function enviarPendentes() {
    if (!db || !usuario || !pendentes.size) return;
    const pacote = {};
    pendentes.forEach(nome => {
      let v = null;
      try { v = localStorage.getItem(CHAVES[nome]); } catch (e) {}
      pacote[nome] = (v == null) ? null : valorParaEnviar(nome, v);
    });
    pendentes.clear();
    refDados().update(pacote)
      .then(() => {
        return db.ref('mesas/' + sala() + '/meta').update({
          atualizadoEm: firebase.database.ServerValue.TIMESTAMP,
        });
      })
      .then(() => { ultimoEnvio = new Date(); ultimoErro = ''; atualizarBotao(); })
      .catch(e => {
        ultimoErro = e.message;
        atualizarBotao();
        console.warn('[sync] envio falhou:', e.message);
      });
  }

  function enviarTudo() {
    Object.keys(CHAVES).forEach(n => pendentes.add(n));
    enviarPendentes();
  }

  // ── Gatilho: qualquer salvar() das abas passa pelo setItem ───────
  const setItemOriginal = Storage.prototype.setItem;
  Storage.prototype.setItem = function (k, v) {
    setItemOriginal.apply(this, arguments);
    try {
      if (this === window.localStorage && NOME_POR_CHAVE[k] && usuario) {
        pendentes.add(NOME_POR_CHAVE[k]);
        clearTimeout(timer);
        timer = setTimeout(enviarPendentes, 2500);   // junta rajadas de edição
      }
    } catch (e) {}
  };

  // ── Botão flutuante 📡 + modal de controle ───────────────────────
  function estado() {
    if (!temConfig()) return 'config';
    if (!usuario) return 'off';
    if (ultimoErro) return 'erro';
    return 'on';
  }

  function atualizarBotao() {
    const btn = document.getElementById('gaSyncBtn');
    if (!btn) return;
    const e = estado();
    btn.className = 'ga-sync-btn ga-sync-btn--' + e;
    btn.title = {
      config: 'Mesa ao vivo — falta configurar o Firebase (clique para ver como)',
      off:    'Mesa ao vivo — desconectado (clique para entrar)',
      on:     'Mesa ao vivo — transmitindo para os jogadores' + (ultimoEnvio ? ' · último envio ' + ultimoEnvio.toLocaleTimeString('pt-BR') : ''),
      erro:   'Mesa ao vivo — erro no último envio: ' + ultimoErro,
    }[e];
    // re-desenha o modal se estiver aberto (login concluiu, envio saiu…)
    const modal = document.querySelector('.ga-sync-modal');
    if (modal) modal.innerHTML = corpoModal();
  }

  function corpoModal() {
    const cab = `
      <div class="ga-modal-cab">
        <strong>📡 Mesa ao vivo</strong>
        <button class="ga-modal-x" data-ga-fechar title="Fechar (Esc)">✕</button>
      </div>`;

    if (!temConfig()) {
      return cab + `
        <p class="ga-sync-p">A transmissão para os jogadores ainda não foi configurada.</p>
        <p class="ga-sync-p">Siga o passo a passo do arquivo <strong>MODO-JOGADOR.md</strong>
          (na pasta do projeto): criar o projeto gratuito no Firebase, colar as chaves em
          <code>js/firebase-config.js</code> e publicar o site. Leva uns 15 minutos, uma vez só.</p>
        <p class="ga-sync-p ga-sync-p--dica">Enquanto isso, nada muda: o site continua funcionando normalmente.</p>`;
    }

    if (!usuario) {
      return cab + `
        <p class="ga-sync-p">Entre com o usuário de mestre (criado no Firebase) para começar a transmitir.</p>
        <label class="ga-sync-campo">E-mail
          <input type="email" id="gaSyncEmail" autocomplete="username" placeholder="mestre@exemplo.com"></label>
        <label class="ga-sync-campo">Senha
          <input type="password" id="gaSyncSenha" autocomplete="current-password"></label>
        <label class="ga-sync-campo">Sala
          <input type="text" id="gaSyncSala" value="${esc(sala())}" placeholder="mesa">
          <span class="ga-sync-mini">os jogadores usam jogadores.html?sala=<em>este nome</em></span></label>
        ${ultimoErro ? `<p class="ga-sync-erro">⚠ ${esc(ultimoErro)}</p>` : ''}
        <div class="ga-modal-acoes"><button class="ga-btn-principal" data-sync-entrar>🔑 Entrar e transmitir</button></div>`;
    }

    return cab + `
      <p class="ga-sync-p">✅ Transmitindo como <strong>${esc(usuario.email || 'mestre')}</strong>,
        sala <strong>${esc(sala())}</strong>.</p>
      <p class="ga-sync-p">O que os jogadores veem: a <strong>Loja</strong> exibida (com encantamentos
        e pergaminhos), as <strong>Bases</strong> e as <strong>Viagens</strong> — atualizado sozinho
        segundos depois de você mexer. Consultas eles já têm por serem regras.</p>
      <p class="ga-sync-p ga-sync-p--dica">Link deles: <code>jogadores.html?sala=${esc(sala())}</code>
        no endereço onde o site está publicado.</p>
      <p class="ga-sync-p">${ultimoEnvio ? 'Último envio: <strong>' + ultimoEnvio.toLocaleTimeString('pt-BR') + '</strong>' : 'Nenhum envio ainda nesta sessão.'}</p>
      ${ultimoErro ? `<p class="ga-sync-erro">⚠ ${esc(ultimoErro)}</p>` : ''}
      <div class="ga-modal-acoes">
        <button class="ga-btn-sec" data-sync-sair>Sair</button>
        <button class="ga-btn-principal" data-sync-enviar>📤 Enviar agora</button>
      </div>`;
  }

  function abrirModal() {
    conectar();
    const overlay = window.GA_abrirModal(`<div class="ga-sync-modal">${corpoModal()}</div>`);
    overlay.addEventListener('click', e => {
      if (e.target.closest('[data-sync-entrar]')) {
        const email = (document.getElementById('gaSyncEmail') || {}).value || '';
        const senha = (document.getElementById('gaSyncSenha') || {}).value || '';
        const s = ((document.getElementById('gaSyncSala') || {}).value || '').trim();
        try { localStorage.setItem(SALA_KEY, s || 'mesa'); } catch (err) {}
        ultimoErro = '';
        firebase.auth().signInWithEmailAndPassword(email.trim(), senha)
          .catch(err => { ultimoErro = err.message; atualizarBotao(); });
        return;
      }
      if (e.target.closest('[data-sync-sair]')) {
        firebase.auth().signOut();
        return;
      }
      if (e.target.closest('[data-sync-enviar]')) {
        enviarTudo();
        return;
      }
    });
  }

  function montarBotao() {
    const btn = document.createElement('button');
    btn.id = 'gaSyncBtn';
    btn.type = 'button';
    btn.textContent = '📡';
    btn.addEventListener('click', abrirModal);
    document.body.appendChild(btn);
    atualizarBotao();
  }

  function init() {
    montarBotao();
    conectar();          // retoma a sessão salva do mestre, se houver
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
