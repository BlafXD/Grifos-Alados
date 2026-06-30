// ═══════════════════════════════════════════════════════════════════
//  RECOMPENSAS.JS — Gerador de Recompensas Aleatórias (Tormenta 20)
//  Extraído de gerador-recompensas.html e adaptado para o site
//  Grifos Alados. Inicializado de forma lazy quando a aba é clicada.
// ═══════════════════════════════════════════════════════════════════

"use strict";

/* ═══════════════════════════════════════════════════════
   1. DADOS DAS TABELAS
   ═══════════════════════════════════════════════════════ */

/*
  Estrutura de resultado de DINHEIRO:
    null                            → nada
    { dice, bonus?, mult, cur }     → dinheiro normal
    { riq: true, tier, cnt?, cntX?, cntB?, pct? } → riqueza

  Estrutura de resultado de ITEM:
    null
    { t:'diverso' }
    { t:'equip', twoD? }
    { t:'pocao', cnt?, cntX?, cntB?, pct? }
    { t:'sup',   qtd, twoD? }
    { t:'mag',   tier:'menor'|'medio'|'maior', twoD? }

  Legenda:
    cnt  = quantidade fixa
    cntX = expressão de dados para quantidade (ex: "1d3")
    cntB = bônus na expressão (ex: 1 → 1d3+1)
    pct  = +% (boolean)
    twoD = rolar duas vezes, escolher melhor
*/

const ND_TABLE = {
  "1/4":{
    m:[
      {max:30, r:null},
      {max:70, r:{dice:"1d6",mult:10,cur:"TC"}},
      {max:95, r:{dice:"1d4",mult:100,cur:"TC"}},
      {max:100,r:{dice:"1d6",mult:10,cur:"T$"}},
    ],
    i:[
      {max:50, r:null},
      {max:75, r:{t:'diverso'}},
      {max:100,r:{t:'equip'}},
    ]
  },
  "1/2":{
    m:[
      {max:25, r:null},
      {max:70, r:{dice:"2d6",mult:10,cur:"TC"}},
      {max:95, r:{dice:"2d8",mult:10,cur:"T$"}},
      {max:100,r:{dice:"1d4",mult:100,cur:"T$"}},
    ],
    i:[
      {max:45, r:null},
      {max:70, r:{t:'diverso'}},
      {max:100,r:{t:'equip'}},
    ]
  },
  "1":{
    m:[
      {max:20, r:null},
      {max:70, r:{dice:"3d8",mult:10,cur:"T$"}},
      {max:95, r:{dice:"4d12",mult:10,cur:"T$"}},
      {max:100,r:{riq:true,tier:"menor",cnt:1}},
    ],
    i:[
      {max:40, r:null},
      {max:65, r:{t:'diverso'}},
      {max:90, r:{t:'equip'}},
      {max:100,r:{t:'pocao',cnt:1}},
    ]
  },
  "2":{
    m:[
      {max:15, r:null},
      {max:55, r:{dice:"3d10",mult:10,cur:"T$"}},
      {max:85, r:{dice:"2d4",mult:100,cur:"T$"}},
      {max:95, r:{dice:"2d6",bonus:1,mult:100,cur:"T$"}},
      {max:100,r:{riq:true,tier:"menor",cnt:1}},
    ],
    i:[
      {max:30, r:null},
      {max:40, r:{t:'diverso'}},
      {max:70, r:{t:'equip'}},
      {max:90, r:{t:'pocao',cnt:1}},
      {max:100,r:{t:'sup',qtd:1}},
    ]
  },
  "3":{
    m:[
      {max:10, r:null},
      {max:20, r:{dice:"4d12",mult:10,cur:"T$"}},
      {max:60, r:{dice:"1d4",mult:100,cur:"T$"}},
      {max:90, r:{dice:"1d8",mult:10,cur:"TO"}},
      {max:100,r:{riq:true,tier:"menor",cntX:"1d3"}},
    ],
    i:[
      {max:25, r:null},
      {max:35, r:{t:'diverso'}},
      {max:60, r:{t:'equip'}},
      {max:85, r:{t:'pocao',cnt:1}},
      {max:100,r:{t:'sup',qtd:1}},
    ]
  },
  "4":{
    m:[
      {max:10, r:null},
      {max:50, r:{dice:"1d6",mult:100,cur:"T$"}},
      {max:80, r:{dice:"1d12",mult:100,cur:"T$"}},
      {max:90, r:{riq:true,tier:"menor",cnt:1,pct:true}},
      {max:100,r:{riq:true,tier:"menor",cntX:"1d3",pct:true}},
    ],
    i:[
      {max:20, r:null},
      {max:30, r:{t:'diverso'}},
      {max:55, r:{t:'equip',twoD:true}},
      {max:80, r:{t:'pocao',cnt:1,pct:true}},
      {max:100,r:{t:'sup',qtd:1,twoD:true}},
    ]
  },
  "5":{
    m:[
      {max:15, r:null},
      {max:65, r:{dice:"1d8",mult:100,cur:"T$"}},
      {max:95, r:{dice:"3d4",mult:10,cur:"TO"}},
      {max:100,r:{riq:true,tier:"media",cnt:1}},
    ],
    i:[
      {max:20, r:null},
      {max:70, r:{t:'pocao',cnt:1}},
      {max:90, r:{t:'sup',qtd:1}},
      {max:100,r:{t:'sup',qtd:2}},
    ]
  },
  "6":{
    m:[
      {max:15, r:null},
      {max:60, r:{dice:"2d6",mult:100,cur:"T$"}},
      {max:90, r:{dice:"2d10",mult:100,cur:"T$"}},
      {max:100,r:{riq:true,tier:"menor",cntX:"1d3",cntB:1}},
    ],
    i:[
      {max:20, r:null},
      {max:65, r:{t:'pocao',cnt:1,pct:true}},
      {max:95, r:{t:'sup',qtd:1}},
      {max:100,r:{t:'sup',qtd:2,twoD:true}},
    ]
  },
  "7":{
    m:[
      {max:10, r:null},
      {max:60, r:{dice:"2d8",mult:100,cur:"T$"}},
      {max:90, r:{dice:"2d12",mult:10,cur:"TO"}},
      {max:100,r:{riq:true,tier:"menor",cntX:"1d4",cntB:1}},
    ],
    i:[
      {max:20, r:null},
      {max:60, r:{t:'pocao',cntX:"1d3"}},
      {max:90, r:{t:'sup',qtd:2}},
      {max:100,r:{t:'sup',qtd:3}},
    ]
  },
  "8":{
    m:[
      {max:10, r:null},
      {max:55, r:{dice:"2d10",mult:100,cur:"T$"}},
      {max:95, r:{riq:true,tier:"menor",cntX:"1d4",cntB:1}},
      {max:100,r:{riq:true,tier:"media",cnt:1,pct:true}},
    ],
    i:[
      {max:20, r:null},
      {max:75, r:{t:'pocao',cntX:"1d3"}},
      {max:95, r:{t:'sup',qtd:2}},
      {max:100,r:{t:'sup',qtd:3,twoD:true}},
    ]
  },
  "9":{
    m:[
      {max:10, r:null},
      {max:35, r:{riq:true,tier:"media",cnt:1}},
      {max:85, r:{dice:"4d6",mult:100,cur:"T$"}},
      {max:100,r:{riq:true,tier:"media",cntX:"1d3"}},
    ],
    i:[
      {max:20, r:null},
      {max:70, r:{t:'pocao',cnt:1,pct:true}},
      {max:95, r:{t:'sup',qtd:3}},
      {max:100,r:{t:'mag',tier:"menor"}},
    ]
  },
  "10":{
    m:[
      {max:10, r:null},
      {max:30, r:{dice:"4d6",mult:100,cur:"T$"}},
      {max:85, r:{dice:"4d10",mult:10,cur:"TO"}},
      {max:100,r:{riq:true,tier:"media",cntX:"1d3",cntB:1}},
    ],
    i:[
      {max:50, r:null},
      {max:75, r:{t:'pocao',cntX:"1d3",cntB:1}},
      {max:90, r:{t:'sup',qtd:3}},
      {max:100,r:{t:'mag',tier:"menor"}},
    ]
  },
  "11":{
    m:[
      {max:10, r:null},
      {max:45, r:{dice:"2d4",mult:1000,cur:"T$"}},
      {max:85, r:{riq:true,tier:"media",cntX:"1d3"}},
      {max:100,r:{dice:"2d6",mult:100,cur:"TO"}},
    ],
    i:[
      {max:45, r:null},
      {max:70, r:{t:'pocao',cntX:"1d4",cntB:1}},
      {max:90, r:{t:'sup',qtd:3}},
      {max:100,r:{t:'mag',tier:"menor",twoD:true}},
    ]
  },
  "12":{
    m:[
      {max:10, r:null},
      {max:45, r:{riq:true,tier:"media",cnt:1,pct:true}},
      {max:80, r:{dice:"2d6",mult:1000,cur:"T$"}},
      {max:100,r:{riq:true,tier:"media",cntX:"1d4",cntB:1}},
    ],
    i:[
      {max:45, r:null},
      {max:70, r:{t:'pocao',cntX:"1d3",cntB:1,pct:true}},
      {max:85, r:{t:'sup',qtd:4}},
      {max:100,r:{t:'mag',tier:"menor"}},
    ]
  },
  "13":{
    m:[
      {max:10, r:null},
      {max:45, r:{dice:"4d4",mult:1000,cur:"T$"}},
      {max:80, r:{riq:true,tier:"media",cntX:"1d3",cntB:1}},
      {max:100,r:{dice:"4d6",mult:100,cur:"TO"}},
    ],
    i:[
      {max:40, r:null},
      {max:65, r:{t:'pocao',cntX:"1d4",cntB:1,pct:true}},
      {max:95, r:{t:'sup',qtd:4}},
      {max:100,r:{t:'mag',tier:"medio"}},
    ]
  },
  "14":{
    m:[
      {max:10, r:null},
      {max:45, r:{riq:true,tier:"media",cntX:"1d3",cntB:1}},
      {max:80, r:{dice:"3d6",mult:1000,cur:"T$"}},
      {max:100,r:{riq:true,tier:"maior",cnt:1}},
    ],
    i:[
      {max:40, r:null},
      {max:65, r:{t:'pocao',cntX:"1d4",cntB:1,pct:true}},
      {max:90, r:{t:'sup',qtd:4}},
      {max:100,r:{t:'mag',tier:"medio"}},
    ]
  },
  "15":{
    m:[
      {max:10, r:null},
      {max:45, r:{riq:true,tier:"media",cnt:1,pct:true}},
      {max:80, r:{dice:"2d10",mult:1000,cur:"T$"}},
      {max:100,r:{dice:"1d4",mult:1000,cur:"TO"}},
    ],
    i:[
      {max:35, r:null},
      {max:45, r:{t:'pocao',cntX:"1d6",cntB:1}},
      {max:85, r:{t:'sup',qtd:4,twoD:true}},
      {max:100,r:{t:'mag',tier:"medio"}},
    ]
  },
  "16":{
    m:[
      {max:10, r:null},
      {max:40, r:{dice:"3d6",mult:1000,cur:"T$"}},
      {max:75, r:{dice:"3d10",mult:100,cur:"TO"}},
      {max:100,r:{riq:true,tier:"maior",cntX:"1d3"}},
    ],
    i:[
      {max:35, r:null},
      {max:45, r:{t:'pocao',cntX:"1d6",cntB:1,pct:true}},
      {max:80, r:{t:'sup',qtd:4,twoD:true}},
      {max:100,r:{t:'mag',tier:"medio"}},
    ]
  },
  "17":{
    m:[
      {max:5,  r:null},
      {max:40, r:{dice:"4d6",mult:1000,cur:"T$"}},
      {max:75, r:{riq:true,tier:"media",cntX:"1d3",pct:true}},
      {max:100,r:{dice:"2d4",mult:1000,cur:"TO"}},
    ],
    i:[
      {max:20, r:null},
      {max:40, r:{t:'mag',tier:"menor"}},
      {max:80, r:{t:'mag',tier:"medio"}},
      {max:100,r:{t:'mag',tier:"maior"}},
    ]
  },
  "18":{
    m:[
      {max:5,  r:null},
      {max:40, r:{dice:"4d10",mult:1000,cur:"T$"}},
      {max:75, r:{riq:true,tier:"maior",cnt:1}},
      {max:100,r:{riq:true,tier:"maior",cntX:"1d3",cntB:1}},
    ],
    i:[
      {max:15, r:null},
      {max:40, r:{t:'mag',tier:"menor",twoD:true}},
      {max:70, r:{t:'mag',tier:"medio"}},
      {max:100,r:{t:'mag',tier:"maior"}},
    ]
  },
  "19":{
    m:[
      {max:5,  r:null},
      {max:40, r:{dice:"4d12",mult:1000,cur:"T$"}},
      {max:75, r:{riq:true,tier:"maior",cnt:1,pct:true}},
      {max:100,r:{dice:"1d12",mult:1000,cur:"TO"}},
    ],
    i:[
      {max:10, r:null},
      {max:40, r:{t:'mag',tier:"menor",twoD:true}},
      {max:60, r:{t:'mag',tier:"medio",twoD:true}},
      {max:100,r:{t:'mag',tier:"maior"}},
    ]
  },
  "20":{
    m:[
      {max:5,  r:null},
      {max:40, r:{dice:"2d4",mult:1000,cur:"TO"}},
      {max:75, r:{riq:true,tier:"maior",cntX:"1d3"}},
      {max:100,r:{riq:true,tier:"maior",cntX:"1d3",cntB:1,pct:true}},
    ],
    i:[
      {max:5,  r:null},
      {max:40, r:{t:'mag',tier:"menor",twoD:true}},
      {max:50, r:{t:'mag',tier:"medio",twoD:true}},
      {max:100,r:{t:'mag',tier:"maior",twoD:true}},
    ]
  },
};

/* ═══════════════════════════════════════════════════════
   1b. TABELA DE RIQUEZAS
   ═══════════════════════════════════════════════════════ */

// 13 linhas de valor únicas, compartilhadas pelas 3 colunas
const RIQUEZA_ROWS = [
  { idx:0,  dice:"4d4",  mult:1,      vAprox:"~10 T$"        },
  { idx:1,  dice:"1d4",  mult:10,     vAprox:"~25 T$"        },
  { idx:2,  dice:"2d4",  mult:10,     vAprox:"~50 T$"        },
  { idx:3,  dice:"4d6",  mult:10,     vAprox:"~140 T$"       },
  { idx:4,  dice:"1d6",  mult:100,    vAprox:"~350 T$"       },
  { idx:5,  dice:"2d6",  mult:100,    vAprox:"~700 T$"       },
  { idx:6,  dice:"2d8",  mult:100,    vAprox:"~900 T$"       },
  { idx:7,  dice:"4d10", mult:100,    vAprox:"~2.200 T$"     },
  { idx:8,  dice:"6d12", mult:100,    vAprox:"~3.900 T$"     },
  { idx:9,  dice:"2d10", mult:1000,   vAprox:"~11.000 T$"    },
  { idx:10, dice:"6d8",  mult:1000,   vAprox:"~27.000 T$"    },
  { idx:11, dice:"1d10", mult:10000,  vAprox:"~55.000 T$"    },
  { idx:12, dice:"4d12", mult:10000,  vAprox:"~260.000 T$"   },
];

// Referência a RIQUEZA_ROWS pelo índice da linha global
const RIQUEZA_TABLE = {
  menor: [
    {max:25,  rowIdx:0},
    {max:40,  rowIdx:1},
    {max:55,  rowIdx:2},
    {max:70,  rowIdx:3},
    {max:85,  rowIdx:4},
    {max:95,  rowIdx:5},
    {max:99,  rowIdx:6},
    {max:100, rowIdx:7},
  ],
  media: [
    {max:10,  rowIdx:2},
    {max:30,  rowIdx:3},
    {max:50,  rowIdx:4},
    {max:65,  rowIdx:5},
    {max:80,  rowIdx:6},
    {max:90,  rowIdx:7},
    {max:95,  rowIdx:8},
    {max:99,  rowIdx:9},
    {max:100, rowIdx:10},
  ],
  maior: [
    {max:5,   rowIdx:4},
    {max:15,  rowIdx:5},
    {max:25,  rowIdx:6},
    {max:40,  rowIdx:7},
    {max:60,  rowIdx:8},
    {max:75,  rowIdx:9},
    {max:85,  rowIdx:10},
    {max:95,  rowIdx:11},
    {max:100, rowIdx:12},
  ],
};

// Exemplos de itens por faixa de valor, agrupados por peso (espaços de inventário)
const RIQUEZA_EXEMPLOS = [
  /* 0 ~10 T$ */
  [{peso:"½ esp.",   itens:"ágata trincada, anel de hematita, bule de chá gravado em prata, soldadinhos de chumbo do Exército do Reinado, jarro de mel, prato de bronze, tapeçaria simples, tinta de tecido"},
   {peso:"1 esp.",   itens:"caixa com velas aromáticas, estandarte em algodão de um nobre menor, kobold de pelúcia em tamanho natural, roldana de ferro"},
   {peso:"2 esp.",   itens:"barrilete de óleo cru, espantalho imitando um hynne nobre, rolo de algodão tecido, tela para pintura"},
   {peso:"5 esp.",   itens:"barril de farinha ou gaiola com galinhas"}],
  /* 1 ~25 T$ */
  [{peso:"½ esp.",   itens:"colar de presas de bulette, livreto de poesia bucaneira, quartzo rosa, topázio"},
   {peso:"1 esp.",   itens:"ânfora de prata com símbolo de Marah (dobro em templo da deusa), caixa de tabaco, rolo de linho, urna de sais aromáticos (pode ser ingrediente), saco com penas de hipossauro"},
   {peso:"2 esp.",   itens:"conjunto de talheres de prata, jarro de especiarias (canela, gorad, pimenta ou sal)"},
   {peso:"5 esp.",   itens:"candelabro de bronze, colchão de palha de boa qualidade"}],
  /* 2 ~50 T$ */
  [{peso:"½ esp.",   itens:"ampulheta, arreios de prata, barra de gorad, bracelete de ouro finamente trabalhado, cadeado de latão, leque de bambu e seda, garrafa com água do Mar Negro"},
   {peso:"1 esp.",   itens:"bengala de ébano com cabeça de serpente de marfim, estatueta de osso entalhado, frutas exóticas (estragam em 2d4 dias), lamparina de ouro, livro de crônicas roramarianas, molde para velas, rolo de seda"},
   {peso:"2 esp.",   itens:"brazeiro de latão decorado, cobertura para montaria, couro curtido de burafonte, vaso de prata"}],
  /* 3 ~140 T$ */
  [{peso:"½ esp.",   itens:"ametista, cartas de um nobre falecido (herdeiros pagam dobro), frasco de tinta allavir, pente de madeira Tollon, pérola branca, suspensórios elegantes"},
   {peso:"1 esp.",   itens:"caixa com 5 pares de meias de seda, cálice de prata com lápis-lazúli, lingote de prata, sapatilha élfica, tiara sinuosa para medusa, traje de festa (+2 Diplomacia na 1ª cena usada)"},
   {peso:"2 esp.",   itens:"alvo sofisticado (+1 Pontaria até fim da aventura, mas se destrói após), bloco de gelo das Uivantes (derrete em 1d6+3 dias), estatueta de cocatriz com olhos de madrepérola"},
   {peso:"5 esp.",   itens:"tapeçaria grande e bem-feita de lã"},
   {peso:"20 esp.",  itens:"porta de madeira maciça finamente entalhada"}],
  /* 4 ~350 T$ */
  [{peso:"½ esp.",   itens:"alexandrita, pérola negra, peruca de crina de pégaso"},
   {peso:"1 esp.",   itens:"caleidoscópio de bronze com imagens doheritas, espada cerimonial ornada com prata e gema negra, toga tapistana bordada em ouro, pente de prata com pedras preciosas, roda de queijo de seiva de galhada (12 fatias; cada uma recupera 1d4+1 PV), sapatos de dança em couro de serpe"},
   {peso:"2 esp.",   itens:"relógio de parede kliren"},
   {peso:"5 esp.",   itens:"cadeira de madeira Tollon, cavalo de balanço com crina de verdade"},
   {peso:"10 esp.",  itens:"conjunto de velas de um galeão"}],
  /* 5 ~700 T$ */
  [{peso:"½ esp.",   itens:"baralho de Wyrt com tinta de ouro, bracelete banhado em adamante, condecoração militar da Guerra Artoniana"},
   {peso:"1 esp.",   itens:"escultura de vidro de areia de Halak-Tur, estatueta de Valkaria em prata azulada, pente em forma de dragão com olhos de gema vermelha, máscara teatral de marfim com pedras preciosas, réplica do machado Zakharin (portá-lo é crime no Reinado), vestido digno de uma princesa"},
   {peso:"2 esp.",   itens:"telescópio portátil"},
   {peso:"5 esp.",   itens:"barril de cerveja fina de Doherimm, harpa de madeira exótica com ornamentos de zircão e marfim"},
   {peso:"10 esp.",  itens:"tronco de madeira Tollon"}],
  /* 6 ~900 T$ */
  [{peso:"½ esp.",   itens:"brinco com joia de aço-rubi, opala negra, tapa-olho com olho falso de safira"},
   {peso:"1 esp.",   itens:"luva bordada e adornada com gemas, pingente de opala vermelha com corrente de ouro"},
   {peso:"2 esp.",   itens:"gaiola de prata para falcoaria, lingote de ouro, pintura antiga"},
   {peso:"5 esp.",   itens:"barril de especiarias de Moreania"}],
  /* 7 ~2.200 T$ */
  [{peso:"½ esp.",   itens:"esmeralda verde, pingente de safira"},
   {peso:"1 esp.",   itens:"caixinha de música de ouro, ovo de grifo (com cuidado pode virar parceiro grifo!), tornozeleira com gemas"},
   {peso:"2 esp.",   itens:"manto bordado em veludo e seda com inúmeras pedras preciosas"},
   {peso:"5 esp.",   itens:"berço de madeira Tollon com detalhes em ouro, chafariz de mármore para jardim, conjunto de taças de cristal em caixote"},
   {peso:"20 esp.",  itens:"coluna de mármore em estilo neogórdio"}],
  /* 8 ~3.900 T$ */
  [{peso:"½ esp.",   itens:"anel de prata e safira, correntinha com pérolas rosas, diamante branco, pingente de ouro com topázio em forma de Marah"},
   {peso:"1 esp.",   itens:"espelho feito na Pondsmânia (adiciona traços feéricos ao reflexo do usuário)"},
   {peso:"2 esp.",   itens:"miniatura mecânica de um dragão por inventor renomado, tábua de granito com a Tarvica em letras de ouro, vestido digno de uma rainha"},
   {peso:"5 esp.",   itens:"ídolo de ouro puro maciço, quadro élfico em estilo sobrenaturalista"},
   {peso:"100 esp.", itens:"bloco de mármore bruto"}],
  /* 9 ~11.000 T$ */
  [{peso:"½ esp.",   itens:"anel de ouro e rubi, diamante vermelho"},
   {peso:"1 esp.",   itens:"tiara de mitral cravejada de rubis"},
   {peso:"2 esp.",   itens:"conjunto de taças de ouro decoradas com esmeraldas"},
   {peso:"5 esp.",   itens:"busto de Tanna-Toh por artista famoso, globo de Arton com pedras preciosas nos pontos de interesse"},
   {peso:"10 esp.",  itens:"quadro do arquimago Vectorius em tamanho natural"},
   {peso:"20 esp.",  itens:"piano em madeira Tollon com cordas de mitral e teclas de marfim de Galrasia, estátua dourada de Klunk"}],
  /* 10 ~27.000 T$ */
  [{peso:"1 esp.",   itens:"coroa de ouro adornada com centenas de gemas de um antigo monarca"},
   {peso:"2 esp.",   itens:"baú de mitral com coleção de diamantes, tapeçaria da Tormenta em estilo grigoriano (1 PM temporário para devotos de Aharadak por dia)"},
   {peso:"5 esp.",   itens:"estatueta de gelo eterno com essência elemental agitada em seu interior"},
   {peso:"20 esp.",  itens:"meteorito de adamante bruto, sino de catedral de ouro maciço"}],
  /* 11 ~55.000 T$ */
  [{peso:"1 esp.",   itens:"elmo de matéria vermelha com rubis e turmalinas"},
   {peso:"10 esp.",  itens:"altar religioso em granito e onix com inscrições em ouro, sarcófago de ouro cravejado de gemas"},
   {peso:"20 esp.",  itens:"arca de madeira reforçada repleta de lingotes de prata e ouro e pedras preciosas de vários tipos"}],
  /* 12 ~260.000 T$ */
  [{peso:"20 esp.",  itens:"estátua titanoteica em aventurina de uma divindade do Panteão"},
   {peso:"—",        itens:"uma sala forrada de moedas (exige trabalhadores e carroças; atrai bandidos, coletores de impostos e aproveitadores de vários tipos)"}],
];

