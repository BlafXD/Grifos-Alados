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
    // a hora da última mudança FEITA NESTE navegador: a conferência a
    // mostra quando precisa perguntar qual versão fica
    const minha = dados.fichas.find(x => x.id === id);
    if (minha) minha.editadoEm = Date.now();
  }

  // ── A CONFERÊNCIA (15/09/2026) ───────────────────────────────────
  //  O caso: a mesma conta aberta em dois navegadores — o site publicado
  //  e o index.html do computador, cada um com o seu localStorage. Ao
  //  entrar, o que tinha a cópia VELHA mandava a ficha inteira por cima
  //  da nova, e o outro navegador, recebendo, trocava a dele pela velha.
  //  Agora cada navegador guarda a impressão digital da versão que
  //  combinou com o banco por último (`sinc`) e, ao entrar, só depois de
  //  o banco responder, compara as três: a daqui, as de lá e a combinada.
  //    • só a daqui mudou   → sobe;
  //    • só a de lá mudou   → desce (é o mestre que baixou o PV);
  //    • as duas mudaram, ou este navegador nunca combinou nada e elas
  //      diferem → a ficha fica RETIDA: nada sobe nem desce até o jogador
  //      escolher, e a que perder fica guardada, com um "↩ voltar".
  //  Ver conferir(), mais abaixo, e o ficha-mesa.js, que a chama.
  const SINC_KEY = 'grifosAlados.fichaSincronia';
  const GUARDADAS_KEY = 'grifosAlados.fichaGuardadas';
  let sinc = lerGuardado(SINC_KEY);           // id → digital da versão combinada com o banco
  let guardadas = lerGuardado(GUARDADAS_KEY); // id → { quando, motivo, ficha } — a que perdeu
  let aguardando = false;   // entrou e o banco ainda não respondeu: nada das minhas entra nem sai
  let retidas = {};         // id → { remota, de, em } — mudou aqui E lá; espera o jogador escolher
  function lerGuardado(chave) {
    try { return JSON.parse(localStorage.getItem(chave) || '{}') || {}; } catch (e) { return {}; }
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
    // Antes da conferência, e na ficha retida, nada meu sobe: o que mudou
    // continua em `sujos` e vai depois (ver A CONFERÊNCIA).
    if (!donoDe(f.id) && (aguardando || retidas[f.id])) return;
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
    // ── DESLOCAMENTO: a base e o que mexe nela (17/09/2026) ────────
    //  `deslocamento` é a BASE, a que a raça dá (9m para quase todo
    //  mundo, p. 95). O que soma ou tira dela vira LINHA: "−3 m armadura
    //  pesada", "+3 m Ímpeto", "+6 m Fúria da Savana". Pedido dele:
    //  "eu me desloco 12 metros mas eu tenho −3m por causa da armadura"
    //  — antes só cabia o número final, e a conta ficava na cabeça.
    //  A linha guarda o valor em METROS; o quadrado é conta, como manda
    //  a política do site (q = m ÷ 1,5).
    if (typeof f.deslocamento !== 'number') f.deslocamento = 9;
    if (!Array.isArray(f.deslocMods)) f.deslocMods = [];
    f.deslocMods = f.deslocMods.map(x => ({
      id: (x && x.id) || novoId(),
      valor: (x && typeof x.valor === 'number') ? x.valor : 0,   // pode ser negativo
      de: String((x && x.de) || ''),                             // "armadura pesada", "Ímpeto"…
    }));
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
    // ── PV MANCHADOS (22/09/2026) ──────────────────────────────────
    //  Há dano que não volta com cura nenhuma até uma condição ser
    //  cumprida. O livro escreve isso com todas as letras na
    //  complicação de idade Gota (Heróis de Arton, p. 290): "você perde
    //  1d6 pontos de vida. Você SÓ PODE RECUPERAR ESSES PV COM
    //  DESCANSO". Antes, esses pontos sumiam na conta — o jogador
    //  curava até o máximo e ninguém lembrava que quatro deles estavam
    //  presos. Agora cada mancha é uma linha, com quantos pontos e o
    //  que os solta, e ela baixa o TETO da cura: curar para ali, e a
    //  parte manchada aparece riscada no fim da barra.
    if (!Array.isArray(f.pv.manchas)) f.pv.manchas = [];
    f.pv.manchas = f.pv.manchas.map(m => ({
      id: (m && m.id) || novoId(),
      pontos: Math.max(0, parseInt((m && m.pontos), 10) || 0),
      motivo: String((m && m.motivo) || ''),     // "descanso", "magia de restauração"…
    }));

    f.defesa = f.defesa || {};
    ['armadura', 'escudo', 'outros', 'penalidade'].forEach(k => {
      if (typeof f.defesa[k] !== 'number') f.defesa[k] = 0;
    });
    // ── O ATRIBUTO DA DEFESA (12/09/2026) ──────────────────────────
    //  Pelo livro a Defesa é 10 + DESTREZA + armadura + escudo (p. 106),
    //  e é com Destreza que toda ficha nasce. Mas há quem troque: um
    //  poder, um item, uma classe que manda usar Sabedoria no lugar.
    //  O jeito antigo era somar a diferença na mão em "outros" — o que
    //  apagava a Destreza da conta por extenso e deixava um número solto
    //  que ninguém sabia explicar dali a uma semana. Agora se DIZ qual
    //  atributo entra, e a conta continua contando a história inteira.
    //  Um só: quem tiver DOIS atributos na Defesa soma o segundo em
    //  "outros", como já fazia.
    //  E pode ser NENHUM (15/09/2026, pedido dele): com armadura pesada
    //  "você não aplica sua Destreza na Defesa" (p. 152), e há poderes,
    //  condições e efeitos que dizem o mesmo.
    f.defesa.atributo = atributoDaDefesa(f.defesa.atributo);
    f.carga = f.carga || {};
    ['usada', 'outros'].forEach(k => { if (typeof f.carga[k] !== 'number') f.carga[k] = 0; });
    if (typeof f.cdAtributo !== 'string') f.cdAtributo = 'int';
    if (typeof f.xp !== 'number') f.xp = 0;
    // ── O CADERNO DO XP (22/09/2026) ───────────────────────────────
    //  "para saber se já coloquei XP ou não": o campo do XP guarda o
    //  total e mais nada, então depois da sessão ninguém lembra se os
    //  400 da noite já entraram. Cada soma feita pelo botão vira uma
    //  linha — quanto, quando, por quê, e em quanto ficou —, e a linha
    //  tem volta (o ↩ desfaz a soma e acerta o total).
    //  Mora DENTRO da ficha, como o recibo da Loja: sobe para a mesa e
    //  acompanha o jogador de aparelho.
    if (!Array.isArray(f.xpLog)) f.xpLog = [];
    f.xpLog = f.xpLog.slice(0, XPLOG_MAX).map(x => ({
      quando: (x && typeof x.quando === 'number') ? x.quando : 0,
      quanto: (x && typeof x.quanto === 'number') ? x.quanto : 0,   // pode ser negativo
      nota:   String((x && x.nota) || ''),
      total:  (x && typeof x.total === 'number') ? x.total : 0,     // o XP logo depois desta linha
    }));

    // ── RESISTÊNCIAS, RD E IMUNIDADES (Tormenta 20, p. 229) ────────
    //  Três coisas diferentes, que a mesa confunde o tempo todo — e por
    //  isso ficam em campos separados, com o nome que o livro usa:
    //   • RESISTÊNCIA a um efeito ("resistência a magia +2"): BÔNUS nos
    //     testes de Fortitude, Reflexos ou Vontade contra aquele efeito.
    //     Entra no TESTE, não tira dano nenhum;
    //   • REDUÇÃO DE DANO ("RD 5"): ignora aquele tanto de TODO dano que
    //     se sofre — corte, fogo, psíquico, o que for. Só vale para um
    //     tipo quando diz qual ("redução de fogo 10"), e "RD 10/mágico"
    //     vale para tudo MENOS o mágico. Dá para ter várias;
    //   • IMUNIDADE: nenhuma consequência direta daquilo.
    //  (Em 10/09/2026 a primeira versão disse que resistência "tirava o
    //  dano daquele tipo" e que a RD era "de dano físico" — as duas
    //  erradas, e ele pegou.)
    //  As três são LISTAS porque um personagem acumula várias — de
    //  raça, de item, de poder — e escrever tudo num campo só vira uma
    //  frase que ninguém lê no meio do combate.
    ['resistencias', 'reducoes', 'imunidades'].forEach(k => {
      if (!Array.isArray(f[k])) f[k] = [];
      f[k] = f[k].map(x => ({
        id: (x && x.id) || novoId(),
        valor: String((x && x.valor) || ''),      // "+2", "5", "" (imunidade não tem número)
        do_: String((x && (x.do_ || x.tipo)) || ''),   // "magia", "fogo", "veneno", "Geral"…
        obs: String((x && x.obs) || ''),          // "só com a armadura", "3×/dia"…
      }));
    });
    if (typeof f.proficiencias !== 'string') f.proficiencias = '';

    // ── CONDIÇÕES ATIVAS (17/09/2026) ──────────────────────────────
    //  "Poder colocar condições (semelhante aos dos monstros)": a mesma
    //  fileira de etiquetas, com o texto do livro na nuvem de mouse.
    //  Guardamos só a CHAVE de cada uma (o slug do nome); o texto vem
    //  de window.GA_CONDICOES — a mesma tabela de regra que a sub-aba
    //  🌀 Condições das Consultas lê, e que não é de criatura nenhuma
    //  (igual às magias e aos poderes, que a ficha já lê de lá).
    //  A ficha MOSTRA a condição; ela não mexe nos números sozinha —
    //  a mesma linha do resto: conta e mostra, não policia.
    if (!Array.isArray(f.condicoes)) f.condicoes = [];
    f.condicoes = f.condicoes.map(c => String(c || '')).filter(Boolean)
      .filter((c, i, todas) => todas.indexOf(c) === i);

    // ── AS CONDIÇÕES QUE NÃO ESTÃO NA LISTA (22/09/2026) ───────────
    //  Duas caixas, pedido dele. A primeira é SUSTENTADA, que não é
    //  condição do capítulo 9 — é duração de habilidade (p. 227) —, mas
    //  é o que mais se esquece na mesa: 1 PM de ação livre no começo de
    //  cada turno seu, ou o efeito cai. Ela vem com o texto do livro e
    //  guarda O QUE está sendo sustentado. A segunda é OUTROS: linha em
    //  branco para o que o mestre inventou na hora.
    if (!Array.isArray(f.condicoesLivres)) f.condicoesLivres = [];
    f.condicoesLivres = f.condicoesLivres.map(c => ({
      id: (c && c.id) || novoId(),
      tipo: (c && c.tipo) === 'sustentada' ? 'sustentada' : 'outros',
      texto: String((c && c.texto) || ''),
      // só na sustentada: é MAGIA? "apenas uma magia sustentada por vez"
      magia: !!(c && c.magia),
    }));

    //  `atr` é a MESMA ideia da Defesa, perícia por perícia: a Tabela
    //  2-1 (p. 115) diz o atributo-chave de cada uma, e é esse que vale
    //  — a não ser que ESTA ficha diga outro. Um poder que manda testar
    //  Misticismo com Sabedoria no lugar de Inteligência muda a linha
    //  inteira, e não só a rolagem de hoje. Vazio quer dizer "o do
    //  livro": a ficha velha chega sem o campo e continua certa.
    f.pericias = f.pericias || {};
    D.PERICIAS.forEach(p => {
      const e = f.pericias[p.chave] || {};
      f.pericias[p.chave] = {
        treinada: e.treinada === true,
        outros: typeof e.outros === 'number' ? e.outros : 0,
        atr: ehAtributo(e.atr) ? e.atr : '',
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
      f.oficios = [{ id: novoId(), esp: '', treinada: !!velho.treinada, outros: velho.outros || 0, atr: '' }];
    }
    f.oficios = f.oficios.map(o => ({
      id: (o && o.id) || novoId(),
      esp: String((o && o.esp) || ''),            // "alquimista", "engenhoqueiro"…
      treinada: (o && o.treinada) === true,
      outros: (o && typeof o.outros === 'number') ? o.outros : 0,
      atr: (o && ehAtributo(o.atr)) ? o.atr : '', // vazio = o do livro (Int)
    }));
    // DOIS ofícios sempre à vista, sem precisar de um ＋ para achar o
    // segundo: ter dois é o caso normal ("um alquimista com um
    // engenhoqueiro"), e uma linha vazia não atrapalha ninguém. O ＋
    // continua ali para o terceiro em diante.
    while (f.oficios.length < 2) {
      f.oficios.push({ id: novoId(), esp: '', treinada: false, outros: 0, atr: '' });
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

    // ── PODERES ────────────────────────────────────────────────────
    //  Vêm de duas bases: window.GA_PODERES (js/poderes-data.js, os 460
    //  de fora de classe) e window.GA_PODERES_CLASSE (js/poderes-classe-
    //  data.js, os 348 DE classe, que entraram em 17/09/2026). Guardamos
    //  o `pid` e uma CÓPIA do que se lê na mesa — igual às magias, para
    //  uma ficha exportada continuar legível sem o site do lado. Poder
    //  escrito à mão (os caseiros) continua com pid vazio.
    if (!Array.isArray(f.poderes)) f.poderes = [];
    f.poderes = f.poderes.map(p => ({
      id: (p && p.id) || novoId(),
      pid: String((p && p.pid) || ''),
      nome: String((p && p.nome) || ''),
      grupo: String((p && p.grupo) || 'livre'),
      // de qual classe é o poder, quando o grupo é 'classe'
      classe: String((p && p.classe) || ''),
      // de qual distinção é o poder, quando o grupo é 'distincao', e se
      // ele é a MARCA dela (a marca não conta no escalonamento — p. 104)
      distincao: String((p && p.distincao) || ''),
      marca: !!(p && p.marca),
      // o selo ✦ do livro: habilidade mágica, alvo de Dissipar Magia
      magica: !!(p && p.magica),
      livro: String((p && p.livro) || ''),
      pagina: (p && typeof p.pagina === 'number') ? p.pagina : 0,
      tags: String((p && p.tags) || ''),
      deus: String((p && p.deus) || ''),
      preReq: String((p && p.preReq) || ''),
      custo: String((p && p.custo) || ''),
      texto: Array.isArray(p && p.texto) ? p.texto.map(t => String(t))
        : ((p && p.texto) ? [String(p.texto)] : []),
      obs: String((p && p.obs) || ''),
      // marcado como "conta como um poder da Tormenta" sem ser um
      contaTormenta: !!(p && p.contaTormenta),
    }));
    // o que conta como poder da Tormenta e não é poder nenhum (os bônus
    // da Deformidade do lefou, p. 24)
    f.tormentaConta = Math.max(0, parseInt((f.tormentaConta || 0), 10) || 0);
    // ── A ORDEM DAS GAVETAS DE PODER (22/09/2026) ──────────────────
    //  Pedido dele: "jogar os poderes de Combate para cima, ou os de
    //  magia". A ordem de fábrica é a dos livros (combate, destino,
    //  magia, concedidos, Tormenta, raça, grupo, classe, escritos à
    //  mão); quem mexe nas setas escreve a dele aqui. É uma lista de
    //  CHAVES DE GAVETA — 'combate', 'magia', 'classe:guerreiro' —, e
    //  o que não estiver nela cai depois, na ordem do livro. Guardar
    //  chave, e não posição, é o que faz um poder novo de um grupo
    //  ainda não visto aparecer sem desarrumar o resto.
    if (!Array.isArray(f.poderesOrdem)) f.poderesOrdem = [];
    f.poderesOrdem = f.poderesOrdem.map(k => String(k || '')).filter(Boolean)
      .filter((k, i, todas) => todas.indexOf(k) === i);

    if (!Array.isArray(f.ataques)) f.ataques = [];
    f.ataques = f.ataques.map(a => ({
      id: (a && a.id) || novoId(),
      nome: String((a && a.nome) || ''),
      pericia: (a && a.pericia === 'pontaria') ? 'pontaria' : 'luta',
      extra: (a && typeof a.extra === 'number') ? a.extra : 0,
      dano: String((a && a.dano) || ''),
      // Passos de dano (Tabela 3-2, p. 143): o dado da arma anda na
      // tabela sozinho, e o que se rola é o dado já andado.
      passos: passosDe(a && a.passos),
      critico: String((a && a.critico) || ''),
      tipo: String((a && a.tipo) || ''),
      alcance: String((a && a.alcance) || ''),
      // A caixa rica embaixo da arma: o encanto, o que ela faz no
      // crítico, a habilidade que custa PM — o que o jogador sabe que
      // aquela espada é capaz. Nasce ABERTA (é o que ele pediu: a caixa
      // "abaixo da espada"), e o ✎ dobra quem não quiser vê-la.
      notas: String((a && a.notas) || ''),
      aberto: (a && a.aberto) !== false,
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
  // Passos de dano guardados como inteiro: de 1 a 4d12 são 12 passos na
  // Tabela 3-2, e ninguém precisa de mais que isso para um lado ou outro.
  function passosDe(v) {
    const n = parseInt(v, 10);
    return isFinite(n) ? Math.max(-12, Math.min(12, n)) : 0;
  }

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
        passos: passosDe(x && x.passos),                 // os de fora dos truques (Tabela 3-2)
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
  const XPLOG_MAX = 40;        // o caderno do XP: uma campanha inteira cabe

  const BLOCOS = [
    { campo: 'racaOrigem',    titulo: '🌿 Habilidades de raça e origem',
      dica: 'O que a raça e a origem lhe deram — copie do livro ou escreva com suas palavras…' },
    { campo: 'classePoderes', titulo: '⚔ Habilidades de classe e poderes',
      dica: 'Habilidades de classe, poderes, capacidades de caminho…' },
    { campo: 'anotacoes',     titulo: '📜 Anotações',
      dica: 'História, aliados, contatos, dívidas, o que ficou pendente…' },
  ];
  // Ficaram no modelo (nada do que foi escrito se perde), mas são
  // desenhadas dentro dos cartões de Magias e Inventário — e, desde
  // 22/09/2026, no cartão ⚠ Complicações, que fica lá em cima.
  const BLOCOS_EMBUTIDOS = [
    { campo: 'magias',
      dica: 'Anotações de magia: o que você preparou hoje, aprimoramentos que costuma usar, truques…' },
    { campo: 'inventario',
      dica: 'Anotações do inventário: o que ficou na base, o que é de outro personagem, dívidas…' },
    { campo: 'complicacoes',
      dica: 'A complicação que você escolheu na criação — o nome e o que ela faz…' },
    { campo: 'complicacoesIdade',
      dica: 'Abatido, Catarata, Dedos Trêmulos, Gota… uma por faixa etária, e os efeitos se acumulam' },
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
  // ── QUAL ATRIBUTO ENTRA ONDE ───────────────────────────────────
  //  A Defesa e cada perícia têm o atributo que o livro manda — e a
  //  ficha deixa trocar. Tudo passa por aqui, para que um campo em
  //  branco, uma ficha velha ou o lixo de outra versão do site caiam
  //  fora e a conta volte sozinha para o que está impresso.
  function ehAtributo(k) { return D.ATRIBUTOS.some(x => x.chave === k); }
  //  O da Defesa: Destreza (p. 106), salvo escolha desta ficha — que
  //  pode ser 'nenhum' (armadura pesada, p. 152: "você não aplica sua
  //  Destreza na Defesa"). O que não é nem uma coisa nem outra volta
  //  para a Destreza.
  function atributoDaDefesa(k) { return (ehAtributo(k) || k === 'nenhum') ? k : 'des'; }
  function atrDefesa(f) { return atributoDaDefesa(f.defesa && f.defesa.atributo); }
  //  O quanto ele soma: nada, quando é nenhum.
  function somaAtrDefesa(f) {
    const k = atrDefesa(f);
    return k === 'nenhum' ? 0 : atr(f, k);
  }
  //  O de uma perícia: o da Tabela 2-1 (p. 115), salvo escolha desta
  //  linha. `e` é a entrada da perícia ou do ofício ({treinada, outros,
  //  atr}) — Ofício tem uma por especialidade, e cada uma escolhe a sua.
  function atrPericia(P, e) {
    return (e && ehAtributo(e.atr)) ? e.atr : (P ? P.atr : 'des');
  }
  //  Esta linha saiu do que o livro imprime? É o que acende a marca na
  //  tela e o que põe o atributo no nome da rolagem que vai para a mesa.
  function trocouAtr(P, e) { return !!P && atrPericia(P, e) !== P.atr; }

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
  // Defesa = 10 + Destreza + armadura + escudo (p. 106) — e "Destreza"
  // é o padrão, não uma amarra: quem escolheu outro atributo na ficha
  // soma o dele, quem escolheu nenhum não soma atributo, e a conta por
  // extenso diz qual foi.
  function defesa(f) {
    return 10 + somaAtrDefesa(f) + f.defesa.armadura + f.defesa.escudo + f.defesa.outros;
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
    let v = Math.floor(n / 2) + atr(f, atrPericia(P, e)) + treino(n, (e || {}).treinada) + ((e || {}).outros || 0);
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
  //  "Misticismo (Sab)" — quando a linha sai do atributo do livro, quem
  //  lê a rolagem na mesa precisa ver POR QUE aquele número é aquele.
  //  Quando não sai, o nome vai limpo, como sempre foi.
  function nomeRolado(P, e, nome) {
    return (nome || (P ? P.nome : '')) +
      (trocouAtr(P, e) ? ' (' + atrCurto(atrPericia(P, e)) + ')' : '');
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
  // O teto do PV é o máximo MENOS o que está manchado: aqueles pontos
  // não voltam com cura nenhuma até a condição da mancha ser cumprida.
  function curarPontos(f, qual, quanto) {
    const n = Math.max(0, Math.round(quanto || 0));
    const teto = qual === 'pv' ? tetoPv(f) : pmMax(f);
    const agora = qual === 'pv' ? pvAtual(f) : pmAtual(f);
    // quem já está ACIMA do teto (o dano manchado ainda não foi tirado)
    // não é empurrado para baixo pela cura: fica onde está
    f[qual].atual = agora >= teto ? agora : Math.min(teto, agora + n);
    return f[qual].atual - agora;
  }

  // ── PV MANCHADOS (Heróis de Arton, p. 290) ──────────────────────
  //  Quantos pontos do máximo estão presos, e o teto que sobra para a
  //  cura. A ficha MOSTRA e faz a conta; quem cumpre a condição (dormir
  //  a noite, rezar, achar o antídoto) é a mesa — e o ✓ de cada linha é
  //  o que devolve os pontos.
  function manchas(f) { return (f.pv && f.pv.manchas) || []; }
  function manchado(f) {
    return manchas(f).reduce((s, m) => s + Math.max(0, m.pontos || 0), 0);
  }
  function tetoPv(f) { return Math.max(0, pvMax(f) - manchado(f)); }
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
  //  o que sai fica lá até a próxima rolagem daquele mesmo botão — ou
  //  até o ✕ da própria pílula. Sem ele, uma sessão inteira de
  //  Percepção, Reflexos e Vontade deixava a ficha pontilhada de
  //  resultados velhos (pedido dele, 11/09/2026).
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
  let tabelaPassosAberta = false;   // a Tabela 3-2 do cartão dos Ataques, aberta nesta tela
  let xpLogAberto = false;          // o caderno do XP, aberto nesta tela
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

  //  `curto` é o nome do que se rolou, escrito na própria pílula
  //  ("Ataque", "Dano", "💥 Crítico ×2"). Nas perícias não precisa — a
  //  pílula nasce ao lado do nome delas —, mas embaixo de um ataque são
  //  três pílulas empilhadas, e só com números não se sabia qual era qual
  //  (pedido dele, 11/09/2026).
  function rolar(expr, rotulo, slot, curto) {
    if (!window.GA_Rolagens || !window.GA_Dados) return null;
    let r = null;
    try {
      r = window.GA_Rolagens.rolarEPublicar(expr, rotulo);
      resultados[slot] = { total: r.total, detalhe: r.detalhe, curto: curto || '' };
      historico.unshift({
        quando: Date.now(), rotulo: rotulo, expr: expr,
        total: r.total, detalhe: r.detalhe,
      });
      historico = historico.slice(0, HIST_MAX);
      const f = fichaAberta();
      if (f) salvarHistorico(f.id);
    } catch (err) {
      resultados[slot] = { erro: err.message || 'não deu para rolar', curto: curto || '' };
    }
    pintarResultado(slot);
    pintarHistorico();
    return r;
  }

  // Escreve o resultado no lugar dele, sem redesenhar a ficha (um
  // re-render tiraria o cursor de quem estivesse digitando ao lado).
  //  Só a marca de erro liga e desliga: as outras classes da pílula
  //  (fi-res--atq, fi-res--crit) dizem ONDE ela mora na linha. Trocar o
  //  className inteiro as apagava, e os três resultados do ataque caíam
  //  nas colunas estreitas da grade — o número do dano e o do crítico
  //  saíam para fora da pílula (a print 3 dele, 11/09/2026).
  function pintarResultado(slot) {
    if (!secao) return;
    const el = secao.querySelector('[data-res="' + cssEsc(slot) + '"]');
    if (!el) return;
    const r = resultados[slot];
    if (!r) { el.innerHTML = ''; el.hidden = true; return; }
    el.hidden = false;
    el.classList.toggle('fi-res--erro', !!r.erro);
    el.innerHTML = (r.curto ? '<span class="fi-res-rot">' + esc(r.curto) + '</span>' : '') +
      (r.erro
      ? '⚠ ' + esc(r.erro)
      : '<strong class="fi-res-num">' + r.total + '</strong>' +
        '<span class="fi-res-det">' + r.detalhe + '</span>') +
      '<button type="button" class="fi-res-x" data-acao="fecha-res" data-slot="' + esc(slot) + '"' +
      ' title="Fechar esta rolagem" aria-label="Fechar esta rolagem">✕</button>';
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
    const preso = qual === 'pv' ? manchado(f) : 0;
    const noTeto = qual === 'pv' && preso > 0 && pvAtual(f) >= tetoPv(f);
    const ganho = curarPontos(f, qual, n);
    sujar(f.id, qual);
    // o "o resto passaria do máximo" vira outra frase quando quem
    // segurou a cura foi a mancha: ali o teto não é o máximo
    const porQue = noTeto || (preso && ganho < n)
      ? ' — <strong>' + preso + '</strong> ' + rot + ' manchado' + (preso > 1 ? 's' : '') +
        ' não voltam por cura, só cumprindo a condição'
      : (ganho < n ? ' (o resto passaria do máximo)' : '');
    ultimoDano = ganho
      ? '✚ +' + ganho + ' ' + rot + porQue
      : '✚ nada a recuperar — o ' + rot +
        (noTeto ? ' já está no teto' + porQue : ' já está cheio');
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
          <button type="button" class="fi-aba ${x.id === dados.aberta ? 'fi-aba--ativa' : ''}${retidas[x.id] ? ' fi-aba--retida' : ''}"
                  data-acao="abrir" data-id="${esc(x.id)}"${retidas[x.id] ? ' title="Esta ficha espera você escolher entre a deste navegador e a do banco"' : ''}>
            ${retidas[x.id] ? '⚠ ' : ''}${esc(x.nome || '(sem nome)')}
          </button>`).join('')}
        <button type="button" class="fi-add" data-acao="nova">＋ Nova ficha</button>
      </div>
      ${barraDaMesa()}
      ${avisoDeSincronia(f)}
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

    //  As habilidades de raça/origem e as de classe e poderes sobem para
    //  logo DEPOIS de Ataques e ANTES de Magias (pedido dele em 24/09/2026):
    //  são o que o personagem "sabe fazer", e ficavam soterradas embaixo das
    //  listas de magia e inventário. Anotações (📜) segue mais abaixo.
    html += bloqueIdentidade(f) + blocoComplicacoes(f) + blocoCondicoes(f) + blocoNumeros(f) + blocoApara(f) + blocoPericias(f) + blocoAtaques(f) +
            blocoDePoderes(f, 'racaOrigem') + blocoDePoderes(f, 'classePoderes') +
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
          <label class="fi-campo fi-campo--curto"><span class="fi-rot">Desloc. base (m)</span>
            <input class="fi-num" type="number" min="0" step="1.5" value="${f.deslocamento}" data-campo="deslocamento"
                   title="O deslocamento que a raça lhe dá — 9 m para quase todas (p. 95). O que soma ou tira metros (armadura, poder, carga) vai em «O que mexe no deslocamento», no cartão Defesa & Carga."></label>
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
          <span class="fi-xp-somar">
            <span class="fi-rot">Ganhou agora</span>
            <input class="fi-num fi-xp-quanto" type="number" step="50" id="fiXpQuanto" placeholder="400"
                   aria-label="Quanto de XP entrou agora"
                   title="Quanto de XP entrou agora. O ＋ Somar acrescenta isto ao total, e anota a linha no caderno.">
            <input class="fi-txt fi-xp-nota" type="text" id="fiXpNota" autocomplete="off"
                   aria-label="De onde veio este XP" placeholder="de onde veio (a sessão, a missão…)">
            <button type="button" class="fi-add fi-add--menor" data-acao="xp-somar"
                    title="Somar ao total e anotar no caderno">＋ Somar</button>
          </span>
          <span class="fi-xp-conta" data-der="xpconta">${contaXp(f)}</span>
          <span class="fi-xp-barra" data-der="xpbarra" aria-hidden="true">${barraXp(f)}</span>
          ${blocoXpLog(f)}
        </div>
      </div>`;
  }

  // ── O CADERNO DO XP ──────────────────────────────────────────────
  //  Recolhido, mostra só a última soma — que é a resposta da pergunta
  //  dele ("já coloquei o XP desta sessão?"). Aberto, mostra todas, com
  //  o total em que cada uma deixou a ficha e o ↩ que desfaz.
  //  Aberto ou fechado é deste NAVEGADOR, como o resto do que dobra.
  function blocoXpLog(f) {
    const n = f.xpLog.length;
    if (!n) {
      return `<p class="fi-xp-vazio">Nenhuma soma anotada ainda. Escreva quanto ganhou em
        <strong>Ganhou agora</strong> e clique em <strong>＋ Somar</strong>: o total sobe sozinho e a
        linha fica guardada aqui.</p>`;
    }
    const u = f.xpLog[0];
    const linhas = f.xpLog.map((x, i) => `
      <li class="fi-xp-linha">
        <span class="fi-xp-quando">${esc(dataHora(x.quando))}</span>
        <strong class="fi-xp-quanto-val${x.quanto < 0 ? ' fi-xp-quanto-val--neg' : ''}">${sinalXp(x.quanto)}</strong>
        <span class="fi-xp-linha-nota">${x.nota ? esc(x.nota) : '<em>sem anotação</em>'}</span>
        <span class="fi-xp-linha-total">ficou em ${num(x.total)}</span>
        <button type="button" class="fi-mini" data-acao="xp-desfaz" data-i="${i}"
                title="Desfazer: tira ${sinalXp(x.quanto)} XP do total e apaga esta linha">↩</button>
      </li>`).join('');
    return `
      <details class="fi-xp-log"${xpLogAberto ? ' open' : ''}>
        <summary data-acao="xp-log">📜 ${n} soma${n > 1 ? 's' : ''} anotada${n > 1 ? 's' : ''}
          <em>última: ${sinalXp(u.quanto)} XP${u.nota ? ' (' + esc(u.nota) + ')' : ''}
            em ${esc(dataHora(u.quando))}</em></summary>
        <ul class="fi-xp-lista">${linhas}</ul>
        <p class="fi-nota">O caderno guarda as ${XPLOG_MAX} últimas somas feitas pelo botão. Mexer no
          campo <strong>XP</strong> à mão não passa por aqui — é a porta de escape de sempre.</p>
      </details>`;
  }
  function sinalXp(v) { return (v >= 0 ? '+' : '−') + num(Math.abs(v)); }

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

  // ═══ ⚠ COMPLICAÇÕES (Heróis de Arton, p. 282 e 289) ═══════════════
  //  Pedido dele em 22/09/2026: "alguma caixa para escrever
  //  COMPLICAÇÕES e COMPLICAÇÕES DE IDADE, ele teria que ser lá em cima
  //  para lembrar sempre dele". É exatamente o que o livro quer delas:
  //  pôr a restrição em regras "garante que essa característica
  //  apareça nas aventuras e tenha peso na história" (p. 282). No fim
  //  da ficha, junto das anotações, ninguém lembra — então o cartão
  //  fica logo abaixo do nome, antes de qualquer número.
  //
  //  São duas coisas diferentes no livro, e por isso duas caixas:
  //   • COMPLICAÇÃO (p. 282): UMA por personagem, escolhida na criação,
  //     e em troca vem um poder geral extra. Conta como habilidade — se
  //     impõe uma condição, você a sofre mesmo sendo imune a ela. As
  //     comportamentais cobram caro se violadas: perde todos os PM e só
  //     os recupera a partir do dia seguinte;
  //   • COMPLICAÇÕES DE IDADE (p. 289): uma POR FAIXA ETÁRIA — adulto
  //     1, maduro 2, velho 3, ancião 4 —, e "seus efeitos se acumulam".
  //  A caixa é de texto rico, como o resto do que se escreve na ficha:
  //  a ficha não tem lista de complicações, e nem vai ter — o site não
  //  policia escolha de ninguém.
  function dicaDoBloco(campo) {
    const b = TODOS_BLOCOS.find(x => x.campo === campo);
    return (b && b.dica) || '';
  }
  function blocoComplicacoes(f) {
    return `
      <div class="fi-cartao fi-bloco fi-compl">
        <h2 class="fi-cartao-tit">⚠ Complicações
          <span class="fi-cartao-nota">Heróis de Arton, p. 282 e 289 — aqui em cima para não esquecer delas</span>
        </h2>
        <div class="fi-compl-grade">
          <div class="fi-compl-caixa">
            <h3 class="fi-compl-tit">🎭 Complicação
              <em>uma só, escolhida na criação — e por ela veio um poder geral extra</em></h3>
            ${caixaRicaCampo('blocos.complicacoes', f.blocos.complicacoes, dicaDoBloco('complicacoes'))}
          </div>
          <div class="fi-compl-caixa">
            <h3 class="fi-compl-tit">⏳ Complicações de idade
              <em>uma por faixa etária: adulto 1, maduro 2, velho 3, ancião 4</em></h3>
            ${caixaRicaCampo('blocos.complicacoesIdade', f.blocos.complicacoesIdade, dicaDoBloco('complicacoesIdade'))}
          </div>
        </div>
        <p class="fi-nota">Complicação <strong>conta como habilidade</strong>: se ela impõe uma condição, você a
          sofre <em>mesmo sendo imune</em> a ela. As comportamentais cobram caro — violou, perde todos os PM e só
          recupera a partir do dia seguinte. As <strong>de idade se acumulam</strong>, e é numa delas que nasceu o
          <strong>🩶 PV manchado</strong> da Vida &amp; Mana: a Gota (p. 290) tira 1d6 PV que "só podem ser
          recuperados com descanso".</p>
      </div>`;
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
          ${blocoManchas(f)}
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
            <label class="fi-extra fi-extra--atr"><span>Atributo</span>
              ${seletorAtr('defesa.atributo', atrDefesa(f), 'des',
                'Qual atributo entra na Defesa. Pelo livro é Destreza (p. 106); se um poder, um item ' +
                'ou uma classe sua mandar outro — Sabedoria, Carisma —, escolha aqui: ele entra NO LUGAR ' +
                'da Destreza, e a conta acima passa a mostrar qual foi. «— nenhum» é para quando NADA ' +
                'entra: com armadura pesada "você não aplica sua Destreza na Defesa" (p. 152), e há ' +
                'poderes, condições e efeitos que dizem o mesmo. (Armadura pesada delicada ou de mitral ' +
                'deixa 1 ou 2 pontos: escolha nenhum e ponha esses pontos em Outros.)', 'fi-sel', true)}</label>
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
              <span><strong data-der="desloc">${deslocamento(f)}</strong> m (<strong data-der="quadrados">${quadrados(deslocamento(f))}</strong> quadrados)</span>
            </div>
          </div>
          ${blocoDesloc(f)}
        </div>
      </div>`;
  }

  // ── O QUE MEXE NO DESLOCAMENTO ───────────────────────────────────
  //  Uma linha por coisa que soma ou tira metros: a armadura pesada que
  //  tira 3, o Ímpeto que dá 6, a carga que passou do limite. Fica
  //  colado no número, que é onde se lê o resultado.
  function blocoDesloc(f) {
    const mods = deslocMods(f);
    const linhas = mods.map((x, i) => `
      <li class="fi-desl-linha">
        <input class="fi-num fi-num--mini" type="number" step="1.5" value="${x.valor}"
               data-campo="deslocMods.${i}.valor" title="Metros que esta linha soma (ou tira, com o sinal −)">
        <span class="fi-desl-m" aria-hidden="true">m</span>
        <input class="fi-txt" type="text" value="${esc(x.de)}" data-campo="deslocMods.${i}.de"
               placeholder="armadura pesada, Ímpeto, carga…" autocomplete="off">
        <button type="button" class="fi-mini fi-mini--x" data-acao="tira-desloc" data-i="${i}"
                title="Tirar esta linha">✕</button>
      </li>`).join('');
    return `
      <div class="fi-desl">
        <div class="fi-desl-topo">
          <span class="fi-desl-rot">O que mexe no deslocamento</span>
          <button type="button" class="fi-add fi-add--menor" data-acao="add-desloc"
                  title="Uma linha que soma ou tira metros — a base fica lá em cima, ao lado do Tamanho">＋ Acrescentar</button>
        </div>
        ${linhas ? `<ul class="fi-desl-lista">${linhas}</ul>`
          : '<p class="fi-desl-vazio">Nada mexe nele: valem os <strong data-der="desloc2">' +
            f.deslocamento + '</strong> m da base, lá em cima.</p>'}
        <p class="fi-conta fi-desl-conta" data-der="desloconta" ${contaDesloc(f) ? '' : 'hidden'}>${contaDesloc(f)}</p>
      </div>`;
  }

  // ── O MEDIDOR DE PV / PM ─────────────────────────────────────────
  //  Os dois são iguais, fora a cor e o rótulo — e os dois precisam
  //  mostrar o temporário. A barra tem DOIS pedaços: o atual (ferrugem
  //  no PV, azul no PM) e o temporário logo depois, em ouro. É a
  //  "marca" pedida: dá para ver de longe que há escudo em cima da
  //  vida, e a etiqueta ao lado diz quantos são, por escrito.
  //  E, desde 22/09/2026, a MANCHA: o pedaço do fim da barra que a cura
  //  não alcança. Fica encostado no máximo (é de lá que ele some), com
  //  hachura cinza — de longe se vê que o teto daquela ficha desceu.
  function medidor(f, qual) {
    const ehPv  = qual === 'pv';
    const atual = ehPv ? pvAtual(f) : pmAtual(f);
    const max   = ehPv ? pvMax(f)   : pmMax(f);
    const temp  = f[qual].temp || 0;
    const rot   = ehPv ? 'PV' : 'PM';
    const preso = ehPv ? manchado(f) : 0;
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
        ${ehPv ? `<span class="fi-temp-selo fi-temp-selo--mancha" data-der="pvmanchaselo" ${preso ? '' : 'hidden'}
              title="PV manchados: a cura para no ${tetoPv(f)}, e esses pontos só voltam quando a condição de cada mancha for cumprida">
          🩶 <strong>${preso}</strong> manchados
        </span>` : ''}
      </div>
      <div class="fi-barra-pv fi-barra-pv--${qual}">
        <span class="fi-barra-parte" data-der="${qual}barra" style="width:${fatia(atual, max, temp)}%"></span>
        <span class="fi-barra-temp" data-der="${qual}barratemp" style="width:${fatia(temp, max, temp)}%"></span>
        ${ehPv ? `<span class="fi-barra-mancha" data-der="pvbarramancha"
              style="width:${fatia(preso, max, temp)}%"></span>` : ''}
      </div>`;
  }
  // ── 🩶 OS PV MANCHADOS, NA TELA ──────────────────────────────────
  //  Uma linha por mancha: quantos pontos, e o que os solta. O ✓ é o
  //  cumprimento da condição (dormiu a noite, achou a magia): tira a
  //  mancha E devolve os pontos, que é o que se quer com um clique só.
  //  O ✕ é para a linha digitada errado — sai sem devolver nada.
  function blocoManchas(f) {
    const lista = manchas(f);
    const linhas = lista.map((m, i) => `
      <li class="fi-mancha-linha">
        <input class="fi-num fi-num--mini" type="number" min="0" value="${m.pontos}"
               data-campo="pv.manchas.${i}.pontos" title="Quantos PV estão presos nesta mancha">
        <span class="fi-mancha-rot" aria-hidden="true">PV</span>
        <input class="fi-txt" type="text" value="${esc(m.motivo)}" data-campo="pv.manchas.${i}.motivo"
               aria-label="O que solta estes PV" title="O que devolve estes PV: descanso, uma magia, um ritual…"
               placeholder="só com descanso, só com magia de restauração…" autocomplete="off">
        <button type="button" class="fi-mini fi-mancha-ok" data-acao="cura-mancha" data-i="${i}"
                title="Cumpriu a condição: tira a mancha e devolve ${m.pontos} PV">✓</button>
        <button type="button" class="fi-mini fi-mini--x" data-acao="tira-mancha" data-i="${i}"
                title="Tirar esta linha — sem devolver PV nenhum">✕</button>
      </li>`).join('');
    return `
      <div class="fi-mancha">
        <div class="fi-desl-topo">
          <span class="fi-desl-rot">🩶 PV manchados — o que a cura não alcança</span>
          <button type="button" class="fi-add fi-add--menor" data-acao="add-mancha"
                  title="Marcar PV que só voltam cumprindo uma condição — o 1d6 da Gota, por exemplo (Heróis de Arton, p. 290)"
            >＋ Manchar</button>
        </div>
        ${linhas ? `<ul class="fi-desl-lista">${linhas}</ul>`
          : '<p class="fi-desl-vazio">Nada manchado: a cura vai até o máximo.</p>'}
        <p class="fi-conta fi-mancha-conta" data-der="manchaconta"
           ${manchado(f) ? '' : 'hidden'}>${contaManchas(f)}</p>
      </div>`;
  }
  //  A conta por extenso, do jeito que se explica na mesa: "36 − 4
  //  manchados = a cura para em 32". E o aviso de quem marcou a mancha
  //  sem ter tirado o dano ainda, com o botão que tira.
  function contaManchas(f) {
    const preso = manchado(f);
    if (!preso) return '';
    const porQue = manchas(f).filter(m => m.pontos > 0)
      .map(m => m.pontos + ' ' + (m.motivo ? esc(m.motivo) : '<em>sem condição escrita</em>')).join(' · ');
    const sobra = pvAtual(f) - tetoPv(f);
    return 'PV máximo <strong>' + pvMax(f) + '</strong> − <strong>' + preso + '</strong> manchado' +
      (preso > 1 ? 's' : '') + ' = a cura para em <strong>' + tetoPv(f) + '</strong>' +
      (porQue ? ' <em>(' + porQue + ')</em>' : '') +
      (sobra > 0
        ? ' · <span class="fi-mancha-aviso">⚠ o seu PV está ' + sobra + ' acima desse teto: o dano da mancha ' +
          'ainda não foi tirado <button type="button" class="fi-mini" data-acao="mancha-dano" ' +
          'title="Tirar agora os ' + sobra + ' PV que esta mancha custou">🩸 tirar ' + sobra + '</button></span>'
        : '');
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

  // ── DESLOCAMENTO ─────────────────────────────────────────────────
  //  O que vale é a base MAIS tudo que a ficha listar — e o total não
  //  desce de 0 (imóvel é 0m, p. 394; abaixo disso não existe).
  function deslocMods(f) { return f.deslocMods || []; }
  function somaDesloc(f) { return deslocMods(f).reduce((s, x) => s + (x.valor || 0), 0); }
  function deslocamento(f) { return Math.max(0, (f.deslocamento || 0) + somaDesloc(f)); }
  //  A conta por extenso, do jeito que se explica na mesa: "12 m − 3 m
  //  (armadura pesada) = 9 m". Sem linha nenhuma, não há o que explicar.
  function contaDesloc(f) {
    const mods = deslocMods(f).filter(x => x.valor || x.de);
    if (!mods.length) return '';
    const p = [(f.deslocamento || 0) + ' m'];
    mods.forEach(x => {
      const v = x.valor || 0;
      p.push((v < 0 ? '− ' : '+ ') + Math.abs(v) + ' m' + (x.de ? ' (' + esc(x.de) + ')' : ''));
    });
    const bateu = (f.deslocamento || 0) + somaDesloc(f) < 0;
    return p.join(' ') + ' = <strong>' + deslocamento(f) + ' m</strong>' +
      (bateu ? ' <em>(a conta deu menos que zero; 0 m é o piso)</em>' : '');
  }
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
    const k = atrDefesa(f);
    const p = ['10'];
    if (k !== 'nenhum') p.push(atrCurto(k) + ' ' + sinal(atr(f, k)));
    if (f.defesa.armadura) p.push('armadura ' + sinal(f.defesa.armadura));
    if (f.defesa.escudo)   p.push('escudo ' + sinal(f.defesa.escudo));
    if (f.defesa.outros)   p.push('outros ' + sinal(f.defesa.outros));
    // quando o atributo não é o da p. 106, a conta diz o que está
    // fazendo — senão o número parece errado para quem olha de fora
    const nota = k === 'des' ? ''
      : k === 'nenhum' ? ' <em>(nenhum atributo na Defesa — como com armadura pesada, p. 152)</em>'
      : ' <em>(' + esc(nomeAtr(k)) + ' no lugar da Destreza)</em>';
    return p.join(' + ').replace(/\+ -/g, '− ') + nota;
  }

  // ═══ 🌀 CONDIÇÕES (Tormenta 20, p. 394) ═══════════════════════════
  //  Pedido dele em 17/09/2026: "poder colocar condições (semelhante
  //  aos dos monstros)". A fileira de etiquetas é a mesma ideia — o
  //  nome, o tipo de efeito na cor dele e o texto INTEIRO do livro na
  //  nuvem de mouse —, mas o desenho é o da ficha (prefixo `fi-`) e o
  //  texto vem de window.GA_CONDICOES: a tabela de REGRA que a sub-aba
  //  🌀 Condições das Consultas já lê. Não é dado de criatura, é do
  //  livro, como as magias e os poderes que a ficha lê de lá.
  //
  //  A ficha MOSTRA e não aplica. Um −2 na Defesa que aparecesse
  //  sozinho na conta seria impossível de conferir na mesa, e a p. 394
  //  ainda manda não acumular condições de mesmo efeito ("um
  //  personagem desprevenido e vulnerável sofre –5 na Defesa, não –7").
  //  Quem decide isso é a mesa; a ficha põe o texto na mão dela.
  function baseCondicoes() {
    const G = window.GA_CONDICOES;
    return (G && Array.isArray(G.LISTA)) ? G.LISTA : [];
  }
  function chaveCond(nome) {
    return semAcento(nome).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }
  function acharCond(chave) {
    return baseCondicoes().find(c => chaveCond(c.nome) === chave) || null;
  }
  function tipoCond(c) {
    const G = window.GA_CONDICOES;
    const t = (G && G.TIPOS || []).find(x => x.chave === (c && c.tipo));
    return t || null;
  }
  function condicoesDa(f) {
    return (f.condicoes || []).map(k => ({ chave: k, c: acharCond(k) })).filter(x => x.c);
  }

  function etiquetaCond(x, i) {
    const t = tipoCond(x.c);
    //  A etiqueta inteira recebe foco (tabindex="0"): é o que faz a
    //  nuvem abrir no TOQUE e no teclado, não só no mouse — sem isso,
    //  no celular o único jeito de chegar ao texto seria tocar no ✕.
    const id = 'ficond-' + x.chave;
    return `
      <span class="fi-cond" style="--cond:${t ? t.cor : 'var(--rust-dark)'}"
            tabindex="0" aria-describedby="${id}">
        <span class="fi-cond-nome">${esc(x.c.nome)}</span>
        ${t ? `<span class="fi-cond-tipo">${esc(t.nome)}</span>` : ''}
        <button type="button" class="fi-mini fi-mini--x" data-acao="tira-condicao" data-i="${i}"
                title="Tirar ${esc(x.c.nome)}">✕</button>
        <span class="fi-cond-nuvem" role="tooltip" id="${id}">
          <strong>${esc(x.c.nome)}</strong>${t ? ` <em>efeito de ${esc(t.nome.toLowerCase())}</em>` : ''}
          <span>${esc(x.c.texto)}</span>
        </span>
      </span>`;
  }

  // ── AS DUAS CAIXAS ESCRITAS (22/09/2026) ─────────────────────────
  //  Sustentada não está na lista de condições do livro — é DURAÇÃO de
  //  habilidade (p. 227) —, mas é a que mais se esquece na mesa, e é
  //  por isso que ele a pediu aqui: o 1 PM de ação livre no começo de
  //  cada turno seu. O texto abaixo é o do livro, palavra por palavra.
  const TXT_SUSTENTADA =
    'A habilidade precisa de um fluxo constante de mana. O personagem deve gastar 1 PM como uma ação ' +
    'livre no início de cada turno seu para manter o efeito ativo. Se não o fizer, a habilidade termina. ' +
    'Você pode manter diversas habilidades sustentadas, pagando o custo de cada uma, mas apenas uma ' +
    'magia sustentada por vez.';

  function condLivres(f) { return f.condicoesLivres || []; }
  function linhaCondLivre(c, i) {
    const sust = c.tipo === 'sustentada';
    const id = 'ficondl-' + c.id;
    return `
      <li class="fi-condl fi-condl--${c.tipo}">
        <span class="fi-condl-rot"${sust ? ` tabindex="0" aria-describedby="${id}"` : ''}>
          ${sust ? '✋ Sustentada' : '✎ Outros'}
          ${sust ? `<span class="fi-cond-nuvem" role="tooltip" id="${id}">
            <strong>Sustentada</strong> <em>duração de habilidade — Tormenta 20, p. 227</em>
            <span>${esc(TXT_SUSTENTADA)}</span>
          </span>` : ''}
        </span>
        <input class="fi-txt" type="text" value="${esc(c.texto)}" data-campo="condicoesLivres.${i}.texto"
               aria-label="${sust ? 'O que você está sustentando' : 'A condição, com as suas palavras'}"
               placeholder="${sust ? 'o que você está sustentando — a magia, o poder, o item…'
                                   : 'o que está pegando agora, com as suas palavras…'}" autocomplete="off">
        ${sust ? `<button type="button" class="fi-mini${c.magia ? ' fi-mini--on' : ''}" data-acao="livre-magia"
                data-i="${i}" aria-pressed="${!!c.magia}"
                title="${c.magia ? 'Não é magia: desmarcar' : 'É uma MAGIA sustentada — e só cabe uma delas por vez'}"
          >✦</button>` : ''}
        <button type="button" class="fi-mini fi-mini--x" data-acao="tira-livre" data-i="${i}"
                title="Tirar esta linha">✕</button>
      </li>`;
  }
  //  O preço de manter tudo de pé, somado: é a conta que ninguém faz no
  //  meio do combate e que derruba magia por falta de 1 PM.
  function contaSustentadas(f) {
    const s = condLivres(f).filter(c => c.tipo === 'sustentada');
    if (!s.length) return '';
    const magias = s.filter(c => c.magia).length;
    return '<strong>' + s.length + '</strong> sustentada' + (s.length > 1 ? 's' : '') + ': <strong>' +
      s.length + ' PM</strong> como ação livre no início de cada turno seu, ou o efeito termina' +
      (magias > 1
        ? ' · <span class="fi-mancha-aviso">⚠ ' + magias + ' delas estão marcadas como <strong>magia</strong>, e o ' +
          'livro deixa manter <em>apenas uma magia sustentada por vez</em></span>'
        : '');
  }

  function blocoCondicoes(f) {
    const minhas = condicoesDa(f);
    const livres = condLivres(f);
    const temBase = baseCondicoes().length;
    const quantas = minhas.length + livres.length;
    return `
      <div class="fi-cartao fi-bloco fi-condicoes">
        <h2 class="fi-cartao-tit">🌀 Condições
          <span class="fi-cartao-nota">${quantas ? quantas + ' agora' : 'nenhuma agora'}${
            temBase ? ' · ' + temBase + ' na lista do livro (p. 394)' : ''}</span>
          <span class="fi-pod-botoes">
            ${quantas ? `<button type="button" class="fi-add fi-add--menor" data-acao="limpa-condicoes"
                    title="Tirar todas — é o que acontece no fim da cena">🧹 Fim da cena</button>` : ''}
            <button type="button" class="fi-add fi-add--menor" data-acao="add-livre" data-tipo="sustentada"
                    title="Uma habilidade sustentada: 1 PM de ação livre no início de cada turno seu (p. 227)"
              >✋ Sustentada</button>
            <button type="button" class="fi-add fi-add--menor" data-acao="add-livre" data-tipo="outros"
                    title="Uma linha em branco, para o que não está na lista do livro">✎ Outros</button>
            <button type="button" class="fi-add fi-add--menor" data-acao="add-condicao" ${temBase ? '' : 'disabled'}
                    >＋ Condição</button>
          </span>
        </h2>
        <div class="fi-cond-fila">
          ${minhas.length ? minhas.map(etiquetaCond).join('')
            : '<span class="fi-cond-nenhuma">Nenhuma condição do livro agora. O <strong>＋ Condição</strong> abre a lista.</span>'}
        </div>
        ${livres.length ? `<ul class="fi-condl-lista">${livres.map(linhaCondLivre).join('')}</ul>` : ''}
        <p class="fi-conta fi-condl-conta" data-der="sustconta"
           ${contaSustentadas(f) ? '' : 'hidden'}>${contaSustentadas(f)}</p>
        <p class="fi-nota">Passe o mouse (ou toque) numa etiqueta para ler o texto inteiro do livro.
          <strong>A ficha mostra, não aplica</strong>: os −2 e os −5 continuam por sua conta, porque
          condições de mesmo efeito <em>não se somam</em> — "um personagem desprevenido e vulnerável
          sofre –5 na Defesa, não –7" (p. 394). No fim da cena, todas terminam, a menos que a condição
          diga o contrário.</p>
      </div>`;
  }

  // ── RESISTÊNCIAS, RD E IMUNIDADES (Tormenta 20, p. 229) ──────────
  //  Três coisas, e a mesa vive confundindo as duas primeiras. Aqui
  //  cada uma tem a sua lista e a sua frase, com as palavras do livro:
  //   • resistência entra no TESTE (Fortitude, Reflexos ou Vontade);
  //   • a RD entra no DANO — em todo dano, se não disser de qual;
  //   • imunidade: nem uma coisa nem outra, aquilo não o atinge.
  const APARAM = [
    { campo: 'resistencias', titulo: '🜂 Resistências', icone: '🜂',
      dica: 'Resistência a magia +2, a veneno +5… é BÔNUS no teste de Fortitude, Reflexos ou Vontade contra aquele efeito — não tira dano',
      phValor: '+2', titValor: 'Bônus no teste de resistência contra este efeito',
      phDo: 'magia, veneno, medo, fogo…', comValor: true },
    { campo: 'reducoes', titulo: '🛡 Redução de dano', icone: '🛡',
      dica: 'RD 5 ignora 5 de TODO dano que você sofre — corte, fogo, psíquico, magia… Só vale para um tipo quando diz qual ("redução de fogo 10"). Dá para ter várias',
      phValor: '5', titValor: 'Quanto de dano ignora',
      phDo: 'Geral', comValor: true },
    { campo: 'imunidades', titulo: '🚫 Imunidades', icone: '🚫',
      dica: 'Nenhuma consequência direta daquilo: um tipo de dano, uma condição, um efeito — veneno, medo, sono…',
      phValor: '', phDo: 'veneno, doenças, medo…', comValor: false },
  ];

  function linhaApara(f, bloco, x, i) {
    return `
      <li class="fi-apara">
        ${bloco.comValor
          ? `<input class="fi-num fi-num--mini" type="text" inputmode="numeric" value="${esc(x.valor)}"
                   data-campo="${bloco.campo}.${i}.valor" placeholder="${bloco.phValor}" title="${esc(bloco.titValor)}">`
          : `<span class="fi-apara-icone" aria-hidden="true">${bloco.icone}</span>`}
        <input class="fi-txt" type="text" value="${esc(x.do_)}" data-campo="${bloco.campo}.${i}.do_"
               placeholder="${esc(bloco.phDo)}" autocomplete="off">
        <span class="fi-apara-ordem">
          ${setasDeOrdem('apara', i, i, (f[bloco.campo] || []).length, x.do_ || 'esta linha',
                         ' data-campo="' + bloco.campo + '"')}
        </span>
        <button type="button" class="fi-mini fi-mini--x" data-acao="tira-apara"
                data-campo="${bloco.campo}" data-i="${i}" title="Tirar esta linha">✕</button>
        <input class="fi-txt fi-txt--obs" type="text" value="${esc(x.obs)}" data-campo="${bloco.campo}.${i}.obs"
               placeholder="de onde vem, quando vale…" autocomplete="off">
      </li>`;
  }

  // ── ⇈ ↑ ↓: A ORDEM DE UMA LISTA ──────────────────────────────────
  //  As mesmas três setas do inventário, agora onde ele pediu em
  //  17/09/2026: "às vezes quero que o novo item que eu coloquei esteja
  //  lá em cima em vez de eu ficar escrevendo tudo para baixo".
  //  `prefixo` vira as ações <prefixo>-topo / -sobe / -desce; `i` é o
  //  índice na lista guardada e `pos`/`quantos` o lugar na lista que se
  //  VÊ (nos poderes as duas diferem: a tela agrupa, a lista é uma só).
  //  `extra` leva o que mais o clique precisa saber.
  function setasDeOrdem(prefixo, i, pos, quantos, oQue, extra) {
    const primeiro = pos === 0, ultimo = pos === quantos - 1;
    const b = (acao, seta, dica) => `<button type="button" class="fi-mini" data-acao="${prefixo}-${acao}"
            data-i="${i}"${extra || ''} ${(acao === 'desce' ? ultimo : primeiro) ? 'disabled' : ''}
            title="${dica}" aria-label="${dica} — ${esc(oQue)}">${seta}</button>`;
    return b('topo', '⇈', 'Levar para o topo') + b('sobe', '↑', 'Mover para cima') + b('desce', '↓', 'Mover para baixo');
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
        <h2 class="fi-cartao-tit">🛡 Resistências, RD e imunidades
          <span class="fi-cartao-nota">três coisas diferentes (Tormenta 20, p. 229)</span>
        </h2>
        <div class="fi-apara-grade">${cartoes}</div>
        <label class="fi-campo fi-campo--largo fi-prof">
          <span class="fi-rot">🎓 Proficiências</span>
          <input class="fi-txt" type="text" value="${esc(f.proficiencias)}" data-campo="proficiencias"
                 placeholder="armas simples, armaduras leves, escudos…" autocomplete="off">
        </label>
        <p class="fi-nota"><strong>Resistência entra no teste; RD entra no dano.</strong> Com resistência a
          fogo +5, você soma +5 no Fortitude, Reflexos ou Vontade que rolar para resistir a um efeito de fogo —
          são as perícias com o selo <strong>resistência</strong>, lá em cima. Com RD 5, sem dizer de quê, você
          ignora 5 de <em>qualquer</em> dano que sofrer; <em>redução de fogo 10</em> vale só para fogo, e
          <em>RD 10/mágico</em> vale para tudo, menos o dano mágico. Imunidade: você não sofre nenhuma
          consequência <em>direta</em> daquilo.</p>
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
      //  O botão de rolar virou DOIS — o nome e o número —, com o
      //  seletor de atributo entre eles, onde antes ficava o "DES"
      //  escrito. Um <select> dentro de um <button> não abre (e o
      //  clique cairia no botão), então o botão teve de se partir; os
      //  dois rolam a mesma perícia, e a linha continua igual na tela.
      return `
        <li class="fi-per ${e.treinada ? 'fi-per--treinada' : ''}">
          ${botaoTreinar(e.treinada, 'data-acao="treinar" data-p="' + p.chave + '"')}
          <button type="button" class="fi-per-rolar fi-per-rolar--nome" data-acao="rolar-pericia" data-p="${p.chave}"
                  title="Rolar 1d20 ${sinal(v)} de ${esc(p.nome)}">
            <span class="fi-per-nome">${esc(p.nome)}</span>
          </button>
          ${seletorAtr('pericias.' + p.chave + '.atr', atrPericia(p, e), p.atr,
            'Qual atributo entra em ' + p.nome + '. Pelo livro é ' + nomeAtr(p.atr) +
            ' (Tabela 2-1, p. 115); se um poder, um item ou uma classe sua mandar outro, escolha aqui — muda só esta perícia.')}
          <button type="button" class="fi-per-rolar fi-per-rolar--val" data-acao="rolar-pericia" data-p="${p.chave}"
                  title="Rolar 1d20 ${sinal(v)} de ${esc(p.nome)}">
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
          As <em>só treinada</em> aparecem mesmo sem treino porque o livro proíbe o uso, não a rolagem.
          A sigla do meio é o <strong>atributo</strong>: vem o da Tabela 2-1, e você pode trocar por outro
          (usar Sabedoria em Misticismo, por exemplo). Trocado, ele fica em destaque e o nome da rolagem
          vai para a mesa com o atributo entre parênteses.</p>
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
          ${seletorAtr('oficios.' + i + '.atr', atrPericia(p, o), p.atr,
            'Qual atributo entra neste ofício. Pelo livro é ' + nomeAtr(p.atr) +
            ' (p. 121); cada ofício é uma perícia à parte, e escolhe o seu.')}
          <button type="button" class="fi-per-rolar fi-per-rolar--of" data-acao="rolar-oficio" data-i="${i}"
                  title="Rolar 1d20 ${sinal(v)} de ${esc(nomeOficio(o))}">
            <span class="fi-per-val" data-der="of:${i}">${sinal(v)}</span>
            <span class="fi-per-dado" aria-hidden="true">🎲</span>
          </button>
          <input class="fi-num fi-num--mini" type="number" value="${o.outros}"
                 data-campo="oficios.${i}.outros" title="Outros bônus neste ofício">
          <span class="fi-per-marcas">
            ${marcasDe(p)}
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
  function nomeAtr(chave) {
    const a = D.ATRIBUTOS.find(x => x.chave === chave);
    return a ? a.nome : chave;
  }

  // ── O SELETOR DE ATRIBUTO DE UMA LINHA ───────────────────────────
  //  O "DES" que ficava ao lado do nome era um rótulo; agora é escolha.
  //  Serve à Defesa e a cada perícia (e a cada ofício), e vai sempre com
  //  o do LIVRO guardado em `data-livro`: é ele que acende a marca de
  //  "esta linha saiu do padrão" — sem precisar redesenhar a ficha
  //  inteira a cada troca (ver atualizarDerivados).
  //  `comNenhum` (só a Defesa, 15/09/2026) acrescenta «— nenhum», para
  //  quando atributo nenhum entra — a armadura pesada, p. 152.
  function seletorAtr(campo, valor, doLivro, dica, classe, comNenhum) {
    const ops = D.ATRIBUTOS.map(x =>
      `<option value="${x.chave}" ${x.chave === valor ? 'selected' : ''}>${esc(x.curto)}</option>`).join('') +
      (comNenhum ? `<option value="nenhum" ${valor === 'nenhum' ? 'selected' : ''}>— nenhum</option>` : '');
    return `<select class="${classe || 'fi-sel fi-sel--atr'}${valor === doLivro ? '' : ' fi-sel--trocado'}"
              data-campo="${campo}" data-livro="${doLivro}" title="${esc(dica)}">${ops}</select>`;
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
        <input class="fi-num fi-num--passos${a.passos ? ' fi-num--andou' : ''}" type="number" min="-12" max="12" step="1"
               value="${a.passos}" data-campo="ataques.${i}.passos" aria-label="Passos de dano"
               title="Passos de dano (Tabela 3-2, p. 143): +1 para cada passo que um poder, a arma adaptável usada com as duas mãos ou uma arma maior sobem; −1 para cada um que descem. O dado da arma anda na tabela sozinho — o resto do dano fica como está.">
        <button type="button" class="fi-atq-dano" data-acao="rolar-dano" data-i="${i}"
                title="${esc(tituloDano(a))}">🎲 dano</button>
        <input class="fi-txt fi-txt--mini" type="text" value="${esc(a.critico)}" data-campo="ataques.${i}.critico"
               placeholder="19/×3" autocomplete="off">
        <button type="button" class="fi-atq-crit" data-acao="rolar-critico" data-i="${i}"
                title="${esc(tituloCritico(danoDoAtaque(a).expr, mult))}">💥 Crítico</button>
        <input class="fi-txt fi-txt--mini" type="text" value="${esc(a.tipo)}" data-campo="ataques.${i}.tipo"
               placeholder="corte" autocomplete="off">
        <input class="fi-txt fi-txt--mini" type="text" value="${esc(a.alcance)}" data-campo="ataques.${i}.alcance"
               placeholder="corpo a corpo" autocomplete="off">
        <button type="button" class="fi-mini fi-atq-nota ${a.aberto ? 'fi-mini--on' : ''}${a.notas && !a.aberto ? ' fi-mini--tem' : ''}"
                data-acao="atq-texto" data-i="${i}" aria-pressed="${a.aberto}"
                title="${a.aberto ? 'Dobrar o texto desta arma' : 'Abrir o texto desta arma — o encanto, o que ela faz'}">✎</button>
        <button type="button" class="fi-mini fi-mini--x" data-acao="tira-ataque" data-i="${i}" title="Tirar este ataque">✕</button>
        <span class="fi-atq-passos${avisoDePassos(a) ? ' fi-atq-passos--aviso' : ''}" data-der="passos:${i}"
              ${passosDe(a.passos) ? '' : 'hidden'}>${linhaDePassos(a)}</span>
        <span class="fi-res fi-res--atq" data-res="atq:${i}" hidden></span>
        <span class="fi-res fi-res--atq" data-res="dano:${i}" hidden></span>
        <span class="fi-res fi-res--atq fi-res--crit" data-res="crit:${i}" hidden></span>
        ${a.aberto ? `
        <div class="ga-rich-wrap ga-rich-wrap--barra fi-atq-texto" data-jog-edita>
          ${window.GA_barraRica ? window.GA_barraRica() : ''}
          <div class="fi-texto ga-rich" contenteditable="true" spellcheck="true"
               data-campo="ataques.${i}.notas"
               data-ph="O que esta arma faz: o encanto, o efeito no crítico, a habilidade que custa PM…"
               >${a.notas}</div>
        </div>` : ''}
      </li>`;
    }).join('');

    return `
      <div class="fi-cartao fi-ataques">
        <h2 class="fi-cartao-tit">Ataques
          <span class="fi-cartao-nota">o valor de ataque <em>é</em> a perícia — Luta ou Pontaria</span>
        </h2>
        <div class="fi-atq-cab">
          <span>Arma</span><span>Perícia</span><span>Extra</span><span>Ataque</span>
          <span>Dano</span><span title="Passos de dano — Tabela 3-2, p. 143">Passos</span><span></span><span>Crítico</span><span></span><span>Tipo</span><span>Alcance</span><span></span><span></span>
        </div>
        <ul class="fi-atq-lista">${linhas || '<li class="fi-atq-vazio">Nenhum ataque ainda.</li>'}</ul>
        <button type="button" class="fi-add fi-add--menor" data-acao="add-ataque">＋ Acrescentar ataque</button>
        <p class="fi-nota">O dano de corpo a corpo e de arremesso soma a Força — escreva o total aqui (ex.: <code>1d8+3</code>).
          O <strong>💥 Crítico</strong> rola o crítico <em>à mão</em>, porque quem decide se o 20 virou crítico é a mesa:
          ele multiplica só os <strong>dados</strong>, como o livro manda (p. 142) — <code>1d8+3</code> com ×2 vira
          <code>2d8+3</code>, e o +3 não dobra. Embaixo de cada arma vai o texto dela (o encanto, o que ela faz);
          o <strong>✎</strong> dobra e desdobra.</p>
        <p class="fi-nota">A coluna <strong>Passos</strong> anda o dado da arma na Tabela 3-2 (p. 143): com
          <code>1d8+3</code> e <code>+2</code>, o que se rola é <code>1d12+3</code> — e o crítico multiplica o
          dado já andado. Só o primeiro dado anda; o <code>+1d6</code> de um encanto e os números ficam como estão.</p>
        ${tabelaDePassos(f)}
      </div>`;
  }
  // O multiplicador saiu do botão ("💥 ×2" virou "💥 Crítico", a pedido
  // dele) e mora na dica do mouse — que é a conta inteira, com os dados
  // já multiplicados. O campo "19/×3" ao lado continua dizendo o ×N.
  function tituloCritico(dano, mult) {
    return 'Rolar o dano CRÍTICO: ' + expressaoCritica(dano || '—', mult) +
      ' (×' + mult + ' — só os dados multiplicam, p. 142)';
  }

  // ── PASSOS DE DANO (Tabela 3-2, p. 143) — 15/09/2026 ─────────────
  //  O que se rola é o dano escrito com o PRIMEIRO dado andado na tabela
  //  (D.danoComPassos). A ficha guarda só o número de passos; o dado
  //  andado é conta, como tudo o mais aqui. `extra` são passos que vêm de
  //  fora do campo (os truques do melhor amigo).
  function danoDoAtaque(a, extra) {
    return D.danoComPassos(String((a && a.dano) || '').trim(), passosDe(a && a.passos) + (extra || 0));
  }
  function textoPassos(n) {
    return (n > 0 ? '+' : '−') + Math.abs(n) + ' passo' + (Math.abs(n) === 1 ? '' : 's');
  }
  function tituloDano(a) {
    const r = danoDoAtaque(a);
    if (!r.expr) return 'Rolar o dano';
    return 'Rolar o dano: ' + r.expr + (passosDe(a.passos) && r.ok && !r.semDado
      ? ' (' + r.base + ' ' + textoPassos(passosDe(a.passos)) + ', Tabela 3-2)' : '');
  }
  // A linha embaixo do ataque: para onde o dado andou — ou por que não andou.
  function linhaDePassos(a, extra, fontes) {
    const n = passosDe(a.passos) + (extra || 0);
    if (!n) return '';
    const r = danoDoAtaque(a, extra);
    const quais = fontes ? ' <em>(' + esc(fontes) + ')</em>' : '';
    if (r.semDado) {
      return '⚠ ' + textoPassos(n) + quais + ' — escreva o dado da arma no dano (ex.: <code>1d8+3</code>) ' +
        'para ele andar na tabela';
    }
    if (!r.ok) return '⚠ <strong>' + esc(r.base) + '</strong> não está na Tabela 3-2 — o dano sai sem os passos';
    return '⇅ <strong>' + esc(r.base) + '</strong> ' + textoPassos(n) + quais + ' → <strong>' + esc(r.dado) + '</strong>' +
      (r.dado === '4d12' ? ' <em>(o máximo da tabela)</em>' : '') +
      (r.limitado && r.dado !== '4d12' ? ' <em>(a tabela não desce mais)</em>' : '') +
      ' <em>· Tabela 3-2, p. 143</em>';
  }
  function avisoDePassos(a, extra) {
    if (!(passosDe(a.passos) + (extra || 0))) return false;
    const r = danoDoAtaque(a, extra);
    return !!(r.semDado || !r.ok);
  }
  // A tabela inteira, recolhida no cartão: a linha do dado de cada arma da
  // ficha acende, para quem quiser conferir a conta com os próprios olhos.
  function tabelaDePassos(f) {
    const usadas = {};
    (f.ataques || []).forEach(a => {
      const r = danoDoAtaque(a, 0);
      if (r.base) usadas[r.base] = true;
    });
    const cab = ['–2', '–1', 'Normal', '+1', '+2', '+3'];
    const linhas = D.PASSOS_DANO.map(l => {
      const usada = l[2].some(d => usadas[d]);
      return '<tr' + (usada ? ' class="fi-passos-usada"' : '') + '>' + l.map((c, i) =>
        '<td' + (i === 2 ? ' class="fi-passos-normal"' : '') + '>' +
          esc(i === 2 ? c.join(' ou ') : (c === '4d12' ? '4d12 (máx.)' : c)) + '</td>').join('') + '</tr>';
    }).join('');
    return `
        <details class="fi-passos-tabela"${tabelaPassosAberta ? ' open' : ''}>
          <summary data-acao="passos-tabela">📊 Tabela 3-2 — passos de dano</summary>
          <div class="fi-passos-rola">
            <table class="fi-passos-tab">
              <thead><tr>${cab.map((c, i) => '<th' + (i === 2 ? ' class="fi-passos-normal"' : '') + '>' + c + '</th>').join('')}</tr></thead>
              <tbody>${linhas}</tbody>
            </table>
            <p class="fi-passos-nota">Ache o dado da arma na coluna Normal e ande para os lados. Além das pontas,
              anda-se de passo em passo pela própria tabela, até o 4d12, que é o máximo. (Tormenta 20, p. 143 —
              a mesma tabela está em 📚 Consultas → ⚔ Arsenal &amp; Regras.)</p>
          </div>
        </details>`;
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
  //  E o dado já sai ANDADO na Tabela 3-2 (15/09/2026): os passos que o
  //  jogador escreveu, mais os dos truques que dizem que o dano das armas
  //  naturais "aumenta em um passo" — o Amigão e o Amigo Feroz. Esses
  //  entram sozinhos, como a Força, porque são do bicho e não da arma.
  function passosDosTruques(a) {
    const p = [];
    if (temTruque(a, 'amigao')) p.push('Amigão');
    if (temTruque(a, 'amigo-feroz')) p.push('Amigo Feroz');
    return p;
  }
  function fontesDePassos(x, a) {
    const p = passosDosTruques(a).map(t => t + ' +1');
    if (!p.length) return '';
    if (passosDe(x.passos)) p.push('outros ' + sinal(passosDe(x.passos)));
    return p.join(' · ');
  }
  function danoAmigo(f, a, x) {
    if (!String(x.dano || '').trim()) return '';
    const dado = danoDoAtaque(x, passosDosTruques(a).length).expr;
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
            <span>Dado</span><span title="Passos de dano — Tabela 3-2, p. 143">Passos</span><span></span><span>Crítico</span><span></span><span>Tipo</span><span></span>
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
        <input class="fi-num fi-num--passos${x.passos ? ' fi-num--andou' : ''}" type="number" min="-12" max="12" step="1"
               value="${x.passos}" data-campo="amigos.${i}.ataques.${j}.passos" aria-label="Passos de dano"
               title="Passos de dano de FORA dos truques (Tabela 3-2, p. 143). O Amigão e o Amigo Feroz já sobem um passo cada, sozinhos.">
        <button type="button" class="fi-atq-dano" data-acao="am-rolar-dano" data-i="${i}" data-j="${j}"
                title="Rolar o dano">🎲 <span data-der="am:${i}:dano:${j}">${esc(dano || 'dano')}</span></button>
        <input class="fi-txt fi-txt--mini" type="text" value="${esc(x.critico)}" data-campo="amigos.${i}.ataques.${j}.critico"
               placeholder="×2" autocomplete="off">
        <button type="button" class="fi-atq-crit" data-acao="am-rolar-crit" data-i="${i}" data-j="${j}"
                title="${esc(tituloCritico(dano, multiplicadorCritico(x.critico)))}">💥 Crítico</button>
        <input class="fi-txt fi-txt--mini" type="text" value="${esc(x.tipo)}" data-campo="amigos.${i}.ataques.${j}.tipo"
               placeholder="corte, impacto…" autocomplete="off">
        <button type="button" class="fi-mini fi-mini--x" data-acao="am-tira-atq" data-i="${i}" data-j="${j}"
                title="Tirar esta arma">✕</button>
        <span class="fi-atq-passos${avisoDePassos(x, passosDosTruques(a).length) ? ' fi-atq-passos--aviso' : ''}"
              data-der="am:${i}:passos:${j}" ${(passosDe(x.passos) + passosDosTruques(a).length) ? '' : 'hidden'}>${
          linhaDePassos(x, passosDosTruques(a).length, fontesDePassos(x, a))}</span>
        <span class="fi-res fi-res--atq" data-res="am:${i}:atq:${j}" hidden></span>
        <span class="fi-res fi-res--atq" data-res="am:${i}:dano:${j}" hidden></span>
        <span class="fi-res fi-res--atq fi-res--crit" data-res="am:${i}:crit:${j}" hidden></span>
      </li>`;
  }
  // O que a ficha NÃO mexe sozinha na arma, e por quê: a margem de
  // ameaça depende de qual arma é, e o livro deixa escolher entre várias
  // (Ameaças de Arton, p. 374). O passo de dano dos truques, sim: desde
  // 15/09/2026 ele anda sozinho na Tabela 3-2 (ver danoAmigo).
  function notaAtaquesAmigo(a) {
    const p = [];
    if (a.tipo === 'animal') p.push('o <strong>animal</strong> tem +1 na margem de ameaça (escreva <code>19/×2</code> no crítico)');
    if (a.tipo === 'monstro') p.push('o <strong>monstro</strong> tem uma segunda arma natural — o ＋ acrescenta');
    if (temTruque(a, 'amigo-feroz')) p.push('o <strong>Amigo Feroz</strong> já soma +2 no ataque e sobe o dano um passo; a margem +2 é com você');
    if (temTruque(a, 'amigao')) p.push('o <strong>Amigão</strong> já sobe o dano um passo (1d8 vira 1d10)');
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
  //  O TEXTO INTEIRO, E O RECOLHER. Cada magia mostra o texto do livro
  //  direto no cartão (pedido dele, 11/09/2026 — o resumo de uma linha
  //  não servia na mesa). Com isso a lista de um conjurador de nível
  //  alto fica comprida, e o inventário lá no fim; então cada cartão
  //  recolhe até sobrar só o nome, e o "Recolher todas" faz o mesmo com
  //  a lista inteira.
  //  O que está recolhido é deste NAVEGADOR, não da ficha: o mestre
  //  recolhendo as magias de um jogador não pode recolhê-las na tela do
  //  jogador — e não há por que mandar isso para a mesa.
  const MAG_FECHADAS_KEY = 'grifosAlados.fichaMagiasFechadas';
  let magiasFechadas = (function () {
    try { return JSON.parse(localStorage.getItem(MAG_FECHADAS_KEY) || '{}') || {}; } catch (e) { return {}; }
  })();
  function guardarFechadas() {
    try { window.GA_guardar(MAG_FECHADAS_KEY, JSON.stringify(magiasFechadas)); } catch (e) {}
  }

  // ═══ ✨ PODERES ═══════════════════════════════════════════════════
  //  Pedido dele em 15/09/2026: "ADICIONAR PODER… e dentro da aba um
  //  filtro e sub árvores de poder de classe, poder geral, poder
  //  concedido, poder da tormenta, poder de raça". A base é
  //  window.GA_PODERES (js/poderes-data.js): os 460 poderes dos livros
  //  FORA os de classe, com o texto integral, a página e as tags — os
  //  deuses de um concedido, as raças de um poder de raça. Origens e
  //  distinções ficaram de fora, decisão dele no mesmo dia.
  //  Para o que não está na base — poder de CLASSE, poder caseiro — tem
  //  o "✍ Escrever", que guarda nome, grupo e texto na própria ficha.
  //
  //  O recolhido é deste NAVEGADOR, não da ficha: o mestre recolhendo os
  //  poderes de um jogador não pode recolhê-los na tela do jogador (a
  //  mesma razão do cartão de magias).
  const POD_FECHADOS_KEY = 'grifosAlados.fichaPoderesFechados';
  let poderesFechados = (function () {
    try { return JSON.parse(localStorage.getItem(POD_FECHADOS_KEY) || '{}') || {}; } catch (e) { return {}; }
  })();
  function guardarPodFechados() {
    try { window.GA_guardar(POD_FECHADOS_KEY, JSON.stringify(poderesFechados)); } catch (e) {}
  }
  const GRUPO_LIVRE = { chave: 'livre', nome: 'Escritos à mão', emoji: '✍' };
  //  ── OS PODERES DE CLASSE (17/09/2026) ────────────────────────────
  //  Entraram como um GRUPO a mais, ao lado de combate, destino, magia,
  //  concedidos, Tormenta, raça e grupo — e dentro dele cada classe tem
  //  a sua gaveta, porque "Aumento de Atributo" existe em todas as 16 e
  //  o que muda é de quem ele é. A base é window.GA_PODERES_CLASSE.
  //  A caixa de texto "⚔ Habilidades de classe e poderes" lá embaixo
  //  CONTINUA onde estava: quem já escreveu o poder à mão não perde uma
  //  linha (foi a condição que ele pôs).
  const GRUPO_CLASSE = { chave: 'classe', nome: 'Classe', emoji: '⚔' };
  //  O ✦ que o livro imprime no fim de um poder: aquilo é MÁGICO, e
  //  importa em jogo. (A mesma marca dos statblocks, escrita aqui de
  //  novo — a ficha não puxa nada de criatura.)
  const DICA_MAGICA = 'Habilidade mágica — pode ser alvo de Dissipar Magia (inclusive como ' +
    'contramágica) e é anulada onde a magia não funciona.';
  function baseClasse() {
    return Array.isArray(window.GA_PODERES_CLASSE) ? window.GA_PODERES_CLASSE : [];
  }
  function listasDeClasse() {
    return Array.isArray(window.GA_PODERES_CLASSE_LISTAS) ? window.GA_PODERES_CLASSE_LISTAS : [];
  }
  function listaDeClasse(chave) {
    return listasDeClasse().find(l => l.chave === chave) || null;
  }
  //  A variante NÃO tem lista própria: "você recebe esta habilidade como
  //  o <básica> básico" (Heróis de Arton, p. 22–45). Quem responde pela
  //  variante é a básica — a mesma regra que o resto da ficha já usa.
  function classeDosPoderes(chave) { return D.basicaDe(chave) || chave; }
  //  ── QUAL CARTÃO DE BAIXO É DONO DE CADA GRUPO (23/09/2026) ────────
  //  O ✨ Poderes lá de cima foi desmontado: os grupos de poder passaram
  //  a morar nos dois cartões que já existiam embaixo — 🌿 Habilidades de
  //  raça e origem e ⚔ Habilidades de classe e poderes —, cada um com o
  //  seu ✍ Escrever, ＋ Adicionar e Abrir/Recolher todos. Raça e origem
  //  juntam a habilidade de raça, o poder de raça e o poder de origem;
  //  classe e poderes ficam com o resto (combate, destino, magia,
  //  concedidos, Tormenta, grupo, distinção, os de classe e os escritos
  //  à mão). A caixa de texto livre de cada cartão CONTINUA embaixo — a
  //  condição dele de 15/09: quem escreveu à mão não perde uma linha.
  const POD_BLOCO_DE_GRUPO = {
    'raca-hab': 'racaOrigem', 'raca': 'racaOrigem', 'origem': 'racaOrigem',
  };
  function blocoDoGrupo(chave) { return POD_BLOCO_DE_GRUPO[chave] || 'classePoderes'; }
  //  A gaveta 'classe:guerreiro' pertence ao grupo 'classe', e a
  //  'distincao:aeronauta-goblin' ao grupo 'distincao'; as outras têm a
  //  chave igual ao grupo.
  function grupoDaGaveta(chaveGaveta) {
    if (chaveGaveta.slice(0, 7) === 'classe:') return 'classe';
    if (chaveGaveta.slice(0, 10) === 'distincao:') return 'distincao';
    return chaveGaveta;
  }
  //  Quantos poderes DAQUELA distinção a ficha tem — a conta que faz os
  //  poderes que escalam crescer (Heróis de Arton, p. 104). A MARCA não
  //  conta: ela é habilidade automática, não "poder da distinção".
  function nDistincao(f, slug) {
    if (!slug) return 0;
    return f.poderes.filter(p => p.grupo === 'distincao' && (p.distincao || '') === slug && !p.marca).length;
  }
  function blocoDaGaveta(chaveGaveta) { return blocoDoGrupo(grupoDaGaveta(chaveGaveta)); }
  function ressalvaDaVariante(chave) {
    const v = (window.GA_PODERES_CLASSE_VARIANTES || []).find(x => x.chave === chave);
    return (v && v.nota) ? v : null;
  }
  function gruposDePoder() {
    return (window.GA_PODERES_GRUPOS || []).concat(
      baseClasse().length ? [Object.assign({ quantos: baseClasse().length }, GRUPO_CLASSE)] : [GRUPO_CLASSE],
      [GRUPO_LIVRE]);
  }
  function grupoDePoder(chave) {
    return gruposDePoder().find(g => g.chave === chave) || GRUPO_LIVRE;
  }
  function daBasePoder(pid) {
    if (!pid) return null;
    if (Array.isArray(window.GA_PODERES)) {
      const x = window.GA_PODERES.find(p => p.id === pid);
      if (x) return x;
    }
    return baseClasse().find(p => p.id === pid) || null;
  }
  function fontePoder(p) {
    const nome = (window.GA_PODERES_LIVROS || {})[p.livro] || '';
    return nome ? nome + (p.pagina ? ', p. ' + p.pagina : '') : '';
  }
  //  O texto do livro: o da base quando ela está carregada; sem ela, a
  //  cópia que a ficha guardou na hora de adicionar.
  function textoDoPoder(p) {
    const b = daBasePoder(p.pid);
    const paras = (b && b.texto) || p.texto || [];
    const quadro = b && b.quadro;
    return paras.map(t => '<p>' + esc(t) + '</p>').join('') +
      (quadro ? '<div class="fi-pod-quadro"><strong>' + esc(quadro.titulo) + '</strong>' +
        (quadro.texto || []).map(t => '<p>' + esc(t) + '</p>').join('') + '</div>' : '');
  }

  //  ── A CONTA DA TORMENTA ──────────────────────────────────────────
  //  DOIS contadores, como o livro manda: a ESCALA de cada poder conta
  //  os poderes da Tormenta da ficha MAIS o que "conta como" um sem ser
  //  (Deformidade do lefou, p. 24: "cada um desses bônus conta como um
  //  poder da Tormenta, exceto para perda de Carisma"); a perda de
  //  CARISMA (p. 136) conta só os de verdade.
  //  A conta mora em js/ficha-tormenta.js — cópia da do Bestiário, por
  //  decisão dele: a ficha do jogador não toca no arquivo das criaturas.
  function poderesDaTormenta(f) { return f.poderes.filter(p => p.grupo === 'tormenta'); }
  function marcadosComoTormenta(f) {
    return f.poderes.filter(p => p.grupo !== 'tormenta' && p.contaTormenta);
  }
  function totalDaTormenta(f) {
    return poderesDaTormenta(f).length + marcadosComoTormenta(f).length + (f.tormentaConta || 0);
  }

  function blocoTormenta(f) {
    const T = window.GA_FICHA_TORMENTA;
    const meus = poderesDaTormenta(f);
    const marcados = marcadosComoTormenta(f);
    const soltos = f.tormentaConta || 0;
    if (!meus.length && !marcados.length && !soltos) return '';
    const n = meus.length + marcados.length + soltos;
    const car = T ? T.carismaPerdido(meus.length) : 0;
    const ids = meus.map(p => p.pid).filter(Boolean);
    const linhas = meus.map(p => {
      const e = T && T.escala(p.pid, n);
      const falta = T ? T.faltando(p.pid, ids) : [];
      return `
        <li class="fi-pod-esc">
          <span class="fi-pod-esc-nome">${esc(p.nome)}</span>
          ${e ? `<span class="fi-pod-esc-vale">${esc(e.txt)}</span>` : ''}
          ${e && e.calc ? `<em class="fi-pod-esc-conta">${esc(e.calc)}</em>` : ''}
          ${falta.length ? `<em class="fi-pod-esc-falta">⚠ falta ${esc(falta.join(', '))}</em>` : ''}
        </li>`;
    }).join('');
    return `
      <div class="fi-pod-tormenta">
        <h3 class="fi-pod-tormenta-tit">🩸 Poderes da Tormenta
          <span class="fi-pod-tormenta-n">${n} contando${n !== meus.length
            ? ` <em>(${meus.length} de verdade + ${n - meus.length} que contam como)</em>` : ''}</span>
        </h3>
        <p class="fi-pod-carisma">Carisma <strong>−${car}</strong>
          <em>(1 pelo primeiro + 1 a cada dois outros — p. 136)</em>
          — a ficha só mostra a conta; quem muda o Car na caixa de atributos é você.</p>
        <p class="fi-pod-comoconta">
          <span>Contam como poder da Tormenta sem ser um:</span>
          <button type="button" class="fi-mini" data-acao="tormenta-conta" data-delta="-1" ${soltos ? '' : 'disabled'}
                  title="Um a menos">−</button>
          <strong data-der="tormenta">${soltos}</strong>
          <button type="button" class="fi-mini" data-acao="tormenta-conta" data-delta="1"
                  title="Um a mais — os bônus da Deformidade do lefou (p. 24), por exemplo">＋</button>
          ${marcados.length ? `<em>e mais ${marcados.length} marcado${marcados.length > 1 ? 's' : ''} com 🩸 na lista</em>` : ''}
        </p>
        ${linhas ? `<ul class="fi-pod-escalas">${linhas}</ul>` : ''}
        ${atr(f, 'car') < -5 ? '<p class="fi-pod-aviso">⚠ Com Car abaixo de −5 o livro diz que o personagem vira NPC do mestre (p. 136).</p>' : ''}
      </div>`;
  }

  //  O cartão de um poder. O nome inteiro é o botão que recolhe e abre —
  //  uma ficha de nível alto tem poder demais para deixar tudo aberto.
  //  `pos`/`quantos` são o lugar DENTRO da gaveta em que o cartão está
  //  desenhado: as setas andam com os vizinhos que se vê, não com a
  //  lista crua (ver pod-sobe, em aoClicar).
  function cartaoPoder(f, p, i, pos, quantos) {
    const fechado = !!poderesFechados[p.id];
    const T = window.GA_FICHA_TORMENTA;
    const DIST = window.GA_FICHA_DISTINCOES;
    //  O "Agora:" de um poder que cresce: os da Tormenta contam TODOS os
    //  poderes da Tormenta; os de distinção contam só os da MESMA
    //  distinção (a marca fica de fora). Um poder nunca é dos dois.
    const escala = (p.grupo === 'tormenta' && T) ? T.escala(p.pid, totalDaTormenta(f))
      : (p.grupo === 'distincao' && DIST && p.distincao) ? DIST.escala(p.pid, nDistincao(f, p.distincao))
      : null;
    const fonte = fontePoder(p);
    const base = daBasePoder(p.pid);
    const magica = (base && base.magica) || p.magica;
    return `
      <li class="fi-pod${fechado ? ' fi-pod--fechado' : ''}${p.contaTormenta ? ' fi-pod--conta' : ''}">
        <button type="button" class="fi-pod-abrir" data-acao="dobra-poder" data-i="${i}"
                aria-expanded="${!fechado}"
                title="${fechado ? 'Abrir' : 'Recolher'} o texto de ${esc(p.nome)}">
          <span class="fi-pod-seta" aria-hidden="true">${fechado ? '▸' : '▾'}</span>
          <span class="fi-pod-nome">${esc(p.nome)}</span>
          ${magica ? `<span class="fi-pod-magica" title="${esc(DICA_MAGICA)}">✦<span>mágica</span></span>` : ''}
          ${p.tags ? `<span class="fi-pod-tag">${esc(p.tags)}</span>` : ''}
          ${p.deus ? `<span class="fi-pod-tag fi-pod-tag--deus">${esc(p.deus)}</span>` : ''}
          ${p.contaTormenta ? '<span class="fi-pod-tag fi-pod-tag--conta">🩸 conta como Tormenta</span>' : ''}
        </button>
        <span class="fi-pod-ordem">${setasDeOrdem('pod', i, pos, quantos, p.nome, '')}</span>
        <span class="fi-pod-acoes">
          ${p.pid ? '' : `<button type="button" class="fi-mini" data-acao="editar-poder" data-i="${i}"
                  title="Editar este poder escrito à mão">✍</button>`}
          ${p.grupo === 'tormenta' ? '' : `<button type="button" class="fi-mini fi-pod-conta-btn${p.contaTormenta ? ' fi-mini--on' : ''}"
                  data-acao="poder-conta" data-i="${i}" aria-pressed="${!!p.contaTormenta}"
                  title="${p.contaTormenta ? 'Parar de contar como poder da Tormenta'
                    : 'Marcar: conta como um poder da Tormenta sem ser um (Deformidade do lefou, p. 24)'}">🩸</button>`}
          <button type="button" class="fi-mini fi-mini--x" data-acao="tira-poder" data-i="${i}"
                  title="Tirar ${esc(p.nome)} da ficha">✕</button>
        </span>
        ${fechado ? '' : `
        <div class="fi-pod-corpo">
          ${fonte ? `<p class="fi-pod-fonte">${esc(fonte)}</p>` : ''}
          <div class="fi-pod-desc">${textoDoPoder(p)}</div>
          ${p.preReq ? `<p class="fi-pod-req"><strong>Pré-requisito:</strong> ${esc(p.preReq)}</p>` : ''}
          ${p.custo ? `<p class="fi-pod-req"><strong>Custo:</strong> ${esc(p.custo)}</p>` : ''}
          ${escala ? `<p class="fi-pod-agora"><strong>Agora:</strong> ${esc(escala.txt)}
            ${escala.calc ? `<em>${esc(escala.calc)}</em>` : ''}</p>` : ''}
          <input class="fi-txt fi-pod-obs" type="text" value="${esc(p.obs)}" data-campo="poderes.${i}.obs"
                 placeholder="sua anotação (quando usou, com o que combina…)" autocomplete="off">
        </div>`}
      </li>`;
  }

  //  ── AS GAVETAS, E A ORDEM DELAS (22/09/2026) ─────────────────────
  //  Cada gaveta é um grupo desenhado: 'combate', 'magia', e uma por
  //  classe ('classe:guerreiro'). Quem monta a lista é esta função — e
  //  ela é a mesma que o clique das setas consulta, para a ordem que se
  //  vê e a ordem que se move serem uma coisa só.
  //  Pedido dele: "jogar os poderes de Combate para cima, ou os de
  //  magia". A ordem de fábrica é a dos livros; as setas ⇈ ↑ ↓ do
  //  título escrevem a dele em f.poderesOrdem, e o que ela não citar
  //  continua na ordem do livro, depois do que foi escolhido.
  function gavetasDePoder(f) {
    const porGrupo = {};
    f.poderes.forEach((p, i) => { (porGrupo[p.grupo] || (porGrupo[p.grupo] = [])).push({ p: p, i: i }); });
    const saida = [];
    gruposDePoder().filter(g => porGrupo[g.chave]).forEach(g => {
      //  Os de classe ganham uma gaveta POR CLASSE: numa ficha
      //  multiclasse, saber de quem é cada poder é metade da leitura.
      if (g.chave === 'classe') {
        const porClasse = {};
        porGrupo.classe.forEach(x => {
          const k = x.p.classe || '';
          (porClasse[k] || (porClasse[k] = [])).push(x);
        });
        Object.keys(porClasse).forEach(k => {
          const L = listaDeClasse(k), C = D.classe(k);
          saida.push({
            chave: 'classe:' + k,
            titulo: 'Poderes de ' + ((L && L.nome) || (C && C.nome) || 'classe'),
            emoji: g.emoji, itens: porClasse[k],
          });
        });
        return;
      }
      //  As distinções também ganham uma gaveta CADA — porque o
      //  escalonamento conta só os poderes da MESMA distinção, então vê-los
      //  juntos é o que faz a conta do "Agora:" fazer sentido.
      if (g.chave === 'distincao') {
        const porDist = {};
        porGrupo.distincao.forEach(x => {
          const k = x.p.distincao || '';
          (porDist[k] || (porDist[k] = [])).push(x);
        });
        Object.keys(porDist).forEach(k => {
          const nome = k ? (porDist[k][0].p.tags || 'Distinção') : 'Distinção (escrita à mão)';
          saida.push({
            chave: k ? 'distincao:' + k : 'distincao',
            titulo: nome, emoji: g.emoji, itens: porDist[k],
          });
        });
        return;
      }
      saida.push({ chave: g.chave, titulo: g.nome, emoji: g.emoji, itens: porGrupo[g.chave] });
    });
    const ordem = f.poderesOrdem || [];
    const lugar = g => { const i = ordem.indexOf(g.chave); return i < 0 ? ordem.length : i; };
    saida.forEach((g, i) => { g.pos = i; });          // o desempate: a ordem do livro
    saida.sort((a, b) => (lugar(a) - lugar(b)) || (a.pos - b.pos));
    return saida;
  }

  //  As gavetas de UM dos dois cartões de baixo, já na ordem. A posição
  //  de cada uma é recomputada DENTRO do cartão — é ela que as setas
  //  ⇈ ↑ ↓ do título da gaveta usam para andar sem sair do cartão.
  function gavetasDoBloco(f, campo) {
    return gavetasDePoder(f).filter(g => blocoDaGaveta(g.chave) === campo);
  }
  //  Quantos poderes DOS LIVROS caem neste cartão — para o rótulo do
  //  cabeçalho e a dica da busca. Os de classe só contam no de classe.
  function baseDoBloco(campo) {
    const geral = (window.GA_PODERES || []).filter(p => blocoDoGrupo(p.grupo) === campo).length;
    return geral + (campo === 'classePoderes' ? baseClasse().length : 0);
  }
  //  Os poderes da ficha que moram neste cartão.
  function poderesDoBloco(f, campo) {
    return f.poderes.filter(p => blocoDoGrupo(p.grupo) === campo);
  }

  //  Uma gaveta desenhada: o título, as setas que a movem inteira, e os
  //  cartões com a posição que cada um ocupa NELA (é com essa posição
  //  que as setas do poder andam). `itens` são pares { p, i } — o poder
  //  e o índice guardado.
  function gavetaDePoder(f, g, pos, quantas, campo) {
    const n = g.itens.length;
    return `
      <div class="fi-pod-grupo">
        <h3 class="fi-pod-grupo-tit">
          <span class="fi-pod-emoji" aria-hidden="true">${g.emoji}</span>${esc(g.titulo)}
          <em>${n} poder${n > 1 ? 'es' : ''}</em>
          ${quantas > 1 ? `<span class="fi-pod-ordem fi-pod-grupo-ordem">${
            setasDeOrdem('podgrp', pos, pos, quantas, 'a gaveta ' + g.titulo,
                         ' data-k="' + esc(g.chave) + '" data-bloco="' + esc(campo || '') + '"')}</span>` : ''}
        </h3>
        <ul class="fi-pod-lista">${g.itens.map((x, i) =>
          cartaoPoder(f, x.p, x.i, i, n)).join('')}</ul>
      </div>`;
  }

  //  ── HABILIDADES DE CLASSE AUTOMÁTICAS (24/09/2026) ────────────────
  //  As habilidades FIXAS da tabela de cada classe (Devoto Fiel, Fúria,
  //  Inspiração, Mão da Divindade…) não se escolhem: vêm por NÍVEL. Elas
  //  aparecem sozinhas no topo do cartão ⚔, uma gaveta por classe da
  //  ficha, mostrando só as que o nível daquela classe já alcançou.
  //  Fonte: js/habilidades-classe-data.js. Só as classes que estão nesse
  //  mapa entram — as 14 variantes têm fixas PRÓPRIAS (Heróis de Arton
  //  reimprime cada tabela) e ainda não foram transcritas, então não
  //  recebem nada, em vez de herdar da básica (que seria errado). Cada
  //  cartão recolhe/abre como um poder (dobra-fixa), guardado com a chave
  //  'fixa:<classe>:<nome>' no mesmo poderesFechados.
  function fixasDaClasse(f) {
    const MAPA = window.GA_HABILIDADES_CLASSE;
    if (!MAPA) return '';
    const partes = [];
    (f.classes || []).forEach(c => {
      const chave = (c && c.classe) || '';
      const nivel = (c && c.nivel) || 0;
      const lista = MAPA[chave];
      if (!chave || !Array.isArray(lista)) return;
      const fixas = lista.filter(a => nivel >= a.nivel);
      if (!fixas.length) return;
      const C = D.classe(chave);
      const nomeClasse = (C && C.nome) || chave;
      const cards = fixas.map(a => {
        const key = 'fixa:' + chave + ':' + a.nome;
        const fechado = !!poderesFechados[key];
        return `
        <li class="fi-pod fi-pod--fixa${fechado ? ' fi-pod--fechado' : ''}">
          <button type="button" class="fi-pod-abrir" data-acao="dobra-fixa" data-k="${esc(key)}"
                  aria-expanded="${!fechado}" title="${fechado ? 'Abrir' : 'Recolher'} ${esc(a.nome)}">
            <span class="fi-pod-seta" aria-hidden="true">${fechado ? '▸' : '▾'}</span>
            <span class="fi-pod-nome">${esc(a.nome)}</span>
            ${a.magica ? `<span class="fi-pod-magica" title="${esc(DICA_MAGICA)}">✦<span>mágica</span></span>` : ''}
            <span class="fi-pod-tag">${a.nivel}º nível</span>
          </button>
          ${fechado ? '' : `<div class="fi-pod-corpo"><div class="fi-pod-desc">${esc(a.texto)}</div></div>`}
        </li>`;
      }).join('');
      partes.push(`
        <div class="fi-pod-grupo fi-pod-grupo--fixa">
          <h3 class="fi-pod-grupo-tit">
            <span class="fi-pod-emoji" aria-hidden="true">🎓</span>Habilidades de ${esc(nomeClasse)}
            <em>automáticas, por nível</em>
          </h3>
          <ul class="fi-pod-lista">${cards}</ul>
        </div>`);
    });
    return partes.join('');
  }

  //  Um dos dois cartões de baixo, agora com os poderes do grupo dele —
  //  o que era o ✨ Poderes, fragmentado (23/09/2026). `campo` é
  //  'racaOrigem' ou 'classePoderes'. Cada um tem os seus botões (só
  //  mexem nos poderes DELE), as suas gavetas, e a caixa de texto livre
  //  que já existia, embaixo. A conta da Tormenta mora no de classe.
  function blocoDePoderes(f, campo) {
    const b = BLOCOS.find(x => x.campo === campo) || { campo: campo, titulo: campo, dica: '' };
    const daClasse = campo === 'classePoderes';
    const nBase = baseDoBloco(campo);
    const meus = poderesDoBloco(f, campo);
    const todosFechados = meus.length > 0 && meus.every(p => poderesFechados[p.id]);
    const gavetas = gavetasDoBloco(f, campo);
    const grupos = gavetas.map((g, pos) => gavetaDePoder(f, g, pos, gavetas.length, campo)).join('');
    const mexida = (f.poderesOrdem || []).some(k => blocoDaGaveta(k) === campo);
    const vazia = daClasse
      ? `<p class="fi-pod-vazia">Nenhum poder ainda. O <strong>＋ Adicionar poder</strong> abre a busca nos
          ${nBase || 808} poderes deste cartão — <strong>classe</strong> (com uma gaveta para cada uma das 16),
          combate, destino, magia, concedidos, Tormenta, grupo e distinção. Para o que não está em livro nenhum,
          o <strong>✍ Escrever</strong>.</p>`
      : `<p class="fi-pod-vazia">Nenhuma habilidade ainda. O <strong>＋ Adicionar</strong> abre a busca nas
          <strong>habilidades de raça</strong>, nos <strong>poderes de raça</strong> e nos
          <strong>poderes de origem</strong> dos livros. Para o que não está em livro nenhum, o
          <strong>✍ Escrever</strong>.</p>`;

    return `
      <div class="fi-cartao fi-bloco fi-poderes fi-poderes--${campo}">
        <h2 class="fi-cartao-tit">${b.titulo}
          <span class="fi-cartao-nota">${meus.length} na ficha${nBase
            ? ' · ' + nBase + ' nos livros' + (daClasse ? ', com os de classe' : '') : ''}</span>
          <span class="fi-pod-botoes">
            ${mexida ? `<button type="button" class="fi-add fi-add--menor" data-acao="pod-ordem-livro" data-bloco="${campo}"
                    title="Devolver as gavetas deste cartão à ordem dos livros"
              >↺ Ordem do livro</button>` : ''}
            ${meus.length > 1 ? `<button type="button" class="fi-add fi-add--menor" data-acao="dobra-poderes" data-bloco="${campo}"
                    title="${todosFechados ? 'Mostrar o texto de todos' : 'Deixar só os nomes'}"
              >${todosFechados ? '▾ Abrir todos' : '▸ Recolher todos'}</button>` : ''}
            <button type="button" class="fi-add fi-add--menor" data-acao="escrever-poder" data-bloco="${campo}"
                    title="Um poder que não está na base: o caseiro, o que o mestre inventou">✍ Escrever</button>
            <button type="button" class="fi-add fi-add--menor fi-pod-add" data-acao="add-poder" data-bloco="${campo}" ${nBase ? '' : 'disabled'}>
              ＋ Adicionar${daClasse ? ' poder' : ''}</button>
          </span>
        </h2>
        ${daClasse ? blocoTormenta(f) + fixasDaClasse(f) : ''}
        ${grupos || vazia}
        <p class="fi-nota">Cada poder traz o <strong>texto inteiro</strong> do livro, com a página. Clique no
          <strong>nome</strong> para recolher ou abrir, e use <strong>⇈ ↑ ↓</strong> para pôr na ordem que você quer
          ler — as setas <em>do cartão</em> andam com o poder dentro da gaveta dele, e as setas <em>do título de
          cada gaveta</em> levam a gaveta inteira para cima ou para baixo.${daClasse ? ` O <strong>🩸</strong> de um
          poder marca que ele <em>conta como</em> poder da Tormenta sem ser um: entra na escala dos outros, mas não
          na perda de Carisma.` : ''} O <strong>✦</strong> é do livro: aquele poder é uma habilidade
          <em>mágica</em>.</p>
        ${caixaRica(f, b)}
      </div>`;
  }

  function blocoMagias(f) {
    const temBase = Array.isArray(window.GA_MAGIAS) && window.GA_MAGIAS.length;
    const todasFechadas = f.magias.length > 0 && f.magias.every(m => magiasFechadas[m.id]);
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
          <span class="fi-mag-botoes">
            ${f.magias.length > 1 ? `<button type="button" class="fi-add fi-add--menor fi-mag-dobra" data-acao="dobra-magias"
                    title="${todasFechadas ? 'Mostrar o texto de todas as magias' : 'Deixar só os nomes, para achar uma magia (ou chegar ao inventário) sem descer tanto'}"
              >${todasFechadas ? '▾ Abrir todas' : '▸ Recolher todas'}</button>` : ''}
            <button type="button" class="fi-add fi-add--menor fi-mag-add" data-acao="add-magia" ${temBase ? '' : 'disabled'}>
              ＋ Adicionar magia</button>
          </span>
        </h2>
        ${grupos || '<p class="fi-mag-vazia">Nenhuma magia ainda. O <strong>＋ Adicionar magia</strong> abre a busca nas ' +
          (temBase ? window.GA_MAGIAS.length : 254) + ' magias do livro — as mesmas da aba 📚 Consultas.</p>'}
        <p class="fi-nota">Cada magia traz o <strong>texto inteiro</strong> do livro. Clique no <strong>nome</strong>
          para recolher ou abrir uma delas, e o <strong>▸ Recolher todas</strong> deixa só os nomes — para achar
          uma magia, ou chegar ao inventário, sem descer a página inteira.
          Os <strong>＋ aprimoramentos</strong> ligam e desligam: o total em PM se acerta sozinho, e fica
          guardado para a próxima vez. O <strong>🔥</strong> gasta esse total — <em>dos temporários
          primeiro</em>, como manda a p. 105.</p>
        ${caixaRica(f, BLOCOS_EMBUTIDOS[0])}
      </div>`;
  }

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
            ${a.requer ? `<span class="fi-apr-marca fi-apr-marca--req" title="Este aprimoramento só pode ser usado por quem lança magias de ${a.requer}º círculo">requer ${a.requer}º círculo</span>` : ''}
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

  // O cartão de uma magia na ficha. O nome inteiro é o botão que
  // recolhe e abre: recolhida, sobra a linha do nome, com o 🔥 à mão
  // para lançar sem precisar abrir.
  function cartaoMagia(f, m, i) {
    const p = pmDaMagia(m);
    const fechada = !!magiasFechadas[m.id];
    return `
      <li class="fi-mag${fechada ? ' fi-mag--fechada' : ''}">
        <button type="button" class="fi-mag-abrir" data-acao="dobra-magia" data-i="${i}"
                aria-expanded="${!fechada}"
                title="${fechada ? 'Abrir' : 'Recolher'} o texto de ${esc(m.nome)}">
          <span class="fi-mag-seta" aria-hidden="true">${fechada ? '▸' : '▾'}</span>
          <span class="fi-mag-nome">${esc(m.nome)}</span>
          ${m.escola ? `<span class="fi-mag-tag">${esc(m.escola)}</span>` : ''}
          ${m.tipo ? `<span class="fi-mag-tag fi-mag-tag--tipo">${esc(m.tipo)}</span>` : ''}
        </button>
        <span class="fi-mag-acoes">
          ${p.total ? `<button type="button" class="fi-mag-pm-btn${p.extra ? ' fi-mag-pm-btn--apr' : ''}"
                  data-acao="gastar-magia" data-i="${i}"
                  title="Gastar ${p.total} PM${p.extra ? ' (' + p.base + ' da magia + ' + p.extra + ' de aprimoramento)' : ''} — os temporários saem primeiro"
            >🔥 ${p.total} PM</button>` : ''}
          <button type="button" class="fi-mini fi-mini--x" data-acao="tira-magia" data-i="${i}"
                  title="Tirar ${esc(m.nome)} da ficha">✕</button>
        </span>
        ${fechada ? '' : `
        <div class="fi-mag-corpo">
          <div class="fi-mag-linha">
            ${campoMag('Execução', m.execucao)}${campoMag('Alcance', m.alcance)}
            ${campoMag('Alvo', m.alvo)}${campoMag('Duração', m.duracao)}
            ${campoMag('Resistência', m.resistencia)}
          </div>
          <div class="fi-mag-desc">${descricaoDaMagia(m)}</div>
          ${blocoAprimoramentos(f, m, i)}
          <input class="fi-txt fi-mag-obs" type="text" value="${esc(m.obs)}" data-campo="magias.${i}.obs"
                 placeholder="sua anotação (alvo preferido, quem costuma acompanhar…)" autocomplete="off">
        </div>`}
      </li>`;
  }
  function campoMag(rot, v) {
    return v ? `<span class="fi-mag-campo"><em>${esc(rot)}</em> ${esc(v)}</span>` : '';
  }
  // O texto do livro no cartão: a descrição e o truque. Os
  // aprimoramentos não se repetem aqui — estão logo abaixo, com botão.
  // Sem a base carregada (ficha exportada, site sem as magias), fica o
  // resumo que a ficha guardou ao adicionar.
  function descricaoDaMagia(m) {
    const b = daBase(m.mid);
    if (!b) return m.resumo ? '<p>' + esc(m.resumo) + '</p>' : '';
    return (b.descricao || []).map(p => '<p>' + esc(p) + '</p>').join('') +
      (b.truque ? '<p class="fi-mag-truque"><strong>Truque.</strong> ' + esc(b.truque) + '</p>' : '');
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
          <span class="fi-inv-ordem">
            <button type="button" class="fi-mini" data-acao="inv-topo" data-i="${i}" ${i === 0 ? 'disabled' : ''}
                    title="Levar para o topo da lista" aria-label="Levar ${esc(it.nome || 'este item')} para o topo">⇈</button>
            <button type="button" class="fi-mini" data-acao="inv-sobe" data-i="${i}" ${i === 0 ? 'disabled' : ''}
                    title="Mover para cima" aria-label="Mover ${esc(it.nome || 'este item')} para cima">↑</button>
            <button type="button" class="fi-mini" data-acao="inv-desce" data-i="${i}" ${i === f.inventario.length - 1 ? 'disabled' : ''}
                    title="Mover para baixo" aria-label="Mover ${esc(it.nome || 'este item')} para baixo">↓</button>
          </span>
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
          <span>Item</span><span>Quantas</span><span>Espaços</span><span>Ocupa</span><span>Anotação</span><span>Ordem</span><span></span>
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

  // Uma linha "tem conteúdo" quando tem algo que se leia: nome, anotação
  // ou texto. O texto rico pode sobrar só com tags vazias ("<br>"), então
  // conta o que aparece, não o HTML.
  function temConteudo() {
    return Array.prototype.some.call(arguments, v =>
      String(v || '').replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim() !== '');
  }

  // Depois de mover, o item que andou continua EMBAIXO DO PONTEIRO — a
  // página rola o tanto que a linha andou — e com o foco do teclado. Sem
  // isso, o segundo clique no mesmo lugar acertava o vizinho, que tinha
  // ido para onde o item estava, e desfazia o primeiro. O ⇈ é a exceção:
  // o item foi para o topo, e é lá que se quer vê-lo.
  //  `acao` é '<prefixo>-sobe' / '-desce' / '-topo', e `filtro` afina a
  //  busca quando a mesma ação existe em mais de uma lista na tela (os
  //  três cartões de resistência, RD e imunidade).
  function seguirItem(acao, i, antes, filtro) {
    if (!secao) return;
    const pre = acao.slice(0, acao.lastIndexOf('-'));
    const q = a => secao.querySelector('[data-acao="' + a + '"][data-i="' + i + '"]' + (filtro || ''));
    const mesmo = q(acao);
    if (!mesmo) return;
    if (acao === pre + '-topo') mesmo.scrollIntoView({ block: 'nearest' });
    else window.scrollBy(0, mesmo.getBoundingClientRect().top - antes);
    // chegou na ponta, o botão apagou: o foco vai para a seta do outro lado
    const foco = !mesmo.disabled ? mesmo : q(acao === pre + '-desce' ? pre + '-sobe' : pre + '-desce');
    if (foco && !foco.disabled) foco.focus({ preventScroll: true });
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
  //  Raça e origem e Classe e poderes viraram cartões de poder (têm
  //  gavetas, busca e os botões); Anotações continua caixa de texto pura.
  function blocoTextos(f) {
    //  Raça/origem e Classe/poderes já foram desenhados lá em cima (logo
    //  após Ataques); aqui sobra só a caixa de texto pura (📜 Anotações).
    return BLOCOS
      .filter(b => b.campo !== 'racaOrigem' && b.campo !== 'classePoderes')
      .map(b => `<div class="fi-cartao fi-bloco">
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
      if (d.slice(0, 7) === 'passos:') {
        const a = f.ataques[+d.slice(7)];
        if (a) {
          el.innerHTML = linhaDePassos(a);
          el.hidden = !passosDe(a.passos);
          el.classList.toggle('fi-atq-passos--aviso', avisoDePassos(a));
        }
        return;
      }
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
      if (d === 'desloc')    el.textContent = deslocamento(f);
      if (d === 'desloc2')   el.textContent = f.deslocamento;
      if (d === 'quadrados') el.textContent = quadrados(deslocamento(f));
      if (d === 'desloconta') { el.innerHTML = contaDesloc(f); el.hidden = !contaDesloc(f); }
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
      // 🩶 os PV manchados: o pedaço riscado no fim da barra, o selo ao
      // lado do medidor e a conta do teto
      if (d === 'pvbarramancha') el.style.width = fatia(manchado(f), pvMax(f), f.pv.temp) + '%';
      if (d === 'pvmanchaselo') {
        const m = manchado(f);
        el.hidden = !m;
        el.title = 'PV manchados: a cura para no ' + tetoPv(f) + ', e esses pontos só voltam quando a ' +
                   'condição de cada mancha for cumprida';
        const forte = el.querySelector('strong');
        if (forte) forte.textContent = m;
      }
      if (d === 'manchaconta') { el.innerHTML = contaManchas(f); el.hidden = !manchado(f); }
      // ✋ o preço das sustentadas, por turno
      if (d === 'sustconta') { el.innerHTML = contaSustentadas(f); el.hidden = !el.innerHTML; }
    });
    // A marca de "este atributo não é o do livro" acende e apaga junto
    // com o <select>. Fica aqui, e não num render(), porque redesenhar a
    // ficha por causa de uma sigla arrancaria a rolagem pendurada na
    // linha e o cursor de quem estivesse escrevendo ao lado.
    secao.querySelectorAll('[data-livro]').forEach(sel => {
      sel.classList.toggle('fi-sel--trocado', sel.value !== sel.dataset.livro);
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
    // e a dica do 💥 Crítico segue o que está escrito no campo "19/×3" —
    // com o dado já andado pelos passos
    secao.querySelectorAll('[data-acao="rolar-critico"]').forEach(b => {
      const a = f.ataques[+b.dataset.i];
      if (a) b.title = tituloCritico(danoDoAtaque(a).expr, multiplicadorCritico(a.critico));
    });
    secao.querySelectorAll('[data-acao="rolar-dano"]').forEach(b => {
      const a = f.ataques[+b.dataset.i];
      if (a) b.title = tituloDano(a);
    });
    // o campo de passos acende quando sai do zero, como o atributo trocado
    secao.querySelectorAll('.fi-num--passos').forEach(el => {
      el.classList.toggle('fi-num--andou', (parseInt(el.value, 10) || 0) !== 0);
    });
    secao.querySelectorAll('[data-acao="am-rolar-crit"]').forEach(b => {
      const a = f.amigos[+b.dataset.i], x = a && a.ataques[+b.dataset.j];
      if (x) b.title = tituloCritico(danoAmigo(f, a, x), multiplicadorCritico(x.critico));
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
      case 'passos': {
        const extra = passosDosTruques(a).length;
        el.innerHTML = linhaDePassos(x, extra, fontesDePassos(x, a));
        el.hidden = !(passosDe(x.passos) + extra);
        el.classList.toggle('fi-atq-passos--aviso', avisoDePassos(x, extra));
        break;
      }
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
      return;
    }
    //  Mudar o NÍVEL de uma classe (input numérico) altera QUAIS habilidades
    //  de classe automáticas já foram alcançadas — e o total de poderes etc.
    //  Isso vai no 'change' (commit), não no 'input': redesenhar a cada tecla
    //  atrapalharia a digitação. (Os números derivados já saem no 'input'.)
    if (el.type === 'number' && /^classes\.\d+\.nivel$/.test(el.dataset.campo || '')) {
      return render();
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
    // a Tabela 3-2 recolhida lembra se está aberta, para um render não a
    // fechar na cara de quem está lendo (o clique vem ANTES de abrir)
    if (acao === 'passos-tabela') { tabelaPassosAberta = !(btn.closest('details') || {}).open; return; }
    // o ✕ da pílula: some com a rolagem daqui. A da mesa (o painel
    // 🎲 Rolagens) continua lá — aquela é o histórico de todo mundo
    if (acao === 'fecha-res') {
      delete resultados[btn.dataset.slot];
      return pintarResultado(btn.dataset.slot);
    }
    if (!f) return;

    // ── A CONFERÊNCIA: a escolha de quem está com a ficha ──────────
    if (acao === 'sinc-de-la' || acao === 'sinc-daqui' || acao === 'sinc-voltar' || acao === 'sinc-descartar') {
      return decidirSincronia(f, acao);
    }

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
      if (!dono) esquecerSincronia(f.id);
      dados.aberta = dados.fichas.length ? dados.fichas[0].id : null;
      gravar(); return render();
    }
    if (acao === 'add-classe')  { f.classes.push({ classe: '', nivel: 1 }); salvar(); return render(); }
    if (acao === 'tira-classe') { f.classes.splice(+btn.dataset.i, 1); if (!f.classes.length) f.classes.push({ classe: '', nivel: 1 }); salvar(); return render(); }
    if (acao === 'add-ataque')  { f.ataques.push({ id: novoId(), nome: '', pericia: 'luta', extra: 0, dano: '', passos: 0, critico: '', tipo: '', alcance: '', notas: '', aberto: true }); salvar(); return render(); }

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
    // ⇈ ↑ ↓ (17/09/2026): "quero que o novo item esteja lá em cima em
    // vez de eu ficar escrevendo tudo para baixo"
    if (acao === 'apara-sobe' || acao === 'apara-desce' || acao === 'apara-topo') {
      const c = btn.dataset.campo;
      if (!Array.isArray(f[c])) return;
      const de = +btn.dataset.i;
      const para = acao === 'apara-topo' ? 0 : de + (acao === 'apara-sobe' ? -1 : 1);
      if (!f[c][de] || para < 0 || para >= f[c].length || para === de) return;
      const antes = btn.getBoundingClientRect().top;
      const [x] = f[c].splice(de, 1);
      f[c].splice(para, 0, x);
      sujar(f.id, c); salvar(); render();
      seguirItem(acao, para, antes, ' [data-campo="' + c + '"]');
      return;
    }

    // ── O QUE MEXE NO DESLOCAMENTO ─────────────────────────────────
    if (acao === 'add-desloc') {
      f.deslocMods.push({ id: novoId(), valor: -3, de: '' });
      sujar(f.id, 'deslocMods'); salvar(); return render();
    }
    if (acao === 'tira-desloc') {
      f.deslocMods.splice(+btn.dataset.i, 1);
      sujar(f.id, 'deslocMods'); salvar(); return render();
    }

    // ── CONDIÇÕES ──────────────────────────────────────────────────
    if (acao === 'add-condicao')  return abrirBuscaCondicao(f);
    if (acao === 'tira-condicao') {
      f.condicoes.splice(+btn.dataset.i, 1);
      sujar(f.id, 'condicoes'); salvar(); return render();
    }
    // "a menos que especificado o contrário, condições terminam no fim
    // da cena" (p. 394) — o botão é esse fim de cena, de uma vez. As
    // escritas saem junto: a sustentada acaba quando ninguém mais paga
    // o PM, e é no fim da cena que isso acontece.
    if (acao === 'limpa-condicoes') {
      const quantas = f.condicoes.length + condLivres(f).length;
      if (!quantas) return;
      if (!confirm('Tirar as ' + quantas + ' condições desta ficha?\n\n' +
                   'É o que acontece no fim da cena — mas as que duram mais que ela saem junto, ' +
                   'e o que você escreveu nas linhas ✋ e ✎ vai junto também.')) return;
      f.condicoes = [];
      f.condicoesLivres = [];
      sujar(f.id, 'condicoes'); sujar(f.id, 'condicoesLivres'); salvar(); return render();
    }
    // ── AS DUAS CAIXAS ESCRITAS: ✋ Sustentada e ✎ Outros ──────────
    if (acao === 'add-livre') {
      f.condicoesLivres.push({
        id: novoId(),
        tipo: btn.dataset.tipo === 'sustentada' ? 'sustentada' : 'outros',
        texto: '', magia: false,
      });
      sujar(f.id, 'condicoesLivres'); salvar(); return render();
    }
    if (acao === 'tira-livre') {
      const c = f.condicoesLivres[+btn.dataset.i];
      if (!c) return;
      if (temConteudo(c.texto) &&
          !confirm('Tirar esta linha' + (c.tipo === 'sustentada' ? ' de sustentada' : '') + '?\n\n' +
                   '"' + c.texto + '"')) return;
      f.condicoesLivres.splice(+btn.dataset.i, 1);
      sujar(f.id, 'condicoesLivres'); salvar(); return render();
    }
    // o ✦: esta sustentada é uma MAGIA — "apenas uma magia sustentada
    // por vez" (p. 227), e a conta avisa quando passa de uma
    if (acao === 'livre-magia') {
      const c = f.condicoesLivres[+btn.dataset.i];
      if (!c) return;
      c.magia = !c.magia;
      sujar(f.id, 'condicoesLivres'); salvar(); return render();
    }
    // o ✕ do ataque mora colado no ✎ — no dedo, errar um pelo outro é
    // fácil; a pergunta só aparece se houver algo escrito
    if (acao === 'tira-ataque') {
      const a = f.ataques[+btn.dataset.i];
      if (!a) return;
      if (temConteudo(a.nome, a.dano, a.notas) &&
          !confirm('Tirar o ataque "' + (a.nome || 'sem nome') + '"?' +
                   (temConteudo(a.notas) ? '\n\nO texto escrito nele vai junto.' : ''))) return;
      f.ataques.splice(+btn.dataset.i, 1);
      sujar(f.id, 'ataques'); salvar(); return render();
    }
    // o texto da arma dobra e desdobra, e o estado fica guardado, como o
    // do item do inventário
    if (acao === 'atq-texto') {
      const a = f.ataques[+btn.dataset.i];
      if (a) { a.aberto = !a.aberto; sujar(f.id, 'ataques'); salvar(); render(); }
      return;
    }

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
    // ── 🩶 PV MANCHADOS ────────────────────────────────────────────
    if (acao === 'add-mancha') {
      f.pv.manchas.push({ id: novoId(), pontos: 0, motivo: '' });
      sujar(f.id, 'pv'); salvar(); return render();
    }
    if (acao === 'tira-mancha') {
      f.pv.manchas.splice(+btn.dataset.i, 1);
      sujar(f.id, 'pv'); salvar(); return render();
    }
    // o ✓: cumpriu a condição (dormiu a noite, achou a magia). A mancha
    // sai E os pontos voltam — que é o que se quer com um clique só.
    if (acao === 'cura-mancha') {
      const i = +btn.dataset.i, m = f.pv.manchas[i];
      if (!m) return;
      const pontos = Math.max(0, m.pontos || 0);
      f.pv.manchas.splice(i, 1);
      sujar(f.id, 'pv');
      if (pontos) aplicarCura(f, 'pv', pontos);    // já salva e escreve o eco
      else salvar();
      return render();
    }
    // marcou a mancha e ainda não tinha tirado o dano: o botão do aviso
    if (acao === 'mancha-dano') {
      const sobra = pvAtual(f) - tetoPv(f);
      if (sobra <= 0) return;
      aplicarDano(f, 'pv', sobra, 'PV manchados');
      return;
    }

    // ── XP: SOMAR, E O CADERNO ─────────────────────────────────────
    //  "eu coloco 400 e o sistema já calcula com a soma" — e a linha
    //  fica anotada, para no fim da sessão seguinte dar para saber se o
    //  XP daquela noite já entrou.
    if (acao === 'xp-log') { xpLogAberto = !(btn.closest('details') || {}).open; return; }
    if (acao === 'xp-somar') {
      const campo = secao.querySelector('#fiXpQuanto');
      const nota  = secao.querySelector('#fiXpNota');
      const quanto = parseInt((campo && campo.value) || '', 10);
      if (!quanto) { if (campo) campo.focus(); return; }
      f.xp = Math.max(0, (f.xp || 0) + quanto);
      f.xpLog.unshift({
        quando: Date.now(), quanto: quanto,
        nota: ((nota && nota.value) || '').trim(), total: f.xp,
      });
      f.xpLog = f.xpLog.slice(0, XPLOG_MAX);
      xpLogAberto = true;                          // somou: o caderno abre na linha nova
      sujar(f.id, 'xp'); sujar(f.id, 'xpLog');
      salvar(); return render();
    }
    if (acao === 'xp-desfaz') {
      const i = +btn.dataset.i, x = f.xpLog[i];
      if (!x) return;
      const volta = Math.max(0, (f.xp || 0) - x.quanto);
      if (!confirm('Desfazer ' + sinalXp(x.quanto) + ' XP' + (x.nota ? ' (' + x.nota + ')' : '') + '?\n\n' +
                   'O total volta para ' + num(volta) + ', e a linha sai do caderno.')) return;
      f.xp = volta;
      f.xpLog.splice(i, 1);
      // as linhas MAIS NOVAS que ela diziam um total que já não existe
      for (let k = 0; k < i; k++) f.xpLog[k].total = Math.max(0, f.xpLog[k].total - x.quanto);
      sujar(f.id, 'xp'); sujar(f.id, 'xpLog');
      salvar(); return render();
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
      if (o) rolar(d20(valorOficio(f, i)),
                   quem(f) + ' · ' + nomeRolado(D.pericia('oficio'), o, nomeOficio(o)), 'of:' + i);
      return;
    }

    // ── INVENTÁRIO ─────────────────────────────────────────────────
    if (acao === 'add-item') {
      f.inventario.push({ id: novoId(), nome: '', qtd: 1, espacos: 1, cada: true, obs: '' });
      salvar(); return render();
    }
    // Tirar pergunta antes — "às vezes sem querer eu posso remover um item
    // que eu não queria" (11/09/2026). A linha em branco sai sem pergunta:
    // é quase sempre o ＋ apertado a mais.
    if (acao === 'tira-item') {
      const it = f.inventario[+btn.dataset.i];
      if (!it) return;
      if (temConteudo(it.nome, it.obs, it.notas) &&
          !confirm('Tirar "' + (it.nome || 'este item') + '" do inventário?' +
                   (it.notas ? '\n\nO texto escrito nele vai junto.' : ''))) return;
      f.inventario.splice(+btn.dataset.i, 1);
      sujar(f.id, 'inventario'); salvar(); return render();
    }
    // A ordem: ↑ e ↓ um passo, e ⇈ direto para o topo ("adicionei um
    // item mas eu quero que ele esteja no topo!").
    if (acao === 'inv-sobe' || acao === 'inv-desce' || acao === 'inv-topo') {
      const de = +btn.dataset.i;
      const para = acao === 'inv-topo' ? 0 : de + (acao === 'inv-sobe' ? -1 : 1);
      if (!f.inventario[de] || para < 0 || para >= f.inventario.length || para === de) return;
      const antes = btn.getBoundingClientRect().top;
      const [it] = f.inventario.splice(de, 1);
      f.inventario.splice(para, 0, it);
      sujar(f.id, 'inventario'); salvar(); render();
      seguirItem(acao, para, antes);
      return;
    }
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

    // ── PODERES ────────────────────────────────────────────────────
    if (acao === 'add-poder')      return abrirBuscaPoder(f, btn.dataset.bloco);
    if (acao === 'escrever-poder') return escreverPoder(f, undefined, btn.dataset.bloco);
    if (acao === 'editar-poder')   return escreverPoder(f, +btn.dataset.i);
    if (acao === 'tira-poder') {
      const p = f.poderes[+btn.dataset.i];
      if (!p) return;
      if (!confirm('Tirar ' + (p.nome || 'este poder') + ' da ficha?' +
                   (p.obs ? '\n\nA sua anotação vai junto.' : ''))) return;
      if (poderesFechados[p.id]) { delete poderesFechados[p.id]; guardarPodFechados(); }
      f.poderes.splice(+btn.dataset.i, 1);
      sujar(f.id, 'poderes'); salvar(); return render();
    }
    //  ⇈ ↑ ↓ do poder: andam DENTRO da gaveta em que o cartão está —
    //  o grupo, e nos de classe a classe. A lista guardada é uma só e
    //  intercalada, então o vizinho da tela quase nunca é o vizinho de
    //  índice: quem manda é a ordem desenhada.
    if (acao === 'pod-sobe' || acao === 'pod-desce' || acao === 'pod-topo') {
      const de = +btn.dataset.i;
      const p = f.poderes[de];
      if (!p) return;
      const irmaos = [];
      f.poderes.forEach((x, k) => {
        if (x.grupo !== p.grupo) return;
        if (p.grupo === 'classe' && (x.classe || '') !== (p.classe || '')) return;
        if (p.grupo === 'distincao' && (x.distincao || '') !== (p.distincao || '')) return;
        irmaos.push(k);
      });
      const pos = irmaos.indexOf(de);
      const alvo = acao === 'pod-topo' ? 0 : pos + (acao === 'pod-sobe' ? -1 : 1);
      if (alvo < 0 || alvo >= irmaos.length || alvo === pos) return;
      const antes = btn.getBoundingClientRect().top;
      const [x] = f.poderes.splice(de, 1);
      f.poderes.splice(irmaos[alvo], 0, x);
      sujar(f.id, 'poderes'); salvar(); render();
      seguirItem(acao, irmaos[alvo], antes);
      return;
    }
    //  ⇈ ↑ ↓ da GAVETA (22/09/2026, escopada por cartão em 23/09): a
    //  gaveta sobe ou desce DENTRO do cartão dela. Reordena as gavetas
    //  daquele cartão e reescreve a ordem global preservando as do outro
    //  cartão no lugar — onde havia uma gaveta deste cartão, entra a
    //  próxima da nova ordem.
    if (acao === 'podgrp-sobe' || acao === 'podgrp-desce' || acao === 'podgrp-topo') {
      const campo = btn.dataset.bloco;
      const doBloco = gavetasDoBloco(f, campo).map(g => g.chave);
      const de = doBloco.indexOf(btn.dataset.k || '');
      if (de < 0) return;
      const para = acao === 'podgrp-topo' ? 0 : de + (acao === 'podgrp-sobe' ? -1 : 1);
      if (para < 0 || para >= doBloco.length || para === de) return;
      const antes = btn.getBoundingClientRect().top;
      const [k] = doBloco.splice(de, 1);
      doBloco.splice(para, 0, k);
      const todas = gavetasDePoder(f).map(g => g.chave);
      let j = 0;
      f.poderesOrdem = todas.map(ch => blocoDaGaveta(ch) === campo ? doBloco[j++] : ch);
      sujar(f.id, 'poderesOrdem'); salvar(); render();
      seguirItem(acao, para, antes, '[data-k="' + k + '"]');
      return;
    }
    if (acao === 'pod-ordem-livro') {
      const campo = btn.dataset.bloco;
      const antes = f.poderesOrdem || [];
      const nova = antes.filter(k => blocoDaGaveta(k) !== campo);
      if (nova.length === antes.length) return;
      f.poderesOrdem = nova;
      sujar(f.id, 'poderesOrdem'); salvar(); return render();
    }
    // o 🩸: este poder conta como um poder da Tormenta sem ser um
    if (acao === 'poder-conta') {
      const p = f.poderes[+btn.dataset.i];
      if (!p) return;
      p.contaTormenta = !p.contaTormenta;
      sujar(f.id, 'poderes'); salvar(); return render();
    }
    // o que conta como poder da Tormenta e não é poder nenhum
    if (acao === 'tormenta-conta') {
      const d = parseInt(btn.dataset.delta, 10) || 0;
      f.tormentaConta = Math.max(0, (f.tormentaConta || 0) + d);
      sujar(f.id, 'tormentaConta'); salvar(); return render();
    }
    // recolher e abrir não mexem na ficha: é deste navegador
    if (acao === 'dobra-poder') {
      const p = f.poderes[+btn.dataset.i];
      if (!p) return;
      if (poderesFechados[p.id]) delete poderesFechados[p.id]; else poderesFechados[p.id] = 1;
      guardarPodFechados(); return render();
    }
    if (acao === 'dobra-poderes') {
      const meus = poderesDoBloco(f, btn.dataset.bloco);
      const abrir = meus.every(p => poderesFechados[p.id]);
      meus.forEach(p => { if (abrir) delete poderesFechados[p.id]; else poderesFechados[p.id] = 1; });
      guardarPodFechados(); return render();
    }
    if (acao === 'dobra-fixa') {
      const k = btn.dataset.k;
      if (!k) return;
      if (poderesFechados[k]) delete poderesFechados[k]; else poderesFechados[k] = 1;
      guardarPodFechados(); return render();
    }

    // ── MAGIAS ─────────────────────────────────────────────────────
    if (acao === 'add-magia')  return abrirBuscaMagia(f);
    // o ✕ da magia mora colado no 🔥 de lançar — pergunta antes
    if (acao === 'tira-magia') {
      const m = f.magias[+btn.dataset.i];
      if (!m) return;
      if (!confirm('Tirar ' + (m.nome || 'esta magia') + ' da ficha?' +
                   ((m.apr && m.apr.length) || m.obs ? '\n\nOs aprimoramentos ligados e a sua anotação vão junto.' : ''))) return;
      if (magiasFechadas[m.id]) { delete magiasFechadas[m.id]; guardarFechadas(); }
      f.magias.splice(+btn.dataset.i, 1);
      sujar(f.id, 'magias'); salvar(); return render();
    }
    // recolher e abrir não mexem na ficha: é deste navegador (ver blocoMagias)
    if (acao === 'dobra-magia') {
      const m = f.magias[+btn.dataset.i];
      if (!m) return;
      if (magiasFechadas[m.id]) delete magiasFechadas[m.id]; else magiasFechadas[m.id] = 1;
      guardarFechadas(); return render();
    }
    if (acao === 'dobra-magias') {
      const abrir = f.magias.every(m => magiasFechadas[m.id]);
      f.magias.forEach(m => { if (abrir) delete magiasFechadas[m.id]; else magiasFechadas[m.id] = 1; });
      guardarFechadas(); return render();
    }
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
      if (p) rolar(d20(valorPericia(f, p.chave)), quem(f) + ' · ' + nomeRolado(p, f.pericias[p.chave]), 'per:' + p.chave);
      return;
    }
    if (acao === 'rolar-ataque') {
      const a = f.ataques[+btn.dataset.i];
      if (a) rolar(d20(valorAtaque(f, a)), quem(f) + ' · ' + (a.nome || 'ataque'), 'atq:' + btn.dataset.i, 'Ataque');
      return;
    }
    // O dano sai com o dado já andado pelos passos (Tabela 3-2), e o
    // crítico multiplica ESSE dado: os "dados de dano" da p. 142 são os da
    // arma como ela está agora.
    if (acao === 'rolar-dano') {
      const a = f.ataques[+btn.dataset.i];
      if (!a || !a.dano.trim()) return;
      const r = danoDoAtaque(a);
      const p = (passosDe(a.passos) && r.ok && !r.semDado) ? ' (' + textoPassos(passosDe(a.passos)) + ')' : '';
      rolar(r.expr, quem(f) + ' · dano de ' + (a.nome || 'ataque') + p, 'dano:' + btn.dataset.i, 'Dano' + p);
      return;
    }
    if (acao === 'rolar-critico') {
      const i = +btn.dataset.i, a = f.ataques[i];
      if (!a || !a.dano.trim()) return;
      const mult = multiplicadorCritico(a.critico);
      const r = danoDoAtaque(a);
      const p = (passosDe(a.passos) && r.ok && !r.semDado) ? ' (' + textoPassos(passosDe(a.passos)) + ')' : '';
      rolar(expressaoCritica(r.expr, mult),
            quem(f) + ' · 💥 CRÍTICO ×' + mult + ' de ' + (a.nome || 'ataque') + p, 'crit:' + i, '💥 Crítico ×' + mult + p);
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
                       dano: D.AMIGO.arma.dano, passos: 0, critico: D.AMIGO.arma.critico, tipo: '' });
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
      rolar(d20(valorAtaqueAmigo(f, a, x) + d.bonus), rot + ' · ' + (x.nome || 'ataque') + d.rotulo, 'am:' + i + ':atq:' + j,
            d.bonus ? 'Ataque direcionado' : 'Ataque');
      return d.depois();
    }
    const dano = danoAmigo(f, a, x);
    if (!dano) return;
    if (acao === 'am-rolar-dano') {
      rolar(dano, rot + ' · dano de ' + (x.nome || 'ataque'), 'am:' + i + ':dano:' + j, 'Dano');
      return;
    }
    if (acao === 'am-rolar-crit') {
      const mult = multiplicadorCritico(x.critico);
      rolar(expressaoCritica(dano, mult), rot + ' · 💥 CRÍTICO ×' + mult + ' de ' + (x.nome || 'ataque'), 'am:' + i + ':crit:' + j,
            '💥 Crítico ×' + mult);
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
  //  `editadoEm` (15/09/2026) também fica de fora: é a hora da última
  //  mudança feita num navegador, e duas fichas iguais com horas
  //  diferentes continuam sendo a mesma ficha.
  const CARIMBO = { dono: 1, autor: 1, atualizadoEm: 1, editadoEm: 1 };

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
    let mudouSinc = false;
    Object.keys(minhas).forEach(id => {
      const vinda = minhas[id];
      if (!vinda || typeof vinda !== 'object') return;
      const i = dados.fichas.findIndex(x => x.id === id);
      if (i < 0) return;                       // ficha que só existe na mesa: não puxo
      // antes da conferência, e na ficha retida, o banco não entra por cima
      if (aguardando || retidas[id]) return;
      if (igual(dados.fichas[i], vinda)) {         // é o eco da minha própria escrita
        mudouSinc = marcarSinc(id, vinda) || mudouSinc;
        return;
      }
      dados.fichas[i] = vinda;                     // já veio normalizada acima
      mudouSinc = marcarSinc(id, vinda) || mudouSinc;
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
      if (aguardando || retidas[id]) return;
      if (igual(dados.fichas[i], gaveta[id])) { mudouSinc = marcarSinc(id, gaveta[id]) || mudouSinc; return; }
      dados.fichas[i] = gaveta[id];
      mudouSinc = marcarSinc(id, gaveta[id]) || mudouSinc;
      mudou = true;
    });

    if (mudouSinc) guardarSinc();
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
    const copia = normalizar(JSON.parse(JSON.stringify(f)));
    dados.fichas.push(copia);
    if (marcarSinc(id, copia)) guardarSinc();     // veio da conta: é a versão combinada
    abrirFicha(id);
    salvar(); render();
  }

  function mesaMudou() {
    // saiu da conta: não há com quem conferir, e a escolha pendente espera
    // o próximo login, que refaz a conferência do zero
    const e = window.GA_FichaMesa ? window.GA_FichaMesa.estado() : null;
    if (e && !e.logado) { aguardando = false; retidas = {}; }
    render();
  }

  // ═══ A CONFERÊNCIA ════════════════════════════════════════════════
  //  O desenho está no começo do arquivo, junto de `sinc`. Aqui é a parte
  //  que decide — chamada pelo ficha-mesa.js quando a gaveta (e a mesa,
  //  se houver) responderam pela primeira vez depois de entrar.
  function digitalDa(f) {
    const s = canon(f);
    let h = 0x811c9dc5;
    for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193); }
    return (h >>> 0).toString(36) + '.' + s.length;
  }
  function marcarSinc(id, f) {
    const d = digitalDa(f);
    if (sinc[id] === d) return false;
    sinc[id] = d;
    return true;
  }
  function guardarSinc() { window.GA_guardar(SINC_KEY, JSON.stringify(sinc)); }
  function guardarGuardadas() { window.GA_guardar(GUARDADAS_KEY, JSON.stringify(guardadas)); }
  function esquecerSincronia(id) {
    delete sinc[id]; delete guardadas[id]; delete retidas[id];
    guardarSinc(); guardarGuardadas();
  }
  function copiaNormalizada(x, id) {
    if (!x || typeof x !== 'object') return null;
    const n = normalizar(JSON.parse(JSON.stringify(x)));
    n.id = id;
    n.autor = x.autor || '';
    return n;
  }
  // A versão que perde uma escolha fica guardada neste navegador — uma por
  // ficha, com o motivo e a hora —, e o "↩ voltar" troca de novo.
  function guardarVersao(f, motivo) {
    guardadas[f.id] = { quando: Date.now(), motivo: motivo, ficha: JSON.parse(JSON.stringify(f)) };
    guardarGuardadas();
  }
  // A ficha inteira, para a mesa e para a conta: é o que se manda quando a
  // conferência decide que a daqui vale (e para acertar uma cópia atrasada).
  function publicarInteira(f) {
    delete sujos[f.id];
    if (window.GA_FichaMesa) window.GA_FichaMesa.publicar(f, null, null);
  }

  function esperarConferencia() { aguardando = true; }

  //  Para cada ficha minha, três versões: a DAQUI, as cópias de LÁ (a da
  //  mesa e a da conta) e a COMBINADA (a digital em `sinc`). "Nova" é a
  //  cópia de lá que não é nem a daqui nem a combinada: mudou por outra
  //  mão, e este navegador ainda não viu.
  //    • nenhuma nova                    → a daqui vale (sobe, se alguma cópia ficou atrás);
  //    • uma nova, e a daqui é a combinada → desce a nova (o mestre baixou o PV);
  //    • nova, e a daqui também mudou — ou nunca houve combinada, ou lá há
  //      duas novas diferentes → RETIDA, e o jogador escolhe.
  function conferir() {
    aguardando = false;
    retidas = {};
    const e = window.GA_FichaMesa ? window.GA_FichaMesa.estado() : {};
    const naMesa  = (ultimoRecebido && ultimoRecebido[meuUid]) || {};
    const naConta = ultimoDaGaveta || {};
    let mudouDados = false;
    dados.fichas.forEach((local, i) => {
      const id = local.id;
      const m = copiaNormalizada(naMesa[id], id);
      const g = copiaNormalizada(naConta[id], id);
      const copias = [m, g].filter(Boolean);
      const faltaCopia = (e.ligado && e.escreve && !m) || !g;
      if (!copias.length) { publicarInteira(local); return; }      // o banco ainda não a conhece
      const dL = digitalDa(local), dK = sinc[id];
      const novas = copias.filter(c => { const d = digitalDa(c); return d !== dL && d !== dK; });
      if (!novas.length) {
        if (copias.every(c => digitalDa(c) === dL)) {
          marcarSinc(id, local);
          if (faltaCopia) publicarInteira(local);
        } else {
          publicarInteira(local);          // a daqui é mais nova que a combinada: sobe
        }
        return;
      }
      const la = novas.reduce((x, y) => ((y.atualizadoEm || 0) > (x.atualizadoEm || 0) ? y : x));
      const umaSo = new Set(novas.map(digitalDa)).size === 1;
      if (dK && dK === dL && umaSo) {                              // aqui nada mudou: desce
        dados.fichas[i] = la;
        marcarSinc(id, la);
        delete sujos[id];
        mudouDados = true;
        if (faltaCopia || copias.some(c => digitalDa(c) !== digitalDa(la))) publicarInteira(la);
        return;
      }
      retidas[id] = { remota: la, de: la === m ? 'mesa' : 'conta', em: la.atualizadoEm || 0 };
    });
    guardarSinc();
    if (mudouDados) gravar();
    render(); avisar();
  }

  // O que muda entre duas versões, com o nome que se lê na ficha.
  const NOMES_GRUPO = {
    nome: 'nome', jogador: 'jogador', raca: 'raça', origem: 'origem', divindade: 'divindade',
    tamanho: 'tamanho', deslocamento: 'deslocamento', deslocMods: 'penalidades de deslocamento',
    classes: 'classes e níveis', atributos: 'atributos',
    pv: 'PV', pm: 'PM', defesa: 'Defesa', carga: 'carga', cdAtributo: 'atributo da CD', xp: 'XP',
    xpLog: 'caderno do XP',
    resistencias: 'resistências', reducoes: 'RD', imunidades: 'imunidades', proficiencias: 'proficiências',
    condicoes: 'condições', condicoesLivres: 'sustentadas e outras condições',
    pericias: 'perícias', oficios: 'ofícios', inventario: 'inventário', tibares: 'T$',
    compras: 'recibo da Loja', magias: 'magias', poderes: 'poderes', tormentaConta: 'conta da Tormenta',
    poderesOrdem: 'ordem das gavetas de poder',
    ataques: 'ataques', treinador: 'treinador', moedasPesam: 'peso das moedas',
    amigos: 'melhor amigo', amigosPv: 'PV do melhor amigo', blocos: 'textos',
  };
  function gruposDiferentes(a, b) {
    const chaves = {}, saida = [];
    Object.keys(a || {}).concat(Object.keys(b || {})).forEach(k => { chaves[k] = true; });
    Object.keys(chaves).forEach(k => {
      if (CARIMBO[k] || k === 'id') return;
      if (canon((a || {})[k]) !== canon((b || {})[k])) saida.push(NOMES_GRUPO[k] || k);
    });
    return saida;
  }

  // O aviso no alto da ficha: a retida (escolha) ou a versão guardada (↩).
  function avisoDeSincronia(f) {
    if (!f || donoDe(f.id)) return '';
    const r = retidas[f.id];
    if (r) {
      const la = r.de === 'mesa' ? 'da mesa' : 'da sua conta';
      const muda = gruposDiferentes(f, r.remota);
      return `
      <div class="fi-sinc fi-sinc--retida" role="alert">
        <p><strong>⚠ Esta ficha está diferente da ${la}</strong>, e não dá para saber sozinho qual é a certa:
          ${sinc[f.id] ? 'as duas mudaram desde a última vez que este navegador conversou com o banco'
                       : 'este navegador ainda não tinha conversado com o banco sobre ela'}.
          Enquanto você não escolher, <strong>nada desta ficha sobe nem desce</strong>.</p>
        <p>${r.em ? 'A ' + la + ' foi salva em <strong>' + esc(dataHora(r.em)) + '</strong>' : 'A ' + la + ' não diz quando foi salva'}${
          f.editadoEm ? '; a deste navegador foi mexida em <strong>' + esc(dataHora(f.editadoEm)) + '</strong>' : ''}.
          ${muda.length ? 'O que muda entre as duas: <strong>' + esc(muda.join(', ')) + '</strong>.' : ''}</p>
        <div class="fi-sinc-acoes">
          <button type="button" class="fi-add fi-add--menor" data-acao="sinc-de-la">⬇ Ficar com a ${la}</button>
          <button type="button" class="fi-add fi-add--menor" data-acao="sinc-daqui">⬆ Ficar com a deste navegador</button>
        </div>
        <p class="fi-sinc-nota">A que você não escolher fica guardada neste navegador, com um botão para voltar a ela.</p>
      </div>`;
    }
    const gd = guardadas[f.id];
    if (gd && gd.ficha) {
      return `
      <div class="fi-sinc fi-sinc--guardada">
        <p>↩ Ficou guardada outra versão desta ficha — ${esc(gd.motivo)} (${esc(dataHora(gd.quando))}).
          <button type="button" class="fi-mini" data-acao="sinc-voltar"
                  title="Trocar a da tela pela guardada; a da tela fica guardada no lugar">↩ Voltar para ela</button>
          <button type="button" class="fi-mini" data-acao="sinc-descartar" title="Esquecer a versão guardada">✕ Descartar</button></p>
      </div>`;
    }
    return '';
  }

  function decidirSincronia(f, acao) {
    const i = dados.fichas.findIndex(x => x.id === f.id);
    if (i < 0) return;                                   // só as minhas passam por conferência
    const r = retidas[f.id];
    if (acao === 'sinc-de-la' && r) {
      guardarVersao(f, 'era a deste navegador, trocada pela ' + (r.de === 'mesa' ? 'da mesa' : 'da conta'));
      dados.fichas[i] = r.remota;
      delete retidas[f.id];
      if (marcarSinc(f.id, r.remota)) guardarSinc();
      publicarInteira(r.remota);                          // acerta a outra cópia, se estiver atrás
      gravar(); return render();
    }
    if (acao === 'sinc-daqui' && r) {
      guardarVersao(r.remota, 'era a ' + (r.de === 'mesa' ? 'da mesa' : 'da conta') + ', substituída pela deste navegador');
      delete retidas[f.id];
      publicarInteira(f);
      return render();
    }
    const gd = guardadas[f.id];
    if (acao === 'sinc-voltar' && gd && gd.ficha) {
      if (!confirm('Voltar para a versão guardada de "' + (f.nome || 'sem nome') + '"?\n\n' +
                   'A que está na tela agora fica guardada no lugar dela, e a de volta sobe para a conta e a mesa.')) return;
      const volta = copiaNormalizada(gd.ficha, f.id);
      guardarVersao(f, 'era a que estava na tela antes do ↩');
      dados.fichas[i] = volta;
      delete retidas[f.id];
      publicarInteira(volta);
      gravar(); return render();
    }
    if (acao === 'sinc-descartar' && gd) {
      delete guardadas[f.id];
      guardarGuardadas();
      return render();
    }
  }

  // ═══ AS MAGIAS, VINDAS DA BASE DO SITE ════════════════════════════
  //  A ficha não guarda uma segunda cópia das 254 magias: ela busca na
  //  MESMA window.GA_MAGIAS que a aba 📚 Consultas usa, e copia para
  //  dentro da ficha só o que se lê na mesa (círculo, PM, execução,
  //  alcance, alvo, duração, resistência e o resumo). O texto inteiro
  //  fica de fora de propósito — o cartão vai buscá-lo na base na hora
  //  de desenhar, e uma ficha não precisa carregar o livro junto para
  //  ser exportada.
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

  //  A BUSCA DOS PODERES. Dois passos, como a das magias: achar e, só
  //  depois de LER, adicionar. Os filtros de grupo em cima são as "sub
  //  árvores" do pedido — e a busca também acha pelo texto, pelo deus do
  //  poder concedido e pela raça do poder de raça.
  //  ── A LISTA DE CONDIÇÕES ─────────────────────────────────────────
  //  Marca e desmarca ali mesmo, quantas quiser: na mesa nunca é uma só
  //  ("o personagem fica desprevenido e imóvel"). A ficha por trás vai
  //  mudando; o ✕ da etiqueta faz o caminho de volta.
  function abrirBuscaCondicao(f) {
    const base = baseCondicoes();
    if (!base.length || !window.GA_abrirModal) return;
    const G = window.GA_CONDICOES;
    const overlay = window.GA_abrirModal(`
      <div class="ga-modal-cab">
        <span>🌀 Condições</span>
        <button type="button" class="ga-modal-x" data-ga-fechar aria-label="Fechar">✕</button>
      </div>
      <p class="ga-modal-dica">${esc((G && G.intro) || '')}</p>
      <input type="text" class="fi-busca-mag" id="fiBuscaCond" placeholder="cego, veneno, −5 na Defesa…"
             autocomplete="off" aria-label="Buscar condição">
      <div class="fi-cond-lista" id="fiCondLista"></div>
      <div class="ga-modal-acoes">
        <button type="button" class="ga-btn-principal" data-ga-fechar>Pronto</button>
      </div>`);
    const campo = overlay.querySelector('#fiBuscaCond');
    const lista = overlay.querySelector('#fiCondLista');

    function pintar() {
      const q = semAcento((campo.value || '').trim());
      const achadas = base.filter(c => !q ||
        semAcento(c.nome + ' ' + c.texto + ' ' + (c.tipo || '')).indexOf(q) >= 0);
      lista.innerHTML = achadas.length ? achadas.map(c => {
        const k = chaveCond(c.nome), t = tipoCond(c), tem = f.condicoes.indexOf(k) >= 0;
        return `
          <button type="button" class="fi-cond-opcao${tem ? ' fi-cond-opcao--on' : ''}"
                  style="--cond:${t ? t.cor : 'var(--rust-dark)'}" data-cond="${esc(k)}" aria-pressed="${tem}">
            <span class="fi-cond-opcao-cab">
              <span class="fi-cond-opcao-marca" aria-hidden="true">${tem ? '✓' : '＋'}</span>
              <span class="fi-cond-opcao-nome">${esc(c.nome)}</span>
              ${t ? `<span class="fi-cond-tipo">${esc(t.nome)}</span>` : ''}
            </span>
            <span class="fi-cond-opcao-txt">${esc(c.texto)}</span>
          </button>`;
      }).join('') : '<p class="fi-busca-vazio">Nenhuma condição com isso.</p>';
    }
    campo.addEventListener('input', pintar);
    lista.addEventListener('click', e => {
      const b = e.target.closest('[data-cond]');
      if (!b) return;
      const k = b.dataset.cond, i = f.condicoes.indexOf(k);
      if (i >= 0) f.condicoes.splice(i, 1); else f.condicoes.push(k);
      sujar(f.id, 'condicoes');
      salvar();
      pintar();
      render();          // a fileira de etiquetas atrás do modal acompanha
    });
    pintar();
    campo.focus();
  }

  function abrirBuscaPoder(f, campo) {
    //  A busca é ESCOPADA ao cartão que a abriu (23/09/2026): o de raça e
    //  origem só acha habilidade de raça, poder de raça e poder de origem;
    //  o de classe e poderes acha o resto, com os DE classe (GA_PODERES_
    //  CLASSE). O grupo "⚔ Classe" abre a segunda fileira de chips, uma
    //  por classe, com as DA FICHA na frente — quase sempre é uma delas.
    const daClasse = campo === 'classePoderes';
    const base = (window.GA_PODERES || []).filter(p => blocoDoGrupo(p.grupo) === campo)
      .concat(daClasse ? baseClasse() : []);
    const gruposAqui = gruposDePoder().filter(g => g.chave !== 'livre' && blocoDoGrupo(g.chave) === campo);
    if (!base.length || !window.GA_abrirModal) return;

    const overlay = window.GA_abrirModal(`
      <div class="ga-modal-cab">
        <span>✨ ${daClasse ? 'Adicionar poder' : 'Adicionar habilidade'}</span>
        <button type="button" class="ga-modal-x" data-ga-fechar aria-label="Fechar">✕</button>
      </div>
      <div id="fiPodCorpo"></div>`);
    const corpo = overlay.querySelector('#fiPodCorpo');
    let grupo = '';        // '' = todos
    let classe = '';       // dentro de ⚔ Classe: '' = todas

    //  As classes que ESTA ficha tem, já resolvendo a variante para a
    //  básica ("ambas são a mesma classe", Heróis de Arton, p. 22).
    function minhasClasses() {
      const vistas = [];
      f.classes.forEach(c => {
        const k = classeDosPoderes(c.classe);
        if (k && listaDeClasse(k) && vistas.indexOf(k) < 0) vistas.push(k);
      });
      return vistas;
    }
    //  A ressalva impressa da variante, quando a ficha tem uma delas.
    function ressalvas() {
      return f.classes.map(c => ({ v: ressalvaDaVariante(c.classe), C: D.classe(c.classe) }))
        .filter(x => x.v && x.C)
        .filter((x, i, t) => t.findIndex(y => y.C.chave === x.C.chave) === i);
    }

    function telaBusca(termo) {
      const chips = [{ chave: '', nome: 'Todos', emoji: '✨', quantos: base.length }]
        .concat(gruposAqui)
        .map(g => `<button type="button" class="fi-pod-chip${grupo === g.chave ? ' fi-pod-chip--on' : ''}"
                data-grupo="${esc(g.chave)}">${g.emoji} ${esc(g.nome)} <em>${g.quantos}</em></button>`).join('');
      const minhas = minhasClasses();
      const ordem = listasDeClasse().slice().sort((a, b) => {
        const ma = minhas.indexOf(a.chave) >= 0, mb = minhas.indexOf(b.chave) >= 0;
        return ma === mb ? a.nome.localeCompare(b.nome, 'pt-BR') : (ma ? -1 : 1);
      });
      const chipsClasse = grupo !== 'classe' ? '' : `
        <div class="fi-pod-chips fi-pod-chips--classe" id="fiPodClasses">
          <button type="button" class="fi-pod-chip${classe ? '' : ' fi-pod-chip--on'}" data-classe="">
            Todas <em>${baseClasse().length}</em></button>
          ${ordem.map(L => `<button type="button" class="fi-pod-chip${classe === L.chave ? ' fi-pod-chip--on' : ''}${
              minhas.indexOf(L.chave) >= 0 ? ' fi-pod-chip--minha' : ''}" data-classe="${esc(L.chave)}"
              ${minhas.indexOf(L.chave) >= 0 ? 'title="Uma das classes desta ficha"' : ''}
            >${minhas.indexOf(L.chave) >= 0 ? '★ ' : ''}${esc(L.nome)} <em>${L.quantos}</em></button>`).join('')}
        </div>
        ${ressalvas().map(x => `<p class="fi-pod-ressalva">⚠ <strong>${esc(x.C.nome)}</strong> usa a lista do
          ${esc((D.classe(D.basicaDe(x.C.chave)) || {}).nome || '')} — ${esc(x.v.nota)}
          <em>(Heróis de Arton, p. ${x.v.pagina})</em></p>`).join('')}`;
      corpo.innerHTML = `
        <p class="ga-modal-dica">${daClasse
          ? 'Os ' + base.length + ' poderes deste cartão — <strong>com os ' + baseClasse().length +
            ' de classe</strong>. Busque pelo nome, pelo texto, pelo deus ou pela classe'
          : 'As ' + base.length + ' habilidades de raça e origem dos livros. Busque pelo nome, pelo texto ou pela raça'} — ou filtre
          pelo grupo.</p>
        <div class="fi-pod-chips" id="fiPodChips">${chips}</div>
        ${chipsClasse}
        <input type="text" class="fi-busca-mag" id="fiBuscaPod" placeholder="esquiva, fúria, lefou, Wynna, +2 em Luta…"
               autocomplete="off" aria-label="Buscar poder" value="${esc(termo || '')}">
        <div class="fi-busca-res" id="fiPodRes"></div>`;
      const campo = corpo.querySelector('#fiBuscaPod');
      const res = corpo.querySelector('#fiPodRes');
      const jaTem = {};
      f.poderes.forEach(p => { if (p.pid) jaTem[p.pid] = true; });

      function listar() {
        const q = semAcento((campo.value || '').trim());
        const achados = base.filter(p => {
          if (grupo && (p.classe ? 'classe' : p.grupo) !== grupo) return false;
          if (grupo === 'classe' && classe && p.classe !== classe) return false;
          if (!q) return true;
          const daClasse = p.classe ? (listaDeClasse(p.classe) || {}).nome || '' : '';
          return semAcento([p.nome, p.tags || '', p.deus || '', p.preReq || '', (p.texto || []).join(' '),
            daClasse, (window.GA_PODERES_LIVROS || {})[p.livro] || ''].join(' ')).indexOf(q) >= 0;
        });
        const mostra = achados.slice(0, 60);
        res.innerHTML = mostra.length
          ? mostra.map(p => {
            const L = p.classe ? listaDeClasse(p.classe) : null;
            const g = p.classe ? GRUPO_CLASSE : grupoDePoder(p.grupo);
            return `
            <button type="button" class="fi-busca-item ${jaTem[p.id] ? 'fi-busca-item--tem' : ''}" data-pid="${esc(p.id)}">
              <span class="fi-busca-circ">${g.emoji}</span>
              <span class="fi-busca-nome">${esc(p.nome)}${p.magica ? ' ✦' : ''}${jaTem[p.id] ? ' <em>já está na ficha</em>' : ''}</span>
              <span class="fi-busca-meta">${L ? 'Poder de ' + esc(L.nome) : esc(g.nome)}${p.tags ? ' · ' + esc(p.tags) : ''}${p.deus ? ' · ' + esc(p.deus) : ''} · ${esc(fontePoder(p))}</span>
              <span class="fi-busca-res-txt">${esc((p.texto || [])[0] || '')}</span>
            </button>`; }).join('') +
            (achados.length > mostra.length
              ? `<p class="fi-busca-vazio">…e mais ${achados.length - mostra.length}. Escreva mais para afinar.</p>` : '')
          : '<p class="fi-busca-vazio">Nenhum poder com isso. Se for caseiro, use o ✍ Escrever.</p>';
      }
      campo.addEventListener('input', listar);
      corpo.querySelector('#fiPodChips').addEventListener('click', e => {
        const b = e.target.closest('[data-grupo]');
        if (!b) return;
        grupo = b.dataset.grupo;
        if (grupo !== 'classe') classe = '';
        // entrando em ⚔ Classe com uma só classe na ficha, ela já vem aberta
        else if (!classe && minhasClasses().length === 1) classe = minhasClasses()[0];
        telaBusca(campo.value);
      });
      const fileira = corpo.querySelector('#fiPodClasses');
      if (fileira) fileira.addEventListener('click', e => {
        const b = e.target.closest('[data-classe]');
        if (!b) return;
        classe = b.dataset.classe;
        telaBusca(campo.value);
      });
      res.addEventListener('click', e => {
        const b = e.target.closest('[data-pid]');
        if (b) telaPoder(b.dataset.pid, campo.value);
      });
      listar();
      campo.focus();
    }

    // segundo passo: leu o poder inteiro, e aí decide
    function telaPoder(pid, termo) {
      const b = daBasePoder(pid);
      if (!b) return;
      const jaTem = f.poderes.some(x => x.pid === pid);
      const L = b.classe ? listaDeClasse(b.classe) : null;
      const g = b.classe ? GRUPO_CLASSE : grupoDePoder(b.grupo);
      corpo.innerHTML = `
        <div class="fi-mag-topo">
          <button type="button" class="fi-mag-voltar" data-voltar>← voltar à busca</button>
          <strong class="fi-mag-titulo">${esc(b.nome)}</strong>
        </div>
        <p class="fi-pod-ficha">${g.emoji} ${L ? 'Poder de ' + esc(L.nome) : esc(g.nome)}${b.tags ? ' · ' + esc(b.tags) : ''}${b.deus ? ' · ' + esc(b.deus) : ''}
          · ${esc(fontePoder(b))}${b.magica ? ' · <span class="fi-pod-magica" title="' + esc(DICA_MAGICA) + '">✦<span>mágica</span></span>' : ''}</p>
        <div class="fi-mag-texto">
          ${(b.texto || []).map(t => '<p>' + esc(t) + '</p>').join('')}
          ${b.quadro ? '<div class="fi-pod-quadro"><strong>' + esc(b.quadro.titulo) + '</strong>' +
            (b.quadro.texto || []).map(t => '<p>' + esc(t) + '</p>').join('') + '</div>' : ''}
          ${b.preReq ? '<p class="fi-pod-req"><strong>Pré-requisito:</strong> ' + esc(b.preReq) + '</p>' : ''}
          ${b.custo ? '<p class="fi-pod-req"><strong>Custo:</strong> ' + esc(b.custo) + '</p>' : ''}
        </div>
        <div class="ga-modal-acoes">
          <button type="button" class="ga-btn-sec" data-voltar>← Voltar</button>
          <button type="button" class="ga-btn-principal" data-add ${jaTem ? 'disabled' : ''}>
            ${jaTem ? '✓ já está na ficha' : '＋ Adicionar este poder'}</button>
        </div>`;
      corpo.querySelectorAll('[data-voltar]').forEach(x => x.addEventListener('click', () => telaBusca(termo)));
      const add = corpo.querySelector('[data-add]');
      if (add && !jaTem) add.addEventListener('click', () => {
        f.poderes.push({
          id: novoId(), pid: b.id, nome: b.nome, grupo: b.classe ? 'classe' : b.grupo,
          classe: b.classe || '', distincao: b.distincao || '', marca: !!b.marca,
          magica: !!b.magica, livro: b.livro || '',
          pagina: b.pagina || 0, tags: b.tags || '', deus: b.deus || '', preReq: b.preReq || '',
          custo: b.custo || '', texto: (b.texto || []).slice(), obs: '', contaTormenta: false,
        });
        sujar(f.id, 'poderes');
        salvar();
        overlay._fechar();
        render();
      });
    }

    telaBusca('');
  }

  //  O poder que não está na base: os de CLASSE (que ficaram para outra
  //  hora) e os caseiros. Fica com o grupo que a pessoa escolher e o
  //  texto que ela escrever — o resto do cartão funciona igual.
  function escreverPoder(f, i, campo) {
    if (!window.GA_abrirModal) return;
    const p = (typeof i === 'number') ? f.poderes[i] : null;
    if (typeof i === 'number' && !p) return;
    //  Editando, o cartão é o do próprio poder; escrevendo, é o que
    //  clicou. Os grupos oferecidos são só os DAQUELE cartão — um poder
    //  escrito à mão não pula para o outro cartão sem querer.
    campo = campo || (p ? blocoDoGrupo(p.grupo) : 'classePoderes');
    const daClasse = campo === 'classePoderes';
    const gruposAqui = gruposDePoder().filter(g => blocoDoGrupo(g.chave) === campo);
    const grupoPadrao = p ? p.grupo : (daClasse ? 'livre' : 'raca-hab');
    const overlay = window.GA_abrirModal(`
      <div class="ga-modal-cab">
        <span>✍ ${p ? 'Editar' : 'Escrever'} ${daClasse ? 'um poder' : 'uma habilidade'}</span>
        <button type="button" class="ga-modal-x" data-ga-fechar aria-label="Fechar">✕</button>
      </div>
      <p class="ga-modal-dica">Para o que não está nos livros: o caseiro, o que o mestre inventou, a
        variação da mesa. Uma linha em branco separa parágrafos.</p>
      <label class="fi-campo"><span class="fi-rot">Nome</span>
        <input type="text" class="fi-txt" id="fiPodNome" autocomplete="off"
               value="${p ? esc(p.nome) : ''}" placeholder="${daClasse ? 'Golpe Pessoal, Fúria do Bárbaro…' : 'Visão na Penumbra, Herança…'}"></label>
      <label class="fi-campo"><span class="fi-rot">Grupo</span>
        <select class="fi-sel" id="fiPodGrupo">${gruposAqui.map(g =>
          `<option value="${esc(g.chave)}"${g.chave === grupoPadrao ? ' selected' : ''}>${g.emoji} ${esc(g.nome)}</option>`).join('')}</select></label>
      <label class="fi-campo" id="fiPodClasseCampo" ${p && p.grupo === 'classe' ? '' : 'hidden'}>
        <span class="fi-rot">De qual classe</span>
        <select class="fi-sel" id="fiPodClasse">
          <option value="">— nenhuma —</option>
          ${listasDeClasse().map(L =>
            `<option value="${esc(L.chave)}"${p && p.classe === L.chave ? ' selected' : ''}>${esc(L.nome)}</option>`).join('')}
        </select></label>
      <label class="fi-campo"><span class="fi-rot">Texto</span>
        <textarea class="fi-txt fi-pod-area" id="fiPodTexto" rows="6"
                  placeholder="o que o poder faz, como está escrito">${p ? esc((p.texto || []).join('\n\n')) : ''}</textarea></label>
      <div class="ga-modal-acoes">
        <button type="button" class="ga-btn-sec" data-ga-fechar>Cancelar</button>
        <button type="button" class="ga-btn-principal" id="fiPodSalvar">${p ? 'Salvar' : '＋ Adicionar'}</button>
      </div>`);
    const campoNome = overlay.querySelector('#fiPodNome');
    // "de qual classe" só faz sentido no grupo ⚔ Classe
    const selGrupo = overlay.querySelector('#fiPodGrupo');
    const campoClasse = overlay.querySelector('#fiPodClasseCampo');
    selGrupo.addEventListener('change', () => { campoClasse.hidden = selGrupo.value !== 'classe'; });
    overlay.querySelector('#fiPodSalvar').addEventListener('click', () => {
      const nome = (campoNome.value || '').trim();
      if (!nome) return campoNome.focus();
      const texto = (overlay.querySelector('#fiPodTexto').value || '')
        .split(/\n{2,}/).map(t => t.replace(/\s+/g, ' ').trim()).filter(Boolean);
      const grupo = selGrupo.value || 'livre';
      const classe = grupo === 'classe' ? (overlay.querySelector('#fiPodClasse').value || '') : '';
      if (p) {
        p.nome = nome; p.grupo = grupo; p.classe = classe; p.texto = texto;
      } else {
        f.poderes.push({
          id: novoId(), pid: '', nome: nome, grupo: grupo, classe: classe, magica: false,
          livro: '', pagina: 0, tags: '', deus: '', preReq: '', custo: '', texto: texto,
          obs: '', contaTormenta: false,
        });
      }
      sujar(f.id, 'poderes');
      salvar();
      overlay._fechar();
      render();
    });
    campoNome.focus();
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
        // O desempate da lista de iniciativa. Em T20 o modificador é a
        // Destreza — mas quem trocou o atributo da perícia Iniciativa
        // nesta ficha desempata com o dele, senão a lista contaria uma
        // história diferente da que o jogador está vendo na ficha.
        des: atr(f, atrPericia(D.pericia('iniciativa'), f.pericias.iniciativa)),
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
    esperarConferencia: esperarConferencia, // entrou: o banco não entra por cima até conferir
    conferir: conferir,                // a gaveta (e a mesa) responderam: decide ficha a ficha
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
