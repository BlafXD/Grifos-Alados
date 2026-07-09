// ═══════════════════════════════════════════════════════════════════
//  MONSTROS.JS — Bestiário do Mestre
//  Construtor de fichas de criatura (statblock de Tormenta 20).
//  Localização: /grifos-alados/js/monstros.js
//
//  Hierarquia:  Sessão  →  Cena  →  Criatura
//  Tudo é adicionável, removível e editável. Salvo no localStorage
//  do navegador — sobrevive a F5 e ao fechar a aba.
// ═══════════════════════════════════════════════════════════════════

(function () {
  'use strict';

  const STORAGE_KEY = 'grifosAlados.monstros';

  // Atributos especiais — cada um tem um valor "Padrão" e um "Atual".
  //   rolavel:true → ganha botões de dado (rola 1d20 + valor).
  //   grande:true  → caixa de largura dobrada na grade.
  const STATS = [
    { chave: 'defesa',       rotulo: 'Defesa' },
    { chave: 'fortitude',    rotulo: 'Fortitude',  rolavel: true },
    { chave: 'reflexos',     rotulo: 'Reflexos',   rolavel: true },
    { chave: 'vontade',      rotulo: 'Vontade',    rolavel: true },
    { chave: 'iniciativa',   rotulo: 'Iniciativa', rolavel: true },
    { chave: 'percepcao',    rotulo: 'Percepção',  rolavel: true },
    { chave: 'deslocamento', rotulo: 'Deslocamento' },
    { chave: 'desEscalada',  rotulo: 'Escalada' },
    { chave: 'desEscavacao', rotulo: 'Escavação' },
    { chave: 'desNatacao',   rotulo: 'Natação' },
    { chave: 'desVoo',       rotulo: 'Voo' },
    { chave: 'pv',           rotulo: 'Pontos de Vida', grande: true },
    { chave: 'pm',           rotulo: 'Pontos de Mana', grande: true },
  ];

  // Caixas de texto livre (uma caixa só, para CTRL+C / CTRL+V).
  const CAIXAS = [
    { chave: 'condicoes',   rotulo: 'Condições especiais',
      dica: 'Ex: imunidade a dano de luz, redução de dano 10, resistência a magia +3…', linhas: 3 },
    { chave: 'atributos',   rotulo: 'Atributos',
      dica: 'Ex: For 11, Des 1, Con 8, Int 4, Sab 4, Car 4', linhas: 2 },
    { chave: 'pericias',    rotulo: 'Perícias',
      dica: 'Ex: Atletismo +32, Intimidação +15, Misticismo +15', linhas: 2 },
    { chave: 'equipamento', rotulo: 'Equipamento',
      dica: 'Ex: Espada longa, essência de mana', linhas: 2 },
    { chave: 'recompensas', rotulo: 'Recompensas',
      dica: 'Ex: Tesouro… / Perícias para extração…', linhas: 3 },
    { chave: 'descricao',   rotulo: 'Descrição',
      dica: 'Texto de descrição/lore da criatura…', linhas: 4 },
  ];

  // ── ARMAS NATURAIS & DANO POR TAMANHO (Ameaças de Arton) ─────────
  // Tabela 2-1: tipo de dano padrão de cada arma natural. Alimenta o
  // painel "🦴 Armas naturais & desarmado" da ficha, que monta o ataque
  // já com o dado certo conforme o tamanho da criatura.
  const ARMAS_NATURAIS = [
    { nome: 'Garra',     tipo: 'corte' },
    { nome: 'Mordida',   tipo: 'perfuração' },
    { nome: 'Chifres',   tipo: 'perfuração' },
    { nome: 'Presas',    tipo: 'perfuração' },
    { nome: 'Ferrão',    tipo: 'perfuração' },
    { nome: 'Pinça',     tipo: 'corte' },
    { nome: 'Cascos',    tipo: 'impacto' },
    { nome: 'Cauda',     tipo: 'impacto' },
    { nome: 'Marrada',   tipo: 'impacto' },
    { nome: 'Pancada',   tipo: 'impacto' },
    { nome: 'Tromba',    tipo: 'impacto' },
    { nome: 'Tentáculo', tipo: 'impacto' },
  ];
  // Tamanhos de T20, do menor ao maior.
  const TAMANHOS = ['Minúsculo', 'Pequeno', 'Médio', 'Grande', 'Enorme', 'Colossal'];
  // Dado de dano por tamanho. Arma natural: base 1d6 (Peq/Méd); desarmado:
  // base 1d3 (Peq/Méd). Em ambos: Minúsculo −1 passo, Grande/Enorme +1,
  // Colossal +2 (passos: 1d2·1d3·1d4·1d6·1d8·1d10). Confere com o exemplo
  // oficial: criatura Grande → ataque desarmado 1d4.
  const DADO_ARMA_NATURAL = { 'Minúsculo': '1d4', 'Pequeno': '1d6', 'Médio': '1d6', 'Grande': '1d8', 'Enorme': '1d8', 'Colossal': '1d10' };
  const DADO_DESARMADO    = { 'Minúsculo': '1d2', 'Pequeno': '1d3', 'Médio': '1d3', 'Grande': '1d4', 'Enorme': '1d4', 'Colossal': '1d6' };

  // ── CONDIÇÕES (status que a criatura pode sofrer em combate) ─────
  // Cada categoria tem um rótulo em TEXTO (mostrado em todo chip) e uma
  // cor — a cor é só reforço, quem manda é o texto da categoria.
  const COND_CATEGORIAS = {
    medo:        { rotulo: 'Medo',        cor: '#b3261e' },
    movimento:   { rotulo: 'Movimento',   cor: '#2f6f9e' },
    mental:      { rotulo: 'Mental',      cor: '#7a3fa6' },
    sentidos:    { rotulo: 'Sentidos',    cor: '#1f7a6b' },
    metabolismo: { rotulo: 'Metabolismo', cor: '#3f7a3f' },
    veneno:      { rotulo: 'Veneno',      cor: '#6a7a1f' },
    cansaco:     { rotulo: 'Cansaço',     cor: '#9a6a1a' },
    metamorfose: { rotulo: 'Metamorfose', cor: '#4a5a6a' },
    geral:       { rotulo: 'Geral',       cor: '#6e6256' },
    item:        { rotulo: 'Item',        cor: '#566573' },
  };

  const CONDICOES = [
    { chave:'abalado',       nome:'Abalado',       cat:'medo',
      desc:'Efeito de medo. O personagem sofre –2 em testes de perícia. Se ficar abalado novamente, em vez disso fica apavorado.' },
    { chave:'agarrado',      nome:'Agarrado',      cat:'movimento',
      desc:'Efeito de movimento. O personagem fica desprevenido e imóvel. Sofre –2 em testes de ataque. Só pode atacar com armas leves. Ataques à distância contra um alvo agarrado têm 50% de chance de acertar o alvo errado.' },
    { chave:'alquebrado',    nome:'Alquebrado',    cat:'mental',
      desc:'Efeito mental. O custo em pontos de mana das habilidades e magias do personagem aumenta em +1.' },
    { chave:'apavorado',     nome:'Apavorado',     cat:'medo',
      desc:'Efeito de medo. O personagem sofre –5 em testes de perícia e não pode se aproximar voluntariamente da fonte do medo.' },
    { chave:'atordoado',     nome:'Atordoado',     cat:'mental',
      desc:'Efeito mental. O personagem fica desprevenido e não pode fazer ações.' },
    { chave:'caido',         nome:'Caído',         cat:'geral',
      desc:'O personagem sofre –5 em ataques corpo a corpo. O deslocamento é reduzido a 1,5m. Sofre –5 na Defesa contra ataques corpo a corpo e +5 na Defesa contra ataques à distância (cumulativo com outras condições).' },
    { chave:'cego',          nome:'Cego',          cat:'sentidos',
      desc:'Efeito nos sentidos. O personagem fica desprevenido e lento. Não pode fazer testes de Percepção para observar. Sofre –5 em perícias baseadas em Força ou Destreza. Todos os alvos de seus ataques recebem camuflagem total. Conta como cego em escuridão total, a menos que perceba no escuro.' },
    { chave:'confuso',       nome:'Confuso',       cat:'mental',
      desc:'Efeito mental. Comporta-se de modo aleatório. Role 1d6 no início dos turnos — 1: move-se numa direção (1d8); 2-3: não age, balbucia; 4-5: ataca a criatura mais próxima (ou a si mesmo); 6: a condição termina.' },
    { chave:'debilitado',    nome:'Debilitado',    cat:'geral',
      desc:'O personagem sofre –5 em testes de Força, Destreza e Constituição e de perícias baseadas nesses atributos. Se ficar debilitado novamente, em vez disso fica inconsciente.' },
    { chave:'desprevenido',  nome:'Desprevenido',  cat:'geral',
      desc:'O personagem sofre –5 na Defesa e em Reflexos. Fica desprevenido contra inimigos que não possa perceber.' },
    { chave:'doente',        nome:'Doente',        cat:'metabolismo',
      desc:'Efeito de metabolismo. Repete o teste de Fortitude no início de cada dia: falhando, sofre o efeito da doença naquele dia; passando dois dias seguidos, está curado. Doenças podem ter efeitos progressivos. Contaminação não é cumulativa.' },
    { chave:'emChamas',      nome:'Em Chamas',     cat:'geral',
      desc:'No início dos turnos, o personagem sofre 1d6 pontos de dano de fogo. Pode gastar uma ação padrão para apagar o fogo com as mãos; imersão em água também apaga.' },
    { chave:'enfeiticado',   nome:'Enfeitiçado',   cat:'mental',
      desc:'Efeito mental. Torna-se prestativo com a fonte. Não fica sob controle, mas percebe as palavras e ações dela da maneira mais favorável possível. A fonte recebe +10 em testes de Diplomacia com o personagem.' },
    { chave:'enjoado',       nome:'Enjoado',       cat:'metabolismo',
      desc:'Efeito de metabolismo. Só pode realizar uma ação padrão OU de movimento (não ambas) por rodada. Pode gastar uma ação padrão para investir, mas avança no máximo seu deslocamento (não o dobro).' },
    { chave:'enredado',      nome:'Enredado',      cat:'movimento',
      desc:'Efeito de movimento. O personagem fica lento e vulnerável. Sofre –2 em testes de ataque.' },
    { chave:'envenenado',    nome:'Envenenado',    cat:'veneno',
      desc:'Efeito de veneno. O efeito varia de acordo com o veneno. Perda de vida recorrente por venenos é cumulativa.' },
    { chave:'esmorecido',    nome:'Esmorecido',    cat:'mental',
      desc:'Efeito mental. O personagem sofre –5 em testes de Inteligência, Sabedoria e Carisma e de perícias baseadas nesses atributos.' },
    { chave:'exausto',       nome:'Exausto',       cat:'cansaco',
      desc:'Efeito de cansaço. O personagem fica debilitado, lento e vulnerável. Se ficar exausto novamente, em vez disso fica inconsciente.' },
    { chave:'fascinado',     nome:'Fascinado',     cat:'mental',
      desc:'Efeito mental. Sofre –5 em Percepção. Não pode agir, exceto observar aquilo que o fascinou. Anulada por ações hostis ou se o que o fascinou sair de vista. Tirá-lo desse estado gasta uma ação padrão.' },
    { chave:'fatigado',      nome:'Fatigado',      cat:'cansaco',
      desc:'Efeito de cansaço. O personagem fica fraco e vulnerável. Se ficar fatigado novamente, em vez disso fica exausto.' },
    { chave:'fraco',         nome:'Fraco',         cat:'geral',
      desc:'O personagem sofre –2 em testes de Força, Destreza e Constituição e de perícias baseadas nesses atributos. Se ficar fraco novamente, em vez disso fica debilitado.' },
    { chave:'frustrado',     nome:'Frustrado',     cat:'mental',
      desc:'Efeito mental. Sofre –2 em testes de Inteligência, Sabedoria e Carisma e de perícias baseadas nesses atributos. Se ficar frustrado novamente, em vez disso fica esmorecido.' },
    { chave:'imovel',        nome:'Imóvel',        cat:'movimento',
      desc:'Efeito de movimento. Todas as formas de deslocamento do personagem são reduzidas a 0m.' },
    { chave:'inconsciente',  nome:'Inconsciente',  cat:'geral',
      desc:'O personagem fica indefeso e não pode fazer ações (incluindo reações), mas ainda pode fazer testes naturais do estado, como Constituição para estabilizar sangramento. Acordá-lo gasta uma ação padrão.' },
    { chave:'indefeso',      nome:'Indefeso',      cat:'geral',
      desc:'O personagem fica desprevenido, mas sofre –10 na Defesa. Falha automaticamente em testes de Reflexos. Pode sofrer golpes de misericórdia.' },
    { chave:'lento',         nome:'Lento',         cat:'movimento',
      desc:'Efeito de movimento. Todas as formas de deslocamento são reduzidas à metade (arredonde para baixo ao primeiro incremento de 1,5m). Não pode correr ou fazer investidas.' },
    { chave:'ofuscado',      nome:'Ofuscado',      cat:'sentidos',
      desc:'Efeito nos sentidos. O personagem sofre –2 em testes de ataque e de Percepção.' },
    { chave:'paralisado',    nome:'Paralisado',    cat:'movimento',
      desc:'Efeito de movimento. O personagem fica imóvel e indefeso. Só pode realizar ações puramente mentais.' },
    { chave:'pasmo',         nome:'Pasmo',         cat:'mental',
      desc:'Efeito mental. O personagem não pode fazer ações.' },
    { chave:'petrificado',   nome:'Petrificado',   cat:'metamorfose',
      desc:'Efeito de metamorfose. O personagem fica inconsciente e recebe redução de dano 8.' },
    { chave:'sangrando',     nome:'Sangrando',     cat:'metabolismo',
      desc:'Efeito de metabolismo. No início do turno, faz um teste de Constituição (CD 15): falhando, perde 1d6 pontos de vida e continua sangrando; passando, remove a condição.' },
    { chave:'sobrecarregado',nome:'Sobrecarregado',cat:'movimento',
      desc:'Efeito de movimento. O personagem sofre penalidade de armadura –5. O deslocamento é reduzido em –3m.' },
    { chave:'surdo',         nome:'Surdo',         cat:'sentidos',
      desc:'Efeito nos sentidos. Não pode fazer testes de Percepção para ouvir. Sofre –5 em testes de Iniciativa. É considerado em condição ruim para lançar magias.' },
    { chave:'surpreendido',  nome:'Surpreendido',  cat:'geral',
      desc:'O personagem fica desprevenido e não pode fazer ações.' },
    { chave:'vulneravel',    nome:'Vulnerável',    cat:'geral',
      desc:'O personagem sofre –2 na Defesa.' },
    // ── Condições de ITENS (marcadores; a penalidade fica lembrada no chip) ──
    { chave:'avariado',  nome:'Avariado',  cat:'item',
      desc:'Item avariado: avarias comprometem seu uso. Arma ou ferramenta — –5 nos testes em que é empregada; armadura ou escudo — –5 na Defesa. Cumulativo com outros efeitos. Avariar de novo um item já avariado o destrói. (Marcador: aplique o –5 ao usar o item afetado.)' },
    { chave:'destruido', nome:'Destruído', cat:'item',
      desc:'Item destruído: não pode ser usado e não concede nenhum benefício. Ocorre ao perder todos os PV do item ou por um efeito que imponha a condição. Reparar custa e demora como recriar o item (Tormenta20 p. 121); efeitos que consertam itens também removem a condição.' },
  ];
  const COND_POR_CHAVE = {};
  CONDICOES.forEach(c => { COND_POR_CHAVE[c.chave] = c; });

  // ── TIPOS DE CRIATURA (cada criatura tem UM) ─────────────────────
  const TIPOS_CRIATURA = [
    { chave:'animais', nome:'Animais',
      desc:'Seres vivos sem inteligência suficiente para um idioma (Int –5 ou –4) e sem habilidades sobrenaturais. Um animal inteligente ou com poderes mágicos é considerado um monstro. Muitos têm habilidades naturais como venenos, apêndices adaptados (tentáculos, ferrões, chifres) ou órgãos especializados.' },
    { chave:'construtos', nome:'Construtos',
      desc:'Objetos animados ou criaturas fabricadas por magia ou ciência; normalmente sem inteligência real, programados para certas tarefas. Possuem: visão no escuro; imunidade a cansaço, efeitos de metabolismo e veneno; não recuperam PV por descanso e cura não funciona (mas Ofício/artesão pode ser usada no lugar, com os mesmos efeitos).' },
    { chave:'espiritos', nome:'Espíritos',
      desc:'Seres nativos de outros Planos, com profunda conexão com as energias primais da Criação (elementos; Bem, Mal, Ordem e Caos; aspectos dos deuses). Geralmente possuem visão no escuro, mas isso não é uma característica inerente do tipo.' },
    { chave:'humanoides', nome:'Humanoides',
      desc:'Raças com a mesma anatomia básica dos humanos (cabeça, tronco, dois braços, duas pernas). Todos são inteligentes, com culturas e sociedades próprias. Todo humanoide possui uma raça (humano, anão etc.) ou subtipo (gigante etc.).' },
    { chave:'monstros', nome:'Monstros',
      desc:'Criaturas de anatomia estranha ou com habilidades mágicas — de majestosos dragões a aberrantes lefeu. Muitos têm origem ligada à Tormenta; outros, como dragões e entes, são criações dos deuses.' },
    { chave:'mortosVivos', nome:'Mortos-Vivos',
      desc:'Cadáveres animados por energia negativa. A maioria perde a capacidade de pensar; alguns ficam insanos; poucos conservam a inteligência que tinham em vida. Possuem: visão no escuro; imunidade a cansaço, efeitos de metabolismo, trevas e veneno; sofrem dano de efeitos mágicos de cura de luz (Vontade CD do efeito reduz à metade) e recuperam PV com dano de trevas.' },
  ];
  const TIPO_POR_CHAVE = {};
  TIPOS_CRIATURA.forEach(t => { TIPO_POR_CHAVE[t.chave] = t; });

  // ── HABILIDADES GERAIS (comuns a várias ameaças) ─────────────────
  const HABILIDADES_GERAIS = [
    { chave:'agarrarAprimorado', nome:'Agarrar Aprimorado',
      desc:'Se acertar um ataque com a arma natural especificada, pode fazer a manobra agarrar com ela como ação livre. Enquanto agarra com a arma natural, não pode usá-la para outros ataques. A habilidade pode limitar tipo/tamanho do alvo e ter efeitos adicionais.' },
    { chave:'ataqueFurtivo', nome:'Ataque Furtivo',
      desc:'Desfere ataques furtivos como um ladino. Uma vez por rodada, causa o dano adicional indicado com ataques corpo a corpo (ou à distância em alcance curto) contra alvos desprevenidos ou que esteja flanqueando.' },
    { chave:'bando', nome:'Bando',
      desc:'É um grupo de indivíduos. Se um ataque do bando exceder a Defesa em 10 ou mais, causa o dobro do dano; se errar, ainda causa metade. Imune a manobras e a efeitos que afetam só uma criatura sem causar dano; vulnerável a dano de área. Trespassar permite um ataque adicional contra ele (uma vez por turno).' },
    { chave:'curaAcelerada', nome:'Cura Acelerada',
      desc:'No início do turno, recupera PV iguais ao seu valor de cura acelerada (ex.: cura acelerada 5 = 5 PV). Dano listado após uma barra não é curado (ex.: cura acelerada 10/ácido não recupera dano de ácido). Cura dano, não perda de PV.' },
    { chave:'derrubar', nome:'Derrubar',
      desc:'Se acertar um ataque com a arma especificada, pode fazer a manobra derrubar com ela como ação livre. A habilidade pode limitar tipo/tamanho do alvo e ter efeitos adicionais.' },
    { chave:'doenca', nome:'Doença',
      desc:'Um dos ataques transmite uma doença. Quem sofrer dano do ataque deve passar em Fortitude ou é contaminado. Uma vez contraída, não há efeitos adicionais por ser atingido de novo. (Doenças: T20 p. 318.)' },
    { chave:'engolir', nome:'Engolir',
      desc:'Se começar o turno agarrando uma criatura ao menos uma categoria de tamanho menor, pode fazer um teste de agarrar; vencendo, engole-a. A engolida fica agarrada, cega, com cobertura total contra/para fora e sofre o dano indicado por turno. Escapa vencendo agarrar/Acrobacia ou causando o dano indicado (a ameaça regurgita todos os engolidos, caídos à frente). Em geral só mantém uma criatura engolida por vez.' },
    { chave:'enxame', nome:'Enxame',
      desc:'Aglomerado de seres menores. Pode entrar no espaço de um personagem e, no fim do turno, causa automaticamente o efeito indicado a quem estiver nele. Imune a manobras e a efeitos que afetam só uma criatura sem causar dano; vulnerável a dano de área; sofre apenas metade do dano de armas. Estar dentro dele conta como condição ruim para lançar magias.' },
    { chave:'evasao', nome:'Evasão',
      desc:'Quando sofre um efeito que permite Reflexos para reduzir o dano à metade, não sofre dano algum se passar (dano normal se falhar). Exige liberdade de movimentos — não funciona com armadura pesada ou se estiver imóvel.' },
    { chave:'evasaoAprimorada', nome:'Evasão Aprimorada',
      desc:'Como Evasão, mas, se falhar no teste de Reflexos, sofre apenas metade do dano.' },
    { chave:'familiar', nome:'Familiar',
      desc:'Pode ser invocada como um familiar. (Veja o poder Familiar, T20 p. 38, e o Apêndice A em Ameaças de Arton.)' },
    { chave:'fortificacao', nome:'Fortificação',
      desc:'Tem uma chance (em %) de ignorar o dano adicional de acertos críticos e ataques furtivos. Role 1d100 ao sofrer um; se o resultado for igual ou menor que o valor de fortificação, ignora o dano adicional, como se fosse imune a esse efeito.' },
    { chave:'imunidade', nome:'Imunidade',
      desc:'Imune a um tipo de efeito ou elemento (dano, condição ou habilidade). Não sofre consequência direta, mas ainda pode ser afetada indiretamente. Imunidade a acertos críticos e/ou ataques furtivos os transforma em acertos normais.' },
    { chave:'incorporeo', nome:'Incorpóreo',
      desc:'Não tem corpo físico. Só pode ser afetada por armas e efeitos mágicos ou por criaturas incorpóreas. Atravessa objetos sólidos (mas não os manipula) e tem Força nula.' },
    { chave:'magias', nome:'Magias',
      desc:'Lança magias — a descrição indica nível, classe de conjurador, CD para resistir e limite de PM (sem limite, use o ND). Segue as regras de magia e as da classe. Considere que tem todos os componentes materiais. A lista apresentada é a forma usual de lançá-las; pode lançá-las em outras versões dentro de seu nível de conjurador.' },
    { chave:'maiorQueAMorte', nome:'Maior que a morte',
      desc:'Enquanto tiver ao menos metade dos PV, é imune a habilidades de "morte instantânea" (efeitos que zeram PV instantaneamente, que aprisionam/destroem alma ou corpo etc.). O mestre tem a palavra final sobre o que é morte instantânea. Ainda pode ser reduzida a 0 PV por dano ou perda de vida.' },
    { chave:'naturezaVegetal', nome:'Natureza Vegetal',
      desc:'Vegetal senciente ou com traços vegetais. Imune a atordoamento e metamorfose, mas afetada por efeitos que atingem plantas monstruosas. Em magias sem teste de resistência, tem direito a um teste de Fortitude (CD da magia) para evitar o efeito.' },
    { chave:'parceiro', nome:'Parceiro',
      desc:'Pode ser empregada como um parceiro. (Veja o Apêndice A em Ameaças de Arton.)' },
    { chave:'reducaoDeDano', nome:'Redução de Dano (RD)',
      desc:'Ignora parte do dano que sofre (ex.: RD 5 sofrendo 8 = perde 3 PV). Pode ser contra um ou mais tipos específicos (RD de fogo 10). Tipo listado após uma barra NÃO é reduzido (RD 10/mágico não reduz dano de armas e habilidades mágicas).' },
    { chave:'resistenciaA', nome:'Resistência a…',
      desc:'Recebe um bônus em testes de resistência contra o tipo de efeito especificado (ex.: resistência a magia +2 dá +2 em Fortitude, Reflexos e Vontade contra efeitos mágicos).' },
    { chave:'vulnerabilidadeA', nome:'Vulnerabilidade a…',
      desc:'Sofre +50% de dano ou de perda de vida (conforme apropriado) de um tipo ou característica específicos (ex.: vulnerabilidade a frio: 15 de dano de frio viram 22).' },
  ];
  const HAB_POR_CHAVE = {};
  HABILIDADES_GERAIS.forEach(h => { HAB_POR_CHAVE[h.chave] = h; });

  // ── SENTIDOS (habilidades de percepção — lista própria) ──────────
  const SENTIDOS = [
    { chave:'faro', nome:'Faro',
      desc:'Olfato apurado. Contra inimigos que não possa ver, não fica desprevenida, e camuflagem total lhe causa apenas 20% de chance de falha em alcance curto.' },
    { chave:'percepcaoAsCegas', nome:'Percepção às Cegas',
      desc:'Usa sentidos diferentes da visão (radar, sonar, sensibilidade a vibrações). Efeitos ligados à visão, como escuridão e invisibilidade, não a afetam. Faz testes de Percepção para observar com esses sentidos. Alcance curto, salvo indicação.' },
    { chave:'sensibilidadeALuz', nome:'Sensibilidade a Luz',
      desc:'Suscetível a luz. Quando exposta à luz do sol ou similar, fica ofuscada.' },
    { chave:'visaoNaPenumbra', nome:'Visão na Penumbra',
      desc:'Enxerga em escuridão leve em alcance curto (exceto mágica). Ignora camuflagem leve causada por esse tipo de escuridão (T20 p. 238).' },
    { chave:'visaoNoEscuro', nome:'Visão no Escuro',
      desc:'Enxerga em escuridão total em alcance curto (exceto mágica). Ignora camuflagem total causada por esse tipo de escuridão (T20 p. 238).' },
  ];
  const SENTIDO_POR_CHAVE = {};
  SENTIDOS.forEach(s => { SENTIDO_POR_CHAVE[s.chave] = s; });

  let dados = { sessoes: [] };
  let indiceAberto = false;   // painel "🗺 Índice" de cenas aberto? (efêmero)

  // ── PERSISTÊNCIA ─────────────────────────────────────────────────
  function carregar() {
    try {
      const txt = localStorage.getItem(STORAGE_KEY);
      if (txt) dados = JSON.parse(txt);
    } catch (e) {
      console.warn('[monstros] Não foi possível carregar:', e.message);
    }
    if (!dados || typeof dados !== 'object') dados = {};
    if (!Array.isArray(dados.sessoes)) dados.sessoes = [];
    if (!Array.isArray(dados.log))     dados.log = [];

    // modo de visão: lista (padrão) ou painel com quantas fichas quiser
    if (typeof dados.modoPainel !== 'boolean') dados.modoPainel = false;
    if (!Array.isArray(dados.painel)) dados.painel = [null, null, null];
    dados.painel = dados.painel.map(id => id || null);

    // PALCO AO VIVO do painel: lista de ambientes própria (independente
    // das cenas) e qual sessão está sendo narrada (id ou null = todas).
    if (!Array.isArray(dados.painelAmbientes)) dados.painelAmbientes = [];
    dados.painelAmbientes = normalizarAmbientes(dados.painelAmbientes);
    if (typeof dados.cenaNarrada !== 'string') dados.cenaNarrada = null;
    if (dados.sessaoNarrada !== undefined) delete dados.sessaoNarrada;   // campo antigo (era por sessão)
    if (typeof dados.combateViagem !== 'boolean') dados.combateViagem = false;
    if (typeof dados.combateViagemId !== 'string') dados.combateViagemId = null;   // viagem ligada ao combate

    // garante que toda criatura salva tenha os campos do modelo atual
    // (criaturas antigas não tinham os deslocamentos Escalada/Voo/etc.)
    dados.sessoes.forEach(s => {
      if (!Array.isArray(s.cenas)) s.cenas = [];
      if (typeof s.notas !== 'string') s.notas = '';
      // notasHtml = versão RICA (com grifo) das anotações; notas continua
      // sendo o espelho em texto puro (usado no export .txt). Migração
      // idempotente: nota antiga (só texto) vira HTML escapado uma vez.
      if (typeof s.notasHtml !== 'string') s.notasHtml = esc(s.notas || '');
      s.cenas.forEach(c => {
        if (!Array.isArray(c.criaturas)) c.criaturas = [];
        if (typeof c.notas !== 'string') c.notas = '';
        if (typeof c.notasHtml !== 'string') c.notasHtml = esc(c.notas || '');
        c.criaturas.forEach(normalizarCriatura);
        if (!Array.isArray(c.perigos)) c.perigos = [];
        c.perigos.forEach(normalizarPerigo);
        c.ambientes = normalizarAmbientes(c.ambientes);
      });
    });
  }

  const MAX_LOG = 15;   // nº máximo de rolagens guardadas no log

  let _saveTimer = null;
  function _gravar() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dados));
    } catch (e) {
      console.warn('[monstros] Não foi possível salvar:', e.message);
    }
  }
  // gravação adiada — evita escrever no disco a cada tecla digitada
  function salvar() {
    clearTimeout(_saveTimer);
    _saveTimer = setTimeout(_gravar, 250);
  }
  // gravação imediata — usada ao sair/fechar a página
  function salvarAgora() {
    clearTimeout(_saveTimer);
    _gravar();
  }

  // ── AUXILIARES ───────────────────────────────────────────────────
  function uid(p) {
    return p + '_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }
  const esc = window.GA_esc;

  // ── ESTILOS DE GRIFO ─────────────────────────────────────────────
  // Cores de destaque + a "caixa de leitura" (boxed). 'mz-azul' é mantido
  // para compatibilidade com notas/ataques já grifados. Cada um envolve a
  // seleção num <span class="…">; "Remover" desembrulha qualquer um deles.
  const GRIFOS = [
    { cls: 'mz-azul',     cor: '#bcdcee', nome: 'Azul — lore / falas' },
    { cls: 'mz-amarelo',  cor: '#f3e3a3', nome: 'Amarelo — ler em voz alta' },
    { cls: 'mz-vermelho', cor: '#f0c3bb', nome: 'Vermelho — segredo / perigo (só mestre)' },
    { cls: 'mz-verde',    cor: '#c4e3bd', nome: 'Verde — revelar aos jogadores' },
  ];
  // todas as classes que "Remover grifo" deve desembrulhar
  const GRIFO_SELETOR = GRIFOS.map(g => '.' + g.cls).join(', ') + ', .mz-leitura';

  // ── FÁBRICAS DE DADOS ────────────────────────────────────────────
  function novaCriatura() {
    const stats = {};
    STATS.forEach(s => { stats[s.chave] = { padrao: '', atual: '' }; });
    return {
      id: uid('cr'), aberto: true,
      nome: '', tipoTamanho: '', tags: '',
      nd: '', descricao: '',
      iniciativaCombate: '',
      papel: 'lacaio', statusMorte: null,
      critTipo: 'corte', critMult: 'x2', critLocal: '', ultimoCritico: null,
      condicoesAtivas: [],
      tipoCriatura: '', habilidades: [], sentidos: [],
      devoto: '',
      stats: stats,
      montaria: { chave: '', nivel: 'iniciante' },
      condicoes: '', ataques: '', atributos: '', pericias: '', equipamento: '', recompensas: '',
    };
  }
  function novaCena(n)   { return { id: uid('c'), aberto: true, nome: 'Cena ' + n, notas: '', notasHtml: '', criaturas: [], perigos: [], ambientes: [] }; }
  function novaSessao(n) { return { id: uid('s'), aberto: true, nome: 'Sessão ' + n, notas: '', notasHtml: '', cenas: [] }; }

  // Perigo complexo — montado a partir de uma entrada da biblioteca
  // (window.PERIGOS_COMPLEXOS) ou em branco. Os campos efeito/acoes são
  // HTML (caixas de texto rico, com grifo); os demais são texto simples.
  function novoPerigo(def) {
    return {
      id: uid('pg'), aberto: true, painelAberto: true,
      nome:      def ? (def.nome || '')      : '',
      nd:        def ? (def.nd || '')        : '',
      fonte:     def ? (def.fonte || '')     : '',
      objetivo:  def ? (def.objetivo || '')  : '',
      efeito:    def ? _txtParaHtml(def.efeito || '') : '',
      acoes:     def ? _txtParaHtml(def.acoes || '')  : '',
      descricao: def ? (def.descricao || '') : '',
    };
  }

  // Completa uma criatura carregada com quaisquer campos que faltem,
  // para que dados antigos continuem funcionando após mudanças no modelo.
  function normalizarCriatura(cr) {
    if (!cr.id) cr.id = uid('cr');
    if (!cr.stats || typeof cr.stats !== 'object') cr.stats = {};
    STATS.forEach(s => {
      const v = cr.stats[s.chave];
      if (!v || typeof v !== 'object') cr.stats[s.chave] = { padrao: '', atual: '' };
    });
    if (cr.iniciativaCombate == null) cr.iniciativaCombate = '';
    if (['lacaio', 'solo', 'especial'].indexOf(cr.papel) < 0) cr.papel = 'lacaio';
    cr.statusMorte = (cr.statusMorte && typeof cr.statusMorte === 'object')
      ? { vivo: !!cr.statusMorte.vivo, detalhe: String(cr.statusMorte.detalhe || '') } : null;
    // rolador de críticos (efeitos & falhas)
    const _CR = window.GA_CRITICOS;
    if (!_CR || !_CR.TABELA[cr.critTipo]) cr.critTipo = 'corte';
    if (!_CR || !(cr.critMult in _CR.SEV_MOD)) cr.critMult = 'x2';
    if (cr.critLocal !== '' && !(_CR && _CR.LOCAL_ROT[cr.critLocal])) cr.critLocal = '';
    if (cr.ultimoCritico && typeof cr.ultimoCritico !== 'object') cr.ultimoCritico = null;
    if (!cr.ultimoCritico) cr.ultimoCritico = null;
    if (typeof cr.nd !== 'string') cr.nd = '';
    if (typeof cr.descricao !== 'string') cr.descricao = '';
    if (typeof cr.equipamento !== 'string') cr.equipamento = '';
    if (!Array.isArray(cr.condicoesAtivas)) cr.condicoesAtivas = [];
    if (typeof cr.tipoCriatura !== 'string') cr.tipoCriatura = '';
    if (!Array.isArray(cr.habilidades)) cr.habilidades = [];
    if (!Array.isArray(cr.sentidos)) cr.sentidos = [];
    if (typeof cr.devoto !== 'string') cr.devoto = '';   // chave do deus (GA_DEVOTOS)
    // montaria opcional da criatura (com nível de parceiro)
    if (!cr.montaria || typeof cr.montaria !== 'object') cr.montaria = { chave: '', nivel: 'iniciante' };
    if (typeof cr.montaria.chave !== 'string') cr.montaria.chave = '';
    if (['iniciante', 'veterano', 'mestre'].indexOf(cr.montaria.nivel) < 0) cr.montaria.nivel = 'iniciante';
    // migração: sentidos que antes ficavam na lista de habilidades
    SENTIDOS.forEach(s => {
      const i = cr.habilidades.indexOf(s.chave);
      if (i >= 0) {
        cr.habilidades.splice(i, 1);
        if (cr.sentidos.indexOf(s.chave) < 0) cr.sentidos.push(s.chave);
      }
    });
  }

  // Completa um perigo carregado com quaisquer campos que faltem.
  function normalizarPerigo(pg) {
    if (!pg.id) pg.id = uid('pg');
    ['nome','nd','fonte','objetivo','efeito','acoes','descricao'].forEach(k => {
      if (typeof pg[k] !== 'string') pg[k] = '';
    });
    if (typeof pg.aberto !== 'boolean') pg.aberto = true;
  }

  // ── LOCALIZAÇÃO POR ÍNDICES (data-s / data-c / data-cr / data-pg) ─
  function pegarSessao(el)  { return dados.sessoes[+el.dataset.s]; }
  function pegarCena(el)    { return pegarSessao(el).cenas[+el.dataset.c]; }
  function pegarCriatura(el){ return pegarCena(el).criaturas[+el.dataset.cr]; }
  function pegarPerigo(el)  { return pegarCena(el).perigos[+el.dataset.pg]; }

  // Salva uma caixa de texto rico (contenteditable) — funciona tanto
  // para a caixa de ataques da criatura quanto para efeito/ações do perigo.
  function salvarRich(editor) {
    const campo = editor.dataset.campo;
    if (!campo) return;
    // anotações de sessão/cena: guardam HTML (notasHtml) + espelho puro (notas)
    if (campo === 'notas-sessao' || campo === 'notas-cena') {
      const owner = (campo === 'notas-sessao') ? pegarSessao(editor) : pegarCena(editor);
      owner.notasHtml = editor.innerHTML;
      owner.notas = htmlParaTexto(editor.innerHTML);
      salvar(); return;
    }
    const owner = (editor.dataset.pg != null) ? pegarPerigo(editor) : pegarCriatura(editor);
    if (owner) { owner[campo] = editor.innerHTML; salvar(); }
  }

  // Fixa/solta uma ficha (criatura ou perigo) no painel de combate, por id.
  function _alternarFixado(id) {
    const i = dados.painel.indexOf(id);
    if (i >= 0) {
      dados.painel[i] = null;            // já estava fixada → solta
    } else {
      const livre = dados.painel.indexOf(null);
      if (livre >= 0) dados.painel[livre] = id;
      else dados.painel.push(id);        // sem quadrado livre → abre mais um
    }
  }

  // ── AMBIENTES DA CENA (terreno/clima/perigos ativos) ─────────────
  // Biblioteca unificada a partir de window.PERIGOS_REFERENCIA e
  // window.PERIGOS_COMPLEXOS. Cada ambiente é identificado por uma
  // "key": 'ref|<cat>|<nome>' ou 'pg|<chave>'. A cena guarda só as keys.
  const AMB_CORES = {
    ambientais: '#5c1a04', clima: '#2f6f9e', terrenos: '#6e5a1a',
    armadilhas: '#6e3a1a', doencas: '#3f7a3f', maldicoes: '#5a2a6a',
    tormenta: '#8b1020', ermos: '#3a5a3a', complexos: '#8b2c0a',
  };
  function corDaCatAmb(cat) { return AMB_CORES[cat] || '#6e6256'; }

  let _ambLib = null, _ambMap = null;
  function ambienteLib() {
    if (_ambLib) return _ambLib;
    _ambLib = []; _ambMap = {};
    const REF = window.PERIGOS_REFERENCIA;
    const catInfo = {};
    if (REF && Array.isArray(REF.categorias)) REF.categorias.forEach(c => { catInfo[c.chave] = c; });
    if (REF && Array.isArray(REF.entradas)) {
      REF.entradas.forEach(e => {
        const ci = catInfo[e.cat] || { nome: e.cat, icone: '' };
        const item = { key: 'ref|' + e.cat + '|' + e.nome, kind: 'ref', cat: e.cat,
                       catNome: ci.nome, icone: ci.icone || '', nome: e.nome, nd: e.nd || '', corpo: e.texto || '' };
        _ambLib.push(item); _ambMap[item.key] = item;
      });
    }
    if (Array.isArray(window.PERIGOS_COMPLEXOS)) {
      window.PERIGOS_COMPLEXOS.forEach(d => {
        let corpo = '';
        if (d.descricao) corpo += d.descricao + '\n\n';
        if (d.objetivo)  corpo += 'Objetivo: ' + d.objetivo + '\n\n';
        if (d.efeito)    corpo += 'Efeito:\n' + d.efeito + '\n\n';
        if (d.acoes)     corpo += 'Ações:\n' + d.acoes;
        const item = { key: 'pg|' + d.chave, kind: 'pg', cat: 'complexos',
                       catNome: 'Perigo Complexo', icone: '⚠', nome: d.nome, nd: d.nd || '', corpo: corpo.trim() };
        _ambLib.push(item); _ambMap[item.key] = item;
      });
    }
    return _ambLib;
  }
  function ambientePorKey(key) { ambienteLib(); return _ambMap[key] || null; }

  // Normaliza o array de ambientes de uma cena para [{ key, nota }].
  // Aceita o formato antigo (array de strings/keys) e converte.
  function normalizarAmbientes(arr) {
    if (!Array.isArray(arr)) return [];
    return arr.map(a => {
      if (typeof a === 'string') return { key: a, nota: '' };
      if (a && typeof a === 'object' && typeof a.key === 'string')
        return { key: a.key, nota: typeof a.nota === 'string' ? a.nota : '' };
      return null;
    }).filter(Boolean);
  }

  // Procura a primeira nota personalizada salva para uma key (qualquer cena).
  function notaAmbienteGlobal(key) {
    for (const s of dados.sessoes) {
      for (const c of (s.cenas || [])) {
        const inst = (c.ambientes || []).find(a => a && a.key === key && a.nota);
        if (inst) return inst.nota;
      }
    }
    return '';
  }

  // Ambientes (cópia {key,nota}) de uma cena específica — é o que o painel
  // oferece "trazer para o jogo" (cenas diferentes têm ambientes diferentes).
  function ambientesDaCena(si, ci) {
    const c = dados.sessoes[si] && dados.sessoes[si].cenas[ci];
    if (!c) return [];
    return (c.ambientes || []).map(a => ({ key: a.key, nota: a.nota || '' }));
  }

  // Localiza a cena narrada (por id) → { si, ci } ou null.
  function cenaNarradaRef() {
    if (!dados.cenaNarrada) return null;
    for (let si = 0; si < dados.sessoes.length; si++) {
      const ci = dados.sessoes[si].cenas.findIndex(c => c.id === dados.cenaNarrada);
      if (ci >= 0) return { si: si, ci: ci };
    }
    return null;
  }

  // Array de ambientes de um alvo: o painel (lista própria) ou uma cena.
  function _ambArrDe(alvo) {
    if (!alvo) return null;
    if (alvo.tipo === 'painel') {
      if (!Array.isArray(dados.painelAmbientes)) dados.painelAmbientes = [];
      return dados.painelAmbientes;
    }
    const cena = dados.sessoes[alvo.s].cenas[alvo.c];
    if (!Array.isArray(cena.ambientes)) cena.ambientes = [];
    return cena.ambientes;
  }

  // ═══════════════════════════════════════════════════════════════
  //  RENDERIZAÇÃO
  // ═══════════════════════════════════════════════════════════════
  function render() {
    const cont = document.getElementById('monstros-content');
    if (!cont) return;

    // no modo painel a página fica mais larga (3 fichas lado a lado)
    const secao = document.getElementById('monstros');
    if (secao) secao.classList.toggle('mz-modo-painel', !!dados.modoPainel);

    let html = `
      <div class="mz-cabecalho">
        <h1>Bestiário do Mestre</h1>
        <p class="mz-subtitulo">Sessões, cenas e criaturas — tudo salvo neste navegador</p>
        <div class="mz-backup">
          <button class="mz-backup-btn" data-acao="exportar-json"
                  title="Salvar um arquivo .json com TUDO — reimporte para restaurar (ex.: ao limpar o navegador)">⬇ Backup (.json)</button>
          <button class="mz-backup-btn" data-acao="exportar-txt"
                  title="Exportar um .txt legível do bestiário para ler ou imprimir">⬇ Exportar texto (.txt)</button>
          <button class="mz-backup-btn mz-backup-btn--imp" data-acao="importar-backup"
                  title="Carregar um backup .json — restaura sessões, cenas e criaturas nos devidos lugares">⬆ Importar backup</button>
          <input type="file" id="mzImportFile" accept=".json,application/json" hidden>
        </div>
      </div>`;

    const qtdFixadas = dados.painel.filter(Boolean).length;
    html += `
      <div class="mz-visao">
        <button class="mz-visao-btn ${dados.modoPainel ? 'mz-visao-btn--ativo' : ''}" data-acao="alternar-visao">
          ${dados.modoPainel ? '☰ Voltar à lista' : ('◫ Painel de combate' + (qtdFixadas ? ' (' + qtdFixadas + ')' : ''))}
        </button>
        <span class="mz-visao-dica">${dados.modoPainel
          ? 'As fichas abaixo são as mesmas da lista — toda edição vale nos dois modos. Use ＋ para abrir mais quadrados.'
          : 'Fixe quantas fichas quiser com o botão ◫ no cabeçalho da criatura e acompanhe-as lado a lado.'}</span>
      </div>`;

    if (dados.modoPainel) {
      html += construirPainel();
    } else {
      if (dados.sessoes.length === 0) {
        html += `<p class="mz-vazio">Nenhuma sessão ainda. Crie a primeira para começar a montar seus combates.</p>`;
      } else {
        html += construirNav();
        dados.sessoes.forEach((s, si) => { html += construirSessao(s, si); });
      }
      html += `<button class="mz-add mz-add--sessao" data-acao="add-sessao">＋ Adicionar Sessão</button>`;
    }

    cont.innerHTML = html;
    // ajusta a altura das caixas de texto simples ao conteúdo já salvo
    // (as notas de sessão/cena são contenteditable e já crescem sozinhas)
    cont.querySelectorAll('.mz-textarea').forEach(autoCrescer);
  }

  // ── PAINEL DE COMBATE (fichas lado a lado, sem limite) ───────────
  // Lista plana de todas as fichas (criaturas E perigos) com seus
  // índices atuais. tipo: 'cr' = criatura, 'pg' = perigo complexo.
  function catalogoFichas() {
    const lista = [];
    dados.sessoes.forEach((s, si) => {
      s.cenas.forEach((c, ci) => {
        c.criaturas.forEach((cr, idx) => {
          lista.push({ id: cr.id, tipo: 'cr', si: si, ci: ci, idx: idx, sessao: s.nome, cena: c.nome, nome: cr.nome });
        });
        (c.perigos || []).forEach((pg, idx) => {
          lista.push({ id: pg.id, tipo: 'pg', si: si, ci: ci, idx: idx, sessao: s.nome, cena: c.nome, nome: pg.nome });
        });
      });
    });
    return lista;
  }

  function construirPainel() {
    const cat = catalogoFichas();
    const cenaRef = cenaNarradaRef();
    const cenaId = dados.cenaNarrada;
    const sidNarr = cenaRef ? dados.sessoes[cenaRef.si].id : null;

    // ── barra de controle: cena narrada + trazer ambientes + combate ──
    let opsCena = `<option value="" ${!cenaRef ? 'selected' : ''}>— nenhuma —</option>`;
    dados.sessoes.forEach(s => {
      let oc = '';
      s.cenas.forEach(c => {
        oc += `<option value="${esc(c.id)}" ${c.id === cenaId ? 'selected' : ''}>${esc(c.nome || '(cena)')}</option>`;
      });
      if (oc) opsCena += `<optgroup label="${esc(s.nome || '(sessão)')}">${oc}</optgroup>`;
    });
    const nAmbCena = cenaRef ? ambientesDaCena(cenaRef.si, cenaRef.ci).length : 0;
    const controle = `
      <div class="mz-painel-controle">
        <label class="mz-painel-narr">
          <span class="mz-painel-narr-rot">Narrando a cena:</span>
          <select class="mz-painel-sessao" data-painel-cena title="A cena escolhida sobe ao topo dos seletores de ficha; o botão traz os ambientes DELA">${opsCena}</select>
        </label>
        ${cenaRef && nAmbCena
          ? `<button class="mz-painel-trazer" data-acao="trazer-ambientes-cena"
                     title="Substitui os ambientes em jogo pelos desta cena">↻ Trazer ${nAmbCena} ambiente${nAmbCena !== 1 ? 's' : ''} da cena</button>`
          : ''}
        <button class="mz-painel-cv-toggle ${dados.combateViagem ? 'mz-painel-cv-toggle--ativo' : ''}" data-acao="toggle-combate-viagem"
                title="Mostra/esconde a faixa de regras de combate em viagem">⚔ Combate em viagem</button>
      </div>`;

    // banner de ambientes EDITÁVEL + faixa de combate + ficha do veículo
    const bannerAmb = construirBarraAmbientesPainel();
    const bandaCV = construirBandaCombateViagem();
    const bandaVeic = construirBlocoVeiculoPainel();

    // ordem das sessões nos seletores de ficha: a da cena narrada primeiro
    const ordemSess = dados.sessoes.slice();
    if (cenaRef && cenaRef.si > 0) { const sn = ordemSess.splice(cenaRef.si, 1)[0]; ordemSess.unshift(sn); }

    let html = controle + bannerAmb + bandaCV + bandaVeic + '<div class="mz-painel">';
    for (let slot = 0; slot < dados.painel.length; slot++) {
      let id = dados.painel[slot];
      let ref = null;
      if (id) {
        ref = cat.find(x => x.id === id) || null;
        if (!ref) { dados.painel[slot] = null; id = null; salvar(); }  // ficha foi removida
      }

      // seletor com todas as fichas (sessão narrada no topo, marcada com ▶)
      let ops = `<option value="">— escolher ficha —</option>`;
      ordemSess.forEach(s => {
        const narr = (s.id === sidNarr);
        s.cenas.forEach(c => {
          let itens = '';
          c.criaturas.forEach(cr => {
            itens += `<option value="${cr.id}" ${cr.id === id ? 'selected' : ''}>${esc(cr.nome || '(sem nome)')}</option>`;
          });
          (c.perigos || []).forEach(pg => {
            itens += `<option value="${pg.id}" ${pg.id === id ? 'selected' : ''}>⚠ ${esc(pg.nome || '(perigo sem nome)')}</option>`;
          });
          if (itens) ops += `<optgroup label="${esc((narr ? '▶ ' : '') + s.nome + ' · ' + c.nome)}">${itens}</optgroup>`;
        });
      });

      let corpo;
      if (ref) {
        const c = dados.sessoes[ref.si].cenas[ref.ci];
        corpo = (ref.tipo === 'pg')
          ? construirPerigo(c.perigos[ref.idx], ref.si, ref.ci, ref.idx, 1, true)
          : construirCriatura(c.criaturas[ref.idx], ref.si, ref.ci, ref.idx, 1, true);
      } else {
        corpo = `<p class="mz-vazio mz-vazio--menor">Quadrado vazio.<br>Escolha uma ficha acima ou fixe uma na lista (botão ◫).</p>`;
      }

      const origem = ref
        ? `<div class="mz-painel-origem" title="De onde esta ficha veio">📍 ${esc(ref.sessao || 'Sessão')} · ${esc(ref.cena || 'Cena')}</div>`
        : '';
      html += `
        <div class="mz-painel-slot">
          <div class="mz-painel-slot-cab">
            <span class="mz-painel-slot-num">${slot + 1}</span>
            <select class="mz-painel-select" data-painel-slot="${slot}" title="Criatura deste quadrado">${ops}</select>
            <button class="mz-painel-slot-x" data-acao="rem-quadrado" data-slot="${slot}"
                    title="Fechar este quadrado (a criatura continua na lista)">✕</button>
          </div>
          ${origem}
          ${corpo}
        </div>`;
    }
    html += `
      <button class="mz-painel-add" data-acao="add-quadrado" title="Abrir mais um quadrado">
        ＋ Adicionar quadrado
      </button>`;
    html += '</div>';
    return html;
  }

  // Botões de grifo: cores (GRIFOS) + caixa de leitura + remover. `attr` é o
  // nome do atributo de ação — 'data-acao' nas caixas inline (a seção escuta)
  // ou 'data-grifo' no editor em tela cheia (handler próprio do modal).
  function botoesGrifo(attr, ds) {
    ds = ds || '';
    const sw = GRIFOS.map(g =>
      `<button type="button" class="mz-grifo mz-grifo--sw" ${attr}="grifar" data-cor="${g.cls}" ${ds}
               style="--sw:${g.cor}" title="Grifar: ${esc(g.nome)}"><span class="mz-sw"></span></button>`
    ).join('');
    return `<span class="mz-toolbar-rot">Grifar</span>${sw}
            <button type="button" class="mz-grifo mz-grifo--box" ${attr}="grifar" data-cor="mz-leitura" ${ds} title="Marcar o trecho como caixa de leitura (boxed, estilo livro de aventura)">▣ Caixa</button>
            <button type="button" class="mz-grifo mz-grifo--limpa" ${attr}="desgrifar" ${ds}>✦ Remover</button>`;
  }

  // Barra das caixas de texto rico (grifo + tela cheia). `ds` = data-attrs do
  // campo. opts.ler acrescenta "📖 Ler" (modo narração — só nas anotações).
  function barraGrifo(ds, opts) {
    opts = opts || {};
    const ler = opts.ler
      ? `<button type="button" class="mz-grifo mz-grifo--ler" data-acao="ler" ${ds} title="Abrir só para ler/narrar, em fonte grande">📖 Ler</button>`
      : '';
    return `
            <div class="mz-toolbar">
              ${botoesGrifo('data-acao', ds)}
              <span class="mz-toolbar-dica">selecione · grife ou Ctrl+B / Ctrl+I</span>
              ${ler}
              <button type="button" class="mz-grifo mz-grifo--exp" data-acao="expandir" ${ds} title="Editar em tela cheia">⛶ Expandir</button>
            </div>`;
  }

  // Caixa de texto simples (textarea) com botão ⛶ Expandir flutuante.
  // Cresce sozinha com o conteúdo (autoCrescer) e ainda dá para arrastar a
  // borda para cima/baixo. `ds` = data-attrs do campo.
  function caixaTextoSimples(campo, valor, ds, linhas, dica) {
    return `
          <div class="mz-exp-wrap">
            <textarea class="mz-textarea" rows="${linhas}" placeholder="${esc(dica || '')}"
                      data-campo="${campo}" ${ds}>${esc(valor || '')}</textarea>
            <button class="mz-exp-btn" type="button" data-acao="expandir" ${ds} title="Abrir em tela cheia">⛶</button>
          </div>`;
  }

  // ── NAVEGAÇÃO RÁPIDA (recolher/expandir tudo + Índice de cenas) ───
  function construirNav() {
    let indice = '';
    if (indiceAberto) {
      let grupos = '';
      dados.sessoes.forEach(s => {
        const cenas = s.cenas.map(c =>
          `<button class="mz-idx-link mz-idx-link--cena" data-acao="ir-cena" data-sid="${esc(s.id)}" data-cid="${esc(c.id)}">▪ ${esc(c.nome || 'Cena')}</button>`
        ).join('');
        grupos += `<div class="mz-idx-grupo">
            <button class="mz-idx-link mz-idx-link--sessao" data-acao="ir-sessao" data-sid="${esc(s.id)}">▣ ${esc(s.nome || 'Sessão')}</button>
            ${cenas ? `<div class="mz-idx-cenas">${cenas}</div>` : '<span class="mz-idx-vazio">sem cenas</span>'}
          </div>`;
      });
      indice = `<div class="mz-indice">${grupos}</div>`;
    }
    return `
      <div class="mz-nav">
        <button class="mz-nav-btn" data-acao="expandir-tudo" title="Abrir todas as sessões e cenas">▾ Expandir tudo</button>
        <button class="mz-nav-btn" data-acao="recolher-tudo" title="Fechar todas as sessões e cenas">▸ Recolher tudo</button>
        <button class="mz-nav-btn ${indiceAberto ? 'mz-nav-btn--ativo' : ''}" data-acao="toggle-indice" title="Lista de cenas — clique para pular direto">🗺 Índice</button>
      </div>
      ${indice}`;
  }

  function construirSessao(s, si) {
    let cenasHtml = '';
    if (s.cenas.length === 0) {
      cenasHtml = `<p class="mz-vazio mz-vazio--menor">Nenhuma cena nesta sessão.</p>`;
    } else {
      s.cenas.forEach((c, ci) => { cenasHtml += construirCena(c, si, ci); });
    }

    const btnCena =
      `<button class="mz-add mz-add--cena" data-acao="add-cena" data-s="${si}">＋ Adicionar Cena</button>`;

    const semSubir  = (si === 0)                        ? 'disabled' : '';
    const semDescer = (si === dados.sessoes.length - 1) ? 'disabled' : '';

    return `
      <div class="mz-sessao ${s.aberto ? 'mz-aberto' : ''}" id="mzs-${esc(s.id)}">
        <div class="mz-sessao-cabecalho">
          <button class="mz-toggle" data-acao="toggle-sessao" data-s="${si}" title="Expandir / recolher">
            ${s.aberto ? '▾' : '▸'}
          </button>
          <input class="mz-nome mz-nome--sessao" type="text" value="${esc(s.nome)}"
                 data-campo="nome-sessao" data-s="${si}" placeholder="Nome da sessão">
          <span class="mz-contador">${s.cenas.length} cena${s.cenas.length !== 1 ? 's' : ''}</span>
          <button class="mz-mover" data-acao="subir-sessao" data-s="${si}" ${semSubir} title="Mover para cima">↑</button>
          <button class="mz-mover" data-acao="descer-sessao" data-s="${si}" ${semDescer} title="Mover para baixo">↓</button>
          <button class="mz-del" data-acao="del-sessao" data-s="${si}" title="Remover sessão">✕</button>
        </div>
        <div class="mz-sessao-corpo">
          <div class="mz-campo mz-notas-campo">
            ${barraGrifo(`data-s="${si}"`, { ler: true })}
            <div class="mz-ataques mz-notas-rich" contenteditable="true" spellcheck="true"
                 data-campo="notas-sessao" data-s="${si}">${s.notasHtml || ''}</div>
          </div>
          ${cenasHtml}
          ${btnCena}
        </div>
      </div>`;
  }

  function construirBarraAmbientes(c, si, ci) {
    const ds = `data-s="${si}" data-c="${ci}"`;
    const arr = Array.isArray(c.ambientes) ? c.ambientes : [];
    let chips = '';
    arr.forEach(a => {
      const it = ambientePorKey(a.key);
      if (!it) return;
      const temNota = !!(a.nota && a.nota.trim());
      chips += `
        <span class="mz-amb-chip ${temNota ? 'mz-amb-chip--nota' : ''}" style="--cor:${corDaCatAmb(it.cat)}">
          <button class="mz-amb-info" data-acao="ver-ambiente" data-key="${esc(a.key)}" ${ds}
                  title="Ver regras e editar narração de ${esc(it.nome)}">
            <span class="mz-amb-cat">${it.icone ? it.icone + ' ' : ''}${esc(it.catNome)}${it.nd ? ' · ND ' + esc(it.nd) : ''}</span>
            <span class="mz-amb-nome">${esc(it.nome)}${temNota ? ' <span class="mz-amb-flag" title="Tem narração personalizada">📝</span>' : ''}</span>
          </button>
          <button class="mz-amb-x" data-acao="rem-ambiente" data-key="${esc(a.key)}" ${ds} title="Remover">✕</button>
        </span>`;
    });
    return `
      <div class="mz-ambientes">
        <span class="mz-amb-titulo">🌪 Ambiente da cena</span>
        <div class="mz-amb-lista">
          ${chips}
          ${arr.length === 0 ? '<span class="mz-amb-nenhum">nenhum — marque terreno, clima ou perigos ativos</span>' : ''}
          <button class="mz-amb-add" data-acao="abrir-ambientes" ${ds}>＋ Ambiente</button>
        </div>
      </div>`;
  }

  // Banner de ambientes do PAINEL (palco ao vivo) — editável e
  // independente das cenas. Adicionar/remover/editar aqui nunca toca na
  // preparação; o conteúdo vem de dados.painelAmbientes.
  function construirBarraAmbientesPainel() {
    const arr = Array.isArray(dados.painelAmbientes) ? dados.painelAmbientes : [];
    let chips = '';
    arr.forEach(a => {
      const it = ambientePorKey(a.key);
      if (!it) return;
      const temNota = !!(a.nota && a.nota.trim());
      chips += `
        <span class="mz-amb-chip ${temNota ? 'mz-amb-chip--nota' : ''}" style="--cor:${corDaCatAmb(it.cat)}">
          <button class="mz-amb-info" data-acao="ver-ambiente" data-key="${esc(a.key)}" data-painel="1"
                  title="Ver regras e editar narração de ${esc(it.nome)}">
            <span class="mz-amb-cat">${it.icone ? it.icone + ' ' : ''}${esc(it.catNome)}${it.nd ? ' · ND ' + esc(it.nd) : ''}</span>
            <span class="mz-amb-nome">${esc(it.nome)}${temNota ? ' <span class="mz-amb-flag" title="Tem narração personalizada">📝</span>' : ''}</span>
          </button>
          <button class="mz-amb-x" data-acao="rem-ambiente-painel" data-key="${esc(a.key)}" title="Tirar do painel">✕</button>
        </span>`;
    });
    return `
      <div class="mz-ambientes mz-ambientes--painel">
        <span class="mz-amb-titulo">🌪 Ambiente em jogo</span>
        <div class="mz-amb-lista">
          ${chips}
          ${arr.length === 0 ? '<span class="mz-amb-nenhum">nenhum — adicione com ＋, ou traga os da cena narrada acima</span>' : ''}
          <button class="mz-amb-add" data-acao="abrir-ambientes-painel">＋ Ambiente</button>
        </div>
      </div>`;
  }

  // Faixa de "Combate em viagem" no painel (abaixo de Ambiente em jogo):
  // regras rápidas de veículo em combate, para o mestre lembrar as penalidades.
  // Aparece quando dados.combateViagem está ligado (ligado automaticamente
  // quando a aba Viagem cria um combate; alternável pelo botão da barra).
  function construirBandaCombateViagem() {
    if (!dados.combateViagem) return '';
    const regras = window.VEICULOS_REGRAS || [];
    const minis = ['embarcando', 'pilotando', 'colisoes', 'atropelamento', 'atacar', 'rodas', 'tracao', 'aeronaves']
      .map(ch => regras.find(r => r.chave === ch))
      .filter(Boolean)
      .map(r => `<details class="mz-cv-mini"><summary>${esc(r.titulo)}</summary><div class="mz-cv-mini-corpo">${esc(r.texto).replace(/\n/g, '<br>')}</div></details>`)
      .join('');
    return `
      <div class="mz-ambientes mz-ambientes--painel mz-combate-viagem">
        <span class="mz-amb-titulo">⚔ Combate em viagem
          <button class="mz-cv-x" data-acao="toggle-combate-viagem" title="Esconder esta faixa">✕</button>
        </span>
        ${minis ? `<div class="mz-cv-regras">${minis}</div>` : '<p class="mz-amb-nenhum">Regras de veículo não carregaram (veiculos-data.js).</p>'}
      </div>`;
  }

  // Faixa do veículo da viagem no painel — mostra e edita a MESMA vida (PV)
  // compartilhada com a aba Viagem (via window.GA_Viagem). Aparece quando há
  // um combate de viagem ligado a uma viagem cujo transporte é um veículo.
  function construirBlocoVeiculoPainel() {
    if (!dados.combateViagem || !dados.combateViagemId) return '';
    if (!window.GA_Viagem || typeof window.GA_Viagem.fichaTransporte !== 'function') return '';
    const f = window.GA_Viagem.fichaTransporte(dados.combateViagemId);
    if (!f) return '';
    return `
      <div class="mz-ambientes mz-ambientes--painel mz-veiculo-painel">
        <span class="mz-amb-titulo">🚗 Veículo da viagem — ${esc(f.nome)} (${esc(f.tamanho)})</span>
        <div class="mz-veic-pv">
          <span class="mz-veic-pv-rot">PV (mesma vida da Viagem)</span>
          <button class="mz-step" data-acao="veic-pv-menos" title="−1 PV">−</button>
          <input class="mz-veic-pv-in" type="text" inputmode="numeric" data-campo="veic-pv"
                 data-vpv="${esc(dados.combateViagemId)}" value="${esc(f.pvAtual)}">
          <span class="mz-veic-pv-max">/ ${esc(f.pvMax)}</span>
          <button class="mz-step" data-acao="veic-pv-mais" title="+1 PV">＋</button>
          <span class="mz-veic-def">Defesa ${esc(f.defesa)} · ${esc(f.desloc)}</span>
        </div>
      </div>`;
  }

  function construirCena(c, si, ci) {
    let critHtml = '';
    if (c.criaturas.length === 0) {
      critHtml = `<p class="mz-vazio mz-vazio--menor">Nenhuma criatura nesta cena.</p>`;
    } else {
      c.criaturas.forEach((cr, cri) => {
        critHtml += construirCriatura(cr, si, ci, cri, c.criaturas.length);
      });
    }

    // grupo de perigos complexos (aparece só quando há ao menos um)
    let perigosHtml = '';
    if (Array.isArray(c.perigos) && c.perigos.length) {
      let cards = '';
      c.perigos.forEach((pg, pi) => { cards += construirPerigo(pg, si, ci, pi, c.perigos.length); });
      perigosHtml = `
        <div class="mz-perigos-grupo">
          <div class="mz-perigos-titulo">⚠ Perigos complexos</div>
          ${cards}
        </div>`;
    }

    const numCenas  = dados.sessoes[si].cenas.length;
    const semSubir  = (ci === 0)              ? 'disabled' : '';
    const semDescer = (ci === numCenas - 1)   ? 'disabled' : '';

    return `
      <div class="mz-cena ${c.aberto ? 'mz-aberto' : ''}" id="mzc-${esc(c.id)}">
        <div class="mz-cena-cabecalho">
          <button class="mz-toggle" data-acao="toggle-cena" data-s="${si}" data-c="${ci}" title="Expandir / recolher">
            ${c.aberto ? '▾' : '▸'}
          </button>
          <input class="mz-nome mz-nome--cena" type="text" value="${esc(c.nome)}"
                 data-campo="nome-cena" data-s="${si}" data-c="${ci}" placeholder="Nome da cena">
          <span class="mz-contador">${c.criaturas.length} criatura${c.criaturas.length !== 1 ? 's' : ''}</span>
          <button class="mz-mover" data-acao="subir-cena" data-s="${si}" data-c="${ci}" ${semSubir} title="Mover para cima">↑</button>
          <button class="mz-mover" data-acao="descer-cena" data-s="${si}" data-c="${ci}" ${semDescer} title="Mover para baixo">↓</button>
          <button class="mz-del" data-acao="del-cena" data-s="${si}" data-c="${ci}" title="Remover cena">✕</button>
        </div>
        <div class="mz-cena-corpo">
          ${construirBarraAmbientes(c, si, ci)}
          <div class="mz-campo mz-notas-campo">
            ${barraGrifo(`data-s="${si}" data-c="${ci}"`, { ler: true })}
            <div class="mz-ataques mz-notas-rich" contenteditable="true" spellcheck="true"
                 data-campo="notas-cena" data-s="${si}" data-c="${ci}">${c.notasHtml || ''}</div>
          </div>
          ${critHtml}
          ${perigosHtml}
          <div class="mz-cena-acoes">
            <button class="mz-add mz-add--criatura" data-acao="add-criatura"
                    data-s="${si}" data-c="${ci}">＋ Adicionar criatura</button>
            <button class="mz-add mz-add--perigo" data-acao="abrir-perigos"
                    data-s="${si}" data-c="${ci}">⚠ Perigos complexos</button>
            <button class="mz-add mz-add--npc" data-acao="abrir-npcs"
                    data-s="${si}" data-c="${ci}">👤 Guia de NPCs</button>
            <button class="mz-add mz-add--importar" data-acao="importar-ficha"
                    data-s="${si}" data-c="${ci}">📋 Importar do livro</button>
          </div>
        </div>
      </div>`;
  }

  // ── BARRA DE CONDIÇÕES ATIVAS (topo da ficha) ────────────────────
  function construirBarraCondicoes(cr, ds) {
    const ativas = Array.isArray(cr.condicoesAtivas) ? cr.condicoesAtivas : [];
    let chips = '';
    ativas.forEach(chave => {
      const c = COND_POR_CHAVE[chave];
      if (!c) return;
      const cat = COND_CATEGORIAS[c.cat] || { rotulo: c.cat, cor: '#6e6256' };
      chips += `
        <span class="mz-cond-chip" style="--cor:${cat.cor}">
          <span class="mz-cond-info">
            <span class="mz-cond-nome">${esc(c.nome)}</span>
            <span class="mz-cond-cat">${esc(cat.rotulo)}</span>
          </span>
          <button class="mz-cond-x" data-acao="rem-condicao" data-cond="${c.chave}" ${ds}
                  title="Remover ${esc(c.nome)}">✕</button>
          <span class="mz-cond-tip">
            <span class="mz-cond-tip-topo">
              <strong>${esc(c.nome)}</strong>
              <span class="mz-cond-tip-cat" style="--cor:${cat.cor}">${esc(cat.rotulo)}</span>
            </span>
            <span class="mz-cond-tip-desc">${esc(c.desc)}</span>
          </span>
        </span>`;
    });
    return `
      <div class="mz-condicoes">
        <span class="mz-cond-titulo">Condições ativas</span>
        <div class="mz-cond-lista">
          ${chips}
          ${ativas.length === 0 ? '<span class="mz-cond-nenhuma">nenhuma</span>' : ''}
          <button class="mz-cond-add" data-acao="abrir-condicoes" ${ds}>＋ Condição</button>
        </div>
      </div>`;
  }

  // ── CHIP GENÉRICO (tipo de criatura e habilidades gerais) ────────
  function _chipHtml(item, cor, acaoRem, ds) {
    return `
      <span class="mz-cond-chip mz-cond-chip--simples" style="--cor:${cor}">
        <span class="mz-cond-nome">${esc(item.nome)}</span>
        <button class="mz-cond-x" data-acao="${acaoRem}" data-chave="${item.chave}" ${ds}
                title="Remover ${esc(item.nome)}">✕</button>
        <span class="mz-cond-tip">
          <span class="mz-cond-tip-topo"><strong>${esc(item.nome)}</strong></span>
          <span class="mz-cond-tip-desc">${esc(item.desc)}</span>
        </span>
      </span>`;
  }

  // ── BARRA: TIPO DE CRIATURA (abaixo de "Tipo e tamanho") ─────────
  function construirBarraTipo(cr, ds) {
    const item = TIPO_POR_CHAVE[cr.tipoCriatura];
    return `
      <div class="mz-condicoes mz-condicoes--sub">
        <span class="mz-cond-titulo">Tipo de criatura · regras inerentes</span>
        <div class="mz-cond-lista">
          ${item ? _chipHtml(item, '#5c1a04', 'rem-tipo', ds) : '<span class="mz-cond-nenhuma">nenhum</span>'}
          <button class="mz-cond-add" data-acao="abrir-tipo" ${ds}>＋ Tipo</button>
        </div>
      </div>`;
  }

  // ── BARRA: VARIANTE DE MORTE (fim de combate) ────────────────────
  // Papel da ameaça + botão que resolve a sorte: lacaio morre ao cair;
  // solo/especial têm 50% de sobreviver (Ameaças de Arton). O select usa
  // data-campo="papel" (salvo pelo handler genérico de campos, sem render).
  function construirBarraMorte(cr, ds) {
    const papel = cr.papel || 'lacaio';
    const opt = (v, txt) => `<option value="${v}"${papel === v ? ' selected' : ''}>${txt}</option>`;
    const sm = cr.statusMorte;
    let resultado = '';
    if (sm) {
      const cls = sm.vivo ? 'mz-morte-res--vivo' : 'mz-morte-res--morto';
      const ico = sm.vivo ? '❤ Sobreviveu' : '☠ Morta';
      resultado = `
          <span class="mz-morte-res ${cls}">${ico}${sm.detalhe ? ' · ' + esc(sm.detalhe) : ''}</span>
          <button class="mz-cond-x" data-acao="limpar-morte" ${ds} title="Limpar resultado">✕</button>`;
    }
    return `
      <div class="mz-condicoes mz-condicoes--sub mz-morte">
        <span class="mz-cond-titulo">Fim de combate · variante de morte</span>
        <div class="mz-cond-lista">
          <select class="mz-morte-papel" data-campo="papel" ${ds}
                  title="Lacaio: morre ao cair a 0 PV. Solo / Especial: 50% de chance de sobreviver.">
            ${opt('lacaio', 'Lacaio')}${opt('solo', 'Solo')}${opt('especial', 'Especial')}
          </select>
          <button class="mz-cond-add mz-morte-btn" data-acao="resolver-morte" ${ds}
                  title="Resolver a sorte da criatura caída (Ameaças de Arton)">💀 Resolver</button>${resultado}
        </div>
      </div>`;
  }

  // ── FERRAMENTA: CRÍTICOS (efeitos & falhas, regras opcionais) ────
  // Rola Efeitos Críticos (Tab. 4-3/4-4) e Falhas Críticas (Tab. 4-6).
  // Os selects usam data-campo (salvos pelo handler genérico, sem render);
  // os botões disparam a rolagem. O <details> abre sozinho quando há
  // resultado, para que a rolagem (que re-renderiza) fique visível.
  function critResultadoHTML(cr, ds) {
    const r = cr.ultimoCritico;
    if (!r) return '';
    const cls = r.kind === 'falha' ? 'mz-crit-res--falha' : 'mz-crit-res--efeito';
    let acao = '';
    if (r.cond && r.cond.length && !r.aplicada) {
      const nomes = r.cond.map(ch => (COND_POR_CHAVE[ch] || {}).nome || ch).join(' + ');
      acao = `<button class="mz-crit-aplicar" data-acao="aplicar-cond-critico" ${ds}
                title="Adicionar à ficha como condição">＋ aplicar ${esc(nomes)}</button>`;
    } else if (r.aplicada) {
      acao = `<span class="mz-crit-aplicada">✓ condição aplicada</span>`;
    }
    return `
        <div class="mz-crit-res ${cls}">
          <button class="mz-cond-x mz-crit-x" data-acao="limpar-critico" ${ds} title="Limpar resultado">✕</button>
          <div class="mz-crit-res-cab">${esc(r.cab)}</div>
          <div class="mz-crit-res-rol">${r.rol}</div>
          <div class="mz-crit-res-efeito">${esc(r.efeito)}</div>
          ${acao}
        </div>`;
  }

  function construirBarraCriticos(cr, ds) {
    const G = window.GA_CRITICOS;
    if (!G) return '';
    const sel = (campo, opcoes, atual) =>
      `<select class="mz-crit-sel" data-campo="${campo}" ${ds} title="Salvo na ficha">` +
      opcoes.map(o => `<option value="${esc(o.key)}"${o.key === atual ? ' selected' : ''}>${esc(o.rot)}</option>`).join('') +
      `</select>`;
    return `
      <details class="mz-ferr mz-crit"${cr.ultimoCritico ? ' open' : ''}>
        <summary class="mz-ferr-sum">🎲 Críticos — efeitos &amp; falhas</summary>
        <div class="mz-ferr-corpo">
          <div class="mz-ferr-linha">
            <span class="mz-ferr-lbl">Dano</span>
            ${sel('critTipo', G.TIPO_OPCOES, cr.critTipo || 'corte')}
            ${sel('critMult', G.MULT_OPCOES, cr.critMult || 'x2')}
          </div>
          <div class="mz-ferr-linha">
            <span class="mz-ferr-lbl">Local</span>
            ${sel('critLocal', G.LOCAL_OPCOES, cr.critLocal || '')}
            <button type="button" class="mz-ferr-add" data-acao="rolar-efeito-critico" ${ds}
                    title="Rola localização (1d10) + severidade (1d10 + multiplicador) e mostra o efeito">🎯 Efeito</button>
          </div>
          <div class="mz-ferr-linha">
            <span class="mz-ferr-lbl">Falha</span>
            <button type="button" class="mz-ferr-add" data-acao="rolar-falha-critica" ${ds}
                    title="Rola 1d100 na tabela de Falhas Críticas">💥 Falha (1d100)</button>
          </div>
          ${critResultadoHTML(cr, ds)}
          <p class="mz-ferr-nota">Severidade: 1d10 +0/+2/+3/+4 conforme ×2/×3/×4/×5+. Local em branco = 1d10 (use um fixo para Ataques Mirados). Energia = ácido, eletricidade, essência, fogo, frio, psíquico (sempre cabeça) e trevas. · T20, Tab. 4-3/4-4/4-6.</p>
        </div>
      </details>`;
  }

  // ── BARRA: HABILIDADES GERAIS (abaixo de "Condições especiais") ─
  function construirBarraHabilidades(cr, ds) {
    const arr = Array.isArray(cr.habilidades) ? cr.habilidades : [];
    let chips = '';
    arr.forEach(ch => {
      const item = HAB_POR_CHAVE[ch];
      if (item) chips += _chipHtml(item, '#6e5a44', 'rem-habilidade', ds);
    });
    return `
      <div class="mz-condicoes mz-condicoes--sub">
        <span class="mz-cond-titulo">Habilidades gerais · consulta</span>
        <div class="mz-cond-lista">
          ${chips}
          ${arr.length === 0 ? '<span class="mz-cond-nenhuma">nenhuma</span>' : ''}
          <button class="mz-cond-add" data-acao="abrir-habilidade" ${ds}>＋ Habilidade</button>
        </div>
      </div>`;
  }

  // ── BARRA: SENTIDOS (abaixo de "Tags · sentidos") ────────────────
  function construirBarraSentidos(cr, ds) {
    const arr = Array.isArray(cr.sentidos) ? cr.sentidos : [];
    let chips = '';
    arr.forEach(ch => {
      const item = SENTIDO_POR_CHAVE[ch];
      if (item) chips += _chipHtml(item, '#1f7a6b', 'rem-sentido', ds);
    });
    return `
      <div class="mz-condicoes mz-condicoes--sub">
        <span class="mz-cond-titulo">Sentidos · consulta</span>
        <div class="mz-cond-lista">
          ${chips}
          ${arr.length === 0 ? '<span class="mz-cond-nenhuma">nenhum</span>' : ''}
          <button class="mz-cond-add" data-acao="abrir-sentido" ${ds}>＋ Sentido</button>
        </div>
      </div>`;
  }

  // Bloco "🐎 Montaria" da criatura: escolhe uma montaria (de window.MONTARIAS,
  // agrupada por fonte) e o nível (iniciante/veterano/mestre), mostrando o
  // benefício correspondente. Ex.: um necromante num Cavalo Esqueleto.
  function construirBlocoMontaria(cr, ds) {
    const monts = window.MONTARIAS || [];
    const m = cr.montaria || { chave: '', nivel: 'iniciante' };
    if (!monts.length) return '';

    const fontes = [];
    monts.forEach(x => { if (fontes.indexOf(x.fonte) < 0) fontes.push(x.fonte); });
    let opts = `<option value="">— sem montaria —</option>`;
    fontes.forEach(f => {
      let o = '';
      monts.filter(x => x.fonte === f).forEach(x => {
        o += `<option value="${esc(x.nome)}" ${x.nome === m.chave ? 'selected' : ''}>${esc(x.nome)}${x.tamanho ? ' (' + esc(x.tamanho) + ')' : ''}</option>`;
      });
      opts += `<optgroup label="${esc(f)}">${o}</optgroup>`;
    });
    const niveis = [['iniciante', 'Iniciante'], ['veterano', 'Veterano'], ['mestre', 'Mestre']]
      .map(([v, r]) => `<option value="${v}" ${m.nivel === v ? 'selected' : ''}>${r}</option>`).join('');

    // Benefícios: mostra o do nível escolhido E o de todos os níveis abaixo —
    // efeitos de níveis menores continuam valendo (ex.: num parceiro Mestre,
    // os benefícios de Iniciante e Veterano ainda podem ser usados).
    let detalhe = '';
    if (m.chave) {
      const def = monts.find(x => x.nome === m.chave);
      if (def) {
        const escala = [
          ['iniciante', 'Iniciante', def.ini],
          ['veterano',  'Veterano',  def.vet],
          ['mestre',    'Mestre',    def.mes],
        ];
        const ate = Math.max(0, escala.findIndex(n => n[0] === m.nivel));
        const linhas = escala.slice(0, ate + 1).map(([nv, rot, txt]) => `
          <div class="mz-mont-beneficio${nv === m.nivel ? ' mz-mont-beneficio--ativo' : ''}">
            <span class="mz-mont-nivel-rot">${rot}</span>
            <span class="mz-mont-txt">${esc(txt || '—')}</span>
          </div>`).join('');
        detalhe = `${linhas}
          ${def.obs ? `<div class="mz-mont-obs">${esc(def.obs)}</div>` : ''}`;
      }
    }

    return `
      <div class="mz-mont">
        <div class="mz-mont-linha">
          <span class="mz-mont-icone" title="Montaria da criatura">🐎</span>
          <select class="mz-mont-sel" data-campo="montaria-chave" ${ds} title="Montaria da criatura">${opts}</select>
          <select class="mz-mont-nivel" data-campo="montaria-nivel" ${ds} title="Nível da montaria" ${m.chave ? '' : 'disabled'}>${niveis}</select>
        </div>
        ${detalhe}
      </div>`;
  }

  // ── FERRAMENTA "ARMAS NATURAIS & DESARMADO" (na ficha) ───────────
  // Detecta o tamanho a partir do texto livre de "Tipo e tamanho".
  function detectarTamanho(txt) {
    const t = String(txt || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
    if (/minuscul/.test(t)) return 'Minúsculo';
    if (/pequen/.test(t))   return 'Pequeno';
    if (/grande/.test(t))   return 'Grande';
    if (/enorme/.test(t))   return 'Enorme';
    if (/colossal/.test(t)) return 'Colossal';
    if (/medi/.test(t))     return 'Médio';
    return 'Médio';
  }
  // "+23" / "23" / "-2" → "+23" / "+23" / "-2". Vazio ou inválido → ''.
  function normalizarMod(v) {
    const m = String(v == null ? '' : v).trim().replace(/\s+/g, '').match(/^([+-]?)(\d+)$/);
    if (!m) return '';
    return (m[1] === '-' ? '-' : '+') + parseInt(m[2], 10);
  }
  // <details> recolhível abaixo da caixa de ataques. Os selects/inputs NÃO
  // levam data-campo (logo o salvador de campos os ignora); só os botões
  // carregam o ds, para localizar a criatura no clique.
  function construirFerramentasAtaque(cr, ds) {
    const tamDet = detectarTamanho(cr.tipoTamanho);
    const optTam = TAMANHOS.map(t =>
      `<option value="${t}"${t === tamDet ? ' selected' : ''}>${t}</option>`).join('');
    const optArma = ARMAS_NATURAIS.map(a =>
      `<option value="${esc(a.nome)}">${esc(a.nome)} — ${esc(a.tipo)}</option>`).join('');
    return `
          <details class="mz-ferr">
            <summary class="mz-ferr-sum">🦴 Armas naturais &amp; desarmado</summary>
            <div class="mz-ferr-corpo">
              <div class="mz-ferr-linha">
                <span class="mz-ferr-lbl">Tamanho</span>
                <select class="mz-ferr-tam" title="Detectado de 'Tipo e tamanho' — ajuste se preciso">${optTam}</select>
              </div>
              <div class="mz-ferr-linha">
                <span class="mz-ferr-lbl">Arma natural</span>
                <select class="mz-ferr-arma">${optArma}</select>
                <button type="button" class="mz-ferr-add" data-acao="inserir-arma-natural" ${ds}
                        title="Insere o ataque na caixa, com o dado conforme o tamanho">＋ inserir</button>
              </div>
              <div class="mz-ferr-linha">
                <span class="mz-ferr-lbl">Desarmado</span>
                <input type="text" class="mz-ferr-mod"   inputmode="numeric" placeholder="ataque (+23)" title="Modificador do ataque principal">
                <input type="text" class="mz-ferr-bonus" inputmode="numeric" placeholder="dano (+14)"   title="Bônus de dano do ataque principal (opcional)">
                <button type="button" class="mz-ferr-add" data-acao="inserir-desarmado" ${ds}
                        title="Mesmo modificador do ataque principal, 1d3 + bônus, ajustado pelo tamanho">＋ inserir</button>
              </div>
              <p class="mz-ferr-nota">Arma natural: 1d6 base (Peq/Méd) ajustado por tamanho · Desarmado: 1d3 base + bônus, impacto não letal · Ameaças de Arton, Tab. 2-1.</p>
            </div>
          </details>`;
  }
  // Monta a linha de ataque a partir dos controles do painel e a anexa à
  // caixa de ataques. Sem re-render (como o veic-pv): mantém o painel
  // aberto para inserir vários em sequência. A caixa guarda HTML (1 <div>
  // por linha). A outra cópia da ficha (painel de combate) ressincroniza
  // no próximo render — a ferramenta só aparece na lista, então é raro.
  function inserirAtaqueCalculado(btn, acao) {
    const card = btn.closest('.mz-criatura');
    const ferr = btn.closest('.mz-ferr');
    if (!card || !ferr) return;
    const elTam = ferr.querySelector('.mz-ferr-tam');
    const tam = (elTam && elTam.value) || 'Médio';
    let linha;
    if (acao === 'inserir-arma-natural') {
      const elArma = ferr.querySelector('.mz-ferr-arma');
      const arma = ARMAS_NATURAIS.find(a => a.nome === (elArma && elArma.value));
      if (!arma) return;
      linha = `${arma.nome} (${arma.tipo}) ${DADO_ARMA_NATURAL[tam] || '1d6'}`;
    } else {
      const elMod = ferr.querySelector('.mz-ferr-mod');
      const mod = normalizarMod(elMod && elMod.value);
      if (!mod) { if (elMod) elMod.focus(); return; }   // exige o modificador
      const bonus = normalizarMod((ferr.querySelector('.mz-ferr-bonus') || {}).value);
      const bonusTxt = (bonus && bonus !== '+0') ? bonus : '';
      linha = `Desarmado ${mod} (${DADO_DESARMADO[tam] || '1d3'}${bonusTxt}, impacto não letal)`;
    }
    const caixa = card.querySelector('.mz-ataques[data-campo="ataques"]');
    if (!caixa) return;
    const atual = caixa.innerHTML.trim();
    caixa.innerHTML = (atual ? atual : '') + `<div>${esc(linha)}</div>`;
    const cr = pegarCriatura(btn);
    if (cr) { cr.ataques = caixa.innerHTML; salvar(); }
    caixa.classList.remove('mz-ferr-flash');
    void caixa.offsetWidth;                 // reinicia a animação se repetir
    caixa.classList.add('mz-ferr-flash');
  }

  // ── DEVOTO & PODERES CONCEDIDOS (dados de js/devotos-data.js) ────
  // Bloco fixo da ficha quando cr.devoto está marcado: diz de quem a
  // criatura é devota e mostra como ela age (Crenças) e o que lhe é
  // proibido (Obrigações & Restrições). Aparece na lista E no painel.
  function construirBlocoDevoto(cr, ds) {
    const G = window.GA_DEVOTOS;
    if (!G || !cr.devoto) return '';
    const d = G.deusPorChave[cr.devoto];
    if (!d) return '';
    return `
          <div class="mz-devoto">
            <div class="mz-devoto-cab">
              <span class="mz-devoto-icone" title="Criatura devota">🙏</span>
              <span class="mz-devoto-titulo">Devoto de <strong>${esc(d.nome)}</strong> ${d.icone} · ${esc(d.titulo)}</span>
              <button class="mz-cond-x" data-acao="devoto-remover" ${ds} title="Remover devoção">✕</button>
            </div>
            <details class="mz-devoto-det">
              <summary>Como age (Crenças) &amp; o que é proibido (Obrigações &amp; Restrições)</summary>
              <div class="mz-devoto-corpo">
                <p><strong>Crenças &amp; Objetivos.</strong> ${esc(d.crencas)}</p>
                <p><strong>Obrigações &amp; Restrições.</strong> ${esc(d.obrigacoes)}</p>
                <p class="mz-devoto-meta">Símbolo sagrado: ${esc(d.simbolo)} · Canalizar energia: ${esc(d.energia)} · Arma preferida: ${esc(d.arma)}.</p>
                <p class="mz-devoto-meta">Se violar as O&amp;R: perde todos os PM e só os recupera a partir do próximo dia; nova violação na mesma aventura exige penitência (perícia Religião).</p>
              </div>
            </details>
          </div>`;
  }

  // options do seletor de poder concedido para um deus ('' => instrução)
  function _opcoesPoderHtml(deusChave) {
    const G = window.GA_DEVOTOS;
    if (!G || !deusChave || !G.deusPorChave[deusChave]) {
      return '<option value="">— primeiro escolha o deus —</option>';
    }
    let html = '<option value="">— escolha o poder —</option>' +
               '<option value="~sortear">🎲 Sortear um poder do deus</option>';
    G.poderesDoDeus(deusChave).forEach(p => {
      html += `<option value="${p.chave}">${esc(p.nome)}${p.magica ? ' ✨' : ''}</option>`;
    });
    return html;
  }

  // Linha HTML de um poder concedido (para a caixa de Ataque e Habilidades)
  function _linhaPoderHtml(p, d) {
    const origem = 'poder concedido de ' + d.nome + (p.magica ? ' · habilidade mágica' : '');
    return `<div><strong>${esc(p.nome)} (${esc(origem)})</strong> ${_txtParaHtml(p.texto)}</div>`;
  }

  // Ferramenta "Devoto & poder concedido" — só na lista, junto das
  // ferramentas de ataque. Selects sem data-campo (o salvador de campos
  // os ignora); o select de deus repopula o de poder via aoDigitar.
  function construirFerramentaDevoto(cr, ds) {
    const G = window.GA_DEVOTOS;
    if (!G) return '';
    const optDeus = ['<option value="">— escolha o deus —</option>']
      .concat(G.deuses.map(d =>
        `<option value="${d.chave}"${d.chave === cr.devoto ? ' selected' : ''}>${d.icone} ${esc(d.nome)} — ${esc(d.titulo)}</option>`))
      .join('');
    return `
          <details class="mz-ferr mz-ferr--devoto">
            <summary class="mz-ferr-sum">🙏 Devoto &amp; poder concedido</summary>
            <div class="mz-ferr-corpo">
              <div class="mz-ferr-linha">
                <span class="mz-ferr-lbl">Deus</span>
                <select class="mz-dev-deus" title="Deuses do Panteão — consulte a sub-aba 🙏 Poderes Concedidos">${optDeus}</select>
                <button type="button" class="mz-ferr-add" data-acao="devoto-marcar" ${ds}
                        title="Marca a criatura como devota — a ficha ganha o bloco com Crenças e Obrigações & Restrições do deus">🙏 marcar devoto</button>
              </div>
              <div class="mz-ferr-linha">
                <span class="mz-ferr-lbl">Poder</span>
                <select class="mz-dev-poder" ${cr.devoto ? '' : 'disabled'}>${_opcoesPoderHtml(cr.devoto)}</select>
                <button type="button" class="mz-ferr-add" data-acao="inserir-poder-concedido" ${ds}
                        title="Insere o texto completo do poder na caixa de Ataque e Habilidades">＋ inserir</button>
              </div>
              <p class="mz-ferr-nota">Pré-requisito: ser devoto do deus indicado (atributo-chave Sabedoria) · ✨ = habilidade mágica · Violar as O&amp;R: perde todos os PM até o próximo dia.</p>
            </div>
          </details>`;
  }

  // Insere o texto do poder escolhido na caixa de ataques/habilidades.
  // Sem re-render (como o inserirAtaqueCalculado): o painel fica aberto
  // para inserir vários poderes em sequência.
  function inserirPoderConcedido(btn) {
    const G = window.GA_DEVOTOS;
    const card = btn.closest('.mz-criatura');
    const ferr = btn.closest('.mz-ferr');
    if (!G || !card || !ferr) return;
    const selDeus  = ferr.querySelector('.mz-dev-deus');
    const selPoder = ferr.querySelector('.mz-dev-poder');
    const d = G.deusPorChave[(selDeus && selDeus.value) || ''];
    if (!d) { if (selDeus) selDeus.focus(); return; }
    let chave = (selPoder && selPoder.value) || '';
    if (chave === '~sortear') {
      const lista = G.poderesDoDeus(d.chave);
      chave = lista.length ? lista[Math.floor(Math.random() * lista.length)].chave : '';
    }
    const p = G.poderPorChave[chave];
    if (!p) { if (selPoder) selPoder.focus(); return; }
    const caixa = card.querySelector('.mz-ataques[data-campo="ataques"]');
    if (!caixa) return;
    caixa.innerHTML = caixa.innerHTML.trim() + _linhaPoderHtml(p, d);
    const cr = pegarCriatura(btn);
    if (cr) { cr.ataques = caixa.innerHTML; salvar(); }
    caixa.classList.remove('mz-ferr-flash');
    void caixa.offsetWidth;
    caixa.classList.add('mz-ferr-flash');
  }

  function construirCriatura(cr, si, ci, cri, total, painel) {
    const ds = `data-s="${si}" data-c="${ci}" data-cr="${cri}"`;
    // No painel a ficha usa um estado próprio (cr.painelAberto), aberto por padrão.
    const aberto = painel ? (cr.painelAberto !== false) : cr.aberto;

    // grade de atributos Padrão / Atual
    let statsHtml = '';
    STATS.forEach(st => {
      const v = cr.stats[st.chave] || { padrao: '', atual: '' };
      const largura = st.grande ? 'mz-stat--grande' : (st.medio ? 'mz-stat--medio' : '');

      // botão de dado (só para perícias roláveis)
      const dado = (sub) => st.rolavel
        ? `<button class="mz-dado" data-acao="rolar" data-stat="${st.chave}" data-sub="${sub}" ${ds}
                   title="Rolar 1d20 + ${st.rotulo} (${sub})">🎲</button>`
        : '';

      statsHtml += `
        <div class="mz-stat ${largura}">
          <div class="mz-stat-rotulo">${st.rotulo}</div>
          <div class="mz-stat-linha">
            <span>Padrão</span>
            <input type="text" value="${esc(v.padrao)}"
                   data-campo="stat" data-stat="${st.chave}" data-sub="padrao" ${ds}>
            ${dado('padrao')}
          </div>
          <div class="mz-stat-linha mz-stat-linha--atual">
            <span>Atual</span>
            <input type="text" value="${esc(v.atual)}"
                   data-campo="stat" data-stat="${st.chave}" data-sub="atual" ${ds}>
            ${dado('atual')}
          </div>
        </div>`;
    });

    // caixas de texto livre
    let caixasHtml = '';
    CAIXAS.forEach(cx => {
      if (cx.chave === 'condicoes') return; // condições vai antes (ver abaixo)
      caixasHtml += `
        <div class="mz-campo">
          <label class="mz-rotulo">${cx.rotulo}</label>
          ${caixaTextoSimples(cx.chave, cr[cx.chave], ds, cx.linhas, cx.dica)}
        </div>`;
    });
    const condicoes = CAIXAS.find(c => c.chave === 'condicoes');

    // botões de mover a criatura para cima / para baixo dentro da cena
    const semSubir = (cri === 0)         ? 'disabled' : '';
    const semDescer = (cri === total - 1) ? 'disabled' : '';

    // botões do cabeçalho — no painel, a ficha não recolhe nem se move
    const fixada = dados.painel.indexOf(cr.id) >= 0;
    const botoesLista = painel ? '' : `
          <button class="mz-fixar ${fixada ? 'mz-fixar--ativo' : ''}" data-acao="fixar-criatura" ${ds}
                  title="${fixada ? 'Tirar do painel de combate' : 'Fixar no painel de combate'}">◫</button>
          <button class="mz-mover" data-acao="subir-criatura" ${ds} ${semSubir} title="Mover para cima">↑</button>
          <button class="mz-mover" data-acao="descer-criatura" ${ds} ${semDescer} title="Mover para baixo">↓</button>
          <button class="mz-del" data-acao="del-criatura" ${ds} title="Remover criatura">✕</button>`;
    const toggleHtml = painel
      ? `<button class="mz-toggle" data-acao="toggle-criatura-painel" ${ds} title="Expandir / recolher detalhes">
            ${aberto ? '▾' : '▸'}
          </button>`
      : `<button class="mz-toggle" data-acao="toggle-criatura" ${ds} title="Expandir / recolher">
            ${aberto ? '▾' : '▸'}
          </button>`;

    return `
      <div class="mz-criatura ${aberto ? 'mz-aberto' : ''} ${painel ? 'mz-criatura--painel' : ''} ${cr.statusMorte && !cr.statusMorte.vivo ? 'mz-criatura--morta' : ''}">
        <div class="mz-criatura-cabecalho">
          ${toggleHtml}
          <input class="mz-nome mz-nome--criatura" type="text" value="${esc(cr.nome)}"
                 data-campo="nome" ${ds} placeholder="Nome da criatura">
          <input class="mz-nd" type="text" value="${esc(cr.nd)}"
                 data-campo="nd" ${ds}
                 title="Nível de Desafio (ND)" placeholder="ND">
          <input class="mz-init" type="text" value="${esc(cr.iniciativaCombate)}"
                 data-campo="iniciativaCombate" ${ds}
                 title="Iniciativa rolada (anote o valor)" placeholder="Ini">${botoesLista}
        </div>

        <div class="mz-criatura-corpo">

          ${construirBarraCondicoes(cr, ds)}

          ${construirBarraMorte(cr, ds)}

          ${construirBarraCriticos(cr, ds)}

          ${construirBlocoDevoto(cr, ds)}

          <div class="mz-campo">
            <label class="mz-rotulo">Tipo e tamanho</label>
            <input class="mz-input" type="text" value="${esc(cr.tipoTamanho)}"
                   placeholder="Ex: Monstro (dragão) Enorme"
                   data-campo="tipoTamanho" ${ds}>
          </div>

          ${construirBarraTipo(cr, ds)}

          <div class="mz-campo">
            <label class="mz-rotulo">Tags · sentidos</label>
            <input class="mz-input" type="text" value="${esc(cr.tags)}"
                   placeholder="Ex: percepção às cegas, visão no escuro, faro…"
                   data-campo="tags" ${ds}>
          </div>

          ${construirBarraSentidos(cr, ds)}

          ${construirBlocoMontaria(cr, ds)}

          <div class="mz-stats-grade">
            ${statsHtml}
          </div>

          <div class="mz-campo">
            <label class="mz-rotulo">${condicoes.rotulo}</label>
            ${caixaTextoSimples('condicoes', cr.condicoes, ds, condicoes.linhas, condicoes.dica)}
          </div>

          ${construirBarraHabilidades(cr, ds)}

          <div class="mz-campo">
            <label class="mz-rotulo">Ataque e Habilidades</label>
            ${barraGrifo(ds)}
            <div class="mz-ataques" contenteditable="true" spellcheck="false"
                 data-campo="ataques" ${ds}>${cr.ataques || ''}</div>
          </div>

          ${painel ? '' : construirFerramentasAtaque(cr, ds) + construirFerramentaDevoto(cr, ds)}

          ${caixasHtml}

        </div>
      </div>`;
  }

  // ── CARD DE PERIGO COMPLEXO ──────────────────────────────────────
  // Reaproveita o visual da ficha de criatura (mz-criatura) com um
  // tema próprio (mz-perigo). Campos: Objetivo (linha), Efeito e Ações
  // (caixas de texto rico, grifáveis) e Descrição (texto simples).
  function construirPerigo(pg, si, ci, pi, total, painel) {
    const ds = `data-s="${si}" data-c="${ci}" data-pg="${pi}"`;
    const aberto = painel ? (pg.painelAberto !== false) : pg.aberto;

    const semSubir  = (pi === 0)         ? 'disabled' : '';
    const semDescer = (pi === total - 1) ? 'disabled' : '';

    const fixada = dados.painel.indexOf(pg.id) >= 0;
    const botoesLista = painel ? '' : `
          <button class="mz-fixar ${fixada ? 'mz-fixar--ativo' : ''}" data-acao="fixar-perigo" ${ds}
                  title="${fixada ? 'Tirar do painel de combate' : 'Fixar no painel de combate'}">◫</button>
          <button class="mz-mover" data-acao="subir-perigo" ${ds} ${semSubir} title="Mover para cima">↑</button>
          <button class="mz-mover" data-acao="descer-perigo" ${ds} ${semDescer} title="Mover para baixo">↓</button>
          <button class="mz-del" data-acao="del-perigo" ${ds} title="Remover perigo">✕</button>`;
    const toggleHtml = painel
      ? `<button class="mz-toggle" data-acao="toggle-perigo-painel" ${ds} title="Expandir / recolher detalhes">
            ${aberto ? '▾' : '▸'}
          </button>`
      : `<button class="mz-toggle" data-acao="toggle-perigo" ${ds} title="Expandir / recolher">
            ${aberto ? '▾' : '▸'}
          </button>`;

    // caixa de texto rico com barra de grifo (igual à de ataques)
    const caixaRica = (campo, rotulo, conteudo) => `
          <div class="mz-campo">
            <label class="mz-rotulo">${rotulo}</label>
            ${barraGrifo(ds)}
            <div class="mz-ataques" contenteditable="true" spellcheck="false"
                 data-campo="${campo}" ${ds}>${conteudo || ''}</div>
          </div>`;

    return `
      <div class="mz-criatura mz-perigo ${aberto ? 'mz-aberto' : ''} ${painel ? 'mz-criatura--painel' : ''}">
        <div class="mz-criatura-cabecalho mz-perigo-cabecalho">
          ${toggleHtml}
          <span class="mz-perigo-icone" title="Perigo complexo">⚠</span>
          <input class="mz-nome mz-nome--criatura" type="text" value="${esc(pg.nome)}"
                 data-campo="pg-nome" ${ds} placeholder="Nome do perigo">
          <input class="mz-nd" type="text" value="${esc(pg.nd)}"
                 data-campo="pg-nd" ${ds} title="Nível de Desafio (ND)" placeholder="ND">${botoesLista}
        </div>

        <div class="mz-criatura-corpo">
          ${pg.fonte ? `<div class="mz-perigo-fonte">Fonte · ${esc(pg.fonte)}</div>` : ''}

          <div class="mz-campo">
            <label class="mz-rotulo">Objetivo</label>
            <input class="mz-input" type="text" value="${esc(pg.objetivo)}"
                   placeholder="O que o grupo precisa fazer para superar o perigo"
                   data-campo="pg-objetivo" ${ds}>
          </div>

          ${caixaRica('efeito', 'Efeito', pg.efeito)}
          ${caixaRica('acoes', 'Ações dos personagens', pg.acoes)}

          <div class="mz-campo">
            <label class="mz-rotulo">Descrição / abertura</label>
            ${caixaTextoSimples('pg-descricao', pg.descricao, ds, 3, 'Texto de abertura para narrar a cena…')}
          </div>
        </div>
      </div>`;
  }

  // ═══════════════════════════════════════════════════════════════
  //  EVENTOS
  // ═══════════════════════════════════════════════════════════════

  // ── CLIQUES (adicionar / remover / recolher) ─────────────────────
  function aoClicar(e) {
    const alvo = e.target.closest('[data-acao]');
    if (!alvo) return;
    const acao = alvo.dataset.acao;

    if (acao === 'alternar-visao') {
      dados.modoPainel = !dados.modoPainel;
      salvar(); render(); return;
    }

    // ── navegação rápida ──
    if (acao === 'expandir-tudo' || acao === 'recolher-tudo') {
      const v = (acao === 'expandir-tudo');
      dados.sessoes.forEach(s => { s.aberto = v; s.cenas.forEach(c => { c.aberto = v; }); });
      salvar(); render(); return;
    }
    if (acao === 'toggle-indice') {
      indiceAberto = !indiceAberto;
      render(); return;   // estado efêmero — não precisa salvar
    }
    if (acao === 'ir-sessao' || acao === 'ir-cena') {
      const s = dados.sessoes.find(x => x.id === alvo.dataset.sid);
      if (s) s.aberto = true;
      let alvoId = 'mzs-' + alvo.dataset.sid;
      if (acao === 'ir-cena' && s) {
        const c = s.cenas.find(x => x.id === alvo.dataset.cid);
        if (c) { c.aberto = true; alvoId = 'mzc-' + alvo.dataset.cid; }
      }
      salvar(); render();
      const el = document.getElementById(alvoId);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    if (acao === 'fixar-criatura') {
      _alternarFixado(pegarCriatura(alvo).id);
      salvar(); render(); return;
    }
    if (acao === 'fixar-perigo') {
      _alternarFixado(pegarPerigo(alvo).id);
      salvar(); render(); return;
    }
    if (acao === 'add-quadrado') {
      dados.painel.push(null);
      salvar(); render(); return;
    }
    if (acao === 'rem-quadrado') {
      dados.painel.splice(+alvo.dataset.slot, 1);
      salvar(); render(); return;
    }

    if (acao === 'add-sessao') {
      dados.sessoes.push(novaSessao(dados.sessoes.length + 1));
      salvar(); render(); return;
    }
    if (acao === 'add-cena') {
      const s = pegarSessao(alvo);
      s.cenas.push(novaCena(s.cenas.length + 1));
      salvar(); render(); return;
    }
    if (acao === 'add-criatura') {
      pegarCena(alvo).criaturas.push(novaCriatura());
      salvar(); render(); return;
    }
    if (acao === 'importar-ficha') {
      abrirModalImportar(+alvo.dataset.s, +alvo.dataset.c);
      return;
    }
    if (acao === 'abrir-perigos') {
      abrirModalPerigos(+alvo.dataset.s, +alvo.dataset.c);
      return;
    }
    if (acao === 'abrir-npcs') {
      abrirModalNPCs(+alvo.dataset.s, +alvo.dataset.c);
      return;
    }
    if (acao === 'abrir-ambientes') {
      abrirModalAmbientes({ tipo: 'cena', s: +alvo.dataset.s, c: +alvo.dataset.c });
      return;
    }
    if (acao === 'abrir-ambientes-painel') {
      abrirModalAmbientes({ tipo: 'painel' });
      return;
    }
    if (acao === 'ver-ambiente') {
      if (alvo.dataset.painel) { verAmbiente(alvo.dataset.key, { tipo: 'painel' }); return; }
      const s = alvo.dataset.s, c = alvo.dataset.c;
      if (s != null && c != null) verAmbiente(alvo.dataset.key, { tipo: 'cena', s: +s, c: +c });
      else verAmbiente(alvo.dataset.key, null);
      return;
    }
    if (acao === 'rem-ambiente') {
      const cena = pegarCena(alvo);
      if (Array.isArray(cena.ambientes)) {
        const i = cena.ambientes.findIndex(a => a.key === alvo.dataset.key);
        if (i >= 0) cena.ambientes.splice(i, 1);
      }
      salvar(); render(); return;
    }
    if (acao === 'rem-ambiente-painel') {
      const i = dados.painelAmbientes.findIndex(a => a.key === alvo.dataset.key);
      if (i >= 0) dados.painelAmbientes.splice(i, 1);
      salvar(); render(); return;
    }
    if (acao === 'trazer-ambientes-cena') {
      const ref = cenaNarradaRef();
      if (!ref) return;
      const novos = ambientesDaCena(ref.si, ref.ci);
      if (!novos.length) { alert('Esta cena não tem ambientes marcados.'); return; }
      if (dados.painelAmbientes.length &&
          !confirm('Substituir os ambientes em jogo pelos ' + novos.length + ' desta cena? (As cenas não são afetadas.)')) return;
      dados.painelAmbientes = novos;
      salvar(); render(); return;
    }
    if (acao === 'toggle-combate-viagem') {
      dados.combateViagem = !dados.combateViagem;
      salvar(); render(); return;
    }
    if (acao === 'veic-pv-menos' || acao === 'veic-pv-mais') {
      if (window.GA_Viagem && dados.combateViagemId) {
        const f = window.GA_Viagem.fichaTransporte(dados.combateViagemId);
        if (f) window.GA_Viagem.setVeiculoPV(dados.combateViagemId, f.pvAtual + (acao === 'veic-pv-mais' ? 1 : -1));
      }
      return;   // o evento ga-veiculo-pv atualiza o campo (sem re-render, mantém foco/scroll)
    }
    if (acao === 'exportar-json') { exportarBackupMonstros(); return; }
    if (acao === 'exportar-txt')  { exportarTextoMonstros();  return; }
    if (acao === 'importar-backup') {
      const inp = document.getElementById('mzImportFile');
      if (inp) inp.click();
      return;
    }

    if (acao === 'subir-sessao' || acao === 'descer-sessao') {
      const arr = dados.sessoes;
      const i = +alvo.dataset.s;
      const j = (acao === 'subir-sessao') ? i - 1 : i + 1;
      if (j < 0 || j >= arr.length) return;
      const tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
      salvar(); render(); return;
    }

    if (acao === 'subir-cena' || acao === 'descer-cena') {
      const arr = pegarSessao(alvo).cenas;
      const i = +alvo.dataset.c;
      const j = (acao === 'subir-cena') ? i - 1 : i + 1;
      if (j < 0 || j >= arr.length) return;
      const tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
      salvar(); render(); return;
    }

    if (acao === 'subir-criatura' || acao === 'descer-criatura') {
      const arr = pegarCena(alvo).criaturas;
      const i = +alvo.dataset.cr;
      const j = (acao === 'subir-criatura') ? i - 1 : i + 1;
      if (j < 0 || j >= arr.length) return;
      const tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
      salvar(); render(); return;
    }

    if (acao === 'subir-perigo' || acao === 'descer-perigo') {
      const arr = pegarCena(alvo).perigos;
      const i = +alvo.dataset.pg;
      const j = (acao === 'subir-perigo') ? i - 1 : i + 1;
      if (j < 0 || j >= arr.length) return;
      const tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
      salvar(); render(); return;
    }

    if (acao === 'rolar') {
      rolarPericia(alvo);
      return;
    }
    if (acao === 'limpar-log') {
      if (dados.log.length && !confirm('Limpar todas as rolagens do log?')) return;
      dados.log = [];
      salvar(); renderLog(); return;
    }

    if (acao === 'abrir-condicoes') {
      abrirModalCondicoes(+alvo.dataset.s, +alvo.dataset.c, +alvo.dataset.cr);
      return;
    }
    if (acao === 'rem-condicao') {
      const cr = pegarCriatura(alvo);
      const i = cr.condicoesAtivas.indexOf(alvo.dataset.cond);
      if (i >= 0) cr.condicoesAtivas.splice(i, 1);
      salvar(); render(); return;
    }

    if (acao === 'abrir-tipo') {
      abrirModalLista(+alvo.dataset.s, +alvo.dataset.c, +alvo.dataset.cr, 'tipo');
      return;
    }
    if (acao === 'abrir-habilidade') {
      abrirModalLista(+alvo.dataset.s, +alvo.dataset.c, +alvo.dataset.cr, 'habilidade');
      return;
    }
    if (acao === 'abrir-sentido') {
      abrirModalLista(+alvo.dataset.s, +alvo.dataset.c, +alvo.dataset.cr, 'sentido');
      return;
    }
    if (acao === 'rem-tipo') {
      pegarCriatura(alvo).tipoCriatura = '';
      salvar(); render(); return;
    }
    if (acao === 'rem-habilidade') {
      const cr = pegarCriatura(alvo);
      const i = cr.habilidades.indexOf(alvo.dataset.chave);
      if (i >= 0) cr.habilidades.splice(i, 1);
      salvar(); render(); return;
    }
    if (acao === 'rem-sentido') {
      const cr = pegarCriatura(alvo);
      const i = cr.sentidos.indexOf(alvo.dataset.chave);
      if (i >= 0) cr.sentidos.splice(i, 1);
      salvar(); render(); return;
    }

    if (acao === 'del-sessao') {
      if (!confirm('Remover esta sessão e tudo dentro dela?')) return;
      dados.sessoes.splice(+alvo.dataset.s, 1);
      salvar(); render(); return;
    }
    if (acao === 'del-cena') {
      if (!confirm('Remover esta cena e suas criaturas?')) return;
      pegarSessao(alvo).cenas.splice(+alvo.dataset.c, 1);
      salvar(); render(); return;
    }
    if (acao === 'del-criatura') {
      if (!confirm('Remover esta criatura?')) return;
      pegarCena(alvo).criaturas.splice(+alvo.dataset.cr, 1);
      salvar(); render(); return;
    }
    if (acao === 'del-perigo') {
      if (!confirm('Remover este perigo complexo?')) return;
      pegarCena(alvo).perigos.splice(+alvo.dataset.pg, 1);
      salvar(); render(); return;
    }

    if (acao === 'inserir-arma-natural' || acao === 'inserir-desarmado') {
      inserirAtaqueCalculado(alvo, acao);
      return;
    }

    if (acao === 'inserir-poder-concedido') { inserirPoderConcedido(alvo); return; }
    if (acao === 'devoto-marcar') {
      const ferr = alvo.closest('.mz-ferr');
      const sel = ferr && ferr.querySelector('.mz-dev-deus');
      const G = window.GA_DEVOTOS;
      if (!sel || !sel.value || !G || !G.deusPorChave[sel.value]) { if (sel) sel.focus(); return; }
      const cr = pegarCriatura(alvo);
      if (cr) { cr.devoto = sel.value; salvar(); render(); }
      return;
    }
    if (acao === 'devoto-remover') {
      const cr = pegarCriatura(alvo);
      if (cr) { cr.devoto = ''; salvar(); render(); }
      return;
    }

    if (acao === 'resolver-morte') { resolverMorte(alvo); return; }
    if (acao === 'limpar-morte') {
      const cr = pegarCriatura(alvo);
      if (cr) { cr.statusMorte = null; salvar(); render(); }
      return;
    }

    if (acao === 'rolar-efeito-critico') { rolarEfeitoCritico(alvo); return; }
    if (acao === 'rolar-falha-critica')  { rolarFalhaCritica(alvo);  return; }
    if (acao === 'aplicar-cond-critico') { aplicarCondCritico(alvo); return; }
    if (acao === 'limpar-critico')       { limparCritico(alvo);      return; }

    if (acao === 'expandir') {
      const cont = alvo.closest('.mz-exp-wrap') || alvo.closest('.mz-campo');
      const campoEl = cont && cont.querySelector('.mz-ataques, .mz-textarea');
      if (campoEl) abrirEditorCampo(campoEl);
      return;
    }
    if (acao === 'ler') {
      const cont = alvo.closest('.mz-campo');
      const campoEl = cont && cont.querySelector('.mz-ataques, .mz-textarea');
      if (campoEl) abrirModoLeitura(campoEl);
      return;
    }

    if (acao === 'toggle-sessao') {
      const s = pegarSessao(alvo); s.aberto = !s.aberto;
      salvar(); render(); return;
    }
    if (acao === 'toggle-cena') {
      const c = pegarCena(alvo); c.aberto = !c.aberto;
      salvar(); render(); return;
    }
    if (acao === 'toggle-criatura') {
      const cr = pegarCriatura(alvo); cr.aberto = !cr.aberto;
      salvar(); render(); return;
    }
    if (acao === 'toggle-criatura-painel') {
      // Estado de recolhimento independente da lista (só no Painel de Combate).
      const cr = pegarCriatura(alvo);
      cr.painelAberto = (cr.painelAberto === false) ? true : false;
      salvar(); render(); return;
    }
    if (acao === 'toggle-perigo') {
      const pg = pegarPerigo(alvo); pg.aberto = !pg.aberto;
      salvar(); render(); return;
    }
    if (acao === 'toggle-perigo-painel') {
      const pg = pegarPerigo(alvo);
      pg.painelAberto = (pg.painelAberto === false) ? true : false;
      salvar(); render(); return;
    }
  }

  // ── DIGITAÇÃO (campos de texto) — NÃO re-renderiza ───────────────
  function aoDigitar(e) {
    const el = e.target;

    // qualquer caixa de texto simples cresce com o conteúdo ao digitar
    if (el.classList && el.classList.contains('mz-textarea')) autoCrescer(el);

    // ferramenta de devoto: trocar o deus repopula o seletor de poderes
    // (selects sem data-campo — nada é salvo até clicar num botão)
    if (el.classList && el.classList.contains('mz-dev-deus')) {
      const ferr = el.closest('.mz-ferr');
      const selPoder = ferr && ferr.querySelector('.mz-dev-poder');
      if (selPoder) {
        selPoder.innerHTML = _opcoesPoderHtml(el.value);
        selPoder.disabled = !el.value;
      }
      return;
    }

    // seletor de criatura de um quadrado do painel
    if (el.dataset && el.dataset.painelSlot != null) {
      const slot = +el.dataset.painelSlot;
      const id = el.value || null;
      if (id) {
        // a mesma criatura não pode ocupar dois quadrados — move-a
        for (let k = 0; k < dados.painel.length; k++) {
          if (k !== slot && dados.painel[k] === id) dados.painel[k] = null;
        }
      }
      dados.painel[slot] = id;
      salvar(); render(); return;
    }

    // seletor de cena narrada (palco do painel). NÃO traz ambientes
    // automaticamente — isso fica a cargo do botão "↻ Trazer ambientes".
    if (el.dataset && el.dataset.painelCena != null) {
      dados.cenaNarrada = el.value || null;
      salvar(); render(); return;
    }

    const campo = el.dataset && el.dataset.campo;
    if (!campo) return;

    // PV do veículo da viagem (vida compartilhada via GA_Viagem) — sem re-render
    if (campo === 'veic-pv') {
      if (window.GA_Viagem && el.dataset.vpv) window.GA_Viagem.setVeiculoPV(el.dataset.vpv, el.value);
      return;
    }

    if (campo === 'nome-sessao')  { pegarSessao(el).nome  = el.value; salvar(); return; }
    if (campo === 'nome-cena')    { pegarCena(el).nome    = el.value; salvar(); return; }
    if (campo === 'notas-sessao' || campo === 'notas-cena') {
      const owner = (campo === 'notas-sessao') ? pegarSessao(el) : pegarCena(el);
      owner.notasHtml = el.innerHTML;
      owner.notas = htmlParaTexto(el.innerHTML);   // espelho em texto puro p/ export
      salvar(); return;
    }

    // campos do perigo complexo (têm data-pg)
    if (el.dataset.pg != null) {
      const pg = pegarPerigo(el);
      if (campo === 'efeito' || campo === 'acoes') { pg[campo] = el.innerHTML; salvar(); return; }
      if (campo === 'pg-nome')      { pg.nome      = el.value; salvar(); return; }
      if (campo === 'pg-nd')        { pg.nd        = el.value; salvar(); return; }
      if (campo === 'pg-objetivo')  { pg.objetivo  = el.value; salvar(); return; }
      if (campo === 'pg-descricao') { pg.descricao = el.value; salvar(); return; }
    }

    if (campo === 'stat') {
      const cr = pegarCriatura(el);
      cr.stats[el.dataset.stat][el.dataset.sub] = el.value;
      salvar(); return;
    }

    // montaria da criatura (selects) — re-renderiza para atualizar o benefício
    if (campo === 'montaria-chave' || campo === 'montaria-nivel') {
      const cr = pegarCriatura(el);
      if (!cr.montaria) cr.montaria = { chave: '', nivel: 'iniciante' };
      if (campo === 'montaria-chave') cr.montaria.chave = el.value;
      else cr.montaria.nivel = el.value;
      salvar(); render(); return;
    }

    if (campo === 'ataques') {
      pegarCriatura(el).ataques = el.innerHTML;
      salvar(); return;
    }

    // demais campos da criatura (nome, tipoTamanho, tags, condicoes,
    // atributos, pericias, recompensas)
    if (el.dataset.cr != null) {
      pegarCriatura(el)[campo] = el.value;
      salvar(); return;
    }
  }

  // ── AUTO-AJUSTE DE ALTURA (caixas de texto simples) ──────────────
  // A textarea cresce conforme o conteúdo. O usuário ainda pode arrastar
  // a borda (resize) — ao digitar de novo, volta a ajustar ao conteúdo.
  function autoCrescer(ta) {
    if (!ta || ta.tagName !== 'TEXTAREA') return;
    ta.style.height = 'auto';
    ta.style.height = ta.scrollHeight + 'px';
  }

  // Título do editor em tela cheia, conforme o campo aberto.
  function tituloDoCampo(el) {
    const campo = el.dataset.campo;
    if (campo === 'notas-sessao') return '📝 Sessão — ' + (pegarSessao(el).nome || 'Sessão');
    if (campo === 'notas-cena')   return '📝 Cena — '   + (pegarCena(el).nome   || 'Cena');
    const box = el.closest('.mz-campo');
    const rot = box && box.querySelector('.mz-rotulo');
    const rotulo = rot ? rot.textContent.trim() : 'Texto';
    let dono = '';
    if (el.dataset.pg != null)      dono = (pegarPerigo(el).nome   || 'Perigo');
    else if (el.dataset.cr != null) dono = (pegarCriatura(el).nome || 'Criatura');
    return '📝 ' + (dono ? dono + ' — ' : '') + rotulo;
  }

  // ── EDITOR EM TELA CHEIA (botão ⛶ Expandir) ──────────────────────
  // Abre o MESMO campo (texto simples OU rico com grifo) numa caixa grande
  // e confortável — ótimo para escrever bastante ou ler em voz alta na mesa.
  // Edita-se aqui, sincroniza para o campo inline e dispara o 'input' dele
  // para a lógica de salvamento já existente cuidar de tudo. Sem re-render.
  function abrirEditorCampo(campoEl) {
    const rico = campoEl.isContentEditable;   // notas / ataques / efeito / ações

    const toolbar = rico
      ? `<div class="mz-toolbar mz-ed-toolbar">
           ${botoesGrifo('data-grifo')}
           <span class="mz-toolbar-dica">selecione · grife ou Ctrl+B / Ctrl+I</span>
         </div>`
      : '';
    const corpo = rico
      ? `<div class="mz-ataques mz-ed-rich" contenteditable="true" spellcheck="true">${campoEl.innerHTML}</div>`
      : `<textarea class="mz-ed-area" placeholder="Escreva à vontade…">${esc(campoEl.value)}</textarea>`;

    const overlay = GA_abrirModal(`
      <div class="mz-ed-cab">
        <span class="mz-ed-tit">${esc(tituloDoCampo(campoEl))}</span>
        <button class="mz-cond-modal-x" data-ga-fechar title="Fechar (Esc)">✕</button>
      </div>
      ${toolbar}
      ${corpo}
      <div class="mz-ed-pe">Salvo automaticamente • Esc ou clique fora para fechar</div>`);
    overlay.classList.add('mz-ed-overlay', rico ? 'mz-ed-overlay--rico' : 'mz-ed-overlay--simples');

    const ed = overlay.querySelector(rico ? '.mz-ed-rich' : '.mz-ed-area');

    // modal → campo inline + dispara o 'input' do inline (a seção escuta e
    // salva via aoDigitar/salvarRich, igual à digitação normal).
    function sincronizar() {
      if (rico) campoEl.innerHTML = ed.innerHTML;
      else      campoEl.value     = ed.value;
      campoEl.dispatchEvent(new Event('input', { bubbles: true }));
    }
    ed.addEventListener('input', sincronizar);

    if (rico) {
      // grifo dentro do modal (a seção não enxerga este overlay solto no body)
      overlay.addEventListener('mousedown', e => {
        const btn = e.target.closest('[data-grifo]');
        if (!btn) return;
        e.preventDefault();                       // mantém a seleção viva
        if (aplicarGrifo(ed, btn.dataset.grifo, btn.dataset.cor)) sincronizar();
      });
      // colar limpo (junta as quebras duras de PDF, igual às caixas inline)
      ed.addEventListener('paste', e => {
        e.preventDefault();
        const limpo = window.GA_limparQuebras((e.clipboardData || window.clipboardData).getData('text/plain'));
        const sel = window.getSelection();
        if (!sel.rangeCount) return;
        sel.deleteFromDocument();
        sel.getRangeAt(0).insertNode(document.createTextNode(limpo));
        sel.collapseToEnd();
        sincronizar();
      });
      // negrito / itálico (Ctrl+B / Ctrl+I)
      ed.addEventListener('keydown', e => { if (atalhoFormatacao(e)) sincronizar(); });
    }

    // foco no fim do texto
    ed.focus();
    if (rico) {
      const r = document.createRange();
      r.selectNodeContents(ed); r.collapse(false);
      const s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
    } else {
      ed.setSelectionRange(ed.value.length, ed.value.length);
    }
  }

  // ── MODO LEITURA / NARRAÇÃO (botão 📖 Ler) ───────────────────────
  // Abre o conteúdo do campo em tela cheia, SÓ leitura, fonte grande e
  // tema pergaminho — para ler em voz alta na mesa. Mostra os grifos e as
  // caixas de leitura. A− / A+ ajustam a fonte (lembrada entre sessões).
  let _lerFonte = (function () {
    const v = parseFloat(localStorage.getItem('grifosAlados.lerFonte'));
    return (v && v >= 0.9 && v <= 3.2) ? v : 1.3;
  })();

  function abrirModoLeitura(campoEl) {
    const rico = campoEl.isContentEditable;
    const bruto = rico ? (campoEl.innerHTML || '') : esc(campoEl.value || '');
    const corpo = bruto.trim() ? bruto : '<em class="mz-ler-vazio">(sem anotações aqui ainda)</em>';
    const titulo = tituloDoCampo(campoEl).replace('📝', '📖');

    const overlay = GA_abrirModal(`
      <div class="mz-ed-cab mz-ler-cab">
        <span class="mz-ed-tit">${esc(titulo)}</span>
        <span class="mz-ler-ferramentas">
          <button type="button" class="mz-ler-az" data-ler-menos title="Letra menor">A−</button>
          <button type="button" class="mz-ler-az" data-ler-mais title="Letra maior">A+</button>
          <button class="mz-cond-modal-x" data-ga-fechar title="Fechar (Esc)">✕</button>
        </span>
      </div>
      <div class="mz-ler-texto">${corpo}</div>`);
    overlay.classList.add('mz-ed-overlay', 'mz-ler-overlay');

    const texto = overlay.querySelector('.mz-ler-texto');
    const aplicarFonte = () => { texto.style.fontSize = _lerFonte.toFixed(2) + 'rem'; };
    aplicarFonte();

    overlay.addEventListener('click', e => {
      if (e.target.closest('[data-ler-mais]'))       _lerFonte = Math.min(_lerFonte + 0.15, 3.2);
      else if (e.target.closest('[data-ler-menos]')) _lerFonte = Math.max(_lerFonte - 0.15, 0.9);
      else return;
      try { localStorage.setItem('grifosAlados.lerFonte', String(_lerFonte)); } catch (err) {}
      aplicarFonte();
    });
  }

  // ── LIMPEZA DE QUEBRAS DE LINHA (texto colado de PDF) ────────────
  // Texto copiado de livro/PDF traz uma quebra "dura" a cada linha
  // visual. Esta função junta as quebras de uma mesma frase/parágrafo,
  // mantendo apenas as quebras "de verdade": antes de itens com marcador
  // (•, -, 1., …) e entre parágrafos (linhas em branco).
  // ── COLAR (Ataques + textareas): limpa as quebras antes de inserir ─
  function aoColar(e) {
    const textarea = e.target.closest('.mz-textarea');
    const ataques  = e.target.closest('.mz-ataques');
    if (!textarea && !ataques) return;

    e.preventDefault();
    const bruto = (e.clipboardData || window.clipboardData).getData('text/plain');
    const limpo = window.GA_limparQuebras(bruto);

    if (textarea) {
      // insere no textarea, na posição do cursor
      const ini = textarea.selectionStart;
      const fim = textarea.selectionEnd;
      textarea.setRangeText(limpo, ini, fim, 'end');
      autoCrescer(textarea);   // cresce para caber o texto colado
      const campo = textarea.dataset.campo;
      if (campo && textarea.dataset.cr != null) {
        pegarCriatura(textarea)[campo] = textarea.value;
        salvar();
      } else if (campo === 'pg-descricao' && textarea.dataset.pg != null) {
        pegarPerigo(textarea).descricao = textarea.value;
        salvar();
      }
    } else {
      // campo de texto rico (Ataque/Habilidades da criatura ou Efeito/Ações do perigo)
      const sel = window.getSelection();
      if (!sel.rangeCount) return;
      sel.deleteFromDocument();
      sel.getRangeAt(0).insertNode(document.createTextNode(limpo));
      sel.collapseToEnd();
      salvarRich(ataques);
    }
  }

  // ── GRIFO (cores + caixa de leitura) ─────────────────────────────
  // Usa mousedown + preventDefault para não perder a seleção do texto.
  // Aplica ('grifar', com a classe `cor`) ou remove ('desgrifar', qualquer
  // estilo) na seleção dentro de `editor`. Retorna true se mexeu em algo.
  // Reusada pela barra inline (aoMousedownToolbar) e pelo modal.
  function aplicarGrifo(editor, acao, cor) {
    const sel = window.getSelection();
    if (!sel.rangeCount || sel.isCollapsed) return false;
    const range = sel.getRangeAt(0);
    if (!editor.contains(range.commonAncestorContainer)) return false;

    if (acao === 'grifar') {
      const span = document.createElement('span');
      span.className = cor || 'mz-azul';
      try {
        range.surroundContents(span);
      } catch (err) {
        span.appendChild(range.extractContents());
        range.insertNode(span);
      }
    } else {
      // remove qualquer grifo/caixa tocado pela seleção (desembrulha o span)
      editor.querySelectorAll(GRIFO_SELETOR).forEach(span => {
        if (sel.containsNode(span, true)) {
          while (span.firstChild) span.parentNode.insertBefore(span.firstChild, span);
          span.parentNode.removeChild(span);
        }
      });
      editor.normalize();
    }
    return true;
  }

  function aoMousedownToolbar(e) {
    const btn = e.target.closest('[data-acao="grifar"], [data-acao="desgrifar"]');
    if (!btn) return;
    e.preventDefault(); // mantém a seleção viva
    const editor = btn.closest('.mz-campo').querySelector('.mz-ataques');
    if (!editor) return;
    if (aplicarGrifo(editor, btn.dataset.acao, btn.dataset.cor)) salvarRich(editor);
  }

  // ═══════════════════════════════════════════════════════════════
  //  ROLAGENS E LOG
  // ═══════════════════════════════════════════════════════════════

  const MAX_QTD_DADOS  = 100;    // máximo de dados numa única rolagem
  const MAX_LADOS_DADO = 1000;   // máximo de lados de um dado

  function rolarDado(lados) { return 1 + Math.floor(Math.random() * lados); }

  // Formata o valor de um d20: 20 natural fica verde, 1 natural fica vermelho.
  function formatarD20(v) {
    if (v === 20) return '<span class="mz-d20-max">20</span>';
    if (v === 1)  return '<span class="mz-d20-min">1</span>';
    return String(v);
  }

  // ── ROLADOR DE EXPRESSÕES (chat) ─────────────────────────────────
  // Entende dados (XdY), números e os operadores + - * / com parênteses.
  // Espaços são ignorados, então "1d20+3" e "1d20 + 3" funcionam igual.
  function tokenizar(txt) {
    const s = txt.replace(/\s+/g, '').toLowerCase();
    if (s === '') throw new Error('Digite uma expressão.');

    const re = /(\d*d\d+)|(\d+)|([+\-*/()])/y;
    const tokens = [];
    let m, pos = 0;
    while ((m = re.exec(s)) !== null) {
      pos = re.lastIndex;                           // posição já consumida
      if (m[1]) {                                   // dado XdY
        const partes = m[1].split('d');
        const qtd   = partes[0] === '' ? 1 : parseInt(partes[0], 10);
        const lados = parseInt(partes[1], 10);
        if (qtd < 1 || qtd > MAX_QTD_DADOS)
          throw new Error('Quantidade de dados deve ser de 1 a ' + MAX_QTD_DADOS + '.');
        if (lados < 2 || lados > MAX_LADOS_DADO)
          throw new Error('Tipo de dado inválido (use d2 até d' + MAX_LADOS_DADO + ').');
        const rolls = [];
        for (let i = 0; i < qtd; i++) rolls.push(rolarDado(lados));
        rolls.sort((a, b) => b - a);                // ordem decrescente
        tokens.push({ tipo: 'dado', qtd: qtd, lados: lados, rolls: rolls,
                      total: rolls.reduce((a, b) => a + b, 0) });
      } else if (m[2]) {
        tokens.push({ tipo: 'num', valor: parseInt(m[2], 10) });
      } else if (m[3] === '(') {
        tokens.push({ tipo: 'abre' });
      } else if (m[3] === ')') {
        tokens.push({ tipo: 'fecha' });
      } else {
        tokens.push({ tipo: 'op', op: m[3] });
      }
    }
    if (pos !== s.length)
      throw new Error('Não entendi "' + s.slice(pos, pos + 8) + '"…');
    if (tokens.length === 0) throw new Error('Digite uma expressão.');
    return tokens;
  }

  // Avalia os tokens respeitando a ordem matemática (× e ÷ antes de + e −).
  function avaliar(tokens) {
    let i = 0;
    function expr() {
      let v = termo();
      while (tokens[i] && tokens[i].tipo === 'op' &&
             (tokens[i].op === '+' || tokens[i].op === '-')) {
        const op = tokens[i++].op;
        const r = termo();
        v = (op === '+') ? v + r : v - r;
      }
      return v;
    }
    function termo() {
      let v = fator();
      while (tokens[i] && tokens[i].tipo === 'op' &&
             (tokens[i].op === '*' || tokens[i].op === '/')) {
        const op = tokens[i++].op;
        const r = fator();
        if (op === '/') {
          if (r === 0) throw new Error('Divisão por zero.');
          v = v / r;
        } else { v = v * r; }
      }
      return v;
    }
    function fator() {
      const t = tokens[i];
      if (!t) throw new Error('Expressão incompleta.');
      if (t.tipo === 'num')  { i++; return t.valor; }
      if (t.tipo === 'dado') { i++; return t.total; }
      if (t.tipo === 'op' && t.op === '-') { i++; return -fator(); }
      if (t.tipo === 'op' && t.op === '+') { i++; return  fator(); }
      if (t.tipo === 'abre') {
        i++;
        const v = expr();
        if (!tokens[i] || tokens[i].tipo !== 'fecha')
          throw new Error('Parêntese não fechado.');
        i++;
        return v;
      }
      throw new Error('Expressão malformada.');
    }
    const resultado = expr();
    if (i !== tokens.length) throw new Error('Expressão malformada.');
    return resultado;
  }

  // Monta a string de detalhamento da rolagem (com os dados coloridos).
  function montarDetalhe(tokens) {
    const simbolo = { '+': '+', '-': '−', '*': '×', '/': '÷' };
    return tokens.map(t => {
      if (t.tipo === 'num')   return String(t.valor);
      if (t.tipo === 'op')    return simbolo[t.op] || t.op;
      if (t.tipo === 'abre')  return '(';
      if (t.tipo === 'fecha') return ')';
      if (t.tipo === 'dado') {
        const vals = t.rolls.map(r => t.lados === 20 ? formatarD20(r) : r).join(', ');
        return `${t.qtd}d${t.lados} (${vals})`;
      }
      return '';
    }).join(' ');
  }

  // Processa o que foi digitado no chat e registra a rolagem no log.
  function processarChat(input) {
    const status = document.querySelector('.mz-chat-status');
    const txt = (input.value || '').trim();
    if (txt === '') return;
    try {
      const tokens   = tokenizar(txt);
      const total    = avaliar(tokens);
      const totalFmt = Number.isInteger(total) ? total : Math.round(total * 100) / 100;
      const detalhe  = `${montarDetalhe(tokens)} = <strong>${totalFmt}</strong>`;

      dados.log.push({ criatura: '💬 Rolador', pericia: txt, formula: detalhe, tipo: 'chat' });
      while (dados.log.length > MAX_LOG) dados.log.shift();
      salvar();
      renderLog();

      input.value = '';
      if (status) {
        status.textContent = 'Digite uma expressão e tecle Enter';
        status.classList.remove('mz-chat-status--erro');
      }
    } catch (err) {
      if (status) {
        status.textContent = '⚠ ' + err.message;
        status.classList.add('mz-chat-status--erro');
      }
    }
  }

  // ── ROLAGEM DE PERÍCIA (botões 🎲 das criaturas) ─────────────────
  function rolarPericia(botao) {
    const cr   = pegarCriatura(botao);
    const stat = botao.dataset.stat;
    const sub  = botao.dataset.sub;            // 'padrao' | 'atual'
    const info = STATS.find(s => s.chave === stat) || { rotulo: stat };

    const dado     = rolarDado(20);
    const modBruto = parseInt((cr.stats[stat] || {})[sub], 10);
    const mod      = isNaN(modBruto) ? 0 : modBruto;
    const total    = dado + mod;
    const sinal    = mod < 0 ? '−' : '+';
    const formula  = `1d20 (${formatarD20(dado)}) ${sinal} ${Math.abs(mod)} = <strong>${total}</strong>`;

    dados.log.push({
      criatura: cr.nome || '(criatura sem nome)',
      pericia:  info.rotulo + (sub === 'atual' ? ' · Atual' : ' · Padrão'),
      formula:  formula,
      tipo:     'pericia',
    });
    while (dados.log.length > MAX_LOG) dados.log.shift();

    salvar();
    renderLog();
  }

  // ── VARIANTE "AMEAÇAS E MORTE" (resolver a sorte da criatura caída) ─
  // Lacaio morre; solo/especial sobrevivem com 50%. Registra no log e
  // marca a ficha (statusMorte) — re-renderiza para refletir o resultado.
  function resolverMorte(alvo) {
    const cr = pegarCriatura(alvo);
    if (!cr) return;
    const papel = cr.papel || 'lacaio';
    let vivo, detalhe, formula;
    if (papel === 'lacaio') {
      vivo = false; detalhe = 'lacaio cai a 0 PV';
      formula = `Lacaio a 0 PV → <strong>MORTA</strong>`;
    } else {
      const d = rolarDado(100);
      vivo = d <= 50; detalhe = '1d100 = ' + d;
      formula = `1d100 (<strong>${d}</strong>) ${vivo ? '≤ 50 → SOBREVIVEU' : '&gt; 50 → MORTA'}`;
    }
    cr.statusMorte = { vivo: vivo, detalhe: detalhe };
    dados.log.push({
      criatura: cr.nome || '(criatura sem nome)',
      pericia:  'Teste de morte · ' + (papel.charAt(0).toUpperCase() + papel.slice(1)),
      formula:  formula,
      tipo:     'morte',
    });
    while (dados.log.length > MAX_LOG) dados.log.shift();
    salvar();
    render();
    renderLog();
  }

  // ── ROLADOR DE CRÍTICOS (efeitos & falhas, regras opcionais) ─────
  // Guarda o resultado em cr.ultimoCritico e re-renderiza (a barra abre
  // sozinha quando há resultado). Efeitos com condição mapeada ganham um
  // botão "aplicar" que adiciona o chip à ficha.
  function _rotTipo(tipo) {
    const G = window.GA_CRITICOS;
    return ((G.TIPO_OPCOES.find(t => t.key === tipo)) || { rot: tipo }).rot;
  }
  function rolarEfeitoCritico(alvo) {
    const cr = pegarCriatura(alvo);
    const G = window.GA_CRITICOS;
    if (!cr || !G) return;
    const tipo = G.TABELA[cr.critTipo] ? cr.critTipo : 'corte';
    const mult = (cr.critMult in G.SEV_MOD) ? cr.critMult : 'x2';

    let localKey = cr.critLocal || '';
    let locRot, locTxt, dLoc = null;
    if (localKey && G.LOCAL_ROT[localKey]) {
      locRot = G.LOCAL_ROT[localKey];
      locTxt = `Local: ${locRot} (mirado)`;
    } else {
      dLoc = rolarDado(10);
      const e = G.LOCAL.find(l => dLoc >= l.min && dLoc <= l.max) || G.LOCAL[0];
      localKey = e.key; locRot = e.rot;
      locTxt = `Local 1d10 (${dLoc}) → ${esc(locRot)}`;
    }

    const dSev = rolarDado(10);
    const mod  = G.SEV_MOD[mult];
    const sev  = dSev + mod;
    const faixa = G.faixaSeveridade(sev);
    const cell = G.TABELA[tipo][localKey][faixa];
    const cond = cell.cond ? (Array.isArray(cell.cond) ? cell.cond.slice() : [cell.cond]) : [];

    const sevTxt = `Sev. 1d10 (${dSev})${mod ? ' + ' + mod : ''} = <strong>${sev}</strong> [${esc(G.SEV_ROTULOS[faixa])}]`;
    cr.ultimoCritico = {
      kind: 'efeito',
      cab: `Efeito crítico · ${esc(_rotTipo(tipo))} · ${esc(locRot.replace(/ (direita|esquerda)$/, ''))}`,
      rol: `${locTxt} · ${sevTxt}`,
      efeito: cell.txt,
      cond: cond,
      aplicada: false,
    };
    dados.log.push({
      criatura: cr.nome || '(criatura sem nome)',
      pericia: `Efeito crítico · ${esc(_rotTipo(tipo))}`,
      formula: `${esc(locRot)}: ${esc(cell.txt)}`,
      tipo: 'critico',
    });
    while (dados.log.length > MAX_LOG) dados.log.shift();
    salvar(); render(); renderLog();
  }

  function rolarFalhaCritica(alvo) {
    const cr = pegarCriatura(alvo);
    const G = window.GA_CRITICOS;
    if (!cr || !G) return;
    const d = rolarDado(100);
    const efeito = G.FALHAS[d - 1] || '—';
    cr.ultimoCritico = {
      kind: 'falha',
      cab: `Falha crítica · 1d100 = ${d}`,
      rol: `Role para resolver os efeitos descritos (alguns pedem outros testes).`,
      efeito: efeito,
      cond: [],
      aplicada: false,
    };
    dados.log.push({
      criatura: cr.nome || '(criatura sem nome)',
      pericia: `Falha crítica · 1d100 (${d})`,
      formula: esc(efeito),
      tipo: 'critico',
    });
    while (dados.log.length > MAX_LOG) dados.log.shift();
    salvar(); render(); renderLog();
  }

  function aplicarCondCritico(alvo) {
    const cr = pegarCriatura(alvo);
    if (!cr || !cr.ultimoCritico || !Array.isArray(cr.ultimoCritico.cond)) return;
    cr.ultimoCritico.cond.forEach(ch => {
      if (COND_POR_CHAVE[ch] && cr.condicoesAtivas.indexOf(ch) < 0) cr.condicoesAtivas.push(ch);
    });
    cr.ultimoCritico.aplicada = true;
    salvar(); render();
  }

  function limparCritico(alvo) {
    const cr = pegarCriatura(alvo);
    if (cr) { cr.ultimoCritico = null; salvar(); render(); }
  }

  // ── BARRA LATERAL (log + chat) ───────────────────────────────────
  function montarLateral() {
    const wrapper = document.querySelector('#monstros .wrapper');
    if (!wrapper || document.querySelector('.mz-lateral')) return;
    const lat = document.createElement('aside');
    lat.className = 'mz-lateral';
    lat.innerHTML = `
      <div class="mz-log">
        <div class="mz-log-cabecalho">
          <span>🎲 Rolagens</span>
          <button class="mz-log-limpar" data-acao="limpar-log" title="Limpar o log">✕</button>
        </div>
        <div class="mz-log-lista" id="mz-log-lista"></div>
      </div>
      <div class="mz-chat">
        <div class="mz-chat-cabecalho">💬 Rolador</div>
        <input class="mz-chat-input" type="text" autocomplete="off"
               placeholder="ex: 2d6 + 3 * 2">
        <p class="mz-chat-status">Digite uma expressão e tecle Enter</p>
      </div>`;
    wrapper.appendChild(lat);
  }

  // Preenche a lista do log (mais antiga em cima, mais nova embaixo).
  function renderLog() {
    const lista = document.getElementById('mz-log-lista');
    if (!lista) return;

    if (!dados.log || dados.log.length === 0) {
      lista.innerHTML = `<p class="mz-log-vazio">Nenhuma rolagem ainda. Use os 🎲 das perícias ou o chat abaixo.</p>`;
      return;
    }
    lista.innerHTML = dados.log.map(r => `
      <div class="mz-log-item ${r.tipo === 'chat' ? 'mz-log-item--chat' : ''}">
        <div class="mz-log-criatura">${esc(r.criatura)}</div>
        <div class="mz-log-pericia">${esc(r.pericia)}</div>
        <div class="mz-log-formula">${r.formula}</div>
      </div>`).join('');
    lista.scrollTop = lista.scrollHeight;   // mostra a rolagem mais recente
  }

  // ── EVENTO: Enter no chat ────────────────────────────────────────
  // ── NEGRITO / ITÁLICO (Ctrl+B / Ctrl+I) ─────────────────────────
  // Atalhos nas caixas de texto rico (.mz-ataques). Usa execCommand —
  // depreciado, mas é o jeito universal e estável de formatar um
  // contenteditable; envolve a seleção em <b>/<i> e salva no innerHTML.
  function atalhoFormatacao(e) {
    if (!(e.ctrlKey || e.metaKey) || e.altKey) return false;
    const k = e.key.toLowerCase();
    if (k !== 'b' && k !== 'i') return false;
    e.preventDefault();
    document.execCommand(k === 'b' ? 'bold' : 'italic', false, null);
    return true;
  }

  function aoTeclar(e) {
    // Ctrl+B / Ctrl+I dentro das caixas de texto rico
    if (e.target.classList && e.target.classList.contains('mz-ataques')) {
      if (atalhoFormatacao(e)) { salvarRich(e.target); return; }
    }
    if (e.key !== 'Enter') return;
    if (!e.target.classList || !e.target.classList.contains('mz-chat-input')) return;
    e.preventDefault();
    processarChat(e.target);
  }

  // ═══════════════════════════════════════════════════════════════
  //  MODAL DE CONDIÇÕES (botão "＋ Condição")
  // ═══════════════════════════════════════════════════════════════
  let _condAlvo = null;   // {s, c, cr} da criatura com o modal aberto

  function abrirModalCondicoes(si, ci, cri) {
    fecharModalCondicoes();
    _condAlvo = { s: si, c: ci, cr: cri };
    const cr = dados.sessoes[si].cenas[ci].criaturas[cri];
    const nomeCriatura = cr.nome || 'Criatura sem nome';

    let grupos = '';
    Object.keys(COND_CATEGORIAS).forEach(catKey => {
      const cat   = COND_CATEGORIAS[catKey];
      const itens = CONDICOES.filter(c => c.cat === catKey);
      if (!itens.length) return;
      let linhas = '';
      itens.forEach(c => {
        const ativo = cr.condicoesAtivas.indexOf(c.chave) >= 0;
        linhas += `
          <button class="mz-cond-opcao ${ativo ? 'ativo' : ''}" style="--cor:${cat.cor}"
                  data-cond-toggle="${c.chave}" data-nome="${esc(c.nome).toLowerCase()}">
            <span class="mz-cond-opcao-cab">
              <span class="mz-cond-opcao-check">${ativo ? '✓' : '＋'}</span>
              <span class="mz-cond-opcao-nome">${esc(c.nome)}</span>
              <span class="mz-cond-opcao-cat">${esc(cat.rotulo)}</span>
            </span>
            <span class="mz-cond-opcao-desc">${esc(c.desc)}</span>
          </button>`;
      });
      grupos += `
        <div class="mz-cond-grupo">
          <div class="mz-cond-grupo-titulo" style="--cor:${cat.cor}">${esc(cat.rotulo)}</div>
          ${linhas}
        </div>`;
    });

    const overlay = document.createElement('div');
    overlay.id = 'mzCondModal';
    overlay.className = 'mz-cond-overlay';
    overlay.innerHTML = `
      <div class="mz-cond-modal" role="dialog" aria-modal="true">
        <div class="mz-cond-modal-head">
          <span>Condições — ${esc(nomeCriatura)}</span>
          <button class="mz-cond-modal-x" data-cond-fechar title="Fechar">✕</button>
        </div>
        <input class="mz-cond-busca" type="text" placeholder="Buscar condição…" autocomplete="off">
        <div class="mz-cond-modal-corpo">${grupos}</div>
        <div class="mz-cond-modal-pe">Clique para ativar/desativar · a cor indica a categoria (também escrita ao lado).</div>
      </div>`;
    document.body.appendChild(overlay);

    overlay.addEventListener('click', e => {
      if (e.target === overlay || e.target.closest('[data-cond-fechar]')) {
        fecharModalCondicoes(); return;
      }
      const opc = e.target.closest('[data-cond-toggle]');
      if (opc) toggleCondicao(opc.dataset.condToggle, opc);
    });

    const busca = overlay.querySelector('.mz-cond-busca');
    busca.addEventListener('input', () => {
      const termo = busca.value.trim().toLowerCase();
      overlay.querySelectorAll('.mz-cond-opcao').forEach(o => {
        o.style.display = o.dataset.nome.indexOf(termo) >= 0 ? '' : 'none';
      });
      overlay.querySelectorAll('.mz-cond-grupo').forEach(g => {
        const algum = Array.from(g.querySelectorAll('.mz-cond-opcao'))
                           .some(o => o.style.display !== 'none');
        g.style.display = algum ? '' : 'none';
      });
    });

    document.addEventListener('keydown', _condEsc);
    setTimeout(() => busca.focus(), 50);
  }

  function _condEsc(e) {
    if (e.key === 'Escape') fecharModalCondicoes();
  }

  function fecharModalCondicoes() {
    const el = document.getElementById('mzCondModal');
    if (el) el.remove();
    document.removeEventListener('keydown', _condEsc);
  }

  function toggleCondicao(chave, botaoOpcao) {
    if (!_condAlvo) return;
    const cr = dados.sessoes[_condAlvo.s].cenas[_condAlvo.c].criaturas[_condAlvo.cr];
    const i = cr.condicoesAtivas.indexOf(chave);
    if (i >= 0) cr.condicoesAtivas.splice(i, 1);
    else cr.condicoesAtivas.push(chave);
    salvar();
    render();   // atualiza os chips na ficha
    if (botaoOpcao) {
      const ativo = cr.condicoesAtivas.indexOf(chave) >= 0;
      botaoOpcao.classList.toggle('ativo', ativo);
      const chk = botaoOpcao.querySelector('.mz-cond-opcao-check');
      if (chk) chk.textContent = ativo ? '✓' : '＋';
    }
  }

  // ═══════════════════════════════════════════════════════════════
  //  MODAL GENÉRICO DE LISTA (Tipo de criatura · Habilidades gerais)
  //  Lista plana, sem categorias. Funciona como single ou multi.
  // ═══════════════════════════════════════════════════════════════
  let _listaAlvo = null;   // { s, c, cr, campo, multi, itens, cor }

  function abrirModalLista(si, ci, cri, tipo) {
    fecharModalLista();
    const cfg = (tipo === 'tipo')
      ? { campo:'tipoCriatura', multi:false, itens:TIPOS_CRIATURA,    cor:'#5c1a04',
          titulo:'Tipo de criatura', dica:'Cada criatura tem um tipo — clique para escolher (clique de novo para remover).' }
      : (tipo === 'sentido')
      ? { campo:'sentidos',     multi:true,  itens:SENTIDOS,           cor:'#1f7a6b',
          titulo:'Sentidos', dica:'Clique para marcar/desmarcar os sentidos da criatura.' }
      : { campo:'habilidades',  multi:true,  itens:HABILIDADES_GERAIS, cor:'#6e5a44',
          titulo:'Habilidades gerais', dica:'Clique para marcar/desmarcar as habilidades que a criatura tem.' };
    _listaAlvo = Object.assign({ s:si, c:ci, cr:cri }, cfg);
    const cr = dados.sessoes[si].cenas[ci].criaturas[cri];
    const nomeCriatura = cr.nome || 'Criatura sem nome';

    const overlay = document.createElement('div');
    overlay.id = 'mzListaModal';
    overlay.className = 'mz-cond-overlay';
    overlay.innerHTML = `
      <div class="mz-cond-modal" role="dialog" aria-modal="true">
        <div class="mz-cond-modal-head">
          <span>${esc(cfg.titulo)} — ${esc(nomeCriatura)}</span>
          <button class="mz-cond-modal-x" data-lista-fechar title="Fechar">✕</button>
        </div>
        <input class="mz-cond-busca" type="text" placeholder="Buscar…" autocomplete="off">
        <div class="mz-cond-modal-corpo">${_listaRowsHtml()}</div>
        <div class="mz-cond-modal-pe">${esc(cfg.dica)}</div>
      </div>`;
    document.body.appendChild(overlay);

    overlay.addEventListener('click', e => {
      if (e.target === overlay || e.target.closest('[data-lista-fechar]')) {
        fecharModalLista(); return;
      }
      const opc = e.target.closest('[data-lista-toggle]');
      if (opc) toggleItemLista(opc.dataset.listaToggle);
    });

    const busca = overlay.querySelector('.mz-cond-busca');
    busca.addEventListener('input', () => {
      const termo = busca.value.trim().toLowerCase();
      overlay.querySelectorAll('.mz-cond-opcao').forEach(o => {
        o.style.display = o.dataset.nome.indexOf(termo) >= 0 ? '' : 'none';
      });
    });

    document.addEventListener('keydown', _listaEsc);
    setTimeout(() => busca.focus(), 50);
  }

  function _listaRowsHtml() {
    const a = _listaAlvo;
    const cr = dados.sessoes[a.s].cenas[a.c].criaturas[a.cr];
    let linhas = '';
    a.itens.forEach(item => {
      const ativo = a.multi
        ? cr[a.campo].indexOf(item.chave) >= 0
        : cr[a.campo] === item.chave;
      linhas += `
        <button class="mz-cond-opcao ${ativo ? 'ativo' : ''}" style="--cor:${a.cor}"
                data-lista-toggle="${item.chave}" data-nome="${esc(item.nome).toLowerCase()}">
          <span class="mz-cond-opcao-cab">
            <span class="mz-cond-opcao-check">${ativo ? '✓' : '＋'}</span>
            <span class="mz-cond-opcao-nome">${esc(item.nome)}</span>
          </span>
          <span class="mz-cond-opcao-desc">${esc(item.desc)}</span>
        </button>`;
    });
    return linhas;
  }

  function _listaEsc(e) { if (e.key === 'Escape') fecharModalLista(); }

  function fecharModalLista() {
    const el = document.getElementById('mzListaModal');
    if (el) el.remove();
    document.removeEventListener('keydown', _listaEsc);
    _listaAlvo = null;
  }

  function toggleItemLista(chave) {
    const a = _listaAlvo;
    if (!a) return;
    const cr = dados.sessoes[a.s].cenas[a.c].criaturas[a.cr];
    if (a.multi) {
      const arr = cr[a.campo];
      const i = arr.indexOf(chave);
      if (i >= 0) arr.splice(i, 1); else arr.push(chave);
    } else {
      cr[a.campo] = (cr[a.campo] === chave) ? '' : chave;   // single-select (alterna)
    }
    salvar();
    render();   // atualiza os chips na ficha

    // atualiza o visual das opções no modal (preserva a busca)
    const overlay = document.getElementById('mzListaModal');
    if (!overlay) return;
    overlay.querySelectorAll('[data-lista-toggle]').forEach(row => {
      const on = a.multi
        ? cr[a.campo].indexOf(row.dataset.listaToggle) >= 0
        : cr[a.campo] === row.dataset.listaToggle;
      row.classList.toggle('ativo', on);
      const chk = row.querySelector('.mz-cond-opcao-check');
      if (chk) chk.textContent = on ? '✓' : '＋';
    });
  }

  // ═══════════════════════════════════════════════════════════════
  //  IMPORTAR FICHA (interpretar statblock do Tormenta 20)
  // ═══════════════════════════════════════════════════════════════

  // remove acentos e baixa caixa — para comparações tolerantes
  function _semAcento(s) {
    return String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }

  // tipos de criatura reconhecidos no texto -> chave do chip
  const _TIPO_TEXTO = [
    { re: /morto[- ]?vivo|mortos[- ]?vivos/i, chave: 'mortosVivos' },
    { re: /constru(to|tos|ct)/i,              chave: 'construtos' },
    { re: /esp[ií]rito/i,                     chave: 'espiritos' },
    { re: /humanoide/i,                       chave: 'humanoides' },
    { re: /\bmonstro/i,                       chave: 'monstros' },
    { re: /\banima(l|is)\b/i,                 chave: 'animais' },
  ];

  // encontra o índice de uma âncora (regex) no texto; -1 se não houver
  function _idx(txt, re) { const m = txt.match(re); return m ? m.index : -1; }

  // dá uma quebra de linha antes de marcadores e de "Habilidade (execução)"
  function _formatarAtaques(bloco) {
    let t = ' ' + bloco.trim();
    t = t.replace(/\s*•\s*/g, '\n• ');                       // marcadores de magia
    t = t.replace(/\s+(Corpo a Corpo|À Distância|Distância)\b/g, '\n$1');
    // "Nome Da Habilidade (Livre/Padrão/Reação/…)" -> quebra antes (ancorada em pontuação,
    // para não quebrar no meio de nomes de duas palavras como "Agarrar Aprimorado")
    t = t.replace(/([.)!?])\s+(?=[A-ZÀ-Ý][^.•()\n]{0,44}\((?:Livre|livre|Padr[ãa]o|Rea[çc][ãa]o|Movimento|movimento|Completa|Reativa|\d+\s*PM)\b)/g, '$1\n');
    return t.replace(/\n{2,}/g, '\n').replace(/^\n+/, '').trim();
  }

  // texto -> HTML (escapado, com <br>). Marca termos de regra (condições
  // etc.) com tooltip quando ItensDescricoes está disponível.
  function _txtParaHtml(t) {
    const base = window.ItensDescricoes
      ? window.ItensDescricoes.marcar(t || '')
      : esc(t || '');
    return base.replace(/\n/g, '<br>');
  }

  // Interpreta o statblock. Retorna { cr, avisos: [] }.
  function parsearFicha(textoBruto) {
    const avisos = [];
    // 1) colapsa quebras de linha (resolve o "Ctrl+C/V" do PDF) num texto plano
    const t = String(textoBruto || '')
      .replace(/\r/g, '')
      .replace(/\s*\n\s*/g, ' ')
      .replace(/[ \t]+/g, ' ')
      .trim();
    if (!t) return { cr: null, avisos: ['Cole o texto da ficha primeiro.'] };

    // 2) localiza as âncoras
    const iIni  = _idx(t, /\bIniciativa\b/i);
    const iDef  = _idx(t, /\bDefesa\b/i);
    const iPV   = _idx(t, /\bPontos?\s+de\s+Vida\b/i);
    const iDesl = _idx(t, /\bDeslocamento\b/i);
    const iPM   = _idx(t, /\bPontos?\s+de\s+Mana\b/i);
    let   iAtk  = _idx(t, /\b(Corpo a Corpo|À Distância)\b/i);
    // Atributos: exige a linha COMPLETA (For, Des, Con, Int, Sab, Car), assim
    // não casa com menções parciais tipo "For –1, Des 2" dentro de habilidades.
    const _vAtr = '(?:[+\\-–−]?\\d+|[—–−-])';
    const reAtr = new RegExp(
      '\\bFor\\s+'+_vAtr+'\\s*,\\s*Des\\s+'+_vAtr+'\\s*,\\s*Con\\s+'+_vAtr +
      '\\s*,\\s*Int\\s+'+_vAtr+'\\s*,\\s*Sab\\s+'+_vAtr+'\\s*,\\s*Car\\b', 'i');
    const iAtr  = _idx(t, reAtr);
    const iPer  = _idx(t, /\bPer[íi]cias\b/i);
    const iEquip= _idx(t, /\bEquipamento\b/i);
    const iTes  = _idx(t, /\bTesouro\b/i);

    // menor índice válido a partir de um ponto — para achar o "fim" de um trecho
    const fim = (apos, candidatos) => {
      const vs = candidatos.filter(x => x > apos);
      return vs.length ? Math.min(...vs) : t.length;
    };

    const cr = novaCriatura();
    // valores de "caixinha" entram sem o "+" (só número; negativo mantém "-")
    const setStat = (chave, v) => {
      if (v == null || v === '') return;
      cr.stats[chave].padrao = String(v).trim().replace(/^\+/, '').replace(/^[–—−]/, '-');
    };
    const num = (re, seg) => { const m = (seg).match(re); return m ? m[1].replace(/\s/g, '') : ''; };

    // 3) CABEÇALHO: nome + [ND] + [descrição] + tipo e tamanho
    //    Estrutura do livro: "Nome [ND x] [parágrafo de descrição] Tipo (raça) Tamanho"
    const cab = (iIni > 0 ? t.slice(0, iIni) : t).trim();
    const reTipo = /\b(Monstro|Morto[- ]?vivo|Mortos[- ]?vivos|Constru\w+|Esp[ií]rito|Humanoide|Animal|Animais)\b/gi;
    let mTipoUltimo = null, mm;
    while ((mm = reTipo.exec(cab)) !== null) mTipoUltimo = mm;   // pega a ÚLTIMA ocorrência (a linha de tipo fica logo antes da Iniciativa)
    let tipoTam = '', resto = cab;
    if (mTipoUltimo) {
      tipoTam = cab.slice(mTipoUltimo.index).trim();
      resto   = cab.slice(0, mTipoUltimo.index).trim();   // nome + ND + descrição
    } else {
      avisos.push('Tipo e tamanho não reconhecidos.');
    }
    // ND e descrição: o ND separa o nome do texto de descrição.
    // Aceita número, fração (1/4) ou "S+" (desafios especiais).
    const reND = /\bND\s+(S\s*\+|\d+\s*\/\s*\d+|\d+)/i;
    const mND = resto.match(reND);
    if (mND) {
      cr.nd = mND[1].replace(/\s+/g, '');
      cr.nome      = resto.slice(0, mND.index).trim();
      cr.descricao = resto.slice(mND.index + mND[0].length).trim();
    } else {
      cr.nome = resto.trim();
      // Muitas fichas do livro trazem o ND no MEIO do bloco (depois das
      // habilidades, antes de "Magias"). Se não veio no cabeçalho, procura
      // no corpo (a partir da Iniciativa, para não recolher o nome).
      const mNDcorpo = t.slice(iIni >= 0 ? iIni : 0).match(reND);
      if (mNDcorpo) cr.nd = mNDcorpo[1].replace(/\s+/g, '');
    }
    // nome com vírgula colada (artefato do PDF): "Gatzvalith,Lorde" -> ", "
    if (cr.nome) cr.nome = cr.nome.replace(/,(?=\S)/g, ', ');
    cr.tipoTamanho = tipoTam;

    // 4) SENTIDOS (linha da Iniciativa): Iniciativa, Percepção + texto de sentidos
    if (iIni >= 0) {
      const segSent = t.slice(iIni, fim(iIni, [iDef, iPV, iDesl, iPM, iAtk, iAtr]));
      setStat('iniciativa', num(/Iniciativa\s*([+\-–]?\d+)/i, segSent));
      setStat('percepcao',  num(/Percep[çc][ãa]o\s*([+\-–]?\d+)/i, segSent));
      // texto extra de sentidos (após o número da Percepção) -> campo Tags
      const mP = segSent.match(/Percep[çc][ãa]o\s*[+\-–]?\d+\s*,?\s*(.*)$/i);
      if (mP && mP[1].trim()) cr.tags = mP[1].trim().replace(/[.;]\s*$/, '');
    } else {
      avisos.push('Linha de Iniciativa/Percepção não encontrada.');
    }

    // 5) DEFESA: Defesa, Fort, Ref, Von + defesas especiais (imunidades etc.)
    if (iDef >= 0) {
      const segDef = t.slice(iDef, fim(iDef, [iPV, iDesl, iPM, iAtk, iAtr]));
      setStat('defesa',    num(/Defesa\s*(\d+)/i, segDef));
      setStat('fortitude', num(/\bFort\.?\s*([+\-–]?\d+)/i, segDef));
      setStat('reflexos',  num(/\bRef\.?\s*([+\-–]?\d+)/i, segDef));
      setStat('vontade',   num(/\bVon\.?\s*([+\-–]?\d+)/i, segDef));
      // o que vem depois do valor de Von = defesas especiais
      const mV = segDef.match(/\bVon\.?\s*[+\-–]?\d+\s*,?\s*(.*)$/i);
      if (mV && mV[1].trim()) cr.condicoes = mV[1].trim().replace(/\s*$/,'');
    } else {
      avisos.push('Linha de Defesa não encontrada.');
    }

    // 6) PV e PM — criaturas poderosas usam separador de milhar ("3.700");
    //    captura os dígitos com pontos e remove os pontos.
    setStat('pv', num(/Pontos?\s+de\s+Vida\s*([\d.]+)/i, t).replace(/\./g, ''));
    setStat('pm', num(/Pontos?\s+de\s+Mana\s*([\d.]+)/i, t).replace(/\./g, ''));

    // 7) DESLOCAMENTO (e tipos: voo, natação, escalada, escavação)
    if (iDesl >= 0) {
      // A "linha" de deslocamento é uma sequência de entradas "<tipo> Xm (Nq)".
      // Captura SÓ essas entradas — assim, quando não há âncora de PM/ataque
      // depois (criaturas só com habilidades, ex.: Enxame Infernal), não engole
      // o texto das habilidades para dentro de "voo/natação/...".
      const mDesl = t.slice(iDesl).match(/^Deslocamento\s+((?:[^,]*?\d+\s*m\s*\(\s*\d+\s*q\s*\)\s*,?\s*)+)/i);
      const segDesl = mDesl
        ? mDesl[1]
        : t.slice(iDesl, fim(iDesl, [iPM, iAtk, iAtr])).replace(/^Deslocamento\s*/i, '');
      segDesl.split(',').forEach((parte, k) => {
        const p = parte.trim();
        if (!p) return;
        let m;
        if      (m = p.match(/^vo(?:o|ar)\s+(.+)/i))            setStat('desVoo',       m[1]);
        else if (m = p.match(/^(?:nata[çc][ãa]o|nad\w+)\s+(.+)/i)) setStat('desNatacao',   m[1]);
        else if (m = p.match(/^escal\w*\s+(.+)/i))              setStat('desEscalada',  m[1]);
        else if (m = p.match(/^escav\w*\s+(.+)/i))              setStat('desEscavacao', m[1]);
        else if (k === 0)                                       setStat('deslocamento', p);
      });
    }

    // 8) BLOCO DE ATAQUES E HABILIDADES (texto livre -> caixa de ataques)
    if (iAtr > 0) {
      const inicioAtk = (iAtk >= 0 && iAtk < iAtr) ? iAtk
                       : (iPM >= 0 && iPM < iAtr ? iPM : (iDesl >= 0 ? iDesl : iPV));
      let bloco = t.slice(inicioAtk, iAtr).trim();
      // se começou no Deslocamento/PM, remove esse trechinho inicial já usado
      bloco = bloco.replace(/^Deslocamento[^]*?(?=(Corpo a Corpo|À Distância|[A-ZÀ-Ý]))/i, '')
                   .replace(/^Pontos?\s+de\s+Mana\s*\d+\s*/i, '');
      // o ND, quando aparece no meio do bloco, já foi extraído para o campo
      // próprio — remove o token solto para não sujar a caixa de ataques.
      bloco = bloco.replace(/\bND\s+(?:S\s*\+|\d+\s*\/\s*\d+|\d+)\b/gi, ' ')
                   .replace(/\s{2,}/g, ' ').trim();
      if (bloco) cr.ataques = _txtParaHtml(_formatarAtaques(bloco));
    }

    // 9) ATRIBUTOS (vai até Perícias/Equipamento/Tesouro, o que vier antes)
    if (iAtr >= 0) {
      const segAtr = t.slice(iAtr, fim(iAtr, [iPer, iEquip, iTes]));
      cr.atributos = segAtr.replace(/\s*[.;]\s*$/, '').trim();
    } else {
      avisos.push('Atributos (For… Car) não encontrados.');
    }

    // 10) PERÍCIAS (vai até Equipamento, se houver; senão até Tesouro)
    if (iPer >= 0) {
      const fimPer = fim(iPer, [iEquip, iTes]);
      const segPer = t.slice(iPer, fimPer).replace(/^Per[íi]cias\s*/i, '');
      cr.pericias = segPer.replace(/\s*[.;]\s*$/, '').trim();
    }

    // 10b) EQUIPAMENTO (caixa própria — não vai para o Tesouro)
    if (iEquip >= 0) {
      const segEq = t.slice(iEquip, iTes > iEquip ? iTes : t.length).replace(/^Equipamento\s*/i, '');
      cr.equipamento = segEq.replace(/\s*[.;]\s*$/, '').trim();
    }

    // 11) TESOURO -> Recompensas
    if (iTes >= 0) {
      cr.recompensas = t.slice(iTes).replace(/^Tesouro\s*/i, '').trim();
    }

    // 12) CHIPS automáticos -------------------------------------------------
    const tl = _semAcento(t);
    // tipo (um só) — procura SÓ no trecho de tipo+tamanho (evita pegar
    // menções soltas, ex.: "humanoide" dentro da descrição de uma magia)
    for (const tt of _TIPO_TEXTO) { if (tt.re.test(tipoTam)) { cr.tipoCriatura = tt.chave; break; } }
    // sentidos (vários)
    SENTIDOS.forEach(s => { if (tl.indexOf(_semAcento(s.nome)) >= 0) cr.sentidos.push(s.chave); });
    // habilidades gerais (várias) — casa pelo nome; nomes "X a…" casam pelo radical
    HABILIDADES_GERAIS.forEach(h => {
      const base = _semAcento(h.nome).replace(/\s*…\s*$/, '').replace(/\s*\(rd\)\s*/, '');
      if (base && tl.indexOf(base) >= 0) cr.habilidades.push(h.chave);
    });
    // "redução de dano" às vezes aparece como "RD 10"
    if (cr.habilidades.indexOf('reducaoDeDano') < 0 && /\brd\s*\d/i.test(t)) cr.habilidades.push('reducaoDeDano');

    // Atual já nasce igual ao Padrão na importação (o mestre só ajusta em jogo
    // o que mudar) — evita ter de copiar PV/PM/Defesa… um por um.
    STATS.forEach(s => {
      const st = cr.stats[s.chave];
      if (st && st.padrao !== '' && !st.atual) st.atual = st.padrao;
    });

    return { cr, avisos };
  }

  // ── MODAL DE IMPORTAÇÃO ──────────────────────────────────────────
  let _impAlvo = null;   // { s, c }

  function abrirModalImportar(si, ci) {
    fecharModalImportar();
    _impAlvo = { s: si, c: ci };
    const overlay = document.createElement('div');
    overlay.id = 'mzImpModal';
    overlay.className = 'mz-cond-overlay';
    overlay.innerHTML = `
      <div class="mz-cond-modal mz-imp-modal" role="dialog" aria-modal="true">
        <div class="mz-cond-modal-head">
          <span>📋 Importar ficha do livro</span>
          <button class="mz-cond-modal-x" data-imp-fechar title="Fechar">✕</button>
        </div>
        <div class="mz-imp-corpo">
          <label class="mz-imp-rotulo">Cole a ficha (com ou sem quebras de linha):</label>
          <textarea class="mz-imp-entrada" rows="9" placeholder="Ex.: Garra-Zumbi  Morto-vivo Minúsculo  Iniciativa +4, Percepção +1…"></textarea>
          <div class="mz-imp-previa" id="mzImpPrevia">
            <p class="mz-imp-vazio">A pré-visualização aparece aqui conforme você cola o texto.</p>
          </div>
        </div>
        <div class="mz-cond-modal-pe mz-imp-pe">
          <span class="mz-imp-dica">Revise a prévia — campos estruturados saem prontos; o texto de ataques/habilidades vai para a caixa correspondente.</span>
          <button class="mz-imp-criar" data-imp-criar disabled>Criar criatura</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);

    const entrada = overlay.querySelector('.mz-imp-entrada');
    const botaoCriar = overlay.querySelector('[data-imp-criar]');
    let ultimo = null;

    function atualizarPrevia() {
      const r = parsearFicha(entrada.value);
      ultimo = r.cr;
      const previa = overlay.querySelector('#mzImpPrevia');
      if (!r.cr) {
        previa.innerHTML = '<p class="mz-imp-vazio">A pré-visualização aparece aqui conforme você cola o texto.</p>';
        botaoCriar.disabled = true;
        return;
      }
      botaoCriar.disabled = false;
      const cr = r.cr;
      const linha = (rotulo, valor) => valor ? `<div class="mz-imp-campo"><span>${rotulo}</span><b>${esc(valor)}</b></div>` : '';
      const chipNomes = (arr, porChave) => arr.map(k => esc((porChave[k]||{}).nome || k)).join(', ');
      const tipoNome = cr.tipoCriatura ? (TIPO_POR_CHAVE[cr.tipoCriatura]||{}).nome : '';
      const st = cr.stats;
      const desl = [st.deslocamento.padrao && ('base ' + st.deslocamento.padrao),
                    st.desVoo.padrao && ('voo ' + st.desVoo.padrao),
                    st.desNatacao.padrao && ('natação ' + st.desNatacao.padrao),
                    st.desEscalada.padrao && ('escalada ' + st.desEscalada.padrao),
                    st.desEscavacao.padrao && ('escavação ' + st.desEscavacao.padrao)].filter(Boolean).join(', ');
      previa.innerHTML =
        linha('Nome', cr.nome) +
        linha('ND', cr.nd) +
        linha('Tipo e tamanho', cr.tipoTamanho) +
        linha('Tipo (chip)', tipoNome) +
        linha('Sentidos', chipNomes(cr.sentidos, SENTIDO_POR_CHAVE)) +
        linha('Iniciativa', st.iniciativa.padrao) +
        linha('Percepção', st.percepcao.padrao) +
        linha('Defesa', st.defesa.padrao) +
        linha('Fort / Ref / Von', [st.fortitude.padrao, st.reflexos.padrao, st.vontade.padrao].filter(v=>v!=='').join(' / ')) +
        linha('PV / PM', [st.pv.padrao, st.pm.padrao].filter(v=>v!=='').join(' / ')) +
        linha('Deslocamento', desl) +
        linha('Defesas especiais', cr.condicoes) +
        linha('Habilidades (chips)', chipNomes(cr.habilidades, HAB_POR_CHAVE)) +
        linha('Atributos', cr.atributos) +
        linha('Perícias', cr.pericias) +
        linha('Equipamento', cr.equipamento) +
        linha('Tesouro', cr.recompensas) +
        (cr.ataques ? `<div class="mz-imp-campo mz-imp-campo--bloco"><span>Ataque e Habilidades</span><div class="mz-imp-bloco">${cr.ataques}</div></div>` : '') +
        (cr.descricao ? `<div class="mz-imp-campo mz-imp-campo--bloco"><span>Descrição</span><div class="mz-imp-bloco">${esc(cr.descricao)}</div></div>` : '') +
        (r.avisos.length ? `<div class="mz-imp-avisos">⚠ ${r.avisos.map(esc).join(' · ')}</div>` : '');
    }

    overlay.addEventListener('click', e => {
      if (e.target === overlay || e.target.closest('[data-imp-fechar]')) { fecharModalImportar(); return; }
      if (e.target.closest('[data-imp-criar]') && ultimo) {
        const cena = dados.sessoes[_impAlvo.s].cenas[_impAlvo.c];
        normalizarCriatura(ultimo);
        cena.criaturas.push(ultimo);
        salvar();
        fecharModalImportar();
        render();
      }
    });
    entrada.addEventListener('input', atualizarPrevia);
    document.addEventListener('keydown', _impEsc);
    setTimeout(() => entrada.focus(), 50);
  }

  function _impEsc(e) { if (e.key === 'Escape') fecharModalImportar(); }

  function fecharModalImportar() {
    const el = document.getElementById('mzImpModal');
    if (el) el.remove();
    document.removeEventListener('keydown', _impEsc);
    _impAlvo = null;
  }

  // ═══════════════════════════════════════════════════════════════
  //  BIBLIOTECA DE PERIGOS COMPLEXOS (botão "⚠ Perigos complexos")
  //  Lista window.PERIGOS_COMPLEXOS; clicar insere o perigo na cena.
  // ═══════════════════════════════════════════════════════════════
  let _perigoAlvo = null;   // { s, c }

  function abrirModalPerigos(si, ci) {
    fecharModalPerigos();
    _perigoAlvo = { s: si, c: ci };
    const lib = Array.isArray(window.PERIGOS_COMPLEXOS) ? window.PERIGOS_COMPLEXOS : [];

    let linhas = '';
    lib.forEach(def => {
      linhas += `
        <button class="mz-cond-opcao mz-perigo-opcao" style="--cor:#5c1a04"
                data-perigo-inserir="${def.chave}" data-nome="${esc(def.nome).toLowerCase()}">
          <span class="mz-cond-opcao-cab">
            <span class="mz-cond-opcao-check">＋</span>
            <span class="mz-cond-opcao-nome">${esc(def.nome)}</span>
            <span class="mz-perigo-nd">ND ${esc(def.nd)}</span>
            ${def.fonte ? `<span class="mz-cond-opcao-cat">${esc(def.fonte)}</span>` : ''}
          </span>
          <span class="mz-cond-opcao-desc"><strong>Objetivo:</strong> ${esc(def.objetivo || '')}</span>
        </button>`;
    });
    if (!linhas) linhas = '<p class="mz-imp-vazio">Nenhum perigo na biblioteca (perigos-data.js não carregou).</p>';

    const overlay = document.createElement('div');
    overlay.id = 'mzPerigoModal';
    overlay.className = 'mz-cond-overlay';
    overlay.innerHTML = `
      <div class="mz-cond-modal" role="dialog" aria-modal="true">
        <div class="mz-cond-modal-head">
          <span>⚠ Perigos complexos — inserir na cena</span>
          <button class="mz-cond-modal-x" data-perigo-fechar title="Fechar">✕</button>
        </div>
        <input class="mz-cond-busca" type="text" placeholder="Buscar perigo…" autocomplete="off">
        <div class="mz-cond-modal-corpo">${linhas}</div>
        <div class="mz-cond-modal-pe">Clique em um perigo para inseri-lo na cena. Depois é só editar o texto ou ajustar o ND.</div>
      </div>`;
    document.body.appendChild(overlay);

    overlay.addEventListener('click', e => {
      if (e.target === overlay || e.target.closest('[data-perigo-fechar]')) { fecharModalPerigos(); return; }
      const opc = e.target.closest('[data-perigo-inserir]');
      if (opc) inserirPerigo(opc.dataset.perigoInserir);
    });

    const busca = overlay.querySelector('.mz-cond-busca');
    busca.addEventListener('input', () => {
      const termo = busca.value.trim().toLowerCase();
      overlay.querySelectorAll('.mz-cond-opcao').forEach(o => {
        o.style.display = o.dataset.nome.indexOf(termo) >= 0 ? '' : 'none';
      });
    });

    document.addEventListener('keydown', _perigoEsc);
    setTimeout(() => busca.focus(), 50);
  }

  function _perigoEsc(e) { if (e.key === 'Escape') fecharModalPerigos(); }

  function fecharModalPerigos() {
    const el = document.getElementById('mzPerigoModal');
    if (el) el.remove();
    document.removeEventListener('keydown', _perigoEsc);
    _perigoAlvo = null;
  }

  function inserirPerigo(chave) {
    if (!_perigoAlvo) return;
    const lib = Array.isArray(window.PERIGOS_COMPLEXOS) ? window.PERIGOS_COMPLEXOS : [];
    const def = lib.find(d => d.chave === chave);
    if (!def) return;
    const cena = dados.sessoes[_perigoAlvo.s].cenas[_perigoAlvo.c];
    if (!Array.isArray(cena.perigos)) cena.perigos = [];
    cena.perigos.push(novoPerigo(def));
    salvar();
    fecharModalPerigos();
    render();
  }

  // ═══════════════════════════════════════════════════════════════
  //  BIBLIOTECA DO GUIA DE NPCS (botão "👤 Guia de NPCs")
  //  Lista window.GUIA_NPCS (js/npcs-data.js); clicar insere uma cópia
  //  completa e editável da ficha na cena. O texto da biblioteca passa
  //  pelo MESMO parser do "📋 Importar do livro" (parsearFicha), então
  //  a criatura nasce com stats, chips e caixas preenchidos.
  // ═══════════════════════════════════════════════════════════════
  let _npcAlvo = null;   // { s, c }

  function _guiaNPCCategorias() {
    const g = window.GUIA_NPCS;
    return (g && Array.isArray(g.categorias)) ? g.categorias : [];
  }
  function _guiaNPCPorChave(chave) {
    let achado = null;
    _guiaNPCCategorias().forEach(cat => (cat.fichas || []).forEach(f => {
      if (f.chave === chave) achado = f;
    }));
    return achado;
  }
  // categoria (chave) de uma ficha do Guia — para as dicas do modal
  function _guiaNPCCatDe(chave) {
    let achada = null;
    _guiaNPCCategorias().forEach(cat => (cat.fichas || []).forEach(f => {
      if (f.chave === chave) achada = cat.chave;
    }));
    return achada;
  }
  // ND em número, para ordenar ("1/4" -> 0.25; "S+" e vazios vão pro fim)
  function _ndValor(nd) {
    const s = String(nd || '').trim();
    const fr = s.match(/^(\d+)\s*\/\s*(\d+)$/);
    if (fr) return (+fr[1]) / (+fr[2]);
    const n = parseFloat(s.replace(',', '.'));
    return isNaN(n) ? 999 : n;
  }

  // Monta uma criatura do bestiário a partir de uma ficha da biblioteca.
  function criaturaDeGuiaNPC(def) {
    const r = parsearFicha(def.texto);
    if (!r || !r.cr) return null;
    const cr = r.cr;
    // chips que o parser não pesca pelo texto (ex.: "resistência mental")
    (def.habilidadesExtra || []).forEach(k => {
      if (HAB_POR_CHAVE[k] && cr.habilidades.indexOf(k) < 0) cr.habilidades.push(k);
    });
    normalizarCriatura(cr);
    return cr;
  }

  // ── REGRAS ESPECIAIS DO GUIA (raça / truque mercenário / devoto) ──
  // Aplicadas sobre a criatura recém-parseada, ANTES de entrar na cena.
  // Ajustes numéricos entram direto nas caixinhas; o que é textual vira
  // uma linha rotulada na caixa de Ataque e Habilidades — o mestre vê
  // exatamente o que foi somado e o que ainda é escolha manual.

  // Soma um delta numérico numa caixinha de stat (padrão e atual juntos —
  // a ficha acabou de nascer, os dois ainda são iguais).
  function _somarStat(cr, chave, delta) {
    const st = cr.stats[chave];
    if (!st) return false;
    const v = parseInt(String(st.padrao).replace(/[–—−]/g, '-'), 10);
    if (isNaN(v)) return false;
    st.padrao = String(v + delta);
    st.atual = st.padrao;
    return true;
  }

  // ND numérico para os ajustes de PV por ND (fração "1/4" → 0.25;
  // ilegível → 1, para a raça nunca sair "de graça").
  function _ndNumero(nd) {
    const v = _ndValor(nd);
    return v >= 900 ? 1 : Math.max(v, 0.25);
  }

  // "For 2, Des 0, … Car 1" + {Con:+1, Des:-1} → linha ajustada.
  // Mantém o travessão "–" dos negativos (padrão das fichas do livro).
  function _ajustarAtributos(cr, deltas) {
    if (!cr.atributos) return;
    let txt = cr.atributos;
    Object.keys(deltas).forEach(atr => {
      const re = new RegExp('\\b(' + atr + ')\\s+([+\\-–—−]?\\d+)', 'i');
      const m = txt.match(re);
      if (!m) return;
      const v = parseInt(m[2].replace(/[–—−]/g, '-'), 10) + deltas[atr];
      txt = txt.replace(re, '$1 ' + (v < 0 ? '–' + Math.abs(v) : v));
    });
    cr.atributos = txt;
  }

  // Deslocamento base: valor fixo ("6m (4q)") ou delta em metros.
  function _ajustarDeslocamento(cr, raca) {
    const st = cr.stats.deslocamento;
    if (!st) return;
    if (raca.deslocamentoFixo) { st.padrao = raca.deslocamentoFixo; st.atual = st.padrao; return; }
    if (raca.deslocamentoDelta) {
      const m = String(st.padrao).match(/(\d+(?:[.,]\d+)?)\s*m/);
      if (!m) return;
      const metros = Math.max(0, parseFloat(m[1].replace(',', '.')) + raca.deslocamentoDelta);
      st.padrao = metros + 'm (' + Math.round(metros / 1.5) + 'q)';
      st.atual = st.padrao;
    }
  }

  // Linha de tipo: troca a raça entre parênteses, o tamanho e, para
  // suraggel, o tipo Humanoide → Espírito (chip incluído).
  function _ajustarTipoLinha(cr, raca) {
    let t = cr.tipoTamanho || '';
    if (raca.racaTexto) {
      if (/\([^)]*\)/.test(t)) t = t.replace(/\([^)]*\)/, '(' + raca.racaTexto + ')');
      else if (t) t = t + ' (' + raca.racaTexto + ')';
    }
    if (raca.tamanho) {
      const reTam = /\b(Min[úu]sculo|Pequeno|M[ée]dio|Grande|Enorme|Colossal)\b/i;
      t = reTam.test(t) ? t.replace(reTam, raca.tamanho) : (t + ' ' + raca.tamanho).trim();
    }
    if (raca.tipoEspirito) {
      t = t.replace(/^Humanoide/i, 'Espírito');
      cr.tipoCriatura = 'espiritos';
    }
    cr.tipoTamanho = t;
  }

  // Aplica raça (NPCs de Outras Raças), truque mercenário e devoto/poder
  // concedido. Devolve a lista de descrições do que foi aplicado.
  function aplicarRegrasEspeciaisNPC(cr, opcoes) {
    const aplicado = [];
    const g = window.GUIA_NPCS || {};
    const G = window.GA_DEVOTOS;

    // 1) raça — ajustes do quadro "NPCs de Outras Raças"
    const raca = (g.racas || []).find(r => r.chave === (opcoes.raca || ''));
    if (raca) {
      if (raca.atrib) _ajustarAtributos(cr, raca.atrib);
      Object.keys(raca.stats || {}).forEach(k => _somarStat(cr, k, raca.stats[k]));
      if (raca.pvPorND) {
        const delta = Math.max(1, Math.round(Math.abs(raca.pvPorND) * _ndNumero(cr.nd)));
        _somarStat(cr, 'pv', raca.pvPorND < 0 ? -delta : delta);
      }
      _ajustarDeslocamento(cr, raca);
      if (raca.escaladaIgualDesloc && cr.stats.deslocamento.padrao) {
        cr.stats.desEscalada.padrao = cr.stats.deslocamento.padrao;
        cr.stats.desEscalada.atual = cr.stats.desEscalada.padrao;
      }
      if (raca.natacao) { cr.stats.desNatacao.padrao = raca.natacao; cr.stats.desNatacao.atual = raca.natacao; }
      (raca.sentidos || []).forEach(sk => { if (cr.sentidos.indexOf(sk) < 0) cr.sentidos.push(sk); });
      _ajustarTipoLinha(cr, raca);
      cr.ataques = (cr.ataques || '') +
        `<div><strong>Raça — ${esc(raca.nome)} (Guia de NPCs):</strong> ajustes já aplicados na ficha: ${esc(raca.auto)}.` +
        (raca.linha ? ' ' + _txtParaHtml(raca.linha) : '') + '</div>';
      cr.nome = ((cr.nome || '') + ' (' + raca.racaTexto + ')').trim();
      aplicado.push('raça ' + raca.nome);
    }

    // 2) truque mercenário — regra das companhias (um truque para todos)
    const truque = (g.truques || []).find(t => t.chave === (opcoes.truque || ''));
    if (truque) {
      Object.keys(truque.stats || {}).forEach(k => _somarStat(cr, k, truque.stats[k]));
      if (truque.critMult) {
        const ordem = ['x2', 'x3', 'x4', 'x5'];
        const i = ordem.indexOf(cr.critMult);
        cr.critMult = ordem[Math.min(ordem.length - 1, (i < 0 ? 0 : i) + truque.critMult)];
      }
      cr.ataques = (cr.ataques || '') +
        `<div><strong>Truque mercenário — ${esc(truque.nome)}:</strong> ${_txtParaHtml(truque.linha)}</div>`;
      aplicado.push('truque ' + truque.nome);
    }

    // 3) devoto + poder concedido — regra d'O Templo (vale para qualquer ficha)
    if (G && opcoes.deus && G.deusPorChave[opcoes.deus]) {
      const d = G.deusPorChave[opcoes.deus];
      cr.devoto = d.chave;
      let pChave = opcoes.poder || '';
      if (pChave === '~sortear') {
        const lista = G.poderesDoDeus(d.chave);
        pChave = lista.length ? lista[Math.floor(Math.random() * lista.length)].chave : '';
      }
      const p = G.poderPorChave[pChave];
      if (p && p.deuses.indexOf(d.chave) >= 0) {
        cr.ataques = (cr.ataques || '') + _linhaPoderHtml(p, d);
        aplicado.push('devoto de ' + d.nome + ' — poder: ' + p.nome);
      } else {
        aplicado.push('devoto de ' + d.nome);
      }
    }

    return aplicado;
  }

  // "Guarda Palaciano", depois "Guarda Palaciano 2", "… 3" — por cena.
  function _nomeUnicoNaCena(cena, nome) {
    const base = String(nome || 'NPC').trim();
    const existe = n => cena.criaturas.some(cr =>
      String(cr.nome || '').trim().toLowerCase() === n.toLowerCase());
    if (!existe(base)) return base;
    let n = 2;
    while (existe(base + ' ' + n)) n++;
    return base + ' ' + n;
  }

  // Insere o NPC na cena indicada, aplicando as regras especiais pedidas
  // (opcoes = { raca, truque, deus, poder }, todas opcionais).
  // Devolve { cr, aplicado: [descrições] } ou null.
  function inserirNPCNaCena(chave, si, ci, opcoes) {
    const def = _guiaNPCPorChave(chave);
    const sessao = dados.sessoes[si];
    const cena = sessao && sessao.cenas[ci];
    if (!def || !cena) return null;
    const cr = criaturaDeGuiaNPC(def);
    if (!cr) return null;
    const aplicado = aplicarRegrasEspeciaisNPC(cr, opcoes || {});
    cr.nome = _nomeUnicoNaCena(cena, cr.nome || def.nome);
    cr.aberto = false;   // entra recolhida — pronta, sem inundar a tela
    cena.criaturas.push(cr);
    salvar();
    render();
    return { cr: cr, aplicado: aplicado };
  }

  function abrirModalNPCs(si, ci) {
    fecharModalNPCs();
    _npcAlvo = { s: si, c: ci };
    const cats = _guiaNPCCategorias();

    let grupos = '';
    cats.forEach(cat => {
      const fichas = (cat.fichas || []).slice()
        .sort((a, b) => _ndValor(a.nd) - _ndValor(b.nd) || a.nome.localeCompare(b.nome, 'pt'));
      let linhas = '';
      fichas.forEach(f => {
        const busca = _semAcento([f.nome, 'nd ' + f.nd, f.tipo, f.resumo, cat.nome].join(' '));
        linhas += `
          <button class="mz-cond-opcao mz-npc-opcao" style="--cor:${cat.cor || '#6e6256'}"
                  data-npc-inserir="${f.chave}" data-busca="${esc(busca)}">
            <span class="mz-cond-opcao-cab">
              <span class="mz-cond-opcao-check">＋</span>
              <span class="mz-cond-opcao-nome">${esc(f.nome)}</span>
              <span class="mz-perigo-nd">ND ${esc(f.nd)}</span>
              <span class="mz-cond-opcao-cat">${esc(f.tipo || '')}</span>
            </span>
            <span class="mz-cond-opcao-desc">${esc(f.resumo || '')}</span>
          </button>`;
      });
      grupos += `
        <div class="mz-npc-grupo" data-npc-grupo="${cat.chave}">
          <div class="mz-npc-grupo-titulo" style="--cor:${cat.cor || '#6e6256'}">${esc(cat.icone || '')} ${esc(cat.nome)}</div>
          ${linhas}
        </div>`;
    });
    if (!grupos) grupos = '<p class="mz-imp-vazio">Nenhum NPC na biblioteca (npcs-data.js não carregou).</p>';

    let chips = '<button class="mz-npc-cat ativo" data-npc-cat="">Todas</button>';
    cats.forEach(cat => {
      chips += `<button class="mz-npc-cat" data-npc-cat="${cat.chave}" style="--cor:${cat.cor || '#6e6256'}">${esc(cat.icone || '')} ${esc(cat.nome)}</button>`;
    });

    // barra "⚙ Regras especiais": raça (NPCs de Outras Raças), truque
    // mercenário e devoto + poder concedido (regra d'O Templo). O que
    // estiver escolhido aqui é aplicado a CADA ficha inserida.
    const RACAS = (window.GUIA_NPCS && window.GUIA_NPCS.racas) || [];
    const TRUQUES = (window.GUIA_NPCS && window.GUIA_NPCS.truques) || [];
    const DEV = window.GA_DEVOTOS;
    let regrasBar = '';
    if (RACAS.length || TRUQUES.length || DEV) {
      const optR = ['<option value="">Humano — ficha original</option>']
        .concat(RACAS.map(r =>
          `<option value="${r.chave}" title="${esc(r.auto + (r.linha ? ' · ' + r.linha : ''))}">${esc(r.nome)}</option>`)).join('');
      const optT = ['<option value="">— nenhum —</option>']
        .concat(TRUQUES.map(t => `<option value="${t.chave}" title="${esc(t.linha)}">${esc(t.nome)}</option>`)).join('');
      const optD = ['<option value="">— não é devoto —</option>']
        .concat((DEV ? DEV.deuses : []).map(d =>
          `<option value="${d.chave}">${d.icone} ${esc(d.nome)} — ${esc(d.titulo)}</option>`)).join('');
      regrasBar = `
        <details class="mz-npc-regras">
          <summary class="mz-npc-regras-tit">⚙ Regras especiais — aplicadas a cada NPC inserido</summary>
          <div class="mz-npc-regras-corpo">
            <div class="mz-npc-regras-grade">
              <label class="mz-npc-regra">🧬 Raça (NPCs de Outras Raças)
                <select data-npc-raca>${optR}</select></label>
              <label class="mz-npc-regra">⚔ Truque mercenário
                <select data-npc-truque>${optT}</select></label>
              <label class="mz-npc-regra">🙏 Devoto de
                <select data-npc-deus>${optD}</select></label>
              <label class="mz-npc-regra">Poder concedido
                <select data-npc-poder disabled><option value="">— primeiro escolha o deus —</option></select></label>
            </div>
            <p class="mz-npc-regras-dica">A raça ajusta a ficha automaticamente (atributos, defesas, PV, sentidos, deslocamento — o que não é numérico entra como linha na ficha). O truque é a regra das companhias mercenárias: aplique o <strong>mesmo</strong> truque a toda a companhia. As fichas d'O Templo são devotas por regra: escolha o deus e um poder concedido — a ficha ganha o bloco de devoto com Crenças e Obrigações &amp; Restrições. Consulte a sub-aba 🙏 Poderes Concedidos.</p>
          </div>
        </details>`;
    }

    const overlay = document.createElement('div');
    overlay.id = 'mzNPCModal';
    overlay.className = 'mz-cond-overlay';
    overlay.innerHTML = `
      <div class="mz-cond-modal mz-npc-modal" role="dialog" aria-modal="true">
        <div class="mz-cond-modal-head">
          <span>👤 Guia de NPCs — inserir na cena</span>
          <button class="mz-cond-modal-x" data-npc-fechar title="Fechar">✕</button>
        </div>
        <input class="mz-cond-busca" type="text" placeholder="Buscar NPC (guarda, acólito, ND 2…)" autocomplete="off">
        <div class="mz-npc-cats">${chips}</div>
        ${regrasBar}
        <div class="mz-cond-modal-corpo">${grupos}</div>
        <div class="mz-cond-modal-pe" data-npc-pe>Clique em um NPC para adicioná-lo à cena — o modal continua aberto, dá para montar o encontro inteiro. As fichas entram recolhidas e editáveis.</div>
      </div>`;
    document.body.appendChild(overlay);

    // trocar o deus repopula o seletor de poderes concedidos
    overlay.addEventListener('input', e => {
      if (e.target && e.target.matches && e.target.matches('[data-npc-deus]')) {
        const selPoder = overlay.querySelector('[data-npc-poder]');
        if (selPoder) {
          selPoder.innerHTML = _opcoesPoderHtml(e.target.value);
          selPoder.disabled = !e.target.value;
        }
      }
    });
    // o que está escolhido na barra de regras especiais agora
    function _opcoesEspeciais() {
      const val = sel => { const el = overlay.querySelector(sel); return (el && el.value) || ''; };
      return {
        raca: val('[data-npc-raca]'),
        truque: val('[data-npc-truque]'),
        deus: val('[data-npc-deus]'),
        poder: val('[data-npc-poder]'),
      };
    }

    let catAtiva = '';
    const busca = overlay.querySelector('.mz-cond-busca');

    function aplicarFiltro() {
      const termo = _semAcento(busca.value.trim());
      overlay.querySelectorAll('.mz-npc-grupo').forEach(g => {
        const daCat = !catAtiva || g.dataset.npcGrupo === catAtiva;
        let algum = false;
        g.querySelectorAll('[data-npc-inserir]').forEach(o => {
          const bate = daCat && (!termo || o.dataset.busca.indexOf(termo) >= 0);
          o.style.display = bate ? '' : 'none';
          if (bate) algum = true;
        });
        g.style.display = algum ? '' : 'none';
      });
    }

    overlay.addEventListener('click', e => {
      if (e.target === overlay || e.target.closest('[data-npc-fechar]')) { fecharModalNPCs(); return; }
      const chip = e.target.closest('[data-npc-cat]');
      if (chip) {
        catAtiva = chip.dataset.npcCat;
        overlay.querySelectorAll('.mz-npc-cat').forEach(b =>
          b.classList.toggle('ativo', b === chip));
        aplicarFiltro();
        return;
      }
      const opc = e.target.closest('[data-npc-inserir]');
      if (opc && _npcAlvo) {
        const opcoes = _opcoesEspeciais();
        const res = inserirNPCNaCena(opc.dataset.npcInserir, _npcAlvo.s, _npcAlvo.c, opcoes);
        if (!res) return;
        // feedback sem fechar o modal: ✓ na linha + aviso no rodapé
        opc.classList.add('mz-npc-ok');
        const check = opc.querySelector('.mz-cond-opcao-check');
        if (check) check.textContent = '✓';
        setTimeout(() => {
          opc.classList.remove('mz-npc-ok');
          if (check) check.textContent = '＋';
        }, 900);
        const pe = overlay.querySelector('[data-npc-pe]');
        if (pe) {
          const extras = res.aplicado.length ? ' — ' + esc(res.aplicado.join(' · ')) : '';
          // fichas d'O Templo são devotas por regra — lembra o mestre
          const dicaTemplo = (!opcoes.deus && _guiaNPCCatDe(opc.dataset.npcInserir) === 'templo')
            ? '<br>💡 Fichas d\'O Templo são devotas por regra: escolha um deus e um poder concedido em "⚙ Regras especiais".'
            : '';
          pe.innerHTML = `✓ <strong>${esc(res.cr.nome)}</strong> adicionado à cena${extras}.${dicaTemplo}`;
        }
      }
    });

    busca.addEventListener('input', aplicarFiltro);
    document.addEventListener('keydown', _npcEsc);
    setTimeout(() => busca.focus(), 50);
  }

  function _npcEsc(e) { if (e.key === 'Escape') fecharModalNPCs(); }

  function fecharModalNPCs() {
    const el = document.getElementById('mzNPCModal');
    if (el) el.remove();
    document.removeEventListener('keydown', _npcEsc);
    _npcAlvo = null;
  }

  // ═══════════════════════════════════════════════════════════════
  //  AMBIENTE DA CENA — popup de regras + seletor (multi)
  // ═══════════════════════════════════════════════════════════════

  // Popup com as regras de um ambiente. Se vier com um alvo (cena ou
  // painel), permite editar a narração/efeito daquela instância.
  function verAmbiente(key, alvo) {
    const it = ambientePorKey(key);
    if (!it) return;
    const corpo = esc(it.corpo).replace(/\n/g, '<br>');

    let inst = null, editavel = false, notaTxt = '';
    if (alvo) {
      const arr = _ambArrDe(alvo) || [];
      inst = arr.find(a => a.key === key) || null;
      if (inst) { editavel = true; notaTxt = inst.nota || ''; }
    } else {
      notaTxt = notaAmbienteGlobal(key);   // só leitura
    }

    const blocoNota = editavel
      ? `<div class="mz-amb-nota-bloco">
           <label class="mz-rotulo">📝 Sua narração / efeito personalizado</label>
           <textarea class="mz-amb-nota" rows="4"
             placeholder="Útil para criar narrações ou efeitos personalizados.">${esc(notaTxt)}</textarea>
           <span class="mz-amb-nota-dica">Salvo automaticamente. Aparece marcado com 📝 no chip.</span>
         </div>`
      : (notaTxt
          ? `<div class="mz-amb-nota-ro"><span class="mz-amb-nota-rot">📝 Sua narração</span>${esc(notaTxt).replace(/\n/g, '<br>')}</div>`
          : '');

    const overlay = GA_abrirModal(`
      <div class="mz-amb-pop-cab" style="--cor:${corDaCatAmb(it.cat)}">
        <span class="mz-amb-pop-tag">${it.icone ? esc(it.icone) + ' ' : ''}${esc(it.catNome)}</span>
        <span class="mz-amb-pop-nome">${esc(it.nome)}${it.nd ? ` · ND ${esc(it.nd)}` : ''}</span>
        <button class="mz-cond-modal-x" data-ga-fechar title="Fechar">✕</button>
      </div>
      <div class="mz-amb-regras">${corpo}</div>
      ${blocoNota}`);

    if (editavel && inst) {
      const ta = overlay.querySelector('.mz-amb-nota');
      ta.addEventListener('input', () => { inst.nota = ta.value; salvar(); });
      // ao fechar/sair do campo, re-renderiza para o marcador 📝 do chip atualizar
      ta.addEventListener('blur', () => { render(); });
    }
  }

  // Seletor de ambientes (terreno/clima/perigos) — multi, agrupado.
  let _ambAlvo = null;   // { s, c }

  function abrirModalAmbientes(alvo) {
    fecharModalAmbientes();
    _ambAlvo = alvo;
    const ativos = _ambArrDe(alvo) || [];
    const lib = ambienteLib();
    const noPainel = (alvo && alvo.tipo === 'painel');
    const titulo = noPainel
      ? '🌪 Ambiente em jogo — Painel'
      : '🌪 Ambiente da cena — ' + (dados.sessoes[alvo.s].cenas[alvo.c].nome || 'Cena');
    const pe = noPainel
      ? 'Clique para marcar/desmarcar. Vale só para o painel (palco ao vivo) — não altera suas cenas preparadas.'
      : 'Clique para marcar/desmarcar. Os marcados aparecem na faixa desta cena.';

    const REF = window.PERIGOS_REFERENCIA || { categorias: [] };
    const ordem = (REF.categorias || []).map(c => c.chave).concat(['complexos']);

    let grupos = '';
    ordem.forEach(catKey => {
      const itens = lib.filter(i => i.cat === catKey);
      if (!itens.length) return;
      const cor = corDaCatAmb(catKey);
      let linhas = '';
      itens.forEach(it => {
        const on = ativos.some(a => a.key === it.key);
        const resumo = it.corpo.length > 160 ? it.corpo.slice(0, 160) + '…' : it.corpo;
        linhas += `
          <button class="mz-cond-opcao ${on ? 'ativo' : ''}" style="--cor:${cor}"
                  data-amb-toggle="${esc(it.key)}" data-nome="${esc(_semAcento(it.nome + ' ' + it.corpo))}">
            <span class="mz-cond-opcao-cab">
              <span class="mz-cond-opcao-check">${on ? '✓' : '＋'}</span>
              <span class="mz-cond-opcao-nome">${esc(it.nome)}</span>
              ${it.nd ? `<span class="mz-cond-opcao-cat">ND ${esc(it.nd)}</span>` : ''}
            </span>
            <span class="mz-cond-opcao-desc">${esc(resumo)}</span>
          </button>`;
      });
      grupos += `
        <div class="mz-cond-grupo">
          <div class="mz-cond-grupo-titulo" style="--cor:${cor}">${esc(itens[0].catNome)}</div>
          ${linhas}
        </div>`;
    });

    const overlay = document.createElement('div');
    overlay.id = 'mzAmbModal';
    overlay.className = 'mz-cond-overlay';
    overlay.innerHTML = `
      <div class="mz-cond-modal" role="dialog" aria-modal="true">
        <div class="mz-cond-modal-head">
          <span>${esc(titulo)}</span>
          <button class="mz-cond-modal-x" data-amb-fechar title="Fechar">✕</button>
        </div>
        <input class="mz-cond-busca" type="text" placeholder="Buscar terreno, clima, perigo…" autocomplete="off">
        <div class="mz-cond-modal-corpo">${grupos}</div>
        <div class="mz-cond-modal-pe">${pe}</div>
      </div>`;
    document.body.appendChild(overlay);

    overlay.addEventListener('click', e => {
      if (e.target === overlay || e.target.closest('[data-amb-fechar]')) { fecharModalAmbientes(); return; }
      const opc = e.target.closest('[data-amb-toggle]');
      if (opc) toggleAmbiente(opc.dataset.ambToggle, opc);
    });

    const busca = overlay.querySelector('.mz-cond-busca');
    busca.addEventListener('input', () => {
      const termo = _semAcento(busca.value.trim());
      overlay.querySelectorAll('.mz-cond-opcao').forEach(o => {
        o.style.display = o.dataset.nome.indexOf(termo) >= 0 ? '' : 'none';
      });
      overlay.querySelectorAll('.mz-cond-grupo').forEach(g => {
        const algum = Array.from(g.querySelectorAll('.mz-cond-opcao')).some(o => o.style.display !== 'none');
        g.style.display = algum ? '' : 'none';
      });
    });

    document.addEventListener('keydown', _ambEsc);
    setTimeout(() => busca.focus(), 50);
  }

  function _ambEsc(e) { if (e.key === 'Escape') fecharModalAmbientes(); }

  function fecharModalAmbientes() {
    const el = document.getElementById('mzAmbModal');
    if (el) el.remove();
    document.removeEventListener('keydown', _ambEsc);
    _ambAlvo = null;
  }

  function toggleAmbiente(key, botaoOpcao) {
    if (!_ambAlvo) return;
    const arr = _ambArrDe(_ambAlvo);
    if (!arr) return;
    const i = arr.findIndex(a => a.key === key);
    if (i >= 0) arr.splice(i, 1);
    else arr.push({ key: key, nota: '' });
    salvar();
    render();   // atualiza a faixa na cena/painel
    if (botaoOpcao) {
      const on = arr.some(a => a.key === key);
      botaoOpcao.classList.toggle('ativo', on);
      const chk = botaoOpcao.querySelector('.mz-cond-opcao-check');
      if (chk) chk.textContent = on ? '✓' : '＋';
    }
  }

  // ══════════════════════════════════════════════════════════════════
  //  BACKUP / EXPORTAÇÃO / IMPORTAÇÃO — bestiário inteiro
  //  • JSON  → restauração sem perda (sessões → cenas → criaturas).
  //            Reimporte para restaurar tudo nos devidos lugares
  //            (ex.: depois de limpar o navegador).
  //  • TXT   → versão legível para ler ou imprimir.
  //  • Importar JSON → Substituir tudo OU Adicionar (mesclar backups).
  // ══════════════════════════════════════════════════════════════════
  function _contarBestiario() {
    let cenas = 0, criaturas = 0;
    dados.sessoes.forEach(s => {
      cenas += s.cenas.length;
      s.cenas.forEach(c => { criaturas += c.criaturas.length; });
    });
    return { sessoes: dados.sessoes.length, cenas: cenas, criaturas: criaturas };
  }

  // ── EXPORTAR: JSON (backup completo) ─────────────────────────────
  function exportarBackupMonstros() {
    if (!dados.sessoes.length) { alert('Não há nada para exportar — crie ao menos uma sessão.'); return; }
    const pacote = {
      app: 'Grifos Alados',
      tipo: 'monstros',
      versao: 1,
      exportadoEm: new Date().toISOString(),
      sessoes: dados.sessoes,
    };
    baixarTxt(`bestiario_${carimboArquivo()}.json`, JSON.stringify(pacote, null, 2));
  }

  // ── EXPORTAR: TXT legível ────────────────────────────────────────
  function _txtCriatura(cr) {
    const st  = cr.stats || {};
    const v   = o => (o && o.padrao != null && o.padrao !== '') ? String(o.padrao) : '';
    const out = [];
    const add = (rot, val) => {
      val = (val == null ? '' : String(val)).trim();
      if (val) out.push('      ' + rot + ': ' + val);
    };
    const bloco = (rot, txt) => {
      txt = (txt == null ? '' : String(txt)).trim();
      if (!txt) return;
      out.push('      ' + rot + ':');
      txt.split('\n').forEach(l => out.push('        ' + l.trim()));
    };

    const cabeca = [cr.nome || '(sem nome)', cr.nd ? `[ND ${cr.nd}]` : '', cr.tipoTamanho || '']
                     .filter(Boolean).join('  ');
    out.push('  ▸ ' + cabeca);

    add('Tipo', cr.tipoCriatura ? (TIPO_POR_CHAVE[cr.tipoCriatura] || {}).nome : '');
    const _deusDev = cr.devoto && window.GA_DEVOTOS && window.GA_DEVOTOS.deusPorChave[cr.devoto];
    add('Devoto', _deusDev ? _deusDev.nome + ' — ' + _deusDev.titulo + ' (segue as Obrigações & Restrições do culto)' : '');
    add('Sentidos', (cr.sentidos || []).map(k => (SENTIDO_POR_CHAVE[k] || {}).nome || k).join(', '));
    add('Defesas', [v(st.defesa) && 'Defesa ' + v(st.defesa),
                    v(st.fortitude) && 'Fort ' + v(st.fortitude),
                    v(st.reflexos) && 'Ref ' + v(st.reflexos),
                    v(st.vontade) && 'Von ' + v(st.vontade)].filter(Boolean).join(' · '));
    add('Iniciativa / Percepção', [v(st.iniciativa) && 'Ini ' + v(st.iniciativa),
                    v(st.percepcao) && 'Per ' + v(st.percepcao)].filter(Boolean).join(' · '));
    add('Vida / Mana', [v(st.pv) && 'PV ' + v(st.pv),
                    v(st.pm) && 'PM ' + v(st.pm)].filter(Boolean).join(' · '));
    add('Deslocamento', [v(st.deslocamento) && 'base ' + v(st.deslocamento),
                    v(st.desVoo) && 'voo ' + v(st.desVoo),
                    v(st.desNatacao) && 'natação ' + v(st.desNatacao),
                    v(st.desEscalada) && 'escalada ' + v(st.desEscalada),
                    v(st.desEscavacao) && 'escavação ' + v(st.desEscavacao)].filter(Boolean).join(', '));
    add('Defesas especiais', cr.condicoes);
    add('Habilidades', (cr.habilidades || []).map(k => (HAB_POR_CHAVE[k] || {}).nome || k).join(', '));
    add('Atributos', cr.atributos);
    add('Perícias', cr.pericias);
    add('Equipamento', cr.equipamento);
    add('Tesouro / Recompensas', cr.recompensas);
    // a caixa de ataques guarda HTML — converte para texto plano
    bloco('Ataques e Habilidades', cr.ataques ? htmlParaTexto(cr.ataques) : '');
    bloco('Descrição', cr.descricao);

    return out.join('\n');
  }

  function _txtPerigo(pg) {
    const out = [];
    const add = (rot, val) => {
      val = (val == null ? '' : String(val)).trim();
      if (val) out.push('      ' + rot + ': ' + val);
    };
    const bloco = (rot, txt) => {
      txt = (txt == null ? '' : String(txt)).trim();
      if (!txt) return;
      out.push('      ' + rot + ':');
      txt.split('\n').forEach(l => out.push('        ' + l.trim()));
    };

    const cabeca = ['⚠ ' + (pg.nome || '(perigo sem nome)'),
                    pg.nd ? `[ND ${pg.nd}]` : '', pg.fonte || ''].filter(Boolean).join('  ');
    out.push('  ▸ ' + cabeca);
    add('Objetivo', pg.objetivo);
    bloco('Efeito', pg.efeito ? htmlParaTexto(pg.efeito) : '');
    bloco('Ações', pg.acoes ? htmlParaTexto(pg.acoes) : '');
    bloco('Descrição', pg.descricao);
    return out.join('\n');
  }

  function exportarTextoMonstros() {
    if (!dados.sessoes.length) { alert('Não há nada para exportar — crie ao menos uma sessão.'); return; }
    let txt = [
      '══════════════════════════════════════════════',
      '   GRIFOS ALADOS · BESTIÁRIO DO MESTRE',
      `   Exportado em ${new Date().toLocaleString('pt-BR')}`,
      '══════════════════════════════════════════════',
    ].join('\n') + '\n';

    dados.sessoes.forEach(s => {
      txt += `\n\n■ ${s.nome || '(sessão sem nome)'}\n${'═'.repeat(46)}`;
      if ((s.notas || '').trim()) txt += `\n${s.notas.trim()}`;
      if (!s.cenas.length) txt += `\n  (sem cenas)`;
      s.cenas.forEach(c => {
        txt += `\n\n  ▪ ${c.nome || '(cena sem nome)'}\n  ${'─'.repeat(40)}`;
        if (Array.isArray(c.ambientes) && c.ambientes.length) {
          const nomes = c.ambientes.map(a => { const it = ambientePorKey(a.key); return it ? (it.nome + (it.nd ? ` (ND ${it.nd})` : '')) : null; }).filter(Boolean);
          if (nomes.length) txt += `\n  🌪 Ambiente: ${nomes.join(' · ')}`;
          c.ambientes.forEach(a => {
            const it = ambientePorKey(a.key);
            if (it && a.nota && a.nota.trim()) txt += `\n     📝 ${it.nome}: ${a.nota.trim().replace(/\n/g, ' ')}`;
          });
        }
        if ((c.notas || '').trim()) txt += `\n  ${c.notas.trim()}`;
        if (!c.criaturas.length && !(c.perigos && c.perigos.length)) txt += `\n    (sem criaturas)`;
        c.criaturas.forEach(cr => { txt += '\n' + _txtCriatura(cr); });
        (c.perigos || []).forEach(pg => { txt += '\n' + _txtPerigo(pg); });
      });
    });

    baixarTxt(`bestiario_${carimboArquivo()}.txt`, txt + '\n');
  }

  // ── IMPORTAR: lê o arquivo, valida e abre o modal de modo ────────
  function _normalizarSessaoImport(s) {
    if (!s || typeof s !== 'object') return null;
    const sessao = {
      id: uid('s'),
      aberto: true,
      nome: typeof s.nome === 'string' ? s.nome : 'Sessão',
      notas: typeof s.notas === 'string' ? s.notas : '',
      notasHtml: typeof s.notasHtml === 'string' ? s.notasHtml : esc(typeof s.notas === 'string' ? s.notas : ''),
      cenas: [],
    };
    (Array.isArray(s.cenas) ? s.cenas : []).forEach(c => {
      if (!c || typeof c !== 'object') return;
      const cena = {
        id: uid('c'),
        aberto: true,
        nome: typeof c.nome === 'string' ? c.nome : 'Cena',
        notas: typeof c.notas === 'string' ? c.notas : '',
        notasHtml: typeof c.notasHtml === 'string' ? c.notasHtml : esc(typeof c.notas === 'string' ? c.notas : ''),
        criaturas: [],
        perigos: [],
        ambientes: normalizarAmbientes(c.ambientes),
      };
      (Array.isArray(c.criaturas) ? c.criaturas : []).forEach(cr => {
        if (!cr || typeof cr !== 'object') return;
        cr.id = uid('cr');          // reid para nunca colidir com o que já existe
        normalizarCriatura(cr);
        cena.criaturas.push(cr);
      });
      (Array.isArray(c.perigos) ? c.perigos : []).forEach(pg => {
        if (!pg || typeof pg !== 'object') return;
        pg.id = uid('pg');          // reid para nunca colidir com o que já existe
        normalizarPerigo(pg);
        cena.perigos.push(pg);
      });
      sessao.cenas.push(cena);
    });
    return sessao;
  }

  function aoEscolherBackup(e) {
    const input = e.target;
    if (!input || input.id !== 'mzImportFile' || !input.files || !input.files.length) return;
    const arq = input.files[0];
    input.value = '';   // permite reescolher o mesmo arquivo depois

    const leitor = new FileReader();
    leitor.onload = () => {
      let parsed;
      try { parsed = JSON.parse(leitor.result); }
      catch (err) { alert('Arquivo inválido — não é um backup .json do Grifos Alados.'); return; }

      let bruto = Array.isArray(parsed) ? parsed
                : (parsed && Array.isArray(parsed.sessoes)) ? parsed.sessoes : null;
      if (!bruto) { alert('Backup sem sessões — verifique se é o arquivo .json do Bestiário.'); return; }
      if (parsed && parsed.tipo && parsed.tipo !== 'monstros') {
        alert('Este arquivo é um backup de "' + parsed.tipo + '", não do Bestiário.'); return;
      }

      const sessoes = bruto.map(_normalizarSessaoImport).filter(Boolean);
      if (!sessoes.length) { alert('Nenhuma sessão válida encontrada no arquivo.'); return; }
      abrirModalImportarBackup(sessoes);
    };
    leitor.onerror = () => alert('Não foi possível ler o arquivo.');
    leitor.readAsText(arq);
  }

  function abrirModalImportarBackup(sessoes) {
    let nc = 0, ncr = 0;
    sessoes.forEach(s => { nc += s.cenas.length; s.cenas.forEach(c => { ncr += c.criaturas.length; }); });
    const atual = _contarBestiario();

    const overlay = GA_abrirModal(`
      <div class="ga-modal-cab">
        <span>⬆ Importar backup</span>
        <button class="ga-modal-x" data-ga-fechar title="Fechar">✕</button>
      </div>
      <p class="ga-modal-dica">O arquivo traz <strong>${sessoes.length} sessão${sessoes.length !== 1 ? 'es' : ''}</strong>,
        ${nc} cena${nc !== 1 ? 's' : ''} e ${ncr} criatura${ncr !== 1 ? 's' : ''}.
        Você tem ${atual.sessoes} sessão${atual.sessoes !== 1 ? 'es' : ''} no momento.</p>
      <div class="ga-modal-acoes">
        <button class="ga-btn-sec" data-ga-fechar>Cancelar</button>
        <button class="ga-btn-sec" data-imp-modo="adicionar">➕ Adicionar (mesclar)</button>
        <button class="ga-btn-principal" data-imp-modo="substituir">♻ Substituir tudo</button>
      </div>`);

    overlay.addEventListener('click', e => {
      const btn = e.target.closest('[data-imp-modo]');
      if (!btn) return;
      const modo = btn.dataset.impModo;
      if (modo === 'substituir') {
        if (atual.sessoes && !confirm('Isto APAGA as ' + atual.sessoes + ' sessão(es) atuais e coloca as do arquivo no lugar. Continuar?')) return;
        dados.sessoes = sessoes;
        dados.painel = dados.painel.map(() => null);   // pinos antigos não valem mais
        dados.painelAmbientes = [];                    // palco do painel zera
        dados.cenaNarrada = null;
      } else {
        dados.sessoes = dados.sessoes.concat(sessoes);
      }
      salvarAgora();
      overlay._fechar();
      render();
    });
  }

  // ── API PÚBLICA (consumida pelas abas Viagem e Consultas rápidas) ─
  // Cria uma cena de combate ligada a uma viagem, agrupada numa sessão
  // própria, e devolve onde ficou. A aba Viagem chama isto e navega para cá.
  window.GA_Monstros = {
    // Insere um NPC da biblioteca (js/npcs-data.js) na cena narrada; se
    // nenhuma cena estiver sendo narrada, agrupa numa sessão própria.
    // Usado pela sub-aba "👤 Guia de NPCs" das Consultas rápidas.
    // opcoes (opcional) = { raca, truque, deus, poder } — as mesmas
    // regras especiais do modal (raça do Guia, truque mercenário,
    // devoto + poder concedido).
    // Devolve { sessao, cena, nome, narrada } ou null.
    inserirNPC: function (chave, opcoes) {
      let si = -1, ci = -1;
      if (dados.cenaNarrada) {
        dados.sessoes.forEach((s, i) => s.cenas.forEach((c, j) => {
          if (c.id === dados.cenaNarrada) { si = i; ci = j; }
        }));
      }
      const narrada = si >= 0;
      if (!narrada) {
        const NOME = '👤 NPCs do Guia';
        let s = dados.sessoes.find(x => x.nome === NOME);
        if (!s) { s = novaSessao(dados.sessoes.length + 1); s.nome = NOME; dados.sessoes.push(s); }
        s.aberto = true;
        if (!s.cenas.length) { const c = novaCena(1); c.nome = 'Fichas avulsas'; s.cenas.push(c); }
        si = dados.sessoes.indexOf(s);
        ci = s.cenas.length - 1;
      }
      const res = inserirNPCNaCena(chave, si, ci, opcoes);
      if (!res) return null;
      return {
        sessao: dados.sessoes[si].nome,
        cena: dados.sessoes[si].cenas[ci].nome,
        nome: res.cr.nome,
        narrada: narrada,
      };
    },

    criarCombateViagem: function (nomeViagem, evento, viagemId) {
      const NOME = '🐎 Combates de Viagem';
      let s = dados.sessoes.find(x => x.nome === NOME);
      if (!s) { s = novaSessao(dados.sessoes.length + 1); s.nome = NOME; dados.sessoes.push(s); }
      s.aberto = true;
      const c = novaCena(s.cenas.length + 1);
      c.nome = (nomeViagem || 'Viagem') + (evento ? ' — ' + evento : '');
      c.aberto = true;
      s.cenas.push(c);
      dados.modoPainel = false;        // volta à lista para popular a nova cena
      dados.cenaNarrada = c.id;        // a cena recém-criada vira a "narrada"
      dados.combateViagem = true;      // liga a faixa de regras de combate em viagem
      dados.combateViagemId = viagemId || null;   // veículo desta viagem no painel
      salvarAgora();
      render();
      return { sessao: NOME, cena: c.nome };
    }
  };

  // ── INICIALIZAÇÃO ────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    const secao = document.getElementById('monstros');
    if (!secao) return;

    carregar();
    render();
    montarLateral();
    renderLog();

    // ouvintes na seção inteira — cobrem o conteúdo, o log E o chat
    secao.addEventListener('click',     aoClicar);
    secao.addEventListener('input',     aoDigitar);
    secao.addEventListener('change',    aoEscolherBackup);
    secao.addEventListener('paste',     aoColar);
    secao.addEventListener('mousedown', aoMousedownToolbar);
    secao.addEventListener('keydown',   aoTeclar);

    // ao abrir a aba Combates, re-ajusta a altura das caixas de texto: no
    // load a seção está oculta (display:none → scrollHeight 0), então o
    // auto-ajuste só pega o conteúdo salvo depois que ela fica visível.
    const navMonstros = document.querySelector('.nav-link[data-section="monstros"]');
    if (navMonstros) {
      navMonstros.addEventListener('click', () => {
        requestAnimationFrame(() => secao.querySelectorAll('.mz-textarea').forEach(autoCrescer));
      });
    }

    // garante que qualquer edição pendente seja gravada ao sair/fechar
    window.addEventListener('beforeunload', salvarAgora);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') salvarAgora();
    });

    // vida do veículo alterada na aba Viagem → atualiza o campo aqui (sem re-render)
    window.addEventListener('ga-veiculo-pv', function (e) {
      const d = e.detail || {};
      document.querySelectorAll('input[data-vpv="' + d.viagemId + '"]').forEach(function (inp) {
        if (document.activeElement !== inp) inp.value = d.pvAtual;
      });
    });
  });

})();