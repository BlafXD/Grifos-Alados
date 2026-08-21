// ════════════════════════════════════════════════════════════════════
//  DEUSES-ARTIGOS-DATA.JS — os verbetes dos vinte Deuses Maiores
//  Localização: /grifos-alados/js/deuses-artigos-data.js
//
//  ⚠ ARQUIVO GERADO por "Inútil/_gerar-deuses-arton.js" a partir de
//    "Inútil/Regras.txt". Dá para editar à mão — mas rodar o gerador
//    de novo sobrescreve tudo.
//
//  O TEXTO do livro sobre cada divindade: abertura, motivações,
//  relações, igreja e clero, e como o avatar se manifesta — mais o
//  quadro de dados (símbolo sagrado, arma preferida, canalização,
//  lema). Quem desenha isso é o js/deuses.js, na sub-aba ⛩ Deuses de
//  Arton da aba 📚 Consultas.
//
//  Aqui NÃO tem ficha nenhuma: os statblocks dos avatares moram em
//  js/deuses-arton-data.js, que só o index.html carrega. Este arquivo
//  é lore e entra nas DUAS edições — é o que um clérigo precisa saber
//  do próprio deus.
//
//  Campos de cada verbete:
//    chave    — id estável
//    nome     — o nome do deus ("Aharadak")
//    epiteto  — como o livro o chama ("Deus da Tormenta")
//    dados    — o quadro de dados, uma linha por campo
//    abertura — o texto que abre o verbete, antes da primeira seção
//    secoes   — [{ titulo, texto }] na ordem do livro; parágrafos
//               separados por linha em branco
//    nd/ficha — o ND do avatar e a chave da ficha dele em
//               js/deuses-arton-data.js (só o mestre tem a ficha)
//
//  ⚠ O livro não marca onde um parágrafo acaba: o gerador deduz pela
//  linha curta no fim da coluna. Uma quebra ou outra pode sair no
//  lugar errado — nenhuma palavra se perde, só a divisão é palpite.
// ════════════════════════════════════════════════════════════════════
window.DEUSES_ARTON_ARTIGOS = {

  livro: 'Deuses de Arton — v1.1',
  fonte: 'Deuses Maiores',

  deuses: [
    {
      chave: "aharadak", nome: "Aharadak", epiteto: "Deus da Tormenta",
      nd: "S", ficha: "avatarDeAharadak",
      dados:
`Outros Nomes. O Devorador; o Deus Rubro; o Lorde da Tormenta; o Redentor, entre alguns cultistas.
Áreas de Influência. Tormenta, devassidão, dor, loucura, fome, servidão, corrupção, evolução.
Símbolo Sagrado. Um olho macabro de pupila vertical e cercado de espinhos. Cultistas enlouquecidos podem usar quase qualquer objeto ou imagem repugnante como símbolo sagrado, incluindo partes de seus próprios corpos.
Canalizar Energia. Negativa.
Arma Preferida. Corrente de espinhos.
Cores Significativas. Vermelho.
Lema. “Tudo é lefeu.”`,
      abertura:
`Quando a Tormenta se abateu sobre Arton, os mais otimistas pensaram que se tratasse de um fenômeno isolado. Quando uma nova área de Tormenta se formou em Trebuck, os artonianos souberam que a Tempestade Rubra iria perdurar. Logo depois a revelação do primeiro Lorde da Tormenta, Gatzvalith, foi a prova de que era uma invasão de criaturas inteligentes e aberrantes. Ainda assim, os mais otimistas tinham algum conforto: Gatzvalith era poderoso, mas não era um deus. Havia cultistas da Tormenta, mas não recebiam poderes divinos.

Então surgiu a área de Tormenta de Zakharov e seu Lorde: Aharadak, o Devorador.

Aharadak foi descoberto pelo grupo de heróis conhecido como Companhia Rubra. Diferente de outros lefeu, convidava os artonianos a conhecê-lo. Quanto mais fundo a Companhia Rubra se embrenhou na nova área de Tormenta, mais encontrou sinais de culto a Aharadak, culminando em um templo inteiro, onde uma congregação de fiéis liderados por lefeu praticava cerimônias devassas. No fim da incursão, os heróis testemunharam o Reino de Glórienn, a antiga Deusa dos Elfos, corrompido pela Tormenta.

Mas ainda restava aos artonianos o conforto de que Aharadak era apenas um deus menor. Seguramente, mais cedo ou mais tarde, o Panteão iria se erguer para proteger Arton... Certo?

O impensável aconteceu quando Tauron, o antigo Deus da Força, desceu a Arton para impedir que a Tormenta tomasse o Reino dos Minotauros, morrendo em combate. Com isso, o antigo Deus Menor da Tormenta ascendeu.

Aharadak passou a fazer parte do Panteão.

Não há mais espaço para otimismo. Agora há um Deus da Tormenta dividindo espaço com os demais deuses maiores. A Tempestade Rubra é parte intrínseca de Arton, trazendo consigo sua corrupção, sua loucura, sua depravação. Apenas os artonianos mais inocentes ou tolos têm qualquer esperança de banir a Tormenta. Quase todos aceitam que, com Aharadak no Panteão, tudo que se pode fazer é retardar seu avanço, coibir seu culto. Aproveitar o tempo que ainda nos resta, enquanto ainda existe Arton, ainda existe morte e vida, animais e monstros, passado e futuro, natureza e civilização. Em breve, dizem os devotos de Aharadak, não haverá nada disso. Tudo será tomado pela Tormenta. Tudo será lefeu.

Mas Aharadak ainda não é um dos membros mais poderosos do Panteão.

Nunca contará com mais devotos que a Deusa da Humanidade, o Deus do Caos ou o Deus da Justiça. Nunca ascenderá à liderança do Panteão. A Tormenta nunca será o aspecto mais importante de toda a Criação.

Certo...?`,
      secoes: [
        { titulo: "Motivações", texto:
`Aharadak é, antes de mais nada, lefeu. Os Lordes da Tormenta mantêm alguma individualidade, têm suas próprias personalidades, seus próprios objetivos, podem até mesmo competir entre si. Contudo, ainda enxergam tudo que não é lefeu como profano, repugnante e odioso. Aharadak preza, acima de tudo, o domínio total de tudo que existe, a transformação de Arton na Anticriação.

Diferente de outros deuses, que buscam ser cultuados como um meio para um fim mais importante, o culto ao Deus da Tormenta é um fim em si mesmo. Cultuando Aharadak, os artonianos aos poucos se transformam em versões dos lefeu: suas mentes são erodidas, suas almas são corrompidas, seus corpos são distorcidos.

Nada agrada mais a Aharadak do que ver um artoniano abrindo mão do que é. Sempre que um indivíduo único perde um pouco de si mesmo para abraçar a Tormenta, Aharadak se alegra. O culto ao Devorador sobrepuja, avassala e por fim destrói todos os outros aspectos da vida.

A presença de Aharadak como um lefeu aparentemente “único” levou alguns artonianos a achar que é possível negociar com o Devorador. Que ele possui outro lado. Que, não fazendo parte da Criação, não pode realmente ser considerado maligno. Contudo, isso não passa de ilusão. Aharadak consegue compreender a diferença entre um de seus cultistas e um objeto como uma pedra — mas apenas porque isso o ajuda a corromper Arton. O Deus da Tormenta não tem empatia por nenhum artoniano, não vê valor em nada que não seja lefeu.

As motivações de Aharadak, assim, são ao mesmo tempo simples e incompreensíveis. Ele deseja acabar com a realidade que os artonianos conhecem. Tudo que pareça minimamente familiar para qualquer não lefeu é anátema para Aharadak. Cultuá-lo é trair a Criação, devotar-se a um senhor que não admite nada que não seja igual a ele mesmo. O mais sanguinário e depravado cultista da Tormenta ainda é um iniciante aos olhos de Aharadak — tão patético quanto repulsivo. Em contrapartida, o mais reles pedaço de matéria vermelha é algo belo, perfeito e exaltado, mais importante que qualquer deus.` },
        { titulo: "Relações", texto:
`A única fagulha de “otimismo” que ainda não se provou falsa é: embora a Tormenta esteja corrompendo e modificando Arton, Arton também está modificando a Tormenta. Alguns afirmam que Aharadak está se tornando mais artoniano e, assim, transformando-se em algo que pode ser combatido. Ou até mesmo tolerado.

Allihanna e Oceano são seus maiores inimigos, representando a forma mais óbvia de oposição à Tormenta. Aharadak já aprendeu a diferença entre natureza e objetos artificiais, então compreende a razão de ser detestado por essas divindades. Da mesma forma, sabe que deuses heroicos como Khalmyr, Azgher e Thyatis o veem como um vilão supremo, e entende que Lena o considera uma ameaça à Vida.

Existem deuses que, involuntariamente, acabam “próximos” de Aharadak. Devotos loucos de Nimb já encontraram sentido e certa lógica nas arengas dos cultistas do Devorador. Marah não se opõe diretamente a Aharadak — afinal, quando tudo for lefeu, haverá paz absoluta.

Mais assustadora é a relação entre Aharadak e Valkaria. Quase ninguém sabe como a Tormenta foi criada, mas um dos traços mais importantes dos lefeu (a necessidade de evolução) é herdado da Deusa da Humanidade. Assim, seus objetivos podem coincidir, e alguns devotos de Valkaria já começaram a enxergar a Tormenta como mais uma ferramenta de superação.` },
        { titulo: "Igreja e Clero", texto:
`De início, a igreja de Aharadak era espalhada em pequenas células sem muita comunicação entre si. Contudo, desde a ascensão do Devorador, em poucos anos seu culto ganhou grandes proporções e possui até mesmo um sumo-sacerdote notório em todo o continente.

O culto ainda é proibido na maior parte dos reinos — principalmente aqueles que tiveram contato direto com a Tormenta, como Bielefeld ou os Feudos de Trebuck. No entanto, a destruição da área de Tormenta de Zakharov e “abertura” da cidade Ahar’kadhan vem levando a uma percepção de que esta religião pode não ser de todo maligna e deveria talvez ser até mesmo permitida no Reinado.

Seja como for, células de cultistas de Aharadak estão entre os mais perigosos e cruéis adversários que qualquer grupo de aventureiros pode enfrentar. Até mesmo bandos malignos ou amorais ficam pasmos com o nível de depravação que existe em congregações medianas do Devorador. Esses fanáticos ferem a si mesmos, realizam sacrifícios com regularidade, corrompem e distorcem a própria realidade a seu redor. De fato, um sinal da presença de fiéis do Devorador pode ser anomalias com o tempo e o espaço. O culto a Aharadak pode surgir em qualquer lugar, da maior metrópole à aldeia mais pacata, e invariavelmente traz consigo sofrimento terrível.

Existem devotos de Aharadak que não são malignos, e que pregam a coexistência entre as duas realidades. Eles mantêm seus poderes, o que teoricamente sugere que Aharadak os aprova... Mas quanto dessa aprovação é genuína, e quanto é apenas um estratagema de corrupção?` },
        { titulo: "Avatar", texto:
`O avatar mais comum de Aharadak é uma monstruosidade do tamanho de um castelo, coberta de carapaça, pedaços de carne esponjosa e bocarras cheias de dentes afiados. Em meio a esse caos, um único e imenso olho vermelho.

No entanto, correm boatos de que Aharadak possui outros avatares — um guerreiro trajado em couraça vermelha, um feiticeiro sem rosto, uma barda com a boca costurada. Também já teria assumido formas inofensivas, até mesmo nascido em uma família humana humilde, crescendo como uma criança-prodígio da degradação. Nenhuma tática é perversa demais para o Devorador.` },
      ],
    },
    {
      chave: "allihanna", nome: "Allihanna", epiteto: "Deusa da Natureza",
      nd: "20", ficha: "avatarDeAllihanna",
      dados:
`Outros Nomes. Allihannantala, entre os elfos; Oghalla, entre os minotauros; Grande Nagah, entre as nagahs; Dama Altiva, entre os moreau; Divina Serpente, entre as voracis; Xalakam, entre os anões; Mãe Natureza ou apenas Deusa, entre os druidas; Deus Macaco, Grande Leão, Urso Dourado, Mãe Águia e centenas de outros, entre bárbaros e tribos variadas.
Áreas de Influência. Natureza, animais, plantas, povos bárbaros, terra.
Símbolo Sagrado. Para druidas, uma pequena árvore; para bárbaros e outros adoradores de animais, corresponde à imagem do respectivo animal.
Canalizar Energia. Positiva.
Arma Preferida. Bordão.
Cores Significativas. Verde-folha, verde-musgo, marrom.
Lema. “O caminho da natureza leva à pureza primordial.”`,
      abertura:
`Neste mundo de vastidões inexploradas e ermos indomados, quase totalmente tomado por vida natural exceto em focos de civilização, alguns podem considerar estranha a ideia de “proteger a natureza”. Como se florestas ancestrais recobrindo continentes ou manadas infindáveis cruzando planícies precisassem de campeões para defendê-las. Infelizmente essa necessidade é antiga, sendo agora mais urgente que nunca.

Allihanna é a deusa que governa toda a vida selvagem de Arton. Alguns, erroneamente, acreditam que isso inclui todas as criaturas não humanoides, todas as plantas e animais — mas não. Monstros, mortos-vivos, construtos e outros seres anômalos pertencem a divindades diferentes. Existe contestação mesmo entre devotos de Allihanna e Oceano sobre quem governa o que vive sob as ondas. E quanto a bestas primevas como os lagartos-trovão de Galrasia? Não deviam pertencer a Megalokk? Enquanto acadêmicos debatem, para muitos devotos esse mistério é sagrado, as respostas pertencem apenas à própria deusa — cabendo-lhes apenas ouvir seu desejo e fazê-lo prevalecer.

De forma similar, muitos acreditam não existir bondade ou maldade na natureza. Animais e plantas, livres de qualquer moral ou ética, não estariam sujeitos a tais dilemas; simplesmente fazem o que precisam para sobreviver e se perpetuar. Isso pode conter alguma verdade — mas, no Plano divino, a diferença é muito clara. Allihanna é abundância, generosidade e compaixão, enquanto Megalokk é crueldade, fúria e violência. Aqueles com maior afinidade por um lado ou outro acabam escolhendo suas devoções.

Em sua forma mais pura, Allihanna é venerada por clérigos (mais conhecidos como xamãs) e druidas. Bárbaros também honram suas várias faces, escolhendo um animal totêmico para receber seu poder selvagem. Assim, tanto o culto da Divina Serpente das voracis quanto o culto do Urso Dourado das Montanhas Sanguinárias reverenciam a mesma divindade, assim como centenas de outros.

Por muito tempo especulou-se que o culto a Allihanna teria sido introduzido pelos elfos (seu nome élfico seria Allihannantala). No entanto, estudos comprovam que a adoração à Deusa da Natureza começou entre os primeiros grupos humanoides, possivelmente tornando esta a igreja mais antiga de Arton. Quase todos os habitantes do continente respeitam um ou mais aspectos de Allihanna, mesmo que não conheçam seu verdadeiro nome. Até goblinoides mostram certa reverência, tornando-se seus druidas e xamãs. Existe relação profunda entre Allihanna e as fadas — seres mágicos fortemente conectados a florestas, águas, montanhas e outros ambientes naturais. Dizem que sua inocência, suas emoções inconstantes e seu desapego a regras representam o lado mais descontraído da deusa.`,
      secoes: [
        { titulo: "Motivações", texto:
`Allihanna é gentil e dadivosa, provendo Arton com seus frutos abundantes. Mas a deusa também pode ser irascível e feroz quando suas crias são hostilizadas ou quando sua generosidade é alvo de abusos.

O mundo natural sempre esteve em guerra.

Natureza contra abominação, animais contra monstros. As crias de Megalokk, existindo apenas para destruir, impediram por milênios o surgimento de um mundo aceitável para outros seres. Khalmyr e os demais deuses se aliaram à Mãe Natureza para dar fim a esse suplício, os beemotes foram contidos — Arton não seria mais um inferno de monstros. A bondade de Allihanna então prevaleceu, estendendo aos povos dos deuses a fartura do mundo natural. O Deus dos Monstros ainda luta contra o cativeiro imposto, sua prole ainda irrompe em fúria ocasional. Quando tais tragédias acontecem, os campeões de Allihanna estão prontos em sua defesa.

A Mãe Natureza não é inimiga dos povos humanoides, seus avanços não a ameaçam; mesmo as maiores metrópoles são ainda tímidas, comparadas à vastidão natural.

Mas isso pode mudar.

O povo humano chamado darash destruiu toda a vida natural em seu mundo de origem, então migrou para Arton em busca de novas paragens, nos distantes Reinos de Moreania. Foram extintos pela fúria de Megalokk, mas deixaram grandes áreas envenenadas.

Hoje, Allihanna e seus druidas buscam harmonia entre os povos e a natureza, para que tal coisa nunca se repita.` },
        { titulo: "Relações", texto:
`Allihanna e Megalokk têm uma relação conturbada. Ambos buscam povoar Arton com suas criaturas, mas elas não podem coexistir — enquanto animais e plantas obedecem ao Grande Ciclo, monstros violam todas as suas regras, existindo apenas para destruir. Ainda assim, consideram-se irmã e irmão, unidos no objetivo de propagar suas proles. Antagonizam-se mas, em situações de crise, estão sempre prontos a amparar um ao outro. Diz-se que Megalokk certa vez levou um povo humano estrangeiro à extinção total, apenas por causarem sofrimento a Allihanna.

Allihanna entra em conflitos ocasionais com Tanna-Toh. A Deusa do Conhecimento por vezes despreza os modos dos seres bárbaros e “não civilizados”, promovendo missões para apregoar sua educação e cultura, alegando resgatá-los da barbárie e aprimorar seu modo de vida. A Mãe Natureza, em oposição, protege e preserva as tradições dos povos originais que a cultuam.

Os cultos de Allihanna e Oceano muito frequentemente se sobrepõem — alguns até acreditam se tratar de uma única divindade ou cultuam-nos em uma igreja unificada. Que diferença existe entre os seres naturais que vivem em terra e na água? O recente e suposto desaparecimento do Oceano apenas serve para reforçar essa teoria; ele nunca teria existido de fato, sendo apenas outra face de Allihanna entre centenas. O verdadeiro inimigo de Allihanna, o grande alvo de seu ultraje, é Aharadak. O Deus da Tormenta é agora parte do Panteão — ou seja, também é parte de Arton. Monstros podem ser terríveis, mas a corrupção aberrante é muito pior, um pesadelo para a vida natural. Onde a Tormenta toca, Arton deixa de existir, deixa de ser. A cada avanço da podridão rubra, a deusa sofre um pouco mais, morre um pouco mais. Por esse motivo, druidas e xamãs estão entre os mais ferrenhos defensores de Arton contra a invasão lefeu.` },
        { titulo: "Igreja e Clero", texto:
`Os distantes Reinos de Moreania são, talvez, as únicas nações onde Allihanna é reverenciada em templos ostentosos. Conhecida localmente como “a Dama Altiva”, faz parte de um panteão dualista juntamente com Megalokk, “o Indomável”, formando a Igreja dos Irmãos Selvagens. No mais antigo reino local, Luncaster, druidas e xamãs são as figuras de maior autoridade; a própria regente é uma arquidruida. No Reinado, embora existam cultos druídicos a Allihanna, templos suntuosos e igrejas são raros. Grandes cerimônias, congregações ou festivais são realizados em lugares sagrados de extrema beleza natural, às vezes adornados com monólitos dispostos em círculos. Devotos do mundo inteiro são convidados (às vezes convocados) a participar de tais eventos. Muitíssimo mais comuns são templos ou altares modestos em pequenas comunidades servidas por um xamã — que por vezes também atua como chefe. Essa forma de religião é praticada por humanos, elfos e outros grandes povos, mas também por humanoides que habitam aldeias remotas em menores números. Cultos a Allihanna são numerosos, com diferentes nomes, sendo raro qualquer deles ganhar algum destaque. Um caso especial são as Oqamm, ordem de druidisas dahllan responsável por erguer e manter Lysianassa, a única cidade em Galrasia. O objetivo desse culto, como outros, é promover harmonia entre os povos e o mundo natural — evitando abusos e profanações no Mundo Perdido, mas também protegendo esses visitantes contra seus perigos.` },
        { titulo: "Avatar", texto:
`Allihanna talvez seja a divindade mais variada em sua forma de avatar. Ainda que mais conhecida como uma fera quimérica de muitas cabeças (sua forma preferida quando espera entrar em combate), ela pode se manifestar como qualquer animal natural — sempre em versão maior e mais majestosa, embora também consiga passar despercebida como um espécime comum.

A deusa também costuma surgir como uma dama trajada em vestes rústicas, campestres, com cabeça de animal. Dizem que o tipo de animal é escolhido conforme seu estado de espírito: um cervo quando está tranquila, um búfalo ou leão quando zangada, um pássaro ou macaco quando curiosa e assim por diante. Também há relatos sobre Allihanna se manifestar como uma dríade ou um sátiro, principalmente ao lidar com aventureiros.

Em quase todos os casos, Allihanna prefere se comunicar através de uma linguagem especial sem palavras, usando apenas sons e cheiros da natureza.` },
      ],
    },
    {
      chave: "arsenal", nome: "Arsenal", epiteto: "Deus da Guerra",
      nd: "18", ficha: "avatarDeArsenal",
      dados:
`Outros Nomes. Mestre Arsenal; Senhor da Guerra; Mestre das Armas, durante sua jornada através dos reinos dos deuses; Cavaleiro de Máquina, em seu mundo natal.
Áreas de Influência. Guerra, estratégia, armas, vitória.
Símbolo Sagrado. Duas armas cruzadas: o Martelo dos Trovões e a espada Holy Avenger.
Canalizar Energia. Qualquer.
Arma Preferida. Martelo de guerra.
Cores Significativas. Púrpura, verde escuro.
Lema. “SE NÃO EXISTE MEIO DE VENCER, CRIE UM MEIO.”`,
      abertura:
`Entre os vinte deuses originais trazidos à existência pelo Nada e pelo Vazio, alguns caíram ou morreram. Outros ascenderam para tomar seus lugares, pois sempre deve haver vinte. O infame vilão conhecido como Mestre Arsenal foi o primeiro ser humano a realizar essa conquista.

Humano, mas nascido em outro mundo, talvez outro universo. Uma terra de ciência e magia estupendas, onde máquinas humanoides do tamanho de castelos lutavam batalhas titânicas. Nações bélicas se digladiavam, forjavam colossos mais e mais fortes — a guerra mecanizada era um modo de vida. Diz-se que, nesse mundo de guerreiros extremos, a habilidade de dominar armas e táticas eliminava lembranças frívolas, não necessárias à sobrevivência — como eventos felizes ou rostos de entes queridos. Por esse motivo, o próprio Arsenal teria pouquíssima memória de sua terra natal. Esse mundo de batalha acabaria dizimado por algum inimigo terrível, poderoso demais até para seus gigantes de aço. Na batalha decisiva contra esse adversário, o último cavaleiro de máquina se ergueu como único sobrevivente.

Ele então veio a Arton. Trazido por forças apocalípticas liberadas pela detonação da arma final... ou pela vontade de Keenn, o antigo Deus da Guerra. Acabou em Galrasia, ilha selvagem dos lagartos-trovão, acolhido por uma dríade. Ambos tiveram uma filha, a primeira meia-dríade — ou dahllan, como se chamariam — na história de Arton. Lisandra se tornaria, anos mais tarde, sumo-sacerdotisa de Allihanna. Mas isso é outra história.

O guerreiro estrangeiro mais tarde deixou Galrasia e rumou para o Reinado, fazendo fama como aventureiro mercenário. Ficou conhecido como Arsenal, pela habilidade misteriosa de conjurar armas em instantes — mais tarde, um poder também concedido aos seguidores de Keenn. De fato, Arsenal acabou se tornando devoto, então clérigo e por fim sumo-sacerdote do Deus da Guerra. Encontrou os restos do Kishinauros, seu colosso de batalha, jazendo nas Sanguinárias. Devotou os anos seguintes a pilhar armas e armaduras mágicas como peças para seus reparos, adotando então a alcunha Mestre Arsenal. Um dia, o gigante metálico esteve operacional outra vez e marchou contra os reinos, buscando mergulhar o mundo em guerra total. Acabou derrotado pelas forças do Reinado e por aventureiros. Como punição por esse fracasso, Arsenal perdeu o status de sumo-sacerdote. Mas o clérigo tinha outros planos. Tinha a Holy Avenger, espada mágica capaz de matar deuses, obtida graças a um pacto com Sszzaas. Para evitar seu roubo por aventureiros, manteve-a em segurança com Valkaria, a única divindade em quem confiava — mas a deusa, sendo quem é, exigiu uma provação antes de devolvê-la. Após anos de jornadas planares, o clérigo percorreu as vinte masmorras forjadas para testar os Libertadores de Valkaria no passado e duelou com a própria deusa. Com a reconquista da espada, rumou ao reino divino de Keenn, onde tomou parte no Torneio do Deus Guerreiro. Após uma série de duelos épicos, confrontou o próprio Keenn. Por fim, travando um embate cósmico, saiu vitorioso como o novo Deus da Guerra.`,
      secoes: [
        { titulo: "Motivações", texto:
`O antigo deus Keenn era considerado feroz, cruel e sanguinário, não muito diferente de Megalokk. Buscava guerra pela guerra, sem outros objetivos aparentes. Como sumo-sacerdote, por vezes frequentando sua Fortaleza da Fúria, Arsenal tentou mudá-lo, aconselhar caminhos mais sutis e estratégicos. Aprenderia, com o tempo, que deuses são incapazes de mudar: são eternos prisioneiros de suas naturezas.

Keenn era astuto e poderoso, mas limitado por sua selvageria. Arsenal, metódico, o considerava falho. Incapaz de proteger Arton contra o inimigo secreto que, sabia ele, espreita nos recônditos da existência. Tomou então a decisão de abater e substituir seu patrono. Ser um Deus da Guerra melhor Enquanto mortal, Arsenal viveu longos anos como aventureiro, integrando grupos variados. Atuou ao lado de Leon Galtran, Vladislav Tpish e o próprio Paladino de Jallar. Mais tarde, após reunir fortuna considerável, passou a pilhar tesouros mágicos para os reparos do Kishinauros — levando a confrontos com heróis, para tomar seus itens ou evitar que os seus próprios fossem roubados. Tornou-se um vilão literal, matando e pilhando por cobiça e ganância puras... ou assim parecia. Por isso, odiava aventureiros. Esse ódio teria fim apenas após a ascensão divina, pois Arsenal prometeu a Valkaria honrar seus protegidos.

Como deus, o objetivo de Arsenal é tornar Arton forte através da guerra. Ainda que sua intenção seja proteger este mundo, ele segue impiedoso e implacável, capaz de promover chacinas para dizimar os fracos e alcançar suas metas. Deseja evitar que Arton tenha o mesmo destino de sua terra natal. Nem que para isso precise matar populações inteiras… ou mais deuses.` },
        { titulo: "Relações", texto:
`Ainda mortal, Arsenal encontrou em Valkaria sua maior aliada no Panteão. Prisioneira em sua estátua, a deusa muitas vezes acompanhava o guerreiro em forma de avatar, como barda. Arsenal teria cogitado ele próprio libertá-la do cativeiro, mas acabaria barrado pelas regras do desafio, impostas por Khalmyr: aqueles poderosos demais eram proibidos de tentar, pois o propósito era testar a determinação dos mortais para salvar sua deusa.

Valkaria sonhou que os humanos superariam os deuses. Ela ajudou Arsenal a alcançar esse destino, protegendo a Holy Avenger até que ele a retomasse.

Então, quando o clérigo guerreiro alcançou a divindade, a própria Valkaria também teve sua influência grandemente elevada, ascendendo como líder dos vinte deuses.

Outros membros do Panteão teriam ajudado Arsenal em suas jornadas através dos Planos, reunindo poder para o torneio. Allihanna assegurou seu reencontro com a dríade Momiji e a filha Lisandra. Tanna-Toh ofereceu um vislumbre de seu passado esquecido. Até mesmo Nimb percebeu o perigo inominável que espreita, assegurando que Arsenal tenha meios para confrontá-lo. O Deus da Guerra enxerga todos como aliados.

Khalmyr e Arsenal consideram-se rivais: ambos guerreiros metódicos, ainda que discordando quanto a métodos. Kallyadranoch o odeia, pois ele pilhou tesouros em seu reino divino quando o Deus dos Dragões estava ausente. Thwor respeita sua força, mas o considera um obstáculo no caminho do Mundo Como Deve Ser. Por fim, Marah e Lena o consideram melhor que Keenn, mas ainda prefeririam que não existisse.` },
        { titulo: "Igreja e Clero", texto:
`Muitos antigos templos de Keenn são agora consagrados a Arsenal, e grande parte dos fiéis percebe pouca diferença. A igreja como um todo ainda desempenha os mesmos papéis, seus clérigos lutando e oferecendo suporte em tempos de guerra, ou aconselhando em tempos de paz, preferencialmente evitando que estes durem muito.

Templos de Arsenal lembram fortalezas. Em seus pátios, tropas de clérigos treinam como se fossem soldados, tal como na época de Keenn. Uma mudança, no entanto, pode ser percebida no papel das armas e armaduras: esses itens são considerados objetos sagrados. Uma vez por ano, devotos de Arsenal devem peregrinar até um grande templo, ou encontrar um clérigo de posto superior, para abençoar suas armas e armaduras. Além disso, toda arma deve ser batizada em um ritual santo, no qual um combate é celebrado.

Armas que não pertençam ao lado vitorioso devem ser destruídas.

Como ocorre com outros deuses, existem numerosos pequenos cultos a Arsenal, seguindo interpretações próprias de seus mandamentos. Os infames Coletores de Arsenal formam gangues que tomam armas de quem não as mereça — são devotos verdadeiros, mas também valentões e fanfarrões. Os nobres Forjadores Litúrgicos, de forma contrária, fornecem armas valorosas àqueles que se mostram dignos.` },
        { titulo: "Avatar", texto:
`Arsenal compreende que sua ascensão é ainda recente e precária, adotando posturas cautelosas em suas intervenções no mundo mortal. Até o momento, há pouquíssimas notícias sobre manifestações de seu avatar. Quando necessário, ele utiliza o Kishinauros com esse objetivo (veja Ameaças de Arton, p. 142). Diz-se que Vanessa Drake, antiga clériga de Keenn e primeira clériga de Arsenal, foi também a primeira testemunha a vislumbrar sua forma de avatar. O Deus da Guerra visita Arton com a aparência que tinha quando mortal, trajando a característica couraça púrpura e capa esverdeada. Algumas vezes usa o sinistro elmo fechado, em outras exibe a antiga face humana — cheia de cicatrizes adquiridas durante a luta decisiva contra Keenn. Ele também empunha suas armas mais poderosas e icônicas, o Martelo dos Trovões e a espada Holy Avenger.` },
      ],
    },
    {
      chave: "azgher", nome: "Azgher", epiteto: "Deus-Sol",
      nd: "S", ficha: "avatarDeAzgher",
      dados:
`Outros Nomes. Deus do Sol; o Vigilante; Aquele-que-Tudo-Vê; Bhastall, entre os elfos; Tuvath, entre os qareen; Mirann, entre os hynne; Seolloes, entre os minotauros; Astar, o Sorridente, entre as fadas; Berzul, entre os anões.
Áreas de Influência. Dia, vigilância, proteção, deserto, bom tempo, fogo, luz.
Símbolo Sagrado. Um sol dourado.
Canalizar Energia. Positiva.
Arma Preferida. Cimitarra.
Cores Significativas. Branco, dourado.
Lema. “Todo ouro veio de Azgher, todo ouro deve retornar a Azgher.”`,
      abertura:
`No passado imemorial, quando o Nada e o Vazio trouxeram vinte divindades à existência, várias foram concebidas como antagônicas — talvez porque as entidades cósmicas primevas acreditavam que o progresso nascia do conflito. Havia deuses de ordem e caos, guerra e paz, verdade e mentira. Mas a maior inimizade entre todos, a oposição mais absoluta e insolúvel, acontecia entre os deuses da luz e das trevas.

Diz-se que Azgher e Tenebra nasceram incapazes de tolerar a existência um do outro. Assim que puderam, atacaram seu inimigo natural. Perceberam-se iguais em poder, mas ainda assim seguiram combatendo através das eras, lutando por supremacia. Cada um acreditava ser o provedor mais abundante, o pai ou mãe mais zeloso para o mundo, sendo o outro um demônio terrível que causaria apenas sofrimento. Cegos por sua própria luz e escuridão, não podiam conceber um mundo de iguais.

Diz-se que Khalmyr, talvez em sua primeira resolução como líder, decretou um fim para a guerra. O vindouro mundo de Arton foi abençoado por ambos os deuses, cada um a seu tempo. Haveria dias e noites, sol e estrelas, calor e frescor.

Diz-se também que o Deus-Sol e a Deusa das Trevas reconheceram a sabedoria da decisão, aceitando seus respectivos papéis no mundo. Porém, sendo deuses, não podiam escapar de suas naturezas. Seguiriam odiando um ao outro com todas as forças, incapazes de tolerar a existência do rival. A grande guerra continuaria, agora nas mãos de seus devotos, combatendo as forças adversárias em nome de um mundo melhor.

Azgher é uma das divindades mais cultuadas em Arton. Provedor de luz e calor, responsável por afastar as trevas perigosas da noite. Bondoso e generoso, mas também implacável, pronto para destruir o mal com suas chamas. Igualmente disposto a punir aqueles que não respeitam sua soberania.

Embora o Deus-Sol seja considerado a divindade principal apenas entre os povos do deserto, o culto a Azgher é praticado em todo o Reinado e além. Fazendeiros, viajantes e navegantes suplicam por bom tempo para suas lavouras e jornadas. Aqueles perdidos ou atormentados por mistérios buscam sua visão absoluta, sua orientação em momentos de incerteza, seu olhar capaz de penetrar nos cantos mais obscuros. E aqueles que lutam por verdade e justiça invocam suas chamas para revelar, purificar, punir e destruir os indignos.`,
      secoes: [
        { titulo: "Motivações", texto:
`Azgher é benevolente, mas também exigente e rigoroso. Considera Arton um filho que precisa de cuidados, mas que deve respeitar seus criadores. Sua caminhada diária pelos céus derrama calor e conforto sobre o mundo, assegura a continuidade de toda a vida; o Deus-Sol é consciente de sua relevância e isso o envaidece. Seu coração é imenso, mas também imensos são seu orgulho e sua soberba. Ele não hesita em punir aqueles que considera desrespeitosos; submete devotos a testes morais e provações duras, para comprovar sua reverência e determinação. Contudo, aos bem-sucedidos, a graça de Azgher é abundante.

Embora vários deuses se considerem protetores de Arton, Azgher é aquele que toma o papel de vigilante sempre alerta aos perigos. Sua visão prodigiosa alcança todos os lugares — diferente de seus irmãos, ele é verdadeiramente onisciente no mundo material, não precisando de símbolos sagrados ou de ter seu nome citado para enxergar algo. Diz-se que foi ele a perceber primeiro o plano dos deuses rebeldes durante a Revolta dos Três. Contudo, seu olhar dourado não alcança onde a infame Tenebra derrama suas sombras.

Azgher é inimigo dos mistérios, de tudo que se mantém oculto nas sombras. Ainda assim, ordena que seus devotos cubram as faces — uma aparente contradição. Na verdade, cultuar o Deus-Sol é reconhecer que apenas Azgher tem direito de enxergar o semblante de seus fiéis. O uso de máscaras representa respeito e temor ao poder do astro-rei.` },
        { titulo: "Relações", texto:
`Sendo também um deus com paladinos, Azgher considera-se aliado de Khalmyr, Thyatis, Lena, Lin-Wu, Marah, Valkaria e Tanna-Toh — esta última, em especial, tem grande afinidade com seu aspecto revelador de segredos. O Deus-Sol e a Deusa do Conhecimento buscam, ambos, enaltecer todas as verdades e descortinar todos os mistérios. Azgher cultiva boas relações com o Oceano, ambos buscando guiar os bem-aventurados em jornadas seguras pelos mares. Alguns especulam que Azgher saberia o atual paradeiro do Oceano e também os motivos reais de seu suposto desaparecimento, mas ele nunca revelou nada a seus devotos. Suspeita-se também de alguma relação entre o Deus-Sol e a Dama Dourada glorificada por sua própria facção de piratas. Azgher e Allihanna são, ambos, divindades associadas ao clima e bom tempo. Diz-se que apreciam a companhia um do outro, conversando longamente antes de resoluções sobre quão ensolarados serão os próximos dias em Arton. Durante tais encontros, as flores parecem mais vivas e os animais desfrutam de longas sonecas ao sol.

Tenebra não é a única deusa que o Deus-Sol antagoniza. As mentiras de Sszzaas são também alvo de sua revolta, bem como as trapaças incessantes de Hyninn.` },
        { titulo: "Igreja e Clero", texto:
`Conforme as escrituras santas, todo o ouro existente em Arton foi produzido durante a guerra ancestral de Azgher e Tenebra, como resultado de seus ataques mágicos de luz dourada. Por esse motivo, os devotos buscam retornar esse poder ao Deus-Sol. Essa tradição é especialmente forte entre os sar-allan, que vivem no Deserto da Perdição. Ao longo de séculos, esse povo ergueu um grande templo em forma de pirâmide, que exibe em sua face leste um gigantesco símbolo em forma de sol, feito de ouro. Uma vez por ano, todo o ouro acumulado pelos clérigos de Azgher é magicamente fundido a esse símbolo, fazendo-o crescer cada vez mais, durante um ritual que dura três dias. Muitos aventureiros gananciosos já tentaram encontrar o templo; nenhum voltou a ser visto.

Apesar da grandiosidade e opulência da pirâmide sar-allan, o Deus-Sol também é homenageado em outros templos e cultos. Devotos de Azgher celebram festivais sazonais, marcados por grandes fogueiras e oferendas em ouro, simbolizando o retorno das riquezas ao deus. Esses festivais são ocasiões de grande alegria e reverência, quando histórias de bravura e sabedoria são compartilhadas em encenações, exaltando as virtudes de Azgher. Durante esses eventos, os participantes oram por proteção e orientação, reafirmando seu compromisso com a luz e a verdade. Embora a figura do guerreiro mascarado portando a cimitarra em chamas seja notória, devotos de Azgher assumem os mais variados papéis. Um dos mais interessante está na figura do xerife de Azgher, que empunha armas de pólvora enquanto leva justiça às planícies poeirentas.` },
        { titulo: "Avatar", texto:
`Viajantes planares experientes afirmam que o astro-rei visto nos céus de Arton não é realmente Azgher, mas seu reino divino, Solaris, distante no firmamento. A maioria dos devotos, contudo, não acredita existir diferença. Eventos que façam Azgher manifestar um avatar em Arton são mais frequentes do que se pensa — grandes festivais em sua honra podem fazê-lo se sentir obrigado a enviar um representante.

Ele costuma usar a aparência tradicional de um guerreiro do deserto, sempre trazendo sua espada ou outro item flamejante nas mãos. Também usa algum tipo de máscara, para proteger os mortais de sua luz intensa. Em outros sentidos, lembra muito um beduíno comum, não se furtando de comer e beber durante as festividades.

Não há notícias de que Azgher tenha se manifestado com qualquer outra aparência; encobrir-se com disfarces é contra a sua natureza. Ainda assim, existem lendas sobre uma feiticeira qareen tão radiante e poderosa que não poderia ser qualquer outra coisa, exceto um avatar do Deus-Sol.` },
      ],
    },
    {
      chave: "hyninn", nome: "Hyninn", epiteto: "Deus da Trapaça",
      nd: "19", ficha: "avatarDeHyninn",
      dados:
`Outros Nomes. Deus da Trapaça e dos Ladrões; Mith-Allinnor, entre os anões; Quindallas, entre os elfos; o Brincalhão, entre os hynne e as fadas; Wang-Ho, entre os tamuranianos.
Áreas de Influência. Ladrões, armadilhas, mentira, ilusão, hynne, disfarces, furtividade, esperteza, crime, masmorras.
Símbolo Sagrado. Uma adaga atravessando uma máscara, ou uma raposa.
Canalizar Energia. Qualquer.
Arma Preferida. Adaga.
Cores Significativas. Vermelho, cinza, preto.
Lema. “Hyninn? Nunca ouvi falar.”`,
      abertura:
`O ardiloso Hyninn é o deus da trapaça, das brincadeiras, dos quebra-cabeças, das armadilhas e das artimanhas.

Não por acaso, também o deus dos ladrões. Praticamente toda guilda de ladrões em Arton tem pelo menos um sacerdote deste deus, atuando como conselheiro ou líder. Dizem que mesmo as orgulhosas irmandades de Valkaria, que prezam tanto por “tradições” e “bons costumes”, contam com devotos de Hyninn. Mas Hyninn não é louvado apenas por ladrões — alguns de seus seguidores são estrategistas que admiram sua esperteza ou pessoas desfavorecidas que vencem os mais fortes ou privilegiados usando truques. Ele também tem a simpatia dos hynne, que o veem como um deus brincalhão que protege os fracos. Esse parece ser o grande segredo para entender Hyninn: ele não é simplesmente “o deus dos ladrões”. Não de quem usa de força bruta, intimidação ou métodos simplórios para roubar. É, isso sim, o deus da esperteza, de quem não tem lugar na sociedade tradicional (por falta de força física, títulos de nobreza, dinheiro, coragem ou qualquer outra razão), mas que tem astúcia e inteligência de sobra. Quando um valentão assalta uma vítima que só pode se defender com sua língua afiada, Hyninn protege a vítima. Quando uma quadrilha tenta invadir a mansão de um nobre, mas o nobre preparou armadilhas e truques para se livrar dos intrusos, Hyninn protege o aristocrata. Onde quer que uma boa mentira tenha mais poder que um soco, onde quer que uma ideia genial valha mais que uma armadura, Hyninn está presente.

Embora essa faceta possa fazer Hyninn parecer uma divindade bondosa, isso é apenas mais uma trapaça do deus. Hyninn não é nem bom nem mau — mas, para a maior parte dos artonianos, sua desonestidade suprema o deixa mais próximo da maldade do que da benevolência. Ele é, acima de tudo, um deus ligado a modos de atingir objetivos, mais do que a objetivos em si.

A faceta mentirosa, traiçoeira e oculta de Hyninn faz com que algumas pessoas o considerem próximo a Sszzaas. De fato, existe sobreposição entre as áreas de influência das duas divindades. A grande diferença está no que ambos exigem de seus devotos, e no quão longe estão dispostos a ir. Para Sszzaas, decadência e imoralidade são provas de devoção. Hyninn não deseja decadência. Na verdade, para ele, traição pura e simples é burra e sem graça. Muito mais surpreendente, útil e divertido é trair só às vezes, e nunca ser pego. Alguns teólogos bem-humorados dizem que “Sszzaas e Hyninn fazem coisas parecidas, mas Hyninn sabe a hora de parar”.

Uma área de atuação do Deus da Trapaça que vem se tornando mais e mais aparente são as masmorras.

Desde que Hyninn ascendeu ao Panteão, os artonianos começaram a observar um fenômeno curioso: complexos de túneis subterrâneos se enchem de armadilhas, monstros e tesouros espontaneamente. Os habitantes desses labirintos muitas vezes não precisam comer ou beber água com a mesma frequência de criaturas normais (“Parece que sua dieta são aventureiros!”, dizem alguns estudiosos), não são atingidos pelas armadilhas e ignoram seus vizinhos na sala ao lado, embora ataquem qualquer intruso. Da mesma forma, habilidades como visão no escuro ou magias de teletransporte não funcionam nessas áreas — a não ser que sejam usadas pelos habitantes. Esse fenômeno, batizado “espaço de masmorra”, vem sendo mais estudado nos últimos anos e está intimamente ligado ao deus. Alguns afirmam que, enquanto Valkaria é a deusa dos exploradores de masmorras, Hyninn é o deus de seus projetistas e construtores. Um não poderia existir sem o outro.`,
      secoes: [
        { titulo: "Motivações", texto:
`Hyninn não é uma divindade especialmente interessada em poder — exceto quando esse poder está nas mãos dos outros. Para ele, ser o líder do Panteão é ficar em evidência demais. Muito melhor é ser subestimado, permanecer nas sombras. Parecer apenas um bobo inofensivo, até que uma de suas mentiras mude a Criação para sempre.

Hyninn criou os hynne quando ainda era um deus menor — na verdade, quase duzentos mil anos antes de subir ao Panteão! Embora a criação de raças por deuses menores não seja algo desconhecido, ninguém sabe como Hyninn foi capaz de fazer isso.

Ele mesmo desconversa ou conta histórias contraditórias. A versão aceita pelos teólogos diz que “Hyninn ludibriou Khalmyr para criar os hynne”. Mas o que isso significa?

A esperteza (e o perigo) de Hyninn ficou em evidência quando Glórienn suplicou aos demais deuses maiores para que não impedissem a chegada da Tormenta. Cada divindade teve suas próprias motivações para não intervir, mas a decisão final caberia a Khalmyr. Houve um debate entre deuses no tribunal do Deus da Justiça, então líder do Panteão. Hyninn, a pedido de Nimb, usou as regras do lugar (onde o resultado mais provável sempre acontece) e engambelou todas as divindades, incluindo o próprio Khalmyr! Ele mesmo não ganhou nada... exceto o fato de ter enganado deuses mais poderosos.

Embora quase nenhum artoniano conheça essa história, ela é talvez o melhor exemplo do que motiva o Deus da Trapaça. Hyninn não desejava ser mais poderoso do que os outros, mas desejava que os outros fossem, por um instante, menos poderosos que ele. Não se trata de humilhar ou destruir, mas de constranger. Para Hyninn, a existência é um jogo. Jogos só têm dois objetivos: vitória e diversão. E ambos são mais saborosos quando você não é o favorito.` },
        { titulo: "Relações", texto:
`Hyninn tem algumas relações evidentes: é oposto a Lin-Wu, o mais honrado deus, e a Azgher, que tudo vê. Compete com Valkaria, que apadrinha os exploradores de masmorras. É próximo de Tenebra e Sszzaas, por sua esperteza e segredos, e distante de Megalokk e Arsenal, com sua brutalidade.

Mas, dentre todas as divindades maiores, Hyninn tem algumas das relações mais complexas. O Deus dos Ladrões possui grande afinidade com Marah. Afinal, seus métodos muitas vezes permitem evitar qualquer tipo de violência. Claro, provavelmente Marah não está pensando em furtos, estelionato, ruína e mentiras deslavadas quando fala sobre não violência total... mas tecnicamente Hyninn não está praticando violência!

Sua esperteza também o torna próximo de Tanna-Toh. Na verdade, alguns de seus armadilheiros chegam muito perto da devoção à Deusa do Conhecimento quando fabricam suas maiores e mais complexas criações. Da mesma forma, detetives de Tanna-Toh usam métodos muito próximos dos de Hyninn.

Acima de tudo, os deuses com quem Hyninn tem relações mais importantes são Khalmyr e Nimb. Muitas vezes, ele parece um adversário mais direto de Khalmyr do que o próprio Deus do Caos. Também serve constantemente aos interesses de Nimb — de fato, muito já se especulou que Hyninn seria filho de Nimb, criado com o propósito de “fazer seu trabalho sujo”.

Um antigo ditado afirmava que “Khalmyr tem o tabuleiro, mas quem move as peças é Nimb”. Alguns filósofos já propuseram uma versão alternativa: “Khalmyr tem o tabuleiro, Nimb manda mover as peças, mas quem as move é Hyninn. E, se Khalmyr se descuidar, seu tabuleiro será roubado”. Hyninn não é inimigo declarado de nenhum deus, nem mesmo Khalmyr... Mas nenhum deus é tolo o bastante para confiar nele!` },
        { titulo: "Igreja e Clero", texto:
`A igreja de Hyninn não é organizada em aberto. Seus sacerdotes trabalham nas sombras, muitas vezes em guildas de ladrões ou como conselheiros secretos de nobres. Existe alguma hierarquia, imposta por meio de mensagens secretas. Mas desafiar, enganar e engambelar sacerdotes mais experientes e poderosos faz parte das crenças de todos os clérigos, então ninguém leva qualquer autoridade muito a sério. De fato, Hyninn talvez seja o único deus que incentiva seus fiéis a dizer que nem mesmo o conhecem! Isso teoricamente faria com que o poder do Deus dos Ladrões diminuísse. E essa não é apenas mais uma prova de que ele não passa de um bobo inofensivo, digno de pena?` },
        { titulo: "Avatar", texto:
`A forma mundana de Hyninn varia dependendo da missão a ser confiada e da peça a ser pregada. Suas formas preferidas, entretanto, são um ladrão hynne, um bobo da corte humano e um macaco falante.

Dizem que qualquer mortal muito fraco ou aparentemente indefeso encontrado na estrada pode ser um avatar de Hyninn testando aventureiros poderosos. E aqueles que abusam desses pobres-coitados muitas vezes se veem vítimas de décadas infindáveis de peças, truques, mentiras e trapaças, tudo obra de alguém oculto nas sombras...` },
      ],
    },
    {
      chave: "kallyadranoch", nome: "Kallyadranoch", epiteto: "Deus dos Dragões",
      nd: "20", ficha: "avatarDeKallyadranoch",
      dados:
`Outros Nomes. Deus dos Dragões e do Poder; Deus dos Magos; Dragão Tirano; o Terceiro; Kally, corruptela entre não devotos; Lathsidhien, o Arcano Opressor, entre os elfos; Efreetarhd, entre os qareen; Korka-Dum, entre os anões.
Áreas de Influência. Tirania, magia, dragões.
Símbolo Sagrado. A figura de um dragão, ou escamas de cinco cores.
Canalizar Energia. Negativa.
Arma Preferida. Lança.
Cores Significativas. vermelho, verde, azul, branco, preto.
Lema. “Você pode servir a Kallyadranoch como servo ou iguaria. Será a última escolha de sua vida.”`,
      abertura:
`Em tempos antigos, quando o Panteão ainda era formado por suas vinte divindades originais, Khalmyr comandava os deuses. Como Deus da Ordem, encontrava na figura de Nimb um grande adversário — mas não o maior. Esse título pertencia então ao Deus dos Dragões.

Khalmyr e Kallyadranoch eram opostos em bondade e maldade, mas similares em sua afinidade com a lei e ordem. Diz-se que, naqueles tempos, Arton não era ainda um mundo tão atribulado. A ordem prevalecia, fosse justa ou tirânica. As estações corriam, a vida fazia sentido, as coisas eram como deveriam ser. Deuses não tombavam e ascendiam constantemente. Pela espada de Khalmyr ou pelo terror de Kallyadranoch, os reinos mortais e divinos prosperavam em harmonia.

Contudo, como sabe qualquer habitante da Arton contemporânea, aqueles tempos não durariam para sempre. Sucessões de guerras e cataclismas seguiriam abalando a história recente. Cada historiador tem sua explicação, mas vários sugerem uma mesma causa: o desaparecimento de Kallyadranoch.

Embora poucos saibam disso, o Deus dos Dragões cometeu um ato inominável. Aliado a Valkaria e Tilliann, trouxe à luz um povo como nenhum outro, tão perigoso que não deveria existir. Um povo de avidez devoradora, curiosidade insaciável e poder irrestrito, combinando os atributos principais das três divindades.

Fosse permitido a eles seguir existindo, devorariam toda a existência. Os outros deuses tentaram exterminá-los, mas sem sucesso. Acabariam se tornando os lefeu. A Tormenta.

Por esse crime, os três deuses revoltosos foram punidos. Valkaria, prisioneira em sua estátua. Tilliann, reduzido a uma ruína humana. E Kallyadranoch, que Khalmyr considerava o mais perigoso, totalmente apagado da existência. Seu corpanzil formou o Monte do Dragão Adormecido, nas Sanguinárias. Nem memória de seu nome restaria, apenas um título enigmático: “o Terceiro”.

Esse evento teria consequências — se Khalmyr as previu ou não, impossível dizer. Os deuses bondosos passaram a predominar sobre os malignos — mas, com a queda do Dragão Tirano, as divindades do caos ganharam influência. O louco Nimb tornava-se, agora, o maior rival de Khalmyr. Durante os séculos seguintes, Arton passou a ser assolada por todo tipo de ameaças.

Assim seguiria até o ano 1405, quando as coisas se tornaram ainda piores. Após uma campanha envolvendo os maiores heróis de Arton em batalha contra a Tormenta, o Deus dos Dragões voltou ao Panteão. Seu nome foi relembrado, seus devotos foram abençoados com milagres. Não muito tempo depois, Khalmyr foi destronado como líder dos deuses. Sem sua bondade e com a volta de Kallyadranoch, o mal no mundo se intensifica. Arton se torna verdadeiramente, como tantos dizem, um mundo de problemas.`,
      secoes: [
        { titulo: "Motivações", texto:
`A volta de Kallyadranoch ao Panteão não foi imediata, nem completa. Por muito tempo, o Deus dos Dragões esteve habitando o corpo de uma elfa chamada Yadallina — onde acabou aprisionado como consequência de um estratagema cuidadoso. Sua essência se manifestava em raras gerações de certas famílias élficas, memórias de sua existência voltavam aos poucos. Até a ocorrência de uma certa combinação exata de eventos, culminando em seu retorno.

O Deus do Poder seguiria como elfa mutilada durante os anos seguintes, mas não para sempre. Quando exatamente ele se libertou, ou como isso ocorreu, permanece um mistério. Nos tempos atuais, contudo, Kallyadranoch está livre e pleno para exercer seus propósitos.

Kallyadranoch não é apenas o Deus dos Dragões, mas também a encarnação do que os dragões representam: orgulho, arrogância, tirania e, acima de tudo, poder. É o ser supremo das criaturas supremas, o maior predador da Criação. Representa a ferocidade bestial, o refinamento sádico, a paixão flamejante e a inteligência milenar dos grandes répteis. Muitos pensavam em Tauron como o maior tirano entre os deuses; estavam terrivelmente errados.

Kallyadranoch vê Arton e seus habitantes apenas como tesouro. Existe pouca dúvida sobre suas intenções: criar um mundo de tirania, onde todos são escravos dos deuses — e os deuses, escravos dele mesmo. Por ora, a única certeza é que busca restabelecer sua base de poder. Voltar a ser respeitado e temido, como lhe cabe.` },
        { titulo: "Relações", texto:
`Dragões são gananciosos, vingativos e passionais, e Kallyadranoch não é exceção. Não é segredo algum que alimenta intenções de vingança contra Khalmyr, talvez até contra os demais deuses que se opuseram a ele. Talvez ambicione a liderança do Panteão, destronando a antiga cúmplice Valkaria — ou aliando-se a ela, como no passado. Ou pode ter planos ainda mais grandiosos, além da imaginação de qualquer mortal.

Kallyadranoch e Wynna são inimigos notórios.

Muitos acreditam que ele, e não ela, foi o verdadeiro criador da magia arcana (até mesmo teria sido amplamente cultuado em Ubani, antes de sua ausência). Essa crença é reforçada pelo fato de que muitos textos arcanos estão escritos em dracônico, tornando esse idioma essencial para os magos. No entanto, enquanto a Deusa da Magia é generosa ao extremo, oferecendo seus dons a todos, o Deus do Poder só concede esse privilégio aos mais dignos e disciplinados. Por isso, diz-se frequentemente que Wynna é a patrona dos bruxos e feiticeiros, enquanto Kallyadranoch é considerado o verdadeiro Deus dos Magos.

Outros membros do Panteão tratam Kallyadranoch com o devido respeito, mas também com cautela — afinal, ajudaram a quase exterminar as versões primitivas dos lefeu e foram coniventes com a sentença de Khalmyr. Uma possível exceção seria Aharadak, sempre estranho e misterioso, que talvez o considere um aliado. Caso exista alguma lembrança, reservaria o Devorador alguma forma de gratidão a um de seus criadores originais?` },
        { titulo: "Igreja e Clero", texto:
`Engana-se quem acredita que os dragões cultuam Kallyadranoch: pouca coisa os revolta mais que submeter-se a alguém superior, mesmo um deus. Muitos não aceitam — nem mesmo reconhecem — Kallyadranoch como seu criador. Uns poucos prestam a Kally o devido respeito. Outros, mais raros ainda, aceitam venerá-lo, especialmente dragões jovens que se identificam com o poder do Dragão Tirano.

A igreja de Kallyadranoch é principalmente formada por adoradores de dragões, que acreditam em sua soberania e buscam ser agraciados com parte de seu poder. Seus clérigos atuam como intermediários entre humanos e dragões, estabelecendo domínio sobre cidades ou aldeias em nome de um dragão local. Realizam cerimônias em honra a Kallyadranoch, muitas vezes atraindo o dragão local para coletar riquezas ou sacrifícios. Tais comunidades vivem sob a opressão desses clérigos até que aventureiros intervenham. Apesar do medo, algumas aldeias se conformam e até se convertem, apreciando a proteção contra outros bandidos e monstros.

Além de dragões locais servidos por sacerdotes, existem várias outras formas de culto a este deus. Os dracomantes são arcanistas que veneram dragões, cobiçando seu grande poder mágico. Muito mais excêntricos, os Cavaleiros de Kallyadranoch capturam devotos de Valkaria como oferendas aos dragões, buscando reencenar histórias de donzelas em perigo.` },
        { titulo: "Avatar", texto:
`Mesmo enquanto prisioneiro em um corpo mortal élfico, Kallyadranoch voltou a ser um deus maior, membro do Panteão. Como tal, podia manifestar uma forma de avatar.

Essa criatura, possivelmente o dragão mais poderoso de Arton, foi mantida como guardiã em seu covil pessoal no reino divino de Drashantyr, protegendo seus tesouros incalculáveis. Diz-se que, na ausência oportuna do Deus dos Dragões, muitos aventureiros empreenderam expedições em busca de tais riquezas. Todos foram dizimados pelo avatar dracônico — até ele mesmo ser abatido por Mestre Arsenal, em sua jornada planar rumo à divindade.

Hoje, embora ainda escolha a forma dracônica quando lhe convém, Kallyadranoch adota o aspecto de um humano atraente, esguio, com garras e presas afiadas. Seu cabelo pende em longas tranças, uma para cada cor dos dragões originais. Ostenta muitas joias mágicas, cada uma um artefato de valor inimaginável.` },
      ],
    },
    {
      chave: "khalmyr", nome: "Khalmyr", epiteto: "Deus da Justiça",
      nd: "S", ficha: "avatarDeKhalmyr",
      dados:
`Outros Nomes. Deus da Ordem; Hedryl, em Lamnor; Dhayanor, entre os minotauros; Heredrimm, entre os anões; o Juiz Supremo.
Áreas de Influência. Justiça, ordem, guerra justa, lei, paladinos, anões, luz, defesa, cavalaria, altruísmo, heroísmo, simetria.
Símbolo Sagrado. Espada sobreposta a uma balança.
Canalizar Energia. Positiva.
Arma Preferida. Espada longa.
Cores Significativas. Azul, branco, cinza.
Lema. “Justiça seja feita.”`,
      abertura:
`Khalmyr é o deus da justiça, patrono das leis e da ordem. É também um deus guerreiro, que toma para si a tarefa de combater a maldade, punir criminosos e derrubar tiranos. É considerado um “deus da guerra secundário” ao lado de Arsenal (e de seu antecessor, Keenn), governando sobre a faceta necessária e justa da batalha — proteção de inocentes, resistência a invasores, expedições punitivas contra vilões e militarismo como forma de defesa.

Todas as ordens de cavalaria de Arton se espelham de alguma forma nos princípios de Khalmyr. Um cavaleiro perfeito almeja ser tão semelhante ao Deus da Justiça quanto possível para um mortal. Até o passado recente, Khalmyr era o líder do Panteão, considerado rei dos deuses. Isso levou ao famoso ditado “Khalmyr tem o tabuleiro, mas quem move as peças é Nimb”, referindo-se à disputa entre Ordem e Caos que havia no centro da cosmologia artoniana. No entanto, Khalmyr é antes de tudo um protetor dos mortais — mesmo devotos de outros deuses, ou até daqueles que o desprezam. Assim, quando os minotauros atacaram o Reinado nas Guerras Táuricas, Khalmyr abriu mão de seu posto de liderança. Isso foi um espelho do que aconteceu entre os mortais: o Rei-Imperador abdicou de seu trono e se entregou como prisioneiro, para evitar mais morticínio. Khalmyr escolheu não enfrentar o Deus dos Minotauros quando ele surgiu para desafiá-lo. Em vez disso, abandonou seu posto voluntariamente.

Mais tarde, Tauron foi morto e Valkaria ascendeu à liderança do Panteão. Ainda assim, durante quase toda a história da Criação, o Deus da Justiça comandou os deuses maiores. Muitos consideram que o “estado natural” do Panteão é ser liderado por Khalmyr.

Khalmyr está mais confortável longe do trono.

Como líder do Panteão, era visto com desconfiança por povos inteiros — dele era cobrada perfeição absoluta, interferência direta em cada pequeno sofrimento dos mortais. Pensava-se em Khalmyr como um rei acomodado, interessado em manter o status quo. Isso, é claro, não passava de ingenuidade. A liderança forte e tranquila de Khalmyr manteve a Criação em segurança durante eras inteiras. Suas punições severas impediram estratagemas que poderiam ter condenado Arton. Mas agora, como “apenas um deus”, ele age ativamente contra o mal. É a diferença entre ser um rei cheio de responsabilidades e um cavaleiro errante. Sempre será mais fácil ver como herói o cavaleiro que salva uma única pessoa, ainda que as decisões do rei salvem milhares todos os dias.

Khalmyr é, até onde se sabe, o criador do conceito de justiça, a origem de todas as leis. Embora possa ser considerado rígido demais, “certinho” ou até mesmo hipócrita por quem não o compreende, este deus é fundamental para a vida dos artonianos. A constância que Khalmyr proporciona torna possível que haja criatividade e até rebeldia. Sem a ordem, cada instante em Arton seria imprevisível — filhos nasceriam antes de seus pais, mares queimariam, objetos cairiam para cima, tudo ocorreria de forma arbitrária. Foi Khalmyr que estabeleceu conceitos como a divisão entre dia e noite (o que ajudou a solidificar o conceito de tempo) e a noção de que tudo deveria obedecer a um conjunto de regras. Não é à toa que os princípios básicos pelos quais Arton funciona são chamados de “leis naturais”.

Khalmyr é tão fundamental que a maioria dos artonianos nem nota sua presença. Devido à existência de ordem, é possível que deuses mais instigantes, criativos e “interessantes” como Tenebra, Valkaria e até Allihanna exerçam sua influência. Talvez, numa Criação governada por outros deuses, a vida e a liberdade não valessem muita coisa. Não existe ética ou moralidade sem Khalmyr.

Isso não significa que Khalmyr seja perfeito.

Por sua própria natureza, este deus é ordeiro demais. Se não houvesse outras divindades (principalmente Nimb), nada nunca mudaria em Arton. O conceito de justiça está embasado em regularidade e simetria. Assim, para Khalmyr, tudo deve acontecer da mesma forma de novo e de novo. Os resultados mais prováveis devem ocorrer sempre. Mudança e evolução não fazem parte deste deus.

Ainda assim, Khalmyr é o maior protetor de Arton. Muitas vezes um protetor invisível, mas ainda assim indispensável.`,
      secoes: [
        { titulo: "Motivações", texto:
`Depois de ter perdido a liderança do Panteão (ou, segundo certos teólogos, ser libertado dessa responsabilidade), Khalmyr está cada vez mais interessado em combater o mal ativamente. A ascensão de ordens de cavalaria, que vem acontecendo desde os últimos anos do Deus da Justiça como líder do Panteão, é um espelho do papel cada vez mais atuante e militante de Khalmyr. O Deus da Justiça conhece as principais ameaças a Arton: os sszzaazitas, os puristas e, acima de tudo, a Tormenta. Assim, espalha sua bênção de forma agressiva, tentando convocar cada vez mais paladinos e cavaleiros que possam ser suas armas nessa luta cósmica.

Acima de tudo, Khalmyr se esforça para que Arton não perca tudo que foi conquistado ao longo dos milênios. Bondade e justiça devem ser o padrão, algo a ser almejado por todos. Mesmo que filósofos discutam eternamente a definição do “bem”, esse deve ser o objetivo final de todos os povos. Khalmyr não tem medo de qualquer batalha e sacrificaria sua própria vida sem hesitar para defender Arton. Contudo, sabe que, sem sua intervenção direta, os fundamentos da bondade e da justiça podem ruir.` },
        { titulo: "Relações", texto:
`Não faltam inimigos ao Deus da Justiça. Nimb aparentemente nunca chegou a odiá-lo, mas sempre foi um rival ferrenho. Já Sszzaas queima de ódio por Khalmyr, principalmente depois de ser banido do Panteão.

As punições de Khalmyr como juiz dos deuses lhe valeram outras relações complexas. Depois da Revolta dos Três, Khalmyr puniu Valkaria, Kallyadranoch e Tilliann de formas diferentes. Isso foi visto como arbitrário por alguns: Valkaria se manteve como deusa e pôde ser resgatada; Kally foi esquecido; Tilliann perdeu sua divindade. No entanto, essas punições se provaram acertadas — os devotos de Valkaria ascenderam a um heroísmo que a elevou à liderança do Panteão, Kallyadranoch impediu a ascensão da Tormenta ao ser lembrado, Tilliann ao menos ainda tem sua vida eterna para se redimir. Mas será que a extinção dos gnomos foi merecida? A evolução dos kliren compensou tanta mortandade?

Ao mesmo tempo em que tem aliados como Azgher, Thyatis e Lin-Wu, além de grande afinidade com Tanna-Toh (sua maior parceira na criação de leis e códigos), Khalmyr tem alguns novos inimigos. Aharadak é visto por ele como o maior dos vilões. E Thwor, embora considerado o salvador dos duyshidakk, luta pelo Mundo Como Deve Ser — essencialmente a extinção de qualquer tipo de ordem. Por mais que isso doa a Khalmyr, talvez um conflito entre os dois seja inevitável.

Sua relação com Tenebra é sutil. Os dois já foram apaixonados, e de sua união nasceram os anões, mas hoje são rivais. Isso não significa que ainda não haja atração...` },
        { titulo: "Igreja e Clero", texto:
`Khalmyr é um dos deuses mais populares de Arton, representando conceitos de fácil entendimento por qualquer aldeão. Mesmo o ato de se rebelar ou até praticar crimes é um reconhecimento de que existem leis.

Enquanto inspira heróis e traça estratégias para combater as grandes ameaças, Khalmyr não se importa de ser visto como “o deus padrão”, uma opção segura e sem graça. Ele abençoa cada tribunal, cada corte, cada posição de poder, na esperança de que as autoridades mortais sigam seu exemplo.

Enquanto houver em Arton uma capela numa aldeia, onde um clérigo prega sobre lei e bondade para uma congregação sonolenta que já ouviu esse sermão uma centena de vezes, Khalmyr sabe que este mundo tem salvação.

Seus clérigos, além de líderes espirituais de milhares de pequenas e grandes congregações, são também juízes, conselheiros reais, advogados, funcionários públicos, chefes de guardas e mestres de ordens de cavalaria. É comum que o clericato do Deus da Justiça seja um posto burocrático oficial — em Valkaria, por exemplo, os juízes são sacerdotes de Khalmyr.` },
        { titulo: "Avatar", texto:
`O avatar mais comum de Khalmyr lembra sua representação habitual: um imenso e poderoso guerreiro humano ou anão, de rosto severo, vestindo uma armadura completa, sem elmo. Suas feições podem variar, mas sempre carrega uma enorme espada mágica de duas mãos. Ele também pode se apresentar como um juiz sábio ou como um objeto simples e “ordeiro”, como um cubo ou uma esfera de aço.` },
      ],
    },
    {
      chave: "lena", nome: "Lena", epiteto: "Deusa da Vida",
      nd: "20", ficha: "avatarDeLena",
      dados:
`Outros Nomes. Deusa da Cura; Deusa da Fertilidade; Deusa Criança; Deusa Mãe; Luna ou Lunarianna, na antiga Lamnor; Nanateallah, entre os elfos; Duenna, entre os hynne; Oghana, entre os anões; Ooniemma, entre os suraggel.
Áreas de Influência. Vida, cura, fertilidade, luz, mulheres, pessoas grávidas.
Símbolo Sagrado. Lua crescente prateada.
Canalizar Energia. Positiva.
Arma Preferida. Nenhuma.
Cores Significativas. Verde, amarelo, branco.
Lema. “Antes perder a própria vida que tomá-la de alguém.”`,
      abertura:
`Vida. Todos sabem seu valor, mas poucos conseguem explicá-la. Parece estar em todos os lugares, mas nem todos a reconhecem. O que é um ser vivo? É o que nasce, cresce e procria? O que busca sustento? O que se move? O que pensa, lembra e conjura? Ou, ainda, é o que morre? Para todas essas perguntas Arton oferece inúmeras exceções.

Os deuses vivem? Nesse caso, quem lhes deu vida? O Nada e o Vazio, dizem inúmeras escrituras sagradas. Então essas essências cósmicas primordiais criaram a vida? Ou seriam feitas da própria vida? Nesse caso, por que haveria duas? A vida seria formada por dois elementos que não coexistem como uma única entidade? Tais questões tiram o sono de sábios, acadêmicos e filósofos há séculos.

Algumas certezas, pelo menos, existem. Os deuses podem criar seres vivos. Todos os povos de Arton foram criados pelos deuses, que assim fizeram por diferentes motivos. Alguns, por bondade e generosidade. Outros, por satisfação e vaidade. Outros, ainda, por orgulho, inveja, rivalidade, soberba. Complicados como são, podem ter sido movidos por todas essas razões e mais algumas.

Então temos Lena. Nenhum ser, nenhum povo, teve sua criação atribuída a ela. Ainda assim, é a própria Deusa da Vida.

Embora seja associada ao maior milagre na existência, Lena é a mais misteriosa e enigmática entre as divindades. Alguns dizem que ela não foi criada juntamente aos outros — Lena teria vindo antes, ou sempre existiu, ou simplesmente é. Como se a própria essência da Vida, onipresente desde o início da Criação, tivesse se manifestado em forma de deusa. Outros ainda afirmam que Lena é o último vestígio de um poder mais antigo e primordial que o Nada e o Vazio, um fragmento restante de um ciclo interminável de criação e destruição.

Ainda que outros deuses também governem a vida natural e o clima — Allihanna, Azgher, Oceano... — Lena é mais frequentemente louvada em áreas rurais. Fazendeiros e agricultores suplicam-lhe por boas colheitas e gado saudável, festivais são celebrados em sua homenagem para atrair ou agradecer fartura. Por utilizar a lua como símbolo sagrado, eventos relacionados às suas fases e ciclos também são de Lena: marés altas e baixas, épocas de plantio, comportamento animal (como peixes que desovam na lua cheia) e, sobretudo, o ciclo menstrual. Lena representa tudo relacionado a nascimento e reprodução. Ela seria provedora dos atributos que permitem a maternidade; uma crença diz que apenas pessoas que tenham sido mães podem receber milagres de Lena. Sua igreja foi estruturada assim por longos anos, acolhendo somente mães. Alguns estudiosos, no entanto, apontam evidências de que essa graça é muitíssimo mais ampla, abençoando qualquer nascimento. Quando um golem desperta e ganha vida, isso seria obra de Lena. Quando um osteon volta a viver, Tenebra não seria a única responsável. Conta-se até histórias sobre adoções de crianças que despertam poderes em mães e, às vezes, pais.

Lena não apenas origina a vida, mas é também sua mantenedora — a Deusa da Cura. Embora quase todos os clérigos consigam curar, suas sacerdotisas conjuram os milagres curativos mais poderosos. Devotas de Lena acompanham exércitos para curar os feridos no campo de batalha, aventureiros as acolhem para restaurar os caídos em suas batalhas. Embora sempre prontas para tratar as piores lesões e enfermidades, aquelas que servem a Lena devem estar dispostas a evitar violência física. Todo ser vivo é sagrado; atentar contra a vida é o pior pecado imaginável.

A Deusa da Vida pode ser bondosa, mas seus dogmas são rígidos e levam a dilemas constantes, sobretudo entre aventureiros. Posso lutar sem armas, sem derramar sangue? Posso ferir ou matar em defesa própria, ou para proteger um aliado ou inocente? É permitido atacar sem ferir, ou sem causar dano permanente?

Posso deixar de curar um inimigo, especialmente se ele ameaça minha vida? Em quase todos os casos a resposta é não — aliás, o simples fato de fazer tais perguntas pode desqualificá-lo como devoto. Não sem motivo, dizem que Lena está entre as divindades mais difíceis de decifrar e cultuar. Assim, os mortais continuam a buscar respostas, criar histórias e viver suas vidas sob o olhar terno da deusa. Cada nascimento é uma nova esperança, cada morte, uma transição enigmática. Lena, com sua aura de segredo e seu amor incondicional pela vida, permanece um enigma, uma força sempre presente, mas incompreensível. Uma lembrança eterna de que a vida, em sua complexidade, é o maior mistério e o maior milagre de todos.`,
      secoes: [
        { titulo: "Motivações", texto:
`Apesar de tantas questões, Lena parece ter objetivos claros: uma Arton viva e vibrante, livre de dor e violência. Um mundo onde todos possam desfrutar com plenitude de seu tempo de vida natural, para então retornar triunfantes aos reinos dos deuses. Um sonho belo, mas desafiador. Se fosse simples, não haveria tanta guerra e sofrimento.

Houve uma vez em que Lena, vestindo uma aparência muito diferente do habitual, surgiu durante uma cerimônia em sua honra, trazendo as seguintes palavras: “A vida é um tecido delicado, entrelaçado com fios de alegria e dor, esperança e desespero. Vocês, mortais, são os tecelões. Cada um com seu papel único e insubstituível, cada um fiando sua cor especial. Meu presente para vocês não é apenas a vida, mas a habilidade de torná-la colorida. Tecer, criar, transformar. Escolha sua cor.”

Então sumiu tão misteriosamente quanto chegou. Seu enigma até hoje desafia os religiosos.

Alguns sugerem ser um alerta contra a Tormenta, a “cor perigosa” que toma tudo (ainda que nenhuma alusão ao vermelho tenha sido feita). Outros dizem ser sobre a diversidade da vida, tornada ainda maior. O debate segue.` },
        { titulo: "Relações", texto:
`Escrituras de diferentes cleros mencionam o enorme respeito e deferência dos outros deuses por Lena. Mesmo os mais cruéis, violentos e malignos reconhecem sua importância suprema; mesmo os mais pérfidos não ousam tramar contra ela. Dizem que o próprio Sszzaas, quando roubou os Rubis da Virtude — que então continham a essência vital dos deuses —, de alguma forma cuidou para que Lena fosse mantida a salvo. Ou talvez isso seja outra mentira sszzaazita, tornando seu crime ainda mais abominável. É possível que os deuses não sejam completamente livres para moldar criaturas ou povos. Talvez eles devam, antes, ser autorizados ou agraciados por Lena. Pedir sua permissão, realizar alguma comunhão, fazer alguma oferenda. Clérigas da deusa têm numerosas histórias sobre esses eventos santos, uma para cada ser vivente. Dizem que Tenebra teria sido a única que trapaceou esse pacto ancestral, criando os mortos-vivos. Mesmo a Mãe Noite, contudo, não é considerada sua opositora.

Em toda a história de Arton, Lena nunca teve inimigos entre os deuses — até agora. Com a chegada de Aharadak, a Tormenta invadiu o Panteão. Aquilo que não é morte, mas algo pior, uma perversão total da vida; algo ativo e pulsante, mas corrompido, feito de sofrimento e pesadelo. Suas clérigas clamam que a ascensão do Devorador teria levado Lena a abandonar sua natureza inocente, adotando sua forma de avatar atual.` },
        { titulo: "Igreja e Clero", texto:
`Popular em todo o Reinado e além, a Igreja de Lena é uma instituição enraizada na celebração da vida, da saúde e da maternidade. Muitos de seus templos são construídos em áreas de beleza natural, como bosques e prados, utilizando materiais orgânicos e integrados ao ambiente. Jardins luxuriantes e áreas de cultivo cercam os templos, simbolizando a abundância da vida e servindo como locais sagrados para rituais de cura e crescimento espiritual.

Os rituais da Igreja de Lena são relacionados a ciclos naturais e eventos significativos da vida, como nascimentos, casamentos e colheitas. Celebrações são realizadas durante as fases da lua, com festivais que incluem cânticos, danças e oferendas. Cerimônias de passagem marcam momentos importantes na vida dos seguidores, oferendas de frutos e flores são feitas em agradecimento à deusa. As sacerdotisas desempenham seu papel crucial em rituais de cura, usando ervas sagradas e encantamentos para promover saúde e bem-estar. Templos de Lena são faróis de esperança para os que buscam escapar ao sofrimento e valorizar o milagre da existência.

Existem numerosos cultos menores a Lena, com suas visões particulares sobre como a devoção deve ser exercida. Alguns são mais gentis e tolerantes. Outros menos, muito menos.` },
        { titulo: "Avatar", texto:
`Por muito tempo, dizia-se que Lena visitava Arton como uma menina de 9 anos. Muitas escrituras, de fato, a tratam por Deusa Criança — sua aparência de pouca idade relacionada à pureza da infância, a novas vidas. Várias histórias também mencionam que a deusa teria chorado em momentos de tragédia, ou que teria atuado como uma menina protegida de perigos por heróis. Ou outros deuses.

Em tempos recentes, contudo (mais exatamente, desde a ascensão de Aharadak), Lena não tem sido vista assim. Ela agora surge como uma mulher humana sorridente, de formas generosas, exalando maternidade. Alguns dizem ser uma maneira de mostrar sua força plena. Para outros, essa sempre foi sua forma real, sendo a Deusa Criança apenas uma face secundária. Dizem que Lena pode surgir sem aviso para auxiliar em partos difíceis, abençoar o nascimento de pessoas destinadas a grandes feitos ou ainda curar campeões em missões de grande importância.` },
      ],
    },
    {
      chave: "linWu", nome: "Lin-Wu", epiteto: "Deus da Honra",
      nd: "19", ficha: "avatarDeLinWu",
      dados:
`Outros Nomes. Deus da Honra e de Tamu-ra; Deus Dragão; Deus Samurai; Samurai de Sangue; o Mais Honrado; Portador da Honra; Espadachim Trovejante.
Áreas de Influência. Honra, dignidade, honestidade, nobreza, Tamu-ra.
Símbolo Sagrado. Um dragão celestial.
Canalizar Energia. Qualquer.
Arma Preferida. Katana.
Cores Significativas. Vermelho, verde, dourado.
Lema. “A honra é mais valiosa que a vida. Antes perder a vida que perder a honra.”`,
      abertura:
`O Panteão tem deuses para crime e justiça, guerra e paz, verdade e mentira, amor e ódio. Deuses para cada virtude ou defeito dos mortais. A honra, contudo, é algo mais complexo e absoluto. Para muitos, honra pode ser apenas adesão a algum código de conduta, ou uma medida de como a sociedade o julga. Pode-se parecer digno e virtuoso em público, mas carregar grande desonra interior. Tudo isso, no entanto, são mentiras confortáveis dos desonrados.

Quando se diz que a honra é mais importante que a vida, isso não é apenas uma expressão. Honra é uma combinação sagrada de honestidade, coragem, compaixão, cortesia, integridade, etiqueta, dignidade e virtude. A honra é o presente de Lin-Wu aos mortais, tornando-os o que são hoje. Uma força tão real quanto a vida e a magia. Separa os humanos dos animais e monstros; uma criatura sem honra é apenas uma fera. Para aqueles que a cultivam, viver sem honra é algo tão terrível que muitos preferem tirar a própria vida. Quanto mais elevada sua honra, mais próximo da perfeição alguém estará. Mais próximo do Deus da Honra.

Assim, a divindade mais poderosa e influente no Império de Jade não poderia ser outra. Ele é o Dragão Celestial, a serpente colorida e infinita que cruza os céus em cada grande ciclo — desde o início dos tempos até o fim da Criação. Ele é o Samurai, com sua armadura brilhante como o sol da manhã. Ele é o Sábio, o ancião pacífico de chapéu de palha e cachimbo. De seu reino planar distante, ele trouxe o presente mais valioso para este mundo: sem honra, não há civilização, não há humanidade. Sem honra, não há vida.

Sempre distante de seus irmãos turbulentos, afastado de suas intrigas e maquinações, o Dragão permaneceu puro e honrado. Outros deuses ascendem ou caem, tornam-se fortes ou fracos, conforme a devoção instável de seus seguidores. Mas o Dragão é constante, inabalável, sempre reinante. Mesmo na maior penúria, à beira da extinção, seu povo nunca desanimou, sua fé nunca vacilou. Seus samurais são campeões sagrados; seus shugenja, valorosos sacerdotes. Ambos se destacam entre os cidadãos de mais alto status social no Império. Não sem razão, o próprio Imperador Tekametsu foi um nobre dragão, que se sacrificou para salvar parte de seu povo durante o ataque da Tormenta.

Contudo, os tempos de isolamento findaram. Hoje, Lin-Wu não apenas representa a religião mais importante entre os tamuranianos, mas também ganha adeptos no Reinado. Com a expulsão da Tormenta e a grande restauração, os povos são amigos — o que também se reflete no plano divino. Lin-Wu comanda que seus devotos lutem pelo Reinado, por aqueles que acolheram os refugiados de Tamu-ra em seu pior momento. Da mesma forma, cada vez mais membros de povos não tamuranianos escolhem praticar devoção ao Deus da Honra. No passado, Lin-Wu não tolerava devotos estrangeiros. Essa restrição cairia após a quase extinção de seu povo, hoje existindo samurais de todas as raças — mesmo seres improváveis como goblins, golens e osteon podem receber sua graça, quando se provam dignos. Essa mudança intriga a comunidade eclesiástica, pois é consenso que os deuses são incapazes de mudar. Por outro lado, sábios shugenja argumentam que a mudança foi exigida pela própria honra; sendo, portanto, inevitável.`,
      secoes: [
        { titulo: "Motivações", texto:
`Na Tamu-ra de séculos atrás, os senhores de terras conhecidos como daimyo começaram a proteger os camponeses em troca de tributos — que podiam ser serviços, impostos ou devoção a uma divindade ou filosofia. Inicialmente, comandavam apenas pequenos povoados. À medida que seus territórios se expandiram, alguns absorveram feudos menores e passaram a governar vastas extensões de terra, que se tornaram províncias.

Disputas territoriais e políticas resultaram em um período de guerra marcado pelas maiores e mais violentas batalhas da história da ilha, com milhares de vítimas.

Frustrado pela tirania cruel e desonrosa dos xoguns, o Deus Dragão se enfureceu. Terremotos e erupções vulcânicas devastaram Tamu-ra, destruindo castelos, tragando exércitos para as profundezas da terra. Poderia ter sido o fim daquele povo, não fosse a intervenção de um monge flautista, implorando por piedade. Era Tekametsu, um dragão celestial em forma humana, então tornado imperador e representante de Lin-Wu. Foi decretada a Grande Unificação e o início da Era Teikoku. As províncias ainda existiriam, mas como estados, partes de algo muito maior — o Império de Jade. O Império prosperou, o povo aprendeu o valor da união. Nunca mais os tamuranianos se voltaram uns contra os outros. E, mais importante, nunca mais se voltaram contra a honra.

Lin-Wu ama seu povo, sacrificaria a própria divindade para protegê-lo. Mas também é irascível, pronto a dizimar aqueles que se afastam dos caminhos da honra. No Panteão, busca preservar a própria pureza, ser um exemplo para seus irmãos.` },
        { titulo: "Relações", texto:
`Mesmo entre os deuses, Lin-Wu é misterioso e isolado. Existe a crença de que o poder dos deuses é alimentado pela adoração de seus devotos. Nesse caso, como o Samurai manteve seu status divino, mesmo após a quase extinção de seu povo? Talvez por praticar certa distância saudável de seus irmãos, conservando sua honra pura. Talvez porque, enquanto outros desperdiçavam energia em disputas e tramas, o Dragão se manteve forte. Mesmo que Tamu-ra seja dizimada até a última cerejeira, basta o breve desabrochar de uma flor sakura para que Lin-Wu siga infinito e eterno.

Lin-Wu é forte aliado dos deuses que praticam a honra — ou seja, aqueles com paladinos: Azgher, Khalmyr, Thyatis, Lena, Marah, Tanna-Toh. Sem muita surpresa, ele se opõe a Aharadak, Hyninn, Kallyadranoch, Sszzaas, Tenebra e Thwor. Quanto a Valkaria, o Deus Dragão adota a mesma postura praticada por seus próprios guerreiros santos: serve e obedece à líder do Panteão como um guardião fiel, julgando ser desonrado agir diferente.

Esse rígido código samurai explica o fato de Lin-Wu tolerar a presença horrenda de Aharadak e outros pérfidos; o próprio Deus Dragão comanda, inúmeras vezes, que seus samurais atuem com ninjas e outros desonrados. Ainda que considere o Devorador parcialmente culpado pela devastação de sua terra, não erguerá sua espada contra ele, exceto quando ordenado. Lin-Wu prefere ser destruído a trazer desonra ao Panteão.

Lin-Wu costuma se referir aos demais deuses como sua Família Celestial. De fato, em sua terra natal, o povo tamuraniano louva o Panteão como se fossem deuses menores, inferiores ao Dragão.` },
        { titulo: "Igreja e Clero", texto:
`Em Tamu-ra, sociedade guiada pela honra, Lin-Wu é o símbolo máximo. O Império é governado por aqueles que servem ao Dragão; seu clero e a nobreza imperial são uma coisa só. Seus maiores e mais antigos templos, situados na costa leste da ilha, foram arrasados pela Tormenta. Hoje, o templo-mestre Meiyo’Dera se ergue na nova capital Shinkyo, cercado por magníficos jardins e encimado por uma esplêndida estátua do dragão-serpente. Lugar de beleza, meditação e comunhão — mas também esforço e empenho, pois ali treinam os futuros defensores do Império. Após vidas inteiras de estudo e treino, jovens noviços são sagrados samurais e shugenja diante de Lin-Wu. Devotos de outros deuses oram por favores ou clemência. Para aqueles que seguem Lin-Wu, a vida espiritual é encarada de forma diferente — aqui não se suplica por bênçãos do céu. Em vez disso, as pessoas trabalham e lutam por aquilo que desejam. Alcançar objetivos e realizar sonhos depende mais do esforço que de orações. No entanto, devotos do Dragão respeitam todos os grandes espíritos. As cidades constroem templos e pagodes em sua honra, e cada vilarejo possui uma capela ou altar para adoração.

Conforme o culto se espalha pelo Reinado, aqueles que servem a Lin-Wu assumem a missão de proteger não apenas a cultura de Tamu-ra, mas toda Arton. Participam de missões, caçam e destroem monstros e seres desonrados. Também buscam realizar atos que elevem sua honra pois, ao fazê-lo, também glorificam o presente do Dragão. Samurais e shugenja são seus servos mais poderosos, liderando, lutando e exemplificando suas maiores virtudes — mas devotos de outras classes também podem fazê-lo.` },
        { titulo: "Avatar", texto:
`No Império de Jade, Lin-Wu costuma assumir uma entre duas aparências: um imenso dragão celestial, serpenteando nos céus em cores brilhantes, belo e colorido como as quatro estações; ou um poderoso samurai em armadura cerimonial escarlate, empunhando uma katana faiscante de relâmpagos (dizem ser ele o mais perigoso espadachim entre os deuses). Muitos questionam por qual razão essas formas tão combativas não foram empregadas para proteger Tamu-ra da Tormenta. Seus devotos afirmam que, sendo algo honrado, Lin-Wu com certeza o faria. A honra traz mistérios que apenas os deuses conhecem.

O grande samurai e o dragão celestial são figuras familiares aos tamuranianos; eles não as temem.

Poderiam, no entanto, intimidar o povo do Reinado.

Quando visita essas terras, por gentileza e cortesia, Lin-Wu recorre a uma aparência bem mais aprazível — um galante meio-dragão de Tamu-ra, ou ryuujin, em vestes de seda esvoaçantes. Suas habilidades de combate, no entanto, seguem idênticas à versão samurai.` },
      ],
    },
    {
      chave: "marah", nome: "Marah", epiteto: "Deusa da Paz e do Amor",
      nd: "19", ficha: "avatarDeMarah",
      dados:
`Outros Nomes. Deusa da Paz; a Dama Branca; a Donzela Deslumbrante; o Deleite do Panteão; Lyon-na, entre os elfos; Haya, entre as fadas; Verticordia, entre os minotauros; Kijah, entre os anões.
Áreas de Influência. Paz, amor, paixão, alegria, festas, beleza.
Símbolo Sagrado. Uma pena sobre um coração.
Canalizar Energia. Positiva.
Arma Preferida. Nenhuma.
Cores Significativas. Branco.
Lema. “A paz deve ser celebrada com alegria e amor, não com solenidade!”`,
      abertura:
`Embora os deuses do Panteão sejam tão variados entre si quanto os mortais que andam sobre Arton, todos possuem uma característica em comum — estão dispostos a lutar para defender seus domínios, sejam eles justiça, honra, conhecimento, magia ou quaisquer outros. Todos… menos uma.

Marah, a Deusa da Paz e do Amor, busca a felicidade e a harmonia de todos os seres. E, para isso, usa apenas de meios pacíficos, como diálogo e outras ações não violentas. Marah acredita que a verdadeira força não consiste na capacidade de impor sua vontade aos outros, mas de entendê-los, e jamais luta. Conhecida como a Dama Branca, esta divindade é venerada por aqueles que não desejam violência ou conflitos. É especialmente popular entre pessoas de índole gentil e caridosa, que defendem que a crença nela é uma esperança de tempos melhores em meio a um mundo tomado por caos, guerra, dor e morte, além de pessoas humildes, fracas ou em posição de vulnerabilidade, como desvalidos, anciões ou mães com crianças pequenas. A fé em Marah também é difundida entre aqueles cujos interesses não se beneficiam de hostilidade, como estudiosos, artistas e alguns mercadores. Já entre pessoas em posição de poder, Marah não é especialmente popular. Isso não significa que devotos da paz poderosos nunca tenham existido! Philydio, o Tranquilo, 14º monarca na linhagem dos reis-imperadores, era um servo da Dama Branca. Dizia que, justamente por ser tão poderoso, não tinha o direito de se impor sobre os outros. Nobres belicosos sussurravam que ele era fraco e covarde, e que um rei-imperador deveria buscar guerras, conquista e expansão de territórios. Talvez estivessem certos, mas o fato é que os anos em que Philydio esteve no trono talvez tenham sido os mais prósperos de Arton.

Embora seja sempre pacífica, Marah não é sempre retratada como pacata ou contemplativa. Afinal, além de defender a paz, também promove o amor, em todos os seus aspectos — afeição, romance, paixão carnal… Essa face de Marah, conhecida como a Donzela Deslumbrante, é cultuada por jovens apaixonados, poetas, músicos, noivos e qualquer um em busca de amor ou de casamento. Também é venerada por aqueles que usam a beleza e o sexo como ferramentas, como atores, dançarinos, prostitutas, cortesãs e até mesmo espiões sedutores. Alguns desses não se opõem a utilizar as bênçãos de Marah para seu próprio bem, embora sem nunca ferir suas vítimas (exceto, talvez, seus sentimentos). Os cultos à Donzela Deslumbrante são repletos de alegria, festejos e celebrações frenéticas, algumas das quais chocariam devotos de deuses mais sisudos como Khalmyr.

Embora Marah tenha essa ligação com o amor e o sexo, não é venerada como uma deusa da fertilidade ou da vida. Isso porque esses domínios são mais ligados a Allihanna e Lena, e também porque a Donzela Deslumbrante se interessa mais pelo prazer desses atos do que por seus frutos. Isso faz com que pessoas conservadoras e pudicas critiquem a deusa e seus devotos, chamando-os de libertinos, fúteis, volúveis e outras palavras piores. Frente a tais ofensas, um devoto de de Marah apenas sorri e abre os braços (e talvez deixe cair uma peça de roupa…).

Em tempos antigos, especialmente durante o reinado de Philydio, Marah era retratada principalmente como a Dama Branca. Contudo, em tempos recentes sua face de Donzela Deslumbrante tem se tornado mais popular. Alguns dizem que isso é um movimento da própria deusa. Antes, Marah tentava impedir as pessoas de lutar, argumentando que isso causava apenas sofrimento. Porém, tal estratégia teria falhado em impedir grandes conflitos no mundo, como a Guerra Artoniana. Assim, agora Marah estaria tentando impedir as pessoas de se machucarem de outra forma — mostrando a elas atividades mais… prazerosas.`,
      secoes: [
        { titulo: "Motivações", texto:
`Marah almeja um mundo sem violência, dor e tristeza. Para isso, incentiva seus devotos a buscar soluções pacíficas para resolver dilemas. Antigamente, a deusa possuía uma postura mais plácida e serena. Hoje, contudo, adota um comportamento mais ativo frente aos problemas do mundo. Em vez de apenas resistir à violência, busca efetivamente encher o mundo de amor e beleza, para que o próprio desejo de guerrear não tenha mais espaço no coração das pessoas.` },
        { titulo: "Relações", texto:
`Marah não odeia nenhum de seus irmãos e irmãs. Ela não gosta do comportamento de todos, especialmente dos deuses mais agressivos, como Kally e Megalokk, mas em vez de confrontá-los, apenas tenta convencê-los a serem mais calmos e piedosos. Ainda não teve sucesso, mas não deixa de tentar.

O contrário também é verdade — nenhum deus do Panteão odeia Marah. Isso não significa que todos nutram bons sentimentos por ela! Na verdade, muitas divindades maiores consideram Marah fraca ou tola. Arsenal e Thwor em especial — ambos ex-mortais que ascenderam através de certa dose de violência — desprezam a Deusa da Paz, considerando-a uma palerma iludida que não sabe como as coisas realmente funcionam em Arton. Mesmo deuses bondosos muitas vezes tratam Marah com condescendência. Khalmyr e Valkaria, por exemplo, embora não busquem a violência por si só, entendem que às vezes ela é um mal necessário, e consideram a Dama Branca uma sonhadora ingênua.

Lena, Wynna e Hyninn são os maiores amigos de Marah. Esse último pode parecer uma surpresa, mas o Deus da Trapaça normalmente prefere vencer seus inimigos com sutileza em vez de força bruta, o que agrada à Deusa da Paz. Antes de desaparecer, o Grande Oceano nutria certa simpatia por ela, por também ser um deus de calma e placidez.

Nos últimos tempos, Tenebra tem se aproximado de Marah. Antes, a Deusa das Trevas considerava a Deusa da Paz uma irmã chata e insossa. Porém, quando Marah começou a abraçar os domínios do amor e da paixão com mais furor, tornou-se mais… interessante, na visão de sua irmã mais espevitada. Dizem que devotos das duas deusas já se juntaram para rituais que misturam escuridão e festanças.` },
        { titulo: "Igreja e Clero", texto:
`A maior parte do culto a Marah é informal, sem estruturas burocráticas — apenas frades e clérigos humildes, que vagam pelo mundo pregando a palavra da Paz. Contudo, existem algumas organizações formais de servos desta deusa, que se dividem em dois grandes grupos. Ambos são pacifistas, mas as semelhanças terminam aí. O primeiro, devotado à face da Dama Branca, é composto por pessoas serenas, que vestem mantos brancos e se reúnem em mosteiros isolados para viver em paz e contemplação.

Muitas dessas comunidades pouco se envolvem com o mundo exterior (embora, via de regra, acolham pessoas necessitadas — incluindo aventureiros feridos). Alguns, porém, enviam seus membros para atuar em conflitos, seja como curandeiros, seja como diplomatas, tentando mediar negociações de guerra.

O segundo grupo, devotado à Donzela Deslumbrante, é formado por servos alegres e festivos — ou mesmo lascivos e libidinosos. Normalmente não possuem estruturas tão rígidas, reunindo-se em circos itinerantes, companhias de teatro ou colégios de bardos. Alguns desses grupos são até mesmo secretos, formados por pessoas que querem experimentar prazeres que sua posição na sociedade não permitiria de outra forma.` },
        { titulo: "Avatar", texto:
`Antigamente, Marah era representada como uma mulher solene, em vestes brancas que brilhavam com luz própria. Hoje, porém, é mais vista na figura de uma dançarina sorridente e cheia de vida. Em qualquer forma, Marah nunca porta armas ou mostra quaisquer capacidades combativas. Não que isso seja necessário — em sua presença, criaturas mortais são incapazes de quaisquer atos agressivos. Animais ferozes ficam mansos, soldados deixam cair suas armas. Dos corações de todos na presença da deusa a violência desaparece, sendo substituída pelo desejo de amar.` },
      ],
    },
    {
      chave: "megalokk", nome: "Megalokk", epiteto: "Deus dos Monstros",
      nd: "20", ficha: "avatarDeMegalokk",
      dados:
`Outros Nomes. Fin-Horak, entre os dragões; o Destruidor, entre os centauros; Typhon, entre as nagahs; Sugora, entre os tamuranianos; o Indomável, entre os moreau; Makalax, entre os anões; Troldhaugen, entre os finntroll; Monstro-Pai, entre quase todos os monstros.
Áreas de Influência. Monstros, morte, fúria, destruição.
Símbolo Sagrado. Figura de uma garra ou monstro.
Canalizar Energia. Negativa.
Arma Preferida. Maça.
Cores Significativas. Nenhuma.
Lema. “Humanos, elfos, anões... Todos devem morrer.”`,
      abertura:
`Quase todos os deuses são relacionados aos povos humanoides — esses povos, afinal, foram moldados a sua imagem. Quase todos governam algum aspecto dos humanos e outras raças. Mesmo suas aparências como avatares imitam a forma humana. Mas o Deus dos Monstros é uma grande, aterradora exceção.

Mais uma entidade do que propriamente um deus, Megalokk incorpora o ímpeto, o vigor, a voracidade e a brutalidade dos seres vivos, de forma muito mais intensa e primitiva que sua irmã Allihanna. Salivante de sofreguidão, enquanto outros deuses criavam vida aos poucos, deixando suas criaturas evoluírem gradualmente, ele despejou sobre Arton uma infinidade de crias terríveis. Hordas de puro caos e selvageria, existindo apenas para a violência. Não nasciam, apenas surgiam, formavam-se a partir de vontade divina faminta. Então lutavam e matavam.

Durante a Era de Megalokk, Arton foi um pesadelo de monstros.

Outros deuses desejavam fazer suas tentativas de povoar aquele mundo brutal. Contudo, nenhum povo que seguia o Grande Ciclo poderia avançar e prosperar, nenhuma raça poderia formar uma cultura. Se fossem condenados a viver nesse pesadelo, esses seres apenas rastejariam escondidos das bestas descomunais. Seria difícil sobreviver. Impossível criar sociedades.

Khalmyr não considerou aquele um mundo justo.

Seus aliados no Panteão concordaram. Megalokk, não sendo alguém aberto à persuasão, teve que ser contido pela força. Houve uma batalha tremenda entre os deuses guerreiros e o deus-monstro; este, ao tombar, teria quebrado o continente ao meio — resultando nas atuais massas de Lamnor e Arton Norte. Arfante, Megalokk acabou derrotado e subjugado. Suas criações seriam confinadas a áreas remotas, onde poderiam seguir lutando e matando-se; uma Arton mais aprazível podia agora receber os povos dos deuses.

Até os dias de hoje, o Deus dos Monstros segue rosnador e rancoroso, cheio de revolta contra seus irmãos. Tivesse ele outros recursos além da violência pura, estaria tramando meios para matar todos. Apesar do perigo, o Panteão não pensa em banir ou destruir Megalokk — eliminar um deus maior sempre tem consequências. Acreditam, além disso, que monstros têm seu papel no mundo. Eles existem para desafiar os povos, testar a bravura de seus heróis, promover seu progresso.

Megalokk e Allihanna dividem o acolhimento dos seres não humanoides de Arton; embora todos no Panteão se considerem uma família, eles são mais próximos que os demais. Muitos leigos encontram dificuldade para nomear certas criaturas como animais ou monstros, não parecendo claro a qual reino pertencem — como os lagartos-terror de Galrasia, por exemplo. Na verdade, a divisão é mais simples do que parece. Animais e plantas naturais seguem certas leis invioláveis: nascem, crescem, procriam e morrem. Alimentam-se uns dos outros, promovendo o Grande Ciclo que assegura a continuidade da vida.

Monstros, por outro lado, muitas vezes não estão sujeitos a lei alguma. Muitos se formam por meios não naturais, nascidos de crateras vulcânicas, pântanos tóxicos, abismos marinhos, profundezas cósmicas, maldições profanas. Surgem já adultos, ou passam por metamorfoses variadas, uma mais absurda que a outra. Não acasalam, pois odeiam uns aos outros — quando o fazem, será apenas para satisfazer seus impulsos mais primitivos. Também não envelhecem ou morrem por causas naturais, apenas ficam maiores e mais perigosos, até que algo ou alguém finalmente os destrua. Tais monstros são a transgressão suprema de tudo que define outros seres vivos.`,
      secoes: [
        { titulo: "Motivações", texto:
`Megalokk não parece ter outros objetivos além de dominar Arton com suas crias e matar todos aqueles em seu caminho: os outros deuses, seus povos e seus campeões.

Sendo incapaz de agir diretamente contra o Panteão, segue produzindo abominações cada vez mais ferozes nas regiões que lhe foram cabidas, sobretudo as Sanguinárias. Ali, monstros matam heróis que ousam confrontá-los. Ou escapam vez por outra, levando terror aos reinos humanos.

O Deus dos Monstros é furioso e feroz como nenhum outro, mas não estúpido. Mesmo odiando a civilização e tudo que se relaciona a ela, vários de seus monstros são quase humanoides, com suas próprias comunidades e culturas. Por tais atributos, esses seres não estariam sujeitos às restrições territoriais impostas por Khalmyr. Entre suas obras mais bem-sucedidas estão os gigantes, os trolls e o povo-escorpião khelk’kar. Em pelo menos uma ocasião o Deus dos Monstros também procriou com outra divindade: Megalokk e Tenebra trouxeram a Arton a anômala raça finntroll, os trolls nobres.

Sozinho, o Deus dos Monstros nada pode contra seus irmãos — mas é consenso que Megalokk pode acabar manipulado por alguma divindade mais sagaz.

Deuses astutos como Kallyadranoch, Sszzaas e Thwor, talvez alegando alguma afinidade, seriam capazes de usar sua selvageria com objetivos escusos. De fato, até mesmo mortais com recursos suficientes podem direcionar sua fúria contra inimigos incautos.` },
        { titulo: "Igreja e Clero", texto:
`Megalokk odeia as práticas dos povos civilizados; seus devotos não ousariam construir templos em seu nome. Contudo, existem exceções: os finntroll erguem suntuosas catedrais subterrâneas, mantendo uma igreja unificada para Megalokk e Tenebra. Em Moreania, Megalokk e Allihanna são cultuados em conjunto, na Igreja dos Irmãos Selvagens.

Isso não significa que o Deus dos Monstros tenha poucos seguidores, muito pelo contrário. Um número incontável de humanoides brutais, que escolhem a pilhagem e a violência como modo de vida, praticam devoção a esta divindade. São orcs, gnolls, centauros, goblinoides, medusas, orcs, trogs, gigantes e muitos outros, venerando o Monstro-Pai com cerimônias sangrentas e sacrifícios cruéis — muitas vezes envolvendo raptos de vítimas e intervenções de aventureiros. Ainda, muitas tribos humanas (e de outras grandes raças) também o acolhem, tornando-se tão bestiais quanto quaisquer monstros. Dizem que a fúria dos bárbaros, na verdade, é uma dádiva proveniente da ferocidade de Megalokk.

Também devem ser considerados os muitos druidas que veneram este deus, tão ou mais numerosos que os druidas de Allihanna, e muito mais perigosos. Embora prefiram atuar sozinhos, não é incomum que comandem bandos de monstros, levando-os a atacar povoados humanos como oferenda divina.

Outro grupo notável de devotos são os abissais, seres nascidos da essência maligna de certas divindades — sendo natural, portanto, que Megalokk os produza em abundância. Existindo em grandes números no mundo divino de Chacina, muitos deles alcançam Arton para liderar cultos profanos ao Monstro-Pai.` },
        { titulo: "Avatar", texto:
`Devido à relativa facilidade em enfurecer este deus, o avatar de Megalokk pode às vezes ser invocado por seus clérigos e outros conjuradores contra inimigos — ainda que sem qualquer controle, podendo inclusive atacar seus próprios invocadores. Apenas aqueles com extrema habilidade diplomática, ou outros meios para lidar com feras sanguinárias, conseguem dissuadir a criatura de matar à primeira vista.

Em outras ocasiões, Megalokk pode surgir na forma de algum monstro híbrido, como uma esfinge, quimera ou mantícora, para lidar com heróis. Ele aprecia atraí-los até covis de monstros, por acreditar que suas crias serão sempre vitoriosas. Quando esse plano falha, contudo, já houve vezes em que ele próprio ressurgiu cheio de ódio, dizimando os aventureiros já combalidos.

Sua forma mais conhecida e poderosa tem corpo humanoide alado robusto e várias cabeças de monstros, diferentes em cada manifestação.` },
      ],
    },
    {
      chave: "nimb", nome: "Nimb", epiteto: "Deus do Caos",
      nd: "S+", ficha: "avatarDeNimb",
      dados:
`Outros Nomes. Deus do Caos, da Sorte e do Azar; Provedor da Sorte; Sábio Insano; o Instável; Agente da Mudança; Jajax, entre os anões.
Áreas de Influência. Caos, sorte, azar, loucura, coragem, destino, mudanças.
Símbolo Sagrado. Um dado de seis faces, com símbolos imprevisíveis em cada uma.
Canalizar Energia. Qualquer.
Arma Preferida. Nenhuma e todas; sua arma muda constantemente, adaptando-se ao momento, ou não.
Cores Significativas. Preto, branco, vermelho. púrpura.
Lema. “Khalmyr tem o tabuleiro, mas quem move as peças é Nimb.”`,
      abertura:
`Caos. Para muitos, esse é o maior poder na Criação, a única verdade oculta em todos os fenômenos, eventos e intenções.

Nada está escrito, tudo é aleatório. Não existe futuro, não existe destino. Existem apenas a sorte e sua infeliz ausência, o azar. A personificação desse poder é Nimb.

Talvez seja um erro chamá-lo de divindade. Para alguns, Nimb é muito superior aos demais deuses, até mesmo superior ao Nada e ao Vazio — pois, antes que todas as coisas fossem criadas, havia a soberania completa do caos primordial. Nimb é a manifestação divina da incerteza, da sorte e do acaso em eterna mutação. Figura central em um mundo onde o inesperado é a única constante, Nimb governa o imprevisível, o acidental e o fortuito, gargalhando enquanto Arton tenta, em vão, encontrar ordem onde não existe nenhuma.

Assim, Nimb pode ser mais uma força cósmica que uma entidade consciente, ou não. Para seus seguidores, ele é tanto presença quanto ausência, um ser que desafia todas as tentativas de definição. Não é incomum ouvir que Nimb é louco, que seu comportamento é errático e perigoso. Essas características, no entanto, são vistas por seus devotos como virtudes sagradas.

A influência de Nimb pode ser percebida em todas as esferas da vida, de pequenos incidentes cotidianos a grandes eventos que moldam a história do mundo. Em tempos de guerra, sua presença está nas batalhas em que o inesperado vira a maré da vitória.

Em tempos de paz, ele é o sussurro que incita dúvida e mudança, garantindo que nada permaneça estagnado por muito tempo. Nimb é a mão invisível que manipula os acontecimentos, o emaranhado de possibilidades que se desdobra de maneiras infrequentes. Diz-se que, todas as vezes em que alguém faz uma aposta, atrai a atenção de Nimb. Ele pode simpatizar com o apostador, ou não.

Muitos apenas o temem e evitam, outros oram que traga boa sorte a suas vidas. E uns poucos abraçam sua incerteza por completo, vivem o momento, acreditando que tudo pode mudar com um simples rolar dos dados divinos. Talvez por esse motivo, devoção a Nimb é algo comum entre aventureiros — indivíduos ousados, sempre com as vidas por um fio, correndo grandes riscos e apostando tudo em grandes conquistas.

Aqueles que louvam Nimb costumam ressaltar seu importante papel como provedor da sorte, aquele que traz boa fortuna aos necessitados. Por estranho que pareça, dizem que o Deus do Caos exerce sua própria justiça, abençoa com sorte e castiga com azar, conforme seus próprios critérios misteriosos. Devotos buscam aprazer Nimb para que, ao lançar seus dados, estes sorriam.

Há também aqueles que não levam Nimb a sério, ou acreditam que sua loucura esconde uma sabedoria profunda. Outros ainda teorizam que ele ficou louco quando soube de algo aterrador, uma verdade tão terrível que nem mesmo um deus conseguiu suportar.`,
      secoes: [
        { titulo: "Motivações", texto:
`Se Nimb existe por algum motivo, se tem qualquer intenção, isso ainda está para ser revelado. Para muitos, contudo, a verdade é óbvia: Nimb busca provar que nada está gravado em pedra.

Revelar que o destino não é uma linha reta, mas um labirinto de bifurcações, cheio de armadilhas e passagens secretas. A verdadeira beleza da vida está em suas surpresas, seus presentes e desafios. Basta uma rolagem de dados para mudar o curso da batalha, decidir entre vida ou morte, transformar um mendigo em rei. Para Nimb, essa verdade é maravilhosa. Afinal, quando presenteia alguém, você avisa de antemão o que a pessoa vai ganhar?

De forma oposta, este deus considera tudo que é certo e previsível como algo profano, infeccioso, maléfico. Ele descarta certezas e profecias, ridiculariza os que acreditam em um futuro garantido. Não conhecer o dia de amanhã, não saber aquilo que o futuro nos reserva, é nossa maior motivação para lutar e viver. Se soubesse de antemão todos os seus passos, todos os eventos bons ou ruins em seu caminho, você ainda teria determinação para aceitá-los ou mudá-los? Ainda seria esperançoso, otimista? Ou apenas ficaria resignado, esperando pela morte? Para Nimb, uma vida de certezas totais é o pior castigo imaginável.

Nimb não tem um plano mestre: qualquer plano implica certo grau de ordem, algo que ele despreza profundamente. Sua única constante é a mudança, sua única regra é que não há regras. Ele encoraja seus seguidores a abraçar essa visão, viver o momento, agir impulsivamente e nunca temer o desconhecido. Coragem, para Nimb, não é a ausência de medo: é a disposição de enfrentar o imprevisível sem hesitação.

Diz-se que os deuses são incapazes de mudar. Estão presos a suas próprias naturezas, a valores rígidos como justiça, honra, guerra, paz. Nimb é o único a escapar dessa lei, é aquele que representa a própria mudança. Faz aquilo que quer, quando quer, sem pensar em consequências. Para ele, Arton é palco para uma peça grandiosa, com atores que não seguem nenhum roteiro.` },
        { titulo: "Relações", texto:
`No passado, acreditava-se que Arton era governada pela rivalidade entre Nimb e Khalmyr, então líder do Panteão. Essa liderança, contudo, acabava sempre contestada — ambos os deuses seriam igualmente poderosos, mas opostos. Enquanto Khalmyr buscava impor ordem à Criação, Nimb era a força que constantemente desafiava e perturbava essa ordem. O Deus da Justiça fazia as regras, apenas para que elas fossem quebradas pelo eterno adversário. Khalmyr montava o tabuleiro, Nimb movia as peças em direções ilegais.

Mas isso é passado. Hoje, o comando do Panteão pertence a Valkaria, que exerce liderança muito mais tolerante, até indolente. Nimb deve aprovar essa postura liberal, mas seus devotos mais antigos suspeitam de algo. Em suas manifestações recentes, o Senhor do Caos parece estranho, apático, mal-humorado, até triste. A demoção do rival teria, de alguma forma, enfraquecido também seu próprio poder e prestígio? O vilão louco precisa de um herói como adversário digno? Diz-se que os dois deuses fizeram recentemente uma aposta envolvendo uma jovem paladina, com consequências (como tudo relacionado a Nimb) imprevisíveis.

Outra divindade em forte oposição a Nimb é Thyatis, o Deus do Futuro, como alguns o chamam. O motivo não poderia ser mais explícito: Nimb odeia o próprio conceito de “profecia”, odeia que o futuro seja roubado de seu mistério. Dizem que, quando Thyatis entrega agouros a seus devotos, Nimb faz tudo para evitar que ocorram. Às vezes é bem-sucedido. Em outras, sua própria interferência também fazia parte da predição, enfurecendo-o ainda mais.

Nimb também antagoniza Lin-Wu, por seus valores de honra e retidão, e Arsenal, deus metódico que detesta apostadores. Curiosamente, lendas dizem que Nimb teria ajudado Arsenal em sua ascensão, mais uma vez provando ser impossível compreendê-lo de todo.

Por outro lado, Nimb compartilha afinidade natural com Hyninn, o Deus dos Ladrões. Ambos são vistos frequentemente juntos, tramando esquemas imprevisíveis e desfrutando das ironias do destino. Há rumores sobre Hyninn ser filho de Nimb — uma teoria que, embora não confirmada, faria muito sentido, considerando as semelhanças em suas naturezas. Ambos são agentes da mudança: enquanto Hyninn age nas sombras, roubando e enganando, Nimb prefere abordagens mais diretas e caóticas. Nimb mantém relações ambíguas com deuses como Tenebra, Wynna e Valkaria. Ele não é aliado confiável, seus pactos são tão voláteis quanto sua própria índole. Contudo, Nimb não se importa de trabalhar com outros deuses quando isso serve a seus propósitos momentâneos.` },
        { titulo: "Igreja e Clero", texto:
`Os seguidores de Nimb formam uma comunidade diversa e pouco estruturada. Diferente de outras divindades, este culto não mantém templos grandiosos ou rituais tradicionais. Seus devotos celebram a incerteza e mudança de maneiras pessoais, espontâneas e súbitas. Realizam cerimônias improvisadas em quaisquer locais e ocasiões, festejos de pura loucura. Também podem envolver jogos de azar extremos, correndo riscos absurdos, apostando até as próprias vidas.

A igreja de Nimb, se podemos chamar assim, é principalmente composta por aventureiros, exploradores, bardos, jogadores, rebeldes, desajustados, anarquistas — enfim, aqueles que anseiam viver a vida sem amarras. Enquanto devotos de outros deuses almejam nobreza, harmonia e perfeição, seguidores de Nimb celebram imperfeições e diferenças. Não há grupo de heróis formado por pessoas iguais, argumentam: diversidade é força.

Na sociedade artoniana, seguidores de Nimb são vistos com uma mistura de curiosidade e desconfiança. Muitos os consideram perigosos, incapazes de seguir regras sociais ou respeitar tradições. No entanto, também são valorizados por sua coragem e disposição de enfrentar qualquer desafio, não importam as probabilidades. São sempre os primeiros a se voluntariar para missões impossíveis, confiando na sorte e na proteção de Nimb para triunfar.

Assim, o culto a Nimb não é necessariamente maligno. Muitos veem o Caos como uma força necessária para o progresso, acreditando que a destruição da ordem estabelecida é o primeiro passo para a criação de algo novo e melhor. Não temem derrubar regentes, desafiar profecias ou questionar tradições. Mesmo aqueles que desprezam o caos acabam recorrendo a Nimb e seus seguidores quando enfrentam situações em que a ordem falhou.

Obviamente, não existe qualquer forma de hierarquia no culto a Nimb. Quando tal “ameaça” surge, seus devotos tratam de tentar desfazê-la o quanto antes.` },
        { titulo: "Avatar", texto:
`Nimb raramente se manifesta da mesma forma duas vezes. Suas aparições podem variar de um velho viajante louco a uma fada lutadora, um anão arcanista ou um gato laranja sem rabo. Quando deseja ser reconhecido, contudo, adota a forma icônica de um homem esquálido com olhos esbugalhados, cartola e brincos. Ele é frequentemente visto brincando com dados que trazem símbolos sem sentido.

Para os seguidores de Nimb, a aparição de seu avatar é um presságio de boa sorte ou desastre iminente. O que ele traz consigo — sorte, azar ou caos puro — será impossível prever. Sua presença pode alterar o curso de batalhas, lançar dúvidas sobre vitórias certas ou surpreender até os mais sábios entre os deuses.` },
      ],
    },
    {
      chave: "oceano", nome: "Oceano", epiteto: "Deus dos Mares",
      nd: "S", ficha: "avatarDoOceano",
      dados:
`Outros Nomes. Grande Oceano; Ronn-Tirk, entre os elfos terrestres; Capitão Jor, entre os marinheiros; Midrinn, entre os anões.
Áreas de Influência. Mares, criaturas marinhas, marinheiros, água, tempestades.
Símbolo Sagrado. Uma concha.
Canalizar Energia. Qualquer.
Arma Preferida. Tridente.
Cores Significativas. Azulmarinho, verde-água.
Lema. “Somente vivendo em comunhão com o Oceano podemos receber a graça divina.”`,
      abertura:
`Existem histórias sobre como Arton nasceu árida, inabitável, sem qualquer vida ou meios de sustentá-la. Outros deuses teriam tentado povoá-la, sem sucesso.

Coube então a um deus pujante, irascível, o papel de despejar tempestades torrenciais sobre a terra inóspita. O dilúvio durou anos, séculos. Seus irmãos clamaram que bastava, mas o Deus dos Mares não se deteve, seguiu incessante até se fartar. Quando enfim a tempestade acabou, a maior parte do orbe se achava recoberta com o elemento fundamental aos seres vivos.

Cada culto tem sua versão para o surgimento da vida em Arton. Esta é contada pelos devotos do Grande Oceano. Sim, esse mito conflita com aqueles nas escrituras de outras igrejas. Qual seria a verdade? Como tudo relacionado aos deuses, depende daquele a quem se pergunta.

Oceano, o antigo e insondável deus dos mares, é uma das entidades mais enigmáticas e poderosas no Panteão. Desde os primórdios, tem sido o guardião e soberano das águas. Talvez pai original de todas as criaturas — pois elas, antes de conquistar as terras secas, teriam emergido da água. Embora as deusas Allihanna, Lena, Valkaria e outras sejam respeitadas como mães dos seres que habitam a superfície, Oceano pode reivindicar não apenas a paternidade de todos, mas também das águas que os sustentam.

Enquanto outros deuses vivem envolvidos em disputas e tramas, competindo pela devoção dos mortais, Oceano se mantém plácido e indiferente. Ele governa a maior extensão do mundo material, uma vastidão submersa que o Reinado nem suspeita existir. Nações e impérios de povos submarinos, tão enormes e populosos quanto aqueles no continente, senão mais. Apenas uns poucos de seus habitantes — sereias, tritões, elfos-do-mar, nereidas... — são conhecidos. Além de elfos, dizem existir versões marinhas para todas as raças terrestres: humanos, anões, goblins, minotauros, além de outras muito mais estranhas, quase nenhuma revelada até hoje. Estudiosos dizem que isso é impossível, simples fantasias dos devotos deste deus. Talvez.

Sendo tão vastos, inexplorados e sem fronteiras, dizem que os oceanos de Arton seriam conectados a Pelágia, o reino divino do Oceano.

Diferente de outros mundos dos deuses, esse reino oceânico planar — infestado de tubarões colossais, capazes de engolir castelos — pode ser alcançado por meio de embarcações comuns, quando essas ousam velejar além dos mapas conhecidos. Não se sabe, contudo, de qualquer expedição que tenha retornado de tal jornada épica.

Oceano sempre foi o mais inacessível dos deuses, uma divindade de muitos mistérios. O maior deles, contudo, reside em seu recente desaparecimento — se podemos chamar assim. Após eventos que o teriam deixado ultrajado, o Deus dos Mares convocou um grande conselho. Os seres mais poderosos das águas compareceram, incluindo seu sumo-sacerdote, Capitão Nautilus, e até mesmo Benthos, o Dragão-Rei dos Mares. Os maiores piratas de toda Arton também rumaram para a reunião — apenas para testemunhar Oceano, em sua bela armadura de coral, desaparecer sem explicação! Confusos e furiosos, os bucaneiros culparam uns aos outros. Rumores sobre um artefato chamado Coração do Oceano, e o surgimento de uma entidade nomeada Dama Dourada, apenas complicam ainda mais o enigma.`,
      secoes: [
        { titulo: "Motivações", texto:
`No passado, Oceano era um deus ambicioso e cheio de vigor, temido até por seus irmãos no Panteão. Em seus acessos de fúria, teria afundado continentes e devastado civilizações. Entretanto, com o passar das eras, tornou-se pacato, indolente e até apático, perdendo o interesse pelas disputas que consomem os outros deuses. Enxergava seus conflitos como brigas mesquinhas por pedaços insignificantes de terra, enquanto seu reino era incomparável. Nenhum outro deus podia desafiar seu poder no mar. Aliás, nenhuma área de Tormenta jamais se manifestou nos mares (até onde se sabe).

O deus Oceano realmente sumiu? Seus clérigos ainda conjuram milagres. Suas Obrigações & Restrições se mantêm — sugerindo que a divindade continua vigiando seus devotos. “Ora, e deuses não são sempre assim?” dizem alguns. Contudo, é verdade que os deuses de Arton são presentes e ativos, visitam este mundo com frequência — mas Oceano nunca mais foi visto. Eventos estranhos assolam os mares, como correntezas misteriosas e maior ocorrência de monstros. As tempestades, antes vistas como sinais de seu humor inconstante, agora parecem manifestações de um poder desconhecido e descontrolado.

Os mais supersticiosos temem que o desaparecimento de Oceano seja presságio de um cataclismo iminente, quando os mares se erguerão sobre as terras emersas, varrendo o Reinado por completo. Outros, mais pragmáticos — sobretudo deuses menores —, veem uma oportunidade no vácuo de poder deixado por Oceano. Alguns líderes piratas tentam se afirmar como novos soberanos dos mares, buscando controlar as águas em nome próprio, enquanto cultos secretos surgem, clamando a capacidade de invocar o retorno do deus ou mesmo substituí-lo.

Os planos atuais do Oceano, se existem, permanecem profundos como suas águas.` },
        { titulo: "Relações", texto:
`Oceano tratava os outros deuses com desdém, arrogância e, muitas vezes, indiferença. Considerava suas tramas irrelevantes. Mas não o tempo todo. Embora mude de temperamento e índole como as marés, Oceano costuma demonstrar grande respeito por certas divindades — sobretudo aquelas relacionadas à criação e proteção dos seres vivos, como Allihanna, Lena, Valkaria e até mesmo Tenebra. Talvez ele as considere como iguais, compartilhando a honra e o fardo de prover vida a Arton. Outros insinuam que Oceano, como os piratas que abençoa, é um eterno galanteador em busca de novas conquistas. Comentase, contudo, que Wynna, Marah e Tanna-Toh o evitam, considerando-o preguiçoso e decadente, afastado de importantes questões divinas.

Oceano não parece ter simpatia por Thwor. Dizem que seu desaparecimento coincidiu com a ascensão do Deus dos Goblinoides; a própria queda da Flecha de Fogo, esfacelando o antigo Istmo de Hangpharstyth sobre seus domínios, o teria enfurecido. Um boato recente diz que, devido a esse insulto, Oceano amaldiçoou os duyshidakk com a incapacidade de nadar. Os goblins dizem ser mentira. Desafiados a provar, mudam de assunto.

A relação entre Oceano e Aharadak tem sido tema de debates. Como foi dito, nenhuma área de Tormenta jamais se manifestou nas águas — isso é, nenhuma área conhecida. Não há garantias sobre o fenômeno aberrante jamais ter ocorrido nas profundezas. Especula-se sobre algum pacto secreto entre estes deuses. Ou então a Tormenta simplesmente busca atacar os devotos daqueles que tentaram exterminá-la no passado, e esses vivem apenas em terras emersas.` },
        { titulo: "Igreja e Clero", texto:
`O Oceano supostamente seria o deus mais venerado no Panteão, aquele com o maior número de devotos. Supostamente, por ser impossível contar as populações vivendo sob as ondas. É seguro, contudo, dizer que esta é a divindade principal entre todos os povos aquáticos. Sereias, tritões e elfos-do-mar — raças que formam sociedades submarinas — acreditam que os mares compõem o corpo físico de seu padroeiro. Consideram as profundezas escuras um santuário sob proteção divina. Para eles, o “mundo seco” é lugar perigoso e amaldiçoado, distante da segurança oferecida pelas águas. Aventureiros dizem existir cidades submersas com imensas catedrais de coral em honra a este deus. Oceano também encontra muitos devotos nos povos terrestres, sobretudo nas regiões litorâneas. Entre marinheiros, poucos se atrevem a embarcar sem um devoto deste deus na tripulação — seria garantia de desastre! De forma contrária, cerimônias nos conveses das embarcações asseguram jornadas seguras. Celebrações ao Oceano também podem envolver grandes torneios entre devotos que cavalgam a sagna — tipo de prancha feita de madeira, sobre a qual se equilibram deslizando magicamente sobre as ondas.

Hoje em dia, grande parte dos devotos encontra-se envolvida em missões buscando desvendar o desaparecimento da divindade. Encontrar o suposto Coração do Oceano, dizem, é a chave para a resposta.` },
        { titulo: "Avatar", texto:
`Quando ainda decidia visitar o mundo material, Oceano adotava a aparência de um galante elfo-do-mar, ricamente ornamentado com tesouros de naufrágios — dizem, como forma de ostentar que riquezas perdidas em seus domínios jamais serão retornadas. Para aqueles dispostos a desafiá-lo, exibia o tridente imenso, uma das armas mais impressionantes entre aquelas portadas pelos deuses.

Conta-se também que, por vezes, Oceano se manifestou como um velho pirata cujo único olho refletia o infinito das profundezas. Ou como um imenso leão-marinho prateado. Ou ainda uma gigantesca água-viva com tentáculos de dezenas de quilômetros, capazes de envolver ilhas inteiras.

Desde seu dramático sumiço, contudo, o avatar do Oceano ainda não voltou a ser visto. Caso isso aconteça, dependendo de suas motivações, talvez o deus decida eliminar quaisquer testemunhas para preservar seu segredo...` },
      ],
    },
    {
      chave: "sszzaas", nome: "Sszzaas", epiteto: "Deus da Traição",
      nd: "19", ficha: "avatarDeSszzaas",
      dados:
`Outros Nomes. Deus da Traição, do Mistério e do Conhecimento Oculto; o Senhor dos Segredos; o Mestre dos Mistérios; o Deus Serpente; o Corruptor; Khassir-Thalier, entre os elfos; Lacertos, entre as nagahs; o Vizir Negro, entre os sar-allan; Zhariesk, entre os dragões; Sargos, entre os anões.
Áreas de Influência. Conhecimento proibido, segredos, manipulação, traição, veneno, serpentes.
Símbolo Sagrado. Uma naja vertendo veneno pelas presas.
Canalizar Energia. Negativa.
Arma Preferida. Adaga.
Cores Significativas. Verde, preto, cinza, marrom, vermelho.
Lema. “Seu segredo está seguro comigo.”`,
      abertura:
`O senhor da intriga, da perfídia e da mentira, este deus sombrio é o patrono das víboras, das serpentes e de tudo que é traiçoeiro e venenoso. Sua sagacidade rivalizada apenas por sua malícia, Sszzaas é um dos seres mais cruéis e perigosos da Criação, um vilão insidioso e irredimível.

Isso é o que dizem os devotos dos autoproclamados deuses do “bem” — especialmente Khalmyr. Sim, é verdade que Sszzaas tramou contra o Panteão ao tentar reunir os Rubis da Virtude, mas também é verdade que ele foi descoberto em sua trama… E que a história é contada pelos vencedores.

Alguém que ouça um sszzaazita de coração aberto conhecerá uma versão diferente. Talvez fique sabendo que Sszzaas, em sua essência, é apenas um estudioso. Um pesquisador apaixonado por descobertas, teria sido companheiro (ou discípulo, ou mentor, ou mesmo amante) de Tanna-Toh em tempos imemoriais. Porém, em determinado momento, os caminhos das duas divindades se separaram. Em sua prepotência, a Deusa do Conhecimento decidiu distribuir o saber para todos, sem pensar nas consequências disso (conveniente, para alguém cujo poder cresce conforme cresce a erudição do mundo…). Sszzaas, mais cauteloso, sempre entendeu que conhecimento é uma arma, e armas não podem estar nas mãos de qualquer um.

Aqueles que ingressam numa congregação sszzaazita, “apenas para ouvir o outro lado”, notam que boa parte da história referente a este deus é um mal-entendido derivado dessa discordância. A partir do cisma com Tanna-Toh, Sszzaas passou a esconder suas descobertas. Não para privar os mortais do saber, mas para protegê-los. Ao mesmo tempo, rogou para que seus devotos também fossem cautelosos — e eles ouviram sua divindade.

Alguém aberto ao verdadeiro conhecimento, que continue ouvindo os sszzaazitas sem preconceitos, será instruído no resto da história. Sabendo que seu conhecimento poderia ser usado para o mal se caísse em mãos erradas, os seguidores de Sszzaas se esconderam da sociedade. Apenas por isso, seus novos amigos garantirão, eles passaram a adorar seu deus em segredo, em porões escuros, trajando máscaras e falando em sussurros. Quando queriam se reunir, faziam-no em confrarias sigilosas, identificando uns aos outros através do uso de símbolos e sinais sutis.

E, principalmente, sabendo que seu conhecimento poderia ser perigoso, jamais o espalhavam indiscriminadamente. Pelo contrário, usavam-no apenas em situações específicas, como para ajudar um regente a tomar as melhores decisões para seu povo. Mesmo nessas raras ocasiões, nunca buscavam a glória.

Sempre agiam discretamente, das sombras.

Um pesquisador cuja mente não seja tomada por noções tacanhas agora conhecerá o lado oculto de vários fatos na história de Arton. O lado dos sszzaazitas, grandes heróis que nunca mostram o rosto. Guerras foram evitadas por conselheiros que substituíram monarcas belicosos por príncipes dóceis. Crises de escassez foram resolvidas por escribas que alteraram os livros contábeis de suas guildas para que a comida pudesse ser comprada mesmo pelos mais miseráveis. E assim, sem usar de intimidação ou violência, os sszzaazitas manipulavam alguns, em prol do bem de todos.

Sszzaas via isso e sorria. E, estando imerso nas sombras, passou a enxergar a escuridão com mais clareza. Entendendo que tanto ele quanto seus devotos iriam guardar e proteger qualquer descoberta que fizessem, passou a buscar os segredos mais profundos da Criação. Estudou venenos, para poder criar antídotos (tornando-se amigo das serpentes durante o processo). Pesquisou os feitiços mais profanos — aqueles que mesmo Wynna temia — para poder se proteger de conjuradores malignos. E, quando percebeu que sabia mais que os outros deuses, tentou guiá-los para o melhor caminho possível. Por isso, porém, foi julgado e condenado pelo então líder do Panteão. Como se tivesse “traído” seus irmãos e irmãs.

Depois de ouvir tudo isso, depois de abrir mão de ideias ultrapassadas como “honra” e “honestidade”, depois de ser acolhido por seus grandes amigos sszzaazitas e fazer alguns rituais (apenas para retribuir tanta amizade), um estudante do verdadeiro conhecimento estará mudado. Ele saberá que Sszzaas é o único deus que oferece a verdade. Infelizmente, outras portas estarão fechadas e, para adquirir mais poder, o discípulo precisará adotar os modos de seu novo senhor. Talvez ele se surpreenda ao pensar em si mesmo como um sszzaazita. Talvez veja que sua família e seus antigos amigos estão prejudicando sua evolução. Então, talvez, comece a considerar a beleza de seus rostos horrorizados ao beber veneno. Comece a pensar em quanto conhecimento sobre a índole mortal poderia ser obtido se eles se voltassem uns contra os outros. Comece a calcular quanto poder cada um deles valeria se fosse sacrificado, em nome do bem, ao Deus da Traição.`,
      secoes: [
        { titulo: "Motivações", texto:
`Sszzaas talvez seja o deus mais enigmático do Panteão. É sabido que deseja conhecimento, especialmente segredos e mistérios. Se alguma informação é oculta ou proibida, é do interesse de Sszzaas. Também é sabido que ele se delicia com tramas e intrigas, especialmente se terminarem em traição. Alguns dizem que ele aprecia essas dissimulações para estar sempre um passo à frente de seus rivais. Se conhecimento é poder, faz sentido que você nunca dê informações reais a ninguém! Já outros acreditam que, para Sszzaas, a traição não é um meio para atingir um fim, mas sim um fim por si só. Os que defendem essa teoria dizem que o Deus Serpente faz isso apenas para mostrar que é mais astuto que os demais.

Nada seria uma prova de superioridade intelectual maior do que conquistar a confiança, amizade ou mesmo amor de alguém apenas para, no último instante, revelar que tudo havia sido pura manipulação.

Todos, porém, concordam que Sszzaas é extremamente inteligente. E o fato de este deus estar sempre vários passos à frente de qualquer outro ser é justamente o que torna tão difícil saber quais são suas reais motivações.

Você gostaria de saber mais? Gostaria de estudar sobre ele? Está disposto a ouvir sem preconceitos?` },
        { titulo: "Relações", texto:
`Nenhum deus do Panteão é aliado de Sszzaas ou sequer confia nele. E não sem motivo, pois o Deus Serpente mais de uma vez já tramou contra seus irmãos e irmãs — além do roubo dos Rubis da Virtude, também teria sussurrado nos ouvidos de Glórienn, incitando-a a trair Tauron e causando a morte do Deus da Força. Por tudo isso, Khalmyr é declaradamente seu inimigo, e seus cavaleiros em Arton têm como uma de suas principais missões caçar sszzaazitas e levá-los à justiça. Outros deuses honrados, como Lin-Wu e Thyatis, também desprezam o Senhor dos Segredos. Azgher é um inimigo tão ou mais ferrenho que Khalmyr: sendo por definição um vigia, o Deus-Sol despreza o que está oculto. E em Halak-Tûr, terra dos principais adoradores de Azgher, existiu o maior império sszzaazita da história, Zarkhass.

Mesmo deuses mais ardilosos, como Hyninn e Tenebra, mantêm distância de Sszzaas. Ambos usam de artimanhas e trapaças, mas não cruzam certos limites que, para o Mestre dos Mistérios, simplesmente não existem.

Isso não significa que nenhum deus do Panteão se aproxime de Sszzaas. Tanna-Toh e Wynna compartilham do interesse do Corruptor por conhecimento e magia, mas discordam de seus métodos — afinal, ambas acreditam em partilhar o que sabem. Ainda assim, rumores dizem que tanto a Deusa do Conhecimento quanto a Deusa da Magia já vieram confidenciar com o Deus Serpente a respeito de mistérios sobre os quais tinham grande interesse.

Arsenal é um caso ainda mais peculiar. Seria de se esperar que um deus guerreiro desprezasse os métodos sutis de Sszzaas, mas ele é acima de tudo um estrategista e, como tal, sabe o valor da dissimulação. Além disso, relatos falam sobre uma suposta aliança entre os dois no passado, quando o Deus da Guerra ainda era um mortal. Se isso é verdade, e se significaria um possível pacto entre os dois no presente, são perguntas ainda sem respostas.

Já Nimb não vê problemas em conversar com Sszzaas — mas quem entende os atos do Deus do Caos? Por fim, ninguém ainda sabe como o Deus Serpente irá se relacionar com Aharadak. Talvez ele lute ao lado do Panteão contra a ameaça da Tormenta — ou, talvez, execute sua traição suprema, abandonando a própria Criação em prol da ameaça rubra.` },
        { titulo: "Igreja e Clero", texto:
`A maior parte dos devotos de Sszzaas é atraída a este deus pela possibilidade de manipular outras pessoas e se beneficiar com isso. Acreditam que o verdadeiro poder não está nas armas, na riqueza ou mesmo na magia, mas na dissimulação. Para eles, poderoso é aquele que usa os recursos do inimigo para realizar seus objetivos. Vitorioso é aquele que faz os outros se sacrificarem em seu lugar.

Alguns poucos, porém, cultuam Sszzaas por um desejo genuíno de adquirir conhecimento considerado proibido, mas que não lhes parece maligno. De fato, em vilas rústicas dominadas por devotos de Khalmyr tradicionalistas e conservadores, dedicar-se a Sszzaas pode ser a única alternativa para certas pessoas adquirirem autonomia. Se tudo que um sulfure, lefou ou osteon experimentou foi ódio e preconceito, a postura de que “nada é proibido” pode ser muito atraente.

Seja como for, devotos de Sszzaas são malvistos em todo o Reinado e além, considerados criminosos pérfidos. Por esse motivo, o culto a este deus é realizado de forma secreta ou até mesmo solitária. Quando diversos devotos se reúnem, fazem-no em conclaves ocultos, comunicando-se à luz do dia apenas por gestos e sinais sutis.

Apesar disso, muitas cidades e castelos possuem sszzaazitas em posições de poder — embora, é claro, sem que ninguém saiba de sua devoção. Justamente por sua habilidade de descobrir informações e mantê-las em segredo, conseguem chantagear e manipular seus rivais para subir na sociedade, garantindo para si postos como conselheiros reais ou mestres de guildas.` },
        { titulo: "Avatar", texto:
`Normalmente, Sszzaas não quer ser reconhecido. Para isso, assume formas diferentes — pode ser um conselheiro educado de fala mansa, uma viúva rica precisando de ajuda, um menestrel de língua afiada e fofoqueiro… O único ponto em comum de todas as formas é que elas carregam uma adaga mágica de lâmina negra, a Inoculadora. Já quando deseja ser reconhecido, Sszzaas surge na forma de uma imensa serpente com cinco olhos ou de um homem alto e esguio, de cabelos longos e face encoberta em sombras, exceto por seus cinco olhos brilhantes.` },
      ],
    },
    {
      chave: "tannaToh", nome: "Tanna-Toh", epiteto: "Deusa do Conhecimento",
      nd: "20", ficha: "avatarDeTannaToh",
      dados:
`Outros Nomes. Mãe da Palavra; Guardiã da Mente; Mestra do Saber; Patrona do Pensar; Gilmek, entre os anões.
Áreas de Influência. Verdade, descobertas, escrita, artes, investigação, ensino, bardos, povos civilizados, cultura, ciência, livros, progresso.
Símbolo Sagrado. Rolo de pergaminho e pena.
Canalizar Energia. Qualquer.
Arma Preferida. Bordão.
Cores Significativas. Branco, amarelo, cinza claro.
Lema. “Nenhum conhecimento é proibido. Pergunte o que quiser.”`,
      abertura:
`Professores. Cientistas. Escritores.

Inventores, pesquisadores, exploradores. Se há uma pessoa buscando trazer à luz os segredos da Criação, Tanna-Toh estará a seu lado. Ela é a deusa de todos que criam, exprimem, investigam, calculam, deduzem, questionam, interpretam, buscam e oferecem conhecimento. Seu portfólio contempla todas as ciências, como matemática, geografia, filosofia e até astrologia. Mas, acima de tudo, contempla aquilo que permite preservar e transmitir conhecimento — a palavra escrita.

Enquanto os artonianos e até os próprios deuses se prendem a preocupações banais, como evitar a morte, um devoto de Tanna-Toh sabe que o único e real caminho para a imortalidade reside nas letras. A escrita permite que pessoas que morreram há milênios se comuniquem com os vivos, hoje. Que os filhos recebam instruções de seus pais, avós, bisavós… até os primórdios da civilização. Que construam sobre os alicerces do que aprenderam, que deixem registros sobre o novo saber construído, para ser usado de fundamento por seus filhos, netos e bisnetos. A primeira escritora da história foi Sirrannamena, a Rainha Barda. Em nome de toda a civilização, recebeu da deusa a dádiva da escrita, e só assim foi capaz de transferir seus conhecimentos para a posteridade e proteger seu reino da decadência. Há milênios Sirrannamena partiu para os reinos dos deuses, mas seus ensinamentos permaneceram — pois um texto escrito é, ao mesmo tempo, um presente para o mundo e a forma de o autor se tornar imortal.

Além de uma herança e uma conversa, o texto escrito possibilita a comunicação apesar das interrupções. Um mensageiro que escute um recado de seu senhor e o repita a um vassalo pode incorrer em alterações e esquecimentos, ao passo que o mensageiro que carrega uma carta conseguirá entregar a mensagem na íntegra. Da mesma forma, textos ancestrais resgatados por aventureiros em masmorras profundas podem ser decifrados, mesmo que o povo que o tenha escrito não mais caminhe sobre Arton. O texto é transmissão de pensamento, faz presente o que está ausente, tem caráter multiplicador e pode ser estendido e complementado. Isso é extremamente importante, visto que o conhecimento não pertence a uma só pessoa: é construído em conjunto, uma contribuição de cada vez.

Tanna-Toh, no entanto, é ainda mais do que a Mãe da Palavra. É reverenciada por aqueles que buscam o avanço de Arton através da intelectualidade, da curiosidade. Da ciência. Possui templos em quase todas as grandes cidades. Seus clérigos de maior prestígio costumam ocupar posições de respeito em cortes e instituições, e mesmo os clérigos andarilhos são recebidos com alegria e procurados por estudantes em busca de respostas. Recentemente, a deusa tem sido abraçada por povos que viram suas terras serem destruídas e buscam resgatar e preservar sua cultura, como elfos, tamuranianos e hynne. Contudo, para Tanna-Toh, tão importante quanto o resgate do passado é a construção do futuro. Novas ideias, novos inventos, novas técnicas. Novas teorias, novas obras, novos campos de conhecimento. É a erudição que impulsiona Arton à frente, e a deusa abençoa cada novo passo.`,
      secoes: [
        { titulo: "Motivações", texto:
`Tanna-Toh não tem um plano final para Arton, pois seu objetivo é a busca em si. Sempre haverá perguntas a responder, algum novo conhecimento a ser descoberto ou inventado. Ela valoriza a experiência acima da suposição. Sempre irá incentivar que ideias sejam colocadas em prática, mesmo que possam ter consequências ruins, pois deseja observar os resultados. Embora muitos povos vejam Tanna-Toh como uma deusa bondosa, há indícios de que ela não esteja tão comprometida assim com a índole de seus devotos.

Não são raros os casos de clérigos que usam seus poderes para o mal, ou cientistas devotos da deusa que fazem experimentos em cobaias inteligentes.

De fato, Tanna-Toh se preocupa mais do que tudo com a busca pelo saber. Para ela, nenhum conhecimento deve ser proibido. No máximo, preservado e resguardado. A verdade também é fundamental para Tanna-Toh, mesmo que seja desconfortável ou dolorosa.

Contar uma mentira para preservar sentimentos ou mesmo para evitar uma guerra é uma traição de seus ensinamentos. O conhecimento não deve ser destruído, acobertado ou mascarado.

O grande objetivo de Tanna-Toh é a compreensão total de toda a Criação.

Mesmo que vidas se percam nesse processo, seu legado estará preservado.` },
        { titulo: "Relações", texto:
`As relações de Tanna-Toh com o resto do Panteão são menos definidas por sentimentos e mais por admiração racional. Deuses ligados à verdade, à invenção, à inovação e à magia são próximos dela. Assim, Azgher, Wynna e até Thyatis se alinham com seus valores. O Deus da Ressurreição e da Profecia em especial tem seu apreço por apadrinhar a recente ciência da astrologia.

O mais perto que Tanna-Toh tem de um amigo é Khalmyr, com quem passa longas horas em animada deliberação a respeito da redação e interpretação de leis. Também tem relações de respeito mútuo com a maioria dos deuses bondosos, entre eles Lena, Marah e Lin-Wu.

A principal rixa de Tanna-Toh é com Sszzaas, que ela considera um deus mesquinho e egoísta. Apesar de ambos defenderem a busca por informações, discordam quanto ao destino a ser dado ao conhecimento.

Enquanto Tanna-Toh exige distribuí-lo ao mundo, o Senhor dos Segredos guarda tudo para si. Existem clérigos da Mãe da Palavra que dedicam suas vidas a invadir templos sszzaazitas e extrair de lá o conhecimento oculto para compartilhá-lo com a civilização. Tanna-Toh não gosta de Nimb, pois o caos causado por ele tira o foco dos estudantes, confunde a sistematização de dados e compromete os resultados de qualquer pesquisa. Já Tenebra instiga sua curiosidade.

Com seus segredos ocultos nas trevas, a Mãe Noite é um enigma a ser decifrado. Hyninn, como um deus de mentiras e dissimulações, é um dos maiores adversários de Tanna-Toh. Em sua eterna luta para expor a verdade, muitos devotos da Deusa do Conhecimento acabam em conflito com criminosos a serviço do Deus da Trapaça.

Existe rivalidade entre Tanna-Toh e Allihanna. Embora a Deusa da Natureza não seja inimiga da civilização, a doutrina de descobrir, estudar e sistematizar o mundo coloca a Mãe da Palavra em conflito com sua irmã. Cidades são território de Tanna-Toh, afinal. Já Megalokk é um real inimigo da Deusa do Conhecimento: seus dogmas não são apenas de ferocidade, mas também de ignorância e destruição.

A relação entre Tanna-Toh é Valkaria é um caso curioso. Os dogmas de ambição e evolução da Deusa dos Aventureiros parecem coincidir de forma quase perfeita com as doutrinas da Deusa do Conhecimento. Contudo, Valkaria parece muito apegada a viagens, combates, perigo pelo perigo. Alguns devotos já abandonaram Valkaria para se dedicar a Tanna-Toh por entender que sua ambição e sede de progresso são satisfeitas mais pelo trabalho em laboratórios do que por buscas incessantes e jornadas sem rumo.

Não se sabe como ou por que Tanna-Toh foi conivente com o julgamento de Khalmyr após a Revolta dos Três, visto que o veredito envolveu apagar memórias preciosas dos artonianos e até dos próprios deuses.

Sabe-se, no entanto, que para ela a sentença máxima foi dada a Kallyadranoch. Embora não seja exatamente uma aliada do Deus dos Dragões, Tanna-Toh ficou feliz em vê-lo retornar ao Panteão, a identidade do Terceiro finalmente revelada — pois, para ela, pior do que a morte é o esquecimento.

Aharadak desperta medo em Tanna-Toh. Mas não só isso. Desperta também sua curiosidade. Quais serão as próximas consequências da presença da Tormenta no Panteão?` },
        { titulo: "Igreja e Clero", texto:
`O clero de Tanna-Toh tem três funções principais: ensino, pesquisa e preservação do conhecimento. Entre essas, a primeira é de longe a mais difundida em Arton: todas as grandes cidades e muitas aldeias contam com professores clérigos de Tanna-Toh. A docência pode tomar a forma de aulas tradicionais para crianças, de clérigos-filósofos que ensinam pequenas turmas de jovens em diálogos e longas explanações informais, de palestras intrincadas para especialistas em áreas específicas do conhecimento e muitas outras. De qualquer forma, a alfabetização é uma das maiores conquistas do clero de Tanna-Toh. Mesmo aldeias que nunca viram um sacerdote desta deusa em geral sabem ler porque, em algum momento, algum antepassado de um aldeão teve contato com um clérigo e aprendeu, então transmitindo esse conhecimento adiante. Muitas vezes clérigos de Tanna-Toh são empregados como tutores para filhos de nobres ou vagam pelo continente como professores itinerantes, construindo escolas onde antes não havia nenhum centro de ensino.

A pesquisa, embora em geral menos visível que o ensino, é outro pilar do sacerdócio de Tanna-Toh. A igreja banca sacerdotes cujo único trabalho é produzir conhecimento novo, formular e testar hipóteses, tecer teorias sobre o funcionamento da Criação, mesmo que não tenham uso prático imediato. Sem isso, a ciência poderia ficar atrelada ao interesse de reinos e patronos poderosos, que poderiam não enxergar vantagem em pesquisas que não aumentassem sua influência ou fortuna. Curiosamente, essas pesquisas podem parecer fúteis ou absurdas para os leigos. Afinal, quem precisa saber por que os objetos caem para baixo e não para cima? Quem precisa entender por que lavar as mãos diminui as mortes em hospitais? Talvez ninguém.

Mas, para o clero de Tanna-Toh, mesmo esse estudo “inútil” é sagrado e transformador.

Por fim, o lado mais “aventuresco” da igreja de Tanna-Toh diz respeito à preservação do conhecimento. Muitos clérigos aventureiros exploram ruínas antigas, infiltram-se em territórios hostis e desbravam terrenos malditos em busca de pergaminhos, livros e outros registros que poderiam ser perdidos ou destruídos. Às vezes, esses registros têm uso prático: são magias ou rituais que não devem cair em mãos erradas. Outras vezes são relatos históricos, compilações de folclore e tradições culturais ou até ficção e poesia. Não importa; onde houver risco de que conhecimento seja perdido, haverá um sacerdote do Conhecimento disposto a arriscar a vida para recuperá-lo e preservá-lo.` },
        { titulo: "Avatar", texto:
`A aparência favorita de Tanna-Toh ao visitar Arton é a de uma anciã munida de várias bolsas pesadas de pergaminhos. O avatar de Tanna-Toh não costuma portar armas, com exceção de um eventual bordão, que usa mais para se apoiar na caminhada do que para atacar. Tanna-Toh já foi vista também na forma de uma barda tocando uma harpa e de uma cientista que parece dominar todos os campos do conhecimento. Ao contrário de outros deuses, Tanna-Toh nunca disfarça ou oculta sua verdadeira identidade.` },
      ],
    },
    {
      chave: "tenebra", nome: "Tenebra", epiteto: "Deusa das Trevas",
      nd: "S", ficha: "avatarDeTenebra",
      dados:
`Outros Nomes. Deusa das Trevas e dos Mortos-Vivos; Lulna, entre os minotauros; Luah-Kai, entre os trogloditas; Ayrelynn, entre os anões; Mãe Noite, entre os mortos-vivos.
Áreas de Influência. Noite, anões, mortos-vivos, licantropos, desobediência, criaturas noturnas ou subterrâneas, necromantes, tentação, trevas, pólvora.
Símbolo Sagrado. Estrela de cinco pontas.
Canalizar Energia. Negativa.
Arma Preferida. Adaga.
Cores Significativas. Preto, roxo, azul escuro.
Lema. “Algo tão belo quanto a noite não pode ser maligno.”`,
      abertura:
`Deusa das trevas, dos reinos cavernosos e das criaturas subterrâneas, Tenebra é a grande rival de Azgher, o Deus-Sol. Diz-se que, no início dos tempos, os dois lutaram para decidir quem reinaria em Arton. Khalmyr interveio, decretando um empate — por isso hoje cada deus domina o mundo durante doze horas.

Assim, Tenebra também é considerada a Deusa da Noite. No entanto, não é associada com a lua. Nada que quebra a escuridão faz parte de seu domínio. Para seus devotos, as trevas não são assustadoras ou opressivas; não são algo a ser evitado ou diminuído. Pelo contrário: o escuro oferece alívio contra a ofuscação e a vigilância constante do sol; seus mistérios são sedutores e instigantes, convidando a serem desvendados; o único temor que ele traz é o “medo” divertido de algo novo. Tenebra é a mãe de tudo que anda, voa ou rasteja no escuro — morcegos, vampiros, zumbis e todos os tipos de mortos-vivos são seus protegidos. Isso leva muitos a pensar que se trata de uma deusa maligna. Contudo, Tenebra não é má: protege igualmente todas as raças e criaturas noturnas e subterrâneas, oferece sua dádiva sombria a todos que ousam encarar a escuridão. É verdade, contudo, que Tenebra é uma deusa desafiadora, que questiona tradições e adora perturbar instituições formais. Seu humor ácido e sua percepção aguçada ajudam-na a expor hipocrisia e falhas nas crenças mais arraigadas. A Deusa das Trevas é uma tentadora suprema — nem sempre no sentido lascivo, mas compreendendo e oferecendo aquilo que pode abalar os tipos mais sisudos e austeros. Quando tem um grande objetivo, Tenebra o conquista usando sutileza, inteligência e sedução, não arroubos de grandiosidade. Não faz parte de seus modos enviar legiões de zumbis contra seus inimigos ou promover grandes rituais que ergam os mortos. Muito mais útil e divertido é obter vantagens através da colaboração de figuras neutras ou até mesmo hostis, minar o poder de seus inimigos sem atacá-los diretamente, observar tudo de longe, com um sorriso malicioso.

Nada exemplifica melhor a personalidade de Tenebra do que a raça anã. Os anões são filhos de Tenebra e Khalmyr, durante uma breve paixão. Já houve muitas especulações sobre o que teria acontecido: Tenebra teria “enganado” Khalmyr (como se o Deus da Justiça fosse uma criança ingênua...), ou apenas oferecido a ele a chance de ser progenitor de uma raça (como se a Deusa das Trevas fosse uma divindade de benevolência casta...), ou ainda teria corrompido os inocentes filhos de Khalmyr. Entre os próprios anões, houve durante séculos a versão “oficial” de que eles eram apenas cria do Deus da Justiça, com a devoção a Tenebra sendo abafada. A verdade, contudo, é que Khalmyr e Tenebra foram um casal, e dessa união surgiram os anões. A raça é trabalhadora, séria e austera — mas também inovadora, esperta e emotiva. A ligação de Tenebra com a pólvora vem daí: foi com essa substância que Tenebra incentivou a rebeldia nos anões, culminando na Revolta das Guildas e na ascensão de seu culto em Doherimm. Além disso, quando Rhumnam, a espada de Khalmyr, foi devolvida a Doherimm depois de ser roubada, um armeiro anão especializado em pólvora garantiu que ela fosse para sempre mudada. Rhumnam se tornou uma lâmina-pistola, um lembrete bem-humorado de Tenebra para o severo Khalmyr... Nada maligno, nada que o prejudique, mas uma marca eterna em sua retidão inquebrável.

Embora seja padroeira dos mortos-vivos e da necromancia, Tenebra não é associada com a morte.

Ela sempre teve ligação com o Deus da Morte, principalmente quando adotava a faceta mais inteligente de Leen, em vez do brutal Ragnar. Alguns teólogos afirmam que Tenebra está lentamente tomando para si o portfólio da Morte, governando um aspecto fundamental de Arton. Isso a tornaria tão onipresente e fundamental quanto Lena. Também se especula o significado cosmológico de ter a escuridão de Tenebra cercando a lua da Deusa da Vida todas as noites, se isso acontecer...

Quando se fala de Tenebra, há sempre outro lado a ser considerado, sempre alguma contradição a ser descoberta. A Deusa das Trevas não é inofensiva. Cultuá-la não é seguro. Ninguém pode afirmar com certeza que conhece tudo sobre ela. Tenebra é perigosa, cheia de mistérios, insondável como a escuridão. Seus atos malignos têm objetivos nobres, seus atos bondosos têm segundas intenções. Estar sob seu manto é permanecer escondido, mas também poder tropeçar em algo oculto. Porque as trevas sempre escondem mais do que mostram... E sempre mostram apenas o que desejam.`,
      secoes: [
        { titulo: "Motivações", texto:
`Até onde se sabe, Tenebra não mais deseja que a escuridão tome Arton para sempre. Talvez nunca tenha desejado: talvez toda a “guerra” contra Azgher tenha feito parte de algum estratagema que ninguém jamais compreendeu. Afinal, depois disso Tenebra nunca mais se envolveu diretamente em nenhuma guerra.

Contudo, é verdade que a Deusa das Trevas não renega devotos malignos ou cheios de planos megalomaníacos. Aslothia, o Reino dos Mortos, está repleto de seus cultistas, que usam seu poder para dominar a terra e oprimir populações vivas. Tenebra não ordenou que ninguém fizesse isso. E, na verdade, está pronta para abraçar e proteger esses oprimidos se eles escolherem a noite e a morte em vida...

Além de fazer seus filhos prosperarem e oferecer refúgio contra o sol e a luz julgadora, as motivações de Tenebra são incertas. Ninguém pode dizer que conhece todos os seus objetivos. Mas, depois de alguns grandes acontecimentos em Arton, é fácil questionar se não houve intervenção da Deusa das Trevas.` },
        { titulo: "Relações", texto:
`O grande inimigo de Tenebra é Azgher. Até onde se sabe, a Deusa das Trevas considera o Deus-Sol uma presença insuportável, um maníaco que precisa vigiar tudo e todos... Mas não o teme. Algo parecido pode ser dito de deuses como Lin-Wu e até mesmo Thyatis: esses guerreiros honrados e valorosos são chatos na visão de Tenebra; seus grandes juramentos de heroísmo a fazem bocejar.

Tenebra tem afinidade com Hyninn (compartilhando com ele aspectos como esperteza e sutileza), com Allihanna (protegendo criaturas noturnas da Deusa da Natureza) e com Megalokk (pois muitos monstros rastejam no escuro). Especula-se que ela tenha interesse por Thwor, o protegido de seu antigo aliado Ragnar, que mostrou ser mais inteligente que o Deus da Morte. Talvez o Deus dos Goblinoides seja apenas um brinquedo novo para diverti-la.

Com certeza a relação mais complexa de Tenebra é com Khalmyr. A ligação entre as duas divindades é inquestionável. Tenebra gosta de provocar Khalmyr, sabotar seus planos, incomodá-lo... Mas sempre de forma brincalhona e (quase) amigável. Além disso, ela não parece ver com bons olhos quando outros deuses o ameaçam.

O único inimigo verdadeiro e incontestável de Tenebra é Aharadak. É impossível seduzir o Deus da Tormenta, fazer qualquer pacto com ele, conter sua ameaça com sutileza. A Tormenta sinaliza o fim das trevas. Assim, Tenebra estaria disposta a se aliar com qualquer um para combatê-la.` },
        { titulo: "Igreja e Clero", texto:
`O culto a Tenebra toma várias formas. Em Doherimm, hoje em dia é a religião mais popular, lado a lado com o culto a Khalmyr. Em Aslothia, é o terreno de lordes malignos. Em Ahlen, é mais uma faceta do poder de nobres astutos. Entre os mortos-vivos, é uma forma de autopreservação.

Mas existem muitos cultos selvagens e brutais de Tenebra. Trogloditas não parecem ter nada em comum com os modos sutis e espertos da deusa, mas a cultuam mesmo assim. Existem até mesmo devotos de Tenebra que realizam sacrifícios de criaturas inteligentes, vendo a deusa como maligna e sanguinária.

Mais uma vez, existem muitas respostas — nenhuma totalmente certa, todas parcialmente erradas. A única certeza é que o culto a Tenebra está se tornando mais e mais aceito em todos os reinos. E cada um de seus devotos esconde algo.` },
        { titulo: "Avatar", texto:
`Quando vem a este mundo, Tenebra surge como uma vampira extremamente atraente ou, se não quiser ser reconhecida, adota a forma de uma velha bruxa ou de uma anã. Também pode se manifestar como uma sombra que nenhuma luz é capaz de dissipar, ou como uma presença oculta, sempre logo fora da visão. Ela nunca visita Arton durante o dia.` },
      ],
    },
    {
      chave: "thwor", nome: "Thwor", epiteto: "Deus dos Goblinoides",
      nd: "18", ficha: "avatarDeThwor",
      dados:
`Outros Nomes. Thwor Khoshkothruk; Thwor Ironfist, entre os povos do norte; o Ayrrak.
Áreas de Influência. Duyshidakk, liberdade, guerra, vida, morte, anarquia, eclipses, lealdade, mudança, destino, superação, vingança, Akzath.
Símbolo Sagrado. Um grande punho fechado.
Canalizar Energia. Qualquer.
Arma Preferida. Machado de guerra.
Cores Significativas. Verde, vermelho, marrom, negro.
Lema. “O Mundo Como Deve Ser.”`,
      abertura:
`Thwor é um dos mais recentes e menos compreendidos deuses do Panteão.

Originalmente um bugbear nascido durante um eclipse e profetizado como um grande líder no continente de Lamnor, Thwor foi criado por clérigos de Ragnar, o antigo Deus da Morte. Uniu as raças goblinoides no povo duyshidakk, derrotou os elfos e pôs fim à Infinita Guerra. Conquistou o continente e se ergueu como uma das maiores ameaças aos reinos “civilizados” de Arton. Segundo a profecia, a única coisa que poderia matá-lo era “a Flecha de Fogo”, mas ninguém sabia o que isso poderia ser.

A Flecha de Fogo se revelou como um cometa em rota de colisão com Arton. Sua queda matou Thwor — e também Ragnar, que havia descido ao mundo material em forma humana. Foi então que a enormidade do plano do Imperador Supremo se revelou. A conquista do continente e união dos goblinoides era apenas o início. Cultuado por milhões de criaturas inteligentes, ele se tornou um deus, mas mesmo isso era apenas uma ferramenta para seu objetivo ainda não realizado: a criação de uma utopia goblinoide de liberdade, brutalidade e criatividade que mudaria Arton para sempre. Esse estado de caos exuberante e violento é conhecido como O Mundo Como Deve Ser.

Para compreender O Mundo Como Deve Ser, é preciso primeiro compreender o Akzath — uma façanha realizada por um mero punhado de pessoas.

O Akzath, a filosofia de Thwor, se baseia na noção de que não existe passado e futuro, nem causa e efeito. A realidade seria dividida em conceitos como Vida, Morte, Movimento, Estagnação e outros, em um círculo. Uma criatura próxima de alguns conceitos estaria longe de outros, o que afetaria tanto seu passado quanto seu futuro. Assim, por exemplo, um simples golpe de espada não poderia matar alguém. Se a vítima morrer, é porque ela e o agressor estão em pontos específicos do Akzath. Caso contrário, sobreviveria, não importa quão improvável isso pareça.

Isso contradiz radicalmente todas as leis naturais, assim como a maioria dos artonianos as conhece... Mas parece funcionar para os duyshidakk! O Akzath dita que é possível criar O Mundo Como Deve Ser: destruindo completamente todas as instituições, abolindo todas as formas de autoridade e ordem, a própria Criação seria libertada de suas amarras. Arton e tudo a seu redor se transformariam, construindo um estado de graça em que nenhuma criatura poderia oprimir outra. O mais poderoso deus e o mais reles inseto seriam igualmente livres.

Isso soa grandioso e pode ser compreendido (ao menos de forma superficial) pela maior parte dos devotos de Thwor. O que poucos ainda entendem é o que essa filosofia e esses objetivos significam no dia a dia. O que Thwor deseja que seja feito agora? Matar elfos? Destruir instituições? Unir goblinoides? Converter humanos, anões e outros?

A verdade é que Thwor não deixou instruções tão estanques. Muitos acham que foi por falta de tempo, mas outros acreditam que isso foi proposital. Para aproximar seus seguidores de Início, Continuidade e Vida no círculo do Akzath, Thwor também precisou aproximá-los de Ignorância e afastá-los de Estagnação. Ou seja, escolheu mantê-los no escuro.

O consenso geral, pregado pelo sumo-sacerdote Khorr’benn An-ug’atz, diz que um seguidor de Thwor não é um selvagem sanguinário. Não é a vontade de Thwor matar todos os elfos, humanos ou outras raças tradicionalmente inimigas dos duyshidakk. Violência desmedida não serve para criar O Mundo Como Deve Ser — um devoto não deve atacar fortalezas de ordens de cavalaria, incendiar palácios ou sabotar sedes de guildas comerciais. Essas instituições não mais existirão dentro da utopia, mas não é dever de fiéis individuais fazer isso acontecer através da destruição estúpida. Esse era o modo de Ragnar.

Thwor, assim como compreendido pela maioria de seus devotos, é essencialmente um deus de liberdade e união. Seus ensinamentos falam sobre destruir formas de opressão — mas usando meios, digamos, extremos. Quando os goblinoides se uniram como os duyshidakk, tecnicamente não atacaram nenhuma raça que já não os tivesse atacado antes, por séculos. Mas fizeram isso de forma brutal, chacinando reinos inteiros, extinguindo linhagens, apagando culturas. Thwor é um deus de vingança sangrenta, mas (ao menos sob certa ótica) justa. Diplomacia, negociação ou meios-termos com inimigos só devem ser usados em último caso. Seu povo só se libertou quando pegou em armas. Só assumiu sua identidade e sua cultura atuais quando massacrou aqueles que as abafavam. Existem canções jocosas que descrevem os deuses como um grupo de amigos numa mesa de taverna.

Nessas canções, Thwor é o “amigo que não sabe brincar”: divertido e agradável, leal e apaixonante. Mas, quando no fim da noite nota que a conta veio alta demais, decide queimar a taverna, chacinar a família do taverneiro e apagar do mapa a aldeia onde ela fica.`,
      secoes: [
        { titulo: "Motivações", texto:
`Thwor é definido por sua grande motivação: criar O Mundo Como Deve Ser. É um deus protetor das raças goblinoides e de todos os duyshidakk. Nesse ponto, é parecido com Lin-Wu: muito ligado a uma cultura específica, seus objetivos sempre passam pela preservação dessa cultura. Assim como Lin-Wu esteve envolvido com o combate à Tormenta por causa da tragédia que se abateu sobre Tamu-ra, Thwor pode ganhar novas facetas ou motivações de acordo com a história futura de seu povo.

Além do grande objetivo cósmico, Thwor almeja que a cultura duyshidakk floresça. Deseja que seu povo firme raízes, erga cidades, construa novos inventos, deixe sua marca em Arton. Quer que uma obra de arte duyshidakk seja tão reconhecível e valorizada pelos artonianos quanto uma escultura élfica ou uma ópera anã. Para Thwor, mais vale uma engenhoca goblin funcional do que mil inimigos mortos por um batalhão hobgoblin.

Em termos de motivações, Thwor também pode ser comparado a Valkaria. Enquanto a Deusa da Ambição criou os humanos para superar os deuses, o Deus dos Goblinoides tomou a liderança dessas raças para que libertassem o mundo. Objetivos grandiosos e talvez inalcançáveis, mas que guiam suas existências eternas.` },
        { titulo: "Relações", texto:
`Thwor não tem ainda relações muito firmes no Panteão. Seu grande inimigo, Ragnar, está morto. Não há nenhuma entidade que se oponha a ele com a mesma intensidade.

Lena é próxima de Thwor por seu aspecto de deusa da fertilidade. Da mesma forma, Thyatis faz parte da história de Thwor e incorpora um conceito fundamental para os goblinoides: segundas chances. Megalokk não deixa de ser um aliado valioso e Nimb será poderoso quando os duyshidakk criarem O Mundo Como Deve Ser.

Thwor não odeia Khalmyr, mas sabe que o Deus da Justiça será um adversário mais cedo ou mais tarde. Da mesma forma, a paz de Marah será um empecilho para sua utopia. Tenebra, associada aos mortos-vivos, é alvo da desconfiança de Thwor.

De forma surpreendente, Tanna-Toh é mais próxima de Thwor do que se imagina. As engenhocas goblins são exemplos do conhecimento e da ciência postos em prática. Valkaria pode no futuro ser uma inimiga, mas por enquanto sua ambição e desejo de libertação parecem muito com os ideais de Thwor.

Glórienn, há muito tempo não mais uma deusa maior, deixou de povoar os pensamentos de Thwor.

Ele pode ter certa pena dela, mas não hesitaria em espancá-la de novo se fosse necessário.` },
        { titulo: "Igreja e Clero", texto:
`O clero de Thwor ainda é desorganizado e não existe clareza sobre como seus sacerdotes devem se portar. O conjunto de “nãos” que já foi determinado pelo sumo-sacerdote ajuda, mas a maior parte dos fiéis gostaria de instruções diretas.

Os clérigos de Thwor se dedicam a libertar oprimidos, converter pessoas para a causa duyshidakk, combater tiranos e escravagistas e se vingar daqueles que são cruéis com goblinoides. Muitos são surpreendentemente cooperativos com aventureiros de outras culturas e raças — desejam mostrar que todos podem ser duyshidakk.

Existem congregações de Thwor, mas são pequenas e isoladas. É frequente que os clérigos precisem inventar suas próprias cerimônias, determinar seus próprios dias santos e decidir sua própria forma de louvar ao deus. Alguns afirmam que esse caos faz parte da construção do Mundo Como Deve Ser, e que nunca haverá uma maneira “certa” ou estanque de cultuar Thwor.` },
        { titulo: "Avatar", texto:
`Não se tem notícia de um avatar de Thwor. No entanto, muitos especulam que, quando surgir, será uma versão ainda mais impressionante do que o Ayrrak era em vida: um bugbear muito forte e inteligente, armado com um grande machado.` },
      ],
    },
    {
      chave: "thyatis", nome: "Thyatis", epiteto: "Deus da Ressurreição e da Profecia",
      nd: "19", ficha: "avatarDeThyatis",
      dados:
`Outros Nomes. Deus da Ressurreição, da Profecia e das Segundas Chances; Thyatis não é conhecido por outros nomes.
Áreas de Influência. Ressurreição, profecia, segundas chances, redenção, aventureiros, coragem, fogo.
Símbolo Sagrado. Uma ave fênix.
Canalizar Energia. Positiva.
Arma Preferida. Espada longa.
Cores Significativas. Laranja, ouro, amarelo.
Lema. “Todos merecem uma segunda chance.”`,
      abertura:
`Deus da Ressurreição e da Profecia, Thyatis se tornou conhecido em toda Arton após seu maior feito — Triunphus, a cidade da vida eterna. Foi Thyatis quem concedeu à cidade sua famosa bênção/maldição, que ressuscita aqueles que morrem dentro de suas muralhas, mas os prende lá para sempre. Esse e outros milagres grandiosos tornaram o deus notório no mundo todo, mas poucos o entendem.

Ao contrário de Khalmyr, Lena, Marah e até mesmo Tanna-Toh, divindades que incorporam conceitos familiares e compreensíveis para todos os artonianos, Thyatis personifica o desafio a dois elementos fundamentais da existência: a morte e a imprevisibilidade do futuro. Poucos conseguem absorver esse portfólio ao ponto da verdadeira devoção.

Thyatis, assim, é um deus esotérico, misterioso, insondável. Mais cultuado por aventureiros, estudiosos e sábios do que por gente comum. Era uma das divindades principais apenas no antigo reino de Tyrondir, onde havia triagem no próprio exército, em busca de recrutas com o potencial de se tornar paladinos do deus. Também em Tyrondir (atualmente em suas ruínas) fica a cidade de Sternachten, povoada por astrólogos de Thyatis, dedicados a observar as estrelas e prever o futuro. Para um artoniano médio, a morte é o fim, e só resta rezar para que as almas sejam levadas a reinos divinos paradisíacos. O futuro é insondável. A luta contra o mal se resume a, no máximo, chamar a guarda para apanhar algum criminoso. E a observação dos céus revela apenas se vai chover...

Thyatis, no entanto, não é um deus elitista. Seus mistérios não são propositais e ele acredita que todos são capazes de decifrá-los. O que define Thyatis é otimismo e coragem. Todos merecem uma segunda chance: nenhum crime é imperdoável, nenhum erro é irreparável. Mesmo uma vida inteira de devassidão pode levar a um futuro heroico. Contudo, talvez “perdão” não seja a melhor palavra para definir a postura de Thyatis. Este deus não esquece, não apaga o passado de um vilão. Para ser redimido, alguém precisa ativamente corrigir seus erros, embarcar em um caminho de heroísmo, colocar-se em perigo em nome dos outros.

Não à toa, pessoas ressuscitadas por clérigos de Thyatis costumam receber a imposição de uma missão ou tarefa grandiosa, para fazer valer sua segunda chance. Segundo o deus, qualquer um, mesmo um ancião que passou a vida toda como servo, pode se tornar um herói. Nada está fora do alcance de ninguém, basta coragem e esforço para se tornar um herói.

Essa filosofia de cobranças altas e até mesmo inclemência fica evidente em outro aspecto importante de Thyatis: o fogo. O deus costuma ser retratado como uma fênix (ele mesmo se submetendo ao ciclo de morte e renascimento) e seu reino divino é repleto de chamas. Seus devotos muitas vezes se veem testados com incêndios, vulcões e outras provações semelhantes. Boatos falam sobre um vulcão em Arton chamado Olho de Thyatis, onde seria possível morrer e ser ressuscitado em novas formas, até mesmo unindo duas criaturas em uma só. É claro, isso exige ser incinerado em lava primeiro... Nada é fácil, indolor ou desprovido de desafio com Thyatis — mas ele sabe que seus desafios podem ser vencidos.`,
      secoes: [
        { titulo: "Motivações", texto:
`Thyatis é movido por otimismo, perseverança e uma certeza inquebrável de que todos os desafios podem ser vencidos, todos os obstáculos podem ser superados. Além de suas alcunhas “oficiais” e do apelido onipresente “Deus das Segundas Chances”, alguns fiéis chamam Thyatis de “Deus do Futuro”. Quase tudo sobre Thyatis tem a ver com a noção de futuro: as profecias, claro, mas também a noção de que (apesar das profecias!) o futuro pode ser mudado — para melhor. Este deus apresenta uma coragem inabalável.

Enquanto outras divindades guerreiras e bondosas enfrentam as grandes ameaças com muita seriedade, até fatalismo e melancolia, Thyatis acredita que o bem e os artonianos irão triunfar. Não é tolo ou iludido, mas é muito orgulhoso e confiante. Até hoje, apenas a Tormenta apresentou um problema que Thyatis não fosse capaz de descartar. Se a Tempestade Rubra for capaz de destruir o passado e o futuro, a vida e a morte, nem mesmo a Fênix pode retornar das cinzas. Thyatis não deseja mais poder para si, nem tem um grande objetivo a cumprir em Arton. Para ele, não faz diferença se seus clérigos e paladinos forem um mero punhado ou fileiras infindáveis. Seu único interesse é ver Arton como um todo manter o espírito de aventura e superação que guiou a história do mundo até aqui. Como seria de se esperar, o Deus da Ressurreição não tem paciência nenhuma com autopiedade ou com aqueles que se entregam sem lutar. Se um devoto usa seus dons divinatórios para perguntar a Thyatis quando é hora de desistir, a resposta é sempre a mesma: nunca. No máximo, o deus aconselha uma mudança de métodos ou um pouco mais de preparação para cumprir alguma tarefa. Uma vez que haja uma meta, apenas um covarde a abandona. E a única segunda chance que covardes merecem é a de se mostrar valentes.` },
        { titulo: "Relações", texto:
`Thyatis tem relações próximas com todos os deuses heroicos. Seus grandes aliados são Khalmyr, Valkaria e Tanna-Toh. Os dois primeiros, pelo senso de aventura e heroísmo que inspiram. A terceira, por sua natureza misteriosa e por seus devotos que transformaram profecia em ciência.

Thyatis tinha uma relação curiosa com Ragnar, o antigo Deus da Morte. Foi Thyatis quem escreveu a profecia da Flecha de Fogo, que anunciava o nascimento e a morte de Thwor, a pedido de Ragnar. Originalmente, essa profecia seria apenas uma maneira de causar imenso morticínio e alavancar o poder do Deus da Morte. Foi pela intervenção de Thyatis, que inseriu elementos de redenção, superação e heroísmo na história futura do Ayrrak, que tudo se desenrolou de forma que Ragnar morresse e Thwor ascendesse. Isso mostra que, embora os dois deuses fossem adversários, Thyatis não temia Ragnar — seu triunfo perene sobre a morte lhe parecia garantido.

Thyatis enxerga Thwor com orgulho, embora questione seus métodos. Vê o bugbear que se tornou deus como prova de que a morte é apenas um obstáculo contornável e que até mesmo um “monstro” pode, no fim, triunfar contra uma divindade maior.

Como não poderia deixar de ser, o único deus que Thyatis realmente odeia, e que representa algum perigo para ele, é Aharadak. Paladinos de Thyatis tiveram papel importante na chegada da Tormenta a Arton e o próprio deus foi confiante demais ao pensar que a Tempestade Rubra não pudesse atingi-lo. Ele considera esse seu pior momento e não poupa esforços para corrigir o erro, instigando seus devotos a combater a Tormenta. Se Thyatis tivesse poder para isso, derrubaria Aharadak do Panteão imediatamente.` },
        { titulo: "Igreja e Clero", texto:
`Sacerdotes de Thyatis não costumam ser líderes de congregações ou guias espirituais de comunidades. São mais comuns como oráculos, estudiosos ou guerreiros. Os oráculos de Thyatis existem tanto em grandes cidades (o Oráculo de Triunphus sendo o mais famoso) quanto isolados nos ermos. Invariavelmente cobram alguma missão ou busca de quem lhes pede visões do futuro. Não é incomum que essas missões acabem por concretizar o futuro que foi previsto.

Talvez a maior concentração de clérigos de Thyatis no mundo conhecido seja a cidade de Sternachten, nas Ruínas de Tyrondir. A cidade foi destruída por uma ordem de vilões anos atrás, mas está sendo reconstruída. Lá, clérigos estudiosos praticam a ciência da astrologia, usando telescópios sagrados para observar as estrelas, então interpretando seus movimentos através de matemática santa. No passado, a capital de Tyrondir, Cosamhir, abrigava o Grande Templo de Thyatis, um dos únicos centros de culto ao deus frequentado por plebeus, burgueses e outros não aventureiros. No entanto, o templo foi destruído pela queda da Flecha de Fogo, aumentando ainda mais a distância entre o clero de Thyatis e o povo comum.

Paladinos de Thyatis tiveram papel decisivo na história recente de Arton. Raros, mas sempre com grande destaque, são armas valiosíssimas para qualquer grupo de aventureiros, por sua capacidade de voltar da morte. Assim como todo devoto deste deus, são proibidos de matar criaturas inteligentes, mas protegem seus companheiros com a própria vida — de novo e de novo.` },
        { titulo: "Avatar", texto:
`Muitos dizem que avistar um avatar de Thyatis é garantia de morte — seguida ou não de ressurreição. Assim, existe a crença de que este deus raramente se manifesta como avatar. Quando escolhe vir a Arton, Thyatis toma a forma de uma enorme fênix flamejante.` },
      ],
    },
    {
      chave: "valkaria", nome: "Valkaria", epiteto: "Deusa da Aventura",
      nd: "S+", ficha: "avatarDeValkaria",
      dados:
`Outros Nomes. Deusa da Humanidade, da Ambição e da Aventura; Deusa da Ambição; Mãe da Humanidade.
Áreas de Influência. Humanos, ambição, ousadia, evolução, conquista, aventuras.
Símbolo Sagrado. A Estátua de Valkaria, ou seis faixas entrelaçadas.
Canalizar Energia. Positiva.
Arma Preferida. Mangual.
Cores Significativas. Vermelho, púrpura.
Lema. “Valkaria não criou os humanos para se ajoelharem perante os deuses. Ela os criou para superá-los.”`,
      abertura:
`os vintes deuses maiores são poderosos, esplêndidos, senhores dos aspectos mais fundamentais da existência. Mas não são invencíveis, nem infalíveis, nem perfeitos. Aqueles que os louvam exaltam suas qualidades e domínios em detrimento de suas limitações. Não é diferente com Valkaria, talvez a mais imperfeita entre as divindades, mas também a mais amada e glorificada.

Valkaria é a deusa criadora da raça humana. O povo eleito, aqueles que conquistaram Arton, fizeram sua história. Aqueles com o maior potencial para o bem e o mal, nobreza e perfídia, heroísmo e vilania. Os que nunca descansam, que sempre buscam ter mais, poder mais, ser mais. Nenhuma meta ou carreira, nenhuma arte ou ciência, nenhum objetivo ou destino está além de seu alcance. Um povo que compartilha os traços mais fortes de sua padroeira: aspiração, insatisfação e ambição sem limites. Não sem motivo, antes da Tormenta, Valkaria e seus humanos já foram considerados por outras raças como o flagelo de Arton. Entre seus vários títulos, Valkaria é amplamente lembrada como a Deusa da Ambição — de modo positivo ou negativo. Humanos e outros devotos tratam “ambição” como sinônimo de aspiração, determinação, perseverança e entusiasmo; são as qualidades que fazem prosperar os povos. Outras raças, contudo, associam esse traço a ganância, cobiça, egoísmo e oportunismo. Consideram os humanos como pragas de gafanhotos, que ocupam e devoram tudo. Para eles, Valkaria é uma divindade perigosa, que demanda toda cautela.

Valkaria é também a padroeira dos aventureiros, pois são eles — mesmo quando não humanos — que melhor representam a paixão humana por conquistas e desafios. Grupos de heróis abandonam o conforto de suas famílias e comunidades (ou nunca o tiveram em primeiro lugar) para empreender longas jornadas, desbravar ermos, explorar masmorras, caçar tesouros e derrotar monstros. São aqueles que correm os maiores riscos em busca das maiores recompensas — ou, melhor ainda, consideram a aventura sua própria recompensa! Quanto mais ousados, mais atrevidos, mais Valkaria os ama. Às vezes os ajuda (não demais, pois sem risco não há glória). E outras vezes torna o caminho mais perigoso, também assegurando que o prêmio seja generoso.

Mas a ambição de Valkaria foi causadora de sua maior tragédia — ou pior, a maior tragédia da história de Arton. Um dia, no passado remoto, ela conspirou com outros dois deuses: Tilliann, então Deus dos Gnomos, e Kallyadranoch, o Deus dos Dragões. Juntos, trouxeram à luz um povo como nenhum outro deus ousou criar. Eles somariam a coragem e ambição desmedidas de Valkaria, a astúcia e curiosidade infinitas de Tilliann, o orgulho e poder supremos de Kallyadranoch. Com tais atributos, seriam invencíveis entre as criaturas mortais. Em algum momento, até mesmo entre os deuses! Eles seriam nomeados lefeu. Os outros deuses perceberam o ato pecaminoso.

Encontraram as criaturas lefeu pouco após sua gênese, ainda iniciando seu crescimento. Avançaram contra suas muralhas, incendiaram suas torres, despejaram apocalipse sobre suas fortalezas. Também combateram os três rebeldes, pois eles não aceitariam o morticínio de seus filhos sem resistência. Mas a Revolta dos Três foi contida e os lefeu, extintos. Ou assim se acreditou: aquele povo, resiliente como nenhum outro, deixou sobreviventes. Em sua Anticriação, voltaram a prosperar, ligeiros, famintos, irrefreáveis. Tornaram-se a Tormenta. Então encontraram Arton, agora eles próprios como agressores e invasores.

Cada deus infrator receberia sua punição. Valkaria, como hoje é bem sabido, acabou aprisionada em uma estátua gigantesca. Seu status como deusa maior foi mantido, mas também limitado: em pontos distantes do colosso a deusa mal era lembrada e seus clérigos não podiam conjurar milagres. Como condição para ser libertada, um fantástico labirinto planar foi forjado por todos os deuses; quando o desafio e seus guardiões fossem vencidos, Valkaria seria livre outra vez. Assim, séculos mais tarde — quando uma metrópole populosa já se espalhava à sombra da diva descomunal —, um grupo de aventureiros foi convocado pelo sumo-sacerdote da deusa para fazer frente ao desafio. Vitoriosos, eles foram aclamados como os Libertadores de Valkaria.

A Deusa da Aventura está livre.

Mais que isso, ela agora comanda o próprio Panteão. Um evento com consequências que nem todos estão prontos para enfrentar.`,
      secoes: [
        { titulo: "Motivações", texto:
`Valkaria ama a humanidade, mas não rejeita devotos de povos diferentes. Assim como os humanos acolhem elfos, anões, hynne e outros em suas cidades vibrantes, a Deusa da Aventura também traz o coração aberto a todos dispostos a venerá-la — pois, ela bem sabe, ser seu devoto não é exatamente fácil. Ainda que gentil e amorosa, Valkaria está sempre disposta a tornar a vida de seus seguidores “interessante”: ela causa infortúnios na mesma medida em que derrama bênçãos, sempre testando seus queridos, sempre oferecendo problemas e obstáculos — que, uma vez superados, resultam em recompensas merecidas.

Diferente de outros deuses, Valkaria nunca buscou glória para si mesma. Seu maior sonho não é nenhum segredo: ela anseia que os mortais superem os deuses.

Criou os humanos (e talvez tenha criado os lefeu) com esse objetivo. Arsenal foi o primeiro humano a realizar tal conquista, para sua satisfação completa. Muitos no Panteão, sobretudo os deuses mal-intencionados, estão satisfeitos com a liderança flexível de Valkaria. Mas esses talvez não entendam por completo suas intenções reais: ela sonha com uma Arton tão plena e poderosa que os próprios deuses se tornem obsoletos. Alguns duvidam que tal coisa venha a ocorrer, outros estão muito cientes do perigo, e uns poucos não discordam de todo.` },
        { titulo: "Relações", texto:
`Valkaria não lidera do mesmo modo que Khalmyr e Tauron antes dela, longe disso. É uma deusa de liberdade e rebeldia; acha inaceitável impor suas próprias resoluções sobre outros, isso vai terminantemente contra sua índole. A atual líder do Panteão prefere que cada divindade seja responsável por seus próprios domínios e sofra as consequências de seus próprios atos. Diz-se que, graças a essa postura, existe pouquíssima oposição a sua liderança; sabendo que seria assim, a maioria dos deuses teria aceitado sua ascensão justamente para preservar suas próprias liberdades.

Nem todos concordam, claro. Deuses rígidos como Azgher, Lin-Wu, Khalmyr e Tanna-Toh consideram essa regência desleixada e irresponsável, deixando irmãos perigosos como Sszzaas, Thwor, Kallyadranoch e outros livres para agir impunemente, trazendo desgraça a Arton. A Deusa da Ambição refuta tais críticas, alegando que os deuses devem ser livres para seguir suas naturezas. E, quando seus atos resultam em adversidades para os mortais, ela confia que os desafios serão superados.

Valkaria tem melhores relações com Wynna, Thyatis, Nimb, Arsenal e — apesar de tudo — Khalmyr. Sua postura com Aharadak é um mistério; ela foi uma criadora original dos lefeu mas, ao mesmo tempo, não seria admissível tolerar a Tormenta. Ou seria?` },
        { titulo: "Igreja e Clero", texto:
`Ainda que Valkaria seja atualmente a divindade mais amada e popular de Arton — sobretudo na capital do Reinado, onde reside a estátua —, a quantidade de devotos legítimos é comparativamente pequena. Isso se explica porque seus dogmas proíbem longa permanência no mesmo local, impedindo assim que moradores fixos de Valkaria (ou de qualquer outro lugar) abracem sua devoção. São muitos aqueles que glorificam a deusa e exaltam seu nome, mas devotos verdadeiros, que conjuram seus milagres, são bem mais raros. Mesmo os sacerdotes responsáveis por suas várias igrejas revezam seus postos de tempos em tempos. Por razões óbvias, Valkaria é a divindade com mais adeptos entre aventureiros. Eles são considerados seus eleitos, os mais queridos entre os mortais; a deusa aceita todos eles, independente de raça, como devotos.

Dizem que a alma de qualquer aventureiro morto em missão pode acabar em Odisseia, o Reino de Valkaria, onde seus companheiros podem (tentar) resgatá-lo. Além de aventureiros, quase todos os devotos de Valkaria são trabalhadores cujo modo de vida demanda viagens constantes: mercadores, marinheiros, mensageiros, diplomatas, caçadores, trovadores, artistas itinerantes, soldados mercenários e outros.` },
        { titulo: "Avatar", texto:
`Exceto talvez por Nimb, nenhuma outra divindade usa aparências tão variadas quanto Valkaria. Quando visita o mundo mortal (o que ela faz muito mais vezes do que seria prudente), a deusa pode surgir como alguém alta ou baixa, esbelta ou robusta, de qualquer etnia. Como única constante, será uma mulher humana. Mas a deusa tem algumas personas favoritas.

Algumas vezes surge como a célebre estátua, invocando a imagem da dama em apuros, inspirando heróis a salvá-la. Em outras, será uma barda jovial ou uma guerreira mercenária (como fez muitas vezes quando estava em cativeiro, exclusivamente nos limites da cidade). Ou, quando deseja ser reconhecida, usa sua forma esplendorosa em armadura resplandecente, como líder do Panteão.

Valkaria quase nunca entra em combate como avatar — porque isso significa roubar de seus amados heróis uma oportunidade de vitória. Mas houve a ocasião em que enfrentou seus próprios Libertadores, como a última guardiã no Labirinto de Valkaria, com toda a sua força.` },
      ],
    },
    {
      chave: "wynna", nome: "Wynna", epiteto: "Deusa da Magia",
      nd: "S", ficha: "avatarDeWynna",
      dados:
`Outros Nomes. Dallia, entre os elfos.
Áreas de Influência. Magia, arcanistas, gênios.
Símbolo Sagrado. Anel metálico, com ou sem runas.
Canalizar Energia. Qualquer.
Arma Preferida. Adaga.
Cores Significativas. Cinza, ou as seis cores da magia combinadas: verde azulado, vermelho, azul, verde, branco, preto.
Lema. “A magia é mais preciosa que a vida. Como tal, não deve ser negada a ninguém.”`,
      abertura:
`É consenso geral que os deuses forjaram e povoaram Arton. Tudo que compõe o mundo, tudo que torna a vida possível, é presente do Panteão. Também é consenso que, sem magia, Arton não poderia seguir existindo. A sobrevivência em um mundo desprovido de mágica simplesmente não seria possível — não apenas pela proteção, conforto e possibilidades que oferece, mas também porque essa força misteriosa promove o funcionamento de tudo. Os deuses exerceriam seu poder sem meios mágicos? Como explicar o movimento dos astros no céu, as estações do ano, os milagres da natureza, senão por magia?

Em uma tentativa de trazer luz a esse mistério, acadêmicos classificam a magia em dois tipos fundamentais: divina e arcana. A primeira é ofertada pelos deuses, provém de seus favores; eles são sua fonte, utilizam-na para criar vida, fazer funcionar as leis naturais, conceder milagres a seus campeões. Quanto à segunda, sua origem e natureza nem sempre encontram explicação satisfatória. Alguns dizem ser um recurso natural da Criação, algo que precede os próprios deuses. Algo tão abundante e grandioso que nenhuma divindade, sozinha, poderia prover.

Para outros, contudo, não existe dúvida. Toda a mágica arcana é um milagre trazido por Wynna, a absoluta Deusa da Magia.

Por suprir algo tão fundamental à existência do mundo e à vida como conhecemos, Wynna está entre as divindades mais importantes, bondosas e generosas. Mágica é sua dádiva a cada ser vivente, disponível para todo e qualquer indivíduo disposto a estudá-la. É o instrumento supremo para trazer prosperidade, felicidade e dignidade aos povos. Graças a esse poder os mortais erguem torres fabulosas e cidades esplêndidas, transportam-se além dos horizontes, mantêm monstros distantes. O domínio da magia arcana atesta o avanço da civilização. Mágica arcana é abundante, está ao alcance de todos que escolhem conjurá-la (e até de alguns que não escolhem). Todo arcanista pode, com empenho, se tornar um grande arquimago — seja devoto de Wynna ou não. Aqueles que louvam seu nome, no entanto, são agraciados com suas bênçãos. A deusa ama arcanistas, bardos, todos que aceitam sua dádiva. Ama mais ainda aqueles que escolhem usar esses poderes para benefício de outros, para tornar vidas felizes, para afastar o mal. Dizem seus seguidores: “A magia existe para desfrutar da vida, a vida existe para desfrutar da magia.”

Ainda que nem todos concordem quanto à procedência da mágica, Wynna é honrada e respeitada por quase todos os arcanistas. Sua compaixão é amplamente reconhecida. Contudo, a deusa também tem sua face caprichosa, enciumada e rancorosa.

Viajantes planares experientes, que tenham visitado outros mundos, contam histórias sobre como as coisas funcionam longe de Arton. Existem ciências e fórmulas mundanas sofisticadas, capazes de produzir engenhos técnicos extraordinários — cujos efeitos rivalizam as magias mais poderosas. Máquinas para fabricar todo tipo de item, falar por longas distâncias, produzir fogo e luz, conservar alimentos, viajar por terra, ar e mar. Em Arton, contudo, muitos tipos de máquinas simplesmente não funcionam. Um experimento repetido da mesma forma não vai produzir sempre o mesmo resultado. Por isso certas áreas da ciência parecem coisa de inventores loucos.

Para muitos, isso parece algo natural. Para outros, são os deuses que impedem o funcionamento da tecnologia em Arton. E para outros mais, a maior responsável por barrar a ciência é Wynna. A enciumada Deusa da Magia considera ofensa indesculpável quando mortais rejeitam seu grande presente, buscando formas anômalas de realizar suas façanhas.

Aqueles que tentam implementar avanços técnicos no Reinado, sem sucesso, afirmam ser ela a responsável. Muitas vezes acabam acusados de tentar apontar outros culpados para suas próprias falhas. Por esse e outros motivos, engenhos tecnológicos têm péssima reputação por toda Arton.

Assim, para aqueles que acolhem sua dádiva arcana, Wynna é a mais amorosa e caridosa das divindades. Mesmo os que não acreditam em sua procedência divina, mas ainda utilizam magia, são tratados com ternura e paciência. Quanto aos que recorrem a outros caminhos, deveriam se acautelar, pois a deusa lhes reserva seu profundo rancor.`,
      secoes: [
        { titulo: "Motivações", texto:
`Wynna deseja ardentemente que todos aceitem e respeitem suas bênçãos. Por bondade e também vaidade, ela busca ser provedora daquilo que é mais importante para toda Arton. Quando os povos recorrem à mágica arcana para engrandecer suas sociedades, a deusa se regozija.

Wynna anseia que a mágica seja usada para o bem, para trazer felicidade, segurança, progresso. Contudo, não nega esse poder àqueles com propósitos malignos, aos que buscam prejudicar o próximo, usar magia para roubar, escravizar, matar. A deusa lamenta tais atos, mas privar qualquer criatura de utilizar sua dádiva seria, para ela, algo ainda mais cruel. Se mesmo ao pior assassino é permitido manter a própria vida, não poderia ser diferente com a magia.

Igualmente lamentável é quando os mortais recorrem a itens encantados em vez de conjuração tradicional. Para a deusa, receber benefícios da magia sem dominar a conjuração soa como preguiça ou trapaça. Mais uma vez, Wynna não proíbe a confecção ou o funcionamento de tais utensílios, nem odeia seus forjadores e usuários, mas enxerga-os como crianças travessas. Os únicos que a deusa realmente despreza são aqueles que descartam o uso de magia por completo, procurando substitutos profanos.` },
        { titulo: "Relações", texto:
`Wynna e Valkaria se consideram irmãs próximas, havendo ocasiões em que desafiam uma a outra, fazendo apostas divertidas quanto ao comportamento de seus seguidores. Mas essa relação pode azedar quando Valkaria favorece seus devotos inventores, os aventureiros menos preferidos por Wynna. Em tempos recentes, uma disputa relacionada a um jovem inventor wynllano causou grande transtorno. A deusa também teme que a despreocupada Valkaria, agora líder do Panteão, acabe vítima de algum plano de deuses traiçoeiros.

Wynna tem relação parecida com Tanna-Toh, pois ambas valorizam a busca por novos conhecimentos, arcanos e mundanos. A Mãe da Palavra, contudo, é também patrona de inventores; seu favor recai sobre aqueles que buscam novas ciências e tecnologias, o que Wynna considera ofensivo.

Mas se a deusa tem um inimigo verdadeiro, é Kallyadranoch. Quando o Deus dos Dragões retornou ao Panteão, retomou seu antigo título como Deus dos Magos — sobretudo magos malignos, arrebatando esses seguidores. Wynna se entristece quando mágica arcana é usada para mal, e isso é exatamente o que devotos de Kallyadranoch fazem.

Wynna também não simpatiza com deuses de violência e selvageria, como Arsenal, Megalokk e Thwor.` },
        { titulo: "Igreja e Clero", texto:
`O culto a Wynna é vasto e difundido, com grandes templos por todo o Reinado, sobretudo na nação de Wynlla. Sem muita surpresa, o local de maior adoração é a Grande Academia Arcana, seu presente ao arquimago Talude para uma grande missão: difundir o ensino da conjuração arcana por toda Arton. Com o próprio Mestre Máximo afastado, Wynna hoje observa de perto seu novo e prestigioso reitor, Vladislav Tpish.

Wynna também é servida por um número incontável de cultos menores, formados por arcanistas com seus próprios métodos de conjuração e adoração.

Desde os misteriosos mestres mahou-jutsu, que combinam mágica com artes marciais, aos garbosos guerreiros mágicos, que canalizam poderes com suas lâminas, passando pela Ordem do Vazio, que conjura usando ingredientes exóticos.

Também dignos de destaque são os qareen, praticamente nascidos como devotos de Wynna; muito poucos membros dessa raça escolhem praticar devoção a outra divindade. Embora não sejam considerados uma igreja organizada, são os mais numerosos e convictos devotos da Deusa da Magia.` },
        { titulo: "Avatar", texto:
`Wynna visita Arton com razoável frequência. Ela pode ser vista em cerimônias e eventos especiais na Academia Arcana, nas maiores cidades de Wynlla e também na capital Valkaria — onde tem seu próprio camarote na luxuriosa casa de espetáculos Canção das Deusas. A Deusa da Magia se manifesta como uma maga exuberante de cabelo esverdeado e olhos brilhantes de cores variadas, diferentes a cada vez que são observados. Muitas vezes era representada trajando fitas coloridas unidas por anéis metálicos, que adornam escassamente seu corpo, mas tem sido mais comum vê-la em vestidos elaborados.

Por sua vaidade, é raro que Wynna utilize outra aparência. Quando deseja passar despercebida, contudo, surge como uma bruxa em sua vassoura, um humano ilusionista gordo e bonachão, um jovem mago de chapéu pontudo ou outro conjurador arquetípico. Também houve vezes em que tomou emprestada a forma de Nielendorane de Lenórienn, arquimaga élfica lendária hoje residindo em seu reino divino.` },
      ],
    },
  ],
};
