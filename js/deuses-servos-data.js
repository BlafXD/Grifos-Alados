// ════════════════════════════════════════════════════════════════════
//  DEUSES-SERVOS-DATA.JS — os servos do Panteão
//  Localização: /grifos-alados/js/deuses-servos-data.js
//
//  ⚠ ARQUIVO GERADO por "Inútil/_gerar-deuses-servos.js" a partir de
//    "Inútil/Regras Parte 2 do Deuses de Arton.txt" e de
//    "Inútil/Regras - Deuses de Arton (abissais).txt". Dá para editar à
//    mão — mas rodar o gerador de novo sobrescreve tudo.
//
//  A segunda metade do livro Deuses de Arton: quem o Panteão manda
//  quando um avatar seria demais. Seis grupos — abissais, aspectos dos
//  deuses, celestiais (com os inevitáveis), fadas (com os eiradaan),
//  gênios e gigantes.
//
//  ⚠ OS ABISSAIS SAÍRAM DO PDF, não da cópia em texto: a seção nunca
//  foi colada no TXT do livro. O recorte está em
//  "Inútil/_extrair-abissais.js", que documenta faixa por faixa o que
//  veio de cada página.
//
//  É o MESMO livro dos avatares, então em vez de abrir uma aba nova
//  este arquivo ACRESCENTA suas categorias ao window.FICHAS_DEUSES_ARTON
//  já existente — por isso precisa ser carregado DEPOIS do
//  js/deuses-arton-data.js. Mesmo arranjo do js/npcs-lendas-data.js,
//  que fecha o Guia de NPCs.
//
//  ⚠ SÓ O MESTRE: incluído apenas no index.html.
//
//  Campos de cada ficha:
//    chave    — id estável (não mudar; a aba e o modal usam)
//    nome/nd  — repetidos fora do texto para listas e filtros
//    tipo     — linha de tipo e tamanho (só exibição em listas)
//    papel    — 'solo' | 'lacaio' | 'especial'. No livro é um ÍCONE
//               VETORIAL ao lado do nome: não é caractere nenhum, e por
//               isso nunca saiu em cópia de texto. Foi lido do PDF em
//               28/08/2026 assinando a geometria do desenho. Este livro
//               não repete a legenda dos papéis (é suplemento), então os
//               desenhos de referência vêm do Tormenta 20 — são os mesmos.
//    subgrupo — quadro de habilidades que a criatura divide com as
//               outras do tipo dela (dragões celestiais, inevitáveis,
//               gênios); a aba mostra a caixa dentro do card
//    resumo   — uma linha para o modal de inserção
//    texto    — statblock completo; PRIMEIRA linha = "Nome ND X", depois
//               a descrição da criatura, a linha de tipo e o bloco do livro
//
//  ⚠ O texto NÃO é cópia literal: o gerador conserta os deslizes de
//  digitação do livro que atrapalhavam a leitura da ficha — palavras
//  coladas, espaço faltando depois de vírgula e de parêntese, rótulo
//  com ponto, travessão colado ("Defesa—"), ponto final faltando e o
//  deslocamento sem os quadrados. Cada conserto sai listado no
//  relatório do gerador; nenhum número de regra foi tocado.
//
//  ⚠ O "✦" na frente de uma habilidade quer dizer HABILIDADE MÁGICA:
//  pode ser alvo de Dissipar Magia (inclusive como contramágica) e é
//  anulada onde a magia não funciona. No livro é um ícone; na cópia do
//  PDF sobrou como um "e" solto no fim do parágrafo.
//
//  ⚠ QUADRADOS DO DESLOCAMENTO — o padrão são os METROS, então o
//  gerador recalcula os "q" a partir deles (1q = 1,5m).
//
//  ⚠ ND ANOTADO À MÃO — estas fichas não trazem "ND x" em lugar nenhum
//  do texto copiado. Conferidos no livro (2026-08-21):
//    Aspecto de Kallyadranoch → ND 6 (conferido no livro)
//    Aspecto de Valkaria → ND 5      (conferido no livro)
//    Eiradaan Nobre → ND 13          (conferido no livro)
//    Gigante Bicéfalo → ND 13        (conferido no livro)
//    Gigante dos Mares → ND 9        (conferido no livro)
//    Gigante Real → ND 19            (conferido no livro)
//  (O Aspecto de Allihanna também vinha sem ND no cabeçalho, mas ali o
//  número não se perdeu: o PDF jogou o "ND 5" para dentro da coluna de
//  baixo, e o gerador devolve sozinho. O Gigante Máximo traz o ND no
//  cabeçalho, só que sem a sigla: "Gigante Máximo S+".)
// ════════════════════════════════════════════════════════════════════
(function () {
  'use strict';
  const B = window.FICHAS_DEUSES_ARTON;
  if (!B || !Array.isArray(B.categorias)) {
    console.error('[deuses-servos] carregue js/deuses-arton-data.js antes deste arquivo.');
    return;
  }

  B.categorias.push(

    // ── 😈 ABISSAIS ────────────────────────────────
    {
      chave: "abissais", nome: "Abissais", icone: "😈", cor: "#9e3a2f",
      intro: "Diabos, demônios, infernais: os nativos dos reinos dos deuses maléficos, concebidos para servir — mas há os que se rebelam, e uns pouquíssimos que chegam a almejar bondade. Do diabrete de estimação a Abahddon e Lamashtu, que dividem um capítulo só para eles.",
      fichas: [
        {
          chave: "aucharai", nome: "Aucharai", nd: "6", tipo: "Espírito (abissal) Médio",
          papel: "solo",
          resumo: "É um demônio alto, maior que um humano, mas muito magro.",
          texto:
`Aucharai ND 6
É um demônio alto, maior que um humano, mas muito magro. Tem pele negra, lustrosa e sem pelos, como se coberto de piche. O rosto tem expressão insana e macabra, com presas pontudas projetando-se fora da boca e olhos ardendo como chamas.
Entre os abissais, aucharai são espiões e assassinos, especializados em rastrear, perseguir e exterminar alvos para seus mestres. São astutos e perspicazes, estabelecendo planos maliciosos antes de começar uma missão. Furtivos e sorrateiros, preferem atacar primeiro o adversário que parece mais poderoso, esperando incapacitar a maior ameaça para então deliciar-se sem pressa com as mortes dos demais.
Quase todos os abissais com algum poder e influência, assim como muitos vilões de Arton, têm alguns aucharai a seu serviço, para espionar e despachar inimigos de forma sutil (tanto quanto possível para demônios). Quando um clérigo de Tenebra ou de Sszzaas suplica a sua divindade pela eliminação de um inimigo, muitas vezes este será o abissal conjurado.
Espírito (abissal) Médio
Iniciativa +10, Percepção +6, visão no escuro
Defesa 26, Fort +8, Ref +18, Von +10, evasão, imunidade a ácido e veneno, redução de dano 5
Pontos de Vida 240
Deslocamento 12m (8q)
Corpo a Corpo Duas espadas curtas +20 (2d6+18, 19).
Ataque Furtivo +2d6.
✦ Detectar Pensamentos O aucharai detecta constantemente os pensamentos superficiais de todas as criaturas inteligentes em alcance curto. Ele não pode ser surpreendido por criaturas cujos pensamentos esteja detectando dessa forma e recebe +2 na Defesa e em testes de perícia contra elas. Uma criatura ciente desta habilidade pode gastar uma ação de movimento e fazer um teste de Vontade (CD 24). Se passar, esconde seus pensamentos até o fim da cena.
✦ Escurecer Olhos (Padrão) O aucharai invoca uma sombra mística sobre os olhos de uma criatura em alcance curto. A vítima fica cega (Fort CD 24 reduz para 1 rodada). Recarga (movimento).
Protegido pela Escuridão Se estiver em uma condição de pouca iluminação que forneça camuflagem leve, em vez disso o aucharai recebe camuflagem total.
✦ Visão Abissal O aucharai está permanentemente sob efeito da magia Visão Mística com o aprimoramento que permite enxergar criaturas e objetos invisíveis.
For 4, Des 5, Con 2, Int 3, Sab 1, Car 1
Perícias Acrobacia +10, Atletismo +9, Furtividade +15, Ladinagem +8.
Tesouro Padrão.`
        },
        {
          chave: "trioDeCarvarel", nome: "Trio de Carvarel", nd: "8", tipo: "Espírito (abissal) Grande",
          papel: "solo",
          resumo: "A criatura abissal tem corpo humanoide robusto, coberto de pelos, com cabeça de bode, chifres e cascos.",
          texto:
`Trio de Carvarel ND 8
A criatura abissal tem corpo humanoide robusto, coberto de pelos, com cabeça de bode, chifres e cascos. Ele empunha um grande machado e bufa em antecipação ao combate.
Também conhecidos apenas como “guerreiro de chifres”, são o tipo mais comum de abissal. Nos reinos divinos, formam as tropas de infantaria nos exércitos dos deuses malignos, em vastos números. Embora considerado fraco entre os abissais, um único carvarel é bem capaz de dizimar vários soldados humanos!
Carvarel são violentos, brutais, sempre ansiosos para ferir e matar com seus machados. Estão também entre os demônios de menor inteligência, sendo razoavelmente fácil enganá-los ou atacá-los com magias mentais.
Em Arton, carvarel podem ser encontrados em pequenos bandos errantes (masmorras costumam ser seu terreno favorito) ou servindo a devotos do mal. Apesar da dificuldade de mantê-los sob controle, a magia para invocá-los é relativamente simples, tornando-os interessantes como guardas e soldados para vilões conjuradores.
Espírito (abissal) Grande
Iniciativa +6, Percepção +3, faro, visão no escuro
Defesa 33, Fort +19, Ref +16, Von +15, imunidade a ácido e venenos, redução de dano 5, redução de fogo e frio 10
Pontos de Vida 305
Deslocamento 9m (6q)
Corpo a Corpo [Bando] Machado de guerra x2 +26 (1d12+16, x3) ou chifres x2 +26 (2d6+10 impacto).
Marrada Infernal (Completa) O trio de carvarel faz uma investida e desfere todos os seus ataques de machado de guerra e de chifres contra quaisquer criaturas em alcance. Todos os ataques recebem o bônus de +2 da investida, mas o trio não pode fazer mais de dois ataques contra a mesma criatura.
For 5, Des 3, Con 4, Int –2, Sab 1, Car –1
Perícias Atletismo +13, Intimidação +9.
Equipamento Machado de guerra cruel x3. Tesouro Padrão.`
        },
        {
          chave: "diabrete", nome: "Diabrete", nd: "2", tipo: "Espírito (abissal) Minúsculo",
          papel: "lacaio",
          resumo: "O diminuto humanoide poderia ser confundido com um silfo, mas as diferenças logo se fazem óbvias.",
          texto:
`Diabrete ND 2
O diminuto humanoide poderia ser confundido com um silfo, mas as diferenças logo se fazem óbvias. É careca, com asas de couro e uma cauda fina e comprida, que termina em um ferrão. Parece pequeno e fraco demais para ser perigoso, apesar dos olhos vermelhos e da expressão cruel.
Diabretes são abissais menores, quase como bichos de estimação para outros demônios, ou mesmo humanos e outras raças — muitos arcanistas os empregam como familiares ou espiões. De fato, por sua covardia, acabam se tornando bastante obedientes quando domesticados.
Em estado selvagem, estas criaturas malévolas gostam de travessuras, mas suas brincadeiras quase sempre envolvem alguma crueldade, como assustar pessoas, fomentar brigas ou causar acidentes. São também conhecidos por roubar bebês ou devorá-los no berço, apenas para desfrutar do sofrimento dos pais.
Diabretes são maus, mas também medrosos, sempre preferindo agir em bandos e fugir quando descobertos. Se encurralados e forçados a lutar, recorrem ao ferrão venenoso na cauda.
Além do diabrete comum, existem variedades mais inteligentes e muito mais perigosas. Um exemplo terrível são os diabretes negociantes: quando fazem um acordo, tomam da vítima alguma coisa valiosa (alma, força, juventude, lembranças, futuro...) e usam como material para forjar um item poderoso, que podem entregar ou guardar para si. Não têm interesse em lucro, apenas em espalhar miséria e sofrimento.
Espírito (abissal) Minúsculo
Iniciativa +5, Percepção +4, visão no escuro
Defesa 17, Fort +6, Ref +12, Von +4, imunidade a ácido e veneno
Pontos de Vida 20
Deslocamento 6m (4q), voo 12m (8q)
Corpo a Corpo Ferrão +14 (1d6+8 mais veneno).
Peste Invisível (Padrão) O diabrete se torna invisível (como na magia Invisibilidade) até o fim da cena ou até fazer um ataque.
Veneno Peçonha comum (perde 1d12 pontos de vida, Fort CD 16 evita).
For –2, Des 2, Con 0, Int 2, Sab 1, Car 1
Perícias Furtividade +10, Misticismo +7.
Tesouro Nenhum.
Familiar Um diabrete fornece +1 PM para gastar em aprimoramentos sempre que você lança uma magia de ilusão ou veneno.`
        },
        {
          chave: "diabreteNegociante", nome: "Diabrete Negociante", nd: "4", tipo: "Espírito (abissal) Pequeno",
          papel: "especial",
          resumo: "O diminuto humanoide poderia ser confundido com um silfo, mas as diferenças logo se fazem óbvias.",
          texto:
`Diabrete Negociante ND 4
O diminuto humanoide poderia ser confundido com um silfo, mas as diferenças logo se fazem óbvias. É careca, com asas de couro e uma cauda fina e comprida, que termina em um ferrão. Parece pequeno e fraco demais para ser perigoso, apesar dos olhos vermelhos e da expressão cruel.
Diabretes são abissais menores, quase como bichos de estimação para outros demônios, ou mesmo humanos e outras raças — muitos arcanistas os empregam como familiares ou espiões. De fato, por sua covardia, acabam se tornando bastante obedientes quando domesticados.
Em estado selvagem, estas criaturas malévolas gostam de travessuras, mas suas brincadeiras quase sempre envolvem alguma crueldade, como assustar pessoas, fomentar brigas ou causar acidentes. São também conhecidos por roubar bebês ou devorá-los no berço, apenas para desfrutar do sofrimento dos pais.
Diabretes são maus, mas também medrosos, sempre preferindo agir em bandos e fugir quando descobertos. Se encurralados e forçados a lutar, recorrem ao ferrão venenoso na cauda.
Além do diabrete comum, existem variedades mais inteligentes e muito mais perigosas. Um exemplo terrível são os diabretes negociantes: quando fazem um acordo, tomam da vítima alguma coisa valiosa (alma, força, juventude, lembranças, futuro...) e usam como material para forjar um item poderoso, que podem entregar ou guardar para si. Não têm interesse em lucro, apenas em espalhar miséria e sofrimento.
Espírito (abissal) Pequeno
Iniciativa +7, Percepção +6, visão no escuro
Defesa 21, Fort +4, Ref +15, Von +11, imunidade a ácido e veneno, redução de fogo e frio 5
Pontos de Vida 120
Deslocamento 6m (4q), voo 12m (8q)
Corpo a Corpo Martelo de forja +15 (1d8+8, x3) e mordida +15 (1d6+8).
Barganha O diabrete negociante pode conceder um Desejo a uma criatura. Em troca, a criatura dá algo muito importante e imaterial. A lista a seguir contém alguns exemplos de pagamentos, mas o mestre é livre para criar outros (veja o quadro).
• Amor. Um dos parceiros do personagem o abandona, e seu limite de parceiros diminui em –1.
• Coragem. O personagem falha automaticamente em testes de resistência contra medo e sofre –5 em Iniciativa.
• Felicidade. O personagem perde o prazer pela vida; ele não recebe benefícios de itens de alimentação e, independentemente de suas condições de descanso, sua recuperação nunca é melhor que normal.
• Juventude. O personagem perde 1 ponto de Constituição e falha automaticamente em testes contra efeitos de cansaço. Alternativamente, se você tiver o suplemento Heróis de Arton, a criatura envelhece uma categoria de idade (veja Capítulo 4: Regras Opcionais), mas não recebe nenhum dos benefícios da nova categoria.
Confundir (Padrão) Uma criatura em alcance curto fica confusa (Von CD 18 evita e a criatura fica imune a esta habilidade por um dia). Recarga (movimento).
Risada Enervante Criaturas a até 9m do diabrete sofrem –2 em Intuição e Vontade.
For 0, Des 3, Con 0, Int 6, Sab 2, Car 5
Perícias Enganação +14, Intuição +11, Ofício (armeiro) +13, Ofício (artesão) +13.
Equipamento Instrumentos de Ofício (armeiro, artesão) aprimorados.
Tesouro Padrão e 1d4-1 itens feitos dos sentimentos de alguém.`
        },
        {
          chave: "jhumariel", nome: "Jhumariel", nd: "10", tipo: "Espírito (abissal) Grande",
          papel: "solo",
          resumo: "Aquilo lembra um sapo humanoide, grande e forte como um ogro.",
          texto:
`Jhumariel ND 10
Aquilo lembra um sapo humanoide, grande e forte como um ogro. Seu corpo é verde e inchado de músculos, que secretam muco fétido e pegajoso. A bocarra tem incontáveis fileiras de dentes serrilhados, e deixa escorrer uma saliva fumegante, corrosiva.
Jhumariel atuam como líderes e guerreiros de elite entre os exércitos demoníacos. São aqueles que comandam os carvarel em batalha — o que fazem com pura intimidação e força bruta, ainda que sejam mais inteligentes que eles.
Acima de tudo, jhumariel são obcecados por combate e matança. Incitam seus bandos contra inimigos e, em tempos de paz, semeiam discórdia entre aliados. Não é surpresa, portanto, que tenham sido favoritos de Keenn no passado, e hoje sejam muito utilizados por Arsenal e seus devotos.
Em batalha, avançam em meio aos adversários para incapacitá-los com seu fedor pestilento, e então terminar o serviço com as garras e a mordida terríveis.
Espírito (abissal) Grande
Iniciativa +7, Percepção +8, faro, visão no escuro
Defesa 36, Fort +22, Ref +14, Von +12, imunidade a ácido, fogo e veneno, redução de dano 10
Pontos de Vida 400
Deslocamento 12m (8q)
Corpo a Corpo Duas garras +29 (2d8+20, 19) e mordida ácida +29 (2d6+14 mais 2d6 ácido).
Cuspe (Padrão) O jhumariel cospe saliva ácida em uma criatura em alcance curto. A vítima sofre 8d8 pontos de dano de ácido e fica coberta por muco corrosivo que causa 4d8 pontos de dano de ácido no início de cada um dos seus dois próximos turnos (Ref CD 30 reduz à metade e evita o muco). Recarga (movimento).
Dilacerar Se o jhumariel acerta os dois ataques de garra em uma mesma criatura no mesmo turno, causa mais 4d6+4 pontos de dano.
Invocar Carvarel (Completa) Uma vez por cena, o jhumariel invoca 1d3+1 carvarel (veja guerreiro de chifres, em Tormenta20, p. 287). Eles surgem em alcance curto e agem a partir da próxima rodada, em suas iniciativas.
Mau Cheiro (Padrão) O jhumariel expele um gás fétido. Todas as criaturas em alcance curto ficam enjoadas por 1d6 rodadas (Fort CD 30 evita). Uma criatura que passe no teste de resistência fica imune a esta habilidade por um dia. Veneno.
For 6, Des 2, Con 6, Int 2, Sab 1, Car –2
Perícias Atletismo +15 (+25 para saltar), Intimidação +15.
Tesouro Padrão mais 1d4 doses de saliva ácida (CD 30 para extrair, veja quadro).`
        },
        {
          chave: "margharon", nome: "Margharon", nd: "14", tipo: "Espírito (abissal) Enorme",
          papel: "especial",
          resumo: "O outrora respeitável elfo abandona essa aparência para revelar o que parece ser sua forma verdadeira: uma aberração gigantesca, como um…",
          texto:
`Margharon ND 14
O outrora respeitável elfo abandona essa aparência para revelar o que parece ser sua forma verdadeira: uma aberração gigantesca, como um amontoado de carne inchada, alta e cônica como uma torre de castelo. Uma miríade de tentáculos aflora da base, espalhando-se em volta como raízes de uma grande árvore. No topo, uma bocarra repleta de dentes afiados.
Margharon estão entre os mais poderosos abissais — são os mercadores de almas dos reinos divinos. Eles negociam os espíritos falecidos que seus mestres, os próprios deuses, mais cobiçam.
Embora sua aparência real seja aterradora, os margharon usam poderes mágicos para assumir um aspecto ilustre na sociedade mortal, tipicamente como um nobre humano, elfo ou qareen. Uma vez infiltrado, o margharon procura seu alvo e investiga suas maiores necessidades, para então oferecer um contrato: aquilo que a vítima mais deseja — riqueza, fama, poder político, a ressurreição de um ente querido... — em troca de sua alma.
Há quem aceite a oferta, acreditando que encontrará os deuses apenas quando chegar sua hora, ou mesmo buscando uma forma de burlar o pacto. Contudo, após selar o acordo, o margharon tramará para distorcer as regras (o contrato será cumprido, mesmo que nem sempre da maneira esperada) ou abreviar a vida do contratante.
Outra tática deste abissal é preparar emboscadas mortais para aventureiros e, quando esses estão perto da derrota, poupar suas vidas se aceitarem assinar um contrato.
Espírito (abissal) Enorme
Iniciativa +9, Percepção +12, visão no escuro
Defesa 44, Fort +28, Ref +14, Von +22, fortificação 50%, imunidade a ácido, atordoamento, eletricidade e veneno, redução de dano 20, resistência a magia +4
Pontos de Vida 490
Deslocamento 9m (6q)
Pontos de Mana 70
Corpo a Corpo Quatro tentáculos +37 (2d8+28) e mordida +37 (2d6+22).
Agarrar Aprimorado Tentáculo (teste +39).
Magia Acelerada (Livre, +4 PM) Uma vez por rodada, quando lança uma magia com execução de ação completa ou menor, o margharon muda a execução dela para livre.
✦ Mudar Forma (Padrão) O margharon assume a forma de qualquer humanoide de tamanho Pequeno a Enorme, como o efeito da magia Metamorfose. Ele pode permanecer na forma escolhida por tempo indeterminado, mas, se morrer, reverte à forma natural.
Magias Como um feiticeiro de 14º nível (CD 40).
• Dissipar Magia (Padrão, 3 PM) O margharon escolhe uma criatura, objeto ou esfera de 3m em alcance médio e faz um teste de Misticismo. Todas as magias nesse alvo com CD igual ou menor que o resultado do teste são dissipadas.
• Muralha Elemental (Padrão, 14 PM) Uma muralha de fogo de até 30m de comprimento e 3m de altura se eleva da terra, em alcance médio. Um lado da muralha emite ondas de calor, que causam 2d8 pontos de dano de fogo em criaturas a até 6m quando a magia é lançada e no início dos turnos do margharon. Atravessar a muralha causa 16d6 pontos de dano de fogo.
• Relâmpago (Padrão, 12 PM) O margharon lança um relâmpago em cada criatura escolhida em alcance médio, causando 12d6 pontos de dano de eletricidade (Ref reduz à metade).
• Teletransporte (Padrão, 6 PM) O margharon se teleporta para um lugar a sua escolha a até 1.000 km. Ele precisa passar em um teste de Misticismo (CD 20 para lugares que visita com frequência, CD 30 para lugares em que ele já esteve ao menos uma vez ou CD 40 para lugares onde nunca esteve). Se falhar no teste, surge a 1d10 x 10 km afastado em qualquer direção e, se rolar 1 natural, fica atordoado por 1d4 rodadas.
For 5, Des 0, Con 4, Int 6, Sab 3, Car 6
Perícias Diplomacia +17, Enganação +22, Misticismo +19, Intimidação +17, Intuição +16, Investigação +17.
Tesouro Padrão.`
        },
        {
          chave: "rhayrivel", nome: "Rhayrivel", nd: "7", tipo: "Espírito (abissal) Médio",
          papel: "solo",
          resumo: "A criatura tem o aspecto de um humano muito forte, careca, de olhos vermelhos e língua bifurcada.",
          texto:
`Rhayrivel ND 7
A criatura tem o aspecto de um humano muito forte, careca, de olhos vermelhos e língua bifurcada. Tem o corpo todo coberto de lâminas, correntes e ganchos de aço farpado. O metal enxertado em sua carne, por certo, causa muita dor — mas não tanta quanto ele parece disposto a infligir em seus inimigos.
Rhayrivel são legionários sádicos, amedrontando aliados e inimigos com a mesma intensidade. Muitos servem a demônios mais poderosos, enquanto outros invadem Arton para matar, angariando almas para seus patronos. Por seu sadismo obsessivo, estão entre os abissais mais propensos a escapar de seus mestres, em busca de liberdade para torturar e flagelar à vontade. Sempre que estes assassinos surgem, trazem consigo dor e sofrimento sem limites.
Em rituais de sacrifício, é comum que um ou mais rhayrivel sejam enviados ou conjurados para garantir que a vítima sofra as dores mais atrozes. Portanto, aventureiros em missões para resgatar tais infelizes podem muito bem ter que enfrentá-los.
Espírito (abissal) Médio
Iniciativa +9, Percepção +7, visão no escuro
Defesa 31, Fort +19, Ref +15, Von +7, imunidade a ácido e veneno, redução de dano 5, redução de fogo e frio 10
Pontos de Vida 280
Deslocamento 9m (6q)
Corpo a Corpo Duas cimitarras +24 (2d8+20, 18).
Correntes Farpadas (Padrão) O rhayrivel projeta suas correntes contra uma criatura em alcance curto. A vítima sofre 3d6+26 pontos de dano de corte e é acometida por uma dor profunda, que causa uma penalidade de –5 em testes de perícia até o fim da cena (Fort CD 24 reduz à metade e evita a dor e a penalidade). Um efeito capaz de remover uma condição de fadiga remove a dor e a penalidade.
Sadismo O rhayrivel recebe +5 em testes de ataque e rolagens de dano contra criaturas que estejam sangrando.
Talho Atroz Uma criatura atingida por um ataque de cimitarra do rhayrivel fica sangrando (Fort CD 24 evita).
For 6, Des 2, Con 4, Int 1, Sab 0, Car –2
Perícias Intimidação +14.
Tesouro Padrão.`
        },
        {
          chave: "sucubo", nome: "Súcubo", nd: "5", tipo: "Espírito (abissal) Médio",
          papel: "especial",
          resumo: "A mulher é estonteante, de corpo escultural e beleza indescritível.",
          texto:
`Súcubo ND 5
A mulher é estonteante, de corpo escultural e beleza indescritível. Tem cabelos longos e brilhantes, pele macia, seios fartos, lábios carnudos. Olhar ao mesmo tempo ingênuo e sedutor, convidando à luxúria. As asas demoníacas apenas emolduram essa obra de arte.
Também chamados de “íncubos” quando masculinos, súcubos são os mais belos abissais — na verdade, os seres mais belos na existência. Ou não.
Todo ser inteligente enxerga um súcubo/íncubo com a aparência mais atraente possível. Portanto, nem sempre será uma mulher voluptuosa; pode apresentar qualquer gênero, tipo físico e atributos, conforme os desejos íntimos de cada observador. Após um encontro com esta criatura, é comum que cada testemunha a descreva de forma completamente diferente. Um súcubo também pode se mostrar idêntico, ou muito parecido, com alguém que o observador ame ou por quem esteja apaixonado.
Súcubos vivem para seduzir mortais, sendo os abissais mais comumente encontrados em Arton, coletando almas para suas coleções. Também visitam o mundo material em busca de adoração, o que conseguem facilmente em qualquer taverna — ou mesmo qualquer palácio. Sua estratégia favorita é demonstrar amizade ou admiração, logo aproximando-se para seduzir. Não hesitam em fingir ser donzelas ou príncipes em perigo para atrair heróis, muito menos render-se a tórridas noites de amor antes de atacar. Então, no momento certo, aplicam seu beijo mortal para sugar a vida da vítima.
Súcubos evitam combate a qualquer custo, preferindo enfeitiçar seus inimigos para que lutem entre si.
Espírito (abissal) Médio
Iniciativa +7, Percepção +6, visão no escuro
Defesa 21, Fort +5, Ref +11, Von +17, imunidade a ácido, encantamento e veneno, redução de fogo, frio e trevas 10, vulnerabilidade a luz
Pontos de Vida 140
Deslocamento 9m (6q), voo 15m (10q)
Pontos de Mana 30
Corpo a Corpo Duas garras +15 (2d4+10, 19).
Beijo Drenante (Padrão) O súcubo beija uma criatura adjacente, que fica enfeitiçada e frustrada (Von CD 22 evita). Falhas consecutivas na mesma cena se acumulam: na segunda, a criatura fica esmorecida; na terceira, fica inconsciente. Por fim, na quarta falha, a vítima morre e o súcubo recupera 6d6 PM.
Desejo Encarnado Quando faz um teste de uma perícia baseada em Carisma, o súcubo rola dois dados e usa o melhor resultado.
✦ Mudar Forma (Padrão) O súcubo assume a forma de qualquer humanoide de tamanho Pequeno a Grande, como o efeito da magia Metamorfose. Ele pode permanecer na forma escolhida por tempo indeterminado, mas, se morrer, reverte à forma natural.
Magias Como um feiticeiro de 7º nível (CD 22, 24 para encantamento*).
• Enfeitiçar* (Padrão, 6 PM) Um espírito, humanoide ou monstro em alcance curto fica enfeitiçado (Von evita).
• Imagem Espelhada (Padrão, 5 PM) O súcubo cria cinco cópias ilusórias de si mesmo que fornecem +10 na Defesa. Cada vez que um ataque erra o súcubo, uma das imagens desaparece e o bônus na Defesa diminui em 2.
• Marca da Obediência* (Padrão, 3 PM) O súcubo ordena que uma criatura adjacente não ataque-o ou seus aliados até o fim da cena (Von evita). A criatura pode repetir o teste de Vontade em cada um de seus turnos subsequentes.
• Sono* (Padrão, 1 PM) Uma criatura em alcance curto fica exausta por 1d4+1 rodadas, depois fatigada (Von muda para fatigado por 1d4 rodadas).
For –1, Des 3, Con 2, Int 3, Sab 2, Car 10
Perícias Atuação +19, Diplomacia +19, Enganação +19, Intuição +6.
Equipamento Nenhum. Tesouro Padrão.`
        },
        {
          chave: "abahddon", nome: "Abahddon", nd: "S", tipo: "Espírito (abissal) Grande",
          papel: "solo",
          resumo: "O demônio tem corpo massivo e poderoso, inchado de músculos, com partes segmentadas ou ornamentadas com espinhos.",
          texto:
`Abahddon ND S
O demônio tem corpo massivo e poderoso, inchado de músculos, com partes segmentadas ou ornamentadas com espinhos. Tem um par de grandes chifres anelados, retorcidos, e um terceiro chifre aflorando no centro. Garras longas e negras afloram nas mãos e na cauda, asas de couro produzem fumaça e enxofre com seus movimentos. Ainda assim, apesar da aparência monstruosa, os olhos flamejantes brilham com sagacidade e malícia infernais.
Este talvez seja o demônio mais ardiloso em todos os mundos. Diz-se que todos os grandes planos, todos os esquemas seguidos e executados por abissais, foram concebidos pela mente assustadoramente genial de Abahddon, Lorde das Profundezas.
Tamanha sua engenhosidade, seu talento para executar planos complexos, que Abahddon tem o privilégio de servir a inúmeros deuses — não há divindade maligna que não utilize seus serviços, mesmo quando estes ocasionalmente conflitam com seus próprios objetivos. Diz-se que teria auxiliado Sszzaas durante o grande roubo dos Rubis da Virtude. Outros acusam-no de armar lutas durante o Torneio do Deus Guerreiro, que conduziu Arsenal ao Panteão. Outros ainda apontam sua manipulação de eventos que levaram à ascensão da Supremacia Purista. Assim, Abahddon segue se tornando tão influente e necessário que nem mesmo a queda de um deus pode prejudicá-lo.
Este demônio extremamente inteligente tece planos sobre planos. Nunca é apanhado de surpresa ou sem uma alternativa em que obtenha alguma vantagem. Suas tramas, de tão complexas, podem ser compreendidas apenas por ele próprio; seus subordinados apenas seguem ordens, de pouco adiantando interrogá-los para antever os movimentos do demônio.
Totalmente oposto a Lamashtu, o Lorde das Profundezas raramente recorre a violência ou força bruta. Prefere manipular, mentir e enganar para que outros lutem. Tem predileção especial por ludibriar os mais nobres e bem-intencionados, fazendo com que inadvertidamente causem o mal. Contudo, uma vez que ele escolha lutar, pouquíssimos em Arton podem derrotá-lo.
Quando atua secretamente, Abahddon prefere a forma de um nobre idoso, de voz rouca e grave, muito sorridente, atencioso e solícito. Obviamente, no entanto, ele tem infinitos outros disfarces.
Espírito (abissal) Grande
Iniciativa +19, Percepção +22, visão no escuro
Defesa 64, Fort +29, Ref +21, Von +36, imunidade a ácido, adivinhação, efeitos mentais, fogo e veneno, maior que a morte, redução de dano 20/luz, resistência a magia +5
Pontos de Vida 2.555
Deslocamento 12m (8q), voo 18m (12q)
Pontos de Mana 156
Corpo a Corpo Kazidhaan +64 (6d12+92, 19, mais 2d8 contra devotos de deuses que canalizam apenas energia positiva e criaturas que, a critério do mestre, sejam bondosas), mordida +58 (8d6+44) e cauda +58 (8d8+36 corte).
Agarrar Aprimorado (Livre) Cauda (teste + 60).
Concentração Abissal Abahddon pode lançar magias mesmo com as mãos presas ou amordaçado (como se estivesse sob efeito do poder Magia Discreta) e, quando faz um teste de Vontade para concentração, rola dois dados e usa o melhor resultado.
Constrição (Livre) No início de cada um de seus turnos, Abahddon causa 8d8+36 pontos de dano de impacto em qualquer criatura que esteja agarrando.
Dádiva Abissal (Completa) Abahddon transfere uma fração de seu poder para outra criatura em alcance curto. Essa criatura pode escolher um dos benefícios a seguir. Uma mesma criatura só pode receber uma dádiva de Abahddon.
• A criatura aprende e pode lançar uma magia de até 3º círculo (atributo-chave Carisma).
• Um atributo da criatura, à escolha dela, aumenta em +1.
• A criatura recebe um poder qualquer (exceto concedido ou da Tormenta), cujos pré-requisitos cumpra.
Pacto Maculado (Movimento) Uma criatura em alcance médio ouve “conselhos” de uma voz suave; comandos simples como “vá até aquele lugar”, “solte esse item” etc. A cada vez que segue um desses conselhos, a criatura recebe +2 em rolagens de dano por 1 rodada e 2 PM temporários.
Por Trás das Cortinas Quando faz um teste de Diplomacia, Enganação, Intimidação, Intuição ou Percepção, Abahddon rola dois dados e usa o melhor resultado.
Preço do Pacto Quando Abahddon usa Desejo, Dádiva Abissal ou Pacto Maculado para conceder um efeito benéfico a uma criatura, essa criatura sofre uma penalidade cumulativa de –5 em testes de perícia e rolagens de dano contra Abahddon. A penalidade tem a mesma duração que o efeito benéfico correspondente.
Magias Como um conjurador arcano de 20º nível (CD 51, limite de PM 36).
• Chuva de Meteoros (Completa, 15 PM) Meteoros caem em um quadrado de 36m em alcance longo. Criaturas na área sofrem 15d6 pontos de dano de impacto, 15d6 pontos de dano de fogo e ficam caídas e presas (agarradas) sob os escombros (Ref reduz o dano à metade e evita a condição; veja Tormenta20, p. 183).
• Desejo (Padrão, 15 PM) Abahddon molda a realidade a sua vontade. Ele pode dissipar os efeitos de qualquer magia de 4º círculo ou menor, transportar até 10 criaturas voluntárias em alcance longo para qualquer outro plano ou fazer algo ainda mais poderoso (nesse caso, exige o sacrifício de 2 PM).
• Desespero Esmagador (Padrão, 8 PM) Criaturas num cone de 6m ficam debilitadas e esmorecidas (Von reduz para 1 rodada).
• Dissipar Magia (Padrão, 3 PM) Abahddon escolhe uma criatura, objeto ou esfera de 3m em alcance médio e faz um teste de Misticismo. Todas as magias nesse alvo com CD igual ou menor que o resultado do teste são dissipadas.
• Legião (Padrão, 15 PM, sustentada) Até 10 criaturas em alcance médio obedecem cegamente aos comandos de Abahddon, exceto ordens claramente suicidas. Uma criatura tem direito a um teste de Vontade no fim de cada um de seus turnos para se livrar do efeito. Criaturas que passem no teste ficam abaladas por 1 rodada enquanto recuperam a consciência.
• Marionete (Padrão, 10 PM, sustentada) Abahddon controla as ações físicas de uma criatura em alcance médio. Ao sofrer a magia, e no início de cada um de seus turnos, a vítima faz um teste de Fortitude. Se passar, a magia é anulada.
• Rogar Maldição (Padrão, 10 PM) Uma criatura em alcance curto fica esmorecida e não pode se comunicar ou lançar magias permanentemente (Fort evita).
For 8, Des 3, Con 5, Int 16, Sab 6, Car 12
Perícias Atletismo +24, Diplomacia +33, Enganação +38, Intimidação +33, Intuição +27, Misticismo +32.
Equipamento Kazidhaan. Tesouro Triplo.`
        },
        {
          chave: "lamashtu", nome: "Lamashtu", nd: "S", tipo: "Espírito (abissal) Grande",
          papel: "solo",
          resumo: "A criatura lembra uma grande nagah, metade humana e metade serpente gigante.",
          texto:
`Lamashtu ND S
A criatura lembra uma grande nagah, metade humana e metade serpente gigante. Os três pares de braços, no entanto, revelam se tratar de uma guerreira demoníaca. Cada mão empunha uma arma magnífica, ricamente ornamentada. Não veste armadura, mas usa uma fortuna incalculável em joias mágicas — braceletes, colares, anéis, brincos, tiara. Seria uma mulher muito bela, mas o ódio em seus olhos e em seus dentes cerrados revela existir apenas desejo por matança em seu coração.
Os abissais do reino divino de Arsenal são o que existe de pior em termos de violência e brutalidade nos mundos dos deuses. Nascem no campo de batalha, vivem para o derramamento de sangue e sempre procuram um novo confronto, independentemente de vitória ou derrota. Embora isso faça parecer que tenham comportamentos homogêneos, a verdade não poderia estar mais distante. Criaturas do caos, quanto mais poderosos ficam, mais diversas se tornam suas personalidades, preferências e maneirismos.
Lamashtu ascenderia como uma das favoritas de Keenn, o antigo Deus da Guerra, por sua atuação nas frequentes batalhas locais. Liderando exércitos, oferecendo serviços a outros demônios ou conquistando territórios por conta própria, ela deixou sua marca através da ferocidade. Talvez existam demônios mais poderosos ou habilidosos, mas nenhum que iguale sua ferocidade. Forte, mas também uma sagaz estudiosa das artes da guerra, Lamashtu organiza elaborados planos de combate com seus generais antes de cada conflito. E em vez de se esconder na retaguarda ou cercar-se de guardas, segue à frente para saudar o inimigo com suas armas e liderar seus comandados pelo exemplo.
Quando as espadas se cruzam e os escudos se chocam, porém, Lamashtu não segue mais nenhuma tática ou plano. Embriagada de violência, busca apenas matar e destruir.
Se a ferocidade fez Keenn se afeiçoar por Lamashtu, foi sua tenacidade que a deixou nas graças de Arsenal. Mesmo quando as forças a seu redor sofrem derrotas esmagadoras, a Rainha dos Massacres ainda consegue obter vitórias pessoais. Talvez seu exército perca a batalha, mas ela certamente matará o campeão inimigo. Se tiver que sacrificar algumas unidades para aumentar seus espólios, não pensará duas vezes. Sob a selvageria sanguinária, Lamashtu guarda um desejo implacável de vitória.
A Senhora do Genocídio passa muito pouco tempo longe dos campos de batalha. Quando o faz, repousa em seu covil, desfrutando dos tesouros que adquiriu em séculos de matança. Os espólios que mais aprecia são joias de todos os tipos e tamanhos. Quanto mais raras, melhor.
Espírito (abissal) Grande
Iniciativa +23, Percepção +21, visão no escuro
Defesa 65, Fort +36, Ref +28, Von +24, evasão aprimorada, imunidade a ácido, fogo e medo, maior que a morte, redução de dano 30
Pontos de Vida 2.500
Deslocamento 12m (8q)
Pontos de Mana 126
Corpo a Corpo Cimitarra energética +58 (6d6+62, 18/x3), martelo de guerra lancinante +58 (3d8+52, x3), mangual magnífico +58 (4d8+48), espada longa anticriatura +58 (3d8+52, 19), tridente venenoso +58 (3d6+55) e espada bastarda sanguinária +58 (3d10+48, 19).
Arsenal Demoníaco Lamashtu possui uma variedade de armas encantadas. Atualmente, ela usa os itens descritos acima (encantos não contabilizados), mas eles podem ser substituídos por quaisquer outras armas mágicas, a critério do mestre.
Ataque Mágico (Livre) Uma vez por rodada, quando usa a ação agredir, Lamashtu lança uma magia com tempo de execução de ação padrão ou menor no lugar de um de seus ataques corpo a corpo.
Furacão de Lâminas (Reação) Quando erra um ataque corpo a corpo, Lamashtu pode repetir esse ataque contra outra criatura ao seu alcance. Recarga (movimento).
Investida Implacável Quando faz uma investida, Lamashtu causa +1d10 pontos de dano de fogo e pode continuar se movimentando depois do ataque.
Invocar Jhumariel (Completa) Uma vez por cena, Lamashtu invoca 1d6+1 jhumariel. Eles surgem em espaços vazios em alcance curto e agem a partir da próxima rodada, em suas iniciativas.
Superioridade em Batalha Lamashtu é imune a manobras de combate e não pode ser flanqueada. Além disso, seus ataques ignoram redução de dano.
Tenacidade Sulfúrica Quando faz um ataque corpo a corpo que reduz os pontos de vida de um alvo a 0 ou menos, Lamashtu recupera uma quantidade de PV igual ao dano causado.
✦ Visão Perfeita Lamashtu está sempre sob efeito de Visão da Verdade, com todos os aprimoramentos.
Magias Como uma conjuradora arcana de 20º nível (CD 51).
• Assassino Fantasmagórico (Padrão, 10 PM) Um espectro surge adjacente a Lamashtu, e um alvo em alcance médio deve fazer um teste de Vontade. Se ele passar, o espectro é dissipado. Se falhar, ele acredita na existência do espectro, que se move 18m por rodada ao final do seu turno, em direção à vítima. Se o espectro terminar seu turno adjacente à vítima, ela deve fazer um teste de Fortitude. Se passar, sofre 6d6 pontos de dano de trevas (esse dano não pode reduzir o alvo a menos de 0 PV e não o deixa sangrando). Se falhar, sofre um colapso, ficando imediatamente com –1 PV e sangrando.
• Bola de Fogo (Padrão, 19 PM) Uma explosão causa 22d6 pontos de dano de fogo em todas as criaturas e objetos livres numa esfera de 6m em alcance médio (Ref reduz à metade).
• Ferver Sangue (Padrão, 20 PM, sustentada) Lamashtu faz o sangue de criaturas escolhidas em alcance curto aquecer até entrar em ebulição. Quando a magia é lançada, e no início de cada um de seus turnos, os alvos sofrem 7d8 pontos de dano de fogo e ficam enjoados por 1 rodada (Fort reduz à metade e evita a condição). Se um alvo passar em dois testes de Fortitude seguidos, dissipa a magia. Se um alvo for reduzido a 0 PV pelo dano desta magia, seu corpo explode, matando-o e causando 6d6 pontos de dano de fogo em todas as criaturas a até 3m (Ref reduz à metade). Não afeta criaturas sem sangue, como construtos ou mortos-vivos.
• Perdição (Padrão, 9 PM) Criaturas escolhidas em alcance curto sofrem –5 em testes de ataque e rolagens de dano até o fim da cena.
• Teletransporte (Padrão, 6 PM) Lamashtu se teleporta para um lugar a sua escolha a até 1.000 km. Ela precisa passar em um teste de Misticismo (CD 20 para lugares que visita com frequência, CD 30 para lugares em que ele já esteve ao menos uma vez ou CD 40 para lugares onde nunca esteve). Se falhar no teste, surge 1d10 x 10 km afastada em qualquer direção e, se rolar 1 natural, fica atordoada por 1d4 rodadas.
• Toque da Morte (Padrão, 17 PM) Uma criatura em alcance curto sofre 10d8+10 pontos de dano de trevas. Se estiver com menos da metade de seus PV, em vez disso, deve fazer um teste de Fortitude. Se passar, sofre o dano normal. Se falhar, seus PV são reduzidos a –10.
For 18, Des 6, Con 16, Int 6, Sab 4, Car 10
Perícias Acrobacia +22, Enganação +28, Guerra +27, Intimidação +28, Intuição +22, Misticismo +24.
Equipamento Cimitarra energética, espada bastarda sanguinária, espada longa anticriatura, mangual magnífico, martelo de guerra lancinante, tridente venenoso. Tesouro Triplo.`
        },
      ],

      regras: [
        { titulo: "Abissais",
          texto:
`Diabos. Demônios. Abissais. Infernais. Planares malignos. Os nativos dos reinos de deuses maléficos têm muitos nomes. Estudiosos de outros tempos acreditaram que fossem criaturas diferentes, atreladas à ordem ou ao caos, seguindo hierarquias complexas e até mesmo travando guerras milenares sangrentas por supremacia. Também se pensava que fossem formados a partir do próprio mal, incapazes de mudar essa natureza, sendo impossível suprimir ou redimir sua perversidade sem destruí-los.

Hoje, sabe-se não ser bem assim. A verdade é que, quando divindades ascendem ou caem, os abissais também mudam. Quase todos atuam a serviço de seus respectivos criadores, pois foram concebidos com esse objetivo — mas há aqueles que se rebelam, libertam-se, buscam seus próprios objetivos. Muitas vezes esses objetivos são egoístas, cruéis, nem tão diferentes do antigo patrono. Mas alguns, muito raros, podem almejar bondade ou nobreza. Assim, se o paladino que perdoa um demônio era antes tachado de tolo ingênuo, hoje sabemos que sua clemência não é apenas bem-intencionada, mas justificada.

Contudo, tais exceções são exatamente isso: exceções. Como lacaios divinos ou apenas monstros rebeldes, abissais estão entre os seres mais perigosos de Arton e além. Ainda, devotos de deuses com tendências profanas — sobretudo Arsenal, Hyninn, Kallyadranoch, Megalokk, Nimb, Sszzaas, Thwor, Tenebra — podem ser recompensados com servos abissais, ou recebem seu auxílio temporário em missões importantes.` },
        { titulo: "Barganhas",
          texto:
`Os diabretes negociantes transformam o que tomaram de sua vítima em um item, que em geral guardam para si. Embora possam permitir que o requerente fique com o item, por sadismo, um personagem não deve receber qualquer bônus além do benefício que já alcançou. Não se sabe de nenhuma forma de devolver o que foi perdido aos requerentes. Apenas recuperar os itens não é o bastante, nem matar o diabrete com o qual se negociou. Pode haver um meio, mas certamente seria o objetivo de uma aventura, ou mesmo uma campanha inteira.
As barganhas apresentadas são sugestões, e o mestre pode criar novos elementos para serem negociados. Penalidades recebidas através de uma barganha não podem ser evitadas por nenhum efeito (como evitar uma penalidade de medo usando Coragem Total). O mestre também precisa ter em mente que o objeto de qualquer barganha deve ter um efeito negativo sobre o personagem. Um personagem que não se beneficie de itens de alimentação ou condições de descanso não irá receber as penalidades normais por barganhar sua alegria. Perder a alegria vai prejudicá-lo de alguma outra forma terrível e única. Por sua natureza sobrenatural, não é possível barganhar uma emoção para recuperar outra, nem enganar os diabretes negociantes de nenhuma forma. As barganhas são sempre pesadas e trágicas para o requerente.` },
        { titulo: "Contrato Infernal",
          texto:
`Margharon são exímios negociadores e manipuladores, capazes de oferecer exatamente aquilo com que cada criatura sonha. Uma criatura que assine um contrato com um margharon sofre a Maldição da Mortalidade: sempre que sofre dano físico, a criatura fica sangrando, e só se recupera desse sangramento se curar pelo menos 30 pontos de vida por meio de uma ou mais curas mágicas. Além disso, quando a criatura morre, sua alma fica presa, sob controle do margharon. O único meio de remover a Maldição da Mortalidade — ou de recuperar a alma da criatura, caso ela já tenha morrido — é destruir o margharon. Um personagem prestes a assinar um contrato pode fazer um teste de Intuição (CD 40) para perceber que está sendo enganado pelas letras miúdas que escondem a maldição.` },
      ],
    },

    // ── 🕊 ASPECTOS DOS DEUSES ─────────────────────
    {
      chave: "aspectos", nome: "Aspectos dos Deuses", icone: "🕊", cor: "#b08d2f",
      intro: "Um aspecto é a divindade encarnada com uma fração do poder de um avatar: some depois da tarefa, age como uma caricatura exagerada do próprio deus e não obedece a quem o invocou — ajuda só se quiser. Todos podem virar parceiro do devoto.",
      fichas: [
        {
          chave: "aspectoDeAllihanna", nome: "Aspecto de Allihanna", nd: "5", tipo: "Animal Grande",
          papel: "solo",
          resumo: "A criatura estranha, porém bela, lembra uma mescla de vários animais selvagens.",
          texto:
`Aspecto de Allihanna ND 5
A criatura estranha, porém bela, lembra uma mescla de vários animais selvagens. Tem o corpo poderoso de um grande felino, a galhada orgulhosa de um alce, a cauda volumosa de um garanhão. O rosnado sugere uma horda inteira de feras diversas.
Um aspecto de Allihanna pode surgir como qualquer animal natural ou criatura-planta, mas quase sempre apresenta partes combinadas de várias espécies vivas — reunindo as características mais adequadas para a missão. Sentidos aguçados para atuar nas trevas, traços piscianos para ação subaquática, asas para movimentação nas nuvens e assim por diante. Pode ser ligeiro para atacar inimigos numerosos, ou robusto para dar cobertura a aliados, ou provedor de frutos com qualidades curativas. Não há limites para os atributos que os reinos animal e vegetal podem oferecer.
Este aspecto pode certamente lutar, mas também prover sustento ou sobrevivência nos ermos de várias formas, guiando aventureiros por terras selvagens, ou rastreando seus alvos, ou até mesmo atuando como montaria ou besta de carga. Algumas vezes também surge como um animal humanoide, um membro do povo moreau, que seja treinado em habilidades úteis. Quanto à personalidade, o aspecto de Allihanna costuma se comportar como um animal caprichoso, por vezes temperamental e indócil, precisando ser domado. Ou subornado com comida. Ou com elogios adocicados e afagos no pescoço.
Animal Grande
Iniciativa +6, Percepção +6, faro, visão na penumbra
Defesa 24, Fort +17, Ref +11, Von +5
Pontos de Vida 200
Deslocamento 12m (8q), sem redução por terreno difícil natural
Corpo a Corpo Galhada +17 (1d8+9, x3) e duas garras +17 (1d8+9, 18).
Rugido de Centenas (Padrão) O aspecto de Allihanna emite um poderoso rugido. Todas as criaturas em um raio de 9m ficam paralisadas por 1 rodada e abaladas (Von CD 20 evita). Uma criatura só pode ser paralisada por esta habilidade uma vez por cena. Medo. Recarga (padrão).
For 4, Des 2, Con 4, Int –4, Sab 2, Car 0
Perícias Atletismo +8, Sobrevivência +10.
Tesouro 3d4 rações de viagem (CD 20 para extrair).
Parceiro O aspecto de Allihanna é um parceiro veterano que fornece os benefícios de dois tipos de parceiro, escolhidos entre os disponíveis para companheiros animais (Tormenta20, p. 62). Uma vez por rodada, você pode gastar uma ação de movimento e 2 PM para mudar os tipos escolhidos. Um aspecto de Allihanna só irá seguir um devoto de Allihanna.`
        },
        {
          chave: "aspectoDeKallyadranoch", nome: "Aspecto de Kallyadranoch", nd: "6", tipo: "Monstro (dragão) Grande",
          papel: "solo",
          resumo: "Não muito maior que um cavalo, mas ainda aterrador, o dragão é revestido de escamas brilhantes como brasas ardentes.",
          texto:
`Aspecto de Kallyadranoch ND 6
Não muito maior que um cavalo, mas ainda aterrador, o dragão é revestido de escamas brilhantes como brasas ardentes. Sua figura maciça é adornada com espinhos afiados que abundam atrás da cabeça e percorrem o dorso rumo à cauda longa. Ele abre as imponentes asas coriáceas em um gesto majestoso enquanto chamas dançam em suas narinas. O olhar impaciente parece aguardar alguma demanda. Obter o favor de um dragão verdadeiro, mesmo para devotos de Kallyadranoch, é façanha quase impossível. Tais criaturas são seres de imenso orgulho, vaidade e arrogância, jamais aceitando submissão — nem mesmo ao próprio Deus dos Dragões, que encontra devotos mais facilmente em meio a humanos e outros seres. Assim, quando o poder e a presença dracônicos são necessários, costuma-se recorrer a um aspecto. Mas não é fácil lidar mesmo com esta manifestação menor.
Um aspecto de Kallyadranoch não aceitará ajudar seres que considere inferiores (ou seja, qualquer não dragão), exceto após súplicas ou oferendas adequadas. Em alguns casos, implorar será o bastante. Em outros, uma quantidade generosa de elogios deslavados a sua majestade. E quando tudo isso falhar, uma quantia razoável em ouro ou algum item precioso poderá atiçar sua ganância. Em geral, manter seu ego bem alimentado bastará para assegurar a obediência — ahem, a generosidade do dragão.
Orgulhoso em demasia, o aspecto de Kallyadranoch normalmente não aceita ser cavalgado, não sem a devida adulação ou suborno. Em combate, considera aqueles que o tenham conjurado como seus servos, atacando e matando todos que ameaçam “sua propriedade”.
Monstro (dragão) Grande
Iniciativa +10, Percepção +9, percepção às cegas, visão no escuro
Defesa 28, Fort +18, Ref +6, Von +12, redução de dano 5, resistência a magia +2
Pontos de Vida 280
Deslocamento 12m (8q), voo 18m (12q)
Corpo a Corpo Mordida +21 (2d6+14, 19) e duas garras +21 (1d8+14, 19).
Aura Aterradora Vontade CD 23 evita (Tormenta20, p. 311).
Escamas Multicor A essência dracônica do aspecto de Kallyadranoch muda constantemente. No início de cada rodada role 1d6 para determinar seu elemento. O aspecto é imune a dano do tipo de sua essência atual.
1) Ácido (vulnerável por 1d4 rodadas).
2) Eletricidade (ofuscado por 1d4 rodadas).
3) Fogo (em chamas).
4) Frio (lento por 1d4 rodadas).
5) Luz (cego por 1d4 rodadas).
6) Trevas (enjoado por 1d4 rodadas).
Sopro (Padrão) O aspecto usa um dos sopros abaixo; o dano e a condição causada pelo sopro são determinados pela essência dracônica atual do aspecto (Ref CD 23 reduz à metade e evita a condição). Recarga (movimento).
• Cone. Todas as criaturas em um cone de 9m sofrem 6d12 pontos de dano e a condição correspondente.
• Explosão. Criaturas em uma esfera de 6m de raio em alcance médio sofrem 6d12 pontos de dano e a condição correspondente.
• Linha. Criaturas em uma linha de 12m sofrem 6d12 pontos de dano e a condição correspondente. Cada vez que um dado de dano do sopro rola o valor máximo, role um dado extra e some ao total.
• Nuvem. Uma nuvem cobre um cubo de 6m de lado por 2 rodadas. Criaturas que comecem seus turnos na área sofrem 6d6 pontos de dano e a condição correspondente.
Varrer (Livre) Uma vez por rodada, quando o aspecto faz um ataque corpo a corpo e reduz os pontos de vida do alvo para 0 ou menos, pode realizar um ataque adicional contra outra criatura dentro do seu alcance.
For 8, Des 3, Con 6, Int 2, Sab 2, Car 4
Perícias Atletismo +13, Intimidação +11, Misticismo +9.
Tesouro Dobro e 3 peças de couro de dragão de tipos definidos aleatoriamente (CD 21 para extrair, veja Tormenta20, p. 312).
Parceiro No improvável caso de o aspecto considerar alguém digno de cavalgá-lo em combate, ele funciona como um parceiro dragão jovem mestre (veja p. 141).`
        },
        {
          chave: "aspectoDeKhalmyr", nome: "Aspecto de Khalmyr", nd: "5", tipo: "Humanoide (anão) Médio",
          papel: "solo",
          resumo: "O anão em armadura brilhante de mitral emana nobreza, empunhando um volumoso escudo com o símbolo sagrado de Khalmyr.",
          texto:
`Aspecto de Khalmyr ND 5
O anão em armadura brilhante de mitral emana nobreza, empunhando um volumoso escudo com o símbolo sagrado de Khalmyr. Quando decide falar, a voz é poderosa e determinada, mas suas palavras também soam intolerantes e um tanto teimosas.
Um aspecto de Khalmyr quase sempre tem a aparência de um paladino humano, anão ou suraggel — tão galante e brilhante em sua armadura completa que é quase impossível não reconhecê-lo como um soldado santo. A balança da justiça em seu símbolo sagrado estará em grande evidência no escudo ou na placa peitoral. Sua arma quase sempre é uma réplica da espada Rumnamm, seja em sua forma tradicional antiga, seja na versão mais recente combinada com arma de fogo. Ainda que o aspecto de Khalmyr se comporte sempre com retidão, às vezes falta-lhe a bondade e generosidade do Deus da Justiça. Será intolerante e inclemente com o menor ato criminoso, sempre apressado em julgar e proibir qualquer mínima infração da lei. Algo que aventureiros achariam normal e necessário, como subornar um guarda corrupto para que revele o cativeiro de uma vítima raptada, não será admitido em hipótese alguma. Pense em um paladino iniciante, ainda sem sabedoria para usar sua autoridade, e poderá ter uma ideia. Apesar de seu comportamento por vezes tacanho, o aspecto de Khalmyr será sempre bravo e valoroso em batalha, não hesitando em sacrificar a própria curta existência para garantir mais alguns momentos de segurança a seus aliados.
Humanoide (anão) Médio
Iniciativa +4, Percepção +6 (+8 em subterrâneo), visão no escuro
Defesa 24, Fort +11, Ref +5, Von +17, imunidade a acertos críticos e medo, redução de dano 5
Pontos de Vida 200
Deslocamento 6m (4q)
Corpo a Corpo Espada-calibre +17 x2 (15, 19).
À Distância Espada-calibre +17 (7, 19/x3).
✦ Cura pelas Mãos (Movimento) O aspecto de Khalmyr cura 5 pontos de vida por luz de uma criatura adjacente.
✦ Destruir o Crime (Livre) Uma vez por rodada, quanto o aspecto ataca em corpo a corpo um devoto que, a critério do mestre, seja culpado de um crime, ele recebe +5 no teste de ataque e +9 na rolagem de dano.
Espada-Calibre (Livre) Quando ataca em corpo a corpo com sua espada-calibre, o aspecto pode disparar sua bala para causar +7 pontos de dano de perfuração. Recarga (movimento).
Ordenar Sorte Uma vez por rodada, o aspecto pode escolher 10 em um teste qualquer.
For 5, Des 0, Con 5, Int 0, Sab 2, Car 5
Perícias Atletismo +9, Diplomacia +11, Intuição +11, Nobreza +6, Religião +11.
Equipamento Armadura completa, balas x20, escudo pesado, espada-calibre. Tesouro Padrão.
Parceiro O aspecto de Khalmyr é um parceiro veterano que fornece +3 na Defesa e imunidade a acertos críticos e medo. Ele apoia apenas personagens que considere dignos e que não tenham cometido crimes.`
        },
        {
          chave: "aspectoDeLinWu", nome: "Aspecto de Lin-Wu", nd: "4", tipo: "Espírito Grande",
          papel: "solo",
          subgrupo: "Habilidades de Dragões Celestiais",
          resumo: "A criatura de corpo serpentino é adornada com escamas brilhantes que reluzem à luz do sol.",
          texto:
`Aspecto de Lin-Wu ND 4
A criatura de corpo serpentino é adornada com escamas brilhantes que reluzem à luz do sol.
Sua cabeça é coroada por longas antenas parecidas com chifres, enquanto grandes mandíbulas revelam fileiras de dentes afiados. Olhos cintilantes como pérolas emanam sabedoria ancestral. Garras perigosas contrastam com as cristas membranosas, que ondulam conforme o dragão flutua.
Embora às vezes adote a aparência de qualquer das raças nativas no Império de Jade, este aspecto quase sempre se manifesta como um dragão celestial, criatura sagrada no reino divino de Lin-Wu. Seu tamanho pode variar conforme a missão, podendo ser pequeno como um gato, quando sua tarefa é apenas guiar e dar conselhos, ou grande como um cavalo, quando atua como montaria.
O aspecto de Lin-Wu se comporta com retidão absoluta e inflexível, guiado pelos fundamentos da honra praticada em Tamu-ra. Ele repreende a mínima falha de conduta, desde vestes desleixadas até gafes de etiqueta e demonstrações de desrespeito. Os desonrados são indignos de seu favor. Uma vez perdida, sua confiança só pode ser reconquistada com esforço extremo.
Embora seja capaz de lutar quando necessário, este aspecto prefere atuar como suporte, protegendo ou fortificando aqueles que considera mais honrados em batalha.
Espírito Grande
Iniciativa +6, Percepção +12, percepção às cegas, visão no escuro
Defesa 22, Fort +12, Ref +4, Von +16, imunidade a efeitos de atordoamento, eletricidade, medo, metabolismo, metamorfose e paralisia, redução de dano 5, resistência a magia +2, vulnerabilidade a ácido
Pontos de Vida 158
Deslocamento 12m (8q), voo 24m (16q)
Pontos de Mana 36
Corpo a Corpo Mordida +14 (1d8+7, 18) e duas garras +14 (1d6+5, 18).
Conduta Honrosa O aspecto de Lin-Wu emana uma aura de honra de 9m de raio. Criaturas à escolha do aspecto nessa área recebem +2 em testes de perícia, desde que ajam de forma exemplar (em termos de jogo, devem obedecer ao Código de Honra do cavaleiro, Código do Herói do paladino e às Obrigações & Restrições de Lin-Wu). Uma criatura que viole qualquer um desses códigos perde o bônus da aura e só pode voltar a recebê-lo (de qualquer aspecto de Lin-Wu) se realizar um rito (veja Religião em Tormenta20, p. 122) em nome de Lin-Wu.
Dragão Divino O aspecto possui todas as habilidades de dragões celestiais (veja o quadro).
Magias Como um clérigo de 6º nível (CD 20).
• Arma Mágica (Padrão, 5 PM) Até o fim da cena, uma arma adjacente se torna mágica, fornecendo +1 nos testes de ataque e rolagens de dano, e causando +1d6 pontos de dano de eletricidade.
• Bênção (Padrão, 3 PM) Aliados em alcance curto recebem +2 em testes de ataque e rolagens de dano até o fim da cena.
• Curar Ferimentos (Padrão, 5 PM) Uma criatura adjacente cura 6d8+6 PV.
• Oração (Padrão, 3 PM, sustentada) O aspecto e seus aliados em alcance curto recebem +2 em testes de perícias e rolagens de dano, e todos os inimigos em alcance curto recebem –2 em testes de perícias e rolagens de dano.
• Orientação (Padrão, 1 PM) Uma criatura em alcance curto pode rolar dois dados e ficar com o melhor resultado no próximo teste de perícia que fizer.
For 7, Des 2, Con 6, Int 4, Sab 6, Car 5
Perícias Conhecimento +10, Diplomacia +11, Intuição +12, Misticismo +10, Religião +12.
Tesouro Nenhum.
Parceiro O aspecto de Lin-Wu é um parceiro montaria (Grande) que fornece os benefícios a seguir. Seu deslocamento muda para voo 24m, você recebe +2 em Nobreza e Vontade e a habilidade Conduta Honrosa. Entretanto, se violar os códigos impostos por essa habilidade, você não pode mais usar esta montaria.`
        },
        {
          chave: "aspectoDeMarah", nome: "Aspecto de Marah", nd: "4", tipo: "Espírito (aggelus) Médio",
          papel: "solo",
          resumo: "Trajada em vestes sumárias e ousadas, capazes de envergonhar o mais desbocado menestrel, a dançarina aggelus irradia um magnetismo…",
          texto:
`Aspecto de Marah ND 4
Trajada em vestes sumárias e ousadas, capazes de envergonhar o mais desbocado menestrel, a dançarina aggelus irradia um magnetismo envolvente e cativante. O corpo esculpido e flexível se contorce conforme a música que ressoa de parte alguma. Sua presença aprisiona os olhares, impedindo os presentes de fazer ou desejar qualquer coisa exceto apreciá-la.
Invocar este ser pode ser mais perigoso do que se imagina! Aparentando ser uma mulher belíssima de qualquer raça (embora também exista em outras versões, conforme as preferências dos presentes), o aspecto de Marah será capaz de qualquer coisa — absolutamente qualquer coisa — para evitar um conflito. Vai encantar, seduzir, enganar, suplicar aos presentes. Vai fazer promessas ou oferecer recompensas irrecusáveis, mesmo sem possibilidade ou intenção real de cumpri-las, mas sem hesitar em realizar favores que estejam a seu alcance. Em último caso, chegará ao extremo de sacrificar a própria vida (o que, considerando sua existência breve, não chega a ser sacrifício tão grande assim).
Há quem acredite ser sensato conjurar um aspecto de Marah durante negociações delicadas, para evitar ataques traiçoeiros de qualquer um dos lados. Infelizmente, a bailarina celestial pode ser muitas coisas, exceto serena ou discreta. Não raras vezes, acaba mostrando interesse romântico por qualquer alvo presente, sempre preferindo aquele que pareça mais tímido ou indisposto.
Em situações de combate, pode atuar como excelente distração — mas também fará seu melhor para evitar feridos em qualquer dos lados do conflito, curando-os, bloqueando ataques, criando ilusões para distrair atacantes. Usará seus poderes para facilitar a fuga daqueles que desejarem fazê-lo. Também tentará atrair ataques inimigos para si mesma, o que infelizmente pode tornar sua presença breve demais.
Espírito (aggelus) Médio
Iniciativa +6, Percepção +13, visão no escuro
Defesa 21, Fort +5, Ref +12, Von +17, evasão
Pontos de Vida 132
Deslocamento 9m (6q)
Pontos de Mana 25
Aura de Marah O aspecto de Marah emana uma aura de calmaria de 9m de raio. Criaturas nessa área sofrem –5 em testes de ataque e em rolagens de dano.
Eclético (Reação, 1 PM) Quando vai fazer um teste de perícia, o aspecto recebe os benefícios de ser treinado nessa perícia para esse teste.
Presença Divina No início de seu turno, cada personagem em alcance curto do aspecto deve fazer um teste de Reflexos (CD 20). Se passar, desvia o olhar. Se falhar, fica fascinado. Se já estiver fascinado, fica enfeitiçado. Um personagem pode fechar os olhos como uma reação para ficar imune a esta habilidade, mas sofrerá os efeitos de estar cego por uma rodada.
Magias Como uma barda de 5º nível (CD 22). O custo de Luz é reduzido em –1 PM (já contabilizado).
• Criar Ilusão (Padrão, 5 PM) O aspecto pode criar ilusões com imagens e sons combinados em alcance médio. As ilusões podem ocupar até 6 cubos de 1,5m e também podem criar sensações táteis, como texturas. Criaturas que não saibam que essas são ilusões não conseguem atravessá-las. As ilusões ainda são incapazes de causar e sofrer dano (Von desacredita e permite atravessar as ilusões).
• Curar Ferimentos (Padrão, 4 PM) Uma criatura adjacente cura 5d8+5 PV.
• Luz (Padrão, 5 PM) Uma criatura adjacente é envolta por um halo de luz e recebe +10 em testes de Diplomacia e redução de trevas 10 até o fim da cena.
• Tranquilidade (Padrão, 4 PM) Até três criaturas em alcance curto têm sua atitude mudada para indiferente e não podem atacar ou realizar qualquer ação hostil (Von reduz para penalidade de –2 em testes de ataque) até o fim da cena. Ações hostis contra um alvo dissipam a magia.
For 0, Des 2, Con 1, Int 2, Sab 3, Car 5
Perícias Acrobacia +12, Atuação +16, Conhecimento +6, Diplomacia +13, Enganação +11, Intuição +9, Misticismo +6.
Equipamento Camisa bufante aprimorada, capa esvoaçante aprimorada, instrumento musical (varia por aspecto) aprimorado, sapatos de camurça aprimorados.
Tesouro Padrão.
Parceiro O aspecto de Marah é um parceiro veterano que fornece +2 em Atuação e Diplomacia e na CD de suas habilidades que causem as condições enfeitiçado, fascinado e pasmo sem causar dano. Também permite que você utilize Músicas de bardo sem precisar empunhar um instrumento. Caso você viole as Obrigações & Restrições de Marah, o aspecto deixa de apoiá-lo.`
        },
        {
          chave: "aspectoDeValkaria", nome: "Aspecto de Valkaria", nd: "5", tipo: "Humanoide (humana) Média",
          papel: "solo",
          resumo: "A jovem parece cheia de entusiasmo, ansiosa por uma aventura, mas igualmente despreparada.",
          texto:
`Aspecto de Valkaria ND 5
A jovem parece cheia de entusiasmo, ansiosa por uma aventura, mas igualmente despreparada. Em qualquer situação de perigo, atira-se de cabeça sem medir riscos. Em batalha, ousa as manobras mais arriscadas sem preocupação com segurança. E, quando está entediada, que quaisquer outros deuses nos ajudem, porque ela fará qualquer coisa para acabar com a paz! O aspecto de Valkaria nem sempre surge como resposta aos apelos de um devoto — pelo contrário, suas missões muitas vezes envolvem arrancar algum coitado de sua vida pacata para viver uma grande aventura! Foi o caso de Mateo Dasinus, jovem pescador de Callistia, arrastado para uma trama envolvendo a Libertação de Valkaria e a própria Tormenta. Este aspecto costuma ter a aparência de uma garota afoita, em vestes que sugerem ser uma duelista ou mercenária urbana. Tem confiança total nas próprias capacidades — confiança que muitas vezes se mostra excessiva, não justificada... Suas habilidades equivalem as de um aventureiro humano mediano. Ainda assim, fala e age como se pudesse matar o maior dos dragões. Em situações exigindo furtividade, será quase impossível evitar que suas bravatas ruidosas destruam qualquer chance de ação sorrateira.
Cabe ao aspecto de Valkaria fomentar aventuras, transformando pessoas comuns em heróis e levando heróis aonde houver desafios. Mas não é raro vê-lo causando mais problemas do que ajuda a solucionar.
Humanoide (humana) Média
Iniciativa +12, Percepção +4
Defesa 24, Fort +11, Ref +17, Von +5, evasão, imunidade a efeitos de movimento e medo, redução de dano 5, resistência a magia +2
Pontos de Vida 180
Deslocamento 12m (8q), sem redução por terreno difícil
Corpo a Corpo Florete x2 +18 (1d6+8, 15/x3).
Almejar o Impossível Quando o aspecto de Valkaria faz um teste de perícia, um resultado de 19 ou mais no dado sempre é um sucesso, não importando o valor a ser alcançado.
Arrumar Encrenca O aspecto pode passar por espaços ocupados por inimigos sem redução em seu deslocamento e sem necessidade de testes de Acrobacia.
Bloqueio Contundente (Reação) Uma vez por rodada, quando é atingido por um ataque corpo a corpo, o aspecto pode fazer um teste de ataque. Se o resultado do teste for maior que o do oponente, evita o ataque e causa 2d6 pontos de dano de perfuração a ele.
Esgrima Acrobática (Movimento) O aspecto percorre até metade de seu deslocamento e, até o final do turno, recebe +5 em testes de ataque, em rolagens de dano e na margem de ameaça.
Estocada Oportunista (Livre) Uma vez por rodada, quando passa por um espaço ocupado por um inimigo, o aspecto pode fazer um ataque corpo a corpo contra ele.
For 2, Des 6, Con 4, Int 2, Sab 0, Car 3
Perícias Acrobacia +12, Atletismo +8.
Equipamento Couraça sob medida, florete certeiro preciso, sapato de camurça aprimorado. Tesouro Nenhum.
Parceiro O aspecto de Valkaria é um parceiro veterano que fornece +2 em Acrobacia e em testes opostos e de resistência contra efeitos de movimento. Também permite que você use a habilidade Bloqueio Contundente (veja acima; se evitar o ataque, você causa dano igual ao dano básico de sua arma). Caso você viole as Obrigações & Restrições de Valkaria, o aspecto deixa de apoiá-lo.`
        },
      ],

      regras: [
        { titulo: "Aspectos dos Deuses",
          texto:
`Dispondo de tantos devotos em todos os pontos de Arton, pode parecer estranho que os deuses necessitem de ainda mais agentes para cuidar de seus assuntos. A verdade é que nem todas as tarefas divinas cabem a servos mortais — algumas, por demandar muito, e outras, pouco.

As mais poderosas criaturas a serviço dos deuses são seus avatares. Um avatar é a versão encarnada de uma divindade, uma parte de sua essência. Equiparamse, em poder, aos maiores heróis de Arton. Mas a manifestação de um avatar é evento raro, reservado apenas a situações extremas — porque um deus investe neles parte significativa de sua força vital, e sua eventual perda pode enfraquecer a própria divindade. A queda de Glórienn e a derrota de seu avatar nas mãos de Thwor Ironfist não foram eventos sem ligação.

Quando um servo mortal não basta e a convocação de um avatar seria imprudente, entram em cena os aspectos dos deuses. Assim como um avatar, um aspecto é a encarnação de sua divindade, mas usando uma quantidade de poder muito menor. Em geral são invocados por curtos períodos para realizar tarefas simples, porém importantes — tipicamente lutar. Um aspecto pode surgir, por exemplo, atendendo à súplica de um clérigo durante um combate atroz.

Embora alguns estudiosos os descrevam como “avatares menores”, isso não é totalmente correto. Um aspecto dos deuses é, em quase todos os sentidos, uma criatura mortal de existência temporária. Tem a mesma aparência da divindade original (ou uma de suas aparências), mas pode apresentar pequenas diferenças; ou estar totalmente disfarçado, conforme o propósito da missão. Ao contrário de avatares, um deus pode manifestar quantos aspectos quiser (mas é raro designar mais de um para cada tarefa).

Aspectos normalmente têm tamanho humano, embora alguns sejam maiores. Usam vestes e equipamentos mundanos (mas frequentemente de qualidade superior) que desaparecem quando afastados do aspecto por mais de um dia.

Aspectos podem se manifestar naturalmente durante eventos grandiosos — por exemplo, uma batalha entre exércitos de devotos —, ou então ser invocados a partir de rituais complexos. Diferente de outras criaturas conjuradas, um aspecto não obedece necessariamente a seu invocador; ele o faz apenas se assim quiser, agindo conforme seus próprios objetivos.

A personalidade dos aspectos é um tópico muito intrigante. Eles pensam e agem como seus deuses originais, mas são mais limitados em pensamento, e muito exagerados em comportamento — chegam a ser quase caricaturas. Um aspecto de Arsenal pode se portar como um guerreiro feroz e descuidado, sem a inteligência estratégica do Deus da Guerra. Um aspecto de Khalmyr pode ser um anão paladino de mente estreita, atacando qualquer monstro à primeira vista, e assim por diante. Talvez por sua existência tão breve, aspectos são muito afoitos, impetuosos, ansiosos para agir. E podem, sim, cometer erros.

Outros Aspectos. Os aspectos apresentados aqui, e também em outros grupos, são apenas aqueles mais comumente manifestados em situações de batalha. Uma mesma divindade pode ter aspectos muito diferentes. O mestre é livre para construir quaisquer NPCs ou criaturas que julgar interessantes, conforme a personalidade e os objetivos de cada deus.` },
        { titulo: "Aspectos e Avatares",
          texto:
`Cada deus do Panteão tem apenas um avatar — uma forma poderosa, que a divindade utiliza para descer ao mundo material e lidar com grandes problemas e crises. Glórienn veio em forma de avatar para enfrentar Thwor Khoshkothruk, Megalokk enviou um avatar (o dragão Morte Branca) para devastar o Reino das Torres em Moreania. O avatar pode surgir com diferentes formas físicas, mas suas capacidades e poder são constantes. O avatar é uma materialização de todas as facetas do deus. Essencialmente, uma versão muito menos poderosa (mas ainda magnífica) da própria divindade. Já aspectos são partes de deuses. Alguns podem ser versões da representação típica do deus — Khalmyr enviou um aspecto para guiar a Paladina em Nova Malpetrim. Outros podem ter formas totalmente diversas: Khalmyr pode surgir na forma de um cubo flutuando no ar, de um juiz com um púlpito, de pura luz radiante... Outros ainda podem ou não lembrar fisicamente as representações da divindade, mas são a encarnação de apenas uma de suas facetas. Por exemplo, quando Khalmyr se manifesta na forma de um cubo, ele é apenas ordem e simetria, não justiça ou bondade. Aspectos podem ter autonomia e consciência plenas (às vezes até parecendo diferir do deus), ou podem ser conceitos materializados, incapazes de tomar decisões ou mesmo agir fora de seu escopo. Diz-se que Keenn, o antigo Deus da Guerra, surgiu na forma de um aspecto para uma clériga na estrada. O aspecto era um pistoleiro que estava lá apenas para cobrar de sua devota um preço alto — a perda de um olho — pelas façanhas que ela pretendia realizar. O aspecto tinha seu próprio nome e comportamento, mas não podia fazer nada exceto encontrá-la na estrada e arrancar seu olho. Por isso, embora avatares sejam sempre poderosos, aspectos variam muito em poder. Um mero mascate pode ser um aspecto de Nimb; um pássaro flamejante capaz de imensa destruição pode ser um aspecto de Thyatis.
Tudo depende do propósito do aspecto e da(s) faceta(s) do deus que ele personifica. A única constante é: quando o aspecto de um deus está presente, coisas extraordinárias tendem a acontecer...` },
        { titulo: "Invocando Aspectos",
          texto:
`Sob certas condições, é possível que um devoto consiga invocar um aspecto na esperança de que ele possa auxiliá-lo. Essa é uma tarefa complexa, que exige habilidade e recursos, e nem sempre tem o resultado esperado. Invocar um aspecto é um ritual especial, que só pode ser realizado por um devoto da divindade em questão que seja treinado em Religião e tenha o poder Celebrar Ritual. Para realizar o ritual, o celebrante deve gastar 1 hora, 10 PM e T$ 3.000 em materiais litúrgicos apropriados à divindade. Então deve passar em um teste de Religião (CD 25 + ND do aspecto invocado). Ao executar o ritual, o celebrante pode empregar até três auxiliares, que não precisam ser devotos. Cada auxiliar faz um teste de Religião para ajudar (Tormenta20, p. 221) o teste do celebrante e, se for devoto da divindade em questão, reduz o custo do ritual em –1 PM. Em um ritual bem-sucedido, o aspecto é invocado. Sua atitude inicial depende da divindade que ele representa e fica a critério do mestre. Da mesma forma, o tempo de permanência do aspecto depende da capacidade do celebrante em persuadilo a ajudar. Um ritual falho não causa maiores problemas, além do gasto dos PM e dos materiais. Entretanto, em um resultado 1 natural no teste de Religião, o ritual foi um desastre: o celebrante pode inadvertidamente ter ofendido o seu deus ou invocado outro aspecto (que será hostil ao celebrante e a seus aliados). A critério do mestre, um deus pode exigir custos específicos para o ritual (que serão de conhecimento do celebrante). Deuses malignos, em especial, podem exigir sacrifícios em troca de sua atenção.` },
        { titulo: "Habilidades de Dragões Celestiais",
          texto:
`• Magia Celestial. Podem lançar magias sem palavras mágicas, gestos, concentração ou componentes materiais.
• Metamorfose Celestial (Completa). Podem se transformar em outras criaturas, como a magia Metamorfose (mas sem limitação para tamanhos menores que os seus). Um dragão morto reverte a sua forma original.
• Presença Celestial. Uma criatura que comece seu turno em alcance longo de um dragão celestial adulto ou mais velho fica apavorada (se tiver 4 níveis ou menos) ou abalada (se tiver 5 níveis ou mais) até o fim da cena. Criaturas com um código de conduta (como cavaleiros e paladinos) ou devotos de Khalmyr ou Lin-Wu em vez disso ficam fascinadas, independente de seu nível (Von evita em todos os casos). Passar no teste de resistência deixa imune a esta habilidade por um dia.` },
      ],
    },

    // ── 😇 CELESTIAIS ──────────────────────────────
    {
      chave: "celestiais", nome: "Celestiais", icone: "😇", cor: "#6a7fa8",
      intro: "Os anjos do Panteão: servos e soldados dos deuses bondosos, que só pisam em Arton quando a intervenção divina é inevitável. Vêm junto os inevitáveis, construtos celestiais forjados para caçar quem viola a ordem natural.",
      fichas: [
        {
          chave: "pilly", nome: "Pilly", nd: "3", tipo: "Espírito (celestial) Minúsculo",
          papel: "lacaio",
          resumo: "Em um primeiro momento, a criaturinha lembra uma fada, com suas quatro finas asas de inseto que brilham ao sol com as cores do arco-íris.",
          texto:
`Pilly ND 3
Em um primeiro momento, a criaturinha lembra uma fada, com suas quatro finas asas de inseto que brilham ao sol com as cores do arco-íris. Tem cabelo farto, em tons metálicos de prata e ouro. Veste uma toga simples, mas graciosa, feita de folhas e pétalas. Pilly estão entre os menores celestiais conhecidos, e também entre os mais fracos. Eram muito comuns e numerosos no antigo Reino de Glórienn; hoje são poucos, encontrados nos reinos de Allihanna, Marah e Lena, além de alguns pontos de Arton. Não existem para lutar, mas para alegrar e divertir: percorrem o mundo procurando aqueles em desalento, como crianças assustadas, sonhadores frustrados, artistas deprimidos, parentes ou amantes saudosos, e outros que poderiam se beneficiar de um sorriso ou risada. Por seu tamanho e fragilidade, os pilly costumam evitar qualquer confronto: diante de algum perigo, fogem o mais rápido possível para tentar alertar celestiais mais poderosos. São às vezes empregados por clérigos ou por outros celestiais como mensageiros, embora seja necessário ter certa paciência, pois os pilly tendem a perder o foco e esquecer suas tarefas. Alguns também aceitam acompanhar conjuradores divinos para ajudá-los (ou tentar diverti-los quando os consideram sérios demais).
Espírito (celestial) Minúsculo
Iniciativa +7, Percepção +3, visão no escuro
Defesa 18, Fort +8, Ref +14, Von +5
Pontos de Vida 22
Deslocamento Voo 18m (12q)
Raio Iridescente (Padrão) O pilly dispara um raio colorido em criaturas em alcance médio a sua escolha. Cada criatura sofre 2d4+6 pontos de dano de eletricidade (Ref CD 18 reduz à metade).
Sono Tranquilo (Padrão) O pilly emana um pó fino de suas asas, que cobre um raio de 9m. Criaturas à escolha dele nessa área ficam inconscientes e caídas (Fort CD 18 reduz para exaustas por 1d4 rodadas). Cansaço.
Velocidade Celestial (Livre) O pilly aumenta seu deslocamento para 24m por 1 rodada, mas nesse turno só pode executar ações de movimento. Ele só pode usar esta habilidade no início do seu turno.
For –3, Des 4, Con –1, Int 1, Sab 0, Car 3
Perícias Acrobacia +9, Conhecimento +6, Diplomacia +8.
Tesouro Metade.
Parceiro Um pilly parceiro fornece os benefícios a seguir. Iniciante: reduz o custo de magias divinas de encantamento em -1 PM. Veterano: como acima, e você ganha deslocamento de voo 9m. Mestre: como acima, mas muda a redução de custode magias de encantamento para –2 PM.`
        },
        {
          chave: "luminar", nome: "Luminar", nd: "–", tipo: "Espírito (celestial) Minúsculo",
          papel: "especial",
          resumo: "A manifestação divina se revela como uma pequena esfera flutuante de luz branca e pura, mais brilhante que uma tocha.",
          texto:
`Luminar ND –
A manifestação divina se revela como uma pequena esfera flutuante de luz branca e pura, mais brilhante que uma tocha. Ela fala com voz leve, musical e melodiosa. Luminares são celestiais muito amistosos e bem-intencionados, sempre dispostos a ajudar da melhor forma que puderem. Normalmente fazem isso lançando bênçãos e magias de cura, ou trazendo inspiração e esperança. Falam todos os idiomas, sendo capazes de se comunicar com qualquer criatura.
Embora se esforcem para impedir os planos dos demônios, luminares quase nunca entram em combate — sua própria aura sagrada muitas vezes basta para desencorajar os malignos. Quando isso não basta, usam raios de luz contra os oponentes. E, em casos extremos, podem se sacrificar em uma detonação luminosa para proteger heróis valorosos.
Espírito (celestial) Minúsculo
Iniciativa +12, Percepção +8, visão no escuro
Defesa —, Fort —, Ref —, Von —, imunidade a dano (exceto trevas) e a efeitos de sentidos
Pontos de Vida —
Deslocamento Voo 9m (6q)
✦ Abençoar (Padrão) Criaturas à escolha do luminar em alcance curto recebem +1 em testes de ataque e de resistência até o fim da cena.
✦ Aliviar (Padrão) O luminar emite uma luz suave que cura 2d8+2 PV de uma criatura em alcance curto.
Sacrifício (Completa) O luminar se transforma em uma luz forte que aquece um raio de 9m. Criaturas escolhidas pelo luminar nessa área curam 6d8+6 pontos de vida. Após usar esta habilidade, o luminar desaparece para sempre.
Ser de Luz O luminar não tem corpo físico e sua manifestação no plano material é apenas uma luz que varia de intensidade, mas que ilumina um raio de 9m. Ele é imune a todos os tipos de dano, exceto trevas, e é destruído quando sofre dano desse tipo.
For —, Des 5, Con —, Int –2, Sab 1, Car 1
Perícias Diplomacia +8, Intuição +8.
Tesouro Nenhum.
Parceiro Um luminar parceiro fornece os benefícios a seguir. Iniciante: uma vez por rodada, você pode gastar 1 PM para curar 2d4 PV por luz ou causar 2d4 pontos de dano não letal de luz em uma criatura em alcance curto. Veterano: como acima, mas você também pode gastar 2 PM para conceder um bônus de +2 em seus testes de ataque e de resistência, e nos de seus aliados em alcance curto, por 1 rodada. Mestre: como acima, mas você pode gastar 3 PM para curar 6d4 PV ou causar 6d4 pontos de dano não letal de luz.`
        },
        {
          chave: "protetor", nome: "Protetor", nd: "7", tipo: "Espírito (celestial) Médio",
          papel: "solo",
          resumo: "Ele tem a aparência de um humano, embora claramente não o seja.",
          texto:
`Protetor ND 7
Ele tem a aparência de um humano, embora claramente não o seja. Sua aura transmite uma sensação de confiança e conforto. Veste uma toga longa e esvoaçante, presa na cintura por uma corda, deixando braços e pés nus. Empunha uma maça dourada e um escudo redondo, que exibe um símbolo sagrado. Mas são as grandes asas emplumadas, brancas e luminosas, que mais evidenciam sua verdadeira natureza.
O celestial protetor, também conhecido como “anjo da guarda”, tem aparência humanoide — podendo ser humano, elfo, anão, hynne ou outra raça, conforme aqueles que esteja protegendo.
Protetores estão entre os anjos mais atuantes em Arton, buscando defender os fracos e inocentes contra as forças do mal, sobretudo demônios e outros seres malignos. Muitas vezes agem sozinhos, a mando de seus criadores, mas também podem se aliar a outros campeões do bem em momentos de necessidade. Não é raro um protetor recrutar heróis para ajudá-lo a enfrentar desafios que ele próprio não consiga vencer. Protetores são combatentes inflamados, avançando contra os inimigos com determinação. Quando atuam em grupo, formam grandes paredes de escudos em pleno ar, capazes de amedrontar o mais feroz adversário.
Espírito (celestial) Médio
Iniciativa +9, Percepção +10, visão no escuro
Defesa 32, Fort +18, Ref +9, Von +14, redução de dano 10, resistência a magia +3
Pontos de Vida 280
Deslocamento 9m (6q), voo 18m (12q)
Corpo a Corpo Maça +24 (2d8+20, 19, mais 4d6+10 luz).
✦ Aura Protetora (Movimento) Aliados do protetor em alcance curto recebem +2 na Defesa e em testes de resistência até o fim da cena.
Rasante Quando um protetor executa uma investida voando contra um inimigo no solo, seu ataque causa +4d6 pontos de dano de luz.
Voo em Formação Se dois ou mais protetores estiverem voando e adjacentes entre si, cada um deles recebe +2 em testes de ataque e na Defesa e não pode ser flanqueado.
For 5, Des 2, Con 4, Int 1, Sab 3, Car 4
Perícias Diplomacia +13, Intuição +12, Religião +12.
Equipamento Escudo pesado, maça banhada a ouro. Tesouro Padrão.`
        },
        {
          chave: "shiradi", nome: "Shiradi", nd: "7", tipo: "Espírito (celestial) Grande",
          papel: "solo",
          resumo: "Com o dobro da altura de um homem, a criatura lembra um grande felino humanoide — de postura bípede, mas com cabeça, garras e cauda de leão.",
          texto:
`Shiradi ND 7
Com o dobro da altura de um homem, a criatura lembra um grande felino humanoide — de postura bípede, mas com cabeça, garras e cauda de leão. Tem músculos poderosos, pelagem dourada que brilha como o sol e grandes asas emplumadas. Veste apenas calças de tecido e braçadeiras. Apesar do aspecto feral, tem porte majestoso e olhar de superioridade.
Shiradi são celestiais campeões da liberdade.
Percorrem os planos guerreando contra tiranos, enfrentando regimes ditatoriais e combatendo a escravidão. Um de seus principais objetivos é libertar prisioneiros de demônios, dragões e outros monstros poderosos: com esse propósito, é bem possível que procurem aventureiros para ajudá-los.
Diferente do que sua aparência animalesca sugere, shiradi são observadores e planejadores cautelosos, preferindo ter estratégias claras antes de agir. Escolhem táticas para surpreender e assustar seus oponentes, especialmente aqueles que esperam enfrentar “apenas um celestial solitário”. Contudo, assim como os gatos, também têm certa tendência de “brincar” um pouco com suas presas antes de abatê-las. Costumam zombar dos inimigos encurralados, como uma forma de mostrar que estão em vantagem e oferecer rendição.
Shiradi também gostam de anunciar sua presença de lugares altos, da forma mais dramática e teatral possível.
Espírito (celestial) Grande
Iniciativa +8, Percepção +10, faro, visão no escuro
Defesa 29, Fort +14, Ref +19, Von +7, evasão aprimorada, imunidade a efeitos de metabolismo e de movimento e surpreendido, redução de dano 10
Pontos de Vida 299
Deslocamento 9m (6q), voo 15m (10q)
Corpo a Corpo Garras x2 +26 (2d12+18, 19).
Brincar com a Comida (Padrão) O shiradi faz dois ataques de garra contra uma criatura. Esses ataques causam dano não letal e, se ambos acertarem, a criatura é arremessada 6m em uma direção à escolha do shiradi e fica confusa por 1 rodada (Fort CD 24 reduz o arremesso para 3m e evita a condição).
Entrada Majestosa Quando uma criatura vê o shiradi pela primeira vez na cena, fica fascinada por 1d4+1 rodadas (Von CD 24 reduz para 1 rodada).
Presença Libertadora Criaturas em alcance curto do shiradi recebem +5 em testes contra efeitos de movimento.
Rugido Divino (Padrão) Criaturas em alcance curto do shiradi ficam apavoradas por 1d4 rodadas e depois abaladas (Von CD 24 reduz para abaladas por 1d4+1 rodadas). Recarga (movimento).
For 4, Des 3, Con 4, Int 2, Sab 1, Car 6
Perícias Atuação +13 (+23 em locais elevados), Furtividade +12, Investigação + 9, Intimidação +13.
Equipamento Símbolo sagrado de Valkaria. Tesouro Nenhum.`
        },
        {
          chave: "fado", nome: "Fado", nd: "8", tipo: "Construto (inevitável) Grande",
          papel: "solo",
          subgrupo: "Habilidades de Inevitáveis",
          resumo: "Visto à distância, poderia muito bem ser um guerreiro tapistano de loriga dourada, manto tinto e espada em riste.",
          texto:
`Fado ND 8
Visto à distância, poderia muito bem ser um guerreiro tapistano de loriga dourada, manto tinto e espada em riste. Quando chega mais perto, contudo, percebe-se não ser feito de carne e sangue — mas de pistões, placas, engrenagens e outras partes mecânicas. Ele empunha uma espada brilhante e, entre as frestas de seus mecanismos, emana pura luz divina.
Inevitáveis são construtos celestiais forjados pelos deuses para encontrar e punir transgressores. Existem para caçar aqueles que violam a ordem natural — sendo essa “ordem natural” diferente para cada divindade. Portanto, embora sejam mais frequentemente criados por Khalmyr, Tanna-Toh e Azgher, outros deuses também podem forjá-los de acordo com suas próprias metas e objetivos.
Desde quando é criado até sua destruição, um inevitável é obcecado com completar sua tarefa, não importando o quão perigoso ou furtivo seja o infrator. Sua caçada talvez se arraste por meses ou anos, talvez atravesse continentes e mares, até mesmo reinos divinos. Não importa. Enquanto viver, o construto sagrado vai perseguir seu alvo.
A punição normalmente é a morte do transgressor. Contudo, o construto também pode obrigar o culpado a corrigir seu erro, talvez cumprindo uma missão em nome de sua divindade. Embora obstinado, um inevitável não é inconsequente ou suicida — ele persegue seu alvo de forma inteligente, calculada, atacando no momento oportuno. Com a paciência dos seres imortais, espera pelo tempo que for necessário até que o alvo se revele ou fique vulnerável. Inevitáveis existem em vários tipos e com várias funções. O fado, o mais comum, lembra um centauro e costuma rastrear criminosos fugitivos. O probo, um soldado humanoide, persegue aqueles que descumprem grandes promessas, acordos e tratados. Por fim, os poderosos parcus caçam aqueles que tentam trapacear a morte, como necromantes, vampiros, liches e outros mortos-vivos (sim, isso inclui osteon que venham a se tornar excessivamente notórios).
Conta-se histórias de inevitáveis que, após cumprirem sua missão, foram destituídos de suas habilidades mais poderosas — e então deixados livres para desfrutar do resto de suas existências. Alguns seguiram como devotos de sua divindade criadora, ou se tornaram aventureiros, ou ambos.
Construto (inevitável) Grande
Iniciativa +10, Percepção +13, visão no escuro
Defesa 31, Fort +21, Ref +8, Von +15, cura acelerada 5, resistência a dano 10, imunidade a fogo, resistência a magia +5
Pontos de Vida 330
Deslocamento 12m (8q), voo 24m (16q)
Corpo a Corpo Corrente de espinhos sagrada x2 +23 (1d10+17, 19, mais 2d6 fogo).
Derrubar e Desarmar (Livre) Se o fado acerta um ataque de corrente de espinhos, pode fazer a manobra derrubar ou a manobra desarmar (teste +29).
For 4, Des 2, Con 4, Int —, Sab 3, Car –2
Perícias Religião +11, Sobrevivência +11.
Equipamento Corrente de espinhos sagrada. Tesouro Nenhum.`
        },
        {
          chave: "probo", nome: "Probo", nd: "11", tipo: "Construto (inevitável) Médio",
          papel: "especial",
          subgrupo: "Habilidades de Inevitáveis",
          resumo: "Visto à distância, poderia muito bem ser um guerreiro tapistano de loriga dourada, manto tinto e espada em riste.",
          texto:
`Probo ND 11
Visto à distância, poderia muito bem ser um guerreiro tapistano de loriga dourada, manto tinto e espada em riste. Quando chega mais perto, contudo, percebe-se não ser feito de carne e sangue — mas de pistões, placas, engrenagens e outras partes mecânicas. Ele empunha uma espada brilhante e, entre as frestas de seus mecanismos, emana pura luz divina.
Inevitáveis são construtos celestiais forjados pelos deuses para encontrar e punir transgressores. Existem para caçar aqueles que violam a ordem natural — sendo essa “ordem natural” diferente para cada divindade. Portanto, embora sejam mais frequentemente criados por Khalmyr, Tanna-Toh e Azgher, outros deuses também podem forjá-los de acordo com suas próprias metas e objetivos.
Desde quando é criado até sua destruição, um inevitável é obcecado com completar sua tarefa, não importando o quão perigoso ou furtivo seja o infrator. Sua caçada talvez se arraste por meses ou anos, talvez atravesse continentes e mares, até mesmo reinos divinos. Não importa. Enquanto viver, o construto sagrado vai perseguir seu alvo.
A punição normalmente é a morte do transgressor. Contudo, o construto também pode obrigar o culpado a corrigir seu erro, talvez cumprindo uma missão em nome de sua divindade. Embora obstinado, um inevitável não é inconsequente ou suicida — ele persegue seu alvo de forma inteligente, calculada, atacando no momento oportuno. Com a paciência dos seres imortais, espera pelo tempo que for necessário até que o alvo se revele ou fique vulnerável. Inevitáveis existem em vários tipos e com várias funções. O fado, o mais comum, lembra um centauro e costuma rastrear criminosos fugitivos. O probo, um soldado humanoide, persegue aqueles que descumprem grandes promessas, acordos e tratados. Por fim, os poderosos parcus caçam aqueles que tentam trapacear a morte, como necromantes, vampiros, liches e outros mortos-vivos (sim, isso inclui osteon que venham a se tornar excessivamente notórios).
Conta-se histórias de inevitáveis que, após cumprirem sua missão, foram destituídos de suas habilidades mais poderosas — e então deixados livres para desfrutar do resto de suas existências. Alguns seguiram como devotos de sua divindade criadora, ou se tornaram aventureiros, ou ambos.
Construto (inevitável) Médio
Iniciativa +7, Percepção +13, visão no escuro
Defesa 40, Fort +16, Ref +9, Von +22, cura acelerada 5, imunidade a frio, redução de dano 10, resistência a magia +5
Pontos de Vida 550
Deslocamento 9m (6q)
Pontos de Mana 58
Corpo a Corpo Espada bastarda sagrada x3 +26 (1d10+23, 19, mais 2d6 frio).
Analisar Suspeito (Completa) O probo analisa uma criatura em alcance médio. Até o fim do dia, ele recebe +3 em testes de perícia contra ela.
Ler Seus Direitos (Movimento, 3 PM) Uma criatura em alcance curto fica pasma por 1 rodada, ou atordoada por 1 rodada se for a criatura que o probo deve caçar (Fort CD 31 evita).
Negar Recurso (Movimento, 3 PM) Uma criatura em alcance médio do probo faz um teste de Vontade (CD 31). Se falhar, não pode utilizar uma habilidade à escolha do probo até o fim da cena (para esse efeito, cada magia da criatura conta como uma habilidade). Uma mesma criatura só pode ter uma habilidade negada por vez.
Magias Como um clérigo de 11º nível (CD 31).
• Disfarce Ilusório (Padrão, 3 PM) Até o fim da cena, o probo muda a própria aparência, incluindo seu equipamento e os odores e as sensações que transmite. Isso afeta altura, peso, tom de pele, cor de cabelo, timbre de voz etc. Ele recebe +20 em testes de Enganação para disfarce (Von desacredita).
• Dissipar Magia (Padrão, 3 PM) O probo escolhe uma criatura, objeto ou esfera de 3m em alcance médio e faz um teste de Misticismo. Todas as magias nesse alvo com CD igual ou menor que o resultado do teste são dissipadas.
• Imobilizar (Padrão, 7 PM) Uma criatura em alcance curto fica paralisada (Von muda para lenta). A cada rodada, a vítima pode gastar uma ação completa para fazer um novo teste de Vontade. Se passar, liberta-se do efeito.
• Silêncio (Padrão, 3 PM, sustentada) O probo cria uma esfera de 6m em alcance médio. Criaturas nessa área ficam surdas e não podem lançar magias.
For 5, Des 2, Con 3, Int 0, Sab 3, Car 1
Perícias Conhecimento +9, Diplomacia +10, Intuição +10, Misticismo +9, Nobreza +9, Religião +10.
Equipamento Espada bastarda sagrada, loriga segmentada.
Tesouro Nenhum.`
        },
        {
          chave: "parcus", nome: "Parcus", nd: "14", tipo: "Construto (inevitável) Médio",
          papel: "solo",
          subgrupo: "Habilidades de Inevitáveis",
          resumo: "Visto à distância, poderia muito bem ser um guerreiro tapistano de loriga dourada, manto tinto e espada em riste.",
          texto:
`Parcus ND 14
Visto à distância, poderia muito bem ser um guerreiro tapistano de loriga dourada, manto tinto e espada em riste. Quando chega mais perto, contudo, percebe-se não ser feito de carne e sangue — mas de pistões, placas, engrenagens e outras partes mecânicas. Ele empunha uma espada brilhante e, entre as frestas de seus mecanismos, emana pura luz divina.
Inevitáveis são construtos celestiais forjados pelos deuses para encontrar e punir transgressores. Existem para caçar aqueles que violam a ordem natural — sendo essa “ordem natural” diferente para cada divindade. Portanto, embora sejam mais frequentemente criados por Khalmyr, Tanna-Toh e Azgher, outros deuses também podem forjá-los de acordo com suas próprias metas e objetivos.
Desde quando é criado até sua destruição, um inevitável é obcecado com completar sua tarefa, não importando o quão perigoso ou furtivo seja o infrator. Sua caçada talvez se arraste por meses ou anos, talvez atravesse continentes e mares, até mesmo reinos divinos. Não importa. Enquanto viver, o construto sagrado vai perseguir seu alvo.
A punição normalmente é a morte do transgressor. Contudo, o construto também pode obrigar o culpado a corrigir seu erro, talvez cumprindo uma missão em nome de sua divindade. Embora obstinado, um inevitável não é inconsequente ou suicida — ele persegue seu alvo de forma inteligente, calculada, atacando no momento oportuno. Com a paciência dos seres imortais, espera pelo tempo que for necessário até que o alvo se revele ou fique vulnerável. Inevitáveis existem em vários tipos e com várias funções. O fado, o mais comum, lembra um centauro e costuma rastrear criminosos fugitivos. O probo, um soldado humanoide, persegue aqueles que descumprem grandes promessas, acordos e tratados. Por fim, os poderosos parcus caçam aqueles que tentam trapacear a morte, como necromantes, vampiros, liches e outros mortos-vivos (sim, isso inclui osteon que venham a se tornar excessivamente notórios).
Conta-se histórias de inevitáveis que, após cumprirem sua missão, foram destituídos de suas habilidades mais poderosas — e então deixados livres para desfrutar do resto de suas existências. Alguns seguiram como devotos de sua divindade criadora, ou se tornaram aventureiros, ou ambos.
Construto (inevitável) Médio
Iniciativa +10, Percepção +15, visão no escuro
Defesa 44, Fort +22, Ref +14, Von +28, cura acelerada 10, imunidade a eletricidade e trevas, resistência a magia +5, redução de dano 15
Pontos de Vida 700
Deslocamento 12m (8q)
Corpo a Corpo Dois punhos trovejantes x2 +34 (2d8+12 impacto, 19/x3, mais 2d8 eletricidade).
Aura de Luz No início de cada turno do parcus, todas as criaturas em um raio de 9m dele sofrem 8d6 pontos de dano de luz.
Aura Antimagia O parcus está permanentemente cercado por uma aura de 9m de raio que gera um efeito semelhante ao da magia Campo Antimagia.
Corrente de Relâmpagos (Padrão) Criaturas à escolha do parcus em alcance médio sofrem 8d8 pontos de dano de eletricidade e 8d8 pontos de dano de luz (Ref CD 37 reduz à metade). Recarga (movimento).
Sentença de Re-Morte (Padrão) Uma vez por cena, o parcus marca uma criatura em alcance curto. Até o fim da cena, essa criatura não pode curar pontos de vida nem receber PV temporários e, se for um morto-vivo, fica alquebrada (Fort CD 37 evita o efeito sobre pontos de vida e reduz a condição para esmorecido).
Vingador Celestial (Reação) Quando é reduzido a 350 PV ou menos, até o fim da cena o parcus recebe deslocamento de voo 12m, sua cura acelerada aumenta para 15, seu dano de luz se torna maximizado e a área de suas auras aumenta para 30m.
For 7, Des 3, Con 4, Int 0, Sab 4, Car 3
Perícias Conhecimento +11, Intuição +20, Misticismo +11, Sobrevivência +15.
Tesouro Nenhum.`
        },
        {
          chave: "pegaso", nome: "Pégaso", nd: "3", tipo: "Espírito Grande",
          papel: "solo",
          resumo: "Surge diante de vocês um magnífico cavalo mágico com asas, branco e brilhante como a lua cheia.",
          texto:
`Pégaso ND 3
Surge diante de vocês um magnífico cavalo mágico com asas, branco e brilhante como a lua cheia. Sua aura de nobreza e bondade deixa claro tratar-se de um animal sagrado.
Pégasos são cavalos celestiais criados por deuses de bondade e justiça, sobretudo Khalmyr. De fato, quando o Deus da Justiça liderava o Panteão, existia apenas um único Pégaso — sua montaria sagrada pessoal, utilizada quando seu avatar visitava este mundo. Talvez a perda da liderança tenha levado Khalmyr a perder também seu corcel pessoal, ou talvez sua escolha tenha sido ofertar esse privilégio a outros. De qualquer forma, hoje existem numerosos pégasos não apenas no Reino de Khalmyr, mas também nos reinos de vários outros deuses.
Apesar da aparência equina, pégasos são inteligentes e podem falar. Às vezes percorrem Arton para servir àqueles que provem ser dignos dessa honra — eles aceitam ser cavalgados apenas por devotos de deuses que tenham paladinos. Apesar de sua bravura em combate contra o mal, pégasos em estado selvagem são assustadiços e muito difíceis de amansar.
Alguns dizem que o Pégaso de Khalmyr original se sacrificou para criar todos os outros. Outros afirmam que o cavalo alado primordial ainda vive, surgindo subitamente em momentos de grande necessidade para ajudar heróis empenhados em missões nobres.
Espírito Grande
Iniciativa +5, Percepção +3, faro, visão no escuro
Defesa 21, Fort +13, Ref +10, Von +4, imunidade a encantamento e medo, resistência a magia arcana +5
Pontos de Vida 105
Deslocamento 15m (10q), voo 24m (16q)
Corpo a Corpo Cascos +14 (2d8+5).
Investida Aérea Quando faz uma investida alada, o pégaso causa +2d8 pontos de dano com seus cascos e pode continuar se movendo depois do ataque. Ele deve se mover no mesmo sentido e seu movimento máximo ainda é o dobro do seu deslocamento.
For 6, Des 2, Con 3, Int 0, Sab 2, Car 2
Perícias Atletismo +11, Intuição +10.
Tesouro Nenhum.
Parceiro O pégaso é um parceiro montaria (Grande) que aceita apenas devotos de deuses que possuem paladinos e que fornece os benefícios a seguir. Iniciante: você recebe +2 em Intuição e seu deslocamento muda para 15m (um pégaso iniciante ainda não consegue voar com um cavaleiro). Veterano: como acima, mas seu deslocamento muda para voo 15m e você recebe +2 em Vontade. Mestre: você recebe uma ação de movimento extra por turno (apenas para se deslocar) e +2 em testes de ataque.`
        },
        {
          chave: "pegasoDeKhalmyr", nome: "Pégaso de Khalmyr", nd: "15", tipo: "Espírito (celestial) Grande",
          papel: "solo",
          resumo: "Surge diante de vocês um magnífico cavalo mágico com asas, branco e brilhante como a lua cheia.",
          texto:
`Pégaso de Khalmyr ND 15
Surge diante de vocês um magnífico cavalo mágico com asas, branco e brilhante como a lua cheia. Sua aura de nobreza e bondade deixa claro tratar-se de um animal sagrado.
Pégasos são cavalos celestiais criados por deuses de bondade e justiça, sobretudo Khalmyr. De fato, quando o Deus da Justiça liderava o Panteão, existia apenas um único Pégaso — sua montaria sagrada pessoal, utilizada quando seu avatar visitava este mundo. Talvez a perda da liderança tenha levado Khalmyr a perder também seu corcel pessoal, ou talvez sua escolha tenha sido ofertar esse privilégio a outros. De qualquer forma, hoje existem numerosos pégasos não apenas no Reino de Khalmyr, mas também nos reinos de vários outros deuses.
Apesar da aparência equina, pégasos são inteligentes e podem falar. Às vezes percorrem Arton para servir àqueles que provem ser dignos dessa honra — eles aceitam ser cavalgados apenas por devotos de deuses que tenham paladinos. Apesar de sua bravura em combate contra o mal, pégasos em estado selvagem são assustadiços e muito difíceis de amansar.
Alguns dizem que o Pégaso de Khalmyr original se sacrificou para criar todos os outros. Outros afirmam que o cavalo alado primordial ainda vive, surgindo subitamente em momentos de grande necessidade para ajudar heróis empenhados em missões nobres.
Espírito (celestial) Grande
Iniciativa +16, Percepção +19, faro, visão no escuro
Defesa 50, Fort +22, Ref +15, Von +28, imunidade a encantamento e medo, resistência a magia arcana +15
Pontos de Vida 750
Deslocamento 18m (12q), voo 36m (24q)
Pontos de Mana 50
Corpo a Corpo Cascos x2 +39 (4d10+35).
Asas Guardiãs As asas do Pégaso de Khalmyr funcionam como uma aura com 9m de raio. Aliados do pégaso nessa área recebem redução de dano 5.
✦ Aura de Ordem O Pégaso emana uma aura de ordem com 30m de raio. Criaturas que comecem seu turno dentro da aura sofrem –20 em Acrobacia, Enganação, Furtividade e Ladinagem e não podem mentir deliberadamente enquanto estiverem na área. Além disso, seus efeitos de encantamento, ilusão e transmutação são dissipados (Von CD 40 reduz a penalidade para –10, permite mentir e não dissipa os efeitos).
Cascos Sagrados Os cascos do Pégaso são armas mágicas que causam +2d8 de dano contra devotos de deuses que canalizam apenas energia negativa e criaturas malignas (a critério do mestre).
Meteoro (Completa) O Pégaso faz uma investida alada contra uma criatura e ataca com seus dois ataques de cascos. Ambos os ataques recebem o bônus de +2 da investida e causam +4d10 pontos de dano cada, mas devem ser feitos contra o mesmo alvo.
Ver Além das Mentiras O Pégaso está permanentemente sob o efeito básico da magia Visão da Verdade.
Magias Como um clérigo de Khalmyr de 15º nível (CD 40).
• Heroísmo (Padrão, 12 PM) Uma criatura adjacente fica imune a medo, recebe 40 PV temporários e +6 em testes de ataque e rolagens de dano contra o inimigo de maior ND na cena.
• Sopro da Salvação (Padrão, 14 PM) O Pégaso sopra um cone de 9m que cura 4d8+4 PV e remove todas as seguintes condições dos aliados na área: abalado, atordoado, apavorado, alquebrado, cego, confuso, debilitado, enfeitiçado, enjoado, esmorecido, exausto, fascinado, fatigado, fraco, frustrado, lento, paralisado, pasmo e surdo.
• Viagem Planar (Padrão, 12 PM) O Pégaso e até 5 criaturas voluntárias que ele esteja tocando viajam para outro Plano.
For 8, Des 3, Con 5, Int 1, Sab 3, Car 5
Perícias Atletismo +21, Diplomacia +18, Guerra +14, Intuição +21, Nobreza +14, Religião +16.
Tesouro Nenhum.
Parceiro O Pégaso de Khalmyr é um parceiro montaria (Grande) mestre que aceita ser montado apenas por personagens que julgue dignos ou que sejam devotos de Khalmyr. Ele fornece os seguintes benefícios: seu deslocamento muda para 18m (voo 36m) e você recebe uma ação de movimento extra por turno (apenas para se deslocar). Além disso, você pode lançar Círculo da Justiça. Caso aprenda essa magia, seu custo diminui em –1 PM.`
        },
        {
          chave: "muhir", nome: "Muhir", nd: "15", tipo: "Espírito (celestial) Médio",
          papel: "solo",
          resumo: "O recém-chegado passaria por um elfo de linhagem nobre, mas parece ser muito mais.",
          texto:
`Muhir ND 15
O recém-chegado passaria por um elfo de linhagem nobre, mas parece ser muito mais. A armadura e a espada magníficas por certo não foram forjadas neste mundo. Os olhos brilham com tonalidades metálicas. O cabelo longo e luminoso esvoaça mesmo sem vento, as orelhas se alongam quase como antenas.
Embora estejam entre os maiores guerreiros celestiais em todos os Planos, os muhir não servem diretamente aos deuses — ou, pelo menos, não seguem seus comandos. Muhir são como cavaleiros errantes, viajando pelos mundos sem destino, combatendo o mal onde o encontram. Suas existências são inconstantes e repletas de aventuras. Nunca permanecem muito tempo na mesma cidade, ou sequer no mesmo mundo! Não têm metas, objetivos ou missões, apenas se deixando levar pelo acaso, surgindo quando menos se espera.
Assim, um muhir não vai necessariamente perseguir a maior ameaça na região, nem investigar em busca de inimigos secretos, preferindo lidar com problemas que estejam bem à vista. Ele pode vagar de aldeia em aldeia, envolvendo-se com problemas triviais de camponeses, enquanto um dragão destrói castelos a pouca distância dali!
Um muhir não tem apreço por sutileza e furtividade, sempre lutando abertamente e com os melhores ataques à disposição — tipicamente uma espada bastarda sagrada. Ele também utiliza um par de pistolas celestiais, surpreendendo adversários em fuga.
Espírito (celestial) Médio
Iniciativa +20, Percepção +9, visão no escuro
Defesa 50, Fort +22, Ref +28, Von +15, evasão aprimorada, imunidade a eletricidade, encantamento, dano de luz e fogo, redução de dano 10, vulnerabilidade a trevas
Pontos de Vida 750
Deslocamento 12m (8q)
Pontos de Mana 77
Corpo a Corpo Espada bastarda x2 +41 (4d8+25, 17, mais 1d6 fogo).
À Distância Duas pistolas +39 (2d6+20, 18/x4, mais 1d6 fogo).
Armas Divinas Qualquer arma empunhada pelo muhir causa +1d6 pontos de dano de fogo (já contabilizado) e se torna sagrada (Tormenta20, p. 336).
Foco Momentâneo (Movimento) O muhir escolhe uma perícia. Até o fim da cena, ou até usar esta habilidade novamente, ele recebe +10 nessa perícia, mas sofre –5 em todas as demais perícias.
✦ Golpe Pessoal (Reação, 3 PM) Uma vez por rodada, quando acerta uma criatura com um ataque corpo a corpo, o muhir também causa 10d6 pontos de dano de eletricidade em criaturas a sua escolha em alcance médio da criatura atingida.
Investida Surpreendente (Reação) Quando o muhir faz uma investida, a criatura que ele ataca fica surpreendida contra esse ataque. Uma criatura só é surpreendida por esta habilidade uma vez por cena.
Não Tão Rápido! (Reação) Uma vez por rodada, quando uma criatura em alcance natural do muhir se move voluntariamente para fora desse alcance, ele faz um ataque à distância com uma de suas pistolas contra ela. O muhir não sofre a penalidade de –5 por fazer um ataque à distância contra um oponente envolvido em combate corpo a corpo nesse ataque.
Saque Rápido O muhir pode sacar ou guardar itens como uma ação livre e recarregar sua pistola como uma ação de movimento.
Magias Como um conjurador divino de 15º nível (CD 40).
• Heroísmo (Padrão, 12 PM) Uma criatura adjacente fica imune a medo, recebe 40 PV temporários e +6 em testes de ataque e rolagens de dano contra o inimigo de maior ND na cena.
• Libertação (Padrão, 15 PM) Cinco criaturas em alcance curto ficam imunes a efeitos de movimento, e ignoram qualquer efeito que impeça ou restrinja seu deslocamento.
• Sopro da Salvação (Padrão, 14 PM) O muhir sopra um cone de 9m que cura 4d8+4 PV e remove todas as seguintes condições dos aliados na área: abalado, atordoado, apavorado, alquebrado, cego, confuso, debilitado, enfeitiçado, enjoado, esmorecido, exausto, fascinado, fatigado, fraco, frustrado, lento, paralisado, pasmo e surdo.
For 7, Des 7, Con 6, Int 3, Sab 2, Car 6
Perícias Atuação +19, Cura +15, Intimidação +19, Religião +15.
Equipamento Armadura dos Neladriel, balas x20, espada bastarda certeira precisa, pistola certeira maciça x2.
Tesouro Metade.`
        },
        {
          chave: "orel", nome: "Orel", nd: "16", tipo: "Espírito (celestial) Grande",
          papel: "especial",
          resumo: "Não há dúvida de que aquele ser não pertence a este mundo, nem poderia existir por meios naturais.",
          texto:
`Orel ND 16
Não há dúvida de que aquele ser não pertence a este mundo, nem poderia existir por meios naturais. Não parece ser uma criatura feita de realidade: sua forma é metálica e geométrica, em retas, curvas e ângulos, mudando lenta e continuamente de uma configuração para outra. Em alguns momentos tem apenas duas dimensões, às vezes três, e provavelmente pode ter mais.
Não tem olhos ou feições visíveis, mas sua geometria parece se ajustar conforme suas atitudes.
Orel são poderosos celestiais da ordem que se apresentam como conceitos matemáticos e formas geométricas. Podem ser círculos, triângulos e quadrados, ou também trapézios, dodecaedros e outras formas, ou mais de uma. Alguns mantêm uma aparência fixa, outros ficam em constante mutação. Outros ainda são formados por conjuntos flutuantes de várias figuras.
Orel têm a missão de rastrear cabalas de demônios escondidas entre a população mortal. Suas formas matemáticas causam náusea aos inimigos, pois personificam rigidez, precisão e ordem absolutas. Em combate, orel utilizam magia — são os maiores conjuradores arcanos entre os celestiais. Escolhem um oponente e atacam sem piedade, mas também podem retardar ou atrapalhar grandes grupos. Ainda que seus alvos principais sejam demônios, já houve casos em que um orel confrontou aventureiros que realizaram ações de grande perturbação da ordem.
Espírito (celestial) Grande
Iniciativa +8, Percepção +19, percepção às cegas (médio)
Defesa 51, Fort +24, Ref +16, Von +30, imunidade a eletricidade e encantamento, redução de dano 20, resistência a magia +5
Pontos de Vida 400
Deslocamento Voo 18m (12q)
À Distância Feixe luminoso x4 +44 (8d6+27 luz).
Aura de Bondade O orel emana uma aura de bondade com 9m de raio. Aliados do orel dentro da aura recebem imunidade a encantamento e +5 na Defesa e em testes de resistência. Além disso, inimigos que comecem seus turnos na área ficam cegos (Von CD 44 evita).
Conjurador Angelical O orel pode lançar e sustentar qualquer magia arcana de 4º círculo ou menor sem gastar PM como um mago de 16º nível (CD 44).
Geometria Divina (Completa) O orel lança duas magias com execução de ação padrão ou menor.
Recomposição Divina No início do seu turno, se não tiver sido reduzido a 0 PV ou menos, o orel volta a ter 400 PV.
Sentidos Superiores O orel está sempre sob o efeito básico da magia Visão da Verdade.
For 0, Des 0, Con 1, Int 5, Sab 5, Car 4
Perícias Conhecimento +19, Diplomacia +18, Intuição +19, Misticismo +19, Religião +21.
Tesouro Nenhum.`
        },
        {
          chave: "furiaExtrema", nome: "Fúria Extrema", nd: "20", tipo: "Espírito (celestial) Colossal",
          papel: "solo",
          resumo: "Sua chegada é anunciada pelo som celestial de gongos e trombetas.",
          texto:
`Fúria Extrema ND 20
Sua chegada é anunciada pelo som celestial de gongos e trombetas. Surge uma criatura de aspecto humano, mas alta como uma casa. Tem cabelos longos e flamejantes, e olhos como sóis furiosos. Sobre os ombros, um grande manto feito de chamas esvoaçando em volta. Em vez de mãos, tem grandes espadas de metal incandescente.
Extremos são os celestiais mais poderosos que existem — isso é, quando existem. Estes seres não ocorrem naturalmente. Surgem apenas durante eventos extraordinários, quando os deuses estão diretamente envolvidos, ou quando o próprio destino do mundo está em jogo. O lendário Paladino de Arton, quando se voltou contra os deuses e alcançou sua forma extraplanar final, tornou-se um celestial extremo. Exceto pelo Paladino Extremo, nenhum outro celestial de tamanha magnitude se manifestou em Arton nos últimos séculos. Relatos sobre outros extremos datam de antigas escrituras sagradas, anteriores à Grande Batalha. Dizem que, no passado remoto, havia celestiais extremos chamados fúrias — eram os soldados supremos dos deuses. Contudo, após incidentes graves como a Revolta dos Três e o roubo dos Rubis da Virtude, o Panteão teria se tornado conturbado demais para criá-los. Outros ainda sugerem que, por seu imenso poder, extremos são propensos demais a acabar corrompidos e desafiar seus mestres, como o Paladino de Arton. Assim, hoje sua convocação seria reservada apenas para emergências cósmicas absolutas.
Fúrias são a expressão máxima do bem e da ordem, mas sua função não é proteger ou curar — é trazer punição e destruição ao mal e a seus asseclas. São apreciadores do combate, quando serve a propósitos divinos. Tão logo surgem, atacam seu alvo com força total, sem discursos ou ofertas de rendição. Sua tática preferida é usar o olhar fumegante para desestabilizar os oponentes, antes de investir com as espadas de fogo divino. Fúrias agem sozinhos; são simplesmente poderosos demais para precisar de ajuda.
Espírito (celestial) Colossal
Iniciativa +20, Percepção +20, percepção às cegas (longo)
Defesa 61, Fort +32, Ref +30, Von +20, imunidade a efeitos mentais, de metabolismo e de movimento e a medo, metamorfose e trevas, redução de dano 40
Pontos de Vida 1.200
Deslocamento 12m (8q), voo 15m (10q)
Corpo a Corpo Duas lâminas flamejantes +54 (5d8+20 fogo mais 5d8+20 luz).
Celeridade Divina O fúria extrema pode executar uma ação padrão adicional em cada um de seus turnos.
Fogo Sagrado O dano de fogo e o dano luz causados pelo fúria extrema ignoram 30 pontos da redução de dano cada e, contra criaturas imunes a fogo ou luz, ainda causam metade do dano. Além disso, quando sofre dano de fogo ou luz, o fúria recupera pontos de vida em vez de perdê-los.
Halo de Terror Absoluto No início de cada turno do fúria, criaturas em um raio de 9m sofrem 6d8 pontos de dano de fogo e 6d8 pontos de dano de luz e ficam apavoradas (Von CD 49 reduz à metade e muda a condição para abalado). Uma criatura imune a medo ainda fica abalada se falhar na resistência, mas não se passar no teste.
Liberar Essência Celestial (Reação) Caso o fúria seja reduzido a 0 PV ou menos, ele explode, causando 15d8 pontos de dano de fogo e 15d8 pontos de dano de luz em todas criaturas em um raio de 30m (Ref CD 49 reduz à metade).
Olhar Fumegante (Padrão) Uma criatura em alcance longo sofre 15d8 pontos de dano de fogo e 15d8 pontos de dano de luz, fica ofuscada por 1 rodada e em chamas (Ref CD 49 reduz à metade e evita as condições). Recarga (movimento).
Retribuição Quando uma criatura causa dano ao fúria, sofre a mesma quantidade de dano (Fort CD 49 reduz à metade).
Teletransporte (Movimento) O fúria se teletransporta para um espaço desocupado que ele possa perceber a até 30m.
✦ Ver Além da Mentira O fúria extrema está permanentemente sob o efeito básico da magia Visão da Verdade.
For 15, Des 10, Con 15, Int 0, Sab 8, Car 10
Tesouro Lâmina flamejante (CD 35 para extrair, reduz em 1 PM o custo para fabricar uma vingadora sagrada).`
        },
      ],

      regras: [
        { titulo: "Celestiais",
          texto:
`Diferentes dos malignos abissais, os celestiais — também conhecidos simplesmente como anjos — são nativos dos reinos de deuses inclinados à bondade, verdade e nobreza.

Celestiais atuam como servos e soldados de tais divindades, sobretudo em seus próprios reinos, onde são muito mais comuns. Suas visitas a Arton são bastante raras, apenas em eventos que exigem intervenção direta dos poderes benignos. Muitas vezes será um celestial a procurar grupos de aventureiros e entregar missões sagradas a eles, ou a surgir para ajudá-los em momentos de grande necessidade. Clérigos poderosos também são capazes de invocá-los em seu auxílio.

Celestiais não buscam adoração ou recompensa; seu objetivo maior é proteger devotos de suas respectivas divindades, podendo se sacrificar para isso. São obviamente inimigos dos abissais, caçando-os para revelar suas maquinações, devolvê-los a seus reinos de origem ou destruí-los por completo.

Celestiais agem e se comportam como paladinos — ou, seria mais correto dizer, paladinos agem como celestiais. De fato, ao longo da história de Arton, houve paladinos tão nobres e heroicos que acabaram transformados em anjos, seguindo com sua missão sagrada para todo o sempre.

Assim como acontece com abissais, também se acreditava que a moral e ética dos celestiais fosse imutável, inabalável, uma certeza universal. Não seria possível corromper sua pureza e nobreza sem matá-los. Mas isso não é uma verdade total. Existem celestiais — sobretudo aqueles ligados a deuses inconstantes, como Nimb — capazes de atos inconsequentes e egoístas. Alguns fogem ao controle de seus mestres, exercendo justiça como acreditam ser mais certo. Outros abandonam seus deveres em busca de paz e felicidade, ou acabam apaixonados por mortais (afinal, há um motivo para existirem os aggelus). Conta-se histórias de aventureiros convocados pelos deuses para capturar ou mesmo destruir esses anjos rebeldes.` },
        { titulo: "Habilidades de Inevitáveis",
          texto:
`Todos os inevitáveis partilham das seguintes habilidades.
✦ Encontrar o Culpado O inevitável sempre sabe a localização da criatura que deve caçar, como se estivesse permanentemente sob efeito da magia Localização com área equivalente a toda Arton.
Investir a Culpa Cada inevitável é criado para caçar uma criatura específica. Contra essa criatura, ele recebe +5 em testes de perícia e seus ataques causam +2d6 pontos de dano de luz.
Visão da Justiça O inevitável está permanentemente sob o efeito básico da magia Visão da Verdade.` },
      ],
    },

    // ── 🍄 FADAS ───────────────────────────────────
    {
      chave: "fadas", nome: "Fadas", icone: "🍄", cor: "#4a8f5f",
      intro: "Os seres feéricos, nascidos da magia das paisagens de Arton e presos a algum ambiente natural. Do duende de um palmo à velha bruxa, passando pelos eiradaan — os “elfos arcanos” que os elfos de hoje dizem ser seus ancestrais.",
      fichas: [
        {
          chave: "driade", nome: "Dríade", nd: "4", tipo: "Espírito Médio",
          papel: "especial",
          resumo: "A criatura de pele esverdeada e cabeleira lembrando folhagens mal parece humana — mas é uma visão fugidia.",
          texto:
`Dríade ND 4
A criatura de pele esverdeada e cabeleira lembrando folhagens mal parece humana — mas é uma visão fugidia. Quando vocês olham outra vez, ela aparenta ser uma linda jovem de olhos amendoados e misteriosos. Seu cabelo lembra a textura das folhas das árvores mais cheias de vida, e sua pele, madeira oleada e polida à perfeição. Dríades são fadas magicamente ligadas a bosques e florestas. Elas defendem as árvores, algumas vezes entrando em conflito com lenhadores e desbravadores, pois são capazes de tudo para evitar que a vida natural nas redondezas seja destruída.
Embora todas as fadas amem a natureza, uma dríade também tem outra razão para protegê-la: sua alma fica abrigada em uma árvore muito antiga, com séculos de idade. Não importa quantas vezes o corpo humanoide da dríade seja destruído, ela sempre voltará, renascida como um grande fruto em sua árvore poucos dias depois. A única forma de matar uma dríade é destruindo essa árvore. Assim, ao derrubar um bosque ou floresta para construir uma aldeia, é bem possível que colonos humanos estejam assassinando uma ou mais destas fadas.
Dríades são pacíficas, preferindo enganar e despistar em vez de lutar. Quando forçadas a isso, sua tática preferida é enfeitiçar ou seduzir inimigos para que lutem em sua defesa.
Não é incomum que dríades se apaixonem por seres de outras raças, e vice-versa — pois podem alterar livremente sua aparência, entre um ser vegetal e uma forma humana ou élfica. Acabam cativadas por pessoas de boa aparência, personalidade distinta ou grande nobreza. Quando apaixonada, a dríade busca iludir, capturar e/ou seduzir o alvo, como se ele fosse um adversário; alguns aceitam o cativeiro de bom grado, às vezes para sempre — ou até que a dríade perca interesse, embora alguns romances durem por toda a vida. Tais relacionamentos também produzem as dahllan, ou meias-dríades.
Espírito Médio
Iniciativa +7, Percepção +12, visão no escuro
Defesa 21, Fort +4, Ref +11, Von +15, imunidade a efeitos mentais, redução de dano 5/adamante
Pontos de Vida 98
Deslocamento 9m (6q), sem redução por terreno difícil natural
Pontos de Mana 24
Caminhar em Árvores (Completa) A dríade entra em uma árvore adjacente que seja maior do que ela, e pode permanecer dentro da árvore livremente, percebendo os arredores de forma normal (mas sem poder executar outras ações). Também pode sair na mesma árvore ou em qualquer outra árvore em um raio de 1km como uma ação livre. Se estiver dentro de uma árvore que seja destruída, a dríade reaparece e perde 10d6 pontos de vida.
Simbiose A verdadeira forma de uma dríade é uma enorme árvore. Quando sua forma humanoide é destruída, outra surge em poucos dias nessa árvore. A forma humanoide de uma dríade não pode se afastar mais de 1km da floresta onde repousa sua árvore, ou perde 8d6 pontos de vida por hora. Essa perda de vida só pode ser curada após a dríade retornar para sua árvore. A única forma de matar uma dríade é destruir sua árvore.
Magias Como uma conjuradora de 4º nível (CD 20).
• Comando (Padrão, 4 PM) No início do seu próximo turno, duas criaturas em alcance curto ficam pasmas por 1 rodada (Von evita; cada criatura só pode ficar pasma por esta magia uma vez por cena).
• Controlar Plantas (Padrão, 2 PM) Um quadrado de 9m de vegetação em alcance curto se torna terreno difícil. Criaturas na área quando a magia é lançada ou no início de seus próprios turnos ficam enredadas e imóveis (Ref evita). Uma vítima pode se libertar com uma ação padrão e um teste de Acrobacia ou Atletismo.
• Enfeitiçar (Padrão, 1 PM) Um humanoide em alcance curto fica enfeitiçado (Von anula). Ações hostis contra o alvo ou seus aliados dissipam a magia.
• Tranquilidade (Padrão, 2 PM) Até o fim da cena, uma criatura em alcance curto tem sua atitude mudada para indiferente e não pode atacar ou realizar qualquer ação hostil (Von reduz para penalidade de –2 em testes de ataque). Ações hostis contra o alvo ou seus aliados dissipam a magia.
For –1, Des 3, Con 0, Int 1, Sab 5, Car 6
Perícias Adestramento +12, Diplomacia +12, Intuição +9, Furtividade +9 (+14 em florestas), Misticismo +6, Sobrevivência +15.
Tesouro Padrão.`
        },
        {
          chave: "duendeMenor", nome: "Duende menor", nd: "1", tipo: "Espírito Pequeno",
          papel: "especial",
          resumo: "Embora vocês tenham sido informados de que ambas as criaturas são duendes, os dois são seres totalmente diferentes!",
          texto:
`Duende menor ND 1
Embora vocês tenham sido informados de que ambas as criaturas são duendes, os dois são seres totalmente diferentes! Um deles parece um enorme ovo, com braços e pernas muito finos. O outro lembra um mordomo esguio e pomposo de pele azulada e roupas aristocráticas.
Duendes podem ter quase qualquer aparência imaginável. São geralmente pequenos, não excedendo a altura de um anão, embora existam alguns grandalhões e desajeitados. Em comum, todos parecem personagens de histórias infantis, até mesmo tolos aos olhos de adultos.
Duendes costumam se entregar a tarefas que parecem bobas e sem sentido para outros povos, mas muito importantes para eles próprios — coisas como levar um raio de sol a um pardal ou vigiar um riacho para evitar que alguém o roube. Como outras fadas, duendes podem ser apenas brincalhões, ou então maléficos: alguns realizam trabalhos domésticos em troca de leite e biscoitos, outros pregam peças perigosas e comem carne crua. Duendes levam suas “tarefas” muito a sério.
Todo duende tem um tabu, um ato que ele nunca pode fazer — ou deixar de fazer. Pode ser algo inofensivo como sempre entrar de costas em uma casa, ou sério como matar o filho primogênito de qualquer pessoa que lhe faça uma pergunta. Tabus de duendes podem ser complexos ou cheios de regras arbitrárias: um duende pode ser seu amigo desde que você nunca olhe em seu rosto, exceto no equinócio de inverno, quando deixar de olhar seu rosto será uma ofensa amaldiçoada com pobreza eterna. Um duende nunca diz qual é seu tabu. Quando impedido de cumprir seu tabu, um duende morre em poucos dias.
Espírito Pequeno
Iniciativa +4, Percepção +6, visão no escuro
Defesa 14, Fort +1, Ref +6, Von +10, evasão
Pontos de Vida 22
Deslocamento 9m (6q)
Pontos de Mana 9
Corpo a Corpo Adaga +7 (1d4+4, 19).
Sortudo (Reação, 3 PM) Quando faz um teste, o duende menor o rola novamente.
Tabu Todo duende possui um tabu, que pode ser descoberto com um teste de Conhecimento (CD 30) ou com um teste de Investigação (CD 20) para interrogar os plebeus da região — muitos tabus são conhecidos pelo folclore popular. Um personagem que conheça o tabu de um duende pode forçá-lo a ajudar em algo com um teste de Enganação oposto a um teste de Vontade. Quando impedido de cumprir seu tabu, um duende morre em 1d4+1 dias.
Magias Como um conjurador arcano de 1º nível (CD 16).
• Enfeitiçar (Padrão, 1 PM) Um humanoide em alcance curto fica enfeitiçado (Vontade evita).
• Criar Ilusão (Padrão, 1 PM) O duende cria uma ilusão com imagens em alcance médio, que ocupa até 4 cubos de 1,5m. Criaturas e objetos atravessam a ilusão sem sofrer dano (Von desacredita).
• Sono (Padrão, 1 PM) Um humanoide em alcance curto fica inconsciente e caído ou, se estiver envolvido em uma situação perigosa, fica exausto por 1 rodada, depois fatigado (Von reduz para fatigado por 1d4 rodadas).
For –1, Des 2, Con –1, Int 0, Sab 2, Car 3
Perícias Conhecimento +2, Enganação +5, Furtividade +6.
Equipamento Adaga. Tesouro Padrão.`
        },
        {
          chave: "duendeMaior", nome: "Duende maior", nd: "5", tipo: "Espírito Médio",
          papel: "especial",
          resumo: "Embora vocês tenham sido informados de que ambas as criaturas são duendes, os dois são seres totalmente diferentes!",
          texto:
`Duende maior ND 5
Embora vocês tenham sido informados de que ambas as criaturas são duendes, os dois são seres totalmente diferentes! Um deles parece um enorme ovo, com braços e pernas muito finos. O outro lembra um mordomo esguio e pomposo de pele azulada e roupas aristocráticas.
Duendes podem ter quase qualquer aparência imaginável. São geralmente pequenos, não excedendo a altura de um anão, embora existam alguns grandalhões e desajeitados. Em comum, todos parecem personagens de histórias infantis, até mesmo tolos aos olhos de adultos.
Duendes costumam se entregar a tarefas que parecem bobas e sem sentido para outros povos, mas muito importantes para eles próprios — coisas como levar um raio de sol a um pardal ou vigiar um riacho para evitar que alguém o roube. Como outras fadas, duendes podem ser apenas brincalhões, ou então maléficos: alguns realizam trabalhos domésticos em troca de leite e biscoitos, outros pregam peças perigosas e comem carne crua. Duendes levam suas “tarefas” muito a sério.
Todo duende tem um tabu, um ato que ele nunca pode fazer — ou deixar de fazer. Pode ser algo inofensivo como sempre entrar de costas em uma casa, ou sério como matar o filho primogênito de qualquer pessoa que lhe faça uma pergunta. Tabus de duendes podem ser complexos ou cheios de regras arbitrárias: um duende pode ser seu amigo desde que você nunca olhe em seu rosto, exceto no equinócio de inverno, quando deixar de olhar seu rosto será uma ofensa amaldiçoada com pobreza eterna. Um duende nunca diz qual é seu tabu. Quando impedido de cumprir seu tabu, um duende morre em poucos dias.
Espírito Médio
Iniciativa +6, Percepção +8, visão no escuro
Defesa 22, Fort +6, Ref +12, Von +16, evasão
Pontos de Vida 127
Deslocamento 9m (6q)
Pontos de Mana 34
Corpo a Corpo Adaga +15 (1d4+8, 19).
Sortudo (Reação, 3 PM) Quando faz um teste, o duende maior o rola novamente.
Tabu Todo duende possui um tabu, que pode ser descoberto com um teste de Conhecimento (CD 30) ou perguntando aos plebeus da região (Investigação CD 20) — muitos tabus são conhecidos pelo folclore popular. Um personagem que conheça o tabu de um duende pode forçá-lo a ajudar em algo com um teste de Enganação oposto a um teste de Vontade. Quando impedido de cumprir seu tabu, um duende morre em 1d4+1 dias.
Magia Discreta (Livre, +2 PM) Quando lança uma magia, o duende não precisa gesticular ou falar e pode lançar a magia com as mãos presas, amordaçado etc. Perceber que ele lançou uma magia exige passar em um teste de Misticismo (CD 20).
Magias Como um conjurador arcano de 5º nível (CD 22).
• Enfeitiçar (Padrão, 1 PM) Um humanoide em alcance curto fica enfeitiçado (Vontade evita).
• Dissipar Magia (Padrão, 3 PM) O duende escolhe uma criatura, objeto ou esfera de 3m em alcance médio e faz um teste de Misticismo. Todas as magias nesse alvo com CD igual ou menor que o resultado do teste são dissipadas.
• Invisibilidade (Padrão, 5 PM) O duende fica invisível até o fim da cena ou até realizar uma ação hostil. Ele recebe camuflagem total e +10 em testes de Furtividade contra ouvir, e criaturas que não possam vê-lo ficam desprevenidas contra seus ataques.
• Sussurros Insanos (Padrão, 3 PM) Um humanoide em alcance curto fica confuso (Von anula).
For 1, Des 2, Con 2, Int 2, Sab 2, Car 4
Perícias Conhecimento +8, Enganação +10, Furtividade +8, Misticismo +8.
Equipamento Adaga. Tesouro Padrão.`
        },
        {
          chave: "dragonete", nome: "Dragonete", nd: "4", tipo: "Espírito Pequeno",
          papel: "especial",
          resumo: "A criaturinha desconcertante tem o tamanho de um gato, mas a aparência de um dragão completo, com cabeça reptiliana, quatro patas e escamas coloridas.",
          texto:
`Dragonete ND 4
A criaturinha desconcertante tem o tamanho de um gato, mas a aparência de um dragão completo, com cabeça reptiliana, quatro patas e escamas coloridas. Além do tamanho, a maior diferença com relação a um dragão são as asas, translúcidas e com nervuras, lembrando mais uma grande libélula.
Também conhecidas como “dragões-fadas”, estas criaturinhas não são dragões verdadeiros, nem têm qualquer parentesco com os grandes répteis. Sua aparência, no entanto, lembra um dragão em miniatura. Suas asas, em vez de coriáceas, parecem asas de inseto — translúcidas e com nervuras como nas libélulas, ou coloridas como nas borboletas. Dragonetes são também multicoloridos, com padrões de manchas e listras que lembram pássaros ou peixes tropicais.
Na natureza, formam pequenos bandos, sendo raramente encontrados sozinhos. Dragonetes são, acima de tudo, brincalhões: gostam de usar invisibilidade ou magia ilusória para enganar aqueles que se aventuram em suas florestas. Diante de alguma ameaça, sempre preferem fugir a lutar.
Dragonetes são cobiçados por conjuradores, por sua capacidade de potencializar certas magias. Assegurar a obediência da criaturinha marota, contudo, exige boa dose de serenidade; apenas os muito calmos e gentis conseguem mantê-los como familiares. De fato, um dragonete no ombro ou chapéu de um arcanista costuma ser evidência de que se trata de uma pessoa bondosa e paciente. Muito paciente.
Espírito Pequeno
Iniciativa +11, Percepção +6, visão no escuro
Defesa 21, Fort +6, Ref +14, Von +10, resistência a magia +2
Pontos de Vida 100
Deslocamento 9m (6q), voo 12m (8q)
Corpo a Corpo Garras +14 (1d8+8) e mordida +14 (1d6+6).
Baforada Iridescente (Padrão) O dragonete sopra um pó iridescente. Criaturas em um cone de 4,5m ficam atordoadas por 1 rodada e ofuscadas (Von CD 20 evita). Uma criatura só pode ficar atordoada por esta habilidade uma vez por cena. Recarga (movimento).
✦ Ladrão de Magias (Reação) Uma vez por rodada, quando uma criatura em alcance curto se torna o alvo de uma magia, o dragonete "rouba" seu efeito para si mesmo. A magia funciona normalmente, mas o dragonete se torna seu novo alvo.
✦ Sumiço (Padrão) O dragonete fica invisível como pela magia Invisibilidade.
✦ Visão Arcana O dragonete está sempre sob o efeito básico de Visão Mística.
For 0, Des 4, Con 1, Int –1, Sab 2, Car 4
Perícias Furtividade +12, Intuição +8, Misticismo +5.
Tesouro Padrão.
Parceiro Um dragonete parceiro fornece os benefícios a seguir. Iniciante: diminuiu o custo de magias de encantamento e ilusão em –1 PM. Veterano: aumenta o alcance de magias de encantamento e ilusão em um passo (de curto para médio e de médio para longo). Mestre: a redução de custo em magias de encantamento e ilusão se torna cumulativa com outras reduções e você fica sempre sob o efeito básico da magia Visão Mística.`
        },
        {
          chave: "naiade", nome: "Náiade", nd: "3", tipo: "Espírito Médio",
          papel: "especial",
          resumo: "Ela tem a aparência de uma mulher bela e esguia, mas feita de água.",
          texto:
`Náiade ND 3
Ela tem a aparência de uma mulher bela e esguia, mas feita de água. Seu sorriso é reconfortante, seu abraço é cálido e gentil. Ela sussurra palavras doces, você se sente envolvido por uma presença calorosa e suave, enquanto é lentamente levado para o afogamento nas profundezas...
Náiades são fadas ligadas a rios e córregos. Vivem próximas a águas correntes, protegendo-as ou apenas usando-as como esconderijo. Em geral são tímidas e reclusas, evitando contato com humanoides; sua companhia são apenas os peixes e outros animais ribeirinhos, com quem conversam.
Mas náiades podem ser perigosas para os mortais, quando eles ameaçam seu ambiente — represando suas águas, contaminando-as ou apenas pescando.
Uma náiade furiosa cria ilusões de tesouros brilhantes no fundo das águas e, quando a vítima se aproxima para ver melhor, é capturada e afogada. Quando essa tática falha, ou quando a náiade está realmente enraivecida, recorre a suas magias para atacar. Por outro lado, mortais que respeitem um rio habitado por uma náiade podem vencer sua timidez natural e conquistar sua amizade.
Apesar de sua devoção protetora, uma náiade não é apegada a um único rio ou córrego, mudando-se para outro conforme seus caprichos. Muitos pescadores acabam com problemas quando uma náiade vem morar em seu pesqueiro...
Espírito Médio
Iniciativa +7, Percepção +7, visão no escuro
Defesa 19, Fort +7, Ref +13, Von +9, imunidade a encantamento e frio
Pontos de Vida 74
Deslocamento 9m (6q), natação 18m (12q)
Pontos de Mana 18
Abraço das Águas (Movimento) A náiade faz um teste de Agarrar (bônus +12) oposto contra uma criatura adjacente. Uma criatura agarrada pela náiade deve fazer um teste de Fortitude por rodada (CD 19) para não se afogar. A cada falha, sofre 1 ponto de dano temporário de Constituição até morrer ou até respirar novamente. Uma criatura agarrada não percebe o que está acontecendo e se sente confortável no abraço da náiade. Para fazer qualquer ação em seu turno, deve ser bem-sucedida em um teste de Vontade (CD 19).
Linguagem Natural A náiade pode falar com animais livremente.
Magias Como uma conjuradora arcana de 3º nível (CD 19).
• Criar Ilusão (Padrão, 1 PM) A náiade cria uma ilusão com imagens em alcance médio, que ocupa até 4 cubos de 1,5m. Criaturas e objetos atravessam a ilusão sem sofrer dano (Von desacredita e permite atravessar as ilusões).
• Dardo Gélido (Padrão, 3 PM) Uma criatura em alcance curto sofre 4d6 pontos de dano de frio e fica lenta por 1 rodada(Fort reduz à metade e evita a condição).
• Imagem Espelhada (Padrão, 3 PM) Três cópias ilusórias da náiade surgem ao seu redor, concedendo +6 na Defesa. Cada vez que um ataque erra a náiade, uma das cópias desaparece e o bônus na Defesa diminui em 2.
For 0, Des 4, Con 1, Int 1, Sab 3, Car 4
Perícias Conhecimento +6, Furtividade +9, Intuição +10, Sobrevivência +10.
Tesouro Padrão.`
        },
        {
          chave: "ninfa", nome: "Ninfa", nd: "6", tipo: "Espírito Médio",
          papel: "especial",
          resumo: "Ela é, com certeza, a criatura mais bela em todo este mundo dos deuses.",
          texto:
`Ninfa ND 6
Ela é, com certeza, a criatura mais bela em todo este mundo dos deuses. Graciosa demais para uma humana, voluptuosa demais para uma elfa, provocante demais para uma celestial, singela demais para uma abissal. Usa vestes de tecidos diáfanos, deixando entrever seu corpo. Seus movimentos são lânguidos, com olhares sugestivos e suspiros longos.
Ninfas são fadas que materializam a beleza.
Muitas histórias as retratam como lindas mulheres humanas ou élficas, mas essa é apenas sua descrição mais conhecida. Ninfas exalam uma aura mágica de sedução e fascínio que distorce a percepção dos observadores, sendo quase impossível enxergar sua aparência ou gênero verdadeiros. Ou talvez o próprio observador altere a aparência real da ninfa, teorizam alguns.
Uma ninfa tem movimentos calmos e deliberados, aparentemente displicentes, mas sempre realçando sua perfeição. Seus trajes são pouco mais que trapos, mas parecem sempre elegantes e belos. Uma ninfa sempre diz, faz e aparenta aquilo que é mais atrativo para quem a observa.
Ninfas vivem para atrair mortais e aprisioná-los, sem motivo aparente, exceto deixar que a admirem. Em seus corações, não acreditam estar cometendo nenhuma maldade — pelo contrário, permitem que seus cativos experimentem a felicidade plena por observá-las. Às vezes se interessam em ajudar viajantes que consideram belos ou dignos, mas podem a qualquer momento decidir que também os desejam para sua coleção.
A beleza de uma ninfa pode literalmente matar. Ver uma ninfa nua é algo tão intenso que o observador pode morrer ali mesmo, como se a própria vida perdesse qualquer sentido após vislumbrar o que existe de mais perfeito.
Espírito Médio
Iniciativa +8, Percepção +6, visão no escuro
Defesa 22, Fort +6, Ref +12, Von +18, imunidade a encantamento, redução de dano 5/adamante, resistência a magia +5
Pontos de Vida 144
Deslocamento 9m (6q)
Pontos de Mana 42
Corpo a Corpo Pancada +18 (1d3+6).
✦ Beleza Insuportável No inicio de cada turno da ninfa, se ela estiver nua, cada criatura em alcance médio deve fazer um teste de Vontade (CD 24). Se passar, desvia o olhar. Se falhar, fica paralisada e esmorecida. Se já estiver esmorecida, perde 1 ponto cumulativo de Constituição permanentemente. Se falhar por 3 rodadas sucessivas, morre. Uma criatura pode fechar os olhos como uma reação para ficar imune a esta habilidade, mas sofrerá os efeitos de estar cega por 1 rodada.
Coração Aprisionado (Padrão, 3 PM) A ninfa aprisiona o coração de uma criatura em alcance curto (Von CD 24 evita e a criatura não pode mais ser afetada por esta habilidade por um dia). Uma criatura cujo coração seja aprisionado recebe +2 em testes de pericia, mas é incapaz de contrariar as ordens da ninfa ou se afastar mais de 30m dela. O coração permanece aprisionado até que a ninfa o liberte ou seja morta.
Magias Como uma conjuradora arcana de 6º nível (CD 24).
• Curar Ferimentos (Padrão, 5 PM) Uma criatura adjacente cura 6d8+6 PV.
• Marca da Obediência (Padrão, 6 PM) A ninfa ordena que uma criatura adjacente não ataque ela ou seus aliados até o fim da cena (Von evita). A criatura pode repetir o teste de Vontade em cada um de seus turnos subsequentes mas, se falhar, sofre 3d6 pontos de dano psíquico.
• Santuário (Padrão, 1 PM) A ninfa toca uma criatura. Até o fim da cena, ou até que essa criatura faça uma ação hostil, qualquer criatura que tente fazer uma ação hostil contra ela perde a ação (Von evita).
For 0, Des 4, Con 1, Int 3, Sab 3, Car 7
Perícias Adestramento +17, Diplomacia +17, Enganação +17, Intuição +10, Sobrevivência +10.
Tesouro Padrão.`
        },
        {
          chave: "satiroArqueiro", nome: "Sátiro Arqueiro", nd: "2", tipo: "Espírito (sátiro) Médio",
          papel: "lacaio",
          resumo: "O humanoide de baixa estatura tem tronco, cabeça e braços humanos, mas também chifres recurvados e pernas de bode, com cascos.",
          texto:
`Sátiro Arqueiro ND 2
O humanoide de baixa estatura tem tronco, cabeça e braços humanos, mas também chifres recurvados e pernas de bode, com cascos. A pele é oleosa, mas com partes cobertas de pelagem castanha. Carrega um arco às costas e uma aljava de flechas na cintura. Usa cavanhaque e traz no rosto um sorriso divertido, mas também selvagem. Diferentes de outras fadas, sátiros costumam ter aparência masculina — embora existam exceções. São bem-humorados, joviais, apreciadores dos prazeres da vida: comida, bebida, dança e romance... especialmente romance. Parecem motivados puramente pela busca da próxima diversão, assim que descansam da anterior. E, infelizmente para os demais povos, nem todas as diversões de um sátiro são inofensivas.
Sátiros são arqueiros exímios, apreciando caçar por esporte; muitos se contentam apenas com pássaros ou coelhos, enquanto os mais devassos flecham humanos e outras raças, para seu prazer perverso. Felizmente para a vítima perseguida, existe uma chance certa de escapar: basta evitar o caçador até que ele fique cansado e perca o interesse. Preguiçosos, sátiros nunca se esforçam muito em alcançar coisa alguma.
Assim, quando indispostos a caçadas cansativas, sátiros muitas vezes preferem enfeitiçar suas vítimas com música de flauta ou harpa — que eles utilizam para seduzir interesses românticos, ou fazer adormecer viajantes para roubar seus pertences. Com seus sentidos aguçados e agilidade natural, é simples para um sátiro se aproximar sem ser percebido.
É possível negociar com sátiros: eles conhecem bem as regiões onde vivem, podendo apontar o caminho para qualquer lugar. Contudo, só aceitam fazer isso quando são derrotados em alguma disputa, ou subornados com algo que apreciem.
Quando forçados a lutar, sátiros usam o arco e flechas; em combate corpo a corpo, podem contar com a cabeçada poderosa.
Espírito (sátiro) Médio
Iniciativa +6, Percepção +2, visão na penumbra
Defesa 18, Fort +7, Ref +12, Von +3
Pontos de Vida 13
Deslocamento 12m (8q)
Corpo a Corpo Chifres +9 (1d6+1).
À Distância Arco curto +14 (1d6+3, x3).
Disparo Rápido (Completa) O sátiro arqueiro faz dois ataques de arco curto com uma penalidade de –2 em cada teste.
Flautista Mágico (Padrão) O sátiro lança uma das seguintes magias como um bardo, com os efeitos descritos mas sem gastar PM (CD 16). Ele só pode usar esta habilidade se estiver empunhando sua flauta.
• Amedrontar Um animal ou humanoide em alcance curto fica apavorado por 1 rodada e depois abalado (Von reduz para abalado por 1d4 rodadas).
• Enfeitiçar Um animal ou humanoide em alcance curto fica enfeitiçado (Von anula).
• Hipnotismo Um animal ou humanoide em alcance curto fica fascinado (Von anula e deixa imune por 1 dia).
• Sono Um humanoide em alcance curto fica inconsciente e caído ou, se estiver em combate, exausto por 1 rodada e então fatigado (Von reduz para fatigado por 1d4 rodadas em ambos os casos).
For 1, Des 3, Con 1, Int 0, Sab –1, Car 2
Perícias Atletismo +6, Atuação +7.
Equipamento Arco curto, armadura de couro, flechas x10, instrumento musical (flauta). Tesouro Nenhum.`
        },
        {
          chave: "silfideTravessa", nome: "Sílfide Travessa", nd: "1", tipo: "Espírito (sílfide) Minúsculo",
          papel: "especial",
          resumo: "Sílfides são o povo-fada de Arton.",
          texto:
`Sílfide Travessa ND 1
Sílfides são o povo-fada de Arton. Sua aparência pode variar, mas em geral são pequenos humanoides medindo não mais de 30cm de altura. Têm orelhas pontiagudas (parecem elfos em miniatura), um ou dois pares de asas translúcidas de inseto e olhinhos totalmente negros feito olhos de lagartixa. Algumas têm antenas.
Por serem as fadas mais diminutas, numerosas e conhecidas — e também porque muitas decidem se unir a grupos de aventureiros —, é comum acreditar que sílfides e silfos sejam amigáveis, confiáveis e inofensivos. Grande erro. Como os humanos e outras raças, sílfides podem ser movidas por bondade ou maldade, e mesmo aquelas mais bondosas recorrem a trapaças e truques para alcançar seus objetivos.
Em estado selvagem, sílfides podem ser encontradas em grandes comunidades silvestres (ou enxames, dizem alguns). Quando algum forasteiro surge, primeiramente elas não se sentem ameaçadas, vendo ali uma oportunidade para brincar ou pregar peças. Caso os invasores sejam astutos o bastante para percebê-las, podem ser convidados para jogos e celebrações. Se mesmo assim os intrusos se mostrarem hostis, as fadinhas debandam e pedem ajuda ao grupo de aventureiros mais próximo.
Embora apreciem muito a vida na floresta, sílfides e silfos não têm nada de tímidos. Quando os humanos começaram sua expansão a partir de Valkaria, foram logo recebidos pelos minúsculos “vizinhos” — e nunca mais se livraram deles! Sílfides podem ser vistas zumbindo em quase todos os pontos do Reinado, especialmente lugares onde existam muitos hynne, como as Repúblicas Livres de Sambúrdia. Uma sílfide encantadora pode às vezes ser encontrada no comando de uma grande comunidade sílfide (isso é, até onde essas fadas travessas podem ser comandadas).
Espírito (sílfide) Minúsculo
Iniciativa +3, Percepção +0, visão no escuro
Defesa 10, Fort +0, Ref +11, Von +5
Pontos de Vida 40
Deslocamento 9m (6q), voo 12m (8q)
Pontos de Mana 18 “Eu Não Acredito em Fadas.” Quando um inimigo passa em um teste de Vontade contra a sílfide travessa, ela perde 5 PV.
“Oi, Qual o Seu Nome?” Uma criatura que de alguma forma revele seu nome verdadeiro à sílfide sofre –2 em testes de resistência contra ela.
Raio Arcano (Padrão) Uma criatura em alcance curto sofre 2d12 pontos de dano de essência (Ref CD 16 reduz à metade).
Magias Como uma feiticeira de 3º nível (CD 16, limite de PM 3).
• Adaga Mental (Padrão, 1 PM) Uma criatura em alcance curto sofre 2d6 pontos de dano psíquico e fica atordoada por 1 rodada (Von reduz o dano à metade e evita a condição). Uma criatura só pode ser atordoada por esta magia uma vez por cena.
• Criar Ilusão (Padrão, 1 PM) A sílfide cria uma ilusão com imagens em alcance médio, que ocupa até 4 cubos de 1,5m. Criaturas e objetos atravessam a ilusão sem sofrer dano (Von desacredita).
• Disfarce Ilusório (Padrão, 3 PM) Até o fim da cena, a sílfide muda a própria aparência, incluindo seu equipamento, os odores e as sensações que ela transmite. Isso afeta altura, peso, tom de pele, cor de cabelo, timbre de voz etc. Ela recebe +20 em testes de Enganação para disfarce (Von desacredita).
• Luz (Padrão, 1 PM) Uma criatura fica ofuscada pela cena (Von evita).
For –2, Des 2, Con 0, Int 1, Sab –1, Car 3
Perícias Diplomacia +7, Enganação +7, Furtividade +9.
Tesouro Nenhum.`
        },
        {
          chave: "silfideEncantadora", nome: "Sílfide Encantadora", nd: "8", tipo: "Espírito (sílfide) Minúsculo",
          papel: "especial",
          resumo: "Sílfides são o povo-fada de Arton.",
          texto:
`Sílfide Encantadora ND 8
Sílfides são o povo-fada de Arton. Sua aparência pode variar, mas em geral são pequenos humanoides medindo não mais de 30cm de altura. Têm orelhas pontiagudas (parecem elfos em miniatura), um ou dois pares de asas translúcidas de inseto e olhinhos totalmente negros feito olhos de lagartixa. Algumas têm antenas.
Por serem as fadas mais diminutas, numerosas e conhecidas — e também porque muitas decidem se unir a grupos de aventureiros —, é comum acreditar que sílfides e silfos sejam amigáveis, confiáveis e inofensivos. Grande erro. Como os humanos e outras raças, sílfides podem ser movidas por bondade ou maldade, e mesmo aquelas mais bondosas recorrem a trapaças e truques para alcançar seus objetivos.
Em estado selvagem, sílfides podem ser encontradas em grandes comunidades silvestres (ou enxames, dizem alguns). Quando algum forasteiro surge, primeiramente elas não se sentem ameaçadas, vendo ali uma oportunidade para brincar ou pregar peças. Caso os invasores sejam astutos o bastante para percebê-las, podem ser convidados para jogos e celebrações. Se mesmo assim os intrusos se mostrarem hostis, as fadinhas debandam e pedem ajuda ao grupo de aventureiros mais próximo.
Embora apreciem muito a vida na floresta, sílfides e silfos não têm nada de tímidos. Quando os humanos começaram sua expansão a partir de Valkaria, foram logo recebidos pelos minúsculos “vizinhos” — e nunca mais se livraram deles! Sílfides podem ser vistas zumbindo em quase todos os pontos do Reinado, especialmente lugares onde existam muitos hynne, como as Repúblicas Livres de Sambúrdia. Uma sílfide encantadora pode às vezes ser encontrada no comando de uma grande comunidade sílfide (isso é, até onde essas fadas travessas podem ser comandadas).
Espírito (sílfide) Minúsculo
Iniciativa +9, Percepção +5, visão no escuro
Defesa 25, Fort +7, Ref +21, Von +15, imunidade a encantamento
Pontos de Vida 211
Deslocamento Voo 12m (8q)
✦ Pontos de Mana 60 Enganadora Nata (Reação, 3PM) Quando é alvo de uma ação hostil, a sílfide encantadora muda o alvo da ação para uma criatura em alcance médio cujo nome ela conheça.
“Eu Não Acredito em Fadas.” Quando um inimigo passa em um teste de Vontade contra a sílfide, ela perde 5 PV.
“Oi, Qual o Seu Nome?” Uma criatura que de alguma forma revele seu nome verdadeiro à sílfide sofre –2 em testes de resistência contra ela.
✦ Onomancia Feérica (Livre) Uma vez por rodada, a sílfide dá uma ordem, como o efeito básico da magia Comando, a uma criatura em alcance médio que tenha revelado seu nome a ela em algum momento.
Raio Arcano (Padrão) Uma criatura em alcance curto sofre 4d12+12 pontos de dano de essência (Ref CD 28 reduz à metade).
Magias Como uma feiticeira de 9º nível (CD 28, limite de PM 9).
• Adaga Mental (Padrão, 6 PM) Uma criatura em alcance curto sofre 4d6 pontos de dano psíquico e fica atordoada por 1 rodada (Von reduz à metade e evita a condição). Se falhar no teste de resistência, a criatura não percebe que a sílfide lançou a magia. Uma criatura só pode ser atordoada por esta magia uma vez por cena.
• Criar Ilusão (Padrão, 4 PM, sustentada) A sílfide cria uma ilusão com imagens e sons combinados em alcance médio, que ocupa até 6 cubos de 1,5m. Criaturas e objetos atravessam a ilusão sem sofrer dano (Von desacredita).
• Disfarce Ilusório (Padrão, 3 PM) Até o fim da cena, a sílfide muda a própria aparência, incluindo seu equipamento, e ainda os odores e as sensações que transmite. Isso afeta altura, peso, tom de pele, cor de cabelo, timbre de voz etc. Ela recebe +20 em testes de Enganação para disfarce (Von desacredita).
• Imobilizar (Padrão, 6 PM) Um animal ou humanoide em alcance curto fica paralisado (Von reduz para lento). A cada rodada, a vítima pode gastar uma ação completa para fazer um novo teste de Vontade. Se passar, liberta-se do efeito.
• Invisibilidade (Padrão, 4 PM) A sílfide fica invisível até o fim da cena ou até realizar uma ação hostil. Ela recebe camuflagem total e +10 em testes de Furtividade contra ouvir, e criaturas que não possam vê-la ficam desprevenidas contra seus ataques.
For –2, Des 4, Con 2, Int 1, Sab –1, Car 6
Perícias Diplomacia +16, Enganação +16, Furtividade +17.
Equipamento Bolsa de pó canalizadora, gorro de ervas.
Tesouro Padrão.`
        },
        {
          chave: "velhaBruxa", nome: "Velha Bruxa", nd: "9", tipo: "Espírito Médio",
          papel: "especial",
          resumo: "A anciã parece impossivelmente velha para um ser humano, mais velha que as árvores e as montanhas.",
          texto:
`Velha Bruxa ND 9
A anciã parece impossivelmente velha para um ser humano, mais velha que as árvores e as montanhas. Tem uma corcunda pronunciada, um grande nariz verruguento, cabelos desgrenhados, pele esverdeada e dedos compridos com unhas negras.
A velha bruxa não é uma arcanista, mas um tipo de fada com a aparência de uma bruxa idosa — tão exagerada que beira o impossível. Estas fadas traiçoeiras vivem para amedrontar os mortais, disfarçando seus abusos com alguma necessidade fingida: comida, medicamento, ouro...
Por exemplo, fala-se de uma bruxa que aprisionava crianças para engordá-las e então devorá-las, alegando que senão morreria de fome (no entanto, vivia em uma casa de doces para atrair as crianças, sem nunca comer os doces). Houve outra que envenenou uma princesa para se casar com seu pai rico, mas nunca usou a própria magia para enriquecer. Como muitas fadas, velhas bruxas têm comportamentos caprichosos e excêntricos, sem finalidade prática que não seja praticar o mal. Todas as velhas bruxas podem voar, cavalgando algum instrumento ordinário, como um caldeirão, pilão ou vassoura. Quase todas também vivem em alguma habitação mágica, como a casa de doces ou uma cabana com imensas pernas de galinha, capaz de se locomover.
Espírito Médio
Iniciativa +7, Percepção +10, visão no escuro
Defesa 31, Fort +16, Ref +9, Von +20, imunidade a doenças e encantamento, redução de dano 10/adamante
Pontos de Vida 270
Deslocamento 9m (6q)
Pontos de Mana 63
Corpo a Corpo Duas garras +25 (2d6+16) e mordida +25 (1d6+14).
✦ Careta Horripilante (Movimento) Criaturas em alcance curto ficam abaladas (Von CD 30 evita e a criatura fica imune a esta habilidade por um dia). Dê um Trocado para Esta Bruxa A velha bruxa para transeuntes pedindo algo: comida, dinheiro, objetos ou qualquer outra coisa. Quem se oferece para atender o pedido deve fazer um teste de Vontade (CD 30). Se falhar, fica enfeitiçado pela bruxa, seguindo-a aonde ela mandar (provavelmente para seu item voador, indo direto para a casa). Se passar, percebe a tramoia e fica imune a esta habilidade por um dia.
✦ Voar, Voar A bruxa pode voar usando um pilão, vassoura ou outro tipo de instrumento. Esse instrumento concede deslocamento voo 18m (12q), mas apenas para a bruxa.
Magias Como uma bruxa de 9º nível (CD 30). Seu foco arcano é o objeto que ela usa para voar (veja Voar, Voar).
• Conjurar Monstro (Completa, 6 PM, sustentada) A bruxa conjura um monstro Grande em um espaço desocupado em alcance curto. Ele tem Defesa 31, imunidade a efeitos que exigem testes de Fortitude ou Vontade, For 7, Des 2, 75 PV, deslocamento 12m e pode fazer uma ação de movimento por rodada. A bruxa pode gastar uma ação padrão para que ele se desloque o dobro nessa rodada ou cause 4d6+10 pontos de dano de impacto em uma criatura a até 3m.
• Muralha Elemental (Padrão, 9 PM) Uma muralha de fogo com até 30m de comprimento e 3m de altura se eleva da terra em alcance médio. Um lado da muralha emite ondas de calor, que causam 2d8 pontos de dano de fogo em criaturas a até 6m quando a magia é lançada e no início dos turnos da bruxa. Atravessar a muralha causa 12d8 pontos de dano de fogo.
• Rogar Maldição (Padrão, 6 PM, sustentada) A bruxa amaldiçoa uma criatura em alcance curto. O alvo fica debilitado, lento e esmorecido. Além disso, não pode se comunicar ou lançar magias (Fort evita).
• Vidência (Completa, 6 PM, sustentada) A bruxa pode ver e ouvir uma criatura a sua escolha e seus arredores em alcance ilimitado (Von evita). O teste de resistência é modificado de acordo com a familiaridade da bruxa com o alvo da magia (Tormenta20, p. 211).
For 2, Des 1, Con 2, Int 4, Sab 1, Car 3
Perícias Conhecimento +12, Enganação +13, Misticismo +14.
Equipamento Uma vassoura, pilão ou outro instrumento doméstico. Tesouro Padrão.`
        },
        {
          chave: "eiradaanGuardiao", nome: "Eiradaan Guardião", nd: "7", tipo: "Espírito (eiradaan) Médio",
          papel: "especial",
          resumo: "O recém-chegado poderia ser um elfo, com as mesmas orelhas pontiagudas, os mesmos olhos amendoados e traços delicados.",
          texto:
`Eiradaan Guardião ND 7
O recém-chegado poderia ser um elfo, com as mesmas orelhas pontiagudas, os mesmos olhos amendoados e traços delicados. Mas não. Ele é algo “mais” que um elfo; mais belo, mais delgado, mais atraente. O corpo exibe a força do mundo natural, com galhadas ramificando-se na cabeça. Nos olhos, grande inteligência, mas também certo resquício de alguma tristeza profunda.
Também chamados de “elfos arcanos”, os eiradaan seriam supostos ancestrais distantes, lendários, dos elfos atuais. Eles seriam, para os elfos, aquilo que os elfos são para os humanos: seres de graça, beleza e magia muito superiores.
Nascidos em Vitalia, o Reino de Lena, estes feéricos chegaram a Arton após um evento que trouxe grande tristeza, relacionado à sua função original: proteger a Deusa da Vida de todo o mal da Criação. Não há registros sobre o que teria exatamente acontecido; sabe-se apenas que os eiradaan falharam em sua tarefa, sendo assim expulsos de seu lar divino.
Neste mundo, os elfos arcanos se refugiaram nas florestas mais densas e profundas, onde outros seres primordiais ainda vivem. Lendas dizem que, nesses locais secretos, ergueram reinos feéricos próprios que governam conforme seus caprichos. De fato, muitos nobres na corte de Thantalla-Dhaedelin, a Rainha da Pondsmânia, são eiradaan, especialmente as fadas da Casa Ellyarión. Talvez a própria rainha também seja. Eiradaan entregam-se a longos momentos de melancolia, ou então buscam se manter ocupados para afastar a tristeza (mas nunca se dedicam a um mesmo projeto por muito tempo). Apesar de seu poder mágico fenomenal, eiradaan ainda são fadas: vulneráveis a emoções fortes, tornando-se perigosos quando algo desperta sua antiga mágoa.
Os assim chamados eiradaan nobres são cavaleiros feéricos — guardiões, guerreiros e soldados de elite da Rainha das Fadas. São imponentes e dignos, vivendo conforme códigos e tabus de honra e glória, duelando (entre si ou com mortais) ou protegendo locais sagrados. Suas montarias são grandes gamos celestiais presenteados por Allihanna; dizem que a deusa, às vezes, também oferta essas montarias sagradas a outros devotos valorosos.
Espírito (eiradaan) Médio
Iniciativa +12, Percepção +10, visão no escuro
Defesa 28, Fort +7, Ref +14, Von +20, resistência a magia +2
Pontos de Vida 215
Deslocamento 9m (6q)
Pontos de Mana 35
Corpo a Corpo Espada longa de mitral x2 +22 (3d8+20, 18).
Canção da Melancolia Quando faz um teste de Vontade contra efeitos mentais, o eiradaan guardião rola dois dados e usa o pior resultado.
Essência Feérica O eiradaan pode falar com animais livremente.
Magia Acelerada (Livre, +4 PM) Uma vez por rodada, quando lança uma magia com execução de ação completa ou menor, o eiradaan muda a execução dela para livre.
✦ Sentidos Místicos O eiradaan está sempre sob o efeito básico de Visão Mística.
Magias Como um feiticeiro de 7º nível (CD 26). O custo total dos aprimoramentos de suas magias diminui em –1 PM (já contabilizado).
• Amarras Etéreas (Padrão, 5 PM) Três laços de energia surgem e se enroscam em uma criatura em alcance médio, deixando-a agarrada (Ref evita). A vítima pode tentar se livrar, gastando uma ação padrão para fazer um teste de Atletismo. Se passar, destrói um laço, mais um laço adicional para cada 5 pontos pelos quais superou a CD. Cada laço também pode ser atacado e destruído (Defesa 10, 10 PV, RD 5 e imunidade a dano mágico). Um laço destruído causa 1d8+1 pontos de dano de essência à criatura amarrada. Se todos os laços forem destruídos, a magia é dissipada. Os laços afetam criaturas incorpóreas.
• Dissipar Magia (Padrão, 3 PM) O eiradaan escolhe uma criatura, objeto ou esfera de 3m em alcance médio e faz um teste de Misticismo. Todas as magias nesse alvo com CD igual ou menor que o resultado do teste são dissipadas.
• Enfeitiçar (Padrão, 5 PM) Cada humanoide em alcance curto fica enfeitiçado pelo eiradaan até o fim da cena, ou até que ele ou um de seus aliados realize uma ação hostil contra a criatura (Von evita).
• Relâmpago (Padrão, 6 PM) O eiradaan lança um relâmpago em cada criatura escolhida em alcance médio, causando 8d8 pontos de dano de eletricidade (Ref reduz à metade).
• Velocidade (Padrão, 3 PM, sustentada) O eiradaan pode executar uma ação padrão adicional por turno, que não pode ser usada para lançar magias.
For 2, Des 4, Con 2, Int 1, Sab 3, Car 5
Perícias Atletismo +9, Conhecimento +8, Diplomacia +12, Intuição +10, Misticismo +10, Sobrevivência +10.
Equipamento Espada longa de mitral. Tesouro Padrão.`
        },
        {
          chave: "eiradaanNobre", nome: "Eiradaan Nobre", nd: "13", tipo: "Espírito (eiradaan) Médio",
          papel: "especial",
          resumo: "O recém-chegado poderia ser um elfo, com as mesmas orelhas pontiagudas, os mesmos olhos amendoados e traços delicados.",
          texto:
`Eiradaan Nobre ND 13
O recém-chegado poderia ser um elfo, com as mesmas orelhas pontiagudas, os mesmos olhos amendoados e traços delicados. Mas não. Ele é algo “mais” que um elfo; mais belo, mais delgado, mais atraente. O corpo exibe a força do mundo natural, com galhadas ramificando-se na cabeça. Nos olhos, grande inteligência, mas também certo resquício de alguma tristeza profunda.
Também chamados de “elfos arcanos”, os eiradaan seriam supostos ancestrais distantes, lendários, dos elfos atuais. Eles seriam, para os elfos, aquilo que os elfos são para os humanos: seres de graça, beleza e magia muito superiores.
Nascidos em Vitalia, o Reino de Lena, estes feéricos chegaram a Arton após um evento que trouxe grande tristeza, relacionado à sua função original: proteger a Deusa da Vida de todo o mal da Criação. Não há registros sobre o que teria exatamente acontecido; sabe-se apenas que os eiradaan falharam em sua tarefa, sendo assim expulsos de seu lar divino.
Neste mundo, os elfos arcanos se refugiaram nas florestas mais densas e profundas, onde outros seres primordiais ainda vivem. Lendas dizem que, nesses locais secretos, ergueram reinos feéricos próprios que governam conforme seus caprichos. De fato, muitos nobres na corte de Thantalla-Dhaedelin, a Rainha da Pondsmânia, são eiradaan, especialmente as fadas da Casa Ellyarión. Talvez a própria rainha também seja. Eiradaan entregam-se a longos momentos de melancolia, ou então buscam se manter ocupados para afastar a tristeza (mas nunca se dedicam a um mesmo projeto por muito tempo). Apesar de seu poder mágico fenomenal, eiradaan ainda são fadas: vulneráveis a emoções fortes, tornando-se perigosos quando algo desperta sua antiga mágoa.
Os assim chamados eiradaan nobres são cavaleiros feéricos — guardiões, guerreiros e soldados de elite da Rainha das Fadas. São imponentes e dignos, vivendo conforme códigos e tabus de honra e glória, duelando (entre si ou com mortais) ou protegendo locais sagrados. Suas montarias são grandes gamos celestiais presenteados por Allihanna; dizem que a deusa, às vezes, também oferta essas montarias sagradas a outros devotos valorosos.
Espírito (eiradaan) Médio
Iniciativa +16, Percepção +14, visão no escuro
Defesa 41, Fort +14, Ref +19, Von +26, resistência a magia +4, redução de dano 5
Pontos de Vida 470
Deslocamento 12m (8q)
Pontos de Mana 65
Corpo a Corpo Espada longa de mitral x2 +35 (4d8+52, 18).
Canção da Melancolia Quando faz um teste de Vontade contra efeitos mentais, o eiradaan nobre rola dois dados e usa o pior resultado. Código de Honra O eiradaan não pode atacar um oponente pelas costas (em termos de jogo, não pode se beneficiar do bônus de flanquear), caído, desprevenido ou incapaz de lutar.
Duelo (Livre, 2 PM) O eiradaan escolhe um oponente em alcance curto e recebe +2 em testes de ataque e rolagens de dano contra ele até o fim da cena ou até atacar outro oponente.
Montaria Celestial O eiradaan cavalga um gamo celestial, um parceiro montaria Grande. Enquanto estiver montado, seu deslocamento se torna 15m e ele recebe uma ação de movimento extra (apenas para se deslocar).
✦ Sentidos Místicos O eiradaan está sempre sob o efeito básico de Visão Mística.
Magias Como um feiticeiro de 13º nível (CD 37). Ele pode lançar magias montado sem precisar de testes de concentração e o custo total dos aprimoramentos de suas magias diminui em –1 PM (já contabilizado).
• Concentração de Combate (Padrão, 7 PM) Até o fim da cena, quando faz um ataque, o eiradaam rola dois dados e usa o melhor resultado. Quando um oponente ataca o eiradaan nobre, rola dois dados e usa o pior resultado.
• Libertação (Padrão, 9 PM) O eiradaan fica imune a efeitos de movimento e ignora qualquer efeito que impeça ou restrinja seu deslocamento.
• Relâmpago (Padrão, 15 PM) O eiradaan lança um relâmpago em cada criatura escolhida em alcance médio, causando 16d8 pontos de dano de eletricidade (Ref reduz à metade).
• Selo de Mana (Padrão, 6 PM) Um selo mágico se manifesta em uma criatura adjacente até o fim da cena. Sempre que ela fizer qualquer ação que gaste PM, deve fazer um teste de Vontade. Se passar, a ação funciona. Se falhar, a ação não tem efeito, mas os PM são gastos mesmo assim.
• Velocidade (Padrão, 3 PM, sustentada) O eiradaan pode executar uma ação padrão adicional por turno, que não pode ser usada para lançar magias.
For 2, Des 4, Con 3, Int 2, Sab 4, Car 6
Perícias Cavalgar +16, Conhecimento +14, Diplomacia +18, Intuição +14, Misticismo +14, Sobrevivência +14.
Equipamento Espada longa de mitral. Tesouro Padrão.
✦ Parceiro O gamo é um parceiro montaria (Grande) que fornece os benefícios a seguir. Iniciante: seu deslocamento muda para 12m e você ignora terreno difícil. Veterano: você ganha deslocamento de voo 12m. Mestre: você pode gastar uma ação completa e 10 PM para transportar você e o gamo para o Plano etéreo (como o efeito básico da magia Forma Etérea), com duração sustentada. O efeito acaba se você desmontar do gamo.`
        },
      ],

      regras: [
        { titulo: "Fadas",
          texto:
`Sílfides e silfos, com seu tamanho diminuto e asas graciosas, talvez sejam as fadas mais conhecidas de Arton — mas nem de longe são as únicas. Os seres feéricos são muitos e variados, nascidos da magia presente nas paisagens de Arton, mantendo uma conexão poderosa com algum ambiente natural. Existem fadas relacionadas a florestas, montanhas, rios, mares, ventos… enfim, tudo que é puro, espontâneo e intocado.

Os seres feéricos têm temperamentos variados, de cordiais e brincalhões a reclusos e rabugentos. Mas um traço comum que quase todos apresentam é um certo grau de imaturidade, por assim dizer: mesmo os mais antigos e inteligentes podem se comportar como crianças, incapazes de controlar as próprias emoções. Ficam frustrados e zangados com facilidade, especialmente quando seus desejos são negados. Por outro lado, mesmo a mais simples brincadeira logo lhes devolve a alegria. Essa busca constante por recreação e novidade acaba levando-os ao envolvimento com aventureiros, desde simples travessuras (que podem ser inofensivas ou perigosas) até duelos apaixonados ou relações amorosas. Fadas são caóticas, volúveis, imprevisíveis; quase nunca acham importante dizer a verdade ou manter promessas. Fazem apenas o que estão dispostas a fazer, exceto quando se afeiçoam muito a alguém — nesse caso não medem esforços para agradar e proteger o objeto de seu interesse. Embora boa parte das fadas tenha aparência feminina, muitas também são andróginas, e outras masculinas. Quase todas, contudo, mudam livremente de gênero conforme a vontade: convenções como sílfide/silfo são apenas invenções humanas, que os feéricos acham muito divertidas.` },
        { titulo: "Coriza e Espirros",
          texto:
`A critério do mestre, criaturas feéricas como fadas, duendes e mesmo eiradaan podem causar efeitos adversos aos aventureiros. Ao final de cada cena em que um personagem interage com uma ou mais criaturas feéricas pela primeira vez, ele deve fazer um teste de Fortitude (CD 20). Se falhar, contrai a doença febre do riso (Tormenta20, p. 318). Alternativamente, se você tiver o suplemento Ameaças de Arton, use a doença rinite feérica (p. 360).` },
      ],
    },

    // ── 🧞 GÊNIOS ──────────────────────────────────
    {
      chave: "genios", nome: "Gênios", icone: "🧞", cor: "#8a4f9e",
      intro: "Criados pelo Panteão para construir o mundo, os gênios firmam pactos em vez de conceder desejos: viram parceiros de quem os convence. Um para cada elemento — água, ar, fogo, luz, terra e trevas.",
      fichas: [
        {
          chave: "yazzu", nome: "Yazzu", nd: "10", tipo: "Espírito (gênio) Grande",
          papel: "especial",
          subgrupo: "Habilidades de Gênios",
          resumo: "Alto e vigoroso como um minotauro, o recém-chegado tem pele azulada com tatuagens claras, cabelo e barba longos, escuros e esverdeados como…",
          texto:
`Yazzu ND 10
Alto e vigoroso como um minotauro, o recém-chegado tem pele azulada com tatuagens claras, cabelo e barba longos, escuros e esverdeados como algas marinhas. Exibe braços musculosos e cheios de braceletes, pulseiras e anéis dourados. Sobre o peito nu, um imponente colar de conchas. Empunha um tridente também dourado, de cabo perolado.
Sem muita surpresa, gênios da água — também chamados de yazzu — podem ser encontrados mais facilmente perto dos mares e grandes rios. Não faltam histórias de bucaneiros que ficaram muito ricos, ou se tornaram quase invencíveis, pela existência de um gênio em sua tripulação. Fala-se também de aldeias nas profundezas onde yazzu atuam como guardiões.
Yazzu são bondosos e generosos como os outros gênios, mas também são aqueles que mais clamam por liberdade. Não ficam presos a um único amo por muito tempo, exceto quando se afeiçoam — ou quando são forçados por seus códigos, então buscando formas de escapar. São também mais combativos, não raras vezes empunhando o tridente mágico em batalha para proteger seus mestres.
Em combate, yazzu usam as forças das águas a seu favor. Expelem ondas avassaladores para derrubar os inimigos e jatos de água fervente para escaldá-los. Refugiam-se entre os vagalhões para dificultar a visão dos oponentes, dali comandando a fúria dos oceanos.
Espírito (gênio) Grande
Iniciativa +14, Percepção +5
Defesa 31, Fort +23, Ref +18, Von +10, imunidade a encantamento e frio
Pontos de Vida 292
Deslocamento 9m (6q), natação 12m (8q), voo 12m (8q)
Pontos de Mana 72
Corpo a Corpo Tridente x2 +25 (1d10+18 mais 1d6 frio).
À Distância Tridente +23 (1d10+18 mais 1d6 frio).
Contracorrente (Reação, 3 PM) Quando faz um ataque à distância com seu tridente, o yazzu se teleporta para um espaço livre adjacente ao alvo.
Onda Poderosa (Padrão) O yazzu cria uma onda que ocupa um quadrado de 6m de lado em alcance médio. Criaturas na área são empurradas 6m em uma direção à escolha do yazzu e sofrem 8d10 pontos de dano de impacto (Fort CD 32 reduz à metade e evita o empurrão).
Turbilhão (Padrão) O yazzu faz uma manobra derrubar com seu tridente (teste +29) contra todas as criaturas adjacentes a ele.
Magias Como um feiticeiro de 12º nível (CD 32).
• Área Escorregadia (Padrão, 1 PM) Criaturas numa área de 3m de lado em alcance curto devem passar em um teste de Reflexos (CD 32) para não cair. Nas rodadas seguintes, criaturas que tentem se movimentar pela área devem fazer testes de Acrobacia para equilíbrio (CD 15).
• Controlar Água (Padrão, 6 PM) Até o fim da cena, o yazzu controla a água em uma esfera de 30m em alcance longo (Tormenta20, p. 186).
• Criar Elementos (Padrão, 6 PM) O yazzu preenche um espaço Colossal com água, ou cria um cubo Colossal de gelo. Alternativamente, ele pode criar objetos simples feitos de gelo.
• Dardo Gélido (Padrão, 7 PM) Uma criatura em alcance curto sofre 8d6 pontos de dano de frio e fica lenta por 1 rodada (Fort reduz à metade e evita a condição).
• Salto Dimensional (Reação, 5 PM) O yazzu recebe +5 na Defesa e em testes de Reflexos contra um ataque ou efeito que esteja prestes a atingi-lo. Após a resolução do efeito, ele salta para um espaço adjacente desocupado.
For 3, Des 5, Con 2, Int 1, Sab 0, Car 3
Perícias Atletismo +12, Diplomacia +18, Furtividade +14, Ladinagem +14, Misticismo +12.
Equipamento Tridente aumentado banhado a ouro.
Tesouro Padrão.
Parceiro O yazzu é um parceiro que fornece os benefícios a seguir. Iniciante: você recebe +2 em testes contra manobras de combate e efeitos de movimento. Veterano: uma vez por rodada, você pode gastar uma ação de movimento e 4 PM para criar uma onda mágica de água em um cubo de 4,5m em alcance curto. Criaturas nessa área sofrem 4d4 pontos de dano de impacto e ficam caídas. Mestre: como acima, mas o bônus em testes aumenta para +4 e o dano da onda aumenta para 4d6.`
        },
        {
          chave: "jairuan", nome: "Jairuan", nd: "6", tipo: "Espírito (gênio) Grande",
          papel: "especial",
          subgrupo: "Habilidades de Gênios",
          resumo: "Maior que o mais alto dos humanos, o rapaz de pele bronzeada e tatuada é também forte, atlético, como um gladiador.",
          texto:
`Jairuan ND 6
Maior que o mais alto dos humanos, o rapaz de pele bronzeada e tatuada é também forte, atlético, como um gladiador. Veste um colete diminuto, calças folgadas, uma larga faixa vermelha na cintura e sapatos de pontas recurvadas. Traz um largo sorriso acima do pequeno cavanhaque.
Também conhecidos como jairuan, estes são os mais amistosos e sociáveis entre os gênios — e isso significa que são muito, muito amistosos e sociáveis. De fato, são os únicos que às vezes formam pequenas comunidades, com estruturas sociais complexas, existindo algumas no Deserto da Perdição. Outros encontram lugar nas grandes cidades humanas, servindo a amos escolhidos ou atuando como artistas de palco para entreter multidões. Outros mais, é claro, acompanham e protegem grupos de heróis. Enquanto todos os outros gênios são rígidos em seu comportamento e códigos, gênios do ar costumam ser mais informais, mais displicentes em suas regras.
Podem abrir exceções para aqueles por quem se afeiçoam muito. Todos sabem voar, mas é comum que utilizem tapetes voadores — para assim transportar outros que necessitem.
Jairuan são pacifistas por natureza, buscam solucionar desavenças com diálogo, quase nunca recorrem à violência. Quando confrontados, preferem influenciar seus oponentes com encantamentos ou enganá-los com ilusões; são mestres em fazer com que seus oponentes destruam a si mesmos, atacando aliados ou caindo em armadilhas.
Grandes sacerdotes de Wynna, assim como arcanistas e bardos que tenham agradado à deusa, são às vezes agraciados com um gênio do ar como aliado.
Espírito (gênio) Grande
Iniciativa +10, Percepção +5, visão no escuro
Defesa 21, Fort +12, Ref +16, Von +8, imunidade a encantamento e eletricidade
Pontos de Vida 158
Deslocamento 9m (6q), voo 12m (8q)
Pontos de Mana 41
Corpo a Corpo Cimitarra x2 +18 (1d8+10, 18).
Vendaval (Movimento) Criaturas em uma área de 3m em alcance médio sofrem 4d8+25 pontos de dano de impacto (Ref CD 22 reduz à metade). Recarga (movimento).
Magias Como um feiticeiro de 6º nível (CD 22).
• Enfeitiçar (Padrão, 1 PM) Um humanoide em alcance curto fica enfeitiçado (Von evita).
• Invisibilidade (Padrão, 5 PM) O jairuan fica invisível até o fim da cena ou até realizar uma ação hostil. Ele recebe camuflagem total e +10 em testes de Furtividade contra ouvir, e criaturas que não possam vê-lo ficam desprevenidas contra seus ataques.
• Relâmpago (Padrão, 5 PM) O jairuan causa 8d6 pontos de dano de eletricidade em todas as criaturas em uma linha de 30m (Ref reduz à metade).
For 2, Des 5, Con 3, Int 2, Sab 1, Car 4
Perícias Atletismo +14, Intimidação +9, Misticismo +9.
Equipamento Cimitarra. Tesouro Padrão.
Parceiro O jairuan é um parceiro que fornece os benefícios a seguir. Iniciante: você pode lançar uma magia de encantamento ou ilusão de 1° círculo (definida pelo jairuan; atributo-chave Carisma). Veterano: seu deslocamento muda para 12m (normal e de voo). Mestre: seu deslocamento normal e de voo muda para 18m e, quando voa, você pode carregar uma criatura Média ou menor sem penalidades por carga.`
        },
        {
          chave: "gizzehi", nome: "Gizzehi", nd: "12", tipo: "Espírito (gênio) Grande",
          papel: "especial",
          subgrupo: "Habilidades de Gênios",
          resumo: "Embora lembre uma mulher humanoide, a criatura é alta como um celeiro e sua pele parece carvão, mas com símbolos brilhantes de chamas.",
          texto:
`Gizzehi ND 12
Embora lembre uma mulher humanoide, a criatura é alta como um celeiro e sua pele parece carvão, mas com símbolos brilhantes de chamas. A vasta cabeleira feita de fogo faz com que pareça mais uma tocha ou farol. Colete curto, calças largas e muitas joias formam sua indumentária. Os olhos ardem como brasas, penetrantes e concentrados.
Enquanto outros gênios ficam felizes em servir, isso infelizmente não se aplica aos gizzehi, como gênios do fogo são também chamados. Pelo contrário, sua chama é alimentada por sentimentos de ódio e revolta contra a servidão. Criados assim pelos deuses, gênios do fogo também precisam servir a mestres — caso contrário seus poderes diminuem gradualmente até sumir. Então eles o fazem, mas nunca de bom grado. São seres cheios de ressentimento, ansiosos por vingança contra seus amos, sempre buscando formas de burlar seus acordos.
Cumprem ordens, mas nunca sem um rosnar de raiva, nunca sem uma ameaça velada.
Gizzehi tentam deturpar desejos para prejudicar aqueles que os fazem. Há uma história sobre o guerreiro que pediu uma espada mágica poderosa e foi transportado para o covil de um dragão, enterrado em seu tesouro de itens mágicos (onde de fato havia uma espada, bem como um dragão furioso). Ou aquela sobre o bardo que desejou o amor de uma donzela élfica; acabou transformado em um pássaro gracioso, que a elfa adotou e amou muito como bichinho de estimação.
Assim, embora seja possível se tornar amo de um gênio do fogo, muita cautela é recomendada.
Espírito (gênio) Grande
Iniciativa +13, Percepção +12, visão no escuro
Defesa 39, Fort +11, Ref +27, Von +19, imunidade a encantamento e fogo
Pontos de Vida 412
Deslocamento Voo 12m (8q)
Pontos de Mana 85
Corpo a Corpo Pancada +27 (1d3+3 mais 8d6 fogo).
Magias Como um feiticeiro de 15º nível (CD 35).
• Açoite Flamejante (Movimento, 7 PM, sustentada) Um açoite de fogo surge na mão do gizzehi. Ele pode gastar uma ação padrão para açoitar uma criatura em alcance curto, que sofre 6d8 pontos de dano de fogo e fica em chamas e enredada enquanto estiver em chamas (Ref reduz à metade e evita as condições).
• Coluna de Chamas (Padrão, 13 PM) Um cilindro de fogo com 3m de raio e 30m de altura desce dos céus em alcance longo, causando 13d6 pontos de dano de fogo mais 6d6 pontos de dano de luz nas criaturas e objetos livres na área (Ref reduz à metade).
• Controlar Fogo (Padrão, 3 PM) O gizzehi cria, molda, move ou extingue chamas e emanações de calor em alcance médio (Tormenta20, p. 187).
• Explosão Caleidoscópica (Padrão, 10 PM) Criaturas em um raio de 6m em alcance curto ficam atordoadas por 1 rodada e enjoadas por 1d4 rodadas (Fort muda para desprevenidas e enjoadas por 1 rodada). Uma criatura só pode ser atordoada por esta magia uma vez por cena. Criaturas com menos de 10 níveis sofrem efeitos variados (Tormenta20, p. 193).
• Marca da Obediência (Padrão, 6 PM) O gizzehi ordena que uma criatura adjacente não ataque ele ou seus aliados até o fim da cena (Von evita). A criatura pode repetir o teste de Vontade em cada um de seus turnos subsequentes mas, se falhar, sofre 3d6 pontos de dano psíquico.
For –1, Des 3, Con 2, Int 2, Sab 1, Car 7
Perícias Diplomacia +19, Enganação +22, Misticismo +14.
Tesouro Nenhum.
Parceiro O gizzehi é um parceiro que fornece os benefícios a seguir. Iniciante: seus ataques corpo a corpo deixam o alvo em chamas mágicas. Veterano: quando você deixa uma criatura em chamas, o dano dessa condição aumenta para 1d8. Mestre: quando você deixa uma criatura em chamas, ela precisa gastar uma ação completa (em vez de uma ação padrão) para tentar apagar o fogo.`
        },
        {
          chave: "allaraz", nome: "Allaraz", nd: "14", tipo: "Espírito (gênio) Grande",
          papel: "especial",
          subgrupo: "Habilidades de Gênios",
          resumo: "Ela lembra uma guerreira élfica, mas alta e vigorosa como uma árvore, o cabelo prateado preso em rabo de cavalo muito longo.",
          texto:
`Allaraz ND 14
Ela lembra uma guerreira élfica, mas alta e vigorosa como uma árvore, o cabelo prateado preso em rabo de cavalo muito longo.
Veste uma toga curta, exibindo braços e pernas fortes, além de joias douradas. Por todo o corpo, sinais luminosos.
No olhar, luz de bondade e pureza.
Embora os gênios tenham sido criados para atuar em harmonia durante a criação do mundo, existe inimizade entre eles — afinal, alguns são obra de deuses bondosos e outros, de deuses malignos.
Naqueles tempos imemoriais de gênese, quando Arton estava sendo forjada, a harmonia não era total (para dizer o mínimo). Houve diferença, houve conflito, cada divindade tinha sua própria visão de um mundo perfeito. Criações de um deus eram atacadas, vandalizadas, destruídas por outros. Lugares paradisíacos eram arrasados para dar lugar a terras devastadas, então novamente a paraísos, e outra vez destroços. Assim, nem todos os gênios existiam para construir. Havia gênios dedicados a destruir. E havia gênios para detê-los.
Os gênios da luz, ou allaraz, são facilmente confundidos com celestiais — pode-se dizer que são suas “versões arcanas”. Assim como celestiais combatem os abissais, allaraz têm a missão de combater os destruidores dabbus, não sendo incomum que allaraz e celestiais acabem aliados a aventureiros em grandes batalhas contra demônios e gênios das trevas.
Gênios da luz anseiam por proteger as obras dos deuses, escolhendo seus amos entre aqueles que abraçam tal devoção. São também aqueles que se regozijam com o uso da magia arcana para promover o bem.
Espírito (gênio) Grande
Iniciativa +17, Percepção +11
Defesa 44, Fort +14, Ref +22, Von +28, imunidade a dano de luz, resistência a magia +5
Pontos de Vida 490
Deslocamento 12m (8q), voo 15m (10q)
Pontos de Mana 113
Corpo a Corpo Pancada x2 +37 (4d8+25, mais 2d6 luz).
✦ Contramágica Aprimorada (Reação) Uma vez por rodada, o allaraz faz uma contramágica.
✦ Proteger Criação (Reação, 10 PM) Uma vez por rodada, quando uma criatura em alcance curto do allaraz sofre dano, ele concede RD 50 a ela contra esse dano.
✦ Reverter Destruição (Completa, 5 PM) Criaturas em alcance curto à escolha do allaraz que tenham sofrido dano nessa cena recuperam 6d8+6 PV.
Magias Como um feiticeiro de 14º nível (CD 40, limite de PM 22).
• Dissipar Magia (Padrão, 3 PM) O allaraz escolhe uma criatura, objeto ou esfera de 3m em alcance médio e faz um teste de Misticismo. Todas as magias nesse alvo com CD igual ou menor que o resultado do teste são dissipadas.
• Explosão Caleidoscópica (Padrão, 10 PM) Criaturas numa área de 6m de raio em alcance curto ficam atordoadas por 1 rodada e enjoadas por 1d4 rodadas (Fort muda para desprevenidas e enjoadas por 1 rodada). Criaturas com menos de 10 níveis sofrem efeitos variados (Tormenta20, p. 193). Uma criatura só pode ser atordoada por esta magia uma vez por cena.
• Flecha de Luz (Padrão, 16 PM)* Duas criaturas em alcance médio sofrem 6d8+6 pontos de dano de luz e ficam cegas por 1d4 rodadas, então ofuscadas.
• Globo de Invulnerabilidade (Padrão, 10 PM, sustentada) O allaraz é envolto por uma esfera mágica de 3m que detém qualquer magia de 3º círculo ou menor.
• Leque Cromático (Padrão, 8 PM) Criaturas em um cone de 4,5m ficam atordoadas por 1 rodada (apenas uma vez por cena, Von anula), ofuscadas e vulneráveis.
• Raio Solar (Padrão, 18 PM) Criaturas em uma linha de 30m a partir do allaraz sofrem 10d8 (ou 10d12 se forem mortos-vivos) pontos de dano de luz, ficam cegas por 1d4 rodadas e ofuscadas por uma rodada (Ref reduz à metade e evita as condições).
• Selo de Mana (Padrão, 10 PM) Um selo mágico se manifesta em criaturas escolhidas em alcance curto até o fim da cena. Sempre que elas fizerem qualquer ação que gaste PM, devem fazer um teste de Vontade. Se passarem, a ação funciona. Se falharem, a ação não tem efeito, mas os PM são gastos mesmo assim.
For 4, Des 4, Con 3, Int 2, Sab 4, Car 8
Perícias Conhecimento +15, Diplomacia +20, Misticismo +20, Religião +17.
Tesouro Padrão.
Parceiro O allaraz é um parceiro que fornece os benefícios a seguir. Iniciante: você pode lançar uma magia de ilusão ou evocação de 1º círculo (definida pelo allaraz; atributo-chave Carisma). Veterano: você pode lançar Campo de Força. Mestre: uma vez por rodada, você pode gastar 4 PM para curar 5d8+5 PV em uma criatura em alcance curto.`
        },
        {
          chave: "kemooz", nome: "Kemooz", nd: "9", tipo: "Espírito (gênio) Grande",
          papel: "especial",
          subgrupo: "Habilidades de Gênios",
          resumo: "Bem maior que um ogro, a mulher inacreditavelmente robusta cruza os braços imensos sobre o peito.",
          texto:
`Kemooz ND 9
Bem maior que um ogro, a mulher inacreditavelmente robusta cruza os braços imensos sobre o peito. Tem pele marrom, com símbolos místicos em tom mais claro. Usa um colete curto, calças bufantes, botas pesadas, cinto largo e braçadeiras massivas, tudo com adereços de ouro. Na cabeça nua e brilhante, traz um pequenino e curioso chapéu cilíndrico. Tem olhar firme e expressão dura.
Embora as lendas digam que gênios construíram Arton, nenhum parece mais digno dessa atribuição que os gênios da terra — ou kemooz, como também são chamados. Eles são os engenheiros, arquitetos e construtores entre os gênios. São os mais devotados a erguer estruturas gigantescas, construíram os palácios de quase todos os deuses do Panteão. Em Arton, além de incontáveis fortalezas (e masmorras), teriam erguido as próprias Lannestul, Sanguinárias, Uivantes e outras cordilheiras. Há rumores sobre brigadas trabalhando nessas cadeias montanhosas até hoje, pois ainda não teriam sido concluídas!
A expressão sempre austera pode levar a pensar que estes gênios são sérios, mal-humorados, mas não é o caso. Mesmo que não sorriam tanto, kemooz têm o mesmo coração bondoso e generoso de seus irmãos. Têm imenso prazer em concluir uma obra que será desfrutada, que traga alegria a outros. São honrados, sinceros e bastante literais ao atender a desejos, o que algumas vezes leva a erros de interpretação que podem ser divertidos ou trágicos.
Os bardos cantam uma lenda sobre a brigada kemooz encarregada pelos deuses de construir a estátua de Valkaria, bem como suas masmorras planares. Os gênios cumpriram a missão, mas resignados, não apenas porque seu trabalho seria cativeiro para uma deusa, mas também porque traria morte a grandes heróis. Cheios de rancor e revolta, fugiram de seus postos e se esconderam em vários pontos de Arton, como monstros reclusos.
Não é comum que gênios da terra aceitem aventureiros como amos, mas alguns se afeiçoam a anões e medusas.
Espírito (gênio) Grande
Iniciativa +10, Percepção +14, visão no escuro
Defesa 34, Fort +21, Ref +6, Von +15, imunidade a encantamento e ácido, redução de dano 10
Pontos de Vida 280
Deslocamento 9m (6q), escavação 9m (6q)
Pontos de Mana 57
Corpo a Corpo Pancada +25 (2d8+42 mais 6d8 ácido).
Terraformista Se o kemooz estiver em contato com o solo, o custo de sua magia Controlar Terra é reduzido à metade (após aplicar aprimoramentos e quaisquer outros efeitos que reduzam seu custo).
Magias Como um feiticeiro de 9º nível (CD 30).
• Amarras Etéreas (Padrão, 6 PM) Três laços de energia surgem e se enroscam em uma criatura em alcance médio, deixando-a agarrada (Ref evita). A vítima pode tentar se livrar, gastando uma ação padrão para fazer um teste de Atletismo. Se passar, destrói um laço, mais um laço adicional para cada 5 pontos pelos quais superou a CD. Cada laço também pode ser atacado e destruído (Defesa 10, 10 PV, RD 5 e imunidade a dano mágico). Um laço destruído causa 1d8+1 pontos de dano de essência na criatura amarrada. Se todos os laços forem destruídos, a magia é dissipada. Os laços afetam criaturas incorpóreas.
• Controlar Terra (Padrão, 9 PM) O kemooz transforma 9 cubos de terra com 1,5m de lado em alcance longo em uma parede (RD 8 e 50 PV) que fornece cobertura total. Ele pode aplicar outros efeitos aos cubos (Tormenta20, p. 188).
• Jato Corrosivo (Padrão, 9 PM) O kemooz projeta uma linha corrosiva de 9m. Criaturas nessa área sofrem 10d6 pontos de dano de ácido, enquanto construtos e objetos soltos sofrem 10d6+4 pontos de dano (Ref reduz à metade).
For 4, Des 1, Con 5, Int 2, Sab 3, Car 0
Perícias Atletismo +14, Misticismo +12.
Tesouro Padrão.
Parceiro O kemooz é um parceiro que fornece os benefícios a seguir. Iniciante: uma vez por rodada, você pode criar um cubo de terra de 1,5m de lado em um espaço desocupado a até 9m. O cubo tem RD 5 e 30 PV e dura até o fim da cena ou até você acumular 4 cubos. Veterano: você recebe +2 na Defesa. Mestre: você pode lançar Controlar Terra (atributo-chave Carisma).`
        },
        {
          chave: "dabbus", nome: "Dabbus", nd: "15", tipo: "Espírito (gênio) Grande",
          papel: "especial",
          subgrupo: "Habilidades de Gênios",
          resumo: "Difícil discernir a forma da criatura, diluída nas sombras ao redor.",
          texto:
`Dabbus ND 15
Difícil discernir a forma da criatura, diluída nas sombras ao redor. Quando elas se afastam, revelam um homem careca, exceto pelo rabo de cavalo longo e escuro, como se feito de trevas. Suas calças, botas, cinto e braçadeiras são igualmente negros, com adereços dourados. Tatuagens púrpuras, misteriosas e intrincadas, revestem todo o seu corpo.
Assim como os allaraz lembram celestiais em sua bondade e desejo de fazer o bem, gênios das trevas — ou dabbus — são muito semelhantes a demônios. Foram criados por deuses malignos para conspurcar e destruir as obras de seus rivais durante a criação do mundo. Assim, se existem lugares terríveis e desolados em Arton, é porque os dabbus foram parcialmente bem-sucedidos em sua missão...
Dabbus são egoístas e odeiam quaisquer outros seres na existência, mas — como todos os gênios — estão presos à obrigação de servir a mestres. Diferente dos gizzehi, que tentam trair e destruir seus amos, dabbus consideram-se mais astutos, aceitando apenas amos que praticam o mal. Mesmo como servos, regozijam-se em espalhar destruição, alcançando a antiga e tão desejada vingança. Por esse motivo é comum que grandes vilões tenham estes seres como servos poderosos.
É muito perigoso, contudo, possuir um gênio das trevas como servo. Quando o amo se torna fraco ou clemente, quando demonstra um mínimo de piedade, um dabbus pode decidir que não deseja mais ser seu lacaio. Talvez o mate, ou talvez rogue uma maldição terrível, antes de procurar um novo e impiedoso senhor.
Espírito (gênio) Grande
Iniciativa +18, Percepção +9, visão no escuro
Defesa 48, Fort +15, Ref +22, Von +28, imunidade a trevas, resistência a magia arcana +10
Pontos de Vida 525
Deslocamento 12m (8q), voo 15m (10q)
Pontos de Mana 98
Corpo a Corpo Pancada x2 +41 (3d10+25 mais 2d8 trevas).
Conduta Dabbus Um dabbus só aceita amos malignos (a critério do mestre) ou devotos de deuses que canalizam apenas energia negativa. Por aceitarem apenas os amos mais cruéis, normalmente não servem a personagens jogadores.
Devorar Magia (Reação) Quando passa no teste de resistência contra uma magia da qual foi alvo, o dabbus não sofre nenhum efeito da magia e recupera uma quantidade de PM igual ao valor gasto nela.
Magia Acelerada (Livre, +4 PM) Uma vez por rodada, quando lança uma magia com execução de ação completa ou menor, o dabbus muda a execução dela para livre.
Ódio Ancestral Quando o dabbus reduz os PV de um inimigo a 0 ou menos, recupera metade do dano que causou a esse inimigo.
Magias Como um feiticeiro de 15º nível (CD 42).
• Crânio Voador de Vladislav (Padrão, 9 PM) Dois crânios de energia negativa causam 6d8+6 pontos de dano de trevas em duas criaturas em alcance médio e deixa os alvos e todas as criaturas a 3m deles abaladas (Fort reduz à metade e evita a condição).
• Desintegrar (Padrão, 14 PM) Uma criatura ou objeto em alcance médio sofre 12d12 pontos de dano de essência (Fort reduz para 3d12). Se for reduzido a 0 PV, o alvo vira pó.
• Manto das Trevas (Padrão, 6 PM sustentada) O dabbus se torna incorpóreo e pode gastar uma ação de movimento e 1 PM para entrar em uma sombra e se teletransportar para outra sombra em alcance médio. Se for exposto à luz solar, sofre 1 ponto de dano por rodada.
• Tentáculos de Trevas (Padrão, 10 PM) Até o fim da cena, tentáculos surgem em uma esfera de 6m em alcance médio e tentam agarrar todas as criaturas na área. Ao lançar a magia, e no início de cada um de seus turnos, o dabbus faz um teste da manobra agarrar (usando Misticismo) contra cada criatura na área. Se ele passar, a criatura é agarrada; se a vítima já está agarrada, é esmagada, sofrendo 8d6 pontos de dano de trevas (cada tentáculo recebe +15 em sua primeira rolagem de dano). A área conta como terreno difícil e os tentáculos são imunes a dano.
• Toque Vampírico (Padrão, 15 PM) O dabbus faz um ataque corpo a corpo. Se acertar, além do dano normal, causa 15d6 pontos de dano de trevas e recupera pontos de vida iguais à metade desse dano de trevas.
• Transformação de Guerra (Padrão, 6 PM, sustentada) O dabbus recebe +6 na Defesa, em testes de ataque e em rolagens de dano corpo a corpo, e 30 PV temporários, mas não pode lançar outras magias.
• Velocidade (Padrão, 10 PM, sustentada) O dabbus pode executar uma ação padrão adicional por turno.
• Vitalidade Fantasma (Padrão, 10 PM) Criaturas vivas em uma esfera com 6m de raio centrada no dabbus sofrem 3d10 pontos de dano de trevas (Fort reduz à metade). O dabbus recebe PV temporários iguais ao dano total causado.
For 3, Des 5, Con 4, Int 2, Sab 2, Car 8
Perícias Enganação +21, Intimidação +21, Misticismo +17.
Tesouro Padrão.`
        },
      ],

      regras: [
        { titulo: "Gênios",
          texto:
`Todos concordam que o Panteão criou Arton, esculpiu e povoou suas paisagens. Muitos acreditam que os deuses executaram esse trabalho hercúleo com as próprias mãos. Outros, contudo, sustentam que serviçais teriam sido criados para auxiliar na tarefa. Estes servos mágicos impressionantes seriam conhecidos como gênios.

Gênios são seres extraplanares nativos de reinos dos deuses onde a magia arcana dos elementos é poderosa. Quase todos se originam de Magika, o Reino de Wynna, embora também existam em abundância nos domínios de Azgher, Kally, Oceano, Tanna-Toh, Tenebra, Thyatis, Sszzaas e outros. Alguns, ainda, visitam Arton em missões para seus patronos. Todos os gênios são imortais: se forem destruídos, acabam ressurgindo algum tempo depois. Como foram criados em sua forma final, também não crescem ou envelhecem, nem se reproduzem — quando procriam (entre si mesmos ou com outras raças), o resultado são os qareen.

Os gênios quase nunca formam grandes comunidades — lendas sobre “cidades de gênios” são apenas isso: lendas. É comum, contudo, que se reúnam em equipes ou brigadas para executar alguma grande tarefa. Algumas das construções mais impressionantes de Arton, como a própria Academia Arcana, foram erguidas por gênios.

Gênios foram criados pelos deuses unicamente para servir. Alguns acreditam que eles são escravizados — há gênios que também pensam assim, buscam liberdade, sonham nunca mais obedecer a ordens. Esses, contudo, são exceções. Quase todos são solícitos, generosos, prestativos, muito satisfeitos em agradar seus mestres. São a personificação da bondade e da caridade, sentindo-se plenos com a felicidade de outros. Um gênio sem mestre pode reverter a uma forma diminuta ou dormente em algum objeto mundano, enquanto aguarda seu próximo amo.

Isso não significa, contudo, que um gênio obedece a qualquer um, nem atende a qualquer pedido! Gênios têm padrões quanto a quem aceitam como mestre, restringindo-se a devotos de sua divindade criadora, ou devotos em potencial, ou alguém que realizou um grande feito, ou simplesmente alguém que considerem merecedor. Cada gênio também tem seu código de conduta, com suas próprias regras rígidas: nunca contrariar as obrigações e restrições de seu deus, ou atender a apenas três desejos de cada amo, ou nunca ressuscitar os mortos, ou nunca fazer alguém se apaixonar...

Os tipos de gênios são relacionados às energias elementais fundamentais, o que também afeta sua aparência e seus poderes. Quase todos são humanoides, pertencentes a quaisquer gêneros; muitos são belos e atraentes, outros monstruosos. As mesmas marcas corporais presentes nos qareen também existem nos gênios, mas ocupam o corpo inteiro.` },
        { titulo: "Habilidades de Gênios",
          texto:
`Todos os gênios têm as seguintes habilidades. Dentro de uma Lampadazinha. Para cada dia sem um pacto ativo, o total de PM do gênio é reduzido em 1; se for reduzido a 0 PM dessa forma, ele sofre um efeito debilitante, diferente para cada gênio; alguns diminuem de tamanho e se tornam Minúsculos; outros sofrem algo parecido com a magia Aprisionamento, ficando contidos em algum objeto mundano, como um anel ou lâmpada. O mestre determina esse efeito para cada gênio. O efeito debilitante e a perda de PM são revertidos quando o gênio firma um pacto com um amo.
Poderes Cósmicos Fenomenais (Completa). O gênio estabelece um pacto com uma criatura inteligente (Int –3 ou maior) voluntária em alcance curto, que se torna seu amo. O gênio se torna um parceiro iniciante do amo e, enquanto estiver presente na cena, o custo de suas próprias habilidades mágicas é reduzido em –1 PM. Um gênio só pode ter um amo por vez, podendo encerrar o pacto a qualquer momento com uma ação completa.
Servo dos Deuses. Todos os gênios podem lançar a magia Viagem Planar, sem necessidade de componente material, mas apenas em si mesmos.` },
        { titulo: "A Conduta dos Gênios",
          texto:
`Embora tenham sido criados pelos deuses com um propósito específico, gênios possuem individualidade e personalidade próprias. Cada gênio tem seus próprios critérios quanto a quem aceitará como seu amo, e também sobre que tipo de favores, desejos e auxílios está disposto a prestar. Gênios são geralmente bondosos, muitas vezes negando-se a atender a pedidos de amos malignos: gênios a serviço de tais mestres geralmente estão aprisionados ou sob algum efeito mágico de servidão. Um gênio que aceita um amo de bom grado se torna um parceiro iniciante de seu tipo. Conforme a relação se estreita e ambos aprendem a confiar um no outro, os poderes do gênio aumentam. A critério do mestre, o nível de parceiro do gênio se eleva conforme o relacionamento com seu amo se torna mais profundo.` },
        { titulo: "Mas e os Desejos!?",
          texto:
`Talvez a habilidade mais característica de gênios seja sua capacidade de conceder desejos mágicos, de forma semelhante à magia Desejo. Mas onde estão os desejos dos gênios descritos aqui? O fato é que nem todos os gênios podem realizar um Desejo — e aqueles que podem não usam tal poder de maneira leviana. Conceder um desejo é uma grande dádiva e, ainda que faça parte da natureza dos gênios, não é algo a ser concedido a qualquer um. Gênio capazes de conceder desejos o fazem conforme sua conduta pessoal. Em termos de jogo, gênios que concedem desejos normalmente não são parceiros — apenas NPCs sob controle do mestre. Eles podem usar seus desejos como recompensa por serviços ou boas ações realizadas pelos personagens, por exemplo.` },
      ],
    },

    // ── 🗿 GIGANTES ────────────────────────────────
    {
      chave: "gigantes", nome: "Gigantes", icone: "🗿", cor: "#7a6a55",
      intro: "A prole de Megalokk que sobrou da Era dos Monstros. Do capanga galokk ao gigante máximo, que é grande demais para caber nas regras normais de combate.",
      fichas: [
        {
          chave: "galokkCapanga", nome: "Galokk Capanga", nd: "6", tipo: "Humanoide (gigante) Grande",
          papel: "lacaio",
          resumo: "Chega a ser difícil determinar a raça da mulher, e quase inacreditável supor ser humana.",
          texto:
`Galokk Capanga ND 6
Chega a ser difícil determinar a raça da mulher, e quase inacreditável supor ser humana. Deve ser quase tão alta quanto um ogro, com ombros ainda mais largos. Braços e pernas de puro músculo, quase não contidos pela meia armadura escamada de adamante. O elmo de face aberta, adornado com chifres, faz pouco para conter a juba farta e selvagem, cor de palha. Uma capa pesada torna sua silhueta ainda maior.
Gigantes são os "humanos de Megalokk". Mas são opostos aos humanos verdadeiros, por serem estagnados; não buscam, não avançam, não evoluem, não ambicionam. Valkaria os odeia e despreza, não teve nenhuma participação em sua gênese. Ou teve? Xamãs de Megalokk provocam, gargalham que Valkaria contribuiu com o surgimento desses seres. Devotos da deusa, claro, renegam tal absurdo. Afirmam que ela jamais teria participado disso.
Mas a existência de meios-gigantes pode ser evidência de que a Deusa da Ambição teve, sim, algum envolvimento na origem desses monstros.
Também chamados galokk, meios-gigantes não são uma raça ou povo. Não resultam de cruzamentos entre humanos e gigantes, não têm gigantes como ancestrais. Eles surgem de formas não naturais: nascem em famílias humanas, crescem como crianças e jovens normais, atingindo tamanho avantajado apenas bem depois de adultos. Outros são devotos de Megalokk, recompensados e transformados por aprazê-lo. Outros ainda são vítimas de maldições.
Galokk são grandes e fortes, mas também temidos, raramente encontrando lugar em cidades feitas para seres menores. Muitos acabam como capangas, guarda-costas, gladiadores, soldados ou bárbaros. Mas existem aqueles que desafiam suas naturezas, adotam carreiras inesperadas como arcanistas, bardos, até inventores.
Humanoide (gigante) Grande
Iniciativa +3, Percepção +3
Defesa 26, Fort +17, Ref +7, Von +12
Pontos de Vida 50
Deslocamento 9m (6q)
Corpo a Corpo Machado de guerra x2 +24 (3d6+19, x3).
Força dos Titãs Quando acerta um ataque corpo a corpo, o galokk capanga pode rolar mais uma vez qualquer resultado máximo da rolagem de dano e adicionar o novo resultado ao dano causado.
Forçar a Barra (Reação) Uma vez por rodada, quando faz um teste de resistência, o galokk soma sua Força (+4) nesse teste.
For 4, Des 0, Con 2, Int –1, Sab 0, Car –2
Perícias Atletismo +9, Intimidação +5.
Equipamento Couro batido, machado de guerra aumentado.
Tesouro Nenhum.`
        },
        {
          chave: "galokkGuardaCostas", nome: "Galokk Guarda-Costas", nd: "10", tipo: "Humanoide (gigante) Grande",
          papel: "lacaio",
          resumo: "Chega a ser difícil determinar a raça da mulher, e quase inacreditável supor ser humana.",
          texto:
`Galokk Guarda-Costas ND 10
Chega a ser difícil determinar a raça da mulher, e quase inacreditável supor ser humana. Deve ser quase tão alta quanto um ogro, com ombros ainda mais largos. Braços e pernas de puro músculo, quase não contidos pela meia armadura escamada de adamante. O elmo de face aberta, adornado com chifres, faz pouco para conter a juba farta e selvagem, cor de palha. Uma capa pesada torna sua silhueta ainda maior.
Gigantes são os "humanos de Megalokk". Mas são opostos aos humanos verdadeiros, por serem estagnados; não buscam, não avançam, não evoluem, não ambicionam. Valkaria os odeia e despreza, não teve nenhuma participação em sua gênese. Ou teve? Xamãs de Megalokk provocam, gargalham que Valkaria contribuiu com o surgimento desses seres. Devotos da deusa, claro, renegam tal absurdo. Afirmam que ela jamais teria participado disso.
Mas a existência de meios-gigantes pode ser evidência de que a Deusa da Ambição teve, sim, algum envolvimento na origem desses monstros.
Também chamados galokk, meios-gigantes não são uma raça ou povo. Não resultam de cruzamentos entre humanos e gigantes, não têm gigantes como ancestrais. Eles surgem de formas não naturais: nascem em famílias humanas, crescem como crianças e jovens normais, atingindo tamanho avantajado apenas bem depois de adultos. Outros são devotos de Megalokk, recompensados e transformados por aprazê-lo. Outros ainda são vítimas de maldições.
Galokk são grandes e fortes, mas também temidos, raramente encontrando lugar em cidades feitas para seres menores. Muitos acabam como capangas, guarda-costas, gladiadores, soldados ou bárbaros. Mas existem aqueles que desafiam suas naturezas, adotam carreiras inesperadas como arcanistas, bardos, até inventores.
Humanoide (gigante) Grande
Iniciativa +5, Percepção +7
Defesa 35, Fort +21, Ref +11, Von +16
Pontos de Vida 80
Deslocamento 6m (4q)
Corpo a Corpo Machado de batalha x2 +34 (1d10+31, x3) e escudo pesado +34 (1d8+26).
Força dos Titãs Quando acerta um ataque corpo a corpo, o galokk guarda-costas pode rolar mais uma vez qualquer resultado máximo da rolagem de dano e adicionar o novo resultado ao dano causado.
Forçar a Barra Uma vez por rodada, quando faz um teste de resistência, o galokk soma sua Força (+5) nesse teste.
Grande Escudo O galokk guarda-costas fornece cobertura leve a aliados adjacentes menores que ele.
For 5, Des 0, Con 2, Int 0, Sab 0, Car –2
Perícias Atletismo +14, Intimidação +9.
Equipamento Escudo pesado espinhoso, machado de batalha aumentado, meia armadura. Tesouro Metade.`
        },
        {
          chave: "giganteBicefalo", nome: "Gigante Bicéfalo", nd: "13", tipo: "Humanoide (gigante) Enorme",
          papel: "solo",
          resumo: "O imenso humanoide de corpo musculoso veste apenas uma tanga de couro esfarrapada e empunha duas enormes clavas rústicas.",
          texto:
`Gigante Bicéfalo ND 13
O imenso humanoide de corpo musculoso veste apenas uma tanga de couro esfarrapada e empunha duas enormes clavas rústicas.
Mas tudo isso vocês reparam apenas mais tarde. A primeira coisa que chama atenção são as duas cabeças, de feições e expressões diferentes. Enquanto uma delas rosna com ódio, a outra os observa com curiosidade. Este gigante é uma versão mais massiva e monstruosa do gigante das rochas, com as mesmas dimensões aproximadas. Conforme observado por estudiosos, cada cabeça tem mente e personalidade individuais, controlando uma metade do corpo. Por isso, embora muito forte, o monstro também é desajeitado — agindo normalmente apenas durante os raros momentos em que ambas as cabeças buscam um mesmo objetivo.
Sempre cheio de rancor, e capaz de golpear com duas clavas ao mesmo tempo, o gigante bicéfalo pode ser um adversário muito difícil. Em combate, será vantajoso para seus oponentes que as cabeças entrem em desacordo, tornando o adversário menos efetivo; uma tática várias vezes tentada por aventureiros é enganar uma das cabeças, fazendo com que discorde da outra. Se este monstro é uma mutação do gigante das rochas ou algum experimento de arcanistas loucos, ninguém sabe. Considerado bizarro até mesmo por seus primos, o gigante bicéfalo não tem lugar em suas aldeias, perambulando sozinho pelos ermos. Isso é, tão sozinho quanto um ser de duas cabeças consegue estar.
Humanoide (gigante) Enorme
Iniciativa +10, Percepção +17
Defesa 44, Fort +26, Ref +11, Von +20
Pontos de Vida 680
Deslocamento 12m (8q)
Corpo a Corpo Duas clavas +38 (4d10+40).
Arremessar Duas Rochas (Completa) O gigante bicéfalo arremessa duas rochas, cada uma em um quadrado de 3m em alcance curto. Criaturas nessas áreas sofrem 6d12 pontos de dano de impacto (Ref CD 35 reduz à metade).
Atropelamento (Completa) O gigante percorre até o dobro de seu deslocamento. Ele pode passar pelos espaços de quaisquer inimigos menores que ele, mas não pode passar duas vezes pelo mesmo espaço. Criaturas atropeladas dessa forma sofrem 6d10+40 pontos de dano de impacto e ficam caídas (Ref CD 35 reduz à metade e evita a condição). Recarga (movimento).
Duas Cabeças… quando faz um teste de Intuição ou Vontade, o gigante faz dois testes e usa o melhor resultado.
…Brigam Mais do que Uma Quando usa Duas Cabeças... em um teste contra uma perícia baseada em Carisma ou contra um efeito de encantamento, se passar em apenas um dos testes, o gigante fica pasmo por uma rodada. Ele só pode ficar pasmo dessa forma uma vez por cena para a mesma perícia ou o mesmo efeito.
For 14, Des –1, Con 10, Int –2, Sab 1, Car –2
Perícias Atletismo +26, Intimidação +13.
Equipamento Clava aumentada x2. Tesouro Dobro.`
        },
        {
          chave: "giganteDasColinas", nome: "Gigante das Colinas", nd: "7", tipo: "Humanoide (gigante) Enorme",
          papel: "solo",
          resumo: "Alto como um armazém, o monstro tem alguma semelhança com um homem, mas bruto, primitivo, selvagem.",
          texto:
`Gigante das Colinas ND 7
Alto como um armazém, o monstro tem alguma semelhança com um homem, mas bruto, primitivo, selvagem. Veste muitas peles de animais, costuradas de forma precária. Suas partes expostas são nodosas, cobertas de rugas e calosidades.
Tufos de cabelo afloram na cabeçorra deformada, onde olhos minúsculos revelam apenas estupidez e selvageria. Empunha uma clava com dentes, feita com a ossada de alguma grande besta.
Duas ou três vezes mais alto que um humano, este é o menor e mais numeroso dos gigantes. Aquele que mais frequentemente pode ser visto vagando próximo a rotas comerciais, atacando pequenos povoados ou mesmo formando aldeias e tribos nas áreas inexploradas do Reinado. Gigantes das colinas se organizam de formas simples, liderados pelo mais forte. Não constroem habitações, vivendo em cavernas ou como nômades.
Em combate, gigantes das colinas buscam simplesmente esmagar os inimigos com suas clavas, ou arremessando pedras. Às vezes podem ser encontrados como guardas para vilões que sejam poderosos o bastante para controlá-los.
Dizem que os membros da mítica sociedade gigante Ked'Rach pertenciam a camadas sociais condizentes com seu tamanho — sendo os gigantes das colinas a classe mais baixa. Eles atuariam como servos e soldados, apenas seguindo ordens, não importando assim sua inteligência limitada. Por outro lado, também suspeita-se que tenham abraçado a ignorância e selvageria apenas após deixar sua nação, sendo mais espertos quando viviam lá.
Humanoide (gigante) Enorme
Iniciativa +2, Percepção +2
Defesa 31, Fort +20, Ref +14, Von +7
Pontos de Vida 280
Deslocamento 9m (6q)
Corpo a Corpo Clava x2 +24 (1d10+24).
Arremessar Rochas (Completa) O gigante das colinas arremessa uma rocha em um quadrado de 3m em alcance curto. Criaturas nessa área sofrem 6d12 pontos de dano de impacto (Ref CD 24 reduz à metade).
For 9, Des –1, Con 3, Int –2, Sab –1, Car –1
Perícias Atletismo +16, Intimidação +8, Sobrevivência +6.
Equipamento Clava aumentada, gibão de peles. Tesouro Bolsa de gigante.`
        },
        {
          chave: "giganteDoFogo", nome: "Gigante do Fogo", nd: "11", tipo: "Humanoide (gigante) Enorme",
          papel: "especial",
          resumo: "O estranho ser poderia lembrar um anão de Doherimm, com a mesma estatura atarracada, a mesma barba copiosa — mas toda semelhança acaba aí.",
          texto:
`Gigante do Fogo ND 11
O estranho ser poderia lembrar um anão de Doherimm, com a mesma estatura atarracada, a mesma barba copiosa — mas toda semelhança acaba aí. Ele é grande como uma cabana, sua pele como carvão, mas com partes incandescentes, em brasa. O cabelo e a barba parecem feitos de fogo, os olhos brilham com chamas de uma fúria prestes a ser liberada. Ele veste armadura dourada e empunha um machado flamejante.
Enquanto outros gigantes lembram humanos, gigantes do fogo parecem de alguma forma relacionados aos anões. Este monstro lembra um anão, mas duas vezes mais alto que um humano. Seu corpo queima com energia elemental interna, como acontece com os dragões. De fato, alguns sábios especulam que a origem destes seres esteja ligada aos dragões, ou mesmo ao próprio Sckhar, o Dragão-Rei do Fogo. Na suposta nação gigante Ked'Rach, estes gigantes seriam cavaleiros de elite, patrulhando a região em montarias voadoras dracônicas.
Por outro lado, essa história parece duvidosa, pois gigantes do fogo já habitavam uma camada do subterrâneo abaixo de Doherimm antes que os anões descobrissem a forja. Talvez a natureza ígnea destes monstros esteja ligada ao calor primordial no centro de Arton, não a qualquer força consciente.
Gigantes do fogo são os mais militarizados destes seres. Já usavam boas armas e armaduras antes que os anões pudessem fabricá-las, embora nunca tenham evoluído em suas técnicas. Combatem com tática e estratégia, muitas vezes servindo a vilões e senhores da guerra, e até ao próprio Sckhar. Pelo menos um batalhão chegou a lutar durante a Marcha de Arsenal contra o Reinado.
Humanoide (gigante) Enorme
Iniciativa +7, Percepção +9, visão no escuro
Defesa 36, Fort +24, Ref +9, Von +15, imunidade a fogo, redução de dano 10
Pontos de Vida 390
Deslocamento 9m (6q)
Corpo a Corpo Machado de batalha x3 +27 (3d6+16, x3, mais 2d6 fogo).
Arremessar Bigorna (Padrão) O gigante do fogo arremessa sua bigorna em um quadrado de 4,5m em alcance curto. Criaturas nessa área sofrem 10d12 pontos de dano, metade impacto e metade fogo, e ficam em chamas (Ref CD 33 reduz à metade e evita a condição). Recarga (recuperar a bigorna).
Bigorna Flamejante (Padrão) O gigante faz com que uma arma adjacente cause +2d6 pontos de dano de fogo até o fim da cena. Ele não pode utilizar esta habilidade se usar Arremessar Bigorna (por motivos óbvios).
Falange de Fogo Aliados adjacentes ao gigante recebem redução de dano 5.
Ponto de Forja Criaturas que causem dano corpo a corpo contra o gigante ou contra um dos aliados adjacentes a ele sofrem 4d6 pontos de dano e ficam com suas armas avariadas (Fort CD 33 evita a avaria).
For 12, Des –2, Con 4, Int 3, Sab –1, Car 1
Perícias Atletismo +23, Guerra +12, Oficio (armeiro) +14.
Equipamento Machado de batalha de adamante aumentado, meia armadura banhada a ouro. Tesouro Padrão.`
        },
        {
          chave: "giganteDasRochas", nome: "Gigante das Rochas", nd: "9", tipo: "Humanoide (gigante) Enorme",
          papel: "solo",
          resumo: "Sua cabeça poderia facilmente alcançar o topo da muralha de um castelo.",
          texto:
`Gigante das Rochas ND 9
Sua cabeça poderia facilmente alcançar o topo da muralha de um castelo. Tem pele clara e longos cabelos castanhos, adornados com anéis metálicos. Sob sobrancelhas cerradas, os olhos verdes trazem uma sombra de ameaça. Enverga uma couraça rústica e empunha um machado imenso, adornado com runas. Ainda que gigantes das colinas sejam mais comuns, o gigante das rochas é aquele mais conhecido pelos povos de Arton, o gigante clássico das histórias de aventura. Além de ser maior e mais forte, o gigante das rochas não é estúpido ou selvagem como seu primo das colinas. Também não é especialmente agressivo, buscando um modo de vida muito semelhante ao dos bárbaros humanos. Gigantes das rochas formam comunidades nos ermos, vivendo de caça e coleta, praticando suas culturas e louvando seus deuses. Por outro lado, não é verdade que sejam exatamente pacíficos; ficam enfurecidos com facilidade e, quando encontram outros povos, sua primeira reação é lutar. Diálogo, apenas se surgir algum bom motivo.
Estes gigantes se organizam em aldeias lideradas por um chefe, cujo posto é hereditário (embora possa ser tomado por um desafiante). Erguem habitações de pedra, forjam armas avantajadas, vestem armaduras simples e são famosos por suas bebidas, servidas em canecos generosos. Suas festas são lendárias, às vezes aceitando forasteiros que se mostrem merecedores. São também grandes fanfarrões, gostam muito de torneios — que podem ser lutas, provas de força, duelos de charadas ou testes de resistência à bebida.
Em sua cultura, “gigante” é um título de honra, que eles concedem a outros quando mostram valor. Por isso existem casos de humanos e outros seres vivendo em suas aldeias, como membros legítimos da tribo. Possivelmente isso é um traço cultural residual da sociedade Ked’Rach, onde gigantes das rochas seriam os cidadãos de classe média, adotando funções variadas como artesãos e soldados.
Ainda que incidentes violentos ocorram, relações entre gigantes das rochas e outros povos tendem a ser tranquilas. Comércio com eles exige cautela, pois quando um gigante se sente trapaceado, as consequências são brutais. Por outro lado, uma tribo destes gigantes teve atuação importante durante a Marcha de Arsenal, auxiliando o Reinado contra o vilão.
Existem variantes regionais do gigante das rochas, nomeadas conforme o ambiente em que vivem. Nas Uivantes são chamados gigantes do gelo, enquanto em ilhas e regiões costeiras são gigantes do mar. Embora tenham diferenças culturais e até habilidades próprias, são essencialmente as mesmas criaturas.
Humanoide (gigante) Enorme
Iniciativa +6, Percepção +5
Defesa 33, Fort +21, Ref +9, Von +14, redução de dano 5
Pontos de Vida 380
Deslocamento 12m (8q)
Corpo a Corpo Machado de batalha x2 +26 (4d12+10, x4).
Barril Gigante de… (Completa) O gigante das rochas usa uma dose da bebida de seu barril gigante (CD 28).
Arremessar Barris (Padrão) O gigante arremessa seu barril em um quadrado de 3m em alcance curto. Criaturas nessa área sofrem 7d12 pontos de dano de impacto (Ref CD 28 reduz à metade). Recarga (recuperar o barril).
Fúria Blindada Enquanto está sob efeito de Pavio Curto, o gigante sofre apenas metade do dano de corte, impacto e perfuração não mágico.
Pavio Curto (Reação) Quando é ofendido ou sofre dano de um inimigo, o gigante entra em fúria. Ele recebe +3 em testes de ataque e rolagens de dano, e seus ataques deixam as vítimas sangrando, mas ele deve sempre deve atacar a criatura mais próxima. A fúria termina se, ao fim da rodada, ele não tiver atacado nem sido alvo de um efeito hostil.
For 11, Des –1, Con 4, Int 1, Sab –1, Car –1
Perícias Atletismo +19, Intuição +7, Oficio (cervejeiro) +9, Sobrevivência +7.
Equipamento Barril gigante, couraça, machado de batalha aumentado maciço. Tesouro Metade.`
        },
        {
          chave: "giganteDoGelo", nome: "Gigante do Gelo", nd: "9", tipo: "Humanoide (gigante) Enorme",
          papel: "solo",
          resumo: "Sua cabeça poderia facilmente alcançar o topo da muralha de um castelo.",
          texto:
`Gigante do Gelo ND 9
Sua cabeça poderia facilmente alcançar o topo da muralha de um castelo. Tem pele clara e longos cabelos castanhos, adornados com anéis metálicos. Sob sobrancelhas cerradas, os olhos verdes trazem uma sombra de ameaça. Enverga uma couraça rústica e empunha um machado imenso, adornado com runas. Ainda que gigantes das colinas sejam mais comuns, o gigante das rochas é aquele mais conhecido pelos povos de Arton, o gigante clássico das histórias de aventura. Além de ser maior e mais forte, o gigante das rochas não é estúpido ou selvagem como seu primo das colinas. Também não é especialmente agressivo, buscando um modo de vida muito semelhante ao dos bárbaros humanos. Gigantes das rochas formam comunidades nos ermos, vivendo de caça e coleta, praticando suas culturas e louvando seus deuses. Por outro lado, não é verdade que sejam exatamente pacíficos; ficam enfurecidos com facilidade e, quando encontram outros povos, sua primeira reação é lutar. Diálogo, apenas se surgir algum bom motivo.
Estes gigantes se organizam em aldeias lideradas por um chefe, cujo posto é hereditário (embora possa ser tomado por um desafiante). Erguem habitações de pedra, forjam armas avantajadas, vestem armaduras simples e são famosos por suas bebidas, servidas em canecos generosos. Suas festas são lendárias, às vezes aceitando forasteiros que se mostrem merecedores. São também grandes fanfarrões, gostam muito de torneios — que podem ser lutas, provas de força, duelos de charadas ou testes de resistência à bebida.
Em sua cultura, “gigante” é um título de honra, que eles concedem a outros quando mostram valor. Por isso existem casos de humanos e outros seres vivendo em suas aldeias, como membros legítimos da tribo. Possivelmente isso é um traço cultural residual da sociedade Ked’Rach, onde gigantes das rochas seriam os cidadãos de classe média, adotando funções variadas como artesãos e soldados.
Ainda que incidentes violentos ocorram, relações entre gigantes das rochas e outros povos tendem a ser tranquilas. Comércio com eles exige cautela, pois quando um gigante se sente trapaceado, as consequências são brutais. Por outro lado, uma tribo destes gigantes teve atuação importante durante a Marcha de Arsenal, auxiliando o Reinado contra o vilão.
Existem variantes regionais do gigante das rochas, nomeadas conforme o ambiente em que vivem. Nas Uivantes são chamados gigantes do gelo, enquanto em ilhas e regiões costeiras são gigantes do mar. Embora tenham diferenças culturais e até habilidades próprias, são essencialmente as mesmas criaturas.
Humanoide (gigante) Enorme
Iniciativa +6, Percepção +5
Defesa 33, Fort +21, Ref +9, Von +14, redução de frio 15
Pontos de Vida 380
Deslocamento 12m (8q)
Corpo a Corpo Machado de batalha x2 +26 (4d12+8, x3, mais 1d6 gelo).
Arremessar Geleira (Completa) O gigante arremessa um pedaço de geleira em um quadrado de 4,5m em alcance curto. Criaturas nessa área sofrem 8d12 pontos de dano de frio e ficam lentas (Ref CD 28 reduz à metade e evita a condição).
Barril Gigante de… (Completa) O gigante usa uma dose da bebida de seu barril gigante (CD 28).
✦ Fúria Gélida Enquanto está sob efeito de Pavio Curto, o gigante emana uma aura de 9m de frio e ventos fortes. Ele recebe camuflagem leve contra ataques à distância feitos fora da aura e, no início dos seus turnos, criaturas dentro da aura sofrem 4d6 pontos de dano de frio (Fort CD 28 reduz à metade).
Pavio Curto (Reação) Quando é ofendido ou sofre dano de um inimigo, o gigante entra em fúria. Ele recebe +3 em testes de ataque e rolagens de dano, e seus ataques deixam as vítimas sangrando, mas ele deve sempre deve atacar a criatura mais próxima. A fúria termina se, ao fim da rodada, ele não tiver atacado nem sido alvo de um efeito hostil.
For 11, Des –1, Con 4, Int 1, Sab –1, Car –1
Perícias Atletismo +21, Intuição +7, Oficio (cozinheiro) +11, Sobrevivência +7.
Equipamento Barril gigante, gibão de peles, machado de batalha aumentado de gelo eterno. Tesouro Metade.`
        },
        {
          chave: "giganteDosMares", nome: "Gigante dos Mares", nd: "9", tipo: "Humanoide (gigante) Enorme",
          papel: "solo",
          resumo: "Sua cabeça poderia facilmente alcançar o topo da muralha de um castelo.",
          texto:
`Gigante dos Mares ND 9
Sua cabeça poderia facilmente alcançar o topo da muralha de um castelo. Tem pele clara e longos cabelos castanhos, adornados com anéis metálicos. Sob sobrancelhas cerradas, os olhos verdes trazem uma sombra de ameaça. Enverga uma couraça rústica e empunha um machado imenso, adornado com runas. Ainda que gigantes das colinas sejam mais comuns, o gigante das rochas é aquele mais conhecido pelos povos de Arton, o gigante clássico das histórias de aventura. Além de ser maior e mais forte, o gigante das rochas não é estúpido ou selvagem como seu primo das colinas. Também não é especialmente agressivo, buscando um modo de vida muito semelhante ao dos bárbaros humanos. Gigantes das rochas formam comunidades nos ermos, vivendo de caça e coleta, praticando suas culturas e louvando seus deuses. Por outro lado, não é verdade que sejam exatamente pacíficos; ficam enfurecidos com facilidade e, quando encontram outros povos, sua primeira reação é lutar. Diálogo, apenas se surgir algum bom motivo.
Estes gigantes se organizam em aldeias lideradas por um chefe, cujo posto é hereditário (embora possa ser tomado por um desafiante). Erguem habitações de pedra, forjam armas avantajadas, vestem armaduras simples e são famosos por suas bebidas, servidas em canecos generosos. Suas festas são lendárias, às vezes aceitando forasteiros que se mostrem merecedores. São também grandes fanfarrões, gostam muito de torneios — que podem ser lutas, provas de força, duelos de charadas ou testes de resistência à bebida.
Em sua cultura, “gigante” é um título de honra, que eles concedem a outros quando mostram valor. Por isso existem casos de humanos e outros seres vivendo em suas aldeias, como membros legítimos da tribo. Possivelmente isso é um traço cultural residual da sociedade Ked’Rach, onde gigantes das rochas seriam os cidadãos de classe média, adotando funções variadas como artesãos e soldados.
Ainda que incidentes violentos ocorram, relações entre gigantes das rochas e outros povos tendem a ser tranquilas. Comércio com eles exige cautela, pois quando um gigante se sente trapaceado, as consequências são brutais. Por outro lado, uma tribo destes gigantes teve atuação importante durante a Marcha de Arsenal, auxiliando o Reinado contra o vilão.
Existem variantes regionais do gigante das rochas, nomeadas conforme o ambiente em que vivem. Nas Uivantes são chamados gigantes do gelo, enquanto em ilhas e regiões costeiras são gigantes do mar. Embora tenham diferenças culturais e até habilidades próprias, são essencialmente as mesmas criaturas.
Humanoide (gigante) Enorme
Iniciativa +6, Percepção +5, visão na penumbra
Defesa 33, Fort +21, Ref +9, Von +14
Pontos de Vida 380
Deslocamento 12m (8q), natação 12m (8q)
Corpo a Corpo Machado de batalha x2 +26 (4d12+10, x3).
Barril Gigante de… (Completa) O gigante dos mares usa uma dose da bebida de seu barril gigante (CD 28).
Coquetel Praiano (Completa) Uma vez por cena, o gigante usa uma bebida que combina os efeitos de duas bebidas diferentes de Barril Gigante...
Darum Tchibum (Padrão) O gigante salta em um quadrado de 4,5m em alcance curto e fica caído. Criaturas nessa área sofrem 9d12 pontos de dano de impacto e são empurradas 6m para fora da área (Ref CD 28 reduz à metade). Recarga (movimento).
Pavio Curto (Reação) Quando é ofendido ou sofre dano de um inimigo, o gigante entra em fúria. Ele recebe +3 em testes de ataque e rolagens de dano e seus ataques deixam as vítimas sangrando, mas ele deve sempre deve atacar a criatura mais próxima. A fúria termina se, ao fim da rodada, ele não tiver atacado nem sido alvo de um efeito hostil.
For 11, Des –1, Con 4, Int 1, Sab –1, Car –1
Perícias Atletismo +19, Intuição +7, Oficio (pescador) +9, Sobrevivência +7.
Equipamento Barril gigante, gibão de peles, machado de batalha aumentado de lanajuste. Tesouro Metade.`
        },
        {
          chave: "giganteReal", nome: "Gigante Real", nd: "19", tipo: "Humanoide (gigante) Colossal",
          papel: "solo",
          resumo: "Estrondos sacodem o chão, em ritmo familiar de passos, denunciando a aproximação de algo bípede e gigantesco.",
          texto:
`Gigante Real ND 19
Estrondos sacodem o chão, em ritmo familiar de passos, denunciando a aproximação de algo bípede e gigantesco. Ele logo se ergue acima das árvores, maior que os mais altos castelos de Valkaria, talvez até maior que a célebre estátua. Sem dúvida humanoide, mas também grotesco, primal. Ainda assim, usa uma armadura rústica e empunha um tacape descomunal — que parece ter sido feito com a maior árvore do mundo. Também chamados de kiojin em Tamu-ra, estes são os maiores gigantes existentes — a versão humanoide dos kaiju das Sanguinárias, figurando entre os maiores seres vivos na face de Arton. Diz-se que, antes de avançar contra o Reinado, Mestre Arsenal testou seu Kishinauros em batalha contra estes seres. Gigantes reais vivem isolados, não formando comunidades, nem mesmo casais. Como também acontece com os kaiju, eles não se reproduzem de formas naturais; foram criados por Megalokk no passado remoto, sem que outros tenham nascido desde então. Muitos podem, inclusive, estar hibernantes em pontos remotos do mundo.
Estes gigantes, como os demais, são extremamente irritadiços — mas também curiosos. Não toleram outras criaturas em seu território, mas buscam observar os povos menores em suas vilas, o que sempre causa pânico geral. Essa reação acaba por deixá-los zangados, levando a ímpetos de fúria e destruição.
Gigantes reais muitas vezes usam armas e armaduras próprias para seu tamanho. Como conseguem esses itens é um enigma. Alguns imaginam serem relíquias das cidades gigantes nas Lannestul. Outros falam de casos em que aldeias humanas fizeram pactos com gigantes reais, forjando seus equipamentos em troca de proteção.
Se gigantes reais tiveram lugar na lendária sociedade Ked’Rach, deve ter sido como seus deuses ou protetores. Diz-se que permaneciam dormentes, podendo ser despertados e comandados por sacerdotes contra os inimigos do povo gigante. Mas tudo isso é lenda ou especulação.
Humanoide (gigante) Colossal
Iniciativa +14, Percepção +9
Defesa 59, Fort +32, Ref +26, Von +19, fortificação 50%, redução de dano 20
Pontos de Vida 1.140
Deslocamento 15m (10q), sem redução por terreno difícil
Corpo a Corpo Clava x3 +52 (5d20+40, x3).
Arremessar Descomunal (Completa) O gigante arremessa uma criatura que esteja agarrando ou um objeto Enorme ou menor em um ponto em alcance longo, atingindo uma área equivalente ao espaço da criatura ou objeto arremessado. Criaturas nessa área (e a criatura arremessada, se for o caso) sofrem 20d10+40 pontos de dano de impacto e ficam atordoadas por 1 rodada e caídas (Ref CD 47 reduz à metade e evita as condições; uma criatura só pode ser atordoada por esta habilidade uma vez por cena).
Golpe Racha-Montanha (Completa) O gigante faz um único ataque corpo a corpo com +5 na margem de ameaça e no multiplicador de crítico. Recarga (movimento).
Pisotear o Solo (Completa) O gigante gera uma onda de choque que afeta um raio de 30m. Criaturas na área em contato com o solo sofrem 25d12 pontos de dano de impacto e ficam caídas (Ref CD 47 reduz à metade e evita a condição). Recarga (movimento).
Titânico O gigante é imune a manobras de combate, não pode ser flanqueado e sofre metade do dano de ataques que não sejam de outra criatura Titânica. Quando se move, pisoteia qualquer criatura ou objeto Enorme ou menor em seu caminho (atravessando seu espaço), causando 18d6 pontos de dano de impacto (uma vez por rodada por criatura, Ref CD 47 reduz à metade). Além disso, seus ataques ignoram redução de dano e atingem todas as criaturas em um quadrado de 6m (para cada ataque, ele faz um único teste de ataque e compara o resultado com a Defesa de cada inimigo na área).
For 17, Des –1, Con 15, Int –1, Sab 0, Car 0
Perícias Atletismo +34, Intimidação +34.
Equipamento Clava gigante, meia armadura. Tesouro Padrão.`
        },
        {
          chave: "giganteMaximo", nome: "Gigante Máximo", nd: "S+", tipo: "Humanoide (gigante) Colossal",
          papel: "solo",
          resumo: "É uma visão impossível, absurda, que desafia a sanidade.",
          texto:
`Gigante Máximo ND S+
É uma visão impossível, absurda, que desafia a sanidade. Um humanoide tão gigantesco que sua cabeça alcança as nuvens, desaparece nos céus — muitíssimo maior que a própria estátua de Valkaria, maior que os maiores kaiju das Sanguinárias. Vasto como uma montanha, com pontos em seu corpanzil onde cresce vegetação exuberante, e outros onde até mesmo existem construções. Quando ele se move, faz o mundo tremer. O gigante máximo, ou gigante das nuvens, é um mito persistente na história de Arton. Tão persistente que sua veracidade talvez precise ser considerada. Conforme descrito nas lendas, o gigante máximo é uma criatura impensável. Tem milênios de idade, não se conhecendo seu tempo de vida natural. Quando dorme, seu sono dura décadas ou séculos — tempo suficiente para que acabe coberto de vegetação e detritos, ou para que povos desavisados construam aldeias em seu corpo. E, quando desperta, sua fome é igualmente gigantesca: pode devorar todos os rebanhos de uma região, ou mesmo todos os seus habitantes. Quando em atividade, o gigante máximo busca apenas ser deixado em paz, pelo menos até ter fome. Às vezes recorda-se de algo ou alguém que existia antes de seu sono, partindo em busca desse objetivo. Caso descubra que a coisa ou pessoa não existe mais, pode ter um rompante de fúria destrutiva.
Combater este gigante é muito diferente de matar outros monstros, por maiores que sejam; ele é simplesmente grande demais para que qualquer dano direto tenha algum efeito. Existem histórias sobre heróis do passado que escalaram e exploraram a criatura, como se fosse uma masmorra, combatendo seus parasitas (incluindo gárgulas e outros monstros voadores que fazem ninhos em seu corpo) e alcançando os centros nervosos que são seus únicos pontos fracos. Até onde se sabe, o gigante máximo existe apenas em lendas. Nenhuma aparição foi registrada nos últimos séculos, nem há qualquer pista sobre sua origem. Se o monstro existe, deve estar adormecido em algum ponto de Arton, e seu despertar será um desafio extremo para os heróis de hoje.
Humanoide (gigante) Colossal
Iniciativa +7, Percepção +16, visão na penumbra
Defesa 70, Fort +38, Ref +25, Von +33, imunidade a atordoamento, encantamento, dano mental (exceto cabeça), metamorfose e efeitos de movimento
Pontos de Vida Especial (veja Grande Demais)
Deslocamento 45m (30q), sem redução por terreno difícil
Ataques Colossais (Padrão) O gigante máximo usa duas habilidades diferentes entre as seguintes.
• Agarrar (braço) O gigante agarra uma criatura em seu alcance (teste +75). Uma criatura agarrada pode se soltar com uma ação padrão e um teste de manobra ou Acrobacia oposto ao gigante, ou causando 100 pontos de dano contra o braço.
• Apertar (braço) O gigante causa 1d100+50 pontos de dano de impacto a uma criatura que esteja agarrando.
• Arremessar (braço) O gigante arremessa uma criatura que esteja agarrando em um ponto em alcance longo. O alvo sofre 30d6 pontos de dano de impacto e fica caído (Acrobacia ou Ref CD 55 reduz à metade).
• Chute (perna) O gigante desfere um poderoso chute. Criaturas em um quadrado de 9m em alcance curto sofrem 3d20+25 pontos de dano de impacto, são arremessadas 30m na direção oposta e ficam caídas (Fort CD 55 reduz à metade e evita o empurrão e a condição).
• Pisotear (perna) O gigante gera o efeito básico da magia Terremoto (Tormenta20, p. 209) em um raio de 90m ao seu redor. Este não é um efeito mágico e não afeta o gigante.
• Safanão (braço) O gigante derruba uma criatura que o esteja escalando (Ref CD 55 evita). Se falhar no teste, a criatura é arremessada ao chão, fica caída e sofre dano de queda de acordo com a etapa em que estava (veja Grande Demais).
• Tapa (braço) O gigante faz um ataque corpo a corpo (teste +65, dano 1d100+100 impacto). O gigante pode fazer esta ação mesmo com braços derrotados, mas sofre –10 no teste de ataque e causa metade do dano.
Grande Demais O gigante é muito grande para ser derrotado de uma só vez. Em vez disso, é necessário escalá-lo e derrotar cada parte de seu corpo individualmente. Cada uma dessas partes conta como uma criatura individual, com seus próprios PV. Escalar uma parte exige uma ação completa e um teste de Atletismo (CD conforme a etapa). Se falhar, o personagem não avança e sofre 8d6 pontos de dano de impacto. Se falhar por 5 ou mais, sofre 16d6 pontos de dano de impacto e cai para a parte anterior. Por fim, se falhar por 10 ou mais, cai no chão e sofre dano de queda de acordo com a parte em que estava. Personagens com deslocamento de escalada ou de voo recebem +10 nos testes de Atletismo e personagens usando um veículo ou montaria capaz de voar ou escalar podem substituir Atletismo por Cavalgar ou Pilotagem.
1) Duas Pernas CD 20, dano de queda 10d6, 750 PV cada. Cada perna derrotada reduz o deslocamento do gigante em 15m e o número de Ataques Colossais de perna que ele pode usar em 1.
2) Tronco CD 25, dano de queda 20d6, 3.000 PV.
3) Dois Braços CD 30, dano de queda 30d6, 750 PV cada. Cada braço derrotado reduz em 1 o número de Ataques Colossais de braço (exceto Tapa) que ele pode usar.
4) Cabeça CD 40, dano de queda 40d6, 1.000 PV. A cabeça possui Cura Acelerada 500; para cada outra parte do corpo derrotada, esse valor é reduzido em 100. Quando a cabeça é derrotada, o gigante cai inconsciente.
Titânico O gigante é imune a manobras de combate, não pode ser flanqueado e sofre metade do dano de ataques que não sejam de outra criatura Titânica. Quando se move, pisoteia qualquer criatura ou objeto Enorme ou menor em seu caminho (atravessando seu espaço), causando 20d8 pontos de dano de impacto (uma vez por rodada por criatura, Ref CD 55 reduz à metade). Além disso, ele ignora redução de dano e seus ataques atingem todas as criaturas em um quadrado de 6m (para cada ataque, ele faz um único teste de ataque e compara o resultado com a Defesa de cada inimigo na área).
For 20, Des –3, Con 20, Int –2, Sab 0, Car –2
Tesouro Dobro.`
        },
      ],

      regras: [
        { titulo: "Gigantes",
          texto:
`No passado distante houve uma época terrível, de violência e carnificina, quando Arton foi governada por monstros — a Era de Megalokk. O mais selvagem e voraz dos deuses infestou o mundo recém-criado com sua prole, igualmente feroz. Naquele inferno de abominações famintas, nenhum outro ser poderia prosperar, nenhum povo teria seu alvorecer.

Khalmyr, então líder do Panteão, comandou um fim para aqueles tempos de calamidade. O Deus dos Monstros não podia ser domado, mas podia ser contido.

Suas bestas foram confinadas aos cantos mais longínquos do mundo, incapazes de aterrorizar ou matar, exceto a si mesmas — as impiedosas Sanguinárias são, hoje, o mais conhecido entre tais redutos. Uma Arton mais clemente seria, assim, habitada por humanos e outros povos dos deuses.

Mas Megalokk não aceitaria ser encurralado; ainda que bruto e incivilizado, era um deus maior. Se Arton agora pertencia aos seres com mãos e mentes, ele também poderia criá-los. Maiores, mais fortes, mais violentos.

Essa seria a origem de várias raças humanoides monstruosas, gigantescas, que assolam Arton. Gigantes solitários rondam os ermos, atacam caravanas, devastam povoados, espreitam em masmorras.

Comunidades desses monstros, cada qual com seus costumes, abundam em regiões remotas — ou nem tão remotas, podendo até existir em território do Reinado. Gigantes existem em vários tamanhos, desde aqueles pouco maiores que ogros até colossos míticos inacreditáveis que alcançam os céus. São também variados em sua índole: alguns são afáveis e curiosos, embora quase todos sejam irritadiços, truculentos e sanguinários. Muitos ainda são canibais, considerando humanos e outras raças como simples refeições. Em comum, todos são orgulhosos de seu tamanho; o pior insulto possível para um gigante é ser chamado de “pequeno”.

Arton tem incontáveis lendas e histórias sobre gigantes. Talvez a mais impressionante seja sobre a antiga nação gigante chamada Ked’Rach, situada nas Lannestul. Seus guerreiros subjugaram os antigos minotauros, muito antes que eles erguessem seu império. O povo de Tauron foi dominado por séculos, até que um grande líder comandou uma rebelião, expulsando os monstros de volta para as montanhas.

Hoje suas fortalezas ciclópicas e decadentes povoam os sonhos de aventureiros.` },
        { titulo: "Bolsas de Gigante",
          texto:
`Gigantes das colinas costumam carregar grandes sacos de couro ou pele onde guardam todos os “tesouros” que encontram em seu caminho. Uma bolsa recém-encontrada tem 1d4 desses “tesouros”; o mestre pode determinar o que eles são ou usar a tabela a seguir.
1d20 “Tesouro”
1 Um pedaço de carne estragada (pode conter uma doença).
2 1d3 ratos esfomeados.
3 Um elmo mastigado.
4 Algemas forradas de couro preto.
5 Uma bota reforçada. Com outra dessas você forma um par.
6 Um espelho que um dia foi mágico. Ainda reflete a última imagem que presenciou.
7 Um pé de cabra.
8 Uma peruca desgrenhada.
9 Um saco de dormir. Parece ter algo ou alguém dentro...
10 Uma arma qualquer.
11 Um emplastro grotesco de ervas medicinais (aplicá-las é uma ação completa que cura 4d6 PV).
12 As roupas de um camponês. Onde estará seu antigo dono?
13 Um pato (ainda vivo). Pode ser domesticado.
14 Uma sela em bom estado.
15 Um estandarte enrolado. Talvez exista uma recompensa por ele?
16 Uma poção mágica. A saliva ressecada no frasco torna impossível identificá-la.
17 Uma riqueza menor.
18 Uma riqueza média.
19 Um item superior (2 melhorias) determinado aleatoriamente.
20 Um item mágico menor determinado aleatoriamente (apenas uma vez por bolsa; se rolar outro 20, role novamente).` },
      ],
    },
  );

  // Equipamento descrito em quadro ao lado das fichas, junto com os
  // artefatos dos avatares que já estão no livro.
  B.itens = (B.itens || []).concat([
    { chave: "novaArmaEspadaCalibre", nome: "Nova Arma: Espada-Calibre", meta: "Aspectos dos Deuses",
      texto:
`Uma blasfêmia para alguns, esta arma é uma espada de lâmina pesada acoplada a uma pistola. A espada-calibre é uma arma híbrida que pode ser usada em dois modos: como uma arma corpo a corpo adaptável (dano 1d8, crítico 19, corte) ou como uma arma de fogo (dano 2d6, crítico 19/x3, perfuração, alcance curto). Quando faz um ataque com a espada-calibre em modo corpo a corpo, você pode acionar seu mecanismo para disparar a bala; se acertar, causa +2d6 pontos de dano de perfuração. Para atacar com ela em modo arma de fogo, você deve também ter proficiência com armas de fogo, ou é considerado não proficiente com ela. Recarregar a espadacalibre é uma ação padrão.
Arma Exótica • Uma Mão T$ 1.000 • Dano * • Crítico * Alcance * • 1 Espaço * Veja texto.` },
    { chave: "armaduraDosNeladriel", nome: "Armadura dos Neladriel", meta: "Celestiais",
      texto:
`Composta de placas impossivelmente leves, essa meia armadura reforçada guardiã de mitral existe apenas na posse dos muhir ou de valorosos heróis presenteados pelos celestiais. Ela conta como uma armadura leve para fins de aplicar sua Destreza na Defesa e para uso de habilidades que normalmente não podem ser usadas com armadura pesada (como Escaramuça e Evasão). Armadura específica maior, preço T$ 65.000.` },
    { chave: "barrilGiganteDe", nome: "Barril Gigante de...", meta: "Gigantes",
      texto:
`Gigantes das rochas (em todas as suas variações) costumam carregar um barril contendo vários litros de uma das bebidas a seguir. Em combate, um gigante pode ingerir uma dose dessa bebida para se fortalecer, ou derramá-la sobre seus inimigos para entorpecê-los de alguma forma. A CD para resistir aos efeitos da bebida de um gigante é indicada em sua ficha.
• Aguardente. Criaturas em um cone de 6m ficam enjoadas (Fort reduz a duração para 1 rodada).
• Dilínio. O gigante recebe redução de dano 5/mágico até o fim da cena.
• Hidromel. Criaturas em um raio de 3m em alcance curto recebem +2 em testes de ataque e rolagens de dano até o fim da cena, mas ficam confusas por 1d2 rodadas (Fort evita a condição).
• Rum. O gigante recebe imunidade a efeitos de fadiga e de metabolismo por 1d4+1 rodadas mas, após isso, fica fraco.
• Sidra. Uma criatura em alcance curto é atingida por um jato de alta pressão; ela sofre 1d8+15 pontos de dano de impacto e fica atordoada por 1 rodada (Fort reduz à metade e evita a condição). Uma criatura só pode ser atordoada por este efeito uma vez por cena.
• Vinho. Até o fim da cena, o gigante recebe Cura Acelerada 5, mas sofre –5 em Vontade. Um barril gigante encontrado como parte do tesouro de um gigante é um item que ocupa 5 espaços e possui 1d4+1 cargas de uma destas bebidas. Usá-lo conta como a habilidade Barril Gigante de... (CD For).` },
    { chave: "salivaAcida", nome: "Saliva Ácida", meta: "Abissais",
      texto:
`Este líquido viscoso e esverdeado só pode ser obtido do cadáver de um jhumariel, e não pode ser fabricado normalmente. Uma dose é suficiente para cobrir uma arma corpo a corpo ou 20 munições; aplicá-la é uma ação padrão e faz a arma (ou a munição) causar +1d8 pontos de dano de ácido até o fim da cena.
Preparado alquímico, T$ 150, 0,5 espaço.` },
    { chave: "kazidhaan", nome: "Kazidhaan", meta: "Abissais",
      texto:
`A arma do Lorde das Profundezas é uma montante atroz pungente magnífica profana, conhecida pelos abissais também como “Eliminadora”. Apesar de suas qualidades formidáveis, o poder mais assustador de Kazidhaan não é sua capacidade destrutiva, mas seu efeito sobre aqueles que ela derrota. Se uma criatura tiver seus pontos de vida reduzidos a 0 ou menos por um ataque de Kazidhaan feito por um abissal, uma marca (como uma tatuagem) é inscrita em sua pele de forma permanente. Enquanto a criatura tiver essa marca, o abissal que a derrotou pode lhe dar comandos telepáticos (exceto ordens claramente suicidas) de qualquer lugar no mesmo Plano. A criatura pode tentar resistir a um comando, mas para isso deve fazer um teste de Vontade (CD Car; 51 para Abahddon); se passar, consegue resistir a esse comando específico por 1 dia. A marca causada por Kazidhaan só pode ser removida em um ritual de purificação realizado por pelo menos três clérigos com acesso a magias de 4º círculo e que custa T$ 1.000.` },
  ]);
})();
