// ═══════════════════════════════════════════════════════════════════
//  PERIGOS-DATA.JS — Biblioteca de Perigos Complexos (Tormenta 20)
//  Dados puros, sem lógica. Consumido por:
//    • monstros.js  → botão "⚠ Perigos complexos" (insere na cena)
//    • (futuro) aba "Perigos & Ambientes" → consulta rápida
//
//  Cada perigo complexo tem:
//    chave     — identificador único (kebab/camel)
//    nome      — título
//    nd        — Nível de Desafio (string; alguns são faixa, ex.: "3 a 11")
//    fonte     — livro de origem (curto, só p/ referência)
//    objetivo  — o que os personagens precisam fazer p/ "vencer"
//    efeito    — o que o perigo causa (pode conter \n; inclui tabelas de evento)
//    acoes     — ações que os personagens podem realizar (uma por linha)
//    descricao — lore/abertura (opcional)
// ═══════════════════════════════════════════════════════════════════

window.PERIGOS_COMPLEXOS = [

  {
    chave: 'bibliotecaEmRuinas',
    nome: 'Biblioteca em Ruínas',
    nd: '10',
    fonte: 'Ameaças de Arton',
    descricao: 'Os personagens precisam pesquisar uma informação em uma biblioteca muito antiga. Mas ela está ruindo!',
    objetivo: 'Obter a informação necessária antes que a biblioteca desabe.',
    efeito:
`Para encontrar a informação, o grupo precisa acumular 6 sucessos nas ações abaixo. Os personagens têm 4 rodadas para agir livremente. Na quinta, a biblioteca entra em colapso e qualquer um dentro do local sofre 12d6 pontos de dano de impacto. Na sexta rodada, a biblioteca desaba completamente e qualquer personagem dentro dela sofre 20d6 pontos de dano de impacto.
No início de cada rodada, role 1d6:
1-3) Desmoronamento de livros. Estantes pesadas caem por todos os lados. Cada personagem sofre 4d6 de impacto (Ref CD 25 evita).
4) Pequeno incêndio. Qualquer número de personagens pode abrir mão de sua ação para apagar as chamas (Destreza CD 15). Até apagar, a CD de todos os testes contra o perigo aumenta +2 para cada rodada de chamas.
5) Fissura no chão. Cada personagem faz Acrobacia ou Atletismo (CD 25). Se falhar, tropeça e sofre –5 na próxima ação contra o perigo.
6) Bloqueio. Um personagem aleatório: desiste do corredor (perde a ação) ou corre antes do desabamento (Atletismo CD 25; falha = perde a ação e sofre 4d6 de impacto).`,
    acoes:
`Usar Biblioteca (Investigação CD 22): percorre os corredores em busca dos livros certos.
Ajuda Esotérica (Misticismo ou Religião CD 22): se a busca for sobre magia ou deuses, usa a perícia correspondente.
Julgar pela Capa (Conhecimento CD 22): procura títulos sobre o tema. Sucesso por 10+ (ou 20 natural) conta como 2 sucessos.
Palpite Fortuito (Intuição CD 22): deduz quais livros podem ajudar.
Coordenar Pesquisa (Conhecimento CD 10): não conta como sucesso, mas o bônus de ajuda se aplica a todo o grupo nesta rodada.`,
  },

  {
    chave: 'brigaDeTaverna',
    nome: 'Briga de Taverna',
    nd: '2',
    fonte: 'Ameaças de Arton',
    descricao: 'Ninguém sabe como ela começou, mas quando o primeiro rola Iniciativa, só resta tomar parte ou tentar apartar.',
    objetivo: 'Ficar de pé até o fim. A briga dura 1d6+2 rodadas; depois os ânimos se acalmam e todos se dispersam.',
    efeito:
`No início de cada rodada, todos os personagens sofrem 2d6+4 pontos de dano de impacto não letal. Um personagem reduzido a 0 PV ou menos deixa de sofrer dano (ninguém bate em alguém caído).
Brigas raramente são fatais: quem bater "com maldade" atrai a ira dos demais — o dano que sofre no início da rodada aumenta em +1d6+2 a cada vez que causar dano letal — e pode ter problemas com a lei local.`,
    acoes:
`Brigar (Defesa 16): usa uma ação agredir para golpear alguém. Se causar ao menos 15 de dano, nocauteia o oponente mais próximo e não sofre dano na próxima rodada.
Apartar (Diplomacia ou Intimidação CD 20): se passar, reduz a duração da briga em 1 rodada.
Bater Carteiras (Ladinagem CD 20): se passar, obtém T$ 2d8; se falhar por 5+, é pego e sofre +1d6 de dano na próxima rodada.
Lançar Magia (Von CD 15 + PM): efeito a critério do mestre.
Sair de Fininho (Furtividade CD 20): se passar, na próxima rodada tem 50% de chance de não sofrer dano (resultado par em 1d6).`,
  },

  {
    chave: 'cicloneArcano',
    nome: 'Ciclone Arcano',
    nd: '5',
    fonte: 'Ameaças de Arton',
    descricao: 'Uma manifestação descontrolada de energia mágica bruta que afeta tudo em seu caminho, como uma tempestade ou um terremoto.',
    objetivo: 'Escapar do ciclone arcano.',
    efeito:
`O grupo tem 5 rodadas para se afastar. No fim da quinta rodada, a posição de cada um é definida pelos sucessos acumulados:
• 2 ou menos sucessos: fica no centro — 16d6 de dano de essência e perde 4d4 PM.
• 3 ou 4 sucessos: fica na orla — 8d6 de dano de essência e perde 2d4 PM.
• 5 ou mais sucessos: escapa ileso.
Os personagens têm direito a um teste de Misticismo (CD 20) para perceber a aproximação; quem passar realiza uma ação adicional na primeira rodada.`,
    acoes:
`Correr (Atletismo CD 20): afasta-se do centro. Sucesso por 10+ (ou 20 natural) conta como 2 sucessos. Pode ser Cavalgar/Pilotagem se montado/em veículo.
Carregar Outro (Atletismo CD 25): como correr, mas leva um aliado próximo (até 1 sucesso de diferença); ambos ganham 1 sucesso.
Bloquear (Misticismo CD 15): em vez de fugir, bloqueia os efeitos mágicos e ganha 1 sucesso. Cada personagem só usa uma vez.
Resistir (Von CD 20): em vez de fugir, concentra-se e ganha 1 sucesso. Se falhar, não pode tentar de novo.`,
  },

  {
    chave: 'construcaoEmColapso',
    nome: 'Construção em Colapso',
    nd: '8',
    fonte: 'Ameaças de Arton',
    descricao: 'Os personagens estão em uma vasta construção (castelo, templo) prestes a desabar. Precisam escapar antes de serem soterrados!',
    objetivo: 'Sair da construção (acumular 5 sucessos nas ações avançar, correr ou carregar outro).',
    efeito:
`A construção será destruída em 7 rodadas. No início de cada rodada, role 1d6:
1-2) Destroços. Reflexos CD 25: falha = 4d6 de impacto; falha por 10+ = 8d6.
3-4) Fenda no chão. Acrobacia ou Atletismo CD 25: falha = –5 na próxima ação; falha por 10+ = cai e perde a ação.
5) Bloqueio. Desiste da rota (perde a ação, age normal na próxima) ou corre (Atletismo CD 25; falha = perde a ação e sofre 8d6 de impacto).
6) Explosão. Reflexos CD 30: falha = 6d6 (tipo à escolha do mestre) e –5 no próximo teste; falha por 10+ = 10d6 e perde a ação.
Ao fim da 7ª rodada, quem não tiver 5 sucessos é atingido pelo desabamento: 20d6 de impacto, sem teste.`,
    acoes:
`Avançar (Acrobacia ou Reflexos CD 25): avança com cuidado. Sucesso por 10+ (ou 20 natural) conta como 2 sucessos.
Correr (Atletismo CD 20): avança sem cuidado, sofre 4d6 de impacto. Sucesso por 10+ (ou 20 natural) conta como 2 sucessos.
Carregar Outro (Atletismo CD 30): como avançar, levando um aliado próximo (até 1 sucesso de diferença); se falhar, ambos sofrem dano.
Procurar Caminho (Percepção CD 20): se passar, +5 em todos os testes de avançar/correr/carregar durante o perigo.`,
  },

  {
    chave: 'gramaCarnivora',
    nome: 'Grama Carnívora',
    nd: '3 a 11',
    fonte: 'Ameaças de Arton',
    descricao: 'Uma aberração planar quase indistinguível de vegetação rasteira comum. Quando uma criatura pisa em sua superfície, expele filamentos que agarram e imobilizam, exalando vapores ácidos digestivos para derretê-la.',
    objetivo: 'Sair da área da grama carnívora antes de ser devorado.',
    efeito:
`Cada personagem deve obter sucessos na ação fugir, conforme o tamanho da área:
• Pequena (clareira): 3 sucessos, ND 3.
• Média (vasta planície): 5 sucessos, ND 6.
• Extensa (~mil m²): 7 sucessos, ND 11.
Os personagens têm direito a Sobrevivência (CD 20) para perceber a grama; quem passar realiza uma ação adicional na primeira rodada.
No início de cada turno, cada personagem sofre 1d6 de impacto e faz Reflexos (CD 20). Se falhar, fica agarrado e imóvel (só pode libertar-se). A cada rodada agarrado, o dano inicial aumenta +1d6.
Área média (ND 6): +5 em todas as CD e dano inicial 2d6. Área extensa (ND 11): +10 em todas as CD e dano inicial 3d6.`,
    acoes:
`Fugir (Atletismo CD 20): corre para fora. Sucesso por 10+ (ou 20 natural) conta como 2 sucessos. Pode ser Cavalgar/Pilotagem.
Libertar-se (Atletismo ou Acrobacia CD 20): agarrado→enredado; enredado→livre. Passar por 10+ livra e dispensa o teste no fim da rodada.
Conjurar (Vontade CD 20 + PM da magia): se falhar, a magia falha mas os PM são gastos.
Atacar (Luta CD 20): com arma de corte, liberta um aliado agarrado próximo (até 1 sucesso de diferença) ou abre caminho (1 sucesso em fugir).
Analisar (Sobrevivência CD 20): se passar, +2 em todos os testes de perícia do grupo durante o perigo.`,
  },

  {
    chave: 'inundacaoDeEsgoto',
    nome: 'Inundação de Esgoto',
    nd: '4',
    fonte: 'Ameaças de Arton',
    descricao: 'Vasculhando túneis subterrâneos, o grupo é surpreendido por uma inundação súbita.',
    objetivo: 'Sobreviver à inundação (correr por 1d4+4 rodadas).',
    efeito:
`No início de cada rodada, role 1d6 e some o resultado à CD de todos os testes deste perigo (detritos e obstáculos).
A inundação começa a 6m e se move 6m no fim de cada rodada. Alcançado: água pelos joelhos, –2 em correr e carregar outro. Ultrapassado: engolfado — não pode correr/carregar, sofre 4d6 de impacto no fim do turno e deve prender a respiração (cada rodada engolfado conta como 2 de sufocamento).
Os personagens têm direito a Percepção (CD 20) para perceber a inundação; quem passar realiza uma ação adicional na primeira rodada.`,
    acoes:
`Correr (Atletismo CD 20): avança 6m. Sucesso por 10+ (ou 20 natural) conta como 2 sucessos. Pode ser Cavalgar/Pilotagem.
Carregar Outro (Atletismo CD 25): como correr, levando um aliado próximo (até 1 sucesso de diferença); ambos avançam 6m.
Evitar Colisão (Atletismo ou Reflexos CD 20): engolfado reduz o dano à metade; sucesso por 10+ (ou 20 natural) evita todo o dano.
Agarrar-se (Atletismo CD 20): só após passar em evitar colisão na rodada anterior. Não sofre dano da inundação e pode repetir na próxima rodada.`,
  },

  {
    chave: 'labirinto',
    nome: 'Labirinto',
    nd: '6',
    fonte: 'Ameaças de Arton',
    descricao: 'Os personagens se deparam com um emaranhado de caminhos e precisam descobrir qual leva à saída.',
    objetivo: 'Sair do labirinto (acumular sucessos na ação guiar conforme a extensão).',
    efeito:
`Sucessos exigidos na ação guiar: 3 (pequeno — algumas salas/corredores), 5 (médio — subterrâneos de uma cidade pequena) ou 7 (extenso — túneis sob uma metrópole). O mestre define quanto tempo é cada rodada (1 hora, várias horas, um dia).
No fim de cada turno, cada personagem faz Fortitude (CD 20). Se falhar, perde 2d6 PV (cansaço, armadilhas), só curáveis a partir de um dia após sair.
Variante mental: troque Fortitude por Vontade e a perda de PV por 1d4 PM. Reduzido a 0 PM = estado catatônico; se todo o grupo ficar assim, sucumbem à loucura do lugar.`,
    acoes:
`Guiar (Sobrevivência CD 25 ou 30): guia o grupo. Pode buscar caminho mais seguro (CD 30; em sucesso, a CD do Fortitude desta rodada cai 5). Só um personagem por rodada.
Ajudar o Guia (Varia): teste para ajudar; qualquer perícia justificável, cada uma só uma vez por rodada.
Calcular Rota (Conhecimento CD 20): sucesso = +5 no próximo guiar; falha = +5 na CD do Fortitude desta rodada.
Proteger-se (sem teste): +5 no Fortitude para evitar a perda de vida nesta rodada.`,
  },

  {
    chave: 'naufragio',
    nome: 'Naufrágio',
    nd: '7',
    fonte: 'Ameaças de Arton',
    descricao: 'O grupo se encontra em um barco que está naufragando.',
    objetivo: 'Sobreviver ao naufrágio (resistir por um número de rodadas conforme o tamanho).',
    efeito:
`Rodadas conforme o tamanho: pequeno (barco de pesca) 3; médio (veleiro/cargueiro) 5; grande (caravela/navio de guerra) 7. Depois, a embarcação termina de afundar e as águas se acalmam.
Em cada rodada, cada personagem faz uma das ações. Se falhar, sofre 3d6 de impacto. Personagens na água sofrem efeitos adicionais (ver nadar).`,
    acoes:
`Equilibrar-se (Acrobacia CD 20): mantém-se sobre os destroços. Falha por 5+ = cai na água. A CD aumenta +2 por rodada.
Içar Aliado (Acrobacia CD 25): como equilibrar-se; traz um aliado de volta aos destroços e conta como sucesso para ambos.
Nadar (Atletismo CD 20): nada contra a correnteza. Falhar 2 testes antes de voltar = tragado (sufoca, –5 em Atletismo, só nada/carrega). Volta à tona com 2 sucessos seguidos.
Carregar Outro (Atletismo CD 25): na água, ajuda um aliado a nadar; conta como sucesso para ambos.
Escalar Destroços (Atletismo CD 25): retorna aos destroços; só se passou em nadar na rodada anterior.`,
  },

  {
    chave: 'pesquisa',
    nome: 'Pesquisa',
    nd: '2',
    fonte: 'Ameaças de Arton',
    descricao: 'O grupo precisa pesquisar uma informação em uma biblioteca, livraria ou amontoado de livros e pergaminhos. (Versão calma da Biblioteca em Ruínas.)',
    objetivo: 'Encontrar a informação (acumular 6 sucessos).',
    efeito:
`Para cada falha, os personagens perdem 1 PM (esforço mental); reduzido a 0 PM dessa forma fica frustrado até o fim do dia. Se o grupo acumular 4 falhas, todos ficam frustrados até o fim do dia e só tentam de novo no dia seguinte (mantêm os sucessos).`,
    acoes:
`Usar Biblioteca (Investigação CD 15): vasculha livros e textos, reunindo pistas.
Consultar o Sobrenatural (Misticismo ou Religião CD 15): se a info for mística/divina. Cada personagem só uma vez por pesquisa.
Estudar Textos (Conhecimento CD 12): combina conhecimentos próprios com os textos.
Ajudar (Varia CD 10): teste para ajudar; qualquer perícia justificável. Não conta como sucesso.`,
  },

  {
    chave: 'tempestadeDeAreia',
    nome: 'Tempestade de Areia',
    nd: '5',
    fonte: 'Ameaças de Arton',
    descricao: 'Atravessando terras desérticas, os personagens são apanhados por uma tempestade de areia.',
    objetivo: 'Sobreviver à passagem das areias (dura 2d4+1 rodadas).',
    efeito:
`No início do turno, cada personagem faz Fortitude (CD 20+1d6; role uma vez por rodada e aplique a mesma CD a todos). Falha = 4d4 de corte e cego até o próximo turno. Falha por 10+ = além disso, começa a sufocar. Um cego sofre –5 em todas as ações abaixo.
No fim de cada rodada, role 1d4 para cada animal/monstro irracional do grupo. Em 1, a criatura foge na tempestade (achável depois com Sobrevivência CD 20 + duração em rodadas; 25% de chance de estar morta).
Os personagens têm direito a Sobrevivência (CD 20) para perceber a tempestade; quem passar realiza uma ação adicional na primeira rodada.`,
    acoes:
`Proteger-se (Acrobacia ou Atletismo CD 15): +2 no próximo Fortitude contra a tempestade.
Cobrir-se (Sobrevivência CD 15): +5 no próximo Fortitude e +2 no seguinte; depois o item é destruído.
Procurar Abrigo (Percepção ou Sobrevivência CD 25): +5 no Fortitude contra este perigo até o fim da cena.
Proteger Aliado (Sobrevivência CD 15): –5 no próprio Fortitude na próxima rodada, mas o aliado recebe +5.
Lavar o Rosto (Cura CD 15): remove a cegueira e o sufocamento de si ou de um aliado.
Acalmar Animal (Adestramento CD 25): elimina a chance de a criatura fugir.`,
  },

  {
    chave: 'ventoAbrasador',
    nome: 'Vento Abrasador',
    nd: '3',
    fonte: 'Deuses e Heróis',
    descricao: 'Em regiões áridas, rajadas de vento ardente capazes de arrancar a pele dos ossos podem matar mesmo os viajantes mais preparados.',
    objetivo: 'Sobreviver à rajada de vento (dura 1d4+2 rodadas).',
    efeito:
`No início de cada rodada, cada personagem sofre 1d12 de corte e 1d12 de fogo e fica fatigado (cumulativo). Fortitude (CD 20, +2 por teste anterior) reduz o dano à metade e evita a condição.`,
    acoes:
`Abrigar-se (Sobrevivência CD 20): procura cobertura ou se enterra na areia; +5 no Fortitude da próxima rodada.
Orar por Piedade (Religião CD 25): reduz a duração em 1 rodada. Cada personagem só uma vez. Devotos de Allihanna ou Azgher recebem +5.
Ajudar em Oração (varia): ajuda o teste de Religião; cada perícia que não seja Religião só pode ser usada uma vez no perigo.
Refrescar-se (sem teste): gasta item/magia (ração, Criar Elementos…) para refrescar a si ou um aliado; não sofre o dano de fogo na próxima rodada.`,
  },

  {
    chave: 'pantanoAmaldicoado',
    nome: 'Pântano Amaldiçoado',
    nd: '5',
    fonte: 'Deuses e Heróis',
    descricao: 'Os aventureiros precisam atravessar um brejo escuro, de águas fétidas e borbulhantes. As brumas e a vegetação os afastam uns dos outros — cada um deve contar consigo mesmo.',
    objetivo: 'Atravessar o pântano (cada personagem deve acumular 5 avanços).',
    efeito:
`No início de cada rodada, cada personagem rola 1d8 (rolagem de evento):
1) Mordida de monstro: ataque corpo a corpo (+20, dano 6d6+10 de corte).
2) Brumas traiçoeiras: perde um avanço; sem avanços, fica fatigado (cumulativo).
3) Águas profundas: Atletismo p/ nadar CD 20; escapa de qualquer forma, mas falha = fatigado (cumulativo).
4) Fumos ácidos: 6d6 de ácido (Fort CD 20 reduz à metade).
5) Visão aterrorizante: 1d8 psíquico e abalado até sair (Von CD 20 reduz e evita). Já abalado → apavorado, perde a próxima ação. CD +2 a cada vez que rolar este evento. Medo.
6) Insetos peçonhentos: perde 2d12 PV e fica fraco até o fim da próxima rodada (Fort CD 20 reduz e evita). Veneno.
7) Galhos afiados: 2d4 de corte.
8) Nenhum evento.
Inconsciente: continua rolando eventos, mas só sofre mordida/fumos/insetos; acorda após 4 rodadas (mantém condições).`,
    acoes:
`Avançar (Sobrevivência CD 20, ou outra perícia justificável CD 25): acumula um avanço. Falha por 5+ = duas rolagens de evento na próxima rodada. Perícias que não Sobrevivência só uma vez.
Guiar Aliado (Sobrevivência CD 25, ou outra CD 30): avança guiando/carregando um aliado (mesmos avanços ou um a menos); ambos avançam. Falha por 5+ = ambos rolam dois eventos.
Procurar Caminho (Investigação ou Percepção CD 20): ele ou um aliado próximo recebe +5 no próximo avançar/guiar.
Corrida Desesperada (Atletismo CD 20): acumula dois avanços; faz uma rolagem de evento como parte da ação e sofre os efeitos.
Oração de Salvaguarda (Religião CD 20, 1 PM): ele ou um aliado rola de novo o dado de evento no próximo turno e escolhe o resultado.
Recuar (sem teste): diminui o próprio número de avanços em um (útil para ajudar quem ficou para trás).`,
  },

  {
    chave: 'cataclismo',
    nome: 'Cataclismo',
    nd: '17',
    fonte: 'Deuses e Heróis',
    descricao: 'Os deuses estão furiosos! Algo ofendeu o Panteão, e cabe aos personagens lidar com a ira divina.',
    objetivo: 'Aplacar as divindades (acumular 7 perdões) ou sobreviver à fúria delas por 1d6+3 rodadas, o que vier primeiro.',
    efeito:
`Se o cataclismo acabar por esgotar a duração, devotos perdem os poderes concedidos por uma aventura e têm os PM totais reduzidos em –1d4 permanentemente.
No início de cada rodada, role 1d10 (afeta todo o grupo). Usar habilidades/itens para evitar um evento consome a ação do perigo nesta rodada.
1) O vazio da existência: todos ficam alquebrados; devotos perdem poderes concedidos e magias divinas exigem Vontade (CD 25 + PM). Repetido: 10d8 psíquico e perde 2d8 PM.
2) Chuva de meteoros: 15d6 de impacto + 15d6 de fogo, caídos e presos (Ref CD 45 reduz e evita). Escapar do agarrão: ação padrão + Atletismo CD 30.
3) Raio fulminante: alvo aleatório sofre 10d10+10 de eletricidade + 10d10+10 de luz. Um aliado em alcance curto pode gastar a ação e fazer Ref CD 45 para dividir o dano.
4) Terremoto: Ref CD 45; falha = cai numa fenda, 12d6 de impacto. Escapar: ação completa + Atletismo CD 30, ou subir 9m. As fendas se fecham na próxima rodada, matando quem estiver dentro.
5) Dilúvio: 10d12 de impacto; Atletismo CD 30 (falha = perde a ação). As águas escoam no fim da rodada.
6) Erupção vulcânica: escapar exige mover 45m (30 quadrados) em 1 rodada; senão 20d6 de fogo no fim desta rodada e mais 20d6 na seguinte.
7) Trevas entrópicas: perde 10d8 PV (Fort CD 45 reduz à metade).
8) Fanáticos penitentes: 10d6 de perfuração nesta rodada e ao fim de cada seguinte até dispersá-los (200 de dano à turba, ou 3 sucessos em Diplomacia CD 35 / Intimidação CD 30; cada teste = ação completa). Dano letal à turba = dois eventos na próxima rodada.
9) Hoste celestial / Horda demoníaca: um inimigo por personagem, cada um ataca (+47, dano 4d12+20) nesta e em cada rodada seguinte. Defesa 50, +25 em resistências, 1 PV.
10) Reprovação divina: todos perdem metade dos PV e PM atuais e encerram habilidades benéficas ativas.`,
    acoes:
`Aplacar os Deuses (varia CD 50, 5 PM): descreva como faz e role uma perícia pertinente; sucesso = 1 perdão. A perícia usada não pode ser repetida nesta ação por ninguém. Devotos +5.
Martírio (Fortitude e Vontade CD 40): exponha-se aos castigos — perde 4d12 PV; Von CD 40 para continuar (mais 4d12); Fort CD 40 para o último (mais 4d12, total 12d12). Concluído = 1 perdão. Só uma vez por personagem.
Procurar Abrigo (Atletismo ou Furtividade CD 40): +5 em resistências contra eventos da próxima rodada e pode testar mesmo contra eventos que não permitem (CD 45, reduz dano/perda à metade).
Heroísmo (Iniciativa ou Percepção CD 40): dá a um aliado +5 em resistências na próxima rodada, ou permite que ele teste contra eventos que não permitem.
Orar por Perdão (Religião CD 40, 5 PM): ele ou um aliado fica imune a qualquer evento da próxima rodada.
Estudar Escrituras (Religião CD 40): dá a ele ou a um aliado +5 num teste de aplacar os deuses.`,
  },

  {
    chave: 'avalanche',
    nome: 'Avalanche',
    nd: '4',
    fonte: 'Tormenta20',
    descricao: 'Viajando pelas Uivantes (ou outra região montanhosa), o grupo é vítima de uma avalanche.',
    objetivo: 'Escapar da avalanche.',
    efeito:
`O grupo tem 5 rodadas para se afastar. No fim da quinta, a posição depende dos sucessos em correr ou carregar outro:
• 2 ou menos: zona de soterramento — 16d6 de impacto e soterrado.
• 3 ou 4: zona de deslizamento — 8d6 de impacto.
• 5 ou mais: escapa ileso.
Os personagens têm direito a Sobrevivência (CD 20) para perceber a avalanche; quem passar realiza uma ação adicional na primeira rodada.
Soterrados ficam imóveis e sofrem 1d6 de impacto no início do turno. Soltar-se (ou soltar um aliado): Força CD 25 (vários podem ajudar).`,
    acoes:
`Correr (Atletismo CD 20): afasta-se dos escombros. Sucesso por 10+ (ou 20 natural) conta como 2 sucessos. Pode ser Cavalgar/Pilotagem.
Carregar Outro (Atletismo CD 25): como correr, levando um aliado próximo (até 1 sucesso de diferença); ambos ganham 1 sucesso.
Procurar Caminho (Percepção CD 20): +5 em todos os testes de correr e carregar outro durante o perigo.`,
  },

  {
    chave: 'jornadaPelosErmos',
    nome: 'Jornada pelos Ermos',
    nd: '2',
    fonte: 'Tormenta20',
    descricao: 'O grupo viaja por território selvagem.',
    objetivo: 'Chegar ao destino.',
    efeito:
`Testes exigidos conforme a jornada: curta (outro reino na mesma região) 3; média (outra região) 5; longa (outra região/continente longínquo) 7.
Para cada falha, os personagens perdem 2d6 PV (cansaço), só curáveis a partir de um dia após o fim. Se acumularem 3 falhas, os PM máximos diminuem em 1 por nível na próxima aventura.
Independentemente do resultado, o grupo chega ao destino — o que está em jogo é o estado em que chegam. (Opcional: 3 falhas = caminho errado, recomeçar.)`,
    acoes:
`Avançar (Sobrevivência ou outra perícia justificável): alternam testes até atingir os sucessos exigidos (ou 3 falhas). Cada perícia que não Sobrevivência só uma vez. CD por terreno: 15 planícies/colinas; 20 florestas/pântanos; 25 desertos/montanhas; 30 regiões planares perigosas ou Tormenta.`,
  },

  {
    chave: 'salaEsmagadora',
    nome: 'Sala Esmagadora',
    nd: '9',
    fonte: 'Tormenta20',
    descricao: 'Explorando uma masmorra, os personagens caem em uma armadilha terrível!',
    objetivo: 'Abrir a porta e sair da sala, ou desabilitar o mecanismo que move as paredes.',
    efeito:
`Quando o grupo entra, a porta se fecha e as paredes começam a se mover. Há 3 rodadas para agir. Na 4ª, começam a ser esmagados: 10d6 de impacto. Na 5ª, a sala se fecha por completo e qualquer um dentro morre.
A sala é protegida por uma Âncora Dimensional que impede movimento planar.`,
    acoes:
`Derrubar Porta (Força CD 30): a porta é de aço maciço, sem fechadura por dentro — derrubá-la exige 3 sucessos em Força. No máximo 2 personagens por rodada (cada um testa ou um ajuda o outro).
Desabilitar Mecanismo (Ladinagem CD 30): emperra as paredes (3 sucessos em Ladinagem). Emperradas, o grupo derruba a porta com calma (sem testes).
Segurar Paredes (Força CD 25): cada 2 sucessos adia o fechamento em 1 rodada — ganha tempo para os outros.`,
  },

  {
    chave: 'tempestadeEmAltoMar',
    nome: 'Tempestade em Alto Mar',
    nd: '6',
    fonte: 'Tormenta20',
    descricao: 'Navegando num dos mares de Arton, o grupo se vê em meio a uma tempestade.',
    objetivo: 'Sobreviver à fúria do mar (a tempestade dura 1d6+6 rodadas).',
    efeito:
`No início do turno, cada personagem faz Reflexos para evitar ondas gigantes (CD 20+1d6; role uma vez por rodada e aplique a mesma CD a todos). Falha = 4d6 de impacto; falha por 10+ = sofre o dano e cai no mar. Um personagem no mar falha automaticamente.
Os personagens têm direito a Sobrevivência (CD 20) para perceber a tempestade; quem passar realiza uma ação adicional na primeira rodada.`,
    acoes:
`Navegar (Pilotagem CD 25): cada sucesso reduz a duração em 1 rodada. Só um personagem por rodada.
Ajudar o Piloto (varia): ajuda o teste de Pilotagem com qualquer perícia justificável.
Esconder-se (sem teste): desce ao convés inferior — Reflexos CD 20 fixo e sem chance de cair no mar, mas não pode navegar nem ajudar o piloto.
Voltar para o Navio (Atletismo CD 25): no mar, exige 2 sucessos (alcançar o navio e subir pelo costado). Falha por 5+ = afunda. Outros podem ajudar com cordas.`,
  },

];


