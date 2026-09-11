// ═══════════════════════════════════════════════════════════════════
//  NOTICIAS-MESA.JS — a gazeta no banco, aberta ao mundo
//  Carregado nas DUAS páginas, depois do mesa.js.
//
//  O QUE ISTO RESOLVE. Até aqui as notícias moravam em
//  `js/noticias-data.js`, um arquivo do repositório: escrever uma
//  manchete era editar no site, baixar o arquivo, trocar na pasta e
//  dar `git push`. Ou seja — só o dono do repositório publicava, e a
//  notícia só chegava aos jogadores no próximo commit. Agora cada
//  campanha vive em `campanhas/<id>` e a manchete aparece na hora.
//
//  QUEM VÊ E QUEM ESCREVE (é regra de banco, não botão escondido):
//    • LER, qualquer pessoa — logada ou não, jogador ou visita, de
//      TODAS as campanhas. Foi o pedido dele: *"qualquer pessoa que
//      entrar nos Grifos Alados vê as notícias de todas as campanhas,
//      porque ficam nas memórias"*. A gazeta é o registro do mundo,
//      não o mural de um grupo.
//    • ESCREVER, só o DONO daquela campanha — quem a publicou. Uma
//      campanha sem dono é órfã, e quem chegar assume, igualzinho às
//      mesas velhas (ver mesa.js).
//
//  O ARQUIVO NÃO MORREU, e não deve morrer: ele é o chão. Sem Firebase
//  configurado, sem internet ou com o site aberto do disco, a gazeta
//  continua sendo a do `noticias-data.js` — o banco só ENTRA POR CIMA
//  das campanhas que existem nele. É o mesmo acordo do resto do site:
//  offline nada quebra, só deixa de atualizar.
// ═══════════════════════════════════════════════════════════════════
(function () {
  'use strict';

  let mesa = null;                 // último estado do GA_Mesa
  let refCamp = null, cbCamp = null, ligadoEm = '';
  let remotas = {};                // id → { nome, dono, noticias, autor, atualizadoEm }
  let ultimoErro = '';
  let timer = null, fila = {};

  function db() { return window.GA_Mesa ? window.GA_Mesa.db() : null; }
  function configurado() { return !!(mesa && mesa.configurado); }
  function meuUid() { return (mesa && mesa.usuario) ? mesa.usuario.uid : ''; }
  function meuNome() {
    const u = mesa && mesa.usuario;
    return (u && (u.displayName || u.email)) || '';
  }
  function agora() { return firebase.database.ServerValue.TIMESTAMP; }

  // ── LER ──────────────────────────────────────────────────────────
  //  Sem login nenhum: `campanhas` é de leitura pública, e a gazeta
  //  precisa aparecer para quem só abriu o site.
  function ligar() {
    if (!configurado()) return desligar();
    const b = db();
    if (!b || ligadoEm === 'sim') return;
    desligar();
    ligadoEm = 'sim';
    refCamp = b.ref('campanhas');
    cbCamp = refCamp.on('value', snap => {
      remotas = snap.val() || {};
      entregar();
    }, err => {
      // sem as regras publicadas o banco recusa — e isso é recado, não
      // acidente: a gazeta local continua na tela
      ultimoErro = (err && err.message) || '';
      console.warn('[noticias-mesa] leitura:', ultimoErro);
      entregar();
    });
  }

  function desligar() {
    if (refCamp && cbCamp) { try { refCamp.off('value', cbCamp); } catch (e) {} }
    refCamp = null; cbCamp = null; ligadoEm = '';
  }

  function entregar() {
    try {
      if (window.GA_Noticias && window.GA_Noticias.receberDaMesa) {
        window.GA_Noticias.receberDaMesa(remotas, meuUid());
      }
    } catch (e) { console.warn('[noticias-mesa] entregar:', e && e.message); }
  }

  // ── ESCREVER ─────────────────────────────────────────────────────
  //  O Realtime Database recusa `undefined` e transforma array com
  //  buraco em objeto; a gazeta vem de um arquivo escrito à mão, então
  //  pode ter os dois.
  function limpo(v) {
    if (v === undefined) return null;
    return JSON.parse(JSON.stringify(v));
  }

  // Quem pode escrever nesta campanha: o dono, ou qualquer um se ela
  // for órfã (ou ainda não existir). A regra do banco diz o mesmo — isto
  // aqui é só para a tela não oferecer o que vai ser recusado.
  function possoEscrever(id) {
    if (!configurado() || !meuUid()) return false;
    const c = remotas[id];
    if (!c) return true;                       // ainda não existe: quem publicar é dono
    return !c.dono || c.dono === meuUid();
  }

  //  Publicar junta a digitação: o mestre escreve uma notícia inteira
  //  e o banco recebe uma escrita só.
  function publicar(camp) {
    if (!camp || !camp.id || !possoEscrever(camp.id)) return;
    fila[camp.id] = camp;
    clearTimeout(timer);
    timer = setTimeout(enviar, 700);
  }

  function enviar() {
    const b = db();
    if (!b || !meuUid()) return;
    const agora_ = fila; fila = {};
    Object.keys(agora_).forEach(id => {
      const camp = agora_[id];
      const existe = !!remotas[id];
      const corpo = {
        nome: String(camp.nome || ''),
        noticias: limpo(camp.anos) || [],
        // o "📅 hoje" da gazeta; null apaga (o mestre tirou a data). Quem
        // chama sem mandar a chave não mexe no que está no banco
        hoje: camp.hoje ? limpo(camp.hoje) : null,
        autor: meuNome(),
        atualizadoEm: agora(),
      };
      if (!('hoje' in camp)) delete corpo.hoje;
      // Campanha nova (ou órfã) ganha dono na mesma escrita: é o que a
      // regra pede para deixar criar, e o que impede outra pessoa de
      // reescrever a gazeta depois.
      if (!existe || !remotas[id].dono) corpo.dono = meuUid();
      if (!existe) corpo.criadaEm = agora();

      b.ref('campanhas/' + id).update(corpo)
        .then(() => { ultimoErro = ''; avisar(); })
        .catch(e => {
          ultimoErro = e.message;
          console.warn('[noticias-mesa] não deu para publicar:', e.message);
          avisar();
        });
    });
  }

  // Tirar do ar. O que está no `noticias-data.js` continua no arquivo —
  // isto some do banco, para todo mundo.
  function apagar(id) {
    const b = db();
    if (!b || !possoEscrever(id) || !remotas[id]) return Promise.resolve();
    delete fila[id];
    return b.ref('campanhas/' + id).remove()
      .catch(e => { ultimoErro = e.message; console.warn('[noticias-mesa] não deu para apagar:', e.message); });
  }

  function avisar() {
    try {
      if (window.GA_Noticias && window.GA_Noticias.mesaMudou) window.GA_Noticias.mesaMudou();
    } catch (e) {}
  }

  window.GA_NoticiasMesa = {
    publicar: publicar,
    apagar: apagar,
    possoEscrever: possoEscrever,
    estado: function () {
      return {
        configurado: configurado(),
        usuario: mesa ? mesa.usuario : null,
        meuUid: meuUid(),
        nomes: (function () {                 // id → quem é dono, para a tela contar
          const m = {};
          Object.keys(remotas).forEach(id => {
            m[id] = { dono: remotas[id].dono || '', autor: remotas[id].autor || '' };
          });
          return m;
        })(),
        erro: ultimoErro,
      };
    },
  };

  // O GA_Mesa nasce no mesa.js, que é carregado depois deste arquivo
  // nas duas páginas. Um script `defer` roda com readyState já em
  // "interactive", então init() acontece ANTES de o mesa.js existir —
  // daí a segunda chance no DOMContentLoaded, quando todos já rodaram.
  function init(segundaChance) {
    if (window.GA_Mesa) {
      window.GA_Mesa.aoMudar(function (e) {
        const antes = meuUid();
        mesa = e;
        ligar();
        if (antes !== meuUid()) avisar();      // entrou ou saiu: a tela muda de botão
      });
      return;
    }
    if (!segundaChance && document.readyState !== 'complete') {
      document.addEventListener('DOMContentLoaded', function () { init(true); }, { once: true });
      return;
    }
    // sem Firebase a gazeta é a do arquivo, e está tudo certo assim
  }
  init();
})();
