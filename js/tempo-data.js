// ═══════════════════════════════════════════════════════════════════
//  TEMPO-DATA.JS — Tempo entre aventuras (dados puros)
//  Consumido por:
//    • tempo.js → aba "⏳ Tempo entre aventuras"
//
//  Referência: Novas mecânicas (Tempo entre aventuras) — Tabelas 6-6 e 6-7.
// ═══════════════════════════════════════════════════════════════════

// ── Tabela 6-6: Desafios de Buscas (2d12 → perícia + exemplo) ────────
// Índice pela soma de 2d12 (2 a 24).
window.TEMPO_BUSCAS = [
  { n: 2,  pericia: 'Misticismo',   ex: 'Decifrar uma runa' },
  { n: 3,  pericia: 'Adestramento', ex: 'Acalmar uma fera' },
  { n: 4,  pericia: 'Conhecimento', ex: 'Traduzir um texto antigo' },
  { n: 5,  pericia: 'Enganação',    ex: 'Participar de uma intriga' },
  { n: 6,  pericia: 'Cura',         ex: 'Tratar um veneno' },
  { n: 7,  pericia: 'Iniciativa',   ex: 'Perseguir um bandido' },
  { n: 8,  pericia: 'Intimidação',  ex: 'Negociar com um criminoso' },
  { n: 9,  pericia: 'Investigação', ex: 'Descobrir uma localização' },
  { n: 10, pericia: 'Reflexos',     ex: 'Evitar um desmoronamento' },
  { n: 11, pericia: 'Atletismo',    ex: 'Escalar um penhasco' },
  { n: 12, pericia: 'Percepção',    ex: 'Evitar uma emboscada' },
  { n: 13, pericia: 'Sobrevivência',ex: 'Atravessar os ermos' },
  { n: 14, pericia: 'Fortitude',    ex: 'Tolerar clima ruim' },
  { n: 15, pericia: 'Diplomacia',   ex: 'Negociar com um mercador' },
  { n: 16, pericia: 'Furtividade',  ex: 'Infiltrar-se num lugar' },
  { n: 17, pericia: 'Acrobacia',    ex: 'Atravessar uma ravina' },
  { n: 18, pericia: 'Intuição',     ex: 'Elucidar um enigma' },
  { n: 19, pericia: 'Vontade',      ex: 'Resistir a uma maldição' },
  { n: 20, pericia: 'Luta',         ex: 'Defender-se de um monstro' },
  { n: 21, pericia: 'Jogatina',     ex: 'Apostar com as fadas' },
  { n: 22, pericia: 'Nobreza',      ex: 'Participar de um baile' },
  { n: 23, pericia: 'Religião',     ex: 'Entender um presságio' },
  { n: 24, pericia: 'Guerra',       ex: 'Atravessar um campo de batalha' },
];

// ── Tabela 6-7: Consequências de Buscas (nº de sucessos → resultado) ──
window.TEMPO_CONSEQUENCIAS = [
  { s: 0, txt: '1 castigo',      tipo: 'castigo',    qtd: 1 },
  { s: 1, txt: 'Nenhuma',        tipo: 'nenhuma',    qtd: 0 },
  { s: 2, txt: '1 recompensa',   tipo: 'recompensa', qtd: 1 },
  { s: 3, txt: '2 recompensas',  tipo: 'recompensa', qtd: 2 },
];

// ── Recompensas & Castigos (1d6) ─────────────────────────────────────
window.TEMPO_RECOMP_CASTIGO = [
  { d: 1, recompensa: 'Tesouro (riqueza)', castigo: 'Ruína (menor)' },
  { d: 2, recompensa: 'Favor',             castigo: 'Abalo' },
  { d: 3, recompensa: 'Tesouro (item)',    castigo: 'Complicação' },
  { d: 4, recompensa: 'Informação',        castigo: 'Ferimento' },
  { d: 5, recompensa: 'Tesouro (ambos)',   castigo: 'Maldição' },
  { d: 6, recompensa: 'Poder',             castigo: 'Ruína (maior)' },
];