// ═══════════════════════════════════════════════════════════════════
//  PERIGOS DE REFERÊNCIA (consulta rápida — aba "Perigos & Ambientes")
//  Perigos simples, clima, terrenos, armadilhas, doenças, maldições,
//  Tormenta e elementos dos ermos. Fusões já aplicadas (Armadilhas e
//  Doenças combinam as listas dos vários livros). Cada entrada tem:
//    cat   — categoria (ver lista 'categorias' abaixo)
//    nome  — título
//    nd    — Nível de Desafio (opcional; só armadilhas/perigos com ND)
//    texto — corpo das regras (\n vira quebra de linha na consulta)
// ═══════════════════════════════════════════════════════════════════

window.PERIGOS_REFERENCIA = {

  categorias: [
    { chave: 'ambientais', nome: 'Perigos Ambientais',          icone: '🌋' },
    { chave: 'clima',      nome: 'Clima & Vento',               icone: '🌧' },
    { chave: 'terrenos',   nome: 'Terrenos',                    icone: '⛰' },
    { chave: 'armadilhas', nome: 'Armadilhas',                  icone: '⚙' },
    { chave: 'doencas',    nome: 'Doenças',                     icone: '🦠' },
    { chave: 'maldicoes',  nome: 'Maldições',                   icone: '💀' },
    { chave: 'tormenta',   nome: 'Tormenta & Fenômenos Rubros', icone: '🔴' },
    { chave: 'ermos',      nome: 'Elementos dos Ermos',         icone: '🏕' },
  ],

  entradas: [

    // ── PERIGOS AMBIENTAIS ───────────────────────────────────────────
    { cat: 'ambientais', nome: 'Ácido',
      texto: `Exposição: 1d6 de dano por rodada. Imersão total (cair num poço de ácido): 10d6 por rodada, e o dano persiste por mais 1 rodada após sair. Ex.: 2 rodadas dentro + sair = 30d6 no total.` },

    { cat: 'ambientais', nome: 'Ar Saturado',
      texto: `Em área de umidade excessiva, cada personagem faz Fortitude (CD 15) por dia de exposição. Falha = fica alquebrado e fatigado (efeito de metabolismo). Além disso, na área, efeitos climáticos de calor e frio causam +1d6 de dano e as condições de descanso são sempre uma categoria piores.` },

    { cat: 'ambientais', nome: 'Área Desencantada',
      texto: `Lugar onde a magia é escassa (desastre mágico, maldição ou natureza do local). O custo em PM de habilidades e efeitos aumenta +1, e a recuperação de PM por descanso é sempre ruim, independentemente de outros efeitos e condições (como um acampamento).` },

    { cat: 'ambientais', nome: 'Areia Movediça',
      texto: `Em pântanos e desertos; em geral um quadrado de 6m de lado. Sobrevivência (CD 25) para notar à frente. Quem entra fica agarrado; se passar uma rodada inteira agarrado, submerge e precisa prender a respiração (ver Sufocamento).
Escapar: ação completa + Atletismo (CD 25). Se estava submersa, fica agarrada; se estava agarrada, fica livre na margem. Se falhar por 5 ou mais, fica fatigada (fatigada → exausta → inconsciente, provavelmente morrendo).
Personagens fora da área podem ajudar no teste de Atletismo (galho, vara ou corda).` },

    { cat: 'ambientais', nome: 'Dejetos Alquímicos',
      texto: `Poças de poções e preparados alquímicos (geralmente um quadrado de 3m). Contato: 4d4 de ácido + 1 condição adicional por um dia (Fort CD 20 reduz o dano à metade e evita a condição). Role 1d6 para a condição: 1) abalado; 2) alquebrado; 3) cego; 4) enjoado; 5) fatigado; 6) lento.` },

    { cat: 'ambientais', nome: 'Eletricidade',
      texto: `A cada rodada de contato com uma fonte de eletricidade: 2d6 de dano e atordoado por 1 rodada (Fort CD 20 reduz o dano à metade e evita a condição; molhado e/ou usando armadura de metal sofre –5 no teste). Sempre que um dado de dano der o valor máximo, role um dado adicional de dano.` },

    { cat: 'ambientais', nome: 'Escuridão',
      texto: `Leve: penumbra (noite enluarada, cantos longe dos lampiões) — fornece camuflagem leve.
Total: breu absoluto (noite sem luar/estrelas, câmara fechada, subterrâneos longe da entrada) — fornece camuflagem total.` },

    { cat: 'ambientais', nome: 'Fogo',
      texto: `Exposto a fogo: Reflexos (CD 15). Falha = fica em chamas (1d6 de fogo no início dos turnos). Apagar: ação padrão com as mãos, ou imersão em água. Fogo provocado por efeitos instantâneos (Explosão de Chamas, Bola de Fogo) não dura o suficiente para incendiar alguém.` },

    { cat: 'ambientais', nome: 'Fome e Sede',
      texto: `Um dia inteiro sem água ou comida sem maiores problemas. Depois, Fortitude por dia (CD 15 +1 por teste anterior): falha = fatigado; de novo = exausto; de novo = inconsciente; a 4ª falha é letal. Condições por fome/sede só são curadas com comida e bebida. Metabolismo.` },

    { cat: 'ambientais', nome: 'Fumaça',
      texto: `Imerso em fumaça densa (casa em chamas): Fortitude no início de cada turno (CD 10 +1 por teste anterior). Falha = perde o turno engasgando/tossindo. Duas falhas seguidas = perde 1d6 PV. Metabolismo. Também obscurece a visão, dando camuflagem leve às criaturas no interior.` },

    { cat: 'ambientais', nome: 'Lava',
      texto: `Lava, magma e materiais incandescentes (metal derretido): 2d6 de fogo por rodada de exposição direta. Imersão total (cair na cratera de um vulcão): 20d6 de fogo por rodada, persistindo por mais 1 rodada. Ex.: 2 rodadas + sair = 60d6.` },

    { cat: 'ambientais', nome: 'Lodo Negro',
      texto: `Essência de Ragnar, o antigo Deus da Morte; mais abundante nas Ruínas de Tyrondir. Contato: Fortitude (CD 35) a cada rodada. Se passar, perde 10d12 PV. Se falhar, sofre a perda OU tem os PV reduzidos a –10 (o que for pior). Imersão total mata instantaneamente, sem teste. Atravessa barreiras sólidas sem aviso e é impossível de armazenar em recipientes.` },

    { cat: 'ambientais', nome: 'Queda',
      texto: `1d6 de impacto para cada 1,5m, até no máximo 40d6 (queda de 60m). Queda na água: reduza o dano em 6m (–4d6). Objeto pesado (pedra, baú, barril) caindo sobre uma criatura: 1d6 por 1,5m da queda; dobre o dano para objeto muito pesado (rocha, altar, carroça).` },

    { cat: 'ambientais', nome: 'Rio Congelado',
      texto: `Mede de 9m a 18m de margem a margem. Andar à metade do deslocamento: sem teste. Andar normal, correr, investir ou sofrer dano sobre o gelo: Acrobacia (CD 15 para movimento, ou igual ao dano sofrido). Falha: role 1d4 — em 2/3/4, cai e desliza esse valor ×1,5m; em 1, o gelo cede e você afunda.
Afundou: 2d4 de frio por rodada e Atletismo p/ nadar (CD 15). Passar = ação de movimento para se erguer pelo buraco. Falhar = arrastado pela correnteza, preso sob o gelo. Para sair, nade até estar sob um buraco e gaste ação de movimento. Abrir um buraco no gelo: 20 de dano de impacto, perfuração ou fogo. Fora d'água, sofre frio extremo até se aquecer.
(A versão resumida no terreno Ártico usa 1d6 de frio e 10 de dano para quebrar — esta detalhada é a oficial.)` },

    { cat: 'ambientais', nome: 'Sono',
      texto: `Uma noite sem dormir sem problemas (mas não recupera PV/PM). Depois, Fortitude por dia sem dormir (CD 15 +1 por teste anterior): falha = fatigado; já fatigado = exausto; já exausto = cai inconsciente até dormir ao menos 8 horas.` },

    { cat: 'ambientais', nome: 'Sufocamento',
      texto: `Prende a respiração por 1 + Constituição rodadas (ex.: Con 2 = 3 rodadas). Depois, Fortitude por rodada (CD 15 +1 por teste anterior). Falha = cai inconsciente e perde 1d6 PV por rodada até respirar novamente ou morrer. Metabolismo.` },

    // ── CLIMA & VENTO ────────────────────────────────────────────────
    { cat: 'clima', nome: 'Calor e Frio',
      texto: `Clima muito quente (acima de 50 °C) ou muito frio (abaixo de –10 °C): Fortitude por dia (CD 15 +1 por teste anterior). Falha = 1d6 de fogo ou frio, curável só após sair do clima. Em calor/frio extremos (acima de 60 °C ou abaixo de –20 °C), o teste é feito por minuto.` },

    { cat: 'clima', nome: 'Neblina',
      texto: `Fornece camuflagem. Neblina espessa: camuflagem leve a criaturas a 1,5m e camuflagem total a criaturas a mais de 1,5m.` },

    { cat: 'clima', nome: 'Precipitações (Chuva, Granizo, Neve, Tempestade)',
      texto: `Chuva: –5 em Percepção e os mesmos efeitos de vento forte.
Granizo: como chuva, mas no início de cada rodada todas as criaturas sofrem 1 de impacto.
Neve: como chuva, mas cria terreno difícil.
Tempestade: –10 em Percepção e os efeitos de vendaval. No início de cada rodada, 10% de chance de uma criatura aleatória ser atingida por um raio (8d10 de eletricidade).` },

    { cat: 'clima', nome: 'Vento (Forte, Vendaval, Furacão, Tornado)',
      texto: `Vento Forte: –2 em ataques à distância; 50% de chance por rodada de apagar chamas ou dissipar névoas.
Vendaval: –5 em ataques à distância; apaga chamas e dissipa névoas.
Furacão: ataques à distância impossíveis; apaga chamas/névoas. No início da rodada, criaturas Médias ou menores fazem Fortitude (CD 15) ou caem, são arrastadas 1d4×1,5m na direção do vento e sofrem 1d6 por 1,5m.
Tornado: ataques à distância impossíveis; apaga chamas/névoas. No início da rodada, criaturas Grandes ou menores fazem Fortitude (CD 25) ou caem, são arrastadas 1d12×1,5m em direção aleatória e sofrem 1d6 por 1,5m.` },

    // ── TERRENOS ─────────────────────────────────────────────────────
    { cat: 'terrenos', nome: 'Colinas',
      texto: `Inclinação suave: não afeta o movimento, mas quem está no lado superior recebe bônus por terreno elevado contra quem está no inferior.
Inclinação íngreme: terreno difícil para subir. Descer correndo ou investindo exige Acrobacia (ou Cavalgar, se montado; CD 10); falha = cai, rola 1d4×1,5m para frente e sofre 1d6 por 1,5m.
Penhasco: 1d6×3m de altura; escalar exige Atletismo (CD 15).` },

    { cat: 'terrenos', nome: 'Desertos',
      texto: `Lugares áridos e quentes (para desertos frios, ver Ártico).
Dunas: funcionam como inclinações íngremes (ver Colinas), mas cair e rolar de uma duna não causa dano.` },

    { cat: 'terrenos', nome: 'Florestas',
      texto: `Árvores estreitas (menos de 1,5m): RD 5 e 100 PV; pode-se ficar no mesmo espaço (cobertura leve). Largas (mais de 1,5m): RD 5 e 500 PV; ficar atrás dá cobertura leve, e no topo dá camuflagem leve contra quem está no solo. Subir: Atletismo CD 15; equilibrar-se no topo: CD 15.
Folhagens (moitas, arbustos): terreno difícil + camuflagem leve a quem está dentro.
Vegetação rasteira (raízes, vinhas): terreno difícil + –2 em Furtividade (folhas secas e galhos).` },

    { cat: 'terrenos', nome: 'Montanhas',
      texto: `Início marcado por inclinações e penhascos (ver Colinas).
Abismo: fenda de 1d4×1,5m de largura e 2d4×3m de profundidade; escalar para fora exige Atletismo (CD 20).
Altitude: no cume, Fortitude (CD 15 +1 por teste) por dia; falha = fatigado até descer (já fatigado = exausto).
Paredão: penhasco vertical de 2d6×3m; escalar exige Atletismo (CD 25).
Seixos: inclinações cobertas de pedrinhas aumentam para 15 a CD de descer correndo/investindo.` },

    { cat: 'terrenos', nome: 'Pântanos',
      texto: `Incluem brejos, charcos e mangues. Muita vegetação rasteira, folhagens e árvores (ver Florestas), além de água parada (ver Aquático) e lodaçais.
Lodaçal: poças de água e lama; conta como terreno difícil e impõe a condição vulnerável a quem estiver dentro.` },

    { cat: 'terrenos', nome: 'Planícies',
      texto: `Estradas, pastos, fazendas e campos de batalha. Em geral sem elementos próprios (às vezes vegetação rasteira; ver Florestas).
Trincheira: cobertura leve contra ataques à distância; sair dela conta como terreno difícil. Serve também para valas, leitos de rio secos e acidentes similares.` },

    { cat: 'terrenos', nome: 'Ártico',
      texto: `Qualquer região fria (montanhas ou desertos gelados/tundras).
Gelo: andar à metade do deslocamento sem teste. Andar normal, correr, investir ou sofrer dano: Acrobacia (CD 15 para movimento, ou igual ao dano). Falha = cai e desliza 1d4×1,5m.
Rio congelado: como andar sobre gelo; para os detalhes (afundar, frio, quebrar) use o perigo "Rio Congelado".` },

    { cat: 'terrenos', nome: 'Aquático',
      texto: `Água corrente (rios, mar agitado): correnteza típica 1d6×3m por rodada; no fim de cada rodada, todos na água são arrastados nessa velocidade. Nadar: Atletismo CD 15 (correntezas de 9m/rodada ou menos) ou 20 (mais rápidas). Sair de correnteza de 15m ou mais: chegar à margem/apoio, gastar ação de movimento e Atletismo CD 20 para se agarrar.
Água parada (lagos, mar calmo): exige Atletismo para nadar, sem outros modificadores.
Submersos: não podem falar (nem lançar magias), –2 em ataque e –5 em Percepção; só se deslocam nadando (Atletismo). Armas à distância não funcionam (exceto arremesso de perfuração, bestas e redes); armas de corte/impacto não-naturais causam metade do dano. Recebem camuflagem e cobertura leves contra quem está fora d'água. Deslocamento de natação ignora essas penalidades.` },

    // ── ARMADILHAS (regras + listas combinadas dos livros) ───────────
    { cat: 'armadilhas', nome: 'Como funcionam as armadilhas',
      texto: `Nome em itálico (nos livros) = armadilha mágica, anulável com Dissipar Magia. Efeito: o que acontece com quem a disparou (afeta só essa criatura, salvo indicação). Resistência: tipo e CD do teste para evitar/reduzir o efeito. Investigação e Ladinagem: CDs para encontrar e desarmar. ND: o quão perigosa ela é (como o nível de desafio de uma criatura). Regras completas: Tormenta20, p. 317.` },

    { cat: 'armadilhas', nome: 'Agulha Envenenada', nd: '1/4',
      texto: `1 de perfuração e perde 1d12 PV por veneno. Reflexos CD 20 evita. Investigação CD 25, Ladinagem CD 20.` },
    { cat: 'armadilhas', nome: 'Arame Farpado', nd: '1/4',
      texto: `Conta como terreno difícil; 1d6+2 de corte em quem atravessar. Investigação CD 10, Ladinagem CD 20.` },
    { cat: 'armadilhas', nome: 'Fosso Camuflado', nd: '1/4',
      texto: `Queda de 3m: 2d6 de impacto (Atletismo CD 20 para escalar de volta). Reflexos CD 20 evita. Investigação/Ladinagem CD 20.` },
    { cat: 'armadilhas', nome: 'Rede', nd: '1/4',
      texto: `Fica agarrado (ação completa + Acrobacia CD 20 para escapar). Reflexos CD 20 evita. Investigação/Ladinagem CD 20.` },
    { cat: 'armadilhas', nome: 'Virote', nd: '1/4',
      texto: `1d10+2 de perfuração. Reflexos CD 20 evita. Investigação CD 25, Ladinagem CD 20.` },
    { cat: 'armadilhas', nome: 'Armadilha de Gaiola', nd: '1/2',
      texto: `Barras de ferro cercam um quadrado de 1,5m, prendendo a criatura. Abrir: Força ou Ladinagem CD 25; ou quebrar as grades (RD 10, 60 PV). Investigação CD 20, Ladinagem CD 25.` },
    { cat: 'armadilhas', nome: 'Fosso Profundo', nd: '1/2',
      texto: `Queda de 6m: 4d6 de impacto (Atletismo CD 20 para escalar de volta). Reflexos CD 20 evita. Investigação/Ladinagem CD 20.` },
    { cat: 'armadilhas', nome: 'Lâmina na Parede', nd: '1/2',
      texto: `2d6+5 de corte. Reflexos CD 20 evita. Investigação CD 25, Ladinagem CD 20.` },
    { cat: 'armadilhas', nome: 'Bloco de Pedra', nd: '1',
      texto: `6d6 de impacto. Reflexos CD 20 evita. Investigação/Ladinagem CD 20.` },
    { cat: 'armadilhas', nome: 'Pêndulo de Teto', nd: '1',
      texto: `1d12+10 de corte. Reflexos CD 25 evita. Investigação CD 25, Ladinagem CD 20.` },
    { cat: 'armadilhas', nome: 'Runa de Aceleração (mágica)', nd: '1',
      texto: `A criatura é arremessada 9m na direção em que se movia; se atingir uma parede/objeto sólido, 1d6 por 1,5m percorrido. Fortitude CD 20 reduz a distância à metade. Investigação/Ladinagem CD 20.` },
    { cat: 'armadilhas', nome: 'Fosso com Estacas', nd: '2',
      texto: `Queda de 9m: 6d6 de impacto + estacas 2d4+5 de perfuração (Atletismo CD 20 para escalar). Reflexos CD 20 evita. Investigação/Ladinagem CD 20.` },
    { cat: 'armadilhas', nome: 'Runa de Proteção (mágica)', nd: '2',
      texto: `6d6 de fogo (ou ácido, eletricidade, frio, luz ou trevas) em todas as criaturas a até 3m. Reflexos CD 20 reduz à metade (quem ativou não tem direito). Investigação/Ladinagem CD 25.` },
    { cat: 'armadilhas', nome: 'Símbolo do Medo (mágica)', nd: '2',
      texto: `Criaturas em alcance curto ficam abaladas até o fim da cena. Vontade CD 20 evita. Investigação/Ladinagem CD 25.` },
    { cat: 'armadilhas', nome: 'Gás Pútrido', nd: '2',
      texto: `Criaturas em alcance curto ficam enjoadas por uma cena. Fortitude CD 20 reduz para 1d4 rodadas. Investigação/Ladinagem CD 25.` },
    { cat: 'armadilhas', nome: 'Piso Eletrificado', nd: '2',
      texto: `6d6 de eletricidade em todas as criaturas num quadrado de 3m. Fortitude CD 20 reduz à metade; molhadas ou com armadura de metal sofrem –5. Investigação CD 25, Ladinagem CD 20.` },
    { cat: 'armadilhas', nome: 'Estátua Executora', nd: '3',
      texto: `1d12+10 mais 1d12+10 de corte; dois testes de Reflexos CD 25 (cada um evita um dos danos). Investigação/Ladinagem CD 20.` },
    { cat: 'armadilhas', nome: 'Gás Venenoso', nd: '3',
      texto: `Perde 1d12 PV por veneno por rodada durante 2d4 rodadas. Fortitude CD 20 reduz à metade. Investigação/Ladinagem CD 25.` },
    { cat: 'armadilhas', nome: 'Símbolo do Sono (mágica)', nd: '3',
      texto: `Criaturas em alcance curto com 8 níveis ou menos caem inconscientes (como a magia Sono). Vontade CD 20 evita. Investigação/Ladinagem CD 25.` },
    { cat: 'armadilhas', nome: 'Jato de Chamas', nd: '3',
      texto: `6d6 de fogo e deixa em chamas todas as criaturas numa linha de 6m. Reflexos CD 25 reduz à metade e evita a condição. Investigação/Ladinagem CD 25.` },
    { cat: 'armadilhas', nome: 'Parede Instável', nd: '4',
      texto: `8d6 de impacto num quadrado de 3m. Reflexos CD 25 reduz à metade. Investigação/Ladinagem CD 20.` },
    { cat: 'armadilhas', nome: 'Símbolo da Dor (mágica)', nd: '4',
      texto: `Criaturas em alcance curto: –5 em todos os testes até o fim da cena. Fortitude CD 25 evita. Investigação/Ladinagem CD 30.` },
    { cat: 'armadilhas', nome: 'Bruma da Insanidade', nd: '5',
      texto: `Criaturas num cubo de 6m de lado ficam confusas até o fim da cena. Fortitude CD 20 evita. Investigação/Ladinagem CD 25.` },
    { cat: 'armadilhas', nome: 'Símbolo do Atordoamento (mágica)', nd: '5',
      texto: `Criaturas em alcance curto ficam atordoadas por 1d6 rodadas. Fortitude CD 25 evita. Investigação/Ladinagem CD 30.` },
    { cat: 'armadilhas', nome: 'Extrato de Oxxdon (mágica)', nd: '5',
      texto: `Objetos de metal numa nuvem de 3m de raio oxidam e são destruídos; construtos de metal perdem 4d12 PV e ficam exaustos até serem reparados. Reflexos CD 25 evita a destruição dos itens; Fortitude CD 25 reduz a perda de PV à metade e a condição para fatigado. Investigação/Ladinagem CD 20.` },
    { cat: 'armadilhas', nome: 'Mina Terrestre', nd: '5',
      texto: `12d6 de impacto em todas as criaturas numa esfera de 3m. Reflexos CD 25 evita. Investigação/Ladinagem CD 25.` },
    { cat: 'armadilhas', nome: 'Runa de Teletransporte (mágica)', nd: '5',
      texto: `A criatura é transportada para uma superfície sólida desocupada em alcance médio (em geral uma prisão ou armadilha). Vontade CD 20 evita. Investigação CD 25, Ladinagem CD 20.` },
    { cat: 'armadilhas', nome: 'Símbolo da Anulação (mágica)', nd: '5',
      texto: `Magias em alcance curto são dissipadas e itens mágicos ali viram mundanos por 1d6 rodadas. Vontade CD 25 evita. Investigação CD 25, Ladinagem CD 20.` },
    { cat: 'armadilhas', nome: 'Desabamento do Teto', nd: '6',
      texto: `15d6 de impacto em todas as criaturas num quadrado de 6m. Reflexos CD 30 reduz à metade. Investigação/Ladinagem CD 25.` },
    { cat: 'armadilhas', nome: 'Símbolo da Insanidade (mágica)', nd: '6',
      texto: `Criaturas em alcance curto ficam confusas permanentemente. Vontade CD 25 evita. Investigação/Ladinagem CD 30.` },
    { cat: 'armadilhas', nome: 'Abismo da Morte', nd: '8',
      texto: `Um quadrado de 6m abre uma queda de 30m sobre estacas: 20d6 de impacto + 2d8+10 de perfuração (Atletismo CD 25 para escalar). Reflexos CD 30 evita. Investigação/Ladinagem CD 30.` },
    { cat: 'armadilhas', nome: 'Símbolo da Morte (mágica)', nd: '8',
      texto: `Criaturas em alcance curto são reduzidas a –1 PV. Fortitude CD 30 reduz para 10d6 de trevas. Investigação/Ladinagem CD 30.` },
    { cat: 'armadilhas', nome: 'Estátua de Górgona (mágica)', nd: '9',
      texto: `Criaturas num cone de 9m à frente da estátua são petrificadas. Reflexos CD 25 evita. Investigação/Ladinagem CD 25.` },
    { cat: 'armadilhas', nome: 'Runa de Desintegração (mágica)', nd: '10',
      texto: `Uma criatura em alcance curto: 10d12 de essência. Fortitude CD 30 reduz para 2d12. Se os PV chegarem a 0 ou menos, ela é completamente desintegrada (resta só pó). Investigação/Ladinagem CD 30.` },
    { cat: 'armadilhas', nome: 'Sussurro de Sszzaas (mágica)', nd: '13',
      texto: `Encantamento. Uma criatura em alcance curto tem a mente manipulada e passa a ver todos como inimigos, gastando ações em ações hostis contra os aliados. Vontade CD 30 evita; repete o teste no fim de cada rodada (passar encerra). Investigação/Ladinagem CD 30.` },

    // ── DOENÇAS (regras + listas combinadas dos livros) ──────────────
    { cat: 'doencas', nome: 'Como funcionam as doenças',
      texto: `Transmissão por contato, inalação ou ingestão. Exposto: Fortitude (CD da doença). Falha = contaminado (ainda sem efeito). Contaminado: repete o Fortitude no início de cada dia — falha = sofre o efeito daquele dia; passar dois dias seguidos = curado. Contaminação não é cumulativa. Efeitos progressivos (separados por "/"): cada falha seguida avança um estágio; passar regride um estágio. * = perda permanente de atributo (só 1 ponto por uma mesma doença). Regras completas: Tormenta20, p. 318.` },

    { cat: 'doencas', nome: 'Alergia Elemental',
      texto: `Há uma versão por tipo de energia (ácido, eletricidade, fogo, frio, luz, trevas). Contato e Ingestão, CD 25. Vulnerável ao tipo de energia / além disso, ao sofrer esse dano perde 1 PM / além disso, ao sofrer esse dano sofre uma condição conforme o elemento (ácido: vulnerável; eletricidade: ofuscado; fogo: em chamas; frio: lento; luz: cego; trevas: recuperação de PV reduzida à metade).` },
    { cat: 'doencas', nome: 'Doença de Descompressão Etérea',
      texto: `Comum entre quem viaja muito pelo éter divino. Contato, CD 20. Esmorecida / perde 2d10 PM que não se recuperam até a doença ser curada.` },
    { cat: 'doencas', nome: 'Febre do Carniçal',
      texto: `Contato, CD 15. Fraca / enjoada / morre. Uma criatura morta por ela retorna como carniçal na próxima meia-noite.` },
    { cat: 'doencas', nome: 'Febre Necrótica',
      texto: `Contato, CD 20. Fraca / debilitada / morre. Uma criatura morta por ela se torna zumbi três dias depois.` },
    { cat: 'doencas', nome: 'Gripe do Fluxo',
      texto: `Doença mágica de manipulações temporais. Inalação, CD 25. Esmorecida / não pode sustentar magias até o fim da doença / perde 1 de Sabedoria*.` },
    { cat: 'doencas', nome: 'Infecção Escarlate',
      texto: `Contato, CD 20. Perde 1d12 PV / perde 2d12 PV / perde 1 de Carisma* / morre. Uma criatura morta por ela retorna como infecto no dia seguinte.` },
    { cat: 'doencas', nome: 'Náusea Antinatural',
      texto: `Parasitas de matéria vermelha. Contato, CD 25. Perde 1d4 PM e 1d12 PV / perde 2d4 PM e 2d12 PV / expele 1 enxame infernal e o ciclo reinicia. PM e PV perdidos não se recuperam até a cura.` },
    { cat: 'doencas', nome: 'Podridão da Múmia',
      texto: `Só curável por meios mágicos (passar no teste apenas impede a progressão). Contato, CD 20. Lenta / fatigada / exausta / perde 1 de Constituição* / morre.` },
    { cat: 'doencas', nome: 'Praga Coral',
      texto: `Terrivelmente contagiosa; sem cura conhecida (passar/curar doença só impede a progressão naquele dia). Contato e Inalação, CD 35. Fraca / debilitada / debilitada e perde 1 de Força, Constituição e Carisma (cumulativo; revertível só por Desejo ou Intervenção Divina). Se algum atributo chegar a –5, vira um monstro do mestre.` },
    { cat: 'doencas', nome: 'Pulmão em Brasa',
      texto: `Acúmulo de poeira de pedra-de-fumaça nos pulmões. Inalação, CD 20. Fatigada / exausta / morre numa explosão de 6d6 de fogo em raio de 3m.` },
    { cat: 'doencas', nome: 'Rinite Feérica',
      texto: `Inalação, CD 20. Vulnerável a magia / vulnerável e alquebrada / além disso, ao ser afetada por um efeito mágico fica enjoada por 1 rodada.` },
    { cat: 'doencas', nome: 'Tremedeira Desastrada',
      texto: `Inalação, CD 20. Fatigada / exausta / exausta e, a cada ataque, 25% de chance (1 em 1d4) de deixar a arma cair.` },
    { cat: 'doencas', nome: 'Calafrio Diabólico',
      texto: `Contato, CD 25. Fraca / debilitada / inconsciente / morre.` },
    { cat: 'doencas', nome: 'Febre do Riso',
      texto: `Inalação, CD 20. Frustrada / esmorecida / confusa (a condição se ativa no início de cada cena).` },
    { cat: 'doencas', nome: 'Febre Mental',
      texto: `Inalação, CD 20. Frustrada / esmorecida / alquebrada.` },
    { cat: 'doencas', nome: 'Infecção do Esgoto',
      texto: `Transmitida por ratos gigantes, otyughs e lugares imundos (a feridos). Contato, CD 15. Fraca / debilitada.` },
    { cat: 'doencas', nome: 'Maldição Pegajosa',
      texto: `A cura exige passar em três Fortitude seguidos. Contato, CD 20. Perde 1d12 PV / perde 2d12 PV / perde 4d12 PV.` },
    { cat: 'doencas', nome: 'Moléstia Demoníaca',
      texto: `Contato, CD 20. Perde 1d12 PV / perde 2d12 PV / perde 1 de Constituição* / morre.` },
    { cat: 'doencas', nome: 'Tremores',
      texto: `Contato, CD 15. Vulnerável.` },
    { cat: 'doencas', nome: 'Varíola',
      texto: `Inalação, CD 20. Enjoada / debilitada / perde 1 de Carisma* / morre.` },

    // ── MALDIÇÕES ────────────────────────────────────────────────────
    { cat: 'maldicoes', nome: 'Como funcionam as maldições',
      texto: `Efeitos mágicos poderosos que punem ou enfraquecem. Ativação: cada maldição tem uma condição (mover/manusear um objeto, violar uma tumba, ou ser proferida por uma criatura). Detecção: estudar por alguns minutos + Investigação ou Misticismo (CD igual à da maldição). Resistência: Vontade ao ser ativada (CD conforme a fonte). Remoção: cada uma tem sua forma específica; em geral também pode ser removida por Desejo e Intervenção Divina (com sacrifício de 2 PM).` },

    { cat: 'maldicoes', nome: 'Conhecimento Proibido',
      texto: `Protege livros e conhecimentos profanos. A vítima fica confusa até o fim da cena e perde 1 ponto permanente de Sabedoria ou Carisma por dia (aleatório). Atributo a –5 = vira monstro do mestre. Remoção: ritual de um clérigo de Tannah-Toh lançando Dispersar as Trevas (T$ 1.000 em incensos e ingredientes sagrados).` },
    { cat: 'maldicoes', nome: 'Fúria de Allihanna',
      texto: `Punição por crimes contra o mundo natural (ex.: matar um unicórnio). Animais, devotos de Allihanna e criaturas naturais recebem +5 em testes e rolagens de dano contra a vítima e a tratam como hostil. Ambientes naturais viram terreno difícil; –5 em Acrobacia e Atletismo neles; descanso em ambientes naturais sempre dois níveis abaixo. Remoção: perdão de um clérigo ou druida de Allihanna capaz de lançar magias de 4º círculo (geralmente um serviço que repare o crime).` },
    { cat: 'maldicoes', nome: 'Maldição do Bardo',
      texto: `"Matar bardo dá azar": a morte de um bardo talentoso pode desencadeá-la. A vítima perde todo o talento — para modificadores de perícia e CDs de habilidade, todos os atributos contam como 0. Remoção: localizar a alma do bardo morto e vencê-lo num duelo artístico (três testes opostos de Atuação, vencer ao menos dois; uma vez por aventura).` },
    { cat: 'maldicoes', nome: 'Mortuária',
      texto: `Causada por mortalhas ou tumbas ligadas à necromancia/energia negativa. A vítima fica cansada e decrépita e recebe vulnerabilidade a trevas (substitui qualquer imunidade/redução a trevas e a capacidade de recuperar PV com trevas). Remoção: se for de uma mortalha, destruí-la; se for por violar uma tumba, lançar Dispersar as Trevas sobre os restos do ocupante original (ritual de 1h, T$ 1.000).` },
    { cat: 'maldicoes', nome: 'Toque de Tibar',
      texto: `Punição por crimes contra os dogmas de Tibar (descobrir o segredo da Cunhagem Sagrada, falsificar moedas). Tudo o que a vítima veste/empunha vira pirita: armas –2 em ataque e dano; armaduras e escudos –2 de Defesa; itens gerais –2 nos testes em que forem usados. Remoção: reparar o crime (esquecer info secreta via Alterar Memória, devolver os lucros).` },

    // ── TORMENTA & FENÔMENOS RUBROS ──────────────────────────────────
    { cat: 'tormenta', nome: 'Tormenta',
      texto: `Ao entrar numa área de Tormenta, a criatura fica frustrada. No início de cada dia na área: Vontade (CD 25 +2 por dia consecutivo anterior) ou fica esmorecida pelo dia (já esmorecida → confusa; já confusa → completamente insana; um PC vira NPC maligno do mestre). Na área, habilidades com custo em PM custam +2 PM e itens mágicos encantados perdem um encantamento (à escolha do portador). Recuperação de PV e PM por descanso reduzida à metade. Lefeu e lefou são imunes a tudo isso.` },

    { cat: 'tormenta', nome: 'Fenômenos Rubros (como rolar)',
      texto: `A cada hora de viagem em área de Tormenta, role 1d8: 1) Caos de sangue; 2) Neblina venenosa; 3) Labaredas infernais; 4) Chuva ácida; 5) Temperaturas implacáveis; 6) Tempestade elétrica; 7) Pesadelos reais; 8) Nenhum fenômeno. Ao se manifestar, cada um pode fazer Conhecimento ou Sobrevivência (CD 35) para identificar e ganhar 1 rodada de preparação. Os efeitos ignoram imunidades (exceto imunidade específica à Tormenta) e não há como escapar apenas se afastando.` },
    { cat: 'tormenta', nome: 'Caos de Sangue',
      texto: `Fenômeno duplo: role duas vezes usando 1d6+1 (em vez de 1d8). Resultados iguais são cumulativos.` },
    { cat: 'tormenta', nome: 'Chuva Ácida',
      texto: `Dura 2d4 rodadas; no início de cada rodada, cada personagem sofre 4d8 de ácido. O dano persiste por mais 1 rodada após se abrigar ou a chuva terminar.` },
    { cat: 'tormenta', nome: 'Labaredas Infernais',
      texto: `Ao se manifestar e no início de cada rodada por mais 1d4 rodadas, cada personagem tem 50% de chance (ímpar num dado) de ser atingido por uma coluna de chamas: 10d6, metade fogo e metade trevas (Ref CD 35 reduz à metade).` },
    { cat: 'tormenta', nome: 'Neblina Venenosa',
      texto: `Dura 2d4 rodadas; dispersável por vento forte (1d4 rodadas) ou vendaval (1 rodada). Camuflagem leve a 1,5m e total a mais de 1,5m. Quem inicia o turno dentro perde 8d4 PV e tem itens expostos (armaduras, escudos) avariados. A perda persiste por mais 1 rodada após se abrigar/terminar.` },
    { cat: 'tormenta', nome: 'Pesadelos Reais',
      texto: `As criaturas ficam apavoradas, sofrem 6d8 psíquico e perdem 1d6 PM (Von CD 35 evita o dano e a perda). Repete a Vontade no início de cada turno; falha = sofre de novo. Termina com dois testes de Vontade seguidos. Medo.` },
    { cat: 'tormenta', nome: 'Temperaturas Implacáveis',
      texto: `Calor e frio extremos ao mesmo tempo por 2d4 minutos. A cada minuto, Fortitude (CD 25 +1 por teste anterior); falha = 4d6 (metade fogo, metade frio), curável só ao fim do fenômeno.` },
    { cat: 'tormenta', nome: 'Tempestade Elétrica',
      texto: `Dura 2d4 rodadas; no início de cada rodada, um personagem aleatório é atingido por um relâmpago: 20d8, metade ácido, metade eletricidade. Para cada resultado 8 nesses dados, perde também 2 PM (Ref CD 35 reduz tudo à metade).` },

    // ── ELEMENTOS DOS ERMOS ──────────────────────────────────────────
    { cat: 'ermos', nome: 'Covil',
      texto: `Lar de um monstro. Avistável com Percepção ou Sobrevivência; Sobrevivência também identifica o habitante (CD 15 + ND da criatura). Normalmente o monstro está no covil, mas há 25% de chance de estar fora (e o tesouro, desprotegido).` },
    { cat: 'ermos', nome: 'Ruína',
      texto: `Quem entra rola 1d6: 1-2) só uma ameaça (armadilha ou monstro); 3-4) vazia; 5) uma ameaça e um tesouro; 6) só um tesouro. Ameaças e tesouros apropriados ao nível do grupo. Serve para lugares pequenos — ruínas grandes são masmorras por si só.` },
    { cat: 'ermos', nome: 'Santuário',
      texto: `Lugar consagrado a um deus. Religião (CD 20) indica a qual. Tocar um santuário do seu deus patrono dá o efeito de uma magia (em geral Bênção, Curar Ferimentos, Físico Divino ou Vestimenta da Fé), uma vez por dia. Santuário de deus inimigo: você é amaldiçoado (ver Rogar Maldição) até o fim do dia.` },

  ],

};
