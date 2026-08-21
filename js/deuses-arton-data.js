// ════════════════════════════════════════════════════════════════════
//  DEUSES-ARTON-DATA.JS — os Avatares dos vinte Deuses Maiores
//  Localização: /grifos-alados/js/deuses-arton-data.js
//
//  ⚠ ARQUIVO GERADO por "Inútil/_gerar-deuses-arton.js" a partir de
//    "Inútil/Regras.txt". Dá para editar à mão — mas rodar o gerador
//    de novo sobrescreve tudo.
//
//  Uma ficha por deus: o AVATAR, que é como o Panteão pisa em Arton.
//  Do artigo de cada divindade vem junto só o quadro de dados (outros
//  nomes, áreas de influência, símbolo, canalização, arma preferida,
//  cores e lema), que é o que o mestre precisa na mesa. O corpo do
//  artigo (motivações, relações, igreja e clero) NÃO entra aqui — é
//  lore de leitura, não é ficha.
//
//  Campos de cada ficha:
//    chave    — id estável (não mudar; a aba e o modal usam)
//    nome/nd  — repetidos fora do texto para listas e filtros
//    tipo     — linha de tipo e tamanho (só exibição em listas)
//    papel    — 'solo' | 'lacaio' | 'especial'. No livro é um ÍCONE, que
//               não sobrevive à cópia do PDF: vem vazio, e o bestiário
//               assume "lacaio" até o mestre trocar na ficha.
//    deus     — a divindade de quem este é o avatar
//    subgrupo — "Deus, Epíteto": aponta para o quadro de dados dele em
//               `regras`, que a aba mostra dentro do card da ficha
//    resumo   — uma linha para o modal de inserção
//    texto    — statblock completo; PRIMEIRA linha = "Nome ND X", depois
//               a descrição do avatar, a linha de tipo e o bloco do livro
//
//  ⚠ O texto NÃO é cópia literal: o gerador conserta os deslizes de
//  digitação do livro que atrapalhavam a leitura da ficha — palavras
//  coladas, espaço faltando depois de vírgula e de parêntese, rótulo
//  com ponto ("Tesouro."), "Espirito" sem acento, ponto final faltando
//  e o deslocamento sem os quadrados. Cada conserto sai listado no
//  relatório do gerador; nenhum número de regra foi tocado.
//
//  ⚠ O "✦" na frente de uma habilidade quer dizer HABILIDADE MÁGICA:
//  pode ser alvo de Dissipar Magia (inclusive como contramágica) e é
//  anulada onde a magia não funciona. No livro é um ícone; na cópia do
//  PDF sobrou como um "e" solto no fim do parágrafo.
//
//  ⚠ ND ANOTADO À MÃO — o cabeçalho destes três avatares não traz
//  "ND x" em lugar nenhum do texto copiado. Conferidos no livro
//  (2026-08-21) e anotados no gerador:
//    Avatar de Lin-Wu → ND 19          (conferido no livro)
//    Avatar de Thyatis → ND 19         (conferido no livro)
//    Avatar de Azgher → ND S           (conferido no livro)
//  (O Avatar de Khalmyr também vinha sem ND no statblock, mas ali o
//  número não se perdeu: subiu para o título da seção, "Avatar ND S".)
//
//  ⚠ QUADRADOS DO DESLOCAMENTO — o livro erra a conta em cinco fichas
//  (Allihanna, Kallyadranoch, Sszzaas, Tenebra e Wynna). O padrão são
//  os METROS, então o gerador recalcula os "q" a partir deles
//  (1q = 1,5m). Cada recálculo sai no relatório.
// ════════════════════════════════════════════════════════════════════
window.FICHAS_DEUSES_ARTON = {

  livro: 'Deuses de Arton — v1.1',
  fonte: 'Deuses Maiores',

  categorias: [

    // ── ⛩ DEUSES MAIORES ─────────────────────────────────
    {
      chave: "maiores", nome: "Deuses Maiores", icone: "⛩", cor: "#8a6a1f",
      intro: "Os vinte deuses do Panteão não descem a Arton em pessoa — mandam avatares. " +
             "Cada ficha aqui é o avatar de um deus maior, do ND 18 ao S+, e vem com o quadro " +
             "de dados da divindade (símbolo, arma preferida, canalização e lema) logo acima do statblock.",
      fichas: [
        {
          chave: "avatarDeAharadak", nome: "Avatar de Aharadak", nd: "S", tipo: "Monstro (lekael) Colossal",
          papel: '',
          deus: "Aharadak", subgrupo: "Aharadak, Deus da Tormenta",
          resumo: "O avatar mais comum de Aharadak é uma monstruosidade do tamanho de um castelo, coberta de carapaça, pedaços de carne esponjosa e bocarras…",
          texto:
`Avatar de Aharadak ND S
O avatar mais comum de Aharadak é uma monstruosidade do tamanho de um castelo, coberta de carapaça, pedaços de carne esponjosa e bocarras cheias de dentes afiados. Em meio a esse caos, um único e imenso olho vermelho.
No entanto, correm boatos de que Aharadak possui outros avatares — um guerreiro trajado em couraça vermelha, um feiticeiro sem rosto, uma barda com a boca costurada. Também já teria assumido formas inofensivas, até mesmo nascido em uma família humana humilde, crescendo como uma criança-prodígio da degradação. Nenhuma tática é perversa demais para o Devorador.
Monstro (lekael) Colossal
Iniciativa +22, Percepção +31, percepção às cegas (longo)
Defesa 73, Fort +37, Ref +27, Von +31, imunidade a efeitos mentais e medo, maior que a morte, redução de dano 20
Pontos de Vida 2.477
Deslocamento 3m (2q), voo 12m (8q)
Corpo a Corpo Sete garras +67 (4d10+31, 19).
Carapaça Suprema O Avatar de Aharadak sofre apenas metade do dano de fontes mundanas, exceto aço-rubi. Domínio sobre o Tempo O Avatar pode fazer duas ações padrão e duas ações de movimento a cada turno.
Insanidade da Tormenta 2d20 PM (Von CD 51 evita). Esta habilidade pode afetar mesmo criaturas que já foram afetadas pela Insanidade da Tormenta de outras criaturas nesse dia.
Invocar Lefeu (Completa) Uma vez por cena, o Avatar invoca um ou mais lefeu a sua escolha, cujo ND total somado seja igual a 20. Eles surgem em alcance curto e agem a partir da próxima rodada, em suas iniciativas. Poder sobre a Realidade O Avatar pode lançar qualquer magia simulada de até 4º círculo como um conjurador de 20º nível sem gastar PM (CD 51, limite de PM 20) e pode lançar Momento de Tormenta uma vez por rodada como uma ação livre.
✦ Percepção Perfeita O Avatar está sempre sob efeito de Visão da Verdade, com todos os aprimoramentos.
Presentes Rubros (Completa) O Avatar fornece suas bênçãos a uma criatura voluntária em alcance curto. O alvo recebe dois poderes da Tormenta a sua escolha (alternativamente, se você tiver o suplemento Ameaças de Arton, ele pode receber um dos simbiontes descritos na p. 61). Uma criatura só pode ser alvo desta habilidade uma vez. Uma criatura que tenha recebido uma bênção dessa forma irá inevitavelmente ao mundo de Aharadak após sua morte e não pode ser revivida de nenhuma forma.
Telepatia O Avatar pode se comunicar com qualquer criatura inteligente (Int –3 ou mais) dentro de uma área de Tormenta ou a até 1km dela.
Terror Absoluto O Avatar emana uma aura de medo de 30m de raio. Criaturas à escolha dele que entrem ou comecem seus turnos na aura ficam abaladas (CD 51 evita). Se já estiverem abaladas, ficam apavoradas (a condição máxima que esta habilidade pode causar). Uma criatura apavorada dessa forma sofre os efeitos de falhar no teste de resistência contra a Insanidade da Tormenta do Avatar (mesmo que já tenha sido afetada por essa habilidade nesse dia). Criaturas imunes a medo ainda são afetadas pela aura mas recebem +5 nos testes de resistência contra ela. Medo.
For 18, Des 6, Con 12, Int 16, Sab 10, Car 5
Perícias Atletismo +34, Conhecimento +34, Diplomacia +36, Enganação +36, Intimidação +36, Intuição +36, Misticismo +34, Religião +28.
Tesouro 2d6 peças rubras (CD 35 para extrair, cada peça vale T$ 1.500 para fabricar itens de matéria vermelha).`
        },
        {
          chave: "avatarDeAllihanna", nome: "Avatar de Allihanna", nd: "20", tipo: "Espírito Enorme",
          papel: '',
          deus: "Allihanna", subgrupo: "Allihanna, Deusa da Natureza",
          resumo: "Allihanna talvez seja a divindade mais variada em sua forma de avatar.",
          texto:
`Avatar de Allihanna ND 20
Allihanna talvez seja a divindade mais variada em sua forma de avatar. Ainda que mais conhecida como uma fera quimérica de muitas cabeças (sua forma preferida quando espera entrar em combate), ela pode se manifestar como qualquer animal natural — sempre em versão maior e mais majestosa, embora também consiga passar despercebida como um espécime comum.
A deusa também costuma surgir como uma dama trajada em vestes rústicas, campestres, com cabeça de animal. Dizem que o tipo de animal é escolhido conforme seu estado de espírito: um cervo quando está tranquila, um búfalo ou leão quando zangada, um pássaro ou macaco quando curiosa e assim por diante. Também há relatos sobre Allihanna se manifestar como uma dríade ou um sátiro, principalmente ao lidar com aventureiros.
Em quase todos os casos, Allihanna prefere se comunicar através de uma linguagem especial sem palavras, usando apenas sons e cheiros da natureza.
Espírito Enorme
Iniciativa +26, Percepção +32, faro, visão no escuro
Defesa 61, Fort +20, Ref +34, Von +28, não pode ser flanqueado, maior que a morte, redução de dano 20, resistência a magia +5
Pontos de Vida 1.200
Deslocamento 15m (10q), escalada 15m (10q), escavação 15m (10q), natação 15m (10q), voo 15m (10q), sem redução por terreno difícil natural
Corpo a Corpo Arsenal natural x4 +54 (especial).
Arsenal Natural Quando faz cada um de seus ataques de Arsenal Natural, o Avatar de Allihanna escolhe uma das armas naturais a seguir. Ele pode escolher a mesma arma múltiplas vezes.
• Cauda. Dano 8d12+29, alcance 6m.
• Chifres. Dano 10d10+24, ignora 10 pontos de redução de dano do alvo.
• Garra. Dano 6d12+31, 19, caso acerte dois ataques de garra em uma mesma criatura no mesmo turno, causa mais 4d12 pontos de dano.
• Mordida. Dano 8d12+28, x3, caso acerte, pode fazer a manobra derrubar como uma ação livre (teste +59).
• Tentáculo. Dano 6d10+39, caso acerte, pode fazer a manobra agarrar como uma ação livre (teste +59).
Centelha Divina O Avatar pode lançar qualquer magia divina como um clérigo de 20º nível sem gastar PM (CD 49, limite de PM 20). Se estiver em terreno natural, o custo das magias do Avatar é reduzido em –4 PM e a CD para resistir a elas aumenta em +4.
Deusa dos Animais (Padrão) Cada animal em alcance médio deve fazer um teste de Vontade (CD 49). Se falhar, fica sob controle do Avatar até o fim da cena. Se o animal for um parceiro, em vez disso o personagem que ele segue faz um teste de Adestramento (CD 40) para evitar o controle. Animais sob controle do Avatar funcionam como parceiros (se um animal não tiver um tipo de parceiro definido, o mestre escolhe o mais adequado), não contam em seu limite de parceiros e seus benefícios são cumulativos.
✦ Forma Natural (Completa) O Avatar assume a forma de um animal ou planta a sua escolha de tamanho entre Pequeno e Enorme. Ele recebe +10 em testes de Enganação para se passar por essa criatura, mas seu Arsenal Natural fica limitado às armas compatíveis com a forma escolhida. Suas demais estatísticas não mudam.
✦ Voz da Natureza O Avatar pode falar com animais (como o efeito da magia Voz Divina).
For 8, Des 8, Con 10, Int 7, Sab 14, Car 10
Perícias Adestramento +41, Atletismo +26, Furtividade +26, Intimidação +28, Intuição +32, Misticismo +25, Religião +32, Sobrevivência +35.
Tesouro Nenhum.`
        },
        {
          chave: "avatarDeArsenal", nome: "Avatar de Arsenal", nd: "18", tipo: "Espírito Médio",
          papel: '',
          deus: "Arsenal", subgrupo: "Arsenal, Deus da Guerra",
          resumo: "Arsenal compreende que sua ascensão é ainda recente e precária, adotando posturas cautelosas em suas intervenções no mundo mortal.",
          texto:
`Avatar de Arsenal ND 18
Arsenal compreende que sua ascensão é ainda recente e precária, adotando posturas cautelosas em suas intervenções no mundo mortal. Até o momento, há pouquíssimas notícias sobre manifestações de seu avatar. Quando necessário, ele utiliza o Kishinauros com esse objetivo (veja Ameaças de Arton, p. 142). Diz-se que Vanessa Drake, antiga clériga de Keenn e primeira clériga de Arsenal, foi também a primeira testemunha a vislumbrar sua forma de avatar. O Deus da Guerra visita Arton com a aparência que tinha quando mortal, trajando a característica couraça púrpura e capa esverdeada. Algumas vezes usa o sinistro elmo fechado, em outras exibe a antiga face humana — cheia de cicatrizes adquiridas durante a luta decisiva contra Keenn. Ele também empunha suas armas mais poderosas e icônicas, o Martelo dos Trovões e a espada Holy Avenger.
Espírito Médio
Iniciativa +23, Percepção +25
Defesa 60, Fort +32, Ref +17, Von +30, cura acelerada 5, imunidade a efeitos mentais e medo, maior que a morte, redução de dano 10, resistência a aventureiros +5
Pontos de Vida 1.080
Deslocamento 12m (8q), voo 12m (8q)
Corpo a Corpo Martelo dos Trovões +49 (8d8+36, 19/x3, mais 8d6 eletricidade), Holy Avenger x2 +49 (6d12+36, 18).
✦ Acessar Arsenal (Padrão) O Avatar de Arsenal troca um dos itens equipados de sua Algibeira Infinita por outro item mágico qualquer (exceto itens únicos, como artefatos). Acessórios fornecem seus benefícios normalmente e surgem acoplados à armadura; eles não precisam ser vestidos ou empunhados. Armas e armaduras substituem as que o avatar estiver usando; substitua apenas os efeitos mágicos dos itens. Se um item tiver uma habilidade com custo em pontos de mana, o Avatar pode usá-la sem gastar PM (limite de PM 18).
✦ Algibeira Infinita O Avatar tem acesso à imensa coleção de itens mágicos de Arsenal e começa cada cena equipado com um elmo do teletransporte, botas aladas e um anel do sustento (Tormenta20, Capítulo 8).
Centelha Divina O Avatar pode lançar qualquer magia divina como um clérigo de 18º nível sem gastar PM (CD 47, limite de PM 18) e pode lançar a magia Soco de Arsenal como ação livre uma vez por rodada.
Extinção (Padrão) Uma vez por cena, o Avatar faz um ataque com a Holy Avenger contra uma criatura. Se acertar, a criatura é completamente destruída.
Plano de Contigência (Reação) Uma vez por rodada, quando é alvo de um acerto crítico, manobra de combate ou habilidade mágica, o Avatar recebe +10 nos testes para resistir a esse efeito e redução de dano 50 contra qualquer dano que ele cause.
Varrer (Livre) Uma vez por rodada, quando o Avatar faz um ataque corpo a corpo e reduz os pontos de vida do alvo a 0 ou menos, pode realizar um ataque adicional contra outra criatura dentro do seu alcance.
For 14, Des 6, Con 12, Int 9, Sab 8, Car 8
Perícias Atletismo +31, Guerra +39, Intimidação +28, Misticismo +26, Pilotagem +23, Religião +25.
Equipamento Armadura de Arsenal, Holy Avenger (veja p. 247), Martelo dos Trovões. Tesouro Padrão, mais quaisquer itens equipados por Algibeira Infinita.`
        },
        {
          chave: "avatarDeAzgher", nome: "Avatar de Azgher", nd: "S", tipo: "Espírito Médio",
          papel: '',
          deus: "Azgher", subgrupo: "Azgher, Deus-Sol",
          resumo: "Viajantes planares experientes afirmam que o astro-rei visto nos céus de Arton não é realmente Azgher, mas seu reino divino, Solaris…",
          texto:
`Avatar de Azgher ND S
Viajantes planares experientes afirmam que o astro-rei visto nos céus de Arton não é realmente Azgher, mas seu reino divino, Solaris, distante no firmamento. A maioria dos devotos, contudo, não acredita existir diferença. Eventos que façam Azgher manifestar um avatar em Arton são mais frequentes do que se pensa — grandes festivais em sua honra podem fazê-lo se sentir obrigado a enviar um representante.
Ele costuma usar a aparência tradicional de um guerreiro do deserto, sempre trazendo sua espada ou outro item flamejante nas mãos. Também usa algum tipo de máscara, para proteger os mortais de sua luz intensa. Em outros sentidos, lembra muito um beduíno comum, não se furtando de comer e beber durante as festividades.
Não há notícias de que Azgher tenha se manifestado com qualquer outra aparência; encobrir-se com disfarces é contra a sua natureza. Ainda assim, existem lendas sobre uma feiticeira qareen tão radiante e poderosa que não poderia ser qualquer outra coisa, exceto um avatar do Deus-Sol.
Espírito Médio
Iniciativa +25, Percepção +40, percepção às cegas (ilimitado)
Defesa 58, Fort +36, Ref +25, Von +33, evasão aprimorada, imunidade a dano de luz, fogo e trevas, maior que a morte, redução de dano 20, resistência a magia +5
Pontos de Vida 2.752
Deslocamento 18m (12q), sem redução por terreno difícil
Corpo a Corpo Labareda x2 +58 (3d6+38, 15/x3, mais 6d6 fogo) e Raio de Sol x2 +58 (4d8+38 mais 2d12 luz).
À Distância Mensageiro do Deserto x2 +58 (4d12+45 mais 6d6 fogo em todas as criaturas a até 6m do alvo).
✦ Aquele-que-Tudo-Vê O Avatar de Azgher está sempre sob efeito de Visão da Verdade, com todos os aprimoramentos.
Centelha Divina O Avatar lança qualquer magia divina como um clérigo de 20º nível sem gastar PM (CD 52, limite de PM 20) e pode lançar Cólera de Azgher uma vez por rodada como uma ação livre.
Escaramuça Vigilante Quando se move 6m ou mais, o Avatar recebe +10 na Defesa e em Reflexos, e +3d8 nas rolagens de dano até o início do seu próximo turno. Além disso, pode fazer um ataque com Raio de Sol contra qualquer inimigo que saia do seu alcance.
Presença Calorosa No início do turno do Avatar, criaturas à escolha dele em um raio de 30m sofrem 3d6 pontos de dano de fogo. Esse dano só pode ser curado fora dessa área. Metabolismo.
✦ Tempestade Solar (Completa) Todas as criaturas em uma esfera de 6m em alcance médio sofrem 100 pontos de dano de essência, todas as magias na área são automaticamente dissipadas e todos os itens mágicos na área, exceto artefatos, viram itens mundanos até o fim da cena (Fort CD 55 reduz à metade e evita o efeito sobre suas magias e itens mágicos). Recarga (movimento).
✦ Todo Ouro Pertence a Azgher (Padrão) O Avatar absorve todo o ouro em um raio de 30m. Isso inclui tibares de ouro, itens banhados a ouro e quaisquer outros itens de ouro a critério do mestre (Ref CD 52 evita que seus itens sejam absorvidos, mas atrai a ira do Avatar).
For 14, Des 7, Con 10, Int 10, Sab 14, Car 10
Perícias Acrobacia +25, Diplomacia +31, Intimidação +31, Intuição +35, Misticismo +31, Religião +40, Sobrevivência +35.
Equipamento Labareda, Mensageiro do Deserto e Raio de Sol. Tesouro Nenhum.`
        },
        {
          chave: "avatarDeHyninn", nome: "Avatar de Hyninn", nd: "19", tipo: "Espírito Médio",
          papel: '',
          deus: "Hyninn", subgrupo: "Hyninn, Deus da Trapaça",
          resumo: "A forma mundana de Hyninn varia dependendo da missão a ser confiada e da peça a ser pregada.",
          texto:
`Avatar de Hyninn ND 19
A forma mundana de Hyninn varia dependendo da missão a ser confiada e da peça a ser pregada. Suas formas preferidas, entretanto, são um ladrão hynne, um bobo da corte humano e um macaco falante.
Dizem que qualquer mortal muito fraco ou aparentemente indefeso encontrado na estrada pode ser um avatar de Hyninn testando aventureiros poderosos. E aqueles que abusam desses pobres-coitados muitas vezes se veem vítimas de décadas infindáveis de peças, truques, mentiras e trapaças, tudo obra de alguém oculto nas sombras...
Espírito Médio
Iniciativa +35, Percepção +23
Defesa 57, Fort +19, Ref +32, Von +26, evasão aprimorada, maior que a morte, não pode ser flanqueado ou surpreendido
Pontos de Vida 798
Deslocamento 9m (6q)
Corpo a Corpo Falso Amigo x2 +50 (1d4+30, 19).
À Distância Falso Amigo +50 (1d4+30, 19).
Ataque Furtivo +10d8.
Centelha Divina O Avatar de Hyninn pode lançar qualquer magia divina como um clérigo de 19º nível sem gastar PM (CD 49, limite de PM 19).
Ferramentas Ladinas O Avatar conta como se sempre estivesse empunhando quaisquer ferramentas necessárias para usar suas perícias, como estojo de disfaces, gazuas etc.
✦ Forma de Macaco (Completa) O Avatar se transforma em um macaco. Ele adquire tamanho Minúsculo (+5 em Furtividade e –5 em testes de manobra) e recebe deslocamento de escalada 9m. Seu equipamento desaparece (e ele perde seus benefícios) até ele voltar ao normal, mas suas outras estatísticas não são alteradas. A transformação dura indefinidamente, mas termina caso ele faça um ataque, lance uma magia ou gaste uma ação livre para encerrá-la.
Ladrão Divino O Avatar não sofre penalidade em testes de Furtividade por se mover ao seu deslocamento normal ou por atacar e fazer outras ações chamativas, e pode fazer duas ações de movimento por turno.
No Bolso Dói Mais Quando acerta um ataque em corpo a corpo, para cada 1 ponto de dano causado, o Avatar rouba T$ 10 da vítima. Mesmo que o Avatar seja derrotado, há 90% de chance de que esses tibares tenham desaparecido para sempre, pela graça dele mesmo.
Roubar Essência (Padrão) O Avatar faz um teste de Ladinagem oposto à Vontade de uma criatura adjacente que não possa percebê-lo. Se passar, rouba uma habilidade do alvo. A habilidade assume a forma de uma moeda. O alvo não pode usar a habilidade roubada até recuperar a moeda. O Avatar não pode roubar mais de uma habilidade por criatura por vez.
Roubo Descarado (Reação) Uma vez por criatura por cena, quando uma criatura em alcance curto faz um teste de perícia, o Avatar pode roubar o resultado desse teste. Caso ele faça isso, o teste se torna uma falha e, até o fim da cena, o Avatar pode substituir o resultado do d20 de um dos seus próprios testes pelo resultado do teste roubado. O Deus Certo Para o Trabalho Uma vez por rodada, quando faz um ataque furtivo ou usa uma perícia da lista do ladino (Tormenta20, p. 73), o Avatar recebe +20 nesse teste.
For 6, Des 18, Con 6, Int 13, Sab 6, Car 16
Perícias Atletismo +35, Acrobacia +35, Diplomacia +31, Enganação +41, Furtividade +38, Intuição +21, Investigação +28, Jogatina +31, Ladinagem +38, Ofício (artesão) +33.
Equipamento Falso Amigo. Tesouro Nenhum.`
        },
        {
          chave: "avatarDeKallyadranoch", nome: "Avatar de Kallyadranoch", nd: "20", tipo: "Espírito (dragão) Médio",
          papel: '',
          deus: "Kallyadranoch", subgrupo: "Kallyadranoch, Deus dos Dragões",
          resumo: "Mesmo enquanto prisioneiro em um corpo mortal élfico, Kallyadranoch voltou a ser um deus maior, membro do Panteão.",
          texto:
`Avatar de Kallyadranoch ND 20
Mesmo enquanto prisioneiro em um corpo mortal élfico, Kallyadranoch voltou a ser um deus maior, membro do Panteão. Como tal, podia manifestar uma forma de avatar.
Essa criatura, possivelmente o dragão mais poderoso de Arton, foi mantida como guardiã em seu covil pessoal no reino divino de Drashantyr, protegendo seus tesouros incalculáveis. Diz-se que, na ausência oportuna do Deus dos Dragões, muitos aventureiros empreenderam expedições em busca de tais riquezas. Todos foram dizimados pelo avatar dracônico — até ele mesmo ser abatido por Mestre Arsenal, em sua jornada planar rumo à divindade.
Hoje, embora ainda escolha a forma dracônica quando lhe convém, Kallyadranoch adota o aspecto de um humano atraente, esguio, com garras e presas afiadas. Seu cabelo pende em longas tranças, uma para cada cor dos dragões originais. Ostenta muitas joias mágicas, cada uma um artefato de valor inimaginável.
Espírito (dragão) Médio
Iniciativa +20, Percepção +18, percepção às cegas, visão no escuro
Defesa 50, Fort +20, Ref +28, Von +35, imunidade a ácido, atordoamento, cansaço, dano de luz, eletricidade, essência, fogo, frio, metamorfose, paralisia, trevas e veneno, redução de dano 50, resistência a magia +5
Pontos de Vida 1.405
Deslocamento 9m (6q), voo 18m (12q)
Corpo a Corpo Mordida +52 (5d12+50, 17/x3) e duas garras +50 (4d10+35, 19/x2).
✦ Ajoelhem-se Perante Mim (Padrão) O Avatar de Kallyadranoch emite um comando de subserviência. Criaturas à escolha dele em alcance curto ficam caídas e não podem executar ações hostis contra ele por 1 rodada (Fort CD 50 evita a condição e reduz o efeito para penalidade de –5 em testes contra o Avatar por 1 rodada).
Aura Aterradora Vontade CD 50 evita (Tormenta20, p. 311).
Cálice (Livre) Uma vez por rodada, o Avatar ignora todas as penalidades e restrições impostas por uma condição ou efeito.
Centelha Divina O Avatar lança qualquer magia arcana como um mago de 20º nível sem gastar PM (CD 50, limite de PM 20). Sempre que uma criatura falha no teste de resistência contra uma magia do Avatar, fica abalada (essa condição ignora imunidade a medo e é cumulativa).
Majestade Altiva No início de cada turno do Avatar, todas as criaturas em alcance médio que estejam apavoradas ficam fascinadas (Von CD 50 evita e a criatura não é mais afetada por esta habilidade até o fim do dia).
✦ Metamorfose Dracônica (Completa) O Avatar se transforma em outra criaturas, como a magia Metamorfose (mas sem limitação para tamanhos menores que o seu). Se for morto, ele reverte a sua forma original.
✦ Servos de Kallyadranoch (Livre) Uma vez por cena, o Avatar invoca 6 capangas dragões campeões (um de cada tipo entre ácido, eletricidade, fogo, frio, luz e trevas) que surgem em espaços desocupados em alcance longo. Eles agem no início da próxima rodada do Avatar, têm deslocamento de voo 18m e podem gastar uma ação padrão para emitir um sopro em um cone de 9m, que causa 6d12 pontos de dano de seu tipo de energia. Os dragões são Grandes, têm For 5, Des 1, 110 PV, Defesa 32, imunidades de dragão e a dano de seu tipo, usam os valores do Avatar com –5 para qualquer teste oposto ou de resistência e desaparecem quando mortos ou ao fim da cena.
Sopro Supremo (Padrão) O Avatar exala uma combinação de energias em um cone de 30m. Criaturas nessa área sofrem 7d12 pontos de dano de cada tipo de energia entre ácido, eletricidade, fogo, frio, luz e trevas (42d12 no total; Ref CD 50 reduz à metade). Sempre que rolar um 12 em um dado de dano, o Avatar causa +1d12 pontos de dano do mesmo tipo. O sopro ignora RD, e imunidade a esses tipos de dano apenas o reduz à metade. Recarga (movimento).
✦ Tomar Poder (Padrão) O Avatar faz um teste de Misticismo para roubar o poder mágico em um raio de 9m em alcance médio. Ele dissipa todas as magias nessa área com CD igual ou menor que o resultado de seu teste e recebe os benefícios dessas magias à escolha dele por 1d4+1 rodadas.
For 13, Des 8, Con 12, Int 14, Sab 6, Car 19
Perícias Conhecimento +35, Diplomacia +37, Enganação +37, Intimidação +40, Misticismo +40, Nobreza +40, Ofício (escriba) +35, Religião +27.
Tesouro Triplo.`
        },
        {
          chave: "avatarDeKhalmyr", nome: "Avatar de Khalmyr", nd: "S", tipo: "Espírito Médio",
          papel: '',
          deus: "Khalmyr", subgrupo: "Khalmyr, Deus da Justiça",
          resumo: "O avatar mais comum de Khalmyr lembra sua representação habitual: um imenso e poderoso guerreiro humano ou anão, de rosto severo, vestindo…",
          texto:
`Avatar de Khalmyr ND S
O avatar mais comum de Khalmyr lembra sua representação habitual: um imenso e poderoso guerreiro humano ou anão, de rosto severo, vestindo uma armadura completa, sem elmo. Suas feições podem variar, mas sempre carrega uma enorme espada mágica de duas mãos. Ele também pode se apresentar como um juiz sábio ou como um objeto simples e “ordeiro”, como um cubo ou uma esfera de aço.
Espírito Médio
Iniciativa +22, Percepção +32
Defesa 66, Fort +30, Ref +22, Von +38, imunidade a acertos críticos, efeitos mentais e medo, redução de dano 20, resistência a magia +5, maior que a morte
Pontos de Vida 2.500
Deslocamento 12m (8q)
Corpo a Corpo Rhumnam x4 +58 (6d6+40, 18, mais 6d8 luz).
À Distância Rhumnam +58 (6d6+40, x4, mais 6d8 luz, alcance médio).
Centelha Divina O Avatar de Khalmyr pode lançar qualquer magia divina como um clérigo de 20º nível sem gastar PM (CD 52, limite de PM 20). Uma vez por rodada, ele pode lançar Círculo da Justiça como ação livre.
✦ Cura Pelas Mãos (Movimento) O Avatar cura 10d6+10 pontos de vida por luz de uma criatura em alcance curto e remove dela as condições abalado, apavorado, atordoado, cego, doente, exausto, fatigado e surdo.
“Eu Tenho o Tabuleiro.” O Avatar emana uma aura de ordem de 30m de raio. Cada criatura que comece seu turno dentro da aura deve fazer um teste de Vontade (CD 52). Se falhar, até o fim do seu turno todas as suas rolagens de d20 para testes de perícia são automaticamente 10. Se passar no teste de Vontade, a criatura fica imune a esta habilidade pelo resto da cena.
✦ Julgamento dos Culpados Uma criatura culpada de crimes graves ou maligna (a critério do mestre) que comece seu turno na aura de ordem do Avatar fica paralisada (Vont CD 52 muda para apavorada e a criatura não pode mais ser paralisada por esta habilidade pelo resto da cena). Esta habilidade afeta mesmo criaturas imunes a efeitos de medo e de movimento.
✦ Julgamento dos Inocentes Uma criatura que, a critério do mestre, seja bondosa ou inocente que comece seu turno na aura de ordem do Avatar recebe +6 em testes de ataque e na Defesa, e redução de dano 10.
Pilar da Criação (Livre) O Avatar recebe +6 na Defesa e redução de dano 30 até o fim da cena ou até encerrar esta habilidade (uma ação livre), mas seu deslocamento é reduzido à metade e ele não pode correr ou fazer investidas.
Rhumnam Quando o Avatar acerta um ataque com Rhumnam em uma criatura culpada de crimes graves ou maligna (a critério do mestre), a criatura é completamente destruída. Contra inocentes, os ataques do Avatar com Rhumnam não causam dano. Além disso, enquanto estiver empunhando Rhumnam, o Avatar recebe imunidade a magias arcanas.
✦ Ver Além da Mentira O Avatar está permanentemente sob o efeito básico da magia Visão da Verdade.
For 14, Des 6, Con 16, Int 8, Sab 16, Car 12
Perícias Cavalgar +24, Conhecimento +30, Diplomacia +38, Guerra +34, Intuição +40, Investigação +34, Nobreza +34, Religião +40.
Equipamento Balas x20, baluarte anão, Rhumnam. Tesouro Nenhum.`
        },
        {
          chave: "avatarDeLena", nome: "Avatar de Lena", nd: "20", tipo: "Espírito Médio",
          papel: '',
          deus: "Lena", subgrupo: "Lena, Deusa da Vida",
          resumo: "Por muito tempo, dizia-se que Lena visitava Arton como uma menina de 9 anos.",
          texto:
`Avatar de Lena ND 20
Por muito tempo, dizia-se que Lena visitava Arton como uma menina de 9 anos. Muitas escrituras, de fato, a tratam por Deusa Criança — sua aparência de pouca idade relacionada à pureza da infância, a novas vidas. Várias histórias também mencionam que a deusa teria chorado em momentos de tragédia, ou que teria atuado como uma menina protegida de perigos por heróis. Ou outros deuses.
Em tempos recentes, contudo (mais exatamente, desde a ascensão de Aharadak), Lena não tem sido vista assim. Ela agora surge como uma mulher humana sorridente, de formas generosas, exalando maternidade. Alguns dizem ser uma maneira de mostrar sua força plena. Para outros, essa sempre foi sua forma real, sendo a Deusa Criança apenas uma face secundária. Dizem que Lena pode surgir sem aviso para auxiliar em partos difíceis, abençoar o nascimento de pessoas destinadas a grandes feitos ou ainda curar campeões em missões de grande importância.
Espírito Médio
Iniciativa +22, Percepção +34, visão no escuro
Defesa 59, Fort +28, Ref +20, Von +34, cura acelerada 20, imunidade a cansaço, efeitos de metabolismo, medo, necromancia e trevas, redução de dano 20
Pontos de Vida 900
Deslocamento 12m (8q)
✦ Abençoar a Chegada Se o Avatar de Lena estiver presente durante o nascimento de uma criatura, o parto transcorre sem nenhum problema. Além disso, ela chega a Arton sob as bênçãos de saúde e graça da deusa e recebe +1 em Constituição e Carisma.
Aura de Vida O Avatar emite uma aura de luz de 30m. No início de cada turno dele, todas as criaturas nessa área curam 50 PV.
Centelha Divina O Avatar lança qualquer magia divina como um clérigo de 20º nível sem gastar PM (CD 51, limite de PM 40). Ele jamais usa magias que causam dano ou perda de PV, nem magias que aumentem o dano letal de seus aliados.
✦ Transferir Vitalidade (Livre) Uma vez por rodada, o Avatar gasta qualquer quantidade dos seus pontos de vida para curar dano ou condições de criaturas em alcance curto, à taxa de 1 PV por 1 ponto de vida curado ou 3 PV por condição removida, entre abalado, apavorado, alquebrado, atordoado, cego, confuso, debilitado, enjoado, esmorecido, exausto, fascinado, fatigado, fraco, frustrado, ofuscado, pasmo, sangrando, surdo ou vulnerável.
For 6, Des 6, Con 12, Int 8, Sab 18, Car 14
Perícias Cura +39, Diplomacia +35, Intuição +34, Misticismo +26, Religião +39.
Tesouro Nenhum.`
        },
        {
          chave: "avatarDeLinWu", nome: "Avatar de Lin-Wu", nd: "19", tipo: "Espírito (dragão) Enorme",
          papel: '',
          deus: "Lin-Wu", subgrupo: "Lin-Wu, Deus da Honra",
          resumo: "No Império de Jade, Lin-Wu costuma assumir uma entre duas aparências: um imenso dragão celestial, serpenteando nos céus em cores…",
          texto:
`Avatar de Lin-Wu ND 19
No Império de Jade, Lin-Wu costuma assumir uma entre duas aparências: um imenso dragão celestial, serpenteando nos céus em cores brilhantes, belo e colorido como as quatro estações; ou um poderoso samurai em armadura cerimonial escarlate, empunhando uma katana faiscante de relâmpagos (dizem ser ele o mais perigoso espadachim entre os deuses). Muitos questionam por qual razão essas formas tão combativas não foram empregadas para proteger Tamu-ra da Tormenta. Seus devotos afirmam que, sendo algo honrado, Lin-Wu com certeza o faria. A honra traz mistérios que apenas os deuses conhecem.
O grande samurai e o dragão celestial são figuras familiares aos tamuranianos; eles não as temem.
Poderiam, no entanto, intimidar o povo do Reinado.
Quando visita essas terras, por gentileza e cortesia, Lin-Wu recorre a uma aparência bem mais aprazível — um galante meio-dragão de Tamu-ra, ou ryuujin, em vestes de seda esvoaçantes. Suas habilidades de combate, no entanto, seguem idênticas à versão samurai.
Espírito (dragão) Enorme
Iniciativa +29, Percepção +35, visão no escuro
Defesa 56, Fort +19, Ref +27, Von +33, imunidade a atordoamento, efeitos de metabolismo, eletricidade, ilusão, medo, metamorfose e paralisia, redução de dano 30, resistência a magia +5
Pontos de Vida 1.284
Deslocamento 15m (10q), voo 30m (20q)
Corpo a Corpo Kaminari x2 +54 (36+36 corte, 17/x3, mais 30 eletricidade) e duas garras +52 (24+16, 18).
Centelha Divina O Avatar de Lin-Wu lança qualquer magia divina como um clérigo de 19º nível sem gastar PM (CD 48, limite de PM 19). Uma vez por rodada, ele pode lançar Fúria do Panteão como uma ação livre. Alternativamente, se você tiver o suplemento Ameaças de Arton, em vez disso ele lança Katana Celestial (p. 404).
Dragão Divino O Avatar tem todas as habilidades de dragões celestiais (p. 272).
✦ Explosão de Relâmpagos Quando o Avatar acerta um ataque com Kaminari, outras criaturas a 6m do alvo desse ataque sofrem de 30 pontos de dano de eletricidade (Ref CD 49 reduz à metade).
Kiai Celestial O Avatar sempre causa dano máximo, sem necessidade de rolar dados (já contabilizado).
Mil Cortes (Completa) O Avatar faz um ataque com Kaminari em um cone de 30m. Ele faz um único ataque e compara o resultado com a Defesa de todas as criaturas na área. Então faz uma única rolagem de dano e aplica-a em cada inimigo atingido. Caso o ataque seja um acerto crítico, o Avatar pode usar esta habilidade uma segunda vez. Recarga (movimento).
Punir a Desonra Quando ataca uma criatura que possui um código de conduta (como Código de Honra ou devoção a alguma divindade) e que, a critério do mestre, não esteja obedecendo a esse código, o Avatar rola dois dados e escolhe o melhor resultado.
For 12, Des 12, Con 10, Int 8, Sab 18, Car 10
Perícias Atletismo +29, Conhecimento +28, Guerra +28, Intimidação +27, Intuição +35, Nobreza +33, Religião +38.
Equipamento Kaminari. Tesouro Nenhum.`
        },
        {
          chave: "avatarDeMarah", nome: "Avatar de Marah", nd: "19", tipo: "Espírito Médio",
          papel: '',
          deus: "Marah", subgrupo: "Marah, Deusa da Paz e do Amor",
          resumo: "Antigamente, Marah era representada como uma mulher solene, em vestes brancas que brilhavam com luz própria.",
          texto:
`Avatar de Marah ND 19
Antigamente, Marah era representada como uma mulher solene, em vestes brancas que brilhavam com luz própria. Hoje, porém, é mais vista na figura de uma dançarina sorridente e cheia de vida. Em qualquer forma, Marah nunca porta armas ou mostra quaisquer capacidades combativas. Não que isso seja necessário — em sua presença, criaturas mortais são incapazes de quaisquer atos agressivos. Animais ferozes ficam mansos, soldados deixam cair suas armas. Dos corações de todos na presença da deusa a violência desaparece, sendo substituída pelo desejo de amar.
Espírito Médio
Iniciativa +27, Percepção +29, visão no escuro
Defesa 48, Fort +29, Ref +36, Von +42, imunidade a atordoamento, efeitos mentais e medo, maior que a morte, redução de dano 10, resistência a magia +5
Pontos de Vida 789
Deslocamento 9m (6q)
✦ Bênção da Calmaria O Avatar de Marah emana uma aura de calmaria de 30m. Qualquer criatura nessa área que tente executar uma ação hostil deve fazer um teste de Vontade (CD 53). Se falhar, perde a ação. Se passar, pode agir normalmente, mas perde 2d6 PM ao fim do seu turno. Caso os PM da criatura sejam reduzidos a 0 por esta habilidade, ela fica enfeitiçada e perde a vontade de lutar por 1 dia.
Coração Gentil Quando faz um teste de uma perícia baseada em Sabedoria ou Carisma, o Avatar rola dois dados e usa o melhor resultado.
Centelha Divina O Avatar pode lançar qualquer magia divina como um clérigo de 19º nível sem gastar PM (CD 49, 53 para encantamento e ilusão, limite de PM 20). Uma vez por rodada, ele pode lançar Enfeitiçar como ação livre.
Faça Amor, Não Faça Guerra Qualquer criatura dentro da Bênção da Calmaria do Avatar que aceitar encerrar um conflito de maneira pacífica recebe +3 PM por nível até o fim da aventura. Esses bônus desaparecem caso a criatura execute qualquer ação hostil.
✦ Incitar Paixão (Padrão) O Avatar e todos os seus aliados em alcance médio recebem +5 em testes de perícia e 40 PM temporários até o fim da cena. Qualquer criatura que executar uma ação hostil perde esses bônus.
Música da Calmaria O Avatar possui todos os poderes de Música de Bardo e pode usá-los sem gastar PM.
For 6, Des 10, Con 8, Int 8, Sab 12, Car 20
Perícias Acrobacia +27, Atuação +45, Conhecimento +25, Diplomacia +40, Enganação +35, Intuição +29, Misticismo +25, Religião +29.
Equipamento Pandeiro aprimorado, Véu do Desejo.
Tesouro Nenhum.`
        },
        {
          chave: "avatarDeMegalokk", nome: "Avatar de Megalokk", nd: "20", tipo: "Monstro (kaiju) Colossal",
          papel: '',
          deus: "Megalokk", subgrupo: "Megalokk, Deus dos Monstros",
          resumo: "Devido à relativa facilidade em enfurecer este deus, o avatar de Megalokk pode às vezes ser invocado por seus clérigos e outros…",
          texto:
`Avatar de Megalokk ND 20
Devido à relativa facilidade em enfurecer este deus, o avatar de Megalokk pode às vezes ser invocado por seus clérigos e outros conjuradores contra inimigos — ainda que sem qualquer controle, podendo inclusive atacar seus próprios invocadores. Apenas aqueles com extrema habilidade diplomática, ou outros meios para lidar com feras sanguinárias, conseguem dissuadir a criatura de matar à primeira vista.
Em outras ocasiões, Megalokk pode surgir na forma de algum monstro híbrido, como uma esfinge, quimera ou mantícora, para lidar com heróis. Ele aprecia atraí-los até covis de monstros, por acreditar que suas crias serão sempre vitoriosas. Quando esse plano falha, contudo, já houve vezes em que ele próprio ressurgiu cheio de ódio, dizimando os aventureiros já combalidos.
Sua forma mais conhecida e poderosa tem corpo humanoide alado robusto e várias cabeças de monstros, diferentes em cada manifestação.
Monstro (kaiju) Colossal
Iniciativa +26, Percepção +27, visão no escuro, faro
Defesa 57, Fort +40, Ref +29, Von +18, cura acelerada 100/kaiju, imunidade a efeitos de metabolismo e mentais, medo, metamorfose, paralisia e veneno, maior que a morte, redução de dano 50
Pontos de Vida 1.800
Deslocamento 18m (12q), voo 12m (8q)
Corpo a Corpo Mordida x4 +54 (4d20+20, 17/x3) e duas garras +54 (2d20+20, 19/x3).
Agarrar Aprimorado (Livre) Mordida (teste +64).
Engolir Se o Avatar de Megalokk começar seu turno agarrando uma criatura menor que ele, pode fazer um teste de agarrar contra ela. Se vencer, engole a criatura. Uma criatura engolida continua agarrada, fica cega, tem cobertura total contra efeitos vindos do lado de fora do Avatar (e vice-versa) e sofre 6d12+20 pontos de dano de impacto no início de cada turno do Avatar. O Avatar pode manter quantas criaturas engolidas quiser. Uma criatura engolida pode escapar causando 100 pontos de dano ao estômago do Avatar (Defesa 30). Isso faz com que ela seja regurgitada e fique caída na frente do monstro.
Incontível Sempre que falha em um teste de resistência contra um efeito com duração maior que instantânea, o Avatar pode fazer um novo teste contra esse efeito no início do seu próximo turno. A cada novo teste de resistência contra o mesmo efeito, o Avatar recebe um bônus cumulativo de +5 no teste.
Presas Monstruosas Cada vez que o Avatar acerta um ataque com suas Presas Monstruosas, ele gera um dos efeitos abaixo, definido aleatoriamente.
1) Basilisco A criatura atingida fica lenta (Fort CD 48 reduz a duração para 1 rodada). Caso uma criatura lenta dessa forma seja atingida novamente e falhe no teste de Fortitude, fica petrificada.
2) Dragão A criatura atingida sofre 4d12 pontos de dano fogo e sua armadura ou escudo (à escolha dela) fica avariado (Ref CD 48 reduz à metade e evita a condição).
3) Lobo Atroz A criatura atingida fica sangrando (Ref CD 48 evita). Esse sangramento causa a perda de 2d6 PV, em vez do normal.
4) Serpe O ataque inocula veneno de serpe divina.
✦ Presença Selvagem O Avatar emana uma aura de violência de 30m de raio. No início de seus turnos, cada criatura nessa área deve fazer um teste de Vontade (CD 48). Se falhar, fica esmorecida. Se já estiver esmorecida, em vez disso entra em um frenesi selvagem por 1 rodada; em seu próximo turno, ela deve atacar a criatura mais próxima, mesmo que seja um aliado.
Rasgar Montanhas (Completa) O Avatar desfere um golpe concentrado que atinge todas as criaturas em um cubo de 15m de lado adjacente a ele. Criaturas nessa área sofrem 10d20+70 pontos de dano de corte e ficam caídas (Ref CD 48 reduz à metade e evita a condição). Recarga (movimento).
Titânico O Avatar é imune a manobras de combate, não pode ser flanqueado e sofre metade do dano de de efeitos que não sejam de outra criatura Titânica. Quando se move, pisoteia qualquer criatura ou objeto Enorme ou menor em seu caminho (atravessando seu espaço), causando 20d6 pontos de dano de impacto (uma vez por rodada por criatura, Ref CD 48 reduz à metade). Além disso, ele ignora redução de dano e seus ataques atingem todas as criaturas em um quadrado de 6m (para cada ataque, ele faz um único teste de ataque e compara o resultado com a Defesa de cada inimigo na área).
Veneno Peçonha de Serpe Divina (fica fraco e perde 4d12 pontos de vida por rodada durante 10 rodadas, Fort CD 48 reduz para 1 rodada). Este veneno ignora qualquer imunidade a venenos.
For 18, Des 8, Con 20, Int 3, Sab 6, Car 6
Perícias Atletismo +39, Intimidação +32, Sobrevivência +32.
Tesouro Nenhum.`
        },
        {
          chave: "avatarDeNimb", nome: "Avatar de Nimb", nd: "S+", tipo: "Espírito (Nimb) Médio",
          papel: '',
          deus: "Nimb", subgrupo: "Nimb, Deus do Caos",
          resumo: "Nimb raramente se manifesta da mesma forma duas vezes.",
          texto:
`Avatar de Nimb ND S+
Nimb raramente se manifesta da mesma forma duas vezes. Suas aparições podem variar de um velho viajante louco a uma fada lutadora, um anão arcanista ou um gato laranja sem rabo. Quando deseja ser reconhecido, contudo, adota a forma icônica de um homem esquálido com olhos esbugalhados, cartola e brincos. Ele é frequentemente visto brincando com dados que trazem símbolos sem sentido.
Para os seguidores de Nimb, a aparição de seu avatar é um presságio de boa sorte ou desastre iminente. O que ele traz consigo — sorte, azar ou caos puro — será impossível prever. Sua presença pode alterar o curso de batalhas, lançar dúvidas sobre vitórias certas ou surpreender até os mais sábios entre os deuses.
Espírito (Nimb) Médio
Iniciativa +31, Percepção 1d20+21
Defesa 61, Fort +27, Ref +33, Von +39, imunidade a efeitos de adivinhação, encantamento, metamorfose e mentais, maior que a morte, redução de dano 21
Pontos de Vida 4.777
Deslocamento sorrelfliflar 13,5m (9q; veja Sorrelfliflo Galunflante)
Aura Caótica Derradeira O Avatar de Nimb emana uma aura de puro Caos capaz de distorcer a própria existência de seus inimigos. No início do turno do Avatar, cada criatura em um raio de 90m perde 8d6 pontos de vida. Cada vez que rolar o valor máximo em um dado de dano da aura, role um dado extra e some ao dano total desta habilidade.
Centelha Divina O Avatar pode lançar qualquer magia divina como um clérigo de 19,5º nível sem gastar PM (CD 55, limite de PM 21). Sempre que uma criatura obtém um resultado 1 no dado em um teste de resistência contra uma magia do Avatar, ela fica confusa.
“Eu Movo as Peças!” No começo da rodada, o Avatar rola 1d6 e move cada criatura a sua escolha em alcance médio um número de quadrados igual ao resultado, em uma direção a sua escolha.
Mimsicais Dados Frumiosos (Padrão) O Avatar faz alguma coisa que gera um efeito inesperado. Role 1d7 e use o efeito correspondente entre os descritos a seguir.
1) Role novamente, escolha outro efeito desta tabela e role novamente.
2) Um guincho metálico ressoa freneticamente. Inimigos em alcance médio sofrem 10d12 pontos de dano de impacto e ficam surdos (Fort CD 55 reduz à metade e evita a condição).
3) O Avatar pega a linha de pensamento de alguém e desfere um golpe com ela. Inimigos em uma linha de 15m sofrem 12d10+10d8 pontos de dano psíquico e ficam confusos (Von CD 55 reduz à metade e evita a condição).
4) Um animal muito fofinho se materializa em pleno ar e abraça o Avatar. Ele (o Avatar, não o animal fofinho) recupera 20d10 PV e cura uma das condições que o esteja afetando.
5) Um dragão de duas cabeças sai de uma das mangas do Avatar e sopra tibares em um cone em de 18m (se o Avatar não tinha mangas, uma roupa com mangas se materializa em sua forma… você, hein, se apegando a detalhes!). Cada criatura na área sofre 10d12 pontos de dano de fogo e 10d12 pontos de dano de impacto e recebe uma quantidade de tibares igual ao dano causado (Ref CD 55 reduz o dano e a quantidade de tibares à metade).
6) Todos os efeitos de 2 a 5 ocorrem ao mesmo tempo.
7) Todos os efeitos acima e o Avatar de Nimb ainda ganha um queijo.
óDiO aO PRevIsíVEl O Avatar odeia previsibilidade e pune quem não guarda nenhuma surpresa. Sempre que uma criatura em alcance médio escolher 10 em um teste ou executar a mesma ação que executou em sua rodada anterior, o Avatar causa a ela 10d20 pontos de dano psíquico e a criatura não pode mais executar essa ação ou escolher 10 com essa perícia específica até o fim da cena (Von CD 55 reduz à metade e evita a restrição de ações).
Ou Não (Reação) Uma vez por cena, o Avatar desfaz uma série de acontecimentos recentes. Quando ele usa esta habilidade, todos os eventos da rodada atual são desfeitos (como se nunca tivessem ocorrido) e o presente retorna para o início da rodada anterior do Avatar. Esta habilidade afeta apenas os eventos da cena atual. O resto do mundo segue sua vida feliz mas, para evitar paradoxos incompreensíveis, o restante de Arton fica aguardando pacientemente até que essa rodada seja resolvida e todos retornem ao mesmo momento no tempo (que gentil da parte deles).
Sorrelfliflo Galunflante. O Avatar tem todos os deslocamentos que existem nos livros, que existiram em livros passados e que existirão em livros futuros, ou não.
Sorte e Azar No final de cada turno do Avatar, role 1d6. Em um valor ímpar, até o início do próximo turno do Avatar todos os sucessos em testes se tornam falhas e todas as falhas se tornam sucessos (para efeito de margens de ameaça e habilidades como Almejar o Impossível, considere que um resultado 1 no d20 equivale a um 20, um 2 equivale a um 19 e assim por diante).
For 9, Des 11, Con 7, Int 17, Sab 1d20, Car 13
Perícias Diplomacia +31, Jogatina +43, mais 1d12 perícias em +13 cada.
Equipamento Olhe para três itens ao seu redor, que não sejam celulares, computadores ou coisas do tipo. O Avatar tem um de cada desses itens, cada um com três encantos à escolha dele ou com o efeito de um acessório mágico que talvez exista em algum lugar do livro, ou não. E ele tem um queijo.
Tesouro Padrão.`
        },
        {
          chave: "avatarDoOceano", nome: "Avatar do Oceano", nd: "S", tipo: "Espírito Médio",
          papel: '',
          deus: "Oceano", subgrupo: "Oceano, Deus dos Mares",
          resumo: "Quando ainda decidia visitar o mundo material, Oceano adotava a aparência de um galante elfo-do-mar, ricamente ornamentado com tesouros de…",
          texto:
`Avatar do Oceano ND S
Quando ainda decidia visitar o mundo material, Oceano adotava a aparência de um galante elfo-do-mar, ricamente ornamentado com tesouros de naufrágios — dizem, como forma de ostentar que riquezas perdidas em seus domínios jamais serão retornadas. Para aqueles dispostos a desafiá-lo, exibia o tridente imenso, uma das armas mais impressionantes entre aquelas portadas pelos deuses.
Conta-se também que, por vezes, Oceano se manifestou como um velho pirata cujo único olho refletia o infinito das profundezas. Ou como um imenso leão-marinho prateado. Ou ainda uma gigantesca água-viva com tentáculos de dezenas de quilômetros, capazes de envolver ilhas inteiras.
Desde seu dramático sumiço, contudo, o avatar do Oceano ainda não voltou a ser visto. Caso isso aconteça, dependendo de suas motivações, talvez o deus decida eliminar quaisquer testemunhas para preservar seu segredo...
Espírito Médio
Iniciativa +34, Percepção +28, percepção às cegas (longo)
Defesa 65, Fort +36, Ref +30, Von +22, imunidade a acertos críticos, fogo, frio, queda e precipitações (Tormenta20, p. 267), redução de dano 20
Pontos de Vida 2.500
Deslocamento 12m (8q), natação 36m (24q)
Corpo a Corpo Dente do Leviatã x4 +58 (4d8+50, mais 4d12 frio).
À Distância Jato d’água x6 +58 (2d12+35 impacto mais 2d12 frio, alcance longo).
Caçador Submarino Quando faz um teste de perícia em um ambiente aquático, o Avatar do Oceano rola dois dados e usa o melhor resultado.
Centelha Divina O Avatar pode lançar qualquer magia divina como um clérigo de 20º nível sem gastar PM (CD 51, limite de PM 20). Se estiver em terreno aquático, o custo de suas magias é reduzido em –4 PM e a CD para resistir a elas aumenta em +4.
✦ Dominar as Tempestades (Completa) O Avatar pode alterar o clima em uma esfera de 2 km ao seu redor (como o efeito básico da magia Controlar o Clima).
Forma Animal (Completa) O Avatar adquire a forma de um monstro marinho gigantesco. Ele recebe +5 em Força e na Defesa, seu ataque corpo a corpo muda para mordida +58 (4d12+25) e pancada x8 +54 (4d12+20) e seu tamanho muda para Colossal. Nessa forma, ele não pode falar, mas pode lançar magias.
Golpe Tempestuoso (Livre) Uma criatura atingida por um ataque corpo a corpo do Avatar é empurrada 1,5m para cada 5 pontos de dano que sofrer (Fort CD 51 evita).
Mar em Fúria (Completa) Se estiver no mar, o Avatar invoca um maremoto em uma esfera de 30 de raio. Criaturas nessa área sofrem 15d10 pontos de dano, metade frio e metade impacto, e são tragadas para dentro do mar (Fort CD 51 reduz à metade e evita ser tragado). Uma criatura tragada afunda 1,5m para cada 5 pontos de dano sofrido. Recarga (movimento).
Onda Colossal (Completa) O Avatar inunda uma esfera com 15m de raio em alcance médio de uma fonte de água salgada em alcance longo. A área se torna um corpo de água salgada que conta como terreno difícil para criaturas sem deslocamento de natação. Voz dass Marés O Avatar pode falar com animais, espíritos, humanoides e monstros marinhos (como o efeito da magia Voz Divina).
For 12, Des 8, Con 16, Int 8, Sab 12, Car 8
Perícias Adestramento +34, Atletismo +33, Diplomacia +29, Intimidação +29, Religião +33, Sobrevivência +38.
Equipamento Dente do Leviatã. Tesouro Dobro.`
        },
        {
          chave: "avatarDeSszzaas", nome: "Avatar de Sszzaas", nd: "19", tipo: "Espírito Médio",
          papel: '',
          deus: "Sszzaas", subgrupo: "Sszzaas, Deus da Traição",
          resumo: "Normalmente, Sszzaas não quer ser reconhecido.",
          texto:
`Avatar de Sszzaas ND 19
Normalmente, Sszzaas não quer ser reconhecido. Para isso, assume formas diferentes — pode ser um conselheiro educado de fala mansa, uma viúva rica precisando de ajuda, um menestrel de língua afiada e fofoqueiro… O único ponto em comum de todas as formas é que elas carregam uma adaga mágica de lâmina negra, a Inoculadora. Já quando deseja ser reconhecido, Sszzaas surge na forma de uma imensa serpente com cinco olhos ou de um homem alto e esguio, de cabelos longos e face encoberta em sombras, exceto por seus cinco olhos brilhantes.
Espírito Médio
Iniciativa +34, Percepção +30, visão no escuro
Defesa 59, Fort +26, Ref +30, Von +33, evasão aprimorada, imunidade a veneno, maior que a morte, não pode ser flanqueado ou surpreendido, redução de dano 10
Pontos de Vida 1.007
Deslocamento 12m (8q)
Corpo a Corpo Inoculadora +52 (1d4+31, 15/x4, mais veneno).
Ataque Furtivo +10d8.
Centelha Divina O Avatar de Sszzaas pode lançar qualquer magia divina, ou magia arcana de ilusão, como um clérigo de 19º nível sem gastar PM (CD 49, limite de PM 20) usando apenas concentração (veja Magia Discreta em Tormenta20, p. 131). Outros personagens só percebem que ele lançou uma magia se passarem num teste de Misticismo (CD 40).
Falso Amigo Quando usa Disfarce Ilusório para mudar a própria aparência, o Avatar recebe um bônus adicional de +10 nos testes de Enganação. Alternativamente, se você tiver o suplemento Ameaças de Arton, ele pode agir como um falso amigo mestre de qualquer tipo (p. 327).
Manto do Traidor O Avatar pode se esconder mesmo sem camuflagem ou cobertura disponíveis, não sofre penalidade em testes de Furtividade por se mover ao seu deslocamento normal e reduz a penalidade em Furtividade por atacar e fazer outras ações chamativas para –5.
Reviravolta O alvo do primeiro ataque do Avatar em cada cena é considerado desprevenido.
Senhor da Intriga Quando faz um teste de uma perícia baseada em Inteligência ou Carisma, o Avatar rola dois dados e usa o melhor resultado.
✦ Trocar de Pele (Reação) Uma vez por rodada, ao ser alvo de um efeito hostil, o Avatar pode trocar de lugar com uma criatura em alcance médio (Von CD 49 evita). A criatura trocada passa a ser o novo alvo da ação.
Veneno Peçonha anciã (perde 3d12 pontos de vida por rodada durante 3 rodadas, ignora imunidade a veneno, Fort CD 49 reduz a duração para 1 rodada).
For 7, Des 14, Con 6, Int 20, Sab 10, Car 17
Perícias Acrobacia +31, Conhecimento +40, Diplomacia +34, Enganação +37, Furtividade +31, Intuição +30, Investigação +37, Ladinagem +31, Misticismo +37, Ofício (alquimista) +37.
Equipamento Inoculadora. Tesouro Nenhum.`
        },
        {
          chave: "avatarDeTannaToh", nome: "Avatar de Tanna-Toh", nd: "20", tipo: "Espírito Médio",
          papel: '',
          deus: "Tanna-Toh", subgrupo: "Tanna-Toh, Deusa do Conhecimento",
          resumo: "A aparência favorita de Tanna-Toh ao visitar Arton é a de uma anciã munida de várias bolsas pesadas de pergaminhos.",
          texto:
`Avatar de Tanna-Toh ND 20
A aparência favorita de Tanna-Toh ao visitar Arton é a de uma anciã munida de várias bolsas pesadas de pergaminhos. O avatar de Tanna-Toh não costuma portar armas, com exceção de um eventual bordão, que usa mais para se apoiar na caminhada do que para atacar. Tanna-Toh já foi vista também na forma de uma barda tocando uma harpa e de uma cientista que parece dominar todos os campos do conhecimento. Ao contrário de outros deuses, Tanna-Toh nunca disfarça ou oculta sua verdadeira identidade.
Espírito Médio
Iniciativa +23, Percepção +35, visão no escuro
Defesa 57, Fort +27, Ref +35, Von +41, imunidade a efeitos mentais e ilusão, maior que a morte, resistência a dano 10
Pontos de Vida 953
Deslocamento 6m (4q)
Corpo a Corpo Cajado do poder +54 (1d6+20).
Centelha Divina O Avatar de Tanna-Toh pode lançar qualquer magia arcana ou divina como um conjurador de 19º nível sem gastar PM (CD 51, limite de PM 20). Uma vez por rodada, pode lançar a magia Comando como ação livre.
Compartilhar Conhecimento (Movimento) Uma criatura em alcance curto se torna treinada em uma perícia em que não era treinada. Este efeito dura até o fim do dia.
Golpe Semântico O Avatar pode substituir testes de Diplomacia e Intimidação por testes de Conhecimento.
Mestra da Verdade O Avatar sempre sabe quando alguém está mentindo. Além disso, quando faz um teste de uma perícia baseada em Inteligência ou Sabedoria, ele rola dois dados e escolhe o melhor resultado.
✦ Plantar Curiosidade (Padrão) Uma criatura adjacente é infundida de imensa curiosidade e necessidade de cumprir uma tarefa à escolha do Avatar pela próxima semana. Enquanto está nessa missão, o alvo recebe +2 em testes de perícia. O Avatar não pode escolher missões suicidas ou que contrariem as Obrigações & Restrições de Tanna-Toh. A criatura pode recusar a missão — mas, no fim de cada dia em que não se esforçar para cumprir a tarefa, deve fazer um teste de Vontade (CD 51); se falhar, sofre uma penalidade cumulativa de –2 em todos os testes e rolagens.
Poder das Histórias (Completa) O Avatar retira de sua bolsa um livro da Biblioteca de Tanna-Toh, com histórias tão poderosas que seus personagens escapam das páginas. O Avatar invoca uma ou mais criaturas em alcance curto, cujo ND total somado seja igual ao seu (o mestre pode escolher essas criaturas ou usar as tabelas de encontros aleatórios em Ameaças de Arton, gerando encontros até atingir o ND adequado). As criaturas surgem em alcance curto e agem a partir da próxima rodada, em suas iniciativas.
For 6, Des 6, Con 6, Int 20, Sab 14, Car 8
Perícias Atuação +29, Conhecimento +41, Cura +32, Intuição +35, Misticismo +38, Nobreza +38, Religião +35.
Equipamento Cajado do poder, Robe Professoral. Tesouro Nenhum.`
        },
        {
          chave: "avatarDeTenebra", nome: "Avatar de Tenebra", nd: "S", tipo: "Morto-vivo Médio",
          papel: '',
          deus: "Tenebra", subgrupo: "Tenebra, Deusa das Trevas",
          resumo: "Quando vem a este mundo, Tenebra surge como uma vampira extremamente atraente ou, se não quiser ser reconhecida, adota a forma de uma velha…",
          texto:
`Avatar de Tenebra ND S
Quando vem a este mundo, Tenebra surge como uma vampira extremamente atraente ou, se não quiser ser reconhecida, adota a forma de uma velha bruxa ou de uma anã. Também pode se manifestar como uma sombra que nenhuma luz é capaz de dissipar, ou como uma presença oculta, sempre logo fora da visão. Ela nunca visita Arton durante o dia.
Morto-vivo Médio
Iniciativa +30, Percepção +28, visão no escuro
Defesa 63, Fort +22, Ref +30, Von +36, cura acelerada 50, imunidade a efeitos de sentidos, encantamento, escuridão e dano de luz e trevas, maior que a morte, redução de dano 20, resistência a magia +5
Pontos de Vida 1.750
Deslocamento 18m (12q), voo 24m (16q)
Corpo a Corpo Mordida +55 (3d8+35, x4, mais 2d12 trevas) e garra x4 +52 (3d10+30, 18, mais 2d12 trevas).
Centelha Divina O Avatar de Tenebra pode lançar qualquer magia como um clérigo de 20º nível sem gastar PM (CD 51, limite de PM 20). Para magias de necromancia, o Avatar recebe +4 na CD e no limite de PM.
Deusa das Trevas Todo dano de trevas causado pelo Avatar ignora redução de dano e, contra criaturas imunes a trevas, ainda causa metade do dano.
✦ Dominação Sombria (Padrão) O Avatar sussurra palavras de controle para criaturas a sua escolha em alcance curto. Cada criatura fica confusa, enfeitiçada ou fascinada até o fim da cena, ou perde suas memórias da última hora, à escolha do Avatar (Von CD 51 evita). Uma criatura só pode ser alvo desta habilidade uma vez por cena.
Drenar Sangue (Padrão) O Avatar causa 13d8 pontos de dano de trevas em uma criatura viva em alcance curto (Fort CD 51 reduz à metade) e recupera PV em valor igual ao dano causado. Uma criatura morta dessa forma se erguerá como um vampiro na próxima noite e deverá vencer um teste de Vontade oposto contra o Avatar ou ficará sob o controle dele até ser libertada ou destruída.
Filhos da Trevas (Reação) Uma vez por rodada, quando sofre dano, o Avatar transfere esse dano para outro morto-vivo em alcance longo.
✦ Hordas dos Mortos (Completa) O Avatar invoca um ou mais mortos-vivos a sua escolha, cujo ND total somado seja igual a 20. Eles surgem em um espaço desocupado em alcance curto, obedecem aos comandos do Avatar e agem a partir da próxima rodada, em suas iniciativas. O Avatar só pode usar esta habilidade novamente quando todos os mortos-vivos forem eliminados.
Manto da Noite O Avatar emana uma aura de 30m de raio de escuridão total, que fornece camuflagem total e bloqueia a visão na área e através dela. Qualquer criatura que tente usar uma habilidade mágica de luz dentro da aura deve passar em um teste de Vontade (CD 51). Se falhar, a habilidade não tem efeito, mas quaisquer custos são pagos.
✦ Olhos Sombrios O Avatar está permanentemente sob o efeito básico da magia Visão da Verdade.
Presença Majestosa Qualquer criatura que tente executar uma ação hostil contra o Avatar deve fazer um teste de Vontade (CD 51). Se falhar, perde a ação (apenas uma vez por cena).
For 8, Des 12, Con 8, Int 15, Sab 10, Car 16
Perícias Acrobacia +30, Atuação +34, Diplomacia +34, Enganação +34, Furtividade +33, Intimidação +34, Misticismo +36, Religião +31.
Tesouro Nenhum.`
        },
        {
          chave: "avatarDeThwor", nome: "Avatar de Thwor", nd: "18", tipo: "Humanoide (bugbear) Enorme",
          papel: '',
          deus: "Thwor", subgrupo: "Thwor, Deus dos Goblinoides",
          resumo: "Não se tem notícia de um avatar de Thwor.",
          texto:
`Avatar de Thwor ND 18
Não se tem notícia de um avatar de Thwor. No entanto, muitos especulam que, quando surgir, será uma versão ainda mais impressionante do que o Ayrrak era em vida: um bugbear muito forte e inteligente, armado com um grande machado.
Humanoide (bugbear) Enorme
Iniciativa +25, Percepção +27, faro, visão no escuro
Defesa 56, Fort +32, Ref +22, Von +22, imunidade a cansaço, efeitos mentais e de metabolismo, paralisia e veneno, redução de dano 20/adamante, resistência a magia +10
Pontos de Vida 1.100
Deslocamento 15m (10q)
Corpo a Corpo Machado de guerra x3 +49 (4d10+20, 15/x3, mais 2d8 em não duyshidakk).
Centelha Divina O Avatar de Thwor lança qualquer magia divina como um clérigo de 18º nível, sem gastar PM (CD 47, limite de PM 18).
Discurso Impactante (Completa) Uma vez por cena, o Avatar faz um discurso que leva todas as criaturas em um raio de 30m a questionarem suas próprias crenças. Devotos de outros deuses perdem seus PM e ficam abalados, enquanto criaturas inteligentes (Int –3 ou mais) sem devoção passam a obedecer às Obrigações & Restrições de Thwor até o fim da cena (Von CD 47 evita). Devotos de Thwor na área afetada recuperam todos os seus PM e recebem +2 em testes de perícia até o fim da cena. Mental.
Encarnação do Mundo Como Deve Ser O Avatar começa com todos os poderes abaixo. Para cada 100 pontos de vida que ele tiver abaixo de seu máximo de PV, perde um desses poderes em ordem a partir de Vida (ele recupera os poderes se recuperar seus PV).
• Luz. Quando fosse sofrer dano de luz, em vez disso o Avatar causa essa mesma quantidade de dano em uma criatura em alcance curto e a deixa ofuscada (Ref CD 47 reduz à metade e evita a condição).
✦ • Início (Padrão). Todas as criaturas em um raio de 30m voltam ao início do turno anterior do Avatar. Todas as ações a partir desse ponto são desfeitas (isso inclui as consequências dessas ações, como perda de PV e PM). Com exceção do Avatar, nenhuma outra criatura sabe o que vai acontecer e todas devem executar as mesmas ações que realizaram originalmente (mas quaisquer dados devem ser rolados novamente).
• Movimento. O Avatar executa uma ação padrão adicional por turno.
• Continuidade. Quando um inimigo em alcance médio faz um teste de resistência contra uma magia do Avatar, se um sucesso nesse teste reduziria a duração do efeito, o inimigo faz o teste duas vezes e usa o pior resultado.
• Eles. Inimigos do Avatar em um raio de 30m não são considerados aliados uns dos outros para efeitos de suas próprias habilidades.
• Conhecimento. O Avatar recebe +10 em sua resistência a magia.
• Fora. Quando um inimigo em alcance médio usa uma habilidade em área ou que afeta vários aliados, esse inimigo não é incluído na própria habilidade.
✦ • Vida. O Avatar recebe cura acelerada 20.
O Ayrrak (Reação) Uma vez por rodada, quando o Avatar sofre uma condição ou dano, ele os transfere para um outro duyshidakk em alcance longo.
Ordens de Ataque (Livre) Uma vez por rodada, o Avatar ordena um aliado duyshidakk em alcance médio a fazer uma ação agredir como uma reação, imediatamente.
Presença Motivadora O Avatar emana uma aura de euforia em um raio de 30m. Aliados duyshidakk nessa área recebem +5 na Defesa e em testes de perícia.
For 14, Des 8, Con 12, Int 10, Sab 10, Car 10
Perícias Atletismo +34, Diplomacia +30, Guerra +35, Intimidação +30, Religião +30.
Equipamento Machado de guerra magnífico gigante atroz de adamante. Tesouro Dobro.`
        },
        {
          chave: "avatarDeThyatis", nome: "Avatar de Thyatis", nd: "19", tipo: "Espírito Enorme",
          papel: '',
          deus: "Thyatis", subgrupo: "Thyatis, Deus da Ressurreição e da Profecia",
          resumo: "Muitos dizem que avistar um avatar de Thyatis é garantia de morte — seguida ou não de ressurreição.",
          texto:
`Avatar de Thyatis ND 19
Muitos dizem que avistar um avatar de Thyatis é garantia de morte — seguida ou não de ressurreição. Assim, existe a crença de que este deus raramente se manifesta como avatar. Quando escolhe vir a Arton, Thyatis toma a forma de uma enorme fênix flamejante.
Espírito Enorme
Iniciativa +25, Percepção +36, visão no escuro
Defesa 59, Fort +19, Ref +32, Von +26, evasão, imunidade a doenças, fogo e medo, maior que a morte, redução de dano 10/trevas
Pontos de Vida 1.140
Deslocamento Voo 18m (12q)
Corpo a Corpo Mordida +52 (5d10+30 mais 20d6+30 fogo) e duas garras +52 (5d8+30).
Armas Abençoadas As armas naturais do Avatar de Thyatis são consideradas mágicas e sagradas; elas causam +4d8 pontos de dano contra devotos de deuses que canalizam apenas energia negativa e criaturas malignas (a critério do mestre).
Canto da Fênix (Reação) Quando o Avatar chega a 0 PV ou menos, seu corpo explode. Todas as criaturas em um raio de 30m sofrem 300 pontos de dano de fogo (Fort CD 47 reduz à metade).
Centelha Divina O Avatar pode lançar qualquer magia divina como um clérigo de 19º nível sem gastar PM (CD 47, limite de PM 19). Uma vez por rodada, ele pode lançar Alterar Destino ou Segunda Chance como uma ação livre.
Destino Reescrito Uma criatura que morra na presença do Avatar é ressuscitada 1d6 rodadas após sua morte. Pelas próximas 24 horas essa criatura ficará inconsciente, imersa em um sono profundo permeado por visões enviadas por Thyatis. As visões revelam o motivo da presença do Avatar e carregam um comando que deve ser obedecido pela criatura (geralmente, uma missão em nome de Thyatis, definida pelo mestre). Até que a missão seja cumprida, a cada semana em que a criatura não estiver ativamente buscando cumprir a missão, ela recebe uma penalidade cumulativa de –2 em todos os testes.
Fogo Purificador Dano de fogo causado pelo Avatar ignora RD, e imunidade a fogo apenas o reduz à metade.
Não Há Morte Quando Avatar explode por sua habilidade Canto da Fênix, ressurge no mesmo local, 1d6 rodadas depois. Ele retorna completamente restaurado, mas com apenas metade dos seus pontos de vida iniciais. Ele não pode usar esta habilidade novamente até recuperar todos os seus PV.
Telepatia Inata O Avatar pode se comunicar telepaticamente com qualquer criatura em alcance longo.
✦ Visão Flamejante O Avatar está permanentemente sob efeito das magias Visão Mística, com o aprimoramento que permite enxergar criaturas e objetos invisíveis, e Visão da Verdade.
For 12, Des 8, Con 12, Int 11, Sab 16, Car 10
Perícias Conhecimento +31, Diplomacia +30, Intuição +36, Religião +33.
Tesouro Pena flamejante (se o portador da pena morrer, ela é automaticamente consumida e ele é ressuscitado após 1d6 rodadas). Em raras ocasiões, o Avatar pode presentear um aliado com uma dessas penas.`
        },
        {
          chave: "avatarDeValkaria", nome: "Avatar de Valkaria", nd: "S+", tipo: "Espírito (humano) Médio",
          papel: '',
          deus: "Valkaria", subgrupo: "Valkaria, Deusa da Aventura",
          resumo: "Exceto talvez por Nimb, nenhuma outra divindade usa aparências tão variadas quanto Valkaria.",
          texto:
`Avatar de Valkaria ND S+
Exceto talvez por Nimb, nenhuma outra divindade usa aparências tão variadas quanto Valkaria. Quando visita o mundo mortal (o que ela faz muito mais vezes do que seria prudente), a deusa pode surgir como alguém alta ou baixa, esbelta ou robusta, de qualquer etnia. Como única constante, será uma mulher humana. Mas a deusa tem algumas personas favoritas.
Algumas vezes surge como a célebre estátua, invocando a imagem da dama em apuros, inspirando heróis a salvá-la. Em outras, será uma barda jovial ou uma guerreira mercenária (como fez muitas vezes quando estava em cativeiro, exclusivamente nos limites da cidade). Ou, quando deseja ser reconhecida, usa sua forma esplendorosa em armadura resplandecente, como líder do Panteão.
Valkaria quase nunca entra em combate como avatar — porque isso significa roubar de seus amados heróis uma oportunidade de vitória. Mas houve a ocasião em que enfrentou seus próprios Libertadores, como a última guardiã no Labirinto de Valkaria, com toda a sua força.
Espírito (humano) Médio
Iniciativa +32, Percepção +24
Defesa 68, Fort +33, Ref +25, Von +38, imunidade a efeitos mentais e de movimento e a medo, maior que a morte, redução de dano 20, resistência a magia +5
Pontos de Vida 3.800
Deslocamento 18m (12q), sem redução por terreno difícil
Corpo a Corpo Exploradora x4 +65 (8d8+35, 16, mais 6d8 luz).
Alcançar o Infinito Quando o Avatar de Valkaria faz um teste de perícia, um resultado de 17 ou mais no dado sempre é um sucesso, não importando o valor a ser alcançado.
Aventureira Mística (Livre) Uma vez por rodada, quando executa uma ação padrão, o Avatar lança uma de suas magias.
Centelha Divina O Avatar pode lançar qualquer magia divina como um clérigo de 20º nível sem gastar PM (CD 55, limite de PM 20).
Livre Como a Ambição O Avatar pode atravessar objetos sólidos, como paredes, como se fosse intangível.
Passo Divino (Livre) Uma vez por rodada, o avatar se move 3m.
Mudança Encarnada O Avatar começa cada cena com três habilidades escolhidas entre as descritas a seguir. Ele pode gastar uma ação padrão para trocar uma de suas habilidades por outra que não tenha usado durante a cena, mas apenas se tiver usado cada uma de suas habilidades iniciais pelo menos uma vez na cena.
• Aventureira Completa. O Avatar recebe +5 em testes de perícia.
• Desafiante Sagrada (Livre, sustentada). O Avatar gera uma aura de 18m ao seu redor. Cada criatura na aura fica intoxicada pelo desejo de aventura e deve escolher entre combater ousadamente (em termos de regras, a criatura escolhe uma restrição como no poder Bravata Imprudente; Tormenta20, p. 48) ou sofrer –5 em testes de perícia e dano enquanto estiver dentro da aura. Se combater ousadamente, a criatura recebe 1 PM temporário cumulativo no início de cada turno em que estiver dentro da aura.
• Intervenção Direta (Completa). Uma vez por cena, o Avatar lança até três de suas magias. Após usar esta habilidade, ele fica incapacitado de lançar magias pelas próximas 1d4 rodadas.
• Mais Além! (Reação). Uma vez por rodada, quando rola 17 ou mais num d20, o Avatar recebe uma ação completa, mesmo que não seja seu turno.
• Mestra Exploradora. Quando se move 12m ou mais, o Avatar recebe +5 na margem de ameaça e +2d10 de dano contra criaturas não humanas.
• Realeza Divina (Reação). Uma vez por rodada, o Avatar rola novamente um teste recém-realizado. Ele escolhe qual dos resultados utilizar.
• Resiliência Heroica (Reação). Uma vez por cena, quando sofre dano, o Avatar evita esse dano.
For 14, Des 14, Con 12, Int 10, Sab 6, Car 15
Perícias Acrobacia +32, Atletismo +32, Atuação +33, Diplomacia +33, Intuição +27.
Equipamento Valkaria costumava empregar como arma pessoal o Desbravador, um mangual mágico, descrito em detalhes na Jornada Heroica A Libertação de Valkaria. No entanto, esse poderoso artefato foi entregue como prêmio a seus Libertadores. Seu Avatar usa agora a Exploradora. Em suas mãos apenas, esta arma causa dano dobrado (já contabilizado). O Avatar de Valkaria também usa trajes mágicos com as mesmas propriedades de uma cota de malha fortificada guardiã que não reduz seu deslocamento e não tem penalidade de armadura. Tesouro Nenhum.`
        },
        {
          chave: "avatarDeWynna", nome: "Avatar de Wynna", nd: "S", tipo: "Espírito Médio",
          papel: '',
          deus: "Wynna", subgrupo: "Wynna, Deusa da Magia",
          resumo: "Wynna visita Arton com razoável frequência.",
          texto:
`Avatar de Wynna ND S
Wynna visita Arton com razoável frequência. Ela pode ser vista em cerimônias e eventos especiais na Academia Arcana, nas maiores cidades de Wynlla e também na capital Valkaria — onde tem seu próprio camarote na luxuriosa casa de espetáculos Canção das Deusas. A Deusa da Magia se manifesta como uma maga exuberante de cabelo esverdeado e olhos brilhantes de cores variadas, diferentes a cada vez que são observados. Muitas vezes era representada trajando fitas coloridas unidas por anéis metálicos, que adornam escassamente seu corpo, mas tem sido mais comum vê-la em vestidos elaborados.
Por sua vaidade, é raro que Wynna utilize outra aparência. Quando deseja passar despercebida, contudo, surge como uma bruxa em sua vassoura, um humano ilusionista gordo e bonachão, um jovem mago de chapéu pontudo ou outro conjurador arquetípico. Também houve vezes em que tomou emprestada a forma de Nielendorane de Lenórienn, arquimaga élfica lendária hoje residindo em seu reino divino.
Espírito Médio
Iniciativa +26, Percepção +24
Defesa 63, Fort +22, Ref +36, Von +30, imunidade a efeitos mentais e itens mundanos, maior que a morte, redução de dano 10, resistência a magia +5
Pontos de Vida 1.800
Deslocamento 9m (6q), voo 12m (8q)
Corpo a Corpo Belo Presente +54 (1d4+11).
✦ Carícia Mágica (Padrão) O Avatar de Wynna pode abençoar uma criatura em alcance curto. A criatura aprende e pode lançar uma magia qualquer de 1º círculo, à escolha do Avatar (atributo-chave escolhido pela criatura entre Inteligência e Carisma).
Centelha Divina O Avatar pode lançar qualquer magia como um conjurador de 20º nível sem gastar PM (CD 55, limite de PM 30).
Conjuração Tríplice (Completa) O Avatar lança três magias de escolas e círculos diferentes que tenham tempo de conjuração de uma ação padrão ou menor.
✦ Metamagia Suprema (Reação) Uma vez por rodada, quando uma magia é lançada a partir de um ponto em alcance longo, o Avatar pode alterar algumas de suas características. Ele pode mudar o tipo de dano da magia, pode escolher se o dano será letal ou não letal e pode mudar o tipo de teste de resistência dela.
✦ Sem Atalhos (Completa) O Avatar dissipa todos os itens mágicos permanentes em alcance curto. Para cada item dissipado dessa forma, seu portador aprende uma magia de 1º círculo, arcana ou divina, à escolha do Avatar (atributo-chave escolhido pelo portador entre Inteligência e Carisma).
✦ Visão da Magia O Avatar está sempre sob efeito de Visão Mística, com todos os aprimoramentos.
✦ Vivificar Magia (Reação) Uma vez por rodada, o Avatar pode anular uma magia lançada em alcance médio. No início do próximo turno do Avatar, essa magia se torna um capanga feitiço vivo que surge em um ponto à escolha do Avatar entre ele e a fonte da magia original. Um feitiço vivo tem Defesa 20, 1 PV, é imune a dano e falha automaticamente em qualquer teste de resistência ou oposto. O Avatar pode gastar uma ação de movimento para fazer todos os feitiços vivos andarem (eles têm deslocamento de voo 12m) ou para dissipá-los. Para cada feitiço vivo que se dissipa dessa forma, o Avatar lança a magia da qual o feitiço se originou (usando suas próprias características), tendo como ponto de origem o espaço onde o feitiço estava quando foi dissipado.
For 6, Des 8, Con 6, Int 15, Sab 6, Car 19
Perícias Atuação +37, Diplomacia +37, Misticismo +41.
Equipamento Belo Presente. Tesouro Nenhum.`
        },
      ],

      // Quadro de dados de cada divindade. O título é o mesmo do
      // `subgrupo` da ficha do avatar — é assim que a aba encaixa um
      // dentro do outro.
      regras: [
        { titulo: "Aharadak, Deus da Tormenta",
          texto:
`Outros Nomes. O Devorador; o Deus Rubro; o Lorde da Tormenta; o Redentor, entre alguns cultistas.
Áreas de Influência. Tormenta, devassidão, dor, loucura, fome, servidão, corrupção, evolução.
Símbolo Sagrado. Um olho macabro de pupila vertical e cercado de espinhos. Cultistas enlouquecidos podem usar quase qualquer objeto ou imagem repugnante como símbolo sagrado, incluindo partes de seus próprios corpos.
Canalizar Energia. Negativa.
Arma Preferida. Corrente de espinhos.
Cores Significativas. Vermelho.
Lema. “Tudo é lefeu.”` },
        { titulo: "Allihanna, Deusa da Natureza",
          texto:
`Outros Nomes. Allihannantala, entre os elfos; Oghalla, entre os minotauros; Grande Nagah, entre as nagahs; Dama Altiva, entre os moreau; Divina Serpente, entre as voracis; Xalakam, entre os anões; Mãe Natureza ou apenas Deusa, entre os druidas; Deus Macaco, Grande Leão, Urso Dourado, Mãe Águia e centenas de outros, entre bárbaros e tribos variadas.
Áreas de Influência. Natureza, animais, plantas, povos bárbaros, terra.
Símbolo Sagrado. Para druidas, uma pequena árvore; para bárbaros e outros adoradores de animais, corresponde à imagem do respectivo animal.
Canalizar Energia. Positiva.
Arma Preferida. Bordão.
Cores Significativas. Verde-folha, verde-musgo, marrom.
Lema. “O caminho da natureza leva à pureza primordial.”` },
        { titulo: "Arsenal, Deus da Guerra",
          texto:
`Outros Nomes. Mestre Arsenal; Senhor da Guerra; Mestre das Armas, durante sua jornada através dos reinos dos deuses; Cavaleiro de Máquina, em seu mundo natal.
Áreas de Influência. Guerra, estratégia, armas, vitória.
Símbolo Sagrado. Duas armas cruzadas: o Martelo dos Trovões e a espada Holy Avenger.
Canalizar Energia. Qualquer.
Arma Preferida. Martelo de guerra.
Cores Significativas. Púrpura, verde escuro.
Lema. “SE NÃO EXISTE MEIO DE VENCER, CRIE UM MEIO.”` },
        { titulo: "Azgher, Deus-Sol",
          texto:
`Outros Nomes. Deus do Sol; o Vigilante; Aquele-que-Tudo-Vê; Bhastall, entre os elfos; Tuvath, entre os qareen; Mirann, entre os hynne; Seolloes, entre os minotauros; Astar, o Sorridente, entre as fadas; Berzul, entre os anões.
Áreas de Influência. Dia, vigilância, proteção, deserto, bom tempo, fogo, luz.
Símbolo Sagrado. Um sol dourado.
Canalizar Energia. Positiva.
Arma Preferida. Cimitarra.
Cores Significativas. Branco, dourado.
Lema. “Todo ouro veio de Azgher, todo ouro deve retornar a Azgher.”` },
        { titulo: "Hyninn, Deus da Trapaça",
          texto:
`Outros Nomes. Deus da Trapaça e dos Ladrões; Mith-Allinnor, entre os anões; Quindallas, entre os elfos; o Brincalhão, entre os hynne e as fadas; Wang-Ho, entre os tamuranianos.
Áreas de Influência. Ladrões, armadilhas, mentira, ilusão, hynne, disfarces, furtividade, esperteza, crime, masmorras.
Símbolo Sagrado. Uma adaga atravessando uma máscara, ou uma raposa.
Canalizar Energia. Qualquer.
Arma Preferida. Adaga.
Cores Significativas. Vermelho, cinza, preto.
Lema. “Hyninn? Nunca ouvi falar.”` },
        { titulo: "Kallyadranoch, Deus dos Dragões",
          texto:
`Outros Nomes. Deus dos Dragões e do Poder; Deus dos Magos; Dragão Tirano; o Terceiro; Kally, corruptela entre não devotos; Lathsidhien, o Arcano Opressor, entre os elfos; Efreetarhd, entre os qareen; Korka-Dum, entre os anões.
Áreas de Influência. Tirania, magia, dragões.
Símbolo Sagrado. A figura de um dragão, ou escamas de cinco cores.
Canalizar Energia. Negativa.
Arma Preferida. Lança.
Cores Significativas. vermelho, verde, azul, branco, preto.
Lema. “Você pode servir a Kallyadranoch como servo ou iguaria. Será a última escolha de sua vida.”` },
        { titulo: "Khalmyr, Deus da Justiça",
          texto:
`Outros Nomes. Deus da Ordem; Hedryl, em Lamnor; Dhayanor, entre os minotauros; Heredrimm, entre os anões; o Juiz Supremo.
Áreas de Influência. Justiça, ordem, guerra justa, lei, paladinos, anões, luz, defesa, cavalaria, altruísmo, heroísmo, simetria.
Símbolo Sagrado. Espada sobreposta a uma balança.
Canalizar Energia. Positiva.
Arma Preferida. Espada longa.
Cores Significativas. Azul, branco, cinza.
Lema. “Justiça seja feita.”` },
        { titulo: "Lena, Deusa da Vida",
          texto:
`Outros Nomes. Deusa da Cura; Deusa da Fertilidade; Deusa Criança; Deusa Mãe; Luna ou Lunarianna, na antiga Lamnor; Nanateallah, entre os elfos; Duenna, entre os hynne; Oghana, entre os anões; Ooniemma, entre os suraggel.
Áreas de Influência. Vida, cura, fertilidade, luz, mulheres, pessoas grávidas.
Símbolo Sagrado. Lua crescente prateada.
Canalizar Energia. Positiva.
Arma Preferida. Nenhuma.
Cores Significativas. Verde, amarelo, branco.
Lema. “Antes perder a própria vida que tomá-la de alguém.”` },
        { titulo: "Lin-Wu, Deus da Honra",
          texto:
`Outros Nomes. Deus da Honra e de Tamu-ra; Deus Dragão; Deus Samurai; Samurai de Sangue; o Mais Honrado; Portador da Honra; Espadachim Trovejante.
Áreas de Influência. Honra, dignidade, honestidade, nobreza, Tamu-ra.
Símbolo Sagrado. Um dragão celestial.
Canalizar Energia. Qualquer.
Arma Preferida. Katana.
Cores Significativas. Vermelho, verde, dourado.
Lema. “A honra é mais valiosa que a vida. Antes perder a vida que perder a honra.”` },
        { titulo: "Marah, Deusa da Paz e do Amor",
          texto:
`Outros Nomes. Deusa da Paz; a Dama Branca; a Donzela Deslumbrante; o Deleite do Panteão; Lyon-na, entre os elfos; Haya, entre as fadas; Verticordia, entre os minotauros; Kijah, entre os anões.
Áreas de Influência. Paz, amor, paixão, alegria, festas, beleza.
Símbolo Sagrado. Uma pena sobre um coração.
Canalizar Energia. Positiva.
Arma Preferida. Nenhuma.
Cores Significativas. Branco.
Lema. “A paz deve ser celebrada com alegria e amor, não com solenidade!”` },
        { titulo: "Megalokk, Deus dos Monstros",
          texto:
`Outros Nomes. Fin-Horak, entre os dragões; o Destruidor, entre os centauros; Typhon, entre as nagahs; Sugora, entre os tamuranianos; o Indomável, entre os moreau; Makalax, entre os anões; Troldhaugen, entre os finntroll; Monstro-Pai, entre quase todos os monstros.
Áreas de Influência. Monstros, morte, fúria, destruição.
Símbolo Sagrado. Figura de uma garra ou monstro.
Canalizar Energia. Negativa.
Arma Preferida. Maça.
Cores Significativas. Nenhuma.
Lema. “Humanos, elfos, anões... Todos devem morrer.”` },
        { titulo: "Nimb, Deus do Caos",
          texto:
`Outros Nomes. Deus do Caos, da Sorte e do Azar; Provedor da Sorte; Sábio Insano; o Instável; Agente da Mudança; Jajax, entre os anões.
Áreas de Influência. Caos, sorte, azar, loucura, coragem, destino, mudanças.
Símbolo Sagrado. Um dado de seis faces, com símbolos imprevisíveis em cada uma.
Canalizar Energia. Qualquer.
Arma Preferida. Nenhuma e todas; sua arma muda constantemente, adaptando-se ao momento, ou não.
Cores Significativas. Preto, branco, vermelho. púrpura.
Lema. “Khalmyr tem o tabuleiro, mas quem move as peças é Nimb.”` },
        { titulo: "Oceano, Deus dos Mares",
          texto:
`Outros Nomes. Grande Oceano; Ronn-Tirk, entre os elfos terrestres; Capitão Jor, entre os marinheiros; Midrinn, entre os anões.
Áreas de Influência. Mares, criaturas marinhas, marinheiros, água, tempestades.
Símbolo Sagrado. Uma concha.
Canalizar Energia. Qualquer.
Arma Preferida. Tridente.
Cores Significativas. Azulmarinho, verde-água.
Lema. “Somente vivendo em comunhão com o Oceano podemos receber a graça divina.”` },
        { titulo: "Sszzaas, Deus da Traição",
          texto:
`Outros Nomes. Deus da Traição, do Mistério e do Conhecimento Oculto; o Senhor dos Segredos; o Mestre dos Mistérios; o Deus Serpente; o Corruptor; Khassir-Thalier, entre os elfos; Lacertos, entre as nagahs; o Vizir Negro, entre os sar-allan; Zhariesk, entre os dragões; Sargos, entre os anões.
Áreas de Influência. Conhecimento proibido, segredos, manipulação, traição, veneno, serpentes.
Símbolo Sagrado. Uma naja vertendo veneno pelas presas.
Canalizar Energia. Negativa.
Arma Preferida. Adaga.
Cores Significativas. Verde, preto, cinza, marrom, vermelho.
Lema. “Seu segredo está seguro comigo.”` },
        { titulo: "Tanna-Toh, Deusa do Conhecimento",
          texto:
`Outros Nomes. Mãe da Palavra; Guardiã da Mente; Mestra do Saber; Patrona do Pensar; Gilmek, entre os anões.
Áreas de Influência. Verdade, descobertas, escrita, artes, investigação, ensino, bardos, povos civilizados, cultura, ciência, livros, progresso.
Símbolo Sagrado. Rolo de pergaminho e pena.
Canalizar Energia. Qualquer.
Arma Preferida. Bordão.
Cores Significativas. Branco, amarelo, cinza claro.
Lema. “Nenhum conhecimento é proibido. Pergunte o que quiser.”` },
        { titulo: "Tenebra, Deusa das Trevas",
          texto:
`Outros Nomes. Deusa das Trevas e dos Mortos-Vivos; Lulna, entre os minotauros; Luah-Kai, entre os trogloditas; Ayrelynn, entre os anões; Mãe Noite, entre os mortos-vivos.
Áreas de Influência. Noite, anões, mortos-vivos, licantropos, desobediência, criaturas noturnas ou subterrâneas, necromantes, tentação, trevas, pólvora.
Símbolo Sagrado. Estrela de cinco pontas.
Canalizar Energia. Negativa.
Arma Preferida. Adaga.
Cores Significativas. Preto, roxo, azul escuro.
Lema. “Algo tão belo quanto a noite não pode ser maligno.”` },
        { titulo: "Thwor, Deus dos Goblinoides",
          texto:
`Outros Nomes. Thwor Khoshkothruk; Thwor Ironfist, entre os povos do norte; o Ayrrak.
Áreas de Influência. Duyshidakk, liberdade, guerra, vida, morte, anarquia, eclipses, lealdade, mudança, destino, superação, vingança, Akzath.
Símbolo Sagrado. Um grande punho fechado.
Canalizar Energia. Qualquer.
Arma Preferida. Machado de guerra.
Cores Significativas. Verde, vermelho, marrom, negro.
Lema. “O Mundo Como Deve Ser.”` },
        { titulo: "Thyatis, Deus da Ressurreição e da Profecia",
          texto:
`Outros Nomes. Deus da Ressurreição, da Profecia e das Segundas Chances; Thyatis não é conhecido por outros nomes.
Áreas de Influência. Ressurreição, profecia, segundas chances, redenção, aventureiros, coragem, fogo.
Símbolo Sagrado. Uma ave fênix.
Canalizar Energia. Positiva.
Arma Preferida. Espada longa.
Cores Significativas. Laranja, ouro, amarelo.
Lema. “Todos merecem uma segunda chance.”` },
        { titulo: "Valkaria, Deusa da Aventura",
          texto:
`Outros Nomes. Deusa da Humanidade, da Ambição e da Aventura; Deusa da Ambição; Mãe da Humanidade.
Áreas de Influência. Humanos, ambição, ousadia, evolução, conquista, aventuras.
Símbolo Sagrado. A Estátua de Valkaria, ou seis faixas entrelaçadas.
Canalizar Energia. Positiva.
Arma Preferida. Mangual.
Cores Significativas. Vermelho, púrpura.
Lema. “Valkaria não criou os humanos para se ajoelharem perante os deuses. Ela os criou para superá-los.”` },
        { titulo: "Wynna, Deusa da Magia",
          texto:
`Outros Nomes. Dallia, entre os elfos.
Áreas de Influência. Magia, arcanistas, gênios.
Símbolo Sagrado. Anel metálico, com ou sem runas.
Canalizar Energia. Qualquer.
Arma Preferida. Adaga.
Cores Significativas. Cinza, ou as seis cores da magia combinadas: verde azulado, vermelho, azul, verde, branco, preto.
Lema. “A magia é mais preciosa que a vida. Como tal, não deve ser negada a ninguém.”` },
        { titulo: "Outras Armas do Avatar",
          texto:
`Nem sempre o avatar do Deus da Justiça decide usar sua arma mais poderosa, o artefato Rhumnam (veja p. 248), guardando-a apenas para os julgamentos mais severos. Em outras ocasiões, o avatar pode ser visto portando uma montante mágica. Para representar isso, use as mesmas estatísticas de combate corpo a corpo do avatar, mas sem o ataque à distância e os efeitos de Rhumnam.` },
      ],
    },

  ],

  // Artefatos que os avatares empunham, descritos em quadro ao lado
  // da ficha. Todos são exclusivos do avatar em questão.
  itens: [
    { chave: "arsenalDeArsenal", nome: "Arsenal de Arsenal", meta: "Equipamento do Avatar de Arsenal",
      texto:
`Armadura de Arsenal. Esta é uma armadura completa de adamante guardiã invulnerável protetora capaz de assimilar até três itens mágicos vestidos. Itens armazenados dessa forma fornecem seus benefícios normalmente, não podem ser desarmados e não contam no limite de itens vestidos do personagem. Artefato.
Martelo dos Trovões. Esta poderosa arma é um martelo de guerra cruel pungente magnífico elétrico de arremesso. Se acertar um ataque de arremesso com este martelo, além de causar dano você empurra o alvo 4,5m na direção oposta. Artefato.` },
    { chave: "asArmasDoSol", nome: "As Armas do Sol", meta: "Equipamento do Avatar de Azgher",
      texto:
`Labareda. A arma principal do Avatar de Azgher é uma cimitarra atroz precisa ameaçadora anticriatura (morto-vivo) magnífica que causa +6d6 pontos de dano de fogo. Artefato.
Mensageiro do Deserto. Este arco curto magnífico veloz causa 6d6 pontos de dano de fogo a todas as criaturas a até 6m do alvo. Artefato.
Raio de Sol. Uma lança de arremesso energética magnífica que causa +2d12 pontos de dano de luz e deixa o alvo ofuscado. Artefato.` },
    { chave: "falsoAmigo", nome: "Falso Amigo", meta: "Equipamento do Avatar de Hyninn",
      texto:
`A arma preferida de Hyninn, Falso Amigo é uma adaga formidável assassina de arremesso. Você recebe a habilidade Assassinar, do ladino, mas só pode usá-la com esta arma. Se já a possui, em vez disso o custo para usá-la com esta arma diminui em –1 PM. Além disso, enquanto estiver empunhando esta arma, você pode fazer um ataque furtivo adicional por rodada. Artefato.` },
    { chave: "kaminari", nome: "Kaminari", meta: "Equipamento do Avatar de Lin-Wu",
      texto:
`A espada do Deus da Honra é uma katana precisa pungente trovejante veloz. Apenas devotos de Lin-Wu ou criaturas que obedeçam a algum código de conduta (como Código de Honra ou similares) podem utilizar esta espada; nas mãos de qualquer outra pessoa, ela se torna uma katana sem habilidades que impõe –2 em testes de ataque e rolagens de dano. Enquanto empunhar Kaminari, você pode gastar uma ação completa e 5 PM para atacar todas as criaturas em um cone de 30m. Você faz um único ataque e compara o resultado com a Defesa de todas as criaturas na área. Então faz uma única rolagem de dano e aplica-a em cada inimigo atingido. Caso o ataque seja um acerto crítico, você pode gastar 5 PM para usar essa habilidade uma segunda vez. Se uma criatura chegar a 0 PV ou menos por um golpe desta arma, ela é fulminada por eletricidade e completamente destruída. Artefato.` },
    { chave: "veuDoDesejo", nome: "Véu do Desejo", meta: "Equipamento do Avatar de Marah",
      texto:
`Este manto branco de tecido leve concede +5 em Atuação, em testes de resistência e na CD para resistir a suas habilidades, e fornece redução de dano 10. Artefato.` },
    { chave: "denteDoLeviata", nome: "Dente do Leviatã", meta: "Equipamento do Avatar do Oceano",
      texto:
`Este tridente aumentado atroz equilibrado pungente de arremesso trovejante veloz é feito de uma única presa de uma criatura marinha desconhecida. Decorado com símbolos oceânicos, esta poderosa arma ignora 30 pontos da redução de dano de seus alvos. Além disso, quando faz um acerto crítico, seu dano aumenta dois passos (antes de ser multiplicado). Além disso, se empunhar o Dente do Leviatã em alto mar, você pode lançar as magias Controlar Água (apenas para água salgada), Controlar o Clima e Fúria do Panteão (atributo-chave Sabedoria). Artefato.` },
    { chave: "inoculadora", nome: "Inoculadora", meta: "Equipamento do Avatar de Sszzaas",
      texto:
`O Avatar de Sszzaass geralmente empunha a Inoculadora, a arma mágica do próprio Sszzaas. Esta arma de lâmina completamente negra é uma adaga precisa assassina magnífica venenosa. A lâmina está sempre carregada com uma dose de qualquer veneno conhecido pelo portador. Ele pode trocar esse veneno por outro conhecido com uma ação de movimento. Artefato.` },
    { chave: "robeProfessoral", nome: "Robe Professoral", meta: "Equipamento do Avatar de Tanna-Toh",
      texto:
`Este robe de aparência comum e desgastada fornece +10 na Defesa, +5 em testes de resistência e redução de dano 10. Artefato.` },
    { chave: "exploradora", nome: "Exploradora", meta: "Equipamento do Avatar de Valkaria",
      texto:
`A espada empregada pelo Avatar de Valkaria é uma arma poderosa que, assim como a própria deusa, desafia os limites do possível. Ela é uma espada longa ameaçadora defensora lancinante magnífica precisa veloz. Artefato.` },
    { chave: "beloPresente", nome: "Belo Presente", meta: "Equipamento do Avatar de Wynna",
      texto:
`A adaga empregada pelo Avatar de Wynna é mais um símbolo — e um poderoso amplificador mágico — do que uma arma. Ela conta como um orbe cristalino e uma varinha arcana, e permite que você sustente até três magias ao mesmo tempo. Além disso, ela armazena 20 PM (que são totalmente recuperados ao amanhecer) que podem ser usados apenas para sustentar habilidades mágicas. Artefato.` },
  ],
};
