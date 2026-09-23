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

  ];

  //  Conta quantos de cada grupo, para o chip da busca não mentir.
  const POR_GRUPO = {};
  NOVOS.forEach(p => { POR_GRUPO[p.grupo] = (POR_GRUPO[p.grupo] || 0) + 1; });
  (window.GA_PODERES_GRUPOS || []).forEach(g => {
    if (POR_GRUPO[g.chave] != null) g.quantos = POR_GRUPO[g.chave];
  });

  window.GA_PODERES.push.apply(window.GA_PODERES, NOVOS);
})();
