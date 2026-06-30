// ═══════════════════════════════════════════════════════════════════
//  ACOES-DATA.JS — A Rodada de Combate (Tormenta20)
//  Conteúdo da sub-aba "🎬 Ações & Combate" das Consultas rápidas.
//  Transcrito de 'Regras.txt' (A Rodada de Combate · Ferimentos & Morte
//  · regras opcionais). Consumido por acoes.js — mesmo formato de
//  REGRAS_ITENS: { grupo, titulo, texto, tabela? }.
// ═══════════════════════════════════════════════════════════════════
window.REGRAS_ACOES = [

  // ── A RODADA NA PRÁTICA ─────────────────────────────────────────
  { grupo: '🎬 A Rodada na Prática', titulo: 'A rodada de combate', texto:
`Uma rodada representa cerca de seis segundos no mundo de jogo. Durante a rodada, cada participante (incluindo o mestre) tem o seu turno — a sua vez de realizar ações.
A rodada começa no turno de quem tirou a Iniciativa mais alta e termina após o turno de quem tirou a mais baixa. Mas a rodada também é o tempo entre uma Iniciativa e a mesma Iniciativa na rodada seguinte.
Efeitos que duram certo número de rodadas terminam imediatamente antes do mesmo resultado de Iniciativa em que se iniciaram, após o número apropriado de rodadas.` },

  { grupo: '🎬 A Rodada na Prática', titulo: 'O que cabe num turno', texto:
`No seu turno, você pode fazer UMA ação padrão e UMA ação de movimento, em qualquer ordem. Você pode trocar a ação padrão por uma ação de movimento (para fazer duas de movimento), mas não o inverso. Pode ainda abrir mão das duas para fazer uma ação completa.
Portanto, num turno você faz:
• Uma ação padrão + uma de movimento; ou
• Duas ações de movimento; ou
• Uma ação completa.
Além disso, você pode executar qualquer quantidade de ações livres e reações.` },

  { grupo: '🎬 A Rodada na Prática', titulo: 'Os cinco tipos de ação', texto:
`Padrão — executa uma tarefa. Atacar ou lançar uma magia são as ações padrão mais comuns.
Movimento — algum movimento físico. Mais comum: percorrer uma distância igual ao deslocamento. Levantar-se, sacar uma arma, pegar item da mochila, abrir porta e montar também são de movimento.
Completa — exige todo o tempo e esforço da rodada (abre mão da padrão E da de movimento), mas normalmente ainda permite ações extras, livres e reações.
Livre — quase nenhum tempo/esforço; só pode ser feita no seu turno. O mestre pode decidir que algo é complicado demais para ser livre.
Reação — resposta automática a outra coisa; pode ocorrer mesmo fora do seu turno e mesmo se você não puder agir (ex.: atordoado). Você pode fazer qualquer quantidade. Ex.: Reflexos para escapar de uma explosão.` },

  // ── AÇÕES PADRÃO ────────────────────────────────────────────────
  { grupo: '⚔ Ações Padrão', titulo: 'Agredir (ataque com arma)', texto:
`Você faz um ataque com uma arma corpo a corpo ou à distância.
Corpo a corpo — atinge qualquer inimigo dentro do alcance natural (1,5m / adjacente no mapa para criaturas Pequenas e Médias). Você pode substituir o ataque por uma manobra de combate.
À distância — atinge qualquer inimigo que consiga ver e que esteja no alcance da arma (ou até o dobro do alcance, com –5).
• Atirando em combate corpo a corpo: ataque à distância contra alvo em combate corpo a corpo sofre –5. Uma criatura está em combate corpo a corpo se estiver dentro do alcance natural de qualquer inimigo (incluindo você).` },

  { grupo: '⚔ Ações Padrão', titulo: 'Atropelar', texto:
`Você usa uma ação padrão durante um movimento para avançar pelo espaço de uma criatura (normalmente não se faz ação padrão durante um movimento — isto é uma exceção). A criatura pode dar passagem (você avança, sem teste) ou resistir (teste de manobra oposto): se você vencer, deixa-a caída e continua o avanço; se ela vencer, continua de pé e detém seu avanço.
Atropelar é uma ação livre se tentada durante uma investida (mas não pode atropelar e atacar o mesmo alvo).` },

  { grupo: '⚔ Ações Padrão', titulo: 'Fintar', texto:
`Faça um teste de Enganação oposto ao teste de Reflexos de uma criatura em alcance curto. Se você passar, ela fica desprevenida contra seu próximo ataque, mas apenas até o fim do seu próximo turno.` },

  { grupo: '⚔ Ações Padrão', titulo: 'Preparar uma ação', texto:
`Você prepara uma ação (padrão, de movimento ou livre) para realizar mais tarde, após seu turno mas antes do seu turno na próxima rodada. Diga a ação e a circunstância (ex.: "disparar minha besta na primeira criatura que passar pela porta"). A qualquer momento antes do seu próximo turno, você pode executá-la como uma reação a essa circunstância.
Se, no seu próximo turno, ainda não tiver realizado a ação preparada, não pode mais realizá-la (mas pode prepará-la de novo). Pelo resto do combate, sua Iniciativa fica imediatamente acima daquela em que você fez a ação preparada.` },

  { grupo: '⚔ Ações Padrão', titulo: 'Lançar magia · Usar habilidade ou item', texto:
`Lançar uma magia — a maioria das magias exige uma ação padrão.
Usar uma habilidade ou item mágico — algumas habilidades e itens mágicos, como poções, exigem uma ação padrão para serem usados.` },

  // ── AÇÕES DE MOVIMENTO ──────────────────────────────────────────
  { grupo: '🏃 Ações de Movimento', titulo: 'Ações de movimento comuns', texto:
`Movimentar-se — percorre uma distância igual ao seu deslocamento (tipicamente 9m para raças Médias). Nadar, escalar ou cavalgar também usam esta ação.
Levantar-se — sair do chão (ou de uma cama, cadeira...).
Manipular item — pegar objeto na mochila, abrir/fechar porta, atirar uma corda para alguém.
Sacar ou guardar item — uma ação de movimento. Se puder usar mais de uma arma (ex.: Ambidestria), pode sacar todas elas.` },

  { grupo: '🏃 Ações de Movimento', titulo: 'Mirar', texto:
`Você mira em um alvo que possa ver, dentro do alcance da arma. Isso anula a penalidade de –5 em testes de Pontaria realizados neste turno contra aquele alvo, caso ele esteja engajado em combate corpo a corpo.` },

  // ── AÇÕES COMPLETAS ─────────────────────────────────────────────
  { grupo: '💪 Ações Completas', titulo: 'Investida', texto:
`Você avança até o dobro do seu deslocamento (e no mínimo 3m) em linha reta e, no fim do movimento, faz um ataque corpo a corpo. Recebe +2 no teste de ataque, mas sofre –2 na Defesa até seu próximo turno (sua guarda fica aberta).
Não é possível investir em terreno difícil. Durante a investida, você pode fazer a manobra atropelar como uma ação livre (mas não pode atropelar e atacar o mesmo alvo).` },

  { grupo: '💪 Ações Completas', titulo: 'Golpe de misericórdia', texto:
`Você desfere um golpe letal em um oponente adjacente e indefeso. É um acerto crítico automático. Além de sofrer o dano, a vítima tem chance de morrer instantaneamente: 25% (1 em 1d4) para personagens e NPCs importantes; 75% (1 a 3 em 1d4) para NPCs secundários.` },

  { grupo: '💪 Ações Completas', titulo: 'Corrida · magias longas', texto:
`Corrida — você corre mais rápido que seu deslocamento normal (veja a perícia Atletismo).
Lançar magia (execução longa) — ao lançar magias com execução maior que uma ação completa, você gasta uma ação completa a cada rodada.` },

  // ── AÇÕES LIVRES ────────────────────────────────────────────────
  { grupo: '🆓 Ações Livres', titulo: 'Atrasar (e vários atrasos)', texto:
`Escolhendo atrasar sua ação, você age mais tarde na ordem de Iniciativa — o mesmo que reduzir sua Iniciativa voluntariamente pelo resto do combate. Quando a nova contagem chegar, você age normalmente. Útil para ver o que aliados/inimigos farão antes de decidir.
• Limite — você pode atrasar até –10 menos seu valor de Iniciativa; nesse ponto, deve agir ou abrir mão da ação. (Ex.: Iniciativa +3 pode esperar até a contagem chegar a –13.)
• Vários atrasos — entre quem atrasa, o de maior Iniciativa (ou maior Destreza, no empate) tem a vantagem: age primeiro se quiserem a mesma contagem, e tem o direito de agir depois se estiverem tentando agir um após o outro.` },

  { grupo: '🆓 Ações Livres', titulo: 'Falar · Jogar-se no chão · Largar item', texto:
`Falar — em geral é ação livre (limite padrão de vinte palavras por rodada). Lançar magias ou usar habilidades que dependem da voz NÃO são ações livres.
Jogar-se no chão — ação livre. Você recebe os benefícios e penalidades de estar caído, mas normalmente não sofre dano ao se jogar.
Largar um item — deixar cair é ação livre. Deixar cair/jogar com a intenção de acertar algo é ação padrão; jogar para outra pessoa agarrar é ação de movimento.` },

  // ── MANOBRAS DE COMBATE ─────────────────────────────────────────
  { grupo: '🤼 Manobras de Combate', titulo: 'Como funcionam as manobras', texto:
`Uma manobra é um ataque corpo a corpo para fazer algo diferente de causar dano (desarmar, empurrar para um abismo etc.). Não é possível fazer manobras com ataques à distância.
Faça um teste de manobra (um teste de ataque corpo a corpo) oposto à criatura. Mesmo que ela use arma à distância, resiste com seu valor de Luta. No empate, vence o maior bônus; persistindo, role de novo. Em geral, qualquer arma corpo a corpo serve para manobras.` },

  { grupo: '🤼 Manobras de Combate', titulo: 'Agarrar', texto:
`Você segura uma criatura. Uma criatura agarrada fica desprevenida e imóvel, sofre –2 nos ataques e só pode atacar com armas leves. Ela se solta com uma ação padrão, vencendo um teste de manobra oposto.
Você só agarra com ataque desarmado ou arma natural e, enquanto agarra, fica com essa mão/arma natural ocupada; move-se metade do deslocamento, arrastando a criatura. Solta com ação livre. Pode atacar a agarrada com a mão livre ou, no lugar de um ataque, fazer outro teste de agarrar: vencendo, causa dano de impacto igual a um ataque desarmado/arma natural (esmaga ou sufoca).
Ataque à distância contra um alvo na manobra agarrar tem 50% de chance de mirar no alvo errado.` },

  { grupo: '🤼 Manobras de Combate', titulo: 'Derrubar', texto:
`Você deixa o alvo caído (normalmente sem dano). Se vencer o teste oposto por 5 pontos ou mais, derruba com tanta força que também o empurra um quadrado na direção à sua escolha. Se isso o jogar além de um parapeito ou precipício, ele pode fazer um teste de Reflexos (CD 20) para se agarrar numa beirada.` },

  { grupo: '🤼 Manobras de Combate', titulo: 'Desarmar', texto:
`Você derruba um item que a criatura segura. Normalmente o item cai no mesmo lugar do alvo (salvo se ele estiver voando, sobre uma ponte etc.). Se vencer o teste oposto por 5 pontos ou mais, empurra o item um quadrado na direção à sua escolha.` },

  { grupo: '🤼 Manobras de Combate', titulo: 'Empurrar', texto:
`Você empurra a criatura 1,5m. Para cada 5 pontos de diferença entre os testes, empurra mais 1,5m. Você pode gastar uma ação de movimento para avançar junto com a criatura (até o limite do seu deslocamento).` },

  { grupo: '🤼 Manobras de Combate', titulo: 'Quebrar', texto:
`Você atinge um item que a criatura segura, tentando danificá-lo ou destruí-lo (veja "Quebrando Objetos" e as condições de item Avariado/Destruído).` },

  // ── FERIMENTOS & MORTE ──────────────────────────────────────────
  { grupo: '💀 Ferimentos & Morte', titulo: 'Sofrer dano e cair (0 PV)', texto:
`Sempre que sofre dano, subtraia o valor dos seus pontos de vida. O dano não impede você de agir — isso só muda quando os PV chegam a 0 ou menos.
A 0 PV ou menos, você cai inconsciente e fica sangrando. No início de cada turno, faça um teste de Constituição (CD 15): passando, você estabiliza e não testa mais (a menos que perca mais PV); falhando, perde 1d6 PV. Repita a cada rodada até estabilizar ou morrer.
Um personagem sangrando pode ser estabilizado com um teste de Cura (CD 15) ou por qualquer efeito que cure ao menos 1 PV. Quem está a 0 ou menos e recupera PV até um valor positivo (1+) recobra a consciência e age normalmente.` },

  { grupo: '💀 Ferimentos & Morte', titulo: 'Morte (limiar)', texto:
`Você morre quando seus PV chegam a –10 OU a um número negativo igual à metade dos seus PV totais — o que for MAIS BAIXO (mais negativo).
Exemplo: Oberon, com 12 PV, morre a –10 PV. Mais tarde, com 30 PV, ele só morre a –15 PV.
(No rastreador de combate da aba ⚔ Combates, a ficha de criatura ajuda a lembrar esse limiar.)` },

  { grupo: '💀 Ferimentos & Morte', titulo: 'Dano não letal', texto:
`Dano não letal conta para determinar quando você cai inconsciente, mas não para começar a sangrar ou morrer. Efeitos de cura recuperam primeiro os PV perdidos por dano não letal.
Quase todo dano comum (armas, armadilhas, magias) é letal. Você pode usar uma arma para causar dano não letal (com o lado não afiado, controlando os golpes), mas sofre –5 no ataque. Ataques desarmados e certas armas causam dano não letal por padrão; usá-los para dano letal impõe o mesmo –5.` },

  // ── REGRAS OPCIONAIS DE COMBATE ─────────────────────────────────
  { grupo: '⚙ Regras Opcionais de Combate', titulo: 'Cobertura leve e efeitos (opcional)', texto:
`Cobertura leve fornece +5 em testes de Reflexos contra efeitos com alvo que tenham origem no lado oposto da cobertura e contra efeitos de área cujo centro esteja do lado oposto da cobertura.` },

  { grupo: '⚙ Regras Opcionais de Combate', titulo: 'Ataques mirados (opcional)', texto:
`Sempre que faz um ataque, você pode mirar numa parte específica do corpo para causar um efeito adicional, com penalidade no ataque: –5 para pernas, braços, tronco, asas e outros membros locomotores; –10 para cabeça ou equivalente.
Se o ataque acertar e causar dano, você impõe ao alvo um efeito adicional equivalente ao efeito crítico de MENOR severidade para a parte atingida. Se for um acerto crítico, use a severidade seguinte (ou resolva como efeito crítico normal, se estiver usando a regra Efeitos Críticos).` },

  { grupo: '⚙ Regras Opcionais de Combate', titulo: 'Escalando criaturas (opcional)', texto:
`Um combatente audacioso pode escalar criaturas gigantes rumo à cabeça (ou outro ponto vulnerável). A criatura precisa ser Grande+ e ao menos duas categorias de tamanho maior que você.
Para escalar: esteja adjacente, gaste uma ação de movimento e faça um teste de Acrobacia ou Atletismo oposto ao Reflexos da criatura (+5 se tiver deslocamento de escalada). Vencendo, sobe; perdendo, não sobe; perdendo por 5+, escorrega e cai, sofrendo 2d6 de impacto por avanço feito, ficando caído e adjacente.
Sucessos para chegar ao topo: 1 (Grande), 2 (Enorme), 4 (Colossal). Na cabeça, você recebe camuflagem contra a criatura, ela conta como desprevenida contra você, e seus ataques recebem +2 na margem de ameaça e +1 no multiplicador de crítico. No início de cada turno seu na cabeça, refaça o teste como ação livre; perdendo por 5+, ela o derruba.` },

  { grupo: '⚙ Regras Opcionais de Combate', titulo: 'Efeitos críticos & Falhas críticas (opcional)', texto:
`Efeitos críticos — num acerto crítico, além do dano extra, role a localização (1d10) e a severidade (1d10 + modificador do multiplicador de crítico) para impor um efeito adicional.
Falhas críticas — num "1 natural" no ataque, além de errar, role 1d100 numa tabela de desastres.
👉 Estas duas regras viraram ROLADORES interativos na aba ⚔ Combates: abra a ficha de uma criatura e use a barra "🎲 Críticos" — ela rola, registra no log e (no caso dos efeitos) aplica a condição resultante com um clique.` },
];
