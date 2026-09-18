// ═══════════════════════════════════════════════════════════════════
//  GAVETA.JS — a gaveta da conta: o dado seguindo a PESSOA
//  Carregado nas DUAS páginas, depois do mesa.js.
//
//  O QUE ISTO RESOLVE. Até 18/09/2026 tudo o que o mestre produz morava
//  no localStorage, que é por ENDEREÇO. Mudar de github.io para
//  vercel.app, abrir o index.html do disco ou trocar de computador era
//  mudança de casa: a mobília não ia junto. O dia da mudança custou o
//  bestiário, o mapa e as anotações, restaurados à mão.
//
//  Aqui cada área registrada ganha um nó em `usuarios/<uid>/gaveta/`,
//  e quem entra com o Google encontra as suas coisas em qualquer
//  aparelho. O desenho inteiro está em docs/gaveta-da-conta.md.
//
//  GUARDAR NA CONTA ≠ EXIGIR CONTA. Sem login, sem internet ou sem
//  Firebase configurado, nada aqui roda e o site é exatamente o que
//  sempre foi: o localStorage continua sendo a cópia de TRABALHO, a
//  tela continua instantânea e o duplo-clique no index.html continua
//  funcionando. A conta é só quem manda quando as duas divergem.
//
//  UMA ÁREA POR NÓ, e nunca um nó só com tudo dentro: no Realtime
//  Database ler um nó traz tudo o que está embaixo, então juntar as
//  áreas faria abrir as Anotações baixar o bestiário junto. Foi esse o
//  erro do `mesas/<sala>/dados`, que carregava 756 KB de histórico de
//  loja em toda abertura de página.
//
//  A REGRA QUE O DIA DA MUDANÇA ENSINOU: a nuvem guarda CONTEÚDO; a
//  memória da conversa é de cada navegador e NÃO VIAJA. A digital daqui
//  mora no `grifosAlados.gavetaSinc`, e a mudanca.html sabe que essa
//  chave não entra na mala — levá-la faria o navegador novo chegar
//  dizendo "já combinamos isto" sem nunca ter conversado, e aí a cópia
//  velha desceria por cima da nova, calada. Foi exatamente o laço que
//  comeu a ficha do Caique em 18/09.
// ═══════════════════════════════════════════════════════════════════
(function () {
  'use strict';

  // A digital deste navegador, por área: { area: { dig, em } }.
  //  `dig` é o que combinamos com o banco da última vez; `em` é quando
  //  isso mudou AQUI, e serve de desempate para quem usa 'maisNovo'.
  const SINC_KEY = 'grifosAlados.gavetaSinc';

  //  A rede de segurança da escolha. Quando a pessoa decide entre a
  //  versão daqui e a da conta, a PERDEDORA fica guardada aqui, e a
  //  tarja oferece um "↩ voltar" — é o mesmo acordo que a ficha faz
  //  desde 15/09: nunca se apaga uma versão sem deixar saída. Isto é
  //  conteúdo, e não digital: pode viajar na mala sem problema.
  const GUARDADAS_KEY = 'grifosAlados.gavetaGuardadas';

  const areas = {};        // nome → { nome, chave, politica, aoReceber }
  const porChave = {};     // chave do localStorage → nome da área
  let sinc = {};
  try { sinc = JSON.parse(localStorage.getItem(SINC_KEY) || '{}') || {}; }
  catch (e) { sinc = {}; }
  let guardadas = {};
  try { guardadas = JSON.parse(localStorage.getItem(GUARDADAS_KEY) || '{}') || {}; }
  catch (e) { guardadas = {}; }

  let uidLigado = '';                 // de quem é a gaveta que estamos ouvindo
  const refs = {};                    // nome → { ref, cb }
  const remoto = {};                  // nome → { conteudo, em, porQuem } | null
  const chegou = {};                  // nome → o banco já respondeu?
  const retidas = {};                 // nome → { de, em } — mudou aqui E lá
  let escrevendoEuMesmo = false;      // para não confundir a minha gravação com uma edição
  let ultimoErro = '';
  const ouvintes = [];

  // ── ferramentas ─────────────────────────────────────────────────
  //  Mesma FNV-1a de 32 bits mais o tamanho que a trava do 📡 usa:
  //  basta para dizer "é o mesmo texto?" sem guardar uma segunda cópia.
  function digital(v) {
    if (v == null) return 'nulo';
    const s = String(v);
    let h = 0x811c9dc5;
    for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193); }
    return (h >>> 0).toString(36) + '.' + s.length;
  }

  // Um nome de tela para o aparelho, para a gaveta poder dizer "mudou no
  // celular". Deduzido, e não guardado: mais uma chave no localStorage
  // seria mais uma coisa a não deixar viajar na mala.
  function esteAparelho() {
    const ua = navigator.userAgent || '';
    const onde = /Android|iPhone|iPad|Mobile/i.test(ua) ? 'celular'
               : /Mac/i.test(ua) ? 'Mac'
               : /Windows/i.test(ua) ? 'Windows'
               : /Linux/i.test(ua) ? 'Linux' : 'aparelho';
    const qual = /Edg\//.test(ua) ? 'Edge'
               : /Chrome\//.test(ua) ? 'Chrome'
               : /Firefox\//.test(ua) ? 'Firefox'
               : /Safari\//.test(ua) ? 'Safari' : 'navegador';
    return qual + ' no ' + onde;
  }

  function temConfig() {
    return typeof firebase !== 'undefined' && window.GA_FIREBASE && window.GA_FIREBASE.apiKey;
  }
  function db() {
    if (!temConfig() || !window.GA_Mesa) return null;
    try { return window.GA_Mesa.db(); } catch (e) { return null; }
  }
  function meuUid() {
    const e = window.GA_Mesa ? window.GA_Mesa.estado() : null;
    return (e && e.usuario && e.usuario.uid) || '';
  }

  function lerLocal(nome) {
    try { return localStorage.getItem(areas[nome].chave); } catch (e) { return null; }
  }
  function gravarLocal(nome, texto) {
    escrevendoEuMesmo = true;
    try {
      const grava = window.GA_guardar || function (c, v) { localStorage.setItem(c, v); return true; };
      grava(areas[nome].chave, texto);
    } catch (e) { console.warn('[gaveta] não deu para gravar', nome, e && e.message); }
    escrevendoEuMesmo = false;
  }

  function marcarSinc(nome, texto) {
    sinc[nome] = { dig: digital(texto), em: Date.now() };
    guardarSinc();
  }
  function guardarSinc() {
    try {
      const grava = window.GA_guardar || function (c, v) { localStorage.setItem(c, v); return true; };
      grava(SINC_KEY, JSON.stringify(sinc));
    } catch (e) {}
  }

  function guardarGuardadas() {
    try {
      const grava = window.GA_guardar || function (c, v) { localStorage.setItem(c, v); return true; };
      grava(GUARDADAS_KEY, JSON.stringify(guardadas));
    } catch (e) {}
  }

  function avisar() {
    ouvintes.forEach(function (fn) {
      try { fn(estado()); } catch (e) { console.warn('[gaveta] ouvinte:', e && e.message); }
    });
    desenharTarja();
  }

  // ── A TARJA DA ESCOLHA ──────────────────────────────────────────
  //  A conferência da ficha pergunta dentro da própria ficha, porque lá
  //  há uma tela para isso. As áreas da gaveta não têm — o bestiário e
  //  as anotações são abas inteiras —, então a pergunta vem numa tarja
  //  no alto, como a do armazenamento cheio. Ela é ÂMBAR e não vermelha:
  //  não houve perda, há uma escolha a fazer.
  //
  //  E ela NÃO se fecha sozinha nem tem ✕: enquanto a área está retida,
  //  nada sobe nem desce. Deixar a pessoa dispensar o aviso seria deixá-la
  //  sem sincronia sem saber por quê.
  const RETIDA_ID = 'ga-gaveta-tarja';
  function desenharTarja() {
    if (typeof document === 'undefined' || !document.body) return;
    const velha = document.getElementById(RETIDA_ID);
    const nomes = Object.keys(retidas);
    const comVolta = Object.keys(guardadas);
    if (!nomes.length && !comVolta.length) { if (velha) velha.remove(); return; }

    const esc = window.GA_esc || function (s) { return String(s == null ? '' : s); };
    let html = '';
    nomes.forEach(function (nome) {
      const r = retidas[nome];
      html += '<div class="gv-caso" data-gv-area="' + esc(nome) + '">' +
        '<strong>' + esc(rotuloDe(nome)) + '</strong> mudou <em>aqui</em> e também <em>na sua conta</em>' +
        (r && r.de ? ' (' + esc(r.de) + ')' : '') + '. Qual fica?' +
        '<span class="gv-botoes">' +
          '<button type="button" class="gv-btn" data-gv="daqui" data-gv-area="' + esc(nome) + '">Ficar com a daqui</button>' +
          '<button type="button" class="gv-btn" data-gv="dela" data-gv-area="' + esc(nome) + '">Ficar com a da conta</button>' +
        '</span>' +
        '<span class="gv-mini">A outra fica guardada — dá para voltar.</span>' +
      '</div>';
    });
    comVolta.forEach(function (nome) {
      if (retidas[nome]) return;
      const g = guardadas[nome];
      html += '<div class="gv-caso gv-caso--feito" data-gv-area="' + esc(nome) + '">' +
        '<strong>' + esc(rotuloDe(nome)) + '</strong>: ficou com a ' + esc((g && g.ficou) || 'escolhida') + '.' +
        '<span class="gv-botoes">' +
          '<button type="button" class="gv-btn" data-gv="voltar" data-gv-area="' + esc(nome) + '">↩ Voltar para a outra</button>' +
          '<button type="button" class="gv-btn gv-btn--fim" data-gv="ok" data-gv-area="' + esc(nome) + '">Está certo</button>' +
        '</span>' +
      '</div>';
    });

    let caixa = velha;
    if (!caixa) {
      caixa = document.createElement('div');
      caixa.id = RETIDA_ID;
      caixa.className = 'gv-tarja';
      caixa.setAttribute('role', 'alert');
      caixa.addEventListener('click', aoClicarTarja);
      document.body.appendChild(caixa);
    }
    caixa.innerHTML = '<span class="gv-selo">🗂 Gaveta da conta</span>' + html;
  }

  function aoClicarTarja(e) {
    const btn = e.target.closest ? e.target.closest('[data-gv]') : null;
    if (!btn) return;
    e.preventDefault();
    const nome = btn.dataset.gvArea, acao = btn.dataset.gv;
    if (acao === 'ok')     { delete guardadas[nome]; guardarGuardadas(); return avisar(); }
    if (acao === 'voltar') return window.GA_Gaveta.desfazer(nome);
    window.GA_Gaveta.decidir(nome, acao);
  }

  function rotuloDe(nome) {
    return (areas[nome] && areas[nome].rotulo) || nome;
  }

  // ── A CONFERÊNCIA ───────────────────────────────────────────────
  //  A mesma lógica de três pontas da ficha (js/ficha.js, conferir()),
  //  aqui generalizada. Compara TRÊS versões: a daqui, a de lá e a
  //  COMBINADA — a que este navegador viu por último e aceitou.
  //
  //    • iguais                        → nada a fazer;
  //    • só a daqui mudou              → sobe;
  //    • só a de lá mudou              → desce;
  //    • as duas mudaram (ou este      → a política da área decide:
  //      navegador nunca combinou        'maisNovo' fica com a mais
  //      nada e elas diferem)            recente; 'perguntar' RETÉM,
  //                                      e nada sobe nem desce até
  //                                      alguém escolher.
  //
  //  Nunca há um lado "que ganha por padrão". Foi supor isso que fez a
  //  cópia velha comer a ficha boa no dia da mudança.
  function conferir(nome) {
    const a = areas[nome];
    if (!a || !chegou[nome]) return;

    const local = lerLocal(nome);
    const r = remoto[nome];
    const laTexto = r && typeof r.conteudo === 'string' ? r.conteudo : null;

    const dL = digital(local);
    const dR = digital(laTexto);
    const k = sinc[nome];
    const dK = k && k.dig;

    if (dL === dR) {                       // já combinam
      delete retidas[nome];
      if (dK !== dL) marcarSinc(nome, local);
      return avisar();
    }
    if (laTexto == null) {                 // o banco não conhece esta área
      delete retidas[nome];
      return subir(nome, local);
    }
    if (local == null || (dK && dK === dL)) {   // só de lá mudou
      delete retidas[nome];
      return descer(nome, laTexto);
    }
    if (dK && dK === dR) {                 // só daqui mudou
      delete retidas[nome];
      return subir(nome, local);
    }

    // as duas mudaram, ou este navegador nunca conversou com o banco
    if (a.politica === 'maisNovo') {
      // ⚠ Aqui se compara o relógio do SERVIDOR (o `em` do banco, posto
      //   pelo ServerValue.TIMESTAMP) com o relógio DESTA máquina (o
      //   Date.now() do marcarSinc). Se o computador estiver com a hora
      //   errada, o desempate erra junto. É aceitável para preferência
      //   — e é por isso que 'maisNovo' não serve para conteúdo: ali a
      //   política é 'perguntar', que não depende de relógio nenhum.
      const laEm = (r && r.em) || 0;
      const aquiEm = (k && k.em) || 0;
      // Empate vai para o banco: é o lado que outro aparelho pode estar
      // vendo agora, e uma preferência não vale uma briga.
      if (laEm >= aquiEm) return descer(nome, laTexto);
      return subir(nome, local);
    }
    retidas[nome] = { de: (r && r.porQuem) || 'outro aparelho', em: (r && r.em) || 0 };
    avisar();
  }

  function descer(nome, texto) {
    gravarLocal(nome, texto);
    marcarSinc(nome, texto);
    const fn = areas[nome].aoReceber;
    if (typeof fn === 'function') {
      try { fn(texto); } catch (e) { console.warn('[gaveta] aoReceber de', nome, e && e.message); }
    }
    avisar();
  }

  function subir(nome, texto) {
    const b = db(), uid = meuUid();
    if (!b || !uid) return;
    if (texto == null) return;             // não há o que mandar
    b.ref('usuarios/' + uid + '/gaveta/' + nome).set({
      conteudo: texto,
      em: firebase.database.ServerValue.TIMESTAMP,
      porQuem: esteAparelho(),
    }).then(function () {
      marcarSinc(nome, texto);
      ultimoErro = '';
      avisar();
    }).catch(function (e) {
      ultimoErro = (e && e.message) || '';
      console.warn('[gaveta] não deu para guardar', nome, ultimoErro);
      avisar();
    });
  }

  // ── ligar e desligar com a conta ────────────────────────────────
  function ligar() {
    const b = db(), uid = meuUid();
    if (!b || !uid) return desligar();
    if (uid === uidLigado) return ligarPendentes();
    desligar();
    uidLigado = uid;
    ligarPendentes();
  }

  function ligarPendentes() {
    const b = db();
    if (!b || !uidLigado) return;
    Object.keys(areas).forEach(function (nome) {
      if (refs[nome]) return;
      const ref = b.ref('usuarios/' + uidLigado + '/gaveta/' + nome);
      const cb = ref.on('value', function (snap) {
        remoto[nome] = snap.val() || null;
        chegou[nome] = true;
        conferir(nome);
      }, function (err) {
        // "sem permissão" aqui não é falha: é a resposta certa enquanto
        // a regra de usuarios/$uid/gaveta não estiver publicada.
        ultimoErro = (err && err.message) || '';
        console.warn('[gaveta] leitura de', nome + ':', ultimoErro);
        remoto[nome] = null;
        chegou[nome] = true;      // não há o que esperar dela
        avisar();
      });
      refs[nome] = { ref: ref, cb: cb };
    });
  }

  function desligar() {
    Object.keys(refs).forEach(function (nome) {
      try { refs[nome].ref.off('value', refs[nome].cb); } catch (e) {}
      delete refs[nome];
      delete remoto[nome];
      delete chegou[nome];
      delete retidas[nome];
    });
    uidLigado = '';
    avisar();
  }

  // ── gatilho: qualquer salvar() das abas passa pelo setItem ──────
  //  O sync-mestre.js já embrulha o setItem; embrulhar de novo encadeia
  //  sem briga, porque cada um chama o original que capturou.
  const setItemOriginal = Storage.prototype.setItem;
  const espera = {};
  Storage.prototype.setItem = function (k, v) {
    setItemOriginal.apply(this, arguments);
    try {
      if (escrevendoEuMesmo) return;          // esta gravação é minha, não é edição
      if (this !== window.localStorage) return;
      const nome = porChave[k];
      if (!nome || !uidLigado) return;
      clearTimeout(espera[nome]);
      espera[nome] = setTimeout(function () { conferir(nome); }, 1200);
    } catch (e) {}
  };

  function estado() {
    return {
      ligada:  !!uidLigado,
      areas:   Object.keys(areas),
      retidas: Object.assign({}, retidas),
      erro:    ultimoErro,
    };
  }

  // ── A PORTA ─────────────────────────────────────────────────────
  //  `nome`      id da área no banco (e no gavetaSinc);
  //  `chave`     a chave do localStorage que ela guarda;
  //  `politica`  'maisNovo' (o mais recente vence — para coisa pequena
  //              e sem dono, como as preferências) ou 'perguntar' (o
  //              padrão: retém e deixa a escolha para a pessoa);
  //  `aoReceber` chamada quando a versão da conta desce, para a aba
  //              aplicar o que chegou sem esperar um F5.
  window.GA_Gaveta = {
    registrar: function (opcoes) {
      const o = opcoes || {};
      if (!o.nome || !o.chave || areas[o.nome]) return;
      areas[o.nome] = {
        nome: o.nome,
        chave: o.chave,
        rotulo: o.rotulo || o.nome,        // o nome que a tarja mostra
        politica: o.politica === 'maisNovo' ? 'maisNovo' : 'perguntar',
        aoReceber: o.aoReceber,
      };
      porChave[o.chave] = o.nome;
      ligarPendentes();
    },
    // a escolha, quando a área ficou retida: 'daqui' ou 'dela'.
    //  A PERDEDORA fica guardada antes de qualquer coisa — é o que
    //  torna a escolha reversível, e sem isso a tarja seria uma
    //  armadilha de um clique só.
    decidir: function (nome, qual) {
      if (!retidas[nome] || !areas[nome]) return;
      const daqui = lerLocal(nome);
      const r = remoto[nome];
      const dela = r && typeof r.conteudo === 'string' ? r.conteudo : null;
      const ficaComADela = qual === 'dela' && dela != null;
      const perdedora = ficaComADela ? daqui : dela;
      delete retidas[nome];
      if (perdedora != null) {
        guardadas[nome] = {
          quando: Date.now(),
          ficou: ficaComADela ? 'da conta' : 'daqui',
          conteudo: perdedora,
        };
        guardarGuardadas();
      }
      if (ficaComADela) return descer(nome, dela);
      subir(nome, daqui);
    },

    // o "↩ voltar": a guardada volta a valer, e sobe — quem voltou
    // atrás quer essa versão nos dois lados, não só neste navegador.
    desfazer: function (nome) {
      const g = guardadas[nome];
      if (!g || typeof g.conteudo !== 'string' || !areas[nome]) return;
      const atual = lerLocal(nome);
      descer(nome, g.conteudo);                 // grava e avisa a aba
      guardadas[nome] = {
        quando: Date.now(),
        ficou: g.ficou === 'da conta' ? 'daqui' : 'da conta',
        conteudo: atual,                        // agora a outra é a guardada
      };
      guardarGuardadas();
      subir(nome, g.conteudo);
    },
    estado: estado,
    aoMudar: function (fn) {
      if (typeof fn !== 'function') return;
      ouvintes.push(fn);
      try { fn(estado()); } catch (e) {}
    },
  };

  // ── a fila de quem chegou antes ─────────────────────────────────
  //  As abas carregam bem antes deste arquivo (ele precisa do mesa.js,
  //  que vem no fim). Quem quis se registrar cedo deixou o pedido em
  //  GA_GavetaFila; esvaziamos aqui.
  (function () {
    const fila = window.GA_GavetaFila;
    if (!fila || !fila.length) return;
    fila.splice(0).forEach(function (o) { window.GA_Gaveta.registrar(o); });
  })();

  // ── começa quando a conta se resolve ────────────────────────────
  if (window.GA_Mesa) window.GA_Mesa.aoMudar(ligar);
})();
