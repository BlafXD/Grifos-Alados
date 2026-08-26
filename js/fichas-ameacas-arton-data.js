// ════════════════════════════════════════════════════════════════════
//  FICHAS-AMEACAS-ARTON-DATA.JS — o bestiário de Ameaças de Arton
//  Localização: /grifos-alados/js/fichas-ameacas-arton-data.js
//
//  ⚠ ARQUIVO GERADO por "Inútil/_gerar-ameacas-arton.js" a partir de
//    "Inútil/Regras - Ameaças de Arton.txt". Dá para editar à mão — mas
//    rodar o gerador de novo sobrescreve tudo.
//
//  As 223 criaturas do Capítulo 1 (Ameaças), nas 17 seções
//  temáticas do livro. Cada ficha guarda o TEXTO LIMPO do statblock, no
//  formato do livro — quem o transforma em criatura do bestiário é o
//  parser parsearFicha() do monstros.js (o mesmo do "📋 Importar do
//  livro"), exatamente como já acontece com js/fichas-t20-data.js.
//
//  Campos de cada ficha:
//    chave   — id estável (não mudar; a aba e o modal usam)
//    nome/nd — repetidos fora do texto para listas e filtros
//    tipo    — linha de tipo e tamanho (só exibição em listas)
//    papel   — 'solo' | 'lacaio' | 'especial'. No livro é um ÍCONE, que
//              não sobrevive à cópia do PDF: vem vazio, e o bestiário
//              assume "lacaio" até o mestre trocar na ficha.
//    resumo  — uma linha para o modal de inserção
//    texto   — statblock completo; PRIMEIRA linha = "Nome ND X", depois
//              a descrição (quando a entrada do livro tem uma ficha só),
//              a linha de tipo e o bloco do livro.
//    subgrupo— quando a entrada do livro cobre VÁRIAS fichas ("Orc",
//              "Bandido", "Trog"), o lore vira um quadro em `regras` e
//              as fichas apontam para ele por aqui.
//
//  ⚠ O texto NÃO é cópia literal: o gerador conserta os deslizes de
//  digitação do livro e da cópia do PDF que atrapalhavam a leitura —
//  espaço que falta ("Von+28", "Corpo a CorpoAdaga", "Gatzvalith,Lorde"),
//  espaço sobrando antes de pontuação, ponto que falta antes de
//  "Tesouro", vírgula na linha de atributos, "Magia" no singular abrindo
//  o bloco de magias e o deslocamento sem os quadrados (1q = 1,5m). Cada
//  conserto sai listado no relatório do gerador; nenhum número de regra
//  foi tocado.
//
//  ⚠ Doze NDs vieram errados da cópia do PDF e foram conferidos no livro:
//  Lefeu, Burodron (11), Lefeu, Ezzayn (17), Aspecto de Aharadak (10),
//  Alto Sacerdote de Hyninn (8), Hobgoblin Atirador (5), Namasqall (13),
//  Ber-baram (8), Gnoll Xamã de Allihanna (2), Gnoll Xamã de Marah (6),
//  Instrumento Divino (7) e Tengu Bandoleiro (6) vieram SEM ND; o "ND 8"
//  que o dump colou no Sacerdote de Hyninn era do Alto Sacerdote — o
//  Sacerdote é ND 2. (O Goblin-Bomba também veio sem ND no statblock,
//  mas o "ND 3" estava no título da entrada e o gerador o recuperou.)
//
//  ⚠⚠ 2 NDs AINDA NÃO CONFERIDOS NO LIVRO — Arqueiro Escravo (5) e Kobold Xamã (3).
//  Vieram sem ND na cópia do PDF e o número aqui é dedução do gerador;
//  o raciocínio de cada um está no relatório. Se o livro disser outra
//  coisa, troque na tabela ND_FALTANDO do gerador e rode de novo.
//
//  ⚠ O "✦" no começo de uma linha é o selo de HABILIDADE MÁGICA (no
//  livro é um ícone ao lado do nome; na cópia do PDF sobrou como um "e"
//  solto no fim do parágrafo). Importa em jogo: só uma habilidade mágica
//  pode levar Dissipar Magia e é anulada onde a magia não funciona.
//
//  Cada categoria traz ainda:
//    intro   — a abertura da seção no livro
//    regras  — quadros laterais e aberturas de entrada (Orc, Bandido,
//              Habilidades de Trogs, Habilidades Lekael…)
//    comuns  — quando o grupo tem um quadro que vale para TODAS as fichas
//              dele; "aplicaSe" filtra pela linha de tipo e a aba oferece
//              anexá-lo ao mandar a ficha para o combate.
// ════════════════════════════════════════════════════════════════════
window.FICHAS_AMEACAS_ARTON = {

  livro: 'Ameaças de Arton',
  fonte: 'Capítulo 1: Ameaças',

  categorias: [

    // ── 🌀 ÁREAS DE TORMENTA ───────────────────────────
    {
      chave: "tormenta", nome: "Áreas de Tormenta", icone: "🌀", cor: "#7a2f7a",
      intro: "Os lugares que a Tormenta toca deixam de ser Arton. Tornam-se planícies de carapaça, pântanos oleosos, florestas de tentáculos, montanhas afiadas e vermelhidão eterna. Essas terras macabras não podem ser mapeadas, suas fronteiras não se sujeitam à cartografia humana; alguns dizem que podem surgir subitamente no caminho de qualquer viajante que acredite estar longe, em segurança. Percorrer tais regiões corrompidas é como caminhar em um pesadelo. Os passos ficam pesados, a respiração é sofrida. Tudo em volta é horror, com aspecto de ossos retorcidos, órgãos sangrentos e faces em agonia. A vida, tal como conhecemos, é impossível — mas existe antivida, monstros disformes que desafiam qualquer compreensão. Rondam como patrulhas ou espreitam à espera de vítimas. Apenas os mais poderosos pertencem, de fato, à raça invasora lefeu. Muitos outros surgem como efeitos colaterais da contaminação cósmica, como larvas rastejando nas feridas do mundo. Não existem para sobreviver, nem para cumprir nenhum ciclo natural, mas para causar dor e loucura. Horrendos, profanos e prontos para entregar aventureiros a destinos piores que a morte. E, embora sejam mais comuns em terras corrompidas, essas criaturas também podem ocorrer em outros lugares — pois não dependem da Tormenta para existir. Estão na escuridão das masmorras. Estão nos esgotos das grandes cidades, nas profundezas das matas, nos porões dos armazéns. Chegam ali de formas inexplicáveis. Porque, com a ascensão de Aharadak, o horror sangrento em Arton apenas cresce.",
      comuns: { titulo: "O Poder dos Lefeu", aplicaSe: "(lefeu)", nota: "Vale para as fichas com o subtipo lefeu (as (lefou) são meio-demônios e ficam de fora); o quadro completo das habilidades lefeu está na sub-aba ⚔ Tormenta 20 (\"Habilidades Lefeu\", grupo A Tormenta)." },
      fichas: [
        {
          chave: "almaAcorrentada", nome: "Alma Acorrentada", nd: "7", tipo: "Morto-vivo Médio",
          papel: '',
          resumo: "Essas aparições lembram fantasmas translúcidos e avermelhados, envoltos em névoa sangrenta.",
          texto:
`Alma Acorrentada ND 7
“Não esperem encontrar pontos de referência aqui. Com exceção… daquilo.”
— Devon Lockheart, explorador da Tormenta
Essas aparições lembram fantasmas translúcidos e avermelhados, envoltos em névoa sangrenta. Ainda carregam os ferimentos terríveis que receberam ao morrer. Todos presos a correntes enferrujadas, impossivelmente longas, sumindo na distância. Quando um Lorde da Tormenta mata alguém pessoalmente, o destino dessa criatura infeliz muitas vezes é acabar como uma alma acorrentada — um morto-vivo imaterial, preso por uma corrente sobrenatural. Ao contrário dos próprios fantasmas, a corrente é rígida e muito forte. É também infinitamente longa, desaparecendo no horizonte, ligando o fantasma ao castelo, fortaleza ou templo do próprio Lorde responsável por sua morte. O ataque destes espíritos é simples e implacável: surgem inesperadamente (pois podem ficar invisíveis dentro de uma área de Tormenta) e tentam agarrar suas vítimas, trazendo-as para dentro de sua névoa corrosiva. Quando esse abraço mortal mata a vítima, seu destino é terrível: o espírito é arrancado do corpo e ambas as almas — fantasma e vítima — são arrastadas pela corrente até os domínios do Lorde. O corpo físico é deixado para trás, mas sua ressurreição é impossível. Espíritos capturados desta forma são, em geral, usados para criar novas almas acorrentadas. A corrente impede uma alma de abandonar uma área de Tormenta. Quando uma alma acorrentada é destruída, a corrente se desvanece em uma fina névoa vermelha.
Morto-vivo Médio
Iniciativa +14, Percepção +9, visão no escuro
Defesa 26, Fort +14, Ref +19, Von +8, incorpóreo
Pontos de Vida 56
Deslocamento voo 9m (6q)
Corpo a Corpo Toque cáustico +26 (2d6+10 ácido).
Agarrar Oportunista (Livre) Quando a alma acorrentada acerta um ataque, pode usar a manobra agarrar (teste +28). Contra uma criatura agarrada, a alma é considerada corpórea. Se a alma matar uma criatura que esteja agarrando, ambas desaparecerão.
Aura Cáustica No início de cada turno da alma, todas as criaturas adjacentes à alma acorrentada sofrem 6d6 pontos de dano de ácido. Uma criatura que morra dentro da aura cáustica não pode ser trazida de volta à vida.
Invisibilidade Rubra A alma tem camuflagem total em áreas de Tormenta. Quando ela ataca, essa camuflagem muda para leve até o início de seu próximo turno.
For —, Des 7, Con 2, Int 1, Sab 0, Car –2
Perícias Furtividade +15 (+25 em áreas de Tormenta).
Tesouro Nenhum.`
        },
        {
          chave: "bruxoDaTormenta", nome: "Bruxo da Tormenta", nd: "6", tipo: "Humanoide (humano) Médio",
          papel: '',
          subgrupo: "Bruxo da Tormenta",
          resumo: "Bruxo da Tormenta — O estranho em mantos escarlates tem cabelo longo, oleoso e desgrenhado.",
          texto:
`Bruxo da Tormenta ND 6
Humanoide (humano) Médio
Iniciativa +5, Percepção +6
Defesa 27, Fort +6, Ref +12, Von +18
Pontos de Vida 142
Deslocamento 9m (6q)
Pontos de Mana 41
✦ Cuspir Enxame (Completa, 2 PM, sustentada) Um enxame de insetos rubros Médio surge em um ponto em alcance curto. No fim de cada um dos seus turnos, ele causa 4d6 pontos de dano de ácido a qualquer criatura em seu espaço. O bruxo pode gastar uma ação de movimento para mover o enxame com deslocamento de 9m.
✦ Mente Aberrante (Reação) Quando faz um teste de Vontade para resistir a um efeito, o bruxo causa 5d6 pontos de dano psíquico na criatura que gerou o efeito.
✦ Raio Arcano (Padrão, 1 PM) Uma criatura em alcance médio sofre 2d12 pontos de dano de trevas e não pode curar PV por 1 rodada (Ref CD 24 reduz à metade e evita a restrição de cura).
Magias Como um bruxo de 6º nível (CD 24). Seu foco é seu cajado arcano.
• Névoa (Padrão, 3 PM) Forma uma nuvem que ocupa um cubo de 6m em alcance curto e dura até o fim da cena. Criaturas a até 1,5m têm camuflagem leve e criaturas a partir de 3m têm camuflagem total. Um vento forte dispersa a névoa em 4 rodadas e um vendaval a dispersa em 1 rodada. No início dos seus turnos, criaturas dentro da nuvem e criaturas com faro em alcance curto ficam enjoadas por 1 rodada (Fort evita).
• Raio do Enfraquecimento (Padrão, 3 PM) Uma criatura em alcance curto fica exausta (Fort reduz para fatigada).
• Sussurros Insanos (Padrão, 5 PM) Até 2 humanoides em alcance curto ficam confusos (Von evita).
• Velocidade (Padrão, 3 PM) Até o fim da cena, o bruxo pode executar uma ação de movimento adicional por turno, que não pode ser usada para lançar magias.
For –1, Des 0, Con 2, Int 5, Sab 1, Car –2
Perícias Conhecimento +12, Misticismo +15.
Equipamento Cajado arcano de matéria vermelha. Tesouro Padrão.`
        },
        {
          chave: "arquibruxoDaTormenta", nome: "Arquibruxo da Tormenta", nd: "14", tipo: "Monstro (lefou) Médio",
          papel: '',
          subgrupo: "Bruxo da Tormenta",
          resumo: "Bruxo da Tormenta — O estranho em mantos escarlates tem cabelo longo, oleoso e desgrenhado.",
          texto:
`Arquibruxo da Tormenta ND 14
Monstro (lefou) Médio
Iniciativa +13, Percepção +16, visão no escuro
Defesa 45, Fort +14, Ref +22, Von +28, resistência a magia +2
Pontos de Vida 486
Deslocamento 9m (6q), voo 12m (8q)
Pontos de Mana 105
Abominar a Realidade O arquibruxo está sempre no limiar da realidade. Ele ignora terreno difícil e efeitos que o tenham como alvo possuem 50% de chance de falha.
Arcano de Batalha O arquibruxo soma sua Inteligência nas rolagens de dano quando lança magias ou usa seu Raio Arcano (já contabilizado).
Insanidade da Tormenta 2d10 PM (Von CD 40 evita).
Magia Acelerada (Livre, +4 PM) Uma vez por rodada, quando usa Raio Arcano ou lança uma magia com execução de ação completa ou menor, o arquibruxo muda a execução desta ação para livre.
Mente Aberrante (Reação) Quando faz um teste de Vontade para resistir a um efeito, o bruxo causa 12d6 pontos de dano psíquico na criatura que gerou o efeito.
✦ Raio Arcano (Padrão, 1 PM) Uma criatura em alcance médio sofre 4d12+7 pontos de dano de trevas e não pode recuperar PV por 1 rodada (Ref CD 40 reduz à metade e evita a restrição de cura).
Magias Como um bruxo de 14º nível (CD 40). Seu foco é seu cajado arcano.
• Desintegrar (Padrão, 14 PM) Uma criatura ou objeto em alcance médio sofre 12d12+7 pontos de dano de essência (Fort reduz para 3d12). Se reduzido a 0 PV, o alvo vira pó.
• Dissipar Magia (Padrão, 3 PM) O arquibruxo escolhe uma criatura, objeto ou esfera de 3m em alcance médio e faz um teste de Misticismo. Todas as magias nesse alvo com CD igual ou menor que o resultado do teste são dissipadas.
• Momento de Tormenta (Completa, 3 PM, sustentada) Uma nuvem rubra surge em um cubo de 30m acima do arquibruxo. Uma vez por turno, ele pode gastar uma ação de movimento para fazer a nuvem manifestar um dos seguintes fenômenos:
• Chuva ácida. Criaturas na área sofrem 6d4 pontos de dano de ácido.
• Neblina venenosa. Criaturas na área perdem 2d12 pontos de vida (Fort evita).
• Raios escarlates. Até 6 inimigos aleatórios na área sofrem 6d8 pontos de dano de eletricidade (Ref reduz à metade).
• Pesadelos reais. Criaturas na área sofrem 4d6 pontos de dano psíquico e perdem 1d4 PM (Von reduz à metade e evita a perda de PM).
• Seta Infalível de Talude (Padrão, 12 PM) O arquibruxo projeta 10 lanças de energia distribuídas em até 10 criaturas em alcance médio. Cada lança causa 1d8+1 pontos de dano de essência (uma delas recebe +7 na rolagem de dano).
• Sussurros Insanos (Padrão, 10 PM) Até 3 criaturas em alcance curto ficam confusas (Von anula).
• Velocidade (Padrão, 3 PM) Até o fim da cena, o arquibruxo pode executar uma ação de movimento adicional por turno, que não pode ser usada para lançar magias.
For –1, Des 2, Con 5, Int 7, Sab 0, Car –2
Perícias Conhecimento +20, Intimidação +19, Misticismo +28.
Equipamento Anel da energia, cajado arcano de matéria vermelha. Tesouro Nenhum.`
        },
        {
          chave: "enxameInfernal", nome: "Enxame Infernal", nd: "8", tipo: "Monstro (lefeu) Grande",
          papel: '',
          resumo: "O que parecia uma nuvem de insetos, quando examinada de perto revela-se algo muito pior.",
          texto:
`Enxame Infernal ND 8
“Corram! Não são insetos comuns! Não deixem que toquem… AHHHHH!!”
— Ewald Dermann, suraggel bardo (últimas palavras)
O que parecia uma nuvem de insetos, quando examinada de perto revela-se algo muito pior. São minúsculos horrores, formas humanoides distorcidas, com vários pares de asas úmidas e número variável de patas. Nas cabeças existem rostos contorcidos em agonia, lembrando antigas vítimas da Tormenta. O zumbido é insuportavelmente parecido com sussurros de crianças. Formado por demônios-insetos minúsculos, um enxame infernal pode ocorrer de muitas maneiras. Às vezes vagam através da Tormenta, comportando-se como enxames comuns — ainda que muito mais agressivos. Também podem surgir de formas inesperadas: emergem das entranhas de um lefeu destruído, saltam das páginas de um livro escrito em idioma lefeu, ou são expelidos pelos olhos e boca de um cultista da Tormenta que conjura rituais proibidos. Enxames infernais são perigosos justamente por seu surgimento imprevisível. Podem brotar em quase qualquer lugar — embora seu aparecimento seja quase sempre ligado à Tormenta. Laboratórios de magos, bibliotecas de estudiosos e fortalezas de generais já sofreram ataques destes enxames, que matam os responsáveis pelos avanços contra a Tormenta, ou destroem seu progresso. Um servo da Tormenta atacado por aventureiros também pode receber a proteção inesperada de um enxame em pleno combate.
Monstro (lefeu) Grande
Iniciativa +8, Percepção +7, visão no escuro
Defesa 33, Fort +15, Ref +23, Von +8
Pontos de Vida 350
Deslocamento 3m (2q), voo 15m (10q)
Enxame 5d12 pontos de dano de perfuração.
Drenar Existência O dano causado pelo enxame infernal só pode ser curado após 24 horas ou após o enxame ser destruído.
Insanidade da Tormenta 2d6 PM (Von CD 26 evita).
Zumbido Repugnante Uma criatura que comece seu turno em alcance curto do enxame infernal fica alquebrada e surda (Fort CD 26 evita).
For –3, Des 3, Con 2, Int –1, Sab 1, Car –1
Perícias Furtividade +9.
Tesouro Nenhum.`
        },
        {
          chave: "esmagadorColetivo", nome: "Esmagador coletivo", nd: "15", tipo: "Construto Enorme",
          papel: '',
          resumo: "A criatura lembra um gigante brutal, feito de matéria vermelha, de onde emergem incontáveis cabeças, braços e pernas.",
          texto:
`Esmagador coletivo ND 15
“Era um monstro gigante, feito de matéria vermelha e outras pessoas! Eu vi! Vocês têm que acreditar!”
— Kari, humana aventureira principiante
A criatura lembra um gigante brutal, feito de matéria vermelha, de onde emergem incontáveis cabeças, braços e pernas. Sua própria cabeça não tem feições próprias. Um coro constante de gemidos acompanha o esmagador, e seus passos retumbantes deixam horrendas marcas de sangue. Produzidos pelos “artistas” lefeu, estes horrores são fabricados com humanoides vivos, fundidos em uma única e agonizante forma. Em combate, um esmagador coletivo golpeia com as enormes mãos sem dedos. Apesar da força de seus golpes, sua tática mais comum é agarrar a vítima, enquanto as cabeças e mãos em sua superfície mordem e arranham. Caso consiga manter uma vítima segura por tempo suficiente, o esmagador consegue absorvê-la, reunindo mais um corpo à sua forma pavorosa. Essas monstruosidades podem ser vistas dentro ou fora de áreas de Tormenta. Às vezes são empregadas nas legiões dos lefeu ou enviadas para espalhar destruição pelo mundo exterior. Raros servos da Tormenta também recebem um esmagador como “ajudante”, como recompensa por bons serviços.
Construto Enorme
Iniciativa +12, Percepção +13, não pode ser flanqueado, visão no escuro
Defesa 46, Fort +28, Ref +22, Von +14, imunidade a acertos críticos, efeitos de metabolismo, metamorfose e paralisia, redução de dano 15
Pontos de Vida 800
Deslocamento 9m (6q)
Corpo a Corpo Três pancadas +39 (4d10+28).
Absorver (Completa) O esmagador coletivo absorve uma criatura Média ou menor que ele esteja agarrando há 3 rodadas consecutivas. A criatura morre instantaneamente e, para cada nível que ela tinha, o esmagador recebe 20 PV temporários.
Agarrar Aprimorado (Livre) Pancada (teste +44).
Arranhar (Livre) No início de seus turnos, o esmagador causa 4d10+28 pontos de dano de corte em qualquer criatura que esteja agarrando.
Arremessar Corpos (Padrão) O esmagador arremessa 1d4+2 corpos humanoides, distribuídos entre criaturas em alcance longo. Cada corpo causa 4d8+15 pontos de dano de impacto (Ref CD 40 evita).
Forma Horrenda Uma criatura que inicie seu turno em alcance médio do esmagador fica apavorada por 1d4 rodadas e depois abalada (Von CD 40 muda para abalada por 1d4 rodadas e a criatura não pode ser afetada por esta habilidade até o fim da cena).
Pancada Estonteante Uma criatura atingida pela pancada do esmagador fica atordoada por 1 rodada (Fort CD 40 evita). Uma criatura só pode ser atordoada por essa habilidade uma vez por cena.
For 14, Des –1, Con 15, Int —, Sab 0, Car —
Tesouro Nenhum.`
        },
        {
          chave: "infecto", nome: "Infecto", nd: "3", tipo: "Morto-vivo Médio",
          papel: '',
          subgrupo: "Infecto",
          resumo: "Infecto — Os vultos trôpegos poderiam ser zumbis comuns.",
          texto:
`Infecto ND 3
Morto-vivo Médio
Iniciativa +4, Percepção +4, visão no escuro
Defesa 20, Fort +14, Ref +4, Von +4, redução de dano 5/corte
Pontos de Vida 30
Deslocamento 9m (6q)
Corpo a Corpo Mordida +16 (1d8+9 mais doença).
Doença Uma criatura mordida por um infecto é exposta à doença infecção escarlate.
Parasitas Famintos Uma criatura que comece seu turno adjacente ao infecto ou faça um ataque corpo a corpo contra ele é exposta à doença infecção escarlate (Ref CD 17 evita).
For 4, Des 1, Con 3, Int —, Sab 1, Car –3
Tesouro Nenhum.`
        },
        {
          chave: "turbaDeInfectos", nome: "Turba de infectos", nd: "7", tipo: "Morto-vivo Grande",
          papel: '',
          subgrupo: "Infecto",
          resumo: "Infecto — Os vultos trôpegos poderiam ser zumbis comuns.",
          texto:
`Turba de infectos ND 7
Morto-vivo Grande
Iniciativa +6, Percepção +6, visão no escuro
Defesa 30, Fort +16, Ref +6, Von +6, redução de dano 5/corte
Pontos de Vida 80
Deslocamento 9m (6q)
Corpo a Corpo [Bando] Mordida +26 (2d8+26 mais doença).
Doença Uma criatura mordida por uma turba de infectos é exposta à doença infecção escarlate.
Parasitas Famintos Uma criatura que comece o turno adjacente à turba ou faça um ataque corpo a corpo contra ela é exposta à doença infecção escarlate (Ref CD 24 evita).
For 4, Des 1, Con 3, Int —, Sab 1, Car –3
Tesouro Nenhum.`
        },
        {
          chave: "lefeuVeridak", nome: "Lefeu, veridak", nd: "8", tipo: "Monstro (lefeu) Grande",
          papel: '',
          resumo: "Lefeu, Veridak As criaturas lembram grandes louva-a-deus bípedes, com corpos delgados e dois pares de braços.",
          texto:
`Lefeu, veridak ND 8
“Juro, pelo grande Khalmyr, enfrentar a Tormenta com meu montante enquanto viver.”
— Gale Harvey, paladino de Khalmyr
Lefeu, Veridak As criaturas lembram grandes louva-a-deus bípedes, com corpos delgados e dois pares de braços. Os braços inferiores têm garras poderosas, próprias para agarrar e destroçar, enquanto os membros superiores são equipados com lâminas extremamente afiadas. Seus dois pares de asas batem em velocidade incrível, quase invisíveis. A cabeça diminuta é quase totalmente ocupada por enormes olhos multifacetados. Predadores das montanhas da Tormenta, os veridak (antes chamados kaatar-niray, “lâminas demoníacas”) são batedores que identificam inimigos ao longe e caçadores implacáveis que mergulham do céu. São uma grande vantagem estratégica nas forças lefeu, pois voam melhor que a maior parte das criaturas aéreas em Arton. Sua carapaça é leve, tornando-os mais ágeis. Os veridak costumam agir em bandos pequenos, ou dando apoio a batalhões uktril e geraktril. Podem receber ordens dos geraktril, embora em geral possuam um comandante próprio. Apesar do potencial combativo, os veridak são também empregados em missões de captura, mergulhando e agarrando suas vítimas. Por sua relativa fragilidade física, veridak evitam combate direto, preferindo táticas de guerrilha. Atacam e fogem com voos rasantes, confiando em suas lâminas cortantes para abater suas vítimas. Quando conseguem isolar um adversário, mergulham e tentam agarrá-lo, erguendo-o a uma grande altura para então soltá-lo.
Monstro (lefeu) Grande
Iniciativa +12, Percepção +15, visão no escuro
Defesa 34, Fort +9, Ref +22, Von +15, redução de dano 5
Pontos de Vida 64
Deslocamento 9m (6q), voo 36m (24q)
Corpo a Corpo Duas lâminas +29 (2d6+13 corte, 18/x3) e duas garras +29 (1d6+13).
Agarrar Aprimorado (Livre) Garra (teste +31).
Insanidade da Tormenta 2d6 PM (Von CD 26 evita).
Relâmpago Rubro (Completa) O veridak faz uma investida e ataca com suas duas lâminas e suas duas garras. Os quatro ataques recebem o bônus de +2 da investida, mas devem ser feitos contra o mesmo alvo. O veridak pode continuar se movendo após os ataques, até o limite de seu deslocamento.
For 6, Des 4, Con 3, Int –1, Sab 2, Car –3
Tesouro Nenhum.`
        },
        {
          chave: "lefeuHurobakk", nome: "Lefeu, Hurobakk", nd: "8", tipo: "Monstro (lefeu) Grande",
          papel: '',
          resumo: "O demônio lembra um inseto quadrúpede, com um segundo tronco ereto emergindo do primeiro, de forma similar a um centauro, mas com quatro…",
          texto:
`Lefeu, Hurobakk ND 8
O demônio lembra um inseto quadrúpede, com um segundo tronco ereto emergindo do primeiro, de forma similar a um centauro, mas com quatro braços adicionais e cabeçorra insetoide. Seus braços anteriores têm a forma de imensas garras de lagosta, que parecem capazes de dilacerar aço. Criaturas de poder de combate impressionante, os hurobakk são guerreiros de elite que fornecem suporte e força de ataque devastadora aos batalhões lefeu.
Equivalentes (em linhas gerais) à cavalaria pesada em um exército artoniano, os hurobakk entram em cena quando o inimigo é forte demais para as fileiras normais uktril e geraktril. Sua armadura é uma das mais resistentes entre os lefeu. Em geral são vistos em terrenos de planície, onde são mais eficazes, mas também patrulham as vias de acesso principais às cidades da Tormenta. Embora apenas dois ou três acompanhem cada grupo lefeu, às vezes batalhões inteiros destas criaturas avançam sobre as forças de Arton. Os hurobakk recorrem a táticas de cavalaria: galopam contra o adversário em investidas devastadoras, rompendo as linhas inimigas. Usam seu deslocamento para evitar confrontos corpo a corpo, ao mesmo tempo em que tentam atrair a atenção — pois, com sua armadura pesada, conseguem resistir a golpes melhor que seus companheiros. Curiosamente, os hurobakk costumam obedecer aos geraktril em combate. Sua função é destrutiva; não parecem atuar como comandantes.
Monstro (lefeu) Grande
Iniciativa +16, Percepção +14, visão no escuro
Defesa 35, Fort +21, Ref +16, Von +9, redução de dano 10
Pontos de Vida 380
Deslocamento 15m (10q)
Corpo a Corpo Duas pinças +28 (2d8+13, 19) e duas garras +28 (1d8+13).
Insanidade da Tormenta 2d8 PM (Von CD 28 evita).
Investida Rubra (Completa) O hurobakk faz uma investida e ataca com suas duas pinças. Ele recebe +4d8 nas rolagens de dano com cada pinça e pode continuar se movendo após os ataques, até o limite de seu deslocamento.
Passar por Cima (Completa) O hurobakk percorre até o dobro do seu deslocamento, passando por qualquer criatura Média ou menor. Uma criatura atropelada dessa forma sofre 6d8+30 pontos de dano de impacto e fica caída (Ref CD 28 reduz à metade e evita a condição).
Pinças Destruidoras Uma criatura atingida pela pinça do hurobakk tem sua armadura ou escudo (a sua escolha) avariado. Se não estiver usando armadura ou empunhando um escudo, sofre +2d8 pontos de dano (em ambos os casos, Ref CD 28 evita).
For 8, Des 3, Con 5, Int 1, Sab 2, Car –2
Tesouro Nenhum.`
        },
        {
          chave: "lefeuBurodron", nome: "Lefeu, Burodron", nd: "11", tipo: "Monstro (lefeu) Enorme",
          papel: '',
          resumo: "Sua aparência lembra um enorme gorila, com braços longos e grossos, recobertos de carapaça dura, que terminam em garras poderosas.",
          texto:
`Lefeu, Burodron ND 11
Sua aparência lembra um enorme gorila, com braços longos e grossos, recobertos de carapaça dura, que terminam em garras poderosas. O tronco arqueado e blindado protege a cabeça pequena. Suas pernas são curtas; eles caminham apoiando-se nos braços.
Os grandes e abrutalhados burodron (antes yougey-ahruk, “morte que vem da terra”), ao contrário do que sugere sua aparência rude, são verdadeiros mestres da emboscada. Escavadores vorazes, os burodron cavam longas redes de túneis sob as áreas de Tormenta. Sob o solo, o demônio tenta identificar a vítima mais vulnerável com seu sentido sísmico. Então emerge da terra, valendo-se da surpresa para abater conjuradores antes que consigam lançar qualquer magia. Os burodron são soldados obedientes na hierarquia lefeu. Embora raramente operem em conjunto com outras criaturas, em geral são liderados por um geraktril, que comanda operações a partir de uma cidade ou comunidade de outro tipo.
Monstro (lefeu) Enorme
Iniciativa +9, Percepção +15, percepção às cegas (médio), visão no escuro
Defesa 42, Fort +24, Ref +19, Von +12, redução de dano 10
Pontos de Vida 550
Deslocamento 15m (10q), escalada 15m (10q), escavação 15m (10q)
Corpo a Corpo Duas garras +35 (3d8+23) e mordida +35 (2d8+14).
Dilacerar Se o burodron acerta os dois ataques de garra em uma mesma criatura no mesmo turno, causa mais 8d6+8 pontos de dano.
Insanidade da Tormenta 2d8 PM (Von CD 31 evita).
Morte que Vem da Terra (Completa) O burodron mergulha no solo e emerge violentamente em um ponto em alcance médio. Criaturas adjacentes a ele sofrem 8d8+32 pontos de dano de impacto e ficam caídas (Ref CD 31 reduz à metade e evita a condição).
For 10, Des 0, Con 6, Int –1, Sab 1, Car –3
Perícias Atletismo +19, Furtividade +9 (+19 quando enterrado).
Tesouro Nenhum.`
        },
        {
          chave: "lefeuMorgadrel", nome: "Lefeu, Morgadrel", nd: "13", tipo: "Monstro (lefeu) Enorme",
          papel: '',
          resumo: "Estes monstros lembram imensos caranguejos, com carapaças extremamente grossas e corpos largos como estradas.",
          texto:
`Lefeu, Morgadrel ND 13
Estes monstros lembram imensos caranguejos, com carapaças extremamente grossas e corpos largos como estradas. Têm dez patas e dois pares de enormes pinças afiadas, além de longas antenas, sem olhos aparentes. São totalmente recobertos de espinhos pontiagudos. Entre os primeiros lefeu de aparência não humanoide descobertos, os morgadrel (antes chamados tahab-krar, “caranguejo-demônio-espinhento”) levaram estudiosos da Tormenta a pensar que os invasores tinham alguma ligação com os crustáceos de Arton. São geralmente encontrados nos lagos, rios e mares da Tormenta, onde ocultam-se com facilidade e permanecem imóveis, à espera de vítimas. Devido a essa tática, não costumam agir em conjunto com outros lefeu — mas às vezes participam de emboscadas, quando demônios diferentes afugentam vítimas até onde existe um morgadrel escondido. Um morgadrel inicia o combate concentrando suas garras em um adversário surpreso. Caso não consiga surpreender nenhum alvo, ou se estiverem fora do alcance das garras, ainda assim ele permanecerá imerso para manter sua camuflagem. Usará seu jato ácido ou rajadas de espinhos contra alvos distantes. Ao contrário do que sua aparência animalesca pode sugerir, morgadrel são inteligentes e sábios. Passam longos períodos de solidão, em divagações filosóficas e ponderações sobre as maravilhas do povo lefeu.
Monstro (lefeu) Enorme
Iniciativa +10, Percepção +18, visão no escuro
Defesa 47, Fort +18, Ref +13, Von +26, redução de dano 10
Pontos de Vida 670
Deslocamento 15m (10q), natação 15m (10q)
Corpo a Corpo Duas pinças x2 +40 (4d10+19, 19).
Disparar Espinhos (Padrão) Criaturas em uma esfera de 9m ao redor do morgadrel sofrem 12d8+24 pontos de dano de perfuração e ficam fatigadas por veneno (cumulativo; Ref CD 35 reduz à metade e evita a condição). Recarga (movimento).
Insanidade da Tormenta 2d10 PM (Von CD 35 evita).
Investida Surpresa Quando faz uma investida contra um inimigo surpreendido, o morgadrel pode desferir todos seus ataques de pinça contra essa criatura.
Jato de Ácido (Padrão) Criaturas em uma linha de 15m sofrem 8d12 pontos de dano de ácido e ficam cobertas por muco, sofrendo 3d12 pontos de dano de ácido no início de seus próximos 2 turnos (Ref CD 35 reduz à metade e evita o muco). Recarga (movimento).
For 10, Des 0, Con 7, Int 1, Sab 3, Car –1
Perícias Furtividade +10 (+20 submerso).
Tesouro Nenhum.`
        },
        {
          chave: "lefeuEzzayn", nome: "Lefeu, Ezzayn", nd: "17", tipo: "Monstro (lefeu) Enorme",
          papel: '',
          resumo: "Este tipo de enxame lefeu foi confrontado pela primeira vez durante a campanha que ficaria conhecida como “Coração de Rubi” — quando…",
          texto:
`Lefeu, Ezzayn ND 17
Este tipo de enxame lefeu foi confrontado pela primeira vez durante a campanha que ficaria conhecida como “Coração de Rubi” — quando campeões de Arton, após uma espetacular série de batalhas, conseguiram dissipar a área de Tormenta de Zakharov. Um ezzayn é composto por numerosos lefeu menores, emaranhados em quantidade impossível de estimar — de fato, seus números reais mudam constantemente, desafiando até vidências divinas. Além disso, as criaturas que o compõem não parecem completas ou íntegras; partes segmentadas se misturam freneticamente, cobertas de larvas e vertendo sangue purulento. Além de uktril e geraktril, o enxame também pode conter outras espécies — possivelmente para aumentar sua eficiência em cada missão, ou por razões que a mente racional não compreenderia. Assim, grupos de patrulha contam com apoio aéreo veridak, enquanto tropas de choque são reforçadas por cavalaria hurobakk. Não importa sua composição, um ezzayn está entre os mais perigosos lefeu conhecidos.
Monstro (lefeu) Enorme
Iniciativa +15, Percepção +18, visão no escuro
Defesa 46, Fort +27, Ref +25, Von +16, redução de dano 10
Pontos de Vida 650
Deslocamento 9m (6q)
Corpo a Corpo [Bando] Garra +49 (4d8+29, 19).
Enxame 14d8 pontos de dano de corte.
Anarquia Lacerante (Padrão) O ezzayn faz um ataque de garra como um bando, contra cada criatura adjacente ou em um quadrado ocupado por ele. Ele faz um único teste de ataque e compara o resultado com a Defesa de cada alvo.
Distorção Temporal O ezzayn pode realizar uma ação padrão ou de movimento adicional por turno.
Insanidade da Tormenta 4d6 PM (Von CD 44 evita).
Subjugar (Livre) No fim de cada um de seus turnos, o ezzayn usa a manobra derrubar (teste +54) contra cada criatura em seu espaço. Ele faz um único teste e compara o resultado com o teste de cada criatura na área. Criaturas que perderem o teste de manobra por 5 ou mais ainda sofrem 8d8 pontos de dano de corte.
For 12, Des 5, Con 3, Int 0, Sab 3, Car –3
Tesouro Nenhum.`
        },
        {
          chave: "gatzvalithLordeDaTormenta", nome: "Gatzvalith, Lorde da Tormenta", nd: "S+", tipo: "Monstro (lekael) Grande",
          papel: '',
          resumo: "Neste reino de sangue e bizarria, infestado de monstros deformados, aquele que deve ser o regente parece assustadoramente humano.",
          texto:
`Gatzvalith, Lorde da Tormenta ND S+
“Ouvi sussurros de promessas profanas em minha mente. E, por Khalmyr, parte de mim queria aceitá-las!”
— Gale Harvey, guardião da realidade
Neste reino de sangue e bizarria, infestado de monstros deformados, aquele que deve ser o regente parece assustadoramente humano. Um vulto robusto, em armadura muito pesada — não, não uma armadura, mas uma carapaça aberrante, viva. A cabeça ostenta um elmo fechado, ornamentado com chifres caprinos. Nas mãos, um enorme machado de osso-metal. Sob a máscara, uma face que demonstra astúcia e crueldade além de tudo que mortais — e deuses — conhecem. Os mais poderosos lefeu em Arton são os lekael — ou Lordes da Tormenta. Cada lekael é único e cada um governa um foco da infestação. Igasehra, o gigantesco dragão-demônio-inseto, assemelha-se a outros kaiju que assolam Tamu-ra. Raigheb, terror do Deserto da Perdição, é um enxame formado por infinitos demônios menores. Urazyel, que ronda as Sanguinárias, é uma colossal fortaleza viva. O próprio Aharadak, antes de sua ascensão à divindade, era um Lorde da Tormenta. No entanto, o primeiro lekael revelado foi Gatzvalith, o Lorde de Trebuck. Um senhor da guerra, um tirano comandante de tropas, todo-poderoso em sua fortaleza conquistada. Não uma entidade aberrante de horror incompreensível, mas um verdadeiro inimigo. Ele não destrói cegamente… ele conquista. Gatzvalith age como um estrategista, um apreciador das artes da guerra. Não escolheu um alvo fácil ou desolado: sua área de Tormenta manifestou-se vizinha a Trebuck, na época uma nação do poderoso Reinado. Anunciou sua vinda com uma manifestação modesta, uma pequena Tormenta às portas de um forte militar. Então esperou, paciente. Viu o exército de Trebuck reunido, displicente, e fez seu primeiro movimento. A Tormenta expandiu, engolindo a fortaleza. Como resultado, o maior exército já visto em Arton reuniu-se contra Gatzvalith — apenas para sofrer uma derrota esmagadora. Até hoje, estudiosos e estrategistas tentam imaginar qual teria sido o objetivo do Lorde com a Batalha de Amarid. Medir forças? Observar a atuação dos nativos? Detectar os seres mais poderosos neste mundo? Esta última meta parece ser verdadeira — porque heróis épicos presentes no conflito foram, todos, tentados com promessas de poder. Essa sedução os tem mantido prudentemente afastados: se grandes campeões como Talude, Vectorius ou Lisandra caírem vítimas de sua dominação, será impossível vencê-los.
Monstro (lekael) Grande
Iniciativa +28, Percepção +39, percepção perfeita
Defesa 69, Fort +34, Ref +36, Von +24, cura acelerada 50, imunidade a medo, maior que a morte, redução de dano 25, resistência a magia +10
Pontos de Vida 3.700
Deslocamento 15m (10q), voo 36m (24q)
Corpo a Corpo Rompedor da Realidade x4 +64 (4d12+31, x3, mais 2d8 contra não lefeu).
Carapaça Suprema Gatzvalith sofre apenas metade do dano de fontes mundanas, exceto de aço-rubi.
Estrategista Perfeito Quando faz um ataque, Gatzvalith joga dois dados e usa o melhor resultado. Todos os lefeu em alcance longo também recebem este benefício.
Insanidade da Tormenta 2d20 PM (Von CD 55 evita). Esta habilidade pode afetar mesmo criaturas que já foram afetadas pela Insanidade da Tormenta de outras criaturas neste dia.
Raio da Anticriação (Padrão) Gatzvalith dispara um raio rubro em uma criatura em alcance médio. O alvo sofre 18d12 pontos de dano de essência (Fort CD 55 reduz à metade). Uma criatura reduzida a 0 PV ou menos por esta habilidade morre automaticamente e não pode ser ressuscitada (nem mesmo por Dom da Ressureição).
Reescrever a Realidade (Completa) Uma vez por cena, Gatzvalith pode reorganizar uma parte da realidade em uma esfera de 15m ao seu redor. Efeitos mágicos na área são automaticamente dissipados (como se afetados por Dissipar Magia) e habilidades mundanas com duração maior que instantânea se encerram. Por fim, inimigos na área ficam alquebrados por 1d4 rodadas.
Sedução (Movimento) Uma criatura a até 1km de Gatzvalith perde 1d10 PM, fica pasma por 1 rodada e vulnerável (Von CD 55 evita). Falhas consecutivas na mesma cena se acumulam: na segunda, a criatura perde mais 1d10 PM e fica esmorecida; na terceira, perde 1d10 PM permanentemente e fica atordoada por 1 rodada; na quarta, suas ações físicas nesta rodada ficam sob controle de Gatzvalith (a vítima ainda tem consciência de tudo que acontece à sua volta, podendo ver, ouvir e até falar com certo esforço, mas não o suficiente para lançar magias). Por fim, na quinta falha, a vítima se transforma em uma criatura do tipo monstro (lefeu) e vira um NPC sob controle do mestre.
Varrer (Livre) Uma vez por rodada, quando Gatzvalith faz um ataque corpo a corpo e reduz os pontos de vida do alvo para 0 ou menos, pode realizar um ataque adicional contra outra criatura dentro do seu alcance.
For 18, Des 12, Con 19, Int 15, Sab 8, Car 14
Perícias Conhecimento +36, Diplomacia +35, Enganação +35, Guerra +41, Intimidação +40, Intuição +34, Misticismo +31.
Equipamento Rompedor da Realidade. Tesouro Dobro.`
        },
      ],
      regras: [
        { titulo: "O Poder dos Lefeu",
          texto:
`Todas as criaturas com o subtipo lefeu possuem as habilidades lefeu descritas na seção “A Tormenta” (Tormenta20, p. 315).` },
        { titulo: "Armadilhas Vivas",
          texto:
`“Voltem! Voltem! É tarde demais! Aquele fosso… aquele fosso os DEVOROU!”
— Karoline de Tanna-Toh, humana clériga
Quando você tenta atravessar, um movimento denuncia a ativação de alguma armadilha. Contudo, em vez de um mecanismo manufaturado, o que surge é uma bocarra imensa que ocupa todo o corredor, tentando se fechar sobre você para despedaçá-lo. Quase tudo em uma área de Tormenta está disposto a atacar e matar não lefeu ao alcance. Além de predadores errantes rondando suas áreas selvagens, também existem criaturas fixas prontas para cortar, rasgar, empalar ou dilacerar vítimas incautas. Estes seres lembram plantas carnívoras ou certos invertebrados marinhos, como águas-vivas ou anêmonas. Possuem pouca ou nenhuma mobilidade, atacando apenas vítimas que se aproximam. Em geral não possuem inteligência, agindo apenas por reflexo. Existem em tantas formas e tamanhos que é quase impossível reconhecê-las, sendo praticamente parte da paisagem. Quando falham ao atacar, só podem tentar novamente após alguns minutos. Por todas estas características, recebem o nome de armadilhas vivas. Armadilhas vivas podem existir em áreas selvagens, posicionadas em pontos estratégicos (a entrada de uma caverna, por exemplo), ou no interior de estruturas (em geral disfarçadas como mobília ou partes da arquitetura). Praticamente todos os tipos de armadilhas normais existentes (Tormenta20, p. 317) podem ser encontradas em versões orgânicas grotescas. Por exemplo, guilhotinas são acionadas por músculos, agulhas envenenadas são como presas de serpente e fossos com estacas são gargantas com espinhos. Uma armadilha viva funciona da mesma forma que uma armadilha normal, com as seguintes diferenças:
• +2 na CD dos testes de resistência contra a armadilha (se houver).
• +2 pontos de dano/perda de vida por dado.
• +5 na CD dos testes de Investigação/Ladinagem.
• Reativação automática após 1d6 minutos.
• Nível de Desafio +1.` },
        { titulo: "Exemplos de armadilhas vivas",
          texto:
`Estátua Executora Viva 1d12+12 mais 1d12+12 pontos de dano de corte; dois testes de Reflexos CD 27 (cada teste evita um dos danos); Investigação/Ladinagem CD 25; ND 4.
Gás Venenoso Vivo perde 1d12+2 PV por veneno por rodada durante 2d4 rodadas; Fortitude CD 22 reduz à metade; Investigação/Ladinagem CD 30; ND 4.
Parede Instável Viva 8d6+16 pontos de dano de impacto num quadrado de 3m; Reflexos CD 27 reduz à metade; Investigação/Ladinagem CD 25; ND 5.` },
        { titulo: "Bruxo da Tormenta",
          texto:
`“É o poder de minha linhagem aberrante. A mácula em meu sangue.”
— Francis, lefou bruxo da Tormenta
O estranho em mantos escarlates tem cabelo longo, oleoso e desgrenhado. Nos olhos, um brilho de loucura. A razão de sua insanidade fica óbvia quando ele começa uma conjuração, invocando névoas vermelhas e raios sangrentos, entoando palavras em um idioma que não pertence a este mundo. Muitos arcanistas, solitários ou em grupos como a Academia Arcana, devotam tempo e esforço ao estudo da Tormenta. Alguns, para compreendê-la e combatê-la. Outros, com a intenção de aumentar seus próprios poderes. Todos, contudo, correm grandes riscos ao adquirir esse conhecimento proibido. Podem jamais retornar. Ou podem mudar para sempre. Existem magos da Tormenta heroicos, que aprimoram seus poderes para enfrentar a tempestade. Mas, para cada arcanista bem-sucedido, dez outros acabam corrompidos, perdidos, tomados pela loucura. Abandonam a humanidade, mergulham em teorias desvairadas e experimentos repulsivos. Escondem-se em torres retorcidas, nas áreas de Tormenta ou em outros lugares ermos, onde testam cobaias e produzem monstros. Tornam-se uma nova e terrível face da tempestade. Os mais poderosos entre estes bruxos usam criaturas da Tormenta como guardas e soldados, sobretudo uktril e geraktril. Se esses lefeu são realmente domados, ou apenas fingem submissão enquanto o próprio bruxo serve aos invasores, ninguém sabe dizer.` },
        { titulo: "Infecto",
          texto:
`“Infecto? Isso ai é só um zumbizinho metido a besta. Meu machado dá conta!”
— Thera, humana guerreira caçadora de monstros
Os vultos trôpegos poderiam ser zumbis comuns. Um olhar mais atento revela barrigas inchadas, semitransparentes, onde vocês podem ver massas asquerosas e agitadas formadas por vermes. Seus corpos também são cheios de pústulas, cada uma abrigando um verme. Estes estranhos mortos-vivos são vistos com mais frequência em áreas de Tormenta e regiões vizinhas, mas podem ocorrer em quase qualquer ponto de Arton. Os parasitas que carregam podem contaminar outros seres, transformando-os em novos infectos. Devido a este fato, um infecto é também conhecido como “carregador de demônios”. Até o momento, a origem destes zumbis não foi explicada. A teoria mais aceita diz que são resultado de experimentos necromânticos realizados por bruxos da Tormenta. Também é possível que tenham sido criados pelos Lordes, ou sejam ocorrências sobrenaturais. Infectos tentam transmitir seus parasitas através da mordida, mas seu simples toque também consegue realizar o trabalho — quando o zumbi está em contato com um ser vivo compatível, os parasitas escapam de suas pústulas e tentam penetrar na pele do alvo. Uma vez contaminada, a vítima geralmente adoece e sofre uma morte horrível em poucos dias, transformando-se também em um zumbi infecto.` },
        { titulo: "Ezzayn Especiais",
          texto:
`Um ezzayn pode conter lefeu de outros tipos, entre veridak, hurobakk e burodron. Ele recebe certos bônus e uma habilidade extra, conforme o tipo de lefeu em sua formação. Para efeitos de recompensas, um ezzayn especial tem ND 18.
Batalhão Burodron
• Ajustes +5 em testes de ataque e rolagens de dano com garras.
• Emboscada Subterrânea (Completa) O batalhão escava um túnel até uma criatura em alcance curto, abre um fosso sob os pés dela e tenta puxá-la com uma manobra agarrar (teste +54). Se vencer, a vítima é puxada 3m para baixo da terra, sofre 4d8+23 pontos de dano de corte e fica agarrada. A cada rodada, o alvo pode tentar se livrar do batalhão e sair do fosso gastando uma ação padrão e fazendo um teste de Atletismo (CD 44). Se falhar, sofre o dano novamente no turno do batalhão.
Cavalaria Hurobakk
• Ajustes +100 PV, +5 em Fortitude.
• Carga Terrível (Padrão) Criaturas em um quadrado de 6m à frente da cavalaria sofrem 4d10+19 pontos de dano de impacto e ficam caídas (Fort CD 44 reduz à metade e evita a condição). Se a vítima falhar por 5 ou mais, sua armadura é avariada ou, se não estiver usando armadura, ela sofre +2d8 pontos de dano.
Esquadrão Veridak
• Ajustes +5 em Iniciativa e Reflexos, deslocamento de voo 18m (12q).
• Ataque Rasante (Padrão) Criaturas em um quadrado de 6m à frente do esquadrão sofrem 4d6+31 pontos de dano de corte (Ref CD 44 reduz à metade). Uma criatura que falhe nesse teste deve fazer um teste da manobra agarrar (CD 44). Se a vítima falhar, é erguida pelo esquadrão e largada de uma altura de 12m.` },
        { titulo: "Habilidades Lekael",
          texto:
`Lekael são lefeu e, além das habilidades comuns dessas criaturas, possuem as seguintes.
• Coração da Tormenta Um lekael só pode ser verdadeiramente destruído se o coração de sua área de Tormenta também for. Caso não seja, ele retorna à vida em uma semana.
• Domínio Sobre o Tempo Um lekael pode fazer duas ações padrão e duas ações de movimento a cada turno.
• Invocar Lefeu (Completa) Uma vez por cena, o lekael invoca um ou mais lefeu a sua escolha, cujo ND total somado seja igual ao seu. Eles surgem em alcance curto e agem a partir da próxima rodada, em suas iniciativas.
• Percepção Perfeita Um lekael está sempre sob efeito de Visão da Verdade, com todos os aprimoramentos.
• Poder sobre a Realidade Um lekael pode lançar qualquer magia simulada (veja p. 376) de até 4º círculo como um conjurador de 20º nível (CD 55, limite de PM 20) sem gastar PM.
• Telepatia O lekael pode se comunicar com qualquer criatura inteligente (Int –3 ou mais) dentro de sua área de Tormenta ou a 1km de distância fora dela. Além disso, é imune a efeitos mentais.` },
      ],
    },

    // ── 🪓 BRUTOS & INDOMÁVEIS ─────────────────────────
    {
      chave: "brutos", nome: "Brutos & Indomáveis", icone: "🪓", cor: "#8a5a1f",
      intro: "Arton é um mundo de muitos povos — seres inteligentes que vivem em sociedade. Nenhum desses povos é maligno por natureza. Praticar o bem ou o mal são escolhas pessoais, não inatas. Ainda assim, existem povos perigosos que assolam Arton — seres humanoides ou monstruosos de cultura agressiva, sociedades baseadas em saquear, pilhar, guerrear e matar. Enquanto alguns apenas desconhecem outro modo de vida, outros cultuam divindades de violência e selvageria (sobretudo Megalokk) ou são guiados por líderes, entidades ou poderes malignos. Não aceitam convivência pacífica ou cooperação mútua com aqueles que são diferentes; para eles, todos os outros seres no mundo são inimigos. Ou ainda, podem simplesmente ter costumes ou pontos de vista que os colocam em antagonismo com os heróis. Estes povos estão em conflito constante com os humanos e outras raças, desde escaramuças ocasionais até grandes batalhas. Desbaratar bandos que rondam rotas comerciais ou ameaçam povoados remotos é trabalho comum para aventureiros. Mas nem sempre precisa ser o caso; embora seja um comportamento comum, nem todos os povos guerreiros atacam e matam à primeira vista, nem todas as suas comunidades abraçam a violência como única forma de relação com outros. Quando o temor pelo diferente é vencido, existe chance para acordo, cooperação. Grupos de heróis podem receber missões não apenas para derrotar estes seres, mas para atuar como diplomatas; fazer contatos, pactos, alianças. Vitória muito maior que dizimar uma cultura vizinha. Ainda, membros de qualquer dos povos a seguir podem também se tornar aventureiros. Qualquer ser inteligente pode escolher rejeitar um modo de vida hostil e seguir o caminho dos heróis. Estes muitas vezes se tornam párias em suas sociedades (ou, algum dia, exemplos a serem seguidos). Também não há qualquer restrição quanto à carreira que podem escolher; mesmo um ogro ou orc supostamente “bruto” pode surpreender o mundo como um brilhante arcanista ou inventor.",
      comuns: { titulo: "Habilidades de Trogs", aplicaSe: "(trog)", nota: "Só as cinco fichas de trog — Mau Cheiro e Sangue Frio já estão contabilizados nelas." },
      fichas: [
        {
          chave: "meioOrcBandoleiro", nome: "Meio-Orc Bandoleiro", nd: "1", tipo: "Humanoide (meio-orc) Médio",
          papel: '',
          subgrupo: "Meio-Orc",
          resumo: "Meio-Orc — O forasteiro poderia ser descrito apenas como um “humano grande e feroz”, mas é algo mais.",
          texto:
`Meio-Orc Bandoleiro ND 1
Humanoide (meio-orc) Médio
Iniciativa +5, Percepção +1 (+3 em subterrâneo), visão no escuro
Defesa 15, Fort +10, Ref +5, Von +1
Pontos de Vida 15
Deslocamento 9m (6q)
Corpo a Corpo Espada curta +11 (1d6+13, 19).
À Distância Adaga +9 (1d4+7, 19).
Ataque Furtivo +2d6.
For 3, Des 1, Con 2, Int 0, Sab –1, Car –1
Equipamento Adaga x2, armadura de couro, espada curta.
Tesouro Metade.`
        },
        {
          chave: "meioOrcCapanga", nome: "Meio-Orc Capanga", nd: "1", tipo: "Humanoide (meio-orc) Médio",
          papel: '',
          subgrupo: "Meio-Orc",
          resumo: "Meio-Orc — O forasteiro poderia ser descrito apenas como um “humano grande e feroz”, mas é algo mais.",
          texto:
`Meio-Orc Capanga ND 1
Humanoide (meio-orc) Médio
Iniciativa +6, Percepção +3 (+5 em subterrâneo), visão no escuro
Defesa 16, Fort +11, Ref +4, Von +2
Pontos de Vida 12
Deslocamento 9m (6q)
Corpo a Corpo Maça +11 (1d8+12).
Ímpeto Agressor O meio-orc capanga recebe +1d10 na rolagem de dano de seu primeiro ataque na cena.
For 3, Des 1, Con 2, Int 0, Sab –1, Car –1
Equipamento Couro batido, maça. Tesouro Metade.`
        },
        {
          chave: "meioOrcChefe", nome: "Meio-Orc Chefe", nd: "5", tipo: "Humanoide (meio-orc) Médio",
          papel: '',
          subgrupo: "Meio-Orc",
          resumo: "Meio-Orc — O forasteiro poderia ser descrito apenas como um “humano grande e feroz”, mas é algo mais.",
          texto:
`Meio-Orc Chefe ND 5
Humanoide (meio-orc) Médio
Iniciativa +6, Percepção +4 (+6 em subterrâneo), visão no escuro
Defesa 24, Fort +17, Ref +11, Von +6
Pontos de Vida 190
Deslocamento 9m (6q)
Corpo a Corpo Machado de batalha +18 (2d8+30, x3).
Ataque Furtivo +3d6.
Ordens (Movimento) O meio-orc chefe grita ordens para seus aliados em alcance médio. Eles recebem +2 em testes de perícia até o fim da cena.
Urro Selvagem (Movimento) O chefe recebe +2 em testes de ataque e rolagens de dano corpo a corpo até o fim da cena, mas não pode fazer nenhuma ação que exige calma e concentração.
For 5, Des 2, Con 4, Int 1, Sab 0, Car –1
Perícias Intimidação +7, Sobrevivência +6 (+8 em subterrâneo).
Equipamento Gibão de peles, machado de batalha.
Tesouro Padrão.`
        },
        {
          chave: "orcCombatente", nome: "Orc Combatente", nd: "1/2", tipo: "Humanoide (orc) Médio",
          papel: '',
          subgrupo: "Orc",
          resumo: "Orc — O bando é formado por humanoides musculosos, com pele verde-acinzentada, focinho suíno e presas inferiores que se projetam fora da boca.",
          texto:
`Orc Combatente ND 1/2
Humanoide (orc) Médio
Iniciativa +4, Percepção +1 (+3 em subterrâneo), sensibilidade a luz, visão no escuro
Defesa 14, Fort +5, Ref +3, Von +0
Pontos de Vida 8
Deslocamento 9m (6q)
Corpo a Corpo Maça +9 (1d8+7).
For 4, Des 1, Con 2, Int –1, Sab –1, Car –1
Equipamento Couro batido, maça. Tesouro Metade.`
        },
        {
          chave: "orcVeterano", nome: "Orc Veterano", nd: "1", tipo: "Humanoide (orc) Médio",
          papel: '',
          subgrupo: "Orc",
          resumo: "Orc — O bando é formado por humanoides musculosos, com pele verde-acinzentada, focinho suíno e presas inferiores que se projetam fora da boca.",
          texto:
`Orc Veterano ND 1
Humanoide (orc) Médio
Iniciativa +4, Percepção +1 (+3 em subterrâneo), sensibilidade a luz, visão no escuro
Defesa 16, Fort +10, Ref +5, Von +1
Pontos de Vida 14
Deslocamento 9m (6q)
Corpo a Corpo Marreta +11 (3d4+9).
For 4, Des 1, Con 3, Int –1, Sab –1, Car –1
Equipamento Couro batido, marreta. Tesouro Metade.`
        },
        {
          chave: "orcChefe", nome: "Orc chefe", nd: "2", tipo: "Humanoide (orc) Médio",
          papel: '',
          subgrupo: "Orc",
          resumo: "Orc — O bando é formado por humanoides musculosos, com pele verde-acinzentada, focinho suíno e presas inferiores que se projetam fora da boca.",
          texto:
`Orc chefe ND 2
Humanoide (orc) Médio
Iniciativa +5, Percepção +3 (+5 em subterrâneo), sensibilidade a luz, visão no escuro
Defesa 19, Fort +13, Ref +7, Von +2
Pontos de Vida 66
Deslocamento 9m (6q)
Corpo a Corpo Machado de batalha +11 (1d8+12, x3).
Urro Selvagem (Movimento) O orc chefe recebe +2 em testes de ataque e rolagens de dano corpo a corpo até o fim da cena, mas não pode fazer nenhuma ação que exija calma e concentração.
For 5, Des 2, Con 4, Int 0, Sab 0, Car 0
Perícias Intimidação +4, Sobrevivência +5 (+7 em subterrâneo).
Equipamento Gibão de peles, machado de batalha. Tesouro Padrão.`
        },
        {
          chave: "orcRei", nome: "Orc Rei", nd: "5", tipo: "Humanoide (orc) Médio",
          papel: '',
          subgrupo: "Orc",
          resumo: "Orc — O bando é formado por humanoides musculosos, com pele verde-acinzentada, focinho suíno e presas inferiores que se projetam fora da boca.",
          texto:
`Orc Rei ND 5
Humanoide (orc) Médio
Iniciativa +7, Percepção +4 (+6 em subterrâneo), sensibilidade a luz, visão no escuro
Defesa 25, Fort +15, Ref +11, Von +7, imunidade a atordoado e cansaço
Pontos de Vida 210
Deslocamento 9m (6q)
Corpo a Corpo Lança +18 x2 (2d8+12, x3).
Aura de Fúria Outros orcs sob comando do orc rei em um raio de 30m recebem +2 na Defesa, em testes de perícia e em rolagens de dano.
Estocada Atroz Uma criatura atingida por um ataque de lança do rei fica sangrando (Fort CD 20 evita).
For 5, Des 1, Con 4, Int 0, Sab 0, Car 1
Equipamento Couro batido, escudo pesado, lança. Tesouro Dobro.`
        },
        {
          chave: "orcMutante", nome: "Orc Mutante", nd: "5", tipo: "Humanoide (orc) Médio",
          papel: '',
          subgrupo: "Orc Mutante",
          resumo: "Orc Mutante — APENAS ORCS!” Em meio à horda monstruosa, algo ainda mais monstruoso emerge.",
          texto:
`Orc Mutante ND 5
Humanoide (orc) Médio
Iniciativa +8, Percepção +5 (+7 em subterrâneo), sensibilidade a luz, visão no escuro
Defesa 22, Fort +15, Ref +11, Von +7
Pontos de Vida 55
Deslocamento 9m (6q)
Corpo a Corpo Machado de guerra +20 (1d12+18, x3) e mordida +20 (1d6+18).
Terceiro Braço (Livre) Se o orc mutante acerta o ataque de machado de guerra e o ataque de mordida em uma mesma criatura na mesma rodada, ele rasga a vítima com seu terceiro braço degenerado, causando mais 1d6+9 pontos de dano de corte.
For 6, Des 2, Con 4, Int –2, Sab –2, Car –2
Equipamento Machado de guerra. Tesouro Padrão.`
        },
        {
          chave: "orcMutanteSuperior", nome: "Orc Mutante Superior", nd: "10", tipo: "Humanoide (orc) Médio",
          papel: '',
          subgrupo: "Orc Mutante",
          resumo: "Orc Mutante — APENAS ORCS!” Em meio à horda monstruosa, algo ainda mais monstruoso emerge.",
          texto:
`Orc Mutante Superior ND 10
Humanoide (orc) Médio
Iniciativa +9, Percepção +8 (+10 em subterrâneo), sensibilidade a luz, visão no escuro
Defesa 34, Fort +22, Ref +15, Von +9
Pontos de Vida 372
Deslocamento 9m (6q)
Corpo a Corpo Tacape +29 (1d12+18), pancada +27 (1d8+18) e mordida +27 (1d6+18).
Mutações Cada orc mutante superior possui três mutações, escolhidas entre as seguintes.
• Cabeça Adicional. Quando faz um teste de Percepção ou Vontade, o orc rola dois dados e usa o melhor resultado.
• Braço Direito Extra (Livre). Se o orc acerta um ataque de pancada, pode usar a manobra agarrar (teste +29).
• Braço Esquerdo Extra (Livre). Se o orc acerta o ataque de tacape e o ataque de mordida em uma mesma criatura na mesma rodada, ele rasga a vítima com seu terceiro braço degenerado, causando 1d8+12 pontos de dano de corte.
• Braços Longos. O alcance natural do orc aumenta em 3m.
• Mutação Constante. O orc recebe cura acelerada 10.
• Pernas Fortes. O deslocamento do orc aumenta em +6m e ele ignora terreno difícil.
• Uivo de Melancolia (Completa). O orc emite um uivo de sofrimento que deixa todas as criaturas em alcance curto alquebradas (Von 26 evita).
For 9, Des 2, Con 4, Int –2, Sab 0, Car –3
Perícias Atletismo +20, Intimidação +8.
Equipamento Tacape macabro. Tesouro Padrão.`
        },
        {
          chave: "orcXama", nome: "Orc Xamã", nd: "7", tipo: "Humanoide (orc) Médio",
          papel: '',
          resumo: "Embora todos os orcs sejam parecidos, um deles destoa dos demais.",
          texto:
`Orc Xamã ND 7
“Aquele ali parece estar… conjurando cura mágica? Não, isso é impossível!”
— Maethilda Avanya, elfa clériga de Tenebra
Embora todos os orcs sejam parecidos, um deles destoa dos demais. Usa mais adereços, traz pinturas corporais que poderiam ser símbolos sagrados. Então o que parecia impossível acontece: a criatura começa a gesticular e articular uma conjuração. Orcs têm mais medo e ódio do que respeito pelos deuses. Diante de qualquer manifestação divina, tratam logo de tentar matar o responsável. Um orc devoto que demonstre algum poder divino em geral tenta manter isso em segredo, ou acaba morto muito cedo. Às vezes, contudo, um orc escolhido para brandir poderes de uma divindade consegue prosperar, conquistar o respeito (ou temor) de seus iguais. Esses raros xamãs passam a atuar como conselheiros para os chefes — ou tornam-se chefes eles próprios, usando a aversão dos orcs pelos deuses para se manter no comando. Não raras vezes, ordenam que os orcs capturem vítimas para sacrifícios, com a intenção de agradar aos deuses (ou apenas satisfazer seu próprio prazer cruel). Em batalha, o orc xamã é mais violento que outros clérigos, preferindo conjurar magias agressivas contra os inimigos em vez de curar os aliados.
Humanoide (orc) Médio
Iniciativa +4, Percepção +13 (+15 em subterrâneo), sensibilidade a luz, visão no escuro
Defesa 29, Fort +14, Ref +7, Von +20, resistência a veneno +5
Pontos de Vida 196
Deslocamento 9m (6q)
Pontos de Mana 41
Corpo a Corpo Adaga x2 +29 (2d4+20, 19).
Urro Divino (Livre, 1 PM) Quando faz um ataque ou lança uma magia, o orc xamã soma sua Constituição à rolagem de dano desse ataque ou magia.
Magias Como um clérigo de Megalokk de 7º nível (CD 26).
• Arma Espiritual (Padrão, 5 PM sustentada). Uma vez por rodada, como uma ação livre, o xamã causa 3d6 pontos de dano de impacto automaticamente a uma criatura adjacente. Se não fizer isso e sofrer um ataque corpo a corpo nesta rodada, ele pode usar uma reação para causar este dano ao atacante.
• Despedaçar (Padrão, 7 PM). Um alvo em alcance curto sofre 4d8+8 pontos de dano de impacto se for uma criatura, ou o dobro disso sem aplicar RD se for um construto ou um objeto mundano Pequeno, e fica atordoado (Fort reduz à metade e evita a condição). Uma criatura só pode ficar atordoada por esta magia uma vez por cena.
• Físico Divino (Padrão, 3 PM). Uma criatura adjacente recebe +2 em Força, Destreza ou Constituição até o fim da cena. Esse aumento não fornece PV ou PM adicionais.
• Soco de Arsenal (Padrão, 7 PM). Uma criatura em alcance médio sofre 6d6+3 pontos de dano de impacto e é empurrada 3m na direção oposta ao xamã (Fort reduz à metade e evita o empurrão).
For 3, Des 1, Con 2, Int –1, Sab 6, Car –1
Perícias Intimidação +9, Religião +13.
Equipamento Adaga, ossos de monstro x1d4, símbolo sagrado de Megalokk. Tesouro Padrão.`
        },
        {
          chave: "sapoAtroz", nome: "Sapo Atroz", nd: "2", tipo: "Monstro Grande",
          papel: '',
          resumo: "Apenas os grandes olhos são visíveis na superfície da lama.",
          texto:
`Sapo Atroz ND 2
“Ele destruiu meu vestido novo! Will, traga minha espada, vou fazer essa coisa pagar!”
— Kiara Al’Hohein, qareen nobre
Apenas os grandes olhos são visíveis na superfície da lama. No entanto, quando o monstro emerge, revela um corpanzil rugoso que poderia rivalizar com um hipopótamo. Estes sapos gigantes têm origem misteriosa. Alguns dizem que eles surgem em locais contaminados por resíduos arcanos, enquanto outros afirmam ser recompensas do Grande Deus Sapo para seus devotos tabrachi. Talvez ambas as teorias estejam corretas. Em estado selvagem, o sapo atroz faz tocaias em pântanos à espera de presas — ataca animais e humanoides sem distinção. Sua tática padrão é ficar imerso na água ou lama, deixando apenas os olhos expostos, o que torna difícil percebê-lo até ser tarde demais. Quando uma criatura Média ou menor fica ao alcance, ele dispara a língua envenenada, tentando paralisar a vítima e trazê-la para a água. Se sofrer qualquer dano, o sapo tentará submergir e fugir.
Monstro Grande
Iniciativa +6, Percepção +3, visão na penumbra
Defesa 16, Fort +15, Ref +7, Von +0
Pontos de Vida 95
Deslocamento 12m (8q), natação 9m (6q)
Corpo a Corpo Língua +12 (1d6+6 impacto mais veneno, alcance 3m).
Agarrar Aprimorado (Livre) Língua (teste +16).
Boca de Sapo (Livre) No início de cada um de seus turnos, o sapo atroz causa 2d6+8 pontos de dano de impacto, mais veneno, na criatura que estiver agarrando com sua língua.
Salto Esmagador (Padrão) O sapo pula e cai sobre um oponente menor que ele em alcance curto. O alvo fica caído e sofre 2d6+12 pontos de dano de impacto (Ref CD 17 reduz à metade e evita a condição).
Veneno Perde 1d12 PV e fica paralisado por 1 rodada, Fort CD 18 evita a paralisia e reduz a perda de vida para 1d6.
For 6, Des 1, Con 3, Int –4, Sab 1, Car –2
Perícias Atletismo +10 (+20 para saltar), Furtividade +7.
Tesouro 1d4 doses de veneno batráquio (CD 17 para extrair) e pedaço de língua (CD 17 para extrair).
Parceiro O sapo atroz é um parceiro montaria (Grande) que fornece os benefícios a seguir. Iniciante: seu deslocamento muda para 9m (normal e de natação) e você recebe uma ação de movimento extra por turno (apenas para se deslocar) e +5 em testes de Atletismo para saltar. Veterano: você recebe +2 em testes para derrubar e desarmar. Mestre: muda o bônus de Atletismo para +10 e, uma vez por rodada, você pode gastar 1 PM para fazer uma manobra desarmar ou derrubar contra um alvo a até 3m.`
        },
        {
          chave: "tabrachiSoldado", nome: "Tabrachi Soldado", nd: "1", tipo: "Humanoide (tabrachi) Médio",
          papel: '',
          subgrupo: "Tabrachi",
          resumo: "Tabrachi — Embora humanoide, a criatura tem o aspecto de um grande sapo.",
          texto:
`Tabrachi Soldado ND 1
Humanoide (tabrachi) Médio
Iniciativa +5, Percepção +2, visão na penumbra
Defesa 16, Fort +5, Ref +10, Von +1
Pontos de Vida 12
Deslocamento 9m (6q), natação 9m (6q)
Corpo a Corpo Lança +11 (1d6+5) e língua +11 (1d4+5 impacto, alcance 3m).
À Distância Azagaia +7 (1d6+5).
Linguarudo O tabrachi soldado recebe +2 em testes para desarmar ou derrubar com a língua.
For 2, Des 2, Con 3, Int –1, Sab –1, Car –2
Perícias Atletismo +8 (+18 para saltar), Furtividade +4.
Equipamento Azagaia x2, couro batido, escudo leve, lança.
Tesouro Nenhum.`
        },
        {
          chave: "tabrachiCampeao", nome: "Tabrachi Campeão", nd: "3", tipo: "Humanoide (tabrachi) Médio",
          papel: '',
          subgrupo: "Tabrachi",
          resumo: "Tabrachi — Embora humanoide, a criatura tem o aspecto de um grande sapo.",
          texto:
`Tabrachi Campeão ND 3
Humanoide (tabrachi) Médio
Iniciativa +7, Percepção +4, visão na penumbra
Defesa 21, Fort +9, Ref +15, Von +3
Pontos de Vida 105
Deslocamento 9m (6q), natação 9m (6q)
Corpo a Corpo Lança +14 (1d6+3 mais veneno) e língua +14 (1d4+3 impacto mais veneno, alcance 3m).
À Distância Azagaia +11 (1d6+3 mais veneno).
Linguarudo O tabrachi campeão recebe +2 em testes para desarmar ou derrubar com a língua.
Veneno Peçonha comum (perde 1d12 PV, Fort CD 16 evita).
For 3, Des 2, Con 4, Int –1, Sab –1, Car –2
Perícias Atletismo +13 (+23 para saltar), Cavalgar +5, Furtividade +6.
Equipamento Azagaia x2, escudo pesado, gibão de peles, lança, 1d4 doses de peçonha comum. Tesouro Padrão.`
        },
        {
          chave: "trogCombatente", nome: "Trog Combatente", nd: "1", tipo: "Monstro (trog) Médio",
          papel: '',
          subgrupo: "Trog",
          resumo: "Trog — O humanoide reptiliano é coberto de escamas verdes, com cabeça de lagarto e uma crista que começa na testa e continua até a base do pescoço.",
          texto:
`Trog Combatente ND 1
Monstro (trog) Médio
Iniciativa +3, Percepção +0, visão no escuro
Defesa 16, Fort +10, Ref +5, Von +1
Pontos de Vida 11
Deslocamento 9m (6q)
Corpo a Corpo Lança +11 (1d6+5) e mordida +11 (1d6+5).
À Distância Azagaia +9 (1d6+5).
Mau Cheiro (Padrão) Fortitude CD 15 evita.
For 3, Des 1, Con 3, Int –2, Sab 0, Car –1
Perícias Furtividade +7.
Equipamento Azagaias x2, lança.
Tesouro Metade.`
        },
        {
          chave: "trogCacador", nome: "Trog Caçador", nd: "2", tipo: "Monstro (trog) Médio",
          papel: '',
          subgrupo: "Trog",
          resumo: "Trog — O humanoide reptiliano é coberto de escamas verdes, com cabeça de lagarto e uma crista que começa na testa e continua até a base do pescoço.",
          texto:
`Trog Caçador ND 2
Monstro (trog) Médio
Iniciativa +6, Percepção +5, visão no escuro
Defesa 18, Fort +7, Ref +12, Von +3
Pontos de Vida 14
Deslocamento 9m (6q)
Corpo a Corpo Mordida +11 (1d6+7).
À Distância Arco longo +14 (1d8+12, x3).
Marca da Presa (Movimento) O trog caçador analisa uma criatura em alcance curto. Até o fim da cena, ele recebe +1d8 em rolagens de dano contra essa criatura.
Mau Cheiro (Padrão) Fortitude CD 16 evita.
For 2, Des 3, Con 3, Int –1, Sab 2, Car –1
Perícias Furtividade +13, Sobrevivência +7.
Equipamento Arco longo, flechas x20. Tesouro Metade.`
        },
        {
          chave: "trogReiDosTuneis", nome: "Trog Rei dos Túneis", nd: "5", tipo: "Monstro (trog) Grande",
          papel: '',
          subgrupo: "Trog",
          resumo: "Trog — O humanoide reptiliano é coberto de escamas verdes, com cabeça de lagarto e uma crista que começa na testa e continua até a base do pescoço.",
          texto:
`Trog Rei dos Túneis ND 5
Monstro (trog) Grande
Iniciativa +5, Percepção +4, visão no escuro
Defesa 25, Fort +17, Ref +11, Von +4
Pontos de Vida 226
Deslocamento 9m (6q), escavação 6m (4q)
Corpo a Corpo Duas garras +17 (1d8+6) e mordida +17 (1d8+6).
Dilacerar Se o trog rei dos túneis acerta os dois ataques de garra em uma mesma criatura no mesmo turno, causa mais 2d8+6 pontos de dano.
Gosto por Tripas O rei recebe +2 em rolagens de dano contra criaturas em que já tenha causado dano nesta cena.
Mau Cheiro (Padrão) Fortitude CD 20 evita.
Terror dos Túneis Uma criatura que comece seu turno em alcance curto do rei dos túneis fica apavorada por 1 rodada e então abalada (Von CD 20 muda para abalada por 1 rodada e a criatura não pode mais ser afetada por esta habilidade até o fim da cena).
For 5, Des 1, Con 5, Int –2, Sab 0, Car –1
Perícias Furtividade +7, Intimidação +7.
Tesouro Metade.`
        },
        {
          chave: "trogAnaoBruto", nome: "Trog Anão Bruto", nd: "1", tipo: "Monstro (trog) Médio",
          papel: '',
          subgrupo: "Trog",
          resumo: "Trog — O humanoide reptiliano é coberto de escamas verdes, com cabeça de lagarto e uma crista que começa na testa e continua até a base do pescoço.",
          texto:
`Trog Anão Bruto ND 1
Monstro (trog) Médio
Iniciativa +1, Percepção +5, visão no escuro
Defesa 19, Fort +11, Ref +0, Von +5
Pontos de Vida 35
Deslocamento 6m (4q)
Corpo a Corpo Machado de guerra +9 (1d12+3, x3) e mordida +9 (1d6+3).
Mau Cheiro (Padrão) Fortitude CD 14 evita.
Sobrevivente Quando faz um teste de resistência, o trog anão bruto rola dois dados e usa o melhor resultado.
For 3, Des 0, Con 4, Int –2, Sab 0, Car –1
Perícias Sobrevivência +7.
Equipamento Loriga segmentada, machado de guerra. Tesouro Metade.`
        },
        {
          chave: "trogAnaoEremita", nome: "Trog Anão Eremita", nd: "8", tipo: "Monstro (trog) Médio",
          papel: '',
          subgrupo: "Trog",
          resumo: "Trog — O humanoide reptiliano é coberto de escamas verdes, com cabeça de lagarto e uma crista que começa na testa e continua até a base do pescoço.",
          texto:
`Trog Anão Eremita ND 8
Monstro (trog) Médio
Iniciativa +7, Percepção +18, visão no escuro
Defesa 33, Fort +22, Ref +6, Von +16
Pontos de Vida 330
Deslocamento 6m (4q)
Corpo a Corpo Machado de guerra +26 (3d6+20, x3) e mordida +26 (2d6+18).
Armadura Fúngica (Reação) Quando o trog anão eremita sofre dano, todas as criaturas adjacentes perdem 2d12 pontos de vida. Veneno.
Gosto por Tripas O trog recebe +2 em rolagens de dano contra criaturas em que já tenha causado dano na cena.
Mau Cheiro (Padrão) Fortitude CD 26 evita.
Sobrevivente Quando faz um teste de resistência, o trog rola dois dados e usa o melhor resultado.
For 7, Des –1, Con 6, Int 0, Sab 2, Car –2
Perícias Sobrevivência +20.
Equipamento Machado de guerra atroz. Tesouro Metade.`
        },
        {
          chave: "ogro", nome: "Ogro", nd: "4", tipo: "Humanoide (gigante) Grande",
          papel: '',
          subgrupo: "Ogro",
          resumo: "Ogro — Quando ouvia que algo é “grande como um ogro”, talvez você não soubesse o significado exato da comparação — mas agora sabe.",
          texto:
`Ogro ND 4
Humanoide (gigante) Grande
Iniciativa +3, Percepção +1, visão na penumbra
Defesa 23, Fort +16, Ref +10, Von +0
Pontos de Vida 130
Deslocamento 9m (6q)
Corpo a Corpo Tacape +16 (1d12+18).
Burro Demais… O ogro sofre –5 em testes de Intuição e Vontade (já contabilizados).
…Para Morrer! Todo o dano de corte, impacto e perfuração que o ogro sofre é reduzido à metade.
For 7, Des 0, Con 4, Int –3, Sab –2, Car –2
Perícias Atletismo +12, Intuição –5.
Equipamento Tacape aumentado. Tesouro Padrão.`
        },
        {
          chave: "ogroCacador", nome: "Ogro Caçador", nd: "7", tipo: "Humanoide (gigante) Grande",
          papel: '',
          subgrupo: "Ogro",
          resumo: "Ogro — Quando ouvia que algo é “grande como um ogro”, talvez você não soubesse o significado exato da comparação — mas agora sabe.",
          texto:
`Ogro Caçador ND 7
Humanoide (gigante) Grande
Iniciativa +7, Percepção +2, visão na penumbra
Defesa 29, Fort +20, Ref +14, Von +4
Pontos de Vida 265
Deslocamento 9m (6q)
Corpo a Corpo Tacape x2 +24 (3d6+21).
Grande Demais… Todo dano de corte, impacto e perfuração que o ogro caçador sofre é reduzido à metade e ele pode se deslocar normalmente ao agarrar (e arrastar) um alvo.
…Para se Importar! O ogro sofre –5 em Intuição e Vontade (já contabilizados). Porém, efeitos negativos não permanentes que ele sofra que durem mais que 2 rodadas têm a duração reduzida para 2 rodadas.
For 9, Des 0, Con 5, Int –3, Sab –1, Car –2
Perícias Atletismo +16, Intuição –3.
Equipamento Tacape aumentado. Tesouro Metade.`
        },
        {
          chave: "ogroCapanga", nome: "Ogro Capanga", nd: "11", tipo: "Humanoide (gigante) Grande",
          papel: '',
          subgrupo: "Ogro",
          resumo: "Ogro — Quando ouvia que algo é “grande como um ogro”, talvez você não soubesse o significado exato da comparação — mas agora sabe.",
          texto:
`Ogro Capanga ND 11
Humanoide (gigante) Grande
Iniciativa +9, Percepção +4, visão na penumbra
Defesa 36, Fort +23, Ref +18, Von +8, imunidade a enfeitiçado
Pontos de Vida 111
Deslocamento 9m (6q)
Corpo a Corpo Marreta x2 +36 (3d6+49).
Cruel Demais… Cada ataque de marreta do ogro capanga atinge todas as criaturas ao seu redor. Para cada ataque, ele faz um único teste e compara seu resultado com a Defesa de cada criatura em seu alcance.
…Para Sentir! O ogro sofre –5 em Intuição e Vontade (já contabilizados). Porém, efeitos negativos não permanentes que ele sofra que durem mais que 2 rodadas têm a duração reduzida para 2 rodadas e as penalidades numéricas de quaisquer condições que ele sofra são reduzidas à metade.
For 11, Des 0, Con 6, Int –3, Sab –1, Car –2
Perícias Atletismo +20, Intuição +4.
Equipamento Marreta aumentada cruel. Tesouro Metade.`
        },
      ],
      regras: [
        { titulo: "Meio-Orc",
          texto:
`“Acha que essa cara feia me assusta? Venha, tenho trabalho para você na minha estalagem.”
— Ned Kallrogan, ex-aventureiro
O forasteiro poderia ser descrito apenas como um “humano grande e feroz”, mas é algo mais. A pele possui tom cinza-esverdeado, os caninos inferiores são maiores, as orelhas e o nariz também parecem grandes demais para o resto da face. Meios-orcs não unem, necessariamente, o melhor das duas raças. São mais inteligentes e determinados que orcs, mas não tanto quanto humanos. São mais fortes que humanos, mas não se equiparam a orcs. Sua aparência pode causar repulsa entre humanos e entre orcs. Sua própria existência muitas vezes é rejeitada, pois a maior parte das duas raças não acredita que seus membros podem conviver em paz, respeito e até amor.
No Reinado, meios-orcs se isolam nos ermos ou vivem em comunidades populosas, onde são apenas “mais um na multidão”. Vários detestam suas linhagens, revoltam-se quando lembrados de que são apenas “metade” de alguma coisa. Ficam mais confortáveis sozinhos. A maior parte dos povos trata um meio-orc como trataria um orc puro — atacando-o ou expulsando-o. Sua entrada será barrada na maioria das tavernas, estalagens ou mesmo cidades. Mas pessoas de bom coração podem, às vezes, dar-lhes chance de provar que são civilizados. E isso pode ser tudo de que precisam: estes seres são variados em personalidade, capazes de se adaptar, surpreender. Um meio-orc amistoso é raro — porque também é raro que o mundo seja amistoso com ele. Por sua maior esperteza e adaptabilidade, um meio-orc pode chefiar uma tribo orc de forma inteligente, até mesmo fazendo acordos com outros povos — ou atacando de formas mais astutas. De fato, quando um bando orc cresce a ponto de ameaçar as comunidades do Reinado, muitas vezes isso acontece sob a liderança de um meio-orc. Muitos meios-orcs se tornam aventureiros. Ser dono do próprio destino, viver sem se importar com o que outros pensam, desafiar todas as expectativas… essa pode ser a vida mais sonhada!` },
        { titulo: "Orc",
          texto:
`“Você diz que orcs são impuros por serem miscigenados? Traz o narizinho mais perto e repete isso…”
— Brivaria, meia-elfa lutadora
O bando é formado por humanoides musculosos, com pele verde-acinzentada, focinho suíno e presas inferiores que se projetam fora da boca. Os olhos trazem um sinistro brilho avermelhado. Quando alguém diz que humanoides monstruosos são violentos e estúpidos, quase sempre está falando de orcs. Orcs são, talvez, o povo humanoide mais brutal e violento de Arton. Orcs existem em números vastos, espalhados por todo o mundo — de fato, é uma surpresa que nunca tenham formado reinos ou mesmo erguido impérios. Vivem em cavernas e túneis sob Arton, tanto por hábito quanto por necessidade: são sensíveis à luz do sol, que ofusca sua visão e reduz suas habilidades de combate. A origem dos orcs é um mistério. Alguns afirmam que eles podem ter sido o povo mais antigo do mundo — ainda um esboço rudimentar, uma primeira tentativa dos deuses para povoar Arton. Para outros, orcs seriam seres misturados, mestiços, uma combinação de traços vistos em outras grandes raças. Talvez nem tenham sido criados pelos deuses; podem ser uma ocorrência acidental, ou então nascidos de algum experimento doentio. Orcs existem há muito tempo, mas não parecem capazes de evoluir. Não aprendem nada novo, nem absorvem conhecimentos de outras culturas — a maior parte mal domina o fogo. Também não se organizam em grandes comunidades; formam apenas pequenas tribos que fazem guerra com as demais, lutando por território e recursos. Não sabem plantar ou criar animais, vivendo puramente de caça e pilhagem de outros povos. Talvez a única atividade “produtiva” que conseguem desempenhar bem seja a mineração: por viverem sob a terra, sabem escavar e encontrar minérios úteis, que usam para fabricar suas armas simples, mas letais. Embora a raça orc apresente variações físicas extremas, todos são mental e culturalmente muito parecidos: ferozes e brutais, incapazes de entender qualquer linguagem exceto a força. Em combate, são rudes e óbvios — avançam em fúria aos urros, agitando as armas, sem qualquer tática ou estratégia. É quase impossível intimidar um orc: mesmo diante de coisas que não compreendem, como magia, sua reação imediata é atacar. Para o orc típico, não existe poder maior que a força bruta, nem resposta melhor que a violência. Orcs são liderados por um chefe, que conquista esse posto pela força e selvageria. É raro um líder se manter no comando por muito tempo — logo será desafiado e vencido por alguém mais forte, jovem ou oportunista. O destino de qualquer orc um pouco mais esperto que seus iguais é abandonar a tribo, ou ser logo massacrado. Esses podem se tornar aventureiros, com muito custo; ainda que bandos de heróis sejam conhecidos por acolher todo tipo de criatura inusitada, mesmo entre eles um orc será raro. Aqueles que conseguem ser aceitos precisam se esforçar em dobro para provar seu valor.` },
        { titulo: "Orc Mutante",
          texto:
`“Aquele maldito disse ser uma missão para caçar orcs!
APENAS ORCS!”
— Glammad Hoggarimm, anão caçador
Em meio à horda monstruosa, algo ainda mais monstruoso emerge. Lembra um orc como os demais, mas ainda mais massivo, empunhando um tacape feito com o crânio de alguma grande besta com chifres. Mas a primeira coisa notável sobre ele é que tem duas cabeças! Orc’Raarr é como são chamados os orcs mutantes. Por suas numerosas deformidades, muitas vezes não há diferença externa visível entre os sexos dos orcs. Alguns suspeitam que eles nem mesmo se reproduzem como outros humanoides; na verdade eles “se formam” de alguma maneira não natural. Também existe a teoria de que orcs são uma raça feita de partes de todas as outras, reforçada pelo fato de que orcs podem cruzar com quase qualquer outra raça humanoide e produzir descendência. Quando acasalam com humanos ou seres de sangue humano (meios-elfos, minauros, lefou…), nascem meios-orcs. Com outros, o resultado são orcs que lembram versões distorcidas dessas raças, aumentando ainda mais sua diversidade física. Não raras vezes, um orc apresenta habilidades jamais vistas em outros como ele — ou em qualquer criatura! É como se alguma entidade estivesse, até hoje, fazendo experimentos insanos em busca de uma raça “perfeita”. Ou experimentos insanos sem objetivo algum, levando muitos a crer que os orcs foram criados por Nimb. Seja pelo motivo que for, orcs podem apresentar mutações físicas extremas, como duas cabeças, três ou quatro braços e tantas outras. Estes podem acabar mais perigosos, conquistando a chefia de suas tribos pela força. Alguns até mesmo se tornam monstros poderosos, capazes de aterrorizar regiões inteiras.` },
        { titulo: "Tabrachi",
          texto:
`“Tenham cuidado. Soube que um povo-sapo maldito ronda por estes pântanos.”
— Hyakunen, o Imortal (emboscado)
Embora humanoide, a criatura tem o aspecto de um grande sapo. Veste uma armadura rústica de couro e empunha uma lança. Da boca larga e rasgada pende uma língua grossa, mas ligeira, que lambe um dos olhos grandes e salientes. Os tabrachi, mais conhecidos como “homens-sapos”, são encontrados em pequenos bandos, sempre à procura de vítimas, para roubar seus pertences e oferecê-las como sacrifício a Inghlblhphollstgt, o Grande Deus Sapo. Embora sejam mais numerosos no infame Pântano dos Juncos, entre Deheon e Wynlla, podem ser encontrados por todo o Reinado. Sua tática favorita é manter-se à espreita sob as águas do pântano ou nas copas das árvores, usando sua furtividade para atacar transeuntes de surpresa. Muitos grupos tabrachi são acompanhados por um ou mais campeões, os guerreiros de elite de seu povo. Entre estes, alguns cavalgam sapos atrozes; estes anfíbios monstruosos também podem estar protegendo seus locais sagrados.` },
        { titulo: "Trog",
          texto:
`“Pelo amor de todos os deuses, bicho pestilento, NÃO faça isso em minha taverna!”
— Jaufweet Marauder, dono da Taverna dos Marotos
O humanoide reptiliano é coberto de escamas verdes, com cabeça de lagarto e uma crista que começa na testa e continua até a base do pescoço. Seus olhos são amarelos, com pupilas verticais negras e profundas. Trogloditas, ou trogs, são uma raça de ferozes homens-lagartos. Carnívoros, alimentam-se de qualquer criatura que consigam apanhar, mas preferem carne humanoide. Como répteis, têm sangue frio e se reproduzem através de ovos. Atingem a idade adulta rapidamente, aos 10 anos. Quanto à sua longevidade, há controvérsias — alguns sábios atribuem a eles o mesmo tempo de vida dos humanos, outros acham ser bem menos. O fato é que, por seu modo de vida violento, quase nenhum morre por causas naturais. Trogs são violentos, rancorosos e mal-humorados, e suas faces de couro demonstram pouco além de rigidez zangada. Dizem que os trogloditas foram criados por Tenebra a partir de uma comunidade de anões. Isso explicaria muito sobre sua natureza, bem como seu ódio ancestral pelo povo anão. Trogs gostam de viver no subterrâneo, em grandes complexos de túneis. Também gostam de cerveja e sabem produzi-la. Entretanto, diferem radicalmente dos anões por sua falta de aptidão para forjar metais. Por isso valorizam tanto armas e outros objetos de aço — é sinal de status entre os trogs portar itens metálicos, vistos como joias. Seria natural que os trogs vivessem em regiões isoladas, mas a verdade é bem diferente: a maior parte dos clãs vive em áreas montanhosas próximas a estradas e povoados de outras raças — que atacam com frequência, matando viajantes, comerciantes e aldeões para roubar armas, ferramentas e outras peças de metal. Trogs são combatentes ferozes: sua estratégia preferida é usar seu poder camaleônico, armar uma emboscada e atacar à distância, com azagaias. Os sobreviventes são enfraquecidos pelo óleo fedorento que os trogs secretam, e então enfrentados corpo a corpo. A liderança da comunidade é exercida pelo mais forte. Trogs costumam duelar pelo comando dos clãs, mas alguns chefes abandonam seus postos por se cansarem da responsabilidade. Outros apenas esquecem que deveriam liderar, após alguns dias de bebedeira… Trogs não abandonam seu bando, caso tenham escolha. Mas eventualmente surgem indivíduos que não se mostram cruéis ou caóticos o bastante, ou que por quaisquer outros motivos são diferentes. Estes partem ou são banidos. Com sorte, evitam ser mortos por aldeões furiosos ou aventureiros impetuosos. Com mais sorte ainda, acabam eles mesmos tornando-se aventureiros.` },
        { titulo: "Habilidades de Trogs",
          texto:
`Todos os trogs possuem as seguintes habilidades.
Mau Cheiro (Padrão). O trog expele um gás fétido. Todas as criaturas (exceto trogs) em alcance curto ficam enjoadas por 1d6 rodadas (Fortitude evita). Uma criatura que passe no teste de resistência fica imune a esta habilidade por um dia. Veneno.
Sangue Frio. O trog sofre 1 ponto de dano adicional por dado de dano de frio.` },
        { titulo: "Ogro",
          texto:
`“Eles são fortes como touros e quase tão espertos. Ah, você já ouviu essa…”
— Horatikk, bardo goblin
Quando ouvia que algo é “grande como um ogro”, talvez você não soubesse o significado exato da comparação — mas agora sabe. Aquilo que se aproxima a passadas pesadas é alto e robusto como um antigo carvalho, uma montanha de músculos em forma humanoide, encimada por uma cabeça diminuta. Tão feio quanto forte, coberto de pelos desgrenhados, verrugas e manchas. Veste peles e couro de animais que matou, e empunha uma clava grande como uma tora.
Grandes e fortes como touros (e quase tão espertos), estes gigantes primitivos são também solitários e mal-humorados, quase nunca encontrados em bandos. No entanto, por sua estupidez, são frequentemente convencidos a acompanhar bandidos e gnolls, em troca de diversão ou guloseimas. Também é comum encontrá-los servindo a bruxos ou cultistas. Enganar um ogro não é tarefa difícil, sendo muito mais recomendado que tentar vencê-lo pela força bruta. Mesmo quando enfurecidos, ogros podem cair em provocações e ser levados a cometer erros. Ogros são combatentes brutais, mas rústicos. Normalmente usam apenas tacapes, embora causem grande dano com essas armas improvisadas. Sua estratégia é simples: bater com força, matar e devorar os restos da vítima enquanto ainda quentes… Ogros não desenvolvem tecnologia; vivem de saque, roubo e pilhagem. Carnívoros, alimentam-se de praticamente qualquer criatura — incluindo humanos, elfos, anões e hynne (pelos quais têm certa predileção). Sua única outra forma de conseguir comida e equipamento é recebendo-os de algum vilão que os recrute; por sua combinação de força e inépcia, ogros são muito utilizados como guardas, soldados e capangas. Estes recebem armas e armaduras melhores, tornando-se uma ameaça ainda maior que seus primos mais selvagens. Contam-se histórias sobre ogros que teriam se reunido a grupos de aventureiros. Essa ocorrência é muito rara, mas não impossível; o gigante bruto contribui com sua enorme força e resistência, embora também cause problemas de muitas maneiras.` },
      ],
    },

    // ── 🗡 CAPANGAS & BANDOLEIROS ──────────────────────
    {
      chave: "capangas", nome: "Capangas & Bandoleiros", icone: "🗡", cor: "#5b4a3a",
      intro: "Este grupo reúne adversários encontrados em estradas pouco percorridas, becos escuros, antros de quadrilhas criminosas, ou como soldados e guarda-costas de vilões menores. São bandidos e assaltantes comuns, buscando aliviar os fracos e indefesos de seus parcos pertences, ou satisfeitos em seguir ordens de alguém mais capaz. Podem ser motivados por ganância, crueldade ou escassez em regiões assoladas pela guerra. Ou apenas pertencem a culturas violentas que não conhecem outra forma de viver, exceto pilhar outros. Quase todos são covardes. Não se importam em lutar sujo: recorrem a emboscadas, ataques à distância e grandes números. Uma de suas táticas favoritas é aguardar escondidos junto a alguma trilha onde já prepararam armadilhas, ou tirar proveito de algum obstáculo natural que torne difícil alcançá-los. Podem, por exemplo, se posicionar no alto de um desfiladeiro para emboscar viajantes em uma trilha abaixo. É raro que estes bandidos ataquem aventureiros bem armados, exceto por engano, ou caso estejam em grande vantagem (pelo menos três para um). Muito mais comum é que estejam ameaçando alguma vítima indefesa quando os heróis aparecem para impedi-los. Em geral, quando um confronto acontece, basta que um deles seja derrubado para que todos os demais fujam ou rendam-se — exceto quando intimidados por um líder poderoso.",
      fichas: [
        {
          chave: "bandidoComum", nome: "Bandido Comum", nd: "1/4", tipo: "Humanoide (humano) Médio",
          papel: '',
          subgrupo: "Bandido",
          resumo: "Bandido — Há três assaltantes cheios de valentia em torno da jovem filha do taverneiro.",
          texto:
`Bandido Comum ND 1/4
Humanoide (humano) Médio
Iniciativa +4, Percepção +1
Defesa 13, Fort +1, Ref +3, Von –1
Pontos de Vida 6
Deslocamento 9m (6q)
Corpo a Corpo Clava +7 (1d6+3).
For 1, Des 2, Con 1, Int 0, Sab –1, Car 0
Perícias Furtividade +5.
Equipamento Clava. Tesouro Metade.`
        },
        {
          chave: "bandidoLigeiro", nome: "Bandido Ligeiro", nd: "1/2", tipo: "Humanoide (humano) Médio",
          papel: '',
          subgrupo: "Bandido",
          resumo: "Bandido — Há três assaltantes cheios de valentia em torno da jovem filha do taverneiro.",
          texto:
`Bandido Ligeiro ND 1/2
Humanoide (humano) Médio
Iniciativa +4, Percepção +1
Defesa 15, Fort +3, Ref +5, Von +0
Pontos de Vida 9
Deslocamento 9m (6q)
Corpo a Corpo Clava +9 (1d6+5).
À Distância Funda +9 (1d6+1).
For 1, Des 2, Con 1, Int 0, Sab –1, Car 0
Perícias Furtividade +6.
Equipamento Clava, funda, pedras x20. Tesouro Metade.`
        },
        {
          chave: "bandidoSelvagem", nome: "Bandido Selvagem", nd: "1", tipo: "Humanoide (humano) Médio",
          papel: '',
          subgrupo: "Bandido",
          resumo: "Bandido — Há três assaltantes cheios de valentia em torno da jovem filha do taverneiro.",
          texto:
`Bandido Selvagem ND 1
Humanoide (humano) Médio
Iniciativa +4, Percepção +3
Defesa 16, Fort +8, Ref +6, Von +2
Pontos de Vida 12
Deslocamento 9m (6q)
Corpo a Corpo Lança x2 +11 (1d6+5).
À Distância Azagaia +11 (1d6+5).
Arremesso de Emboscada (Livre) Uma única vez em seu primeiro turno de combate, o bandido selvagem saca uma azagaia e faz um ataque à distância com ela.
For 2, Des 1, Con 1, Int 0, Sab 0, Car –1
Perícias Furtividade +7, Sobrevivência +2.
Equipamento Azagaia x3, escudo leve, lança. Tesouro Metade.`
        },
        {
          chave: "capanga", nome: "Capanga", nd: "1/2", tipo: "Humanoide (humano) Médio",
          papel: '',
          subgrupo: "Capanga",
          resumo: "Capanga — A entrada do esconderijo é vigiada por um homem enorme com um tacape, e um minotauro ainda maior com um machado.",
          texto:
`Capanga ND 1/2
Humanoide (humano) Médio
Iniciativa +3, Percepção +2
Defesa 13, Fort +5, Ref +3, Von +0
Pontos de Vida 7
Deslocamento 9m (6q)
Corpo a Corpo Tacape +10 (1d10+5).
Ímpeto Agressor O capanga recebe +1d10 na rolagem de dano de seu primeiro ataque na cena.
For 3, Des 1, Con 1, Int –1, Sab 0, Car –1
Equipamento Tacape. Tesouro Metade.`
        },
        {
          chave: "jagunco", nome: "Jagunço", nd: "2", tipo: "Humanoide (humano) Médio",
          papel: '',
          subgrupo: "Capanga",
          resumo: "Capanga — A entrada do esconderijo é vigiada por um homem enorme com um tacape, e um minotauro ainda maior com um machado.",
          texto:
`Jagunço ND 2
Humanoide (humano) Médio
Iniciativa +7, Percepção +3
Defesa 18, Fort +8, Ref +9, Von +5, imunidade a medo
Pontos de Vida 21
Deslocamento 9m (6q)
Corpo a Corpo Espada longa x2 +14 (1d8+6, 19).
À Distância Pistola +14 (2d6+6, 19/x3).
Saque Rápido O jagunço pode sacar ou guardar itens como uma ação livre e recarregar sua pistola como uma ação de movimento.
For 2, Des 3, Con 2, Int –1, Sab 0, Car –1
Perícias Intimidação +6, Sobrevivência +5.
Equipamento Balas x20, couro batido, espada longa, pistola.
Tesouro Metade.`
        },
        {
          chave: "capangaMinotauro", nome: "Capanga Minotauro", nd: "3", tipo: "Humanoide (minotauro) Médio",
          papel: '',
          subgrupo: "Capanga",
          resumo: "Capanga — A entrada do esconderijo é vigiada por um homem enorme com um tacape, e um minotauro ainda maior com um machado.",
          texto:
`Capanga Minotauro ND 3
Humanoide (minotauro) Médio
Iniciativa +3, Percepção +2, faro
Defesa 22, Fort +15, Ref +5, Von +10
Pontos de Vida 35
Deslocamento 6m (4q)
Corpo a Corpo Machado de batalha +17 (2d6+15, x3) e chifres +17 (1d6+15).
À Distância Azagaia +17 (1d6+10).
Medo de Altura Se estiver adjacente a uma queda de 3m ou mais de altura (como um buraco ou penhasco), o capanga minotauro fica abalado.
For 5, Des 0, Con 3, Int –1, Sab 0, Car –1
Equipamento Azagaia x3, cota de malha, escudo pesado, machado de batalha. Tesouro Metade.`
        },
        {
          chave: "chefeBandido", nome: "Chefe Bandido", nd: "1", tipo: "Humanoide (humano) Médio",
          papel: '',
          subgrupo: "Chefe do Crime",
          resumo: "Chefe do Crime — Diante dos marginais, uma figura altiva parece se sobressair.",
          texto:
`Chefe Bandido ND 1
Humanoide (humano) Médio
Iniciativa +4, Percepção +2
Defesa 16, Fort +5, Ref +8, Von +3
Pontos de Vida 30
Deslocamento 9m (6q)
Corpo a Corpo Espada curta +9 (1d6+5, 19).
À Distância Adaga +7 (1d4+3, 19).
Ataque Furtivo +2d6.
For 3, Des 2, Con 2, Int 0, Sab 0, Car 1
Perícias Furtividade +7, Intimidação +6.
Equipamento Adaga, espada curta. Tesouro Padrão.`
        },
        {
          chave: "chefeDeGangue", nome: "Chefe de Gangue", nd: "2", tipo: "Humanoide (humano) Médio",
          papel: '',
          subgrupo: "Chefe do Crime",
          resumo: "Chefe do Crime — Diante dos marginais, uma figura altiva parece se sobressair.",
          texto:
`Chefe de Gangue ND 2
Humanoide (humano) Médio
Iniciativa +6, Percepção +6
Defesa 19, Fort +11, Ref +7, Von +4, resistência a medo +5
Pontos de Vida 63
Deslocamento 9m (6q)
Corpo a Corpo Espada longa +12 (1d8+5, 19) e espada curta +12 (1d6+5, 19).
Ataque Furtivo +2d6.
Ordens (Movimento) O chefe grita ordens para seus aliados em alcance médio. Eles recebem +2 em testes de perícia até o fim da cena.
For 3, Des 2, Con 2, Int 1, Sab 0, Car 1
Perícias Furtividade +7, Intimidação +7.
Equipamento Couro batido, espada curta, espada longa. Tesouro Padrão.`
        },
        {
          chave: "chefeDeQuadrilha", nome: "Chefe de Quadrilha", nd: "4", tipo: "Humanoide (humano) Médio",
          papel: '',
          subgrupo: "Chefe do Crime",
          resumo: "Chefe do Crime — Diante dos marginais, uma figura altiva parece se sobressair.",
          texto:
`Chefe de Quadrilha ND 4
Humanoide (humano) Médio
Iniciativa +8, Percepção +5
Defesa 22, Fort +14, Ref +11, Von +5, resistência a medo +5
Pontos de Vida 120
Deslocamento 9m (6q)
Corpo a Corpo Espada longa +16 (1d8+6, 19) e espada curta +16 (1d6+6, 19).
Ataque Furtivo +3d6.
Ordens (Movimento) O chefe grita ordens para seus aliados em alcance médio. Eles recebem +2 em testes de perícia até o fim da cena.
Tropas Dispensáveis (Reação) Uma vez por rodada, quando é afetado por um ataque ou efeito, o chefe faz com que um aliado adjacente sofra todos os efeitos em seu lugar.
For 3, Des 3, Con 2, Int 1, Sab 0, Car 1
Perícias Furtividade +8, Intimidação +8.
Equipamento Bandana, couro batido, espada curta certeira, espada longa. Tesouro Padrão.`
        },
        {
          chave: "sacerdoteDeHyninn", nome: "Sacerdote de Hyninn", nd: "2", tipo: "Humanoide (goblin) Pequeno",
          papel: '',
          subgrupo: "Clérigo de Hyninn",
          resumo: "Clérigo de Hyninn — Em seu manto puído, o goblin tem o aspecto de um ladrão maltrapilho comum, até dizer sutilmente algo como “fazei-me mais esperto que os…",
          texto:
`Sacerdote de Hyninn ND 2
Humanoide (goblin) Pequeno
Iniciativa +6, Percepção +6, visão no escuro
Defesa 17, Fort +5, Ref +7, Von +12, imunidade a efeitos mentais
Pontos de Vida 49
Deslocamento 9m (6q), escalada 9m (6q)
Pontos de Mana 28
Corpo a Corpo Adaga x2 +10 (1d4+5, 19).
Bênção do Gatuno (Livre) Uma vez por cena, o sacerdote de Hyninn lança uma magia como uma ação livre, pagando seu custo normal.
✦ Forma de Macaco (Completa, 2 PM) O sacerdote se transforma em um macaco. Ele adquire tamanho Minúsculo (+5 em Furtividade e –5 em testes de manobra). Seu equipamento desaparece (e ele perde seus benefícios) até voltar ao normal, mas suas outras estatísticas não são alteradas. A transformação dura indefinidamente, mas termina caso ele faça um ataque, lance uma magia ou sofra dano.
Malandragem Divina (Livre, 1 PM) Quando faz um teste de perícia, o sacerdote usa Enganação no lugar da perícia original.
Magias Como um clérigo de Hyninn de 2º nível (CD 18).
• Arma Espiritual (Padrão, 2 PM) Até o fim da cena, o sacerdote recebe +1 na Defesa e, uma vez por rodada, quando sofre um ataque corpo a corpo, pode usar uma reação para causar 2d6 pontos de dano de corte no atacante.
• Curar Ferimentos (Padrão, 2 PM) Uma criatura adjacente cura 3d8+3 PV.
• Despedaçar (Padrão, 1 PM) Um alvo em alcance curto sofre 1d8+2 pontos de dano de impacto se for uma criatura, ou o dobro disso sem aplicar RD se for um construto ou um objeto mundano Pequeno, e fica atordoado (Fort reduz à metade e evita a condição). Uma criatura só pode ficar atordoada por esta magia uma vez por cena.
For –1, Des 3, Con 1, Int 0, Sab 3, Car 2
Perícias Enganação +7, Ladinagem +10, Religião +6.
Equipamento Adaga, gazua, símbolo sagrado de Hyninn. Tesouro Padrão.`
        },
        {
          chave: "altoSacerdoteDeHyninn", nome: "Alto Sacerdote de Hyninn", nd: "8", tipo: "Humanoide (humano) Médio",
          papel: '',
          subgrupo: "Clérigo de Hyninn",
          resumo: "Clérigo de Hyninn — Em seu manto puído, o goblin tem o aspecto de um ladrão maltrapilho comum, até dizer sutilmente algo como “fazei-me mais esperto que os…",
          texto:
`Alto Sacerdote de Hyninn ND 8
Humanoide (humano) Médio
Iniciativa +13, Percepção +13
Defesa 30, Fort +10, Ref +15, Von +19, imunidade a efeitos mentais
Pontos de Vida 175
Deslocamento 9m (6q)
Pontos de Mana 60
Corpo a Corpo Adaga x2 +24 (1d4+12, 19).
Bênção do Gatuno (Livre) Uma vez por cena, o alto sacerdote de Hyninn lança uma magia como uma ação livre, pagando seu custo normal.
Fé na Sorte (Reação) Uma vez por rodada, quando sofre dano, o alto sacerdote reduz esse dano à metade.
✦ Forma de Macaco (Completa, 2 PM) O alto sacerdote se transforma em um macaco. Ele adquire tamanho Minúsculo (+5 em Furtividade e –5 em testes de manobra) e recebe deslocamento de escalada 9m. Seu equipamento desaparece (e ele perde seus benefícios) até voltar ao normal, mas suas outras estatísticas não são alteradas. A transformação dura indefinidamente, mas termina caso ele faça um ataque, lance uma magia ou sofra dano.
Malandragem Divina (Livre, 1 PM) Quando faz um teste de perícia, o alto sacerdote usa Enganação no lugar da perícia original.
Magias Como um clérigo de Hyninn de 8º nível (CD 28).
• Arma Espiritual (Padrão, 6 PM) Até o fim da cena, o alto sacerdote recebe +2 na Defesa e, uma vez por rodada, quando sofre um ataque corpo a corpo, pode usar uma reação para causar 3d6 pontos de dano de corte no atacante.
• Curar Ferimentos (Padrão, 8 PM) Uma criatura adjacente cura 9d8+9 PV.
• Despedaçar (Padrão, 7 PM) Um alvo em alcance curto sofre 4d8+8 pontos de dano de impacto se for uma criatura, ou o dobro disso sem aplicar RD se for um construto ou um objeto mundano Pequeno, e fica atordoado (Fort reduz à metade e evita a condição). Uma criatura só pode ficar atordoada por esta magia uma vez por cena.
• Enxame de Pestes (Completa, 7 PM, sustentada) Um enxame de palhaços em miniatura surge em alcance médio e ocupa um quadrado de 1,5m. No fim de cada um dos turnos do alto sacerdote, o enxame causa 4d12 pontos de dano de corte a qualquer criatura em seu espaço (Fort reduz à metade). O alto sacerdote pode gastar uma ação de movimento para mover o enxame 12m.
For 0, Des 3, Con 1, Int 1, Sab 5, Car 4
Perícias Enganação +16, Furtividade +13, Ladinagem +14, Religião +14.
Equipamento Adaga, capa esvoaçante aprimorada, gazua, manto eclesiástico, símbolo sagrado de Hyninn.
Tesouro Padrão.`
        },
        {
          chave: "devotoDeHyninnManhoso", nome: "Devoto de Hyninn Manhoso", nd: "1/2", tipo: "Humanoide (humano) Médio",
          papel: '',
          subgrupo: "Devoto de Hyninn",
          resumo: "Devoto de Hyninn — O ladrão está cercado, sua fuga parece impossível, até que ele murmura uma oração ligeira.",
          texto:
`Devoto de Hyninn Manhoso ND 1/2
Humanoide (humano) Médio
Iniciativa +5, Percepção +3
Defesa 13, Fort –1, Ref +6, Von +3, imunidade a efeitos de movimento
Pontos de Vida 12
Deslocamento 9m (6q)
Corpo a Corpo Adaga +6 (2d4+5, 19).
✦ No Bolso Dói Mais Quando acerta um ataque em corpo a corpo, para cada 1 ponto de dano causado, o devoto de Hyninn manhoso rouba T$ 1 da vítima. Mesmo que o devoto de Hyninn seja derrotado, há 50% de chance de que esses tibares tenham desaparecido para sempre, pela graça de Hyninn.
Truque de Espelhos (Reação) Uma vez por rodada, quando é atacado, o devoto pode enganar o atacante com uma distração, como um reflexo em uma janela, fazendo com que o ataque erre automaticamente (Von CD 15 evita). O devoto só pode usar esta habilidade uma vez por cena contra cada criatura.
For –1, Des 2, Con 0, Int 1, Sab 0, Car 2
Perícias Enganação +6, Furtividade +6, Ladinagem +6.
Equipamento Adaga, gazua. Tesouro Metade.`
        },
        {
          chave: "devotoDeHyninnSimao", nome: "Devoto de Hyninn Simão", nd: "1", tipo: "Humanoide (humano) Médio",
          papel: '',
          subgrupo: "Devoto de Hyninn",
          resumo: "Devoto de Hyninn — O ladrão está cercado, sua fuga parece impossível, até que ele murmura uma oração ligeira.",
          texto:
`Devoto de Hyninn Simão ND 1
Humanoide (humano) Médio
Iniciativa +6, Percepção +3
Defesa 15, Fort +0, Ref +11, Von +5, imunidade a efeitos de movimento
Pontos de Vida 26
Deslocamento 9m (6q)
Corpo a Corpo Adaga +8 (2d4+10, 19).
✦ No Bolso Dói Mais Quando acerta um ataque em corpo a corpo, para cada 1 ponto de dano causado, o devoto de Hyninn simão rouba T$ 1 da vítima. Mesmo que o devoto de Hyninn seja derrotado, há 75% de chance de que esses tibares tenham desaparecido para sempre, louvado seja Hyninn.
Truque de Espelhos (Reação) Uma vez por rodada, quando é atacado, o devoto pode enganar o atacante com uma distração, como um reflexo em uma janela, fazendo com que o ataque erre automaticamente (Von CD 16 evita). O devoto só pode usar esta habilidade uma vez por cena contra cada criatura.
For –1, Des 3, Con 0, Int 1, Sab 0, Car 2
Perícias Enganação +6, Furtividade +7, Ladinagem +7.
Equipamento Adaga, gazua. Tesouro Metade.`
        },
        {
          chave: "devotoDeHyninnVelhaco", nome: "Devoto de Hyninn Velhaco", nd: "4", tipo: "Humanoide (humano) Médio",
          papel: '',
          subgrupo: "Devoto de Hyninn",
          resumo: "Devoto de Hyninn — O ladrão está cercado, sua fuga parece impossível, até que ele murmura uma oração ligeira.",
          texto:
`Devoto de Hyninn Velhaco ND 4
Humanoide (humano) Médio
Iniciativa +9, Percepção +5
Defesa 22, Fort +4, Ref +16, Von +10, imunidade a efeitos de movimento e surpreendido
Pontos de Vida 88
Deslocamento 9m (6q)
Corpo a Corpo Adaga x2 +15 (1d4+8, 18).
Malandríssimo Quando o devoto de Hyninn velhaco passa em um teste de resistência contra um efeito de um inimigo, esse inimigo perde 3 PM.
✦ No Bolso Dói Mais Quando acerta um ataque em corpo a corpo, para cada 1 ponto de dano causado, o devoto rouba T$ 1 da vítima. Mesmo que o devoto seja derrotado, há 90% de chance de que esses tibares tenham desaparecido para sempre, pois é grande a mão de Hyninn.
Truque de Espelhos (Reação) Uma vez por rodada, quando é atacado, o devoto pode enganar o atacante com uma distração, como um reflexo em uma janela, fazendo com que o ataque erre automaticamente (Von CD 20 evita). O devoto só pode usar esta habilidade uma vez por cena contra cada criatura.
For 0, Des 4, Con 0, Int 1, Sab 0, Car 3
Perícias Enganação +10, Furtividade +10, Ladinagem +10.
Equipamento Adaga precisa, capa esvoaçante, gazua. Tesouro Metade.`
        },
        {
          chave: "gatuno", nome: "Gatuno", nd: "1", tipo: "Humanoide (humano) Médio",
          papel: '',
          subgrupo: "Gatuno",
          resumo: "Gatuno — O guarda do portão cai inconsciente, um pequeno dardo cravado no pescoço.",
          texto:
`Gatuno ND 1
Humanoide (humano) Médio
Iniciativa +7, Percepção +2
Defesa 14, Fort +0, Ref +11, Von +5
Pontos de Vida 25
Deslocamento 9m (6q), escalada 6m (4q)
Corpo a Corpo Porrete +9 (1d6+5 não letal).
Ataque Furtivo +2d6.
Pancada na Cabeça Uma criatura atingida por um ataque furtivo do gatuno fica inconsciente e caída ou, se estiver envolvida em combate ou outra situação perigosa, fica exausta por 1 rodada, depois fatigada (em ambos os casos, Fort CD 16 reduz para fatigada por 1d4 rodadas).
Sombra O gatuno não sofre penalidade em testes de Furtividade por se mover ao seu deslocamento normal e reduz a penalidade por atacar e fazer outras ações chamativas para –10.
For 0, Des 3, Con 1, Int 1, Sab 0, Car 0
Perícias Acrobacia +7, Furtividade +10, Ladinagem +7.
Equipamento Armadura de couro, gazua, porrete. Tesouro Padrão.`
        },
        {
          chave: "gatunoMestre", nome: "Gatuno Mestre", nd: "3", tipo: "Humanoide (humano) Médio",
          papel: '',
          subgrupo: "Gatuno",
          resumo: "Gatuno — O guarda do portão cai inconsciente, um pequeno dardo cravado no pescoço.",
          texto:
`Gatuno Mestre ND 3
Humanoide (humano) Médio
Iniciativa +8, Percepção +3
Defesa 19, Fort +3, Ref +15, Von +9, evasão, resistência a efeitos de movimento +3
Pontos de Vida 68
Deslocamento 9m (6q), escalada 6m (4q)
Corpo a Corpo Porrete +14 (1d6+7 não letal).
Ataque Furtivo +3d6.
Bomba de Fumaça (Padrão) O gatuno mestre prepara e arremessa uma bomba de fumaça em um ponto em alcance curto. A bomba libera uma fumaça espessa em um raio de 6m a partir do impacto; a fumaça obscurece toda a visão, fornece camuflagem para criaturas a até 1,5m e camuflagem total para criaturas a partir de 3m e dura até o fim da cena.
Pancada na Cabeça Uma criatura atingida por um ataque furtivo do gatuno mestre fica inconsciente e caída ou, se estiver envolvida em combate ou outra situação perigosa, fica exausta por 1 rodada, depois fatigada (em ambos os casos, Fort CD 19 reduz para fatigada por 1d4 rodadas).
Sombra O gatuno mestre não sofre penalidade em testes de Furtividade por se mover ao seu deslocamento normal e reduz a penalidade por atacar e fazer outras ações chamativas para –10.
For 0, Des 4, Con 1, Int 1, Sab 0, Car 0
Perícias Acrobacia +9, Furtividade +12, Ladinagem +10.
Equipamento Armadura de couro, bomba de fumaça x3, gazua aprimorada, porrete. Tesouro Padrão.`
        },
        {
          chave: "duplo", nome: "Duplo", nd: "4", tipo: "Humanoide (duplo) Médio",
          papel: '',
          resumo: "Quando seu disfarce é enfim desmascarado, a sacerdotisa élfica sorri com malícia — e se transforma em algo muito diferente.",
          texto:
`Duplo ND 4
“Por onde andou? Não se afaste outra vez, fico preocupada! Vem, vamos continuar, eu vou na frente.”
— Marenn Loramis, sereia clériga de Oceano (últimas palavras)
Quando seu disfarce é enfim desmascarado, a sacerdotisa élfica sorri com malícia — e se transforma em algo muito diferente. Lembra um boneco ou manequim de pele branca, sem feições. Sem nariz, orelhas ou cabelo; apenas olhos negros e uma pequena boca redonda, sem qualquer expressão. As mãos agora possuem longas garras negras, que a criatura parece disposta a usar. Duplos — também chamados doppelgangers — são os mestres supremos do disfarce. Seres estranhos, capazes de assumir a forma daqueles que encontram. Dizem que uma das primeiras ações de Hyninn, assim que ascendeu ao posto de divindade maior no Panteão, foi dar vida a estes traiçoeiros. O duplo pode se transformar em qualquer criatura humanoide, seja grande como um ogro ou pequena como um hynne. É uma transformação física, não ilusória; por isso, dificilmente detectável. Além disso, duplos são imunes a magias de leitura e controle da mente. O duplo sempre reverte à forma natural quando morre. Todo duplo é capaz de identificar outro, não importa a forma que ambos estejam usando. Contudo, por sua natureza esquiva, é muito raro que façam alianças. Alguns duplos atuam como espiões e assassinos para guildas de ladrões ou cultos malignos; outros lideram, eles próprios, tais organizações (não raras vezes após matar o líder original e assumir sua forma). Contudo, estes seres inquietos raramente preservam um mesmo disfarce por muito tempo, logo buscando um novo alvo para tomar seu lugar e viver outra farsa.
Humanoide (duplo) Médio
Iniciativa +9, Percepção +6
Defesa 21, Fort +5, Ref +15, Von +10, cura acelerada 5, imunidade a adivinhação e efeitos mentais
Pontos de Vida 143
Deslocamento 9m (6q)
Corpo a Corpo Garra x2 +14 (1d6+7).
Ataque Furtivo +3d6.
✦ Detectar Pensamentos O duplo detecta constantemente os pensamentos superficiais de todas as criaturas inteligentes em alcance curto. Ele não pode ser surpreendido por criaturas cujos pensamentos esteja detectando dessa forma, e recebe +2 na Defesa e em testes de perícia contra elas. Uma criatura ciente desta habilidade pode gastar uma ação de movimento e fazer um teste de Vontade (CD 20). Se passar, esconde seus pensamentos até o fim da cena.
✦ Mudar Forma (Padrão) O duplo assume a forma de qualquer humanoide de tamanho Pequeno a Grande, como no efeito da magia Metamorfose. Ele pode permanecer na forma escolhida por tempo indeterminado, mas, se morrer, reverte à forma natural.
For 2, Des 5, Con 2, Int 2, Sab 2, Car 4
Perícias Enganação +14, Furtividade +11, Intuição +10.
Equipamento Duplos geralmente não usam equipamento, mas podem portar armas, ferramentas e roupas adequadas ao seu disfarce atual. Tesouro Padrão.`
        },
      ],
      regras: [
        { titulo: "Bandido",
          texto:
`“Nada nesta mão! Nada nesta outra! E agora, nada entre suas orelhas!”
— Cooper Al’Aziz, humano ladino
Há três assaltantes cheios de valentia em torno da jovem filha do taverneiro. Quando percebem sua chegada, eles devolvem olhares ferozes, mas as clavas em suas mãos perdem firmeza. O mais comum e débil dos malfeitores, a ralé do crime. Muitos são apenas valentões mal-intencionados, tirando proveito dos mais fracos. Outros são forçados pela miséria, buscando apenas sobreviver. Atuam em trilhas desertas nos ermos ou ruas de grandes cidades, sempre em pequenos grupos — um bandido agindo sozinho estará realmente desesperado, caindo de joelhos e implorando perdão diante da mínima ameaça. Conforme a região onde são encontrados, muitas vezes são humanos, mas é possível que pertençam a quase qualquer povo. Em terras distantes e inexploradas, estas fichas também podem representar qualquer humanoide com o hábito de espreitar rotas e atacar forasteiros.` },
        { titulo: "Capanga",
          texto:
`“Muito bem. Agora que estamos conversados, vai me levar a seu chefe.”
— Lillian Amaryllis, alcaide da Guarda de Valkaria
A entrada do esconderijo é vigiada por um homem enorme com um tacape, e um minotauro ainda maior com um machado. Nenhum deles parece estar aqui para fazer amigos. “Capanga” é como são chamados os bandidos que trabalham como soldados ou guarda-costas para um chefe de quadrilha, líder de guilda ou vilão menor. Quase todos são muito fortes e pouco espertos — “você não é pago para pensar!” é algo que ouvem bastante. Outros, mais perigosos (os assim chamados jagunços), sabem usar armas de pólvora. Quando um “trabalho” envolve a possibilidade de confronto físico, ou a intimidação de algum comerciante em débito, é certo que dois ou três capangas serão parte do bando. Nem todos os capangas são bandidos ou rufiões. Em lugares perigosos, pessoas comuns os contratam para proteger seus negócios, não sendo raro encontrá-los atuando como seguranças em tavernas ou escoltando mercadores. Pode causar espanto que um capanga na verdade tenha alma bondosa, ainda que a natureza de seu trabalho não permita muita gentileza. Capangas costumam ser humanos, mas há exceções. Com a queda do Império de Tauron, muitos de seus outrora orgulhosos guerreiros caíram em desgraça. Por sua grande força, minotauros acabaram se tornando capangas bastante cobiçados pelos chefões do crime.` },
        { titulo: "Chefe do Crime",
          texto:
`“Já esperava por sua visita, alcaide. Baixe essa espada, ou aqueles reféns vão sofrer.”
— Keiramm-Seis-Orelhas, lefou ladino
Diante dos marginais, uma figura altiva parece se sobressair. Os demais o observam, ansiosos, como se aguardando suas ações. De peito estufado, ele ergue a espada curta e lança um olhar desafiador. Em grupos de dez ou mais bandidos, algum bandoleiro mais forte ou esperto acabará assumindo a liderança. Um bandido chefe não se limita a dar ordens: ele luta e se arrisca com seus companheiros. Inspirados por sua presença, estes grupos podem se tornar audaciosos e imprudentes, atacando caravanas com escoltas armadas ou mesmo grupos de aventureiros. Enquanto o chefe está ativo, o grupo pode seguir lutando mesmo que um ou dois membros caiam. Contudo, quando ele é derrotado, os demais geralmente fogem ou se rendem.` },
        { titulo: "Clérigo de Hyninn",
          texto:
`“Hyninn? Deus dos Ladrões? Não, nunca ouvi falar.”
— Herrig, suraggel clérigo de Hyninn
Em seu manto puído, o goblin tem o aspecto de um ladrão maltrapilho comum, até dizer sutilmente algo como “fazei-me mais esperto que os mais espertos” e começar a conjuração de uma magia. Embora dificilmente vistos como “sacerdotes” no sentido mais estrito, muitos clérigos de Hyninn dedicam-se a zelar pelos bandidos e delinquentes, aqueles preferidos por sua divindade. Em grandes cidades, seus templos ocultos acolhem criminosos fugitivos, onde são curados e acobertados dos olhares da lei, ou até treinados para melhorar suas habilidades. Mas engana-se quem vê este clérigo como um defensor dos fracos! No momento em que um “protegido” demonstra um pingo de ingenuidade ou estupidez, será escorraçado como o indigno que é! Com seus poderes, não é raro que clérigos de Hyninn se tornem chefões do crime, usando os milagres do Deus dos Ladrões para assegurar o sucesso de sua organização. Se a lei ou aventureiros ameaçam suas operações, o próprio clérigo acompanhará um grupo de capangas para liquidá-los, provendo suporte mágico durante o combate. Contudo, quando a derrota parece próxima, não hesitará em invocar algum milagre para escapar — afinal, Hyninn abençoa os mais espertos.` },
        { titulo: "Devoto de Hyninn",
          texto:
`“Ele veio por esta passagem, juro! Deve estar por perto. Ei, aquilo é um macaco?”
— Adalbert de Deheon, patrulheiro de Valkaria
O ladrão está cercado, sua fuga parece impossível, até que ele murmura uma oração ligeira. Diante de seus olhares incrédulos, ele se transforma em um pequeno macaco e escala a muralha, sumindo do outro lado. Serão os bandidos que buscam a proteção de Hyninn, ou será Hyninn que os torna bandidos? Talvez ambas as afirmações sejam verdadeiras. O fato é que muitos marginais invocam o Deus dos Ladrões antes de praticar algum delito, alguns com tanto fervor que terminam por atrair suas graças. Para estes, furtar não é apenas modo de vida ou ato de ousadia: é sua religião. Embora não seja um clérigo, o devoto de Hyninn pode impressionar bandidos medíocres com seus parcos poderes, tornando-se líder de pequenos grupos.` },
        { titulo: "Gatuno",
          texto:
`“A maior qualidade de uma boa ladra é ser imperceptível.”
— Kira, medusa ladina
O guarda do portão cai inconsciente, um pequeno dardo cravado no pescoço. Nenhum sinal do atacante, exceto por um breve farfalhar da folhagem na copa da árvore ao longe. O gatuno é o clássico ladrão furtivo e acrobático que corre sobre telhados, entra pelas janelas, engana sentinelas e espreita na escuridão. Ele é mais ágil, esperto e audacioso que o bandido comum. Com a motivação certa, talvez até venha a se tornar um ladino aventureiro. Contra heróis focados em combate, gatunos são adversários desafiadores — porque quase nunca lutam de fato, apenas atacam furtivamente das sombras. Se o alvo não caiu, o gatuno foge e desiste, ou aguarda outra oportunidade. Poucas vezes um gatuno está interessado em matar; ele é um ladrão, não um assassino (assassinos são muito mais caros!). Quando um confronto é inevitável, sua meta será apenas incapacitar o oponente para então roubar aquilo que procura. Gatunos agem sozinhos, formando grupos apenas para grandes golpes, como invadir e roubar tesouros em algum castelo. Alguns também trabalham para guildas e quadrilhas, em missões de roubo ou reconhecimento para golpes posteriores. Grupos de aventureiros em viagem, portando itens valiosos, também podem ser alvos de um gatuno: ele provavelmente vai esperar que todos durmam para roubá-los. Caso um deles esteja acordado, vigiando, pode atraí-lo para uma emboscada ou incapacitá-lo com sonífero. Estas estatísticas também podem representar espiões ou ninjas.` },
      ],
    },

    // ── 👁 CULTO DE AHARADAK ───────────────────────────
    {
      chave: "aharadak", nome: "Culto de Aharadak", icone: "👁", cor: "#9e2f2f",
      intro: "De onde vem a Tormenta, tudo é lefeu. Não há criaturas. Não há entidades separadas. Há apenas um todo, um multiverso consciente. Somente quando chegam a Arton tomam forma como seres individuais. Os mais poderosos seriam conhecidos como os Lordes da Tormenta, cada um com seus próprios objetivos. E entre estes, havia um que ambicionava ser deus.\nAharadak, o Devorador. Lorde da área de Zakharov, no coração do Reinado. Enquanto outros tornavam seus domínios insalubres à vida natural, Aharadak fez o oposto: ergueu a Cidade na Tormenta — aberrante, macabra, mas sedutora e habitável por artonianos. Ali ele seria venerado como um deus-monstro profano, cresceria em poder divino. Um dia mataria Tauron, O Deus da Força e líder do Panteão. Para o horror de todos, incluindo os próprios deuses, o Devorador tomaria um lugar entre os vinte. É possível devotar-se a Aharadak sem ceder à devassidão, brandir seus poderes concedidos em prol de boas causas — mas aqueles que o fazem são exceções raríssimas. Este culto é uma congregação de sádicos depravados. Suas cerimônias são regadas a danças profanas, mutilações e sacrifícios sangrentos. Buscam não apenas aprazer o Devorador, mas também trazer a Tormenta para Arton. Assim sendo, seu confronto com heróis aventureiros se torna inevitável.",
      comuns: { titulo: "O Poder dos Lefeu", aplicaSe: "(lefeu)", nota: "Vale para as fichas com o subtipo lefeu (as (lefou) são meio-demônios e ficam de fora); o quadro completo das habilidades lefeu está na sub-aba ⚔ Tormenta 20 (\"Habilidades Lefeu\", grupo A Tormenta)." },
      fichas: [
        {
          chave: "iniciadoDaAgonia", nome: "Iniciado da Agonia", nd: "3", tipo: "Humanoide (humano) Médio",
          papel: '',
          subgrupo: "Acólito da Agonia",
          resumo: "Acólito da Agonia — A figura em mantos ensanguentados, empunhando uma lâmina enferrujada, bem poderia ser um açougueiro saindo do abatedouro.",
          texto:
`Iniciado da Agonia ND 3
Humanoide (humano) Médio
Iniciativa +8, Percepção +8
Defesa 20, Fort +5, Ref +8, Von +13, imunidade a efeitos mentais e medo, resistência a magia divina +5
Pontos de Vida 28
Deslocamento 9m (6q)
Pontos de Mana 28
Corpo a Corpo Adaga +16 (1d4+7, 19).
Júbilo na Dor Quando causa ou sofre dano, o acólito da agonia recebe redução de dano 2 e recupera 1d4 pontos de mana. A redução de dano é cumulativa, até um máximo de RD 10, mas volta a zero se o acólito passar 1 rodada sem causar ou sofrer dano.
Magias Como um clérigo de Aharadak de 5º nível (CD 17, limite de 5 PM).
• Arma Espiritual (Padrão, 4 PM) Até o fim da cena, o acólito recebe +2 na Defesa e, uma vez por rodada, quando sofre um ataque corpo a corpo, pode usar uma reação para causar 2d6 pontos de dano de corte no atacante.
• Infligir Ferimentos (Padrão, 5 PM) Uma criatura adjacente sofre 4d8+4 pontos de dano de trevas (Fort reduz à metade).
• Perdição (Padrão, 3 PM) Criaturas escolhidas em alcance curto sofrem –2 em testes de ataque e rolagens de dano até o fim da cena.
For 1, Des 3, Con 2, Int –1, Sab 3, Car –1
Perícias Intimidação +7, Religião +6.
Equipamento Adaga, gibão de peles e símbolo sagrado de Aharadak. Tesouro Metade.`
        },
        {
          chave: "sacerdoteDaAgonia", nome: "Sacerdote da Agonia", nd: "9", tipo: "Humanoide (humano) Médio",
          papel: '',
          subgrupo: "Acólito da Agonia",
          resumo: "Acólito da Agonia — A figura em mantos ensanguentados, empunhando uma lâmina enferrujada, bem poderia ser um açougueiro saindo do abatedouro.",
          texto:
`Sacerdote da Agonia ND 9
Humanoide (humano) Médio
Iniciativa +15, Percepção +19, não pode ser flanqueado
Defesa 32, Fort +9, Ref +15, Von +21, fortificação 25%, imunidade a efeitos mentais e medo, resistência a magia divina +5
Pontos de Vida 192
Deslocamento 9m (6q)
Pontos de Mana 61
Corpo a Corpo Adaga da Tormenta x2 +22 (1d4+16, 19, mais 1d8 de trevas).
✦ Apetite por Destruição (Completa, 10 PM) O sacerdote da agonia suga a energia vital de todos os seres em uma esfera de 6m ao seu redor. Criaturas vivas na área sofrem 6d10 pontos de dano de trevas e o sacerdote recebe PV temporários iguais ao dano total causado.
Júbilo na Dor Quando causa ou sofre dano, o acólito da agonia recebe redução de dano 2 e recupera 2d4 pontos de mana. A redução de dano é cumulativa, até um máximo de RD 20, mas volta a zero se o acólito passar 1 rodada sem causar ou sofrer dano.
Magias Como um clérigo de Aharadak de 9º nível (CD 32, limite de 10 PM).
• Arma Espiritual (Padrão, 10 PM) Até o fim da cena, duas vezes por rodada, quando sofre um ataque corpo a corpo, o sacerdote pode usar uma reação para causar 4d6 pontos de corte no atacante.
• Enxame Rubro de Ichabod (Padrão, 8 PM, sustentada) Um enxame de pequenas criaturas da Tormenta surge em alcance médio e ocupa uma área de 3m. No fim de cada turno do sacerdote, o enxame causa 5d12 pontos de dano de ácido a qualquer criatura em seu espaço (Ref reduz à metade). O sacerdote pode gastar uma ação de movimento para mover o enxame com deslocamento de 12m.
• Infligir Ferimentos (Padrão, 7 PM) Uma criatura adjacente ao sacerdote sofre 5d8+5 pontos de dano de trevas (Fort reduz à metade).
• Miasma Mefítico (Padrão, 7 PM) Uma nuvem de 6m de raio se forma em alcance médio. Criaturas na área sofrem 7d6 pontos de dano de ácido e ficam enjoadas por 1 rodada (Fort reduz à metade e evita a condição).
• Perdição (Padrão, 5 PM) Criaturas escolhidas em alcance curto sofrem –3 em testes de ataque e rolagens de dano até o fim da cena.
For 1, Des 3, Con 3, Int –1, Sab 6, Car 0
Perícias Intimidação +11, Religião +15.
Equipamento Gibão de peles espinhoso de matéria vermelha, símbolo sagrado de Aharadak. Tesouro Metade mais adaga da Tormenta (veja Reishid).`
        },
        {
          chave: "aspectoDeAharadak", nome: "Aspecto de Aharadak", nd: "10", tipo: "Monstro (lefeu) Grande",
          papel: '',
          resumo: "Difícil descrever o monstro repulsivo.",
          texto:
`Aspecto de Aharadak ND 10
“Cria imunda do Devorador! Sua existência neste mundo será breve, eu prometo!”
— Akalael Luxferis, feiticeiro e paladino de Thyatis
Difícil descrever o monstro repulsivo. Parece um estômago de porco, imenso e inchado, com inúmeras patas curtas saindo de sua base. No topo, algo que poderia ser uma bocarra circular, coroada de dentes e tentáculos. Coisas como asas, braços e garras afloram de todos os lugares. Aspectos dos deuses são criaturas mortais de existência temporária, enviadas por suas respectivas divindades para cumprir missões simples, como ajudar seus devotos em momentos de necessidade. Têm a mesma aparência do deus, mas em proporções humanas. No caso de Aharadak, contudo, a manifestação é grande como uma carruagem — e tão aterrorizante quanto seria esperado. Um aspecto de Aharadak pode surgir em resposta à súplica de um alto sacerdote, ou por simples vontade do Devorador, para punir aqueles que julgar “profanadores”. Existe o risco de que o monstro seja imprevisível, atacando tudo e todos à volta (incluindo o próprio invocador e outros devotos).
Monstro (lefeu) Grande
Iniciativa +10, Percepção +25, percepção às cegas
Defesa 38, Fort +22, Ref +10, Von +20, redução de dano 10
Pontos de Vida 472
Deslocamento 9m (6q), voo 9m (6q)
Corpo a Corpo Mordida +30 (4d8+22, 19) e duas garras +30 (3d8+22, 19).
Agarrar Aprimorado (Livre) Mordida (teste +32).
✦ Cuspir Enxame (Completa, sustentada) Um enxame de insetos rubros Grande surge em um ponto em alcance curto. No fim de cada um dos seus turnos, ele causa 4d12 pontos de dano de ácido a qualquer criatura em seu espaço. O avatar pode gastar uma ação de movimento para mover o enxame com deslocamento de voo 12m e não gasta PM para sustentá-lo.
Engolir (Padrão) No início de cada um dos turnos do aspecto, a criatura engolida sofre 4d6+11 pontos de dano de impacto mais 4d6+11 pontos de dano de ácido. Ela pode escapar causando um total de 25 pontos de dano a ele (Defesa 15, redução de dano 0).
Insanidade da Tormenta 2d12 PM (Von CD 30 evita).
Sangue Ácido Quando o aspecto sofre dano por um ataque corpo a corpo adjacente, o atacante sofre 10 pontos de dano de ácido.
For 10, Des 1, Con 7, Int 2, Sab 5, Car –4
Tesouro Nenhum.`
        },
        {
          chave: "fanaticoLefou", nome: "Fanático Lefou", nd: "5", tipo: "Monstro (lefou) Médio",
          papel: '',
          subgrupo: "Fanático Lefou",
          resumo: "Fanático Lefou — À primeira vista, parece um bárbaro empunhando um tacape e vestindo uma armadura rústica, ambas feitas com carapaça de algum monstro.",
          texto:
`Fanático Lefou ND 5
Monstro (lefou) Médio
Iniciativa +5, Percepção +4
Defesa 23, Fort +16, Ref +11, Von +6, resistência a efeitos mentais +3, resistência a efeitos lefeu e da Tormenta +5
Pontos de Vida 55
Deslocamento 9m (6q)
Corpo a Corpo Duas garras +22 (2d6+10) e mordida +22 (1d6+10).
Frenesi Insano Quando causa ou sofre dano, o fanático lefou recebe um bônus cumulativo de +2 em testes de ataque e rolagens de dano até o fim da cena.
✦ Mente Aberrante Quando faz um teste de Vontade para resistir a um efeito, o fanático causa 3d6 pontos de dano psíquico na criatura que gerou o efeito.
Sangue Ácido Quando o fanático sofre dano por um ataque corpo a corpo adjacente, o atacante sofre 5 pontos de dano de ácido.
For 5, Des 1, Con 2, Int –1, Sab 0, Car –2
Tesouro Metade.`
        },
        {
          chave: "liderFanaticoLefou", nome: "Líder Fanático Lefou", nd: "8", tipo: "Monstro (lefou) Médio",
          papel: '',
          subgrupo: "Fanático Lefou",
          resumo: "Fanático Lefou — À primeira vista, parece um bárbaro empunhando um tacape e vestindo uma armadura rústica, ambas feitas com carapaça de algum monstro.",
          texto:
`Líder Fanático Lefou ND 8
Monstro (lefou) Médio
Iniciativa +9, Percepção +8, visão no escuro
Defesa 33, Fort +20, Ref +15, Von +9, imunidade a acertos críticos, resistência a efeitos lefeu, da Tormenta e mentais +5
Pontos de Vida 90
Deslocamento 9m (6q), voo 21m (14q)
Corpo a Corpo Tacape +27 (3d10+20), mordida +27 (1d4+10) e duas patas insetoides +27 (1d4+10 corte).
Frenesi Insano Quando causa ou sofre dano, o fanático lefou recebe um bônus cumulativo de +2 em testes de ataque e rolagens de dano até o fim da cena.
✦ Mente Aberrante Quando faz um teste de Vontade para resistir a um efeito, o fanático causa 5d6 pontos de dano psíquico na criatura que gerou o efeito.
Sangue Ácido Quando o fanático sofre dano por um ataque corpo a corpo adjacente, o atacante sofre 9 pontos de dano de ácido.
For 5, Des 1, Con 2, Int –1, Sab 0, Car –2
Perícias Intimidação +11.
Equipamento Tacape. Tesouro Padrão.`
        },
        {
          chave: "reishid", nome: "Reishid", nd: "8", tipo: "Monstro (lefeu) Médio",
          papel: '',
          subgrupo: "Reishid",
          resumo: "Reishid — O líder do culto parece prestes a cravar um punhal enegrecido no coração da vítima acorrentada ao altar.",
          texto:
`Reishid ND 8
Monstro (lefeu) Médio
Iniciativa +17, Percepção +19, visão no escuro
Defesa 37, Fort +19, Ref +21, Von +10, redução de dano 10
Pontos de Vida 295
Deslocamento 9m (6q), escalada 9m (6q), voo 15m (10q)
Corpo a Corpo Adaga da Tormenta +30 (1d4+18, 19, mais 1d8 trevas), garra +30 (1d6+18) e mordida +30 (1d6+18 mais veneno).
Ataque em Movimento O reishid pode se mover antes e depois de executar a ação agredir, desde que a distância total percorrida não seja maior que seu deslocamento.
Ataque Reflexo (Reação) Uma vez por rodada, o reishid pode fazer um ataque corpo a corpo contra um alvo em seu alcance natural que esteja desprevenido ou que se mova voluntariamente para fora desse alcance.
Insanidade da Tormenta 2d6 PM (Von CD 26 evita).
Sombra Rubra Quando faz um teste de Iniciativa ou Furtividade, o reishid rola dois dados e usa o melhor resultado.
Veneno Paralisado por 1d6 horas (Fort CD 26 reduz para lento por 1d6 rodadas).
For 4, Des 7, Con 4, Int 4, Sab 4, Car 1
Perícias Furtividade +20.
Tesouro Padrão mais adaga da Tormenta. Esta é uma arma mágica específica que conta como uma adaga formidável tumular. Sua lâmina é longa e ondulada e seu cabo lembra uma carapaça. A adaga secreta muco adesivo pelo cabo, que mantém a arma firme na mão, fornecendo +5 em testes contra desarmar. Soltar uma adaga da Tormenta gasta uma ação de movimento.`
        },
        {
          chave: "reishidLiderDeCulto", nome: "Reishid Líder de Culto", nd: "12", tipo: "Monstro (lefeu) Médio",
          papel: '',
          subgrupo: "Reishid",
          resumo: "Reishid — O líder do culto parece prestes a cravar um punhal enegrecido no coração da vítima acorrentada ao altar.",
          texto:
`Reishid Líder de Culto ND 12
Monstro (lefeu) Médio
Iniciativa +19, Percepção +23, visão no escuro
Defesa 47, Fort +20, Ref +27, Von +13, redução de dano 10
Pontos de Vida 483
Deslocamento 9m (6q), escalada 9m (6q), voo 15m (10q)
Pontos de Mana 66
Corpo a Corpo Adaga da Tormenta +40 (1d4+21, 19, mais 1d8 trevas), garra +40 (2d6+21) e mordida +40 (2d6+21 mais veneno).
Ataque em Movimento O reishid líder de culto pode se mover antes e depois de executar a ação agredir, desde que a distância total percorrida não seja maior que seu deslocamento.
Insanidade da Tormenta 3d6 PM (Von CD 35 evita).
Magia Acelerada (Livre, +4 PM) Uma vez por rodada, quando lança uma magia com execução de ação completa ou menor, o reishid muda a execução dela para livre.
Sombra Rubra Quando faz um teste de Iniciativa ou Furtividade, o reishid rola dois dados e usa o melhor resultado.
Veneno Paralisado por 1d6 horas (Fort CD 35 reduz para lento por 1d6 rodadas).
Magias Como um clérigo de Aharadak de 12º nível (CD 35).
• Anular a Luz (Padrão, 6 PM) O reishid emana escuridão em uma esfera de 6m ao seu redor e faz um teste de Religião. Magias de 3º círculo ou inferior na área com CD igual ou menor que o teste são dissipadas, aliados na área recebem +4 na Defesa até o fim da cena e inimigos ficam enjoados por 1d4 rodadas (apenas uma vez por cena).
• Comando (Padrão, 4 PM) No início do seu próximo turno, duas criaturas em alcance curto largam os itens que estão segurando e não podem pegá-los novamente até o início de seu turno seguinte (Von evita).
• Marca da Obediência (Padrão, 6 PM) O reishid ordena que uma criatura adjacente não ataque a ele ou a seus aliados até o fim da cena (Von evita). A criatura pode repetir o teste de Vontade em cada um de seus turnos subsequentes mas, se falhar, sofre 3d6 pontos de dano psíquico.
For 4, Des 7, Con 5, Int 4, Sab 6, Car 1
Perícias Furtividade +27, Intimidação +11, Religião +21.
Tesouro Padrão mais adaga da Tormenta (veja Reishid).`
        },
        {
          chave: "senhorDoGiganteRubroFormaInicial", nome: "Senhor do Gigante Rubro forma inicial", nd: "9", tipo: "Monstro Grande",
          papel: '',
          subgrupo: "Senhor do Gigante Rubro",
          resumo: "Senhor do Gigante Rubro — O humanoide bruto em carapaça espinhosa e gotejante bem poderia ser apenas outra abominação da Tormenta.",
          texto:
`Senhor do Gigante Rubro forma inicial ND 9
Monstro Grande
Iniciativa +13, Percepção +15, percepção às cegas, não pode ser flanqueado
Defesa 34, Fort +21, Ref +15, Von +9, imunidade a acertos críticos, cansaço, efeitos de metabolismo, paralisia e veneno, redução de ácido, eletricidade, fogo, frio, luz e trevas 10, resistência a magia +5
Pontos de Vida 340
Deslocamento 12m (8q), escalada 9m (6q)
Corpo a Corpo Quatro garras +28 (1d8+11, 19/x3).
Carapaça Espinhosa Quando agarra uma criatura ou é agarrado, e no início de cada turno em que estiver agarrando ou agarrado, o gigante rubro causa 11 pontos de dano de perfuração nesta criatura.
Desembarcar (Completa) O senhor do gigante rubro pode sair de seu simbionte por curtos períodos. Isso o deixa fraco e, a cada hora de afastamento, o torna fatigado, exausto, inconsciente e por fim, morto. Voltar ao interior da armadura é uma ação completa e remove essas condições no início da rodada seguinte. Geralmente, o piloto do gigante é um iniciado da agonia (veja p. 52). Se o piloto for morto fora da armadura, ela se desintegra automaticamente.
Evoluções Cada gigante rubro possui duas habilidades, escolhidas entre as descritas a seguir.
• Dilacerar. Para cada dois ataques de garra que o gigante rubro acertar em uma mesma criatura no mesmo turno, ele causa mais 2d8+10 pontos de dano.
• Morte dos Céus (Movimento). O gigante rubro salta para um espaço desocupado em alcance médio. Se aterrissar adjacente a uma criatura, seu primeiro ataque contra ela neste turno recebe +2 no teste de ataque e causa +1d8 pontos de dano.
• Teia Corrosiva (Movimento). O gigante rubro dispara muco adesivo em uma criatura em alcance curto. A vítima sofre 3d6 pontos de dano de ácido e fica imóvel (Ref CD 28 reduz à metade e evita a condição). Enquanto estiver imóvel desta forma, a criatura sofre 3d6 pontos de dano de ácido no início de cada um de seus turnos. Ela pode se libertar com uma ação padrão e um teste de Acrobacia ou Atletismo (CD 28).
• Tentáculo. O gigante rubro possui um ataque adicional de tentáculo (como as garras, mas causa dano de impacto). Se ele acertar um ataque de tentáculo, pode fazer a manobra agarrar como uma ação livre (teste +30).
• Zunido Enlouquecedor (Reação). A cada 100 PV que perde, o gigante rubro emite um zunido em uma esfera de 30m ao seu redor. Criaturas nessa área perdem 2d8 PM (Von CD 28 evita).
For 11, Des 3, Con 9, Int –1, Sab 2, Car –2
Tesouro Nenhum.`
        },
        {
          chave: "senhorDoGiganteRubroFormaFinal", nome: "Senhor do Gigante Rubro Forma Final", nd: "16", tipo: "Monstro (lefeu) Grande",
          papel: '',
          subgrupo: "Senhor do Gigante Rubro",
          resumo: "Senhor do Gigante Rubro — O humanoide bruto em carapaça espinhosa e gotejante bem poderia ser apenas outra abominação da Tormenta.",
          texto:
`Senhor do Gigante Rubro Forma Final ND 16
Monstro (lefeu) Grande
Iniciativa +20, Percepção +21, percepção às cegas, não pode ser flanqueado
Defesa 55, Fort +30, Ref +26, Von +16, imunidade a acertos críticos, cansaço, efeitos de metabolismo, paralisia e veneno, redução de dano 15, resistência a magia +5
Pontos de Vida 850
Deslocamento 12m (8q), escalada 9m (6q)
Corpo a Corpo Quatro garras +43 (1d12+18 mais 1d6 matéria vermelha, 19/x3, sangramento) e dois tentáculos +43 (1d12+18 mais 1d6 matéria vermelha).
Agarrar Aprimorado (Livre) Tentáculo (teste +45).
Armamento Rubro As armas do gigante rubro são mágicas e de matéria vermelha. Criaturas atingidas pelas garras ficam sangrando e criaturas atingidas pelos tentáculos ficam fracas (ou debilitadas, se já estiverem fracas).
Carapaça Espinhosa Quando agarra uma criatura ou é agarrado, e no início de cada turno em que estiver agarrando ou agarrado, o gigante rubro causa 14 pontos de dano de perfuração nesta criatura.
Dilacerar Para cada dois ataques de garra que o gigante rubro acertar em uma mesma criatura no mesmo turno, ele causa mais 6d8+18 pontos de dano.
Insanidade da Tormenta 2d12 PM (Von CD 42 evita).
Morte dos Céus (Movimento) O gigante rubro salta para um espaço desocupado em alcance médio. Se aterrissar adjacente a uma criatura, seu primeiro ataque contra ela neste turno recebe +2 no teste de ataque e causa +2d8 pontos de dano.
Teia Corrosiva (Movimento) O gigante rubro dispara muco adesivo em uma criatura em alcance curto. A vítima sofre 8d6 pontos de dano de ácido e fica imóvel (Ref CD 42 reduz à metade e evita a condição). Enquanto estiver imóvel desta forma, a criatura sofre 3d6 pontos de dano de ácido no início de cada um de seus turnos. Ela pode tentar se libertar com uma ação padrão e um teste de Acrobacia ou Atletismo (CD 42).
Varrer (Livre) Uma vez por rodada, quando o gigante rubro faz um ataque corpo a corpo e reduz os pontos de vida do alvo para 0 ou menos, pode realizar um ataque adicional contra outra criatura dentro do seu alcance.
For 14, Des 4, Con 11, Int –2, Sab 2, Car –4
Tesouro 1d4 sementes rubras (CD 31 para extrair).`
        },
        {
          chave: "zyrrinaz", nome: "Zyrrinaz", nd: "5", tipo: "Monstro (lefeu) Médio",
          papel: '',
          resumo: "O vulto ligeiro bem poderia ser um elfo — ágil, delgado e empunhando um arco longo.",
          texto:
`Zyrrinaz ND 5
“Arqueiros! Os desgraçados têm ARQUEIROS! É o escárnio absoluto!”
— Isadorah Gaelan, elfa caçadora
O vulto ligeiro bem poderia ser um elfo — ágil, delgado e empunhando um arco longo. Quando termina seu salto, contudo, pode-se distinguir os olhos bulbosos e a pele-armadura sangrenta dos invasores. E aquilo que parecia ser um arco, na verdade, faz parte de seu braço. No passado, os primeiros avistamentos destas aberrações foram confundidos com ataques de elfos sinistros, algumas vezes levando a animosidades entre os povos. Os arcos orgânicos brotando de seus pulsos reforçaram ainda mais esse equívoco. Zyrrinaz estão entre os menores lefeu: têm estatura quase humana, mas a forma esguia e postura curvada os faz parecer pequenos. Seus arcos são funcionais, com corda feita de tendão, capazes de disparar “flechas” muito finas e pontiagudas que brotam de suas corcundas. Considerados fracos entre os lefeu, atuam como batedores ligeiros, perseguidores de fugitivos ou como apoio para legiões principais. Contudo, é comum que alguns cultos sejam agraciados com uma ou mais destas criaturas para proteger seus templos. Ali os zyrrinaz permanecem imóveis como gárgulas, prontos para disparar flechas mortais a um comando do cultista líder.
Monstro (lefeu) Médio
Iniciativa +10, Percepção +13, visão no escuro
Defesa 24, Fort +11, Ref +19, Von +7, redução de dano 5
Pontos de Vida 41
Deslocamento 12m (8q), escalada 12m (8q)
Corpo a Corpo Garra +19 (2d6+13).
À Distância Arco longo +23 (1d12+19, x3, mais 1d6 matéria vermelha).
Flechas da Anticriação O zyrrinaz é capaz de disparar por ângulos impossíveis, inutilizando as defesas de seus alvos. Seus ataques de arco ignoram cobertura, camuflagem, redução de dano e habilidades que evitam ou reduzem dano (como Durão ou Rolamento Defensivo). Além disso, quando ataca com seu arco, ele rola dois dados e usa o melhor resultado.
Insanidade da Tormenta 2d4 PM (Von CD 20 evita).
For 2, Des 6, Con 2, Int –1, Sab 4, Car –3
Perícias Acrobacia +10, Furtividade +10.
Equipamento Arco longo, flechas de matéria vermelha x20.
Tesouro Nenhum.`
        },
        {
          chave: "avatarDeAharadak", nome: "Avatar de Aharadak", nd: "S", tipo: "Monstro (lefeu) Colossal",
          papel: '',
          resumo: "Grande como um castelo, a monstruosidade parece formada por incontáveis camadas de gordura e crostas vermelhas, rasgadas por fístulas que…",
          texto:
`Avatar de Aharadak ND S
“Contemplem! O bem maior só pode ser alcançado através do maior poder.”
— Allanthar, humano arcanista
Grande como um castelo, a monstruosidade parece formada por incontáveis camadas de gordura e crostas vermelhas, rasgadas por fístulas que revelam carne esponjosa e vazam muco oleoso. Muitas pequenas asas agitam-se nervosas, inúteis, incapazes de erguer o corpanzil grotesco. No alto, bocarras que mudam de quantidade a cada olhar, todas com várias fileiras de dentes afiados. Em meio a esse caos, um único e imenso olho vermelho. O olho de Aharadak. Como deus maior, Aharadak agora é capaz de manifestar um avatar — uma versão encarnada da divindade, construída com grande parte de sua essência. Avatares estão entre os seres mais poderosos a caminhar em Arton, mas sua manifestação é um recurso raro, reservado apenas a situações extremas: para criá-lo, um deus investe parte significativa de sua força vital, e sua eventual perda vai enfraquecer a própria divindade. Embora as regras sobre isso sejam misteriosas, suspeita-se que um deus possa manifestar apenas um avatar por vez, e a intervalos de vários dias, semanas ou meses. Assim, o avatar de Aharadak vai surgir quando seus devotos mais importantes (como o sumo-sacerdote) implorarem por auxílio, ou quando o próprio Deus da Tormenta tiverem interesse pessoal em confrontar heróis épicos.
Monstro (lefeu) Colossal
Iniciativa +18, Percepção +30, percepção às cegas (longo)
Defesa 70, Fort +36, Ref +31, Von +31, redução de dano 20
Pontos de Vida 2.804
Deslocamento voo 18m (12q)
Corpo a Corpo Quatro tentáculos +58 (4d12+47) e mordida +58 (6d12+47).
Agarrar Aprimorado (Livre) Tentáculo (teste +68). O avatar de Aharadak pode manter até 4 criaturas Enormes ou menores agarradas ao mesmo tempo.
Centelha Divina O avatar pode lançar qualquer magia divina como um clérigo de 20º nível sem gastar PM (CD 52, limite de PM 20).
Devorar a Existência Uma criatura atingida por um ataque corpo a corpo do avatar perde 1d4 PM. Se não tiver PM suficientes, a criatura fica fascinada.
Engolir (Padrão) No início de cada um dos turnos do avatar, em vez de sofrer dano, a criatura engolida deve fazer um teste de Vontade (CD 52). Se passar, aparece em um local aleatório em alcance médio, debilitada e confusa por 1d4 rodadas. Se falhar, perde todos os seus pontos de mana ou, se não tiver mais PM, é transportada para o Reino de Aharadak. Ela pode escapar causando um total de 250 pontos de dano a ele (Defesa 30, redução de dano 5).
Insanidade da Tormenta 2d20 PM (Von CD 52 evita). Esta habilidade pode afetar mesmo criaturas que já foram afetadas pela Insanidade da Tormenta de outras criaturas neste dia.
Presença da Tormenta O avatar emana uma aura com 30m de raio. Cada criatura que comece seu turno nessa área fica esmorecida (CD 25 +2 por turno consecutivo evita). Além disso, nessa área o custo em PM de habilidades aumenta em +2 e cada item encantado perde um encanto (à escolha do portador). Por fim, no início de cada turno do avatar, ocorre um efeito entre os descritos a seguir (role 1d6 para determiná-lo).
1) Definhamento. Criaturas na área perdem 10d8 pontos de vida e ficam debilitadas (Fort CD 52 evita).
2) Tempestade Elétrica. Cada criatura na área deve rolar 1d20. Em um resultado ímpar, é atingida por um relâmpago, sofrendo 5d8 pontos de dano de eletricidade e 5d8 pontos de dano de trevas.
3) Chuva Ácida. Nuvens rubras despejam torrentes de ácido sangrento e corrosivo. Criaturas na área sofrem 4d8 pontos de dano de ácido.
4) Labaredas Infernais. Cada criatura na área deve rolar 1d20. Em um resultado ímpar, entra em combustão, sofrendo 5d8 pontos de dano de fogo e 5d8 pontos de dano de trevas (Ref CD 52 reduz à metade).
5) Pesadelos Reais. Cada criatura na área deve fazer um teste de Vontade (CD 52). Se falhar, enxerga seu maior pesadelo e fica apavorada. Enquanto estiver sob essa condição, a vítima deve fazer um novo teste de Vontade no início de cada um de seus turnos. Se falhar, sofre 6d8 pontos de dano psíquico e perde 1d8 PM. O pesadelo (e a condição) termina se a criatura passar em dois testes de Vontade em sequência.
6) Magia Caótica. O avatar anula todas as magias na área. Enquanto este efeito durar, qualquer criatura que tente lançar uma magia precisa fazer um teste de Vontade (CD 52). Se falhar, a magia não tem efeito (mas os PM são gastos mesmo assim). Em uma falha por 5 ou mais, a energia mágica explode, causando 4d8 pontos de dano de essência ao conjurador.
For 20, Des –2, Con 12, Int 4, Sab 10, Car –1
Tesouro Nenhum.`
        },
      ],
      regras: [
        { titulo: "Acólito da Agonia",
          texto:
`“Sabe quem sou? Pois deveria. Combatendo a Tempestade Rubra, me tornei lenda!”
— Saystar Windwalker, sílfide abençoada de Wynna
A figura em mantos ensanguentados, empunhando uma lâmina enferrujada, bem poderia ser um açougueiro saindo do abatedouro. A loucura da Tormenta é clara em seus olhos injetados. Mas o mais assustador são as cicatrizes em seu rosto e braços; de alguma forma, vocês sabem que foram infligidas por ele próprio. Outros deuses guardam ao menos alguma semelhança com os habitantes de Arton, mas Aharadak é uma aberração cósmica indecifrável. Após alcançar a divindade, ninguém tem ideia de seus próximos objetivos — ou quase ninguém. Seus devotos dizem receber revelações em pesadelos, conhecer esse glorioso mistério. Se isso é verdade, ou apenas outra alucinação febril da Tormenta, impossível dizer. O fato é que muitos devotos de Aharadak acreditam aprazer sua divindade com dor e sofrimento — de suas vítimas ou, na sua falta, deles próprios. Quando não capturam inocentes para rituais de mutilação e sadismo, laceram a própria carne como oferenda profana. Neste último caso, grupos de acólitos podem atacar aventureiros simplesmente para causar dor, derramar sangue (não importa de quem) e assim aplacar o apetite infinito do Devorador.` },
        { titulo: "Fanático Lefou",
          texto:
`“Pela última vez, NÃO SÃO seres humanos! Não mais! Estão além de qualquer redenção!”
— Ogmond Andarr, cavaleiro de Khalmyr
À primeira vista, parece um bárbaro empunhando um tacape e vestindo uma armadura rústica, ambas feitas com carapaça de algum monstro. Um olhar atento revela a terrível verdade: não são arma e armadura, mas crostas em seu próprio corpo. Ele tem a mácula! O culto de Aharadak vem se espalhando como uma doença — o que realmente é —, não sendo surpresa que muitos lefou escolham abraçá-lo. Se antes um meio-demônio da Tormenta temia os deuses, agora ele tem uma divindade criadora a quem recorrer. Contudo, certos relatos terríveis sugerem que um fenômeno novo vem ocorrendo: ao cultuar o Devorador, humanos e outros povos acabam transformados em lefou! Rancorosos contra a civilização que sempre os odiou e temeu, os fanáticos lefou encontraram agora um propósito para suas vidas malditas: abraçar por completo as crenças e objetivos do culto. Clamam pela chegada da Tormenta, vandalizam templos de outras igrejas, profanam tudo que é sagrado. Os mais brutos apenas atacam tudo e todos, muitas vezes atuando como soldados obedientes a um alto sacerdote da agonia. Outros fanáticos, mais astutos, lideram seus semelhantes em bandos selvagens para devastar vilarejos em busca de vingança.` },
        { titulo: "Reishid",
          texto:
`“Perdi minha família para a Tormenta. Hoje, criatura, a Tormenta perderá você.”
— Ahnöc aus Herford, paladino de Azgher
O líder do culto parece prestes a cravar um punhal enegrecido no coração da vítima acorrentada ao altar. Quando vocês se aproximam, podem ver que o rosto cruento sob o capuz não pertence a este mundo. Percebem também que ele não segura um punhal comum, mas uma arma orgânica, com lâmina viscosa e cabo como uma carapaça. Tempos atrás, quando manifestações da Tormenta eram ainda incomuns longe de suas áreas, estes monstros furtivos estavam entre os poucos lefeu encontrados em terras civilizadas. Isto é, quando podiam ser reconhecidos. Um reishid tem o aspecto insetoide típico dos invasores, mas com proporções humanas. Longas asas membranosas e escuras, mantidas juntas ao corpo, o deixam parecido com uma pessoa de manto e capuz — ilusão reforçada pela própria mente racional do observador, incapaz de enxergar ou aceitar a verdadeira forma dos lefeu. Assim ele percorre as estradas e cidades artonianas, despercebido, em missões secretas para seus mestres. Não raras vezes, liderar cultos a Aharadak está entre essas atribuições. Reishid costumam agir sozinhos, mas também podem ser encontrados em duplas ou pequenos bandos.` },
        { titulo: "Senhor do Gigante Rubro",
          texto:
`“Não ataquem! Estão vendo o mesmo que eu? Uma pessoa! DENTRO daquela coisa!”
— Engelisa, golem clériga de Lena
O humanoide bruto em carapaça espinhosa e gotejante bem poderia ser apenas outra abominação da Tormenta. No entanto, através de frestas e transparências, pode-se entrever um humano sendo devorado pela aberração… ou usando-a como armadura. Entre as duvidosas “dádivas” oferecidas por Aharadak a seus devotos, o gigante rubro está entre as mais perigosas. Esta criatura tem a forma de uma armadura orgânica, feita de matéria vermelha viva e pulsante, capaz de envolver e acomodar um humanoide Pequeno ou Médio em seu interior. Uma vez realizada a união, hospedeiro e parasita (ou simbionte, como insistem alguns estudiosos) tornam-se uma máquina de combate quase imbatível. Apenas alguém completamente entregue à Tormenta pode receber o gigante rubro — e mesmo para estes a comunhão total com o artefato aberrante leva tempo. Quanto mais o hospedeiro permanece na armadura, mais poderosos ambos se tornam. Em seus estágios iniciais ainda é possível destruir o simbionte e remover a vítima. Mas após alguns meses, quando a união alcança sua forma definitiva, nada resta do corpo e da mente mortais que ali existiam. Um ou mais senhores do gigante rubro podem ser encontrados atuando como guarda-costas de elite para um alto sacerdote da agonia. Quando atingem sua forma final, contudo, rivalizam em poder com os mais poderosos monstros lefeu, até liderando seus próprios batalhões.` },
        { titulo: "Dolorosa Separação",
          texto:
`É possível remover um piloto inconsciente de um gigante rubro com um teste de Cura (CD 20) que exige uma hora de trabalho árduo. Para prevenir as condições do afastamento é necessário fazer um teste de Cura (CD 20) a cada hora, ou usar a magia Purificação. Separar a conexão mental do piloto com a armadura é um tratamento mais complexo. Isso é um teste estendido de Misticismo (CD 20) que exige 5 sucessos, cada teste representando um dia de cuidados. Em caso de falha no teste estendido, é possível começar o processo novamente, mas com uma penalidade cumulativa de –5. Se ambas as etapas forem bem-sucedidas, o piloto estará livre da dependência do gigante rubro. Entretanto, se voltar a embarcar na armadura, será necessário recomeçar o processo do zero. Por isso, recuperar a saúde física e mental de alguém que passou pela simbiose é uma tarefa árdua. Infelizmente, separar um piloto de um gigante rubro em sua forma final é impossível; neste estágio, ambos se tornam um único lefeu.` },
        { titulo: "Templos de Aharadak",
          texto:
`“Sim, é um lugar de pesadelo. Mas talvez encontre ali as respostas que procuro.”
— Leinuwe, meio-elfo ladino
A ascensão de Aharadak ao Panteão permitiu a este Lorde da Tormenta transformar seu culto depravado, outrora restrito a pequenos círculos de cultistas velados, em uma verdadeira religião. E ainda que seus devotos não sejam aceitos em todos os lugares, lentamente templos em sua homenagem são erguidos em diversos cantos de Arton. Verdadeiras casas de adoração ao horror incompreensível que é a Tormenta, cada igreja é como uma janela para a Anticriação, uma pequena amostra da depravação e perversidade lefeu.
Templos de Aharadak ainda são raros, a maioria das nações e comunidades os rejeita — o maior publicamente conhecido está em Ahar’kadhan, a Cidade na Tormenta. Ainda assim, os templos prosperam em meio aos ermos, ocultos nos subterrâneos ou sob a fachada de instituições respeitáveis. Em todos os casos, seu interior abriga uma amostra de toda a devassidão que a Tormenta planeja trazer ao mundo. A aparência externa dos templos de Aharadak depende de sua localização. Onde a discrição é necessária, adotam a arquitetura local, buscando se esquivar de atenção indesejada. Em outras situações, contudo, erguem-se em edificações opressivas, macabras, orgânicas, como se feitas com partes de criaturas horrendas. Sob olhar prolongado, parecem pulsar ou respirar. O interior é ainda mais caótico e incompreensível — qualquer grupo de aventureiros juraria ser mais assustador que a pior das masmorras. É como estar no vestíbulo de um inferno rubro, colocando em risco a própria essência daquilo que define cada ser. Entrar em um templo de Aharadak causa os efeitos a seguir a criaturas que não sejam seus devotos, lefeu ou lefou.
• Cada personagem é exposto à Insanidade da Tormenta (2d8 PM, Von CD 30 evita), como se o templo fosse um lefeu de ND 10 (veja Tormenta20, p. 315).
• Custo em mana de habilidades aumenta em +1 PM.
• Itens mágicos encantados perdem um de seus encantos (à escolha do portador); pode-se gastar 1 PM no início de cada cena para evitar este efeito durante a cena.
• Pela arquitetura perturbadora, testes relacionados ao ambiente (como Atletismo para escalar uma parede, Força para empurrar uma porta ou Ladinagem para arrombar uma fechadura) têm 25% de chance de falha e causam a perda de 1 PM (mesmo em caso de sucesso).
• Um personagem com PM esgotados fica frustrado pelo dia. Cada nova perda de PM deteriora sua condição para esmorecido, depois confuso e por fim insano — neste ponto, torna-se um NPC maligno sob controle do mestre.` },
        { titulo: "Lefeu e Almas",
          texto:
`Humanos e outros seres mortais são compostos por uma parte material e uma parte espiritual — ou seja, corpo e alma. Quando ocorre a morte, a alma se separa do corpo, tornando-se um espírito (um tipo de criatura que não tem corpo e alma como elementos separados). Essa alma então viaja para os reinos dos deuses, rumo a um destino que pode depender de suas devoções, vontade divina, ou outros fatores misteriosos. Em sua própria Anticriação, os lefeu derrotaram todas as coisas. Derrotaram a vida e a morte, o tempo e o espaço, os universos, a própria individualidade. Ocuparam tudo, tornaram-se tudo. Um multiverso consciente. Lá, não existe diferença entre vivo e não vivo. Tudo é lefeu. Embora adquiram certo grau de individualidade quando chegam a Arton, a simples noção de corpo e alma separados deixou de existir entre os lefeu há eras. Lefeu não têm alma. Por isso, são imunes à magia Roubar a Alma e efeitos semelhantes.` },
        { titulo: "Dádivas de Aharadak",
          texto:
`Os devotos favoritos do Devorador são muitas vezes recompensados com simbiontes — um tipo especial de criatura lefeu. São pequenos, na forma de ovos, casulos, larvas ou vermes. Quando encontram um hospedeiro (voluntário, indefeso ou inconsciente), lançam raízes em sua carne e penetram a ponto de tornar impossível a remoção. A partir de então causam mudanças extremas em sua anatomia, permitindo ao portador manifestar variados poderes aberrantes. Cada simbionte ocupa o espaço de um item vestido e conta como dois poderes da Tormenta. Sempre que um simbionte é implantado, o hospedeiro faz um teste de Constituição (CD 10, +1 para cada outro poder da Tormenta que possuir). Se passar, o simbionte funciona normalmente. Se falhar, entretanto, a ligação não surte os efeitos desejados; o simbionte ocupa o espaço de um item vestido e causa a perda de 1 ponto de Carisma. Não existem meios conhecidos de remover um simbionte. Apesar de sua origem sinistra, existe mercado para simbiontes em suas formas larvais, ainda não unidos a hospedeiros. São considerados itens valiosos, que não podem ser roubados (nem removidos). Aventureiros realizam expedições em busca de ninhos onde costumam ser encontrados. Mas é sempre raro achá-los à venda, mesmo em lugares como Vectora.` },
        { titulo: "O Poder dos Lefeu",
          texto:
`Todas as criaturas com o subtipo lefeu possuem as habilidades lefeu descritas na seção “A Tormenta” (Tormenta20, p. 315).` },
      ],
    },

    // ── 🐉 DRAGÕES ─────────────────────────────────────
    {
      chave: "dragoes", nome: "Dragões", icone: "🐉", cor: "#a8641c",
      intro: "Até tempos recentes, na ausência de seu criador divino, os dragões encontravam igualdade entre aqueles com quem partilhavam atributos semelhantes. Mesmas cores de escamas, mesma energia elemental queimando no sangue e exalando no sopro terrível. Reuniam-se como clãs e até mesmo partilhavam personalidades, preferências e aversões. Isso mudou. Primeiro, devido ao altíssimo morticínio de dragões ocorrido em 1405, durante batalhas épicas entre Arton e a Tormenta. Segundo, graças à volta de Kallyadranoch ao Panteão como um deus maior, na mesma época. Embora ainda falte ao Deus dos Dragões restaurar sua forma e força plenas, a reascensão ao posto divino já bastou para afetar todos os seres dracônicos de alguma forma. Como se a volta do Terceiro servisse de fortificação às suas naturezas, os dragões se tornaram ainda mais únicos, solitários e territoriais, ainda mais confiantes na própria soberania. Hoje existem dragões de todos os tipos e aspectos, e eles não mais aceitam alianças, muito menos submissão — exceto ao próprio Kallyadranoch ou suas crias diretas, os Dragões-Reais. Grupos de dragões ainda existem, mas são muitíssimo escassos; apenas no reino divino de Drashantyr, com sua vasta população dracônica, eles ainda formam sociedades. Em Arton, apenas os dragões mais jovens andam em bandos. Quanto aos adultos, seguem solitários, supremos e eternos.",
      comuns: { titulo: "Habilidades Dracônicas", aplicaSe: "(dragão)", nota: "Todas as fichas de dragão; cada uma já traz a CD da Aura Aterradora e o Sopro próprio." },
      fichas: [
        {
          chave: "dragaoFilhoteDoBosque", nome: "Dragão Filhote do Bosque", nd: "3", tipo: "Monstro (dragão) Médio",
          papel: '',
          subgrupo: "Dragão Menor",
          resumo: "Dragão Menor — O lagarto escamoso e colorido, do tamanho de um grande cão, emerge da caverna com um olhar ansioso.",
          texto:
`Dragão Filhote do Bosque ND 3
Monstro (dragão) Médio
Iniciativa +8, Percepção +6, percepção às cegas, visão no escuro
Defesa 21, Fort +14, Ref +3, Von +10, imunidade a ácido, resistência a magia +1, vulnerabilidade a eletricidade
Pontos de Vida 120
Deslocamento 12m (8q), voo 18m (12q)
Corpo a Corpo Mordida +14 (2d6+4) e duas garras +14 (1d6+4).
Bote (Completa) O dragão filhote do bosque faz uma investida e ataca com sua mordida e suas duas garras. Os três ataques recebem o bônus de +2 da investida, mas devem ser feitos contra o mesmo alvo.
Sopro (Padrão) Todas as criaturas numa esfera de 3m em alcance curto sofrem 2d12 pontos de dano de ácido e ficam vulneráveis por 1d4 rodadas (Ref CD 18 reduz à metade e evita a condição). Recarga (movimento).
For 3, Des 3, Con 2, Int –1, Sab 1, Car 0
Perícias Furtividade +7.
Tesouro Padrão.`
        },
        {
          chave: "dragaoFilhoteDosRios", nome: "Dragão Filhote dos Rios", nd: "3", tipo: "Monstro (dragão) Grande",
          papel: '',
          subgrupo: "Dragão Menor",
          resumo: "Dragão Menor — O lagarto escamoso e colorido, do tamanho de um grande cão, emerge da caverna com um olhar ansioso.",
          texto:
`Dragão Filhote dos Rios ND 3
Monstro (dragão) Grande
Iniciativa +9, Percepção +6, percepção às cegas, visão no escuro
Defesa 22, Fort +12, Ref +6, Von +10, imunidade a eletricidade, resistência a magia +1, vulnerabilidade a ácido
Pontos de Vida 120
Deslocamento 12m (8q), natação 18m (12q)
Corpo a Corpo Mordida +13 (2d6+4) e duas garras +13 (1d6+4).
Sopro (Completa) Todas as criaturas em um cone de 6m sofrem 2d12 pontos de dano de eletricidade e ficam ofuscadas por 1d4 rodadas (Ref CD 18 reduz à metade e evita a condição). Recarga (movimento).
For 3, Des 4, Con 3, Int 0, Sab 0, Car 0
Tesouro Padrão.`
        },
        {
          chave: "ninhadaDeDragoesFilhotes", nome: "Ninhada de Dragões Filhotes", nd: "5", tipo: "Monstro (dragão) Grande",
          papel: '',
          subgrupo: "Dragão Menor",
          resumo: "Dragão Menor — O lagarto escamoso e colorido, do tamanho de um grande cão, emerge da caverna com um olhar ansioso.",
          texto:
`Ninhada de Dragões Filhotes ND 5
Monstro (dragão) Grande
Iniciativa +9, Percepção +7, percepção às cegas, visão no escuro
Defesa 25, Fort +14, Ref +8, Von +12, imunidade a fogo, resistência a magia +1, vulnerabilidade a frio
Pontos de Vida 240
Deslocamento 12m (8q), voo 18m (12q)
Corpo a Corpo [Bando] Mordida +18 (4d6+8) e duas garras +18 (2d6+8).
Avalanche de Escamas Se a ninhada de filhotes acertar os dois ataques de garra em uma mesma criatura Grande ou menor na mesma rodada, a vítima fica caída e agarrada. A ninhada pode manter uma criatura agarrada desta forma, e não perde o uso de nenhuma de suas armas naturais para isso.
Sopro Duplo (Completa) A ninhada sopra dois cones de 6m em direções diferentes. Todas as criaturas nessas áreas sofrem 4d12 pontos de dano de fogo e ficam em chamas (Ref CD 21 reduz à metade e evita a condição). Recarga (movimento).
For 4, Des 3, Con 3, Int 0, Sab 0, Car 0
Tesouro Padrão.`
        },
        {
          chave: "dragaoJovemDaProtecao", nome: "Dragão Jovem da Proteção", nd: "7", tipo: "Monstro (dragão) Grande",
          papel: '',
          subgrupo: "Dragão Menor",
          resumo: "Dragão Menor — O lagarto escamoso e colorido, do tamanho de um grande cão, emerge da caverna com um olhar ansioso.",
          texto:
`Dragão Jovem da Proteção ND 7
Monstro (dragão) Grande
Iniciativa +11, Percepção +11, percepção às cegas, visão no escuro
Defesa 32, Fort +20, Ref +9, Von +12, fortificação 25%, imunidade a eletricidade, redução de dano 5, resistência a magia +2, vulnerabilidade a ácido
Pontos de Vida 320
Deslocamento 12m (8q), voo 18m (12q)
Corpo a Corpo Mordida +25 (2d6+14, 19) e duas garras +25 (1d8+14, 19).
Asas Guardiãs (Movimento) Todos os aliados adjacentes ao dragão recebem redução de dano 5 até o fim da cena.
Sopro (Padrão) Todas as criaturas em uma linha de 12m sofrem 6d12 pontos de dano de eletricidade e ficam ofuscadas por 1d4 rodadas (Ref CD 25 reduz à metade e evita a condição). Cada vez que rolar o valor máximo em um dado do sopro, role um dado extra e some ao dano total do sopro. Recarga (movimento).
For 7, Des 2, Con 6, Int 2, Sab 2, Car 2
Perícias Diplomacia +11.
Tesouro Dobro e 2 peças de couro de dragão (CD 22 para extrair).`
        },
        {
          chave: "dragaoJovemDoOcaso", nome: "Dragão Jovem do Ocaso", nd: "7", tipo: "Monstro (dragão) Grande",
          papel: '',
          subgrupo: "Dragão Menor",
          resumo: "Dragão Menor — O lagarto escamoso e colorido, do tamanho de um grande cão, emerge da caverna com um olhar ansioso.",
          texto:
`Dragão Jovem do Ocaso ND 7
Monstro (dragão) Grande
Iniciativa +11, Percepção +12, percepção às cegas, visão no escuro
Defesa 31, Fort +20, Ref +9, Von +15, imunidade a frio, redução de dano 5, resistência a magia +2, vulnerabilidade a fogo
Pontos de Vida 320
Deslocamento 12m (8q), voo 18m (12q)
Corpo a Corpo Mordida +24 (2d6+14, 19) e duas garras +24 (1d8+14, 19).
Mordida Definhante Uma criatura atingida pela mordida do dragão jovem do ocaso fica alquebrada (Von CD 25 evita e a criatura não pode mais ser afetada por esta habilidade até o fim da cena).
Sopro (Padrão) Todas as criaturas em um cone de 9m sofrem 6d12 pontos de dano de frio e ficam lentas por 1d4 rodadas (Ref CD 25 reduz à metade e evita a condição). Recarga (movimento).
Ver o Fim O dragão percebe automaticamente a presença, posição e status de criaturas em alcance médio, como o efeito básico da magia Condição.
For 5, Des 3, Con 5, Int 3, Sab 3, Car 2
Perícias Intimidação +11.
Tesouro Dobro e 2 peças de couro de dragão (CD 22 para extrair).`
        },
        {
          chave: "dragaoAdultoDaTirania", nome: "Dragão Adulto da tirania", nd: "11", tipo: "Monstro (dragão) Enorme",
          papel: '',
          subgrupo: "Dragão Adulto",
          resumo: "Dragão Adulto — Imenso e soberano, o monstro alado mergulha dos céus, as escamas alvas brilhando como os picos nevados das Uivantes.",
          texto:
`Dragão Adulto da tirania ND 11
Monstro (dragão) Enorme
Iniciativa +12, Percepção +15, percepção às cegas, visão no escuro
Defesa 42, Fort +24, Ref +11, Von +20, imunidade a dano de luz, redução de dano 10, resistência a magia +3, vulnerabilidade a trevas
Pontos de Vida 614
Deslocamento 12m (8q), voo 24m (16q)
Pontos de Mana 77
Corpo a Corpo Mordida +34 (4d10+25, 18) e duas garras +34 (3d10+25, 18).
Aura Aterradora Vontade CD 32 evita.
Imposição Avassaladora (Livre) Uma vez por rodada, quando o dragão da tirania reduz os pontos de vida de um inimigo para 0 ou menos, os outros inimigos em alcance médio sofrem 4d12 pontos de dano psíquico (Von CD 32 reduz à metade). Medo.
Sopro (Padrão) Criaturas em uma linha de 18m sofrem 12d12 pontos de dano de luz e ficam cegas por 1d4 rodadas (Ref CD 32 reduz à metade e evita a condição). Uma criatura só pode ficar cega por esta habilidade uma vez por cena. Recarga (movimento).
Magias Como um conjurador arcano de 11º nível (CD 32).
• Campo de Força (Reação, 4 PM) Quando sofre dano, o dragão recebe redução de dano 30 contra este dano.
• Desespero Esmagador (Padrão, 11 PM) Criaturas em um cone de 6m ficam debilitadas e esmorecidas até o fim da cena e pasmas por 1 rodada (Von evita a condição pasmo e reduz as demais para 1 rodada).
• Dissipar Magia (Padrão, 3 PM) O dragão escolhe uma criatura, objeto ou esfera de 3m em alcance médio e faz um teste de Misticismo. Todas as magias nesse alvo com CD igual ou menor que o resultado do teste são dissipadas.
• Enfeitiçar (Padrão, 1 PM) Um humanoide em alcance curto fica enfeitiçado (Von anula).
• Luz (Padrão, 1 PM) Uma criatura fica ofuscada pela cena (Von anula).
• Tempestade Divina (Completa, 9 PM, sustentada) Só pode ser lançada em ambientes abertos. Um vendaval com chuva (veja Tormenta20, p. 208) preenche um cilindro de 90m de raio e 90m de altura. Nessa área, criaturas invisíveis têm sua silhueta revelada, criaturas Médias ou menores ficam lentas e criaturas voadoras precisam passar num teste de Atletismo por rodada ou caem no solo.
For 11, Des 1, Con 8, Int 4, Sab 4, Car 4
Perícias Atletismo +32, Intimidação +15, Misticismo +15.
Tesouro Dobro e 4 peças de couro de dragão (CD 26 para extrair).`
        },
        {
          chave: "dragaoAdultoDosSegredos", nome: "Dragão Adulto dos Segredos", nd: "11", tipo: "Monstro (dragão) Enorme",
          papel: '',
          subgrupo: "Dragão Adulto",
          resumo: "Dragão Adulto — Imenso e soberano, o monstro alado mergulha dos céus, as escamas alvas brilhando como os picos nevados das Uivantes.",
          texto:
`Dragão Adulto dos Segredos ND 11
Monstro (dragão) Enorme
Iniciativa +14, Percepção +17, percepção às cegas, visão no escuro
Defesa 40, Fort +13, Ref +17, Von +25, imunidade a trevas, redução de dano 10, resistência a magia +3, vulnerabilidade a luz
Pontos de Vida 522
Deslocamento 12m (8q), voo 24m (16q)
Pontos de Mana 90
Corpo a Corpo Mordida +33 (3d12+20, 18) e duas garras +35 (2d12+20, 18).
Aura Aterradora Vontade CD 32 evita.
Enxergar as Farsas O dragão adulto dos segredos está permanentemente sob o efeito básico da magia Visão da Verdade.
Esmiuçar a Alma Quando uma criatura fica abalada pelo dragão, ele enxerga seus segredos mais profundos. Além de obter quaisquer informações que o mestre julgue adequadas, até o fim da cena o dragão recebe +2 em testes de perícia contra aquela criatura e passa automaticamente em testes de Intuição contra ela.
Magia Ampliada (Livre, +2 PM) Quando lança uma magia, o dragão aumenta seu alcance em um passo (de curto para médio, de médio para longo) ou dobra sua área de efeito.
Sopro (Padrão) Criaturas numa esfera de 9m em alcance médio do dragão sofrem 12d12 pontos de dano de trevas e ficam enjoadas por 1d4 rodadas (Ref CD 38 reduz à metade e evita a condição). Uma criatura só pode ficar enjoada por esta habilidade uma vez por cena. Recarga (movimento).
Magias Como um conjurador arcano de 11º nível (CD 35).
• Campo de Força (Reação, 7 PM) Quando sofre dano, o dragão recebe redução de dano 50 contra este dano.
• Compreensão (Padrão, 4 PM) O dragão vasculha os pensamentos de um alvo em alcance curto para extrair informações (Von anula).
• Criar Ilusão (Padrão, 9 PM) O dragão pode criar ilusões com imagens e sons combinados em alcance médio. A ilusões podem ocupar até 9 cubos de 1,5m e também podem criar sensações táteis, como texturas. Criaturas que não saibam que essas são ilusões não conseguem atravessá-las. As ilusões ainda são incapazes de causar e sofrer dano (Von desacredita e permite atravessar as ilusões).
• Desespero Esmagador (Padrão, 8 PM) Criaturas num cone de 6m ficam debilitadas e esmorecidas pela cena (Von reduz para 1 rodada).
• Dissipar Magia (Padrão, 3 PM) O dragão escolhe uma criatura, objeto ou esfera de 3m em alcance médio e faz um teste de Misticismo. Todas as magias nesse alvo com CD igual ou menor que o resultado do teste são dissipadas.
• Escuridão (Padrão, 3 PM) Uma criatura em alcance curto fica cega pela cena (Fort reduz para 1 rodada).
• Marca da Obediência (Padrão, 6 PM) O dragão ordena que uma criatura adjacente não ataque a ele ou a seus aliados até o fim da cena (Von evita). A criatura pode repetir o teste de Vontade em cada um de seus turnos subsequentes mas, se falhar, sofre 3d6 pontos de dano psíquico.
For 7, Des 1, Con 6, Int 8, Sab 6, Car 6
Perícias Conhecimento +19, Enganação +17, Intimidação +17, Intuição +25, Misticismo +19.
Tesouro Dobro e 4 peças de couro de dragão (CD 26 para extrair).`
        },
        {
          chave: "dragaoVeneravelDaEquidade", nome: "Dragão Venerável da Equidade", nd: "15", tipo: "Monstro (dragão) Enorme",
          papel: '',
          subgrupo: "Dragão Venerável",
          resumo: "Dragão Venerável — A fera é gigantesca, mas ainda assim move-se com elegância e altivez impressionantes.",
          texto:
`Dragão Venerável da Equidade ND 15
Monstro (dragão) Enorme
Iniciativa +16, Percepção +22, percepção às cegas, visão no escuro
Defesa 52, Fort +28, Ref +15, Von +22, imunidade a dano de luz, redução de dano 15, resistência a magia +4, vulnerabilidade a trevas
Pontos de Vida 800
Deslocamento 12m (8q), voo 24m (16q)
Pontos de Mana 97
Corpo a Corpo Mordida +44 (4d12+40, 17) e duas garras +44 (3d12+40, 17).
Aura Aterradora Vontade CD 40 evita.
Equalizar (Reação, 3 PM) Quando uma criatura (incluindo o dragão) em alcance médio faz um teste, ela o refaz, escolhendo 10 em vez de rolar o dado (Von 32 evita).
Magia Acelerada (Livre, +4 PM) Uma vez por rodada, quando lança uma magia com execução de ação completa ou menor, o dragão muda a execução dela para livre.
Restabelecer a Igualdade (Reação) Uma vez por rodada, quando sofre um ataque ou uma magia de um inimigo, o dragão pode fazer um ataque ou lançar uma de suas magias (conforme a ação sofrida) contra esse inimigo.
Sopro (Padrão) Todas as criaturas em um cone de 15m sofrem 16d12 pontos de dano de luz e ficam cegas por 1d4 rodadas (Ref CD 40 reduz à metade, evita a condição e a criatura não pode mais ficar cega por esta habilidade pela cena). Recarga (movimento).
Magias O dragão venerável lança magias como um conjurador arcano de 15º nível (CD 40).
• Círculo da Justiça (Completa, 6 PM) Criaturas numa esfera de 9m em alcance curto sofrem –20 em testes de Acrobacia, Enganação, Furtividade e Ladinagem, e não podem mentir deliberadamente (Von reduz a penalidade para –10 e permite mentir).
• Curar Ferimentos (Padrão, 15 PM) Uma criatura adjacente cura 16d8+16 PV.
• Desespero Esmagador (Padrão, 8 PM) Criaturas num cone de 6m ficam debilitadas e esmorecidas pela cena (Von reduz para 1 rodada).
• Dissipar Magia (Padrão, 3 PM) O dragão escolhe uma criatura, objeto ou esfera de 3m em alcance médio e faz um teste de Misticismo. Todas as magias nesse alvo com CD igual ou menor que o resultado do teste são dissipadas.
• Missão Divina (Padrão, 8 PM e penalidade de –1 PM) Inscreve uma marca permanente na pele do alvo. Sempre que executar uma ação hostil, o alvo recebe uma penalidade cumulativa de –2 em todos os testes (Von evita). Uma magia que dissipe outras suprime a marca e suas penalidades por um dia; elas só podem ser totalmente removidas pelo dragão ou pela magia Purificação.
• Selo de Mana (Padrão, 6 PM) Um selo mágico se manifesta em uma criatura adjacente até o fim da cena. Sempre que ela fizer qualquer ação que gaste PM, deve fazer um teste de Vontade. Se passar, a ação funciona. Se falhar, a ação não tem efeito, mas os PM são gastos mesmo assim.
• Velocidade (Padrão, 10 PM, sustentada) O dragão pode executar uma ação padrão adicional por turno.
For 13, Des 1, Con 10, Int 6, Sab 6, Car 6
Perícias Enganação +22, Intimidação +22, Intuição +22, Misticismo +22.
Tesouro Dobro e 4 peças de couro de dragão (CD 30 para extrair).`
        },
        {
          chave: "dragaoVeneravelDosRecifes", nome: "Dragão Venerável dos recifes", nd: "15", tipo: "Monstro (dragão) Enorme",
          papel: '',
          subgrupo: "Dragão Venerável",
          resumo: "Dragão Venerável — A fera é gigantesca, mas ainda assim move-se com elegância e altivez impressionantes.",
          texto:
`Dragão Venerável dos recifes ND 15
Monstro (dragão) Enorme
Iniciativa +19, Percepção +20, percepção às cegas, visão no escuro
Defesa 48, Fort +28, Ref +20, Von +17, evasão aprimorada, imunidade a eletricidade, redução de dano 15, resistência a magia +4, vulnerabilidade a ácido
Pontos de Vida 790
Deslocamento 12m (8q), natação 24m (16q), voo 24m (16q)
Pontos de Mana 97
Corpo a Corpo Mordida +44 (4d12+30, 17), duas garras +44 (2d12+30, 17) e cauda +44 (2d12+30, 17).
Aura Aterradora Vontade CD 40 evita.
Fluxo de Mana O dragão pode manter dois efeitos sustentados simultaneamente com apenas uma ação livre (mas pagando o custo de cada um).
Magia Acelerada (Livre, +4 PM) Uma vez por rodada, quando lança uma magia com execução de ação completa ou menor, o dragão muda a execução para livre.
Profunda Paixão Quando faz um teste de uma perícia baseada em Carisma, o dragão rola dois dados e escolhe o melhor.
Sopro (Padrão) Todas as criaturas em uma linha de 18m sofrem 16d12 pontos de dano de eletricidade e ficam ofuscadas por 1d4 rodadas (Ref CD 40 reduz à metade e evita a condição). Cada vez que um dado de dano do sopro rolar o valor máximo, role um dado extra e some ao total. Recarga (movimento).
Magias Como um conjurador arcano de 15º nível (CD 40).
• Campo de Força (Reação, 7 PM) Quando sofre dano, o dragão recebe redução de dano 50 contra esse dano.
• Controlar o Clima (Completa, 10 PM) Por 4d12 horas, o clima em uma esfera de 2km muda de acordo com a vontade do dragão, podendo criar qualquer condição climática (veja Tormenta20, p. 187).
• Curar Ferimentos (Padrão, 15 PM) Uma criatura adjacente cura 16d8+16 PV.
• Enfeitiçar (Padrão, 1 PM) Um humanoide em alcance curto fica enfeitiçado (Von evita).
• Globo de Invulnerabilidade (Padrão, 10 PM, sustentada) O dragão é envolto por uma esfera mágica de 3m que detém qualquer magia de 3º círculo ou menor.
• Suporte Ambiental (Padrão, 5 PM) Por 1 dia, criaturas escolhidas em alcance curto ficam imunes a calor e frio extremos, podem respirar na água e não sufocam em fumaça densa.
• Velocidade (Padrão, 10 PM, sustentada) O dragão pode executar uma ação padrão adicional por turno.
For 12, Des 4, Con 10, Int 4, Sab 4, Car 8
Perícias Atletismo +25, Diplomacia +22, Enganação +22, Intimidação +22.
Tesouro Dobro e 4 peças de couro de dragão (CD 30 para extrair).`
        },
        {
          chave: "dragaoFeral", nome: "Dragão Feral", nd: "10", tipo: "Monstro (dragão) Enorme",
          papel: '',
          resumo: "O corpanzil exibe musculatura poderosa sob o couro blindado e asas que fariam sombra a um celeiro.",
          texto:
`Dragão Feral ND 10
“A mim, besta infeliz. Música sombria acalma os ânimos impetuosos.”
— Leuric Glörufindel, o Trovador Triste
O corpanzil exibe musculatura poderosa sob o couro blindado e asas que fariam sombra a um celeiro. Não parece haver emoção na face coriácea, exceto selvageria. Um feral é um dragão adulto que, por algum motivo, não alcançou seu potencial pleno. Ferais são enormes e poderosos, mas — assim como filhotes e jovens — não conjuram magia, nem mudam de forma. São também pouco inteligentes, alguns até incapazes de falar (ou tão selvagens que sequer tentam). Ainda assim, preservam os formidáveis atributos físicos desses monstros, incluindo a capacidade de voar e expelir baforadas elementais. Estudiosos tentam desvendar o que produz estes monstros. Conforme alguns, para que um dragão amadureça não basta a simples passagem do tempo. Haveria outros requisitos: acúmulo de tesouros, abate de certo número de heróis, sacrifício de vítimas, alguma cerimônia ou ritual secreto. Para outros acadêmicos, foram os séculos ausentes de Kallyadranoch que causaram o fenômeno — dragões que chegaram à fase adulta naquele período não completaram seu desenvolvimento. Existe ainda a hipótese de que estes dragões bestiais seriam crias de Megalokk ou tornaram-se seus devotos; por essa traição, o Deus do Poder os teria amaldiçoado com a perda de sua astúcia e magia. Dragões ferais se comportam como animais carnívoros, atacando e matando para comer ou proteger seu território. São, no entanto, muito mais agressivos e rancorosos que qualquer predador natural, capazes de atravessar reinos inteiros para matar alguém que os tenha perturbado. Também preservam parte de sua soberania inerente, ainda que de forma mais selvagem — como o leão que governa um vasto território, caçando tudo que quiser, quando quiser. Ferais não acumulam tesouros, exceto por acidente, como posses de antigas vítimas que acabam espalhadas em seu covil. Ferais são os alvos favoritos dos caçadores de dragões: apesar de sua força, ainda são presas mais fáceis que dragões verdadeiros, e seus troféus são tão bons quanto quaisquer outros.
Monstro (dragão) Enorme
Iniciativa +13, Percepção +12, faro, percepção às cegas, visão no escuro
Defesa 38, Fort +22, Ref +10, Von +14, imunidade a frio, redução de dano 10, resistência a magia +3, vulnerabilidade a fogo
Pontos de Vida 495
Deslocamento 12m (8q), voo 24m (16q)
Corpo a Corpo Mordida +30 (3d12+14, 18) e duas garras +30 (2d10+14, 18).
Amadurecimento Primitivo O dragão feral conta como um dragão adulto, mas não possui as habilidades Magia Dracônica e Metamorfose Dracônica.
Aura Aterradora Vontade CD 30 evita.
Dilacerar Se o dragão acerta os dois ataques de garra em uma mesma criatura no mesmo turno, causa mais 3d10+14 pontos de dano.
Investida Imparável (Completa) O dragão se move até o dobro do seu deslocamento, passando por qualquer criatura Grande ou menor. Criaturas em seu caminho sofrem 7d8+14 pontos de dano de corte, são empurradas até o fim do deslocamento do dragão e ficam caídas na frente dele (Ref CD 30 reduz à metade e evita o empurrão, mas não a condição caído). Recarga (movimento).
Sopro (Padrão) Todas as criaturas em um cone de 12m sofrem 12d12 pontos de dano de frio e ficam lentas (Ref CD 30 reduz à metade e evita a condição). Recarga (movimento).
Varrer (Livre) Uma vez por rodada, quando o dragão faz um ataque corpo a corpo e reduz os pontos de vida do alvo para 0 ou menos, pode realizar um ataque adicional contra outra criatura dentro do seu alcance.
For 13, Des 3, Con 10, Int –3, Sab 2, Car –1
Tesouro Padrão e 2 peças de couro de dragão (CD 25 para extrair).`
        },
        {
          chave: "dragaoBicefalo", nome: "Dragão Bicéfalo", nd: "12", tipo: "Monstro (dragão) Enorme",
          papel: '',
          resumo: "A saraivada de relâmpagos e a chuva de veneno chegam sem qualquer aviso.",
          texto:
`Dragão Bicéfalo ND 12
“É tipo uma hidra. Só que dragão. Podemos chamar de ‘hidragão’, né?”
— Barossa Arareber, estudiosa de hidras
A saraivada de relâmpagos e a chuva de veneno chegam sem qualquer aviso. Quando se recuperam e conseguem olhar de novo, vocês primeiramente acreditam estar diante de dois dragões. Mas logo entendem o engano, quando percebem os pescoços alongados encontrando-se no mesmo corpo imenso. Não existem dois dragões iguais, mas todos seguem algumas regras. Uma delas é que cada dragão expele uma baforada de energia, a mesma energia produzida em seu coração, fervendo em seu sangue. Apenas uma energia. Há estudiosos excêntricos que imaginam dragões capazes de soprar duas ou mais energias em combinações bizarras: vapor, areia, lama, magma e outras ainda mais estranhas. Tais seres são alucinações de loucos, nunca vistos. Até hoje. Monstros que sopram dois ou mais tipos de energia são aberrações, não dragões verdadeiros. Não nascem de procriação: são resultado de acidentes, maldições, experimentos arcanos ou vontade de Nimb. Entre estes, o mais infame talvez seja o dragão de duas cabeças, ou dragão bicéfalo. Poucos destes monstros foram encontrados em toda a história de Arton, mas não resta dúvida de que eles existem, ocultos em masmorras ou lugares selvagens. Um bicéfalo tem o tamanho de um dragão adulto. Como esperado, cada cabeça tem sua própria personalidade e convicções, não sendo raro que discordem entre si. Por algum motivo, os poucos vistos até o momento não demonstraram ser capazes de conjurar magias.
Monstro (dragão) Enorme
Iniciativa +13, Percepção +17, percepção às cegas, não pode ser flanqueado, visão no escuro
Defesa 44, Fort +26, Ref +12, Von +20, imunidade a ácido e eletricidade, redução de dano 10, resistência a magia +3
Pontos de Vida 650
Deslocamento 12m (8q), voo 24m (16q)
Corpo a Corpo Mordida +36 (4d10+26, 18) e garra +36 (3d10+26, 18).
Aura Aterradora Vontade CD 33 evita.
Duas Mentes O dragão bicéfalo faz uma ação padrão adicional por rodada. Além disso, quando faz um teste de Vontade, rola dois dados e escolhe o melhor resultado.
Sopro (Padrão) O dragão usa um dos sopros abaixo.
• Esfera Elétrica. O dragão dispara raios em uma esfera de 9m em alcance médio. Criaturas nessa área sofrem 12d12 pontos de dano de eletricidade e ficam ofuscadas por 1d4 rodadas (Ref CD 33 reduz à metade e evita a condição). Recarga (movimento).
• Nuvem Cáustica. Uma nuvem de ácido cobre um cubo de 9m por 2 rodadas. Criaturas que comecem seus turnos na área sofrem 12d6 pontos de dano de ácido e ficam vulneráveis por 1d4 rodadas (Fort CD 33 reduz à metade e evita a condição). Recarga (movimento).
For 11, Des 1, Con 8, Int 3, Sab 5, Car 4
Perícias Enganação +16, Intimidação +16, Misticismo +15.
Tesouro Dobro e 4 peças de couro de dragão (2 de dragão de ácido, 2 de dragão elétrico; CD 27 para extrair).`
        },
        {
          chave: "sckharDragaoReiDoFogo", nome: "Sckhar Dragão-rei do fogo", nd: "S+", tipo: "Monstro (dragão) Colossal",
          papel: '',
          resumo: "Mesmo como um regente élfico arrogante, Sckhar emana grandiosidade.",
          texto:
`Sckhar Dragão-rei do fogo ND S+
“Elfos alados! Que ideia maravilhosa me acomete! Que comecemos a criá-los, meu amor!”
— Hydora, Dragão-Rei das Nuvens
Mesmo como um regente élfico arrogante, Sckhar emana grandiosidade. Contudo, quando escolhe retornar à monstruosa forma natural, sua presença inunda tudo em volta com fogo e medo. Serviçais morrem em pânico apenas por vislumbrar a criatura. Não, não uma criatura. Impossível ser qualquer outra coisa, exceto um deus! Também conhecidos como anciões, os Dragões-Reais não são apenas os maiores, mais antigos e poderosos de Arton. São também aqueles que não nasceram de outros dragões: são crias diretas do próprio Kallyadranoch. Conforme o mito, Kallyadranoch tinha seis longas tranças coloridas. Das pontas cortadas de cada uma (uma história com diferentes versões, com a participação ou não de diferentes deuses), os primeiros dragões teriam nascido. Estes seriam os seis Dragões-Reais de Arton, cada um com seu sopro especial: fogo, frio, relâmpago, ácido, veneno, trevas. Aqueles cujas proles numerosas, ao longo de milênios, resultariam em todos os dragões do mundo. Outras lendas, no entanto, dizem que esses seis não seriam os únicos dragões anciões. Outros mais teriam nascido ainda em tempos primevos, do envolvimento de Kally com outros deuses e deusas (ou outras tranças). Essa rica mitologia permeava os antigos templos e bibliotecas de Lamnor, muito anteriores à Grande Batalha — até que Khalmyr puniu Kallyadranoch com o esquecimento completo, fazendo-o desaparecer de toda memória e registros mundanos. Muitos duvidam que criaturas tão poderosas perambulem em segredo por Arton, sem o conhecimento de ninguém, sem influenciar os destinos do mundo. Contudo, a maior prova de sua existência teria acontecido em tempos recentes — quando Heart, o Dragão-Rei das Montanhas, foi abatido pelo Paladino de Arton. Ele seria então substituído pela anciã Zadbblein, que se tornaria a Dragoa-Rainha das Florestas. Devido a todo o conhecimento perdido durante o banimento do Terceiro (e também porque os próprios dragões parecem pouco inclinados a confirmar), é bem possível que nada disso seja verdade. Talvez os Dragões-Reais sejam únicos, e outros anciões sejam apenas uma teoria. Ou algo que surgirá diante de aventureiros épicos sem nenhum aviso.
Monstro (dragão) Colossal
Iniciativa +23, Percepção +34, percepção às cegas (longo), visão no escuro
Defesa 71, Fort +38, Ref +25, Von +33, imunidade a encantamento e fogo, redução de dano 20, resistência a magia +5, vulnerabilidade a frio
Pontos de Vida 4.000
Deslocamento 12m (8q), voo 36m (24q)
Pontos de Mana 287
Corpo a Corpo Mordida +66 (10d20+60, 16) e duas garras +61 (10d20+60, 16).
Aqui Está, Aqui Pertence Uma criatura em alcance longo que use habilidades de transporte planar (como Teletransporte) deve fazer um teste de Vontade (CD 55). Se falhar, a habilidade não tem efeito, mas os PM são gastos mesmo assim.
Aura Aterradora Vontade CD 55 evita. Uma criatura que falhe no teste de Vontade contra a Aura Aterradora de Sckhar sofre 8d6 pontos de dano psíquico.
Deus das Chamas As magias de fogo de Sckhar estão sob efeito de Magia Ampliada e seus dados de dano aumentam, cada um, em dois passos (já contabilizado). Todo dano de fogo causado por Sckhar ignora redução de dano e, contra criaturas imunes a fogo, ainda causa metade do dano.
Ego (Reação, 5 PM) Uma vez por rodada, quando Sckhar faz um teste de perícia (exceto de ataque), passa automaticamente nesse teste.
Escamas Supremas Sckhar sofre apenas metade do dano de fontes mundanas.
Fluxo de Mana Sckhar pode manter dois efeitos sustentados simultaneamente com apenas uma ação livre (mas pagando o custo de cada um).
Imposição Real (Completa) Sckhar altera a temperatura de uma área de qualquer tamanho em Sckharshantallas, variando de clima ameno até calor extremo, por uma cena (veja Tormenta20, p. 267).
Magia Acelerada (Livre, +4 PM) Uma vez por rodada, quando lança uma magia com execução de ação completa ou menor, Sckhar muda a execução dela para livre.
Poder Incontestável A primeira magia que Sckhar lança em cada rodada não pode ser alvo de contramágica.
Sopro (Padrão) Todas as criaturas em um cone de 30m sofrem 30d12 pontos de dano de fogo e ficam em chamas (Ref CD 55 reduz o dano à metade e evita a condição). Cada vez que um dado de dano do sopro rolar o valor máximo, role um dado extra e some ao total. Recarga (movimento).
Varrer (Livre) Uma vez por rodada, quando Sckhar faz um ataque corpo a corpo e reduz os pontos de vida do alvo para 0 ou menos, pode realizar um ataque adicional contra outra criatura dentro do seu alcance.
Magias Como um conjurador arcano de 20º nível (CD 55, limite de PM 32).
• Aprisionamento (Completa, 15 PM) Sckhar aprisiona uma criatura (veja Tormenta20, p. 180; Von anula).
• Bola de Fogo (Padrão, 27 PM) Sckhar cria uma poderosa explosão em alcance médio que causa 18d10 pontos de dano de fogo em todas as criaturas em um raio de 12m (Ref reduz à metade).
• Campo de Força (Reação, 11 PM) Quando sofre dano, Sckhar recebe redução de dano 70 contra este dano.
• Chuva de Meteoros (Completa, 15 PM) Meteoros caem em um quadrado de 36m em alcance longo. Criaturas na área sofrem 15d6 pontos de dano de impacto, 15d10 pontos de dano de fogo e ficam caídas e presas (agarradas) sob os escombros (Ref reduz o dano à metade e evita a condição; veja Tormenta20, p. 183).
• Coluna de Chamas (Padrão, 16 PM) Um cilindro de fogo com 6m de raio e 30m de altura em alcance longo causa 16d10 pontos de dano de fogo e 6d6 pontos de dano de luz em criaturas e objetos livres na área. Ref reduz à metade.
• Controlar Fogo (Padrão, 3 PM) Sckhar cria, molda, move ou extingue chamas e emanações de calor em alcance médio (veja Tormenta20, p. 187).
• Dissipar Magia (Padrão, 3 PM) Sckhar escolhe uma criatura, objeto ou esfera de 3m em alcance médio e faz um teste de Misticismo. Todas as magias nesse alvo com CD igual ou menor que o resultado do teste são dissipadas.
• Globo de Invulnerabilidade (Padrão, 15 PM, sustentada) Sckhar é envolto por uma esfera mágica de 3m que detém qualquer magia de 4º círculo ou menor.
• Imobilizar (Padrão, 9 PM) Uma criatura em alcance curto fica paralisada (Von reduz para lenta). A cada rodada, a vítima pode gastar uma ação completa para fazer um novo teste de Vontade. Se passar, se liberta do efeito.
• Muralha Elemental (Padrão, 6 PM, somente fogo) Uma muralha de fogo se eleva da terra. Pode ser um muro de até 30m de comprimento e 3m de altura (ou o contrário) ou uma cúpula de 6m de raio (veja Tormenta20, p. 200).
• Segunda Chance (Padrão, 25 PM) Uma criatura adjacente cura 400 PV e condições (veja Tormenta20, p. 205).
• Velocidade (Padrão, 10 PM, sustentada) Sckhar pode executar uma ação padrão adicional por turno.
For 20, Des 2, Con 15, Int 12, Sab 12, Car 12
Perícias Diplomacia +33, Enganação +33, Intimidação +33, Intuição +33, Misticismo +33, Nobreza +33.
Tesouro 10 peças de couro de dragão (CD 35 para extrair). A fortuna e os recursos materiais de Sckhar são praticamente incalculáveis. Um grupo de aventureiros que o derrote em seu reino terá acabado de conquistar riquezas além da imaginação, mas também terá que lidar com os súditos leais do Dragão-Rei e potenciais concorrentes ao trono. Se os personagens derrotarem Sckhar fora de Sckharshantallas, o mestre deverá definir que tesouros ele estaria portando (provavelmente algo equivalente a um tesouro triplo). Entretanto, lembre-se de que Sckhar é também um dos seres mais inteligentes de Arton; seus itens serão escolhidos especialmente para um propósito e ele saberá usá-los muito bem.`
        },
      ],
      regras: [
        { titulo: "Energia Dracônica",
          texto:
`O traço mais importante de um dragão, aquilo que o define como um desses seres, é sua energia elemental. Embora sejam seres vivos (e como tais possam ser curados com magias de luz), dragões são movidos por forças mágicas fundamentais da Criação, as mesmas que alimentam as Bolas de Fogo e Relâmpagos dos arcanistas. A diferença é que dragões não recebem tais energias de fontes externas; eles as produzem em seus corpos. Não é sem motivo que itens mágicos poderosos usam partes de dragões para sua fabricação. Cada dragão pode gerar uma energia elemental: fogo, frio, eletricidade, ácido, trevas e luz. O dragão pode expelir essa energia como uma baforada destruidora e é imune a ela. O livro básico Tormenta20 traz fichas de dragões “genéricos”, com energia de fogo. Esta seção traz exemplos de dragões específicos, com energias variadas. Você pode se basear nas fichas do livro básico e nas desta seção para criar seus próprios dragões, de outros tipos, com energias e outras habilidades variadas.` },
        { titulo: "Dragões como Familiares e Parceiros",
          texto:
`Criaturas de grande poder místico e físico, dragões são valorizados como aliados, embora conquistar o respeito e auxílio dessas criaturas seja uma tarefa bastante ambiciosa.` },
        { titulo: "Familiar",
          texto:
`Dragões filhotes de qualquer tipo podem ser invocados como familiares. Entretanto, isso exige obter um ovo de dragão. (Dragões filhotes são muito bestiais, e transformar um filhote já chocado em familiar é quase impossível). Se tiver um dragão filhote como familiar, suas magias que causam dano do mesmo tipo que o sopro do dragão têm a CD aumentada em +2 e custam –1 PM (cumulativo com outras reduções).` },
        { titulo: "Parceiro",
          texto:
`Dragões jovens de qualquer tipo podem servir como um parceiro montaria (Grande) que fornece os benefícios a seguir. Iniciante: seu deslocamento muda para 12m (normal e de voo) e, uma vez por rodada, você pode gastar 1 PM para causar 2d6 pontos de dano da energia do dragão em uma criatura em alcance médio. Veterano: você recebe também uma ação de movimento extra por turno (apenas para se deslocar) e pode gastar 2 PM para causar 4d6 pontos de dano. Mestre: seu deslocamento muda para 18m e você pode gastar 5 PM e uma ação de movimento para usar a habilidade Sopro (de acordo com o dragão jovem). Dragões, mesmo os jovens, são criaturas orgulhosas e de personalidade forte. Assim, para se tornar o cavaleiro de um dragão, um personagem precisa primeiro conquistar sua amizade e, sobretudo, seu respeito! Isso significa que um dragão montaria não pode simplesmente ser escolhido como opção de uma habilidade (como o poder Parceiro). Conquistar um dragão deve fazer parte da história e ser a recompensa por ações do personagem durante o jogo. Os detalhes exatos de como isso ocorre dependem de cada campanha, mas, em geral, envolvem encontrar um dragão e conquistar seu respeito por meio de um favor, demonstração de poder ou qualquer ato que mostre ao dragão que você é digno de ser seu cavaleiro. Um dragão jovem conta como dois parceiros para efeitos do limite de parceiros que você pode ter. Isso significa que um personagem de nível 4 ou menor dificilmente poderá ter um dragão jovem como parceiro, a menos que consiga aumentar seu limite de parceiros ou escolha o poder Coração de Dragão.` },
        { titulo: "Modificando Dragões",
          texto:
`Você pode usar as fichas apresentadas aqui e no Capítulo 7 de Tormenta20 como base para criar dragões de outros tipos. Para isso, aplique as alterações a seguir.
Energia Dracônica. Cada dragão possui uma energia elemental em seu interior, que determina o tipo de dano ao qual o dragão é imune, bem como o dano e o efeito adicional de seu sopro. Além disso, um dragão é vulnerável a um tipo de dano oposto ao seu tipo dracônico. Os tipos mais comuns são ácido, eletricidade, fogo, frio, luz e trevas. Entretanto, existem rumores sobre dragões com outros tipos de energia, como psíquica e até mesmo essência.
Formato do Sopro. Embora o cone de chamas seja uma visão clássica, cada dragão expele seu sopro de uma forma específica. Ao modificar um dragão, escolha uma das áreas a seguir.
• Cone. A forma de sopro mais comum. O sopro de um dragão filhote alcança 6m, e aumenta em +3m para cada categoria adicional de idade.
• Explosão. O sopro é uma esfera de energia concentrada, que explode ao impacto. Dragões filhotes conseguem soprar em um ponto em alcance curto, jovens e adultos em alcance médio e veneráveis e reais em alcance longo. O raio da explosão começa em 3m e aumenta em +3m para cada categoria acima de filhote (6m para jovem, 9m para adulto etc).
• Linha. Concentrado em uma linha reta, que alcança maiores distâncias e causa mais dano. Cada vez que um dado de dano do sopro rola o valor máximo, role um dado extra e some ao total. O comprimento da linha é de 6m por categoria de idade.
• Nuvem. Ao invés de causar dano imediatamente, cria uma nuvem que cobre uma área cúbica e dura 2 rodadas. Criaturas que comecem seus turnos dentro da nuvem precisam fazer o teste de resistência ou sofrem o dano e os efeitos do sopro. Por ser um efeito duradouro, causa menos dano; substitua os dados de dano do sopro base por d6 (por exemplo, 12d6 para uma nuvem de um dragão adulto). A nuvem é um cubo com lados de 3m por categoria de idade do dragão.
Magias. Dragões maiores (adulto, venerável e real) lançam magias como conjuradores arcanos, mas podem aprender qualquer magia, arcana ou divina. Uma forma de personalizar um dragão é criar uma lista de magias próprias, relacionadas ao seu conceito e natureza. Por exemplo, um dragão de luz benevolente dificilmente aprenderá Rogar Maldição, enquanto um dragão de ácido extremamente agressivo provavelmente não terá nenhum interesse em Tranquilidade. Ao definir a lista de magias do dragão que você está criando, pense em como elas refletem a personalidade e o comportamento da criatura.
Outras Características. Além de sopro e magias, dragões têm variações em outros aspectos, como atributos, testes de ataque, resistências, habilidades etc. Não há uma regra rígida do que e como alterar, mas você pode consultar o Capítulo 2, para algumas diretrizes e ideias.` },
        { titulo: "Tabela 1-2: Energia Dracônica",
          texto:
`Cada linha traz: essência dracônica (tipo de dano) · efeito adicional do sopro, por falhar na resistência · vulnerabilidade.
• Ácido. Vulnerável por 1d4 rodadas. Vulnerabilidade a eletricidade.
• Eletricidade. Ofuscado por 1d4 rodadas. Vulnerabilidade a ácido.
• Fogo. Em chamas. Vulnerabilidade a frio.
• Frio. Lento por 1d4 rodadas. Vulnerabilidade a fogo.
• Luz. Cego por 1d4 rodadas¹. Vulnerabilidade a trevas.
• Trevas. Enjoado por 1d4 rodadas¹. Vulnerabilidade a luz.
• Essência. Alquebrado por 1 rodada. Vulnerabilidade a outro tipo qualquer.
• Psíquico. Confuso por 1d4 rodadas¹. O sopro é resistido com Vontade em vez de Reflexos. Vulnerabilidade a veneno.
• Veneno (em vez do dano listado, causa a metade desse valor em perda de PV por veneno). Envenenado por 1d4 rodadas (perde 1d12 PV por categoria de idade do dragão). O sopro é resistido com Fortitude em vez de Reflexos. Vulnerabilidade a psíquico.
¹Uma criatura só pode sofrer esta condição por esta habilidade uma vez por cena.` },
        { titulo: "Dragão Menor",
          texto:
`“Não passam de filhotes. Dificilmente representam algum perigo.”
— Hyakunen, o Imortal (incinerado)
O lagarto escamoso e colorido, do tamanho de um grande cão, emerge da caverna com um olhar ansioso. Então urra, um rugido animalesco que atrai outros iguais. Logo formam uma revoada estridente que avança sobre vocês, as mandíbulas gotejantes de ácido. É fato que dragões se tornam mais poderosos e sábios com a idade. Também é fato que, apesar de sua natureza mágica, dragões são seres que nascem, crescem e se reproduzem como qualquer animal. Portanto, ainda que as histórias lhes dediquem pouco destaque, existem dragões jovens e pouco poderosos. Dragões menores são aqueles ainda filhotes ou jovens, não maiores que cavalos. Alguns podem falar, até mostrar inteligência humana, mas não possuem habilidades dracônicas avançadas. São simples monstros — mas, ainda assim, perigosos. Pois, logo que nascem, já podem voar e expelir o temido sopro elemental. Dragões menores podem andar em bandos. Por serem quase sempre irmãos de ninhada, terão a mesma idade e energia elemental. Apenas quando adultos eles adquirem seu enorme orgulho e soberba, desfazendo o bando e seguindo vidas solitárias. Uma vez que ainda não desenvolveram sua individualidade, é possível para aventureiros experientes usar dragões jovens como montarias. Por sua energia mágica inata, os filhotes também são muito cobiçados por arcanistas como familiares. Contudo, a obtenção de tais criaturas sempre exige jornadas perigosas.` },
        { titulo: "Poder Dracônico",
          texto:
`Todas as criaturas com o subtipo dragão possuem as habilidades dracônicas descritas na seção “Dragões” (Tormenta20, p. 311).` },
        { titulo: "Habilidades Dracônicas",
          texto:
`Todos os dragões partilham as seguintes habilidades.
Aura Aterradora. A simples visão de um dragão adulto ou mais velho amedronta o mais valente dos aventureiros. Uma criatura que comece seu turno em alcance longo do dragão fica apavorada (se tiver 4 níveis ou menos) ou abalada (se tiver 5 níveis ou mais) até o fim da cena (Vontade evita). Uma criatura que passe no teste de resistência fica imune a esta habilidade por um dia.
Imunidades. Dragões são imunes a efeitos de atordoamento, cansaço, dano do tipo de seu sopro, metamorfose e paralisia.
Magia Dracônica. Dragões adultos ou mais velhos podem lançar magias sem palavras mágicas, gestos ou concentração.
✦ Metamorfose Dracônica (Completa). Dragões jovens ou mais velhos podem se transformar em outras criaturas, como a magia Metamorfose (mas sem limitação para tamanhos menores que o seu). Eles costumam usar esta habilidade para se infiltrar em sociedades humanoides, aprender sobre seus costumes ou apenas quando não querem ser reconhecidos. Um dragão morto reverte à sua forma original.
Resistência a Magia. Dragões filhotes têm resistência a magia +1. Esse bônus aumenta em +1 para cada categoria de idade acima de filhote.
Sopro (Padrão). O dragão cospe energia em uma área. A área do sopro, o tipo de energia e o dano dependem do dragão. Recarga (movimento).` },
        { titulo: "Dragão Adulto",
          texto:
`“Não sou digno, ó poderoso dragão, não sou digno de sua grandeza!”
— Pivarão, o Humilde
Imenso e soberano, o monstro alado mergulha dos céus, as escamas alvas brilhando como os picos nevados das Uivantes. Quando arreganha as mandíbulas, despeja uma nevasca assassina que engole a caravana e os peregrinos, matando-os antes mesmo que congelem… Quando um dragão atinge a idade adulta, ainda será um monstro cuspidor de baforadas mortais. No entanto, várias mudanças importantes se operam. Uma dessas mudanças é o despertar de sua aura aterradora. Um pavor profundo, ancestral, que atinge o coração de todos os seres vivos e/ou inteligentes — qualquer criatura capaz de sentir medo. Alguns dizem que esse temor instintivo remonta de muito antes da Revolta dos Três, quando os ancestrais dos seres humanos eram caçados e devorados por dragões. Mas essa teoria é contestada, uma vez que a aura também afeta povos que não existiam ou não estavam aqui naquela época, como golens e kliren. Outro atributo importante dos adultos, algo que marca sua passagem para esta idade, é a conjuração de magias. Dragões não “aprendem” essas magias; elas são inerentes, parte de suas naturezas. Não chega a ser surpreendente, uma vez que seu criador é também o Deus do Poder, considerado a contraparte maligna de Wynna. As capacidades mágicas de um dragão adulto são ainda moderadas, equivalentes a um conjurador humano veterano. Conforme cresce e envelhece, o dragão não apenas adquire magias novas, como as magias que ele domina se tornam mais poderosas. Embora certas magias sejam mais comuns, diferentes dragões podem ter repertórios completamente diferentes. A idade adulta é também quando o dragão adquire sua capacidade de metamorfose. Diferente da magia de mesmo nome, esta habilidade não permite que o dragão mude para uma categoria de tamanho maior — mas ele pode mudar para quaisquer menores, a sua escolha. Dragões muitas vezes adotam formas humanoides ao interagir com outros povos, como disfarce, ou apenas para evitar aterrorizá-los (a aura de medo funciona apenas na forma dracônica original). Por sua vaidade, é comum que dragões tenham uma única forma alternativa favorita, que usam com mais frequência. Claro, a idade adulta também é quando o dragão conquista sua altivez e abandona seus semelhantes — até passando a hostilizá-los. Vai escolher um nome, tão digno quanto julgar adequado, pouco importando se outros conseguem pronunciar (talvez ele mate aqueles que falharem). E, embora cada dragão seja único, com sua própria personalidade e motivações, a maior parte decide estabelecer um território e declarar seu domínio sobre tudo e todos que ali estejam. Comparados a dragões mais antigos, adultos são “medianos”; pouco maiores que um elefante ou carruagem, e incapazes de carregar algo maior que um cavalo. Ainda assim, já são criaturas perigosas, bem acima das capacidades de heróis iniciantes.` },
        { titulo: "Dragão Venerável",
          texto:
`“Tesouro? Lamento desapontá-los, jovens heróis. Perdi interesse em tais bobagens séculos atrás.”
— Auronatt, dragão das escarpas
A fera é gigantesca, mas ainda assim move-se com elegância e altivez impressionantes. Quando os observa, vocês quase podem sentir sua insignificância perante algo tão mais antigo e sábio. Enquanto dragões adultos tornam-se temidos por aterrorizar aldeias ou atacar viajantes — quase sempre demandando a atuação de heróis locais —, veneráveis são aqueles que muitas vezes deixaram para trás esses hábitos selvagens e medíocres. Um dragão venerável alcançou esse estágio não apenas por viver séculos, mas também por colecionar um vasto repertório de vitórias contra aventureiros e outros inimigos. Poucos seres podem ameaçá-lo. Assim, estabelecer dominância sobre criaturas inferiores se torna algo trivial, até esquecido. Quando atingem esta idade, dragões podem adquirir hábitos muito distantes das histórias que os bardos cantam. Podem buscar destinos diferentes. Até se tornar seres diferentes. Diz-se que todo dragão é majestoso, orgulhoso, arrogante. Mas, quanto mais antigos se tornam, mais esses traços podem aumentar — ou se atenuar. Assim, enquanto alguns seguem cerceando vilarejos, exigindo tributos e acumulando tesouros, outros passam a achar tais hábitos fúteis e tediosos. Nenhum venerável é igual a outro. Nenhum será encontrado aleatoriamente na última câmara de alguma masmorra, esperando que heróis tentem matá-lo e pilhar seu tesouro (embora alguns decidam que sim). Pode haver uma venerável que adotou a identidade de uma caçadora elfa, liderando um clã que protege as florestas de Tollon. Outro que escolheu ser cultuado como divindade pelos povos-trovão da Grande Savana. Outro que acabaria enamorado de um bardo hynne, ouvindo suas canções bucólicas com ternura. E outro que acumula fortunas inimagináveis enquanto gerencia um cassino cósmico no Reino de Nimb. Se existe uma constante sobre os dragões, mesmo entre os veneráveis, é que eles são intensos. Quando se devotam a algo ou alguém, nada mais em qualquer dos mundos é merecedor de sua atenção. Quando se apaixonam, nenhum amor na história dos seres vivos será mais poderoso ou renderá mais frutos. Quando odeiam, esse rancor vai persistir por séculos, perseguindo toda a descendência dos culpados. E quando se enfurecem, nem mesmo a raiva de um deus pode se comparar.` },
      ],
    },

    // ── 👺 DUYSHIDAKK ──────────────────────────────────
    {
      chave: "duyshidakk", nome: "Duyshidakk", icone: "👺", cor: "#4a6f4a",
      intro: "Thwor Khoshkothruk. O rei bárbaro, o general, o Ayrrak, o imperador, tornou-se deus. Sua maior conquista enquanto mortal, a Aliança Negra — união impossível entre as tribos goblinoides de Lamnor —, está fragmentada. Hordas rondam o continente, competem por supremacia, lutam por ser o modo de vida que conhecem. Ainda assim, todos são unidos em sua devoção ao Deus dos Goblinoides. Unidos em sua busca por um ideal: O Mundo Como Deve Ser. Unidos por um nome: duyshidakk. Aqueles dispostos a aprender sobre a história e a cultura duyshidakk podem acabar simpatizando com esse povo combativo. De fato, é o que vêm fazendo cada vez mais membros de outras raças, até sendo aceitos como duyshidakk ou devotos de Thwor. Mas nem sempre a recíproca é verdadeira. O ideal goblinoide passa pela destruição das instituições ditas “civilizadas”. Muitos também querem desforra pelas injustiças que sofreram no passado, nas mãos de opressores humanos e invasores elfos.\nPercorrer o Continente Bestial sem confrontos contra duyshidakk é impossível. Mas isso não significa que o próprio Reinado esteja livre de sua ira. Quando não atravessam a Ossada de Ragnar, grupos goblinoides surgem espontaneamente em toda Arton, por influência e vontade de Thwor. Infestam masmorras, atacam povoados, erguem templos ao Deus dos Goblinoides. Buscam vingança. Buscam matança. Buscam O Mundo Como Deve Ser.",
      fichas: [
        {
          chave: "bugbearSentinela", nome: "Bugbear Sentinela", nd: "2", tipo: "Humanoide (bugbear) Médio",
          papel: '',
          subgrupo: "Bugbear",
          resumo: "Bugbear — Os seres enormes e abrutalhados parecem desatentos, quase adormecidos, os corpos imensos quase desabando sobre as pernas curtas.",
          texto:
`Bugbear Sentinela ND 2
Humanoide (bugbear) Médio
Iniciativa +6, Percepção +5, faro, visão no escuro
Defesa 17, Fort +8, Ref +10, Von +3, resistência a medo +2
Pontos de Vida 18
Deslocamento 9m (6q)
Corpo a Corpo Machado de guerra +14 (3d6+10, x3).
Êxtase no Medo O bugbear sentinela sofre metade do dano de criaturas sob algum efeito de medo.
For 5, Des 3, Con 2, Int –1, Sab 0, Car –2
Perícias Atletismo +8, Furtividade +6, Intimidação +8.
Equipamento Apito, gibão de peles, machado de guerra aumentado. Tesouro Metade.`
        },
        {
          chave: "bugbearGuardaCostas", nome: "Bugbear Guarda-Costas", nd: "6", tipo: "Humanoide (bugbear) Médio",
          papel: '',
          subgrupo: "Bugbear",
          resumo: "Bugbear — Os seres enormes e abrutalhados parecem desatentos, quase adormecidos, os corpos imensos quase desabando sobre as pernas curtas.",
          texto:
`Bugbear Guarda-Costas ND 6
Humanoide (bugbear) Médio
Iniciativa +8, Percepção +5, faro, visão no escuro
Defesa 26, Fort +14, Ref +15, Von +7, resistência a medo +2
Pontos de Vida 48
Deslocamento 9m (6q)
Corpo a Corpo Machado de guerra x2 +24 (3d6+20, x3).
Êxtase no Medo O bugbear guarda-costas sofre metade do dano de criaturas sob algum efeito de medo.
Quebrar Armas (Livre) Uma vez por rodada, quando acerta um ataque corpo a corpo, o guarda-costas pode usar a manobra quebrar (teste +26).
For 6, Des 3, Con 3, Int 1, Sab 0, Car –2
Perícias Atletismo +11, Furtividade +8, Intimidação +11.
Equipamento Gibão de peles, machado de guerra aumentado cruel. Tesouro Metade.`
        },
        {
          chave: "bruxaGoblin", nome: "Bruxa Goblin", nd: "11", tipo: "Humanoide (goblin) Pequeno",
          papel: '',
          resumo: "A gargalhada macabra vem antes que vocês vejam a criatura pequena e horrenda, o enorme chapéu pontudo e o manto esfarrapado não conseguindo…",
          texto:
`Bruxa Goblin ND 11
“Acham que é ‘apenas uma goblin’? Parvos ignorantes! Como acham que EU acabei assim?”
— Lyanenn, osteon arcanista
A gargalhada macabra vem antes que vocês vejam a criatura pequena e horrenda, o enorme chapéu pontudo e o manto esfarrapado não conseguindo esconder sua feiura. Ela cavalga uma velha vassoura enquanto a mão verruguenta segura o que parece ser um coração humano ainda sangrando. É certo que goblins são pequenos, mas podem ser assustadores. Ainda assim, nenhum goblin na face de Arton é mais assustador que uma bruxa. Estas horrendas arcanistas são coisa de pesadelo. Até os outros goblins as evitam, embora alguns infelizes muitas vezes acabem como seus guardas ou ajudantes. Voando em vassouras, pilões, caldeirões e outros instrumentos, as bruxas goblins cruzam os céus sozinhas ou em pequenas cabalas, para rogar maldições sobre os povoados ou tropas humanas. A lógica caótica dos goblins também se estende ao modo como conjuram magia — suas fórmulas, métodos e rituais são totalmente diferentes de outros arcanistas. Diz-se que fazem pactos profanos com espíritos e outras entidades extraplanares, mas poucos sabem quem seriam esses seres. De onde quer que sua magia venha, ela parece fortificada quando as bruxas adicionam ingredientes exóticos à conjuração, desde pequenos animais vivos até partes de corpos.
Humanoide (goblin) Pequeno
Iniciativa +11, Percepção +11, visão no escuro
Defesa 37, Fort +12, Ref +17, Von +24, resistência a magia +2
Pontos de Vida 370
Deslocamento 9m (6q), escalada 9m (6q), voo 18m (12q)
Pontos de Mana 98
Autofagia (Completa) A bruxa lança uma magia divina qualquer de encantamento ou necromancia de até 3º círculo pagando um custo em PV igual ao custo em PM da magia.
✦ Raio Conspurcado (Padrão, 1 PM) A bruxa dispara um raio em uma criatura em alcance médio. A vítima sofre 4d12 pontos de dano de trevas e fica abalada (Von CD 33 reduz à metade e evita a condição).
Magias Como uma bruxa de 13º nível (CD 33). Seu foco arcano é seu pilão conspurcado (–1 no custo e +2 na CD de encantamento* e necromancia*).
• Amedrontar* (Padrão, 9 PM) Criaturas à escolha da bruxa em alcance curto ficam apavoradas por 1d4+1 rodadas e depois abaladas (Von reduz para abalada por 1d4 rodadas).
• Crânio Voador de Vladislav* (Padrão, 10 PM) Um crânio de energia negativa causa 8d8+8 pontos de dano de trevas em uma criatura em alcance médio e deixa o alvo e todas as criaturas a 3m dele abaladas (Fort reduz à metade e evita a condição).
• Ferver Sangue* (Padrão, 11 PM, sustentada) A bruxa faz o sangue de uma criatura em alcance curto aquecer até entrar em ebulição. Quando a magia é lançada, e no início de cada um de seus turnos, o alvo sofre 7d8 pontos de dano de fogo e fica enjoado por 1 rodada (Fort reduz à metade e evita a condição). Se o alvo passar em dois testes de Fortitude seguidos, dissipa a magia. Se o alvo for reduzido a 0 PV pelo dano desta magia, seu corpo explode, matando-o e causando 6d6 pontos de dano de fogo em todas as criaturas a até 3m (Ref reduz à metade). Não afeta criaturas sem sangue, como construtos ou mortos-vivos.
• Marionete* (Padrão, 9 PM, sustentada) A bruxa controla as ações físicas de uma criatura em alcance médio. Ao sofrer a magia, e no início de cada um de seus turnos, a vítima faz um teste de Fortitude. Se passar, a magia é anulada.
• Raio do Enfraquecimento* (Padrão, 7 PM) Criaturas à escolha da bruxa em alcance curto ficam exaustas (Fort reduz para fatigada).
• Sussurros Insanos* (Padrão, 3 PM) Palavras desconexas proferidas pela bruxa deixam um humanoide em alcance curto confuso (Von anula).
• Tentáculos de Trevas* (Padrão, 6 PM) Até o fim da cena, tentáculos surgem em uma esfera de 6m em alcance médio e tentam agarrar todas as criaturas na área. Ao lançar a magia e no início de cada um de seus turnos, a bruxa faz um teste da manobra agarrar (usando Misticismo) contra cada criatura na área. Se ela passar, a criatura é agarrada; se a vítima já está agarrada, é esmagada, sofrendo 4d6 pontos de dano de trevas. A área conta como terreno difícil e os tentáculos são imunes a dano.
For –1, Des 2, Con 3, Int 7, Sab 2, Car 1
Perícias Conhecimento +16, Cura +11, Misticismo +21, Religião +16.
Equipamento Pilão conspurcado, vassoura voadora.
Tesouro Padrão.`
        },
        {
          chave: "gangueGoblin", nome: "Gangue Goblin", nd: "5", tipo: "Humanoide (goblin) Grande",
          papel: '',
          subgrupo: "Gangue Goblin",
          resumo: "Gangue Goblin — É impossível contá-los!",
          texto:
`Gangue Goblin ND 5
Humanoide (goblin) Grande
Iniciativa +5, Percepção +10, visão no escuro
Defesa 20, Fort +14, Ref +10, Von +6
Pontos de Vida 171
Deslocamento 9m (6q), escalada 9m (6q)
Enxame 5d6 pontos de dano de perfuração.
Frenesi Incontrolável Para cada 20 pontos de dano que a gangue goblin sofre, seu dano aumenta em +1d6 até o fim da cena.
Cada Um por Si! Quando é reduzida a 0 PV ou menos, a gangue se dispersa, deixando apenas os mais fracos para trás. Ela se transforma em 1d4+2 goblins salteadores (Tormenta20, p. 300).
For 1, Des 3, Con 1, Int –1, Sab –1, Car –2
Tesouro Metade.`
        },
        {
          chave: "hordaGoblin", nome: "Horda Goblin", nd: "14", tipo: "Humanoide (goblin) Colossal",
          papel: '',
          subgrupo: "Gangue Goblin",
          resumo: "Gangue Goblin — É impossível contá-los!",
          texto:
`Horda Goblin ND 14
Humanoide (goblin) Colossal
Iniciativa +14, Percepção +23, visão no escuro
Defesa 42, Fort +28, Ref +23, Von +16
Pontos de Vida 666
Deslocamento 9m (6q), escalada 9m (6q)
Enxame 14d6 pontos de dano de perfuração.
Pilhar e Devorar A horda saqueia e consome tudo à sua volta em uma velocidade assustadora. Quando causa dano, a horda recupera uma quantidade de pontos de vida igual à metade do resultado de sua rolagem de dano (independente de quantas criaturas sofreram dano). Cada vez que uma criatura sofre dano da horda, um de seus itens a sua escolha entre armadura, escudo e arma empunhada, é avariado (Ref CD 35 evita).
Sobrepujar (Livre) No início do seu turno, a horda faz a manobra agarrar (teste +49) contra todas as criaturas de tamanho Grande ou menor em seu espaço.
For 3, Des 3, Con 1, Int 0, Sab –1, Car –2
Tesouro Metade.`
        },
        {
          chave: "goblinBomba", nome: "Goblin-Bomba", nd: "3", tipo: "Humanoide (goblin) Pequeno",
          papel: '',
          resumo: "Os pequenos seres cinzentos de olhos injetados não parecem diferentes de outros goblins.",
          texto:
`Goblin-Bomba ND 3
“Conheço esses tipos. O segredo é explodir eles antes que eles explodam a gente.”
— Hibisco, suraggel inventora
Os pequenos seres cinzentos de olhos injetados não parecem diferentes de outros goblins. Contudo, um olhar atento revela que estes transportam frascos, potes e pacotes de vários tipos e tamanhos — alguns brilhando, outros fumegando, outros borbulhando. Com sorrisos de dentes afiados, eles arremessam vários em sua direção… Para outros povos, é difícil diferenciar a engenhosidade goblin de loucura, imprudência ou até mesmo autodestruição. Mas é inegável que ela produz resultados, ainda que muitas vezes sejam destrutivos. Goblins-bombas usam todo tipo de ingrediente improvável (alguns bem nojentos) para fabricar bombas caseiras. É impossível replicar suas fórmulas; os próprios goblins não sabem recriar bombas que eles mesmos tenham feito, sempre encontrando fórmulas novas. Igualmente impossível é tentar utilizá-las — nas mãos de qualquer outra pessoa, uma granada goblin vai falhar. Ou detonar por acidente. Ou curar em vez de ferir. Ou provocar diarreia. Além de explosões, granadas goblins podem causar uma série de outros efeitos, como produzir cortinas de fumaça ou chuva venenosa. Não há certeza se os próprios goblins conseguem prever o que suas bombas farão! Goblins-bombas são às vezes encontrados em meio a bandos de goblins salteadores. Aqueles um pouco mais espertos procuram manter distância dos goblins-bombas, devido a seu mau hábito de explodir quando atacados…
Humanoide (goblin) Pequeno
Iniciativa +9, Percepção +2, visão no escuro
Defesa 19, Fort +9, Ref +15, Von +3, redução de ácido e fogo 5, resistência a veneno +5
Pontos de Vida 74
Deslocamento 9m (6q), escalada 9m (6q)
Granadas a Granel (Padrão) O goblin-bomba arremessa uma granada em alcance médio. Estas criaturas raramente pensam antes de arremessar uma de suas granadas, e suas bandoleiras são totalmente desorganizadas! Quando o goblin-bomba acertar uma granada em um alvo, role 1d4 e use um dos efeitos a seguir.
1) O alvo e criaturas adjacentes sofrem 3d6+8 pontos de dano de fogo e ficam em chamas (Ref CD 18 reduz à metade e evita a condição).
2) O alvo e criaturas adjacentes sofrem 2d4+10 pontos de dano de ácido, mais 2d4 na rodada seguinte (Ref CD 18 reduz à metade e evita o dano secundário).
3) O alvo perde 1d12 pontos de vida por veneno e fica fraco (Fort CD 18 reduz a perda à metade e evita a condição).
4) Gera um efeito semelhante ao da magia Névoa, centrada no alvo, com o aprimoramento de cheiro horrível (Fort CD 18 evita).
Grand Finale (Reação) Quando o goblin-bomba chegar a 0 PV, role 1d6: um resultado 1 ou 2 significa que todas as granadas explodem; o goblin e seu equipamento são destruídos e todas as criaturas a 3m sofrem 2d6 pontos de dano de fogo, de ácido e de veneno (para um total de 6d6) e ficam atordoadas por 1 rodada (Ref CD 18 reduz à metade e evita a condição).
For 0, Des 4, Con 2, Int 3, Sab –1, Car 0
Perícias Furtividade +7, Ofício (alquimista) +9.
Equipamento Bandoleira de poções, couro batido. Tesouro Padrão mais insumos (valem T$ 50 para fabricar itens alquímicos).`
        },
        {
          chave: "goblinDeFerro", nome: "Goblin de Ferro", nd: "5", tipo: "Humanoide (goblin) Médio",
          papel: '',
          subgrupo: "Goblin de Ferro",
          resumo: "Goblin de Ferro — Em meio ao bando de bandoleiros endiabrados, um deles é diferente.",
          texto:
`Goblin de Ferro ND 5
Humanoide (goblin) Médio
Iniciativa +11, Percepção +2, visão no escuro
Defesa 28, Fort +17, Ref +11, Von +5, redução de corte, impacto e perfuração 10
Pontos de Vida 150
Deslocamento 12m (8q), escalada 12m (8q)
Corpo a Corpo Pancada +16 (2d8+22).
Armadura Blindada A veste mecânica do goblin de ferro fornece +10 na Defesa e em redução de corte, impacto e perfuração 10 (já contabilizados).
Engenhocas de Combate (Padrão) O goblin de ferro ativa uma das engenhocas de sua armadura, escolhida aleatoriamente (role 1d6 e consulte a lista abaixo). Isso exige um teste de Ofício (engenhoqueiro) com CD 20. Em caso de falha, a engenhoca pifa e não pode mais ser usada. Se uma engenhoca pifada for selecionada novamente, explode, causando 4d6 pontos de dano de fogo em todas as criaturas (inclusive o goblin) em alcance curto (Ref CD 21 reduz à metade). A CD para resistir às engenhocas do goblin de ferro é 21.
1) Garra eletrificada: como a magia Toque Chocante.
2) Lança-chamas: como a magia Explosão de Chamas.
3) Disparador de rede: como a magia Teia.
4) Foguetes teleguiados: como a magia Seta Infalível, mas com dano de fogo.
5) Campo de força: como a magia Campo de Força.
6) Míssil explosivo: como a magia Bola de Fogo.
For 3, Des 3, Con 2, Int 5, Sab –1, Car 0
Perícias Atletismo +11, Ofício (engenhoqueiro) +16.
Equipamento Instrumentos de ofício (engenhoqueiro).
Tesouro Padrão mais peças sobressalentes (valem T$ 500 para fabricar engenhocas).`
        },
        {
          chave: "goblinDeFerroMarkIi", nome: "Goblin de Ferro Mark II", nd: "8", tipo: "Humanoide (goblin) Grande",
          papel: '',
          subgrupo: "Goblin de Ferro",
          resumo: "Goblin de Ferro — Em meio ao bando de bandoleiros endiabrados, um deles é diferente.",
          texto:
`Goblin de Ferro Mark II ND 8
Humanoide (goblin) Grande
Iniciativa +17, Percepção +6, visão no escuro
Defesa 36, Fort +15, Ref +21, Von +7, redução de corte, impacto e perfuração 20
Pontos de Vida 300
Deslocamento 12m (8q), escalada 12m (8q), voo 18m (12q)
Corpo a Corpo Duas garras +24 (3d6+26, alcance 3m).
Arco Voltaico (Movimento) Uma vez por rodada, o goblin de ferro mark II causa 4d8+4 pontos de dano de eletricidade em dois alvos a até 3m (Ref CD 25 reduz à metade). Se o alvo usa armadura de metal (ou carrega muito metal, a critério do mestre), sofre –5 no teste de resistência. Alvos agarrados não têm direito ao teste de Reflexos.
Armadura Blindada A veste mecânica do goblin de ferro fornece +15 na Defesa e em redução corte, impacto e perfuração 20 (já contabilizados).
Canhão Congelante (Padrão) Uma vez por rodada, o goblin de ferro dispara um raio que aprisiona uma criatura em alcance médio em um bloco de gelo. O alvo sofre 6d8 pontos de dano de frio e fica paralisado (Fort CD 25 reduz à metade e muda a condição para lento por 1 rodada). É possível quebrar o gelo para libertar a criatura: o bloco tem 10 PV, redução de dano 8 e vulnerabilidade a fogo. Uma criatura presa pode usar uma ação completa para fazer um teste de Força (CD 18) e tentar se libertar do gelo.
Foguete Explosivo (Livre) Uma vez por rodada, o goblin de ferro dispara um projétil em uma criatura em alcance médio. O alvo sofre 4d6 pontos de dano de fogo e fica em chamas; criaturas adjacentes ao alvo sofrem metade do dano e também ficam em chamas (Ref CD 25 reduz à metade e evita a condição).
Garra-Gancho (Padrão) O goblin de ferro faz a manobra agarrar (teste +19) contra uma criatura Média ou menor em alcance curto. Se agarrar a criatura, pode puxá-la para qualquer espaço adjacente como parte desta ação. No início do seu turno, o goblin causa 3d10+8 pontos de dano de impacto em cada criatura que estiver agarrando (ele pode agarrar até duas criaturas, uma com cada garra).
For 4, Des 4, Con 2, Int 8, Sab –1, Car 0
Perícias Atletismo +14, Ofício (engenhoqueiro) +26.
Equipamento Instrumentos de Ofício (engenhoqueiro) aprimorados. Tesouro Padrão mais peças sobressalentes (valem T$ 2.000 para fabricar engenhocas).`
        },
        {
          chave: "hobgoblinAtirador", nome: "Hobgoblin Atirador", nd: "5", tipo: "Humanoide (hobgoblin) Médio",
          papel: '',
          resumo: "O hobgoblin de armadura leve recua, protegido pelos soldados na linha de frente.",
          texto:
`Hobgoblin Atirador ND 5
“Serei morto um dia, é certo que sim. Mas não agora. Nem por você!”
— Latanaur de Tollon, humano caçador
O hobgoblin de armadura leve recua, protegido pelos soldados na linha de frente. Ele empunha um tipo de lança metálica robusta, de aspecto peculiar, cheia de peças com mecanismos incomuns. Súbito, com um estampido, a extremidade parece cuspir uma breve labareda — e um ferimento explode em seu peito. Aquilo não é uma lança! Não apenas os bandoleiros do Reinado usam armas de fogo. Se os hobgoblins roubaram esse segredo, ou se foram eles os primeiros a idealizar tais artefatos de morte, talvez nem os deuses saibam. O uso de pólvora é muito difundido entre os militaristas hobgoblins, nem um pouco perturbados por sua possível procedência demoníaca. Com sua alta inteligência e perícia em forjar armas de alta qualidade, eles conseguem produzir uma variedade de mosquetes, rifles e outras armas de cano longo equipadas com baionetas em suas extremidades — ou mesmo combinadas com armas de combate corporal, podendo ser assim utilizadas quando o inimigo está muito próximo ou acaba a munição. Assim, embora seja capaz de empunhar sua arma como uma lança ou alabarda quando necessário, o hobgoblin atirador prefere se manter recuado, provendo fogo de cobertura aos soldados. Não raras vezes um ou mais destes também estarão escondidos enquanto o resto do bando faz uma emboscada de beira de estrada.
Humanoide (hobgoblin) Médio
Iniciativa +13, Percepção +6, visão no escuro
Defesa 22, Fort +11, Ref +16, Von +6, imunidade a ofuscado
Pontos de Vida 38
Deslocamento 9m (6q)
Corpo a Corpo Lança de fogo +17 (1d10+6, 19/x3).
À Distância Lança de fogo +20 (3d8+20, 18/x3).
Fuzileiro O hobgoblin atirador não sofre a penalidade padrão de –5 em ataques por disparar contra oponentes envolvidos em combate corpo a corpo, e pode recarregar suas armas de fogo como uma ação livre.
Lança de Fogo Quando acerta um ataque à distância em um alvo adjacente, o atirador causa +1d8 pontos de dano. Quando acerta um ataque corpo a corpo, ele pode disparar sua arma para causar +2d8 pontos de dano.
Mira Apurada (Movimento) O atirador recebe +2 em testes de ataque e na margem de ameaça com ataques à distância até o fim do turno.
For 1, Des 5, Con 2, Int 1, Sab 2, Car –2
Perícias Acrobacia +5, Furtividade +7, Ofício (armeiro) +7.
Equipamento Balas x20, couraça, lança de fogo, instrumentos de Ofício (armeiro).
Tesouro Metade.`
        },
        {
          chave: "hobgoblinComandanteTatico", nome: "Hobgoblin Comandante Tático", nd: "11", tipo: "Humanoide (hobgoblin) Médio",
          papel: '',
          resumo: "Em meio aos soldados hobgoblins em suas armaduras escuras, um se destaca.",
          texto:
`Hobgoblin Comandante Tático ND 11
“Estou certo disso, posso apostar, aquele deve ser o líder. Sério, quer apostar?”
— Plieer Cheershat, herdeiro do coelho bucaneiro
Em meio aos soldados hobgoblins em suas armaduras escuras, um se destaca. A veste de aço é ainda mais imponente, o elmo fechado reforça sua presença e autoridade. Uma mão empunha uma magnífica espada longa; a outra, uma flâmula com o símbolo de Thwor. Enquanto goblins são caóticos e engenhosos, e bugbears são assassinos brutais, hobgoblins são os mais disciplinados entre os duyshidakk. Organizam-se em tropas eficientes, obedecendo a hierarquias, seguindo ordens de seus comandantes. Um grupo hobgoblin é uma máquina de guerra bem ajustada. Para atingir tal objetivo, existem entre os hobgoblins aqueles que planejam, comandam e coordenam. Escolhidos entre os membros mais astutos da raça, estes comandantes sabem lutar quando necessário, mas sua especialidade é estudar as condições de batalha e vociferar ordens para os demais, extraindo eficiência máxima de suas forças. Apesar do título pomposo, um chefe tático não existe apenas em meio aos grandes exércitos de Lamnor — ele pode surgir em bandos duyshidakk menores que rondam o Reinado, atacando caravanas ou vilas.
Humanoide (hobgoblin) Médio
Iniciativa +27, Percepção +13, visão no escuro
Defesa 40, Fort +22, Ref +14, Von +17, imunidade a confusão, redução de dano 5
Pontos de Vida 425
Deslocamento 6m (4q)
Corpo a Corpo Lança montada x2 +32 (2d8+27, x4) ou espada longa x2 +32 (1d8+25, 17).
Carga Odiosa Quando faz uma investida montada, o hobgoblin comandante tático pode fazer dois ataques corpo a corpo contra o mesmo alvo, e ambos recebem +6d8 nas rolagens de dano.
Corcel Duyshidakk O comandante cavalga um fiel warg (veja p. 224). Enquanto o comandante estiver montado, seu deslocamento se torna 12m e ele recebe +2d6 em rolagens de dano corpo a corpo.
Estandarte de Thwor Aliados em alcance médio recebem +2 na Defesa e em testes de perícia.
Manobras Evasivas (Reação) Uma vez por rodada, quando faz um teste de resistência, o comandante substitui esse teste por um teste de Guerra. Se ele passar, todos os aliados em alcance curto que fizerem este teste de resistência nesta rodada também passarão.
Ordens de Ataque (Livre) Uma vez por rodada, o comandante ordena um aliado em alcance médio a fazer uma ação agredir como uma reação, imediatamente.
For 6, Des 2, Con 4, Int 4, Sab 2, Car 1
Perícias Cavalgar +27, Guerra +29, Intimidação +26.
Equipamento Armadura completa reforçada, escudo pesado, espada longa precisa, lança montada, poção de Curar Ferimentos (10d8+10). Tesouro Padrão.`
        },
        {
          chave: "hobgoblinGladiador", nome: "Hobgoblin Gladiador", nd: "16", tipo: "Humanoide (hobgoblin) Médio",
          papel: '',
          resumo: "Este hobgoblin usa armadura, mas deixa entrever uma musculatura possante, elástica.",
          texto:
`Hobgoblin Gladiador ND 16
“Então eles também têm combates gladiatórios. Pois quero duelar com aquele ali!”
— PJIH, golem lutador
Este hobgoblin usa armadura, mas deixa entrever uma musculatura possante, elástica. Os passos precisos e a forma como movimenta suas armas demonstram ser um guerreiro extraordinário. Não sendo surpresa que os duyshidakk apreciem entretenimento violento, muitos hobgoblins se tornam gladiadores profissionais — em combates de arena tão teatrais quanto letais, muito mais sangrentos que aqueles vistos no Reinado. Como resultado, apenas os melhores lutadores permanecem vivos e em atividade, levando suas habilidades além dos limites. Por sua extrema perícia, não é raro que também participem de ataques e missões importantes contra os humanos. Em meio a estes seres belicosos e habituados a combater em grupos, o gladiador está entre os mais temidos lutadores individuais. Quando ataca, quase sempre o faz sozinho — ou recebendo apoio à distância de atiradores ou magos de batalha. Por seu valor e prestígio na sociedade duyshidakk, gladiadores são destacados apenas para enfrentar os mais poderosos adversários. Mas também há aqueles que, por orgulho guerreiro, tomam a iniciativa de encontrar e desafiar aventureiros fortes.
Humanoide (hobgoblin) Médio
Iniciativa +25, Percepção +18, faro, visão no escuro
Defesa 46, Fort +24, Ref +32, Von +16, imunidade a medo, resistência a magia +5
Pontos de Vida 1.000
Deslocamento 9m (6q)
Corpo a Corpo Corrente de espinhos x4 +42 (2d4+25, 16).
Agraciado por Thwor Os ataques do hobgoblin gladiador ignoram 5 pontos da RD dos alvos e são considerados lancinantes, e ele recebe +5 em testes de ataque contra oponentes caídos, desprevenidos, flanqueados ou indefesos.
Campeão Bestial (Movimento) Combinando ferocidade e treinamento, o gladiador se torna Grande até o fim da cena. Nesta forma, ele recebe redução de dano 10 e +4 em Força (ataque +46, dano 1d10+29, 16).
Lento Demais! (Reação) Uma vez por rodada, quando é alvo de um ataque corpo a corpo, o gladiador pode fazer um teste de ataque oposto ao resultado desse ataque. Se vencer, ele evita o dano e pode fazer um ataque corpo a corpo contra o atacante.
Não Tão Rápido! (Reação) Uma vez por rodada, quando uma criatura no alcance natural do gladiador fica desprevenida ou se move voluntariamente para fora desse alcance, ele faz um ataque corpo a corpo contra ela.
Venha Aqui e Lute! (Completa) O gladiador faz uma manobra agarrar (teste +44, ou +50 se estiver Grande) com sua corrente contra um alvo em alcance curto. Se vencer, pode puxar o alvo para dentro de seu alcance natural e causa o dano de um ataque corpo a corpo contra esse alvo.
For 8, Des 6, Con 5, Int 0, Sab 2, Car 4
Perícias Atletismo +28, Furtividade +25, Intimidação +20.
Equipamento Corrente de espinhos de mitral ameaçadora, couraça reforçada abascanta, poção de Físico Divino (aprimoramento para os três atributos). Tesouro Metade.`
        },
        {
          chave: "sangueDoAyrrak", nome: "Sangue do Ayrrak", nd: "19", tipo: "Humanoide (bugbear) Médio",
          papel: '',
          resumo: "Poucos não duyshidakk viram o Imperador Supremo e viveram para contar.",
          texto:
`Sangue do Ayrrak ND 19
“Mas como? Pensei que ele tinha morrido. Tornado-se um deus. As duas coisas!”
— Keldrim Pedra-de-Fogo, anão guerreiro
Poucos não duyshidakk viram o Imperador Supremo e viveram para contar. Ainda assim, de alguma forma, aquele bugbear parece diferente. Maior, mais astuto, mais confiante que outros de seu tipo. Ainda que nem todos os traços físicos combinem, não resta dúvida: é um descendente de Thwor Khoshkothruk! Thwor teve muitos filhos. Alguns o acompanharam em sua campanha contra Tyrondir. Foram leais enquanto ele vivia — pois aqueles que não foram não viveram. Hoje, após a ascensão de Thwor, seus inúmeros filhos e netos recorrem ao direito de sangue para governar — mesmo que essa tradição não seja comum entre os duyshidakk. Uns fazem seu melhor para honrar o patriarca, outros apenas tentam agarrar seus espólios. Mas mesmo aqueles que trazem apenas um pouco da força, inteligência e carisma de Thwor acabam se tornando grandes líderes com seus próprios exércitos. Cada Sangue do Ayrrak é único. Alguns herdaram sua argúcia, tornando-se estrategistas brilhantes. Outros receberam seu magnetismo selvagem, sendo capazes de inspirar grandes tropas. E outros ficaram com sua estupenda força física, atuando como demônios no campo de batalha. Mas todo Sangue do Ayrrak é líder de muitos guerreiros, e está entre os mais temíveis duyshidakk. É raro que estes generais se ausentem de Lamnor. Contudo, dizem que alguns decidiram seguir o exemplo de Thwor, percorrendo Arton Norte secretamente para melhor conhecer seus inimigos. Assim, não está descartado um encontro entre um destes líderes poderosos e algum desafortunado grupo de aventureiros…
Humanoide (bugbear) Médio
Iniciativa +21, Percepção +17, faro, visão no escuro
Defesa 59, Fort +32, Ref +19, Von +26, imunidade a efeitos mentais e medo
Pontos de Vida 1.364
Deslocamento 9m (6q)
Pontos de Mana 57
Corpo a Corpo Uyzrrak Da’ukthra +52 x4 (4d12+31 corte, x3, mais 2d8 trevas em criaturas não duyshidakk). O Mundo Como Deve Ser Os descendentes de Thwor manifestam poderes baseados na vertente da filosofia de seu pai com que mais se identificam. Cada Sangue do Ayrrak recebe três das habilidades abaixo, escolhidas entre habilidades adjacentes entre si na Roda do Akzath (veja ao lado).
✦ • Vida. Recebe cura acelerada 15, imunidade a efeitos de metabolismo e veneno e pode lançar as magias Curar Ferimentos e Sopro da Salvação (CD 47).
• Ignorância (Livre). O Sangue renega toda a racionalidade e entra num estado de fúria avassaladora. Até o fim da cena, ele recebe +10 em testes de ataque e rolagens de dano corpo a corpo, +1 no multiplicador de crítico desses ataques e RD 10. Nesse estado ele não pode fazer nenhuma ação que exige calma e concentração, mas ainda pode usar outros poderes da Roda.
✦ • Mudança. Pode lançar a magia Metamorfose (CD 47).
✦ • Fim (Livre, 5 PM). O Sangue encerra um efeito sobre uma criatura adjacente (incluindo ele mesmo).
✦ • Morte. Pode lançar as magias Assassino Fantasmagórico, Poeira da Podridão e Toque da Morte (CD 47).
• Conhecimento. Recebe resistência a magia +8.
• Continuidade. Uma vez por cena, quando é reduzido a 0 PV ou menos, em vez disso o Sangue fica com 500 PV.
✦ • Início (Padrão, 10 PM). O Sangue, e todas as criaturas em alcance longo, voltam ao início do turno anterior do Sangue. Todas as ações a partir daquele ponto são desfeitas (isso inclui as consequências destas ações, como perda de PV e PM, exceto o gasto de PM para ativar esta habilidade). Com exceção do Sangue, nenhuma outra criatura sabe o que vai acontecer, e todas devem executar as mesmas ações que realizaram originalmente (mas quaisquer dados devem ser rolados novamente).
For 9, Des 7, Con 7, Int 3, Sab 3, Car 4
Perícias Atletismo +24, Diplomacia +19, Guerra +18, Intimidação +24, Religião +18.
Equipamento Couraça guardiã, Uyzrrak Da’ukthra.
Tesouro Dobro.`
        },
      ],
      regras: [
        { titulo: "Bugbear",
          texto:
`“Cuidado! Esse monstrengo feioso é muito mais perigoso do que parece!”
— Amorphir Thamior, elfo ladino
Os seres enormes e abrutalhados parecem desatentos, quase adormecidos, os corpos imensos quase desabando sobre as pernas curtas. Não parecem capazes de oferecer um grande desafio. Ainda que o próprio Thwor tenha se tornado lenda, bugbears estão entre os adversários mais subestimados por aventureiros — o que é um grande erro. Seus corpos imensos parecem desajeitados, mal sustentados pelas pernas desproporcionalmente curtas. Essa imagem é enganosa: os goblins gigantes são mais rápidos do que parecem, mais ágeis que um humano médio. Mas seus movimentos trôpegos, enganadores, fazem crer o contrário. Até a expressão bestial é falsa, escondendo uma argúcia superior à humana. Entre as forças duyshidakk, bugbears são carrascos e guarda-costas eficazes. Quando amedrontam suas vítimas, os bugbears sorvem esse medo, deleitando-se e nutrindo-se com ele. Por isso, muitos são deliberadamente cruéis.` },
        { titulo: "Gangue Goblin",
          texto:
`“Ora pitombas, são só alguns goblins, não deve ser um combate muito difícil!”
— Ryan, devoto de Valkaria
É impossível contá-los! Eles avançam como se derramados de alguma caldeira infernal, uma onda cinzenta e gritante, pontilhada pelo brilho de olhos vermelhos e facas afiadas, dilacerando tudo em seu caminho. Um goblin solitário pode ser qualquer coisa, e muitos são heróis. No entanto, em grandes números e condições hostis, muitas vezes adotam comportamento de turba. Incitado ao combate, um grande bando goblin pode se unir em uma massa compacta — as próprias mentes individuais quase suprimidas — e atacar como um cardume de piranhas, como uma única criatura imensa e multifacetada. Cercam guerreiros bem treinados e equipados, encontram frestas mesmo na mais forte armadura, deixam apenas corpos descarnados para trás. O estado de imersão mental é tão poderoso que muitas magias destinadas a afetar seres individuais não surtem efeito. A única forma de vencer a gangue é causar dano suficiente para que se disperse.` },
        { titulo: "Goblin de Ferro",
          texto:
`“Estou admirado! Não pensei que algo tão rudimentar funcionaria!”
— Sigma Redbelt, kliren inventor
Em meio ao bando de bandoleiros endiabrados, um deles é diferente. Alguns diriam que ele veste uma armadura feita de sucata. Para outros, mais parece que alguma máquina infernal o engoliu. Engenhoqueiros goblins são conhecidos por produzir aparelhos perigosos, em especial para eles próprios. Alguns, ainda mais laboriosos, constroem vestes mecânicas completas com o propósito de aumentar sua força e agilidade, além de oferecer habilidades ofensivas e defensivas. Quase todos morrem tentando. Alguns conseguem. Um goblin de ferro usa uma armadura mecanizada com inúmeros engenhos, diferentes em cada indivíduo. Quase todas fornecem algum grau de proteção ao usuário, mesmo que por acidente. Muitas trazem armas embutidas, que funcionam metade das vezes e explodem na outra metade. Algumas voam; entre estas, algumas conseguem pousar. A única certeza sobre um goblin de ferro é que ele pode ser tão perigoso para seus inimigos quanto para seus aliados.` },
      ],
    },

    // ── 🌪 ELEMENTAIS ──────────────────────────────────
    {
      chave: "elementais", nome: "Elementais", icone: "🌪", cor: "#2f6f9e",
      intro: "Os vinte deuses criaram Arton. Mas não o fizeram sem matéria-prima.\nAntes de Arton, havia os elementos. Tudo no universo — até os próprios deuses — é feito de elementos básicos, que são matéria e também energia. Fogo, água, terra, vento, luz, trevas e outros mais exóticos, em infindáveis combinações. Essas forças/substâncias primordiais se originam de reinos planares próprios, mundos compostos apenas por tais coisas. São talvez os lugares mais rigorosos em toda a Criação, onde mortais desprotegidos morreriam em instantes. Ainda assim, lugares onde existe vida. O poder dos elementos é tamanho que, em seus domínios, a vida brota espontaneamente, sem intervenção divina. Mas não é vida como conhecemos; por serem tão estranhos e distantes, chega a ser difícil reconhecer os elementais como seres vivos. De fato, arcanistas e inventores usam elementais como simples recursos, sejam servos conjurados ou ingredientes para feitiços e engenhos. Se os elementais possuem inteligência, é tão diferente da nossa que não permite qualquer compreensão. Se têm culturas ou sociedades próprias, impossível dizer. Se têm emoções ou são capazes de sofrer, nem os deuses sabem. Por tudo isso, embora alguns tenham empatia por essas criaturas, outros acham tolice. Pode-se molestar o fogo, magoar o vento, ferir a água, insultar a rocha? Seja como for, a vida elemental parece ser tão variada quanto a nossa. Eles existem em todos os tamanhos e formatos possíveis, além de alguns impossíveis. Muitos são análogos aos nossos animais, outros são algo humanoides e outros ainda têm formas desconcertantes, enigmáticas. Tais seres chegam a Arton quando conjurados por invocadores poderosos, ou fenômenos planares, ou apenas brotando naturalmente em lugares onde seu elemento seja abundante. Elementais são perigosos, mas aqueles conjurados podem ser ainda mais. Há histórias sobre elementais rancorosos, que alimentam sonhos de vingança durante anos, escolhendo fugir apenas após destruir o conjurador… e outras sobre estes mesmos seres se afeiçoando aos mestres mortais, servindo-lhes de bom grado. Claro, se podem de fato experimentar tais emoções e motivações, é algo ainda aberto a debate.",
      fichas: [
        {
          chave: "aquinNe", nome: "Aquin’ne", nd: "2", tipo: "Espírito (elemental) Pequeno",
          papel: '',
          resumo: "A manifestação não combina com nenhuma criatura conhecida.",
          texto:
`Aquin’ne ND 2
A manifestação não combina com nenhuma criatura conhecida. Pairando pouco acima do chão, flutua e rotaciona como um redemoinho, como se o conteúdo de um balde d’água tivesse perdido seu peso. Glóbulos aquosos menores orbitam em volta, como bolhas de ar na água — exceto que são bolhas de água no ar. Aquin’ne são pequenos elementais da água, mas os estudiosos levaram muito tempo para identificá-los como tais — por muito tempo acreditou-se que não fossem criaturas, mas fenômenos arcanos causados por magia desconhecida. Verdade seja dita, ainda há quem duvide se tratarem mesmo de seres vivos. Algo que aponta os aquin’ne como elementais verdadeiros é o fato de que podem ser invocados, e reagem com violência quando isso acontece. Sua temida tática de combate padrão é abraçar a cabeça do alvo, como uma grande bolsa d’água, cuja difícil remoção por vezes termina afogando a vítima. Quando esse tipo de ataque se mostra ineficaz, suas formas aquosas rodopiam com velocidade incrível, erodindo aquilo que tocam como 100 anos de marés fariam. Aquin’ne conseguem manter sua consistência tanto em terra firme quanto imersos na água, onde são muito difíceis de enxergar. Em estado selvagem, seu comportamento é imprevisível: podem apenas acompanhar outros seres à distância, atacá-los, ou mesmo ajudá-los. A habilidade de se transformar em uma bolsa d’água que envolve a cabeça torna os aquin’ne altamente cobiçados como mascotes por sereias e tritões que viajam no mundo seco, proporcionando um ambiente aquático portátil.
Espírito (elemental) Pequeno
Iniciativa +4, Percepção +4, visão no escuro
Defesa 18, Fort +10, Ref +7, Von +3, imunidade a acertos críticos, atordoado, cansaço, efeitos de metabolismo, frio e paralisia, vulnerabilidade a fogo
Pontos de Vida 21
Deslocamento 9m (6q), natação 15m (10q)
Corpo a Corpo Tentáculo hídrico x2 +13 (2d4+6 corte).
Afogar Uma criatura agarrada pelo aquin’ne é considerada submersa até se soltar.
Agarrar Aprimorado (Livre) Tentáculo hídrico (teste +13).
Redemoinho de Maresia (Padrão) O aquin’ne toca um objeto adjacente, que perde 5 PV (Ref CD 16 evita).
For 4, Des 2, Con 2, Int –2, Sab 2, Car –2
Perícias Atletismo +6 (+14 para nadar), Furtividade +4 (+14 na água).
Tesouro 1 dose de éter elemental (frio) (CD 17 para extrair).
Familiar Um aquin’ne familiar concede deslocamento de natação 9m e permite lançar magias e respirar debaixo d’água.`
        },
        {
          chave: "corgann", nome: "Corgann", nd: "8", tipo: "Espírito (elemental) Médio",
          papel: '',
          resumo: "À primeira vista, o que se aproxima parece algum tipo de peixe-fantasma voador, movendo-se no ar como faria na água.",
          texto:
`Corgann ND 8
À primeira vista, o que se aproxima parece algum tipo de peixe-fantasma voador, movendo-se no ar como faria na água. De transparência macabra, deixando entrever órgãos internos luminosos. Conjuntos de bulbos frontais fazem o papel de olhos, enquanto grandes nadadeiras lembram véus luminosos. Este elemental tem o aspecto de alguma criatura-peixe mágica, capaz de nadar fora d’água. Por sua complexidade orgânica, evidente mesmo a olho nu, já foi confundido com um animal fantástico, aberração aquática ou mesmo um morto-vivo, entre outros. Corgann vagam em pequenos bandos, sendo raro encontrá-los sozinhos. Ainda não existe explicação para suas aparições no mundo material — que acontecem mesmo em lugares afastados de qualquer corpo d’água. Surgem ao acaso, sem que nenhum evento notável tenha ocorrido. Devotos do Oceano imaginam que os corgann atuam como “olhos” para sua divindade; eles surgiriam onde e quando Oceano está curioso sobre algo acontecendo nos domínios de outros deuses. Corgann são normalmente plácidos, fazendo deles bons alvos de quem captura elementais para seus experimentos, mas não são inofensivos. Quando provocados, cospem jatos finos de água que perfuram como flechas. Por esse motivo, em algumas regiões são chamados de peixes-arqueiros.
Espírito (elemental) Médio
Iniciativa +14, Percepção +10, visão no escuro
Defesa 30, Fort +15, Ref +20, Von +9, imunidade a acertos críticos, atordoado, cansaço, efeitos de metabolismo, frio e paralisia, vulnerabilidade a fogo
Pontos de Vida 61
Deslocamento 9m (6q), natação 15m (10q)
À Distância Jato d’água x2 +27 (2d8+29 perfuração, 19/x3, alcance médio).
Jato Pressurizado (Padrão) O corgann dispara água pressurizada numa linha de 30m. Ele faz um teste de ataque de jato d’água e compara o resultado com a Defesa de cada criatura nessa área. Então faz uma rolagem de dano com um bônus cumulativo de +2d8 para cada acerto e aplica-a em cada criatura atingida. Recarga (movimento).
Navegar em Terra Firme (Completa) O corgann inunda uma esfera de 6m em alcance curto. Ela se torna um corpo de água que conta como terreno difícil para criaturas sem deslocamento de natação. Dentro dessa área o corgann pode fazer testes de Furtividade para se esconder sem precisar de cobertura.
Salto Aquático (Movimento) O corgann salta para um ponto em um corpo d’água em alcance médio.
For 2, Des 6, Con 3, Int –2, Sab 2, Car –1
Perícias Furtividade +14 (+24 na água).
Tesouro 1d4 doses de éter elemental (frio) (CD 23 para extrair).`
        },
        {
          chave: "namasqall", nome: "Namasqall", nd: "13", tipo: "Espírito (elemental) Colossal",
          papel: '',
          resumo: "A tempestade torrencial é, sem dúvida, causada pela criatura elemental que se aproxima.",
          texto:
`Namasqall ND 13
A tempestade torrencial é, sem dúvida, causada pela criatura elemental que se aproxima. Um imenso emaranhado de tentáculos aquosos é uma maneira de descrever, pairando e retorcendo-se acima das águas, mas também sorvendo-as como um tornado. O monstro pulsa e convulsiona enquanto emite o rugido constante de um rio caudaloso. Em seu interior, conjuntos de luzes azuladas intensas sugerem energias incríveis, prontas a explodir. Encimando tudo, a imitação rústica de um torso humanoide, sem face, os braços gesticulando e apontando, acusadores. Namasqall são os maiores e mais poderosos elementais da água conhecidos em Arton — imagina-se existir outros ainda maiores em seu Plano de origem, mas estes nunca se manifestam aqui. Muitos consideram os elementais como fenômenos, em vez de criaturas. O namasqall poderia ser um argumento a favor dessa teoria: até hoje foi encontrado apenas em estado de fúria constante, atacando e destruindo tudo em volta, como uma força da natureza. Não há mente a ser alcançada ou questionada. Qualquer outra motivação que pudesse ter, qualquer forma de aplacar sua violência, não parece existir. Sempre que um namasqall se manifesta, chove forte na área em volta. Perto da criatura, essa chuva é tão intensa quanto a pior das tempestades, a ponto de dificultar observação e movimentação. A aparição de um namasqall não parece vinculada apenas a invocações (aliás, poucos ousam invocar um deles), nem acontece apenas em lugares onde existe água abundante. Seu caos elemental pode explodir em qualquer lugar, a qualquer momento. Capaz de arrasar vilas inteiras, sua ocorrência sempre vai alarmar autoridades e demandar aventureiros poderosos.
A presença de um pequeno (relativamente falando) torso humanoide no alto da criatura poderia sugerir inteligência, até mesmo uma intenção de se comunicar. Contudo, embora essa parte às vezes gesticule antes de manifestar poderes, sua função permanece inexplicada, pois o namasqall não fala e nem busca qualquer diálogo.
Espírito (elemental) Colossal
Iniciativa +18, Percepção +13, visão no escuro
Defesa 42, Fort +28, Ref +22, Von +13, imunidade a acertos críticos, atordoado, cansaço, efeitos de metabolismo, frio e paralisia, vulnerabilidade a fogo
Pontos de Vida 700
Deslocamento 12m (8q), natação 18m (12q)
Corpo a Corpo Quatro tentáculos d’água +39 (2d10+30 impacto).
Agarrar Aprimorado (Livre) Tentáculo d’água (teste +49), apenas criaturas Grandes ou menores.
Constrição (Livre) No início de cada um de seus turnos, o namasqall causa 4d10+30 pontos de dano de impacto em cada criatura que esteja agarrando.
Corpo Torrencial O clima em uma esfera de 90m ao redor do namasqall é de tempestade constante (sem chance de queda de raios) e, em uma esfera de 500m, é de chuva. Estes climas não podem ser alterados.
Maremoto (Padrão) O namasqall cria uma onda que varre um cone de 12m. Criaturas na área sofrem 12d6+40 de dano, metade frio e metade impacto, e são empurradas 6m (Ref CD 36 reduz à metade e evita o empurrão).
Olho da Tempestade Se estiver na área de um efeito mágico que altera o clima, o namasqall fica atordoado por 1 rodada (Fort CD do efeito, se houver, evita). Ele só pode ser atordoado dessa forma uma vez por cena.
For 10, Des 4, Con 10, Int –3, Sab –1, Car –1
Tesouro 1d4+2 doses de éter elemental (frio) (CD 29 para extrair).`
        },
        {
          chave: "tPeel", nome: "T’Peel", nd: "1", tipo: "Espirito (elemental) Minúsculo",
          papel: '',
          resumo: "Poderia ser apenas uma brisa incomum, um fenômeno climático breve e estranho, ou não.",
          texto:
`T’Peel ND 1
Poderia ser apenas uma brisa incomum, um fenômeno climático breve e estranho, ou não. Um pequeno amontoado de pétalas, mantido unido por um redemoinho, atravessa os campos floridos e alcança vocês. É curioso como reúne apenas pétalas de rosa, embora os campos no caminho tenham muitas outras flores. T’peel são invisíveis, como quase todos os elementais do ar, mas parecem muito esforçados em evitar sê-lo. Cada t’peel é como um torvelinho que carrega, em seu interior, um punhado de objetos — sendo estes a parte visível da criatura. Exceto pelo pouco peso, esses itens são sempre únicos para cada t’peel, como se a coleção fosse uma marca de individualidade. Enquanto um deles contém apenas folhas secas de cedro, outro pode acumular penas de canário e um terceiro vai preferir rolhas de garrafa. Costuma ser um hábito inofensivo, mas pode levar a incidentes irritantes quando o ser escolhe colecionar lenços de cabelo, plumas de chapéu ou até pergaminhos arcanos. O colecionismo dos t’peel seria a prova incontestável de que elementais são inteligentes, propõem alguns. Outros alegam ser simplesmente um efeito escolhido pelo conjurador, como em qualquer outra magia. E outros ainda dizem ser puro capricho dos deuses. Em estado selvagem, t’peel não tendem a ser agressivos — mas, convém lembrar, elementais são imprevisíveis. Casos em que estas criaturas atacam viajantes não chegam a ser raridade, especialmente se carregam consigo algum item de suas coleções. Alguns arcanistas acham o t’peel muito útil como familiar. Quando propriamente domesticado, ele pode carregar catalisadores e outros itens úteis para conjurações, facilitando a vida do aventureiro.
Espirito (elemental) Minúsculo
Iniciativa +5, Percepção +1, visão no escuro
Defesa 10, Fort +5, Ref +10, Von +1, imunidade a acertos críticos, atordoado, caído, cansaço, efeitos de metabolismo, eletricidade e paralisia, vulnerabilidade a ácido
Pontos de Vida 12
Deslocamento voo 9m (6q)
Corpo a Corpo Brisa agressiva +11 (2d4+9 corte).
À Distância Lufada cortante +11 (2d4+9 corte, alcance curto).
Corpo Eólico O t’peel pode atravessar qualquer fresta por onde o ar passaria, e só pode ser afetado por armas e efeitos mágicos.
…E o Vento Levou (Livre) Quando acerta um ataque de brisa agressiva, o t’peel usa a manobra desarmar (teste +11). Se desarmar a vítima, ele prende a arma em seu redemoinho. Recuperar a arma exige vencer um teste de desarmar contra o t’peel.
For 0, Des 4, Con 2, Int –2, Sab 0, Car –1
Perícias Ladinagem +7.
Tesouro Metade (role novamente qualquer item que ocupe mais de 2 espaços) e 1 dose de éter elemental (eletricidade) (CD 16 para extrair).
Familiar Um t’peel familiar pode carregar 2 espaços de itens e permite que você lance Queda Suave`
        },
        {
          chave: "rarvnaak", nome: "Rarvnaak", nd: "7", tipo: "Espírito (elemental) Médio",
          papel: '',
          resumo: "Não existe nada para ser visto, até que você conjura sua magia divinatória.",
          texto:
`Rarvnaak ND 7
Não existe nada para ser visto, até que você conjura sua magia divinatória. Nesse instante o ser é revelado como um tipo de vulto feito de vapor. Mesmo incapaz de enxergar com precisão, você ainda consegue discernir algo mais ou menos humanoide. Embora muitos elementais do ar sejam transparentes, esta criatura tem camuflagem ainda mais poderosa, sendo impossível enxergá-la por todas as formas de visão natural. Por isso o rarvnaak é conhecido apenas como “caçador invisível”, embora a alcunha também tenha outras razões. O rarvnaak é invocado por conjuradores para executar missões específicas, geralmente de perseguição e assassinato. Diferente de outros elementais invocados contra a vontade, o caçador sempre executa o que é ordenado, seguindo o comando até que a tarefa seja cumprida — quase como se tivesse algum prazer obsessivo nesse tipo de caçada. Contudo, fala-se de ocasiões em que caçadores confrontados com missões difíceis demais acabaram traindo seus mestres, distorcendo seus objetivos (geralmente de forma a matar também o invocador). Um rarvnaak não tem forma definida: a magia Visão Mística mostra apenas como o contorno de uma nuvem, enquanto Visão da Verdade exibe um vulto humanoide fumacento. Pode-se, contudo, perceber sua presença através de outros sentidos, sentindo ou ouvindo o vento que ele produz. Em combate, a criatura golpeia com jatos de vento tão fortes quanto golpes de clava.
Espírito (elemental) Médio
Iniciativa +14, Percepção +10, visão no escuro
Defesa 29, Fort +12, Ref +21, Von +5, imunidade a acertos críticos, atordoado, caído, cansaço, efeitos de metabolismo, eletricidade e paralisia, vulnerabilidade a ácido
Pontos de Vida 280
Deslocamento voo 12m (8q)
Corpo a Corpo Dois socos pneumáticos +20 (1d8+16 impacto, x3).
Ataque Furtivo +4d6.
Caçada Implacável (Padrão) O rarvnaak marca um alvo conhecido (uma descrição fornecida por alguém é suficiente). Ele recebe +5 em testes de ataque e rolagens de dano contra este alvo e, enquanto ambos estiverem no mesmo Plano, sabe sua distância e direção. O rarvnaak só pode ter um alvo marcado por vez.
Corpo Eólico O rarvnaak pode atravessar qualquer fresta por onde o ar passaria, e só pode ser afetado por armas e efeitos mágicos.
Invisibilidade Natural O rarvnaak está sempre invisível. Ele recebe camuflagem total e +10 em Furtividade (já contabilizado), e criaturas que não possam percebê-lo ficam desprevenidas.
For 1, Des 7, Con 4, Int 0, Sab –1, Car –2
Perícias Furtividade +29.
Tesouro 1d4 doses de éter elemental (eletricidade) (CD 22 para extrair).`
        },
        {
          chave: "hallusTir", nome: "Hallus’tir", nd: "15", tipo: "Espírito (elemental) Colossal",
          papel: '',
          resumo: "“Uma coluna de templo sustentando o próprio céu” é como a manifestação poderia ser descrita.",
          texto:
`Hallus’tir ND 15
“Uma coluna de templo sustentando o próprio céu” é como a manifestação poderia ser descrita. Feita de um tornado rodopiante, mas ainda assim sólida, densa, em escuridão de tempestade. Vendaval violento rugindo por toda a volta, tudo que não esteja bem preso ao chão é arrastado e engolido. Em seu interior, relâmpagos azulados explodem sem cessar, desenhando padrões que por vezes lembram faces raivosas. Alguns desses raios, como que guiados por alguma fúria ancestral, escapam e atingem alvos por perto. Um dos maiores elementais do ar em Arton é também um dos mais destrutivos. Quando um destes surge, muitos acreditam que algum deus está muito zangado. Seu aspecto é aquele que se poderia esperar: um tornado compacto em uma coluna que desaparece acima, nos céus tempestuosos que sua aparição provoca. Sua escuridão interna é interrompida por raios poderosos que, intencionalmente ou não, disparam para explodir à distância. Assim como outros grandes elementais, não parece existir inteligência ou propósito guiando suas ações — ele apenas avança destruindo tudo que encontra, até ser detido ou desaparecer sem razão aparente. Nenhuma tentativa de comunicação com a criatura jamais teve êxito. Nenhuma maneira de acalmar sua cólera jamais teve resultado. Toda a região em volta do hallus’tir é atingida por fortes ventos. Perto da criatura, deslocamento por terra é muito penoso e o voo, quase impossível. Os motivos que levam ao surgimento de um hallus’tir são tão misteriosos quanto a natureza da criatura. É verdade que, por vezes, sua invocação é obra de algum arcanista ou clérigo — por mais imprudente que seja. Mas quando ocorrem naturalmente, seus ataques são caóticos e sem propósito, atingindo desde grandes cidades até fazendas ou aldeias humildes, ou mesmo áreas totalmente despovoadas. De qualquer forma, quando surge, é quase certo que os aventureiros mais poderosos da região sejam convocados para detê-lo.
Espírito (elemental) Colossal
Iniciativa +29, Percepção +15, visão no escuro
Defesa 49, Fort +20, Ref +28, Von +15, imunidade a acertos críticos, atordoado, caído, cansaço, efeitos de metabolismo, eletricidade e paralisia, vulnerabilidade a ácido
Pontos de Vida 718
Deslocamento 12m (8q)
Corpo a Corpo Punho x3 +44 (2d12+23 impacto).
À Distância Dois escombros +37 (4d6+31 impacto, x3, alcance médio).
Corpo Eólico O hallus’tir pode atravessar qualquer fresta por onde o ar passaria, e só pode ser afetado por armas e efeitos mágicos.
Relâmpago Selvagem (Livre) Uma vez por rodada, o hallus’tir causa 6d10 pontos de dano de eletricidade em uma criatura em alcance médio (Ref CD 40 reduz à metade).
Tornado Vivo No início de cada turno do hallus’tir, todas as criaturas Enormes ou menores em alcance longo ficam caídas e são puxadas 1d12 x 1,5m na direção dele (Fort CD 40 evita; criaturas voadoras sofrem –5 nesse teste). Uma criatura puxada sofre 1d6 pontos de dano de impacto para cada 1,5m que foi arrastada e, se for arrastada até o espaço ocupado pelo hallus’tir, é sugada para dentro dele e fica agarrada. Uma criatura agarrada desta forma pode gastar uma ação padrão para fazer um teste de Atletismo (CD 40). Se passar, solta-se e fica em um espaço adjacente ao hallus’tir.
Turbilhão de Escombros No início de cada turno do hallus’tir, todas as criaturas dentro dele sofrem 7d6 pontos de dano de impacto (Ref CD 40 reduz à metade).
Ventos da Matança O clima em uma esfera de 90m ao redor do hallus’tir é de tempestade constante (sem chance de queda de raios) e, em uma esfera de 500m, é de vento forte. Estes climas não podem ser alterados.
Olho da Tempestade Se estiver na área de um efeito mágico que altera o clima, o hallus’tir fica atordoado por 1 rodada (Fort CD do efeito, se houver, evita). Ele só pode ser atordoado dessa forma uma vez por cena.
For 6, Des 14, Con 8, Int –3, Sab 0, Car –2
Tesouro 1d4+2 doses de éter elemental (eletricidade) (CD 30 para extrair) e 1d4+2 doses de raio cristalizado (CD 30 para extrair).`
        },
        {
          chave: "pakk", nome: "Pakk", nd: "1", tipo: "Espirito (elemental) Minúsculo",
          papel: '',
          resumo: "O que poderia ser tomado como uma mariposa em chamas na verdade se revela como um minúsculo e gracioso ser elemental.",
          texto:
`Pakk ND 1
O que poderia ser tomado como uma mariposa em chamas na verdade se revela como um minúsculo e gracioso ser elemental. Embora pequeno e aparentemente não agressivo, em seu voo brincalhão ele vem perfurando as cortinas e deixando brasas nem um pouco inofensivas. Um único destes, brotando da fogueira de um acampamento, pode acabar destruindo todos os suprimentos de um grupo aventureiro, ou mesmo atear fogo a um infeliz adormecido. Quando ocorrem em bandos, são capazes de incendiar aldeias inteiras. Em se tratando de elementais, impossível saber se existe maldade ou intenção em seus atos. Apesar do risco em chamuscar cabelo, barba ou roupa, vários arcanistas adotam pakks como familiares. Servos de deuses relacionados ao fogo às vezes também os recebem como recompensa por sua devoção.
Espirito (elemental) Minúsculo
Iniciativa +7, Percepção +2, visão no escuro
Defesa 15, Fort +5, Ref +10, Von +1, imunidade a acertos críticos, atordoado, cansaço, efeitos de metabolismo, fogo e paralisia, vulnerabilidade a frio
Pontos de Vida 9
Deslocamento voo 12m (8q)
Corpo a Corpo Queimadura +11 (4d6 fogo).
Arco de Chamas (Padrão) O pakk projeta chamas em um cone de 6m. Criaturas nessa área sofrem 3d6 pontos de dano de fogo (Ref CD 14 reduz à metade). Recarga (movimento).
Labareda Viva No início de cada turno do pakk, todas as criaturas em alcance curto sofrem 1d4 pontos de dano de fogo.
For 0, Des 5, Con 1, Int –1, Sab 2, Car 3
Tesouro 1 dose de éter elemental (fogo) (CD 16 para extrair).
Familiar Um pakk familiar permite que você lance Explosão de Chamas. Caso aprenda novamente essa magia, seu custo diminui em –1 PM.`
        },
        {
          chave: "berBaram", nome: "Ber-baram", nd: "8", tipo: "Espírito (elemental) Grande",
          papel: '',
          resumo: "Os cascos bipartidos dessas criaturas quadrúpedes, do tamanho de touros, reverberam pelo solo em ritmo inquietante.",
          texto:
`Ber-baram ND 8
Os cascos bipartidos dessas criaturas quadrúpedes, do tamanho de touros, reverberam pelo solo em ritmo inquietante. Seus corpos emitem calor e seus pelos são avermelhados. As cabeças têm focinhos curtos, com um par de chifres dourados retorcidos no topo do crânio e olhos vermelhos brilhantes como rubis. Estes robustos elementais do fogo têm o aspecto e comportamento de bovinos selvagens, mas mais agressivos. São orgulhosos, impulsivos e adoram uma boa briga. Costumam medir forças entre si chocando seus chifres flamejantes e também desafiam outros seres em duelos — possivelmente amistosos, mas que não raras vezes levam à morte do adversário. Por sua semelhança com gado comum, além do considerável valor como fonte de energia ou ingredientes para magias e itens mágicos, houve numerosas tentativas de domesticar ou criar os ber-baram em cativeiro. Algumas tiveram êxito limitado — uns poucos currais podem ser encontrados no reino de Wynlla, onde recursos arcanos para conter as feras são mais acessíveis. Contudo, o perigo envolvido quando as bestas se descontrolam (o que acaba acontecendo cedo ou tarde) acaba não compensando eventuais lucros.
Espírito (elemental) Grande
Iniciativa +9, Percepção +10, visão no escuro
Defesa 30, Fort +20, Ref +17, Von +7, imunidade a acertos críticos, atordoado, cansaço, efeitos de metabolismo, fogo e paralisia, vulnerabilidade a frio
Pontos de Vida 320
Deslocamento 15m (10q)
Corpo a Corpo Marrada +26 (2d10+12 mais 3d6 fogo).
Baforada Flamejante (Movimento) O ber-baram sopra fogo num cone de 9m. Criaturas na área sofrem 7d6 pontos de dano de fogo (Ref CD 26 reduz à metade). Recarga (movimento).
Marrada Explosiva (Livre) Quando acerta um ataque de marrada em investida, o ber-baram causa uma explosão de chamas em um raio de 6m do alvo da marrada. Todas as criaturas na área sofrem 6d6 pontos de dano de fogo (Ref CD 26 reduz à metade). Recarga (movimento).
Sangue de Lava Quando o ber-baram sofre dano de corte ou perfuração, criaturas adjacentes a ele sofrem 4d6 pontos de dano de fogo e ficam em chamas (Ref CD 26 reduz à metade e evita as chamas).
For 8, Des 5, Con 5, Int –2, Sab 2, Car 2
Tesouro 1d4 doses de éter elemental (fogo) (CD 23 para extrair).`
        },
        {
          chave: "serpentaar", nome: "Serpentaar", nd: "14", tipo: "Espírito (elemental) Enorme",
          papel: '',
          resumo: "O primeiro pensamento evocado pelo monstro é uma imensa e gorda serpente feita de piche, com chamas furiosas explodindo de bolhas formadas…",
          texto:
`Serpentaar ND 14
O primeiro pensamento evocado pelo monstro é uma imensa e gorda serpente feita de piche, com chamas furiosas explodindo de bolhas formadas ao longo do corpanzil. Uma análise mais atenta, contudo, revela vários pares de patas muito pequenas e atrofiadas — a criatura parece ser, na verdade, alguma salamandra gigante e bizarra. Serpentaar estão entre os maiores elementais do fogo existentes em Arton. Muito embora, comparativamente falando, sejam menores que os grandes elementais de outros tipos. Diz a lenda que filhotes de serpentaar nascem nas lareiras dos castelos, como pequenas salamandras, escapando das chamas para se refugiar nos ermos. Escondem-se então em pântanos e fossos de piche, onde fazem tocaias e com o tempo atingem seu tamanho imenso. Estudiosos, no entanto, afirmam que isso é tolice: não há provas de que elementais tenham estágios de crescimento. Eles não nascem, apenas se formam. Seja como for, embora a criatura tenha patas, estas são muito curtas, inúteis para movimentação; o serpentaar rasteja como uma cobra, embora também consiga deslizar sobre o próprio ar fervente produzido pelo contato com seu corpo. O calor emanado pelo serpentaar é tão intenso que criaturas desprotegidas podem acabar calcinadas apenas por chegar muito perto. Atacá-lo em combate corpo a corpo requer alguma forma de proteção especial, e armas convencionais podem acabar destruídas. Manter distância, contudo, não é garantia de segurança: as constantes explosões de chamas em sua superfície podem ser direcionadas contra alvos afastados.
Espírito (elemental) Enorme
Iniciativa +9, Percepção +14, visão no escuro
Defesa 47, Fort +30, Ref +22, Von +14, imunidade a acertos críticos, atordoado, cansaço, efeitos de metabolismo, fogo e paralisia, vulnerabilidade a frio
Pontos de Vida 700
Deslocamento 6m (4q), escavação 9m (6q)
Corpo a Corpo Mordida x2 +39 (2d10+7 mais 6d6+31 fogo).
Aura de Calor No início de cada turno do serpentaar, todas as criaturas em um raio de 9m sofrem 10d6+30 pontos de dano de fogo.
Corpo Ígneo Criaturas e objetos que iniciem seus turnos adjacentes ao serpentaar, ou que façam um ataque corpo a corpo contra ele, sofrem 4d12 pontos de dano de fogo (Ref CD 38 evita).
Irromper (Completa) O serpentaar cria quatro esferas flamejantes em alcance médio. Cada uma dessas esferas dura 2 rodadas, tem 1,5m de raio e causa 12d8 pontos de dano de fogo a criaturas que iniciem seu turno em sua área (Ref CD 28 reduz à metade). Recarga (movimento).
Resfriamento Forçado Quando sofre 70 pontos de dano de frio ou mais de um único efeito, o corpo do serpentaar resfria, desativando sua habilidade Corpo Ígneo por 2 rodadas.
For 4, Des 2, Con 4, Int –2, Sab 3, Car 2
Tesouro 1d4+2 doses de éter elemental (fogo) (CD 29 para extrair).`
        },
        {
          chave: "terrier", nome: "Terrier", nd: "1", tipo: "Espirito (elemental) Pequeno",
          papel: '',
          resumo: "Este pequeno ser poderia ser confundido com um amontoado de pedras cinzentas comuns, se ficasse quieto.",
          texto:
`Terrier ND 1
Este pequeno ser poderia ser confundido com um amontoado de pedras cinzentas comuns, se ficasse quieto. O elemental, contudo, parece incapaz disso: ele corre e salta em volta de vocês, produzindo estalos surdos, com atitudes confusas entre ser brincalhão ou agressivo. Um dos menores elementais da terra, esta criatura lembra um cãozinho comum. Tem o corpo formado por uma massa de pedras central, conectada por forças invisíveis a várias pedras menores que atuam como patas, cabeça e/ou cauda, em quantidades variáveis. Imprevisível como qualquer outro elemental, um terrier em estado selvagem pode fugir, atacar, examinar com curiosidade ou mesmo se afeiçoar a estranhos. Quando decide lutar, pedras do tamanho de punhos disparam de seu corpo para atingir alvos a curtas distâncias, retornando em seguida. Desnecessário dizer, a habilidade de fingir ser um monte de pedras também pode ser perigosa para intrusos desprevenidos. O terrier existe em variedades feitas de diferentes rochas, como mármore branco, granito cinzento, obsidiana negra e outras. Alguns podem ter gemas preciosas incrustadas nos corpos. Arcanistas especializados em magias de evocação da terra costumam procurá-los como familiares.
Espirito (elemental) Pequeno
Iniciativa +0, Percepção +3, visão no escuro
Defesa 16, Fort +11, Ref +0, Von +5, imunidade a acertos críticos, ácido, atordoado, cansaço, efeitos de metabolismo e paralisia, redução de dano 5/impacto, vulnerabilidade a eletricidade
Pontos de Vida 35
Deslocamento 6m (4q)
Corpo a Corpo Pancada +9 (2d6+8).
Pedra-Punho (Padrão) O terrier dispara pedras do tamanho de um punho humano em criaturas a sua escolha em alcance curto. Cada criatura sofre 1d6+4 pontos de dano de impacto e fica atordoada por 1 rodada (Fort CD 16 reduz à metade e evita a condição). Uma criatura que passe no teste de resistência não pode mais ser atordoada por esta habilidade até o fim da cena. Recarga (movimento).
Pedregoso Um terrier pode permanecer completamente imóvel. Se ele estiver assim, um personagem deve passar num teste de Percepção (CD 30) para perceber que ele é uma criatura e não um monte de pedras.
For 3, Des 0, Con 3, Int –3, Sab 1, Car 1
Tesouro 1 dose de éter elemental (ácido) (CD 16 para extrair).
Familiar Um terrier familiar concede redução de dano 2/impacto.`
        },
        {
          chave: "pamgra", nome: "Pamgra", nd: "7", tipo: "Espírito (elemental) Médio",
          papel: '',
          subgrupo: "Pamgra",
          resumo: "Pamgra — A criatura tem o tamanho e as proporções de um grande gorila, mas feito de pedras, amalgamadas com lama ou rocha liquefeita.",
          texto:
`Pamgra ND 7
Espírito (elemental) Médio
Iniciativa +7, Percepção +6, visão no escuro
Defesa 31, Fort +20, Ref +14, Von +7, imunidade a acertos críticos, ácido, atordoado, cansaço, efeitos de metabolismo e paralisia, redução de dano 10/impacto, vulnerabilidade a eletricidade
Pontos de Vida 280
Deslocamento 9m (6q), escalar 6m (4q)
Corpo a Corpo Duas pancadas +24 (2d10+15, 19).
Cristalário Os cristais afiados do corpo do pamgra ferem profundamente suas vítimas. Criaturas atingidas por ataques do pamgra ficam sangrando (Fort CD 26 evita).
Golpe Avassalador (Livre) Quando acerta um ataque de pancada, o pamgra arremessa a vítima 1d6 x 1,5m em uma direção à escolha dele (Fort CD 24 evita). A vítima fica caída e, se atingir algum obstáculo, sofre 1d6 pontos de dano de impacto para cada 1,5m que foi arremessada.
For 8, Des 0, Con 4, Int –3, Sab –1, Car –1
Tesouro 1d4 doses de éter elemental (ácido) (CD 22 para extrair).`
        },
        {
          chave: "bandoDePamgras", nome: "Bando de Pamgras", nd: "11", tipo: "Espírito (elemental) Grande",
          papel: '',
          subgrupo: "Pamgra",
          resumo: "Pamgra — A criatura tem o tamanho e as proporções de um grande gorila, mas feito de pedras, amalgamadas com lama ou rocha liquefeita.",
          texto:
`Bando de Pamgras ND 11
Espírito (elemental) Grande
Iniciativa +9, Percepção +8, visão no escuro
Defesa 41, Fort +24, Ref +18, Von +11, imunidade a acertos críticos, ácido, atordoado, cansaço, efeitos de metabolismo e paralisia, redução de dano 10/impacto, vulnerabilidade a eletricidade
Pontos de Vida 550
Deslocamento 9m (6q), escalar 6m (4q)
Corpo a Corpo [Bando] Duas pancadas +34 (4d10+30, 19).
Abalo Sísmico (Completa) O bando de pamgras golpeia o solo repetidamente, abrindo fendas no chão em pontos aleatórios um círculo de 30m de raio ao seu redor. Cada criatura na área precisa rolar um dado; com um resultado ímpar, uma fenda se abre sob seus pés e a criatura cai dentro dela (Ref CD 31 evita a queda). Dentro da fenda, a criatura é considerada agarrada; ela pode se soltar e sair da fenda gastando uma ação completa e passando em um teste de Atletismo (CD 31). No início de cada turno da criatura agarrada, ela sofre 4d8 pontos de dano de impacto pelo esmagamento das rochas. Recarga (movimento).
Cristalário Os cristais afiados do corpo do bando ferem profundamente suas vítimas. Criaturas atingidas por ataques do bando ficam sangrando (Fort CD 31 evita).
Golpe Avassalador (Livre) Quando acerta um ataque de pancada, o bando arremessa a vítima 2d6 x 1,5m em uma direção à escolha dele (Fort CD 31 evita). A vítima fica caída e, se atingir algum obstáculo, sofre 2d6 pontos de dano de impacto para cada 1,5m que foi arremessada.
For 8, Des 0, Con 4, Int –3, Sab –1, Car –1
Tesouro 1d6 doses de éter elemental (ácido) (CD 26 para extrair).`
        },
        {
          chave: "tanaloom", nome: "Tanaloom", nd: "13", tipo: "Espírito (elemental) Enorme",
          papel: '',
          resumo: "A coluna é imensa, poderia ser parte de uma construção formidável — mas não existe nada parecido por perto.",
          texto:
`Tanaloom ND 13
A coluna é imensa, poderia ser parte de uma construção formidável — mas não existe nada parecido por perto. Seus entalhes são enigmáticos, diferentes de qualquer idioma artoniano. Súbito, enquanto você faz suas anotações, a peça se move. Rotaciona, exibindo uma face oculta, onde agora os entalhes formam uma carranca macabra. Como se empurrada por um gigante invisível, a rocha imensa desliza veloz, avançando para atropelar e esmagar. Elementais da terra são imaginados como semelhantes a rochas naturais, sem traços particulares — e isso muitas vezes é verdade. Aqueles conhecidos como tanaloom, contudo, são o oposto disso. Estas criaturas estão entre os maiores e mais poderosos elementais da terra em Arton. No entanto, por razões que nem os grandes arquimagos explicam, sua aparência sempre corresponde a estruturas construídas por humanos e outros povos. Um tanaloom tem a forma de um monólito, obelisco, monumento, ponte, coluna de templo ou outra grande obra de pedra. Inscrições em sua superfície completam o disfarce, sugerindo algo esculpido por alguma civilização antiga. Um exame acurado, contudo, revela que esses entalhes apenas parecem escritas ou gravuras, não trazendo qualquer mensagem real. Um tanaloom pode muito bem permanecer imóvel e inofensivo, enquanto eventuais exploradores o examinam. No entanto, o mais esperado é que ele subitamente desperte e ataque, com a fúria caótica e irracional dos elementais. Tanaloom não têm membros ou articulações; mesmo aqueles em forma de bustos ou estátuas permanecem rígidos na mesma posição. Quando ataca, a criatura apenas desliza pelo chão, esmagando seres menores no caminho. Seu arrastar produz o bramido característico de grandes blocos de pedra em atrito. Tanaloom podem ser encontrados em ambientes externos, lembrando uma ruína antiga, ou no interior de grandes masmorras, integrando seus corredores e câmaras. Seus atos podem sugerir inteligência, como quando bloqueia um corredor ou quando seus entalhes mostram expressões hostis. Até hoje existe dúvida se os tanaloom são mesmo criaturas elementais ou algum tipo de armadilha mágica sofisticada, com o propósito de dizimar aventureiros.
Espírito (elemental) Enorme
Iniciativa +10, Percepção +12, não pode ser flanqueado, percepção às cegas, visão no escuro
Defesa 44, Fort +26, Ref +20, Von +13, imunidade a acertos críticos, ácido, atordoado, caído, cansaço, efeitos de metabolismo e paralisia, redução de dano 15/impacto, vulnerabilidade a eletricidade
Pontos de Vida 650
Deslocamento 15m (10q), escalar 15m (10q)
Corpo a Corpo Duas pancadas +37 (4d12+49).
À Distância Flechas ácidas x6 +34 (3d6+10 ácido, x3, alcance médio).
Golpe Esmagador (Livre) Quando o tanaloom acerta um ataque de pancada, pode usar a manobra derrubar (teste +42). Criaturas derrubadas dessa forma precisam gastar uma ação padrão em vez de movimento para se levantar e não podem usar Acrobacia para se levantar como ação livre, pois ficam presas ao chão.
Metamorfismo Rochoso (Movimento) O tanaloom deforma seu corpo para passar por espaços estreitos, suficientes para criaturas Médias ou maiores, percorrendo até metade do seu deslocamento.
Monólito Um tanaloom pode permanecer completamente imóvel. Se estiver assim, um personagem deve passar num teste de Percepção (CD 40) para perceber que ele é uma criatura e não parte de uma construção.
Rolo Compressor O tanaloom pode passar por espaços ocupados por criaturas Grandes ou menores. Se fizer isso, causa 2d10 pontos de dano de impacto em cada criatura nos espaços que atravessar. Uma criatura só pode sofrer dano dessa habilidade uma vez por rodada.
For 12, Des 0, Con 9, Int –2, Sab 2, Car –1
Tesouro 2d4 doses de éter elemental (ácido) (CD 28 para extrair).`
        },
        {
          chave: "elementalCorrompido", nome: "Elemental Corrompido", nd: "16", tipo: "Espírito (elemental) Colossal",
          papel: '',
          resumo: "A água do rio é turva e tem um tom acobreado.",
          texto:
`Elemental Corrompido ND 16
“Ali, estão vendo nas águas? Algo da Tormenta, sei bem. Cuidado, está vindo para cá!”
— Roxy, herdeira da raposa druida
A água do rio é turva e tem um tom acobreado. Uma enorme bolha começa a se formar, crescendo até assumir a forma de uma larva descomunal, de corpo líquido e bocarra com presas de gelo vermelho. A cor rubra e o forte cheiro ferroso denunciam: em vez de água, é feita de sangue. Mais sangue que o produto da chacina de dez reinos, mais sangue que um deus poderia verter. Tais pensamentos aterradores trazem consigo uma ameaça de loucura… Estudiosos dos Planos questionam se a Tormenta pode ser considerada um elemento. Segundo alguns, a tempestade aberrante obedece a vários requisitos básicos para tal: origina-se em um universo muitíssimo estranho e hostil, onde tudo é feito da mesma substância e onde a vida existe em formas bizarras e incompreensíveis. As mentes, emoções e motivações aberrantes dos lefeu, de igual forma, são de entendimento impossível. Alguns argumentam até que as forças da Tormenta podem ser conjuradas e utilizadas em nosso proveito, da mesma forma que os elementais clássicos. Não faltam aventureiros que, apesar do risco, usam as próprias armas do invasor para proteger Arton. Contudo, concordar com essa teoria significa concordar também que a Tormenta pode ser parte da Criação, é algo cuja existência pode ser aceita. Isso é algo que nem mesmo os deuses toleram. Assim, em oposição à teoria da Tormenta como elemento, existem casos em que até seres elementais naturais acabaram corrompidos pelas forças invasoras. O evento mais famoso teria ocorrido durante a campanha épica que seria conhecida como “Coração de Rubi”. Em sua jornada heroica para desfazer a área de Tormenta em Zakharov, os aventureiros acabariam confrontando um adversário único — outrora um grande elemental da água, protetor do Rio Panteão. A criatura foi assimilada e distorcida pela Tormenta, tornando-se um ser feito de ácido fervente e atuando como um horrendo guardião para os lefeu.
Espírito (elemental) Colossal
Iniciativa +19, Percepção +14, percepção às cegas, visão no escuro
Defesa 53, Fort +30, Ref +24, Von +16, imunidade a acertos críticos, ácido, atordoado, cansaço, dano de luz, efeitos de metabolismo, eletricidade, paralisia e trevas
Pontos de Vida 800
Deslocamento 15m (10q), natação 15m (10q)
Corpo a Corpo Mordida +46 (3d12+15 mais 4d6 ácido) e duas pancadas +46 (3d8+15 mais 4d6 ácido).
Agarrar Aprimorado (Livre) Mordida (teste +56).
Corpo Volátil Caso o elemental corrompido fosse sofrer 20 ou mais pontos de dano de eletricidade ou fogo mágicos, a água em seu corpo evapora, criando uma nuvem corrosiva em uma esfera de 6m ao redor dele. Criaturas que iniciem seus turnos nessa área sofrem 10d6 pontos de dano de ácido e ficam enjoadas (Fort CD 42 reduz o dano à metade e evita a condição). Dentro da nuvem, criaturas têm seu deslocamento reduzido para 3m, sofrem –2 em testes de ataque e rolagens de dano, e recebem camuflagem leve contra criaturas a até 1,5m e camuflagem total contra criaturas a mais de 1,5m.
Engolfar (Livre) Se o elemental começar seu turno agarrando uma criatura Grande ou menor, poderá fazer um teste de agarrar contra ela. Se vencer, engolfa a criatura. Uma criatura engolfada continua agarrada e fica submersa no elemental; ela começa a sufocar e sofre 10d6 pontos de dano de ácido no início de cada rodada do elemental (veja “Sufocamento” em Tormenta20, p. 319). A criatura pode fazer um teste de Atletismo para natação (CD 42) para se libertar. Isso faz com que ela escape para um espaço livre adjacente ao elemental, a sua escolha.
Reabastecer Se estiver em contato com um corpo d’água Médio ou maior, o elemental recebe cura acelerada 50. Além disso, se fosse sofrer dano mágico de frio, em vez disso ele cura PV em quantidade igual à metade do dano que sofreria.
Torrente Cáustica (Movimento) O elemental cospe uma torrente de água cáustica em uma criatura em alcance médio. O alvo sofre 5d6 pontos de dano de ácido e 5d6 pontos de dano de impacto, e fica caído (Ref CD 42 reduz o dano à metade e evita a condição). Se falhar por 10 ou mais no teste de Reflexos, a vítima é empurrada 6m na direção oposta ao elemental e, se estiver usando armadura e/ou escudo, o item é avariado. Recarga (movimento).
For 12, Des 5, Con 13, Int –1, Sab 0, Car 0
Tesouro Nenhum.`
        },
      ],
      regras: [
        { titulo: "Elemental da Água",
          texto:
`“Deviam ter avisado que não podiam prender a respiração por tanto tempo.”
— Toots, kliren druida
Criaturas nativas de Planos ligados à água, como os domínios de Oceano. Em Arton, são encontrados próximos de grandes corpos aquáticos, como rios e lagos, bem como em regiões repletas de gelo e neve.` },
        { titulo: "Elemental do Ar",
          texto:
`“Não o vemos! Matou seis dos nossos, mas não conseguimos vê-lo!”
— Kaellonus, minotauro caçador
Espíritos livres e por vezes caprichosos, estes elementais são nativos de Planos formados por vastidões abertas, onde a força dos ventos sopra livre, como Arbória e Odisseia.` },
        { titulo: "Elemental do Fogo",
          texto:
`“Nada que uma Bola de Fogo bem conjurada não resolva, né?”
— Ayura, humana feiticeira
Formados por chama e calor, estes espíritos são nativos de lugares como os domínios de Azgher, Arsenal e Thyatis.` },
        { titulo: "Elemental da Terra",
          texto:
`“Como ousam? Óbvio que se trata de um ser inteligente. Aqui, venha a mim, servo!”
— Vilanda, o Deus Menor da Lama Granulada
Firmes e sólidos como o solo de onde se originam, elementais da terra normalmente possuem uma natureza mais contemplativa que outros espíritos.` },
        { titulo: "Pamgra",
          texto:
`A criatura tem o tamanho e as proporções de um grande gorila, mas feito de pedras, amalgamadas com lama ou rocha liquefeita. Em vez de cabeça, traz um pedaço de cristal incrustado, sem feições. Formações cristalinas parecidas também afloram de seus punhos, tornando-os imensos tacapes cheios de pontas afiadas. Pamgras são elementais da terra mais agressivos que outros de seu tipo. Embora sejam também encontrados sozinhos, costumam formar grandes grupos para investir com violência sobre tudo que encontram. Encontros pacíficos com estes seres são bastante raros, embora às vezes ocorram. Apesar da estrutura vagamente humanoide, nada no comportamento dos pamgra sugere que tenham qualquer inteligência. E embora atuem em bandos, não adotam táticas de combate elaboradas, exceto avançar e esmagar pela força dos números. Quando assolam uma região, grupos de aventureiros costumam ser enviados para destruí-los (quando têm poder suficiente) ou atraí-los para longe; por sua agressividade, pamgras são alvo fácil de provocações (se estas são de fato compreendidas, não se sabe), imediatamente perseguindo seus autores. Pamgras são especialmente perigosos em áreas montanhosas, onde ocorrem com mais frequência. Em grandes números, podem entrar em um estranho frenesi — começam a esmurrar o chão em sincronia, afetando o terreno em volta e causando todo tipo de catástrofe sísmica, como terremotos e avalanches.` },
      ],
    },

    // ── 🏞 ERMOS ───────────────────────────────────────
    {
      chave: "ermos", nome: "Ermos", icone: "🏞", cor: "#5f7a3a",
      intro: "Este é um mundo belo e vibrante, mas não civilizado. Existem cidades imensas e impressionantes, mas separadas por vastidões infindáveis de áreas selvagens, perigosas. Para chegar a qualquer lugar, deve-se percorrer territórios onde rondam não apenas bandidos, mas todo tipo de feras e monstros. Antes de alcançar a próxima masmorra, todo grupo de heróis percorrerá regiões inóspitas, onde eles próprios são intrusos e as bestas reinam. Viajar através das paisagens de Arton sempre envolve risco, mesmo através das estradas mais trafegadas. Pode-se caminhar durante dias sem encontrar uma aldeia sequer — muito menos um posto da guarda ou uma patrulha para manter os viajantes seguros. Desde animais predadores cumprindo seu papel no Grande Ciclo de Allihanna até as mais bizarras monstruosidades de Megalokk, é impossível catalogar todos. Nenhum encontro nos ermos será igual a outro.",
      fichas: [
        {
          chave: "bulette", nome: "Bulette", nd: "7", tipo: "Monstro Grande",
          papel: '',
          resumo: "O animal lembra um imenso tubarão com patas curtas, carapaça grossa e a famosa bocarra com centenas de dentes.",
          texto:
`Bulette ND 7
“Tubarão terrestre? Quer dizer, um selako que anda com pernas? Sim? Não? Entendi foi nada!”
— Draknnar, osteon bárbaro
O animal lembra um imenso tubarão com patas curtas, carapaça grossa e a famosa bocarra com centenas de dentes. Quando vocês menos esperam, ele afunda e desaparece no chão, mergulhando sem deixar nenhum túnel atrás de si. O solo ondula como água por onde a fera passa, “nadando” à volta de vocês em círculos cada vez mais fechados. Também chamado de tubarão terrestre, este predador poderoso pode se movimentar na terra assim como um peixe na água. A criatura não escava túneis, como outros animais subterrâneos; o bulette tem a estranha habilidade de liquefazer temporariamente os materiais rochosos que tocam sua carapaça. Assim ele consegue, de fato, nadar em terra firme. Como um tubarão, o bulette se mantém em movimento constante, percorrendo grandes extensões em busca de presas. Carnívoro voraz, ataca qualquer criatura terrestre do tamanho de um cavalo ou menor, que seus sentidos permitem detectar a longo alcance. A criatura não dorme, nem precisa de covil, levando uma vida sempre errante. Seu sistema digestivo poderoso não deixa restos, nem mesmo armas e armaduras; por isso, suas vítimas quase nunca voltam a ser encontradas. Bulettes são mais comuns em Halak-Tûr, onde as caravanas usam todo tipo de truque para evitá-los, mas também são típicos em Ubani. Sua tática preferida é aproximar-se por baixo e emergir com um bote, abocanhando a presa. Uma criatura mordida pelo bulette é também afetada por sua “aura” que derrete o chão, sendo assim arrastada livremente solo adentro enquanto é devorada; aventureiros contam histórias horríveis sobre companheiros que desapareceram sob a terra para sempre. Por outro lado, uma armadura feita com sua carapaça preserva parte de seus poderes, tornando o item muitíssimo cobiçado. Apesar de sua ferocidade extrema, bulettes são cavalgados por alguns dos maiores ginetes e heróis da Grande Savana. Também existem histórias de anões cavaleiros de bulettes. Tudo isso atrai a curiosidade de outros povos. Quando o assunto são montarias exóticas, aventureiros tentam qualquer coisa…
Monstro Grande
Iniciativa +9, Percepção +8, percepção às cegas (longo)
Defesa 32, Fort +20, Ref +9, Von +12, redução de dano 5/adamante, redução de ácido e fogo 10
Pontos de Vida 310
Deslocamento 9m (6q), escavação 12m (8q)
Corpo a Corpo Mordida +23 (3d8+24 mais 4d6 ácido).
Agarrar Aprimorado (Livre) Mordida (teste +25).
Aura Cáustica No início de cada turno do bulette, todas as criaturas adjacentes sofrem 4d6 pontos de dano de ácido.
Engolir (Padrão) No início de cada um dos turnos do bulette, a criatura engolida sofre 2d8+12 pontos de dano de impacto mais 4d6 pontos de dano de ácido. Ela pode escapar causando um total de 20 pontos de dano a ele (Defesa 10, redução de dano 0).
Espreitador das Dunas Enquanto o bulette estiver “nadando” no solo, é muito difícil percebê-lo. Em vez do normal, a CD de Percepção para ouvir o bulette é 40, ou +20 em seu teste de Furtividade, o que for maior.
For 8, Des 2, Con 5, Int –4, Sab 1, Car –3
Tesouro Duas peças de couro de bulette (CD 22 para extrair).
Parceiro O bulette é um parceiro montaria (Grande) que fornece os benefícios a seguir. Iniciante: seu deslocamento muda para 9m (escavação 6m) e, uma vez por rodada, você recebe +1d6 em uma rolagem de dano corpo a corpo. Veterano: o bônus em rolagens de dano muda para +1d10. Mestre: o deslocamento de escavação muda para 12m e o bônus em rolagens de dano muda para +2d8.`
        },
        {
          chave: "carrascoDeLena", nome: "Carrasco de Lena", nd: "6", tipo: "Monstro Grande",
          papel: '',
          resumo: "A criatura tem a forma de uma salamandra imensa, com couro rugoso, pernas atarracadas e cauda muito grossa.",
          texto:
`Carrasco de Lena ND 6
“Estou confusa. Vocês querem mesmo que eu cure ele, e não vocês?”
— Lavanda, dahllan clériga de Lena
A criatura tem a forma de uma salamandra imensa, com couro rugoso, pernas atarracadas e cauda muito grossa. Um tentáculo longo nasce no alto da cabeça, trazendo na ponta um ameaçador órgão espinhoso, semelhante a uma maça com cravos. Esta abominação assassina que habita florestas e pântanos recebeu uma alcunha que soa herética. Que relação haveria entre a bondosa Deusa da Vida e uma besta sanguinária cuja maior aptidão é matar? Na verdade, a origem deste nome é bastante sagaz… O carrasco de Lena é quase indestrutível. Nenhuma arma ou magia comum, destinada a causar dano, consegue feri-lo — pelo contrário, torna-o mais forte. Sua única vulnerabilidade conhecida são magias de cura: elas ferem o monstro em vez de curar! Quando caça, a criatura primeiro tenta agarrar ou derrubar a vítima com seu tentáculo para deixá-la vulnerável à mordida cruel. Se confronta vários oponentes, no entanto, prefere agitar o tentáculo em açoites circulares para atingir tudo em volta com a ponta espinhosa.
Devotos de Lena rejeitam a ideia de que sua deusa seja responsável pela origem dos carrascos. Se ela o fez, seus motivos são misteriosos.
Monstro Grande
Iniciativa +6, Percepção +6, visão no escuro
Defesa 27, Fort +16, Ref +12, Von +8
Pontos de Vida 180
Deslocamento 9m (6q)
Corpo a Corpo Tentáculo +20 (2d6+10 corte) e mordida +20 (2d8+20).
Açoite Circular (Padrão) O carrasco de Lena agita seu tentáculo, causando 2d6+10 pontos de dano de corte em todas as criaturas a até 3m (Ref CD 22 reduz à metade).
Inversão de Dano O carrasco converte qualquer dano recebido em cura. Caso ele já esteja com PV máximos, recebe PV temporários com um limite igual ao seus PV máximos (ou seja, pode acumular até 180 PV temporários).
Vulnerabilidade a Cura Efeitos de cura causam dano ao carrasco (em vez de curar PV). Itens alquímicos e poções de cura podem ser usados como granadas contra o carrasco (a criatura reduz à metade caso passe em um teste de Reflexos contra a CD do item).
For 5, Des 1, Con 4, Int –4, Sab 1, Car –2
Tesouro Nenhum.`
        },
        {
          chave: "centauroChefe", nome: "Centauro Chefe", nd: "8", tipo: "Humanoide (centauro) Grande",
          papel: '',
          resumo: "Entre os centauros, existe um que claramente se destaca.",
          texto:
`Centauro Chefe ND 8
Entre os centauros, existe um que claramente se destaca. Muito maior e mais massivo, de crina farta e revolta como uma juba. Em vez das lanças e arcos usados pelos demais, carrega um machado imenso que nenhum humano seria capaz de empunhar. Cada comunidade de centauros tem um líder (às vezes dois), escolhido entre os mais fortes e ágeis durante um torneio tradicional. Embora esse chefe muitas vezes seja um caçador, não é raro acabar ocupando essa posição por possuir habilidades especiais, ou ser capaz de realizar manobras incomuns. O centauro chefe costuma liderar expedições de caça. Também está sempre presente em negociações com estrangeiros — embora o xamã seja responsável por dialogar, o chefe estará ali em caso de problemas que terminem em combate. Em situações de combate, por sua força e corpulência superiores, o centauro chefe vai investir contra os inimigos e então lutar corpo a corpo, servindo de alvo enquanto os caçadores flanqueiam em volta com lanças, ou à distância com flechas.
Humanoide (centauro) Grande
Iniciativa +10, Percepção +10
Defesa 33, Fort +21, Ref +15, Von +8, resistência a efeitos mentais, medo e veneno +5
Pontos de Vida 320
Deslocamento 12m (8q)
Corpo a Corpo Machado de guerra x2 +26 (3d6+18, x4) e cascos +26 (1d8+18).
Coice Oportuno (Reação) Uma vez por rodada, quando uma criatura erra um ataque corpo a corpo contra o centauro chefe por 5 ou mais, ele faz um ataque de cascos contra essa criatura.
Investida Galopante (Completa) O centauro faz uma investida. Ele pode passar pelo espaço ocupado por criaturas menores que ele, pode continuar se movendo depois do ataque e, se acertar, causa +4d8 pontos de dano. Criaturas no caminho percorrido pelo chefe sofrem 1d8+9 pontos de dano de impacto e ficam caídas (Ref CD 26 evita).
Medo de Altura Se estiver adjacente a uma queda de 3m ou mais de altura, o centauro fica abalado.
For 5, Des 2, Con 4, Int –1, Sab 2, Car 1
Perícias Atletismo +13, Intimidação +9.
Equipamento Machado de guerra aumentado maciço, gibão de peles. Tesouro Padrão.`
        },
        {
          chave: "centauroXamaDeMegalokk", nome: "Centauro Xamã de Megalokk", nd: "10", tipo: "Humanoide (centauro) Grande",
          papel: '',
          resumo: "Aquele ser quadrúpede e com braços parece um centauro — mas apenas um pouco.",
          texto:
`Centauro Xamã de Megalokk ND 10
Aquele ser quadrúpede e com braços parece um centauro — mas apenas um pouco. Carapaça e chifres afloram em toda parte. Um dos braços é uma enorme garra espinhosa; o outro termina em algo parecido com uma mão, apenas o bastante para gesticular conjurações profanas. Onde deveria haver rosto, uma escuridão na qual brilham presas brancas e olhos vermelhos. A maior parte dos centauros venera Allihanna, mas nem todos. Existem tribos violentas, agressivas, que preferem aprazer seu irmão monstruoso. Enquanto um xamã de Allihanna está mais preocupado com a sobrevivência e segurança da tribo, o xamã de Megalokk busca a destruição de inimigos — sendo “inimigo” toda criatura que não pertence à tribo. Ele acompanha grupos de caçadores para atacar e pilhar povoados de outras raças, sem deixar sobreviventes. Algumas vezes os cultistas também capturam vítimas com vida, para então levá-las em peregrinações como oferendas (ou melhor, refeições) a monstros mais poderosos, em busca de agradar ao Monstro-Pai.
Humanoide (centauro) Grande
Iniciativa +12, Percepção +16
Defesa 31, Fort +16, Ref +10, Von +22
Pontos de Vida 260
Deslocamento 12m (8q)
Pontos de Mana 70
Corpo a Corpo Clava +24 (1d8+15), mordida +24 (1d6+15) e cascos +24 (1d8+15).
✦ Ira Coletiva (Padrão, 10 PM, sustentada) O centauro xamã de Megalokk causa um frenesi em aliados em alcance curto. Essas criaturas recebem +5 em testes de ataque e rolagens de dano corpo a corpo e redução de dano 10, mas ficam esmorecidas e não podem fazer nenhuma ação que exija calma e concentração (como usar a perícia Furtividade ou lançar magias).
✦ Voz dos Monstros O centauro está sempre sob efeito da magia Voz Divina, apenas para falar com monstros.
✦ Magias Como um clérigo de Megalokk de 10º nível (CD 32).
• Amedrontar (Padrão, 10 PM) Criaturas à escolha do xamã em alcance curto ficam apavoradas por 1d4+1 rodadas e depois abaladas (Von reduz para abalada por 1d4 rodadas).
• Armamento da Natureza (Movimento, 8 PM) Uma das armas do xamã se torna mágica e seu dano aumenta em dois passos (de 1d6 para 1d10 ou de 1d8 para 1d12) até o fim da cena.
• Pele de Pedra (Padrão, 6 PM) O xamã recebe redução de dano 5 até o fim da cena.
• Perdição (Padrão, 5 PM) Criaturas escolhidas em alcance curto sofrem –3 em testes de ataque e rolagens de dano até o fim da cena.
• Poeira da Podridão (Padrão, 10 PM) Criaturas em uma nuvem de 6m de raio em alcance médio começam a definhar e apodrecer. Quando a magia é lançada, e no início de seus turnos até o fim da cena, criaturas na área sofrem 4d8+16 pontos de dano de trevas e não podem recuperar PV por uma rodada (Fort reduz à metade e evita a restrição de cura).
Medo de Altura Se estiver adjacente a uma queda de 3m ou mais de altura, o centauro fica abalado.
For 3, Des 2, Con 4, Int –1, Sab 6, Car 1
Perícias Adestramento +10, Intimidação +10, Religião +15.
Equipamento Clava macabra aumentada, farrapos de ermitão, símbolo sagrado de Megalokk. Tesouro Metade.`
        },
        {
          chave: "ente", nome: "Ente", nd: "8", tipo: "Monstro Enorme",
          papel: '',
          resumo: "A criatura é alta como uma árvore e também muito parecida com uma.",
          texto:
`Ente ND 8
“Juro por Nimb, a árvore se mexeu! E está andando! E está vindo PRA CÁ!”
— Edirannus, minotauro inventor
A criatura é alta como uma árvore e também muito parecida com uma. Tem pele grossa e marrom, braços como galhos retorcidos e pernas que lembram um tronco bipartido, com pés semelhantes a raízes. No topo da cabeça brota farta folhagem verde, formando uma copa densa. Os olhos, que lembram gotas de seiva, brilham com sabedoria e tranquilidade. Às vezes, ao longo de séculos, uma árvore antiga pode testemunhar tantos eventos que transcende os limites entre vegetal e humanoide. Então desprende-se do solo e passa a percorrer suas florestas, agradecida a Allihanna por sua vida e desejando proteger sua obra. Entes são pacíficos por natureza, mas podem ser letais quando irritados — e nada os irrita mais que a destruição da natureza, de extensas derrubadas de árvores a matança de animais. Quando imóvel, um ente é indistinguível de uma árvore normal. Em geral usam isso como vantagem, para avaliar inimigos antes de atacar. Se precisar de reforços, um ente convoca outras árvores ao redor, transformando-as em árvores ambulantes temporariamente.
Devotos de Allihanna reconhecem os entes como guardiões sagrados, tratando-os com respeito e recebendo a mesma cortesia em retorno.
Monstro Enorme
Iniciativa +7, Percepção +11, visão no escuro
Defesa 34, Fort +21, Ref +8, Von +15, fortificação 25%, imunidade a sangramento, natureza vegetal, redução de dano 10/corte, vulnerabilidade a fogo
Pontos de Vida 310
Deslocamento 9m (6q)
Corpo a Corpo Duas pancadas +26 (4d8+16).
Árvore Ancestral Cada ente possui uma habilidade entre as seguintes, que representa sua origem.
• Carvalho. Os ataques do ente causam 50% a mais de dano contra construtos e objetos.
• Jasmim. O ente emana uma nuvem de perfume em uma esfera de 9m ao seu redor. Qualquer criatura nessa área que tente fazer uma ação hostil contra o ente deve fazer um teste de Vontade (CD 26). Se falhar, perde sua ação. Se passar, fica imune a esta habilidade por uma cena. Metabolismo.
• Nogueira. O ente pode usar uma ação de movimento para arremessar uma noz em uma criatura em alcance curto. O alvo sofre 2d6+8 pontos de dano de impacto (Ref CD 26 evita). Recarga (movimento).
• Salgueiro. Quando acerta um ataque de pancada, o ente pode usar a manobra agarrar (teste +31) como uma ação livre. Uma criatura agarrada dessa forma é erguida 4,5m e cai dessa altura caso se solte.
• Sequoia. O dano da habilidade Atropelamento do ente aumenta para 4d8+8, e a CD para resistir a ela se torna 29.
Atropelamento (Completa) O ente percorre até o dobro do seu deslocamento. Ele pode passar pelo espaço ocupado de quaisquer inimigos menores que ele, mas não pode passar duas vezes pelo mesmo espaço. Criaturas atropeladas desta forma sofrem 2d8+8 pontos de dano de impacto e ficam caídas (Ref CD 26 reduz à metade e evita a condição). Recarga (movimento).
Pastor de Árvores (Completa) Uma vez por dia, o ente anima até duas árvores em alcance curto, que se desenraízam e lutam com as mesmas estatísticas de um ente, mas com deslocamento 3m, Inteligência –4 e sem esta habilidade. Depois de um dia as árvores voltam ao normal, enraizando-se onde estiverem.
For 9, Des –1, Con 5, Int 1, Sab 3, Car 1
Perícias Furtividade +2 (+12 em florestas), Intuição +11, Sobrevivência +16.
Tesouro Padrão mais lasca de ente (CD 23 para extrair, vale T$ 70 para fabricar um dedo de ente).`
        },
        {
          chave: "estirge", nome: "Estirge", nd: "1", tipo: "Monstro Minúsculo",
          papel: '',
          subgrupo: "Estirge",
          resumo: "Estirge — O enxame é formado por seres voadores demoníacos que lembram grandes mosquitos, mas de corpos vermelhos e peludos, com asas negras de morcego.",
          texto:
`Estirge ND 1
Monstro Minúsculo
Iniciativa +7, Percepção +2, faro, visão no escuro
Defesa 16, Fort +1, Ref +10, Von +5
Pontos de Vida 9
Deslocamento voo 12m (8q)
Corpo a Corpo Probóscide +11 (1 perfuração).
Agarrar Aprimorado (Livre) Probóscide (teste +21).
Chupar Sangue (Livre) Quando agarra uma criatura, e no início de cada um de seus turnos enquanto permanecer agarrando, o estirge drena sangue como um efeito metabólico; a vítima perde 3d6 pontos de vida e ele ganha a mesma quantidade de PV temporários. Após drenar 10 pontos de vida ou mais, o estirge se solta e tenta fugir.
Sangrar Quando o estirge solta uma criatura de quem estava drenando sangue (por vontade própria ou não), a vítima fica sangrando.
For –4, Des 5, Con –1, Int –5, Sab 0, Car –2
Tesouro Ova de estirge.
Familiar Um estirge pode ser invocado como familiar, mas isso requer uma ova de estirge. Um estirge familiar permite que você receba 1 PV temporário cumulativo (até o limite de seu nível) sempre que causa dano a uma criatura viva com uma magia.`
        },
        {
          chave: "enxameEstirge", nome: "Enxame Estirge", nd: "5", tipo: "Monstro Médio",
          papel: '',
          subgrupo: "Estirge",
          resumo: "Estirge — O enxame é formado por seres voadores demoníacos que lembram grandes mosquitos, mas de corpos vermelhos e peludos, com asas negras de morcego.",
          texto:
`Enxame Estirge ND 5
Monstro Médio
Iniciativa +9, Percepção +4, faro, visão no escuro
Defesa 23, Fort +6, Ref +16, Von +11
Pontos de Vida 40
Deslocamento voo 12m (8q)
Enxame 1d6 pontos de dano de perfuração. Para cada ponto de dano sofrido dessa forma, uma criatura perde 1d6 pontos de vida como um efeito metabólico.
Chupar Sangue Para cada ponto de vida que o enxame fizer uma criatura perder, ele ganha 1 PV temporário.
Sangrar Uma criatura que perca pontos de vida para o enxame estirge fica sangrando (Fort CD 20 evita).
For –3, Des 5, Con –1, Int –5, Sab 0, Car –2
Tesouro Ova de estirge.`
        },
        {
          chave: "nuvemDeEstirges", nome: "Nuvem de Estirges", nd: "16", tipo: "Monstro Enorme",
          papel: '',
          subgrupo: "Estirge",
          resumo: "Estirge — O enxame é formado por seres voadores demoníacos que lembram grandes mosquitos, mas de corpos vermelhos e peludos, com asas negras de morcego.",
          texto:
`Nuvem de Estirges ND 16
Monstro Enorme
Iniciativa +19, Percepção +14, faro, visão no escuro
Defesa 51, Fort +17, Ref +29, Von +24
Pontos de Vida 180
Deslocamento voo 12m (8q)
Enxame 10d6 pontos de dano de perfuração. Para cada ponto de dano sofrido dessa forma, uma criatura perde 1d6 pontos de vida como um efeito metabólico.
Chupar Sangue Para cada ponto de vida que o enxame fizer uma criatura perder, ele ganha 1 PV temporário.
Sangrar Uma criatura que perca pontos de vida para o enxame estirge fica sangrando (Fort CD 40 evita).
Zumbido Atordoante Criaturas dentro da nuvem de estirges ficam ofuscadas e surdas.
For –2, Des 5, Con –1, Int –5, Sab 0, Car –2
Tesouro Ova de estirge.`
        },
        {
          chave: "feraVassalo", nome: "Fera-Vassalo", nd: "3", tipo: "Monstro Médio",
          papel: '',
          subgrupo: "Fera-Cacto",
          resumo: "Fera-Cacto — Os seres vagamente humanoides, sem feições visíveis, avançam em silêncio.",
          texto:
`Fera-Vassalo ND 3
Monstro Médio
Iniciativa +3, Percepção +3
Defesa 21, Fort +10, Ref +13, Von +4, natureza vegetal, vulnerabilidade a frio
Pontos de Vida 22
Deslocamento 9m (6q)
Corpo a Corpo Duas garras +15 (2d6+6).
À Distância Dois espinhos +15 (2d6+3 perfuração, alcance curto).
Agarrar Aprimorado (Livre) Garra (teste +15).
Corpo Espinhoso Qualquer criatura que erre um ataque corpo a corpo adjacente, desarmado ou com uma arma natural contra a fera-vassalo sofre 2d4+3 pontos de dano de perfuração (Ref CD 17 evita).
Drenar Sangue (Completa) Se a fera-vassalo iniciar seu turno agarrando uma criatura, pode drenar o sangue dela. A vítima perde 2d4+3 pontos de vida e a fera recupera a mesma quantidade de PV.
For 4, Des 0, Con 3, Int –2, Sab 0, Car –3
Tesouro Espinhos (CD 18 para extrair, valem T$ 50 para fabricar flechas superiores).`
        },
        {
          chave: "feraLider", nome: "Fera-Líder", nd: "5", tipo: "Monstro Médio",
          papel: '',
          subgrupo: "Fera-Cacto",
          resumo: "Fera-Cacto — Os seres vagamente humanoides, sem feições visíveis, avançam em silêncio.",
          texto:
`Fera-Líder ND 5
Monstro Médio
Iniciativa +4, Percepção +4
Defesa 25, Fort +12, Ref +16, Von +5, natureza vegetal, vulnerabilidade a frio
Pontos de Vida 195
Deslocamento 9m (6q)
Corpo a Corpo Duas garras +16 (2d6+12).
À Distância Dois espinhos +16 (2d6+6 perfuração, alcance curto).
Agarrar Aprimorado (Livre) Garra (teste +16).
Corpo Espinhoso Qualquer criatura que erre um ataque corpo a corpo adjacente, desarmado ou com uma arma natural contra a fera-líder sofre 2d4+6 pontos de dano de perfuração (Ref CD 20 evita).
Drenar Sangue (Completa) Se a fera-líder iniciar seu turno agarrando uma criatura, pode drenar o sangue dessa criatura. A fera causa 2d6+4 pontos de dano na vítima e recupera a mesma quantidade de pontos de vida.
For 5, Des 0, Con 4, Int –2, Sab 0, Car –2
Tesouro Espinhos (CD 20 para extrair, valem T$ 150 para fabricar flechas superiores).`
        },
        {
          chave: "feraMae", nome: "Fera-Mãe", nd: "13", tipo: "Monstro Enorme",
          papel: '',
          subgrupo: "Fera-Cacto",
          resumo: "Fera-Cacto — Os seres vagamente humanoides, sem feições visíveis, avançam em silêncio.",
          texto:
`Fera-Mãe ND 13
Monstro Enorme
Iniciativa +7, Percepção +24
Defesa 45, Fort +28, Ref +8, Von +23, natureza vegetal, redução de dano 15/corte mágico, vulnerabilidade a frio
Pontos de Vida 685
Deslocamento 0m (0q)
Corpo Espinhoso Qualquer criatura que erre um ataque corpo a corpo contra a fera-mãe sofre 2d8+10 pontos de dano de perfuração mais veneno (Ref CD 35 evita).
Saraivada de Espinhos (Padrão) A fera-mãe dispara espinhos em criaturas a sua escolha em alcance médio. Cada criatura sofre 12d12+24 pontos de dano de perfuração mais veneno (Ref CD 35 reduz à metade).
Veneno Peçonha potente (perde 2d12 PV por rodada durante 3 rodadas, Fort CD 35 reduz a duração para 1 rodada).
For 8, Des –3, Con 8, Int 2, Sab 4, Car –2
Tesouro 1d4+1 doses de peçonha potente (CD 28 para extrair) e espinhos (CD 28 para extrair, valem T$ 1.000 para fabricar flechas superiores).`
        },
        {
          chave: "lagartoPerseguidor", nome: "Lagarto Perseguidor", nd: "2", tipo: "Animal Médio",
          papel: '',
          resumo: "Grande como um crocodilo, o lagarto de escamas listradas se ergue sobre pernas poderosas com garras longas.",
          texto:
`Lagarto Perseguidor ND 2
“E pensar que morrerei assim, emboscado em uma selva esquecida pelos deuses…”
— Kiaran Kormakk, clérigo de Arsenal
Grande como um crocodilo, o lagarto de escamas listradas se ergue sobre pernas poderosas com garras longas. Uma língua bifurcada faz movimentos ligeiros enquanto a boca goteja saliva pegajosa. Existem muitos tipos de lagarto em Arton, desde os pequenos e inofensivos que comem apenas insetos até grandes predadores que podem caçar humanoides. O lagarto perseguidor está entre aqueles que oferecem mais perigo a aventureiros. Encontrado principalmente em Khubar, nas Sanguinárias e na Grande Savana, o perseguidor alcança dois metros de comprimento ou mais. Como outros répteis, gosta de se aquecer ao sol durante o dia para acumular energia e depois caçar. O nome vem de seu método principal de caça: ataca com uma forte mordida, deixando ali sua saliva altamente venenosa e infecciosa, para depois fugir, evitando qualquer combate. A partir de então vai farejar e rastrear a presa à distância, durante horas ou até dias, pacientemente esperando que morra por doença. Faz isso apenas quando caça sozinho, ou visando presas que pareçam perigosas; aos pares ou bandos, prefere apenas cercar as presas e matar logo a dentadas.
Animal Médio
Iniciativa +7, Percepção +5, faro, visão na penumbra
Defesa 18, Fort +7, Ref +12, Von +3, redução de fogo 5, vulnerabilidade a frio
Pontos de Vida 16
Deslocamento 9m (6q), natação 9m (6q)
Corpo a Corpo Mordida +14 (2d4+14).
Mordida Infecciosa Uma criatura mordida pelo lagarto perseguidor deve fazer um teste de Fortitude (CD 16) no início de cada um de seus turnos. Se falhar, perde 1d6 pontos de vida. Se passar, encerra este efeito. Metabolismo.
Mordida Surpresa A primeira criatura a ser atacada pelo lagarto perseguidor em cada combate fica desprevenida contra este ataque.
For 3, Des 2, Con 3, Int –5, Sab 0, Car –4
Perícias Atletismo +11, Furtividade +7.
Tesouro Nenhum.`
        },
        {
          chave: "tendriculo", nome: "Tendrículo", nd: "6", tipo: "Monstro Grande",
          papel: '',
          resumo: "Grande como uma cabana, a coisa parece um amontoado de vegetação úmida, emaranhada com vinhas e cipós.",
          texto:
`Tendrículo ND 6
“‘Não mate a plantinha, ela é filha do deus Não-Sei-das-Quantas, blablablá’, disse o druida… E morreu.”
— Bahrbara, a bárbara (e paladina de Valkaria)
Grande como uma cabana, a coisa parece um amontoado de vegetação úmida, emaranhada com vinhas e cipós. Tem dois longos tentáculos feitos de galhos e uma abertura cavernosa no centro do corpo, similar a uma bocarra circular, com “dentes” feitos de espinhos. Um tendrículo é uma imensa criatura vegetal, uma planta ambulante carnívora — e sempre faminta. Não é sabido se foram criados por magia ou vieram de algum reino divino, mas atualmente infestam as profundezas das grandes florestas de Arton. Em algumas ocasiões, podem ser encontrados em pequenos bosques ou nas proximidades de áreas povoadas, tornando-se um perigo para seus habitantes. De forma similar aos trolls, tendrículos têm grande capacidade de regeneração, fechando feridas e restaurando partes cortadas em questão de momentos. No entanto, também como os trolls, isso exige o consumo de muita carne…
Monstro Grande
Iniciativa +9, Percepção +6, visão no escuro
Defesa 25, Fort +16, Ref +8, Von +12, imunidade a sangramento e veneno, natureza vegetal
Pontos de Vida 210
Deslocamento 6m (4q)
Corpo a Corpo Mordida +20 (2d6+10 mais veneno) e dois tentáculos +24 (4d4+5).
Agarrar Aprimorado (Livre) Tentáculo (teste +24).
Engolir (Padrão) No início de cada um dos turnos do tendrículo, a criatura engolida sofre 2d10+5 pontos de dano de impacto mais 2d10+5 pontos de dano de ácido. Ela pode escapar causando um total de 20 pontos de dano a ele (Defesa 10). Enquanto tiver uma criatura engolida, o tendrículo ganha cura acelerada 20.
Veneno Essência de sombra (debilitado, Fort CD 22 reduz para fraco).
For 3, Des 2, Con 2, Int –2, Sab 3, Car –4
Perícias Furtividade +10 (+12 em florestas).
Tesouro 1d4 doses de essência de sombra (CD 21 para extrair).`
        },
        {
          chave: "rhandomm", nome: "Rhandomm", nd: "20", tipo: "Espírito Colossal",
          papel: '',
          resumo: "É um humanoide titânico — um gigante literal, alto como a torre de um castelo.",
          texto:
`Rhandomm ND 20
“Por todos os deuses e deusas, nada consegue ferir esse gigante?”
— Gaamoura, humano paladino
É um humanoide titânico — um gigante literal, alto como a torre de um castelo. A pele rochosa em vários tons de mármore, ou algo igualmente sólido. Arbustos, folhagens e musgos abundam nos ombros e costas. As feições são grosseiras, como a obra apressada de algum escultor desleixado. Nos olhos diminutos e estúpidos, um inconfundível desvario de loucura. O titã mítico chamado Rhandomm (o nome vem de seu estranho rosnado trovejante) está entre as lendas mais temidas de Arton. Teria sido criado por Nimb, por razões que apenas o Deus do Caos conhece (ou não). Passa a maior parte do tempo em hibernação, nas profundezas de algum abismo, despertando de tempos em tempos para trazer caos e destruição aos reinos. Não há como prever seus acessos de fúria devastadora: ele pode surgir em qualquer lugar, a qualquer momento. Quando isso acontece, os regentes logo mobilizam seus maiores campeões para confrontar o colosso. Mais que um simples gigante abrutalhado, o Rhandomm é uma suprema entidade do caos. Seu corpo é invulnerável a todas as formas de ataque, físicas ou mágicas — exceto uma. Essa fraqueza singular, no entanto, é diferente a cada vez que a criatura desperta. Encontrar essa vulnerabilidade única não é façanha simples; magias de adivinhação usadas com esse propósito sempre falham, possivelmente por intervenção do próprio Nimb. Os poucos que teriam derrotado o Rhandomm no passado só conseguiram fazê-lo por tentativa e erro, uma tática perigosa que custou a vida de inúmeros heróis valorosos. Quando abatido, o Rhandomm desaparece sem deixar restos. Será recriado em algum outro lugar, novamente adormecido, enquanto aguarda algum comando do Deus do Caos para voltar a destruir. Ou, como sugerem alguns, talvez o próprio Nimb não consiga (ou queira) controlar sua ira.
Espírito Colossal
Iniciativa +20, Percepção +26, faro, visão no escuro
Defesa 63, Fort +34, Ref +20, Von +28, cura acelerada 100, imunidade a adivinhação, atordoado, cansaço, efeitos mentais, de metabolismo e mágicos de movimento, dano, medo, metamorfose, paralisia e veneno, resistência a magia +10
Pontos de Vida 1.300
Deslocamento 15m (10q)
Corpo a Corpo Duas pancadas +55 (4d12+40, x4).
À Distância Rocha +50 (6d10+40 impacto, alcance longo).
Aura Caótica No início do turno do Rhandomm, cada criatura em uma esfera de 30m perde 6d6 pontos de vida, à medida que seus corpos se distorcem pelo puro poder do Caos. Sempre que o Rhandomm rola um 6 num desses dados de dano, soma esse valor e rola o dado novamente.
Golpe Avassalador (Livre) Quando acerta um ataque de pancada, o Rhandomm arremessa a vítima 1d6 x 1,5m em uma direção à escolha dele (Fort CD 50 evita). A vítima fica caída e, se atingir algum obstáculo, sofre 1d6 pontos de dano de impacto para cada 1,5m que foi arremessada.
Punhos Caóticos Uma criatura atingida por uma pancada do Rhandomm perde 6d6 pontos de vida. Sempre que o rhandomm rola um 6 num dos dados desse dano, soma esse valor e rola o dado novamente.
Salto Prodigioso (Movimento) O Rhandomm salta 60m para um espaço desocupado em qualquer direção.
Sentidos Titânicos O Rhandomm está permanentemente sob o efeito básico Visão da Verdade como uma magia simulada (veja p. 376).
Titânico O Rhandomm é imune a manobras de combate e não pode ser flanqueado. Quando se move, pisoteia qualquer criatura ou objeto Enorme ou menor em seu caminho (atravessando seu espaço), causando 20d6 pontos de dano de impacto (uma vez por rodada por criatura, Ref CD 50 reduz à metade). Além disso, seus ataques ignoram redução de dano e atingem todas as criaturas em um quadrado de 6m (para cada ataque, ele faz um único teste de ataque e compara o resultado com a Defesa de cada inimigo na área).
Varrer (Livre) Uma vez por rodada, quando o Rhandomm faz um ataque corpo a corpo e reduz os pontos de vida do alvo para 0 ou menos, pode realizar um ataque adicional contra outra criatura dentro do seu alcance.
Fraqueza Variável O Rhandomm é suscetível a um tipo de dano, que muda sempre que ele desperta de sua hibernação. Para determinar esse tipo de dano, role 1d10 e consulte a tabela a seguir. Efeitos que causem esse tipo de dano ignoram a imunidade a dano do Rhandomm.
1) Ácido
2) Corte
3) Eletricidade
4) Essência
5) Fogo
6) Frio
7) Impacto
8) Luz
9) Perfuração 10) Trevas Montanha Viva Um personagem pode gastar uma ação padrão e fazer um teste de Atletismo (CD 30) para escalar o Rhandomm. Se falhar por 5 ou mais, cai na frente do monstro e sofre 8d6 pontos de dano da queda. Se passar em três desses testes, chega nos ombros do monstro. Um personagem nos ombros do Rhandomm recebe camuflagem leve contra os ataques da criatura e faz ataques como se o Rhandomm estivesse desprevenido.
For 19, Des 4, Con 17, Int –4, Sab 0, Car 0
Tesouro Nenhum.`
        },
      ],
      regras: [
        { titulo: "Centauro",
          texto:
`“É perto daqui, um dia de viagem. Não, espera! Para vocês, bípedes… dois dias.”
— Hipólita, centaura xamã de Allihanna
Centauros vivem em pequenas comunidades silvestres, ocultas em florestas, planícies e savanas. São bastante gregários entre si, mas reservados quanto a estranhos. Em uma comunidade de centauros há caçadores que rastreiam e lutam, enquanto os demais se ocupam da colheita e dos afazeres domésticos. Centauros evitam cometer abusos contra a natureza. Não caçam ou pescam em demasia, nem na época reprodutiva de cada animal. As maiores tribos praticam a agricultura; algumas chegam a comercializar alimentos e artesanato com outras raças. Aldeias vizinhas a comunidades humanas podem manter relações pacíficas de comércio ou proteção mútua contra outras ameaças. Em certas regiões, centauros podem ser contratados para escoltar caravanas através de grandes extensões selvagens. Mas no geral eles evitam contato com povos bípedes; incursões de humanos em seus territórios de caça podem resultar em confrontos violentos. Centauros têm afinidade com elfos, dahllan, hynne e sílfides, por seus espíritos livres e sua ligação com a natureza. Seus maiores inimigos são os kobolds; esses pequenos covardes atacam e roubam suas aldeias, então se escondem em lugares de acesso impossível para os centauros. Não chegam a ser raros os casos de centauros que abandonam os modos de sua gente para viver em povoados humanos, ou mesmo atuar como aventureiros. Um centauro só aceita ser cavalgado em situações de vida ou morte, ou por alguém muito íntimo.` },
        { titulo: "Estirge",
          texto:
`“Pouco me importam seus problemas passados, não vou desistir de meu familiar. Acostumem-se!”
— Valeria Engelise, humana arcanista
O enxame é formado por seres voadores demoníacos que lembram grandes mosquitos, mas de corpos vermelhos e peludos, com asas negras de morcego. Têm cabeças insetoides alongadas, com trombas compridas e finas. Um único estirge é tão perigoso quanto um kobold, poucas vezes oferecendo perigo real. Infelizmente, estes insetos vampíricos são encontrados sempre em enxames, que por sua vez podem ser parte de vastas nuvens, capazes de cobrir cidades inteiras. Por onde passam, deixam rastros de cadáveres ressequidos. Seus números incalculáveis, assim como surgimentos e desaparecimentos súbitos, desafiam a lógica; estudiosos dizem que toda a vida animal em Arton não poderia alimentar uma única nuvem por muito tempo. Suspeita-se que enxames e nuvens de estirges sejam na verdade fenômenos planares, ou manifestações causadas por deuses enfurecidos. Felizmente, tais nuvens são catástrofes raras, poucas vezes ocorridas na história de Arton. Muito mais comuns são enxames menores ou mesmo pequenos bandos caçando nos ermos, emboscando viajantes e aventureiros. Fala-se também de conjuradores com preferências macabras que tomam um ou mais estirges como familiares.` },
        { titulo: "Fera-Cacto",
          texto:
`“Acudam-me, estou ferido! Uma seta de besta? Não, parece um espinho gigante!”
— Osbald Oddmar III, hynne nobre
Os seres vagamente humanoides, sem feições visíveis, avançam em silêncio. São cobertos de calosidades e espinhos afiados, e vários atingem dois metros de altura. Onde deveria haver mãos, trazem ferrões longos como adagas, que parecem ter o único propósito de matar. Feras-cactos são monstros vegetais de origem desconhecida, que rondam áreas secas — sobretudo desertos e savanas — em grupos. Diz-se que nascem e crescem enraizadas como cactos comuns, protegidos pelas feras adultas, até que se desprendem do solo e juntam-se ao bando para caçar. Preferem caçar à noite, mas podem estar ativas a qualquer hora do dia. São extremamente silenciosas; têm pés estofados, produzindo pouco ou nenhum ruído ao caminhar. Também usam uma linguagem de gestos para se comunicar. Feras-cactos podem disparar seus espinhos como setas de bestas. No entanto, mostram-se muito mais perigosas em combate corporal: as garras-espinhos nos braços são órgãos complexos, adaptados para penetrar fundo a carne e sugar sangue ou outros fluidos. Uma fraqueza pouco conhecida destes monstros é que, sob chuva forte ou imersos em água, apodrecem e morrem rapidamente. Não costuma ser problema nas regiões áridas que habitam, mas conjuradores com tal conhecimento — e as magias certas — podem tirar proveito dessa vulnerabilidade. Existem rumores de que as feras protegem grandes redes de túneis onde guardam os tesouros de suas vítimas. Esses covis também abrigam uma suposta fera-mãe, gigantesca demais para se mover, que governa a raça inteira. Tentativas de comunicação com essa matriarca foram, até agora, infrutíferas.` },
      ],
    },

    // ── 🐺 GNOLLS ──────────────────────────────────────
    {
      chave: "gnolls", nome: "Gnolls", icone: "🐺", cor: "#8a6a2f",
      intro: "Arton é um mundo habitado por inúmeros povos e raças. Nem todos são cordiais: muitos são hostis, perigosos. Podem ser mais ou menos inteligentes, mais ou menos parecidos com feras. Não raras vezes mostram uma aparência híbrida entre humanos e algum animal selvagem. É o caso dos gnolls. Estes humanoides com traços de hiena vivem em regiões ermas. São caçadores e salteadores, espreitando rotas comerciais menos protegidas. Embora perigosos, são muitas vezes considerados um problema “menor” por regentes e outras autoridades. Roubam e pilham, mas raramente matam — exceto quando a vítima mostra resistência. Por isso em geral, apenas aventureiros iniciantes (ou baratos) são contratados para lidar com eles. A cultura gnoll considera a rendição um ato honrado. Quando estão perdendo uma luta ou percebem que subestimaram um inimigo, gnolls não têm pudor em largar as armas e parar de lutar. Rendem-se de imediato, esperando receber a liberdade, ainda que percam todas as posses. Da mesma forma, um gnoll sempre aceita a rendição de um inimigo, levando o que puder carregar, mas deixando o oponente vivo e livre. Sob o ponto de vista gnoll, atacar alguém que já ofereceu rendição é impensável — quem fizer isso será considerado louco ou maligno, possivelmente caçado sem trégua por todas as alcateias da região. Ainda mais honrado é o ato de se render quando em clara vantagem, ou mesmo após vencer uma luta: entre gnolls, não há prova maior de dignidade e bravura. Exceto por seu código de rendição, gnolls são animalescos: respeitam apenas a lei do mais forte, fazem o que têm vontade, seguem seus instintos e desejos. Tomam o que pertence a outros sem cerimônia. Aqueles que se distanciam muito deste comportamento são vistos como “anormais” e muitas vezes expulsos do bando, ou se afastam por vontade própria. Não é improvável que acabem se juntando a grupos de aventureiros.",
      fichas: [
        {
          chave: "gnollCacadorDeCabecas", nome: "Gnoll Caçador de Cabeças", nd: "8", tipo: "Humanoide (gnoll) Médio",
          papel: '',
          resumo: "As setas envenenadas vieram de algum ponto nas árvores logo atrás.",
          texto:
`Gnoll Caçador de Cabeças ND 8
“Pensei que gnolls só andavam em bandos. Pensei que fossem covardes.”
— Reginold Torakk, humano clérigo de Tanna-Toh
As setas envenenadas vieram de algum ponto nas árvores logo atrás. Vocês percebem um vulto escondido nos galhos altos, a silhueta disfarçada por um capuz. Ele não diz nada, mas deixa escapar algo como uma risada estridente… O gnoll que não se ajusta aos padrões da raça, ou que acaba afastado dos seus, muitas vezes procura outros com quem viver — o que não é fácil, levando em conta sua reputação como bandidos covardes. Um gnoll desgarrado pode muito bem acabar juntando-se a aventureiros, estes indivíduos habituados a lidar com todo tipo de criatura estranha: uma vez aceito na nova “matilha”, rapidamente se torna leal aos companheiros. Gnolls aventureiros são valorizados por seu conhecimento dos ermos e habilidades em áreas selvagens. O gnoll solitário é muito raro, mas não de todo impossível. De fato, alguns fazem fama no Reinado como caça-recompensas, usando o faro apurado para rastrear seus alvos de forma implacável. Cobrando altos preços por seus serviços, podem acabar habituados à vida urbana no submundo do crime, conquistando respeito (e infâmia) em guildas de ladrões. O gnoll caçador de cabeças não segue mais o código de sua cultura nativa: aceita pedidos de rendição apenas quando a recompensa por alvos vivos é maior. Contudo, como sugere o título, sua preferência é entregar ao contratante a cabeça decepada.
Humanoide (gnoll) Médio
Iniciativa +12, Percepção +10, faro
Defesa 33, Fort +15, Ref +20, Von +9, imunidade a medo
Pontos de Vida 320
Deslocamento 12m (8q)
Corpo a Corpo Espada longa x2 +26 (1d8+15, 19) e mordida + 26 (1d6+15).
À Distância Besta leve x2 +27 (2d8+30, 19/x3).
Caminhos Selvagens O caçador de cabeças pode atravessar terrenos naturais difíceis sem sofrer redução em seu deslocamento.
Disparo Preciso O caçador pode fazer ataques à distância contra oponentes envolvidos em combate corpo a corpo sem sofrer a penalidade de –5 no teste de ataque.
Emboscar Na primeira rodada de combate, o caçador pode realizar uma ação padrão adicional.
Marca da Presa (Movimento) O caçador analisa uma criatura em alcance médio. Até o fim da cena, ele recebe +1d8 em rolagens de dano contra essa criatura (esse bônus é dobrado se a criatura for humanoide).
For 1, Des 4, Con 2, Int 1, Sab 1, Car –1
Perícias Atletismo +9, Furtividade +14, Sobrevivência +11.
Equipamento Bálsamo restaurador x3, besta leve precisa, couro batido, espada longa, virotes x20. Tesouro Padrão.`
        },
        {
          chave: "gnollCapanga", nome: "Gnoll Capanga", nd: "1/2", tipo: "Humanoide (gnoll) Médio",
          papel: '',
          subgrupo: "Gnoll Capanga",
          resumo: "Gnoll Capanga — Em meio aos goblins frenéticos, uma criatura maior se destaca.",
          texto:
`Gnoll Capanga ND 1/2
Humanoide (gnoll) Médio
Iniciativa +3, Percepção +3, faro
Defesa 14, Fort +5, Ref +3, Von +0
Pontos de Vida 8
Deslocamento 9m (6q)
Corpo a Corpo Espada curta +9 (1d6+3, 19) e mordida +9 (1d6+3).
Bote (Completa) O gnoll faz uma investida e ataca com sua espada curta e sua mordida. Os dois ataques recebem o bônus de +2 da investida, mas devem ser feitos contra a mesma criatura.
For 3, Des 1, Con 3, Int –1, Sab 1, Car –1
Perícias Sobrevivência +5.
Equipamento Armadura de couro, escudo leve, espada curta.
Tesouro Metade.`
        },
        {
          chave: "gnollSaqueador", nome: "Gnoll Saqueador", nd: "1", tipo: "Humanoide (gnoll) Médio",
          papel: '',
          subgrupo: "Gnoll Capanga",
          resumo: "Gnoll Capanga — Em meio aos goblins frenéticos, uma criatura maior se destaca.",
          texto:
`Gnoll Saqueador ND 1
Humanoide (gnoll) Médio
Iniciativa +5, Percepção +4, faro
Defesa 15, Fort +7, Ref +7, Von +1
Pontos de Vida 15
Deslocamento 9m (6q)
Corpo a Corpo Lança +10 (1d6+4) e mordida +10 (1d6+4).
À Distância Arco curto +9 (1d6+3, x3).
For 3, Des 2, Con 3, Int –2, Sab 1, Car –1
Equipamento Arco curto, flechas x20, lança. Tesouro Metade.`
        },
        {
          chave: "gnollFilibusteiro", nome: "Gnoll Filibusteiro", nd: "2", tipo: "Humanoide (gnoll) Médio",
          papel: '',
          subgrupo: "Gnoll Capanga",
          resumo: "Gnoll Capanga — Em meio aos goblins frenéticos, uma criatura maior se destaca.",
          texto:
`Gnoll Filibusteiro ND 2
Humanoide (gnoll) Médio
Iniciativa +9, Percepção +4, faro
Defesa 19, Fort +7, Ref +7, Von +4
Pontos de Vida 60
Deslocamento 9m (6q)
Corpo a Corpo Espada curta +11 (1d6+4, 19) e mordida +11 (1d6+4).
À Distância Mosquete +12 (2d8+9, 19/x3).
Recarga Rápida O gnoll filibusteiro pode recarregar seu mosquete como uma ação de movimento.
For 3, Des 4, Con 3, Int –1, Sab 2, Car –1
Equipamento Balas x20, espada curta, mosquete.
Tesouro Padrão.`
        },
        {
          chave: "gnollLiderDeAlcateia", nome: "Gnoll Líder de Alcateia", nd: "5", tipo: "Humanoide (gnoll) Médio",
          papel: '',
          resumo: "Os latidos-risadas dos gnolls são enervantes, eles estão claramente tentando abalar vocês.",
          texto:
`Gnoll Líder de Alcateia ND 5
“Ela é grande, mas não é duas! Está comandando vários, mas... Ah, vocês entenderam!”
— Octavius, minotauro guerreiro
Os latidos-risadas dos gnolls são enervantes, eles estão claramente tentando abalar vocês. Ainda assim, apesar da cacofonia caótica, uma gargalhada se sobrepõe às demais. Vocês percebem um gnoll maior e mais bem armado, incitando os outros. Um bando gnoll esgota rapidamente os recursos de qualquer lugar onde permaneça. Eles também preferem não atuar por muito tempo na mesma região, para evitar represálias das autoridades locais. Por isso quase nunca formam comunidades fixas: vivem em caravanas viajantes, ou alcateias. Existem casos de aldeias humanas remotas, longe de qualquer grande centro urbano, tomadas à força por uma alcateia gnoll. Os sobreviventes são expulsos. Deste ponto os gnolls lançam ataques contra comunidades vizinhas, até que alguma autoridade ou grupo de heróis fique sabendo (o que pode levar anos) e venha lidar com eles. O líder de alcateia costuma ser o indivíduo maior e mais forte, que os outros temem enfrentar, rendendo-se de imediato.
Humanoide (gnoll) Médio
Iniciativa +8, Percepção +5, faro
Defesa 24, Fort +17, Ref +11, Von +5
Pontos de Vida 200
Deslocamento 9m (6q)
Corpo a Corpo Machado de batalha +17 (1d8+12, x3) e mordida +17 (1d6+12).
À Distância Azagaia +17 (1d6+12).
Líder da Alcateia Para cada aliado adjacente, o líder recebe +2 em suas rolagens de dano.
Ordens (Movimento) O líder grita ordens para seus aliados em alcance médio. Eles recebem +2 em testes de perícia até o fim da cena.
For 3, Des 1, Con 2, Int 0, Sab 1, Car –1
Perícias Cavalgar +5, Intimidação +7, Sobrevivência +7.
Equipamento Azagaia x2, couro batido, machado de batalha. Tesouro Padrão.`
        },
        {
          chave: "gnollXamaDeAllihanna", nome: "Gnoll Xamã de Allihanna", nd: "2", tipo: "Humanoide (gnoll) Médio",
          papel: '',
          subgrupo: "Gnoll Xamã",
          resumo: "Gnoll Xamã — Os gnolls estão bastante feridos pelos golpes, alguns já esboçando sinais de rendição.",
          texto:
`Gnoll Xamã de Allihanna ND 2
Humanoide (gnoll) Médio
Iniciativa +2, Percepção +6, faro
Defesa 17, Fort +7, Ref +2, Von +13
Pontos de Vida 50
Deslocamento 9m (6q)
Pontos de Mana 12
Corpo a Corpo Clava +9 (1d6+6) e mordida +9 (1d6+6).
Caminhos Selvagens O xamã pode atravessar terrenos difíceis sem sofrer redução em seu deslocamento.
Medicina Primal (Completa) O xamã faz um teste de Cura (CD 15). Se passar, cura 2d6+3 PV de uma criatura adjacente com 0 PV ou menos.
Magias Como um clérigo de Allihanna de 2º nível (CD 18).
• Armamento da Natureza (Padrão, 2 PM) Uma das armas do xamã se torna mágica até o fim da cena; ela fornece +1 em testes de ataque e seu dano aumenta em um passo (de 1d6 para 1d8).
• Controlar Plantas (Padrão, 2 PM) Um quadrado de 9m de vegetação em alcance curto se torna terreno difícil. Criaturas na área quando a magia é lançada ou no início de seus próprios turnos ficam enredadas e imóveis (Ref evita). Uma vítima pode se libertar com uma ação padrão e um teste de Acrobacia ou Atletismo.
• Curar Ferimentos (Padrão, 2 PM) Uma criatura adjacente cura 3d8+3 PV.
For 1, Des 1, Con 2, Int 0, Sab 3, Car 0
Perícias Cura +6, Intuição +6, Religião +6, Sobrevivência +8.
Equipamento Armadura de couro, clava, símbolo sagrado de Allihanna.
Tesouro Padrão.`
        },
        {
          chave: "gnollXamaDeMegalokk", nome: "Gnoll Xamã de Megalokk", nd: "5", tipo: "Humanoide (gnoll) Médio",
          papel: '',
          subgrupo: "Gnoll Xamã",
          resumo: "Gnoll Xamã — Os gnolls estão bastante feridos pelos golpes, alguns já esboçando sinais de rendição.",
          texto:
`Gnoll Xamã de Megalokk ND 5
Humanoide (gnoll) Médio
Iniciativa +7, Percepção +9, faro
Defesa 24, Fort +11, Ref +8, Von +14, imunidade a medo
Pontos de Vida 170
Deslocamento 9m (6q)
Pontos de Mana 25
Corpo a Corpo Tacape +17 (1d10+16 19/x3) e mordida +17 (1d6+16).
Urro Divino (1 PM) Quando faz um ataque ou lança uma magia, o xamã soma sua Constituição à rolagem de dano desse ataque ou magia.
✦ Voz dos Monstros O xamã pode se comunicar livremente com monstros não inteligentes (Int –4 ou menor), como se estivesse sob efeito da magia Voz Divina.
Magias Como um clérigo de Megalokk de 5º nível (CD 20).
• Amedrontar (Padrão, 3 PM) Um animal ou humanoide em alcance curto fica apavorado por 1d4+1 rodadas e depois abalado (Von reduz para abalado por 1d4 rodadas).
• Armamento da Natureza (Padrão, 2 PM) Uma das armas do xamã se torna mágica até o fim da cena; ela fornece +1 em testes de ataque e seu dano aumenta em um passo (de 1d10 para 1d12 ou de 1d6 para 1d8).
• Físico Divino (Padrão, 3 PM) O xamã recebe +2 em Força até o fim da cena.
• Perdição (Padrão, 3 PM) Criaturas escolhidas em alcance curto sofrem –2 em testes de ataque e rolagens de dano até o fim da cena.
For 2, Des 1, Con 3, Int 0, Sab 3, Car –1
Perícias Atletismo +6, Intimidação +8, Religião +7.
Equipamento Couro batido, símbolo sagrado de Megalokk, tacape. Tesouro Padrão.`
        },
        {
          chave: "gnollXamaDeMarah", nome: "Gnoll Xamã de Marah", nd: "6", tipo: "Humanoide (gnoll) Médio",
          papel: '',
          subgrupo: "Gnoll Xamã",
          resumo: "Gnoll Xamã — Os gnolls estão bastante feridos pelos golpes, alguns já esboçando sinais de rendição.",
          texto:
`Gnoll Xamã de Marah ND 6
Humanoide (gnoll) Médio
Iniciativa +6, Percepção +9, faro
Defesa 25, Fort +9, Ref +5, Von +19, imunidade às condições alquebrado, esmorecido e frustrado
Pontos de Vida 180
Deslocamento 9m (6q)
Pontos de Mana 34
✦ Aura de Paz (Livre, 2 PM) O xamã gera uma aura de paz com 9m de raio e duração cena. Qualquer inimigo dentro da aura que tente fazer uma ação hostil contra ele deve passar em um teste de Vontade (CD 24) ou perde a ação. Se passar, fica imune a esta habilidade por um dia.
✦ Símbolo Sagrado Energizado (Movimento, 1 PM) O xamã energiza seu símbolo sagrado. Até o fim da cena, ele emite uma luz prateada que ilumina como uma tocha e, enquanto estiver sendo empunhado pelo xamã, reduz o custo de magias divinas em –1 PM.
Magias Como um clérigo de Marah de 6º nível (CD 24).
• Curar Ferimentos (Padrão, 6 PM) Uma criatura adjacente cura 7d8+7 PM.
• Dissipar Magia (Padrão, 3 PM) O xamã escolhe uma criatura, objeto ou esfera de 3m em alcance médio e faz um teste de Misticismo. Todas as magias nesse alvo com CD igual ou menor que o resultado do teste são dissipadas.
• Enfeitiçar (Padrão, 1 PM) Um humanoide em alcance curto fica enfeitiçado (Von evita).
• Santuário (Padrão, 1 PM) O xamã toca uma criatura. Até o fim da cena, ou até que essa criatura faça uma ação hostil, qualquer criatura que tente fazer uma ação hostil contra ela perde a ação (Von evita).
For 0, Des 1, Con 2, Int 2, Sab 4, Car 1
Perícias Cura +11, Diplomacia +8, Intuição +9, Misticismo +7, Religião +9.
Equipamento Bálsamo restaurador x4, couro batido, símbolo sagrado de Marah. Tesouro Padrão.`
        },
        {
          chave: "hiena", nome: "Hiena", nd: "1", tipo: "Animal Médio",
          papel: '',
          subgrupo: "Hiena",
          resumo: "Hiena — Não, NÃO foi ruim!” O bando de canídeos robustos, de orelhas arredondadas e focinhos enegrecidos, emite latidos enervantes que lembram risadas.",
          texto:
`Hiena ND 1
Animal Médio
Iniciativa +5, Percepção +6, faro, visão na penumbra
Defesa 14, Fort +9, Ref +6, Von +1
Pontos de Vida 17
Deslocamento 15m (10q)
Corpo a Corpo Mordida +9 (1d6+7, x3).
Derrubar (Livre) Mordida (teste +9).
Oportunista A hiena recebe +2 em rolagens de dano contra inimigos que tenham sofrido dano nesta rodada.
For 3, Des 3, Con 3, Int –4, Sab 2, Car –2
Perícias Furtividade +5 (+10 em colinas e planícies), Sobrevivência +6.
Tesouro Nenhum.
Parceiro A hiena é um parceiro especial (perseguidor) que fornece os benefícios a seguir. Iniciante: +2 em Furtividade e Sobrevivência. Veterano: você pode usar Oportunismo. Se possuir esse poder, em vez disso seu custo diminui em –1 PM. Mestre: você pode usar Sentidos Aguçados. Alternativamente, uma hiena pode ser uma montaria Média com as estatísticas de um hienodonte (a seguir).`
        },
        {
          chave: "hienaRainha", nome: "Hiena Rainha", nd: "2", tipo: "Animal Médio",
          papel: '',
          subgrupo: "Hiena",
          resumo: "Hiena — Não, NÃO foi ruim!” O bando de canídeos robustos, de orelhas arredondadas e focinhos enegrecidos, emite latidos enervantes que lembram risadas.",
          texto:
`Hiena Rainha ND 2
Animal Médio
Iniciativa +6, Percepção +7, faro, visão na penumbra
Defesa 18, Fort +12, Ref +7, Von +3, resistência a medo +5
Pontos de Vida 68
Deslocamento 15m (10q)
Corpo a Corpo Mordida +12 (2d6+12, x3).
Derrubar (Livre) Mordida (teste +12).
Gargalhada Perturbadora (Movimento) Todos os inimigos da hiena em alcance médio ficam abalados (Von CD 16 evita e torna a criatura imune a esta habilidade até o fim da cena) e todas as hienas e gnolls em alcance médio recebem +5 em Vontade até o fim da cena.
Oportunista A hiena recebe +2 em rolagens de dano contra inimigos que tenham sofrido dano nesta rodada.
For 3, Des 3, Con 3, Int –4, Sab 2, Car –2
Perícias Furtividade +6 (+11 em colinas e planícies), Sobrevivência +7.
Tesouro Nenhum.`
        },
        {
          chave: "hienodonte", nome: "Hienodonte", nd: "3", tipo: "Animal Grande",
          papel: '',
          subgrupo: "Hiena",
          resumo: "Hiena — Não, NÃO foi ruim!” O bando de canídeos robustos, de orelhas arredondadas e focinhos enegrecidos, emite latidos enervantes que lembram risadas.",
          texto:
`Hienodonte ND 3
Animal Grande
Iniciativa +5, Percepção +6, faro, visão na penumbra
Defesa 20, Fort +14, Ref +9, Von +4
Pontos de Vida 38
Deslocamento 12m (8q)
Corpo a Corpo Mordida +16 (2d8+15, x3).
Derrubar (Livre) Mordida (teste +18).
Oportunista O hienodonte recebe +2 em rolagens de dano contra inimigos que tenham sofrido dano nesta rodada.
For 6, Des 2, Con 4, Int –4, Sab 1, Car –2
Perícias Furtividade +3 (+8 em colinas e planícies), Sobrevivência +6.
Tesouro Nenhum.
Parceiro O hienodonte é um parceiro montaria (Grande) que fornece os benefícios a seguir. Iniciante: seu deslocamento muda para 12m e você recebe uma ação de movimento extra por turno (apenas para se deslocar). Veterano: você pode usar Oportunismo. Se possuir esse poder, em vez disso seu custo diminui em –1 PM. Mestre: quando acerta um ataque corpo a corpo, você pode fazer a manobra derrubar como uma ação livre.`
        },
        {
          chave: "matronaGnoll", nome: "Matrona Gnoll", nd: "11", tipo: "Humanoide (gnoll) Médio",
          papel: '',
          resumo: "Súbito, a numerosa alcateia abre passagem.",
          texto:
`Matrona Gnoll ND 11
“Agora vão me dizer que aquela abominação também é uma fêmea? Chega, desisto!”
— Octavius, minotauro guerreiro mal-informado
Súbito, a numerosa alcateia abre passagem. Um gnoll muito mais corpulento, muito mais impressionante, emerge entre eles. Usa adereços vistosos e empunha um machado imenso, sugerindo ser o líder. Contudo, um exame mais cuidadoso revela sinais de que pode ser uma fêmea. Entre gnolls, quase não há diferença externa visível entre machos e fêmeas, mas estas tendem a ser maiores. Visto que gnolls são fisicamente muito variados, algumas fêmeas são realmente imensas. Estas acabam se tornando líderes em grandes bandos. A matrona gnoll comanda por força e intimidação, mas também é a mais astuta na alcateia. Está sempre na liderança durante contatos (e conflitos) com outros povos. Em combate, é uma oponente poderosa e inspiradora: gnolls que estejam lutando a seu lado jamais se rendem, a menos que ela o faça primeiro.
Humanoide (gnoll) Médio
Iniciativa +11, Percepção +15, faro
Defesa 39, Fort +25, Ref +11, Von +18, imunidade a medo, redução de dano 5
Pontos de Vida 390
Deslocamento 9m (6q)
Corpo a Corpo Machado de guerra x2 +32 (3d6+26, x3) e mordida +32 (1d6+26).
Latido Enervante (Movimento) A matrona gnoll emite latidos-risadas. Todos os inimigos em alcance curto perdem sua ação de movimento no próximo turno (Von CD 33 evita). Recarga (acertar um ataque de mordida).
Matrona da Alcateia Gnolls aliados em alcance médio recebem imunidade a medo e +2 em testes de perícias e rolagens de dano.
Pega! (Completa) A matrona ordena que todos os gnolls em alcance curto façam um ataque como uma reação imediatamente. Recarga (movimento).
Quebra-Pescoço (Reação) Se um ataque de mordida da matrona exceder a Defesa do inimigo por 5 ou mais, ela sacode violentamente sua presa. A vítima perde 6d6 pontos de vida e fica atordoada por 1 rodada (Fort CD 33 reduz a perda de vida à metade e evita a condição).
For 4, Des 1, Con 5, Int 0, Sab 2, Car 3
Perícias Intimidação +19, Sobrevivência +13.
Equipamento Couraça macabra, machado de guerra cruel.
Tesouro Padrão.`
        },
        {
          chave: "gnollVuulRak", nome: "Gnoll Vuul’rak", nd: "16", tipo: "Humanoide (gnoll) Grande",
          papel: '',
          resumo: "O monstro grotesco tem alguma semelhança com os homens-hienas saqueadores dos ermos, mas claramente não se trata da mesma criatura.",
          texto:
`Gnoll Vuul’rak ND 16
“Gnoll? Seu erro é compreensível, mas veja a quantidade de cabeças! Obviamente é uma hidra!”
— Barossa Arareber, estudiosa de hidras
O monstro grotesco tem alguma semelhança com os homens-hienas saqueadores dos ermos, mas claramente não se trata da mesma criatura. É bem maior que um ogro, com várias cabeças e um número ainda maior de braços, cada um empunhando um tacape ou outra arma rústica. Seus latidos-risadas, em vez de buscar a intimidação, trazem apenas uma fúria insana. A origem dos gnolls é desconhecida. Eles próprios não cultivam um mito de criação elaborado, acreditam apenas descender do “Outro Povo”. Contudo, algo intrigante sobre eles é seu idioma, derivado do élfico. Não se sabe como aprenderam essa língua; é possível que as raças tivessem relações no passado. Uma teoria acadêmica mais assustadora, no entanto, sugere que os gnolls sejam elfos vitimados por alguma maldição. A existência do monstruoso Vuul’rak pode ser uma confirmação dessa hipótese. O gigante lembra um gnoll imenso e deformado, com múltiplas cabeças e braços. Não demonstra qualquer inteligência, vive em estado de fúria constante, atacando e matando tudo que encontra — mas sua cólera parece aumentar ainda mais na presença de elfos, sempre seus primeiros alvos. Suas primeiras aparições registradas, em ataques sanguinários a aldeias ou caravanas, ocorreram em 1405: mesmo ano em que a deusa élfica Glórienn perdia seu posto no Panteão. Coincidência? Ou o evento divino arrebatou certo número de gnolls ao acaso, transformando-os em bestas disformes? Ainda, foi mesmo ao acaso? “Vuul’rak” é um nome gnoll comum, significa “aquele que vale por muitos”. Entre as alcateias gnolls conta-se que, anos atrás, “algo terrível” aconteceu com vários entre aqueles chamados Vuul’rak…
Humanoide (gnoll) Grande
Iniciativa +14, Percepção +15, faro
Defesa 51, Fort +29, Ref +25, Von +17, imunidade a efeitos mentais, redução de dano 10
Pontos de Vida 900
Deslocamento 12m (8q)
Corpo a Corpo Três mordidas +44 (2d6+30) e dois tacapes +44 (2d10+30).
Descarregar Raiva (Reação) Uma vez por rodada, se os PV do Vuul’rak forem reduzidos abaixo de um valor múltiplo de 100 (800, 700 etc.), ele libera sua raiva atacando tudo ao seu redor. Ele faz um ataque de tacape e compara o resultado com a Defesa de cada criatura ao seu alcance. Mesmo que erre uma criatura, ainda assim ele causa metade do dano a ela.
Golpe Avassalador (Livre) Quando acerta um ataque de tacape, o Vuul’rak arremessa a vítima 1d6 x 1,5m em uma direção à escolha dele (Fort CD 42 evita). A vítima fica caída e, se atingir algum obstáculo, sofre 1d6 pontos de dano de impacto para cada 1,5m que foi arremessada.
Ódio Inexplicável O Vuul’rak recebe +5 em testes de ataque e rolagens de dano contra elfos e ataca esses seres sempre que possível.
For 8, Des 0, Con 10, Int –4, Sab 1, Car –2
Equipamento Tacape aumentado x2. Tesouro Padrão.`
        },
      ],
      regras: [
        { titulo: "Totens Risonhos",
          texto:
`Embora sejam saqueadores ferozes, gnolls cultivam formas únicas de artesanato, cuja principal expressão são os totens risonhos. Um totem risonho é um tronco com dois metros de altura cravado no chão, com uma face assustadora no alto. Essa carranca — que invariavelmente exibe um sorriso de muitas presas — é feita de entalhes combinados com materiais naturais e itens tomados de inimigos, enquanto o restante do tronco é decorado com pinturas e partes de animais, como penas, dentes e retalhos de peles. Totens risonhos existem para marcar o território gnoll, encorajar seus guerreiros e assustar seus inimigos. Como gnolls raramente mantêm territórios por longos períodos, é raro encontrar esses troncos; sua presença indica que um bando gnoll reside há algum tempo na área, sentindo-se confortável e seguro o suficiente para erguer estruturas. Um totem risonho afeta uma esfera de 30m ao seu redor. Nessa área, gnolls recebem +2 em testes de perícia e rolagens de dano. Outras criaturas sofrem –2 em testes de perícia e rolagens de dano (Von CD 22 evita e a criatura não pode mais ser afetada por esse totem por um dia; este é um efeito de medo). Um totem risonho também fortalece o poder mágico dos gnolls; um gnoll conjurador recebe +2 na CD para resistir às suas magias e causa +1 ponto de dano por dado de dano de magias. Os efeitos de um totem risonho são anulados caso ele seja derrubado ou destruído. Derrubar um totem requer uma ação completa e passar em um teste de Atletismo (CD 25). Um totem é um objeto Médio com Defesa 10, RD 5 e 50 pontos de vida. A critério do mestre, uma área de totens risonhos pode aumentar em +1 o ND dos encontros com gnolls (apenas para efeitos de XP).` },
        { titulo: "Gnoll Capanga",
          texto:
`“Viu o novo guarda-costas do chefe? Lá está ele, comendo alguma… coisa…?”
— Garmund, humano ladino
Em meio aos goblins frenéticos, uma criatura maior se destaca. É alto, apesar da pose recurvada, e coberto de pelagem escura. Na cabeça robusta, grandes orelhas arredondadas e um focinho largo, que exibe uma boca cheia de presas amareladas. Como povo, gnolls são hostis e raivosos, reagindo a qualquer não gnoll com violência — atacam sem dar atenção a raça, brasões e bandeiras. Como indivíduo, contudo, o gnoll odeia e teme ficar sozinho. Sendo uma criatura de matilha, estar em menor número é sempre uma desvantagem e estar isolado é morte certa. Se por alguma razão acaba desgarrado de seus semelhantes, não mede esforços para se juntar a quaisquer outros humanoides (quase sempre oferecendo rendição para mostrar sua lealdade). Nem sempre funciona. O costume de se render leva muitos a achar que os gnolls são covardes e desonrados — sendo incomum, portanto, que formem bandos com outros monstros. Mas não chega a ser raro ver um gnoll em meio a outros povos humanoides, ou agindo como guarda ou capanga para algum vilão. Existem até casos em que um gnoll solitário faz amizade com uma criança humana.` },
        { titulo: "Gnoll Xamã",
          texto:
`“Tem algo errado, por que eles não desistem? Ali, ALI! Um deles está curando os outros!”
— Maurice, osteon cavaleiro
Os gnolls estão bastante feridos pelos golpes, alguns já esboçando sinais de rendição. Antes que isso aconteça, contudo, seus corpos são restaurados e seus ferimentos se fecham. A mágica luminosa de cura foi conjurada por um gnoll na retaguarda, em mantos esfarrapados, exibindo algo que poderia ser um símbolo sagrado de… Não, não é possível! Gnolls não podem ser considerados fiéis muito fervorosos. Mas, como muitos povos dos ermos, podem ser levados a venerar deuses da natureza.
Allihanna e Megalokk, sem muita surpresa, figuram entre seus favoritos. Bem curioso, no entanto, é o eventual devoto de Marah. Esta deusa prega a não violência e gnolls respeitam a rendição acima de tudo: assim, o gnoll devotado à Deusa da Paz ainda recorre a ameaça e intimidação durante suas pilhagens, mas sem consumar qualquer agressão física. Não importando sua divindade padroeira, xamãs gnolls sempre adotam o mesmo papel em combate, curando e fortificando enquanto seus colegas lutam. Em outras situações, além de aconselhar o chefe (ou rivalizar com ele pelo comando), o xamã cuida da vida espiritual da comunidade.` },
        { titulo: "Hiena",
          texto:
`“Pelo menos ELAS gostam de minhas piadas. Inclusive esta.
Não, NÃO foi ruim!”
— Bazza Hyzzabo, qareen bardo
O bando de canídeos robustos, de orelhas arredondadas e focinhos enegrecidos, emite latidos enervantes que lembram risadas. Embora sejam ameaçadores, entre eles emerge uma criatura muito maior, saída de pesadelos. Ainda que gnolls não tenham parentesco real com hienas (até onde se sabe), é impossível negar sua semelhança e afinidade. Muitos bandos gnoll acabam domesticando estes carniceiros; hienas assumem ali os mesmos papéis dos cães nas sociedades humanas, como animais de guarda e caça. Enquanto outros seres são abalados por seu latido estridente, nos gnolls o efeito é oposto, reforçando seu moral e tornando-os imunes ao medo. Em estado selvagem, hienas costumam seguir grandes predadores para comer restos de suas presas — ou, quando a oportunidade surge, para roubá-las. Bandos famintos podem atacar viajantes, mas apenas quando em maior número; se perdem membros a ponto de eliminar essa vantagem, os sobreviventes recuam ou fogem. Ainda assim, são animais mais perigosos do que parecem; a mordida terrível, capaz de triturar ossos, está entre as mais fortes das crias de Allihanna — até rivalizando com carnívoros bem maiores, como o próprio rei-tirano de Galrasia. Mais raro e perigoso que as hienas, também existe o hienodonte, sua versão atroz de tempos primevos. Quase do tamanho de um urso, raramente é encontrado longe de Galrasia, onde forma bandos capazes de abater os maiores lagartos-trovão. Alguns foram trazidos para o Reinado por caçadores; acabaram escapando para os ermos, cruzando com hienas normais e liderando suas alcateias. Os maiores bandos gnolls conseguem usá-los como montarias poderosas, e diz-se que alguns aventureiros também os cavalgam.` },
      ],
    },

    // ── 🗿 GOLENS ──────────────────────────────────────
    {
      chave: "golens", nome: "Golens", icone: "🗿", cor: "#566573",
      intro: "Nem tudo que vive e caminha em Arton foi criado pelos deuses. Há aqueles forjados pela mão dos mortais. Golens são seres artificiais, construídos por arcanistas, clérigos e inventores habilidosos. Os métodos e materiais usados em sua fabricação variam tanto quanto seus corpos e formatos. Podem ser movidos a vapor, por combustíveis exóticos ou com magia elemental. Podem ser feitos de madeira, metal, pedra ou carne. Podem ser rústicos, toscos, pouco mais que espantalhos, ou magníficas obras de arte da engenharia. Podem ser pequenos e fracos como brinquedos ou imensos e poderosos como gigantes. Golens têm sido produzidos por toda Arton com propósitos diversos. A Supremacia Purista os utiliza como máquinas de guerra. No reino de Wynlla, são empregados como servos e gladiadores. A Igreja de Tanna-Toh conta com uma rede de golens conectados a seu sumo-sacerdote, o Helladarion. Artífices obsessivos por toda Arton buscam construir o golem mais perfeito, aquele que vai superar as próprias criações dos deuses. “Mas por que gastar fortunas para comprar ou forjar um golem se, em vez de proteger meu castelo, ele decide que gosta mais de ser cozinheiro?” Muitos leigos fazem essa pergunta. De fato, existem golens não inteligentes ou conscientes, que apenas seguem ordens, e existem os “despertos”, com vontade própria, vida e alma. Estes são forjados com propósitos especiais — é frequente que seu criador os faça assim como substituto para um ente querido, ou para cumprir alguma grande missão. Também existem casos de golens que “despertam” espontaneamente, devido a algum acidente, erro de fabricação ou simples vontade divina. Podem continuar servindo a seu criador, por lealdade e gratidão, ou procurar seu lugar no mundo. Devotar-se aos deuses. Partir em aventuras. Combater o mal. Viver a vida.",
      fichas: [
        {
          chave: "gargula", nome: "Gárgula", nd: "2", tipo: "Construto Médio",
          papel: '',
          subgrupo: "Gárgula",
          resumo: "Gárgula — A criatura parece a estátua de um humanoide grotesco e alado, com chifres, cauda e garras.",
          texto:
`Gárgula ND 2
Construto Médio
Iniciativa +3, Percepção +3, visão no escuro
Defesa 19, Fort +13, Ref +7, Von +2, imunidade a petrificado, redução de dano 5
Pontos de Vida 65
Deslocamento 12m (8q), voo 18m (12q)
Corpo a Corpo Duas garras +12 (1d6+6).
Imobilidade Uma gárgula pode permanecer completamente imóvel. Se ela estiver assim, um personagem deve passar num teste de Percepção (CD 35) para perceber que ela é uma criatura e não uma estátua.
For 6, Des 2, Con 4, Int –2, Sab 1, Car –2
Tesouro Padrão.`
        },
        {
          chave: "gargulaAssassina", nome: "Gárgula Assassina", nd: "4", tipo: "Construto Médio",
          papel: '',
          subgrupo: "Gárgula",
          resumo: "Gárgula — A criatura parece a estátua de um humanoide grotesco e alado, com chifres, cauda e garras.",
          texto:
`Gárgula Assassina ND 4
Construto Médio
Iniciativa +6, Percepção +5, visão no escuro
Defesa 25, Fort +16, Ref +10, Von +4, imunidade a petrificado, redução de dano 5
Pontos de Vida 140
Deslocamento 12m (8q), voo 18m (12q)
Corpo a Corpo Duas garras +17 (2d6+10).
Ataque Furtivo +2d6
Imobilidade Uma gárgula pode permanecer completamente imóvel. Se ela estiver assim, um personagem deve passar num teste de Percepção (CD 35) para perceber que ela é uma criatura e não uma estátua.
For 6, Des 2, Con 4, Int –2, Sab 1, Car –2
Tesouro Padrão.`
        },
        {
          chave: "golemDeBarro", nome: "Golem de Barro", nd: "10", tipo: "Construto Grande",
          papel: '',
          resumo: "O monstro lembra um humanoide grotesco, com feições disformes.",
          texto:
`Golem de Barro ND 10
“Quê? O chão está se levantando? Que coisa é essa? Será que fiquei louco!?”
— Lorem’Ipsum, kliren clérigo de Nimb
O monstro lembra um humanoide grotesco, com feições disformes. Os olhos são buracos escuros e desiguais, acima de uma bocarra que parece ter sido cortada em sua cabeça. A “pele” parece sempre em movimento, escorrendo e gotejando enquanto o reconstitui continuamente. A fabricação do golem de barro é um procedimento perigoso, envolvendo forçar uma combinação de centelhas elementais diferentes em uma mesma forma. Quase sempre o resultado é uma explosão arcana espetacular. Quando bem-sucedido, contudo, o processo combina a resistência da terra e a flexibilidade da água, resultando em um monstro perigoso — e instável. Criadores que tenham sobrevivido à fabricação em si podem acabar mortos pela fúria da criatura. O golem de barro existe em tormento constante, as forças elementais que o compõem sempre em conflito, a bocarra continuamente ecoando gritos de agonia. Mas, quando está sob controle, é um guardião excepcional. Pode transformar o corpo liquefeito em uma camada no chão, parede ou teto, esperando para atacar intrusos de surpresa. Em combate, também pode disparar projéteis de lama. Por seu espírito atormentado, é muito raro um golem de barro adquirir consciência. Quando isso acontece, para manter a sanidade, ele perde grande parte de seus poderes, adotando uma forma humanoide estável.
Construto Grande
Iniciativa +9, Percepção +9, visão no escuro
Defesa 36, Fort +22, Ref +10, Von +16, redução de dano 20/fogo
Pontos de Vida 400
Deslocamento 9m (6q)
Corpo a Corpo Duas pancadas +29 (2d10+25).
À Distância Tiro de lama x4 +26 (2d6+11, impacto, alcance médio).
Corpo Barroso Em seu estado natural, o corpo do golem é maleável e feito de uma lama gosmenta. Nesse estado, ele pode passar por espaços apertados sem necessidade de testes de Acrobacia.
Imunidade a Magia O golem de barro é imune a efeitos mágicos, com a seguinte exceção. A magia Controlar Terra usada com o efeito de solidificar desativa os benefícios da habilidade Corpo Barroso; se usada com o efeito de amolecer, recupera esses benefícios. O golem pode fazer um teste de Fortitude para resistir a qualquer um desses efeitos.
Lama Uma criatura atingida por um ataque do golem sofre uma penalidade cumulativa de –1 em todas as perícias.
Remover a lama (e a penalidade) exige uma ação completa.
Ressecamento Caso sofra 100 pontos de dano de fogo, o corpo do golem resseca e endurece. Quando isso acontece, ele perde seus ataques à distância, sua redução de dano e as habilidades Corpo Barroso e Lama. Entretanto, o dano de suas pancadas se torna (2d10+30, x4). O golem volta ao seu estado natural se passar uma semana imerso em água.
For 4, Des 0, Con 6, Int —, Sab 0, Car –5
Perícias Furtividade +19 (+4 quando ressecado).
Tesouro 1d4 doses de corrosivo mineral (CD 25 para extrair).`
        },
        {
          chave: "golemDeBronze", nome: "Golem de Bronze", nd: "9", tipo: "Construto Grande",
          papel: '',
          resumo: "O vulto em couraça cobreada bem poderia ser algum legionário tapistano.",
          texto:
`Golem de Bronze ND 9
“Se reluz, é ouro! Não é? Venha aqui, vou convencê-lo do contrário.”
— Joe del Nileppez, elfo ladino
O vulto em couraça cobreada bem poderia ser algum legionário tapistano. Conforme se torna mais visível, no entanto, vocês percebem algo não natural em seus movimentos. A verdade fica mais evidente quando brilhos flamejantes vazam das frestas em sua armadura. Estes são os golens mais comuns, usados como guardas em castelos e templos, ou como soldados em forças militares por toda Arton. Embora ainda sejam engenhos custosos, sendo impossível produzir o bastante para formar grandes tropas, podem ser encontrados em duplas ou equipes de 1d4+1 indivíduos. Além de bronze, sua fabricação também usa outras ligas metálicas não ferrosas, como latão. Estes metais mais maleáveis não oferecem a mesma proteção do ferro, mas permitem mais mobilidade. Golens de bronze são também mais customizáveis, com atributos diferentes de outros construtos. Por existirem em maior quantidade, estes são também os golens que se tornam conscientes com maior frequência. Podem ser vistos levando vidas comuns em grandes cidades, trabalhando em alguma fazenda ou — claro — integrando grupos de aventureiros.
Construto Grande
Iniciativa +4, Percepção +10, visão no escuro
Defesa 34, Fort +21, Ref +10, Von +15, redução de dano 10
Pontos de Vida 350
Deslocamento 9m (6q)
Corpo a Corpo Duas pancadas +27 (2d10+23).
Imunidade a Magia O golem de bronze é imune a efeitos mágicos, com as seguintes exceções. Efeitos mágicos de eletricidade o deixam lento por 1d6 rodadas. Efeitos mágicos de fogo removem a condição lento e curam PV em quantidade igual à metade do dano que causariam.
Soar os Sinos (Padrão) O golem bate em seu peito e emite um som alto e retumbante. Todas as criaturas em alcance curto perdem 6d6+10 pontos de vida, ficam surdas por 1d4 rodadas e atordoadas por 1 rodada (Fort CD 28 reduz a perda à metade e evita as condições). Uma criatura só pode ser atordoada por esta habilidade uma vez por cena. Recarga (movimento).
For 7, Des 0, Con 5, Int —, Sab 0, Car –5
Tesouro Nenhum.`
        },
        {
          chave: "golemDeCarne", nome: "Golem de Carne", nd: "7", tipo: "Construto Grande",
          papel: '',
          resumo: "O vulto robusto, quase humano à primeira vista, logo revela o horror de sua real natureza.",
          texto:
`Golem de Carne ND 7
“Deuses tenham piedade! Essa coisa é feita com partes de gente que eu conheço!”
— Isendra Tharania, clériga de Azgher
O vulto robusto, quase humano à primeira vista, logo revela o horror de sua real natureza. Um cheiro de terra úmida e carne morta os atinge. A criatura grotesca e inchada parece feita com partes de diferentes cadáveres, costuradas e aparafusadas para formar um novo ser. Veste apenas trapos rústicos, não empunha armas. Ainda assim, parece forte o bastante para erguer uma carruagem. Golens de carne são produto da obsessão de algum arcanista, clérigo ou inventor louco, buscando criar a forma de vida perfeita, ou talvez ressuscitar um ente querido. Infelizmente, o resultado mais comum de tal experimento é um monstro insano e incontrolável, cheio de ódio por sua própria existência. Quase todos matam o criador assim que despertam, para então vagar a passos trôpegos em busca da próxima vítima. Golens de carne não falam, apenas emitem grunhidos e rugidos. Podem ser confundidos com zumbis, levando aventureiros inexperientes a subestimá-los. Poucos destes golens, muito poucos, têm inteligência e consciência. Alguns até guardam memórias da vida antiga, o cérebro reativado por eletricidade preserva parte de suas lembranças. Se vai permanecer leal a seu criador, ou apenas vagar em busca de um objetivo, será sua escolha.
Construto Grande
Iniciativa +6, Percepção +7, visão no escuro
Defesa 31, Fort +18, Ref +6, Von +14, imunidade a metamorfose e trevas, redução de dano 5
Pontos de Vida 300
Deslocamento 9m (6q)
Corpo a Corpo Duas pancadas +25 (2d10+18).
Fúria Homicida Se estiver com a metade de seus PV, o golem de carne entra em um estado de fúria homicida. Ele recebe +4 em testes de ataque e rolagens de dano e, quando causa dano, deixa a vítima sangrando. Entretanto, sempre deve atacar a criatura mais próxima.
Imunidade a Magia O golem é imune a efeitos mágicos, com as seguintes exceções. Magias de fogo e frio deixam o golem lento por 1d6 rodadas. Efeitos mágicos de eletricidade removem a condição lento e curam PV em quantidade igual à metade do dano que causariam.
For 5, Des –1, Con 4, Int —, Sab 0, Car –5
Tesouro Nenhum.`
        },
        {
          chave: "golemDeEspelhos", nome: "Golem de Espelhos", nd: "9", tipo: "Construto Grande",
          papel: '',
          resumo: "O que parecia algum tipo de escultura pitoresca, angulosa e sem feições, revela-se como uma criatura metálica toda coberta de espelhos.",
          texto:
`Golem de Espelhos ND 9
“Sou lindo até mesmo quando refletido no inimigo!”
— Pitre, qareen bardo
O que parecia algum tipo de escultura pitoresca, angulosa e sem feições, revela-se como uma criatura metálica toda coberta de espelhos. Súbito, com um brilho mágico, ele está empunhando uma arma encantada exatamente igual a essa aí em suas mãos… Este é um tipo exótico e poderoso de construto, formado por uma estrutura de mitral e revestido de espelhos encantados. O golem de espelhos é forte e resistente, mas seu maior poder é imitar habilidades daqueles refletidos em seu corpo. A origem destes golens parece relacionada às Catacumbas de Leverick e a seu mestre, o atual sumo-sacerdote de Hyninn. Rodleck Leverick teria capturado o marido de um renomado artífice, forçando-o a fabricar vários destes construtos sinistros para povoar sua masmorra infindável, tornando-a ainda mais perigosa. Após concluir a tarefa terrível, o inventor exigiu a devolução de seu amado. O Clérigo Máximo dos Ladrões, naturalmente, trapaceou no acordo; diz-se que o casal se encontra até hoje em algum calabouço, como iscas para atrair ainda mais aventureiros. Mais tarde, a fórmula para fabricar estes golens teria sido descoberta por outros artífices. Como é fácil deduzir, golens de espelhos são especialmente efetivos contra aventureiros cheios de poderes especiais, sendo capazes de usar esses mesmos poderes contra eles próprios. Quando um golem de espelhos ganha consciência, contudo, sua habilidade de imitar poderes se reduz drasticamente.
Construto Grande
Iniciativa +9, Percepção +9, visão no escuro
Defesa 32, Fort +21, Ref +9, Von +15
Pontos de Vida 350
Deslocamento 9m (6q)
Corpo a Corpo Espada bastarda x2 +28 (2d10+24, 18).
Copiar (Movimento) O golem copia uma habilidade (exceto a habilidade Magias) ou uma magia de uma criatura em alcance curto que possa ver, até o fim da cena. Ele pode ter até 5 habilidades e/ou magias copiadas ao mesmo tempo, e pode usá-las com suas próprias características (quando aplicável, a CD dessas habilidades é 28).
Imunidade a Magia O golem é imune a efeitos mágicos, com as seguintes exceções. A magia Despedaçar causa 50% a mais de dano no golem. Efeitos mágicos de escuridão deixam o golem lento enquanto ele estiver na área afetada.
Refletir (Reação) Uma vez por rodada, quando é alvo de um efeito que permite um teste de resistência e passa nesse teste, o golem pode refletir todo o efeito para uma criatura a sua escolha em alcance curto (o golem não sofre nenhuma parte do efeito). A criatura escolhida se torna o novo alvo do efeito, que é resolvido normalmente, mas o golem faz qualquer escolha necessária.
For 6, Des 0, Con 5, Int —, Sab 0, Car –5
Equipamento Espada bastarda aumentada precisa. Tesouro Fragmento refletor (CD 24 para extrair, reduz em 1 PM o custo para fabricar um item com o encanto refletor).`
        },
        {
          chave: "golemDeFerro", nome: "Golem de Ferro", nd: "10", tipo: "Construto Grande",
          papel: '',
          subgrupo: "Golem de Ferro",
          resumo: "Golem de Ferro — O titã se assemelha a um gigante vestindo armadura pesada e elmo fechado, com punhos descomunais.",
          texto:
`Golem de Ferro ND 10
Construto Grande
Iniciativa +4, Percepção +9, visão no escuro
Defesa 36, Fort +24, Ref +14, Von +11, redução de dano 10
Pontos de Vida 400
Deslocamento 9m (6q)
Corpo a Corpo Duas pancadas +30 (2d10+25).
Imunidade a Magia O golem de ferro é imune a efeitos mágicos, com as seguintes exceções. Efeitos mágicos de eletricidade deixam o golem de ferro lento por 1d6 rodadas. Efeitos mágicos de fogo removem a condição lento e curam 1 PV para cada 3 pontos de dano que causariam.
Sopro (Movimento) O golem expele uma nuvem de gás venenoso que preenche um cubo de 3m. Criaturas dentro da área perdem 6d12 pontos de vida e ficam enjoadas (Fort CD 30 reduz à metade e evita a condição). Recarga (movimento), veneno.
For 12, Des –1, Con 10, Int —, Sab 0, Car –5
Tesouro Nenhum.`
        },
        {
          chave: "golemDeFerroSuperior", nome: "Golem de Ferro Superior", nd: "15", tipo: "Construto Grande",
          papel: '',
          subgrupo: "Golem de Ferro",
          resumo: "Golem de Ferro — O titã se assemelha a um gigante vestindo armadura pesada e elmo fechado, com punhos descomunais.",
          texto:
`Golem de Ferro Superior ND 15
Construto Grande
Iniciativa +8, Percepção +11, visão no escuro
Defesa 55, Fort +28, Ref +22, Von +15, redução de dano 15
Pontos de Vida 760
Deslocamento 9m (6q)
Corpo a Corpo Duas pancadas +43 (4d10+40, x3).
Imunidade a Magia O golem de ferro superior é imune a efeitos mágicos, com as seguintes exceções. Efeitos mágicos de eletricidade deixam o golem de ferro lento por 1d6 rodadas. Efeitos mágicos de fogo removem a condição lento e curam 1 PV para cada 3 pontos de dano que causariam.
Sopro (Movimento) O golem expele uma nuvem de gás venenoso que preenche um cubo de 3m. Criaturas dentro da área perdem 10d12 pontos de vida e ficam enjoadas (Fort CD 40 reduz à metade e evita a condição). Recarga (movimento), veneno.
Marcha de Ferro (Completa) O golem percorre até o dobro do seu deslocamento em linha reta, passando por qualquer criatura Média ou menor. Uma criatura atropelada sofre 10d12+35 pontos de dano e fica caída (Ref CD 40 reduz à metade e evita a condição).
For 15, Des –1, Con 10, Int —, Sab 0, Car –5
Tesouro Nenhum.`
        },
        {
          chave: "golemDeMateriaVermelha", nome: "Golem de Matéria Vermelha", nd: "18", tipo: "Construto (lefeu) Enorme",
          papel: '',
          resumo: "O grande construto humanoide sem feições parece ter sido feito com algo que vocês não conseguem identificar — ou melhor, algo que não…",
          texto:
`Golem de Matéria Vermelha ND 18
“Forjar um construto com o abjeto material da Anticriação! Que maldito ousou isso?”
— Gedmund Storme, paladino de Khalmyr
O grande construto humanoide sem feições parece ter sido feito com algo que vocês não conseguem identificar — ou melhor, algo que não conseguem aceitar. Leva algum tempo até que uma terrível compreensão venha a atingir suas mentes: aquele material sangrento não poderia ter qualquer outra origem, exceto a Tormenta. O golem mais perigoso que existe só poderia ser feito com o material mais perigoso que existe. A maioria daqueles que se aventuram em uma área de Tormenta buscam meios para combater os lefeu, estudar a tempestade e bani-la. Porém, existem aqueles que exploram esse conhecimento para proveito próprio. A partir de matéria vermelha recolhida no território inimigo, arcanistas e inventores malignos foram capazes de construir golens. Sua fabricação é muito arriscada para o artífice, pois o contato prolongado com esse material afeta a sanidade. Se bem que qualquer inventor que decida construir algo assim já deve ser louco… Em combate, o construto macabro ataca com golpes das mãos ou garras, esmagando ou rasgando suas vítimas. Seu toque também queima como ácido. Assim, sua tática mais comum é agarrar o inimigo, mantendo-o seguro enquanto suas excreções corrosivas fazem o resto. Golens de matéria vermelha não usam centelhas elementais como fonte de energia; aquilo que os impulsiona são as próprias forças antinaturais da Tormenta. Estes construtos terríveis, portanto, nunca adquirem consciência.
Construto (lefeu) Enorme
Iniciativa +15, Percepção +20, visão no escuro
Defesa 50, Fort +32, Ref +26, Von +18, imunidade a magia, redução de dano 20
Pontos de Vida 900
Deslocamento 9m (6q)
Corpo a Corpo Duas pancadas +50 (3d10+30, x3, mais 2d6 matéria vermelha).
Abraço Corrosivo (Livre) O golem de matéria vermelha cobre de ácido uma criatura que esteja agarrando. Enquanto estiver agarrada, e por 1 rodada após se soltar, a criatura sofre 10d10 pontos de dano de ácido no início de cada turno do golem.
Agarrar Aprimorado (Livre) Pancada (teste +55).
Distorção Temporal O golem realiza uma ação padrão ou de movimento adicional por turno.
Insanidade da Tormenta 3d10 (Von CD 47 evita).
Sangue Ácido Quando o golem sofre dano por um ataque corpo a corpo adjacente, o atacante sofre 4d10 pontos de dano de ácido.
For 15, Des 0, Con 13, Int —, Sab 0, Car –5
Tesouro Retalhos rubros (CD 33 para extrair, valem T$ 8.000 para fabricar itens de matéria vermelha).`
        },
        {
          chave: "golemDePedra", nome: "Golem de Pedra", nd: "12", tipo: "Construto Grande",
          papel: '',
          resumo: "O que parecia ser uma grande estátua de um minotauro ergue-se da alcova na parede e avança na direção de vocês com passos estrondosos.",
          texto:
`Golem de Pedra ND 12
“Sim, claro que conheço a criatura. Não estou sempre um passo à frente do inimigo?”
— Vizael, humano arcanista
O que parecia ser uma grande estátua de um minotauro ergue-se da alcova na parede e avança na direção de vocês com passos estrondosos. Quando se move, frestas em suas articulações emanam luz esverdeada. Tem grandes esmeraldas nos olhos, faiscando fogo verde. Golens de pedra lembram esculturas retratando a raça de seu criador, ou figuras históricas, mas podem ter qualquer aparência. Quase todos são construídos como guardiões, para vigiar e proteger lugares sagrados, grandes tesouros, refúgios de arquimagos ou portais para mundos distantes. Outros são usados como máquinas de guerra, especialmente em cercos de castelos, derrubando portões e muralhas com seus punhos poderosos. O típico golem de pedra mede três metros de altura, mas alguns são menores e outros, muitos maiores. Apenas grandes artífices podem construí-los — são criaturas poderosas, muito resistentes a armas e magias. Um destes pode dizimar um grupo de aventureiros com facilidade. Aqueles que eventualmente despertam logo conquistam fama entre os melhores guerreiros da região.
Construto Grande
Iniciativa +4, Percepção +10, visão no escuro
Defesa 43, Fort +26, Ref +12, Von +20, imunidade a atordoado, redução de dano 20
Pontos de Vida 575
Deslocamento 4,5m (3q)
Corpo a Corpo Duas pancadas +36 (4d10+51).
Imobilidade Um golem de pedra pode permanecer completamente imóvel. Se ele estiver assim, um personagem deve passar num teste de Percepção (CD 40) para perceber que ele é uma criatura e não uma estátua.
Imunidade a Magia O golem de pedra é imune a efeitos mágicos, com exceção da magia Despedaçar.
For 9, Des –2, Con 6, Int —, Sab 0, Car –5
Tesouro Nenhum.`
        },
        {
          chave: "instrumentoDivino", nome: "Instrumento Divino", nd: "7", tipo: "Construto Médio",
          papel: '',
          resumo: "O ser luminoso parece um guerreiro sagrado trajando uma couraça de cristal, sob a qual circula algo que parece luz líquida.",
          texto:
`Instrumento Divino ND 7
“Um golem dos deuses? Nesse caso, não vai nos causar nenhum mal. Certo?”
— Solvarr, lefou bucaneiro
O ser luminoso parece um guerreiro sagrado trajando uma couraça de cristal, sob a qual circula algo que parece luz líquida. Uma auréola cristalina flutua acima da cabeça. Empunha espada e escudo feitos do mesmo material, trazendo o símbolo do Deus da Justiça. Também conhecidos como “guerreiros da luz”, estes golens são criados para proteger locais sagrados de grande importância, como catedrais ou tumbas de santos — sobretudo devotos de Azgher, Khalmyr, Thyatis e outros deuses benignos. Estes construtos são poderosos; apesar da aparência vítrea, seu revestimento é forte como o aço. São equipados com espada e escudo fortificados com magia proveniente deles próprios; quando empunhados por outras criaturas, perdem seus poderes. Instrumentos divinos são soldados fiéis, forjados para seguir os preceitos de um paladino. Por excesso de zelo, podem entrar em conflito com aventureiros que perambulem em áreas sob sua proteção. Instrumentos divinos lutam com ímpeto e determinação. Costuma ser difícil notar quando um deles adquire consciência, pois tendem a continuar devotados à sua divindade original como paladinos. De fato, alguns especulam que todos estes golens são despertos desde sua criação.
Construto Médio
Iniciativa +8, Percepção +9, visão no escuro
Defesa 33, Fort +21, Ref +8, Von +15, redução de trevas 10
Pontos de Vida 266
Deslocamento 6m (4q)
Corpo a Corpo Espada longa +24 (2d8+26, 19, mais 4d8 luz mágica).
Aura de Arrependimento (Movimento) O instrumento divino emite uma aura que afeta todas as criaturas em um raio de 9m. Até o próximo turno do instrumento, quando uma criatura ataca ele ou seus aliados, fica atordoada após o ataque (Von CD 24 evita). Uma criatura só pode ficar atordoada por esta habilidade uma vez por cena.
Fulgor Divino Sempre que o instrumento divino usa a ação agredir, criaturas em alcance curto ficam ofuscadas por 1 rodada.
Quebrar Superior (Livre) Quando o instrumento divino acerta um ataque, pode usar a manobra quebrar contra um objeto visível da vítima (teste +28). Ele ignora 10 pontos da RD de objetos.
For 4, Des 1, Con 3, Int —, Sab 0, Car –5
Perícias Diplomacia +10, Religião +12.
Equipamento Escudo pesado de mitral, espada longa certeira, símbolo sagrado. Tesouro Metade.`
        },
        {
          chave: "soldadoMecanico", nome: "Soldado Mecânico", nd: "3", tipo: "Construto Médio",
          papel: '',
          resumo: "A criatura é claramente uma máquina.",
          texto:
`Soldado Mecânico ND 3
“Essa coisa me lembra a máquina de fazer cerveja que eu costumava usar.”
— Hop, humano arcanista
A criatura é claramente uma máquina. Tem a aparência de um guerreiro humano em roupas de cores vivas, mas com engrenagens e pistões à mostra. Seus movimentos são lentos e, devido ao clangor do metal e chiar do vapor, bastante barulhentos. A cada dia, os engenhosos goblins de Arton inventam novos dispositivos — a maioria inútil, outros nem tanto. O soldado mecânico pertence ao segundo grupo. Talvez. Este autômato movido a vapor não chega a ser um golem verdadeiro, não contém nenhuma fagulha elemental. Pouco mais que uma engenhoca, não tem qualquer tipo de inteligência, mas consegue seguir ordens simples como “proteja essa casa contra todos que não forem da família”. Assim, estes autômatos têm sido usados como guardas leais e incorruptíveis — substituindo humanos e despertando ainda mais ressentimento contra os goblins. Em grandes metrópoles como Valkaria, é comum encontrar soldados mecânicos protegendo as propriedades de ricos burgueses. Casos de soldados mecânicos que adquirem inteligência são raros e misteriosos; tal coisa deveria ser impossível. Quando acontece, a única explicação seria que algum deus decidiu conceder uma bênção. Ou apenas se divertir.
Construto Médio
Iniciativa +2, Percepção +5, visão no escuro
Defesa 20, Fort +14, Ref +9, Von +4, imunidade a fogo
Pontos de Vida 23
Deslocamento 6m (4q)
Corpo a Corpo Lança x2 +16 (1d8+8).
À Distância Besta pesada +11 (1d12+10, 19).
Sopro (Padrão) O soldado sopra uma nuvem de vapor escaldante em um cone de 6m. Criaturas na área sofrem 4d6 pontos de dano de fogo (Ref CD 17 reduz à metade). Recarga (movimento).
Movido a Vapor Se o soldado fosse sofrer dano de fogo, em vez disso seu deslocamento aumenta em 3m por 1 rodada. Se ele sofrer dano de frio, fica lento por 1 rodada.
For 4, Des –1, Con 3, Int —, Sab 0, Car –5
Equipamento Besta pesada, lança, virotes x20. Tesouro Pilha de sucata (vale T$ 100 para fabricar engenhocas).`
        },
      ],
      regras: [
        { titulo: "Gárgula",
          texto:
`“Por que fazem essas coisas parecidas com demônios? Acho que aquela ali se mexeu…”
— Thalina Asa-de-Cristal, sílfide clériga de Hyninn
A criatura parece a estátua de um humanoide grotesco e alado, com chifres, cauda e garras. Gárgulas são construtos de aspecto demoníaco, construídos para proteger templos, castelos ou masmorras, disfarçadas como ornamentos. Quando estão imóveis em suas posições de vigília, é quase impossível diferenciá-las de estátuas; até mesmo adquirem a mesma resistência do granito. Contudo, talvez como influência de seu aspecto (ou por intervenção de deuses ou demônios), gárgulas são propensas a ganhar vida e fugir ao controle de seus criadores. Tornam-se predadores urbanos, escondidas à vista de todos enquanto perscrutam as ruas, escolhendo suas vítimas. Gárgulas permanecem imóveis até o momento de mergulhar sobre suas vítimas, então atacando com ferocidade, mordendo e rasgando com suas garras. Embora não precisem de comida, gárgulas selvagens devoram inimigos abatidos por pura crueldade. Apreciam especialmente a carne de crianças e filhotes. Adoram vangloriar-se de sua esperteza, paciência e furtividade para outras gárgulas, e uma dupla competindo pode ser o terror de qualquer cidade. Gárgulas conscientes que escolham outros modos de vida são raras, mas existem.` },
        { titulo: "Golem de Ferro",
          texto:
`“Não se preocupem, eu tenho um plano!”
— Jaimim da Brigada Rubra, hynne ladino
O titã se assemelha a um gigante vestindo armadura pesada e elmo fechado, com punhos descomunais. Contudo, quando se movimenta, parece muito mais forte e denso que uma criatura de carne e osso. Ainda, as frestas da armadura derramam fogo elemental, deixando claro que o adversário não é algo criado pelos deuses. Muitos construtos são feitos de aço e outros metais variados. O verdadeiro golem de ferro, no entanto, pertence a outro patamar. Esta versão muito aprimorada do golem de bronze está entre os construtos mais poderosos de Arton — poucos artífices no mundo têm capacidade e recursos para construí-los. De fato, devido a seu custo exorbitante, são raros até mesmo entre as forças da Supremacia Purista. Embora sejam maiores e mais pesados que ogros, seus movimentos são precisos. Além da força física imensa, sua alta resistência e imunidades tornam o monstro quase indestrutível. O ferro usado em sua construção anula quase todas as formas de magia, inutilizando as táticas de muitos aventureiros. São várias as histórias sobre grupos de heróis que, ao confrontar um destes em alguma masmorra, não tiveram escolha além de recuar e repensar sua estratégia. Como outros golens movidos por centelha elemental, alguns destes acabam ganhando vida. Muitos se tornam campeões gladiadores, guarda-costas para regentes ou sumos-sacerdotes, ou aventureiros. Golens de ferro não falam, mas produzem sons metálicos profundos que seu criador, e eventuais companheiros, podem compreender.` },
      ],
    },

    // ── ⚒ IGREJA DE ARSENAL ───────────────────────────
    {
      chave: "arsenal", nome: "Igreja de Arsenal", icone: "⚒", cor: "#9e5a1c",
      intro: "O culto a Arsenal é ainda recente. Muitos de seus clérigos receberam o chamado diretamente em seus corações guerreiros — sequer conheceram ainda outros da mesma fé. Entre os outrora clérigos de Keenn, nem todos abraçaram de pronto o recém-chegado. Ainda assim, grande parte de suas igrejas-fortalezas aceitou a vitória do desafiante, submetendo-se ao sucessor. Para muitos, o novo Deus da Guerra não é diferente do antigo — o general foi substituído, mas o exército perdura, a batalha continua. Para outros, uma mudança extraordinária aconteceu. Keenn era selvagem, sanguinário, combatia puramente por combater, a guerra em si como objetivo final. Arsenal, pelo contrário, é um planejador metódico e estrategista ardiloso. Sua guerra tem um propósito: tornar Arton forte e bem armado. Para enfrentar o que virá, a qualquer preço. Sobre aquele — ou aquilo — que virá, nada se sabe. Apesar das homenagens e súplicas, o novo Deus da Guerra nada revelou a seus profetas. Mas existe uma suspeita: quando mortal, Arsenal foi o único sobrevivente de um mundo devastado em um conflito global. Devastado por algo. Por um inimigo.",
      fichas: [
        {
          chave: "coletorDeArsenal", nome: "Coletor de Arsenal", nd: "10", tipo: "Humanoide (humano) Médio",
          papel: '',
          resumo: "O bando usa armaduras que de certa forma lembram a célebre couraça de Mestre Arsenal, com as características aletas no elmo fechado.",
          texto:
`Coletor de Arsenal ND 10
“Campeões do novo Deus da Guerra? Bah! Saqueadores vulgares, se me perguntar!”
— Thallus Rozendus, o Historiador
O bando usa armaduras que de certa forma lembram a célebre couraça de Mestre Arsenal, com as características aletas no elmo fechado. Mesmo que os rostos estejam ocultos, quase se consegue notar sua cobiça quando percebem que vocês têm boas armas. Muitos devotos de Arsenal consideram as armas mágicas uma dádiva de seu deus para Arton. Logo, tais instrumentos sagrados devem estar em mãos merecedoras — ou seja, em posse dos seguidores do Deus da Guerra. Os assim chamados coletores de Arsenal são clérigos com a autoimposta missão de localizar e confiscar armas poderosas que não tenham portadores dignos. Sendo que será considerado “indigno” qualquer um que não seja devoto de Arsenal, ou que seja incapaz de se defender. Na opinião de muitos, estes valentões não passam de uma gangue tentando imitar os antigos crimes de seu mestre, pilhando quaisquer itens mágicos que encontrem. Oprimem e atacam sob o falso pretexto de “testar” suas vítimas. Mas, entre os devotos, há quem veja honra e propósito em suas ações, tomando tesouros valiosos de quem não os utiliza.
Humanoide (humano) Médio
Iniciativa +15, Percepção +13
Defesa 32, Fort +22, Ref +10, Von +18, imunidade a medo, resistência a magia +5
Pontos de Vida 280
Deslocamento 6m (4q)
Pontos de Mana 54
Corpo a Corpo Martelo de guerra +27 (2d8+30, x3) e chicote +27 (1d4+25, alcance 4,5m).
Chicote de Aço Especialmente fixado a sua armadura, o chicote do coletor deixa a mão livre e não pode ser desarmado.
Desarmar Superior (Reação) Quando desarma um oponente usando seu chicote, o coletor puxa a arma para sua mão livre.
Marca da Oferenda Quando o coletor é derrotado, todo seu equipamento, incluindo armas que ele esteja empunhando, é teletransportado para um tempo de Arsenal.
Magias Como um clérigo de Arsenal de 10º nível (CD 32).
• Arma Espiritual (Padrão, 5 PM) Até o fim da cena, uma vez por rodada, quando sofre um ataque corpo a corpo, o coletor pode usar uma reação para causar 4d6 pontos de dano de impacto no atacante.
• Físico Divino (Padrão, 3 PM) O coletor recebe +2 em Força, Destreza ou Constituição, a sua escolha. Esse aumento não oferece PV ou PM adicionais.
• Lendas e Histórias (Padrão, 6 PM, sustentada) O coletor descobre informações sobre uma criatura, objeto ou local que esteja tocando. A cada rodada que mantiver a magia, ele descobre um dos seguintes: todas as informações sobre o alvo (como se tivesse passado em todos os testes de Conhecimento para tal); todas as habilidades do alvo (incluindo estatísticas de jogo), e se o alvo está sob influência de alguma magia, incluindo informações sobre elas.
• Soco de Arsenal (Padrão, 9 PM) O coletor causa 7d6+5 pontos de dano de impacto em uma criatura em alcance médio, que é empurrada 3m na direção oposta (Fort reduz à metade e evita o empurrão).
• Visão Mística (Padrão, 3 PM) Durante 1 dia, o coletor detecta todas as auras mágicas em alcance médio e recebe todas as informações sobre elas sem gastar ações. Além disso, ele pode gastar uma ação de movimento para descobrir se uma criatura que possa perceber em alcance médio é capaz de lançar magias e qual a aura gerada pelas magias de círculo mais alto que ela pode lançar.
For 5, Des 1, Con 3, Int 2, Sab 4, Car 0
Perícias Guerra +15, Misticismo +16, Religião +18.
Equipamento Armadura completa abascanta, chicote, martelo de guerra formidável, símbolo sagrado de Arsenal.
Tesouro Padrão.`
        },
        {
          chave: "forjadorLiturgico", nome: "Forjador Litúrgico", nd: "9", tipo: "Humanoide (humano) Médio",
          papel: '',
          subgrupo: "Forjador Litúrgico",
          resumo: "Forjador Litúrgico — Todos no grupo trajam mantos escuros, armaduras pesadas e grandes elmos fechados — trazendo, na fronte, a espada e o martelo cruzados.",
          texto:
`Forjador Litúrgico ND 9
Humanoide (humano) Médio
Iniciativa +9, Percepção +12
Defesa 32, Fort +15, Ref +9, Von +21, imunidade a medo, redução de dano 5
Pontos de Vida 230
Deslocamento 6m (4q)
Corpo a Corpo/À Distância Armamento sagrado x2 +25 (2d12+20, 19/x3).
Armamento Sagrado O forjador litúrgico porta uma arma mágica a ser oferecida ao seu oponente. Escolha um tipo de arma e um encanto adequado, ou determine-os aleatoriamente usando as tabelas de tesouros (veja Tormenta20, Capítulo 8). Independente do tipo de arma, nas mãos do forjador ela possui as estatísticas indicadas em seu ataque, modificadas por seu encanto. Se o encanto escolhido tiver um custo em PM, ele pode usá-lo sem gastar PM. Desprezo pelo Ordinário O forjador sofre apenas metade do dano de armas mundanas sem melhorias.
For 2, Des 1, Con 3, Int 3, Sab 4, Car 1
Perícias Guerra +13, Misticismo +13, Ofício (armeiro) +14, Religião +14.
Equipamento Armamento sagrado, instrumentos de Ofício (armeiro) aprimorados, meia armadura. Tesouro Nenhum.`
        },
        {
          chave: "concilioForjador", nome: "Concílio forjador", nd: "13", tipo: "Humanoide (humano) Grande",
          papel: '',
          subgrupo: "Forjador Litúrgico",
          resumo: "Forjador Litúrgico — Todos no grupo trajam mantos escuros, armaduras pesadas e grandes elmos fechados — trazendo, na fronte, a espada e o martelo cruzados.",
          texto:
`Concílio forjador ND 13
Humanoide (humano) Grande
Iniciativa +11, Percepção +14
Defesa 41, Fort +20, Ref +13, Von +26, imunidade a medo, redução de dano 5
Pontos de Vida 430
Deslocamento 6m (4q)
Corpo a Corpo/À Distância [Bando] Armamento sagrado x2 +35 (4d12+40, 19/x3).
Armamento Sagrado O líder de cada concílio porta uma arma mágica a ser oferecida ao seu oponente. Escolha um tipo de arma e dois encantos adequados, ou determine-os aleatoriamente usando as tabelas de tesouros (veja Tormenta20, Capítulo 8). O concílio empunha essa arma em corpo a corpo ou à distância, conforme apropriado. Entretanto, independente do tipo de arma, nas mãos do concílio ela possui as estatísticas indicadas em seu ataque, modificadas por seus encantos. Se o encanto escolhido tiver um custo em PM, ele pode usá-lo sem gastar PM. Desprezo pelo Ordinário O concílio sofre apenas metade do dano de armas mundanas sem melhorias.
For 2, Des 1, Con 3, Int 3, Sab 4, Car 1
Perícias Guerra +15, Misticismo +15, Ofício (armeiro) +16, Religião +16.
Equipamento Arma superior com 1 melhoria a sua escolha, instrumentos de Ofício (armeiro) aprimorados, meia armadura (1d4 de cada), armamento sagrado. Tesouro Nenhum.`
        },
        {
          chave: "guerreiroPerpetuo", nome: "Guerreiro Perpétuo", nd: "7", tipo: "Morto-vivo Médio",
          papel: '',
          resumo: "Visto à distância, poderia ser um clérigo ou guerreiro em armadura completa.",
          texto:
`Guerreiro Perpétuo ND 7
“Mas reconheço aquela armadura! Pertencia a um grande campeão de… Keenn!”
— Kaava Ezzilok, lefou caçadora
Visto à distância, poderia ser um clérigo ou guerreiro em armadura completa. Conforme se aproxima, no entanto, percebe-se que a couraça está vazia e não há mãos empunhando o martelo e o escudo. Apesar de seu reconhecido pragmatismo, Arsenal também pode ser um deus colérico e vingativo. Prova disso é a existência destes seres amaldiçoados. Certos devotos de Keenn rejeitaram o novo Deus da Guerra. Como punição, quando morreram, Arsenal proibiu sua passagem para a além-vida nos reinos dos deuses. Eles permanecem aprisionados em Arton como mortos-vivos, condenados a servir a seus devotos pela eternidade. Um guerreiro perpétuo é um fantasma imaterial, invisível, mas usando armadura e armas mundanas. Isso significa que mesmo um ataque capaz de afetar seres incorpóreos deve, antes, vencer a proteção metálica — tornando estes espíritos mais problemáticos. Guerreiros perpétuos são encontrados sozinhos ou em grupos, assombrando antigos locais sagrados de Keenn ou protegendo antigos esconderijos (e tesouros) de Mestre Arsenal. Também podem ser conjurados por altos clérigos do Deus da Guerra.
Morto-vivo Médio
Iniciativa +9, Percepção +13, visão no escuro
Defesa 33, Fort +20, Ref +14, Von +7, incorpóreo, redução de dano 5
Pontos de Vida 265
Deslocamento voo 9m (6q)
Corpo a Corpo Martelo de guerra x2 +25 (4d6+19 x3).
Sempre Armado Se o guerreiro perpétuo for desarmado por um inimigo, sua arma retornará a ele no fim da rodada. Quando isso ocorre, ela causa 3d12+13 pontos de dano de impacto às criaturas adjacentes ao guerreiro.
Casca Vazia O guerreiro pode manipular seu próprio equipamento, mas não pode atravessar objetos sólidos.
For —, Des 6, Con 0, Int 0, Sab 4, Car –1
Equipamento Escudo pesado, grilhão de descrença, martelo de guerra. Tesouro Nenhum.`
        },
        {
          chave: "kishin", nome: "Kishin", nd: "13", tipo: "Construto Enorme",
          papel: '',
          resumo: "Grande e robusto de tanta blindagem, o engenho humanoide parece ainda maior.",
          texto:
`Kishin ND 13
“Mesmo pra quem não acredita em deuses… esse é um argumento de fé bastante tangível!”
— Arwan Ystamen, estrategista salistiense
Grande e robusto de tanta blindagem, o engenho humanoide parece ainda maior. Mesmo sem armas, sua própria forma já exalaria violência. Mas ele TEM armas! O kishin é um golem com a mesma aparência do Kishinauros, colosso que hoje atua como avatar de Arsenal. Assim como outros deuses enviam aspectos (seres divinos temporários) para auxiliar seus devotos em tarefas significativas, os servos de Arsenal também podem conjurar estes construtos sagrados. Quando conjurado por um devoto — ou enviado por Arsenal para cumprir alguma tarefa —, o kishin se comporta como um golem de mente muito limitada, incapaz de falar, apenas executando comandos simples. Embora forte e bem armado, em certas circunstâncias (especialmente na ausência de um invocador dando ordens) será possível enganá-lo ou até evitá-lo por completo.
Construto Enorme
Iniciativa +16, Percepção +9, visão no escuro
Defesa 46, Fort +26, Ref +13, Von +20, imunidade a medo, redução de dano 15, resistência a magia +2
Pontos de Vida 617
Deslocamento 12m (8q)
Corpo a Corpo Armamento adaptativo x2 +39 (veja abaixo).
Armamento Adaptativo O kishin é uma máquina de combate com armas mágicas acopladas a seu corpo. A cada rodada, ele pode escolher uma das seguintes armas para seus ataques.
• Uivante (montante, 2d6+66, 19, mais 2d6 frio). Quando usa a ação agredir, o kishin pode aumentar sua sobrecarga em 1 nível. Se fizer isso, as criaturas atingidas pelo Uivante neste turno ficam enredadas por 1 rodada (Ref CD 35 evita).
• Finitude (lança montada, 3d8+51, 18/x3). Quando faz uma investida, o kishin pode aumentar sua sobrecarga em 1 nível; se acertar o ataque, causa +4d8 pontos de dano e recupera uma quantidade de PV igual a esse dano adicional.
• Método (martelo de guerra, 4d12+55, 19/x3). Quando derruba um inimigo, o kishin pode aumentar sua sobrecarga em 1 nível para fazer um ataque adicional contra essa criatura.
Sobrecarga A sobrecarga do kishin inflama e fortalece seus mecanismos. Para cada nível de sobrecarga, ele recebe +2 em testes de perícia e rolagens de dano, mas sofre 5 pontos de dano de fogo (sua RD se aplica normalmente) no início de cada um de seus turnos. A sobrecarga volta a zero ao fim da cena.
Zona de Perigo (Movimento) O kishin aumenta sua sobrecarga em 1 nível.
For 12, Des 6, Con 10, Int —, Sab 3, Car –3
Tesouro 1d4 lascas adaptativas (CD 28 para extrair, cada lasca vale T$ 1.000 para fabricar armas superiores).`
        },
        {
          chave: "capelaoDeGuerra", nome: "Capelão de Guerra", nd: "4", tipo: "Humanoide (humano) Médio",
          papel: '',
          subgrupo: "Sacerdote de Guerra",
          resumo: "Sacerdote de Guerra — Em meio aos soldados da Supremacia, há um clérigo de armadura usando as cores puristas.",
          texto:
`Capelão de Guerra ND 4
Humanoide (humano) Médio
Iniciativa +4, Percepção +7
Defesa 21, Fort +10, Ref +5, Von +16, imunidade a medo
Pontos de Vida 105
Deslocamento 6m (4q)
Pontos de Mana 25
Corpo a Corpo Martelo de guerra +14 (1d8+15, x3).
Ódio Puro Como um purista, o capelão de guerra recebe +5 em testes de Vontade quando está seguindo ordens de um superior (qualquer purista com ND maior) e +2 em rolagens de dano contra humanoides não humanos.
Magias Como um clérigo de Arsenal de 5º nível (CD 18, limite de PM 5).
• Arma Mágica (Padrão, 5 PM) Até o fim da cena, uma arma adjacente se torna mágica, fornecendo +2 nos testes de ataque e rolagens de dano e +1d6 pontos de dano de fogo.
• Bênção (Padrão, 3 PM) Aliados em alcance curto recebem +2 em testes de ataque e rolagens de dano até o fim da cena.
• Curar Ferimentos (Padrão, 5 PM) Uma criatura adjacente cura 6d8+6 PV.
• Soco de Arsenal (Padrão, 5 PM) Uma criatura em alcance médio sofre 5d6+4 pontos de dano de impacto e é empurrada 3m na direção oposta (Fort reduz à metade e evita o empurrão).
For 4, Des 0, Con 4, Int 1, Sab 3, Car –1
Perícias Misticismo +5, Religião +7.
Equipamento Armadura completa, escudo leve, martelo de guerra certeiro, símbolo sagrado. Tesouro Padrão.`
        },
        {
          chave: "bispoDeGuerra", nome: "Bispo de Guerra", nd: "8", tipo: "Humanoide (humano) Médio",
          papel: '',
          subgrupo: "Sacerdote de Guerra",
          resumo: "Sacerdote de Guerra — Em meio aos soldados da Supremacia, há um clérigo de armadura usando as cores puristas.",
          texto:
`Bispo de Guerra ND 8
Humanoide (humano) Médio
Iniciativa +8, Percepção +14
Defesa 28, Fort +15, Ref +8, Von +26, imunidade a medo, redução de dano 5
Pontos de Vida 230
Deslocamento 6m (4q)
Pontos de Mana 66
Corpo a Corpo Martelo de guerra x2 +24 (1d8+10, x3).
Ódio Puro Como um purista, o bispo de guerra recebe +5 em testes de Vontade quando está seguindo ordens de um superior (qualquer purista com ND maior) e +2 em rolagens de dano contra humanoides não humanos.
Prece de Combate (Livre, +2 PM) Quando lança uma magia divina com tempo de conjuração de uma ação padrão em si mesmo, o bispo pode lançá-la como uma ação de movimento.
✦ Símbolo Sagrado Energizado (Movimento, 1 PM) O bispo energiza seu símbolo sagrado. Até o fim da cena, ele emite uma luz avermelhada que ilumina como uma tocha e, enquanto estiver sendo empunhado pelo bispo, reduz o custo de magias divinas em –1 PM.
Magias Como um clérigo de Arsenal de 9ª nível (CD 28, limite de PM 9).
• Curar Ferimentos (Padrão, 8 PM) Uma criatura adjacente cura 9d8+9 PV.
• Dissipar Magia (Padrão, 3 PM) O bispo escolhe uma criatura, objeto ou esfera de 3m em alcance médio e faz um teste de Misticismo. Todas as magias nesse alvo com CD igual ou menor que o resultado do teste são dissipadas.
• Escudo da Fé (Reação, 3 PM) Quando uma criatura em alcance curto sofre um ataque, ela recebe +3 na Defesa por 1 turno.
• Oração (Padrão, 7 PM, sustentada) O bispo e seus aliados em alcance curto recebem +4 em testes de perícia e rolagens de dano, e todos os inimigos em alcance curto recebem –4 em testes de perícia e rolagens de dano.
• Soco de Arsenal (Padrão, 7 PM) Uma criatura em alcance médio sofre 6d6+3 pontos de dano de impacto e é empurrada 3m na direção oposta (Fort reduz à metade e evita o empurrão).
• Sopro da Salvação (Padrão, 8 PM) O bispo sopra um cone de 9m que cura 3d8+3 PV e remove uma das seguintes condições dos aliados na área: abalado, atordoado, apavorado, alquebrado, cego, confuso, debilitado, enfeitiçado, enjoado, esmorecido, exausto, fascinado, fatigado, fraco, frustrado, lento, paralisado, pasmo e surdo.
For 3, Des 0, Con 4, Int 2, Sab 6, Car 1
Perícias Guerra +16, Misticismo +12, Religião +16.
Equipamento Armadura completa ajustada reforçada, escudo leve reforçado, martelo de guerra, símbolo sagrado de Arsenal, poção de Velocidade. Tesouro Padrão.`
        },
        {
          chave: "kishinauros", nome: "Kishinauros", nd: "S", tipo: "Construto Colossal",
          papel: '',
          resumo: "Ele é alto como a própria estátua de Valkaria — impossível crer que uma máquina tão grande possa existir.",
          texto:
`Kishinauros ND S
“Tamanha devastação… Essa não era minha intenção.”
— Aius Volsar, clérigo de Arsenal
Ele é alto como a própria estátua de Valkaria — impossível crer que uma máquina tão grande possa existir. Todo armadura de metal escuro, todo placas e ângulos, saliências e arestas. Desgastado, arranhado, retornando de mil batalhas. No braço esquerdo, um escudo maior que muitos navios. No direito, uma espada titânica, energias faiscando raivosas ao longo do gume. Diz-se que, em seu mundo nativo, Arsenal não era apenas um guerreiro — era um cavaleiro de máquina. Quando chegou a Arton, não trouxe consigo apenas sua doutrina guerreira e sua armadura lendária. Trouxe o Kishinauros, o maior engenho de guerra já visto. Forjado com ciência e magia além da compreensão, o colosso esteve sob reparos por décadas. Uma vez restaurado, marchou sobre o Reinado para levar guerra aos povos. Acabaria detido, destruído, pelas forças combinadas de heróis e regentes. Tudo isso quando Arsenal era ainda humano. Hoje ele é um deus. Por sua vontade, o Kishinauros se ergue outra vez, restaurado. Enquanto outros deuses usam as próprias energias para manifestar avatares, Arsenal demonstra ser mais prático. Para cumprir grandes tarefas e acudir devotos em necessidade, em vez de desperdiçar as próprias forças divinas, ele recorre ao antigo titã arcano. O Kishinauros fica em seu lugar de descanso, nas Sanguinárias e surge por magia em outros pontos de Arton quando convocado por devotos de prestígio, ou quando Arsenal tem interesse pessoal em demonstrar sua força.
Construto Colossal
Iniciativa +25, Percepção +15, percepção às cegas (longo)
Defesa 61, Fort +36, Ref +22, Von +30, imunidade a efeitos de movimento e medo, redução de dano 30, resistência a magia +5
Pontos de Vida 2.450
Deslocamento 15m (10q), voo 12m (8q)
Corpo a Corpo Armamento adaptativo x3 +59.
À Ddistância Balística Avançada +59.
Armamento AdaptativoA cada rodada, o Kishinauros escolhe uma das seguintes armas mágicas para seus ataques corpo a corpo. Quando usa a ação agredir, ele pode aumentar sua sobrecarga em 1 para energizar a arma por um turno.
• Malho Relampejante (martelo de guerra, 6d6+44, x3). Se foi energizado, criaturas atingidas ficam atordoadas por 1 rodada (Fort CD 51 evita; só pode ser atordoada uma vez por cena).
• Perfuratriz Sibilante (alabarda, 4d10+42, x4). Se foi energizado, seus ataques ignoram redução de dano e imunidade a acertos críticos.
• Vingadora e Impérvio (espada bastarda e escudo pesado, 6d8+38, 19). O Kishinauros recebe +2 na Defesa. Se foi energizado, uma vez na rodada, quando é alvo de uma magia, pode refleti-la de volta ao conjurador. As características da magia (efeitos, CD…) se mantêm, mas o conjurador se torna seu novo alvo e o Kishinauros faz quaisquer escolhas exigidas.
Balística Avançada A cada rodada, o Kishinauros escolhe uma das seguintes armas para seus ataques à distância.
• Balista Explosiva (besta pesada, 4d12+17, 19). Criaturas na área atingida pelo virote sofrem 12d6 pontos de dano de fogo (Ref CD 51 reduz à metade). Recarga (movimento).
• Canhão Final (mosquete, 4d12+38 essência, 19/x4). Em um resultado 1 no teste de ataque, a sobrecarga do Kishinauros aumenta em 1 e o Canhão Final explode. Criaturas em alcance curto, incluindo o Kishinauros, sofrem 16d12+60 pontos de dano, metade fogo e metade essência, e ficam em chamas (Ref CD 51 reduz à metade). Recarga (padrão).
• Morteiro Elemental x4 (6d6, x2, alcance longo). Cada ataque do morteiro causa dano de um tipo diferente entre ácido, eletricidade, fogo e frio. Recarga (movimento, apenas com sobrecarga 0).
Células de Resfriamento (Movimento) O Kishinauros expele calor acumulado na forma de gás venenoso. Sua sobrecarga é reduzida a 0, e criaturas em alcance curto ficam enjoadas e perdem 10 PV por ponto de sobrecarga expelido (Fort CD 51 reduz a perda à metade e evita a condição). Veneno.
Disparo Automático (Livre) Uma vez por rodada, o Kishinauros faz um ataque à distância.
Protocolos de Emergência (Reação) O Kishinauros aumenta sua sobrecarga em 1 e lança uma das magias a seguir, em reação a uma condição específica, como um clérigo de Arsenal de 20° nível (CD 51, limite de PM 20) sem pagar PM.
• Deflagração de Mana Quando o Kishinauros é reduzido a 200 PV ou menos, todas as outras criaturas numa esfera de 15m ao redor dele sofrem 200 pontos de dano de essência e todos os itens mágicos (exceto artefatos) tornam-se mundanos permanentemente (Fort reduz à metade e itens recuperam sua magia após 1 dia).
• Fúria do Panteão Quando reduzido a 700 PV ou menos, o Kishinauros cria uma nuvem de tempestade num cubo de 90m em alcance longo até o fim da cena. Os ventos tornam ataques à distância impossíveis e a área conta como condição terrível para lançar magia. Além disso, inimigos na área têm visibilidade reduzida (como a magia Névoa). Uma vez por turno, até 6 inimigos sofrem 10d8 pontos de dano de eletricidade (Ref reduz à metade).
• Soco de Arsenal Quando desarmado, o Kishinauros causa 12d6+16 pontos de dano de impacto em uma criatura em alcance médio e a empurra até 3m na direção oposta (Fort reduz à metade e evita o empurrão).
• Terremoto Uma vez por rodada, quando o Kishinauros erra um ataque corpo a corpo, tremores rasgam o solo em alcance médio. Cada criatura na área fica atordoada (apenas uma vez por cena) e precisa rolar um dado; com resultado ímpar, uma fenda se abre, a criatura cai dentro (Ref evita) e é considerada agarrada; pode se soltar e sair gastando uma ação completa e passando em um teste de Atletismo (CD 51). No início de cada turno da criatura agarrada, ela sofre 8d8 pontos de dano de impacto.
Titânico O Kishinauros é imune a manobras de combate, não pode ser flanqueado e sofre metade do dano de ataques que não sejam de outra criatura Titânica. Quando se move, pisoteia qualquer criatura ou objeto Enorme ou menor em seu caminho (atravessando seu espaço), causando 20d6 pontos de dano de impacto (uma vez por rodada por criatura, Ref CD 51 reduz à metade). Além disso, seus ataques ignoram redução de dano e atingem todas as criaturas em um quadrado de 6m (para cada ataque, ele faz um único teste de ataque e compara o resultado com a Defesa de cada inimigo na área).
Sobrecarga A sobrecarga do Kishinauros fortalece seus mecanismos. Para cada ponto de sobrecarga, recebe +5 em testes de perícia e rolagens de dano, mas sofre 5 pontos de dano de fogo (sua RD se aplica) no início de cada um de seus turnos.
Zona de Perigo (Movimento) O Kishinauros aumenta sua sobrecarga em 1.
For 16, Des 8, Con 12, Int —, Sab 5, Car –3
Equipamento Nenhum. Tesouro Núcleo místico. Alimentado por incontáveis itens mágicos, o núcleo do Kishinauros pode ser usado para encantar outras armas. O núcleo tem três cargas, cada uma pode conceder um encanto a uma arma, que não conta no limite de encantos. Cada item só pode receber um encanto desta forma, e deve cumprir seus requisitos.`
        },
      ],
      regras: [
        { titulo: "Forjador Litúrgico",
          texto:
`“Se quisermos essas armas, temos que lutar por elas? Sempre vou lutar pelo que desejamos!”
— Daxos, qareen arcanista
Todos no grupo trajam mantos escuros, armaduras pesadas e grandes elmos fechados — trazendo, na fronte, a espada e o martelo cruzados. Pendendo à cintura, mais armas do que poderiam usar. Todas parecem ser de qualidade excepcional. Arsenal não comanda apenas que seus devotos lutem e vençam. Ele ordena que empunhem e espalhem seus instrumentos sagrados: armas. Instrumentos de combate são a bênção de Arsenal para este mundo. Com o propósito de prover essa bênção, existe em sua igreja a Ordem dos Forjadores Litúrgicos — devotos com técnica e poder divino para produzir as melhores armas de Arton. Sua missão é ofertar suas peças aos que se mostrem dignos. Após um período de clausura em suas oficinas secretas, eles partem em grupos missionários através do Reinado e além, guiados por visões recebidas de Arsenal. Ao encontrar um ou mais candidatos, estes são desafiados em combate por um número igual de Forjadores. Caso os candidatos vençam, uma arma sagrada será ofertada a cada um deles. Se perderem, contudo, devem entregar suas armas como pagamento; caso recusem, serão atacados e executados.` },
        { titulo: "Sacerdote de Guerra",
          texto:
`“Arsenal prega a vitória. E a maneira mais divertida de alcançá-la é esmagando alguns crânios.”
— Thalyandra, dahllan clériga de Arsenal
Em meio aos soldados da Supremacia, há um clérigo de armadura usando as cores puristas. Seu símbolo sagrado não é familiar, lembrando uma arma erguida para o céu. Ele carrega um martelo de guerra em uma mão, enquanto a outra conjura uma cura mágica sobre um companheiro ferido. Arsenal foi um mortal que se tornou deus por seus próprios esforços. Ao fazê-lo, também realizou o grande objetivo de Valkaria — que um ser humano derrotasse um deus. Este e outros fatos levaram a Deusa da Humanidade à liderança do Panteão, trazendo numerosas consequências ao mundo dos mortais. Talvez o produto mais sinistro de tais ascensões seja o Templo da Pureza Divina, culto formado por puristas devotos de Valkaria e Arsenal. Religião oficial da Supremacia, traz uma visão deturpada das crenças e objetivos dessas fés: por serem superiores, capazes de desafiar os próprios deuses, caberia aos humanos governar Arton e colocar os demais povos em “seu devido lugar”. Alguns acham lógico que o tirânico Arsenal abençoe esses fanáticos odiosos. Mas como podem ser capazes de brandir os milagres de Valkaria — totalmente oposta a qualquer forma de intolerância — é um mistério completo. Alguns especulam que o propósito da deusa seria prover Arton com adversários óbvios a derrotar. Seja como for, estes clérigos guerreiros têm sido vistos acompanhando não apenas tropas puristas, mas também coletores de Arsenal, Forjadores Litúrgicos e outros, lutando e provendo curas mágicas. Como tal aliança entre diferentes igrejas funciona, é algo que apenas o pragmatismo de Arsenal pode explicar.` },
      ],
    },

    // ── 🐲 IGREJA DE KALLYADRANOCH ─────────────────────
    {
      chave: "kally", nome: "Igreja de Kallyadranoch", icone: "🐲", cor: "#7a2f2f",
      intro: "Por longos séculos, o Deus dos Dragões e do Poder não existiu. Por sua participação na Revolta dos Três, quando teria sido um dos criadores do povo que se tornaria a Tormenta, ele foi punido com o esquecimento completo. Seu próprio nome desapareceria de toda e qualquer memória: os poucos que sabiam de sua existência o conheciam apenas como “o Terceiro”. Quinze anos atrás, após uma campanha elaborada envolvendo os maiores heróis de Arton em batalha contra a Tormenta, ele voltaria ao Panteão. Desde então sua igreja vem sendo restaurada, seus adoradores voltam a cultuá-lo por toda Arton. Entre seus devotos há heróis de grande honra, brandindo o poder dracônico para combater o mal, ou mesmo ocupando cargos nobres de responsabilidade, mas estes são raros. Quase todos os cultistas de Kally são tiranos impiedosos e opressores, dedicados a adorar dragões e dominar todas as demais criaturas. Engana-se quem acredita que os próprios dragões cultuam este deus; embora alguns escolham fazê-lo, estas feras de orgulho e sabedoria ancestrais não se curvam a ninguém, nem mesmo aos deuses. Foram criados assim, para a riqueza e soberania, então Kallyadranoch está satisfeito. Por isso a igreja desse deus é formada por adoradores de dragões, por aqueles que acreditam em sua supremacia e buscam ser agraciados com parte de seu poder.",
      fichas: [
        {
          chave: "cavaleiroDeKally", nome: "Cavaleiro de Kally", nd: "8", tipo: "Humanoide (humano) Médio",
          papel: '',
          resumo: "Vocês chegam a tempo de ver um pequeno grupo de homens em armaduras voando para longe em cavalos alados, escamados.",
          texto:
`Cavaleiro de Kally ND 8
“Vítima de dragões? Vou ensinar quem é realmente Valkaria, canalha imundo!”
— Wyatt Gray, humano paladino de Valkaria
Vocês chegam a tempo de ver um pequeno grupo de homens em armaduras voando para longe em cavalos alados, escamados. Um deles leva consigo a clériga local, prisioneira. Esta estranha seita de hereges tem sua própria versão da Revolta dos Três, quando Valkaria foi aprisionada por seus crimes, e então libertada por heróis. Para estes devotos, a história não acabou: Valkaria será sempre a icônica vítima em apuros, existindo com o único propósito de inspirar heróis a atos de bravura. Para que essa tradição siga, os Cavaleiros de Kallyadranoch assumiram a estranha “missão sagrada” de capturar devotos de Valkaria como oferendas ao Deus do Poder — ou a qualquer grande dragão que exista por perto. Formado por clérigos e cavaleiros devotos de Kallyadranoch, até recentemente o grupo tinha números reduzidos, mas a recente ascensão de Valkaria como líder parece ter intensificado suas atividades. Eles buscam suas vítimas entre os devotos mais prestigiados da deusa, elaborando planos e cenários complexos que culminam com um embate final contra algum grupo de aventureiros. Se o fazem para enaltecer heróis (como a própria Valkaria gostaria) ou para agradar ao Deus Dragão, não se sabe. Mas, levando em conta que são contemplados com poderes divinos (e até mesmo corcéis de Kally como montarias), é possível que estejam conseguindo o que quer que seja. Diz-se que o plano final do grupo seria capturar a própria Valkaria como oferenda a Kallyadranoch, para que esta se torne a perfeita cativa do perfeito dragão. Desnecessário dizer, muitos devotos de Valkaria os odeiam com todas as forças.
Humanoide (humano) Médio
Iniciativa +12, Percepção +8
Defesa 35, Fort +19, Ref +17, Von +8, redução de fogo 20, redução de dano 5, resistência a magia +5
Pontos de Vida 250
Deslocamento 6m (4q)
Corpo a Corpo Lança montada x2 +26 (1d12+15, x3) ou espada bastarda x2 +26 (1d12+15, 19).
Agarrar Aprimorado (Livre) Lança montada ou espada bastarda (teste +28). O cavaleiro de Kally só pode usar esta habilidade se estiver montado, pode manter uma criatura agarrada por vez e não ocupa sua arma para isso.
Cavaleiro Dracônico (Reação) Uma vez por rodada, quando é alvo de um ataque corpo a corpo, o cavaleiro pode fazer um teste de Cavalgar oposto à Luta do atacante. Se vencer, ele evita o dano e pode fazer um ataque corpo a corpo contra o atacante.
Despertar o Poder (Movimento) Se o cavaleiro não estiver montado, invoca uma fúria terrível que fornece +5 em testes de ataque e rolagens de dano, redução de dano 5 e resistência a magia +2 até o fim da cena.
Ginete de Corcel de Kally O cavaleiro possui um corcel de Kally, um parceiro montaria Grande. Enquanto estiver montado, seu deslocamento muda para 12m e ele recebe deslocamento de voo 12m e +1d8 em rolagens de dano corpo a corpo.
Investida Aérea Quando faz uma investida montada, o cavaleiro causa +6d8 pontos de dano e pode continuar se movendo após o ataque, até o limite de seu deslocamento.
For 5, Des 2, Con 3, Int 0, Sab 0, Car 3
Perícias Atletismo +13, Cavalgar +20, Intimidação +11.
Equipamento Armadura completa de couro de dragão, espada bastarda, lança montada. Tesouro Metade.`
        },
        {
          chave: "acolitoDeKally", nome: "Acólito de Kally", nd: "3", tipo: "Humanoide (humano) Médio",
          papel: '',
          subgrupo: "Clérigo de Kally",
          resumo: "Clérigo de Kally — A mulher altiva os observa com olhos que quase expelem chamas, enquanto empunha um cetro em formato de garra.",
          texto:
`Acólito de Kally ND 3
Humanoide (humano) Médio
Iniciativa +4, Percepção +7
Defesa 19, Fort +10, Ref +3, Von +14
Pontos de Vida 60
Deslocamento 9m (6q)
Pontos de Mana 29
Corpo a Corpo Maça +13 (1d8+13).
✦ Aura de Medo (Livre, 2 PM) O acólito de Kally gera uma aura de medo de 9m de raio que dura até o fim da cena. Todos os inimigos que entrem na aura ficam abalados até o fim da cena (Von CD 19 evita e a criatura fica imune a esta habilidade por um dia).
✦ Servos do Dragão (Completa, 2 PM) O acólito invoca 2d4+1 kobolds em espaços desocupados em alcance curto. Eles agem a partir da próxima rodada do acólito, têm deslocamento 9m e podem gastar uma ação padrão para causar 1d6-1 pontos de dano de corte em uma criatura adjacente. Os kobolds têm For –1, Des 4, Defesa 12 e 1 PV, falham automaticamente em qualquer teste oposto ou de resistência e desaparecem quando mortos ou ao fim da cena.
Magias Como um clérigo de Kallyadranoch de 5º nível (CD 19).
• Comando (Padrão, 2 PM) No início do seu próximo turno, uma criatura em alcance curto fica caída e não pode se levantar até o início do seu turno seguinte (Von evita).
• Controlar Fogo (Padrão, 3 PM) O acólito chameja qualquer número de armas e ataques desarmados escolhidos em alcance curto. Até o fim da cena, essas armas causam +1d6 pontos de dano de fogo.
• Escudo da Fé (Reação, 1 PM) Quando uma criatura em alcance curto sofre um ataque, ela recebe +2 na Defesa por 1 turno.
• Perdição (Padrão, 3 PM) Criaturas escolhidas em alcance curto recebem –2 em testes de ataque e rolagens de dano até o fim da cena.
For 1, Des 1, Con 2, Int 1, Sab 4, Car 4
Perícias Intimidação +9, Misticismo +4, Religião +9.
Equipamento Gibão de peles, maça, símbolo sagrado de Kallyadranoch. Tesouro Padrão.`
        },
        {
          chave: "clerigoDeKally", nome: "Clérigo de Kally", nd: "8", tipo: "Humanoide (humano) Médio",
          papel: '',
          subgrupo: "Clérigo de Kally",
          resumo: "Clérigo de Kally — A mulher altiva os observa com olhos que quase expelem chamas, enquanto empunha um cetro em formato de garra.",
          texto:
`Clérigo de Kally ND 8
Humanoide (humano) Médio
Iniciativa +9, Percepção +14
Defesa 29, Fort +15, Ref +8, Von +21
Pontos de Vida 224
Deslocamento 9m (6q)
Pontos de Mana 51
Corpo a Corpo Maça x2 +24 (1d8+17).
À Distância Azagaia +24 (1d6+17).
✦ Aura de Medo (Livre, 2 PM) O clérigo de Kally gera uma aura de medo de 9m de raio que dura até o fim da cena. Todos os inimigos que entrem na aura ficam abalados até o fim da cena (Von CD 28 evita e a criatura fica imune a esta habilidade por um dia).
Magia Acelerada (Livre, +4 PM) Uma vez por rodada, quando lança uma magia com execução de ação completa ou menor, o clérigo muda a execução dela para livre.
✦ Servos do Dragão (Completa, 2 PM) O clérigo invoca 2d4+1 kobolds, (veja Acólito de Kally).
Magias Como um clérigo de Kallyadranoch de 9º nível (CD 28, limite de PM 9).
• Coluna de Chamas (Padrão, 9 PM) Um cilindro de fogo sagrado com 3m de raio e 30m de altura desce dos céus em alcance longo, causando 9d6 pontos de dano de fogo mais 6d6 pontos de dano de luz nas criaturas e objetos livres na área.
• Comando (Padrão, 4 PM) No início do seu próximo turno, duas criaturas em alcance curto ficam caídas e não podem levantar-se até o início do seu turno seguinte (Von evita).
• Controlar Fogo (Padrão, 3 PM) O clérigo chameja qualquer número de armas e ataques desarmados escolhidos em alcance curto. Até o fim da cena, essas armas causam +1d6 pontos de dano de fogo.
• Escudo da Fé (Reação, 1 PM) Quando uma criatura em alcance curto sofre um ataque, ela recebe +2 na Defesa por 1 turno.
• Oração (Padrão, 7 PM, sustentada) O clérigo e seus aliados em alcance curto recebem +3 em testes de perícia e rolagens de dano, e todos seus inimigos em alcance curto sofrem –3 em testes de perícia e rolagens de dano. Esse efeito é cumulativo com outras magias.
• Proteção Divina (Reação, 3 PM) Por uma rodada, uma criatura em alcance curto recebe +5 no próximo teste de resistência que fizer.
For 1, Des 1, Con 3, Int 1, Sab 6, Car 4
Perícias Intimidação +12, Misticismo +9, Religião +16.
Equipamento Azagaia x2, couraça, maça, símbolo sagrado de Kallyadranoch. Tesouro Padrão.`
        },
        {
          chave: "altoClerigoDeKally", nome: "Alto Clérigo de Kally", nd: "13", tipo: "Monstro (kallyanach) Médio",
          papel: '',
          subgrupo: "Clérigo de Kally",
          resumo: "Clérigo de Kally — A mulher altiva os observa com olhos que quase expelem chamas, enquanto empunha um cetro em formato de garra.",
          texto:
`Alto Clérigo de Kally ND 13
Monstro (kallyanach) Médio
Iniciativa +10, Percepção +17
Defesa 40, Fort +20, Ref +13, Von +26
Pontos de Vida 455
Deslocamento 6m (4q), voo 6m (4q)
Pontos de Mana 72
Corpo a Corpo Lança x2 +35 (1d6+23, 19, mais 1d6 fogo).
À Distância Lança +35 (1d6+23, 19, mais 1d6 fogo).
✦ Aura de Medo (Livre, 2 PM) O alto clérigo de Kally gera uma aura de medo de 9m de raio que dura até o fim da cena. Todos os inimigos que entrem na aura ficam abalados até o fim da cena (Von CD 37 evita e a criatura fica imune a esta habilidade por um dia).
Magia Acelerada (Livre, +4 PM) Uma vez por rodada, quando lança uma magia com execução de ação completa ou menor, o alto clérigo muda a execução dela para livre.
Poder Ilimitado! (Livre, 3 PM) Quando lança uma magia sustentada, o alto clérigo muda a duração dela para cena.
✦ Servos do Dragão (Completa, 2 PM) O alto clérigo invoca 2d6+2 kobolds (veja Acólito de Kally).
Magias Como um clérigo de Kallyadranoch de 13º nível (CD 37).
• Coluna de Chamas (Padrão, 13 PM) Um cilindro de fogo sagrado com 3m de raio e 30m de altura desce dos céus em alcance longo, causando 13d6 pontos de dano de fogo mais 6d6 pontos de dano de luz nas criaturas e objetos livres na área (Ref reduz à metade).
• Comando (Padrão, 8 PM) No início do seu próximo turno, quatro criaturas em alcance curto ficam caídas e não podem se levantar até o início do seu turno seguinte (Von evita).
• Controlar Fogo (Padrão, 3 PM) O alto clérigo chameja qualquer número de armas e ataques desarmados escolhidos em alcance curto. Até o fim da cena, essas armas e ataques causam +1d6 pontos de dano de fogo.
• Escudo da Fé (Reação, 1 PM) Quando uma criatura em alcance curto sofre um ataque, ela recebe +2 na Defesa por 1 turno.
• Manto do Cruzado (Padrão, 10 PM, sustentada) Criaturas escolhidas em alcance curto sofrem 4d8 pontos de dano de trevas no início de cada um de seus turnos. O alto clérigo cura metade de todo dano causado pela magia.
• Oração (Padrão, 11 PM, sustentada) O alto clérigo e seus aliados em alcance curto recebem +4 em testes de perícia e rolagens de dano, e todos seus inimigos em alcance curto recebem –4 em testes de perícia e rolagens de dano. Esse efeito é cumulativo com outras magias.
• Potência Divina (Padrão, 6 PM, sustentada) O tamanho do alto clérigo aumenta uma categoria e ele recebe Força +4 e RD 10. Ele não pode lançar magias enquanto estiver sob efeito de Potência Divina.
• Proteção Divina (Reação, 3 PM) Uma criatura em alcance curto recebe +5 no próximo teste de resistência que fizer até o fim da cena.
For 2, Des 0, Con 3, Int 1, Sab 7, Car 3
Perícias Intimidação +15, Intuição +17, Misticismo +11, Religião +19.
Equipamento Lança de arremesso, meia armadura, símbolo sagrado de Kallyadranoch. Tesouro Padrão.`
        },
        {
          chave: "corcelDeKally", nome: "Corcel de Kally", nd: "2", tipo: "Monstro Grande",
          papel: '',
          resumo: "A criatura tem o tamanho e forma de um cavalo, mas claramente não é.",
          texto:
`Corcel de Kally ND 2
“Cavalgar um dragão? Seu tolo abismal! Você não é digno. Ninguém é.”
— Laxann Helataxx, meio-elfo guerreiro devoto de Kallyadranoch
A criatura tem o tamanho e forma de um cavalo, mas claramente não é. O corpo escamado, a longa cauda, as grandes asas coriáceas, as mandíbulas com dentes afiados de onde pingam chamas — tudo isso deixa pouca dúvida sobre sua real natureza. O corcel de Kally não existe em estado natural. Este animal mágico é uma montaria sagrada de Kallyadranoch, uma recompensa para seus devotos mais merecedores — e ao mesmo tempo um aviso: dragões verdadeiros não existem para ser cavalgados! Apesar de seu aspecto, um corcel de Kally é apenas um pouco mais inteligente que um cavalo comum. Como montaria, ele se comporta de forma parecida com um cavalo de guerra, obedecendo aos comandos do cavaleiro e não se assustando em situações de combate. Sua baforada de chamas, limitada a poucos usos, normalmente é reservada para proteger o cavaleiro caso este se encontre indefeso. Em voo, o corcel é capaz de velocidade e manobras impressionantes, quase igualando um grifo. Embora possam ser vistos protegendo locais sagrados de Kallyadranoch, estes corcéis são mais comumente encontrados como montarias de clérigos, cavaleiros de Kally, dracomantes e tiranos do Terceiro. Alguns aventureiros devotos de Kally também recebem esta dádiva.
Monstro Grande
Iniciativa +6, Percepção +5, faro, visão no escuro
Defesa 20, Fort +11, Ref +9, Von +2, imunidade a fogo
Pontos de Vida 72
Deslocamento 12m (8q), voo 18m (12q)
Corpo a Corpo Duas garras +12 (1d6+4) e mordida +12 (1d6+4).
Natureza Dracônica Um corcel de Kally conta como um dragão para efeitos que afetem dragões.
Sopro (Padrão) Todas as criaturas em um cone de 6m sofrem 2d8 pontos de dano de fogo e ficam em chamas (Ref CD 16 reduz à metade e evita a condição). Recarga (movimento).
For 4, Des 2, Con 3, Int –3, Sab 1, Car 0
Perícias Atletismo +7.
Tesouro Peça de couro de dragão (CD 17 para extrair, veja Tormenta20, p. 312) e glândula incendiária (CD 17 para extrair, vale T$ 15 para fabricar fogo alquímico).
Parceiro O corcel de Kally é um parceiro montaria (Grande) que fornece os benefícios a seguir. Iniciante: seu deslocamento muda para 12m e, uma vez por rodada, você recebe +1d6 em uma rolagem de dano corpo a corpo. Veterano: o bônus na rolagem de dano muda para +1d8 e seu deslocamento muda para 12m (normal e de voo). Mestre: seu deslocamento normal e de voo muda para 18m e, uma vez por rodada, você pode gastar 2 PM para causar 3d8 pontos de dano de fogo em todas as criaturas em um cone de 6m (Ref CD Car reduz à metade).`
        },
        {
          chave: "dracomante", nome: "Dracomante", nd: "5", tipo: "Humanoide (humano) Médio",
          papel: '',
          subgrupo: "Dracomante",
          resumo: "Dracomante — Quando o conjurador sinistro gesticula, linhas brilhantes feitas de chamas correm ao longo do manto escuro e diagramas surgem no ar.",
          texto:
`Dracomante ND 5
Humanoide (humano) Médio
Iniciativa +8, Percepção +5
Defesa 18, Fort +5, Ref +11, Von +17, redução de fogo 10
Pontos de Vida 112
Deslocamento 9m (6q)
Pontos de Mana 40
Arcano de Batalha O dracomante soma sua Inteligência nas rolagens de dano quando lança magias ou usa seu raio arcano (já contabilizado).
Dracomancia Quando lança uma magia ou usa Raio Arcano, o dracomante recebe redução de dano 5 e resistência a magia +5 até o início de seu próximo turno.
Presença Aterradora (Padrão, 1 PM) O dracomante faz um teste de Intimidação oposto à Vontade de criaturas em alcance curto. Aquelas que falharem no teste ficam abaladas até o fim da cena; se falharem por 10 ou mais também ficam apavoradas por 1 rodada.
✦ Raio Arcano (Padrão, 1 PM) Uma criatura em alcance médio sofre 2d12+6 pontos de dano de fogo e fica em chamas (Ref CD 22 reduz à metade e evita a condição).
Magias Como um mago de 5º nível (CD 22).
• Armadura Arcana (Padrão, 3 PM) O dracomante recebe +5 na Defesa por um dia.
• Bola de Fogo (Padrão, 5 PM) O dracomante causa 8d6+6 pontos de dano de fogo em todas as criaturas e objetos livres numa esfera de 6m em alcance médio (Ref reduz à metade).
• Campo de Força (Reação, 4 PM) Quando sofre dano, o dracomante recebe redução de dano 30 contra este dano.
• Explosão de Chamas (Padrão, 4 PM) O dracomante causa 5d6+6 pontos de dano de fogo a criaturas em um cone de 6m (Ref reduz à metade).
For –1, Des 3, Con 2, Int 6, Sab 2, Car 3
Perícias Conhecimento +12, Intimidação +8, Misticismo +12. EquipamentoPergaminho de armadura arcana, pergaminho de explosão de chamas, pergaminho de bola de fogo ×2.
Tesouro Metade.`
        },
        {
          chave: "dracomanteSuperior", nome: "Dracomante Superior", nd: "14", tipo: "Humanoide (elfo) Médio",
          papel: '',
          subgrupo: "Dracomante",
          resumo: "Dracomante — Quando o conjurador sinistro gesticula, linhas brilhantes feitas de chamas correm ao longo do manto escuro e diagramas surgem no ar.",
          texto:
`Dracomante Superior ND 14
Humanoide (elfo) Médio
Iniciativa +18, Percepção +16, visão na penumbra
Defesa 33, Fort +12, Ref +20, Von +28, redução de fogo 15
Pontos de Vida 500
Deslocamento 12m (8q)
Pontos de Mana 112
Corpo a Corpo Adaga +30 (1d4+15, 19).
Arcano de Batalha O dracomante superior soma sua Inteligência nas rolagens de dano quando lança magias ou usa seu raio arcano (já contabilizado).
Dracomancia Quando lança uma magia ou usa Raio Arcano, o dracomante recebe redução de dano 5 e resistência a magia +5 até o início de seu próximo turno.
Magia Acelerada (Livre, +4 PM) Uma vez por rodada, quando usa seu Raio Arcano ou lança uma magia com execução de ação completa ou menor, o dracomante superior muda a execução dela para livre.
Presença Aterradora (Padrão, 1 PM) O dracomante faz um teste de Intimidação oposto à Vontade de criaturas em alcance curto. Aquelas que falharem no teste ficam abaladas até o fim da cena; se que falharem por 10 ou mais também ficam apavoradas por 1 rodada. “PRESENCIEM O VERDADEIRO PODER!” (Reação, 23 PM) Quando é reduzido a 300 PV ou menos, o dracomante lança a magia Transformação em Dragão (veja abaixo).
✦ Raio Arcano (Padrão, 1 PM) Uma criatura em alcance médio sofre 4d12+8 pontos de dano de fogo e fica em chamas (Ref CD 38 reduz à metade e evita a condição).
Magias Como um mago de 14º nível (CD 38, limite de PM 23).
• Armadura Arcana (Padrão, 15 PM) O dracomante recebe +11 na Defesa por um dia.
• Bola de Fogo (Padrão, 11 PM) O dracomante causa 15d6+8 pontos de dano de fogo em todas as criaturas e objetos livres numa esfera de 6m em alcance médio (Ref reduz à metade).
• Campo de Força (Reação, 7 PM) Quando sofre dano, o dracomante recebe redução de dano 50 contra este dano.
• Talho Invisível de Edauros (Padrão, 10 PM) Criaturas em um cone de 9m sofrem 10d8+8 pontos de dano de corte e ficam sangrando (Fort reduz à metade e evita a condição).
• Transformação em Dragão (Completa, 23 PM) O dracomante recebe +2 em Força, Constituição, Inteligência e Carisma, +5 na Defesa, redução de fogo 30, deslocamento de voo 18m e um ataque de mordida (ataque +30, dano 1d6+15, 19/x3) que pode ser usado com sua adaga. Além disso, uma vez por rodada, ele pode gastar uma ação padrão para soprar fogo, causando 10d6+10 pontos de dano de fogo em um cone de 9m (Ref reduz à metade).
• Velocidade (Padrão, 10 PM, sustentada) O dracomante pode executar uma ação padrão adicional por turno.
For –1, Des 4, Con 4, Int 8, Sab 2, Car 5
Perícias Conhecimento +22, Intimidação+19, Misticismo +24.
Equipamento Adaga, cetro elemental de couro de dragão (fogo), pergaminho de Transformação em Dragão. Tesouro Nenhum.`
        },
        {
          chave: "kallyanachBarbaro", nome: "Kallyanach Bárbaro", nd: "6", tipo: "Monstro (kallyanach) Médio",
          papel: '',
          subgrupo: "Kallyanach",
          resumo: "Kallyanach — O ser humanoide é coberto de escamas robustas, tem cabeça adornada de chifres e presas, mãos com garras e grandes asas.",
          texto:
`Kallyanach Bárbaro ND 6
Monstro (kallyanach) Médio
Iniciativa +8, Percepção +8, faro, visão no escuro
Defesa 24, Fort +18, Ref +11, Von +6, redução de dano 5, redução de fogo 5
Pontos de Vida 224
Deslocamento 9m (6q), voo 9m (6q)
Corpo a Corpo Gadanho +20 (2d4+15, x4) e mordida +20 (1d6+14).
Fúria Elemental (Livre) Uma vez por cena, o kallyanach bárbaro entra em fúria. Ele recebe +4 em testes de ataque e seus ataques corpo a corpo causam +2d6 pontos de dano de fogo. Nesse estado ele não pode fazer nenhuma ação que exija calma e concentração (como usar Furtividade). A fúria termina se, ao fim da rodada, ele não tiver atacado nem sido alvo de um efeito hostil.
For 4, Des 2, Con 4, Int 0, Sab 2, Car 0
Perícias Atletismo +9, Sobrevivência +7.
Equipamento Couraça, gadanho. Tesouro Metade.`
        },
        {
          chave: "kallyanachMorteGlacial", nome: "Kallyanach Morte Glacial", nd: "9", tipo: "Monstro (kallyanach) Médio",
          papel: '',
          subgrupo: "Kallyanach",
          resumo: "Kallyanach — O ser humanoide é coberto de escamas robustas, tem cabeça adornada de chifres e presas, mãos com garras e grandes asas.",
          texto:
`Kallyanach Morte Glacial ND 9
Monstro (kallyanach) Médio
Iniciativa +14, Percepção +9, faro, visão no escuro
Defesa 32, Fort +9, Ref +21, Von +15, evasão, redução de frio 10
Pontos de Vida 340
Deslocamento 9m (6q), voo 9m (6q)
Corpo a Corpo Espada curta x2 +27 (1d6+12, 19) e mordida +27 (1d6+12).
Ataque Furtivo +4d6
Finta Aprimorada O kallyanach morte glacial pode fintar como uma ação de movimento.
Sopro de Dragão (Padrão) Criaturas em um cone de 6m sofrem 3d12 pontos de dano de frio, ficam lentas por 1d4 rodadas e, se estiverem surpreendidas, sofrem dano adicional de ataque furtivo (Ref CD 28 reduz à metade e evita a condição). Recarga (movimento).
For 1, Des 4, Con 3, Int 1, Sab 1, Car 1
Perícias Acrobacia +12, Atletismo +9, Enganação +11, Furtividade +14, Intimidação +9, Ladinagem +12.
Equipamento Couro batido ajustado, espada curta x2, gazua.
Tesouro Padrão.`
        },
        {
          chave: "avatarDeKallyadranoch", nome: "Avatar de Kallyadranoch", nd: "S", tipo: "Monstro (dragão) Colossal",
          papel: '',
          resumo: "DE VOCÊ, NÃO TENHO NADA A TEMER.” Seu olhar é atraído para a criatura prostrada no cume da montanha de riquezas.",
          texto:
`Avatar de Kallyadranoch ND S
“VOCÊ É UM AVATAR. SIMPLES FRAGMENTO.
DE VOCÊ, NÃO TENHO NADA A TEMER.”
— Mestre Arsenal
Seu olhar é atraído para a criatura prostrada no cume da montanha de riquezas. Tão grande que as asas abertas escondem o céu, tão grande que o menor movimento estremece o mundo. Aquele só pode ser o maior dragão em todos os reinos — maior que Beluhga, Benthos ou Sckhar, maior que todos os Dragões-Reais. Em suas escamas, correndo como água, as seis cores dos seis dragões. As seis cores das tranças de Kallyadranoch. Por ser um deus maior, Kallyadranoch tem o poder e o direito de manifestar uma forma de avatar em Arton — uma criatura feita com sua própria essência. Caso existisse, esse seria atualmente o dragão mais poderoso de Arton. No entanto, até agora não há notícia de nenhum avistamento da criatura hipotética. Nenhum clérigo de Kally, mesmo os mais poderosos, foi até agora capaz de invocar o dragão divino. Alguns suspeitam que, devido a seu retorno recente, o Deus dos Dragões não possa ainda criar um avatar. Outros fazem alguma ligação com o rumor de que Kally está vagando em Arton, preso ao corpo mortal de uma elfa. Também há relatos confusos de aventureiros que afirmam ter visto, enfrentado e/ou sobrevivido a um confronto com o próprio Kally em seu covil, no reino divino de Drashantyr. A explicação, talvez, é que o avatar de Kally estaria protegendo seus tesouros fabulosos, na ausência de seu mestre.
Monstro (dragão) Colossal
Iniciativa +25, Percepção +32, percepção às cegas, visão no escuro
Defesa 65, Fort +36, Ref +22, Von +30, imunidade a ácido, dano de luz, eletricidade, essência, fogo, frio, trevas e veneno, redução de dano 50, resistência a magia +5
Pontos de Vida 2.500
Deslocamento 18m(12q), voo 42m (28q)
Corpo a Corpo Duas garras +58 (5d20+70, 16) e mordida +58 (5d20+70, 16).
Aura Aterradora Vontade CD 51 evita.
Centelha Divina O Avatar de Kallyadranoch lança qualquer magia divina como um clérigo de 20º nível sem gastar PM (CD 51, limite 20 PM). Uma vez por cena, ele pode lançar uma dessas magias como uma ação livre.
Dilacerar Se o Avatar acerta os dois ataques de garra em uma mesma criatura no mesmo turno, causa mais 10d6+55 pontos de dano.
Mergulho Mortal (Completa) Se estiver voando, o Avatar faz uma investida contra uma criatura no solo e ataca com suas duas garras e mordida. Os três ataques recebem o bônus de +2 da investida, mas devem ser feitos contra o mesmo personagem. Após os ataques, o avatar pousa adjacente ao alvo.
Servos de Kally (Livre) Uma vez por cena, o Avatar invoca 6 dragões campeões (um de cada tipo entre ácido, eletricidade, fogo, frio, luz e trevas) que surgem em espaços desocupados em alcance longo. Eles agem no início da próxima rodada do Avatar, têm deslocamento de voo 18m e podem gastar uma ação padrão para emitir um sopro em um cone de 9m, que causa 6d12 pontos de dano de seu tipo de energia. Os dragões são Grandes, têm For 5, Des 1, 110 PV, Defesa 32, imunidades de dragão e a dano de seu tipo, usam os valores do Avatar com –5 para qualquer teste oposto ou de resistência e desaparecem quando mortos ou ao fim da cena.
Sopro Supremo (Padrão) O Avatar exala uma combinação de energias em um cone de 30m. Criaturas nessa área sofrem 8d12 pontos de dano de cada tipo de energia entre ácido, eletricidade, fogo, frio, luz e trevas (48d12 no total; Ref CD 51 reduz à metade). Sempre que rolar um “12” em um dado de dano, o avatar causa +1d12 pontos de dano do mesmo tipo. O sopro ignora RD, e imunidade a esses tipos de dano apenas o reduz à metade. Recarga (movimento).
Varredura (Reação) Quando é flanqueado, o Avatar move sua cauda, varrendo um cone de 9m. Criaturas nessa área sofrem 16d6+30 pontos de dano e ficam caídas (Ref CD 51 reduz à metade e evita a condição).
Vendaval (Movimento) O Avatar causa um vendaval com suas asas. Criaturas em alcance curto são arremessadas 3m para cada categoria de tamanho abaixo do Avatar na direção oposta a ele e ficam lentas por 1 rodada (Fort CD 51 evita o arremesso).
For 19, Des 0, Con 15, Int 9, Sab 9, Car 9
Perícias Enganação +30, Intimidação +30, Intuição +30, Misticismo +30, Religião +35.
Tesouro Nenhum.`
        },
      ],
      regras: [
        { titulo: "Clérigo de Kally",
          texto:
`“Que os tolos diante de mim sejam destruídos pelo poder que possuímos!”
— Rohélio, clérigo de Kallyadranoch
A mulher altiva os observa com olhos que quase expelem chamas, enquanto empunha um cetro em formato de garra. Seus trajes clericais estão longe de sugerir humildade, muito pelo contrário — são adornados de ouro e joias opulentas. A vestimenta também mostra padrões de asas coriáceas. No peito, o grande símbolo sagrado de um dragão com asas abertas. O típico clérigo de Kallyadranoch, se existe tal coisa, encontra seu propósito servindo como agente entre os povos humanoides e os dragões. Em regiões onde existe um dragão, ele se estabelece em alguma cidade ou aldeia como seu representante — em outras palavras, vai dominar o lugar, tratando de intimidar ou esmagar qualquer oposição. Vai celebrar cerimônias em homenagem a Kally e sua obra, que podem ou não atrair o dragão local para coletar riquezas ou sacrifícios. Um número cada vez maior de comunidades em Arton vive sob a opressão de um destes clérigos, às vezes durante anos, até que algum grupo de aventureiros descubra e venha mudar isso. Apesar do temor constante, muitas aldeias acabam se sujeitando à dominação, especialmente aquelas em regiões selvagens; visto que a presença do dragão afasta outros bandidos e monstros, não é raro que os aldeões terminem conformados, ou até convertidos em devotos verdadeiros. Nestes casos, heróis “matadores de dragões” podem ter dificuldades em decidir o que é certo ou errado. Embora muitos vejam este culto como uma igreja organizada, um verdadeiro exército, a verdade é um tanto diferente. Clérigos de Kally são orgulhosos, competitivos e territoriais, imitando os próprios dragões; membros da mesma fé são vistos como rivais indignos, sendo raro encontrá-los agindo em grupos, ou mesmo duplas. Um clérigo se cerca de outros devotos, sim, mas na posição de subalternos, como acólitos, guardas e soldados. Quando ordenados por Kally a atuar em alguma grande operação conjunta, fazem-no resignados, como oficiais que seguem ordens.` },
        { titulo: "Dracomante",
          texto:
`“Vou lhes ensinar o verdadeiro significado do poder. O MEU poder!”
— O Pata, sulfure dracomante
Quando o conjurador sinistro gesticula, linhas brilhantes feitas de chamas correm ao longo do manto escuro e diagramas surgem no ar. Em menos de um instante, o mago não é mais um mago — ele é um dragão, em toda a sua glória aterradora. Kallyadranoch é o Deus dos Dragões, mas também o Deus do Poder — incluindo poder mágico. Dragões são criaturas de intensa potência arcana, e a volta de Kally trouxe grande debate sobre a verdadeira procedência da magia em Arton. Embora quase todos concordem que Wynna seja a criadora da mágica arcana, Kally teria sido o provedor das fórmulas e técnicas para executá-la. A própria língua dracônica é aquela mais utilizada por magos em seus grimórios, uma das primeiras ensinadas na Academia Arcana. Assim, buscando uma maior proximidade com a fonte divina da magia — ou apenas aumentar seu poder —, não é surpresa que arcanistas acabem cultuando Kallyadranoch, sob o pretexto de estudá-lo. Ou o contrário. “Dracomantes” é como são chamados os magos que cultuam/estudam Kallyadranoch e os dragões. Uns poucos chegam a integrar grupos de aventureiros, com o propósito de encontrar dragões, aprender sobre eles, talvez evitar o derramamento de seu sangue. Mas vários outros têm um objetivo mais ambicioso — eles querem se tornar dragões. Alguns o conseguem, temporariamente (através de transformação mágica) ou parcialmente (tornando-se meios-dragões). Não se sabe de nenhum dracomante que tenha, de fato, alcançado o sonho de se tornar um dragão verdadeiro. Mas uma coisa é certa, ele estará disposto a tudo para conseguir.` },
        { titulo: "Dracomancia Elemental",
          texto:
`Assim como os dragões, os dracomantes são mestres dos elementos. Eles escolhem se especializar nas mais diversas magias e encantos elementais para simular o domínio que os dragões têm de suas linhagens. Os dracomantes descritos aqui são especializados em fogo, mas você pode criar dracomantes ligados aos demais elementos. Para isso, substitua sua redução de dano e o tipo de dano de seu sopro e Raio Elemental por um dos elementos abaixo, e substitua as magias Bola de Fogo e Explosão de Chamas pelas magias a seguir:
• Ácido: Flecha Ácida, Jato Corrosivo .
• Elétrico: Relâmpago, Toque Chocante.
• Frio: Dardo Gélido , Sopro das Uivantes.` },
        { titulo: "Kallyanach",
          texto:
`“Sempre suspeitei haver algo em meu sangue… agora sei do que se trata!”
— Ben-Hakk, meio-dragão bardo
O ser humanoide é coberto de escamas robustas, tem cabeça adornada de chifres e presas, mãos com garras e grandes asas. Se foi humano um dia, ou elfo, ou mesmo minotauro, é impossível dizer — os traços dracônicos predominam por completo. Um meio-dragão pode surgir de várias maneiras. E, apesar da conhecida volúpia dos dragões, o acasalamento pode ser a menos comum de todas. Dragões são seres extremamente mágicos: sua própria presença emana uma aura elemental que se estende por toda a região que dominam, às vezes perdurando por anos após sua morte ou partida. Essa emanação pode ser pressentida ou farejada por predadores, que ficam prudentemente afastados. No entanto, quando povos humanoides vivem na área, um bebê nascido ali pode ser meio-dragão. Também ocorre que a transformação seja intencional, em vez de acidental. Para um devoto de Kally, não há honra maior do que ser abençoado com essa metamorfose em algo mais próximo de sua divindade. Muitos dracomantes também perseguem esse objetivo, através de fórmulas e rituais. Fala-se em pequenas aldeias bárbaras formadas apenas por meios-dragões, em alguns pontos das Sanguinárias. E existe ainda uma causa muito mais evidente: Kallyadranoch voltou a ser um deus maior. Se ele desejar que qualquer nascimento no mundo resulte em um meio-dragão, por motivos que apenas um deus conhece, assim será.` },
      ],
    },

    // ── 🏯 IMPÉRIO DE JADE ─────────────────────────────
    {
      chave: "jade", nome: "Império de Jade", icone: "🏯", cor: "#2f7a5a",
      intro: "A distante Tamu-ra é muito diferente do Reinado em incontáveis aspectos, mas também semelhante em tantos outros. É uma terra de heróis aventureiros que protegem o povo contra o mal. Terra de povos não humanos. Terra de monstros e demônios.\nQuando Tamu-ra foi tomada pela Tormenta, grande parte de sua população veio refugiar-se no continente. Arton acolheu a gente de Lin-Wu, habituou-se a seus costumes milenares. Desde então, seres de origem tamuraniana podem ser encontrados por toda parte. Hoje, após a expulsão da Tormenta pelo herói Orion Drake e seu exército de deuses, o Império de Jade está em reconstrução. São auxiliados pelo Reinado, que socorreu seu povo durante os anos de pesadelo. Rotas comerciais foram retomadas, cidades são repovoadas, vidas são reconstruídas. Cada vez mais nativos do Reinado visitam e se estabelecem no Império, e vice-versa. Como resultado, infiltradas a bordo de embarcações ou apenas seguindo-as pela costa, criaturas de Tamu-ra também chegam até aqui.",
      fichas: [
        {
          chave: "chibiKabuto", nome: "Chibi-Kabuto", nd: "1/4", tipo: "Animal Minúsculo",
          papel: '',
          subgrupo: "Kabuto",
          resumo: "Kabuto — Um olhar apressado sugere que a grande besta-inseto seja alguma aberração da Tormenta.",
          texto:
`Chibi-Kabuto ND 1/4
Animal Minúsculo
Iniciativa +4, Percepção +6, faro, visão na penumbra
Defesa 13, Fort +2, Ref +3, Von –2
Pontos de Vida 8
Deslocamento 6m (4q), voo 3m (2q)
Corpo a Corpo Galhada +4 (1d6+2 perfuração).
For –2, Des 2, Con 0, Int –4, Sab 1, Car –3
Tesouro Nenhum.
Familiar Um chibi-kabuto familiar aumenta em +1 o bônus na Defesa que você recebe por suas magias.`
        },
        {
          chave: "koKabuto", nome: "Ko-Kabuto", nd: "1", tipo: "Animal Pequeno",
          papel: '',
          subgrupo: "Kabuto",
          resumo: "Kabuto — Um olhar apressado sugere que a grande besta-inseto seja alguma aberração da Tormenta.",
          texto:
`Ko-Kabuto ND 1
Animal Pequeno
Iniciativa +4, Percepção +6, faro, visão na penumbra
Defesa 17, Fort +7, Ref +11, Von +0
Pontos de Vida 38
Deslocamento 6m (4q), voo 3m (2q)
Corpo a Corpo Galhada +8 (1d8+9 perfuração).
Agarralhada O ko-kabuto recebe +2 em testes para agarrar e derrubar.
For 0, Des 2, Con 1, Int –4, Sab 1, Car –3
Tesouro Nenhum.
Parceiro O ko-kabuto é um parceiro especial (guardião) que fornece os benefícios a seguir. Iniciante: você recebe visão na penumbra e +1 na Defesa. Veterano: uma vez por rodada, você recebe +1d8 em uma rolagem de dano corpo a corpo. Mestre: o bônus na Defesa muda para +2 e o bônus em rolagens de dano muda para +1d10. Alternativamente, um ko-kabuto pode ser uma montaria Pequena (adequada a criaturas Minúsculas) com as estatísticas de um dai-kabuto (a seguir)`
        },
        {
          chave: "hordaDeKoKabuto", nome: "Horda de Ko-Kabuto", nd: "3", tipo: "Animal Médio",
          papel: '',
          subgrupo: "Kabuto",
          resumo: "Kabuto — Um olhar apressado sugere que a grande besta-inseto seja alguma aberração da Tormenta.",
          texto:
`Horda de Ko-Kabuto ND 3
Animal Médio
Iniciativa +5, Percepção +7, faro, visão na penumbra
Defesa 22, Fort +11, Ref +13, Von +3
Pontos de Vida 112
Deslocamento 6m (4q), voo 3m (2q)
Corpo a Corpo [Bando] Galhada +12 (2d6+10 perfuração).
Agarralhada A horda de ko-kabuto recebe +2 em testes para agarrar e derrubar.
Formação Defensiva (Movimento) A horda recebe +2 na Defesa até seu próximo turno.
For 1, Des 2, Con 1, Int –4, Sab 1, Car –3
Tesouro Nenhum.`
        },
        {
          chave: "daiKabuto", nome: "Dai-Kabuto", nd: "4", tipo: "Animal Grande",
          papel: '',
          subgrupo: "Kabuto",
          resumo: "Kabuto — Um olhar apressado sugere que a grande besta-inseto seja alguma aberração da Tormenta.",
          texto:
`Dai-Kabuto ND 4
Animal Grande
Iniciativa +5, Percepção +8, faro, visão na penumbra
Defesa 25, Fort +16, Ref +10, Von +4, redução de dano 2
Pontos de Vida 155
Deslocamento 9m (6q), voo 6m (4q)
Corpo a Corpo Galhada +16 (2d8+12 perfuração, x3).
Agarralhada O dai-kabuto recebe +2 em testes para agarrar e derrubar.
Agarrar Aprimorado (Livre) Galhada (teste +20).
For 3, Des 1, Con 2, Int –4, Sab 1, Car –3
Tesouro Nenhum.
Parceiro O dai-kabuto é um parceiro montaria (Grande) que fornece os benefícios a seguir. Iniciante: seu deslocamento muda para 9m e você recebe +2 em testes de agarrar e derrubar e uma ação de movimento extra por turno (apenas para se deslocar). Veterano: você recebe deslocamento de voo 6m. Mestre: o bônus em agarrar se aplica a todas as manobras e você recebe +2 na Defesa.`
        },
        {
          chave: "kaijinCapanga", nome: "Kaijin Capanga", nd: "6", tipo: "Monstro (kaijin) Médio",
          papel: '',
          subgrupo: "Kaijin",
          resumo: "Kaijin — Por Lin-Wu, como isso é possível?” O monstro aberrante é, obviamente, um demônio da Tormenta — mas algo parece diferente.",
          texto:
`Kaijin Capanga ND 6
Monstro (kaijin) Médio
Iniciativa +5, Percepção +8
Defesa 26, Fort +17, Ref +12, Von +7, fortificação 50%, redução de dano 5, resistência a lefeu e Tormenta +5
Pontos de Vida 60
Deslocamento 9m (6q)
Corpo a Corpo Duas garras +22 (2d6+15, 19).
Mutação Rubra O kaijin capanga possui duas mutações, escolhidas entre as seguintes.
• Asas de Inseto. O kaijin tem deslocamento de voo 9m.
• Carapaça Superior (Reação). Uma vez por rodada, quando sofre dano, o kaijin pode reduzir esse dano à metade.
• Deslocado. O kaijin tem camuflagem leve contra todos os ataques e ignora terreno difícil.
• Insanidade da Tormenta. Criaturas que vejam o kaijin perdem 2d4 PM (Von CD 22 evita). Uma criatura só pode ser afetada por essa habilidade uma vez por dia.
• Mãos Aderentes. O kaijin tem deslocamento de escalada 9m.
• Mente Alienígena. Quando faz um teste de Vontade, o kaijin rola dois dados e usa o melhor. Além disso, quando faz um teste de Vontade para resistir a um efeito, ele causa 5d6 pontos de dano psíquico na criatura que gerou o efeito.
• Sangue Corrosivo (Reação). Uma vez por rodada, quando o kaijin sofre dano, todas as criaturas adjacentes a ele sofrem 3d6 pontos de dano de ácido.
For 5, Des 2, Con 4, Int –1, Sab 1, Car –3
Perícias Intimidação +10.
Tesouro Metade.`
        },
        {
          chave: "kaijinBruto", nome: "Kaijin BRUTO", nd: "11", tipo: "Monstro (kaijin) Grande",
          papel: '',
          subgrupo: "Kaijin",
          resumo: "Kaijin — Por Lin-Wu, como isso é possível?” O monstro aberrante é, obviamente, um demônio da Tormenta — mas algo parece diferente.",
          texto:
`Kaijin BRUTO ND 11
Monstro (kaijin) Grande
Iniciativa +7, Percepção +12
Defesa 42, Fort +24, Ref +12, Von +17, fortificação 50%, redução de dano 10, resistência a lefeu e Tormenta +5
Pontos de Vida 600
Deslocamento 9m (6q)
Corpo a Corpo Duas garras +32 (1d10+20, 19), pinça +32 (1d12+20, 18/x3) e tentáculo +32 (2d4+18).
Agarrar Aprimorado (Livre) Tentáculo (teste +34).
Dilacerar Se o kaijin bruto acerta os dois ataques de garra em uma mesma criatura no mesmo turno, causa mais 2d10+20 pontos de dano.
Mutação Rubra O kaijin possui três mutações, escolhidas entre as seguintes.
• Asas de Inseto. O kaijin tem deslocamento de voo 9m (6q).
• Carapaça Superior (Reação). Uma vez por rodada, quando sofre dano, o kaijin pode reduzir esse dano à metade.
• Deslocado. O kaijin tem camuflagem leve contra todos os ataques e ignora terreno difícil.
• Insanidade da Tormenta. Criaturas que vejam o kaijin perdem 1d10 PM (Von CD 32 evita). Uma criatura só pode ser afetada por essa habilidade uma vez por dia.
• Mãos Aderentes. O kaijin tem deslocamento de escalada 9m.
• Mente Alienígena. Quando faz um teste de Vontade, o kaijin rola dois dados e usa o melhor. Além disso, quando faz um teste de Vontade para resistir a um efeito, ele causa 6d6 pontos de dano psíquico na criatura que gerou o efeito.
• Sangue Corrosivo (Reação). Uma vez por rodada, quando o kaijin sofrer dano, todas as criaturas adjacentes a ele sofrem 4d6 pontos de dano de ácido.
For 8, Des 1, Con 6, Int –2, Sab 1, Car –4
Perícias Atletismo +21, Intimidação +21.
Tesouro Metade.`
        },
        {
          chave: "kaijinNinja", nome: "Kaijin Ninja", nd: "13", tipo: "Monstro (kaijin) Médio",
          papel: '',
          subgrupo: "Kaijin",
          resumo: "Kaijin — Por Lin-Wu, como isso é possível?” O monstro aberrante é, obviamente, um demônio da Tormenta — mas algo parece diferente.",
          texto:
`Kaijin Ninja ND 13
Monstro (kaijin) Médio
Iniciativa +17, Percepção +12
Defesa 36, Fort +20, Ref +26, Von +12, evasão, redução de dano 5, resistência a lefeu e Tormenta +5
Pontos de Vida 450
Deslocamento 12m (8q), escalada 9m (6q)
Pontos de Mana 48
Corpo a Corpo Espada curta x3 +32 (2d6+20, 19).
À Distância Zarabatana +34 (1d4+15, x3, mais veneno).
Ataque Furtivo +6d6.
Sangue Corrosivo Uma vez por rodada, quando o kaijin ninja sofre dano, todas as criaturas adjacentes a ele sofrem 4d6 pontos de dano de ácido.
Sombra O kaijin não sofre penalidade em testes de Furtividade por se mover ao seu deslocamento normal e reduz a penalidade em Furtividade por atacar e fazer outras ações chamativas para –10.
Truques Ninjas O kaijin pode lançar as seguintes magias simuladas (veja p. 376) como um conjurador arcano de 12º nível (CD 37).
• Imagem Espelhada (Padrão, 5 PM) O kaijin cria 4 cópias ilusórias de si mesmo que fornecem +8 na Defesa. Cada vez que um ataque contra ele erra, uma das imagens desaparece e o bônus na Defesa diminui em 2. Quando uma cópia é destruída, a criatura que a destruiu fica ofuscada por 1 rodada.
• Invisibilidade (Padrão, 6 PM) O kaijin fica invisível até o fim da cena (recebe camuflagem total, +10 em Furtividade contra ouvir e criaturas que não possam vê-lo ficam desprevenidas contra seus ataques). A magia termina se o kaijin fizer uma ação hostil contra uma criatura.
• Névoa (Padrão, 8 PM) Forma uma nuvem que ocupa um cubo de 6m em alcance curto e dura até o fim da cena. Criaturas a até 1,5m têm camuflagem leve e criaturas a partir de 3m têm camuflagem total (o kaijin ignora essa camuflagem). Um vento forte dispersa a névoa em 4 rodadas e um vendaval a dispersa em 1 rodada. Criaturas dentro da nuvem têm seu deslocamento reduzido para 3m e sofrem –2 em testes de ataque e rolagens de dano.
• Primor Atlético (Padrão, 4 PM) Até o fim da cena, o kaijin recebe deslocamento +9m, +10 em Atletismo e, quando faz um teste de uma perícia baseada em Força, Destreza e Constituição, exceto de ataque ou resistência, rola dois dados e escolhe o melhor.
• Teia (Padrão, 4 PM) O kaijin cria um cubo de terreno difícil de 6m em alcance curto. Criaturas na área, ou que comecem seu turno em seu interior, ficam enredadas e imóveis (Ref evita). Uma criatura pode se libertar com uma ação padrão e um teste de Acrobacia ou Atletismo.
Veneno Essência de sombra (debilitado, Fort CD 37 reduz para fraco).
For 2, Des 7, Con 4, Int 3, Sab 2, Car –2
Perícias Acrobacia +17, Furtividade +27, Ladinagem +17.
Equipamento Dardos x20, espada curta certeira, essência de sombra x1d4, gazua, manto camuflado aprimorado, zarabatana certeira (todos adaptados). Tesouro Padrão.`
        },
        {
          chave: "kappaBrigao", nome: "Kappa Brigão", nd: "1", tipo: "Espírito (kappa) Médio",
          papel: '',
          subgrupo: "Kappa",
          resumo: "Kappa — Os estranhos seres aquáticos têm o aspecto de tartarugas bípedes, com faces reptilianas, olhos redondos e vermelhos, escamas…",
          texto:
`Kappa Brigão ND 1
Espírito (kappa) Médio
Iniciativa +5, Percepção +0
Defesa 18, Fort +5, Ref +11, Von +0, não pode ser flanqueado
Pontos de Vida 30
Deslocamento 9m (6q), natação 9m (6q)
Corpo a Corpo Ataque desarmado x2 +9 (1d6+4).
Agarrar Aprimorado (Livre) Ataque desarmado (teste +9).
Carapaça Kappa O kappa brigão recebe cobertura leve quando está caído ou submerso.
Cura das Águas (Padrão) Uma vez por cena, o kappa pode lançar Curar Ferimentos para curar 2d8+2 PV de uma criatura. Ele não pode usar esta habilidade se a água de sua cabeça estiver derramada.
Tigela D’água Quando falha por 5 ou mais em um teste para evitar ser agarrado, derrubado ou empurrado, o kappa derrama a água de sua cabeça. Ele fica enjoado até encher a tigela novamente (o que exige uma fonte de água e uma ação padrão).
For 1, Des 3, Con 2, Int 0, Sab 0, Car –1
Tesouro Nenhum.`
        },
        {
          chave: "kappaYokozuna", nome: "Kappa Yokozuna", nd: "3", tipo: "Espírito (kappa) Médio",
          papel: '',
          subgrupo: "Kappa",
          resumo: "Kappa — Os estranhos seres aquáticos têm o aspecto de tartarugas bípedes, com faces reptilianas, olhos redondos e vermelhos, escamas…",
          texto:
`Kappa Yokozuna ND 3
Espírito (kappa) Médio
Iniciativa +6, Percepção +2
Defesa 23, Fort +9, Ref +15, Von +3, não pode ser flanqueado
Pontos de Vida 105
Deslocamento 9m (6q), natação 9m (6q)
Corpo a Corpo Ataque desarmado x2 +14 (1d6+7).
Agarrar Aprimorado (Livre) Ataque desarmado (teste +16). Quando agarra uma criatura, o kappa yokozuna a derruba automaticamente.
Carapaça Kappa O kappa recebe cobertura leve quando está caído ou submerso.
Cura das Águas (Padrão) Uma vez por cena, o kappa pode lançar Curar Ferimentos para curar 4d8+4 PV de uma criatura. Ele não pode usar esta habilidade se a água de sua cabeça estiver derramada.
Golpe Impactante (Livre) Uma criatura atingida por um ataque desarmado do kappa é empurrada 1,5m para cada 5 pontos de dano que sofrer (Fort CD 17 evita).
Tigela D’água Quando falha por 5 ou mais em um teste para evitar ser agarrado, derrubado ou empurrado, o kappa derrama a água de sua cabeça. Ele fica enjoado até encher a tigela novamente (o que exige uma fonte de água e uma ação padrão).
For 2, Des 3, Con 3, Int 0, Sab 1, Car –1
Tesouro Nenhum.`
        },
        {
          chave: "mashinMonge", nome: "Mashin Monge", nd: "3", tipo: "Construto (golem) Médio",
          papel: '',
          subgrupo: "Mashin",
          resumo: "Mashin — À primeira vista, lembra um ser humano esbelto em armadura metálica, ou uma estátua de manufatura sofisticada.",
          texto:
`Mashin Monge ND 3
Construto (golem) Médio
Iniciativa +7, Percepção +3, visão no escuro
Defesa 22, Fort +4, Ref +15, Von +10, evasão, imunidade a frio
Pontos de Vida 135
Deslocamento 12m (8q)
Corpo a Corpo Ataque desarmado x3 +15 (1d6+4).
À Distância Adaga +13 (1d4+4, 19).
Arma Elemental (Movimento) Até o fim da rodada, o mashin monge causa +1d6 pontos de dano de frio com seus ataques.
Ataque de Chi Os ataques desarmados do monge ignoram 5 pontos de redução de dano.
For 3, Des 4, Con 3, Int 0, Sab 3, Car 0
Perícias Acrobacia +7, Atletismo +6, Cura +6, Religião +6.
Equipamento Adaga x3. Tesouro Nenhum.`
        },
        {
          chave: "mashinSamurai", nome: "Mashin Samurai", nd: "5", tipo: "Construto (golem) Médio",
          papel: '',
          subgrupo: "Mashin",
          resumo: "Mashin — À primeira vista, lembra um ser humano esbelto em armadura metálica, ou uma estátua de manufatura sofisticada.",
          texto:
`Mashin Samurai ND 5
Construto (golem) Médio
Iniciativa +12, Percepção +3, visão no escuro
Defesa 25, Fort +17, Ref +7, Von +13, imunidade a fogo
Pontos de Vida 221
Deslocamento 6m (4q)
Corpo a Corpo Katana x2 +18 (1d10+10, 19, mais 1d6 fogo).
Arma Acoplada A katana do mashin samurai é acoplada ao seu braço. Ela não pode ser desarmada e ele pode sacá-la como uma ação livre.
Kiai Divino Quando faz um ataque, o mashin causa dano máximo, sem a necessidade de rolar dados. Recarga (padrão).
Lâmina da Alma em Chamas (Reação) Uma vez por rodada, quando faz um ataque com sua katana, o mashin pode disparar uma esfera flamejante contra uma criatura em alcance médio. O alvo sofre 6d6 pontos de dano de fogo (Ref CD 20 reduz à metade).
For 4, Des 2, Con 3, Int 1, Sab 1, Car 0
Perícias Atletismo +8, Nobreza +5, Religião +5.
Equipamento Katana certeira, meia armadura. Tesouro Metade.`
        },
        {
          chave: "nezumiCapanga", nome: "Nezumi Capanga", nd: "1", tipo: "Humanoide (nezumi) Pequeno",
          papel: '',
          subgrupo: "Nezumi",
          resumo: "Nezumi — Os recém-chegados podem ser facilmente descritos como pessoas-ratos.",
          texto:
`Nezumi Capanga ND 1
Humanoide (nezumi) Pequeno
Iniciativa +4, Percepção +4, faro, visão na penumbra
Defesa 15, Fort +10, Ref +5, Von +1, resistência a medo de criaturas maiores +5
Pontos de Vida 9
Deslocamento 9m (6q)
Corpo a Corpo Dois neko-te +11 (1d4+3, 19) e mordida +11 (1d6+3, 19).
À Distância Azagaia +9 (1d6).
Roedor Quando o nezumi capanga faz um acerto crítico com sua mordida, deixa a armadura da vítima avariada ou, se ela estiver sem armadura, aumenta em +1 o multiplicador desse crítico.
For 0, Des 2, Con 2, Int –1, Sab 0, Car –1
Perícias Atletismo +4 (+6 para escalar), Intimidação +3.
Equipamento Azagaia, neko-te x2.
Tesouro Metade.`
        },
        {
          chave: "nezumiNinja", nome: "Nezumi Ninja", nd: "3", tipo: "Humanoide (nezumi) Pequeno",
          papel: '',
          subgrupo: "Nezumi",
          resumo: "Nezumi — Os recém-chegados podem ser facilmente descritos como pessoas-ratos.",
          texto:
`Nezumi Ninja ND 3
Humanoide (nezumi) Pequeno
Iniciativa +7, Percepção +3, faro, visão na penumbra
Defesa 19, Fort +9, Ref +15, Von +3, evasão, resistência a medo de criaturas maiores +5
Pontos de Vida 74
Deslocamento 9m (6q), escalada 9m (6q)
Corpo a Corpo Duas espadas curtas +12 (1d6+4, 19) e mordida +12 (1d6+4, 19).
À Distância Duas shuriken +12 (1d4+4, 19).
Ataque Furtivo +2d6.
Bomba de Fumaça (Padrão) O nezumi ninja prepara e arremessa uma bomba de fumaça em um ponto em alcance curto. A bomba libera uma fumaça espessa em um raio de 6m a partir do impacto; a fumaça obscurece toda visão, fornece camuflagem para criaturas a até 1,5m e camuflagem total para criaturas a partir de 3m e dura até o fim da cena.
Roedor Quando o nezumi faz um acerto crítico com sua mordida, deixa a armadura da vítima avariada ou, se ela estiver sem armadura, aumenta em +1 o multiplicador desse crítico.
For 0, Des 4, Con 2, Int 1, Sab 0, Car –1
Perícias Acrobacia +7, Furtividade +12, Intimidação +4.
Equipamento Bomba de fumaça x3, espada curta x2, shuriken x6. Tesouro Metade.`
        },
        {
          chave: "nezumiBrutamontes", nome: "Nezumi Brutamontes", nd: "4", tipo: "Humanoide (nezumi) Pequeno",
          papel: '',
          subgrupo: "Nezumi",
          resumo: "Nezumi — Os recém-chegados podem ser facilmente descritos como pessoas-ratos.",
          texto:
`Nezumi Brutamontes ND 4
Humanoide (nezumi) Pequeno
Iniciativa +5, Percepção +4, faro, visão na penumbra
Defesa 23, Fort +16, Ref +10, Von +4, resistência a medo de criaturas maiores +5
Pontos de Vida 140
Deslocamento 9m (6q)
Corpo a Corpo Marreta +16 (3d8+6) e mordida +16 (1d6+3, 19).
Estocada Invertida (Reação) Uma vez por rodada, se acertar um ataque com sua marreta, o nezumi brutamontes pode fazer um ataque em outra criatura usando a ponta do cabo da arma (ataque +16, dano 2d8+6, impacto).
Roedor Quando o nezumi brutamontes faz um acerto crítico com sua mordida, deixa a armadura da vítima avariada ou, se ela estiver sem armadura, aumenta em +1 o multiplicador desse crítico.
For 3, Des 1, Con 3, Int –1, Sab 0, Car –1
Perícias Atletismo +7, Intimidação +5.
Equipamento Gibão de peles, marreta aumentada. Tesouro Metade.`
        },
        {
          chave: "oni", nome: "Oni", nd: "5", tipo: "Espírito Médio",
          papel: '',
          subgrupo: "Oni",
          resumo: "Oni — Os humanoides imensos e abrutalhados são muito parecidos com ogros, mas há diferenças óbvias — sendo a mais marcante sua pele azulada ou avermelhada.",
          texto:
`Oni ND 5
Espírito Médio
Iniciativa +5, Percepção +3, faro, visão na penumbra
Defesa 24, Fort +17, Ref +11, Von +5, imunidade a doenças, fogo e veneno, redução de dano 5
Pontos de Vida 200
Deslocamento 9m (6q)
Corpo a Corpo Machado de guerra +17 (1d12+16, x3) e chifres +17 (1d6+10 mais doença).
Ataque Pesado (Livre) Quando acerta um ataque de machado de guerra, o oni faz a manobra derrubar ou empurrar contra o alvo (teste +19).
Avesso à Honra Os ataques do oni causam +1d10 pontos de dano de trevas contra devotos de Lin-Wu e personagens que sigam algum código de conduta (como Código de Honra ou Código do Herói).
Doença Uma criatura atingida pelos chifres do oni é exposta à doença calafrio diabólico (veja Tormenta20, p. 318).
For 5, Des 1, Con 3, Int 0, Sab –1, Car –2
Perícias Atletismo +9, Intimidação +7.
Equipamento Machado de guerra. Tesouro Padrão.`
        },
        {
          chave: "akaOni", nome: "Aka Oni", nd: "9", tipo: "Espírito (lefeu) Médio",
          papel: '',
          subgrupo: "Oni",
          resumo: "Oni — Os humanoides imensos e abrutalhados são muito parecidos com ogros, mas há diferenças óbvias — sendo a mais marcante sua pele azulada ou avermelhada.",
          texto:
`Aka Oni ND 9
Espírito (lefeu) Médio
Iniciativa +9, Percepção +14, faro, visão na penumbra
Defesa 35, Fort +21, Ref +16, Von +9, redução de dano 10
Pontos de Vida 360
Deslocamento 9m (6q)
Corpo a Corpo Tetsubo +28 (1d12+18, x3 mais 1d6 matéria vermelha), duas pinças +28 (1d4+13) e chifres +28 (1d6+13 mais doença).
Ataque Pesado (Livre) Quando acerta um ataque de tetsubo, o aka oni faz a manobra derrubar ou empurrar contra o alvo (teste +30).
Avesso à Honra Os ataques do oni causam +1d10 pontos de dano de trevas contra devotos de Lin-Wu e personagens que sigam algum código de conduta (como Código de Honra ou Código do Herói).
Doença Uma criatura atingida pelos chifres do oni é exposta à doença infecção escarlate.
Insanidade da Tormenta 2d6 PM (Von CD 28 evita).
For 7, Des 1, Con 3, Int –1, Sab 1, Car –4
Perícias Atletismo +15, Intimidação +11.
Equipamento Gibão de peles, tetsubo aumentado de matéria vermelha. Tesouro Nenhum.`
        },
        {
          chave: "tenguBandoleiro", nome: "Tengu Bandoleiro", nd: "6", tipo: "Espírito (tengu) Médio",
          papel: '',
          subgrupo: "Tengu",
          resumo: "Tengu — O vulto humanoide é escuro como a noite, todo coberto de penas profundamente negras.",
          texto:
`Tengu Bandoleiro ND 6
Espírito (tengu) Médio
Iniciativa +9, Percepção +7, visão no escuro
Defesa 25, Fort +12, Ref +19, Von +5
Pontos de Vida 51
Deslocamento 9m (6q), voo 12m (8q)
Corpo a Corpo Katana x2 +25 (2d10+21, 19).
Asas Desorientadoras Se não estiver usando suas asas para voar, o tengu bandoleiro pode fintar como ação de movimento.
Ataque Reflexo (Reação) Uma vez por rodada, o tengu pode fazer um ataque corpo a corpo contra um alvo em seu alcance natural que esteja desprevenido ou que se mova voluntariamente para fora desse alcance.
Imprevisível como o Vento Uma vez por rodada, quando não está voando e faz um ataque ou uma finta, o tengu pode rolar dois dados e usar o melhor resultado.
For 2, Des 4, Con 1, Int 2, Sab 0, Car –1
Perícias Acrobacia +9, Enganação +6, Sobrevivência +5.
Equipamento Katana. Tesouro Padrão.`
        },
        {
          chave: "daitengu", nome: "Daitengu", nd: "8", tipo: "Espírito (tengu) Médio",
          papel: '',
          subgrupo: "Tengu",
          resumo: "Tengu — O vulto humanoide é escuro como a noite, todo coberto de penas profundamente negras.",
          texto:
`Daitengu ND 8
Espírito (tengu) Médio
Iniciativa +14, Percepção +11, visão no escuro
Defesa 32, Fort +8, Ref +21, Von +15
Pontos de Vida 222
Deslocamento 9m (6q), voo 12m (8q)
Pontos de Mana 64
Corpo a Corpo Duas katanas +26 (2d10+24, 19).
Asas Desorientadoras Se não estiver usando suas asas para voar, o daitengu pode fintar como ação de movimento.
Ataque Reflexo (Reação) Uma vez por rodada, o daitengu pode fazer um ataque corpo a corpo contra um alvo em seu alcance natural que esteja desprevenido ou que se mova voluntariamente para fora desse alcance.
Imprevisível como o Vento Uma vez por rodada, quando não está voando e faz um ataque ou uma finta, o daitengu pode rolar dois dados e usar o melhor resultado.
Magias Como um bruxo de 8º nível (CD 28). Seu foco arcano é sua katana.
• Primor Atlético (Movimento, 2 PM) O daitengu salta e pousa em alcance corpo a corpo de uma criatura em alcance curto. Se fizer um ataque corpo a corpo contra essa criatura neste turno, ele recebe os benefícios e penalidades de uma investida e causa um dado extra de dano do mesmo tipo com este ataque.
• Resistência a Energia (Padrão, 6 PM) Até o fim da cena, criaturas escolhidas em alcance curto recebem redução de dano 10 contra ácido, eletricidade, fogo, frio, luz ou trevas, à escolha do daitengu.
• Soco de Arsenal (Padrão, 4 PM) O alcance natural do daitengu aumenta para 4,5m até o fim da cena.
• Velocidade (Padrão, 3 PM, sustentada) O daitengu pode executar uma ação padrão adicional por turno, que não pode ser usada para lançar magias.
For 2, Des 6, Con 2, Int 4, Sab 1, Car 0
Perícias Acrobacia +14, Enganação +10, Misticismo +14, Sobrevivência +9.
Equipamento Katana ×2. Tesouro Padrão.`
        },
        {
          chave: "dragaoCelestialJovem", nome: "Dragão Celestial Jovem", nd: "10", tipo: "Espírito Grande",
          papel: '',
          subgrupo: "Dragão Celestial",
          resumo: "Dragão Celestial — A grande forma escamada e colorida lembra um dragão — e realmente é, mas também algo diferente.",
          texto:
`Dragão Celestial Jovem ND 10
Espírito Grande
Iniciativa +12, Percepção +16, percepção às cegas, visão no escuro
Defesa 35, Fort +18, Ref +10, Von +22, imunidade a eletricidade, redução de dano 5, resistência a magia +2, vulnerabilidade a ácido
Pontos de Vida 450
Deslocamento 12m (8q), voo 36m (24q)
Pontos de Mana 75
Corpo a Corpo Mordida +29 (4d10+20, 18) e duas garras +29 (3d10+20, 18).
Magias Como um clérigo de Lin-Wu de 10º nível (CD 32).
• Coluna de Chamas (Padrão, 10 PM) Um cilindro com 3m de raio e 30m de altura desce dos céus em um ponto em alcance longo, causando 8d6 pontos de dano de fogo mais 8d6 pontos de dano de luz nas criaturas e objetos livres na área (Ref reduz à metade).
• Curar Ferimentos (Padrão, 10 PM) Uma criatura adjacente cura 11d8+11 PV ou criaturas escolhidas em alcance curto curam 6d8+6.
• Dissipar Magia (Padrão, 3 PM) O dragão escolhe uma criatura, objeto ou esfera de 3m em alcance médio e faz um teste de Misticismo. Todas as magias nesse alvo com CD igual ou menor que o resultado do teste são dissipadas.
• Escudo da Fé (Reação, 8 PM) Quando uma criatura em alcance curto sofre sofre um ataque, ela recebe camuflagem leve contra ataques à distância e +5 na Defesa por 1 turno.
• Santuário (Padrão, 10 PM) O dragão toca uma criatura. Até o fim da cena, ou até que essa criatura faça uma ação hostil, qualquer criatura que tente fazer uma ação hostil contra ela, ou contra uma área que a inclui, perde a ação (Von evita).
For 9, Des 2, Con 8, Int 4, Sab 5, Car 4
Perícias Conhecimento +15, Diplomacia +15, Intuição +16, Misticismo +15, Religião +16.
Tesouro Dobro.`
        },
        {
          chave: "dragaoCelestialAdulto", nome: "Dragão Celestial Adulto", nd: "15", tipo: "Espírito Enorme",
          papel: '',
          subgrupo: "Dragão Celestial",
          resumo: "Dragão Celestial — A grande forma escamada e colorida lembra um dragão — e realmente é, mas também algo diferente.",
          texto:
`Dragão Celestial Adulto ND 15
Espírito Enorme
Iniciativa +16, Percepção +24, percepção às cegas (médio), visão no escuro
Defesa 50, Fort +24, Ref +15, Von +28, imunidade a eletricidade, redução de dano 10, resistência a magia +3, vulnerabilidade a ácido
Pontos de Vida 825
Deslocamento 12m (8q), voo 36m (24q)
Pontos de Mana 108
Corpo a Corpo Mordida +42 (4d10+30, 18) e duas garras +42 (3d10+30, 18).
Magia Acelerada (livre, +4 PM) Uma vez por rodada, quando lança uma magia com execução de ação completa ou menor, o dragão celestial muda a execução dela para livre.
Presença Celestial Vontade CD 42 evita.
Magias Como um clérigo de Lin-Wu de 15º nível (CD 42, limite de PM 23).
• Coluna de Chamas (Padrão, 18 PM) Um cilindro com 3m de raio desce dos céus em um ponto em alcance longo, causando 12d6 pontos de dano de fogo mais 12d6 pontos de dano de luz (Ref reduz à metade).
• Curar Ferimentos (Padrão, 15 PM) Uma criatura adjacente cura 16d8+16 PV ou criaturas escolhidas em alcance curto curam 11d8+11.
• Dissipar Magia (Padrão, 3 PM) O dragão escolhe uma criatura, objeto ou esfera de 3m em alcance médio e faz um teste de Misticismo. Todas as magias nesse alvo com CD igual ou menor que o resultado do teste são dissipadas.
• Escudo da Fé (Padrão, 17 PM) O dragão recebe camuflagem leve contra ataques à distância e +8 na Defesa por 1 dia.
• Santuário (Padrão, 10 PM) O dragão toca uma criatura. Até o fim da cena, ou até que essa criatura faça uma ação hostil, qualquer criatura que tente fazer uma ação hostil contra ela, ou contra uma área que a inclui, perde a ação (Von evita).
• Viagem Planar (Padrão, 12 PM) O dragão e até 5 criaturas voluntárias que ele esteja tocando viajam para outro Plano.
For 12, Des 2, Con 8, Int 6, Sab 7, Car 6
Perícias Conhecimento +22, Diplomacia +22, Intuição +23, Misticismo +22, Religião +23.
Tesouro Dobro.`
        },
        {
          chave: "dragaoCelestialVeneravel", nome: "Dragão Celestial Venerável", nd: "20", tipo: "Espírito Enorme",
          papel: '',
          subgrupo: "Dragão Celestial",
          resumo: "Dragão Celestial — A grande forma escamada e colorida lembra um dragão — e realmente é, mas também algo diferente.",
          texto:
`Dragão Celestial Venerável ND 20
Espírito Enorme
Iniciativa +20, Percepção +28, percepção às cegas (longo), visão no escuro
Defesa 60, Fort +28, Ref +21, Von +34, imunidade a eletricidade, redução de dano 20, resistência a magia +4, vulnerabilidade a ácido
Pontos de Vida 1.300
Deslocamento 12m (8q), voo 48m (32q)
Pontos de Mana 143
Corpo a Corpo Mordida +52 (8d12+45, 18) e duas garras +52 (8d12+45, 18).
Bombardeio Celestial (Completa) O dragão celestial cria 6 esferas de essência que ficam flutuando ao seu redor até o fim da cena. Uma vez por rodada, ele pode gastar uma ação de movimento para disparar uma dessas esferas em uma criatura em alcance longo; o alvo sofre 12d6 pontos de dano de essência e é empurrado 6m na direção oposta (Fort CD 49 evita o empurrão). Uma vez por rodada, quando é alvo de um ataque ou habilidade, o dragão pode disparar uma dessas esferas contra o atacante.
Magia Acelerada (livre, +4 PM) Uma vez por rodada, quando lança uma magia com execução de ação completa ou menor, o dragão celestial muda a execução dela para livre.
Presença Celestial Vontade CD 49 evita.
Sopro (Padrão) Todas as criaturas em um cone de 18m sofrem 20d12 pontos de dano de eletricidade e ficam ofuscadas por 1d4 rodadas (Ref CD 49 reduz à metade e evita a condição). Recarga (movimento).
Magias Como um clérigo de Lin-Wu de 20º nível (CD 49, limite de PM 30).
• Aura Divina (Padrão, 19 PM) O dragão celestial emana uma aura brilhante com 9m de raio até o fim da cena. O dragão e aliados devotos de Lin-Wu na área ficam imunes a encantamento e recebem +12 na Defesa e em testes de resistência (para aliados não devotos de Lin-Wu esse bônus é +7). Inimigos que entrem na área devem fazer um teste de Vontade; em caso de falha, recebem uma condição entre esmorecido, debilitado ou lento até o fim da cena. Esse teste deve ser repetido cada vez que a criatura entra novamente na área.
• Curar Ferimentos (Padrão, 15 PM) Uma criatura adjacente cura 16d8+16 PV ou criaturas escolhidas em alcance curto curam 11d8+11.
• Dissipar Magia (Padrão, 3 PM) O dragão escolhe uma criatura, objeto ou esfera de 3m em alcance médio e faz um teste de Misticismo. Todas as magias nesse alvo com CD igual ou menor que o resultado do teste são dissipadas.
• Escudo da Fé (Padrão, 25 PM) O dragão recebe camuflagem leve contra ataques à distância e +12 na Defesa por 1 dia.
• Intervenção Divina (Padrão, 15 PM) O dragão pede para Lin-Wu interceder diretamente. Pode curar todos os PV e condições de até 10 criaturas em alcance longo (este efeito cura mortos-vivos, em vez de causar dano), dissipar os efeitos de qualquer magia de 4º círculo ou menor ou algo ainda mais poderoso (nesse caso, exige o sacrifício de 2 PM).
• Katana Celestial ( Padrão, 24 PM) O dragão projeta quatro linhas de 30m cada em direções opostas, formando um “X” a partir dele. Criaturas nessas áreas sofrem 14d8 pontos de dano de luz (ou 14d12, se forem mortos-vivos) e ficam cegas e surdas até o fim da cena (Ref reduz à metade e evita as condições).
• Missão Divina (Padrão, 8 PM e penalidade de –1 PM) O dragão inscreve uma marca permanente em uma criatura adjacente. Sempre que o alvo fizer uma ação contrária às obrigações e restrições de Lin-Wu, recebe uma penalidade cumulativa de –2 em todos os testes (Von evita). Uma magia que dissipe outras suprime a marca e suas penalidades por um dia; elas só podem ser totalmente removidas pelo dragão ou pela magia Purificação.
• Santuário (Padrão, 10 PM) O dragão toca uma criatura. Até o fim da cena, ou até que essa criatura faça uma ação hostil, qualquer criatura que tente fazer uma ação hostil contra ela, ou contra uma área que a inclui, perde a ação (Von evita).
• Viagem Planar (Padrão, 12 PM) O dragão e até 5 criaturas voluntárias que ele esteja tocando viajam para outro Plano.
For 15, Des 2, Con 10, Int 6, Sab 10, Car 7
Perícias Conhecimento +25, Diplomacia +27, Intuição +29, Misticismo +25, Religião +29.
Tesouro Dobro.`
        },
      ],
      regras: [
        { titulo: "Kabuto",
          texto:
`“Seu bichinho é adorável, criança. Mas não me serve como montaria. Preciso de um maior.”
— Zeebernkai, sulfure guerreiro
Um olhar apressado sugere que a grande besta-inseto seja alguma aberração da Tormenta. No entanto, por estranho que pareça, o robusto besouro negro com chifres enormes age como um animal natural. Estes grandes besouros não apenas são parte da fauna nativa de Tamu-ra, mas também são muito amados por seu povo. Tanto que alguns começam a ser trazidos para o Reinado. Existem kabuto de tamanhos e formatos variados. Em comum, todos possuem impressionantes galhadas usadas como chifres em investidas, ou como pinças para agarrar e cortar. Esse armamento terrível e o corpo blindado podem assustar, mas na verdade os bichos são herbívoros pacíficos, lutando apenas em autodefesa. Podem ser facilmente domesticados para uma variedade de tarefas; embora não sejam muito espertos, aprendem a reconhecer o dono e obedecer a comandos simples. Na natureza, os kabuto duelam por liderança ou fêmeas. Embora impressionantes de ver, tais embates raramente terminam em ferimentos sérios, cada lutador apenas usando a galhada para derrubar o adversário de costas. Todos os kabuto podem voar, mas de modo lento e desajeitado.
Os menores kabuto, do tamanho de ratos (chibi-kabuto), são populares como bichos de estimação ou familiares. Crianças de Tamu-ra colocam seus besouros para lutar em “torneios”. No entanto, eles também podem ser treinados (ou encantados) para entrar em lugares protegidos e roubar itens, ou assassinar vítimas adormecidas com veneno ministrado em suas pinças.
Aqueles um pouco maiores (ko-kabuto) são ensinados a proteger plantações contra pragas e invasores, como cães de guarda. Podem ser perigosos em estado selvagem, atacando em bandos. Quanto aos maiores, grandes e massivos como rinocerontes (dai-kabuto), são muito apreciados como bestas de carga e montaria. Derrubam ou imobilizam um oponente com as poderosas mandíbulas, deixando-o vulnerável aos ataques do cavaleiro.` },
        { titulo: "Kaijin",
          texto:
`“Você tem a mácula. Ainda assim, sinto honra em você.
Por Lin-Wu, como isso é possível?”
— Kanemi Hino, Alta-Magistrada Imperial
O monstro aberrante é, obviamente, um demônio da Tormenta — mas algo parece diferente. É monstruoso, mas também humanoide. Tem um braço em forma de garra imensa, mas no outro há uma mão. A carapaça é insetoide e horrenda, mas também lembra a armadura de um samurai tamuraniano. É um homem-monstro perigoso, por certo; ainda assim, parece existir algo humano nele. Kaijin é como os meios-demônios da Tormenta são chamados em Tamu-ra. No entanto, uma vez que sua terra foi corrompida pela tempestade por tantos anos, estes seres são ainda mais fortes e monstruosos. Diferente dos lefou, poucos kaijin apresentam traços humanos. Seus corpos são revestidos de verrugas, couro, pelagem ou carapaça. Seus rostos são amontoados de crostas, olhos, presas, quelíceras e antenas. Braços e pernas são longos ou curtos demais, ou dobram-se em lugares errados. Suas mãos podem ser garras, pinças ou tentáculos. Espinhos e lâminas projetam-se de todas as partes. Exceto por manter uma estrutura humanoide básica (cabeça, tronco, dois braços, duas pernas), são pouco diferentes de outros lefeu. Quase todos os kaijin são criaturas selvagens, insanas, amaldiçoadas, pouco ou nada restando de sua alma humana. Ainda que alguns demonstrem inteligência cruel, são cheios de ódio pelo que se tornaram, com o único propósito de causar morte e sofrimento. São os vilões monstruosos que surgem regularmente com intenções de “destruir a humanidade”. Kaijin normalmente agem sozinhos — pois sua reação natural, ao encontrar outro kaijin, é lutar até a morte. Os mais fortes e espertos conseguem comandar capangas, ou até mesmo ninjas, para executar seus loucos planos de vingança contra o mundo.` },
        { titulo: "Kappa",
          texto:
`“Mas essa postura de luta… será isso algum tipo de… tartaruga ninja?”
— Yellsew Sadlac, qareen bucaneiro
Os estranhos seres aquáticos têm o aspecto de tartarugas bípedes, com faces reptilianas, olhos redondos e vermelhos, escamas verde-amareladas e uma grande carapaça às costas. Têm pés com três dedos e mãos com quatro. Seus movimentos demonstram ser mais rápidos e ágeis do que sugere o parentesco animal. Demônio aquático tamuraniano, o kappa começou a surgir também em vários outros pontos de Arton — sobretudo rios e lagos nas proximidades de aldeias onde vivem nativos de Tamu-ra ou devotos de Lin-Wu. É como se estivessem perdidos e buscando alguma proximidade com o antigo lar — mas ao mesmo tempo são orgulhosos e arrogantes demais para admitir isso. Talvez o traço mais curioso sobre os kappa seja a depressão que trazem no alto da cabeça, como uma tigela ou vasilha, contendo um pouco d’água. Se essa água é derramada, o kappa fica enfraquecido. Tal façanha, no entanto, não é simples: por sua extrema agilidade, um kappa consegue manter a depressão sempre cheia, mesmo enquanto luta. De fato, estes seres são artistas marciais exímios. Embora não sejam extremamente cruéis, kappa são pouco honrados e muito inquietos. É possível negociar com eles usando de diplomacia e paciência, com muito cuidado para não os aborrecer. Quando cooperativos, podem prover informações importantes sobre a região. Caso se enfureça, contudo, um kappa ataca e tenta afogar seus inimigos, derrubando-os e segurando-os sob a água com manobras de artes marciais.` },
        { titulo: "Mashin",
          texto:
`“Quanta honra, ser danificado em combate contra inimigos do Império!”
— Makoto Tsume, mashin samurai
À primeira vista, lembra um ser humano esbelto em armadura metálica, ou uma estátua de manufatura sofisticada. A cabeça parece um elmo fechado, sem rosto, com gemas luzindo como olhos. Placas metálicas em formas elegantes deslizam sobre o corpo com precisão impecável, deixando entrever uma musculatura interna de fibras mágicas sedosas, milimetricamente trançadas. Gravuras e ideogramas grafados no metal brilham e lampejam com a energia elemental interior. Golens vivos não são raros em Arton. O Império de Jade, no entanto, sempre contou com os mais extraordinários e talentosos artífices, capazes de produzir engenhos mecânicos inimagináveis no Reinado. E, embora grande parte dessa arte tenha se perdido com a destruição de Tamu-ra, ainda existem construtos remanescentes daqueles tempos, bem como novas gerações de inventores buscando recriar as antigas técnicas. Mashin são golens de origem tamuraniana, tão belos que são considerados obras de arte, tão sofisticados que igualam os humanos em qualquer tarefa. Todos têm inteligência, vontade própria e são reconhecidos como cidadãos no Império de Jade. Servem a clãs da nobreza, ajudam na reconstrução de Tamu-ra ou se aventuram em Arton por razões pessoais. Mashin foram criados para viver em sociedade. São educados, respeitosos e corteses, mesmo com inimigos. Quase todos são honrados — não por serem feitos assim, mas por influência da cultura tamuraniana. Demonstram senso de dever, dignidade e nobreza. Mas, conforme sua criação e experiências, a mente elemental pode adotar qualquer moral ou ética, não sendo incomum que alguns se tornem trapaceiros, cruéis ou até loucos.` },
        { titulo: "Nezumi",
          texto:
`“Homens-ratos? Saqueando nas estradas? Mas era o que me faltava!”
— George Ruud, prefeito de Nova Malpetrim
Os recém-chegados podem ser facilmente descritos como pessoas-ratos. Seres de pelagem cinzenta com grandes orelhas, focinhos alongados, olhos vermelhos e garras ameaçadoras. Quase todos têm cicatrizes e pedaços das orelhas e caudas faltando. Embora pequenos, parecem perigosos, prontos a explodir em fúria e arrancar os olhos de seus inimigos. No passado, o perigoso povo-rato estava entre as maiores ameaças ao Império de Jade. Ambos, humanos e nezumi, acreditavam ser os legítimos donos da ilha. Viviam em guerra contra os “invasores”, tentavam expulsá-los de todas as formas. Hoje, após sobreviverem aos horrores da Tormenta, os antigos inimigos buscam colocar de lado as diferenças para reconstruir Tamu-ra. Nezumi tratam outros povos como inimigos, mas sem necessariamente odiá-los. Sob seu estranho ponto de vista, considerar alguém “inimigo” é mostrar respeito, reconhecer sua força. Para os nezumi, inimigos são valiosos, dão significado ao mundo. Uma vida sem adversários é uma vida vazia, é apenas esperar pela temível morte por velhice ou doença. Na cultura nezumi, se você não tem um inimigo, também não tem valor. Bandos nezumi que desprezam a honra e a paz têm sido vistos abandonando Tamu-ra para se estabelecer no Reinado, tornando-se assaltantes ou mercenários.` },
        { titulo: "Oni",
          texto:
`“Demônio sórdido! Nem seus insultos, nem sua violência podem salvá-lo hoje!”
— Hajirou Nagashi, samurai executor
Os humanoides imensos e abrutalhados são muito parecidos com ogros, mas há diferenças óbvias — sendo a mais marcante sua pele azulada ou avermelhada. Também têm cabelos negros, lisos e compridos, e um par de chifres longos. Vestem armaduras de placas sobrepostas e empunham machados de batalha. Oni são demônios que assolam Tamu-ra, mas também podem surgir em Arton. Originários de outros mundos, chegam aqui com objetivos variados — mas sempre envolvendo atos malignos. Também existem oni nascidos das maldades cometidas em Arton: quanto pior o crime, mais poderoso o demônio. E, enquanto houver mal no mundo, oni sempre vão ressurgir. Estes seres maléficos são opostos à honra, praticamente incapazes de realizar um ato digno. Qualquer coisa que digam é insulto, provocação ou mentira. Lutam sujo, fazendo emboscadas, causando distrações, atacando pelas costas. Oni podem ser invocados praticando atos extremamente malignos ou rituais específicos, mas apenas magias avançadas podem mantê-los sob controle. No passado, em seu desespero, conjuradores tamuranianos chegaram a invocar bandos de oni para lutar contra a Tormenta. Aqueles que não foram destruídos apenas abraçaram a corrupção, juntando-se às forças invasoras.` },
        { titulo: "Tengu",
          texto:
`“Como essas coisas-corvos estridentes conseguem lutar tão BEM?”
— Sigmund Egill, humano guerreiro
O vulto humanoide é escuro como a noite, todo coberto de penas profundamente negras. Tem cabeça de corvo e grandes asas às costas. Usa armadura tamuraniana tradicional e empunha uma bela espada katana. A postura é ereta e confiante, até mesmo digna, em oposição ao aspecto animalesco. Este povo alado de homens-corvos é formado por guerreiros habilidosos, orgulhosos de suas técnicas. Eram honrados no passado, mas os horrores da Tormenta talvez tenham sido demasiados para eles. Hoje atuam como bandoleiros, atacando viajantes e vilarejos. No entanto, por preferirem usar as melhores armas e armaduras, seus alvos favoritos são guerreiros e cavaleiros bem equipados, que os tengu enfrentam sem nenhum temor — alguns deles até mesmo buscando novos desafios longe de Tamu-ra. É o chamado Caminho do Céu, parte da cultura tengu: viajar pelos céus de forma nômade em busca de novidades e vivências. Quase todos os tengu empunham boas espadas, mas alguns lutam desarmados. Derrotar um tengu não é façanha simples; muitos guerreiros sonham em vencer tal duelo, acreditando ser o melhor teste para suas habilidades (e também um meio de conseguir boas armas). Alguns bandos tengu são liderados por um daitengu, mais poderoso e capaz de conjurar magias.` },
        { titulo: "Dragão Celestial",
          texto:
`“Poupe-os, meu senhor Lin-Wu, eu imploro. Poupe sua gente. A honra vai guiá-los. A honra vai salvá-los.”
— Tekametsu, dragão celestial
A grande forma escamada e colorida lembra um dragão — e realmente é, mas também algo diferente. Muito mais alongado, como uma imensa serpente. Ostenta uma juba brilhante, alaranjada, de onde emergem galhadas. Tem barbatanas de peixe, mas grandes como velas de juncos. Mesmo sem asas, voa de forma harmoniosa, serpenteante, como que nadando no ar. Em outros lugares de Arton, dragões são grandes lagartos cuspidores de fogo, plenos de força elemental. O dragão de Tamu-ra, no entanto, é um espírito. Moldado à imagem e semelhança de Lin-Wu, está entre os mais antigos e poderosos seres espirituais na existência. Acredita-se que o próprio Imperador Tekametsu, regente supremo de Tamu-ra, seria na verdade um dragão celestial. Nem todos os dragões celestiais têm sopro de chamas ou outras energias — na verdade, pouquíssimos compartilham dessa temida habilidade dos dragões do continente. Seu verdadeiro poder está na vasta capacidade espiritual, que alimenta magias impressionantes. Dragões celestiais podem executar um grande número de magias por simples vontade — isso sem mencionar suas terríveis garras e mandíbulas. Mesmo com todo o seu poder, os dragões celestiais foram forçados a buscar refúgio no Reino de Lin-Wu durante o ataque da Tormenta. Ali eles permaneceram, manifestando-se no mundo material apenas em momentos críticos, geralmente para ajudar tamuranianos honrados em momentos de necessidade. Hoje, avistamentos desses dragões têm sido relatados, mas ainda são eventos raros. Embora estejam entre os seres mais honrados da Criação, dragões celestiais estão longe de ser inofensivos. Em seu papel como mantenedores da honra, lei e ordem, são intolerantes com o crime e o mal. Mesmo heróis aventureiros podem ser alvo de sua ira: antes de decidir ajudar (ou poupar) um grupo, é possível que o dragão exija uma provação de honra.` },
        { titulo: "Habilidades de Dragões Celestiais",
          texto:
`• Imunidades. Imunidade a efeitos de atordoamento, medo, metabolismo, metamorfose e paralisia.
• Magia Celestial. Podem lançar magias sem palavras mágicas, gestos, concentração ou componentes materiais.
• Metamorfose Celestial (Completa). Podem se transformar em outras criaturas, como a magia Metamorfose (mas sem limitação para tamanhos menores que o seu). Dragões curiosos usam esta habilidade para se misturar nas sociedades humanoides e aprender sobre seus costumes. Um dragão morto reverte à sua forma original.
• Presença Celestial. A mera visão de um dragão celestial adulto ou mais velho pode fascinar ou amedrontar. Uma criatura que comece seu turno em alcance longo do dragão fica apavorada (se tiver 4 níveis ou menos) ou abalada (se tiver 5 níveis ou mais) até o fim da cena. Criaturas com um código de conduta (como cavaleiros e paladinos) ou devotos de Khalmyr ou Lin-Wu em vez disso ficam fascinados, independente de seu nível (Von evita em todos os casos). Uma criatura que passe no teste de resistência fica imune a esta habilidade por um dia.` },
      ],
    },

    // ── 🐂 IMPÉRIO DE TAURON ───────────────────────────
    {
      chave: "tauron", nome: "Império de Tauron", icone: "🐂", cor: "#6a3a2f",
      intro: "Após a morte de sua divindade maior, o outrora glorioso império dos minotauros está destroçado, decadente. Boa parte da soberania conquistada durante as Guerras Táuricas se foi. Jazendo em meio à capital, o cadáver descomunal de Tauron impede que a Tormenta destrua Tapista, mas é também uma lembrança trágica para seu povo. Um golpe em seu orgulho e uma lição de humildade para todo o sempre. É verdade que muitos minotauros mudaram seus modos. Outros, contudo, seguem apegados ao deplorável passado de tirania e escravidão. Em meio à turbulência do império fragmentado, governadores corruptos e déspotas cruéis fazem as próprias leis em seus feudos. O tráfico escravista segue ativo, clandestino. Gladiadores sem glória ganham a vida como mercenários. Legionários enlouquecidos pela Tormenta vagam pelas estradas arruinadas, atacando tudo que encontram. Não bastasse o caos em seu próprio território, a tragédia dos minotauros se derrama sobre o restante de Arton — onde vítimas são capturadas como novos escravos para os tiranos, e desertores rondam os ermos saqueando e pilhando como bandidos comuns.",
      fichas: [
        {
          chave: "arqueiroEscravo", nome: "Arqueiro Escravo", nd: "5", tipo: "Humanoide (elfo) Médio",
          papel: '',
          resumo: "É uma visão estranha, perturbadora.",
          texto:
`Arqueiro Escravo ND 5
“Vocês são a mais absoluta vergonha para Lenórienn! E agora vão pagar!”
— Valhaha, elfo caçador
É uma visão estranha, perturbadora. Uma elfa trajando a armadura segmentada tapistana. Ela não traz o olhar derrotado dos escravos; em vez disso, parece resoluta em servir às legiões enquanto coloca uma nova flecha no arco.
Quando a Deusa dos Elfos se entregou como escrava a Tauron, buscando sua proteção, muitos elfos sobreviventes à queda de Lenórienn seguiram seu exemplo. Procurando a melhor forma de servir a seus novos mestres, aprenderam logo que minotauros acham desonrado usar quaisquer armas de ataque à distância. Assim, os elfos tomaram para si mesmos esse fardo “indigno”, ao mesmo tempo preservando suas próprias tradições de arquearia. Acabariam se tornando uma espécie de força de elite dentro das legiões — isto é, até onde guerreiros escravizados podiam ser considerados dessa forma. A traição de sua antiga deusa sobre Tauron reforçou a convicção dos arqueiros escravos — quase como se também fossem responsáveis pela deslealdade de Glórienn. Tornaram-se fanáticos, dispostos a dedicar e sacrificar suas vidas para pagar essa dívida de honra. Sem muita surpresa, esses arqueiros são considerados traidores pelos demais elfos. Restam poucos destes arqueiros no Império. São designados para acompanhar legionários em missões importantes, provendo suporte à infantaria.
Humanoide (elfo) Médio
Iniciativa +12, Percepção +7, visão na penumbra
Defesa 24, Fort +6, Ref +16, Von +11
Pontos de Vida 36
Deslocamento 12m (8q)
À Distância Arco longo x2 +21 (2d6+15, x3).
Disparo Preciso O arqueiro escravo faz ataques à distância contra oponentes envolvidos em combate corpo a corpo sem sofrer a penalidade de –5 no teste de ataque.
Flecha Amiga (Reação) Uma vez por rodada, quando um aliado em alcance médio ataca um inimigo, o arqueiro escravo faz um ataque de arco longo contra esse mesmo inimigo.
Minha Vida Pela Legião (Reação) Uma vez por rodada, quando um aliado adjacente ao arqueiro escravo é atingido por um efeito que causa dano, o arqueiro sofre esse dano no lugar do aliado.
For –1, Des 5, Con 1, Int 2, Sab 0, Car –1
Equipamento Arco longo, couraça, flechas x20. Tesouro Nenhum.`
        },
        {
          chave: "centuriao", nome: "Centurião", nd: "3", tipo: "Humanoide (minotauro) Médio",
          papel: '',
          subgrupo: "Centurião",
          resumo: "Centurião — Ainda que as legiões pareçam formadas por soldados absolutamente iguais, com as mesmas armaduras, lanças e escudos, um deles se adianta.",
          texto:
`Centurião ND 3
Humanoide (minotauro) Médio
Iniciativa +4, Percepção +2, faro
Defesa 23, Fort +15, Ref +4, Von +8
Pontos de Vida 100
Deslocamento 6m (4q)
Corpo a Corpo Gládio +14 (1d6+5, 19/x3) e chifres +14 (1d6+5).
À Distância Azagaia +10 (1d6+5).
Coordenar Ataque (Movimento) O centurião coordena os ataques de uma falange da qual esteja participando. Até o próximo turno do centurião, sempre que um participante da falange fizer um ataque, pode rolar dois dados e usar o melhor resultado.
Falange (Movimento) Se o centurião estiver usando um escudo e adjacente a um aliado com esta habilidade, pode formar uma falange com esse aliado. Enquanto estiverem adjacentes um ao outro, os participantes da falange recebem +2 na Defesa e em testes de resistência.
Ordens (Movimento) O centurião grita ordens para seus aliados em alcance médio. Eles recebem +2 em testes de perícia até o fim da cena.
For 5, Des 0, Con 4, Int 2, Sab 0, Car 0
Perícias Atletismo +10, Guerra +7.
Equipamento Azagaia x3, escudo pesado, gládio certeiro, loriga segmentada. Tesouro Padrão.`
        },
        {
          chave: "centuriaoDeElite", nome: "Centurião de Elite", nd: "7", tipo: "Humanoide (minotauro) Médio",
          papel: '',
          subgrupo: "Centurião",
          resumo: "Centurião — Ainda que as legiões pareçam formadas por soldados absolutamente iguais, com as mesmas armaduras, lanças e escudos, um deles se adianta.",
          texto:
`Centurião de Elite ND 7
Humanoide (minotauro) Médio
Iniciativa +9, Percepção +9, faro
Defesa 32, Fort +20, Ref +8, Von +13, imunidade a encantamento, redução de dano 5
Pontos de Vida 250
Deslocamento 6m (4q)
Corpo a Corpo Gládio +23 (2d8+16, 19/x3) e chifres +23 (2d6+16).
À Distância Azagaia +23 (1d6+14).
Coordenar Ataque (Movimento) O centurião de elite coordena os ataques de uma falange da qual esteja participando. Até o próximo turno do centurião, sempre que um participante da falange fizer um ataque, pode rolar dois dados e usar o melhor resultado.
É Proibido Morrer Aliados em alcance médio do centurião recebem RD 5.
Falange (Movimento) Se o centurião estiver usando um escudo e adjacente a um aliado com esta habilidade, pode formar uma falange com esse aliado. Enquanto estiverem adjacentes um ao outro, os participantes da falange recebem +2 na Defesa e em testes de resistência.
Ordens (Movimento) O centurião grita ordens para seus aliados em alcance médio. Eles recebem +2 em testes de perícia até o fim da cena.
For 6, Des 0, Con 5, Int 3, Sab 0, Car 1
Perícias Atletismo +15, Guerra +12.
Equipamento Azagaia x3, escudo pesado, gládio certeiro, loriga segmentada reforçada. Tesouro Dobro.`
        },
        {
          chave: "furiaDeTauron", nome: "Fúria de Tauron", nd: "4", tipo: "Morto-vivo Pequeno",
          papel: '',
          subgrupo: "Fúria de Tauron",
          resumo: "Fúria de Tauron — A aparição flutuante tem o aspecto de um crânio bovino envolto em chamas macabras, espectrais.",
          texto:
`Fúria de Tauron ND 4
Morto-vivo Pequeno
Iniciativa +14, Percepção +5, visão no escuro
Defesa 20, Fort +8, Ref +15, Von +4, incorpóreo, vulnerabilidade a frio
Pontos de Vida 30
Deslocamento voo 12m (8q)
Corpo a Corpo Chifres espectrais +15 (2d8+7 fogo mais 2d8+7 trevas).
Chamas Espectrais Os chifres espectrais da fúria de Tauron contam como uma arma mágica. Além disso, uma criatura viva atingida pelos chifres fica desprevenida por 1 rodada e em chamas (Fort CD 20 evita).
Debandada Flamejante (Completa) A fúria percorre até o dobro do seu deslocamento em linha reta, golpeando todas as criaturas em seu caminho. Ela faz um único teste de ataque de seus chifres espectrais e compara com a Defesa de cada criatura nos espaços por onde passou.
Apagar a Chama Quando sofre dano de frio, a fúria fica debilitada e lenta por 1 rodada.
For –, Des 5, Con 2, Int –1, Sab 1, Car 3
Tesouro Nenhum.`
        },
        {
          chave: "estouroDeFuriasDeTauron", nome: "Estouro de Fúrias de Tauron", nd: "8", tipo: "Morto-vivo Médio",
          papel: '',
          subgrupo: "Fúria de Tauron",
          resumo: "Fúria de Tauron — A aparição flutuante tem o aspecto de um crânio bovino envolto em chamas macabras, espectrais.",
          texto:
`Estouro de Fúrias de Tauron ND 8
Morto-vivo Médio
Iniciativa +16, Percepção +7, visão no escuro
Defesa 30, Fort +15, Ref +19, Von +10, incorpóreo, vulnerabilidade a frio
Pontos de Vida 76
Deslocamento voo 12m (8q)
Corpo a Corpo [Bando] Chifres espectrais +27 (4d8+14 fogo mais 4d8+14 trevas).
Chamas Espectrais Os chifres espectrais do estouro de fúrias de Tauron contam como uma arma mágica. Além disso, uma criatura viva atingida pelos chifres fica desprevenida por 1 rodada e em chamas (Fort CD 28 evita).
Debandada Flamejante (Completa) O estouro percorre até o dobro do seu deslocamento em linha reta, golpeando todas as criaturas em seu caminho. Ele faz um único teste de ataque de seus chifres espectrais e compara com a Defesa de cada criatura nos espaços por onde passou.
Apagar a Chama Quando sofre dano de frio, o estouro fica debilitado e lento por 1 rodada.
For –, Des 5, Con 2, Int –1, Sab 1, Car 3
Tesouro Nenhum.`
        },
        {
          chave: "gladiadorTaurico", nome: "Gladiador Táurico", nd: "10", tipo: "Humanoide (minotauro) Médio",
          papel: '',
          resumo: "É um guerreiro minotauro, mas claramente não um legionário.",
          texto:
`Gladiador Táurico ND 10
“Meu braço? Amputado? Bobagem, foi só um golpe de sorte e um arranhão!”
— Firion Liantar, elfo bucaneiro
É um guerreiro minotauro, mas claramente não um legionário. A armadura é elegante, mas sumária, exibindo muito da musculatura oleada. O elmo fechado e ornamentado deixa expostos apenas os chifres. Traz um tridente dourado em uma mão e uma rede na outra. Combates de arena são entretenimento popular em quase todas as grandes cidades de Arton, mas nenhum povo levou esse esporte a patamares tão elevados quanto os minotauros. Mesmo após a destruição da capital, o Coliseu de Tiberus permanece até hoje como o maior anfiteatro de jogos no mundo conhecido. Com a nação tapistana arruinada, imersa em miséria e pesadelo, entreter as massas é mais importante do que nunca. Lutador profissional de elite, o gladiador é um artista, mas também um duelista de habilidade extrema. Ainda que muitos combates de arena sejam encenações, ele é um mestre das acrobacias, esquivas e fintas. Sabe manejar suas armas para causar ferimentos superficiais ou profundos. Em vez das espadas e lanças comuns das legiões, escolhe as armas mais impressionantes e exóticas. Nem todos os gladiadores são minotauros, e nem todos aqueles de outras raças são escravos. Para manter o interesse do público, agenciadores de Tiberus vasculham o Reinado em busca de combatentes hábeis e exóticos, com propostas lucrativas (ou, em casos extremos, sua captura). O oposto também ocorre — muitos gladiadores abandonaram a decadente Tapista para atuar em outras arenas, ou como guerreiros de aluguel.
Humanoide (minotauro) Médio
Iniciativa +12, Percepção +9, faro
Defesa 34, Fort +20, Ref +16, Von +12, imunidade a medo, redução de dano 5
Pontos de Vida 390
Deslocamento 9m (6q)
Corpo a Corpo Tridente +29 (2d8+18), chifres +29 (2d6+18).
À Distância Rede +29 (enredar, veja Tormenta20, p. 150).
Agitar a Torcida (Movimento) O gladiador táurico faz um teste de Atuação e recebe uma quantidade de PV temporários igual ao resultado. Recarga (usar Estilo Espetacular e Sangue e Areia contra o mesmo inimigo).
Estilo Espetacular (Completa) O gladiador ataca uma criatura com o tridente, o chifre e a rede. Se acertar o ataque de rede e enredar o alvo, pode fazer um ataque adicional de tridente contra ele.
Sangue e Areia Quando acerta um ataque de tridente em um inimigo enredado por sua rede, o gladiador deixa a vítima sangrando.
For 4, Des 1, Con 3, Int 0, Sab 0, Car 4
Perícias Atletismo +15, Atuação +15, Intimidação +15.
Equipamento Couraça, rede, tridente cruel e equilibrado. Tesouro Padrão.`
        },
        {
          chave: "legionario", nome: "Legionário", nd: "1", tipo: "Humanoide (minotauro) Médio",
          papel: '',
          subgrupo: "Legionário",
          resumo: "Legionário — Alto e sólido como um muro, envergando uma orgulhosa loriga segmentada, o soldado minotauro avança empunhando lança e escudo.",
          texto:
`Legionário ND 1
Humanoide (minotauro) Médio
Iniciativa +3, Percepção +1, faro
Defesa 19, Fort +10, Ref +2, Von +4
Pontos de Vida 12
Deslocamento 6m (4q)
Corpo a Corpo Gládio +10 (1d6+5, 19/x3) e chifres +10 (1d6+5).
À Distância Azagaia +10 (1d6+5).
Falange (Movimento) Se o legionário estiver usando um escudo e adjacente a um aliado com esta habilidade, pode formar uma falange com esse aliado. Enquanto estiverem adjacentes um ao outro, os participantes da falange recebem +2 na Defesa e em testes de resistência.
Medo de Altura Se estiver adjacente a uma queda de 3m ou mais de altura (como um buraco ou penhasco), o legionário fica abalado.
For 4, Des 0, Con 3, Int 1, Sab –1, Car 0
Equipamento Azagaia x3, escudo pesado, gládio, loriga segmentada. Tesouro Metade.`
        },
        {
          chave: "decuria", nome: "Decúria", nd: "5", tipo: "Humanoide (minotauro) Grande",
          papel: '',
          subgrupo: "Legionário",
          resumo: "Legionário — Alto e sólido como um muro, envergando uma orgulhosa loriga segmentada, o soldado minotauro avança empunhando lança e escudo.",
          texto:
`Decúria ND 5
Humanoide (minotauro) Grande
Iniciativa +5, Percepção +3, faro
Defesa 22, Fort +12, Ref +4, Von +6
Pontos de Vida 60
Deslocamento 6m (4q)
Corpo a Corpo [Bando] Gládio +20 (2d6+10, 19/x3) e chifres +20 (2d6+10).
À Distância [Bando] Azagaia +20 (2d6+10).
Disciplina Militar Quando usa a ação agredir sob efeito da habilidade Ordens (veja Centurião), a decúria pode fazer um ataque adicional de gládio.
Falange (Movimento) A decúria assume uma formação defensiva. Enquanto tiver pelo menos metade de seus PV, ela recebe +2 na Defesa e em testes de resistência.
Medo de Altura Se estiver adjacente a uma queda de 3m ou mais de altura (como um buraco ou penhasco), a decúria fica abalada.
For 4, Des 0, Con 3, Int 1, Sab –1, Car 0
Equipamento Azagaia x3, escudo pesado, gládio, loriga segmentada (1d10 de cada). Tesouro Metade.`
        },
        {
          chave: "legionarioInsano", nome: "Legionário Insano", nd: "8", tipo: "Humanoide (minotauro) Médio",
          papel: '',
          resumo: "Parece apenas mais uma patrulha de legionários, como tantas outras nas estradas imperiais.",
          texto:
`Legionário Insano ND 8
“Vamos acabar logo com esses malucos, quero voltar para minha cervejaria!”
— Werner Brahmorim, anão inventor
Parece apenas mais uma patrulha de legionários, como tantas outras nas estradas imperiais. No entanto, mesmo à distância, vocês percebem algo errado. Os minotauros movem-se trôpegos, cambaleantes. Rosnam palavras e maldições ininteligíveis. E quando erguem a cabeça, na escuridão dos elmos, os olhos brilham como brasas vermelhas.
Quando a Tormenta se derramou sobre Tiberus, milhares de legionários avançaram para proteger o Império. Para um número incontável destes, bastou um vislumbre do inferno aberrante para despedaçar toda e qualquer sanidade. Em apenas um momento, soldados fortes e metódicos tornaram-se loucos assassinos. Legionários insanos são comuns nas terras do Império e além — surgem de súbito em qualquer lugar, podendo até mesmo emergir de algum beco em plena capital! Convertidos em monstros pela loucura da Tormenta, não passam de matadores sanguinários, levados a “patrulhar” estradas e lutar juntos por algum resquício da antiga disciplina militar. Casos de vilas destruídas por estes maníacos têm sido cada vez mais numerosos, muitas vezes levando governadores e regentes a contratar aventureiros para caçá-los.
Humanoide (minotauro) Médio
Iniciativa +10, Percepção +7, faro
Defesa 30, Fort +20, Ref +16, Von +7, imunidade a medo, resistência a magia +5
Pontos de Vida 80
Deslocamento 6m (4q)
Corpo a Corpo Gládio x2 +27 (1d8+16, 19/x3) e chifres +27 (1d6+14).
Desapego à Vida O legionário insano não fica inconsciente quando é reduzido a 0 PV ou menos e só morre quando é reduzido a -40 PV.
Olhar Desesperador (Livre) Uma vez por rodada, o legionário encara um inimigo em alcance curto, que fica apavorado por 1 rodada e então abalado (Von CD 26 reduz para abalado por 1 rodada e o alvo fica imune a esta habilidade até o fim da cena).
Retribuição Ensandecida (Reação) Uma vez por rodada, quando sofre dano de um inimigo adjacente, o legionário pode usar uma ação agredir contra essa criatura.
For 7, Des 2, Con 6, Int –1, Sab –1, Car –3
Equipamento Gládio, loriga segmentada. Tesouro Metade.`
        },
        {
          chave: "minauroArcanista", nome: "Minauro Arcanista", nd: "3", tipo: "Humanoide (minauro) Médio",
          papel: '',
          subgrupo: "Minauro",
          resumo: "Minauro — Ela lembra uma humana robusta, como a maioria dos minotauros.",
          texto:
`Minauro Arcanista ND 3
Humanoide (minauro) Médio
Iniciativa +5, Percepção +6, faro
Defesa 17, Fort +9, Ref +4, Von +15
Pontos de Vida 64
Deslocamento 9m (6q)
Pontos de Mana 34
Corpo a Corpo Espada curta +7 (1d6+2, 19).
Magias Como um mago de 5º nível (CD 20, limite de PM 5).
• Armadura Arcana (Reação, 2 PM) O minauro recebe +5 na Defesa contra o próximo ataque que sofrer.
• Bola de Fogo (Padrão, 5 PM) O minauro causa 8d6 pontos de dano de fogo em todas as criaturas em um raio de 6m em alcance médio (Ref reduz à metade).
• Explosão de Chamas (Padrão, 3 PM) Criaturas em um cone de 6m sofrem 3d6 pontos de dano de fogo e ficam em chamas (Ref reduz dano à metade e evita a condição).
• Primor Atlético (Padrão, 4 PM) Até o fim da cena, o deslocamento do minauro muda para 18m, ele recebe +10 em Atletismo e quando faz testes de perícias baseadas em Força, Destreza e Constituição (exceto testes de ataque e resistência) rola dois dados e usa o melhor.
For 2, Des 0, Con 2, Int 4, Sab 1, Car 0
Perícias Atletismo +5, Conhecimento +9, Diplomacia +5, Investigação +11, Misticismo +9.
Equipamento Essência de mana, espada curta, varinha arcana. Tesouro Padrão.`
        },
        {
          chave: "minauroLadino", nome: "Minauro Ladino", nd: "6", tipo: "Humanoide (minauro) Médio",
          papel: '',
          subgrupo: "Minauro",
          resumo: "Minauro — Ela lembra uma humana robusta, como a maioria dos minotauros.",
          texto:
`Minauro Ladino ND 6
Humanoide (minauro) Médio
Iniciativa +11, Percepção +5, faro
Defesa 25, Fort +8, Ref +18, Von +10, evasão aprimorada
Pontos de Vida 147
Deslocamento 9m (6q)
Corpo a Corpo Espada curta 2x +18 (2d6+15, 19).
Ataque Furtivo +3d6.
Bombardeiro Veloz (Padrão) O minauro ladino saca uma de suas bombas e a arremessa em alcance curto. Uma bomba de fumaça gera fumaça espessa em um raio de 6m até o fim da cena (veja a página 396) e uma bomba causa 6d6 pontos de dano de impacto em todas as criaturas em um raio de 3m (Ref CD 24 reduz à metade).
Fuga Formidável (Completa) Até o fim da cena, o minauro ladino recebe +3m em seu deslocamento, +5 em Acrobacia e Atletismo e ignora penalidades em movimento por terreno difícil. Ele perde esses benefícios se fizer uma ação que não seja diretamente relacionada a fugir.
Mãos Leves O minauro ladino faz testes de Ladinagem como uma ação livre. Além disso, ele não sofre penalidade em testes de Furtividade por se mover ao seu deslocamento normal e reduz a penalidade por atacar e fazer outras ações chamativas para –10.
Pirueta Defensiva (Reação) Uma vez por rodada, quando sofre dano de um ataque, o minauro reduz esse dano à metade.
For 2, Des 4, Con 2, Int 3, Sab 0, Car –1
Perícias Acrobacia +11, Atletismo +7, Diplomacia +6, Furtividade +11, Investigação +10, Jogatina +6, Ladinagem +11.
Equipamento Bomba x3, bomba de fumaça x3, espada curta, gazua. Tesouro Padrão.`
        },
        {
          chave: "governadorCorrupto", nome: "Governador Corrupto", nd: "6", tipo: "Humanoide (minotauro) Médio",
          papel: '',
          resumo: "A figura obesa em toga elegante, transportada em uma liteira carregada por escravos, acena um comando para que se detenham.",
          texto:
`Governador Corrupto ND 6
“Seu harém? Tentador, mas devo declinar do convite. Prefiro beijar um otyugh.”
— Alicia Niamm, medusa bucaneira
A figura obesa em toga elegante, transportada em uma liteira carregada por escravos, acena um comando para que se detenham. Enquanto mastiga ruidosamente as uvas recebidas de uma esposa, o minotauro leva uma mão enorme ao queixo empapado e observa vocês com interesse. Com o governo central fragilizado, enfraquecido, muitos senadores ambiciosos — que buscavam apenas aumentar seu próprio poder e riqueza — decidiram que não havia mais nada a ganhar ali. Reuniram suas posses e servos e estabeleceram províncias próprias em áreas rurais afastadas, onde governam sem qualquer lealdade ao Triunvirato. Seguem com as antigas práticas hoje condenadas pelo Império, mantendo escravos e haréns, bem como uma guarda pessoal de ex-legionários e outros capangas. Governadores raramente são vistos longe de suas mansões, mas pode ocorrer que façam viagens breves para inspecionar suas propriedades ou negociar escravos em mercados clandestinos. Originários de famílias ricas, muitos receberam bom treino de combate na juventude — mas é normal que hoje estejam fora de forma, preferindo que sua escolta lute por eles. Os anos passados em debates no senado, contudo, tornaram sua mente e língua afiadas; são mestres da negociação e intimidação, praticamente capazes de enfeitiçar com suas palavras.
Humanoide (minotauro) Médio
Iniciativa +5, Percepção +7, faro
Defesa 18, Fort +12, Ref +6, Von +18
Pontos de Vida 122
Deslocamento 9m (6q)
Corpo a Corpo Adaga +19 (1d4+12, 19) e chifres +18 (1d6+12).
Como Ousa? (Reação) Uma vez por rodada, quando um inimigo tenta usar uma ação hostil contra o governador corrupto, o governador faz um teste de Intimidação oposto à Vontade do agressor. Se o governador vencer o teste oposto, o inimigo perde a ação.
Deliberação Desnorteante (Completa) Uma vez por cena, o governador faz um discurso elaborado que deixa todos os inimigos em alcance curto pasmos por 1 rodada e desprevenidos pela cena (Von CD 24 anula).
Guarda Pessoal O governador está sempre acompanhado de quatro legionários (veja a página 172), que não contam para o cálculo de XP e tesouro do encontro.
Incitar (Padrão) O governador ordena (ou xinga, ou chicoteia…) seus subordinados para que sejam mais cruéis e eficazes. Todos os aliados do governador em alcance médio recebem +5 em testes de perícia e +1d10 em rolagens de dano por 1 rodada.
Proteja-me! (Reação) Uma vez por rodada, quando sofre um ataque, o governador corrupto escolhe um aliado adjacente para se tornar o alvo desse ataque.
Medo de Altura Se estiver adjacente a uma queda de 3m ou mais de altura (como um buraco ou penhasco), o governador fica abalado.
For 1, Des 0, Con 3, Int 3, Sab 2, Car 5
Perícias Conhecimento +8, Diplomacia +14, Guerra +8, Intimidação +17, Intuição +9, Nobreza +18.
Equipamento Adaga certeira, tabardo aprimorado, traje da corte. Tesouro Dobro.`
        },
      ],
      regras: [
        { titulo: "Centurião",
          texto:
`“O exército mais poderoso de Arton? Esses dias são coisa distante, amigão!”
— Selginn Lan’ze, osteon bardo
Ainda que as legiões pareçam formadas por soldados absolutamente iguais, com as mesmas armaduras, lanças e escudos, um deles se adianta. Um minotauro ainda maior e mais orgulhoso, ostentando um manto tinto sobre os ombros largos e uma crista emplumada no elmo de bronze. Quando ergue o gládio para ordenar o ataque, fica claro que não pretende apenas liderar, mas também lutar. O centurião é um comandante de legionários, mas também um valoroso guerreiro de elite, que luta nas linhas de frente. Embora se beneficie das táticas tapistanas de combate em equipe, é também um lutador solo habilidoso. Astuto e experiente, logo reconhece o adversário mais perigoso, orientando os companheiros para neutralizá-lo — ou tomando a tarefa para si mesmo. Diferente de muitos legionários, quase nenhum centurião abandonou sua pátria. Atuam em posições importantes, como capitães ou guarda-costas, gozando de privilégios e (quase sempre) fazendo por merecê-los. Será raro encontrá-los longe das terras imperiais, exceto liderando equipes em missões de grande importância.` },
        { titulo: "Medo de Altura",
          texto:
`Todos os minotauros possuem um temor instintivo de alturas. Enquanto estiver adjacente a uma queda de 3m ou mais de altura (como um buraco ou penhasco), o minotauro fica abalado.` },
        { titulo: "Fúria de Tauron",
          texto:
`“Aquilo que ele está conjurando se parece com… não, não pode ser! Ele morreu!”
— Nymme Ergech, qareen paladina de Tanna-Toh
A aparição flutuante tem o aspecto de um crânio bovino envolto em chamas macabras, espectrais. Impossível não notar a semelhança com o próprio Deus da Força. Óbvio: a presença do cadáver gigantesco de um deus, em pleno coração do Império, não poderia deixar de ter consequências sobrenaturais. “Fúrias de Tauron” é como são chamados estes estranhos mortos-vivos, surgidos logo após a morte do deus minotauro. Embora sejam muito mais comuns nas proximidades do cadáver titânico, também passariam a surgir em outras regiões de Arton — pois não há evento relacionado a um deus maior que não afete o mundo inteiro. Sozinhos ou em pequenos bandos, podem assombrar antigos templos de Tauron ou perseguir ex-escravos. Após estudos muito recentes, alguns arcanistas e clérigos encontraram formas de invocar estes espíritos para uso em combate.` },
        { titulo: "Legionário",
          texto:
`“Ei, você, minotauro! Agora você me vê, agora não vê mais!”
— Zayronn, hynne ladino
Alto e sólido como um muro, envergando uma orgulhosa loriga segmentada, o soldado minotauro avança empunhando lança e escudo. Apesar da face animalesca, bovina, pode-se notar em seus olhos uma mente astuta e disciplinada. Até tempos recentes, não havia em Arton força militar mais temida que as legiões de Tapista. Mesmo hoje, após a queda de Tauron e a ascensão da Supremacia Purista, estrategistas ainda julgam difícil dizer qual seria o exército mais poderoso. Os legionários do Império são guerreiros — mas, acima de tudo, soldados — altamente treinados para combater em grandes números. Lutam de forma mais eficaz com um companheiro ao lado, cada um usando o escudo para proteger o outro, avançando sobre o inimigo como uma muralha de aço. Mesmo em pequenos grupos, ainda conseguem realizar manobras que multiplicam sua força, em vez de apenas somá-la. Milhares de legionários ainda servem ao Império de Tauron com lealdade inabalável, seja obedecendo ao poder central do Triunvirato, seja sob jugo dos inúmeros governadores e déspotas. Mas também é verdade que, frente à devastação e corrupção de sua pátria, muitos desertaram. Vagam pelo Reinado em pequenos grupos, aceitando contratos como mercenários, guarda-costas ou — o fundo do poço para estes outrora orgulhosos combatentes — reduzidos a assaltantes de beira de estrada.` },
        { titulo: "Minauro",
          texto:
`“Fui embora daquele reino maldito porque sou minaura. Achavam que eu era a mais fraca, mas agora vamos ver!”
— Minara Minostini, minaura guerreira
Ela lembra uma humana robusta, como a maioria dos minotauros. Também tem cabeça bovina, mas com olhos grandes e expressivos, focinho curto e chifres menores que aqueles vistos em minotauros. Tem pés humanos calçando sandálias. Veste armadura de couro e empunha algo que, se não fosse absurdo, poderia ser um canhão. Minotauros precisam de fêmeas humanas, élficas ou qareen para se reproduzir — pois, apesar de existirem minotauras mulheres, não existem minotauros fêmeas. Filhos do sexo masculino são minotauros. Filhas do sexo feminino são humanas, elfas ou qareen. No entanto, em raras ocasiões, uma criatura totalmente nova vem à luz. Os meios-minotauros, ou minauros, lembram humanos com traços táuricos. Não demonstram a grande força da raça de Tauron, mas também estão livres de suas fraquezas. E, diferente destes, podem ter qualquer sexo. Já foram considerados aberrações, “coisas que não deveriam existir” — preconceito que ficou no passado, exceto para os mais intolerantes. Quando nascidos e criados no Império de Tauron, meios-minotauros agem e se comportam como seus pais, demonstrando disciplina, honra e orgulho. No entanto, talvez por sua força física inferior, sentem mais necessidade de demonstrar suas capacidades, competindo com minotauros “puros” o tempo todo. Sua parte humana também pode levar a uma curiosidade imprudente por assuntos “proibidos” para o povo táurico, como armas de longo alcance, magia arcana ou talentos ladinos. De fato, minauros tendem a mostrar comportamento mais diverso, desenvolvem gostos e aversões imprevisíveis. Minauros e minotauros não se relacionam bem. Mesmo o minotauro mais nobre e generoso não consegue disfarçar a mágoa, considerando os minauros inferiores, dignos de pena. Minauros são tratados como doentes, inválidos ou “irmãozinhos” pequenos — o que eles detestam! Por isso preferem deixar o convívio com minotauros para viver entre outras raças, onde sua força acima da média é respeitada e bem-vinda. Se resolvem ser aventureiros, minauros ficam muito à vontade em grupos formados por pessoas diversas. Entendem que sua grande força é importante para a equipe, adotando classes combativas, mas também podem “nadar contra a corrente” e seguir carreiras totalmente contrárias à raça dos pais, como arcanistas, bardos, inventores e ladinos.` },
      ],
    },

    // ── 🐕 KOBOLDS ─────────────────────────────────────
    {
      chave: "kobolds", nome: "Kobolds", icone: "🐕", cor: "#6a7a3a",
      intro: "Kobolds são uma praga persistente em todos os pontos de Arton — especialmente após o retorno de Kallyadranoch ao Panteão. Podem ser encontrados em pequenos bandos, espreitando e saqueando nos ermos, ou povoando grandes comunidades nas profundezas de alguma masmorra. Entre aventureiros, kobolds são tidos como os adversários mais fáceis de todos. Inimigos de heróis novatos, pequenos monstros que podem ser derrotados sem grande risco. Frequentemente são os primeiros adversários de grupos recém-formados, ainda explorando sua primeira masmorra, ainda vivendo sua primeira aventura. Mesmo aqueles que estudam kobolds acabam por tratá-los como pestes. Um kobold sozinho dificilmente representa ameaça — não é mais esperto que um glop. Contudo, de alguma forma, seu comportamento e táticas se aprimoram quando estão em maior número. Matilhas de kobolds agem e lutam em harmonia, como se fossem uma só criatura. Empunham armas. Fabricam armadilhas. Armam emboscadas. Falam o idioma dracônico. Seguem ordens de mestres, que podem ser dragões ou devotos de Kallyadranoch. Apesar de sua fama como “pragas menores”, subestimar os kobolds é um erro que custa vidas de aventureiros todos os anos. Seus números são intermináveis. Suas variações são inesperadas e mortais. Mais importante ainda, sua simples presença pode ser sinal de que um grande dragão ronda por perto.",
      fichas: [
        {
          chave: "caoDeKally", nome: "Cão de Kally", nd: "2", tipo: "Monstro Médio",
          papel: '',
          resumo: "Quando o bando de humanoides-cães-lagartos raivosos emerge da vegetação, algo maior toma a dianteira.",
          texto:
`Cão de Kally ND 2
“Aqueles kobolds… tem algo maior andando entre eles. E parece que acaba de abocanhar um!!”
— Arthur Kaendros, humano clérigo de Wynna
Quando o bando de humanoides-cães-lagartos raivosos emerge da vegetação, algo maior toma a dianteira. Uma fera semelhante aos kobolds no aspecto canino e reptiliano, mas quadrúpede e muito maior. Lembra um lobo escamado, com chifres de kobold na cabeça e no pescoço. Quando arreganha a bocarra, além de presas enormes, exibe também o temido brilho flamejante de outro monstro bem conhecido… Por existirem em lugares habitados por dragões, é comum que kobolds acabem aliados a outras criaturas de origem parecida — seres transmutados pela emanação dracônica ambiental. Assim, patrulhas kobolds podem às vezes ser acompanhadas por um lobo meio-dragão. Os cães de Kally podem ser encontrados sozinhos, em pequenas matilhas ou como animais de caça e guarda em tribos kobolds. Essa relação é funcional, embora não muito harmoniosa: quando sente fome, o cão simplesmente abocanha o kobold mais próximo. O bando, contudo, considera esse um preço baixo a pagar por sua aliança com uma fera tão poderosa.
Cães de Kally são cobiçados como animais de guarda por aqueles não muito preocupados com a segurança de intrusos; rumores dizem que eles rondam em grandes matilhas nas Catacumbas de Leverick. Sabe-se também que alguns aventureiros conseguiram domá-los.
Monstro Médio
Iniciativa +5, Percepção +6, faro, visão no escuro
Defesa 18, Fort +13, Ref +7, Von +2
Pontos de Vida 21
Deslocamento 15m (10q)
Corpo a Corpo Mordida +14 (1d6+8) e garras +14 (1d4+8).
Derrubar (Livre) Mordida (teste +14).
Sopro (Padrão) O cão de Kally cospe fogo em um cone de 9m. Criaturas na área sofrem 2d8+4 pontos de dano de fogo e ficam em chamas (Ref CD 15 reduz à metade e evita a condição). Recarga (movimento).
For 4, Des 2, Con 5, Int –3, Sab 1, Car –1
Tesouro Nenhum.
Parceiro Embora seja difícil de treinar, um cão de Kally é um parceiro especial (fortão) que fornece os benefícios a seguir. Iniciante: uma vez por rodada, uma de suas rolagens de dano corpo a corpo causa +1d6 pontos de dano de fogo. Veterano: muda para +2d6. Mestre: além do normal, uma vez por rodada, você pode gastar 2 PM para causar 4d6 pontos de dano de fogo em um cone de 6m.`
        },
        {
          chave: "enxameLarval", nome: "Enxame Larval", nd: "1", tipo: "Monstro (kobold) Médio",
          papel: '',
          resumo: "O poder elemental sangra das paredes, escorrendo e gotejando como fogo líquido.",
          texto:
`Enxame Larval ND 1
“As paredes! Essas malditas coisas estão saindo das paredes! Saindo dos ovos!”
— Hadger Lacke, elfo ladino
O poder elemental sangra das paredes, escorrendo e gotejando como fogo líquido. Em cada canto, cada fresta, dúzias de formas esféricas de couro pulsam com vida profana: são ovos de kobolds, brotando como fungos. Com a aproximação de vocês, os ovos liberam sua carga horrenda: grandes bandos compactos de criaturas larvais que lembram lagartos revestidos de gosma e muco. Entre os poucos dispostos a discorrer sobre o assunto, existe dúvida quanto a kobolds serem de fato seres vivos. Eles não se reproduzem como outras criaturas, eles se formam. São um subproduto do poder elemental dos dragões. Nascem de ovos viscosos, repelentes, que brotam em lugares onde os grandes répteis permanecem por muito tempo. Em lugares com grande concentração desses ovos, a aproximação de criaturas não dracônicas pode fazê-los eclodir rapidamente. As dezenas de larvas formam enxames que avançam contra o invasor. Atravessar a área com cautela, contudo, evita que as criaturas apareçam.
Monstro (kobold) Médio
Iniciativa +7, Percepção +3, sensibilidade a luz, visão no escuro
Defesa 16, Fort +5, Ref +11, Von +0, imunidade a corte e perfuração
Pontos de Vida 30
Deslocamento 6m (4q), escavação 6m (4q)
Enxame 3d4 perfuração.
Distração Uma criatura que comece seu turno dentro do espaço do enxame não pode fazer ações que exijam concentração (como lançar magias) e sofre –2 em perícias (Fort CD 15 evita ambos). Estes efeitos duram até ela sair da área do enxame e se livrar dos kobolds (veja abaixo).
Entrar nas Roupas Quando uma criatura sai do espaço do enxame, algumas larvas ficam dentro de suas roupas. Se falhou no teste de resistência, a criatura continua sofrendo os efeitos de Distração até gastar uma ação padrão para se livrar das larvas.
For –1, Des 2, Con 0, Int –4, Sab –1, Car –3
Tesouro Nenhum.`
        },
        {
          chave: "koboldPatrulheiro", nome: "Kobold Patrulheiro", nd: "1/2", tipo: "Monstro (kobold) Pequeno",
          papel: '',
          subgrupo: "Kobold",
          resumo: "Kobold — São pouco mais de uma dúzia.",
          texto:
`Kobold Patrulheiro ND 1/2
Monstro (kobold) Pequeno
Iniciativa +4, Percepção +0, sensibilidade a luz, visão no escuro
Defesa 14, Fort +3, Ref +5, Von +0
Pontos de Vida 6
Deslocamento 9m (6q)
Corpo a Corpo Lança +9 (1d6+1).
À Distância Funda +9 (1d4+6).
Peste Oportunista Os ataques do kobold patrulheiro causam +1d4 pontos de dano contra inimigos que já sofreram dano na rodada.
For 1, Des 2, Con 0, Int –1, Sab 0, Car –1
Perícias Furtividade +8.
Equipamento Funda, lança, pedras x20. Tesouro Metade.`
        },
        {
          chave: "koboldVeterano", nome: "Kobold Veterano", nd: "2", tipo: "Monstro (kobold) Pequeno",
          papel: '',
          subgrupo: "Kobold",
          resumo: "Kobold — São pouco mais de uma dúzia.",
          texto:
`Kobold Veterano ND 2
Monstro (kobold) Pequeno
Iniciativa +5, Percepção +1, sensibilidade a luz, visão no escuro
Defesa 19, Fort +7, Ref +12, Von +3
Pontos de Vida 13
Deslocamento 9m (6q)
Corpo a Corpo Lança +14 x2 (1d6+6).
À Distância Funda +14 (2d4+12).
Muito Já Apanhei O kobold veterano ignora todo o dano do primeiro ataque que sofre em cada cena.
Peste Oportunista Os ataques do kobold causam +1d4 pontos de dano contra inimigos que já sofreram dano na rodada.
For 1, Des 2, Con 0, Int –1, Sab 0, Car –1
Perícias Furtividade +9.
Equipamento Armadura de couro, funda, lança, pedras x20.
Tesouro Metade.`
        },
        {
          chave: "patrulhaKobold", nome: "Patrulha Kobold", nd: "4", tipo: "Monstro (kobold) Médio",
          papel: '',
          subgrupo: "Kobold",
          resumo: "Kobold — São pouco mais de uma dúzia.",
          texto:
`Patrulha Kobold ND 4
Monstro (kobold) Médio
Iniciativa +6, Percepção +2, sensibilidade a luz, visão no escuro
Defesa 23, Fort +10, Ref +15, Von +5
Pontos de Vida 30
Deslocamento 9m (6q)
Corpo a Corpo [Bando] Lança +17 (1d6+1).
À Distância [Bando] Funda +17 (1d4+6).
Peste Oportunista Os ataques da patrulha kobold causam +1d4 pontos de dano contra inimigos que já sofreram dano na rodada.
For 1, Des 2, Con 0, Int –1, Sab 0, Car –1
Perícias Furtividade +8.
Equipamento Funda, lança, pedras x20 (1d8 de cada).
Tesouro Metade.`
        },
        {
          chave: "koboldBruto", nome: "Kobold Bruto", nd: "4", tipo: "Monstro (kobold) Grande",
          papel: '',
          resumo: "São seres do tamanho de ogros, grandes e fortes, mas com cabeças diminutas de kobolds.",
          texto:
`Kobold Bruto ND 4
“Não tenho a menor ideia! Acho que parece um kobold muito bem alimentado!”
— Maryam Hajitea, hynne caçadora
São seres do tamanho de ogros, grandes e fortes, mas com cabeças diminutas de kobolds. Não parecem mais espertos que qualquer um deles. Mas as clavas imensas devem ser bem capazes de esmagar crânios. O kobold bruto não era conhecido até recentemente. Talvez nem existisse. Muitos acreditam que seu surgimento deve ter relação com o retorno de Kally — especialmente porque vários devotos do Deus dos Dragões são recompensados com estes gigantes monstruosos, como guardas e soldados. Isso inclui xamãs kobolds, que utilizam os brutos como força de combate em suas tribos. Kobolds brutos também podem surgir de ovos normais, formados em covis dracônicos. Ou, ainda, podem nascer a partir de uma kobold-mãe, atuando como sua “guarda real”; um bom número deles pode ser encontrado em sua presença.
Monstro (kobold) Grande
Iniciativa +5, Percepção +2, sensibilidade a luz, visão no escuro
Defesa 23, Fort +16, Ref +10, Von +2
Pontos de Vida 120
Deslocamento 9m (6q)
Corpo a Corpo Tacape +16 (1d12+18).
Escamas de Kally Todo dano que o kobold bruto sofre é reduzido à metade.
Peste Oportunista Os ataques do kobold causam +1d4 pontos de dano contra inimigos que já sofreram dano na rodada.
Cabecinha A habilidade Escamas de Kally não se aplica a acertos críticos e ataques contra a cabeça diminuta do kobold (Defesa 33).
For 6, Des 1, Con 4, Int –3, Sab –2, Car –2
Perícias Atletismo +10.
Equipamento Tacape aumentado. Tesouro Metade.`
        },
        {
          chave: "koboldExplosivo", nome: "Kobold Explosivo", nd: "1", tipo: "Monstro (kobold) Pequeno",
          papel: '',
          resumo: "A criatura estridente recebe seu ataque certeiro, sua lâmina o atravessa sem deixar qualquer vida.",
          texto:
`Kobold Explosivo ND 1
“Sem problemas. Tenho a técnica e a magia certas para lidar com essas pestes.”
— Tovac, meio-elfo mago-guerreiro
A criatura estridente recebe seu ataque certeiro, sua lâmina o atravessa sem deixar qualquer vida. Contudo, algo estranho acontece. Rachaduras de fogo correm velozes no corpo diminuto, o brilho aumenta muito rápido. Parece que vai… Existem casos de kobolds especialmente fortes que, por habitar o covil de algum dragão muito antigo e poderoso, acabam absorvendo parte da energia arcana.
Infelizmente (para eles e todos à volta), esse poder não aprimora quaisquer habilidades; é liberado apenas quando a criatura morre, fazendo-a explodir. Assim, em lugares onde vivem — ou viveram — grandes dragões, existe uma chance elevada de que qualquer kobold abatido resulte em uma explosão elemental imensa. Pior ainda, pode causar uma reação em cadeia detonando outros kobolds dentro do alcance. Muitos aventureiros encontraram seu fim enfrentando o que acreditavam ser monstros fracos, mas na verdade eram campos minados ambulantes!
Monstro (kobold) Pequeno
Iniciativa +4, Percepção +0, sensibilidade a luz, visão no escuro
Defesa 15, Fort +5, Ref +10, Von +1
Pontos de Vida 9
Deslocamento 9m (6q)
Corpo a Corpo Lança +11 (1d6+9).
À Distância Funda +11 (1d4+9).
Detonação Final Quando o kobold é reduzido a 0 PV, role 1d6: com um resultado 1 ou 2, ocorre uma explosão. Todas as criaturas a até 3m sofrem 4d6 pontos de dano de impacto (Ref CD 14 reduz à metade).
Peste Oportunista Os ataques do kobold explosivo causam +1d4 pontos de dano contra inimigos que já sofreram dano na rodada.
For 1, Des 2, Con 0, Int –1, Sab 0, Car –1
Equipamento Funda, lança, pedras x20. Tesouro Metade.`
        },
        {
          chave: "koboldXama", nome: "Kobold Xamã", nd: "3", tipo: "Monstro (kobold) Pequeno",
          papel: '',
          resumo: "Súbito, os kobolds abrem passagem para alguém diferente.",
          texto:
`Kobold Xamã ND 3
“Mim Auk. Auk xamã. O que querer com Auk?”
— Auk, xamã kobold
Súbito, os kobolds abrem passagem para alguém diferente. Um kobold trajando mantos esfarrapados e empunhando um cajado rústico. Na extremidade do cajado, um emaranhado tosco de galhos e barbante, imitando a cabeça de um dragão. Não há líderes entre os kobolds. É consenso geral que eles não funcionam como indivíduos, não desenvolvem talentos diferenciados. Contudo, certos relatos sugerem o contrário. Alguns aventureiros descrevem encontros com kobolds liderados por um xamã — um kobold não apenas inteligente, mas também devoto de Kallyadranoch. Este suposto clérigo seria capaz de falar o idioma valkar e até negociar com outros povos. Algo assim teria ocorrido próximo à velha Malpetrim, quando o ladino Sandro Galtran e a elfa Nielendorane de Lenórienn negociaram com kobolds a posse de um Rubi da Virtude. Tais acordos pacíficos, contudo, são raros. Mais comum é que o xamã apenas ajude seus iguais durante emboscadas e pilhagens. Xamãs especialmente poderosos (e malignos) lideram as maiores comunidades; diz-se que conduzem cerimônias a Kally, pregando seu tão aguardado momento de supremacia, sua vez de governar os outros povos ao lado dos dragões. Ataques kobolds têm aumentado, em tentativas de capturar vítimas para sacrifícios rituais ao Deus do Poder.
Monstro (kobold) Pequeno
Iniciativa +5, Percepção +6, sensibilidade a luz, visão no escuro
Defesa 20, Fort +3, Ref +9, Von +15, resistência a magia +1
Pontos de Vida 69
Deslocamento 9m (6q)
Pontos de Mana 15
Corpo a Corpo Gadanho +12 (2d4+3, x4) e mordida +12 (1d4+3).
À Distância Funda +12 (1d6+3).
✦ Aura de Medo (Livre, 2 PM) O xamã gera uma aura de medo de 9m de raio e duração cena. Todos os inimigos que entram na aura ficam abalados até o fim da cena (Von CD 19 evita) e a criatura não pode mais ser abalada por esta habilidade por um dia.
Peste Oportunista Os ataques do xamã causam +1d4 pontos de dano contra inimigos que já sofreram dano na rodada.
✦ Símbolo Sagrado Energizado (Movimento, 1 PM) O xamã energiza seu símbolo sagrado. Até o fim da cena, ele emite uma luz avermelhada que ilumina como uma tocha e, enquanto estiver sendo empunhado pelo xamã, reduz o custo de magias divinas em –1 PM.
Magias Como um clérigo de Kallyadranoch de 3º nível (CD 19).
• Curar Ferimentos (Padrão, 3 PM) Uma criatura adjacente cura 4d8+4 PV.
• Escudo da Fé (Reação, 1 PM) Quando uma criatura em alcance curto sofre um ataque, ela recebe +2 na Defesa até seu próximo turno.
• Perdição (Padrão, 1 PM) Criaturas escolhidas em alcance curto sofrem –1 em testes de ataque e rolagens de dano até o fim da cena.
For 0, Des 2, Con 1, Int –1, Sab 3, Car –1
Perícias Cura +6, Furtividade +9, Misticismo +2, Religião +6.
Equipamento Andrajos, bálsamo restaurador, funda, gadanho, pedras x20, símbolo sagrado de Kallyadranoch. Tesouro Metade.`
        },
        {
          chave: "koboldMae", nome: "Kobold-Mãe", nd: "12", tipo: "Monstro (kobold) Grande",
          papel: '',
          resumo: "Na vasta caverna de paredes viscosas, pululando com uma população de kobolds, há uma criatura diferente.",
          texto:
`Kobold-Mãe ND 12
“Esperem, essa coisa é uma mãe. Tem família. Será que devemos mesmo fazer isso?”
— Magic Glautered, guerreiro-mago
Na vasta caverna de paredes viscosas, pululando com uma população de kobolds, há uma criatura diferente. Imensa, imóvel, inchada. No abdome descomunal e translúcido, massas de ovos gelatinosos, pulsantes. Algum tipo de rainha-mãe. Talvez isso explique seus números assombrosos naquele lugar. No reino divino de Kallyadranoch, kobolds existem em abundância. Onde houver vida naquele mundo, será possível encontrá-los — ou mesmo onde não houver vida alguma! Por seus números tão vastos, se fossem mesmo seres inteligentes, já teriam erguido seu próprio império. Há, no entanto, uma lenda sobre uma criatura mítica — algo equivalente aos Dragões-Reais de Arton, um suposto “representante máximo da espécie”. Seria o maior e mais poderoso kobold na Criação, regente de algum vasto império secreto. Isto é, assim dizem as canções dos bardos. Se existe mesmo o “Kobold-Rei” que governa todos os outros, ninguém foi capaz de confirmar. Mas existem kobolds-mães; monstruosidades dracônicas inteligentes e astutas, capazes de botar ovos em quantidades imensuráveis. Seriam elas as responsáveis pela ocorrência dos vagalhões em Drashantyr. Quando confrontadas, conseguem até mesmo produzir kobolds de forma quase espontânea. Até hoje, nenhuma kobold-mãe foi vista em Arton. Caso um vagalhão aconteça, encontrar e destruir esta criatura será o único modo de deter a calamidade.
Monstro (kobold) Grande
Iniciativa +9, Percepção +15, visão no escuro
Defesa 41, Fort +26, Ref +15, Von +12, imunidade a efeitos de movimento
Pontos de Vida 550
Deslocamento 0m (0q)
Canção de Ninar (Padrão) Todos os kobolds em uma esfera de 30m ao redor da kobold-mãe perdem quaisquer condições de medo. Demais criaturas na área sofrem 12d6 pontos de dano psíquico e ficam atordoadas por 1 rodada (Von CD 35 reduz à metade, evita a condição e a criatura não pode mais ser atordoada por esta habilidade até o fim da cena). Recarga (usar Queridinho da Mamãe).
Mãe É Sagrado Kobolds que estejam em alcance curto da kobold-mãe recebem +2 em testes de perícia e rolagens de dano. Cada vez que ela sofre um ataque ou é alvo de uma habilidade, esses bônus aumentam em +1 até o fim da cena.
Ovos (Movimento) A kobold-mãe invoca 1d8+2 ninhadas de kobolds que surgem em espaços desocupados em alcance curto. Elas agem a partir da próxima rodada da mamãe, têm deslocamento 12m (normal e de escalada) e a habilidade enxame (3d6+15, perfuração). As ninhadas são Médias, têm For –1, Des 4, Defesa 35 e 1 PV, falham automaticamente em qualquer teste oposto ou de resistência e desaparecem quando mortas ou ao fim da cena. Recarga (movimento).
Protejam a Mamãe (Reação) Uma vez por rodada, quando a kobold-mãe sofre dano, um kobold em alcance curto se sacrifica por ela. O kobold morre, mas o dano que a mãe sofreria é reduzido a 0.
Queridinho da Mamãe (Padrão) A kobold-mãe aponta para outro kobold em alcance curto. Por 1 rodada, esse kobold fica imune a efeitos de movimento e recebe +5 em testes de perícia e rolagens de dano.
For 2, Des –3, Con 7, Int –2, Sab 3, Car –1
Tesouro Padrão.`
        },
      ],
      regras: [
        { titulo: "Armadilhas Kobolds",
          texto:
`“Essa é a pior armadilha que eu já — AHHHHH!”
— Theikos, paladino de Valkaria
Enquanto percorre a trilha na floresta, apesar de sua atenção, um detalhe importante acaba escapando. O chão desaba sob seus pés, você despenca em um fosso não muito profundo. Sofre alguns ferimentos e prepara-se para sair, quando escuta latidos por perto. Onde há kobolds, há armadilhas. Seus engenhos são ardilosos, mas também rústicos; com sorte e perícia, um ladino iniciante pode encontrá-los a tempo. Convém lembrar, contudo, que a presença de uma armadilha é quase garantia de que kobolds espreitam nas redondezas. Ainda, a ativação ruidosa de uma armadilha também pode atrair outros predadores que estejam rondando por perto.
Andrajos Flamejantes Uma área repleta de trapos, aparentemente inofensivos, embebidos em combustível que se inflama quando a armadilha é acionada. Criaturas em um raio de 3m sofrem 2d6 pontos de dano de fogo e ficam em chamas. Reflexos CD 17 reduz o dano à metade e evita a condição; Investigação CD 15; Ladinagem CD 20; ND ¼.
Sinos Alarmantes Barbantes camuflados conectados a sinos, em latas cheias de pedras ou nas partes íntimas de um bode produzem um som estridente quando acionados. Todas as criaturas em alcance longo são alertadas pelo dispositivo e, até o fim da cena, nenhum kobold nessa área pode ser surpreendido; Reflexos CD 15 evita; Investigação/Ladinagem CD 15; ND ¼.
Geringonça Retardante Um complexo mecanismo equilibra recipientes cheios de lama pegajosa, que é derramada sobre os passantes. Criaturas em um raio de 3m ficam enredadas até remover a lama; fazer isso demora 1 minuto.
Reflexos CD 17 evita; Investigação CD 17; Ladinagem CD 20; ND ¼.
Barril de Bugulentos Um barril repleto de “bugulentos” (para os kobolds, qualquer tipo de inseto venenoso) se derrama sobre uma criatura. A vítima perde 1d12 pontos de vida por veneno quando a armadilha é acionada e no início de cada um de seus turnos, até se livrar dos bugulentos, o que exige uma ação completa e passar em um teste de Destreza (CD 10). Os bugulentos também são eliminados se a vítima ficar em chamas. Reflexos CD 20 evita; Investigação/Ladinagem CD 20; ND ½.
Besunte Galinificador Essencialmente um barril cheio de um líquido viscoso misturado a penas de galinha, que se derrama sobre uma criatura. Uma armadilha extremamente humilhante, faz com que os kobolds se encham de coragem para enfrentar a vítima. Todos os kobolds recebem +2 em testes de perícia e rolagens de dano contra a vítima enquanto ela estiver coberta pelas penas (removê-las demora 1 minuto). Surpreendentemente, deixar a vítima em chamas também resolve. Reflexos CD 20 evita, Investigação/Ladinagem CD 20; ND ½.
Tronco de Árvore Simples e prática, é um atestado da “genialidade” kobold. Um tronco desce como um aríete atingindo uma linha de 6m. Criaturas nessa área sofrem 4d6 pontos de dano de impacto e ficam caídas. Reflexos CD 20 reduz o dano à metade e evita a condição; Investigação/Ladinagem CD 20; ND 1.
Virote Ardido Um virote lambuzado com uma pasta corrosiva atinge um dos personagens. A vítima sofre 2d6 pontos de dano de perfuração mais 2d6 pontos de dano de ácido; Reflexos CD 25 evita; Investigação CD 25; Ladinagem CD 20; ND 1. Além das apresentadas aqui, kobolds usam as armadilhas fosso camuflado, rede e fosso profundo (veja Tormenta20, p. 317).` },
        { titulo: "Kobold",
          texto:
`“Está enganado. Kobolds são incapazes de pensamento individual. Alguém os controla.”
— Domenika, golem clériga de Tanna-Toh
São pouco mais de uma dúzia. Nenhum dos pequenos monstros chega a mais de um metro. Cabeça alongada, focinho proeminente, meio lagarto, meio cão. Pele escamada, variando entre o verde e vermelho. Orelhas minúsculas, pontudas. Pequenos chifres. Caudas curtas. Pouca ou nenhuma roupa. Barulhentos, frenéticos, latindo seu idioma estranho. Um kobold mediano é muito menor e mais fraco que um humano; mesmo um camponês armado com uma ferramenta agrícola pode derrotar um deles. No entanto, assim como acontece com lobos, é muito raro encontrar um kobold solitário. Eles sempre andam em grupos. Um típico grupo kobold é composto por seis ou mais indivíduos. Kobolds fazem suas emboscadas em florestas fechadas e outros lugares escuros, pois odeiam a luz do dia. Ele não “caçam” no sentido mais conhecido — são covardes demais para isso. Sua estratégia típica é preparar armadilhas em pontos de passagem e então aguardar de tocaia por toda a volta. Assim que uma vítima cai na armadilha, eles atacam. Começam a luta atirando com suas fundas, chegando mais perto apenas quando os inimigos estão enfraquecidos. Se percebem a qualquer momento que não estão mais em larga vantagem, os restantes fogem.
Clérigos de Kallyadranoch costumam invocar kobolds em seu auxílio, ou mantê-los como guardas. Alguns dragões, especialmente os jovens, usam kobolds como servos; os adultos apenas permitem que eles rondem seu covil, eliminando ameaças menores. Há ainda quem adote um kobold como aliado.` },
        { titulo: "Quem Não Tem Cão Caça com Kobold",
          texto:
`Embora kobolds sejam normalmente considerados pestes, sob as circunstâncias certas um kobold solitário pode ser convencido a ajudar um aventureiro. Tal kobold pode servir como um parceiro especial (combatente) que fornece os benefícios a seguir. Iniciante: você recebe +1 em testes de ataque e rolagens de dano contra inimigos que esteja flanqueando (para um total de +3 de ataque). Veterano: os bônus acima aumentam para +2. Mestre: você pode flanquear mesmo criaturas que não podem ser flanqueadas.` },
        { titulo: "Qualquer Kobold Pode Explodir",
          texto:
`O kobold explosivo descrito aqui é apenas um exemplo de kobold que acumulou energia arcana suficiente para se tornar uma bomba ambulante. Mas, na prática, qualquer dessas criaturinhas pode ser explosiva. Você pode transformar qualquer ficha de kobold em sua versão explosiva concedendo a habilidade Detonação Final. Se fizer isso, o ND da criatura aumenta em +1 (apenas para efeitos de experiência).
Detonação Final Quando o kobold é reduzido a 0 PV, role 1d6: com um resultado 1 ou 2, ocorre uma explosão. Todas as criaturas a até 3m sofrem 4d6 pontos de dano de impacto, +2d6 para cada patamar acima de iniciante do kobold (Ref CD baseada no ND reduz à metade, veja a página 383).` },
        { titulo: "Vagalhão Kobold",
          texto:
`“Estão vindo de todos os lados! Não acabam! Khalmyr e Tenebra, os malditos nunca acabam!”
— Germound Vandillimm, anão cavaleiro
Então eles surgem. Preenchem tudo à volta, correm entre os cactos como uma inundação, chovem das alturas, brotam do próprio solo seco. Massas compactas de criaturas, quase indiscerníveis, quase compondo um único monstro rastejante e infinito. Enxames de pequenos humanoides de faces canídeas, em frenesi selvagem que nenhum ser racional poderia imitar. Um vagalhão kobold não é uma criatura, nem mesmo um enxame, mas um evento. Uma onda gigantesca, formada por números incalculáveis de kobolds. Capaz de preencher totalmente um aposento de masmorra, ou mesmo um mapa inteiro, não importando quão grande. Embora atue como um único e poderoso monstro, não se pode “combater” um vagalhão kobold, assim como não se combate uma tempestade, um terremoto ou uma erupção vulcânica. Aqueles engolfados pelo dilúvio de monstros podem apenas tentar sair do caminho ou fazer seu melhor para resistir. Conforme a lógica de que kobolds são mais astutos em grandes números, o vagalhão também é inteligente. Sabe usar seus melhores poderes e manobras contra os alvos mais vulneráveis. Ainda, tentará tomar de suas vítimas os itens mágicos mais poderosos; mesmo um aventureiro épico pode ter sua melhor arma mágica arrancada de suas mãos pela correnteza de criaturas. Vagalhões ocorrem com frequência apenas em algumas regiões de Drashantyr, o Reino de Kallyadranoch. Originam-se a partir de uma kobold-mãe. Nenhum vagalhão aconteceu em Arton… ainda. O grupo enfrenta uma onda gigantesca, formada por uma infinidade de kobolds.
Objetivo. Sobreviver ao frenesi selvagem. A passagem do vagalhão dura 1d8+6 rodadas; após esse período, os kobolds se dispersam e retornam para o ninho com o que quer que tenham conseguido.
Efeito. No início de seu turno, cada personagem deve fazer um teste de Fortitude para evitar ser engolfado pelo vagalhão (se estiver caído, falha automaticamente). Se falhar, sofre 12d12 pontos de dano de corte. Se falhar por 5 ou mais, sofre o dano e fica caído. A CD é 40+1d10 (role uma vez no início de cada rodada e aplique a mesma CD para todos os personagens). Criaturas que sofram dano do vagalhão têm sua armadura avariada. Se o alvo não usa armadura, em vez disso sofre +2d12 pontos de dano. No fim de cada rodada, role 1d6 para cada item mágico vestido ou empunhado por cada personagem (ou 1d4 se o personagem estiver caído). Num resultado 1, o item é roubado pelo vagalhão. O item pode ser encontrado após o vagalhão se dispersar com um teste de Sobrevivência (CD 35 + a duração do vagalhão em rodadas). Contudo, há 25% de chance de estar destruído.
O vagalhão conta como um enxame (é imune a manobras de combate e efeitos que afetam apenas uma criatura e não causam dano, sofre apenas metade do dano de ataques com armas e tem vulnerabilidade a dano de área). Se ele sofrer 600 pontos de dano ou mais na mesma rodada, sua duração é reduzida em 1 rodada e, na próxima rodada, seu dano é reduzido à metade e ele não avaria nem rouba itens. Os personagens têm direito a um teste de Percepção (CD 35) para notar a aproximação do vagalhão. Quem passar pode realizar uma ação adicional em sua primeira rodada.
Atacar. O personagem usa uma ação agredir contra o vagalhão (Defesa 50). O personagem sofre –5 em testes de ataque à distância e, para cada ataque corpo a corpo que errar, sofre 4d12 pontos de dano de corte. Conjurar (Vontade CD 35 + custo em PM da magia). O personagem tenta lançar uma magia. Se falhar no teste, a magia não funciona, mas os PM são gastos da mesma forma.
Esconder Item (Ladinagem CD 35). O personagem se concentra em proteger seus itens. No fim da rodada, ele rola 1d10, em vez do dado normal, para determinar se um item é roubado.
Latir (Atuação ou Enganação CD 35). O personagem tenta se passar por um kobold. Se passar no teste, na próxima rodada não sofre dano e seus itens não são danificados nem roubados, mas é gradualmente envolvido pelo vagalhão, sofrendo uma penalidade cumulativa de –1 em todos os testes de perícia.
Levantar-se (Atletismo ou Acrobacia CD 35). Um personagem caído tenta se livrar da massa de kobolds em cima dele. Se passar, se levanta.
Proteger-se (Nenhum teste). O personagem se defende e recebe +5 no próximo teste de Fortitude contra o vagalhão.
Ajudar (Varia). O personagem faz um teste para ajudar (veja Tormenta20, p. 221) um aliado. O jogador pode usar qualquer perícia que conseguir justificar — Atletismo para proteger um aliado, Percepção para ver qual a melhor direção para atacar etc.` },
      ],
    },

    // ── 🐾 MASCOTES & FAMILIARES ───────────────────────
    {
      chave: "mascotes", nome: "Mascotes & Familiares", icone: "🐾", cor: "#2f7a7a",
      intro: "Seja durante viagens por terras estranhas, seja em visita a bazares extraordinários, ou ainda como recompensa por uma missão, não é raro que heróis acabem adotando mascotes tão peculiares quanto eles próprios. Seres que normalmente causariam estranheza, mas que pouco incomodam um aventureiro já habituado a uma vida cheia de experiências únicas. Muitos desses bichos podem ser horrendos, até perigosos, mas também úteis. Conjuradores os adotam como familiares — animais mágicos que amplificam poderes arcanos ou oferecem outras habilidades. Caçadores aproveitam seus sentidos aguçados para localizar suas presas, ladinos os utilizam como mensageiros e espiões, bucaneiros gostam do colorido que emprestam a seus navios. Arton é povoada por um sem-número de criaturinhas prestativas que, no pior dos casos, fazem companhia ao herói entediado que monta guarda no acampamento enquanto os colegas dormem. Embora todas as criaturas a seguir possam se aliar a aventureiros, lembre-se que também podem ser adversários — existindo em estado selvagem, em grandes números ou a serviço de inimigos.",
      fichas: [
        {
          chave: "bogum", nome: "Bogum", nd: "1/2", tipo: "Construto Minúsculo",
          papel: '',
          resumo: "O que parecia apenas um pequeno amontoado de folhas subitamente se move.",
          texto:
`Bogum ND 1/2
“Sim, eu mesma o fiz. Com presentes da deusa. Não, ele não morde, deixa de ser besta!”
— Rosalinda de Allihanna, dahllan druida
O que parecia apenas um pequeno amontoado de folhas subitamente se move. Ergue-se sobre duas perninhas de galhos, distende dois bracinhos de gravetos. Olhinhos brilham sob a concha de caramujo que lhe serve de cabeça. O bogum é um pequeno construto feito de materiais naturais como gravetos, cascas, conchas e ossos. Após ser fabricado por um druida, este faz preces adequadas para Allihanna; caso a Deusa da Natureza atenda, a criatura ganha vida, tornando-se um servo leal a seu mestre. O bogum não fala, mas entende seu criador. É fraco em combate, sendo mais utilizado para entregar mensagens, espionar, vigiar uma área ou seguir furtivamente um alvo. Por ser pequeno e feito de matéria natural, é muito difícil percebê-lo em meio à vegetação. É usado por druidas para espionar a uma distância segura; em grupos de aventureiros, usar o bogum como batedor pode ser prudente, apesar do risco para o pequenino. Se forçado a lutar, o bogum expele um veneno urticante que causa ardência, ou mesmo cegueira caso atinja os olhos.
Construto Minúsculo
Iniciativa +2, Percepção +5, visão no escuro
Defesa 11, Fort –1, Ref +5, Von +2, natureza vegetal
Pontos de Vida 5
Deslocamento 6m (4q)
Corpo a Corpo Galho +7 (1d3+2 impacto).
À Distância Cuspe venenoso +9 (1d4+7 ácido mais veneno, alcance curto).
Veneno Veneno urticante (cego e vulnerável por 1 rodada, Fort CD 13 evita).
For –3, Des 2, Con 0, Int –4, Sab 1, Car –3
Perícias Furtividade +9, Sobrevivência +7.
Tesouro Nenhum.
Parceiro O bogum é um parceiro especial (companheiro animal), exclusivo de druidas, que fornece os benefícios a seguir. Iniciante: você forma um elo mental com o bogum (semelhante ao de um arcanista com seu familiar) e recebe +2 em Percepção e Sobrevivência. Veterano: uma vez por rodada, você recebe +1d6 de ácido em uma rolagem de dano. Mestre: o bogum fornece também o benefício de um dedo de ente (veja Tormenta20, p. 160).`
        },
        {
          chave: "escudeiro", nome: "Escudeiro", nd: "1/2", tipo: "Animal Pequeno",
          papel: '',
          resumo: "Os elfos-do-mar erguem-se das águas e avançam como guerreiros furiosos.",
          texto:
`Escudeiro ND 1/2
“Viu aquele escudo no braço do elfo-do-mar? Pois digo que não é um escudo!”
— Burwenna de Deheon, humana guerreira
Os elfos-do-mar erguem-se das águas e avançam como guerreiros furiosos. Empunham estranhos escudos feitos de carapaça, com lanças que lembram ferrões. Olhando melhor, seus escudos são na verdade um tipo de grande crustáceo agarrado ao braço! Sereias e tritões dizem que este animal foi um presente do deus Oceano para seus melhores guerreiros. Isso pode ser verdade, uma vez que os estudiosos não conseguem encontrar nenhuma outra explicação para a existência de tão estranha criatura. O escudeiro é um grande crustáceo de forma achatada, similar a um caranguejo, do tamanho de um escudo médio. Tem duas pinças, quatro patas e uma longa cauda segmentada, com dentes e uma ponta afiada em forma de lança. Sozinho, o animal é quase inofensivo — ataca apenas em defesa própria, chicoteando com a cauda. A criatura mostra seu verdadeiro potencial quando domesticada: a um comando do dono, agarra-se a seu braço como um escudo vivo. Além disso, a cauda enrijece e pode ser usada como lança curta. Um lutador habilidoso pode usá-lo para atacar e se defender ao mesmo tempo. Quando não é empunhado em combate, o escudeiro por vezes pendura-se às costas do mestre quando em terra, ou nada a seu lado na água. Quando afastado da água por muitos dias, o animal entra em hibernação e não pode mais ser usado como arma-escudo, revivendo apenas após mergulhar.
Animal Pequeno
Iniciativa +3, Percepção +3, visão na penumbra
Defesa 15, Fort +6, Ref +3, Von –1
Pontos de Vida 14
Deslocamento 9m (6q), natação 9m (6q)
Corpo a Corpo Cauda +9 (1d6+7, x3).
For 0, Des 1, Con 1, Int –3, Sab 1, Car –3
Tesouro Carapaça óssea (CD 15 para extrair; vale T$ 50 para fabricar um escudo superior).
Parceiro O escudeiro é um parceiro especial (fortão) que fornece os benefícios a seguir. Iniciante: você pode empunhar o escudeiro como uma lança e um escudo pesado na mesma mão; você pode atacar com a lança sem perder o bônus na Defesa com o escudo, mas não pode atacar com ela e o escudo na mesma rodada. Veterano: o escudeiro recebe uma melhoria de arma ou de escudo (exceto material especial). Mestre: o escudeiro recebe uma segunda melhoria de arma ou de escudo (exceto material especial).`
        },
        {
          chave: "fofo", nome: "Fofo", nd: "1/2", tipo: "Monstro Minúsculo",
          papel: '',
          resumo: "O bicho lembra uma massa de pão, tanto na consistência quanto na cor.",
          texto:
`Fofo ND 1/2
“Mas onde foi que guardei a engenhoca? Ora, ora…”
— Zimbro, goblin inventor
O bicho lembra uma massa de pão, tanto na consistência quanto na cor. É quente e macio ao toque. Não tem olhos ou feições reconhecíveis, mas muda continuamente de forma, representando figuras familiares; parece estar tentando se comunicar! Aventureiros experientes sabem temer certas criaturas amorfas, gelatinosas, que rastejam pelas masmorras devorando tudo em seu caminho. Existe, contudo, uma variedade inofensiva e facilmente domesticável destes seres. Estudiosos preferem chamá-lo de “plasmoide doméstico”, mas o nome popular é bem mais adequado: fofo. Um fofo pode produzir tentáculos para manipular objetos ou moldar seu corpo em formas variadas: uma tenda, travesseiro, saco de dormir, chapéu — qualquer objeto que não seja muito rígido, como ferramentas ou armas. Tem movimentos rápidos e, com sua elasticidade, pode se esquivar de quase qualquer coisa. Mesmo quando atingido, sua resistência e consistência evitam grande parte do dano. Por tudo isso, o fofo consegue às vezes proteger o dono de ataques especialmente cruéis. Fofos são muito afetuosos, apreciam o toque e calor do corpo humano. À noite podem se esgueirar para a cama do dono, enfiando-se sob o cobertor (ou substituindo-o). Produzem um ruído característico, parecido com “brl-brl-brl”.
Monstro Minúsculo
Iniciativa +4, Percepção +5, percepção às cegas
Defesa 10, Fort +7, Ref +2, Von +0, redução de dano 10
Pontos de Vida 8
Deslocamento 6m (4q)
Corpo a Corpo Pancada x2 +7 (1d4+4).
For 0, Des 2, Con 5, Int –4, Sab 2, Car –1
Tesouro Nenhum.
Parceiro O fofo é um parceiro especial (guardião) que fornece os benefícios a seguir. Iniciante: você recebe redução de dano 1. Veterano: a RD aumenta para 2 e você pode vestir um item que ocupe 1 espaço ou menos sem contar em seu limite de itens vestidos. Mestre: a RD aumenta para 3.`
        },
        {
          chave: "gamba", nome: "Gambá", nd: "1/2", tipo: "Animal Minúsculo",
          papel: '',
          resumo: "O pequeno animal é pouco maior que um gato, com pelagem manchada de preto e branco, e uma cauda longa e escamosa.",
          texto:
`Gambá ND 1/2
“Amigos, enfim consegui um bichinho! Amigos? Cadê todo mundo?”
— Cynebold, golem bárbaro
O pequeno animal é pouco maior que um gato, com pelagem manchada de preto e branco, e uma cauda longa e escamosa. Quando você se aproxima, ele dá as costas para apontar o traseiro em sua direção e ergue a cauda… O gambá é um pequeno mamífero que se alimenta de frutinhas e insetos. Nunca ataca criaturas maiores, exceto se ameaçado. Neste caso, volta sua traseira para o alvo e levanta a cauda em sinal de aviso. Caso isso não funcione, expele um jato fétido, que é ainda mais insuportável para criaturas de olfato aguçado. Quando não utiliza sua famosa arma química, um gambá não cheira de modo especial. São marsupiais — a mãe carrega os filhotes em uma bolsa. A cauda preênsil serve para ajudar na escalada de árvores e se agarrar em galhos, permitindo ao animal se pendurar de cabeça para baixo enquanto vigia os arredores. Alguns aventureiros adotam o gambá como parceiro, especialmente os mais reclusos. Ou trogs.
Animal Minúsculo
Iniciativa +2, Percepção +7, faro, visão na penumbra
Defesa 10, Fort +3, Ref +5, Von +0
Pontos de Vida 8
Deslocamento 9m (6q), escalada 9m (6q)
Corpo a Corpo Mordida +8 (1d4+6).
Almíscar Fedorento (Padrão) O gambá expele um jato de almíscar contra uma criatura em alcance curto, que fica enjoada por 1d4 rodadas (Fort CD 13 evita; criaturas com Faro ou Sentidos Aguçados sofrem –5 nesse teste).
For 0, Des 2, Con 2, Int –4, Sab 3, Car –2
Tesouro Nenhum.
Parceiro O gambá é um parceiro especial (vigilante) que fornece os benefícios a seguir. Iniciante: você recebe +2 em Iniciativa e Percepção. Veterano: você pode gastar uma ação de movimento e 1 PM para deixar uma criatura em alcance curto enjoada por 1d4 rodadas (Fort CD Sab evita). Mestre: os bônus em perícias aumentam para +5.`
        },
        {
          chave: "homunculo", nome: "Homúnculo", nd: "1", tipo: "Construto Minúsculo",
          papel: '',
          resumo: "Você desperta a tempo de ver algo próximo de seu travesseiro algo pequeno e demoníaco.",
          texto:
`Homúnculo ND 1
“Estou dizendo, o maldito documento estava bem ali! Ninguém poderia ter entrado!”
— Rewald Darvelore, humano mercador de Vectora
Você desperta a tempo de ver algo próximo de seu travesseiro algo pequeno e demoníaco. Lembra uma estatueta grotesca, feita de ônix ou outro mineral escuro. Tem a aparência de um demônio diminuto, com asas de morcego e gemas amarelas nos olhos. Na ponta da cauda longa há um ferrão gotejando algo que exala filetes de vapor. Homúnculos são pequenos golens de natureza abissal. São utilizados por conjuradores como espiões, mensageiros ou mesmo assassinos — a criatura possui um ferrão venenoso, tipicamente usado em vítimas adormecidas. Embora o aspecto de gárgula ou demônio seja mais comum, um homúnculo pode ter qualquer aparência. Alguns parecem humanos, anões, hynne ou fadas, enquanto outros lembram animais ou monstros. Podem ser figuras graciosas, como uma boneca ou um bichinho fofo ou, ainda, ter a forma de objetos comuns, como uma taça, candelabro ou caixinha — com braços e pernas que se manifestam apenas quando utilizados. Qualquer que seja sua forma, todos podem voar. Quando descoberto, um homúnculo evita o combate e tenta fugir para seu mestre, exceto quando é ordenado a lutar. Nesse caso ele ataca à distância, expelindo dardos envenenados. Homúnculos não sabem falar, nem pensar, apenas seguindo ordens de seu controlador. Os materiais para construí-los são ainda mais raros e estranhos que aqueles necessários para um golem normal, incluindo alguns existentes apenas nos reinos dos deuses. Apesar de sua origem demoníaca, conjuradores heroicos também os utilizam como ajudantes ou familiares.
Construto Minúsculo
Iniciativa +6, Percepção +4, visão no escuro
Defesa 14, Fort +8, Ref +5, Von +3
Pontos de Vida 11
Deslocamento 9m (6q), voo 9m (6q)
Corpo a Corpo Ferrão venenoso +11 (1d4+6 corte mais veneno).
À Distância Dardo venenoso +11 (1d3+4 perfuração mais veneno, alcance curto).
Veneno Peçonha comum (perde 1d12 pontos de vida, Fort CD 16 evita).
For –1, Des 2, Con 2, Int –, Sab 0, Car –1
Perícias Furtividade +9, Ladinagem +6.
Tesouro 1d4 doses de peçonha comum (CD 16 para extrair).
Familiar O homúnculo fornece +1 PM para gastar em aprimoramentos sempre que você lança uma magia de transmutação ou veneno.
Parceiro O homúnculo é um parceiro especial (ajudante) que fornece os benefícios a seguir. Iniciante: seus venenos causam a perda de +1 PV por dado. Veterano: uma vez por rodada, quando faz um ataque, você pode gastar 1 PM. Se acertar o ataque, causa a perda de 1d12 PV por veneno. Mestre: a perda de PV aumenta para +2 por dado.`
        },
        {
          chave: "killBone", nome: "Kill’Bone", nd: "1/2", tipo: "Animal Médio",
          papel: '',
          resumo: "O animal parece um cão selvagem, mas com algum tipo de armadura óssea revestida de espinhos e uma longa cauda também espinhosa.",
          texto:
`Kill’Bone ND 1/2
“Viajar pelos túneis dos finntroll sem levar um destes é a marca do completo imbecil.”
— Laissara Modorimm, anã paladina de Khalmyr
O animal parece um cão selvagem, mas com algum tipo de armadura óssea revestida de espinhos e uma longa cauda também espinhosa. A cabeça ossuda lembra mais um crânio, os olhos pouco visíveis através de orifícios que lembram órbitas vazias. Este canídeo subterrâneo blindado é menor que um lobo comum, mas tão perigoso quanto. Pode atacar normalmente com a mordida ou rolar sobre o inimigo com seus espinhos. O animal é popular em Doherimm, onde acompanha grupos de patrulha nos túneis de acesso ao reino secreto, ajudando a farejar e atacar invasores. Kill’bones odeiam trolls, começam a rosnar furiosamente quando sentem seu cheiro, sendo mais uma razão para que os anões apreciem muito estes bichos. Em estado selvagem, kill’bones vivem em matilhas que caçam em masmorras e outros ambientes subterrâneos. Jamais atacam anões, podendo até ser amansados por estes com certa facilidade, mas são agressivos com outras criaturas.
Animal Médio
Iniciativa +5, Percepção +5 (+10 contra trolls), faro, visão no escuro
Defesa 14, Fort +5, Ref +3, Von +0
Pontos de Vida 8
Deslocamento 15m (10q)
Corpo a Corpo Mordida +8 (1d6+4).
Rolamento Ofensivo (Completa) O kill’bone se enrola em uma bola espinhosa e percorre até o dobro do seu deslocamento, passando por qualquer criatura no caminho (ele não pode passar duas vezes pelo mesmo espaço). Criaturas atropeladas dessa forma sofrem 2d6+4 pontos de dano de perfuração (Ref CD 13 reduz à metade). Recarga (movimento).
For 2, Des 3, Con 2, Int –4, Sab 3, Car –2
Perícias Sobrevivência +5 (+10 contra trolls).
Tesouro Nenhum.
Parceiro O kill’bone é um parceiro especial (perseguidor) que fornece os benefícios a seguir. Iniciante: você recebe faro e, uma vez por rodada, +1d6 em uma rolagem de dano corpo a corpo (o dano extra é dobrado contra finntroll e trolls). Veterano: o bônus em rolagens de dano muda para +1d8 e você recebe +2 em testes de perícia contra finntroll e trolls. Mestre: o bônus em rolagens de dano muda para +1d10 e você não pode ser flanqueado.`
        },
        {
          chave: "tentacute", nome: "Tentacute", nd: "1/2", tipo: "Animal Minúsculo",
          papel: '',
          subgrupo: "Tentacute",
          resumo: "Tentacute — O pequeno animal tem o mesmo tamanho e corpo felino de um gato comum.",
          texto:
`Tentacute ND 1/2
Animal Minúsculo
Iniciativa +9, Percepção +11, faro, visão na penumbra
Defesa 14, Fort +3, Ref +7, Von +0
Pontos de Vida 8
Deslocamento 9m (6q), escalada 9m (6q)
Corpo a Corpo Mordida +8 (1d4+4).
Curiosidade Larápia O tentacute pode fazer testes de Furtividade no lugar de Ladinagem para ocultar e punga.
Serelepe O tentacute pode fazer uma ação de movimento adicional por rodada, mas somente para se deslocar.
For –1, Des 5, Con 1, Int –3, Sab 4, Car –2
Perícias Furtividade +14.
Tesouro Nenhum.
Familiar Um tentacute familiar pode ser usado, uma vez por rodada, para sacar ou guardar um item, ou para pegar um item solto Pequeno ou menor (1 espaço ou menos) em alcance curto e que ele consiga alcançar.
Parceiro O tentacute é um parceiro especial (vigilante) que fornece os benefícios a seguir. Iniciante: você recebe +2 em Percepção e, quando faz um teste de Ladinagem para punga, pode rolar dois dados e usar o melhor resultado. Veterano: uma vez por rodada, você pode gastar uma ação de movimento e 1 PM para fazer um teste de Ladinagem para punga contra um alvo em alcance curto que possa ser alcançado pelo tentacute. Mestre: o bônus em Percepção se torna +4 e o alcance da punga muda para médio.`
        },
        {
          chave: "tropaDeTentacutes", nome: "Tropa de Tentacutes", nd: "2", tipo: "Animal Médio",
          papel: '',
          subgrupo: "Tentacute",
          resumo: "Tentacute — O pequeno animal tem o mesmo tamanho e corpo felino de um gato comum.",
          texto:
`Tropa de Tentacutes ND 2
Animal Médio
Iniciativa +10, Percepção +12, faro, visão na penumbra
Defesa 19, Fort +7, Ref +14, Von +3
Pontos de Vida 17
Deslocamento 9m (6q), escalada 9m (6q)
Corpo a Corpo [Bando] Mordida +13 (1d4+4).
Cacofonia Criaturas em alcance curto da tropa de tentacutes sofrem –2 em testes de perícias e são consideradas em condição ruim para lançar magias. Sentidos.
Curiosidade Larápia A tropa pode fazer testes de Furtividade no lugar de Ladinagem para ocultar e punga.
Mãozinhas Marotas (Padrão) A tropa faz 1d6 testes de punga contra criaturas adjacentes (ela pode fazer mais de um teste contra a mesma criatura, para objetos diferentes).
Serelepe A tropa pode fazer uma ação de movimento adicional por rodada, mas somente para se deslocar.
For 0, Des 5, Con 1, Int –3, Sab 4, Car –2
Perícias Furtividade +10.
Tesouro Nenhum.`
        },
        {
          chave: "verilemur", nome: "Verilêmur", nd: "1/2", tipo: "Animal Minúsculo",
          papel: '',
          subgrupo: "Verilêmur & Malafex",
          resumo: "Verilêmur & Malafex — O que parece um corvo com manchas brancas crocita furiosamente contra outro pequeno animal que lembra um macaco, mas com focinho de raposa…",
          texto:
`Verilêmur ND 1/2
Animal Minúsculo
Iniciativa +4, Percepção +7, faro, visão na penumbra
Defesa 13, Fort +0, Ref +3, Von +5
Pontos de Vida 12
Deslocamento 9m (6q)
Corpo a Corpo Mordida +7 (1d4+6).
✦ Aura de Ordem O verilêmur emana uma aura de ordem com 9m de raio. Criaturas que comecem seu turno dentro da aura sofrem –10 em Acrobacia, Enganação, Furtividade e Ladinagem, não podem mentir deliberadamente e seus efeitos de encantamento, ilusão e transmutação são dissipados (Von CD 15 reduz a penalidade para –5, permite mentir e não dissipa os efeitos).
For 0, Des 2, Con 1, Int –4, Sab 3, Car –1
Perícias Intuição +10.
Tesouro Nenhum.
Parceiro (apenas devotos de Khalmyr) O verilêmur é um parceiro especial (vigilante) que fornece os benefícios a seguir. Iniciante: você pode lançar a magia Círculo da Justiça (atributo-chave Sabedoria); se aprender essa magia, seu custo diminui em –1 PM. Veterano: quando falha em um teste de resistência contra uma magia, você pode gastar 2 PM para rolar novamente esse teste (apenas uma vez por teste). Mestre: a CD para resistir à sua magia Círculo da Justiça aumenta em +5.`
        },
        {
          chave: "malafex", nome: "Malafex", nd: "1/2", tipo: "Animal Minúsculo",
          papel: '',
          subgrupo: "Verilêmur & Malafex",
          resumo: "Verilêmur & Malafex — O que parece um corvo com manchas brancas crocita furiosamente contra outro pequeno animal que lembra um macaco, mas com focinho de raposa…",
          texto:
`Malafex ND 1/2
Animal Minúsculo
Iniciativa +6, Percepção +7, visão na penumbra
Defesa 13, Fort +2, Ref +6, Von +2
Pontos de Vida 13
Deslocamento 3m (2q), voo 18m (12q)
Corpo a Corpo Garras +5 (1d4+6, 18).
Inverter Sorte Sempre que outra criatura, exceto devotos de Nimb, em alcance médio do malafex faz um teste, se o d20 rolar um valor par, o resultado do teste será o contrário do obtido: um sucesso será uma falha e uma falha será um sucesso. O malafex pode desativar essa habilidade à vontade e não há como saber se ela está ativa ou não antes de fazer o teste.
Mergulho Quando faz uma investida alada, o malafex pode continuar se movendo depois do ataque. Ele deve se mover em linha reta e seu movimento máximo ainda é limitado ao dobro do seu deslocamento.
For –2, Des 3, Con 1, Int –4, Sab 3, Car 2
Perícias Furtividade +10, Sobrevivência +5.
Tesouro Nenhum.
Parceiro (apenas devotos de Nimb) O malafex é um parceiro especial (ajudante) que fornece os benefícios a seguir. Iniciante: você pode usar Sorte dos Loucos. Se já tiver esse poder, a perda de PM é reduzida para 1d4. Veterano: você pode usar Sorte dos Loucos em aliados voluntários em alcance curto (caso falhe, o aliado perde os PM). Mestre: quando um inimigo em alcance curto faz um teste, você pode gastar 2 PM para forçá-lo a rolar novamente o dado. Se ainda assim ele passar, você perde 1d6 PM (ou 1d4 se tiver Sorte dos Loucos).`
        },
      ],
      regras: [
        { titulo: "Aprimorando Escudeiros",
          texto:
`Embora possam ser empunhados como armas, escudeiros são criaturas vivas e não objetos que podem ser modificados por meio de artesanato. Assim, as melhorias que um parceiro escudeiro recebe representam seu aprendizado e sua experiência, não mudanças em sua anatomia. Entretanto, a critério do mestre, um escudeiro poderoso o suficiente pode ser aprimorado magicamente. Em termos de regras, um escudeiro mestre pode receber os benefícios de um encanto de arma ou de escudo. Para isso, o personagem precisa encontrar alguém capaz de encantar itens desses tipos, ou obter os benefícios de um encanto como pagamento de uma entidade poderosa ou recompensa de uma aventura ou missão.` },
        { titulo: "Homúnculos e Inventores",
          texto:
`Um inventor com o poder Homúnculo aprende a criar uma versão alquímica desses seres, que atua como um parceiro ajudante iniciante. Entretanto, a critério do mestre, o inventor pode substituir o tipo ajudante pela habilidade de parceiro iniciante do homúnculo descrito aqui. Demais habilidades da criatura permanecem como descrito no poder Homúnculo (veja Tormenta20, p. 69).` },
        { titulo: "Tentacute",
          texto:
`“Não é o bichinho mais lindo neste mundo? Não, claro que não vamos comê-lo, ora essa!”
— Soraya Sheppard, qareen arcanista
O pequeno animal tem o mesmo tamanho e corpo felino de um gato comum. As maiores diferenças são os olhos telescópicos, como olhos de caracol; a concha em forma de capacete sobre a cabeça, e a cauda longa em forma de tentáculo de polvo, com ventosas e tudo. Nas florestas que habita, o tentacute ocupa o mesmo nicho dos esquilos: passa o dia colhendo nozes, avelãs e outros frutos secos para guardar em sua toca. Ele não teme seres inteligentes — pelo contrário, gosta de observá-los de perto. Infelizmente, pode ser atraído por objetos pequenos e brilhantes, como moedas ou gemas preciosas, que ele rouba e esconde na toca (quase sempre no alto de uma árvore). Graças a sua grande agilidade e velocidade nas árvores, bem como a cauda que auxilia em escaladas, é muito difícil perseguir um tentacute. Por sua visão muito aguçada, druidas e caçadores o apreciam como animal de guarda.` },
        { titulo: "Tentacutes me Mordam!",
          texto:
`Tentacutes possuem diversas similaridades com micos, saguis e outros pequenos primatas. Assim, suas estatísticas podem ser usadas para representar essas pequenas criaturas, tanto como ameaças quanto como parceiros.` },
        { titulo: "Verilêmur & Malafex",
          texto:
`“Mas essa moeda PRECISA cair com a outra face para cima ALGUM DIA!”
— Aldrida Cynwise, sílfide bucaneira
O que parece um corvo com manchas brancas crocita furiosamente contra outro pequeno animal que lembra um macaco, mas com focinho de raposa e uma longa cauda. O confronto dos bichinhos poderia ser uma cena divertida. Mas, para o observador atento, algo assombroso está ocorrendo — uma batalha entre os próprios deuses, entre as forças da Ordem e do Caos! Entre as bênçãos oferecidas pelos deuses a seus devotos mais leais, não é incomum que estes sejam presenteados com animais mágicos sagrados — uma honra e também uma responsabilidade enorme. Quando se trata de Khalmyr e Nimb, estes pequenos companheiros são também forças vivas da Ordem e do Caos. O verilêmur, também conhecido como “protetor da Ordem”, é um pequeno mamífero de hábitos noturnos que se alimenta de frutas e insetos. Animal sagrado de Khalmyr, emana uma aura de ordem que afeta as chances ao seu redor, diminuindo a instabilidade, a desordem e a mentira. Dentro dessa área será mais difícil para qualquer criatura mentir ou usar qualquer poder ou magia de ilusão, invisibilidade, influência ou controle da mente. Dentro da aura de ordem, uma criatura magicamente transformada reverte à forma verdadeira. Magias e poderes de teletransporte, transporte planar e alteração da realidade também podem falhar. Quanto mais animais presentes, menores a chances de que estes efeitos ocorram; um grande bando pode, de fato, torná-los impossíveis exceto para deuses. Verilêmures podem ser mantidos em áreas de acesso restrito (para revelar intrusos disfarçados), tribunais e salas de interrogatório (para evitar mentiras) ou prisões (para evitar fugas por teletransporte). Certos vilões também os empregam para evitar que heróis usem seus poderes. Matar um destes animais atrai a ira de Khalmyr: pelo resto da vida o criminoso não será capaz de mentir, nem usar quaisquer dos poderes anulados pelo animal. Seu inimigo natural, como esperado, é um animal sagrado de Nimb — o malafex, ou “pássaro do Caos”. Devotos dizem que estas aves são puras manifestações do acaso, da sorte e do azar, trazendo consigo o imprevisível e o inesperado. A presença de um ou mais deles distorce as leis naturais da área, trocando a sorte pelo azar. Coisas que deveriam dar certo dão errado e vice-versa. Assim, um combatente extremamente habilidoso errará a maioria de seus golpes, enquanto um novato incompetente acertará o tempo inteiro! Sabe-se de grupos de aventureiros que pereceram em batalhas quase ganhas, simplesmente porque um malafex surgiu de repente e virou a maré da sorte. Devotos de Nimb parecem ser os únicos imunes a esse poder, sendo comum adotarem uma destas aves como mascote. A domesticação diminui drasticamente essa habilidade, mas mesmo assim será algo inconveniente para eventuais companheiros… Da mesma forma que seu rival, malafex são protegidos por Nimb. Matar um deles, mesmo por acidente, atrai sobre o criminoso uma maldição — que mudará a cada vez. Sabe-se de uma vítima que, todas as manhãs, despertava apaixonada por uma criatura diferente.` },
        { titulo: "Novo Perigo: Lágrimas de Hyninn",
          texto:
`Uma praga que por vezes recai sobre mentirosos, traidores e aqueles que maltratam os animais sagrados de Khalmyr. Aquele que é afligido por essa maldição não pode mais mentir e se torna desajeitado, tendo dificuldade em executar ações que dependam de subterfúgio; a vítima sofre –10 em Acrobacia, Enganação, Furtividade e Ladinagem. A única forma de remover essa maldição é através de um Rito de Penitência (veja Religião, em Tormenta20, p. 122) executado por um clérigo de Khalmyr. Esse rito, entretanto, só é realizado mediante uma prova de que o amaldiçoado se arrependeu de suas mentiras e trapaças.` },
        { titulo: "Novo Perigo: Maldição do Caos",
          texto:
`O malafex é uma criatura sagrada, protegida por Nimb. Matar um deles, mesmo por acidente, atrai sobre o infrator uma maldição terrível — de resultados imprevisíveis. A vítima é afetada por um efeito aleatório da magia Rogar Maldição, sem direito a teste de resistência. Role 1d4 para determinar o efeito da maldição: 1) debilidade, 2) doença, 3) fraqueza e 4) isolamento (veja Tormenta20, p. 204). No início de cada aventura em que a maldição persistir, role novamente seu efeito. A única forma de remover essa maldição é com um rito de penitência (veja Religião, em Tormenta20, p. 122) executado por um clérigo de Nimb. Ou não.` },
      ],
    },

    // ── 🏚 MASMORRAS ───────────────────────────────────
    {
      chave: "masmorras", nome: "Masmorras", icone: "🏚", cor: "#4a4a5a",
      intro: "Masmorra. Talvez nenhuma palavra em Arton tenha significados tão diversos. Masmorras são muito mais que calabouços ou redes de túneis e câmaras: são lugares de assombro, perigo e oportunidades. Redutos misteriosos, mágicos, que nem sempre seguem as mesmas regras do mundo exterior. Onde rondam monstros cuja própria existência é um insulto ao bom senso, um desafio à vontade dos deuses. Masmorras existem em todos os tamanhos e formas. Algumas são comuns, como uma mina abandonada servindo de esconderijo a goblins ou um templo em ruínas assombrado por zumbis. Outras têm origens fabulosas, como o gigantesco cadáver fossilizado de um monstro antigo, as entranhas de alguma máquina colossal ou uma construção erguida por seres de além-mundo. Tais antros acabam tomados como covis por criaturas perigosas, de aberrações bizarras a dragões majestosos. Arton tem masmorras célebres em abundância. A Velha Malpetrim. As Catacumbas de Leverick. Os caminhos para Doherimm. Os subterrâneos de Vectora. O Labirinto de Tapista. Até mesmo as vinte masmorras planares forjadas pelos deuses para a Libertação de Valkaria, ainda existentes e acessíveis por meios misteriosos. Para cada ruína famosa, há cem outras ainda por encontrar, anônimas, inexploradas, jamais pisadas por aventureiros. Mas certamente habitadas.",
      fichas: [
        {
          chave: "asaAssassina", nome: "Asa-Assassina", nd: "1", tipo: "Animal Minúsculo",
          papel: '',
          resumo: "As criaturas têm o aspecto de mariposas, mas são grandes como pássaros.",
          texto:
`Asa-Assassina ND 1
“Parecem mariposas grandes. Não temos tempo a perder. Ignorem.”
— Hyakunen, o Imortal (decapitado)
As criaturas têm o aspecto de mariposas, mas são grandes como pássaros. As asas abertas, de cores metálicas, produzem brilhos e sons afiados enquanto o bando voeja em sua direção. Estes perigosos insetos têm asas finas, mas cortantes, ainda mais afiadas que as melhores lâminas élficas. Mesmo o mais leve roçar causa talhos profundos, enquanto um golpe certeiro pode decapitar uma pessoa. Asas-assassinas se alimentam de frutas e insetos, refugiando-se em masmorras quando não estão procurando alimento. Atacam qualquer criatura que entre em seu território, voando em bandos ao redor da vítima, golpeando e sangrando-a até matar. Suas asas supostamente podem ser usadas na fabricação de armas superiores, ou como auxílio à conjuração de certas magias. Ainda, alguns conjuradores tomam estes animais como familiar.
Animal Minúsculo
Iniciativa +8, Percepção +4, visão na penumbra
Defesa 15, Fort +3, Ref +10, Von +3
Pontos de Vida 10
Deslocamento 3m (2q), voo 12m (8q)
Corpo a Corpo Asa afiada +10 (2d4+6 corte, 17/x3).
Asas Mortais Quando faz um acerto crítico em uma criatura, a asa-assassina tenta decepar a cabeça dela. A vítima fica inconsciente e sangrando (Fort CD 16 evita ambos). Este sangramento é cumulativo com aquele causado por ser reduzido a 0 PV ou menos; trate cada um separadamente. A critério do mestre, algumas criaturas, como certos construtos, mortos-vivos ou monstros com nenhuma ou várias cabeças, podem ser imunes a esta habilidade.
Mergulho Quando faz uma investida alada, a asa-assassina pode continuar se movendo depois do ataque. Ela deve se mover em linha reta e seu movimento máximo ainda é o dobro do seu deslocamento.
For –3, Des 4, Con 1, Int –4, Sab 2, Car –4
Tesouro Asas afiadas (CD 16 para extrair, vale T$ 100 para fabricar uma arma de corte superior).
Familiar Uma asa-assassina permite que você gaste 1 PM quando causa dano de corte ou perfuração a uma criatura para deixá-la sangrando.
Parceiro Uma asa-assassina é um parceiro especial (assassino) que fornece os benefícios a seguir. Iniciante: uma vez por rodada, quando causa dano com um ataque, você pode deixar a vítima sangrando. Veterano: a perda de PV pelo sangramento aumenta para 1d8. Mestre: a perda de PV aumenta para 2d8.`
        },
        {
          chave: "cocatriz", nome: "Cocatriz", nd: "3", tipo: "Monstro Pequeno",
          papel: '',
          subgrupo: "Cocatriz",
          resumo: "Cocatriz — O bicho parece um galo grande e muito feio, mas com duas caudas (ou três, difícil dizer) escamadas de serpente.",
          texto:
`Cocatriz ND 3
Monstro Pequeno
Iniciativa +10, Percepção +4, visão no escuro
Defesa 22, Fort +9, Ref +13, Von +5, evasão
Pontos de Vida 98
Deslocamento 6m (4q), voo 12m (8q)
Corpo a Corpo Bicada +14 (2d4+8 perfuração).
Bicada Petrificante Uma criatura que sofra dano da bicada da cocatriz fica lenta (Fort CD 19 evita). Se já estiver lenta, fica petrificada permanentemente. Efeitos que removem paralisia revertem a petrificação.
Voo de Galinha A cocatriz só consegue percorrer curtas distâncias voando; ela sempre termina seu movimento sobre o chão ou outra superfície firme.
For 0, Des 5, Con 1, Int –5, Sab 1, Car –2
Tesouro 1d4-1 ovos de cocatriz (cada ovo permite preparar uma refeição coc-au-triz).
Parceiro A cocatriz é um parceiro especial (adepto) que fornece os benefícios a seguir. Iniciante: suas habilidades mágicas que causam condições de movimento têm o custo reduzido em –1 PM. Veterano: a CD para resistir a essas habilidades aumenta em +2. Mestre: a redução de custo se torna cumulativa com outras reduções.`
        },
        {
          chave: "cocatrizReal", nome: "Cocatriz-Real", nd: "7", tipo: "Monstro Grande",
          papel: '',
          subgrupo: "Cocatriz",
          resumo: "Cocatriz — O bicho parece um galo grande e muito feio, mas com duas caudas (ou três, difícil dizer) escamadas de serpente.",
          texto:
`Cocatriz-Real ND 7
Monstro Grande
Iniciativa +17, Percepção +8, visão no escuro
Defesa 32, Fort +20, Ref +12, Von +7, evasão
Pontos de Vida 250
Deslocamento 6m (4q), voo 12m (8q)
Corpo a Corpo Bicada +24 (2d8+12 perfuração) e cauda de serpente +20 (1d8+10 impacto).
Bicada Petrificante Uma criatura que sofra dano da bicada da cocatriz-real fica lenta (Fort CD 26 evita). Se já estiver lenta, fica petrificada permanentemente. Efeitos que removem paralisia revertem a petrificação.
Voo de Galinha A cocatriz só consegue percorrer curtas distâncias voando; ela sempre termina seu movimento sobre o chão ou outra superfície firme.
For 2, Des 7, Con 3, Int –5, Sab 1, Car –2
Tesouro 1 dose de lágrima pétrea (CD 22 para extrair) e 1d4 ovos de cocatriz (cada ovo permite preparar uma refeição coc-au-triz).
Parceiro A cocatriz-real é um parceiro montaria (Grande) que fornece os benefícios a seguir. Iniciante: seu deslocamento muda para 12m e você ignora terreno difícil. Veterano: uma vez por rodada, quando acerta um ataque corpo a corpo, você pode fazer com que a vítima fique lenta (Fort CD For evita). Mestre: seu deslocamento muda para 12m (normal e de voo). Entretanto, quando voa, você deve terminar seu movimento sobre o chão ou outra superfície firme.`
        },
        {
          chave: "harpiaSaqueadora", nome: "Harpia saqueadora", nd: "4", tipo: "Monstro (harpia) Médio",
          papel: '',
          resumo: "O monstro lembra uma mulher humana, velha e sinistra como uma bruxa, com cabelo emaranhado e sujo de sangue.",
          texto:
`Harpia saqueadora ND 4
“Estamos sendo observados. Não, não é nenhuma sensação. Estão bem ali!”
— Allysen Naviere, humana inventora
O monstro lembra uma mulher humana, velha e sinistra como uma bruxa, com cabelo emaranhado e sujo de sangue. Tem a parte inferior do corpo, pernas e asas de um pássaro enorme, com penas marrons e imundas. A face feroz e a voz estridente chegam a amedrontá-los. Harpias são criaturas sádicas e malignas, que caçam não apenas para se alimentar, mas pelo regozijo de causar sofrimento e morte. São encontradas em masmorras, mas também espreitam comunidades humanas em busca de novas vítimas — especialmente crianças, que gostam de atormentar na presença dos pais. Não se sabe sobre a existência de harpias machos, nem se estes monstros têm formas naturais de procriação. Como outros seres mágicos, talvez seu nascimento seja alguma ocorrência sobrenatural ou simples desejo dos deuses. Também existe a teoria de que harpias machos são pequenos e fracos, mantidos confinados em cavernas secretas apenas como reprodutores. Harpias não usam roupas ou armadura, mas às vezes empunham armas com os pés. Preferem arcos e bestas, atacando à distância enquanto voam. No entanto, quando as vítimas já estão muito feridas, muitas vezes não resistem ao impulso assassino de mergulhar e acabar de matá-las com as próprias garras. Também é comum que capturem vítimas para torturá-las durante horas, ou mesmo dias, antes da refeição. Apesar de sua ferocidade incontrolável, harpias às vezes podem ser encontradas atuando como guardas ou capangas para vilões, sobretudo devotos de Megalokk. Dizem existir harpias heroicas, que acabam se reunindo a grupos de aventureiros — mas estas são incrivelmente raras.
Monstro (harpia) Médio
Iniciativa +13, Percepção +7, visão no escuro
Defesa 18, Fort +10, Ref +15, Von +5
Pontos de Vida 32
Deslocamento 9m (6q), voo 12m (8q)
Corpo a Corpo Maça +20 (1d8+11) e garra +20 (1d6+11) ou duas garras +20 (1d6+11).
Grito Aterrorizante (Padrão) A harpia saqueadora emite um grito estridente e apavorante. Criaturas em alcance curto ficam abaladas (Von CD 18 evita e a criatura não pode mais ser abalada por esta habilidade até o fim da cena).
Rasante (Completa) A harpia faz uma investida e ataca com sua maça e uma garra (ou com as duas garras, se estiver desarmada). Os dois ataques recebem o bônus de +2 da investida, mas devem ser feitos contra o mesmo alvo. Após o ataque, a harpia pode continuar seu movimento, até o limite de seu deslocamento.
For 1, Des 4, Con 2, Int –1, Sab 3, Car 2
Perícias Intimidação +8, Sobrevivência +9.
Equipamento Maça. Tesouro Nenhum.`
        },
        {
          chave: "glop", nome: "Glop", nd: "1/4", tipo: "Monstro Pequeno",
          papel: '',
          resumo: "A coisinha pulsante é pouco maior que um pão.",
          texto:
`Glop ND 1/4
A coisinha pulsante é pouco maior que um pão. Tem um estranho formato de gota d’água, e uma cor esverdeada, tóxica. Move-se aos saltos, deixando manchas de corrosão nos lugares que toca. O glop perambula em bandos nos subterrâneos, em busca de comida — que eles ingerem expelindo um forte ácido digestivo, para então absorvê-la. Qualquer matéria orgânica servirá, como animais mortos, alimentos estocados, aventureiros adormecidos… Glops são muitas vezes deixados em masmorras, para mantê-las limpas de detritos e também como proteção contra invasores. Arcanistas que adotam essa prática normalmente são imunes a ácido ou tratam logo de adquirir essa proteção.
Monstro Pequeno
Iniciativa +0, Percepção +0, percepção às cegas
Defesa 10, Fort +0, Ref +2, Von –5, imunidade a ácido
Pontos de Vida 10
Deslocamento 9m (6q)
Corpo a Corpo Pancada +7 (1d4 mais 1d4 ácido).
For 0, Des 0, Con 0, Int —, Sab –5, Car –5
Tesouro Nenhum.`
        },
        {
          chave: "glooop", nome: "Glooop", nd: "2", tipo: "Monstro Grande",
          papel: '',
          resumo: "A criatura poderia lembrar uma grande saca de grãos — isto é, uma que tenha sido esquecida e deixada apodrecer até ganhar uma camada de…",
          texto:
`Glooop ND 2
A criatura poderia lembrar uma grande saca de grãos — isto é, uma que tenha sido esquecida e deixada apodrecer até ganhar uma camada de gosma nauseante. Apesar da ausência de olhos, percebe a presença de vocês e rasteja em sua direção com um chiado ácido. O glop comum se reproduz ingerindo comida suficiente até se dividir em dois ou mais seres. Alguns, contudo, jamais realizam a separação, apenas comendo e crescendo até atingir tamanhos surpreendentes. Por devorar praticamente toda a comida disponível, um glooop logo é abandonado pelo bando, levando uma vida solitária. Sinais de infestação glop, quando mal-interpretados, podem levar a um confronto com este ser sempre faminto — surpreendendo aventureiros novatos que esperavam uma luta fácil. Em compensação, por seu grande tamanho, glooops às vezes trazem tesouros em seu interior — formados por itens metálicos que seu ácido não afeta.
Monstro Grande
Iniciativa +0, Percepção –5, percepção às cegas
Defesa 19, Fort +13, Ref +7, Von +2, imunidade a ácido
Pontos de Vida 68
Deslocamento 9m (6q)
Corpo a Corpo Pancada +12 (2d6+3 mais 2d6 ácido).
Agarrar Aprimorado (Livre) Pancada (teste +14).
Engolir (Padrão) No início de cada um dos turnos do glooop, a criatura engolida sofre 2d6+3 pontos de dano de impacto mais 2d6 pontos de dano de ácido. Ela pode escapar causando um total de 10 pontos de dano a ele (Defesa 10).
For 3, Des –1, Con 2, Int —, Sab –5, Car –5
Tesouro Padrão.`
        },
        {
          chave: "mamaeGlop", nome: "Mamãe Glop", nd: "2", tipo: "Monstro Grande",
          papel: '',
          resumo: "Como um glop normal, a criatura também lembra uma gosma esverdeada em formato de gota.",
          texto:
`Mamãe Glop ND 2
Como um glop normal, a criatura também lembra uma gosma esverdeada em formato de gota. Porém, tem tonalidade mais escura e o tamanho de uma carroça! Aquilo que leva ao surgimento de uma mamãe glop até hoje permanece um enigma. Alguns especulam ser apenas uma forma avançada de glooop, crescida ainda mais e de alguma forma recuperando a capacidade reprodutiva. Para outros, a criatura se origina de forma oposta — pela fusão de centenas de glops, produzindo um novo ser. Outros ainda sugerem ser um produto acidental de laboratórios alquímicos. Como sugere o nome, uma mamãe glop tem a habilidade de expelir glops comuns — um processo destinado não apenas à reprodução, mas também à proteção, pois os pequenos monstros são mantidos por perto para lutar em defesa da “mãe”. A mamãe glop não adota a vida errante comum à sua espécie. A criatura estabelece um ninho, de onde bandos de glops exploram a região ao redor. Uma vez alimentados, retornam à mãe para serem reabsorvidos, assim provendo seu sustento. Novos glops famintos são expelidos para recomeçar a exploração e o ciclo se mantém. O ninho da mamãe glop pode conter pertences não digeridos de antigas vítimas, embora jamais de tamanho superior a uma bolsa ou adaga.
Monstro Grande
Iniciativa +2, Percepção –1, percepção às cegas
Defesa 17, Fort +13, Ref +7, Von +2, imunidade a ácido
Pontos de Vida 70
Deslocamento 9m (6q)
Corpo a Corpo Pancada +12 (2d6+2 mais 2d6 ácido).
Glops Filhinhos A mamãe glop está sempre acompanhada por 1d4 glops, que a protegem instintivamente. Esses glops, assim como aqueles gerados pela Meiose Glópica, não rendem pontos de experiência.
Meiose Glópica (Livre) Quando ameaçada, a mamãe pode gerar outros glops filhinhos para protegê-la. No início de cada turno da mamãe, role um dado. Em um resultado par, um glop surge num espaço adjacente a ela. Ele age normalmente, no turno da mamãe, a partir da próxima rodada.
For 2, Des –1, Con 2, Int —, Sab –3, Car –3
Tesouro Padrão.`
        },
        {
          chave: "mantor", nome: "Mantor", nd: "5", tipo: "Monstro Grande",
          papel: '',
          resumo: "A estranha criatura parece uma grande capa negra, como uma arraia ondulando no ar.",
          texto:
`Mantor ND 5
“Quem deixaria um ótimo manto de mago largado por aí? Não será desperdiçado!”
— Arneld Pol’Thar, humano arcanista
A estranha criatura parece uma grande capa negra, como uma arraia ondulando no ar. Não há cabeça separada do corpo, apenas dois olhos vermelhos e uma bocarra ventral com dentes pontiagudos. Uma cauda longa termina em um longo ferrão espinhoso, em formato de adaga. O mantor costuma se manter fixo ao teto de cavernas e outras estruturas, esperando pela passagem de presas — e então cai sobre elas, atacando de surpresa. O corpo achatado e maleável envolve a vítima, imobilizando-a enquanto desfere mordidas ferozes. Mantor são inteligentes, mas também cruéis e agressivos, rejeitando qualquer tentativa de diálogo. Usam a esperteza apenas para “brincar” com suas presas, imaginando todo tipo de chamariz ou armadilha. Alguns usam o corpo achatado para esconder passagens, buracos ou precipícios. Outros apagam tochas e lampiões para deixar as vítimas na escuridão. Há ainda aqueles que se penduram em alguma mobília, fingindo ser uma capa ou outra peça de roupa, esperando para atacar quando alguém tenta “vesti-lo”.
Monstro Grande
Iniciativa +11, Percepção +8, percepção às cegas, visão no escuro
Defesa 24, Fort +11, Ref +17, Von +5, redução de trevas 5
Pontos de Vida 200
Deslocamento voo 18m (12q)
Corpo a Corpo Aguilhão +17 (1d10+8 perfuração, x3, alcance 4,5m) e mordida +17 (1d10+8).
Emantar (Padrão) O mantor se joga sobre uma criatura adjacente Enorme ou menor e usa a manobra agarrar (teste +22). Enquanto estiver agarrada, a criatura fica cega, sofre metade de todo dano sofrido pelo mantor e, no início de cada turno do mantor, sofre 2d10+8 pontos de dano de perfuração. O mantor só pode manter uma criatura agarrada por vez e não pode usar sua mordida nesta situação.
Imobilidade Um mantor pode permanecer completamente imóvel. Se ele estiver assim, um personagem deve passar num teste de Percepção (CD 35) para perceber que ele é uma criatura e não um pedaço de tecido.
Manto de Tenebra Em escuridão total, o mantor recebe camuflagem total, mesmo contra criaturas que vejam no escuro.
For 4, Des 5, Con 2, Int –1, Sab 2, Car 0
Perícias Furtividade +11 (+21 no escuro).
Tesouro Metade, mais couro de mantor (CD 20 para extrair, vale T$ 150 para fabricar um manto do mantor).`
        },
        {
          chave: "mimico", nome: "Mímico", nd: "6", tipo: "Monstro Médio",
          papel: '',
          resumo: "O baú está aberto, revelando uma quantidade incrível de ouro, gemas, joias e objetos de arte.",
          texto:
`Mímico ND 6
“Por que está rosnando, Kitana? É apenas um velho baú, vejamos o que contém.”
— Pivas, humano clérigo de Allihanna
O baú está aberto, revelando uma quantidade incrível de ouro, gemas, joias e objetos de arte. Assim que você tenta tocá-las, contudo, longas presas brotam nas bordas e na tampa da arca, que se fecha como uma mandíbula cruel em seu braço. Um mímico é uma criatura com a exata aparência de uma arca de tesouro, relicário, suporte de armas, estante de tomos arcanos, porta de caixa-forte ou outra peça de mobília destinada a armazenar itens de valor. Pode se manter imóvel por longos períodos, mesmo meses ou anos, até a aproximação de uma vítima incauta que tente afanar seu “conteúdo”. Quando isso acontece, o monstro ataca, revelando uma bocarra repleta de presas e tentáculos. Não se pode perceber a diferença entre um mímico e um objeto real apenas com o olhar. Mesmo a magia Visão da Verdade é ineficaz, porque a forma de um baú é a forma verdadeira do monstro. Mímicos são inteligentes e ardilosos; sabem encontrar lugares de tocaia onde sua presença não pareça estranha. Além disso, embora poucos aventureiros saibam, estes seres são capazes de falar: são famosas as histórias de mímicos que alegam ser uma espada mágica poderosa, pedindo que o “escolhido” venha recolhê-la… Alguns dizem que este monstro é obra de Hyninn para testar os ladinos de Arton; outros afirmam que Khalmyr os criou para puni-los. Seja como for, mímicos são quase sempre encontrados em masmorras, embora nobres e vilões também os mantenham em suas câmaras de tesouro como armadilhas contra ladrões.
Monstro Médio
Iniciativa +9, Percepção +8, visão no escuro
Defesa 26, Fort +18, Ref +12, Von +6, imunidade a ácido, redução de dano 5/frio
Pontos de Vida 220
Deslocamento 6m (4q)
Corpo a Corpo Dois tentáculos +20 (2d8+15).
Abocanhar (Livre) Se o mímico começar seu turno agarrando uma criatura Média ou menor, poderá fazer um teste de agarrar contra ela. Se vencer, abocanha a criatura. Uma criatura abocanhada continua agarrada e sofre 4d8+25 pontos de dano de corte no início de cada turno do mímico. O mímico pode manter uma criatura abocanhada por vez, e pode atacar com seus tentáculos normalmente enquanto faz isso. Uma criatura abocanhada pode escapar vencendo uma manobra agarrar contra o mímico.
Agarrar Aprimorado (Livre) Tentáculo (teste +20).
Ataque Furtivo +3d6.
Cuspe Material (Padrão) O mímico cospe parte de seu conteúdo, como moedas e outros objetos diminutos, em um cone de 6m. Criaturas nessa área sofrem 6d4+6 pontos de perfuração (Ref CD 22 reduz à metade; uma criatura abocanhada falha automaticamente nesse teste).
Imobilidade Um mímico pode permanecer completamente imóvel. Se ele estiver assim, um personagem deve passar num teste de Percepção (CD 40) para perceber que ele é uma criatura e não um objeto.
For 2, Des 4, Con 3, Int –2, Sab 3, Car 0
Perícias Enganação +15, Furtividade +2.
Tesouro Padrão.`
        },
        {
          chave: "quimera", nome: "Quimera", nd: "8", tipo: "Monstro Grande",
          papel: '',
          resumo: "O monstro tem o corpo poderoso de um imenso leão, com asas coriáceas dracônicas e uma cauda escamada de crocodilo.",
          texto:
`Quimera ND 8
“Como uma hidra! Mas… com cabeças de animais. Diferentes.”
— Barossa Arareber, estudiosa de hidras
O monstro tem o corpo poderoso de um imenso leão, com asas coriáceas dracônicas e uma cauda escamada de crocodilo. Mas aquilo que chama sua atenção imediata são as três cabeçorras: leão de juba negra no centro, dragão de bocarra flamejante à direita, algum caprino demoníaco de chifres retorcidos à esquerda. Quimeras são monstros mágicos feitos com partes de várias criaturas diferentes. Não ocorrem naturalmente: são criadas por conjuradores — sobretudo devotos de Nimb ou Megalokk — poderosos e loucos o bastante para trazer ao mundo estes seres grotescos. A variedade das quimeras é limitada apenas pela imaginação doentia de seus criadores. Existe, contudo, um método para a criação de quimeras — um conhecimento extremamente especializado. Todas seguem um padrão anatômico básico: três cabeças de animais ou monstros diferentes, corpanzil de um grande quadrúpede e asas de dragão ou pássaro gigante. A fórmula pode ser derivada da “quimera clássica”, com cabeças de bode, leão e dragão. Quimeras não podem ser controladas, nem mesmo por aqueles que as criaram. São bestas sempre furiosas e enlouquecidas, mantidas presas com grossas correntes nos lugares que foram feitas para proteger, ou apenas expostas em jaulas para deleite de seus criadores insanos. Costumam ser encontradas em masmorras, como obstáculo no caminho de câmaras de tesouros e em outros lugares importantes.
Monstro Grande
Iniciativa +7, Percepção +10, faro, visão no escuro
Defesa 33, Fort +21, Ref +15, Von +8
Pontos de Vida 333
Deslocamento 9m (6q), voo 12m (8q)
Corpo a Corpo Três mordidas +26 (3d8+7) e duas garras +24 (2d6+10).
Mente Tripla Quando faz um teste de Percepção ou Vontade, a quimera joga três dados e usa o melhor resultado.
Três Cabeças Uma quimera tem três cabeças distintas que concedem habilidades especiais, escolhidas entre as descritas a seguir.
• Águia. Quando faz uma investida, a quimera pode atacar com esta cabeça e suas duas garras. Os três ataques recebem o bônus de +2 da investida, mas devem ser feitos contra o mesmo alvo.
• Bode. Uma das mordidas da quimera muda para marrada e causa dano de impacto. Quando faz uma investida com esta cabeça e acerta o ataque, a quimera arremessa a vítima 1d6 x 1,5m em uma direção à escolha dela (Fort CD 26 evita). A vítima fica caída e, se atingir algum obstáculo, sofre 1d6 pontos de dano de impacto para cada 1,5m que foi arremessada.
• Dragão. A quimera pode gastar uma ação padrão para cuspir fogo em um cone de 6m. Criaturas na área sofrem 10d6+20 pontos de dano de fogo (Ref CD 26 reduz à metade). Recarga (movimento).
• Gorlogg. Se acertar um ataque de mordida com esta cabeça, a quimera pode usar a manobra derrubar como ação livre (teste +28).
• Hidra. A quimera ganha cura acelerada 20/ácido ou fogo.
• Leão. Quando acerta um ataque de mordida com esta cabeça, a quimera pode usar a manobra agarrar como ação livre (teste+28).
• Javali. Se sofrer dano, a quimera recebe +5 em testes de ataque e rolagens de dano até o fim de seu próximo turno.
• Serpente. Uma criatura atingida por uma mordida desta cabeça perde 2d12 pontos de vida durante 3 rodadas (Fort CD 26 reduz para 1 rodada). Veneno.
• Tigre. Se acertar os dois ataques de garra em uma mesma criatura na mesma rodada, a quimera causa mais 4d6+20 pontos de dano.
• Tubarão. A quimera ganha deslocamento de natação 9m. Além disso, uma criatura atingida por uma mordida desta cabeça fica sangrando (Fort CD 26 evita).
For 6, Des 3, Con 4, Int 0, Sab 1, Car –2
Tesouro Coração de quimera (CD 23 para extrair, vale T$ 300 para fabricar três doses de elixir quimérico).`
        },
        {
          chave: "slark", nome: "Slark", nd: "1", tipo: "Humanoide (slark) Médio",
          papel: '',
          resumo: "São vários seres humanoides, mas de aspecto truculento e ameaçador, com faces horrendas de lagarto e três dedos em cada mão.",
          texto:
`Slark ND 1
“Se querem me deter, filhos das trevas, não será sem luta!”
— Lisandra de Galrasia, dahllan druida
São vários seres humanoides, mas de aspecto truculento e ameaçador, com faces horrendas de lagarto e três dedos em cada mão. Vestem apenas trapos e cintas, provavelmente tomados de vítimas anteriores. Alguns emergem da escuridão à frente, enquanto vários outros descem pelas paredes em volta. Terrores das masmorras por toda Arton, slarks são habitantes de ruínas e cavernas, que temem o sol e nunca são vistos à luz do dia. Rondam em bandos variando entre dez e trinta indivíduos. Detalhes sobre sua origem e hábitos são desconhecidos, até nulos; é quase como se não existissem até o momento em que são encontrados. Há quem acredite que estes seres são simples fruto dos caprichos de Valkaria, para evitar que incursões de aventureiros novatos sejam tediosas. Embora hostis, slarks são também lentos e fracos. Para subjugar suas presas, confiam na escuridão e vantagem numérica, assim como emboscadas proporcionadas por sua habilidade de escalada. Uma tática favorita é esperar de tocaia no teto de túneis e corredores; quando intrusos passam, os slarks despejam jatos certeiros de saliva grossa e gosmenta para cegar, sufocar ou apagar tochas. Então, quando acreditam estar em vantagem, deixam-se cair e lutam.
Humanoide (slark) Médio
Iniciativa +7, Percepção +4, sensibilidade a luz, visão no escuro
Defesa 12, Fort +8, Ref +1, Von +4, redução de ácido 5
Pontos de Vida 15
Deslocamento 6m (4q), escalada 6m (4q)
Corpo a Corpo Garras +10 (1d6+9, 19/x3).
Queda Livre (Completa) Se estiver em terreno elevado, o slark cai sobre uma criatura e faz um ataque de garras. Ele recebe o bônus por terreno elevado (+2 no teste de ataque) e, se a criatura estiver surpreendida, causa +2d6 pontos de dano.
Saliva (Padrão) O slark cospe em uma criatura em alcance curto. A criatura fica cega por 1 rodada e qualquer fonte de iluminação mundana que esteja empunhando se apaga (Ref CD 14 evita ambos os efeitos).
For –1, Des 3, Con 2, Int –1, Sab 1, Car –2
Perícias Furtividade +8.
Tesouro Nenhum.`
        },
        {
          chave: "tigreDeHyninn", nome: "Tigre-de-Hyninn", nd: "5", tipo: "Monstro Grande",
          papel: '',
          subgrupo: "Tigre-de-Hyninn",
          resumo: "Tigre-de-Hyninn — O que surge no túnel à frente não pode ser descrito — é como um borrão no vazio, sem forma, sem cor, mas com movimento.",
          texto:
`Tigre-de-Hyninn ND 5
Monstro Grande
Iniciativa +10, Percepção +7, faro, visão no escuro
Defesa 25, Fort +8, Ref +20, Von +5, imunidade a confuso e metamorfose, resistência a devotos de Khalmyr +5
Pontos de Vida 165
Deslocamento 12m (8q)
Corpo a Corpo Duas garras +17 (1d8+3), 1d3 mordidas +17 (1d6+3) e 1d4+1 tentáculos +17 (1d6+3).
Borrão O tigre-de-Hyninn tem 25% de chance de ignorar ataques e efeitos (incluindo de área) contra ele. Esta habilidade permanece ativa mesmo que ele morra.
✦ Entre Planos (Movimento) Até o próximo turno do tigre, a chance de falha de seu Borrão aumenta para 50%.
Profusão de Partes Cada tigre tem 1d3 cabeças e 1d4+1 tentáculos. Isso determina quantos ataques de mordida (um por cabeça) e de tentáculos ele tem.
For 3, Des 4, Con 2, Int –1, Sab 1, Car –1
Perícias Furtividade +16.
Tesouro Resíduos (CD 20 para extrair, valem T$ 150 para fabricar poções e pergaminhos contendo magias de ilusão).`
        },
        {
          chave: "tigreDeHyninnPrimordial", nome: "Tigre-de-Hyninn Primordial", nd: "11", tipo: "Monstro Grande",
          papel: '',
          subgrupo: "Tigre-de-Hyninn",
          resumo: "Tigre-de-Hyninn — O que surge no túnel à frente não pode ser descrito — é como um borrão no vazio, sem forma, sem cor, mas com movimento.",
          texto:
`Tigre-de-Hyninn Primordial ND 11
Monstro Grande
Iniciativa +17, Percepção +12, faro, visão no escuro
Defesa 42, Fort +14, Ref +29, Von +10, imunidade a confuso e metamorfose, resistência a devotos de Khalmyr +5
Pontos de Vida 480
Deslocamento 12m (8q)
Corpo a Corpo Duas garras +34 (2d8+12), 1d3 mordidas +34 (2d6+12) e 1d4+1 tentáculos +34 (2d6+12).
Borrão O tigre-de-Hyninn tem 25% de chance de ignorar ataques e efeitos (incluindo de área) contra ele. Esta habilidade permanece ativa mesmo que ele morra.
✦ Entre Planos (Movimento) Até o próximo turno do tigre, a chance de falha de seu Borrão aumenta para 50%.
Não Está Mais Aqui! (Padrão) Uma vez por cena, o tigre pode se teleportar para qualquer lugar a sua escolha a até 500m, desde que conheça o local de destino.
Profusão de Partes Cada tigre tem 1d3 cabeças e 1d4+1 tentáculos. Isso determina quantos ataques de mordida (um por cabeça) e de tentáculos ele tem.
Sopro (Padrão) O tigre sopra energia caótica em um cone de 6m. Criaturas na área sofrem 6d8 pontos de dano mental e ficam confusas por 1d3 rodadas (Von CD 31 reduz à metade e evita a condição). Recarga (no início de cada rodada do tigre, jogue um dado; recarrega com um resultado par).
For 4, Des 6, Con 3, Int –1, Sab 1, Car –1
Perícias Furtividade +25.
Tesouro Resíduos (CD 26 para extrair, valem T$ 300 para fabricar poções e pergaminhos contendo magias de ilusão).`
        },
        {
          chave: "brawar", nome: "Brawar", nd: "14", tipo: "Construto Enorme",
          papel: '',
          resumo: "Com um estrondo metálico, o que parecia a imensa estátua de um guerreiro anão lentamente se afasta da parede.",
          texto:
`Brawar ND 14
“Não consigo nem arranhar! Essa coisa é toda feita de adamante!”
— Mateo Dasinus, humano não aventureiro
Com um estrondo metálico, o que parecia a imensa estátua de um guerreiro anão lentamente se afasta da parede. Luzes brancas se acendem como olhos sob o elmo, enquanto mãos poderosas empunham uma picareta que parece capaz de rachar a maior das muralhas. Talvez uma das maiores façanhas de engenharia do povo anão, brawar são gigantescos golens de ferro construídos para proteger suas grandes cidades e locais sagrados. Quando os anões abandonaram o mundo da superfície, atendendo ao chamado do profeta Wordarion Thondarim, muitos destes construtos foram deixados como sentinelas em suas antigas edificações para expulsar saqueadores. Outros se encontram protegendo vários pontos do caminho para Doherimm. Feitos com alguma liga de adamante, brawar são quase invulneráveis a armas comuns, e também resistentes a muitas formas de magia. Derrotá-los em combate é façanha difícil mesmo para heróis poderosos. Dizem que falar com eles em idioma anão pode fazê-los hesitar, recuar ou seguir ordens breves — desde que sejam palavras acompanhadas de honrarias a figuras e eventos ilustres do passado. Embora sejam encontrados tipicamente sozinhos, há lugares protegidos por dois ou até quatro brawar. Houve inúmeras tentativas de sucatear os corpos dos brawar para extrair seu valioso adamante. Infelizmente, por ter sido forjado com técnicas ancestrais secretas, o metal em sua fabricação não pode ser reutilizado. Algumas de suas peças, no entanto, têm formato próprio para servir como clavas e maças sem necessidade de reforja.
Construto Enorme
Iniciativa +6, Percepção +14, visão no escuro
Defesa 46, Fort +28, Ref +22, Von +14, redução de dano 25
Pontos de Vida 700
Deslocamento 6m (4q)
Corpo a Corpo Picareta +40 x2 (2d12+30, 19/x4).
Fale Amigo e Passe Um anão pode gastar uma ação padrão para fazer um teste de Diplomacia (CD 38) contra o brawar. Se passar, deixa-o pasmo por 1 rodada; se falhar, o brawar não pode mais ser pasmo desta forma nesta cena. Se o brawar estiver pasmo desta forma, um anão pode gastar uma ação padrão para fazer um teste de Conhecimento ou Nobreza (CD 38). Se passar nesse segundo teste, o brawar para de lutar.
Imunidade a Magia O brawar é imune a efeitos mágicos, com a seguinte exceção. Efeitos mágicos de fogo concedem a ele uma ação padrão adicional em seu próximo turno e curam PV em quantidade igual à metade do dano que causariam.
Picareta Destruidora Os ataques de picareta do brawar ignoram 10 pontos da RD de objetos.
Pisotear (Movimento) O brawar pisoteia o chão, gerando uma onda de choque em uma área de 9m ao seu redor. Criaturas nessa área sofrem 15d10 pontos de dano de impacto e ficam caídas (Ref CD 38 reduz o dano à metade e evita a condição).
For 14, Des –1, Con 12, Int —, Sab 1, Car –5
Equipamento Picareta aumentada maciça de adamante.
Tesouro Padrão.`
        },
      ],
      regras: [
        { titulo: "Cocatriz",
          texto:
`“Estão com medo daquilo? Mas é um frango! Certo, um frango muuuito feio…”
— JoBren Barbarax, humano bardo-lutador
O bicho parece um galo grande e muito feio, mas com duas caudas (ou três, difícil dizer) escamadas de serpente. Apesar do aspecto cômico, os olhos brilham sinistros e avermelhados. Seja pela feiura ou por sua semelhança com um galináceo comum, a cocatriz é muitas vezes subestimada por aventureiros incautos. Qualquer herói experiente, contudo, sabe se tratar de um monstro mágico perigoso, por sua habilidade de transformar as vítimas em pedra com uma simples bicada. Como a pequena fera ganhou tal habilidade temível, ninguém sabe. Há quem tente encontrar alguma relação entre cocatrizes e medusas, o que apenas insulta e enfurece estas últimas. Os estudiosos arriscam as teorias habituais: um animal nativo de outro Plano, um experimento arcano fracassado, uma brincadeira de Nimb. A habilidade nem sequer parece muito útil ao monstro, que não pode se alimentar de vítimas petrificadas (usa apenas as garras para matar os insetos de que se alimenta). Assim, a bicada mortal acaba reservada a inimigos maiores, que o bicho ataca furioso como um literal galo de briga. Como as galinhas, cocatrizes não voam realmente, mas são capazes de saltos e voos curtos para superar obstáculos (e atacar inimigos maiores). Há cocatrizes machos e fêmeas, de aparência e hábitos semelhantes a suas contrapartes naturais: organizam-se em haréns compostos por um macho protetor e várias fêmeas responsáveis por ninhos contendo um ou dois ovos. Estes são ingredientes mágicos valiosos, que atingem altos preços em Vectora e outros mercados. Desnecessário dizer, um covil de cocatrizes muitas vezes é cercado de estátuas sujas e semidestruídas daqueles que tentaram roubar seus ovos. Dizem existir uma versão gigante desta criatura, a cocatriz-real. Do tamanho de um avestruz, a criatura lendária comanda e protege várias famílias de cocatrizes normais. Não há relatos sobre bandos de cocatrizes-reais, embora isso não seja impossível. Sabe-se da existência de alguns raras cocatrizes domadas, atuando como familiares (ou até montarias, no caso das reais), mas a criatura perde boa parte da habilidade de petrificação quando domesticada.` },
        { titulo: "Glop",
          texto:
`“Espere, não o mate ainda! Preciso de uma amostra para estudo!”
— Selussa Faerondalan, meia-elfa arcanista
Com seus aposentos e corredores imundos, contaminados com dejetos e detritos alquímicos, masmorras produzem criaturas rastejantes e disformes classificadas como “gosmas”. Seres primitivos, que vivem apenas para se alimentar e reproduzir. Embora gosmas existam em infinitas variedades, glops são as mais simples e comuns. São uma praga constante não apenas em túneis e labirintos, mas também em esgotos, porões ou adegas — livrar-se deles é trabalho comum para aventureiros iniciantes. Pensava-se que glops existiam apenas em tamanhos diminutos. Contudo, versões maiores e mais perigosas têm sido reveladas, sugerindo até que estes seres talvez tenham alguma forma de sociedade.` },
        { titulo: "Tigre-de-Hyninn",
          texto:
`“Um rugido, e então estavam todos mortos. Como sobrevivi? Que pergunta idiota é essa?”
— Samantha de Bielefeld, osteon caçadora
O que surge no túnel à frente não pode ser descrito — é como um borrão no vazio, sem forma, sem cor, mas com movimento. Até mesmo seu tamanho parece difícil de estimar, pode ser grande como um cavalo ou alto como um ogro. A única coisa que vocês conseguem perceber com clareza é seu rugido, lembrando um grande felino. O tigre-de-Hyninn é assim chamado apenas devido à semelhança entre seu som e o rugido de um tigre. Certamente não é um animal, talvez nem seja uma criatura de qualquer tipo — e sim um fenômeno bizarro, uma deformação anormal da realidade. A aparição desfocada, contudo, parece movida pelo impulso de atacar tudo que encontra, então “tigre” acaba servindo como um nome adequado. Embora a coisa nem pareça existir, seus ataques produzem ferimentos muitos reais, como aqueles causados por garras e presas de feras mundanas. Ainda, devido ao número de ataques que consegue executar, especula-se que o tigre tenha numerosas cabeças/patas/tentáculos, ou talvez mude de anatomia à vontade. Sua verdadeira forma não se revela nem mesmo após a morte, pois a criatura não deixa cadáver — simplesmente desaparece, deixando uns poucos resíduos, considerados valiosíssimos como ingredientes alquímicos. Alguns estudos da Academia Arcana e da Igreja de Tanna-Toh teorizam que o tigre-de-Hyninn se originou em Lamnor, séculos antes da Grande Batalha, onde teria sido conjurado em rituais ao Deus da Trapaça. A coisa então se espalhou pelo continente, sendo temida até mesmo pelos duyshidakk. Hoje, suas manifestações podem ocorrer em qualquer ponto de Arton, mas principalmente em masmorras e florestas escuras.` },
      ],
    },
  ],

  // ── 📖 O capítulo de regras que abre o livro ────────────────
  regras: [
    { cat: "geral", titulo: "Ameaças",
      texto:
`Este capítulo apresenta fichas de criaturas, divididas em seções temáticas de forma semelhante àquelas de Tormenta20. Cada seção apresenta as fichas em ordem alfabética e é encerrada com a criatura mais poderosa ou icônica do grupo. Além disso, cada seção inclui uma caixa de “Reforços” — criaturas de outras seções que se encaixam tematicamente no grupo. Os reforços funcionam como uma sugestão de outras criaturas que combinam com o tema, mas nada impede que você inclua criaturas de fora dessa lista em seus encontros.` },
    { cat: "geral", titulo: "Nome & ND",
      texto:
`O nome e o nível de desafio (ND) da criatura. O ND funciona como o nível da criatura (mínimo 1).
Criaturas de ND “S” e “S+” são casos especiais.
Contam como ND 20, mas são ainda mais perigosas — os seres mais poderosos da Criação. Veja mais sobre esses níveis de desafio no Capítulo 2: Regras Avançadas de Ameaças.` },
    { cat: "geral", titulo: "Tipo",
      texto:
`O tipo (e subtipo, quando houver) representa a natureza da criatura dentro do mundo e determina que efeitos podem afetá-la. Além disso, alguns tipos fornecem habilidades específicas. Tipos são explicados na página 13.` },
    { cat: "geral", titulo: "Tamanho",
      texto:
`O tamanho determina o espaço que a criatura ocupa, seu alcance natural e seu modificador em Furtividade e manobras de combate. A Tabela 1-1 traz os modificadores por tamanho.` },
    { cat: "geral", titulo: "Papel de Combate",
      texto:
`O papel de combate da criatura indica como ela deve ser usada pelo mestre. Existem três papéis: solo, lacaio e especial, cada um indicado por um ícone.
• Solo. A criatura foi construída para enfrentar os personagens sozinha. Ela possui estatísticas equilibradas; em especial possui muitos pontos de vida, para garantir que o combate dure um tempo bom (por volta de 3 a 5 rodadas). Este papel é ocupado principalmente por grandes monstros e vilões.
• Lacaio. A criatura foi construída para enfrentar os personagens em grandes quantidades. Assim, ao usar lacaios, normalmente você usará várias criaturas de ND menor que o nível do grupo, em vez de uma única criatura de ND igual ao nível do grupo. Por exemplo, um grupo de 5º nível pode enfrentar quatro lacaios de ND 1 (o que gera um encontro de ND 5). Lacaios possuem valores de ataque e dano mais altos, para garantir que continuem sendo um risco real para os personagens, mesmo considerando que seu ND será menor que o nível deles, mas menos pontos de vida, para serem derrotados rapidamente, mantendo o combate acelerado. Este papel é ocupado primariamente por humanoides e monstros pequenos.
• Especial. A criatura possui diversas habilidades especiais e/ou foi feita para ser usada em situações fora de combate direto (por exemplo, para enganar ou roubar os personagens). Este papel é ocupado também por conjuradores ou líderes — criaturas cujas habilidades fortalecem outras, e consequentemente devem ser usadas em conjunto com lacaios.` },
    { cat: "geral", titulo: "Iniciativa & Percepção",
      texto:
`Os valores de Iniciativa e Percepção da criatura e quaisquer habilidades relacionadas a seus sentidos.` },
    { cat: "geral", titulo: "Defesa & Resistências",
      texto:
`A Defesa e os valores de Fortitude, Reflexos e Vontade da criatura, além de quaisquer habilidades especiais defensivas, como redução de dano.` },
    { cat: "geral", titulo: "Pontos de Vida",
      texto:
`O total de pontos de vida da criatura.` },
    { cat: "geral", titulo: "Deslocamento",
      texto:
`A quantidade de metros que a criatura consegue percorrer com uma ação de movimento (e, entre parênteses, a quantidade de quadrados de 1,5m). O número padrão é o deslocamento terrestre da criatura. Uma criatura pode possuir outras formas de deslocamento, como voo e natação (veja “Habilidades Gerais”, a seguir).` },
    { cat: "geral", titulo: "Pontos de Mana",
      texto:
`A quantidade de PM que a criatura possui. A maior parte das criaturas não possui pontos de mana, pois gerenciar esse recurso para diversas fichas ao mesmo tempo seria bastante trabalhoso para o mestre. Via de regra, apenas conjuradores possuem PM. Caso a criatura não possua pontos de mana, esta linha não aparecerá.` },
    { cat: "geral", titulo: "Tabela 1-1: Tamanho de Criaturas",
      texto:
`Cada linha traz: categoria de tamanho · exemplos · espaço ocupado e alcance natural · modificador de Furtividade e de manobras de combate.
• Minúsculo. Falcão, rato, sílfide. 1,5m. Furtividade +5, manobras –5.
• Pequeno. Cão, goblin, hynne. 1,5m. Furtividade +2, manobras –2.
• Médio. Humano, anão, elfo. 1,5m. Sem modificador.
• Grande. Cavalo, ogro, serpe. 3m. Furtividade –2, manobras +2.
• Enorme. Ente, gigante, hidra. 4,5m. Furtividade –5, manobras +5.
• Colossal. Colosso, dragão, kraken. 9m. Furtividade –10, manobras +10.
Espaço ocupado pela criatura. "3m", por exemplo, significa que a criatura ocupa um espaço de 3m x 3m, ou seja, 2x2 quadrados num mapa.` },
    { cat: "geral", titulo: "Ações",
      texto:
`Todos os ataques e habilidades que a criatura pode fazer (e, entre parênteses, a ação necessária e seu custo em PM, se houver). Habilidades sem ação exigida são passivas (estão sempre ativas). Algumas habilidades terminam com o termo “recarga”. Nesse caso, sempre que usar a habilidade, a criatura precisará gastar a ação determinada, ou cumprir a condição descrita, antes de poder usá-la novamente.` },
    { cat: "geral", titulo: "Atributos",
      texto:
`Os valores de atributos da criatura. Algumas criaturas possuem um valor de atributo nulo (–). Nesse caso, a criatura não possui o atributo em questão e não pode usá-lo. Uma criatura com “For –” não pode exercer força física sobre o mundo; uma criatura com “Des –” não pode se mover e uma criatura com “Int –” não é capaz de pensar, agindo apenas conforme uma programação prévia.` },
    { cat: "geral", titulo: "Perícias",
      texto:
`Os valores totais das demais perícias da criatura (além de Iniciativa, Percepção, Fortitude, Reflexos e Vontade). Caso a criatura não possua outras perícias, esta linha não aparecerá. Assim como personagens, criaturas podem usar perícias que não exijam treinamento. Nesse caso, seu valor na perícia será igual à metade de seu ND + o atributo-chave da perícia.` },
    { cat: "geral", titulo: "Equipamento e Tesouro",
      texto:
`Itens utilizados pela criatura, se houver. Após os itens, a categoria de tesouro da criatura (veja Tormenta20, Capítulo 8). Algumas criaturas possuem recursos que podem ser extraídos de seu corpo. Extrair um recurso exige uma hora de trabalho e um teste de Sobrevivência ou de um Ofício relacionado ao recurso (CD 15 + ND da criatura). Em caso de falha, os recursos são estragados.` },
    { cat: "geral", titulo: "Tipos de Criaturas",
      texto:
`Todas as criaturas pertencem a um dos seguintes tipos, que também determinam habilidades inerentes.` },
    { cat: "geral", titulo: "Animais",
      texto:
`A maior parte dos animais reais (cães, gatos, cavalos…) também existe em Arton. No entanto, a influência de forças mágicas e deuses caprichosos também provocou o surgimento de bestas espantosas. De lagartos-trovão a insetos gigantes, Arton é habitada por um sem número de feras fantásticas — que, no entanto, ainda são consideradas animais normais. Mesmo que tenham sido criadas por forças mágicas no passado, hoje elas se reproduzem e fazem parte do mundo natural. De modo geral, animais são seres vivos sem inteligência suficiente para desenvolver um idioma (Int –5 ou –4) e sem habilidades sobrenaturais. Um animal inteligente ou com poderes mágicos é considerado um monstro, mas muitos animais têm habilidades “naturais” como venenos e toxinas, apêndices adaptados (tentáculos, ferrões, chifres) ou órgãos especializados, como estômagos enormes capazes de engolir e digerir criaturas de seu tamanho.` },
    { cat: "geral", titulo: "Construtos",
      texto:
`Objetos animados ou criaturas fabricadas artificialmente, seja por magia, seja por ciência. Normalmente, construtos não possuem inteligência real; em vez disso, são programados para realizar apenas certas tarefas (como proteger um lugar). Construtos possuem as seguintes habilidades: visão no escuro; imunidade a cansaço, efeitos de metabolismo e veneno; não recuperam PV por descanso, e efeitos de cura e a perícia Cura não funcionam com eles — mas a perícia Ofício (artesão) pode ser usada no lugar dela com os mesmos efeitos.` },
    { cat: "geral", titulo: "Espíritos",
      texto:
`Seres nativos de outros Planos — dimensões muito além de Arton. Têm uma profunda conexão com as energias primais da Criação, desde os próprios elementos até as forças primordiais do Bem, do Mal, da Ordem e do Caos, passando por aspectos dos próprios deuses. Espíritos geralmente possuem visão no escuro, mas isso não é uma característica inerente do tipo.` },
    { cat: "geral", titulo: "Humanoides",
      texto:
`Este grupo inclui membros de raças que lembram os humanos, com a mesma anatomia básica. Têm cabeça, tronco, dois braços e duas pernas. Ou quase isso. Todos os humanoides são inteligentes, com sua próprias culturas e sociedades. Todo humanoide possui uma raça (como humano, anão etc.) ou subtipo (como gigante etc.).` },
    { cat: "geral", titulo: "Monstros",
      texto:
`Dos majestosos dragões aos aberrantes lefeu, monstros são criaturas de anatomia estranha ou com habilidades mágicas. Muitos têm origem ligada à Tormenta, mesmo que não tenham características lefeu — a própria existência da Tempestade Rubra causa o surgimento de seres aberrantes. Outros, como dragões e entes, são criações dos deuses.` },
    { cat: "geral", titulo: "Mortos-Vivos",
      texto:
`Duvidosa “dádiva” oferecida por Tenebra e outros deuses, mortos-vivos são cadáveres animados por meio de energia negativa. A maior parte dos mortos-vivos perde toda e qualquer capacidade de pensar. Outros ficam insanos, presos a recordações passadas. Alguns poucos, porém, conservam — ou mesmo superam — a inteligência que tinham em vida. Debates sobre a “moralidade” dos mortos-vivos são constantes. Muitas destas criaturas não são capazes de pensamento racional — portanto, não fazem escolhas boas ou más, só agem de acordo com as ordens de seus criadores. No entanto, quando não estão sob controle de alguém, sua tendência é atacar e devorar os vivos. Este é o caso de mortos-vivos encontrados em masmorras e lugares assombrados.
Devotos de Tenebra e certos arcanistas, porém, argumentam que mortos-vivos deveriam ser empregados como soldados e força de trabalho, deixando os vivos livres para as artes e ciências. Mortos-vivos possuem as seguintes habilidades: visão no escuro; imunidade a cansaço, efeitos de metabolismo, trevas e veneno; sofrem dano por efeitos mágicos de cura de luz (Von CD do efeito reduz à metade), e recuperam PV com dano de trevas.` },
    { cat: "geral", titulo: "Habilidades Gerais",
      texto:
`Estas são habilidades comuns a várias ameaças.` },
    { cat: "geral", titulo: "Agarrar Aprimorado",
      texto:
`Se a criatura acertar um ataque com uma arma natural (especificada na habilidade), poderá fazer a manobra agarrar com esta arma como uma ação livre. Enquanto está usando a arma natural para agarrar, a criatura não pode usá-la para desferir outros ataques. A descrição da habilidade pode limitar o tipo ou tamanho de criatura que pode ser agarrada desta forma e também descrever efeitos adicionais.` },
    { cat: "geral", titulo: "Ataque Furtivo",
      texto:
`A criatura é capaz de desferir ataques furtivos, como um ladino. Uma vez por rodada, ela causa a quantidade de dano adicional indicada com ataques corpo a corpo, ou à distância em alcance curto, contra alvos desprevenidos ou que ela esteja flanqueando. Se o ataque furtivo da ameaça tiver qualquer efeito adicional, ele também será descrito aqui.` },
    { cat: "geral", titulo: "Bando",
      texto:
`A criatura é formada por um grupo de indivíduos, geralmente seres do mesmo tipo, embora possam existir bandos mistos. Se um ataque do bando exceder a Defesa do inimigo por 10 ou mais, ele causa o dobro do dano. Se um ataque do bando errar, ele ainda assim causa metade do dano. Um bando é imune a manobras de combate e efeitos que afetam apenas uma criatura e não causam dano, mas tem vulnerabilidade a dano de área. Um personagem com o poder Trespassar que acerte a criatura pode usá-lo para fazer um ataque adicional contra ela (mas apenas uma vez por turno). Criaturas com esta habilidade possuem o ícone em sua linha de tipo.` },
    { cat: "geral", titulo: "Cura Acelerada",
      texto:
`No início de seu turno, a criatura recupera pontos de vida iguais ao seu valor de cura acelerada (por exemplo, 5 PV com cura acelerada 5). Se houver algum tipo de dano listado após uma barra, esta habilidade não recupera dano do tipo listado. Por exemplo, uma criatura com cura acelerada 10/ácido recupera 10 PV no início de seu turno, a menos que o dano tenha sido causado por ácido. Cura acelerada não cura perda de PV, apenas dano.` },
    { cat: "geral", titulo: "Derrubar",
      texto:
`Se a criatura acertar um ataque com uma arma (especificada na habilidade), poderá fazer a manobra derrubar com esta arma como uma ação livre. A descrição da habilidade pode limitar o tipo ou tamanho de criatura que pode ser derrubada desta forma e também descrever efeitos adicionais.` },
    { cat: "geral", titulo: "Deslocamento Especial",
      texto:
`A criatura possui um ou mais modos de deslocamento especiais, listados após seu deslocamento básico. Se não houver um deslocamento básico, a criatura só pode usar os modos especiais listados.
Escalada. Pode caminhar por superfícies verticais ou mesmo de cabeça para baixo. Isso segue as demais regras de movimento e é afetado pelas características da superfície (uma parede acidentada pode ser considerada terreno difícil, por exemplo). Uma criatura que esteja escalando e perca seu deslocamento de escalada ou a capacidade de realizar ações (como por ficar inconsciente ou paralisada) cai.
Escavação. Pode se mover sob terreno granular, como terra e areia (mas não rocha sólida). Após a passagem da criatura, o terreno atrás dela se fecha devido aos restos de material deixados para trás. Deslocamento de escavação pode ser afetado pelas características do solo: por exemplo, solo pedregoso pode ser considerado terreno difícil.
Natação. Pode se deslocar na água sem precisar fazer testes de Atletismo. Porém, assim como criaturas terrestres precisam de testes de Acrobacia e Atletismo em certas circunstâncias (como um terremoto), uma criatura com deslocamento de natação pode precisar desses testes em circunstâncias como correnteza forte ou redemoinho. A criatura pode respirar debaixo d’água, mas não fora dela, a menos que tenha outra forma de deslocamento. Ela pode falar e lançar magias debaixo d’água e não sofre as penalidades de –2 em testes de ataque e –5 em Percepção por estar submersa, nem a redução no dano de suas armas naturais. Para mais informações, veja “Personagens Submersos” em Tormenta20, p. 269.
Voo. Pode voar. Uma criatura com deslocamento de voo pode encerrar seu deslocamento em pleno ar. Uma criatura que esteja voando e perca seu deslocamento de voo ou a capacidade de realizar ações cai 150m por rodada. Uma criatura que esteja voando e sofra uma manobra derrubar bem-sucedida cai 1d6 x 1,5m antes de recuperar o voo.` },
    { cat: "geral", titulo: "Doença",
      texto:
`Um dos ataques da criatura transmite uma doença. Um personagem que sofra dano desse ataque deve passar num teste de Fortitude ou é contaminado. Uma vez que contraia a doença, o personagem não sofre efeitos adicionais por ser atingido novamente. Veja mais sobre doenças em Tormenta20, p. 318.` },
    { cat: "geral", titulo: "Engolir",
      texto:
`Se a ameaça começar seu turno agarrando uma criatura uma ou mais categorias de tamanho menor, poderá fazer um teste de agarrar contra ela. Se vencer, engole a criatura. Uma criatura engolida continua agarrada, fica cega, tem cobertura total contra efeitos vindos do lado de fora da ameaça (e vice-versa) e sofre o dano indicado no início de cada turno da ameaça. Ela pode escapar vencendo um teste de agarrar ou de Acrobacia contra o valor de agarrar da ameaça ou causando dano à ameaça até atingir o valor indicado (exceto quando descrito o contrário, o interior da ameaça tem todas as suas habilidades). Isso faz com que a ameaça regurgite todas as criaturas engolidas, que ficam caídas em espaços adjacentes desocupados na frente dela, e reinicia a contagem de dano. A menos que indicado o contrário, a ameaça só pode manter uma criatura engolida por vez.` },
    { cat: "geral", titulo: "Enxame",
      texto:
`A criatura é um aglomerado de seres menores que agem em conjunto. Pode entrar no espaço ocupado por um personagem e, no fim de seu turno, causa um efeito (geralmente dano) indicado em sua descrição a qualquer personagem em seu espaço, automaticamente. Um enxame é imune a manobras de combate e efeitos que afetam apenas uma criatura e não causam dano, mas tem vulnerabilidade a dano de área. Além disso, sofre apenas metade do dano de ataques com armas. Estar dentro de um enxame conta como condição ruim para lançar magias. Enxames possuem o ícone em sua linha de tipo.` },
    { cat: "geral", titulo: "Evasão",
      texto:
`Quando sofre um efeito que permite um teste de Reflexos para reduzir o dano à metade, a criatura não sofre dano algum se passar. Ela ainda sofre dano normal se falhar no teste de Reflexos. Esta habilidade exige liberdade de movimentos; a criatura não pode usá-la se estiver de armadura pesada ou imóvel.` },
    { cat: "geral", titulo: "Evasão Aprimorada",
      texto:
`Como Evasão, mas, se a criatura falhar no teste de Reflexos, sofre apenas metade do dano.` },
    { cat: "geral", titulo: "Familiar",
      texto:
`A criatura pode ser invocada como um familiar. Veja o poder Familiar (Tormenta20, p. 38), e o Apêndice A.` },
    { cat: "geral", titulo: "Faro",
      texto:
`A criatura tem olfato apurado. Contra inimigos que não possa ver, ela não fica desprevenida e camuflagem total lhe causa apenas 20% de chance de falha em alcance curto.` },
    { cat: "geral", titulo: "Fortificação",
      texto:
`A criatura tem uma chance (indicada por uma porcentagem) de ignorar o dano adicional de acertos críticos e ataques furtivos. Jogue 1d100 sempre que a criatura sofrer um acerto crítico ou ataque furtivo. Se o resultado for igual ou menor que seu valor de fortificação, a criatura ignora o dano adicional do ataque, exatamente como se tivesse Imunidade a esse efeito.` },
    { cat: "geral", titulo: "Imunidade",
      texto:
`A criatura é imune a um tipo de efeito ou outro elemento (como um tipo de dano, uma condição ou uma habilidade). Ela não sofre nenhuma consequência direta daquilo contra a qual é imune. Ela ainda pode ser afetada indiretamente — por exemplo, uma criatura imune a efeitos mágicos ainda é afetada por terreno difícil criado por magias. Imunidade a acertos críticos e/ou ataques furtivos os transforma em acertos normais.` },
    { cat: "geral", titulo: "Incorpóreo",
      texto:
`A criatura não tem corpo físico. Só pode ser afetada por armas e efeitos mágicos ou outras criaturas incorpóreas. Ela pode atravessar objetos sólidos, mas não manipulá-los, e tem Força nula.` },
    { cat: "geral", titulo: "Magias",
      texto:
`A criatura lança magias. A descrição da habilidade indica o nível e classe de conjurador da criatura, a CD para resistir às suas magias e seu limite de PM (se nenhum limite for indicado, use o ND da criatura). A criatura segue todas as regras de magias, bem como as regras e limitações específicas de sua classe (por exemplo, se lança magias como um bruxo, ela possui um foco arcano e deve empunhá-lo). Considere que a criatura tem todos os componentes materiais para suas magias. Além disso, a habilidade também apresenta regras específicas das magias da criatura. Algumas criaturas possuem um tipo de conjurador (arcano ou divino) em vez de uma classe. Neste caso, suas magias são do tipo indicado, mas ela não sofre nenhuma limitação específica de classe. Criaturas com a habilidade Magias possuem uma lista de magias. Esta lista é apresentada para conveniência do mestre e descreve as magias mais comumente conhecidas pela criatura, descritas na forma como ela costuma lançá-las. Ela pode lançar essas magias em outras versões (dentro de seu nível de conjurador) e, a critério do mestre, pode conhecer magias diferentes.` },
    { cat: "geral", titulo: "Maior que a morte",
      texto:
`Enquanto tiver pelo menos metade de seus PV, a criatura é imune a habilidades de “morte instantânea”. Isso inclui efeitos que reduzem seus PV a 0 ou menos instantaneamente (como Assassino Fantasmagórico), que aprisionam ou destroem sua alma ou corpo (como Roubar a Alma e Buraco Negro) e similares. O mestre tem a palavra final se um efeito é ou não de morte instantânea. A criatura ainda pode ser reduzida a 0 PV ou menos por dano ou perda de vida.` },
    { cat: "geral", titulo: "Natureza Vegetal",
      texto:
`A criatura é um vegetal senciente, ou possui traços vegetais em sua fisiologia. Ela é imune a atordoamento e metamorfose, mas é afetada especificamente por efeitos que afetem plantas monstruosas. No caso de magias sem teste de resistência, ela tem direito a um teste de Fortitude (CD da magia) para evitar o efeito.` },
    { cat: "geral", titulo: "Parceiro",
      texto:
`A criatura pode ser empregada como um parceiro. Para mais informações, veja o Apêndice A.` },
    { cat: "geral", titulo: "Percepção às Cegas",
      texto:
`A criatura usa sentidos diferentes da visão (como radar, sonar, sensibilidade a vibrações etc.). Efeitos relacionados à visão, como escuridão e invisibilidade, não a afetam. Ela pode fazer testes de Percepção para observar usando estes sentidos, em vez da visão.
Esta habilidade tem alcance curto (a menos que especificado em contrário).` },
    { cat: "geral", titulo: "Redução de Dano (RD)",
      texto:
`A criatura ignora parte do dano que sofre. Por exemplo, se uma criatura com RD 5 sofre um ataque que causa 8 pontos de dano, perde apenas 3 PV. A redução pode ser contra um ou mais tipos de dano específicos. Assim, uma criatura com redução de fogo 10 ignora 10 pontos de dano de fogo, mas sofre dano de outros tipos normalmente. Caso haja um ou mais tipos de dano listados após uma barra, a RD não se aplica àqueles tipos. Por exemplo, uma criatura com RD 10/mágico ignora 10 pontos de dano de todos os ataques que sofrer — exceto dano causado por habilidades e armas mágicas.` },
    { cat: "geral", titulo: "Resistência a <Efeito>",
      texto:
`A criatura recebe um bônus em testes de resistência contra efeitos do tipo especificado. Por exemplo, resistência a magia +2 fornece +2 em testes de Fortitude, Reflexos e Vontade contra efeitos mágicos.` },
    { cat: "geral", titulo: "Sensibilidade a Luz",
      texto:
`A criatura é suscetível a luz. Quando exposta à luz do sol ou similar, ela fica ofuscada.` },
    { cat: "geral", titulo: "Visão na Penumbra",
      texto:
`A criatura enxerga em escuridão leve em alcance curto (exceto mágica). Ela ignora camuflagem leve por esse tipo de escuridão (veja Tormenta20, p. 238).` },
    { cat: "geral", titulo: "Visão no Escuro",
      texto:
`A criatura enxerga em escuridão total em alcance curto (exceto mágica). Ela ignora camuflagem total por esse tipo de escuridão (veja Tormenta20, p. 238).` },
    { cat: "geral", titulo: "Vulnerabilidade a <Efeito>",
      texto:
`A criatura sofre +50% de dano ou de perda de vida (conforme apropriado) de um tipo ou característica específicos. Por exemplo, se uma criatura com vulnerabilidade a frio sofre um ataque que causa 15 pontos de dano de frio, ela sofre 22 pontos de dano (15 x 1,5 = 22).` },
  ],

  // ── 🗡 Itens citados nas fichas ─────────────────────────────
  itens: [
    { chave: "sementeRubra", nome: "Semente Rubra", meta: "Alimento mágico das áreas de Tormenta",
      texto:
`Encontrada apenas em áreas de Tormenta, esta baga de odor ocre é na verdade um alimento mágico. Consumir uma semente carmesim cura 10d8+10 PV e remove as condições enjoado, envenenado, exausto, fatigado e fraco. No entanto, também causa um choque temporário no organismo, deixando o personagem debilitado até o fim de seu próximo turno. Estas sementes raramente são encontradas à venda, e podem alcançar preços de até T$ 3.600.` },
    { chave: "armaduraDoDevorador", nome: "Armadura do Devorador", meta: "Dádiva de Aharadak (simbionte)",
      texto:
`Também conhecido como “bioarmadura”, em sua forma natural este simbionte lembra um grotesco tatuzinho, mas do tamanho de uma mão aberta. Ele rasteja até a fronte do hospedeiro, ancorando-se ao crânio, assumindo o aspecto de uma tiara ou elmo macabro. Quando ativada, crostas revestem o corpo do hospedeiro, formando uma armadura completa.
Invocar a Armadura do Devorador é uma ação livre. Isso faz com que o corpo do hospedeiro seja coberto por crostas e carapaças aberrantes que funcionam como uma armadura completa espinhosa selada sob medida de matéria vermelha que não requer proficiência. Além disso, quando a armadura é ativada, o hospedeiro não precisa respirar. Ela também é ativada involuntariamente como uma reação sempre que o hospedeiro sofre dano. É possível evitar uma ativação involuntária, mas para isso é necessário passar em um teste de Vontade (CD 10 + dano sofrido). Em ambos os casos, quando a armadura é ativada o hospedeiro perde 1d4 pontos de vida devido à dor da transformação e qualquer outra armadura que ele esteja usando é destruída. Desativar a bioarmadura é uma ação livre.
Preço: T$ 54.000.` },
    { chave: "asasDoDevorador", nome: "Asas do Devorador", meta: "Dádiva de Aharadak (simbionte)",
      texto:
`Também conhecido como “pterodraco”, este simbionte lembra uma grande concha com olhos telescópicos e centenas de pequenas patas. O simbionte se une ao hospedeiro instalando-se em suas costas. Suas inúmeras patas se cravam na carne até atingir a coluna, onde se prendem permanentemente. Quando a simbiose é bem-sucedida, o pterodraco desenvolve um par de grandes asas membranosas. O hospedeiro pode gastar 2 PM para ativar as Asas do Devorador e ganhar deslocamento de voo igual ao seu deslocamento em terra com duração sustentada.
Preço: T$ 27.000.` },
    { chave: "flageloDoDevorador", nome: "Flagelo do Devorador", meta: "Dádiva de Aharadak (simbionte)",
      texto:
`Este simbionte lembra um grande escorpião com a aparência agressiva e alienígena dos lefeu — sendo por isso também conhecido como “escorpião da tempestade”. Prende-se ao antebraço do hospedeiro, cravando garras quase até os ossos e espalhando raízes sinistras pelo corpo todo, salientes sob a pele. O Flagelo do Devorador conta como um escudo leve de matéria vermelha. Além disso, o hospedeiro pode lançar Jato Corrosivo com tempo de conjuração de ação de movimento. Se aprender essa magia, seu custo é reduzido em –1 PM. Preço: T$ 33.000.` },
    { chave: "menteDoDevorador", nome: "Mente do Devorador", meta: "Dádiva de Aharadak (simbionte)",
      texto:
`Este simbionte, conhecido por alguns como “psinídeo”, lembra uma grande aranha, com um abdome macabro em forma de cérebro humano. Ele agarra-se à cabeça do hospedeiro com suas longas patas, enterrando ali seu corpo. O hospedeiro recebe +1 em Inteligência e Sabedoria (cumulativo com outros itens), e pode lançar uma magia arcana de encantamento de 1º círculo (escolhida quando o simbionte é implantado; atributo-chave Inteligência ou Sabedoria). Se aprender essa magia, seu custo é reduzido em –1 PM. Preço: T$ 34.000.` },
    { chave: "olhosDoDevorador", nome: "Olhos do Devorador", meta: "Dádiva de Aharadak (simbionte)",
      texto:
`Chamado por alguns de “visorg”, este simbionte de corpo achatado lembra uma mão enrugada com dedos compridos e duas grandes gemas vermelhas incrustadas no dorso. Uma vez posicionada no rosto do hospedeiro, a criatura crava seus “dedos”, permanentemente prendendo-se à sua face e substituindo seus olhos. O hospedeiro recebe +5 em Percepção, enxerga perfeitamente no escuro, incluindo em magias de escuridão, e não pode ser flanqueado. Além disso, pode lançar a magia Visão da Verdade. Se aprender essa magia, seu custo é reduzido em –1 PM. Preço: T$ 34.000.` },
  ],
};
