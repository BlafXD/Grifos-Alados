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

  // ── AS 14 CLASSES: só o que é conta ────────────────────────────
  //  pvBase   PV do 1º nível (+ Constituição)
  //  pvNivel  PV por nível depois do 1º (+ Constituição)
  //  pmNivel  PM por nível (sem atributo nenhum)
  //  Poder, proficiência e habilidade de classe NÃO estão aqui: viram
  //  texto no bloco "Habilidades de classe e poderes", que é o combinado.
  const CLASSES = [
    { chave: 'arcanista', nome: 'Arcanista', pvBase:  8, pvNivel: 2, pmNivel: 6 },
    { chave: 'barbaro',   nome: 'Bárbaro',   pvBase: 24, pvNivel: 6, pmNivel: 3 },
    { chave: 'bardo',     nome: 'Bardo',     pvBase: 12, pvNivel: 3, pmNivel: 4 },
    { chave: 'bucaneiro', nome: 'Bucaneiro', pvBase: 16, pvNivel: 4, pmNivel: 3 },
    { chave: 'cacador',   nome: 'Caçador',   pvBase: 16, pvNivel: 4, pmNivel: 4 },
    { chave: 'cavaleiro', nome: 'Cavaleiro', pvBase: 20, pvNivel: 5, pmNivel: 3 },
    { chave: 'clerigo',   nome: 'Clérigo',   pvBase: 16, pvNivel: 4, pmNivel: 5 },
    { chave: 'druida',    nome: 'Druida',    pvBase: 16, pvNivel: 4, pmNivel: 4 },
    { chave: 'guerreiro', nome: 'Guerreiro', pvBase: 20, pvNivel: 5, pmNivel: 3 },
    { chave: 'inventor',  nome: 'Inventor',  pvBase: 12, pvNivel: 3, pmNivel: 4 },
    { chave: 'ladino',    nome: 'Ladino',    pvBase: 12, pvNivel: 3, pmNivel: 4 },
    { chave: 'lutador',   nome: 'Lutador',   pvBase: 20, pvNivel: 5, pmNivel: 3 },
    { chave: 'nobre',     nome: 'Nobre',     pvBase: 16, pvNivel: 4, pmNivel: 4 },
    { chave: 'paladino',  nome: 'Paladino',  pvBase: 20, pvNivel: 5, pmNivel: 3 },
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

  window.GA_FichaData = {
    ATRIBUTOS: ATRIBUTOS,
    PERICIAS: PERICIAS,
    CLASSES: CLASSES,
    TAMANHOS: TAMANHOS,
    OFICIOS: OFICIOS,
    ESPACOS: ESPACOS,
    MOEDAS_POR_ESPACO: MOEDAS_POR_ESPACO,
    XP_POR_NIVEL: XP_POR_NIVEL,
    pericia: function (chave) { return PERICIA_POR_CHAVE[chave] || null; },
    classe:  function (chave) { return CLASSE_POR_CHAVE[chave]  || null; },
    // Em que nível esse tanto de XP põe o personagem (1 a 20).
    nivelDoXp: function (xp) {
      let n = 1;
      for (let i = 2; i < XP_POR_NIVEL.length; i++) if ((xp || 0) >= XP_POR_NIVEL[i]) n = i;
      return n;
    },
  };
})();
