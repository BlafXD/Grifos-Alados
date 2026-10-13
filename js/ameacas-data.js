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
    texto: 'Diversas criaturas são dotadas de armas naturais, como garras e chifres. Como regra geral, elas causam 1d6 de dano de seu tipo para uma criatura Pequena ou Média; o tamanho ajusta esse dado em passos. Criaturas com armas naturais mais fracas ou particularmente perigosas podem causar dano diferente desses valores. O TIPO de dano de cada arma natural está na Tabela 2-1, em «⚔ Arsenal & Regras» → Ataques Desarmados & Armas Naturais.',
    tabela: {
      cab: ['Tamanho da criatura', 'Passo', 'Dano'],
      linhas: [
        ['Minúscula',       '–1 passo',  '1d4'],
        ['Pequena / Média', 'base',      '1d6'],
        ['Grande / Enorme', '+1 passo',  '1d8'],
        ['Colossal',        '+2 passos', '1d10'],
      ],
      nota: 'Base 1d6 (Pequena/Média); os passos seguem a Tabela 3-2: Dano de Armas (Tormenta20, p. 143), ' +
            'como manda o próprio texto de Ameaças de Arton, p. 374.',
    } },

  { grupo: '👹 Ameaças de Arton — Ataques de Criaturas', titulo: 'Armas empunhadas por criaturas', texto:
`Para armas empunhadas por criaturas, considere que qualquer modificação nas características da arma (dano básico, crítico etc.) é resultado das habilidades da criatura, salvo se descrito na ficha. Nas mãos de outra criatura (como os personagens), a arma funciona como um exemplar normal, com características padrão. Características especiais costumam estar descritas no equipamento ou tesouro da criatura.
Exemplo: um coletor de Arsenal usa um martelo de guerra (dano básico 1d8) que causa 2d8 — o dado extra é parte das habilidades do coletor; nas mãos de outra criatura, o martelo causa apenas 1d8.` },

  { grupo: '👹 Ameaças de Arton — Ataques de Criaturas', titulo: 'Removendo equipamentos (ataque desarmado rápido)', texto:
`Se uma criatura perde a arma e precisa recorrer a ataques desarmados, defina rapidamente: o modificador de ataque desarmado é igual ao do ataque principal, e o dano desarmado é 1d3 + o bônus de dano do ataque principal (sem bônus e dados extras específicos da arma). Esse é o dano de criaturas Pequenas/Médias — Minúscula diminui um passo; Grande/Enorme aumenta um passo; Colossal aumenta dois.
Exemplo: criatura Grande com espada longa +23 (1d8+14, 19) → ataque desarmado +23 (1d4+14).
Alternativamente, ao CRIAR uma ameaça nova, você pode já definir um ataque desarmado para ela — como ataque secundário ou como uma opção de ataque principal.
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

  // ── RECURSOS NATURAIS (Ameaças de Arton, p. 401–402) ────────────
  //  A regra opcional que extrai matéria-prima do corpo da criatura.
  //  As duas tabelas e os sete verbetes vêm de js/recursos-naturais-data.js,
  //  o MESMO dado que desenha o bloco 🦴 em cada ficha da aba 📕 Fichas
  //  Prontas — digitar a grade do d6 outra vez aqui seria criar uma
  //  segunda verdade para a mesma tabela. Sem o módulo carregado, o
  //  grupo simplesmente não aparece.
  ...(function () {
    const R = window.GA_RECURSOS_NATURAIS;
    if (!R) return [];
    const G = '👹 Ameaças de Arton — Recursos Naturais';
    const cards = [
      { grupo: G, titulo: 'O que são, e quando entram', texto:
`Certas criaturas, como dragões, elementais e monstros peçonhentos, fornecem recursos específicos como parte de seus tesouros. Entretanto, existem outros materiais de grande utilidade que podem ser extraídos de ameaças. Esta é uma regra OPCIONAL, para mestres que queiram usar esse tipo de tesouro.
Recursos naturais podem ser incluídos em qualquer criatura que já NÃO possua um recurso especial, e podem complementar o tesouro normal dela ou substituí-lo — a critério do mestre. Para usar um recurso, escolha um tipo apropriado à criatura; alternativamente, role 1d6 na linha do tipo dela (Tabela 3-5, no card seguinte).
QUANTO SAI: criaturas Pequenas e Médias fornecem 1 unidade do recurso, Grandes e Enormes fornecem 2 unidades e Colossais fornecem 5. Criaturas Minúsculas são muito pequenas para produzir recursos.
COMO SE EXTRAI: como qualquer recurso especial — uma hora de trabalho e um sucesso em um teste de Sobrevivência ou de um Ofício relacionado ao recurso, CD 15 + o ND da criatura. Em caso de falha, os recursos são estragados.
Embora seja possível extrair recursos de criaturas inteligentes, isso pode ser considerado um tabu, um crime ou simplesmente um ato hediondo, dependendo de onde os aventureiros estiverem.
Na prática você não precisa consultar nada disto: cada ficha da aba 📕 Fichas Prontas traz um bloco 🦴 Recursos naturais já resolvido com o tipo, o tamanho e o ND dela.` },

      { grupo: G, titulo: 'Tabela 3-5: que recurso cada tipo de criatura dá', texto:
`Role 1d6 na linha do tipo da criatura. O travessão marca o recurso que aquele tipo não fornece.
ATENÇÃO À LINHA DO CONSTRUTO: o livro imprime carapaça 1-2, fonte 3 e sucata 6, e deixa o 4 e o 5 sem nada — as outras cinco linhas cobrem os seis números. O buraco é do livro (conferido no texto e nos próprios comandos de desenho do PDF), e não foi remendado aqui. Caindo no vão, escolha o recurso ou role de novo.`,
        tabela: Object.assign({ titulo: 'Tabela 3-5: Recursos Naturais', destaque: 0,
          nota: '* A linha do Espírito serve para criaturas incorpóreas de qualquer tipo.' },
          R.tabela35()) },

      { grupo: G, titulo: 'Tabela 3-6: quanto vale, pelo patamar da ameaça', texto:
`Para os recursos que servem de matéria-prima, o valor e o grau de qualidade dos itens que se podem fabricar com eles dependem do patamar da ameaça de onde saíram.
Dois dos sete recursos têm escala própria e não usam esta tabela: o INGREDIENTE serve "independente de seu patamar", e o MANTIMENTO se mede em refeições (veja os verbetes abaixo).`,
        tabela: Object.assign({ titulo: 'Tabela 3-6: Tipos de Recursos Naturais', destaque: 0 },
          R.tabela36()) },
    ];
    // um card por recurso, na ordem das colunas da Tabela 3-5
    for (const rec of R.RECURSOS) {
      cards.push({ grupo: G, titulo: rec.icone + ' ' + rec.nome, texto: rec.texto });
    }
    return cards;
  })(),
];
