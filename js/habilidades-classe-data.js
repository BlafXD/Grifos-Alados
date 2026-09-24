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

  };
})();
