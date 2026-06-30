// ═══════════════════════════════════════════════════════════════════
//  BASES-DATA.JS — Regras de Base de Tormenta 20 (dados puros)
//  Consumido por:
//    • bases.js → aba "🏰 Bases" (controle e cálculos das bases do grupo)
//
//  Referência: Novas mecânicas (Base) / Homebrew T20 (Base → Mobílias).
//
//  • BASE_PORTES  — tabela de porte (custo, manutenção, máx. de cômodos).
//  • BASE_TIPOS   — tipos de base e seus benefícios iniciais.
//  • BASE_COMODOS — catálogo de cômodos (efeito, pré-requisitos, segurança).
//  • BASE_MOBILIAS— catálogo de mobílias (preço, onde instalar, efeito).
//  • BASE_CUSTO_COMODO — custo fixo para construir um cômodo.
// ═══════════════════════════════════════════════════════════════════

// Custo para construir UM cômodo (T$). Com Sítio Sagrado, paga metade.
window.BASE_CUSTO_COMODO = 1000;

// ── PORTE ────────────────────────────────────────────────────────────
// A ordem do array é a progressão de porte (índice = nível de porte).
// custo  = valor da tabela (construir do zero custa isto, acumulado).
// manut  = manutenção paga no início de cada aventura.
// comodos= número máximo de cômodos que o porte comporta.
window.BASE_PORTES = [
  { chave: 'minima',     nome: 'Mínima',     custo: 1000,  manut: 100,  comodos: 0,
    exemplos: 'Quarto em estalagem, tenda reforçada, carroça coberta' },
  { chave: 'modesta',    nome: 'Modesta',    custo: 3000,  manut: 300,  comodos: 3,
    exemplos: 'Casebre, gruta, barcaça' },
  { chave: 'basica',     nome: 'Básica',     custo: 6000,  manut: 600,  comodos: 6,
    exemplos: 'Casa, torre pequena, caverna, veleiro' },
  { chave: 'formidavel', nome: 'Formidável', custo: 10000, manut: 1000, comodos: 9,
    exemplos: 'Casarão, torre média, complexo de cavernas, nau' },
  { chave: 'grandiosa',  nome: 'Grandiosa',  custo: 15000, manut: 1500, comodos: 12,
    exemplos: 'Forte, torre grande, galeão' },
  { chave: 'suprema',    nome: 'Suprema',    custo: 21000, manut: 2100, comodos: 15,
    exemplos: 'Castelo, cidadela' },
];

// ── TIPOS DE BASE ────────────────────────────────────────────────────
// seg = bônus de segurança que o tipo fornece (0 quando não há).
window.BASE_TIPOS = [
  { chave: 'centro',        nome: 'Centro de Poder', seg: 0,
    efeito: 'Construída sobre um centro de energias mágicas. Os residentes recebem +1 PM.' },
  { chave: 'empreendimento', nome: 'Empreendimento', seg: 0,
    efeito: 'Parte de um negócio. 1×/intervalo entre aventuras um residente faz teste de Inteligência (bônus = nº de cômodos que a base pode ter); a base rende tibares de ouro = ao resultado. Gastando a ação administrando, recebe o dobro. (Alternativa FdT Arco 2: Valkaria — conta como negócio nível 1.)' },
  { chave: 'esconderijo',   nome: 'Esconderijo', seg: 0,
    efeito: 'Em local oculto ou disfarçado. Os residentes recebem +1 em testes de resistência.' },
  { chave: 'fortificacao',  nome: 'Fortificação', seg: 5,
    efeito: 'Estrutura fortificada ou de difícil acesso. Recebe +5 em segurança e os residentes recebem +1 na Defesa.' },
  { chave: 'movel',         nome: 'Móvel', seg: 0,
    efeito: 'Veículo terrestre (deslocamento 12 m) ou aquático (natação 12 m). Os residentes recebem +1,5 m de deslocamento. Aquática não submerge sem o cômodo Domo Protetor.' },
  { chave: 'residencia',    nome: 'Residência', seg: 0,
    efeito: 'Local confortável e aconchegante. Cada residente recebe +3 PV e, 1×/aventura, os benefícios de um prato especial (Tormenta20, p. 162).' },
];

