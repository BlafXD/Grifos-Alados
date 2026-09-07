// ═══════════════════════════════════════════════════════════════════
//  SERVICOS-DATA.JS — Os serviços das tabelas de Itens Gerais
//  Sub-aba "🛎 Serviços" da Loja (js/loja.js). São as 24 linhas COM
//  PREÇO que os livros listam entre os itens gerais mas que a loja não
//  vende como item: cama, condução, cura, magia paga, mercenário,
//  casamento. Antes disso não existiam em canto nenhum do site.
//
//  Fontes (tabela → prosa que descreve cada serviço):
//    Tormenta 20 ......... Tab. 3-6: Itens Gerais (p. 157) → p. 163
//    Heróis de Arton ..... Tab. 3-4: Itens Gerais (p. 229) → p. 238-239
//    Deuses de Arton ..... Tab. 1-3: Itens Gerais (p. 50)  → p. 54
//  Preços conferidos por DUAS extrações independentes de cada PDF
//  (pdftotext -layout e -raw), como manda a conferência dos itens.
//
//  Formato de um serviço:
//    { nome, preco, unidade?, desc, faixas?, mercenarios? }
//      preco    → número em T$ (o livro nunca cobra espaços por serviço:
//                 a coluna "Espaços" das três tabelas é "—" em todos)
//      unidade  → o que o livro imprime junto do preço ("por noite",
//                 "por km", "por cena"); sem unidade, é preço avulso
//      faixas   → quando uma linha do livro é um cabeçalho com preços
//                 embaixo (Condução, Magia, Mercenário): cada faixa é
//                 uma linha de preço da tabela
//      mercenarios → só o Mercenário: os 16 NPCs de contrato do Heróis,
//                 com o tipo/nível de parceiro (ou de capanga) que o
//                 livro dá a cada um. O PREÇO de cada um sai da faixa
//                 correspondente da tabela — é o único lugar onde o
//                 livro imprime valor.
//
//  As descrições entram TAMBÉM na base de descrições do site (o balão
//  "📖 Descrição" e a busca das nuvens) — ver o registro no fim do
//  arquivo. Por isso este arquivo carrega DEPOIS de itens-descricoes.js
//  e ANTES de loja.js.
// ═══════════════════════════════════════════════════════════════════

