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
  let remotas = {};             // uid → { fichaId: ficha }
  let pendentes = {};           // fichaId → { dono, grupos:Set, ficha }
  let timer = null;
  let ultimoErro = '';

  function db() { return window.GA_Mesa ? window.GA_Mesa.db() : null; }
  function ligado() { return !!(mesa && mesa.configurado && mesa.usuario && mesa.souMembro); }
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
    if (!ligado() || !ficha || !mesa.escreve) return;
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
    if (!b || !ligado()) return;
    const fila = pendentes; pendentes = {};
    Object.keys(fila).forEach(id => {
      const p = fila[id];
      const base = 'mesas/' + salaLigada + '/fichas/' + p.dono + '/' + id;
      const carimbo = {
        dono: p.dono,
        autor: (mesa.usuario.displayName || mesa.usuario.email || ''),
        atualizadoEm: firebase.database.ServerValue.TIMESTAMP,
      };
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
        console.warn('[ficha-mesa] não deu para publicar:', e.message);
      });
    });
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

  // Apagar de verdade: some da mesa junto.
  function apagar(id, dono) {
    const b = db();
    if (!b || !ligado()) return;
    delete pendentes[id];
    b.ref('mesas/' + salaLigada + '/fichas/' + (dono || meuUid()) + '/' + id).remove()
      .catch(e => console.warn('[ficha-mesa] não deu para apagar:', e && e.message));
  }

  window.GA_FichaMesa = {
    publicar: publicar,
    apagar: apagar,
    // o que a barra de fichas precisa saber para se desenhar
    estado: function () {
      return {
        ligado: ligado(),
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
      const antes = ligado();
      mesa = e;
      ligar();
      if (!antes && ligado()) publicarTudo();     // acabou de entrar na mesa
      try {
        if (window.GA_Ficha && window.GA_Ficha.mesaMudou) window.GA_Ficha.mesaMudou();
      } catch (err) { console.warn('[ficha-mesa]', err && err.message); }
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