/* ═══════════════════════════════════════════════════════
   1c. TABELA DE ITENS DIVERSOS
   ═══════════════════════════════════════════════════════ */

const ITEM_DIVERSO_TABLE = [
  {max:1,   item:"Ácido",                        livro:"Tormenta20",       pag:160},
  {max:2,   item:"Água benta",                   livro:"Tormenta20",       pag:155},
  {max:3,   item:"Alaúde élfico",                livro:"Tormenta20",       pag:158},
  {max:4,   item:"Algemas",                      livro:"Tormenta20",       pag:155},
  {max:5,   item:"Baga-de-fogo",                 livro:"Tormenta20",       pag:160},
  {max:8,   item:"Bálsamo restaurador",          livro:"Tormenta20",       pag:160},
  {max:9,   item:"Bandana",                      livro:"Tormenta20",       pag:159},
  {max:10,  item:"Bandoleira de poções",         livro:"Tormenta20",       pag:155},
  {max:11,  item:"Bomba",                        livro:"Tormenta20",       pag:160},
  {max:12,  item:"Botas reforçadas",             livro:"Tormenta20",       pag:159},
  {max:13,  item:"Camisa bufante",               livro:"Tormenta20",       pag:159},
  {max:14,  item:"Capa esvoaçante",              livro:"Tormenta20",       pag:159},
  {max:15,  item:"Capa pesada",                  livro:"Tormenta20",       pag:159},
  {max:16,  item:"Casaco longo",                 livro:"Tormenta20",       pag:159},
  {max:17,  item:"Chapéu arcano",                livro:"Tormenta20",       pag:159},
  {max:18,  item:"Coleção de livros",            livro:"Tormenta20",       pag:158},
  {max:19,  item:"Cosmético",                    livro:"Tormenta20",       pag:160},
  {max:20,  item:"Dente-de-dragão",              livro:"Tormenta20",       pag:161},
  {max:21,  item:"Enfeite de elmo",              livro:"Tormenta20",       pag:159},
  {max:22,  item:"Elixir do amor",               livro:"Tormenta20",       pag:160},
  {max:23,  item:"Equipamento de viagem",        livro:"Tormenta20",       pag:155},
  {max:26,  item:"Essência de mana",             livro:"Tormenta20",       pag:160},
  {max:27,  item:"Estojo de disfarces",          livro:"Tormenta20",       pag:158},
  {max:28,  item:"Farrapos de ermitão",          livro:"Tormenta20",       pag:159},
  {max:29,  item:"Flauta mística",               livro:"Tormenta20",       pag:158},
  {max:30,  item:"Fogo alquímico",               livro:"Tormenta20",       pag:160},
  {max:31,  item:"Gorro de ervas",               livro:"Tormenta20",       pag:159},
  {max:32,  item:"Líquen lilás",                 livro:"Tormenta20",       pag:161},
  {max:33,  item:"Luneta",                       livro:"Tormenta20",       pag:158},
  {max:34,  item:"Luva de pelica",               livro:"Tormenta20",       pag:159},
  {max:35,  item:"Maleta de medicamentos",       livro:"Tormenta20",       pag:158},
  {max:36,  item:"Manopla",                      livro:"Tormenta20",       pag:159},
  {max:37,  item:"Manto eclesiástico",           livro:"Tormenta20",       pag:159},
  {max:38,  item:"Mochila de aventureiro",       livro:"Tormenta20",       pag:155},
  {max:39,  item:"Musgo púrpura",               livro:"Tormenta20",       pag:161},
  {max:40,  item:"Organizador de pergaminhos",   livro:"Tormenta20",       pag:155},
  {max:41,  item:"Ossos de monstro",             livro:"Tormenta20",       pag:161},
  {max:42,  item:"Pó de cristal",               livro:"Tormenta20",       pag:161},
  {max:43,  item:"Pó de giz",                   livro:"Tormenta20",       pag:161},
  {max:44,  item:"Pó do desaparecimento",       livro:"Tormenta20",       pag:160},
  {max:45,  item:"Robe místico",                livro:"Tormenta20",       pag:159},
  {max:46,  item:"Saco de sal",                  livro:"Tormenta20",       pag:161},
  {max:47,  item:"Sapatos de camurça",           livro:"Tormenta20",       pag:159},
  {max:48,  item:"Seixo de âmbar",              livro:"Tormenta20",       pag:161},
  {max:49,  item:"Sela",                         livro:"Tormenta20",       pag:158},
  {max:50,  item:"Tabardo",                      livro:"Tormenta20",       pag:159},
  {max:51,  item:"Traje da corte",               livro:"Tormenta20",       pag:159},
  {max:52,  item:"Terra de cemitério",           livro:"Tormenta20",       pag:161},
  {max:53,  item:"Veste de seda",                livro:"Tormenta20",       pag:159},
  {max:54,  item:"Corda de teia",                livro:"Ameaças de Arton", pag:396},
  {max:55,  item:"Dente de wisphago",            livro:"Ameaças de Arton", pag:396},
  {max:56,  item:"Bomba de fumaça",              livro:"Ameaças de Arton", pag:396},
  {max:57,  item:"Elixir quimérico",             livro:"Ameaças de Arton", pag:396},
  {max:58,  item:"Éter elemental",              livro:"Ameaças de Arton", pag:396},
  {max:59,  item:"Óleo de besouro",             livro:"Ameaças de Arton", pag:397},
  {max:60,  item:"Água benta concentrada",       livro:"Deuses de Arton",  pag:48},
  {max:61,  item:"Aspersório",                   livro:"Deuses de Arton",  pag:48},
  {max:62,  item:"Patuá",                        livro:"Deuses de Arton",  pag:49},
  {max:63,  item:"Panfleto de aforismos",        livro:"Deuses de Arton",  pag:49},
  {max:64,  item:"Texto sagrado",                livro:"Deuses de Arton",  pag:49},
  {max:65,  item:"Hábito sacerdotal",            livro:"Deuses de Arton",  pag:49},
  {max:66,  item:"Manto de alto sacerdote",      livro:"Deuses de Arton",  pag:49},
  {max:67,  item:"Sandálias",                    livro:"Deuses de Arton",  pag:51},
  {max:68,  item:"Piercing de umbigo",           livro:"Deuses de Arton",  pag:51},
  {max:69,  item:"Incenso",                      livro:"Deuses de Arton",  pag:52},
  {max:70,  item:"Santa granada de mão",         livro:"Deuses de Arton",  pag:52},
  {max:71,  item:"Fitilho consagrado",           livro:"Deuses de Arton",  pag:52},
  {max:72,  item:"Pena de anjo",                 livro:"Deuses de Arton",  pag:52},
  {max:73,  item:"Ábaco",                       livro:"Heróis de Arton",  pag:227},
  {max:74,  item:"Ampulheta",                    livro:"Heróis de Arton",  pag:227},
  {max:75,  item:"Astrolábio",                   livro:"Heróis de Arton",  pag:227},
  {max:76,  item:"Bainha adornada",              livro:"Heróis de Arton",  pag:227},
  {max:77,  item:"Bússola",                     livro:"Heróis de Arton",  pag:227},
  {max:78,  item:"Diagrama anatômico",          livro:"Heróis de Arton",  pag:230},
  {max:79,  item:"Estrepes",                     livro:"Heróis de Arton",  pag:230},
  {max:80,  item:"Lampião de foco",              livro:"Heróis de Arton",  pag:230},
  {max:81,  item:"Leque",                        livro:"Heróis de Arton",  pag:230},
  {max:82,  item:"Lupa",                         livro:"Heróis de Arton",  pag:230},
  {max:83,  item:"Mapa",                         livro:"Heróis de Arton",  pag:230, obs:"Mestre define a região"},
  {max:84,  item:"Mecanismo de mola",            livro:"Heróis de Arton",  pag:230},
  {max:85,  item:"Mochila discreta",             livro:"Heróis de Arton",  pag:230},
  {max:86,  item:"Sinete",                       livro:"Heróis de Arton",  pag:231},
  {max:87,  item:"Apito de caça",               livro:"Heróis de Arton",  pag:231},
  {max:88,  item:"Baralho marcado",              livro:"Heróis de Arton",  pag:231},
  {max:89,  item:"Clarim deheoni",               livro:"Heróis de Arton",  pag:231},
  {max:90,  item:"Pandeiro das estradas",        livro:"Heróis de Arton",  pag:231},
  {max:91,  item:"Camisolão",                    livro:"Heróis de Arton",  pag:232},
  {max:92,  item:"Casaca de apetrechos",         livro:"Heróis de Arton",  pag:232},
  {max:93,  item:"Chapéu emplumado",             livro:"Heróis de Arton",  pag:232},
  {max:94,  item:"Elmo leve",                    livro:"Heróis de Arton",  pag:232},
  {max:95,  item:"Elmo pesado",                  livro:"Heróis de Arton",  pag:232},
  {max:96,  item:"Rondel",                       livro:"Heróis de Arton",  pag:233},
  {max:97,  item:"Sapatos confortáveis",         livro:"Heróis de Arton",  pag:233},
  {max:98,  item:"Sapatos de salto alto",        livro:"Heróis de Arton",  pag:233},
  {max:99,  item:"Ácido concentrado",           livro:"Heróis de Arton",  pag:234},
  {max:100, item:"Frasco abissal",               livro:"Heróis de Arton",  pag:234},
];

/* ═══════════════════════════════════════════════════════
   1d. TABELAS DE EQUIPAMENTOS (Arma / Armadura / Esotérico)
   ═══════════════════════════════════════════════════════ */

const EQUIP_ARMA = [
  {max:1,  item:"Açoite finntroll",      livro:"Ameaças de Arton", pag:392},
  {max:2,  item:"Adaga",                 livro:"Tormenta20",       pag:146},
  {max:3,  item:"Adaga oposta",          livro:"Heróis de Arton",  pag:216},
  {max:4,  item:"Agulha de Ahlen",       livro:"Heróis de Arton",  pag:216},
  {max:5,  item:"Alabarda",              livro:"Tormenta20",       pag:146},
  {max:6,  item:"Alfange",               livro:"Tormenta20",       pag:146},
  {max:7,  item:"Arcabuz",               livro:"Ameaças de Arton", pag:392},
  {max:8,  item:"Arco curto",            livro:"Tormenta20",       pag:146},
  {max:9,  item:"Arco de guerra",        livro:"Heróis de Arton",  pag:216},
  {max:10, item:"Arco longo",            livro:"Tormenta20",       pag:146},
  {max:11, item:"Arco montado",          livro:"Heróis de Arton",  pag:216},
  {max:12, item:"Arpão",                 livro:"Ameaças de Arton", pag:392},
  {max:13, item:"Azagaia",               livro:"Tormenta20",       pag:146},
  {max:14, item:"Bacamarte",             livro:"Ameaças de Arton", pag:392},
  {max:15, item:"Balas (20)",            livro:"Tormenta20",       pag:151},
  {max:16, item:"Balestra",              livro:"Heróis de Arton",  pag:216},
  {max:17, item:"Bastão lúdico",         livro:"Heróis de Arton",  pag:216},
  {max:18, item:"Besta de mão",          livro:"Heróis de Arton",  pag:216},
  {max:19, item:"Besta de repetição",    livro:"Heróis de Arton",  pag:216},
  {max:20, item:"Besta dupla",           livro:"Heróis de Arton",  pag:216},
  {max:21, item:"Besta leve",            livro:"Tormenta20",       pag:146},
  {max:22, item:"Besta pesada",          livro:"Tormenta20",       pag:146},
  {max:23, item:"Bico de corvo",         livro:"Heróis de Arton",  pag:216},
  {max:24, item:"Boleadeira",            livro:"Heróis de Arton",  pag:216},
  {max:25, item:"Bordão",                livro:"Tormenta20",       pag:147},
  {max:26, item:"Canhão portátil",       livro:"Heróis de Arton",  pag:217},
  {max:27, item:"Chakram",               livro:"Heróis de Arton",  pag:217},
  {max:28, item:"Chicote",               livro:"Tormenta20",       pag:147},
  {max:29, item:"Cimitarra",             livro:"Tormenta20",       pag:147},
  {max:30, item:"Cinquedea",             livro:"Heróis de Arton",  pag:217},
  {max:31, item:"Clava",                 livro:"Tormenta20",       pag:147},
  {max:32, item:"Clava-grão",            livro:"Heróis de Arton",  pag:217},
  {max:33, item:"Corrente de espinhos",  livro:"Tormenta20",       pag:147},
  {max:34, item:"Desmontador",           livro:"Heróis de Arton",  pag:217},
  {max:35, item:"Dirk",                  livro:"Heróis de Arton",  pag:217},
  {max:36, item:"Espada bastarda",       livro:"Tormenta20",       pag:147},
  {max:37, item:"Espada canora",         livro:"Heróis de Arton",  pag:217},
  {max:38, item:"Espada curta",          livro:"Tormenta20",       pag:148},
  {max:39, item:"Espada de execução",    livro:"Heróis de Arton",  pag:217},
  {max:40, item:"Espada larga",          livro:"Heróis de Arton",  pag:217},
  {max:41, item:"Espada longa",          livro:"Tormenta20",       pag:148},
  {max:42, item:"Espada vespa",          livro:"Ameaças de Arton", pag:392},
  {max:43, item:"Espada-gadanho",        livro:"Heróis de Arton",  pag:217},
  {max:44, item:"Espadim",               livro:"Heróis de Arton",  pag:217},
  {max:45, item:"Flechas (20)",          livro:"Tormenta20",       pag:151},
  {max:46, item:"Flechas de caça (20)",  livro:"Heróis de Arton",  pag:223},
  {max:47, item:"Florete",               livro:"Tormenta20",       pag:148},
  {max:48, item:"Foice",                 livro:"Tormenta20",       pag:148},
  {max:49, item:"Funda",                 livro:"Tormenta20",       pag:148},
  {max:50, item:"Gadanho",               livro:"Tormenta20",       pag:148},
  {max:51, item:"Garrucha",              livro:"Heróis de Arton",  pag:219},
  {max:52, item:"Gládio",               livro:"Ameaças de Arton", pag:392},
  {max:53, item:"Katana",                livro:"Tormenta20",       pag:148},
  {max:54, item:"Khopesh",               livro:"Heróis de Arton",  pag:219},
  {max:55, item:"Kimbata",               livro:"Heróis de Arton",  pag:219},
  {max:56, item:"Lança",                 livro:"Tormenta20",       pag:148},
  {max:57, item:"Lança de falange",      livro:"Heróis de Arton",  pag:220},
  {max:58, item:"Lança de fogo",         livro:"Ameaças de Arton", pag:392},
  {max:59, item:"Lança de justa",        livro:"Heróis de Arton",  pag:220},
  {max:60, item:"Lança montada",         livro:"Tormenta20",       pag:148},
  {max:61, item:"Maça",                  livro:"Tormenta20",       pag:149},
  {max:62, item:"Maça-estrela",          livro:"Heróis de Arton",  pag:220},
  {max:63, item:"Machadinha",            livro:"Tormenta20",       pag:149},
  {max:64, item:"Machado anão",          livro:"Tormenta20",       pag:149},
  {max:65, item:"Machado de batalha",    livro:"Tormenta20",       pag:149},
  {max:66, item:"Machado de guerra",     livro:"Tormenta20",       pag:149},
  {max:67, item:"Machado de haste",      livro:"Heróis de Arton",  pag:220},
  {max:68, item:"Machado táurico",       livro:"Tormenta20",       pag:149},
  {max:69, item:"Malho",                 livro:"Heróis de Arton",  pag:220},
  {max:70, item:"Mangual",               livro:"Tormenta20",       pag:149},
  {max:71, item:"Marrão",               livro:"Heróis de Arton",  pag:221},
  {max:72, item:"Marreta",               livro:"Tormenta20",       pag:149},
  {max:73, item:"Martelo de guerra",     livro:"Tormenta20",       pag:149},
  {max:74, item:"Martelo leve",          livro:"Heróis de Arton",  pag:221},
  {max:75, item:"Martelo longo",         livro:"Heróis de Arton",  pag:221},
  {max:76, item:"Montante",              livro:"Tormenta20",       pag:150},
  {max:77, item:"Montante cinético",     livro:"Heróis de Arton",  pag:221},
  {max:78, item:"Mordida do diabo",      livro:"Ameaças de Arton", pag:393},
  {max:79, item:"Mosquete",              livro:"Tormenta20",       pag:150},
  {max:80, item:"Neko-te",               livro:"Ameaças de Arton", pag:393},
  {max:81, item:"Pedras (20)",           livro:"Tormenta20",       pag:151},
  {max:82, item:"Picareta",              livro:"Tormenta20",       pag:150},
  {max:83, item:"Pique",                 livro:"Tormenta20",       pag:150},
  {max:84, item:"Pistola",               livro:"Tormenta20",       pag:150},
  {max:85, item:"Pistola-punhal",        livro:"Ameaças de Arton", pag:393},
  {max:86, item:"Porrete",               livro:"Ameaças de Arton", pag:393},
  {max:87, item:"Presa de serpente",     livro:"Ameaças de Arton", pag:393},
  {max:88, item:"Rapieira",              livro:"Heróis de Arton",  pag:221},
  {max:89, item:"Rede",                  livro:"Tormenta20",       pag:150},
  {max:90, item:"Serrilheira",           livro:"Heróis de Arton",  pag:221},
  {max:91, item:"Shuriken",              livro:"Ameaças de Arton", pag:394},
  {max:92, item:"Sifão cáustico",        livro:"Heróis de Arton",  pag:222},
  {max:93, item:"Tacape",                livro:"Tormenta20",       pag:150},
  {max:94, item:"Tai-tai",               livro:"Heróis de Arton",  pag:222},
  {max:95, item:"Tan-korak",             livro:"Heróis de Arton",  pag:222},
  {max:96, item:"Tetsubo",               livro:"Ameaças de Arton", pag:394},
  {max:97, item:"Traque",                livro:"Ameaças de Arton", pag:394},
  {max:98, item:"Tridente",              livro:"Tormenta20",       pag:150},
  {max:99, item:"Virotes (20)",          livro:"Tormenta20",       pag:151},
  {max:100,item:"Zarabatana",            livro:"Ameaças de Arton", pag:394},
];

const EQUIP_ARMADURA = [
  {max:2,  item:"Armadura de chumbo",              livro:"Heróis de Arton",  pag:223},
  {max:4,  item:"Armadura de engenhoqueiro goblin", livro:"Heróis de Arton",  pag:223},
  {max:6,  item:"Armadura de folhas",              livro:"Heróis de Arton",  pag:223},
  {max:8,  item:"Armadura de hussardo alado",      livro:"Heróis de Arton",  pag:223},
  {max:10, item:"Armadura de justa",               livro:"Heróis de Arton",  pag:223},
  {max:11, item:"Armadura de ossos",               livro:"Ameaças de Arton", pag:395},
  {max:13, item:"Armadura de pedra",               livro:"Heróis de Arton",  pag:224},
  {max:14, item:"Armadura de quitina",             livro:"Ameaças de Arton", pag:395},
  {max:16, item:"Armadura sensual",                livro:"Heróis de Arton",  pag:224},
  {max:20, item:"Brigantina",                      livro:"Heróis de Arton",  pag:224},
  {max:22, item:"Broquel",                         livro:"Heróis de Arton",  pag:224},
  {max:26, item:"Brunea",                          livro:"Tormenta20",       pag:154},
  {max:28, item:"Colete fora da lei",              livro:"Heróis de Arton",  pag:226},
  {max:38, item:"Completa",                        livro:"Tormenta20",       pag:154},
  {max:42, item:"Cota de malha",                   livro:"Tormenta20",       pag:154},
  {max:44, item:"Cota de moedas",                  livro:"Heróis de Arton",  pag:226},
  {max:54, item:"Couraça",                         livro:"Tormenta20",       pag:154},
  {max:58, item:"Couro",                           livro:"Tormenta20",       pag:154},
  {max:64, item:"Couro batido",                    livro:"Tormenta20",       pag:154},
  {max:65, item:"Escudo de couro",                 livro:"Ameaças de Arton", pag:395},
  {max:66, item:"Escudo de vime",                  livro:"Heróis de Arton",  pag:226},
  {max:74, item:"Escudo leve",                     livro:"Tormenta20",       pag:154},
  {max:82, item:"Escudo pesado",                   livro:"Tormenta20",       pag:154},
  {max:84, item:"Escudo torre",                    livro:"Heróis de Arton",  pag:226},
  {max:88, item:"Gibão de peles",                  livro:"Tormenta20",       pag:154},
  {max:92, item:"Loriga segmentada",               livro:"Tormenta20",       pag:154},
  {max:98, item:"Meia armadura",                   livro:"Tormenta20",       pag:154},
  {max:99, item:"Sagna",                           livro:"Heróis de Arton",  pag:226},
  {max:100,item:"Veste de teia de aranha",         livro:"Ameaças de Arton", pag:395},
];

