// ════════════════════════════════════════════════════════════════════
//  COMPLICACOES-DATA.JS — as Complicações do Heróis de Arton (Cap. 4)
//  Localização: /grifos-alados/js/complicacoes-data.js
//
//  As COMPLICAÇÕES GERAIS (p. 282–284), que QUALQUER personagem pode
//  escolher (uma só, na criação — e por ela vem um poder geral extra).
//  Lidas do PDF (Heróis de Arton) palavra por palavra; os hífens de
//  quebra de linha da justificação foram removidos. O † marca as
//  COMPORTAMENTAIS: se violadas, você perde todos os PM até o dia seguinte.
//
//  As complicações DE CLASSE (p. 284–287) ficam para uma leva à parte —
//  a estrutura é a mesma, com o campo `classe`.
//
//  Consumido pelo seletor do cartão ⚠ Complicações (js/ficha.js), que
//  insere a escolhida na caixa. Carregado nas duas páginas.
// ════════════════════════════════════════════════════════════════════
(function () {
  'use strict';
  window.GA_COMPLICACOES = [
    { id: 'amaldicoado', nome: 'Amaldiçoado', comportamental: false,
      texto: 'Você foi amaldiçoado por uma entidade poderosa, como um lich, um nobre feérico, um Lorde da Tormenta ou mesmo um deus. No início de cada cena envolvendo qualquer tipo de risco ou perigo, role 1d6. Em um resultado 1, você não consegue usar seus pontos de mana nessa cena.' },
    { id: 'apetitoso', nome: 'Apetitoso', comportamental: false,
      texto: 'Por algum motivo, feras salivam ao farejá-lo. Animais e monstros recebem +5 em testes de ataque e rolagens de dano contra você.' },
    { id: 'assombrado', nome: 'Assombrado', comportamental: false,
      texto: 'Você é assombrado por um ser desagradável, como o fantasma de um ancestral, uma fada travessa ou um diabrete zombeteiro. Ele conta no seu limite de parceiros, mas não fornece nenhum benefício. Além disso, no início de cada cena envolvendo qualquer tipo de risco ou perigo, role um dado. Em um resultado ímpar, você fica alquebrado até o fim da cena.' },
    { id: 'cabeca-quente', nome: 'Cabeça Quente', comportamental: false,
      texto: 'Sempre que você sofre dano, seu próximo turno deve ser dedicado a atacar a fonte do dano. Se não puder atacá-la — por exemplo, se a fonte do dano for um inimigo fora do seu alcance ou algo que por definição não possa ser atacado, como um raio proveniente de uma tempestade — você deve gastar sua próxima ação de movimento esbravejando contra o ar.' },
    { id: 'caolho', nome: 'Caolho', comportamental: false,
      texto: 'Você não tem um dos olhos. Você sofre –2 em Iniciativa, Percepção, Pontaria e Reflexos e fica automaticamente flanqueado por dois ou mais oponentes em corpo a corpo.' },
    { id: 'chato', nome: 'Chato', comportamental: false,
      texto: 'Sempre que você sai de uma aldeia, uma festa acontece. Você sofre –5 em Diplomacia e a atitude inicial de NPCs em relação a você é uma categoria pior.' },
    { id: 'combalido', nome: 'Combalido', comportamental: false,
      texto: 'Por alguma razão, natural ou sobrenatural, sua saúde é frágil. Você sofre –5 em Fortitude e recebe –1 PV por nível de personagem.' },
    { id: 'covarde', nome: 'Covarde', comportamental: false,
      texto: 'Seu lema é "aquele que foge hoje vive para lutar amanhã". Claro, se puder evitar a luta de amanhã também, melhor ainda! Você sofre –5 em testes de resistência contra efeitos de medo e, no início de cada cena envolvendo qualquer tipo de risco ou perigo, deve rolar um dado. Em um resultado ímpar, você fica abalado (mesmo que seja imune a isso).' },
    { id: 'cria-de-nimb', nome: 'Cria de Nimb', comportamental: false,
      texto: 'Você tem um parafuso a menos (talvez literalmente, se for um golem). Você sofre –5 em testes de perícias baseadas em Carisma. Além disso, no início de cada cena de ação, role 1d6. Com um resultado 1, você fica confuso (mesmo que seja imune a essa condição). Você não pode escolher esta complicação se for devoto de Nimb ou se, por algum outro motivo, seguir suas Obrigações & Restrições.' },
    { id: 'criado-na-cidade', nome: 'Criado na Cidade', comportamental: false,
      texto: 'Você não se dá bem no mato. Você sofre –5 em Sobrevivência e, quando descansa nos ermos, sua recuperação é uma categoria pior (se já era ruim, você recupera apenas 1 PV e 1 PM, independentemente do seu nível).' },
    { id: 'crise-de-fe', nome: 'Crise de Fé', comportamental: true,
      texto: 'Você segue um dos deuses do Panteão, mas no fundo se pergunta se isso é o certo a fazer. Você sofre –2 em Vontade e segue as Obrigações & Restrições de um deus, mas não recebe nenhum poder concedido por isso nem conta como devoto dessa divindade para cumprir pré-requisitos. Você não pode ser devoto de outro deus.' },
    { id: 'desprotegido', nome: 'Desprotegido', comportamental: false,
      texto: 'Você nunca aprendeu a se defender. Você sofre –2 na Defesa e em testes de resistência.' },
    { id: 'distraido', nome: 'Distraído', comportamental: false,
      texto: 'Você é muito desligado e... Hein? Do que estávamos falando? Você sofre –5 em Iniciativa e Percepção.' },
    { id: 'emotivo', nome: 'Emotivo', comportamental: false,
      texto: 'Fadado a sofrer, você não se beneficia de efeitos que forneçam bônus numéricos (em atributos, testes, Defesa etc.) usados por outros personagens.' },
    { id: 'expurgo-de-wynna', nome: 'Expurgo de Wynna', comportamental: false,
      texto: 'Algo em você não agrada à Deusa da Magia. Você sofre –5 em testes de resistência contra efeitos mágicos.' },
    { id: 'fracote', nome: 'Fracote', comportamental: false,
      texto: 'Você cresceu dentro dos muros de um palácio ou enfurnado na torre de um mago e nunca praticou atividades físicas. Você está permanentemente fraco (mesmo que seja imune a essa condição).' },
    { id: 'hedonista', nome: 'Hedonista', comportamental: false,
      texto: 'Você está acostumado a viver no luxo e não aceita nada abaixo disso. Em condições luxuosas, sua recuperação de PV e PM é igual ao seu nível. Em condições confortáveis, sua recuperação é igual à metade do seu nível. Em condições normais ou ruins, você recupera apenas 1 PV e 1 PM, independentemente do seu nível.' },
    { id: 'impio', nome: 'Ímpio', comportamental: true,
      texto: 'Você odeia os deuses — e eles sabem disso. Você sofre –5 em testes de resistência contra magias divinas e não pode se beneficiar de efeitos dessas magias.' },
    { id: 'impulsivo', nome: 'Impulsivo', comportamental: false,
      texto: 'Você age primeiro e pensa depois (ou nunca). Você sofre –5 em Furtividade e Investigação, e não pode fazer as ações atrasar e preparar.' },
    { id: 'inculto', nome: 'Inculto', comportamental: false,
      texto: 'Você não teve acesso à educação. Você é analfabeto e recebe duas perícias treinadas a menos (isso pode reduzir as perícias que você pode escolher a zero, mas não afeta as perícias fixas de sua classe).' },
    { id: 'indolente', nome: 'Indolente', comportamental: false,
      texto: 'Você é apático e preguiçoso. Você sofre –5 em Reflexos e –3m em seu deslocamento.' },
    { id: 'ingenuo', nome: 'Ingênuo', comportamental: false,
      texto: 'Não há maldade em seu coração. Você sofre –5 em Enganação, Intuição, Investigação e Ladinagem.' },
    { id: 'maneta', nome: 'Maneta', comportamental: false,
      texto: 'Você não tem uma das mãos. Você só pode empunhar um item (e, obviamente, não pode usar armas de duas mãos).' },
    { id: 'marcado-pelo-passado', nome: 'Marcado pelo Passado', comportamental: false,
      texto: 'Um evento em seu passado o deixou taciturno e sombrio. Você sofre –5 em Diplomacia e recebe –1 PM por nível de personagem.' },
    { id: 'matugo', nome: 'Matugo', comportamental: false,
      texto: 'Você não se dá bem em cidades. Você fica alquebrado em ambientes urbanos e, quando descansa nesses ambientes, sua recuperação é uma categoria pior (se já era ruim, você recupera apenas 1 PV e 1 PM, independentemente do seu nível).' },
    { id: 'miope', nome: 'Míope', comportamental: false,
      texto: 'Você tem dificuldade de enxergar objetos distantes. Como alternativa, acha covardia atacar de longe e nunca treinou com armas de ataque à distância. Você sofre –5 em Percepção e Pontaria, e fica desprevenido contra efeitos que se originem além de alcance curto.' },
    { id: 'mouco', nome: 'Mouco', comportamental: false,
      texto: 'Sua audição é ruim. Você sofre –2 em Iniciativa, Intuição, Percepção e Reflexos.' },
    { id: 'paladar-infantil', nome: 'Paladar Infantil', comportamental: false,
      texto: 'Você é chato para comer. Não se beneficia de itens da categoria alimentação, nem de poções. Além disso, sofre –2 em testes de perícias baseadas em Carisma durante situações sociais baseadas em refeições, como um banquete no palácio ou uma noite na taverna.' },
    { id: 'paranoico', nome: 'Paranoico', comportamental: false,
      texto: 'Você não confia em ninguém, nem em seus aliados. Você precisa passar em um teste de Vontade (CD 20 + seu nível) para aceitar qualquer ajuda — até mesmo cura! Se falhar no teste, recusa a ajuda e, se for ajudado mesmo assim (contra sua vontade), fica alquebrado até o fim da cena. Além disso, você não dorme direito: sua condição de descanso é sempre uma categoria pior do que seria pelas circunstâncias (se já era ruim, você recupera apenas 1 PV e 1 PM, independentemente do seu nível).' },
    { id: 'temeroso', nome: 'Temeroso', comportamental: false,
      texto: 'Você tem medo de se machucar. Como alternativa, treinou apenas com armas de ataque à distância e não sabe o que fazer quando as coisas ficam mais "pessoais". Você sofre –5 em Luta e, enquanto estiver adjacente a um inimigo, fica abalado.' },
    { id: 'tolo', nome: 'Tolo', comportamental: false,
      texto: 'É fácil enganá-lo e manipulá-lo. Você sofre –5 em Intuição e Vontade.' },
    { id: 'vagaroso', nome: 'Vagaroso', comportamental: false,
      texto: '"Devagar e sempre vence a corrida" é o que você diz. E, se não vencer, pelo menos você não se cansou. Você está permanentemente sob efeito da condição lento (todas as suas formas de deslocamento são reduzidas à metade e você não pode correr ou fazer investidas).' },
  ];
})();