// ── CÔMODOS ──────────────────────────────────────────────────────────
// Construir um cômodo custa BASE_CUSTO_COMODO. Campos:
//   chave, nome, efeito
//   seg          → bônus de segurança (omitido = 0)
//   prereqPorte  → porte mínimo exigido (chave de BASE_PORTES)
//   prereqComodo → array de cômodos exigidos (chaves)
window.BASE_COMODOS = [
  { chave: 'adega', nome: 'Adega',
    efeito: 'O efeito de qualquer preparado ou poção ingerido pelos residentes aumenta em +1 por dado.' },
  { chave: 'ala-dos-criados', nome: 'Ala dos Criados', prereqPorte: 'formidavel',
    efeito: 'No início de cada aventura, cada residente recebe 1d4 PM temporários por patamar (duram até serem gastos).' },
  { chave: 'armorial', nome: 'Armorial',
    efeito: 'Fornece proficiência com um item à sua escolha (pode trocar no início de cada aventura).' },
  { chave: 'biblioteca', nome: 'Biblioteca',
    efeito: 'Os residentes recebem +1 em Conhecimento.' },
  { chave: 'calabouco', nome: 'Calabouço',
    efeito: 'Os residentes recebem +1 em Intimidação e na CD de seus efeitos de medo.' },
  { chave: 'camara-de-meditacao', nome: 'Câmara de Meditação',
    efeito: 'Fornece aos residentes +1 em Vontade.' },
  { chave: 'casa-da-guarda', nome: 'Casa da Guarda', seg: 4, prereqPorte: 'formidavel', prereqComodo: ['guarita'],
    efeito: 'O bônus de segurança da guarita aumenta em +4. Os guardas podem acompanhar o grupo como um pelotão de infantaria veterano (parceiro capanga).' },
  { chave: 'chapelaria', nome: 'Chapelaria', prereqPorte: 'formidavel',
    efeito: 'Os residentes podem se beneficiar de um item vestido adicional.' },
  { chave: 'cozinha', nome: 'Cozinha',
    efeito: 'No início de cada aventura, escolha dois pratos especiais (T20 p. 162). Os residentes os recebem embalados "para viagem" (0,5 espaço cada; duram a aventura).' },
  { chave: 'domo-protetor', nome: 'Domo Protetor', seg: 2, prereqComodo: ['gabinete-mistico'],
    efeito: 'A base recebe +2 em segurança e, se for móvel, pode entrar em ambientes inóspitos (ex.: debaixo d’água) sem risco aos ocupantes.' },
  { chave: 'despensa', nome: 'Despensa',
    efeito: 'O limite de carga dos residentes aumenta em 2 espaços.' },
  { chave: 'enfermaria', nome: 'Enfermaria',
    efeito: 'Os residentes recebem +1 em Cura e em testes para estancar sangramentos ou em testes de morte.' },
  { chave: 'estabulo', nome: 'Estábulo',
    efeito: 'Cada parceiro animal ou monstro aumenta um bônus fornecido por ele em +1 (montaria: em vez disso, +3 m de deslocamento).' },
  { chave: 'estufa', nome: 'Estufa',
    efeito: 'Fornece +1 na CD de todos os seus preparados e poções.' },
  { chave: 'gabinete-mistico', nome: 'Gabinete Místico',
    efeito: 'Os residentes recebem +1 em Misticismo.' },
  { chave: 'forjaria', nome: 'Forjaria', prereqComodo: ['oficina-de-trabalho'],
    efeito: 'Os residentes recebem +1 nas rolagens de dano com uma arma empunhada à escolha (troca a cada aventura).' },
  { chave: 'ginasio', nome: 'Ginásio',
    efeito: 'Os residentes recebem +1 em Atletismo e nas rolagens de dano com ataques desarmados e armas naturais.' },
  { chave: 'guarita', nome: 'Guarita', seg: 4,
    efeito: 'A base recebe +4 em segurança.' },
  { chave: 'jardim-ornamental', nome: 'Jardim Ornamental',
    efeito: 'Fornece +1 em testes de Enganação.' },
  { chave: 'laboratorio-arcano', nome: 'Laboratório Arcano', prereqComodo: ['gabinete-mistico'],
    efeito: 'No início de cada aventura, cada residente escolhe uma magia arcana; até o fim da aventura, o custo dessa magia diminui em –1 PM.' },
  { chave: 'lavanderia', nome: 'Lavanderia',
    efeito: 'Cada residente escolhe um item de vestuário que modifique uma perícia: +1 nessa perícia (ou +1 cumulativo). Troca a cada aventura.' },
  { chave: 'memorial', nome: 'Memorial',
    efeito: 'Caso um residente morra, o próximo personagem do mesmo jogador recebe +1 em um atributo.' },
  { chave: 'observatorio', nome: 'Observatório',
    efeito: 'Se treinado em Misticismo, pode rolar dois dados e escolher o melhor resultado em um teste de perícia por aventura.' },
  { chave: 'oficina-de-trabalho', nome: 'Oficina de Trabalho',
    efeito: 'Cada residente recebe +1 em um Ofício à escolha (troca a cada aventura).' },
  { chave: 'oratorio', nome: 'Oratório',
    efeito: 'Os residentes recebem +1 em Religião.' },
  { chave: 'patio-de-treinamento', nome: 'Pátio de Treinamento',
    efeito: 'Os residentes recebem +1 nos testes de ataque com uma arma à escolha (troca a cada aventura).' },
  { chave: 'quarto-do-capitao', nome: 'Quarto do Capitão', seg: 2, prereqComodo: ['casa-da-guarda'],
    efeito: 'O bônus de segurança da guarita aumenta em +2 (total +10). O capitão conta como parceiro veterano (atirador, combatente, fortão ou guardião) e pode acompanhar um residente.' },
  { chave: 'sacada', nome: 'Sacada',
    efeito: 'Cada residente recebe +1 em Diplomacia.' },
  { chave: 'sala-de-estar', nome: 'Sala de Estar',
    efeito: 'Pode possuir e receber os benefícios de até três mobílias diferentes.' },
  { chave: 'sala-de-guerra', nome: 'Sala de Guerra',
    efeito: 'Os residentes recebem +1 em Guerra e Iniciativa.' },
  { chave: 'sala-de-jogos', nome: 'Sala de Jogos',
    efeito: 'Os residentes recebem +1 em Jogatina e recuperam 1 PM ao rolar um 1 natural em um teste relevante (a critério do mestre).' },
  { chave: 'sala-de-mapas', nome: 'Sala de Mapas',
    efeito: 'Os residentes recebem +2 em testes de buscas e em testes de perigos complexos de viagem (como Jornada pelos Ermos).' },
  { chave: 'sala-de-perigo', nome: 'Sala de Perigo', prereqComodo: ['sistema-de-seguranca'],
    efeito: 'Os residentes recebem +2 em testes da ação treinamento (T20 p. 277).' },
  { chave: 'sala-do-tesouro', nome: 'Sala do Tesouro',
    efeito: 'Qualquer rolagem de d% para definir tesouros aleatórios recebe um bônus de +5%.' },
  { chave: 'salao-de-baile', nome: 'Salão de Baile',
    efeito: 'Fornece aos residentes +1 em Nobreza.' },
  { chave: 'sauna', nome: 'Sauna', prereqPorte: 'formidavel',
    efeito: '1×/aventura, ao fazer um teste de resistência, cada residente pode rolar dois dados e usar o melhor resultado.' },
  { chave: 'sistema-de-seguranca', nome: 'Sistema de Segurança', seg: 4,
    efeito: 'A base recebe +4 em segurança. Os residentes recebem +2 em testes de resistência contra essas armadilhas.' },
  { chave: 'suite', nome: 'Suíte', prereqPorte: 'basica',
    efeito: 'Até dois residentes (que durmam juntos) recebem +3 PV e descanso confortável. Pode ser construído várias vezes.' },
  { chave: 'tabernaculo', nome: 'Tabernáculo', prereqComodo: ['oratorio'],
    efeito: 'No início de cada aventura, cada residente escolhe uma magia divina; até o fim da aventura, o custo dessa magia diminui em –1 PM.' },
  { chave: 'tablado', nome: 'Tablado',
    efeito: 'Os residentes recebem +1 em Atuação.' },
  { chave: 'vergel', nome: 'Vergel',
    efeito: 'Fornece +1 em Sobrevivência.' },
];

