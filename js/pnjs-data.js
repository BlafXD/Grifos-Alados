// ═══════════════════════════════════════════════════════════════════
//  PNJS-DATA.JS — PNJs, atitude social e nomes de Arton (dados puros)
//  Localização: /grifos-alados/js/pnjs-data.js
//  Consumido por js/pnjs.js, na sub-aba "👥 PNJs & Tavernas" das
//  Consultas rápidas (SÓ no index.html — é ferramenta de preparo do
//  mestre, não regra que o jogador precise ter à mão).
//
//  Fontes, tudo do Tormenta20 básico salvo onde indicado:
//    • Categorias de Atitude — p. 259
//    • Tabela 6-1: Estatísticas de NPCs (perícia forte/fraca) — p. 259
//    • Mudar Atitude (perícia Diplomacia) — p. 118
//    • Arquétipos de NPCs (Capítulo 6: O Mestre) — p. 257–258
//    • Nomes em Arton (quadro) — p. 361 e 364 (continuação)
//
//  NOMES: para os povos em que o livro descreve um PADRÃO composto
//  (prenome + sobrenome anão; prenome + linhagem + sobrenome táurico;
//  primeiro nome + "filho de"/"de <lugar>"/"de <deus>" humano), os
//  poucos exemplos do livro viram peças que se recombinam — aplicando
//  o padrão que o próprio livro descreve, não inventando nomes novos.
//  Para os povos em que o livro só dá uma lista solta (élfico, goblin,
//  lefou, qareen, dahllan), NÃO há recombinação: é sorteio puro entre
//  os exemplos literais do livro, por menor que seja a lista.
// ═══════════════════════════════════════════════════════════════════
(function () {
  'use strict';

  window.GA_PNJS = {

    // ── Categorias de Atitude (p. 259) ──────────────────────────────
    ATITUDES: [
      { chave: 'prestativo', nome: 'Prestativo', mod: '+5 em testes de persuasão',
        texto: 'Adora o personagem e pode ajudá-lo, mesmo correndo perigo.' },
      { chave: 'amistoso', nome: 'Amistoso', mod: 'sem modificador',
        texto: 'Gosta do personagem e pode ajudá-lo, mas dificilmente se arriscará por ele.' },
      { chave: 'indiferente', nome: 'Indiferente', mod: 'sem modificador', padrao: true,
        texto: 'Não gosta nem desgosta do personagem. Vai tratá-lo como socialmente esperado. Esta é a categoria padrão.' },
      { chave: 'inamistoso', nome: 'Inamistoso', mod: '−5 em testes de persuasão',
        texto: 'Desgosta do personagem, mas não a ponto de se arriscar para prejudicá-lo. Pode enganá-lo, criar intrigas sobre ele...' },
      { chave: 'hostil', nome: 'Hostil', mod: 'falha automática em testes de persuasão',
        texto: 'Odeia o personagem e vai tentar prejudicá-lo, mesmo correndo perigo — pode roubá-lo ou mesmo atacá-lo!' },
    ],

    // ── Tabela 6-1: Estatísticas de NPCs (p. 259) ───────────────────
    // "forte" é a perícia em que o conceito do NPC se apoia (Diplomacia,
    // Ofício e Vontade para um mercador, por exemplo); as demais usam "fraca".
    PATAMARES: [
      { chave: 'iniciante', nome: 'Iniciante', exemplo: 'guarda de cidade, mascate...', forte: 5,  fraca: 0 },
      { chave: 'veterano',  nome: 'Veterano',  exemplo: 'capitão da guarda, mercador próspero...', forte: 10, fraca: 3 },
      { chave: 'campeao',   nome: 'Campeão',   exemplo: 'guarda-costas real, mestre de guilda...', forte: 15, fraca: 6 },
    ],

    // ── Mudar Atitude — perícia Diplomacia (p. 118) ─────────────────
    MUDAR_ATITUDE:
      'Teste de Diplomacia oposto pelo teste de Vontade do alvo. Se passar, muda a atitude dele em ' +
      'UMA categoria para cima ou para baixo, à sua escolha (ou, se passar por 10 ou mais, em DUAS ' +
      'categorias). Se falhar por 5 ou mais, a atitude do alvo muda uma categoria na direção OPOSTA. ' +
      'Gasta um minuto (ou uma ação completa, com −10 no teste). Só pode mudar a atitude de um mesmo ' +
      'alvo uma vez por dia.',

    // ── Arquétipos de NPCs — Capítulo 6: O Mestre (p. 257–258) ──────
    ARQUETIPOS: [
      { chave: 'velhinho-taverna', nome: 'Velhinho da Taverna', pagina: 257,
        texto: 'Talvez o tipo mais clássico de Tormenta20. O velhinho da taverna é uma pessoa (em geral ' +
          'um senhor idoso) que chega aonde os aventureiros estão reunidos (em geral uma taverna) ' +
          'anunciando que há um problema urgente que só pode ser resolvido por heróis. Embora seja um ' +
          'clichê, o velhinho da taverna tem algumas vantagens: ele claramente precisa de ajuda, não pode ' +
          'resolver o problema sozinho e tem informações relevantes. Todos aceitam que um velhinho não ' +
          'possa dar cabo de um bando de hobgoblins com as próprias mãos, mas que conheça bem os ' +
          'caminhos da floresta porque andava por lá quando era jovem. Os heróis não precisam desconfiar ' +
          'do velhinho da taverna, pois ele é uma figura conhecida na região. Ele tem necessidade, ' +
          'informação e confiabilidade — a receita certa para dar uma missão aos aventureiros.' },
      { chave: 'mentor-palpiteiro', nome: 'Mentor Palpiteiro', pagina: 257,
        texto: 'Muitos heróis precisam aprender suas habilidades com alguém, ou precisam de alguém que ' +
          'lhes dê conselhos, ordens e às vezes alguns presentes. O mentor palpiteiro é uma figura de ' +
          'autoridade na vida de um ou mais personagens jogadores. É um NPC útil porque, através dele, o ' +
          'mestre pode dar qualquer dica ou bônus aos heróis. Por que ele não deu esse benefício antes? ' +
          'Porque era importante que o herói aprendesse a se virar sozinho, para ter humildade e ' +
          'perseverança. Além disso, o mentor palpiteiro pode colocar os aventureiros na linha quando ' +
          'estão fazendo bobagens demais ou servir como a voz do mestre e do cenário. O mentor palpiteiro ' +
          'não está disponível sempre que o jogador quer, ele surge quando decide. Pode parecer arbitrário ' +
          'ou até mesmo injusto, mas se ele for misterioso e sábio o bastante, os heróis vão aceitar.' },
      { chave: 'protegido-indefeso', nome: 'Protegido Indefeso', pagina: 258,
        texto: 'Um NPC incapaz de resistir sozinho a qualquer perigo, mas que está nas mesmas situações ' +
          'que os heróis. O protegido indefeso pode ser um fator de complicação em combates (precisa ' +
          'sempre haver alguém garantindo que não seja atingido) ou pode ser sequestrado para motivar ' +
          'aventuras. Ele só funciona se o grupo se importar com ele e se houver uma boa razão para ele ' +
          'não conseguir se virar sozinho. Para garantir que o protegido indefeso tenha a simpatia do ' +
          'grupo, faça com que ele ofereça algum benefício (por exemplo, é um garoto muito doente, mas ' +
          'capaz de prever o futuro) e que só entre em jogo esporadicamente.' },
      { chave: 'amigo', nome: 'Amigo', pagina: 258,
        texto: 'É fácil criar um mundo em que todos são vítimas que precisam ser salvas (velhinhos da ' +
          'taverna, protegidos indefesos) ou bandidos que querem matar os heróis (capangas em geral). ' +
          'Para evitar isso, existe o amigo. O amigo é um NPC que vive para ajudar. Ele não deve ' +
          'acompanhar os heróis o tempo todo, mas às vezes aparece para auxiliar em combate, dar dicas ou ' +
          'mesmo oferecer um ombro amigo. O segredo para um bom amigo é que ele não deve ser contrário a ' +
          'nenhum objetivo dos heróis. Quando eles se encontram, é um alívio. Um amigo ocasional faz com ' +
          'que o jogo seja mais leve e diminui qualquer sensação de antagonismo entre jogadores e mestre.' },
      { chave: 'vilao', nome: 'Vilão', pagina: 258,
        texto: 'Nenhuma boa história de fantasia pode existir sem um bom vilão. O vilão deve ter um plano ' +
          'que ameaça o modo de vida dos personagens de forma definitiva, mas que pareça plausível. Um ' +
          'vilão cujo plano é destruir o mundo certamente será derrotado, pois os jogadores sabem que você ' +
          'não quer destruir Arton. Contudo, um vilão que quer dominar o Reinado pode ser bem-sucedido. O ' +
          'vilão deve ser tão poderoso que é impossível para os heróis vencê-lo até o final da campanha. ' +
          'Contudo, também deve haver algum tipo de comunicação entre heróis e vilão — eles devem ' +
          'encontrá-lo e interagir com ele pelo menos uma vez no início da campanha e uma vez no meio, ' +
          'antes do encontro final. Dê a seu vilão algum motivo para não matar os heróis, e aos heróis um ' +
          'motivo para odiá-lo.' },
      { chave: 'capanga-recorrente', nome: 'Capanga Recorrente', pagina: 258,
        texto: 'Enquanto o vilão é uma figura imperdoável e inatingível, o capanga recorrente é seu ' +
          'assecla, que os aventureiros encontram de novo e de novo ao longo da campanha. Alguns capangas ' +
          'recorrentes são imbecis que só servem para ser alvo de pena ou de piadas, outros são ameaças ' +
          'reais. Contudo, este inimigo está no nível dos heróis — quando eles se enfrentam, o resultado é ' +
          'sempre incerto. Mas o capanga recorrente também deve ter um meio de escapar sempre que for ' +
          'vencido, ou não será recorrente. É comum que ele sofra com uma maldade do vilão entre o meio e ' +
          'o fim da campanha, passando a ser um amigo dos heróis.' },
      { chave: 'indeciso-misterioso', nome: 'Indeciso Misterioso', pagina: 258,
        texto: 'Às vezes, os aventureiros se metem numa enrascada da qual não conseguem sair sozinhos. ' +
          'Entra aí o indeciso misterioso, um personagem mais poderoso que os heróis, capaz de vencer o ' +
          'grupo inteiro sozinho. Ele tem algum meio de surgir e desaparecer de repente. Mais importante ' +
          'do que isso, ele conhece os personagens, mas eles não o conhecem. Seus objetivos às vezes ' +
          'coincidem com os dos heróis, às vezes são contrários. O indeciso misterioso não vai fazer nada ' +
          'que os aventureiros pedirem se não quiser, mas também não os odeia — e quando eles se ' +
          'enfrentam, ele nunca mata. Em algum ponto da história, o grupo deve ficar tão poderoso quanto ' +
          'ele. Então revelará quem era o tempo todo e quais seus objetivos, passando a ser um amigo normal.' },
    ],

    // ── Nomes em Arton (p. 361 e 364) ───────────────────────────────
    NOMES: {
      humano: {
        nome: 'Humano', pagina: 361, composto: true,
        primeiros: ['Thedon', 'Beldon', 'Heleonor', 'Ghart'],
        nota: 'Muitos humanos não possuem sobrenome — mais comum na nobreza ou em linhagens de ' +
          'aventureiros. Entre os plebeus, é costume adotar como sobrenome o nome do pai ou da mãe ' +
          '("Thedon, filho de Beldon"), o local de nascimento ("Heleonor de Bielefeld") ou uma divindade ' +
          '("Ghart de Khalmyr").' },
      anao: {
        nome: 'Anão', pagina: 361, composto: true,
        primeiros: ['Khovarinn', 'Dorotha', 'Bholtarimm'],
        sobrenomes: ['Hastharom', 'Quebra-Pedra', 'Machado-Afiado'],
        nota: 'Anões têm nomes imponentes, que carregam o timbre grave que lembra o bater dos martelos ' +
          'dos ferreiros e dos tambores de batalha. Seus sobrenomes vêm de famílias ancestrais ou de ' +
          'adjetivos que exaltam suas qualidades.' },
      taurico: {
        nome: 'Táurico (minotauro)', pagina: 364, composto3: true,
        prenomes: ['Gaius', 'Petronius'],
        linhagens: ['Aurelius', 'Maximus'],
        sobrenomes: ['Lomatubarius', 'Liturus'],
        unicos: ['Kargan', 'Orgun'],
        nota: 'Minotauros nobres adotam uma convenção de três nomes: um prenome (próprio do indivíduo, ' +
          'normalmente terminado em "ius"), um nome de linhagem (herdado pelo primogênito) e um ' +
          'sobrenome (compartilhado por todos com algum parentesco). Plebeus ou bárbaros possuem um ' +
          'único nome, normalmente de poucas sílabas e som grave.' },
      dahllan: {
        nome: 'Dahllan', pagina: 361,
        nomes: ['Violeta', 'Celandine'],
        nota: 'Esta invenção dos povos civilizados nem sempre é adotada pelas dahllan. As que aceitam ' +
          'costumam escolher nomes de flores — o livro só dá estes dois exemplos.' },
      elfico: {
        nome: 'Élfico', pagina: 364,
        nomes: ['Aeripharian', 'Yadallina', 'Nielendorane', 'Thalesorian'],
        nota: 'Nomes élficos rolam pela língua como uma canção, com muitas vogais abertas e repetições ' +
          'de consoantes. O encurtamento para facilitar a pronúncia é visto como uma gentileza.' },
      goblin: {
        nome: 'Goblin', pagina: 364,
        nomes: ['Krig', 'Tabo', 'Tulan', 'Glab', 'Kyara', 'Barak', 'Galtor'],
        nota: 'No Reinado, goblins possuem nomes curtos, simples e guturais. Não possuem sobrenomes, ' +
          'visto que dificilmente conseguem formar famílias longevas.' },
      lefou: {
        nome: 'Lefou', pagina: 364,
        nomes: ['Haruulk', 'Mar’drull', 'Oharshakk', 'Yrrizevak', 'Estrela Sangrenta', 'Trovão Afiado'],
        nota: 'Normalmente seguem os costumes da raça dos pais. Depois de adulto, um lefou pode escolher ' +
          'um novo nome para si — ou um epíteto grandioso, carregado de consoantes.' },
      qareen: {
        nome: 'Qareen', pagina: 364,
        nomes: ['Kirud', 'Ahad', 'Talud', 'Sahla'],
        nota: 'O nome verdadeiro de um qareen, concedido pela deusa Wynna, muitas vezes termina com um ' +
          '"d" mudo.' },
    },
  };
})();
