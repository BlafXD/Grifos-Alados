// ════════════════════════════════════════════════════════════════════
//  FICHAS-T20-DATA.JS — Ameaças do livro básico (Tormenta 20 JdA)
//  Localização: /grifos-alados/js/fichas-t20-data.js
//
//  ⚠ ARQUIVO GERADO por "Inútil/_gerar-fichas-t20.js" a partir de
//    "Inútil/Regras.txt". Dá para editar à mão — mas rodar o gerador
//    de novo sobrescreve tudo.
//
//  As 80 criaturas do Capítulo 7 (Ameaças), nos mesmos grupos da
//  Tabela 7-1. Cada ficha guarda o TEXTO LIMPO do statblock, no formato
//  do livro — quem o transforma em criatura do bestiário é o parser
//  parsearFicha() do monstros.js (o mesmo do "📋 Importar do livro"),
//  exatamente como já acontece com js/npcs-data.js.
//
//  Campos de cada ficha:
//    chave   — id estável (não mudar; a aba e o modal usam)
//    nome/nd — repetidos fora do texto para listas e filtros
//    tipo    — linha de tipo e tamanho (só exibição em listas)
//    papel   — 'solo' | 'lacaio' | 'especial'. No livro é um ÍCONE
//              VETORIAL ao lado do nome: não é caractere nenhum, e por
//              isso nunca saiu em cópia de texto. Foi lido do PDF em
//              28/08/2026 assinando a geometria do desenho e batendo com
//              a legenda do livro — as 80 linhas de tipo conferem uma a
//              uma, na ordem de leitura das páginas.
//    resumo  — uma linha para o modal de inserção
//    texto   — statblock completo; PRIMEIRA linha = "Nome ND X", depois
//              descrição, linha de tipo, e o bloco do livro.
//
//  ⚠ O texto NÃO é cópia literal: o gerador conserta os deslizes de
//  digitação do livro que atrapalhavam a leitura da ficha — vírgula que
//  falta na linha de atributos, rótulo com ponto ("Equipamento."), "Nd"
//  em vez de "ND", "Magia" no singular abrindo o bloco de magias, ponto
//  final faltando ou sobrando, e o deslocamento sem os quadrados (1q =
//  1,5m). Cada conserto sai listado no relatório do gerador; nenhum
//  número de regra foi tocado.
//
//  Cada categoria traz ainda:
//    intro   — a abertura do grupo no livro
//    regras  — quadros laterais e aberturas de subgrupo (Orcs, Ódio Puro,
//              Habilidades Dracônicas, Trolls Variantes…)
//    comuns  — quando o grupo tem um quadro de habilidades que valem para
//              TODAS as fichas dele; "aplicaSe" filtra pela linha de tipo
//              e a aba oferece anexá-las ao mandar a ficha para o combate.
// ════════════════════════════════════════════════════════════════════
window.FICHAS_T20 = {

  livro: 'Tormenta 20 — Edição Jogo do Ano',
  fonte: 'Capítulo 7: Ameaças',

  categorias: [

    // ── 🕳 MASMORRAS ─────────────────────────────────────
    {
      chave: "masmorras", nome: "Masmorras", icone: "🕳", cor: "#7a6a3a",
      intro: "Masmorras são descritas no Capítulo 6. A seguir estão criaturas que habitam esse ambiente.",
      fichas: [
        {
          chave: "glop", nome: "Glop", nd: "1/4", tipo: "Monstro Pequeno",
          papel: "lacaio",
          resumo: "Pequenas gosmas esverdeadas com formato de gota que perambulam pelos corredores de masmorras.",
          texto:
`Glop ND 1/4
Pequenas gosmas esverdeadas com formato de gota que perambulam pelos corredores de masmorras. Irracionais, seu único propósito parece ser alimentar-se, o que fazem saltando sobre matéria orgânica e dissolvendo-a com seus corpos ácidos.
Monstro Pequeno
Iniciativa +0, Percepção +0, percepção às cegas
Defesa 10, Fort +0, Ref +2, Von –5, imunidade a ácido
Pontos de Vida 10
Deslocamento 9m (6q)
Corpo a Corpo Pancada +7 (1d4 mais 1d4 ácido).
For 0, Des 0, Con 0, Int —, Sab –5, Car –5
Tesouro Nenhum.`
        },
        {
          chave: "ratoGigante", nome: "Rato Gigante", nd: "1/4", tipo: "Animal Pequeno",
          papel: "lacaio",
          resumo: "Esse roedor de pelagem grossa, olhos vermelhos e presas amareladas atinge até um metro de comprimento.",
          texto:
`Rato Gigante ND 1/4
Esse roedor de pelagem grossa, olhos vermelhos e presas amareladas atinge até um metro de comprimento. Ratos gigantes vivem em bandos e podem ser encontrados em quase qualquer lugar — pântanos ermos, esgotos de metrópoles e porões de tavernas não muito recomendadas...
Animal Pequeno
Iniciativa +5, Percepção +4, faro, visão na penumbra
Defesa 12, Fort +0, Ref +3, Von –2
Pontos de Vida 3
Deslocamento 12m (8q), escalar 6m (4q)
Corpo a Corpo Mordida +7 (1d4+3 mais doença).
Doença Uma criatura mordida por um rato gigante é exposta a doença infecção do esgoto (veja a página 318).
For 0, Des 2, Con 1, Int –4, Sab 1, Car –3
Tesouro Nenhum.`
        },
        {
          chave: "orcCombatente", nome: "Orc combatente", nd: "1/2", tipo: "Humanoide (orc) Médio",
          papel: "lacaio",
          subgrupo: "Orcs",
          resumo: "Orcs — Estes humanoides monstruosos podem ser encontrados em muitos pontos de Arton, em pequenos bandos ou vastas tribos.",
          texto:
`Orc combatente ND 1/2
Humanoide (orc) Médio
Iniciativa +4, Percepção +1, visão no escuro
Defesa 14, Fort +5, Ref +3, Von +0
Pontos de Vida 8
Deslocamento 9m (6q)
Corpo a Corpo Maça +9 (1d8+7).
Sensibilidade a Luz Quando exposto a luz do sol ou similar, o orc fica ofuscado.
For 4, Des 1, Con 2, Int –1, Sab –1, Car –1
Equipamento Couro batido, maça. Tesouro Metade.`
        },
        {
          chave: "orcChefe", nome: "Orc Chefe", nd: "2", tipo: "Humanoide (orc) Médio",
          papel: "solo",
          subgrupo: "Orcs",
          resumo: "Orcs — Estes humanoides monstruosos podem ser encontrados em muitos pontos de Arton, em pequenos bandos ou vastas tribos.",
          texto:
`Orc Chefe ND 2
Humanoide (orc) Médio
Iniciativa +5, Percepção +3, visão no escuro
Defesa 19, Fort +13, Ref +7, Von +2
Pontos de Vida 66
Deslocamento 9m (6q)
Corpo a Corpo Machado de batalha +11 (1d8+12, x3).
Urro Selvagem (Movimento) O orc chefe recebe +2 em testes de ataque e rolagens de dano corpo a corpo até o final da cena, mas não pode fazer nenhuma ação que exija calma e concentração.
Sensibilidade a Luz Quando exposto a luz do sol ou similar, o orc fica ofuscado.
For 5, Des 2, Con 4, Int 0, Sab 0, Car 0
Perícias Intimidação +4, Sobrevivência +5 (+7 em subterrâneos).
Equipamento Gibão de peles, machado de batalha.
Tesouro Padrão.`
        },
        {
          chave: "orcMutante", nome: "Orc mutante", nd: "5", tipo: "Humanoide (orc) Médio",
          papel: "lacaio",
          subgrupo: "Orcs",
          resumo: "Orcs — Estes humanoides monstruosos podem ser encontrados em muitos pontos de Arton, em pequenos bandos ou vastas tribos.",
          texto:
`Orc mutante ND 5
Humanoide (orc) Médio
Iniciativa +8, Percepção +5, visão no escuro
Defesa 22, Fort +15, Ref +11, Von +7
Pontos de Vida 55
Deslocamento 9m (6q)
Corpo a Corpo Machado de guerra +20 (1d12+18, x3) e mordida +20 (1d6+18).
Terceiro Braço (Livre) Se o orc mutante acerta o ataque de machado de guerra e o ataque de mordida em uma mesma criatura na mesma rodada, ele rasga a vítima com seu terceiro braço degenerado, causando mais 1d6+9 pontos de dano de corte.
Sensibilidade a Luz Quando exposto a luz do sol ou similar, o orc fica ofuscado.
For 6, Des 2, Con 4, Int –2, Sab –2, Car –2
Equipamento Machado de guerra. Tesouro Padrão.`
        },
        {
          chave: "aranhaGigante", nome: "Aranha Gigante", nd: "2", tipo: "Monstro Grande",
          papel: "solo",
          resumo: "Grandes como cavalos, estas aranhas capturam suas vítimas com teia, disparando-a ou tecendo uma armadilha em alguma passagem, para então par",
          texto:
`Aranha Gigante ND 2
Grandes como cavalos, estas aranhas capturam suas vítimas com teia, disparando-a ou tecendo uma armadilha em alguma passagem, para então paralisá-las com a picada venenosa.
Monstro Grande
Iniciativa +7, Percepção +3, visão no escuro
Defesa 19, Fort +8, Ref +11, Von +3
Pontos de Vida 77
Deslocamento 12m (8q), escalar 12m (8q)
Corpo a Corpo Mordida +12 (2d6+8 mais veneno).
Teia (padrão) A aranha gigante dispara teia em um quadrado de 3m de lado em alcance curto. Criaturas na área ficam enredadas (Ref CD 18 evita). Uma criatura enredada pode se soltar com uma ação completa e um teste de Força ou Acrobacia (CD 20) ou cortando a teia (cada espaço de 1,5m de teia tem 5 PV e RD 5). Fogo queima a teia em duas rodadas (e liberta as criaturas), mas causa 1d6 pontos de dano de fogo por rodada a todas as criaturas nela. A aranha gigante também pode usar a teia para cobrir uma área quadrada com 6m de lado. Por sua semitransparência, a teia é difícil de ver (Percepção CD 20) até ser tarde demais. Uma criatura que entre na área fica enredada. A aranha pode andar na própria teia sem se enredar. Ela percebe automaticamente (como se tivesse percepção às cegas) qualquer criatura na teia.
Veneno Condição fraco (Fort CD 18 evita).
For 5, Des 4, Con 1, Int –5, Sab 0, Car –4
Perícias Furtividade +9.
Tesouro 1d4 doses de veneno de aranha gigante (CD 17 para extrair, T$ 45 cada dose).`
        },
        {
          chave: "gargula", nome: "Gárgula", nd: "2", tipo: "Construto Médio",
          papel: "solo",
          resumo: "Esses predadores furtivos se mantêm imóveis no alto de ruínas, castelos, catedrais e outros prédios, fingindo ser estátuas.",
          texto:
`Gárgula ND 2
Esses predadores furtivos se mantêm imóveis no alto de ruínas, castelos, catedrais e outros prédios, fingindo ser estátuas. Quando surge uma oportunidade de atacar, mergulham com suas garras.
Construto Médio
Iniciativa +3, Percepção +3, visão no escuro
Defesa 19, Fort +13, Ref +7, Von +2, imunidade a condição petrificado, redução de dano 5
Pontos de Vida 65
Deslocamento 12m (8q), voo 18m (12q)
Corpo a Corpo duas garras +12 (1d6+6).
Imobilidade Uma gárgula pode permanecer completamente imóvel. Se ela estiver assim, um personagem deve passar num teste de Percepção (CD 35) para perceber que ela é uma criatura e não uma estátua.
For 6, Des 2, Con 4, Int –2, Sab 1, Car –2
Tesouro Padrão.`
        },
        {
          chave: "guerreiroDeChifres", nome: "Guerreiro de Chifres", nd: "3", tipo: "Espírito (demônio) Médio",
          papel: "solo",
          resumo: "Numerosas entidades malignas invadem Arton para corromper, torturar ou destruir os mortais.",
          texto:
`Guerreiro de Chifres ND 3
Numerosas entidades malignas invadem Arton para corromper, torturar ou destruir os mortais. De corpo humanoide e cabeça de bode, guerreiros de chifres estão entre os demônios mais fracos, mas ainda assim são inimigos perigosos. Podem ser encontrados vagando em masmorras, sozinhos ou em pequenos bandos — às vezes sob comando de um arcanista, responsável por sua convocação a este mundo.
Espírito (demônio) Médio
Iniciativa +6, Percepção +3, faro, visão no escuro
Defesa 21, Fort +13, Ref +11, Von +9, imunidade a ácido e venenos, redução de dano 5, redução de fogo e frio 10.
Pontos de Vida 100
Deslocamento 9m (6q)
Corpo a Corpo Machado de guerra +14 (1d12+16, x3) ou chifres +14 (2d6+10 impacto).
Marrada (Completa) O guerreiro de chifres faz uma investida e ataca com seu machado de guerra e seus chifres. Os dois ataques recebem o bônus de +2 da investida, mas devem ser feitos contra o mesmo alvo.
For 5, Des 3, Con 4, Int –2, Sab 1, Car –1
Perícias Atletismo +8, Intimidação +4.
Equipamento Machado de guerra cruel. Tesouro Padrão.`
        },
        {
          chave: "manticora", nome: "Mantícora", nd: "6", tipo: "Monstro Grande",
          papel: "solo",
          resumo: "Monstro com corpo de leão, asas de dragão e rosto humano envelhecido, a mantícora está entre as criaturas mais perigosas em uma masmorra — m",
          texto:
`Mantícora ND 6
Monstro com corpo de leão, asas de dragão e rosto humano envelhecido, a mantícora está entre as criaturas mais perigosas em uma masmorra — muitas vezes adotando tais lugares como seu covil, ou encarregadas de sua proteção por um mestre ainda mais poderoso.
Monstro Grande
Iniciativa +7, Percepção +8, faro, visão no escuro
Defesa 26, Fort +18, Ref +7, Von +12
Pontos de Vida 240
Deslocamento 9m (6q), voo 15m (10q)
Corpo a Corpo Mordida +18 (1d10+12) e duas garras +18 (1d8+12).
Espinhos (Movimento) A mantícora dispara 1d4 espinhos de sua cauda. Cada espinho atinge uma criatura em alcance médio, causando 1d8+7 pontos de dano de perfuração (Ref CD 22 reduz à metade). Recarga (movimento).
For 7, Des 2, Con 5, Int –2, Sab 1, Car –1
Tesouro Padrão mais espinhos (CD 21 para extrair). Os espinhos contam como T$ 150 em matéria-prima para fabricar flechas superiores.`
        },
        {
          chave: "centopeiaDragao", nome: "Centopeia-dragão", nd: "7", tipo: "Monstro Enorme",
          papel: "solo",
          resumo: "Com dez metros de comprimento, estes monstros incandescentes avançam devorando tudo que encontram.",
          texto:
`Centopeia-dragão ND 7
Com dez metros de comprimento, estes monstros incandescentes avançam devorando tudo que encontram. Embora também sejam encontrados em áreas abertas, são mais perigosos em masmorras, onde preenchem túneis estreitos com a bocarra imensa.
Monstro Enorme
Iniciativa +10, Percepção +8, visão no escuro
Defesa 27, Fort +20, Ref +14, Von +9, imunidade a condição caído, redução de fogo 10
Pontos de Vida 275
Deslocamento 15m (10q), escavar 6m (4q)
Corpo a Corpo Mordida +24 (2d8+18 mais 2d6 de fogo).
Agarrar Aprimorado (Livre) Quando a centopeia-dragão acerta um ataque de mordida, pode usar a manobra agarrar (teste +29).
Aura de Calor Quando enfurecida, esta criatura emana um calor intenso. No início de cada turno da centopeia-dragão, todas as criaturas em alcance curto sofrem 4d6+9 pontos de dano de fogo.
Engolir (Padrão) Se a centopeia-dragão começar seu turno agarrando uma criatura Média ou menor, poderá fazer um teste de agarrar contra ela. Se vencer, engole a criatura. Uma criatura engolida continua agarrada e sofre 2d6+18 pontos de dano de impacto, mais 4d6+9 pontos de dano de fogo, no início de cada turno da centopeia-dragão. A centopeia-dragão só pode manter uma criatura engolida por vez. Uma criatura engolida pode escapar causando 20 pontos de dano ao estômago da centopeia-dragão (Defesa 10). Isso faz com que a criatura seja regurgitada e fique caída na frente do monstro.
For 11, Des 3, Con 9, Int –4, Sab 1, Car 0
Tesouro 2d4 doses de essência abissal (CD 22 para extrair).`
        },
        {
          chave: "golemDeFerro", nome: "Golem de Ferro", nd: "10", tipo: "Construto Grande",
          papel: "solo",
          resumo: "Ainda que existam golens inteligentes, também existem numerosos construtos antigos e sem inteligência real — deixados em ruínas ancestrais p",
          texto:
`Golem de Ferro ND 10
Ainda que existam golens inteligentes, também existem numerosos construtos antigos e sem inteligência real — deixados em ruínas ancestrais para proteger as propriedades de seus mestres, talvez há muito falecidos. Ao perseguir um tesouro antigo, um grupo de aventureiros pode acabar despertando um imenso e quase invulnerável golem de ferro, um dos oponentes mais perigosos de uma masmorra.
Construto Grande
Iniciativa +4, Percepção +9, visão no escuro
Defesa 36, Fort +24, Ref +14, Von +11, redução de dano 10
Pontos de Vida 400
Deslocamento 9m (6q)
Corpo a Corpo Duas pancadas +30 (2d10+25).
Imunidade a Magia O golem de ferro é imune a efeitos mágicos, com as seguintes exceções. Efeitos mágicos de eletricidade deixam o golem de ferro lento por 1d6 rodadas. Efeitos mágicos de fogo removem a condição lento e curam 1 PV para cada 3 pontos de dano que causariam.
Sopro (Movimento) O golem de ferro expele uma nuvem de gás venenoso que preenche um cubo de 3m de lado. Criaturas dentro da área perdem 6d12 pontos de vida e ficam enjoadas (Fort CD 30 reduz à metade e evita a condição enjoado). Recarga (movimento), veneno.
For 12, Des –1, Con 10, Int —, Sab 0, Car –5
Tesouro Nenhum.`
        },
      ],
      regras: [
        { titulo: "Orcs",
          texto:
`Estes humanoides monstruosos podem ser encontrados em muitos pontos de Arton, em pequenos bandos ou vastas tribos. Selvagens e violentos, lutam com brutalidade e sem estratégia, obedecendo a seus líderes apenas pela força. Seu maior ponto fraco é a sensibilidade a luz, levando-os a infestar masmorras e outros lugares subterrâneos, de onde lançam ataques noturnos contra povoados civilizados.` },
      ],
    },

    // ── 🏞 ERMOS ─────────────────────────────────────────
    {
      chave: "ermos", nome: "Ermos", icone: "🏞", cor: "#5f7a3a",
      intro: "Em Arton, o perigo não está apenas nas profundezas das masmorras. Não está apenas nos territórios puristas, na sombria Aslothia ou nas bizarras áreas de Tormenta. O perigo espreita em toda parte, nas estradas, nos campos, em plena luz do dia. Este é um mundo vasto e indomado, com extensas áreas selvagens e inexploradas no próprio coração do Reinado. Mesmo a gigantesca metrópole de Valkaria, com sua eficiente guarda, mal consegue vigiar poucos quilômetros além de suas muralhas. Impossível patrulhar até todas as rotas comerciais. Longe das cidades, você estará por sua conta, sem que faltem perigos para desafiá-lo. Muitos são bandidos humanos e de outras raças “civilizadas” tirando proveito das grandes distâncias para executar emboscadas. Outros pertencem a raças selvagens, que sequer conhecem outras formas de sobrevivência exceto matar e pilhar. Outros ainda são predadores naturais, farejando e espreitando em busca da próxima refeição. Perigos de todos os tamanhos, de uma alcateia de lobos-das-cavernas a um serpe vigiando seu território. Percorrer terras desabitadas sempre envolve risco. Acampar e pernoitar, mais ainda. Todo viajante deve estar preparado para lutar por seus pertences ou pela vida.",
      fichas: [
        {
          chave: "bandido", nome: "Bandido", nd: "1/4", tipo: "Humanoide (humano) Médio",
          papel: "lacaio",
          subgrupo: "Bandidos",
          resumo: "Bandidos — Bandidos operam em estradas desertas, emboscando viajantes.",
          texto:
`Bandido ND 1/4
Humanoide (humano) Médio
Iniciativa +4, Percepção +1
Defesa 13, Fort +1, Ref +3, Von –1
Pontos de Vida 6
Deslocamento 9m (6q)
Corpo a Corpo Clava +7 (1d6+3).
For 1, Des 2, Con 1, Int 0, Sab –1, Car 0
Perícias Furtividade +5.
Equipamento Clava. Tesouro Metade.`
        },
        {
          chave: "chefeBandido", nome: "Chefe Bandido", nd: "1", tipo: "Humanoide (humano) Médio",
          papel: "solo",
          subgrupo: "Bandidos",
          resumo: "Bandidos — Bandidos operam em estradas desertas, emboscando viajantes.",
          texto:
`Chefe Bandido ND 1
Humanoide (humano) Médio
Iniciativa +4, Percepção +2
Defesa 16, Fort +5, Ref +8, Von +3
Pontos de Vida 30
Deslocamento 9m (6q)
Corpo a Corpo Espada curta +9 (1d6+5, 19).
À Distância Adaga +7 (1d4+3, 19).
Ataque Furtivo Uma vez por rodada, o chefe bandido causa +2d6 pontos de dano com ataques corpo a corpo, ou à distância em alcance curto, contra alvos desprevenidos ou que esteja flanqueando.
For 3, Des 2, Con 2, Int 0, Sab 0, Car 1
Perícias Furtividade +7, Intimidação +6.
Equipamento Adaga, espada curta. Tesouro Padrão.`
        },
        {
          chave: "guardaDeCidade", nome: "Guarda de Cidade", nd: "1/2", tipo: "Humanoide (humano) Médio",
          papel: "lacaio",
          subgrupo: "Guardas",
          resumo: "Guardas — Onde há ordem e civilização, há algum tipo de guarda ou milícia.",
          texto:
`Guarda de Cidade ND 1/2
Humanoide (humano) Médio
Iniciativa +4, Percepção +3
Defesa 15, Fort +5, Ref +2, Von +1
Pontos de Vida 8
Deslocamento 9m (6q)
Corpo a Corpo Maça +7 (1d8+5).
For 2, Des 1, Con 2, Int 0, Sab 0, Car 0
Perícias Atletismo +5.
Equipamento Apito, couro batido, maça. Tesouro Nenhum.`
        },
        {
          chave: "sargentoDaGuarda", nome: "Sargento da Guarda", nd: "1", tipo: "Humanoide (humano) Médio",
          papel: "solo",
          subgrupo: "Guardas",
          resumo: "Guardas — Onde há ordem e civilização, há algum tipo de guarda ou milícia.",
          texto:
`Sargento da Guarda ND 1
Humanoide (humano) Médio
Iniciativa +5, Percepção +4
Defesa 17, Fort +9, Ref +4, Von +3
Pontos de Vida 28
Deslocamento 6m (4q)
Corpo a Corpo Maça +10 (1d8+10).
À Distância Besta leve +9 (1d8+5, 19).
Ordens (Movimento) O sargento grita ordens para seus aliados em alcance médio. Eles recebem +2 em testes de perícia até o fim da cena.
For 3, Des 1, Con 2, Int 0, Sab 0, Car 1
Perícias Atletismo +7, Intuição +4.
Equipamento Apito, besta leve, cota de malha, maça, virotes x20. Tesouro Metade.`
        },
        {
          chave: "lobo", nome: "Lobo", nd: "1/2", tipo: "Animal Médio",
          papel: "lacaio",
          resumo: "Predadores primordiais, lobos vivem em alcateias lideradas pelo macho mais forte — o alfa, que conduz o bando nas caçadas.",
          texto:
`Lobo ND 1/2
Predadores primordiais, lobos vivem em alcateias lideradas pelo macho mais forte — o alfa, que conduz o bando nas caçadas. Podem ser encontrados em quase qualquer ambiente, especialmente planícies, florestas e regiões montanhosas. Lobos atacam mordendo as pernas da vítima para derrubá-la. Sua tática favorita é enviar alguns indivíduos para atacar pela frente, enquanto o resto circula e ataca por trás.
Animal Médio
Iniciativa +5, Percepção +6, faro, visão na penumbra
Defesa 14, Fort +6, Ref +3, Von +1
Pontos de Vida 14
Deslocamento 15m (10q)
Corpo a Corpo Mordida +7 (1d6+5).
Derrubar (livre) Se o lobo acerta um ataque de mordida, pode fazer a manobra derrubar (teste +7).
Táticas de Alcateia Quando flanqueia um inimigo, o lobo recebe +2 no teste de ataque e na rolagem de dano (além do bônus normal por flanquear, para um total de +4 no ataque e +2 no dano).
For 3, Des 3, Con 3, Int –4, Sab 2, Car –2
Perícias Sobrevivência +6.
Tesouro Nenhum.`
        },
        {
          chave: "centauroCombatente", nome: "Centauro combatente", nd: "1", tipo: "Humanoide (centauro) Grande",
          papel: "solo",
          subgrupo: "Centauros",
          resumo: "Centauros — Este povo equino é recluso, desconfiado e territorial.",
          texto:
`Centauro combatente ND 1
Humanoide (centauro) Grande
Iniciativa +3, Percepção +3
Defesa 16, Fort +9, Ref +2, Von +5
Pontos de Vida 35
Deslocamento 12m (8q)
Corpo a Corpo Tacape +9 (1d12+5) e cascos +9 (1d8+5).
À Distância Arco longo +7 (1d10+5, x3).
Investida Poderosa Quando faz uma investida com seu tacape, o centauro causa +1d12 pontos de dano.
Medo de Altura Se estiver adjacente a uma queda de 3m ou mais de altura, o centauro fica abalado.
For 5, Des 2, Con 3, Int –2, Sab 1, Car –2
Perícias Sobrevivência +5.
Equipamento Arco longo aumentado, flechas x20, tacape aumentado. Tesouro Metade.`
        },
        {
          chave: "centauroXama", nome: "Centauro Xamã", nd: "3", tipo: "Humanoide (centauro) Grande",
          papel: "especial",
          subgrupo: "Centauros",
          resumo: "Centauros — Este povo equino é recluso, desconfiado e territorial.",
          texto:
`Centauro Xamã ND 3
Humanoide (centauro) Grande
Iniciativa +4, Percepção +8
Defesa 21, Fort +9, Ref +4, Von +15
Pontos de Vida 35
Deslocamento 12m (8q)
Pontos de Mana 20
Corpo a Corpo Bordão +11 (1d8+4) e cascos +11 (1d8+4).
Magias O centauro xamã lança magias como um clérigo de Allihanna de 3º nível (CD 17).
• Armamento da Natureza (Movimento, 3 PM) Uma das armas do xamã se torna mágica e seu dano aumenta em um passo (de 1d8 para 1d10).
• Controlar Plantas (Padrão, 2 PM) Uma área quadrada de 9m de lado de vegetação em alcance curto se torna terreno difícil. Criaturas na área quando a magia é lançada ou no início de seus próprios turnos ficam enredadas e imóveis (Fortitude evita). Uma vítima pode se libertar com uma ação padrão e um teste de Acrobacia ou Atletismo.
• Curar Ferimentos (Padrão, 3 PM) Uma criatura adjacente cura 4d8+4 PV.
Medo de Altura Se estiver adjacente a uma queda de 3m ou mais de altura, o centauro fica abalado.
✦ Voz da Natureza O centauro está sempre sob efeito da magia Voz Divina, apenas para falar com animais.
For 4, Des 1, Con 3, Int –1, Sab 4, Car 0
Perícias Religião +8, Sobrevivência +10.
Equipamento Bordão aumentado, símbolo sagrado de Allihanna. Tesouro Metade.`
        },
        {
          chave: "gnollSaqueador", nome: "Gnoll saqueador", nd: "1", tipo: "Humanoide (gnoll) Médio",
          papel: "lacaio",
          subgrupo: "Gnolls",
          resumo: "Gnolls — De todos os humanoides monstruosos, o estridente povo-hiena é o mais propenso a preparar emboscadas em beira de estrada.",
          texto:
`Gnoll saqueador ND 1
Humanoide (gnoll) Médio
Iniciativa +5, Percepção +4, faro
Defesa 15, Fort +7, Ref +7, Von +1
Pontos de Vida 15
Deslocamento 9m (6q)
Corpo a Corpo Lança +10 (1d6+4) e mordida +10 (1d6+4).
À Distância Arco curto +9 (1d6+3, x3).
For 3, Des 2, Con 3, Int –2, Sab 1, Car –1
Equipamento Arco curto, flechas x20, lança. Tesouro Metade.`
        },
        {
          chave: "gnollFilibusteiro", nome: "Gnoll Filibusteiro", nd: "2", tipo: "Humanoide (gnoll) Médio",
          papel: "solo",
          subgrupo: "Gnolls",
          resumo: "Gnolls — De todos os humanoides monstruosos, o estridente povo-hiena é o mais propenso a preparar emboscadas em beira de estrada.",
          texto:
`Gnoll Filibusteiro ND 2
Humanoide (gnoll) Médio
Iniciativa +9, Percepção +4, faro
Defesa 19, Fort +7, Ref +11, Von +4
Pontos de Vida 60
Deslocamento 9m (6q)
Corpo a Corpo Espada curta +11 (1d6+4, 19) e mordida +11 (1d6+4).
À Distância Mosquete +12 (2d8+9, 19/x3).
Recarga Rápida O gnoll filibusteiro pode recarregar seu mosquete como uma ação de movimento.
For 3, Des 4, Con 3, Int –1, Sab 2, Car –1
Equipamento Balas x20, espada curta, mosquete. Tesouro Padrão.`
        },
        {
          chave: "gorlogg", nome: "Gorlogg", nd: "1", tipo: "Animal Grande",
          papel: "solo",
          resumo: "Estas feras primitivas lembram uma combinação de lobo e crocodilo, com mandíbulas capazes de destroçar ossos.",
          texto:
`Gorlogg ND 1
Estas feras primitivas lembram uma combinação de lobo e crocodilo, com mandíbulas capazes de destroçar ossos. Gorlogg existiam apenas no mundo perdido de Galrasia, até que começaram a ser capturados e trazidos para o Reinado, como temíveis bestas de guerra. Fugindo e retornando à vida selvagem, passaram a se reproduzir, formando bandos e ameaçando comunidades. Apesar da dificuldade para domá-los, são cobiçados como montarias por aventureiros valorosos (ou sem amor à vida).
Animal Grande
Iniciativa +4, Percepção +3, visão na penumbra
Defesa 16, Fort +8, Ref +5, Von +3
Pontos de Vida 36
Deslocamento 12m (8q)
Corpo a Corpo Mordida +9 (2d6+8, x3).
Agarrar Aprimorado (livre) Se o gorlogg acerta um ataque de mordida, pode usar a manobra agarrar (teste +13).
For 5, Des 2, Con 5, Int –4, Sab 1, Car –2
Perícias Atletismo +9.
Tesouro Nenhum.`
        },
        {
          chave: "trog", nome: "Trog", nd: "1", tipo: "Humanoide (trog) Médio",
          papel: "lacaio",
          resumo: "Quando um destes homens-lagarto decide integrar um grupo de aventureiros, isso é exceção, não regra.",
          texto:
`Trog ND 1
Quando um destes homens-lagarto decide integrar um grupo de aventureiros, isso é exceção, não regra. Trogs são predadores cruéis, cheios de ódio por todos os outros seres, especialmente anões. Preferem atacar em bandos e agir na escuridão, à noite ou nos subterrâneos. Sua tática padrão é aguardar por vítimas em emboscadas, mantendo-se escondidos com seu poder camaleônico — então atacam à distância com azagaias antes de enfrentar os inimigos restantes corpo a corpo, enfraquecendo-os com seu gás fétido. São atraídos por armas e outros itens feitos de metal, que eles próprios não sabem forjar.
Humanoide (trog) Médio
Iniciativa +3, Percepção +0, visão no escuro
Defesa 16, Fort +10, Ref +5, Von +1
Pontos de Vida 11
Deslocamento 9m (6q)
Corpo a Corpo Lança +11 (1d6+5) e mordida +11 (1d6+5).
À Distância Azagaia +9 (1d6+5).
Mau Cheiro (Padrão) O trog expele um gás fétido. Todas as criaturas (exceto trogs) em alcance curto ficam enjoadas por 1d6 rodadas (Fort CD 15 evita). Uma criatura que passe no teste de resistência fica imune a esta habilidade por um dia. Veneno.
Sangue Frio O trog sofre 1 ponto de dano adicional por dado de dano de frio.
For 3, Des 1, Con 3, Int –2, Sab 0, Car –1
Perícias Furtividade +7.
Equipamento Azagaias x2, lança. Tesouro Metade.`
        },
        {
          chave: "loboDasCavernas", nome: "Lobo-das-Cavernas", nd: "2", tipo: "Animal Grande",
          papel: "solo",
          resumo: "Um ancestral pré-histórico do lobo comum, mas muito maior e com uma coluna de placas ósseas ao longo do dorso.",
          texto:
`Lobo-das-Cavernas ND 2
Um ancestral pré-histórico do lobo comum, mas muito maior e com uma coluna de placas ósseas ao longo do dorso. Podem ser encontrados em vários pontos de Arton, sobretudo em Lamnor, onde são usados por goblinoides como bestas de guarda e montaria. As placas dorsais não são armas — estudiosos acreditam que sejam atrativo sexual (apenas os machos as possuem). Lobos-das-cavernas caçam como lobos comuns: quando em alcateia, parte do bando ataca pela frente, enquanto os demais circulam e atacam por trás com a poderosa mordida.
Animal Grande
Iniciativa +5, Percepção +7, faro, visão na penumbra
Defesa 19, Fort +11, Ref +7, Von +6
Pontos de Vida 73
Deslocamento 15m (10q)
Corpo a Corpo Mordida +13 (2d6+10).
Derrubar (Livre) Se o lobo-das-cavernas acerta um ataque de mordida, pode fazer a manobra derrubar (teste +15).
Táticas de Alcateia Quando flanqueia um inimigo, o lobo-das-cavernas recebe +2 no teste de ataque e na rolagem de dano (além do bônus normal por flanquear, para um total de +4 no ataque e +2 no dano).
For 6, Des 2, Con 5, Int –4, Sab 2, Car –2
Perícias Sobrevivência +11.
Tesouro Nenhum.`
        },
        {
          chave: "caoDoInferno", nome: "Cão do Inferno", nd: "3", tipo: "Espírito Grande",
          papel: "solo",
          resumo: "Estas feras agressivas são enormes, fortes e musculosas, com pelagem castanho-avermelhada como ferrugem, presas, garras e língua negras como",
          texto:
`Cão do Inferno ND 3
Estas feras agressivas são enormes, fortes e musculosas, com pelagem castanho-avermelhada como ferrugem, presas, garras e língua negras como carvão, e olhos de um vermelho ameaçador. Cães do inferno são oriundos de planos divinos e trazidos com frequência para Arton por conjuradores malignos.
Espírito Grande
Iniciativa +6, Percepção +4, faro, visão no escuro
Defesa 21, Fort +11, Ref +9, Von +7, imunidade a fogo, redução de dano 10/mágico, vulnerabilidade a frio
Pontos de Vida 95
Deslocamento 12m (8q)
Corpo a Corpo Mordida +14 (2d6+6 mais 2d6 fogo).
Sopro (padrão) O cão do inferno cospe fogo em um cone de 6m. Criaturas na área sofrem 4d6+4 pontos de dano de fogo (Ref CD 17 reduz à metade). Recarga (movimento).
For 6, Des 3, Con 4, Int –2, Sab 1, Car –2
Perícias Atletismo +9.
Tesouro 1d4 doses de essência abissal (CD 18 para extrair).`
        },
        {
          chave: "grifo", nome: "Grifo", nd: "3", tipo: "Monstro Grande",
          papel: "solo",
          resumo: "Grifos têm corpo e patas traseiras de leão, mas patas dianteiras, asas e cabeça de águia.",
          texto:
`Grifo ND 3
Grifos têm corpo e patas traseiras de leão, mas patas dianteiras, asas e cabeça de águia. Com 2,5 m de comprimento e envergadura de 7,5m, estão entre as criaturas mais majestosas de Arton. Também são alguns dos voadores mais rápidos que existem, superando até mesmo alguns dragões. Como as águias, habitam lugares altos, de onde mergulham guinchando para atacar suas presas. Em seu habitat natural, grifos vivem em bandos de um macho mais seu harém de 1d6 fêmeas. Quando criados desde filhotes, os grifos podem ser domesticados, servindo de montaria. Muitas tribos bárbaras das Montanhas Sanguinárias criam e cavalgam grifos. Um grifo domesticado será sempre fiel a seu tratador. Entretanto, eles adoram carne de cavalo, o que pode ser um problema quando são misturados com essas montarias mais comuns.
Monstro Grande
Iniciativa +9, Percepção +7, visão no escuro
Defesa 19, Fort +9, Ref +15, Von +4, imunidade a medo
Pontos de Vida 110
Deslocamento 12m (8q), voo 24m (16q)
Corpo a Corpo Mordida +14 (2d6+5) e duas garras +14 (1d6+5).
Bote (Completa) O grifo faz uma investida e ataca com sua mordida e suas duas garras. Os três ataques recebem o bônus de +2 da investida, mas devem ser feitos contra o mesmo alvo.
For 5, Des 4, Con 3, Int –4, Sab 2, Car –1
Tesouro Um ninho de grifo tem 25% de chance de conter 1d4 ovos no valor de T$ 2.500 cada.`
        },
        {
          chave: "basilisco", nome: "Basilisco", nd: "4", tipo: "Monstro Médio",
          papel: "solo",
          resumo: "Lagartos venenosos com dois metros de comprimento, basiliscos possuem o terrível poder de transformar seres vivos em pedra com o olhar.",
          texto:
`Basilisco ND 4
Lagartos venenosos com dois metros de comprimento, basiliscos possuem o terrível poder de transformar seres vivos em pedra com o olhar. Criaturas solitárias, vivem tanto em terra firme quanto na água.
Monstro Médio
Iniciativa +6, Percepção +5, visão no escuro
Defesa 23, Fort +10, Ref +9, Von +9, redução de dano 5
Pontos de Vida 145
Deslocamento 9m (6q), natação 9m (6q)
Corpo a Corpo Mordida +16 (2d8+12 mais veneno).
Olhar Petrificante No início de seu turno, cada personagem em alcance curto do basilisco deve fazer um teste de Reflexos (CD 18). Se passar, desvia o olhar. Se falhar, fica lento. Se já estiver lento, fica petrificado permanentemente. Um personagem pode fechar os olhos como uma reação para ficar imune a esta habilidade, mas sofrerá os efeitos de estar cego por uma rodada. Efeitos que removem paralisia revertem a petrificação. Metamorfose.
Veneno Peçonha concentrada (perde 1d12 pontos de vida por rodada durante 3 rodadas, Fort CD 18 reduz a duração para uma rodada).
For 4, Des 2, Con 4, Int –4, Sab 1, Car 0
Tesouro 1d4 doses de peçonha concentrada (CD 19 para extrair), couro de basilisco (CD 19 para extrair, conta como T$ 1.000 como matéria-prima para fabricar uma armadura superior).`
        },
        {
          chave: "ogro", nome: "Ogro", nd: "4", tipo: "Humanoide (gigante) Grande",
          papel: "solo",
          resumo: "Estes gigantes primitivos são solitários e mal-humorados, quase nunca encontrados em bandos.",
          texto:
`Ogro ND 4
Estes gigantes primitivos são solitários e mal-humorados, quase nunca encontrados em bandos. No entanto, por sua estupidez, são frequentemente convencidos a acompanhar bandidos e gnolls, em troca de diversão ou guloseimas. Também é comum encontrá-los servindo a bruxos ou cultistas. Enganar um ogro não é tarefa difícil, sendo muito mais recomendado que tentar vencê-lo pela força bruta. Mesmo quando enfurecidos, podem cair em provocações e ser levados a cometer erros.
Humanoide (gigante) Grande
Iniciativa +3, Percepção +1, visão na penumbra
Defesa 23, Fort +16, Ref +10, Von +0
Pontos de Vida 130
Deslocamento 9m (6q)
Corpo a Corpo Tacape +16 (1d12+18).
Burro Demais... O ogro sofre –5 em testes de Intuição e Vontade (já contabilizados na ficha).
...Para Morrer! Todo o dano de corte, impacto e perfuração que o ogro sofre é reduzido à metade.
For 7, Des 0, Con 4, Int –3, Sab –2, Car –2
Perícias Atletismo +12, Intuição –5.
Equipamento Tacape aumentado. Tesouro Padrão.`
        },
        {
          chave: "ursoCoruja", nome: "Urso-Coruja", nd: "4", tipo: "Monstro Grande",
          papel: "solo",
          resumo: "Este estranho ser lembra um grande urso, mas coberto de penas e com a cabeça de uma enorme coruja.",
          texto:
`Urso-Coruja ND 4
Este estranho ser lembra um grande urso, mas coberto de penas e com a cabeça de uma enorme coruja. A cor varia do castanho ao marrom, com bico em tom marfim fosco. A teoria mais aceita entre os estudiosos do Reinado diz que foram criados por um mago insano. Após matar seu criador, teriam fugido da torre dele e se espalhado pelos ermos. Ursos-coruja habitam os ermos de Arton, fazendo de florestas e cavernas seus covis. São criaturas agressivas, atacando qualquer coisa que se mova. Rasgam e bicam, tentando agarrar a vítima e fazê-la em pedaços, para então devorá-la. Quem sobrevive a encontros com a fera pode atestar a selvageria em seus olhos vermelhos.
Monstro Grande
Iniciativa +7, Percepção +5, faro, visão no escuro
Defesa 23, Fort +16, Ref +10, Von +5
Pontos de Vida 145
Deslocamento 12m (8q)
Corpo a Corpo Mordida +16 (1d8+5) e duas garras +15 (1d6+5).
Agarrar Aprimorado (Livre) Se o urso-coruja acerta um ataque de garra, pode fazer a manobra agarrar (teste +18).
For 7, Des 3, Con 5, Int –4, Sab 1, Car –2
Tesouro Nenhum.`
        },
        {
          chave: "serpe", nome: "Serpe", nd: "5", tipo: "Monstro Grande",
          papel: "solo",
          resumo: "Muitas vezes confundidos com dragões, estes monstros reptilianos alados são apenas feras com pouca inteligência e sem poderes mágicos.",
          texto:
`Serpe ND 5
Muitas vezes confundidos com dragões, estes monstros reptilianos alados são apenas feras com pouca inteligência e sem poderes mágicos. Ao contrário de dragões, não possuem braços — apenas as patas traseiras e asas, como pássaros. Ainda assim, são muito perigosos e agressivos, uma ameaça constante aos viajantes do Reinado e além. A ponta da longa cauda esconde um ferrão, contendo um dos venenos mais poderosos de que se tem notícia.
Monstro Grande
Iniciativa +5, Percepção +7, faro, visão no escuro
Defesa 24, Fort +10, Ref +16, Von +5, imunidade a paralisia
Pontos de Vida 200
Deslocamento 9m (6q), voo 18m (12q)
Corpo a Corpo Mordida +17 (2d6+12) e ferrão +17 (1d8+12 mais veneno).
Agarrar Aprimorado (Livre) Se a serpe acerta um ataque de mordida, pode fazer a manobra agarrar (teste +19).
Veneno Peçonha concentrada (perde 1d12 pontos de vida por rodada durante 3 rodadas, Fort CD 20 reduz a duração para uma rodada).
For 6, Des 1, Con 6, Int –2, Sab 1, Car –1
Tesouro 1d4 doses de peçonha concentrada (CD 20 para extrair).`
        },
      ],
      regras: [
        { titulo: "Bandidos",
          texto:
`Bandidos operam em estradas desertas, emboscando viajantes. Individualmente, não são ameaça para heróis aventureiros, mas em grande número podem ser perigosos.` },
        { titulo: "Guardas",
          texto:
`Onde há ordem e civilização, há algum tipo de guarda ou milícia. Embora guardas sejam mais comuns nas ruas de cidades e vilas, também podem ser encontrados patrulhando estradas ou guarnecendo postos de fronteira. Como aventureiros às vezes operam fora da lei, podem ter problemas com guardas.` },
        { titulo: "Centauros",
          texto:
`Este povo equino é recluso, desconfiado e territorial. Prestam reverência a Allihanna como caçadores das planícies, que percorrem em pequenos bandos, às vezes liderados por um xamã. Quando encontram viajantes, seu comportamento é imprevisível: podem se afastar com cautela, questioná-los com animosidade aberta ou mesmo atacar sem provocação.` },
        { titulo: "Gnolls",
          texto:
`De todos os humanoides monstruosos, o estridente povo-hiena é o mais propenso a preparar emboscadas em beira de estrada. Preguiçosos e covardes, lutam apenas quando estão em vantagem, fugindo ou rendendo-se assim que a situação muda. Sua cultura considera a rendição um ato de honra e bravura; sempre aceitam a rendição de um inimigo, esperando o mesmo em retorno. Muitos são rústicos e primitivos, enquanto outros aprenderam os modos da civilização, mostrando grande apreço por armas de fogo.` },
      ],
    },

    // ── ⚜ OS PURISTAS ───────────────────────────────────
    {
      chave: "puristas", nome: "Os Puristas", icone: "⚜", cor: "#9e2f2f",
      intro: "Em meio a tantos seres monstruosos que aterrorizam Arton, existe uma ameaça humana. Extremamente humana, no pior sentido. A Supremacia Purista é uma nação belicosa e fanática, determinada a exterminar todos os não humanos de Arton. Veja mais sobre os puristas no Capítulo 9: Mundo de Arton. A seguir estão fichas dos membros mais comuns dos batalhões.",
      comuns: { titulo: "Ódio Puro", aplicaSe: "Humanoide", nota: "Vale para todo purista humano — o Colosso Supremo é um construto e fica de fora." },
      fichas: [
        {
          chave: "recrutaPurista", nome: "Recruta Purista", nd: "1/2", tipo: "Humanoide (humano) Médio",
          papel: "lacaio",
          resumo: "A ralé do exército purista.",
          texto:
`Recruta Purista ND 1/2
A ralé do exército purista. São recrutados entre filhos de camponeses — ou entre órfãos, criminosos e outros “indesejados”. Recebem treinamento militar e equipamento abaixo dos padrões da Supremacia, mas ainda superior ao da maior parte do Reinado. São usados em missões menos importantes, como atacar aldeias com poucas defesas, proteger lugares não estratégicos e patrulhar estradas secundárias.
Humanoide (humano) Médio
Iniciativa +3, Percepção +0
Defesa 16, Fort +6, Ref +2, Von +0
Pontos de Vida 10
Deslocamento 6m (4q)
Corpo a Corpo Alabarda +8 (1d10+5, x3).
Lutar em Formação Se o recruta estiver adjacente a um aliado que também possua este poder, recebe +2 em testes de ataque e Defesa.
For 2, Des 1, Con 2, Int –1, Sab –1, Car 0
Equipamento Alabarda, cota de malha. Tesouro Nenhum.`
        },
        {
          chave: "soldadoPurista", nome: "Soldado Purista", nd: "1", tipo: "Humanoide (humano) Médio",
          papel: "lacaio",
          resumo: "A base dos batalhões puristas.",
          texto:
`Soldado Purista ND 1
A base dos batalhões puristas. São recrutados entre crianças da Supremacia (normalmente entre 10 a 12 anos) e enviados a um dos vários campos militares do reino. Lá aprendem a seguir ordens, a usar o equipamento dos batalhões e a seguir a doutrina purista. É um treino brutal e eficaz. Muitos morrem. Os que sobrevivem se tornam jovens fortes e enrijecidos, repletos de cicatrizes no corpo e na alma. Quando estão chegando à maioridade (15 a 17 anos), são enviados à cidade militar de Warton (ou a outro quartel) para concluir seu treinamento e serem alocados a um batalhão. A etapa final de sua formação é na verdade uma lavagem cerebral que transforma os futuros soldados em máquinas de matar, sem qualquer traço de compaixão ou remorso. Os soldados puristas, tragicamente, possuem pouco de sua tão aclamada humanidade.
Humanoide (humano) Médio
Iniciativa +4, Percepção +1
Defesa 20, Fort +10, Ref +4, Von +1
Pontos de Vida 20
Deslocamento 6m (4q)
Corpo a Corpo Espada bastarda +9 (1d10+9, 19).
À Distância Besta pesada +7 (1d12+4, 19).
Lutar em Formação Se o soldado estiver adjacente a um aliado que também possua este poder, recebe +2 em testes de ataque e Defesa.
For 3, Des 1, Con 3, Int 0, Sab –1, Car 0
Equipamento Besta pesada, escudo pesado, espada bastarda, meia armadura, virotes x10. Tesouro Metade.`
        },
        {
          chave: "sargentoMor", nome: "Sargento-mor", nd: "3", tipo: "Humanoide (humano) Médio",
          papel: "solo",
          resumo: "Sargentos da Supremacia são soldados veteranos e embrutecidos.",
          texto:
`Sargento-mor ND 3
Sargentos da Supremacia são soldados veteranos e embrutecidos. Por já terem provado seu valor em batalha, recebem o comando de um batalhão, formado por cem soldados. Apesar da promoção, ainda são mais guerreiros do que comandantes e lideram pelo exemplo, avançando à frente de suas tropas (para um oficial estrategista, veja Capitão-Baluarte, a seguir). Seja enfrentando tropas inimigas, seja enfrentando heróis aventureiros, sargentos nunca se abalam; confiam em seu treinamento, em sua experiência e em sua força bruta.
Humanoide (humano) Médio
Iniciativa +4, Percepção +3
Defesa 24, Fort +14, Ref +9, Von +5
Pontos de Vida 105
Deslocamento 6m (4q)
Corpo a Corpo Espada bastarda +14 (1d12+15, 19).
À Distância Besta pesada +12 (1d12+10, 19).
Lutar em Formação Se o sargento-mor estiver adjacente a um aliado que também possua este poder, recebe +2 em testes de ataque e Defesa.
Varrer (Livre) Uma vez por rodada, quando o sargento-mor faz um ataque corpo a corpo e reduz os pontos de vida do alvo para 0 ou menos, pode realizar um ataque adicional contra outra criatura dentro do seu alcance.
For 4, Des 1, Con 4, Int 0, Sab 0, Car 0
Equipamento Armadura completa, besta pesada, escudo pesado, espada bastarda aumentada certeira, virotes x20. Tesouro Padrão.`
        },
        {
          chave: "capelaoDeGuerra", nome: "Capelão de Guerra", nd: "4", tipo: "Humanoide (humano) Médio",
          papel: "especial",
          resumo: "Composto por adoradores fanáticos de Valkaria e Arsenal, o Templo da Pureza Divina prega que os humanos são a raça eleita e que os outros po",
          texto:
`Capelão de Guerra ND 4
Composto por adoradores fanáticos de Valkaria e Arsenal, o Templo da Pureza Divina prega que os humanos são a raça eleita e que os outros povos devem ser exterminados para “purificar” Arton. Os capelães são o braço armado do Templo e com frequência acompanham batalhões puristas em missão.
Humanoide (humano) Médio
Iniciativa +4, Percepção +7
Defesa 21, Fort +10, Ref +5, Von +16, imunidade a medo
Pontos de Vida 105
Deslocamento 6m (4q)
Pontos de Mana 25
Corpo a Corpo Martelo de guerra +14 (1d8+15, x3).
Magias O capelão de guerra lança magias como um clérigo de 5º nível (CD 18).
• Arma Mágica (Padrão, 5 PM) Uma arma do capelão se torna mágica, fornecendo +2 nos testes de ataque e rolagens de dano e +1d6 pontos de dano de fogo.
• Bênção (Padrão, 3 PM) Aliados em alcance curto recebem +2 em testes de ataque e rolagens de dano até o fim da cena.
• Curar Ferimentos (Padrão, 5 PM) Uma criatura adjacente cura 6d8+6 PV.
• Soco de Arsenal (Padrão, 5 PM) Uma criatura em alcance médio sofre 5d6+5 pontos de dano de impacto e é empurrada 3m na direção oposta (Fortitude reduz o dano à metade e evita o empurrão).
For 4, Des 0, Con 4, Int 1, Sab 3, Car –1
Perícias Misticismo +5, Religião +7.
Equipamento Armadura completa, escudo leve, martelo de guerra certeiro, símbolo sagrado. Tesouro Padrão.`
        },
        {
          chave: "capitaoBaluarte", nome: "Capitão-Baluarte", nd: "5", tipo: "Humanoide (humano) Médio",
          papel: "especial",
          resumo: "Esses oficiais de baixo escalão são escolhidos entre a jovem nobreza da Supremacia e treinados desde a infância para liderar.",
          texto:
`Capitão-Baluarte ND 5
Esses oficiais de baixo escalão são escolhidos entre a jovem nobreza da Supremacia e treinados desde a infância para liderar. São combatentes hábeis, mas seu verdadeiro talento está em liderar as investidas de seus subordinados, não em atacar pessoalmente.
Humanoide (humano) Médio
Iniciativa +4, Percepção +5
Defesa 33, Fort +15, Ref +5, Von +13
Pontos de Vida 115
Deslocamento 6m (4q)
Corpo a Corpo Espada longa +17 (1d8+8, 19).
Comandar (Padrão) Os aliados em alcance médio do capitão-baluarte recebem +4 em testes de ataque e rolagens de dano até o fim da rodada.
Formação Invencível Os aliados em alcance curto do capitão-baluarte recebem +2 na Defesa.
For 3, Des 0, Con 4, Int 3, Sab 1, Car 4
Perícias Cavalgar +4, Guerra +7, Nobreza +7.
Equipamento Armadura completa reforçada, escudo pesado reforçado, espada longa certeira. Tesouro Dobro.`
        },
        {
          chave: "cavaleiroDoLeopardoSangrento", nome: "Cavaleiro do Leopardo Sangrento", nd: "9", tipo: "Humanoide (humano) Médio",
          papel: "solo",
          alias: "Cavaleiro do Leopardo",   // grafia da Tabela 7-1
          resumo: "Considerados “puristas entre os puristas”, os cavaleiros da Ordem do Leopardo Sangrento são os mais fanáticos combatentes da Supremacia.",
          texto:
`Cavaleiro do Leopardo Sangrento ND 9
Considerados “puristas entre os puristas”, os cavaleiros da Ordem do Leopardo Sangrento são os mais fanáticos combatentes da Supremacia. A sinistra capa com o símbolo da ordem significa que passaram pelo terrível rito de iniciação — sacrificar um não humano com as próprias mãos. Além de atuar como guarda-costas para líderes puristas, os Leopardos também executam missões estratégicas de sabotagem e assassinato.
Humanoide (humano) Médio
Iniciativa +17, Percepção +15
Defesa 36, Fort +21, Ref +11, Von +17, imunidade a medo
Pontos de Vida 270
Deslocamento 9m (6q)
Pontos de Mana 58
Corpo a Corpo Espada bastarda +28 (3d6+15, 19).
Cavaleiro Místico O cavaleiro lança magias como um mago de 9º nível (CD 28). Ele pode lançar magias arcanas de armadura sem precisar de testes de Misticismo. Uma vez por rodada, quando usa a ação agredir para fazer ataques corpo a corpo, pode lançar uma magia como ação livre (pagando seu custo normal em PM).
• Concentração de Combate (Padrão, 3 PM) Até o final da cena, sempre que faz um ataque, o cavaleiro rola dois dados e usa o melhor resultado.
• Dissipar Magia (Padrão, 3 PM) O cavaleiro escolhe uma criatura, objeto ou esfera de 3m em alcance médio e faz um teste de Misticismo. Todas as magias no alvo escolhido com CD menor que o teste são dissipadas.
• Pele de Pedra (Padrão, 6 PM) Recebe RD 5 até o final da cena.
• Toque Chocante (Padrão, 9 PM) O cavaleiro faz um ataque corpo a corpo. Se acertar, além do dano normal, causa 8d8+8 pontos de dano de eletricidade.
• Velocidade (Padrão, 3 PM, sustentada) O cavaleiro pode executar uma ação padrão adicional por turno, que não pode ser usada para lançar magias.
For 5, Des 2, Con 4, Int 4, Sab 0, Car 2
Perícias Furtividade +8, Intimidação +17, Misticismo +19.
Equipamento Armadura completa reforçada, espada bastarda aumentada pungente de adamante. Tesouro Padrão.`
        },
        {
          chave: "colossoSupremo", nome: "Colosso Supremo", nd: "14", tipo: "Construto Colossal",
          papel: "solo",
          resumo: "Grandes como moinhos de vento, feitos de pedra e metal, estes engenhos infernais são forjados com técnicas que combinam magia e tecnologia goblin.",
          texto:
`Colosso Supremo ND 14
Grandes como moinhos de vento, feitos de pedra e metal, estes engenhos infernais são forjados com técnicas que combinam magia e tecnologia goblin. Plataformas em seus ombros abrigam soldados operando balistas, bem como oficiais que supervisionam e comandam as tropas no solo. Em seu interior, escravos goblins são responsáveis pela operação e reparos em tempo real. Além de sua espada titânica e canhões que disparam jatos de chamas, o colosso possui chaminés que expelem uma fumaça escura e venenosa; os tripulantes humanos usam máscaras protetoras, enquanto os goblins são resistentes ao veneno (e também fáceis de substituir).
Construto Colossal
Iniciativa +8, Percepção +9, visão no escuro
Defesa 46, Fort +31, Ref +19, Von +20, cura acelerada 20, redução de dano 10, resistência a magia +5
Pontos de Vida 675
Deslocamento 12m (8q)
Corpo a Corpo Espada titânica +39 (4d12+30, 19).
Balistas (Livre) O colosso possui duas balistas, uma em cada ombro. Cada balista é tripulada por soldados que a carregam e a disparam em rodadas alternadas (ataque +39, 6d8 pontos de dano de perfuração, crítico 19, alcance médio). É possível atacar as tripulações para impedir os disparos. Cada tripulação possui Defesa 26, 50 PV e usa os testes de resistência do colosso.
Fumos Tóxicos Uma criatura que comece seu turno em alcance curto do colosso perde 4d6 PV e fica enjoada (Fort CD 38 evita). Veneno.
Goblins Consertadores Goblins especialmente pequenos rastejam por dentro dos dutos do colosso fazendo reparos, sendo a fonte da cura acelerada do construto. Por estarem dentro do colosso, os goblins são imunes a dano, mas ainda podem ser afetados por efeitos mentais. Eles possuem Vontade +3 (mas recebem a resistência a magia do colosso) e, se forem afetados por qualquer condição, a cura acelerada deixa de funcionar.
Jato de Chamas (Movimento) O colosso dispara um jato de chamas que atinge um cone de 12m. Criaturas na área sofrem 8d8+10 pontos de dano de fogo (Ref CD 38 reduz à metade).
Passar por Cima (Completa) O colosso percorre até o dobro do seu deslocamento, passando por qualquer criatura Grande ou menor. Uma criatura atropelada sofre 6d8+15 pontos de dano de impacto (Ref CD 38 reduz à metade).
Varrer (Livre) Uma vez por rodada, quando o colosso supremo faz um ataque corpo a corpo e reduz os pontos de vida do alvo para 0 ou menos, pode realizar um ataque adicional contra outra criatura dentro do seu alcance.
For 15, Des –1, Con 10, Int —, Sab –5, Car –5
Tesouro 1d6 engrenagens (CD 29 para extrair; cada engrenagem conta como T$ 1.000 em matéria-prima para fabricar engenhocas).`
        },
      ],
      regras: [
        { titulo: "Ódio Puro",
          texto:
`Puristas passam por um processo de doutrinação no qual aprendem a obedecer ordens sem questionar e a odiar todas as raças não humanas. Um purista recebe +5 em testes de Vontade quando está seguindo ordens de um superior (qualquer purista com ND maior) e +2 em rolagens de dano contra humanoides não humanos.` },
      ],
    },

    // ── 💀 REINOS DOS MORTOS ─────────────────────────────
    {
      chave: "mortos", nome: "Reinos dos Mortos", icone: "💀", cor: "#5b5b6e",
      intro: "Mortos-vivos sempre existiram em Arton, temidos em masmorras assombradas, caçados por campeões dos deuses ou tolerados como servos de conjuradores prestigiados. No entanto, dois acontecimentos recentes aumentaram a incidência de mortos-vivos — a destruição de Ragnar, o Deus da Morte, deixando a própria morte sem uma divindade, e a conversão do Conde Ferren Asloth em um poderoso lich, com a subsequente criação de Aslothia, o Reino dos Mortos. Nem todos os mortos-vivos já foram seres vivos. Alguns são criados por magia, enquanto outros surgem por fenômenos sobrenaturais. Não importando sua origem, todos são movidos por energia negativa, oposta à energia positiva da vida. Muitos perdem qualquer inteligência, seguindo apenas instintos básicos (ou as ordens de seu criador), enquanto outros mantêm as memórias que tinham em vida.",
      fichas: [
        {
          chave: "zumbi", nome: "Zumbi", nd: "1/4", tipo: "Morto-vivo Médio",
          papel: "lacaio",
          subgrupo: "Zumbis",
          resumo: "Zumbis — O tipo mais comum e rudimentar de morto-vivo, pouco mais que um amontoado cambaleante de carne apodrecida.",
          texto:
`Zumbi ND 1/4
Morto-vivo Médio
Iniciativa –1, Percepção –1, visão no escuro
Defesa 11, Fort +3, Ref –1, Von –1
Pontos de Vida 20
Deslocamento 6m (4q)
Corpo a Corpo Mordida +7 (1d6+6).
Fraqueza Zumbi O zumbi sofre o dobro de dano de acertos críticos ou de ataques feitos contra seu cérebro (Defesa 21).
For 3, Des –1, Con 2, Int —, Sab –1, Car 0
Tesouro Nenhum.`
        },
        {
          chave: "turbaZumbi", nome: "Turba Zumbi", nd: "2", tipo: "Morto-vivo (bando) Grande",
          papel: "lacaio",
          subgrupo: "Zumbis",
          resumo: "Zumbis — O tipo mais comum e rudimentar de morto-vivo, pouco mais que um amontoado cambaleante de carne apodrecida.",
          texto:
`Turba Zumbi ND 2
Morto-vivo (bando) Grande
Iniciativa +1, Percepção +1, visão no escuro
Defesa 11, Fort +5, Ref +1, Von +1
Pontos de Vida 100
Deslocamento 6m (4q)
Corpo a Corpo [Bando] Mordida +17 (2d6+12).
Bando A turba é formada por um grupo de zumbis. Se um ataque da turba exceder a Defesa do inimigo por 10 ou mais, ele causa o dobro do dano. Se um ataque da turba errar, ele ainda assim causa metade do dano. A turba é imune a manobras de combate e efeitos que afetam apenas uma criatura e não causam dano, mas sofre 50% a mais de dano de efeitos de área, como Bola de Fogo. Um personagem com o poder Trespassar que acerte a turba pode usá-lo para fazer um ataque adicional contra ela (mas apenas uma vez por turno).
Fraqueza Zumbi A turba zumbi sofre o dobro de dano de acertos críticos ou de ataques feitos contra seus cérebros (Defesa 21).
For 3, Des –1, Con 3, Int —, Sab –1, Car 0
Tesouro Nenhum.`
        },
        {
          chave: "esqueleto", nome: "Esqueleto", nd: "2", tipo: "Morto-vivo Médio",
          papel: "lacaio",
          subgrupo: "Esqueletos",
          resumo: "Esqueletos — Basta um olhar atento para diferenciar um osteon destes mortos-vivos sem mente.",
          texto:
`Esqueleto ND 2
Morto-vivo Médio
Iniciativa +7, Percepção +3, visão no escuro
Defesa 19, Fort +3, Ref +7, Von +12, redução de corte, frio e perfuração 5
Pontos de Vida 14
Deslocamento 9m (6q)
Corpo a Corpo Espada longa +14 (2d8+12, 19).
For 5, Des 3, Con 0, Int —, Sab 0, Car –5
Equipamento Escudo pesado, espada longa. Tesouro Nenhum.`
        },
        {
          chave: "esqueletoDeElite", nome: "Esqueleto de elite", nd: "4", tipo: "Morto-vivo Médio",
          papel: "lacaio",
          subgrupo: "Esqueletos",
          resumo: "Esqueletos — Basta um olhar atento para diferenciar um osteon destes mortos-vivos sem mente.",
          texto:
`Esqueleto de elite ND 4
Morto-vivo Médio
Iniciativa +10, Percepção +4, visão no escuro
Defesa 25, Fort +4, Ref +10, Von +16, redução de corte, frio e perfuração 5
Pontos de Vida 60
Deslocamento 6m (4q)
Corpo a Corpo Espada longa +18 (2d8+15, 19, mais 2d8 trevas).
For 6, Des 4, Con 2, Int —, Sab 0, Car –5
Equipamento Escudo pesado, espada longa, meia armadura. Tesouro Nenhum.`
        },
        {
          chave: "falange", nome: "Falange", nd: "8", tipo: "Morto-vivo (bando) Grande",
          papel: "lacaio",
          subgrupo: "Esqueletos",
          resumo: "Esqueletos — Basta um olhar atento para diferenciar um osteon destes mortos-vivos sem mente.",
          texto:
`Falange ND 8
Morto-vivo (bando) Grande
Iniciativa +12, Percepção +6, visão no escuro
Defesa 25, Fort +6, Ref +12, Von +18, redução de corte, frio e perfuração 5
Pontos de Vida 300
Deslocamento 6m (4q)
Corpo a Corpo [Bando] Espada longa +28 (4d8+30, 19, mais 4d8 trevas).
Bando A falange é formada por um grupo de esqueletos. Se um ataque da falange exceder a Defesa do inimigo por 10 ou mais, ele causa o dobro do dano. Se um ataque da falange errar, ele ainda assim causa metade do dano. A falange é imune a manobras de combate e efeitos que afetam apenas uma criatura e não causam dano, mas sofre 50% a mais de dano de efeitos de área, como Bola de Fogo. Um personagem com o poder Trespassar que acerte a falange pode usá-lo para fazer um ataque adicional contra ela (mas apenas uma vez por turno).
For 6, Des 4, Con 2, Int —, Sab 0, Car –5
Equipamento Escudo pesado, espada longa, meia armadura (1d8 cada). Tesouro Nenhum.`
        },
        {
          chave: "aparicao", nome: "Aparição", nd: "5", tipo: "Morto-vivo Médio",
          papel: "solo",
          resumo: "Vistas à distância, estas criaturas feitas de pura sombra lembram vultos usando mantos esvoaçantes.",
          texto:
`Aparição ND 5
Vistas à distância, estas criaturas feitas de pura sombra lembram vultos usando mantos esvoaçantes. Dizem que são sombras separadas de seus antigos “donos”, agora odiando os vivos e a própria luz. Apesar de sua extrema furtividade na escuridão, podem ser detectadas por animais e crianças. Em combate, usam o toque sombrio para drenar a vida de seus oponentes, concentrando-se em uma vítima por vez.
Morto-vivo Médio
Iniciativa +10, Percepção +6, visão no escuro
Defesa 23, Fort +5, Ref +17, Von +11, incorpóreo
Pontos de Vida 110
Deslocamento Voo 18m (12q)
Corpo a Corpo Toque drenante +18 (3d8+6 trevas). Uma criatura viva atingida deve fazer um teste de Fortitude (CD 21). Se falhar, fica fraca e a aparição recebe 20 PV temporários cumulativos.
Vulnerabilidade à Luz do Dia Uma aparição exposta a luz solar natural fica debilitada.
For —, Des 6, Con 0, Int 0, Sab 2, Car 2
Perícias Furtividade +15.
Tesouro Nenhum.`
        },
        {
          chave: "necromante", nome: "Necromante", nd: "7", tipo: "Humanoide (elfo) Médio",
          papel: "especial",
          resumo: "Estes arcanistas especializados em magias de trevas e na conjuração de mortos-vivos nem sempre são vilões.",
          texto:
`Necromante ND 7
Estes arcanistas especializados em magias de trevas e na conjuração de mortos-vivos nem sempre são vilões. Alguns, bem-intencionados, acreditam firmemente que os mortos são uma força de trabalho valiosa, deixando os vivos livres para se dedicar a disciplinas mentais. Outros, no entanto, utilizam esqueletos e zumbis apenas como recursos para atingir objetivos perversos. Muitos são figuras de autoridade em Aslothia. Um necromante raramente comete a imprudência de ser encontrado sozinho — quase sempre estará acompanhado por esqueletos. Em combate, tentará se manter protegido por seus servos, enquanto usa magias para fortificá-los e incapacitar oponentes.
Humanoide (elfo) Médio
Iniciativa +9, Percepção +9, visão na penumbra
Defesa 23, Fort +7, Ref +14, Von +20
Pontos de Vida 180
Deslocamento 12m (8q)
Pontos de Mana 55
Corpo a Corpo Adaga +22 (1d4, 19, mais 1d8 trevas).
✦ Ergam-se! (Completa, 5 PM) O necromante conjura seis mortos-vivos em espaços desocupados em alcance curto. Eles agem a partir da próxima rodada do necromante, têm deslocamento 9m e podem gastar uma ação padrão para causar 2d8 pontos de dano de trevas em uma criatura adjacente. Os mortos-vivos têm For 3, Des 3, Defesa 25, 1 PV e as habilidades de mortos-vivos (veja página 284), falham automaticamente em qualquer teste oposto e desaparecem quando mortos ou ao fim da cena.
Sacrificar Servo (Reação) Uma vez por rodada, quando sofre dano, o necromante sacrifica um de seus mortos-vivos conjurados para reduzir esse dano a 0.
Magias O necromante lança magias como um mago de 7º nível (CD 26, 28 para necromancia*).
• Amedrontar* (Padrão, 7 PM) Animais e humanoides a escolha do necromante em alcance curto ficam apavorados por 1d4+1 rodadas e depois abalados (Vontade reduz para abalado).
• Armadura Arcana (Padrão, 7 PM) O necromante recebe +7 na Defesa por um dia.
• Crânio Voador* (Padrão, 6 PM) Um crânio de energia negativa causa 6d8+6 pontos de dano de trevas em uma criatura em alcance médio e deixa todas as criaturas a 3m do alvo abaladas (Fortitude reduz à metade e evita a condição).
• Toque Vampírico* (Padrão, 6 PM) O necromante toca em uma criatura e causa 10d6 pontos de dano de trevas (Fortitude reduz à metade) e recupera pontos de vida iguais à metade do dano causado.
For 0, Des 2, Con 1, Int 5, Sab 0, Car 0
Perícias Conhecimento +14, Misticismo +16.
Equipamento Adaga, essência de mana. Tesouro Dobro.`
        },
        {
          chave: "vampiro", nome: "Vampiro", nd: "12", tipo: "Morto-vivo Médio",
          papel: "solo",
          resumo: "Tornar-se vampiro costuma ser o objetivo de muitos necromantes em busca de mais poder ou clérigos de Tenebra que querem melhor servir à deusa.",
          texto:
`Vampiro ND 12
Tornar-se vampiro costuma ser o objetivo de muitos necromantes em busca de mais poder ou clérigos de Tenebra que querem melhor servir à deusa. Essa “dádiva” pode ser alcançada através de pactos, rituais ou maldições. Cada vampiro é único, mas todos partilham duas fraquezas principais: são vulneráveis à luz do sol e dependentes de sangue. Ainda que sejam temidos em todo o Reinado e além, muitos vampiros compõem a alta sociedade de Aslothia, onde são membros da nobreza (e cometem atrocidades impunemente).
Morto-vivo Médio
Iniciativa +15, Percepção +13, visão no escuro
Pontos de Vida 550
Defesa 45, Fort +12, Ref +26, Von +20, cura acelerada 10, redução de dano 10/luz.
Deslocamento 18m (12q), escalar 18m (12q)
Corpo a Corpo Espada longa x2 +36 (2d8+5, 17, mais 2d10 trevas) e garra +36 (2d6+25 mais 2d10 trevas).
✦ Dominação Vampírica (Padrão) O vampiro sussurra palavras de controle para um humanoide em alcance curto. A vítima fica confusa, enfeitiçada ou fascinada até o final da cena ou perde suas memórias da última hora, a escolha do vampiro (Von CD 29 evita). Uma criatura só pode ser alvo desta habilidade uma vez por cena.
Drenar Sangue (Padrão) O vampiro drena sangue de uma criatura viva que esteja agarrando; ele causa 6d6 pontos de dano de perfuração e recupera a mesma quantidade de PV. Uma criatura morta pelo vampiro desta forma se erguerá como um vampiro na próxima noite e deverá vencer um teste de Vontade oposto contra o vampiro ou ficará sob o controle dele até que ele a liberte ou seja destruído.
✦ Forma de Morcego (Padrão) O vampiro se transforma em um morcego. Ele se torna Minúsculo (+5 em Furtividade e –5 em testes de manobra) e recebe deslocamento de voo 12m. Seu equipamento é absorvido (retornando quando ele volta ao normal) e suas outras estatísticas não são alteradas. A transformação dura quanto tempo ele desejar, mas termina caso faça um ataque, lance uma magia ou sofra dano.
Presença Majestosa (Reação) Quando uma criatura ataca o vampiro, deve passar em um teste de Vontade (CD 29) ou não conseguirá machucá-lo e perderá a ação. Uma criatura que passe no teste de Vontade não é mais afetada por esta habilidade até o fim da cena.
Sensibilidade ao Sol Quando exposto a luz solar direta, o vampiro fica ofuscado e perde 6d6 PV por rodada.
For 6, Des 5, Con 5, Int 3, Sab 3, Car 6
Perícias Diplomacia +16, Enganação +16, Furtividade +25, Nobreza +13.
Equipamento Armadura completa delicada de mitral, espada longa precisa de mitral. Tesouro Dobro.`
        },
      ],
      regras: [
        { titulo: "Zumbis",
          texto:
`O tipo mais comum e rudimentar de morto-vivo, pouco mais que um amontoado cambaleante de carne apodrecida. Podem ser conjurados e controlados ou ocorrer espontaneamente em lugares amaldiçoados. Sozinhos, zumbis são adversários fáceis até para plebeus bem armados ou heróis novatos — mas uma grande horda pode surpreender e sobrepujar até mesmo aventureiros experientes.` },
        { titulo: "Esqueletos",
          texto:
`Basta um olhar atento para diferenciar um osteon destes mortos-vivos sem mente. Esqueletos se movem e lutam com agilidade, até empunhando armas, mas sem qualquer inteligência guiando seus atos — apenas seguem as ordens de seus criadores. Muitos necromantes, especialmente em Aslothia e Wynlla, usam esqueletos como servos e soldados. De fato, as temidas falanges — tropas de esqueletos de elite — são uma das principais linhas de defesa do Reino dos Mortos.` },
      ],
    },

    // ── 🪓 OS DUYSHIDAKK ─────────────────────────────────
    {
      chave: "duyshidakk", nome: "Os Duyshidakk", icone: "🪓", cor: "#8a5a1f",
      intro: "Com a manifestação da Flecha de Fogo e a realização da antiga profecia, a temida Aliança Negra não existe mais. Ainda assim, os povos goblinoides — ou duyshidakk — permanecem senhores absolutos do continente Lamnor e continuam tão perigosos para o Reinado quanto antes, ou talvez mais. Thwor Khoshkothruk, o Imperador Supremo, derrotou Ragnar e ascendeu como o novo Deus dos Goblinoides. Sem uma liderança central, os duyshidakk agora compõem vastos exércitos e hordas independentes (até mesmo reinos), com seus próprios chefes e generais. Outrora considerados “feras estúpidas”, os goblinoides possuem história e cultura complexas. Até mesmo seus ataques contra o Reinado encontram certa justificativa: no passado, a raça humana escolheu se aliar aos elfos contra os goblinoides, em vez de se unir ao povo com quem já compartilhavam o continente para repelir os colonizadores. Considerando os humanos traidores, estes duyshidakk não apenas lutam para preservar seu modo de vida, mas também buscam justiça (ou vingança) por esse crime milenar. Hordas inteiras ainda planejam invadir o Reinado para cumprir a visão do deus Thwor, “O Mundo Como Deve Ser”, essencialmente Arton tomado por caos e anarquia. Independentemente de tudo isso, muitas pessoas ainda veem os goblinoides como monstros. E goblinoides sem contato com a cultura de Lamnor podem mesmo não passar de bestas ferozes. Mas os duyshidakk buscam revelar a eles a verdade de Thwor.",
      fichas: [
        {
          chave: "goblinSalteador", nome: "Goblin Salteador", nd: "1/4", tipo: "Humanoide (goblin) Pequeno",
          papel: "lacaio",
          resumo: "Quase sempre subestimados e considerados “fracos”, estes goblins possuem uma ferocidade caótica, sendo máquinas insanas de esfaquear e estripar.",
          texto:
`Goblin Salteador ND 1/4
Quase sempre subestimados e considerados “fracos”, estes goblins possuem uma ferocidade caótica, sendo máquinas insanas de esfaquear e estripar. Um pequeno bando pode chacinar um povoado humano ou sobrepujar aventureiros novatos; em grandes números, atacando por todos os lados, conseguem derrubar até mesmo heróis experientes.
Humanoide (goblin) Pequeno
Iniciativa +5, Percepção +1, visão no escuro
Defesa 13, Fort +2, Ref +3, Von –1
Pontos de Vida 4
Deslocamento 9m (6q), escalada 9m (6q)
Corpo a Corpo Duas adagas +7 (1d4, 19).
Frenesi O goblin salteador recebe +2 em testes de ataque e rolagens de dano para cada outro goblin salteador adjacente ao seu alvo.
For 0, Des 3, Con 0, Int 0, Sab –1, Car –1
Equipamento Adagas x2. Tesouro Padrão.`
        },
        {
          chave: "hobgoblinSoldado", nome: "Hobgoblin Soldado", nd: "2", tipo: "Humanoide (hobgoblin) Médio",
          papel: "lacaio",
          resumo: "De estatura similar a humanos robustos, hobgoblins são os mais militaristas entre os duyshidakk.",
          texto:
`Hobgoblin Soldado ND 2
De estatura similar a humanos robustos, hobgoblins são os mais militaristas entre os duyshidakk. Contrariando o que se espera de “humanoides monstruosos”, suas armas e armaduras são de extrema qualidade, assim como suas estratégias de combate. Lutam de forma inteligente e organizada, dividindo suas forças entre infantaria na linha de frente (lutadores corpo a corpo em armaduras pesadas) e artilharia com arcos, bestas ou armas de pólvora dando apoio na retaguarda.
Humanoide (hobgoblin) Médio
Iniciativa +4, Percepção +1, visão no escuro
Defesa 19, Fort +12, Ref +7, Von +3
Pontos de Vida 18
Deslocamento 6m (4q)
Corpo a Corpo Espada longa +15 (1d8+15, 19).
À Distância Arco longo +11 (1d8+6, x3).
For 4, Des 2, Con 1, Int 0, Sab 0, Car –1
Perícias Ofício (armeiro) +2.
Equipamento Arco longo, cota de malha, escudo pesado, espada longa, flechas x20. Tesouro Padrão.`
        },
        {
          chave: "goblinEngenhoqueiro", nome: "Goblin Engenhoqueiro", nd: "3", tipo: "Humanoide (goblin) Pequeno",
          papel: "especial",
          resumo: "Tidos por muitos como pragas inúteis, os goblins cultivam uma longa “tradição” de transformar sucata em mecanismos e engenhocas de certa utilidade.",
          texto:
`Goblin Engenhoqueiro ND 3
Tidos por muitos como pragas inúteis, os goblins cultivam uma longa “tradição” de transformar sucata em mecanismos e engenhocas de certa utilidade. Ainda que imprevisíveis, estes aparatos se tornaram a marca registrada da raça e encontraram um espaço entre as lanças e escudos das hordas goblinoides.
Humanoide (goblin) Pequeno
Iniciativa +5, Percepção +2, visão no escuro
Defesa 19, Fort +3, Ref +15, Von +9
Pontos de Vida 74
Deslocamento 9m (6q), escalada 9m (6q)
Corpo a Corpo Adaga +8 (1d4+3, 19).
À Distância Besta leve +9 (1d8+3, 19).
Engenhocas (Padrão) O goblin engenhoqueiro faz um teste de Ofício (engenhoqueiro) contra CD 15 para ativar uma de suas engenhocas. Para cada engenhoca, a CD aumenta em +5 a cada nova ativação no mesmo dia. Se passar no teste, a engenhoca é ativada. Se falhar, ela enguiça e não pode mais ser usada nesta cena.
• Asa de Bambu. O engenhoqueiro recebe deslocamento de voo 12m até o fim da cena.
• Cospe-chamas. Produz um cone de chamas de 9m. Criaturas na área sofrem 6d6 pontos de dano de fogo e ficam em chamas (Reflexos CD 19 reduz o dano à metade e evita a condição).
• Gritador. Produz um ruído ensurdecedor. Todas as criaturas em alcance curto escolhidas pelo goblin engenhoqueiro sofrem −2 em testes de ataque e rolagens de dano até o fim da cena.
For 0, Des 2, Con 2, Int 3, Sab –1, Car 0
Perícias Furtividade +7, Ofício (engenhoqueiro) +10.
Equipamento Adaga, besta leve, instrumentos de Ofício (engenhoqueiro), virotes x20. Tesouro Padrão.`
        },
        {
          chave: "arautoDeThwor", nome: "Arauto de Thwor", nd: "4", tipo: "Humanoide (humano) Médio",
          papel: "solo",
          resumo: "Após conhecer a história de sofrimento e opressão dos duyshidakk, não é espantoso que outros povos experimentem afinidade com sua causa.",
          texto:
`Arauto de Thwor ND 4
Após conhecer a história de sofrimento e opressão dos duyshidakk, não é espantoso que outros povos experimentem afinidade com sua causa. Hoje Thwor não é servido apenas por goblinoides, mas também por humanos e outras raças! Aceitos como irmãos pelos duyshidakk e abraçando suas tradições, estes clérigos assumem a missão sagrada de criar O Mundo Como Deve Ser e transformar Arton na utopia selvagem pregada por seu deus.
Humanoide (humano) Médio
Iniciativa +5, Percepção +8
Defesa 23, Fort +10, Ref +4, Von +16
Pontos de Vida 135
Deslocamento 6m (4q)
Pontos de Mana 26
Corpo a Corpo Machado de guerra +16 (3d6+12, x3).
O Mundo como Ele É (Reação) Quando erra um ataque, o arauto de Thwor pode repetir o teste de ataque. Ele pode usar esta habilidade uma vez contra cada oponente a cada cena.
Magias O arauto lança magias como um clérigo de Thwor de 4º nível (CD 18).
• Amedrontar (Padrão, 3 PM) Um animal ou humanoide em alcance curto fica apavorado por 1d4+1 rodadas e depois abalado (Vontade reduz para abalado apenas).
• Curar Ferimentos (Padrão, 4 PM) Uma criatura adjacente cura 5d8+5 PV.
• Perdição (Padrão, 1 PM) Criaturas escolhidas em alcance curto sofrem –1 em testes de ataque e rolagens de dano até o fim da cena.
For 3, Des 1, Con 3, Int 0, Sab 4, Car 0
Perícias Intimidação +9, Religião +8.
Equipamento Machado de guerra, símbolo sagrado de Thwor.
Tesouro Padrão.`
        },
        {
          chave: "hobgoblinMagoDeBatalha", nome: "Hobgoblin Mago de Batalha", nd: "5", tipo: "Humanoide (hobgoblin) Médio",
          papel: "especial",
          resumo: "No passado remoto, durante a Infinita Guerra contra os elfos, todos os hobgoblins odiavam e desprezavam magia — justamente por ser “coisa de elfo”.",
          texto:
`Hobgoblin Mago de Batalha ND 5
No passado remoto, durante a Infinita Guerra contra os elfos, todos os hobgoblins odiavam e desprezavam magia — justamente por ser “coisa de elfo”. Mais tarde, no entanto, integrar a Aliança Negra e derrotar Lenórienn trouxe uma atitude mais pragmática. Após pilharem os tomos arcanos élficos, muitos hobgoblins passariam a dominar conjurações com efeitos destrutivos.
Humanoide (hobgoblin) Médio
Iniciativa +5, Percepção +4, visão no escuro
Defesa 17, Fort +11, Ref +5, Von +17
Pontos de Vida 120
Deslocamento 9m (6q)
Pontos de Mana 35
Corpo a Corpo Espada longa +14 (1d8+3, 19).
Arcano de Batalha O hobgoblin mago de batalha soma sua Inteligência (+4) nas rolagens de dano com magias.
Magias O hobgoblin lança magias como um mago de 5º nível (CD 22).
• Amedrontar (Padrão, 3 PM) Um animal ou humanoide em alcance curto fica apavorado por 1d4+1 rodadas e depois abalado (Vontade reduz para abalado apenas).
• Armadura Arcana (Padrão, 5 PM) O hobgoblin recebe +6 na Defesa por um dia.
• Bola de Fogo (Padrão, 5 PM) O hobgoblin cria uma poderosa explosão em alcance médio que causa 8d6+5 pontos de dano de fogo em todas as criaturas em um raio de 6m (Reflexos reduz à metade).
• Concentração de Combate (Livre, 1 PM) Quando faz um ataque, o hobgoblin rola dois dados e usa o melhor resultado.
• Toque Vampírico (Padrão, 5 PM) O hobgoblin faz um ataque com sua espada longa. Se acertar, além do dano da arma ele causa 6d6+5 pontos de dano de trevas e recupera pontos de vida iguais à metade desse dano de trevas.
For 3, Des 1, Con 3, Int 4, Sab 0, Car –1
Perícias Guerra +9, Misticismo +9, Ofício (armeiro) +11.
Equipamento Espada longa, essência de mana. Tesouro Padrão.`
        },
        {
          chave: "engenhoDeGuerraGoblin", nome: "Engenho de Guerra Goblin", nd: "6", tipo: "Construto Enorme",
          papel: "solo",
          resumo: "Elevando a capacidade mecânica e inventiva dos goblins a novos patamares, o engenho de guerra goblin é uma geringonça de terror e imprevisibilidade.",
          texto:
`Engenho de Guerra Goblin ND 6
Elevando a capacidade mecânica e inventiva dos goblins a novos patamares, o engenho de guerra goblin é uma geringonça de terror e imprevisibilidade. Polias, roldanas, engrenagens, fumaça e uma pitada de magia se misturam sob as mãos questionavelmente hábeis de engenhoqueiros goblins para produzir uma máquina de guerra capaz de mudar os rumos de uma batalha. Ou explodir tentando... Um engenho de guerra parece uma enorme carroça de madeira e ferro sem cavalos, com três pares de grandes rodas. Uma cúpula de metal na parte superior do veículo abriga o artilheiro que opera sua arma principal, um poderoso canhão de raios. Outras armas menores se projetam de suas laterais, operadas freneticamente pela tripulação goblin, que se reveza entre pilotar o aparelho e efetuar reparos. Um engenho de guerra pode ser um trunfo no campo de batalha ou apenas uma grande fonte de barulho e fumaça.
Construto Enorme
Iniciativa +3, Percepção +5, visão no escuro
Defesa 25, Fort +18, Ref +6, Von +12, redução de dano 10
Pontos de Vida 246
Deslocamento 12m (8q)
Arsenal de Engenhocas (Padrão) O engenho de guerra possui várias engenhocas operadas por sua frenética tripulação. Sempre que esta habilidade é usada, role 1d6 quatro vezes. O resultado de cada dado indica qual engenhoca é ativada. Resultados repetidos são desperdiçados — isso significa que mais de um goblin tentou usar uma mesma engenhoca, perdendo sua ação.
1) Canhão elétrico. O engenho dispara um raio em uma linha com alcance médio. Criaturas na área sofrem 8d8 pontos de dano de eletricidade (Ref CD 22 reduz à metade).
2) Balestra ácida. O engenho dispara um virote de ácido em uma criatura em alcance médio. O alvo sofre 8d6 pontos de dano de ácido, mais 4d6 pontos de dano de ácido no início de seu próximo turno (Ref CD 22 reduz à metade e evita o dano subsequente).
3) Foles. O engenho dispara labaredas em um cone de alcance curto. Criaturas na área sofrem 6d6 pontos de dano de fogo e ficam em chamas (Ref CD 23 reduz à metade e evita as chamas).
4) Lâmina giratória. O engenho faz um ataque corpo a corpo em cada criatura adjacente (ataque +20, dano 4d6+10 corte, 19).
5) Poça de óleo. O engenho vaza óleo escorregadio e inflamável. Todas as criaturas em alcance curto ficam vulneráveis a fogo até se limparem (o que exige uma ação completa) e caídas (Ref CD 22 evita as duas condições).
6) Reparos emergenciais. O engenho recupera 20 PV.
Tripulação Se o engenho for destruído, 1d6 goblins salteadores escapam de seus escombros e surgem no início da rodada seguinte.
For 10, Des 0, Con 7, Int —, Sab 0, Car –5
Tesouro Padrão.`
        },
        {
          chave: "devoradorDeMedos", nome: "Devorador de Medos", nd: "8", tipo: "Humanoide (bugbear) Médio",
          papel: "solo",
          resumo: "Bugbears são crueldade e violência em forma de carne.",
          texto:
`Devorador de Medos ND 8
Bugbears são crueldade e violência em forma de carne. Para estas criaturas, o maior prazer é aterrorizar e o segundo maior é matar (após aterrorizar). Entre estes seres assustadores, os mestres absolutos do pavor são os devoradores de medos. Devoradores de medos podem literalmente farejar o medo, algo tão intoxicante para eles quanto o álcool é para humanos. Isso os leva a acuar vítimas apavoradas, até o momento em que decidem desferir o golpe mortal. Não há prazer em golpear o guarda de milícia pelas costas, antes que ele perceba qualquer perigo; o devorador de medos prefere abalar a coragem da vítima aos poucos, rosnando ameaças nas sombras, fazendo-a procurar inutilmente em volta, até fugir em pânico. Então ele ataca. E mata.
Humanoide (bugbear) Médio
Iniciativa +11, Percepção +9, faro, visão no escuro
Defesa 31, Fort +21, Ref +15, Von +8, imunidade a medo
Pontos de Vida 325
Deslocamento 9m (6q)
Corpo a Corpo Machado de guerra x2 +26 (1d12+20, x3).
Apavorar (Movimento) O devorador de medos faz um teste de Intimidação oposto pela Vontade de todas as criaturas a sua escolha em alcance médio. Criaturas que falhem ficam abaladas pela cena; criaturas que falhem por 10 ou mais ficam apavoradas por 1d4 rodadas e abaladas pela cena. O devorador não pode usar esta habilidade mais de uma vez na mesma criatura na mesma cena.
Artesão do Medo Quando faz um teste de Intimidação, o devorador rola dois dados e usa o melhor resultado.
Medo Inebriante O devorador sofre metade do dano de ataques e efeitos de criaturas abaladas ou apavoradas. Além disso, enquanto estiver em alcance médio de uma criatura abalada ou apavorada, ele recebe um bônus em testes de perícia e rolagens de dano corpo a corpo igual à penalidade causada pela condição. Quando acerta um ataque corpo a corpo em uma dessas criaturas, o devorador recebe uma quantidade de PV temporários igual a essa penalidade.
For 5, Des 3, Con 3, Int 0, Sab 1, Car 0
Perícias Furtividade +13, Intimidação +14.
Equipamento Machado de guerra cruel. Tesouro Metade.`
        },
        {
          chave: "sombraDeThwor", nome: "Sombra de Thwor", nd: "9", tipo: "Humanoide (hobgoblin) Médio",
          papel: "especial",
          resumo: "Muitas vezes lembrados por sua força física e aparência brutal, hobgoblins são também humanoides ágeis e furtivos, capazes de agir confortav",
          texto:
`Sombra de Thwor ND 9
Muitas vezes lembrados por sua força física e aparência brutal, hobgoblins são também humanoides ágeis e furtivos, capazes de agir confortavelmente nas sombras. Dentre estes, os sombras de Thwor são os mais habilidosos espiões e assassinos. Seja no comando astuto de forças goblinoides, seja em missões solo para eliminar alguma figura de destaque, eles seguem enganando e confundindo os humanos, que esperam enfrentar um monstro rosnador — e acabam apunhalados por um matador silencioso.
Humanoide (hobgoblin) Médio
Iniciativa +17, Percepção +10, visão no escuro
Defesa 33, Fort +15, Ref +21, Von +9
Pontos de Vida 295
Deslocamento 9m (6q)
Corpo a Corpo Duas machadinhas +27 (1d6+12, x3, mais veneno).
À Distância Duas machadinhas +27 (1d6+12, x3, mais veneno).
Assassinar (Movimento) O sombra de Thwor analisa uma criatura em alcance curto. Em seu primeiro Ataque Furtivo que causar dano a ela até o fim do seu próximo turno, ele dobra os dados de dano do Ataque Furtivo.
Ataque Furtivo Uma vez por rodada, o sombra causa +7d6 pontos de dano com ataques corpo a corpo, ou à distância em alcance curto, contra alvos desprevenidos ou que ele esteja flanqueando.
Evasão Aprimorada Quando sofre um efeito que permite um teste de Reflexos para reduzir o dano à metade, o sombra não sofre dano algum se passar e sofre apenas metade do dano se falhar.
Um com as Sombras O sombra nunca fica surpreendido ou flanqueado e não sofre penalidades por se mover com seu deslocamento normal enquanto usa Furtividade.
Veneno Perde 2d12 pontos de vida por rodada durante 3 rodadas (Fort CD 26 reduz para uma rodada).
For 5, Des 5, Con 5, Int 2, Sab 2, Car 0
Perícias Acrobacia +15, Atletismo +13, Furtividade +18, Intimidação +9, Ladinagem +15, Ofício (armeiro) +12.
Equipamento Couro batido ajustado, machadinhas atrozes x4, peçonha potente x1d4. Tesouro Padrão.`
        },
      ],
      regras: [
      ],
    },

    // ── 🐍 OS SSZZAAZITAS ────────────────────────────────
    {
      chave: "sszzaazitas", nome: "Os Sszzaazitas", icone: "🐍", cor: "#3f7a5a",
      intro: "Ainda que nenhum devoto de Sszzaas seja honesto, nem todos são malignos. De fato, alguns até empregam seus poderes para promover o bem, ajudar aventureiros — até mesmo como uma forma de “trair” sua divindade, ainda seguindo suas obrigações e restrições. Da mesma forma, nem todos os devotos deste deus são sszzaazitas (mesmo que pouquíssimos em Arton vejam qualquer diferença). Este título é reservado a um grupo seleto de cultistas, os mais fanáticos, manipuladores e perigosos de todos. Se realmente fazem parte de uma organização coesa, ou estão competindo entre si pelo favoritismo do Senhor das Víboras, difícil dizer — talvez ambas as teorias sejam verdadeiras. Seus reais números também são desconhecidos; parecem capazes de influenciar cada cidade, cada palácio, cada regente, sem que se consiga realmente encontrar seus membros. Sszzazitas não são apenas clérigos, mas qualquer criatura que siga os preceitos de Sszzaas ao trair, torturar e matar em proveito próprio. São servidos por uma variedade de criaturas relacionadas a serpentes. Os cultistas utilizam esses monstros como força de combate, enquanto eles mesmos agem nas sombras.",
      fichas: [
        {
          chave: "cascavel", nome: "Cascavel", nd: "1/4", tipo: "Animal Minúsculo",
          papel: "lacaio",
          subgrupo: "Cobras",
          resumo: "Cobras — Não apenas um animal sagrado para os sszzaazitas, mas o próprio símbolo de sua divindade, será praticamente certa a existência de serpentes",
          texto:
`Cascavel ND 1/4
Animal Minúsculo
Iniciativa +5, Percepção +3, faro, visão na penumbra
Defesa 13, Fort +2, Ref +5, Von –1
Pontos de Vida 2
Deslocamento 6m (4q), escalar 6m (4q), natação 9m (6q)
Corpo a Corpo Mordida +7 (1d4 mais veneno).
Veneno Perde 1d12 pontos de vida (Fort CD 16 evita).
For –2, Des 3, Con 0, Int –5, Sab 0, Car –4
Perícias Furtividade +12.
Tesouro 1 dose de peçonha comum (CD 15 para extrair).`
        },
        {
          chave: "jiboia", nome: "Jiboia", nd: "1/2", tipo: "Animal Médio",
          papel: "lacaio",
          subgrupo: "Cobras",
          resumo: "Cobras — Não apenas um animal sagrado para os sszzaazitas, mas o próprio símbolo de sua divindade, será praticamente certa a existência de serpentes",
          texto:
`Jiboia ND 1/2
Animal Médio
Iniciativa +5, Percepção +3, faro, visão na penumbra
Defesa 14, Fort +3, Ref +5, Von +0
Pontos de Vida 14
Deslocamento 6m (4q), escalar 6m (4q), natação 9m (6q)
Corpo a Corpo Mordida +9 (1d6+4).
Agarrar Aprimorado (Livre) Se a jiboia acerta um ataque de mordida, pode fazer a manobra agarrar (teste +9).
Constrição (Livre) No início de cada um de seus turnos, a jiboia causa 2d6+4 pontos de dano de impacto na criatura que estiver agarrando.
For 2, Des 3, Con 1, Int –5, Sab 1, Car –4
Perícias Furtividade +7.
Tesouro Nenhum.`
        },
        {
          chave: "naja", nome: "Naja", nd: "1", tipo: "Animal Pequeno",
          papel: "lacaio",
          subgrupo: "Cobras",
          resumo: "Cobras — Não apenas um animal sagrado para os sszzaazitas, mas o próprio símbolo de sua divindade, será praticamente certa a existência de serpentes",
          texto:
`Naja ND 1
Animal Pequeno
Iniciativa +8, Percepção +3, faro, visão na penumbra
Defesa 17, Fort +5, Ref +10, Von +1
Pontos de Vida 13
Deslocamento 6m (4q), escalar 6m (4q), natação 6m (4q)
Corpo a Corpo Mordida +12 (1d4 mais veneno).
Veneno Perde 1d12 pontos de vida durante 3 rodadas (Fort CD 18 reduz para uma rodada).
For –1, Des 4, Con 1, Int –5, Sab 0, Car –4
Perícias Furtividade +10.
Tesouro 1 dose de peçonha concentrada (CD 16 para extrair).`
        },
        {
          chave: "sucuri", nome: "Sucuri", nd: "3", tipo: "Animal Grande",
          papel: "solo",
          subgrupo: "Cobras",
          resumo: "Cobras — Não apenas um animal sagrado para os sszzaazitas, mas o próprio símbolo de sua divindade, será praticamente certa a existência de serpentes",
          texto:
`Sucuri ND 3
Animal Grande
Iniciativa +5, Percepção +4, faro, visão na penumbra
Defesa 19, Fort +9, Ref +15, Von +3
Pontos de Vida 88
Deslocamento 6m (4q), escalar 9m (6q), natação 9m (6q)
Corpo a Corpo Mordida +18 (2d6+14).
Agarrar Aprimorado (Livre) Se a sucuri acerta um ataque de mordida, pode fazer a manobra agarrar (teste +20).
Constrição (Livre) No início de cada um de seus turnos, a sucuri causa 4d6+14 pontos de dano de impacto na criatura que estiver agarrando.
For 6, Des 2, Con 4, Int –5, Sab 1, Car –4
Perícias Furtividade +8.
Tesouro Nenhum.`
        },
        {
          chave: "nagahGuardiao", nome: "Nagah Guardião", nd: "3", tipo: "Humanoide (nagah) Médio",
          papel: "lacaio",
          subgrupo: "Nagah",
          resumo: "Nagah — Estes seres de torso humanoide e corpo de serpente foram outrora considerados uma raça de devotos de Allihanna.",
          texto:
`Nagah Guardião ND 3
Humanoide (nagah) Médio
Iniciativa +6, Percepção +3, visão na penumbra
Defesa 21, Fort +6, Ref +11, Von +9, resistência a veneno +5
Pontos de Vida 45
Deslocamento 9m (6q)
Corpo a Corpo Duas cimitarras +14 (1d6+6, 18) e cauda +14 (1d6+6).
Fraquezas Ofídias O nagah guardião sofre 1 ponto de dano adicional para cada dado de dano de frio e –5 em testes de resistência contra Músicas de Bardo.
For 4, Des 3, Con 2, Int 0, Sab 0, Car 0
Perícias Enganação +4, Furtividade +6.
Equipamento Cimitarras x2. Tesouro Padrão.`
        },
        {
          chave: "nagahMistica", nome: "Nagah Mística", nd: "6", tipo: "Humanoide (nagah) Médio",
          papel: "especial",
          subgrupo: "Nagah",
          resumo: "Nagah — Estes seres de torso humanoide e corpo de serpente foram outrora considerados uma raça de devotos de Allihanna.",
          texto:
`Nagah Mística ND 6
Humanoide (nagah) Médio
Iniciativa +8, Percepção +6, visão na penumbra
Defesa 20, Fort +6, Ref +12, Von +18, resistência a veneno +5
Pontos de Vida 160
Deslocamento 9m (6q)
Pontos de Mana 35
Corpo a Corpo Adaga +18 (1d6+6, 19) e cauda +18 (1d6+6).
Magia Acelerada (Livre, 4 PM) Uma vez por rodada, quando lança uma magia com execução de ação completa ou menor, a nagah mística muda a execução dela para livre.
Magias A nagah lança magias como uma maga de 8º nível (CD 24).
• Imagem Espelhada (Padrão, 5 PM) Cinco cópias ilusórias da nagah surgem ao seu redor, concedendo a ela +10 na Defesa. Cada vez que um ataque erra a nagah, uma das cópias desaparece e o bônus na Defesa diminui em 2.
• Relâmpago (Padrão, 5 PM) A nagah causa 8d6 pontos de dano de eletricidade em todas as criaturas em uma linha com alcance médio (Reflexos reduz à metade).
• Velocidade (Padrão, 3 PM, sustentada) A nagah pode executar uma ação padrão adicional por turno, que não pode ser usada para lançar magias.
Fraquezas Ofídias Como o nagah guardião.
For 1, Des 3, Con 2, Int 4, Sab 2, Car 2
Perícias Conhecimento +10, Enganação +9, Furtividade +10, Intuição +9, Misticismo +10.
Equipamento Adaga, essência de mana. Tesouro Padrão.`
        },
        {
          chave: "cultistaDeSszzaas", nome: "Cultista de Sszzaas", nd: "7", tipo: "Monstro (medusa) Médio",
          papel: "especial",
          resumo: "Mesmo com sua religião sendo proibida no Reinado, todos já ouviram falar de algum grupo sszzaazita escondido nas sombras de mansões sinistra",
          texto:
`Cultista de Sszzaas ND 7
Mesmo com sua religião sendo proibida no Reinado, todos já ouviram falar de algum grupo sszzaazita escondido nas sombras de mansões sinistras ou tavernas discretas, tecendo planos dentro de planos, cometendo crimes para seu patrono maléfico. Encabeçando tais cabalas sombrias, quase sempre haverá um devoto de Sszzaas, manipulando seus asseclas, prometendo poder e riquezas, quando na verdade apenas executa os ditames do Grande Corruptor.
Monstro (medusa) Médio
Iniciativa +11, Percepção +12, visão no escuro
Defesa 29, Fort +7, Ref +14, Von +20, resistência a veneno +5
Pontos de Vida 160
Deslocamento 9m (6q)
Pontos de Mana 40
Corpo a Corpo Adaga +22 (1d4+4, 19, mais veneno).
Ataque Furtivo Uma vez por rodada, a cultista de Sszzaas causa +5d6 pontos de dano com ataques corpo a corpo, ou à distância em alcance curto, contra alvos desprevenidos ou que ela esteja flanqueando.
Magias A cultista lança magias como uma clériga de Sszzaas de 7º nível (CD 26). 1º — Arma Mágica, Comando, Curar Ferimentos, Escuridão; 2º — Enxame de Pestes, Miasma Mefítico.
Olhar Atordoante (Movimento) Uma criatura em alcance curto fica atordoada por uma rodada (apenas uma vez por cena; Fort CD 26 evita).
Veneno Perde 2d12 pontos de vida durante 3 rodadas (Fort CD 26 reduz para uma rodada).
For 0, Des 2, Con 0, Int 4, Sab 4, Car 5
Perícias Enganação +20, Intuição +20, Religião +17.
Equipamento Adaga certeira, couraça, escudo leve, símbolo sagrado de Sszzaas. Tesouro Padrão.`
        },
        {
          chave: "hidra", nome: "Hidra", nd: "11", tipo: "Monstro Enorme",
          papel: "solo",
          resumo: "Esta monstruosidade reptiliana tem a aparência de um lagarto imenso e obeso, coberto de escamas verdes ou marrons, com cinco cabeças enciman",
          texto:
`Hidra ND 11
Esta monstruosidade reptiliana tem a aparência de um lagarto imenso e obeso, coberto de escamas verdes ou marrons, com cinco cabeças encimando pescoços longos e flexíveis como serpentes. Hidras são criaturas solitárias e normalmente habitam pântanos, onde se escondem imersas em água ou lama, esperando por uma presa. Porém, às vezes são capturadas por sszzaazitas, sendo usadas como guardiãs de lugares importantes ou armas de guerra. Seja como for, a hidra é um monstro voraz, agressivo e difícil de matar; quando uma de suas cabeças é cortada, outras duas nascem no lugar!
Monstro Enorme
Iniciativa +9, Percepção +9, faro, visão no escuro
Defesa 35, Fort +24, Ref +18, Von +9, cura acelerada 100
Pontos de Vida 550
Deslocamento 9m (6q), natação 9m (6q)
Corpo a Corpo Cinco mordidas +34 (3d6+16).
Cortar Cabeças As cabeças da hidra são seu ponto fraco e é possível atacá-las diretamente. Atacar uma cabeça impõe uma penalidade de –2 no teste de ataque. Se o ataque acertar e causar pelo menos 25 pontos de dano de corte, a cabeça é decepada e a hidra perde um ataque de mordida. Entretanto, 1d4 rodadas após a cabeça ser decepada, duas novas nascem em seu lugar (a hidra pode ter até dez cabeças). Para impedir o nascimento de novas cabeças é necessário cauterizar o pescoço. Isso exige causar 25 pontos de dano de ácido ou fogo na hidra. Se todas as cabeças da hidra forem decepadas e todos seus pescoços forem cauterizados, ela morre.
For 10, Des 0, Con 10, Int –4, Sab 0, Car –1
Perícias Furtividade +4 (+14 em pântanos).
Tesouro Padrão.`
        },
        {
          chave: "lagash", nome: "Lagash", nd: "13", tipo: "Monstro Enorme",
          papel: "solo",
          resumo: "Esta serpente gigantesca é considerada sagrada pelos sszzaazitas — embora isso não impeça cultistas do Deus da Traição de usarem-na para pro",
          texto:
`Lagash ND 13
Esta serpente gigantesca é considerada sagrada pelos sszzaazitas — embora isso não impeça cultistas do Deus da Traição de usarem-na para proteger tesouros valiosos. O corpo de um lagash é coberto de escamas negras, seus olhos brilham amarelos e a bocarra verte veneno... e cobras! Lagash são pouco conhecidos no Reinado — além de habitar apenas selvas profundas e subterrâneos, quem encontra um desses monstros normalmente não sobrevive para contar a história.
Monstro Enorme
Iniciativa +19, Percepção +11, faro, visão no escuro
Defesa 41, Fort +26, Ref +20, Von +13, imunidade a efeitos de movimento e veneno
Pontos de Vida 660
Deslocamento 12m (8q), escalar 12m (8q), natação 12m (8q)
Corpo a Corpo Mordida +37 (4d12+28 mais veneno).
Agarrar Aprimorado (Livre) Se o lagash acerta um ataque de mordida, pode fazer a manobra agarrar (teste +42).
Constrição (Livre) No início de cada um de seus turnos, o lagash causa 6d12+28 pontos de dano de impacto na criatura que estiver agarrando.
Crias de Sszzaas (Movimento) O lagash cospe 2d6 serpentes em espaços desocupados em alcance curto. Elas agem a partir da próxima rodada do lagash, têm deslocamento 9m (normal, de escalada e de natação) e podem gastar uma ação padrão para causar 1d6 pontos de dano de perfuração em uma criatura adjacente. As serpentes têm For –1, Des 2, Defesa nula (são acertadas automaticamente) e 1 PV, falham automaticamente em qualquer teste oposto e desaparecem quando mortas ou ao fim da cena. Recarga (movimento).
Cuspe Venenoso (Padrão) O lagash cospe veneno em um cone de 9m. Criaturas na área perdem 6d12 pontos de vida e ficam cegas por 1d4 rodadas (Fort CD 35 reduz à metade e evita a cegueira).
Veneno Perde 4d12 pontos de vida por rodada durante 5 rodadas (Fort CD 35 reduz para uma rodada).
For 11, Des 4, Con 9, Int –3, Sab 2, Car –2
Perícias Furtividade +17.
Tesouro Padrão.`
        },
      ],
      regras: [
        { titulo: "Cobras",
          texto:
`Não apenas um animal sagrado para os sszzaazitas, mas o próprio símbolo de sua divindade, será praticamente certa a existência de serpentes variadas (especialmente as peçonhentas) em seus covis e esconderijos. São amplamente utilizadas como familiares, armadilhas e instrumentos de assassinato. E como precaver-se contra seus “aliados” nunca é demais, cultistas também guardam zelosamente frascos com antídoto.` },
        { titulo: "Nagah",
          texto:
`Estes seres de torso humanoide e corpo de serpente foram outrora considerados uma raça de devotos de Allihanna. Infelizmente, tudo não passou de um elaborado e duradouro disfarce, mantido enquanto Sszzaas estava afastado, tramando seu retorno. Hoje, quase todos os grupos sszzaazitas incluem algumas nagahs. Em sua sociedade, os machos quase sempre são guerreiros, enquanto as fêmeas são clérigas ou arcanistas, exercendo a liderança.` },
      ],
    },

    // ── 🌿 OS TROLLS NOBRES ──────────────────────────────
    {
      chave: "trolls", nome: "Os Trolls Nobres", icone: "🌿", cor: "#4a6f4a",
      intro: "Os subterrâneos de Arton são habitados por todo tipo de horrores. Mas, pior ainda, são território dos finntroll. Estes tiranos sádicos, também chamados de trolls nobres, fazem parte de uma raça antiga, povoando vastas cidades subterrâneas. Sua sociedade maligna acredita ter direito a governar tudo que existe, tornando todos os outros seres seus escravos ou comida. Os prepotentes finntrolls acreditam ser as criaturas mais perfeitas na criação; todos os outros são seres inferiores que devem lhes servir. Assim como os monstruosos trolls comuns, finntrolls também são feitos de matéria vegetal.\nContudo, apesar desse parentesco (e ainda que também sejam capazes de regenerar partes perdidas), os trolls nobres são muito diferentes. Têm estatura humana, ainda que mais altos, magros e pálidos, com olhos profundos. Usam vestimentas elaboradas, escuras, adornadas com joias. Os homens geralmente raspam o cabelo, enquanto as mulheres usam penteados elaborados.",
      fichas: [
        {
          chave: "finntrollCacador", nome: "Finntroll Caçador", nd: "2", tipo: "Monstro (finntroll) Médio",
          papel: "solo",
          subgrupo: "Finntroll",
          resumo: "Finntroll — Arrogantes e indolentes, finntroll raramente deixam seu império subterrâneo — e quando o fazem, sempre têm um propósito cruel, como caçar es",
          texto:
`Finntroll Caçador ND 2
Monstro (finntroll) Médio
Iniciativa +7, Percepção +7, visão no escuro
Defesa 19, Fort +6, Ref +12, Von +4, imunidade a atordoamento e metamorfose, resistência a magia +2
Pontos de Vida 65
Deslocamento 9m (6q)
Corpo a Corpo Duas cimitarras +12 (1d6+5, 18).
À Distância Besta pesada +12 (1d12+4, 19) ou rede +12 (agarrar).
Marca da Presa (Movimento) O finntroll analisa uma criatura em alcance curto. Até o final da cena, recebe +1d8 em rolagens de dano contra essa criatura (ou +2d8, se a criatura for um anão, elfo ou humano).
Natureza Vegetal O finntroll é afetado por habilidades e magias que afetam plantas.
Regeneração Vegetal (Movimento) O finntroll recupera 5 PV. Esta habilidade não cura dano de ácido e fogo e não pode ser usada quando o finntroll está exposto à luz do sol ou similar.
Sensibilidade a Luz Quando exposto à luz do sol ou similar, o finntroll fica ofuscado.
For 2, Des 3, Con 3, Int 2, Sab 2, Car –1
Perícias Furtividade +8, Sobrevivência +7.
Equipamento Besta pesada, cimitarra x2, rede, virotes x20.
Tesouro Padrão.`
        },
        {
          chave: "finntrollFeitor", nome: "Finntroll Feitor", nd: "6", tipo: "Monstro (finntroll) Médio",
          papel: "especial",
          alias: "Fintroll feitor",   // grafia da Tabela 7-1
          subgrupo: "Finntroll",
          resumo: "Finntroll — Arrogantes e indolentes, finntroll raramente deixam seu império subterrâneo — e quando o fazem, sempre têm um propósito cruel, como caçar es",
          texto:
`Finntroll Feitor ND 6
Monstro (finntroll) Médio
Iniciativa +9, Percepção +5, visão no escuro
Defesa 20, Fort +8, Ref +12, Von +16, imunidade a atordoamento e metamorfose, resistência a magia +2
Pontos de Vida 155
Deslocamento 9m (6q)
Pontos de Mana 35
Corpo a Corpo Chicote +18 (1d3+10, 19).
Açoitar (Padrão) O finntroll usa de coerção e dor para motivar seus subalternos. No próximo turno de cada aliado do finntroll em alcance médio, esse aliado recebe uma ação de movimento extra e +2 em testes de ataque e rolagens de dano.
Magias O finntroll feitor lança magias como um mago de 7º nível (CD 26, 28 para encantamento*). 1º — Adaga Mental*, Armadura Arcana, Enfeitiçar*; 2º — Desespero Esmagador*, Marca da Obediência*, Relâmpago.
Natureza Vegetal O finntroll é afetado por habilidades e magias que afetam plantas.
Regeneração Vegetal (Movimento) O finntroll recupera 5 PV. Esta habilidade não cura dano de ácido e fogo e não pode ser usada quando o finntroll está exposto à luz do sol ou similar.
Sensibilidade a Luz Quando exposto à luz do sol ou similar, o finntroll fica ofuscado.
For 0, Des 3, Con 3, Int 4, Sab 0, Car 2
Perícias Intimidação +9, Misticismo +11.
Equipamento Chicote cruel. Tesouro Dobro.`
        },
        {
          chave: "ganchador", nome: "Ganchador", nd: "5", tipo: "Monstro Grande",
          papel: "solo",
          resumo: "Esta criatura parece um besouro humanoide com quase três metros de altura.",
          texto:
`Ganchador ND 5
Esta criatura parece um besouro humanoide com quase três metros de altura. A cabeça lembra a de um urubu com um bico grande e é a única parte da criatura não coberta por um exoesqueleto duro e repleto de pontas afiadas. Mas são os braços que dão nome à criatura, pois terminam em ganchos pontudos de aparência cruel. Ganchadores vivem nos subterrâneos de Arton e estão entre as criaturas escravizadas pelos finntroll.
Monstro Grande
Iniciativa +7, Percepção +5, percepção às cegas
Defesa 26, Fort +15, Ref +11, Von +7
Pontos de Vida 210
Deslocamento 9m (6q), escalar 9m (6q)
Corpo a Corpo Mordida +17 (2d6+8) e duas garras +17 (1d8+8, 19/x3).
Dilacerar Se o ganchador acerta os dois ataques de garra em uma mesma criatura na mesma rodada, causa mais 2d8+8 pontos de dano.
Quebrar Tudo! O ganchador recebe +2 em testes de ataque para quebrar (teste total +21) e causa +1d8 pontos de dano contra objetos.
Sensibilidade a Luz Quando exposto à luz do sol ou similar, o ganchador fica ofuscado.
For 6, Des 3, Con 5, Int –2, Sab 1, Car –2
Tesouro Metade mais duas garras (CD 20 para extrair; cada garra conta como T$ 500 em matéria-prima para fabricar armas de corte superiores).`
        },
        {
          chave: "troll", nome: "Troll", nd: "5", tipo: "Monstro Grande",
          papel: "solo",
          resumo: "Um troll é um monstro feito de matéria vegetal.",
          texto:
`Troll ND 5
Um troll é um monstro feito de matéria vegetal. Alto e magro como uma árvore, possui pele verde e verruguenta e braços longos que terminam em garras afiadas. Estes monstros vorazes não apenas servem aos finntroll como guardas e soldados, mas também são encontrados em diversos pontos de Arton, uma ameaça constante a viajantes e aventureiros. Alguns dizem que são uma versão primitiva dos finntroll, enquanto outros presumem que foram criados pelos trolls nobres através de experimentos perversos que envolvem transformar criaturas indefesas. Um troll pode regenerar quase qualquer ferimento, até mesmo membros decepados. Essa capacidade exige quantidades fantásticas de comida, fazendo com que o monstro esteja sempre faminto — um troll vai tentar devorar qualquer coisa que se mova. Apenas dano causado por fogo ou ácido impede sua regeneração. As estatísticas a seguir representam a espécie de troll mais comum, que habita pântanos e charcos, mas existem outras (veja o quadro ao lado). Independentemente da espécie, trolls procuram viver em tocas ou ruínas próximas a trilhas ou estradas, onde têm constante acesso a presas. Seu apetite contínuo e macabro os leva a capturar todo tipo de criaturas — especialmente humanoides, cujo sabor apreciam — e usá-las como ingredientes em numerosas “receitas” diabólicas.
Monstro Grande
Iniciativa +4, Percepção +3, visão no escuro
Defesa 23, Fort +14, Ref +10, Von +6, cura acelerada 15/ácido ou fogo
Pontos de Vida 165
Deslocamento 9m (6q)
Corpo a Corpo Mordida +17 (1d8+6) e duas garras +17 (1d6+6).
Dilacerar Se o troll acerta os dois ataques de garra em uma mesma criatura na mesma rodada, causa mais 2d6+6 pontos de dano.
For 6, Des 2, Con 6, Int –2, Sab –1, Car –2
Tesouro Padrão.`
        },
        {
          chave: "trollDasCavernas", nome: "Troll das Cavernas", nd: "9", tipo: "Monstro Enorme",
          papel: "solo",
          resumo: "Maiores e mais poderosos que trolls comuns, são empregados pelos finntrolls como armas pesadas.",
          texto:
`Troll das Cavernas ND 9
Maiores e mais poderosos que trolls comuns, são empregados pelos finntrolls como armas pesadas. Possuem ombros imensos, braços largos como troncos de árvore e cabeça redonda e abrutalhada. Suas pernas poderosas terminam em pés sem dedos e sua pele cinzenta é tão áspera — e dura — quanto a rocha. Um grupo destas gigantescas criaturas pode desafiar até os mais poderosos heróis do Reinado!
Monstro Enorme
Iniciativa +7, Percepção +14, faro, visão no escuro
Defesa 29, Fort +21, Ref +15, Von +9, cura acelerada 20/ácido ou fogo
Pontos de Vida 345
Deslocamento 12m (8q), escalar 9m (6q)
Corpo a Corpo Tacape +26 (3d6+27) e mordida +26 (2d6+27).
Golpe Avassalador (Livre) Quando acerta um ataque de tacape, o troll das cavernas arremessa a vítima 1d6 x 1,5m em uma direção à escolha dele (Fort CD 28 evita). A vítima fica caída e, se atingir algum obstáculo, sofre 1d6 pontos de dano de impacto para cada 1,5m que foi arremessada.
Varrer (Livre) Uma vez por rodada, quando o troll das cavernas faz um ataque corpo a corpo e reduz os pontos de vida do alvo para 0 ou menos, pode realizar um ataque adicional contra outra criatura dentro do seu alcance.
For 9, Des 0, Con 11, Int –2, Sab –1, Car –2
Equipamento Tacape gigante. Tesouro Metade.`
        },
      ],
      regras: [
        { titulo: "Trolls Variantes",
          texto:
`Além do troll comum, existem outras espécies adaptadas a outros ambientes. Estas variantes usam as estatísticas do troll comum, com os modificadores a seguir.` },
        { titulo: "Ghillanin",
          texto:
`Estes trolls subterrâneos têm a pele cinzenta, com textura de rocha. São muito usados pelos finntroll; vastas hordas deles atacaram o reino anão de Doherimm durante o Chamado às Armas.
Pele Dura. O ghillanin possui Defesa 25.
Sensibilidade a Luz. Quando exposto à luz do sol ou similar, o ghillanin fica ofuscado e sua cura acelerada não funciona.` },
        { titulo: "Glacioll",
          texto:
`Estes trolls do gelo são habitantes das Uivantes e outros lugares frios. De cor azulada, não apenas são imunes a frio, como também absorvem sua energia, ficando maiores! Um glacioll atingido por um ataque ou magia de frio se fortalece, em vez de sofrer dano.
Absorver Frio. Quando sofre dano de frio, o glacioll em vez disso recebe uma quantidade de PV temporários igual ao dano que sofreria. Para cada 10 PV temporários recebidos desta forma, o troll glacioll recebe +1 em testes de ataque e rolagens de dano até o fim da cena.
Vulnerabilidade a Fogo. O glacioll sofre +50% de dano de fogo.` },
        { titulo: "Vrakoll",
          texto:
`Estes trolls aquáticos são encontrados em água doce ou salgada. Podem respirar e se mover livremente debaixo d’água, mas têm dificuldade para lutar em terra firme. Levando em conta a dificuldade em atacá-los com fogo ou ácido quando submersos, em seu ambiente eles são praticamente invencíveis!
Aquático. O vrakoll possui deslocamento de natação 9m e pode respirar debaixo d’água. Entretanto, sofre −2 em testes de ataque em terra firme.` },
        { titulo: "Finntroll",
          texto:
`Arrogantes e indolentes, finntroll raramente deixam seu império subterrâneo — e quando o fazem, sempre têm um propósito cruel, como caçar escravos, roubar itens mágicos ou selar alianças nefastas com vilões da superfície. Caçadores são especialistas em caçar escravos, os mais vistos no Reinado. A população de aldeias inteiras já desapareceu na calada da noite após o ataque de um bando de caçadores. Feitores são ainda mais perigosos. Membros de uma casta elevada, raramente serão encontrados sozinhos — em geral, estarão no comando de escravos, trolls ou monstros ainda piores.` },
      ],
    },

    // ── 🐉 OS DRAGÕES ────────────────────────────────────
    {
      chave: "dragoes", nome: "Os Dragões", icone: "🐉", cor: "#a8641c",
      intro: "Inferiores apenas aos próprios deuses, dragões são as criaturas mais antigas e poderosas de Arton. Sua força física e habilidades mágicas são igualadas apenas pelo terror que sua simples presença incita no coração dos outros seres. Os dragões foram criados por Kallyadranoch e dominaram o mundo de Arton em eras primevas. Com o surgimento de outras raças favoritas dos deuses, essa soberania se viu enfraquecida — mas o golpe decisivo veio com a queda e o esquecimento de Kally, após a Revolta dos Três. Buscando preservar seu orgulho, os dragões recolheram-se para regiões selvagens e afastadas, como as Montanhas Sanguinárias. Dragões são tão variados quanto humanoides. A maioria é agressiva, egoísta, maligna e, acima de tudo, arrogante (não sem certa razão...), mas alguns podem ser sábios e honrados. Em comum, todos possuem a herança de Kallyadranoch — conforme envelhecem, tornam-se cada vez mais poderosos. A simples presença de um dragão afeta todo o equilíbrio de poder em uma região, possivelmente afastando outros monstros. Assim, não é sem motivo que muitos dragões são venerados como protetores, mesmo quando sua ganância exige tributos cruéis.",
      comuns: { titulo: "Habilidades Dracônicas", aplicaSe: "(dragão)", nota: "Todas as fichas de dragão verdadeiro; o enxame kobold e o Tirano do Terceiro ficam de fora." },
      fichas: [
        {
          chave: "enxameKobold", nome: "Enxame Kobold", nd: "2", tipo: "Monstro (kobold, enxame) Médio",
          papel: "solo",
          resumo: "Esses pequenos humanoides reptilianos são considerados uma praga — o que realmente são!",
          texto:
`Enxame Kobold ND 2
Esses pequenos humanoides reptilianos são considerados uma praga — o que realmente são! Medindo 75cm de altura, parecem caricaturas de dragões, com cabeças grandes e desproporcionais, orelhas caninas e pequenos chifres, corpo magro e cauda fina, curta. Embora possam se reproduzir como seres normais, kobolds às vezes surgem espontaneamente onde existe ou existiu um dragão; diz-se que a própria energia dracônica faz seus ovos brotarem como fungos. Um kobold sozinho dificilmente representa ameaça. Infelizmente, eles normalmente surgem em grandes quantidades, atacando como enxames.
Monstro (kobold, enxame) Médio
Iniciativa +6, Percepção +1, visão no escuro
Defesa 17, Fort +7, Ref +13, Von +2
Pontos de Vida 60
Deslocamento 9m (6q)
Caixa com Pregos (Padrão) Os kobolds arremessam uma caixa com pregos (ou outra coisa perigosa, como insetos peçonhentos) em uma criatura em alcance curto. A vítima sofre 2d6 pontos de dano de perfuração e fica atordoada por uma rodada (Ref CD 16 reduz o dano à metade e evita a condição atordoado).
Enxame O enxame kobold é um aglomerado de kobolds que agem em conjunto. Ele pode entrar no espaço ocupado por um personagem e, no fim de seu turno, causa 2d6 pontos de dano de perfuração a qualquer personagem em seu espaço, automaticamente. O enxame é imune a manobras de combate e efeitos que afetam apenas uma criatura e não causam dano, mas sofre 50% a mais de dano de efeitos de área, como Bola de Fogo. Além disso, sofre apenas metade do dano de ataques com armas. Estar dentro do enxame conta como condição ruim para lançar magias.
Unidos Venceremos No início de cada rodada, novos kobolds se juntam ao enxame. O enxame ganha +10 PV (até um limite máximo de 100 PV). O enxame recebe +1 em rolagens de dano para cada 10 PV que possui.
For 0, Des 3, Con 0, Int –1, Sab 0, Car –1
Tesouro Metade.`
        },
        {
          chave: "dragaoFilhote", nome: "Dragão Filhote", nd: "3", tipo: "Monstro (dragão) Médio",
          papel: "solo",
          subgrupo: "Dragões",
          resumo: "Dragões — As estatísticas a seguir representam o tipo mais comum de dragão, um cuspidor de fogo.",
          texto:
`Dragão Filhote ND 3
Monstro (dragão) Médio
Iniciativa +8, Percepção +5, percepção às cegas, visão no escuro
Defesa 22, Fort +15, Ref +3, Von +9, imunidade a fogo, resistência a magia +1, vulnerabilidade a frio
Pontos de Vida 140
Deslocamento 12m (8q), voo 18m (12q)
Corpo a Corpo Mordida +15 (2d6+5) e duas garras +15 (1d6+5).
Sopro (Padrão) Todas as criaturas em um cone de 6m sofrem 2d12 pontos de dano de fogo e ficam em chamas (Ref CD 18 reduz o dano à metade e evita a condição).
Recarga (movimento).
For 4, Des 3, Con 3, Int 0, Sab 0, Car 0
Tesouro Padrão.`
        },
        {
          chave: "dragaoJovem", nome: "Dragão Jovem", nd: "7", tipo: "Monstro (dragão) Grande",
          papel: "solo",
          subgrupo: "Dragões",
          resumo: "Dragões — As estatísticas a seguir representam o tipo mais comum de dragão, um cuspidor de fogo.",
          texto:
`Dragão Jovem ND 7
Monstro (dragão) Grande
Iniciativa +11, Percepção +11, percepção às cegas, visão no escuro
Defesa 32, Fort +20, Ref +9, Von +12, imunidade a fogo, redução de dano 5, resistência a magia +2, vulnerabilidade a frio
Pontos de Vida 320
Deslocamento 12m (8q), voo 18m (12q)
Pontos de Mana 15
Corpo a Corpo Mordida +25 (2d6+14, 19) e duas garras +25 (1d8+14, 19).
Sopro (Padrão) Todas as criaturas em um cone de 9m sofrem 6d12 pontos de dano de fogo e ficam em chamas (Ref CD 25 reduz o dano à metade e evita a condição).
Recarga (movimento).
Varrer (Livre) Uma vez por rodada, quando o dragão faz um ataque corpo a corpo e reduz os pontos de vida do alvo para 0 ou menos, pode realizar um ataque adicional contra outra criatura dentro do seu alcance.
For 7, Des 2, Con 6, Int 2, Sab 2, Car 2
Perícias Intimidação +11.
Tesouro Dobro e 2 peças de couro de dragão (CD 22 para extrair, veja o quadro na página 312).`
        },
        {
          chave: "dragaoAdulto", nome: "Dragão Adulto", nd: "11", tipo: "Monstro (dragão) Enorme",
          papel: "solo",
          subgrupo: "Dragões",
          resumo: "Dragões — As estatísticas a seguir representam o tipo mais comum de dragão, um cuspidor de fogo.",
          texto:
`Dragão Adulto ND 11
Monstro (dragão) Enorme
Iniciativa +12, Percepção +15, percepção às cegas, visão no escuro
Defesa 42, Fort +24, Ref +11, Von +18, imunidade a fogo, redução de dano 10, resistência a magia +3, vulnerabilidade a frio
Pontos de Vida 600
Deslocamento 12m (8q), voo 24m (16q)
Pontos de Mana 70
Corpo a Corpo Mordida +35 (4d10+25, 18) e duas garras +35 (3d10+25, 18).
Aura Aterradora Vontade CD 31 evita (veja quadro ao lado).
Magias O dragão adulto lança magias como um conjurador arcano de 11º nível (CD 32).
• Campo de Força (Reação, 4 PM) Quando sofre dano, o dragão recebe redução de dano 30 contra este dano.
• Curar Ferimentos (Padrão, 11 PM) Uma criatura adjacente cura 12d8+12 PV.
• Dissipar Magia (Padrão, 3 PM) O dragão escolhe uma criatura, objeto ou esfera de 3m em alcance médio e faz um teste de Misticismo. Todas as magias no alvo escolhido com CD menor que o resultado do teste são dissipadas.
• Enfeitiçar (Padrão, 1 PM) Um humanoide em alcance curto fica enfeitiçado até o final da cena (Vontade evita).
• Globo de Invulnerabilidade (Padrão, 6 PM, sustentada) O dragão é envolto por uma esfera mágica com 3m de raio que detém qualquer magia de 2º círculo ou menor.
• Velocidade (Padrão, 3 PM, sustentada) O dragão pode executar uma ação padrão adicional por turno, que não pode ser usada para lançar magias.
Sopro (Padrão) Todas as criaturas em um cone de 12m sofrem 12d12 pontos de dano de fogo e ficam em chamas (Ref CD 32 reduz o dano à metade e evita a condição).
Recarga (movimento).
Varrer (Livre) Uma vez por rodada, quando o dragão faz um ataque corpo a corpo e reduz os pontos de vida do alvo para 0 ou menos, pode realizar um ataque adicional contra outra criatura dentro do seu alcance.
For 11, Des 1, Con 8, Int 4, Sab 4, Car 4
Perícias Enganação +15, Intimidação +15, Misticismo +15.
Tesouro Dobro e 4 peças de couro de dragão (CD 26 para extrair, veja o quadro na página 312).`
        },
        {
          chave: "dragaoVeneravel", nome: "Dragão Venerável", nd: "15", tipo: "Monstro (dragão) Enorme",
          papel: "solo",
          subgrupo: "Dragões",
          resumo: "Dragões — As estatísticas a seguir representam o tipo mais comum de dragão, um cuspidor de fogo.",
          texto:
`Dragão Venerável ND 15
Monstro (dragão) Enorme
Iniciativa +16, Percepção +22, percepção às cegas, visão no escuro
Defesa 52, Fort +28, Ref +15, Von +22, imunidade a fogo, redução de dano 15, resistência a magia +4, vulnerabilidade a frio
Pontos de Vida 800
Deslocamento 12m (8q), voo 24m (16q)
Pontos de Mana 97
Corpo a Corpo Mordida +44 (4d12+40, 17) e duas garras +44 (3d12+40, 17).
Aura Aterradora Vontade CD 40 evita (veja o quadro na página 311).
Fluxo de Mana O dragão venerável pode manter duas magias sustentadas simultaneamente com apenas uma ação livre (mas pagando o custo de cada uma).
Magia Acelerada (livre, 4 PM) Uma vez por rodada, quando lança uma magia com execução de ação completa ou menor, o dragão muda a execução dela para livre.
Magias O dragão venerável lança magias como um conjurador arcano de 15º nível (CD 40).
• Campo de Força (Reação, 7 PM) Quando sofre dano, o dragão recebe redução de dano 50 contra este dano.
• Controlar a Gravidade (Padrão, 10 PM, sustentada) O dragão controla os efeitos da gravidade em um cubo de 12m de lado em alcance médio (veja página 186).
• Curar Ferimentos (Padrão, 15 PM) Uma criatura adjacente cura 16d8+16 PV.
• Dissipar Magia (Padrão, 3 PM) O dragão escolhe uma criatura, objeto ou esfera de 3m em alcance médio e faz um teste de Misticismo. Todas as magias no alvo escolhido com CD menor que o resultado do teste são dissipadas.
• Enfeitiçar (Padrão, 1 PM) Um humanoide em alcance curto fica enfeitiçado até o final da cena (Vontade evita).
• Globo de Invulnerabilidade (Padrão, 10 PM, sustentada) O dragão é envolto por uma esfera mágica com 3m de raio que detém qualquer magia de 3º círculo ou menor.
• Velocidade (Padrão, 3 PM, sustentada) O dragão pode executar uma ação padrão adicional por turno, que não pode ser usada para lançar magias.
Sopro (Padrão) Todas as criaturas em um cone de 15m sofrem 16d12 pontos de dano de fogo e ficam em chamas (Ref CD 40 reduz o dano à metade e evita a condição).
Recarga (movimento).
Varrer (Livre) Uma vez por rodada, quando o dragão faz um ataque corpo a corpo e reduz os pontos de vida do alvo para 0 ou menos, pode realizar um ataque adicional contra outra criatura dentro do seu alcance.
For 13, Des 1, Con 10, Int 6, Sab 6, Car 6
Perícias Enganação +22, Intimidação +22, Intuição +22, Misticismo +22.
Tesouro Dobro e 4 peças de couro de dragão (CD 30 para extrair, veja o quadro ao lado).`
        },
        {
          chave: "dragaoRei", nome: "Dragão-Rei", nd: "20", tipo: "Monstro (dragão) Colossal",
          papel: "solo",
          subgrupo: "Dragões",
          resumo: "Dragões — As estatísticas a seguir representam o tipo mais comum de dragão, um cuspidor de fogo.",
          texto:
`Dragão-Rei ND 20
Monstro (dragão) Colossal
Iniciativa +19, Percepção +27, percepção às cegas, visão no escuro
Defesa 62, Fort +34, Ref +20, Von +28, imunidade a fogo, redução de dano 20, resistência a magia +5, vulnerabilidade a frio
Pontos de Vida 1400
Deslocamento 12m (8q), voo 36m (24q)
Pontos de Mana 128
Corpo a Corpo Mordida +55 (6d20+50, 16) e duas garras +50 (6d20+50, 16).
Aura Aterradora Vontade CD 50 evita (veja o quadro na página 311).
Escamas Supremas O Dragão-Rei sofre apenas metade do dano de fontes mundanas.
Fluxo de Mana O Dragão-Rei pode manter duas magias sustentadas simultaneamente com apenas uma ação livre (mas pagando o custo de cada uma).
Magia Acelerada (livre, 4 PM) Uma vez por rodada, quando lança uma magia com execução de ação completa ou menor, o Dragão-Rei muda a execução dela para livre.
Magias O Dragão-Rei lança magias como um conjurador arcano de 20º nível (CD 50).
• Campo de Força (Reação, 7 PM) Quando sofre dano, o dragão recebe redução de dano 50 contra este dano.
• Controlar a Gravidade (Padrão, 10 PM, sustentada) O dragão controla os efeitos da gravidade em um cubo de 12m de lado em alcance médio (veja página 186).
• Controlar o Tempo (Padrão, 15 PM) O dragão controla o tempo ao seu redor (veja página 187).
• Dissipar Magia (Padrão, 3 PM) O dragão escolhe uma criatura, objeto ou esfera de 3m em alcance médio e faz um teste de Misticismo. Todas as magias no alvo escolhido com CD menor que o resultado do teste são dissipadas.
• Enfeitiçar (Padrão, 1 PM) Um humanoide em alcance curto fica enfeitiçado até o final da cena (Vontade evita).
• Globo de Invulnerabilidade (Padrão, 15 PM, sustentada) O dragão é envolto por uma esfera mágica com 3m de raio que detém qualquer magia de 4º círculo ou menor.
• Segunda Chance (Padrão, 20 PM) Uma criatura adjacente cura 300 PV e condições (veja a página 205).
• Velocidade (Padrão, 10 PM, sustentada) O dragão pode executar uma ação padrão adicional por turno.
Sopro (Padrão) Todas as criaturas em um cone de 18m sofrem 20d12 pontos de dano de fogo e ficam em chamas (Ref CD 50 reduz o dano à metade e evita a condição).
Recarga (movimento).
Varrer (Livre) Uma vez por rodada, quando o dragão faz um ataque corpo a corpo e reduz os pontos de vida do alvo para 0 ou menos, pode realizar um ataque adicional contra outra criatura dentro do seu alcance.
For 17, Des 0, Con 12, Int 7, Sab 7, Car 7
Perícias Enganação +26, Intimidação +26, Intuição +26, Misticismo +26.
Tesouro Dobro e 6 peças couro de dragão (CD 35 para extrair, veja o quadro na página 312).`
        },
        {
          chave: "tiranoDoTerceiro", nome: "Tirano do Terceiro", nd: "10", tipo: "Humanoide (humano) Médio",
          papel: "solo",
          resumo: "Poderosos servos de Kallyadranoch, os tiranos são verdadeiros exércitos de uma só pessoa, cavalgando dragões e aterrorizando o mundo com seu poderio.",
          texto:
`Tirano do Terceiro ND 10
Poderosos servos de Kallyadranoch, os tiranos são verdadeiros exércitos de uma só pessoa, cavalgando dragões e aterrorizando o mundo com seu poderio. Ambiciosos e cruéis como as feras que adoram, estão entre os maiores vilões de Arton.
Humanoide (humano) Médio
Iniciativa +9, Percepção +10, visão no escuro
Defesa 37, Fort +22, Ref +10, Von +16, imunidade a atordoamento e medo, redução de dano 5, resistência a magia +2
Pontos de Vida 370
Deslocamento 6m (4q)
Pontos de Mana 62
Corpo a Corpo Machado de batalha x2 +29 (2d8+14, x3) e garra +29 (1d8+14).
Dádiva Dracônica O tirano do terceiro pode lançar magias arcanas cavalgando e/ou de armadura sem precisar de testes de Misticismo.
Magias O tirano do terceiro lança magias como um mago de 10º nível (CD 30).
• Bola de Fogo (Padrão, 9 PM) O tirano cria uma poderosa explosão em alcance médio que causa 12d6+5 pontos de dano de fogo em todas as criaturas em um raio de 6m (Reflexos reduz à metade).
• Concentração de Combate (Padrão, 8 PM) Até o fim da cena, quando faz um ataque, o tirano rola dois dados e usa o melhor resultado, e quando um oponente ataca o tirano, rola dois dados e usa o pior resultado.
• Velocidade (Padrão, 3 PM, sustentada) O tirano pode executar uma ação padrão adicional por turno, que não pode ser usada para lançar magias.
For 6, Des 0, Con 6, Int 2, Sab 1, Car 4
Perícias Cavalgar +9, Intimidação +13, Misticismo +11.
Equipamento Armadura completa de adamante, machado de batalha de adamante atroz. Tesouro Dobro.`
        },
      ],
      regras: [
        { titulo: "Dragões",
          texto:
`As estatísticas a seguir representam o tipo mais comum de dragão, um cuspidor de fogo.` },
        { titulo: "Habilidades Dracônicas",
          texto:
`Todos os dragões partilham as seguintes habilidades.
Aura Aterradora. A simples visão de um dragão adulto ou mais velho amedronta o mais valente dos aventureiros. Uma criatura que comece seu turno em alcance longo do dragão fica apavorada (se tiver 4 níveis ou menos) ou abalada (se tiver 5 níveis ou mais) até o fim da cena (Vontade evita). Uma criatura que passe no teste de resistência fica imune a esta habilidade por um dia.
Imunidades. Dragões são imunes a efeitos de atordoamento, cansaço, dano do tipo de seu sopro, metamorfose e paralisia.
Magia Dracônica. Dragões adultos ou mais velhos podem lançar magias sem palavras mágicas, gestos ou concentração.
✦ Metamorfose Dracônica (Completa). Dragões jovens ou mais velhos podem se transformar em outras criaturas, como a magia Metamorfose (mas sem limitação para tamanhos menores que o seu). Eles costumam usar esta habilidade para se infiltrar em sociedades humanoides, aprender sobre seus costumes ou apenas quando não querem ser reconhecidos. Um dragão morto reverte à sua forma original.
Resistência a Magia. Dragões filhotes têm resistência a magia +1. Esse bônus aumenta em +1 para cada categoria de idade acima de filhote.
Sopro (Padrão). O dragão cospe energia em uma área. A área do sopro, o tipo de energia e o dano dependem do dragão. Recarga (movimento).` },
        { titulo: "Couro de Dragão",
          texto:
`Cobiçado por artesãos em toda Arton, o couro escamado de um dragão verdadeiro é um material especial que pode ser empregado para fabricar certos itens superiores. Tanto o couro bruto quanto itens de couro de dragão não existem à venda; a única maneira de obter esse material é derrotar um dragão.
Armadura e Escudo. Armaduras leves e escudos (exigem uma peça): Defesa +1, RD 10 contra o tipo de dano do sopro do dragão e resistência a magia +2. Armaduras pesadas (exigem três peças): Defesa +2, redução de dano 20 contra o tipo de dano do sopro do dragão e resistência a magia +5.
Esotérico (Exige uma Peça). Quando lança uma magia que cause dano do mesmo tipo do sopro do dragão, você pode gastar 1 PM para aumentar o dano da magia em +1 por dado.` },
      ],
    },

    // ── 🌀 A TORMENTA ────────────────────────────────────
    {
      chave: "tormenta", nome: "A Tormenta", icone: "🌀", cor: "#7a2f7a",
      intro: "Quando o grupo de aventureiros conhecido como o Esquadrão do Inferno entrou em contato com um outro universo, inadvertidamente libertou sobre Arton a maior de todas as ameaças. Esses invasores são chamados lefeu, ou demônios da Tormenta; seres tão bizarros, tão macabros, que só conseguimos vê-los como insetos monstruosos — os limites daquilo que nossas mentes conseguem imaginar. A Tormenta choveu sangue ácido e demônios sobre Tamu-ra, destruindo uma civilização milenar. Mais tarde surgiriam outras áreas de Tormenta, lugares de profanação e pesadelo, onde nosso próprio mundo é devorado, substituído pela Anticriação aberrante. Uma área de Tormenta é hostil à vida, um lugar onde apenas os aventureiros mais fortificados conseguem sequer pisar. Infelizmente, a corrupção não se restringe a esses territórios — a Tormenta avança sobre Arton de numerosas formas. Sua loucura toca os povos, transformando pessoas em maníacos depravados. Criaturas aberrantes rondam o Reinado, espreitando povoados, infestando masmorras. Mesmo o próprio Panteão perdeu sua pureza divina, agora acolhendo Aharadak, o infecto Deus da Tormenta.",
      comuns: { titulo: "Habilidades Lefeu", aplicaSe: "(lefeu)", nota: "Só os quatro demônios da Tormenta (Monstro (lefeu)) — já contabilizadas nas fichas deles." },
      fichas: [
        {
          chave: "maniacoLefou", nome: "Maníaco Lefou", nd: "2", tipo: "Humanoide (lefou) Médio",
          papel: "lacaio",
          resumo: "Poucos meios-demônios da Tormenta têm a sorte de integrar um grupo de aventureiros.",
          texto:
`Maníaco Lefou ND 2
Poucos meios-demônios da Tormenta têm a sorte de integrar um grupo de aventureiros. Temidos e hostilizados por todas as outras raças, quase todos abraçam a violência e a loucura. Tornam-se selvagens ensandecidos, solitários ou em pequenos grupos, atacando tudo que encontram. Mais de uma aldeia foi chacinada por maníacos lefou, buscando apenas um fim para o pesadelo sangrento que é sua existência.
Humanoide (lefou) Médio
Iniciativa +4, Percepção +2
Defesa 18, Fort +12, Ref +7, Von +3
Pontos de Vida 25
Deslocamento 9m (6q)
Corpo a Corpo Machado de guerra +16 (1d12+15, x3).
Frenesi Insano Sempre que causa ou sofre dano, o maníaco lefou recebe um bônus cumulativo de +2 em testes de ataque e rolagens de dano até o fim da cena.
For 5, Des 1, Con 1, Int –1, Sab –1, Car –2
Equipamento Machado de guerra. Tesouro Metade.`
        },
        {
          chave: "uktril", nome: "Uktril", nd: "3", tipo: "Monstro (lefeu) Médio",
          papel: "lacaio",
          resumo: "Mesmo o lefeu mais comum e mais fraco é uma abominação perversa, uma combinação impossível de humano e formiga, com garras cruéis que gotejam muco.",
          texto:
`Uktril ND 3
Mesmo o lefeu mais comum e mais fraco é uma abominação perversa, uma combinação impossível de humano e formiga, com garras cruéis que gotejam muco. Estes monstros rondam as fronteiras das áreas de Tormenta em pequenos grupos, não raras vezes infestando masmorras e regiões vizinhas. Também podem ser conjurados por magias profanas ou oferecidos por Aharadak como servos para cultistas.
Monstro (lefeu) Médio
Iniciativa +9, Percepção +10, visão no escuro
Defesa 22, Fort +12, Ref +11, Von +6, redução de dano 10
Pontos de Vida 45
Deslocamento 9m (6q)
Corpo a Corpo Pinça +16 (2d6+6, 19) e garra +16 (1d6+6).
Insanidade da Tormenta 1d6 PM (Von CD 17 evita).
For 5, Des 4, Con 2, Int –1, Sab 2, Car –4
Tesouro Nenhum.`
        },
        {
          chave: "geraktril", nome: "Geraktril", nd: "6", tipo: "Monstro (lefeu) Médio",
          papel: "solo",
          resumo: "Versão maior e mais avançada dos uktril, são abominações de três braços com pinças capazes de cortar homens ao meio.",
          texto:
`Geraktril ND 6
Versão maior e mais avançada dos uktril, são abominações de três braços com pinças capazes de cortar homens ao meio. Podem ser encontrados liderando bandos uktril ou em pequenos grupos próprios. São também emissários sagrados de Aharadak, às vezes manifestando-se em cerimônias profanas para abater vítimas oferecidas em sacrifício.
Monstro (lefeu) Médio
Iniciativa +13, Percepção +16, visão no escuro
Defesa 30, Fort +18, Ref +15, Von +6, redução de dano 10
Pontos de Vida 240
Deslocamento 9m (6q)
Corpo a Corpo Duas pinças +23 (3d6+10, 19) e garra +23 (1d8+10).
Insanidade da Tormenta 2d4 PM (Von CD 22 evita).
For 7, Des 5, Con 3, Int 1, Sab 3, Car –1
Tesouro Nenhum.`
        },
        {
          chave: "reishid", nome: "Reishid", nd: "8", tipo: "Monstro (lefeu) Médio",
          papel: "especial",
          resumo: "Mestres da espionagem e assassinato, estes lefeu estão entre os mais perigosos encontrados longe das áreas de Tormenta.",
          texto:
`Reishid ND 8
Mestres da espionagem e assassinato, estes lefeu estão entre os mais perigosos encontrados longe das áreas de Tormenta. Dobrando suas asas de barata como capuzes e mantos, conseguem passar despercebidos mesmo em grandes cidades. Nestes tempos de culto a Aharadak, muitas vezes também se tornam mestres de cerimônia em rituais profanos.
Monstro (lefeu) Médio
Iniciativa +17, Percepção +19, visão no escuro
Defesa 37, Fort +19, Ref +21, Von +10, redução de dano 10
Pontos de Vida 295
Deslocamento 9m (6q), escalar 9m (6q), voo 15m (10q)
Corpo a Corpo Adaga da Tormenta +30 (1d4+18 mais 1d8 de trevas, 19), garra +30 (1d6+18) e mordida +30 (1d6+18 mais veneno).
Ataque em Movimento O reishid pode se mover antes e depois de executar a ação agredir, desde que a distância total percorrida não seja maior que seu deslocamento.
Ataque Reflexo (Reação) Uma vez por rodada, o reishid pode fazer um ataque corpo a corpo contra um alvo adjacente que esteja desprevenido ou que se mova para fora de seu alcance.
Insanidade da Tormenta 2d6 PM (Von CD 26 evita).
Sombra Rubra Quando faz um teste de Iniciativa ou Furtividade, o reishid rola dois dados e usa o melhor resultado.
Veneno Condição paralisado por 1d6 horas (Fort CD 26 reduz para lento por 1d6 rodadas).
For 4, Des 7, Con 4, Int 4, Sab 4, Car 1
Perícias Furtividade +20.
Tesouro Padrão mais adaga da Tormenta. Esta é uma arma mágica específica que conta como uma adaga formidável tumular. Sua lâmina é longa e ondulada e seu cabo lembra uma carapaça. A adaga secreta muco adesivo pelo cabo, que mantém a arma firme na mão, fornecendo +5 em testes contra desarmar. Soltar uma adaga da Tormenta gasta uma ação de movimento.`
        },
        {
          chave: "thuwarokk", nome: "Thuwarokk", nd: "16", tipo: "Monstro (lefeu) Colossal",
          papel: "solo",
          resumo: "Este gigantesco lefeu lembra um besouro blindado, mas é quase tão grande quanto um castelo!",
          texto:
`Thuwarokk ND 16
Este gigantesco lefeu lembra um besouro blindado, mas é quase tão grande quanto um castelo! Além de quatro pares de patas, possui três pares de “braços” menores e ágeis. Sua carapaça é espessa como uma muralha, recobrindo o dorso e mostrando poucas juntas vulneráveis. Lembrando mais imensas máquinas de guerra que seres vivos, os thuwarokk eram conhecidos como “colossos da Tormenta” — e são exatamente isso: feras colossais, monstros de destruição total, capazes de dizimar exércitos.
Monstro (lefeu) Colossal
Iniciativa +11, Percepção +12, visão no escuro
Defesa 50, Fort +30, Ref +24, Von +16, redução de dano 10
Pontos de Vida 900
Deslocamento 12m (8q)
Corpo a Corpo Quatro pancadas +48 (4d12+24).
Carapaça A carapaça do thuwarokk reduz todo dano de corte, impacto e perfuração que ele sofre pela metade. Se o thuwarokk passar num teste de resistência contra magia que o tem como alvo, ela é revertida contra o conjurador. Apesar de resistente, a caparaça de um thuwarokk possui pontos fracos, que podem ser encontrados com uma ação de movimento e um teste de Percepção (CD 25). Um personagem que encontre um ponto fraco pode atacar a criatura com –5 no teste de ataque, mas, se acertar, ignora as proteções da carapaça.
Insanidade da Tormenta 2d12 PM (Von CD 42 evita).
Jato de Ácido (Movimento) O thuwarokk dispara um jato corrosivo que atinge um cone de 30m. Criaturas na área sofrem 10d8+20 pontos de dano de ácido (Ref CD 42 reduz à metade). Recarga (movimento).
Passar por Cima (Completa) O thuwarokk percorre até o dobro do seu deslocamento, passando por qualquer criatura Enorme ou menor. Uma criatura atropelada sofre 10d12+50 pontos de dano (Ref CD 42 reduz à metade).
For 17, Des –1, Con 10, Int –3, Sab 0, Car –4
Tesouro Nenhum.`
        },
        {
          chave: "otyugh", nome: "Otyugh", nd: "5", tipo: "Monstro Grande",
          papel: "solo",
          resumo: "Este monstro disforme e repugnante surge em lugares maculados pela Tormenta — especialmente pântanos, esgotos e masmorras — sendo fruto da c",
          texto:
`Otyugh ND 5
Este monstro disforme e repugnante surge em lugares maculados pela Tormenta — especialmente pântanos, esgotos e masmorras — sendo fruto da corrupção aberrante. O corpo pustulento de um otyugh possui três patas, bocarra descomunal e tentáculos espinhosos. Até onde se sabe, seu único propósito é devorar tudo em seu caminho.
Monstro Grande
Iniciativa +3, Percepção +10, visão no escuro
Defesa 24, Fort +17, Ref +11, Von +5, imunidade a doenças e venenos, redução de dano 5
Pontos de Vida 213
Deslocamento 6m (4q)
Corpo a Corpo Dois tentáculos +17 (1d8+9, alcance 4,5m) e mordida +17 (1d6+9 mais doença).
Agarrar Aprimorado (Livre) Se o otyugh acerta um ataque de tentáculo, pode fazer a manobra agarrar (teste +19).
Constrição (Livre) No início de cada um de seus turnos, o otyugh causa 1d8+9 pontos de dano de impacto em qualquer criatura que esteja agarrando.
Doença Uma criatura mordida por um otyugh é exposta a doença infecção do esgoto (veja a página 318).
For 5, Des –1, Con 4, Int –2, Sab 1, Car –2
Perícias Furtividade +3 (+13 em seu refúgio).
Tesouro Padrão.`
        },
        {
          chave: "sacerdoteDeAharadak", nome: "Sacerdote de Aharadak", nd: "10", tipo: "Humanoide (humano) Médio",
          papel: "especial",
          resumo: "Esses macabros devotos do Deus da Tormenta promovem a insanidade, a devassidão e a deturpação de tudo que é vivo.",
          texto:
`Sacerdote de Aharadak ND 10
Esses macabros devotos do Deus da Tormenta promovem a insanidade, a devassidão e a deturpação de tudo que é vivo. Desistindo da humanidade, esperando ser recompensados com poderes ainda maiores, cultistas perpetram os crimes mais horrendos para agradar seu patrono.
Humanoide (humano) Médio
Iniciativa +17, Percepção +15
Defesa 38, Fort +16, Ref +10, Von +22, imunidade a confusão, redução de ácido, eletricidade, fogo, frio, luz e trevas 10, resistência a magia divina +5
Pontos de Vida 315
Deslocamento 9m (6q), voo 15m (10q)
Pontos de Mana 56
Corpo a Corpo Duas correntes de espinhos aberrantes +30 (4d6+12 mais 1d6 ácido) e mordida +30 (1d6+12).
Magia Acelerada (Livre, 4 PM) Uma vez por rodada, quando lança uma magia com execução de ação completa ou menor, o sacerdote de Aharadak muda a execução dela para livre.
Magias O sacerdote lança magias como um clérigo de Aharadak de 10º nível (CD 30).
• Curar Ferimentos (Padrão, 10 PM) Uma criatura adjacente cura 11d8+11 PV.
• Perdição (Padrão, 5 PM) Criaturas escolhidas em alcance curto sofrem –3 em testes de ataque e rolagens de dano até o fim da cena.
• Potência Divina (Padrão, 10 PM, sustentada) O sacerdote se transforma em uma criatura Grande. Ele recebe Força +5, redução de dano 10 e os dados de dano de seus ataques se tornam d8, mas ele não pode lançar magias.
• Silêncio (Padrão, 4 PM, sustentada) O sacerdote cria uma esfera com 3m de raio ao seu redor. Criaturas nessa área ficam surdas e não podem lançar magias.
Sangue Ácido Quando o sacerdote sofre dano por um ataque corpo a corpo, o atacante sofre 10 pontos de dano de ácido.
For 4, Des 2, Con 4, Int 2, Sab 5, Car –1
Perícias Intimidação +9, Religião +16.
Equipamento Símbolo sagrado de Aharadak. Tesouro Padrão.`
        },
      ],
      regras: [
        { titulo: "Habilidades Lefeu",
          texto:
`Todos os lefeu partilham as seguintes habilidades (já contabilizadas em suas fichas).
Imunidades. Lefeu são imunes a acertos críticos, ácido, cansaço, eletricidade, fogo, frio, luz, paralisia, metabolismo, metamorfose, trevas e veneno.
Insanidade da Tormenta. Uma criatura que veja um ou mais lefeu deve fazer um teste de Vontade contra o lefeu de maior ND.
Se falhar, perde os PM indicados (+1 PM para cada lefeu além do primeiro). Se for reduzida a 0 PM, fica confusa. Uma criatura só é afetada por esta habilidade uma vez por dia.
Percepção Temporal. Um lefeu soma sua Sabedoria em testes de ataque, Defesa e Reflexos (já contabilizado na ficha).
Visão Ampla. Um lefeu recebe +5 em Percepção e não pode ser flanqueado.` },
        { titulo: "Lefeu",
          texto:
`A seguir estão quatro demônios da Tormenta.` },
      ],
    },
  ],
};
