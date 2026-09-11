// ════════════════════════════════════════════════════════════════════
//  FICHA-DATA.JS — as tabelas da ficha DE PERSONAGEM (Tormenta 20 JdA)
//  Localização: /grifos-alados/js/ficha-data.js
//
//  ⚠ ESTE ARQUIVO É SÓ DOS JOGADORES. Ele não conhece criatura, ameaça
//  nem bestiário, e nada daqui é importado por js/monstros.js ou pela
//  aba ⚗ Criar Ameaça — decisão dele, em 08/09/2026: "qualquer coisa
//  que se relacione a ficha dos jogadores é somente dos JOGADORES".
//  Sim, as 29 perícias também estão em js/criar-ameaca-data.js, com os
//  mesmos atributos-chave; a duplicação é de propósito e está anotada em
//  docs/ficha-do-jogador.md ("O que eu NÃO juntei").
//
//  Fonte: Tormenta 20 — Edição Jogo do Ano. Conferido no PDF em
//  08/09/2026: Tabela 2-1 (p. 115) para as perícias, e o bloco
//  "Pontos de Vida / Pontos de Mana" de cada classe no Capítulo 2.
//  As classes de fora do básico (10/09/2026) vêm do Deuses de Arton
//  (o Frade) e do Heróis de Arton (o Treinador e as 14 variantes).
// ════════════════════════════════════════════════════════════════════
(function () {
  'use strict';

  // ── ATRIBUTOS ──────────────────────────────────────────────────
  //  Em T20 o valor do atributo JÁ É o modificador: Força 3 soma +3.
  //  Não há a conta de (valor − 10) ÷ 2 de outros sistemas.
  const ATRIBUTOS = [
    { chave: 'for', nome: 'Força',        curto: 'For' },
    { chave: 'des', nome: 'Destreza',     curto: 'Des' },
    { chave: 'con', nome: 'Constituição', curto: 'Con' },
    { chave: 'int', nome: 'Inteligência', curto: 'Int' },
    { chave: 'sab', nome: 'Sabedoria',    curto: 'Sab' },
    { chave: 'car', nome: 'Carisma',      curto: 'Car' },
  ];

  // ── AS 29 PERÍCIAS (Tabela 2-1, p. 115) ────────────────────────
  //  atr        atributo-chave
  //  treinada   só pode ser USADA se for treinada (o site avisa, não proíbe)
  //  armadura   sofre a penalidade de armadura — são só três
  //  resist     é um dos três testes de resistência (destaque próprio)
  //  ataque     é com ela que se faz teste de ataque (Luta / Pontaria)
  //  multipla   pode ser tomada VÁRIAS vezes, cada uma com a sua
  //             especialidade — só Ofício, e é o próprio livro que diz:
  //             "Ofício na verdade são várias perícias diferentes"
  //             (p. 121). Um alquimista e um engenhoqueiro são duas
  //             perícias, com treino e bônus separados.
  const PERICIAS = [
    { chave: 'acrobacia',     nome: 'Acrobacia',     atr: 'des', treinada: false, armadura: true  },
    { chave: 'adestramento',  nome: 'Adestramento',  atr: 'car', treinada: true,  armadura: false },
    { chave: 'atletismo',     nome: 'Atletismo',     atr: 'for', treinada: false, armadura: false },
    { chave: 'atuacao',       nome: 'Atuação',       atr: 'car', treinada: true,  armadura: false },
    { chave: 'cavalgar',      nome: 'Cavalgar',      atr: 'des', treinada: false, armadura: false },
    { chave: 'conhecimento',  nome: 'Conhecimento',  atr: 'int', treinada: true,  armadura: false },
    { chave: 'cura',          nome: 'Cura',          atr: 'sab', treinada: false, armadura: false },
    { chave: 'diplomacia',    nome: 'Diplomacia',    atr: 'car', treinada: false, armadura: false },
    { chave: 'enganacao',     nome: 'Enganação',     atr: 'car', treinada: false, armadura: false },
    { chave: 'fortitude',     nome: 'Fortitude',     atr: 'con', treinada: false, armadura: false, resist: true },
    { chave: 'furtividade',   nome: 'Furtividade',   atr: 'des', treinada: false, armadura: true  },
    { chave: 'guerra',        nome: 'Guerra',        atr: 'int', treinada: true,  armadura: false },
    { chave: 'iniciativa',    nome: 'Iniciativa',    atr: 'des', treinada: false, armadura: false },
    { chave: 'intimidacao',   nome: 'Intimidação',   atr: 'car', treinada: false, armadura: false },
    { chave: 'intuicao',      nome: 'Intuição',      atr: 'sab', treinada: false, armadura: false },
    { chave: 'investigacao',  nome: 'Investigação',  atr: 'int', treinada: false, armadura: false },
    { chave: 'jogatina',      nome: 'Jogatina',      atr: 'car', treinada: true,  armadura: false },
    { chave: 'ladinagem',     nome: 'Ladinagem',     atr: 'des', treinada: true,  armadura: true  },
    { chave: 'luta',          nome: 'Luta',          atr: 'for', treinada: false, armadura: false, ataque: 'corpo a corpo' },
    { chave: 'misticismo',    nome: 'Misticismo',    atr: 'int', treinada: true,  armadura: false },
    { chave: 'nobreza',       nome: 'Nobreza',       atr: 'int', treinada: true,  armadura: false },
    { chave: 'oficio',        nome: 'Ofício',        atr: 'int', treinada: true,  armadura: false, multipla: true },
    { chave: 'percepcao',     nome: 'Percepção',     atr: 'sab', treinada: false, armadura: false },
    { chave: 'pilotagem',     nome: 'Pilotagem',     atr: 'des', treinada: true,  armadura: false },
    { chave: 'pontaria',      nome: 'Pontaria',      atr: 'des', treinada: false, armadura: false, ataque: 'à distância' },
    { chave: 'reflexos',      nome: 'Reflexos',      atr: 'des', treinada: false, armadura: false, resist: true },
    { chave: 'religiao',      nome: 'Religião',      atr: 'sab', treinada: true,  armadura: false },
    { chave: 'sobrevivencia', nome: 'Sobrevivência', atr: 'sab', treinada: false, armadura: false },
    { chave: 'vontade',       nome: 'Vontade',       atr: 'sab', treinada: false, armadura: false, resist: true },
  ];

  // ── AS 16 CLASSES BÁSICAS: só o que é conta ────────────────────
  //  pvBase   PV do 1º nível (+ Constituição)
  //  pvNivel  PV por nível depois do 1º (+ Constituição)
  //  pmNivel  PM por nível
  //  pmAtr    o atributo que a classe SOMA no total de PM — uma vez, não
  //           por nível: "você soma seu Carisma no seu total de PM"
  //           (bardo, p. 44). Faltou na primeira leva, e era o PM a menos
  //           de todo conjurador da mesa (10/09/2026).
  //           'chave' é o arcanista: o atributo é o do Caminho (Bruxo e
  //           Mago, Int; Feiticeiro, Car — p. 37), e a ficha usa o da CD,
  //           que é esse mesmo. O paladino entra pelo Abençoado (p. 82).
  //           O MESMO atributo não soma duas vezes: "um clérigo/druida
  //           não soma duas vezes sua Sabedoria nos pontos de mana"
  //           (p. 226). Atributos diferentes, sim.
  //  Poder, proficiência e habilidade de classe NÃO estão aqui: viram
  //  texto no bloco "Habilidades de classe e poderes", que é o combinado.
  //  As 14 do livro básico e mais duas, que os livros trazem como classe
  //  nova, e não como variante de nenhuma:
  //    Frade      Deuses de Arton, p. 39
  //    Treinador  Heróis de Arton, p. 16 ("nova classe básica")
  //  O suplemento que ele usa na mesa traz as duas com os mesmos números.
  const BASICAS = [
    { chave: 'arcanista', nome: 'Arcanista', pvBase:  8, pvNivel: 2, pmNivel: 6, pmAtr: 'chave' },  // p. 37
    { chave: 'barbaro',   nome: 'Bárbaro',   pvBase: 24, pvNivel: 6, pmNivel: 3 },
    { chave: 'bardo',     nome: 'Bardo',     pvBase: 12, pvNivel: 3, pmNivel: 4, pmAtr: 'car' },    // p. 44
    { chave: 'bucaneiro', nome: 'Bucaneiro', pvBase: 16, pvNivel: 4, pmNivel: 3 },
    { chave: 'cacador',   nome: 'Caçador',   pvBase: 16, pvNivel: 4, pmNivel: 4 },
    { chave: 'cavaleiro', nome: 'Cavaleiro', pvBase: 20, pvNivel: 5, pmNivel: 3 },
    { chave: 'clerigo',   nome: 'Clérigo',   pvBase: 16, pvNivel: 4, pmNivel: 5, pmAtr: 'sab' },    // p. 57
    { chave: 'druida',    nome: 'Druida',    pvBase: 16, pvNivel: 4, pmNivel: 4, pmAtr: 'sab' },    // p. 61
    { chave: 'frade',     nome: 'Frade',     pvBase: 12, pvNivel: 3, pmNivel: 6, pmAtr: 'sab' },    // Deuses, p. 39
    { chave: 'guerreiro', nome: 'Guerreiro', pvBase: 20, pvNivel: 5, pmNivel: 3 },
    { chave: 'inventor',  nome: 'Inventor',  pvBase: 12, pvNivel: 3, pmNivel: 4 },
    { chave: 'ladino',    nome: 'Ladino',    pvBase: 12, pvNivel: 3, pmNivel: 4 },
    { chave: 'lutador',   nome: 'Lutador',   pvBase: 20, pvNivel: 5, pmNivel: 3 },
    { chave: 'nobre',     nome: 'Nobre',     pvBase: 16, pvNivel: 4, pmNivel: 4 },
    { chave: 'paladino',  nome: 'Paladino',  pvBase: 20, pvNivel: 5, pmNivel: 3, pmAtr: 'car' },    // Abençoado, p. 82
    { chave: 'treinador', nome: 'Treinador', pvBase: 12, pvNivel: 3, pmNivel: 4 },
  ];

  // ── AS 14 CLASSES VARIANTES (Heróis de Arton, p. 22–44) ─────────
  //  "Classes variantes são modificações de suas versões básicas; as
  //  características e habilidades descritas aqui substituem as da
  //  classe básica" (p. 22). O `de` é a básica: sai do cabeçalho de
  //  cada seção e da Tabela 1-2, e as duas coisas batem. (No suplemento,
  //  a mesma tabela sai TORTA do pdftotext e casa guerreiro com
  //  alquimista — nunca tire o par de lá.)
  //  Quando o livro diz "como o inventor básico", o número NÃO está
  //  escrito aqui: vem da básica. Os que estão escritos são os quatro
  //  que o livro troca, e são justamente os que passariam batido:
  //    Burguês, Ermitão   12 PV e 3 por nível (o nobre e o druida: 16 e 4)
  //    Magimarcialista    16 PV e 4 por nível (o bardo: 12 e 3)
  //    Santo              4 PM por nível      (o paladino: 3)
  //  E dois trocam o atributo que somam no PM:
  //    Necromante         Int — "Seu atributo-chave para magias é
  //                       Inteligência" (p. 35), sem Caminho a escolher
  //    Usurpador          Car — "você soma seu Carisma no seu total de
  //                       PM" (p. 41); o clérigo soma Sabedoria
  //  A página ao lado é a do bloco de PV e PM de cada uma.
  const VARIANTES = [
    { chave: 'alquimista',       nome: 'Alquimista',       de: 'inventor'  },                          // p. 22
    { chave: 'atleta',           nome: 'Atleta',           de: 'lutador'   },                          // p. 24
    { chave: 'burgues',          nome: 'Burguês',          de: 'nobre',     pvBase: 12, pvNivel: 3 },  // p. 25
    { chave: 'duelista',         nome: 'Duelista',         de: 'bucaneiro' },                          // p. 27
    { chave: 'ermitao',          nome: 'Ermitão',          de: 'druida',    pvBase: 12, pvNivel: 3 },  // p. 29
    { chave: 'inovador',         nome: 'Inovador',         de: 'guerreiro' },                          // p. 31
    { chave: 'machado-de-pedra', nome: 'Machado de Pedra', de: 'barbaro'   },                          // p. 32
    { chave: 'magimarcialista',  nome: 'Magimarcialista',  de: 'bardo',     pvBase: 16, pvNivel: 4 },  // p. 34
    { chave: 'necromante',       nome: 'Necromante',       de: 'arcanista', pmAtr: 'int' },            // p. 35
    { chave: 'santo',            nome: 'Santo',            de: 'paladino',  pmNivel: 4 },              // p. 37
    { chave: 'seteiro',          nome: 'Seteiro',          de: 'cacador'   },                          // p. 39
    { chave: 'usurpador',        nome: 'Usurpador',        de: 'clerigo',   pmAtr: 'car' },            // p. 40
    { chave: 'vassalo',          nome: 'Vassalo',          de: 'cavaleiro' },                          // p. 41
    { chave: 'ventanista',       nome: 'Ventanista',       de: 'ladino'    },                          // p. 44
  ];

  // As 30 numa lista só. A variante herda da básica o que não reescreve:
  // é o "como o básico" do livro, feito conta.
  const BASICA_POR_CHAVE = {}; BASICAS.forEach(c => { BASICA_POR_CHAVE[c.chave] = c; });
  const CLASSES = BASICAS.concat(VARIANTES.map(v => Object.assign({}, BASICA_POR_CHAVE[v.de], v)));

  // ── O MELHOR AMIGO DO TREINADOR (Heróis de Arton, p. 17–22) ─────
  //  "Ao contrário de outros parceiros, seu melhor amigo possui uma
  //  ficha completa, com as características a seguir — mesmo que sejam
  //  diferentes da ficha de sua espécie" (p. 20). Por isso ele mora
  //  aqui, na ficha do jogador, e não no bestiário: um gorlogg melhor
  //  amigo NÃO é o gorlogg da p. 291.
  //  Tudo o que depende de nível usa o nível de TREINADOR ("Nível. Para
  //  efeitos baseados no nível do melhor amigo, use o nível do
  //  treinador") — ou o de personagem, com o poder Treinador Eclético
  //  (p. 19), mas só para PV, perícias e Defesa.
  const AMIGO = {
    atributos: { for: 1, des: 1, con: 1, int: -4, sab: 1, car: 0 },
    pvBase: 16, pvNivel: 4,          // "Começa com 16 pontos de vida + Constituição e ganha 4 PV + Con por nível"
    deslocamento: 12,                // "12m (8q)" — a montaria usa o que ela fornece
    tamanhos: ['Pequeno', 'Médio', 'Grande', 'Enorme'],   // Enorme só com o truque Amigão
    // "Perícias Treinadas. Escolha 3 entre…"
    pericias: ['acrobacia', 'atletismo', 'fortitude', 'furtividade', 'luta',
               'percepcao', 'pontaria', 'reflexos', 'sobrevivencia', 'vontade'],
    escolhe: 3,
    // "Possui uma arma natural (dano 1d8, crítico x2, corte, impacto ou
    // perfuração, escolhido ao criar o melhor amigo)"
    arma: { nome: 'arma natural', dano: '1d8', critico: '×2' },
  };

  //  As armas naturais de Ameaças de Arton, Tabela 2-1 (p. 374) — a lista
  //  de onde o livro deixa o treinador tirar a do amigo ("Se você tiver o
  //  suplemento Ameaças de Arton, pode escolher uma das armas naturais
  //  descritas na p. 374"). São DOZE, conferidas no -raw e no -layout; a
  //  tabela dá o nome e o tipo de dano, e mais nada.
  //  O dano do amigo continua 1d8 ×2, que é a regra DELE (p. 20): o
  //  "1d6 para uma criatura Pequena ou Média" da mesma página é regra de
  //  ameaça, e o amigo "possui uma ficha completa… mesmo que sejam
  //  diferentes da ficha de sua espécie".
  //  Duplicada de propósito: o js/criar-ameaca-data.js tem uma lista
  //  parecida, mas a ficha do jogador não puxa dado do bestiário (ver
  //  docs/ficha-do-jogador.md, "O que eu NÃO juntei"). E a de lá tem uma
  //  13ª, o Pseudópode, que não está na tabela — vem de uma ficha.
  const ARMAS_NATURAIS = [
    { nome: 'Cascos',    tipo: 'impacto' },
    { nome: 'Cauda',     tipo: 'impacto' },
    { nome: 'Chifres',   tipo: 'perfuração' },
    { nome: 'Ferrão',    tipo: 'perfuração' },
    { nome: 'Garra',     tipo: 'corte' },
    { nome: 'Marrada',   tipo: 'impacto' },
    { nome: 'Mordida',   tipo: 'perfuração' },
    { nome: 'Pancada',   tipo: 'impacto' },
    { nome: 'Pinça',     tipo: 'corte' },
    { nome: 'Presas',    tipo: 'perfuração' },
    { nome: 'Tentáculo', tipo: 'impacto' },
    { nome: 'Tromba',    tipo: 'impacto' },
  ];

  //  O tipo dá um pacote fixo (p. 20–21). `atr` e `treina` a ficha aplica
  //  sozinha ao trocar de tipo; o resto é texto, porque é regra de mesa.
  const TIPOS_AMIGO = [
    { chave: 'animal', nome: 'Animal', atr: { for: 1, des: 1, sab: 1 }, treina: ['percepcao', 'sobrevivencia'],
      texto: '+1 em Força, Destreza e Sabedoria, faro, visão na penumbra, treinamento em Percepção e Sobrevivência e +1 na margem de ameaça com suas armas naturais.' },
    { chave: 'construto', nome: 'Construto', atr: { con: 2 },
      texto: '+2 em Constituição, visão no escuro e imunidade a efeitos de cansaço, metabólicos e de veneno. Não respira, alimenta-se ou dorme; não é afetado por condições de descanso, não se beneficia de cura mundana e itens de alimentação e a perícia Cura não funciona com ele, mas Ofício (artesão) pode ser usada com os mesmos efeitos.' },
    { chave: 'espirito', nome: 'Espírito', atr: { sab: 1, car: 1 },
      texto: '+1 em Sabedoria e Carisma. Pode assumir uma forma incorpórea Minúscula de energia positiva ou negativa (escolhida ao ser criado) com deslocamento de voo 9m, que não pode atacar ou usar habilidades. Nessa forma, fornece +2 em perícias baseadas em Sabedoria (energia positiva) ou +2 em perícias baseadas em Carisma (energia negativa). Você pode gastar uma ação de movimento para fazê-lo mudar entre sua forma normal e sua forma incorpórea.' },
    { chave: 'monstro', nome: 'Monstro', atr: { for: 1, des: 1 },
      texto: '+1 em Força e Destreza, visão no escuro e uma segunda arma natural (quando o melhor amigo faz a ação agredir com outra arma, você pode gastar 1 PM para que ele faça um ataque corpo a corpo extra com essa arma).' },
    { chave: 'morto-vivo', nome: 'Morto-vivo', atr: { con: 2 },
      texto: '+2 em Constituição, visão no escuro e imunidade a efeitos de cansaço, metabólicos, de trevas e de veneno; não respira, alimenta-se ou dorme; não é afetado por condições de descanso, sofre dano por efeitos mágicos de cura de luz e recupera PV com dano de trevas.' },
  ];

  //  Os 22 truques (p. 21–22). "Ele começa com dois truques a sua escolha
  //  e recebe um novo truque a cada três níveis seguintes" (p. 17).
  //  `vezes`: o livro deixa tomar de novo. `atr`/`tamanho`: a ficha
  //  aplica ao ligar e desfaz ao desligar. Os que mexem em Defesa,
  //  ataque, dano, deslocamento e RD entram nas contas pela chave — ver
  //  as funções do amigo no ficha.js. O resto é texto.
  const TRUQUES = [
    { chave: 'alado', nome: 'Alado', req: 'Asas, 5º nível de treinador',
      texto: 'Seu melhor amigo ganha deslocamento de voo 15m.' },
    { chave: 'amigao', nome: 'Amigão', req: 'melhor amigo Grande, 7º nível de treinador', atr: { for: 1 }, tamanho: 'Enorme',
      texto: 'Seu melhor amigo recebe +1 em Força e o tamanho dele muda para Enorme. Isso aumenta o dano de suas armas naturais em um passo e afeta seu modificador de Furtividade e manobras (Tormenta20, p. 107).' },
    { chave: 'amigo-feroz', nome: 'Amigo Feroz',
      texto: 'Seu melhor amigo recebe +2 em testes de ataque e na margem de ameaça com suas armas naturais, e o dano delas aumenta em um passo.' },
    { chave: 'amigo-protetor', nome: 'Amigo Protetor',
      texto: 'Quando você sofre dano, caso seu melhor amigo esteja em alcance curto, você pode gastar 2 PM para que ele salte em sua defesa. Se fizer isso, você sofre apenas metade do dano e o melhor amigo sofre o restante.' },
    { chave: 'amigo-veterano', nome: 'Amigo Veterano', req: '5º nível de treinador',
      texto: 'Seu amigo vira um parceiro veterano de seu tipo.' },
    { chave: 'amigo-mestre', nome: 'Amigo Mestre', req: 'Amigo Veterano, 11º nível de treinador',
      texto: 'Seu amigo veterano vira um parceiro mestre de seu tipo.' },
    { chave: 'anatomia-humanoide', nome: 'Anatomia Humanoide', req: 'construto ou morto-vivo', atr: { int: 2 },
      texto: 'Seu melhor amigo tem uma forma humanoide e Int –2 (em vez de –4). Ele não recebe uma arma natural inicial, mas tem proficiência com armas simples e armaduras leves, pode empunhar dois itens e vestir um item adicional, e tem um limite de carga de 10 espaços. Este truque só pode ser escolhido na criação do melhor amigo.' },
    { chave: 'arma-natural-adicional', nome: 'Arma Natural Adicional', req: 'animal ou monstro',
      texto: 'Seu melhor amigo recebe uma arma natural adicional. Quando ele faz a ação agredir com outra arma, você pode gastar 1 PM para que ele faça um ataque corpo a corpo extra com essa arma.' },
    { chave: 'asas', nome: 'Asas',
      texto: 'Seu melhor amigo possui asas que podem ser usadas para pairar a 1,5m do chão com deslocamento 12m. Isso permite que ele ignore terreno difícil e o torna imune a dano por queda (a menos que esteja inconsciente). Você pode gastar 1 PM por rodada para que ele voe com deslocamento 12m.' },
    { chave: 'bote', nome: 'Bote', req: 'duas armas naturais',
      texto: 'Quando faz uma investida, seu melhor amigo pode atacar com todas as suas armas naturais. Todos os ataques recebem o bônus de +2 da investida, mas devem ser feitos contra o mesmo alvo.' },
    { chave: 'condicionamento-especial', nome: 'Condicionamento Especial', vezes: true,
      texto: 'O melhor amigo recebe +2 em um atributo e +1 em outro atributo, exceto Inteligência. Você pode escolher este truque uma vez por patamar.' },
    { chave: 'deslocamento-especial', nome: 'Deslocamento Especial', vezes: true,
      texto: 'Seu melhor amigo recebe deslocamento de escalada ou de natação igual a seu deslocamento base. Você pode escolher este truque uma segunda vez para que ele tenha ambos os deslocamentos.' },
    { chave: 'magia-inata', nome: 'Magia Inata', req: 'espírito', vezes: true,
      texto: 'Escolha uma magia de 1º círculo, arcana ou divina. Seu melhor amigo aprende e pode lançar essa magia (atributo-chave Carisma do treinador). Você pode escolher este truque outras vezes para magias diferentes.' },
    { chave: 'manobra-ensaiada', nome: 'Manobra Ensaiada',
      texto: 'Escolha uma manobra de combate. Seu melhor amigo recebe +2 em testes de ataque para executar essa manobra e, uma vez por rodada, quando ele acerta um ataque com uma arma natural, você pode gastar 1 PM para que ele faça essa manobra contra o alvo do ataque como uma ação livre.' },
    { chave: 'reanimacao-sombria', nome: 'Reanimação Sombria', req: 'morto-vivo',
      texto: 'Uma vez por cena, se seu melhor amigo estiver com 0 PV ou menos, você pode gastar 3 PM por patamar para reanimá-lo. Se você fizer isso, ele é reerguido com pontos de vida iguais à metade do seu máximo.' },
    { chave: 'reducao-de-dano', nome: 'Redução de Dano', req: '5º nível de treinador',
      texto: 'Seu melhor amigo recebe redução de dano 5.' },
    { chave: 'sopro', nome: 'Sopro', req: 'construto, espírito ou monstro',
      texto: 'Seu melhor amigo recebe um sopro de um tipo a sua escolha entre ácido, fogo, frio ou eletricidade. Você pode gastar uma ação padrão e uma quantidade de PM limitada pelo seu Carisma para que seu melhor amigo sopre um cone de 6m de energia do tipo escolhido. Para cada PM gasto, criaturas na área sofrem 2d8 pontos de dano do tipo escolhido (Reflexos CD Car do treinador reduz à metade).' },
    { chave: 'taticas-de-matilha', nome: 'Táticas de Matilha',
      texto: 'Se seu melhor amigo estiver flanqueando um inimigo, além do bônus normal por flanquear, recebe +2 nos testes de ataque (total +4) e nas rolagens de dano contra ele. Se você estiver flanqueando com ele, recebe os mesmos bônus.' },
    { chave: 'treinamento-de-companhia', nome: 'Treinamento de Companhia', req: 'animal',
      texto: 'Seu melhor amigo recebe uma ação de movimento adicional nos turnos dele (apenas para se deslocar).' },
    { chave: 'treinamento-defensivo', nome: 'Treinamento Defensivo',
      texto: 'Seu melhor amigo passa a receber um bônus na Defesa igual ao seu nível (em vez de metade do nível).' },
    { chave: 'treinamento-marcial', nome: 'Treinamento Marcial',
      texto: 'Seu melhor amigo recebe +2 em testes de ataque e rolagens de dano. Para cada patamar acima de iniciante, esse bônus aumenta em +1. Se ele possuir o truque Anatomia Humanoide, também recebe proficiência com armas marciais, armaduras pesadas e escudos.' },
    { chave: 'veloz', nome: 'Veloz',
      texto: 'Seu melhor amigo recebe +2 na Defesa e +3m em seus deslocamentos e se torna treinado em Atletismo (se já for, recebe +2 nessa perícia).' },
  ];

  //  "Em termos de regras, é um parceiro iniciante de um tipo a sua
  //  escolha" (p. 20) — e o parceiro dá um bônus ao treinador, que é o
  //  que se consulta no meio do combate. Os tipos e as montarias são os
  //  de Tormenta20, p. 260–262; Amigo Veterano e Amigo Mestre sobem o
  //  degrau. "Seu melhor amigo só fornece seus benefícios de parceiro se
  //  estiver em alcance curto de você."
  const PARCEIROS = [
    { chave: 'adepto', nome: 'Adepto',
      iniciante: 'o custo para lançar suas magias de 1º círculo diminui –1 PM.',
      veterano: 'como acima, mas também reduz o custo de suas magias de 2º círculo.',
      mestre: 'como acima, e esta redução se torna cumulativa com outras reduções.' },
    { chave: 'ajudante', nome: 'Ajudante',
      iniciante: 'você recebe +2 em duas perícias.',
      veterano: 'muda para +2 em três perícias.',
      mestre: 'muda para +4 em três perícias.',
      nota: 'As perícias são definidas pelo parceiro. Um ajudante não pode fornecer bônus em Luta ou Pontaria.' },
    { chave: 'assassino', nome: 'Assassino',
      iniciante: 'você pode usar a habilidade Ataque Furtivo +1d6. Se já possui a habilidade, o bônus é cumulativo.',
      veterano: 'além do Ataque Furtivo, fornece bônus por flanquear contra um inimigo por rodada.',
      mestre: 'muda o dano do Ataque Furtivo para +2d6.' },
    { chave: 'atirador', nome: 'Atirador',
      iniciante: 'uma vez por rodada, você recebe +1d6 em uma rolagem de dano à distância.',
      veterano: 'muda para +1d10.',
      mestre: 'muda para +2d8.' },
    { chave: 'combatente', nome: 'Combatente',
      iniciante: '+2 em testes de ataque.',
      veterano: 'muda para +3 em testes de ataque.',
      mestre: 'muda para +4 em testes de ataque e, uma vez por rodada, você pode gastar 5 PM para fazer um ataque extra.' },
    { chave: 'destruidor', nome: 'Destruidor',
      iniciante: 'uma vez por rodada, como uma ação livre, você pode gastar 1 PM para causar 2d6 pontos de dano de ácido, eletricidade, fogo ou frio (de acordo com o parceiro) em um alvo em alcance curto.',
      veterano: 'como acima, mas você também pode gastar 2 PM para causar 4d6 pontos de dano.',
      mestre: 'como acima, mas você também pode gastar 4 PM para causar 6d6 pontos de dano em uma área de 6m de raio em alcance médio.' },
    { chave: 'fortao', nome: 'Fortão',
      iniciante: 'uma vez por rodada, você recebe +1d8 em uma rolagem de dano corpo a corpo.',
      veterano: 'muda para +1d12.',
      mestre: 'muda para +3d6.' },
    { chave: 'guardiao', nome: 'Guardião',
      iniciante: 'você recebe +2 na Defesa.',
      veterano: 'muda para +3.',
      mestre: 'muda para +4 na Defesa e +2 em testes de resistência.' },
    { chave: 'magivocador', nome: 'Magivocador',
      iniciante: 'o dano de suas magias aumenta em +1 dado do mesmo tipo.',
      veterano: 'como acima, e a CD para resistir a suas magias aumenta em +1.',
      mestre: 'como acima, mas dobra os bônus (para um total de +2 dados de dano e +2 na CD).' },
    { chave: 'medico', nome: 'Médico',
      iniciante: 'uma vez por rodada você pode gastar 1 PM para curar 1d8+1 PV de uma criatura adjacente.',
      veterano: 'como acima, mas você pode gastar 3 PM para curar 3d8+3 PV ou remover uma condição prejudicial (como abalado ou fatigado).',
      mestre: 'como acima, mas você também pode gastar 5 PM para curar 6d8+6 PV.' },
    { chave: 'perseguidor', nome: 'Perseguidor',
      iniciante: '+2 em Percepção e Sobrevivência.',
      veterano: 'você pode usar Sentidos Aguçados.',
      mestre: 'você pode usar Percepção às Cegas.' },
    { chave: 'vigilante', nome: 'Vigilante',
      iniciante: '+2 em Percepção e Iniciativa.',
      veterano: 'você pode usar Esquiva Sobrenatural.',
      mestre: 'você pode usar Olhos nas Costas.' },
    // as montarias (p. 262): o bônus é o de montar nelas
    { chave: 'cavalo', nome: 'Montaria: cavalo', montaria: true,
      iniciante: 'seu deslocamento muda para 12m e você recebe uma ação de movimento extra por turno (apenas para se deslocar).',
      veterano: 'como acima, mas seu deslocamento muda para 15m e você recebe +2 em ataques corpo a corpo.',
      mestre: 'como acima, mas você recebe uma segunda ação de movimento extra por turno (novamente, apenas para se deslocar).' },
    { chave: 'cao-de-caca', nome: 'Montaria: cão de caça', montaria: true,
      iniciante: 'seu deslocamento muda para 9m, você pode usar faro e recebe uma ação de movimento extra por turno (apenas para se deslocar).',
      veterano: 'como acima, mas seu deslocamento muda para 12m e você recebe +2 na Defesa.',
      mestre: 'como acima; além disso, uma vez por rodada, quando acerta um ataque corpo a corpo, você pode fazer a manobra derrubar como uma ação livre.' },
    { chave: 'lobo-das-cavernas', nome: 'Montaria: lobo-das-cavernas', montaria: true,
      iniciante: 'seu deslocamento muda para 12m e você recebe uma ação de movimento extra por turno (apenas para se deslocar).',
      veterano: 'como acima, mas seu deslocamento muda para 15m e, uma vez por rodada, você recebe +1d8 em uma rolagem de dano corpo a corpo.',
      mestre: 'como acima; além disso, uma vez por rodada, quando acerta um ataque corpo a corpo, você pode fazer a manobra derrubar como uma ação livre.' },
    { chave: 'grifo', nome: 'Montaria: grifo', montaria: true,
      iniciante: 'uma vez por rodada, você recebe +1d8 em uma rolagem de dano corpo a corpo (um grifo iniciante é um filhote e não pode ser usado como montaria).',
      veterano: 'como acima, mas pode ser usado como montaria, mudando seu deslocamento para voo 18m.',
      mestre: 'como acima, mas você recebe uma ação de movimento extra por turno (apenas para se deslocar).' },
    { chave: 'gorlogg', nome: 'Montaria: gorlogg', montaria: true,
      iniciante: 'seu deslocamento muda para 12m e, uma vez por rodada, você recebe +1d6 em uma rolagem de dano corpo a corpo.',
      veterano: 'como acima, mas o bônus em rolagens de dano corpo a corpo muda para +1d10.',
      mestre: 'seu deslocamento muda para 15m e o bônus em rolagens de dano corpo a corpo muda para +2d8.' },
    { chave: 'trobo', nome: 'Montaria: trobo', montaria: true,
      iniciante: 'seu deslocamento muda para 9m e você recebe uma ação de movimento extra por turno (apenas para se deslocar) e +1 em testes de resistência.',
      veterano: 'como acima, mas seu deslocamento muda para 12m e o bônus em testes de resistência muda para +2.',
      mestre: 'como acima, mas o bônus em testes de resistência muda para +5.' },
  ];

  // Tamanhos (p. 106): só o rótulo e o deslocamento não mudam por aqui —
  // o modificador de Furtividade/manobras fica de fora de propósito, é
  // conta que a ficha não faz sozinha.
  const TAMANHOS = ['Minúsculo', 'Pequeno', 'Médio', 'Grande', 'Enorme', 'Colossal'];

  // ── OS OFÍCIOS DO LIVRO (p. 121) ───────────────────────────────
  //  São só uma sugestão de preenchimento: o livro diz "Você pode
  //  inventar outros tipos de Ofício: carpinteiro, pedreiro, ourives,
  //  fazendeiro, pescador, estalajadeiro, escriba, escultor, pintor…".
  //  A ficha não policia — a lista é atalho, não regra.
  const OFICIOS = [
    { nome: 'armeiro',     faz: 'Armas e Armaduras & Escudos' },
    { nome: 'artesão',     faz: 'Equipamento de Aventura, Ferramentas, Esotéricos e Veículos' },
    { nome: 'alquimista',  faz: 'Alquímicos' },
    { nome: 'cozinheiro',  faz: 'Alimentação' },
    { nome: 'alfaiate',    faz: 'Vestuário' },
  ];

  // ── ESPAÇOS (p. 141) ───────────────────────────────────────────
  //  "Por padrão, um item ocupa 1 espaço. Porém, há exceções" — e as
  //  exceções são estas quatro. A conta usa espaços em vez de peso
  //  para medir peso e volume ao mesmo tempo.
  const ESPACOS = [
    { v: 0.5, rot: '½',  ex: 'alquímicos, poções, pergaminhos e outros itens muito leves — dois deles ocupam 1 espaço' },
    { v: 1,   rot: '1',  ex: 'o padrão: 1 item = 1 espaço' },
    { v: 2,   rot: '2',  ex: 'armas de duas mãos, armaduras leves, escudos pesados, criaturas Minúsculas' },
    { v: 5,   rot: '5',  ex: 'armaduras pesadas, criaturas Pequenas, um barril ou baú' },
    { v: 10,  rot: '10', ex: 'itens extremamente pesados, como uma criatura Média' },
  ];

  // "Cada mil moedas, independentemente do tipo, ocupam 1 espaço" (p. 141).
  const MOEDAS_POR_ESPACO = 1000;

  // ── XP: a Tabela 1-4, Níveis de Personagem (p. 34) ───────────────
  //  "Você começa no 1º nível e com 0 XP. Quando acumula XP suficiente
  //  (conforme a tabela) você sobe de nível." Lido do PDF do Tormenta
  //  20 — Edição Jogo do Ano em 10/09/2026; é a MESMA tabela de onde
  //  sai o bônus de perícia (+2/+0, +3/+1…), que a ficha já calcula
  //  pela fórmula e bate linha a linha.
  //  O índice é o nível: XP_POR_NIVEL[1] = 0, XP_POR_NIVEL[20] = 190000.
  const XP_POR_NIVEL = [
    null,
    0,      1000,   3000,   6000,   10000,
    15000,  21000,  28000,  36000,  45000,
    55000,  66000,  78000,  91000,  105000,
    120000, 136000, 153000, 171000, 190000,
  ];

  const PERICIA_POR_CHAVE = {}; PERICIAS.forEach(p => { PERICIA_POR_CHAVE[p.chave] = p; });
  const CLASSE_POR_CHAVE  = {}; CLASSES.forEach(c  => { CLASSE_POR_CHAVE[c.chave]  = c;  });
  const porChave = lista => { const m = {}; lista.forEach(x => { m[x.chave] = x; }); return k => m[k] || null; };

  window.GA_FichaData = {
    ATRIBUTOS: ATRIBUTOS,
    PERICIAS: PERICIAS,
    CLASSES: CLASSES,
    AMIGO: AMIGO,
    ARMAS_NATURAIS: ARMAS_NATURAIS,
    TIPOS_AMIGO: TIPOS_AMIGO,
    TRUQUES: TRUQUES,
    PARCEIROS: PARCEIROS,
    tipoAmigo: porChave(TIPOS_AMIGO),
    truque:    porChave(TRUQUES),
    parceiro:  porChave(PARCEIROS),
    TAMANHOS: TAMANHOS,
    OFICIOS: OFICIOS,
    ESPACOS: ESPACOS,
    MOEDAS_POR_ESPACO: MOEDAS_POR_ESPACO,
    XP_POR_NIVEL: XP_POR_NIVEL,
    pericia: function (chave) { return PERICIA_POR_CHAVE[chave] || null; },
    classe:  function (chave) { return CLASSE_POR_CHAVE[chave]  || null; },
    // A classe que conta para as regras: a variante responde pela básica
    // — "para todos os efeitos, ambas são a mesma classe" (Heróis, p. 22).
    basicaDe: function (chave) {
      const c = CLASSE_POR_CHAVE[chave];
      return c ? (c.de || c.chave) : '';
    },
    // Em que nível esse tanto de XP põe o personagem (1 a 20).
    nivelDoXp: function (xp) {
      let n = 1;
      for (let i = 2; i < XP_POR_NIVEL.length; i++) if ((xp || 0) >= XP_POR_NIVEL[i]) n = i;
      return n;
    },
  };
})();
