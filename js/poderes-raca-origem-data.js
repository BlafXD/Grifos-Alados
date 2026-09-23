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
  ] },
  { id: 'raca-trog', nome: 'Trog', grupo: 'raca-hab', livro: 't20', pagina: 31,
    tags: 'Raça extra', deus: null, magica: false, preReq: null, custo: null, quadro: null, texto: [
    'Constituição +2, Força +1, Inteligência –1.',
    'Mau Cheiro. Você pode gastar uma ação padrão e 2 PM para expelir um gás fétido. Todas as criaturas (exceto trogs) em alcance curto devem passar em um teste de Fortitude contra veneno (CD Con) ou ficarão enjoadas durante 1d6 rodadas. Uma criatura que passe no teste de resistência fica imune a esta habilidade por um dia.',
    'Mordida. Você possui uma arma natural de mordida (dano 1d6, crítico x2, perfuração). Uma vez por rodada, quando usa a ação agredir para atacar com outra arma, pode gastar 1 PM para fazer um ataque corpo a corpo extra com a mordida.',
    'Reptiliano. Você é uma criatura do tipo monstro e recebe visão no escuro, +1 na Defesa e, se estiver sem armadura ou roupas pesadas, +5 em Furtividade.',
    'Sangue Frio. Você sofre 1 ponto de dano adicional por dado de dano de frio.',
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

  ];

  //  Conta quantos de cada grupo, para o chip da busca não mentir.
  const POR_GRUPO = {};
  NOVOS.forEach(p => { POR_GRUPO[p.grupo] = (POR_GRUPO[p.grupo] || 0) + 1; });
  (window.GA_PODERES_GRUPOS || []).forEach(g => {
    if (POR_GRUPO[g.chave] != null) g.quantos = POR_GRUPO[g.chave];
  });

  window.GA_PODERES.push.apply(window.GA_PODERES, NOVOS);
})();