const EQUIP_ESOTER = [
  {max:3,  item:"Afiador solar",          livro:"Deuses de Arton",  pag:51},
  {max:6,  item:"Ankh solar",             livro:"Ameaças de Arton", pag:396},
  {max:10, item:"Báculo da retribuição",  livro:"Deuses de Arton",  pag:51},
  {max:14, item:"Bolsa de pó",            livro:"Tormenta20",       pag:159},
  {max:18, item:"Cajado arcano",          livro:"Tormenta20",       pag:160},
  {max:22, item:"Cetro elemental",        livro:"Tormenta20",       pag:160},
  {max:26, item:"Compasso místico",       livro:"Heróis de Arton",  pag:234},
  {max:30, item:"Contas de oração",       livro:"Deuses de Arton",  pag:51},
  {max:34, item:"Costela de lich",        livro:"Tormenta20",       pag:160},
  {max:38, item:"Dedo de ente",           livro:"Tormenta20",       pag:160},
  {max:42, item:"Estola",                 livro:"Deuses de Arton",  pag:51},
  {max:46, item:"Flauta convocadora",     livro:"Heróis de Arton",  pag:234},
  {max:50, item:"Frasco purificador",     livro:"Deuses de Arton",  pag:51},
  {max:54, item:"Luva de ferro",          livro:"Tormenta20",       pag:160},
  {max:58, item:"Mandala onírica",        livro:"Heróis de Arton",  pag:234},
  {max:62, item:"Medalhão afiado",        livro:"Deuses de Arton",  pag:51},
  {max:66, item:"Medalhão de prata",      livro:"Tormenta20",       pag:160},
  {max:70, item:"Orbe cristalino",        livro:"Tormenta20",       pag:160},
  {max:74, item:"Ostensório santificado", livro:"Deuses de Arton",  pag:51},
  {max:78, item:"Rede de almas",          livro:"Deuses de Arton",  pag:52},
  {max:81, item:"Tomo de guerra",         livro:"Ameaças de Arton", pag:396},
  {max:84, item:"Tomo do rancor",         livro:"Ameaças de Arton", pag:396},
  {max:88, item:"Tomo hermético",         livro:"Tormenta20",       pag:160},
  {max:92, item:"Turíbulo ungido",        livro:"Deuses de Arton",  pag:52},
  {max:96, item:"Varinha arcana",         livro:"Tormenta20",       pag:160},
  {max:100,item:"Varinha armamentista",   livro:"Heróis de Arton",  pag:234},
];

/* ═══════════════════════════════════════════════════════
   1e. TABELAS DE MELHORIAS (Superior)
   ═══════════════════════════════════════════════════════ */

// * = Melhoria com asterisco (ver livro para regra especial)
// ** = Material especial — Mestre decide o material
// TODO (melhoria futura): as entradas com pag:"??" (Fósforo, Penetrante e
//   Brasonado em arma; Prudente, Usado, Brasonado e Devotado em armadura;
//   Usado e Brasonado em esotérico) ainda não têm a numeração de página
//   confirmada no livro indicado. Quando a página for localizada, trocar o
//   "??" pelo número correto (some também aparece no campo livro de Fósforo/
//   Penetrante como "Suplemento do Mestre", a revisar).
const MELHORIA_ARMA = [
  {max:9,  item:"Atroz",               livro:"Tormenta20",            pag:164, obs:"* Ver regra especial"},
  {max:11, item:"Banhada a ouro",      livro:"Tormenta20",            pag:164},
  {max:18, item:"Certeira",            livro:"Tormenta20",            pag:164},
  {max:19, item:"Conduíte",            livro:"Deuses de Arton",       pag:54},
  {max:21, item:"Cravejada de gemas",  livro:"Tormenta20",            pag:164},
  {max:28, item:"Cruel",               livro:"Tormenta20",            pag:164},
  {max:30, item:"Discreta",            livro:"Tormenta20",            pag:164},
  {max:35, item:"Equilibrada",         livro:"Tormenta20",            pag:165},
  {max:39, item:"Farpada",             livro:"Heróis de Arton",       pag:239},
  {max:42, item:"Fósforo",             livro:"Suplemento do Mestre",  pag:"??", obs:"* Apenas Munição"},
  {max:44, item:"Guarda",              livro:"Heróis de Arton",       pag:239},
  {max:48, item:"Harmonizada",         livro:"Tormenta20",            pag:165},
  {max:50, item:"Incendiária",         livro:"Heróis de Arton",       pag:239, obs:"* Apenas Munição"},
  {max:54, item:"Injeção alquímica",   livro:"Tormenta20",            pag:165},
  {max:56, item:"Macabra",             livro:"Tormenta20",            pag:165},
  {max:65, item:"Maciça",              livro:"Tormenta20",            pag:165},
  {max:74, item:"Material especial",   livro:"Tormenta20",            pag:165, obs:"** Mestre define o material"},
  {max:77, item:"Mira telescópica",    livro:"Tormenta20",            pag:166},
  {max:81, item:"Penetrante",          livro:"Suplemento do Mestre",  pag:"??"},
  {max:88, item:"Precisa",             livro:"Tormenta20",            pag:166},
  {max:90, item:"Pressurizada",        livro:"Heróis de Arton",       pag:240},
  {max:93, item:"Usado",               livro:"Heróis de Arton",       pag:"??"},
  {max:96, item:"Brasonado",           livro:"Heróis de Arton",       pag:"??"},
  {max:100,item:"Pungente",            livro:"Tormenta20",            pag:166, obs:"* Ver regra especial"},
];

const MELHORIA_ARMADURA = [
  {max:10, item:"Ajustada",            livro:"Tormenta20",       pag:164},
  {max:14, item:"Balístico",           livro:"Heróis de Arton",  pag:239},
  {max:18, item:"Banhada a ouro",      livro:"Tormenta20",       pag:164},
  {max:22, item:"Cravejada de gemas",  livro:"Tormenta20",       pag:164},
  {max:27, item:"Delicada",            livro:"Tormenta20",       pag:164},
  {max:29, item:"Deslumbrante",        livro:"Heróis de Arton",  pag:239, obs:"* Ver regra especial"},
  {max:31, item:"Diligente",           livro:"Deuses de Arton",  pag:54},
  {max:35, item:"Discreta",            livro:"Tormenta20",       pag:164},
  {max:39, item:"Espinhos",            livro:"Tormenta20",       pag:165},
  {max:43, item:"Injetora",            livro:"Heróis de Arton",  pag:240},
  {max:47, item:"Inscrito",            livro:"Deuses de Arton",  pag:54},
  {max:49, item:"Macabra",             livro:"Tormenta20",       pag:165},
  {max:59, item:"Material especial",   livro:"Tormenta20",       pag:165, obs:"** Mestre define o material"},
  {max:64, item:"Polida",              livro:"Tormenta20",       pag:166},
  {max:76, item:"Reforçada",           livro:"Tormenta20",       pag:166},
  {max:78, item:"Prudente",            livro:"Heróis de Arton",  pag:"??"},
  {max:80, item:"Usado",               livro:"Heróis de Arton",  pag:"??"},
  {max:82, item:"Brasonado",           livro:"Heróis de Arton",  pag:"??"},
  {max:84, item:"Devotado",            livro:"Deuses de Arton",  pag:"??"},
  {max:95, item:"Selada",              livro:"Tormenta20",       pag:166},
  {max:100,item:"Sob medida",          livro:"Tormenta20",       pag:166, obs:"* Ver regra especial"},
];

const MELHORIA_ESOTER = [
  {max:3,  item:"Banhado a ouro",       livro:"Tormenta20",       pag:164},
  {max:18, item:"Canalizador",          livro:"Tormenta20",       pag:164},
  {max:21, item:"Canônico",             livro:"Deuses de Arton",  pag:54},
  {max:24, item:"Cravejado de gemas",   livro:"Tormenta20",       pag:164},
  {max:28, item:"Discreto",             livro:"Tormenta20",       pag:164},
  {max:43, item:"Energético",           livro:"Tormenta20",       pag:165},
  {max:58, item:"Harmonizado",          livro:"Tormenta20",       pag:165},
  {max:61, item:"Macabro",              livro:"Tormenta20",       pag:165},
  {max:70, item:"Material especial",    livro:"Tormenta20",       pag:165, obs:"** Mestre define o material"},
  {max:80, item:"Poderoso",             livro:"Tormenta20",       pag:166},
  {max:90, item:"Potencializador",      livro:"Heróis de Arton",  pag:240, obs:"* Ver regra especial"},
  {max:93, item:"Usado",                livro:"Heróis de Arton",  pag:"??"},
  {max:96, item:"Brasonado",            livro:"Heróis de Arton",  pag:"??"},
  {max:100,item:"Vigilante",            livro:"Tormenta20",       pag:166},
];

function lookupEquip(tipo, dp) {
  const tab = tipo === "Arma" ? EQUIP_ARMA : tipo === "Armadura" ? EQUIP_ARMADURA : EQUIP_ESOTER;
  for (const row of tab) if (dp <= row.max) return row;
  return tab[tab.length - 1];
}

function lookupMelhoria(tipo, dp) {
  const tab = tipo === "Arma" ? MELHORIA_ARMA : tipo === "Armadura" ? MELHORIA_ARMADURA : MELHORIA_ESOTER;
  for (const row of tab) if (dp <= row.max) return row;
  return tab[tab.length - 1];
}

/* ── Restrições de melhorias (pré-requisitos e incompatibilidades) ──
   Uma melhoria com pré-requisito só entra se o pré-requisito já estiver
   no item (rolado num slot anterior). Assim, num item com 1 só melhoria
   as que exigem pré-requisito nunca aparecem; com 2+ melhorias, só saem
   se o pré-requisito tiver vindo antes. Ex.: Pungente exige Certeira.
   '*' = exige QUALQUER outra melhoria já presente. ───────────────── */
const MELHORIA_PREREQ = {
  'Atroz':           ['Cruel'],
  'Pungente':        ['Certeira'],
  'Farpada':         ['Cruel'],
  'Penetrante':      ['Cruel'],
  'Harmonizada':     ['*'],
  'Sob medida':      ['Ajustada'],
  'Balístico':       ['Reforçada'],
  'Deslumbrante':    ['Banhada a ouro', 'Cravejada de gemas'],
  'Potencializador': ['Canalizador'],
  'Devotado':        ['Inscrito'],
};
// Pares que não podem coexistir no mesmo item.
const MELHORIA_EXCLUI = [
  ['Precisa',   'Maciça'],
  ['Delicada',  'Reforçada'],
  ['Brasonado', 'Discreta'],   // arma/armadura
  ['Brasonado', 'Discreto'],   // esotérico
];
function melhoriaPrereqFalta(nome, usados) {
  const req = MELHORIA_PREREQ[nome];
  if (!req) return false;
  if (req.includes('*')) return usados.size < 1;          // exige outra qualquer
  return !req.some(r => usados.has(r));                   // exige um pré-req específico
}
function melhoriaExclui(nome, usados) {
  for (const [a, b] of MELHORIA_EXCLUI) {
    if (nome === a && usados.has(b)) return true;
    if (nome === b && usados.has(a)) return true;
  }
  return false;
}

/* ═══════════════════════════════════════════════════════
   1f. TABELAS DE ENCANTOS MÁGICOS
   ═══════════════════════════════════════════════════════
   doisEncantos: true → encanto conta como 2 slots
     (relança automaticamente se o item tiver só 1 encanto)
   obs → nota especial exibida no resultado
   ═══════════════════════════════════════════════════════ */

const MAGICO_ARMA = [
  {max:1,   item:"Alvorada",     livro:"Heróis de Arton", pag:256},
  {max:5,   item:"Ameaçadora",   livro:"Tormenta20",      pag:335},
  {max:6,   item:"Anátema",      livro:"Heróis de Arton", pag:256},
  {max:8,   item:"Anticriatura", livro:"Tormenta20",      pag:335},
  {max:9,   item:"Arremesso",    livro:"Tormenta20",      pag:335},
  {max:10,  item:"Assassina",    livro:"Tormenta20",      pag:335},
  {max:11,  item:"Brumosa",      livro:"Heróis de Arton", pag:256},
  {max:12,  item:"Caçadora",     livro:"Tormenta20",      pag:335},
  {max:13,  item:"Cantante",     livro:"Heróis de Arton", pag:256},
  {max:14,  item:"Ciclônica",    livro:"Heróis de Arton", pag:256},
  {max:18,  item:"Congelante",   livro:"Tormenta20",      pag:335},
  {max:19,  item:"Conjuradora",  livro:"Tormenta20",      pag:335},
  {max:23,  item:"Corrosiva",    livro:"Tormenta20",      pag:335},
  {max:25,  item:"Crescente",    livro:"Heróis de Arton", pag:256},
  {max:26,  item:"Cristalina",   livro:"Heróis de Arton", pag:256},
  {max:27,  item:"Cronal",       livro:"Heróis de Arton", pag:256, doisEncantos:true},
  {max:28,  item:"Cuidadora",    livro:"Heróis de Arton", pag:256},
  {max:30,  item:"Dançarina",    livro:"Tormenta20",      pag:335},
  {max:32,  item:"Defensora",    livro:"Tormenta20",      pag:335},
  {max:33,  item:"Destruidora",  livro:"Tormenta20",      pag:335},
  {max:35,  item:"Dilacerante",  livro:"Tormenta20",      pag:335},
  {max:36,  item:"Drenante",     livro:"Tormenta20",      pag:335},
  {max:40,  item:"Elétrica",     livro:"Tormenta20",      pag:335},
  {max:41,  item:"Energética",   livro:"Tormenta20",      pag:335, doisEncantos:true},
  {max:43,  item:"Espreitadora", livro:"Heróis de Arton", pag:256},
  {max:45,  item:"Excruciante",  livro:"Tormenta20",      pag:335},
  {max:49,  item:"Flamejante",   livro:"Tormenta20",      pag:335},
  {max:57,  item:"Formidável",   livro:"Tormenta20",      pag:336},
  {max:59,  item:"Frenética",    livro:"Heróis de Arton", pag:256},
  {max:60,  item:"Gárgula",      livro:"Heróis de Arton", pag:256},
  {max:61,  item:"Horrenda",     livro:"Heróis de Arton", pag:256},
  {max:62,  item:"Indignada",    livro:"Heróis de Arton", pag:256},
  {max:63,  item:"Infestada",    livro:"Heróis de Arton", pag:256},
  {max:64,  item:"Lancinante",   livro:"Tormenta20",      pag:336, doisEncantos:true},
  {max:72,  item:"Magnífica",    livro:"Tormenta20",      pag:336, doisEncantos:true},
  {max:73,  item:"Manáfaga",     livro:"Heróis de Arton", pag:256},
  {max:75,  item:"Piedosa",      livro:"Tormenta20",      pag:336},
  {max:76,  item:"Profana",      livro:"Tormenta20",      pag:336},
  {max:77,  item:"Rebote",       livro:"Heróis de Arton", pag:256},
  {max:78,  item:"Reflexiva",    livro:"Heróis de Arton", pag:257},
  {max:79,  item:"Ressonante",   livro:"Heróis de Arton", pag:257},
  {max:80,  item:"Sagrada",      livro:"Tormenta20",      pag:336},
  {max:82,  item:"Sanguinária",  livro:"Tormenta20",      pag:336},
  {max:83,  item:"Sepulcral",    livro:"Heróis de Arton", pag:257},
  {max:84,  item:"Sombria",      livro:"Heróis de Arton", pag:257},
  {max:85,  item:"Trovejante",   livro:"Tormenta20",      pag:336},
  {max:86,  item:"Tumular",      livro:"Tormenta20",      pag:336},
  {max:87,  item:"Vampírica",    livro:"Heróis de Arton", pag:257},
  {max:89,  item:"Veloz",        livro:"Tormenta20",      pag:336},
  {max:90,  item:"Venenosa",     livro:"Tormenta20",      pag:336},
  // 91-100 = "Arma específica" (item mágico nomeado) — não cadastrado; relança
];

const MAGICO_ARMADURA = [
  {max:2,   item:"Abascanto",      livro:"Tormenta20",      pag:338},
  {max:4,   item:"Abençoado",      livro:"Tormenta20",      pag:338},
  {max:5,   item:"Abissal",        livro:"Heróis de Arton", pag:258},
  {max:6,   item:"Acrobático",     livro:"Tormenta20",      pag:338},
  {max:8,   item:"Alado",          livro:"Tormenta20",      pag:338},
  {max:9,   item:"Ancorada",       livro:"Heróis de Arton", pag:258, obs:"* Apenas armaduras — relance para escudos"},
  {max:11,  item:"Animado",        livro:"Tormenta20",      pag:338, obs:"** Apenas escudos — relance para armaduras"},
  {max:12,  item:"Anulador",       livro:"Heróis de Arton", pag:258, doisEncantos:true},
  {max:13,  item:"Arbóreo",        livro:"Heróis de Arton", pag:258},
  {max:15,  item:"Assustador",     livro:"Tormenta20",      pag:338},
  {max:16,  item:"Astuto",         livro:"Heróis de Arton", pag:258},
  {max:17,  item:"Cáustica",       livro:"Tormenta20",      pag:338},
  {max:27,  item:"Defensor",       livro:"Tormenta20",      pag:338},
  {max:28,  item:"Densa",          livro:"Heróis de Arton", pag:258, obs:"* Apenas armaduras — relance para escudos"},
  {max:29,  item:"Égide",          livro:"Heróis de Arton", pag:258},
  {max:30,  item:"Enraizada",      livro:"Heróis de Arton", pag:258, obs:"* Apenas armaduras — relance para escudos"},
  {max:31,  item:"Escorregadio",   livro:"Tormenta20",      pag:338},
  {max:33,  item:"Esmagador",      livro:"Tormenta20",      pag:339, obs:"** Apenas escudos — relance para armaduras"},
  {max:34,  item:"Esmérico",       livro:"Heróis de Arton", pag:258},
  {max:36,  item:"Estígio",        livro:"Heróis de Arton", pag:258, doisEncantos:true},
  {max:37,  item:"Etéreo",         livro:"Heróis de Arton", pag:259},
  {max:39,  item:"Fantasmagórico", livro:"Tormenta20",      pag:339},
  {max:43,  item:"Fortificado",    livro:"Tormenta20",      pag:339},
  {max:44,  item:"Gélido",         livro:"Tormenta20",      pag:339},
  {max:45,  item:"Geomântico",     livro:"Heróis de Arton", pag:259},
  {max:55,  item:"Guardião",       livro:"Tormenta20",      pag:339, doisEncantos:true},
  {max:57,  item:"Hipnótico",      livro:"Tormenta20",      pag:339},
  {max:58,  item:"Ilusório",       livro:"Tormenta20",      pag:339},
  {max:59,  item:"Incandescente",  livro:"Tormenta20",      pag:339},
  {max:64,  item:"Invulnerável",   livro:"Tormenta20",      pag:339},
  {max:65,  item:"Ligeira",        livro:"Heróis de Arton", pag:259, obs:"* Apenas armaduras — relance para escudos"},
  {max:67,  item:"Luminescente",   livro:"Heróis de Arton", pag:259},
  {max:72,  item:"Opaco",          livro:"Tormenta20",      pag:339},
  {max:73,  item:"Prístino",       livro:"Heróis de Arton", pag:259},
  {max:78,  item:"Protetor",       livro:"Tormenta20",      pag:339},
  {max:79,  item:"Purificador",    livro:"Heróis de Arton", pag:259},
  {max:81,  item:"Reanimador",     livro:"Heróis de Arton", pag:259},
  {max:83,  item:"Refletor",       livro:"Tormenta20",      pag:339},
  {max:84,  item:"Relampejante",   livro:"Tormenta20",      pag:339},
  {max:85,  item:"Reluzente",      livro:"Tormenta20",      pag:339},
  {max:86,  item:"Replicante",     livro:"Heróis de Arton", pag:259},
  {max:87,  item:"Resiliente",     livro:"Heróis de Arton", pag:259},
  {max:88,  item:"Sombrio",        livro:"Tormenta20",      pag:339},
  {max:89,  item:"Vórtice",        livro:"Heróis de Arton", pag:259},
  {max:90,  item:"Zeloso",         livro:"Tormenta20",      pag:339},
  // 91-100 = "Armadura/Escudo específico" (item nomeado) — não cadastrado; relança
];

const MAGICO_ESOTER = [
  {max:2,   item:"Abafador",     livro:"Heróis de Arton", pag:260},
  {max:12,  item:"Bélico",       livro:"Heróis de Arton", pag:260},
  {max:16,  item:"Caridoso",     livro:"Heróis de Arton", pag:260},
  {max:20,  item:"Chocante",     livro:"Heróis de Arton", pag:260},
  {max:30,  item:"Clemente",     livro:"Heróis de Arton", pag:260},
  {max:32,  item:"Contido",      livro:"Heróis de Arton", pag:260},
  {max:34,  item:"Embusteiro",   livro:"Heróis de Arton", pag:260},
  {max:36,  item:"Emergencial",  livro:"Heróis de Arton", pag:260},
  {max:40,  item:"Encadeado",    livro:"Heróis de Arton", pag:260},
  {max:42,  item:"Escultor",     livro:"Heróis de Arton", pag:260},
  {max:44,  item:"Frugal",       livro:"Heróis de Arton", pag:261},
  {max:48,  item:"Glacial",      livro:"Heróis de Arton", pag:261},
  {max:50,  item:"Imperioso",    livro:"Heróis de Arton", pag:261},
  {max:52,  item:"Implacável",   livro:"Heróis de Arton", pag:261, doisEncantos:true},
  {max:54,  item:"Incriminador", livro:"Heróis de Arton", pag:261},
  {max:61,  item:"Inflamável",   livro:"Heróis de Arton", pag:261},
  {max:65,  item:"Inquisidor",   livro:"Heróis de Arton", pag:261},
  {max:69,  item:"Insistente",   livro:"Heróis de Arton", pag:261},
  {max:71,  item:"Khalmyrita",   livro:"Heróis de Arton", pag:261},
  {max:81,  item:"Majestoso",    livro:"Heróis de Arton", pag:261, doisEncantos:true},
  {max:83,  item:"Nímbico",      livro:"Heróis de Arton", pag:261},
  {max:84,  item:"Pulverizante", livro:"Heróis de Arton", pag:261, doisEncantos:true},
  {max:85,  item:"Retaliador",   livro:"Heróis de Arton", pag:261},
  {max:87,  item:"Sanguessuga",  livro:"Heróis de Arton", pag:261},
  {max:88,  item:"Traiçoeiro",   livro:"Heróis de Arton", pag:261},
  {max:90,  item:"Verdugo",      livro:"Heróis de Arton", pag:261},
  // 91-100 = "Esotérico específico" (item nomeado) — não cadastrado; relança
];

