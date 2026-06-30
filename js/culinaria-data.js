// ═══════════════════════════════════════════════════════════════════
//  CULINARIA-DATA.JS — Culinária Avançada (Tormenta20, regras alternativas)
//  Conteúdo da sub-aba "🍳 Culinária" das Consultas rápidas.
//  Transcrito de 'Regras.txt' (Tab. 4-7 Ingredientes e 4-8 Pratos).
//  Consumido por culinaria.js (calculadora + tabelas de consulta).
//
//  cat (para o Tempero Especial): 'num'  → +1 no bônus numérico;
//                                 'pvpm' → +50% nos PV/PM temporários;
//                                 'outro'→ não é aprimorado por especiarias.
// ═══════════════════════════════════════════════════════════════════
window.GA_CULINARIA = (function () {
  'use strict';

  // Tabela 4-7: Ingredientes (preço em Tibares; cada um ocupa 0,5 espaço).
  const INGREDIENTES = [
    { nome: 'Açúcar das fadas',     preco: 50 },
    { nome: 'Ave',                  preco: 4 },
    { nome: 'Avelã de Norba',       preco: 40 },
    { nome: 'Carne',                preco: 16 },
    { nome: 'Carne de caça',        preco: 32 },
    { nome: 'Cereal',               preco: 1 },
    { nome: 'Cogumelo',             preco: 5 },
    { nome: 'Especiarias',          preco: 100 },
    { nome: 'Farinha',              preco: 1 },
    { nome: 'Fruta',                preco: 3 },
    { nome: 'Gorad',                preco: 30 },
    { nome: 'Legume',               preco: 1 },
    { nome: 'Leite',                preco: 1 },
    { nome: 'Molho tamuraniano',    preco: 30 },
    { nome: 'Óleo',                 preco: 3 },
    { nome: 'Ovo de monstro',       preco: 50 },
    { nome: 'Peixe',                preco: 7 },
    { nome: 'Porco',                preco: 8 },
    { nome: 'Queijo',               preco: 6 },
    { nome: 'Verdura',              preco: 1 },
  ];

  // Tabela 4-8: Pratos especiais. custo = soma dos ingredientes; preco = porção
  // individual comprada pronta. tempVal/tempTipo só para cat 'pvpm'.
  const PRATOS = [
    { nome: 'Assado de carnes', beneficio: '+2 em rolagens de dano corpo a corpo', cat: 'num',
      flavor: 'Pura proteína; deixa qualquer um mais forte.',
      ingredientes: ['Carne', 'Carne de caça', 'Porco'], custo: 56, cd: 25, preco: 60 },
    { nome: 'Balinhas', beneficio: '+2 em rolagens de dano de magias', cat: 'num',
      flavor: 'Balas de açúcar feérico que, dizem, potencializam magias.',
      ingredientes: ['Açúcar das fadas', 'Fruta'], custo: 53, cd: 25, preco: 60 },
    { nome: 'Banquete dos heróis', beneficio: '+1 em um atributo à escolha (sem PV, PM ou perícias extras)', cat: 'outro',
      flavor: 'Uma mesa com as melhores comidas que o dinheiro pode pagar.',
      ingredientes: ['Carne de caça', 'Ovo de monstro', 'Avelã de Norba'], custo: 82, cd: 30, preco: 150 },
    { nome: 'Batata valkariana', beneficio: '+1d6 em um teste à escolha (até o fim do dia)', cat: 'num',
      flavor: 'Batata frita gordurenta e saborosa; coisa de metrópole.',
      ingredientes: ['Óleo', 'Legume'], custo: 4, cd: 15, preco: 2 },
    { nome: 'Bolo de cenoura', beneficio: '+2 em Percepção', cat: 'num',
      flavor: '"Faz bem para a vista", juram os anciões — e acertam.',
      ingredientes: ['Farinha', 'Fruta', 'Óleo'], custo: 7, cd: 20, preco: 4 },
    { nome: 'Bolo do Panteão', beneficio: 'Reduz em –1 PM (mín. 1) o custo de uma habilidade à escolha', cat: 'outro',
      flavor: 'Bolo de gorad caríssimo, digno de banquetes reais.',
      ingredientes: ['Açúcar das fadas', 'Avelã de Norba', 'Farinha', 'Gorad'], custo: 121, cd: 30, preco: 200 },
    { nome: 'Ensopado reforçado', beneficio: '+20 PV temporários; –1,5m no deslocamento', cat: 'pvpm', tempVal: 20, tempTipo: 'PV',
      flavor: 'Nutritivo e pesado; enche, mas pesa nas pernas.',
      ingredientes: ['Fruta', 'Porco', 'Verdura'], custo: 12, cd: 20, preco: 12 },
    { nome: 'Estrogonofe', beneficio: '+2 em Vontade', cat: 'num',
      flavor: 'Iguaria das cortes de Yudennach; firma as convicções.',
      ingredientes: ['Carne', 'Cogumelo', 'Leite'], custo: 22, cd: 20, preco: 18 },
    { nome: 'Futomaki', beneficio: '+2 em Diplomacia', cat: 'num',
      flavor: 'Rolo de arroz do Império de Jade; convida ao diálogo.',
      ingredientes: ['Cereal', 'Peixe'], custo: 8, cd: 20, preco: 12 },
    { nome: 'Gorad quente', beneficio: '+2 PM temporários', cat: 'pvpm', tempVal: 2, tempTipo: 'PM',
      flavor: 'Gorad com leite, fumegando; ativa o cérebro.',
      ingredientes: ['Gorad', 'Leite'], custo: 31, cd: 25, preco: 18 },
    { nome: 'Gorvelã', beneficio: '+5 PM temporários', cat: 'pvpm', tempVal: 5, tempTipo: 'PM',
      flavor: 'Gorad com avelã de Norba; cara, mas deliciosa.',
      ingredientes: ['Gorad', 'Avelã de Norba'], custo: 70, cd: 30, preco: 90 },
    { nome: 'Javali do Bosque Enevoado', beneficio: '+2 na Defesa', cat: 'num',
      flavor: 'Ensopado de javali em cerveja escura e mel; dá confiança.',
      ingredientes: ['Carne de caça', 'Cogumelo', 'Farinha'], custo: 38, cd: 20, preco: 60 },
    { nome: 'Macarrão de Yuvalin', beneficio: '+5 PV temporários', cat: 'pvpm', tempVal: 5, tempTipo: 'PV',
      flavor: 'Macarrão com bacon e creme de leite das minas de Yuvalin.',
      ingredientes: ['Farinha', 'Leite', 'Porco'], custo: 10, cd: 20, preco: 6 },
    { nome: 'Manjar dos titãs', beneficio: '+1d4 em testes de perícias de Força, Destreza ou Constituição', cat: 'num',
      flavor: 'Pão recheado de nozes e queijo de urso-coruja; pura ousadia.',
      ingredientes: ['Avelã de Norba', 'Farinha', 'Ovo de monstro'], custo: 91, cd: 30, preco: 150 },
    { nome: 'Ovo de monstro frito', beneficio: '+10 PV temporários', cat: 'pvpm', tempVal: 10, tempTipo: 'PV',
      flavor: 'Simples no preparo, extremamente nutritivo nos ingredientes.',
      ingredientes: ['Ovo de monstro', 'Óleo'], custo: 53, cd: 25, preco: 30 },
    { nome: 'Pão de queijo', beneficio: '+2 em Fortitude', cat: 'num',
      flavor: 'Deixa qualquer aventureiro bem nutrido e saudável.',
      ingredientes: ['Farinha', 'Queijo'], custo: 7, cd: 20, preco: 10 },
    { nome: 'Pavão celestial', beneficio: '+1d4 em testes de perícias de Inteligência, Sabedoria ou Carisma', cat: 'num',
      flavor: 'Ave de caça em vinho com molho de pêssego e figo; elegância.',
      ingredientes: ['Açúcar das fadas', 'Carne de caça', 'Fruta'], custo: 85, cd: 30, preco: 150 },
    { nome: 'Pizza', beneficio: '+1 em todos os testes de resistência', cat: 'num',
      flavor: 'O disco de Guido Venusto; pronto para encarar qualquer perigo.',
      ingredientes: ['Farinha', 'Fruta', 'Queijo'], custo: 10, cd: 20, preco: 6 },
    { nome: 'Porco deheoni', beneficio: '+1 em ataques corpo a corpo', cat: 'num',
      flavor: 'Porco assado típico de Deheon; deixa valente e brigão.',
      ingredientes: ['Porco', 'Fruta', 'Legume'], custo: 12, cd: 20, preco: 36 },
    { nome: 'Prato do aventureiro', beneficio: '+1/nível na recuperação de PV na próxima noite de sono', cat: 'outro',
      flavor: 'Cozido simples de frango com legumes; mantém bem alimentado.',
      ingredientes: ['Ave', 'Legume'], custo: 5, cd: 15, preco: 2 },
    { nome: 'Salada de Salistick', beneficio: '+1,5m no deslocamento', cat: 'outro',
      flavor: 'Leve e nutritiva, criada no Reino sem Deuses.',
      ingredientes: ['Ave', 'Fruta', 'Legume'], custo: 8, cd: 20, preco: 4 },
    { nome: 'Salada élfica', beneficio: '+1 em ataques à distância', cat: 'num',
      flavor: 'Folhas, frutas e legumes de Lenórienn; inspira a mira.',
      ingredientes: ['Fruta', 'Legume', 'Verdura'], custo: 5, cd: 20, preco: 4 },
    { nome: 'Salada imperial', beneficio: '+2 em Iniciativa', cat: 'num',
      flavor: 'Folhas com bacon e queijo; leve, mas empolgante.',
      ingredientes: ['Porco', 'Queijo', 'Verdura'], custo: 15, cd: 20, preco: 6 },
    { nome: 'Sashimi', beneficio: '+2 em rolagens de dano à distância', cat: 'num',
      flavor: 'Peixe fatiado tamuraniano com molho do Império de Jade.',
      ingredientes: ['Peixe', 'Molho tamuraniano'], custo: 37, cd: 25, preco: 60 },
    { nome: 'Sopa de cogumelos', beneficio: '+2 em Misticismo', cat: 'num',
      flavor: 'Expande a percepção mística de quem a toma.',
      ingredientes: ['Cogumelo', 'Legume', 'Verdura'], custo: 7, cd: 20, preco: 6 },
    { nome: 'Sopa de peixe', beneficio: '+1/nível na recuperação de PM na próxima noite de sono', cat: 'outro',
      flavor: 'Cozido humilde de peixe que garante descanso relaxante.',
      ingredientes: ['Verdura', 'Peixe'], custo: 8, cd: 15, preco: 3 },
    { nome: 'Torta de maçã', beneficio: 'Resistência a veneno +5', cat: 'num',
      flavor: 'Abençoada pela Rainha das Fadas: maçã nunca mais fará mal.',
      ingredientes: ['Farinha', 'Fruta'], custo: 4, cd: 20, preco: 2 },
  ];

  // Cards de regra (consulta) — mesmo formato { titulo, texto } dos demais.
  const REGRAS = [
    { titulo: 'Como funciona a culinária avançada', texto:
`Estas são regras alternativas para culinária — mais concretas que as do livro básico. Use-as se quiser que a culinária seja um aspecto importante da campanha; do contrário, as regras simples bastam.
As mecânicas básicas se mantêm: um prato especial deve ser consumido ao ser comprado ou fabricado; o efeito dura 1 dia; e você só pode receber UM bônus de alimentação por dia.` },
    { titulo: 'Fabricando pratos especiais', texto:
`Para preparar um prato você precisa saber a receita, gastar os ingredientes e fazer um teste de Ofício (cozinheiro).
• Receitas — ao se tornar treinado em Ofício (cozinheiro), você aprende 1 + sua Inteligência receitas. Aprender uma nova leva 1 dia e custa T$ 100 (alguns cozinheiros ensinam em troca de serviços).
• Ingredientes — cada prato pede dois ou três (veja a tabela).
• Teste — 1 hora de trabalho + os ingredientes + Ofício (cozinheiro) na CD do prato. Passando, você prepara comida suficiente para o grupo inteiro (diferente da regra padrão, que faz uma porção individual).` },
    { titulo: 'Ingredientes', texto:
`Alguns ingredientes são comuns (poucos tibares em qualquer feira); outros, raros, só existem em regiões específicas ou em grandes empórios. Os preços da tabela consideram insumos de ÓTIMA qualidade, necessários para pratos especiais — insumos normais podem ser mais baratos, mas não têm efeito em jogo. Cada ingrediente ocupa 0,5 espaço.` },
    { titulo: 'Tempero Especial', texto:
`Um cozinheiro treinado pode dar um toque pessoal aos pratos. Isso gasta uma porção de especiarias (T$ 100, além dos ingredientes) e aumenta a CD do teste em +5. Em troca:
• Se o prato fornece um bônus numérico (incluindo rolagens de dados), ele aumenta em +1.
• Se fornece PV ou PM temporários, o valor aumenta em 50%.
• Outros efeitos não são aprimorados pelo tempero.` },
    { titulo: 'Comprar × cozinhar', texto:
`O preço na coluna "Comprar" é para uma porção individual do prato pronto. Se você mesmo cozinhar (gastando os ingredientes), prepara comida para o grupo inteiro (por volta de 5 pessoas). Nem todo prato está disponível em toda taverna — o mestre monta o cardápio de cada lugar. Pratos de outros suplementos (Ameaças de Arton, Deuses de Arton) podem ser adaptados definindo ingredientes e CD.` },
  ];

  // mapa nome → preço, para a calculadora detalhar os ingredientes
  const PRECO_ING = {};
  INGREDIENTES.forEach(i => { PRECO_ING[i.nome] = i.preco; });
  const ESPECIARIAS = PRECO_ING['Especiarias'];

  return { INGREDIENTES, PRATOS, REGRAS, PRECO_ING, ESPECIARIAS };
})();
