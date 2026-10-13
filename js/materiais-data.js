// ════════════════════════════════════════════════════════════════════
//  MATERIAIS-DATA.JS — Os 14 materiais especiais dos livros
//
//  "Material especial" não é um efeito: é uma PORTA. A melhoria abre a
//  porta, e quem está do outro lado é um material — cada um com o seu
//  benefício por tipo de item, o seu preço extra e os seus limites.
//  Até aqui o sistema parava na porta: o Gerador de Recompensas rolava
//  "Material especial" e imprimia "** Mestre define o material", e a
//  aba 🔨 Criação de Itens dizia que a Tabela 3-9 não estava no
//  Regras.txt. Este arquivo é o outro lado da porta.
//
//  ── DE ONDE SAIU CADA NÚMERO ──────────────────────────────────────
//  • Tormenta20, p. 166–167 — 6 materiais e a Tabela 3-9.
//  • Ameaças de Arton, p. 399–401 — 8 materiais e a Tabela 3-4.
//  Nem o Heróis de Arton nem o Deuses de Arton acrescentam material
//  nenhum (conferido nos dois PDFs inteiros): o que eles têm são
//  melhorias e uma magia que empresta o mitral — o aprimoramento de
//  +5 PM de Mão de Mitral (Heróis, p. 255).
//
//  ⚠ AS DUAS TABELAS SÓ SE LEEM POR COORDENADAS. No `pdftotext
//  -layout` a Tabela 3-9 sai PODRE de um jeito que parece sã: a coluna
//  do Mitral é arrancada para cima, as quatro células dela aparecem
//  empilhadas na linha "Arma", e as linhas de baixo deslizam uma coluna
//  para a esquerda. Lida assim, a armadura leve de mitral custaria
//  +T$ 3.000 (é 1.500) e a pesada +T$ 18.000 (é 12.000). É a mesma
//  armadilha da Tab. 3-12 do Heróis e da Tab. 2-3 do ⚗ Criar Ameaça: o
//  jeito certo é o leitor do próprio projeto, `Inútil/_pdf.js` →
//  `textos()`, agrupando as células pelo `x` de cada coluna do
//  cabeçalho.
//
//  ── SÃO 14, NÃO 15 ────────────────────────────────────────────────
//  O mapa de `docs/melhorias-limites.md` falava em "~15" porque contava
//  a ESPADA DE CORAL como material. Ela não é: é uma cimitarra de
//  lanajuste feita pela Irmandade dos Pescadores — o mesmo material,
//  numa aplicação que custa +T$ 1.800 em vez de +T$ 600 e ainda deixa
//  a vítima sangrando no crítico. Está como observação do lanajuste.
//
//  ── QUEM PODE RECEBER MATERIAL ────────────────────────────────────
//  "Armas, armaduras, escudos e esotéricos podem ser feitos ou
//  banhados de um material especial" (T20, p. 166). FERRAMENTA e
//  VESTUÁRIO recebem outras melhorias, mas NÃO material — e é por isso
//  que `slotDoItem` devolve null para elas.
//
//  ── O QUE É CONTA NOSSA, E ESTÁ MARCADO ───────────────────────────
//  A Madeira Tollon aceita "escudos leves", e os livros nunca dizem
//  quais dos sete escudos do catálogo são leves — só os nomeiam. Então
//  `ESCUDOS_LEVES` é lido da própria linha de regra de cada um: bônus
//  de Defesa +1 (ou nenhum) e penalidade –1, que é o degrau do Escudo
//  leve do livro. Dá Escudo leve, Escudo de couro e Broquel; Escudo
//  pesado, de vime, torre e Sagna ficam fora. É a mesma política dos
//  quadrados — quando o livro não imprime, a conta é nossa e vem
//  escrita.
// ════════════════════════════════════════════════════════════════════
window.GA_MATERIAIS = (function () {
  'use strict';

  /* ── Os cinco "lugares" em que um material pode entrar ────────────
     São as cinco linhas das duas tabelas de preço. A Defesa quase não
     distingue escudo de armadura leve (os dois sempre levam o degrau de
     baixo), mas o PREÇO distingue — e a Madeira Tollon só entra em
     escudo, nunca em armadura. */
  const SLOTS = ['arma', 'armaduraLeve', 'armaduraPesada', 'escudo', 'esoterico'];

  const SLOT_ROTULO = {
    arma:           'Arma',
    armaduraLeve:   'Armadura leve',
    armaduraPesada: 'Armadura pesada',
    escudo:         'Escudo',
    esoterico:      'Esotérico',
  };

  // Lista FECHADA da Madeira Tollon: "Apenas armas de madeira — arcos,
  // bordões, clavas, lanças, piques e tacapes" (T20, p. 167). O livro dá
  // as seis famílias no plural, então entram as variantes de cada uma
  // que o catálogo da Loja tem. A "Lança de fogo" NÃO entra: apesar do
  // nome, é arma de fogo (pólvora), não uma lança de madeira.
  const ARMAS_MADEIRA = [
    'Arco curto', 'Arco longo', 'Arco de guerra', 'Arco montado',
    'Bordão',
    'Clava', 'Clava-grão',
    'Lança', 'Lança de falange', 'Lança de justa', 'Lança montada',
    'Pique',
    'Tacape',
  ];

  // Escudos leves — ver a nota do cabeçalho: é leitura nossa da linha de
  // regra, porque o livro não classifica os escudos dos suplementos.
  const ESCUDOS_LEVES = ['Escudo leve', 'Escudo de couro', 'Broquel'];

  /* ══════════════════════════════════════════════════════════════════
     OS 14 MATERIAIS

     Cada material tem um objeto `slots`. A chave existe quando o livro
     dá aquela linha ao material — e a AUSÊNCIA é regra: o couro de
     bulette não tem `arma` nem `escudo` porque o verbete dele só traz
     "Armadura" e "Esotérico", e a madeira Tollon não tem as duas
     armaduras porque a Tabela 3-9 imprime "—" nas duas.

     Em cada slot:
       preco  → o preço extra em T$, ou null quando o material não é
                vendido ("Materiais não listados são raros e não são
                encontrados à venda", Ameaças, nota da Tab. 3-4)
       pecas  → quantas peças do monstro a fabricação exige (só os do
                Ameaças têm; os do T20 se compram por T$)
       efeito → o benefício, como o livro escreve
       so     → restrição EXTRA dentro do slot (ver `cabeNoItem`)
     ══════════════════════════════════════════════════════════════════ */
  const MATERIAIS = [

    // ── Tormenta20, p. 166–167 ───────────────────────────────────────
    {
      nome: 'Aço-rubi', livro: 'Tormenta20', pag: 166, venda: true,
      lore: 'Este metal tem a aparência de vidro avermelhado, mas é duro como aço. Caríssimo e comercializado apenas por uma guilda de ferreiros de Doherimm, que mantêm sua origem em segredo — suspeita-se de que seja minerado das profundezas de uma área de Tormenta.',
      slots: {
        arma:           { preco: 6000,  efeito: 'Ignora 10 pontos de redução de dano e a imunidade a crítico de lefeu.' },
        armaduraLeve:   { preco: 3000,  efeito: '25% de chance (1 em 1d4) de ignorar o dano extra de acertos críticos e ataques furtivos.' },
        armaduraPesada: { preco: 6000,  efeito: '50% de chance (qualquer valor par em qualquer dado) de ignorar o dano extra de acertos críticos e ataques furtivos.' },
        escudo:         { preco: 3000,  efeito: '25% de chance (1 em 1d4) de ignorar o dano extra de acertos críticos e ataques furtivos — cumulativa com a da armadura.' },
        esoterico:      { preco: 6000,  efeito: 'Suas magias que causam dano ignoram 10 pontos de redução de dano e as imunidades a dano de lefeu.' },
      },
    },
    {
      nome: 'Adamante', livro: 'Tormenta20', pag: 166, venda: true,
      lore: 'Encontrado apenas em meteoritos — e por isso também chamado de "ferro-meteórico" —, o adamante é um metal escuro, fosco e mais denso que o aço.',
      slots: {
        arma:           { preco: 3000,  efeito: 'Aumenta o dano em um passo.' },
        armaduraLeve:   { preco: 6000,  efeito: 'Fornece RD 2.' },
        armaduraPesada: { preco: 18000, efeito: 'Fornece RD 5.' },
        escudo:         { preco: 6000,  efeito: 'Fornece RD 2.' },
        esoterico:      { preco: 3000,  efeito: 'Ao lançar uma magia que causa dano, você pode pagar +1 PM para rolar novamente qualquer resultado 1 na rolagem de dano dela.' },
      },
    },
    {
      nome: 'Gelo eterno', livro: 'Tormenta20', pag: 166, venda: true,
      lore: 'As gélidas Montanhas Uivantes produzem gelo que nunca derrete. Expedições de aventureiros exploram essa região glacial perigosa à caça deste material fantástico.',
      slots: {
        arma:           { preco: 600,   efeito: 'Causa +2 pontos de dano de frio.' },
        armaduraLeve:   { preco: 1500,  efeito: 'Fornece redução de fogo 5.' },
        armaduraPesada: { preco: 3000,  efeito: 'Fornece redução de fogo 10.' },
        escudo:         { preco: 1500,  efeito: 'Fornece redução de fogo 5.' },
        esoterico:      { preco: 3000,  efeito: 'Ao lançar uma magia de frio que causa dano, você pode rolar novamente qualquer resultado 1 na rolagem de dano dela.' },
      },
    },
    {
      nome: 'Madeira Tollon', livro: 'Tormenta20', pag: 167, venda: true,
      lore: 'A Floresta de Tollon produz um tipo de madeira negra, dura como aço e dotada de propriedades mágicas.',
      obs: 'Apenas armas de madeira (arcos, bordões, clavas, lanças, piques e tacapes), escudos leves e esotéricos. A Tabela 3-9 marca "—" nas duas linhas de armadura.',
      slots: {
        arma:      { preco: 1500, so: 'madeiraTollon', efeito: 'Conta como mágica para vencer redução de dano. Habilidades ativadas ao fazer um ataque ou usar a ação agredir têm o custo reduzido em –1 PM.' },
        escudo:    { preco: 1500, so: 'escudoLeve',    efeito: 'Fornece resistência a magia +2.' },
        esoterico: { preco: 1500,                      efeito: 'Fornece resistência a magia +2.' },
      },
    },
    {
      nome: 'Matéria vermelha', livro: 'Tormenta20', pag: 167, venda: true,
      lore: 'Qualquer material de origem lefeu — garras, carapaças, minérios e partes de estruturas de áreas de Tormenta — apresenta propriedades parecidas, conhecidas como "matéria vermelha".',
      obs: 'O item impõe ao usuário –2 em perícias baseadas em Carisma (exceto Intimidação). Lefou e lefeu são imunes ao dano extra e à perda de vida da arma, e lefeu ignoram a chance de falha da armadura.',
      slots: {
        arma:           { preco: 1500,  efeito: 'Causa +1d6 de dano extra. Porém, sempre que você acerta um ataque com ela, perde 1 ponto de vida.' },
        armaduraLeve:   { preco: 6000,  efeito: 'Fornece 10% de chance de falha para cada ataque contra você.' },
        armaduraPesada: { preco: 18000, efeito: 'Fornece 25% de chance de falha para cada ataque contra você.' },
        escudo:         { preco: 6000,  efeito: 'Fornece 10% de chance de falha para cada ataque contra você — cumulativa com a da armadura.' },
        esoterico:      { preco: 3000,  efeito: 'Você e todos os seus inimigos em alcance curto sofrem –2 em testes de resistência contra efeitos mágicos.' },
      },
    },
    {
      nome: 'Mitral', livro: 'Tormenta20', pag: 167, venda: true,
      lore: 'Metal raro e valioso, o mitral é prateado, brilhante e mais leve que o aço.',
      obs: 'Itens de mitral ocupam –1 espaço (mínimo 1).',
      slots: {
        arma:           { preco: 1500,  efeito: 'Aumenta a margem de ameaça em 1 (uma espada longa de mitral tem margem 18-20).' },
        armaduraLeve:   { preco: 1500,  efeito: 'Tem a penalidade de armadura diminuída em 2.' },
        armaduraPesada: { preco: 12000, efeito: 'Tem a penalidade de armadura diminuída em 2 e permite aplicar até dois pontos de Destreza na Defesa.' },
        escudo:         { preco: 1500,  efeito: 'Tem a penalidade de armadura diminuída em 2.' },
        esoterico:      { preco: 3000,  efeito: 'Permite que você pague +2 PM ao lançar uma magia para aumentar a CD dela em +2.' },
      },
    },

    // ── Ameaças de Arton, p. 399–401 ─────────────────────────────────
    {
      nome: 'Casco de monstro', livro: 'Ameaças de Arton', pag: 399, venda: true,
      lore: 'Os cascos protetores de certos monstros podem substituir aço e outros materiais rígidos.',
      obs: 'Frágil: ao sofrer dano de impacto, um item mundano de casco de monstro sofre 1 ponto a mais por dado de dano.',
      slots: {
        arma:           { preco: 750,   efeito: 'Conta como uma arma primitiva para a magia Armamento da Natureza e efeitos semelhantes.' },
        armaduraLeve:   { preco: 750,   efeito: 'Tem a penalidade de armadura diminuída em 1.' },
        armaduraPesada: { preco: 6000,  efeito: 'Tem a penalidade de armadura diminuída em 1 e permite aplicar 1 ponto de Destreza na Defesa.' },
        escudo:         { preco: 750,   efeito: 'Tem a penalidade de armadura diminuída em 1.' },
        esoterico:      { preco: 6000,  efeito: 'Quando lança uma magia, você recebe redução de dano 5 contra o próximo dano que sofrer até sua próxima rodada.' },
      },
    },
    {
      nome: 'Couraça de kaiju', livro: 'Ameaças de Arton', pag: 399, venda: false,
      lore: 'Ainda mais raro que couro dracônico, pode ser empregado para fabricar itens superiores de grande poder. Jamais encontrado à venda, sendo obtido apenas a partir de um kaiju abatido.',
      slots: {
        arma:           { preco: null, pecas: 1, efeito: 'O dano aumenta um passo. Além disso, quando faz um ataque, se o alvo usar um efeito que reduz o dano desse ataque (como Durão ou Escamas Supremas), você pode gastar 2 PM para ignorar o efeito — o que não se aplica a redução de dano.' },
        armaduraLeve:   { preco: null, pecas: 1, efeito: 'Fornece RD 10/mágico.' },
        armaduraPesada: { preco: null, pecas: 3, efeito: 'Fornece RD 20/mágico.' },
        escudo:         { preco: null, pecas: 1, efeito: 'Fornece RD 10/mágico.' },
        esoterico:      { preco: null, pecas: 1, efeito: 'Ao lançar uma magia que causa dano, você pode gastar 2 PM para ignorar efeitos dos alvos que reduzem o dano dessa magia, como Durão ou Evasão (exceto redução de dano e o efeito de passar no teste de resistência).' },
      },
    },
    {
      nome: 'Couro de bulette', livro: 'Ameaças de Arton', pag: 399, venda: false,
      lore: 'Este couro raramente é encontrado à venda; quando não é curtido e tratado logo após a extração, perde suas qualidades especiais.',
      obs: 'O verbete só traz as linhas "Armadura" e "Esotérico": couro de bulette NÃO vai em arma nem em escudo.',
      slots: {
        armaduraLeve:   { preco: null, pecas: 1, efeito: 'Fornece deslocamento de escavação igual à metade do seu deslocamento normal e redução de ácido 5.' },
        armaduraPesada: { preco: null, pecas: 3, efeito: 'Fornece deslocamento de escavação igual à metade do seu deslocamento normal e redução de ácido 10.' },
        esoterico:      { preco: null, pecas: 1, efeito: 'Ao lançar uma magia de ácido que causa dano, você pode rolar novamente qualquer resultado 1 nas rolagens de dano, mesmo em rodadas subsequentes.' },
      },
    },
    {
      nome: 'Cristal de sol', livro: 'Ameaças de Arton', pag: 400, venda: false,
      lore: 'Utilizados pelos ursos das neves para armazenar calor, estes cristais perdem suas propriedades em algumas semanas quando não utilizados, tornando difícil encontrá-los à venda.',
      slots: {
        arma:           { preco: null, pecas: 1, so: 'corteOuPerfuracao', efeito: 'Causa +2 pontos de dano de fogo. Só pode ser aplicado a armas de corte ou perfuração.' },
        armaduraLeve:   { preco: null, pecas: 1, efeito: 'Ao fazer um teste de resistência contra um efeito de frio, você pode rolar dois dados e usar o melhor resultado.' },
        armaduraPesada: { preco: null, pecas: 1, efeito: 'Ao fazer um teste de resistência contra um efeito de frio, você pode rolar dois dados e usar o melhor resultado.' },
        escudo:         { preco: null, pecas: 1, efeito: 'Ao fazer um teste de resistência contra um efeito de frio, você pode rolar dois dados e usar o melhor resultado.' },
        esoterico:      { preco: null, pecas: 1, efeito: 'Ao lançar uma magia de fogo, você pode gastar 1 PM; se fizer isso, criaturas que falharem no teste de resistência contra a magia ficam em chamas (se a magia já deixa a vítima em chamas, em vez disso o dano das chamas aumenta em +1d6 cumulativo).' },
      },
    },
    {
      nome: 'Lanajuste', livro: 'Ameaças de Arton', pag: 400, venda: true,
      lore: 'Também chamado de coral-de-ferro, é encontrado em paredões afiados banhados pelo mar em Khubar. Mais conhecido por seu uso em lâminas afiadas, também é empregado em outros itens.',
      obs: 'ESPADA DE CORAL: uma cimitarra de lanajuste feita pela técnica secreta da Irmandade dos Pescadores também deixa a vítima sangrando em um acerto crítico. Aplicado desta forma, o material custa +T$ 1.800 em vez de +T$ 600.',
      slots: {
        arma:           { preco: 600,   efeito: 'Ataques com a arma ignoram penalidades por combate submerso. Além disso, ela pode ser utilizada por devotos do Oceano sem violar suas obrigações e restrições.' },
        armaduraLeve:   { preco: 1500,  efeito: 'Fornece redução de corte 5.' },
        armaduraPesada: { preco: 3000,  efeito: 'Fornece redução de corte 10.' },
        escudo:         { preco: 1500,  efeito: 'Fornece redução de corte 5.' },
        esoterico:      { preco: 3000,  efeito: 'Ao lançar uma magia que causa dano de corte, você pode rolar novamente qualquer resultado 1 na rolagem de dano.' },
      },
    },
    {
      nome: 'Pena de kraken', livro: 'Ameaças de Arton', pag: 400, venda: false,
      lore: 'Material vítreo extraído da concha interna de um kraken, extremamente afiado. Em estado bruto é quebradiço e difícil de transportar sem equipamento adequado, sendo raramente encontrado à venda.',
      slots: {
        arma:           { preco: null, pecas: 1, efeito: 'Quando você faz um acerto crítico, o dano aumenta dois passos (antes de ser multiplicado).' },
        armaduraLeve:   { preco: null, pecas: 1, efeito: 'Quando uma criatura erra um ataque corpo a corpo contra você, perde 5 pontos de vida.' },
        armaduraPesada: { preco: null, pecas: 3, efeito: 'Quando uma criatura erra um ataque corpo a corpo contra você, perde 10 pontos de vida.' },
        escudo:         { preco: null, pecas: 1, efeito: 'Quando uma criatura erra um ataque corpo a corpo contra você, perde 5 pontos de vida.' },
        esoterico:      { preco: null, pecas: 1, efeito: 'Se o item fornece algum bônus numérico, ele aumenta em +1.' },
      },
    },
    {
      nome: 'Prata', livro: 'Ameaças de Arton', pag: 400, venda: true,
      lore: 'Embora seja muito maleável, a prata pode ser usada para revestir objetos e conceder propriedades quase mágicas.',
      obs: 'Por ser usada como revestimento, a prata pode ser combinada com um segundo material especial — cada um contando como uma melhoria separada.',
      slots: {
        arma:           { preco: 600,   efeito: 'Causa +2 pontos de dano em espíritos e mortos-vivos e é considerada mágica para atacar essas criaturas.' },
        armaduraLeve:   { preco: 1500,  efeito: 'Fornece RD 5 contra o dano causado por espíritos e mortos-vivos.' },
        armaduraPesada: { preco: 3000,  efeito: 'Fornece RD 10 contra o dano causado por espíritos e mortos-vivos.' },
        escudo:         { preco: 1500,  efeito: 'Fornece RD 5 contra o dano causado por espíritos e mortos-vivos.' },
        esoterico:      { preco: 400,   efeito: 'Suas magias causam +2 pontos de dano em espíritos e mortos-vivos.' },
      },
    },
    {
      nome: 'Quitina razza', livro: 'Ameaças de Arton', pag: 401, venda: false,
      lore: 'Cobiçada por caçadores de monstros, que a consideram um grande troféu, esta quitina raramente é encontrada à venda: a única forma de obter o material é abater um razza’kham.',
      slots: {
        arma:           { preco: null, pecas: 1, efeito: 'Sempre que rolar o resultado máximo em um dado do dano básico da arma, role um dado extra, repetindo o processo a cada resultado máximo.' },
        armaduraLeve:   { preco: null, pecas: 1, efeito: 'Concede +2 em Percepção e seu bônus na Defesa aumenta em 1.' },
        armaduraPesada: { preco: null, pecas: 3, efeito: 'Concede +5 em Percepção e seu bônus na Defesa aumenta em 2.' },
        escudo:         { preco: null, pecas: 1, efeito: 'Concede +2 em Percepção e seu bônus na Defesa aumenta em 1.' },
        esoterico:      { preco: null, pecas: 1, efeito: 'Sempre que rolar o resultado máximo em um dado do dano básico da magia (sem contar aprimoramentos e outros efeitos), role um dado extra, repetindo o processo a cada resultado máximo.' },
      },
    },
  ];

  /* ── Em que SLOT este item cai? ───────────────────────────────────
     Recebe o nome e os atributos do catálogo da Loja (o mesmo `st` que
     o Gerador de Recompensas usa para as restrições de melhoria).
     Devolve null para ferramenta, vestuário, instrumento, alquímico e
     tudo o mais: o livro não deixa material especial sair da lista de
     arma, armadura, escudo e esotérico. */
  function slotDoItem(nome, st) {
    if (!st) return null;
    const c = String(st.categoria || '');
    if (/^Corpo a Corpo|^Ataque à Distância/.test(c)) return 'arma';
    if (c === 'Armaduras Leves')   return 'armaduraLeve';
    if (c === 'Armaduras Pesadas') return 'armaduraPesada';
    if (c === 'Escudos')           return 'escudo';
    if (c === 'Esotéricos')        return 'esoterico';
    return null;
  }

  // As três restrições EXTRA, dentro de um slot que o material já aceita.
  const RESTRICAO = {
    madeiraTollon:     (nome)     => ARMAS_MADEIRA.indexOf(nome) >= 0,
    escudoLeve:        (nome)     => ESCUDOS_LEVES.indexOf(nome) >= 0,
    corteOuPerfuracao: (nome, st) => /corte|perfura/i.test((st && st.tipo) || ''),
  };

  const RESTRICAO_ROTULO = {
    madeiraTollon:     'Só armas de madeira (arcos, bordões, clavas, lanças, piques e tacapes)',
    escudoLeve:        'Só escudos leves',
    corteOuPerfuracao: 'Só armas de corte ou perfuração',
  };

  // O material `mat` cabe neste item? Precisa ter a linha do slot E
  // passar na restrição extra dela, se houver.
  function cabeNoItem(mat, slot, nome, st) {
    const s = mat && mat.slots && mat.slots[slot];
    if (!s) return false;
    if (!s.so) return true;
    const teste = RESTRICAO[s.so];
    return teste ? !!teste(nome, st) : true;
  }

  /* Todos os materiais que cabem neste item, na ordem em que estão aqui
     (T20 primeiro, depois Ameaças — a ordem dos livros).
       opts.raros === false → só os que o livro vende, isto é, os que têm
       preço numa das duas tabelas. */
  function queCabem(nome, st, opts) {
    const slot = slotDoItem(nome, st);
    if (!slot) return [];
    const soVendidos = opts && opts.raros === false;
    return MATERIAIS.filter(m => cabeNoItem(m, slot, nome, st) &&
                                 (!soVendidos || m.venda));
  }

  function porNome(nome) {
    const n = String(nome || '').toLowerCase();
    return MATERIAIS.find(m => m.nome.toLowerCase() === n) || null;
  }

  /* ── Descrições para o "📖 Descrição" ─────────────────────────────
     Uma entrada por material, com a chave normalizada do
     ItensDescricoes (minúscula, sem acento). O texto é o lore do livro
     + o benefício de cada slot + o preço — a mesma ficha que o card do
     Gerador de Recompensas mostra, para quem só tem a caixa de texto. */
  function fmtT$(n) { return Number(n).toLocaleString('pt-BR'); }

  function fichaDeTexto(m) {
    const linhas = [m.lore];
    for (const slot of SLOTS) {
      const s = m.slots[slot];
      if (!s) continue;
      const extras = [];
      if (s.preco != null) extras.push('+T$ ' + fmtT$(s.preco));
      if (s.pecas) extras.push(s.pecas === 1 ? 'exige 1 peça' : 'exige ' + s.pecas + ' peças');
      linhas.push('• ' + SLOT_ROTULO[slot] + (extras.length ? ' (' + extras.join(', ') + ')' : '') +
                  ': ' + s.efeito);
    }
    const faltam = SLOTS.filter(s => !m.slots[s]).map(s => SLOT_ROTULO[s]);
    if (faltam.length) linhas.push('Não pode ser aplicado em: ' + faltam.join(', ') + '.');
    // "não se encontra" e não "não é encontrado": metade dos cinco raros
    // tem nome feminino (couraça, pena, quitina).
    if (!m.venda) linhas.push('Não se encontra à venda: só se obtém abatendo a criatura e extraindo o material.');
    if (m.obs) linhas.push(m.obs);
    linhas.push('Fonte: ' + m.livro + ', p. ' + m.pag + '.');
    return linhas.join('\n');
  }

  function semAcento(s) {
    return String(s).normalize('NFD').replace(/\p{M}/gu, '').toLowerCase().trim();
  }

  const DESCRICOES = {};
  for (const m of MATERIAIS) DESCRICOES[semAcento(m.nome)] = fichaDeTexto(m);

  /* ── As duas tabelas de preço, prontas para desenhar ──────────────
     Linhas = os cinco slots; colunas = os materiais do livro pedido.
     "—" onde o material não tem aquela linha; "peças" no lugar do preço
     quando o material não é vendido. */
  function tabelaDePrecos(livro) {
    const mats = MATERIAIS.filter(m => m.livro === livro);
    const cab  = ['Item'].concat(mats.map(m => m.nome));
    const linhas = SLOTS.map(slot => [SLOT_ROTULO[slot]].concat(mats.map(m => {
      const s = m.slots[slot];
      if (!s) return '—';
      if (s.preco != null) return '+ T$ ' + fmtT$(s.preco);
      return s.pecas === 1 ? '1 peça' : s.pecas + ' peças';
    })));
    return { cab, linhas };
  }

  return {
    MATERIAIS, SLOTS, SLOT_ROTULO, ARMAS_MADEIRA, ESCUDOS_LEVES,
    RESTRICAO_ROTULO, DESCRICOES,
    slotDoItem, cabeNoItem, queCabem, porNome, fichaDeTexto, tabelaDePrecos,
  };
})();
