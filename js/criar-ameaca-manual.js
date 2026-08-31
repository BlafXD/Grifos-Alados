// ═══════════════════════════════════════════════════════════════════
//  CRIAR-AMEACA-MANUAL.JS — o texto do "Manual de Criação de Ameaças"
//  Ameaças de Arton, Capítulo 2 (p. 377–389), transcrito do PDF.
//
//  Marcação dos textos: [[chave|trecho visível]] vira uma nuvem de
//  regra (span.ga-tip) com o conteúdo de REFERENCIAS[chave]. É o que
//  evita abrir o outro livro só para conferir a regra referenciada —
//  passar o mouse já mostra o texto dela.
//
//  Tipos de bloco: {p}, {sub}, {lista}, {quadro:{titulo,texto}},
//  {exemplo}, {tabela:'id'} (a tabela é desenhada pelo criar-ameaca.js),
//  {ficha} (statblock no formato do livro).
// ═══════════════════════════════════════════════════════════════════
window.GA_CRIAR_AMEACA_MANUAL = (function () {
  'use strict';

  // ── REFERÊNCIAS CRUZADAS (as nuvens de [[chave|…]]) ──────────────
  //  Cada uma foi copiada da página que o manual manda consultar, para
  //  a regra aparecer aqui em vez de exigir abrir o livro.
  const REFERENCIAS = {
    'papeis': {
      titulo: 'Papel de Combate',
      fonte: 'Ameaças de Arton, p. 12',
      texto: 'Existem três papéis, cada um indicado por um ícone.\n\n' +
        'SOLO. A criatura foi construída para enfrentar os personagens sozinha. Possui estatísticas equilibradas; em especial, muitos pontos de vida, para o combate durar um tempo bom (3 a 5 rodadas). Ocupado principalmente por grandes monstros e vilões.\n\n' +
        'LACAIO. Construída para enfrentar os personagens em grandes quantidades — várias criaturas de ND menor que o nível do grupo (um grupo de 5º nível pode enfrentar quatro lacaios de ND 1, um encontro de ND 5). Ataque e dano mais altos, para continuarem sendo risco real; menos PV, para serem derrotados rápido. Ocupado primariamente por humanoides e monstros pequenos.\n\n' +
        'ESPECIAL. Possui diversas habilidades especiais e/ou foi feita para situações fora de combate direto (enganar ou roubar os personagens). Ocupado também por conjuradores e líderes — criaturas cujas habilidades fortalecem outras, e por isso devem ser usadas junto com lacaios.',
    },
    'tipos': {
      titulo: 'Tipos de Criaturas',
      fonte: 'Ameaças de Arton, p. 13–14',
      texto: 'Toda criatura pertence a um dos seis tipos. Alguns fornecem habilidades inerentes.\n\n' +
        'ANIMAL. Seres vivos sem inteligência para desenvolver idioma (Int –5 ou –4) e sem habilidades sobrenaturais. Um animal inteligente ou com poderes mágicos é considerado monstro.\n\n' +
        'CONSTRUTO. Objetos animados ou criaturas fabricadas. Habilidades: visão no escuro; imunidade a cansaço, efeitos de metabolismo e veneno; não recuperam PV por descanso e cura não funciona neles — mas Ofício (artesão) pode ser usado no lugar da perícia Cura.\n\n' +
        'ESPÍRITO. Nativos de outros Planos, ligados às energias primais da Criação. Geralmente possuem visão no escuro, mas isso não é inerente ao tipo.\n\n' +
        'HUMANOIDE. Raças com anatomia humana básica; todos inteligentes. Todo humanoide tem uma raça (humano, anão…) ou subtipo (gigante…).\n\n' +
        'MONSTRO. Anatomia estranha ou habilidades mágicas — de dragões a lefeu.\n\n' +
        'MORTO-VIVO. Cadáveres animados por energia negativa. Habilidades: visão no escuro; imunidade a cansaço, efeitos de metabolismo, trevas e veneno; sofrem dano de cura mágica de luz (Von CD do efeito reduz à metade) e recuperam PV com dano de trevas.',
    },
    'tamanhos': {
      titulo: 'Tabela 1-1: Tamanho de Criaturas',
      fonte: 'Ameaças de Arton, p. 13',
      texto: 'Categoria · Exemplos · Espaço ocupado/alcance natural · Furtividade/Manobras\n\n' +
        'Minúsculo — falcão, rato, sílfide — 1,5m — +5/–5\n' +
        'Pequeno — cão, goblin, hynne — 1,5m — +2/–2\n' +
        'Médio — humano, anão, elfo — 1,5m — 0\n' +
        'Grande — cavalo, ogro, serpe — 3m — –2/+2\n' +
        'Enorme — ente, gigante, hidra — 4,5m — –5/+5\n' +
        'Colossal — colosso, dragão, kraken — 9m — –10/+10\n\n' +
        '“3m”, por exemplo, significa que a criatura ocupa um espaço de 3m x 3m, ou seja, 2x2 quadrados num mapa.',
    },
    'desl-especiais': {
      titulo: 'Deslocamento Especial',
      fonte: 'Ameaças de Arton, p. 15',
      texto: 'ESCALADA. Pode caminhar por superfícies verticais ou de cabeça para baixo. Segue as demais regras de movimento e é afetada pela superfície (uma parede acidentada pode ser terreno difícil). Quem está escalando e perde o deslocamento de escalada ou a capacidade de agir (inconsciente, paralisado) cai.\n\n' +
        'ESCAVAÇÃO. Move-se sob terreno granular, como terra e areia (mas não rocha sólida). O terreno se fecha atrás dela. Solo pedregoso pode ser terreno difícil.\n\n' +
        'NATAÇÃO. Desloca-se na água sem testes de Atletismo (mas pode precisar de testes em correnteza forte ou redemoinho). Respira debaixo d’água, mas não fora dela, a menos que tenha outro deslocamento. Pode falar e lançar magias submersa e não sofre –2 em ataque, –5 em Percepção nem redução no dano de armas naturais.\n\n' +
        'VOO. Pode encerrar o deslocamento em pleno ar. Quem voa e perde o deslocamento de voo ou a capacidade de agir cai 150m por rodada. Quem voa e sofre uma manobra derrubar bem-sucedida cai 1d6 x 1,5m antes de recuperar o voo.',
    },
    't20-mergulhar': {
      titulo: 'Subir ou Mergulhar',
      fonte: 'Tormenta20, p. 238',
      texto: 'Voando ou nadando, movimentar-se na vertical custa o dobro na subida (ou o triplo em diagonais) e metade na descida (ou o normal em diagonais). Ou seja, voar 1,5m para cima conta como 3m, enquanto voar 3m para baixo conta como 1,5m.',
    },
    't20-patamares': {
      titulo: 'Patamares de Jogo',
      fonte: 'Tormenta20, p. 35',
      texto: 'Iniciante (1º ao 4º nível). Aventureiro novato, envolvido em missões locais, como proteger vilas do ataque de bandidos e escoltar caravanas.\n\n' +
        'Veterano (5º ao 10º nível). Neste patamar, o herói presta serviços importantes a nobres e líderes de guildas.\n\n' +
        'Campeão (11º ao 16º nível). Já famoso por suas façanhas, o aventureiro trabalha para monarcas e enfrenta grandes vilões e monstros terríveis.\n\n' +
        'Lenda (17º ao 20º nível). Entre os mais poderosos de Arton, o herói lida com perigos que ameaçam todo o mundo… ou mesmo toda a realidade!',
    },
    't20-dano-armas': {
      titulo: 'Tabela 3-2: Dano de Armas',
      fonte: 'Tormenta20, p. 143',
      texto: 'Ache o dado na coluna “Normal” e ande para os lados para subir ou descer passos.\n\n' +
        '–2 · –1 · Normal · +1 · +2 · +3\n' +
        '1 · 1d2 · 1d3 · 1d4 · 1d6 · 1d8\n' +
        '1d2 · 1d3 · 1d4 · 1d6 · 1d8 · 1d10\n' +
        '1d3 · 1d4 · 1d6 · 1d8 · 1d10 · 1d12\n' +
        '1d4 · 1d6 · 1d8 ou 2d4 · 1d10 · 1d12 · 3d6\n' +
        '1d6 · 1d8 · 1d10 · 1d12 · 3d6 · 4d6\n' +
        '1d8 · 1d10 · 1d12, 2d6 ou 3d4 · 3d6 · 4d6 · 4d8\n' +
        '1d10 · 2d6 · 2d8 · 3d8 · 4d8 · 4d10\n' +
        '2d6 · 2d8 · 2d10 · 3d10 · 4d10 · 4d12 (máximo)',
    },
    't20-pericias': {
      titulo: 'Valor de Perícia',
      fonte: 'Tormenta20, p. 114',
      texto: 'Valor de perícia = metade do nível (arredondado para baixo) + atributo-chave + bônus de treinamento (se for treinado).\n\n' +
        'O bônus de treinamento é +2 do 1º ao 6º níveis, +4 do 7º ao 14º e +6 do 15º em diante. Para ameaças, use o ND no lugar do nível.\n\n' +
        'Perícias não listadas na ficha, quando aplicáveis, têm modificador igual à metade do ND + o atributo-chave, como normal.',
    },
    't20-tesouro': {
      titulo: 'Categoria de Tesouro',
      fonte: 'Tormenta20, Capítulo 8',
      texto: 'NENHUM — a criatura não fornece tesouro; não se rola na tabela.\n' +
        'METADE — divide pela metade os resultados da coluna Dinheiro.\n' +
        'PADRÃO — rola normalmente na linha do ND da criatura.\n' +
        'DOBRO — rola duas vezes em CADA coluna (Dinheiro e Itens).\n\n' +
        'Você pode combinar o tesouro com o próprio equipamento da criatura: uma ameaça trajando armadura completa já tem um tesouro considerável na própria armadura.',
    },
    'extrair-recurso': {
      titulo: 'Extrair um recurso da criatura',
      fonte: 'Ameaças de Arton, p. 13',
      texto: 'Algumas criaturas possuem recursos que podem ser extraídos de seu corpo. Extrair um recurso exige uma hora de trabalho e um teste de Sobrevivência ou de um Ofício relacionado ao recurso, CD 15 + o ND da criatura. Em caso de falha, os recursos são estragados.',
    },
    'chefe-final': {
      titulo: 'Chefe Final',
      fonte: 'Ameaças de Arton, p. 368',
      texto: 'Regras para transformar qualquer criatura em um adversário de batalha decisiva. As mais apropriadas são solos e especiais (lacaios, por definição, não são bons chefes finais). Escolhida a criatura, faça estes ajustes:\n\n' +
        '• Dobre seus pontos de vida.\n' +
        '• Aumente seus pontos de mana (se houver) em +2 por ND.\n' +
        '• Acrescente a habilidade Maior que a Morte e, se a criatura for de patamar veterano ou superior, Redução de Dano conforme seu patamar: 5 para veterano, 10 para campeão e 20 para lenda.\n' +
        '• Aumente seu ND em 2 (apenas para efeitos de XP e tesouro). Se a criatura tiver ND menor que 1, ele se torna 2.\n\n' +
        'Cada chefe final é formado por uma criatura (o chefe) e um arquétipo. O livro apresenta o primeiro: rei da arena, definido pelo local do combate.',
    },
    'nd-s': {
      titulo: 'Criaturas de ND S e S+',
      fonte: 'Ameaças de Arton, p. 12',
      texto: 'ND “S” e “S+” são casos especiais. Contam como ND 20, mas são ainda mais perigosas — os seres mais poderosos da Criação.\n\n' +
        'Não são níveis numéricos, mas um status: para estatísticas não listadas (perícias não treinadas etc.) valem como ND 20; para habilidades de OUTRAS criaturas, porém, seu ND é maior que 20 (não são afetadas por efeitos limitados pelo nível do alvo). Possuem a habilidade Maior que a Morte.',
    },
    'hab-bando': {
      titulo: 'Bando (habilidade)',
      fonte: 'Ameaças de Arton, p. 15',
      texto: 'A criatura é formada por um grupo de indivíduos, geralmente do mesmo tipo, embora possam existir bandos mistos. Se um ataque do bando exceder a Defesa do inimigo por 10 ou mais, causa o dobro do dano. Se um ataque do bando errar, ainda assim causa metade do dano. Um bando é imune a manobras de combate e efeitos que afetam apenas uma criatura e não causam dano, mas tem vulnerabilidade a dano de área. Um personagem com o poder Trespassar que acerte a criatura pode usá-lo para fazer um ataque adicional contra ela (mas apenas uma vez por turno).',
    },
    'hab-magias': {
      titulo: 'Magias (habilidade)',
      fonte: 'Ameaças de Arton, p. 16',
      texto: 'A criatura lança magias. A descrição da habilidade indica o nível e classe de conjurador, a CD para resistir às suas magias e seu limite de PM (sem limite indicado, use o ND da criatura). A criatura segue todas as regras de magias e as limitações específicas de sua classe (se lança como bruxo, possui um foco arcano e deve empunhá-lo). Considere que ela tem todos os componentes materiais.\n\n' +
        'Algumas criaturas possuem um tipo de conjurador (arcano ou divino) em vez de uma classe; nesse caso, suas magias são do tipo indicado, sem limitação de classe.',
    },
    'apendice-a': {
      titulo: 'Parceiros de ameaças',
      fonte: 'Ameaças de Arton, Apêndice A',
      texto: 'Algumas ameaças têm parceiros. Por padrão, eles seguem as regras normais de seu tipo, não contam como oponentes separados para XP/recompensas e não precisam ser derrotados para o combate terminar (quando a ameaça cai, os parceiros se rendem, fogem ou desaparecem). O mestre pode, em certos casos, tratar o parceiro como criatura separada — aí inclua uma criatura do tipo adequado, ignore os benefícios que a ameaça receberia do parceiro e considere o ND dele no cálculo do encontro e das recompensas.',
    },
    'cap1-habilidades': {
      titulo: 'Habilidades Gerais',
      fonte: 'Ameaças de Arton, Capítulo 1, p. 15–17',
      texto: 'As habilidades mais comuns das ameaças, com suas regras, estão no Capítulo 1: Agarrar Aprimorado, Ataque Furtivo, Bando, Cura Acelerada, Derrubar, Deslocamento Especial, Doença, Engolir, Enxame, Evasão, Evasão Aprimorada, Familiar, Faro, Fortificação, Imunidade, Incorpóreo, Magias, Maior que a Morte, Natureza Vegetal, Parceiro, Percepção às Cegas, Redução de Dano, Resistência a <efeito>, Sensibilidade a Luz, Visão na Penumbra, Visão no Escuro e Vulnerabilidade a <efeito>.\n\nNesta aba elas estão na biblioteca do Passo 5 — um clique põe o texto na ficha.',
    },
    'dano-por-tamanho': {
      titulo: 'Armas naturais — dano por tamanho',
      fonte: 'Ameaças de Arton, Capítulo 1',
      texto: 'Como regra geral, armas naturais causam 1d6 de dano de seu tipo para uma criatura Pequena ou Média; o tamanho ajusta esse dado em passos.\n\n' +
        'Minúscula: –1 passo (1d4)\nPequena / Média: base (1d6)\nGrande / Enorme: +1 passo (1d8)\nColossal: +2 passos (1d10)\n\n' +
        'Criaturas com armas naturais mais fracas ou particularmente perigosas podem causar dano diferente desses valores.',
    },
    'hab-magica': {
      titulo: 'Habilidade mágica (o selo ✦)',
      fonte: 'Ameaças de Arton, p. 384',
      texto: 'O padrão é que as habilidades sejam normais — inclusive poderes cientificamente impossíveis, como o sopro de fogo de um dragão ou a regeneração de um troll (este é um mundo de fantasia).\n\n' +
        'Caso a habilidade realmente seja mágica, marque-a com o selo. Isso indica que ela está sujeita a qualquer coisa que afete habilidades mágicas (mas não apenas magias) ou seus efeitos: é suprimida por Campo Antimagia (mas não é dissipada por Dissipar Magia, a menos que seja uma magia) e seu dano ignora redução de dano /mágico.',
    },
  };

  // ── ABERTURA (p. 377) ────────────────────────────────────────────
  const ABERTURA = [
    { p: 'Uma parte divertida de preparar aventuras é escolher os antagonistas certos. Tormenta20 oferece centenas de monstros (e mais estão por vir), mas pode chegar a hora em que o mestre precisa de uma criatura específica, quer transformar em ficha uma ideia de criatura ou resolveu adaptar um monstro de seu filme ou série favoritos. Para isso, tudo que você precisa é de sua criatividade e das informações a seguir.' },
    { sub: 'A filosofia de criação' },
    { p: 'Antes de explicar como criar um novo monstro, é importante falar sobre a filosofia de elaboração de fichas em Tormenta20. Ao contrário de personagens jogadores, criados a partir de uma série de escolhas (raça, origem, classe, perícias etc.) que resultam em uma combinação de características numéricas e habilidades, criaturas são preparadas na ordem inversa.' },
    { p: 'Para criar ou adaptar a ficha de uma criatura em Tormenta20, começamos com o nível de desafio da criatura, que vai estabelecer a base para seus valores numéricos, e vamos “preenchendo” esse esqueleto de números com habilidades que darão forma à criatura. Em outras palavras, você não precisa calcular atributos, perícias, modificadores fornecidos por habilidades e itens etc. Se o conceito de sua criatura pede uma ameaça de ND 10 com um valor de ataque +29, ela terá esse valor de ataque. Não interessa, para efeitos de criação da ficha, como a criatura chegou a esse valor. O mesmo raciocínio vale para as demais características numéricas. Uma vez que você decida o papel da criatura e seu ND, os valores são derivados diretamente. Ameaças são criadas dessa forma porque seu papel dentro do jogo não é igual ao dos personagens jogadores.' },
    { p: 'Personagens são criados para ser equilibrados entre si em termos do que podem fazer na história (ainda que em determinadas situações alguns brilhem mais que outros). Já as ameaças, seja um monstro irracional que habita o fundo de uma masmorra, seja um nobre astuto tramando contra os aventureiros, não estão limitadas por esses critérios. Seu papel é ser um desafio à altura dos protagonistas da história, não ser simetricamente equivalente a eles.' },
    { p: 'Em suma, ao criar uma ameaça, não use a mesma lógica que você usaria ao criar um personagem. Aqui, o resultado final é mais importante do que o modo como cada valor foi obtido.' },
    { sub: 'Criando Ameaças' },
    { p: 'Construir a ficha de uma ameaça envolve decisões de regras e de história. Para criar uma criatura, siga os passos abaixo.' },
    { lista: [
      'Passo 0: Conceito e Nome.',
      'Passo 1: Tipo, Tamanho e Papel.',
      'Passo 2: Nível de Desafio.',
      'Passo 3: Estatísticas de Combate.',
      'Passo 4: Ataques.',
      'Passo 5: Habilidades.',
      'Passo 6: Estatísticas Secundárias.',
      'Passo 7: Equipamento e Tesouro.',
    ] },
    { quadro: { titulo: 'Ameaças Publicadas e Estas Regras', texto:
      'O objetivo deste manual é oferecer aos mestres ferramentas para criar e adaptar ameaças compatíveis com os valores das criaturas publicadas nos materiais oficiais de Tormenta20. Porém, ao criar uma ameaça, talvez você queira fazer ajustes nos números e características que poderão divergir das orientações deste manual. Não há nenhum problema nisso! É o seu jogo e você sabe melhor do que ninguém que tipos de ameaças e desafios seus jogadores vão gostar de enfrentar.\n\n' +
      'Da mesma forma, criaturas apresentadas nos materiais oficiais de Tormenta20 também podem se desviar destes parâmetros. Elementos como conceito, papel na história e traços interessantes ou peculiares podem contribuir para que a criatura tenha estatísticas ligeiramente diferentes daquelas apresentadas aqui. Criar ameaças é parte matemática e parte arte!' } },
  ];

  // ── OS OITO PASSOS ───────────────────────────────────────────────
  const PASSOS = [
    {
      n: 0, id: 'conceito', titulo: 'Conceito e Nome', icone: '💭',
      resumo: 'Descreva a criatura em poucas palavras e escolha a função dela no encontro.',
      blocos: [
        { p: 'Antes de pensar na ficha em si, pense em como será a ameaça em termos gerais. Uma boa criatura é aquela que pode ser descrita em poucas palavras. Por exemplo, o dragão, monstro mais famoso de todos, pode ser descrito como “réptil alado que cospe fogo”.' },
        { p: 'Ao contrário de personagens jogadores, que estarão presentes na maior parte da aventura (ao menos assim esperamos), uma ameaça irá aparecer em poucas cenas — talvez apenas em uma. Assim, de nada adianta uma criatura ter dúzias de habilidades especiais, se só terá tempo de mostrar poucas.' },
        { p: 'Além do “tempo em cena”, há outro fator que pesa a favor de ameaças com poucas habilidades: elas são controladas pelo mestre, que tem outras tarefas no jogo. Enquanto cada jogador normalmente é responsável por apenas um personagem, o mestre pode estar lidando com diversas criaturas ao mesmo tempo, além de ter que pensar na condução da aventura como um todo. Se cada criatura for tão complicada quanto um personagem, as coisas ficarão difíceis para o mestre!' },
        { p: 'Assim, quando for fazer a ficha, tenha em mente o seguinte: qualidade é melhor que quantidade. Como regra geral, uma ameaça deve ter de uma a duas habilidades para cada [[t20-patamares|patamar de desafio]] (veja o “Passo 2: Nível de Desafio”). Uma criatura sem habilidades pode ficar sem graça, mas uma quantidade exagerada de habilidades pode deixá-la complexa demais. Claro, exceções podem existir, mas essa proporção é uma boa regra geral.' },
        { p: 'Pense também na função da criatura. Algumas são feitas para ser usadas em grandes quantidades, como kobolds — nesse caso devem ser simples, facilitando o controle de várias ao mesmo tempo sem que o jogo fique lento. Outras são criadas para enfrentar o grupo sozinhas — e devem ter uma boa quantidade de pontos de vida e habilidades defensivas, para que não sejam derrotadas muito rapidamente.' },
        { p: 'Abaixo listamos as funções mais comuns de ameaças; tenha em mente que são apenas referências, não uma classificação rígida.' },
        { tabela: 'funcoes' },
        { p: 'Quando o conceito geral estiver definido, pense em alguns detalhes. Onde a criatura vive? Como vive? Como se relaciona com outras criaturas? São perguntas que, se respondidas, podem enriquecer bastante a ameaça. Uma dica é assistir a alguns episódios do Monster Chefe, programa do canal da Jambô onde os cozinheiros de monstros de Tormenta20 preparam novas ameaças com a ajuda do chat e discutem exatamente esse tipo de detalhes.' },
        { p: 'Se você estiver fazendo a ficha de uma criatura que já existe, pode pular esta etapa e ir direto para o “Passo 1: Tipo, Tamanho e Papel”.' },
      ],
    },
    {
      n: 1, id: 'tipo', titulo: 'Tipo, Tamanho e Papel', icone: '🧬',
      resumo: 'Os três traços que decidem o que afeta a criatura, quanto espaço ela ocupa e de que linha da Tabela 2-3 ela sai.',
      blocos: [
        { p: 'Toda criatura pertence a um dos seis [[tipos|tipos]] seguintes: animal, construto, espírito, humanoide, monstro ou morto-vivo. O tipo representa a natureza da criatura dentro do mundo e alguns deles fornecem habilidades especiais. Além disso, ele determina quais habilidades podem afetar a criatura — por exemplo, a magia Aliado Animal, como diz o nome, só funciona em animais. Uma vez determinado o conceito da criatura, é fácil determinar seu tipo. Leia a descrição, anote suas características (quando houver) e passe para o tamanho.' },
        { p: 'O [[tamanhos|tamanho]] indica o porte e espaço físico da ameaça. Para isso, pense no formato da criatura e no espaço que ela ocupa. Você pode usar criaturas com formato e porte semelhantes como referência; em caso de dúvida, ou se a criatura estiver no limiar entre duas categorias de tamanho, escolha aquela que melhor descreve sua ideia geral.' },
        { p: 'Por fim, defina o [[papeis|papel de combate]] da criatura. Enquanto a função (descrita em “Passo 0”) envolve elementos narrativos, o papel é uma classificação de regras que irá determinar as estatísticas básicas da criatura conforme seu uso em combate (veja “Passo 3”). Existem três papéis: solo, lacaio e especial. Ameaças solo têm estatísticas de combate mais equilibradas e são mais adequadas como criaturas que lutam sozinhas ou liderando grupos de lacaios. Lacaios têm valores de ataque e dano maiores, mas possuem estatísticas defensivas mais baixas. São mais adequados enquanto combatentes em grupo, como bandos de soldados ou saqueadores. Por fim, especiais possuem valores de ataque e Defesa menores, mas a CD para resistir às suas habilidades é mais alta e eles recebem mais habilidades por patamar. Como dica geral para escolher o papel de uma ameaça, pense na função que você atribuiu a ela. Um chefão ou um capitão geralmente será uma ameaça solo, enquanto um conjurador ou trapaceiro será um especial e um assecla será um lacaio.' },
        { sub: 'Deslocamento' },
        { p: 'Ao definir o tamanho da criatura, escolha também um deslocamento para ela, baseado em seu tamanho e conceito, de acordo com a Tabela 2-2. Os valores indicados são os deslocamentos médios para ameaças com essas características; você pode ajustar esses valores conforme o conceito de sua ameaça. Entretanto, tenha em mente que deslocamentos abaixo de 6m podem deixar a ameaça muito fraca, enquanto deslocamentos acima de 18m fornecem uma importante vantagem tática, sobretudo para ameaças com ataques à distância.' },
        { tabela: 'desl' },
        { p: 'Além do deslocamento padrão, que é terrestre, a criatura pode ter outros tipos de deslocamento, como voo, escalada, escavação e natação. Dependendo do conceito de sua ameaça, é possível inclusive que ela não tenha um deslocamento terrestre, utilizando apenas outro tipo de deslocamento. Para estabelecer o valor desses outros tipos de deslocamento, use a Tabela 2-2. Se esse deslocamento for a principal forma de movimento da criatura, use o valor listado na tabela. Caso contrário, ele será um pouco menor que o deslocamento base (3m a menos é um bom valor).' },
        { p: 'Para a descrição dos [[desl-especiais|demais tipos de deslocamento]], veja a página 15. Consulte também [[t20-mergulhar|“Subir ou Mergulhar”]], em Tormenta20, p. 238, para lidar com deslocamentos verticais de natação e voo.' },
      ],
    },
    {
      n: 2, id: 'nd', titulo: 'Nível de Desafio', icone: '🎯',
      resumo: 'O ND funciona como o nível da criatura e é ele que decide todos os números do Passo 3.',
      blocos: [
        { p: 'Uma vez que você tenha definido o conceito, tipo e papel da criatura, é hora de determinar seu nível de desafio, ou ND. O ND de uma criatura representa sua experiência e categoria geral de poder e, para muitos aspectos, funciona como seu nível de personagem.' },
        { p: 'Você pode escolher o nível de desafio de sua ameaça livremente, apenas pensando no nível do grupo que ela deve desafiar, mas se quiser ter uma ideia de qual ND é mais adequado à ameaça levando em conta “o que ela é” (como um simples cão raivoso ou um dragão antiquíssimo), pense em seu papel em relação aos [[t20-patamares|patamares de jogo]] (veja Tormenta20, p. 35). Outra boa dica é comparar sua criatura com outras ameaças de conceito semelhante, para estabelecer um ND adequado. Por fim, você pode consultar as tabelas de estatísticas de combate para ver os valores mais adequados ao desafio que você quer criar, e definir o ND a partir disso.' },
        { p: 'Os [[nd-s|ND “S” e “S+”]] são casos especiais: contam como ND 20, mas são ainda mais perigosos — os seres mais poderosos da Criação.' },
      ],
    },
    {
      n: 3, id: 'combate', titulo: 'Estatísticas de Combate', icone: '⚔',
      resumo: 'Consulte a linha do ND na seção do papel da Tabela 2-3. Não é necessário fazer nenhum cálculo.',
      blocos: [
        { p: 'As estatísticas de combate de uma ameaça, em ordem de aparição na ficha, são Defesa, testes de resistência, pontos de vida, modificador de ataque, dano médio e CD de habilidades. O ponto de partida para definir esses valores é o papel de combate e o ND da ameaça, escolhidos nos passos anteriores; para cada estatística, consulte a linha correspondente ao ND da criatura na seção apropriada da Tabela 2-3: Parâmetros de Criaturas. Esses serão os valores iniciais das estatísticas de combate de sua ameaça (não é necessário fazer nenhum cálculo, apenas usar os valores fornecidos).' },
        { p: 'Se quiser personalizar os valores de combate, você pode ajustar cada estatística para o valor de 1 ou 2 níveis de desafio a mais ou a menos, conforme o conceito que você imaginou. Por exemplo, sua ameaça é um monstro dotado de uma carapaça especialmente resistente. Você definiu que esta será uma ameaça solo de ND 11, o que indica Defesa 41. Entretanto, para representar que sua carapaça oferece uma proteção superior, você pode aplicar o valor de Defesa de uma ameaça solo de ND 12. Seguindo a mesma lógica, você poderia escolher usar o valor de Reflexos de uma ameaça solo de ND 10, representando que essa mesma carapaça deixa a criatura mais lenta. Use esses modificadores com sabedoria, compensando eventuais aumentos com reduções equivalentes em outras estatísticas para representar bem os pontos fortes e fracos da criatura.' },
        { sub: 'Testes de Resistência' },
        { p: 'As tabelas apresentam três valores de resistência para cada ND, representando respectivamente a resistência em que a ameaça é mais forte, aquela em que ela é mediana e aquela em que ela é fraca. Distribua esses valores entre as três perícias de resistência (Fortitude, Reflexos e Vontade) a sua escolha, conforme o conceito da ameaça. Para criaturas grandes ou vigorosas, Fortitude tende a ser a resistência principal. Para criaturas pequenas ou ágeis, Reflexos terá esse papel. Já para criaturas voltadas a habilidades mentais, mágicas ou de intriga, Vontade será a resistência preponderante.' },
        { sub: 'Defesa e Pontos de Vida' },
        { p: 'O valor de Defesa de uma ameaça pode representar esquiva, armadura, técnicas defensivas, efeitos mágicos ou qualquer combinação de elementos protetores. Da mesma forma, seus PV podem representar vitalidade orgânica, dureza de seus componentes artificiais ou mesmo resistência sobrenatural.' },
        { sub: 'Valor de Ataque' },
        { p: 'Representa o valor de ataque de uma ameaça cuja principal forma de causar dano seja uma arma ou equivalente (algo que exija teste de ataque para acertar).' },
        { sub: 'Dano Médio' },
        { p: 'O dano médio na tabela representa quanto dano a ameaça é capaz de causar com sua principal forma de “ataque”, seja uma arma, arma natural ou uma magia, caso todos os seus ataques sejam bem sucedidos, suas magias não sejam resistidas etc. (mas não considera acertos críticos). Você é livre para dividir esse dano em múltiplos ataques, representando uma ameaça com várias armas leves, ou concentrar tudo em um único ataque ou habilidade poderosa. Como regra geral, evite que uma ameaça tenha mais de três ataques (a menos que seja um chefão). Um encontro com várias criaturas com múltiplos ataques pode resultar em um combate longo e lento.' },
        { p: 'Para escolher os dados usados na rolagem de dano de um ataque da criatura, você pode compará-la com outras ameaças ou usar a [[t20-dano-armas|Tabela 3-2: Dano de Armas]] (Tormenta20, p. 143) como referência. Você pode aumentar a quantidade ou o tipo de dados para representar armas naturais mais poderosas ou um nível de competência. Após escolher os dados utilizados, some a eles um bônus numérico de dano em valor adequado para alcançar o dano médio do ND.' },
        { p: 'Para verificar se o dano médio está correto, some o menor resultado possível ao maior resultado possível na rolagem e divida por dois, arredondando para baixo (por exemplo, em 2d6+2 a menor rolagem possível é 4 e a maior é 14, então o dano médio será 18 dividido por 2; ou seja, 9). Dessa forma, se estiver construindo uma ameaça com ND 1/4, para a qual o dano médio é 8, esse valor pode ser alcançado com um ataque que cause 1d4+6 de dano, ou 1d6+5, ou 1d8+4, entre outras opções.' },
        { sub: 'CD de Habilidades' },
        { p: 'Indica a CD para resistir a quaisquer habilidades da ameaça, sejam elas habilidades secundárias (como peçonha ou doença transmitida por uma arma natural), sejam suas principais formas de ataque (como magias).' },
        { quadro: { titulo: 'Pontos de Mana', texto:
          'Evite usar PM para ameaças. Pontos de mana são uma excelente forma de medir os recursos de um personagem jogador, mas como o mestre precisa controlar diversas criaturas, adicionar a necessidade de registrar PM de todas elas é uma complicação desnecessária. Em vez disso, use habilidades condicionais (que podem ser ativadas uma vez por cena, ou em um momento específico, como na primeira rodada de combate). Para habilidades simples, como o ataque extra de chifres de um minotauro, simplesmente considere que ele pode fazer esses ataques à vontade (levando em conta seu dano como parte do dano médio por rodada da ameaça).\n\n' +
          'Caso o conceito de sua ameaça peça o uso de pontos de mana, dê a ela 3 PM por ND. Se ela tiver a habilidade Magias, em vez disso calcule seus PM conforme apropriado para o tipo e nível de conjurador indicado na habilidade.' } },
        { tabela: 'parametros' },
      ],
    },
    {
      n: 4, id: 'ataques', titulo: 'Ataques', icone: '🗡',
      resumo: 'Divida o dano médio entre os ataques e ache o bônus que fecha a conta.',
      blocos: [
        { p: 'Aqui você vai definir os ataques com armas da ameaça. O valor de ataque e o dano médio por rodada são definidos pelo papel e ND da criatura. Conforme explicado no “Passo 3”, o dano médio pode ser concentrado em um único ataque ou dividido entre vários. Existem pequenas diferenças de poder nessa escolha, mas em geral elas não são impactantes o suficiente para entrar na matemática (exceto no caso de ameaças de nível mais alto que concentrem todo seu dano num ataque só e possam derrubar a maioria dos personagens com um só golpe, o que é algo mais significativo). Siga o que melhor representa o conceito que você elaborou.' },
        { p: 'Se quiser dar um segundo tipo de ataque para a ameaça (como um ataque à distância para um combatente corpo a corpo), considere o quão importante esse ataque será na forma como a criatura luta. Se for um ataque importante, usará as mesmas estatísticas do ND da ameaça e contará como uma habilidade (veja “Passo 5”). Se for um ataque complementar, algo que você irá incluir apenas para dar mais cor e opções, utilize as estatísticas de combate de seu papel, mas use a linha de 2 níveis abaixo. Nesse caso, esse ataque secundário não contará no limite de habilidades da criatura.' },
        { p: 'Para determinar exatamente que tipo de ataque a ameaça possui, pense em uma “arma” que se encaixe no conceito (como uma espada para um cavaleiro, uma adaga para um bandido ou garras para um monstro). Uma vez escolhida a forma do ataque, aplique suas características (dano, margem de ameaça e multiplicador de crítico, alcance etc.). Se necessário, aumente o [[dano-por-tamanho|dano da arma]] em alguns passos (representando a habilidade da ameaça com essa arma ou armas especiais/aprimoradas) e adicione um bônus de dano para alcançar o dano médio do ND escolhido.' },
        { exemplo: 'Exemplo: sua ameaça é um monstro solo de ND 4 com duas cabeças. Você decide que ele terá dois ataques de mordida, com um valor de +16 (conforme indicado para seu ND e papel). O dano médio indicado para essa ameaça é 24, o que dá 12 pontos de dano por ataque. Uma arma natural de uma criatura Média causa 1d6 pontos de dano (média 3). Você decide aumentar esse dano em um passo (1d8, média 4) representando os dentes particularmente afiados e protuberantes da criatura. Para atingir o dano médio de 12, você atribui a cada ataque um bônus de dano de +8. Sua ameaça de duas cabeças faz dois ataques de mordida com um valor de +16 e dano de 1d8+8 cada.' },
        { tabela: 'passos' },
      ],
    },
    {
      n: 5, id: 'habilidades', titulo: 'Habilidades', icone: '✨',
      resumo: 'A parte mais divertida — e a que tem uma cota: de uma a duas por patamar (duas a três, para especiais).',
      blocos: [
        { p: 'A parte mais divertida. Até aqui, você construiu a estrutura matemática da ficha, fazendo escolhas relacionadas às características numéricas da criatura. Agora você vai determinar aquilo que a fará especial: suas habilidades.' },
        { p: 'Assim como em personagens, habilidades representam as mais diversas características de uma ameaça, desde traços mundanos como o faro de um cão até poderes mágicos como a maldição mortuária de uma mortalha.' },
        { p: 'Para definir as habilidades da ameaça é preciso primeiro escolher, com base no conceito da criatura, quantas e quais habilidades ela terá. Como regra geral, uma ameaça solo ou lacaio pode ter de uma a duas habilidades por patamar de desafio, enquanto uma especial terá de duas a três habilidades por patamar — uma ameaça solo de patamar campeão, por exemplo, teria de três a seis habilidades. Isso é apenas uma regra geral; as habilidades de ameaças não são equilibradas entre si e você poderá ter menos habilidades mais poderosas, ou mais habilidades mais fracas. Tente equilibrar habilidades passivas (como redução de dano) com habilidades ativadas (como magias) para tornar sua ameaça fácil de usar em jogo — uma ameaça com muitas habilidades ativadas pode ser difícil de controlar.' },
        { p: 'Em relação à escolha das habilidades, pense primeiro no que você quer que a criatura faça, avaliando as habilidades de forma abstrata, sem levar em conta suas regras. Normalmente, monstros estão na aventura para combater os personagens; assim, faz sentido que a maior parte das habilidades seja de ataque. Poderes de defesa também são comuns — muitos dos monstros mais famosos da mitologia só podiam ser atingidos por certo tipo de arma ou morriam apenas em determinadas circunstâncias. Depois de ataque e defesa, habilidades de percepção (como visão no escuro) e movimento (como ignorar terreno difícil) são as mais comuns. Há um motivo para isso: você não quer um monstro do qual o grupo possa se esconder ou fugir facilmente! Por fim, há habilidades variadas, que não se encaixam nessas categorias, como a capacidade de mudar de forma de um duplo. Use habilidades assim para criaturas que farão mais do que apenas combater.' },
        { p: 'Uma vez que você tenha determinado quantas e quais habilidades a criatura terá, é hora de finalizá-las. As [[cap1-habilidades|habilidades mais comuns, com suas respectivas regras, são descritas no Capítulo 1]]. Para outras habilidades, veja as fichas das ameaças existentes.' },
        { p: 'Você também pode criar habilidades novas para suas ameaças. Para isso, pense no conceito, depois tente representá-la mecanicamente. Não há uma regra para a criação de habilidades, visto que são únicas, mas uma dica é se basear em magias que sejam parecidas. Por exemplo, se você quer um monstro cuja habilidade seja criar cópias ilusórias de si mesmo, pode basear a habilidade na magia Imagem Espelhada. Da mesma forma, se você quer um morto-vivo cuja habilidade seja exalar um fedor terrível, pode basear a habilidade na magia Névoa com o aprimoramento de cheiro horrível. Você também pode basear suas habilidades em outras já existentes.' },
        { p: 'Uma regra geral é que a maior parte das habilidades de ataque permite um teste de resistência para ignorar (ou pelo menos reduzir) seus efeitos. O teste de resistência pode ser de Fortitude (para habilidades que afetem o metabolismo do alvo, como venenos), Reflexos (para efeitos dos quais se pode escapar sendo rápido, como uma explosão) ou Vontade (para poderes mentais, como uma aura de medo). A CD do teste de resistência é determinada pelo papel e ND da criatura (veja os “Passos 2 e 3”).' },
        { p: 'Por fim, lembre-se de distinguir entre habilidades normais e mágicas. O padrão é que as habilidades sejam normais — como a capacidade de voar de um pássaro, o olfato apurado de um cachorro etc. Note que mesmo poderes cientificamente impossíveis, como o sopro de fogo de um dragão ou a capacidade de regeneração de um troll, podem ser considerados “normais” — afinal, este é um mundo de fantasia. Caso a habilidade realmente seja mágica, [[hab-magica|coloque um símbolo após seu nome]]. Essa marcação indica que a habilidade está sujeita a qualquer coisa que afete habilidades mágicas (mas não apenas magias) ou seus efeitos. Por exemplo, ela é suprimida por Campo Antimagia (mas não é dissipada por Dissipar Magia, a menos que seja uma magia) e seu dano ignora redução de dano /mágico.' },
      ],
    },
    {
      n: 6, id: 'secundarias', titulo: 'Estatísticas Secundárias', icone: '📐',
      resumo: 'Atributos e perícias. Eles não mexem nas estatísticas de combate — essas já saíram do ND.',
      blocos: [
        { p: 'As estatísticas secundárias de uma ameaça são seus valores de atributo e suas perícias (incluindo Iniciativa e Percepção). Para os atributos, escolha valores compatíveis com o conceito da ameaça. Lembre-se que esses valores não vão impactar as estatísticas de combate; essas já foram definidas pelo ND. Ainda assim, eles poderão ser importantes caso a ameaça precise fazer um teste de atributo, e também para definir as perícias não listadas em sua ficha (que, quando aplicáveis, possuem modificador igual à metade do ND da criatura + seu atributo-chave, como normal).' },
        { p: 'A Tabela 2-4: Categoria de Atributos apresenta valores de atributos e categorias de competência para cada um. Se ainda estiver em dúvida sobre como definir os atributos de sua ameaça, compare-a com outras semelhantes.' },
        { tabela: 'atributos' },
        { p: 'Por fim, defina em quais perícias a ameaça será treinada e calcule seus valores usando as [[t20-pericias|regras normais]] (Tormenta20, p. 114), mas usando o ND como nível de personagem. Caso a criatura seja particularmente hábil em uma perícia ou possua alguma vantagem racial relevante, conceda um bônus de +2 ou +5 nessa perícia. Se a criatura for excepcionalmente hábil ou possuir uma capacidade mágica em uma perícia (como a habilidade de se disfarçar de um duplo), conceda um bônus de +10.' },
      ],
    },
    {
      n: 7, id: 'tesouro', titulo: 'Equipamento e Tesouro', icone: '💰',
      resumo: 'Equipamento é cosmético; o tesouro é a parte de que os jogadores mais gostam.',
      blocos: [
        { p: 'Decida se a criatura irá utilizar algum equipamento (e qual será) e se ela terá algum tipo de tesouro. Para o equipamento, escolha itens que se encaixem no conceito da criatura; mais uma vez, lembre-se que esse equipamento será “cosmético” — as estatísticas de combate já foram definidas. Entretanto, evite combinações de equipamento que não sejam representadas pelos números. Uma ameaça com baixa Defesa, por exemplo, dificilmente estaria usando uma armadura completa e um escudo pesado!' },
        { p: 'Por fim, a parte de que os jogadores mais gostam: o tesouro! Defina se a criatura terá um [[t20-tesouro|tesouro Padrão, Dobro ou Metade]], ou se terá algum tesouro especial (como ingredientes para alquimia, matérias-primas para armas ou armaduras etc.). Você pode combinar o tesouro com o próprio equipamento da criatura — uma ameaça trajando uma armadura completa, por exemplo, já terá um tesouro considerável na própria armadura. De forma similar, você pode dar à ameaça itens superiores ou, em níveis mais elevados, até mágicos. Para ideias de tesouros especiais, use como exemplos outras ameaças de Tormenta20.' },
        { p: '[[extrair-recurso|Extrair um recurso]] do corpo da criatura exige uma hora de trabalho e um teste de Sobrevivência ou de um Ofício relacionado, CD 15 + o ND da criatura.' },
      ],
    },
  ];

  // ── COMO MODIFICAR CRIATURAS (p. 387) ────────────────────────────
  const MODIFICAR = {
    id: 'modificar', titulo: 'Como Modificar Criaturas', icone: '🔧',
    resumo: 'Transformar uma ficha existente (a criatura-base) numa versão mais forte, mais fraca ou especializada.',
    blocos: [
      { p: 'Usando os passos acima, você pode modificar a ficha de uma ameaça existente para representar uma versão mais poderosa ou com papel diferente. Para modificar uma ameaça (chamada de criatura-base), siga os passos abaixo.' },
      { sub: 'Passo 0: Novo Conceito' },
      { p: 'Defina o que você pretende que a criatura modificada represente. Ela será apenas uma versão “mais forte” da criatura-base, ou será uma versão especializada, como um conjurador ou capitão?' },
      { sub: 'Passo 1: Nível de Desafio' },
      { p: 'Ajuste o nível de desafio da criatura conforme seu conceito.' },
      { sub: 'Passo 2: Estatísticas de Combate' },
      { p: 'Ajuste as estatísticas de combate da ameaça. Para isso, compare as estatísticas de sua criatura com as listadas na linha de seu papel e ND na Tabela 2-3. Para cada estatística, verifique se o valor dela está de acordo com a tabela, acima ou abaixo, e anote as diferenças (por exemplo, se sua criatura é um animal solo de ND 2 com ataque +14, ao verificar a tabela você notará que isso está 2 pontos acima do padrão; anote essa diferença). Em seguida, modifique as estatísticas de sua criatura para as do novo ND e mantenha as diferenças (por exemplo, se quiser aumentar o ND de seu animal para 5, ele deverá ter um ataque de +19, 2 pontos acima dos +17 normais desse ND).' },
      { sub: 'Passo 3: Habilidades' },
      { p: 'Ajuste o dano e a CD para resistir às habilidades da criatura, como acima. Você também pode adicionar novas habilidades para refletir seu conceito (como Magias para transformar um humanoide combatente em um conjurador) ou remover alguma habilidade se estiver criando uma versão mais fraca ou menos experiente da ameaça. Como regra geral, aumente ou diminua a quantidade de habilidades da ameaça apenas se o novo ND resultar em uma criatura de patamar diferente da original. Caso contrário, o melhor é trocar habilidades.' },
      { sub: 'Passo 4: Estatísticas Secundárias' },
      { p: 'A menos que o conceito da criatura exija valores de atributos muito diferentes da criatura-base (como transformar um trapaceiro em combatente), você pode mantê-los iguais. Para perícias, modifique cada perícia em um valor igual à metade da mudança no ND. Ajuste as perícias treinadas caso o ajuste de ND modifique seu bônus de treinamento (ou seja, as mudanças que ocorrem em ND 7 e 15).' },
      { sub: 'Passo 5: Equipamento e Tesouro' },
      { p: 'Ajuste o equipamento da criatura para refletir seu novo conceito, caso necessário.' },
    ],
  };

  // ── COMO CRIAR BANDOS (p. 387–389) ───────────────────────────────
  const BANDOS = {
    id: 'bandos', titulo: 'Como Criar Bandos', icone: '👥',
    resumo: 'Um grupo de criaturas vira UMA ficha: mais tamanho, mais ND, dano multiplicado por patamar.',
    blocos: [
      { p: 'Outra forma de modificar uma criatura é transformá-la em um bando. Um bando é um grupo de criaturas de qualquer tamanho. Geralmente representam dez ou cem indivíduos, mas você pode criar bandos com qualquer quantidade de criaturas. Você pode criar um bando como uma ameaça nova (seguindo os passos para criar uma ameaça), mas também pode formar bandos de criaturas já existentes. Para isso, escolha uma criatura (a criatura-base) e faça as alterações a seguir.' },
      { sub: '1) Composição do Bando' },
      { p: 'Defina a quantidade de criaturas no bando. Isso pode ser um número exato, no caso de bandos de criaturas organizadas (como unidades de um exército) ou apenas uma quantidade aproximada, como “alguns”, “um punhado” ou “dezenas”, no caso de bandos de criaturas desordenadas, como insetos ou mortos-vivos. Essa quantidade é apenas descritiva e não tem efeito em regras, mas poderá ajudá-lo a definir certas características do bando, como seu ND e tamanho.' },
      { sub: '2) Determine o ND' },
      { p: 'Escolha um ND para o bando. Você pode escolher qualquer valor (desde que acima do ND da criatura-base), mas tenha em mente que pode ser interessante que o ND reflita a quantidade de indivíduos. Bandos pequenos terão um ND próximo da criatura-base, enquanto bandos muito grandes terão ND muito maior. Como referência, um bando com dez indivíduos terá ND entre 2 e 4 pontos acima do ND da criatura-base, enquanto um bando com dezenas ou mesmo cem indivíduos terá ND entre 6 e 8 pontos acima.' },
      { sub: '3) Ajuste o Tamanho' },
      { p: 'O tamanho do bando será baseado no tamanho da criatura-base e na quantidade de indivíduos no bando. Como regra geral, um bando de dez criaturas será uma categoria de tamanho maior que a criatura-base, enquanto um bando de cem criaturas será três categorias de tamanho maior (até um máximo de Colossal). Esta mudança no tamanho afeta testes de Furtividade e manobras de combate, mas não o tamanho das armas que o bando usa.' },
      { sub: '4) Ajuste as Estatísticas de Combate' },
      { p: 'Defina as estatísticas de combate do bando (exceto dano) conforme seu papel de combate e ND, consultando a Tabela 2-3. Verifique se a criatura-base tem algum modificador em relação aos valores de uma criatura do mesmo ND e aplique esses modificadores no bando. Por exemplo, um bulette (uma criatura solo de ND 7) tem Defesa 32, 1 ponto acima da Defesa de uma criatura de seu tipo e ND. Assim, a Defesa de um bando de bulettes será 1 ponto maior que o indicado para seu ND.' },
      { p: 'Se o bando permanecer no mesmo patamar da criatura-base, mantenha seus valores de dano iguais. Se o bando aumentar de patamar, multiplique o dano dos ataques e das habilidades da criatura-base (exceto magias) conforme seu aumento de patamar: dano x2 para um patamar, dano x4 para dois patamares e dano x6 para três patamares. Você também pode aumentar o número de ataques do bando para distribuir melhor seu dano.' },
      { exemplo: 'Exemplo: Você quer criar dois bandos de mantícoras (ND 6, patamar veterano). O primeiro tem três criaturas, e você escolhe ND 8 para ele. Como esse bando continua sendo veterano, seu dano não é modificado. Você cria também um bando com várias mantícoras e escolhe ND 12 para ele. Esse bando tem patamar campeão (1 acima de veterano), logo seu dano será o dobro do dano de uma mantícora.' },
      { sub: '5) Habilidades de Bando' },
      { p: 'A criatura recebe a habilidade [[hab-bando|Bando]]. Além disso, se o aumento em seu ND mudar seu patamar, adicione novas habilidades conforme adequado ao seu papel de combate.' },
      { sub: '6) Perícias' },
      { p: 'Ajuste as perícias do bando de modo a refletir seu aumento de ND.' },
      { sub: '7) Equipamento e Tesouro' },
      { p: 'Se a criatura-base possui algum equipamento, multiplique esses itens pela quantidade de indivíduos (ou por um valor aproximado, para representar que nem todos os itens do bando estarão em condições de uso após um combate). Para o tesouro, mantenha a categoria (metade, padrão, dobro), mas use a linha apropriada ao ND do bando. Se o tesouro inclui algum item ou recurso especial, ajuste a CD para extrair conforme o novo ND e aumente as quantidades do tesouro conforme adequado ao número de criaturas. Em alguns casos, você pode limitar esse aumento; se o bando for muito grande, pode não haver tempo suficiente para extrair todos os recursos antes de eles se estragarem, por exemplo.' },
      { sub: '8) Ajustes Finais' },
      { p: 'Para conferir se o bando está adequado como ameaça, compare-o com outras criaturas de ND semelhante. Você pode fazer alguns ajustes, como aumentar o número de ataques se o dano estiver muito baixo ou adicionar resistências e imunidades para aumentar suas defesas.' },
    ],
  };

  // ── EXEMPLOS DO LIVRO ────────────────────────────────────────────
  const EXEMPLOS = [
    {
      id: 'dejeto', titulo: 'Exemplo de Criação de Ameaça: Dejeto Vivo', icone: '🟢',
      resumo: 'Um monstro solo Grande de ND 6, passo a passo, do conceito à ficha pronta.',
      blocos: [
        { sub: 'Passo 0: Conceito e Nome' },
        { p: 'Começamos pelo conceito e nome. Esta será uma criatura amorfa que vive nos esgotos de grandes cidades, como Valkaria, alimentando-se de dejetos, restos de itens alquímicos e componentes mágicos. Enfim, uma pilha de lixo animada por magia e alquimia. O nome será algo bastante evocativo: dejeto vivo. Com isso, temos o suficiente para uma descrição.' },
        { exemplo: 'Os esgotos de Valkaria recebem todo tipo de resíduo, desde os restos do dia a dia da cidade até lixo produzido por alquimistas, inventores e conjuradores. Levados pelas chuvas até os drenos, essas substâncias se misturam e se acumulam. Com o tempo, a combinação de dejetos alquímicos e mágicos pode dar origem a um tipo particular de limo monstruoso: o dejeto vivo.' },
        { exemplo: 'Dejetos vivos são criaturas amorfas, constituídas por dejetos mesclados a substâncias alquímicas e resíduos mágicos. Desprovidas de mente ou vontade, elas existem apenas para se alimentar, devorando tudo que é orgânico em seu caminho. Vivem em esgotos ou ruínas escuras e úmidas, de onde saem à noite em busca de alimento. Caçam projetando pseudópodes, usando-os para agarrar e engolfar suas presas, que então são lentamente digeridas em seu interior.' },
        { sub: 'Passo 1: Tipo, Tamanho e Papel' },
        { p: 'Uma criatura monstruosa, de inteligência limitada e forma não humanoide se encaixa no conceito de “monstro”. Ele será um caçador solitário, que enfrentará os personagens sozinho, usando ataques físicos e algumas habilidades de suporte, o que se encaixa no conceito de “solo”. Ele é capaz de ocupar grandes espaços nos túneis e esgotos onde vive, mas ao mesmo tempo é limitado pelo tamanho desses espaços. “Grande” parece um tamanho adequado.' },
        { p: 'Como um ser amorfo, um dejeto vivo não é muito rápido, e pode ter deslocamento 6m. Entretanto, ele vive em túneis e corredores muitas vezes alagados. Assim, terá também deslocamentos de escalada e de natação, ambos 6m.' },
        { sub: 'Passo 2: Nível de Desafio' },
        { p: 'Esgotos são um dos cenários de aventuras mais comuns para personagens iniciantes. Porém, o dejeto habita os túneis de grandes cidades, um ambiente mais adequado para personagens veteranos. Assim, ND 6 parece adequado a ele.' },
        { sub: 'Passo 3: Estatísticas de Combate' },
        { p: 'Para as estatísticas de combate, consultamos a linha correspondente a ND 6 na seção “Solo” da Tabela 2-3. Por sua composição química e mágica, mente simples e mobilidade reduzida, faz sentido atribuir os valores de resistência indicados na tabela (do maior ao menor) em Fortitude, Vontade e Reflexos. Uma gosma amorfa será uma criatura lenta, mas ao mesmo tempo vigorosa. Assim, podemos reduzir sua Defesa para 24 (equivalente a ND 5) e aumentar seus PV para 280 (equivalente a ND 7).' },
        { sub: 'Passo 4: Ataques' },
        { p: 'A descrição do dejeto vivo menciona “pseudópodes”. De forma geral, não é indicado colocar muitos ataques em uma mesma ameaça, mas o dejeto será bastante simples, então pode ter três ataques. Seu dano médio é 56, o que equivale a 19 por ataque (arredondando para cima). Para o dano base usamos 1d8 (o dano de armas naturais de criaturas Grandes) de impacto. Para representar sua natureza química, eles causarão também 1d8 pontos de dano de ácido, o que resulta em um dano médio de 9. Por fim, ele soma +10 ao dano de cada ataque, para alcançar o dano médio desejado.' },
        { sub: 'Passo 5: Habilidades' },
        { p: 'Por ser veterano, o dejeto vivo tem quatro habilidades. Ele é formado por elementos alquímicos e mágicos, por isso recebe resistência a magia e alquimia +5 (como “alquimia” não é um efeito muito poderoso, podemos considerar tudo uma habilidade só).' },
        { p: 'Para as habilidades seguintes, escolhemos Agarrar Aprimorado e Engolir, que representam sua forma de caçar e se alimentar. Como uma criatura feita de lixo, ele deve ser bastante fedorento; por isso recebe um efeito de área (importante para criaturas solo) que deixa os oponentes enjoados.' },
        { p: 'Por fim, ele recebe uma habilidade sensorial. Monstros costumam ter visão no escuro, mas, em vez disso, ele terá percepção às cegas em alcance médio, o que parece mais adequado a uma criatura sem olhos que vive em túneis sem luz.' },
        { p: 'Somando tudo, o dejeto vivo tem cinco habilidades. Entretanto, como várias são passivas e simples, ele ficou ao mesmo tempo equilibrado e simples de usar. Assim, parece adequado manter esse número.' },
        { sub: 'Passo 6: Estatísticas Secundárias' },
        { p: 'Começamos definindo os valores de atributo; dejetos vivos são criaturas fortes e resistentes, mas lentas. Assim, ele recebe valores excelentes para Força (4) e Constituição (5), mas uma Destreza ineficaz (–1). Por outro lado, são seres irracionais, guiados por seu instinto primário. Ele recebe uma Inteligência incapaz (–5) e valores medianos para Sabedoria (1) e Carisma (0).' },
        { p: 'Dejetos vivos são criaturas simples, que vivem apenas para se alimentar, sobretudo de presas vivas. Eles não são particularmente rápidos, mas possuem sentidos apurados para navegar em um ambiente caótico e sujo. Assim, precisam apenas de Percepção treinada; seu valor será +6 (3 pela metade de seu ND 6, 2 por treinamento e 1 por Sabedoria).' },
        { sub: 'Passo 7: Equipamento e Tesouro' },
        { p: 'Dejetos vivos não usam itens. Mas, como muitos predadores, é possível que seus túneis abriguem os tesouros de suas vítimas, o que justifica um tesouro Padrão. Entretanto, como se alimentam de alquimia, excluímos itens alquímicos de seus tesouros. Para compensar isso, ele recebe um tesouro especial: doses de ácido. Por ser um recurso barato, podemos incluir algumas doses (1d6). A CD para extraí-las é 21 (15 + o ND do dejeto).' },
        { p: 'Após esses passos, temos mais uma ameaça para espreitar os esgotos das grandes cidades de Arton.' },
      ],
      ficha:
'Dejeto Vivo ND 6\n' +
'Monstro Grande\n' +
'Iniciativa +2, Percepção +6, percepção às cegas (médio)\n' +
'Defesa 24, Fort +18, Ref +6, Von +12, resistência a alquimia e magia +5\n' +
'Pontos de Vida 280\n' +
'Deslocamento 6m (4q), escalada 6m (4q), natação 6m (4q)\n' +
'Corpo a Corpo Três pseudópodes +20 (1d8+10 impacto, x2, mais 1d8 ácido).\n' +
'Agarrar Aprimorado (Livre) Pseudópode (teste +22).\n' +
'Engolir (Padrão) No início de cada um dos turnos do dejeto vivo, a criatura engolida sofre 2d6+10 pontos de dano de ácido. Ela pode escapar causando um total de 20 pontos de dano ao interior do dejeto (Defesa 10).\n' +
'Odor Nauseabundo Uma criatura que comece seu turno em alcance curto do dejeto vivo fica enjoada pela cena (Fort CD 22 evita e a criatura não pode mais ficar enjoada por esta habilidade até o fim da cena).\n' +
'For 4, Des −1, Con 5, Int −5, Sab 1, Car 0\n' +
'Tesouro Padrão (exceto itens alquímicos), 1d6 doses de ácido (CD 21 para extrair).',
    },
    {
      id: 'cardume', titulo: 'Exemplo de Criação de Bando: Cardume de Aquin’ne', icone: '🌊',
      resumo: 'Um aquin’ne (lacaio ND 2) vira um bando de dez — lacaio ND 5, um patamar acima.',
      blocos: [
        { p: 'Neste exemplo, vamos transformar um simpático aquin’ne (veja p. 88) em um bando chamado cardume de aquin’ne. Para isso, vamos executar os passos a seguir.' },
        { sub: '1) Composição do Bando' },
        { p: 'Para começar, definimos a composição do bando. Algo entre oito a doze aquin’ne parece bom para um cardume dessas criaturas.' },
        { sub: '2) Determine o ND' },
        { p: 'Por sua composição, esse bando parece ligeiramente mais poderoso que um aquin’ne individual. ND 5 (3 pontos acima de um aquin’ne, e o suficiente para transformá-lo em veterano) parece um bom valor.' },
        { sub: '3) Ajuste o Tamanho' },
        { p: 'Um aquin’ne é uma criatura Pequena, então um bom tamanho para um bando com aproximadamente dez indivíduos é Médio. Isso afeta seus valores de manobras de combate e Furtividade.' },
        { sub: '4) Ajuste as Estatísticas de Combate' },
        { p: 'Um aquin’ne é um lacaio de ND 2. Verificando suas estatísticas de combate, vemos que seu ataque é +13 (1 ponto abaixo do ataque de uma criatura de seu papel e ND). Para definir o ataque do cardume, consultamos a linha de um lacaio de ND 5 e usamos esse valor, aplicando a diferença de 1 entre o ataque de um aquin’ne e o de seu ND original. Assim, o cardume de aquin’ne terá ataque +19. Para as demais estatísticas de combate, basta repetir esse processo. Por fim, o dano do cardume será 4d4+12 (o dobro do dano de um aquin’ne individual, devido ao seu aumento de 1 patamar).' },
        { sub: '5) Perícias' },
        { p: 'O cardume de aquin’ne é uma criatura de ND 5, 3 pontos acima do ND 2 de um aquin’ne padrão. Isso significa um aumento de +1 em todas as suas perícias.' },
        { sub: '6) Habilidades de Bando' },
        { p: 'Como o cardume é uma criatura de patamar veterano, podemos adicionar uma habilidade. Para deixar as coisas simples e representar sua forma aquática, escolhemos a habilidade Varrer.' },
        { sub: '7) Equipamento e Tesouro' },
        { p: 'Aquin’ne não possuem equipamento, então isso não será alterado no cardume. Entretanto, fornecem um recurso especial: 1 dose de éter elemental. Assim, ajustamos a CD para extrair esse recurso para 20 (refletindo o aumento no ND do bando) e aumentamos a quantidade de doses para 2d4 (representando que nem todas as doses poderão ser aproveitadas).' },
        { p: 'Após essas etapas, temos uma nova criatura.' },
      ],
      ficha:
'Cardume de Aquin’ne ND 5\n' +
'Espírito (elemental) Médio\n' +
'Iniciativa +5, Percepção +5, visão no escuro\n' +
'Defesa 23, Fort +14, Ref +11, Von +6, imunidade a acertos críticos e efeitos de atordoamento, cansaço, frio, metabolismo e paralisia, vulnerabilidade a fogo\n' +
'Pontos de Vida 40\n' +
'Deslocamento 9m (6q), natação 15m (10q)\n' +
'Corpo a Corpo [Bando] Tentáculo hídrico x2 +19 (4d4+12 corte).\n' +
'Afogar Uma criatura agarrada pelo cardume de aquin’ne é considerada submersa até se soltar.\n' +
'Agarrar Aprimorado (Livre) Tentáculo hídrico (teste +21).\n' +
'Redemoinho de Maresia (Padrão) O cardume toca um objeto adjacente, que perde 10 PV (Ref CD 20 evita).\n' +
'Varrer (Livre) Uma vez por rodada, quando o cardume de aquin’ne faz um ataque corpo a corpo e reduz os pontos de vida do alvo para 0 ou menos, pode realizar um ataque adicional contra outra criatura dentro do seu alcance.\n' +
'For 4, Des 2, Con 2, Int –2, Sab 2, Car –2\n' +
'Perícias Atletismo +7 (+15 para nadar), Furtividade +3 (+13 na água).\n' +
'Tesouro 2d4 doses de éter elemental (frio) (CD 20 para extrair).',
    },
  ];

  // ── BIBLIOTECA DE HABILIDADES GERAIS (Capítulo 1, p. 15–17) ──────
  //  Um clique põe o texto na ficha. {ND}, {CD} e {ATAQUE} são
  //  substituídos pelos números da criatura em construção.
  const HABILIDADES_GERAIS = [
    { nome: 'Agarrar Aprimorado', acao: 'Livre', grupo: 'Ataque',
      texto: 'Se a criatura acertar um ataque com uma arma natural (especificada na habilidade), poderá fazer a manobra agarrar com esta arma como uma ação livre. Enquanto está usando a arma natural para agarrar, a criatura não pode usá-la para desferir outros ataques. A descrição da habilidade pode limitar o tipo ou tamanho de criatura que pode ser agarrada desta forma e também descrever efeitos adicionais.' },
    { nome: 'Ataque Furtivo', acao: '', grupo: 'Ataque',
      texto: 'A criatura é capaz de desferir ataques furtivos, como um ladino. Uma vez por rodada, ela causa a quantidade de dano adicional indicada com ataques corpo a corpo, ou à distância em alcance curto, contra alvos desprevenidos ou que ela esteja flanqueando. Se o ataque furtivo da ameaça tiver qualquer efeito adicional, ele também será descrito aqui.' },
    { nome: 'Bando', acao: '', grupo: 'Variadas',
      texto: 'A criatura é formada por um grupo de indivíduos, geralmente seres do mesmo tipo, embora possam existir bandos mistos. Se um ataque do bando exceder a Defesa do inimigo por 10 ou mais, ele causa o dobro do dano. Se um ataque do bando errar, ele ainda assim causa metade do dano. Um bando é imune a manobras de combate e efeitos que afetam apenas uma criatura e não causam dano, mas tem vulnerabilidade a dano de área. Um personagem com o poder Trespassar que acerte a criatura pode usá-lo para fazer um ataque adicional contra ela (mas apenas uma vez por turno).' },
    { nome: 'Cura Acelerada', acao: '', grupo: 'Defesa',
      texto: 'No início de seu turno, a criatura recupera pontos de vida iguais ao seu valor de cura acelerada (por exemplo, 5 PV com cura acelerada 5). Se houver algum tipo de dano listado após uma barra, esta habilidade não recupera dano do tipo listado. Cura acelerada não cura perda de PV, apenas dano.' },
    { nome: 'Derrubar', acao: 'Livre', grupo: 'Ataque',
      texto: 'Se a criatura acertar um ataque com uma arma (especificada na habilidade), poderá fazer a manobra derrubar com esta arma como uma ação livre. A descrição da habilidade pode limitar o tipo ou tamanho de criatura que pode ser derrubada desta forma e também descrever efeitos adicionais.' },
    { nome: 'Doença', acao: '', grupo: 'Ataque',
      texto: 'Um dos ataques da criatura transmite uma doença. Um personagem que sofra dano desse ataque deve passar num teste de Fortitude (CD {CD}) ou é contaminado. Uma vez que contraia a doença, o personagem não sofre efeitos adicionais por ser atingido novamente. Veja mais sobre doenças em Tormenta20, p. 318.' },
    { nome: 'Engolir', acao: 'Padrão', grupo: 'Ataque',
      texto: 'Se a ameaça começar seu turno agarrando uma criatura uma ou mais categorias de tamanho menor, poderá fazer um teste de agarrar contra ela. Se vencer, engole a criatura. Uma criatura engolida continua agarrada, fica cega, tem cobertura total contra efeitos vindos do lado de fora da ameaça (e vice-versa) e sofre o dano indicado no início de cada turno da ameaça. Ela pode escapar vencendo um teste de agarrar ou de Acrobacia contra o valor de agarrar da ameaça ou causando dano à ameaça até atingir o valor indicado. Isso faz com que a ameaça regurgite todas as criaturas engolidas, que ficam caídas em espaços adjacentes desocupados na frente dela, e reinicia a contagem de dano. A menos que indicado o contrário, a ameaça só pode manter uma criatura engolida por vez.' },
    { nome: 'Enxame', acao: '', grupo: 'Variadas',
      texto: 'A criatura é um aglomerado de seres menores que agem em conjunto. Pode entrar no espaço ocupado por um personagem e, no fim de seu turno, causa um efeito (geralmente dano) indicado em sua descrição a qualquer personagem em seu espaço, automaticamente. Um enxame é imune a manobras de combate e efeitos que afetam apenas uma criatura e não causam dano, mas tem vulnerabilidade a dano de área. Além disso, sofre apenas metade do dano de ataques com armas. Estar dentro de um enxame conta como condição ruim para lançar magias.' },
    { nome: 'Evasão', acao: '', grupo: 'Defesa',
      texto: 'Quando sofre um efeito que permite um teste de Reflexos para reduzir o dano à metade, a criatura não sofre dano algum se passar. Ela ainda sofre dano normal se falhar no teste de Reflexos. Esta habilidade exige liberdade de movimentos; a criatura não pode usá-la se estiver de armadura pesada ou imóvel.' },
    { nome: 'Evasão Aprimorada', acao: '', grupo: 'Defesa',
      texto: 'Como Evasão, mas, se a criatura falhar no teste de Reflexos, sofre apenas metade do dano.' },
    { nome: 'Familiar', acao: '', grupo: 'Variadas',
      texto: 'A criatura pode ser invocada como um familiar. Veja o poder Familiar (Tormenta20, p. 38), e o Apêndice A.' },
    { nome: 'Faro', acao: '', grupo: 'Percepção',
      texto: 'A criatura tem olfato apurado. Contra inimigos que não possa ver, ela não fica desprevenida e camuflagem total lhe causa apenas 20% de chance de falha em alcance curto.' },
    { nome: 'Fortificação', acao: '', grupo: 'Defesa',
      texto: 'A criatura tem uma chance (indicada por uma porcentagem) de ignorar o dano adicional de acertos críticos e ataques furtivos. Jogue 1d100 sempre que a criatura sofrer um acerto crítico ou ataque furtivo. Se o resultado for igual ou menor que seu valor de fortificação, a criatura ignora o dano adicional do ataque, exatamente como se tivesse Imunidade a esse efeito.' },
    { nome: 'Imunidade', acao: '', grupo: 'Defesa',
      texto: 'A criatura é imune a um tipo de efeito ou outro elemento (como um tipo de dano, uma condição ou uma habilidade). Ela não sofre nenhuma consequência direta daquilo contra a qual é imune. Ela ainda pode ser afetada indiretamente — por exemplo, uma criatura imune a efeitos mágicos ainda é afetada por terreno difícil criado por magias. Imunidade a acertos críticos e/ou ataques furtivos os transforma em acertos normais.' },
    { nome: 'Incorpóreo', acao: '', grupo: 'Defesa',
      texto: 'A criatura não tem corpo físico. Só pode ser afetada por armas e efeitos mágicos ou outras criaturas incorpóreas. Ela pode atravessar objetos sólidos, mas não manipulá-los, e tem Força nula.' },
    { nome: 'Magias', acao: '', grupo: 'Variadas', magica: true,
      texto: 'A criatura lança magias como um conjurador de {ND}º nível (CD {CD}). Ela segue todas as regras de magias, bem como as regras e limitações específicas de sua classe. Considere que a criatura tem todos os componentes materiais para suas magias. Sem limite de PM indicado, use o ND da criatura.' },
    { nome: 'Maior que a Morte', acao: '', grupo: 'Defesa',
      texto: 'Enquanto tiver pelo menos metade de seus PV, a criatura é imune a habilidades de “morte instantânea”. Isso inclui efeitos que reduzem seus PV a 0 ou menos instantaneamente (como Assassino Fantasmagórico), que aprisionam ou destroem sua alma ou corpo (como Roubar a Alma e Buraco Negro) e similares. O mestre tem a palavra final se um efeito é ou não de morte instantânea. A criatura ainda pode ser reduzida a 0 PV ou menos por dano ou perda de vida.' },
    { nome: 'Natureza Vegetal', acao: '', grupo: 'Defesa',
      texto: 'A criatura é um vegetal senciente, ou possui traços vegetais em sua fisiologia. Ela é imune a atordoamento e metamorfose, mas é afetada especificamente por efeitos que afetem plantas monstruosas. No caso de magias sem teste de resistência, ela tem direito a um teste de Fortitude (CD da magia) para evitar o efeito.' },
    { nome: 'Parceiro', acao: '', grupo: 'Variadas',
      texto: 'A criatura pode ser empregada como um parceiro. Para mais informações, veja o Apêndice A.' },
    { nome: 'Percepção às Cegas', acao: '', grupo: 'Percepção',
      texto: 'A criatura usa sentidos diferentes da visão (como radar, sonar, sensibilidade a vibrações etc.). Efeitos relacionados à visão, como escuridão e invisibilidade, não a afetam. Ela pode fazer testes de Percepção para observar usando estes sentidos, em vez da visão. Esta habilidade tem alcance curto (a menos que especificado em contrário).' },
    { nome: 'Redução de Dano', acao: '', grupo: 'Defesa',
      texto: 'A criatura ignora parte do dano que sofre. Por exemplo, se uma criatura com RD 5 sofre um ataque que causa 8 pontos de dano, perde apenas 3 PV. A redução pode ser contra um ou mais tipos de dano específicos. Caso haja um ou mais tipos de dano listados após uma barra, a RD não se aplica àqueles tipos (RD 10/mágico ignora 10 pontos de dano de tudo, exceto de habilidades e armas mágicas).' },
    { nome: 'Resistência a <efeito>', acao: '', grupo: 'Defesa',
      texto: 'A criatura recebe um bônus em testes de resistência contra efeitos do tipo especificado. Por exemplo, resistência a magia +2 fornece +2 em testes de Fortitude, Reflexos e Vontade contra efeitos mágicos.' },
    { nome: 'Sensibilidade a Luz', acao: '', grupo: 'Variadas',
      texto: 'A criatura é suscetível a luz. Quando exposta à luz do sol ou similar, ela fica ofuscada.' },
    { nome: 'Visão na Penumbra', acao: '', grupo: 'Percepção',
      texto: 'A criatura enxerga em escuridão leve em alcance curto (exceto mágica). Ela ignora camuflagem leve por esse tipo de escuridão.' },
    { nome: 'Visão no Escuro', acao: '', grupo: 'Percepção',
      texto: 'A criatura enxerga em escuridão total em alcance curto (exceto mágica). Ela ignora camuflagem total por esse tipo de escuridão.' },
    { nome: 'Vulnerabilidade a <efeito>', acao: '', grupo: 'Defesa',
      texto: 'A criatura sofre +50% de dano ou de perda de vida (conforme apropriado) de um tipo ou característica específicos. Por exemplo, se uma criatura com vulnerabilidade a frio sofre um ataque que causa 15 pontos de dano de frio, ela sofre 22 pontos de dano (15 x 1,5 = 22).' },
    // deslocamentos especiais — entram como habilidade quando o mestre quer o texto na ficha
    { nome: 'Escalada', acao: '', grupo: 'Movimento',
      texto: 'A criatura pode caminhar por superfícies verticais ou mesmo de cabeça para baixo. Isso segue as demais regras de movimento e é afetado pelas características da superfície. Uma criatura que esteja escalando e perca seu deslocamento de escalada ou a capacidade de realizar ações cai.' },
    { nome: 'Escavação', acao: '', grupo: 'Movimento',
      texto: 'A criatura pode se mover sob terreno granular, como terra e areia (mas não rocha sólida). Após a passagem da criatura, o terreno atrás dela se fecha. Deslocamento de escavação pode ser afetado pelas características do solo.' },
    { nome: 'Natação', acao: '', grupo: 'Movimento',
      texto: 'A criatura pode se deslocar na água sem precisar fazer testes de Atletismo. Ela pode respirar debaixo d’água, mas não fora dela, a menos que tenha outra forma de deslocamento. Pode falar e lançar magias debaixo d’água e não sofre as penalidades de –2 em testes de ataque e –5 em Percepção por estar submersa, nem a redução no dano de suas armas naturais.' },
    { nome: 'Voo', acao: '', grupo: 'Movimento',
      texto: 'A criatura pode voar e encerrar seu deslocamento em pleno ar. Uma criatura que esteja voando e perca seu deslocamento de voo ou a capacidade de realizar ações cai 150m por rodada. Uma criatura que esteja voando e sofra uma manobra derrubar bem-sucedida cai 1d6 x 1,5m antes de recuperar o voo.' },
  ];

  return {
    REFERENCIAS: REFERENCIAS,
    ABERTURA: ABERTURA,
    PASSOS: PASSOS,
    MODIFICAR: MODIFICAR,
    BANDOS: BANDOS,
    EXEMPLOS: EXEMPLOS,
    HABILIDADES_GERAIS: HABILIDADES_GERAIS,
  };
})();
