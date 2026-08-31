// ═══════════════════════════════════════════════════════════════════
//  CRIAR-AMEACA-DATA.JS — Manual de Criação de Ameaças (tabelas)
//  Fonte: "Ameaças de Arton", Capítulo 2 — Regras Avançadas de
//  Ameaças, seção "Manual de Criação de Ameaças" (p. 377–387 do
//  livro; p. 379–389 do PDF). Transcrito direto do PDF oficial.
//
//  Este arquivo guarda as TABELAS e listas fechadas. O texto corrido
//  do manual (os oito passos, os quadros, os exemplos) está em
//  js/criar-ameaca-manual.js. Quem monta a aba é js/criar-ameaca.js.
// ═══════════════════════════════════════════════════════════════════
window.GA_CRIAR_AMEACA = (function () {
  'use strict';

  // ── FONTE ────────────────────────────────────────────────────────
  const FONTE = {
    livro: 'Ameaças de Arton',
    capitulo: 'Capítulo 2 — Regras Avançadas de Ameaças',
    secao: 'Manual de Criação de Ameaças',
    paginas: 'p. 377–387',
  };

  // ── NÍVEIS DE DESAFIO (ordem canônica das Tabelas 2-3) ───────────
  //  24 linhas: 1/4, 1/2, 1 a 20, S e S+ — a mesma ordem nas três tabelas.
  const NDS = ['1/4', '1/2', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
               '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', 'S', 'S+'];

  // ND em número (para metade do ND, CD de extração, XP…). S e S+ contam
  // como ND 20 para estatísticas não listadas (Ameaças de Arton, p. 12).
  const ND_NUMERO = { '1/4': 0.25, '1/2': 0.5, 'S': 20, 'S+': 20 };
  NDS.forEach(function (nd) { if (!(nd in ND_NUMERO)) ND_NUMERO[nd] = parseInt(nd, 10); });

  // ── PATAMARES ────────────────────────────────────────────────────
  //  Seis linhas de ND cada, na ordem das tabelas. A ordem (1 a 4) é o
  //  multiplicador da quantidade de habilidades do Passo 5.
  const PATAMARES = [
    { id: 'iniciante', nome: 'Iniciante', ordem: 1, nds: ['1/4', '1/2', '1', '2', '3', '4'],
      desc: 'Aventureiro novato (1º ao 4º nível), envolvido em missões locais, como proteger vilas do ataque de bandidos e escoltar caravanas.' },
    { id: 'veterano', nome: 'Veterano', ordem: 2, nds: ['5', '6', '7', '8', '9', '10'],
      desc: 'Neste patamar (5º ao 10º nível), o herói presta serviços importantes a nobres e líderes de guildas.' },
    { id: 'campeao', nome: 'Campeão', ordem: 3, nds: ['11', '12', '13', '14', '15', '16'],
      desc: 'Já famoso por suas façanhas (11º ao 16º nível), o aventureiro trabalha para monarcas e enfrenta grandes vilões e monstros terríveis.' },
    { id: 'lenda', nome: 'Lenda', ordem: 4, nds: ['17', '18', '19', '20', 'S', 'S+'],
      desc: 'Entre os mais poderosos de Arton (17º ao 20º nível), o herói lida com perigos que ameaçam todo o mundo… ou mesmo toda a realidade! Os ND S e S+ ficam neste patamar.' },
  ];
  const ND_PATAMAR = {};
  PATAMARES.forEach(function (p) { p.nds.forEach(function (nd) { ND_PATAMAR[nd] = p.id; }); });

  // ── PAPÉIS DE COMBATE (Ameaças de Arton, p. 12) ──────────────────
  //  habs: [mínimo, máximo] de habilidades POR PATAMAR (Passo 5).
  const PAPEIS = [
    { id: 'solo', nome: 'Solo', icone: '⬤', habs: [1, 2],
      curto: 'Enfrenta os personagens sozinha. Estatísticas equilibradas e muitos PV.',
      desc: 'A criatura foi construída para enfrentar os personagens sozinha. Ela possui estatísticas equilibradas; em especial possui muitos pontos de vida, para garantir que o combate dure um tempo bom (por volta de 3 a 5 rodadas). Este papel é ocupado principalmente por grandes monstros e vilões.',
      dica: 'Ameaças solo têm estatísticas de combate mais equilibradas e são mais adequadas como criaturas que lutam sozinhas ou liderando grupos de lacaios. Um chefão ou um capitão geralmente será uma ameaça solo.' },
    { id: 'lacaio', nome: 'Lacaio', icone: '▲', habs: [1, 2],
      curto: 'Usada em grandes quantidades. Ataque e dano altos, poucos PV.',
      desc: 'A criatura foi construída para enfrentar os personagens em grandes quantidades. Assim, ao usar lacaios, normalmente você usará várias criaturas de ND menor que o nível do grupo, em vez de uma única criatura de ND igual ao nível do grupo. Por exemplo, um grupo de 5º nível pode enfrentar quatro lacaios de ND 1 (o que gera um encontro de ND 5). Lacaios possuem valores de ataque e dano mais altos, para garantir que continuem sendo um risco real para os personagens, mesmo considerando que seu ND será menor que o nível deles, mas menos pontos de vida, para serem derrotados rapidamente, mantendo o combate acelerado. Este papel é ocupado primariamente por humanoides e monstros pequenos.',
      dica: 'Lacaios têm valores de ataque e dano maiores, mas possuem estatísticas defensivas mais baixas. São mais adequados enquanto combatentes em grupo, como bandos de soldados ou saqueadores. Um assecla será um lacaio.' },
    { id: 'especial', nome: 'Especial', icone: '✦', habs: [2, 3],
      curto: 'Muitas habilidades, CD mais alta, ataque e Defesa menores.',
      desc: 'A criatura possui diversas habilidades especiais e/ou foi feita para ser usada em situações fora de combate direto (por exemplo, para enganar ou roubar os personagens). Este papel é ocupado também por conjuradores ou líderes — criaturas cujas habilidades fortalecem outras, e consequentemente devem ser usadas em conjunto com lacaios.',
      dica: 'Especiais possuem valores de ataque e Defesa menores, mas a CD para resistir às suas habilidades é mais alta e eles recebem mais habilidades por patamar. Um conjurador ou trapaceiro será um especial.' },
  ];

  // ── TABELA 2-3: PARÂMETROS DE CRIATURAS (p. 382, 383 e 384) ──────
  //  Ordem das colunas:
  //  [ valorDeAtaque, danoMedio, defesa, resForte(80%), resMedia(50%),
  //    resFraca(20%), pontosDeVida, cdEfeitoPadrao ]
  //
  //  Na Tabela 2-3 A e C o PDF desalinha a coluna de ND das linhas de
  //  números (o selo de ND é caixa gráfica). A ordem abaixo foi
  //  conferida por quatro âncoras do próprio manual: ND 1/4 solo tem
  //  dano médio 8; ND 4 solo tem ataque +16 e dano 24; ND 11 solo tem
  //  Defesa 41; e a ficha-exemplo do dejeto vivo (solo ND 6) imprime
  //  ataque +20, dano 56, Defesa 27 (reduzida de ND 5), PV 240
  //  (aumentado para ND 7 = 280), resistências 18/12/6 e CD 22.
  const PARAMETROS = {
    // Tabela 2-3 A: Solos
    solo: {
      '1/4': [6, 8, 11, 3, 0, -2, 7, 12],
      '1/2': [7, 10, 14, 6, 3, -1, 15, 13],
      '1':   [9, 15, 16, 11, 5, 0, 35, 14],
      '2':   [12, 18, 19, 13, 7, 2, 70, 16],
      '3':   [14, 21, 21, 15, 9, 3, 105, 17],
      '4':   [16, 24, 23, 16, 10, 4, 140, 18],
      '5':   [17, 40, 24, 17, 11, 5, 200, 20],
      '6':   [20, 56, 27, 18, 12, 6, 240, 22],
      '7':   [24, 62, 31, 20, 14, 7, 280, 24],
      '8':   [26, 68, 33, 21, 15, 8, 320, 26],
      '9':   [27, 74, 34, 21, 15, 9, 360, 28],
      '10':  [29, 80, 36, 22, 16, 10, 400, 30],
      '11':  [34, 130, 41, 24, 18, 11, 550, 31],
      '12':  [36, 144, 43, 26, 20, 12, 600, 33],
      '13':  [37, 158, 44, 26, 20, 13, 650, 35],
      '14':  [39, 172, 46, 28, 22, 14, 700, 38],
      '15':  [43, 186, 50, 28, 22, 15, 750, 40],
      '16':  [46, 200, 53, 30, 24, 16, 800, 42],
      '17':  [47, 270, 54, 30, 24, 17, 1020, 44],
      '18':  [49, 288, 56, 32, 26, 18, 1080, 47],
      '19':  [52, 306, 59, 32, 26, 19, 1140, 47],
      '20':  [54, 324, 61, 34, 28, 20, 1200, 49],
      'S':   [58, 360, 65, 36, 30, 22, 2500, 51],
      'S+':  [65, 500, 70, 38, 33, 25, 4000, 55],
    },
    // Tabela 2-3 B: Lacaios
    lacaio: {
      '1/4': [7, 9, 10, 2, 0, -1, 4, 12],
      '1/2': [9, 11, 13, 5, 3, 0, 6, 13],
      '1':   [11, 17, 15, 10, 5, 1, 9, 14],
      '2':   [14, 21, 18, 12, 7, 3, 14, 16],
      '3':   [16, 24, 20, 14, 9, 4, 21, 17],
      '4':   [17, 32, 22, 15, 10, 5, 28, 18],
      '5':   [20, 56, 23, 16, 11, 6, 40, 20],
      '6':   [24, 62, 26, 17, 12, 7, 48, 22],
      '7':   [26, 68, 30, 19, 14, 8, 56, 24],
      '8':   [27, 74, 32, 20, 15, 9, 64, 26],
      '9':   [29, 80, 33, 20, 15, 10, 72, 28],
      '10':  [34, 105, 35, 21, 16, 11, 80, 30],
      '11':  [36, 144, 40, 23, 18, 12, 110, 31],
      '12':  [37, 158, 42, 25, 20, 13, 120, 33],
      '13':  [39, 172, 43, 25, 20, 14, 130, 35],
      '14':  [43, 186, 45, 27, 22, 15, 140, 38],
      '15':  [46, 200, 49, 27, 22, 16, 150, 40],
      '16':  [47, 235, 52, 29, 24, 17, 160, 42],
      '17':  [49, 288, 53, 29, 24, 18, 204, 44],
      '18':  [52, 306, 55, 31, 26, 19, 216, 47],
      '19':  [54, 324, 58, 31, 26, 20, 228, 47],
      '20':  [56, 344, 60, 33, 28, 21, 240, 49],
      'S':   [60, 385, 64, 35, 30, 23, 500, 51],
      'S+':  [67, 540, 69, 37, 33, 26, 800, 55],
    },
    // Tabela 2-3 C: Especiais
    especial: {
      '1/4': [4, 8, 11, 3, 0, -2, 5, 14],
      '1/2': [5, 10, 12, 6, 3, -1, 11, 15],
      '1':   [7, 15, 14, 11, 5, 0, 25, 16],
      '2':   [10, 18, 17, 13, 7, 2, 49, 18],
      '3':   [12, 21, 19, 15, 9, 3, 74, 19],
      '4':   [14, 24, 21, 16, 10, 4, 98, 20],
      '5':   [15, 40, 22, 17, 11, 5, 140, 22],
      '6':   [18, 56, 25, 18, 12, 6, 168, 24],
      '7':   [22, 62, 29, 20, 14, 7, 196, 26],
      '8':   [24, 68, 31, 21, 15, 8, 224, 28],
      '9':   [25, 74, 32, 21, 15, 9, 252, 30],
      '10':  [27, 80, 34, 22, 16, 10, 280, 32],
      '11':  [32, 130, 39, 24, 18, 11, 385, 33],
      '12':  [34, 144, 41, 26, 20, 12, 420, 35],
      '13':  [35, 158, 42, 26, 20, 13, 455, 37],
      '14':  [37, 172, 44, 28, 22, 14, 490, 40],
      '15':  [41, 186, 48, 28, 22, 15, 525, 42],
      '16':  [44, 200, 51, 30, 24, 16, 560, 44],
      '17':  [45, 270, 52, 30, 24, 17, 714, 46],
      '18':  [47, 288, 54, 32, 26, 18, 756, 49],
      '19':  [50, 306, 57, 32, 26, 19, 798, 49],
      '20':  [52, 324, 59, 34, 28, 20, 840, 51],
      'S':   [55, 360, 63, 36, 30, 22, 1750, 55],
      'S+':  [60, 500, 67, 38, 33, 25, 2800, 60],
    },
  };

  // nomes das colunas, na ordem dos arrays acima
  const PARAM_COLUNAS = [
    { chave: 'ataque',   rotulo: 'Valor de Ataque',        curto: 'Ataque',   sinal: true },
    { chave: 'dano',     rotulo: 'Dano Médio',             curto: 'Dano' },
    { chave: 'defesa',   rotulo: 'Defesa',                 curto: 'Defesa' },
    { chave: 'resForte', rotulo: 'Resistência Forte (80%)', curto: 'Res. forte', sinal: true },
    { chave: 'resMedia', rotulo: 'Resistência Média (50%)', curto: 'Res. média', sinal: true },
    { chave: 'resFraca', rotulo: 'Resistência Fraca (20%)', curto: 'Res. fraca', sinal: true },
    { chave: 'pv',       rotulo: 'Pontos de Vida',         curto: 'PV' },
    { chave: 'cd',       rotulo: 'Efeito Padrão (CD)',     curto: 'CD' },
  ];

  // ── TIPOS DE CRIATURA (Ameaças de Arton, p. 13–14) ───────────────
  const TIPOS = [
    { id: 'animal', nome: 'Animal',
      desc: 'A maior parte dos animais reais (cães, gatos, cavalos…) também existe em Arton. No entanto, a influência de forças mágicas e deuses caprichosos também provocou o surgimento de bestas espantosas. De lagartos-trovão a insetos gigantes, Arton é habitada por um sem número de feras fantásticas — que, no entanto, ainda são consideradas animais normais.\nDe modo geral, animais são seres vivos sem inteligência suficiente para desenvolver um idioma (Int –5 ou –4) e sem habilidades sobrenaturais. Um animal inteligente ou com poderes mágicos é considerado um monstro, mas muitos animais têm habilidades “naturais” como venenos e toxinas, apêndices adaptados (tentáculos, ferrões, chifres) ou órgãos especializados, como estômagos enormes capazes de engolir e digerir criaturas de seu tamanho.',
      habilidades: '' },
    { id: 'construto', nome: 'Construto',
      desc: 'Objetos animados ou criaturas fabricadas artificialmente, seja por magia, seja por ciência. Normalmente, construtos não possuem inteligência real; em vez disso, são programados para realizar apenas certas tarefas (como proteger um lugar).',
      habilidades: 'visão no escuro; imunidade a cansaço, efeitos de metabolismo e veneno; não recuperam PV por descanso, e efeitos de cura e a perícia Cura não funcionam com eles — mas a perícia Ofício (artesão) pode ser usada no lugar dela com os mesmos efeitos' },
    { id: 'espirito', nome: 'Espírito',
      desc: 'Seres nativos de outros Planos — dimensões muito além de Arton. Têm uma profunda conexão com as energias primais da Criação, desde os próprios elementos até as forças primordiais do Bem, do Mal, da Ordem e do Caos, passando por aspectos dos próprios deuses.',
      habilidades: '', nota: 'Espíritos geralmente possuem visão no escuro, mas isso não é uma característica inerente do tipo.' },
    { id: 'humanoide', nome: 'Humanoide',
      desc: 'Este grupo inclui membros de raças que lembram os humanos, com a mesma anatomia básica. Têm cabeça, tronco, dois braços e duas pernas. Ou quase isso. Todos os humanoides são inteligentes, com suas próprias culturas e sociedades. Todo humanoide possui uma raça (como humano, anão etc.) ou subtipo (como gigante etc.).',
      habilidades: '', subtipoDica: 'Todo humanoide possui uma raça (humano, anão, goblin…) ou subtipo (gigante…) — escreva-a no campo de subtipo.' },
    { id: 'monstro', nome: 'Monstro',
      desc: 'Dos majestosos dragões aos aberrantes lefeu, monstros são criaturas de anatomia estranha ou com habilidades mágicas. Muitos têm origem ligada à Tormenta, mesmo que não tenham características lefeu — a própria existência da Tempestade Rubra causa o surgimento de seres aberrantes. Outros, como dragões e entes, são criações dos deuses.',
      habilidades: '' },
    { id: 'morto-vivo', nome: 'Morto-vivo',
      desc: 'Duvidosa “dádiva” oferecida por Tenebra e outros deuses, mortos-vivos são cadáveres animados por meio de energia negativa. A maior parte dos mortos-vivos perde toda e qualquer capacidade de pensar. Outros ficam insanos, presos a recordações passadas. Alguns poucos, porém, conservam — ou mesmo superam — a inteligência que tinham em vida.',
      habilidades: 'visão no escuro; imunidade a cansaço, efeitos de metabolismo, trevas e veneno; sofrem dano por efeitos mágicos de cura de luz (Von CD do efeito reduz à metade), e recuperam PV com dano de trevas' },
  ];

  // ── TABELA 1-1: TAMANHO DE CRIATURAS (p. 13) ─────────────────────
  //  danoNatural / desarmado: passo do dado por tamanho (Ameaças de
  //  Arton, "Ataques Desarmados & Armas Naturais"). Base 1d6 / 1d3 em
  //  Pequena e Média; Minúscula −1 passo; Grande/Enorme +1; Colossal +2.
  const TAMANHOS = [
    { id: 'minusculo', nome: 'Minúsculo', ordem: 0, exemplos: 'Falcão, rato, sílfide',
      espaco: '1,5m', furtividade: 5, manobras: -5, danoNatural: '1d4', desarmado: '1d2', porte: 'p' },
    { id: 'pequeno', nome: 'Pequeno', ordem: 1, exemplos: 'Cão, goblin, hynne',
      espaco: '1,5m', furtividade: 2, manobras: -2, danoNatural: '1d6', desarmado: '1d3', porte: 'p' },
    { id: 'medio', nome: 'Médio', ordem: 2, exemplos: 'Humano, anão, elfo',
      espaco: '1,5m', furtividade: 0, manobras: 0, danoNatural: '1d6', desarmado: '1d3', porte: 'm' },
    { id: 'grande', nome: 'Grande', ordem: 3, exemplos: 'Cavalo, ogro, serpe',
      espaco: '3m', furtividade: -2, manobras: 2, danoNatural: '1d8', desarmado: '1d4', porte: 'g' },
    { id: 'enorme', nome: 'Enorme', ordem: 4, exemplos: 'Ente, gigante, hidra',
      espaco: '4,5m', furtividade: -5, manobras: 5, danoNatural: '1d8', desarmado: '1d4', porte: 'g' },
    { id: 'colossal', nome: 'Colossal', ordem: 5, exemplos: 'Colosso, dragão, kraken',
      espaco: '9m', furtividade: -10, manobras: 10, danoNatural: '1d10', desarmado: '1d6', porte: 'g' },
  ];

  // ── TABELA 2-2: DESLOCAMENTOS DE CRIATURAS (p. 379) ──────────────
  //  porte: 'p' = Pequeno ou menor · 'm' = Médio · 'g' = Grande ou maior
  //  ('*' = a linha não depende do tamanho)
  const DESLOCAMENTOS = {
    terrestre: [
      { id: 'bipede',     porte: 'p', rotulo: 'Bípede (Pequeno ou menor)',     lento: '4,5m', normal: '6m',  rapido: '9m' },
      { id: 'bipede',     porte: 'm', rotulo: 'Bípede (Médio)',                lento: '6m',   normal: '9m',  rapido: '12m' },
      { id: 'bipede',     porte: 'g', rotulo: 'Bípede (Grande ou maior)',      lento: '9m',   normal: '12m', rapido: '15m' },
      { id: 'quadrupede', porte: 'p', rotulo: 'Quadrúpede (Pequeno ou menor)', lento: '6m',   normal: '9m',  rapido: '12m' },
      { id: 'quadrupede', porte: 'm', rotulo: 'Quadrúpede (Médio)',            lento: '9m',   normal: '12m', rapido: '15m' },
      { id: 'quadrupede', porte: 'g', rotulo: 'Quadrúpede (Grande ou maior)',  lento: '12m',  normal: '15m', rapido: '18m' },
    ],
    outros: [
      { id: 'voo',       porte: 'p', rotulo: 'Voador (Pequeno ou menor)', lento: '12m',  normal: '15m', rapido: '18m' },
      { id: 'voo',       porte: 'm', rotulo: 'Voador (Médio)',            lento: '15m',  normal: '18m', rapido: '24m' },
      { id: 'voo',       porte: 'g', rotulo: 'Voador (Grande ou maior)',  lento: '18m',  normal: '24m', rapido: '36m' },
      { id: 'escalada',  porte: '*', rotulo: 'Escalador',                 lento: '4,5m', normal: '9m',  rapido: '12m' },
      { id: 'escavacao', porte: '*', rotulo: 'Escavador',                 lento: '4,5m', normal: '6m',  rapido: '9m' },
      { id: 'natacao',   porte: '*', rotulo: 'Nadador',                   lento: '9m',   normal: '15m', rapido: '24m' },
    ],
  };

  // rótulo de cada deslocamento especial na linha do statblock
  const DESL_ROTULOS = { escalada: 'escalada', escavacao: 'escavação', natacao: 'natação', voo: 'voo' };

  // ── TABELA 2-4: CATEGORIAS DE ATRIBUTOS (p. 384) ─────────────────
  const ATRIBUTO_CATEGORIAS = [
    { nome: 'Incapaz',        valores: [-5],     rotulo: '–5' },
    { nome: 'Incompetente',   valores: [-4, -3], rotulo: '–4/–3' },
    { nome: 'Ineficaz',       valores: [-2, -1], rotulo: '–2/–1' },
    { nome: 'Mediano',        valores: [0, 1],   rotulo: '0/1' },
    { nome: 'Notável',        valores: [2, 3],   rotulo: '2/3' },
    { nome: 'Excelente',      valores: [4, 5],   rotulo: '4/5' },
    { nome: 'Extraordinário', valores: [6, 7],   rotulo: '6/7' },
    { nome: 'Excepcional',    valores: [8],      rotulo: '8+' },
  ];

  const ATRIBUTOS = [
    { id: 'for', nome: 'Força',        curto: 'For' },
    { id: 'des', nome: 'Destreza',     curto: 'Des' },
    { id: 'con', nome: 'Constituição', curto: 'Con' },
    { id: 'int', nome: 'Inteligência', curto: 'Int' },
    { id: 'sab', nome: 'Sabedoria',    curto: 'Sab' },
    { id: 'car', nome: 'Carisma',      curto: 'Car' },
  ];

  // ── TABELA 3-2: DANO DE ARMAS (Tormenta20, p. 143) ───────────────
  //  Cada linha é uma "escada": ache o dado na coluna Normal e ande
  //  para os lados. Colunas: −2, −1, Normal, +1, +2, +3 passos.
  const PASSOS_CABECALHO = ['–2 Passos', '–1 Passo', 'Normal', '+1 Passo', '+2 Passos', '+3 Passos'];
  const PASSOS_DANO = [
    ['1',    '1d2',  '1d3',                '1d4',  '1d6',  '1d8'],
    ['1d2',  '1d3',  '1d4',                '1d6',  '1d8',  '1d10'],
    ['1d3',  '1d4',  '1d6',                '1d8',  '1d10', '1d12'],
    ['1d4',  '1d6',  '1d8 ou 2d4',         '1d10', '1d12', '3d6'],
    ['1d6',  '1d8',  '1d10',               '1d12', '3d6',  '4d6'],
    ['1d8',  '1d10', '1d12, 2d6 ou 3d4',   '3d6',  '4d6',  '4d8'],
    ['1d10', '2d6',  '2d8',                '3d8',  '4d8',  '4d10'],
    ['2d6',  '2d8',  '2d10',               '3d10', '4d10', '4d12 (máximo)'],
  ];
  // a escada limpa (uma entrada por dado) que o botão "+1 passo" usa
  const ESCADA_DADOS = ['1', '1d2', '1d3', '1d4', '1d6', '1d8', '1d10', '1d12', '3d6', '4d6', '4d8', '4d10', '4d12'];

  // ── PASSO 0: FUNÇÕES MAIS COMUNS DE AMEAÇAS (p. 378) ─────────────
  const FUNCOES = [
    { id: 'combatente', nome: 'Combatente', papel: 'solo',
      desc: 'Uma ameaça planejada para ser eficiente em combate; especializada em causar dano e resistir a ele. Estas ameaças geralmente possuem valores ofensivos (ataque e dano) e defensivos (Defesa, pontos de vida) elevados, complementados por habilidades que aprimoram seus ataques ou as tornam mais resistentes. Um combatente pode ser desde um mercenário até um animal predador, como um urso.' },
    { id: 'conjurador', nome: 'Conjurador', papel: 'especial',
      desc: 'Uma criatura que utiliza magias ou habilidades mágicas/especiais como sua principal forma de “ataque”. Estas ameaças geralmente possuem valores de ataque e dano baixos, mas contam com efeitos capazes de causar dano em área, impor condições ou afetar o terreno em seu favor. Um conjurador pode ser um mago — como um necromante veterano — ou alguém com habilidades que geram efeitos variados, como um goblin engenhoqueiro.' },
    { id: 'trapaceiro', nome: 'Trapaceiro', papel: 'especial',
      desc: 'Ameaças deste tipo combinam ataques e habilidades para confundir ou prejudicar seus oponentes, geralmente se valendo do ambiente. Alternativamente, pode ser uma ameaça “social”, alguém capaz de enfrentar os personagens em cenas fora de combate, como um cortesão astuto ou um batedor de carteiras no mercado da cidade.' },
    { id: 'assecla', nome: 'Assecla', papel: 'lacaio',
      desc: 'Ameaças simples, feitas para ser utilizadas em grande quantidade. De forma geral, asseclas terão poucos pontos de vida e Defesa baixa, mas ataques e dano elevados. Observe que asseclas não precisam ser necessariamente “fracos”; a ideia é criar uma ficha com poucas habilidades e ações de combate simples, para que o mestre possa usar várias destas criaturas em uma mesma cena sem que o jogo fique lento ou complicado.' },
    { id: 'capitao', nome: 'Capitão', papel: 'solo',
      desc: 'Um capitão é uma ameaça planejada para liderar um grupo de asseclas. Pode representar uma versão superior dessas criaturas (como um líder de bando goblin liderando seus combatentes, ou um oficial comandando soldados puristas) ou pode ser um tipo de criatura diferente, relacionado apenas tematicamente aos seus comandados (como um elfo necromante que lidera esqueletos ou zumbis). Estas ameaças geralmente combinam características de combatente, conjurador ou trapaceiro com habilidades para fornecer bônus aos asseclas ou controlar o campo de batalha, dando a seus aliados uma vantagem estratégica.' },
    { id: 'chefao', nome: 'Chefão', papel: 'solo',
      desc: 'Um chefão é uma ameaça planejada para enfrentar os personagens sozinha. Chefões geralmente são adversários mais complexos, com diversas habilidades de ataque, defesa e controle do campo de batalha. Como um chefão terá que enfrentar vários oponentes, é importante que possa fazer vários ataques por rodada ou possua habilidades capazes de afetar mais de uma criatura ao mesmo tempo. Isso irá impedir que os personagens possam “anular” o chefão simplesmente posicionando um personagem particularmente resistente contra ele. Embora não seja obrigatório, ao desenvolver um chefão, pode ser uma boa ideia pensar em um tema para suas habilidades (como efeitos relacionados a gelo ou a condições mentais, por exemplo). A seção [[chefe-final|“Chefe Final” do Capítulo 1]] apresenta regras para criar chefões particularmente desafiadores.' },
  ];

  // ── PERÍCIAS (Tormenta20, Tabela 2-1, p. 115) ────────────────────
  //  `fixa: true` = já tem linha própria no statblock (Iniciativa,
  //  Percepção e as três resistências) e não entra na linha "Perícias".
  const PERICIAS = [
    { nome: 'Acrobacia',     atr: 'des', soTreinada: false },
    { nome: 'Adestramento',  atr: 'car', soTreinada: true },
    { nome: 'Atletismo',     atr: 'for', soTreinada: false },
    { nome: 'Atuação',       atr: 'car', soTreinada: true },
    { nome: 'Cavalgar',      atr: 'des', soTreinada: false },
    { nome: 'Conhecimento',  atr: 'int', soTreinada: true },
    { nome: 'Cura',          atr: 'sab', soTreinada: false },
    { nome: 'Diplomacia',    atr: 'car', soTreinada: false },
    { nome: 'Enganação',     atr: 'car', soTreinada: false },
    { nome: 'Fortitude',     atr: 'con', soTreinada: false, fixa: 'fort' },
    { nome: 'Furtividade',   atr: 'des', soTreinada: false },
    { nome: 'Guerra',        atr: 'int', soTreinada: true },
    { nome: 'Iniciativa',    atr: 'des', soTreinada: false, fixa: 'iniciativa' },
    { nome: 'Intimidação',   atr: 'car', soTreinada: false },
    { nome: 'Intuição',      atr: 'sab', soTreinada: false },
    { nome: 'Investigação',  atr: 'int', soTreinada: false },
    { nome: 'Jogatina',      atr: 'car', soTreinada: true },
    { nome: 'Ladinagem',     atr: 'des', soTreinada: true },
    { nome: 'Luta',          atr: 'for', soTreinada: false },
    { nome: 'Misticismo',    atr: 'int', soTreinada: true },
    { nome: 'Nobreza',       atr: 'int', soTreinada: true },
    { nome: 'Ofício',        atr: 'int', soTreinada: true },
    { nome: 'Percepção',     atr: 'sab', soTreinada: false, fixa: 'percepcao' },
    { nome: 'Pilotagem',     atr: 'des', soTreinada: true },
    { nome: 'Pontaria',      atr: 'des', soTreinada: false },
    { nome: 'Reflexos',      atr: 'des', soTreinada: false, fixa: 'ref' },
    { nome: 'Religião',      atr: 'sab', soTreinada: true },
    { nome: 'Sobrevivência', atr: 'sab', soTreinada: false },
    { nome: 'Vontade',       atr: 'sab', soTreinada: false, fixa: 'von' },
  ];

  // Bônus de treinamento por ND (Tormenta20, p. 114: +2 do 1º ao 6º,
  // +4 do 7º ao 14º, +6 do 15º em diante — o manual lembra disso ao
  // falar das "mudanças que ocorrem em ND 7 e 15").
  function bonusTreinamento(ndNum) {
    if (ndNum >= 15) return 6;
    if (ndNum >= 7) return 4;
    return 2;
  }

  // ── ARMAS NATURAIS (Ameaças de Arton, Capítulo 1) ────────────────
  const ARMAS_NATURAIS = [
    { nome: 'Garra',      tipo: 'corte' },
    { nome: 'Mordida',    tipo: 'perfuração' },
    { nome: 'Chifres',    tipo: 'perfuração' },
    { nome: 'Presas',     tipo: 'perfuração' },
    { nome: 'Ferrão',     tipo: 'perfuração' },
    { nome: 'Pinça',      tipo: 'corte' },
    { nome: 'Cascos',     tipo: 'impacto' },
    { nome: 'Cauda',      tipo: 'impacto' },
    { nome: 'Marrada',    tipo: 'impacto' },
    { nome: 'Pancada',    tipo: 'impacto' },
    { nome: 'Tromba',     tipo: 'impacto' },
    { nome: 'Tentáculo',  tipo: 'impacto' },
    { nome: 'Pseudópode', tipo: 'impacto' },
  ];

  const TIPOS_DANO = ['corte', 'impacto', 'perfuração', 'ácido', 'eletricidade', 'fogo',
                      'frio', 'luz', 'trevas', 'psíquico', 'essência', 'veneno'];

  const EXECUCOES = ['—', 'Livre', 'Padrão', 'Movimento', 'Completa', 'Reação'];

  // ── TESOURO (Tormenta20, Capítulo 8) ─────────────────────────────
  const TESOUROS = [
    { id: 'nenhum', nome: 'Nenhum', desc: 'A criatura não fornece tesouro — não se rola na tabela.' },
    { id: 'metade', nome: 'Metade', desc: 'Divide pela metade os resultados da coluna Dinheiro.' },
    { id: 'padrao', nome: 'Padrão', desc: 'Rola normalmente na linha do ND da criatura.' },
    { id: 'dobro',  nome: 'Dobro',  desc: 'Rola duas vezes em CADA coluna (Dinheiro e Itens).' },
  ];

  return {
    FONTE: FONTE, NDS: NDS, ND_NUMERO: ND_NUMERO,
    PATAMARES: PATAMARES, ND_PATAMAR: ND_PATAMAR, PAPEIS: PAPEIS,
    PARAMETROS: PARAMETROS, PARAM_COLUNAS: PARAM_COLUNAS,
    TIPOS: TIPOS, TAMANHOS: TAMANHOS,
    DESLOCAMENTOS: DESLOCAMENTOS, DESL_ROTULOS: DESL_ROTULOS,
    ATRIBUTO_CATEGORIAS: ATRIBUTO_CATEGORIAS, ATRIBUTOS: ATRIBUTOS,
    PASSOS_DANO: PASSOS_DANO, PASSOS_CABECALHO: PASSOS_CABECALHO,
    ESCADA_DADOS: ESCADA_DADOS,
    FUNCOES: FUNCOES, PERICIAS: PERICIAS, bonusTreinamento: bonusTreinamento,
    ARMAS_NATURAIS: ARMAS_NATURAIS, TIPOS_DANO: TIPOS_DANO,
    EXECUCOES: EXECUCOES, TESOUROS: TESOUROS,
  };
})();
