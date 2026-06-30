// ═══════════════════════════════════════════════════════════════════
//  REGRAS-ITENS-DATA.JS — Regras gerais de equipamento (Tormenta20)
//  Conteúdo da sub-aba "⚔ Arsenal & Regras" das Consultas rápidas.
//  Transcrito de 'Texto Importante!.txt'. Consumido por regras-itens.js
// ═══════════════════════════════════════════════════════════════════
window.REGRAS_ITENS = [

  // ── ARMAS ──────────────────────────────────────────────────────
  { grupo: '⚔ Armas — Regras Gerais', titulo: 'Proficiência', texto:
`Armas Simples — de manejo fácil (adagas, clavas, lanças). Todos os personagens sabem usá-las.
Armas Marciais — de uso específico de combatentes (espadas, machados). São proficientes: bárbaros, bardos, bucaneiros, caçadores, cavaleiros, guerreiros, nobres e paladinos.
Armas Exóticas — difíceis de dominar (corrente de espinhos, espada bastarda). Exigem treinamento específico.
Armas de Fogo — raras em Arton; exigem treinamento específico.
Penalidade por não proficiência: –5 nos testes de ataque. Todas as criaturas são proficientes em ataques desarmados e em suas armas naturais.` },

  { grupo: '⚔ Armas — Regras Gerais', titulo: 'Propósito (corpo a corpo × à distância)', texto:
`Corpo a Corpo — atacam alvos adjacentes; usam teste de Luta e somam a Força nas rolagens de dano.
Ataque à Distância — usam teste de Pontaria. Subdividem-se em:
• Arremesso — a própria arma é atirada (adaga, azagaia). Sacá-la é ação de movimento; soma a Força no dano.
• Disparo — dispara um projétil (arco, besta). Sacar a munição é ação livre; recarregar exige as duas mãos; NÃO soma atributo no dano (exceções como arco longo e funda aplicam Força).` },

  { grupo: '⚔ Armas — Regras Gerais', titulo: 'Empunhadura', texto:
`Leve — usada com uma mão; beneficia-se do poder Acuidade com Arma.
Uma mão — usada com uma mão, deixando a outra livre.
Duas mãos — usada com as duas mãos. Livrar uma mão é ação livre; reempunhá-la é ação de movimento (ou livre, se puder sacá-la assim).` },

  { grupo: '⚔ Armas — Regras Gerais', titulo: 'Características das armas (Preço, Dano, Crítico, Alcance, Tipo, Espaço)', texto:
`Preço — inclui acessórios básicos (bainhas, aljavas).
Dano — rolado ao acertar e subtraído dos PV do alvo.
Crítico — num 20 natural, multiplica os DADOS de dano por 2 (bônus numéricos e dados extras não são multiplicados). "19/18" aumenta a margem de ameaça; "x3/x4" aumenta o multiplicador; "19/x3" combina ambos.
Alcance — curto (9m), médio (30m) e longo (90m). Atacar até o dobro do alcance impõe –5. Armas sem alcance podem ser arremessadas em alcance curto com –5.
Tipo — Corte (C), Impacto (I) ou Perfuração (P).
Espaço — quanto a arma ocupa na capacidade de carga.` },

  { grupo: '⚔ Armas — Regras Gerais', titulo: 'Habilidades de armas', texto:
`Adaptável — arma de uma mão usada com as duas mãos aumenta o dano em um passo.
Ágil — pode usar Acuidade com Arma mesmo não sendo leve.
Alongada — dobra o alcance natural, mas não atinge adversário adjacente.
Desbalanceada — impõe –2 em testes de ataque.
Dupla — permite ataques adicionais (como arma de uma mão + leve); cada ponta conta como arma separada para melhorias e encantos.
Versátil — +2 em uma ou mais manobras (cumulativo com outros itens).
Híbrida — dois ou mais modos de uso; trocar de modo é ação de movimento (livre com Saque Rápido); melhorias e encantos custam o dobro.
Ocultável — +5 em Ladinagem para escondê-la.
Surpreendente — uma vez por cena, sacá-la como ação livre e atacar no mesmo turno deixa o alvo desprevenido contra esse ataque.` },

  { grupo: '⚔ Armas — Regras Gerais', titulo: 'Passos de dano (Tabela 3-2)',
    texto: 'Efeitos que aumentam ou reduzem o dano o fazem em "passos". Ache o dado da arma na coluna Normal e ande para os lados conforme o efeito. O dano nunca passa do máximo (4d12).',
    tabela: {
      cab: ['–2', '–1', 'Normal', '+1', '+2', '+3'],
      destaque: 2,
      linhas: [
        ['1',    '1d2',  '1d3',            '1d4',  '1d6',  '1d8'],
        ['1d2',  '1d3',  '1d4',            '1d6',  '1d8',  '1d10'],
        ['1d3',  '1d4',  '1d6',            '1d8',  '1d10', '1d12'],
        ['1d4',  '1d6',  '1d8 (ou 2d4)',   '1d10', '1d12', '3d6'],
        ['1d6',  '1d8',  '1d10',           '1d12', '3d6',  '4d6'],
        ['1d8',  '1d10', '1d12 (2d6/3d4)', '3d6',  '4d6',  '4d8'],
        ['1d10', '2d6',  '2d8',            '3d8',  '4d8',  '4d10'],
        ['2d6',  '2d8',  '2d10',           '3d10', '4d10', '4d12 (máx.)'],
      ],
      nota: 'Tabela 3-2 — Tormenta20, p. 117.',
    } },

  { grupo: '⚔ Armas — Regras Gerais', titulo: 'Munições',
    texto:
`Vendidas em pacotes com projéteis para 20 ataques; a munição é perdida ao atacar (acertando ou não). Pacotes podem receber melhorias e encantos como armas (mas não acumulam com a arma de disparo); o aumento de preço é METADE do de uma arma.
Tempo para recarregar, por tipo de munição:`,
    tabela: {
      cab: ['Munição', 'Arma', 'Recarregar'],
      linhas: [
        ['Balas',   'Pistola / mosquete', 'Ação padrão'],
        ['Flechas', 'Arco',               'Ação livre'],
        ['Pedras',  'Funda',              'Ação de movimento'],
        ['Virotes', 'Besta leve',         'Ação de movimento'],
        ['Virotes', 'Besta pesada',       'Ação padrão'],
      ],
    } },

  // ── ATAQUES DESARMADOS & ARMAS NATURAIS ─────────────────────────
  { grupo: '🗡 Ataques Desarmados & Armas Naturais', titulo: 'Ataque desarmado', texto:
`Um ataque desarmado é um soco, chute ou qualquer outro golpe que use seu próprio corpo. É considerado uma arma leve corpo a corpo que causa dano de impacto NÃO LETAL (1d3 pontos de dano para criaturas Pequenas e Médias) e não é afetado por efeitos que mencionem especificamente objetos ou armas empunhadas. Uma criatura só possui um único ataque desarmado (mas pode escolher qual parte do corpo utiliza cada vez que o desfere).` },

  { grupo: '🗡 Ataques Desarmados & Armas Naturais', titulo: 'Armas naturais (o que são)', texto:
`Armas naturais representam partes específicas do corpo de uma criatura usadas para desferir ataques, como chifres, garras ou uma poderosa mordida. São consideradas armas leves corpo a corpo e, assim como ataques desarmados, não são afetadas por efeitos que afetem especificamente objetos (uma arma natural não pode ser desarmada ou quebrada, por exemplo) ou armas que precisam ser empunhadas. A quantidade e o tipo de dano de cada arma natural é apresentada em sua descrição.` },

  { grupo: '🗡 Ataques Desarmados & Armas Naturais', titulo: 'Armas naturais (tipo de dano) — Tabela 2-1',
    texto: 'Tipo de dano padrão de cada arma natural, reunido por tipo. Se a descrição da criatura indicar outro tipo, ele prevalece.',
    tabela: {
      cab: ['Impacto', 'Perfuração', 'Corte'],
      linhas: [
        ['Cascos',    'Chifres', 'Garra'],
        ['Cauda',     'Ferrão',  'Pinça'],
        ['Marrada',   'Mordida', ''],
        ['Pancada',   'Presas',  ''],
        ['Tentáculo', '',        ''],
        ['Tromba',    '',        ''],
      ],
      nota: 'Tabela 2-1 — tipo de dano padrão das armas naturais (Tormenta20).',
    } },

  // ── ARMADURAS & ESCUDOS ─────────────────────────────────────────
  { grupo: '🛡 Armaduras & Escudos — Regras', titulo: 'Armaduras leves e pesadas', texto:
`Leves — tecido, couro ou peles; pouca proteção, muita mobilidade. Vestir ou remover é ação completa.
Pesadas — cota de malha ou placas. Não aplicam a Destreza na Defesa e reduzem o deslocamento em 3m. Vestir ou remover demora cinco minutos. Dormir com armadura pesada deixa fatigado pelo dia.` },

  { grupo: '🛡 Armaduras & Escudos — Regras', titulo: 'Escudos e ataque com escudo', texto:
`Há escudos leves e pesados; quem é proficiente em escudo sabe usar ambos. Colocar ou tirar um escudo é ação de movimento.
Ataque com escudo (exige proficiência em armas marciais): escudo leve causa 1d4 e pesado 1d6 (impacto, crítico x2), mas você perde o bônus de Defesa do escudo até seu próximo turno. Escudos não contam como armas.
Não proficiência: aplica a penalidade da armadura/escudo em todas as perícias baseadas em Força e Destreza.` },

  { grupo: '🛡 Armaduras & Escudos — Regras', titulo: 'Características (Bônus, Penalidade, Espaço)', texto:
`Preço — por armaduras completas; "partes" avulsas não protegem.
Bônus na Defesa — quanto mais pesada, maior. Não se veste uma armadura sobre outra nem se usa dois escudos; armadura e escudo acumulam.
Penalidade de Armadura — aplica-se em Acrobacia, Furtividade, Ladinagem e em Atletismo para natação. Penalidades de armadura e de escudo se acumulam.
Espaço — quanto a armadura/escudo ocupa na carga.` },

  // ── ALQUÍMICOS & VENENOS ────────────────────────────────────────
  { grupo: '⚗ Alquímicos & Venenos — Regras', titulo: 'Regras de venenos', texto:
`Classificados pelo método de inoculação:
• Contato — via um ataque que acerte (ou tocar o objeto envenenado). Aplicar numa arma é ação de movimento + 1d6: num resultado 1, você se envenena (exceto com o poder Venefício). Dura até acertar um ataque ou o fim da cena.
• Inalação — frascos arremessáveis (alcance curto) que liberam o veneno num cubo de 3m de lado. Prender a respiração não impede.
• Ingestão — através de comida ou bebida.
A vítima exposta faz Fortitude (CD definida pelo aplicador, atributo-chave Inteligência). Se falhar, sofre o efeito (os efeitos entre parênteses afetam quem PASSA no teste). Efeitos não-instantâneos deixam a vítima com a condição "envenenada"; curá-la encerra os efeitos do veneno (mas não recupera PV perdidos).` },

  { grupo: '⚗ Alquímicos & Venenos — Regras', titulo: 'Catalisadores', texto:
`Itens de uso único que melhoram o efeito de uma magia ao ser lançada. É preciso estar empunhando o catalisador e só se pode usar um por vez. Reduções de custo acumulam com outras; catalisadores que aumentam dano só funcionam em magias que já causem dano. CD para fabricar: 15 (exige ser treinado em Misticismo).` },

  // ── OUTROS ITENS ────────────────────────────────────────────────
  { grupo: '🎒 Outros Itens — Regras', titulo: 'Instrumentos musicais', texto:
`• Devem ser empunhados com as DUAS mãos para fornecer benefícios e usar Músicas de Bardo.
• Bardos podem usá-los como esotéricos (lançar magia com a mão que empunha o instrumento).
• Podem receber melhorias de ferramentas (contam como itens ligados a Atuação) e de esotéricos (afetando apenas magias lançadas por bardos).` },

  { grupo: '🎒 Outros Itens — Regras', titulo: 'Aparatos (engenhoqueiro)', texto:
`Modificam o funcionamento de engenhocas. Acoplado, o aparato não ocupa espaço. Cada engenhoca aceita até dois aparatos: um aumenta a CD de ativação em +2; dois aumentam em +5. Acoplar ou remover leva 1 hora de trabalho. Fabricação: Ofício (engenhoqueiro), CD 20.` },

  // ── CONDIÇÕES DE ITENS ──────────────────────────────────────────
  { grupo: '🛠 Condições de Itens', titulo: 'Avariado / Destruído / Reparar', texto:
`Algumas habilidades (sobretudo de ameaças) afetam itens:
• Avariado — avarias comprometem o uso. Arma/ferramenta: –5 nos testes em que é empregada. Armadura/escudo: –5 na Defesa. Cumulativo com outros efeitos. Avariar de novo um item já avariado o destrói.
• Destruído — o item não pode ser usado e não concede benefícios. Ocorre ao perder todos os PV ou por efeito que imponha a condição.
Reparar: um item avariado se conserta da mesma forma e com os mesmos custos de um destruído (Tormenta20 p. 121). Efeitos que consertam itens (como o aprimoramento de Transmutar Objetos) também removem essas condições.` },

  // ── ALIMENTAÇÃO & BEBIDAS ───────────────────────────────────────
  { grupo: '🍲 Alimentação & Bebidas — Regras', titulo: 'Pratos especiais', texto:
`Refeições que dão um benefício; devem ser consumidas ao serem compradas ou fabricadas. O bônus dura um dia e você só pode receber UM bônus de alimentação por dia. Fabricar: 1 hora + Ofício (cozinheiro) CD 15 (pode sofrer –5 para fazer até cinco pratos, pagando o custo de todos). Pratos divinos só podem ser preparados por devotos do respectivo deus.` },

  { grupo: '🍲 Alimentação & Bebidas — Regras', titulo: 'Bebidas e embriaguez', texto:
`Fabricar: Ofício (cozinheiro) CD 20. Consumir leva alguns minutos; o benefício dura 1 dia e acumula com outros benefícios de alimentação (incluindo de outras bebidas).
Bebida alcoólica exige Fortitude (CD indicada no item; +5 por dose adicional no mesmo dia). Falha: fica embriagado (–2 em testes de Destreza e Carisma); se já estava embriagado, fica bêbum (desprevenido, –5 em Destreza e Carisma); se já estava bêbum, cai inconsciente.
Efeitos que evitam as penalidades de bebida também anulam seus benefícios — eles andam lado a lado.` },
];
