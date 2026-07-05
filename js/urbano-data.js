// ═══════════════════════════════════════════════════════════════════
//  URBANO-DATA.JS — Ambientes Urbanos (Tormenta20)
//  Conteúdo da sub-aba "🏙 Vida Urbana" das Consultas rápidas.
//  Transcrito de 'Regras.txt' (ambientes urbanos · tipos de comunidade
//  · Lei & Ordem · perseguições · outros elementos urbanos).
//  Consumido por urbano.js — mesmo formato de REGRAS_ACOES:
//  { grupo, titulo, texto, tabela? }.
// ═══════════════════════════════════════════════════════════════════
window.REGRAS_URBANO = [

  // ── AVENTURAS URBANAS ───────────────────────────────────────────
  { grupo: '🏙 Aventuras Urbanas', titulo: 'Ambientes urbanos', texto:
`O terceiro e último tipo de ambiente de aventura é formado por cidades, vilas e qualquer lugar com uma comunidade organizada — de um acampamento das legiões táuricas a um bosque habitado por fadas.
Embora a fantasia épica seja mais ligada a masmorras e ermos, ambientes urbanos são ótimos para muitas aventuras. Crime e intriga, especialmente, fazem com que as ruas de uma metrópole sejam tão perigosas quanto os corredores de qualquer masmorra.` },

  { grupo: '🏙 Aventuras Urbanas', titulo: 'Criando aventuras urbanas', texto:
`Aventuras urbanas são diferentes de aventuras em masmorras ou em ermos por uma razão básica: cidades são habitadas. Numa cidade, os aventureiros não podem lidar com problemas simplesmente atacando-os. Eles devem respeitar as leis. Portanto, aventuras urbanas são focadas em interação com NPCs.
Isso não quer dizer que não possa haver ação e combates em cidades. Ambientes urbanos se prestam bem para duelos, emboscadas em becos escuros, lutas de arena... Contudo, qualquer interação, mesmo hostil, levará a uma nova interação, com os mesmos coadjuvantes ou outros. Sempre há consequências.
Para criar uma aventura urbana, comece pensando em uma masmorra. Contudo, em vez de salas e corredores, crie personagens (as "salas") e ligações entre eles (os "corredores").
Os heróis têm um problema a resolver (o objetivo da aventura). Este problema diz respeito a um NPC — em geral vilões a serem combatidos, mas também podem ser inocentes precisando de ajuda, um nobre a ser bajulado etc. A partir deste personagem, trace conexões com outros personagens, que vão levar até ele ou que fornecem alguma ferramenta para cumprir a tarefa final. Crie uma terceira camada de NPCs para levar até estes e assim por diante, até chegar a um bom número de interações.` },

  { grupo: '🏙 Aventuras Urbanas', titulo: 'Cenas e investigação', texto:
`Embora cidades sejam boas para cenas de interpretação, também pode haver cenas dos outros tipos. Os heróis começam conversando com o taverneiro (interpretação), que fala a eles sobre um estranho que viu no dia anterior. Os aventureiros procuram o estranho (exploração), mas ele foge. Eles o perseguem (ação) e ele conta o que sabe (interpretação). Os heróis pedem um favor a um nobre (interpretação), que exige que eles lutem para seu divertimento (ação) etc.
Quase todas as aventuras urbanas envolvem investigação, mas não precisam ser mistérios. A diferença entre uma aventura de mistério e outra mais comum é que, numa aventura comum, os NPCs não vão necessariamente esconder nada. Eles só precisam ser localizados e apaziguados (com interpretação ou combate) para dar a próxima pista.
Como cidades têm muitos NPCs, lembre que os jogadores podem falar com qualquer um — mesmo um que você não tenha preparado. Não se desespere. Escolha um dos NPCs já planejados e o adapte. Se os heróis ignoraram o bardo desiludido e foram atrás de um ferreiro, talvez ele seja um ferreiro desiludido!` },

  // ── TIPOS DE COMUNIDADE ─────────────────────────────────────────
  { grupo: '🏘 Tipos de Comunidade', titulo: 'Tipos de comunidade — resumo', texto:
`Você não precisa se preocupar em detalhar completamente um ambiente urbano. Porém, ter uma ideia geral das características do lugar onde se passa a aventura é útil. Para isso, consulte os tipos de comunidade abaixo.
Na aba 🏪 Loja, o seletor "Qual a classificação da comunidade?" aplica os limites de economia de cada tipo à loja gerada (teto de preço, estoque e caixa da comunidade).`,
    tabela: {
      cab: ['Comunidade', 'População', 'Itens à venda', 'Dinheiro disponível'],
      destaque: 0,
      linhas: [
        ['Aldeia',    'até 1.000',  'até T$ 50, em quantidades limitadas (1d6 de cada)',            '1d4 × T$ 100'],
        ['Vila',      'até 5.000',  'até T$ 1.000; raros em quantidade limitada (2d6) ou nenhum',   '1d6 × T$ 1.000'],
        ['Cidade',    'até 25.000', 'qualquer item mundano; acima de T$ 10.000 pode faltar',        '2d4 × T$ 10.000'],
        ['Metrópole', '~100.000+',  'tudo — até itens mágicos, em leilões exclusivos',              'virtualmente ilimitado'],
      ],
      nota: 'Os cards abaixo trazem o texto completo de cada comunidade (governo, guarda, justiça e economia).',
    } },

  { grupo: '🏘 Tipos de Comunidade', titulo: 'Aldeia', texto:
`A maior parte das comunidades de Arton é formada por pequenos povoados rurais. São lugares isolados e com poucos recursos, que dependem de aventureiros errantes para protegê-los quando enfrentam problemas grandes demais. As características abaixo podem ser usadas para outras comunidades pequenas, como um acampamento legionário ou um bosque feérico.
População. Até 1.000 habitantes.
Governo. Em aldeias afastadas, nenhum. Quando a comunidade precisa decidir algo — como contratar um grupo de aventureiros para lidar com um problema —, a decisão é tomada por um "sábio", um ancião respeitado pelos outros habitantes. Aldeias na área de influência de um nobre serão governadas por um magistrado apontado por ele.
Guarda. Nenhuma formal. Em caso de ataque, 2d10 camponeses podem pegar ancinhos, foices e outras ferramentas (armas simples). Se a aldeia tiver um magistrado, ele terá uma pequena força de defesa (1d4+1 guardas; veja o Capítulo 7: Ameaças).
Justiça. Mais uma vez, nenhuma formal. A comunidade se baseia em senso comum (não roube, não mate etc.) ou dogmas religiosos. Um criminoso será julgado pelo sábio ou magistrado, que tem autoridade absoluta... isto é, se não for expulso por uma turba enfurecida antes!
Economia. Aldeias possuem um único armazém (quando não dependem de mercadores ambulantes). Apenas itens de até T$ 50 estão disponíveis, e em quantidades limitadas (1d6 exemplares de cada ou menos, de acordo com o mestre). Uma aldeia tem 1d4 × T$ 100 em dinheiro para pagar os personagens ou comprar itens deles. Tipos específicos de comunidades podem ter outras limitações: o acampamento táurico, por exemplo, pode ter diversas armas, mas nenhum item alquímico.` },

  { grupo: '🏘 Tipos de Comunidade', titulo: 'Vila', texto:
`Vilas são comunidades autossuficientes, com produção agrícola, comércio e serviços. Ao contrário de aldeias, possuem uma estrutura civil formal, ainda que simples.
População. Até 5.000 habitantes.
Governo. Vilas são governadas por um burgomestre (equivalente a um prefeito) eleito pelos habitantes ou apontado por um nobre local, caso haja. Há um salão comunal, onde o burgomestre atende ao povo e toma decisões, com uma estrutura simples (alguns servos, um clérigo, talvez um arcanista).
Guarda. Milícia formada por 10d10 guardas comandados por um sargento. O burgomestre pode ter alguns guarda-costas de mais alto nível.
Justiça. Leis simples, impostas pela milícia. Crimes pequenos são resolvidos pelo sargento; punições comuns incluem multas, trabalho forçado ou alguns dias no pelourinho. Crimes maiores são julgados pelo nobre local que, novamente, tem autoridade absoluta. Julgamentos são baseados em convencer o nobre de que o seu lado é o certo — em termos de jogo, testes opostos de Diplomacia entre o acusador e o réu; caso um dos dois esteja mentindo, o nobre pode fazer um teste de Intuição para descobrir isso.
Economia. Uma vila possui um mercado com lojas e oficinas. Itens de até T$ 1.000 estão disponíveis, mas itens raros (armas exóticas, itens alquímicos, itens superiores...) existem em quantidades limitadas (2d6 exemplares de cada) ou não existem em absoluto. Uma vila tem 1d6 × T$ 1.000 em dinheiro disponível.` },

  { grupo: '🏘 Tipos de Comunidade', titulo: 'Cidade', texto:
`Com milhares de habitantes, cidades possuem economia forte, política intrincada e todos os outros aspectos de uma vida urbana vibrante. Os habitantes sentem as vantagens e as desvantagens disso: há riqueza, mas também crime. Há um governo forte, mas também intriga. Cidades são raras e afastadas umas das outras por vastidões ermas. Cada reino possui apenas algumas dessas comunidades e viajar de uma a outra é uma aventura por si só!
População. Até 25.000 habitantes.
Governo. Um lorde prefeito apontado pelo regente do reino, assessorado por um conselho eleito de cidadãos "respeitáveis" (fazendeiros e mercadores prósperos, clérigos etc.). Há uma estrutura formal de governo e o lorde prefeito dificilmente estará disponível para qualquer um.
Guarda. Força com centenas de soldados e oficiais, liderada por um capitão (normalmente, um cavaleiro ou guerreiro de pelo menos 8º nível). Cidades são quase sempre muradas. Em caso de ataque, alguns habitantes podem ajudar a guarda, como clérigos de templos locais e aventureiros residentes.
Justiça. Leis complexas, detalhadas em documentos oficiais. Julgamentos são processos formais, com juízes (normalmente clérigos de Khalmyr), advogados e promotores públicos, que representam a autoridade da Coroa local. Um julgamento desses pode ser uma aventura por si só, envolvendo um teste estendido e a busca por provas e testemunhas para receber bônus nos testes.
Economia. Praticamente qualquer item ou serviço mundano estará disponível numa cidade. Itens especialmente valiosos, acima de T$ 10.000 (como itens superiores com muitas melhorias ou de materiais especiais), podem não estar disponíveis. Uma cidade tem 2d4 × T$ 10.000 em dinheiro disponível.` },

  { grupo: '🏘 Tipos de Comunidade', titulo: 'Metrópole', texto:
`Ainda maiores que cidades, comunidades desse tipo são extremamente raras. Cada reino tem no máximo uma metrópole (sua capital), mas em muitos países nem mesmo a capital atinge esse tamanho.
População. Normalmente, por volta de 100 mil habitantes, embora as maiores metrópoles de Arton — Valkaria, a Cidade sob a Deusa, e Tiberus, a capital do Império de Tauron — tenham mais de um milhão de habitantes cada.
Governo. O próprio regente do reino ao qual pertencem, embora a administração cotidiana seja delegada a incontáveis oficiais e conselheiros. Haverá um verdadeiro labirinto burocrático e conseguir uma audiência com o governante será quase impossível.
Guarda. Um exército com soldados, oficiais, clérigos, arcanistas de batalha, construtos, monstros domados e basicamente tudo que o mestre quiser. Além das defesas formais, metrópoles são habitadas por dezenas de aventureiros que não vão ficar de braços cruzados caso sua cidade seja atacada.
Justiça. Como em cidades, com a diferença de que há diversos tribunais, guildas de juristas oferecendo seus serviços e, em casos maiores, todo tipo de jogo sujo e corrupção.
Economia. Uma infinidade de oficinas locais, além de caravanas e navios mercantes do mundo inteiro, supre os bazares de uma metrópole com tudo que pode ser imaginado — e o que não está disponível nas lojas respeitáveis pode ser encontrado no mercado clandestino. Até mesmo itens mágicos podem ser encontrados à venda, em leilões exclusivos. A quantidade de dinheiro disponível em uma metrópole é virtualmente ilimitada.` },

  // ── LEI & ORDEM ─────────────────────────────────────────────────
  { grupo: '⚖ Lei & Ordem', titulo: 'A lei nas comunidades', texto:
`Uma grande diferença de ambientes urbanos para masmorras e ermos é a existência da lei. Nas profundezas de uma mina abandonada, os heróis podem fazer o que quiserem. Já nas ruas de uma cidade, devem pensar duas vezes antes de sair lançando Bolas de Fogo!
Os tipos de comunidade detalham como cada uma aplica a lei, mas a legislação em si varia de reino para reino — ou mesmo de comunidade para comunidade, de acordo com o nobre local.
No que tange a aventureiros, as normas mais importantes são aquelas que restringem o que eles podem portar. A maior parte das comunidades não possui restrições, mas algumas proíbem armas marciais, varinhas de bruxos e outros itens perigosos, além de símbolos sagrados de certos deuses (como Aharadak, Sszzaas e Tenebra). Armas de fogo são um caso especial: são proibidas em todo o Reinado. Decida se a sua comunidade possui alguma restrição.
Personagens podem fazer testes de Nobreza para conhecer a lei de lugares que visitem.` },

  // ── PERSEGUIÇÕES ────────────────────────────────────────────────
  { grupo: '🏃 Perseguições', titulo: 'Iniciando a perseguição', texto:
`Um elemento típico de aventuras urbanas, especialmente aquelas envolvendo a lei e o crime, são perseguições. Os personagens podem correr atrás de um bandido pelas ruas de uma cidade, desviando-se da multidão e saltando por sobre caixotes — ou então eles mesmos podem ser perseguidos pela milícia.
Para iniciar uma perseguição, o mestre deve listar quem são os perseguidores e fugitivos, determinar os objetivos de cada lado e estipular a distância inicial.
Normalmente, o objetivo dos perseguidores é simples: alcançar os fugitivos. Já o objetivo dos fugitivos pode ser alcançar um lugar específico ou abrir uma distância mínima. Se o grupo está perseguindo bandidos, o mestre pode determinar que a gangue possui um esconderijo a 200 metros de distância — os heróis devem alcançar os bandidos antes que estes percorram 200m. Se os personagens estiverem fugindo da milícia, o mestre pode determinar que, se abrirem 100m dos milicianos, estes desistem da perseguição. Se os fugitivos não tiverem um esconderijo e os perseguidores não planejam desistir, a perseguição pode continuar até que um dos lados fique exausto.
A distância inicial entre perseguidores e fugitivos depende da cena. Pode ser 3m, se os dois lados estavam discutindo até algo acontecer e um deles resolver fugir, ou até 30m, no caso de um miliciano que viu um bandido procurado do outro lado do mercado. Na dúvida, o mestre pode rolar 1d10 × 3m.` },

  { grupo: '🏃 Perseguições', titulo: 'Conduzindo a perseguição', texto:
`Utilize as regras de corrida, descritas na perícia Atletismo. Cada participante faz um teste de Atletismo por rodada.
Para controlar a distância que cada um percorreu, pegue uma folha de papel e separe-a em colunas, uma para cada participante. Na coluna de cada perseguidor, anote o número 0. Na coluna de cada fugitivo, anote a distância inicial da perseguição. No fim de cada rodada, some a distância que cada participante percorreu com o número diretamente acima na sua coluna e anote este número logo abaixo. Assim, você saberá a qualquer momento a distância que cada participante percorreu em relação ao ponto de partida dos perseguidores.
Se, no fim de uma rodada, a distância de um perseguidor for maior do que a distância de um fugitivo, esse perseguidor alcançou o fugitivo, encerrando a perseguição. O fugitivo pode se render ou uma cena de combate pode começar.
Lembre-se que um personagem pode correr por um número de rodadas igual a 1 + sua Constituição. Após isso, deve fazer um teste de Fortitude (CD 15, +1 por teste anterior) por rodada. Se falhar, fica fatigado e sai da perseguição.` },

  { grupo: '🏃 Perseguições', titulo: 'Obstáculos e atalhos (eventos)', texto:
`Para deixar a perseguição mais interessante, o mestre pode adicionar eventos, divididos em obstáculos e atalhos.
Obstáculos exigem que todos os participantes façam um teste. Um participante que falhe percorre metade da distância naquela rodada (arredonde para baixo, para o incremento de 1,5m mais próximo).
Atalhos permitem que cada participante escolha fazer um teste. Um participante que passe no teste avança o dobro da distância naquela rodada; se falhar, avança apenas metade.
O mestre pode decidir por obstáculos ou atalhos, ou rolar 1d20 uma vez por rodada na tabela abaixo. Ele pode aumentar a CD dos obstáculos em +5 para zonas especialmente movimentadas, criar novos elementos ou determinar penalidades diferentes para uma falha (como dano, por exemplo).
O rolador no topo desta página rola na tabela e já explica o efeito.`,
    tabela: {
      titulo: 'Tabela 6-5: Eventos de Perseguições',
      cab: ['d20', 'Evento', 'Teste', 'Exemplo'],
      destaque: 0,
      linhas: [
        ['1–6',   'Nenhum',    '—',                  '—'],
        ['7–8',   'Obstáculo', 'Força (CD 15)',       'Pilha de caixotes bloqueia o caminho.'],
        ['9–10',  'Obstáculo', 'Acrobacia (CD 20)',   'Frutas caídas deixam o piso escorregadio.'],
        ['11–12', 'Obstáculo', 'Reflexos (CD 20)',    'Barris rolam pela rua.'],
        ['13–14', 'Obstáculo', 'Intimidação (CD 20)', 'Multidão impede a passagem.'],
        ['15–16', 'Atalho',    'Adestramento (CD 20)','Carroça na qual se pode tentar subir.'],
        ['17–18', 'Atalho',    'Força (CD 15)',       'Caminho mais curto, mas bloqueado.'],
        ['19–20', 'Atalho',    'Percepção (CD 20)',   'Ruelas labirínticas, nas quais se pode cortar caminho ou se perder.'],
      ],
      nota: 'Obstáculo: todos testam; falhou → metade da distância. Atalho: testar é opcional; passou → dobro, falhou → metade.',
    } },

  { grupo: '🏃 Perseguições', titulo: 'Exemplo de perseguição', texto:
`Neste exemplo, usamos distâncias em quadrados de 1,5m, para simplificar.
O paladino Sotnas Oger avista Vallefar, o lefou feiticeiro rubro, e corre na direção dele, disposto a prendê-lo. O lefou decide fugir. O mestre determina que a distância inicial entre os dois é de 6 quadrados e que, se Vallefar percorrer 60 quadrados, alcançará uma taverna movimentada, onde poderá se mesclar à multidão.
Para controlar a perseguição, o mestre separa uma folha em duas colunas, uma para Sotnas e outra para Vallefar, e anota as distâncias iniciais de cada um — 0 para o paladino e 6 para o feiticeiro. Sotnas possui Atletismo +11 e deslocamento de 4 quadrados, o que impõe –2 em seus testes para corrida. Já Vallefar possui Atletismo +5 e deslocamento de 6 quadrados (sem modificador).
Na primeira rodada, o paladino rola 8 no d20, somando 17 no teste e percorrendo 17 quadrados. Já o feiticeiro rola 19 no d20, somando 24 no teste e percorrendo 24 quadrados. No fim da primeira rodada, as distâncias estão em 17 quadrados para Sotnas e 30 para Vallefar (24 percorridos mais 6 da distância inicial). O paladino bufa de raiva ao ver o lefou se distanciando.
Na segunda rodada, Sotnas soma 25 no teste — está dando tudo de si! Já Vallefar soma 20. No fim da segunda rodada, as distâncias estão em 42 quadrados para Sotnas e 50 para o lefou.
Prevendo que a perseguição está terminando, o mestre rola na tabela de eventos para acrescentar emoção à cena, e tira um 7: o caminho para a taverna está bloqueado por uma pilha de entulhos. Cada participante deve fazer um teste de Força (CD 15). Vallefar está à frente, mas Sotnas é mais forte. Se o lefou não conseguir derrubar os entulhos, há uma boa chance de que o paladino o alcance antes que ele chegue à taverna...` },

  // ── OUTROS ELEMENTOS URBANOS ────────────────────────────────────
  { grupo: '🧱 Outros Elementos Urbanos', titulo: 'Ruas e becos', texto:
`Vilas e cidades possuem ruas estreitas, entre 3m e 6m de largura, e becos mais estreitos ainda, com 1,5m ou 3m de largura. Cidades grandes e metrópoles também possuem avenidas com até 9m de largura, permitindo que duas carroças passem lado a lado.
Ruas normalmente são de terra batida (que vira um lamaçal em caso de chuva, exigindo testes de Acrobacia para corridas ou investidas) ou, mais raramente, paralelepípedos.` },

  { grupo: '🧱 Outros Elementos Urbanos', titulo: 'Construções', texto:
`Em vilas e cidades, a maior parte das construções possui dois ou três pavimentos. O primeiro, de alvenaria, é usado para lojas e oficinas. Os restantes, de madeira, são usados para residência. As construções são geminadas, formando longas filas separadas por becos.
Bairros pobres possuem casebres de um andar, enquanto as zonas mais exclusivas das maiores cidades possuem mansões protegidas por muros e jardins internos.` },

  { grupo: '🧱 Outros Elementos Urbanos', titulo: 'Muros e portões', texto:
`Muros de uma cidade normalmente possuem entre 6m e 9m de altura, enquanto os de uma metrópole podem atingir até 18m de altura. Muros possuem ameias que fornecem cobertura leve a quem estiver no topo. A CD para escalá-los é 25.
O portão típico de uma cidade é feito de madeira, com RD 5 e 60 PV, mas as maiores comunidades possuem portões de ferro, com RD 10 e 300 PV.` },

  { grupo: '🧱 Outros Elementos Urbanos', titulo: 'Telhados', texto:
`Subir em um telhado exige escalar a lateral de uma construção (CD 20). Andar sobre um telhado exige um teste de Acrobacia (CD 10) por ação de movimento. Correr sobre um telhado aumenta a CD em +5.
Quando um telhado termina, o personagem deve pular para o próximo telhado (ou para outro ponto alto, como uma marquise, gárgula, poste etc.). Isso normalmente exige um teste de Atletismo (CD 20), mas a CD pode ser maior (para ruas muito largas) ou menor (para ruas especialmente estreitas).
O mestre pode misturar as regras de correr sobre telhados com as regras de perseguição — talvez fazendo com que participantes sobre telhados não sejam afetados por obstáculos.` },

  { grupo: '🧱 Outros Elementos Urbanos', titulo: 'Esgotos', texto:
`Apenas metrópoles possuem sistemas de esgotos. Entrar num esgoto exige abrir um bueiro (ação completa) e descer uma escada (ação de movimento) ou saltar (ação livre; exige um teste de Atletismo contra CD 15 para não sofrer 1d6 pontos de dano de impacto).` },

  { grupo: '🧱 Outros Elementos Urbanos', titulo: 'Multidões', texto:
`As ruas das maiores cidades muitas vezes estão lotadas de pessoas. Um espaço ocupado por uma multidão conta como terreno difícil e fornece cobertura leve a qualquer um dentro dele.
Uma multidão que veja algo perigoso foge na direção oposta com deslocamento de 9m no fim de cada rodada. É possível direcionar uma multidão com um teste de Diplomacia (CD 15, ação completa) ou Intimidação (CD 20, ação livre).` },

];

