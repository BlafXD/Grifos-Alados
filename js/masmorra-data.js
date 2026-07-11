// ════════════════════════════════════════════════════════════════════
//  MASMORRA-DATA.JS  —  Regras de masmorras ("Dungeon") p/ a aba Combates
//  Localização: /grifos-alados/js/masmorra-data.js
//
//  Fontes: Tormenta20 p. 263 (Ambientes de aventura — masmorras) e
//  Heróis de Arton (Exploração de masmorras — regras opcionais).
//  Consumido por monstros.js: faixa "🏰 Dungeon?" dentro de cada cena,
//  com ferramentas de mesa (encontro/tempo/descanso) + regras de consulta.
// ════════════════════════════════════════════════════════════════════
window.GA_MASMORRA = {

  // Uma linha para a faixa desligada — o que o mestre ganha ao ligar.
  resumo: 'ligue para ter à mão a definição e as regras de masmorra — ' +
          'encontros aleatórios, barulho, luz, tempo em segmentos e descanso ' +
          '(Tormenta20 p. 263 + Heróis de Arton).',

  // Definição curta no topo do painel ligado (a completa fica nas regras).
  defCurta: 'Lugares fechados, perigosos, repletos de armadilhas e monstros — as ' +
            '"masmorras" de Arton, abençoadas por Hyninn para serem sempre perigosas. ' +
            'Aqui as trevas são sobrenaturais: sem fonte de luz, todos ficam cegos ' +
            '(até anões e osteon), e cada tocha dura uma cena (6 segmentos). ' +
            'A cada sala ou corredor, role o dado de encontro.',

  // ── Categorias de barulho → dado de encontro (Heróis de Arton) ─────
  //  A rolagem-base é 1d6 (encontro no 1). Silencioso sobe um passo;
  //  barulhento desce um; estrondoso desce dois.
  BARULHO: [
    { chave: 'silencioso', rot: 'Silencioso', icone: '🤫', dado: 8,
      desc: 'Muito discretos: ninguém fala, todos avançam à metade do deslocamento e ' +
            'passam num teste de Furtividade (CD 20). Aumenta o dado de encontro em um passo (1d6 → 1d8).' },
    { chave: 'padrao', rot: 'Padrão', icone: '👣', dado: 6,
      desc: 'Discretos: conversam em tom baixo e caminham fazendo barulho normal. ' +
            'É a categoria padrão — sem modificadores (1d6).' },
    { chave: 'barulhento', rot: 'Barulhento', icone: '📢', dado: 4,
      desc: 'Falando alto ou discutindo, usando habilidades sonoras (como Música de bardo), ' +
            'arrombando porta ou baú na força bruta. Diminui o dado de encontro em um passo (1d6 → 1d4).' },
    { chave: 'estrondoso', rot: 'Estrondoso', icone: '💥', dado: 3,
      desc: 'Ruído extremo — várias habilidades que geram som alto, ou uma Bola de Fogo ' +
            'para destruir uma porta trancada. Diminui o dado de encontro em dois passos (1d6 → 1d3).' },
  ],

  // ── Tabela 6-2: Ideias de Masmorras (1d20) ─────────────────────────
  IDEIAS: [
    'Complexo de cavernas subterrâneas',
    'Mina abandonada',
    'Templo de um deus maligno',
    'Esgotos da cidade',
    'Castelo de um déspota',
    'Torre de um mago louco',
    'Moinho da vila',
    'Armazém no porto',
    'Ruínas de uma civilização perdida',
    'Fortaleza anã abandonada',
    'Mansão assombrada',
    'Prisão da cidade',
    'Caverna submersa',
    'Gruta usada como covil por um monstro',
    'Biblioteca mágica',
    'Galeão encalhado',
    'Labirinto feito para proteger um tesouro',
    'Manicômio repleto de vilões insanos',
    'Vulcão inativo',
    'Castelo nas nuvens',
  ],

  // ── Regras & definição (seções recolhíveis do painel) ──────────────
  //  texto: quebras de linha viram <br>; termos de regra (cego, fatigado…)
  //  ganham tooltip via ItensDescricoes.marcar. tabela: {cab, linhas, nota}.
  SECOES: [
    {
      chave: 'oquee', titulo: '🏰 O que é uma masmorra? (definição)',
      texto: 'Antigas redes de túneis levando a Doherimm, ruínas de templos sszzaazitas, covis de dragões: ' +
        'lugares fechados, perigosos, repletos de armadilhas e monstros. Em Arton, esses lugares são conhecidos ' +
        'coletivamente como "masmorras". Uma masmorra pode ser pequena e apertada (um esconderijo de bandidos) ' +
        'ou um vasto complexo planar como o Labirinto de Valkaria. São lugares de mistério e bizarria, de eventos ' +
        'absurdos e sem sentido — e o alvo preferido de heróis que desejam adquirir experiência e conquistar tesouros.\n' +
        'Em termos de jogo, masmorras são um ambiente comum de aventura. Por serem fechadas, limitam as opções ' +
        'dos jogadores e simplificam a vida do mestre: se você mapear todas as salas, terá uma resposta para todas ' +
        'as decisões. Mestres iniciantes devem considerar fazer suas primeiras aventuras nesse tipo de ambiente.\n' +
        '• Espaço de masmorra. Masmorras não são ambientes lógicos — e não precisam ser. Em Tormenta, são lugares ' +
        'sobrenaturais, "abençoados" por Hyninn, o Deus da Trapaça, para serem sempre perigosos, mesmo que nem ' +
        'sempre isso faça sentido: uma tribo orc vive no aposento vizinho ao ninho de aranhas gigantes sem conflito, ' +
        'monstros esperam em suas salas sem se alimentar, uma passagem secreta se abre onde não deveria estar.\n' +
        '• Objetivos de masmorras. Masmorras não se resumem a matar monstros ou derrotar um vilão: o objetivo pode ' +
        'ser definido pelos próprios jogadores — desvendar segredos, procurar riquezas, resgatar alguém. Vincule a ' +
        'masmorra aos históricos dos personagens para motivações mais pessoais.\n' +
        '• Estilo de jogo (Heróis de Arton). A exploração de masmorra é um estilo clássico, emocionante e imprevisível ' +
        '— menos abstrato e mais baseado em gerenciamento de recursos: cada tocha e cada ração de viagem contam para ' +
        'o grupo chegar vivo à última sala.',
    },
    {
      chave: 'criando', titulo: '🗺 Criando a masmorra (passo a passo)',
      texto: 'Criar uma aventura em masmorra é, basicamente, criar a masmorra em si.\n' +
        '• Conceito. Defina o conceito — role 1d20 na Tabela 6-2 (botão acima) ou invente: praticamente qualquer ' +
        'espaço fechado pode ser uma masmorra.\n' +
        '• Tamanho. Pequenas: 3 a 6 salas (parte de uma sessão). Médias: 7 a 20 salas (uma sessão inteira). ' +
        'Grandes: 21 a 50 salas (o escopo de toda uma aventura). Não recomendamos maiores — ficar tanto tempo num ' +
        'mesmo lugar acaba sendo entediante.\n' +
        '• Objetivo principal. Aquilo que o grupo foi buscar: um antídoto, o esconderijo do vilão, um tesouro. ' +
        'O conceito funciona como guia — se a masmorra é uma prisão, o objetivo pode ser resgatar um prisioneiro.\n' +
        '• Objetivos secundários (médias e grandes). Algo que deve ser feito ANTES do principal (ex.: a chave que abre ' +
        'a última porta) — faz o grupo explorar em vez de avançar direto. Médias: 1; grandes: até 3.\n' +
        '• Objetivos opcionais. Não obrigatórios — a sala com um tesouro e um desafio pela qual ninguém precisa passar. ' +
        'Encarar ou não é decisão dos jogadores, e escolhas envolvem. Pequenas: 1; médias: 2; grandes: 3.\n' +
        '• Ameaças. Calcule uma ameaça a cada três salas, com um misto de cenas de ação (monstros, armadilhas) e ' +
        'exploração (labirintos, enigmas). Veja o Capítulo 7: Ameaças.\n' +
        '• Pontos de interesse (opcional). Um rio subterrâneo, tapeçarias com a história de um antigo reino, uma ' +
        'estátua falante, NPCs com quem interagir — ligados aos objetivos/ameaças ou apenas descritivos.\n' +
        '• Mapa. Desenhe as salas e os corredores que as conectam; distribua objetivos e ameaças; faça mais de um ' +
        'caminho, para que haja escolhas. Vale usar mapas prontos ou geradores — ou começar PELO mapa e preenchê-lo ' +
        'com os elementos desta lista.\n' +
        '• Descrição e regras. Uma descrição rápida para cada sala + as regras de cada objetivo e ameaça (como fichas ' +
        'de criaturas).',
      tabela: {
        titulo: 'Tabela 6-2: Ideias de Masmorras',
        cab: ['1d20', 'Masmorra'],
        linhas: [
          ['1', 'Complexo de cavernas subterrâneas'], ['2', 'Mina abandonada'],
          ['3', 'Templo de um deus maligno'], ['4', 'Esgotos da cidade'],
          ['5', 'Castelo de um déspota'], ['6', 'Torre de um mago louco'],
          ['7', 'Moinho da vila'], ['8', 'Armazém no porto'],
          ['9', 'Ruínas de uma civilização perdida'], ['10', 'Fortaleza anã abandonada'],
          ['11', 'Mansão assombrada'], ['12', 'Prisão da cidade'],
          ['13', 'Caverna submersa'], ['14', 'Gruta usada como covil por um monstro'],
          ['15', 'Biblioteca mágica'], ['16', 'Galeão encalhado'],
          ['17', 'Labirinto feito para proteger um tesouro'], ['18', 'Manicômio repleto de vilões insanos'],
          ['19', 'Vulcão inativo'], ['20', 'Castelo nas nuvens'],
        ],
      },
    },
    {
      chave: 'elementos', titulo: '🧱 Elementos da masmorra (pisos, portas, pilares…)',
      texto: '• Pisos. Planos (tablados, ladrilhos em bom estado): sem efeito. Irregulares (cavernas naturais, ruínas): ' +
        'Acrobacia CD 10 para correr ou fazer investida. Escorregadios (água, gelo, sangue): Acrobacia para se ' +
        'equilibrar. Irregular E escorregadio: CD 15. Cobertos de escombros e entulho: terreno difícil.\n' +
        '• Paredes. Alvenaria: RD 8 e 200 PV por trecho de 1,5m, Atletismo CD 20 para escalar. Pedra bruta: RD 8, ' +
        '500 PV, CD 15. Madeira: RD 5, 100 PV, CD 20.\n' +
        '• Portas. Madeira (casas comuns), madeira reforçada (mansões, armazéns), pedra (templos e torres), ferro ' +
        '(salas de tesouro) e grades de ferro (castelos, calabouços, esgotos) — RD, PV e CD na tabela abaixo. ' +
        'Abrir com um encontrão ou chute: ação padrão + teste de Força (CD da tabela); quem falha por 5 ou mais ' +
        'sofre 1d6 de dano de impacto.\n' +
        '• Portas secretas. Encontrar exige Investigação CD 20 (escondidas atrás de estantes ou tapeçarias) a 30 ' +
        '(feitas para se mesclar perfeitamente às paredes).\n' +
        '• Escadarias. Subir conta como terreno difícil. Descer correndo ou em investida: Acrobacia CD 10 — em caso ' +
        'de falha, você cai, rola 1d4 × 1,5m para frente (ou até o fim da escada) e sofre 1d6 de dano de impacto ' +
        'por 1,5m rolado.\n' +
        '• Pilares. Estreito (menos de 1,5m): RD 8 e 100 PV; um personagem pode ficar no MESMO espaço e receber ' +
        'cobertura leve (+5 na Defesa). Largo (mais de 1,5m): RD 8 e 500 PV; não se ocupa o espaço, mas ficar atrás ' +
        'dele dá cobertura leve. Estalagmites e estátuas contam como pilares estreitos ou largos.\n' +
        '• Tapeçarias. Trecho de 1,5m: RD 0 e 10 PV. Atrás de uma tapeçaria: camuflagem leve. Escalar: Atletismo ' +
        'CD 15 (se ela aguentar o peso).\n' +
        '• Altares. Bloco de pedra de 1,5m × 3m: RD 8 e 200 PV; cobertura leve a qualquer criatura atrás dele. ' +
        'Pode emanar aura mágica — especialmente Consagrar e Profanar.',
      tabela: {
        titulo: 'Tabela 6-3: Portas',
        cab: ['Tipo de porta', 'RD', 'PV', 'CD (Força)'],
        linhas: [
          ['Madeira', '5', '20', '15'],
          ['Madeira reforçada', '5', '30', '20'],
          ['Pedra', '8', '100', '25'],
          ['Ferro', '10', '100', '25'],
          ['Grade', '10', '60', '20'],
        ],
        nota: 'CD do teste de Força para abrir com encontrão ou chute (ação padrão). ' +
              'Falhou por 5+? 1d6 de dano de impacto.',
      },
    },
    {
      chave: 'encontros', titulo: '🎲 Encontros aleatórios',
      texto: 'Sempre que os personagens entram numa sala ou corredor, fazem uma rolagem de encontro: 1d6 por padrão — ' +
        'um resultado 1 indica um encontro. Deixe os próprios jogadores rolarem, alternando entre eles a cada nova ' +
        'sala, para tornar a rolagem mais envolvente. O dado aumenta ou diminui conforme o barulho do grupo (veja ' +
        '"Ruídos & barulho").\n' +
        'Caso um encontro aconteça, role numa tabela de encontros feita por você: invente de 4 a 10 encontros ' +
        'diferentes, alternando criaturas e outros perigos (armadilhas, maldições etc.). Encontros de interpretação ' +
        'ou benéficos (mercadores itinerantes, parceiros perdidos) são possíveis, mas devem ser minoria — e vir ' +
        'primeiro na tabela. Ordene do mais fraco ao mais forte e determine o dado que os jogadores rolarão.\n' +
        'Encontros hostis devem ter ND de 1 a 3 pontos ABAIXO do nível do grupo: em masmorras se enfrenta muitos ' +
        'desafios, então cada um precisa ser mais fácil, ou a sobrevivência será quase impossível. Afinal, quanto ' +
        'mais combates, mais recursos gastos…',
    },
    {
      chave: 'luz', titulo: '🕯 Luz & escuridão',
      texto: 'A maioria das masmorras é imersa em trevas: a menos que os personagens tenham uma fonte de luz, sofrem ' +
        'os efeitos de escuridão (condição cego, T20 p. 394). A iluminação pode ser mundana (tochas, lampiões) ou ' +
        'mágica (magia Luz) — e a maioria das fontes dura UMA CENA (controle com o relógio de segmentos acima).\n' +
        'Em espaços de masmorra as trevas são sobrenaturais: afetam até personagens com visão na penumbra ou visão ' +
        'no escuro — mas não os nativos da masmorra. Ou seja, mesmo aventureiros como anões e osteon precisam de uma ' +
        'fonte de luz. Quem disse que Hyninn é justo?\n' +
        'Além da mecânica, use a escuridão no clima do jogo: descreva o ambiente de forma misteriosa, com poucas ' +
        'informações, mantendo os jogadores tão no "escuro" quanto seus personagens.',
    },
    {
      chave: 'barulho', titulo: '📢 Ruídos & barulho (o dado de encontro)',
      texto: 'Masmorras são locais fechados, habitados por criaturas que conhecem intimamente sua morada — intrusos ' +
        'barulhentos são percebidos quase de imediato. Existem quatro categorias de barulho:\n' +
        '• Silencioso (1d8). Ninguém fala, todos avançam à metade do deslocamento e passam num teste de Furtividade ' +
        '(CD 20). Aumenta o dado de encontro em um passo — a chance de encontro diminui.\n' +
        '• Padrão (1d6). Conversas em tom baixo, caminhar normal. Sem modificadores.\n' +
        '• Barulhento (1d4). Falar alto ou discutir, habilidades que geram som alto (como Música de bardo), tentar ' +
        'arrombar uma porta ou baú na força bruta. Diminui o dado em um passo — a chance aumenta.\n' +
        '• Estrondoso (1d3). Ruído extremo — várias habilidades sonoras, ou uma Bola de Fogo para destruir uma porta ' +
        'trancada. Diminui o dado em dois passos.\n' +
        'A categoria é checada no FIM de cada sala ou corredor e afeta a rolagem do PRÓXIMO local em que o grupo ' +
        'entra; depois, volta ao padrão — a menos que o comportamento descuidado continue. Exemplo: o ladino falha em ' +
        'destrancar o baú e o bárbaro resolve na machadada → o grupo fica barulhento e a próxima rolagem é 1d4.',
    },
    {
      chave: 'recursos', titulo: '🎒 Gerenciamento de recursos',
      texto: 'Em masmorras não há acesso fácil a recursos: TODO equipamento que os personagens quiserem levar deve ' +
        'estar anotado na ficha, com espaços contabilizados — fontes de luz, comida, cordas, gazuas, poções de cura, ' +
        'essências de mana.\n' +
        '• Luz. No fim de cada cena é preciso acender outra tocha, gastar outra carga de óleo ou lançar outra magia ' +
        'de iluminação (veja o relógio de segmentos). Cobre dos jogadores o registro de quantos itens de iluminação ' +
        'estão carregando.\n' +
        '• Comida. Cada noite de sono exige que cada personagem consuma uma ração de viagem — e parceiros também ' +
        'comem! Sem rações: efeitos de inanição ("Fome e Sede", T20 p. 319).\n' +
        '• Fechaduras. Em masmorras, falhar por 5 ou mais num teste de Ladinagem para abrir fechaduras quebra a ' +
        'gazua; sem gazua, a FECHADURA quebra e não pode mais ser aberta com Ladinagem. Nada impede o ladino de ' +
        'carregar várias gazuas — mas cada espaço ocupado é um espaço a menos para comida ou óleo.\n' +
        '• Cordas e afins. Se os personagens amarrarem uma corda para descer um fosso e a deixarem presa, não poderão ' +
        'usar a mesma corda mais tarde.\n' +
        'Importante: toda essa contagem é responsabilidade dos JOGADORES, não do mestre. Divida: um administra as ' +
        'tochas, outro as rações, outro as poções. A tensão de ver os itens se esgotando é parte da diversão.',
    },
    {
      chave: 'cenas', titulo: '⏱ Duração de cenas (segmentos)',
      texto: 'Cenas normalmente têm duração abstrata — um combate dura segundos, um baile dura a noite. Em masmorras ' +
        'o tempo precisa ser concreto: cada cena dura SEIS "segmentos". Um jogador fica responsável por anotar um ' +
        'risquinho por segmento; ao acumular 6, avisa a mesa (incluindo o mestre) de que uma cena se passou — o que ' +
        'encerra qualquer efeito com duração de cena. Fontes de iluminação esgotadas precisam ser renovadas (outra ' +
        'tocha, outra carga de óleo, outra magia…).\n' +
        'O mestre avisa a passagem de segmentos conforme as ações:\n' +
        '• Ação curta (1 segmento). Resolvida em poucos minutos: passar por um corredor, ou explorá-lo (Investigação ' +
        'por armadilhas e tesouros, Percepção para escutar atrás de uma porta, Sobrevivência por rastros).\n' +
        '• Ação longa (2 segmentos). Vários minutos até uma hora: passar por uma sala ou explorá-la (salas são mais ' +
        'amplas — o dobro do tempo), cuidados prolongados (Cura), identificar um item mágico (Misticismo), montar ' +
        'acampamento (Sobrevivência).\n' +
        '• Ação muito longa (6 segmentos). Algumas horas ou uma parte do dia (manhã, tarde ou noite) — uma cena ' +
        'inteira se passa.',
    },
    {
      chave: 'descanso', titulo: '🛏 Sobrevivência & descanso na masmorra',
      texto: 'Masmorras são escuras, frias ou amaldiçoadas — os "recursos naturais" se limitam a musgos, insetos e ' +
        'coisas piores. Por padrão, NÃO é possível usar Sobrevivência para conseguir alimento. Montar acampamento ' +
        'exige um teste com CD 25 (lugares menos hostis, como complexos de cavernas) a 35 (lugares terríveis, como ' +
        'templos amaldiçoados) — e consome tempo (ação longa).\n' +
        'Ao dormir, cada personagem consome uma ração de viagem e o grupo faz DUAS rolagens de encontro (1d6 por ' +
        'padrão). Se o local tiver mais de uma abertura, o dado diminui um passo por abertura além da primeira — ' +
        'acampar numa sala com três portas significa rolar 1d3!\n' +
        'Para melhorar as chances:\n' +
        '• Barricadas. Um teste de Guerra ou Sobrevivência (mesma CD do acampamento) para montar defesas aumenta o ' +
        'dado de encontro em um passo. NÃO cumulativo — vários podem tentar (cada tentativa é uma ação longa), mas ' +
        'só o primeiro sucesso conta.\n' +
        '• Turnos de guarda. Cada aventureiro de vigília aumenta o dado em um passo (cumulativo). Porém, todos que ' +
        'fizerem turno testam Fortitude CD 20 (+1 por dia anterior em que já tenham feito guarda). Quem falha diminui ' +
        'sua condição de descanso em uma categoria e fica fatigado pelo dia seguinte (criaturas imunes a efeitos de ' +
        'metabolismo em vez disso ficam alquebradas).',
    },
    {
      chave: 'exemplo', titulo: '📜 Exemplo pronto: tabela de encontros',
      texto: 'O Templo do Conflito Eterno era a sede de uma ordem de Keenn, o antigo Deus da Guerra. Hoje, o lugar ' +
        'está abandonado e amaldiçoado pelo rancor de seus antigos habitantes. Role 1d100 quando o dado de encontro ' +
        'cair em 1:',
      exemplo: [
        { faixa: '01–15', nome: 'Espírito Vitimado', nd: '—',
          txt: 'A alma de uma vítima dos clérigos da Guerra, presa ao local de sua morte, vaga sem descansar. ' +
               'Se os heróis conversarem com o espírito e fizerem um ritual para libertá-lo (Religião CD 25 ou outra ' +
               'ideia dos jogadores), uma onda de luz cura 4d8+4 PV e 2d4 PM de todos.' },
        { faixa: '16–35', nome: 'Devotos de Keenn Mortos-Vivos', nd: '5',
          txt: '1 esqueleto de elite + 4 esqueletos (T20 p. 297) em túnicas esfarrapadas com o símbolo de Keenn. ' +
               'O líder exala uma aura de energia negativa: no início de cada turno dele, causa 2d8+2 de dano de ' +
               'trevas em todas as criaturas em alcance curto — nos esqueletos, a aura CURA!' },
        { faixa: '36–50', nome: 'Armas Vivas', nd: '5',
          txt: 'Dezenas de armas movidas pela força divina residual de Keenn flutuam e atacam! Cada personagem sofre ' +
               '2d10+10 de dano de corte por rodada até sair da sala ou dar um jeito (atacá-las não resolve — são ' +
               'muitas; Dissipar Magia contra CD 25 resolve).' },
        { faixa: '51–65', nome: 'Armorial Antigo', nd: '—',
          txt: 'Os personagens encontram 1d4+1 armas superiores com 1d3 melhorias cada. Uma delas é encantada ' +
               '(1 encanto). Outra é amaldiçoada. Qual é qual? Não há como saber…' },
        { faixa: '66–85', nome: 'Devotos de Arsenal', nd: '6',
          txt: '3 capelães de guerra, que vieram destruir os devotos do antigo Deus da Guerra e tomar o templo — ' +
               'mas matarão quaisquer outros no caminho. Com o suplemento Ameaças de Arton, substitua por outras ' +
               'criaturas da Igreja de Arsenal.' },
        { faixa: '86–100', nome: 'Maldição do Conflito', nd: '6',
          txt: 'Uma runa de violência brilha em vermelho-sangue. Todos testam Vontade (CD 25); quem falha gasta o ' +
               'próximo turno atacando um companheiro (aleatório) com suas melhores habilidades. Repete-se o teste ' +
               'no início de cada turno até passar — aí fica imune à runa.' },
      ],
    },
  ],
};
