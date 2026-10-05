// ════════════════════════════════════════════════════════════════════
//  PODERES-RACA-ORIGEM-DATA.JS — habilidades de raça, poderes de origem
//  e distinções, com o texto do livro
//  Localização: /grifos-alados/js/poderes-raca-origem-data.js
//
//  Estes três grupos tinham ficado DE FORA em 15/09/2026 (veja o
//  cabeçalho de js/poderes-data.js e docs/poderes-levantamento.md). Em
//  23/09/2026, quando o cartão ✨ Poderes foi desmontado nos dois blocos
//  de baixo da ficha, eles entraram — cada um no seu grupo:
//    • raca-hab   — HABILIDADE de raça: o que a raça dá de graça (Versátil
//                   do humano, Sangue de Dragão do dahllan…). NÃO é o
//                   "poder de raça" do Heróis de Arton (esse é o grupo
//                   'raca', que já estava em poderes-data.js).
//    • origem     — o PODER que cada origem concede (Amigo Especial,
//                   Sangue Azul, Vida Rústica…). A origem também dá
//                   perícias, mas isso é da criação, não vira poder aqui.
//    • distincao  — as distinções do Heróis de Arton, Cap. 2 (p. 102+).
//
//  Lidos do PDF de cada livro (as páginas são as IMPRESSAS):
//    • Tormenta20 Jogo do Ano — raças cap. 1, origens p. 85–95
//    • Heróis de Arton — raças novas, distinções p. 102+
//    • (outros livros conforme entram)
//
//  O formato é o MESMO de js/poderes-data.js (id, nome, grupo, livro,
//  pagina, tags, deus, texto, preReq, custo, quadro), porque a ficha lê
//  tudo de window.GA_PODERES numa lista só. Este arquivo só ACRESCENTA.
//
//  Carregado depois de poderes-data.js e antes de ficha.js (index.html e
//  jogadores.html). Se aquele não tiver rodado, não faz nada.
// ════════════════════════════════════════════════════════════════════
(function () {
  if (!Array.isArray(window.GA_PODERES)) window.GA_PODERES = [];

  //  As entradas entram aqui, na ordem do livro. Cada leva conferida
  //  contra o PDF, palavra por palavra. O ✦ no fim de uma habilidade é
  //  do livro: aquela habilidade é mágica.
  const NOVOS = [

  // ── HABILIDADES DE RAÇA · Tormenta20 Jogo do Ano, cap. 1 (p. 19–31) ──
  //  Um card por raça, com TODAS as habilidades dela no texto. São as 17
  //  raças do básico (as 8 principais + as 9 "raças extras").
  { id: 'raca-humano', nome: 'Humano', grupo: 'raca-hab', livro: 't20', pagina: 19,
    tags: '', deus: null, magica: false, preReq: null, custo: null, quadro: null, texto: [
    '+1 em Três Atributos Diferentes. Filhos de Valkaria, a Deusa da Ambição, humanos podem se destacar em qualquer caminho que escolherem.',
    'Versátil. Você se torna treinado em duas perícias a sua escolha (não precisam ser da sua classe). Você pode trocar uma dessas perícias por um poder geral a sua escolha.',
  ] },
  { id: 'raca-anao', nome: 'Anão', grupo: 'raca-hab', livro: 't20', pagina: 20,
    tags: '', deus: null, magica: false, preReq: null, custo: null, quadro: null, texto: [
    'Constituição +2, Sabedoria +1, Destreza –1.',
    'Conhecimento das Rochas. Você recebe visão no escuro e +2 em testes de Percepção e Sobrevivência realizados no subterrâneo.',
    'Devagar e Sempre. Seu deslocamento é 6m (em vez de 9m). Porém, seu deslocamento não é reduzido por uso de armadura ou excesso de carga.',
    'Duro como Pedra. Você recebe +3 pontos de vida no 1º nível e +1 por nível seguinte.',
    'Tradição de Heredrimm. Você é perito nas armas tradicionais anãs, seja por ter treinado com elas, seja por usá-las como ferramentas de ofício. Para você, todos os machados, martelos, marretas e picaretas são armas simples. Você recebe +2 em ataques com essas armas.',
  ] },
  { id: 'raca-dahllan', nome: 'Dahllan', grupo: 'raca-hab', livro: 't20', pagina: 21,
    tags: '', deus: null, magica: false, preReq: null, custo: null, quadro: null, texto: [
    'Sabedoria +2, Destreza +1, Inteligência –1.',
    'Amiga das Plantas. Você pode lançar a magia Controlar Plantas (atributo-chave Sabedoria). Caso aprenda novamente essa magia, seu custo diminui em –1 PM. ✦',
    'Armadura de Allihanna. Você pode gastar uma ação de movimento e 1 PM para transformar sua pele em casca de árvore, recebendo +2 na Defesa até o fim da cena.',
    'Empatia Selvagem. Você pode se comunicar com animais por meio de linguagem corporal e vocalizações. Você pode usar Adestramento para mudar atitude e persuasão com animais (veja Diplomacia, na página 118). Caso receba esta habilidade novamente, recebe +2 em Adestramento.',
  ] },
  { id: 'raca-elfo', nome: 'Elfo', grupo: 'raca-hab', livro: 't20', pagina: 22,
    tags: '', deus: null, magica: false, preReq: null, custo: null, quadro: null, texto: [
    'Inteligência +2, Destreza +1, Constituição –1.',
    'Graça de Glórienn. Seu deslocamento é 12m (em vez de 9m).',
    'Sangue Mágico. Você recebe +1 ponto de mana por nível.',
    'Sentidos Élficos. Você recebe visão na penumbra e +2 em Misticismo e Percepção.',
  ] },
  { id: 'raca-goblin', nome: 'Goblin', grupo: 'raca-hab', livro: 't20', pagina: 23,
    tags: '', deus: null, magica: false, preReq: null, custo: null, quadro: null, texto: [
    'Destreza +2, Inteligência +1, Carisma –1.',
    'Engenhoso. Você não sofre penalidades em testes de perícia por não usar ferramentas. Se usar a ferramenta necessária, recebe +2 no teste de perícia.',
    'Espelunqueiro. Você recebe visão no escuro e deslocamento de escalada igual ao seu deslocamento terrestre.',
    'Peste Esguia. Seu tamanho é Pequeno (veja a página 106), mas seu deslocamento se mantém 9m. Apesar de pequenos, goblins são rápidos.',
    'Rato das Ruas. Você recebe +2 em Fortitude e sua recuperação de PV e PM nunca é inferior ao seu nível.',
  ] },
  { id: 'raca-lefou', nome: 'Lefou', grupo: 'raca-hab', livro: 't20', pagina: 24,
    tags: '', deus: null, magica: false, preReq: null, custo: null, quadro: null, texto: [
    '+1 em Três Atributos Diferentes (exceto Carisma), Carisma –1.',
    'Cria da Tormenta. Você é uma criatura do tipo monstro e recebe +5 em testes de resistência contra efeitos causados por lefeu e pela Tormenta.',
    'Deformidade. Todo lefou possui defeitos físicos que, embora desagradáveis, conferem certas vantagens. Você recebe +2 em duas perícias a sua escolha. Cada um desses bônus conta como um poder da Tormenta (exceto para perda de Carisma). Você pode trocar um desses bônus por um poder da Tormenta a sua escolha (ele também não conta para perda de Carisma).',
  ] },
  { id: 'raca-minotauro', nome: 'Minotauro', grupo: 'raca-hab', livro: 't20', pagina: 25,
    tags: '', deus: null, magica: false, preReq: null, custo: null, quadro: null, texto: [
    'Força +2, Constituição +1, Sabedoria –1.',
    'Chifres. Você possui uma arma natural de chifres (dano 1d6, crítico x2, perfuração). Uma vez por rodada, quando usa a ação agredir para atacar com outra arma, pode gastar 1 PM para fazer um ataque corpo a corpo extra com os chifres.',
    'Couro Rígido. Sua pele é dura como a de um touro. Você recebe +1 na Defesa.',
    'Faro. Você tem olfato apurado. Contra inimigos em alcance curto que não possa ver, você não fica desprevenido e camuflagem total lhe causa apenas 20% de chance de falha.',
    'Medo de Altura. Se estiver adjacente a uma queda de 3m ou mais de altura (como um buraco ou penhasco), você fica abalado.',
  ] },
  { id: 'raca-qareen', nome: 'Qareen', grupo: 'raca-hab', livro: 't20', pagina: 26,
    tags: '', deus: null, magica: false, preReq: null, custo: null, quadro: null, texto: [
    'Carisma +2, Inteligência +1, Sabedoria –1.',
    'Desejos. Se lançar uma magia que alguém tenha pedido desde seu último turno, o custo da magia diminui em –1 PM. Fazer um desejo ao qareen é uma ação livre.',
    'Resistência Elemental. Conforme sua ascendência, você recebe redução 10 a um tipo de dano. Escolha uma: frio (qareen da água), eletricidade (do ar), fogo (do fogo), ácido (da terra), luz (da luz) ou trevas (qareen das trevas).',
    'Tatuagem Mística. Você pode lançar uma magia de 1º círculo a sua escolha (atributo-chave Carisma). Caso aprenda novamente essa magia, seu custo diminui em –1 PM. ✦',
  ] },
  { id: 'raca-golem', nome: 'Golem', grupo: 'raca-hab', livro: 't20', pagina: 27,
    tags: 'Raça extra', deus: null, magica: false, preReq: null, custo: null, quadro: null, texto: [
    'Força +2, Constituição +1, Carisma –1.',
    'Chassi. Seu corpo artificial é resistente, mas rígido. Seu deslocamento é 6m, mas não é reduzido por uso de armadura ou excesso de carga. Você recebe +2 na Defesa, mas possui penalidade de armadura –2. Você leva um dia para vestir ou remover uma armadura (pois precisa acoplar as peças dela a seu chassi). Por ser acoplada, sua armadura não conta no limite de itens que você pode usar (mas você continua só podendo usar uma armadura).',
    'Criatura Artificial. Você é uma criatura do tipo construto. Recebe visão no escuro e imunidade a efeitos de cansaço, metabólicos e de veneno. Além disso, não precisa respirar, alimentar-se ou dormir, mas não se beneficia de cura mundana e de itens da categoria alimentação. Você precisa ficar inerte por oito horas por dia para recarregar sua fonte de energia. Se fizer isso, recupera PV e PM por descanso em condições normais (golens não são afetados por condições boas ou ruins de descanso). Por fim, a perícia Cura não funciona em você, mas Ofício (artesão) pode ser usada no lugar dela.',
    'Fonte Elemental. Você possui um espírito elemental preso em seu corpo. Escolha entre água (frio), ar (eletricidade), fogo (fogo) e terra (ácido). Você é imune a dano desse tipo. Se fosse sofrer dano mágico desse tipo, em vez disso cura PV em quantidade igual à metade do dano. Por exemplo, se um golem com espírito elemental do fogo é atingido por uma Bola de Fogo que causa 30 pontos de dano, em vez de sofrer esse dano, ele recupera 15 PV.',
    'Propósito de Criação. Você foi construído “pronto” para um propósito específico e não teve uma infância. Você não tem direito a escolher uma origem, mas recebe um poder geral a sua escolha.',
  ] },
  { id: 'raca-hynne', nome: 'Hynne', grupo: 'raca-hab', livro: 't20', pagina: 27,
    tags: 'Raça extra', deus: null, magica: false, preReq: null, custo: null, quadro: null, texto: [
    'Destreza +2, Carisma +1, Força –1.',
    'Arremessador. Quando faz um ataque à distância com uma funda ou uma arma de arremesso, seu dano aumenta em um passo.',
    'Pequeno e Rechonchudo. Seu tamanho é Pequeno (veja a página 106) e seu deslocamento é 6m. Você recebe +2 em Enganação e pode usar Destreza como atributo-chave de Atletismo (em vez de Força).',
    'Sorte Salvadora. Quando faz um teste de resistência, você pode gastar 1 PM para rolar este teste novamente.',
  ] },
  { id: 'raca-kliren', nome: 'Kliren', grupo: 'raca-hab', livro: 't20', pagina: 28,
    tags: 'Raça extra', deus: null, magica: false, preReq: null, custo: null, quadro: null, texto: [
    'Inteligência +2, Carisma +1, Força –1.',
    'Híbrido. Sua natureza multifacetada fez com que você aprendesse conhecimentos variados. Você se torna treinado em uma perícia a sua escolha (não precisa ser da sua classe).',
    'Engenhosidade. Quando faz um teste de perícia, você pode gastar 2 PM para somar sua Inteligência no teste. Você não pode usar esta habilidade em testes de ataque. Caso receba esta habilidade novamente, seu custo é reduzido em –1 PM.',
    'Ossos Frágeis. Você sofre 1 ponto de dano adicional por dado de dano de impacto. Por exemplo, se for atingido por uma clava (dano 1d6), sofre 1d6+1 pontos de dano. Se cair de 3m de altura (dano 2d6), sofre 2d6+2 pontos de dano.',
    'Vanguardista. Você recebe proficiência em armas de fogo e +2 em Ofício (um qualquer, a sua escolha).',
  ] },
  { id: 'raca-medusa', nome: 'Medusa', grupo: 'raca-hab', livro: 't20', pagina: 28,
    tags: 'Raça extra', deus: null, magica: false, preReq: null, custo: null, quadro: null, texto: [
    'Destreza +2, Carisma +1.',
    'Cria de Megalokk. Você é uma criatura do tipo monstro e recebe visão no escuro.',
    'Natureza Venenosa. Você recebe resistência a veneno +5 e pode gastar uma ação de movimento e 1 PM para envenenar uma arma que esteja usando. A arma causa perda de 1d12 pontos de vida. O veneno dura até você acertar um ataque ou até o fim da cena (o que acontecer primeiro). Veneno.',
    'Olhar Atordoante. Você pode gastar uma ação de movimento e 1 PM para forçar uma criatura em alcance curto a fazer um teste de Fortitude (CD Car). Se a criatura falhar, fica atordoada por uma rodada (apenas uma vez por cena).',
  ] },
  { id: 'raca-osteon', nome: 'Osteon', grupo: 'raca-hab', livro: 't20', pagina: 29,
    tags: 'Raça extra', deus: null, magica: false, preReq: null, custo: null, quadro: null, texto: [
    '+1 em Três Atributos Diferentes (exceto Constituição), Constituição –1.',
    'Armadura Óssea. Você recebe redução de corte, frio e perfuração 5.',
    'Memória Póstuma. Você se torna treinado em uma perícia (não precisa ser da sua classe) ou recebe um poder geral a sua escolha. Como alternativa, você pode ser um osteon de outra raça humanoide que não humano. Neste caso, você ganha uma habilidade dessa raça a sua escolha. Se a raça era de tamanho diferente de Médio, você também possui sua categoria de tamanho.',
    'Natureza Esquelética. Você é uma criatura do tipo morto-vivo. Recebe visão no escuro e imunidade a efeitos de cansaço, metabólicos, de trevas e de veneno. Além disso, não precisa respirar, alimentar-se ou dormir. Por fim, efeitos mágicos de cura de luz causam dano a você e você não se beneficia de itens da categoria alimentação, mas dano de trevas recupera seus PV.',
    'Preço da Não Vida. Você precisa passar oito horas sob a luz de estrelas ou no subterrâneo. Se fizer isso, recupera PV e PM por descanso em condições normais (osteon não são afetados por condições boas ou ruins de descanso). Caso contrário, sofre os efeitos de fome.',
  ] },
  { id: 'raca-sereia-tritao', nome: 'Sereia/Tritão', grupo: 'raca-hab', livro: 't20', pagina: 29,
    tags: 'Raça extra', deus: null, magica: false, preReq: null, custo: null, quadro: null, texto: [
    '+1 em Três Atributos Diferentes.',
    'Canção dos Mares. Você pode lançar duas das magias a seguir: Amedrontar, Comando, Despedaçar, Enfeitiçar, Hipnotismo ou Sono (atributo-chave Carisma). Caso aprenda novamente uma dessas magias, seu custo diminui em –1 PM. ✦',
    'Mestre do Tridente. Para você, o tridente é uma arma simples. Além disso, você recebe +2 em rolagens de dano com azagaias, lanças e tridentes.',
    'Transformação Anfíbia. Você pode respirar debaixo d’água e possui uma cauda que fornece deslocamento de natação 12m. Quando fora d’água, sua cauda desaparece e dá lugar a pernas (deslocamento 9m). Se permanecer mais de um dia sem contato com água, você não recupera PM com descanso até voltar para a água (ou, pelo menos, tomar um bom banho!).',
  ] },
  { id: 'raca-silfide', nome: 'Sílfide', grupo: 'raca-hab', livro: 't20', pagina: 30,
    tags: 'Raça extra', deus: null, magica: false, preReq: null, custo: null, quadro: null, texto: [
    'Carisma +2, Destreza +1, Força –2.',
    'Asas de Borboleta. Seu tamanho é Minúsculo. Você pode pairar a 1,5m do chão com deslocamento 9m. Isso permite que você ignore terreno difícil e o torna imune a dano por queda (a menos que esteja inconsciente). Você pode gastar 1 PM por rodada para voar com deslocamento de 12m.',
    'Espírito da Natureza. Você é uma criatura do tipo espírito, recebe visão na penumbra e pode falar com animais livremente.',
    'Magia das Fadas. Você pode lançar duas das magias a seguir (atributo-chave Carisma): Criar Ilusão, Enfeitiçar, Luz (como uma magia arcana) e Sono. Caso aprenda novamente uma dessas magias, seu custo diminui em –1 PM. ✦',
  ] },
  { id: 'raca-suraggel', nome: 'Suraggel', grupo: 'raca-hab', livro: 't20', pagina: 30,
    tags: 'Raça extra · Aggelus/Sulfure', deus: null, magica: false, preReq: null, custo: null, quadro: null, texto: [
    'Sabedoria +2, Carisma +1 (Aggelus); Destreza +2, Inteligência +1 (Sulfure).',
    'Herança Divina. Você é uma criatura do tipo espírito e recebe visão no escuro.',
    'Luz Sagrada (Aggelus). Você recebe +2 em Diplomacia e Intuição. Além disso, pode lançar Luz (como uma magia divina; atributo-chave Carisma). Caso aprenda novamente essa magia, seu custo diminui em –1 PM. ✦',
    'Sombras Profanas (Sulfure). Você recebe +2 em Enganação e Furtividade. Além disso, pode lançar Escuridão (como uma magia divina; atributo-chave Inteligência). Caso aprenda novamente essa magia, seu custo diminui em –1 PM. ✦',
    ],
    escolhas: [
    { rotulo: 'Herança Planar (Deuses de Arton, p. 36 — substitui Luz Sagrada ou Sombras Profanas)', escolher: 1,
      nota: 'Opcional. Um suraggel pode descender de criaturas de qualquer Plano. Ao escolher uma herança planar, DESMARQUE acima a habilidade que ela substitui — Luz Sagrada (se você for aggelus) ou Sombras Profanas (se for sulfure).',
      opcoes: [
      { nome: 'Al-Gazara', texto: ['Herança de Al-Gazara. Devido à presença do puro caos primordial de Nimb em seu sangue, você recebe +1 em um atributo aleatório.'] },
      { nome: 'Arbória', texto: ['Herança de Arbória. Como parte do Grande Ciclo de Allihanna, você recebe a habilidade Forma Selvagem para uma única forma, escolhida entre Ágil, Sorrateira e Veloz. Caso adquira essa habilidade novamente, o custo dessa forma diminui em –1 PM.'] },
      { nome: 'Chacina', texto: ['Herança de Chacina. Pela ferocidade de Megalokk, você recebe a habilidade Forma Selvagem para uma única forma, escolhida entre Feroz e Resistente. Caso adquira essa habilidade novamente, o custo dessa forma diminui em –1 PM.'] },
      { nome: 'Deathok', texto: ['Herança de Deathok. A mudança constante faz parte de sua alma. Você recebe +2 em duas perícias a sua escolha. A cada manhã, você pode trocar essas perícias.'] },
      { nome: 'Drashantyr', texto: ['Herança de Drashantyr. Graças ao poder elemental dos dragões, você recebe +1 PM e redução de ácido, eletricidade, fogo, frio, luz e trevas 5.'] },
      { nome: 'Kundali', texto: ['Herança de Kundali. Pelo espírito protetor, mas também opressor, de Tauron, você recebe +2 na Defesa e em testes de manobras de combate.'] },
      { nome: 'Magika', texto: ['Herança de Magika. Você aprende e pode lançar uma magia arcana de 1º círculo a sua escolha (atributo-chave Inteligência ou Carisma, a sua escolha). Caso aprenda novamente essa magia, seu custo diminui em –1 PM.'] },
      { nome: 'Nivenciuén', texto: ['Herança de Nivenciuén. Mesmo que o Reino de Glórienn tenha sofrido um destino terrível, a antiga soberania élfica ainda permeia seu sangue. Você recebe +2 em Misticismo e uma habilidade racial dos elfos entre Graça de Glórienn e Sangue Mágico.'] },
      { nome: 'Odisseia', texto: ['Herança de Odisseia. Sua alma tocada por Valkaria está sempre preparada para problemas! Você recebe +2 em Iniciativa e Percepção, e sua capacidade de carga aumenta em 2 espaços.'] },
      { nome: 'Ordine', texto: ['Herança de Ordine. As forças da lei e ordem de Khalmyr afetam suas ações. Você recebe +2 em Intuição, em Investigação e em testes sem rolagens de dados (ao escolher 0, 10 ou 20).'] },
      { nome: 'Pelágia', texto: ['Herança de Pelágia. Mesmo nas situações mais desesperadoras, seu espírito se mantém plácido e imperturbável como o próprio Oceano. Escolha três perícias. Com elas, você pode gastar 1 PM para escolher 10 em qualquer situação, exceto testes de ataque.'] },
      { nome: 'Pyra', texto: ['Herança de Pyra. Em algum lugar dentro de você, sempre existe uma segunda chance. Quando faz um teste de resistência ou um teste de atributo para remover uma condição, você pode gastar 2 PM para rolá-lo novamente.'] },
      { nome: 'Ramknal', texto: ['Herança de Ramknal. Escolha duas perícias entre Acrobacia, Enganação, Furtividade, Jogatina e Ladinagem. Quando faz um teste da perícia escolhida, você pode gastar 2 PM para receber +5 nesse teste.'] },
      { nome: 'Serena', texto: ['Herança de Serena. Pela proteção de Marah, você recebe +2 na Defesa e em testes de resistência contra oponentes aos quais não tenha causado dano, perda de PV ou condições (exceto enfeitiçado, fascinado e pasmo) nessa cena.'] },
      { nome: 'Skerry', texto: ['Herança de Skerry. Você carrega a força de criatividade. Quando faz um teste de Ofício, pode gastar 1 PM para ser treinado na perícia em questão ou para rolar dois dados e usar o melhor resultado.'] },
      { nome: 'Solaris', texto: ['Herança de Solaris. Pelo poder de Azgher, durante o dia você recebe +1 em todos os testes de perícia. Se estiver diretamente sob a luz do sol, esse bônus aumenta para +2.'] },
      { nome: 'Sombria', texto: ['Herança de Sombria. Pelo poder de Tenebra, durante a noite você recebe +1 em todos os testes de perícia. Se estiver num local sem nenhuma iluminação artificial (como tochas ou magia), esse bônus aumenta para +2.'] },
      { nome: 'Sora', texto: ['Herança de Sora. Os honrados espíritos ancestrais de Lin-Wu abençoam sua perseverança. Você recebe +2 em Nobreza, Vontade e em testes de perícia estendidos (incluindo contra perigos complexos).'] },
      { nome: 'Terápolis', texto: ['Herança de Terápolis. Você recebe +2 em Intuição e Vontade, e pode fazer testes dessas perícias contra ilusões automaticamente, sem precisar interagir com elas.'] },
      { nome: 'Venomia', texto: ['Herança de Venomia. Ser escorregadio como Sszzaas faz parte de sua natureza, mesmo que você não goste disso. Você recebe +2 em Enganação e em testes para evitar manobras de combate e efeitos de movimento.'] },
      { nome: 'Vitalia', texto: ['Herança de Vitalia. A força da vida corre intensa em seu sangue. Você recebe +5 PV por patamar e sua recuperação de pontos de vida com descanso aumenta em uma categoria.'] },
      { nome: 'Werra', texto: ['Herança de Werra. Você possui um conhecimento intuitivo para armas. Você recebe +1 em testes de ataque com armas e proficiência com armas marciais ou com duas armas exóticas.'] },
      ] },
    ],
  },
  { id: 'raca-trog', nome: 'Trog', grupo: 'raca-hab', livro: 't20', pagina: 31,
    tags: 'Raça extra', deus: null, magica: false, preReq: null, custo: null, quadro: null, texto: [
    'Constituição +2, Força +1, Inteligência –1.',
    'Mau Cheiro. Você pode gastar uma ação padrão e 2 PM para expelir um gás fétido. Todas as criaturas (exceto trogs) em alcance curto devem passar em um teste de Fortitude contra veneno (CD Con) ou ficarão enjoadas durante 1d6 rodadas. Uma criatura que passe no teste de resistência fica imune a esta habilidade por um dia.',
    'Mordida. Você possui uma arma natural de mordida (dano 1d6, crítico x2, perfuração). Uma vez por rodada, quando usa a ação agredir para atacar com outra arma, pode gastar 1 PM para fazer um ataque corpo a corpo extra com a mordida.',
    'Reptiliano. Você é uma criatura do tipo monstro e recebe visão no escuro, +1 na Defesa e, se estiver sem armadura ou roupas pesadas, +5 em Furtividade.',
    'Sangue Frio. Você sofre 1 ponto de dano adicional por dado de dano de frio.',
  ] },

  // ── HABILIDADES DE RAÇA · Ameaças de Arton ─────────────────────────
  //  As 26 raças jogáveis do bestiário, cada uma no seu quadro
  //  "<Raça>: Habilidades de Raça". Um card por raça, com a linha de
  //  atributos, as habilidades, e — como o livro põe no quadro —
  //  Longevidade e Devotos (Devoção nos thera). Lidas do PDF em modo
  //  LEITURA (pdftotext -enc UTF-8, sem flags: o único limpo em coluna
  //  dupla dentro dos statblocks). O ✦ marca a habilidade mágica (na
  //  extração vira um " e" solto). Kallyanach, Mashin e Kobolds têm
  //  listas de "escolha 2" (os poderes com •). Páginas impressas.
  { id: 'raca-meio-orc', nome: 'Meio-Orc', grupo: 'raca-hab', livro: 'ameacas', pagina: 31,
    tags: '', deus: null, magica: false, preReq: null, custo: null, quadro: null, texto: [
    'Força +2, +1 em outro atributo (exceto Carisma).',
    'Adaptável. Você recebe +2 em Intimidação e se torna treinado em uma perícia a sua escolha.',
    'Criatura das Profundezas. Você recebe visão no escuro e +2 em testes de Percepção e Sobrevivência realizados no subterrâneo.',
    'Sangue Orc. Você recebe +1 em rolagens de dano com armas corpo a corpo e de arremesso e é considerado um orc para efeitos relacionados a raça.',
    'Longevidade. Normal.',
    'Devotos. Qualquer.',
  ] },
  { id: 'raca-orc', nome: 'Orc', grupo: 'raca-hab', livro: 'ameacas', pagina: 33,
    tags: '', deus: null, magica: false, preReq: null, custo: null, quadro: null, texto: [
    'Força +2, Constituição +1, Inteligência –1.',
    'Feroz. Você recebe +2 em rolagens de dano com armas corpo a corpo e de arremesso. Quando sofre dano de um inimigo, esse bônus se torna +4 até o fim de seu próximo turno.',
    'Habitante das Cavernas. Você recebe visão no escuro e +2 em testes de Percepção e Sobrevivência realizados no subterrâneo. Entretanto, recebe sensibilidade a luz.',
    'Vigor Brutal. Você recebe +2 em Fortitude e soma sua Força em seu total de pontos de vida.',
    'Longevidade. Normal.',
    'Devotos. Allihanna, Arsenal, Megalokk, Nimb, Tenebra.',
  ] },
  { id: 'raca-tabrachi', nome: 'Tabrachi', grupo: 'raca-hab', livro: 'ameacas', pagina: 37,
    tags: '', deus: null, magica: false, preReq: null, custo: null, quadro: null, texto: [
    'Constituição +2, Força +1, Carisma –1.',
    'Batráquio. Você recebe visão na penumbra e deslocamento de natação igual ao seu deslocamento terrestre.',
    'Linguarudo. Sua língua é uma arma natural que pode atacar inimigos a até 3m (dano 1d4, crítico x2, impacto). Ela é uma arma versátil, fornecendo +2 em testes para desarmar e derrubar. Uma vez por rodada, quando usa a ação agredir com outra arma, você pode gastar 1 PM para fazer um ataque corpo a corpo extra com a língua.',
    'Saltador. Você recebe +10 em testes de Atletismo para saltar.',
    'Longevidade. Normal.',
    'Devotos. Allihanna, Megalokk, Nimb, Sszzaas, Tenebra.',
  ] },
  { id: 'raca-ogro', nome: 'Ogro', grupo: 'raca-hab', livro: 'ameacas', pagina: 40,
    tags: '', deus: null, magica: false, preReq: null, custo: null, quadro: null, texto: [
    'Força +3, Constituição +2, Inteligência –1, Carisma –1.',
    'Quanto Maior o Tamanho… Você é um humanoide do subtipo gigante; seu tamanho é Grande e você recebe visão na penumbra.',
    '…Maior a Porrada! Quando acerta um ataque corpo a corpo, você pode gastar 1 PM para causar +1d8 pontos de dano do mesmo tipo.',
    'Camada de Ingenuidade. Você sofre –5 em Intuição e Vontade.',
    'Longevidade. Normal.',
    'Devotos. Allihanna, Arsenal, Megalokk, Tenebra.',
  ] },
  { id: 'raca-bugbear', nome: 'Bugbear', grupo: 'raca-hab', livro: 'ameacas', pagina: 79,
    tags: '', deus: null, magica: false, preReq: null, custo: null, quadro: null, texto: [
    'Força +2, Destreza +1, Carisma –1.',
    'Empunhadura Poderosa. Ao usar uma arma feita para uma categoria de tamanho maior que a sua (por exemplo, uma arma aumentada para uma criatura Pequena ou Média), a penalidade que você sofre nos testes de ataque diminui para –2. Caso receba esta habilidade novamente, a penalidade diminui para 0 e você pode também usar armas de até duas categorias de tamanho maiores que a sua com uma penalidade de –5 nos testes de ataque.',
    'Saborear Pavor. Você pode usar Força como atributo-chave de Intimidação (em vez de Carisma). Além disso, se estiver em alcance curto de outra criatura abalada ou apavorada, você recebe um bônus em testes de ataque igual à penalidade causada pela condição.',
    'Sentidos de Predador. Você recebe faro e visão no escuro.',
    'Longevidade. Normal.',
    'Devotos. Arsenal, Megalokk, Tenebra.',
  ] },
  { id: 'raca-hobgoblin', nome: 'Hobgoblin', grupo: 'raca-hab', livro: 'ameacas', pagina: 84,
    tags: '', deus: null, magica: false, preReq: null, custo: null, quadro: null, texto: [
    'Constituição +2, Destreza +1, Carisma –1.',
    'Arte da Guerra. Você é treinado em Guerra e recebe proficiência em armas marciais. Se receber essa proficiência novamente, recebe +2 em rolagens de dano com essas armas.',
    'Metalurgia Hobgoblin. Você recebe +2 em Ofício (armeiro) e, se for treinado nesta perícia, pode fabricar armas e armaduras superiores com uma melhoria. Se aprender a fabricar itens superiores desses tipos por outra habilidade, gasta apenas ¼ do preço das melhorias que aplica nesses itens (em vez de ⅓).',
    'Táticas de Guerrilha. Você recebe visão no escuro e +2 em Furtividade.',
    'Longevidade. Normal.',
    'Devotos. Arsenal, Megalokk, Tenebra.',
  ] },
  { id: 'raca-centauro', nome: 'Centauro', grupo: 'raca-hab', livro: 'ameacas', pagina: 105,
    tags: '', deus: null, magica: false, preReq: null, custo: null, quadro: null, texto: [
    'Sabedoria +2, Força +1, Inteligência –1.',
    'Avantajado. Seu tamanho é Grande e seu deslocamento é 12m.',
    'Cascos. Você possui uma arma natural de cascos (dano 1d8, crítico x2, impacto). Uma vez por rodada, quando usa a ação agredir para atacar com outra arma, pode gastar 1 PM para fazer um ataque corpo a corpo extra com os cascos.',
    'Ginete Natural. Você é considerado montado para efeito de fazer investidas e para benefícios das armas que empunha, e pode escolher o poder Carga de Cavalaria mesmo sem cumprir seus pré-requisitos. Entretanto, não pode se beneficiar de uma montaria e, se estiver carregando um cavaleiro, sofre –2 em testes (além das penalidades de sobrecarga, se houver) e é considerado em condição ruim para lançar magias.',
    'Medo de Altura. Se estiver adjacente a uma queda de 3m ou mais (como um buraco ou penhasco), você fica abalado.',
    'Longevidade. Normal.',
    'Devotos. Allihanna, Hippion, Megalokk.',
  ] },
  { id: 'raca-gnoll', nome: 'Gnoll', grupo: 'raca-hab', livro: 'ameacas', pagina: 115,
    tags: '', deus: null, magica: false, preReq: null, custo: null, quadro: null, texto: [
    'Constituição +2, Sabedoria +1, Inteligência –1.',
    'Faro. Você tem olfato apurado. Contra inimigos em alcance curto que não possa ver, você não fica desprevenido e camuflagem total lhe causa apenas 20% de chance de falha.',
    'Mordida. Você possui uma arma natural de mordida (dano 1d6, crítico x2, perfuração). Uma vez por rodada, quando usa a ação agredir para atacar com outra arma, pode gastar 1 PM para fazer um ataque corpo a corpo extra com a mordida.',
    'Oportunista. Você recebe +2 nas rolagens de dano contra criaturas que tenham sofrido dano de outras criaturas desde seu último turno.',
    'Rendição. Quando um inimigo se rende, você recebe 1d4 PM temporários cumulativos. Da mesma forma, quando é reduzido a um quarto de seus PV ou menos, seu instinto é se render. Caso continue lutando, fica alquebrado.',
    'Longevidade. Normal.',
    'Devotos. Allihanna, Hyninn, Marah, Megalokk, Nimb, Tenebra.',
  ] },
  { id: 'raca-kallyanach', nome: 'Kallyanach', grupo: 'raca-hab', livro: 'ameacas', pagina: 151,
    tags: '', deus: null, magica: false, preReq: null, custo: null, quadro: null,
    texto: [
    '+2 em um atributo a sua escolha ou +1 em dois atributos a sua escolha.',
    'Herança Dracônica. Você é uma criatura do tipo monstro e recebe redução 5 contra um tipo de dano a sua escolha entre ácido, eletricidade, fogo, frio, luz ou trevas.',
    'Longevidade. x2.',
    'Devotos. Arsenal, Kallyadranoch, Megalokk, Wynna.',
    ],
    escolhas: [
    { rotulo: 'Bênção de Kallyadranoch', escolher: 2,
      nota: 'Uma vez por patamar, você pode escolher uma bênção no lugar de um poder de classe.',
      opcoes: [
      { nome: 'Armamento Kallyanach', texto: ['Armamento Kallyanach. Você possui uma arma natural (dano 1d6, crítico x2) escolhida entre cauda (impacto), chifres (perfuração) ou mordida (perfuração). Uma vez por rodada, quando usa a ação agredir para atacar com outra arma, pode gastar 1 PM para fazer um ataque corpo a corpo extra com essa arma.'] },
      { nome: 'Asas Dracônicas', texto: ['Asas Dracônicas. Você pode gastar 1 PM por rodada para voar com deslocamento de 9m. Enquanto estiver voando desta forma, você fica vulnerável.'] },
      { nome: 'Escamas Elementais', texto: ['Escamas Elementais. Sua pele é recoberta de escamas resistentes e brilhantes, que fornecem +2 na Defesa e aumentam a RD de sua Herança Dracônica para 10.'] },
      { nome: 'Prática Arcana', texto: ['Prática Arcana. Escolha uma magia arcana de 1º círculo que cause dano do mesmo tipo de sua Herança Dracônica. Você pode lançar essa magia (atributo-chave Inteligência). Caso aprenda novamente essa magia, seu custo diminui em –1 PM. Você pode escolher esta bênção mais de uma vez para outras magias. ✦'] },
      { nome: 'Sentidos Dracônicos', texto: ['Sentidos Dracônicos. Seus sentidos são impregnados com poder dracônico. Você recebe faro e visão no escuro.'] },
      { nome: 'Sopro de Dragão', texto: ['Sopro de Dragão. Você pode gastar uma ação padrão e 1 PM para soprar um cone de 6m que causa 1d12 pontos de dano do tipo de sua Herança Dracônica (Ref CD Constituição reduz à metade). A cada quatro níveis após o 1º, você pode gastar +1 PM para aumentar o dano do sopro em +1d12.'] },
      ] },
    ] },
  { id: 'raca-kaijin', nome: 'Kaijin', grupo: 'raca-hab', livro: 'ameacas', pagina: 157,
    tags: '', deus: null, magica: false, preReq: null, custo: null, quadro: null, texto: [
    'Força +2, Constituição +1, Carisma –2.',
    'Couraça Rubra. Você recebe redução de dano 2. Sua couraça conta como um poder da Tormenta, exceto para perda de Carisma.',
    'Cria da Tormenta. Você é uma criatura do tipo monstro e recebe +5 em testes de resistência contra efeitos causados por lefeu e pela Tormenta. Além disso, efeitos da Tormenta que não afetem lefou também não afetam você.',
    'Disforme. Por sua anatomia anômala, você não pode empunhar nem vestir itens, a menos que sejam mágicos ou especialmente adaptados para você (o que demora um dia e custa 50% do preço do item, sem contar melhorias). Seus itens iniciais, e aqueles recebidos por sua origem ou habilidades, são adaptados para você. Esta habilidade conta como um poder da Tormenta, exceto para perda de Carisma.',
    'Terror Vivo. Você pode usar Força como atributo-chave de Intimidação (em vez de Carisma) e recebe um poder da Tormenta a sua escolha, que não conta para perda de Carisma.',
    'Longevidade. Normal.',
    'Devotos. Arsenal, Lin-Wu.',
  ] },
  { id: 'raca-kappa', nome: 'Kappa', grupo: 'raca-hab', livro: 'ameacas', pagina: 158,
    tags: '', deus: null, magica: false, preReq: null, custo: null, quadro: null, texto: [
    'Destreza +2, Constituição +1, Carisma –1.',
    'Alma da Água. Você é uma criatura do tipo espírito e tem deslocamento de natação igual ao seu deslocamento terrestre.',
    'Carapaça Kappa. Você não pode ser flanqueado e recebe cobertura leve se estiver submerso ou caído. Você soma sua Constituição na Defesa, limitado pelo seu nível, mas apenas se não estiver usando armaduras pesadas (se já faz isso, como pela habilidade Casca Grossa, em vez disso você recebe +2 na Defesa).',
    'Cura das Águas. Você pode lançar a magia Curar Ferimentos (atributo-chave Sabedoria). Caso aprenda novamente essa magia, seu custo diminui em –1 PM. Você não pode usar esta habilidade se a água de sua cabeça estiver derramada. ✦',
    'Tigela D’água. Sempre que falhar por 5 ou mais em um teste para evitar ser agarrado, derrubado ou empurrado, você derrama a água de sua cabeça. Você fica enjoado até encher a tigela novamente (o que exige uma fonte de água e uma ação padrão).',
    'Longevidade. x2.',
    'Devotos. Hyninn, Lena, Lin-Wu, Oceano.',
  ] },
  { id: 'raca-mashin', nome: 'Mashin', grupo: 'raca-hab', livro: 'ameacas', pagina: 160,
    tags: 'golem', deus: null, magica: false, preReq: null, custo: null, quadro: null,
    texto: [
    'Mashins são golens especiais criados com técnicas tamuranianas. Eles são um tipo de chassi para personagens golens (veja a página 134).',
    'Mashin (chassi). +1 em dois atributos a sua escolha. Você se torna treinado em duas perícias a sua escolha e pode substituir uma dessas perícias por uma maravilha mecânica. Entretanto, você é sempre Médio.',
    ],
    escolhas: [
    { rotulo: 'Maravilha Mecânica', escolher: null,
      nota: 'Se escolher uma maravilha mecânica, você recebe um dos poderes a seguir. Uma vez por patamar, você pode escolher uma maravilha mecânica no lugar de um poder de classe.',
      opcoes: [
      { nome: 'Adaptação Elemental', texto: ['Adaptação Elemental. Quando sofre dano de ácido, eletricidade, fogo, frio, luz ou trevas, você pode gastar 2 PM para receber redução 10 contra esse tipo de dano até o fim da cena.'] },
      { nome: 'Arma Acoplada', texto: ['Arma Acoplada. Você possui uma arma acoplada ao seu corpo. Ela fica recolhida em um compartimento e não pode ser desarmada, e você conta como se tivesse Saque Rápido para usá-la. Um personagem treinado em Ofício (artesão) pode substituir essa arma com uma hora de trabalho e o gasto de T$ 100.'] },
      { nome: 'Arma Elemental', texto: ['Arma Elemental. Você pode gastar uma ação de movimento e 2 PM para fazer uma arma que esteja empunhando causar +1d6 pontos de dano do tipo de sua fonte elemental até o fim da cena. Pré-requisito: Fonte de Energia (elemental).'] },
      { nome: 'Auxílio de Mira', texto: ['Auxílio de Mira. Quando faz um ataque à distância, você pode pagar 1 PM para aumentar em +2 a margem de ameaça desse ataque.'] },
      { nome: 'Caminho da Perfeição', texto: ['Caminho da Perfeição. Escolha uma de suas perícias treinadas. Você recebe +2 nessa perícia.'] },
      { nome: 'Canalizar Reparos', texto: ['Canalizar Reparos. Como uma ação completa, você pode gastar pontos de mana para recuperar pontos de vida, à taxa de 5 PV por PM.'] },
      { nome: 'Canhão Energético', texto: ['Canhão Energético. Se sua arma acoplada for uma arma de fogo, você pode gastar uma ação de movimento e 1 PM para energizá-la. Até o fim da cena, seu próximo ataque com ela causa +1 dado de dano do mesmo tipo. Múltiplos usos deste poder são cumulativos (limitado por sua Constituição). Pré-requisito: Arma Acoplada.'] },
      { nome: 'Dínamo de Mana', texto: ['Dínamo de Mana. Escolha uma de suas habilidades com um custo em PM. Você pode gastar uma ação de movimento para canalizar seu mana. Quando faz isso, até o fim do seu turno, o custo do próximo uso da habilidade escolhida é reduzido em –1 PM. Um personagem treinado em Ofício (artesão) pode substituir essa habilidade com uma hora de trabalho e o gasto de T$ 100.'] },
      { nome: 'Pernas Aprimoradas', texto: ['Pernas Aprimoradas. Você pode gastar 2 PM para receber +6m em seu deslocamento e +5 em Atletismo até o fim da cena.'] },
      { nome: 'Reservatório Alquímico', texto: ['Reservatório Alquímico. Você possui um reservatório em seu corpo que pode armazenar até duas doses de preparados alquímicos. Uma vez por rodada, você pode usar um desses preparados ou pode consumi-lo para sua fonte de energia. Carregar seu reservatório exige uma ação completa e o gasto dos itens com os quais você quiser carregá-lo. Pré-requisito: Fonte de Energia (alquímica).'] },
      ] },
    ] },
  { id: 'raca-nezumi', nome: 'Nezumi', grupo: 'raca-hab', livro: 'ameacas', pagina: 162,
    tags: '', deus: null, magica: false, preReq: null, custo: null, quadro: null, texto: [
    'Constituição +2, Destreza +1, Inteligência –1.',
    'Empunhadura Poderosa. Ao usar uma arma feita para uma categoria de tamanho maior que a sua (por exemplo, uma arma aumentada para uma criatura Pequena ou Média), a penalidade que você sofre nos testes de ataque diminui para –2. Caso receba esta habilidade novamente, a penalidade diminui para 0.',
    'Pequeno, Mas Não Metade. Seu tamanho é Pequeno, mas seu deslocamento se mantém 9m e você recebe resistência a medo +5 contra criaturas maiores que você e +2 em Intimidação.',
    'Roedor. Você possui uma arma natural de mordida (dano 1d6, crítico x2, corte). Uma vez por rodada, quando usa a ação agredir para atacar com outra arma, pode gastar 1 PM para fazer um ataque corpo a corpo extra com a mordida. Além disso, quando faz um acerto crítico com sua mordida, você deixa a armadura da vítima avariada ou, se ela estiver sem armadura, aumenta em +1 o multiplicador desse crítico.',
    'Sentidos Murídeos. Você recebe faro e visão na penumbra.',
    'Longevidade. Normal.',
    'Devotos. Arsenal, Megalokk, Tenebra.',
  ] },
  { id: 'raca-tengu', nome: 'Tengu', grupo: 'raca-hab', livro: 'ameacas', pagina: 164,
    tags: '', deus: null, magica: false, preReq: null, custo: null, quadro: null, texto: [
    'Destreza +2, Inteligência +1.',
    'Asas Desorientadoras. Quando estão livres, suas asas podem ser usadas para distrair seus oponentes. Se não estiver usando-as para voar, você recebe os benefícios de Finta Aprimorada. Se tiver esse poder, em vez disso o bônus em Enganação para fintar aumenta para +5.',
    'Caminhante do Céu. Você pode pairar a 1,5m do chão com deslocamento 9m. Isso permite que você ignore terreno difícil e o torna imune a dano por queda (a menos que esteja inconsciente). Você pode gastar 1 PM por rodada para voar com deslocamento de 12m. Você precisa de espaço para abrir suas asas; quando paira ou voa, ocupa o espaço de uma criatura de uma categoria de tamanho maior que a sua.',
    'Espírito Corvino. Você é uma criatura do tipo espírito e recebe visão no escuro e +2 em Percepção.',
    'Longevidade. Normal.',
    'Devotos. Arsenal, Khalmyr, Lin-Wu, Tanna-Toh, Valkaria, Wynna.',
  ] },
  { id: 'raca-minauro', nome: 'Minauro', grupo: 'raca-hab', livro: 'ameacas', pagina: 175,
    tags: '', deus: null, magica: false, preReq: null, custo: null, quadro: null, texto: [
    'Força +1, +1 em dois atributos.',
    'Faro. Você tem olfato apurado. Contra inimigos em alcance curto que não possa ver, você não fica desprevenido e camuflagem total lhe causa apenas 20% de chance de falha.',
    'Mente Aberta. Você recebe +2 em Diplomacia e Investigação.',
    'Plurivalente. Você recebe um poder geral a sua escolha.',
    'Longevidade. Normal.',
    'Devotos. Qualquer.',
  ] },
  { id: 'raca-kobolds', nome: 'Kobolds', grupo: 'raca-hab', livro: 'ameacas', pagina: 183,
    tags: '', deus: null, magica: false, preReq: null, custo: null, quadro: null, texto: [
    'Destreza +2, Força –1.',
    'Ajuntamento Escamoso. Embora sejam um grupo de kobolds, para todos os efeitos vocês são uma única criatura Média com dois braços. Entretanto, contam como Pequenos para efeitos dos espaços por onde podem passar e, quando fazem um teste de resistência contra um efeito que afeta apenas uma criatura e não causa dano, rolam dois dados e usam o melhor resultado. Por fim, têm vulnerabilidade a dano de área.',
    'Praga Monstruosa. Vocês são criaturas do tipo monstro e recebem visão no escuro e +2 em Sobrevivência.',
    'Sensibilidade a Luz. Quando expostos à luz do sol ou similar, vocês ficam ofuscados.',
    'Longevidade. Normal.',
    'Devotos. Kallyadranoch, Khalmyr, Lena, Megalokk, Tenebra.',
    ],
    escolhas: [
    { rotulo: 'Talentos do Bando', escolher: 2,
      nota: 'Uma vez por patamar, vocês podem escolher outro desses poderes no lugar de um poder de classe.',
      opcoes: [
      { nome: 'Amontoados', texto: ['Amontoados. Vocês são considerados uma criatura Grande para efeitos de espaço ocupado e modificadores de manobras de combate. Além disso, podem se organizar em qualquer forma equivalente a quatro cubos de 1,5m, desde cada um tenha pelo menos um lado adjacente a outro. Efeitos que aumentem seu tamanho se acumulam com este poder, e permitem que vocês se organizem em mais cubos (9 cubos de 1,5m para Enorme e 9 cubos de 3m para Colossal). Vocês podem mudar de configuração sempre que fizerem uma ação de movimento para se deslocar.'] },
      { nome: 'Armadilha Terrível', texto: ['Armadilha Terrível. Escolham uma magia de 1º círculo que tenha como alvo uma criatura ou que tenha um efeito em área e que cause dano ou um efeito negativo (como uma condição ou penalidade). Vocês possuem uma armadilha portátil que contém essa magia. Sua armadilha usa as mesmas regras de engenhocas (veja Tormenta20, p. 70), mas é acionada com Sobrevivência e tem Sabedoria como atributo-chave. Vocês podem escolher esta habilidade mais de uma vez para magias diferentes.'] },
      { nome: 'Diferentão', texto: ['Diferentão. Escolham um poder de outra classe cujos requisitos vocês cumpram (como um poder de bardo da lista de Poderes de Bardo). Vocês recebem o poder escolhido; para efeitos de nível na classe desse poder, considere seu nível de personagem −4.'] },
      { nome: 'Ex-Familiar', texto: ['Ex-Familiar. Vocês recebem +2 PM e os benefícios de um tipo de familiar, escolhidos entre os familiares básicos de arcanista (veja Tormenta20, p. 38). Se não tiverem um atributo-chave para conjuração, para efeitos desta habilidade vocês usam Carisma.'] },
      { nome: 'O Ousado', texto: ['O Ousado. Uma vez por cena, vocês podem gastar 1 PM e uma ação de movimento para que um membro do bando se afaste e aja sozinho. Ele age a partir da sua próxima rodada, tem deslocamento 9m e pode gastar uma ação padrão para causar 2d4 pontos de dano de corte em uma criatura adjacente (a cada patamar além de iniciante, cada dado desse dano aumenta em um passo). Ele é Pequeno, tem as mesmas características do restante do bando, 1 PV, e retorna ao bando quando “morto” ou ao fim da cena. Usos criativos para o ousado ficam a critério do mestre.'] },
      { nome: 'Os do Fundo', texto: ['Os do Fundo. Vocês conseguem formar o equivalente a um terceiro braço, que pode empunhar um objeto (mas não concede ações extras). Se usarem-no para empunhar uma arma leve, uma vez por rodada, quando usam a ação agredir para atacar com outra arma, podem gastar 1 PM para fazer um ataque corpo a corpo extra com essa arma. Pré-requisito: Organizadinhos.'] },
      { nome: 'Organizadinhos', texto: ['Organizadinhos. Vocês podem usar Destreza para estabelecer seu limite de carga (em vez de Força) e podem se beneficiar de um item vestido adicional.'] },
      { nome: 'Pestes Oportunistas', texto: ['Pestes Oportunistas. Uma vez por rodada, quando causam dano em uma criatura que já sofreu dano nessa rodada, vocês causam +1d6 pontos de dano do mesmo tipo. A cada patamar além de iniciante, esse dano extra aumenta em um passo.'] },
      { nome: 'Somos Explosivos', texto: ['Somos Explosivos. Vocês podem gastar uma ação completa, 1 PM e uma quantidade de PV (limitado pelo seu nível) para arremessar um kobold explosivo em um ponto em alcance curto. Criaturas a até 3m desse ponto sofrem 1d6 pontos de dano de impacto por PV gasto (Ref CD Des reduz à metade). Sempre que rolar o valor máximo em um dos dados de dano, o dano aumenta em +1d6.'] },
      { nome: 'Tática de Enxame', texto: ['Tática de Enxame. Vocês podem gastar 2 PM para assumir uma forma de enxame com duração sustentada. Nessa forma, vocês podem ocupar o espaço de criaturas inimigas, tornam-se imunes a manobras de combate e sofrem apenas metade do dano de armas. Entretanto, não podem fazer nenhuma ação que exija coordenação e concentração (como usar a perícia Furtividade ou lançar magias). Criaturas dentro do espaço que vocês ocupam são consideradas em condição ruim para lançar magias. Pré-requisito: Amontoados.'] },
      ] },
    ] },
  { id: 'raca-harpia', nome: 'Harpia', grupo: 'raca-hab', livro: 'ameacas', pagina: 201,
    tags: '', deus: null, magica: false, preReq: null, custo: null, quadro: null, texto: [
    'Destreza +2, Carisma +1, Inteligência –1.',
    'Asas de Abutre. Você possui asas no lugar dos braços e das mãos. Você pode pairar a 1,5m do chão com deslocamento 12m. Isso permite que você ignore terreno difícil e o torna imune a dano por queda (a menos que esteja inconsciente). Se não estiver usando armadura pesada, você pode gastar 1 PM por rodada para voar com deslocamento de 12m.',
    'Cria de Masmorra. Você é uma criatura do tipo monstro e recebe visão no escuro e +2 em Intimidação e Sobrevivência.',
    'Grito Aterrorizante. Você pode gastar uma ação padrão e 1 PM para emitir um grito estridente. Criaturas em alcance curto ficam abaladas (Von CD Car evita).',
    'Pés Rapinantes. Seus pés podem ser usados como mãos ou como duas armas naturais de garras (dano 1d6 cada, crítico x2, corte). Uma vez por rodada, quando usa a ação agredir para atacar com uma arma, você pode gastar 1 PM para fazer um ataque corpo a corpo extra com uma das garras, desde que ela esteja livre e não tenha sido usada para atacar neste turno. Como alternativa, se tiver habilidades que exijam uma arma secundária (como Estilo de Duas Armas), você pode usá-las com suas garras.',
    'Longevidade. Normal.',
    'Devotos. Hyninn, Megalokk, Tenebra.',
  ] },
  { id: 'raca-ceratops', nome: 'Ceratops', grupo: 'raca-hab', livro: 'ameacas', pagina: 265,
    tags: 'thera', deus: null, magica: false, preReq: null, custo: null, quadro: null, texto: [
    'Constituição +2, Força +1, Destreza –1, Inteligência –1.',
    'Chifres. Você possui uma arma natural de chifres (dano 1d8, crítico x2, perfuração). Uma vez por rodada, quando usa a ação agredir para atacar com outra arma, pode gastar 1 PM para fazer um ataque corpo a corpo extra com os chifres.',
    'Papel Tribal. Você é treinado em uma perícia a sua escolha entre Cura, Intimidação, Ofício ou Sobrevivência.',
    'Paquidérmico. Seu tamanho é Grande. Você recebe +1 na Defesa e pode usar Força como atributo-chave de Intimidação (em vez de Carisma).',
    'Medo de Altura. Se estiver adjacente a uma queda de 3m ou mais (como um buraco ou penhasco), você fica abalado.',
    'Longevidade. Normal.',
    'Devoção. Allihanna, Arsenal, Azgher, Lena, Megalokk.',
  ] },
  { id: 'raca-pteros', nome: 'Pteros', grupo: 'raca-hab', livro: 'ameacas', pagina: 267,
    tags: 'thera', deus: null, magica: false, preReq: null, custo: null, quadro: null, texto: [
    'Sabedoria +2, Destreza +1, Inteligência –1.',
    'Ligação Natural. Você possui uma ligação mental com uma criatura inteligente (Int –3 ou mais). Vocês podem se comunicar mentalmente em alcance longo e sempre sabem em que direção e distância podem encontrar o outro. Você pode trocar a criatura com a qual mantém o vínculo no início de cada aventura.',
    'Mãos Rudimentares. Suas mãos não permitem que você empunhe itens, a menos que sejam mágicos ou especialmente adaptados para você (o que demora um dia e custa 50% do preço do item, sem contar melhorias). Seus itens iniciais, e aqueles recebidos por sua origem ou habilidades, são adaptados para você.',
    'Pés Rapinantes. Seus pés são duas armas naturais de garras (dano 1d6 cada, crítico x2, corte). Uma vez por rodada, quando usa a ação agredir para atacar com uma arma, você pode gastar 1 PM para fazer um ataque corpo a corpo extra com uma das garras, desde que ela esteja livre e não tenha sido usada para atacar neste turno. Como alternativa, se tiver habilidades que exijam uma arma secundária (como Estilo de Duas Armas), você pode usá-las com suas garras.',
    'Senhor dos Céus. Você pode pairar a 1,5m do chão com deslocamento 9m. Isso permite que você ignore terreno difícil e o torna imune a dano por queda (a menos que esteja inconsciente). Se não estiver usando armadura pesada, você pode gastar 1 PM por rodada para voar com deslocamento de 12m. Quando abre suas asas para pairar ou voar, você ocupa o espaço de uma criatura de uma categoria de tamanho maior que a sua.',
    'Sentidos Rapinantes. Você recebe visão na penumbra e +2 em Percepção e Sobrevivência.',
    'Longevidade. Normal.',
    'Devoção. Allihanna, Lena, Marah, Wynna.',
  ] },
  { id: 'raca-velocis', nome: 'Velocis', grupo: 'raca-hab', livro: 'ameacas', pagina: 268,
    tags: 'thera', deus: null, magica: false, preReq: null, custo: null, quadro: null, texto: [
    'Destreza +2, Sabedoria +1, Inteligência –1.',
    'Através de Espinheiros. Você recebe redução de corte e perfuração 2 e não sofre redução em seu deslocamento por terreno difícil natural.',
    'Sentidos Selvagens. Você recebe +2 em Sobrevivência, visão na penumbra e faro (contra inimigos em alcance curto que não possa ver, você não fica desprevenido e camuflagem total lhe causa apenas 20% de chance de falha).',
    'Velocista da Planície. Seu deslocamento é 12m. Você pode usar Destreza como atributo-chave de Atletismo (em vez de Força) e, quando faz testes de Atletismo para correr ou saltar, pode rolar dois dados e usar o melhor resultado.',
    'Longevidade. Normal.',
    'Devoção. Allihanna, Lena, Marah.',
  ] },
  { id: 'raca-voracis', nome: 'Voracis', grupo: 'raca-hab', livro: 'ameacas', pagina: 270,
    tags: 'thera', deus: null, magica: false, preReq: null, custo: null, quadro: null, texto: [
    'Destreza +2, Constituição +1, Inteligência –1.',
    'Garras. Suas mãos são duas armas naturais de garras (dano 1d6 cada, crítico x2, corte). Uma vez por rodada, quando usa a ação agredir para atacar com uma arma, você pode gastar 1 PM para fazer um ataque corpo a corpo extra com uma das garras, desde que ela esteja livre e não tenha sido usada para atacar neste turno. Como alternativa, se tiver habilidades que exijam uma arma secundária (como Estilo de Duas Armas), você pode usá-las com suas garras.',
    'Rainha da Selva. Você recebe deslocamento de escalada 9m, +2 em Atletismo e recupera +1 PV por nível quando descansa.',
    'Sentidos Selvagens. Você recebe +2 em Sobrevivência, visão na penumbra e faro (contra inimigos em alcance curto que não possa ver, você não fica desprevenido e camuflagem total lhe causa apenas 20% de chance de falha).',
    'Longevidade. Normal.',
    'Devoção. Allihanna, Arsenal, Megalokk.',
  ] },
  { id: 'raca-yidishan', nome: 'Yidishan', grupo: 'raca-hab', livro: 'ameacas', pagina: 300,
    tags: '', deus: null, magica: false, preReq: null, custo: null, quadro: null, texto: [
    '+1 em três atributos diferentes (exceto Carisma), Carisma –2.',
    'Híbrido Mecânico. Você é uma criatura do tipo construto. Recebe visão no escuro e imunidade a cansaço, efeitos metabólicos e veneno. Além disso, não precisa respirar, alimentar-se ou dormir, mas não se beneficia de itens da categoria alimentação e efeitos de cura mundana são reduzidos pela metade em você. Você precisa ficar inerte por 8 horas por dia para recarregar suas forças. Se fizer isso, recupera PV e PM por descanso em condições normais (yidishan não são afetados por condições boas ou ruins de descanso).',
    'Natureza Orgânica. Você se torna treinado em uma perícia (que não precisa ser da sua classe) ou recebe um poder geral a sua escolha. Como alternativa, você pode ser um yidishan de outra raça humanoide além de humano. Neste caso, você ganha uma habilidade dessa raça a sua escolha. Se a raça era de tamanho diferente de Médio, você também possui sua categoria de tamanho.',
    'Peças Metálicas. As partes mecânicas que complementam seu corpo fornecem +2 na Defesa, mas impõem uma penalidade de armadura de –2.',
    'Longevidade x5.',
    'Devotos. Arsenal, Megalokk, Nimb.',
  ] },
  { id: 'raca-moreau', nome: 'Moreau', grupo: 'raca-hab', livro: 'ameacas', pagina: 303,
    tags: '', deus: null, magica: false, preReq: null, custo: null, quadro: null,
    texto: [
    'Você é considerado também um humano para quaisquer fins.',
    'Longevidade. Normal.',
    'Devotos. Qualquer.',
    ],
    escolhas: [
    { rotulo: 'Herança', escolher: 1,
      nota: 'Escolha uma das heranças. Ela representa sua ascendência e determina suas demais habilidades de raça.',
      opcoes: [
      { nome: 'Coruja', texto: [
        'Herança da Coruja. Sabedoria +1, +1 em dois atributos.',
        'Espreitador. Você recebe visão no escuro e +2 em Percepção e Vontade.',
        'Garras. Você tem duas armas naturais de garra (dano 1d6, crítico x2, corte), uma em cada mão. Uma vez por rodada, quando usa a ação agredir para atacar com uma arma, você pode gastar 1 PM para fazer um ataque corpo a corpo extra com uma das garras, desde que ela esteja livre e não tenha sido usada para atacar neste turno. Como alternativa, se tiver habilidades que exijam uma arma secundária (como Estilo de Duas Armas), você pode usá-las com suas garras.',
        'Sapiência. Você pode lançar uma magia de 1º círculo de adivinhação a sua escolha (atributo-chave Sabedoria). Caso aprenda novamente essa magia, seu custo diminui em –1 PM. ✦'] },
      { nome: 'Hiena', texto: [
        'Herança da Hiena. Sabedoria +1, +1 em dois atributos.',
        'Destemor. Você recebe +2 em rolagens de dano e em testes de resistência contra criaturas maiores que você.',
        'Faro. Você tem olfato apurado. Contra inimigos em alcance curto que não possa ver, você não fica desprevenido e camuflagem total lhe causa apenas 20% de chance de falha.',
        'Mordida. Você possui uma arma natural de mordida (dano 1d6, crítico x2, perfuração). Uma vez por rodada, quando usa a ação agredir para atacar com outra arma, pode gastar 1 PM para fazer um ataque corpo a corpo extra com a mordida.'] },
      { nome: 'Raposa', texto: [
        'Herança da Raposa. Inteligência +1, +1 em dois atributos.',
        'Agarra-me Se Puderes. Seu deslocamento é 12m (em vez de 9m) e você tem visão na penumbra.',
        'Esperteza Vulpina. Você recebe +2 em duas perícias originalmente baseadas em Inteligência ou Carisma, a sua escolha.',
        'Faro. Você tem olfato apurado. Contra inimigos em alcance curto que não possa ver, você não fica desprevenido e camuflagem total lhe causa apenas 20% de chance de falha.'] },
      { nome: 'Serpente', texto: [
        'Herança da Serpente. Inteligência +1, +1 em dois atributos.',
        'Arborícola. Você recebe deslocamento de escalada 6m e +2 em Furtividade.',
        'Constritor. Você recebe +2 em testes para agarrar e em rolagens de dano contra criaturas que estiver agarrando.',
        'Instintos Traiçoeiros. Você recebe visão no escuro e +2 em Diplomacia e na CD de seus efeitos mentais.'] },
      { nome: 'Búfalo', texto: [
        'Herança do Búfalo. Força +1, +1 em dois atributos.',
        'Chifres. Você possui uma arma natural de chifres (dano 1d6, crítico x2, perfuração). Uma vez por rodada, quando usa a ação agredir para atacar com outra arma, pode gastar 1 PM para fazer um ataque corpo a corpo extra com os chifres.',
        'Faro. Você tem olfato apurado. Contra inimigos em alcance curto que não possa ver, você não fica desprevenido e camuflagem total lhe causa apenas 20% de chance de falha.',
        'Marrada Impressionante. Você recebe +2 em ataques em investida e em testes para empurrar, e pode usar Força como atributo-chave de Intimidação (em vez de Carisma).'] },
      { nome: 'Coelho', texto: [
        'Herança do Coelho. Destreza +1, +1 em dois atributos.',
        'Patas Ligeiras. Seu deslocamento é 12m e, quando faz uma investida ou um teste de Atletismo para correr, você não precisa percorrer uma linha reta.',
        'Pé de Coelho. Quando faz um teste de uma perícia baseada em Destreza (exceto testes de ataque), você pode gastar 1 PM para rolar dois dados e usar o melhor resultado.',
        'Senso de Preservação. Você recebe visão na penumbra e +2 em Percepção e Reflexos.'] },
      { nome: 'Crocodilo', texto: [
        'Herança do Crocodilo. Constituição +1, +1 em dois atributos.',
        'Mordida Poderosa. Você possui uma arma natural de mordida (dano 1d6, crítico x2, perfuração), com a qual recebe +2 em testes de agarrar. Uma vez por rodada, quando usa a ação agredir para atacar com outra arma, pode gastar 1 PM para fazer um ataque corpo a corpo extra com a mordida.',
        'Predador Aquático. Você tem deslocamento de natação 6m e recebe +1 na Defesa e +2 em Furtividade.',
        'Surto Reptiliano. Uma vez por cena, você pode gastar 1 PM para realizar uma ação de movimento adicional em seu turno.'] },
      { nome: 'Gato', texto: [
        'Herança do Gato. Carisma +1, +1 em dois atributos.',
        'As Muitas Vidas de um Gato. Você soma seu Carisma em testes de Constituição para estabilizar sangramento e em Acrobacia e, se estiver consciente em uma queda, reduz o dano dela em 3d6.',
        'Garras. Você tem duas armas naturais de garra (dano 1d6, crítico x2, corte), uma em cada mão. Uma vez por rodada, quando usa a ação agredir para atacar com uma arma, você pode gastar 1 PM para fazer um ataque corpo a corpo extra com uma das garras, desde que ela esteja livre e não tenha sido usada para atacar neste turno. Como alternativa, se tiver habilidades que exijam uma arma secundária (como Estilo de Duas Armas), você pode usá-las com suas garras.',
        'Sentidos Felinos. Você recebe visão na penumbra e +2 em Furtividade e Percepção.'] },
      { nome: 'Leão', texto: [
        'Herança do Leão. Força +1, +1 em dois atributos.',
        'Mordida. Você possui uma arma natural de mordida (dano 1d8, crítico x2, perfuração). Uma vez por rodada, quando usa a ação agredir para atacar com outra arma, pode gastar 1 PM para fazer um ataque corpo a corpo extra com a mordida.',
        'Rugido Imponente. Você pode gastar uma ação de movimento e 1 PM para emitir um rugido assustador. Todos os inimigos em alcance curto sofrem –2 em rolagens de dano por 1 rodada. Medo.',
        'Sentidos da Realeza. Você recebe visão na penumbra e +2 em Intimidação e Percepção.'] },
      { nome: 'Lobo', texto: [
        'Herança do Lobo. Carisma +1, +1 em dois atributos.',
        'Faro. Você tem olfato apurado. Contra inimigos em alcance curto que não possa ver, você não fica desprevenido e camuflagem total lhe causa apenas 20% de chance de falha.',
        'Mordida. Você possui uma arma natural de mordida (dano 1d6, crítico x2, perfuração). Uma vez por rodada, quando usa a ação agredir para atacar com outra arma, pode gastar 1 PM para fazer um ataque corpo a corpo extra com a mordida.',
        'Táticas de Matilha. Você recebe +2 nas rolagens de dano e na margem de ameaça em ataques contra oponentes que esteja flanqueando.'] },
      { nome: 'Morcego', texto: [
        'Herança do Morcego. Destreza +1, +1 em dois atributos.',
        'Asas. Você pode pairar a 1,5m do chão com deslocamento 9m. Isso permite que você ignore terreno difícil e o torna imune a dano por queda (a menos que esteja inconsciente). Se não estiver usando armadura pesada, você pode gastar 1 PM por rodada para voar com deslocamento de 12m. Você precisa de espaço para abrir suas asas; quando paira ou voa, ocupa o espaço de uma criatura de uma categoria de tamanho maior que a sua.',
        'Criatura da Noite. Você recebe visão no escuro e +2 em Furtividade e Percepção.',
        'Ecolocalização. Você pode gastar 1 PM para receber percepção às cegas em alcance médio por 1 rodada.'] },
      { nome: 'Urso', texto: [
        'Herança do Urso. Constituição +1, +1 em dois atributos.',
        'Abraço de Urso. Você é Grande e pode usar Constituição como atributo-chave de Intimidação (em vez de Carisma).',
        'Faro. Você tem olfato apurado. Contra inimigos em alcance curto que não possa ver, você não fica desprevenido e camuflagem total lhe causa apenas 20% de chance de falha.',
        'Mordida. Você possui uma arma natural de mordida (dano 1d8, crítico x2, perfuração). Uma vez por rodada, quando usa a ação agredir para atacar com outra arma, pode gastar 1 PM para fazer um ataque corpo a corpo extra com a mordida.'] },
      ] },
    ] },
  { id: 'raca-elfo-do-mar', nome: 'Elfo-do-Mar', grupo: 'raca-hab', livro: 'ameacas', pagina: 316,
    tags: '', deus: null, magica: false, preReq: null, custo: null, quadro: null, texto: [
    'Destreza +2, Constituição +1, Inteligência –1.',
    'Arsenal do Oceano. Você recebe proficiência em arpão, rede e tridente e +2 em testes de ataque com essas armas. Se receber proficiência em uma dessas armas novamente, pode considerá-la uma arma leve.',
    'Cria das Águas. Você possui deslocamento de natação igual a seu deslocamento em terra e visão na penumbra. Quando dentro d’água, você recebe percepção às cegas e +2 na Defesa e, em Furtividade e Sobrevivência.',
    'Dependência de Água. Se permanecer mais de um dia sem contato com água, você não recupera PM com descanso até voltar para a água (ou, pelo menos, tomar um bom banho!).',
    'Longevidade. x2.',
    'Devotos. Allihanna, Arsenal, Hyninn, Megalokk, Oceano.',
  ] },
  { id: 'raca-nagah', nome: 'Nagah', grupo: 'raca-hab', livro: 'ameacas', pagina: 333,
    tags: '', deus: null, magica: false, preReq: null, custo: null, quadro: null, texto: [
    'For +1, Des +1, Con +1 (macho); Int +1, Sab +1, Car +1 (fêmea).',
    'Cauda. Você possui uma arma natural de cauda (dano 1d6, crítico x2, impacto). Uma vez por rodada, quando usa a ação agredir para atacar com outra arma, pode gastar 1 PM para fazer um ataque corpo a corpo extra com a cauda.',
    'Inocência Dissimulada. Você recebe +2 em Enganação e pode gastar 2 PM para substituir um teste de perícia originalmente baseada em Inteligência, Sabedoria ou Carisma por Enganação.',
    'Presentes de Sszzaas. Você recebe visão na penumbra, +1 na Defesa e resistência a veneno +5.',
    'Fraquezas Ofídicas. Você sofre 1 ponto de dano adicional para cada dado de dano de frio e –5 em testes de resistência contra Músicas de bardo.',
    'Longevidade. Normal.',
    'Devotos. Allihanna, Hyninn, Kally, Megalokk, Sszzaas, Tenebra, Wynna.',
  ] },
  { id: 'raca-finntroll', nome: 'Finntroll', grupo: 'raca-hab', livro: 'ameacas', pagina: 339,
    tags: '', deus: null, magica: false, preReq: null, custo: null, quadro: null, texto: [
    'Inteligência +2, Constituição +1, Força –1.',
    'Corpo Vegetal. Você é uma criatura do tipo monstro e recebe natureza vegetal e visão no escuro.',
    'Presença Arcana. Você recebe +2 em Misticismo e resistência a magia +2.',
    'Regeneração Vegetal. Uma vez por rodada, você pode gastar 1 PM para recuperar 5 PV. Esta habilidade não cura dano de ácido ou fogo.',
    'Intolerância a Luz. Você recebe sensibilidade a luz e, quando exposto à luz do sol ou similar, não consegue ativar sua Regeneração Vegetal.',
    'Longevidade. Normal.',
    'Devotos. Kallyanadroch, Megalokk, Sszzaas, Tenebra.',
    'Finntroll que rejeitam a maldade do Império Trollkyrka podem ser devotos de qualquer divindade.',
  ] },

  // ── HABILIDADES DE RAÇA · Heróis de Arton, Cap. 1 "Novas Raças" (p. 8–15) ──
  { id: 'raca-duende', nome: 'Duende', grupo: 'raca-hab', livro: 'herois', pagina: 8,
    tags: 'fada', deus: null, magica: false, preReq: null, custo: null, quadro: null,
    texto: [
    'Nenhum conjunto pré-determinado de habilidades representa os diferentes membros desta raça; para criar um duende, você faz as escolhas abaixo.',
    'Dons (Passo 3). Escolha dois atributos diferentes: você recebe +1 em cada. Não pode ser +2 num único atributo. (Se for da natureza Animal, um desses +1 pode ir no mesmo atributo que a natureza aumentou.)',
    'Aversão a Ferro. Você sofre 1 ponto de dano adicional por dado de dano de ataques com armas de ferro e sofre 1d6 pontos de dano por rodada se estiver empunhando ou vestindo um item de ferro (o mesmo vale para aço). Na prática, duendes usam apenas armas de madeira ou de materiais especiais, como mitral.',
    'Aversão a Sinos. Se você escutar o badalar de um sino, fica alquebrado e esmorecido até o fim da cena. No início de qualquer cena em ambiente urbano com igrejas ou templos, role 1d6: em um resultado 1, você escuta um sino badalando.',
    'Tabu. Você possui um tabu — algo que nunca pode fazer (ou deixar de fazer); crie-o com o mestre. A esquisitice do tabu impõe –5 em Diplomacia, Iniciativa, Luta ou Percepção, a sua escolha. Se desrespeitá-lo, fica fatigado por um dia (incurável); no segundo dia, exausto; no terceiro, morre.',
    'Longevidade. Duendes não seguem o ciclo natural; sua longevidade varia de duende para duende.',
    'Devoção. Allihanna, Hyninn, Nimb, Wynna.',
    ],
    escolhas: [
    { rotulo: 'Passo 1: Natureza', escolher: 1,
      opcoes: [
      { nome: 'Animal', texto: ['Animal. Você é feito de carne e osso; seu corpo é humanoide, mas a aparência varia (pode lembrar um elfo, uma sílfide, um animal bípede ou uma mistura). Você recebe +1 em um atributo a sua escolha.'] },
      { nome: 'Vegetal', texto: ['Vegetal. Você é feito de folhas, vinhas, cortiça ou madeira. Você recebe Natureza Vegetal (imune a atordoamento e metamorfose, mas afetado por efeitos que afetam plantas monstruosas — se o efeito não tiver teste de resistência, você tem direito a um teste de Fortitude) e Florescer Feérico (uma vez por rodada, pode gastar PM limitado pela Constituição para curar 2d8 PV por PM gasto no início do seu próximo turno).'] },
      { nome: 'Mineral', texto: ['Mineral. Você é feito de material inorgânico, como argila, rocha, cristal ou vidro. Você recebe imunidade a efeitos de metabolismo e redução de corte, fogo e perfuração 5, mas não se beneficia de itens da categoria alimentação.'] },
      ] },
    { rotulo: 'Passo 2: Tamanho', escolher: 1,
      opcoes: [
      { nome: 'Minúsculo', texto: ['Minúsculo. Você é Minúsculo (+5 em Furtividade, –5 em manobras de combate, usa armas reduzidas), tem deslocamento base 6m e sofre –1 em Força.'] },
      { nome: 'Pequeno', texto: ['Pequeno. Você é Pequeno (+2 em Furtividade, –2 em manobras) e tem deslocamento base 6m.'] },
      { nome: 'Médio', texto: ['Médio. Você é Médio (sem modificadores por tamanho) e tem deslocamento base 9m.'] },
      { nome: 'Grande', texto: ['Grande. Você é Grande (–2 em Furtividade, +2 em manobras, usa armas aumentadas), tem deslocamento base 9m e sofre –1 em Destreza.'] },
      ] },
    { rotulo: 'Passo 4: Presentes de Magia e de Caos', escolher: 3,
      nota: 'Todos os presentes são mágicos. Nas habilidades com teste de resistência, a CD é Carisma, salvo indicação. Uma vez por patamar, você pode escolher um presente no lugar de um poder de classe. ✦',
      opcoes: [
      { nome: 'Afinidade Elemental', texto: ['Afinidade Elemental. Você tem ligação com um elemento, entre água, fogo ou vegetação (escolha ao adquirir). Atributo-chave Carisma; ao aprender novamente as magias, o custo diminui em –1 PM. Água: deslocamento de natação igual ao base e pode lançar Criar Elementos (apenas água) e Névoa. Fogo: redução de fogo 5 e pode lançar Criar Elementos (apenas fogo) e Explosão de Chamas. Vegetação: atravessa terreno difícil natural sem redução e pode lançar Armamento da Natureza e Controlar Plantas.'] },
      { nome: 'Encantar Objetos', texto: ['Encantar Objetos. Você pode gastar uma ação de movimento e 3 PM para tocar um item e colocar nele um encanto pertinente a sua escolha (sem pré-requisitos), que dura até o fim da cena ou até você usar este poder novamente.'] },
      { nome: 'Enfeitiçar', texto: ['Enfeitiçar. Você pode lançar Enfeitiçar e usar seus aprimoramentos como se tivesse acesso aos mesmos círculos de magia que um arcanista de seu nível.'] },
      { nome: 'Invisibilidade', texto: ['Invisibilidade. Você pode lançar Invisibilidade e usar seus aprimoramentos como se tivesse acesso aos mesmos círculos de magia que um arcanista de seu nível.'] },
      { nome: 'Língua da Natureza', texto: ['Língua da Natureza. Você recebe +2 em Adestramento e Sobrevivência, e pode falar com animais e plantas (como o efeito da magia Voz Divina).'] },
      { nome: 'Maldição', texto: ['Maldição. Você pode gastar uma ação padrão e 3 PM para amaldiçoar uma criatura em alcance curto (resistência a sua escolha entre Fortitude ou Vontade; se passar, fica imune por um dia). Escolha o efeito ao adquirir: Apatia Profunda (alquebrada e frustrada); Coração de Geleia (abalada e repete o teste ao agir hostilmente, perdendo a ação se falhar); Envelhecimento Súbito (fraca e lenta); Loucura do Verão (repete o teste no início de cada cena, ficando confusa se falhar); Mil Verrugas (–2 Carisma e piora atitudes por perto); Ruína do Corpo (fatigada e vulnerável). A maldição é permanente (você pode cancelá-la como ação livre; só mantém uma por vez).'] },
      { nome: 'Mais Lá do que Aqui', texto: ['Mais Lá do que Aqui. Você pode gastar uma ação padrão e 2 PM para fazer seu corpo, exceto por uma parte, desaparecer pela cena. Nesse estado, recebe camuflagem leve e +5 em Furtividade.'] },
      { nome: 'Metamorfose Animal', texto: ['Metamorfose Animal. Você pode se transformar em um tipo de animal: escolha uma forma selvagem do druida (como ágil ou veloz). Pode gastar uma ação completa e 3 PM para assumir essa forma, recebendo seus modificadores; ao contrário de um druida, pode falar e lançar magias na forma, mas só assume a forma escolhida e apenas em sua versão básica.'] },
      { nome: 'Sonhos Proféticos', texto: ['Sonhos Proféticos. Uma vez por cena, você pode gastar 3 PM para ter uma visão: role 1d20. Até o fim da cena, você pode substituir o resultado do d20 de um teste de uma criatura em alcance curto pelo dado que rolou.'] },
      { nome: 'Velocidade do Pensamento', texto: ['Velocidade do Pensamento. Em seu primeiro turno em cada cena, você pode gastar 2 PM para realizar uma ação padrão adicional. Se fizer isso, pula seu turno na segunda rodada.'] },
      { nome: 'Visão Feérica', texto: ['Visão Feérica. Você recebe visão na penumbra e está permanentemente sob efeito da magia Visão Mística com o aprimoramento de enxergar criaturas e objetos invisíveis.'] },
      { nome: 'Voo', texto: ['Voo. Você flutua 1,5m acima do chão com deslocamento igual ao base +3m (ignora terreno difícil, imune a dano por queda a menos que inconsciente). Também pode voar, mas isso é cansativo: gasta 1 PM por rodada para voar com deslocamento igual ao base +6m.'] },
      ] },
    ] },
  { id: 'raca-eiradaan', nome: 'Eiradaan', grupo: 'raca-hab', livro: 'herois', pagina: 12,
    tags: 'fada', deus: null, magica: false, preReq: null, custo: null, quadro: null, texto: [
    'Sabedoria +2, Carisma +1, Força –1.',
    'Essência Feérica. Você é uma criatura do tipo espírito, recebe visão na penumbra e pode falar com animais livremente.',
    'Magia Instintiva. Você pode usar Sabedoria no lugar de seu atributo-chave de magias arcanas e Misticismo. Além disso, quando lança uma magia, você recebe +1 PM para gastar em seus aprimoramentos (não cumulativo com outros efeitos que fornecem PM para aprimoramentos, como bolsa de pó; Tormenta20, p. 159).',
    'Sentidos Místicos. Você está sempre sob o efeito básico da magia Visão Mística. ✦',
    'Canção da Melancolia. Quando faz um teste de Vontade contra efeitos mentais, você rola dois dados e usa o pior resultado.',
    'Longevidade. x5.',
    'Devoção. Allihanna, Lena, Thyatis, Wynna.',
  ] },
  { id: 'raca-galokk', nome: 'Galokk', grupo: 'raca-hab', livro: 'herois', pagina: 13,
    tags: 'gigante', deus: null, magica: false, preReq: null, custo: null, quadro: null, texto: [
    'Força +1, Constituição +1, +1 em um atributo, Carisma –1.',
    'Força dos Titãs. Quando acerta um ataque corpo a corpo ou de arremesso, você pode gastar 1 PM. Se fizer isso, sempre que rolar o resultado máximo em um dado de dano da arma, role um dado extra, até um limite de dados extras igual à sua Força.',
    'Meio-Gigante. Você é uma criatura do tipo humanoide (gigante). Seu tamanho é Grande e você pode usar Força como atributo-chave de Intimidação.',
    'Infância entre os Pequenos. Você se torna treinado em uma perícia a sua escolha.',
    'Longevidade. Normal.',
    'Devoção. Allihanna, Arsenal, Megalokk.',
  ] },
  { id: 'raca-meio-elfo', nome: 'Meio-Elfo', grupo: 'raca-hab', livro: 'herois', pagina: 14,
    tags: '', deus: null, magica: false, preReq: null, custo: null, quadro: null, texto: [
    'Inteligência +1, +1 em dois atributos, exceto Constituição.',
    'Ambição Herdada. Você recebe um poder geral ou poder único de origem (Tormenta20, p. 85) a sua escolha.',
    'Entre Dois Mundos. Você recebe +1 em perícias baseadas em Carisma.',
    'Sangue Élfico. Você recebe visão na penumbra e +1 ponto de mana a cada nível ímpar (incluindo o 1º). Além disso, é considerado um elfo para efeitos relacionados a raça.',
    'Longevidade. x2.',
    'Devoção. Qualquer.',
  ] },
  { id: 'raca-satiro', nome: 'Sátiro', grupo: 'raca-hab', livro: 'herois', pagina: 15,
    tags: 'fada', deus: null, magica: false, preReq: null, custo: null, quadro: null, texto: [
    'Carisma +2, Destreza +1, Sabedoria –1.',
    'Festeiro Feérico. Você é uma criatura do tipo espírito, recebe visão na penumbra e +2 em Atuação e Fortitude.',
    'Instrumentista Mágico. Se estiver empunhando um instrumento musical, você pode lançar as magias Amedrontar, Enfeitiçar, Hipnotismo e Sono (atributo-chave Carisma). Caso aprenda novamente uma dessas magias, seu custo diminui em –1 PM. ✦',
    'Marrada. Você possui uma arma natural de marrada (dano 1d6, crítico x2, impacto). Uma vez por rodada, quando usa a ação agredir para atacar com outra arma, pode gastar 1 PM para fazer um ataque corpo a corpo extra com a marrada.',
    'Pernas Caprinas. Seu deslocamento é 12m e você pode usar Destreza como atributo-chave de Atletismo (em vez de Força).',
    'Longevidade. Normal.',
    'Devoção. Allihanna, Hyninn, Marah, Nimb, Wynna.',
  ] },

  // ── HABILIDADES DE RAÇA · Deuses de Arton ──────────────────────────
  //  Suraggel Variantes (22 heranças planares) ficam no card do Suraggel.
  { id: 'raca-inevitavel', nome: 'Inevitável', grupo: 'raca-hab', livro: 'deuses', pagina: 277,
    tags: 'golem', deus: null, magica: false, preReq: null, custo: null, quadro: null, texto: [
    'Inevitáveis podem ser usados como um tipo de chassi para golens despertos (Ameaças de Arton, p. 134).',
    'Chassi Dourado. Carisma +2, Força +1. Você pode gastar 1 PM para marcar uma criatura em alcance curto como culpada. Até o fim da cena, ou até você usar esta habilidade em outra criatura, você sempre sabe onde a criatura culpada está e, uma vez por rodada, um de seus ataques contra essa criatura causa +1d6 pontos de dano de luz.',
  ] },

  // ── PODERES DE ORIGEM · Tormenta20 Jogo do Ano (p. 85–95) ──────────
  //  O "Poder Único" de cada origem: descrito após os benefícios dela,
  //  e só quem tem aquela origem pode escolhê-lo (p. 85). Um card por
  //  poder; a origem dona vai na etiqueta, para a busca achar por ela.
  //  São 35 origens, 35 poderes.
  { id: 'origem-membro-da-igreja', nome: 'Membro da Igreja', grupo: 'origem', livro: 't20', pagina: 85,
    tags: 'Acólito', deus: null, magica: false, preReq: null, custo: null, quadro: null, texto: [
    'Você consegue hospedagem confortável e informação em qualquer templo de sua divindade, para você e seus aliados.',
  ] },
  { id: 'origem-amigo-especial', nome: 'Amigo Especial', grupo: 'origem', livro: 't20', pagina: 85,
    tags: 'Amigo dos Animais', deus: null, magica: false, preReq: null, custo: null, quadro: null, texto: [
    'Você recebe +5 em testes de Adestramento com animais. Além disso, possui um animal de estimação que o auxilia e o acompanha em suas aventuras. Em termos de jogo, é um parceiro que fornece +2 em uma perícia a sua escolha (exceto Luta ou Pontaria e aprovada pelo mestre) e não conta em seu limite de parceiros.',
  ] },
  { id: 'origem-lembrancas-graduais', nome: 'Lembranças Graduais', grupo: 'origem', livro: 't20', pagina: 86,
    tags: 'Amnésico', deus: null, magica: false, preReq: null, custo: null, quadro: null, texto: [
    'Durante suas aventuras, em determinados momentos a critério do mestre, você pode fazer um teste de Sabedoria (CD 10) para reconhecer pessoas, criaturas ou lugares que tenha encontrado antes de perder a memória.',
  ] },
  { id: 'origem-sangue-azul', nome: 'Sangue Azul', grupo: 'origem', livro: 't20', pagina: 86,
    tags: 'Aristocrata', deus: null, magica: false, preReq: null, custo: null, quadro: null, texto: [
    'Você tem alguma influência política, suficiente para ser tratado com mais leniência pela guarda, conseguir uma audiência com o nobre local etc.',
  ] },
  { id: 'origem-frutos-do-trabalho', nome: 'Frutos do Trabalho', grupo: 'origem', livro: 't20', pagina: 86,
    tags: 'Artesão', deus: null, magica: false, preReq: null, custo: null, quadro: null, texto: [
    'No início de cada aventura, você recebe até 5 itens gerais que possa fabricar num valor total de até T$ 50. Esse valor aumenta para T$ 100 no patamar veterano, T$ 300 no heroico e T$ 500 no lenda.',
  ] },
  { id: 'origem-dom-artistico', nome: 'Dom Artístico', grupo: 'origem', livro: 't20', pagina: 87,
    tags: 'Artista', deus: null, magica: false, preReq: null, custo: null, quadro: null, texto: [
    'Você recebe +2 em testes de Atuação, e recebe o dobro de tibares em apresentações.',
  ] },
  { id: 'origem-esse-cheiro', nome: 'Esse Cheiro...', grupo: 'origem', livro: 't20', pagina: 88,
    tags: 'Assistente de Laboratório', deus: null, magica: false, preReq: null, custo: null, quadro: null, texto: [
    'Você recebe +2 em Fortitude e detecta automaticamente a presença (mas não a localização ou natureza) de itens alquímicos em alcance curto.',
  ] },
  { id: 'origem-a-prova-de-tudo', nome: 'À Prova de Tudo', grupo: 'origem', livro: 't20', pagina: 88,
    tags: 'Batedor', deus: null, magica: false, preReq: null, custo: null, quadro: null, texto: [
    'Você não sofre penalidade em deslocamento e Sobrevivência por clima ruim e por terreno difícil natural.',
  ] },
  { id: 'origem-confissao', nome: 'Confissão', grupo: 'origem', livro: 't20', pagina: 88,
    tags: 'Capanga', deus: null, magica: false, preReq: null, custo: null, quadro: null, texto: [
    'Você pode usar Intimidação para interrogar sem custo e em uma hora (veja Investigação).',
  ] },
  { id: 'origem-alpinista-social', nome: 'Alpinista Social', grupo: 'origem', livro: 't20', pagina: 89,
    tags: 'Charlatão', deus: null, magica: false, preReq: null, custo: null, quadro: null, texto: [
    'Você pode substituir testes de Diplomacia por testes de Enganação.',
  ] },
  { id: 'origem-truque-de-magica', nome: 'Truque de Mágica', grupo: 'origem', livro: 't20', pagina: 89,
    tags: 'Circense', deus: null, magica: false, preReq: null, custo: null, quadro: null, texto: [
    'Você pode lançar Explosão de Chamas, Hipnotismo e Queda Suave, mas apenas com o aprimoramento Truque. Esta não é uma habilidade mágica — os efeitos provêm de prestidigitação.',
  ] },
  { id: 'origem-punguista', nome: 'Punguista', grupo: 'origem', livro: 't20', pagina: 89,
    tags: 'Criminoso', deus: null, magica: false, preReq: null, custo: null, quadro: null, texto: [
    'Você pode fazer testes de Ladinagem para sustento (como a perícia Ofício), mas em apenas um dia. Se passar, recebe o dobro do dinheiro, mas, se falhar, pode ter problemas com a lei (a critério do mestre).',
  ] },
  { id: 'origem-medico-de-campo', nome: 'Médico de Campo', grupo: 'origem', livro: 't20', pagina: 89,
    tags: 'Curandeiro', deus: null, magica: false, preReq: null, custo: null, quadro: null, texto: [
    'Você soma sua Sabedoria aos PV restaurados por suas habilidades e itens mundanos de cura.',
  ] },
  { id: 'origem-busca-interior', nome: 'Busca Interior', grupo: 'origem', livro: 't20', pagina: 89,
    tags: 'Eremita', deus: null, magica: false, preReq: null, custo: null, quadro: null, texto: [
    'Quando você e seus companheiros estão diante de um mistério, incapazes de prosseguir, você pode gastar 1 PM para meditar sozinho durante algum tempo e receber uma dica do mestre.',
  ] },
  { id: 'origem-desejo-de-liberdade', nome: 'Desejo de Liberdade', grupo: 'origem', livro: 't20', pagina: 90,
    tags: 'Escravo', deus: null, magica: false, preReq: null, custo: null, quadro: null, texto: [
    'Ninguém voltará a torná-lo um escravo! Você recebe +5 em testes contra a manobra agarrar e efeitos de movimento.',
  ] },
  { id: 'origem-palpite-fundamentado', nome: 'Palpite Fundamentado', grupo: 'origem', livro: 't20', pagina: 90,
    tags: 'Estudioso', deus: null, magica: false, preReq: null, custo: null, quadro: null, texto: [
    'Você pode gastar 2 PM para substituir um teste de qualquer perícia originalmente baseada em Inteligência ou Sabedoria por um teste de Conhecimento.',
  ] },
  { id: 'origem-agua-no-feijao', nome: 'Água no Feijão', grupo: 'origem', livro: 't20', pagina: 90,
    tags: 'Fazendeiro', deus: null, magica: false, preReq: null, custo: null, quadro: null, texto: [
    'Você não sofre a penalidade de –5 e não gasta matéria prima adicional para fabricar pratos para cinco pessoas.',
  ] },
  { id: 'origem-cultura-exotica', nome: 'Cultura Exótica', grupo: 'origem', livro: 't20', pagina: 90,
    tags: 'Forasteiro', deus: null, magica: false, preReq: null, custo: null, quadro: null, texto: [
    'Por sua diferente visão de mundo, você encontra soluções inesperadas. Você pode gastar 1 PM para fazer um teste de perícia somente treinada, mesmo sem ser treinado na perícia.',
  ] },
  { id: 'origem-pao-e-circo', nome: 'Pão e Circo', grupo: 'origem', livro: 't20', pagina: 91,
    tags: 'Gladiador', deus: null, magica: false, preReq: null, custo: null, quadro: null, texto: [
    'Por seu treino em combates de exibição, você sabe “bater sem machucar”. Pode escolher causar dano não letal sem sofrer a penalidade de –5.',
  ] },
  { id: 'origem-detetive', nome: 'Detetive', grupo: 'origem', livro: 't20', pagina: 91,
    tags: 'Guarda', deus: null, magica: false, preReq: null, custo: null, quadro: null, texto: [
    'Você pode gastar 1 PM para substituir testes de Percepção e Intuição por testes de Investigação até o fim da cena.',
  ] },
  { id: 'origem-heranca', nome: 'Herança', grupo: 'origem', livro: 't20', pagina: 91,
    tags: 'Herdeiro', deus: null, magica: false, preReq: null, custo: null, quadro: null, texto: [
    'Você herdou um item de preço de até T$ 1.000. Você pode escolher este poder duas vezes, para um item de até T$ 2.000.',
  ] },
  { id: 'origem-coracao-heroico', nome: 'Coração Heroico', grupo: 'origem', livro: 't20', pagina: 92,
    tags: 'Herói Camponês', deus: null, magica: false, preReq: null, custo: null, quadro: null, texto: [
    'Você recebe +3 pontos de mana. Quando atinge um novo patamar (no 5º, 11º e 17º níveis), recebe +3 PM.',
  ] },
  { id: 'origem-passagem-de-navio', nome: 'Passagem de Navio', grupo: 'origem', livro: 't20', pagina: 92,
    tags: 'Marujo', deus: null, magica: false, preReq: null, custo: null, quadro: null, texto: [
    'Você consegue transporte marítimo para você e seus aliados, sem custos, desde que todos paguem com trabalho (passar em pelo menos um teste de perícia adequado durante a viagem).',
  ] },
  { id: 'origem-vendedor-de-carcacas', nome: 'Vendedor de Carcaças', grupo: 'origem', livro: 't20', pagina: 92,
    tags: 'Mateiro', deus: null, magica: false, preReq: null, custo: null, quadro: null, texto: [
    'Você pode extrair recursos de criaturas em um minuto, em vez de uma hora, e recebe +5 no teste.',
  ] },
  { id: 'origem-rede-de-contatos', nome: 'Rede de Contatos', grupo: 'origem', livro: 't20', pagina: 92,
    tags: 'Membro de Guilda', deus: null, magica: false, preReq: null, custo: null, quadro: null, texto: [
    'Graças à influência de sua guilda, você pode usar Diplomacia para interrogar sem custo e em uma hora (veja Investigação).',
  ] },
  { id: 'origem-negociacao', nome: 'Negociação', grupo: 'origem', livro: 't20', pagina: 93,
    tags: 'Mercador', deus: null, magica: false, preReq: null, custo: null, quadro: null, texto: [
    'Você pode vender itens 10% mais caro (não cumulativo com barganha).',
  ] },
  { id: 'origem-escavador', nome: 'Escavador', grupo: 'origem', livro: 't20', pagina: 93,
    tags: 'Minerador', deus: null, magica: false, preReq: null, custo: null, quadro: null, texto: [
    'Você se torna proficiente em picaretas, causa +1 de dano com elas e não é afetado por terreno difícil em masmorras e subterrâneos.',
  ] },
  { id: 'origem-mochileiro', nome: 'Mochileiro', grupo: 'origem', livro: 't20', pagina: 93,
    tags: 'Nômade', deus: null, magica: false, preReq: null, custo: null, quadro: null, texto: [
    'Seu limite de carga aumenta em 5 espaços.',
  ] },
  { id: 'origem-quebra-galho', nome: 'Quebra-Galho', grupo: 'origem', livro: 't20', pagina: 93,
    tags: 'Pivete', deus: null, magica: false, preReq: null, custo: null, quadro: null, texto: [
    'Em cidades ou metrópoles, você pode comprar qualquer item mundano não superior por metade do preço normal. Esses itens não podem ser matérias-primas e não podem ser revendidos (são velhos, sujos, furtados...).',
  ] },
  { id: 'origem-estoico', nome: 'Estoico', grupo: 'origem', livro: 't20', pagina: 93,
    tags: 'Refugiado', deus: null, magica: false, preReq: null, custo: null, quadro: null, texto: [
    'Sua condição de descanso é uma categoria acima do padrão pela situação (normal em condições ruins, confortável em condições normais e luxuosa em condições confortáveis ou melhores). Veja as regras de recuperação na página 106.',
  ] },
  { id: 'origem-antigo-mestre', nome: 'Antigo Mestre', grupo: 'origem', livro: 't20', pagina: 94,
    tags: 'Seguidor', deus: null, magica: false, preReq: null, custo: null, quadro: null, texto: [
    'Você ainda mantém contato com o herói que costumava servir. Uma vez por aventura, ele surge para ajudá-lo por uma cena. Ele é um parceiro mestre de um tipo a sua escolha (definido ao obter este poder) que não conta em seu limite de aliados.',
  ] },
  { id: 'origem-vida-rustica', nome: 'Vida Rústica', grupo: 'origem', livro: 't20', pagina: 94,
    tags: 'Selvagem', deus: null, magica: false, preReq: null, custo: null, quadro: null, texto: [
    'Você come coisas que fariam um avestruz vomitar (sendo imune a efeitos prejudiciais de itens ingeríveis) e também consegue descansar nos lugares mais desconfortáveis (mesmo dormindo ao relento, sua recuperação de PV e PM nunca é inferior a seu próprio nível).',
  ] },
  { id: 'origem-influencia-militar', nome: 'Influência Militar', grupo: 'origem', livro: 't20', pagina: 94,
    tags: 'Soldado', deus: null, magica: false, preReq: null, custo: null, quadro: null, texto: [
    'Você fez amigos nas forças armadas. Onde houver acampamentos ou bases militares, você pode conseguir hospedagem e informações para você e seus aliados.',
  ] },
  { id: 'origem-gororoba', nome: 'Gororoba', grupo: 'origem', livro: 't20', pagina: 95,
    tags: 'Taverneiro', deus: null, magica: false, preReq: null, custo: null, quadro: null, texto: [
    'Você não sofre a penalidade de –5 para fabricar um prato especial adicional.',
  ] },
  { id: 'origem-esforcado', nome: 'Esforçado', grupo: 'origem', livro: 't20', pagina: 95,
    tags: 'Trabalhador', deus: null, magica: false, preReq: null, custo: null, quadro: null, texto: [
    'Você não teme trabalho duro, nem prazos apertados. Você recebe um bônus de +2 em todos os testes de perícias estendidos (incluindo perigos complexos).',
  ] },

  // ── DISTINÇÕES · Heróis de Arton, cap. 2 (p. 102–155) ─────────────
  //  Um card por poder. Cada distinção tem uma MARCA (automática, com
  //  `marca: true` — não conta no escalonamento) e vários poderes
  //  (escolhidos um a um, como poder geral). O `distincao` é o slug que
  //  liga o poder à sua distinção; a conta que faz os poderes que escalam
  //  crescer mora em js/ficha-distincoes.js. Os poderes que escalam trazem
  //  o texto do livro (o "Agora:" na ficha faz a conta sozinho).
  //
  //  Aeronauta Goblin (p. 105–108) — 1 marca + 5 poderes.
  { id: 'dist-aeronauta-cabeca-nas-nuvens', nome: 'Cabeça nas Nuvens', grupo: 'distincao', livro: 'herois', pagina: 106,
    tags: 'Aeronauta Goblin', distincao: 'aeronauta-goblin', marca: false, deus: null, magica: false,
    preReq: 'Int 2, treinado em Ofício (artesão) e Pilotagem', custo: null, quadro: null, texto: [
    'O aeronauta goblin se sente em casa nos céus, sua mente inspirada pela liberdade de voar.',
    'Quando está pilotando uma aeronave, você recebe +1 em testes de perícia, rolagens de dano e na CD das suas habilidades e itens. Esse bônus aumenta em +1 para cada dois outros poderes da distinção que você possui.',
  ] },
  { id: 'dist-aeronauta-engenharia-aeronautica', nome: 'Engenharia Aeronáutica', grupo: 'distincao', livro: 'herois', pagina: 106,
    tags: 'Aeronauta Goblin', distincao: 'aeronauta-goblin', marca: false, deus: null, magica: false,
    preReq: 'Cabeça nas Nuvens, Engenhoqueiro', custo: null,
    quadro: { titulo: 'Ornitópteros goblins', texto: [
      'Todo ornitóptero é um veículo Grande capaz de transportar uma criatura Pequena e 10 espaços. Tem deslocamento de voo 15m, Defesa 15 (+ Des do piloto), RD 5 e PV iguais à metade dos pontos de vida de seu criador. Dentro dele, o piloto recebe cobertura leve e pode executar investidas montadas como se estivesse sobre uma montaria. É fabricado com Ofício (artesão) com CD 20, uma semana de trabalho e custo T$ 300, e só pode ser operado por seu criador.',
      'Melhorias (ornitópteros superiores): Armado — arma de fogo acoplada, usada pelo piloto, com espaço para 20 munições. Blindado — +10 na Defesa. Bombardeiro — compartimento para quatro preparados alquímicos ou poções arremessáveis (+1 categoria de alcance e +2 na CD; recarregar é ação completa). Camuflado — +10 em Furtividade e, voando, esconde-se sem camuflagem ou cobertura. Dobrável — vira veículo Médio deslocamento 12m (sem voo), dobra/desdobra com ação completa. Durável — PV iguais aos do criador (em vez de metade). Espaçoso — mais um passageiro Pequeno ou +10 espaços. Estável — +5 em Pilotagem. Resistente — RD +5. Veloz — voo +6m. Material Especial — vários materiais e custos (Aço-rubi, Adamante, Gelo eterno, Mitral…), descritos no livro.',
    ] },
    texto: [
    'Tendo “dominado” a fabricação de aeronaves, é hora de aprimorar o ornitóptero.',
    'Você pode fabricar ornitópteros superiores (veja adiante) e acoplar até duas engenhocas neles, seguindo as regras normais de engenhocas. Elas não contam em seu limite de engenhocas e não precisam ser empunhadas ou vestidas, mas só podem ser ativadas se você estiver pilotando o ornitóptero.',
  ] },
  { id: 'dist-aeronauta-estou-bem-pessoal', nome: 'Estou Bem, Pessoal!', grupo: 'distincao', livro: 'herois', pagina: 106,
    tags: 'Aeronauta Goblin', distincao: 'aeronauta-goblin', marca: false, deus: null, magica: false,
    preReq: 'Cabeça nas Nuvens', custo: null, quadro: null, texto: [
    'Mais do que aprender a pilotar, um bom aeronauta aprende a se acidentar.',
    'Você recebe redução de fogo e impacto 5 e sofre apenas metade do dano de quedas.',
  ] },
  { id: 'dist-aeronauta-manobras-defensivas', nome: 'Manobras Defensivas', grupo: 'distincao', livro: 'herois', pagina: 107,
    tags: 'Aeronauta Goblin', distincao: 'aeronauta-goblin', marca: false, deus: null, magica: false,
    preReq: 'treinado em Reflexos, Estou Bem, Pessoal!', custo: null, quadro: null, texto: [
    'Às vezes, mais importante que preservar a própria vida é proteger a aeronave!',
    'Você soma sua Inteligência na Defesa de qualquer aeronave que estiver pilotando. Além disso, quando você ou a aeronave que você está pilotando sofre dano, você pode gastar 2 PM para fazer um teste de Pilotagem e subtrair o resultado do dano sofrido.',
  ] },
  { id: 'dist-aeronauta-senhor-dos-ceus', nome: 'Senhor dos Céus', grupo: 'distincao', livro: 'herois', pagina: 107,
    tags: 'Aeronauta Goblin', distincao: 'aeronauta-goblin', marca: false, deus: null, magica: false,
    preReq: 'Manobras Defensivas, derrotar cinco aeronaves e/ou inimigos voadores enquanto pilota uma aeronave', custo: null, quadro: null, texto: [
    'Tendo derrotado inimigos suficientes, o aeronauta se tornou um verdadeiro ás.',
    'Uma vez por rodada, enquanto está pilotando uma aeronave, você pode gastar 3 PM para realizar uma ação padrão adicional.',
  ] },
  { id: 'dist-aeronauta-combate-aereo', nome: 'Combate Aéreo', grupo: 'distincao', livro: 'herois', pagina: 107,
    tags: 'Aeronauta Goblin', distincao: 'aeronauta-goblin', marca: true, deus: null, magica: false,
    preReq: null, custo: null, quadro: null, texto: [
    'Marca da distinção. O aeronauta goblin sabe se virar contra inimigos nas alturas.',
    'Você recebe uma ação de movimento extra por rodada, que só pode ser usada para pilotar sua aeronave, e não sofre penalidades para atacar à distância ou lançar magias por estar a bordo de uma aeronave.',
  ] },

  //  Algoz da Tormenta (p. 109–111) — 1 marca + 5 poderes. É uma
  //  distinção de VILÃO (o livro diz: "não, o algoz da Tormenta não é um
  //  herói"), e seus poderes têm o descritor "Tormenta" — são também
  //  poderes da Tormenta. Aqui eles moram no grupo distinção; quem quiser
  //  que contem para a escala/Carisma da Tormenta usa o 🩸 do cartão.
  { id: 'dist-algoz-servo-e-senhor', nome: 'Servo e Senhor', grupo: 'distincao', livro: 'herois', pagina: 111,
    tags: 'Algoz da Tormenta · Tormenta', distincao: 'algoz-da-tormenta', marca: true, deus: null, magica: false,
    preReq: null, custo: null, quadro: null, texto: [
    'Marca da distinção. Após ter sua existência remodelada pela Tormenta, um algoz não questiona seus senhores.',
    'Você se torna imune à Insanidade da Tormenta e a efeitos de medo e mentais, exceto aqueles causados pelo lekael a quem serve.',
  ] },
  { id: 'dist-algoz-lar-infernal', nome: 'Lar Infernal', grupo: 'distincao', livro: 'herois', pagina: 111,
    tags: 'Algoz da Tormenta · Tormenta', distincao: 'algoz-da-tormenta', marca: false, deus: null, magica: false,
    preReq: 'dois poderes da Tormenta', custo: null, quadro: null, texto: [
    'Acostumado às áreas de Tormenta, o algoz só se sente em casa nesses infernos.',
    'Você se torna imune aos efeitos de áreas de Tormenta (Tormenta20, p. 319). Além disso, nessas áreas você recebe +5 em testes de perícia e seu descanso conta como luxuoso.',
  ] },
  { id: 'dist-algoz-desprezo-profano', nome: 'Desprezo Profano', grupo: 'distincao', livro: 'herois', pagina: 111,
    tags: 'Algoz da Tormenta · Tormenta', distincao: 'algoz-da-tormenta', marca: false, deus: null, magica: false,
    preReq: 'treinado em Vontade, Ataque Corrupto, não ser devoto (exceto de Aharadak)', custo: null, quadro: null, texto: [
    'Qualquer forma de magia é patética contra a Anticriação.',
    'Você recebe resistência a magia +1 para cada poder da distinção e pode lançar Dissipar Magia, substituindo o teste de Misticismo por Vontade. Esta não é uma habilidade mágica e provém de seu desprezo pela Criação (veja “Magias Simuladas”, p. 44).',
  ] },
  { id: 'dist-algoz-ataque-corrupto', nome: 'Ataque Corrupto', grupo: 'distincao', livro: 'herois', pagina: 111,
    tags: 'Algoz da Tormenta · Tormenta', distincao: 'algoz-da-tormenta', marca: false, deus: null, magica: false,
    preReq: 'treinado em Luta ou Pontaria, Lar Infernal', custo: null, quadro: null, texto: [
    'Os golpes do algoz carregam a Tormenta consigo.',
    'Seus ataques recebem o benefício de matéria vermelha (Tormenta20, p. 167), cumulativo com melhorias de material especial (incluindo a própria matéria vermelha), mas seus efeitos nocivos não o afetam. Para cada dois outros poderes da distinção que você possui, o dano extra causado por este poder aumenta em +1d6.',
  ] },
  { id: 'dist-algoz-general-rubro', nome: 'General Rubro', grupo: 'distincao', livro: 'herois', pagina: 111,
    tags: 'Algoz da Tormenta · Tormenta', distincao: 'algoz-da-tormenta', marca: false, deus: null, magica: false,
    preReq: 'Desprezo Profano, 11º nível', custo: null, quadro: null, texto: [
    'Os lefeu reconhecem o algoz como um deles.',
    'Lefeu de ND menor do que o seu nível são prestativos a você, enquanto criaturas tocadas pela Tormenta (lefou, pessoas com poderes da Tormenta, cultistas, devotos de Aharadak etc.) capazes de percebê-lo ficam enfeitiçados (Vontade CD Sab +2 para cada poder da Tormenta evita). Além disso, se você já possuir um parceiro fornecido por outra habilidade, ele se torna também um parceiro aberrante iniciante (veja p. 66).',
  ] },
  { id: 'dist-algoz-abracar-anticriacao', nome: 'Abraçar Anticriação', grupo: 'distincao', livro: 'herois', pagina: 111,
    tags: 'Algoz da Tormenta · Tormenta', distincao: 'algoz-da-tormenta', marca: false, deus: null, magica: false,
    preReq: 'General Rubro, 17º nível', custo: null, quadro: null, texto: [
    'O algoz trai tudo que Arton é, tornando-se de corpo e alma como os invasores.',
    'Seu tipo muda para monstro (lefeu) e você recebe todas as habilidades lefeu (Tormenta20, p. 315) — sua Insanidade da Tormenta causa perda de 1d6 PM para cada poder da distinção que você possui (atributo-chave Sabedoria).',
  ] },

  //  Amazona (p. 112–114) — 1 marca + 6 poderes.
  { id: 'dist-amazona-armadura-das-amazonas', nome: 'Armadura das Amazonas', grupo: 'distincao', livro: 'herois', pagina: 113,
    tags: 'Amazona', distincao: 'amazona', marca: true, deus: null, magica: false,
    preReq: null, custo: null, quadro: null, texto: [
    'Marca da distinção. Orgulhosas, as amazonas vestem sua autoconfiança como uma verdadeira armadura.',
    'Se não estiver usando armadura pesada, você recebe +2 na Defesa.',
  ] },
  { id: 'dist-amazona-predadora', nome: 'Predadora', grupo: 'distincao', livro: 'herois', pagina: 113,
    tags: 'Amazona', distincao: 'amazona', marca: false, deus: null, magica: false,
    preReq: 'treinada em Sobrevivência', custo: null, quadro: null, texto: [
    'Improvise. Adapte. Supere.',
    'Você pode gastar uma ação de movimento e 2 PM para analisar um inimigo em alcance médio. Até o fim da cena, você recebe +1 em testes de perícia e rolagens de dano contra esse inimigo e outras criaturas do mesmo tipo. Para cada outro poder da distinção, você pode gastar +1 PM para aumentar esses bônus em +1.',
  ] },
  { id: 'dist-amazona-arquearia-montada', nome: 'Arquearia Montada', grupo: 'distincao', livro: 'herois', pagina: 114,
    tags: 'Amazona', distincao: 'amazona', marca: false, deus: null, magica: false,
    preReq: 'Bênção de Hippion', custo: null, quadro: null, texto: [
    'A morte é uma amazona montada.',
    'Enquanto está montada, você pode aplicar quaisquer bônus em testes de ataque e rolagens de dano fornecidos pela montaria em seus ataques à distância.',
  ] },
  { id: 'dist-amazona-bencao-de-hippion', nome: 'Bênção de Hippion', grupo: 'distincao', livro: 'herois', pagina: 114,
    tags: 'Amazona', distincao: 'amazona', marca: false, deus: null, magica: false,
    preReq: 'Ginete, Predadora', custo: null, quadro: null, texto: [
    'Que o Trono das Rainhas Guerreiras sempre a acompanhe.',
    'Você recebe um cavalo de guerra parceiro veterano. Caso já possua uma montaria fornecida por outra habilidade, em vez disso essa montaria fornece +2 em sua Destreza. Você e sua montaria possuem um vínculo emocional, sendo sempre capazes de entender um ao outro (não é preciso fazer testes de Adestramento). Caso perca sua montaria, você pode treinar outra com uma semana de trabalho.',
  ] },
  { id: 'dist-amazona-estilo-da-amazona', nome: 'Estilo da Amazona', grupo: 'distincao', livro: 'herois', pagina: 114,
    tags: 'Amazona', distincao: 'amazona', marca: false, deus: null, magica: false,
    preReq: 'Estilo de Arremesso, Predadora', custo: null, quadro: null, texto: [
    'A amazona é uma guerreira rápida, versátil e letal.',
    'Uma vez por rodada, quando faz um ataque corpo a corpo, se uma de suas mãos estiver livre ou empunhando um escudo leve, você pode gastar 2 PM para fazer um ataque adicional com uma arma de arremesso com essa mão.',
  ] },
  { id: 'dist-amazona-nunca-ceder', nome: 'Nunca Ceder', grupo: 'distincao', livro: 'herois', pagina: 113,
    tags: 'Amazona', distincao: 'amazona', marca: false, deus: null, magica: false,
    preReq: 'Estilo da Amazona', custo: null, quadro: null, texto: [
    'Amazonas não se dobram às ferramentas dos opressores.',
    'Quando falha em um teste de resistência contra um efeito de um inimigo, você pode gastar 2 PM para repetir esse teste, com um bônus igual ao total de poderes da distinção que você possui. Você só pode usar este poder uma vez por efeito.',
  ] },
  { id: 'dist-amazona-rainha-amazona', nome: 'Rainha Amazona', grupo: 'distincao', livro: 'herois', pagina: 114,
    tags: 'Amazona', distincao: 'amazona', marca: false, deus: null, magica: false,
    preReq: 'Arquearia Montada, Nunca Ceder, ter realizado um grande feito ou missão em nome das amazonas', custo: null, quadro: null, texto: [
    'A amazona se torna uma campeã de sua causa — uma inspiração para suas irmãs e um pesadelo para seus inimigos.',
    'Você recebe +1 em Carisma e, quando usa Predadora, aplica o bônus recebido como RD contra criaturas desse tipo.',
  ] },

  //  Armadilheiro Mestre (p. 114–117) — 1 marca + 6 poderes.
  { id: 'dist-armadilheiro-experiente', nome: 'Armadilheiro Experiente', grupo: 'distincao', livro: 'herois', pagina: 116,
    tags: 'Armadilheiro Mestre', distincao: 'armadilheiro-mestre', marca: true, deus: null, magica: false,
    preReq: null, custo: null, quadro: null, texto: [
    'Marca da distinção. Você recebe +2 em testes de perícia relacionados a armadilhas, incluindo testes para encontrar, desarmar e resistir a seus efeitos. Além disso, sempre que desarma uma armadilha que não seja sua, você recupera 1 PM.',
  ] },
  { id: 'dist-armadilheiro-armadilha-instantanea', nome: 'Armadilha Instantânea', grupo: 'distincao', livro: 'herois', pagina: 116,
    tags: 'Armadilheiro Mestre', distincao: 'armadilheiro-mestre', marca: false, deus: null, magica: false,
    preReq: 'treinado em Ladinagem e Ofício (artesão)', custo: null,
    quadro: { titulo: 'Armadilhas de armadilheiro', texto: [
      'Atordoante — a criatura sofre 4d8 de impacto e fica atordoada por 1 rodada (Fortitude CD Int evita a condição); uma vez por cena por criatura.',
      'Barril de Óleo — criaturas na área ficam vulneráveis a fogo até se limparem (ação completa).',
      'Buraco Portátil — um fosso se abre na área; queda de 6m causa 4d6 de impacto (Atletismo CD 20 para escalar de volta, Reflexos CD Int evita e move para fora da área).',
      'Constrangedora — a criatura fica pasma por 1 rodada e frustrada (Vontade CD Int evita o pasmo); uma vez por cena por criatura.',
      'Fumaça — nuvem espessa obscurece a visão na área até o fim da cena (camuflagem leve a até 1,5m, total a partir de 3m).',
      'Luz — criaturas na área ficam cegas por 1d4 rodadas e depois ofuscadas (Reflexos CD Int evita a cegueira).',
      'Mola — a criatura é empurrada 9m para longe do centro e fica caída (Reflexos CD Int evita o empurrão); se colidir com obstáculo, sofre 2d6 de impacto.',
      'Mina — criaturas na área sofrem 4d6 de impacto e são empurradas 3m para longe do centro (Reflexos CD Int reduz à metade e evita o empurrão).',
      'Substância Enervante — criaturas na área não podem fazer ações que exijam calma ou concentração (como lançar magias) até se limparem (ação padrão).',
    ] },
    texto: [
    'Combinando o ambiente e seus próprios mecanismos, o armadilheiro produz armadilhas em um piscar de olhos.',
    'Escolha duas armadilhas entre as de armadilheiro e as de caçador. Uma vez feita, essa escolha não pode ser mudada. Você pode preparar as armadilhas escolhidas conforme as regras de Armadilhas (Tormenta20, p. 51), mas não precisa estar em um ambiente propício (porque usa seus próprios materiais) e pode usar Inteligência como atributo-chave da CD para encontrar, desarmar e evitar essas armadilhas. A cada novo poder da distinção, você pode escolher uma nova armadilha.',
  ] },
  { id: 'dist-armadilheiro-armadilha-distante', nome: 'Armadilha Distante', grupo: 'distincao', livro: 'herois', pagina: 116,
    tags: 'Armadilheiro Mestre', distincao: 'armadilheiro-mestre', marca: false, deus: null, magica: false,
    preReq: 'Des 1, Armadilha Instantânea', custo: null, quadro: null, texto: [
    'Se o alvo não vem até a armadilha, a armadilha vai até o alvo.',
    'Quando prepara uma armadilha, você pode gastar 1 PM para preparar essa armadilha em qualquer espaço desocupado em alcance curto.',
  ] },
  { id: 'dist-armadilheiro-armadilha-furtiva', nome: 'Armadilha Furtiva', grupo: 'distincao', livro: 'herois', pagina: 116,
    tags: 'Armadilheiro Mestre', distincao: 'armadilheiro-mestre', marca: false, deus: null, magica: false,
    preReq: 'Armadilha Instantânea, Ataque Furtivo', custo: null, quadro: null, texto: [
    'O armadilheiro prepara surpresas particularmente letais.',
    'A CD para encontrar, desarmar e resistir às suas armadilhas aumenta em +5 e você adiciona o dano de seu Ataque Furtivo ao dano que elas causam. Este poder não funciona contra criaturas que não fiquem desprevenidas ou surpreendidas.',
  ] },
  { id: 'dist-armadilheiro-armadilha-recarregavel', nome: 'Armadilha Recarregável', grupo: 'distincao', livro: 'herois', pagina: 116,
    tags: 'Armadilheiro Mestre', distincao: 'armadilheiro-mestre', marca: false, deus: null, magica: false,
    preReq: 'Armadilha Instantânea', custo: null, quadro: null, texto: [
    'As armadilhas do armadilheiro continuam perigosas mesmo após serem disparadas.',
    'Quando uma de suas armadilhas em alcance médio é disparada, você pode gastar 1 PM. Se fizer isso, a armadilha é rearmada automaticamente no início do seu próximo turno.',
  ] },
  { id: 'dist-armadilheiro-aumentar-complexidade', nome: 'Aumentar Complexidade', grupo: 'distincao', livro: 'herois', pagina: 116,
    tags: 'Armadilheiro Mestre', distincao: 'armadilheiro-mestre', marca: false, deus: null, magica: false,
    preReq: 'Armadilha Instantânea', custo: null, quadro: null, texto: [
    'Mais complexas, mais engenhosas, mais perigosas, mais mortais.',
    'Você soma sua Inteligência no dano e na CD de suas armadilhas (cumulativo) e elas passam a ocupar uma área de 4,5m de lado. Além disso, se você estiver em alcance médio de uma de suas armadilhas, pode dispará-la como uma ação livre.',
  ] },
  { id: 'dist-armadilheiro-tripla-ameaca', nome: 'Tripla Ameaça', grupo: 'distincao', livro: 'herois', pagina: 117,
    tags: 'Armadilheiro Mestre', distincao: 'armadilheiro-mestre', marca: false, deus: null, magica: false,
    preReq: 'Aumentar Complexidade', custo: null, quadro: null, texto: [
    'Mas e se pudesse ser mais…?',
    'Você pode gastar 10 PM para preparar até 3 armadilhas ao mesmo tempo. Cada uma aparece em um ponto diferente em alcance curto.',
  ] },

  //  Arqueiro de Lenórienn (p. 118–120) — 1 marca + 7 poderes. Quase
  //  todos são habilidades MÁGICAS (o ✦ do livro).
  { id: 'dist-arqueiro-o-arco-arcano', nome: 'O Arco Arcano', grupo: 'distincao', livro: 'herois', pagina: 120,
    tags: 'Arqueiro de Lenórienn', distincao: 'arqueiro-de-lenorienn', marca: true, deus: null, magica: false,
    preReq: null, custo: null, quadro: null, texto: [
    'Marca da distinção. A conquista do título de arqueiro de Lenórienn é marcada pela transformação da arma do candidato em um arco arcano.',
    'Seu arco se transforma em um arco arcano. Além de seus benefícios normais, ele conta como um item esotérico de um tipo a sua escolha e pode receber melhorias e encantos tanto de armas quanto de esotéricos (respeitando os limites normais). Se receber um desses benefícios que se aplique tanto a armas quanto a esotéricos, você deve escolher a qual dos dois ele será aplicado. Se perder seu arco arcano, você pode transformar outro com um ritual que dura 1 dia e consome T$ 100 em componentes.',
  ] },
  { id: 'dist-arqueiro-energizar-arco', nome: 'Energizar Arco', grupo: 'distincao', livro: 'herois', pagina: 120,
    tags: 'Arqueiro de Lenórienn', distincao: 'arqueiro-de-lenorienn', marca: false, deus: null, magica: true,
    preReq: 'treinado em Misticismo e Pontaria, habilidade de classe Magias, Foco em Arma (qualquer arco)', custo: null, quadro: null, texto: [
    'A primeira técnica aprendida pelo arqueiro de Lenórienn é entrelaçar sua magia com sua arma.',
    'Você aprende a magia Arma Mágica e pode lançá-la em seu arco arcano como uma ação de movimento (em vez de uma ação padrão). Se aprender novamente essa magia, seu custo diminui em –1 PM.',
  ] },
  { id: 'dist-arqueiro-chuva-de-flechas', nome: 'Chuva de Flechas', grupo: 'distincao', livro: 'herois', pagina: 120,
    tags: 'Arqueiro de Lenórienn', distincao: 'arqueiro-de-lenorienn', marca: false, deus: null, magica: true,
    preReq: 'Energizar Arco, lançar magias arcanas de 3º círculo', custo: null, quadro: null, texto: [
    'Combinando magia e arco, o arqueiro de Lenórienn cobre seus inimigos com flechas mortais.',
    'Você pode gastar uma ação padrão e 2 PM para multiplicar seu disparo. Faça um ataque à distância com seu arco e compare-o com a Defesa de um número de inimigos a sua escolha, no alcance do arco, limitado por seu atributo-chave para magias arcanas. Então faça uma única rolagem de dano e aplique-a a cada inimigo atingido. Você gasta apenas uma munição.',
  ] },
  { id: 'dist-arqueiro-encantar-flechas', nome: 'Encantar Flechas', grupo: 'distincao', livro: 'herois', pagina: 120,
    tags: 'Arqueiro de Lenórienn', distincao: 'arqueiro-de-lenorienn', marca: false, deus: null, magica: true,
    preReq: 'treinado em Ofício (armeiro), Energizar Arco, lançar magias arcanas de 2º círculo', custo: null, quadro: null, texto: [
    'O arqueiro de Lenórienn aprende a usar sua magia para criar flechas encantadas.',
    'Você recebe 20 flechas mágicas menores a sua escolha e passa a poder fabricar flechas mágicas menores. Se tiver acesso a magias arcanas de 3º círculo, você pode fabricar flechas mágicas médias e, se tiver acesso a magias arcanas de 4º círculo, pode fabricar flechas maiores. Se você disparar todo o pacote de flechas, a energia mística imbuída nelas volta para você e você recupera os PM sacrificados para fabricá-las.',
  ] },
  { id: 'dist-arqueiro-flecha-da-morte', nome: 'Flecha da Morte', grupo: 'distincao', livro: 'herois', pagina: 120,
    tags: 'Arqueiro de Lenórienn', distincao: 'arqueiro-de-lenorienn', marca: false, deus: null, magica: true,
    preReq: 'Encantar Flechas, deve ter feito um acerto crítico com um arco em uma criatura de cada tipo (Tormenta20, p. 284)', custo: null, quadro: null, texto: [
    'Tendo superado todos os tipos de inimigos, o arqueiro de Lenórienn aprende a infundir a essência da morte em suas flechas.',
    'Você pode gastar 1 dia e T$ 100 para criar uma flecha mágica chamada flecha da morte. Ela causa 1 dado extra de dano, fornece +2 na margem de ameaça e, se for usada em conjunto com Flecha de Toque ou Flecha Explosiva, aumenta a CD para resistir às magias em +2. Para cada dois outros poderes da distinção que você possui, esses bônus, e a quantidade de dados extras de dano, aumentam em +1. Você pode ter um máximo de flechas da morte igual ao total de poderes da distinção que possui (se criar uma além do seu limite, a flecha mais antiga perde seu poder).',
  ] },
  { id: 'dist-arqueiro-flecha-de-toque', nome: 'Flecha de Toque', grupo: 'distincao', livro: 'herois', pagina: 120,
    tags: 'Arqueiro de Lenórienn', distincao: 'arqueiro-de-lenorienn', marca: false, deus: null, magica: true,
    preReq: 'Energizar Arco', custo: null, quadro: null, texto: [
    'Com um sussurro mágico, o arqueiro faz sua flecha transportar uma de suas magias.',
    'Quando lança uma magia que permite fazer um ataque corpo a corpo como parte de sua execução (como Infligir Ferimentos ou Toque Chocante aprimoradas), você pode substituir esse ataque por um ataque à distância com seu arco arcano.',
  ] },
  { id: 'dist-arqueiro-flecha-explosiva', nome: 'Flecha Explosiva', grupo: 'distincao', livro: 'herois', pagina: 120,
    tags: 'Arqueiro de Lenórienn', distincao: 'arqueiro-de-lenorienn', marca: false, deus: null, magica: true,
    preReq: 'Flecha de Toque', custo: null, quadro: null, texto: [
    'Aprofundando seu treinamento, o arqueiro de Lenórienn aprende a lançar magias mais potentes com suas flechas.',
    'Suas magias de área recebem um novo aprimoramento. +2 PM: como parte da execução da magia, você faz um ataque à distância com seu arco arcano contra uma criatura ou objeto. Se acertar, causa o dano do ataque e o efeito da magia (o centro desse efeito é o alvo atingido).',
  ] },
  { id: 'dist-arqueiro-flecha-fantasma', nome: 'Flecha Fantasma', grupo: 'distincao', livro: 'herois', pagina: 120,
    tags: 'Arqueiro de Lenórienn', distincao: 'arqueiro-de-lenorienn', marca: false, deus: null, magica: true,
    preReq: 'Energizar Arco, Forma Etérea', custo: null, quadro: null, texto: [
    'Com um sussurro arcano, o arqueiro faz com que sua flecha alterne entre os Planos.',
    'Quando faz um ataque com arco, você pode gastar 2 PM para transformar sua flecha em uma munição etérea. Uma flecha etérea fornece +5 no teste de ataque e ignora cobertura leve e 20 pontos da redução de dano do alvo.',
  ] },

  //  Bruxo da Tormenta (p. 120–123) — 1 marca + 5 poderes. Usa Pontos de
  //  Insanidade (PI): o LIMITE de PI é 5× o total de poderes da Tormenta
  //  (no quadro da marca); o PI recebido por magia é limitado pelo total
  //  de poderes da DISTINÇÃO — é essa conta que o motor mostra.
  { id: 'dist-bruxo-insanidade-controlada', nome: 'Insanidade Controlada', grupo: 'distincao', livro: 'herois', pagina: 123,
    tags: 'Bruxo da Tormenta', distincao: 'bruxo-da-tormenta', marca: true, deus: null, magica: false,
    preReq: null, custo: null,
    quadro: { titulo: 'Pontos de Insanidade (PI)', texto: [
      'Você possui um limite de pontos de insanidade (PI) igual a 5 vezes seu total de poderes da Tormenta. Quando usa seus poderes de bruxo da Tormenta, você pode receber PI para fortalecer seus efeitos.',
      'Se seu total de PI ultrapassar metade do limite, você fica frustrado; se alcançar o limite, fica alquebrado e esmorecido (e não pode receber mais PI que o limite). PI são removidos por descanso, à taxa de 1 PI por nível, modificado pelas condições do descanso.',
    ] },
    texto: [
    'Marca da distinção. Um bruxo da Tormenta já testemunhou numerosas atrocidades lefeu.',
    'Quando lança uma magia, você pode receber uma quantidade de pontos de insanidade (veja o quadro) limitada pelo círculo da magia. Cada PI recebido dessa forma paga 1 PM do custo da magia.',
  ] },
  { id: 'dist-bruxo-conjuracao-insana', nome: 'Conjuração Insana', grupo: 'distincao', livro: 'herois', pagina: 123,
    tags: 'Bruxo da Tormenta', distincao: 'bruxo-da-tormenta', marca: false, deus: null, magica: false,
    preReq: 'Int 2, Caminho do Arcanista (Mago ou Bruxo), um poder da Tormenta', custo: null, quadro: null, texto: [
    'O bruxo da Tormenta alimenta suas magias com seus próprios demônios.',
    'Quando lança uma magia, você pode receber uma quantidade de pontos de insanidade, limitada pelo total de poderes da distinção que você possui. Se fizer isso, a CD dessa magia aumenta em +1 por PI recebido.',
  ] },
  { id: 'dist-bruxo-corromper-magia', nome: 'Corromper Magia', grupo: 'distincao', livro: 'herois', pagina: 123,
    tags: 'Bruxo da Tormenta', distincao: 'bruxo-da-tormenta', marca: false, deus: null, magica: false,
    preReq: 'Magia Antiaberrante, Resistência à Tormenta', custo: null, quadro: null, texto: [
    'A corrupção empregada pelo bruxo da Tormenta se espalha através de suas magias.',
    'Quando lança uma magia de dano, você pode receber uma quantidade de pontos de insanidade limitada pelo total de poderes da distinção que você possui. Se fizer isso, para cada PI recebido, a magia causa +1d6 pontos de dano de essência.',
  ] },
  { id: 'dist-bruxo-escudo-rubro', nome: 'Escudo Rubro', grupo: 'distincao', livro: 'herois', pagina: 123,
    tags: 'Bruxo da Tormenta', distincao: 'bruxo-da-tormenta', marca: false, deus: null, magica: false,
    preReq: 'Resistência à Tormenta', custo: null, quadro: null, texto: [
    'O bruxo da Tormenta usa sua loucura como uma armadura.',
    'Quando faz um teste de resistência ou sofre dano, você pode receber uma quantidade de pontos de insanidade limitada pelo total de poderes da distinção que possui. Se fizer isso, para cada PI recebido você recebe +2 nesse teste de resistência ou 5 pontos de RD contra esse dano. Esses benefícios são dobrados contra efeitos da Tormenta, de suas criaturas e de devotos de Aharadak.',
  ] },
  { id: 'dist-bruxo-magia-antiaberrante', nome: 'Magia Antiaberrante', grupo: 'distincao', livro: 'herois', pagina: 123,
    tags: 'Bruxo da Tormenta', distincao: 'bruxo-da-tormenta', marca: false, deus: null, magica: false,
    preReq: 'Conjuração Insana', custo: null, quadro: null, texto: [
    'Um bruxo da Tormenta conjura magias mais efetivas contra seres antinaturais.',
    'Quando lança uma magia, você pode receber uma quantidade de pontos de insanidade igual ao círculo dela. Se fizer isso, ela ignora 10 pontos da RD dos alvos e, se algum deles for lefeu, ignora também suas imunidades.',
  ] },
  { id: 'dist-bruxo-resistencia-a-tormenta', nome: 'Resistência à Tormenta', grupo: 'distincao', livro: 'herois', pagina: 123,
    tags: 'Bruxo da Tormenta', distincao: 'bruxo-da-tormenta', marca: false, deus: null, magica: false,
    preReq: 'Conjuração Insana', custo: null, quadro: null, texto: [
    'O relâmpago de sangue cai dos céus, mas o bárbaro não parece ter sido afetado.',
    'Você aprende e pode lançar Resistência a Energia. Caso aprenda novamente essa magia, seu custo diminui em –1 PM. Além disso, ela recebe o seguinte aprimoramento. +2 PM: o alvo é protegido de certos efeitos de áreas de Tormenta e templos de Aharadak (Ameaças de Arton, p. 60). Ao entrar nesses locais, ele não fica frustrado, seus itens mágicos encantados não perdem encantos e ele recebe +5 em testes de resistência contra Fenômenos Rubros (Ameaças de Arton, p. 360).',
  ] },

  //  Caçador de Cabeças (p. 123–126) — 1 marca + 5 poderes.
  { id: 'dist-cacador-cabecas-terror-de-lamnor', nome: 'Terror de Lamnor', grupo: 'distincao', livro: 'herois', pagina: 126,
    tags: 'Caçador de Cabeças', distincao: 'cacador-de-cabecas', marca: true, deus: null, magica: false,
    preReq: null, custo: null, quadro: null, texto: [
    'Marca da distinção. No continente bestial, o silêncio assusta mais que qualquer rugido.',
    'Você recebe +2 em Furtividade e +2 na margem de ameaça de ataques contra criaturas desprevenidas.',
  ] },
  { id: 'dist-cacador-cabecas-predador-alfa', nome: 'Predador Alfa', grupo: 'distincao', livro: 'herois', pagina: 126,
    tags: 'Caçador de Cabeças', distincao: 'cacador-de-cabecas', marca: false, deus: null, magica: false,
    preReq: 'treinado em Furtividade, Lobo Solitário, ser duyshidakk', custo: null, quadro: null, texto: [
    'O caçador de cabeças se move tão silenciosamente que parece se teleportar.',
    'Uma vez por rodada, você pode gastar uma ação de movimento e 2 PM para fazer um teste de Furtividade oposto à Percepção de uma criatura em alcance curto. Se vencer o teste, você “surge” adjacente ao alvo e é considerado invisível contra ele até o início do seu próximo turno. Esta habilidade exige liberdade de movimentos; você não pode usá-la se estiver de armadura pesada ou na condição imóvel.',
  ] },
  { id: 'dist-cacador-cabecas-arsenal-do-cacador', nome: 'Arsenal do Caçador', grupo: 'distincao', livro: 'herois', pagina: 125,
    tags: 'Caçador de Cabeças', distincao: 'cacador-de-cabecas', marca: false, deus: null, magica: false,
    preReq: 'Predador Alfa, Saque Rápido', custo: null, quadro: null, texto: [
    'Além de furtividade, o caçador de cabeças emprega uma variedade de itens alquímicos.',
    'Você soma sua Sabedoria na CD e nas rolagens de dano (ou de perda de vida) dos preparados alquímicos e venenos que usa, e o alcance em que pode arremessá-los aumenta em uma categoria (de curto para médio e de médio para longo). Além disso, se o item exigir uma ação de movimento para ser preparado (como acender o pavio de uma bomba ou aplicar um veneno em sua arma), você pode fazer isso como uma ação livre.',
  ] },
  { id: 'dist-cacador-cabecas-camuflagem-do-cacador', nome: 'Camuflagem do Caçador', grupo: 'distincao', livro: 'herois', pagina: 125,
    tags: 'Caçador de Cabeças', distincao: 'cacador-de-cabecas', marca: false, deus: null, magica: false,
    preReq: 'Camuflagem, Predador Alfa', custo: null, quadro: null, texto: [
    'Quando está oculto, o caçador de cabeças é capaz de apagar completamente sua presença.',
    'Quando você está sob camuflagem, seus inimigos aplicam a chance de erro por camuflagem a qualquer efeito contra você (não apenas ataques).',
  ] },
  { id: 'dist-cacador-cabecas-exterminar-presa', nome: 'Exterminar Presa', grupo: 'distincao', livro: 'herois', pagina: 126,
    tags: 'Caçador de Cabeças', distincao: 'cacador-de-cabecas', marca: false, deus: null, magica: false,
    preReq: 'Espreitar, Predador Alfa', custo: null, quadro: null, texto: [
    'Quando alcança seu alvo, o caçador de cabeças não oferece segundas chances.',
    'Quando usa Marca da Presa, para cada poder da distinção você recebe 1 PM temporário que só pode ser usado contra a criatura marcada. Além disso, se fizer um acerto crítico contra essa criatura, seu dano adicional por Marca da Presa também é multiplicado.',
  ] },
  { id: 'dist-cacador-cabecas-sentidos-de-cacada', nome: 'Sentidos de Caçada', grupo: 'distincao', livro: 'herois', pagina: 126,
    tags: 'Caçador de Cabeças', distincao: 'cacador-de-cabecas', marca: false, deus: null, magica: false,
    preReq: 'Predador Alfa, Sentidos Aguçados', custo: null, quadro: null, texto: [
    'O caçador de cabeças aprende a não depender dos sentidos para abater sua presa.',
    'Você enxerga perfeitamente no escuro, incluindo escuridão mágica, e ignora camuflagem por fumaça ou névoa.',
  ] },

  //  Caçador de Dragões (p. 126–129) — 1 marca + 5 poderes.
  { id: 'dist-cacador-dragoes-escama-da-honra', nome: 'Escama da Honra', grupo: 'distincao', livro: 'herois', pagina: 128,
    tags: 'Caçador de Dragões', distincao: 'cacador-de-dragoes', marca: true, deus: null, magica: false,
    preReq: null, custo: null, quadro: null, texto: [
    'Marca da distinção. Como símbolo de sua iniciação, cada caçador de dragões ostenta um amuleto feito de uma escama do primeiro dragão que derrotou.',
    'Você recebe um amuleto de escama da honra, um item de vestuário que não ocupa espaço nem conta em seu limite de itens vestidos. Enquanto estiver usando esse amuleto, uma vez por rodada, quando causa dano com um ataque corpo a corpo, você pode causar +1d6 pontos de dano de um tipo escolhido entre os dos sopros dos dragões que você já derrotou. Se perder seu amuleto, você pode confeccionar outro em um processo que demora 1 dia e exige uma escama de um dragão que você tenha matado há menos de 30 dias.',
  ] },
  { id: 'dist-cacador-dragoes-destemor-inflamado', nome: 'Destemor Inflamado', grupo: 'distincao', livro: 'herois', pagina: 128,
    tags: 'Caçador de Dragões', distincao: 'cacador-de-dragoes', marca: false, deus: null, magica: false,
    preReq: 'treinado em Vontade', custo: null, quadro: null, texto: [
    'A presença de um dragão é suficiente para destruir a coragem de muitos, mas não de um caçador de dragões.',
    'Você é imune a medo (exceto fobias raciais). Além disso, quando um inimigo usa um efeito de medo contra você, você recebe +2 em testes de perícia e rolagens de dano até o fim da cena. Para cada dois outros poderes da distinção que você possuir, esse bônus aumenta em +1.',
  ] },
  { id: 'dist-cacador-dragoes-alcar-aos-ceus', nome: 'Alçar aos Céus', grupo: 'distincao', livro: 'herois', pagina: 128,
    tags: 'Caçador de Dragões', distincao: 'cacador-de-dragoes', marca: false, deus: null, magica: false,
    preReq: 'treinado em Atletismo, Destemor Inflamado', custo: null, quadro: null, texto: [
    'O caçador pega impulso, dando um salto impressionante para reduzir a distância até seu alvo, acertando-o com um ataque fulminante.',
    'Você pode gastar 2 PM e uma ação completa para fazer uma investida saltando sobre uma criatura em alcance médio. Esse ataque causa um dado extra de dano, mais um dado extra para cada dois outros poderes da distinção. Se o alvo for um dragão, esses dados extras são dobrados. Após o ataque, você aterrissa em um espaço desocupado adjacente à criatura. Se a criatura for maior que você, você pode aterrissar sobre ela (nas costas, no dorso etc.) enquanto faz o ataque.',
  ] },
  { id: 'dist-cacador-dragoes-danificar-as-asas', nome: 'Danificar as Asas', grupo: 'distincao', livro: 'herois', pagina: 128,
    tags: 'Caçador de Dragões', distincao: 'cacador-de-dragoes', marca: false, deus: null, magica: false,
    preReq: 'Destemor Inflamado', custo: null, quadro: null, texto: [
    'Com um ataque certeiro, o caçador de dragões atrapalha os movimentos do dragão.',
    'Quando você faz um ataque, pode gastar 2 PM para machucar as asas ou outro membro locomotor do alvo. Se você acertar o ataque, o alvo fica caído e lento (Fort CD For ou Des reduz para lento por 1 rodada e a criatura não pode mais ser afetada por este poder nessa cena). Para cada poder da distinção, a CD aumenta em +1. Esse aumento é dobrado contra dragões.',
  ] },
  { id: 'dist-cacador-dragoes-entortar-escamas', nome: 'Entortar Escamas', grupo: 'distincao', livro: 'herois', pagina: 128,
    tags: 'Caçador de Dragões', distincao: 'cacador-de-dragoes', marca: false, deus: null, magica: false,
    preReq: 'Destemor Inflamado, outro poder da distinção', custo: null, quadro: null, texto: [
    'O caçador sabe enfraquecer aos poucos sua presa dracônica.',
    'Quando faz um acerto crítico, você enfraquece as defesas do alvo. Até o fim da cena, a criatura sofre –2 na Defesa e sua redução de dano diminui em –5. Se você tiver cinco poderes da distinção, em vez disso a criatura sofre –5 na Defesa e sua redução de dano diminui em –10.',
  ] },
  { id: 'dist-cacador-dragoes-evasao-do-cacador', nome: 'Evasão do Caçador', grupo: 'distincao', livro: 'herois', pagina: 129,
    tags: 'Caçador de Dragões', distincao: 'cacador-de-dragoes', marca: false, deus: null, magica: false,
    preReq: 'treinado em Reflexos, Destemor Inflamado', custo: null, quadro: null, texto: [
    'O caçador de dragões sabe o momento exato em que deve se esquivar.',
    'Quando sofre um efeito que permite um teste de Reflexos para reduzir o dano à metade, você não sofre dano nenhum se passar e sofre apenas metade do dano se falhar. Além disso, uma vez por rodada, quando passa em um teste de Reflexos, você pode percorrer até metade do seu deslocamento. Esta habilidade exige liberdade de movimentos; você não pode usá-la se estiver na condição imóvel.',
  ] },

  //  Campeão de Dojo (p. 130–132) — 1 marca + 5 poderes.
  { id: 'dist-campeao-dojo-foco-marcial', nome: 'Foco Marcial', grupo: 'distincao', livro: 'herois', pagina: 131,
    tags: 'Campeão de Dojo', distincao: 'campeao-de-dojo', marca: true, deus: null, magica: false,
    preReq: null, custo: null, quadro: null, texto: [
    'Marca da distinção. O campeão de dojo aprende a concentrar sua mente em um único ataque.',
    'Você pode gastar uma ação de movimento para receber +1d8 na rolagem de dano de seu próximo ataque desarmado feito nessa rodada.',
  ] },
  { id: 'dist-campeao-dojo-golpe-concentrado', nome: 'Golpe Concentrado', grupo: 'distincao', livro: 'herois', pagina: 131,
    tags: 'Campeão de Dojo', distincao: 'campeao-de-dojo', marca: false, deus: null, magica: false,
    preReq: 'Sab 2, Briga', custo: null, quadro: null, texto: [
    'A primeira técnica dominada pelo campeão é canalizar sua energia em seus golpes.',
    'Você pode gastar uma ação de movimento e 2 PM para se concentrar em seus golpes. Quando faz isso, até o fim da cena você recebe +1d8 em suas rolagens de dano desarmado.',
  ] },
  { id: 'dist-campeao-dojo-caminho-da-mao-armada', nome: 'Caminho da Mão Armada', grupo: 'distincao', livro: 'herois', pagina: 131,
    tags: 'Campeão de Dojo', distincao: 'campeao-de-dojo', marca: false, deus: null, magica: false,
    preReq: 'Golpe Concentrado', custo: null, quadro: null, texto: [
    'O treinamento de um campeão por vezes envolve dominar as armas tradicionais de seu dojo.',
    'Escolha três armas corpo a corpo com as quais tenha proficiência. Para você, essas armas contam como ataques desarmados para efeitos que interagem com eles de qualquer forma e, quando ataca com uma delas, você pode usar o dano básico da arma ou seu dano desarmado, o que for melhor.',
  ] },
  { id: 'dist-campeao-dojo-caminhar-do-dragao', nome: 'Caminhar do Dragão', grupo: 'distincao', livro: 'herois', pagina: 131,
    tags: 'Campeão de Dojo', distincao: 'campeao-de-dojo', marca: false, deus: null, magica: false,
    preReq: 'treinado em Atletismo, Golpe Concentrado', custo: null, quadro: null, texto: [
    'O treinamento do campeão de dojo torna seus passos mais leves que o ar.',
    'Você recebe +5 em Atletismo e pode gastar 1 PM para “correr no ar” por 1 rodada, como se tivesse deslocamento de voo igual ao seu deslocamento base. Você deve terminar seu movimento sobre o chão ou outra superfície firme, ou cairá ao solo.',
  ] },
  { id: 'dist-campeao-dojo-controlar-a-respiracao', nome: 'Controlar a Respiração', grupo: 'distincao', livro: 'herois', pagina: 131,
    tags: 'Campeão de Dojo', distincao: 'campeao-de-dojo', marca: false, deus: null, magica: false,
    preReq: 'Golpe Concentrado', custo: null, quadro: null, texto: [
    'Graças a seu treinamento intenso, o campeão de dojo se torna mestre do próprio corpo.',
    'Você pode gastar uma ação de movimento e uma quantidade de PM limitada por sua Sabedoria. Para cada PM que gastar, recupera 2d6 pontos de vida. Para cada dois outros poderes da distinção que você possui, cada dado de cura aumenta em um passo.',
  ] },
  { id: 'dist-campeao-dojo-sentidos-do-tigre', nome: 'Sentidos do Tigre', grupo: 'distincao', livro: 'herois', pagina: 131,
    tags: 'Campeão de Dojo', distincao: 'campeao-de-dojo', marca: false, deus: null, magica: false,
    preReq: 'Golpe Concentrado', custo: null, quadro: null, texto: [
    'Aprimorados por anos de treinamento, os sentidos do campeão protegem-no de qualquer ameaça.',
    'Você soma sua Sabedoria na Defesa e em Reflexos. Esta habilidade exige liberdade de movimentos; você não pode usá-la se estiver de armadura pesada ou na condição imóvel.',
  ] },

  //  Capitão do Conclave Pirata (p. 132–135) — 1 marca + 5 poderes.
  { id: 'dist-conclave-membro-do-conclave', nome: 'Membro do Conclave', grupo: 'distincao', livro: 'herois', pagina: 134,
    tags: 'Capitão do Conclave Pirata', distincao: 'capitao-do-conclave-pirata', marca: true, deus: null, magica: false,
    preReq: null, custo: null,
    quadro: { titulo: 'Solidariedade Pirata', texto: [
      'Uma vez por aventura, você pode solicitar ajuda ao Conclave Pirata através de uma rede de comunicação envolvendo pássaros, informantes e mensageiros mágicos. Uma mensagem enviada terá resposta em 1d3 dias. O Conclave pode oferecer ajuda na forma de pessoal (até quatro parceiros iniciantes ou um parceiro veterano, de tipos a sua escolha), equipamento (valor máximo igual a T$ 1.000 × seu nível) ou informações (efetivamente escolher 20 em um teste para interrogar). Essa ajuda não é gratuita: a contrapartida é ajudar outros capitães nos mesmos termos quando eles precisarem.',
      'Também é possível solicitar a ajuda do próprio Sentença. Nesse caso, o pedido será avaliado por Izzy e Sirius. Somente as mais terríveis ameaças e os mais desprezíveis puristas justificam uma resposta positiva, mas nessas situações os recursos disponibilizados costumam bastar para virar a maré a favor do capitão solicitante. Depois de um feito como esse, a Dupla Coroa exigirá uma retribuição de seu capitão, em geral uma missão de extrema importância e dificuldade.',
    ] },
    texto: [
    'Marca da distinção. Quando enfrenta um capitão do Conclave, você enfrenta todos.',
    'Você recebe +2 em Acrobacia e Pilotagem e não sofre as penalidades por atacar à distância ou lançar magias a bordo de um veículo (Tormenta20, p. 243). Além disso, pode recorrer à Solidariedade Pirata (veja o quadro).',
  ] },
  { id: 'dist-conclave-icar-a-bandeira-preta', nome: 'Içar a Bandeira Preta', grupo: 'distincao', livro: 'herois', pagina: 134,
    tags: 'Capitão do Conclave Pirata', distincao: 'capitao-do-conclave-pirata', marca: false, deus: null, magica: false,
    preReq: 'treinado em Intimidação e Pilotagem, Audácia', custo: null, quadro: null, texto: [
    'A bandeira do Conclave Pirata inspira medo nos inimigos e esperança nos aliados.',
    'Uma vez por cena, você pode gastar uma ação de movimento e 5 PM para motivar seus aliados e assustar seus inimigos. Aliados em alcance curto recebem 5 PV e 1 PM temporários para cada poder da distinção que você possui, que duram até o fim da cena. Inimigos em alcance curto ficam abalados por 1d4 rodadas (Vontade CD Car evita). Caso sua bandeira já esteja visível no começo da cena, você pode usar este poder gastando apenas uma ação livre e 3 PM.',
  ] },
  { id: 'dist-conclave-lingua-afiada', nome: 'Língua Afiada', grupo: 'distincao', livro: 'herois', pagina: 134,
    tags: 'Capitão do Conclave Pirata', distincao: 'capitao-do-conclave-pirata', marca: false, deus: null, magica: false,
    preReq: 'Içar a Bandeira Preta', custo: null, quadro: null, texto: [
    'Certos insultos doem mais do que golpes de espada.',
    'Quando vence um teste oposto de Enganação contra uma criatura inteligente (Int –3 ou maior), para cada poder da distinção que possuir você também pode causar 2d6 pontos de dano psíquico não letal a ela (apenas uma vez por cena). Além disso, se você usar Audácia em testes de Enganação, Diplomacia ou Intimidação, seu custo diminui em –1 PM.',
  ] },
  { id: 'dist-conclave-lutar-sujo', nome: 'Lutar Sujo', grupo: 'distincao', livro: 'herois', pagina: 134,
    tags: 'Capitão do Conclave Pirata', distincao: 'capitao-do-conclave-pirata', marca: false, deus: null, magica: false,
    preReq: 'Içar a Bandeira Preta', custo: null, quadro: null, texto: [
    'Um pirata não tem nenhum pudor sobre chutar ferimentos ou enfiar dedos em olhos. Qualquer coisa vale a pena para vencer.',
    'Você pode fazer um teste de manobra (Tormenta20, p. 234) para executar um truque sujo contra um inimigo. Se vencer, o inimigo sofre uma condição a sua escolha entre cego, enjoado, lento ou surdo por 1 rodada — ou até ele usar uma ação padrão para se recompor.',
  ] },
  { id: 'dist-conclave-sentenca-de-bolso', nome: 'Sentença de Bolso', grupo: 'distincao', livro: 'herois', pagina: 134,
    tags: 'Capitão do Conclave Pirata', distincao: 'capitao-do-conclave-pirata', marca: false, deus: null, magica: false,
    preReq: 'proficiência com armas de fogo, Içar a Bandeira Preta', custo: null, quadro: null, texto: [
    'Os canhões do Sentença são os mais terríveis de toda Arton. A mera menção de seu poder deixa qualquer marujo com as pernas bambas.',
    'Você recebe +2 em Intimidação e na margem de ameaça com armas de fogo, e causa +2d6 pontos de dano com armas de fogo em oponentes desprevenidos.',
  ] },
  { id: 'dist-conclave-vento-em-popa', nome: 'Vento em Popa', grupo: 'distincao', livro: 'herois', pagina: 135,
    tags: 'Capitão do Conclave Pirata', distincao: 'capitao-do-conclave-pirata', marca: false, deus: null, magica: false,
    preReq: 'treinado em Pilotagem, Içar a Bandeira Preta, Pernas do Mar', custo: null, quadro: null, texto: [
    'Os capitães mais ligeiros têm os navios mais rápidos.',
    'Uma vez por rodada, você pode gastar 2 PM para realizar uma ação de movimento adicional em seu turno. Se tiver o poder Velocidade Ladina, em vez disso o custo para usá-lo diminui em –1 PM. Em ambos os casos, o custo diminui em –1 PM (cumulativo com este poder) se você estiver a bordo de um veículo aquático. Por fim, se você usar Audácia em testes de Acrobacia, Atletismo ou Pilotagem, seu custo diminui em –1 PM.',
  ] },

  //  Carteador (p. 135–138) — 1 marca + 5 poderes.
  { id: 'dist-carteador-sorte-de-principiante', nome: 'Sorte de Principiante', grupo: 'distincao', livro: 'herois', pagina: 137,
    tags: 'Carteador', distincao: 'carteador', marca: true, deus: null, magica: false,
    preReq: null, custo: null, quadro: null, texto: [
    'Marca da distinção. Sorte grande, não é?',
    'Você aprende e pode lançar Orientação, mas apenas em você mesmo e apenas para testes de Jogatina. Alternativamente, se possuir o suplemento Deuses de Arton, você aprende e pode lançar Sorriso da Fortuna (atributo-chave Carisma, p. 64) e pode usá-la em jogos mágicos. Em ambos os casos, esta não é uma habilidade mágica e provém de sua capacidade de sutilmente torcer as regras do jogo a seu favor (veja “Magias Simuladas”, p. 44).',
  ] },
  { id: 'dist-carteador-dado-viciado', nome: 'Dado Viciado', grupo: 'distincao', livro: 'herois', pagina: 137,
    tags: 'Carteador', distincao: 'carteador', marca: false, deus: null, magica: false,
    preReq: 'treinado em Jogatina', custo: null, quadro: null, texto: [
    'A realidade é só mais uma mesa de jogo, onde vence quem tem os melhores dados.',
    'No início de cada cena, você recebe 1d6 como dado de auxílio, +1d6 para cada outros dois poderes da distinção que possua. Quando faz um teste de perícia, você pode pagar 1 PM para cada dado de auxílio que quiser gastar, e soma o resultado deles como bônus no teste. Além disso, sempre que rolar mais de um dado de auxílio e o resultado de pelo menos dois deles for igual, você ganha 1 PM temporário por dado igual.',
  ] },
  { id: 'dist-carteador-as-na-manga', nome: 'Ás na Manga', grupo: 'distincao', livro: 'herois', pagina: 137,
    tags: 'Carteador', distincao: 'carteador', marca: false, deus: null, magica: false,
    preReq: 'Dado Viciado', custo: null, quadro: null, texto: [
    'O arsenal de trapaças de um carteador é praticamente infinito.',
    'Quando você faz um teste de perícia, pode gastar 2 PM para usar Jogatina no lugar dessa perícia. Você só pode fazer isso uma vez para cada perícia a cada cena.',
  ] },
  { id: 'dist-carteador-jogo-perigoso', nome: 'Jogo Perigoso', grupo: 'distincao', livro: 'herois', pagina: 137,
    tags: 'Carteador', distincao: 'carteador', marca: false, deus: null, magica: true,
    preReq: 'treinado em Misticismo, Ás na Manga', custo: null, quadro: null, texto: [
    'Só um tolo joga com as cartas que lhe foram dadas.',
    'Você pode gastar uma ação completa para fazer uma aposta com uma entidade sobrenatural. Escolha uma magia de 1º círculo, arcana ou divina, e faça um teste de Jogatina (CD 20 + o custo em PM da magia). Se passar, até o fim da cena, ou até usar este poder novamente, você pode lançar essa magia (atributo-chave Carisma) e pode usar seus aprimoramentos como se tivesse acesso aos mesmos círculos de magia que um bardo do seu nível. Se falhar, você perde 2 PM para cada círculo da magia. A cada dois outros poderes da distinção, você pode escolher magias de um círculo acima do 1º.',
  ] },
  { id: 'dist-carteador-resultado-destinado', nome: 'Resultado Destinado', grupo: 'distincao', livro: 'herois', pagina: 137,
    tags: 'Carteador', distincao: 'carteador', marca: false, deus: null, magica: false,
    preReq: 'Jogo Perigoso, 17º nível de personagem', custo: null, quadro: null, texto: [
    'Um carteador é capaz de trapacear com seus inimigos, com os deuses e com o próprio destino.',
    'Uma vez por cena, você pode pagar 5 PM. Escolha uma habilidade de classe de até 5º nível de uma classe que não seja a sua. Você recebe essa habilidade e pode usá-la como se tivesse 5 níveis nessa classe (se escolher a habilidade Magias, você aprende uma única magia, mas não soma o atributo-chave da habilidade em seu total de PM) até o fim da cena. Seu atributo-chave para a habilidade é Carisma. Você não pode escolher a mesma habilidade de classe duas vezes na mesma aventura.',
  ] },
  { id: 'dist-carteador-seduzir-a-sorte', nome: 'Seduzir a Sorte', grupo: 'distincao', livro: 'herois', pagina: 137,
    tags: 'Carteador', distincao: 'carteador', marca: false, deus: null, magica: false,
    preReq: 'Dado Viciado', custo: null, quadro: null, texto: [
    'Contam-se histórias sobre um carteador capaz de rolar um 7 num dado de 6 faces.',
    'Quando rola um ou mais dados de auxílio, você pode pagar 1 PM para fazer uma aposta com o mestre. Você rola os seus dados de auxílio e soma o resultado, enquanto o mestre rola a mesma quantidade do mesmo tipo de dados em segredo. Após rolar seus dados, você deve adivinhar qual o maior resultado total (entre a sua rolagem e a do mestre). Se adivinhar corretamente, você recupera os dados de auxílio gastos. Se perder, fica frustrado.',
  ] },

  //  Cavaleiro do Corvo (p. 138–141) — 1 marca + 7 poderes.
  { id: 'dist-corvo-nao-tenho-nome', nome: 'Não Tenho Nome', grupo: 'distincao', livro: 'herois', pagina: 140,
    tags: 'Cavaleiro do Corvo', distincao: 'cavaleiro-do-corvo', marca: true, deus: null, magica: false,
    preReq: null, custo: null,
    quadro: { titulo: 'A Língua dos Corvos', texto: [
      'Composta por uma combinação de jargões, expressões e gestos, a Língua dos Corvos foi criada para transmitir informações e comandos de forma silenciosa e discreta em qualquer cenário de missão. Você pode gastar uma ação de movimento e 1 PM para transmitir informações para um aliado em alcance curto. Isso funciona como o efeito básico da magia Aviso, mas você não precisa falar (comunica-se por gestos) e o alvo deve ser capaz de vê-lo.',
    ] },
    texto: [
    'Marca da distinção. O treinamento de um Cavaleiro do Corvo é potencialmente letal, mas eficiente.',
    'Você aprende a Língua dos Corvos (veja o quadro) e recebe imunidade a medo. Além disso, perde a habilidade Código de Honra (caso a tenha).',
  ] },
  { id: 'dist-corvo-reconhecimento-e-infiltracao', nome: 'Reconhecimento e Infiltração', grupo: 'distincao', livro: 'herois', pagina: 140,
    tags: 'Cavaleiro do Corvo', distincao: 'cavaleiro-do-corvo', marca: false, deus: null, magica: false,
    preReq: 'treinado em Furtividade e Guerra, proficiência com armaduras pesadas', custo: null, quadro: null, texto: [
    'Para cumprir sua missão, o Corvo deve se mover de forma rápida e silenciosa mesmo equipado.',
    'Seu deslocamento aumenta em +3m, você não sofre penalidade por armadura e a penalidade que você sofre por fazer uma ação chamativa quando usa Furtividade muda para –10.',
  ] },
  { id: 'dist-corvo-a-qualquer-custo', nome: 'A Qualquer Custo', grupo: 'distincao', livro: 'herois', pagina: 140,
    tags: 'Cavaleiro do Corvo', distincao: 'cavaleiro-do-corvo', marca: false, deus: null, magica: false,
    preReq: 'Reconhecimento e Infiltração', custo: null, quadro: null, texto: [
    'Para um Cavaleiro do Corvo, nada é mais importante que o sucesso da missão.',
    'Você pode declarar um determinado objetivo como sua missão. Esse objetivo deve ser algo específico, como “eliminar o dragão da Floresta dos Cem Olhos” ou “resgatar o sacerdote capturado pelos bandidos de estrada”. A preparação para a missão leva 1 dia, exige o gasto de T$ 500 em materiais e serviços (mapas, informantes etc.) e fornece um dos benefícios abaixo. Para cada outros dois poderes da distinção, fornece um benefício adicional diferente. • Busca e Destruição: uma de suas armas se torna uma arma anticriatura contra um tipo a sua escolha. • Guerra Não Convencional: você se torna treinado em duas perícias a sua escolha. • Inteligência Militar: você pode usar Guerra no lugar de duas perícias a sua escolha entre Conhecimento, Intuição, Investigação, Percepção e Sobrevivência. Você só pode ter uma missão de cada vez.',
  ] },
  { id: 'dist-corvo-atras-das-linhas-inimigas', nome: 'Atrás das Linhas Inimigas', grupo: 'distincao', livro: 'herois', pagina: 140,
    tags: 'Cavaleiro do Corvo', distincao: 'cavaleiro-do-corvo', marca: false, deus: null, magica: false,
    preReq: 'Reconhecimento e Infiltração', custo: null, quadro: null, texto: [
    'O Cavaleiro do Corvo aprende a sobreviver em território dominado pelo inimigo.',
    'Você recebe imunidade a atordoamento e cansaço e sua recuperação por descanso nunca é inferior a normal.',
  ] },
  { id: 'dist-corvo-das-trevas', nome: 'Das Trevas', grupo: 'distincao', livro: 'herois', pagina: 141,
    tags: 'Cavaleiro do Corvo', distincao: 'cavaleiro-do-corvo', marca: false, deus: null, magica: false,
    preReq: 'Duelo, Atrás das Linhas Inimigas', custo: null, quadro: null, texto: [
    'Para o Cavaleiro do Corvo, a melhor tática é matar o inimigo antes que ele perceba a morte chegando.',
    'Quando ataca um oponente desprevenido ou que você esteja flanqueando, e que você tenha escolhido como alvo da habilidade Duelo, os bônus dessa habilidade contra esse oponente aumentam em +2.',
  ] },
  { id: 'dist-corvo-ferramenta-de-morte', nome: 'Ferramenta de Morte', grupo: 'distincao', livro: 'herois', pagina: 141,
    tags: 'Cavaleiro do Corvo', distincao: 'cavaleiro-do-corvo', marca: false, deus: null, magica: false,
    preReq: 'A Qualquer Custo, ter liderado um grupo de aventureiros em pelo menos dois combates vitoriosos (liderar = participar do combate apenas auxiliando os aliados)', custo: null, quadro: null, texto: [
    'O Cavaleiro do Corvo aprende a compartilhar seu treinamento com seus aliados.',
    'Você pode gastar uma ação de movimento e uma quantidade de PM a sua escolha (limitada pela sua Inteligência) para coordenar um ataque contra um oponente em alcance curto. Até o início do seu próximo turno, você e seus aliados recebem um bônus igual ao total de PM gastos em testes de ataque e rolagens de dano e na margem de ameaça contra esse oponente. Este poder só pode ser usado uma vez contra a mesma criatura em cada cena.',
  ] },
  { id: 'dist-corvo-tomada-furtiva', nome: 'Postura de Combate: Tomada Furtiva', grupo: 'distincao', livro: 'herois', pagina: 141,
    tags: 'Cavaleiro do Corvo', distincao: 'cavaleiro-do-corvo', marca: false, deus: null, magica: false,
    preReq: 'treinado em Pontaria, Reconhecimento e Infiltração', custo: null, quadro: null, texto: [
    'Cavaleiros do Corvo aprendem a se mover em silêncio, enquanto avançam pelas linhas inimigas.',
    'Você pode realizar a ação mirar como ação livre, não sofre penalidade em testes de Furtividade por se mover ao seu deslocamento normal e recebe +2 em testes de ataque e rolagens de dano com ataques à distância. Esse bônus aumenta em +1 para cada dois outros poderes da distinção.',
  ] },
  { id: 'dist-corvo-trazemos-a-luz', nome: 'Trazemos a Luz', grupo: 'distincao', livro: 'herois', pagina: 141,
    tags: 'Cavaleiro do Corvo', distincao: 'cavaleiro-do-corvo', marca: false, deus: null, magica: false,
    preReq: 'Das Trevas', custo: null, quadro: null, texto: [
    'O Cavaleiro do Corvo une corpo, mente e conhecimento em um conjunto letal.',
    'Uma vez por combate, você pode gastar uma ação de movimento e 3 PM para fazer um teste de Guerra. Você recebe uma quantidade de PV temporários igual ao resultado desse teste e, para cada 10 pontos no resultado, recebe +1 em testes de ataque e rolagens de dano. Além disso, se o resultado for 30 ou mais, você ignora a imunidade a acertos críticos e ataques furtivos de seus inimigos. Esses efeitos duram até o fim da cena.',
  ] },

  //  Cavaleiro Feérico (p. 142–144) — 1 marca + 6 poderes. Guerreiros-
  //  artistas élficos da extinta Ordem Perene. Escalam Arte Élfica (círculo),
  //  Armadura da Floresta (melhorias), Flagelo dos Duyshidakk (+dano) e
  //  Lâminas Feéricas (margem). Só Arma da Floresta é mágica (✦).
  { id: 'dist-feerico-conexao-feerica', nome: 'Conexão Feérica', grupo: 'distincao', livro: 'herois', pagina: 143,
    tags: 'Cavaleiro Feérico', distincao: 'cavaleiro-feerico', marca: true, deus: null, magica: false,
    preReq: null, custo: null, quadro: null, texto: [
    'Marca da distinção. O cavaleiro feérico vive em harmonia com o mundo natural.',
    'Você recebe a habilidade Empatia Selvagem (Tormenta20, p. 21) e +1 PM para cada poder da distinção que possuir.',
  ] },
  { id: 'dist-feerico-arte-elfica', nome: 'Arte Élfica', grupo: 'distincao', livro: 'herois', pagina: 143,
    tags: 'Cavaleiro Feérico', distincao: 'cavaleiro-feerico', marca: false, deus: null, magica: false,
    preReq: 'habilidade de classe Magias, treinado em Atuação e Luta, Foco em Arma (espada longa ou florete)', custo: null, quadro: null, texto: [
    'Cada tinir da espada é um acorde. Cada rugido de batalha é um verso. O esplendor de cada vitória é uma canção.',
    'Uma vez por rodada, quando acerta um ataque com espada longa ou florete, você pode gastar 2 PM para ativar uma Música de bardo ou lançar uma magia arcana com execução de ação de movimento ou padrão como uma ação livre. O círculo máximo de magias que você pode lançar com este poder é limitado pela quantidade de poderes da distinção que possui.',
  ] },
  { id: 'dist-feerico-arma-da-floresta', nome: 'Arma da Floresta', grupo: 'distincao', livro: 'herois', pagina: 143,
    tags: 'Cavaleiro Feérico', distincao: 'cavaleiro-feerico', marca: false, deus: null, magica: true,
    preReq: 'Arte Élfica', custo: null, quadro: null, texto: [
    'Os espíritos da natureza tornam a elegante lâmina do cavaleiro feérico ainda mais letal.',
    'Você pode gastar 1 PM para invocar elementos naturais, como madeira, folhas ou pólen, para cobrir uma espada longa ou florete. O dano da arma é considerado mágico e aumenta em um passo até o fim da cena. Caso você use este poder em uma floresta, o efeito dura 1 dia — ou até você sair dela.',
  ] },
  { id: 'dist-feerico-armadura-da-floresta', nome: 'Armadura da Floresta', grupo: 'distincao', livro: 'herois', pagina: 143,
    tags: 'Cavaleiro Feérico', distincao: 'cavaleiro-feerico', marca: false, deus: null, magica: false,
    preReq: 'Arte Élfica', custo: null, quadro: null, texto: [
    'O tributo do candidato retorna ao cavaleiro na forma da mais magnífica das armaduras.',
    'Você recebe uma armadura completa feita de madeira levíssima, folhas e flores. Essa armadura não reduz seu deslocamento, e com ela você pode somar sua Destreza na Defesa e lançar magias arcanas sem necessidade de testes de Misticismo. A cada dois outros poderes da distinção que você possui, a armadura recebe uma melhoria a sua escolha, cujos pré-requisitos ela cumpra (exceto material especial). Se outra criatura tentar vestir essa armadura, ela murcha e morre em instantes. Se a armadura for destruída, renasce ao seu redor em 1 dia.',
  ] },
  { id: 'dist-feerico-flagelo-dos-duyshidakk', nome: 'Flagelo dos Duyshidakk', grupo: 'distincao', livro: 'herois', pagina: 143,
    tags: 'Cavaleiro Feérico', distincao: 'cavaleiro-feerico', marca: false, deus: null, magica: false,
    preReq: 'Arte Élfica', custo: null, quadro: null, texto: [
    'Dez deles por um dos nossos.',
    'Você soma seu total de poderes da distinção em rolagens de dano contra bandos, enxames e duyshidakk. Além disso, uma vez por rodada, quando reduz um oponente a 0 PV ou menos com um ataque corpo a corpo, você pode gastar 2 PM para percorrer até o seu deslocamento e fazer um ataque corpo a corpo contra outro inimigo.',
  ] },
  { id: 'dist-feerico-laminas-feericas', nome: 'Lâminas Feéricas', grupo: 'distincao', livro: 'herois', pagina: 144,
    tags: 'Cavaleiro Feérico', distincao: 'cavaleiro-feerico', marca: false, deus: null, magica: false,
    preReq: 'Arte Élfica', custo: null, quadro: null, texto: [
    'As tradicionais armas élficas são a base do treinamento de um cavaleiro feérico.',
    'Para você, espadas longas são armas ágeis. Além disso, quando usa uma espada longa ou um florete, você soma o círculo máximo de magias que pode lançar ao dano e aumenta sua margem de ameaça em +1 para cada dois poderes da distinção.',
  ] },
  { id: 'dist-feerico-montaria-feerica', nome: 'Montaria Feérica', grupo: 'distincao', livro: 'herois', pagina: 144,
    tags: 'Cavaleiro Feérico', distincao: 'cavaleiro-feerico', marca: false, deus: null, magica: false,
    preReq: 'treinado em Cavalgar, Arte Élfica', custo: null, quadro: null, texto: [
    'O respeito do cavaleiro feérico pela natureza é recompensado na forma de um aliado leal.',
    'Você recebe um parceiro montaria veterano, escolhido entre cavalo de guerra, trobo ou outra criatura que, a critério do mestre, tenha uma natureza feérica. Caso já possua uma montaria fornecida por outra habilidade, em vez disso essa montaria se torna também um parceiro combatente iniciante. Você recebe +5 em testes de Cavalgar para correr e saltar com sua montaria. Caso perca sua montaria, você pode treinar outra com uma semana de trabalho.',
  ] },

  //  Chapéu-Preto (p. 145–147) — 1 marca + 7 poderes. A maldição da pólvora,
  //  amargurados que dominam o medo. A marca traz o quadro do objeto
  //  amaldiçoado. Escalam Olhos de Chumbo e Rápido ou Morto. Nenhum ✦.
  { id: 'dist-chapeu-esse-maldito-chapeu', nome: 'Esse Maldito Chapéu', grupo: 'distincao', livro: 'herois', pagina: 146,
    tags: 'Chapéu-Preto', distincao: 'chapeu-preto', marca: true, deus: null, magica: false,
    preReq: null, custo: null,
    quadro: { titulo: 'A Maldição do Chapéu Preto', texto: [
      'Todo chapéu-preto possui um objeto que é a marca de sua maldição. Esse objeto está sempre visível em sua pessoa e é imediatamente reconhecível como maligno ou sinistro. Pode ser um colar, uma fivela, um anel, uma arma… Contudo, as histórias de Smokestone geralmente identificam esse objeto como um chapéu de pistoleiro. Assim, seja o que for, é chamado de “chapéu preto”.',
      'O chapéu nunca fica longe do personagem por muito tempo. Se for perdido, roubado ou destruído, surge no corpo do personagem na cena seguinte. Nem mesmo uma magia Purificação é capaz de separar o chapéu do personagem permanentemente. Habilidades como Forma Selvagem e magias como Disfarce Ilusório também não escondem o chapéu preto. Se o personagem puder ser visto, o chapéu preto também poderá.',
      'A critério do mestre, o portador de um chapéu preto pode empreender uma jornada de redenção para se livrar da maldição. Se for bem-sucedido, ele se livra da maldição e do chapéu. Nesse caso, perde a distinção e todos os poderes de chapéu-preto que possui, mas pode usar as regras de treinamento para adquirir outros em seu lugar.',
    ] },
    texto: [
    'Marca da distinção. Você recebe um “chapéu preto”, um item que representa sua maldição (veja o quadro).',
    'Você recebe +2 em Intimidação e na CD dos seus efeitos de medo, mas sofre –2 em Adestramento, Atuação e Diplomacia.',
  ] },
  { id: 'dist-chapeu-coracao-duro', nome: 'Coração Duro', grupo: 'distincao', livro: 'herois', pagina: 146,
    tags: 'Chapéu-Preto', distincao: 'chapeu-preto', marca: false, deus: null, magica: false,
    preReq: 'treinado em Luta ou Pontaria, Presença Aterradora', custo: null, quadro: null, texto: [
    'Não é fácil abalar o chapéu-preto, pois ele próprio já cometeu todo tipo de atrocidades.',
    'Você recebe +2 em rolagens de dano com armas e imunidade a medo (ou +2 em Vontade, se já for imune a medo). Este poder não elimina fobias raciais, como o medo de altura dos minotauros.',
  ] },
  { id: 'dist-chapeu-bala-nas-costas', nome: 'Bala nas Costas', grupo: 'distincao', livro: 'herois', pagina: 146,
    tags: 'Chapéu-Preto', distincao: 'chapeu-preto', marca: false, deus: null, magica: false,
    preReq: 'Coração Duro, dois outros poderes da distinção', custo: null, quadro: null, texto: [
    'Se um chapéu-preto realmente hábil quiser matá-lo, você não ficará sabendo — já estará morto.',
    'Sempre que atacar um oponente pela primeira vez na cena, você pode gastar 1 PM para receber +10 na margem de ameaça desse ataque.',
  ] },
  { id: 'dist-chapeu-congelar-o-inferno', nome: 'Congelar o Inferno', grupo: 'distincao', livro: 'herois', pagina: 146,
    tags: 'Chapéu-Preto', distincao: 'chapeu-preto', marca: false, deus: null, magica: false,
    preReq: 'Coração Duro, dois outros poderes da distinção', custo: null, quadro: null, texto: [
    'Quando surge um bandido realmente assustador, o tempo esfria, o sol empalidece, os animais fogem e até as pedras tremem de medo. Os mais infames chapéus-pretos podem fazer uma estátua baixar os olhos.',
    'Quando usa um efeito de medo, você pode gastar 2 PM para ignorar quaisquer imunidades a medo e efeitos mentais dos alvos.',
  ] },
  { id: 'dist-chapeu-dance', nome: 'Dance!', grupo: 'distincao', livro: 'herois', pagina: 146,
    tags: 'Chapéu-Preto', distincao: 'chapeu-preto', marca: false, deus: null, magica: false,
    preReq: 'Coração Duro', custo: null, quadro: null, texto: [
    'Todos os gestos do chapéu-preto inspiram ameaça.',
    'Quando faz um teste de Intimidação, você pode gastar 2 PM para fazer uma demonstração de habilidade com sua arma como parte desse teste. Se fizer isso, você recebe um bônus em seu teste de Intimidação igual ao atributo-chave de ataque com a arma que está usando.',
  ] },
  { id: 'dist-chapeu-olhos-de-chumbo', nome: 'Olhos de Chumbo', grupo: 'distincao', livro: 'herois', pagina: 146,
    tags: 'Chapéu-Preto', distincao: 'chapeu-preto', marca: false, deus: null, magica: false,
    preReq: 'Coração Duro, ser procurado pelas autoridades por um crime', custo: null, quadro: null, texto: [
    'Quando um chapéu-preto chega à cidade, é melhor fugir. E quando ele olha em seus olhos, você logo precisa de uma calça limpa.',
    'Você projeta uma aura de medo com 9m de raio. Todas as criaturas a sua escolha nessa aura sofrem –2 em rolagens de dano e na Defesa. Essa penalidade aumenta em –1 para cada dois outros poderes da distinção que você possuir. Medo.',
  ] },
  { id: 'dist-chapeu-rapido-ou-morto', nome: 'Rápido ou Morto', grupo: 'distincao', livro: 'herois', pagina: 147,
    tags: 'Chapéu-Preto', distincao: 'chapeu-preto', marca: false, deus: null, magica: false,
    preReq: 'treinado em Iniciativa, Coração Duro', custo: null, quadro: null, texto: [
    'Quanto mais notório o bandido, mais ele precisa estar preparado para matar.',
    'Você recebe +2 em Iniciativa e +3m em seu deslocamento. Esses bônus aumentam respectivamente em +1 e +1,5m para cada dois outros poderes da distinção que você possuir.',
  ] },
  { id: 'dist-chapeu-tiro-a-traicao', nome: 'Tiro à Traição', grupo: 'distincao', livro: 'herois', pagina: 147,
    tags: 'Chapéu-Preto', distincao: 'chapeu-preto', marca: false, deus: null, magica: false,
    preReq: 'Coração Duro, ter feito pelo menos três acertos críticos em alvos desprevenidos', custo: null, quadro: null, texto: [
    'Nunca dê as costas a um chapéu-preto.',
    'O dano de seus ataques com armas contra alvos desprevenidos ou sob alguma condição de medo aumenta em um passo.',
  ] },

  //  Cobaia dos Médicos Monstros (p. 148–150) — 1 marca + 5 poderes.
  //  Clientes do sinistro Grêmio de Vectora que enxertam partes de
  //  monstros. A marca traz o quadro Implantes (regras + 10 implantes,
  //  dois deles mágicos ✦). Escalam Enxerto Experimental (dado sobe um
  //  passo por outro poder) e Corpo Resiliente (limite de implantes).
  //  Nenhum PODER é ✦ (o ✦ mora nos implantes-item do quadro).
  { id: 'dist-cobaia-procedimento-inicial', nome: 'Procedimento Inicial', grupo: 'distincao', livro: 'herois', pagina: 149,
    tags: 'Cobaia dos Médicos Monstros', distincao: 'cobaia-medicos-monstros', marca: true, deus: null, magica: false,
    preReq: null, custo: null,
    quadro: { titulo: 'Implantes', texto: [
      'Implantes são enxertos de partes de outras criaturas que concedem habilidades especiais ao seu receptor. Para receber um implante, é necessário visitar a clínica do Grêmio dos Médicos Monstros e se submeter à cirurgia apropriada. Além, é claro, de pagar o preço do implante (que inclui o custo da cirurgia). Alguns aventureiros preferem levar suas próprias partes de criaturas para serem implantadas. Nesse caso, o preço é reduzido pela metade.',
      'A cirurgia de enxerto demora um dia. Já a recuperação é um teste estendido de Fortitude (CD 25, 3 sucessos), em que cada teste representa um dia. Em uma falha total, o corpo rejeita o implante, que deve ser removido (o que o destrói) ou levará à morte do paciente.',
      'Implantes conferem uma aparência monstruosa e desconcertante, e podem fragilizar a saúde do paciente. Para cada implante, você sofre uma penalidade de –2 em Adestramento, Diplomacia e Fortitude. O máximo de implantes que você pode receber é igual à sua Constituição (mínimo 1). Implantes contam como poderes para todos os efeitos.',
      'Asas. Asas monstruosas de tamanho correspondente ao paciente. Você pode voar com deslocamento igual ao seu deslocamento base mas, enquanto estiver voando dessa forma, fica vulnerável. Preço T$ 20.000. — Braço de Ogro. Um enorme braço pertencente a uma criatura humanoide maior que o paciente. Você recebe +2 em Força e, com este braço, seu alcance natural aumenta em +1,5m. Este implante substitui um dos braços do paciente. Preço T$ 36.000. — Cauda com Ferrão. Você recebe uma arma natural de ferrão (dano 1d6, crítico x2, perfuração). Uma vez por rodada, quando usa a ação agredir para atacar com outra arma, pode gastar 1 PM para fazer um ataque corpo a corpo extra com o ferrão. Quando causa dano com ele, você pode gastar 1 PM para inocular veneno na vítima, que perde 1d12 PV. Preço T$ 27.000. — Escamas. Extraídas de vários monstros, formam uma armadura leve e poderosa. Fornecem +2 na Defesa. É possível enxertar este implante uma segunda vez, para aumentar o bônus na Defesa para +5. Preço T$ 12.000. — Garras. Suas mãos se transformam em armas naturais de garra (dano 1d6 cada, crítico x2, corte). Uma vez por rodada, quando usa a ação agredir para atacar com uma arma, você pode gastar 1 PM para fazer um ataque corpo a corpo extra com uma das garras, desde que ela esteja livre e não tenha sido usada para atacar nesse turno. Como alternativa, se tiver habilidades que exijam uma arma secundária (como Estilo de Duas Armas), você pode usá-las com suas garras. Preço T$ 27.000.',
      'Olho Anulador (✦ mágico). Extraído de tiranos oculares e implantado no peito do paciente, este olho projeta um campo antimagia. Você pode lançar Dissipar Magia, mas apenas em um cone de 9m e usando Vontade no lugar do teste de Misticismo. Preço T$ 30.000. — Olho Desintegrador (✦ mágico). Também retirado de um tirano ocular, este olho monstruoso fica na ponta de uma haste carnosa, em geral implantada nas costas do paciente. Você pode lançar a magia Desintegrar (atributo-chave Constituição). Preço T$ 50.000. — Olho Petrificante. Um olho amarelo reptiliano, extraído de um basilisco. Você recebe a habilidade Olhar Atordoante (Tormenta20, p. 29). Caso já tenha essa habilidade, a CD para resistir a ela aumenta em +2. Preço T$ 18.000. — Patas de Aranha. Extraídos de uma aranha gigante, estes dois pares de patas são implantados no tronco. Não servem para atacar, mas fornecem deslocamento de escalada igual ao seu deslocamento base. Se já tiver um deslocamento de escalada, ele aumenta em +6m. Preço T$ 12.000. — Tentáculo com Garras. Extraído de monstros como otyughs e tigres-de-Hyninn, fornece uma arma natural de tentáculo (dano 1d4, crítico x2, impacto) com a qual seu alcance natural aumenta em +1,5m. Uma vez por rodada, quando usa a ação agredir para atacar com outra arma, você pode gastar 1 PM para fazer um ataque corpo a corpo extra com o tentáculo. Preço T$ 27.000.',
    ] },
    texto: [
    'Marca da distinção. A cobaia se entrega de corpo, literalmente, à ciência dos Médicos Monstros.',
    'Você se torna um monstro em adição ao seu tipo. Além disso, a penalidade em perícias que sofre por receber implantes diminui de –2 por implante para –1 (veja o quadro) e você paga 20% a menos pelos implantes enxertados em seu corpo.',
  ] },
  { id: 'dist-cobaia-enxerto-experimental', nome: 'Enxerto Experimental', grupo: 'distincao', livro: 'herois', pagina: 149,
    tags: 'Cobaia dos Médicos Monstros', distincao: 'cobaia-medicos-monstros', marca: false, deus: null, magica: false,
    preReq: 'Foco em Perícia (Fortitude)', custo: null, quadro: null, texto: [
    'Em busca de aperfeiçoamento, a cobaia se submete a procedimentos altamente experimentais.',
    'Você recebe um implante de até T$ 18.000. Ele não conta em seu limite de implantes, mas foi enxertado de forma experimental. No início de cada cena, role 1d4. Em um resultado 1, o implante não funciona nessa cena. Para cada outro poder da distinção, esse dado aumenta em um passo.',
  ] },
  { id: 'dist-cobaia-corpo-resiliente', nome: 'Corpo Resiliente', grupo: 'distincao', livro: 'herois', pagina: 149,
    tags: 'Cobaia dos Médicos Monstros', distincao: 'cobaia-medicos-monstros', marca: false, deus: null, magica: false,
    preReq: 'Enxerto Experimental', custo: null, quadro: null, texto: [
    'Sucessivas cirurgias resultaram em um fortalecimento inesperado do organismo da cobaia.',
    'Você não sofre a penalidade em Fortitude por implantes e seu limite de implantes aumenta em +1, +1 para cada dois outros poderes da distinção.',
  ] },
  { id: 'dist-cobaia-extrapolar-o-proprio-corpo', nome: 'Extrapolar o próprio Corpo', grupo: 'distincao', livro: 'herois', pagina: 149,
    tags: 'Cobaia dos Médicos Monstros', distincao: 'cobaia-medicos-monstros', marca: false, deus: null, magica: false,
    preReq: 'Implante Exclusivo', custo: null, quadro: null, texto: [
    'Implantes convencionais extraídos de monstros não satisfazem mais a sede de alterações da cobaia.',
    'Escolha um poder racial (p. 84) cujos pré-requisitos você cumpra (ignorando requisitos de raça) e que seja aprovado pelo mestre. Você recebe um implante que fornece o benefício do poder escolhido.',
  ] },
  { id: 'dist-cobaia-glandula-de-infusao', nome: 'Glândula de Infusão', grupo: 'distincao', livro: 'herois', pagina: 149,
    tags: 'Cobaia dos Médicos Monstros', distincao: 'cobaia-medicos-monstros', marca: false, deus: null, magica: false,
    preReq: 'Enxerto Experimental', custo: null, quadro: null, texto: [
    'Como um verdadeiro experimento, a cobaia recebe a vanguarda dos procedimentos do Grêmio.',
    'Escolha uma magia de até 2º círculo com alvo você ou 1 criatura. Você recebe um implante que permite lançar essa magia seguindo as regras de engenhocas (Tormenta20, p. 70), mas você usa Constituição e Fortitude respectivamente no lugar de Inteligência e Ofício (engenhoqueiro) e só pode ter você como alvo. Este é um efeito orgânico e não é afetado por efeitos que afetem especificamente engenhocas.',
  ] },
  { id: 'dist-cobaia-implante-exclusivo', nome: 'Implante Exclusivo', grupo: 'distincao', livro: 'herois', pagina: 149,
    tags: 'Cobaia dos Médicos Monstros', distincao: 'cobaia-medicos-monstros', marca: false, deus: null, magica: false,
    preReq: 'Enxerto Experimental', custo: null, quadro: null, texto: [
    'Uma cobaia tem acesso a serviços exclusivos, reservados apenas aos melhores clientes do Grêmio.',
    'Escolha um encanto de armas sem nenhum pré-requisito. Você pode gastar uma ação de movimento e 1 PM para colocar esse encanto em uma arma que esteja empunhando. Ele não conta no limite de encantos da arma, e termina se você soltar o item ou no fim da cena.',
  ] },

  //  Dracomante Real (p. 150–152) — 1 marca + 5 poderes. Magos que
  //  estudam um Dragão-Real para roubar seus segredos e se tornar como
  //  ele. A marca escolhe o mestre (e a essência elemental). Escalam
  //  Afinidade Dracônica (redução 3 por poder) e Memória Dracônica
  //  (magias memorizadas = total de poderes). ✦: Majestade Elemental
  //  e Verdadeiro Poder.
  { id: 'dist-dracomante-mestre-draconico', nome: 'Mestre Dracônico', grupo: 'distincao', livro: 'herois', pagina: 152,
    tags: 'Dracomante Real', distincao: 'dracomante-real', marca: true, deus: null, magica: false,
    preReq: null, custo: null, quadro: null, texto: [
    'Marca da distinção. Um dracomante real não serve, ele almeja.',
    'Escolha um Dragão-Real para ser seu mestre, entre Behluga (escolha entre frio ou luz), Benthos (ácido), Hydora (eletricidade), Mzzileyn (trevas), Sckhar (fogo), Tarso (trevas) e Zadbblein (veneno). Uma vez feita, essa escolha não pode ser mudada. Quando você lança uma magia de dano ou perda de PV do mesmo tipo da essência de seu mestre, ela causa +2 pontos de dano ou perda de PV.',
  ] },
  { id: 'dist-dracomante-afinidade-draconica', nome: 'Afinidade Dracônica', grupo: 'distincao', livro: 'herois', pagina: 152,
    tags: 'Dracomante Real', distincao: 'dracomante-real', marca: false, deus: null, magica: false,
    preReq: '5º nível de Mago', custo: null, quadro: null, texto: [
    'O primeiro passo de um dracomante real é dominar o elemento regido por seu mestre.',
    'Você recebe +2 na CD de suas magias que causam dano do tipo da essência dracônica do seu mestre e, para cada poder da distinção, recebe redução 3 contra esse tipo de dano.',
  ] },
  { id: 'dist-dracomante-dracomancia', nome: 'Dracomancia', grupo: 'distincao', livro: 'herois', pagina: 152,
    tags: 'Dracomante Real', distincao: 'dracomante-real', marca: false, deus: null, magica: false,
    preReq: 'Afinidade Dracônica', custo: null, quadro: null, texto: [
    'Ao usar seu poder, o dracomante real se aproxima da forma de seu mestre.',
    'Quando lança uma magia, você recebe redução de dano 5 e resistência a magia +5 até o início de seu próximo turno.',
  ] },
  { id: 'dist-dracomante-majestade-elemental', nome: 'Majestade Elemental', grupo: 'distincao', livro: 'herois', pagina: 152,
    tags: 'Dracomante Real', distincao: 'dracomante-real', marca: false, deus: null, magica: true,
    preReq: 'lançar magias arcanas de 3º círculo, Dracomancia', custo: null, quadro: null, texto: [
    'Assim como a fúria de um Dragão-Real, o poder do dracomante não pode ser detido.',
    'Suas magias que causam dano do mesmo tipo da essência dracônica do seu mestre ignoram até 20 pontos de RD e, contra criaturas imunes, ainda causam metade do dano.',
  ] },
  { id: 'dist-dracomante-verdadeiro-poder', nome: 'Verdadeiro Poder', grupo: 'distincao', livro: 'herois', pagina: 152,
    tags: 'Dracomante Real', distincao: 'dracomante-real', marca: false, deus: null, magica: true,
    preReq: 'lançar magias arcanas de 4º círculo, quatro poderes da distinção', custo: null, quadro: null, texto: [
    'O ápice do poder dracônico é se tornar um dragão.',
    'Você aprende e pode lançar Metamorfose e, enquanto estiver sob efeito dessa magia, pode lançar magias normalmente. Alternativamente, se tiver o suplemento Ameaças de Arton, em vez disso aprende e pode lançar Transformação em Dragão (p. 405) e não precisa de componente material para se transformar em um dragão do tipo da essência dracônica de seu mestre. Se você aprender a magia fornecida por este poder novamente, seu custo diminui em –1 PM.',
  ] },
  { id: 'dist-dracomante-memoria-draconica', nome: 'Memória Dracônica', grupo: 'distincao', livro: 'herois', pagina: 152,
    tags: 'Dracomante Real', distincao: 'dracomante-real', marca: false, deus: null, magica: false,
    preReq: 'Dracomancia', custo: null, quadro: null, texto: [
    'Assim como um verdadeiro dragão, o dracomante usa seu elemento de forma natural e instintiva.',
    'Você pode memorizar um número de magias adicionais por dia igual ao total de poderes da distinção que possui, mas só pode memorizar dessa forma magias que causam dano do mesmo tipo que a essência dracônica de seu mestre.',
  ] },

  //  Drogadora (p. 153–156) — 1 marca + 5 poderes. Curandeiras dos povos-
  //  trovão que usam o próprio corpo como laboratório. O quadro Receitas
  //  da Drogadora fica em Remédios da Floresta (o poder que as concede).
  //  Escalam quatro poderes (Curandeira Exímia, Aspersão Curativa,
  //  Laboratório Natural, Perfume Intoxicante) + as receitas de Remédios
  //  da Floresta. Nenhum ✦.
  { id: 'dist-drogadora-tradicao-da-cura', nome: 'Tradição da Cura', grupo: 'distincao', livro: 'herois', pagina: 155,
    tags: 'Drogadora', distincao: 'drogadora', marca: true, deus: null, magica: false,
    preReq: null, custo: null, quadro: null, texto: [
    'Marca da distinção. Para uma drogadora, o preparo de remédios e poções é um ato instintivo e natural.',
    'Você pode usar Sabedoria como atributo-chave de Ofício (alquimista) em vez de Inteligência. Se já faz isso por outro efeito, em vez disso recebe +2 nessa perícia.',
  ] },
  { id: 'dist-drogadora-curandeira-exima', nome: 'Curandeira Exímia', grupo: 'distincao', livro: 'herois', pagina: 155,
    tags: 'Drogadora', distincao: 'drogadora', marca: false, deus: null, magica: false,
    preReq: 'treinada em Cura e Ofício (alquimista), Vitalidade', custo: null, quadro: null, texto: [
    'A drogadora aprende técnicas curativas que usam seu próprio corpo para fortalecer remédios.',
    'Seu corpo conta como uma maleta de medicamentos e instrumentos de Ofício (alquimista) e fornece um bônus nessas perícias igual ao total de poderes da distinção que você possui. Além disso, quando usa um preparado de cura que você mesma tenha fabricado, você soma sua Constituição no total de pontos de vida recuperados pelo item.',
  ] },
  { id: 'dist-drogadora-aspersao-curativa', nome: 'Aspersão Curativa', grupo: 'distincao', livro: 'herois', pagina: 155,
    tags: 'Drogadora', distincao: 'drogadora', marca: false, deus: null, magica: false,
    preReq: 'Curandeira Exímia', custo: null, quadro: null, texto: [
    'As emanações corporais da drogadora atuam como medicamentos poderosos sob seu controle.',
    'Você pode gastar uma ação padrão e 3 PV (que não podem ser temporários) para secretar um líquido curativo sobre outra criatura adjacente. A criatura cura 3d6+3 pontos de vida ou uma de suas condições entre abalado, apavorado, alquebrado, atordoado, cego, confuso, debilitado, enjoado, envenenado, esmorecido, exausto, fascinado, fatigado, fraco, frustrado, lento, ofuscado, paralisado, pasmo ou surdo. Para cada outros dois poderes da distinção, você pode gastar mais 3 PV quando usa este poder para curar mais 3d6+3 PV ou mais uma condição (em qualquer combinação de efeitos). Pontos de vida gastos dessa forma só podem ser recuperados com descanso.',
  ] },
  { id: 'dist-drogadora-laboratorio-natural', nome: 'Laboratório Natural', grupo: 'distincao', livro: 'herois', pagina: 155,
    tags: 'Drogadora', distincao: 'drogadora', marca: false, deus: null, magica: false,
    preReq: 'Remédios da Floresta', custo: null, quadro: null, texto: [
    'O corpo da drogadora se torna um laboratório natural, capaz de converter ingredientes em fórmulas como um processo biológico.',
    'Um número de vezes por dia igual ao seu número de poderes da distinção, você pode fazer um teste de Ofício (alquimista) para fabricar um item alquímico ou uma poção, sem gastar tempo (mas você ainda gasta as matérias-primas).',
  ] },
  { id: 'dist-drogadora-perfume-intoxicante', nome: 'Perfume Intoxicante', grupo: 'distincao', livro: 'herois', pagina: 155,
    tags: 'Drogadora', distincao: 'drogadora', marca: false, deus: null, magica: false,
    preReq: 'Curandeira Exímia', custo: null, quadro: null, texto: [
    'A drogadora aprende a metabolizar feromônios em seu corpo, capazes de marcar perigos e preparar seus aliados contra eles.',
    'Você recebe +2 em Adestramento e Diplomacia e, quando você sofre um ataque corpo a corpo (sendo acertada ou não), o atacante é marcado por seus feromônios até o fim da cena. Você e seus aliados ignoram a camuflagem de criaturas marcadas dessa forma e recebem +2 em testes de ataque corpo a corpo ou à distância em alcance curto contra elas. Para cada dois outros poderes da distinção, todos os bônus fornecidos por este poder aumentam em +1.',
  ] },
  { id: 'dist-drogadora-remedios-da-floresta', nome: 'Remédios da Floresta', grupo: 'distincao', livro: 'herois', pagina: 156,
    tags: 'Drogadora', distincao: 'drogadora', marca: false, deus: null, magica: false,
    preReq: 'Curandeira Exímia', custo: null,
    quadro: { titulo: 'Receitas da Drogadora', texto: [
      'Quando adquire o poder Remédios da Floresta, você aprende suas primeiras receitas. Uma receita é uma magia divina ou arcana que pode ser usada para fabricar poções com esse poder. Você começa com uma quantidade de receitas de 1º círculo igual à sua Sabedoria. Para cada poder da distinção, você aprende uma receita adicional, que pode ser de até 2º círculo. Suas receitas são aprendidas como parte da tradição oral das drogadoras e não dependem de um livro ou outra forma de registro.',
    ] },
    texto: [
    'A drogadora aprende a empregar seu próprio corpo para produzir poções mágicas.',
    'Você aprende suas primeiras receitas de drogadora (veja o quadro) e pode gastar uma ação padrão para fabricar uma poção com essas receitas instantaneamente. Você não paga seu custo em tibares, mas gasta uma quantidade de PV (que não podem ser temporários) igual ao custo em PM da magia, e a poção só dura até o fim da cena. Pontos de vida perdidos dessa forma só podem ser recuperados por descanso.',
  ] },

  //  Engenhoqueiro Goblin (p. 156–159) — 1 marca + 5 poderes. Inventores
  //  goblins que trocam segurança por potência: suas engenhocas explodem.
  //  A marca já traz a regra da explosão. Escalam Aprimorar Bugiganga
  //  (gambiarras por engenhoca; traz o quadro Gambiarras), Autodestruição
  //  (PM na explosão) e Manutenção Precária (1d3 + engenhocas). Nenhum ✦.
  { id: 'dist-engenhoqueiro-engenhocaria-goblinoide', nome: 'Engenhocaria Goblinoide', grupo: 'distincao', livro: 'herois', pagina: 157,
    tags: 'Engenhoqueiro Goblin', distincao: 'engenhoqueiro-goblin', marca: true, deus: null, magica: false,
    preReq: null, custo: null, quadro: null, texto: [
    'Marca da distinção. Um bom engenhoqueiro aprende a tirar bobagens como segurança do caminho de seu ofício.',
    'Você gasta 1 dia e metade do custo em tibares para fabricar uma engenhoca. Entretanto, você nunca pode escolher 0, 10 ou 20 para ativar uma engenhoca e, se falhar no teste de ativação por 5 ou mais (ou se rolar 1 no dado), a engenhoca explode e causa 2d6 pontos de dano de impacto por círculo da magia em você e todas as criaturas a até 3m (Reflexos CD da engenhoca reduz à metade).',
  ] },
  { id: 'dist-engenhoqueiro-aprimorar-bugiganga', nome: 'Aprimorar Bugiganga', grupo: 'distincao', livro: 'herois', pagina: 158,
    tags: 'Engenhoqueiro Goblin', distincao: 'engenhoqueiro-goblin', marca: false, deus: null, magica: false,
    preReq: 'Engenhoqueiro, Vitalidade', custo: null,
    quadro: { titulo: 'Gambiarras', texto: [
      'Bateria Potente. A CD para resistir à engenhoca aumenta em +1d4.',
      'Bobina Poderosa. Aumenta os dados de cura ou de dano da engenhoca em um passo (até um máximo de d12).',
      'Cristal Canalizador. Aumenta o limite de PM que você pode gastar em aprimoramentos da engenhoca em +1d4.',
      'Etiqueta de Instruções. A CD do teste para ativar a engenhoca diminui em –1d10.',
      'Luneta Aproximadora. Aumenta o alcance da engenhoca em 1d3 –1 passos (de curto para médio, de médio para longo).',
    ] },
    texto: [
    'Aceitando uma explosão ocasional, o engenhoqueiro fica livre para tentar criações ainda “melhores”.',
    'Você pode gastar 1 hora de trabalho e T$ 100 para instalar uma das gambiarras a seguir (veja o quadro) em uma de suas engenhocas. Cada engenhoca pode ter uma gambiarra para cada poder da distinção que você possui. Por sua natureza experimental, cada gambiarra aumenta o valor de falha automática da engenhoca em 1 (uma engenhoca com duas gambiarras falha automaticamente se você rolar 1, 2 ou 3 no teste de ativação). Gambiarras iguais não se acumulam, mas seus efeitos se acumulam com os de aparatos (veja p. 235). O efeito de cada gambiarra é rolado a cada uso da engenhoca.',
  ] },
  { id: 'dist-engenhoqueiro-abandonar-geringonca', nome: 'Abandonar Geringonça', grupo: 'distincao', livro: 'herois', pagina: 158,
    tags: 'Engenhoqueiro Goblin', distincao: 'engenhoqueiro-goblin', marca: false, deus: null, magica: false,
    preReq: 'Aprimorar Bugiganga, deve ter sofrido dano de uma de suas engenhocas que falhou em ativar pelo menos uma vez', custo: null, quadro: null, texto: [
    'Acostumado a ver seus inventos explodindo, o engenhoqueiro goblin sabe reconhecer os sinais de mau funcionamento e pular fora na hora certa.',
    'Quando falha na ativação de uma engenhoca por 5 ou mais (ou rola uma falha automática), você pode gastar 1 PM para arremessar a engenhoca em um ponto em alcance curto antes que ela exploda.',
  ] },
  { id: 'dist-engenhoqueiro-autodestruicao', nome: 'Autodestruição', grupo: 'distincao', livro: 'herois', pagina: 158,
    tags: 'Engenhoqueiro Goblin', distincao: 'engenhoqueiro-goblin', marca: false, deus: null, magica: false,
    preReq: 'Abandonar Geringonça', custo: null, quadro: null, texto: [
    'O engenhoqueiro conhece muito bem a dor de uma explosão na cara. E está mais do que disposto a compartilhar esse conhecimento.',
    'Você pode gastar uma ação completa e uma quantidade de PM limitada pelo total de poderes da distinção que possui para forçar uma falha crítica em uma engenhoca (veja Engenhocaria Goblinoide) e arremessá-la em um ponto em alcance curto para que exploda. A explosão atinge uma esfera com 1d4 x 1,5m de raio e seu dano aumenta em +2d6 pontos por PM gasto.',
  ] },
  { id: 'dist-engenhoqueiro-enjambracao', nome: 'Enjambração', grupo: 'distincao', livro: 'herois', pagina: 158,
    tags: 'Engenhoqueiro Goblin', distincao: 'engenhoqueiro-goblin', marca: false, deus: null, magica: false,
    preReq: 'Aprimorar Bugiganga, outro poder da distinção', custo: null, quadro: null, texto: [
    'Um engenhoqueiro precavido sempre tem a ferramenta certa. Já um engenhoqueiro goblin improvisa.',
    'Você pode gastar uma ação completa para fabricar uma engenhoca com uma magia qualquer de até um círculo abaixo do círculo máximo de engenhocas que você pode fabricar. Você não gasta tibares para fabricar essa engenhoca, mas gasta os PM da magia para ativá-la (mesmo se falhar no teste de ativação). A engenhoca não conta em seu limite, dura até o fim da cena e sua chance de falha automática aumenta em +1d6.',
  ] },
  { id: 'dist-engenhoqueiro-manutencao-precaria', nome: 'Manutenção Precária', grupo: 'distincao', livro: 'herois', pagina: 158,
    tags: 'Engenhoqueiro Goblin', distincao: 'engenhoqueiro-goblin', marca: false, deus: null, magica: false,
    preReq: 'Aprimorar Bugiganga', custo: null, quadro: null, texto: [
    'Se algo se move e não devia, basta amarrar. Se não se move e devia, é só passar óleo.',
    'Você pode usar um tempo entre aventuras (Tormenta20, p. 276) para fabricar um número de engenhocas igual a 1d3 + o número de poderes da distinção que você possui. Você precisa pagar os custos normais e fazer os testes normais para fabricá-las. Essas engenhocas não contam no seu limite de engenhocas e deixam de funcionar no fim da próxima aventura.',
  ] },

  //  Escapista Magnífico (p. 159–162) — 1 marca + 5 poderes. Espiões
  //  supremos treinados pela Guilda sem Nome, mestres de passar
  //  despercebidos. Escalam Aparência Insignificante (+CD do poder
  //  Aparência Inofensiva) e Peguei um Bobo (CD do Comando simulado).
  //  Nenhum ✦ (Peguei um Bobo é magia SIMULADA, não mágica).
  { id: 'dist-escapista-vantagem-secreta', nome: 'Vantagem Secreta', grupo: 'distincao', livro: 'herois', pagina: 161,
    tags: 'Escapista Magnífico', distincao: 'escapista-magnifico', marca: true, deus: null, magica: false,
    preReq: null, custo: null, quadro: null, texto: [
    'Marca da distinção. O escapista transforma seus próprios defeitos em armas.',
    'Escolha uma de suas fontes de penalidades (como uma habilidade racial, um poder da Tormenta ou uma complicação). Você não sofre as penalidades da fonte escolhida.',
  ] },
  { id: 'dist-escapista-nao-ha-ninguem-aqui', nome: 'Não Há Ninguém Aqui', grupo: 'distincao', livro: 'herois', pagina: 161,
    tags: 'Escapista Magnífico', distincao: 'escapista-magnifico', marca: false, deus: null, magica: false,
    preReq: 'Aparência Inofensiva, Escapista', custo: null, quadro: null, texto: [
    'Até mesmo os inimigos do escapista esquecem que ele existe.',
    'Você pode gastar 2 PM para se esconder mesmo sem camuflagem ou cobertura disponível. Se tiver o poder Camuflagem, além disso a penalidade em Furtividade para se esconder quando realiza uma ação chamativa é reduzida à metade (aplicado depois de outras reduções).',
  ] },
  { id: 'dist-escapista-aparencia-insignificante', nome: 'Aparência Insignificante', grupo: 'distincao', livro: 'herois', pagina: 161,
    tags: 'Escapista Magnífico', distincao: 'escapista-magnifico', marca: false, deus: null, magica: false,
    preReq: 'Não Há Ninguém Aqui', custo: null, quadro: null, texto: [
    '“Eu queria atacar o escapista, mas só estou vendo esse garotinho...”',
    'Você soma seu total de poderes da distinção na CD para resistir ao seu poder Aparência Inofensiva. Além disso, a cada cena, pode usar esse poder uma vez contra cada inimigo (em vez de apenas uma vez).',
  ] },
  { id: 'dist-escapista-fujao', nome: 'Fujão', grupo: 'distincao', livro: 'herois', pagina: 161,
    tags: 'Escapista Magnífico', distincao: 'escapista-magnifico', marca: false, deus: null, magica: false,
    preReq: 'treinado em Acrobacia, Não Há Ninguém Aqui', custo: null, quadro: null, texto: [
    'A maior proeza de um escapista é nunca estar onde seus inimigos esperam.',
    'Quando é atingido por um ataque ou um efeito que exija um teste de resistência, você pode gastar 2 PM para fazer uma pirueta defensiva. Faça um teste de Acrobacia para escapar e use esse resultado no lugar de sua Defesa contra esse ataque, ou do teste de resistência contra o efeito.',
  ] },
  { id: 'dist-escapista-mao-leve', nome: 'Mão Leve', grupo: 'distincao', livro: 'herois', pagina: 161,
    tags: 'Escapista Magnífico', distincao: 'escapista-magnifico', marca: false, deus: null, magica: false,
    preReq: 'Não Há Ninguém Aqui', custo: null, quadro: null, texto: [
    'Um escapista afana até mesmo itens nas mãos de seus oponentes!',
    'Quando faz a manobra desarmar, você pode gastar 2 PM para substituir o teste de Luta por Ladinagem. Se vencer o teste de manobra e estiver com ao menos uma mão livre, pode ficar com o item na mão.',
  ] },
  { id: 'dist-escapista-peguei-um-bobo', nome: 'Peguei um Bobo', grupo: 'distincao', livro: 'herois', pagina: 161,
    tags: 'Escapista Magnífico', distincao: 'escapista-magnifico', marca: false, deus: null, magica: false,
    preReq: 'Aparência Insignificante', custo: null, quadro: null, texto: [
    'Os inimigos do escapista ficam tão confusos e enervados que acabam agindo como ele quer.',
    'Você pode gastar uma ação padrão e 2 PM para gerar o efeito da magia Comando (CD Car, +1 para cada dois outros poderes da distinção), ignorando a restrição de tipo de criatura. Este não é um efeito de encantamento ou mental, nem uma habilidade mágica, e provém da sua capacidade de enganar outras pessoas (veja “Magias Simuladas”, p. 44).',
  ] },

  //  Gigante Furioso (p. 162–165) — 1 marca + 5 poderes. Humanoides que
  //  devoram o coração de gigantes para crescer em fúria. Escala só a
  //  Fúria dos Gigantes (categorias de tamanho, e é ✦). Os demais crescem
  //  com o TAMANHO, não com o nº de poderes — ficam no texto.
  { id: 'dist-gigante-desprezar-os-pequenos', nome: 'Desprezar os Pequenos', grupo: 'distincao', livro: 'herois', pagina: 164,
    tags: 'Gigante Furioso', distincao: 'gigante-furioso', marca: true, deus: null, magica: false,
    preReq: null, custo: null, quadro: null, texto: [
    'Marca da distinção. Ao passar pelo ritual de transformação, o gigante furioso adquire uma resistência sobrenatural contra seres menores.',
    'Contra atacantes menores que você, você recebe redução de dano 2 por categoria de tamanho de diferença entre os dois (por exemplo, se for Enorme, você recebe RD 6 contra ataques de criaturas Pequenas).',
  ] },
  { id: 'dist-gigante-furia-dos-gigantes', nome: 'Fúria dos Gigantes', grupo: 'distincao', livro: 'herois', pagina: 164,
    tags: 'Gigante Furioso', distincao: 'gigante-furioso', marca: false, deus: null, magica: true,
    preReq: 'Con 3, treinado em Fortitude, Fúria', custo: null, quadro: null, texto: [
    'O gigante transcende a simples fúria mental e passa a encarnar o desejo de destruição em seu corpo, tornando-se um avatar da ira.',
    'Quando entra em fúria, você pode gastar 2 PM para aumentar seu tamanho em uma categoria; isso aumenta sua Força em +2 e faz com que seu equipamento aumente para o tamanho adequado. O aumento de tamanho dura até sua fúria terminar. Para cada dois outros poderes da distinção, você pode gastar +2 PM para aumentar seu tamanho em uma categoria adicional, aumentando o bônus na Força em +2. Seu tamanho com este poder nunca pode ser maior que o da maior criatura que você já matou.',
  ] },
  { id: 'dist-gigante-arremesso-de-rochas', nome: 'Arremesso de Rochas', grupo: 'distincao', livro: 'herois', pagina: 164,
    tags: 'Gigante Furioso', distincao: 'gigante-furioso', marca: false, deus: null, magica: false,
    preReq: 'Fúria dos Gigantes', custo: null, quadro: null, texto: [
    'Qualquer oponente que tente correr de um gigante furioso descobrirá rapidamente que eles são letais a qualquer distância.',
    'Enquanto estiver em fúria, você pode gastar uma ação de movimento e 1 PM para arrancar uma rocha do chão e arremessá-la contra seus oponentes. Trate essa rocha como uma arma de arremesso com alcance médio (dano 1d12 impacto, crítico x2) que atinge todas as criaturas em um quadrado com 4,5m de lado. Para atacar com a rocha, faça um ataque à distância e compare-o com a Defesa de cada criatura na área. Então faça uma única rolagem de dano e aplique-a em cada inimigo atingido. Para cada categoria de tamanho que você tiver acima de Médio, o dano da rocha aumenta em +1d12.',
  ] },
  { id: 'dist-gigante-golpes-pesados', nome: 'Golpes Pesados', grupo: 'distincao', livro: 'herois', pagina: 164,
    tags: 'Gigante Furioso', distincao: 'gigante-furioso', marca: false, deus: null, magica: false,
    preReq: 'Fúria dos Gigantes', custo: null, quadro: null, texto: [
    'O tamanho e o volume do gigante são tão grandes que seus oponentes mal conseguem aguentar parados!',
    'Quando faz um ataque corpo a corpo em fúria, você pode gastar 1 PM. Se fizer isso e acertar o ataque, além do dano você faz uma manobra empurrar contra o alvo como uma ação livre (use o resultado do ataque como o teste de manobra). Se houver uma parede ou outro objeto sólido (não uma criatura) no caminho do alvo, ele sofre 1d12 pontos de dano de impacto para cada 3m que for empurrado. Se você possuir o poder Ataque Pesado e usá-lo nesse ataque para empurrar, você executa uma única manobra, mas recebe +5 no teste de manobra.',
  ] },
  { id: 'dist-gigante-salto-tectonico', nome: 'Salto Tectônico', grupo: 'distincao', livro: 'herois', pagina: 164,
    tags: 'Gigante Furioso', distincao: 'gigante-furioso', marca: false, deus: null, magica: false,
    preReq: 'treinamento em Atletismo, Terremoto da Fúria', custo: null, quadro: null, texto: [
    'Os saltos poderosos do gigante desencadeiam terremotos onde ele cai.',
    'Quando usa Terremoto da Fúria, como parte da ação para usar esse poder você pode saltar, aterrissando em um ponto qualquer em alcance médio e desencadeando uma onda de choque que fortalece o terremoto. Faça um teste de Atletismo (CD 10). Se passar, você aumenta o raio do terremoto em +3m e seu dano em +2d12. Além disso, para cada 10 pontos em que o resultado superar a CD, o raio do terremoto aumenta em +3m.',
  ] },
  { id: 'dist-gigante-terremoto-da-furia', nome: 'Terremoto da Fúria', grupo: 'distincao', livro: 'herois', pagina: 165,
    tags: 'Gigante Furioso', distincao: 'gigante-furioso', marca: false, deus: null, magica: false,
    preReq: 'Fúria dos Gigantes', custo: null, quadro: null, texto: [
    'O tamanho do gigante furioso é capaz de abalar o próprio terreno onde ele pisa.',
    'Quando está em fúria, você pode gastar uma ação de movimento e 3 PM para pisotear o chão, gerando uma onda de choque em um raio de 9m ao seu redor. Criaturas na área sofrem dano de impacto igual a 1d12 + sua Força e ficam caídas (Fort CD For reduz à metade e evita a condição). Para cada categoria de tamanho acima de Médio que você tiver, o dano aumenta em +1d12.',
  ] },

  //  Ginete de Namalkah (p. 165–168) — 1 marca + 5 poderes. Cavaleiros
  //  do reino dos ventos e seu "irmão cavalo". A marca traz o quadro
  //  Irmão Cavalo. NÃO há escala pelo motor: os poderes crescem com o
  //  NÍVEL do parceiro montaria, não com o nº de poderes. Nenhum ✦.
  { id: 'dist-ginete-amalkhan', nome: 'Amalkhan', grupo: 'distincao', livro: 'herois', pagina: 167,
    tags: 'Ginete de Namalkah', distincao: 'ginete-de-namalkah', marca: true, deus: null, magica: false,
    preReq: null, custo: null,
    quadro: { titulo: 'Irmão Cavalo', texto: [
      'Parte fundamental da cultura dos ginetes de Namalkah, um irmão cavalo é um parceiro montaria com quem o ginete possui um forte vínculo fraterno. Esse cavalo pode ter sido adquirido com uma habilidade (como Montaria ou Montaria Sagrada) ou como parte da história. A companhia do irmão cavalo é um elemento fundamental da admissão nesta distinção e, por isso, ele deve ser adquirido antes que o candidato possa cumpri-la. Se perder seu irmão cavalo, você pode transformar outro parceiro cavalo em seu irmão com uma ação entre aventuras.',
    ] },
    texto: [
    'Marca da distinção. Esse termo é uma das palavras que forma o nome do reino dos cavalos, e descreve ao mesmo tempo saudade de casa e ânsia por explorar.',
    'Você e seu irmão cavalo desenvolvem um profundo laço de irmandade. Ele passa a fornecer +1 na Defesa e em Reflexos, além de seus outros benefícios.',
  ] },
  { id: 'dist-ginete-irmao-campestre', nome: 'Irmão Campestre', grupo: 'distincao', livro: 'herois', pagina: 167,
    tags: 'Ginete de Namalkah', distincao: 'ginete-de-namalkah', marca: false, deus: null, magica: false,
    preReq: 'Ginete, ter um irmão cavalo (veja o quadro)', custo: null, quadro: null, texto: [
    'Nascido no lombo do cavalo, o ginete sabe contornar todos os problemas quando está junto de seu irmão.',
    'Quando faz um teste de perícia enquanto está montado em seu irmão cavalo, você pode gastar 1 PM para receber um bônus de +2 nesse teste. Para cada nível de parceiro da montaria acima de iniciante, você pode gastar +1 PM para aumentar esse bônus em +2.',
  ] },
  { id: 'dist-ginete-caminho-das-coxilhas', nome: 'Caminho das Coxilhas', grupo: 'distincao', livro: 'herois', pagina: 167,
    tags: 'Ginete de Namalkah', distincao: 'ginete-de-namalkah', marca: false, deus: null, magica: false,
    preReq: 'Cavaleiro Rústico', custo: null, quadro: null, texto: [
    'O corredor é estreito demais, mal é possível um humano adulto passar andando normalmente. Espere... ele está passando por aqui com um cavalo!?',
    'O nível de parceiro de seu irmão cavalo aumenta em um (de iniciante para veterano ou de veterano para mestre). Se ele já for um parceiro mestre, esse aumento se aplica a outro de seus tipos. Além disso, enquanto estiver montando seu irmão cavalo, você pode substituir testes de perícias originalmente baseadas em Destreza por testes de Cavalgar.',
  ] },
  { id: 'dist-ginete-cavaleiro-rustico', nome: 'Cavaleiro Rústico', grupo: 'distincao', livro: 'herois', pagina: 167,
    tags: 'Ginete de Namalkah', distincao: 'ginete-de-namalkah', marca: false, deus: null, magica: false,
    preReq: 'Sab 1, Irmão Campestre', custo: null, quadro: null, texto: [
    'Um verdadeiro ginete de Namalkah não teme nada e não precisa de um monte de metal para defendê-lo.',
    'Você soma sua Sabedoria na Defesa e seu irmão cavalo recebe os benefícios de um parceiro guardião iniciante. Este poder exige liberdade de movimentos; você não pode usá-lo se estiver de armadura pesada ou imóvel.',
  ] },
  { id: 'dist-ginete-coice', nome: 'Coice', grupo: 'distincao', livro: 'herois', pagina: 167,
    tags: 'Ginete de Namalkah', distincao: 'ginete-de-namalkah', marca: false, deus: null, magica: false,
    preReq: 'treinado em Luta ou Pontaria, Irmão Campestre', custo: null, quadro: null, texto: [
    'Quando lutam juntos, cavalo e ginete agem como se fossem um só — a fúria dos ventos encarnada.',
    'Enquanto estiver montado em seu irmão cavalo, você pode usar uma arma natural de cascos (1d8, crítico x2, impacto). Uma vez por rodada, quando usa as ações agredir ou investida montada para atacar com outra arma, você pode gastar 1 PM para fazer um ataque corpo a corpo extra com os cascos. O dano dos cascos aumenta em um passo para cada nível do irmão cavalo acima de iniciante.',
  ] },
  { id: 'dist-ginete-irmaos-inseparaveis', nome: 'Irmãos Inseparáveis', grupo: 'distincao', livro: 'herois', pagina: 168,
    tags: 'Ginete de Namalkah', distincao: 'ginete-de-namalkah', marca: false, deus: null, magica: false,
    preReq: 'Caminho das Coxilhas', custo: null, quadro: null, texto: [
    'Um ginete de Namalkah não recebe uma montaria — recebe um irmão para toda a vida.',
    'O nível de parceiro de seu irmão cavalo aumenta em um (de veterano para mestre). Se ele já for um parceiro mestre, esse aumento se aplica a outro de seus tipos. Além disso, a conexão entre vocês permite que se comuniquem telepaticamente enquanto estiverem em alcance longo um do outro.',
  ] },

  //  Guerreiro Mágico (p. 168–171) — 1 marca + 5 poderes. Arcanistas que
  //  unem magia e aço, treinados na Academia Arcana. Escala Estilo de
  //  Combate Arcano (bônus do estilo). ✦: Fogo e Aço.
  { id: 'dist-guerreiro-magico-arma-arcana', nome: 'Arma Arcana', grupo: 'distincao', livro: 'herois', pagina: 169,
    tags: 'Guerreiro Mágico', distincao: 'guerreiro-magico', marca: true, deus: null, magica: false,
    preReq: null, custo: null, quadro: null, texto: [
    'Marca da distinção. Para o guerreiro mágico, esgrima e magia se unem no mesmo movimento.',
    'Quando lança uma magia empunhando uma arma corpo a corpo, você recebe +2 na rolagem de dano da magia e pode usar a mão que empunha a arma para executar os gestos dela.',
  ] },
  { id: 'dist-guerreiro-magico-estilo-de-combate-arcano', nome: 'Estilo de Combate Arcano', grupo: 'distincao', livro: 'herois', pagina: 170,
    tags: 'Guerreiro Mágico', distincao: 'guerreiro-magico', marca: false, deus: null, magica: false,
    preReq: 'habilidade de classe Magias, treinado em Luta', custo: null, quadro: null, texto: [
    'Leves ou pesadas, armaduras fazem parte do treinamento de um guerreiro mágico.',
    'Escolha um estilo de combate entre Encouraçado Místico e Dançarino Marcial. Uma vez feita, essa escolha não pode ser mudada. Se escolher Encouraçado Místico, você pode lançar magias arcanas vestindo armaduras sem precisar de testes de Misticismo e recebe +1 em testes de resistência se estiver de armadura. Se escolher Dançarino Marcial, você recebe +1 na Defesa e em rolagens de dano com armas. Em ambos os casos, os bônus aumentam em +1 para cada outro poder da distinção que você tiver.',
  ] },
  { id: 'dist-guerreiro-magico-aparar-magia', nome: 'Aparar Magia', grupo: 'distincao', livro: 'herois', pagina: 170,
    tags: 'Guerreiro Mágico', distincao: 'guerreiro-magico', marca: false, deus: null, magica: false,
    preReq: 'Fogo e Aço', custo: null, quadro: null, texto: [
    'Com um golpe, o guerreiro mágico corta o fluxo da magia.',
    'Uma vez por rodada, quando falha em um teste de resistência contra uma habilidade mágica, você pode gastar 2 PM para fazer um teste de ataque e usar seu resultado como o valor do teste de resistência. Se o resultado do ataque superar a CD do efeito por 10 ou mais, você evita totalmente o efeito e o reflete contra a fonte, que passa a ser afetada em seu lugar (outras partes do efeito, como outros alvos ou o resto de sua área, não são afetadas).',
  ] },
  { id: 'dist-guerreiro-magico-ataque-arcano', nome: 'Ataque Arcano', grupo: 'distincao', livro: 'herois', pagina: 170,
    tags: 'Guerreiro Mágico', distincao: 'guerreiro-magico', marca: false, deus: null, magica: false,
    preReq: 'Fogo e Aço', custo: null, quadro: null, texto: [
    'A magia flui através dos golpes do guerreiro mágico.',
    'Uma vez por rodada, quando faz um ataque corpo a corpo, você pode gastar 2 PM para desferir um ataque arcano. Se fizer isso e acertar o ataque, você pode lançar uma magia que tenha como alvo uma criatura ou que afete uma área como ação livre, tendo como alvo ou centro de sua área a criatura atingida. Apenas magias com execução de movimento ou padrão podem ser lançadas dessa forma.',
  ] },
  { id: 'dist-guerreiro-magico-fogo-e-aco', nome: 'Fogo e Aço', grupo: 'distincao', livro: 'herois', pagina: 170,
    tags: 'Guerreiro Mágico', distincao: 'guerreiro-magico', marca: false, deus: null, magica: true,
    preReq: 'Estilo de Combate Arcano', custo: null, quadro: null, texto: [
    'Armas servem à magia, magia serve às armas.',
    'Quando lança uma magia, você recebe um bônus em testes de ataque e rolagens de dano com armas igual ao círculo da magia lançada até o fim do seu próximo turno.',
  ] },
  { id: 'dist-guerreiro-magico-preparacao-veloz', nome: 'Preparação Veloz', grupo: 'distincao', livro: 'herois', pagina: 170,
    tags: 'Guerreiro Mágico', distincao: 'guerreiro-magico', marca: false, deus: null, magica: false,
    preReq: 'Fogo e Aço', custo: null, quadro: null, texto: [
    'De seu treinamento marcial, o guerreiro mágico desenvolveu sua prontidão arcana.',
    'Na primeira rodada de um combate, você pode lançar uma magia com alcance pessoal como uma ação livre.',
  ] },

  //  Infiltrador de Wynlla (p. 171–174) — 1 marca + 6 poderes. Espiões
  //  arcanos do Reino da Magia (a lendária Ylena Elohim). Escala Trapaça
  //  Arcana (círculo e magias conhecidas). ✦: Ladinagem Mágica (marca)
  //  e Criar Armadilha Mágica.
  { id: 'dist-infiltrador-ladinagem-magica', nome: 'Ladinagem Mágica', grupo: 'distincao', livro: 'herois', pagina: 173,
    tags: 'Infiltrador de Wynlla', distincao: 'infiltrador-de-wynlla', marca: true, deus: null, magica: true,
    preReq: null, custo: null, quadro: null, texto: [
    'Marca da distinção. Tudo surge no lugar certo na hora certa... quando você dispõe da magia certa.',
    'Você cria um fluxo de energia capaz de manipular pequenos itens próximos. Você pode gastar uma ação de movimento para mover um objeto em alcance curto até 9m em qualquer direção (você só pode mover objetos que poderia manusear com uma mão). Além disso, pode gastar 1 PM para fazer um teste de Ladinagem para abrir fechaduras, ocultar itens, punga ou sabotar em alcance curto.',
  ] },
  { id: 'dist-infiltrador-trapaca-arcana', nome: 'Trapaça Arcana', grupo: 'distincao', livro: 'herois', pagina: 173,
    tags: 'Infiltrador de Wynlla', distincao: 'infiltrador-de-wynlla', marca: false, deus: null, magica: false,
    preReq: 'treinado em Enganação, Ladinagem e Misticismo, capacidade de lançar pelo menos uma magia arcana', custo: null, quadro: null, texto: [
    '“Meu nome é Elohim. Ylena Elohim.”',
    'Você pode lançar magias arcanas de 1º círculo. Se tiver pelo menos três poderes da distinção, pode lançar também magias de 2º círculo. Você começa com duas magias de 1º círculo e, a cada outro poder da distinção, aprende uma magia de qualquer círculo que possa lançar. Você pode lançar essas magias vestindo armaduras leves sem precisar de testes de Misticismo. Seu atributo-chave para essas magias é Inteligência.',
  ] },
  { id: 'dist-infiltrador-conjuracao-furtiva', nome: 'Conjuração Furtiva', grupo: 'distincao', livro: 'herois', pagina: 173,
    tags: 'Infiltrador de Wynlla', distincao: 'infiltrador-de-wynlla', marca: false, deus: null, magica: false,
    preReq: 'treinado em Furtividade, Magia Traiçoeira', custo: null, quadro: null, texto: [
    '“Como você consegue ser espiã se todos conhecem o seu nome?”',
    'Criaturas desprevenidas sofrem uma penalidade de –5 em testes de resistência contra suas habilidades mágicas.',
  ] },
  { id: 'dist-infiltrador-criar-armadilha-magica', nome: 'Criar Armadilha Mágica', grupo: 'distincao', livro: 'herois', pagina: 173,
    tags: 'Infiltrador de Wynlla', distincao: 'infiltrador-de-wynlla', marca: false, deus: null, magica: true,
    preReq: 'Trapaça Arcana', custo: null, quadro: null, texto: [
    '“Não, sra. Elohim. Eu espero que você morra.”',
    'Você aprende a magia Conjurar Armadilha (p. 252) como uma de suas magias arcanas. Se aprender essa magia novamente, seu custo diminui em –1 PM.',
  ] },
  { id: 'dist-infiltrador-disfarce-mental', nome: 'Disfarce Mental', grupo: 'distincao', livro: 'herois', pagina: 173,
    tags: 'Infiltrador de Wynlla', distincao: 'infiltrador-de-wynlla', marca: false, deus: null, magica: false,
    preReq: 'Trapaça Arcana, Disfarce Ilusório', custo: null, quadro: null, texto: [
    '“Se sua identidade for descoberta, o Conselho negará qualquer envolvimento com você.”',
    'Você pode usar Inteligência no lugar de Carisma para Enganação. Quando usa Disfarce Ilusório em si mesmo, você pode usar Inteligência no lugar do atributo-chave de uma perícia a sua escolha, adequada ao disfarce escolhido, e recebe +5 em testes de resistência contra efeitos mágicos de adivinhação.',
  ] },
  { id: 'dist-infiltrador-enganar-item-magico', nome: 'Enganar Item Mágico', grupo: 'distincao', livro: 'herois', pagina: 173,
    tags: 'Infiltrador de Wynlla', distincao: 'infiltrador-de-wynlla', marca: false, deus: null, magica: false,
    preReq: 'Trapaça Arcana', custo: null, quadro: null, texto: [
    '“Passe no Bureau Theuderulf, há alguns brinquedos novos esperando por você...”',
    'Quando lança uma magia através de um item mágico que só permite o uso de aprimoramentos caso você conheça a magia, você pode usá-los mesmo sem conhecê-la. Além disso, pode ativar itens mágicos sem cumprir requisitos de raça, classe e devoção.',
  ] },
  { id: 'dist-infiltrador-magia-traicoeira', nome: 'Magia Traiçoeira', grupo: 'distincao', livro: 'herois', pagina: 173,
    tags: 'Infiltrador de Wynlla', distincao: 'infiltrador-de-wynlla', marca: false, deus: null, magica: false,
    preReq: 'Ataque Furtivo 3d6, Disfarce Mental', custo: null, quadro: null, texto: [
    '“Parece que ele ficou... chocado.”',
    'Aprimoramento. Quando lança uma magia de dano em um ou mais alvos desprevenidos, você pode usar seu ataque furtivo com ela em um deles. Custo: +2 PM.',
  ] },

  //  Mago da Ordem do Vazio (p. 175–177) — 1 marca + 5 poderes. Arcanistas
  //  que trocam os componentes tradicionais por um componente especial
  //  único (a marca traz o quadro Componentes Especiais). Escalam
  //  Ingrediente Secreto (PM de dano extra) e Inovação Particular (CD
  //  contra dissipar). Nenhum ✦.
  { id: 'dist-vazio-componente-especial', nome: 'Componente Especial', grupo: 'distincao', livro: 'herois', pagina: 176,
    tags: 'Mago da Ordem do Vazio', distincao: 'mago-da-ordem-do-vazio', marca: true, deus: null, magica: false,
    preReq: null, custo: null,
    quadro: { titulo: 'Componentes Especiais', texto: [
      'Os magos da Ordem do Vazio empregam componentes especiais para canalizar seu mana na forma de magias. Um componente especial é um material mundano, como retalhos de tecido, pedaços de queijo ou fios de cabelo. Esse componente deve ser empunhado da mesma forma que um componente material (o mago pode usar a mesma mão para ambos) e é consumido da mesma maneira. Cada mago da Ordem do Vazio possui seu próprio componente especial, determinado quando ele ingressa na Ordem.',
      'Um componente especial é algo de preço insignificante, que pode ser encontrado no meio ambiente. Uma vez por dia, você consegue reunir um punhado de seu componente especial enquanto executa suas outras tarefas. Se dedicar um dia inteiro para reunir seu componente especial, em vez disso encontra 1d3+1 punhados. Um punhado de componente especial ocupa 1 espaço e é suficiente para 5 magias. A critério do mestre, pode não ser possível encontrar seu componente especial em determinados lugares (um mago da Ordem do Vazio que usa sementes de maçã, por exemplo, poderia ter dificuldade de encontrá-las em uma masmorra abandonada).',
    ] },
    texto: [
    'Marca da distinção. “Usamos meios alternativos de conjuração, em honra a Wynna.”',
    'Para lançar magias arcanas, você precisa gastar um componente especial (veja o quadro), que funciona como um componente material. Se não tiver seu componente especial, você não consegue lançar suas magias. Contudo, quando lança uma magia usando seu componente especial, a CD para resistir a ela aumenta em +2.',
  ] },
  { id: 'dist-vazio-magia-experimental', nome: 'Magia Experimental', grupo: 'distincao', livro: 'herois', pagina: 176,
    tags: 'Mago da Ordem do Vazio', distincao: 'mago-da-ordem-do-vazio', marca: false, deus: null, magica: false,
    preReq: 'habilidade de classe Magias, treinado em Misticismo, um poder de aprimoramento', custo: null, quadro: null, texto: [
    '“O tipo de magia que faço é instável. Quanto maior o efeito, maior o risco.”',
    'Quando lança uma magia, você pode fazer um teste de Misticismo (CD 15 + o custo em PM da magia) para alterar seu funcionamento. Se passar, a magia recebe um dos benefícios a seguir, a sua escolha (ou dois, se o resultado for 20 natural): escolher um poder de aprimoramento que você não possui e aplicá-lo à magia pagando seu custo adicional em PM; escolher um poder de aprimoramento que você possui e aplicá-lo à magia sem custo adicional; ou reduzir o custo da magia em –1 PM (cumulativo com outras reduções). Se você falhar no teste, a magia não tem efeito, mas você paga o custo dela mesmo assim. Se o resultado do teste for 1 natural, além disso você gera uma explosão arcana que atinge um raio de 9m; criaturas e objetos soltos nessa área sofrem 2d8 pontos de dano de essência por círculo da magia (Reflexos CD da magia reduz à metade; você mesmo não tem direito ao teste de resistência!).',
  ] },
  { id: 'dist-vazio-conhecimento-obscuro', nome: 'Conhecimento Obscuro', grupo: 'distincao', livro: 'herois', pagina: 176,
    tags: 'Mago da Ordem do Vazio', distincao: 'mago-da-ordem-do-vazio', marca: false, deus: null, magica: false,
    preReq: 'Magia Experimental', custo: null, quadro: null, texto: [
    'Os magos da Ordem do Vazio estudam tomos ocultos e podem tirar a melhor resposta de onde menos se espera.',
    'Quando vai fazer um teste de perícia, você pode gastar 2 PM para substituí-la por Misticismo (isso permite fazer testes de perícias que exijam treinamento mesmo sem ser treinado nelas). A cada vez que usar este poder novamente na mesma cena, você fica fatigado (essa condição é cumulativa e o afeta mesmo que você seja imune a ela).',
  ] },
  { id: 'dist-vazio-exercitar-os-musculos-arcanos', nome: 'Exercitar os Músculos Arcanos', grupo: 'distincao', livro: 'herois', pagina: 176,
    tags: 'Mago da Ordem do Vazio', distincao: 'mago-da-ordem-do-vazio', marca: false, deus: null, magica: false,
    preReq: 'Magia Experimental', custo: null, quadro: null, texto: [
    '“A magia é uma arte que deve ser domada como uma fera.”',
    'Você pode executar uma rápida série de exercícios mágicos, evocando o treinamento de seus fundamentos arcanos. O custo da sua próxima magia lançada nessa cena diminui em –1 PM (cumulativo com outras reduções de custo). A cada vez que usar este poder novamente na mesma cena, você fica fatigado (essa condição é cumulativa e o afeta mesmo que você seja imune a ela).',
  ] },
  { id: 'dist-vazio-ingrediente-secreto', nome: 'Ingrediente Secreto', grupo: 'distincao', livro: 'herois', pagina: 176,
    tags: 'Mago da Ordem do Vazio', distincao: 'mago-da-ordem-do-vazio', marca: false, deus: null, magica: false,
    preReq: 'Magia Experimental', custo: null, quadro: null, texto: [
    'As magias de um mago da Ordem do Vazio têm algo a mais.',
    'Quando lança uma magia de dano que permita um teste de resistência, você pode gastar PM (limitados pelo número de poderes da distinção que você possui) para infundi-la com mana em estado bruto. Para cada PM gasto, cada criatura que falhar no teste de resistência sofre +2d6 pontos de dano de essência.',
  ] },
  { id: 'dist-vazio-inovacao-particular', nome: 'Inovação Particular', grupo: 'distincao', livro: 'herois', pagina: 176,
    tags: 'Mago da Ordem do Vazio', distincao: 'mago-da-ordem-do-vazio', marca: false, deus: null, magica: false,
    preReq: 'Magia Experimental', custo: null, quadro: null, texto: [
    '“Cada mago tem seu método, e a criatividade é um escudo contra a intervenção alheia.”',
    'Quando uma criatura tenta anular ou dissipar suas magias (como uma contramágica ou Dispersar as Trevas), ela precisa fazer um teste de Vontade (CD da sua magia, +2 para cada poder da distinção que você possui). Se falhar, o efeito que ela estava usando para isso falha.',
  ] },

  //  Mago de Batalha de Wynlla (p. 177–180) — 1 marca + 5 poderes.
  //  Conjuradores-soldados de elite do Reino da Magia. O quadro
  //  Conjuração Magibélica (as técnicas Expandir/Fortalecer/Intensificar/
  //  Potencializar) fica no poder Conjuração Magibélica. Escalam
  //  Conjurador Encouraçado (Defesa), Conjuração Magibélica (nº de
  //  técnicas) e Infantaria Arcana (dano). Nenhum ✦.
  { id: 'dist-batalha-armamento-esoterico', nome: 'Armamento Esotérico', grupo: 'distincao', livro: 'herois', pagina: 178,
    tags: 'Mago de Batalha de Wynlla', distincao: 'mago-de-batalha-de-wynlla', marca: true, deus: null, magica: false,
    preReq: null, custo: null, quadro: null, texto: [
    'Marca da distinção. Nas mãos de um Mago de Batalha, qualquer item esotérico é uma arma.',
    'Quando você usa um item esotérico para lançar uma magia, a CD para resistir a ela aumenta em +1.',
  ] },
  { id: 'dist-batalha-conjurador-encouracado', nome: 'Conjurador Encouraçado', grupo: 'distincao', livro: 'herois', pagina: 178,
    tags: 'Mago de Batalha de Wynlla', distincao: 'mago-de-batalha-de-wynlla', marca: false, deus: null, magica: false,
    preReq: 'habilidade de classe Magias, lançar magias arcanas de 2º círculo, treinado em Misticismo, Arcano de Batalha', custo: null, quadro: null, texto: [
    'Como uma fortaleza móvel, o Mago de Batalha avança implacável, despejando morte e destruição.',
    'Você recebe proficiência com armaduras pesadas e pode lançar magias arcanas de armadura sem fazer testes de Misticismo. Para cada outro poder da distinção que possui, você recebe +1 na Defesa com armaduras pesadas.',
  ] },
  { id: 'dist-batalha-arsenal-arcano', nome: 'Arsenal Arcano', grupo: 'distincao', livro: 'herois', pagina: 180,
    tags: 'Mago de Batalha de Wynlla', distincao: 'mago-de-batalha-de-wynlla', marca: false, deus: null, magica: false,
    preReq: 'treinado em Luta ou Pontaria, Conjurador Encouraçado', custo: null, quadro: null, texto: [
    'Embora magias sejam sua arma principal, Magos de Batalha também sabem usar certas armas.',
    'Você recebe proficiência com armas marciais e pode usar armas como se fossem itens esotéricos. Quando usa uma arma dessa forma, você pode somar o bônus de dano de melhorias e encantos da arma ao de seu poder Arcano de Batalha. Além disso, o material especial da arma afeta suas magias com seu efeito de esotérico. Por fim, você pode trocar o atributo de dano da arma por seu atributo-chave de magias.',
  ] },
  { id: 'dist-batalha-conjuracao-magibelica', nome: 'Conjuração Magibélica', grupo: 'distincao', livro: 'herois', pagina: 180,
    tags: 'Mago de Batalha de Wynlla', distincao: 'mago-de-batalha-de-wynlla', marca: false, deus: null, magica: false,
    preReq: 'Conjurador Encouraçado', custo: null,
    quadro: { titulo: 'Conjuração Magibélica', texto: [
      'Desenvolvidas pelos Magos de Batalha de Wynlla, estas técnicas permitem modificar magias de formas únicas. Para fazer uma conjuração magibélica, ao lançar uma magia faça um teste de Misticismo (CD 10 + custo em PM da magia +5 por teste anterior na mesma cena). Se passar, você aplica uma de suas técnicas conhecidas à magia. Se falhar, fica fatigado até o fim da cena (essa condição é cumulativa e o afeta mesmo que você seja imune a ela).',
      'Lançar uma magia com conjuração magibélica é mais demorado; o tempo de conjuração da magia aumenta em um passo (de livre para movimento, de movimento para padrão e de padrão para completa). Não é possível aplicar uma conjuração magibélica a magias com tempo de conjuração de reação ou maior que padrão, e esse aumento é aplicado após quaisquer reduções (como a de Magia Acelerada).',
      'Expandir. A área da magia aumenta em +3m (de raio ou lado), +3m para cada dois outros poderes da distinção que você possui.',
      'Fortalecer. A magia causa um dado de dano adicional do mesmo tipo, mais um dado para cada dois outros poderes da distinção que você possui.',
      'Intensificar. A magia ignora até 5 pontos da redução de dano dos alvos. Esse valor aumenta em 5 para cada dois outros poderes da distinção que você possui.',
      'Potencializar. O limite de PM da magia aumenta em +2, +1 para cada dois outros poderes da distinção que você possui (esses PM adicionais não aumentam a CD para usar este poder).',
    ] },
    texto: [
    'As técnicas do Mago de Batalha tornam suas magias devastadoras, mas cobram um preço de seu corpo.',
    'Escolha uma técnica de conjuração magibélica (veja o quadro). Uma vez feita, essa escolha não pode ser mudada. Para cada outro poder da distinção diferente (exceto Conjurador Encouraçado), você pode escolher uma técnica diferente.',
  ] },
  { id: 'dist-batalha-guarda-magica', nome: 'Guarda Mágica', grupo: 'distincao', livro: 'herois', pagina: 180,
    tags: 'Mago de Batalha de Wynlla', distincao: 'mago-de-batalha-de-wynlla', marca: false, deus: null, magica: false,
    preReq: 'treinado em Fortitude, Conjurador Encouraçado', custo: null, quadro: null, texto: [
    'Mestre em utilizar suas magias como arma, o Mago de Batalha também aprende a usá-las como defesa.',
    'Quando lança uma magia arcana, você recebe uma quantidade de PV temporários, que duram até o início do seu próximo turno, igual ao total de PM gastos na magia.',
  ] },
  { id: 'dist-batalha-infantaria-arcana', nome: 'Infantaria Arcana', grupo: 'distincao', livro: 'herois', pagina: 180,
    tags: 'Mago de Batalha de Wynlla', distincao: 'mago-de-batalha-de-wynlla', marca: false, deus: null, magica: false,
    preReq: 'treinado em Guerra, Conjurador Encouraçado, vencer dez combates usando um item esotérico pelo menos uma vez em cada um', custo: null, quadro: null, texto: [
    'O Mago de Batalha é perito em usar itens esotéricos como armas.',
    'Se lançar uma magia empunhando um item esotérico, você soma o número de poderes da distinção que possui ao bônus de dano de seu poder Arcano de Batalha. Além disso, criaturas que rolem um resultado 1 no teste de resistência de uma magia de dano sua sofrem +50% de dano da magia.',
  ] },

  //  Médico de Salistick (p. 180–183) — 1 marca + 5 poderes. Curandeiros
  //  mundanos e céticos do Colégio Real (não podem ser devotos). Escalam
  //  Medicina Avançada (usos por dia), Medicina Preventiva (PV e
  //  resistência) e Saúde Perfeita (PM). Nenhum ✦.
  { id: 'dist-medico-ciencias-medicas', nome: 'Ciências Médicas', grupo: 'distincao', livro: 'herois', pagina: 182,
    tags: 'Médico de Salistick', distincao: 'medico-de-salistick', marca: true, deus: null, magica: false,
    preReq: null, custo: null, quadro: null, texto: [
    'Marca da distinção. Para aqueles formados no Colégio Real, a medicina é uma ciência fundamentada na lógica e na razão.',
    'Você pode usar Inteligência como atributo-chave de Cura (em vez de Sabedoria). Se já faz isso por outro efeito, em vez disso recebe +2 nessa perícia.',
  ] },
  { id: 'dist-medico-medicina-avancada', nome: 'Medicina Avançada', grupo: 'distincao', livro: 'herois', pagina: 182,
    tags: 'Médico de Salistick', distincao: 'medico-de-salistick', marca: false, deus: null, magica: false,
    preReq: 'Foco em Perícia (Cura), Medicina', custo: null, quadro: null, texto: [
    'Aplicando estudo e ciência a seus procedimentos, os membros do Colégio Real alcançam além das fronteiras da medicina artoniana.',
    'Cada dado de cura de seu poder Medicina aumenta para d10. Além disso, para cada dois outros poderes da distinção que você possui, pode usar esse poder mais uma vez por criatura a cada dia.',
  ] },
  { id: 'dist-medico-acompanhamento-medico', nome: 'Acompanhamento Médico', grupo: 'distincao', livro: 'herois', pagina: 182,
    tags: 'Médico de Salistick', distincao: 'medico-de-salistick', marca: false, deus: null, magica: false,
    preReq: 'Medicina Avançada', custo: null, quadro: null, texto: [
    'Acostumado a praticar seu ofício sob pressão, um médico de Salistick aprende a agir rapidamente.',
    'Para você, a ação necessária para prestar primeiros socorros e usar itens alquímicos que recuperam PV, PM ou condições é reduzida em um passo (até um mínimo de ação de movimento). Além disso, você pode gastar 5 PM e uma ação completa para fazer um teste de Cura (CD 30) em uma criatura adjacente que tenha morrido há até uma rodada. Se você passar, a criatura é ressuscitada com 1 PV. Você pode usar esse efeito uma vez por dia por criatura.',
  ] },
  { id: 'dist-medico-medicina-preventiva', nome: 'Medicina Preventiva', grupo: 'distincao', livro: 'herois', pagina: 183,
    tags: 'Médico de Salistick', distincao: 'medico-de-salistick', marca: false, deus: null, magica: false,
    preReq: 'Medicina Avançada', custo: null, quadro: null, texto: [
    'Melhor que curar doenças é impedir que elas surjam.',
    'Você pode gastar 1 hora para cuidar da saúde de um número de pessoas igual ao seu nível. Para cada poder da distinção que você possui, cada pessoa atendida recebe 5 PV temporários e +1 em testes de resistência por 1 dia. Este poder pode ser usado ao mesmo tempo que cuidados prolongados (veja Cura, Tormenta20, p. 117) se você aplicar ambos às mesmas pessoas.',
  ] },
  { id: 'dist-medico-remedios', nome: 'Remédios', grupo: 'distincao', livro: 'herois', pagina: 183,
    tags: 'Médico de Salistick', distincao: 'medico-de-salistick', marca: false, deus: null, magica: false,
    preReq: 'treinado em Ofício (alquimista), Medicina Avançada', custo: null, quadro: null, texto: [
    'Um médico de Salistick estuda princípios científicos para a fabricação e o uso dos mais variados fármacos.',
    'Quando você usa um preparado alquímico que fornece PV ou PM (temporários ou por cura), esse efeito aumenta em +1 por dado. Além disso, você pode fabricar preparados com esses efeitos em 10 minutos (em vez de 1 dia), mas eles duram apenas até o fim da cena.',
  ] },
  { id: 'dist-medico-saude-perfeita', nome: 'Saúde Perfeita', grupo: 'distincao', livro: 'herois', pagina: 183,
    tags: 'Médico de Salistick', distincao: 'medico-de-salistick', marca: false, deus: null, magica: false,
    preReq: 'treinado em Fortitude, Acompanhamento Médico', custo: null, quadro: null, texto: [
    'Um bom médico sabe cuidar de si mesmo (ou assim esperamos).',
    'Você recebe +1 em Constituição e imunidade a veneno. Além disso, recebe +2 PM por poder da distinção que possui.',
  ] },

  //  Mestre Bêbado (p. 183–186) — 1 marca + 5 poderes. Artista marcial
  //  tamuraniano que luta bêbado. A marca (goles) e quase todos os
  //  poderes escalam. Nenhum ✦.
  { id: 'dist-bebado-felicidade-engarrafada', nome: 'Felicidade Engarrafada', grupo: 'distincao', livro: 'herois', pagina: 185,
    tags: 'Mestre Bêbado', distincao: 'mestre-bebado', marca: true, deus: null, magica: false,
    preReq: null, custo: null, quadro: null, texto: [
    'Marca da distinção. O mestre bêbado nunca dispensa um traguinho.',
    'Você possui um recipiente (uma garrafa, odre ou equivalente) que ocupa 0,5 espaço e comporta 5 goles de bebida, +2 goles para cada poder da distinção que você possuir. Se estiver empunhando o recipiente, você pode gastar uma ação de movimento para tomar um gole da bebida e ganhar 1 PM temporário. Seu recipiente recupera todos os goles de bebida ao amanhecer, apesar de você nunca se lembrar de como conseguiu mais bebida… Essa bebida não provoca penalidades, mas também não conta como água para saciar fome e sede (Tormenta20, p. 319). A critério do mestre, essa bebida pode ser compartilhada com outros personagens em situações de interpretação, mas não fornece nenhum bônus para eles e não pode ser alterada de nenhuma forma.',
  ] },
  { id: 'dist-bebado-logica-alcoolica', nome: 'Lógica Alcoólica', grupo: 'distincao', livro: 'herois', pagina: 185,
    tags: 'Mestre Bêbado', distincao: 'mestre-bebado', marca: false, deus: null, magica: false,
    preReq: 'treinado em Fortitude e Luta, Briga ou Estilo Desarmado', custo: null, quadro: null, texto: [
    'Quando o mestre bêbado entra em combate, ninguém sabe como ele vai lutar... Nem ele mesmo!',
    'No início de cada rodada, você recebe um dos benefícios a seguir, que dura por 1 rodada. Role 1d6: 1) +2 em testes de ataque; 2) +2 em rolagens de dano; 3) +3m de deslocamento; 4) +2 na Defesa; 5) +2 na margem de ameaça com ataques desarmados; 6) +2 em testes de resistência. Para cada dois outros poderes da distinção, esses bônus aumentam em +1 (ou +1,5m).',
  ] },
  { id: 'dist-bebado-bafo-de-troll', nome: 'Bafo de Troll', grupo: 'distincao', livro: 'herois', pagina: 185,
    tags: 'Mestre Bêbado', distincao: 'mestre-bebado', marca: false, deus: null, magica: false,
    preReq: 'Lógica Alcoólica', custo: null, quadro: null, texto: [
    'O hálito do mestre bêbado é capaz de fazer Megalokk perder o apetite.',
    'Você pode gastar uma ação padrão e tomar um gole do seu recipiente para expelir um hálito horrível contra uma criatura adjacente. O alvo fica enjoado por 1d4+1 rodadas (Fort CD Con + número de poderes da distinção que você possui reduz para 1 rodada). Criaturas com Faro sofrem –5 no teste de Fortitude.',
  ] },
  { id: 'dist-bebado-bafo-de-dragao', nome: 'Bafo de Dragão', grupo: 'distincao', livro: 'herois', pagina: 185,
    tags: 'Mestre Bêbado', distincao: 'mestre-bebado', marca: false, deus: null, magica: false,
    preReq: 'Con 3, Bafo de Troll', custo: null, quadro: null, texto: [
    'O hálito do mestre bêbado pode ser inflamável!',
    'Uma vez por rodada, você pode gastar uma ação de movimento e beber um número de goles do seu recipiente (limitado pelo número de poderes da distinção que você possui) para desferir um sopro flamejante num cone de 9m. Criaturas na área sofrem 2d6 pontos de dano de fogo por gole e ficam em chamas (Reflexos CD Con + número de poderes da distinção que você possui reduz à metade e evita a condição).',
  ] },
  { id: 'dist-bebado-bebida-revigorante', nome: 'Bebida Revigorante', grupo: 'distincao', livro: 'herois', pagina: 185,
    tags: 'Mestre Bêbado', distincao: 'mestre-bebado', marca: false, deus: null, magica: false,
    preReq: 'Lógica Alcoólica', custo: null, quadro: null, texto: [
    '“Eu bebo pra ficar mal, se fosse pra ficar bem eu tomava remédio!”',
    'Você pode gastar uma ação de movimento e tomar um gole do seu recipiente para recuperar 4d6 PV ou remover uma condição entre abalado, alquebrado, apavorado, atordoado, cego, confuso, enfeitiçado, esmorecido, exausto, fatigado, frustrado, pasmo ou surdo. Quando usa este poder, você pode beber goles adicionais (limitados pelo número de poderes da distinção que você possui) para remover uma condição adicional ou aumentar a cura em +2d6 PV.',
  ] },
  { id: 'dist-bebado-luta-ridicula', nome: 'Luta Ridícula', grupo: 'distincao', livro: 'herois', pagina: 185,
    tags: 'Mestre Bêbado', distincao: 'mestre-bebado', marca: false, deus: null, magica: false,
    preReq: 'treinado em Enganação, Lógica Alcoólica', custo: null, quadro: null, texto: [
    'É difícil levar a sério um inimigo que está caindo de bêbado.',
    'Quando passa em um teste para fintar contra uma criatura inteligente (Int –3 ou maior), além do normal, você faz essa criatura subestimá-lo por 1 rodada. Enquanto o está subestimando, a criatura não pode fazer ações hostis contra você, exceto a ação agredir — mas não pode fazer nenhum ataque adicional ao usá-la! Você pode beber um gole ao fintar para somar o número de poderes da distinção que possui no teste da finta.',
  ] },

  //  Mestre Cozinheiro (p. 186–189) — 1 marca + 5 poderes. Chefs que
  //  cozinham monstros. O quadro Ingredientes Monstruosos fica em Tudo
  //  que Há de Bom. Escalam Tudo que Há de Bom, Banquete de Aventureiros
  //  e Guardar num potinho. Nenhum ✦.
  { id: 'dist-cozinheiro-panela-de-estimacao', nome: 'Panela de Estimação', grupo: 'distincao', livro: 'herois', pagina: 187,
    tags: 'Mestre Cozinheiro', distincao: 'mestre-cozinheiro', marca: true, deus: null, magica: false,
    preReq: null, custo: null, quadro: null, texto: [
    'Marca da distinção. Nas mãos de um mestre cozinheiro, utensílios de cozinha ganham novas utilidades.',
    'Você recebe uma arma ou escudo com o qual seja proficiente, que pode ser usado como instrumentos de cozinheiro e fornece +2 em Ofício (cozinheiro). Se perder esse item, você pode comprar ou produzir outro com 1 dia e o gasto de T$ 100.',
  ] },
  { id: 'dist-cozinheiro-tudo-que-ha-de-bom', nome: 'Tudo que Há de Bom', grupo: 'distincao', livro: 'herois', pagina: 187,
    tags: 'Mestre Cozinheiro', distincao: 'mestre-cozinheiro', marca: false, deus: null, magica: false,
    preReq: 'Foco em Perícia (Ofício [cozinheiro])', custo: null,
    quadro: { titulo: 'Ingredientes Monstruosos', texto: [
      'Cauda de escorpião, musgo tóxico, larvas misteriosas do fundo de cavernas… Para um mestre cozinheiro, esses são insumos sofisticados — ingredientes monstruosos, que nenhum outro cozinheiro imaginaria usar. Quando usados em um prato especial, ingredientes monstruosos adicionam efeitos especiais aos benefícios fornecidos pelo prato. Os efeitos de ingredientes monstruosos diferentes são cumulativos.',
      'Ingredientes monstruosos podem ser adquiridos em ambientes habitados por monstros. Encontrar um ingrediente monstruoso exige 1 dia de trabalho e um teste de Ofício (cozinheiro) contra CD 20. Se passar, você encontra um ingrediente, +1 para cada 10 pontos que o teste exceder a CD. O mestre tem a palavra final sobre quais ingredientes podem ser encontrados em terrenos variados. Um ingrediente monstruoso ocupa 0,5 espaço.',
      'Carne Monstruosa. A carne de qualquer monstro. O prato fornece +5 PV temporários para cada poder da distinção que você possui.',
      'Ervas Aromáticas. Ervas conhecidas por seu efeito calmante, que ajudam no foco. O prato fornece +1d4 em um teste de Misticismo, Ofício, Percepção ou Vontade realizado até o fim do dia. A cada outro poder da distinção que você possui, esse dado de bônus aumenta em um passo.',
      'Especiarias Picantes. Tão ardidas que fazem bárbaros chorar, são encontradas em planícies e terrenos urbanos. O prato fornece +1d4 em um teste de Acrobacia, Atletismo, Iniciativa ou Reflexos realizado até o fim do dia. A cada outro poder da distinção que você possui, esse dado de bônus aumenta em um passo.',
      'Núcleo de Temperatura. Encontrados em terrenos de temperaturas extremas, estes minerais emitem frio ou calor capazes de amplificar as propriedades dos alimentos. Os bônus numéricos e em dados do prato aumentam em +1.',
      'Raízes Curativas. Encontradas em pântanos e subterrâneos, estas ervas fornecem +1d4 em um teste de resistência. A cada outro poder da distinção que você possui, esse dado de bônus aumenta em um passo.',
      'Sal Azul. Encontrado em montanhas e terreno aquático, este ingrediente misterioso armazena energias místicas. O prato fornece +1 PM temporário. Esse bônus aumenta em +1 PM para cada outro poder da distinção que você possui.',
    ] },
    texto: [
    '“Açúcar, tempero... O que mais está faltando?”',
    'Você pode coletar e usar ingredientes monstruosos em seus pratos (veja o quadro). Quando você fabrica um prato especial, pode adicionar 1 ingrediente monstruoso à receita, +1 ingrediente diferente para cada dois outros poderes da distinção que possui.',
  ] },
  { id: 'dist-cozinheiro-a-moda-da-casa', nome: 'À Moda da Casa', grupo: 'distincao', livro: 'herois', pagina: 187,
    tags: 'Mestre Cozinheiro', distincao: 'mestre-cozinheiro', marca: false, deus: null, magica: false,
    preReq: 'Tudo que Há de Bom', custo: null, quadro: null, texto: [
    '“...metade com pimenta, metade sem, e um terço sem cebola…”',
    'Você pode preparar pratos especiais que combinam os efeitos de dois pratos diferentes — por exemplo, um caldo com os efeitos combinados de um prato de aventureiro e uma sopa de peixe. Fazer isso demora o mesmo tempo que um prato normal, mas consome os ingredientes de ambos e usa a mais alta CD para fabricar entre eles. Além disso, sempre que uma receita pedir um ingrediente específico, você pode substituí-lo por um ingrediente monstruoso.',
  ] },
  { id: 'dist-cozinheiro-banquete-de-aventureiros', nome: 'Banquete de Aventureiros', grupo: 'distincao', livro: 'herois', pagina: 188,
    tags: 'Mestre Cozinheiro', distincao: 'mestre-cozinheiro', marca: false, deus: null, magica: false,
    preReq: 'três poderes da distinção', custo: null, quadro: null, texto: [
    '“Comida faz mais do que sustentar — ela conecta. Memórias. Sentimentos. Pessoas. E, conectados, somos mais fortes.”',
    'Uma vez por tempo entre aventuras, você pode gastar uma quantidade de ingredientes monstruosos igual ao número de poderes da distinção que possui para preparar um banquete para seu grupo. Os participantes desse banquete recebem, durante a próxima aventura, uma quantidade de dados de auxílio (d6) igual à quantidade de ingredientes gastos no banquete. Sempre que fizer um teste de perícia, você pode gastar 1 dado de auxílio e adicionar o resultado como bônus no teste. Se 3 ou mais ingredientes diferentes forem usados no banquete, os dados de auxílio tornam-se d8.',
  ] },
  { id: 'dist-cozinheiro-guardar-num-potinho', nome: 'Guardar num Potinho', grupo: 'distincao', livro: 'herois', pagina: 188,
    tags: 'Mestre Cozinheiro', distincao: 'mestre-cozinheiro', marca: false, deus: null, magica: false,
    preReq: 'À Moda da Casa', custo: null, quadro: null, texto: [
    '“Manda dois pra viagem!”',
    'Quando prepara um prato especial, você pode gastar 1 ingrediente monstruoso adicional. Se fizer isso, ao fim da refeição você pode embalar os restos do prato na forma de um lanche — que pode ser consumido com uma ação padrão e fornece os mesmos benefícios do prato original. Lanches duram 1 dia por poder da distinção.',
  ] },
  { id: 'dist-cozinheiro-mise-en-place', nome: 'Mise en Place', grupo: 'distincao', livro: 'herois', pagina: 188,
    tags: 'Mestre Cozinheiro', distincao: 'mestre-cozinheiro', marca: false, deus: null, magica: false,
    preReq: 'Tudo que Há de Bom', custo: null, quadro: null, texto: [
    '“Eu já disse que julienne é corte na vertical! NA VERTICAL!”',
    'Você pode usar Ofício (cozinheiro) para identificar criaturas, exceto construtos e mortos-vivos, e para extrair itens de criaturas mortas. Além disso, quando você passa num teste para extrair itens consumíveis de uma criatura morta, extrai 1 item adicional para cada 10 pontos pelos quais o resultado do teste supera a CD.',
  ] },

  //  Mestre dos Desejos (p. 189–192) — 1 marca + 5 poderes. Qareen que
  //  domina a força dos desejos. Não escala pelo nº de poderes. Quatro ✦
  //  (O Segundo/Último Desejo, Gênio da Lâmpada, Sempre Disponível).
  { id: 'dist-desejos-desejo-de-servir', nome: 'Desejo de Servir', grupo: 'distincao', livro: 'herois', pagina: 192,
    tags: 'Mestre dos Desejos', distincao: 'mestre-dos-desejos', marca: true, deus: null, magica: false,
    preReq: null, custo: null, quadro: null, texto: [
    'Marca da distinção. Aproximando-se do seu sangue de gênio, o qareen aprende a empregar a força dos desejos como combustível.',
    'A CD para resistir às magias que você lança com sua habilidade Desejos aumenta em +2.',
  ] },
  { id: 'dist-desejos-o-primeiro-desejo', nome: 'O Primeiro Desejo', grupo: 'distincao', livro: 'herois', pagina: 192,
    tags: 'Mestre dos Desejos', distincao: 'mestre-dos-desejos', marca: false, deus: null, magica: false,
    preReq: 'treinado em Intuição e Misticismo', custo: null, quadro: null, texto: [
    'O poder dos gênios aflora diante de um desejo sincero.',
    'A redução de custo de suas magias lançadas com a habilidade Desejos muda para –2 PM.',
  ] },
  { id: 'dist-desejos-o-segundo-desejo', nome: 'O Segundo Desejo', grupo: 'distincao', livro: 'herois', pagina: 191,
    tags: 'Mestre dos Desejos', distincao: 'mestre-dos-desejos', marca: false, deus: null, magica: true,
    preReq: 'O Primeiro Desejo', custo: null, quadro: null, texto: [
    'O poder dos desejos desbloqueia conhecimentos que um mestre dos desejos jamais imaginava possuir.',
    'Uma vez por rodada, um aliado pode gastar uma ação livre para pedir que você lance uma magia arcana de 1º círculo que você não conheça. Até o fim do seu próximo turno, você pode lançar essa magia.',
  ] },
  { id: 'dist-desejos-o-ultimo-desejo', nome: 'O Último Desejo', grupo: 'distincao', livro: 'herois', pagina: 191,
    tags: 'Mestre dos Desejos', distincao: 'mestre-dos-desejos', marca: false, deus: null, magica: true,
    preReq: 'O Segundo Desejo, realizar três desejos grandiosos', custo: null, quadro: null, texto: [
    'Não há nada mais forte que um desejo.',
    'Uma vez por aventura, você pode lançar a magia Desejo sem pagar seu custo em PM (mas você ainda precisa pagar outros custos da magia, como sacrifício de PM). Você só pode usar esta habilidade em resposta a um pedido feito por um aliado desde seu último turno.',
  ] },
  { id: 'dist-desejos-genio-da-lampada', nome: 'Gênio da Lâmpada', grupo: 'distincao', livro: 'herois', pagina: 191,
    tags: 'Mestre dos Desejos', distincao: 'mestre-dos-desejos', marca: false, deus: null, magica: true,
    preReq: 'O Primeiro Desejo, Refúgio', custo: null, quadro: null, texto: [
    'Além de uma morada, a lâmpada é um refúgio, um lugar onde o mestre dos desejos pode descansar.',
    'Você recebe uma lâmpada mágica, um item Minúsculo com RD 10 e PV iguais à metade dos seus. Enquanto estiver de posse da lâmpada, você pode lançar a magia Refúgio sem pagar seu custo básico. Além disso, se for reduzido a 0 PV ou menos, você pode gastar 3 PM para ser transportado magicamente para dentro da lâmpada; isso interrompe qualquer perda de vida ou dano contínuo, mas o deixa inconsciente em um transe místico até você voltar a ter pelo menos 1 PV. Dentro da lâmpada, você recupera PV por descanso normalmente e pode ser afetado por efeitos mágicos de cura lançados sobre a lâmpada. Se perder sua lâmpada, você pode criar uma nova com uma semana de trabalho e T$ 100.',
  ] },
  { id: 'dist-desejos-sempre-disponivel', nome: 'Sempre Disponível', grupo: 'distincao', livro: 'herois', pagina: 192,
    tags: 'Mestre dos Desejos', distincao: 'mestre-dos-desejos', marca: false, deus: null, magica: true,
    preReq: 'Gênio da Lâmpada', custo: null, quadro: null, texto: [
    'O mestre dos desejos sempre está onde é mais necessário.',
    'Você aprende e pode lançar a magia Salto Dimensional. Caso aprenda novamente essa magia, seu custo diminui em –1 PM. Além disso, se um aliado estiver empunhando sua lâmpada e gastar uma ação livre para esfregá-la, até o fim do seu próximo turno você pode lançar essa magia sem pagar seu custo básico, mas deve ter como destino um espaço adjacente à lâmpada.',
  ] },

  //  Mestre Mahou-Jutsu (p. 192–195) — 1 marca + 5 poderes. Arte marcial
  //  arcana dos gênios. Escalam Mahou-jutsu (círculo) e Punho Arcano
  //  (CD). ✦: Defesa da Magia.
  { id: 'dist-mahou-palma-mistica', nome: 'Palma Mística', grupo: 'distincao', livro: 'herois', pagina: 195,
    tags: 'Mestre Mahou-Jutsu', distincao: 'mestre-mahou-jutsu', marca: true, deus: null, magica: false,
    preReq: null, custo: null, quadro: null, texto: [
    'Marca da distinção. A primeira técnica do mahou-jutsu ensina a aplicar a precisão marcial na execução de magias.',
    'Enquanto tiver pelo menos uma mão livre, você recebe +2 em testes de ataque realizados como parte de magias (como o aprimoramento de Toque Chocante) e na CD de suas magias arcanas contra alvos em seu alcance corpo a corpo.',
  ] },
  { id: 'dist-mahou-mahou-jutsu', nome: 'Mahou-jutsu', grupo: 'distincao', livro: 'herois', pagina: 195,
    tags: 'Mestre Mahou-Jutsu', distincao: 'mestre-mahou-jutsu', marca: false, deus: null, magica: false,
    preReq: 'lançar magias arcanas, treinado em Misticismo, Briga ou Estilo Desarmado', custo: null, quadro: null, texto: [
    'O princípio fundamental do mahou-jutsu é a integração fluida de ataques desarmados e magias arcanas.',
    'Uma vez por rodada, quando usa uma ação agredir para fazer dois ou mais ataques desarmados, você pode gastar 2 PM para lançar uma magia arcana com execução de ação de movimento ou padrão como ação livre. O círculo máximo de magias que você pode lançar com este poder é limitado pela quantidade de poderes da distinção que possui.',
  ] },
  { id: 'dist-mahou-defesa-da-magia', nome: 'Defesa da Magia', grupo: 'distincao', livro: 'herois', pagina: 195,
    tags: 'Mestre Mahou-Jutsu', distincao: 'mestre-mahou-jutsu', marca: false, deus: null, magica: true,
    preReq: 'Mahou-Jutsu', custo: null, quadro: null, texto: [
    'O poder arcano fortalece as defesas do mestre mahou-jutsu.',
    'Quando lança uma magia arcana, você recebe PV temporários iguais a 5x o círculo da magia lançada. Esses PV duram até o início do seu próximo turno.',
  ] },
  { id: 'dist-mahou-determinacao-da-dor', nome: 'Determinação da Dor', grupo: 'distincao', livro: 'herois', pagina: 195,
    tags: 'Mestre Mahou-Jutsu', distincao: 'mestre-mahou-jutsu', marca: false, deus: null, magica: false,
    preReq: 'Con 1, Mahou-Jutsu', custo: null, quadro: null, texto: [
    'A disciplina do treino permite ao mestre mahou-jutsu tirar forças do próprio sofrimento.',
    'Você soma sua Constituição nos testes de Vontade para concentração em magias (Tormenta20, p. 170). Além disso, quando sofre dano, você soma sua Constituição no seu limite de PM para magias arcanas até o fim do seu próximo turno.',
  ] },
  { id: 'dist-mahou-esplendor-vitorioso-inigualavel', nome: 'Esplendor Vitorioso Inigualável', grupo: 'distincao', livro: 'herois', pagina: 195,
    tags: 'Mestre Mahou-Jutsu', distincao: 'mestre-mahou-jutsu', marca: false, deus: null, magica: false,
    preReq: 'lançar magias arcanas de 2º círculo, Punho Arcano', custo: null, quadro: null, texto: [
    'Para obter a vitória, o mestre mahou-jutsu pode sacrificar o próprio corpo.',
    'Quando lança uma magia de dano, você pode gastar 10 PV para infundi-la com sua própria força vital. Se fizer isso, você soma sua Constituição à CD da magia e o dano básico de seu ataque desarmado ao dano dela.',
  ] },
  { id: 'dist-mahou-punho-arcano', nome: 'Punho Arcano', grupo: 'distincao', livro: 'herois', pagina: 195,
    tags: 'Mestre Mahou-Jutsu', distincao: 'mestre-mahou-jutsu', marca: false, deus: null, magica: false,
    preReq: 'Mahou-Jutsu', custo: null, quadro: null, texto: [
    'Quando o punho de um mestre mahou-jutsu golpeia, carrega consigo os maiores segredos arcanos.',
    'Uma vez por rodada, quando lança uma magia arcana com alcance de toque e execução de ação de movimento ou padrão, você pode gastar 2 PM para fazer um ataque desarmado contra o alvo da magia como ação livre. Se acertar esse ataque, a CD da magia aumenta em +1. Para cada dois outros poderes da distinção que você possui, a CD aumenta em +1.',
  ] },

  //  Mosqueteiro de Rishantor (p. 195–198) — 1 marca + 5 poderes.
  //  Espadachins honrados e ostensivos de Ahlen. Não escala pelo nº de
  //  poderes (efeitos fixos ou limiar). Nenhum ✦ (Valentia é simulada).
  { id: 'dist-mosqueteiro-equipamento-real', nome: 'Equipamento Real', grupo: 'distincao', livro: 'herois', pagina: 197,
    tags: 'Mosqueteiro de Rishantor', distincao: 'mosqueteiro-de-rishantor', marca: true, deus: null, magica: false,
    preReq: null, custo: null, quadro: null, texto: [
    'Marca da distinção. O equipamento de um Mosqueteiro de Rishantor deveria ser um deboche. Mas é ostentado com orgulho.',
    'Você recebe um tabardo, um florete ou rapieira e um chapéu emplumado (veja o Capítulo 3). Enquanto você estiver usando esses itens, recebe um bônus de +1 em Diplomacia, testes de ataque, rolagens de dano e na Defesa. Você não pode ser devoto de divindades capazes de canalizar energia negativa e deve seguir algum código de conduta (como Código de Honra). Se violá-lo, além das consequências normais, não poderá usar seus poderes de mosqueteiro até recuperar seus PM.',
  ] },
  { id: 'dist-mosqueteiro-mestre-esgrimista', nome: 'Mestre Esgrimista', grupo: 'distincao', livro: 'herois', pagina: 197,
    tags: 'Mosqueteiro de Rishantor', distincao: 'mosqueteiro-de-rishantor', marca: false, deus: null, magica: false,
    preReq: 'proficiência com armas marciais, Estilo de Uma Arma', custo: null, quadro: null, texto: [
    'Por suas restrições de equipamento, o Mosqueteiro treina sua esgrima mais que qualquer um.',
    'Seu multiplicador de crítico com florete e rapieira aumenta em +1. Além disso, quando faz um ataque com uma dessas armas, você pode gastar 1 PM para rolar dois dados e usar o melhor resultado.',
  ] },
  { id: 'dist-mosqueteiro-heroismo-galante', nome: 'Heroísmo Galante', grupo: 'distincao', livro: 'herois', pagina: 197,
    tags: 'Mosqueteiro de Rishantor', distincao: 'mosqueteiro-de-rishantor', marca: false, deus: null, magica: false,
    preReq: 'treinado em Reflexos, Mestre Esgrimista', custo: null, quadro: null, texto: [
    'Um Mosqueteiro não hesita em defender um inocente, mesmo que isso custe sua vida.',
    'Quando um aliado adjacente é alvo de um ataque, você pode gastar 1 PM para se tornar o alvo do ataque, que então é resolvido normalmente. Se você tiver todos os poderes da distinção, quando um aliado em alcance curto é alvo de um ataque, você pode gastar 3 PM para se deslocar até um espaço adjacente a ele e ao atacante (desde que tenha um caminho desimpedido) e se tornar o alvo do ataque. Você só pode usar este poder uma vez por rodada e ele requer liberdade de movimentos; você não pode usá-lo se estiver de armadura pesada ou na condição imóvel.',
  ] },
  { id: 'dist-mosqueteiro-um-por-todos', nome: 'Um por Todos', grupo: 'distincao', livro: 'herois', pagina: 197,
    tags: 'Mosqueteiro de Rishantor', distincao: 'mosqueteiro-de-rishantor', marca: false, deus: null, magica: false,
    preReq: 'Mestre Esgrimista', custo: null, quadro: null, texto: [
    'O Mosqueteiro sabe trabalhar em equipe como ninguém.',
    'Quando você faz um teste para ajudar (exceto para ataques), o bônus que você fornece aumenta em +2. Além disso, uma vez por rodada, quando acerta um ataque de florete ou rapieira em um inimigo, você pode usar o resultado desse ataque como um teste para ajudar um ataque de um aliado feito contra esse inimigo até a próxima rodada.',
  ] },
  { id: 'dist-mosqueteiro-todos-por-um', nome: 'Todos Por Um', grupo: 'distincao', livro: 'herois', pagina: 197,
    tags: 'Mosqueteiro de Rishantor', distincao: 'mosqueteiro-de-rishantor', marca: false, deus: null, magica: false,
    preReq: 'Duelo, Um por Todos', custo: null, quadro: null, texto: [
    'Quando podem confiar em seus aliados, os Mosqueteiros se tornam imbatíveis.',
    'Quando você usa Duelo, pode gastar +1 PM para cada aliado a sua escolha em alcance curto (limitado pelo seu Carisma). Aliados escolhidos também recebem os benefícios de Duelo contra o alvo (mas perdem-no se atacarem outro oponente).',
  ] },
  { id: 'dist-mosqueteiro-valentia', nome: 'Valentia', grupo: 'distincao', livro: 'herois', pagina: 197,
    tags: 'Mosqueteiro de Rishantor', distincao: 'mosqueteiro-de-rishantor', marca: false, deus: null, magica: false,
    preReq: 'Mestre Esgrimista, dois outros poderes da distinção', custo: null, quadro: null, texto: [
    'Um Mosqueteiro de Rishantor não teme nenhum perigo.',
    'Você pode lançar Heroísmo, mas apenas sobre si mesmo. Esta não é uma habilidade mágica e provém de sua galanteria, panache e ousadia altaneira (veja “Magias Simuladas”, p. 44).',
  ] },

  //  Mutagenista (p. 199–201) — 1 marca + 5 poderes. Alquimistas que
  //  alteram o próprio corpo com mutagênicos. O quadro Mutagênicos fica
  //  em Fabricar Mutagênicos. Escalam Fabricar Mutagênicos (tipos e
  //  limite ativo) e Organismo Reagente. Nenhum ✦ (mutagênicos são
  //  magia SIMULADA).
  { id: 'dist-mutagenista-preparacao-corporal', nome: 'Preparação Corporal', grupo: 'distincao', livro: 'herois', pagina: 200,
    tags: 'Mutagenista', distincao: 'mutagenista', marca: true, deus: null, magica: false,
    preReq: null, custo: null, quadro: null, texto: [
    'Marca da distinção. Tendo estudado os textos zarkhassianos, o mutagenista prepara seu corpo para receber seus preparados.',
    'Você recebe +2 em Fortitude e Ofício (alquimista).',
  ] },
  { id: 'dist-mutagenista-fabricar-mutagenicos', nome: 'Fabricar Mutagênicos', grupo: 'distincao', livro: 'herois', pagina: 200,
    tags: 'Mutagenista', distincao: 'mutagenista', marca: false, deus: null, magica: false,
    preReq: 'treinado em Fortitude e Ofício (alquimista)', custo: null,
    quadro: { titulo: 'Mutagênicos', texto: [
      'Mutagênicos são preparados alquímicos que exigem treinamento próprio para sua fabricação e consumo. Um mutagênico só funciona com seu fabricante, e não funciona se ele for imune a efeitos de metabolismo.',
      'Fabricação. Mutagênicos seguem as regras de fabricação de preparados (Tormenta20, p. 121). O preço de cada mutagênico é apresentado em sua descrição e para fabricá-los você precisa ter o poder Fabricar Mutagênicos.',
      'Ativação. Para ativar um mutagênico você precisa gastar uma ação padrão para ingeri-lo. Seu efeito dura 1 dia e o máximo de mutagênicos ativos que você pode ter é igual ao seu total de poderes da distinção. Se ingerir outro, o efeito do mais antigo termina.',
      'Biochoque. Ao ingerir um mutagênico, faça um teste de Fortitude (CD 10, +5 por teste adicional no mesmo dia). Se falhar, você sofre um biochoque de estágio 1. Cada nova falha no mesmo dia impõe um efeito de estágio adicional. Estágio 1: o mutagênico funciona, mas você fica enjoado. Estágio 2: o mutagênico não funciona e você perde 1d12 PV. Estágio 3: o mutagênico não funciona e você perde 1d12 PV, além de ficar confuso e em fúria (como um bárbaro) enquanto estiver confuso. Estágio 4: seu corpo sofre mutações desordenadas por 1d4 rodadas. Após isso, você morre.',
      'Exaurir. Você pode gastar uma ação livre para exaurir um mutagênico em seu corpo. Se fizer isso, seu efeito aumenta, mas termina ao fim da cena.',
      'Sobrecarga. Quando ingere um mutagênico acima do seu limite, você pode tentar sobrecarregar seu corpo para manter o efeito mais antigo ativo. Faça um novo teste de biochoque. Se passar, você não perde o efeito anterior. Se falhar, além do biochoque, você perde todos os efeitos sobrecarregados. Seu limite de efeitos em sobrecarga é igual ao seu limite de mutagênicos.',
      'Uso Exclusivo. Se o mutagênico for ingerido por outra criatura que não seu fabricante, não gera seu efeito e causa a perda de 2d12 PV por veneno.',
      'Tonificante. Altera as propriedades básicas de um organismo, fornecendo +1 em um atributo específico. Esse aumento não oferece PV, PM ou perícias adicionais. Exaurir. O bônus aumenta em +1. Preço: T$ 60.',
      'Energizante. Desenvolve habilidades excepcionais. Você pode lançar uma magia arcana de 1º círculo específica (atributo-chave Constituição) como um arcanista de seu nível. Esta não é uma habilidade mágica e provém de alterações em seu organismo (veja “Magias Simuladas”, p. 44). Exaurir. O custo da magia diminui em –1 (cumulativo com outras reduções). Preço: T$ 90.',
      'Despersonalizante. Promove mutações poderosas e grotescas. Ingerir este mutagênico fornece uma habilidade de raça específica (exceto construtos e mortos-vivos). Exaurir. Você recebe +1 em um atributo em que a raça tenha um modificador positivo (esse aumento não oferece PV, PM ou perícias adicionais). Preço: T$ 150.',
    ] },
    texto: [
    'O mutagenista desenvolve suas primeiras fórmulas.',
    'Você pode fabricar e usar tonificantes (veja o quadro Mutagênicos). Para cada dois outros poderes da distinção, você pode fabricar e usar respectivamente energizantes e despersonalizantes.',
  ] },
  { id: 'dist-mutagenista-ingestao-rapida', nome: 'Ingestão Rápida', grupo: 'distincao', livro: 'herois', pagina: 200,
    tags: 'Mutagenista', distincao: 'mutagenista', marca: false, deus: null, magica: false,
    preReq: 'Fabricar Mutagênicos', custo: null, quadro: null, texto: [
    'Preparados são a chave do poder do mutagenista.',
    'Uma vez por rodada, você pode ingerir uma poção ou preparado como ação livre.',
  ] },
  { id: 'dist-mutagenista-mutagenia-adicional', nome: 'Mutagenia Adicional', grupo: 'distincao', livro: 'herois', pagina: 200,
    tags: 'Mutagenista', distincao: 'mutagenista', marca: false, deus: null, magica: false,
    preReq: 'Fabricar Mutagênicos', custo: null, quadro: null, texto: [
    'Através de exercícios e fórmulas especiais, o mutagenista aumenta a tolerância de seu corpo a alterações.',
    'Seu limite de mutagênicos ativos aumenta em +1.',
  ] },
  { id: 'dist-mutagenista-potencializar-mutagenicos', nome: 'Potencializar Mutagênicos', grupo: 'distincao', livro: 'herois', pagina: 200,
    tags: 'Mutagenista', distincao: 'mutagenista', marca: false, deus: null, magica: false,
    preReq: 'Organismo Reagente', custo: null, quadro: null, texto: [
    'Com a experimentação, o mutagenista desenvolve formas ainda mais eficientes de alterar seu corpo.',
    'O efeito básico de seus mutagênicos se torna seu efeito de exaurir (você ainda pode exauri-lo com efeitos cumulativos).',
  ] },
  { id: 'dist-mutagenista-organismo-reagente', nome: 'Organismo Reagente', grupo: 'distincao', livro: 'herois', pagina: 200,
    tags: 'Mutagenista', distincao: 'mutagenista', marca: false, deus: null, magica: false,
    preReq: 'Mutagenia Adicional', custo: null, quadro: null, texto: [
    'O corpo do mutagenista se torna um laboratório.',
    'Quando você ingere um preparado alquímico, se ele fornece um bônus em perícias, esse bônus aumenta em +1 e, se ele fornece PV ou PM (temporários ou por cura), esse efeito aumenta em +1 por dado. Para cada dois outros poderes da distinção, esses efeitos aumentam em +1.',
  ] },

  //  Pistoleiro de Smokestone (p. 201–204) — 1 marca + 6 poderes. Durões
  //  das planícies que rejeitam magia e autoridade. A marca traz o quadro
  //  O Código do Pistoleiro. Escala só Rápido no Gatilho (Iniciativa).
  //  Nenhum ✦.
  { id: 'dist-pistoleiro-honra-do-pistoleiro', nome: 'Honra do Pistoleiro', grupo: 'distincao', livro: 'herois', pagina: 203,
    tags: 'Pistoleiro de Smokestone', distincao: 'pistoleiro-de-smokestone', marca: true, deus: null, magica: false,
    preReq: null, custo: null,
    quadro: { titulo: 'O Código do Pistoleiro', texto: [
      'Há muitos tipos de pistoleiros no mundo, cada um com suas próprias crenças e costumes. Mas todos, sem exceção, acreditam em duas coisas: honra e pólvora. Certo, eles também acreditam que um verdadeiro pistoleiro não se rende a certas firulas, cultos e subordinações. Enfim, um pistoleiro não usa armaduras pesadas e escudos, nem armas que não sejam pistolas ou outras armas de fogo leves ou de uma mão (uma honrosa exceção é feita para versões híbridas dessas armas e adagas). Você pode mentir e trapacear à vontade, mas uma vez que tenha dado sua palavra ou feito uma promessa, ela é lei. Por fim, nada de cultuar deuses, seguir organizações formais ou ter qualquer tipo de título ou honraria oficial. Ah, e nada de lançar magias! Seus disparos são toda a mágica de que você precisa.',
      'A essa altura você já sabe como a banda toca, certo? Se pisar fora da linha e violar o código, seus PM vão-se embora mais rápido que uma bala e você só vai vê-los no dia seguinte.',
    ] },
    texto: [
    'Marca da distinção. “Em Smokestone, a honra é fundamental. Você é respeitado de acordo com seus atos e todos acreditam naquilo que você os faz acreditar.”',
    'Você recebe +2 em rolagens de dano com armas de fogo leves e de uma mão. Contudo, você passa a seguir o Código do Pistoleiro (veja o quadro).',
  ] },
  { id: 'dist-pistoleiro-rapido-no-gatilho', nome: 'Rápido no Gatilho', grupo: 'distincao', livro: 'herois', pagina: 203,
    tags: 'Pistoleiro de Smokestone', distincao: 'pistoleiro-de-smokestone', marca: false, deus: null, magica: false,
    preReq: 'proficiência com armas de fogo, Saque Rápido', custo: null, quadro: null, texto: [
    '“Você chama o infeliz para um duelo, olha bem nos olhos, saca primeiro e manda ele para o reino dos pés-juntos.”',
    'Você recebe +2 em Iniciativa para cada poder da distinção que possui e, se for o primeiro na iniciativa, seus inimigos ficam desprevenidos contra você nessa rodada. Além disso, seu multiplicador de crítico contra criaturas desprevenidas aumenta em +1.',
  ] },
  { id: 'dist-pistoleiro-balada-do-pistoleiro', nome: 'Balada do Pistoleiro', grupo: 'distincao', livro: 'herois', pagina: 203,
    tags: 'Pistoleiro de Smokestone', distincao: 'pistoleiro-de-smokestone', marca: false, deus: null, magica: false,
    preReq: 'Morrer não é Muita Vida', custo: null, quadro: null, texto: [
    '“Vou dar a vocês uma última chance de desistir...”',
    'Se estiver empunhando uma ou mais armas de fogo, você pode gastar uma ação completa e uma quantidade de PM a sua escolha (limitada pela quantidade de munição dessas armas) para desferir uma série de disparos com elas. Faça um ataque à distância contra cada inimigo a sua escolha, até um limite de inimigos igual ao total de PM gastos. Então faça uma única rolagem de dano com um dado extra de dano do mesmo tipo e aplique-a em cada inimigo atingido.',
  ] },
  { id: 'dist-pistoleiro-buscar-cobertura', nome: 'Buscar Cobertura', grupo: 'distincao', livro: 'herois', pagina: 203,
    tags: 'Pistoleiro de Smokestone', distincao: 'pistoleiro-de-smokestone', marca: false, deus: null, magica: false,
    preReq: 'Rápido no Gatilho', custo: null, quadro: null, texto: [
    '“Um pistoleiro sabe a hora de atirar e a hora de correr.”',
    'Uma vez por rodada, você pode gastar 1 PM para se mover até uma cobertura que possa alcançar com seu deslocamento (desde que tenha um caminho desimpedido até ela).',
  ] },
  { id: 'dist-pistoleiro-fornecedor-de-smokestone', nome: 'Fornecedor de Smokestone', grupo: 'distincao', livro: 'herois', pagina: 203,
    tags: 'Pistoleiro de Smokestone', distincao: 'pistoleiro-de-smokestone', marca: false, deus: null, magica: false,
    preReq: 'Rápido no Gatilho', custo: null, quadro: null, texto: [
    '“Eu conheço um cara…”',
    'Quando chega em uma comunidade equivalente a uma vila ou maior, você pode gastar 2 PM para fazer um teste de Carisma (CD 10). Se passar, enquanto estiver nessa comunidade, pode comprar armas de fogo de qualquer tipo e suas munições com 20% de desconto (não cumulativo com barganha e outros descontos) e pode conseguir qualquer cuidado ou manutenção necessários para essas armas.',
  ] },
  { id: 'dist-pistoleiro-morrer-nao-e-muita-vida', nome: 'Morrer não é Muita Vida', grupo: 'distincao', livro: 'herois', pagina: 203,
    tags: 'Pistoleiro de Smokestone', distincao: 'pistoleiro-de-smokestone', marca: false, deus: null, magica: false,
    preReq: 'Buscar Cobertura', custo: null, quadro: null, texto: [
    '“A vida é dura, mas eu sou mais.”',
    'Você aprendeu a se defender com o que tem. Quando se move 6m ou mais, você recebe +2 na Defesa e em Reflexos. Além disso, carrega um amuleto da sorte, como um tibar ou uma garrafinha de metal, que já salvou sua vida mais de uma vez. Uma vez por cena, quando sofre dano que o levaria a 0 PV ou menos, você pode ignorar esse dano.',
  ] },
  { id: 'dist-pistoleiro-viajante-das-planicies', nome: 'Viajante das Planícies', grupo: 'distincao', livro: 'herois', pagina: 203,
    tags: 'Pistoleiro de Smokestone', distincao: 'pistoleiro-de-smokestone', marca: false, deus: null, magica: false,
    preReq: 'treinado em Cavalgar, Rápido no Gatilho', custo: null, quadro: null, texto: [
    '“Você não trouxe um cavalo a menos, trouxe dois a mais…”',
    'Você recebe um cavalo de guerra parceiro veterano. Caso já possua uma montaria fornecida por outra habilidade, em vez disso essa montaria se torna também um parceiro vigilante iniciante. Em ambos os casos, nessa montaria você não sofre a penalidade em testes de ataque à distância enquanto montado. Caso perca sua montaria, você pode treinar outra com uma semana de trabalho.',
  ] },

  //  Professor de Magia (p. 204–207) — 1 marca + 5 poderes. Docentes da
  //  Academia Arcana. Escalam Pedagogia Mágica (usos por aluno) e Orgulho
  //  do Mestre (PM temporários). ✦: Pena e Pergaminho (marca).
  { id: 'dist-professor-pena-e-pergaminho', nome: 'Pena e Pergaminho', grupo: 'distincao', livro: 'herois', pagina: 206,
    tags: 'Professor de Magia', distincao: 'professor-de-magia', marca: true, deus: null, magica: true,
    preReq: null, custo: null, quadro: null, texto: [
    'Marca da distinção. Wynna e Tanna-Toh sorriem para aqueles que se dedicam ao ensino.',
    'Você aprende e pode lançar uma magia de adivinhação, arcana ou divina, a sua escolha, de qualquer círculo a que tenha acesso.',
  ] },
  { id: 'dist-professor-pedagogia-magica', nome: 'Pedagogia Mágica', grupo: 'distincao', livro: 'herois', pagina: 206,
    tags: 'Professor de Magia', distincao: 'professor-de-magia', marca: false, deus: null, magica: false,
    preReq: 'lançar magias de 2º círculo, Foco em Perícia (Misticismo)', custo: null, quadro: null, texto: [
    'Um professor de magia domina meios peculiares de transmissão do conhecimento.',
    'Você pode gastar 1 hora e 1 PM para lecionar para uma quantidade de alunos igual à sua Inteligência. Escolha uma de suas magias de 1º círculo. Até o próximo dia, cada aluno pode lançar essa magia uma única vez, pagando seu custo normal (atributo-chave Inteligência). Para cada outros dois poderes da distinção que você possui, cada aluno pode lançar a magia “aprendida” uma vez adicional no mesmo dia. Se o aluno já conhecia essa magia, pode lançá-la esse número de vezes com custo diminuído em –1 PM.',
  ] },
  { id: 'dist-professor-introducao-a-magia', nome: 'Introdução à Magia', grupo: 'distincao', livro: 'herois', pagina: 206,
    tags: 'Professor de Magia', distincao: 'professor-de-magia', marca: false, deus: null, magica: false,
    preReq: 'Pedagogia Mágica', custo: null, quadro: null, texto: [
    'Alunos nessa etapa de aprendizado precisam de tutoria mais próxima e atenta.',
    'Você e seus aliados em alcance curto recebem +2 em Misticismo e Vontade. Além disso, sempre que você lança uma magia, o custo das magias de seus aliados diminui em –1 PM por 1 rodada.',
  ] },
  { id: 'dist-professor-demonstracoes-praticas', nome: 'Demonstrações Práticas', grupo: 'distincao', livro: 'herois', pagina: 206,
    tags: 'Professor de Magia', distincao: 'professor-de-magia', marca: false, deus: null, magica: false,
    preReq: null, custo: null, quadro: null, texto: [
    'Nessa fase do aprendizado, exemplos práticos falam mais alto do que qualquer outra coisa…',
    'Quando um inimigo falha em um teste de resistência contra uma de suas magias, você pode fazer um teste de Misticismo para ajudar. Até a próxima rodada, cada aliado em alcance curto recebe um bônus em Misticismo e na CD de suas magias igual ao bônus fornecido por essa ajuda.',
  ] },
  { id: 'dist-professor-notorio-saber-arcano', nome: 'Notório Saber Arcano', grupo: 'distincao', livro: 'herois', pagina: 207,
    tags: 'Professor de Magia', distincao: 'professor-de-magia', marca: false, deus: null, magica: false,
    preReq: 'Orgulho do Mestre, dois poderes de aprimoramento', custo: null, quadro: null, texto: [
    'Todo o respeito da Academia pelos mestres de notório saber.',
    'Você recebe um assistente, um parceiro veterano a sua escolha entre adepto e magivocador. Além disso, o custo adicional de seus poderes de aprimoramento diminui em –1 PM (somente com magias arcanas).',
  ] },
  { id: 'dist-professor-orgulho-do-mestre', nome: 'Orgulho do Mestre', grupo: 'distincao', livro: 'herois', pagina: 207,
    tags: 'Professor de Magia', distincao: 'professor-de-magia', marca: false, deus: null, magica: false,
    preReq: 'Demonstrações Práticas', custo: null, quadro: null, texto: [
    'Um verdadeiro professor vibra profundamente com as vitórias de seus alunos.',
    'Sempre que um inimigo falha em um teste de resistência contra uma magia de um aliado em alcance curto, se essa magia custou pelo menos 1 PM, você recebe 1 PM temporário cumulativo. Você pode ganhar um máximo de PM temporários por cena igual ao dobro do número de poderes da distinção que possui, e eles desaparecem no fim da cena.',
  ] },

  //  Senador (p. 207–210) — 1 marca + 5 poderes. Políticos minotauros do
  //  Império de Tauron (o box "O Curso de Honra" é lore, não vira quadro).
  //  Escalam Cofres Fundos (fundos e itens), Apoio Popular (nível dos
  //  parceiros), Inocência Convicta e Um Minotauro de Bem. Nenhum ✦.
  { id: 'dist-senador-retorica-impecavel', nome: 'Retórica Impecável', grupo: 'distincao', livro: 'herois', pagina: 208,
    tags: 'Senador', distincao: 'senador', marca: true, deus: null, magica: false,
    preReq: null, custo: null, quadro: null, texto: [
    'Marca da distinção. Enquanto as legiões lutam com gládios e escudos, o senador luta com palavras.',
    'Você recebe +2 em Nobreza e pode usar Carisma como atributo-chave dessa perícia (em vez de Inteligência).',
  ] },
  { id: 'dist-senador-cofres-fundos', nome: 'Cofres Fundos', grupo: 'distincao', livro: 'herois', pagina: 209,
    tags: 'Senador', distincao: 'senador', marca: false, deus: null, magica: false,
    preReq: 'treinado em Diplomacia e Nobreza', custo: null, quadro: null, texto: [
    'Um senador que trabalha para o povo é a garantia de impostos bem gastos.',
    'Uma vez por aventura, você pode receber fundos do Senado. Faça um teste de Carisma com um bônus de +4 por poder da distinção. Você recebe um número de tibares de ouro igual ao resultado do teste. Se tiver pelo menos três poderes da distinção, também pode requisitar um item mágico menor, que deve ser devolvido (ou reembolsado) ao Senado no fim da aventura. Se tiver cinco poderes da distinção, o item requisitado pode ser médio. O uso deste poder é condicionado ao local onde você se encontra e a sua possibilidade de contactar o Senado ou seus representantes.',
  ] },
  { id: 'dist-senador-apoio-popular', nome: 'Apoio Popular', grupo: 'distincao', livro: 'herois', pagina: 209,
    tags: 'Senador', distincao: 'senador', marca: false, deus: null, magica: false,
    preReq: 'Um Minotauro de Bem', custo: null, quadro: null, texto: [
    'A voz do povo é a voz do Senado.',
    'Você pode usar o poder Autoridade Feudal (Tormenta20, p. 79). Se já o possui, pode conclamar dois parceiros pagando os custos de cada um. Para cada dois outros poderes da distinção, o nível desses parceiros aumenta em um (de iniciante para veterano, de veterano para mestre).',
  ] },
  { id: 'dist-senador-deliberacao-desnorteante', nome: 'Deliberação Desnorteante', grupo: 'distincao', livro: 'herois', pagina: 209,
    tags: 'Senador', distincao: 'senador', marca: false, deus: null, magica: false,
    preReq: 'Cofres Fundos', custo: null, quadro: null, texto: [
    'Sua argumentação complexa e intrincada é capaz de deixar seus adversários sem reação.',
    'Quando usa uma habilidade que exige um teste de Vontade, você pode gastar 1 PM. Se fizer isso, as criaturas que falharem nesse teste ficam pasmas por 1 rodada (uma vez por cena).',
  ] },
  { id: 'dist-senador-inocencia-convicta', nome: 'Inocência Convicta', grupo: 'distincao', livro: 'herois', pagina: 209,
    tags: 'Senador', distincao: 'senador', marca: false, deus: null, magica: false,
    preReq: 'Um Minotauro de Bem', custo: null, quadro: null, texto: [
    '“É uma mentira da Legião Imperial! Mentira da Legião Imperial! Mentira!”',
    'Quando falha em um teste de resistência, você pode gastar 2 PM para rolar novamente, usando Nobreza em vez da perícia original, com um bônus igual ao total de poderes da distinção que você possui.',
  ] },
  { id: 'dist-senador-um-minotauro-de-bem', nome: 'Um Minotauro de Bem', grupo: 'distincao', livro: 'herois', pagina: 209,
    tags: 'Senador', distincao: 'senador', marca: false, deus: null, magica: false,
    preReq: 'Cofres Fundos', custo: null, quadro: null, texto: [
    'Um senador é reconhecido como um membro honrado e prestigioso da sociedade.',
    'Você recebe +1 em testes de perícias baseadas em Carisma e na CD dos testes de Vontade para resistir às suas habilidades. Para cada outro poder da distinção, esses bônus aumentam em +1.',
  ] },

  //  Vigarista (p. 210–213) — 1 marca + 5 poderes. Golpistas de charme e
  //  cara de pau. Escalam Aquele Papinho, Efeito Placebo (poções) e
  //  Relíquias Sagradas. Nenhum ✦ (é tudo magia SIMULADA/farsa).
  { id: 'dist-vigarista-tirar-leite-de-pedra', nome: 'Tirar Leite de Pedra', grupo: 'distincao', livro: 'herois', pagina: 213,
    tags: 'Vigarista', distincao: 'vigarista', marca: true, deus: null, magica: false,
    preReq: null, custo: null, quadro: null, texto: [
    'Marca da distinção. Onde os outros veem miséria, o vigarista vê oportunidade.',
    'Quando está em qualquer tipo de comunidade, você pode usar Enganação para fazer testes de sustento (Tormenta20, p. 128) com pequenos golpes: vendendo poções falsas, lixo como relíquias sagradas ou qualquer outro produto enganoso. Você leva 1 dia, em vez de uma semana, para fazer esse teste, e recebe um bônus de +2 em cidades, +5 em vilas e +10 em aldeias. Se falhar em um teste, não pode tentar de novo na mesma comunidade durante um mês… e, se rolar 1 natural no teste, é desmascarado pela população!',
  ] },
  { id: 'dist-vigarista-aquele-papinho', nome: 'Aquele Papinho', grupo: 'distincao', livro: 'herois', pagina: 213,
    tags: 'Vigarista', distincao: 'vigarista', marca: false, deus: null, magica: false,
    preReq: 'treinado em Enganação, Aparência Inofensiva', custo: null, quadro: null, texto: [
    'Uma boa conversa, uma cara inocente… e o vigarista tem seu alvo na palma da sua mão.',
    'Você recebe +1 em Diplomacia, Enganação e Intuição e na CD de suas habilidades (exceto magias) baseadas em Carisma. Esses bônus aumentam em +1 para cada outro poder da distinção que você possuir.',
  ] },
  { id: 'dist-vigarista-calma-la', nome: 'Calma Lá', grupo: 'distincao', livro: 'herois', pagina: 213,
    tags: 'Vigarista', distincao: 'vigarista', marca: false, deus: null, magica: false,
    preReq: 'Aquele Papinho', custo: null, quadro: null, texto: [
    'Uma língua rápida é vital para quem vive de passar os outros para trás.',
    'Você não sofre a penalidade de –10 por fazer um teste de Diplomacia para mudar atitude como uma ação completa e, quando a primeira rodada de combate se inicia, pode fazer um desses testes antes de todos os participantes agirem. Se mudar a atitude de algum inimigo para indiferente ou melhor dessa forma, em vez disso ele fica pasmo por 1 rodada.',
  ] },
  { id: 'dist-vigarista-efeito-placebo', nome: 'Efeito Placebo', grupo: 'distincao', livro: 'herois', pagina: 213,
    tags: 'Vigarista', distincao: 'vigarista', marca: false, deus: null, magica: false,
    preReq: 'Aquele Papinho', custo: null, quadro: null, texto: [
    '“Mas é claro que funciona! Eu mentiria para você?”',
    'Para cada poder da distinção, escolha uma magia de 1º círculo, arcana ou divina, que possa ser transformada em poção. Você pode gastar uma ação completa e 3 PM para transformar um de seus misteriosos elixires de água com açúcar em uma poção de uma dessas magias instantaneamente (atributo-chave Carisma). O custo do item é reduzido à metade e você não precisa fazer o teste de Ofício (alquimista), mas a poção só dura até o fim da cena.',
  ] },
  { id: 'dist-vigarista-na-cara-nao', nome: 'Na Cara Não!', grupo: 'distincao', livro: 'herois', pagina: 213,
    tags: 'Vigarista', distincao: 'vigarista', marca: false, deus: null, magica: false,
    preReq: 'Aquele Papinho, Rolamento Defensivo', custo: null, quadro: null, texto: [
    'A melhor forma de vencer uma briga é nunca entrar nela… Mas, se o trobo já foi para o brejo, o vigarista sabe pelo menos evitar o pior.',
    'Quando usa Rolamento Defensivo, você recebe um uso adicional de Aparência Inofensiva nessa cena.',
  ] },
  { id: 'dist-vigarista-reliquias-sagradas', nome: 'Relíquias Sagradas', grupo: 'distincao', livro: 'herois', pagina: 213,
    tags: 'Vigarista', distincao: 'vigarista', marca: false, deus: null, magica: false,
    preReq: 'Calma Lá, Efeito Placebo', custo: null, quadro: null, texto: [
    'Certos vigaristas conseguem enredar até os deuses em sua teia de mentiras.',
    'Você pode enfeitar um item mundano com motivos religiosos para que ele se pareça com um acessório mágico menor a sua escolha. Fazer isso gasta 1 hora de trabalho e 1/100 do preço do acessório. Para usar a “relíquia” primeiro você precisa empunhá-la (ou vesti-la) e gastar uma ação de movimento e 2 PM para professar seus poderes em voz alta. Se fizer isso, ela funciona como se fosse verdadeira até o fim da cena, ou até você ativar outra de suas relíquias. Você pode ter até uma relíquia sagrada por poder da distinção que possuir.',
  ] },


  // ══════════════════════════════════════════════════════════════════
  //  DISTINÇÕES · Deuses de Arton, cap. 2 (p. 66–141) — 23 distinções
  //  O segundo livro com distinções, e a contraparte RELIGIOSA do
  //  capítulo do Heróis: todas são de devoto. Mesmo formato e mesmo
  //  motor de escalonamento (js/ficha-distincoes.js) — muda só o
  //  `livro: 'deuses'` e o campo `deus`, que aqui finalmente é usado:
  //  ele vira a etiqueta do deus no cartão e entra na busca.
  //  Importadas em levas de três, a partir de 05/10/2026.
  //  Progresso e decisões em docs/distincoes-progresso.md.
  // ══════════════════════════════════════════════════════════════════

  //  Bufão de Hyninn (p. 70–72) — 1 marca + 5 poderes.
  { id: 'dist-bufao-chapeu-do-bobo', nome: 'Chapéu do Bobo', grupo: 'distincao', livro: 'deuses', pagina: 71,
    tags: 'Bufão de Hyninn', distincao: 'bufao-de-hyninn', marca: true, deus: 'Hyninn', magica: false,
    preReq: null, custo: null, quadro: null, texto: [
    'Marca da distinção. Um bobo da corte precisa parecer berrante, chamativo e inerentemente engraçado.',
    'Você recebe um gorro com guizos, um item de vestuário que não ocupa espaços nem conta em seu limite de itens vestidos. Ele permite usar Músicas de Bardo sem precisar empunhar um instrumento musical e fornece +2 em Atuação e Enganação, mas impõe –2 em Diplomacia e Intimidação e só funciona com você.',
  ] },
  { id: 'dist-bufao-cabriolas-de-bobo', nome: 'Cabriolas de Bobo', grupo: 'distincao', livro: 'deuses', pagina: 71,
    tags: 'Bufão de Hyninn', distincao: 'bufao-de-hyninn', marca: false, deus: 'Hyninn', magica: true,
    preReq: 'devoto de Hyninn, treinado em Acrobacia e Atuação', custo: null,
    quadro: { titulo: 'Cabriolas de Bobo', texto: [
      'Cambalhotas, brincadeiras e bobagens em geral que podem ser empregadas por um bufão de Hyninn para gerar vários efeitos mágicos. Cabriolas contam como Música de Bardo e seguem suas regras (Tormenta20, p. 45). ✦',
      'Deboche Mágico. Escolha uma criatura no alcance e faça um teste de Atuação. Até o fim da cena, na próxima vez que usar uma habilidade mágica, a criatura deve passar em um teste de Vontade (CD igual ao resultado do seu teste de Atuação). Se ela falhar, a habilidade não funciona e quaisquer custos pagos são perdidos. Mental.',
      'Humor Macabro. Escolha uma criatura no alcance. Até o fim da cena, na próxima vez que você ou um aliado causar dano a essa criatura, outra criatura pode fazer um ataque corpo a corpo contra ela como uma reação.',
      'Humor Macabro em Massa. Como Humor Macabro, mas afeta cada criatura a sua escolha no alcance. Pré-requisito: Humor Macabro.',
      'Imitação Irritante. Faça um teste de Atuação oposto ao teste de Vontade de uma criatura no alcance. Se você vencer, até o início do seu próximo turno o alvo sofre uma penalidade de –5 em quaisquer testes de perícia que já tenha usado nessa cena. Mental.',
      'Passo Hilariante. Faça um teste de Atuação oposto ao teste de Vontade de uma criatura no alcance. Se você vencer, ela fica pasma por 1 rodada (apenas uma vez por cena) e vulnerável por 1d4+1 rodadas. Se você perder, ela fica vulnerável por 1 rodada.',
      'Passo Hilariante em Massa. Como Passo Hilariante, mas afeta cada criatura a sua escolha no alcance. Pré-requisito: Passo Hilariante.',
      'Pirueta Desajeitada. Faça um teste de Atuação oposto pelo teste de Vontade de cada criatura a sua escolha no alcance. Alvos que percam ficam enredados (nos próprios pés) por 1d4+1 rodadas e caídos. Alvos que passem ficam enredados por 1 rodada. Movimento.',
      'Rir da Desgraça Alheia. Faça um teste de Atuação oposto ao teste de Vontade de uma criatura no alcance. Se você vencer, até o fim da cena, sempre que ela falhar em um teste de perícia, sofre uma penalidade cumulativa de –1 nessa perícia até o fim da cena (limitada por seu total de poderes da distinção). Mental.',
    ] },
    texto: [
    'O bufão de Hyninn deve ser capaz de entreter os mais diversos públicos.',
    'Escolha duas cabriolas (veja o quadro). Uma vez feita, essa escolha não pode ser mudada. A cada outro poder da distinção você pode escolher uma nova cabriola.',
  ] },
  { id: 'dist-bufao-arremedar', nome: 'Arremedar', grupo: 'distincao', livro: 'deuses', pagina: 72,
    tags: 'Bufão de Hyninn', distincao: 'bufao-de-hyninn', marca: false, deus: 'Hyninn', magica: false,
    preReq: 'Cabriolas de Bobo', custo: null, quadro: null, texto: [
    'O bufão sabe ridicularizar seus inimigos a ponto de condená-los ao fracasso.',
    'Uma vez por rodada, quando uma criatura em alcance curto que você possa ver faz um teste de perícia, você pode imitá-la da forma mais ridícula possível. Faça um teste de Atuação para ajudar, mas em vez de fornecer um bônus, você impõe uma penalidade ao teste da criatura.',
  ] },
  { id: 'dist-bufao-piada-mortal', nome: 'Piada Mortal', grupo: 'distincao', livro: 'deuses', pagina: 72,
    tags: 'Bufão de Hyninn', distincao: 'bufao-de-hyninn', marca: false, deus: 'Hyninn', magica: false,
    preReq: 'Cabriolas de Bobo, Canção Assustadora', custo: '6 PM', quadro: null, texto: [
    '“Um deheoni, um ahleniense e um sambur entram numa taverna…”',
    'Você pode gastar uma ação completa e 6 PM para contar uma piada tão hilária que o resto da vida parece perder o sentido. Faça um teste de Atuação oposto pela Vontade de uma criatura inteligente (Int –3 ou maior) em alcance curto. Se você vencer, a criatura deve gastar sua próxima ação padrão para atacar a si mesma da maneira mais eficiente possível. Uma criatura só pode ser alvo deste poder uma vez por cena. Mental.',
  ] },
  { id: 'dist-bufao-quem-ri-por-ultimo', nome: 'Quem Ri Por Último…', grupo: 'distincao', livro: 'deuses', pagina: 72,
    tags: 'Bufão de Hyninn', distincao: 'bufao-de-hyninn', marca: false, deus: 'Hyninn', magica: false,
    preReq: 'Cabriolas de Bobo', custo: null, quadro: null, texto: [
    '…ri melhor.',
    'Enquanto você for o último na ordem de iniciativa, você recebe +1 em testes de perícia e na CD de suas habilidades contra criaturas que já tenham agido na rodada. Esses bônus aumentam em +1 para cada dois outros poderes da distinção que você possui.',
  ] },
  { id: 'dist-bufao-rir-de-tudo', nome: 'Rir de Tudo', grupo: 'distincao', livro: 'deuses', pagina: 72,
    tags: 'Bufão de Hyninn', distincao: 'bufao-de-hyninn', marca: false, deus: 'Hyninn', magica: false,
    preReq: 'Arremedar', custo: '3 PM', quadro: null, texto: [
    'Um bufão consegue achar graça de tudo, mesmo da própria desgraça.',
    'Uma vez por cena, quando fizer um teste de resistência contra uma habilidade de um inimigo, você pode gastar 3 PM para usar Atuação no lugar da perícia apropriada. Se fizer isso e passar no teste, você reverte o efeito: qualquer dano ou perda de vida se torna pontos de vida temporários (que desaparecem ao fim da cena) e qualquer penalidade numérica se torna um bônus equivalente até o fim da cena.',
  ] },

  //  Cavaleiro da Luz (p. 73–75) — 1 marca + 5 poderes.
  { id: 'dist-cav-luz-etiqueta', nome: 'Etiqueta da Ordem da Luz', grupo: 'distincao', livro: 'deuses', pagina: 75,
    tags: 'Cavaleiro da Luz', distincao: 'cavaleiro-da-luz', marca: true, deus: 'Khalmyr', magica: false,
    preReq: null, custo: null, quadro: null, texto: [
    'Marca da distinção. Um cavaleiro da Luz é treinado tanto em enfrentar o mal quanto em lidar com a nobreza.',
    'Você segue tanto o Código de Honra da classe cavaleiro quanto as Obrigações & Restrições de Khalmyr. Contudo, soma seu Carisma em Guerra e Nobreza, e consegue hospedagem confortável e informações em qualquer lugar afiliado à Ordem da Luz.',
  ] },
  { id: 'dist-cav-luz-ataque-subjugante', nome: 'Ataque Subjugante', grupo: 'distincao', livro: 'deuses', pagina: 75,
    tags: 'Cavaleiro da Luz', distincao: 'cavaleiro-da-luz', marca: false, deus: 'Khalmyr', magica: false,
    preReq: 'treinado em Luta, Car 1', custo: '2 PM', quadro: null, texto: [
    'O golpe do cavaleiro da Luz faz seus inimigos se ajoelharem.',
    'Quando faz um ataque com uma arma corpo a corpo, você pode gastar 2 PM para desferir um golpe subjugante. Você soma seu Carisma no teste de ataque e +1d8 na rolagem de dano (se já soma seu Carisma no ataque, em vez disso recebe +2 no teste). Se causar dano, deixa o alvo vulnerável.',
  ] },
  { id: 'dist-cav-luz-alazao-impressionante', nome: 'Alazão Impressionante', grupo: 'distincao', livro: 'deuses', pagina: 75,
    tags: 'Cavaleiro da Luz', distincao: 'cavaleiro-da-luz', marca: false, deus: 'Khalmyr', magica: false,
    preReq: 'treinado em Cavalgar, Ataque Subjugante', custo: null, quadro: null, texto: [
    'A montaria de um cavaleiro é um sinal de seu compromisso com a justiça.',
    'Você recebe um cavalo de guerra parceiro veterano. Caso já possua uma montaria fornecida por outra habilidade, em vez disso essa montaria se torna também um parceiro ajudante iniciante. Caso perca sua montaria, você pode receber outra visitando o Castelo da Luz.',
  ] },
  { id: 'dist-cav-luz-alcunha', nome: 'Alcunha', grupo: 'distincao', livro: 'deuses', pagina: 75,
    tags: 'Cavaleiro da Luz', distincao: 'cavaleiro-da-luz', marca: false, deus: 'Khalmyr', magica: false,
    preReq: 'Ataque Subjugante', custo: null, quadro: null, texto: [
    'A alcunha de um cavaleiro abre portas e amedronta os corações dos inimigos.',
    'Quando faz um teste de uma perícia baseada em Carisma, você pode gastar uma quantidade de PM limitada pelo total de poderes da distinção que possui. Para cada PM que gastar, recebe +2 no teste.',
  ] },
  { id: 'dist-cav-luz-armadura-integridade', nome: 'Armadura da Integridade', grupo: 'distincao', livro: 'deuses', pagina: 75,
    tags: 'Cavaleiro da Luz', distincao: 'cavaleiro-da-luz', marca: false, deus: 'Khalmyr', magica: false,
    preReq: 'treinado em Diplomacia, Alcunha', custo: '3 PM', quadro: null, texto: [
    'As armas dos inimigos fraquejam diante da honra do cavaleiro da Luz.',
    'Na primeira rodada de um combate, você pode gastar uma ação de movimento e 3 PM para fazer um teste de Diplomacia. Para cada 10 pontos no resultado desse teste, seus inimigos em alcance médio sofrem –1 em rolagens de dano até o fim da cena ou até você ficar inconsciente.',
  ] },
  { id: 'dist-cav-luz-chamado-as-armas', nome: 'Chamado às Armas', grupo: 'distincao', livro: 'deuses', pagina: 75,
    tags: 'Cavaleiro da Luz', distincao: 'cavaleiro-da-luz', marca: false, deus: 'Khalmyr', magica: false,
    preReq: 'Comandar, quatro outros poderes de cavaleiro da Luz', custo: '3 PM', quadro: null, texto: [
    'A ordem de um cavaleiro da Luz é irrecusável, até para seus aliados.',
    'Uma vez por rodada, você pode gastar uma ação de movimento e 3 PM para encorajar seus companheiros. Até o início do seu próximo turno, você e seus aliados em alcance curto que fizerem uma ação agredir podem fazer um ataque adicional.',
  ] },

  //  Cavaleiro de Khalmyr (p. 76–78) — 1 marca + 5 poderes.
  //  "Quanto maior a humilde, maior a força." é o que o livro IMPRIME
  //  (p. 78, conferido no -layout). Fica literal, como os outros
  //  deslizes de impressão do projeto.
  { id: 'dist-cav-khalmyr-seguir-a-norma', nome: 'Seguir a Norma', grupo: 'distincao', livro: 'deuses', pagina: 78,
    tags: 'Cavaleiro de Khalmyr', distincao: 'cavaleiro-de-khalmyr', marca: true, deus: 'Khalmyr', magica: false,
    preReq: null, custo: null,
    quadro: { titulo: 'Código da Norma', texto: [
      'Um cavaleiro de Khalmyr deve sempre manter sua palavra e nunca pode mentir, trapacear, roubar ou recusar o pedido de ajuda de um inocente. Também é proibido de possuir qualquer título (como a habilidade de cavaleiro e nobre), itens mágicos criados por não devotos de Khalmyr e qualquer objeto fora aquilo que for capaz de carregar consigo ou em sua montaria. Além disso, também não é permitido fixar residência por mais de 30 dias em uma comunidade (cidade, vila, aldeia...), não podendo receber benefícios de estruturas (como bases e domínios). Se violar o código, você perde todos os seus PM e só pode recuperá-los a partir do próximo dia.',
    ] },
    texto: [
    'Marca da distinção. Seguir a Norma tira parte da liberdade do cavaleiro, mas fortalece seu espírito',
    'Você segue o Código da Norma (veja o quadro) e recebe +2 em Fortitude e Vontade.',
  ] },
  { id: 'dist-cav-khalmyr-vitoria-da-ordem', nome: 'Vitória da Ordem', grupo: 'distincao', livro: 'deuses', pagina: 78,
    tags: 'Cavaleiro de Khalmyr', distincao: 'cavaleiro-de-khalmyr', marca: false, deus: 'Khalmyr', magica: false,
    preReq: 'devoto de Khalmyr, treinado em Luta', custo: '2 PM', quadro: null, texto: [
    'O desejo de derrotar os ímpios se manifesta na arma do cavaleiro de Khalmyr.',
    'Quando faz um ataque corpo a corpo, você pode gastar 2 PM para concentrar sua fé em seu golpe. Você soma sua Sabedoria no teste de ataque (se já faz isso, em vez disso recebe +2 no teste de ataque) e +1d8 na rolagem de dano.',
  ] },
  { id: 'dist-cav-khalmyr-campeao-abnegado', nome: 'Campeão Abnegado', grupo: 'distincao', livro: 'deuses', pagina: 78,
    tags: 'Cavaleiro de Khalmyr', distincao: 'cavaleiro-de-khalmyr', marca: false, deus: 'Khalmyr', magica: false,
    preReq: 'Ao Sabor do Destino, Vitória da Ordem', custo: null, quadro: null, texto: [
    'Quanto maior a humilde, maior a força.',
    'Os bônus concedidos por Ao Sabor do Destino são dobrados. Além disso, você pode usar itens litúrgicos fabricados por devotos de Khalmyr sem perder os benefícios do poder.',
  ] },
  { id: 'dist-cav-khalmyr-corcel-santificado', nome: 'Corcel Santificado', grupo: 'distincao', livro: 'deuses', pagina: 78,
    tags: 'Cavaleiro de Khalmyr', distincao: 'cavaleiro-de-khalmyr', marca: false, deus: 'Khalmyr', magica: false,
    preReq: 'treinado em Cavalgar, Vitória da Ordem', custo: null, quadro: null, texto: [
    'Montaria e cavaleiro são os únicos capazes de dividir o fardo pesado da Justiça.',
    'Você recebe um cavalo de guerra parceiro veterano. Caso já possua uma montaria fornecida por outra habilidade, em vez disso essa montaria se torna também um parceiro guardião iniciante. Caso perca sua montaria, você pode receber outra visitando o Mosteiro de Khalmyr.',
  ] },
  { id: 'dist-cav-khalmyr-graca-de-khalmyr', nome: 'Graça de Khalmyr', grupo: 'distincao', livro: 'deuses', pagina: 78,
    tags: 'Cavaleiro de Khalmyr', distincao: 'cavaleiro-de-khalmyr', marca: false, deus: 'Khalmyr', magica: false,
    preReq: 'Sab 2, Vitória da Ordem', custo: null, quadro: null, texto: [
    'A fé mantém o cavaleiro de pé, mesmo quando o mundo ao seu redor o faz querer desistir.',
    'Quando faz um teste de resistência ou sofre um ataque, você pode gastar uma quantidade de PM a sua escolha (limitada pela sua Sabedoria). Para cada PM que gastar, recebe +2 no teste ou na Defesa contra esse ataque.',
  ] },
  { id: 'dist-cav-khalmyr-manto-da-justica', nome: 'Manto da Justiça', grupo: 'distincao', livro: 'deuses', pagina: 78,
    tags: 'Cavaleiro de Khalmyr', distincao: 'cavaleiro-de-khalmyr', marca: false, deus: 'Khalmyr', magica: true,
    preReq: 'Vitória da Ordem e dois outros poderes da distinção', custo: '3 PM', quadro: null, texto: [
    'O cavaleiro é cercado por uma aura de convicção.',
    'Você pode gastar 3 PM para projetar uma aura de ordem com 9m de raio e duração sustentada. Dentro da aura, você se torna imune a efeitos de medo e mentais, você e seus aliados recebem redução de dano igual à sua Sabedoria e inimigos que comecem seus turnos dentro da aura ficam enjoados por 1d6 rodadas (Vontade CD Sab evita e a criatura fica imune a esta habilidade por 1 dia). ✦',
  ] },

  //  Colecionador Monstruoso (p. 79–81) — 1 marca + 5 poderes.
  { id: 'dist-colecionador-atraves-da-selvageria', nome: 'Através da Selvageria', grupo: 'distincao', livro: 'deuses', pagina: 80,
    tags: 'Colecionador Monstruoso', distincao: 'colecionador-monstruoso', marca: true, deus: 'Megalokk', magica: false,
    preReq: null, custo: null, quadro: null, texto: [
    'Marca da distinção. Você devorou as entranhas da selvageria.',
    'Quando usa Forma Selvagem, seu tipo muda para monstro e você recebe +1 no multiplicador de crítico com armas naturais.',
  ] },
  { id: 'dist-colecionador-forma-monstruosa', nome: 'Forma Monstruosa', grupo: 'distincao', livro: 'deuses', pagina: 80,
    tags: 'Colecionador Monstruoso', distincao: 'colecionador-monstruoso', marca: false, deus: 'Megalokk', magica: true,
    preReq: 'Forma Selvagem, devoto de Megalokk', custo: null,
    quadro: { titulo: 'Transformação Monstruosa', texto: [
      'Quando usa Forma Monstruosa, você pode gastar PM extras (que são somados ao custo da Forma Selvagem) para ganhar novas habilidades entre aquelas a que tem acesso. Para ter acesso a uma habilidade, você deve derrotar um monstro que a possua em sua ficha e se alimentar de seu corpo. A critério do mestre, outras habilidades parecidas podem atender esse requisito.',
      'Agarrar Aprimorado (+1 PM). Um de seus tipos de armas naturais (como “garras”) recebe +2 em testes para agarrar. Uma vez por rodada, quando acerta um ataque com essa arma, você pode gastar 1 PM para fazer a manobra agarrar com ela como ação livre contra a criatura atingida.',
      'Arma Natural Extra (+1 PM). Você recebe uma arma natural (dano 1d6 de corte, impacto ou perfuração a sua escolha, crítico x2) adicional. Uma vez por rodada, quando usa a ação agredir para atacar com outra arma, pode gastar 1 PM para fazer um ataque corpo a corpo extra com essa arma.',
      'Borrão de Tigre-de-Hyninn (+2 PM). Ataques contra você têm 25% de chance de falha. Você pode escolher esta habilidade uma segunda vez para aumentar a chance de falha para 50%.',
      'Brutalidade Incontida de Razza’kham (+1 PM). Sempre que rolar o resultado máximo em um dado de dano de uma arma natural, role um dado extra, repetindo até um limite de dados extras igual ao valor máximo do dado.',
      'Carapaça Espinhosa (+1 PM). Quando você sofre dano por um ataque corpo a corpo, o atacante sofre dano de perfuração igual a 1d6 + sua Constituição. Você pode escolher esta habilidade outras vezes para aumentar o dano em +1d6.',
      'Dilacerar (+1 PM). Se acertar dois ataques de garra em uma criatura na mesma rodada, você causa +2d8 pontos de dano de corte a ela.',
      'Meiose Glópica (+1 PM). Quando se transforma, você invoca 1d4+2 glops capangas em espaços desocupados em alcance curto. Você pode gastar uma ação de movimento para fazer os glops andarem (eles têm deslocamento normal e de escalada 6m) ou uma ação padrão para fazê-los causar dano a criaturas adjacentes (1d4 impacto mais 1d4 ácido cada). Os glops têm Defesa 10, 1 PV e falham automaticamente em qualquer teste de resistência ou oposto. Eles não contam em seu limite de parceiros e desaparecem quando morrem ou no fim da cena. Uma vez por rodada, quando sofre dano, você pode sacrificar um glop em alcance curto para reduzir o dano à metade.',
      'Órgão Elemental (+1 PM). Uma de suas armas naturais causa +1d6 pontos de dano de um tipo escolhido ao se transformar, entre ácido, eletricidade, fogo e frio. Você pode escolher esta habilidade outras vezes para armas diferentes.',
      'Regeneração (+1 PM). Uma vez por cena, você pode gastar 1 PM para receber Cura Acelerada 5. Esta habilidade termina quando tiver curado um total de 30 PV ou no fim da cena.',
      'Tentáculos (+1 PM). Uma de suas armas naturais é um tentáculo (dano de impacto) com +3m de alcance. Você pode escolher esta habilidade outras vezes para armas naturais diferentes.',
      'Veneno (+2 PM). Uma de suas armas naturais causa 1d12 de perda de vida por veneno. Você pode escolher esta habilidade outras vezes para armas naturais diferentes.',
    ] },
    texto: [
    'Rejeitando totalmente Allihanna, o colecionador monstruoso se transforma em algo terrível.',
    'Quando usa Forma Selvagem, você pode gastar PM adicionais (limitados pelo total de poderes da distinção que possui) para receber habilidades adicionais de criaturas que já devorou (veja o quadro) como parte de sua transformação. ✦',
  ] },
  { id: 'dist-colecionador-monstro-supremo', nome: 'Monstro Supremo', grupo: 'distincao', livro: 'deuses', pagina: 80,
    tags: 'Colecionador Monstruoso', distincao: 'colecionador-monstruoso', marca: false, deus: 'Megalokk', magica: false,
    preReq: 'Forma Selvagem Superior, ter usado Predação Monstruosa em um kaiju', custo: null, quadro: null, texto: [
    'A fome do colecionador monstruoso não tem fim.',
    'Quando usa Forma Selvagem Superior, você recebe o subtipo kaiju e ganha imunidade a efeitos de metabolismo e mentais, medo, metamorfose, paralisia e veneno, e seus ataques ignoram 20 pontos de RD.',
  ] },
  { id: 'dist-colecionador-predacao-monstruosa', nome: 'Predação Monstruosa', grupo: 'distincao', livro: 'deuses', pagina: 81,
    tags: 'Colecionador Monstruoso', distincao: 'colecionador-monstruoso', marca: false, deus: 'Megalokk', magica: false,
    preReq: 'Forma Monstruosa', custo: null, quadro: null, texto: [
    'Sua voracidade não pode ser controlada.',
    'Você pode gastar uma ação completa para devorar um monstro abatido. Se fizer isso, até o fim da aventura você recebe +10 PV e +1 em testes de ataque e rolagens de dano com armas naturais. Para cada outros dois poderes da distinção, você pode acumular esses efeitos uma vez.',
  ] },
  { id: 'dist-colecionador-selvageria-incontrolavel', nome: 'Selvageria Incontrolável', grupo: 'distincao', livro: 'deuses', pagina: 81,
    tags: 'Colecionador Monstruoso', distincao: 'colecionador-monstruoso', marca: false, deus: 'Megalokk', magica: false,
    preReq: 'Vigor Monstruoso', custo: null, quadro: null, texto: [
    'A fera em seu interior não será derrotada facilmente.',
    'Enquanto está em Forma Selvagem, você não fica inconsciente por estar com 0 PV ou menos (mas ainda morre se chegar em um valor negativo igual à metade de seus PV máximos).',
  ] },
  { id: 'dist-colecionador-vigor-monstruoso', nome: 'Vigor Monstruoso', grupo: 'distincao', livro: 'deuses', pagina: 81,
    tags: 'Colecionador Monstruoso', distincao: 'colecionador-monstruoso', marca: false, deus: 'Megalokk', magica: false,
    preReq: 'Forma Monstruosa', custo: null, quadro: null, texto: [
    'Sua transformação é pura monstruosidade.',
    'Quando usa Forma Selvagem, para cada 1 PM gasto nessa habilidade você recebe 3 PV temporários.',
  ] },

  //  Dançarina de Marah (p. 82–84) — 1 marca + 5 poderes.
  { id: 'dist-dancarina-graca-de-marah', nome: 'Graça de Marah', grupo: 'distincao', livro: 'deuses', pagina: 84,
    tags: 'Dançarina de Marah', distincao: 'dancarina-de-marah', marca: true, deus: 'Marah', magica: false,
    preReq: null, custo: null, quadro: null, texto: [
    'Marca da distinção. Para a dançarina de Marah, a arte é uma linguagem universal.',
    'Você soma sua Sabedoria em Atuação. Além disso, pode substituir testes de Diplomacia por testes de Atuação.',
  ] },
  { id: 'dist-dancarina-transe-dancante', nome: 'Transe Dançante', grupo: 'distincao', livro: 'deuses', pagina: 84,
    tags: 'Dançarina de Marah', distincao: 'dancarina-de-marah', marca: false, deus: 'Marah', magica: true,
    preReq: 'Foco em Perícia (Atuação), dois poderes concedidos de Marah', custo: '3 PM', quadro: null, texto: [
    'A beleza dos movimentos da dançarina de Marah transcende a realidade.',
    'Você pode gastar 3 PM para entrar em um transe dançante que gera uma aura de 9m de raio. Para manter esse transe, em cada um dos seus turnos você precisa se deslocar pelo menos 6m, sem passar pelos mesmos quadrados. Você e seus aliados dentro da aura podem executar uma ação de movimento adicional por turno e recebem +2 em testes de resistência e na Defesa. Para cada dois outros poderes da distinção que você possui, esse bônus aumenta em +1. ✦',
  ] },
  { id: 'dist-dancarina-contrapasso-do-espirito', nome: 'Contrapasso do Espírito', grupo: 'distincao', livro: 'deuses', pagina: 84,
    tags: 'Dançarina de Marah', distincao: 'dancarina-de-marah', marca: false, deus: 'Marah', magica: false,
    preReq: 'Transe Dançante', custo: null, quadro: null, texto: [
    'Mais do que entreter, a arte da dançarina de Marah guia os espíritos de seus aliados.',
    'Enquanto estiver em Transe Dançante, no início de cada um dos seus turnos, você e seus aliados dentro da aura recebem uma quantidade de PV temporários igual a 5 + seu Carisma.',
  ] },
  { id: 'dist-dancarina-danca-hipnotica', nome: 'Dança Hipnótica', grupo: 'distincao', livro: 'deuses', pagina: 84,
    tags: 'Dançarina de Marah', distincao: 'dancarina-de-marah', marca: false, deus: 'Marah', magica: false,
    preReq: 'Êxtase da Dançarina, três poderes concedidos de Marah', custo: null, quadro: null, texto: [
    'Os passos da dançarina induzem, incitam e movem de uma forma que não pode ser recusada.',
    'Se estiver em Transe Dançante, no início de cada um dos seus turnos, a categoria de atitude de cada inimigo dentro da aura melhora em um passo (apenas uma vez por cena) e ele fica fascinado (Vontade CD Car evita os efeitos e a criatura fica imune a esta habilidade até o fim da cena).',
  ] },
  { id: 'dist-dancarina-extase-da-dancarina', nome: 'Êxtase da Dançarina', grupo: 'distincao', livro: 'deuses', pagina: 84,
    tags: 'Dançarina de Marah', distincao: 'dancarina-de-marah', marca: false, deus: 'Marah', magica: false,
    preReq: 'Transe Dançante', custo: null, quadro: null, texto: [
    'Os passos da dançarina de Marah cativam até seus inimigos.',
    'Enquanto estiver em Transe Dançante, você soma o bônus do seu Transe na CD dos testes de Vontade das suas habilidades contra criaturas dentro da aura.',
  ] },
  { id: 'dist-dancarina-no-ritmo-da-magia', nome: 'No Ritmo da Magia', grupo: 'distincao', livro: 'deuses', pagina: 84,
    tags: 'Dançarina de Marah', distincao: 'dancarina-de-marah', marca: false, deus: 'Marah', magica: true,
    preReq: 'Transe Dançante', custo: null, quadro: null, texto: [
    'Os passos da dançarina de Marah são carregados de magia.',
    'Enquanto está em Transe Dançante, você pode lançar a magia Salto Dimensional (Tormenta20, p. 205). Caso aprenda essa magia, durante o Transe o custo dela diminui em –1 PM.',
  ] },

  //  Detetive de Tanna-Toh (p. 85–87) — 1 marca + 5 poderes, e TODOS os
  //  cinco escalam com o número de poderes da distinção.
  { id: 'dist-detetive-nada-alem-de-fatos', nome: 'Nada Além de Fatos', grupo: 'distincao', livro: 'deuses', pagina: 86,
    tags: 'Detetive de Tanna-Toh', distincao: 'detetive-de-tanna-toh', marca: true, deus: 'Tanna-Toh', magica: false,
    preReq: null, custo: null, quadro: null, texto: [
    'Marca da distinção. Ao se apoiar somente em fatos, o detetive de Tanna-Toh fortalece sua capacidade dedutiva.',
    'Você recebe +5 em Intuição e Investigação.',
  ] },
  { id: 'dist-detetive-tracar-perfil', nome: 'Traçar Perfil', grupo: 'distincao', livro: 'deuses', pagina: 86,
    tags: 'Detetive de Tanna-Toh', distincao: 'detetive-de-tanna-toh', marca: false, deus: 'Tanna-Toh', magica: false,
    preReq: 'devoto de Tanna-Toh, Investigador, Mente Analítica', custo: '2 PM', quadro: null, texto: [
    '“As botas do suspeito estavam sujas de lama, mas não havia chovido na noite anterior.”',
    'Você pode usar Investigação para identificar criaturas (veja Misticismo, em Tormenta20, p. 121) em quaisquer criaturas inteligentes (Int –3 ou maior). Quando identifica uma criatura dessa forma, além das informações recebidas, você pode gastar 2 PM para traçar seu perfil: até o fim da cena, você recebe +1 em testes de perícia e na CD de suas habilidades contra ela para cada poder da distinção que você possui.',
  ] },
  { id: 'dist-detetive-classificar-como-suspeito', nome: 'Classificar como Suspeito', grupo: 'distincao', livro: 'deuses', pagina: 86,
    tags: 'Detetive de Tanna-Toh', distincao: 'detetive-de-tanna-toh', marca: false, deus: 'Tanna-Toh', magica: false,
    preReq: 'Traçar Perfil', custo: null, quadro: null, texto: [
    'Para o detetive de Tanna-Toh são fatos, e não suposições, que tornam alguém suspeito.',
    'Quando usa Traçar Perfil, você pode classificar o alvo como um suspeito. Se fizer isso, os bônus fornecidos por esse poder duram até o fim da aventura e, quando faz um teste de Investigação ou Intuição contra essa criatura, você rola dois dados e usa o melhor resultado. Você pode ter um máximo de suspeitos por aventura igual ao total de poderes da distinção que possui. Você pode remover um suspeito de sua lista (para abrir espaço para outros), mas apenas se reunir provas que o eliminem como tal.',
  ] },
  { id: 'dist-detetive-elementar', nome: 'Elementar', grupo: 'distincao', livro: 'deuses', pagina: 87,
    tags: 'Detetive de Tanna-Toh', distincao: 'detetive-de-tanna-toh', marca: false, deus: 'Tanna-Toh', magica: false,
    preReq: 'Traçar Perfil', custo: null, quadro: null, texto: [
    'O detetive de Tanna-Toh aprende a ler cenas de crime como um livro.',
    'Você pode gastar 10 minutos para analisar a cena de um evento ocorrido há no máximo dois dias por poder da distinção que possui. Se fizer isso, você pode fazer um teste de Investigação para identificar criatura contra o responsável pelo evento (CD Int da criatura) como se ele estivesse presente — e pode usar Traçar Perfil contra ele como o normal —, mas não descobre sua identidade automaticamente. Se o evento foi cometido por mais de uma criatura, considere apenas o líder delas. Você só pode usar este poder uma vez por cena de crime.',
  ] },
  { id: 'dist-detetive-informantes', nome: 'Informantes', grupo: 'distincao', livro: 'deuses', pagina: 87,
    tags: 'Detetive de Tanna-Toh', distincao: 'detetive-de-tanna-toh', marca: false, deus: 'Tanna-Toh', magica: false,
    preReq: 'Traçar Perfil', custo: null,
    quadro: { titulo: 'Informantes', texto: [
      'Um informante é um NPC que auxilia o detetive de Tanna-Toh com conhecimento especializado. Ao contrário de parceiros, informantes não são aventureiros; eles não possuem a inclinação para se envolver em missões arriscadas, preferindo oferecer sua ajuda do conforto (e segurança) de seus lares ou locais de trabalho.',
      'O benefício de um informante só pode ser usado se o detetive puder visitá-lo ou tiver meios para contatá-lo. Uma vez por aventura, o detetive pode trocar a localização de seus informantes (isso significa que ele fez arranjos para realocar o informante, ou que simplesmente estabeleceu novos contatos no lugar de seus antigos).',
      'Aristocrata. Alguém com laços nas camadas mais elevadas da sociedade. Você pode usar o poder Favor (Tormenta20, p. 79). Se já tiver esse poder, em vez disso recebe +5 no teste de Diplomacia para obter o favor.',
      'Armeiro. Um artesão especialista em armas. Você pode usar Investigação no lugar de Ofício para identificar armas. Além disso, uma vez por aventura um de seus itens recebe uma melhoria a sua escolha que dura até o fim da aventura.',
      'Boticário. Um alquimista e comerciante de preparados. Você pode usar Investigação no lugar de Ofício para identificar itens alquímicos e poções. Além disso, uma vez por aventura, recebe itens alquímicos e poções a sua escolha com preço total de até T$ 200 por poder da distinção que possui.',
      'Curandeiro. Alguém versado em medicina. Você pode usar Investigação no lugar de Cura para necropsia e, uma vez por aventura, recebe três doses de um preparado alquímico experimental que duram até serem gastos ou até o fim da aventura. Usar esse preparado é uma ação de movimento e fornece cura acelerada 5 por um número de rodadas igual ao nível do usuário.',
      'Erudito. Um acadêmico capaz de auxiliá-lo em pesquisas e estudos. Uma vez por aventura, para cada poder da distinção você recebe 4d4 dados de consulta que duram até serem gastos ou até o fim da aventura. Sempre que fizer um teste de perícia baseada em Inteligência ou Sabedoria, você pode gastar até 2d4 e adicionar o resultado como um bônus no teste. Você pode usar esses dados após ter rolado o dado, mas antes de o mestre dizer ser passou ou não.',
      'Estalajadeiro. Uma estalagem pode ser um porto seguro e uma fonte de informações. Nela você tem descanso luxuoso e, quando faz um teste de Investigação para interrogar, rola dois dados e usa o melhor resultado.',
    ] },
    texto: [
    'O detetive de Tanna-Toh conta com uma rede de contatos especializados.',
    'Você possui um informante (veja o quadro) a sua escolha. A cada outro poder da distinção, você recebe um informante adicional.',
  ] },
  { id: 'dist-detetive-sequencia-dedutiva', nome: 'Sequência Dedutiva', grupo: 'distincao', livro: 'deuses', pagina: 87,
    tags: 'Detetive de Tanna-Toh', distincao: 'detetive-de-tanna-toh', marca: false, deus: 'Tanna-Toh', magica: false,
    preReq: 'Traçar Perfil', custo: null, quadro: null, texto: [
    'O que diferencia o detetive de Tanna-Toh é sua capacidade de deduções lógicas.',
    'Sempre que você passa em um teste de Investigação e sempre que você (o jogador) deduz uma informação relevante (a critério do mestre) sobre a aventura em questão, você recebe um bônus cumulativo de +1 em testes de perícias baseadas em Inteligência, Sabedoria e Carisma relacionados à aventura (limitado pelo total de poderes da distinção que você possui). Esses bônus diminuem em –1 se você falhar em um teste de Investigação e desaparecem no fim da aventura.',
  ] },

  //  Exegeta do Akzath (p. 88–91) — 1 marca + 2 poderes, e os dois são
  //  listas de conceitos (o livro imprime em marcadores dentro do próprio
  //  poder; aqui viram quadro, que é como a ficha mostra lista longa).
  //  Dois deslizes do livro ficam literais, conferidos no -layout da
  //  p. 90: "nesa mesma cena" (Morte) e "Azkath" (Conhecimento, que o
  //  resto do capítulo grafa Akzath).
  { id: 'dist-exegeta-compreender-o-akzath', nome: 'Compreender o Akzath', grupo: 'distincao', livro: 'deuses', pagina: 90,
    tags: 'Exegeta do Akzath', distincao: 'exegeta-do-akzath', marca: true, deus: 'Thwor', magica: false,
    preReq: null, custo: '1 PM', quadro: null, texto: [
    'Marca da distinção. O exegeta compreende a verdade das escrituras e pode empregá-la em toda a sua vida.',
    'No início de cada cena, escolha uma perícia. Até o fim da cena, sempre que fizer um teste da perícia escolhida, você pode gastar 1 PM para substituí-lo por um teste de Religião.',
  ] },
  { id: 'dist-exegeta-circulo-externo', nome: 'Círculo Externo', grupo: 'distincao', livro: 'deuses', pagina: 90,
    tags: 'Exegeta do Akzath', distincao: 'exegeta-do-akzath', marca: false, deus: 'Thwor', magica: false,
    preReq: 'treinado em Religião, devoto de Thwor', custo: null,
    quadro: { titulo: 'Conceitos da roda externa', texto: [
      'Vida. Quando você ou um aliado em alcance curto morre, você pode gastar 3 PM para que a criatura se mantenha viva por mais 1 rodada. Ela ainda sofre os demais efeitos do evento que a matou (como dano, condições etc.) e irá morrer na rodada seguinte, a menos que eles sejam revertidos ou dissipados. Você pode usar esta habilidade mesmo que esteja inconsciente. ✦',
      'Ignorância. Quando uma criatura em alcance curto faz um teste de perícia ou usa uma habilidade com CD, você pode gastar 3 PM para impor uma penalidade de –5 nesse teste ou nessa CD (apenas para esse uso). ✦',
      'Mudança. Você pode rezar uma Missa (Tormenta20, p. 58) especial. Cada participante pode escolher uma característica que possui um atributo-chave (como Defesa, uma habilidade, uma perícia ou o modificador de dano de um item) e substituir esse atributo por outro a sua escolha pela duração do efeito da Missa.',
      'Fim. Você pode gastar uma ação completa e 5 PM para encerrar a cena atual e iniciar uma nova imediatamente. Isso encerra todos os efeitos com duração cena ou de até 10 minutos, mas permite que habilidades com usos limitados pela cena possam ser usadas novamente. Se os participantes da cena haviam rolado Iniciativa, ela deverá ser rolada novamente. Esta habilidade não afeta os eventos narrativos, apenas a duração da cena, e não pode ser usada em uma cena iniciada por ela mesma. ✦',
      'Morte. Quando passa em um teste de Constituição para remover a condição sangrando, você recupera 1d8 PV para cada teste desses já feito nesa mesma cena. Além disso, sempre que faz um acerto crítico em combate ou reduz um inimigo a 0 PV, você recupera 1d8 PV. Se recuperar mais pontos de vida dessa forma que o seu máximo, o excedente se torna PV temporários (cumulativo até o dobro de seu nível de personagem). ✦',
      'Conhecimento. Você pode gastar 3 PM para expandir o conhecimento do Azkath a outros. Escolha uma perícia que exija treinamento. Até o fim da cena, você e seus aliados em alcance curto recebem os benefícios de ser treinado nela.',
      'Continuidade. Uma vez por rodada, quando uma habilidade ou item com duração instantânea é usada em um alvo em alcance curto, você pode gastar 3 PM para que esse efeito seja usado novamente na rodada seguinte sobre o mesmo alvo. Você não pode usar este poder em um efeito que já tenha sido repetido por ele. ✦',
      'Início. Você pode gastar 3 PM para criar uma bolha temporal, dentro da qual o tempo passa mais devagar. Isso funciona como congelar o tempo da magia Controlar o Tempo (Tormenta20, p. 187), exceto que a bolha fornece apenas 1 turno extra. Este efeito só funciona na primeira rodada de cada cena.',
    ] },
    texto: [
    'Há várias abordagens para o Akzath, todas igualmente libertadoras.',
    'Escolha um dos conceitos abaixo presentes na roda externa do Akzath. Você recebe a habilidade relacionada. Você pode escolher este poder até três vezes para conceitos diferentes, mas a cada vez adicional deve escolher um conceito adjacente a outro que já possua de acordo com o diagrama do Akzath (veja a imagem). Uma vez por dia você pode alterar todos os poderes desta distinção que tiver.',
  ] },
  { id: 'dist-exegeta-circulo-interno', nome: 'Círculo Interno', grupo: 'distincao', livro: 'deuses', pagina: 91,
    tags: 'Exegeta do Akzath', distincao: 'exegeta-do-akzath', marca: false, deus: 'Thwor', magica: false,
    preReq: 'um conceito do Círculo Externo (cada conceito interno tem o seu)', custo: null,
    quadro: { titulo: 'Conceitos da roda interna', texto: [
      'Nós. No início de cada dia, escolha um número de aliados até o valor de sua Sabedoria. Até o final do dia, em vez de pontos de vida individuais, você e esses aliados compartilham de um total de PV igual à soma dos PV de cada um. Dano, recuperação e perda de vida são todos aplicados a esse total (após aplicar quaisquer habilidades, como RD, do alvo original do dano). Entretanto, se o total de PV acabar, todos os personagens sofrem os efeitos de serem reduzidos a 0 PV ou menos (e cada um ainda morre no seu limite individual de pontos de vida). Pré-requisito: Vida.',
      'Dentro. Quando lança uma magia com alcance pessoal, você recebe +2 PM para gastar em aprimoramentos. Pré-requisito: Ignorância.',
      'Estagnação. Você pode gastar uma ação padrão e 3 PM para gerar um pulso de estagnação em uma esfera de 6m em alcance médio. Cada criatura nessa área sob um efeito com duração maior que instantânea deve fazer um teste de Vontade (CD Sab). Se falhar, todos estes efeitos são dissipados. Pré-requisito: Mudança.',
      'Trevas. Quando usa uma habilidade mágica que possui teste de resistência, você pode gastar 1 PM. Se fizer isso, alvos que falharem na resistência não podem recuperar pontos de vida por 1 rodada. Pré-requisito: Fim.',
      'Fora. Quando usa uma habilidade mágica com efeito em área, você pode gastar 1 PM. Se fizer isso, você pode excluir da área afetada uma quantidade de alvos igual a sua Sabedoria. Pré-requisito: Morte.',
      'Eles. Inimigos em alcance curto que você possa perceber sofrem uma penalidade de –2 em testes de ataque e rolagens de dano contra você. Essa penalidade aumenta para –5 se estiverem em alcance médio. Pré-requisito: Conhecimento.',
      'Movimento. Uma vez por rodada, quando uma criatura em alcance curto vai fazer uma ação de movimento para se deslocar, você pode gastar 2 PM. Se fizer isso, a criatura deve fazer um teste de Fortitude (CD Sab). Se falhar, ela perde a ação de movimento e você recebe uma ação de movimento adicional em seu próximo turno. Pré-requisito: Continuidade.',
      'Luz. Sempre que rolar o resultado máximo em um dado de cura ou dano de luz, role um dado extra e some ao resultado, repetindo até um limite de dados extras igual ao valor máximo do dado. Pré-requisito: Início.',
    ] },
    texto: [
    'A proximidade com todos os aspectos do Akzath é uma consequência natural para o exegeta.',
    'Escolha um dos conceitos abaixo presentes na roda interna do Akzath. Você recebe a habilidade relacionada. Você pode escolher este poder até duas vezes para conceitos diferentes. Cada conceito possui como pré-requisito um dos conceitos do Círculo Externo. Quando troca os poderes do Círculo Externo, você também pode trocar os do Círculo Interno.',
  ] },

  //  Forjador Litúrgico (p. 92–94) — 1 marca + 5 poderes.
  { id: 'dist-forjador-ferreiro-sagrado', nome: 'Ferreiro Sagrado', grupo: 'distincao', livro: 'deuses', pagina: 94,
    tags: 'Forjador Litúrgico', distincao: 'forjador-liturgico', marca: true, deus: 'Arsenal', magica: false,
    preReq: null, custo: null, quadro: null, texto: [
    'Marca da distinção. Nos primeiros passos de seu ofício divino, o forjador litúrgico aprimora suas habilidades com armas.',
    'Você recebe +2 em Ofício (armeiro) e em rolagens de dano com armas que tenha fabricado.',
  ] },
  { id: 'dist-forjador-virtude-do-forjador', nome: 'Virtude do Forjador', grupo: 'distincao', livro: 'deuses', pagina: 94,
    tags: 'Forjador Litúrgico', distincao: 'forjador-liturgico', marca: false, deus: 'Arsenal', magica: false,
    preReq: 'treinado em Luta e Ofício (armeiro), um poder concedido de Arsenal', custo: null, quadro: null, texto: [
    'Aço é meu corpo e fogo é meu sangue.',
    'Você pode fabricar armas superiores com uma melhoria. Para cada outro poder da distinção que possuir, pode fabricar armas com uma melhoria adicional (até um máximo de 4 melhorias). Se aprender a fabricar armas superiores por outra habilidade, gasta metade do tempo para fabricá-las.',
  ] },
  { id: 'dist-forjador-armamento-sagrado', nome: 'Armamento Sagrado', grupo: 'distincao', livro: 'deuses', pagina: 94,
    tags: 'Forjador Litúrgico', distincao: 'forjador-liturgico', marca: false, deus: 'Arsenal', magica: false,
    preReq: 'Abençoar Arma, Virtude do Forjador', custo: null, quadro: null, texto: [
    'Aos olhos de Arsenal, todas as armas que seus forjadores fabricam são preferidas.',
    'O custo do seu poder Abençoar Arma diminui em –1 PM e você pode usá-lo com qualquer arma que tenha fabricado.',
  ] },
  { id: 'dist-forjador-armamento-trabalhado', nome: 'Armamento Trabalhado', grupo: 'distincao', livro: 'deuses', pagina: 94,
    tags: 'Forjador Litúrgico', distincao: 'forjador-liturgico', marca: false, deus: 'Arsenal', magica: false,
    preReq: 'Conjurar Arma, Forja Devocional', custo: null, quadro: null, texto: [
    'Um forjador litúrgico consegue moldar até mesmo os presentes de seu deus.',
    'Quando usa Conjurar Arma, você pode gastar uma quantidade de PM adicionais igual ao dobro do total de poderes da distinção que possui. Para cada 2 PM gastos dessa forma, a arma recebe uma melhoria a sua escolha (até o máximo de 4 melhorias). Se pagar um total de 10 PM adicionais, além das melhorias a arma recebe um encanto a sua escolha.',
  ] },
  { id: 'dist-forjador-desprezo-pelo-ordinario', nome: 'Desprezo pelo Ordinário', grupo: 'distincao', livro: 'deuses', pagina: 94,
    tags: 'Forjador Litúrgico', distincao: 'forjador-liturgico', marca: false, deus: 'Arsenal', magica: false,
    preReq: 'Forja Devocional', custo: '2 PM', quadro: null, texto: [
    'Não será o simples artesanato dos plebeus, nem as mundanas garras de uma fera, que irá ferir o corpo de um forjador litúrgico.',
    'Sempre que sofre dano não mágico, você pode gastar 2 PM para reduzir esse dano à metade.',
  ] },
  { id: 'dist-forjador-forja-devocional', nome: 'Forja Devocional', grupo: 'distincao', livro: 'deuses', pagina: 94,
    tags: 'Forjador Litúrgico', distincao: 'forjador-liturgico', marca: false, deus: 'Arsenal', magica: false,
    preReq: 'Virtude do Forjador', custo: null, quadro: null, texto: [
    'Unindo forjaria e ritual, o forjador litúrgico consegue transferir magia para suas criações.',
    'Você consegue transplantar encantos de outras armas para aquelas que você fabricou. Para isso, gaste metade do tempo necessário para fabricar a arma mágica e faça um teste de Ofício (armeiro) com a CD de fabricação dela. Se passar, a arma perde seus encantos e eles são transferidos para uma arma que você tenha fabricado (essa arma deve atender aos pré-requisitos dos encantos e respeitar o limite de encantos que pode ter).',
  ] },

  //  Guardião da Realidade (p. 95–97) — 1 marca + 5 poderes. Aqui quem
  //  escala é a MARCA: "+1 por poder da distinção" contra a Tormenta.
  { id: 'dist-guardiao-escudo-da-realidade', nome: 'Escudo da Realidade', grupo: 'distincao', livro: 'deuses', pagina: 97,
    tags: 'Guardião da Realidade', distincao: 'guardiao-da-realidade', marca: true, deus: null, magica: false,
    preReq: null, custo: null, quadro: null, texto: [
    'Marca da distinção. Você encontra abrigo na força da realidade.',
    'Você recebe +5 em testes de resistência. Contra efeitos da Tormenta, esse bônus aumenta em +1 por poder da distinção.',
  ] },
  { id: 'dist-guardiao-destruir-anticriacao', nome: 'Destruir Anticriação', grupo: 'distincao', livro: 'deuses', pagina: 97,
    tags: 'Guardião da Realidade', distincao: 'guardiao-da-realidade', marca: false, deus: null, magica: false,
    preReq: 'treinado em Luta, Vontade de Ferro', custo: '2 PM', quadro: null, texto: [
    'O poder da realidade pode ser canalizado para destruir tudo aquilo que é antinatural.',
    'Quando faz um ataque corpo a corpo, você pode gastar 2 PM para canalizar a realidade em seu golpe. Você soma seu Carisma ao teste de ataque e +1d8 à rolagem de dano e, se o alvo for uma criatura da Tormenta, ignora sua imunidade a acertos críticos. Se possuir a habilidade Golpe Divino, em vez disso ela causa dois dados extras de dano e ignora a imunidade a acertos críticos de criaturas da Tormenta.',
  ] },
  { id: 'dist-guardiao-detectar-anticriacao', nome: 'Detectar Anticriação', grupo: 'distincao', livro: 'deuses', pagina: 97,
    tags: 'Guardião da Realidade', distincao: 'guardiao-da-realidade', marca: false, deus: null, magica: true,
    preReq: 'treinado em Percepção, Destruir Anticriação', custo: null, quadro: null, texto: [
    'Você sabe instintivamente o que é ou não real.',
    'Você soma seu Carisma em Intuição e Percepção. Além disso, está permanentemente sob o efeito da magia Detectar Ameaças, com todos os seus aprimoramentos, mas apenas para efeitos da Tormenta.',
  ] },
  { id: 'dist-guardiao-heroi-de-arton', nome: 'Herói de Arton', grupo: 'distincao', livro: 'deuses', pagina: 97,
    tags: 'Guardião da Realidade', distincao: 'guardiao-da-realidade', marca: false, deus: null, magica: false,
    preReq: 'Herói dos Reinos', custo: '2 PM', quadro: null, texto: [
    'O guardião da realidade não luta por um povo, um reino ou mesmo uma causa. Ele luta por toda Arton.',
    'Uma vez por rodada, você pode gastar 2 PM para transformar um acerto crítico que tenha recém sofrido em um acerto normal, para repetir um teste de resistência recém realizado, ou para reduzir à metade o dano causado por uma fonte da Tormenta.',
  ] },
  { id: 'dist-guardiao-heroi-dos-reinos', nome: 'Herói dos Reinos', grupo: 'distincao', livro: 'deuses', pagina: 97,
    tags: 'Guardião da Realidade', distincao: 'guardiao-da-realidade', marca: false, deus: null, magica: false,
    preReq: 'Detectar Anticriação', custo: null, quadro: null, texto: [
    'Por saber que seu dever é o mais exigente de todos, o guardião da realidade desenvolve uma reserva de força de vontade que nenhum outro herói possui.',
    'Na primeira rodada de cada combate, você recebe uma quantidade de PM temporários igual ao seu Carisma. Além disso, uma vez por rodada, quando você usa uma habilidade contra um efeito da Tormenta, o custo dessa habilidade é reduzido em –1 PM (cumulativo com outras reduções).',
  ] },
  { id: 'dist-guardiao-heroi-da-realidade', nome: 'Herói da Realidade', grupo: 'distincao', livro: 'deuses', pagina: 97,
    tags: 'Guardião da Realidade', distincao: 'guardiao-da-realidade', marca: false, deus: null, magica: false,
    preReq: 'Herói de Arton', custo: null, quadro: null, texto: [
    'Após tantas lutas, o guardião da realidade enfim compreende que não defende apenas um mundo, mas toda a Criação.',
    'Você projeta uma aura de realidade constante com 9m de raio. Criaturas a sua escolha nessa aura são protegidas dos seguintes efeitos de áreas de Tormenta e de templos de Aharadak (Ameaças de Arton, p. 60): ao entrar nesses locais elas não ficam frustradas e seus itens mágicos encantados não perdem encantos. O aumento de custo de suas habilidades por estar nesses locais diminui em 1 (+0 PM para templos e +1 PM para áreas). Por fim, dano contra criaturas da Tormenta a sua escolha dentro da aura ignora uma quantidade de RD igual ao seu Carisma e dentro da aura elas sofrem uma penalidade em rolagens de dano igual ao seu Carisma.',
  ] },

  //  Herói Henshin (p. 98–101) — 1 marca + 5 poderes, e dois quadros:
  //  as poses de combate e o birrotor henshin.
  { id: 'dist-henshin-armadura-especial', nome: 'Armadura Especial', grupo: 'distincao', livro: 'deuses', pagina: 100,
    tags: 'Herói Henshin', distincao: 'heroi-henshin', marca: true, deus: null, magica: false,
    preReq: null, custo: null, quadro: null, texto: [
    'Marca da distinção. Sua armadura é seu símbolo, sua identidade transformada e seu verdadeiro eu.',
    'Você transforma uma armadura ou um item de vestuário em seu traje de combate. Para você, esse item fornece +1 na Defesa (ou aumenta o bônus na Defesa fornecido em +1) e sua penalidade de armadura (se houver) é reduzida em –1. Se perder seu traje de combate, você pode transformar outra armadura ou item de vestuário com um dia de trabalho e T$ 100.',
  ] },
  { id: 'dist-henshin-sequencia-de-transformacao', nome: 'Sequência de Transformação', grupo: 'distincao', livro: 'deuses', pagina: 100,
    tags: 'Herói Henshin', distincao: 'heroi-henshin', marca: false, deus: null, magica: true,
    preReq: 'Vontade de Ferro', custo: null, quadro: null, texto: [
    'Em um clarão de luz, o inocente livreiro é coberto por uma armadura mística.',
    'Escolha uma arma, escudo ou esotérico. Esse item e seu traje de combate recebem, cada um, uma melhoria a sua escolha (exceto material especial) que não conta em seu limite de melhorias. Além disso, você pode gastar uma ação de movimento para executar uma sequência de transformação; quando faz isso, sua armadura surge vestida em você e o item escolhido aparece em sua mão. Esse efeito funciona independentemente de onde os itens estiverem. ✦',
  ] },
  { id: 'dist-henshin-forma-final', nome: 'Forma Final', grupo: 'distincao', livro: 'deuses', pagina: 101,
    tags: 'Herói Henshin', distincao: 'heroi-henshin', marca: false, deus: null, magica: false,
    preReq: 'quatro outros poderes da distinção', custo: '5 PM', quadro: null, texto: [
    'O poder do herói henshin até agora era apenas uma faísca de seu verdadeiro potencial!',
    'Quando usa sua Sequência de Transformação, você pode gastar 5 PM. Se fizer isso, os itens invocados pela sequência recebem um encanto cada, que não contam em seu limite de encantos e que duram até o fim da cena.',
  ] },
  { id: 'dist-henshin-pose-de-combate', nome: 'Pose de Combate', grupo: 'distincao', livro: 'deuses', pagina: 101,
    tags: 'Herói Henshin', distincao: 'heroi-henshin', marca: false, deus: null, magica: false,
    preReq: 'treinado em Luta, Sequência de Transformação', custo: null,
    quadro: { titulo: 'Pose de Combate', texto: [
      'Poses de combate são técnicas especiais desenvolvidas pelo herói henshin. Para assumir uma destas técnicas, você deve estar vestindo seu traje de combate e gastar uma ação de movimento e 2 PM. Os efeitos de uma pose duram até o fim da cena ou até você assumir outra pose.',
      'Acrobacia Espalhafatosa. Quando você assume esta pose, todos os inimigos em alcance curto ficam vulneráveis por 1 rodada (uma criatura só pode ser afetada por esta pose uma vez por cena). Seu deslocamento aumenta em 3m e você recebe +5 em Acrobacia.',
      'Calor do Combate. Você recebe +2 em testes de ataque e rolagens de dano, mas sofre uma penalidade de –2 na Defesa. Para cada outros dois poderes da distinção, esses bônus aumentam em +1.',
      'Coordenação de Coreografia. Quando assume esta pose, você se torna o último na iniciativa. Em seu turno, para cada aliado que fez pelo menos um ataque desde o seu turno anterior, você recebe +1 em suas rolagens de dano.',
      'Defender o Sonho. Seus aliados recebem +2 em testes de perícia (exceto testes de ataque). Para cada outros dois poderes da distinção, esse bônus aumenta em +1.',
      'Julgamento Heroico. Ao assumir esta pose, escolha um inimigo em alcance curto. Suas rolagens de dano contra esse inimigo recebem +1d8 de luz, mas você sofre –2 em testes de ataque contra outras criaturas. Para cada dois outros poderes da distinção, esse dado de dano de luz aumenta em um passo.',
      'Poder da Amizade. Quando você assume esta pose, e no início de cada um dos seus turnos, seus aliados recebem uma quantidade de PV temporários igual a 5 + o total de poderes da distinção que você possui.',
      'Terror dos Injustos. Qualquer criatura em alcance curto que faça uma ação hostil contra você ou um de seus aliados fica abalada (Von CD Car evita e a criatura não pode mais ser afetada por esta pose por 1 dia).',
    ] },
    texto: [
    'O herói henshin assume uma postura que poderia ser cômica, mas afeta o coração de todos.',
    'Escolha uma pose de combate (veja o quadro). Uma vez feita, essa escolha não pode ser alterada. A cada outro poder da distinção você recebe outra pose a sua escolha.',
  ] },
  { id: 'dist-henshin-montaria-especial', nome: 'Montaria Especial', grupo: 'distincao', livro: 'deuses', pagina: 101,
    tags: 'Herói Henshin', distincao: 'heroi-henshin', marca: false, deus: null, magica: true,
    preReq: 'treinado em Cavalgar ou Pilotagem, Sequência de Transformação', custo: '2 PM',
    quadro: { titulo: 'Birrotor Henshin', texto: [
      'Este veículo exclusivo de heróis henshin possui uma engenharia sagrada inexplicável que lhe permite se mover sem a necessidade de uma fonte de tração. Tem formato similar ao de um cavalo, mas com duas rodas colineares que exigem equilíbrio do piloto para se manter sobre ele. Se estiver conduzindo um birrotor henshin, você pode fazer investidas como se estivesse montado. Um birrotor henshin tem tamanho Grande, deslocamento 15m, Defesa 10 (+Des do Condutor), PV iguais à metade dos seus e pode carregar até 2 criaturas Médias ou 40 espaços. Veículo.',
    ] },
    texto: [
    'O alazão do herói henshin é metálico e acompanha seu cavaleiro onde quer que a injustiça apareça.',
    'Você pode gastar uma ação de movimento e 2 PM para invocar sua montaria especial. Ela aparece com um brilho de luz dourada ao seu lado e fica até o fim da cena, quando retorna magicamente para o lugar de onde veio. Ela é um parceiro montaria veterano de um tipo a sua escolha e aprovado pelo mestre, ou um birrotor henshin (veja o quadro). Caso já possua uma montaria fornecida por outra habilidade, em vez disso você pode invocá-la com este poder e ela se torna também uma montaria iniciante de outro tipo a sua escolha e aprovado pelo mestre. ✦',
  ] },
  { id: 'dist-henshin-pose-complexa', nome: 'Pose Complexa', grupo: 'distincao', livro: 'deuses', pagina: 101,
    tags: 'Herói Henshin', distincao: 'heroi-henshin', marca: false, deus: null, magica: false,
    preReq: 'duas poses de combate', custo: null, quadro: null, texto: [
    'Se acham que uma pose é estapafúrdia, acerte-os com duas!',
    'Você pode ativar duas poses de combate ao mesmo tempo.',
  ] },

  //  Improvisador de Lena (p. 102–104) — 1 marca + 5 poderes. Três dos
  //  cinco medem o personagem pelo TOTAL de poderes da distinção.
  { id: 'dist-improvisador-codigo-do-improvisador', nome: 'Código do Improvisador', grupo: 'distincao', livro: 'deuses', pagina: 104,
    tags: 'Improvisador de Lena', distincao: 'improvisador-de-lena', marca: true, deus: 'Lena', magica: false,
    preReq: null, custo: null, quadro: null, texto: [
    'Marca da distinção. O improvisador aprende como usar materiais ao seu redor para improvisar soluções.',
    'Você segue o Código da Paz (p. 116). Além disso, uma vez por cena, pode gastar uma ação de movimento para, a partir de itens do ambiente, improvisar uma ferramenta especial que ocupa 1 espaço. Até o fim da cena, você pode gastar essa ferramenta para receber +2 em um teste de perícia ou para reduzir em –1 PM o custo de uma de suas habilidades.',
  ] },
  { id: 'dist-improvisador-gambiarra-mestra', nome: 'Gambiarra Mestra', grupo: 'distincao', livro: 'deuses', pagina: 104,
    tags: 'Improvisador de Lena', distincao: 'improvisador-de-lena', marca: false, deus: 'Lena', magica: false,
    preReq: 'treinado em Investigação e Ofício', custo: '3 PM', quadro: null, texto: [
    'Uma pena, dois botões e o resto do jantar de ontem serão o suficiente…',
    'Você pode gastar uma ação de movimento e 3 PM para improvisar algum tipo de gambiarra para uma tarefa específica. Escolha uma perícia. Até o fim da cena, você pode usar sua gambiarra para substituir testes da perícia escolhida por testes de Ofício.',
  ] },
  { id: 'dist-improvisador-efeito-cenografico', nome: 'Efeito Cenográfico', grupo: 'distincao', livro: 'deuses', pagina: 104,
    tags: 'Improvisador de Lena', distincao: 'improvisador-de-lena', marca: false, deus: 'Lena', magica: false,
    preReq: 'Poder Improvisado', custo: '2 PM', quadro: null, texto: [
    'Um bom improvisador encontra formas de vencer sem violência.',
    'Quando causa dano não letal a uma criatura viva, você pode gastar 2 PM para desferir um golpe cenográfico. A vítima deve fazer um teste de Fortitude (CD Int, +1 por poder da distinção que você possui). Se falhar, ela fica inconsciente (se for um capanga) ou atordoada por 1 rodada (apenas uma vez por cena) se for de outro tipo.',
  ] },
  { id: 'dist-improvisador-habilidade-improvisada', nome: 'Habilidade Improvisada', grupo: 'distincao', livro: 'deuses', pagina: 104,
    tags: 'Improvisador de Lena', distincao: 'improvisador-de-lena', marca: false, deus: 'Lena', magica: false,
    preReq: 'Poder Improvisado', custo: '3 PM', quadro: null, texto: [
    'Intrometendo-se nos campos de outros aventureiros, o improvisador adquire uma versatilidade impressionante.',
    'Você pode gastar uma ação padrão e 3 PM para improvisar uma forma de executar uma tarefa. Escolha uma habilidade de uma classe (exceto Magias) que não seja a sua. Até o fim da cena, ou até usar este poder novamente, você pode utilizar essa habilidade como um personagem de nível igual ao seu total de poderes da distinção.',
  ] },
  { id: 'dist-improvisador-magia-improvisada', nome: 'Magia Improvisada', grupo: 'distincao', livro: 'deuses', pagina: 104,
    tags: 'Improvisador de Lena', distincao: 'improvisador-de-lena', marca: false, deus: 'Lena', magica: false,
    preReq: 'treinado em Misticismo, Poder Improvisado', custo: null, quadro: null, texto: [
    'Usando uma corda, uma luneta e um esquilo desatento, o improvisador cria um aparato mágico útil para a ocasião.',
    'Você pode gastar uma ação completa para improvisar uma forma de simular um feito místico. Escolha uma magia de 1º círculo e faça um teste de Inteligência (CD 10, +2 para cada vez que usou este poder no mesmo dia). Se passar, até o fim da cena, você pode lançar a magia escolhida uma única vez, pagando seu custo normal (atributo-chave Inteligência). Esta não é uma habilidade mágica e provém de sua elevada capacidade de improvisação (veja “Magias Simuladas”, em Heróis de Arton, Capítulo 1: Campeões de Arton).',
  ] },
  { id: 'dist-improvisador-poder-improvisado', nome: 'Poder Improvisado', grupo: 'distincao', livro: 'deuses', pagina: 104,
    tags: 'Improvisador de Lena', distincao: 'improvisador-de-lena', marca: false, deus: 'Lena', magica: false,
    preReq: 'Gambiarra Mestra', custo: '3 PM', quadro: null, texto: [
    'O improvisador é um indivíduo de muitos talentos, vários dos quais nem ele sabe que possui...',
    'Você pode gastar uma ação padrão e 3 PM para pensar em uma solução criativa para um problema a sua frente. Escolha um poder de classe ou geral (exceto poderes concedidos e da Tormenta) cujos pré-requisitos você cumpra. Para efeitos desse poder, considere que seu nível em qualquer classe é igual ao seu total de poderes da distinção. Até o fim da cena, ou até usar este poder novamente, você pode utilizar o poder escolhido.',
  ] },

  //  Inquisidor de Wynna (p. 105–107) — 1 marca + 5 poderes. É de
  //  paladino: a marca empresta a Centelha Mágica sem trocar de deus.
  { id: 'dist-inquisidor-padroeira-adotiva', nome: 'Padroeira Adotiva', grupo: 'distincao', livro: 'deuses', pagina: 107,
    tags: 'Inquisidor de Wynna', distincao: 'inquisidor-de-wynna', marca: true, deus: 'Wynna', magica: false,
    preReq: null, custo: null, quadro: null, texto: [
    'Marca da distinção. Wynna não é sua deusa, mas acha-o muito simpático.',
    'Você recebe o poder Centelha Mágica, mas continua sendo um paladino e devoto de sua divindade original. Além disso, quando escolhe o poder Orar, você pode aprender também magias arcanas de 1º círculo como se fossem divinas.',
  ] },
  { id: 'dist-inquisidor-golpe-purificador', nome: 'Golpe Purificador', grupo: 'distincao', livro: 'deuses', pagina: 107,
    tags: 'Inquisidor de Wynna', distincao: 'inquisidor-de-wynna', marca: false, deus: 'Wynna', magica: true,
    preReq: 'Abençoado, Golpe Divino', custo: '2 PM', quadro: null, texto: [
    'O poder divino do inquisidor pode encerrar o mau uso da magia.',
    'Quando usa Golpe Divino, você pode gastar 2 PM para transformá-lo em um golpe purificador. Se acertar o ataque, além do dano, você causa um efeito semelhante à magia Dissipar Magia sobre o alvo, usando o resultado do teste de ataque no lugar do teste de Misticismo. ✦',
  ] },
  { id: 'dist-inquisidor-magia-sagrada', nome: 'Magia Sagrada', grupo: 'distincao', livro: 'deuses', pagina: 107,
    tags: 'Inquisidor de Wynna', distincao: 'inquisidor-de-wynna', marca: false, deus: 'Wynna', magica: true,
    preReq: 'Golpe Purificador, Orar', custo: '2 PM', quadro: null, texto: [
    'O inquisidor de Wynna é capaz de emprestar poder destruidor a suas magias.',
    'Quando lança uma magia que causa dano, você pode gastar 2 PM para receber +2 na CD e +1d8 na rolagem de dano da magia. Para cada outro poder da distinção que possuir, você pode gastar +1 PM para aumentar o dano em +1d8. ✦',
  ] },
  { id: 'dist-inquisidor-pira-da-inquisicao', nome: 'Pira da Inquisição', grupo: 'distincao', livro: 'deuses', pagina: 107,
    tags: 'Inquisidor de Wynna', distincao: 'inquisidor-de-wynna', marca: false, deus: 'Wynna', magica: false,
    preReq: 'Aura Sagrada, Golpe Purificador', custo: null, quadro: null, texto: [
    'O inquisidor pode punir o mau uso da magia com a chama essencial de Wynna.',
    'Enquanto sua Aura Sagrada estiver ativa, no início de seus turnos, você gera um efeito semelhante a Dissipar Magia (usando Vontade no lugar de Misticismo) em criaturas e objetos a sua escolha na área. Para cada círculo de magia dissipada dessa forma, seu conjurador sofre 1d8+1 pontos de dano de essência.',
  ] },
  { id: 'dist-inquisidor-refletir-magia', nome: 'Refletir Magia', grupo: 'distincao', livro: 'deuses', pagina: 107,
    tags: 'Inquisidor de Wynna', distincao: 'inquisidor-de-wynna', marca: false, deus: 'Wynna', magica: true,
    preReq: 'outros dois poderes da distinção', custo: '6 PM', quadro: null, texto: [
    'Os inquisidores se esforçam para aproveitar ao máximo o dom de Wynna, redirecionando energia arcana mal utilizada de volta para quem a emitiu.',
    'Quando passa em um teste de resistência contra uma habilidade mágica, você pode gastar 6 PM para refletir esse efeito de volta à sua fonte. Você não sofre nenhum efeito da habilidade (outros alvos são afetados normalmente) e a fonte é afetada por ela como se fosse um dos alvos originais (a fonte ainda tem direito a quaisquer testes de resistência contra a habilidade). ✦',
  ] },
  { id: 'dist-inquisidor-veredito-inquisitorial', nome: 'Veredito Inquisitorial', grupo: 'distincao', livro: 'deuses', pagina: 107,
    tags: 'Inquisidor de Wynna', distincao: 'inquisidor-de-wynna', marca: false, deus: 'Wynna', magica: true,
    preReq: 'quatro outros poderes da distinção', custo: '+6 PM', quadro: null, texto: [
    'Os inquisidores de Wynna podem remover as bênçãos da Deusa daqueles que as empregam para o mal.',
    'Quando usa Golpe Purificador, você pode gastar +6 PM. Se fizer isso e acertar o ataque, você atrapalha o fluxo de mana do alvo: até o fim da cena, a próxima vez que ele for executar uma ação com um custo em PM, deve fazer um teste de Vontade oposto ao resultado do seu teste de ataque. Se falhar, a ação não tem efeito (mas os PM são gastos mesmo assim). ✦',
  ] },

  //  Mestre de Armearia (p. 108–111) — 1 marca + 5 poderes, com o
  //  quadro das inovações (as melhorias exclusivas de arma de fogo).
  { id: 'dist-armearia-dominio-da-polvora', nome: 'Domínio da Pólvora', grupo: 'distincao', livro: 'deuses', pagina: 110,
    tags: 'Mestre de Armearia', distincao: 'mestre-de-armearia', marca: true, deus: 'Tanna-Toh', magica: false,
    preReq: null, custo: null, quadro: null, texto: [
    'Marca da distinção. Insatisfeito com o que já existe, o mestre de armearia imagina novas maneiras de destruir.',
    'Você recebe +2 em testes de perícia (exceto de ataque) relacionados a armas de fogo e suas munições, incluindo testes para esconder, fabricar, identificar e negociar.',
  ] },
  { id: 'dist-armearia-prata-da-casa', nome: 'Prata da Casa', grupo: 'distincao', livro: 'deuses', pagina: 110,
    tags: 'Mestre de Armearia', distincao: 'mestre-de-armearia', marca: false, deus: 'Tanna-Toh', magica: false,
    preReq: 'Balística', custo: null, quadro: null, texto: [
    'O primeiro trabalho do mestre de armearia é se livrar das velharias e criar suas próprias armas.',
    'Você pode fabricar armas de fogo não mágicas em uma semana, em vez de um mês, e recebe +1 em testes de ataque e rolagens de dano com armas de fogo que tenha fabricado. A cada dois outros poderes da distinção, esses bônus aumentam em +1.',
  ] },
  { id: 'dist-armearia-arma-de-estimacao', nome: 'Arma de Estimação', grupo: 'distincao', livro: 'deuses', pagina: 110,
    tags: 'Mestre de Armearia', distincao: 'mestre-de-armearia', marca: false, deus: 'Tanna-Toh', magica: false,
    preReq: 'Profissional Completo, ter feito três acertos críticos no mesmo combate com a arma escolhida', custo: null, quadro: null, texto: [
    'Um mestre de armearia trata suas armas como bichos de estimação — ou filhos!',
    'Escolha uma arma de fogo que tenha fabricado para receber uma habilidade de classe de 1º nível de uma classe que não seja a sua. Você só pode escolher uma habilidade que seja ativada ao se fazer um ataque ou usar a ação agredir (como Ataque Especial) ou que afete testes de ataque e/ou rolagens de dano e possa ser usada com a arma escolhida (como Duelo ou Marca da Presa). Você pode escolher a habilidade Magias, mas aprende uma única magia (que possa ser usada na arma ou com ela), com as mesmas limitações descritas, e não soma o atributo-chave da habilidade em seu total de PM. Você pode usar a habilidade como se tivesse 1 nível naquela classe, mas apenas com a arma escolhida.',
  ] },
  { id: 'dist-armearia-improvisar-o-progresso', nome: 'Improvisar o Progresso', grupo: 'distincao', livro: 'deuses', pagina: 111,
    tags: 'Mestre de Armearia', distincao: 'mestre-de-armearia', marca: false, deus: 'Tanna-Toh', magica: false,
    preReq: 'Inovação Tecnológica, ter construído pelo menos três armas com melhorias exclusivas', custo: '2 PM', quadro: null, texto: [
    'Um mestre de armearia aprende a fazer modificações rápidas para qualquer situação.',
    'Você pode gastar uma ação completa e 2 PM para aplicar uma melhoria (exceto material especial) em uma arma de fogo que esteja empunhando. Você não precisa pagar o custo nem fazer o teste de Ofício (armeiro), mas a melhoria só dura até o fim da cena. Você também pode gastar +2 PM para aplicar também uma inovação. A melhoria e a inovação não contam nos limites da arma.',
  ] },
  { id: 'dist-armearia-inovacao-tecnologica', nome: 'Inovação Tecnológica', grupo: 'distincao', livro: 'deuses', pagina: 111,
    tags: 'Mestre de Armearia', distincao: 'mestre-de-armearia', marca: false, deus: 'Tanna-Toh', magica: false,
    preReq: 'Prata da Casa', custo: null,
    quadro: { titulo: 'Inovações', texto: [
      'Inovações são técnicas experimentais, desenvolvidas de forma independente por mestres de armearia em todo mundo. Cada inovação é única; seu funcionamento e uso são conhecidos apenas por seu criador. Nas mãos de qualquer outra pessoa, a inovação simplesmente não funciona. Mestres de armearia generosos podem aplicar essas modificações às armas de seus aliados, mas elas sempre dependerão de seus cuidados e manutenção (em termos de regras, inovações não têm valor comercial).',
      'Inovações funcionam de forma semelhante à melhorias; uma arma pode ter até quatro inovações, e a CD e o preço para aplicá-las seguem a Tabela 3-7 (Tormenta20, p. 164). Inovações só podem ser aplicadas a armas de fogo e armas híbridas (nesse caso, afetam apenas ataques em modo arma de fogo) e às suas munições.',
      'Câmara de Bala (Arma). Esta inovação pode ser aplicada a qualquer arma. A arma recebe uma câmara e um mecanismo especial, que armazena uma bala. Quando faz um ataque corpo a corpo com a arma, você pode acionar esse mecanismo para disparar a bala; se acertar o ataque, causa +2d6 pontos de dano. Uma arma com esta inovação conta como uma arma de fogo para seus poderes de mestre de armearia. Recarregar a câmara é uma ação padrão.',
      'Cano Duplo (Arma). A arma possui dois canos, cada um com seu carregador. Cada cano pode ser disparado e recarregado individualmente. Além disso, você pode disparar ambos os canos como se tivesse o poder Disparo Rápido. Caso tenha esse poder, em vez disso você não sofre a penalidade em testes de ataque ao usá-lo com a arma.',
      'Cano Serrado (Arma). O cano da arma é mais curto, o que diminui sua precisão mas torna mais fácil manuseá-la em corpo a corpo. Quando faz um ataque à distância com a arma contra um oponente adjacente, você causa um dado de dano extra do mesmo tipo. Entretanto, você sofre –2 em testes de ataque contra alvos que não estejam adjacentes.',
      'Empunhadura de Segurança (Arma). A arma possui um mecanismo na empunhadura que torna mais difícil removê-la de sua mão. Você recebe +5 nos testes para resistir às manobras desarmar e quebrar contra a arma (cumulativo com outros bônus da arma).',
      'Explosiva (Munição). A munição é detonada com o impacto. Se você acertar um ataque, todas as criaturas adjacentes ao alvo sofrem o dano do ataque (Reflexos CD Int reduz à metade). Pré-requisito: Pólvora de Smokestone.',
      'Fragmentável (Munição). Esta bala se estilhaça ao atingir o alvo, potencialmente causando ferimentos terríveis. Sempre que rolar o resultado máximo em um dado de dano da arma, role um dado extra.',
      'Mira Calibrável (Arma). A arma possui um sistema de mira regulável que permite maior precisão. Quando usa a ação mirar, você recebe +2 em testes de ataque e na margem de ameaça com a arma até o fim do turno. Pré-requisito: Mira Telescópica.',
      'Pólvora de Smokestone (Munição). Uma arma de fogo usando esta munição causa +1 ponto de dano por dado (exceto dados extras).',
      'Tambor (Arma). A arma possui um tambor giratório que armazena 4 munições. Recarregar uma arma com tambor é uma ação completa. Pré-requisito: outra inovação qualquer.',
      'Tanque Flamejante (Arma). A arma tem um compartimento com uma mistura de pedra-de-fumaça e fogo alquímico. Isso muda o tipo de dano para fogo e, quando a arma é disparada, espalha a munição em uma linha de 6m. Para atacar, faça um ataque à distância e compare com a Defesa de cada criatura na área. Recarregar a arma exige uma ação completa, 1 bala e 1 fogo alquímico.',
    ] },
    texto: [
    'Insatisfeito com suas próprias armas e as de seus companheiros, o mestre de armearia desenvolve formas de aprimorá-las.',
    'Você adiciona uma inovação a uma arma de fogo que possua e passa a poder fabricar armas de fogo superiores com inovações (veja o quadro).',
  ] },
  { id: 'dist-armearia-profissional-completo', nome: 'Profissional Completo', grupo: 'distincao', livro: 'deuses', pagina: 111,
    tags: 'Mestre de Armearia', distincao: 'mestre-de-armearia', marca: false, deus: 'Tanna-Toh', magica: false,
    preReq: 'Prata da Casa, Maestria em Perícia (Ofício [armeiro])', custo: null, quadro: null, texto: [
    'O mestre de armearia não depende de treinamento para lutar, valendo-se de seu conhecimento e olhar de artesão.',
    'Quando ataca com uma arma de fogo que tenha fabricado, você pode substituir testes de Pontaria por testes de Ofício (armeiro), e pode usar Maestria em Perícia nos ataques com ela.',
  ] },

  //  Numeromante (p. 112–114) — 1 marca + 5 poderes. A "Constante M" é
  //  um dado rolado por cena: 1d4, e 1d6 depois da Função Metamágica.
  { id: 'dist-numeromante-matemagica-para-iniciantes', nome: 'Matemágica para iniciantes', grupo: 'distincao', livro: 'deuses', pagina: 114,
    tags: 'Numeromante', distincao: 'numeromante', marca: true, deus: 'Wynna', magica: false,
    preReq: null, custo: null, quadro: null, texto: [
    'Marca da distinção. Um numeromante enxerga a magia escondida nos números.',
    'Sempre que você lançar uma magia com um custo em PM igual a um quadrado perfeito (1, 4, 9, 16, 25, 36 etc.), o custo de sua próxima magia lançada até o fim da cena diminui em –1 PM.',
  ] },
  { id: 'dist-numeromante-aplicar-constante-m', nome: 'Aplicar Constante M', grupo: 'distincao', livro: 'deuses', pagina: 114,
    tags: 'Numeromante', distincao: 'numeromante', marca: false, deus: 'Wynna', magica: false,
    preReq: 'treinado em Conhecimento e Misticismo, capacidade de lançar magias arcanas de 2º círculo', custo: null, quadro: null, texto: [
    'A Criação foi feita a partir da matemática, que também rege toda magia.',
    'No início de cada cena, role 1d4 e anote o resultado. Esse número passa a ser sua Constante M. Suas magias com um teste de resistência ganham o seguinte aprimoramento. +2PM: criaturas que falhem no teste de resistência sofrem uma penalidade na Defesa e em testes de resistência igual a sua Constante M.',
  ] },
  { id: 'dist-numeromante-correcao-do-desvio-padrao', nome: 'Correção do Desvio Padrão', grupo: 'distincao', livro: 'deuses', pagina: 114,
    tags: 'Numeromante', distincao: 'numeromante', marca: false, deus: 'Wynna', magica: false,
    preReq: 'Magicometria', custo: null, quadro: null, texto: [
    'Na correção da dispersão natural está a força da concentração mágica.',
    'Suas magias com efeitos baseados em dados recebem o seguinte aprimoramento. +3PM: para cada dado do efeito que rolar menos da metade de seu valor máximo, você pode considerar o resultado como a metade de seu valor máximo (por exemplo, um d6 que role 2 é considerado 3).',
  ] },
  { id: 'dist-numeromante-funcao-metamagica-de-m', nome: 'Função Metamágica de M', grupo: 'distincao', livro: 'deuses', pagina: 114,
    tags: 'Numeromante', distincao: 'numeromante', marca: false, deus: 'Wynna', magica: false,
    preReq: 'Magicometria', custo: null, quadro: null, texto: [
    'A interseção da derivada de uma magia com sua constante é uma fonte infindável de poder.',
    'Você passa a rolar 1d6 para determinar sua Constante M (em vez de 1d4). Além disso, uma vez por rodada, se um ou mais dados forem rolados para definir o efeito de uma habilidade mágica usada em alcance médio e o resultado de um desses dados for sua Constante M, você pode lançar uma magia como ação livre (mas ainda limitado a uma magia como ação livre na rodada) até o fim de seu próximo turno.',
  ] },
  { id: 'dist-numeromante-magicometria', nome: 'Magicometria', grupo: 'distincao', livro: 'deuses', pagina: 114,
    tags: 'Numeromante', distincao: 'numeromante', marca: false, deus: 'Wynna', magica: false,
    preReq: 'Aplicar Constante M', custo: null, quadro: null, texto: [
    'Os números são o código com o qual o Nada e o Vazio fizeram a Criação.',
    'Quando uma habilidade mágica com efeito baseado em dados é usada em alcance médio, você pode fazer um teste de Misticismo (CD 15 + o custo em PM da habilidade). Se passar, você pode rolar novamente uma quantidade de dados do efeito igual a sua Constante M.',
  ] },
  { id: 'dist-numeromante-matriz-da-equacao-final', nome: 'Matriz da Equação Final', grupo: 'distincao', livro: 'deuses', pagina: 114,
    tags: 'Numeromante', distincao: 'numeromante', marca: false, deus: 'Wynna', magica: false,
    preReq: 'Correção do Desvio Padrão, dois poderes de magia', custo: null, quadro: null, texto: [
    'Na magias, Kallyadranoch está para os números naturais assim como Wynna está para os reais. A solução da Equação Final… está num conjunto ainda não imaginado…',
    'Suas magias que causam dano baseado em dados ganham o seguinte aprimoramento. +2PM: em vez de rolar todos os dados de dano da magia, você pode rolar um único dado e multiplicar seu resultado pela quantidade de dados original do efeito.',
  ] },

  //  Pacificador (p. 115–117) — 1 marca + 5 poderes. O Código da Paz
  //  (p. 116) é o mesmo quadro que o improvisador de Lena adota.
  { id: 'dist-pacificador-armas-da-paz', nome: 'Armas da Paz', grupo: 'distincao', livro: 'deuses', pagina: 117,
    tags: 'Pacificador', distincao: 'pacificador', marca: true, deus: 'Lena', magica: false,
    preReq: null, custo: null,
    quadro: { titulo: 'Código da Paz', texto: [
      'Você não acredita na morte como solução de conflitos. Por isso, não aceita matar, nem empregar violência verdadeira (em termos de jogo, causar dano letal). Se violar o código, você perde todos os seus PM e só pode recuperá-los a partir do próximo dia.',
    ] },
    texto: [
    'Marca da distinção. Qualquer um pode matar. Podemos ser melhores que isso.',
    'Você adota o Código da Paz (veja o quadro) e se torna proficiente com qualquer arma que não cause dano ou que tenha a habilidade inata de causar dano não letal. Além disso, recebe +1 em testes de ataque e rolagens de dano com ataques que causam dano não letal.',
  ] },
  { id: 'dist-pacificador-combate-pacifico', nome: 'Combate Pacífico', grupo: 'distincao', livro: 'deuses', pagina: 117,
    tags: 'Pacificador', distincao: 'pacificador', marca: false, deus: 'Lena', magica: false,
    preReq: 'treinado em Luta', custo: '1 PM', quadro: null, texto: [
    'O pacificador acredita que existem várias maneiras de se derrotar alguém sem matar.',
    'Quando é atingido por um ataque corpo a corpo, você pode gastar 1 PM para fazer um teste de manobra. Se o resultado do seu teste for maior que o do atacante, você evita o ataque. Além disso, quando uma criatura atacá-lo e errar, você pode gastar 1 PM para fazer uma manobra contra essa criatura (desde que ela esteja em seu alcance). Você pode usar cada um desses efeitos uma vez por rodada.',
  ] },
  { id: 'dist-pacificador-dor-sem-morte', nome: 'Dor sem Morte', grupo: 'distincao', livro: 'deuses', pagina: 117,
    tags: 'Pacificador', distincao: 'pacificador', marca: false, deus: 'Lena', magica: false,
    preReq: 'Combate Pacífico', custo: '1 PM', quadro: null, texto: [
    'Você domina técnicas complexas e elaboradas para não matar.',
    'Quando faz um ataque que causa dano não letal, você pode gastar 1 PM. Se fizer isso e acertar o ataque, o oponente sofre uma condição a sua escolha entre fraco, frustrado ou lento (Fortitude CD For ou Des evita). Para cada poder da distinção que você possui, a CD para resistir a este efeito aumenta em +1.',
  ] },
  { id: 'dist-pacificador-golpe-paralisante', nome: 'Golpe Paralisante', grupo: 'distincao', livro: 'deuses', pagina: 117,
    tags: 'Pacificador', distincao: 'pacificador', marca: false, deus: 'Lena', magica: false,
    preReq: 'Dor sem Morte', custo: '3 PM', quadro: null, texto: [
    'O melhor jeito de não matar em uma batalha é evitar que ela aconteça.',
    'Você pode gastar uma ação padrão e 3 PM para interromper o fluxo de energia corporal de uma criatura adjacente. A vítima fica paralisada (Fortitude CD For ou Des reduz para lenta). A cada rodada, a criatura pode gastar uma ação completa para fazer um novo teste de Fortitude. Se passar, liberta-se do efeito. Para cada poder da distinção que você possui, a CD para resistir a este efeito aumenta em +1. Metabolismo.',
  ] },
  { id: 'dist-pacificador-pacificacao', nome: 'Pacificação', grupo: 'distincao', livro: 'deuses', pagina: 117,
    tags: 'Pacificador', distincao: 'pacificador', marca: false, deus: 'Lena', magica: false,
    preReq: 'Presença do Bem', custo: null, quadro: null, texto: [
    '“Ninguém precisa morrer aqui hoje. Nem nós, nem vocês.”',
    'Sempre que derrotar um inimigo sem matá-lo, você recebe +10 PV e +2 PM cumulativos até o fim da aventura. A cada aventura, você pode receber esse benefício um número de vezes igual ao total de poderes da distinção que possui.',
  ] },
  { id: 'dist-pacificador-presenca-do-bem', nome: 'Presença do Bem', grupo: 'distincao', livro: 'deuses', pagina: 117,
    tags: 'Pacificador', distincao: 'pacificador', marca: false, deus: 'Lena', magica: false,
    preReq: 'Combate Pacífico', custo: '1 PM', quadro: null, texto: [
    'Tão importante quanto não matar seus inimigos é garantir que seus amigos não morram.',
    'Você pode gastar uma ação de movimento e 1 PM para fornecer +2 na Defesa e em testes de resistência a você e todos os aliados adjacentes até o fim da cena. O bônus se encerra para uma criatura se ela causar dano letal.',
  ] },

  //  Pregador (p. 118–120) — 1 marca + 5 poderes. A distinção de quem
  //  empresta o deus do vizinho quando convém.
  { id: 'dist-pregador-vista-grossa', nome: 'Vista Grossa', grupo: 'distincao', livro: 'deuses', pagina: 119,
    tags: 'Pregador', distincao: 'pregador', marca: true, deus: null, magica: false,
    preReq: null, custo: null, quadro: null, texto: [
    'Marca da distinção. Se nem os deuses são perfeitos, por que os mortais deveriam ser?',
    'Sempre que violar as Obrigações & Restrições de uma divindade que precisa cumprir, você pode fazer um teste de Religião (CD 10, +5 para cada outra vez que usou este poder na mesma aventura). Se passar, não sofre nenhuma consequência por essa violação.',
  ] },
  { id: 'dist-pregador-sincretismo-oportuno', nome: 'Sincretismo Oportuno', grupo: 'distincao', livro: 'deuses', pagina: 120,
    tags: 'Pregador', distincao: 'pregador', marca: false, deus: null, magica: false,
    preReq: 'treinado em Enganação e Religião, Devoto Fiel', custo: '3 PM', quadro: null, texto: [
    'O pregador roga por Khalmyr, acende uma vela para Nimb, faz uma oferenda para Hyninn...',
    'Você pode gastar uma ação padrão e 3 PM para orar a uma divindade que não seja a sua. Se fizer isso, recebe um poder concedido dela, mas passa a ser considerado seu devoto para efeitos de Obrigações & Restrições. Esse efeito dura até o fim da cena ou até você usá-lo novamente. Se violar as Obrigações & Restrições da divindade, você perde o poder obtido e não pode ganhar poderes dessa divindade até o fim da aventura.',
  ] },
  { id: 'dist-pregador-abusar-da-paciencia', nome: 'Abusar da Paciência', grupo: 'distincao', livro: 'deuses', pagina: 120,
    tags: 'Pregador', distincao: 'pregador', marca: false, deus: null, magica: false,
    preReq: 'Está nas Escrituras, capacidade de lançar magias divinas de 2º círculo', custo: null, quadro: null, texto: [
    'O pregador consegue alcançar até mesmo os limites da paciência infinita dos deuses.',
    'Você pode fazer um teste de Religião (CD 15, +5 para cada outra vez que usou este poder no mesmo dia) para incomodar um deus qualquer em troca de poder mágico. Se passar, até o fim da cena pode lançar uma magia divina que não conheça, de qualquer círculo a que tenha acesso, pagando seus custos normalmente. Se falhar, não pode mais usar este poder até o fim do dia.',
  ] },
  { id: 'dist-pregador-esta-nas-escrituras', nome: 'Está nas Escrituras', grupo: 'distincao', livro: 'deuses', pagina: 120,
    tags: 'Pregador', distincao: 'pregador', marca: false, deus: null, magica: false,
    preReq: 'Sincretismo Oportuno', custo: '1 PM', quadro: null, texto: [
    'Para o pregador, a força dos textos sagrados está nas entrelinhas.',
    'Quando falha em um teste de Enganação ou Religião, você pode gastar 1 PM para repetir esse teste usando a outra perícia (Enganação para um teste de Religião e vice-versa).',
  ] },
  { id: 'dist-pregador-nao-fui-eu', nome: 'Não Fui Eu', grupo: 'distincao', livro: 'deuses', pagina: 120,
    tags: 'Pregador', distincao: 'pregador', marca: false, deus: null, magica: false,
    preReq: 'Está nas Escrituras', custo: '2 PM', quadro: null, texto: [
    'Um sorriso “sincero” e desculpas no momento certo já livraram mais de um pregador.',
    'Quando é alvo de uma ação hostil de uma criatura inteligente (Int –3 ou maior), você pode gastar 2 PM e fazer um teste de Enganação oposto pelo teste de Vontade dessa criatura. Se o alvo for devoto de uma divindade da qual você é considerado devoto, você recebe +5 nesse teste. Se passar, a ação hostil falha e a criatura perde a ação. Você só pode usar este poder uma vez por criatura por cena.',
  ] },
  { id: 'dist-pregador-releitura-conveniente', nome: 'Releitura Conveniente', grupo: 'distincao', livro: 'deuses', pagina: 120,
    tags: 'Pregador', distincao: 'pregador', marca: false, deus: null, magica: false,
    preReq: 'Sincretismo Oportuno', custo: '1 PM', quadro: null, texto: [
    'O pregador sabe que a palavra dos deuses está sujeita a “interpretações”.',
    'Você pode gastar 1 PM para considerar uma característica de uma divindade como parte das características do seu deus. Você pode escolher entre Arma Preferida, Canalizar Energia ou ser considerado devoto desse deus para cumprir requisitos de usar habilidades e itens. Esse efeito dura até o fim da cena ou até você usá-lo novamente.',
  ] },
  { id: 'dist-pregador-vender-indulgencias', nome: 'Vender Indulgências', grupo: 'distincao', livro: 'deuses', pagina: 120,
    tags: 'Pregador', distincao: 'pregador', marca: false, deus: null, magica: false,
    preReq: 'Sincretismo Oportuno', custo: null, quadro: null, texto: [
    'O perdão dos deuses tem um preço. E na mão do pregador é mais barato.',
    'Quando um aliado em alcance curto faz um teste de perícia, ele pode gastar 3 PM para rolar novamente esse teste. Se ele fizer isso, você recebe 1 PM temporário cumulativo. Você pode ganhar um máximo de PM temporários por cena igual ao total de poderes da distinção que possui. Esses pontos temporários desaparecem no fim da cena.',
  ] },

  //  Sombra de Tenebra (p. 121–123) — 1 marca + 6 poderes.
  //  O livro chama o poder de "Miragem de Sombras" no título e de
  //  "Miragem das Sombras" no pré-requisito do Clone Sombrio; as duas
  //  grafias ficam como estão.
  { id: 'dist-sombra-ameaca-das-sombras', nome: 'Ameaça das Sombras', grupo: 'distincao', livro: 'deuses', pagina: 123,
    tags: 'Sombra de Tenebra', distincao: 'sombra-de-tenebra', marca: true, deus: 'Tenebra', magica: false,
    preReq: null, custo: null, quadro: null, texto: [
    'Marca da distinção. Para o sombra de Tenebra, as trevas revelam as fraquezas dos inimigos.',
    'Se estiver em uma área de escuridão, você pode usar a habilidade Ataque Furtivo +1d6. Se já possui a habilidade, o bônus é cumulativo.',
  ] },
  { id: 'dist-sombra-caminhar-nas-trevas', nome: 'Caminhar nas Trevas', grupo: 'distincao', livro: 'deuses', pagina: 123,
    tags: 'Sombra de Tenebra', distincao: 'sombra-de-tenebra', marca: false, deus: 'Tenebra', magica: true,
    preReq: 'treinado em Acrobacia e Furtividade, Passo Sombrio, deve ser capaz de enxergar no escuro', custo: null, quadro: null, texto: [
    'As sombras que tudo cobrem não são mais que caminhos.',
    'Você aprende e pode lançar Manto de Sombras. Caso aprenda novamente essa magia, seu custo diminui em –1 PM. Para cada dois outros poderes da distinção que você possui, a ação necessária para lançar essa magia diminui em um passo (de padrão para movimento e de movimento para livre). ✦',
  ] },
  { id: 'dist-sombra-clone-sombrio', nome: 'Clone Sombrio', grupo: 'distincao', livro: 'deuses', pagina: 123,
    tags: 'Sombra de Tenebra', distincao: 'sombra-de-tenebra', marca: false, deus: 'Tenebra', magica: true,
    preReq: 'treinado em Misticismo, Miragem das Sombras', custo: '3 PM', quadro: null, texto: [
    'No gelado abraço da escuridão, encontramos aliados.',
    'Você pode gastar uma ação padrão e 3 PM para criar um clone de sombras em um espaço desocupado em alcance curto. Ele é uma criatura com características iguais às suas, mas tem Evasão, é imune a efeitos mentais e tem 1 PV. No início dos seus turnos, ele pode usar a ação movimentar-se uma vez. Uma vez por rodada, você pode gastar uma ação de movimento para fazer o clone causar, em uma criatura adjacente, 1d6 pontos de dano de frio por poder da distinção que você possui, ou executar uma manobra de combate. Para cada dois outros poderes da distinção que possui, você pode pagar +3 PM para invocar um clone adicional. ✦',
  ] },
  { id: 'dist-sombra-forma-de-sombra', nome: 'Forma de Sombra', grupo: 'distincao', livro: 'deuses', pagina: 123,
    tags: 'Sombra de Tenebra', distincao: 'sombra-de-tenebra', marca: false, deus: 'Tenebra', magica: false,
    preReq: 'Ataque Furtivo, Sombra Espreitadora', custo: '1 PM', quadro: null, texto: [
    'Um com a escuridão, sempre.',
    'Enquanto estiver sob efeito de Manto de Sombras, você causa +1 ponto de dano por dado de dano de trevas. Além disso, quando faz um ataque, você pode gastar 1 PM para cobrir sua arma de sombras. Se fizer isso, esse ataque pode afetar uma criatura normal e, se for um ataque furtivo, o dano extra dessa habilidade se torna dano de trevas.',
  ] },
  { id: 'dist-sombra-miragem-de-sombras', nome: 'Miragem de Sombras', grupo: 'distincao', livro: 'deuses', pagina: 123,
    tags: 'Sombra de Tenebra', distincao: 'sombra-de-tenebra', marca: false, deus: 'Tenebra', magica: true,
    preReq: 'Caminhar nas Trevas', custo: null, quadro: null, texto: [
    'Aqueles que não enxergam no escuro tentam preencher o vazio com imagens criadas por suas mentes.',
    'Você aprende a magia Criar Ilusões (CD Int). Se possuir três outros poderes da distinção, a magia recebe o seguinte aprimoramento. +2PM: suas ilusões emanam uma aura de 3m que concede camuflagem leve por escuridão a criaturas adjacentes a elas.',
  ] },
  { id: 'dist-sombra-moldar-sombra', nome: 'Moldar Sombra', grupo: 'distincao', livro: 'deuses', pagina: 123,
    tags: 'Sombra de Tenebra', distincao: 'sombra-de-tenebra', marca: false, deus: 'Tenebra', magica: true,
    preReq: 'Miragem de Sombras', custo: '2 PM', quadro: null, texto: [
    'Mais que aliadas, as trevas são armas.',
    'Você pode gastar uma ação de movimento e 2 PM para criar uma arma corpo a corpo ou de arremesso com a qual seja proficiente, ou uma ferramenta. O item surge em sua mão e dura até o fim da cena ou até passar 1 rodada sem ser empunhado por você. Armas criadas dessa forma causam dano de trevas em vez do seu tipo normal e ferramentas fornecem +1 em testes das respectivas perícias (cumulativo com quaisquer bônus já fornecidos pela ferramenta). Para cada dois outros poderes da distinção que você possui, o bônus fornecido pela ferramenta aumenta em +1. ✦',
  ] },
  { id: 'dist-sombra-sombra-espreitadora', nome: 'Sombra Espreitadora', grupo: 'distincao', livro: 'deuses', pagina: 123,
    tags: 'Sombra de Tenebra', distincao: 'sombra-de-tenebra', marca: false, deus: 'Tenebra', magica: false,
    preReq: 'Caminhar nas Trevas, Passo Sombrio', custo: null, quadro: null, texto: [
    'Seus inimigos irão aprender a temer a própria sombra.',
    'Sempre que usar Passo Sombrio para alcançar um espaço adjacente a uma criatura, você pode fazer um teste de Acrobacia oposto ao teste de Percepção ou Reflexos dela. Se você passar, essa criatura fica desprevenida contra seu próximo ataque e esse ataque causa +1 ponto de dano de trevas por dado de dano.',
  ] },

  //  Sortudo de Nimb (p. 124–126) — 1 marca + 6 poderes, a maior lista
  //  de poderes do capítulo junto com a do sombra de Tenebra.
  { id: 'dist-sortudo-sorte-boba', nome: 'Sorte Boba', grupo: 'distincao', livro: 'deuses', pagina: 126,
    tags: 'Sortudo de Nimb', distincao: 'sortudo-de-nimb', marca: true, deus: 'Nimb', magica: false,
    preReq: null, custo: null, quadro: null, texto: [
    'Marca da distinção. Até mesmo a sua sorte tem sorte.',
    'Quando usa uma habilidade que permite rolar qualquer dado novamente, você rola dois dados desse tipo e usa o melhor resultado.',
  ] },
  { id: 'dist-sortudo-sorte-visitante', nome: 'Sorte Visitante', grupo: 'distincao', livro: 'deuses', pagina: 126,
    tags: 'Sortudo de Nimb', distincao: 'sortudo-de-nimb', marca: false, deus: 'Nimb', magica: false,
    preReq: 'Sortudo ou Sorte dos Loucos, devoto de Nimb', custo: null, quadro: null, texto: [
    'Para o sortudo de Nimb, a sorte é uma visita frequente.',
    'No início de cada cena, role 1d8. Em um resultado 1, até o fim da cena você pode rolar novamente qualquer teste recém-feito. A cada dois outros poderes da distinção, esse d8 diminui em um passo.',
  ] },
  { id: 'dist-sortudo-bencao-de-nimb', nome: 'Bênção de Nimb', grupo: 'distincao', livro: 'deuses', pagina: 126,
    tags: 'Sortudo de Nimb', distincao: 'sortudo-de-nimb', marca: false, deus: 'Nimb', magica: false,
    preReq: 'Sorte Visitante', custo: null, quadro: null, texto: [
    'É melhor ser sortudo do que ser bom.',
    'Sempre que faz um teste ou rola um dado em uma tabela ou para determinar a ocorrência de um evento (como o dado de confusão das Obrigações & Restrições de Nimb), você rola duas vezes e escolhe qual resultado usar. A critério do mestre, este poder pode se aplicar a outras rolagens de eventos aleatórios, como a chance de ocorrer um encontro.',
  ] },
  { id: 'dist-sortudo-caminhada-descuidada', nome: 'Caminhada Descuidada', grupo: 'distincao', livro: 'deuses', pagina: 126,
    tags: 'Sortudo de Nimb', distincao: 'sortudo-de-nimb', marca: false, deus: 'Nimb', magica: true,
    preReq: 'Bênção de Nimb', custo: '2 PM', quadro: null, texto: [
    'Com sorte você atravessa o mundo, sem sorte você não atravessa a rua.',
    'Quando um ataque ou habilidade causa dano a você, você pode gastar 2 PM para fazer um teste de Vontade com CD igual ao resultado do teste de ataque ou à CD para resistir à habilidade. Se passar nesse teste, você não sofre dano e, se passar por 10 ou mais, uma criatura a sua escolha dentro do alcance do ataque ou da habilidade sofre o dano que seria causado. ✦',
  ] },
  { id: 'dist-sortudo-50-50', nome: '50/50', grupo: 'distincao', livro: 'deuses', pagina: 126,
    tags: 'Sortudo de Nimb', distincao: 'sortudo-de-nimb', marca: false, deus: 'Nimb', magica: true,
    preReq: 'Sorte É o Que Se Faz', custo: '5 PM', quadro: null, texto: [
    'Na vida tudo acontece. Ou não.',
    'Você pode gastar 5 PM e uma ação de movimento para gerar uma aura com 9m de raio de sorte e azar absolutos, com duração sustentada. Dentro dessa aura, todos os testes são resolvidos com uma rolagem de 1d2; resultados 1 são falhas e 2 são sucessos. Sempre que um teste dentro da aura for um sucesso, você recupera 2 PM e, sempre que for uma falha, você perde 2 PM. ✦',
  ] },
  { id: 'dist-sortudo-olha-so-quem-diria', nome: 'Olha Só, Quem Diria?', grupo: 'distincao', livro: 'deuses', pagina: 126,
    tags: 'Sortudo de Nimb', distincao: 'sortudo-de-nimb', marca: false, deus: 'Nimb', magica: true,
    preReq: '50/50', custo: '6 PM', quadro: null, texto: [
    'Não é todo dia que se encontra uma vingadora sagrada no chão...',
    'Uma vez por cena, você pode gastar uma ação completa e 6 PM para fazer um item mágico menor, a sua escolha, surgir em um espaço desocupado em alcance curto. Você não pode escolher itens únicos ou artefatos. O item desaparece ao fim da cena, ou se passar ao controle de outra pessoa. Quando isso acontece, quaisquer benefícios concedidos pelo item desaparecem. ✦',
  ] },
  { id: 'dist-sortudo-sorte-e-o-que-se-faz', nome: 'Sorte é o Que Se Faz', grupo: 'distincao', livro: 'deuses', pagina: 126,
    tags: 'Sortudo de Nimb', distincao: 'sortudo-de-nimb', marca: false, deus: 'Nimb', magica: true,
    preReq: 'Bênção de Nimb', custo: '3 PM', quadro: null, texto: [
    'Até a sorte pode receber um empurrãozinho.',
    'Uma vez por rodada, quando uma criatura em alcance curto faz um teste de perícia, você pode gastar 3 PM para influenciar a sorte, ou o azar, dela. Se fizer isso, role 1d20. Você pode trocar os resultados das duas rolagens (a criatura usa o resultado do seu d20 e você fica com o resultado do d20 dela). Até o fim da cena, você pode usar o resultado trocado como a rolagem de um de seus testes de perícia. Você só pode usar este poder uma vez por teste de perícia na mesma cena para cada criatura. ✦',
  ] },

  //  Sumo-Sacerdote (p. 127–129) — 1 marca + 5 poderes. É a distinção
  //  de quem comanda uma igreja: quatro dos cinco escalam.
  { id: 'dist-sumo-autoridade-divina', nome: 'Autoridade Divina', grupo: 'distincao', livro: 'deuses', pagina: 129,
    tags: 'Sumo-Sacerdote', distincao: 'sumo-sacerdote', marca: true, deus: null, magica: false,
    preReq: null, custo: null, quadro: null, texto: [
    'Marca da distinção. “Eu falo em nome do seu deus. Desrespeitar-me é desrespeitar sua fé.”',
    'Você é a autoridade máxima em uma igreja reconhecida pelos outros membros de sua fé. Você recebe o poder Autoridade Eclesiástica para sua divindade. Se já tiver esse poder, em vez disso recebe +2 em Religião e na CD de suas magias divinas.',
  ] },
  { id: 'dist-sumo-protecao-divina', nome: 'Proteção Divina', grupo: 'distincao', livro: 'deuses', pagina: 129,
    tags: 'Sumo-Sacerdote', distincao: 'sumo-sacerdote', marca: false, deus: null, magica: false,
    preReq: 'treinado em Religião, devoto de um deus maior', custo: null, quadro: null, texto: [
    'Ofensas de devotos menores não afetam o sumo; ele é o escolhido de seu deus.',
    'Você passa automaticamente em testes de resistência contra magias divinas lançadas por devotos de sua divindade.',
  ] },
  { id: 'dist-sumo-bencao-do-patrono', nome: 'Bênção do Patrono', grupo: 'distincao', livro: 'deuses', pagina: 129,
    tags: 'Sumo-Sacerdote', distincao: 'sumo-sacerdote', marca: false, deus: null, magica: false,
    preReq: 'Proteção Divina', custo: null, quadro: null, texto: [
    'Os deuses olham por seus principais mensageiros.',
    'Você recebe um poder concedido de seu deus, desde que cumpra seus pré-requisitos. Além disso, pode gastar uma ação de movimento para trocar um de seus poderes concedidos por outro. Para cada outro poder da distinção, você recebe um novo poder concedido. Este poder afeta apenas poderes recebidos por sua devoção.',
  ] },
  { id: 'dist-sumo-evolucao-espiritual', nome: 'Evolução Espiritual', grupo: 'distincao', livro: 'deuses', pagina: 129,
    tags: 'Sumo-Sacerdote', distincao: 'sumo-sacerdote', marca: false, deus: null, magica: false,
    preReq: 'Proteção Divina', custo: null, quadro: null, texto: [
    'Para melhor representar seu deus, o sumo-sacerdote é abençoado com seu poder divino.',
    'Para cada poder da distinção, você recebe +5 PV e +2 PM, e a CD de suas magias divinas e de seus poderes concedidos por sua divindade aumenta em +1.',
  ] },
  { id: 'dist-sumo-presente-dos-deuses', nome: 'Presente dos Deuses', grupo: 'distincao', livro: 'deuses', pagina: 129,
    tags: 'Sumo-Sacerdote', distincao: 'sumo-sacerdote', marca: false, deus: null, magica: false,
    preReq: 'Bênção do Patrono', custo: null, quadro: null, texto: [
    'Qualquer que seja sua origem, todo sumo-sacerdote é um canal para os milagres divinos.',
    'Você recebe a habilidade Magias, como um clérigo de nível igual ao dobro dos poderes da distinção que você possui. Se já possui essa habilidade, em vez disso soma sua Sabedoria no limite de PM que pode gastar em magias divinas e em seu total de PM (cumulativo com efeitos que já o fazem).',
  ] },
  { id: 'dist-sumo-punicao-divina', nome: 'Punição Divina', grupo: 'distincao', livro: 'deuses', pagina: 129,
    tags: 'Sumo-Sacerdote', distincao: 'sumo-sacerdote', marca: false, deus: null, magica: false,
    preReq: 'Bênção do Patrono', custo: null, quadro: null, texto: [
    'O sumo-sacerdote é um instrumento da ira de seu deus.',
    'O sumo-sacerdote pode gastar uma ação padrão para cancelar as magias divinas e os poderes concedidos de um devoto de sua divindade em sua linha de visão (Von CD Sab, +1 por poder da distinção, evita e o devoto não pode mais ser punido por 1 dia). A punição pode ser revertida com uma ação padrão do sumo-sacerdote ou com uma missão sagrada realizada como parte de um rito (veja Religião em Tormenta20, p. 122).',
  ] },

  //  Taumaturgista (p. 130–132) — 1 marca + 5 poderes.
  //  Dois deslizes de impressão ficam literais, conferidos no -layout da
  //  p. 132: "pégaso e ou dragonete" e o título "titereiro Planar", que
  //  é o único poder do capítulo impresso em caixa baixa.
  { id: 'dist-taumaturgista-auxiliar-divino', nome: 'Auxiliar Divino', grupo: 'distincao', livro: 'deuses', pagina: 132,
    tags: 'Taumaturgista', distincao: 'taumaturgista', marca: true, deus: null, magica: true,
    preReq: null, custo: null, quadro: null, texto: [
    'Marca da distinção. As primeiras conjurações do taumaturgista envolvem pequenos seres dos mundos divinos.',
    'Você aprende e pode lançar uma das magias a seguir como uma de suas magias divinas: Conjurar Monstro, Montaria Arcana ou Servos Invisíveis. A cada dois poderes da distinção, você aprende e pode lançar outra dessas magias (caso aprenda novamente uma delas, seu custo diminui em –1 PM). ✦',
  ] },
  { id: 'dist-taumaturgista-amigo-de-outro-mundo', nome: 'Amigo de Outro Mundo', grupo: 'distincao', livro: 'deuses', pagina: 132,
    tags: 'Taumaturgista', distincao: 'taumaturgista', marca: false, deus: null, magica: true,
    preReq: 'treinado em Religião, capacidade de lançar magias divinas de 3° círculo, Servo Divino', custo: '2 PM', quadro: null, texto: [
    'Ninguém nunca teve um amigo assim.',
    'Você tem um amigo de outro mundo, uma criatura extraplanar que você pode invocar em momentos de necessidade. Escolha um parceiro entre os parceiros básicos (Tormenta20, p. 260) ou entre um pilly, luminar, pégaso e ou dragonete (veja o Capítulo 4). Uma vez feita, essa escolha não pode ser mudada. Você pode gastar uma ação de movimento e 2 PM para invocar seu amigo de outro mundo, que aparece com um brilho de luz mágica ao seu lado e permanece até o fim da cena ou até ser destruído (um amigo destruído não pode ser invocado novamente por 1 dia). Seu amigo é um parceiro iniciante mas, para cada dois outros poderes da distinção, sobe um nível (de iniciante para veterano, de veterano para mestre). ✦',
  ] },
  { id: 'dist-taumaturgista-barganha-planar', nome: 'Barganha Planar', grupo: 'distincao', livro: 'deuses', pagina: 132,
    tags: 'Taumaturgista', distincao: 'taumaturgista', marca: false, deus: null, magica: true,
    preReq: 'Amigo de Outro Mundo', custo: null,
    quadro: { titulo: 'Efeitos da Barganha Planar', texto: [
      'Abissal. Quando seu amigo é invocado, criaturas a sua escolha em um raio de 6m dele sofrem 2d8+2 pontos de dano de trevas e ficam abaladas por 1 rodada (Vontade CD Sab reduz à metade e evita a condição).',
      'Celestial. Quando seu amigo é invocado, criaturas a sua escolha em um raio de 6m dele recebem 4d8+4 PV temporários.',
      'Elemental. Escolha um elemento entre ácido, eletricidade, fogo ou frio. Quando seu amigo é invocado, criaturas a sua escolha em um raio de 6m dele sofrem 2d12+2 pontos de dano do tipo escolhido (Reflexos CD Sab reduz à metade).',
      'Feérico. Quando seu amigo é invocado, criaturas a sua escolha em um raio de 6m dele sofrem –2 em testes de Vontade por 1 rodada.',
    ] },
    texto: [
    'O pacto do taumaturgista infunde suas invocações com poder planar.',
    'Escolha um dos efeitos a seguir (uma vez feita, essa escolha não pode ser alterada). Quando invoca seu amigo de outro mundo ele traz uma fração de poder extraplanar do tipo escolhido. ✦',
  ] },
  { id: 'dist-taumaturgista-contrato-planar', nome: 'Contrato Planar', grupo: 'distincao', livro: 'deuses', pagina: 132,
    tags: 'Taumaturgista', distincao: 'taumaturgista', marca: false, deus: null, magica: false,
    preReq: 'Barganha Planar', custo: null, quadro: null, texto: [
    'Um taumaturgista habilidoso mantém mais de um contrato planar ativo, sempre.',
    'Você tem um segundo amigo de outro mundo. Escolha um efeito de Barganha Planar para esse segundo amigo. Se escolher um igual, ele é cumulativo.',
  ] },
  { id: 'dist-taumaturgista-invocacao-corrompida', nome: 'Invocação Corrompida', grupo: 'distincao', livro: 'deuses', pagina: 132,
    tags: 'Taumaturgista', distincao: 'taumaturgista', marca: false, deus: null, magica: false,
    preReq: 'Amigo de Outro Mundo, dois poderes da Tormenta', custo: null, quadro: null, texto: [
    'Em suas pesquisas, o taumaturgista pode encontrar coisas terríveis… que podem ser invocadas.',
    'Um ou mais dos seus amigos de outro mundo se tornam corrompidos pela Tormenta. Quando esse amigo é invocado, criaturas a sua escolha em um raio de 6m dele perdem 2d4 PM (CD Sab reduz à metade). Se isso zerar seus PM, a criatura fica confusa. Além disso, enquanto esse amigo estiver presente, você recebe +5 em Percepção e não pode ser flanqueado.',
  ] },
  { id: 'dist-taumaturgista-titereiro-planar', nome: 'titereiro Planar', grupo: 'distincao', livro: 'deuses', pagina: 132,
    tags: 'Taumaturgista', distincao: 'taumaturgista', marca: false, deus: null, magica: false,
    preReq: 'Conjurar Monstro, Amigo de Outro Mundo', custo: null, quadro: null, texto: [
    'Para o taumaturgista, controlar convocações menores se torna um ato banal.',
    'Quando lança Conjurar Monstro, você pode dar ordens ao monstro como uma ação de movimento (em vez de uma ação padrão) e a magia não conta no limite de magias que você pode sustentar em um turno.',
  ] },

  //  Teurgista Hermético (p. 133–135) — 1 marca + 5 poderes. A marca
  //  apaga a fronteira entre magia arcana e divina.
  { id: 'dist-teurgista-principio-hermetico', nome: 'Princípio Hermético', grupo: 'distincao', livro: 'deuses', pagina: 135,
    tags: 'Teurgista Hermético', distincao: 'teurgista-hermetico', marca: true, deus: null, magica: false,
    preReq: null, custo: null, quadro: null, texto: [
    'Marca da distinção. O teurgista hermético supera as divisões tradicionais da magia.',
    'Você é considerado um conjurador tanto arcano quanto divino, e suas magias são consideradas tanto arcanas quanto divinas.',
  ] },
  { id: 'dist-teurgista-conjuracao-unificada', nome: 'Conjuração Unificada', grupo: 'distincao', livro: 'deuses', pagina: 135,
    tags: 'Teurgista Hermético', distincao: 'teurgista-hermetico', marca: false, deus: null, magica: false,
    preReq: 'treinado em Misticismo e Religião, habilidade Magias (arcanas), habilidade Magias (divinas)', custo: null, quadro: null, texto: [
    'Nas mãos do teurgista, a magia é uma só.',
    'Escolha um entre seus atributos-chave de magias. Você pode usar esse atributo como atributo-chave de todas as suas magias e habilidades relacionadas a elas, exceto cálculo de PM. Entretanto, restrições que afetem qualquer um de seus tipos de magias (como o uso de armaduras e magias arcanas) passam a afetar ambos os tipos.',
  ] },
  { id: 'dist-teurgista-conhecimento-adaptavel', nome: 'Conhecimento Adaptável', grupo: 'distincao', livro: 'deuses', pagina: 135,
    tags: 'Teurgista Hermético', distincao: 'teurgista-hermetico', marca: false, deus: null, magica: false,
    preReq: 'Conjuração Unificada', custo: '1 PM', quadro: null, texto: [
    'Conhecimento é conhecimento. Um teurgista sabe ler o divino através do arcano e o arcano através do divino.',
    'Quando falha em um teste de Misticismo ou Religião, você pode gastar 1 PM para repetir esse teste usando a outra perícia (Misticismo para um teste de Religião e vice-versa).',
  ] },
  { id: 'dist-teurgista-teurgia-aplicada', nome: 'Teurgia Aplicada', grupo: 'distincao', livro: 'deuses', pagina: 135,
    tags: 'Teurgista Hermético', distincao: 'teurgista-hermetico', marca: false, deus: null, magica: false,
    preReq: 'Conjuração Unificada', custo: null, quadro: null, texto: [
    'Um teurgista nunca defere um estudo por outro, pois sabe que arcano e divino são um só.',
    'Escolha duas de suas classes com a habilidade Magias, uma para magias arcanas e outra para magias divinas. Você soma seu total de poderes da distinção no seu nível de cada uma dessas classes (até o limite de seu nível de personagem) para determinar o total de PM que pode gastar nessas magias e os círculos máximos de magia a que tem acesso.',
  ] },
  { id: 'dist-teurgista-vontade-sobre-materia', nome: 'Vontade Sobre Matéria', grupo: 'distincao', livro: 'deuses', pagina: 135,
    tags: 'Teurgista Hermético', distincao: 'teurgista-hermetico', marca: false, deus: null, magica: false,
    preReq: 'Teurgia Aplicada', custo: '+1 PM', quadro: null, texto: [
    'O teurgista aprende a lançar magias em sua forma mais pura.',
    'Quando lança uma magia, você pode pagar +1 PM para que ela ignore imunidades e resistências baseadas em sua escola ou tipo (arcana ou divina).',
  ] },
  { id: 'dist-teurgista-zenite-teurgico', nome: 'Zênite Teúrgico', grupo: 'distincao', livro: 'deuses', pagina: 135,
    tags: 'Teurgista Hermético', distincao: 'teurgista-hermetico', marca: false, deus: null, magica: false,
    preReq: 'Conhecimento Adaptável, Teurgia Aplicada', custo: null, quadro: null, texto: [
    'Fogo ou gelo? Em sua essência, magia é magia.',
    'Quando lança uma magia que causa dano, você pode aplicar a ela efeitos específicos de um tipo de dano como se ela fosse de todos os tipos. Por exemplo, você pode usar um cetro elemental (fogo) com uma magia Adaga Mental.',
  ] },

  //  Tibarita (p. 136–138) — 1 marca + 5 poderes. A única distinção do
  //  capítulo em que o recurso gasto é DINHEIRO, não PM.
  { id: 'dist-tibarita-poder-monetario', nome: 'Poder Monetário', grupo: 'distincao', livro: 'deuses', pagina: 138,
    tags: 'Tibarita', distincao: 'tibarita', marca: true, deus: 'Tibar', magica: false,
    preReq: null, custo: null, quadro: null, texto: [
    'Marca da distinção. Para o tibarita, gastar dinheiro é um ato de devoção e o motivo de sua existência.',
    'Quando usa uma habilidade com um custo em PM, você pode consumir uma quantidade de tibares de ouro (limitada por seu Carisma). Cada TO consumido dessa forma paga 1 PM do custo da habilidade. Você pode consumir um número de TO por dia igual ao seu nível. Caso já possua essa habilidade, o limite de TO que você pode consumir por dia aumenta em +5.',
  ] },
  { id: 'dist-tibarita-o-preco-do-sucesso', nome: 'O Preço do Sucesso', grupo: 'distincao', livro: 'deuses', pagina: 138,
    tags: 'Tibarita', distincao: 'tibarita', marca: false, deus: 'Tibar', magica: false,
    preReq: 'devoto de Tibar, Car 3', custo: null, quadro: null, texto: [
    'Quem tem dinheiro não tenta, consegue.',
    'Quando vai fazer um teste de perícia, você pode comprar um resultado em vez de rolar um dado. Você deve gastar T$ 100 por número desejado no dado (um 18, por exemplo, custa T$ 1.800). Contudo, um resultado comprado dessa forma não é um sucesso automático (deve superar a CD etc.).',
  ] },
  { id: 'dist-tibarita-faro-para-tesouro', nome: 'Faro para Tesouro', grupo: 'distincao', livro: 'deuses', pagina: 138,
    tags: 'Tibarita', distincao: 'tibarita', marca: false, deus: 'Tibar', magica: false,
    preReq: 'O Preço do Sucesso', custo: null, quadro: null, texto: [
    'Para ser capaz de gastar dinheiro, você deve ser capaz de ganhar.',
    'Sempre que é feita uma rolagem para determinar a chance de você ganhar dinheiro e/ou a quantidade de dinheiro que será obtida (incluindo recompensas aleatórias e rolagens de tesouros), você rola duas vezes e você escolhe entre um dos resultados.',
  ] },
  { id: 'dist-tibarita-gostei-vou-comprar', nome: 'Gostei, Vou Comprar!', grupo: 'distincao', livro: 'deuses', pagina: 138,
    tags: 'Tibarita', distincao: 'tibarita', marca: false, deus: 'Tibar', magica: false,
    preReq: 'O Preço do Sucesso, deve ter gastado pelo menos T$ 100.000 ao longo de sua carreira de aventureiro', custo: '6 PM', quadro: null, texto: [
    'Não há nada fora do alcance daqueles que podem pagar.',
    'Quando uma criatura em alcance curto usa uma habilidade de classe que você possa ver, você pode gastar 6 PM para “comprar” essa habilidade. Até o fim da cena, você pode usá-la como uma habilidade de raça (se ela usar um atributo para algo, use seu Carisma). Se “comprar” outra habilidade, você perde a anterior. Habilidades de ameaças com o mesmo nome de habilidades de classe, bem como cada uma de suas magias, também podem ser “compradas” com este poder.',
  ] },
  { id: 'dist-tibarita-revirar-os-bolsos', nome: 'Revirar os Bolsos', grupo: 'distincao', livro: 'deuses', pagina: 138,
    tags: 'Tibarita', distincao: 'tibarita', marca: false, deus: 'Tibar', magica: false,
    preReq: 'O Preço do Sucesso', custo: null, quadro: null, texto: [
    '“Então era aqui que estava essa algibeira!?”',
    'A cada cena, o primeiro tibar de ouro que você consumir para pagar um custo em PM paga 1d4 PM desse custo.',
  ] },
  { id: 'dist-tibarita-saude-comprada', nome: 'Saúde Comprada', grupo: 'distincao', livro: 'deuses', pagina: 138,
    tags: 'Tibarita', distincao: 'tibarita', marca: false, deus: 'Tibar', magica: false,
    preReq: 'O Preço do Sucesso', custo: null, quadro: null, texto: [
    'Tudo tem um preço, até mesmo a vida.',
    'Você pode gastar uma ação completa e uma quantidade de tibares de ouro (limitada pelo seu Carisma) para “comprar” saúde para uma criatura adjacente. Para cada TO gasto, você recupera 3d8 PV da criatura ou remove uma de suas condições entre abalado, alquebrado, apavorado, atordoado, cego, confuso, enfeitiçado, esmorecido, exausto, fatigado, frustrado, pasmo e surdo.',
  ] },

  //  Tirano do Terceiro (p. 139–141) — 1 marca + 5 poderes, a última
  //  do capítulo. O quadro do companheiro dragão é que diz como ele
  //  cresce, e por isso a escala mora na MARCA.
  { id: 'dist-tirano-companheiro-dragao', nome: 'Companheiro Dragão', grupo: 'distincao', livro: 'deuses', pagina: 141,
    tags: 'Tirano do Terceiro', distincao: 'tirano-do-terceiro', marca: true, deus: 'Kallyadranoch', magica: false,
    preReq: null, custo: null,
    quadro: { titulo: 'Companheiro Dragão', texto: [
      'O companheiro dragão de um tirano do Terceiro é um parceiro montaria especial. Use as estatísticas de um grifo (Tormenta20, p. 262) destruidor iniciante, com o subtipo de criatura dragão. Alternativamente, se tiver o suplemento Ameaças de Arton, use um dragão jovem (p. 67). Em ambos os casos, conforme o poder do tirano aumenta, o mesmo acontece com seu companheiro.',
      'Se você tiver pelo menos três poderes da distinção, seu companheiro dragão se torna veterano e, se tiver todos os cinco poderes, ele se torna mestre. Além disso, ao se tornar mestre, seu companheiro dragão vira um dragão adulto; ele se torna uma criatura Enorme e, além de seus benefícios normais, fornece a habilidade Aura Aterradora (CD Car). Além disso, o companheiro dragão recebe a habilidade Metamorfose Dracônica. Assumir outras formas não altera as habilidades de parceiro do dragão e pode ser útil como disfarce mas, dependendo da forma adotada, pode impedi-lo de servir como montaria. Veja Tormenta20, p. 311, para essas habilidades dracônicas.',
    ] },
    texto: [
    'Marca da distinção. Para o tirano, o primeiro passo é o elo com seu dragão.',
    'Você recebe um companheiro dragão jovem (de um tipo a sua escolha) que serve a você como um parceiro montaria iniciante (veja o quadro). Se o seu companheiro dragão morrer, você fica atordoado por 1 rodada. Um companheiro dragão morto pode ser substituído com uma ação entre aventuras.',
  ] },
  { id: 'dist-tirano-aspecto-de-kallyadranoch', nome: 'Aspecto de Kallyadranoch', grupo: 'distincao', livro: 'deuses', pagina: 141,
    tags: 'Tirano do Terceiro', distincao: 'tirano-do-terceiro', marca: false, deus: 'Kallyadranoch', magica: false,
    preReq: 'devoto de Kallyadranoch, treinado em Cavalgar', custo: null, quadro: null, texto: [
    'O corpo do tirano manifesta o elemento de seu companheiro dragão.',
    'Você se torna imune à Aura Aterradora de dragões e recebe redução de dano 10 contra o tipo de dano do sopro do seu companheiro dragão. Além disso, se possuir o poder Escamas Dracônicas, os bônus fornecidos por ele aumentam para +5.',
  ] },
  { id: 'dist-tirano-apoteose-do-terceiro', nome: 'Apoteose do Terceiro', grupo: 'distincao', livro: 'deuses', pagina: 141,
    tags: 'Tirano do Terceiro', distincao: 'tirano-do-terceiro', marca: false, deus: 'Kallyadranoch', magica: true,
    preReq: 'Dádivas do Dragão, Sopro Compartilhado', custo: '10 PM', quadro: null, texto: [
    'Graças à magia do Terceiro, o tirano e seu dragão podem se tornar verdadeiramente um.',
    'Se estiver com seu companheiro dragão e sob efeito de Ira Dracônica, você pode gastar uma ação completa e 10 PM para se fundir a ele com duração sustentada. Você continua recebendo os benefícios de seu dragão, mas seu tipo muda para monstro e seu tamanho muda para Grande, e você recebe imunidade contra o tipo de dano do seu parceiro, deslocamento de voo 18m e +2 em Força, Constituição, Inteligência e Carisma (esse aumento não oferece PV, PM ou perícias adicionais). Além disso, recebe uma arma natural de mordida (1d8, crítico x2, perfuração); uma vez por rodada, quando usa a ação agredir para atacar com outra arma, você pode gastar 1 PM para fazer um ataque corpo a corpo de mordida (se já possuir uma mordida, em vez disso seu dano aumenta em dois passos). ✦',
  ] },
  { id: 'dist-tirano-dadivas-do-dragao', nome: 'Dádivas do Dragão', grupo: 'distincao', livro: 'deuses', pagina: 141,
    tags: 'Tirano do Terceiro', distincao: 'tirano-do-terceiro', marca: false, deus: 'Kallyadranoch', magica: false,
    preReq: 'treinado em Religião, Ira Dracônica', custo: null, quadro: null, texto: [
    'Um combatente devotado, o tirano é recompensado com uma fração de poder divino.',
    'Você aprende e pode lançar uma magia divina de 1º círculo a sua escolha (atributo-chave Sabedoria). A cada dois outros poderes da distinção, você aprende uma magia divina de 1º círculo adicional. Se for um conjurador divino, essas magias podem ser de qualquer círculo a que tenha acesso.',
  ] },
  { id: 'dist-tirano-ira-draconica', nome: 'Ira Dracônica', grupo: 'distincao', livro: 'deuses', pagina: 141,
    tags: 'Tirano do Terceiro', distincao: 'tirano-do-terceiro', marca: false, deus: 'Kallyadranoch', magica: false,
    preReq: 'treinado em Luta, Aspecto de Kallyadranoch', custo: '3 PM', quadro: null, texto: [
    'Os músculos do tirano incham enquanto energia arcana corre em suas veias.',
    'Você pode gastar 3 PM para invocar o aspecto combativo de Kallyadranoch até o fim da cena. Você recebe redução de dano 5 e +2 em testes de ataque, rolagens de dano e na CD de seu Sopro Compartilhado e de suas habilidades mágicas.',
  ] },
  { id: 'dist-tirano-sopro-compartilhado', nome: 'Sopro Compartilhado', grupo: 'distincao', livro: 'deuses', pagina: 141,
    tags: 'Tirano do Terceiro', distincao: 'tirano-do-terceiro', marca: false, deus: 'Kallyadranoch', magica: false,
    preReq: 'Ira Dracônica', custo: null, quadro: null, texto: [
    'A respiração do tirano exala magia elemental.',
    'Você recebe o poder concedido Baforada Dracônica (p. 42) para o elemento do sopro de seu companheiro dragão. Se você já possui esse poder, seu dano total aumenta em mais dois dados e, quando usa seu sopro, você pode escolher entre afetar uma criatura em alcance médio ou todas as criaturas em um cone de 6m.',
  ] },
  ];

  //  Conta quantos de cada grupo, para o chip da busca não mentir.
  const POR_GRUPO = {};
  NOVOS.forEach(p => { POR_GRUPO[p.grupo] = (POR_GRUPO[p.grupo] || 0) + 1; });
  (window.GA_PODERES_GRUPOS || []).forEach(g => {
    if (POR_GRUPO[g.chave] != null) g.quantos = POR_GRUPO[g.chave];
  });

  window.GA_PODERES.push.apply(window.GA_PODERES, NOVOS);
})();
