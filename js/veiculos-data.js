// ═══════════════════════════════════════════════════════════════════
//  VEICULOS-DATA.JS — Veículos de Tormenta 20 (dados puros)
//  Consumido por:
//    • veiculos.js → sub-aba "🚗 Veículos" (consulta)
//    • viagem.js   → meio de transporte (deslocMetros alimenta o ritmo)
//
//  Cada veículo:
//    chave        — id único
//    nome, preco  — título e custo (T$)
//    tamanho      — categoria de tamanho
//    desloc       — deslocamento como texto ("9 m", "voo 12 m"…)
//    deslocMetros — valor numérico p/ a calculadora de viagem
//    deslocTipo   — 'terrestre' | 'natacao' | 'voo'
//    defesa, pv, rd, tripulacao, capacidade, cobertura, tracao
//    descricao    — texto de sabor
//    regras       — mecânicas especiais do veículo (pode ser '')
// ═══════════════════════════════════════════════════════════════════

window.VEICULOS = [

  { chave: 'balao-goblin', nome: 'Balão Goblin', preco: 'T$ 200',
    tamanho: 'Enorme', desloc: 'voo 12 m', deslocMetros: 12, deslocTipo: 'voo',
    defesa: '5 (+ Des do baloeiro, em movimento)', pv: 100, rd: 0,
    tripulacao: 'Piloto (baloeiro)', capacidade: '8 criaturas Médias ou 160 espaços',
    cobertura: '', tracao: '',
    descricao: 'Feito de imensas bolsas de couro e tecidos remendados, com uma gôndola parecida com um grande cesto — um engenho tecnológico sem igual em Arton.',
    regras: 'Quedas raramente são fatais. Ao perder mais da metade dos PV, começa a perder ar e flutua lentamente até o solo: cada ocupante sofre 4d6 de impacto (Ref CD 15 reduz à metade). Só cai de forma perigosa se chegar a 0 PV — aí os ocupantes sofrem dano de queda normal, conforme a altura. Remendar em pleno voo: ação completa + teste de Ofício (artesão) CD 15 → recupera 1d8 PV.' },

  { chave: 'carroca', nome: 'Carroça', preco: 'T$ 150',
    tamanho: 'Grande', desloc: '9 m', deslocMetros: 9, deslocTipo: 'terrestre',
    defesa: '8 (+ Des do condutor, em movimento)', pv: 50, rd: 0,
    tripulacao: 'Condutor', capacidade: '4 criaturas Médias ou 80 espaços',
    cobertura: '', tracao: '2 cavalos ou 1 trobo',
    descricao: 'Veículo de duas ou quatro rodas, aberto, normalmente usado para transportar cargas pesadas. Inclui os arreios necessários para controlar os animais.',
    regras: '' },

  { chave: 'carruagem', nome: 'Carruagem', preco: 'T$ 500',
    tamanho: 'Grande', desloc: '9 m', deslocMetros: 9, deslocTipo: 'terrestre',
    defesa: '8 (+ Des do condutor, em movimento)', pv: 50, rd: 0,
    tripulacao: 'Até 2 condutores (do lado de fora)', capacidade: '4 passageiros na cabine (ou 80 espaços)',
    cobertura: 'Leve (aos passageiros)', tracao: '2 cavalos ou 1 trobo',
    descricao: 'Veículo de quatro rodas com cabine fechada para até quatro pessoas, mais dois condutores do lado de fora. Mesmas estatísticas de uma carroça.',
    regras: '' },

  { chave: 'canoa', nome: 'Canoa', preco: 'T$ 70',
    tamanho: 'Grande', desloc: 'natação 9 m', deslocMetros: 9, deslocTipo: 'natacao',
    defesa: '8 (+ Des do condutor, em movimento)', pv: 50, rd: 0,
    tripulacao: 'Remador(es)', capacidade: '4 criaturas Médias ou 80 espaços',
    cobertura: '', tracao: '',
    descricao: 'Construída a partir de um único tronco de árvore, é a mais simples das embarcações. Mesmas estatísticas de uma carroça, mas com deslocamento de natação.',
    regras: '' },

  { chave: 'biga-de-guerra', nome: 'Biga de Guerra', preco: 'T$ 250',
    tamanho: 'Grande', desloc: '12 m', deslocMetros: 12, deslocTipo: 'terrestre',
    defesa: '12 (+ Des do piloto, em movimento)', pv: 75, rd: 5,
    tripulacao: 'Piloto (de pé)', capacidade: '2 criaturas Médias ou 40 espaços',
    cobertura: 'Leve', tracao: '2 cavalos rápidos',
    descricao: 'Pequena carroça de duas rodas blindada, leve e ágil. O piloto fica de pé, uma mão nas rédeas e a outra livre para empunhar armas. Usada por algumas nações amazonas.',
    regras: 'Conduzindo uma biga, você pode fazer investidas como se estivesse montado. Além disso, os tripulantes não sofrem penalidade em testes de ataque por usar armas de arremesso em uma biga em movimento.' },

  { chave: 'dirigivel-goblin', nome: 'Dirigível Goblin', preco: 'T$ 1.200',
    tamanho: 'Enorme', desloc: 'voo 12 m', deslocMetros: 12, deslocTipo: 'voo',
    defesa: '5 (+ Des do piloto, em movimento)', pv: 180, rd: 0,
    tripulacao: 'Piloto', capacidade: '16 criaturas Médias ou 320 espaços',
    cobertura: '', tracao: '',
    descricao: 'Versão maior e mais robusta do balão goblin: vários conjuntos de bolsas de ar amarradas a uma gôndola alongada, como o casco de um navio. Fácil de equipar com balestras e até um canhão.',
    regras: 'Segue as mesmas regras de queda e reparo do balão goblin (perde ar a partir da metade dos PV — 4d6 de impacto por ocupante, Ref CD 15 reduz à metade; queda perigosa só a 0 PV; remendo em voo: ação completa + Ofício CD 15 → 1d8 PV).' },

  { chave: 'jangada', nome: 'Jangada', preco: 'T$ 60',
    tamanho: 'Grande', desloc: 'natação 9 m', deslocMetros: 9, deslocTipo: 'natacao',
    defesa: '6 (+ Des do piloto, em movimento)', pv: 50, rd: 5,
    tripulacao: 'Piloto + 1 tripulante', capacidade: '4 criaturas Médias ou 80 espaços',
    cobertura: '', tracao: '',
    descricao: 'Barco típico de pescadores: essencialmente uma plataforma flutuante, com um mastro simples e um leme.',
    regras: '' },

  { chave: 'barcaca', nome: 'Barcaça', preco: 'T$ 3.000',
    tamanho: 'Enorme', desloc: 'natação 6 m', deslocMetros: 6, deslocTipo: 'natacao',
    defesa: '10 (+ Des do piloto, em movimento)', pv: 120, rd: 5,
    tripulacao: 'Piloto + 10 tripulantes', capacidade: '15 criaturas Médias ou 300 espaços',
    cobertura: '', tracao: '',
    descricao: 'Pequeno navio de um único mastro (vela quadrangular) e alguns remos para suplementar a força da vela. Pode navegar em rios e mar aberto.',
    regras: '' },

  { chave: 'veleiro', nome: 'Veleiro', preco: 'T$ 10.000',
    tamanho: 'Colossal', desloc: 'natação 12 m', deslocMetros: 12, deslocTipo: 'natacao',
    defesa: 'Não há defesa.', pv: 220, rd: 5,
    tripulacao: 'Piloto + navegador + capitão + 30 tripulantes', capacidade: '60 criaturas Médias ou 1.200 espaços',
    cobertura: '', tracao: '',
    descricao: 'Navio de três mastros, o típico veículo de viagem, muito popular entre mercadores.',
    regras: '' },

];