function lookupMagico(tipo, dp) {
  const tab = tipo === "Arma"     ? MAGICO_ARMA
            : tipo === "Armadura" ? MAGICO_ARMADURA
            : MAGICO_ESOTER;
  for (const row of tab) if (dp <= row.max) return row;
  // d% 91-100 nesta tabela = "item mágico específico" (item nomeado pronto).
  // Aqui só vivem os ENCANTOS (faixas 01-90); devolvemos null para o chamador
  // tratar a faixa 91-100. No modo Padrão isso vira um item específico
  // (ESPEC_*/sorteiaMagicoPadrao); na Penitência de Azgher o sorteio relança.
  return null;
}

/* ═══════════════════════════════════════════════════════
   1f-bis. ITENS MÁGICOS ESPECÍFICOS (itens nomeados prontos)
   ═══════════════════════════════════════════════════════
   Tabelas 8-9/8-10/8-11 do T20 (+ Heróis e Deuses de Arton): quando uma
   rolagem de encanto cai em 91-100, o prêmio NÃO é um encanto e sim um item
   mágico específico já pronto (arma/armadura/escudo/esotérico nomeado), com
   seus próprios poderes — não recebe encantos avulsos. ESPEC_ARMADURA inclui
   armaduras E escudos. Usados SÓ no modo Padrão (T20); na Penitência de Azgher,
   por regra da casa, itens específicos nunca aparecem (o encanto relança).
   ═══════════════════════════════════════════════════════ */

const ESPEC_ARMA = [
  {max:  2, item:"Adaga da bruma"         , livro:"Heróis de Arton", pag:257},
  {max:  3, item:"Adaga ofídica"          , livro:"Deuses de Arton", pag:58},
  {max:  4, item:"Adaga sorrateira"       , livro:"Deuses de Arton", pag:56},
  {max:  5, item:"Alabarda da coragem"    , livro:"Deuses de Arton", pag:57},
  {max:  6, item:"Alfange dourado"        , livro:"Deuses de Arton", pag:56},
  {max:  7, item:"Alguma coisa de Nimb...", livro:"Deuses de Arton", pag:58},
  {max: 10, item:"Arco das sombras"       , livro:"Heróis de Arton", pag:257},
  {max: 12, item:"Arco do crepúsculo"     , livro:"Heróis de Arton", pag:257},
  {max: 15, item:"Arco do poder"          , livro:"Tormenta20", pag:336},
  {max: 18, item:"Avalanche"              , livro:"Tormenta20", pag:337},
  {max: 21, item:"Azagaia dos relâmpagos" , livro:"Tormenta20", pag:337},
  {max: 23, item:"Azagaia fantasma"       , livro:"Heróis de Arton", pag:257},
  {max: 26, item:"Besta estelar"          , livro:"Heróis de Arton", pag:257},
  {max: 29, item:"Besta explosiva"        , livro:"Tormenta20", pag:337},
  {max: 30, item:"Bordão sabichão"        , livro:"Deuses de Arton", pag:58},
  {max: 31, item:"Cajado das matas"       , livro:"Deuses de Arton", pag:55},
  {max: 32, item:"Cimitarra solar"        , livro:"Deuses de Arton", pag:56},
  {max: 34, item:"Clava de lava"          , livro:"Heróis de Arton", pag:257},
  {max: 37, item:"Espada baronial"        , livro:"Tormenta20", pag:337},
  {max: 39, item:"Espada da tempestade"   , livro:"Heróis de Arton", pag:257},
  {max: 42, item:"Espada do guardião"     , livro:"Heróis de Arton", pag:257},
  {max: 43, item:"Espada imaculada"       , livro:"Deuses de Arton", pag:59},
  {max: 44, item:"Espada monástica"       , livro:"Deuses de Arton", pag:57},
  {max: 46, item:"Espada solar"           , livro:"Heróis de Arton", pag:257},
  {max: 49, item:"Espada sortuda"         , livro:"Tormenta20", pag:337},
  {max: 51, item:"Florete do vendaval"    , livro:"Heróis de Arton", pag:258},
  {max: 54, item:"Florete fugaz"          , livro:"Tormenta20", pag:337},
  {max: 55, item:"Katana da determinação" , livro:"Deuses de Arton", pag:57},
  {max: 58, item:"Lâmina da luz"          , livro:"Tormenta20", pag:338},
  {max: 61, item:"Lança animalesca"       , livro:"Tormenta20", pag:338},
  {max: 62, item:"Lança da dominação"     , livro:"Deuses de Arton", pag:56},
  {max: 64, item:"Lança da fênix"         , livro:"Heróis de Arton", pag:258},
  {max: 67, item:"Língua do deserto"      , livro:"Tormenta20", pag:338},
  {max: 70, item:"Maça do terror"         , livro:"Tormenta20", pag:338},
  {max: 71, item:"Maça monstruosa"        , livro:"Deuses de Arton", pag:58},
  {max: 72, item:"Machado da bravura"     , livro:"Deuses de Arton", pag:55},
  {max: 74, item:"Machado da natureza"    , livro:"Heróis de Arton", pag:258},
  {max: 76, item:"Machado do abismo"      , livro:"Heróis de Arton", pag:258},
  {max: 79, item:"Machado do vulcão"      , livro:"Heróis de Arton", pag:258},
  {max: 80, item:"Machado lamnoriano"     , livro:"Deuses de Arton", pag:59},
  {max: 83, item:"Machado silvestre"      , livro:"Tormenta20", pag:338},
  {max: 84, item:"Mangual aventureiro"    , livro:"Deuses de Arton", pag:59},
  {max: 86, item:"Martelo da terra"       , livro:"Heróis de Arton", pag:258},
  {max: 89, item:"Martelo de Doherimm"    , livro:"Tormenta20", pag:338},
  {max: 91, item:"Martelo do titã"        , livro:"Heróis de Arton", pag:258},
  {max: 93, item:"Punhal das profundezas" , livro:"Heróis de Arton", pag:258},
  {max: 96, item:"Punhal sszzaazita"      , livro:"Tormenta20", pag:338},
  {max: 97, item:"Tridente aquoso"        , livro:"Deuses de Arton", pag:58},
  {max:100, item:"Vingadora sagrada"      , livro:"Tormenta20", pag:338},
];

const ESPEC_ARMADURA = [
  {max:  4, item:"Armadura da luz"               , livro:"Tormenta20", pag:340},
  {max:  8, item:"Armadura das sombras profundas", livro:"Heróis de Arton", pag:259},
  {max: 12, item:"Armadura do dragão ancião"     , livro:"Heróis de Arton", pag:259},
  {max: 16, item:"Armadura do inverno perene"    , livro:"Heróis de Arton", pag:259},
  {max: 18, item:"Armadura do julgamento"        , livro:"Deuses de Arton", pag:57},
  {max: 22, item:"Baluarte anão"                 , livro:"Tormenta20", pag:340},
  {max: 26, item:"Carapaça demoníaca"            , livro:"Tormenta20", pag:340},
  {max: 30, item:"Cota da serpente marinha"      , livro:"Heróis de Arton", pag:259},
  {max: 40, item:"Cota élfica"                   , livro:"Tormenta20", pag:340},
  {max: 44, item:"Couraça do comando"            , livro:"Tormenta20", pag:340},
  {max: 48, item:"Couraça do guardião celeste"   , livro:"Heróis de Arton", pag:259},
  {max: 52, item:"Couro de monstro"              , livro:"Tormenta20", pag:340},
  {max: 56, item:"Escudo da ira vulcânica"       , livro:"Heróis de Arton", pag:260},
  {max: 60, item:"Escudo da luz estelar"         , livro:"Heróis de Arton", pag:260},
  {max: 64, item:"Escudo da natureza viva"       , livro:"Heróis de Arton", pag:260},
  {max: 68, item:"Escudo de Azgher"              , livro:"Tormenta20", pag:340},
  {max: 72, item:"Escudo do conjurador"          , livro:"Tormenta20", pag:340},
  {max: 76, item:"Escudo do eclipse"             , livro:"Tormenta20", pag:340},
  {max: 80, item:"Escudo do grifo"               , livro:"Heróis de Arton", pag:260},
  {max: 86, item:"Escudo do leão"                , livro:"Tormenta20", pag:340},
  {max: 90, item:"Escudo do trovão"              , livro:"Heróis de Arton", pag:260},
  {max: 94, item:"Escudo espinhoso"              , livro:"Tormenta20", pag:340},
  {max: 98, item:"Loriga do centurião"           , livro:"Tormenta20", pag:340},
  {max:100, item:"Manto da noite"                , livro:"Tormenta20", pag:340},
];

const ESPEC_ESOTER = [
  {max: 20, item:"Cajado da destruição"   , livro:"Tormenta20", pag:337},
  {max: 40, item:"Cajado da vida"         , livro:"Tormenta20", pag:337},
  {max: 45, item:"Cajado das marés"       , livro:"Heróis de Arton", pag:262},
  {max: 60, item:"Cajado do poder"        , livro:"Tormenta20", pag:337},
  {max: 75, item:"Cálice sagrado"         , livro:"Heróis de Arton", pag:262},
  {max: 85, item:"Relógio do arcanista"   , livro:"Heróis de Arton", pag:262},
  {max: 95, item:"Varinha da generosidade", livro:"Deuses de Arton", pag:59},
  {max:100, item:"Varinha milenar"        , livro:"Heróis de Arton", pag:262},
];

function lookupEspecifico(tipo, dp) {
  const tab = tipo === "Arma"     ? ESPEC_ARMA
            : tipo === "Armadura" ? ESPEC_ARMADURA
            : ESPEC_ESOTER;
  for (const row of tab) if (dp <= row.max) return row;
  return tab[tab.length - 1];
}

// Rola os encantos do item; a 1ª rolagem em 91-100 transforma o resultado num
// item mágico específico (encerra: o item nomeado já é o prêmio, sem encantos
// avulsos). Retorna { especifico:{dp,dpE,item} } OU { encantos:[…] }.
//   permiteEspec = false (modo Customizável, tipo com específicos desligados):
//   a faixa 91-100 é tratada como "sem específico" e simplesmente relança,
//   devolvendo só encantos (item base + encantos), como manda a tabela 01-90.
function sorteiaMagicoPadrao(tipo, rolls, permiteEspec = true) {
  const encantos = [];
  const usados   = new Set();
  for (let i = 0; i < rolls; i++) {
    let dp, item, tentativas = 0;
    do {
      dp = rolarPercent();
      if (permiteEspec && dp >= 91) {                   // 91-100 = item específico
        const dpE = rolarPercent();
        return { especifico: { dp, dpE, item: lookupEspecifico(tipo, dpE) } };
      }
      // dp 01-90 → encanto; dp 91-100 com específico desligado → null (relança)
      item = lookupMagico(tipo, dp);
      tentativas++;
    } while (
      tentativas < 40 &&
      (!item || usados.has(item.item) || (item.doisEncantos && rolls === 1))
    );
    // Salvaguarda: nunca registra encanto vazio (caso raro de estourar tentativas)
    while (!item) { dp = rolarPercent(); item = lookupMagico(tipo, dp); }
    usados.add(item.item);
    encantos.push({ dp, item });
  }
  return { encantos };
}

/* ═══════════════════════════════════════════════════════
   1g. TABELAS DE ACESSÓRIOS MÁGICOS (Menor / Médio / Maior)
   ═══════════════════════════════════════════════════════ */

const ACESSORIO_MENOR = [
  {max:1,   item:"Algibeira mordedora",           preco:"1.000",   livro:"Heróis de Arton", pag:263},
  {max:2,   item:"Elixir da mente dividida",      preco:"1.500",   livro:"Heróis de Arton", pag:265},
  {max:3,   item:"Papiro das estrelas",           preco:"1.500",   livro:"Heróis de Arton", pag:267},
  {max:4,   item:"Anel do sustento",              preco:"3.000",   livro:"Tormenta20",      pag:342},
  {max:7,   item:"Bainha mágica",                 preco:"3.000",   livro:"Tormenta20",      pag:342},
  {max:9,   item:"Corda da escalada",             preco:"3.000",   livro:"Tormenta20",      pag:343},
  {max:10,  item:"Ferraduras da velocidade",      preco:"3.000",   livro:"Tormenta20",      pag:344},
  {max:12,  item:"Garrafa da fumaça eterna",      preco:"3.000",   livro:"Tormenta20",      pag:344},
  {max:15,  item:"Gema da luminosidade",          preco:"3.000",   livro:"Tormenta20",      pag:344},
  {max:18,  item:"Manto élfico",                  preco:"3.000",   livro:"Tormenta20",      pag:345},
  {max:21,  item:"Mochila de carga",              preco:"3.000",   livro:"Tormenta20",      pag:345},
  {max:23,  item:"Amuleto da visão etérea",       preco:"3.000",   livro:"Heróis de Arton", pag:263},
  {max:25,  item:"Cinturão do trobo",             preco:"3.000",   livro:"Heróis de Arton", pag:264},
  {max:27,  item:"Elixir da eternidade",          preco:"3.000",   livro:"Heróis de Arton", pag:265},
  {max:29,  item:"Pérola da nulificação",         preco:"3.000",   livro:"Heróis de Arton", pag:267},
  {max:31,  item:"Saco dos ventos silenciosos",   preco:"3.000",   livro:"Heróis de Arton", pag:267},
  {max:36,  item:"Brincos da sagacidade",         preco:"4.500",   livro:"Tormenta20",      pag:342},
  {max:41,  item:"Luvas da delicadeza",           preco:"4.500",   livro:"Tormenta20",      pag:344},
  {max:46,  item:"Manoplas da força do ogro",     preco:"4.500",   livro:"Tormenta20",      pag:344},
  {max:50,  item:"Manto da resistência",          preco:"4.500",   livro:"Tormenta20",      pag:344},
  {max:55,  item:"Manto do fascínio",             preco:"4.500",   livro:"Tormenta20",      pag:344},
  {max:60,  item:"Pingente da sensatez",          preco:"4.500",   livro:"Tormenta20",      pag:345},
  {max:65,  item:"Torque do vigor",               preco:"4.500",   livro:"Tormenta20",      pag:345},
  {max:66,  item:"Monóculo da franqueza",         preco:"4.500",   livro:"Heróis de Arton", pag:266},
  {max:68,  item:"Chapéu do disfarce",            preco:"6.000",   livro:"Tormenta20",      pag:343},
  {max:69,  item:"Flauta fantasma",               preco:"6.000",   livro:"Tormenta20",      pag:344},
  {max:71,  item:"Lanterna da revelação",         preco:"6.000",   livro:"Tormenta20",      pag:344},
  {max:73,  item:"Algibeira provedora",           preco:"6.000",   livro:"Heróis de Arton", pag:263},
  {max:75,  item:"Gaiola dos arcanos",            preco:"6.000",   livro:"Heróis de Arton", pag:266},
  {max:77,  item:"Lâmpada da ilusão impecável",   preco:"6.000",   livro:"Heróis de Arton", pag:266},
  {max:79,  item:"Pena da criação",               preco:"6.000",   livro:"Heróis de Arton", pag:267},
  {max:81,  item:"Corda da resignação",           preco:"7.500",   livro:"Heróis de Arton", pag:265},
  {max:86,  item:"Anel da proteção",              preco:"9.000",   livro:"Tormenta20",      pag:342},
  {max:87,  item:"Anel do escudo mental",         preco:"9.000",   livro:"Tormenta20",      pag:342},
  {max:88,  item:"Pingente da saúde",             preco:"9.000",   livro:"Tormenta20",      pag:345},
  {max:89,  item:"Coroa de flores",               preco:"9.000",   livro:"Deuses de Arton", pag:55},
  {max:90,  item:"Jarro das profundezas",         preco:"9.000",   livro:"Deuses de Arton", pag:58},
  {max:91,  item:"Escrivaninha consagrada",        preco:"9.000",   livro:"Deuses de Arton", pag:58},
  {max:92,  item:"Anel da proteção mental",       preco:"9.000",   livro:"Heróis de Arton", pag:263},
  {max:93,  item:"Berço das fadas",               preco:"9.000",   livro:"Heróis de Arton", pag:263},
  {max:94,  item:"Chapéu dos truques infinitos",  preco:"9.000",   livro:"Heróis de Arton", pag:264},
  {max:95,  item:"Cinto da leveza graciosa",      preco:"9.000",   livro:"Heróis de Arton", pag:264},
  {max:96,  item:"Cristal da voz silenciosa",     preco:"9.000",   livro:"Heróis de Arton", pag:265},
  {max:97,  item:"Cristal do tempo célere",       preco:"9.000",   livro:"Heróis de Arton", pag:265},
  {max:98,  item:"Ocarina da melodia distante",   preco:"9.000",   livro:"Heróis de Arton", pag:266},
  {max:99,  item:"Olhos do corvo",                preco:"9.000",   livro:"Heróis de Arton", pag:266},
  {max:100, item:"Pergaminho da verdade cósmica", preco:"9.000",   livro:"Heróis de Arton", pag:267},
];

const ACESSORIO_MEDIO = [
  {max:1,   item:"Anel de telecinesia",              preco:"10.500",  livro:"Tormenta20",      pag:342},
  {max:2,   item:"Bola de cristal",                  preco:"10.500",  livro:"Tormenta20",      pag:342},
  {max:3,   item:"Caveira maldita",                  preco:"10.500",  livro:"Tormenta20",      pag:343},
  {max:4,   item:"Instrumento da alegria",           preco:"10.500",  livro:"Deuses de Arton", pag:57},
  {max:5,   item:"Ampulheta da harmonia temporal",   preco:"10.500",  livro:"Heróis de Arton", pag:263},
  {max:6,   item:"Amuleto do amparo",                preco:"10.500",  livro:"Heróis de Arton", pag:263},
  {max:7,   item:"Caixa dos ecos perdidos",          preco:"10.500",  livro:"Heróis de Arton", pag:264},
  {max:8,   item:"Colar da perseverança",            preco:"10.500",  livro:"Heróis de Arton", pag:264},
  {max:9,   item:"Colar do tirano",                  preco:"10.500",  livro:"Heróis de Arton", pag:265},
  {max:10,  item:"Óculos da revelação",              preco:"10.500",  livro:"Heróis de Arton", pag:266},
  {max:11,  item:"Colar das bolas de fogo",          preco:"12.000",  livro:"Heróis de Arton", pag:265},
  {max:12,  item:"Sandálias de Valkaria",            preco:"12.000",  livro:"Heróis de Arton", pag:267},
  {max:13,  item:"Véu diáfano",                      preco:"13.500",  livro:"Deuses de Arton", pag:57},
  {max:14,  item:"Botas aladas",                     preco:"15.000",  livro:"Tormenta20",      pag:342},
  {max:15,  item:"Botas inquietas",                  preco:"15.000",  livro:"Deuses de Arton", pag:59},
  {max:16,  item:"Pira póstera",                     preco:"15.000",  livro:"Deuses de Arton", pag:59},
  {max:17,  item:"Anel do pacto oneroso",            preco:"15.000",  livro:"Heróis de Arton", pag:263},
  {max:18,  item:"Botas do andarilho das sombras",   preco:"15.000",  livro:"Heróis de Arton", pag:263},
  {max:19,  item:"Cálice das marés",                 preco:"15.000",  livro:"Heróis de Arton", pag:264},
  {max:20,  item:"Cinto dos caminhos cruzados",      preco:"15.000",  livro:"Heróis de Arton", pag:264},
  {max:21,  item:"Pedra da passagem",                preco:"15.000",  livro:"Heróis de Arton", pag:267},
  {max:22,  item:"Pingente da dor partilhada",       preco:"15.000",  livro:"Heróis de Arton", pag:267},
  {max:26,  item:"Braceletes de bronze",             preco:"16.500",  livro:"Tormenta20",      pag:342},
  {max:27,  item:"Capa nebulosa",                    preco:"16.500",  livro:"Heróis de Arton", pag:264},
  {max:28,  item:"Espelho do outro lado",            preco:"18.000",  livro:"Heróis de Arton", pag:265},
  {max:30,  item:"Gema da purificação",              preco:"18.000",  livro:"Heróis de Arton", pag:266},
  {max:32,  item:"Máscara da raposa",                preco:"18.000",  livro:"Heróis de Arton", pag:266},
  {max:36,  item:"Anel da energia",                  preco:"21.000",  livro:"Tormenta20",      pag:342},
  {max:40,  item:"Anel da vitalidade",               preco:"21.000",  livro:"Tormenta20",      pag:342},
  {max:42,  item:"Anel de invisibilidade",           preco:"21.000",  livro:"Tormenta20",      pag:342},
  {max:44,  item:"Braçadeiras do arqueiro",          preco:"21.000",  livro:"Tormenta20",      pag:342},
  {max:46,  item:"Brincos de Marah",                 preco:"21.000",  livro:"Tormenta20",      pag:343},
  {max:48,  item:"Faixas do pugilista",              preco:"21.000",  livro:"Tormenta20",      pag:344},
  {max:50,  item:"Manto da aranha",                  preco:"21.000",  livro:"Tormenta20",      pag:344},
  {max:52,  item:"Vassoura voadora",                 preco:"21.000",  livro:"Tormenta20",      pag:345},
  {max:54,  item:"Símbolo abençoado",                preco:"21.000",  livro:"Tormenta20",      pag:345},
  {max:55,  item:"Colar de presas",                  preco:"21.000",  livro:"Deuses de Arton", pag:57},
  {max:56,  item:"Vestido noturno",                  preco:"21.000",  livro:"Deuses de Arton", pag:58},
  {max:57,  item:"Anel da beleza ilusória",          preco:"21.000",  livro:"Heróis de Arton", pag:263},
  {max:58,  item:"Bastão do sonhador",               preco:"21.000",  livro:"Heróis de Arton", pag:263},
  {max:59,  item:"Colar da fúria monstruosa",        preco:"21.000",  livro:"Heróis de Arton", pag:264},
  {max:60,  item:"Coroa da floresta sussurrante",    preco:"21.000",  livro:"Heróis de Arton", pag:265},
  {max:61,  item:"Espelho da verdade",               preco:"21.000",  livro:"Heróis de Arton", pag:265},
  {max:62,  item:"Instrumentos da celeridade",       preco:"22.500",  livro:"Heróis de Arton", pag:266},
  {max:63,  item:"Máscara do predador",              preco:"22.500",  livro:"Heróis de Arton", pag:266},
  {max:65,  item:"Frigideira do chef anão",          preco:"24.000",  livro:"Heróis de Arton", pag:266},
  {max:66,  item:"Gema da santificação",             preco:"24.000",  livro:"Heróis de Arton", pag:266},
  {max:67,  item:"Cubo armadilha",                   preco:"25.000",  livro:"Deuses de Arton", pag:56},
  {max:68,  item:"Caldeirão da vida",                preco:"25.000",  livro:"Deuses de Arton", pag:57},
  {max:72,  item:"Amuleto da robustez",              preco:"25.500",  livro:"Tormenta20",      pag:342},
  {max:74,  item:"Botas velozes",                    preco:"25.500",  livro:"Tormenta20",      pag:342},
  {max:78,  item:"Cinto da força do gigante",        preco:"25.500",  livro:"Tormenta20",      pag:343},
  {max:82,  item:"Coroa majestosa",                  preco:"25.500",  livro:"Tormenta20",      pag:344},
  {max:86,  item:"Estola da serenidade",             preco:"25.500",  livro:"Tormenta20",      pag:344},
  {max:87,  item:"Manto do morcego",                 preco:"25.500",  livro:"Tormenta20",      pag:344},
  {max:91,  item:"Pulseiras da celeridade",          preco:"25.500",  livro:"Tormenta20",      pag:345},
  {max:95,  item:"Tiara da sapiência",               preco:"25.500",  livro:"Tormenta20",      pag:345},
  {max:97,  item:"Argolas místicas",                 preco:"25.500",  livro:"Deuses de Arton", pag:59},
  {max:98,  item:"Bastão da grande harmonia",        preco:"25.500",  livro:"Heróis de Arton", pag:263},
  {max:99,  item:"Coroa da majestade distorcida",    preco:"25.500",  livro:"Heróis de Arton", pag:265},
  {max:100, item:"Bracelete do coração vivaz",       preco:"27.000",  livro:"Heróis de Arton", pag:264},
];

