// NOTICIAS-MESA.JS — leitura e publicação das gazetas no Firebase.
//
// campanhas/<id>: corpo da gazeta, acessível a quem tem o endereço.
// gazeta/publicas: índice público aprovado pelo dono do site.
// usuarios/<uid>/campanhas: índice privado das campanhas da conta.
//
// A gazeta padrão é consultada pelo ID, sem matérias embutidas no código.
// As demais são carregadas por índice, endereço ou seleção da aba.
// As regras do Firebase continuam sendo a autoridade sobre a escrita.
// Sem resposta, a tela mostra carregamento, erro e nova tentativa.
(function () {
  'use strict';

  //  O dono do site. Não é segredo (uid não abre porta nenhuma) e aqui
  //  serve só para a TELA oferecer o painel; quem decide de verdade é a
  //  regra do banco, que tem este mesmo uid escrito nela.
  const ADMIN_UID = 'uxcc4lwMDceDqGFRrMwctv1Gi9D2';

  // Apenas o endereço da gazeta padrão; nenhum conteúdo fica no código.
  const GAZETA_PADRAO = 'penitencia-de-azgher';
  const PRAZO_LEITURA = 12000;
  let iniciado = false, indiceCarregado = false, minhasCarregadas = true;
  let erroIndice = '', erroMinhas = '';
  const errosCorpos = {};
  const prazos = {};

  let mesa = null;                 // último estado do GA_Mesa
  let chaveMesa = null;            // configuração + conta que sustentam as escutas da gazeta
  let ultimoErro = '';
  let timer = null, fila = {};
  let gravando = 0;
  let sessao = 0;
  const errosEscrita = {};

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

  function aguardar(chave, falhar) {
    concluir(chave);
    prazos[chave] = setTimeout(() => { delete prazos[chave]; falhar(); entregar(); }, PRAZO_LEITURA);
  }
  function concluir(chave) {
    clearTimeout(prazos[chave]);
    delete prazos[chave];
  }

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
      aguardar('publicas', () => { erroIndice = 'A consulta demorou demais.'; });
      const ref = refPub = b.ref('gazeta/publicas');
      cbPub = refPub.on('value', snap => {
        if (refPub !== ref) return;
        concluir('publicas');
        indiceCarregado = true; erroIndice = '';
        publicas = snap.val() || {};
        acertarCorpos();
        entregar();
      }, err => {
        if (refPub !== ref) return;
        concluir('publicas');
        erroIndice = (err && err.message) || 'Falha na consulta.';
        console.warn('[noticias-mesa] vitrine:', erroIndice);
        entregar();
      });
    }

    //  O índice da minha conta troca quando eu entro e quando eu saio.
    const uid = meuUid();
    if (minhasDe !== uid) {
      if (refMinhas && cbMinhas) { try { refMinhas.off('value', cbMinhas); } catch (e) {} }
      refMinhas = null; cbMinhas = null; minhasIdx = {}; minhasDe = uid;
      concluir('minhas');
      minhasCarregadas = !uid; erroMinhas = '';
      if (uid) {
        aguardar('minhas', () => { erroMinhas = 'A consulta da conta demorou demais.'; });
        const ref = refMinhas = b.ref('usuarios/' + uid + '/campanhas');
        cbMinhas = refMinhas.on('value', snap => {
          if (refMinhas !== ref) return;
          concluir('minhas');
          minhasCarregadas = true; erroMinhas = '';
          minhasIdx = snap.val() || {};
          acertarCorpos();
          entregar();
        }, err => {
          if (refMinhas !== ref) return;
          concluir('minhas'); erroMinhas = (err && err.message) || 'Falha na consulta da conta.';
          entregar();
        });
      }
    }

    acertarCorpos();
  }

  function desligar() {
    if (refPub && cbPub) { try { refPub.off('value', cbPub); } catch (e) {} }
    if (refMinhas && cbMinhas) { try { refMinhas.off('value', cbMinhas); } catch (e) {} }
    refPub = null; cbPub = null; refMinhas = null; cbMinhas = null; minhasDe = '';
    Object.keys(ouvindo).forEach(largar);
    Object.keys(prazos).forEach(concluir);
    indiceCarregado = false; minhasCarregadas = !meuUid();
  }

  // ── OS CORPOS, UM A UM ───────────────────────────────────────────
  //  Baixa-se a gazeta de: toda campanha minha (para a edição e o
  //  painel não perderem nada), a que veio no endereço, e a que está
  //  aberta na tela. As outras da vitrine ficam só com o nome.
  function queroOCorpo() {
    const q = { [GAZETA_PADRAO]: true };
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
    const assinatura = ouvindo[id] = { ref: ref, cb: null };
    aguardar(id, () => { errosCorpos[id] = 'A consulta demorou demais.'; });
    const cb = ref.on('value', snap => {
      if (ouvindo[id] !== assinatura) return;
      concluir(id); delete errosCorpos[id];
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
      if (ouvindo[id] !== assinatura) return;
      concluir(id);
      errosCorpos[id] = (err && err.message) || 'Falha na consulta.';
      console.warn('[noticias-mesa] campanha ' + id + ':', err && err.message);
      entregar();
    });
    assinatura.cb = cb;
  }

  function largar(id) {
    concluir(id);
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
    por(GAZETA_PADRAO, publicas[GAZETA_PADRAO]);
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
  //  O dono do site edita suas próprias gazetas fora da sala antiga.
  //  Nas campanhas de outras pessoas, a regra do banco
  //  deixa-o escrever em qualquer campanha (é o que o faz poder apagar
  //  abuso), mas dizer "pode" nesta função ligaria o SALVAMENTO
  //  AUTOMÁTICO: ele abriria a gazeta de um estranho na edição, uma
  //  tecla cairia na tela e a gazeta do outro seria sobrescrita. O
  //  poder de mando dele mora no 🛡 Painel do dono, sob clique e com
  //  confirmação — não no teclado.
  function possoEscrever(id) {
    if (!configurado() || !meuUid()) return false;
    // O administrador pode editar sua própria gazeta, mesmo fora da sala.
    const c = corpos[id];
    if (souDono() && c && c.dono === meuUid()) return true;
    if (errosCorpos[id] || (ouvindo[id] && !c && !vazios[id])) return false;
    //  A GAZETA SEGUE O DONO DA MESA (F3). Se esta é a campanha da mesa
    //  aberta e ela TEM dono, só o mestre dela escreve na gazeta — é o que
    //  a regra do banco passou a exigir também. Sem isto, um jogador (ou
    //  qualquer logado que abrisse o link antes de o mestre publicar) via a
    //  gazeta "editável", escrevia, e só levava "permission denied" ao
    //  salvar — ou, pior, carimbava a gazeta da campanha alheia como sua.
    //  Mesa órfã (sem dono) continua valendo quem chegar, como as mesas velhas.
    const e = window.GA_Mesa ? window.GA_Mesa.estado() : null;
    if (e && e.mesaId === id && e.mesa && e.mesa.dono) return e.souMestre;
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
    const nestaSessao = sessao;
    const agora_ = fila; fila = {};
    Object.keys(agora_).forEach(id => {
      // A conta pode mudar enquanto a escrita aguarda os 700 ms.
      if (!possoEscrever(id)) return;
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

      gravando++;
      b.ref().update(upd)
        .then(() => {
          if (nestaSessao !== sessao) return;
          gravando--; delete errosEscrita[id];
          ultimoErro = Object.values(errosEscrita).join(' · '); avisar();
        })
        .catch(e => {
          if (nestaSessao !== sessao) return;
          gravando--;
          errosEscrita[id] = 'Gazeta “' + (camp.nome || id) + '”: ' + e.message;
          ultimoErro = Object.values(errosEscrita).join(' · ');
          console.warn('[noticias-mesa] não deu para publicar:', e.message);
          avisar();
        });
    });
  }

  // Excluir a campanha remove o conteúdo do banco, da vitrine e do
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
      .catch(e => { ultimoErro = e.message; avisar(); throw e; });
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
    tentarNovamente: function () {
      desligar();
      erroIndice = ''; erroMinhas = '';
      Object.keys(errosCorpos).forEach(id => { delete errosCorpos[id]; });
      ligar(); entregar();
    },
    ADMIN_UID: ADMIN_UID,
    estado: function () {
      return {
        iniciado: iniciado,
        carregando: !iniciado || (configurado() && ((!indiceCarregado && !erroIndice) || (!minhasCarregadas && !erroMinhas))),
        erroLeitura: erroIndice || erroMinhas,
        errosCampanhas: Object.assign({}, errosCorpos),
        configurado: configurado() && !!db(),
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
        salvando: gravando > 0 || Object.keys(fila).length > 0,
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
        const proximaChave = (e && e.configurado ? '1' : '0') + ':' +
          ((e && e.usuario && e.usuario.uid) || '');
        const mudouConexao = chaveMesa !== proximaChave;
        mesa = e; iniciado = true;
        // A Mesa também avisa por membros, pedidos e metadados. A gazeta
        // não precisa reabrir todas as suas leituras por esses eventos.
        // noticias.js atualiza só o botão/linha de estado nesse caso.
        if (!mudouConexao) { avisar(); return; }
        chaveMesa = proximaChave;
        if (antes !== meuUid()) {
          sessao++; clearTimeout(timer); fila = {}; gravando = 0; ultimoErro = '';
          Object.keys(errosEscrita).forEach(id => { delete errosEscrita[id]; });
        }
        ligar();
        entregar();
        if (antes !== meuUid()) avisar();      // entrou ou saiu: a tela muda de botão
      });
      return;
    }
    if (!segundaChance && document.readyState !== 'complete') {
      document.addEventListener('DOMContentLoaded', function () { init(true); }, { once: true });
      return;
    }
    iniciado = true;
    avisar();
  }
  init();
})();
