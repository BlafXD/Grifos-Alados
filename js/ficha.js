// ════════════════════════════════════════════════════════════════════
//  FICHA.JS — a ficha de personagem, feita dentro do site
//  Localização: /grifos-alados/js/ficha.js
//
//  Carregada nas DUAS páginas: sub-aba "✍ Ficha" da 📖 Fichas no
//  index.html, e a aba 📖 Ficha inteira no jogadores.html. Cada um monta
//  as fichas no navegador dele — nada de login por enquanto (decidido em
//  08/09/2026: "local agora, mesa depois"). A forma do dado já está
//  pronta para subir para a mesa sem ser refeita.
//
//  O QUE ELA CALCULA, e o que não:
//   • calcula — PV e PM máximos, Defesa, carga, CD, e o valor de cada
//     uma das 29 perícias (Tormenta 20 JdA; fórmulas em ficha-data.js);
//   • não calcula — raça, origem, poder, magia, item. Nada disso vira
//     tabela: são caixas de texto ricas, iguais às do bestiário. Foi o
//     combinado com ele: "o que importa é a matemática das perícias,
//     vida, pm e etc... O restante é só blocos enormes para escrever".
//
//  O site NÃO POLICIA: não confere quantas perícias você treinou nem
//  pré-requisito de poder. Conta e mostra; a escolha é do jogador.
//
//  ⚠ NADA AQUI CONHECE CRIATURA. A ficha do jogador não fala com o
//  bestiário, com a aba ⚗ Criar Ameaça nem com o statblock — pedido
//  dele, em 08/09/2026. Ver docs/ficha-do-jogador.md.
// ════════════════════════════════════════════════════════════════════
(function () {
  'use strict';

  const esc = window.GA_esc;
  const D = window.GA_FichaData;
  const STORAGE_KEY = 'grifosAlados.fichasPersonagem';

  let dados = { fichas: [], aberta: null };
  let ultimoDano = '';          // "−7 PV: 5 dos temporários e 2 do PV"
  let secao = null;             // a <section> que hospeda a aba

  // ── AS FICHAS QUE VÊM DA MESA ────────────────────────────────────
  //  `remotas` é uid → { fichaId: ficha }. Para o jogador vem só a
  //  própria pasta (as fichas dele, de qualquer aparelho); para o
  //  mestre vem a mesa inteira. Quem enche isto é o ficha-mesa.js —
  //  aqui só se desenha e se escreve de volta. As MINHAS continuam
  //  morando em dados.fichas: o localStorage é a verdade do que é meu,
  //  e a mesa é o espelho.
  let remotas = {};
  let meuUid = '';
  //  ── A GAVETA DA CONTA ──────────────────────────────────────────
  //  `usuarios/<uid>/fichas`: as MINHAS fichas, presas à conta e não ao
  //  aparelho. É o que faz a ficha aparecer no celular novo, e o que a
  //  mantém viva depois que a campanha acabar. Não entra sozinha na
  //  tela: uma ficha que só existe na gaveta espera o botão "trazer" —
  //  senão o que eu apaguei aqui ressuscitaria no próximo login.
  let gaveta = {};
  // O que mudou desde o último envio, por ficha: 'pv', 'pericias',
  // 'inventario'… Publicar só os grupos sujos é o que deixa o mestre
  // baixar o PV enquanto o jogador escreve no inventário sem um apagar
  // o outro (ver o cabeçalho do ficha-mesa.js).
  const sujos = {};
  function sujar(id, grupo) {
    (sujos[id] || (sujos[id] = new Set())).add(grupo);
  }

  // ── PERSISTÊNCIA ─────────────────────────────────────────────────
  let _timer = null;
  function salvar() { clearTimeout(_timer); _timer = setTimeout(gravarTudo, 250); }
  function salvarAgora() { clearTimeout(_timer); gravarTudo(); }
  // `avisar` é o que faz o PV da lista de iniciativa acompanhar o da
  // ficha. Fica no salvamento, e não em cada tecla, porque o salvamento
  // já é a rede que segura a digitação (250 ms).
  function gravarTudo() { gravar(); subir(); avisar(); }
  function gravar() {
    try { window.GA_guardar(STORAGE_KEY, JSON.stringify(dados)); }
    catch (e) { console.warn('[ficha] não deu para salvar:', e && e.message); }
  }
  // Manda para a mesa a ficha que está aberta. Se for de outra pessoa
  // (o mestre mexendo na ficha de um jogador), vai para a pasta DELA.
  function subir() {
    const f = fichaAberta();
    if (!f || !window.GA_FichaMesa) return;
    const g = sujos[f.id];
    delete sujos[f.id];
    window.GA_FichaMesa.publicar(f, donoDe(f.id), g);
  }
  function carregar() {
    try {
      const txt = localStorage.getItem(STORAGE_KEY);
      if (txt) dados = JSON.parse(txt);
    } catch (e) { console.warn('[ficha] não deu para carregar:', e && e.message); }
    if (!dados || typeof dados !== 'object') dados = {};
    if (!Array.isArray(dados.fichas)) dados.fichas = [];
    dados.fichas = dados.fichas.map(normalizar);
    if (!dados.fichas.some(f => f.id === dados.aberta)) {
      dados.aberta = dados.fichas.length ? dados.fichas[0].id : null;
    }
  }

  // Toda ficha salva ganha os campos do modelo de agora — fichas velhas
  // não podem quebrar a tela por falta de um bloco novo.
  function normalizar(f) {
    f = f || {};
    f.id = f.id || novoId();
    ['nome', 'jogador', 'raca', 'origem', 'divindade'].forEach(k => {
      if (typeof f[k] !== 'string') f[k] = '';
    });
    if (typeof f.tamanho !== 'string') f.tamanho = 'Médio';
    if (typeof f.deslocamento !== 'number') f.deslocamento = 9;
    if (!Array.isArray(f.classes)) f.classes = [{ classe: '', nivel: 1 }];
    f.classes = f.classes.map(c => ({
      classe: String((c && c.classe) || ''),
      nivel: Math.max(0, parseInt((c && c.nivel), 10) || 0),
    }));
    if (!f.classes.length) f.classes = [{ classe: '', nivel: 1 }];

    f.atributos = f.atributos || {};
    D.ATRIBUTOS.forEach(a => {
      if (typeof f.atributos[a.chave] !== 'number') f.atributos[a.chave] = 0;
    });
    // PV e PM: `atual` null quer dizer "cheio" (a ficha nova não precisa
    // saber o máximo antes de ter classe). `temp` é a regra da p. 105 —
    // ver gastarPontos(), que é onde ela de fato acontece.
    f.pv = f.pv || {}; f.pm = f.pm || {};
    if (typeof f.pv.atual  !== 'number') f.pv.atual  = null;   // null = cheio
    if (typeof f.pv.temp   !== 'number') f.pv.temp   = 0;
    if (typeof f.pv.outros !== 'number') f.pv.outros = 0;
    if (typeof f.pm.atual  !== 'number') f.pm.atual  = null;
    if (typeof f.pm.temp   !== 'number') f.pm.temp   = 0;
    if (typeof f.pm.outros !== 'number') f.pm.outros = 0;

    f.defesa = f.defesa || {};
    ['armadura', 'escudo', 'outros', 'penalidade'].forEach(k => {
      if (typeof f.defesa[k] !== 'number') f.defesa[k] = 0;
    });
    f.carga = f.carga || {};
    ['usada', 'outros'].forEach(k => { if (typeof f.carga[k] !== 'number') f.carga[k] = 0; });
    if (typeof f.cdAtributo !== 'string') f.cdAtributo = 'int';
    if (typeof f.xp !== 'number') f.xp = 0;

    // ── O QUE APARA O DANO ─────────────────────────────────────────
    //  Três coisas diferentes, que a mesa confunde o tempo todo — e por
    //  isso ficam em campos separados, com o nome que o livro usa:
    //   • RESISTÊNCIA a um tipo de dano ("resistência a fogo 10"):
    //     tira aquele tanto do dano DAQUELE tipo. NÃO é o teste de
    //     resistência (Fortitude, Reflexos e Vontade são PERÍCIAS, e
    //     estão lá em cima, na lista das 29);
    //   • REDUÇÃO DE DANO ("RD 5"): tira de todo dano físico, e dá para
    //     ter várias ao mesmo tempo, cada uma com a sua condição;
    //   • IMUNIDADE: não sofre aquilo, ponto.
    //  As três são LISTAS porque um personagem acumula várias — de
    //  raça, de item, de poder — e escrever tudo num campo só vira uma
    //  frase que ninguém lê no meio do combate.
    ['resistencias', 'reducoes', 'imunidades'].forEach(k => {
      if (!Array.isArray(f[k])) f[k] = [];
      f[k] = f[k].map(x => ({
        id: (x && x.id) || novoId(),
        valor: String((x && x.valor) || ''),      // "10", "5", "" (imunidade não tem número)
        do_: String((x && (x.do_ || x.tipo)) || ''),   // "fogo", "corte", "veneno"…
        obs: String((x && x.obs) || ''),          // "só com a armadura", "3×/dia"…
      }));
    });
    if (typeof f.proficiencias !== 'string') f.proficiencias = '';

    f.pericias = f.pericias || {};
    D.PERICIAS.forEach(p => {
      const e = f.pericias[p.chave] || {};
      f.pericias[p.chave] = {
        treinada: e.treinada === true,
        outros: typeof e.outros === 'number' ? e.outros : 0,
      };
    });

    // ── OFÍCIOS ────────────────────────────────────────────────────
    //  "Ofício na verdade são várias perícias diferentes" (p. 121): um
    //  alquimista e um engenhoqueiro são DUAS perícias, com treino e
    //  bônus separados. Por isso Ofício saiu do mapa de perícias (onde
    //  só cabia um) e virou lista.
    //  A ficha que já existia tinha um Ofício só, em pericias.oficio —
    //  ele vira o primeiro da lista, com o treino e o bônus que tinha.
    if (!Array.isArray(f.oficios)) {
      const velho = f.pericias.oficio || {};
      f.oficios = [{ id: novoId(), esp: '', treinada: !!velho.treinada, outros: velho.outros || 0 }];
    }
    f.oficios = f.oficios.map(o => ({
      id: (o && o.id) || novoId(),
      esp: String((o && o.esp) || ''),            // "alquimista", "engenhoqueiro"…
      treinada: (o && o.treinada) === true,
      outros: (o && typeof o.outros === 'number') ? o.outros : 0,
    }));
    // DOIS ofícios sempre à vista, sem precisar de um ＋ para achar o
    // segundo: ter dois é o caso normal ("um alquimista com um
    // engenhoqueiro"), e uma linha vazia não atrapalha ninguém. O ＋
    // continua ali para o terceiro em diante.
    while (f.oficios.length < 2) {
      f.oficios.push({ id: novoId(), esp: '', treinada: false, outros: 0 });
    }

    // ── INVENTÁRIO (p. 141) ────────────────────────────────────────
    //  `cada: true`  → o número de espaços é POR UNIDADE (o normal: duas
    //                  poções de ½ dão 1 espaço);
    //  `cada: false` → é o total do monte, quantas unidades forem — é o
    //                  "duas armaduras que JUNTAS ocupam 5" que o mestre
    //                  pode conceder, e que o próprio livro autoriza:
    //                  "em caso de dúvida, o mestre deve decidir o que
    //                  achar mais coerente".
    if (!Array.isArray(f.inventario)) f.inventario = [];
    f.inventario = f.inventario.map(it => ({
      id: (it && it.id) || novoId(),
      nome: String((it && it.nome) || ''),
      qtd: Math.max(0, parseInt((it && it.qtd), 10) || 0) || 1,
      espacos: (it && typeof it.espacos === 'number') ? it.espacos : 1,
      cada: (it && it.cada) !== false,
      obs: String((it && it.obs) || ''),
      // A caixa grande de cada item: o que a espada faz, o encanto que
      // ela tem, a habilidade que custa PM. A `obs` continua sendo a
      // linha curta ("na mochila do Elias"); isto é o texto.
      notas: String((it && it.notas) || ''),
      aberto: (it && it.aberto) === true,       // a caixa está desdobrada?
    }));
    if (typeof f.tibares !== 'number') f.tibares = 0;

    // ── O QUE ENTROU PELA LOJA ─────────────────────────────────────
    //  As últimas compras desta ficha. Ao contrário do histórico de
    //  rolagens (que é caderninho de navegador), esta lista mora DENTRO
    //  da ficha: ela sobe para a mesa junto, então o jogador vê o que o
    //  mestre comprou para ele, e a lista o acompanha de aparelho.
    if (!Array.isArray(f.compras)) f.compras = [];
    f.compras = f.compras.slice(0, COMPRAS_MAX).map(c => ({
      quando: (c && typeof c.quando === 'number') ? c.quando : 0,
      nome:   String((c && c.nome) || ''),
      qtd:    Math.max(1, parseInt((c && c.qtd), 10) || 1),
      preco:  (c && typeof c.preco === 'number')  ? c.preco  : 0,   // o de tabela
      pago:   (c && typeof c.pago === 'number')   ? c.pago   : 0,   // o que saiu do bolso
      faltou: (c && typeof c.faltou === 'number') ? c.faltou : 0,   // não coube no T$
      por:    String((c && c.por) || ''),                           // quem comprou, se não foi o dono
    }));
    // "Cada mil moedas ocupam 1 espaço" é regra do livro (p. 141), mas é
    // das primeiras que uma mesa dispensa — e a dele dispensa. Então a
    // conta existe, e nasce DESLIGADA: quem quiser o peso da bolsa liga
    // no botão ao lado do T$.
    if (typeof f.moedasPesam !== 'boolean') f.moedasPesam = false;

    // ── MAGIAS ─────────────────────────────────────────────────────
    //  Vêm da mesma base das Consultas (window.GA_MAGIAS): o que fica
    //  guardado na ficha é o `mid` e uma cópia do que se lê na mesa. A
    //  cópia é de propósito — uma ficha exportada num .json continua
    //  legível sem o site do lado.
    if (!Array.isArray(f.magias)) f.magias = [];
    f.magias = f.magias.map(m => ({
      id: (m && m.id) || novoId(),
      mid: String((m && m.mid) || ''),
      nome: String((m && m.nome) || ''),
      circulo: (m && typeof m.circulo === 'number') ? m.circulo : 0,
      pm: (m && typeof m.pm === 'number') ? m.pm : 0,
      tipo: String((m && m.tipo) || ''),
      escola: String((m && m.escola) || ''),
      execucao: String((m && m.execucao) || ''),
      alcance: String((m && m.alcance) || ''),
      alvo: String((m && m.alvo) || ''),
      duracao: String((m && m.duracao) || ''),
      resistencia: String((m && m.resistencia) || ''),
      resumo: String((m && m.resumo) || ''),
      obs: String((m && m.obs) || ''),
      // quais aprimoramentos estão ligados agora (índices na lista da
      // base). Fica guardado porque na mesa se repete a mesma combinação
      // toda vez: "bola de fogo com +2d6" é a mesma magia de sempre.
      apr: Array.isArray(m && m.apr) ? m.apr.map(n => parseInt(n, 10)).filter(n => n >= 0) : [],
    }));

    if (!Array.isArray(f.ataques)) f.ataques = [];
    f.ataques = f.ataques.map(a => ({
      id: (a && a.id) || novoId(),
      nome: String((a && a.nome) || ''),
      pericia: (a && a.pericia === 'pontaria') ? 'pontaria' : 'luta',
      extra: (a && typeof a.extra === 'number') ? a.extra : 0,
      dano: String((a && a.dano) || ''),
      critico: String((a && a.critico) || ''),
      tipo: String((a && a.tipo) || ''),
      alcance: String((a && a.alcance) || ''),
    }));

    // ── O MELHOR AMIGO DO TREINADOR (Heróis de Arton, p. 20) ───────
    //  Só aparece com o Treinador na ficha, mas o dado fica guardado sem
    //  ele: tirar a classe por engano não pode apagar um bicho inteiro.
    //  O PV ATUAL de cada amigo mora à parte, em `amigosPv` (id → PV).
    //  A escrita da mesa é por grupo, e o PV é o que o mestre baixa no
    //  meio do combate: se morasse em `amigos`, o jogador escrevendo a
    //  descrição do bicho mandaria o PV velho junto e desfaria o golpe.
    const cfg = (f.treinador && typeof f.treinador === 'object') ? f.treinador : {};
    f.treinador = {
      treino: (cfg.treino === 'numeros' || cfg.treino === 'intensivo') ? cfg.treino : '',
      ecletico: cfg.ecletico === true,
    };
    f.amigos = lista(f.amigos).map(normalizarAmigo);
    const pvs = (f.amigosPv && typeof f.amigosPv === 'object') ? f.amigosPv : {};
    f.amigosPv = {};
    f.amigos.forEach(a => { if (typeof pvs[a.id] === 'number') f.amigosPv[a.id] = pvs[a.id]; });

    f.blocos = f.blocos || {};
    TODOS_BLOCOS.forEach(b => { if (typeof f.blocos[b.campo] !== 'string') f.blocos[b.campo] = ''; });
    return f;
  }

  function novoId() { return 'f' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }

  // O Realtime Database devolve a lista como objeto quando falta um
  // índice ({0: …, 2: …}); isto aceita as duas formas.
  function lista(x) {
    if (Array.isArray(x)) return x.filter(v => v != null);
    if (x && typeof x === 'object') {
      return Object.keys(x).sort((p, q) => p - q).map(k => x[k]).filter(v => v != null);
    }
    return [];
  }

  function normalizarAmigo(a) {
    a = (a && typeof a === 'object') ? a : {};
    const A = D.AMIGO;
    const atrs = (a.atributos && typeof a.atributos === 'object') ? a.atributos : {};
    const pers = (a.pericias && typeof a.pericias === 'object') ? a.pericias : {};
    const truq = (a.truques && typeof a.truques === 'object') ? a.truques : {};
    const am = {
      id: a.id || novoId(),
      nome: String(a.nome || ''),
      especie: String(a.especie || ''),                  // "lobo", "golem de ferro"…
      tipo: D.tipoAmigo(a.tipo) ? a.tipo : '',
      tamanho: A.tamanhos.indexOf(a.tamanho) >= 0 ? a.tamanho : 'Médio',
      parceiro: D.parceiro(a.parceiro) ? a.parceiro : '',
      atributos: {},
      pericias: {},
      truques: {},                                       // chave → quantas vezes
      pvOutros: typeof a.pvOutros === 'number' ? a.pvOutros : 0,
      defOutros: typeof a.defOutros === 'number' ? a.defOutros : 0,
      deslocamento: typeof a.deslocamento === 'number' ? a.deslocamento : A.deslocamento,
      ataques: lista(a.ataques).map(x => ({
        id: (x && x.id) || novoId(),
        nome: String((x && x.nome) || ''),
        pericia: (x && x.pericia === 'pontaria') ? 'pontaria' : 'luta',
        extra: (x && typeof x.extra === 'number') ? x.extra : 0,
        dano: String((x && x.dano) || ''),               // só o DADO: a Força entra sozinha
        critico: String((x && x.critico) || ''),
        tipo: String((x && x.tipo) || ''),
      })),
      notas: String(a.notas || ''),
    };
    // Os atributos guardados são os FINAIS (o tipo e os truques de número
    // fixo já somados — ver trocarTipo e pacoteTruque), como na ficha do
    // jogador: o que se lê na caixa é o que vale.
    D.ATRIBUTOS.forEach(x => {
      am.atributos[x.chave] = typeof atrs[x.chave] === 'number' ? atrs[x.chave] : A.atributos[x.chave];
    });
    A.pericias.forEach(k => {
      const e = (pers[k] && typeof pers[k] === 'object') ? pers[k] : {};
      am.pericias[k] = { treinada: e.treinada === true, outros: typeof e.outros === 'number' ? e.outros : 0 };
    });
    D.TRUQUES.forEach(T => {
      const n = parseInt(truq[T.chave], 10);
      if (n > 0) am.truques[T.chave] = T.vezes ? Math.min(9, n) : 1;
    });
    return am;
  }
  // O amigo que acabou de chegar: a ficha da p. 20, com a arma natural.
  function novoAmigo() {
    const A = D.AMIGO;
    return normalizarAmigo({
      atributos: Object.assign({}, A.atributos),
      ataques: [{ nome: A.arma.nome, pericia: 'luta', extra: 0, dano: A.arma.dano, critico: A.arma.critico, tipo: '' }],
    });
  }

  // A ficha aberta pode ser minha (localStorage) ou de outra pessoa da
  // mesa (só o mestre e o auxiliar chegam nessas). As duas se editam
  // igual; o que muda é para onde o salvamento vai.
  function fichaAberta() {
    const minha = dados.fichas.find(f => f.id === dados.aberta);
    if (minha) return minha;
    let achada = null;
    Object.keys(remotas).forEach(uid => {
      if (uid === meuUid) return;                    // as minhas já foram
      const m = remotas[uid] || {};
      if (m[dados.aberta]) achada = m[dados.aberta];
    });
    return achada;
  }
  // null = é minha. Senão, o uid de quem é dono dela.
  function donoDe(id) {
    if (dados.fichas.some(f => f.id === id)) return null;
    let dono = null;
    Object.keys(remotas).forEach(uid => {
      if (uid !== meuUid && (remotas[uid] || {})[id]) dono = uid;
    });
    return dono;
  }
  // As fichas de outra gente, agrupadas por dono, para a barra.
  function fichasDaMesa() {
    const saida = [];
    Object.keys(remotas).forEach(uid => {
      if (uid === meuUid) return;
      const m = remotas[uid] || {};
      Object.keys(m).forEach(id => {
        if (m[id] && typeof m[id] === 'object') saida.push({ uid: uid, ficha: m[id] });
      });
    });
    return saida;
  }
  // O nome de quem é dono, tirado da lista de membros da mesa; se ela
  // ainda não chegou, o `autor` que veio carimbado na própria ficha.
  function nomeDoDono(uid, ficha) {
    const est = window.GA_Mesa ? window.GA_Mesa.estado() : null;
    const m = est && est.membros && est.membros[uid];
    return (m && m.nome) || (ficha && ficha.autor) || 'alguém da mesa';
  }

  // As caixas de texto rico que viram cartão próprio, na ordem em que
  // aparecem. Magias e Inventário SAÍRAM daqui: viraram listas de
  // verdade (com espaços contados e busca na base de magias), e a caixa
  // livre de cada uma passou a morar dentro do cartão novo — o que
  // alguém já tinha escrito continua onde estava.
  const COMPRAS_MAX = 30;      // o mesmo fôlego do histórico de rolagens

  const BLOCOS = [
    { campo: 'racaOrigem',    titulo: '🌿 Habilidades de raça e origem',
      dica: 'O que a raça e a origem lhe deram — copie do livro ou escreva com suas palavras…' },
    { campo: 'classePoderes', titulo: '⚔ Habilidades de classe e poderes',
      dica: 'Habilidades de classe, poderes, capacidades de caminho…' },
    { campo: 'anotacoes',     titulo: '📜 Anotações',
      dica: 'História, aliados, contatos, dívidas, o que ficou pendente…' },
  ];
  // Ficaram no modelo (nada do que foi escrito se perde), mas são
  // desenhadas dentro dos cartões de Magias e Inventário.
  const BLOCOS_EMBUTIDOS = [
    { campo: 'magias',
      dica: 'Anotações de magia: o que você preparou hoje, aprimoramentos que costuma usar, truques…' },
    { campo: 'inventario',
      dica: 'Anotações do inventário: o que ficou na base, o que é de outro personagem, dívidas…' },
  ];
  const TODOS_BLOCOS = BLOCOS.concat(BLOCOS_EMBUTIDOS);

  // ═══ AS CONTAS ════════════════════════════════════════════════════
  //  Todas saem do livro (Tormenta 20 — Edição Jogo do Ano). Nada disto
  //  é guardado: subir de nível é trocar um número, e a ficha inteira se
  //  acerta sozinha.

  // Nível de personagem é a soma dos níveis de classe (p. 40).
  function nivel(f) {
    const n = f.classes.reduce((s, c) => s + (c.nivel || 0), 0);
    return Math.max(1, n);
  }
  function atr(f, chave) { return f.atributos[chave] || 0; }

  // PV: a PRIMEIRA classe dá o PV inicial dela; o primeiro nível de uma
  // classe nova dá PV de nível subsequente, não do 1º (p. 40).
  function pvMax(f) {
    const con = atr(f, 'con');
    let total = 0;
    f.classes.forEach((c, i) => {
      const C = D.classe(c.classe);
      const n = c.nivel || 0;
      if (!C || n <= 0) return;
      total += (i === 0)
        ? C.pvBase + con + (n - 1) * (C.pvNivel + con)
        : n * (C.pvNivel + con);
    });
    return total + (f.pv.outros || 0);
  }
  function pmMax(f) {
    let total = 0;
    f.classes.forEach(c => {
      const C = D.classe(c.classe);
      if (C) total += Math.max(0, c.nivel || 0) * C.pmNivel;
    });
    atributosDoPm(f).forEach(x => { total += atr(f, x.atr); });
    return total + (f.pm.outros || 0);
  }
  // O atributo que as classes que lançam magia somam ao PM (e o paladino,
  // pelo Abençoado) — ver `pmAtr` no ficha-data.js. Cada atributo entra
  // UMA vez, por mais classes que o deem: "um clérigo/druida não soma
  // duas vezes sua Sabedoria nos pontos de mana" (p. 226). O arcanista
  // soma o atributo do Caminho, que é o mesmo da CD.
  function atributosDoPm(f) {
    const vistos = {}, saida = [];
    f.classes.forEach(c => {
      const C = D.classe(c.classe);
      if (!C || !C.pmAtr || !(c.nivel > 0)) return;
      const k = C.pmAtr === 'chave' ? f.cdAtributo : C.pmAtr;
      if (vistos[k]) return;
      vistos[k] = true;
      saida.push({ atr: k, classe: C });
    });
    return saida;
  }
  // Defesa = 10 + Destreza + armadura + escudo (p. 106)
  function defesa(f) {
    return 10 + atr(f, 'des') + f.defesa.armadura + f.defesa.escudo + f.defesa.outros;
  }
  // Carga = 10 espaços + 2 por ponto de Força, ou −1 por ponto negativo (p. 141)
  function cargaMax(f) {
    const F = atr(f, 'for');
    return (F >= 0 ? 10 + 2 * F : 10 + F) + (f.carga.outros || 0);
  }
  // Treino: +2 (1º–6º), +4 (7º–14º), +6 (15º+) — p. 114
  function treino(n, treinada) {
    if (!treinada) return 0;
    return n >= 15 ? 6 : n >= 7 ? 4 : 2;
  }
  // Perícia = ⌊nível ÷ 2⌋ + atributo-chave + treino + outros − armadura
  //  `e` é a entrada da perícia nesta ficha ({treinada, outros}). Vem
  //  separada porque Ofício tem uma entrada por especialidade, e todas
  //  usam esta mesma conta.
  function calcPericia(f, P, e) {
    if (!P) return 0;
    const n = nivel(f);
    let v = Math.floor(n / 2) + atr(f, P.atr) + treino(n, (e || {}).treinada) + ((e || {}).outros || 0);
    if (P.armadura) v -= Math.abs(f.defesa.penalidade || 0);
    return v;
  }
  function valorPericia(f, chave) {
    return calcPericia(f, D.pericia(chave), f.pericias[chave]);
  }
  function valorOficio(f, i) {
    return calcPericia(f, D.pericia('oficio'), f.oficios[i]);
  }
  // "Ofício (alquimista)" — como o livro escreve, e como o log da mesa
  // precisa mostrar para não sair três "Ofício" iguais.
  function nomeOficio(o) {
    return 'Ofício' + (o && o.esp ? ' (' + o.esp + ')' : '');
  }
  // CD das suas habilidades = 10 + ⌊nível ÷ 2⌋ + atributo-chave
  function cdBase(f) { return 10 + Math.floor(nivel(f) / 2) + atr(f, f.cdAtributo); }
  function valorAtaque(f, a) { return valorPericia(f, a.pericia) + (a.extra || 0); }
  function pvAtual(f) { return f.pv.atual == null ? pvMax(f) : f.pv.atual; }
  function pmAtual(f) { return f.pm.atual == null ? pmMax(f) : f.pm.atual; }

  // ── PONTOS TEMPORÁRIOS (p. 105) ─────────────────────────────────
  //  A regra, no texto do livro: "Certos efeitos fornecem PV ou PM
  //  temporários. Eles são somados a seus pontos atuais, mesmo que
  //  ultrapassem o máximo. Pontos temporários são SEMPRE OS PRIMEIROS
  //  A SEREM GASTOS. Caso não seja especificado o contrário, pontos
  //  temporários desaparecem no fim do dia."
  //
  //  É a parte que a ficha errava: os temporários ficavam num campo
  //  solto, sem entrar em conta nenhuma, e o dano descia direto do PV
  //  atual — que é exatamente o engano que se comete na mesa também.
  //  Agora todo dano e todo gasto de mana passam por aqui.
  //
  //  Devolve o que foi tirado de cada lado, para a mensagem poder
  //  contar a história ("−7: 5 dos temporários e 2 do PV").
  function gastarPontos(f, qual, quanto) {
    const p = f[qual];                       // f.pv ou f.pm
    const n = Math.max(0, Math.round(quanto || 0));
    const doTemp = Math.min(p.temp || 0, n);
    p.temp = (p.temp || 0) - doTemp;
    const resto = n - doTemp;
    if (resto) {
      const agora = qual === 'pv' ? pvAtual(f) : pmAtual(f);
      // PV negativo existe (a p. 236 trata disso); PM não desce de 0.
      p.atual = qual === 'pv' ? agora - resto : Math.max(0, agora - resto);
    }
    return { temp: doTemp, atual: resto };
  }
  // Curar NÃO devolve temporário: "você nunca pode recuperar mais pontos
  // de vida ou mana do que perdeu" (p. 105), e o temporário não é perda.
  function curarPontos(f, qual, quanto) {
    const n = Math.max(0, Math.round(quanto || 0));
    const teto = qual === 'pv' ? pvMax(f) : pmMax(f);
    const agora = qual === 'pv' ? pvAtual(f) : pmAtual(f);
    f[qual].atual = Math.min(teto, agora + n);
    return f[qual].atual - agora;
  }
  // O total à vista: atual + temporários. É este número que aparece
  // grande, porque é o que o jogador tem de fato para gastar.
  function pvTotal(f) { return pvAtual(f) + (f.pv.temp || 0); }
  function pmTotal(f) { return pmAtual(f) + (f.pm.temp || 0); }

  // ── CARGA (p. 141) ──────────────────────────────────────────────
  //  Sai do inventário, não mais de um número digitado à mão. Cada
  //  linha vale `espacos × qtd` (o normal) ou `espacos` fechado, se o
  //  mestre disse que o monte inteiro ocupa aquilo.
  //  As moedas entram por cima: "cada mil moedas ocupam 1 espaço".
  function cargaItens(f) {
    return f.inventario.reduce((s, it) => {
      const n = it.cada ? (it.espacos || 0) * (it.qtd || 0) : (it.espacos || 0);
      return s + n;
    }, 0);
  }
  function cargaMoedas(f) {
    if (!f.moedasPesam) return 0;
    return Math.floor(Math.max(0, f.tibares || 0) / (D.MOEDAS_POR_ESPACO || 1000));
  }
  function cargaUsada(f) {
    return arredonda(cargaItens(f) + cargaMoedas(f));
  }
  // Meio espaço existe (poções, pergaminhos), então a soma é fracionária
  // — mas 0.30000000000000004 não é número de ficha.
  function arredonda(n) { return Math.round(n * 100) / 100; }
  // Quanto da mochila já foi. Passa de 100% quando está sobrecarregado —
  // e aí a barra fica cheia, com o aviso escrito ao lado dizendo o resto.
  function fatiaCarga(f) {
    const lim = cargaMax(f);
    return lim > 0 ? Math.max(0, Math.min(100, Math.round(cargaUsada(f) / lim * 100))) : 0;
  }

  // Sobrecarregado: passou do limite → −5 de armadura e −3m. Acima do
  // dobro, o livro diz que simplesmente não dá para carregar.
  function estadoCarga(f) {
    const u = cargaUsada(f), lim = cargaMax(f);
    if (u > lim * 2) return 'demais';
    if (u > lim)     return 'sobrecarregado';
    return 'ok';
  }

  function sinal(v) { return (v >= 0 ? '+' : '') + v; }
  // Os quatro patamares, com as faixas do livro (p. 39): iniciante 1–4,
  // veterano 5–10, campeão 11–16, lenda 17–20. Certas habilidades mudam
  // com o patamar, por isso ele aparece ao lado do nível.
  function patamar(n) {
    return n >= 17 ? 'lenda' : n >= 11 ? 'campeão' : n >= 5 ? 'veterano' : 'iniciante';
  }

  // ═══ ROLAR ════════════════════════════════════════════════════════
  //  Passa pelo GA_Rolagens: se ele estiver numa mesa, a rolagem aparece
  //  na tela de todo mundo; se não estiver, o publicar sai fora sozinho.
  //
  //  O RESULTADO APARECE ONDE SE CLICOU. Antes ele ia para uma faixa no
  //  alto da ficha, e no meio de um combate isso quer dizer rolar
  //  Percepção lá embaixo e subir a página inteira para ler o número.
  //  Agora cada botão que rola tem o seu lugar de resposta (o `slot`), e
  //  o que sai fica lá até a próxima rolagem daquele mesmo botão.
  //
  //  `slot` é 'per:percepcao', 'of:0', 'atq:2', 'dano:2', 'crit:2' ou
  //  'am:0:per:luta' (o melhor amigo) — e é o mesmo texto do [data-res]
  //  no HTML.
  let resultados = {};        // slot → { total, detalhe, erro }
  let historico = [];         // as últimas rolagens desta ficha
  // Do melhor amigo, só desta tela (não sobem para a mesa): o Direcionar
  // armado para o próximo teste, e a lista inteira de truques aberta.
  let direcionar = {};        // id do amigo → true
  let truquesAbertos = {};    // id do amigo → true
  const HIST_KEY = 'grifosAlados.fichaRolagens';
  const HIST_MAX = 30;

  function carregarHistorico(fichaId) {
    try {
      const t = JSON.parse(localStorage.getItem(HIST_KEY) || '{}');
      historico = Array.isArray(t[fichaId]) ? t[fichaId] : [];
    } catch (e) { historico = []; }
  }
  function salvarHistorico(fichaId) {
    try {
      const t = JSON.parse(localStorage.getItem(HIST_KEY) || '{}');
      t[fichaId] = historico.slice(0, HIST_MAX);
      window.GA_guardar(HIST_KEY, JSON.stringify(t));
    } catch (e) {}
  }

  function rolar(expr, rotulo, slot) {
    if (!window.GA_Rolagens || !window.GA_Dados) return null;
    let r = null;
    try {
      r = window.GA_Rolagens.rolarEPublicar(expr, rotulo);
      resultados[slot] = { total: r.total, detalhe: r.detalhe };
      historico.unshift({
        quando: Date.now(), rotulo: rotulo, expr: expr,
        total: r.total, detalhe: r.detalhe,
      });
      historico = historico.slice(0, HIST_MAX);
      const f = fichaAberta();
      if (f) salvarHistorico(f.id);
    } catch (err) {
      resultados[slot] = { erro: err.message || 'não deu para rolar' };
    }
    pintarResultado(slot);
    pintarHistorico();
    return r;
  }

  // Escreve o resultado no lugar dele, sem redesenhar a ficha (um
  // re-render tiraria o cursor de quem estivesse digitando ao lado).
  function pintarResultado(slot) {
    if (!secao) return;
    const el = secao.querySelector('[data-res="' + cssEsc(slot) + '"]');
    if (!el) return;
    const r = resultados[slot];
    if (!r) { el.innerHTML = ''; el.hidden = true; return; }
    el.hidden = false;
    el.className = 'fi-res' + (r.erro ? ' fi-res--erro' : '');
    el.innerHTML = r.erro
      ? '⚠ ' + esc(r.erro)
      : '<strong class="fi-res-num">' + r.total + '</strong>' +
        '<span class="fi-res-det">' + r.detalhe + '</span>';
  }
  // os slots têm ':' no nome, que em seletor CSS precisa de escape
  function cssEsc(s) { return String(s).replace(/:/g, '\\:'); }

  function pintarHistorico() {
    const cx = secao && secao.querySelector('[data-fi-hist]');
    if (cx) cx.innerHTML = listaHistorico();
  }

  // Trocar de ficha troca o caderno: os resultados pendurados nas linhas
  // e o histórico são daquele personagem, não desta tela.
  function abrirFicha(id) {
    dados.aberta = id;
    resultados = {};
    direcionar = {};
    carregarHistorico(id);
  }
  function d20(valor) { return valor === 0 ? '1d20' : '1d20' + sinal(valor); }
  function quem(f) { return f.nome || 'personagem sem nome'; }

  // ── DANO E CURA ──────────────────────────────────────────────────
  //  A conta está em gastarPontos(); aqui é a parte que a pessoa vê: o
  //  eco que conta de onde saiu cada ponto. É o aviso que faltava — sem
  //  ele ninguém percebe que os temporários foram consumidos, e é aí
  //  que o PV atual cai sem precisar.
  function aplicarDano(f, qual, n, porQue) {
    const rot = qual === 'pv' ? 'PV' : 'PM';
    const r = gastarPontos(f, qual, n);
    sujar(f.id, qual);
    const partes = [];
    if (r.temp)  partes.push('<strong>' + r.temp + '</strong> dos temporários');
    if (r.atual) partes.push('<strong>' + r.atual + '</strong> do ' + rot);
    const sobra = f[qual].temp || 0;
    ultimoDano = '🩸 −' + n + ' ' + rot + (porQue ? ' (' + esc(porQue) + ')' : '') +
                 (partes.length ? ': ' + partes.join(' e ') : '') +
                 (r.temp && !r.atual ? ' — o ' + rot + ' nem foi tocado' : '') +
                 (sobra ? ' · ainda ' + (sobra === 1 ? 'resta 1 temporário' : 'restam ' + sobra + ' temporários') : '');
    atualizarDerivados();
    salvar();
  }
  function aplicarCura(f, qual, n) {
    const rot = qual === 'pv' ? 'PV' : 'PM';
    const ganho = curarPontos(f, qual, n);
    sujar(f.id, qual);
    ultimoDano = ganho
      ? '✚ +' + ganho + ' ' + rot + (ganho < n ? ' (o resto passaria do máximo)' : '')
      : '✚ nada a recuperar — o ' + rot + ' já está cheio';
    atualizarDerivados();
    salvar();
  }

  // ── O HISTÓRICO ──────────────────────────────────────────────────
  //  Fica no fim da ficha e guarda as 30 últimas rolagens DESTA ficha,
  //  neste navegador. Não é o log da mesa (esse é do GA_Rolagens, mora
  //  no canto e é compartilhado): é o seu caderninho, e sobrevive ao F5.
  function listaHistorico() {
    if (!historico.length) {
      return '<p class="fi-hist-vazio">Nenhuma rolagem ainda nesta ficha.</p>';
    }
    return historico.map(h => `
      <li class="fi-hist-item">
        <span class="fi-hist-hora">${esc(hora(h.quando))}</span>
        <span class="fi-hist-rot">${esc(curto(h.rotulo))}</span>
        <span class="fi-hist-det">${h.detalhe}</span>
      </li>`).join('');
  }
  function hora(t) {
    try { return new Date(t).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }); }
    catch (e) { return ''; }
  }
  // "Vex · Percepção" → "Percepção": o nome do personagem se repete em
  // toda linha do histórico e só rouba a largura.
  function curto(rot) {
    const i = String(rot || '').indexOf(' · ');
    return i >= 0 ? rot.slice(i + 3) : (rot || 'rolagem');
  }
  function blocoHistorico() {
    return `
      <div class="fi-cartao fi-hist">
        <h2 class="fi-cartao-tit">🎲 Histórico de rolagens
          <span class="fi-cartao-nota">as ${HIST_MAX} últimas desta ficha, neste navegador</span>
          <button type="button" class="fi-mini fi-hist-limpar" data-acao="limpar-hist"
                  title="Esvaziar o histórico desta ficha">🗑 Limpar</button>
        </h2>
        <ul class="fi-hist-lista" data-fi-hist>${listaHistorico()}</ul>
      </div>`;
  }

  // ── O RECIBO DA LOJA ─────────────────────────────────────────────
  //  Logo abaixo do histórico de rolagens: o que entrou na mochila pelo
  //  🎒 da 🏪 Loja, com o que foi pago. Mora DENTRO da ficha (e não no
  //  localStorage, como as rolagens), porque quem precisa consultar é o
  //  dono dela — e quem compra pode ser o mestre, na tela dele.
  function dataHora(t) {
    if (!t) return '';
    try {
      const d = new Date(t);
      const dia = d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
      return dia + ' ' + d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    } catch (e) { return ''; }
  }
  function contaDaCompra(c) {
    if (c.faltou) return '⚠ não pagou — faltou T$ ' + arredonda(c.faltou);
    if (c.pago)   return 'T$ ' + arredonda(c.pago);
    if (c.preco)  return 'sem pagar · vale T$ ' + arredonda(c.preco);
    return 'sem preço de tabela';
  }
  function listaCompras(f) {
    if (!f.compras.length) {
      return '<p class="fi-hist-vazio">Nada comprado ainda. O botão <strong>🎒 Levar</strong> ' +
             'de cada item da 🏪 Loja traz o que você comprar para cá.</p>';
    }
    return f.compras.map(c => `
      <li class="fi-hist-item">
        <span class="fi-hist-hora">${esc(dataHora(c.quando))}</span>
        <span class="fi-hist-rot">${esc(c.nome)}${c.qtd > 1 ? ' ×' + c.qtd : ''}</span>
        <span class="fi-hist-det${c.faltou ? ' fi-compra-erro' : ''}">${esc(contaDaCompra(c))}${
          c.por ? ' <em class="fi-compra-por">· por ' + esc(c.por) + '</em>' : ''}</span>
      </li>`).join('');
  }
  function blocoCompras(f) {
    const gasto = arredonda(f.compras.reduce((s, c) => s + (c.pago || 0), 0));
    return `
      <div class="fi-cartao fi-hist fi-compras">
        <h2 class="fi-cartao-tit">🧾 O que veio da Loja
          <span class="fi-cartao-nota">${f.compras.length
            ? 'as ' + Math.min(COMPRAS_MAX, f.compras.length) + ' últimas' + (gasto ? ' · T$ ' + gasto + ' gastos aqui' : '')
            : 'as ' + COMPRAS_MAX + ' últimas compras desta ficha'}</span>
          ${f.compras.length ? `<button type="button" class="fi-mini fi-hist-limpar" data-acao="limpar-compras"
                  title="Esvaziar este recibo — o que está na mochila continua lá">🗑 Limpar</button>` : ''}
        </h2>
        <ul class="fi-hist-lista">${listaCompras(f)}</ul>
      </div>`;
  }

  // ── O CRÍTICO, NA REGRA DO LIVRO ─────────────────────────────────
  //  p. 142: "multiplique os DADOS de dano por 2. Bônus numéricos e
  //  dados extras não são multiplicados. Por exemplo, um dano de 1d8+3
  //  torna-se 2d8+3 com um acerto crítico."
  //  Ou seja: multiplica a QUANTIDADE de cada dado e deixa os números
  //  fixos quietos — 2d6+1d4+5 com ×3 vira 6d6+3d4+5.
  //  É rolado à mão, de propósito: quem decide se o 20 virou crítico é
  //  a mesa (margem de ameaça, alvo imune, confirmação da casa…).
  function expressaoCritica(dano, mult) {
    return String(dano || '').replace(/(\d*)d(\d+)/gi, (todo, qtd, lados) => {
      const n = (parseInt(qtd, 10) || 1) * mult;
      return n + 'd' + lados;
    });
  }
  // "19/×3" → 3 · "x4" → 4 · "19" ou vazio → 2 (o padrão do livro)
  function multiplicadorCritico(critico) {
    const m = String(critico || '').match(/[x×]\s*(\d+)/i);
    return m ? Math.max(2, Math.min(10, parseInt(m[1], 10))) : 2;
  }

  // ═══ RENDER ═══════════════════════════════════════════════════════
  function render() {
    const cont = document.getElementById('ficha-content');
    if (!cont) return;
    const f = fichaAberta();

    let html = `
      <div class="fi-cabecalho">
        <h1>Ficha de Personagem</h1>
        <p class="fi-subtitulo">A matemática do livro, feita sozinha — o resto é seu, para escrever</p>
      </div>
      <div class="fi-barra">
        ${dados.fichas.map(x => `
          <button type="button" class="fi-aba ${x.id === dados.aberta ? 'fi-aba--ativa' : ''}"
                  data-acao="abrir" data-id="${esc(x.id)}">
            ${esc(x.nome || '(sem nome)')}
          </button>`).join('')}
        <button type="button" class="fi-add" data-acao="nova">＋ Nova ficha</button>
      </div>
      ${barraDaMesa()}
`;

    // O rolador livre que ficava aqui saiu em 11/09/2026, a pedido dele:
    // na mesa, quem rola à mão é o painel 🎲 Rolagens (o mesmo do mestre);
    // na ficha, rola quem tem número — perícia, ataque, dano.
    if (!f) {
      html += `
        <p class="fi-vazio">Nenhuma ficha ainda.<br>
        Clique em <strong>＋ Nova ficha</strong>: escolha a classe e o nível, digite os seis atributos,
        e o resto — PV, PM, Defesa, carga e as 29 perícias — sai sozinho.</p>`;
      cont.innerHTML = html;
      return;
    }

    html += bloqueIdentidade(f) + blocoNumeros(f) + blocoApara(f) + blocoPericias(f) + blocoAtaques(f) +
            blocoAmigos(f) + blocoMagias(f) + blocoInventario(f) + blocoTextos(f) + blocoHistorico() +
            blocoCompras(f);
    const donoAberta = donoDe(f.id);
    html += `
      <div class="fi-rodape">
        <button type="button" class="fi-remover" data-acao="remover" data-id="${esc(f.id)}"
                title="${donoAberta
                  ? 'Tirar da mesa a ficha de ' + esc(nomeDoDono(donoAberta, f)) + ' — some para ela também'
                  : 'Apagar esta ficha deste navegador (e da mesa, se estiver nela)'}">
          🗑 ${donoAberta ? 'Tirar esta ficha da mesa' : 'Apagar esta ficha'}</button>
      </div>`;
    cont.innerHTML = html;
    // o innerHTML apagou os resultados — recoloca cada um no seu lugar
    Object.keys(resultados).forEach(pintarResultado);
  }

  // ── A BARRA DA MESA ──────────────────────────────────────────────
  //  Para o MESTRE: as fichas de todo mundo, ao vivo, com o nome de
  //  quem é dono. Ele abre, consulta, rola e baixa o PV — e a tela do
  //  jogador acompanha.
  //  Para o JOGADOR: nada de ficha dos outros (o banco nem manda), só
  //  a linha dizendo que a dele está indo para o mestre — e isso é
  //  informação, não enfeite: dá para saber se o mestre está vendo.
  //  ── A GAVETA DA CONTA, NA TELA ─────────────────────────────────
  //   Aparece com o login, esteja ou não numa mesa. Duas coisas ela
  //   precisa dizer, e nenhuma delas é enfeite: que a ficha não vai
  //   morrer com este navegador, e QUAIS fichas da conta ainda não
  //   estão aqui — com o botão de trazer cada uma.
  function barraDaGaveta(e) {
    if (!e.logado) return '';
    const faltando = soNaGaveta();
    const quem = (e.usuario && (e.usuario.displayName || e.usuario.email)) || 'a sua conta';
    let html = '';
    if (faltando.length) {
      html += `
        <div class="fi-barra fi-barra--gaveta">
          <span class="fi-barra-rot" title="Ficam guardadas na sua conta, não neste aparelho">🗄 Na sua conta</span>
          ${faltando.map(f => `
            <button type="button" class="fi-aba fi-aba--gaveta" data-acao="trazer" data-id="${esc(f.id)}"
                    title="Trazer esta ficha para este aparelho — ela continua na sua conta">
              ⬇ ${esc(f.nome || '(sem nome)')}
              <em>${esc(resumoDaFicha(f))}</em>
            </button>`).join('')}
        </div>`;
    }
    html += `<p class="fi-mesa-linha fi-mesa-linha--conta">
      🗄 As suas fichas ficam guardadas em <strong>${esc(quem)}</strong> — entre com ela em qualquer
      aparelho e elas aparecem${faltando.length ? ' (é o que está logo acima)' : ''}.</p>`;
    return html;
  }
  function resumoDaFicha(f) {
    const c = (f.classes || []).filter(x => x.classe && x.nivel > 0)
      .map(x => (D.classe(x.classe) || {}).nome || x.classe);
    return c.length ? c.join(' / ') + ' ' + nivel(f) : 'nível ' + nivel(f);
  }

  function barraDaMesa() {
    const e = window.GA_FichaMesa ? window.GA_FichaMesa.estado() : null;
    if (!e || !e.configurado) return '';       // site sem Firebase: a ficha é local e pronto

    if (!e.ligado) {
      return barraDaGaveta(e) + `<p class="fi-mesa-linha fi-mesa-linha--off">
        📡 Esta ficha ${e.logado ? 'não está em mesa nenhuma' : 'está só neste navegador'}.
        ${e.usuario
          ? 'Entre na mesa pela aba <strong>🎲 Mesa</strong> para o mestre poder vê-la.'
          : 'Entre com o Google na aba <strong>🎲 Mesa</strong> para o mestre poder vê-la.'}</p>`;
    }

    const daMesa = fichasDaMesa();
    let html = barraDaGaveta(e);
    if (e.vejoTodas) {
      html += `
        <div class="fi-barra fi-barra--mesa">
          <span class="fi-barra-rot" title="Só o mestre e o auxiliar recebem estas fichas">👥 Da mesa, ao vivo</span>
          ${daMesa.length ? daMesa.map(({ uid, ficha }) => `
            <button type="button" class="fi-aba fi-aba--mesa ${ficha.id === dados.aberta ? 'fi-aba--ativa' : ''}"
                    data-acao="abrir" data-id="${esc(ficha.id)}"
                    title="Ficha de ${esc(nomeDoDono(uid, ficha))} — você pode consultar, rolar e mexer">
              ${esc(ficha.nome || '(sem nome)')}
              <em>${esc(nomeDoDono(uid, ficha))}</em>
            </button>`).join('')
            : '<span class="fi-barra-vazio">nenhum jogador subiu ficha ainda</span>'}
        </div>`;
    }

    const daAberta = fichaAberta();
    const dono = daAberta ? donoDe(daAberta.id) : null;
    let onde;
    if (dono) onde = '· mexendo na ficha de <strong>' + esc(nomeDoDono(dono, daAberta)) + '</strong>, e ela vê na hora';
    else if (e.vejoTodas) onde = '· esta ficha é sua; as dos jogadores estão na fileira de cima';
    else onde = '· a sua ficha vai para o mestre a cada mudança';

    html += `<p class="fi-mesa-linha fi-mesa-linha--on">
      📡 Mesa <strong>${esc(e.sala)}</strong>${e.papel ? ' · você é <strong>' + esc(e.papel) + '</strong>' : ''}
      ${onde}
      ${e.erro ? '<span class="fi-mesa-erro">⚠ ' + esc(e.erro) + '</span>' : ''}</p>`;
    return html;
  }

  // ── IDENTIDADE ───────────────────────────────────────────────────
  function bloqueIdentidade(f) {
    const opsTam = D.TAMANHOS.map(t =>
      `<option value="${esc(t)}" ${t === f.tamanho ? 'selected' : ''}>${esc(t)}</option>`).join('');
    // As 30 numa lista só, em dois grupos — a escolha dele, em 10/09/2026:
    // quem joga de Burguês acha o Burguês, sem precisar saber de que
    // básica ele vem. A básica vai entre parênteses.
    const opcao = (C, sel) =>
      `<option value="${C.chave}" ${C.chave === sel ? 'selected' : ''}>${esc(C.nome)}${
        C.de ? ' (' + esc(D.classe(C.de).nome.toLowerCase()) + ')' : ''}</option>`;
    const linhasClasse = f.classes.map((c, i) => {
      const ops = '<option value="">— classe —</option>' +
        '<optgroup label="Classes básicas">' +
          D.CLASSES.filter(C => !C.de).map(C => opcao(C, c.classe)).join('') + '</optgroup>' +
        '<optgroup label="Classes variantes">' +
          D.CLASSES.filter(C => C.de).map(C => opcao(C, c.classe)).join('') + '</optgroup>';
      return `
        <div class="fi-classe">
          <select class="fi-sel" data-campo="classes.${i}.classe" title="Classe">${ops}</select>
          <input class="fi-num fi-num--nivel" type="number" min="0" max="20" value="${c.nivel}"
                 data-campo="classes.${i}.nivel" title="Nível nesta classe">
          ${f.classes.length > 1
            ? `<button type="button" class="fi-mini fi-mini--x" data-acao="tira-classe" data-i="${i}" title="Tirar esta classe">✕</button>`
            : ''}
        </div>`;
    }).join('');

    return `
      <div class="fi-cartao fi-ident">
        <div class="fi-ident-nomes">
          <label class="fi-campo fi-campo--largo">
            <span class="fi-rot">Personagem</span>
            <input class="fi-txt fi-txt--nome" type="text" value="${esc(f.nome)}" data-campo="nome"
                   placeholder="o nome dele" autocomplete="off">
          </label>
          <label class="fi-campo">
            <span class="fi-rot">Jogador</span>
            <input class="fi-txt" type="text" value="${esc(f.jogador)}" data-campo="jogador"
                   placeholder="quem joga" autocomplete="off">
          </label>
        </div>
        <div class="fi-ident-linha">
          <label class="fi-campo"><span class="fi-rot">Raça</span>
            <input class="fi-txt" type="text" value="${esc(f.raca)}" data-campo="raca" placeholder="humano, elfo…" autocomplete="off"></label>
          <label class="fi-campo"><span class="fi-rot">Origem</span>
            <input class="fi-txt" type="text" value="${esc(f.origem)}" data-campo="origem" placeholder="acólito, batedor…" autocomplete="off"></label>
          <label class="fi-campo"><span class="fi-rot">Divindade</span>
            <input class="fi-txt" type="text" value="${esc(f.divindade)}" data-campo="divindade" placeholder="ou nenhuma" autocomplete="off"></label>
          <label class="fi-campo fi-campo--curto"><span class="fi-rot">Tamanho</span>
            <select class="fi-sel" data-campo="tamanho">${opsTam}</select></label>
          <label class="fi-campo fi-campo--curto"><span class="fi-rot">Desloc. (m)</span>
            <input class="fi-num" type="number" min="0" step="1.5" value="${f.deslocamento}" data-campo="deslocamento"></label>
        </div>
        <div class="fi-ident-classes">
          <span class="fi-rot">Classe(s) e nível</span>
          <div class="fi-classes">
            ${linhasClasse}
            <button type="button" class="fi-mini" data-acao="add-classe" title="Multiclasse: acrescentar outra classe">＋</button>
          </div>
          <span class="fi-nivel-selo">Nível <strong data-der="nivel">${nivel(f)}</strong>
            <em data-der="patamar">${patamar(nivel(f))}</em></span>
          ${avisoMesmaClasse(f)}
        </div>
        <div class="fi-ident-xp">
          <label class="fi-campo fi-campo--curto"><span class="fi-rot">XP</span>
            <input class="fi-num" type="number" min="0" step="100" value="${f.xp}" data-campo="xp"
                   title="Pontos de experiência acumulados (Tabela 1-4, p. 34)"></label>
          <span class="fi-xp-conta" data-der="xpconta">${contaXp(f)}</span>
          <span class="fi-xp-barra" data-der="xpbarra" aria-hidden="true">${barraXp(f)}</span>
        </div>
      </div>`;
  }

  // ── A MESMA CLASSE EM DUAS LINHAS ────────────────────────────────
  //  "Não é possível fazer multiclasse entre uma classe básica e uma de
  //  suas variantes — para todos os efeitos, ambas são a mesma classe"
  //  (Heróis de Arton, p. 22). A ficha diz e não trava, como no resto.
  //  Não depende do nível, só de qual classe está em cada linha, então
  //  o render() que toda troca de classe já faz basta para atualizar.
  function avisoMesmaClasse(f) {
    const vista = {};
    const avisos = [];
    f.classes.forEach(c => {
      const C = D.classe(c.classe);
      if (!C) return;
      const b = D.basicaDe(C.chave);
      const A = vista[b];
      if (!A) { vista[b] = C; return; }
      if (A.chave === C.chave) {
        avisos.push(`${esc(C.nome)} está em duas linhas — é uma classe só; some os níveis numa linha.`);
      } else {
        const v = C.de ? C : A;
        avisos.push(`${esc(v.nome)} é a variante do ${esc(D.classe(v.de).nome.toLowerCase())}: para o livro,
          as duas são a mesma classe e não fazem multiclasse (Heróis de Arton, p. 22). Fique com uma e
          some os níveis nela.`);
      }
    });
    // três linhas de Guerreiro dariam o mesmo aviso duas vezes
    return avisos.filter((a, i) => avisos.indexOf(a) === i)
      .map(a => `<p class="fi-classes-aviso">⚠ ${a}</p>`).join('');
  }

  // ── XP: FALTA MUITO PARA SUBIR? ──────────────────────────────────
  //  A Tabela 1-4 (p. 34) diz o XP de cada nível; daqui sai a frase que
  //  se quer ler no fim da sessão. O nível continua sendo o que ELE
  //  escreve nas classes — o XP não sobe ninguém sozinho, porque subir
  //  de nível é escolher poder, perícia e mais coisa. Quando os dois
  //  discordam, a ficha DIZ, e não conserta.
  function xpDoNivel(n) {
    const t = D.XP_POR_NIVEL || [];
    return t[Math.max(1, Math.min(20, n))] || 0;
  }
  function contaXp(f) {
    const xp = Math.max(0, f.xp || 0);
    const n = nivel(f);
    const nPeloXp = D.nivelDoXp ? D.nivelDoXp(xp) : 1;
    if (n >= 20) return 'Nível 20 — o teto do livro. ' + num(xp) + ' XP.';
    const alvo = xpDoNivel(n + 1);
    const faltam = Math.max(0, alvo - xp);
    let frase = faltam === 0
      ? '✔ já dá para o nível ' + (n + 1) + ' — ' + num(xp) + ' de ' + num(alvo) + ' XP'
      : 'faltam <strong>' + num(faltam) + '</strong> XP para o nível ' + (n + 1) +
        ' <em>(' + num(xp) + ' de ' + num(alvo) + ')</em>';
    if (nPeloXp > n) {
      frase += ' · <strong class="fi-xp-alerta">a tabela já lhe dá o nível ' + nPeloXp + '</strong>';
    } else if (nPeloXp < n && xp > 0) {
      frase += ' · <em class="fi-xp-alerta">a tabela daria o nível ' + nPeloXp + '</em>';
    }
    return frase;
  }
  // Quanto do caminho entre o nível de agora e o próximo já foi andado.
  function barraXp(f) {
    const n = nivel(f);
    if (n >= 20) return '<span class="fi-xp-parte" style="width:100%"></span>';
    const de = xpDoNivel(n), ate = xpDoNivel(n + 1);
    const xp = Math.max(0, f.xp || 0);
    const p = ate > de ? Math.max(0, Math.min(100, Math.round((xp - de) / (ate - de) * 100))) : 0;
    return '<span class="fi-xp-parte" style="width:' + p + '%"></span>';
  }
  function num(n) { return (n || 0).toLocaleString('pt-BR'); }

  // ── OS NÚMEROS: atributos · vida e mana · defesa e carga ─────────
  function blocoNumeros(f) {
    const atrs = D.ATRIBUTOS.map(a => `
      <label class="fi-atr">
        <span class="fi-atr-nome">${esc(a.curto)}</span>
        <input class="fi-atr-val" type="number" value="${f.atributos[a.chave]}"
               data-campo="atributos.${a.chave}" title="${esc(a.nome)} — em T20 o valor já é o modificador">
      </label>`).join('');

    const opsCd = D.ATRIBUTOS.map(a =>
      `<option value="${a.chave}" ${a.chave === f.cdAtributo ? 'selected' : ''}>${esc(a.curto)}</option>`).join('');

    return `
      <div class="fi-numeros">
        <div class="fi-cartao fi-atributos">
          <h2 class="fi-cartao-tit">Atributos</h2>
          <div class="fi-atr-grade">${atrs}</div>
          <p class="fi-nota">Em Tormenta 20 o valor <em>já é</em> o modificador: Força 3 soma +3.
            Digite o total, com o que a raça deu.</p>
        </div>

        <div class="fi-cartao fi-vida">
          <h2 class="fi-cartao-tit">Vida &amp; Mana</h2>
          ${medidor(f, 'pv')}
          ${medidor(f, 'pm')}

          <p class="fi-dano-eco" data-der="danoeco" ${ultimoDano ? '' : 'hidden'}>${ultimoDano}</p>

          <div class="fi-extras">
            <label class="fi-extra fi-extra--temp"><span>⛨ PV temporários</span>
              <input class="fi-num" type="number" value="${f.pv.temp}" data-campo="pv.temp"
                     title="Somam ao seu PV atual, mesmo passando do máximo — e são os primeiros a serem gastos (p. 105)"></label>
            <label class="fi-extra fi-extra--temp"><span>✦ PM temporários</span>
              <input class="fi-num" type="number" value="${f.pm.temp}" data-campo="pm.temp"
                     title="Mesma regra dos PV temporários: entram por cima e saem primeiro"></label>
            <label class="fi-extra"><span>＋ PV máximo</span>
              <input class="fi-num" type="number" value="${f.pv.outros}" data-campo="pv.outros"
                     title="O que soma ao PV máximo além da classe: poderes (Vitalidade, Sarado…), itens, raça. Pode ser negativo."></label>
            <label class="fi-extra"><span>＋ PM máximo</span>
              <input class="fi-num" type="number" value="${f.pm.outros}" data-campo="pm.outros"
                     title="O que soma ao PM máximo além da classe e do atributo: poderes (Vontade de Ferro, Totem Espiritual, Elo com a Natureza…), itens. Negativo para uma Penalidade de PM (p. 221)."></label>
          </div>
          <p class="fi-nota fi-nota--temp">Os temporários entram <em>por cima</em> do seu total, mesmo passando do
            máximo, e são <strong>sempre os primeiros a serem gastos</strong> — por isso o dano daqui desce
            deles antes de tocar no seu PV. No fim do dia, somem.</p>
          <p class="fi-conta" data-der="pvconta">${contaPv(f)}</p>
        </div>

        <div class="fi-cartao fi-defesa">
          <h2 class="fi-cartao-tit">Defesa &amp; Carga</h2>
          <div class="fi-grande">
            <span class="fi-grande-rot">Defesa</span>
            <strong class="fi-grande-val" data-der="defesa">${defesa(f)}</strong>
          </div>
          <p class="fi-conta" data-der="defconta">${contaDefesa(f)}</p>
          <div class="fi-extras">
            <label class="fi-extra"><span>Armadura</span>
              <input class="fi-num" type="number" value="${f.defesa.armadura}" data-campo="defesa.armadura"></label>
            <label class="fi-extra"><span>Escudo</span>
              <input class="fi-num" type="number" value="${f.defesa.escudo}" data-campo="defesa.escudo"></label>
            <label class="fi-extra"><span>Outros</span>
              <input class="fi-num" type="number" value="${f.defesa.outros}" data-campo="defesa.outros"></label>
            <label class="fi-extra"><span>Penal. armadura</span>
              <input class="fi-num" type="number" value="${f.defesa.penalidade}" data-campo="defesa.penalidade"
                     title="O número do livro (ex.: 5). Cai só em Acrobacia, Furtividade e Ladinagem."></label>
          </div>
          <div class="fi-linhas">
            <div class="fi-linha fi-linha--carga">
              <span>Carga</span>
              <span><strong data-der="cargausada">${cargaUsada(f)}</strong>
                / <strong data-der="cargamax">${cargaMax(f)}</strong> espaços
                <em class="fi-carga-estado" data-der="cargaestado">${rotuloCarga(f)}</em></span>
            </div>
            <div class="fi-linha">
              <span>CD das suas habilidades</span>
              <span><strong data-der="cd">${cdBase(f)}</strong>
                <select class="fi-sel fi-sel--mini" data-campo="cdAtributo"
                        title="Atributo-chave das suas habilidades — no arcanista, é também o que ele soma no PM (Bruxo e Mago: Int; Feiticeiro: Car)">${opsCd}</select></span>
            </div>
            <div class="fi-linha">
              <span>Deslocamento</span>
              <span><strong data-der="desloc">${f.deslocamento}</strong> m (<strong data-der="quadrados">${quadrados(f.deslocamento)}</strong> quadrados)</span>
            </div>
          </div>
        </div>
      </div>`;
  }

  // ── O MEDIDOR DE PV / PM ─────────────────────────────────────────
  //  Os dois são iguais, fora a cor e o rótulo — e os dois precisam
  //  mostrar o temporário. A barra tem DOIS pedaços: o atual (ferrugem
  //  no PV, azul no PM) e o temporário logo depois, em ouro. É a
  //  "marca" pedida: dá para ver de longe que há escudo em cima da
  //  vida, e a etiqueta ao lado diz quantos são, por escrito.
  function medidor(f, qual) {
    const ehPv  = qual === 'pv';
    const atual = ehPv ? pvAtual(f) : pmAtual(f);
    const max   = ehPv ? pvMax(f)   : pmMax(f);
    const temp  = f[qual].temp || 0;
    const rot   = ehPv ? 'PV' : 'PM';
    return `
      <div class="fi-medidor">
        <span class="fi-medidor-rot">${rot}</span>
        <button type="button" class="fi-passo" data-acao="${qual}-menos" title="−1 ${rot}">−</button>
        <input class="fi-medidor-val" type="number" value="${atual}" data-campo="${qual}.atual" title="${rot} atual">
        <span class="fi-medidor-max">/ <strong data-der="${qual}max">${max}</strong></span>
        <button type="button" class="fi-passo" data-acao="${qual}-mais" title="+1 ${rot}">+</button>
        <span class="fi-temp-selo fi-temp-selo--${qual}" data-der="${qual}selo" ${temp ? '' : 'hidden'}
              title="${rot} temporários — gastos antes do seu ${rot} de verdade">
          ${ehPv ? '⛨' : '✦'} <strong>${temp}</strong> temp
        </span>
      </div>
      <div class="fi-barra-pv fi-barra-pv--${qual}">
        <span class="fi-barra-parte" data-der="${qual}barra" style="width:${fatia(atual, max, temp)}%"></span>
        <span class="fi-barra-temp" data-der="${qual}barratemp" style="width:${fatia(temp, max, temp)}%"></span>
      </div>`;
  }
  // A barra precisa caber atual + temporário, e o temporário pode passar
  // do máximo (é o que a regra manda). Então a régua é o maior dos dois.
  function fatia(parte, max, temp) {
    const base = Math.max(1, max, (max || 0) + (temp || 0), parte + (temp || 0));
    return Math.max(0, Math.min(100, Math.round(Math.max(0, parte) / base * 100)));
  }

  // O mapa é em quadrados de 1,5 m; os METROS é que mandam, e o quadrado
  // é conta — a mesma política do resto do site.
  function quadrados(m) { return Math.round(((m || 0) / 1.5) * 10) / 10; }
  function porcento(a, b) { return b > 0 ? Math.max(0, Math.min(100, Math.round(a / b * 100))) : 0; }

  function contaPv(f) {
    const c = f.classes.filter(x => D.classe(x.classe) && x.nivel > 0);
    if (!c.length) return 'Escolha a classe e o nível para o PV e o PM aparecerem.';
    const con = atr(f, 'con');
    const partes = c.map((x, i) => {
      const C = D.classe(x.classe);
      return i === 0
        ? `${esc(C.nome)}: ${C.pvBase}${sinalCon(con)} + ${x.nivel - 1}×(${C.pvNivel}${sinalCon(con)})`
        : `${esc(C.nome)}: ${x.nivel}×(${C.pvNivel}${sinalCon(con)})`;
    });
    const pm = c.map(x => `${D.classe(x.classe).pmNivel}×${x.nivel}`).join(' + ') +
      atributosDoPm(f).map(x => {
        const v = atr(f, x.atr);
        return ` + ${atrCurto(x.atr)} ${v < 0 ? '−' + Math.abs(v) : v} <em>(${esc(x.classe.nome.toLowerCase())})</em>`;
      }).join('');
    return `PV = ${partes.join(' + ')}${f.pv.outros ? ' ' + sinal(f.pv.outros) : ''} · PM = ${pm}${f.pm.outros ? ' ' + sinal(f.pm.outros) : ''}`;
  }
  function sinalCon(con) { return con === 0 ? '' : (con > 0 ? ' + ' + con : ' − ' + Math.abs(con)); }
  // O aviso da p. 141, com o preço já escrito: quem passa do limite
  // sofre −5 de armadura e −3m de deslocamento; acima do dobro, não
  // carrega. A ficha avisa e não impede — como o resto dela.
  function rotuloCarga(f) {
    const e = estadoCarga(f);
    if (e === 'demais') return '⚠ acima do dobro do limite — o livro diz que não dá para carregar';
    if (e === 'sobrecarregado') return '⚠ sobrecarregado: −5 de armadura e −3m de deslocamento';
    return '';
  }

  function contaDefesa(f) {
    const p = ['10', 'Des ' + sinal(atr(f, 'des'))];
    if (f.defesa.armadura) p.push('armadura ' + sinal(f.defesa.armadura));
    if (f.defesa.escudo)   p.push('escudo ' + sinal(f.defesa.escudo));
    if (f.defesa.outros)   p.push('outros ' + sinal(f.defesa.outros));
    return p.join(' + ').replace(/\+ -/g, '− ');
  }

  // ── O QUE APARA O DANO ───────────────────────────────────────────
  //  Resistência, redução de dano e imunidade são TRÊS coisas, e a
  //  mesa vive confundindo as duas primeiras. Aqui elas têm cartão
  //  próprio, cada uma com o seu formato — e a nota do cartão diz, em
  //  uma linha, o que cada uma faz.
  //
  //  ⚠ "Teste de resistência" NÃO é isto: Fortitude, Reflexos e Vontade
  //  são PERÍCIAS em T20, e estão no cartão de cima, com as outras 29.
  const APARAM = [
    { campo: 'resistencias', titulo: '🜂 Resistências', icone: '🜂',
      dica: 'Resistência a fogo 10, a frio 5… tira aquele tanto do dano DAQUELE tipo',
      phValor: '10', phDo: 'fogo, frio, ácido…', comValor: true },
    { campo: 'reducoes', titulo: '🛡 Redução de dano', icone: '🛡',
      dica: 'RD 5 tira 5 de todo dano físico. Dá para ter várias, cada uma com a sua condição',
      phValor: '5', phDo: 'todo dano físico, corte…', comValor: true },
    { campo: 'imunidades', titulo: '🚫 Imunidades', icone: '🚫',
      dica: 'O que não lhe atinge de jeito nenhum: veneno, medo, sono…',
      phValor: '', phDo: 'veneno, doenças, medo…', comValor: false },
  ];

  function linhaApara(f, bloco, x, i) {
    return `
      <li class="fi-apara">
        ${bloco.comValor
          ? `<input class="fi-num fi-num--mini" type="text" inputmode="numeric" value="${esc(x.valor)}"
                   data-campo="${bloco.campo}.${i}.valor" placeholder="${bloco.phValor}" title="Quanto tira">`
          : `<span class="fi-apara-icone" aria-hidden="true">${bloco.icone}</span>`}
        <input class="fi-txt" type="text" value="${esc(x.do_)}" data-campo="${bloco.campo}.${i}.do_"
               placeholder="${esc(bloco.phDo)}" autocomplete="off">
        <input class="fi-txt fi-txt--obs" type="text" value="${esc(x.obs)}" data-campo="${bloco.campo}.${i}.obs"
               placeholder="de onde vem, quando vale…" autocomplete="off">
        <button type="button" class="fi-mini fi-mini--x" data-acao="tira-apara"
                data-campo="${bloco.campo}" data-i="${i}" title="Tirar esta linha">✕</button>
      </li>`;
  }

  function blocoApara(f) {
    const cartoes = APARAM.map(b => {
      const lista = f[b.campo] || [];
      return `
        <div class="fi-apara-grupo">
          <h3 class="fi-apara-tit">${b.titulo}
            <span class="fi-apara-dica">${esc(b.dica)}</span></h3>
          <ul class="fi-apara-lista">
            ${lista.length ? lista.map((x, i) => linhaApara(f, b, x, i)).join('')
              : '<li class="fi-atq-vazio">Nada por enquanto.</li>'}
          </ul>
          <button type="button" class="fi-add fi-add--menor" data-acao="add-apara"
                  data-campo="${b.campo}">＋ Acrescentar</button>
        </div>`;
    }).join('');

    return `
      <div class="fi-cartao fi-bloco fi-aparas">
        <h2 class="fi-cartao-tit">🛡 O que apara o dano
          <span class="fi-cartao-nota">resistência, redução e imunidade são três coisas diferentes</span>
        </h2>
        <div class="fi-apara-grade">${cartoes}</div>
        <label class="fi-campo fi-campo--largo fi-prof">
          <span class="fi-rot">🎓 Proficiências</span>
          <input class="fi-txt" type="text" value="${esc(f.proficiencias)}" data-campo="proficiencias"
                 placeholder="armas simples, armaduras leves, escudos…" autocomplete="off">
        </label>
        <p class="fi-nota"><strong>Teste de resistência é outra coisa.</strong> Fortitude, Reflexos e
          Vontade são <em>perícias</em> em Tormenta 20 — estão lá em cima, na lista das 29, com o selo
          <strong>resistência</strong>. O que está neste cartão é o que <em>apara o dano</em> depois que
          ele acontece.</p>
      </div>`;
  }

  // ── PERÍCIAS ─────────────────────────────────────────────────────
  function marcasDe(p) {
    return (p.resist   ? '<span class="fi-selo fi-selo--res" title="Teste de resistência">resistência</span>' : '') +
           (p.ataque   ? '<span class="fi-selo fi-selo--atq" title="Teste de ataque ' + esc(p.ataque) + '">ataque</span>' : '') +
           (p.treinada ? '<span class="fi-selo" title="Só pode ser usada se você for treinado nela">só treinada</span>' : '') +
           (p.armadura ? '<span class="fi-selo fi-selo--arm" title="Sofre a penalidade de armadura">armadura</span>' : '');
  }
  function botaoTreinar(marcada, attrs) {
    return `<button type="button" class="fi-per-check" ${attrs}
              title="${marcada ? 'Treinada — clique para destreinar' : 'Marcar como treinada'}"
              aria-pressed="${marcada}">${marcada ? '✓' : ''}</button>`;
  }

  function blocoPericias(f) {
    const n = nivel(f);
    const linhas = D.PERICIAS.map(p => {
      // Ofício não é UMA perícia: no lugar dela entram as especialidades
      // que este personagem tem (p. 121). Ver linhasOficio().
      if (p.multipla) return linhasOficio(f, p);
      const e = f.pericias[p.chave];
      const v = valorPericia(f, p.chave);
      return `
        <li class="fi-per ${e.treinada ? 'fi-per--treinada' : ''}">
          ${botaoTreinar(e.treinada, 'data-acao="treinar" data-p="' + p.chave + '"')}
          <button type="button" class="fi-per-rolar" data-acao="rolar-pericia" data-p="${p.chave}"
                  title="Rolar 1d20 ${sinal(v)} de ${esc(p.nome)}">
            <span class="fi-per-nome">${esc(p.nome)}</span>
            <span class="fi-per-atr">${esc(atrCurto(p.atr))}</span>
            <span class="fi-per-val" data-der="per:${p.chave}">${sinal(v)}</span>
            <span class="fi-per-dado" aria-hidden="true">🎲</span>
          </button>
          <input class="fi-num fi-num--mini" type="number" value="${e.outros}"
                 data-campo="pericias.${p.chave}.outros" title="Outros bônus nesta perícia">
          <span class="fi-per-marcas">${marcasDe(p)}</span>
          <span class="fi-res" data-res="per:${p.chave}" hidden></span>
        </li>`;
    }).join('');

    return `
      <div class="fi-cartao fi-pericias">
        <h2 class="fi-cartao-tit">Perícias
          <span class="fi-cartao-nota">⌊nível ÷ 2⌋ + atributo + treino <span data-der="treino">${sinal(treino(n, true))}</span> − penalidade de armadura</span>
        </h2>
        <ul class="fi-per-lista">${linhas}</ul>
        <p class="fi-nota">O <strong>🎲</strong> rola 1d20 com o bônus já somado, e a rolagem aparece na mesa.
          O ✓ marca treinada — o site não confere quantas você pode treinar, isso é escolha sua.
          As <em>só treinada</em> aparecem mesmo sem treino porque o livro proíbe o uso, não a rolagem.</p>
      </div>`;
  }

  // ── OS OFÍCIOS ───────────────────────────────────────────────────
  //  "Ofício na verdade são várias perícias diferentes. Cada uma
  //  permite fabricar itens de certas categorias" (p. 121) — armeiro,
  //  artesão, alquimista, cozinheiro, alfaiate, "e você pode inventar
  //  outros". Cada linha aqui é uma perícia inteira, com o treino e o
  //  bônus dela; ser alquimista não faz de você um engenhoqueiro.
  function linhasOficio(f, p) {
    const lista = D.OFICIOS.map(o => `<option value="${esc(o.nome)}">`).join('');
    return f.oficios.map((o, i) => {
      const v = valorOficio(f, i);
      return `
        <li class="fi-per fi-per--oficio ${o.treinada ? 'fi-per--treinada' : ''}">
          ${botaoTreinar(o.treinada, 'data-acao="treinar-oficio" data-i="' + i + '"')}
          <span class="fi-per-nome fi-per-nome--of">Ofício</span>
          <input class="fi-txt fi-of-esp" type="text" value="${esc(o.esp)}" list="fiOficios"
                 data-campo="oficios.${i}.esp" placeholder="de quê? alquimista, engenhoqueiro…"
                 autocomplete="off" title="A especialidade deste ofício">
          <button type="button" class="fi-per-rolar fi-per-rolar--of" data-acao="rolar-oficio" data-i="${i}"
                  title="Rolar 1d20 ${sinal(v)} de ${esc(nomeOficio(o))}">
            <span class="fi-per-atr">${esc(atrCurto(p.atr))}</span>
            <span class="fi-per-val" data-der="of:${i}">${sinal(v)}</span>
            <span class="fi-per-dado" aria-hidden="true">🎲</span>
          </button>
          <input class="fi-num fi-num--mini" type="number" value="${o.outros}"
                 data-campo="oficios.${i}.outros" title="Outros bônus neste ofício">
          <span class="fi-per-marcas">
            ${f.oficios.length > 2
              ? `<button type="button" class="fi-mini fi-mini--x" data-acao="tira-oficio" data-i="${i}"
                         title="Tirar este ofício">✕</button>` : ''}
            ${i === f.oficios.length - 1
              ? `<button type="button" class="fi-mini" data-acao="add-oficio"
                         title="Acrescentar outro ofício — cada um é uma perícia à parte">＋</button>` : ''}
          </span>
          <span class="fi-res" data-res="of:${i}" hidden></span>
        </li>`;
    }).join('') +
    `<datalist id="fiOficios">${lista}</datalist>`;
  }
  function atrCurto(chave) {
    const a = D.ATRIBUTOS.find(x => x.chave === chave);
    return a ? a.curto : chave;
  }

  // ── ATAQUES ──────────────────────────────────────────────────────
  function blocoAtaques(f) {
    const linhas = f.ataques.map((a, i) => {
      const mult = multiplicadorCritico(a.critico);
      return `
      <li class="fi-atq">
        <input class="fi-txt fi-txt--atq" type="text" value="${esc(a.nome)}" data-campo="ataques.${i}.nome"
               placeholder="espada longa" autocomplete="off">
        <select class="fi-sel fi-sel--mini" data-campo="ataques.${i}.pericia" title="Com qual perícia se ataca">
          <option value="luta" ${a.pericia === 'luta' ? 'selected' : ''}>Luta</option>
          <option value="pontaria" ${a.pericia === 'pontaria' ? 'selected' : ''}>Pontaria</option>
        </select>
        <input class="fi-num fi-num--mini" type="number" value="${a.extra}" data-campo="ataques.${i}.extra"
               title="Bônus extra deste ataque (arma mágica, poder…)">
        <button type="button" class="fi-atq-val" data-acao="rolar-ataque" data-i="${i}"
                title="Rolar 1d20 ${sinal(valorAtaque(f, a))} de ataque">${sinal(valorAtaque(f, a))} 🎲</button>
        <input class="fi-txt fi-txt--mini" type="text" value="${esc(a.dano)}" data-campo="ataques.${i}.dano"
               placeholder="1d8+3" autocomplete="off">
        <button type="button" class="fi-atq-dano" data-acao="rolar-dano" data-i="${i}"
                title="Rolar o dano">🎲 dano</button>
        <input class="fi-txt fi-txt--mini" type="text" value="${esc(a.critico)}" data-campo="ataques.${i}.critico"
               placeholder="19/×3" autocomplete="off">
        <button type="button" class="fi-atq-crit" data-acao="rolar-critico" data-i="${i}"
                title="Rolar o dano CRÍTICO: ${esc(expressaoCritica(a.dano || '—', mult))} (só os dados multiplicam, ×${mult})">💥 ×${mult}</button>
        <input class="fi-txt fi-txt--mini" type="text" value="${esc(a.tipo)}" data-campo="ataques.${i}.tipo"
               placeholder="corte" autocomplete="off">
        <input class="fi-txt fi-txt--mini" type="text" value="${esc(a.alcance)}" data-campo="ataques.${i}.alcance"
               placeholder="corpo a corpo" autocomplete="off">
        <button type="button" class="fi-mini fi-mini--x" data-acao="tira-ataque" data-i="${i}" title="Tirar este ataque">✕</button>
        <span class="fi-res fi-res--atq" data-res="atq:${i}" hidden></span>
        <span class="fi-res fi-res--atq" data-res="dano:${i}" hidden></span>
        <span class="fi-res fi-res--atq fi-res--crit" data-res="crit:${i}" hidden></span>
      </li>`;
    }).join('');

    return `
      <div class="fi-cartao fi-ataques">
        <h2 class="fi-cartao-tit">Ataques
          <span class="fi-cartao-nota">o valor de ataque <em>é</em> a perícia — Luta ou Pontaria</span>
        </h2>
        <div class="fi-atq-cab">
          <span>Arma</span><span>Perícia</span><span>Extra</span><span>Ataque</span>
          <span>Dano</span><span></span><span>Crítico</span><span></span><span>Tipo</span><span>Alcance</span><span></span>
        </div>
        <ul class="fi-atq-lista">${linhas || '<li class="fi-atq-vazio">Nenhum ataque ainda.</li>'}</ul>
        <button type="button" class="fi-add fi-add--menor" data-acao="add-ataque">＋ Acrescentar ataque</button>
        <p class="fi-nota">O dano de corpo a corpo e de arremesso soma a Força — escreva o total aqui (ex.: <code>1d8+3</code>).
          O <strong>💥</strong> rola o crítico <em>à mão</em>, porque quem decide se o 20 virou crítico é a mesa:
          ele multiplica só os <strong>dados</strong>, como o livro manda (p. 142) — <code>1d8+3</code> com ×2 vira
          <code>2d8+3</code>, e o +3 não dobra.</p>
      </div>`;
  }

  // ═══ O MELHOR AMIGO DO TREINADOR (Heróis de Arton, p. 17–22) ══════
  //  Um parceiro com ficha COMPLETA — atributos, PV, Defesa, perícias,
  //  ataques e truques —, que age com as ações do treinador. As contas
  //  são as da p. 20. O nível que vale é o de treinador; com o poder
  //  Treinador Eclético, o de personagem (só para PV, perícias e Defesa).
  //  Não vem do bestiário nem fala com ele: "se você escolher um melhor
  //  amigo gorlogg, ele terá as características abaixo, não aquelas
  //  descritas em Tormenta20, p. 291" — é o livro que separa.
  function nivelTreinador(f) {
    return f.classes.reduce((s, c) => s + (c.classe === 'treinador' ? Math.max(0, c.nivel || 0) : 0), 0);
  }
  function nivelDoAmigo(f) {
    return Math.max(1, f.treinador.ecletico ? nivel(f) : nivelTreinador(f));
  }
  function temTruque(a, k) { return (a.truques[k] || 0) > 0; }
  function nomeAmigo(a) { return a.nome || 'melhor amigo'; }

  // "Começa com 16 pontos de vida + Constituição e ganha 4 PV + Con por
  // nível" — a Constituição é a DELE. Treino Intensivo: "+4 PV por nível".
  function pvAmigoMax(f, a) {
    const n = nivelDoAmigo(f), con = a.atributos.con || 0;
    let pv = D.AMIGO.pvBase + con + (n - 1) * (D.AMIGO.pvNivel + con);
    if (f.treinador.treino === 'intensivo') pv += 4 * n;
    return pv + (a.pvOutros || 0);
  }
  function pvAmigoAtual(f, a) {
    const v = f.amigosPv[a.id];
    return typeof v === 'number' ? v : pvAmigoMax(f, a);
  }
  // p. 236: "Quando seus pontos de vida chegam a –10 ou a um número
  // negativo igual à metade de seus PV totais (o que for mais baixo),
  // você morre."
  function limiteMorte(max) { return Math.min(-10, -Math.floor(max / 2)); }
  function estadoAmigo(f, a) {
    const pv = pvAmigoAtual(f, a), max = pvAmigoMax(f, a);
    if (pv <= limiteMorte(max)) return 'morto';
    return pv <= 0 ? 'caido' : '';
  }
  function textoEstado(f, a) {
    const e = estadoAmigo(f, a);
    if (e === 'morto') return '💀 <strong>Morto.</strong> O treinador fica atordoado por 1d4 rodadas, e um novo ' +
      'melhor amigo se treina com um mês de trabalho (p. 17).';
    if (e === 'caido') return '🩸 <strong>Caído</strong>, com 0 PV ou menos — morre em −' +
      Math.abs(limiteMorte(pvAmigoMax(f, a))) + ' PV (Tormenta20, p. 236).';
    return '';
  }

  // "Defesa. 10 + Destreza + Carisma do treinador + metade do nível do
  // treinador." Treinamento Defensivo troca a metade pelo nível; Veloz, +2.
  function defesaAmigo(f, a) {
    const n = nivelDoAmigo(f);
    return 10 + (a.atributos.des || 0) + atr(f, 'car') +
      (temTruque(a, 'treinamento-defensivo') ? n : Math.floor(n / 2)) +
      (temTruque(a, 'veloz') ? 2 : 0) + (a.defOutros || 0);
  }

  // Treinada por escolha (as 3 da p. 20), pelo tipo (o animal) ou pelo
  // truque Veloz (Atletismo — "se já for, recebe +2 nessa perícia").
  function treinoAmigo(a, k) {
    const T = D.tipoAmigo(a.tipo);
    const doTipo = !!(T && T.treina && T.treina.indexOf(k) >= 0);
    const doVeloz = k === 'atletismo' && temTruque(a, 'veloz');
    const escolhida = !!(a.pericias[k] && a.pericias[k].treinada);
    return { treinada: escolhida || doTipo || doVeloz, escolhida: escolhida, doTipo: doTipo, doVeloz: doVeloz };
  }
  function valorPericiaAmigo(f, a, k) {
    const P = D.pericia(k);
    if (!P) return 0;
    const n = nivelDoAmigo(f), t = treinoAmigo(a, k);
    let v = Math.floor(n / 2) + (a.atributos[P.atr] || 0) + treino(n, t.treinada) + ((a.pericias[k] || {}).outros || 0);
    if (t.doVeloz && (t.escolhida || t.doTipo)) v += 2;
    return v;
  }
  // As 3 que o jogador escolheu — as do tipo não contam, vêm de graça.
  function escolhidasAmigo(a) {
    return D.AMIGO.pericias.filter(k => { const t = treinoAmigo(a, k); return t.escolhida && !t.doTipo; }).length;
  }

  // Treinamento Marcial: +2, e +1 por patamar acima de iniciante.
  function marcialAmigo(f, a) {
    if (!temTruque(a, 'treinamento-marcial')) return 0;
    const n = nivelDoAmigo(f);
    return 2 + (n >= 17 ? 3 : n >= 11 ? 2 : n >= 5 ? 1 : 0);
  }
  function valorAtaqueAmigo(f, a, x) {
    return valorPericiaAmigo(f, a, x.pericia) + (x.extra || 0) +
      (temTruque(a, 'amigo-feroz') ? 2 : 0) + marcialAmigo(f, a);
  }
  // O dano é o dado da arma + a Força (corpo a corpo) + Treinamento
  // Marcial. Aqui a ficha soma sozinha, ao contrário dos ataques do
  // personagem: a arma é a do livro e a Força é a do bicho, que ninguém
  // lembra de corrigir quando o Condicionamento Especial a sobe.
  function danoAmigo(f, a, x) {
    const dado = String(x.dano || '').trim();
    if (!dado) return '';
    const b = (x.pericia === 'luta' ? (a.atributos.for || 0) : 0) + marcialAmigo(f, a);
    return b ? dado + (b > 0 ? '+' : '-') + Math.abs(b) : dado;
  }

  // RD: a do Treino Intensivo (5; 10 no 11º nível; 15 no 17º) e a do
  // truque Redução de Dano. São habilidades diferentes, e "efeitos de
  // habilidades e perícias acumulam entre si" (p. 226).
  function rdAmigo(f, a) {
    const nt = nivelTreinador(f), partes = [];
    if (f.treinador.treino === 'intensivo' && nt >= 5) {
      partes.push({ v: nt >= 17 ? 15 : nt >= 11 ? 10 : 5, de: 'Treino Intensivo' });
    }
    if (temTruque(a, 'reducao-de-dano')) partes.push({ v: 5, de: 'truque' });
    return partes;
  }
  function textoRd(f, a) {
    const p = rdAmigo(f, a);
    if (!p.length) return '';
    const total = p.reduce((s, x) => s + x.v, 0);
    return 'RD <strong>' + total + '</strong> <em>(' + p.map(x => x.de + (p.length > 1 ? ' ' + x.v : '')).join(' + ') + ')</em>';
  }
  function deslocAmigo(a) { return (a.deslocamento || 0) + (temTruque(a, 'veloz') ? 3 : 0); }

  // "Ele começa com dois truques a sua escolha e recebe um novo truque a
  // cada três níveis seguintes" (p. 17): 2, 3 no 4º, 4 no 7º… O Treino
  // Intensivo dá mais um, e outro no 11º. O poder Ensinar Truque a ficha
  // não conhece — por isso a conta DIZ, e não trava.
  function truquesDoNivel(f) {
    const n = nivelTreinador(f);
    if (n < 1) return 0;
    let t = 2 + Math.floor((n - 1) / 3);
    if (f.treinador.treino === 'intensivo' && n >= 5) t += n >= 11 ? 2 : 1;
    return t;
  }
  function contaTruques(f, a) {
    const tem = Object.keys(a.truques).reduce((s, k) => s + (a.truques[k] || 0), 0);
    const da = truquesDoNivel(f);
    return '<strong>' + tem + '</strong> marcado' + (tem === 1 ? '' : 's') + ' · o nível dá <strong>' + da + '</strong>' +
      (tem > da ? ' <em>— passou; o poder Ensinar Truque dá mais um por patamar</em>' : '');
  }
  // Amigo Veterano e Amigo Mestre sobem o degrau do parceiro (p. 21).
  function degrauParceiro(a) {
    return temTruque(a, 'amigo-mestre') ? 'mestre' : temTruque(a, 'amigo-veterano') ? 'veterano' : 'iniciante';
  }

  function contaPvAmigo(f, a) {
    const n = nivelDoAmigo(f), con = a.atributos.con || 0;
    let t = 'PV = ' + D.AMIGO.pvBase + sinalCon(con) +
      (n > 1 ? ' + ' + (n - 1) + '×(' + D.AMIGO.pvNivel + sinalCon(con) + ')' : '');
    if (f.treinador.treino === 'intensivo') t += ' + 4×' + n + ' <em>(Treino Intensivo)</em>';
    if (a.pvOutros) t += ' ' + sinal(a.pvOutros);
    return t;
  }
  function contaDefAmigo(f, a) {
    const n = nivelDoAmigo(f);
    const p = ['10', 'Des ' + sinal(a.atributos.des || 0), 'Car do treinador ' + sinal(atr(f, 'car')),
      temTruque(a, 'treinamento-defensivo') ? 'nível ' + n + ' (Treinamento Defensivo)' : 'metade do nível ' + Math.floor(n / 2)];
    if (temTruque(a, 'veloz')) p.push('Veloz 2');
    if (a.defOutros) p.push('outros ' + sinal(a.defOutros));
    return 'Defesa = ' + p.join(' + ').replace(/\+ -/g, '− ');
  }

  // Trocar de tipo tira o pacote do velho e põe o do novo (p. 20–21).
  function trocarTipo(a, de, para) {
    const A = D.tipoAmigo(de), B = D.tipoAmigo(para);
    if (A && A.atr) Object.keys(A.atr).forEach(k => { a.atributos[k] = (a.atributos[k] || 0) - A.atr[k]; });
    if (B && B.atr) Object.keys(B.atr).forEach(k => { a.atributos[k] = (a.atributos[k] || 0) + B.atr[k]; });
  }
  // Os truques de número fixo (Amigão: +1 For e Enorme; Anatomia
  // Humanoide: Int –2 em vez de –4) entram ao ligar e saem ao desligar.
  function pacoteTruque(a, T, estava, fica) {
    if (estava === fica) return;
    const s = fica ? 1 : -1;
    if (T.atr) Object.keys(T.atr).forEach(k => { a.atributos[k] = (a.atributos[k] || 0) + s * T.atr[k]; });
    if (T.tamanho) {
      if (fica) a.tamanho = T.tamanho;
      else if (a.tamanho === T.tamanho) a.tamanho = 'Grande';       // o Amigão pede um amigo Grande
    }
  }

  function blocoAmigos(f) {
    if (nivelTreinador(f) < 1) return '';
    const cfg = f.treinador;
    const opcoes = [
      ['', '— ainda não escolhido —'],
      ['numeros', 'Conquistar pelos Números — um segundo amigo'],
      ['intensivo', 'Treino Intensivo — +4 PV por nível, RD e um truque'],
    ].map(([v, r]) => `<option value="${v}" ${cfg.treino === v ? 'selected' : ''}>${esc(r)}</option>`).join('');
    const cabem = cfg.treino === 'numeros' ? 2 : 1;
    return `
      <div class="fi-cartao fi-amigos">
        <h2 class="fi-cartao-tit">🐾 Melhor amigo
          <span class="fi-cartao-nota">o parceiro do treinador, com ficha completa — Heróis de Arton, p. 20</span>
        </h2>
        <div class="fi-am-opcoes">
          <label class="fi-campo fi-campo--largo"><span class="fi-rot">Treino especializado (5º nível)</span>
            <select class="fi-sel" data-campo="treinador.treino" title="Heróis de Arton, p. 19">${opcoes}</select></label>
          <button type="button" class="fi-am-chave ${cfg.ecletico ? 'fi-am-chave--on' : ''}" data-acao="am-ecletico"
                  aria-pressed="${cfg.ecletico}"
                  title="Poder Treinador Eclético (p. 19): os amigos usam o nível de personagem, em vez do de treinador, para PV, perícias e Defesa">
            ${cfg.ecletico ? '✓' : '＋'} Treinador Eclético</button>
          <span class="fi-am-nivel" title="Para o amigo vale o nível de treinador (p. 20) — ou o de personagem, com Treinador Eclético">
            nível do amigo <strong data-der="am:nivel">${nivelDoAmigo(f)}</strong></span>
        </div>
        ${f.amigos.map((a, i) => cartaoAmigo(f, a, i)).join('') ||
          `<p class="fi-am-vazio">O melhor amigo ainda não está na ficha. O botão abaixo o cria com as regras da
            p. 20: For 1, Des 1, Con 1, Int –4, Sab 1, Car 0, 16 PV e uma arma natural de 1d8.</p>`}
        ${f.amigos.length < cabem ? `<button type="button" class="fi-add" data-acao="am-criar">${
          f.amigos.length ? '＋ O segundo melhor amigo (Conquistar pelos Números)' : '🐾 Criar o melhor amigo'}</button>` : ''}
        <datalist id="fiArmasNaturais">${(D.ARMAS_NATURAIS || []).map(w =>
          `<option value="${esc(w.nome)}">${esc(w.tipo)}</option>`).join('')}</datalist>
      </div>`;
  }
  // A arma da Tabela 2-1 com este nome, se for uma delas — sem ligar para
  // maiúscula nem acento ("mordida", "pinca").
  function armaNatural(nome) {
    const k = semAcento(String(nome || '').trim());
    return (D.ARMAS_NATURAIS || []).find(w => semAcento(w.nome) === k) || null;
  }
  // Escolher uma arma da tabela preenche o tipo de dano dela — a não ser
  // que o jogador tenha escrito outra coisa ali ("perfuração e veneno"):
  // só troca o que está vazio ou é um dos três tipos do livro.
  const TIPOS_DA_TABELA = ['corte', 'impacto', 'perfuracao'];     // sem acento, para comparar
  function tipoDaArma(x) {
    const w = armaNatural(x.nome);
    if (!w || w.tipo === x.tipo) return false;
    if (x.tipo && TIPOS_DA_TABELA.indexOf(semAcento(x.tipo).trim()) < 0) return false;
    x.tipo = w.tipo;
    return true;
  }

  function cartaoAmigo(f, a, i) {
    const T = D.tipoAmigo(a.tipo), P = D.parceiro(a.parceiro);
    const opts = (itens, atual, rot) => '<option value="">' + rot + '</option>' + itens.map(x =>
      `<option value="${x.chave}" ${x.chave === atual ? 'selected' : ''}>${esc(x.nome)}</option>`).join('');
    const opsTam = D.AMIGO.tamanhos.map(t =>
      `<option value="${esc(t)}" ${t === a.tamanho ? 'selected' : ''}>${esc(t)}</option>`).join('');
    const degrau = degrauParceiro(a);
    const max = pvAmigoMax(f, a), atual = pvAmigoAtual(f, a);
    const estado = textoEstado(f, a);
    const dir = !!direcionar[a.id];
    const aberto = !!truquesAbertos[a.id];
    const truques = D.TRUQUES.filter(t => aberto || temTruque(a, t.chave));

    return `
      <div class="fi-am">
        <div class="fi-am-cab">
          <label class="fi-campo fi-campo--largo"><span class="fi-rot">Nome</span>
            <input class="fi-txt fi-txt--nome" type="text" value="${esc(a.nome)}" data-campo="amigos.${i}.nome"
                   placeholder="o nome do bicho" autocomplete="off"></label>
          <label class="fi-campo"><span class="fi-rot">Espécie</span>
            <input class="fi-txt" type="text" value="${esc(a.especie)}" data-campo="amigos.${i}.especie"
                   placeholder="lobo, golem, espírito…" autocomplete="off"></label>
        </div>
        <div class="fi-am-cab">
          <label class="fi-campo fi-campo--curto"><span class="fi-rot">Tipo</span>
            <select class="fi-sel" data-campo="amigos.${i}.tipo" title="Heróis de Arton, p. 20–21">${opts(D.TIPOS_AMIGO, a.tipo, '— tipo —')}</select></label>
          <label class="fi-campo fi-campo--curto"><span class="fi-rot">Tamanho</span>
            <select class="fi-sel" data-campo="amigos.${i}.tamanho">${opsTam}</select></label>
          <label class="fi-campo fi-campo--largo"><span class="fi-rot">Tipo de parceiro</span>
            <select class="fi-sel" data-campo="amigos.${i}.parceiro" title="Tormenta20, p. 260–262">${opts(D.PARCEIROS, a.parceiro, '— o que ele faz por você —')}</select></label>
        </div>
        ${T ? `<p class="fi-am-linha"><strong>${esc(T.nome)}.</strong> ${esc(T.texto)}
          <em>${T.treina ? 'Os atributos do tipo já estão somados e as duas perícias já vêm treinadas.' : 'Os atributos do tipo já estão somados.'}</em></p>` : ''}
        ${P ? `<p class="fi-am-linha fi-am-linha--parc"><strong>🤝 ${esc(P.nome)} ${degrau}:</strong> ${esc(P[degrau])}
          ${P.nota ? esc(P.nota) + ' ' : ''}<em>Só vale com ele em alcance curto de você.</em></p>` : ''}

        <div class="fi-am-grade">
          <div class="fi-am-sub">
            <h3 class="fi-am-tit">Atributos</h3>
            <div class="fi-atr-grade">${D.ATRIBUTOS.map(x => `
              <label class="fi-atr">
                <span class="fi-atr-nome">${esc(x.curto)}</span>
                <input class="fi-atr-val" type="number" value="${a.atributos[x.chave]}"
                       data-campo="amigos.${i}.atributos.${x.chave}" title="${esc(x.nome)} — o tipo já está somado">
              </label>`).join('')}</div>
          </div>
          <div class="fi-am-sub">
            <h3 class="fi-am-tit">Vida &amp; Defesa</h3>
            <div class="fi-medidor">
              <span class="fi-medidor-rot">PV</span>
              <button type="button" class="fi-passo" data-acao="am-pv-menos" data-i="${i}" title="−1 PV">−</button>
              <input class="fi-medidor-val" type="number" value="${atual}" data-campo="amigosPv.${esc(a.id)}"
                     title="PV atual — em branco, volta a cheio">
              <span class="fi-medidor-max">/ <strong data-der="am:${i}:pvmax">${max}</strong></span>
              <button type="button" class="fi-passo" data-acao="am-pv-mais" data-i="${i}" title="+1 PV">+</button>
            </div>
            <div class="fi-barra-pv">
              <span class="fi-barra-parte" data-der="am:${i}:pvbarra" style="width:${porcento(Math.max(0, atual), max)}%"></span>
            </div>
            <p class="fi-am-estado" data-der="am:${i}:estado" ${estado ? '' : 'hidden'}>${estado}</p>
            <div class="fi-grande">
              <span class="fi-grande-rot">Defesa</span>
              <strong class="fi-grande-val" data-der="am:${i}:def">${defesaAmigo(f, a)}</strong>
              <span class="fi-am-rd" data-der="am:${i}:rd">${textoRd(f, a)}</span>
            </div>
            <div class="fi-linha"><span>Deslocamento</span>
              <span><strong data-der="am:${i}:desloc">${deslocAmigo(a)}</strong> m
                (<strong data-der="am:${i}:quad">${quadrados(deslocAmigo(a))}</strong> quadrados)</span></div>
            <div class="fi-extras">
              <label class="fi-extra"><span>＋ PV máximo</span>
                <input class="fi-num" type="number" value="${a.pvOutros}" data-campo="amigos.${i}.pvOutros"></label>
              <label class="fi-extra"><span>Defesa: outros</span>
                <input class="fi-num" type="number" value="${a.defOutros}" data-campo="amigos.${i}.defOutros"
                       title="Os itens que ele veste (até dois) e o que mais somar"></label>
              <label class="fi-extra"><span>Desloc. base (m)</span>
                <input class="fi-num" type="number" min="0" step="1.5" value="${a.deslocamento}" data-campo="amigos.${i}.deslocamento"
                       title="12m pelo livro; a montaria usa o que ela fornece. O Veloz soma +3m sozinho."></label>
            </div>
            <p class="fi-conta" data-der="am:${i}:pvconta">${contaPvAmigo(f, a)}</p>
            <p class="fi-conta" data-der="am:${i}:defconta">${contaDefAmigo(f, a)}</p>
          </div>
        </div>

        <div class="fi-am-bloco">
          <h3 class="fi-am-tit">Perícias
            <span class="fi-cartao-nota">${escolhidasAmigo(a)} de ${D.AMIGO.escolhe} escolhidas${T && T.treina ? ', fora as do tipo' : ''}</span></h3>
          <button type="button" class="fi-am-dir ${dir ? 'fi-am-dir--on' : ''}" data-acao="am-direcionar" data-i="${i}"
                  aria-pressed="${dir}"
                  title="Direcionar (p. 17): com ele em alcance curto, gaste 2 PM para somar o seu Carisma no teste de perícia dele — e o ataque é teste de perícia">
            📣 ${dir ? 'Direcionando — o próximo teste soma Car' : 'Direcionar o próximo teste: 2 PM, Car'}
            <strong data-der="am:car">${sinal(atr(f, 'car'))}</strong></button>
          <ul class="fi-per-lista fi-per-lista--am">${D.AMIGO.pericias.map(k => linhaPericiaAmigo(f, a, i, k)).join('')}</ul>
        </div>

        <div class="fi-am-bloco">
          <h3 class="fi-am-tit">Ataques
            <span class="fi-cartao-nota">escreva só o dado da arma — a Força${marcialAmigo(f, a) ? ' e o Treinamento Marcial entram' : ' entra'} sozinha${marcialAmigo(f, a) ? 's' : ''}</span></h3>
          <div class="fi-atq-cab fi-atq--am">
            <span>Arma</span><span>Perícia</span><span>Extra</span><span>Ataque</span>
            <span>Dado</span><span></span><span>Crítico</span><span></span><span>Tipo</span><span></span>
          </div>
          <ul class="fi-atq-lista">${a.ataques.map((x, j) => linhaAtaqueAmigo(f, a, i, x, j)).join('') ||
            '<li class="fi-atq-vazio">Nenhuma arma natural.</li>'}</ul>
          <button type="button" class="fi-add fi-add--menor" data-acao="am-add-atq" data-i="${i}">＋ Arma natural</button>
          ${notaAtaquesAmigo(a)}
        </div>

        <div class="fi-am-bloco">
          <h3 class="fi-am-tit">Truques
            <span class="fi-cartao-nota" data-der="am:${i}:truq">${contaTruques(f, a)}</span>
            <button type="button" class="fi-mini fi-am-ver" data-acao="am-ver-truques" data-i="${i}">
              ${aberto ? '▴ só os marcados' : '▾ ver os ' + D.TRUQUES.length}</button></h3>
          ${truques.length ? `<ul class="fi-apr-lista">${truques.map(t => linhaTruque(a, i, t)).join('')}</ul>`
            : '<p class="fi-am-vazio">Nenhum truque marcado ainda — o ▾ mostra os 22 do livro, com o texto de cada um.</p>'}
        </div>

        <div class="fi-am-bloco">
          <h3 class="fi-am-tit">Anotações
            <span class="fi-cartao-nota">o que ele veste (até dois itens), como ele é, de onde veio…</span></h3>
          ${caixaRicaCampo('amigos.' + i + '.notas', a.notas, 'Itens vestidos, manias, a história de vocês dois…')}
        </div>
        <div class="fi-am-rodape">
          <button type="button" class="fi-remover" data-acao="am-tirar" data-i="${i}">✕ Tirar ${esc(nomeAmigo(a))} da ficha</button>
        </div>
      </div>`;
  }

  function linhaPericiaAmigo(f, a, i, k) {
    const P = D.pericia(k), t = treinoAmigo(a, k), v = valorPericiaAmigo(f, a, k);
    const selo = t.doTipo ? 'do tipo' : (t.doVeloz ? (t.escolhida ? 'Veloz +2' : 'Veloz') : '');
    return `
      <li class="fi-per ${t.treinada ? 'fi-per--treinada' : ''}">
        ${t.doTipo
          ? `<span class="fi-per-check fi-per-check--auto" aria-pressed="true" title="Treinada pelo tipo — vem de graça">✓</span>`
          : botaoTreinar(t.escolhida, 'data-acao="am-treinar" data-i="' + i + '" data-p="' + k + '"')}
        <button type="button" class="fi-per-rolar" data-acao="am-rolar-per" data-i="${i}" data-p="${k}"
                title="Rolar 1d20 ${sinal(v)} de ${esc(P.nome)}">
          <span class="fi-per-nome">${esc(P.nome)}</span>
          <span class="fi-per-atr">${esc(atrCurto(P.atr))}</span>
          <span class="fi-per-val" data-der="am:${i}:per:${k}">${sinal(v)}</span>
          <span class="fi-per-dado" aria-hidden="true">🎲</span>
        </button>
        <input class="fi-num fi-num--mini" type="number" value="${a.pericias[k].outros}"
               data-campo="amigos.${i}.pericias.${k}.outros" title="Outros bônus nesta perícia">
        <span class="fi-per-marcas">${selo ? '<span class="fi-selo">' + selo + '</span>' : ''}${
          P.resist ? '<span class="fi-selo fi-selo--res" title="Teste de resistência">resistência</span>' : ''}${
          P.ataque ? '<span class="fi-selo fi-selo--atq" title="Teste de ataque ' + esc(P.ataque) + '">ataque</span>' : ''}</span>
        <span class="fi-res" data-res="am:${i}:per:${k}" hidden></span>
      </li>`;
  }

  function linhaAtaqueAmigo(f, a, i, x, j) {
    const v = valorAtaqueAmigo(f, a, x), dano = danoAmigo(f, a, x);
    return `
      <li class="fi-atq fi-atq--am">
        <input class="fi-txt fi-txt--atq" type="text" value="${esc(x.nome)}" data-campo="amigos.${i}.ataques.${j}.nome"
               list="fiArmasNaturais" placeholder="mordida, garra…" autocomplete="off"
               title="As 12 armas naturais de Ameaças de Arton (p. 374) aparecem como sugestão — escolher uma preenche o tipo de dano">
        <select class="fi-sel fi-sel--mini" data-campo="amigos.${i}.ataques.${j}.pericia" title="Com qual perícia ele ataca">
          <option value="luta" ${x.pericia === 'luta' ? 'selected' : ''}>Luta</option>
          <option value="pontaria" ${x.pericia === 'pontaria' ? 'selected' : ''}>Pontaria</option>
        </select>
        <input class="fi-num fi-num--mini" type="number" value="${x.extra}" data-campo="amigos.${i}.ataques.${j}.extra"
               title="Bônus extra deste ataque">
        <button type="button" class="fi-atq-val" data-acao="am-rolar-atq" data-i="${i}" data-j="${j}"
                title="Rolar o ataque"><span data-der="am:${i}:atq:${j}">${sinal(v)}</span> 🎲</button>
        <input class="fi-txt fi-txt--mini" type="text" value="${esc(x.dano)}" data-campo="amigos.${i}.ataques.${j}.dano"
               placeholder="1d8" autocomplete="off" title="Só o dado da arma — a Força entra sozinha">
        <button type="button" class="fi-atq-dano" data-acao="am-rolar-dano" data-i="${i}" data-j="${j}"
                title="Rolar o dano">🎲 <span data-der="am:${i}:dano:${j}">${esc(dano || 'dano')}</span></button>
        <input class="fi-txt fi-txt--mini" type="text" value="${esc(x.critico)}" data-campo="amigos.${i}.ataques.${j}.critico"
               placeholder="×2" autocomplete="off">
        <button type="button" class="fi-atq-crit" data-acao="am-rolar-crit" data-i="${i}" data-j="${j}"
                title="Rolar o dano CRÍTICO — só os dados multiplicam (Tormenta20, p. 142)">💥 ×<span data-der="am:${i}:mult:${j}">${multiplicadorCritico(x.critico)}</span></button>
        <input class="fi-txt fi-txt--mini" type="text" value="${esc(x.tipo)}" data-campo="amigos.${i}.ataques.${j}.tipo"
               placeholder="corte, impacto…" autocomplete="off">
        <button type="button" class="fi-mini fi-mini--x" data-acao="am-tira-atq" data-i="${i}" data-j="${j}"
                title="Tirar esta arma">✕</button>
        <span class="fi-res fi-res--atq" data-res="am:${i}:atq:${j}" hidden></span>
        <span class="fi-res fi-res--atq" data-res="am:${i}:dano:${j}" hidden></span>
        <span class="fi-res fi-res--atq fi-res--crit" data-res="am:${i}:crit:${j}" hidden></span>
      </li>`;
  }
  // O que a ficha NÃO mexe sozinha na arma, e por quê: a margem de
  // ameaça e o passo de dano dependem de qual arma é, e o livro deixa
  // escolher entre várias (Ameaças de Arton, p. 374).
  function notaAtaquesAmigo(a) {
    const p = [];
    if (a.tipo === 'animal') p.push('o <strong>animal</strong> tem +1 na margem de ameaça (escreva <code>19/×2</code> no crítico)');
    if (a.tipo === 'monstro') p.push('o <strong>monstro</strong> tem uma segunda arma natural — o ＋ acrescenta');
    if (temTruque(a, 'amigo-feroz')) p.push('o <strong>Amigo Feroz</strong> já soma +2 no ataque; a margem +2 e o passo de dano são com você');
    if (temTruque(a, 'amigao')) p.push('o <strong>Amigão</strong> sobe o dano um passo (1d8 vira 1d10)');
    return '<p class="fi-nota">O nome sugere as 12 armas naturais da Tabela 2-1 de Ameaças de Arton (p. 374), e ' +
      'escolher uma preenche o tipo de dano. O dano segue <code>1d8</code> ×2, que é a regra do amigo (p. 20) — o ' +
      '1d6 daquela tabela vale para as ameaças.' + (p.length ? ' Na arma: ' + p.join('; ') + '.' : '') + '</p>';
  }

  function linhaTruque(a, i, T) {
    const n = a.truques[T.chave] || 0;
    const ctrl = T.vezes
      ? `<span class="fi-apr-ctrl">
           <button type="button" class="fi-apr-btn fi-apr-btn--menos" data-acao="am-truque-menos" data-i="${i}" data-t="${T.chave}"
                   ${n ? '' : 'disabled'} title="Uma vez a menos">−</button>
           <span class="fi-apr-vezes">×${n}</span>
           <button type="button" class="fi-apr-btn" data-acao="am-truque" data-i="${i}" data-t="${T.chave}"
                   title="Mais uma vez — o livro deixa tomar de novo">＋</button>
         </span>`
      : `<button type="button" class="fi-apr-btn" data-acao="am-truque" data-i="${i}" data-t="${T.chave}"
                 aria-pressed="${!!n}" title="${n ? 'Desmarcar' : 'Marcar este truque'}">
           <span class="fi-apr-sinal">${n ? '✓' : '＋'}</span></button>`;
    return `
      <li class="fi-apr ${n ? 'fi-apr--on' : ''}">
        ${ctrl}
        <span class="fi-apr-txt"><strong>${esc(T.nome)}.</strong> ${esc(T.texto)}
          ${T.req ? '<span class="fi-apr-marca fi-apr-marca--req">requer ' + esc(T.req) + '</span>' : ''}</span>
      </li>`;
  }

  // ── MAGIAS ───────────────────────────────────────────────────────
  //  A lista é montada a partir da MESMA base das Consultas
  //  (window.GA_MAGIAS, as 254 do livro): "＋ Adicionar magia" abre a
  //  busca e o que entra já vem com círculo, PM, execução, alcance,
  //  alvo, duração e resistência preenchidos — ninguém copia à mão.
  function blocoMagias(f) {
    const temBase = Array.isArray(window.GA_MAGIAS) && window.GA_MAGIAS.length;
    // agrupadas por círculo, como o livro lista e como se procura na mesa
    const porCirculo = {};
    f.magias.forEach((m, i) => {
      const c = m.circulo || 0;
      (porCirculo[c] || (porCirculo[c] = [])).push({ m: m, i: i });
    });

    const grupos = Object.keys(porCirculo).sort((a, b) => a - b).map(c => `
      <div class="fi-mag-grupo">
        <h3 class="fi-mag-circulo-tit">
          <span class="fi-mag-circ">${c === '0' ? '—' : c + 'º'}</span>
          ${c === '0' ? 'sem círculo' : 'círculo'}
          <em>${porCirculo[c].length} magia${porCirculo[c].length > 1 ? 's' : ''}</em>
        </h3>
        <ul class="fi-mag-lista">${porCirculo[c].map(({ m, i }) => cartaoMagia(f, m, i)).join('')}</ul>
      </div>`).join('');

    return `
      <div class="fi-cartao fi-bloco fi-magias">
        <h2 class="fi-cartao-tit">✨ Magias
          <span class="fi-cartao-nota">${f.magias.length} na ficha · a CD delas é a sua:
            <strong data-der="cd2">${cdBase(f)}</strong></span>
          <button type="button" class="fi-add fi-add--menor fi-mag-add" data-acao="add-magia" ${temBase ? '' : 'disabled'}>
            ＋ Adicionar magia</button>
        </h2>
        ${grupos || '<p class="fi-mag-vazia">Nenhuma magia ainda. O <strong>＋ Adicionar magia</strong> abre a busca nas ' +
          (temBase ? window.GA_MAGIAS.length : 254) + ' magias do livro — as mesmas da aba 📚 Consultas.</p>'}
        <p class="fi-nota">Clique no <strong>nome da magia</strong> para abrir o texto inteiro, com o truque.
          Os <strong>＋ aprimoramentos</strong> ligam e desligam: o total em PM se acerta sozinho, e fica
          guardado para a próxima vez. O <strong>🔥</strong> gasta esse total — <em>dos temporários
          primeiro</em>, como manda a p. 105.</p>
        ${caixaRica(f, BLOCOS_EMBUTIDOS[0])}
      </div>`;
  }

  // O cartão de uma magia na ficha. O nome inteiro é botão: clicou,
  // abre o texto completo — era o que faltava para não precisar ir às
  // Consultas com a ficha aberta do lado.
  // ── OS APRIMORAMENTOS, COM BOTÃO ─────────────────────────────────
  //  "em vez de o jogador ficar fazendo cálculo, apertar o botão de
  //  adicionar ou remover o Aprimorado e saber quantos PM gasta e
  //  quanto aumenta o benefício" — pedido dele em 10/09/2026.
  //
  //  A lista vem da base das Consultas (window.GA_MAGIAS), onde cada
  //  aprimoramento já é dado de verdade: `{ pm, condicao, texto,
  //  requer, itens }`. A ficha guarda só QUAIS estão ligados (`m.apr`),
  //  porque na mesa a combinação se repete toda semana.
  //
  //  Sem a base carregada (ficha exportada, site offline) o cartão
  //  simplesmente não aparece — e o 🔥 volta a ser o PM do círculo.
  function aprimoramentosDe(m) {
    const b = daBase(m.mid);
    return (b && Array.isArray(b.aprimoramentos)) ? b.aprimoramentos : [];
  }

  //  ── APRIMORAMENTOS CUMULATIVOS (Magia, p. 171) ─────────────────
  //  O livro dá o teste pronto, e ele é literal:
  //
  //   "Para aprimoramentos que aumentam um valor (o texto começa com a
  //    palavra «aumenta»), você pode gastar aquela quantidade de PM
  //    várias vezes para acumular o aumento. A magia Bola de Fogo causa
  //    6d6 pontos de dano e tem um aprimoramento que aumenta esse dano
  //    em +2d6 por +2 PM. Um arcanista de 11º nível pode gastar até 11
  //    PM ao lançar essa magia, causando 14d6 pontos de dano."
  //
  //  Então: quem começa com "aumenta" ganha ＋ e −, e o resto continua
  //  sendo liga/desliga. São 153 dos 671 aprimoramentos do livro.
  function cumulativo(a) {
    return /^\s*aumenta/i.test((a && a.texto) || '');
  }
  //  O quanto o aumento vira, vezes N. Pega o PRIMEIRO "+XdY" ou "+X"
  //  do texto — que é onde o livro põe o valor — e multiplica só ele.
  //  Sem número reconhecível ("aumenta o dano da arma em mais um
  //  passo"), devolve nada e a tela mostra só o ×N.
  function aumentoVezes(a, n) {
    const m = /\+(\d+)(d\d+)?/.exec((a && a.texto) || '');
    if (!m || n < 2) return '';
    return '+' + (parseInt(m[1], 10) * n) + (m[2] || '');
  }
  //  O teto por magia (p. 224): "o máximo de PM que você pode gastar
  //  por uso é igual ao seu nível NA CLASSE que fornece a habilidade".
  //  Com uma classe só — o caso normal — é o nível dela.
  function limitePm(f) {
    const n = f.classes.reduce((s, c) => Math.max(s, c.nivel || 0), 0);
    return Math.max(1, n || nivel(f));
  }
  function quantos(m, k) {
    return (m.apr || []).filter(x => x === k).length;
  }
  function pmDaMagia(m) {
    const lista = aprimoramentosDe(m);
    const extra = (m.apr || []).reduce((s, k) => s + ((lista[k] && lista[k].pm) || 0), 0);
    return { base: m.pm || 0, extra: extra, total: (m.pm || 0) + extra };
  }
  function blocoAprimoramentos(f, m, i) {
    const lista = aprimoramentosDe(m);
    if (!lista.length) return '';
    const p = pmDaMagia(m);
    const limite = limitePm(f);
    const linhas = lista.map((a, k) => {
      const n = quantos(m, k);
      const on = n > 0;
      const cum = cumulativo(a);
      const rotPm = a.pm > 0 ? '+' + a.pm + ' PM' : 'sem PM';
      const controles = cum
        ? `${on ? `<button type="button" class="fi-apr-btn fi-apr-btn--menos" data-acao="apr-menos" data-i="${i}" data-k="${k}"
                  title="Uma vez a menos (−${a.pm} PM)">−</button>
             <span class="fi-apr-vezes">×${n}</span>` : ''}
           <button type="button" class="fi-apr-btn" data-acao="apr" data-i="${i}" data-k="${k}"
                  title="Mais uma vez (+${a.pm} PM) — o livro deixa acumular, p. 171">
             <span class="fi-apr-sinal" aria-hidden="true">＋</span>
             <span class="fi-apr-pm">${rotPm}</span></button>`
        : `<button type="button" class="fi-apr-btn" data-acao="apr" data-i="${i}" data-k="${k}"
                  aria-pressed="${on}" title="${on ? 'Tirar este aprimoramento' : 'Somar este aprimoramento'}">
             <span class="fi-apr-sinal" aria-hidden="true">${on ? '−' : '＋'}</span>
             <span class="fi-apr-pm">${rotPm}</span></button>`;
      const soma = cum && n > 1 ? aumentoVezes(a, n) : '';
      return `
        <li class="fi-apr${on ? ' fi-apr--on' : ''}${cum ? ' fi-apr--cum' : ''}">
          <span class="fi-apr-ctrl">${controles}</span>
          <span class="fi-apr-txt">
            ${a.condicao ? `<span class="fi-apr-marca">${esc(a.condicao)}</span>` : ''}
            ${a.requer ? `<span class="fi-apr-marca fi-apr-marca--req">${a.requer}º círculo</span>` : ''}
            ${esc(a.texto)}
            ${soma ? `<strong class="fi-apr-soma">→ ${esc(soma)} ao todo, por ${a.pm * n} PM</strong>` : ''}
            ${on && Array.isArray(a.itens) && a.itens.length
              ? '<span class="fi-apr-itens">' + a.itens.map(t => '<em>' + esc(t) + '</em>').join('') + '</span>'
              : ''}
          </span>
        </li>`;
    }).join('');
    return `
      <div class="fi-apr-caixa">
        <div class="fi-apr-cab">
          <span class="fi-apr-tit">✨ Aprimoramentos</span>
          <span class="fi-apr-conta" data-der="apr:${i}">${contaApr(p, limite)}</span>
          ${p.extra ? `<button type="button" class="fi-mini" data-acao="apr-limpa" data-i="${i}"
                  title="Desligar todos os aprimoramentos desta magia">✦ limpar</button>` : ''}
        </div>
        <ul class="fi-apr-lista">${linhas}</ul>
      </div>`;
  }
  //  O total, e o aviso do teto quando ele estoura. A ficha AVISA e não
  //  impede — o limite depende da classe que deu a magia, e só quem
  //  está com ela na mão sabe qual foi.
  function contaApr(p, limite) {
    const base = p.extra
      ? '<strong>' + p.total + ' PM</strong> <em>(' + p.base + ' da magia + ' + p.extra + ')</em>'
      : '<strong>' + p.base + ' PM</strong> <em>(sem aprimoramento)</em>';
    if (!limite || p.total <= limite) return base;
    return base + ' <em class="fi-apr-teto">⚠ passa do seu limite de ' + limite +
      ' PM por magia (o seu nível na classe que a deu — p. 224)</em>';
  }

  function cartaoMagia(f, m, i) {
    const p = pmDaMagia(m);
    return `
      <li class="fi-mag">
        <button type="button" class="fi-mag-abrir" data-acao="ver-magia" data-i="${i}"
                title="Abrir o texto inteiro de ${esc(m.nome)}">
          <span class="fi-mag-nome">${esc(m.nome)}</span>
          ${m.escola ? `<span class="fi-mag-tag">${esc(m.escola)}</span>` : ''}
          ${m.tipo ? `<span class="fi-mag-tag fi-mag-tag--tipo">${esc(m.tipo)}</span>` : ''}
          <span class="fi-mag-lupa" aria-hidden="true">👁</span>
        </button>
        <span class="fi-mag-acoes">
          ${p.total ? `<button type="button" class="fi-mag-pm-btn${p.extra ? ' fi-mag-pm-btn--apr' : ''}"
                  data-acao="gastar-magia" data-i="${i}"
                  title="Gastar ${p.total} PM${p.extra ? ' (' + p.base + ' da magia + ' + p.extra + ' de aprimoramento)' : ''} — os temporários saem primeiro"
            >🔥 ${p.total} PM</button>` : ''}
          <button type="button" class="fi-mini fi-mini--x" data-acao="tira-magia" data-i="${i}"
                  title="Tirar ${esc(m.nome)} da ficha">✕</button>
        </span>
        <div class="fi-mag-linha">
          ${campoMag('Execução', m.execucao)}${campoMag('Alcance', m.alcance)}
          ${campoMag('Alvo', m.alvo)}${campoMag('Duração', m.duracao)}
          ${campoMag('Resistência', m.resistencia)}
        </div>
        ${m.resumo ? `<p class="fi-mag-resumo">${esc(m.resumo)}</p>` : ''}
        ${blocoAprimoramentos(f, m, i)}
        <input class="fi-txt fi-mag-obs" type="text" value="${esc(m.obs)}" data-campo="magias.${i}.obs"
               placeholder="sua anotação (alvo preferido, quem costuma acompanhar…)" autocomplete="off">
      </li>`;
  }
  function campoMag(rot, v) {
    return v ? `<span class="fi-mag-campo"><em>${esc(rot)}</em> ${esc(v)}</span>` : '';
  }

  // ── INVENTÁRIO ───────────────────────────────────────────────────
  //  A conta de espaços é a da p. 141, e a coluna "cada / no total" é o
  //  que faz a regra do livro E a decisão do mestre caberem na mesma
  //  linha: duas poções de ½ dão 1 espaço (cada), e duas armaduras que
  //  o mestre disse que juntas ocupam 5 dão 5 (no total).
  function blocoInventario(f) {
    const opsEsp = D.ESPACOS.map(e =>
      `<option value="${e.v}">${e.rot} — ${esc(e.ex)}</option>`).join('');

    const linhas = f.inventario.map((it, i) => {
      const total = it.cada ? (it.espacos || 0) * (it.qtd || 0) : (it.espacos || 0);
      return `
        <li class="fi-inv">
          <input class="fi-txt fi-inv-nome" type="text" value="${esc(it.nome)}" data-campo="inventario.${i}.nome"
                 placeholder="espada longa, poção de cura…" autocomplete="off">
          <span class="fi-inv-conta-linha">
          <span class="fi-inv-qtd">
            <button type="button" class="fi-mini" data-acao="inv-menos" data-i="${i}" title="Uma a menos">−</button>
            <input class="fi-num fi-num--mini" type="number" min="0" value="${it.qtd}" data-campo="inventario.${i}.qtd"
                   title="Quantas unidades">
            <button type="button" class="fi-mini" data-acao="inv-mais" data-i="${i}" title="Uma a mais">＋</button>
          </span>
          <span class="fi-inv-esp">
            <input class="fi-num fi-num--mini" type="number" min="0" step="0.5" value="${it.espacos}"
                   data-campo="inventario.${i}.espacos" list="fiEspacos" title="Espaços (½, 1, 2, 5, 10 — p. 141)">
            <button type="button" class="fi-inv-modo ${it.cada ? '' : 'fi-inv-modo--total'}"
                    data-acao="inv-modo" data-i="${i}" aria-pressed="${!it.cada}"
                    title="${it.cada
                      ? 'Agora: cada unidade ocupa esse tanto. Clique para dizer que o monte INTEIRO ocupa isso.'
                      : 'Agora: o monte inteiro ocupa esse tanto, quantas unidades forem. Clique para voltar a contar por unidade.'}"
              >${it.cada ? 'cada' : 'no total'}</button>
          </span>
          <span class="fi-inv-total" data-der="inv:${i}" title="Espaços que esta linha ocupa">${arredonda(total)}</span>
          </span>
          <input class="fi-txt fi-inv-obs" type="text" value="${esc(it.obs)}" data-campo="inventario.${i}.obs"
                 placeholder="onde está, quem emprestou, encanto…" autocomplete="off">
          <span class="fi-inv-fim">
            <button type="button" class="fi-mini ${it.aberto ? 'fi-mini--on' : ''}${it.notas && !it.aberto ? ' fi-mini--tem' : ''}"
                    data-acao="item-texto" data-i="${i}"
                    title="${it.aberto ? 'Fechar o texto deste item' : 'Escrever sobre este item — o que ele faz, o encanto, a habilidade que custa PM'}"
                    aria-pressed="${!!it.aberto}">✎</button>
            <button type="button" class="fi-mini fi-mini--x" data-acao="tira-item" data-i="${i}" title="Tirar do inventário">✕</button>
          </span>
          ${it.aberto ? `
          <div class="ga-rich-wrap ga-rich-wrap--barra fi-inv-texto" data-jog-edita>
            ${window.GA_barraRica ? window.GA_barraRica() : ''}
            <div class="fi-texto ga-rich" contenteditable="true" spellcheck="true"
                 data-campo="inventario.${i}.notas"
                 data-ph="O que este item faz: o encanto, o dano extra, a habilidade que custa PM…"
                 >${it.notas}</div>
          </div>` : ''}
        </li>`;
    }).join('');

    return `
      <div class="fi-cartao fi-bloco fi-inventario">
        <h2 class="fi-cartao-tit">🎒 Inventário
          <span class="fi-cartao-nota">
            <strong data-der="cargausada2">${cargaUsada(f)}</strong> de
            <strong data-der="cargamax2">${cargaMax(f)}</strong> espaços</span>
        </h2>
        <div class="fi-inv-carga">
          <span class="fi-inv-carga-num">
            <strong data-der="cargausada3">${cargaUsada(f)}</strong> de
            <strong data-der="cargamax3">${cargaMax(f)}</strong> espaços
          </span>
          <span class="fi-barra-pv fi-barra-pv--carga">
            <span class="fi-barra-parte" data-der="cargabarra" style="width:${fatiaCarga(f)}%"></span>
          </span>
          <em class="fi-carga-estado" data-der="cargaestado2">${rotuloCarga(f)}</em>
        </div>
        <div class="fi-inv-cab">
          <span>Item</span><span>Quantas</span><span>Espaços</span><span>Ocupa</span><span>Anotação</span><span></span>
        </div>
        <ul class="fi-inv-lista">${linhas || '<li class="fi-atq-vazio">Mochila vazia.</li>'}</ul>
        <datalist id="fiEspacos">${opsEsp}</datalist>
        <button type="button" class="fi-add fi-add--menor" data-acao="add-item">＋ Acrescentar item</button>

        <div class="fi-inv-pe">
          <label class="fi-extra fi-extra--tibar"><span>💰 Tibares (T$)</span>
            <input class="fi-num" type="number" min="0" step="0.1" value="${f.tibares}" data-campo="tibares"
                   title="O dinheiro do personagem"></label>
          <button type="button" class="fi-moeda-chave ${f.moedasPesam ? 'fi-moeda-chave--on' : ''}"
                  data-acao="moedas-pesam" aria-pressed="${!!f.moedasPesam}"
                  title="${f.moedasPesam
                    ? 'Ligado: cada mil moedas ocupam 1 espaço, como o livro manda (p. 141). Clique para a moeda voltar a não pesar.'
                    : 'A moeda não pesa — é a regra que a sua mesa usa. Clique para ligar a do livro: mil moedas = 1 espaço.'}"
            >${f.moedasPesam ? '⚖ a moeda pesa' : '🪶 a moeda não pesa'}</button>
          <span class="fi-inv-conta" data-der="invconta">${contaCarga(f)}</span>
        </div>
        <p class="fi-nota">Um item ocupa <strong>1 espaço</strong> por padrão. Meio espaço para alquímicos,
          poções e pergaminhos; 2 para armas de duas mãos, armaduras leves e escudos pesados; 5 para armaduras
          pesadas e baús; 10 para o que for muito grande. O botão <strong>cada / no total</strong> é para quando
          o mestre disser que o monte inteiro ocupa aquilo — o livro deixa essa decisão com ele.<br>
          O livro também diz que <em>mil moedas ocupam 1 espaço</em>, mas a sua mesa não usa isso: por padrão a
          <strong>moeda não pesa</strong>, e o 🪶 ao lado do T$ liga a regra do livro para quem quiser.</p>
        ${caixaRica(f, BLOCOS_EMBUTIDOS[1])}
      </div>`;
  }

  function contaCarga(f) {
    const it = arredonda(cargaItens(f)), mo = cargaMoedas(f);
    const p = [];
    if (it) p.push(it + ' de itens');
    if (mo) p.push(mo + ' das moedas (' + Math.floor(f.tibares) + ' T$ ÷ ' + D.MOEDAS_POR_ESPACO + ')');
    if (!p.length) return 'Nada carregado ainda.';
    const total = p.join(' + ') + ' = ' + cargaUsada(f) + ' espaços';
    return total + (!f.moedasPesam && f.tibares ? ' · a moeda não está pesando' : '');
  }

  // ── OS BLOCOS DE TEXTO ───────────────────────────────────────────
  function caixaRica(f, b) {
    return caixaRicaCampo('blocos.' + b.campo, f.blocos[b.campo], b.dica);
  }
  // A mesma caixa, para qualquer campo da ficha (as anotações do amigo).
  function caixaRicaCampo(campo, html, dica) {
    const barra = window.GA_barraRica ? window.GA_barraRica() : '';
    return `
      <div class="ga-rich-wrap ga-rich-wrap--barra" data-jog-edita>
        ${barra}
        <div class="fi-texto ga-rich" contenteditable="true" spellcheck="true"
             data-campo="${campo}" data-ph="${esc(dica)}">${html || ''}</div>
      </div>`;
  }
  function blocoTextos(f) {
    return BLOCOS.map(b => `
      <div class="fi-cartao fi-bloco">
        <h2 class="fi-cartao-tit">${b.titulo}</h2>
        ${caixaRica(f, b)}
      </div>`).join('');
  }

  // ═══ SÓ OS NÚMEROS, SEM REDESENHAR ════════════════════════════════
  //  Redesenhar a aba a cada tecla tira o cursor do campo. Então quem
  //  muda de valor é marcado com data-der e reescrito aqui.
  function atualizarDerivados() {
    const f = fichaAberta();
    if (!f || !secao) return;
    const n = nivel(f);
    secao.querySelectorAll('[data-der]').forEach(el => {
      const d = el.dataset.der;
      if (d.slice(0, 3) === 'am:')  { derivadoAmigo(f, el, d); return; }
      if (d.slice(0, 4) === 'per:') { el.textContent = sinal(valorPericia(f, d.slice(4))); return; }
      if (d.slice(0, 4) === 'atq:') { el.textContent = sinal(valorAtaque(f, f.ataques[+d.slice(4)] || {})); return; }
      if (d.slice(0, 3) === 'of:')  { el.textContent = sinal(valorOficio(f, +d.slice(3))); return; }
      if (d.slice(0, 4) === 'inv:') {
        const it = f.inventario[+d.slice(4)];
        if (it) el.textContent = arredonda(it.cada ? (it.espacos || 0) * (it.qtd || 0) : (it.espacos || 0));
        return;
      }
      if (d === 'nivel')     el.textContent = n;
      if (d === 'patamar')   el.textContent = patamar(n);
      if (d === 'treino')    el.textContent = sinal(treino(n, true));
      if (d === 'pvmax')     el.textContent = pvMax(f);
      if (d === 'pmmax')     el.textContent = pmMax(f);
      if (d === 'defesa')    el.textContent = defesa(f);
      if (d === 'cargamax' || d === 'cargamax2' || d === 'cargamax3') el.textContent = cargaMax(f);
      if (d === 'cargausada' || d === 'cargausada2' || d === 'cargausada3') el.textContent = cargaUsada(f);
      if (d === 'cargaestado' || d === 'cargaestado2') el.textContent = rotuloCarga(f);
      if (d === 'cargabarra') {
        el.style.width = fatiaCarga(f) + '%';
        el.parentElement.classList.toggle('fi-barra-pv--cheia', estadoCarga(f) !== 'ok');
      }
      if (d === 'invconta')  el.innerHTML = contaCarga(f);
      if (d === 'cd' || d === 'cd2') el.textContent = cdBase(f);
      if (d === 'desloc')    el.textContent = f.deslocamento;
      if (d === 'quadrados') el.textContent = quadrados(f.deslocamento);
      if (d === 'pvconta')   el.innerHTML = contaPv(f);
      if (d === 'defconta')  el.innerHTML = contaDefesa(f);
      if (d === 'xpconta')   el.innerHTML = contaXp(f);
      if (d === 'xpbarra')   el.innerHTML = barraXp(f);
      if (d === 'danoeco')   { el.innerHTML = ultimoDano; el.hidden = !ultimoDano; }
      // os dois medidores: barra, pedaço temporário e o selo ao lado
      if (d === 'pvbarra')     el.style.width = fatia(pvAtual(f), pvMax(f), f.pv.temp) + '%';
      if (d === 'pmbarra')     el.style.width = fatia(pmAtual(f), pmMax(f), f.pm.temp) + '%';
      if (d === 'pvbarratemp') el.style.width = fatia(f.pv.temp, pvMax(f), f.pv.temp) + '%';
      if (d === 'pmbarratemp') el.style.width = fatia(f.pm.temp, pmMax(f), f.pm.temp) + '%';
      if (d === 'pvselo' || d === 'pmselo') {
        const t = f[d.slice(0, 2)].temp || 0;
        el.hidden = !t;
        const forte = el.querySelector('strong');
        if (forte) forte.textContent = t;
      }
    });
    // os campos de PV/PM atuais também mudam sozinhos (dano, cura, ＋/−)
    ['pv', 'pm'].forEach(q => {
      const campo = secao.querySelector('[data-campo="' + q + '.atual"]');
      if (campo && document.activeElement !== campo) {
        campo.value = q === 'pv' ? pvAtual(f) : pmAtual(f);
      }
      const temp = secao.querySelector('[data-campo="' + q + '.temp"]');
      if (temp && document.activeElement !== temp) temp.value = f[q].temp || 0;
    });
    // e o PV atual de cada melhor amigo (o ± e a subida de nível mexem nele)
    f.amigos.forEach(a => {
      const campo = secao.querySelector('[data-campo="amigosPv.' + a.id + '"]');
      if (campo && document.activeElement !== campo) campo.value = pvAmigoAtual(f, a);
    });
    // o botão de ataque não é [data-der] (é botão), mas o valor dele muda
    secao.querySelectorAll('[data-acao="rolar-ataque"]').forEach(b => {
      const a = f.ataques[+b.dataset.i];
      if (a) b.textContent = sinal(valorAtaque(f, a)) + ' 🎲';
    });
    // e o ×N do crítico segue o que está escrito no campo "19/×3"
    secao.querySelectorAll('[data-acao="rolar-critico"]').forEach(b => {
      const a = f.ataques[+b.dataset.i];
      if (!a) return;
      const mult = multiplicadorCritico(a.critico);
      b.textContent = '💥 ×' + mult;
      b.title = 'Rolar o dano CRÍTICO: ' + expressaoCritica(a.dano || '—', mult) +
                ' (só os dados multiplicam, ×' + mult + ')';
    });
  }

  // Os números do melhor amigo: 'am:0:pvmax', 'am:0:per:luta',
  // 'am:1:atq:0'… — o índice é a posição em f.amigos.
  function derivadoAmigo(f, el, d) {
    if (d === 'am:nivel') { el.textContent = nivelDoAmigo(f); return; }
    if (d === 'am:car')   { el.textContent = sinal(atr(f, 'car')); return; }
    const p = d.split(':'), a = f.amigos[+p[1]];
    if (!a) return;
    const x = a.ataques[+p[3]] || {};
    switch (p[2]) {
      case 'pvmax':    el.textContent = pvAmigoMax(f, a); break;
      case 'pvbarra':  el.style.width = porcento(Math.max(0, pvAmigoAtual(f, a)), pvAmigoMax(f, a)) + '%'; break;
      case 'estado':   el.innerHTML = textoEstado(f, a); el.hidden = !el.innerHTML; break;
      case 'pvconta':  el.innerHTML = contaPvAmigo(f, a); break;
      case 'def':      el.textContent = defesaAmigo(f, a); break;
      case 'defconta': el.innerHTML = contaDefAmigo(f, a); break;
      case 'rd':       el.innerHTML = textoRd(f, a); break;
      case 'desloc':   el.textContent = deslocAmigo(a); break;
      case 'quad':     el.textContent = quadrados(deslocAmigo(a)); break;
      case 'per':      el.textContent = sinal(valorPericiaAmigo(f, a, p[3])); break;
      case 'atq':      el.textContent = sinal(valorAtaqueAmigo(f, a, x)); break;
      case 'dano':     el.textContent = danoAmigo(f, a, x) || 'dano'; break;
      case 'mult':     el.textContent = multiplicadorCritico(x.critico); break;
      case 'truq':     el.innerHTML = contaTruques(f, a); break;
    }
  }

  // ═══ ESCRITAS ═════════════════════════════════════════════════════
  //  'atributos.for', 'pericias.percepcao.outros', 'ataques.0.dano'…
  function gravarCampo(f, caminho, valor) {
    const p = caminho.split('.');
    let alvo = f;
    for (let i = 0; i < p.length - 1; i++) {
      alvo = alvo[p[i]];
      if (!alvo) return;
    }
    alvo[p[p.length - 1]] = valor;
    sujar(f.id, p[0]);      // 'pv', 'pericias', 'inventario'… → sobe só isso
  }

  function aoEntrada(e) {
    const el = e.target;
    if (!el || !el.dataset) return;
    const campo = el.dataset.campo;
    if (!campo) return;
    const f = fichaAberta();
    if (!f) return;

    if (el.classList.contains('ga-rich')) {
      gravarCampo(f, campo, window.GA_limparHtml ? window.GA_limparHtml(el.innerHTML) : el.innerHTML);
      return salvar();
    }
    if (el.type === 'number') {
      const bruto = String(el.value).trim();
      // PV/PM atuais em branco voltam a "cheio" (null); o resto vira 0
      const ehAtual = (campo === 'pv.atual' || campo === 'pm.atual' || campo.indexOf('amigosPv.') === 0);
      const v = bruto === '' ? (ehAtual ? null : 0) : (parseFloat(bruto) || 0);
      gravarCampo(f, campo, v);
      // o amigo cheio é a AUSÊNCIA da chave: o banco apaga null, e a
      // ficha que voltasse dele pareceria outra
      if (v === null && campo.indexOf('amigosPv.') === 0) delete f.amigosPv[campo.slice(9)];
    } else {
      gravarCampo(f, campo, el.value);
    }
    // a arma do amigo escolhida da Tabela 2-1 traz o tipo de dano junto;
    // escreve direto no campo, sem redesenhar (o cursor está no nome)
    const ma = /^amigos\.(\d+)\.ataques\.(\d+)\.nome$/.exec(campo);
    if (ma) {
      const a = f.amigos[+ma[1]], x = a && a.ataques[+ma[2]];
      if (x && tipoDaArma(x)) {
        const t = secao.querySelector('[data-campo="amigos.' + ma[1] + '.ataques.' + ma[2] + '.tipo"]');
        if (t) t.value = x.tipo;
      }
    }
    // o nome do personagem também é o rótulo da aba — esse precisa redesenhar
    if (campo === 'nome') {
      const aba = secao.querySelector('.fi-aba--ativa');
      if (aba) aba.textContent = f.nome || '(sem nome)';
    }
    atualizarDerivados();
    salvar();
  }

  function aoMudar(e) {
    const el = e.target;
    if (!el || !el.dataset || !el.dataset.campo) return;
    const f = fichaAberta();
    if (!f) return;
    if (el.tagName === 'SELECT') {
      const campo = el.dataset.campo;
      // o tipo do amigo traz um pacote de atributos: sai o do velho e
      // entra o do novo, ANTES de gravar o nome do tipo
      const mt = /^amigos\.(\d+)\.tipo$/.exec(campo);
      if (mt && f.amigos[+mt[1]]) trocarTipo(f.amigos[+mt[1]], f.amigos[+mt[1]].tipo, el.value);
      gravarCampo(f, campo, el.value);
      salvar();
      // trocar de classe muda PV, PM e todas as perícias — e o rótulo da
      // conta por extenso; redesenhar é mais honesto que remendar. O
      // mesmo vale para o tipo, o parceiro e o treino do amigo.
      if (campo.indexOf('classes.') === 0 || campo.indexOf('amigos.') === 0 ||
          campo.indexOf('treinador.') === 0) return render();
      atualizarDerivados();
    }
  }

  function aoClicar(e) {
    const btn = e.target.closest('[data-acao]');
    if (!btn) return;
    const acao = btn.dataset.acao;
    const f = fichaAberta();

    if (acao === 'nova') {
      const nova = normalizar({ nome: '' });
      dados.fichas.push(nova);
      abrirFicha(nova.id);
      salvar(); return render();
    }
    if (acao === 'abrir') {
      abrirFicha(btn.dataset.id);
      salvar(); return render();
    }
    if (acao === 'trazer') return trazerDaGaveta(btn.dataset.id);
    if (!f) return;

    if (acao === 'remover') {
      const dono = donoDe(f.id);
      const nome = f.nome || 'sem nome';
      const aviso = dono
        ? 'Tirar da mesa a ficha "' + nome + '", de ' + nomeDoDono(dono, f) + '?\n\n' +
          'Ela some da mesa para todo mundo, inclusive para quem a escreveu. ' +
          'A cópia que essa pessoa tem no navegador dela continua lá.'
        : 'Apagar a ficha de ' + nome + '? Isto não tem volta.';
      if (!confirm(aviso)) return;
      if (window.GA_FichaMesa) window.GA_FichaMesa.apagar(f.id, dono);
      if (dono) {
        if (remotas[dono]) delete remotas[dono][f.id];
      } else {
        dados.fichas = dados.fichas.filter(x => x.id !== f.id);
      }
      delete sujos[f.id];
      dados.aberta = dados.fichas.length ? dados.fichas[0].id : null;
      gravar(); return render();
    }
    if (acao === 'add-classe')  { f.classes.push({ classe: '', nivel: 1 }); salvar(); return render(); }
    if (acao === 'tira-classe') { f.classes.splice(+btn.dataset.i, 1); if (!f.classes.length) f.classes.push({ classe: '', nivel: 1 }); salvar(); return render(); }
    if (acao === 'add-ataque')  { f.ataques.push({ id: novoId(), nome: '', pericia: 'luta', extra: 0, dano: '', critico: '', tipo: '', alcance: '' }); salvar(); return render(); }

    // ── O QUE APARA O DANO ─────────────────────────────────────────
    if (acao === 'add-apara') {
      const c = btn.dataset.campo;
      if (!Array.isArray(f[c])) return;
      f[c].push({ id: novoId(), valor: '', do_: '', obs: '' });
      sujar(f.id, c); salvar(); return render();
    }
    if (acao === 'tira-apara') {
      const c = btn.dataset.campo;
      if (!Array.isArray(f[c])) return;
      f[c].splice(+btn.dataset.i, 1);
      sujar(f.id, c); salvar(); return render();
    }
    if (acao === 'tira-ataque') { f.ataques.splice(+btn.dataset.i, 1); salvar(); return render(); }

    // ── O MELHOR AMIGO ─────────────────────────────────────────────
    if (acao.slice(0, 3) === 'am-') return aoClicarAmigo(f, btn, acao);

    if (acao === 'treinar') {
      const p = btn.dataset.p;
      f.pericias[p].treinada = !f.pericias[p].treinada;
      sujar(f.id, 'pericias');
      salvar(); return render();
    }
    // ── VIDA E MANA ────────────────────────────────────────────────
    //  Tudo passa por gastarPontos/curarPontos: é lá que a regra dos
    //  temporários mora, e é o que impede o engano de tirar do PV
    //  atual enquanto ainda há escudo temporário em pé.
    if (acao === 'pv-menos' || acao === 'pm-menos') {
      aplicarDano(f, acao.slice(0, 2), 1); return;
    }
    if (acao === 'pv-mais' || acao === 'pm-mais') {
      aplicarCura(f, acao.slice(0, 2), 1); return;
    }

    // ── OFÍCIOS ────────────────────────────────────────────────────
    if (acao === 'treinar-oficio') {
      const o = f.oficios[+btn.dataset.i];
      if (o) { o.treinada = !o.treinada; sujar(f.id, 'oficios'); salvar(); render(); }
      return;
    }
    if (acao === 'add-oficio') {
      f.oficios.push({ id: novoId(), esp: '', treinada: false, outros: 0 });
      salvar(); return render();
    }
    if (acao === 'tira-oficio') {
      f.oficios.splice(+btn.dataset.i, 1);
      while (f.oficios.length < 2) f.oficios.push({ id: novoId(), esp: '', treinada: false, outros: 0 });
      salvar(); return render();
    }
    if (acao === 'rolar-oficio') {
      const i = +btn.dataset.i, o = f.oficios[i];
      if (o) rolar(d20(valorOficio(f, i)), quem(f) + ' · ' + nomeOficio(o), 'of:' + i);
      return;
    }

    // ── INVENTÁRIO ─────────────────────────────────────────────────
    if (acao === 'add-item') {
      f.inventario.push({ id: novoId(), nome: '', qtd: 1, espacos: 1, cada: true, obs: '' });
      salvar(); return render();
    }
    if (acao === 'tira-item') { f.inventario.splice(+btn.dataset.i, 1); salvar(); return render(); }
    if (acao === 'inv-menos' || acao === 'inv-mais') {
      const it = f.inventario[+btn.dataset.i];
      if (!it) return;
      it.qtd = Math.max(0, (it.qtd || 0) + (acao === 'inv-mais' ? 1 : -1));
      sujar(f.id, 'inventario');
      const campo = secao.querySelector('[data-campo="inventario.' + btn.dataset.i + '.qtd"]');
      if (campo) campo.value = it.qtd;
      atualizarDerivados(); return salvar();
    }
    if (acao === 'moedas-pesam') {
      f.moedasPesam = !f.moedasPesam;
      sujar(f.id, 'moedasPesam');
      salvar(); return render();
    }
    if (acao === 'inv-modo') {
      const it = f.inventario[+btn.dataset.i];
      if (it) { it.cada = !it.cada; sujar(f.id, 'inventario'); salvar(); render(); }
      return;
    }
    // a caixa grande do item: abre e fecha, e o estado fica guardado —
    // quem escreveu sobre a espada quer achar aquilo aberto amanhã
    if (acao === 'item-texto') {
      const it = f.inventario[+btn.dataset.i];
      if (it) { it.aberto = !it.aberto; sujar(f.id, 'inventario'); salvar(); render(); }
      return;
    }

    // ── MAGIAS ─────────────────────────────────────────────────────
    if (acao === 'add-magia')  return abrirBuscaMagia(f);
    if (acao === 'tira-magia') { f.magias.splice(+btn.dataset.i, 1); salvar(); return render(); }
    if (acao === 'ver-magia')  return verMagia(f.magias[+btn.dataset.i]);
    if (acao === 'gastar-magia') {
      const m = f.magias[+btn.dataset.i];
      if (!m) return;
      const p = pmDaMagia(m);
      // o rótulo diz o que saiu: "Bola de Fogo · com +2 aprimorado"
      if (p.total) aplicarDano(f, 'pm', p.total, m.nome + (p.extra ? ' (aprimorada)' : ''));
      return;
    }
    // ── APRIMORAMENTOS ─────────────────────────────────────────────
    //  O que começa com "aumenta" ACUMULA (p. 171): o ＋ soma mais uma
    //  vez, e a lista `apr` guarda o índice repetido. O resto é
    //  liga/desliga, como sempre foi.
    if (acao === 'apr') {
      const m = f.magias[+btn.dataset.i], k = +btn.dataset.k;
      if (!m) return;
      const a = aprimoramentosDe(m)[k];
      const j = (m.apr || []).indexOf(k);
      if (a && cumulativo(a)) m.apr.push(k);          // mais uma vez
      else if (j >= 0) m.apr.splice(j, 1);
      else m.apr.push(k);
      m.apr.sort((x, y) => x - y);
      sujar(f.id, 'magias');
      salvar(); return render();
    }
    if (acao === 'apr-menos') {
      const m = f.magias[+btn.dataset.i], k = +btn.dataset.k;
      if (!m) return;
      const j = (m.apr || []).indexOf(k);
      if (j >= 0) m.apr.splice(j, 1);
      sujar(f.id, 'magias');
      salvar(); return render();
    }
    if (acao === 'apr-limpa') {
      const m = f.magias[+btn.dataset.i];
      if (!m || !m.apr.length) return;
      m.apr = [];
      sujar(f.id, 'magias');
      salvar(); return render();
    }

    // ── AS ROLAGENS DA FICHA ───────────────────────────────────────
    if (acao === 'rolar-pericia') {
      const p = D.pericia(btn.dataset.p);
      if (p) rolar(d20(valorPericia(f, p.chave)), quem(f) + ' · ' + p.nome, 'per:' + p.chave);
      return;
    }
    if (acao === 'rolar-ataque') {
      const a = f.ataques[+btn.dataset.i];
      if (a) rolar(d20(valorAtaque(f, a)), quem(f) + ' · ' + (a.nome || 'ataque'), 'atq:' + btn.dataset.i);
      return;
    }
    if (acao === 'rolar-dano') {
      const a = f.ataques[+btn.dataset.i];
      if (a && a.dano.trim()) rolar(a.dano.trim(), quem(f) + ' · dano de ' + (a.nome || 'ataque'), 'dano:' + btn.dataset.i);
      return;
    }
    if (acao === 'rolar-critico') {
      const i = +btn.dataset.i, a = f.ataques[i];
      if (!a || !a.dano.trim()) return;
      const mult = multiplicadorCritico(a.critico);
      rolar(expressaoCritica(a.dano.trim(), mult),
            quem(f) + ' · 💥 CRÍTICO ×' + mult + ' de ' + (a.nome || 'ataque'), 'crit:' + i);
      return;
    }
    if (acao === 'limpar-hist') {
      historico = [];
      salvarHistorico(f.id);
      pintarHistorico();
      return;
    }
    // limpar o recibo não devolve nada: o que está na mochila fica lá
    if (acao === 'limpar-compras') {
      f.compras = [];
      sujar(f.id, 'compras');
      salvar(); return render();
    }
  }

  function aoClicarAmigo(f, btn, acao) {
    if (acao === 'am-ecletico') {
      f.treinador.ecletico = !f.treinador.ecletico;
      sujar(f.id, 'treinador'); salvar(); return render();
    }
    if (acao === 'am-criar') {
      f.amigos.push(novoAmigo());
      sujar(f.id, 'amigos'); salvar(); return render();
    }
    const i = +btn.dataset.i, a = f.amigos[i];
    if (!a) return;

    if (acao === 'am-tirar') {
      if (!confirm('Tirar ' + nomeAmigo(a) + ' desta ficha? A ficha dele vai junto, e isto não tem volta.')) return;
      f.amigos.splice(i, 1);
      delete f.amigosPv[a.id];
      sujar(f.id, 'amigos'); sujar(f.id, 'amigosPv');
      salvar(); return render();
    }
    if (acao === 'am-pv-menos' || acao === 'am-pv-mais') {
      const agora = pvAmigoAtual(f, a);
      f.amigosPv[a.id] = acao === 'am-pv-mais' ? Math.min(pvAmigoMax(f, a), agora + 1) : agora - 1;
      sujar(f.id, 'amigosPv');
      atualizarDerivados(); return salvar();
    }
    if (acao === 'am-treinar') {
      const e = a.pericias[btn.dataset.p];
      if (e) { e.treinada = !e.treinada; sujar(f.id, 'amigos'); salvar(); render(); }
      return;
    }
    if (acao === 'am-truque' || acao === 'am-truque-menos') {
      const T = D.truque(btn.dataset.t);
      if (!T) return;
      const antes = a.truques[T.chave] || 0;
      const depois = acao === 'am-truque-menos' ? Math.max(0, antes - 1)
        : (T.vezes ? Math.min(9, antes + 1) : (antes ? 0 : 1));
      pacoteTruque(a, T, antes > 0, depois > 0);
      if (depois) a.truques[T.chave] = depois; else delete a.truques[T.chave];
      sujar(f.id, 'amigos'); salvar(); return render();
    }
    if (acao === 'am-ver-truques') { truquesAbertos[a.id] = !truquesAbertos[a.id]; return render(); }
    if (acao === 'am-direcionar')  { direcionar[a.id] = !direcionar[a.id]; return render(); }
    if (acao === 'am-add-atq') {
      a.ataques.push({ id: novoId(), nome: '', pericia: 'luta', extra: 0,
                       dano: D.AMIGO.arma.dano, critico: D.AMIGO.arma.critico, tipo: '' });
      sujar(f.id, 'amigos'); salvar(); return render();
    }

    const j = +btn.dataset.j, x = a.ataques[j];
    if (acao === 'am-tira-atq') {
      if (x) { a.ataques.splice(j, 1); sujar(f.id, 'amigos'); salvar(); render(); }
      return;
    }
    // ── as rolagens: caem na mesa com o nome do bicho ──
    const rot = quem(f) + ' · ' + nomeAmigo(a);
    if (acao === 'am-rolar-per') {
      const P = D.pericia(btn.dataset.p);
      if (!P) return;
      const d = usarDirecionar(f, a);
      rolar(d20(valorPericiaAmigo(f, a, P.chave) + d.bonus), rot + ' · ' + P.nome + d.rotulo, 'am:' + i + ':per:' + P.chave);
      return d.depois();
    }
    if (!x) return;
    if (acao === 'am-rolar-atq') {
      const d = usarDirecionar(f, a);
      rolar(d20(valorAtaqueAmigo(f, a, x) + d.bonus), rot + ' · ' + (x.nome || 'ataque') + d.rotulo, 'am:' + i + ':atq:' + j);
      return d.depois();
    }
    const dano = danoAmigo(f, a, x);
    if (!dano) return;
    if (acao === 'am-rolar-dano') {
      rolar(dano, rot + ' · dano de ' + (x.nome || 'ataque'), 'am:' + i + ':dano:' + j);
      return;
    }
    if (acao === 'am-rolar-crit') {
      const mult = multiplicadorCritico(x.critico);
      rolar(expressaoCritica(dano, mult), rot + ' · 💥 CRÍTICO ×' + mult + ' de ' + (x.nome || 'ataque'), 'am:' + i + ':crit:' + j);
    }
  }

  // Direcionar (p. 17): "Se o seu melhor amigo estiver em alcance curto e
  // fizer um teste de perícia, você pode gastar 2 PM para somar seu
  // Carisma no teste dele." Fica armado até o próximo teste — e o ataque
  // É teste de perícia (Luta ou Pontaria). Os 2 PM saem do treinador
  // pelo caminho de todo gasto de mana: os temporários primeiro.
  function usarDirecionar(f, a) {
    if (!direcionar[a.id]) return { bonus: 0, rotulo: '', depois: () => {} };
    const car = atr(f, 'car');
    delete direcionar[a.id];
    return {
      bonus: car,
      rotulo: ' (direcionado, Car ' + sinal(car) + ')',
      depois: () => { aplicarDano(f, 'pm', 2, 'Direcionar'); render(); },
    };
  }

  // ═══ O QUE CHEGA DA MESA ══════════════════════════════════════════
  //  Chamado pelo ficha-mesa.js a cada mudança no banco. Duas coisas
  //  chegam por aqui:
  //   • as fichas dos OUTROS (só o mestre e o auxiliar recebem) — vão
  //     para `remotas` e aparecem na barra;
  //   • as MINHAS, quando o mestre mexeu nelas. Essas são aplicadas
  //     por cima da cópia local: é o "o mestre baixou meu PV e eu vi
  //     acontecer" — o motivo de tudo isto existir.
  const CARIMBO = { dono: 1, autor: 1, atualizadoEm: 1 };

  // Comparação estável: o Firebase devolve as chaves em outra ordem, e
  // um JSON.stringify cru acharia diferença onde não há — o que faria a
  // tela se redesenhar a cada eco da própria escrita.
  function canon(v) {
    if (v === null || typeof v !== 'object') return JSON.stringify(v === undefined ? null : v);
    if (Array.isArray(v)) return '[' + v.map(canon).join(',') + ']';
    return '{' + Object.keys(v).filter(k => !CARIMBO[k]).sort()
      .map(k => JSON.stringify(k) + ':' + canon(v[k])).join(',') + '}';
  }
  function igual(a, b) { return canon(a) === canon(b); }

  // Redesenhar por baixo do cursor arranca o foco no meio de uma
  // palavra. Enquanto alguém escreve, o que chegou fica guardado e
  // entra quando ela sair do campo.
  function digitando() {
    const a = document.activeElement;
    return !!(a && secao && secao.contains(a) &&
      (a.tagName === 'INPUT' || a.tagName === 'TEXTAREA' || a.isContentEditable));
  }
  let ouvindoSaida = false, chegouAdiado = false;
  function adiarChegada() {
    chegouAdiado = true;
    if (ouvindoSaida) return;
    ouvindoSaida = true;
    document.addEventListener('focusout', function sair() {
      document.removeEventListener('focusout', sair);
      ouvindoSaida = false;
      setTimeout(() => {
        if (digitando()) return adiarChegada();
        if (chegouAdiado) { chegouAdiado = false; aplicarChegada(); }
      }, 0);
    });
  }

  let ultimoRecebido = null;
  let ultimoDaGaveta = null;
  function receberDaMesa(mapa, uid) {
    meuUid = uid || '';
    ultimoRecebido = mapa || {};
    if (digitando()) return adiarChegada();
    aplicarChegada();
  }
  // A gaveta chega pelo mesmo caminho, e espera a digitação do mesmo jeito.
  function receberDaGaveta(mapa) {
    ultimoDaGaveta = mapa || {};
    if (digitando()) return adiarChegada();
    aplicarChegada();
  }

  function aplicarChegada() {
    const antes = canon(remotas);

    // TODA ficha que chega passa pelo normalizar, não só as minhas. Ela
    // vem do navegador de outra pessoa, que pode estar numa versão mais
    // velha do site (sem `oficios`, sem `inventario`…) — e um cartão
    // que lê `f.defesa.armadura` de um `f.defesa` que não existe derruba
    // o render INTEIRO. Quem paga seria o mestre, no meio do combate,
    // com a tela travada na ficha anterior sem nenhum aviso.
    const mapa = {};
    Object.keys(ultimoRecebido || {}).forEach(uid => {
      const de = ultimoRecebido[uid] || {};
      const para = mapa[uid] = {};
      Object.keys(de).forEach(id => {
        const f = de[id];
        if (!f || typeof f !== 'object') return;
        const n = normalizar(f);
        n.id = id;                       // a chave do banco é a verdade
        n.autor = f.autor || '';         // carimbo do ficha-mesa.js
        para[id] = n;
      });
    });
    remotas = mapa;

    // as minhas, mexidas pelo mestre → entram na cópia local
    const minhas = mapa[meuUid] || {};
    let mudou = false;
    Object.keys(minhas).forEach(id => {
      const vinda = minhas[id];
      if (!vinda || typeof vinda !== 'object') return;
      const i = dados.fichas.findIndex(x => x.id === id);
      if (i < 0) return;                       // ficha que só existe na mesa: não puxo
      if (igual(dados.fichas[i], vinda)) return;   // é o eco da minha própria escrita
      dados.fichas[i] = vinda;                     // já veio normalizada acima
      mudou = true;
      // o mestre baixou o PV pela mesa: a gaveta da conta tem de saber,
      // senão o outro aparelho continua com o número velho
      if (window.GA_FichaMesa && window.GA_FichaMesa.guardarNaConta) {
        window.GA_FichaMesa.guardarNaConta(vinda);
      }
    });

    // ── E O QUE VEM DA GAVETA DA CONTA ─────────────────────────────
    const antesGaveta = canon(gaveta);
    const daConta = {};
    Object.keys(ultimoDaGaveta || {}).forEach(id => {
      const f = ultimoDaGaveta[id];
      if (!f || typeof f !== 'object') return;
      const n = normalizar(f);
      n.id = id;
      n.autor = f.autor || '';
      daConta[id] = n;
    });
    gaveta = daConta;

    //  A ficha que TAMBÉM está na mesa segue a MESA, não a gaveta: é a
    //  mesa que carrega o PV que o mestre acabou de baixar, e a gaveta
    //  pode estar um segundo atrás. Fora da mesa, a gaveta é quem manda
    //  — é ela que sincroniza o celular com o computador.
    Object.keys(gaveta).forEach(id => {
      if (minhas[id]) return;
      const i = dados.fichas.findIndex(x => x.id === id);
      if (i < 0) return;                           // só na gaveta: espera o botão "trazer"
      if (igual(dados.fichas[i], gaveta[id])) return;
      dados.fichas[i] = gaveta[id];
      mudou = true;
    });

    if (mudou) gravar();
    if (mudou || antes !== canon(remotas) || antesGaveta !== canon(gaveta)) { render(); avisar(); }
  }

  // As fichas da conta que ainda não estão neste aparelho.
  function soNaGaveta() {
    return Object.keys(gaveta)
      .filter(id => !dados.fichas.some(f => f.id === id))
      .map(id => gaveta[id]);
  }

  // "⬇ Trazer": a ficha da conta vira ficha deste navegador. Daí em
  // diante ela é local como qualquer outra — e volta a subir a cada
  // mudança, para a conta e para a mesa.
  function trazerDaGaveta(id) {
    const f = gaveta[id];
    if (!f || dados.fichas.some(x => x.id === id)) return;
    dados.fichas.push(normalizar(JSON.parse(JSON.stringify(f))));
    abrirFicha(id);
    salvar(); render();
  }

  function mesaMudou() { render(); }

  // ═══ AS MAGIAS, VINDAS DA BASE DO SITE ════════════════════════════
  //  A ficha não guarda uma segunda cópia das 254 magias: ela busca na
  //  MESMA window.GA_MAGIAS que a aba 📚 Consultas usa, e copia para
  //  dentro da ficha só o que se lê na mesa (círculo, PM, execução,
  //  alcance, alvo, duração, resistência e o resumo). O texto inteiro
  //  fica de fora de propósito — 👁 ver vai buscar na hora, e uma ficha
  //  não precisa carregar o livro junto para ser exportada.
  const semAcento = window.GA_semAcento || (s => String(s || '').toLowerCase());

  function daBase(mid) {
    return (window.GA_MAGIAS || []).find(m => m.id === mid) || null;
  }

  // O texto integral de uma magia: a ficha guarda só os campos que se
  // leem na mesa, e a descrição vem da base na hora de mostrar.
  function corpoDaMagia(mid, resumoGuardado) {
    const b = daBase(mid);
    if (!b) return '<p>' + esc(resumoGuardado || 'Sem texto guardado para esta magia.') + '</p>';
    return (b.descricao || []).map(p => '<p>' + esc(p) + '</p>').join('') +
      (b.truque ? '<p class="fi-mag-truque"><strong>Truque.</strong> ' + esc(b.truque) + '</p>' : '') +
      ((b.aprimoramentos || []).length
        ? '<div class="fi-mag-aprim"><strong>Aprimoramentos</strong>' +
          b.aprimoramentos.map(a => '<p><span class="fi-mag-aprim-pm">+' + a.pm + ' PM</span> ' +
            (a.condicao ? esc(a.condicao) + ' — ' : '') + esc(a.texto) +
            (a.requer ? ' <em>(requer ' + a.requer + 'º círculo)</em>' : '') + '</p>').join('') + '</div>'
        : '');
  }
  // O cabeçalho de estatísticas, igual na busca e na ficha.
  function fichaDaMagia(m) {
    return `
      <p class="fi-mag-ficha">${m.circulo}º círculo · ${esc(m.escola || '')} · ${esc(m.tipo || '')}
        · <strong>${m.pm} PM</strong></p>
      <div class="fi-mag-linha fi-mag-linha--modal">
        ${campoMag('Execução', m.execucao)}${campoMag('Alcance', m.alcance)}
        ${campoMag('Alvo', m.alvo || m.area || m.efeito)}${campoMag('Duração', m.duracao)}
        ${campoMag('Resistência', m.resistencia)}
      </div>`;
  }

  //  A busca tem DOIS passos de propósito: achar e, só depois de ler,
  //  adicionar. Antes um toque na lista já jogava a magia na ficha —
  //  e o dedo escorregando numa lista de 254 nomes é fácil demais.
  function abrirBuscaMagia(f) {
    const base = window.GA_MAGIAS || [];
    if (!base.length || !window.GA_abrirModal) return;

    const overlay = window.GA_abrirModal(`
      <div class="ga-modal-cab" id="fiMagCab">
        <span>✨ Adicionar magia</span>
        <button type="button" class="ga-modal-x" data-ga-fechar aria-label="Fechar">✕</button>
      </div>
      <div id="fiMagCorpo"></div>`);
    const corpo = overlay.querySelector('#fiMagCorpo');

    function telaBusca(termo) {
      corpo.innerHTML = `
        <p class="ga-modal-dica">As ${base.length} magias do livro, as mesmas das Consultas.
          Busque pelo nome, pela escola ou pelo círculo (<code>3º</code>, <code>evocação</code>, <code>arcana</code>…).</p>
        <input type="text" class="fi-busca-mag" id="fiBuscaMag" placeholder="bola de fogo, cura, ilusão…"
               autocomplete="off" aria-label="Buscar magia" value="${esc(termo || '')}">
        <div class="fi-busca-res" id="fiBuscaRes"></div>`;
      const campo = corpo.querySelector('#fiBuscaMag');
      const res   = corpo.querySelector('#fiBuscaRes');

      function listar() {
        const q = semAcento((campo.value || '').trim());
        const achadas = !q ? base.slice(0, 40) : base.filter(m => {
          const alvo = semAcento(m.nome + ' ' + m.escola + ' ' + m.tipo + ' ' + m.circulo + 'º ' + (m.resumo || ''));
          return alvo.indexOf(q) >= 0;
        }).slice(0, 60);
        const jaTem = {};
        f.magias.forEach(m => { jaTem[m.mid] = true; });

        res.innerHTML = achadas.length ? achadas.map(m => `
          <button type="button" class="fi-busca-item ${jaTem[m.id] ? 'fi-busca-item--tem' : ''}" data-mid="${esc(m.id)}">
            <span class="fi-busca-circ">${m.circulo}º</span>
            <span class="fi-busca-nome">${esc(m.nome)}${jaTem[m.id] ? ' <em>já está na ficha</em>' : ''}</span>
            <span class="fi-busca-meta">${esc(m.escola)} · ${esc(m.tipo)} · ${m.pm} PM</span>
            <span class="fi-busca-res-txt">${esc(m.resumo || '')}</span>
          </button>`).join('')
          : '<p class="fi-busca-vazio">Nenhuma magia com isso.</p>';
      }
      campo.addEventListener('input', listar);
      res.addEventListener('click', e => {
        const b = e.target.closest('[data-mid]');
        if (b) telaMagia(b.dataset.mid, campo.value);
      });
      listar();
      campo.focus();
    }

    // segundo passo: leu, e aí decide
    function telaMagia(mid, termo) {
      const m = daBase(mid);
      if (!m) return;
      const jaTem = f.magias.some(x => x.mid === mid);
      corpo.innerHTML = `
        <div class="fi-mag-topo">
          <button type="button" class="fi-mag-voltar" data-voltar>← voltar à busca</button>
          <strong class="fi-mag-titulo">${esc(m.nome)}</strong>
        </div>
        ${fichaDaMagia(m)}
        <div class="fi-mag-texto">${corpoDaMagia(m.id, m.resumo)}</div>
        <div class="ga-modal-acoes">
          <button type="button" class="ga-btn-sec" data-voltar>← Voltar</button>
          <button type="button" class="ga-btn-principal" data-add ${jaTem ? 'disabled' : ''}>
            ${jaTem ? '✓ já está na ficha' : '＋ Adicionar esta magia'}</button>
        </div>`;
      corpo.querySelectorAll('[data-voltar]').forEach(b =>
        b.addEventListener('click', () => telaBusca(termo)));
      const add = corpo.querySelector('[data-add]');
      if (add && !jaTem) add.addEventListener('click', () => {
        f.magias.push({
          id: novoId(), mid: m.id, nome: m.nome, circulo: m.circulo, pm: m.pm,
          tipo: m.tipo || '', escola: m.escola || '', execucao: m.execucao || '',
          alcance: m.alcance || '', alvo: m.alvo || m.area || m.efeito || '',
          duracao: m.duracao || '', resistencia: m.resistencia || '',
          resumo: m.resumo || '', obs: '',
        });
        sujar(f.id, 'magias');
        salvar();
        overlay._fechar();
        render();
      });
    }

    telaBusca('');
  }

  // 👁 ver — o texto integral, buscado na base na hora.
  function verMagia(m) {
    if (!m || !window.GA_abrirModal) return;
    window.GA_abrirModal(`
      <div class="ga-modal-cab">
        <span>${esc(m.nome)}</span>
        <button type="button" class="ga-modal-x" data-ga-fechar aria-label="Fechar">✕</button>
      </div>
      ${fichaDaMagia(m)}
      <div class="fi-mag-texto">${corpoDaMagia(m.mid, m.resumo)}</div>
      ${m.obs ? '<p class="fi-mag-obs-modal"><strong>Sua anotação.</strong> ' + esc(m.obs) + '</p>' : ''}`);
  }

  // ═══ O QUE A FICHA EMPRESTA AO RESTO DO SITE ══════════════════════
  //  Duas portas, as duas de mão única: quem chama sabe da ficha, e a
  //  ficha não sabe de quem chama. A lista de iniciativa PERGUNTA os
  //  números (`visiveis`), e a 🏪 Loja ENTREGA um item comprado
  //  (`receberItem`). Nenhuma das duas traz nada de criatura para cá —
  //  a fronteira de docs/ficha-do-jogador.md continua onde estava.
  const ouvintes = [];
  function escutar(cb) { if (typeof cb === 'function') ouvintes.push(cb); }
  function avisar() {
    ouvintes.forEach(cb => {
      try { cb(); } catch (e) { console.warn('[ficha] ouvinte:', e && e.message); }
    });
  }

  //  Todas as fichas que ESTE navegador enxerga: as minhas (o
  //  localStorage) e as que o banco me deixa ler — para o jogador, as
  //  dele em outro aparelho; para o mestre, as da mesa inteira. Vão com
  //  os números JÁ CALCULADOS: quem recebe não repete conta nenhuma do
  //  livro, e por isso não precisa conhecer o modelo da ficha.
  function visiveis() {
    const saida = [];
    function juntar(f, dono) {
      if (!f || typeof f !== 'object' || !f.pv) return;
      saida.push({
        id: f.id, dono: dono || '',
        nome: f.nome || '', jogador: f.jogador || '',
        nivel: nivel(f),
        des: atr(f, 'des'),              // o modificador de Iniciativa, em T20, é a Destreza
        pv: { atual: pvAtual(f), max: pvMax(f), temp: f.pv.temp || 0 },
        pm: { atual: pmAtual(f), max: pmMax(f), temp: f.pm.temp || 0 },
        defesa: defesa(f),
        atualizadoEm: f.atualizadoEm || 0,
      });
    }
    dados.fichas.forEach(f => juntar(f, meuUid));
    Object.keys(remotas).forEach(uid => {
      if (uid === meuUid) return;                  // as minhas já foram
      const m = remotas[uid] || {};
      Object.keys(m).forEach(id => juntar(m[id], uid));
    });
    return saida;
  }

  //  Abrir uma ficha vindo DE FORA (o painel de iniciativa, clicando no
  //  PV). Troca a aba do site, entra na sub-aba certa e põe a ficha na
  //  tela — senão o clique "funcionava" numa aba que ninguém está vendo.
  function abrirNaTela(id) {
    const minha  = dados.fichas.some(f => f.id === id);
    const daMesa = fichasDaMesa().some(x => x.ficha.id === id);
    if (!minha && !daMesa) return false;
    abrirFicha(id);
    gravar(); render();
    const cont = document.getElementById('ficha-content');
    const sec  = cont ? cont.closest('section') : null;
    if (sec) {
      const link = document.querySelector('.nav-link[data-section="' + sec.id + '"]');
      if (link) link.click();
    }
    // no index a ficha divide a aba 📖 com os PDFs importados
    const sub = document.querySelector('[data-fi-subtabs] [data-fi-tab="ficha"]');
    if (sub) sub.click();
    if (cont && cont.scrollIntoView) cont.scrollIntoView({ block: 'start', behavior: 'smooth' });
    return true;
  }

  //  UM ITEM COMPRADO NA LOJA. Chega só com o que qualquer item tem —
  //  nome, espaços, preço e uma anotação —, e daqui para dentro é a
  //  regra da p. 141 de sempre. Vai para a ficha ABERTA: se o mestre
  //  está com a ficha de um jogador na tela, o item cai na mochila dele
  //  (e a resposta diz de quem é, para ninguém dar espada ao vizinho).
  //
  //  O site não policia: se o dinheiro não cobre, o item vai do mesmo
  //  jeito e o T$ fica como estava — quem resolve é a mesa, não a tela.
  //  Quem clicou no 🎒, quando não é o dono da ficha: é o mestre
  //  comprando para um jogador, e o recibo tem de dizer isso — senão o
  //  jogador vê uma espada que não lembra de ter comprado.
  function quemComprou(f) {
    if (!donoDe(f.id)) return '';                  // a ficha é minha: não há o que explicar
    const e = window.GA_FichaMesa ? window.GA_FichaMesa.estado() : null;
    const u = e && e.usuario;
    return (u && (u.displayName || u.email)) || 'o mestre';
  }

  function receberItem(item) {
    const f = fichaAberta();
    if (!f) return { ok: false, motivo: 'sem-ficha' };
    const nome = String((item && item.nome) || '').trim();
    if (!nome) return { ok: false, motivo: 'sem-nome' };

    const qtd     = Math.max(1, parseInt(item.qtd, 10) || 1);
    const espacos = (typeof item.espacos === 'number' && isFinite(item.espacos)) ? item.espacos : 1;
    const preco   = (typeof item.preco === 'number' && isFinite(item.preco) && item.preco > 0) ? item.preco : null;

    // o mesmo item comprado duas vezes vira "×2", não duas linhas iguais
    const chaveNome = s => String(s || '').trim().toLowerCase();
    const igual = f.inventario.find(it =>
      chaveNome(it.nome) === chaveNome(nome) && it.cada !== false && it.espacos === espacos);
    if (igual) igual.qtd = (igual.qtd || 0) + qtd;
    else f.inventario.push({
      id: novoId(), nome: nome, qtd: qtd, espacos: espacos, cada: true,
      obs: String((item && item.obs) || ''),
    });
    sujar(f.id, 'inventario');

    let pagou = 0, faltou = 0;
    if (preco != null && item.pagar !== false) {
      const custo = arredonda(preco * qtd);
      if ((f.tibares || 0) >= custo) {
        f.tibares = arredonda((f.tibares || 0) - custo);
        pagou = custo;
        sujar(f.id, 'tibares');
      } else {
        faltou = custo;
      }
    }

    // o recibo, no fim da ficha. Vai para dentro da ficha (e sobe para a
    // mesa) de propósito: quem tem de consultar o que comprou é o dono
    // dela, e o mestre compra na tela dele.
    f.compras.unshift({
      quando: Date.now(), nome: nome, qtd: qtd,
      preco: preco == null ? 0 : arredonda(preco * qtd),
      pago: pagou, faltou: faltou,
      por: quemComprou(f),
    });
    f.compras = f.compras.slice(0, COMPRAS_MAX);
    sujar(f.id, 'compras');

    salvar(); render();
    const dono = donoDe(f.id);
    return {
      ok: true, nome: nome, qtd: qtd,
      personagem: f.nome || 'ficha sem nome',
      de: dono ? nomeDoDono(dono, f) : '',
      pagou: pagou, faltou: faltou, tibares: f.tibares || 0,
      carga: cargaUsada(f), limite: cargaMax(f), estadoCarga: estadoCarga(f),
    };
  }

  // ═══ AS SUB-ABAS DA 📖 FICHAS ═════════════════════════════════════
  //  Só o index.html tem duas: a ficha feita aqui e os PDFs importados
  //  (js/fichas.js, que continua dono do #fichas-content sem saber disto).
  //  No jogadores.html a aba é só a ficha, e esta função não acha nada.
  const SUBABA_KEY = 'grifosAlados.fichaSubaba';
  function ligarSubabas() {
    const nav = document.querySelector('[data-fi-subtabs]');
    if (!nav) return;
    let atual = 'ficha';
    try { atual = localStorage.getItem(SUBABA_KEY) || 'ficha'; } catch (e) {}
    function mostrar(qual) {
      try { localStorage.setItem(SUBABA_KEY, qual); } catch (e) {}
      nav.querySelectorAll('[data-fi-tab]').forEach(b =>
        b.classList.toggle('fi-subtab--ativa', b.dataset.fiTab === qual));
      document.querySelectorAll('[data-fi-panel]').forEach(p => {
        p.hidden = p.dataset.fiPanel !== qual;
      });
    }
    nav.addEventListener('click', e => {
      const b = e.target.closest('[data-fi-tab]');
      if (b) mostrar(b.dataset.fiTab);
    });
    mostrar(atual);
  }

  // ═══ INÍCIO ═══════════════════════════════════════════════════════
  function init() {
    ligarSubabas();
    const cont = document.getElementById('ficha-content');
    if (!cont || !D) return;                 // página que não tem a aba
    secao = cont.closest('section') || cont;
    carregar();
    carregarHistorico(dados.aberta);
    render();
    secao.addEventListener('click', aoClicar);
    secao.addEventListener('input', aoEntrada);
    secao.addEventListener('change', aoMudar);
    secao.addEventListener('mousedown', window.GA_richDescMousedown);
    secao.addEventListener('paste', window.GA_richPaste);
    window.addEventListener('beforeunload', salvarAgora);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') salvarAgora();
    });
  }
  // O que o ficha-mesa.js chama. Ele cuida do Firebase; a ficha cuida
  // do modelo e da tela. Nenhum dos dois sabe do outro além disto.
  // As quatro últimas são as portas para o resto do site (a iniciativa
  // e a Loja) — ver "O QUE A FICHA EMPRESTA", mais acima.
  window.GA_Ficha = {
    receberDaMesa: receberDaMesa,      // o banco mudou
    receberDaGaveta: receberDaGaveta,  // a conta mudou (as minhas, de qualquer aparelho)
    mesaMudou: mesaMudou,              // login/papel mudou → redesenhar a barra
    minhasFichas: () => dados.fichas.slice(),
    recarregar: () => { carregar(); render(); },
    visiveis: visiveis,                // as fichas que este navegador enxerga
    aoMudar: escutar,                  // avisa quando qualquer número muda
    receberItem: receberItem,          // um item comprado na 🏪 Loja
    abrirNaTela: abrirNaTela,          // trazer uma ficha para a frente
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