window.GA_SERVICOS = [

  // ─── TORMENTA 20 ──────────────────────────────────────────────────
  {
    livro: 'Tormenta 20',
    tabela: 'Tabela 3-6: Itens Gerais',
    pagTabela: 157,
    pagTexto: 163,
    secoes: [
      {
        titulo: 'Hospedagem',
        intro: 'Estalagens e tavernas são lugares onde aventureiros descansam ou se preparam para suas próximas missões. Estalagens são como hospedarias, onde se pode alugar quartos para dormir e fazer refeições. Tavernas são como bares, com refeições, bebidas e às vezes espetáculos, geralmente realizados por bardos, além de bons lugares para conseguir informações. As estadias a seguir têm preços por noite, incluem uma refeição comum e determinam sua recuperação de PV e PM (veja mais na página 106).',
        itens: [
          { nome: 'Estadia comum', preco: 0.5, unidade: 'por noite',
            desc: 'Um espaço no salão comunal. Se tiver sorte, o taverneiro deixará a lareira acesa para que você não passe frio. Pelo menos não ficará sozinho — pulgas e ratos lhe farão companhia. A refeição consiste de pão, sopa e água. Recupera 1 PV e 1 PM por nível.' },

          { nome: 'Estadia confortável', preco: 4, unidade: 'por noite',
            desc: 'Um quarto pequeno, mas privativo, com uma cama com colchão de palha e um baú para guardar seus pertences. A refeição inclui pão, queijo, cozido de galinha com legumes e cerveja ou vinho (aguado). Recupera 2 PV e 2 PM por nível.' },

          { nome: 'Estadia luxuosa', preco: 20, unidade: 'por noite',
            desc: 'Um quarto grande, com colchão de algodão ou penas, cortinas nas janelas, uma bacia de água quente para banho e outros luxos. A refeição inclui carne, frutas, doces e uma taça de vinho de boa safra. Acomodações desta categoria estão disponíveis apenas nas melhores estalagens, normalmente apenas em cidades e metrópoles. Recupera 3 PV e 3 PM por nível.',
            onde: 'Só nas melhores estalagens — normalmente apenas em cidades e metrópoles.' },
        ],
      },
      {
        titulo: 'Outros Serviços',
        itens: [
          { nome: 'Condução', unidade: 'por km',
            desc: 'Inclui viagens terrestres (em carroças), marítimas (em navios) ou aéreas (balões goblins). Viajar em balões goblins é arriscado: a cada 100 km há 1 chance em 20 de queda (não fatal).',
            faixas: [
              { nome: 'terrestre', preco: 0.5 },
              { nome: 'marítima',  preco: 0.1 },
              { nome: 'aérea',     preco: 10 },
            ] },

          { nome: 'Curandeiro', preco: 5,
            desc: 'O preço para você receber cuidados prolongados ou tratamento contra uma doença ou veneno (veja a página 117). Isso considera que você vai até a casa do curandeiro ou onde quer que ele receba seus pacientes — curandeiros não aceitam acompanhar aventureiros em suas jornadas.' },

          { nome: 'Magia',
            desc: 'Este é o preço para lançar uma magia em uma situação comum. Ou seja, você vai até o conjurador e lançar a magia não oferece risco para ele. Se você pedir ao conjurador para acompanhá-lo numa aventura, a resposta padrão será “não, obrigado”.',
            faixas: [
              { nome: '1º círculo', preco: 10 },
              { nome: '2º círculo', preco: 90 },
              { nome: '3º círculo', preco: 360 },
            ] },

          { nome: 'Mensageiro', preco: 0.5, unidade: 'por km',
            desc: 'Inclui mensagens entregues a pé, por cavaleiros ou navios.' },
        ],
      },
    ],
  },

  // ─── HERÓIS DE ARTON ──────────────────────────────────────────────
  {
    livro: 'Heróis de Arton',
    tabela: 'Tabela 3-4: Itens Gerais',
    pagTabela: 229,
    pagTexto: 238,
    secoes: [
      {
        titulo: 'Mercenários',
        itens: [
          { nome: 'Mercenário', unidade: 'por cena',
            desc: 'Você pode contratar mercenários como parceiros (Tormenta20, p. 260). O valor listado representa o preço para contratar o NPC por uma cena. Ele o acompanha, contando no seu limite de parceiros, mas sem oferecer benefícios, até que você peça sua ajuda. Então fornece seu benefício até o fim da cena. Após ajudá-lo, o mercenário vai embora. De acordo com o mestre, pode ser possível contratar um mercenário para uma aventura inteira pelo triplo do preço listado. A descrição de cada mercenário indica seu tipo e nível.',
            faixas: [
              { nome: 'parceiro iniciante',  preco: 30 },
              { nome: 'capangas iniciantes', preco: 90 },
              { nome: 'parceiro veterano',   preco: 150 },
              { nome: 'capangas veteranos',  preco: 300 },
            ],
            // O livro não põe preço no verbete de cada mercenário: quem
            // paga é a faixa da tabela, achada pelo tipo/nível que a
            // última frase do verbete indica (parceiro × capanga).
            mercenarios: [
              { nome: 'Alquimista de Batalha', desc: 'Um artesão especializado em preparados alquímicos e no seu uso em combate.',
                tipo: 'Destruidor', nivel: 'veterano', faixa: 'parceiro veterano', preco: 150 },

              { nome: 'Aprendiz de Guilda', desc: 'Um auxiliar treinado, capaz de ajudá-lo em seu ofício.',
                tipo: 'Ajudante', pericias: 'Conhecimento e Ofício', nivel: 'iniciante', faixa: 'parceiro iniciante', preco: 30 },

              { nome: 'Aprendiz de Mago', desc: 'Um estudioso das artes arcanas, o aprendiz pode ajudá-lo com as suas magias (embora ainda não consiga lançar feitiços por si só).',
                tipo: 'Magivocador', nivel: 'iniciante', faixa: 'parceiro iniciante', preco: 30 },

              { nome: 'Arauto', desc: 'Um servo treinado para anunciá-lo de forma solene.',
                tipo: 'Ajudante', pericias: 'Diplomacia, Intuição e Nobreza', nivel: 'veterano', faixa: 'parceiro veterano', preco: 150 },

              { nome: 'Arqueiros', desc: 'Um grupamento de arqueiros, soldados irregulares ou caçadores em busca de algum soldo. Você precisa ser treinado em Guerra para contratar e comandar os arqueiros.',
                tipo: 'Unidade de arqueiros', nivel: 'veterana', capanga: true, faixa: 'capangas veteranos', preco: 300,
                stats: 'Cinco arqueiros (deslocamento 9 m, Defesa 14, dano 1d6 de perfuração cada). Ao contrário de outros capangas, podem causar dano a inimigos em alcance curto que não tenham cobertura.' },

              { nome: 'Bando de Aldeões', desc: 'Um grupo de esfarrapados descalços portando ancinhos, porretes e outras armas improvisadas. Você precisa ser treinado em Guerra para contratar e comandar um bando de aldeões.',
                tipo: 'Turba de camponeses', nivel: 'iniciante', capanga: true, faixa: 'capangas iniciantes', preco: 90,
                stats: 'Seis camponeses (deslocamento 9 m, Defesa 10, dano 1d6 de perfuração cada).' },

              { nome: 'Batedor', desc: 'Um guia atento e acostumado com os ermos.',
                tipo: 'Vigilante', nivel: 'veterano', faixa: 'parceiro veterano', preco: 150 },

              { nome: 'Besteiro', desc: 'Um combatente especializado em armas de disparo.',
                tipo: 'Atirador', nivel: 'iniciante', faixa: 'parceiro iniciante', preco: 30 },

              { nome: 'Bibliotecário Místico', desc: 'Um entusiasta de magia, repleto de tomos e pergaminhos.',
                tipo: 'Adepto', nivel: 'veterano', faixa: 'parceiro veterano', preco: 150 },

              { nome: 'Conselheiro', desc: 'Um estudioso de diversos assuntos.',
                tipo: 'Ajudante', pericias: 'Conhecimento, Misticismo e Nobreza', nivel: 'veterano', faixa: 'parceiro veterano', preco: 150 },

              { nome: 'Guarda-Costas', desc: 'Um mercenário especializado em proteger seu contratante e enfrentar seus inimigos.',
                tipo: 'Guardião', nivel: 'iniciante', faixa: 'parceiro iniciante', preco: 30 },

              { nome: 'Herbalista', desc: 'Um conhecedor de ervas e unguentos medicinais.',
                tipo: 'Médico', nivel: 'iniciante', faixa: 'parceiro iniciante', preco: 30 },

              { nome: 'Homem de Armas', desc: 'Um soldado treinado em armas corpo a corpo, como espadas e machados.',
                tipo: 'Fortão', nivel: 'iniciante', faixa: 'parceiro iniciante', preco: 30 },

              { nome: 'Irregulares', desc: 'Soldados que não fazem parte de nenhum exército ou companhia mercenária regular, com pouco treinamento e equipamento díspar. Você precisa ser treinado em Guerra para contratar e comandar os irregulares.',
                tipo: 'Pelotão de infantaria', nivel: 'veterano', capanga: true, faixa: 'capangas veteranos', preco: 300,
                stats: 'Cinco infantes (deslocamento 9 m, Defesa 16, dano 2d4+1 de corte cada).' },

              { nome: 'Matador', desc: 'Um assassino de aluguel, discreto e letal.',
                tipo: 'Assassino', nivel: 'veterano', faixa: 'parceiro veterano', preco: 150 },

              { nome: 'Sombra', desc: 'Um mercenário acostumado a agir discretamente e desvendar segredos bem guardados.',
                tipo: 'Ajudante', pericias: 'Enganação, Furtividade e Investigação', nivel: 'veterano', faixa: 'parceiro veterano', preco: 150 },
            ] },
        ],
      },
      {
        titulo: 'Outros Serviços',
        pag: 239,
        itens: [
          { nome: 'Banho quente', preco: 10,
            desc: 'Disponível em casas de banho e algumas estalagens, um bom banho é relaxante, limpa o corpo e fortalece a imunidade. Você recebe +1d6 em seu próximo teste de resistência feito até o fim do próximo dia (cumulativo com bônus de outros itens).' },

          { nome: 'Bigode encerado', preco: 20,
            desc: 'Um barbeiro especializado, além de extrair dentes e realizar pequenas cirurgias, pode aparar e moldar com cera a barba e (principalmente) o bigode de um cliente. Um bigode de respeito impõe esse respeito a todos. A primeira criatura inteligente (Int –3 ou maior) que usar um efeito que exija um teste de Vontade contra você em uma cena deve fazer ela própria um teste de Vontade (CD Car). Se falhar, perde sua ação. O efeito do bigode só funciona uma vez por cena. Um bigode encerado dura 1 dia. Um personagem treinado em Ofício (barbeiro) pode gastar 1 hora de trabalho e T$ 2 para encerar o bigode de alguém (incluindo o seu).' },

          { nome: 'Instrução marcial', preco: 300,
            desc: 'Algumas horas de treino com um mestre de armas custam caro, mas afiam as habilidades de qualquer um. Role 1d4; você recebe o resultado dessa rolagem em d4 de auxílio. Até o fim da aventura, quando faz um teste de ataque, você pode gastar 1d4 e adicionar o resultado como bônus no teste (cumulativo com bônus de outros itens).' },

          { nome: 'Maquiagem profissional', preco: 30,
            desc: 'Um maquiador especializado, além de criar disfarces e ouvir os últimos boatos da corte, pode realizar uma verdadeira transformação no rosto de um cliente, ressaltando seus olhos, afinando seu nariz, escondendo cicatrizes etc. Com uma maquiagem profissional, você causa uma primeira impressão mais impactante. Quando faz seu primeiro teste de Diplomacia para mudar atitude em cada cena, você rola dois dados e usa o melhor resultado. Uma maquiagem profissional dura 1 dia.' },

          { nome: 'Ópera', preco: 200,
            desc: 'Disponíveis em grandes cidades onde a cultura seja valorizada e apreciada, as óperas têm um impacto profundo naqueles que possuem uma compreensão artística apurada. Se você for treinado em Atuação ou Conhecimento e assistir a uma ópera, seu total de PM aumenta em +1d4 até o fim da aventura.',
            onde: 'Só em grandes cidades onde a cultura seja valorizada e apreciada.' },

          { nome: 'Sarau informativo', preco: 150,
            desc: 'Em alguns lugares, é comum viajantes ou eruditos se reunirem para compartilhar as notícias da região. Passar algumas horas em um destes encontros permite se manter informado a respeito dos últimos acontecimentos. Role 1d4; você recebe o resultado dessa rolagem em d4 de auxílio. Até o fim da aventura, quando faz um teste de Conhecimento ou Nobreza, você pode gastar 1d4 e adicionar o resultado como bônus no teste (cumulativo com bônus de outros itens).' },
        ],
      },
    ],
  },

  // ─── DEUSES DE ARTON ──────────────────────────────────────────────
  {
    livro: 'Deuses de Arton',
    tabela: 'Tabela 1-3: Itens Gerais',
    pagTabela: 50,
    pagTexto: 54,
    secoes: [
      {
        titulo: 'Serviços religiosos',
        itens: [
          { nome: 'Casamento', preco: 150, unidade: 'por pessoa',
            desc: 'Você se casa com uma pessoa amada. Em geral, casamentos são entre duas pessoas, mas algumas religiões (notavelmente Marah) permitem a poligamia. O poder do amor fornece aos pombinhos uma reserva conjunta de 3 PM, que eles só podem usar se estiverem em alcance curto um do outro. Qualquer um deles pode recuperar esses PM (inclusive com descanso). O suplemento Só Aventuras descreve casamentos específicos de cada religião.' },

          { nome: 'Cerimônia religiosa', preco: 20,
            desc: 'Frades e clérigos podem celebrar ritos em campo, mas para um fiel, nada se compara a ouvir as palavras sagradas na casa de seu deus. Assistir a uma cerimônia em um templo da divindade da qual você é devoto fornece +1 em Religião e Vontade e +2 PM até o fim da aventura.',
            onde: 'Em um templo da divindade da qual você é devoto.' },

          { nome: 'Sacramento', preco: 50,
            desc: 'Este rito religioso transfere uma fração de poder divino para um fiel. Por sua importância e dificuldade, é reservado para aqueles mais propensos a fazer bom uso desta dádiva; em geral, aventureiros envolvidos em uma missão de cunho divino. Escolha uma magia divina de 1º círculo; até o fim da aventura, você pode lançar essa magia uma única vez, sem aprimoramentos, gastando 2 PM (atributo-chave Sabedoria). Apenas devotos podem receber um sacramento e, obviamente, somente em templos de sua divindade.',
            onde: 'Só devotos, e só em templos de sua divindade.' },
        ],
      },
    ],
  },
];

