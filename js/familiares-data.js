// ═══════════════════════════════════════════════════════════════════
//  FAMILIARES-DATA.JS — Familiares (Tormenta20 / Ameaças de Arton)
//  Consumido por familiares.js → sub-aba "🦉 Familiares" (consulta)
//
//  As fichas do bestiário trazem uma linha "Familiar" SEPARADA da linha
//  "Parceiro": a mesma criatura pode servir de parceiro (com os três
//  degraus iniciante/veterano/mestre, na aba 🐎) e, além disso, dar um
//  benefício próprio quando invocada como familiar. Esse segundo
//  benefício não cabia na aba de montarias — vive aqui.
//
//  `nd` e `secao` apontam para a ficha completa da criatura, na aba
//  📕 Fichas prontas → Ameaças de Arton.
//  `exige` é a condição para conseguir o familiar, quando o livro impõe
//  uma (ovo, ova); `tambemParceiro` diz se a mesma ficha também aparece
//  na aba 🐎 Animais & Montarias.
// ═══════════════════════════════════════════════════════════════════

window.FAMILIARES = [
  { nome: 'Aquin’ne', nd: '2', secao: 'Elementais', fonte: 'Ameaças de Arton',
    beneficio: 'Concede deslocamento de natação 9 m e permite lançar magias e respirar debaixo d’água.' },

  { nome: 'Asa-Assassina', nd: '1', secao: 'Masmorras', fonte: 'Ameaças de Arton',
    tambemParceiro: 'parceiro especial (assassino)',
    beneficio: 'Permite gastar 1 PM, quando você causa dano de corte ou perfuração a uma criatura, para deixá-la sangrando.' },

  { nome: 'Chibi-Kabuto', nd: '1/4', secao: 'Império de Jade', fonte: 'Ameaças de Arton',
    beneficio: 'Aumenta em +1 o bônus na Defesa que você recebe por suas magias.' },

  { nome: 'Dragão filhote', nd: '3', secao: 'Dragões', fonte: 'Ameaças de Arton',
    exige: 'Um ovo de dragão. Dragões filhotes são muito bestiais, e transformar um filhote já chocado em familiar é quase impossível.',
    tambemParceiro: 'parceiro montaria (Grande) — e um dragão conta como DOIS parceiros no seu limite',
    beneficio: 'Suas magias que causam dano do mesmo tipo que o sopro do dragão têm a CD aumentada em +2 e custam –1 PM (cumulativo com outras reduções).',
    nota: 'Vale para dragões filhotes de qualquer tipo. Está no quadro “Dragões como Familiares e Parceiros”, na seção Dragões.' },

  { nome: 'Estirge', nd: '1', secao: 'Ermos', fonte: 'Ameaças de Arton',
    exige: 'Uma ova de estirge.',
    beneficio: 'Você recebe 1 PV temporário cumulativo (até o limite do seu nível) sempre que causa dano a uma criatura viva com uma magia.' },

  { nome: 'Homúnculo', nd: '1', secao: 'Mascotes & Familiares', fonte: 'Ameaças de Arton',
    tambemParceiro: 'parceiro especial (ajudante)',
    beneficio: 'Fornece +1 PM para gastar em aprimoramentos sempre que você lança uma magia de transmutação ou veneno.' },

  { nome: 'Pakk', nd: '1', secao: 'Elementais', fonte: 'Ameaças de Arton',
    beneficio: 'Permite que você lance Explosão de Chamas. Caso aprenda novamente essa magia, seu custo diminui em –1 PM.' },

  { nome: 'Stagh', nd: '3', secao: 'Uivantes', fonte: 'Ameaças de Arton',
    beneficio: 'Concede +1 na CD das suas magias de frio.' },

  { nome: 'Tentacute', nd: '1/2', secao: 'Mascotes & Familiares', fonte: 'Ameaças de Arton',
    tambemParceiro: 'parceiro especial (vigilante)',
    beneficio: 'Uma vez por rodada, pode ser usado para sacar ou guardar um item, ou para pegar um item solto Pequeno ou menor (1 espaço ou menos) em alcance curto e que ele consiga alcançar.' },

  { nome: 'Terrier', nd: '1', secao: 'Elementais', fonte: 'Ameaças de Arton',
    beneficio: 'Concede redução de dano 2/impacto.' },

  { nome: 'T’Peel', nd: '1', secao: 'Elementais', fonte: 'Ameaças de Arton',
    beneficio: 'Pode carregar 2 espaços de itens e permite que você lance Queda Suave.' },
];

window.FAMILIARES_REGRAS = [
  { titulo: '🦉 O que esta lista é',
    texto: `Estas são as onze criaturas de Ameaças de Arton cuja ficha traz uma linha "Familiar" — um benefício próprio, que vale quando a criatura é invocada como familiar, e que é diferente do que ela dá como parceiro.\nQuatro delas (asa-assassina, dragão filhote, homúnculo e tentacute) também aparecem na aba 🐎 Animais & Montarias, com os três degraus de parceiro. As outras sete só existem como familiar.\nA ficha completa de cada uma está na aba 📕 Fichas prontas → Ameaças de Arton, na seção indicada no card.` },
  { titulo: '🥚 Familiares que exigem um ovo',
    texto: `Duas criaturas não podem ser simplesmente invocadas: o livro exige um item para o ritual.\nDragão filhote — exige um ovo de dragão. O livro é explícito: transformar um filhote já chocado em familiar é quase impossível.\nEstirge — exige uma ova de estirge.` },
  { titulo: '🐉 Dragão: familiar e parceiro ao mesmo tempo',
    texto: `O quadro "Dragões como Familiares e Parceiros" trata as duas pontas. Como familiar, um dragão filhote reforça as magias do mesmo tipo de dano que o sopro dele. Como parceiro, um dragão não pode ser escolhido como opção de uma habilidade (tem de ser conquistado em jogo) e conta como DOIS parceiros no seu limite — o que, na prática, deixa um dragão jovem fora do alcance de um personagem de 4º nível ou menor, a menos que ele aumente o limite de parceiros ou pegue o poder Coração de Dragão.` },
];
