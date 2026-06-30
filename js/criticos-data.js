// ═══════════════════════════════════════════════════════════════════
//  CRITICOS-DATA.JS — Efeitos Críticos (Tab. 4-3/4-4) e Falhas Críticas
//  (Tab. 4-6) de Tormenta20. Regras opcionais. Consumido por monstros.js
//  para o rolador "🎲 Críticos" da ficha de criatura.
//
//  Cada efeito tem { txt, cond } — cond é a CHAVE de uma condição do
//  bestiário (CONDICOES em monstros.js), uma lista de chaves, ou ausente
//  quando o efeito não corresponde a uma condição padrão (ex.: Vagaroso,
//  Maneta, Caolho, "derruba o que segura", Morto — o mestre resolve).
// ═══════════════════════════════════════════════════════════════════
window.GA_CRITICOS = (function () {
  'use strict';

  // Tabela 4-3: Localização (1d10). Inclui o lado, por sabor.
  const LOCAL = [
    { min: 1,  max: 1,  key: 'perna',  rot: 'Perna direita' },
    { min: 2,  max: 2,  key: 'perna',  rot: 'Perna esquerda' },
    { min: 3,  max: 7,  key: 'tronco', rot: 'Tronco' },
    { min: 8,  max: 8,  key: 'braco',  rot: 'Braço direito' },
    { min: 9,  max: 9,  key: 'braco',  rot: 'Braço esquerdo' },
    { min: 10, max: 10, key: 'cabeca', rot: 'Cabeça' },
  ];
  // Opções de localização no seletor (quando se usa Ataques Mirados).
  const LOCAL_OPCOES = [
    { key: '',       rot: 'Aleatória (1d10)' },
    { key: 'perna',  rot: 'Perna' },
    { key: 'tronco', rot: 'Tronco' },
    { key: 'braco',  rot: 'Braço' },
    { key: 'cabeca', rot: 'Cabeça' },
  ];
  const LOCAL_ROT = { perna: 'Perna', tronco: 'Tronco', braco: 'Braço', cabeca: 'Cabeça' };

  // Modificador de severidade pelo multiplicador do crítico.
  const SEV_MOD = { x2: 0, x3: 2, x4: 3, x5: 4 };
  const MULT_OPCOES = [
    { key: 'x2', rot: '×2 (+0)' },
    { key: 'x3', rot: '×3 (+2)' },
    { key: 'x4', rot: '×4 (+3)' },
    { key: 'x5', rot: '×5+ (+4)' },
  ];

  const TIPO_OPCOES = [
    { key: 'corte',      rot: 'Corte' },
    { key: 'impacto',    rot: 'Impacto' },
    { key: 'perfuracao', rot: 'Perfuração' },
    { key: 'energia',    rot: 'Energia' },
  ];

  // Severidade (1d10 + mod) → índice da linha (faixas: 1-3, 4-6, 7-8, 9-10, 11-12, 13+).
  function faixaSeveridade(sev) {
    if (sev <= 3)  return 0;
    if (sev <= 6)  return 1;
    if (sev <= 8)  return 2;
    if (sev <= 10) return 3;
    if (sev <= 12) return 4;
    return 5;
  }
  const SEV_ROTULOS = ['1 a 3', '4 a 6', '7 a 8', '9 a 10', '11 a 12', '13+'];

  // Tabela 4-4: Acertos Críticos. [tipo][localização] → 6 efeitos (por faixa).
  const c = (txt, cond) => (cond === undefined ? { txt } : { txt, cond });
  const TABELA = {
    corte: {
      perna:  [c('Sangrando','sangrando'), c('Caído','caido'), c('Lento','lento'), c('Vagaroso (leve)'), c('Vagaroso (grave)'), c('Vagaroso (permanente); perna decepada')],
      tronco: [c('Sangrando','sangrando'), c('Sangrando','sangrando'), c('Vulnerável','vulneravel'), c('Fraco','fraco'), c('Debilitado','debilitado'), c('Morto; bucho aberto')],
      braco:  [c('Sangrando','sangrando'), c('Derruba o que está segurando'), c('Vulnerável','vulneravel'), c('Maneta (leve)'), c('Maneta (grave)'), c('Maneta (permanente); braço decepado')],
      cabeca: [c('Sangrando','sangrando'), c('Cego (1d4 rodadas)','cego'), c('Atordoado por 1 rodada (dor intensa)','atordoado'), c('Caolho (leve)'), c('Caolho (grave)'), c('Morto; decapitado. Belo golpe!')],
    },
    impacto: {
      perna:  [c('Caído','caido'), c('Perde a próxima ação de movimento'), c('Enredado','enredado'), c('Vagaroso (leve)'), c('Vagaroso (grave)'), c('Vagaroso (permanente); joelho estilhaçado')],
      tronco: [c('Vulnerável','vulneravel'), c('Indefeso por 1 rodada','indefeso'), c('Fraco','fraco'), c('Enjoado','enjoado'), c('Debilitado','debilitado'), c('Morto; esterno afundado')],
      braco:  [c('Derruba o que está segurando'), c('Perde a próxima ação de movimento'), c('Vulnerável','vulneravel'), c('Maneta (leve)'), c('Maneta (grave)'), c('Maneta (permanente); ombro ou cotovelo estilhaçado')],
      cabeca: [c('Vulnerável','vulneravel'), c('Alquebrado','alquebrado'), c('Atordoado por 1 rodada (tontura)','atordoado'), c('Role 1 dado: par = Cego (leve), ímpar = Surdo (leve)'), c('Role 1 dado: par = Cego (permanente), ímpar = Surdo (permanente)'), c('Morto; crânio esmigalhado. Caixão fechado...')],
    },
    perfuracao: {
      perna:  [c('Sangrando','sangrando'), c('Sangrando','sangrando'), c('Cai no chão','caido'), c('Vagaroso (leve)'), c('Vagaroso (grave)'), c('Vagaroso (permanente); músculos trespassados')],
      tronco: [c('Sangrando','sangrando'), c('Vulnerável','vulneravel'), c('Fraco','fraco'), c('Sangrando','sangrando'), c('Debilitado e indefeso por 1 rodada',['debilitado','indefeso']), c('Morto; coração perfurado')],
      braco:  [c('Sangrando','sangrando'), c('Derruba o que está segurando'), c('Vulnerável','vulneravel'), c('Sangrando','sangrando'), c('Maneta (grave)'), c('Maneta (permanente); tendões trespassados')],
      cabeca: [c('Sangrando','sangrando'), c('Abalado por 1 rodada e sangrando',['abalado','sangrando']), c('Frustrado','frustrado'), c('Cego (grave)','cego'), c('Cego (permanente)','cego'), c('Morto; tiro na cabeça. Na mosca!')],
    },
    energia: {
      perna:  [c('Cai no chão','caido'), c('Vulnerável','vulneravel'), c('Desprevenido por 1 rodada','desprevenido'), c('Vagaroso (leve); pé queimado'), c('Vagaroso (grave); perna queimada'), c('Vagaroso (permanente); perna incinerada')],
      tronco: [c('Sobrecarregado por 1d6 rodadas','sobrecarregado'), c('Vulnerável','vulneravel'), c('Engolfado por energia (como Em Chamas, mas dano do tipo do ataque)','emChamas'), c('Um item vestido aleatório é destruído'), c('Enjoado','enjoado'), c('Morto; transformado em cinzas')],
      braco:  [c('Derruba o que está segurando'), c('Vulnerabilidade ao tipo de dano por 1 rodada'), c('Não pode usar o braço por 1 rodada'), c('Maneta (leve); mão queimada'), c('Maneta (grave); braço queimado'), c('Maneta (permanente); braço incinerado')],
      cabeca: [c('Ofuscado','ofuscado'), c('Alquebrado','alquebrado'), c('Cego','cego'), c('Pasmo por 1 rodada','pasmo'), c('Confuso','confuso'), c('Morto; cabeça vaporizada. Um leve exagero...')],
    },
  };

  // Tabela 4-6: Falhas Críticas (1d100). Índice 0 = resultado 1.
  const FALHAS = [
    'Atividade cerebral extraplanar: fica atordoado por 1d6 rodadas; depois, +1 em Inteligência, Sabedoria ou Carisma (aleatório; uma vez por personagem).',
    'A alça do seu escudo se desprende. Ação de movimento para soltá-lo (sem penalidade) ou lute assim com –2 em ataques. Consertar leva 1 minuto.',
    'Fora de forma (semana na taverna): fica exausto até o fim do combate.',
    'Onda de azar e incompetência: role DUAS vezes nesta tabela.',
    'Num movimento louco, você embainha sua arma sem querer.',
    'Você tropeça e cai de cara no chão. Fica caído e sofre –2 em testes de Carisma por um dia (rosto amassado).',
    'Cheiro ruim. Quem foi? Você perde 1d4 PM e fica fraco por 1d4 rodadas.',
    'Ataque de riso! Por 1d4 rodadas você fica lento e sofre –2 em ataques.',
    'Cãibra na perna: fica lento e sofre –5 em Atletismo até o fim da cena.',
    'Uma velha ferida se abre. Perde 5 PV e fica abalado por 1d4 rodadas.',
    'Casca de banana: cai de costas no chão e perde 1d6 PV.',
    'Você pisa num inseto nojento. Perca 1 rodada limpando a bota ou sofra –1 em ataques e resistência até fazê-lo.',
    'Presságio de morte... A sua! O próximo ataque que sofrer será um acerto crítico, ou a próxima habilidade que lhe causar dano causará o dobro.',
    'Energia negativa: um inimigo já derrotado se ergue como zumbi (mesmas estatísticas, morto-vivo, Fraqueza Zumbi — Defesa +10).',
    'Uma área de Tormenta surge sob seus pés! Perde 2d12 PV (Ref CD 25 reduz à metade), mas recebe um poder da Tormenta (escolha do mestre) até o fim da cena.',
    'Você sente uma fisgada e fica vulnerável por 1d4 rodadas.',
    'Fenômeno mágico! Todos no combate ficam pasmos por 1 rodada; após a pausa, todos rolam Iniciativa novamente.',
    'Cãibra no pescoço: –5 em Percepção e Reflexos por 1d4 rodadas.',
    'Um relâmpago atinge seu braço erguido: 6d8 pontos de dano de eletricidade.',
    'Descoordenação! Você derruba um item empunhado aleatório.',
    'Você abre sua guarda! Um oponente adjacente (à escolha do mestre) faz um ataque imediato contra você.',
    'Fome repentina: 2 rodadas para comer uma ração de viagem ou fica fatigado.',
    'Visão profana: vê uma aparição de um deus inimigo da sua divindade. Fica desprevenido nesta rodada; na próxima, –5 em todos os testes.',
    'Sua arma se desgasta com o golpe e é destruída, a menos que seja mágica.',
    'Na próxima rodada, você deve usar seu melhor ataque contra o oponente mais fraco.',
    'Na próxima rodada, faça um teste de Intimidação para assustar um oponente, ou perde sua rodada.',
    'Tomado por medo ou indecisão, você trava! Na próxima rodada, fica pasmo.',
    'Ato anti-heroico (acovardar-se, usar um inocente como escudo, lutar sujo). Você perde 1d4+1 PM.',
    'Sua pistola explode na mão: 3d6 pontos de dano de fogo e a arma é destruída.',
    'Sequência de desastres: até o fim da cena, seu próximo acerto crítico vira uma falha crítica.',
    'Escorregão! Se estiver à beira de um precipício, faça Reflexos (CD 20) ou cai em queda livre.',
    'Cansado de ser "fracolino das magias": nas próximas 2 rodadas, você não pode lançar magias.',
    'Seu ataque rebate em você mesmo: sofra metade do dano que causaria se tivesse acertado.',
    'Um rato enorme morde sua perna; após 1 dia, você é infectado com varíola.',
    'Calafrio: um espírito o deixa nervoso. Você fica apavorado por 1 rodada.',
    'Dor de cabeça súbita: fica alquebrado até o fim da cena.',
    'Má decisão: o mestre escolhe o alvo do seu próximo ataque (não pode ser um aliado).',
    'Enjoo súbito! Você fica enjoado por 1d4 rodadas.',
    'Algo do outro lado do campo chama sua atenção: na próxima rodada, gaste uma ação completa para se mover até lá.',
    'Você faz uma bobagem: seus oponentes ficam motivados, +2 nos ataques contra você até o fim da cena.',
    'Um item que você carrega se quebra. Se for poção ou alquímico, você sofre o efeito dele.',
    'Maldição itinerante: –5 em todos os testes por 2 rodadas; depois passa ao aliado mais próximo, e assim por diante (não afeta a mesma pessoa duas vezes no dia).',
    'Seu elmo gira e tapa sua visão: fica cego até gastar uma ação padrão para ajustá-lo.',
    'Um cisco entra no seu olho: fica cego por 1d4 rodadas.',
    'Um vento frio sopra em suas costas... Você fica abalado por 1d4 rodadas.',
    'Técnica de defesa "inovadora" (e ineficaz): você fica vulnerável por 1d4 rodadas.',
    'Você nota que está fora de forma: fica fatigado até o fim da cena.',
    'Você tropeça e se desequilibra: fica caído e vulnerável até se levantar.',
    'Sua aljava ou cartucheira cai e a munição se espalha. Recarregar exige uma ação de movimento para recolher; recolher tudo de uma vez é ação completa.',
    'Uma aranha pica sua perna; após 1 dia, você contrai a doença tremores.',
    'Seu cinto se abre e as calças caem! Fica lento e vulnerável até gastar uma ação padrão para se vestir.',
    'Combate tedioso: fica desprevenido por 1d4 rodadas, mas pode fazer Percepção (CD 20) como ação livre por uma informação do mestre.',
    'Sorvedouro de magia: você perde 1d10 PM.',
    'Derrame: faça Sabedoria (CD 10). Passando, fica alquebrado; falhando, você morre.',
    'Um trovão ressoa perto demais: fica abalado por 1 rodada e surdo por 1d4 rodadas.',
    'Sonhando acordado: –10 na ordem de Iniciativa pelo resto do combate.',
    'Raiva aleatória: entra em fúria como um bárbaro de 1º nível (se já estiver em fúria, ela acaba).',
    'Golpe nos olhos: se sofrer um acerto crítico neste combate, fica cego até receber ao menos 20 pontos de cura mágica.',
    'Energia positiva, mas só do lado dos inimigos: todos os adversários recuperam 2d8+2 PV por patamar do grupo.',
    'Pontada no peito: –5 em Fortitude até o fim da cena.',
    'Uma mão esquelética surge do chão e puxa seu pé: fica agarrado até se soltar (ação padrão + Luta CD 20).',
    'Seu sangue esquenta: –2 em testes até acertar um ataque corpo a corpo em um inimigo.',
    'Ferimentos antigos incomodam: seus PV máximos são reduzidos pelo seu nível até o fim do dia.',
    'Hã? Borboletas capturam sua atenção. Faça Sabedoria (CD 10) ou fica fascinado até o fim do próximo turno.',
    'O sol, uma magia ou tocha atrapalha sua visão: –5 em Reflexos até o fim da cena.',
    'Você bate o mindinho em algo! Não pode fazer ataques desarmados na próxima rodada e sofre –2 em testes de Destreza até o fim da cena.',
    'Você engasga com poeira e fica fatigado até o fim do seu próximo turno.',
    'Raiva da batalha: fica frustrado e, até o fim do seu próximo turno, não pode usar habilidades.',
    'Ataque cardíaco: braço esquerdo inutilizado por 1d6 rodadas. Faça Constituição (CD 10): passando, fica fatigado; falhando, morre.',
    'Compulsão autopreservativa: fica indefeso até usar um item ou habilidade que recupere seus PV ou PM.',
    'Esse último golpe foi mais forte do que parecia! Você sofre de novo o dano do último ataque/habilidade que o atingiu, como dano não letal.',
    'Um inseto entra na sua orelha: ação de movimento para removê-lo ou –2 em testes até ele sair (2d4 rodadas).',
    'Você termina o golpe com uma pose teatral de baixa qualidade combativa: fica desprevenido até o fim da próxima rodada.',
    'Sua granada/preparado cai perto do alvo sem explodir. O alvo faz Reflexos (CD 15) como reação: passando, chuta o item de volta e você vira o novo alvo!',
    'Sua bolsa de moedas voa longe e espalha todos os seus tibares pelo chão.',
    'Ops! Faça um ataque imediato contra um aliado em seu alcance (ele está desprevenido contra esse ataque).',
    'Energia dissipada: se usou seu ataque com uma habilidade que custe PM, gaste o dobro de PM.',
    'Sua roupa rasga ou uma fivela da armadura se abre: perca um item vestido aleatório (1 hora para remendar após o combate).',
    'Um preparado que você carrega explode na sua mão. Sofra o efeito do item (sem teste de resistência).',
    'Palavra amiga! Gaste sua próxima ação padrão num teste de Diplomacia (CD 30): passando, um inimigo não vê motivos para atacá-lo.',
    'Uma de suas poções ou itens alquímicos (à escolha do mestre) se quebra. Sofra o efeito do item.',
    'Fogo amigo: você acerta um aliado que luta em corpo a corpo com o alvo original do seu ataque.',
    'Uma cobra morde seu pé: você perde 1d12 PV por veneno.',
    'Bobagem suprema: você torce o tornozelo. Faça Destreza (CD 10): passando, fica lento; falhando, quebra o pescoço e morre.',
    'Tiro no pé — literalmente! Causa em si mesmo o dano de um ataque à distância e fica lento por 1d4 rodadas.',
    'Você chuta uma pedra: fica lento até o fim da cena.',
    'Seu movimento foi forte demais e a arma voa longe: cai a 9m de você, em direção aleatória.',
    'Pessimismo súbito: mesmo com o combate indo bem, você se sente derrotado e fica alquebrado até o fim da cena.',
    'Tontura súbita: fica enjoado e vulnerável por 1d4 rodadas.',
    'Sua mochila se abre e espalha todos os seus itens no chão.',
    'Você puxa demais a corda do arco/besta: ela se rompe e atinge seu braço (1d6 de dano de corte) e a arma é destruída.',
    'A tocha ou lampião que você carrega subitamente se apaga.',
    'Cãibra no braço esquerdo: você deixa cair o que segura e não pode usar o braço por 1d4 rodadas.',
    'Você baixa a guarda: –5 na Defesa por 1 rodada.',
    'Tentando atingir mais longe do que deveria, você distende o braço: –5 no próximo teste de ataque.',
    'Cãibra no braço direito: você deixa cair o que segura e não pode usar o braço por 1d4 rodadas.',
    'Um meteoro cai em você! 6d6 de impacto e 6d6 de fogo (Ref CD 25 reduz à metade).',
    'Você tropeça na própria capa, calça ou saia: cai no chão e sofre 1d6 pontos de dano de impacto.',
    'Zupt! A lâmina/cabeça da sua arma se solta e voa para longe. A arma é destruída.',
    'Visão divina: vê uma aparição do seu deus. Fica indefeso nesta rodada, mas recebe +5 em testes até o fim da cena.',
  ];

  return {
    LOCAL, LOCAL_OPCOES, LOCAL_ROT, SEV_MOD, MULT_OPCOES, TIPO_OPCOES,
    SEV_ROTULOS, faixaSeveridade, TABELA, FALHAS,
  };
})();
