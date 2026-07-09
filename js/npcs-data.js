// ════════════════════════════════════════════════════════════════════
//  NPCS-DATA.JS — Guia de NPCs: fichas genéricas do povo de Arton
//  Localização: /grifos-alados/js/npcs-data.js
//
//  Biblioteca com as 41 fichas genéricas do livro "Guia de NPCs"
//  (Tormenta 20), organizadas por categoria. Cada ficha guarda o
//  TEXTO LIMPO do statblock, exatamente no formato do livro — quem
//  transforma esse texto em criatura do bestiário é o parser
//  parsearFicha() do monstros.js (o mesmo do "📋 Importar do livro").
//
//  Consumidores:
//    • monstros.js — botão "👤 Guia de NPCs" da cena (modal de inserção)
//    • npcs.js     — sub-aba "👤 Guia de NPCs" das Consultas rápidas
//
//  Campos de cada ficha:
//    chave   — id estável (não mudar; as duas telas usam)
//    nome/nd — repetidos fora do texto para listas e filtros
//    tipo    — linha de tipo e tamanho (só exibição em listas)
//    resumo  — uma linha para o modal de inserção
//    habilidadesExtra — chips que o parser não detecta pelo texto
//                       (opcional; ex.: "resistência mental" sem o "a")
//    texto   — statblock completo; PRIMEIRA linha = "Nome ND X",
//              depois descrição, linha de tipo, e o bloco do livro.
// ════════════════════════════════════════════════════════════════════
window.GUIA_NPCS = {

  categorias: [

    // ── 🌾 POVO DE ARTON — A PLEBE ─────────────────────────────────
    {
      chave: 'plebe', nome: 'Povo de Arton — A Plebe', icone: '🌾', cor: '#6e5a1a',
      intro: 'Dizem que, em Arton, existe um aventureiro para cada dez pessoas comuns. Mas quem são essas pessoas? São a maior parte da população das aldeias, vilas e cidades. Estas fichas não serão muito utilizadas em combate — ninguém espera que um herói enfrente um camponês —, mas podem ser úteis em outras situações. Por exemplo, se a ladina do grupo quiser roubar a oficina da vila, você pode usar a ficha do ferreiro.',
      fichas: [
        {
          chave: 'campones', nome: 'Camponês', nd: '1/4', tipo: 'Humanoide (humano) Médio',
          resumo: 'Fazendeiros, pastores e o grosso da população do Reinado.',
          texto:
`Camponês ND 1/4
A ficha mais simples de todas. Representa pessoas que vivem no campo, como fazendeiros, pastoras e outras — a maior parte da população do Reinado e além.
Humanoide (humano) Médio
Iniciativa +0, Percepção +3
Defesa 10, Fort +3, Ref +0, Von +1
Pontos de Vida 3
Deslocamento 9m (6q)
Corpo a Corpo Bordão +1 (1d6+1).
For 1, Des 0, Con 1, Int 0, Sab 1, Car 0
Perícias Adestramento +2, Ofício (fazendeiro) +2.
Equipamento Bordão. Tesouro Nenhum.`
        },
        {
          chave: 'ferreiro', nome: 'Ferreiro', nd: '1', tipo: 'Humanoide (humano) Médio',
          resumo: 'Forjador de corpo forte; briga com o martelo da oficina.',
          texto:
`Ferreiro ND 1
A figura responsável por forjar metais, normalmente de corpo forte e semblante rabugento. Em seu dia a dia, costuma fabricar ferramentas para sua comunidade, mas também pode lidar com armas e armaduras.
Humanoide (humano) Médio
Iniciativa +2, Percepção +2
Defesa 14, Fort +9, Ref +2, Von +5, resistência a fogo +2
Pontos de Vida 21
Deslocamento 9m (6q)
Corpo a Corpo Martelo de ferreiro +7 (1d8+9).
Martelo e Bigorna Quando usa a manobra quebrar ou ataca um objeto ou construto, o ferreiro recebe +2 no teste de ataque e na rolagem de dano.
For 3, Des 0, Con 1, Int 1, Sab 0, Car –1
Perícias Ofício (ferreiro) +8.
Equipamento Avental de couro (conta como armadura de couro), instrumentos de Ofício (ferreiro), martelo de ferreiro (conta como uma maça). Tesouro Padrão.`
        },
        {
          chave: 'matuto', nome: 'Matuto', nd: '1/2', tipo: 'Humanoide (humano) Médio',
          resumo: 'Lenhadores, mineradores e gente de trabalho pesado.',
          texto:
`Matuto ND 1/2
Mais embrutecido que o camponês. São lenhadoras, mineradores e outras pessoas habituadas a trabalho pesado ou perigoso. Use esta ficha também para camponeses de regiões hostis.
Humanoide (humano) Médio
Iniciativa +3, Percepção +3
Defesa 14, Fort +4, Ref +1, Von +3
Pontos de Vida 14
Deslocamento 9m (6q)
Corpo a Corpo Machado de lenha +7 (1d6+5, x3).
For 2, Des 1, Con 2, Int 0, Sab 1, Car –1
Perícias Atletismo +6, Ofício (lenhador) +4.
Equipamento Gibão de peles, machado de lenha. Tesouro Nenhum.`
        },
        {
          chave: 'menestrel', nome: 'Menestrel', nd: '1/2', tipo: 'Humanoide (humano) Médio',
          resumo: 'Artista de rua; fascina plateias (e atira adagas).',
          texto:
`Menestrel ND 1/2
Típico artista de rua, entoando canções populares por algumas moedas. Pode surgir em quase qualquer lugar, de tavernas a estradas. Dizem que matar um deles atrai azar terrível (principalmente para o menestrel)!
Humanoide (humano) Médio
Iniciativa +4, Percepção +2
Defesa 12, Fort +0, Ref +6, Von +2
Pontos de Vida 11
Deslocamento 9m (6q)
Corpo a Corpo Adaga +4 (1d4+2, 19).
À Distância Adaga +4 (1d4+4, 19).
Distrair (Padrão) O menestrel fascina uma criatura em alcance curto (Von CD 14 evita e a criatura não pode mais ser fascinada por esta habilidade por um dia). A criatura fica fascinada enquanto o menestrel se concentrar (uma ação padrão por rodada).
Estilo de Arremesso O menestrel pode sacar armas de arremesso como uma ação livre e recebe +2 nas rolagens de dano com elas (já contabilizado).
For –1, Des 2, Con 0, Int 1, Sab 0, Car 2
Perícias Atuação +6, Enganação +6, Diplomacia +6, Jogatina +6.
Equipamento Adaga x2, instrumento musical. Tesouro Metade.`
        },
        {
          chave: 'mercador', nome: 'Mercador', nd: '1/2', tipo: 'Humanoide (humano) Médio',
          resumo: 'Comerciante comum, de mercados a mascates de estrada.',
          texto:
`Mercador ND 1/2
Comerciante comum, desde vendedores nos mercados das cidades até mascates viajantes nas estradas ou negociantes em entrepostos de fronteira.
Humanoide (humano) Médio
Iniciativa +2, Percepção +5
Defesa 10, Fort +1, Ref +2, Von +5
Pontos de Vida 11
Deslocamento 9m (6q)
Corpo a Corpo Clava +2 (1d6).
À Distância Besta leve +5 (1d8+2, 19).
For 0, Des 0, Con 1, Int 1, Sab 1, Car 1
Perícias Diplomacia +5, Intuição +5, Ofício (mercador) +5.
Equipamento Besta leve, clava, virotes x20. Tesouro Padrão.`
        },
        {
          chave: 'sabio', nome: 'Sábio', nd: '1/2', tipo: 'Humanoide (humano) Médio',
          resumo: 'Ancião respeitado; aconselha, instrui e distrai com eloquência.',
          texto:
`Sábio ND 1/2
Em pequenas comunidades onde não há burgomestre ou clérigo, muitas vezes esses papéis acabam nas mãos de um ancião ou anciã respeitados por sua sabedoria. Também há aqueles que vivem isolados, como eremitas… Ou aqueles que inesperadamente entram em tavernas à procura de aventureiros.
Humanoide (humano) Médio
Iniciativa +1, Percepção +7
Defesa 9, Fort +0, Ref +2, Von +7
Pontos de Vida 9
Deslocamento 9m (6q)
Corpo a Corpo Bordão +2 (1d6–1).
Conselho (Completa) Uma vez por cena por criatura, o sábio instrui uma criatura inteligente em alcance curto. Ela recebe +1d6 num teste à sua escolha em seu próximo turno.
Eloquência (Completa) O sábio distrai uma criatura inteligente (Int –3 ou maior) em alcance curto, que fica pasma por 1 rodada (Vont CD 16 evita e a criatura não pode mais ficar pasma por esta habilidade até o fim do dia).
For –1, Des –1, Con 0, Int 3, Sab 3, Car 2
Perícias Conhecimento +10, Cura +10, Intuição +10, Misticismo +10, Nobreza +10, Ofício (alquimia) +10, Religião +10, Sobrevivência +10.
Equipamento Bálsamo restaurador, bordão, gorro de ervas. Tesouro Padrão.`
        },
        {
          chave: 'mestreMercante', nome: 'Mestre Mercante', nd: '4', tipo: 'Humanoide (humano) Médio',
          resumo: 'Negociante veterano de caravanas, com estoque de poções.',
          texto:
`Mestre Mercante ND 4
Este negociante experiente possui um bazar ou oficina ou comanda uma caravana ou navio mercante. Embora não seja uma figura aventureira, já se habituou a viagens desconfortáveis e já enfrentou sua cota de bandidagem. Talvez seja responsável por contratar o grupo para suas primeiras missões.
Humanoide (humano) Médio
Iniciativa +8, Percepção +8
Defesa 20, Fort +6, Ref +10, Von +14
Pontos de Vida 76
Deslocamento 9m (6q)
Corpo a Corpo Adaga +12 (1d4+4, 19).
À Distância Besta pesada +14 (3d6+4, 18, mais 3d4 ácido).
Duro de Enrolar Recebe +5 em Vontade contra barganha.
Estoque de Poções (Padrão) Saca e usa uma poção entre as seguintes.
• Granada de Fogo. Causa 10d6 pontos de dano de fogo num raio de 6m em alcance curto (Ref CD 21 reduz à metade).
• Poção de Invisibilidade. Fica invisível por uma cena ou até executar uma ação hostil.
• Poção de Visão Mística. Até o fim da cena, detecta todas as auras mágicas em alcance médio e enxerga criaturas e objetos invisíveis.
Pernas pra que te Quero Com o costume de correr de assaltantes para salvar sua pele e mercadorias, sempre que se move na direção oposta de seus adversários, seu deslocamento aumenta em +6m.
For 0, Des 2, Con 3, Int 3, Sab 2, Car 3
Perícias Adestramento +7, Conhecimento +9, Diplomacia +12, Intuição +11, Ofício (mercador) +12.
Equipamento Adaga, besta pesada certeira, couro batido reforçado, virotes x20. Tesouro Dobro.`
        },
        {
          chave: 'taverneiro', nome: 'Taverneiro', nd: '2', tipo: 'Humanoide (humano) Médio',
          resumo: 'Já viu muita briga de bar; fonte de fofocas da região.',
          texto:
`Taverneiro ND 2
Trabalhando atrás de seu balcão, o taverneiro típico já viu muitas brigas de bar e não se assusta com qualquer coisa. Alguns possuem segurança (veja "Capangas", em Ameaças de Arton, p. 43) ou podem ser aventureiros aposentados, com fichas mais poderosas.
Humanoide (humano) Médio
Iniciativa +3, Percepção +3
Defesa 14, Fort +10, Ref +7, Von +5
Pontos de Vida 32
Deslocamento 9m (6q)
Corpo a Corpo Clava +10 (1d6+7).
Cerveja nos Olhos (Movimento) Uma vez por cena, o taverneiro atira cerveja nos olhos de uma criatura em alcance curto. A criatura fica atordoada por uma rodada (Ref CD 18 evita).
Fofoca O taverneiro fornece +5 em um teste de Investigação para interrogar (apenas uma vez por dia para a mesma informação). Receber esse benefício pode exigir conquistar a boa vontade do taverneiro, com diplomacia ou tibares.
For 2, Des 0, Con 2, Int 0, Sab 1, Car 1
Perícias Intuição +9, Ofício (taverneiro) +8.
Equipamento Caneco de cerveja, clava. Tesouro Padrão.`
        },
      ]
    },

    // ── ⛪ O TEMPLO ────────────────────────────────────────────────
    {
      chave: 'templo', nome: 'O Templo', icone: '⛪', cor: '#9a6a1a',
      intro: 'Embora grande parte dos devotos não responda a ninguém exceto aos próprios deuses, algumas igrejas estão entre as maiores organizações de Arton. Cultos como os de Valkaria, Khalmyr e Tanna-Toh possuem templos grandiosos como castelos, sediando sua própria burocracia — e intrigas.\nTodas as criaturas desta seção são devotas de seus respectivos deuses e recebem um Poder Concedido de sua divindade à sua escolha. Ignore quaisquer características incompatíveis com as Obrigações & Restrições do devoto (por exemplo, um devoto de Marah não fará ataques, enquanto um de Megalokk não possuirá perícias de Inteligência ou Carisma).',
      fichas: [
        {
          chave: 'acolito', nome: 'Acólito', nd: '1/2', tipo: 'Humanoide (humano) Médio',
          resumo: 'Devoto sem poderes divinos; assistente e guarda de templo.',
          texto:
`Acólito ND 1/2
Devotos sem poderes divinos, acólitos formam a maior parte dos membros de uma igreja. Atuam como assistentes de sacerdotes e guardas de templos.
Humanoide (humano) Médio
Iniciativa +1, Percepção +4
Defesa 11, Fort +3, Ref +0, Von +5
Pontos de Vida 11
Deslocamento 9m (6q)
Corpo a Corpo Maça +5 (1d8+3).
Prece (Movimento) O acólito recebe +1d6 em seu próximo teste de perícia feito nesse turno. Esta habilidade só pode ser usada uma vez por cena.
For 2, Des 0, Con 1, Int 0, Sab 2, Car 1
Perícias Religião +4.
Equipamento Maça, símbolo sagrado. Tesouro Nenhum.`
        },
        {
          chave: 'sacerdote', nome: 'Sacerdote', nd: '2', tipo: 'Humanoide (humano) Médio',
          resumo: 'Cuida de um pequeno templo; cura e protege os fiéis.',
          habilidadesExtra: ['resistenciaA'],
          texto:
`Sacerdote ND 2
Responsável por um pequeno templo ou conselheiro de um burgomestre ou nobre menor. Embora tenha menos poderes que um clérigo aventureiro, pode acudir heróis em necessidade.
Humanoide (humano) Médio
Iniciativa +3, Percepção +6
Defesa 17, Fort +7, Ref +4, Von +11, resistência mental +2
Pontos de Vida 47
Pontos de Mana 13
Deslocamento 9m (6q)
Corpo a Corpo Bordão +7 (1d6+3).
Autoridade Eclesiástica O sacerdote recebe +5 em Diplomacia e Intimidação com devotos de sua divindade.
Defesas do Templo (Movimento, 2 PM) O sacerdote evoca as defesas divinas do templo. Isso funciona como o efeito básico da magia Arma Espiritual, mas também concede +5 na Defesa do sacerdote. Ele só pode usar esta habilidade dentro dos limites de seu templo.
Paróquia Enquanto estiver em seu templo, o sacerdote recebe +2 na Defesa e em testes de resistência, e a CD para resistir às suas magias aumenta em +2.
Magias Como um clérigo de 2º nível (CD 18).
• Curar Ferimentos (Padrão, 2 PM) Uma criatura adjacente cura 3d8+3 PV.
• Orientação (Padrão, 3 PM) O sacerdote escolhe um atributo e uma criatura em alcance curto. Até o fim da cena, sempre que a criatura fizer um teste de perícia do atributo escolhido, rola dois dados e fica com o melhor resultado.
• Santuário (Padrão, 1 PM) O sacerdote toca uma criatura. Até o fim da cena, ou até que a criatura faça uma ação hostil, qualquer criatura que tente fazer uma ação hostil contra ela perde a ação (Von evita).
For 0, Des 0, Con 1, Int 2, Sab 3, Car 3
Perícias Conhecimento +5, Cura +6, Diplomacia +6, Misticismo +5, Religião +12.
Equipamento Bordão, manto eclesiástico, símbolo sagrado. Tesouro Padrão.`
        },
        {
          chave: 'altoSacerdote', nome: 'Alto Sacerdote', nd: '9', tipo: 'Humanoide (humano) Médio',
          resumo: 'Autoridade da fé; o clérigo mais poderoso da cidade.',
          habilidadesExtra: ['resistenciaA'],
          texto:
`Alto Sacerdote ND 9
Uma autoridade da fé, provavelmente o clérigo mais poderoso de sua cidade. Sempre ocupado com assuntos administrativos da igreja, será difícil conseguir uma audiência com ele.
Humanoide (humano) Médio
Iniciativa +8, Percepção +13
Defesa 31, Fort +15, Ref +9, Von +21, resistência mental +2
Pontos de Vida 250
Pontos de Mana 50
Deslocamento 9m (6q)
Corpo a Corpo Báculo da fé +25 (2d6+10 mais 2d6 energia).
Autoridade Eclesiástica O alto sacerdote recebe +5 em Diplomacia e Intimidação com devotos de sua divindade.
Defesas do Templo (Movimento, 2 PM) O alto sacerdote evoca as defesas divinas do templo. Isso funciona como o efeito básico da magia Arma Espiritual, mas também concede +5 na Defesa do sacerdote. Ele só pode usar esta habilidade dentro dos limites de seu templo.
Força da Fé (Reação, 2 PM) Uma vez por cena, quando sofre dano que o deixaria abaixo de 1 PV, o alto sacerdote ignora esse dano.
Paróquia Enquanto estiver em seu templo, o alto sacerdote recebe +2 na Defesa e em testes de resistência, e a CD para resistir às suas magias aumenta em +2.
Magias Como um clérigo de 9º nível (CD 30).
• Comando (Padrão, 4 PM) O alto sacerdote ordena a duas criaturas em alcance curto que se ajoelhem no início de seus turnos. Cada criatura fica caída e não pode se levantar até o começo de seu próximo turno (Von evita).
• Coluna de Chamas (Padrão, 9 PM) Um cilindro de fogo com 3m de raio e 15m de altura em alcance longo causa 8d6 pontos de dano de fogo e 7d6 pontos de dano de luz em criaturas e objetos livres na área (Ref reduz à metade).
• Curar Ferimentos (Padrão, 9 PM) Uma criatura adjacente cura 10d8+10 PV.
• Dissipar Magia (Padrão, 3 PM) O alto sacerdote escolhe uma criatura, objeto ou esfera de 3m em alcance médio e faz um teste de Misticismo. Todas as magias no alvo escolhido com CD menor que o teste são dissipadas. Se lançada contra um item mágico, transforma-o em um item mundano por 1d6 rodadas (Von anula).
• Orientação (Padrão, 8 PM) O alto sacerdote escolhe um atributo e qualquer número de criaturas em alcance curto. Até o fim da cena, sempre que uma das criaturas fizer um teste de perícia do atributo escolhido, rola dois dados e fica com o melhor resultado.
• Santuário (Padrão, 1 PM) O alto sacerdote toca uma criatura. Até o fim da cena, ou até que a criatura faça uma ação hostil, qualquer criatura que tente fazer uma ação hostil contra ela perde a ação (Von evita).
For 1, Des 0, Con 3, Int 3, Sab 5, Car 4
Perícias Conhecimento +11, Cura +13, Diplomacia +14, Intuição +13, Misticismo +12, Religião +20.
Equipamento Báculo da fé, batina consagrada, manto eclesiástico aprimorado, símbolo sagrado. Tesouro Dobro.`
        },
      ]
    },

    // ── ⚖ A LEI ───────────────────────────────────────────────────
    {
      chave: 'lei', nome: 'A Lei', icone: '⚖', cor: '#2f6f9e',
      intro: 'Variando de uma milícia sonolenta em um pequeno burgo onde nada acontece até a poderosa Guarda de Valkaria, agentes da lei podem ser aliados bem-vindos ou adversários inconvenientes, dependendo da atitude dos aventureiros.',
      fichas: [
        {
          chave: 'alcaideValkaria', nome: 'Alcaide de Valkaria', nd: '4', tipo: 'Humanoide (humano) Médio',
          resumo: 'Patrulheiro veterano; lidera patrulhas e chama reforços.',
          texto:
`Alcaide de Valkaria ND 4
Patrulheiros veteranos. Operam liderando patrulhas ou alocados em postos importantes da cidade, como portões ou praças de mercados.
Humanoide (humano) Médio
Iniciativa +6, Percepção +6
Defesa 23, Fort +15, Ref +10, Von +6
Pontos de Vida 70
Deslocamento 6m (4q)
Corpo a Corpo Espada longa x2 +16 (1d8+8, 19).
À Distância Arco longo x2 +16 (1d8+8, x3).
Chamar Reforços (Padrão) O alcaide invoca 1d4 patrulheiros de Valkaria (veja a ficha Patrulheiro de Valkaria) que surgem em espaços desocupados em alcance curto. Eles agem a partir da próxima rodada do alcaide. Recarga (1d4 rodadas).
For 3, Des 2, Con 2, Int 0, Sab 2, Car 0
Perícias Atletismo +7, Intuição +6.
Equipamento Arco longo, algemas, apito, cota de malha reforçada, espada longa, flechas x20, lampião. Tesouro Metade.`
        },
        {
          chave: 'besteiro', nome: 'Besteiro', nd: '1', tipo: 'Humanoide (humano) Médio',
          resumo: 'Guarda de muralha; besta pesada e saraivadas em grupo.',
          texto:
`Besteiro ND 1
Estes guardas especializados atuam nas muralhas de grandes cidades ou nas torres de castelos. Um pelotão desses pode abater até mesmo monstros como serpes — ou aventureiros imprudentes.
Humanoide (humano) Médio
Iniciativa +7, Percepção +5
Defesa 16, Fort +5, Ref +8, Von +3
Pontos de Vida 11
Deslocamento 9m (6q)
Corpo a Corpo Espada curta +9 (1d6+2, 19).
À Distância Besta pesada +11 (1d12+6, 19).
Besteiro Treinado Pode fazer ataques à distância contra oponentes envolvidos em combate corpo a corpo sem sofrer a penalidade de –5 no teste de ataque. Além disso, pode recarregar sua besta como uma ação de movimento.
Saraivada (Padrão) Se dois ou mais besteiros estiverem adjacentes, todos podem gastar uma ação padrão para disparar uma saraivada em um alvo em alcance médio. O alvo sofre 1d12+6 pontos de dano de perfuração, +1d12 por besteiro além do primeiro (Ref CD 17 reduz à metade).
For 1, Des 3, Con 1, Int 0, Sab 1, Car –1
Equipamento Besta pesada, couro batido, espada curta, virotes x20. Tesouro Metade.`
        },
        {
          chave: 'capitaoGuarda', nome: 'Capitão da Guarda', nd: '6', tipo: 'Humanoide (anão) Médio',
          resumo: 'Oficial máximo da guarda local; comanda e inspira soldados.',
          texto:
`Capitão da Guarda ND 6
O oficial mais graduado na força policial local, respondendo apenas ao burgomestre ou barão. Muitas vezes trata-se de um aventureiro veterano.
Humanoide (anão) Médio
Iniciativa +5, Percepção +7, visão no escuro
Defesa 27, Fort +17, Ref +7, Von +12, redução de dano 5, resistência a medo +2
Pontos de Vida 195
Deslocamento 6m (4q)
Corpo a Corpo Machado anão x2 +20 (2d12+10, x3).
À Distância Azagaia +17 (2d6+8).
Mexa-se, Soldado (Movimento) O capitão dá um comando a um aliado em alcance médio, que pode fazer uma ação padrão imediatamente.
Ordens (Movimento) O capitão grita ordens para seus aliados em alcance médio. Eles recebem +2 em testes de perícia até o fim da cena.
For 4, Des 0, Con 5, Int 0, Sab 2, Car 1
Perícias Atletismo +9, Guerra +5, Intuição +9.
Equipamento Apito, azagaia x2, enfeite de elmo, escudo pesado, machado anão, meia armadura. Tesouro Metade.`
        },
        {
          chave: 'golemGuardiao', nome: 'Golem Guardião', nd: '7', tipo: 'Construto Grande',
          resumo: 'Armadura animada com runas; detecta e eletrocuta invasores.',
          texto:
`Golem Guardião ND 7
Este construto rudimentar, pouco mais que uma armadura animada, é encontrado em castelos e grandes cidades, onde é usado para enfrentar invasores poderosos demais para guardas comuns. Runas de adivinhação gravadas no chassi deste golem tornam-no muito eficaz em detectar inimigos.
Construto Grande
Iniciativa +6, Percepção +12, visão no escuro
Defesa 30, Fort +18, Ref +13, Von +7, imunidade a eletricidade, redução de dano 10
Pontos de Vida 55
Deslocamento 6m (4q)
Corpo a Corpo Duas pancadas +25 (2d10+15 mais 2d8 eletricidade).
Pancada Atordoante Uma criatura atingida pela pancada do golem guardião fica atordoada por 1 rodada (Fort CD 24 evita e a criatura não pode mais ser atordoada por esta habilidade até o fim da cena).
Raio (Padrão) O golem dispara um raio em uma criatura em alcance médio. A criatura sofre 10d8 pontos de dano de eletricidade e fica atordoada por uma rodada (Ref CD 24 reduz à metade, evita a condição e a criatura não pode mais ser atordoada por esta habilidade até o fim da cena). Recarga (movimento).
Runas Divinatórias (Movimento) O golem fica sob efeito de Visão da Verdade até o fim da cena.
For 5, Des –1, Con 4, Int –, Sab 0, Car –5
Tesouro Fragmentos de runas (CD 21 para extrair, valem T$ 200 para fabricar catalisadores).`
        },
        {
          chave: 'guardaPalaciano', nome: 'Guarda Palaciano', nd: '3', tipo: 'Humanoide (humano) Médio',
          resumo: 'Guarda de elite de castelos; defende seu posto com afinco.',
          texto:
`Guarda Palaciano ND 3
Um guarda de elite, encarregado de proteger os portões e as muralhas de um castelo. Pequenos grupos podem ser destacados para missões especiais, como lidar com aventureiros, sob o comando de um guarda real (veja "A Corte").
Humanoide (humano) Médio
Iniciativa +6, Percepção +5
Defesa 21, Fort +14, Ref +4, Von +9
Pontos de Vida 28
Deslocamento 6m (4q)
Corpo a Corpo Espada longa x2 +16 (1d8+8, 19).
À Distância Besta pesada +16 (1d12+4, 19).
Sentinela Determinada O guarda palaciano recebe +2 em testes de perícia quando está lutando para defender seu posto (como um castelo, fortificação ou templo).
For 3, Des 1, Con 3, Int 0, Sab 2, Car 0
Perícias Atletismo +6, Intuição +5.
Equipamento Besta pesada, escudo pesado, espada longa, meia armadura, virotes x20. Tesouro Metade.`
        },
        {
          chave: 'miliciaArcana', nome: 'Milícia Arcana', nd: '5', tipo: 'Humanoide (humano) Médio',
          resumo: 'Arcanista de combate da guarda; lida com ameaças mágicas.',
          texto:
`Milícia Arcana ND 5
Presentes em muitas das maiores cidades do Reinado, a milícia arcana é composta por arcanistas de combate atuando como guardas. Possuem a função de auxiliar demais guardas contra ameaças não mundanas ou acompanhar capitães em missões.
Humanoide (humano) Médio
Iniciativa +7, Percepção +7
Defesa 21, Fort +11, Ref +4, Von +15, imunidade a efeitos mentais
Pontos de Vida 70
Pontos de Mana 27
Deslocamento 9m (6q)
Corpo a Corpo Espada longa +12 (1d8+7, 19).
Arcano de Batalha A milícia arcana soma sua Inteligência nas rolagens de dano com magias (já contabilizado).
Magias Como um mago de 5º nível (CD 21).
• Amarras Etéreas (Padrão, 3 PM) Três laços de energia surgem e se enroscam em uma criatura em alcance médio, deixando-a agarrada (Ref evita). A vítima pode tentar se livrar, gastando uma ação padrão para fazer um teste de Atletismo. Se passar, destrói um laço, mais um laço adicional para cada 5 pontos pelos quais superou a CD. Os laços podem ser atacados e destruídos: cada um tem Def 10, 10 PV, RD 5 e imunidade a dano mágico. Se todos os laços forem destruídos, a magia é dissipada.
• Arma Mágica (Padrão, 3 PM) Uma arma empunhada em alcance de toque se torna mágica até o fim da cena. Ela fornece +1 em testes de ataque e rolagens de dano e causa +1d6 pontos de dano de fogo. Se estiver empunhando a arma, o membro da milícia usa sua Inteligência no lugar da Força nos testes de ataque (ataque total +14).
• Dissipar Magia (Padrão, 3 PM) Escolhe uma criatura, objeto ou esfera de 3m em alcance médio e faz um teste de Misticismo. Todas as magias no alvo escolhido com CD menor que o teste são dissipadas. Se lançada contra um item mágico, transforma-o em um item mundano por 1d6 rodadas (Von anula).
• Seta Infalível de Talude (Padrão, 3 PM) Projeta três setas de energia distribuídas em até três criaturas em alcance médio. Cada seta causa 1d4+1 pontos de dano de essência (uma delas recebe +3 na rolagem de dano).
• Visão Mística (Padrão, 3 PM) Até o fim da cena, enxerga criaturas invisíveis e detecta todas as auras mágicas em alcance médio e recebe todas as informações sobre elas sem gastar ações. Pode gastar uma ação de movimento para descobrir se uma criatura em alcance médio é capaz de lançar magias e qual a aura gerada por suas magias.
For 2, Des 3, Con 2, Int 3, Sab 1, Car –1
Perícias Atletismo +6, Intuição +7, Misticismo +10.
Equipamento Essência de mana, espada longa, robe místico, varinha arcana. Tesouro Metade.`
        },
        {
          chave: 'patrulheiroValkaria', nome: 'Patrulheiro de Valkaria', nd: '2', tipo: 'Humanoide (humano) Médio',
          resumo: 'Base da Guarda de Valkaria; bem treinado e equipado.',
          texto:
`Patrulheiro de Valkaria ND 2
Embora sejam a base da hierarquia da Guarda de Valkaria, os patrulheiros ainda estão em patamar superior às demais cidades, com treinamento e equipamento de melhor qualidade.
Humanoide (humano) Médio
Iniciativa +5, Percepção +4
Defesa 18, Fort +11, Ref +7, Von +4
Pontos de Vida 17
Deslocamento 9m (6q)
Corpo a Corpo Espada longa x2 +13 (1d8+5, 19) ou porrete x2 +13 (1d6+5 não letal).
À Distância Arco longo +13 (1d8+5, x3).
Guardião Urbano O patrulheiro recebe +2 em testes de ataque, Atletismo, Intuição e Percepção em Valkaria.
Manter a Ordem O patrulheiro recebe +2 em testes para agarrar, derrubar ou desarmar.
For 2, Des 2, Con 2, Int 0, Sab 1, Car 0
Perícias Atletismo +5, Intuição +4.
Equipamento Arco longo, algemas, apito, couro batido reforçado, espada longa, flechas x20, lampião, porrete (veja Ameaças de Arton, p. 393). Tesouro Metade.`
        },
      ]
    },

    // ── 🗡 O CRIME ────────────────────────────────────────────────
    {
      chave: 'crime', nome: 'O Crime', icone: '🗡', cor: '#b3261e',
      intro: 'Se este é um mundo de heróis e heroínas, é porque eles são necessários — muitas vezes para lidar com criminosos. O crime em Arton tem muitas faces — do humilde batedor de algibeiras à infalível assassina a serviço de algum grande chefão de guilda — e tentáculos que alcançam todo o Reinado.',
      fichas: [
        {
          chave: 'assassino', nome: 'Assassino', nd: '3', tipo: 'Humanoide (humano) Médio',
          resumo: 'Matador de aluguel; lâminas envenenadas e ataques furtivos.',
          texto:
`Assassino ND 3
Hábeis com armas e táticas furtivas, estes matadores são tipicamente contratados por dinheiro. Podem agir acompanhados por capangas ou saqueadores, ou atuar como guarda-costas para nobres e chefes de guildas.
Humanoide (humano) Médio
Iniciativa +9, Percepção +3
Defesa 19, Fort +9, Ref +15, Von +3, evasão
Pontos de Vida 51
Deslocamento 9m (6q)
Corpo a Corpo Duas espadas curtas +12 (1d6+4, 19, mais veneno).
À Distância Adaga +12 (1d4+4, 19, mais veneno).
Assassinar (Movimento) O assassino analisa uma criatura em alcance curto. Até o fim de seu próximo turno, ele dobra os dados de dano extras por Ataque Furtivo em seu primeiro Ataque Furtivo que causar dano contra essa criatura.
Ataque Furtivo +3d6.
Veneno Peçonha concentrada (perde 1d12 pontos de vida durante 3 rodadas, Fort CD 19 reduz a duração para 1 rodada).
For 0, Des 4, Con 2, Int 2, Sab 0, Car 0
Perícias Acrobacia +9, Atletismo +5, Enganação +5, Furtividade +9, Ladinagem +9.
Equipamento Adaga x2, couro batido ajustado, espada curta x2, estojo de disfarces, gazua, veneno de naja x3. Tesouro Padrão.`
        },
        {
          chave: 'brucutu', nome: 'Brucutu', nd: '1/2', tipo: 'Humanoide (humano) Médio',
          resumo: 'Capanga forte e pouco brilhante; bate em quem mandarem.',
          texto:
`Brucutu ND 1/2
Um trabalhador braçal ou capanga forte, ainda que não muito brilhante. Normalmente frequenta tavernas, portos e outros lugares onde possa encontrar um empregador interessado em suas habilidades — no caso, carregar coisas... ou bater nelas.
Humanoide (humano) Médio
Iniciativa +2, Percepção +2
Defesa 13, Fort +5, Ref +3, Von +0
Pontos de Vida 7
Deslocamento 9m (6q)
Corpo a Corpo Clava +9 (1d6+6).
Valentão O brucutu recebe +2 em testes de ataque e rolagens de dano contra oponentes caídos, desprevenidos, enredados, flanqueados ou indefesos.
For 2, Des 0, Con 2, Int –1, Sab 0, Car –1
Perícias Atletismo +4, Intimidação +3.
Equipamento Andrajos de aldeão, bandana, clava. Tesouro Nenhum.
Parceiro O brucutu é um parceiro que impõe uma penalidade de –2 em Diplomacia e fornece os benefícios a seguir. Iniciante: pode carregar 2 espaços de itens e, uma vez por rodada, você recebe +1d6 pontos de dano em uma rolagem de dano corpo a corpo. Veterano: a quantidade de espaços carregados aumenta para 5 e o bônus em rolagens de dano corpo a corpo aumenta para +1d8. Mestre: a quantidade de espaços carregados aumenta para 10 e o bônus em rolagens de dano corpo a corpo aumenta para +1d10.`
        },
        {
          chave: 'charlatao', nome: 'Charlatão', nd: '1/2', tipo: 'Humanoide (hynne) Pequeno',
          resumo: 'Vigarista de elixires "milagrosos"; engana e escapa.',
          texto:
`Charlatão ND 1/2
O típico "trambiqueiro" — falsificador, vigarista, trapaceira ou mercador ambulante de elixires "milagrosos" e outros produtos de origem duvidosa. Use esta ficha para qualquer criminoso que possa enganar os personagens.
Humanoide (hynne) Pequeno
Iniciativa +7, Percepção +3
Defesa 13, Fort –1, Ref +6, Von +3
Pontos de Vida 9
Deslocamento 6m (4q)
Corpo a Corpo Adaga +5 (1d4+3, 19).
À Distância Funda +10 (1d6+3).
Aparência Inofensiva (Reação) A primeira criatura inteligente (Int –3 ou maior) que atacar o charlatão em uma cena deve fazer um teste de Vontade (CD 16). Se falhar, perderá sua ação.
Engambelar (Completa) O charlatão conquista a simpatia das pessoas ao seu redor. Isso simula a magia Enfeitiçar (veja Ameaças de Arton, p. 376), mas afeta todos os humanoides em alcance curto (Von CD 16 evita).
Sorte Salvadora (Reação) Uma vez por rodada, quando faz um teste de resistência, o charlatão pode rolar novamente esse teste.
For –1, Des 3, Con –1, Int 1, Sab –1, Car 4
Perícias Atletismo +5, Diplomacia +8, Enganação +14, Furtividade +9, Jogatina +8, Ladinagem +7.
Equipamento Adaga, capa esvoaçante, funda, gazua, pedras x20, poção de curar ferimentos (2d8+2), poção falsa. Tesouro Padrão.`
        },
        {
          chave: 'mercadorDesonesto', nome: 'Mercador Desonesto', nd: '5', tipo: 'Humanoide (tritão) Médio',
          resumo: 'Negociante salafrário; barganha mágica e capangas de aluguel.',
          texto:
`Mercador Desonesto ND 5
Um negociante bem-sucedido, talvez até mesmo dono de um bazar ou mestre de caravanas, e completamente salafrário. Grupos recém-chegados de suas aventuras, carregados de ouro para gastar e tesouros para vender, estão entre seus alvos preferidos.
Humanoide (tritão) Médio
Iniciativa +8, Percepção +5
Defesa 23, Fort +6, Ref +12, Von +15, evasão
Pontos de Vida 95
Deslocamento 9m (6q), natação 12m (8q)
Corpo a Corpo Tridente +15 (1d8+12).
À Distância Azagaia +17 (1d6+12).
Canção dos Mares (Padrão) Uma vez por cena, o mercador pode lançar Enfeitiçar ou Sono (CD 20).
Chamar Empregados (Movimento) O mercador invoca 1d4+1 capangas em espaços desocupados em alcance médio. Eles agem a partir da próxima rodada do mercador, têm deslocamento 9m e podem gastar uma ação padrão para causar 1d10+5 pontos de dano de impacto em uma criatura adjacente. Os capangas têm For 2, Des 1, Defesa 13, 1 PV e falham automaticamente em qualquer teste oposto ou de resistência. Recarga (1d4 rodadas).
Língua dos Tolos O mercador usa Enganação no lugar de Diplomacia para barganha e recebe +5 nesses testes. Se um personagem barganhar com o mercador e perder, o mercador muda o preço a seu favor, como se ele estivesse barganhando (veja Tormenta20, p. 118). O personagem irá acreditar que está fazendo um ótimo negócio, a menos que passe em um teste de Vontade (CD 25).
Tudo que Você Precisa O mercador tem qualquer item mundano superior de até T$ 1.000 em seu estoque. Entretanto, para cada item, role 1d6 para determinar sua condição. 1-2: o item é falso e não funciona. 3-4: o item está defeituoso e precisa ser consertado. 5-6: o item funciona normalmente. O comprador precisa passar em um teste de Percepção ou de um Ofício apropriado (CD 25) para notar qualquer problema no item.
For –1, Des 4, Con 0, Int 2, Sab 1, Car 4
Perícias Atletismo +8, Diplomacia +8, Enganação +13 (+18 para barganha), Ladinagem +10, Intuição +5, Misticismo +6.
Equipamento Azagaia x2, capa esvoaçante, gazua, luva de pelica, tridente. Tesouro Padrão.`
        },
        {
          chave: 'mestreAssassino', nome: 'Mestre Assassino', nd: '9', tipo: 'Humanoide (elfo) Médio',
          resumo: 'O melhor matador que o dinheiro paga; invisível e letal.',
          texto:
`Mestre Assassino ND 9
Este costuma ser o melhor assassino que o dinheiro pode pagar. Alguns, no entanto, não trabalham por moedas; seguem um código pessoal, são devotos de deuses cruéis ou apenas alimentam algum prazer sádico em tirar vidas. Pode também ser o líder de uma guilda de assassinos.
Humanoide (elfo) Médio
Iniciativa +16, Percepção +11, visão na penumbra
Defesa 32, Fort +15, Ref +21, Von +9, evasão aprimorada
Pontos de Vida 152
Deslocamento 12m (8q)
Corpo a Corpo Duas cimitarras +25 (2d6+12, 17, mais veneno).
À Distância Besta pesada +25 (3d6+9, 19, mais veneno).
Assassinar (Movimento) O assassino analisa uma criatura em alcance curto. Até o fim de seu próximo turno, ele dobra os dados de dano extras por Ataque Furtivo em seu primeiro Ataque Furtivo que causar dano contra essa criatura.
Ataque Furtivo +9d8.
Dança da Morte (Movimento) Uma vez por cena, o assassino se movimenta com tanta velocidade que desaparece da visão. Ele fica invisível por 1d4+1 rodadas.
Mão na Boca O assassino recebe +2 em testes de agarrar (modificador total +27). Quando faz um ataque furtivo contra uma criatura desprevenida, ele pode fazer um teste de agarrar como uma ação livre. A criatura não poderá falar enquanto estiver agarrada desta forma.
Veneno Peçonha potente (perde 2d12 pontos de vida durante 3 rodadas, Fort CD 30 reduz a duração para 1 rodada).
For 0, Des 6, Con 3, Int 4, Sab 1, Car 0
Perícias Acrobacia +16, Atletismo +10, Enganação +10, Furtividade +16, Ladinagem +16.
Equipamento Besta pesada certeira com mira telescópica, cimitarra certeira x2, couraça sob medida, gazua aprimorada, virote de adamante x20. Tesouro Padrão.`
        },
        {
          chave: 'punguista', nome: 'Punguista', nd: '1/2', tipo: 'Humanoide (goblin) Pequeno',
          resumo: 'Batedor de carteiras; furta e some pelos becos.',
          texto:
`Punguista ND 1/2
Um ladrão típico, que infesta as praças e os becos de grandes cidades. Seu modo de "trabalho" é furtar sua vítima e desaparecer antes que ela perceba. Se for visto, tentará fugir.
Humanoide (goblin) Pequeno
Iniciativa +8, Percepção +3, visão no escuro
Defesa 14, Fort +1, Ref +6, Von +3
Pontos de Vida 11
Deslocamento 12m (8q), escalada 12m (8q)
Corpo a Corpo Adaga +5 (1d4+4, 19).
For 0, Des 4, Con 0, Int 2, Sab 0, Car –2
Perícias Acrobacia +6, Atletismo +6, Furtividade +10, Ladinagem +10.
Equipamento Adaga, gazua. Tesouro Metade.`
        },
      ]
    },

    // ── 👑 A CORTE ────────────────────────────────────────────────
    {
      chave: 'corte', nome: 'A Corte', icone: '👑', cor: '#7a3fa6',
      intro: 'Enquanto o povo comum enfrenta vidas duras e simples, aqueles que habitam os castelos e palácios lidam com uma realidade muito diferente. Este é um mundo de conforto, protegido da natureza, de bandidos e de monstros — mas também um mundo de política e intriga, onde uma palavra ou gesto errados pode levar sua família à ruína… Ou ao machado do carrasco.',
      fichas: [
        {
          chave: 'barao', nome: 'Barão', nd: '7', tipo: 'Humanoide (humano) Médio',
          resumo: 'Baixa nobreza com castelo próprio; presença que desarma.',
          texto:
`Barão ND 7
Antes de despertar a atenção de reis e generais, aventureiros muitas vezes serão contratados por barões. Embora seja membro da baixa nobreza, um barão tem várias propriedades rurais, seu próprio castelo e um bom número de guardas e cavaleiros.
Humanoide (humano) Médio
Iniciativa +8, Percepção +9
Defesa 32, Fort +21, Ref +7, Von +14, redução de dano 10, resistência a medo +2
Pontos de Vida 220
Deslocamento 6m (4q)
Corpo a Corpo Espada bastarda x2 +24 (3d6+20, 18).
Guarda Pessoal O barão está sempre acompanhado de dois guardas palacianos (veja a ficha Guarda Palaciano) que não contam para o cálculo de XP e tesouro do encontro.
Presença Aristocrática (Reação) Quando uma criatura inteligente (Int –3 ou maior) tenta machucar o barão, deve fazer um teste de Vontade (CD 24). Se falhar, não conseguirá machucá-lo e perderá a ação. O barão só pode usar esta habilidade uma vez por cena contra cada criatura.
For 3, Des 1, Con 3, Int 2, Sab 2, Car 3
Perícias Diplomacia +17, Guerra +14, Intimidação +10, Intuição +14, Nobreza +14.
Equipamento Armadura completa reforçada, escudo pesado, espada bastarda certeira de adamante, tabardo aprimorado. Tesouro Dobro.`
        },
        {
          chave: 'castelao', nome: 'Castelão', nd: '4', tipo: 'Humanoide (humano) Médio',
          resumo: 'Administrador do castelo; grita ordens e chama a guarda.',
          texto:
`Castelão ND 4
O principal conselheiro de um barão, responsável pela administração cotidiana do castelo (daí o nome do cargo). Pode ser um guarda veterano ou um nobre menor; arrogante e corrupto ou justo e honrado. De qualquer forma, normalmente será o primeiro contato de aventureiros iniciantes com o poder.
Humanoide (humano) Médio
Iniciativa +4, Percepção +7
Defesa 22, Fort +10, Ref +4, Von +16
Pontos de Vida 90
Deslocamento 6m (4q)
Corpo a Corpo Maça x2 +15 (1d8+7).
Chamar Reforços (Padrão) O castelão invoca 1d4 guardas palacianos (veja a ficha Guarda Palaciano) que surgem em espaços desocupados em alcance curto. Eles agem a partir da próxima rodada do castelão. Recarga (1d4 rodadas).
Desconfiar Uma vez por cena, o castelão pode rolar novamente um teste de Intuição ou Percepção recém-realizado.
Gritar Ordens (Padrão) Os aliados em alcance médio do castelão recebem +2 em testes de perícia até o fim da rodada.
For 2, Des 0, Con 3, Int 2, Sab 3, Car 2
Perícias Conhecimento +6, Diplomacia +6, Intimidação +6, Intuição +7, Nobreza +8.
Equipamento Cota de malha, escudo pesado, maça certeira. Tesouro Padrão.`
        },
        {
          chave: 'cavaleiro', nome: 'Cavaleiro', nd: '5', tipo: 'Humanoide (humano) Médio',
          resumo: 'Guerreiro de elite montado; investidas devastadoras.',
          texto:
`Cavaleiro ND 5
O patamar mais baixo da nobreza feudal, cavaleiros não possuem terras próprias, em vez disso morando no castelo de um barão ou outro nobre. Servem como guerreiros de elite, capazes de lutar tanto dentro dos salões do castelo para proteger seu senhor, quanto no campo de batalha para esmagar os inimigos dele. Suas personalidades variam — de guerreiros sérios e sisudos a dândis que adoram torneios e bailes —, mas quase sempre serão rivais de aventureiros intrometidos.
Humanoide (humano) Médio
Iniciativa +5, Percepção +5
Defesa 26, Fort +17, Ref +9, Von +7, resistência a medo +5
Pontos de Vida 145
Deslocamento 6m (4q)
Corpo a Corpo Lança montada +16 (1d8+12, x3, alcance 3m) ou espada longa +16 (1d8+12, 19).
Cavaleiro Experiente O cavaleiro passa automaticamente em testes de Cavalgar para não cair da montaria quando sofre dano, e não sofre penalidades para atacar à distância enquanto montado. Além disso, quando faz uma investida montada, ele causa +2d8 pontos de dano e pode continuar se movendo depois do ataque. Ele deve se mover em linha reta e seu movimento máximo ainda é o dobro do seu deslocamento.
Corcel de Batalha O cavaleiro cavalga um cavalo de guerra (veja Tormenta20, p. 262). Enquanto ele estiver montado, seu deslocamento se torna 15m, ele recebe uma ação de movimento extra por turno (apenas para se deslocar) e +2 nos testes de ataque corpo a corpo.
Duelo (Livre) Uma vez por rodada, o cavaleiro escolhe um oponente em alcance curto e recebe +2 em testes de ataque e rolagens de dano contra ele até o fim da cena ou até atacar outro oponente.
For 3, Des 1, Con 3, Int 0, Sab 1, Car 3
Perícias Atletismo +7, Cavalgar +7, Diplomacia +9, Guerra +4, Nobreza +4.
Equipamento Cavalo de guerra, escudo pesado, espada longa, lança montada, meia armadura, tabardo aprimorado. Tesouro Padrão.`
        },
        {
          chave: 'cortesao', nome: 'Cortesão', nd: '1', tipo: 'Humanoide (humano) Médio',
          resumo: 'Bajulador da corte; adaga envenenada sob o traje fino.',
          texto:
`Cortesão ND 1
Membros de menor importância da corte. Enquanto alguns possuem cargos burocráticos ou diplomáticos, outros estão ali simplesmente porque agradam a alguém importante, entretendo (e bajulando) os nobres com conversas, músicas, jogos e danças.
Humanoide (humano) Médio
Iniciativa +3, Percepção +3
Defesa 14, Fort +1, Ref +5, Von +10
Pontos de Vida 24
Deslocamento 9m (6q)
Corpo a Corpo Adaga +7 (1d4+4, 19, mais veneno).
Desprezo O cortesão recebe +2 na Defesa e em testes de perícia contra criaturas inteligentes (Int –3 ou maior) com Carisma menor que o dele.
Veneno Peçonha concentrada (perde 1d12 pontos de vida por rodada por 3 rodadas, Fort CD 16 reduz a duração para 1 rodada).
For 0, Des 1, Con 1, Int 1, Sab 1, Car 4
Perícias Atuação +8, Diplomacia +8, Intimidação +8, Intuição +5, Nobreza +8.
Equipamento Adaga, peçonha concentrada x3, traje da corte. Tesouro Padrão.`
        },
        {
          chave: 'guardaCostasReal', nome: 'Guarda-costas Real', nd: '8', tipo: 'Humanoide (humano) Médio',
          resumo: 'Elite do reino; alabarda pesada e reflexos de sentinela.',
          texto:
`Guarda-costas Real ND 8
Selecionado entre os melhores combatentes do reino, este guarda-costas de elite traja armadura pesada e empunha uma arma mais pesada ainda. Pode ser encontrado nos pontos mais importantes de um castelo ou palácio, como a sala do tesouro e o quarto do regente.
Humanoide (humano) Médio
Iniciativa +8, Percepção +16
Defesa 33, Fort +20, Ref +9, Von +15, imunidade a desprevenido e surpreendido, redução de dano 5
Pontos de Vida 70
Deslocamento 6m (4q)
Corpo a Corpo Alabarda x2 +27 (4d6+20, x4).
Antecipar Perigo Criaturas adjacentes ao guarda-costas recebem imunidade a desprevenido e surpreendido.
Golpe Punitivo O guarda-costas recebe +5 na margem de ameaça contra criaturas que tenham atacado ele mesmo ou um de seus aliados na cena.
Retaliar (Reação) Uma vez por rodada, quando o guarda-costas ou um aliado adjacente é alvo de um ataque corpo a corpo, o guarda-costas pode fazer um ataque na criatura que o atacou.
Zeloso (Reação) Uma vez por rodada, se um aliado adjacente for alvo de um ataque, o guarda-costas pode se tornar o alvo do ataque, que é resolvido normalmente.
For 4, Des 0, Con 4, Int 0, Sab 2, Car 0
Perícias Atletismo +13, Intuição +12.
Equipamento Alabarda aumentada, armadura completa. Tesouro Padrão.`
        },
        {
          chave: 'magoCorte', nome: 'Mago da Corte', nd: '10', tipo: 'Humanoide (humano) Médio',
          resumo: 'Conselheiro arcano do regente; feitiços de guerra prontos.',
          texto:
`Mago da Corte ND 10
Embora atue principalmente como conselheiro, este arcanista está sempre preparado para conjurar poderosos feitiços em defesa de seu regente, atuando em conjunto com os guardas reais.
Humanoide (humano) Médio
Iniciativa +10, Percepção +11
Defesa 33, Fort +16, Ref +10, Von +22, imunidade a desprevenido e surpreendido, redução de dano 5
Pontos de Vida 220
Pontos de Mana 77
Deslocamento 9m (6q)
Corpo a Corpo Bordão +24 (1d6+5).
Arcano de Batalha O mago da corte soma sua Inteligência nas rolagens de dano com magias (já contabilizado).
Biblioteca Mágica (Padrão, 1 PM) O mago saca um pergaminho de uma magia arcana qualquer de até 3º círculo. Ele pode ativar o pergaminho (gastando a ação normal para isso) e lançar a magia contida nele como se a conhecesse.
Magia Acelerada (Livre, +4 PM) Uma vez por rodada, quando lança uma magia com execução de ação completa ou menor, o mago muda a execução dela para livre.
Magias Como um mago de 10º nível (CD 32).
• Bola de Fogo (Padrão, 10 PM) O mago causa 12d6+5 pontos de dano de fogo em todas as criaturas e objetos livres numa esfera de 6m em alcance médio (Ref reduz à metade).
• Campo de Força (Reação, 7 PM) Quando sofre dano, o mago recebe redução de dano 50 contra esse dano.
• Dissipar Magia (Padrão, 3 PM) O mago escolhe uma criatura, objeto ou esfera de 3m em alcance médio e faz um teste de Misticismo. Todas as magias no alvo escolhido com CD menor que o teste são dissipadas. Se lançada contra um item mágico, transforma-o em um item mundano por 1d6 rodadas (Von anula).
• Lendas e Histórias (Padrão, 6 PM) Descobre informações sobre uma criatura, objeto ou local que esteja tocando.
• Runa de Proteção (1 hora, 10 PM) Cria uma runa que protege uma passagem. Quando uma criatura entra na área afetada, a runa explode, causando 20d6 pontos de dano de fogo em todos os alvos até 6m.
• Seta Infalível de Talude (Padrão, 7 PM) O mago projeta cinco setas de energia em até cinco criaturas em alcance médio. Cada seta causa 1d8+1 pontos de dano de essência (uma delas recebe +5 na rolagem de dano).
For 0, Des 1, Con 3, Int 5, Sab 2, Car 2
Perícias Conhecimento +14, Misticismo +18, Nobreza +14, Ofício (alquimista) +14.
Equipamento Bordão, chapéu arcano, essência de mana, medalhão de prata, poção de curar ferimentos (7d8+7 PV), robe místico aprimorado. Tesouro Dobro.`
        },
        {
          chave: 'falcao', nome: 'Falcão', nd: '1/4', tipo: 'Animal Minúsculo',
          resumo: 'Ave de caça treinada; mergulha e rasga o rosto da presa.',
          texto:
`Falcão ND 1/4
Animal Minúsculo
Iniciativa +5, Percepção +9, visão na penumbra
Defesa 13, Fort +2, Ref +5, Von +2
Pontos de Vida 5
Deslocamento 3m (2q), voo 18m (12q)
Corpo a Corpo Garras +6 (1d4, 18).
Mergulho O falcão pode continuar se movendo no mesmo sentido após atacar durante uma investida alada.
Rasgar o Rosto Uma criatura que sofra dano de um acerto crítico das garras do falcão fica cega por 1d4 rodadas.
For –2, Des 3, Con 0, Int –4, Sab 2, Car –2
Tesouro Nenhum.
Parceiro Um falcão é um parceiro especial (perseguidor) que fornece os benefícios a seguir. Iniciante: uma vez por cena, você pode gastar uma ação de movimento e fazer um teste de Adestramento (CD 10). Se passar, o falcão concede a você +1 em testes de ataque, Percepção e Sobrevivência até o fim da cena. Para cada 10 pontos pelos quais o resultado de seu teste passar a CD, esse bônus aumenta em +1. Veterano: você pode usar Sentidos Aguçados. Mestre: uma vez por rodada, você pode gastar 1 PM para fazer uma criatura em alcance médio ficar cega por 1d4 rodadas (Ref CD Car evita).`
        },
      ]
    },

    // ── ⚔ MERCENÁRIOS ─────────────────────────────────────────────
    {
      chave: 'mercenarios', nome: 'Mercenários', icone: '⚔', cor: '#6a7a1f',
      intro: 'Mercenários são soldados que vendem seus serviços para quem pagar mais. Podem ser apenas um grupo de combatentes que viaja junto em busca de trabalho — quase como um grupo de aventureiros, mas em geral com habilidades mais simplórias e moral mais flexível. Ou podem atingir centenas de combatentes de várias raças, organizados de forma semelhante a uma força militar, com patentes, um estandarte e até mesmo armas de cerco. Essas tropas, chamadas de companhias, podem desequilibrar uma guerra para o lado de qualquer um com tibares suficientes.\nTodo aventureiro em Arton, em algum momento de sua carreira, encontrará mercenários em seu caminho, defendendo a fortaleza do inimigo, a serviço de um nobre aliado ou simplesmente saqueando os camponeses locais no intervalo entre uma guerra e outra.',
      fichas: [
        {
          chave: 'arquivista', nome: 'Arquivista', nd: '6', tipo: 'Humanoide (humano) Médio',
          resumo: 'Escriba e clérigo de Tanna-Toh da companhia mercenária.',
          texto:
`Arquivista ND 6
Um misto de escriba, sábio e intendente, o arquivista é encarregado de registrar a história da companhia (para quais reinos ela viajou, de quais batalhas participou…) e redigir os contratos de serviço (documentos que estipulam os termos a serem seguidos pelos mercenários). O arquivista também atua no campo de batalha, usando preces e conhecimento para auxiliar seus companheiros.
Humanoide (humano) Médio
Iniciativa +5, Percepção +9, visão no escuro
Defesa 24, Fort +12, Ref +6, Von +18
Pontos de Vida 145
Pontos de Mana 29
Deslocamento 6m (4q)
Corpo a Corpo Bordão x2 +16 (1d6+6 mais 2d6 luz).
Histórias da Companhia (Padrão) Uma vez por cena, o arquivista mercenário relembra seus companheiros de alguma missão bem-sucedida. Até o fim da cena, o arquivista e seus aliados em alcance médio recebem +5 nos testes de uma perícia específica (exceto testes de ataque).
Símbolo Sagrado Energizado (Movimento, 1 PM) O arquivista energiza seu símbolo sagrado. Até o fim da cena, ele emite uma luz prateada que ilumina como uma tocha e, enquanto estiver sendo empunhado, reduz o custo de magias divinas em –1 PM.
Voz da Civilização O arquivista está sempre sob efeito da magia Compreensão.
Magias Como um clérigo de Tanna-Toh de 6º nível (CD 22).
• Arma Espiritual (Padrão, 5 PM, sustentada) Uma vez por rodada, como uma ação livre, o arquivista causa 3d6 pontos de dano de impacto automaticamente a uma criatura adjacente. Se não fizer isso e sofrer um ataque corpo a corpo nessa rodada, ele pode usar uma reação para causar esse dano ao atacante.
• Bênção (Padrão, 3 PM) Aliados em alcance curto recebem +2 em testes de ataque e rolagens de dano até o fim da cena.
• Curar Ferimentos (Padrão, 5 PM) Uma criatura adjacente cura 6d8+6 PV.
• Oração (Padrão, 3 PM, sustentada) O arquivista e seus aliados em alcance curto recebem +2 em testes de perícia e rolagens de dano, e todos os seus inimigos em alcance curto sofrem –2 em testes de perícia e rolagens de dano. Esse efeito é cumulativo com outras magias.
For 1, Des 0, Con 1, Int 3, Sab 4, Car 1
Perícias Conhecimento +8, Diplomacia +6, Guerra +8, Intuição +9, Investigação +8, Misticismo +8, Nobreza +8, Ofício (escriba) +8, Religião +9.
Equipamento Bordão, cota de malha, essência de mana, símbolo sagrado de Tanna-Toh. Tesouro Padrão.`
        },
        {
          chave: 'carcereiro', nome: 'Carcereiro', nd: '5', tipo: 'Morto-vivo (osteon) Médio',
          resumo: 'Osteon que aterroriza as celas do forte mercenário.',
          habilidadesExtra: ['reducaoDeDano'],
          texto:
`Carcereiro ND 5
Seja com desertores, prisioneiros de guerra ou cativos valiosos esperando resgate, as celas de um forte mercenário sempre estão ocupadas. O encarregado por manter esses prisioneiros na linha é o carcereiro, um indivíduo embrutecido que se diverte com o medo nos olhos de seus "hóspedes".
Morto-vivo (osteon) Médio
Iniciativa +7, Percepção +5, visão no escuro
Defesa 24, Fort +5, Ref +11, Von +17, imunidade a medo, redução de corte, frio e perfuração 5
Pontos de Vida 180
Deslocamento 9m (6q)
Corpo a Corpo Ferro em brasa +13 (2d6+8 mais 1d6 fogo) e gancho de carne +13 (2d8+8, x3).
Encarcerar a Coragem (Padrão) Criaturas em alcance curto ficam abaladas (Von CD 20 reduz a duração para 1 rodada e a criatura não pode mais ser abalada por esta habilidade até o fim da cena). Recarga (movimento).
Saborear o Tormento O carcereiro recebe +2 em testes de ataque e rolagens de dano contra criaturas sob efeito de uma condição de medo.
For 3, Des 3, Con 2, Int 0, Sab 1, Car 3
Perícias Cura +5, Intimidação +12.
Equipamento Couraça, ferro em brasa (equivalente a uma maça), gancho de carne (equivalente a uma foice). Tesouro Padrão.`
        },
        {
          chave: 'condotiero', nome: 'Condotiero', nd: '9', tipo: 'Humanoide (centauro) Grande',
          resumo: 'Líder mercenário centauro; comanda formações de batalha.',
          texto:
`Condotiero ND 9
Mercenários tendem a seguir o líder mais forte e habilidoso nas artes da guerra, alguém capaz de conduzi-los a vitórias (e saques) espetaculares. Chamados de condotieros, estes líderes mercenários podem vir de qualquer raça, até mesmo dos reclusos e desconfiados centauros.
Humanoide (centauro) Grande
Iniciativa +9, Percepção +9
Defesa 34, Fort +21, Ref +15, Von +9, redução de dano 5, resistência a efeitos mentais e medo +5
Pontos de Vida 365
Deslocamento 12m (8q)
Corpo a Corpo Lança montada x2 +26 (2d8+18, x3) ou espada longa x2 +26 (2d6+18, 19), e cascos +26 (2d8+18).
À Distância Azagaia +26 (2d8+18).
Formação de Ataque (Movimento) O condotiero comanda seus aliados em alcance médio. Até o início do próximo turno do condotiero, sempre que um desses aliados faz um ataque, rola dois dados e usa o melhor resultado.
Formação de Defesa (Movimento) O condotiero comanda seus aliados em alcance médio. Até o início do próximo turno do condotiero, cada aliado recebe redução de dano 5.
Investida Galopante (Completa) O condotiero faz uma investida. Ele pode passar pelo espaço ocupado por criaturas menores que ele, pode continuar se movendo depois do ataque e, se acertar, causa +4d8 pontos de dano. Criaturas no caminho percorrido pelo condotiero sofrem 1d8+9 pontos de dano de impacto e ficam caídas (Ref CD 28 evita).
Medo de Altura Se estiver adjacente a uma queda de 3m ou mais de altura, o condotiero fica abalado.
For 5, Des 1, Con 4, Int 1, Sab 1, Car 2
Perícias Atletismo +13, Diplomacia +10, Intimidação +10, Guerra +11.
Equipamento Azagaia aumentada x3, couraça reforçada, escudo pesado, espada longa aumentada, lança montada aumentada. Tesouro Padrão.`
        },
        {
          chave: 'espiao', nome: 'Espião', nd: '3', tipo: 'Humanoide (nezumi) Médio',
          resumo: 'Nezumi furtivo; embosca, rola e some com informações.',
          texto:
`Espião ND 3
Além dos usos convencionais, um espião pode descobrir oportunidades de trabalho para sua companhia e, em casos extremos, fomentar disputas e criar essas oportunidades. Por sua natureza furtiva, nezumi são excelentes para este trabalho. Sobretudo aqueles que, desgostosos com a paz entre seu povo e os humanos, abandonam Tamu-ra rumo ao continente em busca de oportunidades de empregar suas habilidades.
Humanoide (nezumi) Médio
Iniciativa +9, Percepção +4, faro, visão no escuro
Defesa 20, Fort +5, Ref +13, Von +9, esquiva sobrenatural, evasão, resistência a medo de criaturas maiores +5
Pontos de Vida 75
Deslocamento 9m (6q)
Corpo a Corpo Espada curta +12 (1d8+4, 19, mais veneno) e mordida +12 (1d6+4 corte).
À Distância Besta leve +12 (1d8+4, 19, mais veneno).
Ataque Furtivo +2d6.
Emboscar (Livre) O espião executa uma ação padrão adicional em seu turno. Ele só pode usar esta habilidade na primeira rodada de um combate.
Roedor Quando faz um acerto crítico com sua mordida, o espião deixa a armadura da vítima avariada ou, se ela estiver sem armadura, aumenta em +1 o multiplicador desse crítico (uma armadura avariada impõe –5 na Defesa).
Rolamento Defensivo (Reação) Uma vez por rodada, quando sofre dano, o espião reduz esse dano à metade e fica caído.
Veneno Perde 1d12 pontos de vida.
For 2, Des 4, Con 3, Int –1, Sab 1, Car 0
Perícias Acrobacia +8, Atletismo +5, Enganação +3, Furtividade +9 (+11 em urbano), Investigação +2, Intimidação +6, Ladinagem +9.
Equipamento Bandana, besta leve, espada curta aumentada, gazua, sapatos de camurça, virotes x20. Tesouro Padrão.`
        },
        {
          chave: 'guardaPortao', nome: 'Guarda do Portão', nd: '6', tipo: 'Humanoide (gigante) Grande',
          resumo: 'Ogro enorme e teimoso; ninguém passa sem autorização.',
          texto:
`Guarda do Portão ND 6
Ogros podem ser estúpidos e ignorantes. Mas também são grandes, fortes e resistentes. Com essas qualidades, são ótimos para guardar o portão do forte da companhia, impedindo a entrada de indesejáveis e mantendo inimigos à distância tempo suficiente para seus companheiros se prepararem. Infelizmente, nem sempre o ogro lembra quem faz parte do bando ou não e pode manter um colega mercenário do lado de fora por horas, até ser convencido de que aquele "estranho" pode entrar.
Humanoide (gigante) Grande
Iniciativa +5, Percepção +6, visão na penumbra
Defesa 26, Fort +17, Ref +12, Von +2
Pontos de Vida 52
Deslocamento 6m (4q)
Corpo a Corpo Machado de guerra x2 +24 (4d6+17, x3).
Esperto o Suficiente… O guarda do portão sofre uma penalidade de –5 em testes de Vontade (já contabilizado).
…Para Montar Guarda Todo dano de corte, impacto e perfuração que o guarda sofre é reduzido à metade e ele nunca fica surpreendido.
For 8, Des 0, Con 5, Int –3, Sab –1, Car –2
Perícias Atletismo +13.
Equipamento Loriga segmentada, machado de guerra aumentado. Tesouro Metade.`
        },
        {
          chave: 'gorloggEstimacao', nome: 'Gorlogg de Estimação', nd: '2', tipo: 'Animal Grande',
          resumo: '"Cão de guarda" selvagem dos mercenários; morde e agarra.',
          texto:
`Gorlogg de Estimação ND 2
Este mascote é um gorlogg adulto, criado e treinado pelos mercenários para servir de animal de estimação, "cão de guarda" e companheiro de batalha. Manter feras selvagens como mascotes é um costume entre bandos mercenários. Além de seus usos práticos, um mascote selvagem é um símbolo de status e poder para o bando; quanto mais perigosa e rara a criatura, melhor.
Animal Grande
Iniciativa +5, Percepção +4, visão na penumbra
Defesa 20, Fort +10, Ref +7, Von +5, resistência a mental +2
Pontos de Vida 72
Deslocamento 9m (6q)
Corpo a Corpo Mordida +12 (2d8+8, x3).
Agarrar Aprimorado (Livre) Mordida (teste +16). A criatura agarrada sofre 5 pontos de dano de perfuração quando é agarrada e no início de cada turno do gorlogg de estimação, enquanto estiver agarrada.
For 5, Des 2, Con 5, Int –4, Sab 1, Car –4
Perícias Atletismo +10.
Equipamento Cota de malha espinhosa. Tesouro Nenhum.`
        },
        {
          chave: 'sargento', nome: 'Sargento', nd: '3', tipo: 'Humanoide (anão) Médio',
          resumo: 'Anão durão que transforma bandidos em soldados.',
          texto:
`Sargento ND 3
Anões normalmente são durões, resistentes e disciplinados. E também mal-humorados e impacientes. Em suma, reúnem todas as qualidades necessárias para transformar um grupo de mercenários indisciplinados e desorganizados em uma unidade de soldados eficiente. Muitos anões que se unem a mercenários buscam o prazer da luta e pilhagem, enquanto outros acabam nesses grupos para fugir de algum crime ou problema em sua terra natal.
Humanoide (anão) Médio
Iniciativa +2, Percepção +5 (+7 em subterrâneo), visão no escuro
Defesa 20, Fort +14, Ref +4, Von +9, resistência a encantamento +2
Pontos de Vida 80
Deslocamento 6m (4q)
Corpo a Corpo Machado anão +17 (2d10+12, x3).
"De Pé, Preguiçoso!" (Movimento) O sargento mercenário reanima um aliado vivo com 0 ou menos PV em alcance curto. O aliado acorda estável e com 2d6 PV. Uma criatura só pode ser reanimada por esta habilidade uma vez por cena.
"Lutem, Infelizes!" (Movimento) O sargento grita ordens para seus aliados em alcance médio. Eles recebem +2 em testes de ataque e rolagens de dano até o fim da cena.
"Mexam-se!" (Movimento) O sargento aumenta em +6m o deslocamento de seus aliados em alcance curto até o início de seu próximo turno.
For 4, Des –1, Con 5, Int 0, Sab 2, Car 0
Perícias Intimidação +5, Guerra +5.
Equipamento Escudo pesado, machado anão, meia armadura. Tesouro Padrão.`
        },
        {
          chave: 'soldadoFortuna', nome: 'Soldado da Fortuna', nd: '1', tipo: 'Humanoide (humano) Médio',
          resumo: 'Combatente de aluguel; a base de qualquer companhia.',
          texto:
`Soldado da Fortuna ND 1
Os combatentes que formam a base de uma companhia mercenária têm as mais diversas origens, desde guardas saídos de um exército real até aqueles que encontraram no serviço mercenário a melhor (ou única) forma de conseguir algum sustento. Estes soldados de aluguel muitas vezes veem mais ação do que militares de alguns exércitos e acabam compensando com a experiência prática o que lhes falta em treinamento formal.
Humanoide (humano) Médio
Iniciativa +3, Percepção +2
Defesa 16, Fort +10, Ref +5, Von +1
Pontos de Vida 10
Deslocamento 6m (4q)
Corpo a Corpo Alabarda +11 (1d12+10, x3).
À Distância Arco longo +5 (1d8+6, x3).
For 3, Des 1, Con 2, Int –1, Sab 0, Car –1
Perícias Atletismo +5.
Equipamento Alabarda, arco longo, cota de malha, flechas x20. Tesouro Metade.`
        },
        {
          chave: 'tenente', nome: 'Tenente', nd: '5', tipo: 'Humanoide (minotauro) Médio',
          resumo: 'Braço direito do condotiero; lidera e luta na linha de frente.',
          texto:
`Tenente ND 5
O segundo em comando na maioria das companhias mercenárias, o tenente é o braço direito do condotiero, executando suas ordens e liderando partes da companhia nas ocasiões em que é necessário dividir suas forças. Um combatente experiente, o tenente é tão perigoso liderando mercenários quanto manejando suas próprias armas.
Humanoide (minotauro) Médio
Iniciativa +6, Percepção +3, faro
Defesa 24, Fort +17, Ref +5, Von +11, resistência a efeitos mentais e medo +2
Pontos de Vida 180
Deslocamento 6m (4q)
Corpo a Corpo Espada longa +17 (2d8+12, 19) e chifres +17 (2d6+12).
À Distância Azagaia +16 (1d6+10 mais 1d6 perfuração).
Bloqueio com Escudo (Reação) Uma vez por rodada, quando sofre dano de um ataque, o tenente mercenário reduz esse dano em 5.
"De Pé, Preguiçoso!" (Movimento) O tenente reanima um aliado vivo com 0 ou menos PV em alcance curto. O aliado acorda estável e com 3d6 PV. Uma criatura só pode ser reanimada por esta habilidade uma vez por cena.
Medo de Altura Se estiver adjacente a uma queda de 3m ou mais de altura, o tenente fica abalado.
For 5, Des 1, Con 4, Int 2, Sab 0, Car 1
Perícias Atletismo +11, Guerra +8, Intimidação +7.
Equipamento Azagaia x3, cota de malha, escudo pesado, espada longa. Tesouro Padrão.`
        },
        {
          chave: 'vidente', nome: 'Vidente', nd: '5', tipo: 'Espírito (sulfure) Médio',
          resumo: 'Sulfure adivinho; informação, raios arcanos e diabretes.',
          texto:
`Vidente ND 5
Mesmo o mais embrutecido mercenário reconhece o valor da magia. O vidente mercenário é um misto de fonte de informações e arma de cerco. Seus poderes de adivinhação mantêm a companhia informada, enquanto suas magias de destruição asseguram uma vantagem importante no campo de batalha.
Espírito (sulfure) Médio
Iniciativa +7, Percepção +5, visão no escuro
Defesa 22, Fort +5, Ref +11, Von +17
Pontos de Vida 99
Pontos de Mana 39
Deslocamento 9m (6q)
Diabretes Sombrios (Padrão) Uma vez por cena, o vidente invoca 1d4+1 diabretes sombrios em espaços desocupados em alcance curto. Eles agem a partir da próxima rodada do conjurador, têm deslocamento 9m (normal e de voo) e podem gastar uma ação padrão para causar 1d6+2 pontos de dano de trevas em uma criatura adjacente. Os diabretes sombrios são espíritos, têm For 2, Des 2, Defesa 14 e 1 PV, falham automaticamente em qualquer teste oposto ou de resistência e desaparecem quando mortos ou ao fim da cena.
Magia Acelerada (Livre, +4 PM) Uma vez por rodada, quando usa seu Raio Arcano ou lança uma magia com execução de ação completa ou menor, o conjurador muda a execução dessa ação para livre.
Raio Arcano (Padrão) Uma criatura em alcance médio sofre 2d12 pontos de dano de essência (Ref CD 28 reduz à metade).
Magias Como um bruxo de 5º nível (CD 23, –1 PM no custo de Escuridão). Seu foco arcano é sua varinha arcana.
• Escuridão (Padrão, 2 PM) Até o fim da cena, um objeto em alcance curto emana escuridão total em um raio de 6m, bloqueando a visão na área e através dela.
• Imagem Espelhada (Padrão, 5 PM) O conjurador cria 4 cópias ilusórias de si mesmo que fornecem +8 na Defesa. Cada vez que um ataque contra ele erra, uma das imagens desaparece e o bônus na Defesa diminui em 2. Quando uma cópia é destruída, a criatura que a destruiu fica ofuscada por 1 rodada.
• Relâmpago (Padrão, 5 PM) Criaturas em uma linha de 30m sofrem 8d6 pontos de dano de eletricidade (Ref reduz à metade).
• Seta Infalível de Talude (Padrão, 5 PM) Dispara 5 setas de energia distribuídas em até 5 criaturas em alcance médio. Cada seta causa 1d4+1 pontos de dano de essência.
For 0, Des 3, Con 3, Int 4, Sab 1, Car 1
Perícias Enganação +7, Furtividade +9, Guerra +8, Intuição +5, Misticismo +8.
Equipamento Essência de mana, varinha arcana. Tesouro Padrão.`
        },
      ]
    },
  ],

  // ── 📖 CAIXAS DE REGRAS E LORE (aparecem só na consulta) ─────────
  regras: [
    {
      chave: 'guardaValkaria', cat: 'lei', titulo: 'A Guarda de Valkaria',
      texto:
`A maior metrópole do mundo possui uma força policial dividida entre patrulheiros, alcaides, detetives e xerifes. Os patrulheiros são encarregados de fazer rondas pelas ruas, em duplas ou pequenos grupos, ostensivamente reprimindo crimes e auxiliando a população. Porém, quando encontram um crime que exija investigação, seu protocolo é chamar os detetives.`
    },
    {
      chave: 'contratandoBrucutus', cat: 'crime', titulo: 'Contratando Brucutus',
      texto:
`Um brucutu pode ser contratado como um parceiro que irá auxiliá-lo por uma cena. Ele irá acompanhá-lo, contando para seu limite de parceiros, mas sem oferecer benefício, até que você peça sua ajuda. Então, fornecerá seu benefício até o fim da cena. Após ajudá-lo, o brucutu irá embora. Um brucutu iniciante custa T$ 30, enquanto um veterano custa T$ 150. De acordo com o mestre, pode ser possível contratar um brucutu para uma aventura inteira pelo triplo desses preços.`
    },
    {
      chave: 'falcoaria', cat: 'corte', titulo: 'Falcoaria, o Esporte da Nobreza',
      texto:
`No Reinado, nos Feudos de Trebuck e em algumas outras regiões de Arton, falcões são criados e treinados para auxiliar nobres a perseguir e abater pequenas presas — embora também possam ser encontrados servindo como familiares de conjuradores ou companheiros de caçadores. Um falcão treinado pode ser comprado por T$ 150 e pode ser usado como parceiro por personagens treinados em Adestramento.`
    },
    {
      chave: 'truquesMercenarios', cat: 'mercenarios', titulo: 'Truques Mercenários',
      texto:
`Embora possuam muitas semelhanças com exércitos regulares, companhias de mercenários também sabem se aproveitar de estratégias e truques por assim dizer… menos dignos. Para personalizar uma companhia de mercenários, escolha uma das habilidades a seguir e aplique-a a todos os membros da companhia.
Armaduras Reforçadas O mercenário recebe +2 na Defesa.
Armas Envenenadas Quando acerta seu primeiro ataque com arma na cena, o mercenário faz com que a vítima perca 1d12 pontos de vida por veneno.
Disciplina Surpreendente O mercenário recebe +2 em testes de resistência.
Lâminas Farpadas O multiplicador de crítico dos ataques corpo a corpo do mercenário aumenta em +1.
Pó Ardente (Movimento) Uma vez por cena, o mercenário deixa uma criatura adjacente ofuscada. A vítima pode remover essa condição gastando uma ação padrão para limpar os olhos.
Táticas de Emboscada Os ataques do mercenário causam +2d6 pontos de dano contra criaturas surpreendidas.`
    },
    {
      chave: 'outrasRacas', cat: 'geral', titulo: 'NPCs de Outras Raças',
      texto:
`A maioria dos NPCs genéricos deste livro é humana, mas Arton é um mundo colorido, diverso, repleto de seres de outras raças. A seguir estão ajustes que você pode aplicar nas fichas para substituir as raças delas. Esses ajustes têm como objetivo representar as características mais distintas de cada raça e permitir que você altere as fichas com pouco trabalho, e são uma simplificação em relação às regras das raças para jogadores.
Anão. Con +1, Des –1, Fort +1, Ref –1, +2 PV/ND, recebe Visão no Escuro, muda deslocamento para 6m e arma corpo a corpo para machado anão, +1 em ataque com o machado.
Dahllan. Sab +1, Int –1, Percepção +1, Von +1, recebe Empatia Selvagem e uma vez por cena pode lançar Controlar Plantas.
Elfo. Int +1, Con –1, Percepção +2, Fort –1, –1 PV/nível, deslocamento +3m.
Goblin. Des +1, Car –1, tamanho Pequeno, Iniciativa +1, Def +1, Fort +2, Ref +1, recebe Visão no Escuro e deslocamento de escalada igual ao deslocamento terrestre.
Hynne. Des +1, For –1, tamanho Pequeno, Iniciativa +1, Def +1, Ref +1, deslocamento –3m, –1 em testes de ataque e rolagens de dano corpo a corpo, recebe um ataque à distância de funda.
Humano. Para transformar um NPC de outra raça em humano, simplesmente "desaplique" os ajustes da raça dele.
Lefou. Car –1, recebe +2 em uma perícia ou um poder da Tormenta à sua escolha.
Minotauro. For +1, Sab –1, Def +1, Von –1, recebe um ataque de chifres (teste de ataque igual ao ataque corpo a corpo já existente, dano 1d6+Força), +1 em testes de ataque e rolagens de dano corpo a corpo, recebe Faro e Medo de Altura.
Qareen. Car +1, Sab –1, Percepção –1, Von –1, recebe Tatuagem Mística (uma vez por cena, pode lançar uma magia específica de 1º círculo).
Sereia. Deslocamento de natação 12m e pode lançar uma das magias a seguir: Amedrontar, Comando, Despedaçar, Enfeitiçar, Hipnotismo ou Sono.
Suraggel. Sab +1 e pode lançar Luz (aggelus); Des +1 e pode lançar Escuridão (sulfure). Ambos são do tipo espírito e recebem Visão no Escuro.
Trog. Con +1, Int –1, Def +1, Fort +1, +2 PV/ND, recebe um ataque de mordida (teste de ataque igual ao ataque corpo a corpo já existente, dano 1d6+Força), Sangue Frio e Mau Cheiro.
Para mais informações sobre como modificar fichas de criaturas, veja Ameaças de Arton.`
    },
  ],

  // ── 🗡 ITENS ESPECIAIS CITADOS PELAS FICHAS ──────────────────────
  itens: [
    {
      chave: 'machadoDeLenha', nome: 'Machado de Lenha', meta: 'Arma simples • usado pelo Matuto',
      texto:
`Uma ferramenta comum. Sua lâmina projetada para cortar madeira rígida é capaz de ignorar 5 pontos de RD de objetos e construtos.
Arma Simples • Corpo a Corpo • Uma Mão
T$ 15 • Dano 1d6 • Crítico x3
Corte • 1 Espaço`
    },
    {
      chave: 'baculoDaFe', nome: 'Báculo da Fé', meta: 'Arma mágica específica maior • usado pelo Alto Sacerdote',
      texto:
`Este bordão banhado a ouro formidável é dedicado a uma divindade específica, que pode ser identificada pelos símbolos em sua empunhadura e extremidades. Quando empunhado por um devoto dessa divindade, causa +1d6 pontos de dano de fogo (para divindades que canalizam energia positiva) ou +1d6 pontos de dano de frio (para divindades que canalizam energia negativa). Arma mágica específica maior, T$ 45.000.`
    },
    {
      chave: 'batinaConsagrada', nome: 'Batina Consagrada', meta: 'Armadura específica maior • usada pelo Alto Sacerdote',
      texto:
`Esta armadura acolchoada guardiã refletora é dedicada a uma divindade específica, que pode ser identificada pelos símbolos bordados em seu peito e mangas. Conta como um manto eclesiástico aprimorado e, se vestida por um devoto da divindade à qual é dedicada, fornece redução de dano 5. Armadura específica maior, T$ 80.000.`
    },
  ],
};
