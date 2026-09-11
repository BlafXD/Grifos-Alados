// ═══════════════════════════════════════════════════════════════════
//  CALENDARIO-DATA.JS — o Calendário Artoniano (dados puros)
//  Consumido por:
//    • calendario.js → a conta dos dias, as formas de escrever a data
//      e o seletor que as Notícias usam
//
//  Referência: Atlas de Arton, "Tempo & Calendário", p. 30–33
//  (páginas 32–35 do PDF). Os textos são os do livro.
// ═══════════════════════════════════════════════════════════════════

window.CALENDARIO_ARTON = {
  fonte: 'Atlas de Arton, p. 30–33',

  // "O ano atual do calendário artoniano é 1420" (p. 30). Serve só de
  // ponto de partida para quem ainda não tem data nenhuma.
  anoDoLivro: 1420,

  // O único ponto de apoio para o dia da semana que o livro dá: o
  // exemplo das duas formas de escrever, "a data 10/01/1420 pode ser
  // escrita como 'Valk 10 sob Caravana, mil quatrocentos e vinte anos da
  // chegada dos elfos'" (p. 30). A conta a partir dele está no
  // calendario.js.
  ancora: { ano: 1420, mes: 1, dia: 10, semana: 1 },

  estacoes: {
    primavera: { nome: 'Primavera', icone: '🌱' },
    verao:     { nome: 'Verão',     icone: '☀' },
    outono:    { nome: 'Outono',    icone: '🍂' },
    inverno:   { nome: 'Inverno',   icone: '❄' },
  },

  // ── Os Meses do Ano (p. 31) — 12 meses de 30 dias ──────────────────
  meses: [
    { nome: 'Caravana', estacao: 'primavera',
      desc: 'O ano começa com o mês de Caravana, assim chamado em homenagem aos refugiados de Lamnor, que terminaram sua longa jornada no início da primavera. Muitas caravanas partem em suas rotas neste mês. Alguns consideram essa época sagrada para viajar, enquanto outros a escolhem simplesmente por oferecer um bom clima para enfrentar a estrada.' },
    { nome: 'Pomo', estacao: 'primavera',
      desc: 'Pomo é o segundo mês da primavera, quando as plantações começam a crescer.' },
    { nome: 'Keenvia', estacao: 'primavera',
      desc: 'A estação termina com Keenvia, em honra a Keenn, antigo Deus da Guerra. Esta é a época em que exércitos partem para suas marchas e batalhas.' },
    { nome: 'Sirravia', estacao: 'verao',
      desc: 'Sirravia começa o verão e é uma homenagem a Sirrannamena, a Rainha Barda, considerada a primeira grande monarca da humanidade.' },
    { nome: 'Vigília', estacao: 'verao',
      desc: 'Vigília é o segundo mês do verão e tem esse nome pois nesta época Azgher, o Deus-Sol, fica alto no céu, observando tudo.' },
    { nome: 'Prussvia', estacao: 'verao',
      desc: 'Prussvia encerra a estação mais quente. O nome é uma menção a Roramar Pruss, fundador do Reinado. Originalmente, o mês se chamaria Roravia, mas o Rei Profeta, humilde, não aceitou isso. Os clérigos de Tanna-Toh então sugeriram mudar o nome para Prussvia, em homenagem a toda a família real, proposta que teria feito Roramar se “render”.' },
    { nome: 'Ceifa', estacao: 'outono',
      desc: 'O próximo mês, já no outono, é Ceifa, que leva este nome por ser o início da colheita — uma época de muito trabalho nos campos do Reinado e além.' },
    { nome: 'Contenda', estacao: 'outono',
      desc: 'Após Ceifa, há Contenda. Antigamente um mês dedicado a duelos e resoluções de conflitos, hoje recebe importantes julgamentos em castelos e tribunais.' },
    { nome: 'Clausura', estacao: 'outono',
      desc: 'O outono termina com Clausura, período em que os camponeses se preparam para o inverno, recolhendo comida e lenha para suas casas.' },
    { nome: 'Pharstyth', estacao: 'inverno',
      desc: 'Os ventos frios do inverno começam a soprar em Pharstyth. O nome alude à mítica arquimaga que habitava o estreito que une os dois continentes. Por que uma vilã seria homenageada, porém, permanece um mistério…' },
    { nome: 'Véu', estacao: 'inverno',
      desc: 'O mês seguinte, Véu, tem esse nome tanto por ser uma época de noites longas quanto como homenagem a Tenebra, que se encontra mais poderosa nesse período do ano.' },
    { nome: 'Pyra', estacao: 'inverno',
      desc: 'O inverno (e o ano) termina com Pyra. O nome é uma alusão a Thyatis, o Deus das Segundas Chances — pois é isso que muitos esperam ter em um ano novo — e também ao costume artoniano dessa época, de se queimar coisas antigas e se fazer profecias em piras divinatórias.' },
  ],

  // ── Dias da Semana (p. 32) — de Valk a Leen ────────────────────────
  //  "Os dias da semana homenageiam divindades do Panteão. Ao contrário
  //  dos meses, os dias não mudaram no calendário artoniano estabelecido
  //  por Wortar I, continuando os mesmos desde a época dos reinos do sul."
  semana: [
    { nome: 'Valk', curto: 'Valk',
      desc: 'Valkaria. O primeiro dia da semana antes honrava um obscuro deus menor, mas passou a se chamar Valk por conta da Deusa da Humanidade.' },
    { nome: 'Hedryl', curto: 'Hed',
      desc: 'Antigo nome de Khalmyr.' },
    { nome: 'Luna', curto: 'Luna',
      desc: 'Antigo nome de Lena.' },
    { nome: 'Astar', curto: 'Ast',
      desc: 'O nome feérico de Azgher.' },
    { nome: 'Dallia', curto: 'Dal',
      desc: 'O nome élfico de Wynna.' },
    { nome: 'Haya', curto: 'Haya', nota: 'dia de festejos',
      desc: 'Marah para as fadas. Haya é considerado um dia de festas e diversão.' },
    { nome: 'Leen', curto: 'Leen', nota: 'dia de descanso',
      desc: 'Antiga faceta de Ragnar, o Deus da Morte. Leen é reservado ao repouso — como os camponeses dizem, o dia do “descanso dos mortos”.' },
  ],

  // ── Os Dias de Nimb (p. 31–32) — fora de qualquer mês ──────────────
  nimb: {
    min: 2, max: 8,
    desc: 'Além dos doze meses do ano, o calendário artoniano inclui os Dias de Nimb, período cuja duração e posição dentro do calendário variam anualmente. No início de cada ano, a Rainha-Imperatriz recebe em seus aposentos uma carta com o símbolo sagrado do Deus do Caos e duas informações: quantos dias de Nimb o ano terá e no fim de qual mês irão ocorrer.\n\n' +
          'Durante os Dias de Nimb, eventos estranhos acontecem: tibares caem do céu como chuva; árvores levantam suas raízes e se colocam em marcha, destruindo tudo em seu caminho; vacas dão gorad quente em vez de leite… Além disso, clérigos de Nimb vagam pelo Reinado fazendo decretos malucos que, nesse período, carregam peso de lei (no resto do ano, as sandices dos devotos do Caos tendem a ser ignoradas). Por isso tudo, muitas pessoas passam esses dias fechadas em suas casas, simplesmente esperando que essa época acabe!\n\n' +
          'Os Dias de Nimb são um enigma que desafia os astrônomos de Tanna-Toh. Já houve diversas tentativas de prevê-los, mas até hoje nenhum cálculo funcionou. A única coisa que se sabe sobre eles é que sua quantidade varia de dois a oito. Assim, cada ano artoniano tem de 362 a 368 dias — na média, 365 dias.',
  },

  // ── Datas Especiais (p. 32–33) ─────────────────────────────────────
  //  "De modo geral, entre os camponeses não há dias sem trabalho,
  //  exceto quando algo é dito em contrário. Já nas cidades, a maioria
  //  das datas comemorativas inclui pausas no trabalho de artesãos e
  //  comerciantes." O livro lista cada uma pelo PRIMEIRO dia; `dias` é a
  //  duração, para as duas que duram uma semana.
  datas: [
    { dia: 1, mes: 1, dias: 1, nome: 'Dia do Reencontro',
      desc: 'O primeiro e mais importante dia do ano. Foi no Dia do Reencontro, há exatos 400 anos, que a caravana de refugiados de Lamnor chegou aos pés da estátua de Valkaria, iniciando a era atual de Arton. Nesta data, grandes festas são celebradas por todo o Reinado — em especial em Valkaria, que fica com suas ruas, tavernas e estalagens lotadas.\n\n' +
            'O primeiro dia do ano também é o equinócio da primavera. Nesta data, povos silvestres, como elfos, sílfides e centauros, cantam e dançam ao redor de fogueiras para comemorar o fim do inverno e o início de um novo ciclo.' },
    { dia: 15, mes: 1, dias: 1, nome: 'Cerimônia do Plantio',
      desc: 'Este feriado, popular entre camponeses, celebra o início do plantio. Costuma-se plantar uma semente simbólica no solo, para afastar o inverno e permitir a chegada da primavera. Também nesta data a Ordem de Lena realiza a cerimônia que ordena suas jovens clérigas (diz-se que é neste dia que Lena desce dos céus para fecundá-las).' },
    { dia: 20, mes: 3, dias: 7, nome: 'Sckharal',
      desc: 'Sete dias de festividades em Sckharshantallas. As ruas são tomadas por enormes dragões feitos de vime, dançarinos, mágicos e companhias teatrais. O último dia do Sckharal é reservado à execução de criminosos.\n\n' +
            '(O capítulo do reino, p. 254, põe a execução no dia seguinte ao fim da festa — o Dia da Execução.)' },
    { dia: 6, mes: 4, dias: 1, nome: 'Dia da Memória',
      desc: 'Uma cerimônia recente, celebrada no Reinado para comemorar o fim da Guerra Artoniana e honrar aqueles que caíram frente às tropas puristas.' },
    { dia: 12, mes: 5, dias: 1, nome: 'Cerimônia de Admissão da Ordem da Luz',
      desc: 'Nessa época, Norm fica lotada de jovens nobres, escudeiros e aventureiros almejando entrar na prestigiosa ordem de cavalaria.' },
    { dia: 1, mes: 7, dias: 1, nome: 'Exposição de Inventos',
      desc: 'Criado por Lorde Niebling, este evento é uma grande mostra de engenhocas no Palácio Imperial de Valkaria. Recebe inventores de todas as raças, incluindo goblins — para desgosto de nobres conservadores.' },
    { dia: 11, mes: 8, dias: 7, nome: 'Grande Feira',
      desc: 'Esta semana de festividades atrai milhares de aventureiros e visitantes para Nova Malpetrim.' },
    { dia: 17, mes: 9, dias: 1, nome: 'Noite das Máscaras',
      desc: 'Comemoração da fundação do reino de Ahlen. Durante as festividades que ocorrem na capital, Thartann, todos usam máscaras e as roupas que quiserem — é o único dia do ano em que não há distinção entre nobres e plebeus. O ponto culminante das festividades é o baile que acontece nos salões do Palácio Rishantor, sede da corte ahleniense.' },
    { dia: 7, mes: 10, dias: 1, nome: 'Noite das Sombras',
      desc: 'Nesta temida noite, espíritos nefastos vagam pelo mundo arrastando quem puderem para seus reinos de trevas, seres feéricos cavalgam pelos campos e magias nocivas têm seu poder dobrado. Dizem que a primeira Noite das Sombras aconteceu quando a ancestral maga goblinoide Hangpharstyth enlouqueceu e morreu em uma explosão mística em seu castelo no istmo que separava Arton Norte e Sul. Os ecos de seu último grito atravessaram os Planos de existência e, uma vez por ano, todo artoniano se encolhe em sua casa, mantendo suas portas e janelas fechadas e orando aos deuses por proteção.' },
    { dia: 3, mes: 12, dias: 1, nome: 'Dia da Profecia',
      desc: 'Neste dia, o povo busca orientação de seus clérigos. Dizem que, nessa data, as profecias costumam ser mais precisas e informativas; ou, ainda, que as profecias desse dia falam de eventos importantes.' },
  ],
};