// ── As descrições também entram na base do site ─────────────────────
//  Assim o serviço é achado pelo mesmo caminho de qualquer item: o
//  balão "📖 Descrição" da aba e a busca do "※ Descrição" das caixas de
//  texto. Só entram os SERVIÇOS (não os mercenários: nomes como
//  "Sombra" ou "Matador" são palavras comuns demais para virar verbete
//  do site). Nada é sobrescrito — se a chave já existir, fica a antiga.
(function registrarDescricoes() {
  'use strict';

  const base = window.GA_ITENS_DESC_EXTRA || (window.GA_ITENS_DESC_EXTRA = {});

  // Mesma normalização de itens-descricoes.js (é ela quem gera a chave).
  function chave(nome) {
    if (window.ItensDescricoes && window.ItensDescricoes.norm) {
      return window.ItensDescricoes.norm(nome);
    }
    return String(nome || '').trim().replace(/\([^)]*\)/g, '').toLowerCase()
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9 \-]/g, ' ').replace(/\s+/g, ' ').trim();
  }

  window.GA_SERVICOS.forEach(livro => {
    livro.secoes.forEach(secao => {
      secao.itens.forEach(item => {
        const k = chave(item.nome);
        if (k && item.desc && !(k in base)) base[k] = item.desc;
      });
    });
  });
})();