// ── MOBÍLIAS ─────────────────────────────────────────────────────────
// Adquiridas como itens (preço em T$). Cada cômodo pode conter uma mobília.
// Campos: chave, nome, preco, onde (texto), efeito, seg (omitido = 0).
window.BASE_MOBILIAS = [
  { chave: 'armadura-decorativa', nome: 'Armadura Decorativa', preco: 2000, onde: 'Qualquer cômodo',
    efeito: 'Os residentes recebem +1 na Defesa.' },
  { chave: 'armario-de-remedios', nome: 'Armário de Remédios', preco: 2000, onde: 'Enfermaria ou estufa',
    efeito: 'Seus preparados e poções de cura recuperam +1 PV por dado.' },
  { chave: 'banheira', nome: 'Banheira', preco: 300, onde: 'Suíte',
    efeito: 'Afeta só quem dorme nela. 1×/aventura, rola dois dados em um teste de Fortitude e usa o melhor.' },
  { chave: 'bar', nome: 'Bar', preco: 1000, onde: 'Sala de estar, salão de baile ou sala de jogos',
    efeito: 'Fornece +1 PM para os residentes.' },
  { chave: 'bau-reforcado', nome: 'Baú Reforçado', preco: 300, onde: 'Despensa',
    efeito: 'Aumenta o bônus no limite de carga para 3 espaços.' },
  { chave: 'bigorna', nome: 'Bigorna', preco: 500, onde: 'Oficina de trabalho ou forjaria',
    efeito: 'Na oficina: bônus em Ofício passa a +3. Na forjaria: bônus em dano passa a +2.' },
  { chave: 'colchao-de-penas-exoticas', nome: 'Colchão de Penas Exóticas', preco: 500, onde: 'Suíte',
    efeito: 'Aumenta os PV extras da suíte em +3.' },
  { chave: 'colmeia-de-pergaminhos', nome: 'Colmeia de Pergaminhos', preco: 2500, onde: 'Biblioteca ou gabinete místico',
    efeito: 'Conjuradores arcanos aprendem uma magia de qualquer círculo que possam lançar.' },
  { chave: 'criatura-empalhada', nome: 'Criatura Empalhada', preco: 1000, onde: 'Qualquer cômodo (o grupo fornece a carcaça)',
    efeito: 'Bônus em rolagens de dano contra criaturas do mesmo tipo igual ao patamar da criatura empalhada.' },
  { chave: 'engenho-automatizado', nome: 'Engenho Automatizado', preco: 3000, onde: 'Oficina de trabalho',
    efeito: 'Diminui à metade o tempo de fabricação de itens não consumíveis não mágicos na base.' },
  { chave: 'espelho-de-corpo', nome: 'Espelho de Corpo', preco: 2000, onde: 'Chapelaria ou suíte',
    efeito: 'Na chapelaria: +1 item vestido adicional (total de dois). Na suíte: +1 em testes de perícias baseadas em Carisma.' },
  { chave: 'gargula-animada', nome: 'Gárgula Animada', preco: 10000, seg: 2, onde: 'Exterior (não ocupa cômodo)',
    efeito: 'Até uma gárgula por categoria de porte acima de básico; cada uma dá +2 de segurança (cumulativo) e pode acompanhar o grupo como parceiro fortão e guardião veterano.' },
  { chave: 'idolo-dourado', nome: 'Ídolo Dourado', preco: 1200, onde: 'Qualquer cômodo com bônus de perícia',
    efeito: 'Aumenta um dos bônus em perícias fornecidos pelo cômodo em +1.' },
  { chave: 'lareira', nome: 'Lareira', preco: 2500, onde: 'Sala de estar, cozinha ou suíte',
    efeito: 'Fornece +1 na CD de efeitos de fogo e redução de fogo 2.' },
  { chave: 'lustre-de-cristal', nome: 'Lustre de Cristal', preco: 2500, onde: 'Sala de estar ou salão de baile',
    efeito: '1×/aventura, aumenta um efeito de luz em +1 por dado.' },
  { chave: 'mapa-mundi', nome: 'Mapa-Múndi', preco: 1500, onde: 'Sala de guerra ou sala de mapas',
    efeito: 'Aumenta os bônus do cômodo em questão em +1.' },
  { chave: 'mesa-de-reunioes', nome: 'Mesa de Reuniões', preco: 2000, onde: 'Sala de guerra ou sala de estar',
    efeito: 'No início de cada combate, os personagens podem trocar entre si os valores de iniciativa rolados.' },
  { chave: 'obra-de-arte', nome: 'Obra de Arte', preco: 2000, onde: 'Qualquer cômodo',
    efeito: '1×/aventura, cada residente cura PM igual ao seu patamar × a quantidade de obras de arte na base.' },
  { chave: 'planetario', nome: 'Planetário', preco: 1500, onde: 'Observatório',
    efeito: 'Permite usar o bônus do observatório uma vez adicional por aventura.' },
  { chave: 'prataria', nome: 'Prataria', preco: 2000, onde: 'Cozinha',
    efeito: 'Permite preparar uma refeição "para viagem" adicional.' },
  { chave: 'prateleiras-reforcadas', nome: 'Prateleiras Reforçadas', preco: 2000, onde: 'Biblioteca',
    efeito: 'Fornecem uma perícia treinada.' },
  { chave: 'quadro-de-diagramas', nome: 'Quadro de Diagramas', preco: 3000, onde: 'Oficina de trabalho',
    efeito: 'Fabricar itens mundanos na base custa ¼ do preço (em vez de ⅓) e consertar custa ⅛ (em vez de ⅙).' },
  { chave: 'reliquia-abencoada', nome: 'Relíquia Abençoada', preco: 2500, onde: 'Oratório ou sala de estar',
    efeito: 'No oratório: conjuradores divinos ganham uma magia divina de qualquer círculo que possam lançar. Na sala de estar: +1 em resistência para todos os residentes.' },
  { chave: 'retratos', nome: 'Retratos', preco: 1750, onde: 'Cômodo de uso comum',
    efeito: 'Os residentes recebem +5 em testes de perícia para ajudar outros residentes.' },
  { chave: 'roleta-ahleniense', nome: 'Roleta Ahleniense', preco: 2000, onde: 'Sala de jogos',
    efeito: 'Permite rolar novamente um teste de perícia por aventura.' },
];