const ACESSORIO_MAIOR = [
  {max:2,   item:"Elmo do teletransporte",             preco:"30.000",   livro:"Tormenta20",      pag:344},
  {max:4,   item:"Gema da telepatia",                  preco:"30.000",   livro:"Tormenta20",      pag:344},
  {max:6,   item:"Gema elemental",                     preco:"30.000",   livro:"Tormenta20",      pag:344},
  {max:11,  item:"Manual da saúde corporal",           preco:"30.000",   livro:"Tormenta20",      pag:345},
  {max:16,  item:"Manual do bom exercício",            preco:"30.000",   livro:"Tormenta20",      pag:345},
  {max:21,  item:"Manual dos movimentos precisos",     preco:"30.000",   livro:"Tormenta20",      pag:345},
  {max:26,  item:"Medalhão de Lena",                   preco:"30.000",   livro:"Tormenta20",      pag:345},
  {max:31,  item:"Tomo da compreensão",                preco:"30.000",   livro:"Tormenta20",      pag:345},
  {max:36,  item:"Tomo da liderança e influência",     preco:"30.000",   livro:"Tormenta20",      pag:345},
  {max:41,  item:"Tomo dos grandes pensamentos",       preco:"30.000",   livro:"Tormenta20",      pag:345},
  {max:44,  item:"Anel da chama dançante",             preco:"30.000",   livro:"Heróis de Arton", pag:263},
  {max:46,  item:"Chapéu pensador",                    preco:"30.000",   livro:"Heróis de Arton", pag:264},
  {max:48,  item:"Cinto da flecha veloz",              preco:"30.000",   livro:"Heróis de Arton", pag:264},
  {max:50,  item:"Gema da profanação",                 preco:"30.000",   livro:"Heróis de Arton", pag:266},
  {max:53,  item:"Tomo da técnica definitiva",         preco:"30.000",   livro:"Heróis de Arton", pag:267},
  {max:55,  item:"Tapeçaria da guerra",                preco:"35.000",   livro:"Deuses de Arton", pag:55},
  {max:57,  item:"Braceletes da amizade intensa",      preco:"36.000",   livro:"Heróis de Arton", pag:264},
  {max:58,  item:"Cilício vivo",                       preco:"37.000",   livro:"Deuses de Arton", pag:55},
  {max:59,  item:"Coração corrompido",                 preco:"45.000",   livro:"Deuses de Arton", pag:55},
  {max:61,  item:"Coração do inverno",                 preco:"45.000",   livro:"Heróis de Arton", pag:265},
  {max:63,  item:"Tomo dos companheiros",              preco:"45.000",   livro:"Heróis de Arton", pag:267},
  {max:65,  item:"Anel refletor",                      preco:"51.000",   livro:"Tormenta20",      pag:342},
  {max:67,  item:"Cinto do campeão",                   preco:"51.000",   livro:"Tormenta20",      pag:343},
  {max:71,  item:"Colar guardião",                     preco:"51.000",   livro:"Tormenta20",      pag:343},
  {max:73,  item:"Estatueta animista",                 preco:"51.000",   livro:"Tormenta20",      pag:344},
  {max:75,  item:"Anel da liberdade",                  preco:"60.000",   livro:"Tormenta20",      pag:342},
  {max:77,  item:"Tapete voador",                      preco:"60.000",   livro:"Tormenta20",      pag:345},
  {max:79,  item:"Chave dos planos",                   preco:"60.000",   livro:"Heróis de Arton", pag:264},
  {max:81,  item:"Cinto da desmaterialização",         preco:"60.000",   livro:"Heróis de Arton", pag:264},
  {max:85,  item:"Braceletes de ouro",                 preco:"64.500",   livro:"Tormenta20",      pag:342},
  {max:87,  item:"Espelho da oposição",                preco:"75.000",   livro:"Tormenta20",      pag:344},
  {max:91,  item:"Robe do arquimago",                  preco:"90.000",   livro:"Tormenta20",      pag:345},
  {max:93,  item:"Ossos dracônicos",                   preco:"90.000",   livro:"Deuses de Arton", pag:56},
  {max:95,  item:"Orbe das tempestades",               preco:"97.500",   livro:"Tormenta20",      pag:345},
  {max:97,  item:"Braçadeiras da força do colosso",    preco:"120.000",  livro:"Heróis de Arton", pag:264},
  {max:99,  item:"Anel da regeneração",                preco:"150.000",  livro:"Tormenta20",      pag:342},
  {max:100, item:"Espelho do aprisionamento",          preco:"150.000",  livro:"Tormenta20",      pag:344},
];

function lookupAcessorio(tier, dp) {
  const tab = tier === "menor" ? ACESSORIO_MENOR
            : tier === "medio" ? ACESSORIO_MEDIO
            : ACESSORIO_MAIOR;
  for (const row of tab) if (dp <= row.max) return row;
  return tab[tab.length - 1];
}

/* ═══════════════════════════════════════════════════════
   1i. TABELA DE POÇÕES (d120)
   ═══════════════════════════════════════════════════════ */

const POCAO_TABLE = [
  {max:1,   item:"Abençoar Alimentos (óleo)",                               preco:"30",     livro:"Tormenta20",       pag:178},
  {max:2,   item:"Área Escorregadia (granada)",                             preco:"30",     livro:"Tormenta20",       pag:180},
  {max:4,   item:"Arma Mágica (óleo)",                                      preco:"30",     livro:"Tormenta20",       pag:181},
  {max:5,   item:"Compreensão",                                             preco:"30",     livro:"Tormenta20",       pag:184},
  {max:11,  item:"Curar Ferimentos (2d8+2 PV)",                             preco:"30",     livro:"Tormenta20",       pag:189},
  {max:13,  item:"Disfarce Ilusório",                                       preco:"30",     livro:"Tormenta20",       pag:191},
  {max:15,  item:"Escuridão (óleo)",                                        preco:"30",     livro:"Tormenta20",       pag:193},
  {max:17,  item:"Luz (óleo)",                                              preco:"30",     livro:"Tormenta20",       pag:197},
  {max:18,  item:"Névoa (granada)",                                         preco:"30",     livro:"Tormenta20",       pag:200},
  {max:19,  item:"Primor Atlético",                                         preco:"30",     livro:"Tormenta20",       pag:201},
  {max:20,  item:"Sono",                                                    preco:"30",     livro:"Tormenta20",       pag:207},
  {max:22,  item:"Proteção Divina",                                         preco:"30",     livro:"Tormenta20",       pag:202},
  {max:24,  item:"Resistência a Energia",                                   preco:"30",     livro:"Tormenta20",       pag:204},
  {max:25,  item:"Suporte Ambiental",                                       preco:"30",     livro:"Tormenta20",       pag:207},
  {max:26,  item:"Tranca Arcana (óleo)",                                    preco:"30",     livro:"Tormenta20",       pag:209},
  {max:27,  item:"Visão Mística",                                           preco:"30",     livro:"Tormenta20",       pag:211},
  {max:28,  item:"Vitalidade Fantasma",                                     preco:"30",     livro:"Tormenta20",       pag:211},
  {max:29,  item:"Armadura Elemental",                                      preco:"30",     livro:"Heróis de Arton",  pag:252},
  {max:30,  item:"Desafio Corajoso",                                        preco:"30",     livro:"Heróis de Arton",  pag:252},
  {max:31,  item:"Discrição",                                               preco:"30",     livro:"Heróis de Arton",  pag:253},
  {max:32,  item:"Farejar Fortuna",                                         preco:"30",     livro:"Heróis de Arton",  pag:254},
  {max:33,  item:"Maaais Klunc",                                            preco:"30",     livro:"Heróis de Arton",  pag:254},
  {max:34,  item:"Ossos de Adamante",                                       preco:"30",     livro:"Heróis de Arton",  pag:254},
  {max:35,  item:"Punho de Mitral",                                         preco:"30",     livro:"Heróis de Arton",  pag:254},
  {max:36,  item:"Magia Dadivosa",                                          preco:"30",     livro:"Deuses de Arton",  pag:62},
  {max:37,  item:"Sigilo de Sszzaas",                                       preco:"30",     livro:"Deuses de Arton",  pag:64},
  {max:38,  item:"Sorriso da Fortuna",                                      preco:"30",     livro:"Deuses de Arton",  pag:64},
  {max:39,  item:"Toque de Megalokk",                                       preco:"30",     livro:"Deuses de Arton",  pag:65},
  {max:40,  item:"Voz da Razão",                                            preco:"30",     livro:"Deuses de Arton",  pag:65},
  {max:42,  item:"Escudo da Fé (aprim.: duração cena)",                     preco:"120",    livro:"Tormenta20",       pag:192},
  {max:44,  item:"Alterar Tamanho",                                         preco:"270",    livro:"Tormenta20",       pag:179},
  {max:45,  item:"Aparência Perfeita",                                      preco:"270",    livro:"Tormenta20",       pag:180},
  {max:46,  item:"Armamento da Natureza (óleo)",                            preco:"270",    livro:"Tormenta20",       pag:181},
  {max:50,  item:"Bola de Fogo (granada)",                                  preco:"270",    livro:"Tormenta20",       pag:182},
  {max:51,  item:"Camuflagem Ilusória",                                     preco:"270",    livro:"Tormenta20",       pag:183},
  {max:52,  item:"Concentração de Combate (aprim.: duração cena)",          preco:"270",    livro:"Tormenta20",       pag:185},
  {max:56,  item:"Curar Ferimentos (4d8+4 PV)",                             preco:"270",    livro:"Tormenta20",       pag:189},
  {max:58,  item:"Físico Divino",                                           preco:"270",    livro:"Tormenta20",       pag:193},
  {max:59,  item:"Mente Divina",                                            preco:"270",    livro:"Tormenta20",       pag:198},
  {max:60,  item:"Metamorfose",                                             preco:"270",    livro:"Tormenta20",       pag:198},
  {max:64,  item:"Purificação",                                             preco:"270",    livro:"Tormenta20",       pag:202},
  {max:66,  item:"Velocidade",                                              preco:"270",    livro:"Tormenta20",       pag:210},
  {max:68,  item:"Vestimenta da Fé (óleo)",                                 preco:"270",    livro:"Tormenta20",       pag:210},
  {max:69,  item:"Voz Divina",                                              preco:"270",    livro:"Tormenta20",       pag:211},
  {max:71,  item:"Orientação (aprim.: duração cena; role atrib.: 1=For, 2=Des…)", preco:"270", livro:"Tormenta20",  pag:200},
  {max:72,  item:"Aura de Morte",                                           preco:"270",    livro:"Heróis de Arton",  pag:252},
  {max:73,  item:"Emular Magia",                                            preco:"270",    livro:"Heróis de Arton",  pag:253},
  {max:74,  item:"Punho de Mitral (aprim.: +2 em ataques e margem de ameaça)", preco:"270", livro:"Heróis de Arton", pag:255},
  {max:75,  item:"Viagem Onírica",                                          preco:"270",    livro:"Heróis de Arton",  pag:255},
  {max:76,  item:"Couraça de Allihanna (óleo)",                             preco:"270",    livro:"Deuses de Arton",  pag:60},
  {max:77,  item:"Toque de Megalokk (aprim.: dano de armas naturais +1 passo e margem de ameaça +1)", preco:"480", livro:"Deuses de Arton", pag:65},
  {max:79,  item:"Arma Mágica (óleo; aprim.: bônus +3)",                    preco:"750",    livro:"Tormenta20",       pag:181},
  {max:81,  item:"Proteção Divina (aprim.: bônus +4)",                      preco:"750",    livro:"Tormenta20",       pag:202},
  {max:82,  item:"Armadura Elemental (aprim.: 4d6 de dano)",                preco:"750",    livro:"Heróis de Arton",  pag:252},
  {max:88,  item:"Curar Ferimentos (7d8+7 PV)",                             preco:"1.080",  livro:"Tormenta20",       pag:189},
  {max:90,  item:"Físico Divino (aprim.: três atributos)",                  preco:"1.080",  livro:"Tormenta20",       pag:193},
  {max:92,  item:"Invisibilidade (aprim.: duração cena)",                   preco:"1.080",  livro:"Tormenta20",       pag:195},
  {max:94,  item:"Pele de Pedra",                                           preco:"1.080",  livro:"Tormenta20",       pag:201},
  {max:95,  item:"Potência Divina",                                         preco:"1.080",  livro:"Tormenta20",       pag:201},
  {max:96,  item:"Voo",                                                     preco:"1.080",  livro:"Tormenta20",       pag:211},
  {max:97,  item:"Percepção Rubra (aprim.: bônus +3)",                      preco:"1.080",  livro:"Deuses de Arton",  pag:63},
  {max:100, item:"Bola de Fogo (granada; aprim.: 10d6 de dano)",            preco:"1.470",  livro:"Tormenta20",       pag:182},
  {max:110, item:"Curar Ferimentos (11d8+11 PV)",                           preco:"3.000",  livro:"Tormenta20",       pag:189},
  {max:114, item:"Pele de Pedra (aprim.: pele de aço e RD 10)",             preco:"3.000",  livro:"Tormenta20",       pag:201},
  {max:116, item:"Premonição",                                              preco:"3.000",  livro:"Tormenta20",       pag:201},
  {max:117, item:"Viagem Onírica (aprim.: falar e lançar magias)",          preco:"3.000",  livro:"Heróis de Arton",  pag:255},
  {max:118, item:"Potência Divina (aprim.: Força +6 e RD 15)",              preco:"6.750",  livro:"Tormenta20",       pag:201},
  {max:119, item:"Momento de Tormenta (granada; aprim.: +4 dados de dano do mesmo tipo)", preco:"6.750", livro:"Ameaças de Arton", pag:404},
  {max:120, item:"Transformação em Dragão (aprim.: atributos +4, asas, mordida, sopro 12d6+12)", preco:"28.000", livro:"Ameaças de Arton", pag:405},
];

function lookupPocao(d120) {
  for (const row of POCAO_TABLE) if (d120 <= row.max) return row;
  return POCAO_TABLE[POCAO_TABLE.length - 1];
}

/* ═══════════════════════════════════════════════════════
   2. TABELAS DE RESOLUÇÃO — STUB (vincular quando disponível)
   ═══════════════════════════════════════════════════════

   Substitua os corpos dessas funções quando as tabelas
   de Equipamentos, Poções, Superiores, Mágicos e
   Acessórios forem fornecidas.

   Cada função deve RETORNAR um objeto com pelo menos:
     { label: String, diceStr: String (opcional) }
   ═══════════════════════════════════════════════════════ */

// Rola `qtd` melhorias para um item do `tipo` dado (Arma/Armadura/Esotérico),
// respeitando pré-requisitos, incompatibilidades e sem repetir. Usado pelo
// item Superior e — no modo Customizável "Superior + Encantado" — pelo item
// mágico (que também ganha melhorias). Lógica idêntica à que vivia em superior().
function rolarMelhorias(tipo, qtd) {
  const melhorias = [];
  const usados = new Set();
  for (let i = 0; i < qtd; i++) {
    let dp, item, tentativas = 0;
    do {
      dp   = rolarPercent();
      item = lookupMelhoria(tipo, dp);
      tentativas++;
    } while (
      tentativas < 40 &&
      (
        usados.has(item.item) ||
        melhoriaPrereqFalta(item.item, usados) ||   // pré-requisito ausente
        melhoriaExclui(item.item, usados)           // par incompatível (Precisa/Maciça etc.)
      )
    );
    usados.add(item.item);
    melhorias.push({ dp, item });
  }
  return melhorias;
}

const TABELAS = {

  // ─── Item Diverso ─────────────────────────────────────
  // Chamada: TABELAS.itemDiverso(dp)
  // dp = resultado do d% já rolado
  itemDiverso(dp) {
    for (const row of ITEM_DIVERSO_TABLE) if (dp <= row.max) return row;
    return ITEM_DIVERSO_TABLE[ITEM_DIVERSO_TABLE.length - 1];
  },

  // ─── Equipamento ──────────────────────────────────────
  equipamento() {
    const d6   = rolarDado(6);
    const tipo = d6 <= 3 ? "Arma" : d6 <= 5 ? "Armadura" : "Esotérico";
    const dp   = rolarPercent();
    const item = lookupEquip(tipo, dp);
    return { tipo, d6, dp, item };
  },

  // ─── Poção ────────────────────────────────────────────
  pocao() {
    const d120 = rolarDado(120);
    const item = lookupPocao(d120);
    return { d120, item };
  },

  // ─── Superior ─────────────────────────────────────────
  superior(qtd) {
    const equip = TABELAS.equipamento();
    return { equip, melhorias: rolarMelhorias(equip.tipo, qtd) };
  },

  // ─── Mágico ───────────────────────────────────────────
  // tier = "menor" | "medio" | "maior"
  // modo = "padrao"       → tabela oficial T20: item base específico
  //                         (arma/armadura/esotérico) + encantos, ou um
  //                         acessório mágico nomeado (menor/médio/maior).
  //        "customizavel" → mesma tabela do Padrão, mas o Mestre escolhe (via
  //                         CUSTOM_FILTROS) o que pode sair: itens mágicos
  //                         específicos por tipo e acessórios nomeados. O que
  //                         estiver desligado é relançado em algo permitido.
  magico(tier, modo) {
    const custom = (modo === 'customizavel');
    const f      = custom ? CUSTOM_FILTROS : null;
    const rolls  = tier === "menor" ? 1 : tier === "medio" ? 2 : 3;

    // d6 → tipo (1-2 Arma, 3 Armadura, 4 Esotérico, 5-6 Acessório).
    // No Customizável com acessórios desligados, 5-6 são relançados.
    let d6;
    do { d6 = rolarDado(6); }
    while (custom && !f.acessorios && d6 > 4);
    const tipo = d6 <= 2 ? "Arma" : d6 === 3 ? "Armadura" : d6 === 4 ? "Esotérico" : "Acessório";

    // Acessório → acessório mágico nomeado (com preço), pela categoria do tier
    if (tipo === "Acessório") {
      const dpBase    = rolarPercent();
      const acessorio = lookupAcessorio(tier, dpBase);
      return { modo, d6, tipo, tier, subTipo: 'nomeado', dpBase, acessorio };
    }

    // Específicos (item nomeado pronto) permitidos para ESTE tipo?
    // No Padrão, sempre; no Customizável, conforme o filtro do tipo.
    const permiteEspec = !custom || (
      tipo === "Arma"     ? f.especArma :
      tipo === "Armadura" ? f.especArmadura :
                            f.especEsoter
    );

    // Arma / Armadura / Esotérico:
    // primeiro rolam-se os encantos; se alguma rolagem cair em 91-100 (e o tipo
    // permitir), o prêmio é um ITEM MÁGICO ESPECÍFICO nomeado (encerra).
    const mg = sorteiaMagicoPadrao(tipo, rolls, permiteEspec);
    if (mg.especifico) {
      return { modo, d6, tipo, tier, subTipo: 'especifico', especifico: mg.especifico };
    }
    // Caso contrário: item base mundano + os encantos rolados (faixas 01-90).
    const dpBase   = rolarPercent();
    const itemBase = lookupEquip(tipo, dpBase);
    const out = { modo, d6, tipo, tier, dpBase, itemBase, encantos: mg.encantos };
    // Modo Customizável "Superior + Encantado": o item mágico também recebe
    // melhorias (vira superior E encantado). Quantidade por tier: 1 / 2 / 3.
    if (custom && CUSTOM_FILTROS.superiorEncantado) {
      const qtdMel = tier === 'menor' ? 1 : tier === 'medio' ? 2 : 3;
      out.melhorias = rolarMelhorias(tipo, qtdMel);
    }
    return out;
  },
};

