// ═══════════════════════════════════════════════════════════════════
//  FICHA-MESA.JS — a ficha do jogador na mesa, ao vivo
//  Carregado nas DUAS páginas, logo depois do ficha.js.
//
//  O QUE ISTO RESOLVE. Até aqui a ficha morava só no localStorage de
//  quem a escreveu: o mestre não tinha como ver a ficha de ninguém, e
//  baixar PV do jogador era pedir o número em voz alta. Agora cada
//  ficha sobe para `mesas/<sala>/fichas/<uid>/<id>` e o mestre abre,
//  consulta, rola e mexe — e o jogador vê mudar na tela dele.
//
//  QUEM VÊ O QUÊ (garantido pelas REGRAS do banco, não por esconder
//  botão — ver MODO-JOGADOR.md):
//    • o jogador  → só as fichas DELE (as suas, em qualquer aparelho);
//    • o mestre e o auxiliar → as fichas de TODOS da mesa;
//    • os outros jogadores → NADA. A ficha de um não chega ao outro.
//  Foi o pedido: "a ficha dos jogadores tem que aparecer somente ao
//  mestre". `fichas` é o primeiro nó da mesa que NÃO é de leitura
//  pública — a loja e a gazeta são; a ficha de alguém não.
//
//  SEM FIREBASE CONFIGURADO, ou sem login, nada disto roda: a ficha
//  continua sendo a folha local de sempre, e o site segue offline.
//
//  A ESCRITA É POR GRUPO, não pela ficha inteira. Quando o mestre
//  baixa o PV enquanto o jogador escreve no inventário, os dois
//  escrevem no mesmo instante — mandar a ficha toda faria o último a
//  falar apagar o outro. Mandando só `pv` e só `inventario`, o banco
//  junta os dois. É o mesmo cuidado que o sync-mestre.js tem com a
//  caixa de entrada, aplicado a um dado que muda muito mais.
// ═══════════════════════════════════════════════════════════════════
(function () {
  'use strict';

  let mesa = null;              // último estado do GA_Mesa
  let refFichas = null, cbFichas = null, salaLigada = '', escopoLigado = '';
  let refGaveta = null, cbGaveta = null, uidGaveta = '';
  let remotas = {};             // uid → { fichaId: ficha }   (a mesa)
  let gaveta = {};              // fichaId → ficha            (a conta)
  let pendentes = {};           // fichaId → { dono, grupos:Set, ficha }
  let timer = null;
  let ultimoErro = '';

  function db() { return window.GA_Mesa ? window.GA_Mesa.db() : null; }
  function ligado() { return !!(mesa && mesa.configurado && mesa.usuario && mesa.souMembro); }
  //  A GAVETA DA CONTA não depende de mesa nenhuma: basta ter entrado.
  //  É `usuarios/<uid>/fichas`, e a regra dela já existe desde a aba 🎲
  //  ("só o dono lê e escreve") — não foi preciso mexer no console.
  function logado() { return !!(mesa && mesa.configurado && mesa.usuario); }
  // Mestre e auxiliar leem a mesa inteira; os demais, só a própria pasta.
  function vejoTodas() { return !!(mesa && (mesa.papel === 'mestre' || mesa.papel === 'auxiliar')); }
  function meuUid() { return (mesa && mesa.usuario) ? mesa.usuario.uid : ''; }

  // ── ASSINATURA ───────────────────────────────────────────────────
  //  O caminho muda com o papel: quem é mestre escuta `fichas` inteiro,
  //  quem é jogador escuta `fichas/<meu uid>`. Trocar de papel (o mestre
  //  promoveu alguém) tem de re-assinar — daí o `escopoLigado`.
  function ligar() {
    if (!ligado()) return desligar();
    const b = db();
    if (!b) return;
    const sala = mesa.mesaId;
    const escopo = vejoTodas() ? 'todas' : meuUid();
    if (sala === salaLigada && escopo === escopoLigado) return;
    desligar();
    salaLigada = sala; escopoLigado = escopo;

    const caminho = 'mesas/' + sala + '/fichas' + (vejoTodas() ? '' : '/' + meuUid());
    refFichas = b.ref(caminho);
    cbFichas = refFichas.on('value', snap => {
      const v = snap.val() || {};
      remotas = vejoTodas() ? v : { [meuUid()]: v };
      entregar();
    }, err => {
      // "sem permissão" aqui não é falha: é a resposta certa para quem
      // não é da mesa, ou para a mesa que ainda não publicou as regras.
      ultimoErro = (err && err.message) || '';
      console.warn('[ficha-mesa] leitura:', ultimoErro);
    });
    // primeira subida: manda tudo o que é meu, para o mestre já ver
    publicarTudo();
  }

  function desligar() {
    if (refFichas && cbFichas) { try { refFichas.off('value', cbFichas); } catch (e) {} }
    refFichas = null; cbFichas = null; salaLigada = ''; escopoLigado = '';
    if (Object.keys(remotas).length) { remotas = {}; entregar(); }
  }

  // ── A GAVETA DA CONTA ────────────────────────────────────────────
  //  Mesma conta, qualquer aparelho: é aqui que a ficha do celular novo
  //  vai ser encontrada. Ninguém mais lê isto — nem o mestre, que
  //  continua vendo pela cópia da mesa.
  function ligarGaveta() {
    if (!logado()) return desligarGaveta();
    const b = db();
    if (!b) return;
    if (uidGaveta === meuUid()) return;
    desligarGaveta();
    uidGaveta = meuUid();
    refGaveta = b.ref('usuarios/' + uidGaveta + '/fichas');
    cbGaveta = refGaveta.on('value', snap => {
      gaveta = snap.val() || {};
      entregarGaveta();
    }, err => {
      ultimoErro = (err && err.message) || '';
      console.warn('[ficha-mesa] gaveta:', ultimoErro);
    });
  }

  function desligarGaveta() {
    if (refGaveta && cbGaveta) { try { refGaveta.off('value', cbGaveta); } catch (e) {} }
    refGaveta = null; cbGaveta = null; uidGaveta = '';
    if (Object.keys(gaveta).length) { gaveta = {}; entregarGaveta(); }
  }

  function entregarGaveta() {
    try {
      if (window.GA_Ficha && window.GA_Ficha.receberDaGaveta) {
        window.GA_Ficha.receberDaGaveta(gaveta);
      }
    } catch (e) { console.warn('[ficha-mesa] entregar gaveta:', e && e.message); }
  }

  function entregar() {
    try {
      if (window.GA_Ficha && window.GA_Ficha.receberDaMesa) {
        window.GA_Ficha.receberDaMesa(remotas, meuUid());
      }
    } catch (e) { console.warn('[ficha-mesa] entregar:', e && e.message); }
  }

  // ── ESCRITA ──────────────────────────────────────────────────────
  //  `dono` null quer dizer "é minha". `grupos` é o conjunto de chaves
  //  do primeiro nível que mudaram; vazio manda a ficha inteira (é o
  //  caso da primeira subida e do "acabei de criar").
  function publicar(ficha, dono, grupos) {
    if (!ficha) return;
    //  Dois destinos, e cada um com a sua condição: a MESA (se eu estou
    //  numa e posso escrever) e a GAVETA da conta (se a ficha é minha).
    //  A ficha de um jogador que o mestre está editando NÃO vai para a
    //  gaveta dele — a regra do banco só deixa o dono escrever lá, e é
    //  assim que tem de ser.
    const paraMesa   = ligado() && mesa.escreve;
    const paraGaveta = logado() && !dono;
    if (!paraMesa && !paraGaveta) return;
    const uid = dono || meuUid();
    const p = pendentes[ficha.id] || (pendentes[ficha.id] = { dono: uid, grupos: new Set(), ficha: null });
    p.dono = uid;
    p.ficha = ficha;
    if (!grupos || !grupos.size) p.grupos = null;             // null = tudo
    else if (p.grupos) grupos.forEach(g => p.grupos.add(g));
    clearTimeout(timer);
    timer = setTimeout(enviar, 700);                          // junta a digitação
  }

  function enviar() {
    const b = db();
    if (!b || !logado()) return;
    const fila = pendentes; pendentes = {};
    Object.keys(fila).forEach(id => {
      const p = fila[id];
      const carimbo = {
        dono: p.dono,
        autor: (mesa.usuario.displayName || mesa.usuario.email || ''),
        atualizadoEm: firebase.database.ServerValue.TIMESTAMP,
      };
      const caminhos = [];
      if (ligado() && mesa.escreve) caminhos.push('mesas/' + salaLigada + '/fichas/' + p.dono + '/' + id);
      if (p.dono === meuUid())      caminhos.push('usuarios/' + meuUid() + '/fichas/' + id);

      caminhos.forEach(base => {
        let promessa;
        if (!p.grupos) {
          promessa = b.ref(base).set(Object.assign(limpar(p.ficha), carimbo));
        } else {
          const patch = Object.assign({}, carimbo);
          p.grupos.forEach(g => { patch[g] = valorLimpo(p.ficha[g]); });
          promessa = b.ref(base).update(patch);
        }
        promessa.catch(e => {
          ultimoErro = e.message;
          console.warn('[ficha-mesa] não deu para publicar em ' + base + ':', e.message);
        });
      });
    });
  }

  //  Só a gaveta, sem passar pela mesa. É o que mantém a conta em dia
  //  quando quem mexeu na minha ficha foi o MESTRE: a mudança chegou
  //  pela mesa, e sem isto o outro aparelho continuaria com o PV velho.
  function guardarNaConta(ficha) {
    const b = db();
    if (!b || !logado() || !ficha || !ficha.id) return;
    b.ref('usuarios/' + meuUid() + '/fichas/' + ficha.id)
      .set(Object.assign(limpar(ficha), {
        dono: meuUid(),
        autor: (mesa.usuario.displayName || mesa.usuario.email || ''),
        atualizadoEm: firebase.database.ServerValue.TIMESTAMP,
      }))
      .catch(e => console.warn('[ficha-mesa] gaveta:', e && e.message));
  }

  // O Realtime Database recusa `undefined` e transforma array com
  // buraco em objeto — a ficha nunca tem nem um nem outro, mas uma
  // ficha importada de um .json de fora pode ter.
  function valorLimpo(v) {
    if (v === undefined) return null;
    return JSON.parse(JSON.stringify(v));
  }
  function limpar(f) { return valorLimpo(f) || {}; }

  function publicarTudo() {
    if (!window.GA_Ficha || !window.GA_Ficha.minhasFichas) return;
    window.GA_Ficha.minhasFichas().forEach(f => publicar(f, null, null));
  }

  // Apagar de verdade: some da mesa e da conta junto.
  function apagar(id, dono) {
    const b = db();
    if (!b || !logado()) return;
    delete pendentes[id];
    if (ligado() && mesa.escreve) {
      b.ref('mesas/' + salaLigada + '/fichas/' + (dono || meuUid()) + '/' + id).remove()
        .catch(e => console.warn('[ficha-mesa] não deu para apagar da mesa:', e && e.message));
    }
    if (!dono) {
      b.ref('usuarios/' + meuUid() + '/fichas/' + id).remove()
        .catch(e => console.warn('[ficha-mesa] não deu para apagar da conta:', e && e.message));
    }
  }

  window.GA_FichaMesa = {
    publicar: publicar,
    guardarNaConta: guardarNaConta,
    apagar: apagar,
    // o que a barra de fichas precisa saber para se desenhar
    estado: function () {
      return {
        ligado: ligado(),
        logado: logado(),
        configurado: !!(mesa && mesa.configurado),
        usuario: mesa ? mesa.usuario : null,
        papel: mesa ? mesa.papel : null,
        vejoTodas: vejoTodas(),
        escreve: !!(mesa && mesa.escreve),
        sala: mesa ? mesa.mesaId : '',
        meuUid: meuUid(),
        erro: ultimoErro,
      };
    },
  };

  // O GA_Mesa é criado pelo mesa.js, que é carregado depois de nós nas
  // duas páginas (ele depende do Firebase, que vem do CDN). Um script
  // `defer` roda com readyState "interactive", então init() acontece
  // ANTES do mesa.js existir — por isso a segunda chance no
  // DOMContentLoaded, quando todos já se registraram.
  function init() {
    if (!window.GA_Mesa) {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init, { once: true });
      } else {
        setTimeout(init, 0);          // ainda na fila dos `defer`
      }
      return;
    }
    window.GA_Mesa.aoMudar(e => {
      const antes = ligado(), antesLogado = logado();
      mesa = e;
      ligar();
      ligarGaveta();
      // acabou de entrar na mesa, ou acabou de entrar na conta: sobe
      // tudo o que é meu, para a mesa e para a gaveta
      if ((!antes && ligado()) || (!antesLogado && logado())) publicarTudo();
      try {
        if (window.GA_Ficha && window.GA_Ficha.mesaMudou) window.GA_Ficha.mesaMudou();
      } catch (err) { console.warn('[ficha-mesa]', err && err.message); }
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