// Descrições das recompensas (para mostrar ao rolar).
window.TEMPO_RECOMPENSAS = [
  { nome: 'Favor',       desc: 'Um favor de um NPC ou organização (ou a promessa de um), que ajuda por uma cena. Você decide o favor; o mestre aprova.' },
  { nome: 'Informação',  desc: 'Uma informação relevante (localização de um tesouro, identidade de um traidor, cura de um veneno…). Você decide; o mestre aprova.' },
  { nome: 'Poder',       desc: 'Você recebe um benefício de treinamento, definido aleatoriamente.' },
  { nome: 'Tesouro',     desc: 'Um bem material. Role na tabela Tesouros (Cap. 8), na coluna de riquezas, de itens ou em ambas, na linha do seu nível.' },
];

// Descrições dos castigos.
window.TEMPO_CASTIGOS = [
  { nome: 'Abalo',       desc: 'Na próxima aventura, seus PM máximos diminuem em 1 por nível de personagem.' },
  { nome: 'Complicação', desc: 'Uma complicação que o afetará na carreira (inimigo poderoso, doença mágica…). O mestre define os detalhes.' },
  { nome: 'Ferimento',   desc: 'Na próxima aventura, seus PV máximos diminuem em 1 por nível. Cura não funciona contra este efeito.' },
  { nome: 'Maldição',    desc: 'Você sofre um efeito da magia Rogar Maldição na próxima aventura.' },
  { nome: 'Ruína',       desc: 'Perde dinheiro/itens equivalente a ¼ (menor) ou ½ (maior) do dinheiro inicial do seu nível. Sem como pagar, sofre um Abalo.' },
];

// ── Variante: Custo de Vida (custo mensal → condição de descanso) ─────
window.TEMPO_CUSTO_VIDA = [
  { chave: 'pobre',   nome: 'Pobre',   preco: 10,  cond: 'Ruim',
    desc: 'Dorme na rua, em celeiros ou nas piores hospedarias; come pão velho e veste trapos.' },
  { chave: 'medio',   nome: 'Médio',   preco: 50,  cond: 'Normal',
    desc: 'Dorme em estalagens e come em tavernas. O estilo de vida da maioria dos aventureiros.' },
  { chave: 'rico',    nome: 'Rico',    preco: 100, cond: 'Confortável',
    desc: 'Quartos privativos nas estalagens, boa alimentação e roupas de alfaiate.' },
  { chave: 'luxuoso', nome: 'Luxuoso', preco: 200, cond: 'Luxuosa',
    desc: 'As melhores estalagens (ou o castelo de um nobre) e banquetes. Passeios de carruagem.' },
];

// ── Benefícios de Treinamento (escolha 1 ao passar em ≥2 dos 3 testes) ─
window.TEMPO_TREINO_BENEFICIOS = [
  { chave: 'pv',       txt: 'PV equivalentes ao seu próximo nível.' },
  { chave: 'pm',       txt: 'PM equivalentes ao seu próximo nível.' },
  { chave: 'classe',   txt: 'Uma habilidade de classe do seu próximo nível.' },
  { chave: 'pericias', txt: '+1 em todas as perícias (apenas se o seu próximo nível for par).' },
];

// ── Medida de tempo (uma ação por…) ──────────────────────────────────
window.TEMPO_MEDIDAS = [
  { chave: 'mes',     nome: 'Por mês' },
  { chave: 'estacao', nome: 'Por estação (3 meses)' },
  { chave: 'ano',     nome: 'Por ano' },
];

// ── Tipos de ação entre aventuras (para o registro por jogador) ──────
window.TEMPO_ACOES = [
  { chave: 'trabalho',    nome: 'Trabalho',    icone: '🔨',
    desc: 'Treinado em Ofício, ganha dinheiro ou fabrica itens conforme as regras da perícia.' },
  { chave: 'treinamento', nome: 'Treinamento', icone: '📈',
    desc: 'Três testes de um atributo (CD 10 + ½ nível). Passando em ≥2, ganha um benefício do próximo nível.' },
  { chave: 'busca',       nome: 'Busca',       icone: '🔎',
    desc: 'Qualquer outra meta. Três testes (CD 20 + ½ nível) definem o resultado pela Tabela 6-7.' },
  { chave: 'base',        nome: 'Base',        icone: '🏰',
    desc: 'Construir/ampliar base ou cômodos, ou administrar um empreendimento — tudo consome uma ação entre aventuras.' },
];