// ── Tabela 6-5 em formato estruturado, para o rolador de eventos ────
window.URBANO_EVENTOS_PERSEGUICAO = [
  { de: 1,  ate: 6,  evento: 'Nenhum',    teste: null,                   exemplo: null },
  { de: 7,  ate: 8,  evento: 'Obstáculo', teste: 'Força (CD 15)',        exemplo: 'Pilha de caixotes bloqueia o caminho.' },
  { de: 9,  ate: 10, evento: 'Obstáculo', teste: 'Acrobacia (CD 20)',    exemplo: 'Frutas caídas deixam o piso escorregadio.' },
  { de: 11, ate: 12, evento: 'Obstáculo', teste: 'Reflexos (CD 20)',     exemplo: 'Barris rolam pela rua.' },
  { de: 13, ate: 14, evento: 'Obstáculo', teste: 'Intimidação (CD 20)',  exemplo: 'Multidão impede a passagem.' },
  { de: 15, ate: 16, evento: 'Atalho',    teste: 'Adestramento (CD 20)', exemplo: 'Carroça na qual se pode tentar subir.' },
  { de: 17, ate: 18, evento: 'Atalho',    teste: 'Força (CD 15)',        exemplo: 'Caminho mais curto, mas bloqueado.' },
  { de: 19, ate: 20, evento: 'Atalho',    teste: 'Percepção (CD 20)',    exemplo: 'Ruelas labirínticas, nas quais se pode cortar caminho ou se perder.' },
];
