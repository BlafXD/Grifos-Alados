// ════════════════════════════════════════════════════════════════════
//  FICHA-GERADOR.JS — o "🎲 Sortear ficha": uma ficha inteira ao acaso
//  Localização: /grifos-alados/js/ficha-gerador.js
//
//  Pedido dele (05/11/2026): "Gerador randômico de fichas aleatórias,
//  absolutamente TUDO!" — raça, classe, deus (com Fundamentalista),
//  poderes de toda espécie, magias e equipamento com melhorias até o
//  teto de dinheiro do nível. Feito em PARTES, cada uma fechando sozinha.
//
//  ESTA É A PARTE 1 — A IDENTIDADE. Sorteia e já deixa pronto:
//    • nível (escolhido ou ao acaso);
//    • atributos pela Tabela 1-1 (p. 17): método "Pontos" (todos em 0,
//      10 pontos; +1=1, +2=2, +3=4, +4=7; pode baixar UM a −1 por +1
//      ponto). Com peso no atributo-chave da classe, como o livro aconselha
//      ("prefira uma raça que forneça um bônus no atributo principal");
//    • raça (bônus de atributo + tamanho + deslocamento + o card de
//      habilidades no bloco ✨ Poderes);
//    • classe (perícias treinadas da classe + as extras de Inteligência,
//      proficiências, e o Caminho/Linhagem do arcanista/feiticeiro);
//    • origem do núcleo (perícias e poder, 2 benefícios ao acaso);
//    • um nome, para a ficha não nascer "(sem nome)".
//  PV, PM, Defesa, perícias e as habilidades fixas de classe saem sozinhos
//  da própria ficha (ela já computa por classe+nível+atributos).
//
//  A PARTE 1 PARA AQUI, DE PROPÓSITO. Ficam para as próximas levas:
//    P2 divindade (deus/sem deus, Fundamentalista +1, poderes concedidos);
//    P3 poderes (geral/combate/destino/magia/tormenta/raça + de classe);
//    P4 magias (se conjurador, por círculo/nível);
//    P5 equipamento (riqueza por nível do PDF + itens + melhorias até o teto).
//
//  POR QUE UM MÓDULO À PARTE, E NÃO DENTRO DO ficha.js. O gerador precisa
//  de uma CAMADA DE REGRAS que a ficha não tem: a ficha MOSTRA a raça e
//  deixa o jogador digitar o atributo ("conta e mostra, não policia"); o
//  gerador PRECISA saber que anão é Con +2/Sab +1/Des −1 para preencher
//  sozinho. Esse saber (mods raciais, perfil de atributo por classe) mora
//  aqui, longe da ficha, e alimenta o motor pelos globais já carregados
//  (window.GA_FichaData, GA_PODERES, GA_ORIGENS).
//
//  A ficha nasce pela mesma porta da ＋ Nova ficha: GA_Ficha.criarEabrir
//  (ficha.js) faz normalizar → push → abrir → salvar → render. Nasce SEM
//  campanha, como toda ficha nova (decisão de 04/11/2026).
//
//  Carregado no index.html depois do ficha.js. Só age ao clique no botão
//  🎲 Sortear ficha do Lobby (🗂 Minhas fichas) — data-acao="sortear".
// ════════════════════════════════════════════════════════════════════
window.GA_FichaGerador = (function () {
  'use strict';

  const esc = window.GA_esc || (s => String(s == null ? '' : s));
  const D = () => window.GA_FichaData;          // carregado antes; lido tarde por segurança
  const PODERES = () => window.GA_PODERES || [];
  const ORIGENS = () => window.GA_ORIGENS || [];
  const DEUSES = () => (window.GA_DEVOTOS && window.GA_DEVOTOS.deuses) || [];
  const semAc = s => (window.GA_semAcento ? window.GA_semAcento(s) : String(s || '').toLowerCase());

  const ATRS = ['for', 'des', 'con', 'int', 'sab', 'car'];

  // ── Sorteio: os tijolos ─────────────────────────────────────────
  const rand = n => Math.floor(Math.random() * n);          // 0..n-1
  const pick = arr => arr[rand(arr.length)];
  const chance = p => Math.random() < p;
  function embaralhar(arr) {                                 // Fisher-Yates
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = rand(i + 1); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }
  // escolhe `n` distintos de `de`, preferindo a ordem dada (os primeiros
  // itens têm prioridade), pulando o que `evitar` reprova
  function pegarN(de, n, evitar) {
    const saida = [];
    for (const x of de) {
      if (saida.length >= n) break;
      if (evitar && evitar(x)) continue;
      if (saida.indexOf(x) < 0) saida.push(x);
    }
    return saida;
  }

  // ════════════════════════════════════════════════════════════════
  //  CAMADA DE REGRAS — ATRIBUTOS
  // ════════════════════════════════════════════════════════════════

  //  Statlines legais do método Pontos (p. 17). Cada um é a MATRIZ de
  //  seis modificadores já pronta; todos cabem em 10 pontos (um −1 rende
  //  o 11º ponto). São vários para o personagem não sair sempre igual.
  //  Custos: +1=1, +2=2, +3=4, +4=7.
  const MATRIZES = [
    [4, 2, 1, 0, 0, 0],   // 7+2+1 = 10
    [4, 1, 1, 1, 0, 0],   // 7+1+1+1 = 10
    [3, 3, 1, 1, 0, 0],   // 4+4+1+1 = 10
    [3, 2, 2, 1, 0, 0],   // 4+2+2+1 = 9
    [3, 3, 2, 0, 0, 0],   // 4+4+2 = 10
    [2, 2, 2, 1, 1, 0],   // 2+2+2+1+1 = 8
    [4, 2, 2, 0, 0, -1],  // 7+2+2 = 11 (o −1 paga o 11º)
    [4, 3, 0, 0, 0, -1],  // 7+4 = 11
    [4, 2, 1, 1, 0, -1],  // 7+2+1+1 = 11
  ];

  //  Perfil de cada CLASSE BÁSICA: em que atributos ela quer gastar os
  //  pontos. `prim` é o principal (leva o maior número; se houver dois, um
  //  é sorteado); `sec` são os secundários, na ordem; `dump` é onde cai o
  //  −1 quando a matriz tem um. A variante herda o perfil da básica
  //  (D.basicaDe). O arcanista é à parte: o principal é o atributo do
  //  Caminho (Int do bruxo/mago, Car do feiticeiro), decidido na hora.
  const PERFIL = {
    barbaro:   { prim: ['for'],         sec: ['con', 'des'], dump: ['int'] },
    bardo:     { prim: ['car'],         sec: ['des', 'con'], dump: ['for'] },
    bucaneiro: { prim: ['des'],         sec: ['car', 'con'], dump: ['int'] },
    cacador:   { prim: ['des', 'for'],  sec: ['con', 'sab'], dump: ['car'] },
    cavaleiro: { prim: ['for'],         sec: ['con', 'car'], dump: ['int'] },
    clerigo:   { prim: ['sab'],         sec: ['con', 'car'], dump: ['des'] },
    druida:    { prim: ['sab'],         sec: ['con', 'des'], dump: ['car'] },
    frade:     { prim: ['sab'],         sec: ['con', 'for'], dump: ['des'] },
    guerreiro: { prim: ['for', 'des'],  sec: ['con'],        dump: ['car'] },
    inventor:  { prim: ['int'],         sec: ['des', 'con'], dump: ['for'] },
    ladino:    { prim: ['des'],         sec: ['int', 'con'], dump: ['sab'] },
    lutador:   { prim: ['for', 'des'],  sec: ['con'],        dump: ['int'] },
    nobre:     { prim: ['car'],         sec: ['con', 'int'], dump: ['for'] },
    paladino:  { prim: ['for', 'car'],  sec: ['con'],        dump: ['int'] },
    treinador: { prim: ['car'],         sec: ['con', 'des'], dump: ['int'] },
    // arcanista: preenchido na hora com o atributo do Caminho
  };

  //  O atributo das CDs (magia e habilidade) por classe básica. Quem não
  //  está aqui não é conjurador do núcleo: cai no atributo principal do
  //  perfil (um padrão razoável, editável). Variantes com chave própria
  //  (necromante, usurpador…) são resolvidas em cdDaClasse().
  const CDATTR = { clerigo: 'sab', druida: 'sab', frade: 'sab', bardo: 'car', paladino: 'car' };

  // ════════════════════════════════════════════════════════════════
  //  CAMADA DE REGRAS — RAÇAS
  //  Lido do texto de cada raça em GA_PODERES (05/11/2026). Só os NÚMEROS
  //  ficam aqui; o texto de habilidades vem do próprio card (ver addRaca).
  //    mods      bônus/penalidade fixos de atributo
  //    escolha   escolhas de atributo ("+1 em três diferentes"): cada uma
  //              {q (quantos), v (valor), exceto:[...], distintos:true} ou
  //              {oneof:[...]} (uma das formas, sorteada)
  //    variantes quando a raça tem duas formas com atributos diferentes
  //              (Suraggel aggelus/sulfure, Nagah macho/fêmea) — sorteia uma
  //    tamanho   só quando não é Médio
  //    desloc    só quando não é 9 m
  //  MOREAU fica FORA do sorteio: os atributos dele saem da herança animal
  //  (um sub-card de escolha), e isso entra numa leva à parte.
  const RACAS = {
    // ── Tormenta20 Jogo do Ano (núcleo) ──
    'raca-humano':        { escolha: [{ q: 3, v: 1, distintos: true }] },
    'raca-anao':          { mods: { con: 2, sab: 1, des: -1 }, desloc: 6 },
    'raca-dahllan':       { mods: { sab: 2, des: 1, int: -1 } },
    'raca-elfo':          { mods: { int: 2, des: 1, con: -1 }, desloc: 12 },
    'raca-goblin':        { mods: { des: 2, int: 1, car: -1 }, tamanho: 'Pequeno' },
    'raca-lefou':         { mods: { car: -1 }, escolha: [{ q: 3, v: 1, exceto: ['car'], distintos: true }] },
    'raca-minotauro':     { mods: { for: 2, con: 1, sab: -1 } },
    'raca-qareen':        { mods: { car: 2, int: 1, sab: -1 } },
    'raca-golem':         { mods: { for: 2, con: 1, car: -1 }, desloc: 6 },
    'raca-hynne':         { mods: { des: 2, car: 1, for: -1 }, tamanho: 'Pequeno', desloc: 6 },
    'raca-kliren':        { mods: { int: 2, car: 1, for: -1 } },
    'raca-medusa':        { mods: { des: 2, car: 1 } },
    'raca-osteon':        { mods: { con: -1 }, escolha: [{ q: 3, v: 1, exceto: ['con'], distintos: true }] },
    'raca-sereia-tritao': { escolha: [{ q: 3, v: 1, distintos: true }] },
    'raca-silfide':       { mods: { car: 2, des: 1, for: -2 }, tamanho: 'Minúsculo' },
    'raca-suraggel':      { variantes: [{ nome: 'Aggelus', mods: { sab: 2, car: 1 } }, { nome: 'Sulfure', mods: { des: 2, int: 1 } }] },
    'raca-trog':          { mods: { con: 2, for: 1, int: -1 } },
    // ── Ameaças de Arton ──
    'raca-meio-orc':      { mods: { for: 2 }, escolha: [{ q: 1, v: 1, exceto: ['car', 'for'] }] },
    'raca-orc':           { mods: { for: 2, con: 1, int: -1 } },
    'raca-tabrachi':      { mods: { con: 2, for: 1, car: -1 } },
    'raca-ogro':          { mods: { for: 3, con: 2, int: -1, car: -1 }, tamanho: 'Grande' },
    'raca-bugbear':       { mods: { for: 2, des: 1, car: -1 } },
    'raca-hobgoblin':     { mods: { con: 2, des: 1, car: -1 } },
    'raca-centauro':      { mods: { sab: 2, for: 1, int: -1 }, tamanho: 'Grande', desloc: 12 },
    'raca-gnoll':         { mods: { con: 2, sab: 1, int: -1 } },
    'raca-kallyanach':    { escolha: [{ oneof: [{ q: 1, v: 2 }, { q: 2, v: 1, distintos: true }] }] },
    'raca-kaijin':        { mods: { for: 2, con: 1, car: -2 } },
    'raca-kappa':         { mods: { des: 2, con: 1, car: -1 } },
    'raca-mashin':        { escolha: [{ q: 2, v: 1, distintos: true }] },
    'raca-nezumi':        { mods: { con: 2, des: 1, int: -1 }, tamanho: 'Pequeno' },
    'raca-tengu':         { mods: { des: 2, int: 1 } },
    'raca-minauro':       { mods: { for: 1 }, escolha: [{ q: 2, v: 1, distintos: true }] },
    'raca-kobolds':       { mods: { des: 2, for: -1 } },
    'raca-harpia':        { mods: { des: 2, car: 1, int: -1 } },
    'raca-ceratops':      { mods: { con: 2, for: 1, des: -1, int: -1 }, tamanho: 'Grande' },
    'raca-pteros':        { mods: { sab: 2, des: 1, int: -1 } },
    'raca-velocis':       { mods: { des: 2, sab: 1, int: -1 } },
    'raca-voracis':       { mods: { des: 2, con: 1, int: -1 } },
    'raca-yidishan':      { mods: { car: -2 }, escolha: [{ q: 3, v: 1, exceto: ['car'], distintos: true }] },
    'raca-elfo-do-mar':   { mods: { des: 2, con: 1, int: -1 } },
    'raca-nagah':         { variantes: [{ nome: 'macho', mods: { for: 1, des: 1, con: 1 } }, { nome: 'fêmea', mods: { int: 1, sab: 1, car: 1 } }] },
    'raca-finntroll':     { mods: { int: 2, con: 1, for: -1 } },
    // ── Heróis de Arton ──
    'raca-duende':        { escolha: [{ q: 2, v: 1, distintos: true }] },
    'raca-eiradaan':      { mods: { sab: 2, car: 1, for: -1 } },
    'raca-galokk':        { mods: { for: 1, con: 1, car: -1 }, escolha: [{ q: 1, v: 1 }], tamanho: 'Grande' },
    'raca-meio-elfo':     { mods: { int: 1 }, escolha: [{ q: 2, v: 1, exceto: ['con'], distintos: true }] },
    'raca-satiro':        { mods: { car: 2, des: 1, sab: -1 }, desloc: 12 },
    // ── Deuses de Arton ──
    'raca-inevitavel':    { mods: { car: 2, for: 1 } },
  };

  // ════════════════════════════════════════════════════════════════
  //  NOMES — para a ficha não nascer "(sem nome)". Um punhado de nomes de
  //  sabor artoniano; o jogador troca em dois segundos.
  // ════════════════════════════════════════════════════════════════
  const NOMES = [
    'Arshada', 'Bris', 'Cadanir', 'Dorana', 'Eisen', 'Fael', 'Galvor', 'Hadra',
    'Ith', 'Jarrein', 'Kael', 'Lyandra', 'Morvo', 'Niara', 'Orin', 'Prya',
    'Quendor', 'Rhasta', 'Sella', 'Torvald', 'Ula', 'Veska', 'Wulf', 'Xande',
    'Yrsa', 'Zaltana', 'Brannor', 'Cyra', 'Dael', 'Esmer', 'Faria', 'Gorim',
    'Halia', 'Isandro', 'Juna', 'Kavian', 'Lúnia', 'Mirko', 'Neris', 'Odval',
    'Perena', 'Raskar', 'Sinda', 'Thane', 'Urien', 'Vanya', 'Yorick', 'Zera',
  ];

  // ════════════════════════════════════════════════════════════════
  //  O MOTOR
  // ════════════════════════════════════════════════════════════════

  //  Acha um poder em GA_PODERES (+ os de classe) pelo NOME, sem acento e
  //  sem caso — como a origem o lista ("Sangue Azul", "Medicina").
  function acharPoderPorNome(nome) {
    const semAcento = window.GA_semAcento || (s => String(s || '').toLowerCase());
    const alvo = semAcento(String(nome || '').replace(/\s*\(.*?\)\s*/g, '').trim());
    const todos = PODERES().concat(window.GA_PODERES_CLASSE || []);
    return todos.find(p => semAcento(p.nome) === alvo) || null;
  }

  //  Monta a entrada de poder no formato que a ficha guarda (normalizar).
  function poderParaFicha(b, grupoOverride) {
    return {
      id: 'g' + Math.random().toString(36).slice(2, 9),
      pid: b.id || '', nome: b.nome || '',
      grupo: grupoOverride || (b.classe ? 'classe' : (b.grupo || 'livre')),
      classe: b.classe || '', distincao: b.distincao || '', marca: !!b.marca,
      magica: !!b.magica, livro: b.livro || '', pagina: b.pagina || 0,
      tags: b.tags || '', deus: b.deus || '', preReq: b.preReq || '',
      custo: b.custo || '',
      texto: Array.isArray(b.texto) ? b.texto.slice() : (b.texto ? [String(b.texto)] : []),
      obs: '', contaTormenta: false,
    };
  }

  //  Marca uma perícia como treinada. Ofício não mora no mapa de perícias
  //  (virou lista f.oficios) — então rota para a primeira linha de ofício.
  function treinar(f, chave) {
    if (chave === 'oficio') {
      if (f.oficios && f.oficios[0]) f.oficios[0].treinada = true;
      return;
    }
    if (f.pericias[chave]) f.pericias[chave].treinada = true;
  }

  //  ATRIBUTOS: compra os pontos no perfil da classe, depois soma a raça.
  function gerarAtributos(perfil, raca) {
    const matriz = pick(MATRIZES);
    const positivos = matriz.filter(v => v > 0).sort((a, b) => b - a);
    const negativos = matriz.filter(v => v < 0);

    // ordem de prioridade dos atributos: principal, secundários, o resto
    // (sorteado), e os de descarte por último
    const primcipal = pick(perfil.prim);
    const ordem = [primcipal];
    (perfil.sec || []).forEach(a => { if (ordem.indexOf(a) < 0) ordem.push(a); });
    embaralhar(ATRS).forEach(a => {
      if (ordem.indexOf(a) < 0 && (perfil.dump || []).indexOf(a) < 0) ordem.push(a);
    });
    (perfil.dump || []).forEach(a => { if (ordem.indexOf(a) < 0) ordem.push(a); });
    ATRS.forEach(a => { if (ordem.indexOf(a) < 0) ordem.push(a); });

    const at = { for: 0, des: 0, con: 0, int: 0, sab: 0, car: 0 };
    positivos.forEach((v, i) => { at[ordem[i]] = v; });          // maiores na frente
    negativos.forEach((v, j) => { at[ordem[ordem.length - 1 - j]] = v; }); // −1 no descarte

    // ── a raça entra POR CIMA (pode passar de +4, p. 17) ──
    aplicarMods(at, raca.mods);
    if (raca.variante) aplicarMods(at, raca.variante.mods);
    (raca.escolha || []).forEach(e => resolverEscolhaRaca(at, ordem, e));
    return at;
  }

  function aplicarMods(at, mods) {
    if (!mods) return;
    Object.keys(mods).forEach(a => { at[a] = (at[a] || 0) + mods[a]; });
  }

  //  "+1 em três atributos diferentes", "+2 num ou +1 em dois"… preferindo
  //  os atributos que a classe já valoriza (o jogador faria o mesmo).
  function resolverEscolhaRaca(at, ordem, e) {
    if (e.oneof) { resolverEscolhaRaca(at, ordem, pick(e.oneof)); return; }
    const evitar = a => e.exceto && e.exceto.indexOf(a) >= 0;
    const alvos = pegarN(ordem, e.q, evitar);
    alvos.forEach(a => { at[a] = (at[a] || 0) + e.v; });
  }

  //  RAÇA: rótulo, card de habilidades no bloco ✨ Poderes, tamanho e
  //  deslocamento. Os atributos já entraram em gerarAtributos.
  function addRaca(f, racaId) {
    const card = PODERES().find(p => p.id === racaId);
    if (!card) return;
    f.raca = card.nome;
    f.poderes.push(poderParaFicha(card, 'raca-hab'));
    const r = RACAS[racaId] || {};
    f.tamanho = r.tamanho || 'Médio';
    f.deslocamento = r.desloc || 9;
  }

  //  CLASSE: a linha de classe, as perícias treinadas (fixas + a escolha
  //  "ou" + as `escolhe` da lista + as extras de Inteligência), as
  //  proficiências e o atributo das CDs. O Caminho/Linhagem do arcanista
  //  entram na linha da classe (não na ficha), como manda o modelo.
  function addClasse(f, classeChave, nivel, caminhoChave) {
    const c = D().classe(classeChave);
    const linha = { classe: classeChave, nivel: nivel, caminho: '', linhagem: '' };
    if (caminhoChave) {
      linha.caminho = caminhoChave;
      if (caminhoChave === 'feiticeiro' && D().LINHAGENS && D().LINHAGENS.length) {
        linha.linhagem = pick(D().LINHAGENS).chave;
      }
    }
    f.classes = [linha];

    const t = (c && c.treino) || null;
    if (t) {
      (t.fixas || []).forEach(p => treinar(f, p));
      if (t.ou && t.ou.length) treinar(f, pick(t.ou));
      // as `escolhe` perícias, da lista `entre`, fora as que já ficaram treinadas
      const livres = embaralhar(t.entre || []).filter(p => !jaTreinada(f, p));
      pegarN(livres, t.escolhe || 0).forEach(p => treinar(f, p));
      f.proficiencias = t.prof || '';
    }
    // extras de Inteligência: Int perícias treinadas a mais, de QUALQUER
    // perícia (p. 17). Feito depois que a raça já mexeu no Int.
    const int = f.atributos.int || 0;
    if (int > 0) {
      const todas = embaralhar(D().PERICIAS.map(p => p.chave)).filter(p => !jaTreinada(f, p));
      pegarN(todas, int).forEach(p => treinar(f, p));
    }
    f.cdAtributo = cdDaClasse(classeChave, caminhoChave);
  }

  function jaTreinada(f, chave) {
    if (chave === 'oficio') return !!(f.oficios && f.oficios[0] && f.oficios[0].treinada);
    return !!(f.pericias[chave] && f.pericias[chave].treinada);
  }

  function cdDaClasse(chave, caminhoChave) {
    if (chave === 'necromante') return 'int';                 // Int fixo, sem Caminho
    const base = D().basicaDe(chave);
    if (base === 'arcanista') {
      const cam = D().caminho(caminhoChave);
      return cam ? cam.atr : 'int';
    }
    if (chave === 'usurpador') return 'sab';                  // clérigo de base
    if (CDATTR[base]) return CDATTR[base];
    const perfil = PERFIL[base] || { prim: ['for'] };
    return perfil.prim[0];
  }

  //  ORIGEM (só as do núcleo nesta leva): o rótulo, a escolha estruturada
  //  (origemEscolha) e a APLICAÇÃO dos 2 benefícios — perícia treinada ou
  //  poder no cartão. As origens especiais/regionais (benefício único em
  //  prosa) entram numa leva à parte.
  function addOrigem(f) {
    const nucleo = ORIGENS().filter(o => (o.tipo || 'nucleo') === 'nucleo');
    if (!nucleo.length) return;
    const o = pick(nucleo);
    f.origem = o.nome;
    f.origemEscolha = { origem: o.id, itens: [] };
    const limite = o.escolher || 2;

    // candidatos: cada perícia e cada poder oferecidos é 1 benefício
    const cand = []
      .concat((o.pericias || []).map(nome => ({ nome, tipo: 'pericia' })))
      .concat((o.poderes || []).map(nome => ({ nome, tipo: 'poder' })));
    const escolhidos = pegarN(embaralhar(cand), limite);

    escolhidos.forEach(b => {
      f.origemEscolha.itens.push({ nome: b.nome, tipo: b.tipo });
      if (b.tipo === 'pericia') {
        const chave = periciaChave(b.nome);
        if (chave) treinar(f, chave);
      } else {
        const pod = acharPoderPorNome(b.nome);
        if (pod && !f.poderes.some(x => x.pid === pod.id)) {
          f.poderes.push(poderParaFicha(pod, pod.grupo || 'origem'));
        }
      }
    });
    // as "vagas" flexíveis (um poder à escolha etc.) só ficam marcadas —
    // o jogador as preenche; não dá para sorteá-las com honestidade
    (o.flexiveis || []).forEach(nome => f.origemEscolha.itens.push({ nome, tipo: 'flex' }));
  }

  //  "Cura", "Ofício (alquimista)" → a chave da perícia em D.PERICIAS.
  function periciaChave(nome) {
    const semAcento = window.GA_semAcento || (s => String(s || '').toLowerCase());
    const base = semAcento(String(nome || '').replace(/\s*\(.*?\)\s*/g, '').trim());
    const p = D().PERICIAS.find(x => semAcento(x.nome) === base);
    return p ? p.chave : '';
  }

  // ════════════════════════════════════════════════════════════════
  //  CAMADA DE REGRAS — DIVINDADE (P2, 05/11/2026)
  //  Em T20, ser devoto é uma ESCOLHA — menos para quem conjura em nome de
  //  um deus: clérigo, druida, paladino e frade (e suas variantes) são
  //  SEMPRE devotos (p. 229 / devotos-data). Ao se tornar devoto, recebe
  //  UM poder concedido da lista do deus; o jogador marcou que um
  //  FUNDAMENTALISTA recebe +1. Os 20 Deuses Maiores vêm de GA_DEVOTOS; os
  //  poderes concedidos já moram em GA_PODERES (grupo 'concedido'), com o
  //  deus no campo `tags` ("Khalmyr", "Thwor, Valkaria"). A elegibilidade
  //  por raça/classe (a seção "Devotos" de cada deus) está em prosa — por
  //  ora o sorteio não a policia; o deus é editável na ficha.
  // ════════════════════════════════════════════════════════════════

  //  As classes que conjuram em nome de um deus — sempre devotas. A
  //  variante responde pela básica (D.basicaDe).
  function ehDivino(base) {
    return base === 'clerigo' || base === 'druida' || base === 'paladino' || base === 'frade';
  }

  //  Um nome de deus está na lista de `tags` do poder? (tags vêm por
  //  vírgula, às vezes com espaço solto: "Thwor , Valkaria".)
  function tagsTem(tags, nome) {
    const alvo = semAc(nome);
    return String(tags || '').split(',').map(t => semAc(t.trim())).some(t => t === alvo);
  }

  function concedidosDoDeus(nome) {
    return PODERES().filter(p => p.grupo === 'concedido' && tagsTem(p.tags, nome));
  }

  //  DIVINDADE: decide se é devoto, de qual deus, se é Fundamentalista, e
  //  entrega 1 (ou 2) poderes concedidos. Sem deus, deixa o campo vazio.
  function addDivindade(f, base) {
    const divino = ehDivino(base);
    const devoto = divino || chance(0.55);   // leigo: ~55% é devoto, por sabor
    if (!devoto) { f.divindade = ''; return; }

    const deuses = DEUSES();
    if (!deuses.length) { f.divindade = ''; return; }
    const deus = pick(deuses);
    const fundamentalista = chance(0.30);
    f.divindade = deus.nome + (fundamentalista ? ' (fundamentalista)' : '');

    const quantos = 1 + (fundamentalista ? 1 : 0);
    const pool = embaralhar(concedidosDoDeus(deus.nome));
    pegarN(pool, quantos).forEach((pod, i) => {
      const entrada = poderParaFicha(pod, 'concedido');
      entrada.deus = deus.nome;
      if (fundamentalista && i === 1) entrada.obs = 'Poder concedido extra — Fundamentalista.';
      f.poderes.push(entrada);
    });
  }

  // ════════════════════════════════════════════════════════════════
  //  CAMADA DE REGRAS — PODERES (P3, 05/11/2026)
  //  O pedido dele: poder de classe, geral (combate/destino/magia), da
  //  Tormenta e de raça. T20 dá um poder quase a cada nível (uns de
  //  classe, outros gerais) — mas o livro não tem UMA fórmula: cada classe
  //  tem a sua tabela. Como aqui o alvo é "plausível e editável, não a
  //  conta exata por tabela de classe", o motor dá um número SENSATO por
  //  nível (≈1 por nível, ~60% de classe e ~40% gerais), tirado dos pools
  //  certos e filtrado pelo NÍVEL que o pré-requisito exige ("11º nível de
  //  guerreiro"). Pré-requisitos mais finos (um poder antes de outro, um
  //  atributo mínimo) NÃO são policiados — a ficha é editável e segue a
  //  linha "conta e mostra, não policia". A contagem exata por tabela de
  //  classe fica para uma leva de refinamento.
  // ════════════════════════════════════════════════════════════════

  const CONJURADORES = ['arcanista', 'clerigo', 'druida', 'bardo', 'paladino', 'frade'];
  function ehConjurador(base) { return CONJURADORES.indexOf(base) >= 0; }

  //  O nível que o pré-requisito exige, se disser "Nº nível" (º ou °); 0 se
  //  não disser nada de nível.
  function nivelExigido(preReq) {
    const m = /(\d+)\s*[º°]\s*n[íi]vel/i.exec(String(preReq || ''));
    return m ? parseInt(m[1], 10) : 0;
  }
  function cabeNoNivel(p, nivel) { return nivelExigido(p.preReq) <= nivel; }
  function pidsNaFicha(f) { return new Set(f.poderes.map(p => p.pid).filter(Boolean)); }

  //  Poderes DE CLASSE da classe do personagem (a variante usa a lista da
  //  básica), que cabem no nível e ainda não estão na ficha.
  function poolClasse(classeChave, nivel, f) {
    const base = D().basicaDe(classeChave) || classeChave;
    const ja = pidsNaFicha(f);
    return (window.GA_PODERES_CLASSE || []).filter(p =>
      p.classe === base && cabeNoNivel(p, nivel) && !ja.has(p.id));
  }
  //  Poderes gerais de certas gavetas (combate, destino, grupo, magia…).
  function poolGeral(categorias, nivel, f) {
    const ja = pidsNaFicha(f);
    return PODERES().filter(p =>
      categorias.indexOf(p.grupo) >= 0 && cabeNoNivel(p, nivel) && !ja.has(p.id));
  }
  //  Poderes de raça (🧬, Heróis de Arton) marcados com a raça nas tags.
  function poolRaca(racaNome, nivel, f) {
    const ja = pidsNaFicha(f);
    return PODERES().filter(p =>
      p.grupo === 'raca' && cabeNoNivel(p, nivel) && !ja.has(p.id) && tagsTem(p.tags, racaNome));
  }

  function addPoderes(f, classeChave, nivel, base, racaNome) {
    const conj = ehConjurador(base);
    // ── de classe (~60% dos poderes do nível, no mínimo 1) ──
    const nClasse = Math.max(1, Math.round(nivel * 0.6));
    pegarN(embaralhar(poolClasse(classeChave, nivel, f)), nClasse)
      .forEach(p => f.poderes.push(poderParaFicha(p, 'classe')));
    // ── gerais (combate, destino, grupo; e magia só para conjurador) ──
    const cats = ['combate', 'destino', 'grupo'].concat(conj ? ['magia'] : []);
    const nGeral = Math.round(nivel * 0.4);
    pegarN(embaralhar(poolGeral(cats, nivel, f)), nGeral)
      .forEach(p => f.poderes.push(poderParaFicha(p, p.grupo)));
    // ── um poder de raça, quando a raça tem um (metade das vezes) ──
    if (chance(0.5)) {
      const pr = poolRaca(racaNome, nivel, f);
      if (pr.length) f.poderes.push(poderParaFicha(pick(pr), 'raca'));
    }
    // ── um poder da Tormenta, de vez em quando (nível 2+) ──
    if (nivel >= 2 && chance(0.22)) {
      const pt = poolGeral(['tormenta'], nivel, f);
      if (pt.length) f.poderes.push(poderParaFicha(pick(pt), 'tormenta'));
    }
  }

  // ════════════════════════════════════════════════════════════════
  //  gerar(opts) — junta tudo e entrega a ficha pronta, aberta na tela.
  //    opts.nivel   1..20, ou ausente/0 = ao acaso
  // ════════════════════════════════════════════════════════════════
  function gerar(opts) {
    opts = opts || {};
    if (!D() || !window.GA_Ficha || !window.GA_Ficha.criarEabrir) return null;

    const nivel = (opts.nivel >= 1 && opts.nivel <= 20) ? (opts.nivel | 0) : (1 + rand(20));

    // CLASSE (com Caminho do arcanista decidido já, porque ele manda no
    // atributo principal e no das CDs)
    const classe = pick(D().CLASSES);
    const base = classe.de || classe.chave;
    let caminho = '';
    if (base === 'arcanista' && classe.chave !== 'necromante' && D().CAMINHOS && D().CAMINHOS.length) {
      caminho = pick(D().CAMINHOS).chave;
    }

    // perfil de atributo (arcanista: o principal é o atributo do Caminho)
    let perfil = PERFIL[base];
    if (base === 'arcanista') {
      const atrCam = caminho ? (D().caminho(caminho) || {}).atr : (classe.chave === 'necromante' ? 'int' : 'int');
      perfil = { prim: [atrCam], sec: ['con', 'des'], dump: ['for'] };
    }
    if (!perfil) perfil = { prim: ['for'], sec: ['con', 'des'], dump: ['car'] };

    // RAÇA (fora o Moreau, que depende de herança)
    const racaIds = Object.keys(RACAS).filter(id => PODERES().some(p => p.id === id));
    const racaId = pick(racaIds);
    const raca = Object.assign({}, RACAS[racaId]);
    if (raca.variantes) raca.variante = pick(raca.variantes);

    // ATRIBUTOS (pontos + raça)
    const atributos = gerarAtributos(perfil, raca);

    // monta a ficha vazia e vai vestindo
    const f = {
      nome: opts.nome || pick(NOMES),
      jogador: '',
      classes: [{ classe: classe.chave, nivel: nivel }],
      atributos: atributos,
      xp: (D().XP_POR_NIVEL && D().XP_POR_NIVEL[nivel]) || 0,
      poderes: [],
      pericias: {},
      oficios: [],
    };
    // normalizar (dentro de criarEabrir) exige os mapas; mas treinar()/addRaca
    // mexem antes. Então pré-preparo os mapas mínimos que esses passos usam.
    D().PERICIAS.forEach(p => { f.pericias[p.chave] = { treinada: false, outros: 0, atr: '' }; });
    f.oficios = [{ id: 'o1', esp: '', treinada: false, outros: 0, atr: '' },
                 { id: 'o2', esp: '', treinada: false, outros: 0, atr: '' }];

    addRaca(f, racaId);
    addClasse(f, classe.chave, nivel, caminho);
    addOrigem(f);
    addDivindade(f, base);
    addPoderes(f, classe.chave, nivel, base, f.raca);

    return window.GA_Ficha.criarEabrir(f);
  }

  // ════════════════════════════════════════════════════════════════
  //  A UI — o painel 🎲 Sortear ficha (aberto pelo botão do Lobby)
  // ════════════════════════════════════════════════════════════════
  function abrir() {
    if (!window.GA_abrirModal) { gerar({}); return; }   // sem modal, sorteia direto
    const opts = Array.from({ length: 20 }, (_, i) =>
      `<option value="${i + 1}">${i + 1}º nível</option>`).join('');
    const overlay = window.GA_abrirModal(`
      <div class="ga-modal-cab">
        <span>🎲 Sortear ficha</span>
        <button type="button" class="ga-modal-x" data-ga-fechar aria-label="Fechar">✕</button>
      </div>
      <p class="ga-modal-dica">Uma ficha nova, montada ao acaso e já aberta para você mexer. Por enquanto
        sorteia: nível, atributos (método Pontos, p. 17), raça (com bônus, tamanho e deslocamento),
        classe (perícias, proficiências, Caminho), origem, <strong>divindade</strong> (deus ou nenhum,
        Fundamentalista, poderes concedidos) e <strong>poderes</strong> (de classe, combate, destino,
        magia, Tormenta e raça). Magias e equipamento vêm nas próximas levas.</p>
      <div class="fi-ger-opcoes">
        <label class="fi-ger-nivelrad"><input type="radio" name="fiGerNivel" value="aleatorio" checked>
          <span>Nível ao acaso (1–20)</span></label>
        <label class="fi-ger-nivelrad"><input type="radio" name="fiGerNivel" value="fixo">
          <span>Nível escolhido:</span></label>
        <select class="fi-sel" data-ger-nivel disabled>${opts}</select>
      </div>
      <div class="ga-modal-acoes">
        <button type="button" class="ga-btn-sec" data-ga-fechar>Cancelar</button>
        <button type="button" class="ga-btn-principal" data-ger-sortear>🎲 Sortear</button>
      </div>`);
    if (!overlay) { gerar({}); return; }

    const sel = overlay.querySelector('[data-ger-nivel]');
    const radios = overlay.querySelectorAll('input[name="fiGerNivel"]');
    radios.forEach(r => r.addEventListener('change', () => {
      const fixo = overlay.querySelector('input[name="fiGerNivel"][value="fixo"]').checked;
      sel.disabled = !fixo;
      if (fixo) sel.focus();
    }));
    overlay.querySelector('[data-ger-sortear]').addEventListener('click', () => {
      const fixo = overlay.querySelector('input[name="fiGerNivel"][value="fixo"]').checked;
      const nivel = fixo ? (parseInt(sel.value, 10) || 1) : 0;
      if (overlay._fechar) overlay._fechar();
      gerar({ nivel: nivel });
    });
  }

  return { abrir, gerar };
})();
