// ═══════════════════════════════════════════════════════════════════
//  MESA.JS — a aba 🎲 Mesa: campanhas, salas, papéis e pedidos
//  Carregado nas DUAS páginas (index.html e jogadores.html) — o que
//  muda é o que cada papel enxerga, não o arquivo.
//
//  É o dono da conta e da sala: quem quiser saber "quem sou eu", "qual
//  a minha mesa" ou "posso escrever?" pergunta ao GA_Mesa, e não ao
//  Firebase direto. O sync-mestre.js e o sync-jogador.js fazem isso.
//
//  Papel de cada um vem do banco, em `mesas/<mesa>/membros/<uid>`:
//    • mestre  — transmite, mexe na mesa, tira quem não devia estar;
//    • jogador — escreve nas caixas que são deles;
//    • ninguém — lê a gazeta, a loja e as bases (isso continua aberto).
//  Numa mesa de PORTA ABERTA (o padrão), quem entra com o Google vira
//  jogador num clique. Numa mesa fechada, pede e o mestre aprova aqui.
//  Ninguém mexe em regra de banco para incluir gente — era assim até
//  08/09/2026 e doía.
//
//  E QUALQUER PESSOA LOGADA cria a própria campanha e a própria mesa,
//  virando mestre dela. Não há dono do site: há dono de cada mesa.
//
//  A sala é a mesma de sempre: `?sala=` no link dos jogadores,
//  localStorage['grifosAlados.syncSala'] no lado do mestre. Uma mesa
//  nova é só um id novo nesse mesmo lugar.
// ═══════════════════════════════════════════════════════════════════
(function () {
  'use strict';

  const esc = window.GA_esc;
  const SALA_KEY = 'grifosAlados.syncSala';

  // ── QUEM CRIA ────────────────────────────────────────────────────
  //  Qualquer pessoa logada. Entrou com o Gmail, cria a campanha dela,
  //  escolhe o nome da sala e manda o link — e aquela mesa é dela, com
  //  ela de mestre. Ninguém aprova ninguém para MESTRAR; o dono da mesa
  //  é quem a criou (`dono`), e a regra do banco não deixa outro escrever.
  //  Foi decidido assim em 08/09/2026, trocando o desenho anterior (uma
  //  lista de uid autorizados) por menos burocracia: ver
  //  docs/mesa-de-verdade.md §12.
  //  O preço é o nome da sala ser primeiro-a-chegar: dois mestres não
  //  podem ter salas com o mesmo id.

  let est = {
    pronto:    false,   // o Firebase já disse se havia sessão salva
    usuario:   null,
    papel:     null,    // 'mestre' | 'jogador' | null
    membros:   {},
    pedidos:   {},      // só o mestre enxerga
    meuPedido: null,
    mesa:      null,    // { nome, campanhaId }
    campanhas: {},
    mesas:     {},
    erro:      '',
    aviso:     '',
  };

  const ouvintes = [];
  function avisar() {
    ouvintes.forEach(fn => { try { fn(estado()); } catch (e) { console.warn('[mesa] ouvinte:', e && e.message); } });
    render();
  }

  // ── FIREBASE (um app só para o site inteiro) ─────────────────────
  // O sync-mestre e o sync-jogador também inicializam; initializeApp
  // duas vezes estoura, então todo mundo passa por aqui.
  function temConfig() {
    return typeof firebase !== 'undefined' && window.GA_FIREBASE && window.GA_FIREBASE.apiKey;
  }
  function app() {
    if (!temConfig()) return null;
    return firebase.apps && firebase.apps.length ? firebase.app() : firebase.initializeApp(window.GA_FIREBASE);
  }
  let _db = null, _auth = null;
  function db()   { if (!_db   && app()) _db   = firebase.database(); return _db; }
  function auth() { if (!_auth && app() && firebase.auth) _auth = firebase.auth(); return _auth; }

  // ── QUAL É A MESA ────────────────────────────────────────────────
  // Na página dos jogadores manda o link (?sala=); na do mestre, o que
  // ele escolheu por último. É exatamente o que já era antes da aba.
  function mesaId() {
    if (window.GA_ehJogador && window.GA_ehJogador()) {
      const s = (new URLSearchParams(location.search).get('sala') || '').trim();
      return s || 'mesa';
    }
    let s = '';
    try { s = (localStorage.getItem(SALA_KEY) || '').trim(); } catch (e) {}
    return s || 'mesa';
  }
  function linkDosJogadores(id) {
    try { return new URL('jogadores.html?sala=' + encodeURIComponent(id || mesaId()), location.href).href; }
    catch (e) { return 'jogadores.html?sala=' + (id || mesaId()); }
  }

  // Id legível a partir do nome, como as campanhas das Notícias fazem
  // ("Nuevo Sol" → "nuevo-sol"). É ele que vai no link da mesa.
  function idDe(nome, jaUsados) {
    const base = String(nome || '').normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')                    // tira acentos
      .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'mesa';
    let id = base, n = 2;
    while (jaUsados && jaUsados[id]) id = base + '-' + (n++);
    return id;
  }

  // ── ASSINATURAS ──────────────────────────────────────────────────
  // Cada login refaz as assinaturas: o que se pode LER depende de quem
  // está entrando. Guardamos para poder desligar.
  let refs = [];
  function desligar() {
    refs.forEach(r => { try { r.ref.off('value', r.cb); } catch (e) {} });
    refs = [];
  }
  function ligar(caminho, cb, comErro) {
    const b = db(); if (!b) return;
    const ref = b.ref(caminho);
    const fn = ref.on('value', snap => { cb(snap.val()); avisar(); },
      err => {
        // "sem permissão" aqui é resposta, não falha: quer dizer que
        // esta pessoa não é dessa parte da mesa.
        if (comErro) comErro(err);
        console.warn('[mesa] ' + caminho + ':', err && err.message);
      });
    refs.push({ ref: ref, cb: fn });
  }

  function assinar() {
    desligar();
    const id = mesaId();
    est.membros = {}; est.pedidos = {}; est.meuPedido = null; est.papel = null;
    est.mesa = null; est.campanhas = {}; est.mesas = {};
    Object.keys(nomesLigados).forEach(k => delete nomesLigados[k]);

    // Estes quatro são públicos de propósito: quem cai no link precisa
    // saber onde caiu e se a porta está aberta ANTES de entrar em conta
    // nenhuma. Nada aqui é conteúdo de jogo — é a placa na porta.
    ligar('mesas/' + id + '/nome',         v => { est.mesa = Object.assign({}, est.mesa, { nome: v }); });
    ligar('mesas/' + id + '/campanhaId',   v => { est.mesa = Object.assign({}, est.mesa, { campanhaId: v }); });
    ligar('mesas/' + id + '/entradaLivre', v => { est.mesa = Object.assign({}, est.mesa, { entradaLivre: v === true }); });
    ligar('mesas/' + id + '/dono',         v => { est.mesa = Object.assign({}, est.mesa, { dono: v }); });
    ligar('campanhas', v => { est.campanhas = v || {}; nomesDasMesas(); });

    const u = est.usuario;
    if (!u) return;

    // "eu sou membro?" — cada um lê o próprio nó, sempre
    ligar('mesas/' + id + '/membros/' + u.uid, v => {
      est.papel = (v && v.papel) || null;
      if (est.papel) { est.meuPedido = null; assinarDeMembro(id); }
    });
    ligar('mesas/' + id + '/pedidos/' + u.uid, v => { est.meuPedido = v || null; });
  }

  // O que só quem já está na mesa consegue ler.
  let membrosLigado = '';
  function assinarDeMembro(id) {
    if (membrosLigado === id + '/' + est.papel) return;
    membrosLigado = id + '/' + est.papel;
    ligar('mesas/' + id + '/membros', v => { est.membros = v || {}; });
    if (est.papel !== 'mestre') return;
    ligar('mesas/' + id + '/pedidos', v => { est.pedidos = v || {}; });
  }

  // A lista de mesas do seletor sai do ÍNDICE que cada campanha guarda
  // (`campanhas/<c>/mesas`), e o nome vem de `mesas/<m>/nome`, que é
  // público. Assinar `mesas` inteiro seria pedir para ler a árvore toda
  // — fichas e rolagens de todas as mesas junto —, e não é isso que a
  // aba precisa saber.
  const nomesLigados = {};
  function nomesDasMesas() {
    Object.keys(est.campanhas || {}).forEach(cid => {
      const idx = (est.campanhas[cid] || {}).mesas || {};
      Object.keys(idx).forEach(mid => {
        if (nomesLigados[mid]) return;
        nomesLigados[mid] = true;
        ligar('mesas/' + mid + '/nome', v => { est.mesas[mid] = { nome: v || mid, campanhaId: cid }; });
      });
    });
  }

  // ── ENTRAR E SAIR ────────────────────────────────────────────────
  const MSG_LOGIN = {
    'auth/popup-blocked': 'o navegador bloqueou a janela do Google — libere os pop-ups deste site e tente de novo',
    'auth/unauthorized-domain': 'este endereço não está autorizado no Firebase — avise o mestre',
    'auth/operation-not-allowed': 'o login com o Google ainda não foi ligado no Firebase — avise o mestre',
    'auth/network-request-failed': 'sem conexão com o Google agora — tente daqui a pouco',
    'auth/account-exists-with-different-credential': 'já existe uma conta com este e-mail entrando por senha — use aquele login, ou avise o mestre',
  };

  function entrar() {
    const a = auth(); if (!a) return;
    est.erro = '';
    const prov = new firebase.auth.GoogleAuthProvider();
    prov.setCustomParameters({ prompt: 'select_account' });
    a.signInWithPopup(prov).catch(err => {
      const cod = (err && err.code) || '';
      if (cod === 'auth/popup-closed-by-user' || cod === 'auth/cancelled-popup-request') return;
      est.erro = MSG_LOGIN[cod] || ('não deu para entrar (' + (cod || (err && err.message) || 'erro') + ')');
      avisar();
    });
  }
  function sair() {
    const a = auth(); if (!a) return;
    est.erro = ''; est.aviso = '';
    a.signOut().catch(e => console.warn('[mesa] sair:', e && e.message));
  }

  function nomeDe(u) {
    return (u && (u.displayName || u.email)) || 'sem nome';
  }

  // ── PEDIR, APROVAR, RECUSAR ──────────────────────────────────────
  function pedir() {
    const b = db(), u = est.usuario; if (!b || !u) return;
    est.erro = '';
    b.ref('mesas/' + mesaId() + '/pedidos/' + u.uid).set({
      nome:   nomeDe(u),
      email:  u.email || '',
      quando: firebase.database.ServerValue.TIMESTAMP,
    }).then(() => { est.aviso = 'Pedido enviado. Agora é esperar o mestre aprovar.'; avisar(); })
      .catch(e => { est.erro = recado(e, 'não deu para enviar o pedido'); avisar(); });
  }

  function aprovar(uid, papel) {
    const b = db(); if (!b || !uid) return;
    const p = est.pedidos[uid] || {};
    // as duas escritas numa só: entra em membros e sai dos pedidos
    const patch = {};
    patch['membros/' + uid] = {
      nome:  p.nome || p.email || uid,
      papel: papel === 'mestre' ? 'mestre' : 'jogador',
      desde: firebase.database.ServerValue.TIMESTAMP,
    };
    patch['pedidos/' + uid] = null;
    b.ref('mesas/' + mesaId()).update(patch)
      .catch(e => { est.erro = recado(e, 'não deu para aprovar'); avisar(); });
  }
  function recusar(uid) {
    const b = db(); if (!b || !uid) return;
    b.ref('mesas/' + mesaId() + '/pedidos/' + uid).remove()
      .catch(e => { est.erro = recado(e, 'não deu para recusar'); avisar(); });
  }
  function mudarPapel(uid, papel) {
    const b = db(); if (!b || !uid) return;
    b.ref('mesas/' + mesaId() + '/membros/' + uid + '/papel').set(papel)
      .catch(e => { est.erro = recado(e, 'não deu para trocar o papel'); avisar(); });
  }
  function remover(uid) {
    const b = db(); if (!b || !uid) return;
    b.ref('mesas/' + mesaId() + '/membros/' + uid).remove()
      .catch(e => { est.erro = recado(e, 'não deu para remover'); avisar(); });
  }

  // ── CRIAR CAMPANHA E MESA (só o dono) ────────────────────────────
  function podeCriar() { return !!est.usuario; }
  // Mesa órfã é a que não tem `dono` — as de antes desta aba, e os nomes
  // de sala que ninguém usou ainda. Quem chegar logado pode assumi-la.
  //  O sinal tem de ser PÚBLICO: `membros` só quem já está na mesa lê, e
  //  para quem está de fora ele vem sempre vazio — deduzir "sem mestre"
  //  dali fazia o botão de assumir aparecer para qualquer estranho, em
  //  cima de mesa cheia. O `dono` é lido por todos, justamente para isto.
  function podeAssumir() { return !!est.usuario && !(est.mesa && est.mesa.dono); }

  function criarCampanha(nome) {
    const b = db(), u = est.usuario; if (!b || !u || !nome) return;
    const id = idDe(nome, est.campanhas);
    b.ref('campanhas/' + id).set({
      nome: nome, dono: u.uid, criadaEm: firebase.database.ServerValue.TIMESTAMP,
    }).catch(e => { est.erro = recado(e, 'não deu para criar a campanha'); avisar(); });
  }

  //  `id` é o nome da sala que vai no link — quem escolhe é o mestre, e
  //  vale primeiro a chegar. Se já existir, o banco recusa e a gente diz
  //  isso com todas as letras em vez de deixar ele achar que criou.
  function criarMesa(nome, campanhaId, idEscolhido) {
    const b = db(), u = est.usuario; if (!b || !u || !nome) return;
    const id = idDe(idEscolhido || nome, null);
    const mesa = {
      nome: nome, campanhaId: campanhaId || '',
      dono: u.uid,
      entradaLivre: true,          // sem burocracia: quem tem o link entra
      criadaEm: firebase.database.ServerValue.TIMESTAMP,
      membros: {},
    };
    mesa.membros[u.uid] = { nome: nomeDe(u), papel: 'mestre', desde: firebase.database.ServerValue.TIMESTAMP };
    b.ref('mesas/' + id).set(mesa)
      .then(() => { if (campanhaId) b.ref('campanhas/' + campanhaId + '/mesas/' + id).set(true); })
      .then(() => abrirMesa(id))
      .catch(e => {
        est.erro = ehSemPermissao(e)
          ? 'a sala "' + id + '" já é de outra mesa — escolha outro nome'
          : recado(e, 'não deu para criar a mesa');
        avisar();
      });
  }
  function ehSemPermissao(e) {
    return (((e && (e.code || e.message)) || '') + '').toLowerCase().indexOf('permission') >= 0;
  }

  // Entrada livre: o jogador entra sozinho, com um clique, e o mestre vê
  // o nome dele aparecer na lista. É o caminho normal; a aprovação existe
  // para quem quiser fechar a mesa (ver `entradaLivre`).
  function entrarNaMesa() {
    const b = db(), u = est.usuario; if (!b || !u) return;
    b.ref('mesas/' + mesaId() + '/membros/' + u.uid).set({
      nome: nomeDe(u), papel: 'jogador', desde: firebase.database.ServerValue.TIMESTAMP,
    }).catch(e => { est.erro = recado(e, 'não deu para entrar na mesa'); avisar(); });
  }

  // Abre ou fecha a porta desta mesa.
  function mudarEntrada(livre) {
    const b = db(); if (!b) return;
    b.ref('mesas/' + mesaId() + '/entradaLivre').set(!!livre)
      .catch(e => { est.erro = recado(e, 'não deu para mudar a entrada'); avisar(); });
  }

  // Nome e campanha de uma mesa QUE JÁ EXISTE. O id da sala não muda —
  // ele está no link que os jogadores guardaram, e renomear seria puxar
  // o tapete deles. O nome é de tela; quem identifica é o id.
  function salvarMesa(nome, campanhaId) {
    const b = db(); if (!b) return;
    const id = mesaId();
    const antiga = (est.mesa && est.mesa.campanhaId) || '';
    const patch = {};
    patch['mesas/' + id + '/nome'] = nome || id;
    patch['mesas/' + id + '/campanhaId'] = campanhaId || null;
    // o índice da campanha é o que faz a mesa aparecer na lista dela
    if (campanhaId) patch['campanhas/' + campanhaId + '/mesas/' + id] = true;
    if (antiga && antiga !== campanhaId) patch['campanhas/' + antiga + '/mesas/' + id] = null;
    b.ref().update(patch)
      .then(() => { est.aviso = 'Mesa salva.'; avisar(); })
      .catch(e => { est.erro = recado(e, 'não deu para salvar a mesa'); avisar(); });
  }

  // Troca a mesa que este aparelho está usando (só faz sentido no lado
  // do mestre — do lado dos jogadores quem manda é o ?sala= do link).
  function abrirMesa(id) {
    if (!id) return;
    window.GA_guardar(SALA_KEY, id);
    membrosLigado = '';
    assinar();
    avisar();
  }

  // A mesa que já existia antes desta aba não tem membros, e a regra de
  // membros pede ser mestre — nó cego. O dono da casa pode reivindicar
  // uma mesa sem membros, e só ele; é a regra que garante.
  //  Em dois tempos, e a ordem importa: primeiro o `membros` (que a regra
  //  libera enquanto a mesa não tem ninguém), e só depois o `dono` e a
  //  porta — que exigem já ser mestre. Assumida, a mesa deixa de ser órfã
  //  e ninguém mais a toma.
  function reivindicar() {
    const b = db(), u = est.usuario, id = mesaId(); if (!b || !u) return;
    b.ref('mesas/' + id + '/membros/' + u.uid).set({
      nome: nomeDe(u), papel: 'mestre', desde: firebase.database.ServerValue.TIMESTAMP,
    })
      .then(() => b.ref('mesas/' + id).update({ dono: u.uid, entradaLivre: true }))
      .catch(e => { est.erro = recado(e, 'não deu para assumir a mesa'); avisar(); });
  }

  function recado(e, quando) {
    const m = ((e && (e.code || e.message)) || '').toString().toLowerCase();
    if (m.indexOf('permission') >= 0) return quando + ': o banco recusou. As regras já foram publicadas?';
    return quando + ': ' + ((e && e.message) || 'erro');
  }

  // ── O QUE OS OUTROS MÓDULOS PERGUNTAM ────────────────────────────
  function estado() {
    return {
      pronto:  est.pronto,
      usuario: est.usuario,
      papel:   est.papel,
      mesaId:  mesaId(),
      mesa:    est.mesa,
      souMembro: est.papel === 'mestre' || est.papel === 'jogador',
      souMestre: est.papel === 'mestre',
      temPedido: !!est.meuPedido,
      configurado: temConfig(),
    };
  }

  window.GA_Mesa = {
    estado: estado,
    app: app, db: db, auth: auth,
    mesaId: mesaId,
    link: linkDosJogadores,
    entrar: entrar, sair: sair, pedir: pedir,
    souMestre: () => est.papel === 'mestre',
    souMembro: () => est.papel === 'mestre' || est.papel === 'jogador',
    // avisa sempre que o login ou o papel mudarem (e uma vez, de saída)
    aoMudar: function (fn) {
      if (typeof fn !== 'function') return;
      ouvintes.push(fn);
      try { fn(estado()); } catch (e) {}
    },
  };

  // ═══ A ABA ════════════════════════════════════════════════════════

  function cartao(titulo, corpo, extra) {
    return '<div class="me-cartao' + (extra ? ' ' + extra : '') + '">' +
      (titulo ? '<h3 class="me-cartao-tit">' + titulo + '</h3>' : '') + corpo + '</div>';
  }

  function blocoConta() {
    if (!est.usuario) {
      return cartao('🔑 Sua conta', '' +
        '<p class="me-p">Ver a mesa não pede login. Para <strong>escrever</strong> — o inventário do' +
        ' grupo, a sua ficha, os seus dados — entre com a sua conta do Google.</p>' +
        '<div class="me-acoes"><button type="button" class="me-btn me-btn--principal" data-mesa="entrar">Entrar com o Google</button></div>' +
        (est.erro ? '<p class="me-erro">⚠ ' + esc(est.erro) + '</p>' : ''));
    }
    const u = est.usuario;
    const papel = est.papel === 'mestre' ? '<span class="me-selo me-selo--mestre">mestre</span>'
                : est.papel === 'jogador' ? '<span class="me-selo">jogador</span>'
                : '<span class="me-selo me-selo--fora">fora da mesa</span>';
    return cartao('🔑 Sua conta', '' +
      '<p class="me-p"><strong>' + esc(nomeDe(u)) + '</strong> ' + papel + '</p>' +
      // o uid aparece aqui de propósito: é o que vai nas regras do banco e
      // na lista de quem cria mesa, e ir buscá-lo no console do Firebase
      // toda vez é viagem à toa
      '<p class="me-mini">' + esc(u.email || '') + ' · <code>' + esc(u.uid) + '</code></p>' +
      '<div class="me-acoes"><button type="button" class="me-btn" data-mesa="sair">Sair</button></div>' +
      (est.erro ? '<p class="me-erro">⚠ ' + esc(est.erro) + '</p>' : '') +
      (est.aviso ? '<p class="me-aviso">' + esc(est.aviso) + '</p>' : ''));
  }

  function blocoEntrada() {
    if (!est.usuario || est.papel) return '';
    if (est.meuPedido) {
      return cartao('⏳ Pedido enviado', '<p class="me-p">O mestre precisa aprovar você nesta mesa. ' +
        'Assim que ele aprovar, esta página se atualiza sozinha — não precisa recarregar.</p>');
    }
    // mesa sem membro nenhum: quem chegar assume, em vez de pedir a quem
    // não existe. É o caso das salas anteriores a esta aba.
    if (podeAssumir()) {
      return cartao('🎩 Esta mesa ainda não tem mestre',
        '<p class="me-p">Ninguém a assumiu ainda. Assuma como mestre para começar — ' +
        'a partir daí ela é sua, e é o seu nome que manda nela.</p>' +
        '<div class="me-acoes"><button type="button" class="me-btn me-btn--principal" data-mesa="reivindicar">Assumir esta mesa</button></div>');
    }
    const nome = esc((est.mesa && est.mesa.nome) || mesaId());
    // porta aberta: entra com um clique. É o caminho normal.
    if (est.mesa && est.mesa.entradaLivre) {
      return cartao('🚪 Entrar nesta mesa',
        '<p class="me-p">A mesa <strong>' + nome + '</strong> está de porta aberta. ' +
        'Entre e o seu nome aparece na lista para todo mundo — inclusive para o mestre, ' +
        'que pode tirar você se for engano.</p>' +
        '<div class="me-acoes"><button type="button" class="me-btn me-btn--principal" data-mesa="entrar-mesa">Entrar nesta mesa</button></div>');
    }
    return cartao('✋ Pedir para entrar',
      '<p class="me-p">Você está vendo a mesa <strong>' + nome +
      '</strong> como visitante, e ela pede aprovação. Peça para entrar e o mestre aprova por aqui mesmo.</p>' +
      '<div class="me-acoes"><button type="button" class="me-btn me-btn--principal" data-mesa="pedir">Pedir para entrar</button></div>');
  }

  function blocoPedidos() {
    if (est.papel !== 'mestre') return '';
    const uids = Object.keys(est.pedidos || {});
    if (!uids.length) {
      return cartao('✋ Pedidos', '<p class="me-vazio">Ninguém esperando aprovação.</p>');
    }
    const linhas = uids.map(uid => {
      const p = est.pedidos[uid] || {};
      return '<li class="me-linha">' +
        '<span class="me-linha-nome">' + esc(p.nome || uid) + '<em>' + esc(p.email || '') + '</em></span>' +
        '<span class="me-linha-acoes">' +
          '<button type="button" class="me-btn me-btn--mini me-btn--principal" data-mesa="aprovar" data-uid="' + esc(uid) + '">aceitar como jogador</button>' +
          '<button type="button" class="me-btn me-btn--mini" data-mesa="aprovar-mestre" data-uid="' + esc(uid) + '">como mestre</button>' +
          '<button type="button" class="me-btn me-btn--mini me-btn--perigo" data-mesa="recusar" data-uid="' + esc(uid) + '">recusar</button>' +
        '</span></li>';
    }).join('');
    return cartao('✋ Pedidos <span class="me-cont">' + uids.length + '</span>', '<ul class="me-lista">' + linhas + '</ul>');
  }

  function blocoMembros() {
    if (!est.papel) return '';
    const uids = Object.keys(est.membros || {});
    if (!uids.length) return '';
    const souM = est.papel === 'mestre';
    const linhas = uids.map(uid => {
      const m = est.membros[uid] || {};
      const eu = est.usuario && uid === est.usuario.uid;
      const selo = m.papel === 'mestre' ? '<span class="me-selo me-selo--mestre">mestre</span>' : '<span class="me-selo">jogador</span>';
      let acoes = '';
      if (souM && !eu) {
        acoes = '<span class="me-linha-acoes">' +
          '<button type="button" class="me-btn me-btn--mini" data-mesa="papel" data-uid="' + esc(uid) + '" data-papel="' +
            (m.papel === 'mestre' ? 'jogador' : 'mestre') + '">tornar ' + (m.papel === 'mestre' ? 'jogador' : 'mestre') + '</button>' +
          '<button type="button" class="me-btn me-btn--mini me-btn--perigo" data-mesa="remover" data-uid="' + esc(uid) + '">tirar da mesa</button>' +
        '</span>';
      }
      // nome, "(você)" e selo na MESMA linha: empilhados viravam três
      // andares para dizer uma coisa só
      return '<li class="me-linha">' +
        '<span class="me-linha-nome me-linha-nome--deitada">' +
          esc(m.nome || uid) + (eu ? ' <em>(você)</em>' : '') + ' ' + selo +
        '</span>' + acoes +
      '</li>';
    }).join('');
    return cartao('🧑‍🤝‍🧑 Quem está na mesa <span class="me-cont">' + uids.length + '</span>',
      '<ul class="me-lista">' + linhas + '</ul>');
  }

  function blocoLink() {
    if (est.papel !== 'mestre') return '';
    const l = linkDosJogadores();
    const livre = !!(est.mesa && est.mesa.entradaLivre);
    return cartao('🔗 O link desta mesa',
      '<p class="me-p">Mande para os seus jogadores. Quem abrir vê a gazeta, a loja e as bases na hora; ' +
      'para escrever, entra com o Google' +
      (livre ? ' e já entra na mesa por um clique.' : ' e pede para entrar aqui na aba.') + '</p>' +
      '<p class="me-link"><code>' + esc(l) + '</code>' +
      '<button type="button" class="me-btn me-btn--mini" data-mesa="copiar" data-link="' + esc(l) + '">copiar</button></p>');
  }

  // Opções de campanha para os <select> — sempre com a saída "nenhuma",
  // porque uma mesa pode viver fora de campanha (e as duas primeiras
  // deste projeto nasceram assim, antes de a aba existir).
  //  Só as campanhas de quem está logado: pôr uma mesa na campanha de
  //  outra pessoa não é oferta que faça sentido, e o banco recusaria.
  function opcoesDeCampanha(selecionada) {
    const camps = est.campanhas || {};
    const meu = est.usuario ? est.usuario.uid : '';
    return '<option value="">— sem campanha —</option>' +
      Object.keys(camps)
        .filter(cid => (camps[cid] || {}).dono === meu || cid === selecionada)
        .map(cid => '<option value="' + esc(cid) + '"' +
          (cid === selecionada ? ' selected' : '') + '>' +
          esc((camps[cid] || {}).nome || cid) + '</option>').join('');
  }

  // Esta mesa: nome e campanha. Vale para QUALQUER mestre da mesa — quem
  // mestra uma sala pode batizá-la —, e não só para o dono da casa.
  function blocoEstaMesa() {
    if (est.papel !== 'mestre') return '';
    const id = mesaId();
    const nome = (est.mesa && est.mesa.nome) || '';
    const livre = !!(est.mesa && est.mesa.entradaLivre);
    return cartao('✒ Esta mesa',
      '<div class="me-form">' +
        '<label class="me-campo">Nome<input type="text" id="meNomeMesa" value="' + esc(nome) +
          '" placeholder="' + esc(id) + '"></label>' +
        '<label class="me-campo me-campo--sel">Campanha<select id="meCampDaMesa">' +
          opcoesDeCampanha((est.mesa && est.mesa.campanhaId) || '') + '</select></label>' +
        '<button type="button" class="me-btn me-btn--principal" data-mesa="salvar-mesa">Salvar</button>' +
      '</div>' +
      '<p class="me-mini">O id da sala continua <code>' + esc(id) + '</code> e não muda: ' +
      'ele está no link que os seus jogadores já guardaram. O nome é só de tela.</p>' +
      '<div class="me-form">' +
        '<span class="me-campo">Entrada</span>' +
        '<button type="button" class="me-chip' + (livre ? ' me-chip--atual' : '') +
          '" data-mesa="entrada" data-livre="1">🚪 Porta aberta</button>' +
        '<button type="button" class="me-chip' + (livre ? '' : ' me-chip--atual') +
          '" data-mesa="entrada" data-livre="">✋ Com aprovação</button>' +
      '</div>' +
      '<p class="me-mini">' + (livre
        ? 'Quem abrir o link e entrar com o Google já entra como jogador. Você vê o nome na lista e pode tirar quem não devia estar.'
        : 'Quem abrir o link precisa pedir, e você aprova aqui. Mais trabalho, e a porta fica fechada para quem repassou o link.') +
      '</p>');
  }

  // O painel de quem MESTRA: as campanhas dela, as mesas de cada uma, e
  // os dois formulários de criar. Vale para qualquer pessoa logada — é
  // por aqui que alguém que nunca teve mesa cria a primeira.
  function blocoSalas() {
    if (!podeCriar()) return '';
    const u = est.usuario;
    const todas = est.campanhas || {};
    // as campanhas DELA; as dos outros existem no banco e não são da conta
    const idsC = Object.keys(todas).filter(cid => (todas[cid] || {}).dono === u.uid);
    const atual = mesaId();

    let listaC = idsC.length
      ? '<ul class="me-lista">' + idsC.map(cid => {
          const c = todas[cid] || {};
          const mesasDaCamp = Object.keys(est.mesas || {}).filter(mid => (est.mesas[mid] || {}).campanhaId === cid);
          const itens = mesasDaCamp.length
            ? mesasDaCamp.map(mid => '<button type="button" class="me-chip' + (mid === atual ? ' me-chip--atual' : '') +
                '" data-mesa="abrir" data-id="' + esc(mid) + '">' + esc((est.mesas[mid] || {}).nome || mid) + '</button>').join('')
            : '<span class="me-mini">nenhuma mesa ainda</span>';
          return '<li class="me-linha me-linha--camp"><span class="me-linha-nome">' + esc(c.nome || cid) +
            '<em>' + esc(cid) + '</em></span><span class="me-chips">' + itens + '</span></li>';
        }).join('') + '</ul>'
      : '<p class="me-vazio">Nenhuma campanha sua ainda. A primeira é o mundo onde tudo acontece.</p>';

    // A mesa aberta pode não estar no índice de campanha nenhuma (as que
    // nasceram antes desta aba). Em vez de sumir da tela, aparece à parte.
    if (est.papel === 'mestre' && !est.mesas[atual]) {
      listaC += '<p class="me-mini">Fora de campanha: <button type="button" class="me-chip me-chip--atual" ' +
        'data-mesa="abrir" data-id="' + esc(atual) + '">' + esc((est.mesa && est.mesa.nome) || atual) + '</button></p>';
    }

    return cartao('🗺 Suas campanhas e mesas', listaC +
      '<div class="me-form">' +
        '<label class="me-campo">Nova campanha<input type="text" id="meCampNome" placeholder="Penitência de Azgher"></label>' +
        '<button type="button" class="me-btn" data-mesa="criar-campanha">Criar campanha</button>' +
      '</div>' +
      '<div class="me-form">' +
        '<label class="me-campo">Nova mesa<input type="text" id="meMesaNome" placeholder="Os Grifos de Valkaria"></label>' +
        '<label class="me-campo me-campo--sel">na campanha<select id="meMesaCamp">' + opcoesDeCampanha('') + '</select></label>' +
      '</div>' +
      '<div class="me-form">' +
        '<label class="me-campo">Nome da sala (vai no link)<input type="text" id="meMesaId" placeholder="deixe em branco para tirar do nome"></label>' +
        '<button type="button" class="me-btn me-btn--principal" data-mesa="criar-mesa">Criar mesa</button>' +
      '</div>' +
      '<p class="me-mini">Uma campanha é o mundo; as mesas são os grupos que jogam nele. Com uma mesa ' +
      'só, crie as duas e esqueça que existem duas coisas. O <strong>nome da sala</strong> é o que vai ' +
      'no link dos jogadores (<code>?sala=…</code>) e vale primeiro a chegar — se já for de outra mesa, ' +
      'eu aviso e você escolhe outro.</p>');
  }

  function cabecalho() {
    const nome = (est.mesa && est.mesa.nome) || mesaId();
    const camp = est.mesa && est.mesa.campanhaId && (est.campanhas[est.mesa.campanhaId] || {}).nome;
    // quando a mesa ainda não tem nome, o título já É o id — repetir
    // "sala mesa" embaixo só faria eco
    const id = mesaId();
    return '<div class="me-cab">' +
      '<h2 class="me-titulo">🎲 ' + esc(nome) + '</h2>' +
      (camp ? '<p class="me-sub">campanha ' + esc(camp) + '</p>' : '') +
      (nome === id ? '' : '<p class="me-mini">sala <code>' + esc(id) + '</code></p>') +
    '</div>';
  }

  function render() {
    const alvo = document.getElementById('mesa-content');
    if (!alvo) return;

    if (!temConfig()) {
      alvo.innerHTML = cartao('🕯 Mesa ao vivo não configurada',
        '<p class="me-p">O <code>js/firebase-config.js</code> ainda não foi preenchido, ou o site está ' +
        'aberto sem internet. O resto do site funciona igual — isto aqui é só a parte que fala com os outros.</p>');
      return;
    }
    if (!est.pronto) {
      alvo.innerHTML = '<p class="me-vazio">Falando com o Firebase…</p>';
      return;
    }
    alvo.innerHTML = cabecalho() + '<div class="me-grade">' +
      blocoConta() + blocoEntrada() + blocoPedidos() + blocoMembros() +
      blocoLink() + blocoEstaMesa() + blocoSalas() + '</div>';
  }

  function valorDe(id) {
    const el = document.getElementById(id);
    return el ? String(el.value || '').trim() : '';
  }

  function aoClicar(e) {
    const btn = e.target.closest('[data-mesa]');
    if (!btn) return;
    e.preventDefault();
    const acao = btn.dataset.mesa, uid = btn.dataset.uid;
    if (acao === 'entrar')       return entrar();
    if (acao === 'sair')         return sair();
    if (acao === 'pedir')        return pedir();
    if (acao === 'reivindicar')  return reivindicar();
    if (acao === 'aprovar')        return aprovar(uid, 'jogador');
    if (acao === 'aprovar-mestre') return aprovar(uid, 'mestre');
    if (acao === 'recusar')      return recusar(uid);
    if (acao === 'papel')        return mudarPapel(uid, btn.dataset.papel);
    if (acao === 'remover')      return remover(uid);
    if (acao === 'abrir')        return abrirMesa(btn.dataset.id);
    if (acao === 'criar-campanha') {
      const n = valorDe('meCampNome');
      if (n) criarCampanha(n);
      return;
    }
    if (acao === 'entrar-mesa') return entrarNaMesa();
    if (acao === 'entrada')     return mudarEntrada(btn.dataset.livre === '1');
    if (acao === 'criar-mesa') {
      const n = valorDe('meMesaNome');
      if (n) criarMesa(n, valorDe('meMesaCamp'), valorDe('meMesaId'));
      return;
    }
    if (acao === 'salvar-mesa') return salvarMesa(valorDe('meNomeMesa'), valorDe('meCampDaMesa'));
    if (acao === 'copiar') {
      const txt = btn.dataset.link || '';
      if (navigator.clipboard) navigator.clipboard.writeText(txt).catch(() => {});
      btn.textContent = 'copiado!';
      setTimeout(() => { btn.textContent = 'copiar'; }, 1400);
      return;
    }
  }

  // ── INICIALIZAÇÃO ────────────────────────────────────────────────
  function init() {
    const secao = document.getElementById('mesa');
    if (secao) secao.addEventListener('click', aoClicar);

    if (!temConfig()) { est.pronto = true; render(); return; }
    const a = auth();
    if (!a) { est.pronto = true; render(); return; }

    a.onAuthStateChanged(u => {
      est.usuario = u;
      est.pronto  = true;
      est.erro = ''; est.aviso = '';
      membrosLigado = '';
      assinar();
      avisar();
    });
    render();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
