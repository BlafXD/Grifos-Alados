// ═══════════════════════════════════════════════════════════════════
//  AMEACAS-DATA.JS — Regras de criaturas/ameaças (Ameaças de Arton)
//  Conteúdo da sub-aba "👹 Regras de Ameaças" das Consultas rápidas.
//  Transcrito de 'Texto Importante!.txt' (após "Ataques Desarmados &
//  Armas Naturais"). Consumido por ameacas.js.
//  Obs.: regras que não são de criaturas foram realocadas — ataques
//  desarmados/naturais e condições de itens estão em "⚔ Arsenal &
//  Regras"; magias sem custo/simuladas em "✨ Regras de Magia".
// ═══════════════════════════════════════════════════════════════════
window.REGRAS_AMEACAS = [

  // ── AMEAÇAS DE ARTON: ATAQUES DE CRIATURAS ──────────────────────
  { grupo: '👹 Ameaças de Arton — Ataques de Criaturas', titulo: 'Sobre estas regras', texto:
`Estas regras complementam e esclarecem o uso de ataques por ameaças (criaturas no papel de adversárias), incluindo como modificar ameaças existentes e criar novas. Uma das principais ações de uma criatura são seus ataques físicos, em corpo a corpo ou à distância, que seguem todas as regras de combate normais.` },

  { grupo: '👹 Ameaças de Arton — Ataques de Criaturas', titulo: 'Luta e Pontaria', texto:
`As perícias Luta e Pontaria funcionam como normal para criaturas. Por simplicidade, considere que os valores dessas perícias são iguais aos ataques listados para a criatura, e que uma criatura com um ataque sempre é treinada na perícia correspondente. Se a criatura não tiver um ataque de um determinado tipo e a perícia correspondente não estiver listada, ela não é treinada.
Exemplo: um ogro caçador tem um ataque de tacape corpo a corpo +24 — é treinado em Luta com valor +24. Ele não tem ataque à distância e Pontaria não aparece em suas perícias, logo não é treinado nela; se precisar atacar à distância, terá +3 (metade do ND 7 + Destreza 0).` },

  { grupo: '👹 Ameaças de Arton — Ataques de Criaturas', titulo: 'Tipos e dados de dano', texto:
`A descrição de cada ataque indica o tipo de dano (corte, perfuração etc.). Se nenhum tipo for indicado, o ataque causa o dano normal daquela arma. Assim como para personagens, bônus de dano e dados extras de criaturas NÃO são multiplicados num acerto crítico, a menos que a descrição da ameaça diga o contrário.` },

  { grupo: '👹 Ameaças de Arton — Ataques de Criaturas', titulo: 'Armas naturais — dano por tamanho',
    texto: 'Como regra geral, armas naturais causam 1d6 de dano de seu tipo para uma criatura Pequena ou Média; o tamanho ajusta esse dado em passos. Criaturas com armas naturais mais fracas ou particularmente perigosas podem causar dano diferente desses valores.',
    tabela: {
      cab: ['Tamanho da criatura', 'Passo', 'Dano'],
      linhas: [
        ['Minúscula',       '–1 passo',  '1d4'],
        ['Pequena / Média', 'base',      '1d6'],
        ['Grande / Enorme', '+1 passo',  '1d8'],
        ['Colossal',        '+2 passos', '1d10'],
      ],
      nota: 'Base 1d6 (Pequena/Média); os passos seguem a Tabela 3-2 de passos de dano (Tormenta20 p. 117/143).',
    } },

  { grupo: '👹 Ameaças de Arton — Ataques de Criaturas', titulo: 'Armas empunhadas por criaturas', texto:
`Para armas empunhadas por criaturas, considere que qualquer modificação nas características da arma (dano básico, crítico etc.) é resultado das habilidades da criatura, salvo se descrito na ficha. Nas mãos de outra criatura (como os personagens), a arma funciona como um exemplar normal, com características padrão. Características especiais costumam estar descritas no equipamento ou tesouro da criatura.
Exemplo: um coletor de Arsenal usa um martelo de guerra (dano básico 1d8) que causa 2d8 — o dado extra é parte das habilidades do coletor; nas mãos de outra criatura, o martelo causa apenas 1d8.` },

  { grupo: '👹 Ameaças de Arton — Ataques de Criaturas', titulo: 'Removendo equipamentos (ataque desarmado rápido)', texto:
`Se uma criatura perde a arma e precisa recorrer a ataques desarmados, defina rapidamente: o modificador de ataque desarmado é igual ao do ataque principal, e o dano desarmado é 1d3 + o bônus de dano do ataque principal (sem bônus e dados extras específicos da arma). Esse é o dano de criaturas Pequenas/Médias — Minúscula diminui um passo; Grande/Enorme aumenta um passo; Colossal aumenta dois.
Exemplo: criatura Grande com espada longa +23 (1d8+14, 19) → ataque desarmado +23 (1d4+14).
Da mesma forma, ao perder o escudo ou ter a armadura destruída, ajuste as características afetadas conforme as estatísticas do item perdido (linha "Equipamento" + habilidades que dependam dele).` },

  { grupo: '👹 Ameaças de Arton — Ataques de Criaturas', titulo: 'CD de habilidades (atributo-chave)', texto:
`As fichas de ameaças não indicam o atributo-chave da CD de cada habilidade — em geral basta o valor da CD. Quando o atributo importar (ex.: efeitos que modificam atributos da criatura), use:
• Atléticas (derrubar, deslocar, condições de movimento): Força ou Destreza, o maior.
• Fisiológicas (doenças, venenos, energia não mágica como sopro de fogo): Constituição.
• De controle (controle mental, condições mentais, dano psíquico): Carisma.
• Magias: o atributo indicado pelo tipo de conjurador; arcanos sem caminho definido usam Inteligência ou Carisma, o maior.
Sem encaixe: maior entre Força/Destreza/Constituição (físicas) ou Inteligência/Sabedoria/Carisma (mágicas/mentais); ou o maior de todos se não der para classificar.` },

  // ── AMEAÇAS DE ARTON: VARIANTES & ESPECIAIS ─────────────────────
  { grupo: '👹 Ameaças de Arton — Variantes & Regras Especiais', titulo: 'Ameaças e morte (variante)', texto:
`Controlar os PV negativos de várias criaturas pode ser trabalhoso, e ameaças com muitos PV raramente morrem de fato em combate. Variante: quando uma ameaça chega a 0 ou menos PV por dano letal, anote o valor mas IGNORE sangramentos. No fim do combate, lacaios nessa situação estão mortos; solos e especiais têm 50% de chance de estar vivos. Os personagens podem impedir essas mortes estabilizando/curando a ameaça durante o combate, ou usando dano não letal.` },

  { grupo: '👹 Ameaças de Arton — Variantes & Regras Especiais', titulo: 'Parceiros de ameaças', texto:
`Algumas ameaças têm parceiros. Por padrão, eles seguem as regras normais de seu tipo, não contam como oponentes separados para XP/recompensas e não precisam ser derrotados para o combate terminar (quando a ameaça cai, os parceiros se rendem, fogem ou desaparecem). Em certos casos o mestre pode tratar o parceiro como criatura separada — inclua uma criatura do tipo adequado, ignore os benefícios que a ameaça receberia do parceiro e considere o ND dele ao calcular o nível do encontro e as recompensas.` },

  { grupo: '👹 Ameaças de Arton — Variantes & Regras Especiais', titulo: 'Recompensas por vários inimigos', texto:
`Por padrão, XP e tesouro são calculados pelo ND de cada criatura separadamente. Em encontros com muitos oponentes ou NDs variados, é mais prático unificar: calcule XP e tesouro pelo ND TOTAL do encontro. Use a categoria de tesouro (metade, padrão ou dobro) da criatura de maior ND, mas role na linha do ND do encontro, e inclua os tesouros especiais das participantes.
Exemplo: duas ameaças de ND 8 (ND de encontro 10) → 10.000 XP (10 × 1.000) e tesouro de ND 10.
Pode gerar recompensas um pouco maiores/menores conforme o grupo, mas a longo prazo tende a equilibrar.` },

  { grupo: '👹 Ameaças de Arton — Variantes & Regras Especiais', titulo: 'Criaturas S e S+', texto:
`São criaturas especiais que, por força, influência e papel no mundo, estão num patamar de poder único — não podem ser derrotadas apenas com poder bruto. Vencer uma delas deve ser o objetivo de uma série de aventuras ou o ápice de uma campanha. S e S+ não são níveis numéricos, mas um status: para estatísticas não listadas (perícias não treinadas etc.) valem como ND 20; mas para habilidades de OUTRAS criaturas seu ND é maior que 20 (não são afetadas por efeitos limitados pelo nível do alvo, como Invocar Lefeu de um lekael). Possuem a habilidade Maior que a Morte.` },

  { grupo: '👹 Ameaças de Arton — Variantes & Regras Especiais', titulo: 'Ameaças desafiadoras (ajustar a dificuldade)', texto:
`O ND e as fichas das criaturas são calculados para um grupo de quatro personagens otimizados para combate e com acesso a todos os recursos do nível (PV, PM, equipamento etc.). Ao usar ameaças, considere também a história, as condições do grupo, as habilidades disponíveis e a experiência dos jogadores. O ND é um indicador geral — esses fatores podem pedir criaturas de ND menor ou maior para um desafio adequado. Mestre iniciante: não se preocupe em "errar a mão" nos primeiros combates; com a prática, após algumas sessões, você pega a noção de calcular encontros.` },
];
