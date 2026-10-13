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
  // `grifosAlados.syncSala` NÃO é mais lida: a mesa vem do endereço (ver
  // js/mesa-endereco.js). Ela sobrevive como o resto da mudança — é por
  // ela que o mesa-endereco.js sabe de qual campanha era a gaveta velha
  // deste navegador — e por isso não se apaga nem se escreve mais aqui.

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
  //  Desde 13/10/2026 quem responde é o ENDEREÇO, nas duas páginas, e
  //  quem o lê é o js/mesa-endereco.js. Aqui só se repassa.
  //
  //  E a resposta pode ser "nenhuma": `index.html` sem `?mesa=` é o HUB,
  //  a bancada de quem abriu o site. Antes, nesse caso, o site caía numa
  //  sala chamada `mesa` — que é uma campanha de verdade, de outra
  //  pessoa, e era por aí que a loja de um ia parar na mesa do outro.
  //  Nada mais tem sala padrão: fora de mesa é fora de mesa, e nenhuma
  //  linha sai daqui para o banco.
  function ehJogador() { return !!(window.GA_ehJogador && window.GA_ehJogador()); }
  function mesaId()    { return (window.GA_Sala && window.GA_Sala.id) || ''; }
  function naMesa()    { return !!mesaId(); }
  function linkDosJogadores(id) {
    return window.GA_Sala ? window.GA_Sala.linkJogador(id || mesaId())
                          : 'jogadores.html?sala=' + (id || mesaId());
  }

  // A normalização do nome da campanha ("Nuevo Sol" vira "nuevo-sol")
  // mora no js/mesa-endereco.js, que é quem lê o endereço — aqui se usa
  // a dele, para não existirem duas regras capazes de divergir.
  function idDe(nome) { return window.GA_Sala ? window.GA_Sala.idDe(nome) : String(nome || ''); }


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

    const u = est.usuario;

    // No HUB não há mesa para assinar — e é o ponto da mudança: sem
    // `?mesa=` no endereço, este navegador não toca em campanha nenhuma.
    // A lista "Suas campanhas" continua vindo, porque é dela que se
    // escolhe para onde ir.
    if (!id) {
      if (u) ligar('usuarios/' + u.uid + '/mesas', v => { est.minhasMesas = v || {}; });
      return;
    }

    // Estes são públicos de propósito: quem cai no link precisa saber
    // onde caiu e se a porta está aberta ANTES de entrar em conta
    // nenhuma. É a placa na porta, não o conteúdo do jogo.
    ligar('mesas/' + id + '/nome',         v => { est.mesa = Object.assign({}, est.mesa, { nome: v }); });
    ligar('mesas/' + id + '/dono',         v => { est.mesa = Object.assign({}, est.mesa, { dono: v }); });
    ligar('mesas/' + id + '/entradaLivre', v => { est.mesa = Object.assign({}, est.mesa, { entradaLivre: v === true }); });

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
      const souMestre = { nome: nomeDe(u), papel: 'mestre', desde: agora() };
      // SEMPRE update, nunca set. Uma mesa órfã (existe, sem `dono`) pode
      // ter `dados`, `fichas` e `membros` dentro, e um `set` no nó inteiro
      // apagaria tudo isso. O `update` escreve os mesmos campos de uma
      // mesa nova sem tocar em irmão nenhum — e aqui o perigo é real:
      // desde que a campanha vem do endereço, dá para criar um nome sem
      // nunca ter aberto aquela sala, então não há como confiar em "o que
      // eu já tinha carregado" para saber se ela existe.
      //
      // E `criadaEm` fica FORA da escrita de propósito: nas regras do
      // banco ele só tem `.read`, então escrevê-lo cai na regra do nó
      // `$sala`, que exige `!data.exists()` — numa mesa órfã isso é
      // falso e derrubaria o update INTEIRO, que é atômico. Assumir uma
      // campanha sem dono pararia de funcionar por causa de um carimbo
      // de data que o site não lê em lugar nenhum.
      return b.ref('mesas/' + id).update({
            nome: nomeLimpo, dono: u.uid, entradaLivre: true,
            ['membros/' + u.uid]: souMestre,
          })
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

  // ABRIR UMA MESA É TROCAR DE ENDEREÇO (13/10/2026). Antes isto
  // escrevia uma chave do localStorage e mandava os módulos se
  // re-apontarem no ar — e quem esquecesse de se re-apontar ficava
  // falando com a campanha anterior. Agora a aba inteira nasce de novo
  // em `index.html?mesa=<id>`: gaveta, 📡, iniciativa e rolagens já
  // acordam na campanha certa, e o endereço diz em qual você está.
  //
  // O índice "Suas campanhas" é gravado ANTES de sair, senão a navegação
  // corta a escrita no meio.
  function abrirMesa(id, nome) {
    if (!id) return;
    est.erro = '';
    const ir = () => { window.GA_Sala.abrir(id); };
    const b = db();
    if (nome && est.usuario && b) {
      b.ref('usuarios/' + est.usuario.uid + '/mesas/' + id).set(nome).then(ir).catch(ir);
      return;
    }
    ir();
  }

  // Voltar para a bancada: o HUB é o endereço sem `?mesa=`.
  function irParaOHub() { window.GA_Sala.abrir(''); }

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
      membros:     est.membros,   // quem está na mesa (a iniciativa monta com eles)
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
        '<a class="me-btn me-btn--mini" href="' + esc(l) + '" target="_blank" rel="noopener">abrir</a>' +
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
  //
  //  Cada campanha é um LINK de verdade (`index.html?mesa=…`), não um
  //  botão que troca um estado escondido: dá para abrir em outra aba, dá
  //  para favoritar, e duas campanhas ficam abertas lado a lado sem uma
  //  pisar na outra.
  function blocoMinhasMesas() {
    if (!est.usuario || ehJogador()) return '';
    const minhas = est.minhasMesas || {};
    const ids = Object.keys(minhas);
    const atual = mesaId();
    const lista = ids.length
      ? '<div class="me-chips">' + ids.map(id => '<a class="me-chip' +
          (id === atual ? ' me-chip--atual' : '') + '" href="' + esc(window.GA_Sala.link(id)) + '"' +
          ' data-mesa="abrir" data-id="' + esc(id) + '">' +
          esc(minhas[id] || id) + (id === atual ? ' ✓' : '') + '</a>').join('') + '</div>'
      : '<p class="me-vazio">Nenhuma campanha sua ainda.</p>';
    return cartao('🗺 Suas campanhas', lista +
      (atual ? '<p class="me-mini">Você está em <strong>' + esc(minhas[atual] || atual) +
        '</strong>. Clicar em outra abre a outra; o <strong>↩ Voltar à bancada</strong> ' +
        'lá em cima sai de todas.</p>' : '') +
      '<div class="me-form">' +
        '<label class="me-campo">Nova campanha<input type="text" id="meNovaCamp" placeholder="Purista"></label>' +
        '<button type="button" class="me-btn me-btn--principal" data-mesa="criar">Criar e mestrar</button>' +
      '</div>' +
      '<p class="me-mini">Escreveu o nome, você é o mestre — ninguém precisa autorizar. ' +
      'O nome vira o endereço da campanha (<code>?mesa=…</code>) e vale primeiro a chegar.</p>');
  }

  // ── O HUB: nenhuma campanha aberta ───────────────────────────────
  //  É aqui que se explica, de uma vez, a regra que mudou em 13/10/2026
  //  — porque "por que a minha loja não foi para a mesa?" tem resposta
  //  nesta tela.
  function blocoHub() {
    return cartao('🛠 Você está na sua bancada',
      '<p class="me-p">Nenhuma campanha aberta nesta aba. Tudo o que você fizer aqui — a Loja que ' +
      'rolar, as Bases, as Viagens — fica <strong>só neste navegador</strong>: o 📡 está desligado e ' +
      'nada vai para mesa nenhuma.</p>' +
      '<p class="me-p">Para jogar, <strong>abra uma campanha</strong> ali embaixo. A aba passa a ser ' +
      'daquela campanha (o endereço mostra qual), e a Loja, as Bases e as Viagens que você mexer ' +
      'ali são <strong>dela</strong> — não se misturam com as das outras.</p>' +
      '<p class="me-mini">Antes disto, o site sem campanha escolhida caía numa sala chamada ' +
      '<code>mesa</code>, que é uma campanha de verdade: era por aí que a loja de um ia parar na ' +
      'mesa do outro.</p>');
  }

  //  A PORTA PARA O OUTRO LADO (18/09/2026). O link dos jogadores só
  //  existia dentro do "✒ Esta campanha", que pede estar logado E ser
  //  mestre da sala — quem abria o site não tinha como chegar à visão
  //  deles sem saber o endereço de cor. Agora está no cabeçalho, que
  //  aparece sempre, e abre em outra aba para não derrubar esta.
  //  Só no index: no jogadores.html já se está do outro lado.
  function cabecalho() {
    const id = mesaId();
    if (!id) {
      return '<div class="me-cab">' +
        '<h2 class="me-titulo">🛠 Bancada</h2>' +
        '<p class="me-mini">nenhuma campanha aberta nesta aba — o 📡 está desligado</p>' +
      '</div>';
    }
    const nome = (est.mesa && est.mesa.nome) || id;
    const l = linkDosJogadores();
    return '<div class="me-cab">' +
      '<h2 class="me-titulo">🎲 ' + esc(nome) + '</h2>' +
      (nome === id ? '' : '<p class="me-mini">sala <code>' + esc(id) + '</code></p>') +
      (ehJogador() ? '' :
        '<p class="me-verjog"><a href="' + esc(l) + '" target="_blank" rel="noopener">' +
        '👥 Abrir a visão dos jogadores</a>' +
        '<span class="me-mini">é o que eles veem desta sala — abre em outra aba</span>' +
        '<a class="me-btn me-btn--mini" href="' + esc(window.GA_Sala.link('')) + '" data-mesa="hub">↩ Voltar à bancada</a>' +
        '</p>') +
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

    // No HUB não há campanha: o que cabe é a conta, a explicação e a
    // lista de para onde ir. Os blocos de membros, pedidos e "esta
    // campanha" não têm do que falar.
    if (!naMesa()) {
      alvo.innerHTML = cabecalho() + '<div class="me-grade">' +
        blocoHub() + blocoConta() + blocoMinhasMesas() + '</div>';
      return;
    }
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
    // Abrir campanha e voltar à bancada são LINKS de verdade: com Ctrl,
    // Shift ou o botão do meio, deixa o navegador abrir noutra aba — é
    // justo o que permite duas campanhas lado a lado.
    const acaoBruta = btn.dataset.mesa;
    if ((acaoBruta === 'abrir' || acaoBruta === 'hub') &&
        (e.ctrlKey || e.metaKey || e.shiftKey || e.button === 1)) return;
    e.preventDefault();
    const acao = acaoBruta, uid = btn.dataset.uid;
    if (acao === 'hub')         return irParaOHub();
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