/* ═══════════════════════════════════════════════════════
   3. UTILITÁRIOS DE DADOS
   ═══════════════════════════════════════════════════════ */

function rolarDado(lados)  { return Math.floor(Math.random() * lados) + 1; }
function rolarPercent()    { return Math.floor(Math.random() * 100) + 1;   }

// Círculo máximo de magia para um pergaminho conforme o ND do encontro —
// mantém o valor do prêmio coerente (ND baixo = magias de círculo baixo).
function circuloMaxPorND(nd) {
  const n = ndParaNumero(nd);
  if (n <= 2)  return 1;
  if (n <= 5)  return 2;
  if (n <= 9)  return 3;
  if (n <= 14) return 4;
  return 5;
}

// Gera um pergaminho aleatório a partir de window.Magias, com o círculo
// limitado pelo ND ativo. Devolve o objeto de montarPergaminho (nome, círculo,
// escola, tipoLabel, preço…) ou null se a lista de magias não estiver pronta.
function gerarPergaminho() {
  const M = window.Magias;
  if (!M || !Array.isArray(M.TODAS) || !M.TODAS.length) return null;
  const maxC = circuloMaxPorND(ndAtivo);
  let pool = M.TODAS.filter(m => m.circulo <= maxC);
  if (!pool.length) pool = M.TODAS;
  const reg = pool[Math.floor(Math.random() * pool.length)];
  if (typeof M.montarPergaminho === 'function') return M.montarPergaminho(reg);
  return {
    nome: reg.nome, circulo: reg.circulo, escola: reg.escola, tipo: reg.tipo,
    tipoLabel: reg.tipo === 'divina' ? 'Divina' : 'Arcana', descricao: reg.descricao,
    precoPergaminho: (typeof M.precoPergaminho === 'function') ? M.precoPergaminho(reg.circulo) : null,
  };
}

function rolarExpressao(xStr, bonus = 0) {
  // xStr: "XdY", bonus: inteiro
  const [c, s] = xStr.split('d').map(Number);
  const rolls = Array.from({length: c}, () => rolarDado(s));
  const total = rolls.reduce((a,b) => a+b, 0) + bonus;
  return { rolls, bonus, total,
    detail: `${xStr}${bonus?'+'+bonus:''} → [${rolls.join(', ')}]${bonus?' + '+bonus:''} = ${total}` };
}

function lookupTable(rows, roll) {
  for (const row of rows) if (roll <= row.max) return row.r;
  return null;
}

function lookupRiqueza(tier, dp) {
  const rows = RIQUEZA_TABLE[tier];
  for (const row of rows) if (dp <= row.max) return RIQUEZA_ROWS[row.rowIdx];
  return RIQUEZA_ROWS[RIQUEZA_ROWS.length - 1];
}

// Aplica a regra +%: soma 20 ao d%, máximo 100
function aplicarPct(dp) { return Math.min(100, dp + 20); }

function resolverContagem(r) {
  // Retorna { value, detail }
  if (r.cntX) {
    const res = rolarExpressao(r.cntX, r.cntB || 0);
    return { value: res.total, detail: res.detail };
  }
  return { value: r.cnt || 1, detail: null };
}

/* ═══════════════════════════════════════════════════════
   4. RESOLUÇÃO DOS RESULTADOS
   ═══════════════════════════════════════════════════════ */

function resolverDinheiro(r) {
  if (!r) return { tipo: 'nada' };

  if (r.riq) {
    const cnt = resolverContagem(r);
    const riquezas = [];
    for (let i = 0; i < cnt.value; i++) {
      const dpBase = rolarPercent();
      // Regra +%: soma 20 ao d%, máximo 100
      const dpFinal = r.pct ? aplicarPct(dpBase) : dpBase;
      const row = lookupRiqueza(r.tier, dpFinal);
      const val = rolarExpressao(row.dice);
      const valorFinal = val.total * row.mult;
      riquezas.push({ dpBase, dpFinal, pct: !!r.pct, row, val, valorFinal });
    }
    const totalGeral = riquezas.reduce((s, rq) => s + rq.valorFinal, 0);
    return { tipo: 'riqueza', tier: r.tier, cnt, pct: !!r.pct, riquezas, totalGeral };
  }

  const res = rolarExpressao(r.dice, r.bonus || 0);
  const valor = res.total * r.mult;
  return {
    tipo: 'moeda',
    dice: r.dice, bonus: r.bonus||0, mult: r.mult, cur: r.cur,
    rolls: res.rolls, total: res.total, valor, detail: res.detail,
  };
}

function resolverItem(r, modo) {
  if (!r) return { tipo: 'nada' };

  switch (r.t) {
    case 'diverso': {
      const dp = rolarPercent();
      return { tipo: 'diverso', dp, res: TABELAS.itemDiverso(dp) };
    }
    case 'equip': {
      if (r.twoD) {
        return { tipo: 'equip', twoD: true, ops: [TABELAS.equipamento(), TABELAS.equipamento()] };
      }
      return { tipo: 'equip', twoD: false, res: TABELAS.equipamento() };
    }
    case 'pocao': {
      const cnt = resolverContagem(r);
      const custom = (modo === 'customizavel');
      const F = CUSTOM_FILTROS;
      // "Substituir poções": parte (ou tudo) do slot de Poção vira Pergaminho.
      const substituir  = custom && F.pergaminhos && F.pergaminhoModo === 'substituir';
      const permitePocao = !custom || F.catPocao;
      const pocoes = [];
      for (let i = 0; i < cnt.value; i++) {
        // sem poções permitidas → tudo pergaminho; com poções → 50/50 por consumível
        const usarPergaminho = substituir && (!permitePocao || rolarDado(2) === 1);
        if (usarPergaminho) {
          const perg = gerarPergaminho();
          pocoes.push(perg ? { kind: 'pergaminho', perg } : TABELAS.pocao());
        } else {
          pocoes.push(TABELAS.pocao());
        }
      }
      return { tipo: 'pocao', cnt, pct: !!r.pct, pocoes };
    }
    case 'sup': {
      if (r.twoD) {
        return { tipo: 'sup', qtd: r.qtd, twoD: true,
          ops: [TABELAS.superior(r.qtd), TABELAS.superior(r.qtd)] };
      }
      return { tipo: 'sup', qtd: r.qtd, twoD: false, res: TABELAS.superior(r.qtd) };
    }
    case 'mag': {
      if (r.twoD) {
        return { tipo: 'mag', tier: r.tier, twoD: true,
          ops: [TABELAS.magico(r.tier, modo), TABELAS.magico(r.tier, modo)] };
      }
      return { tipo: 'mag', tier: r.tier, twoD: false, res: TABELAS.magico(r.tier, modo) };
    }
    default:
      return { tipo: 'nada' };
  }
}

/* ═══════════════════════════════════════════════════════
   5. RENDERIZAÇÃO
   ═══════════════════════════════════════════════════════ */

const TIER_NOME  = { menor:'Menor', medio:'Médio', media:'Média', maior:'Maior' };
const CUR_FULL   = { TC:'Tibares de Cobre', 'T$':'Tibares de Prata', TO:'Tibares de Ouro' };

function tag(txt, cls='') {
  return `<span class="tag ${cls}">${txt}</span>`;
}

function diceInline(txt) {
  return `<span class="dice-inline">${txt}</span>`;
}

function ph(txt) {
  return `<span class="ph">⚙ [${txt}]</span>`;
}

// ── Cabeçalho com rolagem d% ──────────────────────────
function renderDpRow(dpRoll, texto) {
  return `<div class="dp-row">
    ${diceInline('d%')}
    <span class="dp-value">${dpRoll}</span>
    <span class="dp-arrow">→</span>
    <span class="dp-match">${texto}</span>
  </div>`;
}

// ── Dinheiro ──────────────────────────────────────────
function renderDinheiro(dpRoll, resolved) {
  let dpTexto, cardHtml;

  if (resolved.tipo === 'nada') {
    dpTexto = 'nenhum dinheiro';
    cardHtml = `<div class="result-card none"><div class="rc-title">— Sem dinheiro</div></div>`;

  } else if (resolved.tipo === 'riqueza') {
    const tn = TIER_NOME[resolved.tier];
    const n  = resolved.riquezas.length;
    dpTexto  = `${n} Riqueza${n>1?'s':''} ${tn}${resolved.pct?' (+%)':''}`;

    let inner = '';
    resolved.riquezas.forEach((riq, i) => {
      const lbl     = n > 1 ? `<strong>Riqueza ${i+1}:</strong> ` : '';
      const pctNote = riq.pct
        ? `<span style="color:var(--gold);font-size:0.8rem"> (${riq.dpBase} +20 = ${riq.dpFinal})</span>`
        : '';
      const multFmt   = riq.row.mult.toLocaleString('pt-BR');
      const valorFmt  = riq.valorFinal.toLocaleString('pt-BR');
      const grupos    = RIQUEZA_EXEMPLOS[riq.row.idx] || [];
      const exemplosHtml = grupos.map(g =>
        `<div class="sub-indent" style="font-size:0.82rem;margin-top:3px;color:var(--text-dim);flex-wrap:wrap">
           <span class="bullet">◇</span>
           <span class="peso-tag">${g.peso}</span>
           <span style="font-style:italic">${g.itens}</span>
         </div>`
      ).join('');

      inner += `
        <div class="sub-row">
          <div class="sub-line">
            <span class="bullet">◆</span>
            ${lbl}${diceInline('d%')} = ${riq.dpFinal}${pctNote}
            &nbsp;→&nbsp;
            ${diceInline(riq.row.dice + ' × ' + multFmt)}
            = <span style="color:var(--text-mid)">${riq.val.detail}</span>
            &nbsp;→&nbsp;
            <strong style="color:var(--gold-light)">${valorFmt} T$</strong>
            <span style="color:var(--text-dim);font-size:0.82rem">&nbsp;(${riq.row.vAprox})</span>
          </div>
          <div class="sub-indent" style="font-style:italic;color:var(--text-dim);font-size:0.84rem;margin-top:4px">
            <span class="bullet">◇</span>
            <span><em>Exemplos:</em></span>
          </div>
          ${exemplosHtml}
        </div>`;
    });

    const totalFmt = resolved.totalGeral.toLocaleString('pt-BR');
    const totalLine = n > 1
      ? `<div style="margin-top:10px;padding-top:10px;border-top:1px solid var(--border);
                    font-family:'Cinzel',serif;font-size:0.85rem;color:var(--gold-light)">
           ⊞ Total estimado: ${totalFmt} T$
         </div>`
      : '';

    cardHtml = `<div class="result-card riqueza">
      <div class="rc-title">💎 ${n} Riqueza${n>1?'s':''} ${tn} ${resolved.pct ? tag('+%') : ''}</div>
      <div class="rc-body">${inner}${totalLine}</div>
    </div>`;

  } else { // moeda
    const dStr = `${resolved.dice}${resolved.bonus ? '+'+resolved.bonus : ''}`;
    dpTexto = `${dStr} × ${resolved.mult.toLocaleString('pt-BR')} ${resolved.cur}`;
    const valorFmt = resolved.valor.toLocaleString('pt-BR');
    cardHtml = `<div class="result-card">
      <div class="rc-title">💰 ${valorFmt} ${resolved.cur}</div>
      <div class="rc-detail">${dStr} × ${resolved.mult.toLocaleString('pt-BR')}: ${resolved.detail}</div>
      <div class="rc-detail" style="color:var(--text-mid)">${CUR_FULL[resolved.cur]}</div>
    </div>`;
  }

  return renderDpRow(dpRoll, dpTexto) + cardHtml;
}

// ── Bloco de equipamento ──────────────────────────────
// Bloco de descrição recolhível (aba de pergaminho + tooltips de regra).
function descBlocoItem(nome) {
  if (!window.ItensDescricoes || !nome) return '';
  return ItensDescricoes.bloco(nome);
}

// Faixa de atributos do item (dano/crítico/tipo p/ armas; bônus/penalidade p/
// armaduras), buscada no catálogo da Loja. Vazia se o item não tiver stats lá.
function statsItemHTML(nome) {
  const st = (typeof LojaCompleta !== 'undefined' && LojaCompleta.statsDeItem)
    ? LojaCompleta.statsDeItem(nome) : null;
  if (!st) return '';
  const partes = [];
  if (st.kind === 'weapon') {
    if (st.dano)         partes.push(`<strong>Dano</strong> ${st.dano}`);
    if (st.critico)      partes.push(`<strong>Crítico</strong> ${String(st.critico).replace(/[xX]/g, '×')}`);
    if (st.tipo)         partes.push(st.tipo);
    if (st.alcance)      partes.push(st.alcance);
    if (st.peso != null) partes.push(`${st.peso} esp.`);
  } else if (st.kind === 'armor') {
    if (st.bonus != null) partes.push(`<strong>Defesa</strong> +${st.bonus}`);
    if (st.penalidade)    partes.push(`<strong>Penalidade</strong> ${st.penalidade}`);
    if (st.peso != null)  partes.push(`${st.peso} esp.`);
  }
  if (!partes.length) return '';
  return `<div class="sub-indent rc-stats"><span class="bullet">◇</span>
    <span class="rc-stats-txt">${partes.join('&nbsp;·&nbsp;')}</span></div>`;
}

function blockEquip(equip, prefixo='') {
  const obsHtml = equip.item?.obs
    ? `<span style="color:var(--gold-dim);font-size:0.78rem"> ⚠ ${equip.item.obs}</span>`
    : '';
  return `<div class="sub-line">
    <span class="bullet">◆</span>
    ${prefixo ? `<strong>${prefixo}</strong>&nbsp;` : ''}
    ${diceInline('d6')} = ${equip.d6} → <strong>${equip.tipo}</strong>
    &nbsp;·&nbsp;
    ${diceInline('d%')} = ${equip.dp}
    &nbsp;→&nbsp;
    <strong style="color:var(--text)">${equip.item?.item ?? '—'}</strong>
    ${obsHtml}
  </div>
  ${statsItemHTML(equip.item?.item)}
  ${equip.item ? `<div class="sub-indent"><span class="bullet">◇</span>
    <span class="livro-ref">📖 ${equip.item.livro}<span class="pag">p. ${equip.item.pag}</span></span>
  </div>` : ''}
  ${descBlocoItem(equip.item?.item)}`;
}

// ── Bloco de poção ────────────────────────────────────
function blockPocao(pocao, idx, total, pct) {
  const lbl      = total > 1 ? `Poção ${idx+1}` : 'Poção';
  const precoFmt = pocao.item?.preco
    ? `<span style="color:var(--text-dim);font-size:0.8rem"> (${pocao.item.preco} T$)</span>`
    : '';
  const obsHtml  = pocao.item?.obs
    ? `<span style="color:var(--gold-dim);font-size:0.78rem"> ⚠ ${pocao.item.obs}</span>`
    : '';
  return `<div class="sub-indent">
    <span class="bullet">◇</span>
    ${lbl}: ${diceInline('d120')} = ${pocao.d120}
    ${pct ? tag('+%') : ''}
    &nbsp;→&nbsp;
    <strong style="color:var(--text)">${pocao.item?.item ?? '—'}</strong>
    ${precoFmt}${obsHtml}
  </div>
  ${pocao.item ? `<div class="sub-indent" style="padding-left:24px">
    <span class="bullet">◇</span>
    <span class="livro-ref">📖 ${pocao.item.livro}<span class="pag">p. ${pocao.item.pag}</span></span>
  </div>` : ''}
  ${descBlocoItem(pocao.item?.item)}`;
}

// ── Bloco de pergaminho (magia engarrafada) ───────────
function blockPergaminho(perg, idx, total) {
  if (!perg) return '';
  const lbl = total > 1 ? `Pergaminho ${idx + 1}` : 'Pergaminho';
  const preco = (perg.precoPergaminho != null)
    ? `<span style="color:var(--text-dim);font-size:0.8rem"> (${perg.precoPergaminho.toLocaleString('pt-BR')} T$)</span>`
    : '';
  const meta = [
    `${perg.circulo}º círculo`,
    perg.tipoLabel || (perg.tipo === 'divina' ? 'Divina' : 'Arcana'),
    perg.escola,
  ].filter(Boolean).join(' · ');
  return `<div class="sub-indent">
    <span class="bullet">◇</span>
    ${lbl}: <strong style="color:var(--text)">📜 ${perg.nome}</strong>${preco}
  </div>
  <div class="sub-indent" style="padding-left:24px">
    <span class="bullet">◇</span>
    <span class="livro-ref">${meta}</span>
  </div>
  ${descBlocoItem(perg.nome)}`;
}

// ── Bloco de item superior ────────────────────────────
function blockSuperior(sup, prefixo='') {
  let s = blockEquip(sup.equip, prefixo);
  sup.melhorias.forEach((m, i) => {
    const obsHtml = m.item?.obs
      ? `<span style="color:var(--gold-dim);font-size:0.78rem"> ⚠ ${m.item.obs}</span>`
      : '';
    s += `<div class="sub-indent">
      <span class="bullet">◇</span>
      Melhoria ${i+1}: ${diceInline('d%')} = ${m.dp}
      &nbsp;→&nbsp;
      <strong style="color:var(--text)">${m.item?.item ?? '—'}</strong>
      ${obsHtml}
    </div>
    ${m.item ? `<div class="sub-indent" style="padding-left:24px"><span class="bullet">◇</span>
      <span class="livro-ref">📖 ${m.item.livro}<span class="pag">p. ${m.item.pag}</span></span>
    </div>` : ''}
    ${descBlocoItem(m.item?.item)}`;
  });
  return s;
}

// ── Bloco de item mágico ──────────────────────────────
function blockMagico(mag, prefixo='') {
  const tn = TIER_NOME[mag.tier];
  let s = `<div class="sub-line">
    <span class="bullet">◆</span>
    ${prefixo ? `<strong>${prefixo}</strong>` : ''}
    ${diceInline('d6')} = ${mag.d6} → <strong>${mag.tipo}</strong>
    &nbsp;<em style="color:var(--text-dim)">(Item Mágico ${tn})</em>
  </div>`;

  // ── Padrão — item mágico específico (item nomeado pronto) ──
  if (mag.subTipo === 'especifico') {
    const e = mag.especifico;
    s += `<div class="sub-indent" style="font-style:italic;color:var(--text-dim);font-size:0.82rem">
      <span class="bullet">◇</span>
      <span>Encanto ${diceInline('d%')} = ${e.dp} (91-100) → <strong>Item Específico</strong></span>
    </div>
    <div class="sub-indent">
      <span class="bullet">◇</span>
      Item específico: ${diceInline('d%')} = ${e.dpE}
      &nbsp;→&nbsp;
      <strong style="color:var(--text)">${e.item?.item ?? '—'}</strong>
    </div>
    ${e.item ? `<div class="sub-indent" style="padding-left:24px">
      <span class="bullet">◇</span>
      <span class="livro-ref">📖 ${e.item.livro}<span class="pag">p. ${e.item.pag}</span></span>
    </div>` : ''}
    ${descBlocoItem(e.item?.item)}`;
    return s;
  }

  // ── Penitência de Azgher — somente encantos (sem item base) ──
  if (mag.subTipo === 'soEncantos') {
    s += `<div class="sub-indent" style="font-style:italic;color:var(--text-dim);font-size:0.82rem">
      <span class="bullet">◇</span>
      <span>Encantos de <strong>${mag.tipo}</strong> — sem item base específico
      <em>(Penitência de Azgher)</em></span>
    </div>`;
    mag.encantos.forEach((enc, i) => {
      const doisTag = enc.item?.doisEncantos ? `&nbsp;${tag('conta como 2 encantos')}` : '';
      const obsHtml = enc.item?.obs
        ? `<span style="color:var(--gold-dim);font-size:0.78rem"> ⚠ ${enc.item.obs}</span>`
        : '';
      s += `<div class="sub-indent" style="margin-top:3px">
        <span class="bullet">◇</span>
        Encanto ${i+1}: ${diceInline('d%')} = ${enc.dp}
        &nbsp;→&nbsp;
        <strong style="color:var(--text)">${enc.item?.item ?? '—'}</strong>
        ${doisTag}${obsHtml}
      </div>
      ${enc.item ? `<div class="sub-indent" style="padding-left:24px">
        <span class="bullet">◇</span>
        <span class="livro-ref">📖 ${enc.item.livro}<span class="pag">p. ${enc.item.pag}</span></span>
      </div>` : ''}
      ${descBlocoItem(enc.item?.item)}`;
    });
    return s;

  // ── Padrão — acessório mágico nomeado (com preço) ──
  } else if (mag.subTipo === 'nomeado') {
    const ac = mag.acessorio;
    const precoFmt = ac?.preco
      ? `<span style="color:var(--text-dim);font-size:0.82rem"> (${ac.preco} T$)</span>`
      : '';
    s += `<div class="sub-indent">
      <span class="bullet">◇</span>
      Acessório: ${diceInline('d%')} = ${mag.dpBase}
      &nbsp;→&nbsp;
      <strong style="color:var(--text)">${ac?.item ?? '—'}</strong>${precoFmt}
    </div>
    ${ac ? `<div class="sub-indent" style="padding-left:24px">
      <span class="bullet">◇</span>
      <span class="livro-ref">📖 ${ac.livro}<span class="pag">p. ${ac.pag}</span></span>
    </div>` : ''}
    ${descBlocoItem(ac?.item)}`;
    return s;
  }

  // ── Item mágico de Arma / Armadura / Esotérico (item base + encantos) ──
  {
    // Item base
    const obsBase = mag.itemBase?.obs
      ? `<span style="color:var(--gold-dim);font-size:0.78rem"> ⚠ ${mag.itemBase.obs}</span>`
      : '';
    s += `<div class="sub-indent">
      <span class="bullet">◇</span>
      Item base: ${diceInline('d%')} = ${mag.dpBase}
      &nbsp;→&nbsp;
      <strong style="color:var(--text)">${mag.itemBase?.item ?? '—'}</strong>
      ${obsBase}
    </div>
    ${mag.itemBase ? `<div class="sub-indent" style="padding-left:24px">
      <span class="bullet">◇</span>
      <span class="livro-ref">📖 ${mag.itemBase.livro}<span class="pag">p. ${mag.itemBase.pag}</span></span>
    </div>` : ''}`;
    // Encantos
    mag.encantos.forEach((enc, i) => {
      const doisTag = enc.item?.doisEncantos ? `&nbsp;${tag('conta como 2 encantos')}` : '';
      const obsHtml = enc.item?.obs
        ? `<span style="color:var(--gold-dim);font-size:0.78rem"> ⚠ ${enc.item.obs}</span>`
        : '';
      s += `<div class="sub-indent" style="margin-top:3px">
        <span class="bullet">◇</span>
        Encanto ${i+1}: ${diceInline('d%')} = ${enc.dp}
        &nbsp;→&nbsp;
        <strong style="color:var(--text)">${enc.item?.item ?? '—'}</strong>
        ${doisTag}${obsHtml}
      </div>
      ${enc.item ? `<div class="sub-indent" style="padding-left:24px">
        <span class="bullet">◇</span>
        <span class="livro-ref">📖 ${enc.item.livro}<span class="pag">p. ${enc.item.pag}</span></span>
      </div>` : ''}`;
    });
    // Modo Customizável "Superior + Encantado": melhorias no item mágico.
    (mag.melhorias || []).forEach((m, i) => {
      const obsHtml = m.item?.obs
        ? `<span style="color:var(--gold-dim);font-size:0.78rem"> ⚠ ${m.item.obs}</span>`
        : '';
      s += `<div class="sub-indent" style="margin-top:3px">
        <span class="bullet">◇</span>
        ✦ Melhoria ${i+1}: ${diceInline('d%')} = ${m.dp}
        &nbsp;→&nbsp;
        <strong style="color:var(--text)">${m.item?.item ?? '—'}</strong>
        ${obsHtml}
      </div>
      ${m.item ? `<div class="sub-indent" style="padding-left:24px"><span class="bullet">◇</span>
        <span class="livro-ref">📖 ${m.item.livro}<span class="pag">p. ${m.item.pag}</span></span>
      </div>` : ''}`;
    });
  }
  return s;
}

