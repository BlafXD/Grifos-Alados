// ═══════════════════════════════════════════════════════════════════
//  MESA.JS — a aba 🎲 Mesa: a sua campanha, quem está nela e o papel
//  de cada um. Carregado nas DUAS páginas (index.html e jogadores.html)
//  — o que muda é o que cada papel enxerga, não o arquivo.
//
//  É o dono da conta e da sala: quem quiser saber "quem sou eu", "qual
//  a minha mesa" ou "posso escrever?" pergunta ao GA_Mesa, e não ao
//  Firebase direto. O sync-mestre.js e o sync-jogador.js fazem isso.
//
//  UMA MESA É UMA CAMPANHA. Não há duas entidades: o nome que o mestre
//  escreve vira o id da sala, o link (`?sala=`) e o título da mesa. Foi
//  assim que ficou em 08/09/2026, depois de uma tentativa com campanha
//  por cima de mesa que só criava passo a mais — ver
//  docs/mesa-de-verdade.md §14.
//
//  NINGUÉM AUTORIZA NINGUÉM A MESTRAR. Entrou com o Google e escreveu o
//  nome da campanha? É mestre dela. Não há dono do site; há dono de cada
//  mesa, e é quem a criou (`dono`).
//
//  Quatro papéis, em `mesas/<sala>/membros/<uid>`:
//    • mestre     — a mesa é dele: transmite e manda em quem entra e sai;
//    • auxiliar   — ajuda a mestrar: transmite igual, não mexe na gente;
//    • jogador    — escreve as caixas que são deles;
//    • espectador — vê tudo, não escreve nada.
//  Quem não é nada disso lê a gazeta, a loja e as bases (isso é aberto)
//  e entra na mesa — por um clique, se a porta estiver aberta.
// ═══════════════════════════════════════════════════════════════════
(function () {
  'use strict';

  const esc = window.GA_esc;
  const SALA_KEY = 'grifosAlados.syncSala';

  // Ordem é hierarquia: quem pode mais vem antes.
  const PAPEIS = [
    { chave: 'mestre',     rotulo: 'mestre',     transmite: true,  escreve: true },
    { chave: 'auxiliar',   rotulo: 'auxiliar',   transmite: true,  escreve: true },
    { chave: 'jogador',    rotulo: 'jogador',    transmite: false, escreve: true },
    { chave: 'espectador', rotulo: 'espectador', transmite: false, escreve: false },
  ];
  function papelDe(chave) { return PAPEIS.find(p => p.chave === chave) || null; }

  let est = {
    pronto:     false,   // o Firebase já disse se havia sessão salva
    usuario:    null,
    papel:      null,    // 'mestre' | 'auxiliar' | 'jogador' | 'espectador' | null
    membros:    {},
    pedidos:    {},      // só o mestre enxerga
    meuPedido:  null,
    mesa:       null,    // { nome, dono, entradaLivre }
    minhasMesas: {},     // salaId → nome  (índice que cada um guarda de si)
    erro:       '',
    aviso:      '',
  };

  const ouvintes = [];
  function avisar() {
    ouvintes.forEach(fn => { try { fn(estado()); } catch (e) { console.warn('[mesa] ouvinte:', e && e.message); } });
    render();
  }

  // ── FIREBASE (um app só para o site inteiro) ─────────────────────
  // O sync-mestre e o sync-jogador também usam; initializeApp duas vezes
  // estoura, então todo mundo passa por aqui.
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
  function agora() { return firebase.database.ServerValue.TIMESTAMP; }

  // ── QUAL É A MESA ────────────────────────────────────────────────
  // Na página dos jogadores manda o link (?sala=); na do mestre, a que
  // ele abriu por último.
  function ehJogador() { return !!(window.GA_ehJogador && window.GA_ehJogador()); }
  function mesaId() {
    if (ehJogador()) {
      const s = (new URLSearchParams(location.search).get('sala') || '').trim();
      return idDe(s || 'mesa');
    }
    let s = '';
    try { s = (localStorage.getItem(SALA_KEY) || '').trim(); } catch (e) {}
    return idDe(s || 'mesa');
  }
  function linkDosJogadores(id) {
    try { return new URL('jogadores.html?sala=' + encodeURIComponent(id || mesaId()), location.href).href; }
    catch (e) { return 'jogadores.html?sala=' + (id || mesaId()); }
  }

  // O nome da campanha vira o id da sala: "Purista" → "purista",
  // "Nuevo Sol" → "nuevo-sol". Normalizar dos DOIS lados (na criação e
  // na leitura do ?sala=) faz "Purista" e "purista" caírem na mesma mesa
  // — senão o link com maiúscula abriria uma sala vazia.
  function idDe(nome) {
    return String(nome || '').normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')                    // tira acentos
      .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'mesa';
  }

  // ── ASSINATURAS ──────────────────────────────────────────────────
  let refs = [];
  function desligar() {
    refs.forEach(r => { try { r.ref.off('value', r.cb); } catch (e) {} });
    refs = [];
  }
  function ligar(caminho, cb) {
    const b = db(); if (!b) return;
    const ref = b.ref(caminho);
    // "sem permissão" aqui é resposta, não falha: quer dizer que esta
    // pessoa não é dessa parte da mesa.
    const fn = ref.on('value', snap => { cb(snap.val()); avisar(); },
      err => console.warn('[mesa] ' + caminho + ':', err && err.message));
    refs.push({ ref: ref, cb: fn });
  }

  let membrosLigado = '';
  function assinar() {
    desligar();
    membrosLigado = '';
    const id = mesaId();
    est.membros = {}; est.pedidos = {}; est.meuPedido = null; est.papel = null;
    est.mesa = null; est.minhasMesas = {};

    // Estes são públicos de propósito: quem cai no link precisa saber
    // onde caiu e se a porta está aberta ANTES de entrar em conta
    // nenhuma. É a placa na porta, não o conteúdo do jogo.
    ligar('mesas/' + id + '/nome',         v => { est.mesa = Object.assign({}, est.mesa, { nome: v }); });
    ligar('mesas/' + id + '/dono',         v => { est.mesa = Object.assign({}, est.mesa, { dono: v }); });
    ligar('mesas/' + id + '/entradaLivre', v => { est.mesa = Object.assign({}, est.mesa, { entradaLivre: v === true }); });

    const u = est.usuario;
    if (!u) return;

    // "eu sou membro?" — cada um lê o próprio nó, sempre
    ligar('mesas/' + id + '/membros/' + u.uid, v => {
      est.papel = (v && v.papel) || null;
      if (est.papel) { est.meuPedido = null; assinarDeMembro(id); }
    });
    ligar('mesas/' + id + '/pedidos/' + u.uid, v => { est.meuPedido = v || null; });
    // as mesas de que ele participa — índice que ele mesmo guarda
    ligar('usuarios/' + u.uid + '/mesas', v => { est.minhasMesas = v || {}; });
  }

  function assinarDeMembro(id) {
    if (membrosLigado === id + '/' + est.papel) return;
    membrosLigado = id + '/' + est.papel;
    ligar('mesas/' + id + '/membros', v => { est.membros = v || {}; });
    if (est.papel !== 'mestre') return;
    ligar('mesas/' + id + '/pedidos', v => { est.pedidos = v || {}; });
  }

  // ── ENTRAR E SAIR ────────────────────────────────────────────────
  const MSG_LOGIN = {
    'auth/popup-blocked': 'o navegador bloqueou a janela do Google — libere os pop-ups deste site e tente de novo',
    'auth/unauthorized-domain': 'este endereço não está autorizado no Firebase',
    'auth/operation-not-allowed': 'o login com o Google ainda não foi ligado no Firebase',
    'auth/network-request-failed': 'sem conexão com o Google agora — tente daqui a pouco',
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
      console.warn('[mesa] login:', cod, err && err.message);
    });
  }
  function sair() {
    const a = auth(); if (!a) return;
    est.erro = ''; est.aviso = '';
    a.signOut().catch(e => console.warn('[mesa] sair:', e && e.message));
  }
  function nomeDe(u) { return (u && (u.displayName || u.email)) || 'sem nome'; }

  function recado(e, quando) {
    const m = ((e && (e.code || e.message)) || '').toString().toLowerCase();
    if (m.indexOf('permission') >= 0) return quando + ': o banco recusou. As regras estão publicadas?';
    return quando + ': ' + ((e && e.message) || 'erro');
  }
  function ehSemPermissao(e) {
    return (((e && (e.code || e.message)) || '') + '').toLowerCase().indexOf('permission') >= 0;
  }

  // ── CRIAR / ASSUMIR A CAMPANHA ───────────────────────────────────
  //  É o coração da coisa: escreveu o nome, é mestre. Sem aprovação de
  //  ninguém, sem cadastro à parte. Três casos:
  //    • a sala não existe        → cria, e ele é o mestre;
  //    • existe e não tem dono    → assume (as salas de antes desta aba);
  //    • existe e é de outra gente→ avisa que o nome já é de outra mesa.
  function criarCampanha(nome) {
    const b = db(), u = est.usuario;
    if (!b || !u) return;
    const nomeLimpo = String(nome || '').trim();
    if (!nomeLimpo) { est.erro = 'escreva o nome da campanha'; return avisar(); }
    const id = idDe(nomeLimpo);
    est.erro = '';

    b.ref('mesas/' + id + '/dono').once('value').then(snap => {
      if (snap.val()) {                       // já tem dono
        if (snap.val() === u.uid) return abrirMesa(id, nomeLimpo);
        est.erro = 'a sala "' + id + '" já é de outra mesa — escolha outro nome';
        return avisar();
      }
      const mesa = {
        nome: nomeLimpo, dono: u.uid, entradaLivre: true, criadaEm: agora(), membros: {},
      };
      mesa.membros[u.uid] = { nome: nomeDe(u), papel: 'mestre', desde: agora() };
      // mesa órfã (existe sem dono): não dá para reescrever o nó inteiro,
      // porque isso apagaria os dados que já estão lá dentro
      const escrita = snap.exists() || est.mesa
        ? b.ref('mesas/' + id).update({
            nome: nomeLimpo, dono: u.uid, entradaLivre: true,
            ['membros/' + u.uid]: mesa.membros[u.uid],
          })
        : b.ref('mesas/' + id).set(mesa);
      return escrita
        .then(() => b.ref('usuarios/' + u.uid + '/mesas/' + id).set(nomeLimpo))
        .then(() => abrirMesa(id, nomeLimpo));
    }).catch(e => {
      est.erro = ehSemPermissao(e)
        ? 'a sala "' + id + '" já é de outra mesa — escolha outro nome'
        : recado(e, 'não deu para criar a campanha');
      avisar();
    });
  }

  // Assumir a mesa que está aberta agora (mesma coisa, com o nome dela).
  function reivindicar() {
    criarCampanha((est.mesa && est.mesa.nome) || mesaId());
  }

  // Entrada livre: o jogador entra sozinho, com um clique.
  function entrarNaMesa() {
    const b = db(), u = est.usuario, id = mesaId(); if (!b || !u) return;
    b.ref('mesas/' + id + '/membros/' + u.uid).set({
      nome: nomeDe(u), papel: 'jogador', desde: agora(),
    })
      .then(() => b.ref('usuarios/' + u.uid + '/mesas/' + id).set((est.mesa && est.mesa.nome) || id))
      .catch(e => { est.erro = recado(e, 'não deu para entrar na mesa'); avisar(); });
  }

  function abrirMesa(id, nome) {
    if (!id) return;
    window.GA_guardar(SALA_KEY, id);
    if (nome && est.usuario) {
      const b = db();
      if (b) b.ref('usuarios/' + est.usuario.uid + '/mesas/' + id).set(nome).catch(() => {});
    }
    est.erro = '';
    assinar();
    avisar();
  }

  // ── PEDIR, APROVAR, MANDAR EMBORA ────────────────────────────────
  function pedir() {
    const b = db(), u = est.usuario; if (!b || !u) return;
    est.erro = '';
    b.ref('mesas/' + mesaId() + '/pedidos/' + u.uid).set({
      nome: nomeDe(u), email: u.email || '', quando: agora(),
    }).then(() => { est.aviso = 'Pedido enviado. Agora é esperar o mestre.'; avisar(); })
      .catch(e => { est.erro = recado(e, 'não deu para enviar o pedido'); avisar(); });
  }
  function aprovar(uid, papel) {
    const b = db(); if (!b || !uid) return;
    const p = est.pedidos[uid] || {};
    const patch = {};
    patch['membros/' + uid] = {
      nome: p.nome || p.email || uid,
      papel: papelDe(papel) ? papel : 'jogador',
      desde: agora(),
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
    const b = db(); if (!b || !uid || !papelDe(papel)) return;
    b.ref('mesas/' + mesaId() + '/membros/' + uid + '/papel').set(papel)
      .catch(e => { est.erro = recado(e, 'não deu para trocar o papel'); avisar(); });
  }
  function remover(uid) {
    const b = db(); if (!b || !uid) return;
    b.ref('mesas/' + mesaId() + '/membros/' + uid).remove()
      .catch(e => { est.erro = recado(e, 'não deu para tirar da mesa'); avisar(); });
  }
  function mudarEntrada(livre) {
    const b = db(); if (!b) return;
    b.ref('mesas/' + mesaId() + '/entradaLivre').set(!!livre)
      .catch(e => { est.erro = recado(e, 'não deu para mudar a entrada'); avisar(); });
  }
  function salvarNome(nome) {
    const b = db(); if (!b || !nome) return;
    b.ref('mesas/' + mesaId() + '/nome').set(nome)
      .then(() => {
        if (est.usuario) b.ref('usuarios/' + est.usuario.uid + '/mesas/' + mesaId()).set(nome);
        est.aviso = 'Nome salvo.'; avisar();
      })
      .catch(e => { est.erro = recado(e, 'não deu para salvar o nome'); avisar(); });
  }

  // ── O QUE OS OUTROS MÓDULOS PERGUNTAM ────────────────────────────
  function papelAtual() { return papelDe(est.papel); }
  function estado() {
    const p = papelAtual();
    return {
      pronto:      est.pronto,
      usuario:     est.usuario,
      papel:       est.papel,
      papelRotulo: p ? p.rotulo : '',
      mesaId:      mesaId(),
      mesa:        est.mesa,
      souMembro:   !!p,
      souMestre:   est.papel === 'mestre',
      transmite:   !!(p && p.transmite),   // mestre e auxiliar
      escreve:     !!(p && p.escreve),     // todos, menos espectador
      temPedido:   !!est.meuPedido,
      configurado: temConfig(),
      semDono:     !!(est.mesa && !est.mesa.dono),
    };
  }

  window.GA_Mesa = {
    estado: estado,
    app: app, db: db, auth: auth,
    mesaId: mesaId, link: linkDosJogadores, idDe: idDe,
    entrar: entrar, sair: sair, pedir: pedir,
    criarCampanha: criarCampanha, abrirMesa: abrirMesa,
    minhasMesas: () => Object.assign({}, est.minhasMesas),
    souMestre: () => est.papel === 'mestre',
    souMembro: () => !!papelAtual(),
    transmite: () => { const p = papelAtual(); return !!(p && p.transmite); },
    escreve:   () => { const p = papelAtual(); return !!(p && p.escreve); },
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
  function selo(papel, eu) {
    const p = papelDe(papel);
    if (!p) return '<span class="me-selo me-selo--fora">' + (eu ? 'fora da mesa' : '—') + '</span>';
    return '<span class="me-selo me-selo--' + p.chave + '">' + esc(p.rotulo) + '</span>';
  }

  function blocoConta() {
    if (!est.usuario) {
      return cartao('🔑 Sua conta', '' +
        '<p class="me-p">Ver a mesa não pede login. Para <strong>mestrar</strong> uma campanha ou ' +
        '<strong>escrever</strong> nela, entre com a sua conta do Google — é só isso, não há cadastro.</p>' +
        '<div class="me-acoes"><button type="button" class="me-btn me-btn--principal" data-mesa="entrar">Entrar com o Google</button></div>' +
        (est.erro ? '<p class="me-erro">⚠ ' + esc(est.erro) + '</p>' : ''));
    }
    const u = est.usuario;
    return cartao('🔑 Sua conta', '' +
      '<p class="me-p"><strong>' + esc(nomeDe(u)) + '</strong> ' + selo(est.papel, true) + '</p>' +
      // o uid aparece de propósito: é o que identifica a pessoa no banco
      '<p class="me-mini">' + esc(u.email || '') + ' · <code>' + esc(u.uid) + '</code></p>' +
      '<div class="me-acoes"><button type="button" class="me-btn" data-mesa="sair">Sair</button></div>' +
      (est.erro ? '<p class="me-erro">⚠ ' + esc(est.erro) + '</p>' : '') +
      (est.aviso ? '<p class="me-aviso">' + esc(est.aviso) + '</p>' : ''));
  }

  function blocoEntrada() {
    if (!est.usuario || est.papel) return '';
    const nome = esc((est.mesa && est.mesa.nome) || mesaId());
    if (est.meuPedido) {
      return cartao('⏳ Pedido enviado', '<p class="me-p">O mestre precisa aprovar você. ' +
        'Quando ele aprovar, esta página se atualiza sozinha — não precisa recarregar.</p>');
    }
    if (!(est.mesa && est.mesa.dono)) {
      return cartao('🎩 Esta campanha não tem mestre',
        '<p class="me-p">Ninguém assumiu <strong>' + nome + '</strong> ainda. ' +
        'Assuma e ela é sua: você vira o mestre, e é o seu nome que manda nela.</p>' +
        '<div class="me-acoes"><button type="button" class="me-btn me-btn--principal" data-mesa="reivindicar">Assumir esta campanha</button></div>');
    }
    if (est.mesa.entradaLivre) {
      return cartao('🚪 Entrar nesta mesa',
        '<p class="me-p">A mesa <strong>' + nome + '</strong> está de porta aberta. ' +
        'Entre e o seu nome aparece na lista — o mestre decide depois se você é jogador, ' +
        'espectador ou auxiliar.</p>' +
        '<div class="me-acoes"><button type="button" class="me-btn me-btn--principal" data-mesa="entrar-mesa">Entrar nesta mesa</button></div>');
    }
    return cartao('✋ Pedir para entrar',
      '<p class="me-p">A mesa <strong>' + nome + '</strong> pede aprovação. ' +
      'Peça para entrar e o mestre resolve por aqui mesmo.</p>' +
      '<div class="me-acoes"><button type="button" class="me-btn me-btn--principal" data-mesa="pedir">Pedir para entrar</button></div>');
  }

  function blocoPedidos() {
    if (est.papel !== 'mestre') return '';
    const uids = Object.keys(est.pedidos || {});
    if (!uids.length) return cartao('✋ Pedidos', '<p class="me-vazio">Ninguém esperando.</p>');
    const linhas = uids.map(uid => {
      const p = est.pedidos[uid] || {};
      return '<li class="me-linha">' +
        '<span class="me-linha-nome">' + esc(p.nome || uid) + '<em>' + esc(p.email || '') + '</em></span>' +
        '<span class="me-linha-acoes">' +
          PAPEIS.filter(x => x.chave !== 'mestre').map(x =>
            '<button type="button" class="me-btn me-btn--mini' + (x.chave === 'jogador' ? ' me-btn--principal' : '') +
            '" data-mesa="aprovar" data-uid="' + esc(uid) + '" data-papel="' + x.chave + '">' + x.rotulo + '</button>').join('') +
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
      let acoes = '';
      if (souM && !eu) {
        acoes = '<span class="me-linha-acoes">' +
          '<select class="me-sel-papel" data-mesa="papel" data-uid="' + esc(uid) + '">' +
            PAPEIS.map(p => '<option value="' + p.chave + '"' + (p.chave === m.papel ? ' selected' : '') +
              '>' + p.rotulo + '</option>').join('') +
          '</select>' +
          '<button type="button" class="me-btn me-btn--mini me-btn--perigo" data-mesa="remover" data-uid="' + esc(uid) + '">tirar</button>' +
        '</span>';
      }
      return '<li class="me-linha">' +
        '<span class="me-linha-nome me-linha-nome--deitada">' +
          esc(m.nome || uid) + (eu ? ' <em>(você)</em>' : '') + ' ' + selo(m.papel) +
        '</span>' + acoes +
      '</li>';
    }).join('');
    return cartao('🧑‍🤝‍🧑 Quem está na mesa <span class="me-cont">' + uids.length + '</span>',
      '<ul class="me-lista">' + linhas + '</ul>' +
      (souM ? '<p class="me-mini"><strong>auxiliar</strong> transmite junto com você; ' +
        '<strong>jogador</strong> escreve as caixas que são deles; ' +
        '<strong>espectador</strong> só olha.</p>' : ''));
  }

  function blocoEstaMesa() {
    if (est.papel !== 'mestre') return '';
    const id = mesaId();
    const nome = (est.mesa && est.mesa.nome) || '';
    const livre = !!(est.mesa && est.mesa.entradaLivre);
    const l = linkDosJogadores();
    return cartao('✒ Esta campanha',
      '<div class="me-form">' +
        '<label class="me-campo">Nome<input type="text" id="meNomeMesa" value="' + esc(nome) + '" placeholder="' + esc(id) + '"></label>' +
        '<button type="button" class="me-btn" data-mesa="salvar-nome">Salvar</button>' +
      '</div>' +
      '<p class="me-link"><code>' + esc(l) + '</code>' +
        '<button type="button" class="me-btn me-btn--mini" data-mesa="copiar" data-link="' + esc(l) + '">copiar</button></p>' +
      '<p class="me-mini">Mande esse link para a sua mesa. O id da sala é <code>' + esc(id) +
        '</code> e não muda — o nome acima é só de tela.</p>' +
      '<div class="me-form">' +
        '<span class="me-campo">Entrada</span>' +
        '<button type="button" class="me-chip' + (livre ? ' me-chip--ligado' : '') +
          '" data-mesa="entrada" data-livre="1">🚪 Porta aberta</button>' +
        '<button type="button" class="me-chip' + (livre ? '' : ' me-chip--ligado') +
          '" data-mesa="entrada" data-livre="">✋ Com aprovação</button>' +
      '</div>' +
      '<p class="me-mini">' + (livre
        ? 'Quem abrir o link e entrar com o Google já entra como jogador. Você troca o papel ou tira depois.'
        : 'Quem abrir o link precisa pedir, e você aprova aqui.') + '</p>');
  }

  // O painel de criar campanha só existe no lado do mestre: a página dos
  // jogadores é para jogar, não para administrar mesa.
  function blocoMinhasMesas() {
    if (!est.usuario || ehJogador()) return '';
    const minhas = est.minhasMesas || {};
    const ids = Object.keys(minhas);
    const atual = mesaId();
    const lista = ids.length
      ? '<div class="me-chips">' + ids.map(id => '<button type="button" class="me-chip' +
          (id === atual ? ' me-chip--atual' : '') + '" data-mesa="abrir" data-id="' + esc(id) + '">' +
          esc(minhas[id] || id) + '</button>').join('') + '</div>'
      : '<p class="me-vazio">Nenhuma campanha sua ainda.</p>';
    return cartao('🗺 Suas campanhas', lista +
      '<div class="me-form">' +
        '<label class="me-campo">Nova campanha<input type="text" id="meNovaCamp" placeholder="Purista"></label>' +
        '<button type="button" class="me-btn me-btn--principal" data-mesa="criar">Criar e mestrar</button>' +
      '</div>' +
      '<p class="me-mini">Escreveu o nome, você é o mestre — ninguém precisa autorizar. ' +
      'O nome vira o endereço da sala (<code>?sala=…</code>) e vale primeiro a chegar.</p>');
  }

  function cabecalho() {
    const id = mesaId();
    const nome = (est.mesa && est.mesa.nome) || id;
    return '<div class="me-cab">' +
      '<h2 class="me-titulo">🎲 ' + esc(nome) + '</h2>' +
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
    if (!est.pronto) { alvo.innerHTML = '<p class="me-vazio">Falando com o Firebase…</p>'; return; }
    alvo.innerHTML = cabecalho() + '<div class="me-grade">' +
      blocoConta() + blocoEntrada() + blocoPedidos() + blocoMembros() +
      blocoEstaMesa() + blocoMinhasMesas() + '</div>';
  }

  function valorDe(id) {
    const el = document.getElementById(id);
    return el ? String(el.value || '').trim() : '';
  }

  function aoClicar(e) {
    const btn = e.target.closest('[data-mesa]');
    if (!btn || btn.tagName === 'SELECT') return;
    e.preventDefault();
    const acao = btn.dataset.mesa, uid = btn.dataset.uid;
    if (acao === 'entrar')      return entrar();
    if (acao === 'sair')        return sair();
    if (acao === 'pedir')       return pedir();
    if (acao === 'reivindicar') return reivindicar();
    if (acao === 'entrar-mesa') return entrarNaMesa();
    if (acao === 'aprovar')     return aprovar(uid, btn.dataset.papel);
    if (acao === 'recusar')     return recusar(uid);
    if (acao === 'remover')     return remover(uid);
    if (acao === 'entrada')     return mudarEntrada(btn.dataset.livre === '1');
    if (acao === 'abrir')       return abrirMesa(btn.dataset.id);
    if (acao === 'salvar-nome') return salvarNome(valorDe('meNomeMesa'));
    if (acao === 'criar')       return criarCampanha(valorDe('meNovaCamp'));
    if (acao === 'copiar') {
      const txt = btn.dataset.link || '';
      if (navigator.clipboard) navigator.clipboard.writeText(txt).catch(() => {});
      btn.textContent = 'copiado!';
      setTimeout(() => { btn.textContent = 'copiar'; }, 1400);
      return;
    }
  }
  function aoMudarSelect(e) {
    const sel = e.target.closest('select[data-mesa="papel"]');
    if (sel) mudarPapel(sel.dataset.uid, sel.value);
  }

  // Enter no campo da campanha cria, como em qualquer formulário.
  function aoTeclar(e) {
    if (e.key !== 'Enter') return;
    if (e.target.id === 'meNovaCamp') { e.preventDefault(); criarCampanha(valorDe('meNovaCamp')); }
    if (e.target.id === 'meNomeMesa') { e.preventDefault(); salvarNome(valorDe('meNomeMesa')); }
  }

  // ── INICIALIZAÇÃO ────────────────────────────────────────────────
  function init() {
    const secao = document.getElementById('mesa');
    if (secao) {
      secao.addEventListener('click', aoClicar);
      secao.addEventListener('change', aoMudarSelect);
      secao.addEventListener('keydown', aoTeclar);
    }
    if (!temConfig()) { est.pronto = true; render(); return; }
    const a = auth();
    if (!a) { est.pronto = true; render(); return; }

    a.onAuthStateChanged(u => {
      est.usuario = u;
      est.pronto = true;
      est.erro = ''; est.aviso = '';
      assinar();
      avisar();
    });
    render();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