// ═══════════════════════════════════════════════════════════════════
//  REGRAS GERAIS DE VEÍCULOS — blocos para a seção de consulta e
//  reaproveitados pelo "cartão de combate em viagem" (viagem.js).
//  chave permite o Painel de Viagem puxar blocos específicos.
// ═══════════════════════════════════════════════════════════════════
window.VEICULOS_REGRAS = [

  { chave: 'caracteristicas', titulo: '📐 Características de veículos',
    texto: `Esta seção explica o que cada característica de um veículo significa.\nTamanho: determina o espaço ocupado e os modificadores de Furtividade e manobras (T20 p. 107). O veículo aplica seu modificador de Furtividade por tamanho nos testes de Pilotagem do piloto.\nDeslocamento: segue as regras normais do seu tipo de deslocamento, exceto que um veículo com deslocamento de natação só se move sobre a água (a menos que a descrição diga que pode submergir).\nDefesa: a dureza dos materiais do veículo. Se o veículo soma um atributo (ou outra característica) do piloto à Defesa, só recebe esse bônus enquanto estiver em movimento.\nPontos de Vida: a resistência dos materiais. A 0 PV ou menos, o veículo para de funcionar; com PV negativos iguais à metade do máximo, é destruído além de qualquer conserto. (Ver "Consertando veículos".)\nTripulação: cada veículo exige tripulantes conforme tamanho e complexidade — Piloto (todo veículo tripulado precisa de ao menos um), Copiloto (faz Pilotagem para ajudar e pode substituir o piloto) e Capitão (navios; executa tarefas do veículo e ajuda a tripulação). Pode haver navegadores, canhoneiros, remadores etc. Tripulação menor que a necessária: piloto sofre –2 em Pilotagem; menor que a metade: –5.\nPassageiros e Carga: quanto o veículo transporta. Em geral, um passageiro Pequeno ou Médio sem sobrecarga equivale a 20 espaços de carga; qualquer sobrecarga do passageiro conta no limite de espaços.\nCobertura: alguns veículos fornecem cobertura (leve ou total) aos ocupantes, conforme a descrição.` },

  { chave: 'pilotagem', titulo: '🎲 Perícia Pilotagem (Des, treinada)',
    texto: `Você sabe operar veículos como carroças, barcos e balões. Ações simples não exigem testes (atrelar trobos e conduzir pela estrada, velejar em águas tranquilas…).\nConduzir em situações ruins (terreno acidentado para veículos terrestres; chuva ou ventania para aquáticos/aéreos) exige uma ação de movimento e um teste de Pilotagem CD 15 por turno ou cena (a critério do mestre). Falha: avança metade do deslocamento. Falha por 5 ou mais: se acidenta. Situações extremas (obstáculos, tempestade…) aumentam a CD para 25.` },

  { chave: 'embarcando', titulo: '⛵ Embarcando',
    texto: `Embarcar num veículo geralmente é uma ação de movimento. Em veículos maiores (como navios), alcançar posições específicas pode demorar mais.` },

  { chave: 'pilotando', titulo: '🛞 Pilotagem em combate',
    texto: `Para conduzir em combate ou situações ruins, gaste uma ação de movimento e faça Pilotagem CD 15 (CD 25 em situações muito ruins). Passou: avança seu deslocamento. Falhou: avança metade. Falhou por 5+: sofre um contratempo — perda de vida (2d6 para veículos Médios ou menores, +2d6 por categoria de tamanho acima), uma colisão, ou uma parte desabilitada (roda, animal de tração).\nPilotagem Cuidadosa: no início da rodada você pode pilotar com cuidado — o deslocamento cai pela metade e você recebe +2 em Pilotagem nessa rodada.` },

  { chave: 'colisoes', titulo: '💥 Colisões',
    texto: `Um veículo em movimento pode colidir com paredes, árvores, outros veículos… O veículo e seus ocupantes sofrem 1d6 de impacto para cada 3 m de deslocamento do veículo (mínimo 1d6). Ocupantes podem fazer Reflexos (CD 20 + total de dados de dano) para reduzir à metade.\nObstáculos minúsculos ou frágeis podem não causar dano; obstáculos muito grandes (2+ categorias acima) podem, além do dano, forçar o veículo a parar ou capotar.` },

  { chave: 'atropelamento', titulo: '🐎 Atropelamento',
    texto: `Ação completa. Faça Pilotagem como normal; se passar, o veículo percorre até o dobro do deslocamento (mínimo 6 m) em linha reta, podendo passar pelo espaço de criaturas menores. Atropeladas sofrem 1d6 de impacto por 1,5 m de deslocamento e ficam caídas (Ref CD = resultado da Pilotagem reduz à metade e evita cair).\nContra criatura de tamanho igual ou maior, em vez de atropelar o veículo colide (ver Colisões). Veículos Enormes usam d8; Colossais, d12.` },

  { chave: 'atacar', titulo: '🏹 Atacar em um veículo',
    texto: `O balanço de um veículo em movimento dá –2 em ataques à distância e conta como condição ruim para lançar magias. Poderes específicos de combate em veículo (como Pernas do Mar) podem anular essas penalidades.` },

  { chave: 'rodas', titulo: '⚙ Quebrando rodas / partes',
    texto: `É possível quebrar ou sabotar rodas, remos ou velas (Ladinagem). Uma parte desabilitada: piloto sofre –2 em Pilotagem. Mais da metade das partes desabilitadas: –5 em Pilotagem e o deslocamento do veículo cai pela metade.` },

  { chave: 'tracao', titulo: '🐂 Animais de tração',
    texto: `Veículos puxados por criaturas indicam quantas são necessárias. Menos criaturas que o indicado: piloto sofre –2 em Pilotagem. Menos que a metade: –5 em Pilotagem e o deslocamento cai pela metade.\n(Arreios namalkahnianos aumentam o deslocamento de um veículo de tração animal em +3 m.)` },

  { chave: 'aeronaves', titulo: '🎈 Aeronaves',
    texto: `Alguns voadores (como balões) ficam parados no ar sem perder sustentação. Outros precisam percorrer ao menos metade do deslocamento por rodada para se manter voando — senão começam a cair (regra geral: queda livre percorre 150 m por rodada; o mestre define em quantas rodadas chega ao solo). Uma aeronave a 0 PV ou menos também cai. Em ambos os casos, o piloto pode amortecer a queda com Pilotagem (ver Acrobacia).` },

  { chave: 'conserto', titulo: '🔧 Consertando veículos',
    texto: `1 hora de trabalho + Ofício (artesão ou apropriado) CD 15: recupera 1d8 PV, +1d8 para cada 5 pontos acima da CD. Cada d8 exige T$ 10 em materiais. Várias pessoas podem reparar ao mesmo tempo (sobretudo veículos Grandes ou maiores). PV de veículos também podem ser recuperados por efeitos que curam construtos (como Transmutar Objetos).\nUm veículo a 0 PV para de funcionar; com PV negativos iguais à metade do máximo, é destruído além de conserto.` },

];