// ── Itens ─────────────────────────────────────────────
function renderItens(dpRoll, resolved) {
  let dpTexto, cardHtml;

  if (resolved.tipo === 'nada') {
    dpTexto = 'nenhum item';
    cardHtml = `<div class="result-card none"><div class="rc-title">— Sem itens</div></div>`;

  } else if (resolved.tipo === 'diverso') {
    const item = resolved.res;
    dpTexto = item.item;
    const obsHtml = item.obs
      ? `<div class="sub-indent" style="font-size:0.82rem;color:var(--gold-dim);margin-top:3px">
           <span class="bullet">◇</span>⚠ ${item.obs}
         </div>`
      : '';
    cardHtml = `<div class="result-card">
      <div class="rc-title">📦 ${item.item}</div>
      <div class="rc-body">
        <div class="sub-line">
          <span class="bullet">◆</span>
          ${diceInline('d%')} = ${resolved.dp}
        </div>
        <div class="sub-indent" style="margin-top:6px">
          <span class="bullet">◇</span>
          <span class="livro-ref">📖 ${item.livro}<span class="pag">p. ${item.pag}</span></span>
        </div>
        ${obsHtml}
        ${descBlocoItem(item.item)}
      </div>
    </div>`;

  } else if (resolved.tipo === 'equip') {
    dpTexto = 'Equipamento' + (resolved.twoD ? ' (2D)' : '');
    const inner = resolved.twoD
      ? blockEquip(resolved.ops[0], 'Opção 1:') + blockEquip(resolved.ops[1], 'Opção 2:')
      : blockEquip(resolved.res);
    cardHtml = `<div class="result-card">
      <div class="rc-title">⚔ Equipamento ${resolved.twoD ? tag('2D — Escolha o Melhor','blue') : ''}</div>
      <div class="rc-body sub-row">${inner}</div>
    </div>`;

  } else if (resolved.tipo === 'pocao') {
    const arr   = resolved.pocoes;
    const n     = arr.length;
    const nPerg = arr.filter(x => x && x.kind === 'pergaminho').length;
    const nPoc  = n - nPerg;
    let titulo, icone;
    if (nPerg && !nPoc)     { titulo = `${n} Pergaminho${n>1?'s':''}`; icone = '📜'; }
    else if (nPerg && nPoc) { titulo = `${nPoc} Poç${nPoc>1?'ões':'ão'} · ${nPerg} Pergaminho${nPerg>1?'s':''}`; icone = '🧪📜'; }
    else                    { titulo = `${n} ${n>1?'Poções':'Poção'}`; icone = '🧪'; }
    dpTexto = `${titulo}${resolved.pct?' +%':''}`;
    let detail = '';
    if (resolved.cnt.detail) detail = `<div class="rc-detail">Quantidade: ${resolved.cnt.detail}</div>`;
    let ip = 0, ig = 0;
    const inner = arr.map(el => (el && el.kind === 'pergaminho')
      ? blockPergaminho(el.perg, ig++, nPerg)
      : blockPocao(el, ip++, nPoc, resolved.pct)).join('');
    cardHtml = `<div class="result-card">
      <div class="rc-title">${icone} ${titulo} ${resolved.pct ? tag('+%') : ''}</div>
      ${detail}
      <div class="rc-body sub-row">${inner}</div>
    </div>`;

  } else if (resolved.tipo === 'sup') {
    const q = resolved.qtd;
    dpTexto = `Superior (${q} Melhoria${q>1?'s':''})${resolved.twoD?' 2D':''}`;
    const inner = resolved.twoD
      ? `<div class="sub-row">${blockSuperior(resolved.ops[0],'Opção 1:')}</div>
         <div class="sub-row">${blockSuperior(resolved.ops[1],'Opção 2:')}</div>`
      : `<div class="sub-row">${blockSuperior(resolved.res)}</div>`;
    cardHtml = `<div class="result-card">
      <div class="rc-title">✨ Superior — ${q} Melhoria${q>1?'s':''} ${resolved.twoD ? tag('2D — Escolha o Melhor','blue') : ''}</div>
      <div class="rc-body">${inner}</div>
    </div>`;

  } else if (resolved.tipo === 'mag') {
    const tn = TIER_NOME[resolved.tier];
    dpTexto = `Mágico (${tn})${resolved.twoD?' 2D':''}`;
    const inner = resolved.twoD
      ? `<div class="sub-row">${blockMagico(resolved.ops[0],'Opção 1:')}</div>
         <div class="sub-row">${blockMagico(resolved.ops[1],'Opção 2:')}</div>`
      : `<div class="sub-row">${blockMagico(resolved.res)}</div>`;
    cardHtml = `<div class="result-card magico">
      <div class="rc-title">🔮 Item Mágico ${tn} ${resolved.twoD ? tag('2D — Escolha o Melhor','blue') : ''}</div>
      <div class="rc-body">${inner}</div>
    </div>`;
  }

  return renderDpRow(dpRoll, dpTexto) + cardHtml;
}

/* ═══════════════════════════════════════════════════════
   6. CONTROLADOR PRINCIPAL
   ═══════════════════════════════════════════════════════ */

let ndAtivo = null;
const NDS = ["1/4","1/2","1","2","3","4","5","6","7","8","9","10",
             "11","12","13","14","15","16","17","18","19","20"];

/* ═══════════════════════════════════════════════════════
   6a. CONJUNTO DE REGRAS — Padrão × Customizável
   Afeta APENAS a resolução de itens "Mágico":
     padrao       → tabela oficial T20 (tudo pode sair)
     customizavel → tabela oficial filtrada pelo Mestre (CUSTOM_FILTROS):
                    liga/desliga itens mágicos específicos por tipo e
                    acessórios nomeados. O desligado é relançado.
   ═══════════════════════════════════════════════════════ */

const MODO_RECOMP_KEY  = 'grifosAlados.recompensasModo';
const CUSTOM_FILTROS_KEY = 'grifosAlados.recompensasFiltros';
let MODO_RECOMP = 'padrao';   // padrão da casa = tabela oficial T20

// Filtros do modo Customizável. Tudo ligado = idêntico ao Padrão.
const CUSTOM_FILTROS = {
  especArma:     true,   // itens mágicos específicos — Arma
  especArmadura: true,   // itens mágicos específicos — Armadura & Escudo
  especEsoter:   true,   // itens mágicos específicos — Esotérico
  acessorios:    true,   // acessórios mágicos nomeados (menor/médio/maior)
  // ── Modos & filtros adicionais (default = idêntico ao comportamento atual) ──
  catPocao:        true,          // Poções podem sair (desmarcar = excluir)
  catDiverso:      true,          // Item diverso pode sair
  catEquipMundano: true,          // Equipamento mundano pode sair
  catSuperior:     true,          // Item superior pode sair
  pergaminhos:     false,         // Pergaminhos como recompensa
  pergaminhoModo:  'substituir',  // 'substituir' (no slot de Poção) | 'adicional' (bônus)
  superiorEncantado: false,       // item mágico também ganha melhorias (superior + encantado)
};

const MODO_DESC = {
  padrao:       'Tabela oficial de Tormenta20: “Mágico” resolve o item base específico (arma, armadura, escudo ou esotérico) com seus encantos, ou um acessório mágico nomeado (menor, médio ou maior) com preço.',
  customizavel: 'Você define o que pode sair: itens mágicos específicos por tipo, acessórios nomeados, pergaminhos (substituindo poções ou como bônus), exclusão de categorias inteiras e o modo “superior + encantado”. Tudo é opcional — o que você não tocar segue idêntico à tabela oficial.',
};

function carregarModoRecomp() {
  try {
    const m = localStorage.getItem(MODO_RECOMP_KEY);
    if (m === 'padrao' || m === 'customizavel') MODO_RECOMP = m;
    // (valores antigos como "penitencia" caem no padrão — modo aposentado)
    const f = JSON.parse(localStorage.getItem(CUSTOM_FILTROS_KEY) || 'null');
    if (f && typeof f === 'object') {
      for (const k of Object.keys(CUSTOM_FILTROS)) {
        if (typeof f[k] === 'boolean') CUSTOM_FILTROS[k] = f[k];
      }
      if (f.pergaminhoModo === 'substituir' || f.pergaminhoModo === 'adicional') {
        CUSTOM_FILTROS.pergaminhoModo = f.pergaminhoModo;
      }
    }
  } catch (e) {
    console.warn('[recompensas] Não foi possível ler o modo:', e.message);
  }
}

function salvarModoRecomp() {
  try {
    localStorage.setItem(MODO_RECOMP_KEY, MODO_RECOMP);
    localStorage.setItem(CUSTOM_FILTROS_KEY, JSON.stringify(CUSTOM_FILTROS));
  } catch (e) {}
}

// Aplica o estado dos filtros ao catálogo de tesouros (blocos esmaecidos
// quando o tipo está desligado no modo Customizável).
function atualizarCatalogoFiltros() {
  const cat = document.getElementById('catalogoTesouros');
  if (!cat) return;
  const custom = (MODO_RECOMP === 'customizavel');
  cat.querySelectorAll('[data-filtro-sec]').forEach(sec => {
    const k = sec.dataset.filtroSec;
    const off = custom && !CUSTOM_FILTROS[k];
    sec.classList.toggle('cat-sec--off', off);
  });
}

function atualizarModoUI() {
  const bc = document.getElementById('modoCustom');
  const bd = document.getElementById('modoPadrao');
  const custom = (MODO_RECOMP === 'customizavel');
  if (bc) bc.classList.toggle('active', custom);
  if (bd) bd.classList.toggle('active', !custom);
  const desc = document.getElementById('modoDesc');
  if (desc) desc.textContent = MODO_DESC[MODO_RECOMP] || '';

  // Painel de filtros só aparece no Customizável; sincroniza as caixas.
  const painel = document.getElementById('customFiltros');
  if (painel) {
    painel.hidden = !custom;
    painel.querySelectorAll('input[data-filtro]').forEach(chk => {
      chk.checked = !!CUSTOM_FILTROS[chk.dataset.filtro];
    });
    // radios do modo de pergaminho + visibilidade do sub-painel
    painel.querySelectorAll('input[data-perg-modo]').forEach(r => {
      r.checked = (r.dataset.pergModo === CUSTOM_FILTROS.pergaminhoModo);
    });
    const pm = painel.querySelector('.custom-perg-modo');
    if (pm) pm.hidden = !CUSTOM_FILTROS.pergaminhos;
  }

  const catNota = document.getElementById('catModoNota');
  if (catNota) catNota.textContent = custom
    ? 'Modo Customizável: os blocos esmaecidos abaixo estão desligados nos seus filtros e não serão sorteados — os demais seguem normalmente.'
    : 'Modo Padrão (T20): “Mágico” pode trazer item base + encantos, um item mágico específico, ou um acessório nomeado.';
  atualizarCatalogoFiltros();
}

function selecionarModoRecomp(m) {
  MODO_RECOMP = (m === 'customizavel') ? 'customizavel' : 'padrao';
  salvarModoRecomp();
  atualizarModoUI();
}

function alternarFiltroCustom(chave, valor) {
  if (!(chave in CUSTOM_FILTROS)) return;
  CUSTOM_FILTROS[chave] = !!valor;
  salvarModoRecomp();
  atualizarCatalogoFiltros();
}

/* ═══════════════════════════════════════════════════════
   6b. LOG DE ROLAGENS — últimas 5, salvas no navegador
   Guarda os DADOS resolvidos de cada rolagem (não o HTML),
   e re-renderiza com as mesmas funções da rolagem ao vivo.
   ═══════════════════════════════════════════════════════ */

const RECOMP_LOG_KEY = 'grifosAlados.recompensasLog';
const RECOMP_LOG_MAX = 5;
let recompLog = [];

function carregarLogRecompensas() {
  try {
    const txt = localStorage.getItem(RECOMP_LOG_KEY);
    if (txt) recompLog = JSON.parse(txt);
  } catch (e) {
    console.warn('[recompensas] Não foi possível carregar o log:', e.message);
  }
  if (!Array.isArray(recompLog)) recompLog = [];
}

function salvarLogRecompensas() {
  try {
    localStorage.setItem(RECOMP_LOG_KEY, JSON.stringify(recompLog));
  } catch (e) {
    console.warn('[recompensas] Não foi possível salvar o log:', e.message);
  }
}

function registrarLogRecompensa(entrada) {
  recompLog.unshift(entrada);                              // mais novo primeiro
  while (recompLog.length > RECOMP_LOG_MAX) recompLog.pop();
  salvarLogRecompensas();
  renderLogRecompensas();
}

function formatarDataLog(ts) {
  const d = new Date(ts);
  const p = n => String(n).padStart(2, '0');
  return `${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()} ${p(d.getHours())}:${p(d.getMinutes())}`;
}

/* ═══════════════════════════════════════════════════════
   6c. EXPORTAÇÃO — gera um .txt limpo da recompensa
   Traz só o prêmio (dinheiro + item), sem rolagens de dado
   e sem os "Exemplos" de peso das riquezas.
   ═══════════════════════════════════════════════════════ */

// Referência de livro/página de um item (quando houver).
function _recRef(item) {
  if (!item || !item.livro) return '';
  return ` [${item.livro}${item.pag ? ', p. ' + item.pag : ''}]`;
}

function _recTxtDinheiro(res) {
  if (!res || res.tipo === 'nada') return '  Sem dinheiro.';
  if (res.tipo === 'moeda') {
    return `  ${res.valor.toLocaleString('pt-BR')} ${res.cur} (${CUR_FULL[res.cur] || res.cur})`;
  }
  if (res.tipo === 'riqueza') {
    const tn  = TIER_NOME[res.tier] || res.tier;
    const mul = res.riquezas.length > 1;
    const linhas = res.riquezas.map((riq, i) => {
      const rot = mul ? `Riqueza ${i + 1}: ` : '';
      return `  • ${rot}${riq.valorFinal.toLocaleString('pt-BR')} T$ (${riq.row.vAprox})`;
    });
    let out = `  ${res.riquezas.length} Riqueza${mul ? 's' : ''} ${tn}:\n` + linhas.join('\n');
    if (mul) out += `\n  Total estimado: ${res.totalGeral.toLocaleString('pt-BR')} T$`;
    return out;
  }
  return '  —';
}

function _recTxtEquip(eq, prefixo = '') {
  if (!eq) return '';
  return `  • ${prefixo}${eq.tipo}: ${eq.item?.item ?? '—'}${_recRef(eq.item)}`;
}

function _recTxtSuperior(sup, prefixo = '') {
  let s = _recTxtEquip(sup.equip, prefixo);
  (sup.melhorias || []).forEach((m, i) => {
    s += `\n    – Melhoria ${i + 1}: ${m.item?.item ?? '—'}${_recRef(m.item)}`;
  });
  return s;
}

function _recTxtMagico(mag, prefixo = '') {
  const tn = TIER_NOME[mag.tier] || mag.tier;
  let s = `  • ${prefixo}Item Mágico ${tn} — ${mag.tipo}`;
  if (mag.subTipo === 'especifico') {
    const e = mag.especifico;
    s += `\n    – Item específico: ${e.item?.item ?? '—'}${_recRef(e.item)}`;
  } else if (mag.subTipo === 'soEncantos') {
    (mag.encantos || []).forEach((enc, i) => {
      const dois = enc.item?.doisEncantos ? ' (conta como 2 encantos)' : '';
      s += `\n    – Encanto ${i + 1}: ${enc.item?.item ?? '—'}${dois}${_recRef(enc.item)}`;
    });
  } else if (mag.subTipo === 'nomeado') {
    const ac = mag.acessorio;
    const preco = ac?.preco ? ` (${ac.preco} T$)` : '';
    s += `\n    – Acessório: ${ac?.item ?? '—'}${preco}${_recRef(ac)}`;
  } else {
    s += `\n    – Item base: ${mag.itemBase?.item ?? '—'}${_recRef(mag.itemBase)}`;
    (mag.encantos || []).forEach((enc, i) => {
      const ref = enc.item || enc.encanto;
      s += `\n    – Encanto ${i + 1}: ${enc.item?.item ?? enc.encanto?.item ?? '—'}${_recRef(ref)}`;
    });
    (mag.melhorias || []).forEach((m, i) => {
      s += `\n    – Melhoria ${i + 1}: ${m.item?.item ?? '—'}${_recRef(m.item)}`;
    });
  }
  return s;
}

function _recTxtItens(res) {
  if (!res || res.tipo === 'nada') return '  Sem itens.';
  if (res.tipo === 'diverso') {
    return `  • ${res.res?.item ?? '—'}${_recRef(res.res)}`;
  }
  if (res.tipo === 'equip') {
    return res.twoD
      ? `  (Escolha o melhor entre as 2 opções)\n${_recTxtEquip(res.ops[0], 'Opção 1 — ')}\n${_recTxtEquip(res.ops[1], 'Opção 2 — ')}`
      : _recTxtEquip(res.res);
  }
  if (res.tipo === 'pocao') {
    return res.pocoes.map((p) => {
      if (p && p.kind === 'pergaminho') {
        const pr = p.perg || {};
        const preco = pr.precoPergaminho != null ? ` (${pr.precoPergaminho.toLocaleString('pt-BR')} T$)` : '';
        return `  • Pergaminho: ${pr.nome ?? '—'} — ${pr.circulo}º círculo${preco}`;
      }
      const preco = p.item?.preco ? ` (${p.item.preco} T$)` : '';
      return `  • Poção: ${p.item?.item ?? '—'}${preco}${_recRef(p.item)}`;
    }).join('\n');
  }
  if (res.tipo === 'sup') {
    return res.twoD
      ? `  (Escolha o melhor entre as 2 opções)\n${_recTxtSuperior(res.ops[0], 'Opção 1 — ')}\n${_recTxtSuperior(res.ops[1], 'Opção 2 — ')}`
      : _recTxtSuperior(res.res);
  }
  if (res.tipo === 'mag') {
    return res.twoD
      ? `  (Escolha o melhor entre as 2 opções)\n${_recTxtMagico(res.ops[0], 'Opção 1 — ')}\n${_recTxtMagico(res.ops[1], 'Opção 2 — ')}`
      : _recTxtMagico(res.res);
  }
  return '  —';
}

function _recTxtBonusPerg(perg) {
  if (!perg) return '';
  const preco = perg.precoPergaminho != null ? ` (${perg.precoPergaminho.toLocaleString('pt-BR')} T$)` : '';
  return `  • Pergaminho (adicional): ${perg.nome} — ${perg.circulo}º círculo${preco}`;
}

function recompensaEntradaTexto(en) {
  const cat = en.cat || 'padrao';
  const linha = '─'.repeat(46);
  const catTit = (cat !== 'padrao' && CAT_TESOURO[cat]) ? ' · ' + CAT_TESOURO[cat].nome : '';
  const out = [
    linha,
    `  RECOMPENSA · ND ${en.nd}${catTit}   —   ${formatarDataLog(en.quando)}`,
    linha,
    '',
  ];
  if (cat === 'nenhum') {
    out.push('  Esta criatura não fornece tesouro (categoria Nenhum).', '');
    return out.join('\n');
  }
  out.push('💰 DINHEIRO', _recTxtDinheiro(en.resDinheiro));
  if (cat === 'metade') {
    const v = _valorDinheiro(en.resDinheiro);
    if (v && v.valor) out.push(`  ⚖ Metade: fique com ${Math.floor(v.valor / 2).toLocaleString('pt-BR')} ${v.cur}.`);
  }
  if (cat === 'dobro' && en.extra) {
    out.push('  — 2ª rolagem (Dobro):', _recTxtDinheiro(en.extra.resDinheiro));
  }
  out.push('', '🎒 ITEM', _recTxtItens(en.resItens));
  if (en.bonusPergaminho) out.push(_recTxtBonusPerg(en.bonusPergaminho));
  if (cat === 'dobro' && en.extra) {
    out.push('  — 2ª rolagem (Dobro):', _recTxtItens(en.extra.resItens));
    if (en.extra.bonusPergaminho) out.push(_recTxtBonusPerg(en.extra.bonusPergaminho));
  }
  out.push('');
  return out.join('\n');
}

function exportarRecompensas(indices) {
  if (!indices.length) return;
  const cab = [
    '══════════════════════════════════════════════',
    '   GRIFOS ALADOS · RECOMPENSAS · Tormenta20',
    '══════════════════════════════════════════════',
    '',
  ].join('\n');
  const corpo = indices.map(i => recompensaEntradaTexto(recompLog[i])).join('\n');
  baixarTxt(`recompensas_${carimboArquivo()}.txt`, cab + '\n' + corpo);
}

