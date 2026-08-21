// ════════════════════════════════════════════════════════════════════
//  NPCS-LENDAS-DATA.JS — o fecho do Guia de NPCs: deuses menores e
//  personagens especiais de Arton
//  Localização: /grifos-alados/js/npcs-lendas-data.js
//
//  ⚠ ARQUIVO GERADO por "Inútil/_gerar-npcs-lendas.js" a partir de
//    "Inútil/Regras.txt". Dá para editar à mão — mas rodar o gerador
//    de novo sobrescreve tudo.
//
//  As 53 fichas nomeadas que fecham o livro. Em vez de reescrever o
//  js/npcs-data.js (que é escrito à mão), este arquivo ACRESCENTA uma
//  categoria ao window.GUIA_NPCS já existente — por isso precisa ser
//  carregado DEPOIS dele.
//
//  ⚠ SÓ O MESTRE: incluído apenas no index.html. O jogadores.html
//    carrega o npcs-data.js (a gente comum de Arton) e NÃO carrega
//    este — são fichas de chefe e de divindade.
//
//  Campos além dos de uma ficha comum do Guia:
//    titulo  — como a entrada se chama no livro ("Coronel Barba Branca",
//              "Irmãs da Nova Escama"), quando difere do nome da ficha
//    fontes  — livros e aventuras em que o personagem apareceu
//    papel   — vazio: no livro é um ÍCONE, que não sobrevive à cópia do
//              PDF; o bestiário assume "lacaio" até o mestre trocar
// ════════════════════════════════════════════════════════════════════
(function () {
  'use strict';
  const G = window.GUIA_NPCS;
  if (!G || !Array.isArray(G.categorias)) {
    console.error('[npcs-lendas] carregue js/npcs-data.js antes deste arquivo.');
    return;
  }

  G.categorias.push({
    chave: 'lendas', nome: 'Lendas & Deuses Menores', icone: '⭐', cor: '#7a4a9e',
    intro: 'Deuses menores e personagens muito especiais de Arton — os nomes que as sagas repetem. ' +
           'Quase todos são desafios de patamar alto; os de ND S e S+ têm a habilidade Maior que a Morte.',
    fichas: [
      {
        chave: "beluhga", nome: "Beluhga", nd: "S", tipo: "Monstro (dragão, deus menor) Colossal",
        papel: '',
        titulo: "Beluhga, Dragoa Rainha do Gelo",
        fontes: "Holy Avenger, Lágrimas da Dragoa-Rainha, Duelo de Dragões",
        resumo: "Tão majestosa quanto as próprias Montanhas Uivantes, Beluhga é tanto guardiã quanto prisioneira da região — além de uma divindade menor vene",
        texto:
`Beluhga ND S
Tão majestosa quanto as próprias Montanhas Uivantes, Beluhga é tanto guardiã quanto prisioneira da região — além de uma divindade menor venerada pelos povos que a habitam. Representada em imagens sagradas tanto em sua aparência original quanto na forma de uma linda e imponente humanoide, a Dragoa-Rainha do Gelo é parte fundamental e inegável da própria paisagem. De fato, muitos estudiosos afirmam que a presença de Beluhga transformou o clima nas Uivantes, espalhando seu frio até que a cordilheira se tornasse inteiramente coberta de gelo e neve. Dessa forma, mais do que uma governante ou mesmo uma deusa, ela seria responsável pelo modo de vida de todos os habitantes, sejam humanoides ou animais. Contudo, Beluhga não é onipotente. Em uma era imemorial, a rainha foi acorrentada às montanhas por Khalmyr, o Deus da Justiça. Mas ninguém tem certeza sobre qual seria o crime que teria valido tamanha punição. Alguns dizem que Beluhga ameaçou o poder dos vinte deuses maiores do Panteão, conspirando com Sckhar, o Dragão-Rei do Fogo, para gerar uma ninhada de monstros imbatíveis. Mas, se fosse esse o caso, por que Sckhar não foi igualmente punido? A resposta para isso, afirmam certos historiadores, é tão mesquinha que poderia abalar o próprio clero do Deus da Justiça: Khalmyr teria se apaixonado por Beluhga e não suportou ser rejeitado, aprisionando-a como vingança. Seja como for, a punição foi desfeita quando o Paladino de Arton se ergueu contra os próprios deuses. Munido de poder imensurável, o herói caído partiu as correntes de Beluhga e a libertou — apenas para aprisioná-la de novo, dessa vez a seu serviço, como montaria. Então, quando não tinha mais uso para a Dragoa-Rainha, o vilão a matou. Um pânico enorme se espalhou entre os povos da cordilheira. Sem a presença de sua padroeira, temia-se que as Uivantes sofressem um degelo abrupto e permanente, causando devastação imprevisível na cordilheira e nas regiões ao redor. Contudo, as profecias agourentas não se concretizaram. De qualquer forma, o cadáver da rainha foi devolvido a seu antigo covil em um esquife de gelo eterno, para lá repousar eternamente. Ou assim se pensava. Recentes relatos de aventureiros falam de aparições do fantasma da Dragoa-Rainha do Gelo surgindo nas montanhas. Outros boatos afirmam que não se trata de um fantasma, mas da própria Beluhga, reerguida da morte para retomar seus deveres! Assim como muitas outras coisas a respeito da dragoa, o motivo dessa suposta ressurreição é um mistério. Alguns especulam que ela tenha angariado poder através da crença de seus devotos durante a época em que o Panteão ficou incompleto. Mas então por que Beluhga teria demorado mais de uma década para se mostrar?
Monstro (dragão, deus menor) Colossal
Iniciativa +24, Percepção +35, percepção às cegas (longo), visão no escuro
Defesa 66, Fort +22, Ref +36, Von +30, imunidade a encantamento e frio, redução de dano 20, resistência a magia +5, vulnerabilidade a fogo
Pontos de Vida 2.400
Deslocamento 12m (8q), escavação (apenas em gelo e neve) 12m (8q), voo 36m (24q)
Pontos de Mana 274
Corpo a Corpo Mordida +57 (6d20+55, 16) e duas garras +57 (6d20+55, 16).
Aura Aterradora Vontade CD 51 evita. Uma criatura que falhe no teste de Vontade contra a Aura Aterradora de Beluhga sofre 6d6 pontos de dano psíquico.
Escamas Refletoras Sempre que Beluhga passa em um teste de resistência contra um efeito mágico que tenha ela como um de seus alvos, o efeito é refletido para seu usuário. O efeito mantém suas características originais e afeta os demais alvos normalmente. O novo alvo tem direito a um teste de resistência como normal, se aplicável.
Fluxo de Mana Beluhga pode manter dois efeitos sustentados simultaneamente com apenas uma ação livre (mas pagando o custo de cada um).
Magia Acelerada (Livre, +4 PM) Uma vez por rodada, quando lança uma magia com execução de ação completa ou menor, Beluhga muda a execução dela para livre.
Senhora do Frio Beluhga emite uma aura de frio em um raio de 30m. Nessa área, efeitos que causam dano de frio custam –1 PM para serem usados e causam +1 ponto de dano por dado, e efeitos que causam dano de fogo custam +1 PM para serem usados e causam –1 ponto de dano por dado (já contabilizados nas magias e no sopro). Por fim, todo dano de frio causado por Beluhga nessa área ignora redução de dano e, contra criaturas imunes a frio, ainda causa metade do dano.
Sopro (Padrão) Todas as criaturas em um cone de 24m sofrem 24d12+24 pontos de dano de frio e, se forem Grandes ou menores, ficam caídas e são empurradas 9m na direção oposta. Se houver uma parede ou outro objeto sólido (mas não uma criatura) no caminho, a criatura para de se mover, mas sofre 2d6 pontos de dano de impacto (Ref CD 51 reduz à metade e evita a condição e o empurrão).
Recarga (movimento).
Varrer (Livre) Uma vez por rodada, quando Beluhga faz um ataque corpo a corpo e reduz os pontos de vida do alvo para 0 ou menos, pode realizar um ataque adicional contra outra criatura dentro do seu alcance.
Magias Como uma conjuradora arcana de 20º nível (CD 51, limite de PM 32).
• Campo de Força (Reação, 11 PM) Quando sofre dano, Beluhga recebe redução de dano 70 contra esse dano.
• Dardo Gélido* (Padrão, 31 PM) Cinco criaturas em alcance curto sofrem 29d8+29 pontos de dano de frio e ficam lentas por 1 rodada (Fort reduz à metade e evita a condição).
• Dissipar Magia (Padrão, 3 PM) Beluhga escolhe uma criatura, objeto ou esfera de 3m em alcance médio e faz um teste de Misticismo. Todas as magias nesse alvo com CD igual ou menor que o resultado do teste são dissipadas.
• Globo de Invulnerabilidade (Padrão, 15 PM, sustentada) Beluhga é envolta por uma esfera mágica de 3m que detém qualquer magia de 4º círculo ou menor.
• Imobilizar (Padrão, 9 PM) Uma criatura em alcance curto fica paralisada (Von reduz para lenta). A cada rodada, a vítima pode gastar uma ação completa para fazer um novo teste de Vontade. Se passar, liberta-se do efeito.
• Muralha Elemental (Padrão, 6 PM, somente gelo) Uma muralha de gelo se eleva da terra. Pode ser um muro de até 30m de comprimento e 3m de altura (ou o contrário) ou uma cúpula de 6m de raio (veja Tormenta20, p. 200).
• Sopro da Salvação (Padrão, 32 PM) Beluhga sopra um cone de luz de 9m. Aliados nessa área curam 13d8+26 PV e perdem todas as condições entre abalado, atordoado, apavorado, alquebrado, cego, confuso, debilitado, enfeitiçado, enjoado, esmorecido, exausto, fascinado, fatigado, fraco, frustrado, lento, paralisado, pasmo e surdo.
• Velocidade (Padrão, 10 PM, sustentada) Beluhga pode executar uma ação padrão adicional por turno.
For 18, Des 3, Con 13, Int 12, Sab 13, Car 12
Perícias Acrobacia +19, Diplomacia +30, Enganação +28, Intimidação +28, Intuição +34, Misticismo +33, Sobrevivência +29.
Tesouro Triplo mais 10 peças de couro de dragão (CD 35 para extrair). * Veja Ameaças de Arton, p. 404.`
      },
      {
        chave: "benthos", nome: "Benthos", nd: "S", tipo: "Monstro (dragão, deus menor) Colossal",
        papel: '',
        titulo: "Benthos, Dragão-Rei dos Mares",
        fontes: "O Terceiro Deus, Guilda do Macaco",
        resumo: "Este magnífico dragão de poderes divinos quase nunca visita a terra firme.",
        texto:
`Benthos ND S
Este magnífico dragão de poderes divinos quase nunca visita a terra firme. Suas intervenções são raras, mas quando acontecem deixam consequências que ecoam por séculos. O povo de Khubar ainda lembra da ocasião, quatro séculos atrás, em que o desbravador Thomas Lendilkar tentou invadir o arquipélago a fim de expandir o recentemente fundado reino de Bielefeld. Na ocasião, convocado por um ritual dos ilhéus, o Dragão-Rei afundou cidades inteiras, junto com o conquistador e toda sua linhagem. Outra aparição famosa do dragão do mar foi sua batalha contra o aberrante Dragão da Tormenta. Até hoje o incansável guardião marinho traz no corpo e na alma as cicatrizes do terrível embate. Em sua forma humanoide, Benthos parece um tritão robusto de pele azulada, com roupas feitas de conchas e algas. Na forma de dragão, exibe um corpanzil esguio, com escamas brilhantes em tons de azul claro e verde água, barbatanas emergindo ao longo do corpo e uma longa cauda bifurcada. As asas, em forma de leque, são utilizadas para voar e nadar. O dragão vê o mundo seco como algo menor, mas considera como seu território as inúmeras ilhas que defende e a vastidão submersa que habita na maior parte do tempo, reinando sobre as criaturas do mar.
Monstro (dragão, deus menor) Colossal
Iniciativa +24, Percepção +31, percepção às cegas (longo), visão no escuro
Defesa 66, Fort +22, Ref +36, Von +30, imunidade a ácido, eletricidade, encantamento e precipitações (veja Tormenta20, p. 267), redução de dano 20, resistência a magia +5
Pontos de Vida 3.200
Deslocamento 12m (8q), natação 36m (24q), voo 36m (24q)
Corpo a Corpo Mordida +57 (6d20+55, 16), duas garras +57 (6d20+55, 16) e cauda +57 (6d20+55, 16).
Agarrar Aprimorado (Livre) Mordida (teste +67).
Aura Aterradora Vontade CD 51 evita. Uma criatura que falhe no teste de Vontade sofre 4d6 pontos de dano psíquico.
Coração da Tempestade (Completa) Benthos gera uma aura de 90m de raio com os mesmos efeitos de uma tempestade (veja Tormenta20, p. 267) que dura até o fim da cena ou até ele dissipá-la (uma ação livre).
Dilacerar Se Benthos acerta os dois ataques de garra em uma mesma criatura na mesma rodada, causa mais 1d100+55 pontos de dano.
Golpe Avassalador (Livre) Quando acerta um ataque de cauda, Benthos arremessa a vítima 1d6 x 1,5m em uma direção à escolha dele (Fort CD 51 evita). A vítima fica caída e, se atingir algum obstáculo, sofre 1d6 pontos de dano de impacto para cada 1,5m que foi arremessada.
Investida Relampejante (Completa) Benthos faz uma investida com sua mordida enquanto projeta relâmpagos por onde passa. Criaturas a até 9m do caminho percorrido por Benthos sofrem 10d12 pontos de dano de eletricidade e ficam ofuscadas por 1d4 rodadas (Ref CD 51 reduz à metade e evita a condição). Recarga (movimento).
Maremoto Vivo (Padrão) Se estiver no mar ou acima dele, Benthos invoca um maremoto que afeta todas as criaturas em um cilindro de 6m de raio e 30m de altura a partir da superfície da água. Criaturas nessa área sofrem 10d12 pontos de dano de impacto e são tragadas para dentro do mar (Fort CD 51 reduz à metade e evita ser tragado). Uma criatura tragada afunda 1,5m para cada 5 pontos de dano sofrido. Recarga (movimento).
Sopro (Padrão) Todas as criaturas em um cone de 24m sofrem 24d12 pontos de dano de ácido; além disso, suas armas e escudos empunhados, além de suas armaduras, são avariados (veja Ameaças de Arton, p. 375; Ref CD 51 reduz à metade e evita as condições). Recarga (movimento).
Varrer (Livre) Uma vez por rodada, quando Benthos faz um ataque corpo a corpo e reduz os pontos de vida do alvo para 0 ou menos, pode realizar um ataque adicional contra outra criatura dentro do seu alcance.
For 19, Des 2, Con 12, Int 7, Sab 9, Car 11
Perícias Conhecimento +23, Diplomacia +27, Enganação +27, Intimidação +32, Intuição +25, Misticismo +23, Sobrevivência +30.
Tesouro Triplo mais 10 peças de couro de dragão (CD 35 para extrair).`
      },
      {
        chave: "barbaBranca", nome: "Barba Branca", nd: "10*", tipo: "Humanoide (raça desconhecida) Médio",
        papel: '',
        titulo: "Coronel Barba Branca",
        fontes: "Ledd",
        resumo: "Acima de qualquer coisa, o homem conhecido como Coronel Barba Branca é um soldado.",
        texto:
`Barba Branca ND 10*
Acima de qualquer coisa, o homem conhecido como Coronel Barba Branca é um soldado. A personificação do que há de mais puro dentro dos valores militares do antigo reino de Yudennach. Filho adotivo do Capitão Brehme, que servia na cidade de Warton. Nada nessa história soaria estranho, não fosse por um detalhe — o fato de Barba Branca ter nascido com feições felinas. Alguns acreditam, sem nenhuma base factual em seu histórico, que ele foi trazido dos Reinos de Moreania ainda bebê por algum motivo desconhecido. Outros teorizam que se trata de uma maldição sofrida pelo próprio Brehme em seus tempos de juventude, e que Barba Branca é seu filho legítimo. A despeito do que se sussurra nos quartéis, porém, ninguém sabe a verdade. Nem o próprio Barba Branca. Criado dentro da mais tradicional disciplina, o coronel sempre pautou seus feitos e objetivos tendo como exemplo a vida de grandes heróis do passado do Reino de Yudennach, e rapidamente cresceu dentro das fileiras do exército. Talvez alcançasse o posto de Lorde General, não fosse o preconceito velado contra não humanos no que viria a se tornar a semente da Supremacia Purista. Seu progresso era frequentemente sabotado, o que alimentava seus próprios conflitos internos. Embora obedecesse a todas as ordens que recebia, não entendia por que havia tanto desprezo por outras raças. Um bom exército só funciona se todos forem um só. Em vez de promovido, o coronel foi transferido para a Prisão Hardof, talvez a mais segura e terrível de Arton. Recebeu o fardo de comandá-la, um carcereiro em seu próprio cárcere. Ainda assim, aceitou seu papel e pretendia garantir que a reputação do lugar jamais fosse manchada. O que aconteceu quando o misterioso prisioneiro chamado Ledd conseguiu escapar com a ajuda de um mago. Para cumprir seu dever, e se redimir por sua falha, o coronel partiu em uma perseguição implacável aos dois fugitivos, munido com uma obstinação raramente vista mesmo nas fileiras do Exército com uma Nação.
Humanoide (raça desconhecida) Médio
Iniciativa +14, Percepção +11
Defesa 35 (40 na primeira rodada), Fort +22, Ref +10, Von +16
Pontos de Vida 360
Deslocamento 9m (6q)
Corpo a Corpo Espada bastarda x2 +29 (3d6+26, 18).
Bloqueio Brutal (Reação) Uma vez por rodada, quando é atingido por um ataque, Barba Branca faz uma rolagem de dano corpo a corpo e subtrai o resultado dessa rolagem do dano causado pelo ataque.
Varrer (Livre) Uma vez por rodada, quando Barba Branca faz um ataque corpo a corpo e reduz os pontos de vida do alvo para 0 ou menos, pode realizar um ataque adicional contra outra criatura dentro do seu alcance.
Voz de Comando (Movimento) Barba Branca grita ordens que afetam todas as criaturas em uma esfera de 9m ao seu redor. Aliados de Barba Branca recebem +2 em testes de perícia e rolagens de dano até o fim da cena. Já inimigos ficam pasmos por uma rodada (Von CD 30 evita; um inimigo só pode ser afetado por esta habilidade uma vez por dia).
For 6, Des 5, Con 4, Int 2, Sab 2, Car 3
Perícias Acrobacia +9, Atletismo +15, Cavalgar +14, Diplomacia +12, Guerra +13, Intimidação +14, Nobreza +11.
Equipamento Couraça polida reforçada, espada bastarda precisa pungente. Tesouro Padrão. *Durante os eventos de Ledd, volumes 1 a 4.`
      },
      {
        chave: "cranioNegro", nome: "Crânio Negro", nd: "20", tipo: "Humanoide (humano/lefeu) Médio",
        papel: '',
        fontes: "Trilogia da Tormenta",
        resumo: "Há duas décadas surgia um novo vilão em Arton.",
        texto:
`Crânio Negro ND 20
Há duas décadas surgia um novo vilão em Arton. Era reconhecido onde quer que fosse por sua armadura de ferro fundido, com um elmo em forma de caveira que escondia suas feições. Tinha agilidade surpreendente e, com postura indolente e desleixada, não fazia esforço para intimidar suas vítimas, mas era aterrorizante por sua aparência e reputação. Mais inquietante ainda, mesmo tendo sido derrotado, mesmo que seu oponente tivesse certeza de tê-lo matado, sempre retornava. Crânio Negro se tornou um infame assassino e caçador de recompensas, sua aparente imortalidade garantindo que seguisse atrás de suas presas até que fossem capturadas ou mortas. Em sua carreira de mercenário aceitava ou recusava trabalhos de maneira aparentemente arbitrária: serviu a grandes senhores da guerra, eliminando alvos “impossíveis”, e também aceitou trabalhos banais em troca de poucos tibares, em aldeias nos confins do Reinado. Parecia ter ódio especial por magos e pelo então reino de Sambúrdia, mas mesmo isso não passava de especulações. Perseguia seus próprios objetivos indecifráveis, muitas vezes em aparente contradição consigo mesmo. Sua identidade era um mistério — o criminoso parecia ter surgido já com seus equipamentos e suas capacidades letais, sem que ninguém tivesse qualquer pista sobre seu passado. Mas, aos poucos, ficou claro que Crânio Negro era culpado de atos ainda mais atrozes: ele fizera um pacto com o Lorde da Tormenta Gatzvalith. Traiu a própria Criação, servindo à Tempestade Rubra em troca de alguma recompensa que ninguém conhecia. Nem ele mesmo. Crânio Negro não sabia quem era, tinha memórias conflitantes e não podia viver em Arton sem agonia a cada momento. Tinha alguma ligação com a Tormenta e a recompensa que tanto buscava era um lugar onde pudesse viver com algum conforto — um intermediário entre Arton e a Anticriação. Em 1403, Crânio Negro completou um estratagema que envolveu reunir os sobreviventes de um antigo grupo de aventureiros, espalhar simbiontes lefeu pelos Ermos Púrpuras e liderar uma coluna de guerreiros corrompidos em direção a Trebuck. Acreditava-se que sua intenção era declarar guerra contra Arton, mas o alvo do caçador era o próprio Gatzvalith. Crânio Negro havia traído seu antigo mestre e planejava marchar contra o Forte Amarid. Independente de seu objetivo, encontrou um inimigo à altura no cavaleiro Orion Drake. Os exércitos da Tormenta e do Reinado se enfrentaram, ainda que o caçador não desejasse isso. Ao fim desses eventos, descobriu que fora manipulado: tudo não passara de uma conspiração dos Lordes para que ele entendesse que era insignificante perto do poder da Anticriação. Isso só o tornou mais perigoso. Crânio Negro perseguiu seu maior alvo quando invadiu o Reino de Glórienn, a Deusa dos Elfos, para assassiná-la usando a espada de Khalmyr. Embora o plano tenha falhado, provocou a queda da divindade, que se tornou uma deusa menor. Com isso, o caçador foi recompensado com o que tanto queria: um lar. Tornou-se o Lorde da Tormenta de Tamu-ra e enfim achou que alcançaria a paz. Mas ainda tinha um inimigo. Orion Drake liderou um exército de deuses menores contra a área de Tormenta de Tamu-ra e, após uma batalha titânica, Crânio Negro enfim foi morto. A identidade do vilão segue um mistério para quase todos. Ninguém sabe o que aconteceu com os itens mágicos que usava e poucos conhecem a verdade sobre sua capacidade de ressuscitar. Hoje em dia, o maior caçador de recompensas de Arton continua como uma sombra na história do mundo, um lembrete de que traição e desespero podem tornar um artoniano tão terrível quanto um lefeu.
Humanoide (humano/lefeu) Médio
Iniciativa +27, Percepção +23, visão no escuro
Defesa 61, Fort +20, Ref +34, Von +28, cura acelerada 10, evasão, imunidade a confuso, efeitos de movimento e metamorfose, fortificação 50%, redução de dano 20, resistência a efeitos divinos +10
Pontos de Vida 1.250
Deslocamento 12m (8q), ignora terreno difícil natural
Corpo a Corpo Cimitarra x2 +56 (4d8+40, 15, sangramento), cimitarra secundária +56 (4d8+40, 15, sangramento) e desarmado +52 (2d6+40, 19).
À Distância Arco longo x3 +56 (4d8+40, 18/x3, alcance longo).
Ataque Corrompido Os ataques de Crânio Negro causam +3d8 pontos de dano contra criaturas nativas de Arton.
Caçador Rubro Crânio Negro pode se mover com seu deslocamento normal enquanto rastreia sem sofrer penalidades no teste de Sobrevivência, pode se esconder mesmo sem camuflagem ou cobertura disponível e a CD para rastreá-lo em terrenos naturais aumenta em +10.
Emboscar Crânio Negro executa uma ação padrão adicional em seu turno. Ele só pode usar esta habilidade na primeira rodada de um combate.
Explorador Quando está em florestas, planícies ou áreas de Tormenta, Crânio Negro soma sua Sabedoria na Defesa e em testes de Acrobacia, Atletismo, Furtividade, Percepção e Sobrevivência.
Invocar Lefeu (Completa) Uma vez por cena, Crânio Negro invoca um ou mais lefeu a sua escolha, cujo ND total somado seja igual a 20. Eles surgem em alcance curto e agem a partir da próxima rodada, em suas iniciativas.
Marca da Presa (Livre) Uma vez por rodada, Crânio Negro analisa uma criatura em alcance longo. Até o fim da cena, ele recebe +5 em testes de perícia, +5 na margem de ameaça e +2d10 em rolagens de dano contra essa criatura (esses bônus são dobrados contra espíritos, humanoides e monstros).
Saque Rápido Crânio Negro pode sacar e guardar itens como uma ação livre.
Semilekael Crânio Negro pode lançar qualquer magia simulada (veja Ameaças de Arton, p. 376) de até 3º círculo como um conjurador de 20º nível (CD 49) sem gastar PM e usando Intimidação no lugar de Misticismo.
For 5, Des 9, Con 4, Int 5, Sab 5, Car 1
Perícias Acrobacia +32, Atletismo +21, Diplomacia +15, Enganação +17, Furtividade +35, Guerra +21, Intimidação +24, Intuição +21, Investigação +26, Sobrevivência +26.
Equipamento Anel da felicidade de Vallen, arco longo caçador magnífico, armadura de Crânio Negro, cimitarra precisa magnífica sanguinária x2, flecha de adamante x20, sapatos de camurça aprimorados. Tesouro Padrão.`
      },
      {
        chave: "dannaArantur", nome: "Danna Arantur", nd: "7", tipo: "Humanoide (humana) Média",
        papel: '',
        fontes: "Atlas de Arton",
        resumo: "A filha bastarda do Rei Solast Arantur nasceu sob a sombra da nobreza.",
        texto:
`Danna Arantur ND 7
A filha bastarda do Rei Solast Arantur nasceu sob a sombra da nobreza. Akane Odomo, líder da Guarda Real, sabia que a filha jamais seria uma princesa e assim dedicou-se a treiná-la na arte da luta com machados, para que viesse a substituí-la no posto. A garota cresceu sabendo de sua ascendência, pois tollonienses não são dados a sutilezas e segredos. Danna cresceu na capital do antigo reino de Tollon, a cidade de Vallahim. Tinha como companheiros outros aprendizes e como lar as casernas da guarda. Tornou-se órfã de mãe muito cedo, mas o pai e o restante da guarnição nunca lhe deixaram faltar nada. Quando os minotauros atacaram Tollon, a garota lutou com bravura ao lado do rei e o viu cair defendendo seu povo. Em seus momentos finais, Solast declarou Danna sua herdeira real. Cheia de ódio e sentimento de vingança, a guerreira estava preparada para morrer ao lado do pai, mas o senso de responsabilidade herdado por Solast a dominou. Adotando o sobrenome real, Danna emergiu como uma líder popular, escoltando sobreviventes da capital até um esconderijo seguro o bastante para se estabelecer em uma nova comunidade isolada, que batizou de Arantur. Talvez seus pais desejassem que ela fosse criada entre o povo para uma situação como esta. Ainda que Tollon não fosse mais um reino, ela o governaria. Embora se recusasse a ter um título formal, acabou ficando conhecida como Princesa Danna onde quer que as notícias de seus feitos chegassem. Hoje em dia, a princesa é renomada por seus discursos inspiradores clamando vingança contra os minotauros. Entretanto, é extremamente reticente em permitir que qualquer pessoa refugiada deixe os muros deste enclave protegido, que considera uma “ilha de segurança” em meio à floresta. A guerreira tem em geral uma postura conciliadora quanto aos povos arborícolas, defendendo um novo Pacto da Semente. Contudo, desconfia das grandes instituições e coalizões, que não foram capazes de defender Tollon em sua hora de maior necessidade. Diz-se que Danna cultua o rei caído como um deus, e que tem planos de espalhar essa religião entre os membros da comunidade.
Humanoide (humana) Média
Iniciativa +7, Percepção +8
Defesa 31, Fort +20, Ref +10, Von +15, redução de dano 5, resistência a magia +2
Pontos de Vida 155
Deslocamento 6m (4q)
Corpo a Corpo Machado de batalha x2 +24 (2d8+25, x4).
Corte em Arco (Padrão) Danna Arantur faz um ataque corpo a corpo que atinge todos os inimigos em seu alcance natural (ela faz um único teste de ataque e compara o resultado com a Defesa de cada inimigo na área). Recarga (movimento).
Durona (Reação) Uma vez por rodada, quando sofre dano, Danna reduz esse dano à metade.
Lenhadora Veterana Os ataques de machado de Danna ignoram 5 pontos da RD de seus alvos e causam +1d8 pontos de dano contra plantas e criaturas com natureza vegetal.
Ordens (Movimento) Danna grita ordens para seus aliados em alcance médio. Eles recebem +2 em testes de perícia até o fim da cena.
Orgulho (Reação) Uma vez por cena, quando faz um teste de perícia, Danna soma o dobro de seu Carisma (+8) nesse teste.
For 3, Des 1, Con 2, Int 2, Sab 1, Car 4
Perícias Atletismo +10, Diplomacia +13, Guerra +9, Intuição +8, Nobreza +11, Ofício (lenhador) +11, Sobrevivência +8.
Equipamento Cota de malha reforçada, escudo pesado reforçado de madeira Tollon, machado de batalha pungente maciço, tabardo aprimorado. Tesouro Padrão.`
      },
      {
        chave: "dok", nome: "Dok", nd: "–", tipo: "Humanoide (goblin) Pequeno",
        papel: '',
        fontes: "Crônicas da Tormenta Vol. 2, A Joia da Alma, A Deusa no Labirinto",
        resumo: "Muito se fala sobre o martírio dos elfos com a queda de Lenórienn, mas quando guerras explodem, o sofrimento se faz presente em todos os lados.",
        texto:
`Dok ND –
Muito se fala sobre o martírio dos elfos com a queda de Lenórienn, mas quando guerras explodem, o sofrimento se faz presente em todos os lados. Dok começou sua vida como salteador no continente sul, transformando sucata em apetrechos para uso do bando. O barulho das geringonças, contudo, sempre alertava as vítimas e os ataques fracassavam. Expulso, o goblin passou a mendigar nas estradas. Um dia, acordou à base de pontapés. Estava sendo “recrutado” para a Aliança Negra. Tornou-se um dos milhares de goblins com limitado treinamento militar a inchar as fileiras da horda de Thwor. Sua inventividade foi a única coisa capaz de mantê-lo vivo em meio a constantes batalhas, e por fim ofereceu meios para que fugisse do conflito. Depois da deserção, conheceu sua companheira Mushna, com quem teve seu único filho e desfrutou de um pouco de felicidade em meio a uma vida de infortúnios. A guerra, porém, ainda tinha assuntos com ele. Teve sua caverna queimada por goblinoides e foi capturado por elfos, escapando em meio à queda de Lenórienn para o continente norte junto com a elfa Gwendolynn, que se tornaria sua melhor amiga. Atualmente, Dok é um dos maiores inventores de Arton, transformando qualquer coisa em engenhocas barulhentas, mas estranhamente eficientes. Se seu antigo bando pudesse vê-lo agora…
Humanoide (goblin) Pequeno
Iniciativa +11, Percepção +11, visão no escuro
Defesa 39, Fort +14, Ref +20, Von +26
Pontos de Vida 173
Deslocamento 9m (6q), escalada 9m (6q)
Pontos de Mana 52
Corpo a Corpo Chave de boca +27 (1d8+5 impacto).
À Distância Besta leve +34 (2d10+20, 18, mais injeção alquímica).
Ativação Rápida (Livre, 2 PM) Quando ativa uma engenhoca com ativação de uma ação padrão, Dok muda sua ativação para uma ação de movimento.
Chutes e Palavrões (Reação, 1 PM) Uma vez por rodada, Dok repete um teste de Ofício (engenhoqueiro) recém-realizado para ativar uma engenhoca.
Engenhosidade (Reação, 2 PM) Quando faz um teste de perícia (exceto de ataque), Dok soma sua Inteligência no teste.
Frontorrepulsor Experimental Dok possui um gerador de campo de força portátil que previne os primeiros 40 pontos de dano que ele sofre a cada turno.
Engenhocas Dok possui as seguintes engenhocas que ele ativa como um inventor de 12º nível (a CD de ativação é indicada em cada engenhoca, e a CD para resistir a elas é 35).
• Bazuca (Padrão, 6 PM, CD 24) Uma explosão causa 12d6 pontos de dano de fogo em todas as criaturas e objetos livres numa esfera de 6m em alcance médio (Ref reduz à metade). Bola de Fogo.
• Capacete de Hélice (Padrão, 3 PM, CD 18) Dok recebe deslocamento de voo 12m até o fim da cena. Voo.
• Colete Anti-Tudo (Padrão, 3 PM, CD 21) Dok recebe 50 pontos de vida temporários. Campo de Força.
• Fogos de Artifício (Padrão, 4 PM, CD 21) Aliados em alcance curto recebem +3 em testes de ataque e rolagens de dano até o fim da cena. Bênção.
• Motoca (Padrão, 3 PM, CD 21) Dok recebe uma montaria equivalente a um pônei mestre que pode atravessar terreno difícil sem redução em seu deslocamento. A montaria permanece por 1 dia e Dok usa Ofício (engenhoqueiro) no lugar de Cavalgar com ela. Montaria Arcana.
• Pistola Enredadora (Padrão, CD 16) Dok cria um cubo de terreno difícil de 6m em alcance curto. Criaturas na área, ou que comecem seu turno em seu interior, ficam enredadas (Ref evita). Uma criatura pode se libertar com uma ação padrão e um teste de Acrobacia ou Atletismo. Teia.
• Potencializador Marcial (Padrão, 4 PM, CD 20) Até o fim da cena, uma arma adjacente se torna mágica, fornecendo +2 nos testes de ataque e rolagens de dano e +1d6 pontos de dano de ácido. Arma Mágica.
For 1, Des 5, Con 1, Int 7, Sab 1, Car –1
Perícias Conhecimento +17, Cura +11, Diplomacia +9, Furtividade +17, Ladinagem +15 (+19 para abrir fechadura), Ofício (alquimista) +21, Ofício (armeiro) +21, Ofício (engenhoqueiro) +21, Pilotagem +16.
Equipamento Ácido x2, bálsamo restaurador x2, besta leve precisa de injeção alquímica, bomba x2, chave de boca (equivalente a uma maça), couro batido ajustado, gazua aprimorada, instrumentos de Ofício (alquimista, armeiro e engenhoqueiro) aprimorados, virotes de adamante x20. A CD para resistir aos preparados de Dok é 35. Tesouro Padrão.`
      },
      {
        chave: "fizGrin", nome: "Fiz-grin", nd: "13", tipo: "Espírito Pequeno",
        papel: '',
        fontes: "Guilda do Macaco, Atlas de Arton",
        resumo: "Fiz-grin é um dragão-fada que, como outros de sua espécie, lembra um dragão minúsculo com asas de borboleta.",
        texto:
`Fiz-grin ND 13
Fiz-grin é um dragão-fada que, como outros de sua espécie, lembra um dragão minúsculo com asas de borboleta. Como nenhum outro, entretanto, ele carrega uma particularidade curiosa: os padrões desenhados em cada uma de suas asas formam um número de três dígitos, que estranhamente parece mudar a cada novo encontro com a criatura. Uma cantiga para crianças, espalhada por boa parte do Reinado por bardos, pais e mães, parece explicar o fato. Segundo ela, há muitos anos, o dragonete pediu ao deus Hyninn que realizasse um grande sonho que carregava consigo. O tipo de sonho que só um deus maior seria capaz de realizar: transformá-lo em um dragão verdadeiro. Como nada vindo das mãos do Panteão é gratuito, o Deus da Trapaça propôs um jogo “inocente”: caso Fiz-grin conseguisse pregar uma peça em mil heróis, seu desejo seria atendido. Desde então, graças aos esforços criativos do dragonete e à curiosidade que permeia os artonianos, os números em suas asas decrescem sempre que ele consegue enganar, trapacear ou iludir aventureiros. Apesar de tudo isso, Fiz-grin não é um ser maligno. As peças que prega são apenas grandes brincadeiras, e depois de marcar mais um ponto em sua contagem, raramente se furta a ajudar grupos de aventureiros como puder. Ele inclusive sabe realizar uma grande quantidade de magias, com muito talento, especialmente aquelas relacionadas a ilusões. Mesmo com tanta esperteza, dizem que durante a Guerra Artoniana, utilizando-se de uma hábil manobra retórica, o cavaleiro Lothar Algherulff teria convencido o dragonete a mudar o foco de suas trapaças: a partir de então ele passaria a ludibriar apenas soldados puristas. Não se sabe se isso é verdade ou só mais um de inúmeros boatos, mas desde então Fiz-grin teria sido visto fora do seu bosque costumeiro. Boatos ainda mais ousados afirmam que, na verdade, agora o bosque se move junto com ele! Por fim, existem rumores afirmando que Fiz-grin teria completado o desafio há bastante tempo, mas que prefere não revelar sua forma verdadeira, continuando a pregar peças disfarçado com seu corpo antigo. Apenas mais um de seus golpes…
Espírito Pequeno
Iniciativa +14, Percepção +15, visão no escuro
Defesa 43, Fort +13, Ref +20, Von +26, imunidade a cansaço e efeitos de movimento, redução de dano 10/adamante, resistência a magia +3
Pontos de Vida 420
Deslocamento 6m (4q), voo 15m (10q)
Corpo a Corpo Duas garras +34 (2d4+14, 18) e mordida +34 (2d6+14, 18).
Rei das Ilusões Fiz-grin pode lançar qualquer magia de ilusão, arcana ou divina, de até 4º círculo como um feiticeiro de 13º nível (CD 37) sem gastar PM.
Roubar Magia (Reação) Uma vez por rodada, quando vê outra criatura em alcance curto sendo alvo de uma magia, Fiz-grin pode roubar o efeito dessa magia. O alvo da magia deve fazer um teste de Vontade (CD 37); se falhar, Fiz-grin recebe o efeito da magia em seu lugar.
Sentidos Onipresentes Fiz-grin sabe de tudo que acontece em seu bosque, sem necessidade de testes.
Sopro Iridescente (Padrão) Fiz-grin sopra pó iridescente em um cone de 9m. Criaturas na área ficam atordoadas por 1 rodada (apenas uma vez por cena, Von CD 37 evita) e ofuscadas (criaturas cegas não sofrem essas condições) e são cobertas por uma aura brilhante que impede que recebam camuflagem por escuridão ou invisibilidade até o fim da cena. Ilusão. Recarga (movimento).
Visão Feérica Fiz-grin está permanentemente sob efeito da magia Visão Mística. Dentro de seu bosque, ele recebe o aprimoramento que permite enxergar criaturas e objetos invisíveis.
For 0, Des 4, Con 1, Int 4, Sab 3, Car 5
Perícias Conhecimento +14, Diplomacia +15, Enganação +20, Furtividade +16 (+26 em seu bosque), Jogatina +17, Ladinagem +16, Intuição +13, Misticismo +16, Sobrevivência +15.
Tesouro Padrão.`
      },
      {
        chave: "goblinHeroi", nome: "Goblin Herói", nd: "8", tipo: "Humanoide (goblin) Pequeno",
        papel: '',
        fontes: "Fim dos Tempos",
        resumo: "A Favela dos Goblins é a região mais menosprezada de Valkaria, o lugar onde a desigualdade da capital se torna mais evidente e cruel.",
        texto:
`Goblin Herói ND 8
A Favela dos Goblins é a região mais menosprezada de Valkaria, o lugar onde a desigualdade da capital se torna mais evidente e cruel. No entanto, é também uma comunidade unida, com uma população que protege os seus. E, quando os cidadãos goblins não conseguem se proteger, sabem que podem contar com seu próprio vigilante mascarado, um guardião galante que, década após década, luta em nome dos desamparados. Sua identidade é um mistério e ele é conhecido apenas por seu codinome de vigilante: O Goblin Herói. Este guardião verde traja armadura completa reluzente e cavalga um imenso lobo das cavernas. Sua batalha é constante, ainda que não erga nenhum estandarte. Mas trava a luta em seus próprios termos: decepa braços e pernas, quebra ossos, deixa malfeitores desacordados, mas nunca tira uma vida. Então desaparece tão rápido quanto surgiu. Alguns acreditam que o Goblin Herói é a encarnação de Graolak, uma divindade menor dos goblinoides. Outros, por seu estilo de combate e código de ética, veem-no como um paladino de Lena, a Deusa da Vida. Os mais céticos garantem que não passa de uma lenda, um boato espalhado pelos goblins como forma de se prevenir contra injustiças. Afinal, se as histórias sobre ele fossem verdadeiras, o herói teria morrido de velhice há bastante tempo. Há um pouco de verdade em cada uma dessas hipóteses: o Goblin Herói é uma lenda urbana, mas também é real. O primeiro a ostentar o título confiou legado, codinome e armadura a um sucessor, que seguiu a tradição, mantendo a chama do protetor da Favela dos Goblins viva ao longo das décadas. Nenhum indivíduo é o Goblin Herói, mas sempre haverá um. O atual Goblin Herói é uma jovem paladina de Lena — confirmando uma das teorias, ainda que ninguém tenha certeza disso. Sua identidade é conhecida apenas por um punhado de outros vigilantes mascarados de Valkaria, os poucos em quem ela confia para manter o segredo. Mas, mesmo que seja exposta e morta por algum vilão, a atual Goblin Herói já garantiu um sucessor para a tradição de heroísmo.
Humanoide (goblin) Pequeno
Iniciativa +12, Percepção +9, visão no escuro
Defesa 33 (38 na primeira rodada de combate), Fort +21, Ref +10, Von +15, redução de dano 5, resistência a efeitos mentais e medo +5
Pontos de Vida 240
Deslocamento 9m (6q), escalar 9m (6q)
Pontos de Mana 29
Corpo a Corpo Espada curta x2 +26 (1d6+20 não letal, 19).
Aura Sagrada (Livre, 1 PM, sustentada) O Goblin Herói gera uma aura de luz com 9m de raio. Ela e seus aliados dentro da aura recebem +5 em testes de resistência e curam 11 PV no início de seus turnos.
Camuflagem Urbana Em ambientes urbanos, o Goblin Herói pode se esconder mesmo sem camuflagem ou cobertura disponível.
Cura pelas Mãos (Movimento, 2 PM) O Goblin Herói cura 4d6+13 pontos de vida de uma criatura em alcance curto. Quando usa esta habilidade, ela pode gastar +1 PM para anular uma condição do alvo entre abalado, apavorado, atordoado, cego, doente, exausto, fatigado ou surdo.
Devota de Lena Efeitos de cura usados pelo Goblin Herói e seus aliados em um raio de 9m recuperam +1 PV por dado, e o Goblin Herói soma o próprio Carisma aos PV restaurados por seus efeitos mágicos de cura (já contabilizado). Entretanto, como uma paladina da Deusa da Vida, ela segue as Obrigações & Restrições de Lena e o Código do Herói (veja Tormenta20, pp. 82 e 100).
Golpe Divino (Livre, 3 PM) Quando faz um ataque corpo a corpo, o Goblin Herói soma o Carisma no teste de ataque e +2d8 na rolagem de dano.
Lobo Fiel O Goblin Herói cavalga um corajoso lobo veterano (veja Tormenta20, p. 262). Enquanto ela estiver montada seu deslocamento normal se torna 15m e ela recebe +1d6 em rolagens de dano corpo a corpo.
For 1, Des 4, Con 1, Int 2, Sab 1, Car 5
Perícias Adestramento +13, Atletismo +9, Cavalgar +12, Cura +15, Furtividade +11 (+9 montada), Investigação +10, Religião +9.
Equipamento Couraça polida, escudo pesado, espada curta, maleta de medicamentos aprimorada, manto camuflado aprimorado (urbano), sela, símbolo sagrado de Lena.
Tesouro Metade.`
      },
      {
        chave: "gregorVahn", nome: "Gregor Vahn", nd: "12", tipo: "Humanoide (humano) Médio",
        papel: '',
        fontes: "Trilogia da Tormenta",
        resumo: "Outrora um paladino imortal de Thyatis, Gregor Vahn nasceu em uma rica família mercante de Tyrondir, mas não se dedicou ao comércio — em vez",
        texto:
`Gregor Vahn ND 12
Outrora um paladino imortal de Thyatis, Gregor Vahn nasceu em uma rica família mercante de Tyrondir, mas não se dedicou ao comércio — em vez disso, ouviu o chamado do Deus da Ressurreição, o que o levou a se juntar ao grupo de aventureiros mais tarde conhecido como o Esquadrão do Inferno. Contudo, a trajetória trágica desse bando levou Gregor a se envolver com a Tormenta. Enlouquecido e obcecado em descobrir qual era sua própria Morte Final, passou a colaborar com o caçador de recompensas Crânio Negro, num plano horrendo que levaria à queda de Glórienn, a Deusa dos Elfos. Curiosamente, mesmo praticando atos malignos, Gregor conseguia empunhar Rhumnam, a espada sagrada de Khalmyr. Talvez a própria confusão mental extrema do paladino (ou ex-paladino?) explique isso. O trauma que sofrera no passado o fazia acreditar que continuava praticando o bem. Gregor carregava um escudo com a face do Deus-Sol, encontrado durante suas aventuras. Por muito tempo o item permaneceu perdido, mas hoje é carregado por um outro paladino de Thyatis, que estaria tentando redimir seu nome e legado.
Humanoide (humano) Médio
Iniciativa +11, Percepção +11
Defesa 44, Fort +26, Ref +20, Von +12, imunidade a adivinhação, efeitos mentais e medo
Pontos de Vida 600
Deslocamento 6m (4q)
Pontos de Mana 39
Corpo a Corpo Espada bastarda x3 +36 (2d10+30 não letal, 17).
Anular a Si Como um paladino devoto de Thyatis, Gregor segue o Código do Herói e as Obrigações & Restrições do Deus da Ressurreição (veja Tormenta20, pp. 82 e 104). Entretanto, quando justificado por sua própria insanidade, ele pode violar ambos sem penalidades.
Aura Sagrada (Livre, 1 PM, sustentada) Gregor Vahn gera uma aura de luz com 9m de raio. Ele e seus aliados dentro da aura recebem +3 em testes de resistência.
Cura pelas Mãos (Movimento, 3 PM) Gregor cura 3d8+3 pontos de vida de uma criatura adjacente. Quando usa esta habilidade, ele pode gastar +1 PM para anular uma condição do alvo entre abalado, apavorado, atordoado, cego, doente, exausto, fatigado ou surdo.
Dom da Imortalidade Gregor é imortal. Sempre que morre, não importando o motivo, ele volta à vida após 3d6 dias.
Duro de Matar (Reação) Uma vez por cena, se sofrer dano que fosse reduzir seus PV a 0 menos, em vez disso Gregor fica com 1 PV.
Golpe Divino (Livre, 4 PM) Quando faz um ataque corpo a corpo, Gregor soma o Carisma no teste de ataque e +3d8 na rolagem de dano. Quando usa esta habilidade, Gregor ofusca todos os inimigos em um raio de 9m até o início do próximo turno dele.
Orar Gregor pode lançar as seguintes magias divinas (CD 33).
• Arma Mágica (Padrão, 3 PM) Até o fim da cena, uma arma adjacente se torna mágica, fornecendo +1 nos testes de ataque e rolagens de dano e +1d6 pontos de dano de fogo.
• Escudo da Fé (Reação, 3 PM) Quando uma criatura em alcance curto sofre um ataque, ela recebe +3 na Defesa por 1 turno.
Varrer (Livre) Uma vez por rodada, quando Gregor faz um ataque corpo a corpo e reduz os pontos de vida do alvo para 0 ou menos, pode realizar um ataque adicional contra outra criatura dentro do seu alcance.
For 5, Des 1, Con 3, Int 1, Sab 1, Car 3
Perícias Atletismo +15, Cavalgar +11, Cura +11, Diplomacia +15, Nobreza +11, Religião +11. EquipamentoArmadura completa defensora, escudo de Azgher, espada bastarda certeira, manto do fascínio, símbolo sagrado de Thyatis, tabardo aprimorado. Tesouro Metade.`
      },
      {
        chave: "gwenHaggenfar", nome: "Gwen Haggenfar", nd: "15", tipo: "Humanoide (humana) Média",
        papel: '',
        fontes: "Atlas de Arton",
        resumo: "Ex-sumo-sacerdotisa de Wynna, a Deusa da Magia, Haggenfar é uma feiticeira perigosamente cativante, que por muito tempo ostentou uma fachada",
        texto:
`Gwen Haggenfar ND 15
Ex-sumo-sacerdotisa de Wynna, a Deusa da Magia, Haggenfar é uma feiticeira perigosamente cativante, que por muito tempo ostentou uma fachada bondosa, erguendo escolas de magia por todo o Reinado. Porém, isso se provou apenas um plano para reunir diversos aprendizes, os quais sacrificou em um ritual de proporções catastróficas para acumular poder. Haggenfar também é uma ávida colecionadora de pergaminhos e possui um arsenal de magias únicas. Ela faz o que for preciso, incluindo roubos e assassinatos, para aumentar sua coleção. Por todos os seus crimes, a feiticeira ostenta uma das maiores recompensas oferecidas pelo Reinado pela cabeça de alguém. Para a arquimaga, aqueles capazes de canalizar energias arcanas são superiores, e os que não possuem tal habilidade são não mais do que gado. Não se sabe os motivos pelos quais uma divindade bondosa permitiu que a malfeitora ocupasse o mais alto posto de seu sacerdócio. Alguns dizem que foi apenas mais um capricho. Outros, que esta seria a prova de que a deusa acredita que qualquer criatura deve ter acesso a magia. Sua última aparição foi em Shallankh’rom, ilha no reino de Ahlen protegida por um campo de força conjurado pela própria criminosa, que ficou sob cerco das autoridades por anos. Dizem que, em seu interior, buscava roubar os poderes de uma menina, supostamente a reencarnação da lendária bruxa Hangpharstyth.
Humanoide (humana) Média
Iniciativa +14, Percepção +17
Defesa 44, Fort +22, Ref +15, Von +28, imunidade a adivinhação e efeitos mentais, redução de dano 20/mundano, resistência a magia +5
Pontos de Vida 280
Deslocamento 9m (6q)
Pontos de Mana 91
Corpo a Corpo Cajado da destruição x2 +41 (2d6+10 mais 4d12 essência).
Colecionadora Arcana Quando encontrada pela primeira vez, Haggenfar possui 2d6 pergaminhos contendo magias adequadas à situação.
Escudo Místico Quando Haggenfar lança uma magia, ela recebe 5 PV temporários para cada PM gasto nessa magia.
Magia Acelerada (Livre, +4 PM) Uma vez por rodada, quando lança uma magia com execução de ação completa ou menor, Haggenfar muda a execução dela para livre.
Magia Ampliada (Livre, +2 PM) Quando lança uma magia, Haggenfar pode aumentar seu alcance em um passo (de curto para médio, de médio para longo) ou dobrar sua área de efeito.
Magia Discreta (Livre, +2 PM) Quando lança uma magia, Haggenfar não precisa gesticular ou falar, e pode lançar a magia com as mãos presas, amordaçada etc. Perceber que ela lançou uma magia exige passar em um teste de Misticismo (CD 20).
Visão Mística Permanente Haggenfar está permanentemente sob efeito da magia Visão Mística com o aprimoramento que permite enxergar criaturas e objetos invisíveis.
Magias Como uma feiticeira de 15º nível (CD 42, limite de PM 20). Haggenfar pode lançar tanto magias arcanas quanto divinas.
• Campo de Força (Reação, 10 PM) Quando sofre dano, Gwen recebe redução de dano 70 contra esse dano.
• Curar Ferimentos (Padrão, 19 PM) Uma criatura adjacente cura 20d8+20 PV ou criaturas escolhidas em alcance curto curam 15d8+15.
• Dissipar Magia (Padrão, 3 PM) Gwen escolhe uma criatura, objeto ou esfera de 3m em alcance médio e faz um teste de Misticismo. Todas as magias nesse alvo com CD igual ou menor que o resultado do teste são dissipadas.
• Marionete (Padrão, 10 PM, sustentada) Gwen controla as ações físicas de uma criatura em alcance médio. Ao sofrer a magia, e no início de cada um de seus turnos, a vítima faz um teste de Fortitude. Se passar, a magia é anulada.
• Relâmpago (Padrão, 14 PM) Gwen causa 14d6+14 pontos de dano de eletricidade em criaturas a sua escolha em alcance médio (Ref reduz à metade).
• Teletransporte (Padrão, 8 PM) Gwen e até 4 criaturas voluntárias adjacentes são teletransportados para um santuário previamente preparado por Gwen.
• Velocidade (Padrão, 10 PM, sustentada) Gwen pode executar uma ação padrão adicional por turno.
For –1, Des 1, Con 2, Int 4, Sab 4, Car 5
Perícias Conhecimento +17, Cura +17, Enganação +20, Furtividade +14, Intuição +17, Investigação +17, Misticismo +19, Ofício (alquimista) +19, Ofício (escriba) +19, Religião +19.
Equipamento Anel da energia, bola de cristal, cajado da destruição, dois instrumentos de Ofício (alquimista e escriba) aprimorados, medalhão de prata, organizador de pergaminhos, símbolo sagrado de Wynna. Tesouro Dobro.`
      },
      {
        chave: "gwendolynn", nome: "Gwendolynn", nd: "18", tipo: "Humanoide (elfa, deusa menor) Média",
        papel: '',
        titulo: "Gwendolynn Libertadora",
        fontes: "Crônicas da Tormenta Vol. 2, A Joia da Alma, A Deusa no Labirinto",
        resumo: "Mais conhecida como Gwen, esta elfa cresceu em um templo de Tanna-Toh nas imediações de Lenórienn, a antiga capital de seu povo.",
        texto:
`Gwendolynn ND 18
Mais conhecida como Gwen, esta elfa cresceu em um templo de Tanna-Toh nas imediações de Lenórienn, a antiga capital de seu povo. Apesar da vocação para clériga da Deusa do Conhecimento, desde cedo demonstrou também fascinação pela busca da liberdade — sua e do próximo. Após presenciar a morte de todos que amava e ver a biblioteca élfica em chamas, fugiu para Arton Norte acompanhada de um goblin que ela havia acabado de libertar e viria a se tornar seu melhor amigo. No novo continente, continuou a disseminar o conhecimento através de seu trabalho como professora itinerante, dando especial atenção à preservação da cultura élfica. Ao longo de suas viagens, cumpriu missões de exploração, resgate e aconselhamento, deixando um rastro de benfeitorias por onde passava e fazendo amizade com aventureiros que compartilhavam de seus ideais de liberdade. Ao descobrir que alunos seus haviam sido capturados pelo Império de Tauron, Gwen atravessou o continente para se unir ao que ficou conhecida como a Revolta da Lavoura. Porém, nem mesmo seus conselhos foram capazes de impedir que o líder dos revoltosos fosse traído e se tornasse vítima de sua própria ingenuidade. Sem um líder para seguir, e tendo ouvido falar sobre um raio de esperança que surgia no coração da capital táurica, Gwen tomou uma atitude desesperada: entregou a si mesma como escrava, com o objetivo de destruir o sistema de dentro para fora. Na ocasião, pensou estar sacrificando apenas a si mesma. Porém, tarde demais descobriu que o preço a se pagar pela liberdade de um povo é muito mais alto. Gwen estava em Tiberus quando veio a Tormenta. Presenciou a disputa de poder entre os deuses. E, após libertar os escravos de correntes visíveis e invisíveis, com a aprovação de Tanna-Toh em pessoa, recebeu ela própria sua fagulha divina. Hoje não é mais clériga. É Gwendolynn, a Deusa Menor da Liberdade. A Revolta da Lavoura Pouco antes da queda do Império de Tauron, um grupo de escravos se revoltou contra seus senhores, em um episódio que ficou conhecido como a Revolta da Lavoura. Liderados por Domitius, um minotauro escravizado por seus próprios conterrâneos, os revoltosos logo buscaram novos aliados. Contudo, esses aliados eram muito diferentes entre si, e rixas surgiram. Escravos que trabalhavam nas lavouras queriam a liberdade. Escravos que trabalhavam dentro das casas senhoris também queriam a liberdade, mas sem abrir mão de seus “privilégios”. Guerrilheiros mercenários queriam ouro. Piratas lutavam por quem pagasse mais. Missionários de diferentes deuses tinham objetivos conflitantes. Alguns dos rebeldes queriam ir embora de Tapista, outros queriam conquistar suas próprias terras dentro do reino. Gwen foi parte da revolta, atuando como conselheira de Domitius. O líder recebeu ofertas de ouro e terras em troca de sua rendição, mas era valente e incorruptível. Contudo, era também ingênuo. Por fim, a revolta foi traída por um de seus aliados e esmagada pelas legiões do Império. Gwen sobreviveu por pouco. Domitius foi esquartejado, seus restos mortais espalhados por Tapista para servir de exemplo. Porém, Gwen teve uma surpresa quando viu o companheiro exposto. Não era o couro duro e peludo de seu antigo líder, nem seus cascos de minotauro. Era um corpo de humano. Vitoriosos, os senadores reescreveram a história, para atribuir a revolta contra o sistema táurico a um membro de outra raça. Até hoje o paradeiro dos restos mortais de Domitius é desconhecido.
Humanoide (elfa, deusa menor) Média
Iniciativa +19, Percepção +24, visão na penumbra
Defesa 55, Fort +17, Ref +27, Von +32, cura acelerada 20, imunidade a atordoamento, efeitos de metabolismo e movimento, medo, metamorfose e veneno, redução de dano 20
Pontos de Vida 710
Deslocamento 12m (8q), ignora terreno difícil
Pontos de Mana 220
Corpo a Corpo Cajado de batalha x3 +47 (4d8+25 mais 4d10 luz).
Canalizar Energia Positiva (Padrão, 1 PM+) Gwen libera uma onda de energia positiva que afeta criaturas a sua escolha em alcance curto. Para cada PM gasto, as criaturas escolhidas curam 1d6 PV ou, se forem mortos-vivos, sofrem 1d6 pontos de dano de luz (Von CD 46 reduz à metade).
Magia Acelerada (Livre, +4 PM) Uma vez por rodada, quando lança uma magia com execução de ação completa ou menor, Gwen muda a execução dela para livre.
Prece de Combate (+2 PM) Quando lança uma magia divina com tempo de conjuração de uma ação padrão em si mesma, Gwen pode lançá-la como uma ação de movimento.
Romper os Grilhões (Movimento) Gwen encerra todas as condições mentais e de medo, metamorfose e movimento em qualquer número de criaturas a sua escolha em alcance médio.
Magias Como uma clériga de 18º nível (CD 50, limite de PM 25).
• Aura Divina (Padrão, 19 PM) Gwen emana uma aura brilhante com 9m de raio até o fim da cena. Gwen e seus aliados devotos na área ficam imunes a encantamento e recebem +12 na Defesa e em testes de resistência (para aliados não devotos de Gwen esse bônus é +7). Inimigos que entrem na área devem fazer um teste de Vontade; em caso de falha, recebem uma condição entre esmorecido, debilitado ou lento até o fim da cena. Esse teste deve ser repetido cada vez que a criatura entra novamente na área.
• Bênção (Padrão, 9 PM) Aliados em alcance curto recebem +5 em testes de ataque e rolagens de dano até o fim da cena.
• Cólera de Azgher (Padrão, 22 PM) Cria um fulgor dourado e intenso em uma esfera com 12m de raio em alcance médio. Criaturas na área sofrem 20d6 pontos de dano de fogo (mortos-vivos sofrem 20d8) e ficam cegas (Ref reduz o dano à metade e evita a condição).
• Curar Ferimentos (Padrão, 24 PM) Uma criatura adjacente cura 25d8+25 PV ou criaturas escolhidas em alcance curto curam 20d8+20.
• Globo da Verdade de Gwen (Padrão, 3 PM) Um globo flutuante e intangível de 50cm de diâmetro se manifesta em alcance curto até o fim da cena. O globo mostra uma cena vista uma semana atrás por Gwen ou por uma criatura que ela toque ao lançar a magia (Von CD 55 evita).
• Pele de Pedra (Padrão, 10 PM) Gwen recebe redução de dano 10 até o fim da cena.
• Preparação de Batalha (Padrão, 3 PM, penalidade de 1 PM) Gwen toca sua arma e sua armadura. A qualquer momento após lançar essa magia, ela pode gastar uma ação completa e descarregar a magia para convocar esses itens, que aparecem em seu corpo e em suas mãos (como apropriado ao item).
For 3, Des 4, Con 2, Int 5, Sab 7, Car 5
Perícias Conhecimento +25, Cura +22, Intuição +22, Misticismo +20, Ofício (escriba) +20, Ofício (professora) +20, Religião +34.
Equipamento Cajado de batalha magnífico, meia armadura delicada guardiã de mitral, organizador de pergaminhos (contém 10 pergaminhos mágicos quaisquer), símbolo sagrado de Gwen. Tesouro Padrão.`
      },
      {
        chave: "generalSupremo", nome: "General Supremo", nd: "20", tipo: "Humanoide (humano) Grande",
        papel: '',
        titulo: "Hermann Von Krauser, o General Supremo",
        fontes: "Guilda do Macaco, Segredos de Arton",
        resumo: "Um dos piores flagelos de Arton, este veterano serviu em todas as patentes do exército real de Yudennach, de recruta a Lorde General.",
        texto:
`General Supremo ND 20
Um dos piores flagelos de Arton, este veterano serviu em todas as patentes do exército real de Yudennach, de recruta a Lorde General. Após dar baixa, tornou-se líder dos puristas, na época apenas uma facção dentro do reino, e usou-os para dar um golpe de estado na antiga monarquia, transformando-a na ditadura que viria a ser conhecida como Supremacia Purista. Durante a Guerra Artoniana, liderou os batalhões puristas e quase atingiu seu objetivo de conquistar o Reinado e transformá-lo em uma única hierarquia. Seu plano falhou apenas pela intervenção dos Campeões de Svalas, que invadiram sua Fortaleza Móvel e o derrotaram em combate. Infelizmente, o General Supremo é um estrategista sagaz, com planos dentro de planos. Ao revelar, em uma bola de cristal, centenas de inocentes que seriam executados caso ele fosse preso ou morto, obrigou os heróis a deixá-lo recuar. Apesar de ter escapado, Von Krauser não saiu incólume. Um ferimento desferido pelo cavaleiro Lothar Algherulff, usando a espada cristalina Carthalkan, tirou do General Supremo o movimento de suas pernas. Fisicamente, o líder purista é um homem de idade avançada, fato visível em seus cabelos grisalhos e rosto repleto de marcas. Apesar disso, possui mente afiada e, quando fala, projeta sua voz por todo o ambiente, dominando a atenção dos ouvintes. Um segredo do General Supremo é sua hipocrisia. Embora diga desprezar outras raças, mantém uma aliança com o Império Trollkyrka, que envolve troca de prisioneiros escravizados pelos batalhões puristas por riquezas extraídas do subterrâneo pelos trolls, que financiam a máquina de guerra da Supremacia. Mais do que isso, o próprio General Supremo teria sido alvo de experimentos biomantes para elevar sua força e vigor a níveis sobrehumanos, mesmo em sua idade avançada. Até o momento, nenhum tratamento mundano ou mágico foi capaz de curar o General Supremo do ferimento causado por Lothar. Contudo, inventores puristas desenvolveram para ele um engenho que o permite se locomover: o mecanotrono. Desde então, Von Krauser voltou à ativa, e relatórios de espiões do Reinado dizem que tem visitado os quartéis de toda a Supremacia. A verdade é que para o General Supremo a guerra nunca acabou, e ele espera em breve poder lembrar o Reinado disso.
Humanoide (humano) Grande
Iniciativa +26, Percepção +22
Defesa 65, Fort +28, Ref +18, Von +36, resistência a magia +5
Pontos de Vida 750
Deslocamento 12m (8q), ignora terreno difícil
Corpo a Corpo Espada bastarda x3 +59 (4d10+45, 17/x3).
À Distância Pistola-tambor x3 +59 (4d8+45, 15/x3, mais 4d8 contra humanoides não humanos).
Arsenal do Mecanotrono (Movimento) Criaturas adjacentes a Von Krauser sofrem 4d12+50 pontos de dano de corte (Ref CD 50 reduz à metade).
Guarda Suprema No início de cada turno de Von Krauser, 5 guarda-costas de elite surgem em espaços desocupados em alcance médio dele. Os guarda-costas agem assim que surgem (veja a ficha deles na página ao lado). A forma como isso ocorre fica a critério do mestre: chegam correndo ao ver o General Supremo em perigo; aparecem por teletransporte ou mesmo já estavam por perto, mas invisíveis, e apenas se revelam. Os guarda-costas não contam para o cálculo de XP e tesouro do encontro.
Mecanotrono Em seu mecanotrono, Von Krauser tem tamanho Grande, deslocamento 12m e não é afetado por terreno difícil (já contabilizado). No início de cada rodada, o engenho gera um campo de força que absorve os 200 primeiros pontos de dano sofridos pelo General Supremo na rodada. É possível tirar Von Krauser do mecanotrono, mas fazer isso exige causar pelo menos 200 pontos de dano nele na rodada (para eliminar o campo de força), agarrá-lo e então vencer outro teste de manobra para tirá-lo do engenho. Fora do mecanotrono, Von Krauser volta a ser uma criatura Média, fica permanentemente caído, tem seu deslocamento reduzido a 1,5m e perde a habilidade Arsenal do Mecanotrono.
Ordem Inquestionável (Livre) Uma vez por rodada, Von Krauser profere uma ordem da lista a seguir a uma criatura inteligente em alcance médio. Se o alvo falhar no teste de resistência (Von CD 51), deve obedecer à ordem em seu próximo turno da melhor maneira possível.
• Ataque: o alvo ataca outra criatura à escolha de Von Krauser, usando suas melhores habilidades para isso.
• Fuja: o alvo gasta seu turno se afastando de Von Krauser (usando todas as suas ações).
• Submeta-se: o alvo solta quaisquer itens que esteja empunhando e fica pasmo.
• Venha: o alvo gasta o turno se aproximando de Von Krauser (usando todas as ações dele para isso).
Plano de Contingência (Reação) Se Von Krauser for afetado por um efeito mental, de movimento, de metamorfose ou de “morte instantânea”, ele anula esse efeito. Efeitos de morte instantânea incluem aqueles que reduzem seus PV a 0 ou menos instantaneamente (como Assassino Fantasmagórico), que aprisionam ou destroem seu corpo ou alma (como Buraco Negro e Roubar a Alma) e similares. O mestre tem a palavra final se um efeito é ou não de morte instantânea. Recarga (padrão).
Táticas Supremas (Movimento) Von Krauser grita ordens para seus aliados em alcance médio. Eles recebem +5 em testes de perícia, +1d8+5 em rolagens de dano e +2 em Defesa até o fim da cena.
For 6, Des 0, Con 6, Int 6, Sab 6, Car 6
Perícias Conhecimento +22, Diplomacia +22, Enganação +22, Guerra +32, Intimidação +22, Intuição +22, Nobreza +22, Ofício (soldado) +22, Pilotagem +16.
Equipamento Anel da liberdade, armadura completa sob medida abascanta, espada bastarda de adamante maciça magnífica veloz, medalhão de Lena, pistola-tambor de mitral precisa anti-humanoides caçadora magnífica (a pistola-tambor de Von Krauser é uma arma especial que armazena 12 munições, em vez das 4 normais).
Tesouro Dobro.`
      },
      {
        chave: "guardaCostasDeElite", nome: "Guarda-costas de elite", nd: "–", tipo: "Humanoide (humano) Médio",
        papel: '',
        resumo: "Humanoide (humano) Médio",
        texto:
`Guarda-costas de elite ND –
Humanoide (humano) Médio
Iniciativa +12, Percepção +15, percepção às cegas
Defesa 50, Fort –, Ref –, Von – (falha automaticamente em qualquer teste oposto ou de resistência)
Pontos de Vida 1
Deslocamento 6m (4q)
Corpo a Corpo Espada bastarda (1d12+25, acerto automático).
À Distância Besta pesada (1d12+20, acerto automático).
Sacrifício Fanático (Reação) Quando o guarda-costas de elite é afetado por um efeito de área, ele se posiciona de forma a proteger um aliado na mesma área. O guarda-costas é afetado (e não pode ser protegido por esta habilidade), mas faz com que seu aliado não seja.
For 5, Des 1, Con 4, Int 1, Sab 2, Car –1
Perícias Intimidação +12, Intuição +13, Ofício (soldado) +12.
Equipamento Armadura completa reforçada, besta pesada certeira, escudo pesado reforçado, espada bastarda aumentada certeira de adamante, virotes de adamante x20. Tesouro Nenhum.`
      },
      {
        chave: "hippion", nome: "Hippion", nd: "16", tipo: "Animal (deus menor) Grande",
        papel: '',
        titulo: "Hippion, o Deus menor dos Cavalos",
        fontes: "Trilogia da Tormenta",
        resumo: "Este inigualável corcel é considerado a deus principal de Namalkah, sendo mais adorado até mesmo que as vinte divindades maiores.",
        texto:
`Hippion ND 16
Este inigualável corcel é considerado a deus principal de Namalkah, sendo mais adorado até mesmo que as vinte divindades maiores. A história conta que, quando os primeiros povoadores vindos do sul chegaram, tiveram um encontro pacífico com os nativos. Isso influenciou muito a cultura rústica namalkahniana. Os locais já adoravam o deus, considerando-o a montaria imortal de inúmeros heróis ao longo da história. Alguns dos centauros mais antigos o tinham como seu próprio criador. Com o passar dos séculos a devoção a este ser só cresceu. Amazonas, ginetes e tropeiros faziam oferendas, chamando-o por um longa lista de epítetos como “o Indomável”, “Pai dos Tropéis do Trovão” e “Trono das Rainhas Guerreiras”. Dizem que às vezes o garanhão eterno viaja incógnito, permitindo apenas que pessoas verdadeiramente dignas o montem. Suas aparições causam um desejo irrefreável de correr pelas planícies e, geralmente, ele é seguido por um cortejo enorme de outros cavalos, todos parecendo meros potros ao seu lado. A forma mais retratada do deus tem pelos brancos, com uma crina longa e selvagem e olhos completamente claros, parecendo refletir o infinito. Entretanto, ele é conhecido por assumir inúmeros outros aspectos, mas todos mantendo as características pelas quais são renomados os cavalos: força, velocidade, selvageria e lealdade.
Animal (deus menor) Grande
Iniciativa +18, Percepção +21, faro, visão na penumbra
Defesa 54, Fort +38, Ref +24, Von +26, imunidade a atordoamento, cansaço, efeitos de metabolismo e movimento, medo, metamorfose e veneno, redução de dano 15
Pontos de Vida 820
Deslocamento 24m (16q), ignora terreno difícil
Corpo a Corpo Cascos x2 +46 (4d8+36). Os cascos de Hippion são armas mágicas.
Atropelamento (Completa) Hippion percorre até o dobro do seu deslocamento. Ele pode passar pelo espaço ocupado de quaisquer inimigos menores que ele, mas não pode passar duas vezes pelo mesmo espaço. Criaturas atropeladas desta forma sofrem 4d8+18 pontos de dano de impacto e ficam caídas (Ref CD 42 reduz à metade e evita a condição).
Recarga (movimento).
Velocidade do Vento (Livre) Até o fim da cena, Hippion pode executar uma ação padrão adicional por turno, que não pode ser usada para lançar magias. Este efeito se encerra se Hippion passar uma rodada sem percorrer pelo menos 15m e só pode ser ativado uma vez por cena.
For 10, Des 4, Con 5, Int 1, Sab 5, Car 3
Perícias Atletismo +29 (+39 para corrida e saltar), Intuição +19, Sobrevivência +19.
Tesouro Nenhum.
Parceiro Hippion é um parceiro montaria Grande mestre que aceita ser montado apenas por personagens que julgue dignos e que tenham o poder Ginete. Ele fornece os seguintes benefícios: seu deslocamento muda para 24m, você recebe duas ações de movimento extras por turno (ambas apenas para se deslocar) e soma a Força de Hippion à sua (+10).`
      },
      {
        chave: "ichabod", nome: "Ichabod", nd: "12", tipo: "Monstro (lefou) Médio",
        papel: '',
        fontes: "A Joia da Alma, A Deusa no Labirinto",
        resumo: "Trebuck foi um reino próspero no passado.",
        texto:
`Ichabod ND 12
Trebuck foi um reino próspero no passado. O farfalhar das flores do campo era interrompido apenas pelo cavalgar de lordes em armaduras brilhantes, membros de cortes sempre festivas. Mas a terra de fábulas receberia um mau presságio. Os irmãos Phoebus e Phillip Gascoigne nasceram de um parto difícil. Phoebus tinha os cabelos do pai e os olhos da mãe. Phillip, no entanto, tinha íris cor de sangue, que causavam horror a todos que tinham contato com o menino. Para piorar, à medida que cresceu, Phillip viu que a pele de seu braço esquerdo se tornava rija, nodosa; do ombro brotaram espinhos. Outras crianças passaram a tratá-lo como uma aberração. Um dia, o céu se tingiu da mesma cor dos seus olhos — a Tormenta caiu sobre o reino, corroendo tudo. A Família Gascoigne foi aniquilada pelas hordas lefeu. Phillip, porém, foi poupado, forçado a se juntar aos demônios. A partir daquele momento, não era mais humano. Nem mesmo conseguia usar o próprio nome, adotando o de um monstro das lendas, com o qual fora apelidado na infância: Ichabod. O pesadelo só terminou quando o aventureiro Christian o libertou. Seguindo essa carreira, Ichabod desenvolveu seu dom para a magia, em especial ilusões capazes de atenuar a árida realidade. Como parte do grupo dos Heróis da Joia, sacrificou-se em Tiberus lutando contra o mal. Porém, exploradores da região afirmam que, até hoje, escutam uma voz ecoando naquelas paragens, guiando-os à segurança em meio à área tomada pela Tormenta.
Monstro (lefou) Médio
Iniciativa +8, Percepção +11, visão no escuro
Defesa 38, Fort +20, Ref +12, Von +26, fortificação 75%, redução de dano 10
Pontos de Vida 280
Deslocamento 9m (6q)
Pontos de Mana 89
Corpo a Corpo Adaga +27 (1d4+7, 19, mais 1d6 perfuração).
Arcano de Batalha Ichabod soma sua Inteligência nas rolagens de dano quando lança magias (já contabilizado).
Item de Poder Nas mãos de Ichabod, sua adaga de matéria vermelha funciona também como uma varinha arcana de matéria-vermelha.
Vigor Ilusório Ichabod tem 25% de chance de ignorar qualquer dano sofrido. Ilusão.
Magias Como um mago de 12º nível (CD 35). As magias de ilusão* de Ichabod custam –1 PM (já contabilizado) e a CD para resistir a elas aumenta em +2.
• Criar Ilusão* (Padrão, 8 PM) Ichabod pode criar ilusões com imagens e sons combinados em alcance médio. As ilusões podem ocupar até 9 cubos de 1,5m e também podem criar sensações táteis, como texturas. Criaturas que não saibam que essas são ilusões não conseguem atravessá-las. As ilusões ainda são incapazes de causar e sofrer dano (Von desacredita e permite atravessar as ilusões).
• Disfarce Ilusório* (Padrão, 2 PM) Até o fim da cena, Ichabod muda a própria aparência, incluindo seu equipamento, os odores e as sensações que transmite. Ele recebe +20 em testes de Enganação para disfarce (Von desacredita).
• Enxame Rubro de Ichabod (Padrão, 11 PM, sustentada) Um enxame de pequenas criaturas da Tormenta surge em alcance médio e ocupa um quadrado de 6m. No fim de cada turno de Ichabod, o enxame causa 5d12 pontos de dano de ácido a qualquer criatura em seu espaço (Ref reduz à metade). Ichabod pode gastar uma ação de movimento para mover o enxame com deslocamento de 12m.
• Imagem Espelhada* (Padrão, 6 PM) Ichabod cria 5 cópias ilusórias de si mesmo que fornecem +10 na Defesa. Cada vez que um ataque contra ele erra, uma das imagens desaparece e o bônus na Defesa diminui em 2. Quando uma cópia é destruída, a criatura que a destruiu fica ofuscada por 1 rodada.
• Invisibilidade* (Padrão, 5 PM) Ichabod fica invisível até o fim da cena (recebe camuflagem total, +10 em Furtividade contra ouvir e criaturas que não possam vê-lo ficam desprevenidas contra seus ataques). A magia termina se ele fizer uma ação hostil contra uma criatura.
• Seta Infalível de Talude (Padrão, 5 PM) Ichabod projeta 3 lanças de energia distribuídas em até 3 criaturas em alcance médio. Cada lança causa 1d8+1 pontos de dano de essência (uma delas recebe +5 na rolagem de dano).
For 0, Des 2, Con 4, Int 5, Sab 1, Car –1
Perícias Conhecimento +15, Ofício (alquimista) +17, Misticismo +19, Religião +11.
Equipamento Adaga certeira de matéria vermelha, instrumentos de Ofício (alquimista) aprimorados, organizador de pergaminhos, pergaminho de Bola de Fogo, pergaminho de Velocidade, robe místico aprimorado. Tesouro Padrão.`
      },
      {
        chave: "imperadorTekametsu", nome: "Imperador Tekametsu", nd: "6", tipo: "Espírito (dragão celestial) Pequeno",
        papel: '',
        fontes: "Império de Jade",
        resumo: "Por séculos, Tamu-ra esteve envolta em conflitos pelo poder, quando então este dragão celestial tomou a forma de um jovem imperador que trou",
        texto:
`Imperador Tekametsu ND 6
Por séculos, Tamu-ra esteve envolta em conflitos pelo poder, quando então este dragão celestial tomou a forma de um jovem imperador que trouxe ordem, governando o povo com honra e perseverança. Vindo do distante mundo de Sora, liderava pelo exemplo e se preocupava profundamente com os mortais, desejando guiá-los para a felicidade. Apesar das críticas de outros dragões, decidiu se ligar aos mortais. Compartilhou de sua experiência, bem como de suas fraquezas e vulnerabilidades. Quando a fúria divina de Lin-Wu ameaçou as terras tamuranianas, ele implorou ao deus por uma alternativa, recebendo a missão de restaurar a harmonia entre os povos tamuranianos. Segundo as lendas, percorreu os campos de batalha na forma de um monge flautista espalhando a paz com sua melodia. Mesmo sem desejar o poder, após o feito, aceitou a coroa imperial para liderar e proteger aos seus nas horas de necessidade que inevitavelmente viriam. Tekametsu se sacrificou para salvar seu povo da Tormenta quando esta devastou a ilha em 1390, utilizando todas as suas energias para teletransportar os arredores de seu palácio até o continente, onde hoje, na cidade de Valkaria, fica o bairro de Nitamu-ra. O imperador reencarnou com o aspecto humano de uma criança, visto que sempre foi jovem para os padrões de sua espécie. Travesso, mas dotado de alegria e generosidade inesgotáveis, é conhecido por — ao lado do vigilante sumo-sacerdote Shiro Nomatsu — recrutar pessoalmente aventureiros para missões. Continua assim a luta tamuraniana para construir os alicerces sólidos de um novo lar, a partir dos escombros deixados pela Tempestade Rubra.
Espírito (dragão celestial) Pequeno
Iniciativa +7, Percepção +11, percepção às cegas, visão no escuro
Defesa 27, Fort +12, Ref +6, Von +18, imunidade a atordoamento, efeitos de metabolismo, eletricidade, medo, metamorfose e paralisia, redução de dano 5, resistência a magia +1, vulnerabilidade a ácido
Pontos de Vida 265
Deslocamento 12m (8q), voo 36m (24q)
Pontos de Mana 34
Corpo a Corpo Mordida +20 (2d6+14) e duas garras +20 (1d6+14).
Metamorfose (Completa) Tekametsu se transforma em outra criatura, como a magia Metamorfose (mas sem limitação para tamanhos menores que o seu). Atualmente, sua forma preferida é a de um menino humano (tamanho Pequeno). Se for morto, Tekametsu reverte à sua forma de dragão.
Presença Aristocrática (Reação) Quando uma criatura tenta machucar Tekametsu, ela deve fazer um teste de Vontade (CD 22). Se falhar, não conseguirá machucá-lo e perderá a ação. Tekametsu só pode usar esta habilidade uma vez por criatura na mesma cena.
Presença Celestial Uma criatura que comece seu turno em alcance longo de Tekametsu fica abalada até o fim da cena.
Criaturas com um código de conduta (como cavaleiros e paladinos) ou devotos de Khalmyr ou Lin-Wu em vez disso ficam fascinados (Von CD 22 evita em ambos os caso se a criatura fica imune a esta habilidade por um dia).
Magias Como um clérigo de Lin-Wu de 6º nível (CD 22). Tekametsu pode lançar essas magias sem palavras mágicas, gestos, concentração ou componentes materiais.
• Curar Ferimentos (Padrão, 6 PM) Uma criatura adjacente cura 7d8+7 PV.
• Escudo da Fé (Reação, 6 PM) Quando uma criatura em alcance curto sofre um ataque, ela recebe camuflagem leve contra ataques à distância e +4 na Defesa por 1 turno.
• Raio Solar (Padrão, 5 PM) Criaturas em uma linha de 30m sofrem 5d8 pontos de dano de luz (ou 5d12, se forem mortos-vivos) e ficam ofuscadas por 1 rodada (Ref reduz à metade e evita a condição).
• Santuário (Padrão, 1 PM) Tekametsu toca uma criatura. Até o fim da cena, ou até que essa criatura faça uma ação hostil, qualquer criatura que tente fazer uma ação hostil contra ela perde a ação (Von evita).
• Visão Mística (Padrão, 3 PM) Durante 1 dia, Tekametsu detecta todas as auras mágicas em alcance médio e recebe todas as informações sobre elas sem gastar ações. Além disso, ele pode gastar uma ação de movimento para descobrir se uma criatura que possa perceber em alcance médio é capaz de lançar magias e qual a aura gerada pelas magias de círculo mais alto que ela pode lançar.
• Voz Divina (Padrão, 3 PM) Até o fim da cena, Tekametsu pode conversar com qualquer ser, mesmo que a criatura não seja capaz de falar.
For 6, Des 2, Con 5, Int 3, Sab 4, Car 5
Perícias Atuação +10, Conhecimento +8, Diplomacia +10, Intuição +9, Misticismo +8, Nobreza +13, Religião +11.
Equipamento Instrumento musical (flauta) aprimorado. Tesouro Triplo.`
      },
      {
        chave: "inghlblhpholtsgt", nome: "Inghlblhpholtsgt", nd: "10", tipo: "Humanoide (tabrachi, deus menor) Médio",
        papel: '',
        titulo: "Inghlblhpholtsgt, a Grande divindade anfíbia",
        fontes: "Atlas de Arton",
        resumo: "Esta divindade menor tem nome impronunciável à maioria dos mortais e é conhecida como Grande Deus Sapo pelos povos tabrachi.",
        texto:
`Inghlblhpholtsgt ND 10
Esta divindade menor tem nome impronunciável à maioria dos mortais e é conhecida como Grande Deus Sapo pelos povos tabrachi. Em antigos murais, aparece como o primeiro ser marinho a pisar em terra firme, parte das criaturas que ouviu o chamado de Allihanna, a Mãe Natureza, para que deixassem as profundezas azuis e migrassem para o continente. Outros hieróglifos o descrevem como mais uma das inúmeras crias de Megalokk, o Deus dos Monstros. Existem até histórias em que sua semente veio do éter entre os mundos, precedendo a existência da vida na face de Arton. O fato é que o templo mais conhecido desta divindade fica no Pântano dos Juncos, em Deheon. O local é vigiado por um monstro chamado catoblepas, capaz de transformar pessoas em sapoides com um mero olhar. A habilidade do monstro sagrado seria responsável por inflar a população de tabrachi local, que vem em um lento mas constante crescimento desde a época do povoamento do continente norte. Não se sabe quais são os objetivos de Inghlblhpholtsgt. Se os seus locais de culto são apenas resquícios saudosos de uma era em que pântanos cobriam os continentes e libélulas gigantes voavam pelo céu, ou se o deus pretende espalhar a sua bênção anfíbia sobre o mundo. O certo é que, mesmo através de milhares de anos, continua a persistir.
Humanoide (tabrachi, deus menor) Médio
Iniciativa +12, Percepção +12, visão na penumbra
Defesa 34, Fort +16, Ref +11, Von +23, imunidade a efeitos de metabolismo, metamorfose e veneno, redução de dano 10
Pontos de Vida 310
Deslocamento 9m (6q), natação 9m (6q)
Corpo a Corpo Alabarda x2 +27 (1d10+16, x4) e língua +27 (1d6+16 impacto mais veneno, alcance 3m).
Coaxo Reverberante (Padrão) Criaturas em um cone de 9m sofrem 8d8 pontos de dano psíquico e ficam surdas por 1d4 rodadas (Von CD 32 reduz à metade e evita a condição). Se a criatura falhar no teste de resistência, o som reverbera em sua mente, causando 4d8 pontos de dano psíquico no início de seu próximo turno. Recarga (movimento).
Glândulas Venenosas Quando Inghlblhpholtsgt sofre dano por um ataque desarmado ou uma arma natural, o atacante perde 1d12 pontos de vida por veneno (ou 2d12 se o ataque foi com uma mordida).
Manobra de Língua (Livre) Se Inghlblhpholtsgt acerta um ataque de língua, ele pode fazer a manobra desarmar ou derrubar (teste +29).
Salto Esmagador (Padrão) Inghlblhpholtsgt pula e cai com seu corpo e sua alabarda sobre um oponente do seu tamanho ou menor em alcance médio. O alvo sofre 2d6+16 pontos de dano de impacto, mais 2d10+16 pontos de dano de perfuração, e fica caído (Ref CD 32 reduz à metade e evita a condição). Recarga (movimento).
Soldados do Pântano (Movimento) Uma vez por cena, Inghlblhpholtsgt invoca 1d4+1 sapos de batalha em espaços desocupados em alcance médio. Eles agem a partir da próxima rodada de Inghlblhpholtsgt, têm deslocamento 9m (normal e de natação), podem saltar 9m em qualquer direção com uma ação de movimento e podem gastar uma ação padrão para causar 2d4+4 pontos de dano de impacto em uma criatura a até 3m. Os sapos de batalha têm For 2, Des 1, Defesa 18, 1 PV e imunidade a veneno e falham automaticamente em qualquer teste oposto ou de resistência.
Veneno Perde 3d12 PV e fica paralisado por 1 rodada, Fort CD 32 evita a paralisia e reduz a perda de vida para 1d12.
For 4, Des 3, Con 6, Int 0, Sab 3, Car 0
Perícias Atletismo +18 (+28 para saltar), Diplomacia +9, Furtividade +12, Religião +13.
Equipamento Alabarda maciça, gorro de ervas aprimorado, manto eclesiástico. Tesouro Dobro.`
      },
      {
        chave: "ingramBrassbones", nome: "Ingram Brassbones", nd: "17", tipo: "Humanoide (anão) Médio",
        papel: '',
        fontes: "O Crânio e o Corvo, O Terceiro Deus",
        resumo: "Este inventor anão difere de outros membros de seu povo em quase tudo.",
        texto:
`Ingram Brassbones ND 17
Este inventor anão difere de outros membros de seu povo em quase tudo. No lugar de machados e martelos, prefere pistolas e mosquetes. Em vez de uma longa barba, optou por um bem-cuidado bigode, para evitar acidentes ao manusear pólvora. Não tem forte vínculo com Doherimm, o Reino dos Anões. Na verdade, foi banido do reino, tendo sofrido a punição máxima desse povo e “perdido o caminho”, nunca mais sendo capaz de retornar sem ajuda. Ingram costumava ser membro da Guilda dos Armeiros. No entanto, desafiou tradições ao se dedicar à fabricação de armas de fogo, aliando-se ao que mais tarde descobriu ser um culto a Tenebra, a Deusa das Trevas. O armeiro, contudo, não se juntou à seita nem participou do ritual que transformou todos os seus ex-companheiros em vampiros. A deusa sombria enviou um súcubo chamada Nadia para seduzi-lo e convertê-lo, mas o plano falhou quando a serva divina se apaixonou por ele. A despeito de recusar o pacto, Ingram e sua nova companheira foram capturados pelas forças doheritas e banidos para a superfície. Depois de inúmeras peripécias ao lado do cavaleiro Sir Orion Drake, pagando uma suposta dívida de honra, depois de derrotar seu antigo bando e de resgatar a alma de sua amada, que havia sido aprisionada no reino de Sombria, depois de reforjar a própria espada de Khalmyr, hoje Ingram só quer um pouco de paz com Nadia. Trabalha em uma “armeria” nos antigos reinos do oeste, fabricando e vendendo munições únicas. Pode-se dizer que conquistou tudo que desejava. Mesmo assim, alguns garantem tê-lo visto junto aos Campeões de Svalas na cidade de Smokestone, enquanto outros afirmam que recentemente visitou Valkaria com um velho amigo.
Humanoide (anão) Médio
Iniciativa +21, Percepção +16 (+18 em subterrâneo), visão no escuro
Defesa 52, Fort +24, Ref +30, Von +17, evasão, redução de dano 10
Pontos de Vida 640
Deslocamento 6m (4q)
Corpo a Corpo Adaga x2 +47 (1d4+12, 18).
À Distância Mosquete x2 +47 (6d8+40, 16/x3, alcance longo) ou pistola x2 +47 (4d6+40, 15/x3, alcance médio).
Ataque Furtivo +3d6. Quando Ingram ataca com uma arma de fogo, seu ataque furtivo tem o alcance dessa arma.
Disparo Preciso Ingram pode fazer ataques à distância contra oponentes envolvidos em combate corpo a corpo sem a penalidade padrão de –5 no teste de ataque.
Injeção Alquímica Presente nas armas de fogo de Ingram, esta modificação permite que cada disparo libere uma carga de um preparado previamente carregado. Ingram geralmente usa bombas, que causam 6d6 pontos de dano de impacto no alvo e em todas as criaturas a até 3m dele. Criaturas que não sejam o alvo têm direito a um teste de Reflexos (CD 44) para reduzir o dano à metade.
Mestre de Armeria Ingram pode fabricar armas superiores com até 4 melhorias, e pode criar e fabricar armas de fogo exclusivas (veja Heróis de Arton).
Precisão Brutal Uma criatura atingida por um acerto crítico ou ataque furtivo de arma de fogo de Ingram fica vulnerável e sangrando (Fort CD 44 evita). Múltiplos sangramentos causados por esta habilidade são cumulativos.
Saque Rápido Ingram pode sacar ou guardar itens como uma ação livre e recarregar armas de fogo como uma ação de movimento (ou livre, se a arma tiver sido fabricada por ele).
Um Tiro, Uma Morte (Movimento) Até o fim do turno, Ingram recebe +5 em testes de ataque e na margem de ameaça com ataques de arma de fogo e cada dado de dano desses ataques aumenta em um passo.
For 1, Des 5, Con 5, Int 4, Sab 2, Car 0
Perícias Acrobacia +19, Atletismo +15, Furtividade +19, Intimidação +14, Ladinagem +21, Ofício (alquimista) +20, Ofício (armeiro) +25, Ofício (artesão) +20.
Equipamento Adaga atroz precisa pungente, balas x20, bomba x4 (Ref CD 44 reduz à metade), gazua aprimorada, mosquete preciso de adamante com injeção alquímica e mira telescópica, pistola cruel precisa de mitral com injeção alquímica, três instrumentos de Ofício (alquimista, armeiro e artesão) aprimorados. Tesouro Padrão.`
      },
      {
        chave: "hemeraActeiaEIlitia", nome: "Hemera, Acteia e Ilítia", nd: "13", tipo: "Monstro (medusa) Média",
        papel: '',
        titulo: "Irmãs da Nova Escama",
        fontes: "Dragão Brasil 134",
        resumo: "Esta tríade de medusas feiticeiras caminhou em Arton pela primeira vez há muito tempo, nascidas da união de Kallyadranoch com Acalântis, uma",
        texto:
`Hemera, Acteia e Ilítia ND 13
Esta tríade de medusas feiticeiras caminhou em Arton pela primeira vez há muito tempo, nascidas da união de Kallyadranoch com Acalântis, uma sábia que vivia em uma caverna na Floresta de Tollon. Conforme seu poder mágico crescia, aumentava sua devoção ao pai. As trigêmeas chegaram até a criar uma ordem religiosa que, seguindo uma tradição na cultura das medusas, se organizava em trios. Durante o esquecimento do Deus dos Dragões, as poderosas irmãs fizeram a única coisa que podiam para guardar sua memória. Em um ato de desespero, usaram seus olhares amaldiçoados uma na outra, transformando-se em pedra. Ficariam assim preservadas, até o dia que ele retornasse. Retornaram à vida em uma Arton completamente diferente, na qual um perigo desconhecido, a Tormenta, ameaça toda a Criação. A ordem que fundaram não existe mais — seus únicos vestígios são alguns tesouros, na caverna em que elas foram encontradas por um grupo de aventureiros azarados. A tríade sabe do retorno do Terceiro e hoje vagam por Arton em busca de discípulas e seguidoras. Apesar de algumas semelhanças, as Irmãs da Nova Escama não são sszzaazitas. Elas reconhecem que sutilezas são úteis, mas acreditam que, como herdeiras de dragões, nasceram para governar.
Monstro (medusa) Média
Iniciativa +13, Percepção +13, percepção às cegas, visão no escuro
Defesa 41, Fort +14, Ref +21, Von +26, imunidade a atordoamento, cansaço, metamorfose e paralisia, redução de dano 5, resistência a veneno +5
Pontos de Vida 390
Deslocamento 9m (6q)
Pontos de Mana 96
Corpo a Corpo Punhal escarlate +35 (1d4+5, 19, mais 1d6 essência e veneno).
Aura de Medo (Livre, 2 PM) A irmã da Nova Escama gera uma aura de medo de 9m de raio que dura até o fim da cena. Todos os inimigos que entram na aura ficam abalados até o fim da cena (Von CD 37 evita e a criatura fica imune a esta habilidade por um dia).
Linhagem Dracônica Cada irmã herdou afinidade com um tipo de energia (fogo para Hemera, ácido para Acteia e eletricidade para Ilítia). Cada irmã tem imunidade a dano desse tipo e suas magias que causam dano desse tipo custam –1 PM e causam +1 ponto de dano por dado. Por fim, sempre que reduz um ou mais inimigos a 0 PV ou menos com uma magia do tipo escolhido, a irmã recebe uma quantidade de PM temporários igual ao círculo da magia.
Magia Acelerada (Livre, +4 PM) Uma vez por rodada, quando lança uma magia com execução de ação completa ou menor, a irmã muda a execução dela para livre.
Olhar Atordoante (Movimento) Uma criatura em alcance curto fica atordoada por 1 rodada (apenas uma vez por cena; Fort CD 37 evita).
Serpentes Dracônicas (Livre, +1 PM) Quando usa seu Sopro ou lança uma magia que causa dano do tipo de sua linhagem dracônica, a irmã aumenta o dano dessa habilidade em +1d12.
Servos do Dragão (Completa, 2 PM) A irmã invoca 2d4+1 kobolds em espaços desocupados em alcance curto. Eles agem a partir da próxima rodada da irmã, têm deslocamento 9m e podem gastar uma ação padrão para causar 1d6-1 pontos de dano de corte em uma criatura adjacente. Os kobolds têm For –1, Des 4, Defesa 12 e 1 PV, falham automaticamente em qualquer teste oposto ou de resistência e desaparecem quando mortos ou ao fim da cena.
Sopro (Padrão) Todas as criaturas em um cone de 9m sofrem 4d12 pontos de dano de um tipo conforme a Linhagem Dracônica da irmã e ficam ofuscadas por 1d4 rodadas (se o dano for de eletricidade), em chamas (se o dano for de fogo) ou vulneráveis por 1d4 rodadas (se o dano for de ácido) (Ref CD 37 reduz à metade e evita a condição).
Recarga (movimento).
Veneno Perde 1d12 pontos de vida.
Magias Como uma feiticeira de linhagem dracônica de 13º nível (CD 37, limite de PM 18).
• Armadura Arcana (Reação, 2 PM) A irmã recebe +5 na Defesa contra o próximo ataque que sofrer.
• Bola de Fogo (Padrão, 17 PM) Uma explosão causa 20d6 pontos de dano de fogo em criaturas e objetos livres numa esfera de 6m em alcance médio (Ref reduz à metade).
• Campo de Força (Reação, 7 PM) Quando sofre dano, a irmã recebe RD 50 contra esse dano.
• Dissipar Magia (Padrão, 3 PM) A irmã escolhe uma criatura, objeto ou esfera de 3m em alcance médio e faz um teste de Misticismo. Todas as magias no alvo escolhido com CD menor que o teste são dissipadas. Se lançada contra um item mágico, transforma-o em um item mundano por 1d6 rodadas (Von anula).
• Enfeitiçar (Padrão, 1 PM) Um humanoide em alcance curto fica enfeitiçado (Von evita).
• Ferver Sangue (Padrão, 18 PM, sustentada) A irmã faz o sangue de uma criatura em alcance curto aquecer até entrar em ebulição. Quando a magia é lançada, e no início de cada um de seus turnos, o alvo sofre 10d8 pontos de dano de fogo e fica enjoado por 1 rodada (Fort reduz à metade e evita a condição). Se o alvo passar em dois testes de Fortitude seguidos, dissipa a magia. Se o alvo for reduzido a 0 PV pelo dano desta magia, seu corpo explode, matando-o e causando 6d6 pontos de dano de fogo em todas as criaturas a até 3m (Ref reduz à metade). Não afeta criaturas sem sangue, como construtos ou mortos-vivos.
• Flecha Ácida (Padrão, 6 PM) Uma criatura ou objeto em alcance médio sofre 10d6 pontos de dano de ácido e fica coberto por um muco corrosivo, que causa mais 8d6 pontos de dano de ácido no início de seus 2 próximos turnos e reduz permanentemente o bônus na Defesa de sua armadura e escudo em –2 (Ref reduz à metade e evita o muco corrosivo). Contra objetos soltos, a magia causa dano dobrado e ignora RD.
• Marca da Obediência (Padrão, 6 PM) A irmã ordena que uma criatura adjacente não ataque ela ou seus aliados até o fim da cena (Von evita). A criatura pode repetir o teste de Vontade em cada um de seus turnos subsequentes mas, se falhar, sofre 3d6 pontos de dano psíquico.
• Pele de Pedra (Padrão, 10 PM) A irmã recebe redução de dano 10 até o fim da cena.
• Relâmpago (Padrão, 7 PM) A irmã lança um relâmpago em cada criatura escolhida em alcance médio, causando 8d8 pontos de dano de eletricidade (Ref reduz à metade).
• Velocidade (Padrão, 10 PM, sustentada) A irmã pode executar uma ação padrão adicional por turno.
For 0, Des 3, Con 2, Int 2, Sab 3, Car 5
Perícias Conhecimento +14, Diplomacia +15, Intimidação +17, Intuição +13, Misticismo +14, Ofício (artesão) +14, Religião +13.
Equipamento Braceletes das escamas, face dracônica, instrumentos de Ofício (artesão) aprimorados, punhal escarlate, símbolo sagrado de Kallyadranoch, veste de seda aprimorada. Tesouro Padrão.`
      },
      {
        chave: "kasumi", nome: "Kasumi", nd: "8", tipo: "Humanoide (humana) Média",
        papel: '',
        fontes: "Crônicas da Tormenta Vol. 2, Guilda do Macaco",
        resumo: "Última discípula viva de Miyashi, lendário lutador tamuraniano, nasceu em uma simples vila de pescadores.",
        texto:
`Kasumi ND 8
Última discípula viva de Miyashi, lendário lutador tamuraniano, nasceu em uma simples vila de pescadores. Por muito tempo, foi aluna clandestina do mestre, devido a um tabu seguido por ele — hoje em desuso — de que apenas homens poderiam ser instruídos em artes marciais. A garota de olhos amendoados teria oportunidade de pôr à prova todo o treinamento angariado dessa maneira quando o lugar onde morava foi atacado pela Tormenta. Ela se viu forçada a enfrentar outro pupilo de seu sensei, corrompido pela Tempestade Rubra. Única sobrevivente do massacre perpetrado no local pelos invasores lefeu, só conseguiu manter sua mente intacta graças a sua disciplina e determinação. Rumou para a costa do Reinado sozinha, atravessando o oceano em uma simples jangada. Como outros tamuranianos, acabou indo até Nitamu-ra, último enclave de sua cultura. Lá, abriu um dojo para passar adiante os ensinamentos adquiridos. Para qualquer pessoa que, a despeito de sua origem, se comprometa a usá-los a serviço do bem. Além de seu papel na renovação dos costumes tamuranianos, Kasumi também protege a comunidade de ameaças internas, investigando rumores sobre o Clã da Lotus, e externas, enfrentando monstros e ocasionais aventureiros enxeridos.
Humanoide (humana) Média
Iniciativa +17, Percepção +12
Defesa 33, Fort +15, Ref +15, Von +15, evasão, redução de impacto e psíquico 5, resistência a efeitos mentais, efeitos de movimento e medo +5
Pontos de Vida 245
Deslocamento 18m (12q), ignora terreno difícil
Corpo a Corpo Ataque desarmado x3 +30 (2d6+20, 19/x3). Os ataques desarmados de Kasumi são armas mágicas.
Bloqueio Desarmado (Reação) Uma vez por rodada, quando é atingida por um ataque, Kasumi faz uma rolagem de dano corpo a corpo e subtrai o resultado dessa rolagem do dano causado pelo ataque. Se reduzir o dano do ataque a 0, ela pode fazer um ataque desarmado imediatamente contra o atacante.
Investida Vendaval (Completa) Kasumi faz uma investida. Se acertar o ataque, ela pode continuar seu deslocamento e atacar outro inimigo em qualquer direção, repetindo o processo até errar um ataque ou percorrer uma distância total igual ao dobro do seu deslocamento. Recarga (fazer um acerto crítico).
Quebramento (Padrão) Kasumi faz um ataque desarmado que ignora até 10 pontos da RD do alvo e causa dano dobrado. Uma criatura atingida tem sua armadura avariada (–5 na Defesa) ou, se não estiver de armadura, fica debilitada.
Sexto Sentido Quando falha em um teste de Percepção, Kasumi pode repetir esse teste imediatamente usando Intuição. Além disso, ela pode usar essa perícia para detectar magia como se fosse Misticismo (veja Tormenta20, p.121).
For 5, Des 4, Con 4, Int 1, Sab 4, Car 1
Perícias Acrobacia +17, Atletismo +18, Conhecimento +9, Cura +12, Intuição +12.
Equipamento Faixas do pugilista. Tesouro Metade.`
      },
      {
        chave: "khorrBenn", nome: "Khorr’benn", nd: "9", tipo: "Morto-vivo (osteon) Médio",
        papel: '',
        titulo: "Khorr’benn An-ug’atz, Sumo-Sacerdote de Thwor",
        resumo: "A Flecha de Fogo Corben era um jovem clérigo de Thyatis, um astrólogo e estudioso na cidade de Sternachten.",
        texto:
`Khorr’benn ND 9
A Flecha de Fogo Corben era um jovem clérigo de Thyatis, um astrólogo e estudioso na cidade de Sternachten. Contudo, depois que Sternachten foi destruída em circunstâncias misteriosas, o rapaz foi colocado em uma trajetória que viria a mudar tudo sobre ele, inclusive seu nome. Corben descobriu a verdade sobre a Flecha de Fogo, o cometa que cairia sobre Lamnor e destruiria a civilização duyshidakk — além de matar Thwor Khoshkothruk. Na corrida para impedir isso, participou da batalha das forças do Reinado contra os goblinoides na cidade de Cosamhir, onde foi emboscado, morto, ressuscitado inúmeras vezes pelas bênçãos de Thyatis e queimado horrivelmente. Corben, então já Khorr’benn, seu nome duyshidakk, testemunhou a morte de Thwor e Ragnar, o antigo Deus da Morte. Isso, aliado a sua convivência com o Ayrrak, tornou-o um devoto de Thwor. E logo seu sumo-sacerdote. Hoje em dia Khorr’benn An-ug’atz (um nome que significa “Eu Interrompo com a Morte o Caminho do Aço”, ou “Minha Morte Colocará Fim às Batalhas” seguido pelo sobrenome “Não Humano”) vive em Lamnor, espalhando a palavra do Deus dos Goblinoides. Sua aparência é notória: seu corpo foi carbonizado em Cosamhir e algumas brasas ainda despontam sob sua carne. Curiosamente, Khorr’benn se recusa a ficar muito próximo de sua maior aliada, a elfa Thraan’ya, pois seu papel no Akzath dita que sempre trairá companheiras (“irmãs”) próximas.
Morto-vivo (osteon) Médio
Iniciativa +4, Percepção +13, visão no escuro
Defesa 28, Fort +15, Ref +9, Von +21, imunidade a fogo, proteção divina, redução de corte, frio e perfuração 5
Pontos de Vida 232
Deslocamento 9m (6q)
Pontos de Mana 150 Almejar o Impossível Quando Khorr’benn faz um teste de perícia, um resultado de 19 ou mais no dado sempre é um sucesso.
Dom da Imortalidade Khorr’benn é imortal. Sempre que morre, não importando o motivo, volta à vida após 3d6 dias.
Previsões Astrológicas Khorr’benn pode gastar 1 hora para vislumbrar o futuro de uma criatura em alcance curto. A criatura recebe 6d6 que duram até serem usados ou até o fim da aventura. Sempre que for realizar um teste de perícia, ela pode gastar até 2d6 e adicionar o resultado como um bônus no teste.
Protetores Duyshidakk (Completa, 2 PM) Khorr’benn invoca 2d4 guardiões goblinoides em espaços desocupados em alcance médio. Eles agem a partir da próxima rodada de Khorr’benn, têm deslocamento 9m e podem gastar uma ação padrão para causar 2d4+3 pontos de dano de corte em uma criatura adjacente. Os goblinoides têm For 1, Des 1, Defesa 21, 1 PV e falham automaticamente em qualquer teste de resistência ou oposto. Eles desaparecem quando morrem ou no fim da cena.
Punição Divina (Padrão) Von CD 30 evita.
Magias Como um clérigo de Thwor de 9º nível (CD 30, limite de PM 14).
• Amedrontar (Padrão, 3 PM) Um animal ou humanoide em alcance curto fica apavorado por 1d4+1 rodadas e depois abalado (Von reduz para abalado por 1d4 rodadas).
• Curar Ferimentos (Padrão, 14 PM) Uma criatura adjacente cura 15d8+15 PV ou criaturas escolhidas em alcance curto curam 10d8+10.
• Dissipar Magia (Padrão, 1 PM) Khorr’benn escolhe uma criatura, objeto ou esfera de 3m em alcance médio e faz um teste de Misticismo. Todas as magias no alvo escolhido com CD menor que o teste são dissipadas. Se lançada contra um item mágico, transforma-o em um item mundano por 1d6 rodadas (Von anula).
• Escudo da Fé (Reação, 7 PM) Quando uma criatura em alcance curto sofre um ataque, ela recebe +5 na Defesa até seu próximo turno.
• Raio Solar (Padrão, 12 PM) Criaturas em uma linha de 30m sofrem 7d8 pontos de dano de luz (ou 7d12, se forem mortos-vivos) e ficam cegas por 1d4 rodadas (Ref reduz à metade e evita a condição).
For 0, Des 0, Con 0, Int 4, Sab 5, Car 3
Perícias Conhecimento +12, Cura +13, Diplomacia +11, Intuição +13, Investigação +12, Misticismo +12, Nobreza +12, Ofício (astrólogo) +12, Religião +20.
Equipamento Instrumentos de Ofício (astrólogo) aprimorados, manto eclesiástico aprimorado, símbolo sagrado de Thwor.
Tesouro Padrão.`
      },
      {
        chave: "klunc", nome: "Klunc", nd: "13", tipo: "Humanoide (humano) Grande",
        papel: '',
        titulo: "Klunc, o Bárbaro",
        fontes: "Guilda do Macaco",
        resumo: "Pouco se sabe sobre este bárbaro conhecido apenas como Klunc, exceto tratar-se de um humano.",
        texto:
`Klunc ND 13
Pouco se sabe sobre este bárbaro conhecido apenas como Klunc, exceto tratar-se de um humano. Ainda que muitos duvidem. O auge de sua carreira ocorreu na companhia de heróis como o cavaleiro Lothar Algherulff, o pirata Nargom Mandíbula, o bardo qareen Kadeen e outros. Nesses tempos estranhos, teria se transformado não apenas em um mago inteligentíssimo, mas também em um frágil golem conjurador. Mais tarde, contudo, acabaria devolvido à forma “normal”. Klunc seria apenas mais um bárbaro forte e estúpido, não fosse o poder fabuloso que adquiriu ao devorar o coração de um gigante derrotado. Quando se enfurece, Klunc cresce até tornar-se ele próprio um gigante — ou, como costuma dizer, “Klunc fica maaais Klunc!”. Essa habilidade foi decisiva durante a Guerra Artoniana, quando o titã embrutecido e emburrecido causou danos incalculáveis aos batalhões puristas. Indivíduo de metas simples, Klunc ama presunto e seus amigos, nessa ordem. Chegou a atuar como gladiador patrocinado pela Guilda dos Presunteiros de Valkaria. Em sua matemática peculiar, “dois” é qualquer número acima de um; tal aritmética inovadora costuma levar a negociações conturbadas, sobretudo quando envolve presuntos. Como (falta de) tática de combate, Klunc tem predileção por quebrar a arma do adversário, em vez de (ou antes de) matá-lo. Teria despedaçado algumas das armas mágicas mais formidáveis de Arton. Por essa razão, muitos clérigos de Arsenal o consideram seu maior inimigo e pior pesadelo!
Humanoide (humano) Grande
Iniciativa +11, Percepção +13
Defesa 42, Fort +26, Ref +13, Von +20, redução de dano 15
Pontos de Vida 410
Deslocamento 6m (4q)
Corpo a Corpo Presuntador x3 +38 (3d6+35 essência, x3).
Amigo de Klunc (Livre) Uma vez por dia, o espírito do bardo Kadeen surge e lança uma magia arcana de até 4º círculo para ajudar Klunc (CD para resistir 35).
Klunc Cresce (Movimento) Klunc se torna Colossal até o fim da cena (essa mudança afeta seu equipamento também). Ele recebe Força +5 e seus ataques se tornam +43 (4d6+40 essência, x3).
Klunc Não Morre (Reação) Uma vez por cena, Klunc pode ignorar um dano recém-sofrido.
Klunc Quebra Klunc recebe +5 em testes de ataque para quebrar e causa +2d8 pontos de dano em construtos e objetos.
Klunk Quase Ogro Todo dano que Klunc sofre é reduzido à metade.
For 11, Des 1, Con 8, Int –3, Sab 1, Car –1
Perícias Atletismo +26, Intimidação +14.
Equipamento Armadura completa de adamante defensora, Presuntador . Tesouro Nenhum.`
      },
      {
        chave: "ladyAylethKarst", nome: "Lady Ayleth Karst", nd: "9", tipo: "Humanoide (humana) Média",
        papel: '',
        fontes: "Guilda do Macaco",
        resumo: "Filha única do Barão Abelard — um nobre de ascendência svalana relegado a um feudo no interior do então Reino de Yudennach — esta aristocrat",
        texto:
`Lady Ayleth Karst ND 9
Filha única do Barão Abelard — um nobre de ascendência svalana relegado a um feudo no interior do então Reino de Yudennach — esta aristocrata teve infância relativamente austera. No pátio do castelo, treinava a luta com espada e escudo, como dama guerreira. Dentro dos salões, aprendia a escutar seus futuros súditos e a tomar decisões nos assuntos relacionados à terra. Assim, desde criança, mesclou a cultura marcial de sua nação com a fé no Deus da Justiça seguida por seu pai. Cresceu ouvindo histórias sobre a pátria que era origem de sua família, domínio brutalmente conquistado pelo Reino de Yudennach. E também sobre os feitos de seu pai na guerra contra a Tormenta, e de como ele foi negligenciado pelo exército no qual serviu. Isso acendeu em Ayleth, desde cedo, uma verdadeira obsessão por independência e justiça. Mas ela nunca imaginou que acabaria rainha. Tudo começou quando o barão desapareceu e ela convocou um grupo de aventureiros para encontrá-lo. Algo que a fez descobrir uma grande conspiração das forças puristas. Após escapar por pouco de uma invasão relâmpago dos inimigos a seu castelo, viajou incógnita junto aos heróis até a cidade de Valkaria. Lá, após sobreviver a tentativas de silenciá-la permanentemente, conseguiu navegar pelos intricados protocolos da alta nobreza e obteve uma audiência com a própria Rainha-Imperatriz. Depois de ajudar a caçar o Coronel Reggar Wortric, traidor que matou seu pai, foi coroada por Shivara como a nova monarca do recém-independente reino de Svalas, tanto devido à sua linhagem quanto por causa de seus feitos — desempenhando mais tarde um papel crucial na defesa deste durante a Guerra Artoniana. Talvez devido ao seu espírito livre, a Rainha Ayleth escolheu como consorte alguém tão desapegado quanto ela: o pirata Nargom Mandíbula, com quem compartilhou diversas jornadas. E muitíssimas discussões.
Humanoide (humana) Média
Iniciativa +11, Percepção +8
Defesa 40, Fort +18, Ref +17, Von +17
Pontos de Vida 290
Deslocamento 9m (6q)
Corpo a Corpo Espada longa x2 +33 (2d8+25, 17) e escudo pesado +33 (2d6+25).
Bloqueio com Escudo (Reação) Quando sofre dano pela primeira vez em cada rodada, Lady Ayleth recebe redução de dano 20 contra esse dano. Ela só pode usar esta habilidade se estiver empunhando um escudo.
Cabeça Dura (Reação) Se Ayleth for afetada por um efeito mental ou de movimento, ela anula esse efeito. Recarga (fazer um acerto crítico).
Dança da Espada (Completa) Ayleth percorre até o dobro do seu deslocamento, sem passar duas vezes pelo mesmo espaço, e causa 2d8+20 pontos de dano de corte em cada inimigo do qual ela ficou adjacente durante esse movimento (Ref CD 31 reduz à metade). Recarga (fazer um acerto crítico).
Orgulho (Reação) Uma vez por cena, quando faz um teste de perícia, Ayleth soma o dobro de seu Carisma (+8) nesse teste.
For 3, Des 3, Con 3, Int 2, Sab 0, Car 4
Perícias Adestramento +12, Cavalgar +11, Diplomacia +12, Guerra +12, Intimidação +12, Intuição +8, Nobreza +12.
Equipamento Cota de malha delicada de mitral guardiã, escudo pesado reforçado de adamante protetor do esmagamento, espada longa precisa pungente de mitral.
Tesouro Nenhum.`
      },
      {
        chave: "lisandra", nome: "Lisandra", nd: "S", tipo: "Humanoide (dahllan) Média",
        papel: '',
        titulo: "Lisandra de Allihanna",
        fontes: "Holy Avenger",
        resumo: "Nascida dahllan na remota Galrasia (o pai, ela saberia mais tarde, ninguém menos que Mestre Arsenal), Lisandra trazia no sangue a força de A",
        texto:
`Lisandra ND S
Nascida dahllan na remota Galrasia (o pai, ela saberia mais tarde, ninguém menos que Mestre Arsenal), Lisandra trazia no sangue a força de Allihanna antes de se tornar druida. Cresceu criada por lobos e “educada” por um trog anão. Acabou vítima de encanto poderoso de Sszzaas, então banido; foi levada a caçar os vinte Rubis da Virtude e ressuscitar um antigo herói caído, o Paladino de Arton — criando um ser extraplanar tão perigoso que apenas o poder combinado dos vinte deuses originais poderia derrotá-lo. Sem alternativa, o Panteão acolheu Sszzaas de volta. Lisandra casou-se com Sandro, ladrão aventureiro que a acompanhou nos piores momentos, e tiveram gêmeos. O chamado de Allihanna como sua sumo-sacerdotisa foi uma surpresa: havia sido abandonada pela deusa, até privada de magia divina. Mas, sendo tão poderosa, não poderia se manter neutra contra a Tormenta e outros perigos. Lisandra vem atuando como uma quase invencível druida guerreira, verdadeira força da natureza, na linha de frente contra os lefeu. Acompanha grupos épicos que adentram território da Tormenta, exterminando até as aberrações mais perigosas. Especula-se que apenas os próprios Lordes da Tormenta podem superá-la em poder. Apesar de tais vitórias, muitos são contrários ao envolvimento de Lisandra na guerra contra os lefeu. Primeiro, porque seu real nível druídico é modesto — Lisandra é muito mais poderosa como guerreira, não deveria comandar druidas mais sábios e experientes. Segundo, porque desafia abertamente a pena imposta pelo tribunal de Khalmyr, minando a já abalada autoridade do Deus da Justiça. E terceiro, porque isso pode ser muito perigoso: heróis épicos como Talude, Vectorius e outros já foram tentados pelos lordes lefeu, seduzidos a se juntar aos invasores. Felizmente, resistiram. Mas se isso acontecer com Lisandra, se ela for corrompida… Seria capaz de dizimar o Reinado sozinha! Hoje, Lisandra não é apenas a arquidruida suprema de Allihanna — é a mais poderosa entre todos os sumo-sacerdotes. Desloca-se magicamente através das áreas florestais, alcançando qualquer ponto de Arton em minutos, para exercer autoridade e resolver assuntos ligados à deusa. Ao mesmo tempo, mantém imensas feras-vegetais conjuradas para proteger seus entes queridos. Após uma dramática reconciliação com o pai, Lisandra também o teria auxiliado contra Keenn em sua campanha para se tornar Deus da Guerra.
Humanoide (dahllan) Média
Iniciativa +19, Percepção +26
Defesa 61, Fort +30, Ref +22, Von +36, proteção divina, redução de dano 20, resistência a magia +5
Pontos de Vida 1.650
Deslocamento 9m (6q), voo 12m (8q), ignora terreno difícil natural
Pontos de Mana 98
Corpo a Corpo Espada bastarda x2 +55 (2d12+30, 17) e gavinhas x4 +55 (3d8+30 impacto, alcance 3m).
Chuva de Estacas (Movimento, 4 PM) Lisandra evoca uma chuva de estacas sobre uma área de 9m de raio em alcance médio. Criaturas na área sofrem 10d12 pontos de dano de corte e ficam sangrando (Ref CD 40 reduz à metade e evita a condição).
Criar Toscos (Movimento, 2 PM) Lisandra invoca 2d4+1 toscos capangas em espaços desocupados em alcance curto. Eles agem a partir da próxima rodada de Lisandra, têm
deslocamento 9m e podem gastar uma ação padrão para causar 2d6+2 pontos de dano de corte em uma criatura adjacente. Os toscos têm For 4, Des 4, Defesa 55 e 1 PV, falham automaticamente em qualquer teste oposto ou de resistência e desaparecem quando mortos ou ao fim da cena.
Empatia Selvagem Lisandra pode se comunicar com animais por meio de linguagem corporal e vocalizações. Ela pode usar Adestramento para mudar atitude e pedir favores de animais.
Fluxo de Mana Lisandra pode manter dois efeitos sustentados simultaneamente com apenas uma ação livre (mas pagando o custo de cada um).
Força da Natureza O custo de todas as magias de Lisandra é reduzido em –2 PM e a CD para resistir a elas aumenta em +2 (já contabilizado). Esses bônus dobram (–4 PM e +4 na CD) se ela estiver em terrenos naturais.
Forma de Madeira (Movimento) Uma camada de matéria vegetal cobre Lisandra até o fim da cena, formando uma armadura e dando a ela asas e gavinhas fortes e resistentes. Lisandra recebe +15 na Defesa, deslocamento de voo 12m (8q) e quatro ataques corpo a corpo com suas gavinhas. Ela também cria uma arma corpo a corpo qualquer, feita de madeira, ameaçadora e magnífica. As estatísticas da ficha consideram que esta habilidade está ativa.
Magia Acelerada (Livre, +4 PM) Uma vez por rodada, quando lança uma magia com execução de ação completa ou menor, Lisandra muda a execução dela para livre.
Punição Divina (Padrão) Von CD 55 evita.
Magias Como uma druida de Allihanna de 20º nível (CD 55, limite de PM 28). Lisandra conhece todas as magias divinas, bem como todas as magias arcanas de convocação, evocação e transmutação.
• Aura Divina (Padrão, 13 PM) Até o fim da cena, Lisandra emana uma aura com 9m de raio. Ela e aliados devotos de Allihanna na área ficam imunes a encantamento e recebem +10 na Defesa e em testes de resistência. Aliados não devotos recebem +5 na Defesa e em testes de resistência. Cada vez que um inimigo entra na área, fica lento até o fim da cena (Von evita).
• Controlar Plantas (Padrão, 1 PM) Um quadrado de 9m de vegetação em alcance curto se torna terreno difícil. Criaturas na área quando a magia é lançada ou no início de seus próprios turnos ficam enredadas e imóveis (Ref evita). Uma vítima pode se libertar com uma ação padrão e um teste de Acrobacia ou Atletismo.
• Curar Ferimentos (Padrão, 28 PM) Uma criatura adjacente cura 31d8+30 PV ou criaturas escolhidas em alcance curto curam 26d8+26.
• Dissipar Magia (Padrão, 1 PM) Lisandra escolhe uma criatura, objeto ou esfera de 3m em alcance médio e faz um teste de Misticismo. Todas as magias no alvo escolhido com CD menor que o teste são dissipadas. Se lançada contra um item mágico, transforma-o em um item mundano por 1d6 rodadas (Von anula).
• Raio Polar (Padrão, 27 PM) Lisandra dispara uma esfera de 6m em alcance médio. Criaturas nessa área sofrem 18d8 pontos de dano de frio e ficam paralisadas em um bloco de gelo (Fort reduz o dano à metade e muda a condição para lento). É possível quebrar o gelo, que tem 20 PV, RD 10 e vulnerabilidade a fogo, para libertar uma criatura presa.
• Libertação (Padrão, 8 PM) Até o fim da cena, uma criatura em alcance curto fica imune a efeitos de movimento e ignora qualquer efeito que impeça ou restrinja seu deslocamento, e pode usar habilidades que exigem liberdade de movimentos mesmo se estiver usando armadura ou escudo.
For 6, Des 3, Con 5, Int 1, Sab 8, Car 3
Perícias Adestramento +24, Cura +26, Diplomacia +21, Intimidação +21, Misticismo +19, Religião +34, Sobrevivência +34.
Equipamento Coroa de Allihanna, símbolo sagrado de Allihanna. Tesouro Nenhum.`
      },
      {
        chave: "lordeNiebling", nome: "Lorde Niebling", nd: "13", tipo: "Humanoide (gnomo) Pequeno",
        papel: '',
        fontes: "A Flecha de Fogo, Desafio dos Deuses",
        resumo: "Nieblingscarphittlestonefingeralonefauchard.",
        texto:
`Lorde Niebling ND 13
Nieblingscarphittlestonefingeralonefauchard. Mais conhecido como “o Único Gnomo de Arton”. A trajetória deste indivíduo curioso sempre foi marcada por sua inigualável capacidade inventiva. Transportado misteriosamente para Arton vindo “de outro lugar”, estabeleceu-se na cidade de Valkaria, onde sua inteligência e engenhosidade chamaram a atenção do Rei-Imperador que então governava. Desafiado a provar seu valor, Niebling observou a cidade por sete dias e sete noites, identificando uma necessidade: o acesso seguro e acessível a Vectora, o Mercado nas Nuvens, durante a passagem anual da famosa cidade voadora. Foi ele quem projetou o primeiro “ancoradouro”, permitindo que cidadãos comuns pudessem alcançar as alturas facilmente por meio de teleféricos. A inovação lhe valeu o título de lorde e um lugar na corte imperial. Na corte e fora dela, o gnomo continuou a se dedicar a sua verdadeira paixão: a criação de máquinas, veículos e artefatos tecnológicos. Suas con tribuições são vastas, tendo criado diversas inovações para o famoso Circo dos Irmãos Thiannate e treinado gerações inteiras de engenhoqueiros goblins. De aparência distinta, caracterizada por sua estatura baixa e vestimentas coloridas frequentemente manchadas de graxa, o gnomo continua espalhando sua inventividade irrefreável por Arton. Embora poucos consigam compreender ou mesmo utilizar suas invenções mais ousadas, sua influência já pode ser sentida em mais de um continente. E agora, com o posto de Imaginador Imperial na corte de Shivara, alguns tremem ao pensar no que ele pode fazer.
Humanoide (gnomo) Pequeno
Iniciativa +13, Percepção +12, visão na penumbra
Defesa 41, Fort +13, Ref +20, Von +26, evasão, redução de dano 10, resistência a atordoamento, efeitos mentais e medo +5
Pontos de Vida 280
Deslocamento 6m (4q)
Pontos de Mana 66
Corpo a Corpo Cimitarra +32 (2d6+20 essência, 17).
À Distância Pistola +27 (4d6+20, 16/x3, alcance médio).
Aparatos Tecnológicos Lorde Niebling possui um acervo de inventos de alta tecnologia tão avançados que apenas ele sabe como operá-los.
• Acelerador Magnético (Livre, 1 PM) Niebling executa uma ação padrão adicional. Ele só pode ativar este aparato uma vez por rodada.
• Cicatrizante Instantâneo (Reação, 5 PM) Quando Niebling é reduzido a 0 PV ou menos, ele recupera 100 PV.
• Colete Amortecedor Sempre que Niebling sofre dano de um ataque ou habilidade, role 1d6. Em um resultado 1 ou 2 ele ignora esse dano.
• Dínamo Bélico Sempre que Niebling faz um ataque, o dínamo acumula uma carga que dura até o fim da cena. Para cada carga, os ataques de Niebling causam +1d12 pontos de dano de eletricidade.
• Monóculo Perscrutador Este monóculo mecânico fornece o efeito básico das magias Concentração de Combate e Visão da Verdade.
Pensamento Avançado (Reação, 2 PM) Quando faz um teste de perícia, Niebling soma o dobro de sua Inteligência (+16) no teste.
Engenhocas Niebling pode fabricar engenhocas de qualquer magia como um inventor de 18º nível. Ele ativa essas engenhocas com uma ação de movimento e, quando faz um teste de Ofício para ativá-las, rola dois dados e usa o melhor resultado. Ele pode ter até 8 engenhocas ao mesmo tempo, selecionadas entre as mais adequadas à ocasião. A CD para resistir às engenhocas de Niebling é 37.
For –1, Des 3, Con 3, Int 8, Sab 2, Car 2
Perícias Conhecimento +20, Cura +12, Diplomacia +12, Furtividade +15, Intuição +14, Ladinagem +13 (+15 para abrir fechadura), Nobreza +18, Ofício (alquimista) +27, Ofício (armeiro) +25, Ofício (engenhoqueiro) +25, Pilotagem +15.
Equipamento Ácido x2, balas de adamante x20, bálsamo restaurador x2, bomba x2, cimitarra discreta pungente precisa energética, couraça sob medida de mitral, gazua aprimorada, pistola precisa pungente com mira telescópica ameaçadora, três instrumentos de Ofício (alquimista, armeiro e engenhoqueiro) aprimorados. A CD para resistir aos preparados de Niebling é 37. Tesouro Padrão.`
      },
      {
        chave: "lordeVectorius", nome: "Lorde Vectorius", nd: "–", tipo: "Humanoide (humano) Médio",
        papel: '',
        fontes: "Holy Avenger, O Terceiro Deus",
        resumo: "Vectorius é um dos dois maiores conjuradores de Arton, com poder comparável apenas a Talude, antigo reitor da Academia Arcana — e seu maior rival.",
        texto:
`Lorde Vectorius ND –
Vectorius é um dos dois maiores conjuradores de Arton, com poder comparável apenas a Talude, antigo reitor da Academia Arcana — e seu maior rival. Ao contrário de Talude, nunca enxergou a magia como uma arte a ser venerada em um templo ou academia, mas sim como uma ferramenta que deve ser constantemente posta em prática — e que pode ser perigosa nas mãos erradas. Irritado com a postura do rival, prometeu realizar um feito mágico superior à sua academia. Ao ouvir queixas de mercadores sobre as longas viagens que lhes privavam da companhia da família, teve uma ideia. Fez uma montanha inteira levitar, inverteu-a e a transformou na gigantesca ilha voadora que se tornaria sua maior criação: Vectora, o Mercado nas Nuvens. Sem pertencer a nenhum reino, a cidade comercial voa pelos céus do Reinado e além, conectando regiões e povos. Vectorius é seu protetor e governante, um comerciante astuto que já escapou ileso de muitas tentativas de assassinato. O mesmo não se pode dizer de sua cidade, que sofreu danos terríveis contra o Dragão da Tormenta. O arquimago, no entanto, a reergueu ainda mais poderosa, ostentando suas cicatrizes em ouro, como marcas orgulhosas de sua força.
Humanoide (humano) Médio
Iniciativa +20, Percepção +18, visão no escuro
Defesa 63, Fort +22, Ref +30, Von +36, imunidade a efeitos mentais e medo, redução de dano 20, resistência a magia +5
Pontos de Vida 740
Deslocamento 9m (6q)
Pontos de Mana 400 Arcano de Batalha Vectorius soma sua Inteligência nas rolagens de dano quando lança magias ou usa seu Raio Arcano (já contabilizado).
Contingência Arcana (Reação) Uma vez por cena, quando é alvo de um efeito hostil, Vectorius lança uma magia arcana a sua escolha.
Contramágica Aprimorada (Reação) Uma vez por rodada, Vectorius faz uma contramágica.
Escudo Místico (Reação) Quando lança uma magia, para cada PM gasto Vectorius recebe 5 PV temporários cumulativos.
Fluxo de Mana Vectorius pode manter dois efeitos sustentados simultaneamente com apenas 1 ação livre (mas pagando o custo de cada um).
Magia Amplificada (Livre, +2 PM) Quando lança uma magia, Vectorius aumenta seu alcance em um passo (de toque para curto, de curto para médio, de médio para longo) ou triplica sua área de efeito.
Magia Discreta (Livre, +2 PM) Quando lança uma magia, Vectorius não precisa gesticular ou falar, e pode lançar a magia com as mãos presas, amordaçado etc. Perceber que ele lançou uma magia exige passar em um teste de Misticismo (CD 30).
Magias Aceleradas (Livre, +4 PM) Até duas vezes por rodada, quando lança uma magia com execução de ação completa ou menor, Vectorius muda a execução dela para livre. Se a magia for de 1º ou 2º círculo, ele não precisa pagar o custo adicional desta habilidade.
Magias Permanentes Vectorius está permanentemente sob efeito das magias Compreensão, com o aprimoramento para alcance curto, e Visão Mística, com os aprimoramentos de visão no escuro e enxergar criaturas e objetos invisíveis.
Raio Arcano (Movimento) Uma criatura em alcance médio sofre 5d12+14 pontos de dano de essência (Ref CD 55 reduz à metade).
Separação Mental Vectorius pode executar uma ação padrão adicional por rodada. Essa ação pode se originar de qualquer ponto em alcance médio para o qual ele tenha linha de visão (como se ele estivesse em dois lugares ao mesmo tempo).
Magias Vectorius lança qualquer magia arcana como um mago de 20º nível (CD 55, limite de PM 34).
For 1, Des 2, Con 3, Int 14, Sab 2, Car 4
Perícias Conhecimento +30, Cura +18, Diplomacia +20 (+30 para barganha), Guerra +30, Intimidação +20, Intuição +23, Investigação +30, Jogatina +30, Misticismo +35, Nobreza +30, Ofício (alquimista) +30, Ofício (armeiro) +30, Ofício (artesão) +30, Pilotagem +30, Religião +30.
Equipamento Braceletes de ouro, robe do arquimago. Vectorius não só é extremamente rico, como tem os meios para adquirir praticamente qualquer item, mundano ou mágico. Considere que seu equipamento inclui qualquer item apropriado para a ocasião. Tesouro Triplo.`
      },
      {
        chave: "maryx", nome: "Maryx", nd: "17", tipo: "Humanoide (hobgoblin) Média",
        papel: '',
        titulo: "Maryx Corta-Sangue",
        fontes: "A Flecha de Fogo",
        resumo: "Maryx Nat’uyzkk, conhecida como “Corta-Sangue” pelos humanos, nasceu entre os batalhões de hobgoblins de Lamnor e, se o destino tivesse segu",
        texto:
`Maryx ND 17
Maryx Nat’uyzkk, conhecida como “Corta-Sangue” pelos humanos, nasceu entre os batalhões de hobgoblins de Lamnor e, se o destino tivesse seguido seu caminho normal, teria sido mais uma soldada como tantos, lutando contra os elfos num batalhão. Mas, segundo o Akzath, seu futuro determinou seu passado e vice-versa. A vida de Maryx nunca seria comum. Hobgoblins não costumavam formar famílias, mas conviver em unidades militares, onde lutavam como um só, abrindo mão da individualidade. Mas uma hobgoblin mais velha, estranhamente parecida com ela mesma, tomou a iniciativa de treinar a guerreira num estilo de luta diferente. Maryx aprendeu a ser ágil e furtiva, a lutar sozinha, a assassinar alvos importantes. A ser um indivíduo. Maryx não pode ter certeza de que aquela foi sua mãe, pois tais laços eram proibidos no exército. Mas isso não impede que pense em sua mestra como tal. Maryx era jovem quando Thwor Khoshkothruk ascendeu e uniu os povos goblinoides na Aliança Negra. Ela participou da tomada de Lenórienn, o reino dos elfos, e escoltou a princesa Tanya até seu cativeiro, o que levou a prisioneira a enxergar o lado dos goblinoides na guerra contra os elfos e, depois de algum tempo, mudar de lado, tornando-se seguidora ferrenha de Thwor. Sendo guerreira de confiança do Imperador, Maryx recebeu a permissão especial de casar com um de seus comandados, o soldado Vartax. O casal teve duas filhas que, também por concessão de Thwor, puderam ser criadas por eles mesmos, em vez de serem entregues aos sacerdotes do Deus da Morte. Com o tempo, Maryx se tornou uma guerreira solitária, atuando em missões individuais ou em grupos pequenos, enquanto Vartax virou um gladiador na capital da Aliança Negra. Mas, assim como o passado de Maryx era manchado de sangue, também seria seu futuro. Durante os eventos que levaram à revelação da Flecha de Fogo e à ascensão de Thwor como um deus, Maryx perdeu sua família. Vartax e as duas meninas foram assassinados pelo Deus da Morte, na tentativa de separar a guerreira de seus aliados. O plano não deu certo, mas marcou a caçadora para sempre. Depois da queda da Flecha de Fogo e da fragmentação da Aliança Negra, Maryx passou a liderar um dos exércitos que afirmam ser os “verdadeiros herdeiros” das palavras de Thwor. Uma das maiores lideranças em Lamnor atualmente, a hobgoblin procura unir de novo o continente e concretizar o sonho de seu deus: O Mundo como Deve Ser, um futuro em que o caos reina, acabando com diferenças mesquinhas entre raças e reinos. Maryx tem o corpo coberto de pequenas e médias tatuagens individuais. Cada uma é a marca de uma vitória — exceto a tatuagem de caveira que cobre seu rosto, um símbolo de punição por ter desafiado o clero do Deus da Morte. Ela luta com o kum’shrak, um tipo de arma feita do osso de um animal nativo de Lamnor. Não é um objeto mágico, mas pela própria natureza de como as coisas funcionam no continente, fica mais afiado sempre que mata alguém. O kum’shrak de Maryx é imbuído de morte. Apenas tocar na parte plana da arma é suficiente para tirar sangue de alguém que não tenha experiência ou não seja duyshidakk.
Humanoide (hobgoblin) Média
Iniciativa +24, Percepção +18, visão no escuro
Defesa 54, Fort +24, Ref +30, Von +17, evasão, resistência a medo +5
Pontos de Vida 660
Deslocamento 9m (6q), ignora terreno difícil natural
Corpo a Corpo Kum’shrak x2 +47 (4d8+28, 19/x3, mais veneno) e foice x2 +47 (4d6+28, x4).
À Distância Adaga x2 +44 (2d4+15).
Camuflagem da Caçadora Quando Maryx está sob camuflagem, seus inimigos aplicam a chance de erro por camuflagem a qualquer efeito contra ela (não apenas ataques). Isso protege apenas Maryx, não outros alvos ou criaturas na área do efeito.
Eclipse Maryx cavalga Eclipse, um warg montaria especial.
Enquanto Maryx está montada, seu deslocamento se torna 12m, ela recebe uma ação de movimento extra por turno (apenas para se deslocar), +2d6 em rolagens de dano corpo a corpo e, uma vez por rodada, quando acerta um ataque corpo a corpo, pode fazer a manobra derrubar como uma ação livre (teste +49). Eclipse carrega os equipamentos de Maryx entranhados em seu pelo, fazendo com que ela nunca fique sem munição.
Emboscar (Livre) Maryx executa uma ação padrão adicional em seu turno. Ela só pode usar esta habilidade na primeira rodada de um combate.
Granadeira Veterana Maryx pode arremessar bombas e outros preparados alquímicos em alcance médio e pode arremessar dois desses itens com a mesma ação padrão.
Marca da Presa (Livre) Uma vez por rodada, Maryx analisa uma criatura em alcance longo. Até o fim da cena, ela recebe +5 em testes de perícia, +5 na margem de ameaça e +2d10 em rolagens de dano contra essa criatura (o bônus em dano é dobrado contra criaturas desprevenidas, e os bônus totais são dobrados contra elfos e humanos).
Predadora Alfa (Movimento) Maryx faz um teste de Furtividade oposto à Percepção de uma criatura em alcance curto. Se passar, “surge” adjacente ao alvo e é considerada invisível contra ele até o início de seu próximo turno.
Saque Rápido Maryx pode sacar e guardar itens como uma ação livre.
Terror de Lamnor Maryx pode se mover com seu deslocamento normal enquanto usa Furtividade sem sofrer penalidades no teste de perícia e pode se esconder mesmo sem cobertura ou camuflagem, sumindo em plena vista.
Veneno Perde 1d6 pontos de vida.
For 7, Des 8, Con 7, Int 1, Sab 4, Car 1
Perícias Adestramento +15, Atletismo +21, Furtividade +24, Intimidação +15, Sobrevivência +20.
Equipamento Adaga x6, bomba x2, bomba de fumaça* x2, couro batido reforçado sob medida, foice maciça, kum’shrak equilibrado peçonhento preciso . A CD para resistir às bombas de Maryx é 44. Tesouro Nenhum. * Veja Ameaças de Arton, p. 396.`
      },
      {
        chave: "mestreLuriel", nome: "Mestre Luriel", nd: "5", tipo: "Humanoide (elfo) Médio",
        papel: '',
        fontes: "Fim dos Tempos, Segredos de Arton",
        resumo: "Um elfo sábio milenar, que já viu e já foi muitas coisas.",
        texto:
`Mestre Luriel ND 5
Um elfo sábio milenar, que já viu e já foi muitas coisas. No passado distante, deixou o reino divino de Nivenciuén, peregrinando a bordo de uma nau voadora pelo éter entre mundos até chegar a Arton, onde serviu como conselheiro do Rei Khinlanas. Sua missão era registrar a história do reino élfico de Lenórienn, então considerado o centro da civilização — de forma arrogante, como Luriel hoje percebe. A lição de humildade do elfo veio com o fim da Infinita Guerra e a derrota de seu povo. Forçado a fugir, tornou-se escravo da rica família Gorgonius, em Tapista, onde seus conhecimentos renderam a ele uma posição de honra como escriba e tutor. Nessa época, ensinou o jovem minotauro Arius, que viria a se tornar legionário, mago, devoto de Tanna-Toh e aventureiro no Reinado. Hoje, Luriel continua servindo ao clã. Embora sua arrogância élfica tenha sido aplacada pelos séculos, seu amor pelo conhecimento apenas aumentou. É uma enciclopédia viva da história artoniana, tendo imenso acúmulo não apenas de informações, mas de vivência e sabedoria que, dizem, nem mesmo o Helladarion, sumo-sacerdote da Deusa do Conhecimento, possui. Sendo ele próprio devoto dessa crença, Luriel teria compilado tudo o que sabe em vários tomos e estaria procurando alguém para escoltá-los até a Caverna do Saber — que, incrustrada na Supremacia Purista, é um destino arriscado para um elfo. Luriel não é um aventureiro e suas prioridades são outras: ser o tutor de novas lideranças, para ajudá-las a transformar o antigo império em uma república mais justa. Afinal, viu um de seus lares ser destruído pelo orgulho e quer fazer sua parte para evitar que isso aconteça novamente.
Humanoide (elfo) Médio
Iniciativa +11, Percepção +20, visão na penumbra
Defesa 21, Fort +7, Ref +12, Von +20, imunidade a efeitos mentais e medo
Pontos de Vida 90
Deslocamento 9m (6q), ignora terreno difícil natural
Corpo a Corpo Bordão x2 +13 (1d6+9).
Elfo Falante (Padrão) Mestre Luriel começa a falar e não para mais, dando uma lição de moral em qualquer criatura inteligente (Int –3 ou mais) em alcance médio.
A criatura fica pasma por 1d4 rodadas (Von CD 25 evita). Uma criatura só pode ser afetada por esta habilidade uma vez por cena.
Sábio Milenar Mestre Luriel é treinado em todas as perícias baseadas em Inteligência e Sabedoria (teste +25).
For 1, Des 2, Con 2, Int 9, Sab 5, Car 3
Equipamento Bordão, instrumentos de Ofício (escriba) aprimorados. Tesouro Nenhum.
Parceiro Mestre Luriel é um parceiro mestre (claro!) que fornece +2 em todos os testes de perícias baseadas em Inteligência e Sabedoria e um poder de combate, de destino ou de magia, à escolha do personagem, cujos pré-requisitos o personagem possua.`
      },
      {
        chave: "nargomMandibula", nome: "Nargom Mandíbula", nd: "13", tipo: "Humanoide (humano) Médio",
        papel: '',
        fontes: "Guilda do Macaco, Segredos de Arton",
        resumo: "Este elusivo e eloquente pirata não lembra de como era sua vida antes de ser adotado por Draco Mandíbula e, na verdade, não se importa nada com isso.",
        texto:
`Nargom Mandíbula ND 13
Este elusivo e eloquente pirata não lembra de como era sua vida antes de ser adotado por Draco Mandíbula e, na verdade, não se importa nada com isso. Draco era um capitão não muito conhecido por cultivar relacionamentos, mas rapidamente, e por motivos que somente a si pertenciam, adotou-o e o tornou parte da tripulação do Caronte, navio temido nos Três Mares. Cuidou dele como se fosse o legítimo herdeiro de seu império de pilhagens, ensinando-o e educando-o para que um dia pudesse ser um pirata ainda melhor que o próprio capitão. Mas a vida tem reviravoltas cruéis. Espinha, imediato e companheiro em segredo de Draco, orquestrou um motim que resultou na morte do capitão e na tomada do navio. Nargom foi colocado para andar na prancha e atirado nas águas, condenado a se tornar jantar de selakos e outras criaturas marinhas. Entretanto, por algum capricho divino, o Deus da Sorte sorriu para ele. Miraculosamente emergiu ileso e chegou ao Reinado, onde, junto de companheiros improváveis, sua jornada tomaria rumos imprevisíveis. Da simples busca por um barão desaparecido em um pequeno feudo até singrar o éter entre mundos em um navio voador, Nargom acabou se tornando um dos famosos Campeões de Svalas, responsáveis pela derrota da ameaça purista na Guerra Artoniana. Ao longo de suas aventuras, realizou peripécias que jamais imaginaria ser capaz. Roubou o tabuleiro mágico do próprio General Supremo, evitando a morte de muitos soldados do Reinado. Caçou e deu fim a Espinha em uma perseguição que culminou em um feroz duelo travado sobre os telhados da cidade de Sophand, em Wynlla. Rendeu-se ao amor que se recusava a admitir e casou-se com Lady Ayleth, a Rainha de Svalas. E, empunhando pistolas encantadas que outrora haviam pertencido a seu próprio pai, finalmente tomou de volta o Caronte, tornando-se o capitão que estava destinado a ser desde o início. Hoje, Nargom é o maior símbolo da facção dos Piratas Independentes, viajando por todo o Reinado e além, lutando sempre para que bucaneiros e outros heróis possam navegar seguindo o caminho da liberdade, sem mestres. Não importa em qual reino divino o velho Capitão Draco Mandíbula tenha ido parar — é certo que olha para seu filho adotivo com orgulho.
Humanoide (humano) Médio
Iniciativa +25, Percepção +17
Defesa 44, Fort +19, Ref +27, Von +13, evasão, esquiva sobrenatural
Pontos de Vida 280
Deslocamento 9m (6q)
Corpo a Corpo Florete x2 +37 (2d6+30, 18).
À Distância Duas pistolas +40 (2d6+30, 18/x3).
Ataque Furtivo +3d8.
Audácia (Reação) Uma vez por cena, quando faz um teste de perícia, Nargom soma seu Carisma nesse teste.
Corvo Feérico Nargom possui um corvo feérico parceiro que fornece +5 em Percepção (já contabilizado) e permite que ele compreenda qualquer idioma.
Finta Aprimorada Nargom pode fintar como uma ação de movimento.
Língua Veloz Nargom sofre uma penalidade de apenas –5 para mentiras muito implausíveis, em vez de –10.
Mestre da Escapada (Reação) Nargom ignora o efeito nocivo de um ataque ou habilidade. Recarga (fintar um inimigo).
Pistoleiro Experiente Nargom pode recarregar suas duas armas de fogo como uma ação de movimento e, quando ataca com uma arma de fogo, não sofre a penalidade padrão de –5 em testes de ataque contra oponentes envolvidos em combate corpo a corpo.
For 1, Des 6, Con 3, Int 4, Sab 2, Car 7
Perícias Acrobacia +18, Atletismo +12, Diplomacia +19, Enganação +24, Furtividade +16, Investigação +16, Ofício (marinheiro) +14, Pilotagem +16.
Equipamento Capa esvoaçante aprimorada, florete atroz preciso, medalhão imperial (conta como um tabardo aprimorado), pistolas magníficas x2. Tesouro Padrão.`
      },
      {
        chave: "nialandarena", nome: "Nialandarena", nd: "4", tipo: "Humanoide (qareen) Média",
        papel: '',
        titulo: "Nialandarena de Wynna",
        fontes: "Holy Avenger: Paladina",
        resumo: "Nialandarena, ou apenas Niala, supostamente nasceu qareen no reino de Wynlla.",
        texto:
`Nialandarena ND 4
Nialandarena, ou apenas Niala, supostamente nasceu qareen no reino de Wynlla. Ouvia da mãe humana que fora presente da Deusa da Magia, conjurada em ritual de amor com um jairuan, um gênio dos ventos — uma história comum entre qareen. Plena de força mágica nas veias, parecia lógico a ela cursar a Academia Arcana. Passar pelos testes de admissão foi simples. O único incidente peculiar ocorreria durante sua entrevista com o arquimago Talude, Mestre Máximo da Magia, que lhe disparou um olhar penetrante e um comentário curioso: “Então… você de novo?”. Niala pensava inicialmente se graduar maga ou feiticeira. Chegando ali, porém, a proximidade de Wynna, que encantava o lugar com sua presença de tempos em tempos, levou seu coração a outro destino: pediu para ser ordenada clériga no templo local. A origem e trajetória de Niala seriam bem comuns para meios-gênios, não fosse um detalhe: sua extraordinária semelhança física, de personalidade — e até mesmo de nome! — com Nielendorane de Lenórienn, a antiga arquimaga élfica. Mesmo no além-vida, a elfa exuberante seguiria ajudando seus antigos companheiros, retornando a este mundo de tempos em tempos. Ou assim se pensava. O surgimento de Nialandarena vem repleto de teorias e boatos. Será verdadeira a história de seu nascimento? Será mesmo outra pessoa? Hipóteses não faltam. Alguns imaginam que Niele teria pedido a Wynna para ressuscitar, não mais elfa, agora vestindo um corpo mais condizente com sua verdadeira natureza. Outros dizem que ela não voltou à vida realmente, está apenas (mal) disfarçada. Outros acreditam que Niala poderia muito bem ser sua meia-irmã, ou até filha. Outros ainda afirmam ser um avatar de Wynna, enquanto os mais alarmistas suspeitam de outro plano misterioso dos deuses. Perguntada a respeito, Niala confirma qualquer história que ache divertida, ou inventa outra ainda mais colorida. Ela acredita que seu dever é levar magia e alegria a todos — e também castigar aqueles que usam a mágica arcana para causar dor ou sofrimento. Atualmente, a qareen reside em Nova Malpetrim, auxiliando um grupo de jovens aventureiros com seu poder, que também não corresponde à magia convencional de clérigos ou arcanistas.
Humanoide (qareen) Média
Iniciativa +7, Percepção +7
Defesa 21, Fort +4, Ref +10, Von +16, redução de eletricidade 10
Pontos de Vida 96
Deslocamento 9m (6q), voo 9m (6q)
Pontos de Mana 32
Corpo a Corpo Bordão x2 +14 (1d6+6).
Atraente Niala recebe +2 em testes de perícias baseadas em Carisma contra criaturas que possam se sentir fisicamente atraídas por ela.
Desejos Se Niala lançar uma magia que alguém tenha pedido desde seu último turno, o custo da magia diminui em –1 PM.
Escudo Mágico Quando lança uma magia, Niala recebe um bônus na Defesa igual ao círculo da magia lançada, até o início do seu próximo turno.
Inspiração (Padrão, 2 PM) Niala e todos os seus aliados em alcance curto recebem +1 em testes de perícia até o fim da cena.
Tatuagem Divina A tatuagem especial de Niala permite que ela lance qualquer magia, arcana ou divina, de até 3º círculo, como uma clériga de Wynna de 9º nível (CD 20, limite de PM 15).
For 0, Des 3, Con 2, Int 3, Sab 3, Car 6
Perícias Atuação +10, Conhecimento +7, Enganação +10, Misticismo +7, Religião +7.
Equipamento Bordão, braceletes de bronze, símbolo sagrado de Wynna. Tesouro Padrão.`
      },
      {
        chave: "orionDrake", nome: "Orion Drake", nd: "20", tipo: "Humanoide (humano) Médio",
        papel: '',
        fontes: "O Crânio e o Corvo, O Terceiro Deus",
        resumo: "Orion Drake nasceu numa família nobre de Bielefeld, mas seu nascimento marcou o início da queda da casa.",
        texto:
`Orion Drake ND 20
Orion Drake nasceu numa família nobre de Bielefeld, mas seu nascimento marcou o início da queda da casa. Seu pai era um cavaleiro misterioso que surgiu inesperadamente num torneio — o “Cavaleiro Risonho”, trajando uma bizarra armadura completa que escondia seu rosto. O filho fora do casamento foi o suficiente para que os Drake caíssem em desgraça entre a nobreza tradicionalista. Orion cresceu sob o estigma de indesejado e precisou se esforçar mais que qualquer outro para conquistar o reles posto de escudeiro. Apesar da dedicação à cavalaria e sua afiliação à Ordem da Luz, contando com a confiança de Alenn Toren Greenfeld, sua reputação obscura persistia. A nobreza o via como ameaça, com sua honra inflexível. Seu casamento com Vanessa Derrigan, uma clériga de Keenn, agravou a hostilidade que enfrentava, apesar de sua retidão e disciplina exemplares. A maré de sua vida mudou quando confrontou o caçador de recompensas Crânio Negro, desencadeando uma jornada que o levou a liderar o Exército do Reinado contra a Tormenta. A vitória na Batalha do Crânio e do Corvo restaurou a glória de sua família, concedendo-lhe terras e um estandarte, embora Orion não desejasse tal reconhecimento. Persistindo na busca por seu filho raptado e enfrentando Crânio Negro, Orion treinou os Cavaleiros do Corvo, sendo expulso da Ordem da Luz. Sua liderança na batalha que pôs fim à área de Tormenta de Tamu-ra marcou a primeira vitória de Arton contra a Tempestade Rubra. Porém, trouxe consequências, incluindo a ascensão de Kallyadranoch e seu julgamento pelo próprio Khalmyr, cujo veredito permanece em segredo. Atualmente, Orion se considera aposentado, dedicando-se à família em suas modestas terras. É um dos guerreiros mais poderosos do mundo conhecido, mas escolheu envelhecer humilde, em paz na obscuridade.
Humanoide (humano) Médio
Iniciativa +17, Percepção +17
Defesa 61, Fort +34, Ref +20, Von +28, fortificação 50%, redução de dano 10, resistência a magia e medo +5
Pontos de Vida 780
Deslocamento 6m (4q)
Corpo a Corpo Espada-Deus x3 +55 (4d12+75, 14).
Bravura Inquebrável Orion Drake sofre apenas metade do dano de ataques e habilidades.
Cavaleiro Veterano Orion passa automaticamente em testes de Cavalgar para não cair da montaria quando sofre dano, e não sofre penalidades para atacar à distância enquanto montado. Além disso, quando faz uma investida montada, ele causa o dobro do dano e pode continuar se movendo depois do ataque. Ele deve se mover em linha reta e seu movimento máximo ainda é o dobro do seu deslocamento.
Corcel de Batalha Orion cavalga um cavalo de batalha (veja Tormenta20, p. 262). Enquanto ele estiver montado, seu deslocamento se torna 15m, ele recebe duas ações de movimento extras por turno (apenas para se deslocar) e +2 nos testes de ataque e +1d6 nas rolagens de dano de seus ataques corpo a corpo.
Duelo (Livre) Uma vez por rodada, Orion escolhe um oponente em alcance curto e recebe +5 em testes de ataque e rolagens de dano contra ele até o fim da cena ou até atacar outro oponente.
Ordens Avançadas (Movimento) Orion grita ordens para seus aliados em alcance médio. Eles recebem +5 em testes de perícia até o fim da cena.
Resoluto (Livre) Uma vez por rodada, Orion refaz um teste de resistência contra uma condição (como abalado, paralisado etc.) que o esteja afetando. O segundo teste recebe um bônus de +5 e, se ele passar, cancela o efeito. Orion só pode usar esta habilidade uma vez por efeito.
Ferimento Permanente Orion não possui o braço esquerdo.
Ele sofre –2 em Acrobacia, Atletismo (já contabilizado), Ladinagem e Ofício, e só pode empunhar um item.
For 9, Des 1, Con 6, Int 2, Sab 2, Car 1
Perícias Atletismo +21, Cavalgar +15, Diplomacia +19, Guerra +21, Nobreza +16.
Equipamento Armadura completa reforçada de adamante abascanta guardiã, cinto da força do gigante, Espada-Deus, tabardo aprimorado. Tesouro Padrão.`
      },
      {
        chave: "paladinaDeKhalmyr", nome: "Paladina de Khalmyr", nd: "4", tipo: "Humanoide (humana) Média",
        papel: '',
        fontes: "Holy Avenger: Paladina",
        resumo: "Filha de Elaina e Mighel de Petrynia, esta jovem teve o nome peculiar recebido em sonhos pela mãe.",
        texto:
`Paladina de Khalmyr ND 4
Filha de Elaina e Mighel de Petrynia, esta jovem teve o nome peculiar recebido em sonhos pela mãe. Iria se chamar Paladina de Petrynia, conforme a tradição humana do Reinado. Mas um incidente trágico em sua infância mudaria tudo: mãe e filha foram atacadas por Dee, maníaco mascarado e campeão de Nimb. A filha foi raptada e a mãe, deixada insana. Testemunhando impotente os clérigos levarem sua esposa para um sanatório, Mighel implorou a Khalmyr por um milagre. E foi atendido. O Deus da Justiça em pessoa trouxe sua filha de volta, mas com um aviso: ela não estava segura ali. Deveria ser levada a um mosteiro e iniciada como devota, acolhendo então seu novo sobrenome. Durante os anos seguintes, uma Paladina incrivelmente forte e inquieta realizava fugas frequentes do mosteiro, sendo sempre detida — às vezes, salva — pelo próprio Khalmyr. Queria voltar para casa, para Nova Malpetrim, onde o pai mantinha a Taverna do Polvo Canhoto. Chegando aos 15 anos, sua escapadela mais recente terminou levando-a para casa, sob as bênçãos de Khalmyr, que considerou seu treinamento encerrado. Lá, reencontraria o amigo de infância Francis, lefou feiticeiro da Tormenta, vivendo foragido nas vizinhanças da cidade após fugir de casa para poupar os pais da rejeição pública por abrigar um aberrante. Também se uniria a Niala, exuberante clériga qareen, e Tokinho, troglodita anão estranhamente erudito (e capaz de assumir uma forma feral gigantesca). Com eles, formaria um grupo para buscar uma cura para a mãe. Em combate, Paladina utiliza uma poderosa armadura mágica litúrgica que roubou do mosteiro, armazenada em uma gargantilha. Esse roubo — e também sua aliança com um bruxo da Tormenta — acabaria trazendo complicações com a centaura Brionna, antiga rival e Guardiã da Realidade, uma ordem de paladinos dedicada a combater a Tormenta.
Humanoide (humana) Média
Iniciativa +4, Percepção +5
Defesa 23, Fort +16, Ref +4, Von +10
Pontos de Vida 115
Deslocamento 9m (6q)
Pontos de Mana 16
Corpo a Corpo Espada longa +16 (1d8+14, 19).
Aura Sagrada (Livre, 1 PM, sustentada) Paladina gera uma aura de luz com 9m de raio. Ela e seus aliados dentro da aura recebem +4 em testes de resistência.
Cura pelas Mãos (Movimento, 1 PM) Paladina cura 1d8+1 pontos de vida de uma criatura adjacente.
Golpe Divino (Livre, 2 PM) Quando faz um ataque corpo a corpo, Paladina soma o Carisma no teste de ataque e +1d12 na rolagem de dano.
Código do Herói Paladina sempre mantém sua palavra e nunca pode recusar um pedido de ajuda de alguém inocente. Além disso, nunca pode mentir, trapacear ou roubar. Se violar o código, ela perde todos os seus PM e só pode recuperá-los a partir do próximo dia.
For 7, Des 0, Con 2, Int 0, Sab 1, Car 4
Perícias Atletismo +11, Diplomacia +8, Religião +5.
Equipamento Armadura de Khalmyr, escudo pesado, espada longa certeira, símbolo sagrado de Khalmyr.
Tesouro Padrão.`
      },
      {
        chave: "paollus", nome: "Paollus", nd: "14", tipo: "Humanoide (meio-elfo) Médio",
        papel: '',
        titulo: "Paollus, o Irmão Mais Velho",
        fontes: "O Crânio e o Corvo, Guilda do Macaco, Fim dos Tempos",
        resumo: "Líder da Companhia dos Irmãos, primeira e maior organização criminosa valkariana, este meio-elfo de cabelos bem penteados é normalmente calm",
        texto:
`Paollus ND 14
Líder da Companhia dos Irmãos, primeira e maior organização criminosa valkariana, este meio-elfo de cabelos bem penteados é normalmente calmo e meticuloso, mas, quando necessário, extremamente enérgico. Dizem que a Companhia teve origem em um grupo de aventureiros. Apesar disso, Paollus despreza essas figuras, que considera meros mercenários e saqueadores de túmulos, e enxerga a fraternidade criminosa como uma instituição respeitável. Para ele, seus irmãos de pacto são os verdadeiros protetores da população e mantenedores da ordem nas ruas da metrópole. A taxa de proteção cobrada pelo serviço, apenas um símbolo do respeito devido a quem o realiza. Em sua juventude, Paollus atuou como capanga e assassino, tornando-se um exímio lutador e besteiro. Porém, hoje está longe das linhas de frente. Em vez disso, o “irmão mais velho” prefere apadrinhar aqueles que possam ser úteis no futuro, o que já deixou em dívida com ele diversos figurões, incluindo nobres, membros da guarda e até mesmo heróis.
Humanoide (meio-elfo) Médio
Iniciativa +21, Percepção +16, visão na penumbra
Defesa 45, Fort +26, Ref +22, Von +16, esquiva sobrenatural
Pontos de Vida 420
Deslocamento 12m (8q)
Corpo a Corpo Ataque desarmado x3 +38 (2d8+40, 19/x3).
À Distância Balestra explosiva x2 +38 (2d12+40, 18/x3, mais 6d6 fogo).
Ataque Furtivo +7d8.
Irmãos Mais Novos (Movimento) Paollus assobia e invoca 2d6+3 capangas da irmandade, que saem de becos, bueiros ou do topo de telhados e surgem em espaços desocupados em alcance médio. Eles agem a partir da próxima rodada de Paollus, têm deslocamento 9m e podem gastar uma ação padrão para causar 1d8+19 pontos de dano de corte em uma criatura adjacente. Os capangas têm For 4, Des 3, Defesa 19, 1 PV e falham automaticamente em qualquer teste oposto ou de resistência. Recarga (reduzir um inimigo a 0 ou menos PV).
Oferta Irrecusável (Completa) Com um olhar, Paollus pode descobrir o que uma pessoa mais teme e então usar isso para chantageá-la. Ele pode usar esta habilidade contra qualquer criatura em alcance curto que possa escutá-lo e compreendê-lo. Ao usá-la, Paollus faz um teste de Intimidação (+26) oposto pelo teste de Vontade da vítima. Se ele vencer, pode dar uma ordem qualquer a essa pessoa. Essa ordem será uma oferta irrecusável e a pessoa irá cumpri-la da melhor maneira que puder. Mesmo ordens extremas podem ser dadas — uma pessoa pode preferir morrer a ver sua família ser assassinada pela irmandade! No entanto, ordens extremas fornecem um bônus de +5 no teste de Vontade da vítima. Esta habilidade só pode ser usada uma vez por dia e dura uma semana, ou até a criatura executar a ordem (o que vier primeiro).
Quebrar Pernas (Padrão) Paollus faz um ataque desarmado que causa dano dobrado e, se acertar, deixa a vítima debilitada e lenta por uma semana (Fort CD 40 evita as condições).
For 7, Des 5, Con 3, Int 3, Sab 3, Car 5
Perícias Acrobacia +16, Atletismo +18, Enganação +16, Furtividade +16, Intimidação +26, Intuição +14, Investigação +16.
Equipamento Anel de proteção, balestra explosiva, virotes de adamante x20. Tesouro Padrão.`
      },
      {
        chave: "rainhaEuphana", nome: "Rainha Euphana", nd: "3", tipo: "Morta-viva (osteon) Média",
        papel: '',
        titulo: "Rainha Euphana, a Necromante",
        fontes: "Atlas de Arton",
        resumo: "Salistick, o Reino sem Deuses, era governado por quatro clãs que se revezavam no poder.",
        texto:
`Rainha Euphana ND 3
Salistick, o Reino sem Deuses, era governado por quatro clãs que se revezavam no poder. Às vezes, isso acontecia antes do previsto. Sem magia divina, mesmo monarcas sucumbiam ao contrair pestes ou cair de montarias. Foi em meio a uma destas sucessões apressadas que Euphana, da família Acetos, se viu alçada ao trono. Antes de ser coroada, teria sido revelado à jovem um segredo, que percorria sua linhagem desde a fundação do majestado — isso passou a assombrá-la. Tornou-se imprevisível, errática. Conta-se que, em certa noite, após ouvir a súplica de um escultor para que lhe permitissem estudar cadáveres, a soberana tomou uma estranha decisão. Deu o perdão real a todos os necromantes presos em sua masmorra, desde que estes aceitassem servir-lhe e compartilhassem seus conhecimentos. Ninguém sabe o que motivou o decreto, mas os estudos sobre anatomia compilados desta maneira foram cruciais quando o país recebeu refugiados da guerra civil de 1075 e, sob ordens da regente, hospitais de campanha foram estabelecidos, acolhendo feridos. Em tais lugares foram treinados os cirurgiões que, mais tarde, originaram os primeiros médicos salistienses. Apesar de seus feitos, sem apoio das Famílias Fundadoras, a Rainha Necromante, como a apelidaram seus rivais políticos, acabou deposta em um golpe, obrigada a abdicar. Uma lenda diz que antes de partir da corte, ela teria removido a própria coroa e proferido: “Venci a morte com minhas mãos, o que seguram é um adorno. Não preciso dele para cumprir a promessa de servir ao povo. E continuarei a honrá-la, para além do tempo que tal apetrecho deixar de cingir cabeças.” Este tempo finalmente parece ter chegado em Salistick, onde monarcas são agora algo obsoleto. Entrementes, noutras paragens de Arton, um grupo de aventureiros em apuros relatou ter sido salvo por uma heroína mascarada, toda vestida de branco. Pelas vestes peculiares, alegam ser a ex-rainha salistiense, ressuscitada como muitas almas durante os eventos da Flecha de Fogo. Tal figura curiosa, porém, teria recusado a ser chamada por qualquer honorífico. Alegou enigmaticamente que a missão dela em sua terra natal (qualquer essa tenha sido) já foi cumprida, e que seu trabalho agora é simplesmente ajudar outras pessoas, como médica e sábia. No fundo, o que Euphana almeja é que os demais povos artonianos alcancem o que seus antigos súditos já conquistaram.
Morta-viva (osteon) Média
Iniciativa +4, Percepção +8, visão no escuro
Defesa 21, Fort +10, Ref +3, Von +15, redução de corte, frio e perfuração 5
Pontos de Vida 70
Deslocamento 9m (6q)
Corpo a Corpo Bisturi x2 +15 (2d8+5 corte, 17).
Medicina Ancestral (Completa) Euphana cura 6d6 PV e uma condição prejudicial de uma criatura adjacente. Ela pode usar esta habilidade apenas uma vez por dia em cada criatura.
For 0, Des 1, Con 3, Int 5, Sab 5, Car 3
Perícias Conhecimento +13, Cura +18, Nobreza +8.
Equipamento Bisturi (conta como uma adaga precisa e atroz), maleta de medicamentos aprimorada. Tesouro Nenhum.
Parceiro Euphana é uma parceira veterana que fornece +2 em Cura e permite que, uma vez por rodada, você gaste 2 PM para curar 4d6 PV e uma condição prejudicial de uma criatura adjacente.`
      },
      {
        chave: "ladyShivara", nome: "Lady Shivara", nd: "18", tipo: "Humanoide (humana) Média",
        papel: '',
        titulo: "Rainha-imperatriz Shivara I",
        fontes: "Trilogia da Tormenta, Guilda do Macaco",
        resumo: "“Beber vinho? Deveríamos estar lutando.",
        texto:
`Lady Shivara ND 18
“Beber vinho? Deveríamos estar lutando. Deveríamos estar bebendo o sangue deles!” — Lady Shivara O Rei Althar de Trebuck sabia que um dia sua filha teria que assumir o trono e empunhar Carthalkan, a Espada Cristalina, símbolo da família real. Assim, quando a menina completou 17 anos, seu pai a enviou em uma viagem secreta por Arton, para que, vivendo como aventureira, ela ganhasse a força e sabedoria necessárias para governar. Seis anos depois da partida da princesa, uma área de Tormenta surgiu na fronteira do reino e o monarca pereceu em meio a um ataque das hediondas forças aberrantes. Shivara retornou para clamar seu trono e reinou com justiça, conquistando o amor do povo. No entanto, a ameaça da Tormenta permanecia. Em uma longa série de acordos e manobras diplomáticas, a rainha forjou uma força militar composta por tropas de todas as nações da coalizão — o Exército do Reinado. Então, quando a tempestade avançou, corrompendo o esplendoroso Forte Amarid, ela agiu. Atacou o fenômeno de frente, liderando numerosas tropas e grandes heróis na mais épica das batalhas. E foi derrotada. Apesar disso, lutara lado a lado das tropas, ganhando o respeito de todos. Quando os minotauros invadiram o Reinado, o antigo Rei-Imperador abdicou em favor dela, única figura política unânime o bastante para liderar a coalizão dos povos em seu lugar. Durante os eventos que antecederam a Guerra Artoniana, Shivara foi capturada pelos finntroll, aliados secretos da Supremacia Purista. Foi aprisionada em Chacina, mundo de Megalokk, o Deus dos Monstros, onde enfrentou feras colossais para sobreviver e, mais do que isso, lutou contra a influência planar do lugar, que transforma seres racionais em bestas raivosas. Felizmente, com o auxílio dos heroicos Campeões de Svalas, Shivara conseguiu voltar a Arton. Retomando a liderança do Reinado, desferiu um pesado golpe contra os exércitos do Triângulo Autocrático, pondo fim ao conflito. Hoje, Shivara lidera uma aliança menor e enfraquecida, mas que ainda segue seus ideais de justiça e liberdade. Mais do que isso, por todas as suas aventuras e batalhas, a própria Rainha-Imperatriz está mais poderosa do que nunca. Alguns dizem que voltou de Chacina trazendo o Rubi da Virtude do Deus dos Monstros, que empunharia em uma manopla forjada com o mesmo cristal de sua espada. Outros, que ela voltou fisicamente mais forte de sua jornada planar. Forte demais, talvez… Como um monstro.
Humanoide (humana) Média
Iniciativa +17, Percepção +19
Defesa 60, Fort +29, Ref +24, Von +29, imunidade a encantamento, redução de dano 22, resistência a magia +5
Pontos de Vida 725
Deslocamento 6m (4q)
Corpo a Corpo Carthalkan x3 +49 (4d8+45, 16, mais 4d8 corte).
Jogo da Corte Quando faz um teste de Diplomacia, Intuição ou Nobreza, Shivara rola dois dados e usa o melhor resultado.
Orgulho (Reação) Uma vez por cena, quando faz um teste de perícia, Shivara soma o dobro de seu Carisma (+18) nesse teste.
Palavras Afiadas (Movimento) Shivara faz um teste de Diplomacia ou Intimidação oposto ao teste de Vontade de uma criatura inteligente (Int –3 ou maior) em alcance médio. Se vencer, ela causa 10d8+10 pontos de dano psíquico não letal à criatura. Se perder, causa metade desse dano. Se a criatura for reduzida a 0 ou menos PV, em vez de cair inconsciente, ela se rende (se Shivara usou Diplomacia) ou fica apavorada e foge da maneira mais eficiente possível (se usou Intimidação).
Presença Aristocrática (Reação) Quando uma criatura com um valor de Inteligência tenta machucar Shivara, essa criatura deve fazer um teste de Vontade (CD 48). Se falhar, não conseguirá machucá-la e perderá a ação. Shivara só pode usar esta habilidade uma vez por criatura na mesma cena.
Soberana Majestosa (Movimento) A voz de Shivara inspira aliados e apavora inimigos. Quando usa esta habilidade, ela escolhe uma das opções a seguir. Esta habilidade só pode afetar uma mesma criatura uma vez por dia.
• Assombro. Todos os inimigos em alcance médio fazem um teste de Vontade (CD 48). Aqueles que falharem ficam abalados. Aqueles que falharem por 5 ou mais ficam pasmos por 1d4 rodadas e então abalados.
• Devoção. Até o fim da cena, todos os aliados em alcance médio recebem +5 em testes de perícia e 2d6 pontos de mana temporários.
For 5, Des 3, Con 5, Int 4, Sab 5, Car 9
Perícias Atletismo +20, Cavalgar +18, Diplomacia +29, Guerra +19, Intimidação +29, Intuição +20, Nobreza +24.
Equipamento Armadura completa delicada de mitral guardiã invulnerável, Carthalkan, Coroa Imperial, escudo pesado abascanto guardião, Rubi da Virtude de Megalokk.
Tesouro Dobro.`
      },
      {
        chave: "molossoDeheoni", nome: "Molosso deheoni", nd: "2", tipo: "Animal Grande",
        papel: '',
        resumo: "Resultado de cruzamentos entre várias raças domésticas trazidas de Lamnor na Caravana dos Exilados, o molosso deheoni é um cão enorme, desti",
        texto:
`Molosso deheoni ND 2
Resultado de cruzamentos entre várias raças domésticas trazidas de Lamnor na Caravana dos Exilados, o molosso deheoni é um cão enorme, destinado a proteger as habitações dos colonos e auxiliar em caçadas. Acabaria se tornando exímio no combate a serpentes, sendo resistente a seu veneno e hábil em rastreá-las. Essa perícia se tornaria valiosa mais tarde durante a inquisição contra os sszzaazitas, uma vez que o molosso podia farejá-los através de seus disfarces. Nos dias de hoje, o cão é popular como animal de guarda não apenas em aldeias e fazendas, mas também templos, palácios e quaisquer lugares onde devotos do Deus da Traição poderiam se infiltrar. Shivara possui um molosso deheoni como animal de estimação e é comum ver o cachorro deitado perto do trono durante sessões da corte. Dizem que o molosso da Rainha-Imperatriz possui a capacidade de se transformar em um gigantesco lagarto-trovão, mas isso pode ser apenas fofoca de criados impressionáveis.
Animal Grande
Iniciativa +4, Percepção +8, faro, visão na penumbra
Defesa 34, Fort +14, Ref +6, Von +3, resistência a veneno +5
Pontos de Vida 80
Deslocamento 12m (8q)
Corpo a Corpo Mordida +13 (2d6+11).
Farejar Traição (Reação) Quando chega em alcance curto de uma criatura ofídica (como uma serpente ou nagah) ou de um sszzaazita, o molosso deheoni faz um teste de Intuição (CD 20). Se passar, percebe qualquer intenção ruim da criatura, caso haja. Ele late em aviso, alertando qualquer aliado próximo, e recebe +2 em testes de ataque e rolagens de dano contra a criatura até o fim da cena. Esta habilidade funciona uma vez por dia contra cada criatura específica.
Investida Pesada (Completa) O molosso faz uma investida e se atira em cima do alvo, usando seu peso para derrubá-lo. O molosso faz o ataque da investida, como normal, e uma manobra derrubar, como uma ação livre.
For 6, Des 1, Con 6, Int –4, Sab 3, Car 0
Perícias Atletismo +11, Intuição +8, Sobrevivência +8.
Tesouro Nenhum.
Parceiro Um molosso é um parceiro especial (vigilante) que fornece os benefícios a seguir. Iniciante: você recebe +1 na Defesa e +2 em testes de Intuição e Percepção (contra seres ofídicos e sszzaazitas, o bônus nos testes de perícia muda para +5). Veterano: uma vez por rodada, você recebe +2d6 em uma rolagem de dano corpo a corpo. Mestre: muda o bônus na Defesa para +2 e, uma vez por rodada, quando faz uma investida, você pode fazer a manobra derrubar como uma ação livre.`
      },
      {
        chave: "rodleckLeverick", nome: "Rodleck Leverick", nd: "17", tipo: "Humanoide (hynne) Pequeno",
        papel: '',
        fontes: "Atlas de Arton",
        resumo: "Filho de mãe artesã e pai com pretensões de inventor, Rodleck Leverick nasceu e cresceu em uma das várias comunidades nas colinas do antigo",
        texto:
`Rodleck Leverick ND 17
Filho de mãe artesã e pai com pretensões de inventor, Rodleck Leverick nasceu e cresceu em uma das várias comunidades nas colinas do antigo reino de Hongari. Ao contrário da maioria dos hynne, era magro e esguio, com longos cabelos castanhos, nariz adunco e sobrancelhas arqueadas. Rodleck era atraído por enigmas e jogos. A curiosidade se transformou em ofício e ele começou a elaborar seus próprios quebra-cabeças, um mais complexo que o outro. Levava-os à taverna local e desafiava os frequentadores a solucioná-los, o que nunca acontecia. Rodleck se divertia com a sensação de superioridade. Era o hynne mais esperto da colina. Mas e se pudesse ser mais? E se fosse o hynne mais esperto do reino? O mais esperto de Arton? Ou ainda, mais esperto que os humanos, elfos, minotauros e outros? Com essa meta, Rodleck juntou suas coisas e se mudou para uma cidade humana, onde retomou seus desafios. E com igual sucesso. Mesmo ali ninguém podia solucionar seus enigmas. Ou quase ninguém. Certo dia, Rodleck notou um homem que observava o espetáculo em silêncio, mas com olhar cínico. Suspeitando ser um espertinho a provocá-lo, o hynne apresentou-lhe um quebra-cabeça, esperando ver seu fracasso. Para sua surpresa, o humano cumpriu a tarefa rapidamente e sem esforço, saindo ainda com um sorriso matreiro. Iniciou-se assim a batalha dos quebra-cabeças, que durou semanas. Rodleck trazia novos enigmas, aperfeiçoava suas obras — mas o estranho vencia com facilidade. O hynne descobriu, então, que seu adversário era Hilben Calatori, um clérigo de Hyninn, o Deus da Trapaça. Fascinado, pediu para ser introduzido ao culto e iniciou seu treinamento. Tempos depois, agora clérigo, vingou-se de seu mentor com um último quebra-cabeça — um cubo mecânico que, ao ser resolvido, revelou lâminas que amputaram os dedos de Hilben. A fama do engenhoso hynne logo chegou a Lorde Filthen, um nobre entediado, que sonhava construir a masmorra mais mortal de Arton. Rodleck foi secretamente convidado a projetar um enorme complexo, repleto de armadilhas em suas câmaras e corredores. Dois anos depois, ao concluir sua obra, Rodleck enganou e matou seu empregador. Tomou o controle do labirinto, que batizou de Catacumbas de Leverick, e passou a atrair aventureiros para a masmorra, divertindo-se com suas mortes e tomando seus tesouros. Mas e se pudesse ser mais? E se fosse o mais esperto dos clérigos? E se fosse o sumo-sacerdote? Severus, na época o clérigo máximo de Hyninn, era vítima de uma poderosa maldição. Através de um plano intrincado, Rodleck plantou rumores e boatos sobre uma possível cura. Como resultado, o sacerdote acabou enganado e prisioneiro das Catacumbas de Leverick, onde os engenhos mortais acabaram por pegá-lo. Impressionado, o próprio Hyninn surgiu perante o hynne e, com um aperto de mão (elétrico), proclamou Rodleck Leverick seu sumo-sacerdote. Foi quando as catacumbas sob domínio do vilão se expandiram quase infinitamente, conectando-se a labirintos em Arton e outros mundos, graças a um fenômeno conhecido como “espaço de masmorra”. Entretanto, surgem rumores sobre o interesse de outras forças neste labirinto infindável, indicando que um dia até mesmo este astuto hynne poderá ser passado para trás. Rodleck empregou os últimos anos atraindo aventureiros cada vez mais poderosos para as Catacumbas — atualmente vastas como um mundo, com diversas populações residentes de humanoides e monstros. Entradas e armadilhas ocultas em toda Arton conduzem exploradores incautos ao labirinto mortal. A fortuna de Rodleck é incalculável, comparável ao tesouro de grandes dragões (na verdade, alguns deles habitam a masmorra). Uma legião de ladinos, assassinos, clérigos e outros devotos de Hyninn está a seu serviço. Rodleck confia que mesmo heróis lendários seriam vencidos por sua engenhosidade. Ele é, hoje, um dos maiores vilões de Arton. Mas e se pudesse ser mais…?
Humanoide (hynne) Pequeno
Iniciativa +20, Percepção +19
Defesa 52, Fort +17, Ref +30, Von +24, cura acelerada 5, esquiva sobrenatural, evasão, imunidade a adivinhação, armadilhas, efeitos mentais e de movimento, proteção divina
Pontos de Vida 560
Deslocamento 6m (4q)
Corpo a Corpo Adaga +41 (1d4+17, 18).
Armadilhas Divinas (Padrão) Combinando sua genialidade com as bênçãos de Hyninn, Rodleck prepara uma das armadilhas a seguir. A CD dos testes para encontrar, desarmar e resistir às armadilhas é 46.
• Arapucas Invisíveis. Rodleck conjura 2d4+1 arapucas que se espalham em um raio de 18m ao redor dele e constantemente mudam de posição dentro da área. Sempre que um inimigo de Rodleck se mover nessa área, deve rolar 1d20. Se o resultado for igual ou menor que o número de quadrados percorridos, a criatura ativa uma arapuca ao final do movimento; a vítima sofre 18d8 pontos de dano de um tipo à escolha de Rodleck e fica paralisada por 1 rodada (Ref reduz o dano à metade e evita a condição). Cada arapuca permanece na área até ser ativada ou até o fim da cena. Recarga (todas as arapucas serem ativadas).
• Alçapão Dimensional. Rodleck prepara um alçapão dimensional que o acompanha até o fim da cena ou até ser ativado. Quando uma criatura erra um ataque corpo a corpo contra Rodleck, ele pode ativar o alçapão para enviá-la a um semiplano protegido contra teletransporte e viagens planares (Von evita). A criatura permanece nessa dimensão até o fim da cena ou até escapar; fazer isso requer gastar uma ação padrão e passar em um teste de Inteligência (CD 20). Se passar, a criatura retorna para seu espaço original ou, se isso não for possível, para um espaço adjacente desocupado. Uma criatura só pode ser afetada por esta habilidade uma vez por cena. Minotauros são imunes ao alçapão.
• Artimanha Mística. Rodleck prepara uma armadilha pessoal, contendo uma magia divina ou de ilusão de até 5º círculo, que permanece até o fim da cena ou até ser ativada. Quando um inimigo em alcance curto falha em um teste de perícia, Rodleck pode ativar a armadilha para lançar a magia instantaneamente, como um clérigo de Hyninn de 17º nível, sem gastar PM (limite de PM 22).
• Gerador de Ilusões. Rodleck cria uma ilusão que ocupa um cubo de 90m com duração sustentada. Quando a armadilha é ativada, cada criatura na área deve fazer um teste de Vontade; se falhar, acredita que a ilusão é real e sofre 12d6 pontos de dano psíquico não letal. Cada criatura que começar seu turno dentro da área e acreditar na ilusão deve repetir o teste de Vontade.
Ataque Furtivo +6d6.
Forma de Macaco (Completa) Uma vez por cena, Rodleck se transforma em um macaco. Ele adquire tamanho Minúsculo (+5 em Furtividade e –5 em testes de manobra) e recebe deslocamento de escalada 9m. Seu equipamento desaparece (e ele perde seus benefícios) até ele voltar ao normal, mas suas outras estatísticas não são alteradas. A transformação dura indefinidamente, mas termina caso ele faça um ataque, lance uma magia ou sofra dano.
Manto do Trapaceiro Rodleck ignora todos os efeitos de qualquer ataque contra ele em que o resultado do d20 de ataque seja um valor ímpar.
Punição Divina (Padrão) Vont CD 46 evita.
Sorte Salvadora (Reação) Uma vez por rodada, Rodleck pode rolar novamente um teste de resistência.
For 0, Des 4, Con 1, Int 6, Sab 5, Car 3
Perícias Acrobacia +18, Diplomacia +17, Enganação +26, Furtividade +20, Intimidação +17, Intuição +19, Investigação +20, Jogatina +24, Ladinagem +25 (+27 para abrir fechadura), Misticismo +20, Ofício (alquimista) +20, Ofício (armadilheiro) +25, Religião +19.
Equipamento Adaga precisa dançarina formidável, anel da regeneração, anel do escudo mental, bola de cristal, dois instrumentos de Ofício (alquimista e armadilheiro) aprimorados, gazua aprimorada, símbolo sagrado de Hyninn. Tesouro Triplo.`
      },
      {
        chave: "senhorPorrada", nome: "Senhor Porrada", nd: "–", tipo: "Humanoide (meio-orc) Médio",
        papel: '',
        fontes: "Guilda do Macaco, Legado do Ódio",
        resumo: "Criado num bando orc, Syphos nunca conheceu seus pais.",
        texto:
`Senhor Porrada ND –
Criado num bando orc, Syphos nunca conheceu seus pais. Tudo que lembra é que, assim que teve idade para erguer uma picareta, foi atirado para trabalhar nas galerias de uma mina. Sua força física fez com que subisse na hierarquia de seu bando: de minerador, tornou-se guerreiro. Mas o destino lhe reservava mais. Em um ataque a uma cidade do Reinado, foi capturado por um fánatico de Keenn. O homem viu potencial no jovem meio-orc e, em vez de matá-lo, resolveu doutriná-lo no caminho do antigo Deus da Guerra. O que não necessariamente foi uma opção melhor. Certo dia, o acólito ficou de saco cheio com os abusos do mestre e finalmente o matou. Mas a essa altura, já era um devoto. Sozinho, vagou pelos reinos até chegar onde hoje é a Supremacia Purista. Numa nação guerreira, achou que seria bem recebido, mas não contava com o ódio dos humanos. Segregado, ergueu sozinho uma capela ao seu deus nos ermos. Lá teria ficado, não fosse um encontro fortuito com os Campeões de Svalas, heróis cujo caminho cruzou algumas vezes. Juntos, recuperaram uma poderosa — e perigosa — arma. Para evitar que o item caísse em mãos erradas, Syphos ficou com ele e vagou para os confins da civilização. Desde então, o deus de Syphos foi morto e substituído por outro. Apesar disso, o clérigo não se deu ao trabalho de mudar suas preces. Pois, ao longo da vida, aprendeu uma coisa: quem precisa de deuses franzinhos quando você pode resolver seus problemas com… PORRADA?
Humanoide (meio-orc) Médio
Iniciativa +9, Percepção +11 (+13 em subterrâneo), visão no escuro
Defesa 41, Fort +24, Ref +18, Von +11, imunidade a medo
Pontos de Vida 650
Deslocamento 6m (4q)
Corpo a Corpo Martelo de guerra x2 +35 (3d10+50, x4).
À Distância Artefato de Cross +39 (2d12+26, 19/x3).
Duro de Dar Porrada (Reação) Uma vez por cena, quando sofre dano de um ataque ou uma habilidade que reduziria seus PV a 0 ou menos, Sr. Porrada ignora esse dano.
Porrada Avassaladora (Livre) Quando acerta um ataque de martelo, Sr. Porrada arremessa a vítima 1d6 x 1,5m em uma direção à escolha dele (Fort CD 31 evita). A vítima fica caída e, se atingir algum obstáculo, sofre 1d6 pontos de dano de impacto para cada 1,5m que foi arremessada.
Porrada Progressiva (Livre) Quando reduz os pontos de vida de um oponente a 0 ou menos, Sr. Porrada recebe um bônus cumulativo de +1d10 em rolagens de dano até o fim da cena.
For 6, Des 0, Con 6, Int –1, Sab 2, Car –2
Perícias Atletismo +15, Intimidação +15.
Equipamento Armadura completa reforçada, Artefato de Cross, martelo de guerra maciço de adamante, símbolo sagrado de Keenn. Tesouro Nenhum.`
      },
      {
        chave: "senhoraDosEspinhos", nome: "Senhora dos Espinhos", nd: "–", tipo: "Humanoide (humana) Média",
        papel: '',
        fontes: "Atlas de arton",
        resumo: "Aigrah Vento Leste fazia parte da Ordem do Bosque de Allihanna, o principal círculo druídico do reino de Tollon.",
        texto:
`Senhora dos Espinhos ND –
Aigrah Vento Leste fazia parte da Ordem do Bosque de Allihanna, o principal círculo druídico do reino de Tollon. Tendo viajado por boa parte do Reinado, ganhou o epíteto ainda muito jovem. Ao voltar, encontrou o bosque sob ataque do Império de Tauron. Viu o pai — líder da ordem — ser morto pelos legionários. Trespassada por uma lança, arrastou-se até o Coração de Allihanna, o artefato que os druidas protegiam, e fez uma última súplica à deusa. O item fez o próprio bosque se voltar contra os minotauros, derrotando-os. Nascia uma nova ordem, abraçando a brutalidade da natureza: a Ordem dos Espinhos. Aigrah, agora a Senhora dos Espinhos, jurou devolver a Floresta de Tollon aos dias antigos, custe o que custar.
Humanoide (humana) Média
Iniciativa +7, Percepção +15, visão na penumbra
Defesa 39, Fort +20, Ref +12, Von +26, cura acelerada 10, imunidade a atordoamento, efeitos de metabolismo e sangramento, redução de dano 10
Pontos de Vida 385
Deslocamento 9m (6q), ignora terreno difícil natural
Pontos de Mana 77
Corpo a Corpo Duas garras do bosque +34 (2d8+18 corte, mais sangramento).
Coração de Allihanna O coração na Senhora dos Espinhos é uma fonte de poder primal e instável. A cada rodada de combate, Aigrah recebe 1 ponto de ferocidade. No início de cada turno dela, há 10% de chance por ponto de ferocidade de ocorrer uma manifestação do Coração (as manifestações são cumulativas, ocorrem em ordem e não afetam Aigrah).
• Primeira Manifestação. O Coração passa a emitir uma aura de crescimento vegetal com 30m de raio. Dentro dela o terreno se torna difícil, e criaturas em seu interior ficam enredadas e imóveis (Ref CD 35 evita). Uma vítima pode se libertar com uma ação padrão e um teste de Acrobacia ou Atletismo.
• Segunda Manifestação. A aura gera pulsos de energia primal. Cada criatura que começa seu turno dentro da aura é atingida por um desses pulsos, que pode curar 6d6 pontos de vida ou causar 6d6 pontos de dano de fogo (50% de chance cada; Ref CD 35 reduz à metade).
• Terceira Manifestação. Os efeitos se intensificam. A vegetação se torna espinhosa; deslocar-se dentro da área causa 1d4 pontos de dano de perfuração por quadrado percorrido. Além disso, descargas elétricas passam a se formar dentro da área; cada criatura que comece seu turno dentro da aura sofre 8d6 pontos de dano de eletricidade e fica ofuscada por 1 rodada (Ref CD 35 reduz à metade e evita a condição).
Empatia Selvagem Aigrah pode se comunicar com animais por meio de linguagem corporal e vocalizações. Ela pode usar Adestramento para mudar atitude e pedir favores de animais.
Evocar a Força da Natureza (Livre) Uma vez por rodada, Aigrah pode receber 1 ponto de ferocidade para executar uma ação padrão adicional em seu turno.
Garras do Bosque Uma criatura atingida pelas garras mágicas de Aigrah fica sangrando e, enquanto estiver com esse sangramento, é considerada em condição difícil para lançar magias.
Magias Como uma druida de Allihanna de 12º nível (CD 35, limite de PM 17). Suas escolas conhecidas são convocação, evocação e transmutação.
• Curar Ferimentos (Padrão, 12 PM) Uma criatura adjacente cura 12d8+12 PV ou criaturas escolhidas em alcance curto curam 7d8+7.
• Primor Atlético (Movimento, 2 PM) Aigrah salta e pousa em alcance corpo a corpo de uma criatura em alcance curto. Se fizer um ataque corpo a corpo contra essa criatura nesse mesmo turno, ela recebe os benefícios e penalidades de uma investida e causa um dado extra de dano do mesmo tipo com esse ataque.
• Sopro das Uivantes (Padrão, 12 PM) Criaturas em um cone de 9m sofrem 10d6 pontos de dano de frio e, se forem Grandes ou menores, ficam caídas e são empurradas 6m na direção oposta. Se houver uma parede ou outro objeto sólido (mas não uma criatura) no caminho, a criatura para de se mover, mas sofre +2d6 pontos de dano de impacto (Fort reduz à metade e evita a condição e o empurrão).
• Velocidade (Padrão, 3 PM, sustentada) Aigrah pode executar uma ação padrão adicional por turno, que não pode ser usada para lançar magias.
For 2, Des 1, Con 6, Int 2, Sab 5, Car 3
Perícias Adestramento +13, Atletismo +12, Cura +15, Furtividade +11, Intimidação +13, Misticismo +12, Religião +15, Sobrevivência +15.
Equipamento Capa pesada, dedo de ente, maleta de medicamentos, símbolo sagrado de Allihanna. Tesouro Padrão.`
      },
      {
        chave: "shiroNomatsu", nome: "Shiro Nomatsu", nd: "14", tipo: "Humanoide (humano) Médio",
        papel: '',
        fontes: "Império de Jade",
        resumo: "O clã Nomatsu sempre foi leal a Tamu-ra, servindo sua pátria por gerações na corte imperial.",
        texto:
`Shiro Nomatsu ND 14
O clã Nomatsu sempre foi leal a Tamu-ra, servindo sua pátria por gerações na corte imperial. Mas Shiro, o rebento mais jovem, virou as costas para as amarras desta sociedade. Ainda criança, partiu em busca de aventura no continente, viajando clandestino a bordo de um navio. Fez célebres e poderosos amigos. Acumulou tesouros. Em uma de suas jornadas, derrotou um déspota nas Uivantes. Ao findar da batalha, deparou-se com um tamuraniano à beira da morte entre os prisioneiros libertos. Um homem que lhe perguntou se as cerejeiras ainda floresciam em sua terra. O encontro fez Shiro refletir profundamente sobre suas raízes. Ao tomar a decisão de regressar, porém, descobriu ser tarde demais. Vieram as notícias de que o Império de Jade fora devorado pelas abominações da Tormenta, no primeiro ataque da tempestade ao mundo de Arton. Ele então rumou para a cidade de Valkaria, onde encontrou o que restava de seu povo, reduzido a um único enclave — teletransportado até ali pelo esforço do Imperador Tekametsu. Último sobrevivente de seu clã, Shiro Nomatsu emergiu como daimyo e sumo-sacerdote do deus Lin-Wu, guiando seu povo no exílio, tomando para si a missão de preservar as tradições tamuranianas. Quando o imperador milagrosamente renasceu, Nomatsu tornou-se sua sombra, seu guardião mais poderoso e leal. Vagaram pelos reinos, recrutando aventureiros para varrer de vez os resquícios da Tempestade Rubra, ainda assombrando sua ilha natal. Apesar dos desafios, permanece firme em seu propósito de ser o guardião de Tamu-ra.
Humanoide (humano) Médio
Iniciativa +22, Percepção +17
Defesa 45, Fort +22, Ref +14, Von +28, fortificação 50%, imunidade a medo, proteção divina
Pontos de Vida 510
Deslocamento 6m (4q)
Pontos de Mana 164
Corpo a Corpo Katana x2 +37 (2d10+35, 15, mais 6d12 luz).
Iaijutsu Shiro Nomatsu pode sacar ou guardar armas como uma ação livre. Além disso, quando faz um teste de Iniciativa para agir, para cada 10 pontos no resultado desse teste, recebe +1 no ataque e +1d6 no dano de seu primeiro ataque com arma em seu primeiro turno.
Kiai Divino Superior (Livre, 2 PM) Uma vez por rodada, quando faz um ataque corpo a corpo, Shiro desfere um poderoso grito de kiai. Ele recebe +5 na margem de ameaça desse ataque e, se acertá-lo, causa dano máximo.
Magia Acelerada (Livre, +4 PM) Uma vez por rodada, quando lança uma magia com execução de ação completa ou menor, Shiro muda a execução dela para livre.
Punição Divina (Padrão) Von CD 40 evita.
Magias Como um clérigo de Lin-Wu de 9º nível (CD 40, limite de PM 13).
• Comando (Padrão, 2 PM) No início do seu próximo turno, uma criatura em alcance curto larga os itens que está segurando e não pode pegá-los novamente até o início de seu turno seguinte (Von evita).
• Curar Ferimentos (Padrão, 13 PM) Uma criatura adjacente cura 14d8+14 PV ou criaturas escolhidas em alcance curto curam 9d8+9.
• Dispersar as Trevas (Padrão, 8 PM) Shiro faz um teste de Religião. Todas as magias de até 3º círculo com CD igual ou menor que o resultado em uma esfera de 6m ao redor de Shiro são dissipadas. Além disso, aliados na área recebem +5 em testes de resistência e redução de trevas 10 até o fim da cena e inimigos na área ficam cegos por 1d4 rodadas (apenas uma vez por cena).
• Raio Solar (Padrão, 9 PM) Criaturas em uma linha de 30m sofrem 7d8 pontos de dano de luz (ou 7d12, se forem mortos-vivos) e ficam ofuscadas por 1 rodada (Ref reduz à metade e evita a condição).
For 3, Des 5, Con 2, Int 2, Sab 4, Car 3
Perícias Atletismo +14, Cavalgar +16, Diplomacia +14, Guerra +13, Intimidação +16, Intuição +15, Misticismo +13, Nobreza +13, Religião +22.
Equipamento Armadura completa delicada fortificada, elmo do teletransporte, katana equilibrada harmonizada (Grito de Kiai Superior, já contabilizada) precisa magnífica, manto eclesiástico aprimorado, símbolo sagrado de Lin-Wu.
Tesouro Padrão.`
      },
      {
        chave: "sirAlennToren", nome: "Sir Alenn Toren", nd: "19", tipo: "Humanoide (humano) Médio",
        papel: '',
        titulo: "Sir alenn toren Greenfeld",
        fontes: "O Crânio e o Corvo, Guilda do Macaco",
        resumo: "Imediatamente reconhecível devido a sua armadura dourada e seu tapa-olho, Alenn Toren é o Alto Comandante da Ordem da Luz, sumo-sacerdote de",
        texto:
`Sir Alenn Toren ND 19
Imediatamente reconhecível devido a sua armadura dourada e seu tapa-olho, Alenn Toren é o Alto Comandante da Ordem da Luz, sumo-sacerdote de Khalmyr, o Deus da Justiça, e um dos maiores heróis do Reinado e de Arton. Natural dos Ermos Púrpuras, foi um herói e um flagelo em sua juventude, liderando sua tribo em escaramuças contra estrangeiros e clãs inimigos. Lendas contam como o antigo Alto Comandante, Philipp Donovan, teria convencido Alenn Toren a se juntar à Ordem após uma competição em que litros de aguardente foram consumidos e bestas foram nocauteadas com cabeçadas. A verdade é igualmente lendária: Donovan e Alenn Toren se encontraram por acaso e lutaram durante dias, até que algo inesperado aconteceu — Donovan se rendeu, pedindo que o outro lhe ensinasse sobre combate… e sobre honra. Antes de se despedir, na fronteira de Bielefeld, ambos rezaram a Khalmyr e seguiram seus caminhos. Meses depois, Alenn Toren se apresentou à Ordem, pois ouvira o chamado divino. Portou-se de maneira exemplar e, chocando os nobres mais preconceituosos, sagrou-se cavaleiro com rapidez surpreendente. Mais surpreendente ainda, foi apontado como Alto Comandante no último ato de Donovan antes de morrer. Foi um dos responsáveis pela renovada glória da Ordem da Luz, tendo participado de eventos históricos e ascendendo a sumo-sacerdote. Alenn Toren nunca foi derrotado, nunca errou em um julgamento, nunca se desviou dos ideais da cavalaria. É corretamente conhecido como o melhor cavaleiro do mundo. Talvez de todos os tempos.
Humanoide (humano) Médio
Iniciativa +18, Percepção +18
Defesa 65, Fort +36, Ref +22, Von +30, esquiva sobrenatural, imunidade a medo, proteção divina, redução de dano 15, resistência a magia +5
Pontos de Vida 860
Deslocamento 12m (8q)
Corpo a Corpo Lâmina da Luz x3 +52 (3d12+48, 17/x3, mais 3d12 luz).
Cavaleiro Veterano Sir Alenn Toren passa automaticamente em testes de Cavalgar para não cair da montaria e, quando faz uma investida montada, causa o dobro do dano e pode continuar se movendo depois do ataque. Ele deve se mover em linha reta e seu movimento máximo ainda é o dobro do seu deslocamento.
Corcel de Batalha Sir Alenn Toren cavalga um cavalo de batalha (veja Tormenta20, p. 262). Enquanto ele estiver montado, seu deslocamento se torna 15m, ele recebe duas ações de movimento extras por turno (apenas para se deslocar), +2 nos testes de ataque e +1d6 nas rolagens de dano de seus ataques corpo a corpo.
Fúria Disciplinada (Livre) Uma vez por cena, sir Alenn Toren entra em uma fúria controlada por 2 rodadas. Nesse estado ele fica imune a efeitos mentais, causa dano dobrado e reduz todo dano sofrido por ele à metade.
Punição Divina (Padrão) Von CD 45 evita.
Resoluto (Livre) Uma vez por rodada, sir Alenn Toren refaz um teste de resistência contra uma condição (como enfeitiçado, paralisado etc.) que o esteja afetando. O segundo teste recebe um bônus de +5 e, se ele passar, cancela o efeito. Alenn Toren só pode usar esta habilidade uma vez por efeito.
Ordens Avançadas (Movimento) Sir Alenn Toren grita ordens para seus aliados em alcance médio. Eles recebem +5 em testes de perícia até o fim da cena.
Trespassar (Livre) Quando sir Alenn Toren faz um ataque corpo a corpo e reduz os pontos de vida do alvo para 0 ou menos, pode realizar um ataque adicional contra outra criatura dentro do seu alcance.
For 7, Des 3, Con 6, Int 2, Sab 3, Car 4
Perícias Atletismo +22, Cavalgar +18, Diplomacia +19, Guerra +22, Nobreza +17, Sobrevivência +17.
Equipamento Armadura da Luz, Lâmina da Luz, símbolo sagrado de Khalmyr. Tesouro Padrão.`
      },
      {
        chave: "sirrannamena", nome: "Sirrannamena", nd: "17*", tipo: "Humanoide (humana) Média",
        papel: '',
        titulo: "Sirrannamena, A rainha barda",
        fontes: "Atlas de Arton, Segredos de Arton",
        resumo: "Uma das primeiras heroínas humanas, Sirrannamena nasceu na Cidade Dourada de Nhardmaran, civilização primordial na costa do continente sul.",
        texto:
`Sirrannamena ND 17*
Uma das primeiras heroínas humanas, Sirrannamena nasceu na Cidade Dourada de Nhardmaran, civilização primordial na costa do continente sul. A cidadela-estado era ciclicamente destruída pelo deus-monstro K’Athanoa. Devastada de novo e de novo, era incapaz de preservar o próprio conhecimento, regredindo a cada ataque. Sirrannamena, sua rainha, esforçava-se por preservar a cultura nhardmar, mas só podia contar com sua maior arma: a voz. Dotada de uma voz que tecia encantamentos capazes de acalmar os monstros mais selvagens, emergiu como um farol de esperança. Expulsou K’Athanoa de volta ao leito do oceano, salvando a cidade, mas não sem antes ser ferida no pescoço e perder a própria voz. Incapaz de falar, não poderia transferir seu conhecimento para a próxima geração. Diante disso, empenhou-se para buscar respostas. Sua devoção a Tanna-Toh, a Deusa do Conhecimento, a levou em uma jornada épica, da qual retornou com um pergaminho sussurrante contendo o dom da escrita. Comprometida em garantir que o conhecimento resistisse às vicissitudes do tempo, a rainha ergueu templos dedicados ao saber, escolas e bibliotecas. Porém, seu legado também daria frutos amargos. A mistura de conhecimento com ambição humana geraria tiranos… E a semente de um império.
Humanoide (humana) Média
Iniciativa +17, Percepção +19
Defesa 50, Fort +18, Ref +24, Von +30
Pontos de Vida 450
Deslocamento 9m (6q)
Pontos de Mana 143
Corpo a Corpo Espada longa x3 +47 (2d8+20, 18).
Magias Como uma conjuradora arcana de 17º nível (CD 45, limite de PM 25).
• Acalmar Animal (Padrão, 6 PM) Um animal, espírito ou monstro em alcance curto fica prestativo em relação a Sirrannamenna (Von anula; um alvo envolvido em combate recebe +5 em seu teste de resistência).
• Arma Mágica (Padrão, 14 PM) Até o fim da cena, uma arma adjacente se torna mágica, fornecendo +5 nos testes de ataque e rolagens de dano e +2d6 pontos de dano de fogo. Sirrannamenna usa Carisma em vez de Força nos testes de ataque com ela (ataque total +57).
• Camuflagem Ilusória (Padrão, 6 PM, sustentada) Sirrannamenna recebe camuflagem.
• Curar Ferimentos (Padrão, 19 PM) Uma criatura adjacente cura 20d8+20 PV ou criaturas escolhidas em alcance curto curam 15d8+15.
• Oração (Padrão, 22 PM, sustentada) Sirrannamenna e seus aliados em alcance médio recebem +5 em testes de perícia e rolagens de dano, e todos os inimigos no alcance sofrem –5 em testes de perícia e rolagens de dano.
• Pele de Pedra (Padrão, 9 PM) Sirrannamenna recebe redução de dano 10 até o fim da cena.
• Raio Polar (Padrão, 25 PM) Uma criatura em alcance médio sofre 20d8 pontos de dano de frio e fica presa em um bloco de gelo (paralisada; Fort reduz à metade e evita a condição). É possível quebrar o gelo para libertar a criatura presa: o bloco tem 20 PV, RD 10 e é vulnerável a fogo. Uma criatura presa pode gastar uma ação completa para fazer um teste de Atletismo; cada vez que passar no teste causa 10 pontos de dano ao bloco, ignorando a RD.
• Toque Chocante (Padrão, 25 PM) Sirrannamenna faz um ataque corpo a corpo. Se acertar, além do dano normal, causa 24d8+24 pontos de dano de eletricidade.
Voz Mítica (Movimento) Sirrannamenna começa a entoar uma canção mágica. Enquanto continuar cantando, uma vez por rodada pode lançar uma de suas magias como uma ação livre e sem gastar PM, e pode manter uma segunda magia sustentada, sem pagar PM por ela. É possível impedi-la de cantar agarrando-a e então vencendo outro teste de manobra para cobrir a boca dela (ou então com um efeito como a magia Silêncio).
For 2, Des 3, Con 3, Int 5, Sab 5, Car 7
Perícias Acrobacia +17, Atletismo +16, Atuação +31, Conhecimento +19, Diplomacia +21, Furtividade +17, Guerra +21, Intuição +19, Investigação +19, Misticismo +19, Nobreza +19, Religião +19, Sobrevivência +19.
Equipamento Espada longa precisa magnífica trovejante.
Tesouro Padrão. *Antes de perder sua voz para K’Athanoa.`
      },
      {
        chave: "sislachNarsogg", nome: "Sislach Narsogg", nd: "15", tipo: "Morto-vivo (osteon) Grande",
        papel: '',
        fontes: "Atlas de Arton",
        resumo: "De voz grave e retumbante, este osteon gigantesco conduz os assuntos diplomáticos de Aslothia.",
        texto:
`Sislach Narsogg ND 15
De voz grave e retumbante, este osteon gigantesco conduz os assuntos diplomáticos de Aslothia. Traja tecidos pesados e luxuosos, repletos de estampas multicoloridas. Sobre as vestes, cobre-se de colares, pulseiras e outros adereços — grande parte dos quais guardada como lembrança de suas vítimas. Seu rosto está sempre coberto por uma máscara dourada, moldada na forma da face de uma mulher jovem, gentil e sorridente. Isto é um contraste com o terror que causa quando chega a uma vila com seus passos lentos e ritmados, e acompanhado de uma comitiva de esqueletos: criminosos, rebeldes e opositores políticos, vítimas de suas longas torturas e que o obedecem completamente. Uma de suas técnicas mais reconhecidas é trazer de volta do túmulo cadáveres horrendamente ressuscitados dos familiares ou amigos de seus alvos. Ninguém sabe sua história antes de retornar da morte. A única pista vem da arma que carrega, um montante chamado Avir, detentor de poderes necromânticos, cuja lâmina foi fabricada utilizando o fêmur daquela que um dia foi sua própria irmã.
Morto-vivo (osteon) Grande
Iniciativa +13, Percepção +14, visão no escuro
Defesa 48, Fort +28, Ref +15, Von +22, redução de corte, perfuração e frio 5
Pontos de Vida 535
Deslocamento 9m (6q)
Pontos de Mana 95
Corpo a Corpo Avir +41 (3d6+32, 19/x3, mais 1d8 trevas).
Sacrificar Servo (Reação) Uma vez por rodada, quando sofre dano, Narsogg sacrifica um de seus retornados para reduzir esse dano a 0.
Separar a Alma (Livre) Quando acerta um ataque com Avir, Narsogg separa a alma do corpo da vítima (Fort CD 42 evita). A vítima fica incorpórea, lenta e não pode afetar o mundo material. Seu corpo permanece inconsciente e caído no mesmo espaço em que estava. Se estiver adjacente a seu corpo, a vítima pode gastar uma ação completa para retornar a ele, encerrando esses efeitos.
Séquito Macabro Sislach Narsogg está sempre acompanhado de doze retornados. Eles agem na mesma iniciativa de Narsogg, têm deslocamento 9m e podem gastar uma ação padrão para causar 2d6+3 pontos de dano de corte em uma criatura adjacente. Os retornados têm For 3, Des 1, Defesa 25 e 1 PV, são mortos-vivos e usam os valores de Narsogg com –5 para qualquer teste oposto ou de resistência. Enquanto Narsogg estiver vivo, no início de cada um de seus turnos um retornado destruído é reanimado automaticamente.
Mestre em Necromancia As magias de necromancia* de Narsogg custam –1 PM (já contabilizado) e a CD para resistir a elas aumenta em +2.
Vontade de Ferren Enquanto está em Aslothia, Narsogg pode realizar uma ação padrão adicional a cada rodada.
Magias Como um mago de 15º nível (CD 43, limite de PM 16).
• Amedrontar* (Padrão, 9 PM) Criaturas à escolha de Narsogg em alcance curto ficam apavoradas por 1d4+1 rodadas e depois abaladas (Von reduz para abalada).
• Ferver Sangue* (Padrão, 11 PM, sustentada) Narsogg faz o sangue de uma criatura em alcance curto entrar em ebulição. Quando a magia é lançada, e no início de cada um de seus turnos, o alvo sofre 7d8 pontos de dano de fogo e fica enjoado por 1 rodada (Fort reduz à metade e evita a condição). Se o alvo passar em dois testes de Fortitude seguidos, dissipa a magia. Se o alvo for reduzido a 0 PV pelo dano desta magia, seu corpo explode, matando-o e causando 6d6 pontos de dano de fogo em todas as criaturas a até 3m (Ref reduz à metade). Não afeta criaturas sem sangue, como construtos ou mortos-vivos.
• Tentáculos de Trevas* (Padrão, 15 PM) Até o fim da cena, tentáculos surgem em uma esfera de 9m em alcance médio e tentam agarrar todas as criaturas na área. Ao lançar a magia e no início de cada um de seus turnos, Narsogg faz um teste da manobra agarrar (usando Misticismo) contra cada criatura na área. Se ele passar, a criatura é agarrada; se já está agarrada, é esmagada, sofrendo 12d6+12 pontos de dano de trevas. A área conta como terreno difícil e os tentáculos são imunes a dano.
• Toque Vampírico* (Padrão, 16 PM) Narsogg faz um ataque com Avir. Se acertar, além do dano normal, causa 18d6+16 pontos de dano de trevas e recupera metade desse dano de trevas em pontos de vida.
For 6, Des 0, Con 5, Int 5, Sab 1, Car 2
Perícias Atletismo +19, Diplomacia +15, Enganação +17, Intimidação +23, Misticismo +20, Nobreza +18, Guerra +18.
EquipamentoAvir (veja p. 55), traje da corte banhado a ouro e cravejado de gemas. Tesouro Padrão.`
      },
      {
        chave: "sislachRawia", nome: "Sislach Rawia", nd: "16", tipo: "Monstro (medusa) Média",
        papel: '',
        fontes: "Atlas de Arton",
        resumo: "O braço forte de Ferren Asloth, esta medusa foi escolhida a dedo entre as fileiras de lacaios do vilão para resolver os problemas do Arquili",
        texto:
`Sislach Rawia ND 16
O braço forte de Ferren Asloth, esta medusa foi escolhida a dedo entre as fileiras de lacaios do vilão para resolver os problemas do Arquilich quando não há espaço para sutilezas. Uma figura corpulenta e musculosa, Rawia traja uma couraça de metal esverdeado, que traz gravada no peitoral uma enorme cabeça de cobra, símbolo temido no reino onde habita e além. Sempre vista montada em um gorlogg imenso que chama de Quistus, é uma combatente poderosa, carregando um arco longo e um machado de guerra. Contudo, Rawia não se prende a um estilo marcial único, sendo capaz de usar como arma tudo que estiver à mão. Sua habilidade mais conhecida e temida, porém, é a bênção dada a ela por seu mestre, como recompensa por serviços prestados em tempos anteriores à Noite da Ascensão Profana: um olhar amaldiçoado capaz de apodrecer o corpo de quaisquer seres que se coloquem em seu caminho. Para além de seu posto de sislach, Rawia também atua como líder da Companhia das Serpentes, grupo formado por mercenárias extremamente leais, e no qual suas três filhas — Vethara, Calitha e Basthara — atuam como tenentes. Graças aos privilégios que detém na corte, Rawia tem o direito de convocar compulsoriamente membros de qualquer outra companhia mercenária aslothiana para realizar missões a seu serviço, independentemente da periculosidade dessas tarefas. Um artifício muito utilizado para dar cabo de indivíduos indesejáveis.
Monstro (medusa) Média
Iniciativa +21, Percepção +15, visão no escuro
Defesa 50, Fort +30, Ref +24, Von +16, evasão, redução de dano 10, redução de fogo 5, resistência a veneno +5
Pontos de Vida 810
Deslocamento 9m (6q)
Corpo a Corpo Machado de batalha x3 +46 (3d6+34, 18/x3, mais veneno).
À Distância Arco longo x3 +46 (2d8+34, x3, mais sangramento e veneno).
Olhar Deteriorante (Movimento) Rawia força uma criatura em alcance curto a fazer um teste de Fortitude (CD 42). Se falhar, a criatura fica enjoada e deve repetir o teste no fim de cada um de seus turnos. A cada falha, sua condição piora para fraca, debilitada e então morta. Passar em um dos testes de Fortitude interrompe a deterioração, mas não remove as condições já sofridas. Um efeito mágico capaz de remover a condição mais recente também impede a deterioração. Uma criatura só pode ser afetada por esta habilidade uma vez por dia. Metabolismo.
Quistus Rawia cavalga Quistus, um gorlogg montaria mestre.
Enquanto Rawia está montada, seu deslocamento se torna 15m e, uma vez por rodada, ela recebe +2d8 em uma rolagem de dano corpo a corpo.
Saque Rápido Rawia pode sacar e guardar itens como uma ação livre.
Truques Mercenários Rawia conhece diversos truques de combate que ela pode usar uma vez por cena contra cada inimigo diferente.
• Areia nos Olhos (Movimento) Uma criatura adjacente fica cega por 1d4 rodadas (Ref CD 42 evita).
• Contra-Ataque Oportuno (Reação) Uma vez por rodada, quando um inimigo adjacente a Rawia erra um ataque contra ela, ela faz um ataque corpo a corpo contra esse inimigo.
• Explorar Fraqueza (Movimento) Rawia procura uma abertura nas defesas de um inimigo em alcance curto. Durante esse turno, ela recebe +5 na margem de ameaça de seus ataques contra ele.
• Jogo de Corpo (Reação) Uma vez por rodada, quando é atacada em corpo a corpo por um inimigo que a esteja flanqueando, Rawia faz um teste de Iniciativa oposto pela Percepção desse inimigo. Se ela vencer, ele ataca outra criatura que esteja flanqueando Rawia, em vez dela.
Veneno Perde 3d12 pontos de vida.
Vontade de Ferren Enquanto está em Aslothia, Rawia pode realizar uma ação padrão adicional a cada rodada.
For 3, Des 5, Con 4, Int 2, Sab 1, Car 4
Perícias Atletismo +18, Cavalgar +19, Intimidação +20, Guerra +21.
Equipamento Arco longo formidável sanguinário, couraça macabra de gelo eterno, flechas x20, machado de batalha de adamante ameaçador formidável. Tesouro Padrão.`
      },
      {
        chave: "sislachVissanzi", nome: "Sislach Vissanzi", nd: "14", tipo: "Humanoide (humana) Média",
        papel: '',
        fontes: "Atlas de Arton",
        resumo: "De todos os servos do Arquilich, esta talvez seja a mais temida.",
        texto:
`Sislach Vissanzi ND 14
De todos os servos do Arquilich, esta talvez seja a mais temida. Isso pode soar estranho para quem a vê pela primeira vez, pois Vissanzi parece apenas uma jovem de pele cinzenta, cabelo negro como a mais escura das noites e dividido em três tranças, e comportamento amistoso. Porém, essa fechada sociável esconde um fosso de conspirações e intrigas. Ela é a mestra espiã de Aslothia, viajando pelo reino em busca de informações sobre detratores, rebeldes e aventureiros que ousam se opor à vontade do regente. Para isso, se disfarça por meios arcanos e mundanos, infiltrando-se entre seus adversários e conquistando sua confiança até que revelem seus segredos. Nos períodos que passa no Castelo Erynia, está sempre ao lado do próprio Ferren, que a trata como sua principal conselheira e protetora. Nos corredores do castelo, sua origem é questionada, já que seu surgimento é recente. Alguns sussurram que ela é filha adotiva do Arquilich, ou mesmo uma filha legítima escondida durante anos para evitar ataques de seus opositores. Outros afirmam que ela é uma criatura trazida durante a Noite da Ascensão Profana, capaz de se transformar em um enorme abutre humanoide devorador de carne — algo conveniente para garantir que certos segredos permaneçam na obscuridade.
Humanoide (humana) Média
Iniciativa +15, Percepção +14, visão na penumbra
Defesa 43, Fort +14, Ref +28, Von +22, esquiva sobrenatural, evasão, imunidade a metamorfose e trevas, resistência a veneno +5
Pontos de Vida 510
Deslocamento 12m (8q), sem redução por se deslocar furtivamente
Corpo a Corpo Adaga x2 +37 (2d4+30, 16, mais 6d6 trevas, sangramento e veneno).
Assassinar (Movimento) Sislach Vissanzi analisa uma criatura em alcance curto. Até o fim de seu próximo turno, ela dobra os dados de dano extras por Ataque Furtivo em seu primeiro Ataque Furtivo que causar dano contra essa criatura.
Ataque Furtivo +7d8.
Disfarce Místico (Padrão) Vissanzi muda sua própria aparência, e a de seu equipamento, até o fim da cena, como o efeito básico da magia Disfarce Ilusório (CD 40).
Forma de Abutre (Completa) Vissanzi se transforma em um abutre humanoide. Ela adquire tamanho Grande (–2 em Furtividade e +2 em testes de manobra), recebe deslocamento de voo 12m e seus ataques mudam para corpo a corpo: mordida +37 (1d4+30 mais 6d6 trevas) e duas garras +37 (1d4+30 mais veneno). Seu equipamento desaparece até ela voltar ao normal, mas suas outras estatísticas não são alteradas. Ela pode encerrar a transformação com uma ação de movimento e reverte à forma humana caso morra ou fique inconsciente.
Mil Olhos Vissanzi está permanentemente sob efeito da magia Visão Mística com o aprimoramento que permite enxergar criaturas e objetos invisíveis.
Oportunista (Reação) Uma vez por rodada, quando um inimigo adjacente sofre dano de um dos aliados de Vissanzi, ela faz um ataque corpo a corpo contra esse inimigo.
Veneno Peçonha potente (perde 2d12 PV por rodada durante 3 rodadas, Fort CD 40 reduz para 1 rodada).
Vontade de Ferren Enquanto está em Aslothia, Vissanzi pode realizar uma ação padrão adicional a cada rodada.
For 1, Des 4, Con 3, Int 4, Sab 3, Car 5
Perícias Acrobacia +15, Conhecimento +15, Diplomacia +17, Enganação +23 (+25 para disfarces), Furtividade +20, Intimidação +16, Intuição +19, Investigação +20, Ladinagem +15 (+17 para abrir fechaduras), Misticismo +15, Nobreza +15.
Equipamento Adaga precisa ameaçadora sanguinária, capa esvoaçante aprimorada, estojo de disfarces aprimorado, gazua aprimorada. Tesouro Padrão.`
      },
      {
        chave: "stridnix", nome: "Stridnix", nd: "7", tipo: "Monstro (kallyanach) Média",
        papel: '',
        fontes: "Crônicas da Tormenta Vol. 3",
        resumo: "Uma das incontáveis filhas de Sckhar, Stridnix é a favorita do pai.",
        texto:
`Stridnix ND 7
Uma das incontáveis filhas de Sckhar, Stridnix é a favorita do pai. Vive no palácio Shindarallur, cercada de luxos e sob o olhar zeloso do Dragão-Rei. O motivo de tal atenção é que teria sido Stridnix a escolhida para conceber um filho junto do cavaleiro Lothar Algherullf, durante as negociações que levaram Sckharshantallas a se unir ao esforço derradeiro contras os puristas na Guerra Artoniana — algo decisivo na resolução do conflito. Além de ser um dos maiores heróis artonianos vivos, Lothar é cercado de rumores. Dizem que é filho bastardo da Rainha-Imperatriz Shivara. Sendo assim, seu sangue misturado à linhagem do Dragão-Rei tornaria Stridnix a mãe não apenas do herdeiro de Sckharshantallas, mas de alguém capaz de clamar o trono do próprio Reinado. Stridnix veste tecidos dignos de uma princesa, com decotes e fendas que revelam seu corpo voluptuoso, e caminha com postura altiva. Sua ascendência é evidente nos chifres dracônicos que brotam de seus cabelos cor de fogo. Mais do que isso, Stridnix é capaz de assumir a forma de um dragão — embora, por ser jovem, ainda não seja muito grande ou poderosa. Ambiciosa, intimidadora e quase tão impiedosa quanto o próprio pai na busca de seus objetivos, Stridnix não possui um papel formal na burocracia dracônica, mas ainda assim carrega poder e prestígio na corte, e é respeitada (ou temida) por todos na capital. Contudo, isso não ocorre em todo o reino. A atenção que Stridnix tem recebido de Sckhar lhe valeu a rivalidade de Khirollandra, governante da cidade de Khershandallas. Uma de suas irmãs mais velhas, Khirollandra está disposta a tudo para que a caçula não usurpe o que lhe é de direito.
Monstro (kallyanach) Média
Iniciativa +7, Percepção +9, faro, visão no escuro
Defesa 27, Fort +18, Ref +7, Von +16, imunidade a atordoamento, cansaço, fogo, metamorfose e paralisia, redução de dano 5, resistência a magia +2
Pontos de Vida 330
Deslocamento 9m (6q)
Corpo a Corpo Adaga x2 +24 (2d4+10, 19).
Forma Dracônica (Movimento) Stridnix se transforma em um dragão do fogo. Nessa forma, suas estatísticas mudam para Defesa 35; deslocamento 12m (8q), voo 18m (12q); corpo a corpo: mordida +27 (2d6+16, 19) e duas garras +27 (1d8+16, 19); For 7. Além disso, ela recebe a habilidade a seguir.
• Sopro (Padrão) Todas as criaturas em um cone de 9m sofrem 6d12+6 pontos de dano de fogo e ficam em chamas (Ref CD 26 reduz à metade e evita a condição). Recarga (movimento). Stridnix pode voltar à forma kallyanach com uma ação de movimento. Contudo, ela ainda não controla totalmente sua transformação. Se rolar 1 natural em qualquer teste enquanto estiver na forma dracônica, ela reverte à forma kallyanach no final do turno e não pode se transformar novamente na mesma cena.
For 2, Des 0, Con 4, Int 3, Sab 2, Car 5
Perícias Atuação +12, Diplomacia +12, Guerra +10, Intimidação +12, Nobreza +10. EquipamentoAdaga formidável, traje da corte. Tesouro Dobro.`
      },
      {
        chave: "tannara", nome: "Tannara", nd: "12", tipo: "Monstro (kallyanach) Média",
        papel: '',
        fontes: "Atlas de Arton",
        resumo: "Entre as geleiras das Uivantes, todos já ouviram falar desta astuta caçadora.",
        texto:
`Tannara ND 12
Entre as geleiras das Uivantes, todos já ouviram falar desta astuta caçadora. E quase todos já ouviram pelo menos um dos boatos a seu respeito. Ninguém sabe dizer ao certo de onde Tannara veio. Dizem que teria emergido de dentro das águas de um lago congelado, durante a noite, completamente nua e incólume ao frio. Empunhava um arpão feito de gelo eterno e vinha montada em imponente cavalo glacial, ostentando aura digna dos maiores campeões sagrados. Verdade ou não, ela certamente tem uma conexão especial com essas montarias e não se importa com o frio mais rigoroso. As histórias mais ousadas oferecem uma explicação para tudo isso: Tannara seria filha de Beluhga, a Dragoa-Rainha do Gelo, possuindo uma ligação intrínseca com a cordilheira e com o próprio frio. Mesmo se isso for verdade, não há sequer boatos sobre quem seria seu pai — o que levou a especulações ainda mais fantásticas de que Beluhga teria moldado a filha a partir do gelo mais antigo e profundo nas Uivantes. Tannara seria, assim, literalmente parte das montanhas. Sem qualquer explicação e por motivos incertos, a guerreira misteriosa se apresentou aos Guardiões Glaciais, protetores das Uivantes que vigiam contra caçadores de troféus e aventureiros intrometidos. Os Guardiões reconheceram algo especial nela: não apenas Tannara foi prontamente acolhida entre eles, logo passou a liderá-los. As capacidades extraordinárias e a determinação inabalável da nova líder concederam ao grupo força redobrada. Num misto de devoção a seu ambiente e a sua deusa, os Guardiões se consideram os grandes heróis das Uivantes, guias e espreitadores que travam contato com todos os povos da região, conhecem todos os monstros, descobrem todos os intrusos. Tannara é respeitada por todos que conhecem sua reputação — e temida por quase todos. Não hesita em caçar humanoides que considera nocivos às Uivantes, tratando-os como meras presas. Contudo, também ajuda aventureiros que demonstrem reverência pela região e pela dragoa. Heróis com motivos nobres podem facilmente ser acolhidos pelos Guardiões Glaciais e ver um lado descontraído e amigável de Tannara. E logo podem ser recrutados para missões a serviço da cordilheira.
Monstro (kallyanach) Média
Iniciativa +15, Percepção +13, faro, visão no escuro
Defesa 34, Fort +23, Ref +20, Von +15, imunidade a atordoamento, cansaço, frio, metamorfose e paralisia, redução de dano 5, resistência a magia +1
Pontos de Vida 590
Deslocamento 9m (6q), ignora terreno difícil natural
Corpo a Corpo Arpão* x2 +36 (2d10+29, x4, mais 2 frio).
À Distância Arco longo x2 +36 (2d8+29, 19/x3, mais 2 frio).
Emboscar (Livre) Tannara executa uma ação padrão adicional em seu turno. Ela só pode usar esta habilidade na primeira rodada de um combate.
Filha do Gelo Enquanto está em terreno ártico, Tannara recebe +6 na Defesa e nos testes de Acrobacia, Atletismo, Furtividade, Percepção e Sobrevivência, e seus ataques corpo a corpo causam +2d6 pontos de dano de frio.
Katja Tannara cavalga Katja, uma égua glacial veterana (Ameaças de Arton, p. 213). Enquanto Tannara está montada, ela recebe deslocamento de natação 12m e, uma vez por rodada, +2d8 em uma rolagem de dano corpo a corpo.
Marca da Presa (Livre) Uma vez por rodada, Tannara analisa uma criatura em alcance longo. Até o fim da cena, ela recebe +3 em testes de perícia e +1d12 em rolagens de dano contra essa criatura (o bônus em dano é dobrado contra criaturas que não sejam nativas das Uivantes).
For 4, Des 5, Con 3, Int 0, Sab 3, Car 2
Perícias Acrobacia +15, Adestramento +12, Atletismo +16, Furtividade +17 (+19 em ártico), Guerra +10, Intimidação +12, Sobrevivência +15.
Equipamento Arco longo preciso, arpão cruel maciço de gelo eterno, flechas de gelo eterno x20, gibão de peles delicado, manto camuflado (ártico). Tesouro Metade. * Veja Ameaças de Arton, p. 392.`
      },
      {
        chave: "thantallaDhaedellinn", nome: "Thantalla-Dhaedellinn", nd: "S", tipo: "Espírito Médio",
        papel: '',
        titulo: "Thantalla-Dhaedelin, A rainha das Fadas",
        resumo: "O Crânio e o Corvo Como o próprio reino que governa, a história e a figura da Rainha das Fadas, Thantalla-Dhaedelin, é cercada de lendas e mistérios.",
        texto:
`Thantalla-Dhaedellinn ND S
O Crânio e o Corvo Como o próprio reino que governa, a história e a figura da Rainha das Fadas, Thantalla-Dhaedelin, é cercada de lendas e mistérios. Uns acreditam que ela foi a primeira fada criada por Wynna, e que todas as outras nasceram de seu próprio poder, com o propósito de lhe fazer companhia. Outros afirmam que a Rainha foi criada muito depois, para colocar (alguma) ordem na Pondsmânia. Por fim, existe a teoria de que a Rainha atual foi eleita ainda criança para substituir a primeira governante ao vencer uma competição de arremesso de trevos e que, quando chegar a hora, ela própria escolherá sua sucessora da mesma forma. Thantalla realmente assumiu o trono quando era criança, mas sempre foi a Rainha das Fadas. Isso confirma a lenda de que ela passará por cinco fases: a Criança, a Guerreira, a Donzela, a Dama e a Senhora. Alguns sábios dizem que as fases são cíclicas e, ao fim da última, o processo recomeça. Outros sustentam que, após a última fase, uma nova Rainha será escolhida. Atualmente, Thantalla é a Donzela. É uma Rainha muito mais interessada nas intrigas da nobreza, em suas festas e frivolidades do que em governar. Todos os aspectos burocráticos são deixados por conta da corte — mas, na verdade, não há muito a governar. Boa parte do que acontece na Pondsmânia depende da vontade da Rainha, e o que não lhe agrada pode ser modificado com um suspiro. Thantalla tem a aparência de uma jovem de cabelos longos, com mechas verdes e negras, e olhos quase dourados. Geralmente veste roupas luxuosas, decoradas com pedras preciosas de todos os tipos. É o ser mais belo da Pondsmânia, provavelmente de Arton. Inúmeros foram os nobres que enlouqueceram de paixão ao ver seu rosto, e muitas das tragédias escritas pelos bardos passadas na Pondsmânia giram em torno desse tema. Impaciente, mimada e às vezes arrogante, Thantalla passa grande parte do tempo viajando com uma extensa comitiva. Quando resolve se estabelecer em algum lugar, cria uma pequena versão de seu castelo ou se hospeda em algum vilarejo humano. Às vezes, gosta de se divertir assumindo disfarces antes de entrar em vilas, causando inúmeras confusões. Embora pareça irresponsável, caprichosa e imatura, a Rainha costuma compensar por esses abusos. Quando parte, em geral corrige as mudanças que causou (a menos que elas pareçam muito estéticas). Deixa presentes àqueles que lhe agradaram, mas pune de forma implacável aqueles que a ofenderam de alguma forma (nem sempre evidente ao “culpado”). Também é uma exímia jogadora de xadrez, e gosta de desafiar nobres e viajantes. É costume jogar três partidas, cada uma valendo um pedido (embora o destino dos jogadores só seja decidido na última). Na fase atual, não lida muito bem com derrotas no xadrez… Thantalla-Dhaedelin tem uma rival na Pondsmânia, uma criatura oposta a ela em quase tudo: a Rainha Má, que governa Sylarwy-Ciuthnach, território sombrio dos Cyruthnallach, as fadas malignas. Alguns acreditam que essas fadas foram criadas por Tenebra, invejosa da criação de Wynna. Outros dizem que se originaram da maldade das próprias fadas. Seja como for, a Rainha Má é um reflexo de Thantalla-Dhaedelin, tendo “saído dela”. Ambas se odeiam, mas mantêm uma relação que parece a de duas irmãs rivais — ou de dois lados da mesma personalidade. Chamam uma a outra de “eu” e cada uma parece conhecer detalhes sobre a inimiga que só poderiam ser conhecidos por ela própria. Assim como tudo na Pondsmânia, não há uma explicação material e lógica para essa relação. A Rainha Má existe porque existe Thantalla, e Thantalla existe como Thantalla porque há uma Rainha Má que é sua contraparte.
Espírito Médio
Iniciativa +24, Percepção +35, visão no escuro
Defesa 70, Fort +20, Ref +30, Von +30, imunidade a encantamento, efeitos de metabolismo, ilusão e metamorfose, redução de dano 40/adamante, resistência a magia +5
Pontos de Vida 1.999
Deslocamento 9m (6q), voo 24m (16q)
Pontos de Mana 500
Corpo a Corpo Tapa +50 (1d4+5).
Beleza Inquietante Um humanoide que veja Thantalla fica fascinado, enfeitiçado e abalado (Von CD 50 evita). Uma mesma criatura só pode ser afetada por esta habilidade uma vez por dia.
Capricho (Movimento) Thantalla toca uma criatura adjacente e profere uma ordem. A criatura tocada deve fazer um teste de Vontade (CD 50). Se falhar, em seu próximo turno deve obedecer à ordem cegamente, mesmo que vá contra seus princípios ou seja uma ordem suicida! Uma mesma criatura só pode ser afetada por esta habilidade uma vez por dia. Encantamento.
Primeira de Wynna Thantalla lança magias como uma conjuradora arcana de 20º nível (CD 50, limite de PM 35), conhece todas as magias arcanas, pode lançar duas magias por ação padrão e pode manter dois efeitos sustentados simultaneamente com apenas uma ação livre (mas pagando o custo de cada um).
• Campo de Força (Reação, 11 PM) Quando sofre dano, Thantalla recebe redução de dano 70 contra esse dano.
• Chuva de Meteoros (Completa, 25 PM) Meteoros caem em um quadrado de 18m em alcance longo. Criaturas na área sofrem 25d6 pontos de dano de impacto e 25d6 pontos de dano de fogo, e ficam caídas e presas (agarradas) sob os escombros (Ref reduz à metade e evita a condição).
• Dissipar Magia (Padrão, 3 PM) Thantalla escolhe uma criatura, objeto ou esfera de 3m em alcance médio e faz um teste de Misticismo. Todas as magias nesse alvo com CD igual ou menor que o resultado do teste são dissipadas.
• Globo de Invulnerabilidade (Padrão, 15 PM, sustentada) Thantalla é envolta por uma esfera mágica de 3m que detém qualquer magia de 4º círculo ou menor.
• Miragem (Padrão, 10 PM) Muda a aparência do terreno e de todas as criaturas em um cubo de 90m de lado.
• Muralha Elemental (Padrão, 10 PM, sustentada) Cria um muro de até 30m de comprimento e 3m de altura (ou o contrário) ou uma cúpula de 3m de raio. O muro ou cúpula é feito de essência invisível e indestrutível.
• Sombra Assassina (Padrão, 25 PM) Cria duplicatas ilusórias de quaisquer criaturas escolhidas em alcance curto. Sempre que um dos alvos faz uma ação hostil, sua duplicata realiza a mesma ação contra o alvo, usando as mesmas estatísticas e rolagens. As duplicatas podem ser atacadas, têm as mesmas estatísticas das criaturas originais e são destruídas quando chegam a 0 PV. Os alvos têm direito a um teste de Vontade. Se um alvo passar, sua duplicata desaparece no final do turno do alvo, depois de copiar sua ação dessa rodada.
Rajada Prismática (Movimento) Thantalla dispara uma rajada prismática da ponta de seus dedos em uma criatura qualquer em alcance longo. A vítima sofre dois dos efeitos a seguir (role 1d8 para cada efeito): 1) 100 pontos de dano de fogo (Ref reduz à metade). 2) 200 pontos de dano de frio (Ref reduz à metade). 3) 300 pontos de dano de eletricidade (Ref reduz à metade). 4) Envelhece muitos anos, ficando alquebrada, debilitada e lenta (Fort evita). 5) Encolhe até o tamanho de um inseto, ficando com tamanho Minúsculo, Força –5 e deslocamento padrão reduzido a 3m (Fort evita). 6) Enlouquece, ficando confusa (Von evita). 7) Vira uma flor, ficando com tamanho Minúsculo e paralisada (Von evita). 8) Atingida por dois efeitos (role mais duas vezes, ignorando resultados “8”).
A CD dos testes de resistência é 50 e todas as condições são permanentes (embora possam ser removidas por efeitos capazes de fazer isso).
Visão Feérica Thantalla está permanentemente sob efeito da magia Visão Mística com o aprimoramento que permite enxergar criaturas e objetos invisíveis.
For 5, Des 7, Con 7, Int 10, Sab 5, Car 19
Perícias Atuação +35, Conhecimento +26, Diplomacia +35, Enganação +35, Intuição +21, Jogatina +35, Misticismo +31, Nobreza +26.
Equipamento Gemas Eternas . Tesouro Triplo.`
      },
      {
        chave: "urazyel", nome: "Urazyel", nd: "S+", tipo: "Monstro (lekael*) Colossal",
        papel: '',
        fontes: "Área de Tormenta, O Crânio e o Corvo",
        resumo: "Diferente de outros Lordes da Tormenta, que residem em suas fortalezas, esta entidade é um bastião em si mesmo.",
        texto:
`Urazyel ND S+
Diferente de outros Lordes da Tormenta, que residem em suas fortalezas, esta entidade é um bastião em si mesmo. Seu próprio corpo é uma estrutura da Tormenta, um vasto castelo ancorado no topo dos mais altos picos das Sanguinárias. Conforme a natureza orgânica dessas construções, tem a aparência de uma cidadela monstruosa, grotesca e indubitavelmente viva — seus milhares de olhos, mandíbulas e tentáculos, sempre em movimento, não deixam dúvidas disso. Alguns juram que as colunas em formato de patas sustentam a construção, sendo capazes de carregá-la através das montanhas. Outros afirmam que muda de posição através de poderes lefeu de manipulação da realidade. O fato é que o Castelo Urazyel jamais é visto duas vezes no mesmo lugar. Seu interior abriga uma cidadela completa, com numerosas estruturas menores e uma grande população de lefeu, bem como artonianos escravizados. Não se sabe se é apenas mais uma ilusão provocada pela loucura, mas ele parece ser maior por dentro que por fora, um semiplano completo, onde existiriam até mesmo outras cidades.
Monstro (lekael*) Colossal
Iniciativa +14, Percepção +23 (+33 em seu interior), percepção perfeita
Defesa 68, Fort +45, Ref +11, Von +40, cura acelerada 50, imunidade a medo, redução de dano 30, resistência a magia +10
Pontos de Vida 6.000
Deslocamento 6m (4q), natação 6m (4q), ignora terreno difícil
Corpo a Corpo Infinitos tentáculos +65 (4d20+50).
Agarrar Aprimorado (Livre) Tentáculo (teste +75).
Aprisionar (Livre) Se Urazyel começar seu turno agarrando uma criatura não Titânica, poderá fazer um teste de agarrar contra ela. Se vencer, aprisiona a criatura em uma câmara em seu interior. Uma criatura aprisionada continua agarrada, fica cega, tem cobertura total contra efeitos vindos do lado de fora de Urazyel (e vice-versa) e sofre 2d20+50 pontos de dano de impacto mais 2d20+50 pontos de dano de ácido no início de cada turno do lekael. Ela pode escapar vencendo um teste de agarrar ou de Acrobacia contra o valor de agarrar de Urazyel ou causando um total de 100 pontos de dano a ele. Isso faz com que a criatura se liberte da câmara, mas continue no interior de Urazyel (veja Estrutura da Tormenta). Urazyel mantém cada criatura aprisionada em uma câmara diferente, e pode manter qualquer número de criaturas aprisionadas por vez.
Carapaça Suprema Urazyel sofre apenas metade do dano de fontes mundanas, exceto aço-rubi.
Infinitos Tentáculos Urazyel possui infinitos tentáculos que saem de suas aberturas. A cada ação agredir, ele pode fazer um ataque de tentáculo contra cada criatura em seu alcance (ou dois ataques, se o alvo for Grande ou maior) ou dez ataques contra um único alvo.
Insanidade da Tormenta 2d20 PM (Von CD 55 evita). Esta habilidade pode afetar mesmo criaturas que já foram afetadas pela Insanidade da Tormenta de outras criaturas neste dia.
Titânico Urazyel é imune a manobras de combate, não pode ser flanqueado e sofre metade do dano de ataques que não sejam de outra criatura Titânica. Ele ocupa um espaço de 90m de lado e, quando se move, pisoteia qualquer criatura ou objeto Enorme ou menor em seu caminho (atravessando seu espaço), causando 20d6 pontos de dano de impacto (uma vez por rodada por criatura, Ref CD 55 reduz à metade). Além disso, seu alcance natural é 18m e seus ataques ignoram redução de dano.
For 20, Des –2, Con 20, Int 11, Sab 7, Car 6
Perícias Atletismo +36, (+16 para saltar), Conhecimento +27, Diplomacia +22, Guerra +27, Intimidação +32, Intuição +25, Misticismo +27, Nobreza +27, Sobrevivência +23.
Tesouro Triplo. *Veja Ameaças de Arton, p. 29.`
      },
      {
        chave: "val", nome: "Val", nd: "4", tipo: "Humanoide (humana) Média",
        papel: '',
        resumo: "20Deuses A duelista urbana Val começou sua jornada ao lado de Mateo, jovem pescador dos rios de Callistia, região das Repúblicas Livres de Sambúrdia.",
        texto:
`Val ND 4
20Deuses A duelista urbana Val começou sua jornada ao lado de Mateo, jovem pescador dos rios de Callistia, região das Repúblicas Livres de Sambúrdia. Depois de surgir sabe-se lá de onde, entregou a ele uma medalha mágica com a efígie da deusa Valkaria — a Medalha dos Aspectos. Ao ativá-la, Mateo adquiriu força e poderes incríveis, rechaçando monstros aquáticos que ameaçavam sua aldeia. Partindo em busca do pai desaparecido do jovem, a dupla encontraria medalhas de outras divindades. Val é exuberante e intempestiva, mas não a guerreira mais habilidosa do mundo; em todas as lutas, acaba perdendo ou deixando cair sua espada. Contudo, o amor por viagens e aventuras, assim como a semelhança com Valkaria (até mesmo o nome), talvez não sejam coincidências. Quando perguntada sobre sua origem, afirma vir da capital imperial — a cidade de Valkaria! Seria ela uma manifestação da deusa, impelindo Mateo para a aventura? Sendo o caso, esta seria sua versão mais fraca, afoita e desastrada! Seja manifestação divina ou jovem aventureira, Val parece alguém claramente habituada a grandes cidades, sempre se queixando de lugares rústicos e caçoando de Mateo por ser um “caipira sem cultura”. A relação da dupla ficaria ainda mais complicada com a chegada da guerreira Mina, uma minaura, raça variante dos minotauros. Grande, forte e confiante — além de aparentemente conhecer a real natureza de Val — Mina se tornaria sua rival instantânea.
Humanoide (humana) Média
Iniciativa +15, Percepção +4
Defesa 24, Fort +10, Ref +16, Von +4, evasão, redução de dano 5, resistência a magia +2
Pontos de Vida 95
Deslocamento 12m (8q), ignora terreno difícil
Corpo a Corpo Florete x2 +16 (1d6+9, 15/x3).
Bloqueio Contundente (Reação) Uma vez por rodada, quando é atingida por um ataque corpo a corpo, Val pode fazer um teste de ataque. Se o resultado do teste for maior que o do oponente, ela evita o ataque e causa 2d6 pontos de dano de perfuração a ele.
Esgrima Acrobática (Movimento) Val percorre até metade de seu deslocamento e, até o final do turno, recebe +5 em testes de ataque, em rolagens de dano e na margem de ameaça.
Presença Paralisante Se Val for a primeira da iniciativa, ela ganha uma ação padrão extra na primeira rodada.
For 2, Des 6, Con 4, Int 2, Sab 0, Car 3
Perícias Acrobacia +13, Atletismo +8.
Equipamento Couraça sob medida, florete certeiro preciso, sapato de camurça. Tesouro Nenhum.`
      },
      {
        chave: "vanessaDrake", nome: "Vanessa Drake", nd: "20", tipo: "Humanoide (humana) Média",
        papel: '',
        fontes: "Trilogia da Tormenta",
        resumo: "Vanessa Drake nasceu na família Derrigan, nobres menores de Bielefeld, em um feudo não muito longe da cidade de Norm.",
        texto:
`Vanessa Drake ND 20
Vanessa Drake nasceu na família Derrigan, nobres menores de Bielefeld, em um feudo não muito longe da cidade de Norm. Como uma menina nobre em um reino tradicionalista, era esperado que se tornasse uma dama, casasse com um cavaleiro e tivesse uma vida voltada à corte. No entanto, desde criança mostrou desejo por muito mais. Certa noite, Vanessa teve um sonho, que interpretou como uma visão. Estava sendo convocada por Keenn, então o Deus da Guerra. Fugiu de casa e do reino, passou por provações e foi aceita como acólita. Depois de anos de treinamento árduo, foi ordenada e voltou a Bielefeld, onde era vista como indesejável e perigosa. Foi então que conheceu outro indesejável — o jovem cavaleiro Orion Drake. Em pouco tempo, os dois estavam casados. Vanessa e Orion sempre desejaram ter filhos, mas o destino não parecia colaborar. Quando enfim ela engravidou, seu marido saiu em uma busca pelo próprio pai, um vilão misterioso. Isso deu início a uma série de eventos que mudou a história de Arton. Grávida, Vanessa partiu no encalço de Orion. Acabou cruzando o caminho do caçador de recompensas Crânio Negro, um servo da Tormenta, e descobriu sobre um plano para enviar um exército corrompido pela Tempestade Rubra até o antigo reino de Trebuck. Vanessa fez o próprio parto no campo de batalha. Arranjou o casamento de ninguém menos que Shivara Sharpblade, então rainha de Trebuck, com o antigo rei de Yudennach, para conseguir seu apoio na guerra. Ela foi fundamental para a vitória do Exército do Reinado, mas seu filho bebê foi raptado. A autoconfiança de Vanessa tinha uma razão: ao longo da vida, ela teve visões de que seria sumo-sacerdotisa de Keenn. Contudo, teve que abandonar esse destino. A busca para salvar seu filho a levou mais uma vez à luta contra a Tormenta. Vanessa barganhou com demônios e ofereceu seu próprio futuro em troca de armas para vencer Crânio Negro. O matou com as próprias mãos, mas sua vida perdeu a grandiosidade. Vanessa viveu durante anos com Orion e Vallen, o filho do casal, num castelo em Bielefeld. Perder seus poderes de clériga na queda de Keenn foi o mais duro golpe que sentiu na vida. Por muito tempo conviveu com a realidade de estar espiritualmente sozinha. Mas, embora a grandeza tivesse ficado em seu passado, seu heroísmo e sua força nunca seriam esquecidas. Certa noite ela acordou com uma sensação que não experimentava desde que era adolescente. Uma visão. Um chamado. A sacerdotisa então saiu do castelo no meio da noite para encontrar o novo Deus da Guerra em pessoa visitando suas terras, e voltou para o castelo radiante. Antes do amanhecer, retomou os treinos de combate e, com os primeiros raios de sol, ordenou a construção de um templo. Vanessa Drake era mais uma vez uma escolhida. A primeira clériga de Arsenal.
Humanoide (humana) Média
Iniciativa +20, Percepção +22
Defesa 60, Fort +28, Ref +20, Von +34, fortificação 50%, imunidade a medo, redução de dano 10
Pontos de Vida 860
Deslocamento 9m (6q)
Pontos de Mana 206
Corpo a Corpo Maça de guerra x3 +53 (3d6+45, x4, mais 6d8 impacto).
Comandar o Medo (Movimento) Vanessa faz um teste de Intimidação oposto pela Vontade de todas as criaturas a escolha dela em alcance médio. Criaturas que falhem ficam abaladas e alquebradas até o fim da cena. Uma criatura que passe sofre essas condições por 1 rodada. Esta habilidade não pode afetar uma mesma criatura mais de uma vez no mesmo dia.
Conjurar Arma (Livre, 1 PM) Vanessa invoca uma arma corpo a corpo ou de arremesso com a qual seja proficiente. A arma surge na mão dela, recebe um bônus de +1 em testes de ataque e rolagens de dano e dura pela cena. Ela não pode criar armas de disparo, mas pode criar 20 munições (flechas, virotes etc.).
Fé Guerreira (Livre) Se estiver em combate, uma vez por rodada, Vanessa substitui um teste de perícia (exceto testes de ataque) por um teste de Guerra.
Maça Trovejante Uma criatura atingida por um acerto crítico da maça de guerra trovejante de Vanessa fica atordoada por 1 rodada (apenas uma vez por cena; Fort CD 51 evita).
Magia Acelerada (Livre, +4 PM) Uma vez por rodada, quando lança uma magia com execução de ação completa ou menor, Vanessa muda a execução dela para livre.
Prece de Combate (+2 PM) Quando lança uma magia divina com tempo de conjuração de uma ação padrão em si mesma, Vanessa pode lançá-la como uma ação de movimento.
Magias Como uma clériga de Arsenal de 20º nível (CD 51, limite de PM 25). Vanessa pode lançar qualquer magia divina.
• Arma Mágica (Padrão, 14 PM) Até o fim da cena, uma arma adjacente se torna mágica, fornecendo +5 nos testes de ataque e rolagens de dano e +2d6 pontos de dano de eletricidade.
• Aura Divina (Padrão, 21 PM) Vanessa emana uma aura brilhante com 9m de raio até o fim da cena. Ela e aliados devotos de Arsenal na área ficam imunes a encantamento e recebem +13 na Defesa e em testes de resistência (para aliados não devotos de Arsenal esse bônus é +8). Inimigos que entrem na área devem fazer um teste de Vontade; em caso de falha, recebem uma condição entre esmorecido, debilitado ou lento até o fim da cena. Esse teste deve ser repetido cada vez que a criatura entra novamente na área.
• Coluna de Chamas (Padrão, 24 PM) Um cilindro de fogo com 3m de raio e 30m de altura desce dos céus em alcance longo, causando 15d6 pontos de dano de fogo mais 15d6 pontos de dano de luz nas criaturas e objetos livres na área.
• Curar Ferimentos (Padrão, 25 PM) Uma criatura adjacente cura 26d8+26 PV ou criaturas escolhidas em alcance curto curam 21d8+21.
• Dissipar Magia (Padrão, 3 PM) Vanessa escolhe uma criatura, objeto ou esfera de 3m em alcance médio e faz um teste de Misticismo. Todas as magias nesse alvo com CD igual ou menor que o resultado do teste são dissipadas.
• Escudo da Fé (Reação, 7 PM) Quando uma criatura em alcance curto sofre um ataque, recebe +5 na Defesa por 1 turno.
• Libertação (Padrão, 10 PM) Até o fim da cena, uma criatura em alcance curto fica imune a efeitos de movimento, ignora qualquer efeito que impeça ou restrinja seu deslocamento e pode usar habilidades que exigem liberdade de movimento mesmo se estiver usando armadura ou escudo.
• Pele de Pedra (Padrão, 10 PM) Vanessa recebe redução de dano 10 até o fim da cena.
• Potência Divina (Padrão, 6 PM, sustentada) O tamanho de Vanessa aumenta uma categoria e ela recebe Força +4 e RD 10. Ela não pode lançar magias enquanto estiver sob efeito de Potência Divina.
• Soco de Arsenal (Padrão, 25 PM) Uma criatura em alcance médio sofre 15d6+7 pontos de dano de impacto e é empurrada 3m na direção oposta (Fort reduz à metade e evita o empurrão).
For 7, Des 4, Con 9, Int 2, Sab 6, Car 1
Perícias Diplomacia +17, Guerra +24, Intimidação +17, Intuição + 22, Misticismo +18, Nobreza +18, Religião +34.
Equipamento Armadura completa de adamante delicada fortificada guardiã, escudo leve reforçado, maça de guerra de adamante maciça magnífica trovejante, manto eclesiástico aprimorado, símbolo sagrado de Arsenal. Tesouro Padrão.`
      },
      {
        chave: "vladislavTpish", nome: "Vladislav Tpish", nd: "14", tipo: "Humanoide (humano) Médio",
        papel: '',
        fontes: "Holy Avenger, O Terceiro Deus",
        resumo: "Dizem que, quando Talude abandonou seu posto na Academia Arcana, deixou-a nas mãos de um arcanista prestigiado por seus pares, de intelecto",
        texto:
`Vladislav Tpish ND 14
Dizem que, quando Talude abandonou seu posto na Academia Arcana, deixou-a nas mãos de um arcanista prestigiado por seus pares, de intelecto incomparável, meticulosa capacidade organizativa e comportamento ético inquestionável. Um necromante. Professor e estudioso por muitos anos na instituição, este sábio com mania de limpeza já passou por incontáveis aventuras e desventuras, sendo um dos heróis mais famosos de Arton. Participou de expedições junto a Leon Galtran e foi o responsável por infiltrar aventureiros na cidadela de Khalifor, logo após sua ocupação pelas tropas duyshidakk. Por outro lado, foi responsável por trazer de volta à vida o paladino de Jallar, ex-colega de grupo que se tornaria um dos maiores flagelos do mundo na forma de Paladino de Arton. É um dos homens mais inteligentes do Reinado e uma autoridade em necromancia. Desenvolveu técnicas de reanimação de mortos-vivos que não dependem de ritos profanos, melhorando a reputação dos necromantes em todo o continente. Porém, sua maior atuação foi como acadêmico e instrutor na academia onde hoje é reitor, conquistando junto com o cargo a imortalidade concedida por Wynna, a Deusa da Magia. O advento dos osteon e outros fenômenos ocorridos após a queda do antigo Deus da Morte fizeram o sábio trabalhar mais do que nunca para se manter atualizado nos novos desafios de seu campo de conhecimento, ao mesmo tempo em que administra o dia a dia da maior escola de magia do mundo conhecido.
Humanoide (humano) Médio
Iniciativa +13, Percepção +15
Defesa 48, Fort +17, Ref +24, Von +30, redução de trevas 10
Pontos de Vida 420
Deslocamento 9m (6q)
Pontos de Mana 125
Magia Acelerada (Livre, +4 PM) Uma vez por rodada, quando usa Raio Arcano ou lança uma magia com execução de ação completa ou menor, Vlad muda a execução dessa ação para livre.
Magia Registrada Como criador da magia Crânio Voador dele Mesmo, para Vlad o custo total em PM dessa magia é reduzido à metade (após aplicar aprimoramentos e quaisquer outros efeitos que reduzam seu custo; já contabilizado). Além disso, sempre que causa dano com essa magia, ele recupera uma quantidade de pontos de vida igual à metade do dano causado em cada alvo.
Professor de Necromancia Vlad conhece todas as magias arcanas de necromancia*. Para ele, essas magias custam –1 PM (já contabilizado) e a CD para resistir a elas aumenta em +2.
Raio Arcano (Padrão, 1 PM) Uma criatura em alcance médio sofre 5d12 pontos de dano de trevas e não pode recuperar PV por 1 rodada (Ref CD 46 reduz à metade e evita a restrição de cura).
Magias Como um mago de 17º nível (CD 46, limite de PM 23).
• Campo de Força (Reação, 7 PM) Quando sofre dano, Vlad recebe redução de dano 50 contra esse dano.
• Crânio Voador de Vladislav* (Padrão, 11 PM) Um crânio de energia negativa causa 13d8+13 pontos de dano de trevas em duas criaturas em alcance médio e deixa os alvos e todas as criaturas a 3m deles abaladas (Fort reduz à metade e evita a condição).
• Salto Dimensional (Reação, 5 PM) Vlad recebe +5 na Defesa e em testes de Reflexos contra um ataque ou efeito que esteja prestes a atingi-lo e, após a resolução desse efeito, salta para um espaço adjacente desocupado.
• Tentáculos de Trevas* (Padrão, 13 PM) Até o fim da cena, tentáculos surgem em uma esfera de 9m em alcance médio e tentam agarrar todas as criaturas na área. Ao lançar a magia e no início de cada um de seus turnos, Vlad faz um teste da manobra agarrar (usando Misticismo) contra cada criatura na área. Se ele passar, a criatura é agarrada; se a vítima já está agarrada, é esmagada, sofrendo 10d6 pontos de dano de trevas. A área conta como terreno difícil e os tentáculos são imunes a dano.
For 0, Des 2, Con 2, Int 7, Sab 4, Car 3
Perícias Conhecimento +20, Cura +15, Diplomacia +14, Investigação +18, Misticismo +23, Nobreza +18, Ofício (alquimista) +18, Religião +15. EquipamentoAnel da proteção, braceletes de ouro, essência de mana x2, instrumentos de Ofício (alquimista) aprimorados, manto da resistência, poção de curar ferimentos (7d8+7), terra de cemitério x4. Tesouro Padrão.`
      },
      {
        chave: "goBlinn", nome: "Go Blinn", nd: "1", tipo: "Humanoide (goblin) Pequeno",
        papel: '',
        titulo: "Goblin do Cantinho",
        fontes: "Guilda do Macaco, A Última Lição",
        resumo: "Infelizmente, ainda é costumeiro que goblins sejam tratados como simples monstros por aventureiros.",
        texto:
`Go Blinn ND 1
Infelizmente, ainda é costumeiro que goblins sejam tratados como simples monstros por aventureiros. Sendo assim, é possível que o simpático Go Blinn — nome criativo dado por seus pais — acabasse tendo sua existência literalmente apagada da face de Arton. Porém, quis o destino que ele atravessasse o caminho de verdadeiros heróis. Vivendo onde hoje é a Supremacia Purista, acabou sendo recrutado para a tripulação do terrível pirata ogro Ordrogh. Do ponto de vista de Go Blinn, isso foi menos uma escolha e mais questão de sobrevivência. De fato, ele planejava se livrar dessa precarizada carreira de capanga de vilão assim que uma oportunidade surgisse… E ela surgiu! Na forma de um raio mágico não letal disparado por Kadeen, um dos Campeões de Svalas, em meio a um combate deste célebre grupo contra o bando do ogro. Atingido pelo feitiço, Go Blinn, ator nato, declarou a plenos pulmões ter sido “mortalmente ferido!”. Escondeu-se num canto — supreendentemente, com sucesso. Quando, mais tarde na mesma batalha, um dos heróis foi arremessado por Ordrogh no mesmo lugar, o goblin proferiu sua famosa (?) frase: “Vá procurar seu próprio cantinho!”. Essa passagem cômica é muito lembrada nas sagas cantadas sobre os Campeões, mas Go Blinn cruzaria o caminho de ainda outras personalidades famosas, depois de conseguir fugir para outro reino. Em seu emprego mais recente, como faxineiro na Academia Arcana, teria participado dos eventos que levaram à ascensão de Vladislav Tpish como novo Mestre Máximo da Magia, atuando ao lado de lendas como Tork, o Troglodita Anão; o Doutor Zebediah Nash, e sir Philipp Donovan. O fato de todos esses indivíduos singulares serem dados como mortos, entretanto, não facilita que outras pessoas acreditem nessa história.
Humanoide (goblin) Pequeno
Iniciativa +8, Percepção +2, visão no escuro
Defesa 16, Fort +6, Ref +9, Von +3, evasão
Pontos de Vida 24
Deslocamento 9m (6q), escalar 9m (6q)
Corpo a Corpo Vassoura +7 (1d8+4 impacto).
Aparência Inofensiva A primeira criatura inteligente (Int –3 ou maior) que atacar Go Blinn em uma cena deve fazer um teste de Vontade (CD 18). Se falhar, perderá sua ação.
Meu Cantinho Se estiver em qualquer canto (ou seja, adjacente a pelo menos duas paredes ou superfícies equivalentes), Go Blinn recebe cobertura e aplica seu bônus por cobertura em testes de resistência (além de na Defesa).
Solução Engenhosa (Reação) Uma vez por cena, quando faz um teste de perícia, Go Blinn soma sua Inteligência no teste.
For –1, Des 6, Con 2, Int 3, Sab 0, Car 0
Perícias Acrobacia +8, Atuação +4, Furtividade +10, Ladinagem +8, Ofício (zelador) +5.
Equipamento Andrajos de aldeão, gazua, vassoura (conta como uma maça e instrumentos de Ofício [zelador]).
Tesouro Metade.
Parceiro Go Blinn é um parceiro iniciante que fornece +2 em Furtividade e permite que você use a habilidade Meu Cantinho.`
      },
    ],
  });

  // Itens mágicos e artefatos descritos junto das fichas — quase todos
  // exclusivos do personagem em cujo verbete aparecem.
  G.itens = (G.itens || []).concat([
    { chave: "armaduraDeCranioNegro", nome: "Armadura de Crânio Negro", meta: "Item exclusivo de Crânio Negro",
      texto:
`Esta armadura foi criada pelos diabretes negociantes a partir das memórias de Ellisa Thorn, ex-membro do Esquadrão do Inferno. Sua aparência é notável e ameaçadora: completamente negra, parece sugar a luz e destaca-se até mesmo contra o céu noturno. O elmo tem a forma de um crânio estilizado, com adornos que o tornam ainda mais sinistro. Ela é uma armadura completa fortificada guardiã macabra que parece se mover sozinha (suas placas deslizam para manter o usuário protegido e defendê-lo). Apesar de seu peso e rigidez, não atrapalha os movimentos, permitindo saltos e acrobacias em meio ao combate: conta como uma armadura leve com penalidade de armadura 0. Contudo, por ser feita a partir das memórias de uma artoniana, a armadura tem um efeito colateral: bombardeia o usuário com impressões da vida de Ellisa Thorn. Molda o estilo de luta e até mesmo parte do comportamento do usuário para refletir os membros do Esquadrão do Inferno. Por exemplo, Crânio Negro luta com duas espadas (como Vallen Allond), rastreia (como a própria Ellisa ou Andilla Dente-de-Ferro) e repete “não há morte” (como Gregor Vahn). Artefato.
Anel da Felicidade de Vallen Este anel foi criado pelos diabretes negociantes a partir da felicidade de Vallen Allond. Foi concedido a Crânio Negro por motivos que apenas os diabretes conhecem — mas que, de forma geral, podem ser resumidos a sadismo e desejo de destruição. O anel da felicidade de Vallen fornece cura acelerada 10 (somente após um dia de uso) que recupera até perda de vida. Além disso, se o usuário for morto enquanto estiver usando o anel e continuar com ele, irá recuperar 1 ponto de vida por dia e, quando chegar a PV positivos, será ressuscitado. Sendo feito a partir da felicidade de Vallen Allond, o anel tem um efeito colateral: o usuário é assaltado por visões desse aventureiro e sente compulsão de protegêlo, estar perto dele ou garantir sua felicidade. É claro que, para um usuário insano, os conceitos de “proteger” e “garantir a felicidade” tornam-se bem distorcidos… O anel também influencia o comportamento do usuário (tornando-o um pouco mais semelhante a Vallen). Artefato.` },
    { chave: "cajadoDeBatalha", nome: "Cajado de Batalha", meta: "Item exclusivo de Gwendolynn",
      texto:
`Um cajado reforçado com chapas de metal nas pontas. Uma arma discreta, usada por andarilhos que não querem levantar suspeitas. O cajado de batalha é uma arma dupla.
Arma Marcial • Corpo a Corpo Duas Mãos • T$ 10 • Dano 1d8/1d8 Crítico x2 • Impacto • 2 Espaços Universal 2 (Convocação) Execução: padrão; Alcance: toque; Alvo: até dois itens que você possua, entre armas, armaduras e escudos; Duração: permanente até ser descarregada; Custo Adicional: penalidade de 1 PM. Esta magia é utilizada por clérigos e bardos que não precisam (ou não podem) estar sempre com suas armas ou armaduras. A magia é lançada sobre até dois itens que você possua. A partir daí, em qualquer momento, você pode usar uma ação completa para convocar os itens, que aparecem sobre seu corpo e em suas mãos (conforme apropriado ao item). O efeito é espalhafatoso, sendo praticamente impossível utilizá-lo sem chamar atenção. A magia funciona independentemente da distância dos itens, desde que estejam no mesmo Plano, mas termina se você perder a posse deles. +1 PM: aumenta o número de alvos em dois e o custo adicional em +1 PM.` },
    { chave: "pistolaTambor", nome: "Pistola-Tambor", meta: "Item exclusivo de General Supremo",
      texto:
`Esta arma de fogo possui um tambor giratório que armazena 4 munições. Esse tambor é parte de um mecanismo complexo e por isso conta como uma melhoria para a arma. Recarregar uma pistola-tambor é uma ação completa.
Arma de Fogo • À Distância • Uma Mão T$ 2.100 • Dano 2d6 • Crítico 19/x3 Perfuração • 1 Espaço` },
    { chave: "asObrasDasIrmas", nome: "As Obras das Irmãs", meta: "Item exclusivo de Hemera, Acteia e Ilítia",
      texto:
`Como presente de Kallyadranoch por sua devoção, cada uma das irmãs recebeu o poder para criar um item mágico específico. Esses itens são algumas das diversas ferramentas que utilizam para atrair devotos à fé em seu pai. Os poderes mágicos desses itens só funcionam com devotos de Kallyanadroch.
Punhal Escarlate Criada por Hemera, esta adaga formidável causa +1d6 pontos de dano de essência. Além disso, conta como um orbe cristalino. Arma específica média, preço T$ 41.000.
Braceletes das Escamas Criados por Acteia, estes braceletes de aço escurecido são entalhados de forma a parecer escamas de dragão. Fornecem redução de dano 5 e contam como uma luva de ferro. Acessório médio, preço T$ 21.000.
Face Dracônica Esta máscara dourada, semelhante ao rosto estilizado de um dragão, fortalece o poder arcano do usuário. Fruto do poder de Ilítia, fornece +2 na CD para resistir a suas habilidades mágicas (incluindo magias) e conta como um medalhão de prata. Acessório médio, preço T$ 25.000. Itens exclusivos delas!! Não deve ser adicionado ao sistema.` },
    { chave: "presuntador", nome: "Presuntador", meta: "Item exclusivo de Klunc",
      texto:
`Feito de mana solidificado e dado a Klunc como recompensa por um ato especialmente heroico, o Presuntador é um machado de guerra aumentado energético magnífico. Se Klunc ficar inconsciente, o Presuntador continua lutando sozinho, com as mesmas estatísticas que teria se estivesse sendo empunhado. Quando ataca dessa forma, o Presuntador tem Defesa 35, RD 50 e 50 PV. Arma mágica específica maior, T$ 120.000.` },
    { chave: "coroaDeAllihanna", nome: "Coroa de Allihanna", meta: "Item exclusivo de Lisandra",
      texto:
`Este artefato, criado pela própria Deusa da Natureza, tem a aparência de uma coroa de madeira e vinhas. Concede For +3, Con +3 e redução de dano 20 (já contabilizado). Artefato.` },
    { chave: "armaduraDeKhalmyr", nome: "Armadura de Khalmyr", meta: "Item exclusivo de Paladina de Khalmyr",
      texto:
`Esta armadura completa sob medida defensora fica armazenada magicamente em uma gargantilha com o símbolo do Deus da Justiça. Enquanto está armazenada dessa forma, a armadura não ocupa nenhum espaço (embora ainda conte como um item vestido) e não impõe nenhuma penalidade ao usuário (como se ele não estivesse de armadura). Ao pronunciar o nome de Khalmyr, o usuário evoca a armadura, que é vestida automaticamente. Devolver a armadura à gargantilha também é uma ação livre. Armadura específica média, T$ 42.000.` },
    { chave: "balestra", nome: "Balestra", meta: "Item exclusivo de Paollus",
      texto:
`A balestra é uma versão mais robusta da besta pesada, que utiliza um sistema de catracas reguláveis para armar seu arco. Esse sistema permite que usuários mais fortes apliquem mais tensão à arma; ao contrário de outras armas de disparo, você aplica sua Força a rolagens de dano com uma balestra. Esta arma é muito pesada e complexa para ser usada sem treinamento especial, por isso é uma arma exótica. Recarregar uma balestra é uma ação padrão.
Arma Exótica • À Distância • Duas Mãos T$ 150 • Dano 1d12 • Crítico 19 Perfuração • 2 Espaços` },
    { chave: "carthalkanALaminaCristalina", nome: "Carthalkan, a Lâmina Cristalina", meta: "Item exclusivo de Lady Shivara",
      texto:
`Esta espada longa atroz e pungente é feita de um cristal translúcido. Empunhá-la traz uma sensação estranha, pois ela não tem o peso de materiais comuns, como metal ou madeira. Quando brandida por um herdeiro da família Sharpblade, a arma emite uma luz límpida e revela todos os seus poderes: torna-se uma espada longa atroz pungente ameaçadora magnífica, que tem dano base 4d8. Artefato.
Coroa Imperial Símbolo do trono do Reinado, esta coroa é usada pelos Reis-Imperadores há séculos. Ao longo das gerações, foi imbuída pela força de cada um dos monarcas que a usou, até se tornar um artefato capaz de auxiliar o regente na tarefa de guiar a humanidade. O usuário da Coroa Imperial recebe +2 em Sabedoria e Carisma (cumulativo com outros itens), aplica seu Carisma na Defesa e em testes de resistência e recebe imunidade a encantamento. Como um artefato, a Coroa Imperial não pode ser danificada por meios mundanos. A única maneira de destruí-la é roubá-la e escondê-la em uma masmorra. Se nenhum herói resgatar a Coroa dentro de um ano e um dia, ela será reduzida a pó. Artefato.` },
    { chave: "avir", nome: "Avir", meta: "Item exclusivo de Sislach Narsogg",
      texto:
`Este montante aumentado macabro maciço formidável tumular foi fabricado a partir do fêmur da irmã de Narsogg. Uma arma única, conta como um cajado arcano. Além dos benefícios desse esotérico, as magias do usuário que causam dano de trevas causam +1 ponto de dano por dado. Arma específica maior, preço T$ 96.000.` },
    { chave: "gemasEternas", nome: "Gemas Eternas", meta: "Item exclusivo de Thantalla-Dhaedellinn",
      texto:
`Esta joia é formada por uma correntinha de mitral, adornada por safiras, esmeraldas, rubis e diamantes que emitem luz própria, brilhando com todas as cores do arco-íris. A beleza das Gemas Eternas só é rivalizada por seu poder. O usuário recebe +2 em Carisma, +5 na Defesa e 1 ponto de mana extra por nível (após um dia de uso). Se possuir a capacidade de lançar magias arcanas, a CD de suas magias aumenta em +2. Artefato.` },
    { chave: "macaDeGuerra", nome: "Maça de Guerra", meta: "Item exclusivo de Vanessa Drake",
      texto:
`Uma versão mais perigosa da maça comum, com uma cabeça formada por grandes placas de metal. O peso da maça de guerra torna seu golpe poderoso, mas desajeitado, fazendo com que ela seja uma arma desbalanceada. Além disso, uma maça de guerra é muito pesada e desequilibrada para ser usada sem treinamento especial, por isso é uma arma exótica.
Arma Exótica de Uma Mão • T$ 25 • Dano 1d12 • Crítico x3 • 1 Espaço • Impacto` },
  ]);

  // Quadros de regra e de cenário do capítulo.
  G.regras = (G.regras || []).concat([
    { chave: "maioresQueAMorte", cat: 'lendas', titulo: "Maiores que a Morte",
      texto:
`Todas as criaturas de patamar S e S+ possuem a habilidade Maior que a Morte. Enquanto uma criatura com essa habilidade tiver pelo menos metade de seus PV, é imune a habilidades de “morte instantânea”. Isso inclui efeitos que reduzem seus PV a 0 ou menos instantaneamente (como Assassino Fantasmagórico), que aprisionam ou destroem seu corpo ou alma (como Buraco Negro e Roubar a Alma) e similares. O mestre tem a palavra final se um efeito é ou não de morte instantânea. A criatura ainda pode ser reduzida a 0 PV ou menos por dano ou perda de vida.` },
    { chave: "sumoSacerdotes", cat: 'lendas', titulo: "Sumo-Sacerdotes",
      texto:
`Este livro apresenta alguns dos sumo-sacerdotes de Arton. Além de poderes específicos concedidos por suas divindades, todos os sumo-sacerdotes partilham das habilidades a seguir.
Proteção Divina O sumo-sacerdote é automaticamente bem-sucedido em testes de resistência contra magias divinas lançadas por devotos de sua divindade.
Punição Divina (Padrão) O sumo-sacerdote cancela as magias divinas e os poderes concedidos de um devoto de sua divindade em sua linha de visão (Von evita e o devoto não pode mais ser punido por 24 horas). A punição pode ser revertida com uma ação padrão do sumo-sacerdote ou com uma missão sagrada realizada como parte de um rito (veja Religião em Tormenta20, p. 122).` },
    { chave: "kumShrak", cat: 'lendas', titulo: "Kum’shrak",
      texto:
`Arma ritualística empunhada apenas pelos melhores guerreiros duyshidakk, um kum’shrak é uma arma especial que extrai poder de suas vítimas. Seguindo as leis de Lamnor e do Akzath, por ser empregado como uma ferramenta de “morte” cujo único propósito é pôr “fim” à vida, o kum’shrak está próximo das “trevas”. Assim, conforme é empunhada em combate, a arma se torna cada vez mais escura, afiada e avessa à vida, até alcançar um ponto em que se torna capaz de ferir qualquer ser vivo que a toque. Mesmo seu proprietário pode ser ferido pelo kum’shrak; se a arma não sentir que será usada em combate, pode manifestar seu poder sombrio; se for usado como ferramenta, o kum’shrak pode impor uma penalidade de –5 em testes, se for usado para cortar alimentos, pode envenená-los, se o portador estiver com medo ou fugir, pode perder 1d4 pontos de vida e assim por diante. Um kum’shrak recém-criado é um osso grande, que funciona como uma arma improvisada (–2 em ataques, 1d6 de dano, crítico x2). Quando mata pela primeira vez, torna-se uma clava. Quando mata cinco vítimas, torna-se um machado de batalha. Ao fazer sua décima vítima, o kum’shrak recebe uma melhoria escolhida por seu portador. Depois disso, sempre que dobra seu número de mortes (20, 40 etc.), adquire uma nova melhoria, até um máximo de quatro melhorias. Além das melhorias normais, um kum’shrak tem acesso a três melhorias exclusivas.
• Eviscerador. Uma criatura atingida fica sangrando (Fort CD For evita).
• Necrótico. Uma criatura atingida fica fraca (Fort CD For evita).
• Peçonhento. Uma criatura atingida perde 1d6 pontos de vida por veneno.
Arma Exótica • Corpo a Corpo Uma Mão • T$ – • Dano 1d6 • Crítico x2 Impacto • 1 Espaço` },
    { chave: "mestreDasCatacumbas", cat: 'lendas', titulo: "Mestre das Catacumbas",
      texto:
`Rodleck possui controle absoluto sobre a famigerada masmorra conhecida como Catacumbas de Leverick. Dentro dela ele é considerado um rei da arena (veja Ameaças de Arton, p. 368). Além dos benefícios por ser um chefe final, ele não pode ser surpreendido, suas magias custam –2 PM (cumulativo com outras reduções) e ele soma sua Sabedoria na Defesa e nos testes de resistência, Enganação, Ladinagem, Misticismo e Religião.` },
    { chave: "oArtefatoDeCross", cat: 'lendas', titulo: "O Artefato de Cross",
      texto:
`Esta arma única é um item puramente mundano e tecnológico, inventado e forjado pelas mentes geniais e doentias de demônios. Ela é composta por diversos canos de mosquete, que giram por meio de engrenagens quando o usuário puxa uma alavanca. O artefato é pesado e desajeitado, mas quando acionado, dispara todos os seus canos, banhando os alvos com uma chuva de chumbo.
O Artefato de Cross é uma arma de fogo de duas mãos (dano 2d12, crítico 19/x3, alcance médio, perfuração) que fornece +10 nos testes de ataque e, em caso de acerto, causa +1d12 pontos de dano para cada 2 pontos pelos quais o resultado do ataque passar a Defesa do alvo. Recarregá-lo é uma ação padrão.
Atualmente, o Artefato de Cross está em posse do Senhor Porrada. O meio-orc vaga pelos ermos para manter a arma longe da civilização. Mas, claro, pode acabar sendo encontrado por um grupo de aventureiros. Nesse caso, será melhor para eles que o encontro seja amistoso…` },
    { chave: "estruturaDaTormenta", cat: 'lendas', titulo: "Estrutura da Tormenta",
      texto:
`O corpo de Urazyel é uma gigantesca estrutura da Tormenta; grande o suficiente para abrigar uma cidade, com numerosas estruturas menores e uma grande população de lefeu e prisioneiros. Um personagem que queira entrar ou sair de Urazyel deve primeiro encontrar uma passagem. A maioria é guarnecida por lefeu, mas é possível encontrar passagens secretas com uma ação completa e um teste de Investigação ou Percepção (CD 30). Uma vez localizada, a passagem deve ser aberta; para isso, é necessário causar 120 pontos de dano a ela ou passar em um teste de Ladinagem ou Força (CD 30). Por fim, uma vez que a passagem esteja aberta, atravessá-la é uma ação de movimento.
Dentro de Urazyel, o personagem enfrentará os rigores de uma área de Tormenta (veja Tormenta20, p. 319), muito maior por dentro do que por fora. Além disso, continuará vulnerável aos ataques de tentáculos do lekael.
Entretanto, Urazyel não é onisciente; ainda que seja muito difícil, um personagem pode tentar se esconder dentro dele, evitando assim seus ataques e as inúmeras patrulhas de lefeu.` },
  ]);
})();
