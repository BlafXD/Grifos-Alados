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
    { chave: 'oficio',        nome: 'Ofício',        atr: 'int', treinada: true,  armadura: false },
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

  const PERICIA_POR_CHAVE = {}; PERICIAS.forEach(p => { PERICIA_POR_CHAVE[p.chave] = p; });
  const CLASSE_POR_CHAVE  = {}; CLASSES.forEach(c  => { CLASSE_POR_CHAVE[c.chave]  = c;  });

  window.GA_FichaData = {
    ATRIBUTOS: ATRIBUTOS,
    PERICIAS: PERICIAS,
    CLASSES: CLASSES,
    TAMANHOS: TAMANHOS,
    pericia: function (chave) { return PERICIA_POR_CHAVE[chave] || null; },
    classe:  function (chave) { return CLASSE_POR_CHAVE[chave]  || null; },
  };
})();
