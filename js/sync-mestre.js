// ═══════════════════════════════════════════════════════════════════
//  SYNC-MESTRE.JS — "📡 Mesa ao vivo" (lado do MESTRE)
//  Carregado só no index.html. Publica no Firebase Realtime Database,
//  a cada salvamento, as chaves do localStorage que os jogadores podem
//  ver (loja rolada, viagens e bases). A página dos jogadores
//  (jogadores.html + sync-jogador.js) assina essas chaves e se atualiza.
//
//  Sem js/firebase-config.js preenchido (ou sem internet/CDN), tudo
//  aqui fica quieto e o site segue 100% offline como sempre foi.
//  Segurança: LER é público (quem tiver o link da sala); ESCREVER na mesa
//  só quem é MESTRE ou AUXILIAR dela, e na caixa de entrada dos jogadores
//  só quem é membro — garantido pelas REGRAS do banco (ver
//  MODO-JOGADOR.md), não por esconder botão.
//
//  O login daqui é o mesmo do site inteiro: a conta do Google, pelo
//  mesa.js. Quem escreve o nome de uma campanha vira mestre dela — não há
//  usuário de mestre criado à mão no console, como havia até 08/09/2026.
//
//  E A TRAVA (15/09/2026): antes de mandar qualquer chave, confere com o
//  que está no banco. O que mudou por outra mão — outro navegador, outro
//  aparelho, o site aberto de outro endereço — não é substituído sem o
//  mestre dizer "📤 Mandar a daqui por cima". Ver "A TRAVA", mais abaixo.
// ═══════════════════════════════════════════════════════════════════
(function () {
  'use strict';

  // chave curta no banco → chave real no localStorage
  //  Nem tudo vai inteiro: o `valorParaEnviar()` poda o que é só do
  //  mestre (o 🙈 das bases e viagens) e, desde 18/09/2026, manda do
  //  `lojaLog` apenas a loja EXIBIDA — ver lojaExibida().
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
  let podeTransmitir = false;   // mestre ou auxiliar DESTA sala (vem do GA_Mesa)
  let papelAqui = null;
  let pendentes = new Set();
  let timer = null;
  let ultimoEnvio = null;     // Date do último push OK
  let ultimoErro = '';

  // ── A TRAVA (15/09/2026) ─────────────────────────────────────────
  //  O caso que a pediu: o mestre anotou no site publicado, abriu o
  //  index.html de OUTRO endereço (outra gaveta de localStorage, com as
  //  coisas de dias atrás) e entrou com a mesma conta. O "virou mestre →
  //  foto completa" mandou a cópia velha por cima da nova: os dois
  //  endereços falam com o mesmo banco, e ninguém comparava nada. Um
  //  navegador VAZIO seria pior — a foto completa mandaria nada, e a
  //  Loja, as Bases e as Viagens sumiriam da tela dos jogadores.
  //
  //  Agora cada navegador guarda a impressão digital do que combinou com
  //  o banco por último, chave a chave (`conhecido`): o que mandou, ou o
  //  que conferiu que era igual. Antes de mandar uma chave, olha o banco:
  //    • igual ao meu                        → não há o que mandar;
  //    • vazio, ou igual ao que eu conhecia  → a mudança é minha: mando;
  //    • mudou por outra mão (ou eu nunca conversei com ele) e é
  //      diferente do meu                    → NÃO mando. A parte fica
  //      pausada, o 📡 fica âmbar, e quem decide é o mestre.
  const CONHECIDO_KEY = 'grifosAlados.syncConhecido';
  let conhecido = {};         // sala → { chave: digital do que ESTE navegador combinou com o banco }
  try { conhecido = JSON.parse(localStorage.getItem(CONHECIDO_KEY) || '{}') || {}; } catch (e) { conhecido = {}; }
  let banco = null;           // mesas/<sala>/dados como está agora (null = a primeira foto ainda não chegou)
  let metaBanco = null;       // mesas/<sala>/meta — só para dizer QUANDO foi a última publicação
  let conflitos = {};         // chave → true: pausada, esperando o mestre decidir
  const emVoo = new Set();    // chaves com escrita minha ainda sem resposta
  let abriuSozinho = '';      // sala em que o modal já se abriu sozinho por conflito

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
      // o app é um só para o site inteiro (o mesa.js pode já ter criado)
      if (!(firebase.apps && firebase.apps.length)) firebase.initializeApp(window.GA_FIREBASE);
      db = firebase.database();
      // Conta e papel são assunto do mesa.js: aqui só se escuta. Só
      // transmite quem é MESTRE ou AUXILIAR desta sala — um espectador
      // logado não pode publicar a mesa dos outros.
      if (window.GA_Mesa) {
        window.GA_Mesa.aoMudar(e => {
          const antes = podeTransmitir;
          usuario = e.usuario;
          podeTransmitir = e.transmite;
          papelAqui = e.papel;
          ligarInventario();          // trocou de campanha? a escuta segue junto
          ligarBanco();               // e a do que está no banco, que vem ANTES de mandar
          atualizarBotao();
          // virou mestre → foto completa. Desde 15/09/2026 ela espera a
          // primeira foto do banco e é conferida chave a chave (a TRAVA)
          if (podeTransmitir && !antes) enviarTudo();
        });
      }
      ligarInventario();
      inicializado = true;
    } catch (e) {
      ultimoErro = e.message;
      console.warn('[sync] Firebase não inicializou:', e.message);
    }
  }

  // "Inventário dos jogadores" (caixa livre, escrita por eles em
  // jogadores.html — ver sync-jogador.js) é um espelho à parte, fora do
  // pacote normal de 'bases': só quem é membro toca nele, então isolamos
  // a escrita deles aqui e só ESCUTAMOS (leitura é pública nas regras).
  //  A escuta é presa a UMA sala; trocar de campanha tem de mudar a
  //  escuta junto, senão o mestre continuaria vendo o inventário da mesa
  //  anterior.
  let salaEscutada = '', refInv = null, cbInv = null;
  function ligarInventario() {
    const s = sala();
    if (!db || s === salaEscutada) return;
    if (refInv && cbInv) { try { refInv.off('value', cbInv); } catch (e) {} }
    salaEscutada = s;
    refInv = db.ref('mesas/' + s + '/jogadores/inventario');
    cbInv = refInv.on('value', snap => aplicarInventarioJogadores(snap.val() || {}),
      err => console.warn('[sync] leitura de inventário dos jogadores:', err && err.message));
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
    window.GA_guardar(CHAVE_INV_JOGADORES, v);

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

  // O que está marcado "só o mestre vê" (visivelJogadores: false) NUNCA sai
  // daqui — filtrado antes mesmo de virar pacote para o Firebase. Não é só
  // esconder na tela: o jogador não tem como inspecionar o que nunca chegou
  // até o banco dele. Vale para bases inteiras, viagens inteiras e, dentro
  // de uma viagem visível, para cada linha do diário e cada parada.
  const visivel = x => x && x.visivelJogadores !== false;

  //  ── A LOJA EXIBIDA, NÃO O ARMARINHO INTEIRO (18/09/2026) ────────
  //  O `lojaLog` guarda TODAS as lojas que o mestre já rolou, com item,
  //  descrição e encanto de cada uma — na mesa do Caique eram 756 KB em
  //  5 lojas (três delas com 206 KB). E ele ia inteiro para o banco.
  //
  //  O problema não é o tamanho guardado, é que os dois lados escutam o
  //  nó PAI (`mesas/<sala>/dados`), e no Realtime Database ler um nó traz
  //  tudo o que está embaixo. Ou seja: cada vez que QUALQUER pessoa abria
  //  o site — mestre ou jogador — baixava 756 KB de histórico só para ver
  //  a loja da vez. Seis pessoas, seis aberturas por sessão: ~27 MB por
  //  sessão, por mesa.
  //
  //  E os jogadores nunca viram esse histórico: a edição deles mostra só
  //  a loja EXIBIDA (o "Gerar nova loja" e o histórico são do mestre).
  //  Então manda-se só a exibida, numa lista de um item só — que é a
  //  forma que o `loja.js` do outro lado já sabe ler, sem mudar nada lá:
  //  o `entradaSelecionada()` procura o id do `lojaLogSel` e, não achando,
  //  cai no primeiro da lista, que aqui é o único.
  //
  //  O histórico continua inteiro no navegador do mestre, como sempre.
  function lojaExibida(v) {
    const log = JSON.parse(v);
    if (!Array.isArray(log) || !log.length) return v;
    let sel = null;
    try { sel = localStorage.getItem(CHAVES.lojaLogSel); } catch (e) {}
    // o `_log` do loja.js é unshift: o [0] é a mais nova, e é também o
    // que o entradaSelecionada() escolhe quando não há seleção
    const atual = log.filter(l => l && l.id === sel)[0] || log[0];
    return JSON.stringify(atual ? [atual] : []);
  }

  function valorParaEnviar(nome, v) {
    if (v == null) return v;
    if (nome === 'lojaLog') {
      try { return lojaExibida(v); }
      catch (e) { console.warn('[sync] não deu para podar o histórico de lojas:', e.message); return v; }
    }
    if (nome !== 'bases' && nome !== 'viagens') return v;
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

  // O que este navegador mandaria de uma chave agora (já sem o 🙈).
  function valorLocal(nome) {
    let v = null;
    try { v = localStorage.getItem(CHAVES[nome]); } catch (e) {}
    return v == null ? null : valorParaEnviar(nome, v);
  }

  // ── A TRAVA, NA PRÁTICA ──────────────────────────────────────────
  //  FNV-1a de 32 bits mais o tamanho: basta para dizer "é o mesmo
  //  texto?" sem guardar no localStorage uma segunda cópia da loja.
  function digital(v) {
    if (v == null) return 'nulo';
    const s = String(v);
    let h = 0x811c9dc5;
    for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193); }
    return (h >>> 0).toString(36) + '.' + s.length;
  }
  function marcarConhecido(s, nome, valor) {
    (conhecido[s] || (conhecido[s] = {}))[nome] = digital(valor);
  }
  function guardarConhecido() {
    window.GA_guardar(CONHECIDO_KEY, JSON.stringify(conhecido));
  }

  //  'igual'    o banco já tem o que eu mandaria;
  //  'livre'    a diferença é MINHA: o banco está vazio, ou não mudou
  //             desde o que eu conhecia — pode mandar;
  //  'conflito' o banco mudou por outra mão, ou este navegador nunca
  //             conversou com ele, e está diferente do meu. Não se manda.
  //  Mandar um VAZIO por cima de algo que existe é sempre conflito: é o
  //  navegador novo apagando a loja dos jogadores.
  function estadoDaChave(nome) {
    const local = valorLocal(nome);
    const remoto = banco ? banco[nome] : null;
    const dr = digital(remoto);
    if (digital(local) === dr) return 'igual';
    if (remoto == null) return 'livre';
    if (local == null) return 'conflito';
    const dk = (conhecido[sala()] || {})[nome];
    return (dk && dk === dr) ? 'livre' : 'conflito';
  }

  // A escuta do que está no banco da sala transmitida — é com ela que se
  // sabe o que está lá ANTES de mandar qualquer coisa. `meta` é público,
  // e `dados` também (é o que os jogadores leem).
  let salaBanco = '', refBanco = null, cbBanco = null, refMeta = null, cbMeta = null;
  function ligarBanco() {
    if (!db || !podeTransmitir) return desligarBanco();
    const s = sala();
    if (s === salaBanco) return;
    desligarBanco();
    salaBanco = s;
    refBanco = db.ref('mesas/' + s + '/dados');
    cbBanco = refBanco.on('value', snap => { banco = snap.val() || {}; conferirBanco(); },
      err => console.warn('[sync] leitura dos dados da mesa:', err && err.message));
    refMeta = db.ref('mesas/' + s + '/meta');
    cbMeta = refMeta.on('value', snap => { metaBanco = snap.val() || {}; atualizarBotao(); },
      err => console.warn('[sync] leitura do meta da mesa:', err && err.message));
  }
  function desligarBanco() {
    if (refBanco && cbBanco) { try { refBanco.off('value', cbBanco); } catch (e) {} }
    if (refMeta && cbMeta) { try { refMeta.off('value', cbMeta); } catch (e) {} }
    refBanco = cbBanco = refMeta = cbMeta = null;
    salaBanco = ''; banco = null; metaBanco = null; conflitos = {};
    emVoo.clear();
  }

  // A cada foto do banco: o que ficou igual vira conhecido, o que mudou
  // por outra mão pausa, e o que esperava a primeira foto sai agora.
  function conferirBanco() {
    if (!banco || !podeTransmitir) return;
    const s = sala();
    let mudou = false;
    Object.keys(CHAVES).forEach(nome => {
      // o eco da minha própria escrita ainda não é a resposta do banco:
      // quem marca o conhecido dela é a promessa, quando voltar
      if (emVoo.has(nome)) return;
      const e = estadoDaChave(nome);
      if (e === 'igual') {
        delete conflitos[nome];
        if ((conhecido[s] || {})[nome] !== digital(banco[nome])) { marcarConhecido(s, nome, banco[nome]); mudou = true; }
      } else if (e === 'conflito') {
        conflitos[nome] = true;
      }
    });
    if (mudou) guardarConhecido();
    if (pendentes.size) enviarPendentes();
    atualizarBotao();
    avisarConflito();
  }

  function enviarPendentes() {
    if (!db || !podeTransmitir || !pendentes.size) return;
    // o banco ainda não disse o que tem: espera a primeira foto dele
    // (o conferirBanco chama de novo quando ela chegar)
    if (!banco) return;
    const s = sala();
    const pacote = {};
    pendentes.forEach(nome => {
      const e = estadoDaChave(nome);
      if (e === 'livre') pacote[nome] = valorLocal(nome);
      else if (e === 'conflito') conflitos[nome] = true;
    });
    pendentes.clear();
    atualizarBotao();
    if (Object.keys(pacote).length) mandar(s, pacote);
    avisarConflito();
  }

  function mandar(s, pacote) {
    const nomes = Object.keys(pacote);
    nomes.forEach(n => emVoo.add(n));
    db.ref('mesas/' + s + '/dados').update(pacote)
      .then(() => {
        nomes.forEach(n => { emVoo.delete(n); marcarConhecido(s, n, pacote[n]); delete conflitos[n]; });
        guardarConhecido();
        return db.ref('mesas/' + s + '/meta').update({
          atualizadoEm: firebase.database.ServerValue.TIMESTAMP,
        });
      })
      .then(() => { ultimoEnvio = new Date(); ultimoErro = ''; atualizarBotao(); })
      .catch(e => {
        nomes.forEach(n => emVoo.delete(n));
        ultimoErro = e.message;
        atualizarBotao();
        console.warn('[sync] envio falhou:', e.message);
      });
  }

  function enviarTudo() {
    Object.keys(CHAVES).forEach(n => pendentes.add(n));
    enviarPendentes();
  }

  // "📤 Mandar a daqui por cima": a decisão do mestre, com todas as
  // letras, de que a cópia deste navegador vale mais que a do banco. É o
  // único caminho que atravessa um conflito.
  function mandarPorCima() {
    if (!db || !podeTransmitir || !banco) return;
    const s = sala();
    const pacote = {};
    Object.keys(conflitos).forEach(nome => { pacote[nome] = valorLocal(nome); });
    conflitos = {};
    if (Object.keys(pacote).length) mandar(s, pacote);
    atualizarBotao();
  }

  // O modal abre SOZINHO, uma vez por sala, quando a pausa aparece: um
  // âmbar no canto passaria despercebido, e é justo a hora em que o
  // mestre acha que está transmitindo.
  function avisarConflito() {
    if (!Object.keys(conflitos).length || abriuSozinho === sala()) return;
    if (document.querySelector('.ga-modal-overlay')) return;   // outro modal aberto: o âmbar espera
    abriuSozinho = sala();
    abrirModal();
  }

  const PARTES = [
    { nome: '🏪 Loja',    chaves: ['lojaLog', 'lojaLogSel', 'lojaComunidade'] },
    { nome: '🏰 Bases',   chaves: ['bases'] },
    { nome: '🐎 Viagens', chaves: ['viagens'] },
  ];
  function partesEmConflito() {
    return PARTES.filter(p => p.chaves.some(k => conflitos[k])).map(p => ({
      nome: p.nome,
      vazia: p.chaves.filter(k => conflitos[k]).every(k => valorLocal(k) == null),
    }));
  }
  function quandoFoi() {
    const t = metaBanco && metaBanco.atualizadoEm;
    if (!t) return '';
    try {
      const d = new Date(t);
      return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }) + ' às ' +
             d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    } catch (e) { return ''; }
  }

  // ── Gatilho: qualquer salvar() das abas passa pelo setItem ───────
  const setItemOriginal = Storage.prototype.setItem;
  Storage.prototype.setItem = function (k, v) {
    setItemOriginal.apply(this, arguments);
    try {
      if (this === window.localStorage && NOME_POR_CHAVE[k] && podeTransmitir) {
        pendentes.add(NOME_POR_CHAVE[k]);
        // Trocar de loja no histórico muda só o `lojaLogSel` no
        // localStorage — mas, desde que só a loja EXIBIDA viaja, o que
        // vai no `lojaLog` DEPENDE dessa seleção. Sem isto, o mestre
        // trocaria a loja da vitrine e os jogadores continuariam vendo
        // a anterior, sem nada parecer errado de nenhum dos dois lados.
        if (NOME_POR_CHAVE[k] === 'lojaLogSel') pendentes.add('lojaLog');
        clearTimeout(timer);
        timer = setTimeout(enviarPendentes, 2500);   // junta rajadas de edição
      }
    } catch (e) {}
  };

  // ── Botão flutuante 📡 + modal de controle ───────────────────────
  function estado() {
    if (!temConfig()) return 'config';
    if (!usuario) return 'off';
    if (!podeTransmitir) return 'sempapel';
    if (Object.keys(conflitos).length) return 'conflito';
    if (ultimoErro) return 'erro';
    return 'on';
  }

  function atualizarBotao() {
    const btn = document.getElementById('gaSyncBtn');
    if (!btn) return;
    const e = estado();
    btn.className = 'ga-sync-btn ga-sync-btn--' + e;
    btn.title = {
      config:   'Mesa ao vivo — falta configurar o Firebase (clique para ver como)',
      off:      'Mesa ao vivo — desconectado (clique para entrar com o Google)',
      sempapel: 'Mesa ao vivo — você não mestra esta campanha (clique para escolher a sua)',
      on:       'Mesa ao vivo — transmitindo para os jogadores' + (ultimoEnvio ? ' · último envio ' + ultimoEnvio.toLocaleTimeString('pt-BR') : ''),
      erro:     'Mesa ao vivo — erro no último envio: ' + ultimoErro,
      conflito: 'Mesa ao vivo — PAUSADA em parte: o banco tem uma versão que não saiu deste navegador (clique para decidir)',
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
        <p class="ga-sync-p">Entre com a sua conta do <strong>Google</strong> para mestrar uma
          campanha e transmitir para os seus jogadores. Não há cadastro nem senha nova:
          quem escreve o nome da campanha vira o mestre dela.</p>
        ${ultimoErro ? `<p class="ga-sync-erro">⚠ ${esc(ultimoErro)}</p>` : ''}
        <div class="ga-modal-acoes"><button class="ga-btn-principal" data-sync-entrar>🔑 Entrar com o Google</button></div>`;
    }

    // as campanhas dele, para trocar sem sair do modal
    const minhas = window.GA_Mesa ? window.GA_Mesa.minhasMesas() : {};
    const chips = Object.keys(minhas).map(id =>
      `<button type="button" class="ga-sync-chip${id === sala() ? ' ga-sync-chip--atual' : ''}"
        data-sync-abrir="${esc(id)}">${esc(minhas[id] || id)}</button>`).join('');

    const criar = `
      <label class="ga-sync-campo">Nova campanha
        <input type="text" id="gaSyncNovaCamp" placeholder="Purista">
        <span class="ga-sync-mini">escreveu o nome, você é o mestre — e o link deles vira
          jogadores.html?sala=<em>esse nome</em></span></label>
      ${chips ? `<div class="ga-sync-chips">${chips}</div>` : ''}
      <div class="ga-modal-acoes"><button class="ga-btn-principal" data-sync-criar>🎩 Criar e mestrar</button></div>`;

    if (!podeTransmitir) {
      return cab + `
        <p class="ga-sync-p">Você está como <strong>${esc(usuario.email || 'você')}</strong>, mas
          ${papelAqui ? 'nesta campanha o seu papel é <strong>' + esc(papelAqui) + '</strong>'
                      : 'não mestra a campanha <strong>' + esc(sala()) + '</strong>'} —
          então não há o que transmitir daqui.</p>
        <p class="ga-sync-p ga-sync-p--dica">Escolha uma campanha sua abaixo, ou crie a sua.</p>
        ${criar}
        ${ultimoErro ? `<p class="ga-sync-erro">⚠ ${esc(ultimoErro)}</p>` : ''}
        <div class="ga-modal-acoes"><button class="ga-btn-sec" data-sync-sair>Sair da conta</button></div>`;
    }

    // A TRAVA, na tela: o que está pausado, desde quando, e o que custa
    // mandar a daqui — dito antes do botão, e não depois do estrago.
    const partes = partesEmConflito();
    const quando = quandoFoi();
    const blocoConflito = partes.length ? `
      <div class="ga-sync-conflito">
        <p class="ga-sync-p"><strong>⚠ Parte da transmissão está pausada.</strong> O banco da campanha
          <strong>${esc(sala())}</strong> tem uma versão que não saiu deste navegador${quando
            ? ' (a última publicação lá foi em <strong>' + esc(quando) + '</strong>)' : ''}:</p>
        <ul class="ga-sync-lista">${partes.map(p => '<li><strong>' + p.nome + '</strong> — ' +
          (p.vazia ? 'aqui está <em>vazia</em>' : 'diferente da daqui') + '</li>').join('')}</ul>
        <p class="ga-sync-p">Acontece quando o site é aberto em outro navegador, em outro aparelho ou de outro
          endereço — o <code>index.html</code> do computador e o site publicado <strong>não</strong> dividem o
          que guardam, mas dividem o banco. <strong>Mandar a daqui substitui a de lá</strong>, e o que foi
          publicado de lá some da tela dos jogadores. O que estiver igual segue transmitindo normalmente.</p>
        <div class="ga-modal-acoes">
          <button class="ga-btn-sec" data-ga-fechar>Agora não</button>
          <button class="ga-btn-principal ga-sync-perigo" data-sync-por-cima>📤 Mandar a daqui por cima</button>
        </div>
      </div>` : '';

    return cab + blocoConflito + `
      <p class="ga-sync-p">${partes.length ? '📡 Conectado' : '✅ Transmitindo'} como <strong>${esc(usuario.displayName || usuario.email || 'mestre')}</strong>,
        campanha <strong>${esc(sala())}</strong>${papelAqui === 'auxiliar' ? ' (você é auxiliar)' : ''}.</p>
      <p class="ga-sync-p">O que os jogadores veem: a <strong>Loja</strong> exibida (com encantamentos
        e pergaminhos), as <strong>Bases</strong> e as <strong>Viagens</strong> — atualizado sozinho
        segundos depois de você mexer. Consultas eles já têm por serem regras.</p>
      <p class="ga-sync-p ga-sync-p--dica">Link deles: <code>jogadores.html?sala=${esc(sala())}</code>
        no endereço onde o site está publicado. Quem entra e sai, e quem é jogador ou espectador,
        se resolve na aba <strong>🎲 Mesa</strong>.</p>
      <p class="ga-sync-p">${ultimoEnvio ? 'Último envio: <strong>' + ultimoEnvio.toLocaleTimeString('pt-BR') + '</strong>' : 'Nenhum envio ainda nesta sessão.'}</p>
      ${ultimoErro ? `<p class="ga-sync-erro">⚠ ${esc(ultimoErro)}</p>` : ''}
      ${criar}
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
        ultimoErro = '';
        if (window.GA_Mesa) window.GA_Mesa.entrar();
        return;
      }
      if (e.target.closest('[data-sync-criar]')) {
        const nome = ((document.getElementById('gaSyncNovaCamp') || {}).value || '').trim();
        ultimoErro = '';
        if (nome && window.GA_Mesa) window.GA_Mesa.criarCampanha(nome);
        return;
      }
      const chip = e.target.closest('[data-sync-abrir]');
      if (chip) {
        if (window.GA_Mesa) window.GA_Mesa.abrirMesa(chip.dataset.syncAbrir);
        atualizarBotao();
        return;
      }
      if (e.target.closest('[data-sync-sair]')) {
        if (window.GA_Mesa) window.GA_Mesa.sair();
        return;
      }
      if (e.target.closest('[data-sync-enviar]')) {
        enviarTudo();
        return;
      }
      if (e.target.closest('[data-sync-por-cima]')) {
        mandarPorCima();
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
