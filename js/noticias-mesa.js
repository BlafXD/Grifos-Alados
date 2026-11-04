// ═══════════════════════════════════════════════════════════════════
//  NOTICIAS-MESA.JS — a gazeta no banco: oculta por padrão, pública
//  quando o dono do site aprova.
//  Carregado nas DUAS páginas, depois do mesa.js.
//
//  O QUE ISTO RESOLVE. Até aqui as notícias moravam em
//  `js/noticias-data.js`, um arquivo do repositório: escrever uma
//  manchete era editar no site, baixar o arquivo, trocar na pasta e
//  dar `git push`. Ou seja — só o dono do repositório publicava, e a
//  notícia só chegava aos jogadores no próximo commit. Agora cada
//  campanha vive em `campanhas/<id>` e a manchete aparece na hora.
//
//  ── A MUDANÇA DE 02/11/2026: A GAZETA DEIXOU DE SER UM MURAL ABERTO
//
//  O site foi divulgado no Reddit, e o desenho antigo não aguentava
//  gente de fora: o nó `campanhas` era de leitura pública INTEIRO, e
//  a tela mostrava TODAS as campanhas do banco a TODO visitante. Duas
//  consequências, as duas ruins:
//
//    1. qualquer pessoa logada publicava na gazeta que todo mundo vê;
//    2. o navegador de cada visitante BAIXAVA todas as gazetas do
//       banco a cada carregamento de página — inclusive as que não
//       interessavam a ele. Com dez campanhas de estranhos, dez
//       gazetas por F5, na cota de graça do Firebase.
//
//  O desenho novo tem três camadas, e a primeira é o que muda tudo:
//  **`campanhas` (o pai) não é mais legível; `campanhas/<id>` é.**
//  Quem tem o id lê a gazeta inteira; quem não tem não consegue nem
//  descobrir que ela existe. Daí:
//
//    • `gazeta/publicas/<id>` → { nome, autor, em } — a lista das
//      campanhas APROVADAS. Leitura pública, escrita SÓ do dono do
//      site. É a vitrine ("já existiram estas campanhas nos Grifos"),
//      e é a única coisa que o visitante baixa ao abrir o site: um
//      nome e um autor por campanha, não a gazeta.
//    • `usuarios/<uid>/campanhas/<id>` → true — o índice das MINHAS
//      campanhas, dentro do nó que já era privado de cada conta. É
//      assim que o dono reencontra a própria gazeta em outro
//      navegador, mesmo ela estando oculta.
//    • o ENDEREÇO (`?gazeta=<id>`, ou a própria mesa em `?mesa=`) abre
//      uma campanha oculta para quem recebeu o link. É o que faz o
//      mestre de fora poder mandar a gazeta dele para os jogadores
//      dele sem que ela apareça para mais ninguém.
//
//  E O CORPO VEM SÓ QUANDO SE ABRE. A lista dá os nomes das abas; as
//  notícias de uma campanha só descem quando ela é a aba aberta (ou
//  quando é sua). Por isso o site ficou mais leve do que era antes,
//  não mais pesado — e por isso a vitrine pode crescer sem medo.
//
//  QUEM ESCREVE (é regra de banco, não botão escondido): só o DONO
//  daquela campanha — quem a publicou —, e o dono do site, que pode
//  apagar abuso. Uma campanha sem dono é órfã, e quem chegar assume,
//  igualzinho às mesas velhas (ver mesa.js).
//
//  O ARQUIVO NÃO MORREU, e não deve morrer: ele é o chão. Sem Firebase
//  configurado, sem internet ou com o site aberto do disco, a gazeta
//  continua sendo a do `noticias-data.js` — o banco só ENTRA POR CIMA
//  das campanhas que existem nele. É o mesmo acordo do resto do site:
//  offline nada quebra, só deixa de atualizar.
// ═══════════════════════════════════════════════════════════════════
(function () {
  'use strict';

  //  O dono do site. Não é segredo (uid não abre porta nenhuma) e aqui
  //  serve só para a TELA oferecer o painel; quem decide de verdade é a
  //  regra do banco, que tem este mesmo uid escrito nela.
  const ADMIN_UID = 'uxcc4lwMDceDqGFRrMwctv1Gi9D2';

  let mesa = null;                 // último estado do GA_Mesa
  let ultimoErro = '';
  let timer = null, fila = {};

  //  O QUE ESTÁ NO AR, em três mapas separados — o que se SABE que
  //  existe (índices, leves) e o que se BAIXOU (corpos, pesados).
  let publicas = {};               // id → { nome, autor, em }      (aprovadas)
  let minhasIdx = {};              // id → true                     (da minha conta)
  let corpos = {};                 // id → { nome, noticias, hoje, dono, autor, … }
  const ouvindo = {};              // id → { ref, cb }              (corpos ligados)
  const vazios = {};               // id → pedi e o banco não tem nada lá
  let abertaId = '';               // a campanha que a tela mostra agora

  let refPub = null, cbPub = null;
  let refMinhas = null, cbMinhas = null, minhasDe = '';

  function db() { return window.GA_Mesa ? window.GA_Mesa.db() : null; }
  function configurado() { return !!(mesa && mesa.configurado); }
  function meuUid() { return (mesa && mesa.usuario) ? mesa.usuario.uid : ''; }
  function souDono() { return meuUid() === ADMIN_UID; }
  function meuNome() {
    const u = mesa && mesa.usuario;
    return (u && (u.displayName || u.email)) || '';
  }
  function agora() { return firebase.database.ServerValue.TIMESTAMP; }

  // ── O QUE O ENDEREÇO PEDE ────────────────────────────────────────
  //  `?gazeta=<id>` é o link de uma gazeta oculta. O id da MESA também
  //  entra na conta porque quase sempre a campanha tem o mesmo nome da
  //  sala — e pedir um nó que não existe não custa nada (volta null).
  function doEndereco() {
    const ids = [];
    try {
      const p = new URLSearchParams(location.search);
      const g = (p.get('gazeta') || '').trim();
      if (g) ids.push(window.GA_Sala ? window.GA_Sala.idDe(g) : g.toLowerCase());
    } catch (e) {}
    const sala = (window.GA_Sala && window.GA_Sala.id) || '';
    if (sala && ids.indexOf(sala) < 0) ids.push(sala);
    return ids.filter(Boolean);
  }
  const ENDERECO = doEndereco();

  // ── LER ──────────────────────────────────────────────────────────
  //  Sem login nenhum: `gazeta/publicas` é de leitura pública, e a
  //  vitrine precisa aparecer para quem só abriu o site.
  function ligar() {
    if (!configurado()) return desligar();
    const b = db();
    if (!b) return;

    if (!refPub) {
      refPub = b.ref('gazeta/publicas');
      cbPub = refPub.on('value', snap => {
        publicas = snap.val() || {};
        acertarCorpos();
        entregar();
      }, err => {
        // sem as regras publicadas o banco recusa — e isso é recado, não
        // acidente: a gazeta local continua na tela
        ultimoErro = (err && err.message) || '';
        console.warn('[noticias-mesa] vitrine:', ultimoErro);
        entregar();
      });
    }

    //  O índice da minha conta troca quando eu entro e quando eu saio.
    const uid = meuUid();
    if (minhasDe !== uid) {
      if (refMinhas && cbMinhas) { try { refMinhas.off('value', cbMinhas); } catch (e) {} }
      refMinhas = null; cbMinhas = null; minhasIdx = {}; minhasDe = uid;
      if (uid) {
        refMinhas = b.ref('usuarios/' + uid + '/campanhas');
        cbMinhas = refMinhas.on('value', snap => {
          minhasIdx = snap.val() || {};
          acertarCorpos();
          entregar();
        }, err => console.warn('[noticias-mesa] índice da conta:', err && err.message));
      }
    }

    acertarCorpos();
  }

  function desligar() {
    if (refPub && cbPub) { try { refPub.off('value', cbPub); } catch (e) {} }
    if (refMinhas && cbMinhas) { try { refMinhas.off('value', cbMinhas); } catch (e) {} }
    refPub = null; cbPub = null; refMinhas = null; cbMinhas = null; minhasDe = '';
    Object.keys(ouvindo).forEach(largar);
  }

  // ── OS CORPOS, UM A UM ───────────────────────────────────────────
  //  Baixa-se a gazeta de: toda campanha minha (para o arquivo e o
  //  painel não perderem nada), a que veio no endereço, e a que está
  //  aberta na tela. As outras da vitrine ficam só com o nome.
  function queroOCorpo() {
    const q = {};
    Object.keys(minhasIdx).forEach(id => { q[id] = true; });
    ENDERECO.forEach(id => { q[id] = true; });
    if (abertaId) q[abertaId] = true;
    return q;
  }

  function acertarCorpos() {
    if (!configurado()) return;
    const quero = queroOCorpo();
    Object.keys(quero).forEach(pegar);
    //  Larga-se o que não interessa mais, MENOS o que já veio: manter a
    //  escuta de uma aba que o mestre acabou de fechar é barato, e
    //  desligar faria a gazeta sumir da tela no meio de uma edição.
    Object.keys(ouvindo).forEach(id => {
      if (!quero[id] && !corpos[id]) largar(id);
    });
  }

  function pegar(id) {
    if (!id || ouvindo[id]) return;
    const b = db();
    if (!b) return;
    const ref = b.ref('campanhas/' + id);
    const cb = ref.on('value', snap => {
      const v = snap.val();
      //  PEDI E NÃO HÁ NADA. Acontece de verdade: o "🗑 Encerrar a
      //  campanha" (mesa.js) apaga `campanhas/<id>` e não mexe no
      //  índice da conta, e o dono do site pode apagar uma campanha
      //  que estava na vitrine. Sem anotar isto, a tela ficaria com uma
      //  ABA FANTASMA — o nome do índice e gazeta nenhuma por baixo.
      if (v) { corpos[id] = v; delete vazios[id]; }
      else   { delete corpos[id]; vazios[id] = true; }
      entregar();
    }, err => {
      console.warn('[noticias-mesa] campanha ' + id + ':', err && err.message);
      largar(id);
      entregar();
    });
    ouvindo[id] = { ref: ref, cb: cb };
  }

  function largar(id) {
    const o = ouvindo[id];
    if (!o) return;
    try { o.ref.off('value', o.cb); } catch (e) {}
    delete ouvindo[id];
  }

  //  O que a tela recebe: TODA campanha que se sabe existir, com o
  //  corpo se ele já desceu e com `semCorpo` quando ainda não. É a
  //  junção dos três caminhos — vitrine, minha conta e endereço.
  function paraATela() {
    const saida = {};
    function por(id, base) {
      if (!id || vazios[id]) return;      // campanha apagada: não vira aba fantasma
      const c = corpos[id];
      if (c) { saida[id] = Object.assign({}, c, { publica: !!publicas[id] }); return; }
      saida[id] = {
        nome: (base && base.nome) || (typeof minhasIdx[id] === 'string' ? minhasIdx[id] : '') || id,
        autor: (base && base.autor) || '',
        noticias: [],
        hoje: null,
        dono: '',
        semCorpo: true,
        publica: !!publicas[id],
      };
    }
    Object.keys(publicas).forEach(id => por(id, publicas[id]));
    Object.keys(minhasIdx).forEach(id => por(id, publicas[id]));
    ENDERECO.forEach(id => por(id, publicas[id]));
    //  Uma aba que o mestre abriu e que não está em índice nenhum (o
    //  caso do dono do site olhando a campanha de outra pessoa) também
    //  tem de aparecer enquanto estiver aberta.
    Object.keys(corpos).forEach(id => por(id, publicas[id]));
    return saida;
  }

  function entregar() {
    try {
      if (window.GA_Noticias && window.GA_Noticias.receberDaMesa) {
        window.GA_Noticias.receberDaMesa(paraATela(), meuUid());
      }
    } catch (e) { console.warn('[noticias-mesa] entregar:', e && e.message); }
  }

  //  A TELA DIZ QUAL ABA ESTÁ ABERTA. Chamado pelo noticias.js a cada
  //  desenho: é o gatilho que desce o corpo daquela gazeta.
  function abrir(id) {
    if (!id || abertaId === id) return;
    abertaId = id;
    acertarCorpos();
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
  //
  //  ATENÇÃO À CAMPANHA QUE NÃO SE CONHECE. Sem leitura do nó pai, uma
  //  campanha de estranho é invisível: um nome novo pode cair num id
  //  que já existe. Aqui diz-se "pode", e quem recusa é o banco — o
  //  recado do erro então sugere trocar o nome.
  //  O DONO DO SITE NÃO ENTRA AQUI, de propósito. A regra do banco
  //  deixa-o escrever em qualquer campanha (é o que o faz poder apagar
  //  abuso), mas dizer "pode" nesta função ligaria o SALVAMENTO
  //  AUTOMÁTICO: ele abriria a gazeta de um estranho na edição, uma
  //  tecla cairia na tela e a gazeta do outro seria sobrescrita. O
  //  poder de mando dele mora no 🛡 Painel do dono, sob clique e com
  //  confirmação — não no teclado.
  function possoEscrever(id) {
    if (!configurado() || !meuUid()) return false;
    //  A GAZETA SEGUE O DONO DA MESA (F3). Se esta é a campanha da mesa
    //  aberta e ela TEM dono, só o mestre dela escreve na gazeta — é o que
    //  a regra do banco passou a exigir também. Sem isto, um jogador (ou
    //  qualquer logado que abrisse o link antes de o mestre publicar) via a
    //  gazeta "editável", escrevia, e só levava "permission denied" ao
    //  salvar — ou, pior, carimbava a gazeta da campanha alheia como sua.
    //  Mesa órfã (sem dono) continua valendo quem chegar, como as mesas velhas.
    const e = window.GA_Mesa ? window.GA_Mesa.estado() : null;
    if (e && e.mesaId === id && e.mesa && e.mesa.dono) return e.souMestre;
    const c = corpos[id];
    if (c) return !c.dono || c.dono === meuUid();
    if (publicas[id] && !minhasIdx[id]) return false;   // aprovada de outra pessoa
    return true;                                        // não se sabe: tenta
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
    const uid = meuUid();
    if (!b || !uid) return;
    const agora_ = fila; fila = {};
    Object.keys(agora_).forEach(id => {
      const camp = agora_[id];
      const existe = !!corpos[id];
      const base = 'campanhas/' + id + '/';
      //  UMA escrita de vários caminhos: a gazeta e o índice da conta
      //  sobem juntos ou não sobem. O Firebase valida caminho a
      //  caminho, e cada um destes tem a sua regra.
      const upd = {};
      upd[base + 'nome'] = String(camp.nome || '');
      upd[base + 'noticias'] = limpo(camp.anos) || [];
      upd[base + 'autor'] = meuNome();
      upd[base + 'atualizadoEm'] = agora();
      // o "📅 hoje" da gazeta; null apaga (o mestre tirou a data). Quem
      // chama sem mandar a chave não mexe no que está no banco
      if ('hoje' in camp) upd[base + 'hoje'] = camp.hoje ? limpo(camp.hoje) : null;
      // Campanha nova (ou órfã) ganha dono na mesma escrita: é o que a
      // regra pede para deixar criar, e o que impede outra pessoa de
      // reescrever a gazeta depois.
      if (!existe || !corpos[id].dono) upd[base + 'dono'] = uid;
      if (!existe) upd[base + 'criadaEm'] = agora();
      // o índice da minha conta: é por ele que eu reencontro esta
      // gazeta oculta em outro navegador. Guarda o NOME, como o
      // `usuarios/<uid>/mesas` já fazia — assim a aba sai escrita
      // certa antes de o corpo da gazeta descer.
      if (!existe || corpos[id].dono === uid) {
        upd['usuarios/' + uid + '/campanhas/' + id] = String(camp.nome || id);
      }

      b.ref().update(upd)
        .then(() => { ultimoErro = ''; avisar(); })
        .catch(e => {
          ultimoErro = e.message;
          console.warn('[noticias-mesa] não deu para publicar:', e.message);
          avisar();
        });
    });
  }

  // Tirar do ar. O que está no `noticias-data.js` continua no arquivo —
  // isto some do banco, para todo mundo. Sai também da vitrine e do
  // índice da conta, senão fica uma aba apontando para o vazio.
  function apagar(id) {
    const b = db();
    const uid = meuUid();
    if (!b || !uid || !possoEscrever(id) || !corpos[id]) return Promise.resolve();
    delete fila[id];
    const upd = {};
    upd['campanhas/' + id] = null;
    upd['usuarios/' + uid + '/campanhas/' + id] = null;
    if (souDono()) upd['gazeta/publicas/' + id] = null;
    return b.ref().update(upd)
      .catch(e => { ultimoErro = e.message; console.warn('[noticias-mesa] não deu para apagar:', e.message); });
  }

  function avisar() {
    try {
      if (window.GA_Noticias && window.GA_Noticias.mesaMudou) window.GA_Noticias.mesaMudou();
    } catch (e) {}
  }

  // O link de uma gazeta oculta: é o que o mestre manda para os
  // jogadores dele.
  function linkDa(id, pagina) {
    const alvo = (pagina || 'index.html') + '?gazeta=' + encodeURIComponent(id);
    try { return new URL(alvo, location.href).href; } catch (e) { return alvo; }
  }

  window.GA_NoticiasMesa = {
    publicar: publicar,
    apagar: apagar,
    possoEscrever: possoEscrever,
    abrir: abrir,
    linkDa: linkDa,
    souDono: souDono,
    ADMIN_UID: ADMIN_UID,
    estado: function () {
      return {
        configurado: configurado(),
        usuario: mesa ? mesa.usuario : null,
        meuUid: meuUid(),
        souDono: souDono(),
        nomes: (function () {                 // id → quem é dono, para a tela contar
          const m = {};
          Object.keys(corpos).forEach(id => {
            m[id] = { dono: corpos[id].dono || '', autor: corpos[id].autor || '' };
          });
          return m;
        })(),
        publicas: Object.assign({}, publicas),
        minhas: Object.assign({}, minhasIdx),
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