function abrirModalExportarRecompensas() {
  if (!recompLog.length) return;
  const itens = recompLog.map((en, i) => `
    <label class="ga-check">
      <input type="checkbox" data-ga-idx="${i}" checked>
      <span><strong>ND ${en.nd}</strong> · ${formatarDataLog(en.quando)}${i === 0 ? ' · <em>mais recente</em>' : ''}</span>
    </label>`).join('');

  const overlay = GA_abrirModal(`
    <div class="ga-modal-cab">
      <span>⬇ Exportar recompensas</span>
      <button class="ga-modal-x" data-ga-fechar title="Fechar">✕</button>
    </div>
    <p class="ga-modal-dica">Marque as rolagens que deseja enviar aos jogadores. O arquivo traz só o prêmio — sem os exemplos de peso.</p>
    <div class="ga-modal-lista">${itens}</div>
    <div class="ga-modal-acoes">
      <button class="ga-btn-sec" data-ga-todos>Marcar todas</button>
      <button class="ga-btn-sec" data-ga-nenhum>Desmarcar</button>
      <button class="ga-btn-principal" data-ga-baixar>⬇ Baixar .txt</button>
    </div>`);

  overlay.addEventListener('click', e => {
    if (e.target.closest('[data-ga-todos]')) {
      overlay.querySelectorAll('input[data-ga-idx]').forEach(c => c.checked = true);
    } else if (e.target.closest('[data-ga-nenhum]')) {
      overlay.querySelectorAll('input[data-ga-idx]').forEach(c => c.checked = false);
    } else if (e.target.closest('[data-ga-baixar]')) {
      const idx = [...overlay.querySelectorAll('input[data-ga-idx]:checked')].map(c => +c.dataset.gaIdx);
      if (!idx.length) { alert('Selecione ao menos uma rolagem.'); return; }
      exportarRecompensas(idx);
      overlay._fechar();
    }
  });
}

function renderLogRecompensas() {
  const cont = document.getElementById('recompLog');
  if (!cont) return;

  if (recompLog.length === 0) { cont.innerHTML = ''; return; }

  let entradas = '';
  recompLog.forEach((en, i) => {
    entradas += `
      <details class="recomp-log-item">
        <summary>
          <span class="recomp-log-nd">ND ${en.nd}</span>
          ${(en.cat && en.cat !== 'padrao' && CAT_TESOURO[en.cat]) ? `<span class="recomp-log-cat">${CAT_TESOURO[en.cat].nome}</span>` : ''}
          <span class="recomp-log-quando">${formatarDataLog(en.quando)}</span>
          ${i === 0 ? '<span class="recomp-log-ultima">mais recente</span>' : ''}
        </summary>
        <div class="recomp-log-corpo">
          <div class="section-head">💰 Dinheiro</div>
          ${renderDinheiroCat(en)}
          <hr class="divider"/>
          <div class="section-head">🎒 Item</div>
          ${renderItensCat(en)}
        </div>
      </details>`;
  });

  cont.innerHTML = `
    <div class="panel">
      <div class="panel-label recomp-log-label">
        <span>📜 Últimas rolagens (${recompLog.length}/${RECOMP_LOG_MAX}) — clique para abrir</span>
        <span class="recomp-log-acoes">
          <button class="recomp-log-exportar" id="recompLogExportar" title="Exportar rolagens em .txt">⬇ Exportar</button>
          <button class="recomp-log-limpar" id="recompLogLimpar" title="Apagar o histórico de rolagens">✕ Limpar log</button>
        </span>
      </div>
      ${entradas}
    </div>`;

  const bex = document.getElementById('recompLogExportar');
  if (bex) bex.onclick = abrirModalExportarRecompensas;

  const btn = document.getElementById('recompLogLimpar');
  if (btn) btn.onclick = () => {
    if (!confirm('Apagar as últimas rolagens salvas?')) return;
    recompLog = [];
    salvarLogRecompensas();
    renderLogRecompensas();
  };
}

/* ═══════════════════════════════════════════════════════
   6b. CATEGORIA DE TESOURO DA CRIATURA
   (introdução da planilha "T20 - Tabela de geração de tesouros"):
     Nenhum  → não usa a tabela (sem tesouro).
     Padrão  → tabela sem modificação.
     Metade  → divide pela metade os resultados da coluna Dinheiro.
     Dobro   → rola duas vezes em CADA coluna (Dinheiro e Itens).
   ═══════════════════════════════════════════════════════ */
const CAT_TESOURO = {
  padrao: { nome: 'Padrão' },
  metade: { nome: 'Metade' },
  dobro:  { nome: 'Dobro'  },
  nenhum: { nome: 'Nenhum' },
};
let catTesouro = 'padrao';

function selecionarCategoria(cat) {
  if (!CAT_TESOURO[cat]) return;
  catTesouro = cat;
  document.querySelectorAll('.cat-btn').forEach(b =>
    b.classList.toggle('active', b.dataset.cat === cat));
}

// Uma categoria de item está "bloqueada" se, no modo Customizável, o filtro
// dela estiver desligado. Mágico nunca é bloqueado; Poção só é bloqueada
// quando NÃO há pergaminhos substituindo-a (senão o slot vira pergaminho).
function _categoriaBloqueada(r) {
  if (!r || MODO_RECOMP !== 'customizavel') return false;
  const F = CUSTOM_FILTROS;
  switch (r.t) {
    case 'diverso': return !F.catDiverso;
    case 'equip':   return !F.catEquipMundano;
    case 'sup':     return !F.catSuperior;
    case 'pocao':   return !F.catPocao && !(F.pergaminhos && F.pergaminhoModo === 'substituir');
    default:        return false;   // 'mag'
  }
}

// Rola UMA vez cada coluna (dinheiro + item) da tabela do ND.
function _rolarColuna(tabela) {
  const dpD = rolarPercent();
  const resD = resolverDinheiro(lookupTable(tabela.m, dpD));
  let dpI = rolarPercent();
  let r = lookupTable(tabela.i, dpI);
  // Customizável: relança o item enquanto a categoria sorteada estiver excluída.
  if (MODO_RECOMP === 'customizavel') {
    let t = 0;
    while (_categoriaBloqueada(r) && t < 40) { dpI = rolarPercent(); r = lookupTable(tabela.i, dpI); t++; }
  }
  const resI = resolverItem(r, MODO_RECOMP);
  // "Pergaminhos como adicional": um pergaminho de bônus, sem alterar o item rolado.
  let bonusPergaminho = null;
  if (MODO_RECOMP === 'customizavel' && CUSTOM_FILTROS.pergaminhos
      && CUSTOM_FILTROS.pergaminhoModo === 'adicional') {
    bonusPergaminho = gerarPergaminho();
  }
  return { dpD, resD, dpI, resI, bonusPergaminho };
}

// Valor total em dinheiro de um resultado (para a regra "Metade").
function _valorDinheiro(res) {
  if (!res) return null;
  if (res.tipo === 'moeda')   return { valor: res.valor, cur: res.cur };
  if (res.tipo === 'riqueza') return { valor: res.totalGeral, cur: 'T$' };
  return null;
}
function _seloCat(cat) {
  if (cat === 'padrao' || !CAT_TESOURO[cat]) return '';
  return `<div class="cat-selo cat-selo--${cat}">Categoria: ${CAT_TESOURO[cat].nome}${cat === 'dobro' ? ' — 2 rolagens' : ''}</div>`;
}
function _notaMetade(res) {
  const v = _valorDinheiro(res);
  if (!v || !v.valor) return '';
  const meio = Math.floor(v.valor / 2);
  return `<div class="cat-nota">⚖ <strong>Metade</strong>: o grupo fica com metade do dinheiro — <strong>${meio.toLocaleString('pt-BR')} ${v.cur}</strong>.</div>`;
}
function _cardSemTesouro() {
  return `<div class="result-card none"><div class="rc-title">— Sem tesouro (categoria Nenhum)</div></div>`;
}
// Renderiza a coluna DINHEIRO conforme a categoria da entrada (en.cat / en.extra).
function renderDinheiroCat(en) {
  const cat = en.cat || 'padrao';
  if (cat === 'nenhum') return _cardSemTesouro();
  let html = _seloCat(cat) + renderDinheiro(en.dpDinheiro, en.resDinheiro);
  if (cat === 'metade') html += _notaMetade(en.resDinheiro);
  if (cat === 'dobro' && en.extra) html += renderDinheiro(en.extra.dpDinheiro, en.extra.resDinheiro);
  return html;
}
// Renderiza a coluna ITENS conforme a categoria (Metade não afeta itens).
// Card do pergaminho de bônus (modo "Pergaminhos como adicional").
function renderBonusPergaminho(perg) {
  if (!perg) return '';
  return `<div class="result-card magico">
    <div class="rc-title">📜 Pergaminho ${tag('adicional','blue')}</div>
    <div class="rc-body"><div class="sub-row">${blockPergaminho(perg, 0, 1)}</div></div>
  </div>`;
}

function renderItensCat(en) {
  const cat = en.cat || 'padrao';
  if (cat === 'nenhum') return _cardSemTesouro();
  let html = (cat === 'dobro' ? _seloCat(cat) : '') + renderItens(en.dpItens, en.resItens);
  if (en.bonusPergaminho) html += renderBonusPergaminho(en.bonusPergaminho);
  if (cat === 'dobro' && en.extra) {
    html += renderItens(en.extra.dpItens, en.extra.resItens);
    if (en.extra.bonusPergaminho) html += renderBonusPergaminho(en.extra.bonusPergaminho);
  }
  return html;
}

function selecionarND(nd) {
  ndAtivo = nd;
  document.querySelectorAll('.nd-btn').forEach(b =>
    b.classList.toggle('active', b.dataset.nd === nd)
  );
  document.getElementById('rollBtn').disabled = false;
}

function rolarRecompensas() {
  const tabela = ND_TABLE[ndAtivo];
  if (!tabela) return;

  const btn = document.getElementById('rollBtn');
  btn.disabled = true;
  btn.textContent = '🎲  Rolando…';
  btn.classList.add('shake');
  btn.addEventListener('animationend', () => btn.classList.remove('shake'), {once:true});

  setTimeout(() => {
    // Monta a entrada conforme a categoria de tesouro da criatura.
    const cat = catTesouro;
    const en = { nd: ndAtivo, quando: Date.now(), cat: cat };
    if (cat === 'nenhum') {
      en.dpDinheiro = 0; en.resDinheiro = { tipo: 'nada' };
      en.dpItens = 0;    en.resItens = { tipo: 'nada' };
    } else {
      const a = _rolarColuna(tabela);
      en.dpDinheiro = a.dpD; en.resDinheiro = a.resD;
      en.dpItens = a.dpI;    en.resItens = a.resI;
      if (a.bonusPergaminho) en.bonusPergaminho = a.bonusPergaminho;
      if (cat === 'dobro') {                      // Dobro: 2ª rolagem em cada coluna
        const b = _rolarColuna(tabela);
        en.extra = { dpDinheiro: b.dpD, resDinheiro: b.resD, dpItens: b.dpI, resItens: b.resI,
                     bonusPergaminho: b.bonusPergaminho || null };
      }
    }

    // Injetar resultados
    document.getElementById('resultNdLabel').textContent = ndAtivo;
    document.getElementById('moneyOut').innerHTML = renderDinheiroCat(en);
    document.getElementById('itemsOut').innerHTML = renderItensCat(en);

    // registra no histórico persistente (últimas 5 rolagens)
    registrarLogRecompensa(en);

    const area = document.getElementById('resultsArea');
    area.classList.add('visible');
    area.scrollIntoView({behavior:'smooth', block:'nearest'});

    btn.disabled = false;
    btn.textContent = '🎲  Rolar Novamente';
  }, 350);
}

/* ═══════════════════════════════════════════════════════
   7. INIT — Lazy (roda apenas quando a aba é clicada)
   ═══════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════
   6d. CALCULADORA DE ND DE ENCONTRO (vários inimigos)
   Regra "Recompensas por vários inimigos" (Ameaças de Arton):
   calcule XP e tesouro pelo ND TOTAL do encontro. O ND total sai de
   somar o "valor" 2^(ND/2) de cada criatura e converter de volta —
   equivale à regra clássica "dobrar inimigos de mesmo ND = +2 ND" e
   reproduz o exemplo oficial (2× ND 8 → ND 10, 10.000 XP).
   ═══════════════════════════════════════════════════════ */
let encGrupo = [];

function ndParaNumero(nd) {
  if (nd === '1/4') return 0.25;
  if (nd === '1/2') return 0.5;
  const n = parseFloat(nd);
  return isNaN(n) ? 0 : n;
}
function numeroParaNDProximo(x) {
  let melhor = NDS[0], dist = Infinity;
  NDS.forEach(nd => {
    const d = Math.abs(ndParaNumero(nd) - x);
    if (d < dist) { dist = d; melhor = nd; }
  });
  return melhor;
}
function calcEncontro() {
  if (!encGrupo.length) return null;
  const soma = encGrupo.reduce((s, nd) => s + Math.pow(2, ndParaNumero(nd) / 2), 0);
  const ndStr = numeroParaNDProximo(2 * Math.log2(soma));
  return { ndStr: ndStr, xp: Math.round(ndParaNumero(ndStr) * 1000) };
}
function encRender() {
  const lista = document.getElementById('encLista');
  const res   = document.getElementById('encResultado');
  if (!lista || !res) return;
  if (!encGrupo.length) {
    lista.innerHTML = '<span class="enc-vazio">Nenhuma criatura adicionada ainda.</span>';
    res.hidden = true;
    return;
  }
  lista.innerHTML = encGrupo.map((nd, i) =>
    `<span class="enc-chip">ND ${nd}<button type="button" class="enc-chip-x" data-enc-rem="${i}" title="Remover">✕</button></span>`
  ).join('');
  const c = calcEncontro();
  document.getElementById('encResNd').textContent = 'ND ' + c.ndStr;
  document.getElementById('encResXp').textContent = c.xp.toLocaleString('pt-BR') + ' XP';
  res.hidden = false;
}
function encAdd(nd)    { if (nd) { encGrupo.push(nd); encRender(); } }
function encRemover(i) { encGrupo.splice(i, 1); encRender(); }
function encLimpar()   { encGrupo = []; encRender(); }
function encUsar() {
  const c = calcEncontro();
  if (!c) return;
  selecionarND(c.ndStr);
  const grid = document.getElementById('ndGrid');
  if (grid) grid.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/* ═══════════════════════════════════════════════════════
   6d. CATÁLOGO DE TESOUROS (consulta read-only)
   Lista tudo que pode ser sorteado, por categoria, a partir das
   MESMAS tabelas que o gerador usa (auditadas contra o .xlsx).
   Não filtra nada — é só para conferência. Reage ao modo ativo:
   no Customizável, os blocos cujo filtro está desligado ficam esmaecidos
   (ver atualizarCatalogoFiltros / CSS .cat-sec--off).
   ═══════════════════════════════════════════════════════ */
function catEsc(s) {
  return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function catSecaoHTML(titulo, icone, rows, opts) {
  opts = opts || {};
  rows = rows || [];
  // filtroKey liga o bloco a um filtro do modo Customizável (esmaece se desligado).
  const filtroAttr  = opts.filtroKey ? ` data-filtro-sec="${opts.filtroKey}"` : '';
  const padraoCls   = opts.filtroKey ? ' cat-sec--filtravel' : '';
  const padraoBadge = opts.filtroKey
    ? '<span class="cat-badge-padrao" title="Item nomeado — controlado pelos filtros do modo Customizável">filtrável</span>'
    : '';
  const lis = rows.map(r => {
    const ref   = r.livro ? `<span class="cat-ref">${catEsc(r.livro)}${r.pag ? ' p.' + r.pag : ''}</span>` : '';
    const preco = r.preco ? `<span class="cat-preco">T$ ${catEsc(r.preco)}</span>` : '';
    const obs   = r.obs   ? `<span class="cat-obs">${catEsc(r.obs)}</span>` : '';
    return `<li class="cat-item"><span class="cat-item-nome">${catEsc(r.item)}</span>${preco}${ref}${obs}</li>`;
  }).join('');
  return `<details class="cat-sec${padraoCls}"${filtroAttr}>
    <summary class="cat-sec-cab">
      <span class="cat-sec-icone">${icone}</span>
      <span class="cat-sec-titulo">${catEsc(titulo)}</span>
      <span class="cat-sec-cont">${rows.length}</span>
      ${padraoBadge}
    </summary>
    <ul class="cat-lista">${lis}</ul>
  </details>`;
}

function renderCatalogo() {
  const cont = document.getElementById('catalogoTesouros');
  if (!cont || cont.dataset.pronto === '1') return;   // monta uma única vez
  // riquezas não têm "item": mostra a expressão de valor + o valor aproximado
  const riquezas = RIQUEZA_ROWS.map(r => ({
    item: `${r.dice} × ${r.mult.toLocaleString('pt-BR')}`, obs: r.vAprox,
  }));
  cont.innerHTML = [
    catSecaoHTML('Riquezas — faixas de valor', '💰', riquezas),
    catSecaoHTML('Itens Diversos', '🎒', ITEM_DIVERSO_TABLE),
    catSecaoHTML('Equipamentos — Armas', '⚔', EQUIP_ARMA),
    catSecaoHTML('Equipamentos — Armaduras & Escudos', '🛡', EQUIP_ARMADURA),
    catSecaoHTML('Equipamentos — Esotéricos', '🔮', EQUIP_ESOTER),
    catSecaoHTML('Poções', '🧪', POCAO_TABLE),
    catSecaoHTML('Superiores — Melhorias de Arma', '✦', MELHORIA_ARMA),
    catSecaoHTML('Superiores — Melhorias de Armadura', '✦', MELHORIA_ARMADURA),
    catSecaoHTML('Superiores — Melhorias de Esotérico', '✦', MELHORIA_ESOTER),
    catSecaoHTML('Encantos Mágicos — Arma', '🪄', MAGICO_ARMA),
    catSecaoHTML('Encantos Mágicos — Armadura & Escudo', '🪄', MAGICO_ARMADURA),
    catSecaoHTML('Encantos Mágicos — Esotérico', '🪄', MAGICO_ESOTER),
    catSecaoHTML('Itens Mágicos Específicos — Arma', '🌟', ESPEC_ARMA, { filtroKey: 'especArma' }),
    catSecaoHTML('Itens Mágicos Específicos — Armadura & Escudo', '🌟', ESPEC_ARMADURA, { filtroKey: 'especArmadura' }),
    catSecaoHTML('Itens Mágicos Específicos — Esotérico', '🌟', ESPEC_ESOTER, { filtroKey: 'especEsoter' }),
    catSecaoHTML('Acessórios Mágicos — Menor', '💍', ACESSORIO_MENOR, { filtroKey: 'acessorios' }),
    catSecaoHTML('Acessórios Mágicos — Médio', '💍', ACESSORIO_MEDIO, { filtroKey: 'acessorios' }),
    catSecaoHTML('Acessórios Mágicos — Maior', '💍', ACESSORIO_MAIOR, { filtroKey: 'acessorios' }),
  ].join('');
  cont.dataset.pronto = '1';
}

function _initRecompensas() {
  const grid = document.getElementById('ndGrid');
  if (!grid || grid.children.length > 0) return; // já inicializado
  document.getElementById('rollBtn').disabled = true;
  NDS.forEach(nd => {
    const b = document.createElement('button');
    b.className = 'nd-btn';
    b.dataset.nd = nd;
    b.textContent = 'ND ' + nd;
    b.onclick = () => selecionarND(nd);
    grid.appendChild(b);
  });

  // Botões do conjunto de regras (Padrão × Customizável)
  const bc = document.getElementById('modoCustom');
  const bd = document.getElementById('modoPadrao');
  if (bc) bc.onclick = () => selecionarModoRecomp('customizavel');
  if (bd) bd.onclick = () => selecionarModoRecomp('padrao');

  // Caixas de filtro do modo Customizável
  const painel = document.getElementById('customFiltros');
  if (painel) painel.addEventListener('change', e => {
    const chk = e.target.closest('input[data-filtro]');
    if (chk) {
      alternarFiltroCustom(chk.dataset.filtro, chk.checked);
      if (chk.dataset.filtro === 'pergaminhos') atualizarModoUI();  // mostra/esconde o modo
      return;
    }
    const radio = e.target.closest('input[data-perg-modo]');
    if (radio && radio.checked) {
      CUSTOM_FILTROS.pergaminhoModo = radio.dataset.pergModo;
      salvarModoRecomp();
    }
  });

  // categoria de tesouro da criatura (Padrão / Metade / Dobro / Nenhum)
  const catGrid = document.getElementById('catGrid');
  if (catGrid && !catGrid.children.length) {
    [
      { id: 'padrao', txt: 'Padrão', dica: 'Tesouro típico — use a tabela sem modificação.' },
      { id: 'metade', txt: 'Metade', dica: 'Criatura com poucos tesouros — divida pela metade o resultado da coluna Dinheiro.' },
      { id: 'dobro',  txt: 'Dobro',  dica: 'Criatura com muitos tesouros — role duas vezes em cada coluna.' },
      { id: 'nenhum', txt: 'Nenhum', dica: 'A criatura não traz tesouro.' },
    ].forEach(c => {
      const b = document.createElement('button');
      b.className = 'cat-btn' + (c.id === 'padrao' ? ' active' : '');
      b.dataset.cat = c.id;
      b.textContent = c.txt;
      b.title = c.dica;
      b.onclick = () => selecionarCategoria(c.id);
      catGrid.appendChild(b);
    });
  }

  // calculadora de ND de encontro (vários inimigos)
  const encSel = document.getElementById('encNdSel');
  if (encSel && !encSel.children.length) {
    NDS.forEach(nd => {
      const o = document.createElement('option');
      o.value = nd; o.textContent = 'ND ' + nd;
      encSel.appendChild(o);
    });
    encSel.value = '1';
  }
  const encAddBtn = document.getElementById('encAddBtn');
  if (encAddBtn) encAddBtn.onclick = () => encAdd(document.getElementById('encNdSel').value);
  const encClearBtn = document.getElementById('encClearBtn');
  if (encClearBtn) encClearBtn.onclick = encLimpar;
  const encUsarBtn = document.getElementById('encUsarBtn');
  if (encUsarBtn) encUsarBtn.onclick = encUsar;
  const encListaEl = document.getElementById('encLista');
  if (encListaEl) encListaEl.addEventListener('click', e => {
    const x = e.target.closest('[data-enc-rem]');
    if (x) encRemover(+x.dataset.encRem);
  });
  encRender();

  renderCatalogo();
  atualizarModoUI();
}

document.addEventListener('DOMContentLoaded', () => {
  const secao = document.getElementById('recompensas');
  if (!secao) return;

  carregarModoRecomp();
  carregarLogRecompensas();
  renderLogRecompensas();

  if (secao.classList.contains('active')) _initRecompensas();

  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.dataset.section === 'recompensas') {
      link.addEventListener('click', _initRecompensas);
    }
  });
});