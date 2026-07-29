// ════════════════════════════════════════════════════════════════════
//  CRIACAO-ITENS-DATA.JS — Regras de Criação de Itens (Tormenta20)
//  Conteúdo da sub-aba "🔨 Criação de Itens" das Consultas rápidas.
//  Transcrito de 'Regras.txt' (perícia Ofício, categorias de item,
//  Itens Superiores/Melhorias, Itens Mágicos/Encantos, Emulsões,
//  Bebidas). Mesmo formato de REGRAS_ACOES: { grupo, titulo, texto,
//  tabela? }. Consumido por criacao-itens.js — mesmo motor de
//  acoes.js (cards recolhíveis + busca), mais a calculadora no topo.
//
//  ── SOBRE OS VALORES DE ENCANTOS (leia antes de mexer) ───────────
//  A Tabela de Preço de Encantos é citada no livro como "veja a
//  tabela ao lado", mas essa tabela lateral não veio no Regras.txt.
//  Os valores de 1 e 3 encantos SÃO confirmados — aparecem nos
//  próprios exemplos do texto (espada longa +1 encanto = T$18.015,
//  CD 30; +4 melhorias +3 encantos = T$90.015, CD 60). O valor de
//  2 encantos foi interpolado (progressão linear que bate com os
//  dois valores confirmados) e está marcado `estimado: true` — a
//  calculadora avisa isso na tela. Se seu livro tiver outro valor,
//  edite em ENCANTOS_PADRAO abaixo (ou ajuste ao vivo pela própria
//  aba, em "⚙ Ajustar tabela de preços" — fica salvo automaticamente).
// ════════════════════════════════════════════════════════════════════
window.GA_CRIACAO_ITENS = (function () {

  // ── TABELA 3-7: PREÇO DE MELHORIAS (confirmada, completa) ────────
  const MELHORIAS_PADRAO = [
    { n: 1, preco: 300,   cd: 5  },
    { n: 2, preco: 3000,  cd: 10 },
    { n: 3, preco: 9000,  cd: 15 },
    { n: 4, preco: 18000, cd: 20 },
  ];

  // ── PREÇO DE ENCANTOS (1 e 3 confirmados; 2 é estimativa — ver nota acima) ─
  const ENCANTOS_PADRAO = [
    { n: 1, preco: 18000, cd: 10 },
    { n: 2, preco: 36000, cd: 15, estimado: false },
    { n: 3, preco: 72000, cd: 20 },
  ];

  // ── EMULSÕES (confirmada, completa) ───────────────────────────────
  const EMULSOES_PADRAO = [
    { n: 1, preco: 250,  cd: 25 },
    { n: 2, preco: 750,  cd: 30 },
    { n: 3, preco: 1500, cd: 35 },
  ];

  // ── CATEGORIAS E SUAS CDs DE FABRICAÇÃO (confirmadas) ─────────────
  const CATEGORIAS_CD = [
    { categoria: 'Equipamento de aventura',              cd: 15 },
    { categoria: 'Armas simples',                        cd: 15 },
    { categoria: 'Munições',                              cd: 15 },
    { categoria: 'Armaduras leves',                       cd: 15 },
    { categoria: 'Escudos',                                cd: 15 },
    { categoria: 'Alquímicos — Preparados',                cd: 15 },
    { categoria: 'Alquímicos — Catalisadores',             cd: 15, obs: 'exige treino em Misticismo' },
    { categoria: 'Ferramentas',                            cd: 20 },
    { categoria: 'Vestuário',                               cd: 20 },
    { categoria: 'Esotéricos',                              cd: 20, obs: 'exige treino em Misticismo' },
    { categoria: 'Armas marciais, exóticas ou de fogo',    cd: 20 },
    { categoria: 'Armaduras pesadas',                      cd: 20 },
    { categoria: 'Alquímicos — Venenos',                    cd: 20 },
  ];

  // ── CARDS DE REFERÊNCIA (mesmo formato de REGRAS_ACOES) ───────────
  const REGRAS = [

    // ── OFÍCIO (a perícia) ──────────────────────────────────────────
    { grupo: '🛠 A Perícia Ofício', titulo: 'Ofício (Int · treinada)', texto:
`Ofício na verdade são várias perícias diferentes. Cada uma permite fabricar itens de certas categorias:
• Armeiro — Armas e Armaduras & Escudos.
• Artesão — Equipamento de Aventura, Ferramentas, Esotéricos e Veículos.
• Alquimista — Alquímicos.
• Cozinheiro — Alimentação.
• Alfaiate — Vestuário.
Você pode inventar outros tipos de Ofício (carpinteiro, pedreiro, ourives, fazendeiro, pescador, estalajadeiro, escriba, escultor, pintor...); nesses casos, converse com o mestre sobre os usos da perícia.
Um personagem sem os instrumentos de ofício específicos sofre –5 no teste.` },

    { grupo: '🛠 A Perícia Ofício', titulo: 'Fabricar', texto:
`Você produz um item gastando matéria-prima e tempo de trabalho. A matéria-prima custa um terço do preço do item.
Tempo de trabalho: um dia para consumíveis (itens alquímicos, pergaminhos, poções, munições...); uma semana para não consumíveis comuns (armas, ferramentas...); um mês para não consumíveis superiores e/ou mágicos.
Para consumíveis, você pode sofrer –5 no teste para fabricar duas unidades no mesmo tempo (pagando o custo de ambas). Itens muito simples podem levar menos tempo; itens muito grandes ou complexos (uma casa, uma ponte) podem demorar vários meses — a critério do mestre.
CD do teste: 15 para itens simples, 20 para itens complexos (veja a tabela de categorias abaixo).` },

    { grupo: '🛠 A Perícia Ofício', titulo: 'Consertar', texto:
`Reparar um item destruído tem a mesma CD que fabricá-lo. Cada tentativa consome uma hora de trabalho e um décimo do preço original do item. Em caso de falha, o tempo e o dinheiro são perdidos (mas você pode tentar de novo).` },

    { grupo: '🛠 A Perícia Ofício', titulo: 'Identificar (CD 20)', texto:
`Você pode identificar itens raros e exóticos ligados ao seu Ofício. Se passar, descobre as propriedades do item e seu preço. Este uso gasta uma ação completa.` },

    { grupo: '🛠 A Perícia Ofício', titulo: 'Sustento (CD 15)', texto:
`Com uma semana de trabalho e um teste de Ofício, você ganha T$ 1, mais T$ 1 por ponto que seu teste exceder a CD. Por exemplo, com um resultado 20, ganha T$ 6 pela semana de trabalho.
Trabalhadores sem treinamento usam testes de atributo para sustento. A critério do mestre, outras perícias podem ser usadas para sustento, como Adestramento, Cura ou Sobrevivência.` },

    // ── CD POR CATEGORIA ─────────────────────────────────────────────
    { grupo: '📋 CD por Categoria', titulo: 'CD de fabricação por categoria', texto:
`A CD do teste de Ofício depende da categoria do item — veja a tabela. Ela é a mesma usada como "CD base" na calculadora acima.`,
      tabela: { cab: ['Categoria', 'CD'], destaque: 1,
        linhas: CATEGORIAS_CD.map(c => [c.categoria + (c.obs ? ' (' + c.obs + ')' : ''), String(c.cd)]) } },

    // ── MUNIÇÕES ─────────────────────────────────────────────────────
    { grupo: '📋 CD por Categoria', titulo: 'Munições — regra especial de preço', texto:
`Munição é vendida em pacotes com projéteis suficientes para 20 ataques. Sempre que você faz um ataque com uma arma de disparo, a munição é perdida, independentemente de o ataque acertar ou não.
Pacotes de munições podem receber melhorias e encantos como armas (mas efeitos de munições não acumulam com os da arma de disparo). O aumento no preço de um pacote de munição superior ou mágico é METADE do aumento de uma arma — uma munição com uma melhoria, por exemplo, custa +T$ 150, em vez de +T$ 300.` },

    // ── ITENS SUPERIORES / MELHORIAS ──────────────────────────────────
    { grupo: '⚒ Itens Superiores', titulo: 'O que são itens superiores', texto:
`Itens superiores são equipamentos de alta qualidade, fabricados com as melhores técnicas e matérias-primas. Em termos de jogo, possuem de uma a quatro melhorias — cada melhoria fornece um benefício, mas aumenta o preço do item.
Por exemplo, uma espada longa normal custa T$ 15. Uma espada longa superior com uma melhoria custa T$ 315. Já uma espada longa com quatro melhorias custa incríveis T$ 18.015!
Itens com uma melhoria são caros, mas ainda relativamente comuns (ex.: guardas de um castelo próspero). Itens com duas melhorias são muito valiosos e nunca produzidos em grande quantidade (ex.: o capitão da guarda). Itens com três ou quatro melhorias são obras-primas, tão ou mais famosas quanto seus portadores — normalmente heranças passadas de geração em geração.` },

    { grupo: '⚒ Itens Superiores', titulo: 'Melhorias — quem pode receber', texto:
`Apenas itens das categorias armas, armaduras e escudos, ferramentas, vestuário e esotéricos podem receber melhorias. Cada melhoria só pode ser aplicada uma vez a um mesmo item.
A lista completa de melhorias (o que cada uma faz) já está disponível no site: selecione o nome de uma melhoria em qualquer caixa de texto (ex. na ficha de uma criatura) e clique em "📖 Descrição" para buscar — ou digite o nome dela lá.`,
      tabela: { cab: ['Nº de melhorias', 'Aumento no preço', 'Aumento na CD'], titulo: 'Tabela 3-7: Preço de Melhorias', destaque: 0,
        linhas: MELHORIAS_PADRAO.map(m => [String(m.n), '+ T$ ' + m.preco.toLocaleString('pt-BR'), '+' + m.cd]) } },

    { grupo: '⚒ Itens Superiores', titulo: 'Fabricando itens superiores', texto:
`Itens superiores só podem ser fabricados por personagens com a habilidade Fabricar Item Superior. A fabricação segue a mesma regra de itens normais, porém, de acordo com o número de melhorias, o preço e a CD do teste de Ofício aumentam (Tabela 3-7 acima).
Exemplo: o preço de uma couraça é T$ 500. Fabricá-la exige um gasto de T$ 166 (um terço do preço) e um teste de Ofício contra CD 15. Já uma couraça com duas melhorias custa T$ 3.500 (T$ 500 + T$ 3.000 das duas melhorias); fabricá-la exige T$ 1.166 (um terço) e CD 25 (15 base + 10 das duas melhorias).
É possível adicionar melhorias a um item já pronto: paga-se a diferença de acordo com o novo número de melhorias (ex.: para ir de duas para três melhorias, paga-se mais T$ 2.000 — um terço da diferença). Além disso, faz-se um teste de Ofício contra a CD do novo número de melhorias; se falhar por 5 ou mais, o item estraga.` },

    { grupo: '⚒ Itens Superiores', titulo: 'Materiais especiais', texto:
`Armas, armaduras, escudos e esotéricos podem ser feitos ou banhados de um material especial. Para isso, o item precisa ter a melhoria "material especial" e você precisa pagar o preço extra do material escolhido (Tabela 3-9 — não incluída neste Regras.txt; consulte o livro ou a lista de melhorias via "📖 Descrição").
O que cada material faz (Aço-Rubi, Adamante, Gelo Eterno, Madeira Tollon, Matéria Vermelha, Mitral e outros) já está disponível pela mesma busca "📖 Descrição".` },

    // ── ITENS MÁGICOS ──────────────────────────────────────────────────
    { grupo: '✨ Itens Mágicos', titulo: 'Itens de uso único (poções e pergaminhos)', texto:
`Para fabricar uma poção ou pergaminho, escolha uma magia ou fórmula que você conheça — será a magia que o item contém (poções só podem conter magias com alvo em criatura/objeto ou com efeito em área).
Preço = T$ 30 × (custo em PM da magia)², mínimo 1. CD para fabricar = 20 + custo em PM da magia.
• Magia de 1º círculo (1 PM): preço T$ 30; CD 21.
• Magia de 3º círculo (6 PM): preço T$ 1.080; CD 26.
Ao fabricar uma poção, você pode aplicar aprimoramentos nela (até seu limite de PM), como se estivesse lançando a magia — o custo e a CD se ajustam de acordo. Pergaminhos não podem receber aprimoramentos ao serem fabricados (mas podem recebê-los ao serem ativados).` },

    { grupo: '✨ Itens Mágicos', titulo: 'Itens permanentes — Encantados vs. Específicos', texto:
`Armas e armaduras mágicas podem ser encantadas ou específicas. Acessórios são sempre específicos.
Itens Encantados funcionam como itens superiores — mas em vez de melhorias, possuem encantos. Um item mágico menor possui 1 encanto, um médio possui 2 e um maior possui 3. O preço e a CD aumentam de acordo com o número de encantos (veja a calculadora e a tabela abaixo). Bônus por encantos não se acumulam.
Um mesmo item pode ser superior E encantado — some os modificadores de preço e CD, e os bônus de melhorias e encantos, normalmente.
Exemplo do livro: uma espada longa com um encanto tem preço T$ 18.015; fabricá-la exige T$ 6.005 e CD 30. Uma espada longa com quatro melhorias e três encantos (o máximo possível) tem preço T$ 90.015 (T$ 15 da espada + T$ 18.000 das quatro melhorias + T$ 72.000 dos três encantos); fabricá-la exige T$ 30.005 e CD 60.
Itens Específicos usam as regras normais de fabricação. O preço de cada um vem nas tabelas do livro. A CD é dada pela categoria: CD 30 para itens menores, 40 para médios, 50 para maiores. A perícia usada é Ofício (armeiro) para armas/armaduras e Ofício (artesão) para acessórios (o mestre pode liberar outros Ofícios, como joalheiro para um anel). Itens específicos NÃO podem receber encantos. Todas as armas e armaduras específicas do livro são itens maiores.`,
      tabela: { cab: ['Nº de encantos', 'Aumento no preço', 'Aumento na CD'], titulo: 'Preço de Encantos', destaque: 0,
        linhas: ENCANTOS_PADRAO.map(e => [String(e.n), '+ T$ ' + e.preco.toLocaleString('pt-BR') + (e.estimado ? ' ⚠' : ''), '+' + e.cd + (e.estimado ? ' ⚠' : '')]) } },

    { grupo: '✨ Itens Mágicos', titulo: 'Custo em Pontos de Mana', texto:
`Para fabricar um item mágico permanente, o personagem deve sacrificar uma quantidade de PM: 1 PM para itens menores, 2 PM para médios, 3 PM para maiores. São pontos de mana perdidos para sempre — mas, se o personagem destruir um item mágico permanente que criou, recupera os PM sacrificados nele.
A critério do mestre, outras coisas podem ser sacrificadas no lugar de PM, como ingredientes raros (encontrá-los pode ser o objetivo de uma aventura!).` },

    { grupo: '✨ Itens Mágicos', titulo: 'Destruindo itens mágicos', texto:
`Para as características de quebra de um item mágico, use as regras de "Quebrando Objetos" para um item normal do mesmo tipo, e aplique os bônus abaixo conforme a categoria:
Bônus em PV e RD: +10 (menor), +20 (médio), +40 (maior). Ex.: uma espada longa (normalmente PV 5, RD 10) de categoria maior tem PV 45 e RD 50.
Um item mágico que não esteja sendo usado faz seus próprios testes de resistência: +5 (menor), +10 (médio), +20 (maior). Se estiver sendo usado, escolha entre esse valor ou o do portador.` },

    // ── EMULSÕES ─────────────────────────────────────────────────────
    { grupo: '🧪 Emulsões & Bebidas', titulo: 'Emulsões', texto:
`Uma emulsão é um óleo que concede propriedades mágicas a um item. Usá-la é uma ação padrão e fornece um ou mais encantos a um item até o fim da cena. Conceder um encanto por emulsão não tem custo adicional (além do gasto do óleo) e conta no limite de encantos do item.
Existem emulsões com um, dois ou três encantos (determinado ao fabricar o óleo). Se um encanto da emulsão exigir outro encanto como pré-requisito, a emulsão deve incluir esse pré-requisito também. Fabricar uma emulsão segue as regras de itens alquímicos, exceto que o custo e a CD dependem da quantidade de encantos no óleo (tabela abaixo).
Por sua volatilidade — exige manutenção constante do criador e supervisão na aplicação —, emulsões não são comercializadas.`,
      tabela: { cab: ['Encantos', 'Custo de Fabricação', 'CD'], destaque: 0,
        linhas: EMULSOES_PADRAO.map(e => [String(e.n), 'T$ ' + e.preco.toLocaleString('pt-BR'), String(e.cd)]) } },

    { grupo: '🧪 Emulsões & Bebidas', titulo: 'Eu Bebo Sim (bebidas)', texto:
`Fabricar uma bebida exige um teste de Ofício (cozinheiro) contra CD 20 e segue as regras normais de fabricação de consumíveis (1 dia por bebida, ou duas se aceitar –5 no teste).
Consumir uma bebida leva alguns minutos — para receber os benefícios, é preciso ingeri-la com calma. Benefícios de bebida duram 1 dia e se acumulam com outros benefícios de alimentação (incluindo de bebidas diferentes).
Ao ingerir uma bebida alcoólica, faça um teste de Fortitude (CD indicada no item; cada dose adicional no mesmo dia aumenta a CD em +5). Se falhar, fica embriagado (–2 em testes baseados em Destreza e Carisma). Se já estava embriagado, fica bebum (desprevenido, –5 em Destreza e Carisma). Se já estava bebum, cai inconsciente. Todas as condições duram até o fim do dia.
Efeitos que evitam as penalidades de bebida também anulam os benefícios. Um personagem com imunidade a efeitos prejudiciais de itens ingeríveis pode abrir mão dela ao beber, para receber os benefícios — nesse caso, recebe +5 no teste de Fortitude.` },
  ];

  return {
    MELHORIAS_PADRAO: MELHORIAS_PADRAO,
    ENCANTOS_PADRAO:  ENCANTOS_PADRAO,
    EMULSOES_PADRAO:  EMULSOES_PADRAO,
    CATEGORIAS_CD:    CATEGORIAS_CD,
    REGRAS:           REGRAS,
  };
})();