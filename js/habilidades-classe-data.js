// ════════════════════════════════════════════════════════════════════
//  HABILIDADES-CLASSE-DATA.JS — as HABILIDADES DE CLASSE fixas (as que
//  todo mundo da classe ganha por NÍVEL, não as que se escolhe).
//  Localização: /grifos-alados/js/habilidades-classe-data.js
//
//  POR QUE ISTO EXISTE. js/poderes-classe-data.js só tem os poderes
//  SELECIONÁVEIS (os "• Poder de X" que você pega a cada nível). Faltavam
//  as habilidades FIXAS da tabela de cada classe — Devoto Fiel (clérigo),
//  Fúria (bárbaro), Inspiração (bardo), Mão da Divindade… Elas aparecem
//  SOZINHAS na ficha, conforme a classe e o nível do personagem (pedido
//  dele em 24/09/2026: "automáticas por classe+nível").
//
//  Fonte (páginas IMPRESSAS):
//    • Tormenta20 Jogo do Ano — as 14 básicas (Tabelas 1-5 a 1-18)
//    • Deuses de Arton — o Frade (Tabela 1-1, p. 39)
//    • Heróis de Arton — o Treinador (Tabela 1-1, p. 17)
//
//  Cada habilidade:
//    nome    como o livro imprime
//    nivel   o nível em que é GANHA (a ficha mostra se f.nivel >= nivel)
//    texto   o texto do livro num parágrafo só; quando a habilidade
//            ESCALA por nível (Fúria +2/+3…, Marca da Presa +1d4/+1d8…),
//            a própria descrição do livro diz a progressão — não há conta
//            à parte como nas distinções, porque o texto já basta
//    magica  o selo ✦ do livro (pode ser alvo de Dissipar Magia)
//
//  AS VARIANTES NÃO ESTÃO AQUI AINDA. Diferente dos poderes selecionáveis
//  (onde a variante aponta para a lista da básica), no Heróis de Arton
//  cada variante REIMPRIME a tabela com habilidades fixas PRÓPRIAS
//  (o alquimista tem Laboratório Pessoal no lugar do Protótipo etc.).
//  Elas entram numa leva à parte; até lá o motor não inventa fixas para
//  variante que não esteja neste mapa.
//
//  Consumido por js/ficha.js (topo do cartão ⚔ Habilidades de classe).
// ════════════════════════════════════════════════════════════════════
(function () {
  'use strict';

  window.GA_HABILIDADES_CLASSE = {

    // ── Arcanista (Tabela 1-5) ──────────────────────────────────────
    arcanista: [
      { nome: 'Caminho do Arcanista', nivel: 1, magica: false, texto:
        'A magia tem fontes distintas. Escolha uma opção (não pode ser mudada). Bruxo: você lança magias através de um foco (varinha, cajado, chapéu…); precisa empunhá-lo com uma mão ou fazer um teste de Misticismo (CD 20 + custo em PM; se falhar, gasta os PM à toa). O foco tem RD 10 e PV iguais à metade dos seus. Atributo-chave Inteligência. Feiticeiro: poder inato no sangue; escolha uma linhagem (recebe a herança básica) e aprende uma magia nova só a cada nível ímpar. Atributo-chave Carisma. Mago: estuda e memoriza um grimório; só lança magias memorizadas (metade das que conhece, escolhidas ao estudar por 1 hora); começa com uma magia adicional. Atributo-chave Inteligência.' },
      { nome: 'Magias', nivel: 1, magica: false, texto:
        'Você pode lançar magias arcanas de 1º círculo. A cada quatro níveis, pode lançar magias de um círculo maior (2º no 5º nível, 3º no 9º etc.). Começa com três magias de 1º círculo e aprende uma magia a cada nível. O atributo-chave é definido pelo seu Caminho, e você o soma no seu total de PM.' },
      { nome: 'Alta Arcana', nivel: 20, magica: false, texto:
        'Seu domínio das artes arcanas é total. O custo em PM de suas magias arcanas é reduzido à metade (após aplicar aprimoramentos e quaisquer outros efeitos que reduzam custo).' },
    ],

    // ── Bárbaro (Tabela 1-6) ────────────────────────────────────────
    barbaro: [
      { nome: 'Fúria', nivel: 1, magica: false, texto:
        'Você pode gastar 2 PM para invocar uma fúria selvagem: recebe +2 em testes de ataque e rolagens de dano corpo a corpo, mas não pode fazer ações que exijam calma e concentração (como Furtividade ou lançar magias). A cada cinco níveis, pode gastar +1 PM para aumentar os bônus em +1 (Fúria +3 no 6º, +4 no 11º, +5 no 16º). A fúria termina se, ao fim da rodada, você não tiver atacado nem sido alvo de um efeito hostil.' },
      { nome: 'Instinto Selvagem', nivel: 3, magica: false, texto:
        'Você recebe +1 em rolagens de dano, Percepção e Reflexos. A cada seis níveis, esse bônus aumenta em +1 (+2 no 9º nível, +3 no 15º).' },
      { nome: 'Redução de Dano', nivel: 5, magica: false, texto:
        'Graças a seu vigor e força de vontade, você ignora parte de seus ferimentos: recebe redução de dano 2 (todo dano que sofre é reduzido em 2). A cada três níveis, sua RD aumenta em 2, até um máximo de RD 10 no 17º nível.' },
      { nome: 'Fúria Titânica', nivel: 20, magica: false, texto:
        'O bônus que você recebe nos testes de ataque e rolagens de dano quando usa Fúria é dobrado. Por exemplo, se gastar 5 PM, em vez de +5, recebe +10.' },
    ],

    // ── Bardo (Tabela 1-7) ──────────────────────────────────────────
    bardo: [
      { nome: 'Inspiração', nivel: 1, magica: false, texto:
        'Você pode gastar uma ação padrão e 2 PM para inspirar as pessoas com sua arte. Você e todos os aliados em alcance curto ganham +1 em testes de perícia até o fim da cena. A cada quatro níveis, pode gastar +2 PM para aumentar o bônus em +1 (+2 no 5º, +3 no 9º, +4 no 13º, +5 no 17º).' },
      { nome: 'Magias', nivel: 1, magica: false, texto:
        'Escolha três escolas de magia (não pode ser mudada). Você pode lançar magias arcanas de 1º círculo dessas escolas; sobe de círculo no 6º nível (2º), 10º (3º) e 14º (4º). Começa com duas magias de 1º círculo e aprende uma a cada nível par. Pode lançar vestindo armaduras leves sem testes de Misticismo. Atributo-chave Carisma (somado ao total de PM).' },
      { nome: 'Eclético', nivel: 2, magica: false, texto:
        'A partir do 2º nível, você pode gastar 1 PM para receber todos os benefícios de ser treinado em uma perícia por um teste.' },
      { nome: 'Artista Completo', nivel: 20, magica: false, texto:
        'Você pode usar Inspiração como uma ação livre. Enquanto estiver sob efeito de sua Inspiração, suas habilidades de bardo (incluindo magias) têm o custo em PM reduzido pela metade.' },
    ],

    // ── Bucaneiro (Tabela 1-8) ──────────────────────────────────────
    bucaneiro: [
      { nome: 'Audácia', nivel: 1, magica: false, texto:
        'Quando faz um teste de perícia, você pode gastar 2 PM para somar seu Carisma no teste. Você não pode usar esta habilidade em testes de ataque.' },
      { nome: 'Insolência', nivel: 1, magica: false, texto:
        'Você soma seu Carisma na Defesa, limitado pelo seu nível. Esta habilidade exige liberdade de movimentos; você não pode usá-la se estiver de armadura pesada ou na condição imóvel.' },
      { nome: 'Evasão', nivel: 2, magica: false, texto:
        'A partir do 2º nível, quando sofre um efeito que permite um teste de Reflexos para reduzir o dano à metade, você não sofre dano algum se passar (e ainda sofre dano normal se falhar). Exige liberdade de movimentos; não funciona com armadura pesada ou na condição imóvel.' },
      { nome: 'Esquiva Sagaz', nivel: 3, magica: false, texto:
        'No 3º nível, você recebe +1 na Defesa e em Reflexos. Esse bônus aumenta em +1 a cada quatro níveis (+2 no 7º, +3 no 11º, +4 no 15º, +5 no 19º). Exige liberdade de movimentos; não funciona com armadura pesada ou na condição imóvel.' },
      { nome: 'Panache', nivel: 5, magica: false, texto:
        'A partir do 5º nível, sempre que faz um acerto crítico em combate ou reduz um inimigo a 0 PV, você recupera 1 PM.' },
      { nome: 'Evasão Aprimorada', nivel: 10, magica: false, texto:
        'A partir do 10º nível, quando sofre um efeito que permite um teste de Reflexos para reduzir o dano à metade, você não sofre dano algum se passar e sofre apenas metade do dano se falhar. Exige liberdade de movimentos; não funciona com armadura pesada ou na condição imóvel.' },
      { nome: 'Sorte de Nimb', nivel: 20, magica: false, texto:
        'No 20º nível, você pode gastar 5 PM para rolar novamente um teste recém realizado. Qualquer resultado 11 ou mais na segunda rolagem será considerado um 20 natural.' },
    ],

    // ── Caçador (Tabela 1-9) ────────────────────────────────────────
    cacador: [
      { nome: 'Marca da Presa', nivel: 1, magica: false, texto:
        'Você pode gastar uma ação de movimento e 1 PM para analisar uma criatura em alcance curto. Até o fim da cena, você recebe +1d4 nas rolagens de dano contra ela. A cada quatro níveis, pode gastar +1 PM para aumentar o bônus (+1d8 no 5º, +1d12 no 9º, +2d8 no 13º, +2d10 no 17º).' },
      { nome: 'Rastreador', nivel: 1, magica: false, texto:
        'Você recebe +2 em Sobrevivência. Além disso, pode se mover com seu deslocamento normal enquanto rastreia sem sofrer penalidades no teste de Sobrevivência.' },
      { nome: 'Explorador', nivel: 3, magica: false, texto:
        'No 3º nível, escolha um tipo de terreno (aquático, ártico, colina, deserto, floresta, montanha, pântano, planície, subterrâneo ou urbano; a partir do 11º, também área de Tormenta). No terreno escolhido, você soma sua Sabedoria (mínimo +1) na Defesa e nos testes de Acrobacia, Atletismo, Furtividade, Percepção e Sobrevivência. A cada quatro níveis, escolha outro terreno ou aumente o bônus de um já escolhido em +2.' },
      { nome: 'Caminho do Explorador', nivel: 5, magica: false, texto:
        'No 5º nível, você pode atravessar terrenos difíceis sem sofrer redução em seu deslocamento e a CD para rastreá-lo aumenta em +10. Só funciona em terrenos nos quais você tenha a habilidade Explorador.' },
      { nome: 'Mestre Caçador', nivel: 20, magica: false, texto:
        'No 20º nível, você pode usar Marca da Presa como ação livre. Além disso, ao usá-la, pode pagar 5 PM para aumentar sua margem de ameaça contra a criatura em +2. Se reduz uma criatura marcada a 0 PV, recupera 5 PM.' },
    ],

    // ── Cavaleiro (Tabela 1-10) ─────────────────────────────────────
    cavaleiro: [
      { nome: 'Código de Honra', nivel: 1, magica: false, texto:
        'Cavaleiros seguem um código de conduta. Você não pode atacar um oponente pelas costas (não pode se beneficiar do bônus de flanquear), caído, desprevenido ou incapaz de lutar. Se violar o código, você perde todos os seus PM e só pode recuperá-los a partir do próximo dia.' },
      { nome: 'Baluarte', nivel: 1, magica: false, texto:
        'Quando sofre um ataque ou faz um teste de resistência, você pode gastar 1 PM para receber +2 na Defesa e nos testes de resistência até o início do seu próximo turno. A cada quatro níveis, pode gastar +1 PM para aumentar o bônus em +2 (+4 no 5º, +6 no 9º, +8 no 13º, +10 no 17º). A partir do 7º nível, pode gastar 2 PM adicionais para dar o mesmo bônus a todos os aliados adjacentes; a partir do 15º, 5 PM adicionais para os aliados em alcance curto.' },
      { nome: 'Duelo', nivel: 2, magica: false, texto:
        'A partir do 2º nível, você pode gastar 2 PM para escolher um oponente em alcance curto e receber +2 em testes de ataque e rolagens de dano contra ele até o fim da cena. Se atacar outro oponente, o bônus termina. A cada cinco níveis, pode gastar +1 PM para aumentar o bônus em +1 (+3 no 7º, +4 no 12º, +5 no 17º).' },
      { nome: 'Caminho do Cavaleiro', nivel: 5, magica: false, texto:
        'No 5º nível, escolha (não pode ser mudada). Bastião: se estiver usando armadura pesada, você recebe redução de dano 5. Montaria: você recebe um cavalo de guerra com o qual tem +5 em Adestramento e Cavalgar; ele fornece os benefícios de um parceiro veterano (mestre no 11º nível).' },
      { nome: 'Resoluto', nivel: 11, magica: false, texto:
        'A partir do 11º nível, você pode gastar 1 PM para refazer um teste de resistência contra uma condição que esteja o afetando. O segundo teste recebe +5 e, se passar, cancela o efeito. Só pode usar uma vez por efeito.' },
      { nome: 'Bravura Final', nivel: 20, magica: false, texto:
        'No 20º nível, sua virtude vence a morte. Se for reduzido a 0 ou menos PV, pode gastar 3 PM para continuar consciente e de pé. Tem duração sustentada; quando se encerra, você sofre os efeitos de seus PV atuais, podendo cair inconsciente ou morrer.' },
    ],

    // ── Clérigo (Tabela 1-11) ───────────────────────────────────────
    clerigo: [
      { nome: 'Devoto Fiel', nivel: 1, magica: false, texto:
        'Você se torna devoto de um deus maior. Ao contrário de devotos normais, você recebe dois poderes concedidos por se tornar devoto, em vez de apenas um. Como alternativa, pode cultuar o Panteão como um todo: não recebe nenhum Poder Concedido, mas sua única obrigação é não usar armas cortantes ou perfurantes; sua arma preferida é a maça e você pode canalizar energia positiva ou negativa a sua escolha (uma vez feita, não muda).' },
      { nome: 'Magias', nivel: 1, magica: false, texto:
        'Você pode lançar magias divinas de 1º círculo. A cada quatro níveis, pode lançar magias de um círculo maior (2º no 5º nível, 3º no 9º etc.). Começa com três magias de 1º círculo e aprende uma a cada nível. Atributo-chave Sabedoria (somada ao total de PM).' },
      { nome: 'Mão da Divindade', nivel: 20, magica: true, texto:
        'No 20º nível, você pode gastar uma ação completa e 15 PM para canalizar energia divina: lança três magias divinas quaisquer (de qualquer círculo, mesmo que não conheça) como ação livre e sem gastar PM (mas paga outros custos; pode aplicar aprimoramentos pagando por eles). Depois, fica atordoado por 1d4 rodadas, mesmo sendo imune a essa condição.' },
    ],

    // ── Druida (Tabela 1-12) ────────────────────────────────────────
    druida: [
      { nome: 'Devoto Fiel', nivel: 1, magica: false, texto:
        'Você se torna devoto de um deus disponível para druidas (Allihanna, Megalokk ou Oceano). Ao contrário de devotos normais, você recebe dois poderes concedidos por se tornar devoto, em vez de apenas um.' },
      { nome: 'Empatia Selvagem', nivel: 1, magica: false, texto:
        'Você pode se comunicar com animais por meio de linguagem corporal e vocalizações. Pode usar Adestramento com animais para mudar atitude e persuasão (veja Diplomacia).' },
      { nome: 'Magias', nivel: 1, magica: false, texto:
        'Você pode lançar magias divinas de 1º círculo. A cada quatro níveis, pode lançar magias de um círculo maior (2º no 6º nível, 3º no 10º, 4º no 14º). Começa com magias de 1º círculo e aprende mais conforme sobe de nível. Atributo-chave Sabedoria (somada ao total de PM).' },
      { nome: 'Caminho dos Ermos', nivel: 2, magica: false, texto:
        'No 2º nível, você pode atravessar terrenos difíceis sem sofrer redução em seu deslocamento e a CD para rastreá-lo aumenta em +10. Só funciona em terrenos naturais.' },
      { nome: 'Força da Natureza', nivel: 20, magica: false, texto:
        'No 20º nível, você diminui o custo de todas as suas magias em –2 PM e aumenta a CD delas em +2. Os bônus dobram (–4 PM e +4 na CD) se você estiver em terrenos naturais.' },
    ],

    // ── Guerreiro (Tabela 1-13) ─────────────────────────────────────
    guerreiro: [
      { nome: 'Ataque Especial', nivel: 1, magica: false, texto:
        'Quando faz um ataque, você pode gastar 1 PM para receber +4 no teste de ataque ou na rolagem de dano. A cada quatro níveis, pode gastar +1 PM para aumentar o bônus em +4 (+8 no 5º, +12 no 9º, +16 no 13º, +20 no 17º). Você pode dividir os bônus igualmente entre ataque e dano.' },
      { nome: 'Durão', nivel: 3, magica: false, texto:
        'A partir do 3º nível, sua rijeza muscular permite absorver ferimentos. Sempre que sofre dano, você pode gastar 3 PM para reduzir esse dano à metade.' },
      { nome: 'Ataque Extra', nivel: 6, magica: false, texto:
        'A partir do 6º nível, quando usa a ação agredir, você pode gastar 2 PM para realizar um ataque adicional uma vez por rodada.' },
      { nome: 'Campeão', nivel: 20, magica: false, texto:
        'No 20º nível, o dano de todos os seus ataques aumenta em um passo. Além disso, sempre que faz um Ataque Especial ou um Golpe Pessoal e acerta o ataque, recupera metade dos PM gastos nele.' },
    ],

    // ── Inventor (Tabela 1-14) ──────────────────────────────────────
    inventor: [
      { nome: 'Engenhosidade', nivel: 1, magica: false, texto:
        'Quando faz um teste de perícia, você pode gastar 2 PM para somar sua Inteligência no teste. Você não pode usar esta habilidade em testes de ataque.' },
      { nome: 'Protótipo', nivel: 1, magica: false, texto:
        'Você começa o jogo com um item superior, ou com 10 itens alquímicos, com preço total de até T$ 500.' },
      { nome: 'Fabricar Item Superior', nivel: 2, magica: false, texto:
        'No 2º nível, você recebe um item superior de até T$ 2.000 e passa a fabricar itens superiores com uma melhoria. Nos níveis 5, 8 e 11, pode trocar esse item por um com duas, três e quatro melhorias (respectivamente) e passa a fabricar itens superiores com essa quantidade de melhorias.' },
      { nome: 'Comerciante', nivel: 3, magica: false, texto:
        'No 3º nível, você pode vender itens 10% mais caro (não cumulativo com barganha).' },
      { nome: 'Encontrar Fraqueza', nivel: 7, magica: false, texto:
        'A partir do 7º nível, você pode gastar uma ação de movimento e 2 PM para analisar um objeto em alcance curto e ignorar a redução de dano dele. Também pode analisar um inimigo: se ele estiver de armadura ou for um construto, você recebe +2 em ataques contra ele. Os benefícios duram até o fim da cena.' },
      { nome: 'Fabricar Item Mágico', nivel: 9, magica: false, texto:
        'No 9º nível, você recebe um item mágico menor e passa a fabricar itens mágicos menores. No 13º nível, itens mágicos médios; no 17º, itens mágicos maiores.' },
      { nome: 'Olho do Dragão', nivel: 10, magica: false, texto:
        'A partir do 10º nível, você pode gastar uma ação completa para analisar um item e automaticamente descobrir se ele é mágico, suas propriedades e como utilizá-las.' },
      { nome: 'Obra-Prima', nivel: 20, magica: false, texto:
        'No 20º nível, você fabrica sua obra-prima (aprovada pelo mestre): em geral com benefícios equivalentes a um item com cinco melhorias e quatro encantos. Você não gasta dinheiro, tempo ou PM nela.' },
    ],

    // ── Ladino (Tabela 1-15) ────────────────────────────────────────
    ladino: [
      { nome: 'Ataque Furtivo', nivel: 1, magica: false, texto:
        'Uma vez por rodada, quando atinge uma criatura desprevenida com um ataque corpo a corpo ou em alcance curto, ou uma criatura que esteja flanqueando, você causa 1d6 pontos de dano extra. A cada dois níveis, esse dano extra aumenta em +1d6 (até +10d6 no 19º nível). Uma criatura imune a acertos críticos também é imune a ataques furtivos.' },
      { nome: 'Especialista', nivel: 1, magica: false, texto:
        'Escolha um número de perícias treinadas igual a sua Inteligência (mínimo 1). Ao fazer um teste de uma dessas perícias, você pode gastar 1 PM para dobrar seu bônus de treinamento. Não pode usar em testes de ataque.' },
      { nome: 'Evasão', nivel: 2, magica: false, texto:
        'A partir do 2º nível, quando sofre um efeito que permite um teste de Reflexos para reduzir o dano à metade, você não sofre dano algum se passar (e ainda sofre dano normal se falhar). Exige liberdade de movimentos; não funciona com armadura pesada ou na condição imóvel.' },
      { nome: 'Esquiva Sobrenatural', nivel: 4, magica: false, texto:
        'Seus instintos são tão apurados que você reage ao perigo antes de percebê-lo. Você nunca fica surpreendido.' },
      { nome: 'Olhos nas Costas', nivel: 8, magica: false, texto:
        'A partir do 8º nível, você luta contra diversos inimigos como se fossem apenas um: você não pode ser flanqueado.' },
      { nome: 'Evasão Aprimorada', nivel: 10, magica: false, texto:
        'No 10º nível, quando sofre um efeito que permite um teste de Reflexos para reduzir o dano à metade, você não sofre dano algum se passar e sofre apenas metade do dano se falhar. Exige liberdade de movimentos; não funciona com armadura pesada ou na condição imóvel.' },
      { nome: 'A Pessoa Certa para o Trabalho', nivel: 20, magica: false, texto:
        'No 20º nível, ao fazer um ataque furtivo ou usar uma perícia da lista de ladino, você pode gastar 5 PM para receber +10 no teste.' },
    ],

    // ── Lutador (Tabela 1-16) ───────────────────────────────────────
    lutador: [
      { nome: 'Briga', nivel: 1, magica: false, texto:
        'Seus ataques desarmados causam 1d6 pontos de dano e podem causar dano letal ou não letal (sem penalidades). A cada quatro níveis, seu dano desarmado aumenta um passo (1d8 no 5º, 1d10 no 9º, 2d6 no 13º, 2d8 no 17º). O dano é para criaturas Pequenas/Médias; ajuste por tamanho.' },
      { nome: 'Golpe Relâmpago', nivel: 1, magica: false, texto:
        'Quando usa a ação agredir para fazer um ataque desarmado, você pode gastar 1 PM para realizar um ataque desarmado adicional.' },
      { nome: 'Casca Grossa', nivel: 3, magica: false, texto:
        'No 3º nível, você soma sua Constituição na Defesa, limitado pelo seu nível e apenas se não estiver usando armadura pesada. Além disso, no 7º nível, e a cada quatro níveis, você recebe +1 na Defesa (Con+1 no 7º, +2 no 11º, +3 no 15º, +4 no 19º).' },
      { nome: 'Golpe Cruel', nivel: 5, magica: false, texto:
        'No 5º nível, sua margem de ameaça com ataques desarmados aumenta em +1.' },
      { nome: 'Golpe Violento', nivel: 9, magica: false, texto:
        'No 9º nível, seu multiplicador de crítico com ataques desarmados aumenta em +1.' },
      { nome: 'Dono da Rua', nivel: 20, magica: false, texto:
        'No 20º nível, seu dano desarmado aumenta para 2d10 (criaturas Médias). Além disso, quando usa a ação agredir para atacar desarmado, você pode fazer dois ataques em vez de um (podendo usar Golpe Relâmpago para um terceiro).' },
    ],

    // ── Nobre (Tabela 1-17) ─────────────────────────────────────────
    nobre: [
      { nome: 'Autoconfiança', nivel: 1, magica: false, texto:
        'Você pode usar seu Carisma em vez de Destreza na Defesa (mas continua não podendo somar um atributo na Defesa quando usa armadura pesada).' },
      { nome: 'Espólio', nivel: 1, magica: false, texto:
        'Você recebe um item a sua escolha com preço de até T$ 2.000.' },
      { nome: 'Orgulho', nivel: 1, magica: false, texto:
        'Quando faz um teste de perícia, você pode gastar uma quantidade de PM a sua escolha (limitada pelo seu Carisma). Para cada PM que gastar, recebe +2 no teste.' },
      { nome: 'Palavras Afiadas', nivel: 2, magica: false, texto:
        'No 2º nível, você pode gastar uma ação padrão e 1 PM para fazer um teste de Diplomacia ou Intimidação oposto à Vontade de uma criatura inteligente (Int –3 ou maior) em alcance curto. Se vencer, causa 2d6 de dano psíquico não letal (metade se perder). Reduzida a 0 PV, ela se rende (Diplomacia) ou foge apavorada (Intimidação). A cada quatro níveis, pode gastar +1 PM para aumentar o dano (4d6 no 6º, 6d6 no 10º, 8d6 no 14º, 10d6 no 18º).' },
      { nome: 'Riqueza', nivel: 3, magica: false, texto:
        'No 3º nível, uma vez por aventura você pode fazer um teste de Carisma com bônus igual ao seu nível de nobre e recebe um número de Tibares de ouro igual ao resultado. Condicionado a sua relação com família/patrono/negócios e a onde você está.' },
      { nome: 'Gritar Ordens', nivel: 4, magica: false, texto:
        'A partir do 4º nível, você pode gastar uma quantidade de PM a sua escolha (limitada pelo seu Carisma). Até o início do seu próximo turno, todos os aliados em alcance curto recebem um bônus nos testes de perícia igual à quantidade de PM gastos.' },
      { nome: 'Presença Aristocrática', nivel: 5, magica: false, texto:
        'A partir do 5º nível, sempre que uma criatura inteligente tentar machucá-lo, você pode gastar 2 PM. Ela deve fazer um teste de Vontade (CD Car); se falhar, não consegue machucá-lo e perde a ação. Só uma vez por cena contra cada criatura.' },
      { nome: 'Realeza', nivel: 20, magica: false, texto:
        'No 20º nível, a CD para resistir a sua Presença Aristocrática aumenta em +5, e uma criatura que falhe por 10 ou mais passa a lutar ao seu lado pelo resto da cena. Além disso, uma criatura reduzida a 0 PV por Palavras Afiadas não sofre esse dano; em vez disso, passa a lutar ao seu lado pelo resto da cena.' },
    ],

    // ── Paladino (Tabela 1-18) ──────────────────────────────────────
    paladino: [
      { nome: 'Abençoado', nivel: 1, magica: false, texto:
        'Você soma seu Carisma no seu total de pontos de mana no 1º nível e torna-se devoto de um deus disponível para paladinos (Azgher, Khalmyr, Lena, Lin-Wu, Marah, Tanna-Toh, Thyatis, Valkaria), recebendo dois poderes concedidos em vez de um. Como alternativa, pode ser um paladino do bem, sem Poder Concedido e sem Obrigação & Restrição além do Código do Herói.' },
      { nome: 'Código do Herói', nivel: 1, magica: false, texto:
        'Você deve sempre manter sua palavra e nunca pode recusar um pedido de ajuda de alguém inocente. Nunca pode mentir, trapacear ou roubar. Se violar o código, perde todos os seus PM e só pode recuperá-los a partir do próximo dia.' },
      { nome: 'Golpe Divino', nivel: 1, magica: true, texto:
        'Quando faz um ataque corpo a corpo, você pode gastar 2 PM para desferir um golpe destruidor: soma seu Carisma no teste de ataque e +1d8 na rolagem de dano. A cada quatro níveis, pode gastar +1 PM para aumentar o dano em +1d8 (+2d8 no 5º, +3d8 no 9º, +4d8 no 13º, +5d8 no 17º).' },
      { nome: 'Cura pelas Mãos', nivel: 2, magica: true, texto:
        'A partir do 2º nível, você pode gastar uma ação de movimento e 1 PM para curar 1d8+1 PV de um alvo em alcance corpo a corpo (incluindo você). A cada quatro níveis, pode gastar +1 PM para curar +1d8+1 (2d8+2 no 6º, 3d8+3 no 10º etc.). Pode causar dano de luz a mortos-vivos (exige ataque desarmado). A partir do 6º, pode gastar +1 PM para anular uma condição (abalado, apavorado, atordoado, cego, doente, exausto, fatigado ou surdo).' },
      { nome: 'Aura Sagrada', nivel: 3, magica: true, texto:
        'No 3º nível, você pode gastar 1 PM para gerar uma aura de 9m de raio com duração sustentada. A aura emite luz dourada; você e os aliados dentro dela somam seu Carisma nos testes de resistência.' },
      { nome: 'Bênção da Justiça', nivel: 5, magica: true, texto:
        'No 5º nível, escolha (não pode ser mudada). Égide Sagrada: gaste uma ação de movimento e 2 PM para recobrir de energia seu escudo ou símbolo sagrado; até o fim da cena, você e aliados adjacentes recebem bônus na Defesa igual ao seu Carisma (a partir do 11º, pode gastar 5 PM para refazer um teste de resistência e reverter a magia ao conjurador). Montaria Sagrada: gaste uma ação de movimento e 2 PM para invocar uma montaria sagrada (parceiro veterano; mestre no 11º).' },
      { nome: 'Vingador Sagrado', nivel: 20, magica: true, texto:
        'No 20º nível, você pode gastar uma ação completa e 10 PM para assumir a forma de um vingador sagrado até o fim da cena: recebe deslocamento de voo 18m e redução de dano 20, e seu Golpe Divino custa metade e causa mais dois dados de dano.' },
    ],

    // ── Frade (Deuses de Arton, Tabela 1-1) ─────────────────────────
    frade: [
      { nome: 'Devoto Fiel', nivel: 1, magica: false, texto:
        'Você se torna devoto de um deus maior, recebendo dois poderes concedidos em vez de um. Como alternativa, pode cultuar o Panteão como um todo: sem Poder Concedido, com a única restrição de não usar armas cortantes ou perfurantes; arma preferida a maça e canaliza energia positiva ou negativa a sua escolha (não muda).' },
      { nome: 'Erudição', nivel: 1, magica: false, texto:
        'Quando faz um teste de perícia (exceto de ataque), você pode gastar uma quantidade de PM a sua escolha (limitada pela sua Inteligência). Para cada PM que gastar, recebe +2 no teste.' },
      { nome: 'Magias', nivel: 1, magica: false, texto:
        'Você pode lançar magias divinas de 1º círculo. A cada quatro níveis, sobe um círculo (2º no 5º nível, 3º no 9º etc.). Começa com três magias de 1º círculo e aprende uma a cada nível. Pode lançar com armaduras leves; com armadura pesada, faz teste de Misticismo como conjurador arcano. Atributo-chave Sabedoria (somada ao total de PM).' },
      { nome: 'Versiculário', nivel: 2, magica: false, texto:
        'No 2º nível, você recebe um versiculário (livro de anotações religiosas). Uma vez por dia, gaste 1 hora estudando e escolha uma quantidade de magias igual à sua Inteligência (limitada pelo nível); até o próximo dia, ao lançar uma delas você recebe +1 PM para gastar em aprimoramentos.' },
      { nome: 'Dádiva da Fé', nivel: 5, magica: false, texto:
        'No 5º nível, você recebe Proteção Sagrada (se sua divindade canaliza energia positiva) ou Cólera Divina (se negativa). Ambas: gaste uma ação de movimento e até 2 PM por círculo de magia a que tem acesso para energizar seu símbolo sagrado até o fim da cena; ele projeta uma aura de 9m de raio. Criaturas a sua escolha na aura recebem redução de dano (Proteção) ou bônus nas rolagens de dano (Cólera) igual à metade do total de PM gastos.' },
      { nome: 'Solo Santificado', nivel: 20, magica: false, texto:
        'No 20º nível, o raio de sua Dádiva da Fé muda para 30m e as criaturas afetadas também somam o bônus concedido pela habilidade na CD de suas próprias habilidades.' },
    ],

    // ── Treinador (Heróis de Arton, Tabela 1-1) ─────────────────────
    treinador: [
      { nome: 'Direcionar', nivel: 1, magica: false, texto:
        'Se o seu melhor amigo estiver em alcance curto e fizer um teste de perícia, você pode gastar 2 PM para somar seu Carisma no teste dele.' },
      { nome: 'Melhor Amigo', nivel: 1, magica: false, texto:
        'Você recebe um melhor amigo, um parceiro especial que o acompanha. Ele começa com dois truques a sua escolha e recebe um novo truque a cada três níveis (3 no 4º, 4 no 7º, 5 no 10º, 6 no 13º, 7 no 16º, 8 no 19º). Se ele morrer, você fica atordoado por 1d4 rodadas; pode treinar um novo com um mês de trabalho.' },
      { nome: 'Domar Criatura', nivel: 2, magica: false, texto:
        'A partir do 2º nível, gaste uma ação de movimento e 1 PM para fazer um teste de Adestramento oposto à Vontade de uma criatura não inteligente em alcance curto. Se vencer, causa 2d8 de dano psíquico não letal (metade se perder); reduzida a 0 PV, ela se rende. A cada quatro níveis, +1 PM para +2d8 de dano. A partir do 5º nível, ao render uma criatura de ND ≤ seu nível, pode gastar PM igual ao ND dela para controlá-la até o fim da cena (até o fim do dia se ND ≤ nível –3, a partir do 8º).' },
      { nome: 'Treino Especializado', nivel: 5, magica: false, texto:
        'No 5º nível, escolha. Conquistar pelos Números: você recebe um segundo melhor amigo, e uma vez por rodada, ao fazer uma ação padrão com um deles, pode gastar 3 PM para fazer uma ação padrão com o outro. Treino Intensivo: seu melhor amigo recebe +4 PV por nível, redução de dano 5 e um truque (RD 10 e outro truque no 11º; RD 15 no 17º).' },
      { nome: 'Sincronia de Combate', nivel: 6, magica: false, texto:
        'A partir do 6º nível, uma vez por rodada, quando seu melhor amigo acerta um ataque usando a ação agredir, você pode gastar 2 PM para fazer um ataque contra o mesmo alvo.' },
      { nome: 'Sincronia Perfeita', nivel: 20, magica: false, texto:
        'No 20º nível, você pode gastar uma ação de movimento e 6 PM para entrar em sincronia perfeita com um dos seus melhores amigos até o fim da cena: o tamanho dele aumenta uma categoria e, uma vez por rodada, quando você usa uma ação padrão consigo mesmo, recebe uma ação padrão extra para usar com ele.' },
    ],

    // ════════════════════════════════════════════════════════════════
    //  AS 14 VARIANTES (Heróis de Arton, Tabelas 1-3 a 1-16). Cada uma
    //  reimprime a tabela com habilidades fixas PRÓPRIAS. As que o livro
    //  diz "como o <básica> básico" trazem aqui o texto da básica (mais
    //  útil na ficha do que só a remissão); as próprias vêm do livro.
    // ════════════════════════════════════════════════════════════════

    // ── Alquimista (de inventor, Tabela 1-3) ────────────────────────
    alquimista: [
      { nome: 'Engenhosidade', nivel: 1, magica: false, texto:
        'Quando faz um teste de perícia, você pode gastar 2 PM para somar sua Inteligência no teste. Você não pode usar esta habilidade em testes de ataque. (Como o inventor básico.)' },
      { nome: 'Laboratório Pessoal', nivel: 1, magica: false, texto:
        'Você começa o jogo com instrumentos de alquimista aprimorados e 10 itens alquímicos com preço total de até T$ 300.' },
      { nome: 'Alquimista Iniciado', nivel: 2, magica: false, texto:
        'No 2º nível, você recebe o poder Alquimista Iniciado (Tormenta20, p. 68): um livro de fórmulas e a capacidade de fabricar poções de 1º e 2º círculos.' },
      { nome: 'Mistura Básica', nivel: 3, magica: false, texto:
        'A partir do 3º nível, você pode usar catalisadores em itens alquímicos como se fossem magias.' },
      { nome: 'Aplicação Rápida', nivel: 5, magica: false, texto:
        'No 5º nível, você pode gastar uma ação completa e 2 PM para usar dois preparados alquímicos ao mesmo tempo (precisa tê-los em mãos ou sacá-los como ação livre).' },
      { nome: 'Magia Engarrafada', nivel: 7, magica: false, texto:
        'No 7º nível, você pode usar Mistura Básica e Aplicação Rápida em poções.' },
      { nome: 'Odores Alquímicos', nivel: 8, magica: false, texto:
        'A partir do 8º nível, você pode gastar uma ação completa para detectar itens alquímicos e poções em alcance médio: descobre o tipo e o uso geral dos itens alquímicos e, das poções, a magia emulada e com quantos PM foi fabricada.' },
      { nome: 'Fabricar Emulsão', nivel: 9, magica: false, texto:
        'No 9º nível, você aprende a fabricar emulsões (óleos que concedem encantos a um item até o fim da cena) com um encanto. Nos níveis 13 e 17, com dois e três encantos.' },
      { nome: 'Mestre Alquimista', nivel: 10, magica: false, texto:
        'No 10º nível, você recebe o poder Mestre Alquimista (Tormenta20, p. 69).' },
      { nome: 'Bombardeio Eficiente', nivel: 11, magica: false, texto:
        'A partir do 11º nível, quando usa um preparado alquímico ou poção que causa dano, você pode gastar 1 PM para que o item ignore 10 pontos da RD das criaturas atingidas.' },
      { nome: 'Pedra Filosofal', nivel: 20, magica: false, texto:
        'No 20º nível, você recebe uma pedra filosofal: enquanto de posse dela, tem Cura Acelerada 10 e rola dois dados em Fortitude usando o melhor. Além disso, se você ou um aliado em alcance curto for reduzido a 0 PV ou morrer, pode sacrificá-la para dar ao alvo o efeito básico de Segunda Chance (reconstruindo o corpo). Refazê-la custa uma semana e T$ 18.000.' },
    ],

    // ── Atleta (de lutador, Tabela 1-4) ─────────────────────────────
    atleta: [
      { nome: 'Briga', nivel: 1, magica: false, texto:
        'Seus ataques desarmados causam 1d6 pontos de dano (letal ou não letal, sem penalidades). A cada quatro níveis, o dano aumenta um passo (1d8 no 5º, 1d10 no 9º, 2d6 no 13º, 2d8 no 17º). (Como o lutador básico.)' },
      { nome: 'Façanha Atlética', nivel: 1, magica: false, texto:
        'Quando faz um teste de perícia, você pode gastar uma quantidade de PM a sua escolha (limitada pela sua Força). Para cada PM que gastar, recebe +2 no teste.' },
      { nome: 'Arremesso Atlético', nivel: 2, magica: false, texto:
        'No 2º nível, o alcance de seus ataques com armas de arremesso aumenta um passo (curto→médio→longo) e você pode usar o dano de Briga no lugar do dano básico dessas armas. A partir do 10º nível, seus ataques com armas de arremesso contam como desarmados para suas habilidades de lutador.' },
      { nome: 'Poderio Muscular', nivel: 2, magica: false, texto:
        'No 2º nível, você aprende e pode lançar Primor Atlético, mas apenas em si mesmo. Não é uma habilidade mágica — provém de seu treinamento físico (magia simulada).' },
      { nome: 'Casca Grossa', nivel: 3, magica: false, texto:
        'No 3º nível, você soma sua Constituição na Defesa (limitado pelo nível, sem armadura pesada). No 7º nível, e a cada quatro níveis, +1 na Defesa. (Como o lutador básico.)' },
      { nome: 'Mais Alto e Mais Rápido', nivel: 5, magica: false, texto:
        'No 5º nível, seu deslocamento aumenta +3m e você recebe deslocamento de escalada e natação igual à metade do normal (ou +3m se já os tem). Esse deslocamento de natação não deixa respirar embaixo d’água, mas você soma seu nível de atleta ao total de rodadas para prender a respiração.' },
      { nome: 'Disciplina Atlética', nivel: 9, magica: false, texto:
        'A partir do 9º nível, quando falha em um teste de resistência, você pode gastar 2 PM para rolá-lo novamente usando Atletismo no lugar da perícia original.' },
      { nome: 'Corpo Ideal', nivel: 20, magica: false, texto:
        'No 20º nível, você recebe imunidade a cansaço, condições de metabolismo e veneno, redução de dano 10, e seu dano desarmado e com armas de arremesso aumenta para 2d10 (criaturas Médias).' },
    ],

    // ── Burguês (de nobre, Tabela 1-5) ──────────────────────────────
    burgues: [
      { nome: 'Meios de Produção', nivel: 1, magica: false, texto:
        'No início de cada aventura, você recebe T$ 100 em dinheiro, itens mundanos ou poções a sua escolha. Aumenta para T$ 300 no veterano, T$ 600 no campeão e T$ 1.000 no lenda.' },
      { nome: 'Orgulho', nivel: 1, magica: false, texto:
        'Quando faz um teste de perícia, você pode gastar uma quantidade de PM a sua escolha (limitada pelo seu Carisma). Para cada PM que gastar, recebe +2 no teste. (Como o nobre básico.)' },
      { nome: 'Poder Monetário', nivel: 1, magica: false, texto:
        'Quando usa uma habilidade com custo em PM, você pode consumir tibares de ouro (limitado pelo seu Carisma); cada TO paga 1 PM. Pode consumir por dia um número de TO igual ao seu nível (o dobro do nível a partir do 5º).' },
      { nome: 'Desmoralizar', nivel: 2, magica: false, texto:
        'No 2º nível, você aprende e pode lançar Perdição (aprimoramentos como um clérigo de seu nível), mas apenas em criaturas inteligentes (Int –3 ou maior). Não é habilidade mágica (magia simulada). A penalidade cresce: –1 no 2º, –2 no 6º, –3 no 10º, –4 no 14º, –5 no 18º.' },
      { nome: 'Negociante Nato', nivel: 3, magica: false, texto:
        'No 3º nível, ao chegar numa comunidade, gaste 1 dia e faça Diplomacia (CD 20): se passar, vende itens por 60% do preço (+10% a cada 10 pontos acima da CD, até 100%). Não acumula com barganha.' },
      { nome: 'Suborno', nivel: 4, magica: false, texto:
        'No 4º nível, você aprende e pode lançar Enfeitiçar (atributo-chave Carisma). Não é habilidade mágica (magia simulada). A CD aumenta em +2 se você consumiu ao menos 1 TO para pagar seu custo.' },
      { nome: 'Ostentação', nivel: 5, magica: false, texto:
        'A partir do 5º nível, você pode usar um item vestido adicional. Além disso, a CD para resistir às suas habilidades de burguês aumenta +1 por item banhado a ouro, cravejado de gemas ou de mitral que possua (cumulativo até +3).' },
      { nome: 'Novo Rico', nivel: 9, magica: false, texto:
        'No 9º nível, para cada item mágico que estiver vestindo, você recebe +1 PM por nível de poder do item (após 1 dia de uso).' },
      { nome: 'Magnata', nivel: 20, magica: false, texto:
        'No 20º nível, sua Desmoralizar também aplica a penalidade à CD das habilidades das criaturas afetadas. Além disso, cada TO consumido para pagar PM lhe dá 10 PV temporários cumulativos até o fim da cena.' },
    ],

    // ── Duelista (de bucaneiro, Tabela 1-6) ─────────────────────────
    duelista: [
      { nome: 'Duelo', nivel: 1, magica: false, texto:
        'Você pode gastar 2 PM para escolher um oponente em alcance curto e receber +2 em testes de ataque e rolagens de dano contra ele até o fim da cena (o bônus termina se atacar outro). A cada cinco níveis, +1 PM para +1 no bônus (+3 no 6º, +4 no 11º, +5 no 16º).' },
      { nome: 'Insolência', nivel: 1, magica: false, texto:
        'Você soma seu Carisma na Defesa, limitado pelo seu nível. Exige liberdade de movimentos (não funciona com armadura pesada ou imóvel). (Como o bucaneiro básico.)' },
      { nome: 'Escola de Duelo', nivel: 2, magica: false, texto:
        'No 2º nível, escolha (não muda). Escola Ambidestra: com duas armas (uma leve), +2 na Defesa e Reflexos. Escola Clássica: com uma arma corpo a corpo numa mão e a outra livre, +2 em dano com ela. Escola de Tiro: proficiência com armas de fogo leves e de uma mão (e, repetida, usa habilidades de bucaneiro com elas).' },
      { nome: 'Esquiva Sagaz', nivel: 3, magica: false, texto:
        'No 3º nível, você recebe +1 na Defesa e em Reflexos, aumentando +1 a cada quatro níveis (+2 no 7º, +3 no 11º, +4 no 15º, +5 no 19º). Exige liberdade de movimentos. (Como o bucaneiro básico.)' },
      { nome: 'Truques de Capa', nivel: 4, magica: false, texto:
        'A partir do 4º nível, com uma capa esvoaçante, gaste 2 PM e a ação indicada para: Capa Inoportuna (livre, reduz um passo a ação de fintar); Distração Oportuna (reação, +5 num teste de Reflexos ou Vontade); Efeito Dramático (livre, +5 num teste de perícia de Carisma); Impulso (livre, +9m de deslocamento e +5 em Acrobacia/Atletismo por 1 rodada); Paraquedas (reação, –6d6 de dano de queda); Rasgar a Capa (reação, metade do dano — destrói a capa).' },
      { nome: 'Técnica Avançada', nivel: 10, magica: false, texto:
        'No 10º nível, você ganha uma técnica conforme sua escola (só sob ela). Ambidestra: quando um inimigo o ataca e erra, 1 PM para um ataque corpo a corpo. Clássica: dano da escola sobe para +5 e, gastando 1 PM na ação agredir, se houver crítico, um ataque adicional. Tiro: dano com armas de fogo sobe um passo e o alcance aumenta uma categoria.' },
      { nome: 'Duelista Lendário', nivel: 20, magica: false, texto:
        'No 20º nível, sob sua escola de duelo: gaste 1 PM para rolar novamente um ataque seu, ou 1 PM para forçar um oponente que o ataca a rolar novamente (uma vez por ataque).' },
    ],

    // ── Ermitão (de druida, Tabela 1-7) ─────────────────────────────
    ermitao: [
      { nome: 'Devoto Fiel', nivel: 1, magica: false, texto:
        'Você se torna devoto de um deus disponível para druidas (Allihanna, Megalokk ou Oceano), recebendo dois poderes concedidos em vez de um. (Como o druida básico.)' },
      { nome: 'Empatia Selvagem', nivel: 1, magica: false, texto:
        'Você pode se comunicar com animais por linguagem corporal e usar Adestramento para mudar atitude e persuasão. Como ermitão, também se comunica com criaturas vegetais não inteligentes (Int –4 ou –5) e espíritos.' },
      { nome: 'Magias', nivel: 1, magica: false, texto:
        'Você pode lançar magias divinas de 1º círculo, subindo de círculo a cada quatro níveis. Atributo-chave Sabedoria (somada ao total de PM). (Como o druida básico.)' },
      { nome: 'Sítio Sagrado', nivel: 3, magica: false, texto:
        'No 3º nível, você assume um sítio sagrado (uma área erma de 5 km de raio) para sua divindade. Ele dá aliados da natureza, terreno associado (soma Sabedoria em perícias no terreno), caminhos sagrados (sem redução por terreno difícil, +10 na CD de rastreá-lo) e conta como uma base. Se for destruído, você perde todos os PM até criar outro.' },
      { nome: 'Vínculo com a Terra', nivel: 5, magica: false, texto:
        'No 5º nível, quando estiver num terreno de um tipo do seu sítio sagrado, suas magias custam –1 PM (cumulativo).' },
      { nome: 'Temperado pelo Clima', nivel: 11, magica: false, texto:
        'No 11º nível, você recebe RD 5 contra o tipo de dano correspondente aos terrenos do seu sítio: aquático (eletricidade), ártico (frio), colina (impacto), deserto (fogo), floresta (corte), montanha (perfuração), pântano (ácido), planície (luz), subterrâneo (trevas).' },
      { nome: 'Eixo de Pedras', nivel: 20, magica: false, texto:
        'No 20º nível, você cria um eixo de pedras no seu sítio sagrado. Uma vez por aventura, "carrega" nele magias (custo total ≤ nível + Sabedoria; execução de movimento, padrão ou completa) e, num terreno do sítio, descarrega uma por rodada como ação livre sem pagar o custo, até o fim da aventura.' },
    ],

    // ── Inovador (de guerreiro, Tabela 1-8) ─────────────────────────
    inovador: [
      { nome: 'Do Bom e do Melhor', nivel: 1, magica: false, texto:
        'Você começa com uma arma, armadura ou escudo superior a sua escolha, de até T$ 500. Entretanto, você é considerado NÃO proficiente em qualquer arma, armadura ou escudo que não seja superior ou mágico.' },
      { nome: 'Sequência Especial', nivel: 1, magica: false, texto:
        'Gaste 2 PM para iniciar uma sequência: a cada arma ainda não usada nela, +1 em ataque e dano (cumulativo até +2). A cada quatro níveis, +1 PM para aumentar o limite em +2 (+4 no 5º, +6 no 9º, +8 no 13º, +10 no 17º). Termina no fim da cena ou após 1 rodada sem trocar de arma.' },
      { nome: 'Bombardeio Sequencial', nivel: 2, magica: false, texto:
        'No 2º nível, você pode usar sua Sequência Especial ao usar itens alquímicos ou poções (aplicando o bônus de ataque acumulado à CD do item).' },
      { nome: 'Acrobacia Defensiva', nivel: 3, magica: false, texto:
        'A partir do 3º nível, quando sofre dano, gaste 2 PM para fazer um teste de Acrobacia e subtrair o resultado do dano sofrido.' },
      { nome: 'Domínio Excêntrico', nivel: 4, magica: false, texto:
        'A partir do 4º nível, ao passar ao menos uma semana carregando uma arma exótica ou de fogo superior ou mágica, você recebe proficiência nela.' },
      { nome: 'Técnica Revolucionária', nivel: 7, magica: false, texto:
        'A partir do 7º nível, gaste 2 PM para, até o fim do combate, usar as armas que empunha como se tivessem uma habilidade a sua escolha: adaptável, ágil, alongada, dupla ou versátil. (Na tabela aparece como "técnica excêntrica".)' },
      { nome: 'Estilo Único', nivel: 20, magica: false, texto:
        'No 20º nível, escolha dois poderes de guerreiro ou de combate que possua: para eles, você ignora todos os requisitos e restrições relacionados a armas (propósito, empunhadura, características e habilidades das armas).' },
    ],

    // ── Machado de Pedra (de bárbaro, Tabela 1-9) ───────────────────
    'machado-de-pedra': [
      { nome: 'Fúria', nivel: 1, magica: false, texto:
        'Gaste 2 PM para invocar uma fúria: +2 em ataque e dano corpo a corpo, mas sem ações que exijam calma (Furtividade, magias). A cada cinco níveis, +1 PM para +1 (+3 no 6º, +4 no 11º, +5 no 16º). Termina se, ao fim da rodada, não tiver atacado nem sido alvo de efeito hostil. (Como o bárbaro básico.)' },
      { nome: 'Grunhidos', nivel: 1, magica: false, texto:
        'Você conhece só o idioma rústico da sua comunidade e comunica-se com grunhidos, mas conhece uma palavra do idioma valkar por nível de machado de pedra.' },
      { nome: 'Machado de Pedra', nivel: 1, magica: false, texto:
        'Você não recebe proficiência com armas simples; sabe usar apenas adaga, azagaia, clava, funda, lança, machadinha e tacape (e, no 9º nível, uma arma simples ou marcial a sua escolha). Ao atacar com uma arma natural, ataque desarmado ou uma dessas armas, você recebe +1 no teste de ataque e na rolagem de dano.' },
      { nome: 'Tanga de Peles', nivel: 1, magica: false, texto:
        'Você não recebe proficiência com armaduras leves. Sem armadura, soma sua Constituição na Defesa. Além disso, no 3º nível e a cada quatro níveis, +1 na Defesa (Def +1 no 3º, +2 no 7º, +3 no 11º, +4 no 15º, +5 no 19º).' },
      { nome: 'Fúria Primitiva', nivel: 2, magica: false, texto:
        'A partir do 2º nível, sem armadura e empunhando uma arma de Machado de Pedra, sua Fúria custa –1 PM. Além disso, uma vez por cena, ao entrar em fúria, você recebe PV temporários igual ao nível + Constituição.' },
      { nome: 'Instinto Selvagem', nivel: 3, magica: false, texto:
        'Você recebe +1 em rolagens de dano, Percepção e Reflexos; a cada seis níveis, +1 (+2 no 9º, +3 no 15º). (Como o bárbaro básico.)' },
      { nome: 'Resiliência Primal', nivel: 5, magica: false, texto:
        'A partir do 5º nível, você recebe redução de dano 3. A cada três níveis, sua RD aumenta em 3, até um máximo de RD 15 no 17º nível. (Substitui a Redução de Dano do bárbaro básico.)' },
      { nome: 'Fúria Rústica', nivel: 20, magica: false, texto:
        'No 20º nível, ao entrar em fúria, gaste 5 PM para, durante a fúria, ter Cura Acelerada 10 (cumulativa) e, na ação agredir, fazer um ataque desarmado adicional.' },
    ],

    // ── Magimarcialista (de bardo, Tabela 1-10) ─────────────────────
    magimarcialista: [
      { nome: 'Cadência Magimarcial', nivel: 1, magica: false, texto:
        'Sempre que lança uma magia de bardo, você recebe uma carga arcana; sempre que faz a ação agredir, uma carga marcial. Acumula um máximo de cada tipo igual ao seu Carisma; duram até o fim da cena.' },
      { nome: 'Magificação', nivel: 1, magica: false, texto:
        'Com pelo menos 1 carga arcana e 1 marcial, você recebe +2 em ataque e dano e é considerado sob Inspiração para efeitos baseados nisso. A cada cinco níveis, +1 (+3 no 6º, +4 no 11º, +5 no 16º).' },
      { nome: 'Magias', nivel: 1, magica: false, texto:
        'Escolha três escolas de magia. Você lança magias arcanas de 1º círculo dessas escolas, subindo no 6º (2º), 10º (3º) e 14º (4º). Atributo-chave Carisma (somado ao total de PM). (Como o bardo básico.)' },
      { nome: 'Bravado Magimarcial', nivel: 2, magica: false, texto:
        'No 2º nível, ao lançar uma magia gaste 1 carga marcial para reduzir o custo em –1 PM (cumulativo); ao fazer um ataque, gaste 1 carga arcana para +1d6 na rolagem de dano.' },
      { nome: 'Dança Defensiva', nivel: 3, magica: false, texto:
        'No 3º nível, num teste de resistência gaste 1 carga marcial para +5; ao sofrer dano, 1 carga arcana para redução de dano 10 contra esse dano.' },
      { nome: 'Arte Sublime', nivel: 7, magica: false, texto:
        'A partir do 7º nível, ao usar Bravado Magimarcial ou Dança Defensiva, gaste uma carga adicional do tipo exigido para dobrar o efeito.' },
      { nome: 'Crescendo Vitorioso', nivel: 20, magica: false, texto:
        'No 20º nível, no início de cada combate você recebe 1 carga arcana e 1 marcial. Além disso, soma o total de cargas marciais na CD das suas habilidades de bardo e o total de cargas arcanas em ataque e dano.' },
    ],

    // ── Necromante (de arcanista, Tabela 1-11) ──────────────────────
    necromante: [
      { nome: 'Caminho do Necromante', nivel: 1, magica: false, texto:
        'Você lança magias por uma conexão com a morte: pode aprender magias de necromancia divinas como arcanas, não pode aprender encantamento, e ao menos metade das magias devem ser de necromancia. Para lançar, primeiro gaste PV igual ao círculo máximo desejado (a conexão dura até o fim da cena). Atributo-chave Inteligência.' },
      { nome: 'Falar com Mortos', nivel: 1, magica: true, texto:
        'Você pode usar Misticismo com mortos-vivos para mudar atitude e persuasão. A partir do 3º nível, gaste uma ação padrão e 1 PM para conversar com um cadáver em alcance curto (como a magia Voz Divina, com o aprimoramento de dar um pouco de vida ao cadáver).' },
      { nome: 'Magias', nivel: 1, magica: false, texto:
        'Você pode lançar magias arcanas de 1º círculo, subindo de círculo a cada quatro níveis. Atributo-chave definido pelo Caminho (Inteligência), somado ao total de PM. (Como o arcanista básico.)' },
      { nome: 'Animar Cadáver', nivel: 2, magica: true, texto:
        'No 2º nível, gaste uma ação completa e 3 PM para animar o cadáver de uma criatura Pequena, Média ou Grande como parceiro iniciante (não conta no limite; um por vez). Ao sofrer dano, pode sacrificá-lo para reduzir o dano à metade. No 7º nível, 6 PM para veterano; no 11º, 9 PM para mestre.' },
      { nome: 'Necrologia', nivel: 3, magica: false, texto:
        'No 3º nível, você recebe +2 em Cura, Fortitude e na CD das suas magias de necromancia. A cada cinco níveis, +1 (+3 no 8º, +4 no 13º, +5 no 18º).' },
      { nome: 'Distorção Necrótica', nivel: 4, magica: false, texto:
        'No 4º nível, escolha uma magia sua de 1º círculo que não seja de necromancia: a escola dela muda para necromancia (só muda a aparência e natureza do efeito, sem efeito mecânico).' },
      { nome: 'Necropotência', nivel: 5, magica: false, texto:
        'No 5º nível, ao estabelecer sua conexão com a morte, pode gastar o dobro de PV: então, ao reduzir um ou mais inimigos vivos a 0 PV com magia de necromancia, recebe 2 PM temporários (máximo por cena igual ao nível).' },
      { nome: 'Domínio Sobre a Morte', nivel: 20, magica: true, texto:
        'No 20º nível, o custo em PM das suas magias de necromancia é reduzido à metade. Além disso, ao matar uma criatura viva com magia de necromancia, gaste 2 PM para erguer o cadáver como morto-vivo sob seu controle (como Servo Morto-Vivo, escolhendo o tipo de parceiro entre os aprimoramentos, sem componente material; não conta no limite na cena em que é criado).' },
    ],

    // ── Santo (de paladino, Tabela 1-12) ────────────────────────────
    santo: [
      { nome: 'Abençoado', nivel: 1, magica: false, texto:
        'Você soma seu Carisma no total de PM e torna-se devoto de um deus disponível para paladinos, recebendo dois poderes concedidos em vez de um. (Ao contrário do paladino básico, o santo NÃO pode escolher ser um santo do bem.)' },
      { nome: 'Código do Herói', nivel: 1, magica: false, texto:
        'Você deve sempre manter sua palavra e nunca pode recusar um pedido de ajuda de alguém inocente; nunca pode mentir, trapacear ou roubar. Se violar, perde todos os PM até o próximo dia. (Como o paladino básico.)' },
      { nome: 'Ladainha de Combate', nivel: 1, magica: true, texto:
        'Gaste uma ação padrão e 2 PM para uma aura de 9m com duração sustentada: você e os aliados na aura recebem +1 em ataque, dano e Defesa. A cada quatro níveis, +2 PM para +1 (conta como Aura Sagrada). No 5º nível, causa +1d8 de luz contra devotos de energia negativa e criaturas malignas; no 9º, as armas na aura recebem o encanto veloz. (Substitui o Golpe Divino/Aura Sagrada do paladino.)' },
      { nome: 'Santo Curandeiro', nivel: 2, magica: true, texto:
        'A partir do 2º nível, gaste uma ação de movimento e PM a sua escolha (limitado pelo Carisma): para cada PM, o aliado em alcance médio com a maior redução de PV recupera 2d8 de vida (luz). A partir do 6º, também remove uma condição (abalado, apavorado, atordoado, cego, doente, exausto, fatigado ou surdo).' },
      { nome: 'Vaso do Espírito', nivel: 3, magica: true, texto:
        'A partir do 3º nível, quando faz um teste de resistência, você pode gastar 1 PM para somar seu Carisma nesse teste. (Na tabela aparece como "vaso sagrado".)' },
      { nome: 'Mártir', nivel: 6, magica: true, texto:
        'A partir do 6º nível, quando um aliado em alcance médio faz um teste de resistência, gaste 1 PM para dar a ele um bônus igual ao seu Carisma. A partir do 12º, uma vez por cena, se ele ainda falhar, você pode sofrer o efeito no lugar dele (mesmo sendo imune).' },
      { nome: 'Pira Santa', nivel: 8, magica: true, texto:
        'No 8º nível, sob Ladainha de Combate, gaste uma ação de movimento e PM a sua escolha (limitado pelo Carisma): para cada PM, o inimigo de maior ND em alcance médio sofre 2d8 de luz e fica ofuscado por 1 rodada (Fort CD Car reduz à metade).' },
      { nome: 'Vingador Santificado', nivel: 20, magica: false, texto:
        'No 20º nível, ao usar Ladainha de Combate gaste +5 PM para dobrar os bônus numéricos dela e dar a você e aos aliados na aura imunidade a acertos críticos e RD igual a 5 + seu Carisma.' },
    ],

    // ── Seteiro (de caçador, Tabela 1-13) ───────────────────────────
    seteiro: [
      { nome: 'Caminho do Atirador', nivel: 1, magica: false, texto:
        'Você abriu mão do treinamento convencional de caçador: suas habilidades de seteiro relacionadas a ataques e armas só funcionam com arcos e bestas.' },
      { nome: 'Marca da Presa', nivel: 1, magica: false, texto:
        'Gaste uma ação de movimento e 1 PM para analisar uma criatura em alcance curto: até o fim da cena, +1d4 nas rolagens de dano contra ela (+1d8 no 5º, +1d12 no 9º, +2d8 no 13º, +2d10 no 17º; +1 PM por passo). (Como o caçador básico.)' },
      { nome: 'Tiro de Supressão', nivel: 1, magica: false, texto:
        'Sempre que causa dano com arco ou besta numa criatura sob sua Marca da Presa, ela sofre uma penalidade cumulativa de –1 em rolagens de dano (até o total de PM gasto na Marca) até o fim da cena.' },
      { nome: 'Evasão', nivel: 3, magica: false, texto:
        'A partir do 3º nível, quando sofre um efeito que permite Reflexos para reduzir o dano à metade, você não sofre dano algum se passar (dano normal se falhar). Exige liberdade de movimentos. (Como o ladino/bucaneiro.)' },
      { nome: 'Disparo Constritor', nivel: 5, magica: false, texto:
        'No 5º nível, ao usar a ação mirar, gaste 2 PM para executar uma manobra (desarmar, empurrar ou quebrar) com um de seus ataques à distância até o fim do turno.' },
      { nome: 'Rajada de Flechas', nivel: 10, magica: false, texto:
        'A partir do 10º nível, gaste uma ação completa e 2 PM para alvejar uma área: escolha um ponto no alcance, faça um ataque contra a Defesa de cada inimigo num raio de 3m e uma rolagem de dano com +2 cumulativo por acerto. Gasta só uma munição.' },
      { nome: 'Evasão Aprimorada', nivel: 13, magica: false, texto:
        'No 13º nível, quando sofre um efeito que permite Reflexos para reduzir o dano à metade, você não sofre dano algum se passar e apenas metade se falhar. Exige liberdade de movimentos.' },
      { nome: 'Sentinela', nivel: 15, magica: false, texto:
        'No 15º nível, uma vez por rodada, quando uma criatura sob sua Marca da Presa acerta um ataque contra um aliado, gaste 1 PM para fazer um ataque contra essa criatura.' },
      { nome: 'Mestre do Disparo', nivel: 20, magica: false, texto:
        'No 20º nível, você pode usar Marca da Presa como ação livre e, uma vez por rodada, ao atacar com arco ou besta um alvo marcado, fazer um ataque adicional contra ele.' },
    ],

    // ── Usurpador (de clérigo, Tabela 1-14) ─────────────────────────
    usurpador: [
      { nome: 'Inimigo dos Deuses', nivel: 1, magica: false, texto:
        'Por roubar o poder de todos os deuses, você não é aceito por nenhum: não pode ter nenhuma devoção. (Substitui o Devoto Fiel do clérigo.)' },
      { nome: 'Magias', nivel: 1, magica: false, texto:
        'Você pode lançar magias divinas de 1º círculo, subindo a cada quatro níveis. NÃO começa com magias nem as aprende automaticamente (veja Usurpar). Atributo-chave Carisma (somado ao total de PM).' },
      { nome: 'Usurpar', nivel: 1, magica: false, texto:
        'Você pode lançar qualquer magia divina de um círculo a que tenha acesso passando num teste de Enganação (CD 15 + custo em PM; se falhar, perde os PM). Não pode escolher 10 nesse teste, sofre penalidade de armadura e –5 perto de um símbolo sagrado visível.' },
      { nome: 'Canalização Falsa', nivel: 2, magica: false, texto:
        'No 2º nível, você pode canalizar tanto energia positiva quanto negativa.' },
      { nome: 'Discrição Divina', nivel: 3, magica: false, texto:
        'No 3º nível, você recebe +1 em Furtividade e testes de resistência. A cada seis níveis, +1 (+2 no 9º, +3 no 15º).' },
      { nome: 'Poder Capturado', nivel: 4, magica: false, texto:
        'No 4º nível, escolha um deus maior por nível e um poder concedido dele (cumprindo pré-requisitos, exceto poderes exclusivos de classe). Gaste 1 hora e faça Enganação (CD 20, +5 por uso adicional no dia): se passar, é considerado devoto desse deus e usa o poder até o fim do dia (sem seguir Obrigações e Restrições); se falhar, perde 3 PM.' },
      { nome: 'Roubo Divino', nivel: 20, magica: false, texto:
        'No 20º nível, ao lançar uma magia com Usurpar, para cada 10 pontos no resultado da Enganação o custo em PM é reduzido em –1 (cumulativo) e a CD para resistir aumenta em +1.' },
    ],

    // ── Vassalo (de cavaleiro, Tabela 1-15) ─────────────────────────
    //  O vassalo não escolhe poder de cavaleiro a cada nível: recebe uma
    //  cadeia FIXA de títulos, um por nível, cada um com seus benefícios.
    vassalo: [
      { nome: 'Código de Honra', nivel: 1, magica: false, texto:
        'Você não pode atacar um oponente pelas costas (flanqueando), caído, desprevenido ou incapaz de lutar. Se violar, perde todos os PM até o próximo dia. (Como o cavaleiro básico.)' },
      { nome: 'Baluarte', nivel: 1, magica: false, texto:
        'Ao sofrer um ataque ou fazer um teste de resistência, gaste 1 PM para +2 na Defesa e nos testes de resistência até o início do seu próximo turno. A cada quatro níveis, +1 PM para +2 (+4 no 5º, +6 no 9º, +8 no 13º, +10 no 17º). (Como o cavaleiro básico.)' },
      { nome: 'Jovem Pajem', nivel: 1, magica: false, texto:
        'Você inicia como pajem de um sir ou dame mais experiente: torna-se treinado em Adestramento ou Ofício (armeiro).' },
      { nome: 'Suserano', nivel: 1, magica: false, texto:
        'Escolha um nobre (aprovado pelo mestre) a quem você serve. Você recebe +5 em Diplomacia e Intimidação com vassalos dele de nível inferior e alojamento/alimentação nas terras dele. Se deixar de servi-lo, perde todos os PM até ser aceito por outro suserano.' },
      { nome: 'Valete', nivel: 2, magica: false, texto:
        'A partir do 2º nível, você acompanha seu senhor na corte: torna-se treinado em Diplomacia ou Nobreza e recebe um poder de cavaleiro a sua escolha.' },
      { nome: 'Escudeiro Aprendiz', nivel: 3, magica: false, texto:
        'A partir do 3º nível, treinado em Cavalgar e proficiência com armaduras pesadas (ou +2 na Defesa com armadura pesada, se já a tem).' },
      { nome: 'Guarda do Castelo', nivel: 4, magica: false, texto:
        'No 4º nível, treinado em Intuição e um poder de cavaleiro a sua escolha.' },
      { nome: 'Vigilante de Estradas', nivel: 5, magica: false, texto:
        'A partir do 5º nível, você recebe a habilidade Montaria e torna-se treinado em Percepção.' },
      { nome: 'Cavaleiro do Reino', nivel: 6, magica: false, texto:
        'No 6º nível, você recebe o título de sir ou dame, uma arma/armadura/escudo superior com duas melhorias a sua escolha e um poder de cavaleiro a sua escolha.' },
      { nome: 'Sargento do Reino', nivel: 7, magica: false, texto:
        'No 7º nível, você recebe um poder de cavaleiro ou de guerreiro a sua escolha (como um guerreiro de nível igual ao seu, para pré-requisitos).' },
      { nome: 'Capitão do Reino', nivel: 8, magica: false, texto:
        'No 8º nível, você recebe o poder Escudeiro e a habilidade Golpe Divino (como um paladino de nível igual ao seu). Não é habilidade mágica — provém do seu senso de justiça (magia simulada).' },
      { nome: 'Lorde', nivel: 9, magica: false, texto:
        'No 9º nível, você recebe um feudo e o poder Autoridade Feudal (as pessoas convocadas viram parceiro veterano, se já o possui). Escolha um caminho: Soldado (um poder de guerreiro a sua escolha) ou Governante (um poder de nobre a sua escolha).' },
      { nome: 'Barão', nivel: 10, magica: false, texto:
        'No 10º nível, você recebe o poder Título e um domínio de nível 1 (ou uma construção gratuita, se já tem domínio).' },
      { nome: 'Visconde', nivel: 11, magica: false, texto:
        'No 11º nível: Caminho do Soldado dá +1 PV por nível de vassalo; Caminho do Governante dá +1 em Inteligência.' },
      { nome: 'Conde', nivel: 12, magica: false, texto:
        'A partir do 12º nível, no início de cada aventura você recebe um "orçamento" de T$ 30.000 em itens mágicos (devolvidos ou reembolsados ao fim) e um poder de cavaleiro ou geral a sua escolha.' },
      { nome: 'Marquês', nivel: 13, magica: false, texto:
        'No 13º nível: Caminho do Soldado dá redução de dano 5 e +2 na Defesa; Caminho do Governante passa a somar seu Carisma nos testes de resistência.' },
      { nome: 'Duque', nivel: 14, magica: false, texto:
        'No 14º nível, quando usa Autoridade Feudal, o nível do parceiro convocado aumenta um passo. Além disso, um poder de cavaleiro a sua escolha.' },
      { nome: 'Arquiduque', nivel: 15, magica: false, texto:
        'No 15º nível, uma vez por rodada, quando uma criatura inteligente lhe causar dano, gaste 5 PM para reduzir esse dano a 0.' },
      { nome: 'Conselheiro Real', nivel: 16, magica: false, texto:
        'A partir do 16º nível, você recebe um poder de cavaleiro a sua escolha e aprende e pode lançar uma magia divina de até 4º círculo a sua escolha (atributo-chave Carisma).' },
      { nome: 'Rei Mercenário', nivel: 17, magica: false, texto:
        'No 17º nível: Caminho do Soldado dá 3 pontos para distribuir em Força, Destreza e Constituição; Caminho do Governante, 3 pontos em Inteligência, Sabedoria e Carisma.' },
      { nome: 'Rei', nivel: 18, magica: false, texto:
        'No 18º nível, você recebe +1 em Carisma e um poder de cavaleiro a sua escolha.' },
      { nome: 'Alto Rei', nivel: 19, magica: false, texto:
        'No 19º nível, seu "orçamento" de itens mágicos aumenta para T$ 100.000 e seu limite de parceiros aumenta em 2.' },
      { nome: 'Imperador', nivel: 20, magica: false, texto:
        'No 20º nível, você recebe +1 em dois atributos diferentes a sua escolha e aprende e pode lançar uma magia divina de até 5º círculo a sua escolha (atributo-chave Carisma).' },
    ],

    // ── Ventanista (de ladino, Tabela 1-16) ─────────────────────────
    ventanista: [
      { nome: 'Charme', nivel: 1, magica: false, texto:
        'Você soma seu Carisma no total de PM. Quando faz um teste de perícia (exceto ataque), pode gastar PM a sua escolha (limitado pelo Carisma): para cada PM, +2 no teste.' },
      { nome: 'Truques do Ofício', nivel: 1, magica: false, texto:
        'Você pode lançar magias arcanas de 1º círculo, mas apenas de encantamento e ilusão; sobe de círculo no 6º (2º), 10º (3º) e 14º (4º). Não é habilidade mágica (magia simulada). Começa com duas magias de 1º círculo e aprende uma a cada nível par. Atributo-chave Inteligência.' },
      { nome: 'Evasão', nivel: 2, magica: false, texto:
        'A partir do 2º nível, quando sofre um efeito que permite Reflexos para reduzir o dano à metade, você não sofre dano algum se passar (dano normal se falhar). Exige liberdade de movimentos. (Como o ladino básico.)' },
      { nome: 'Disfarce Elaborado', nivel: 3, magica: false, texto:
        'No 3º nível, ao fazer um teste de Enganação para disfarce, escolha um poder (exceto da Tormenta) cujos pré-requisitos cumpra e ligado ao disfarce: enquanto disfarçado, você sofre –3 PM e pode usá-lo. A cada seis níveis, pode assumir –3 PM adicional para um poder a mais (2 poderes no 9º, 3 no 15º).' },
      { nome: 'Esquiva Sobrenatural', nivel: 4, magica: false, texto:
        'No 4º nível, seus instintos o fazem reagir ao perigo antes de percebê-lo: você nunca fica surpreendido. (Como o ladino básico.)' },
      { nome: 'Virar a Casaca', nivel: 7, magica: false, texto:
        'No 7º nível, se estiver disfarçado, gaste 1 PM para remover o disfarce e fazer um teste de esconder-se usando Enganação no lugar de Furtividade, mesmo sem camuflagem ou cobertura.' },
      { nome: 'Olhos nas Costas', nivel: 8, magica: false, texto:
        'No 8º nível, você luta contra diversos inimigos como se fossem um só: você não pode ser flanqueado. (Como o ladino básico.)' },
      { nome: 'Evasão Aprimorada', nivel: 10, magica: false, texto:
        'No 10º nível, quando sofre um efeito que permite Reflexos para reduzir o dano à metade, você não sofre dano algum se passar e apenas metade se falhar. Exige liberdade de movimentos. (Como o ladino básico.)' },
      { nome: 'Provocação Ousada', nivel: 11, magica: false, texto:
        'A partir do 11º nível, no primeiro turno de cada cena, gaste uma ação completa para provocar seus inimigos (deixar um cartão de visitas, declarar seu plano…): até o fim da cena eles têm +2 em Percepção, Sobrevivência e Vontade contra você, mas você recupera 2 PM no início de seus turnos (máximo por cena igual ao nível; exige risco real).' },
      { nome: 'O Grande Golpe', nivel: 20, magica: false, texto:
        'No 20º nível, no início de cada aventura escolha magias (arcanas ou divinas) igual à sua Inteligência e, para cada uma, um tipo de cena (ação, exploração ou interpretação). Até o fim da aventura, na cena do tipo definido, você lança a magia escolhida sem gastar PM (limite de PM 20, atributo-chave Inteligência). Não é habilidade mágica (magia simulada).' },
    ],

  };
})();
