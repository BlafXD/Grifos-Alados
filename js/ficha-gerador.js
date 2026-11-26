// Gerador de personagens: seleções fixas ou aleatórias, devoção e equipamento.
// Compartilhado pelo mestre e pelos jogadores; cria pela mesma porta da ficha manual.
// Magias e a progressão exata dos poderes de classe continuam fora deste motor.
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
  // Moreau sorteia uma herança antes de distribuir atributos.
  const RACAS = {
    'raca-moreau': { escolha: [{q: 2, v: 1, distintos: true}] },
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

  // Origens comuns sorteiam benefícios; especiais conservam seu poder e descrição.
  function addOrigem(f, origemId) {
    const nucleo = ORIGENS();
    if (!nucleo.length) return;
    const o = origemId ? nucleo.find(o => o.id === origemId) : pick(nucleo);
    if (!o) throw new Error('Origem indisponível.');
    f.origem = o.nome;
    f.origemEscolha = { origem: o.id, itens: [] };
    if (o.tipo === 'especial') {
      const pod = PODERES().find(p => p.id === 'origem-' + o.id);
      if (pod) f.poderes.push(poderParaFicha(pod, 'origem'));
      f.anotacoes += '\nOrigem ' + o.nome + ': ' + (o.beneficio || '') + '\nConfira as escolhas do benefício na ficha.';
      return;
    }
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
  // Divindade: um poder por devoção, dois para classes divinas e +1 por
  // fundamentalismo. Dogmas: Deuses de Arton, capítulo 1.
  function ehDivino(base) {
    return base === 'clerigo' || base === 'druida' || base === 'paladino' || base === 'frade';
  }

  function compativel(classe, raca, deus, fundamentalista) {
    const base = classe.de || classe.chave;
    if (classe.chave === 'usurpador') return false;
    if (base === 'druida' && !['aharadak','allihanna','megalokk','oceano','tenebra'].includes(deus.chave)) return false;
    if (base === 'paladino' && !['azgher','khalmyr','lena','linwu','marah','tannatoh','thyatis','valkaria'].includes(deus.chave)) return false;
    if (fundamentalista && base === 'paladino' && deus.chave === 'valkaria' && !['raca-humano','raca-moreau'].includes(raca)) return false;
    if (ehDivino(base) || ['raca-humano','raca-moreau'].includes(raca) || deus.chave === 'aharadak') return true;
    const nomes = {anao:'anoes', elfo:'elfos', goblin:'goblins', minotauro:'minotauros', silfide:'silfides', medusa:'medusas', trog:'trogs', hynne:'hynne', qareen:'qareen', dahllan:'dahllan', suraggel:'aggelus,sulfure'};
    const tags = semAc(deus.devotos);
    const nr = nomes[raca.replace('raca-','')] || raca.replace('raca-','') + 's';
    const nc = semAc((D().classe(base) || classe).nome) + 's';
    return nr.split(',').some(n=>tags.includes(n)) || tags.includes(nc);
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
  //  entrega os poderes concedidos da classe e o adicional de fundamentalista.
  function addDivindade(f, base, opts) {
    if (opts.divindade === 'nenhuma') {
      f.divindade = '';
      if (ehDivino(base) && f.classes[0].classe !== 'usurpador') {
        const nivel = f.classes[0].nivel;
        f.pm = {outros: 2 * (nivel >= 17 ? 4 : nivel >= 11 ? 3 : nivel >= 5 ? 2 : 1)};
        f.anotacoes += '\nDevoção ampla: ' + (base === 'paladino' ? 'paladino do bem' : base === 'druida' ? 'druida de Arton' : 'Panteão') + '. Sem poderes concedidos; +2 PM por patamar (Deuses de Arton, p. 11).';
      }
      return;
    }
    if (!opts.divindade && !opts.fundamentalista && !ehDivino(base) && !chance(0.55)) return;
    const deus = opts.divindade ? DEUSES().find(d => d.chave === opts.divindade) : pick(DEUSES());
    if (!deus) throw new Error('Divindade indisponível.');
    const fundamentalista = !!opts.fundamentalista;
    f.divindade = deus.nome;
    const dogmas = (window.GA_DOGMAS || {})[deus.chave];
    const tradicao = base === 'druida' || base === 'paladino' ? base : 'sacerdote';
    if (fundamentalista && (!dogmas || !dogmas[tradicao])) throw new Error('Esta divindade não tem dogma para a classe escolhida.');
    if (fundamentalista && base === 'paladino' && deus.chave === 'valkaria' && !['Humano','Moreau'].includes(f.raca)) throw new Error('Paladinos fundamentalistas de Valkaria devem ser humanos.');
    const quantos = (ehDivino(base) ? 2 : 1) + (fundamentalista ? 1 : 0);
    const pool = embaralhar(concedidosDoDeus(deus.nome)).filter(p => !f.poderes.some(x => x.pid === p.id));
    pegarN(pool, quantos).forEach((pod, i) => {
      const entrada = poderParaFicha(pod, 'concedido');
      entrada.deus = deus.nome;
      if (fundamentalista && i === quantos - 1) entrada.obs = 'Poder concedido extra — Fundamentalista.';
      f.poderes.push(entrada);
    });
    f.anotacoes += '\nDevoção a ' + deus.nome + ': ' + deus.obrigacoes;
    if (fundamentalista) {
      const dogma = dogmas[tradicao].replace('Como o sacerdote.', dogmas.sacerdote);
      f.anotacoes += '\nFundamentalista de ' + deus.nome + ' — tradição: ' + tradicao + '.\nDogma: ' + dogma +
        '\nUsa apenas a arma favorita: ' + deus.arma + '. Recebe um poder concedido adicional. Pela regra geral (salvo exceção do dogma), violações retiram PM e habilidades de classe divina; recupera PM a partir do próximo dia e habilidades após descanso. Reincidência na mesma aventura exige penitência imposta por outro fundamentalista do mesmo deus. Deuses de Arton, p. 11.';
    }
  }

  // ════════════════════════════════════════════════════════════════
  //  CAMADA DE REGRAS — PODERES (P3, 05/11/2026)
  //  O pedido dele: poder de classe, geral (combate/destino/magia), da
  //  Tormenta e de raça. T20 dá um poder quase a cada nível (uns de
  //  classe, outros gerais) — mas o livro não tem UMA fórmula: cada classe
  //  tem a sua tabela. Como aqui o alvo é "plausível e editável, não a
  //  conta exata por tabela de classe", o motor dá um número SENSATO por
  //  nível (≈1 por nível, ~60% de classe e ~40% gerais), tirado dos pools
  //  certos e filtrado pelo PRÉ-REQUISITO de cada poder (preReqOk): nível,
  //  atributo mínimo ("Car 2"), perícia treinada ("treinado em Luta", com
  //  "e"/"ou"), poder anterior pelo nome ("Ataque Poderoso"), conjuração
  //  ("lançar magias de 2º círculo") e contagem de poderes da Tormenta.
  //  A escolha é ITERATIVA (um por vez, refiltrando): assim uma cadeia de
  //  poder se forma (o pré-requisito entra antes do que depende dele) e
  //  nunca se oferece um poder ilegal. Cláusula que não sabemos verificar
  //  (ex.: "possuir um familiar") conta como NÃO satisfeita — o sorteio a
  //  evita, e quem de fato qualifica adiciona o poder à mão (ficha editável).
  //  A contagem exata por tabela de classe fica para uma leva de refinamento.
  // ════════════════════════════════════════════════════════════════

  //  Quem tem a habilidade Magias (conferido nos livros em 26/11/2026): o
  //  PALADINO (T20 p. 82) e o Santo (Heróis p. 37) NÃO lançam magias — só
  //  pegam magia por poder. As variantes contam pela classe básica.
  const CONJURADORES = ['arcanista', 'clerigo', 'druida', 'bardo', 'frade'];
  function ehConjurador(base) { return CONJURADORES.indexOf(base) >= 0; }
  //  Maior círculo que a classe lança NESTE nível. Arcanista, clérigo e frade:
  //  2º no 5º nível, 3º no 9º… (T20 p. 37/57; Deuses p. 39). Bardo e druida:
  //  2º no 6º, 3º no 10º, 4º no 14º — e param no 4º (T20 p. 44/61).
  function circuloMax(base, nivel) {
    if (!ehConjurador(base) || nivel < 1) return 0;
    if (base === 'bardo' || base === 'druida') return nivel >= 14 ? 4 : nivel >= 10 ? 3 : nivel >= 6 ? 2 : 1;
    return Math.min(5, 1 + Math.floor((nivel - 1) / 4));
  }

  // ── O PRÉ-REQUISITO DE UM PODER, POLICIADO (11/11/2026) ──────────
  const sa = (s) => (window.GA_semAcento || (x => String(x || '').toLowerCase()))(String(s || ''));
  const NUMPT = { um: 1, uma: 1, outro: 1, outra: 1, dois: 2, duas: 2, tres: 3, quatro: 4, cinco: 5 };

  function periciaTreinadaPorNome(f, nome) {
    const ch = periciaChave(nome);
    return ch ? jaTreinada(f, ch) : false;
  }
  //  Um poder com ESTE nome já está na ficha? (sem acento, sem parênteses).
  function poderNaFichaPorNome(f, nome) {
    const alvo = sa(nome).replace(/[()]/g, ' ').replace(/\s+/g, ' ').trim();
    if (!alvo) return true;
    return (f.poderes || []).some(x => {
      const n = sa(x.nome).replace(/[()]/g, ' ').replace(/\s+/g, ' ').trim();
      return n && n === alvo;
    });
  }
  //  Uma cláusula (um pedaço do preReq separado por vírgula) é satisfeita?
  //  O que não dá para verificar conta como NÃO satisfeito, de propósito.
  function clausulaOk(cl, f, nivel, base) {
    const t = sa(cl).trim();
    if (!t) return true;
    let m = /(\d+)\s*(?:o|º|°|\.)?\s*nivel/.exec(t);          // "11º nível (de guerreiro)"
    if (m) return parseInt(m[1], 10) <= nivel;
    m = /\b(for|des|con|int|sab|car)\s+(-?\d+)/.exec(t);      // "Car 2"
    if (m) return ((f.atributos && f.atributos[m[1]]) || 0) >= parseInt(m[2], 10);
    if (/lancar magias|habilidade de classe magias|conjurad|conjurar magias/.test(t)) {
      const mc = /(\d+)\s*(?:o|º|°)?\s*circulo/.exec(t);
      const circ = mc ? parseInt(mc[1], 10) : 1;
      return circuloMax(base, nivel) >= circ;
    }
    m = /treinad[oa]\s+(?:em|na|no)\s+(.+)/.exec(t);          // "treinado em Luta (e/ou Y)"
    if (m) {
      const alvo = m[1];
      if (/perici.? (escolhida|treinada)/.test(alvo)) return true;   // auto-referente
      if (/\bou\b/.test(alvo)) return alvo.split(/\bou\b/).some(nm => periciaTreinadaPorNome(f, nm));
      return alvo.split(/\be\b/).every(nm => periciaTreinadaPorNome(f, nm));
    }
    if (/poder(es)?\b[^]*tormenta|tormenta[^]*poder(es)?\b/.test(t)) {   // "quatro outros poderes da Tormenta"
      const w = (/\b(um|uma|outro|outra|dois|duas|tres|quatro|cinco)\b/.exec(t) || [])[1];
      const n = NUMPT[w] || 1;
      return (f.poderes || []).filter(x => x.grupo === 'tormenta' || x.contaTormenta).length >= n;
    }
    return poderNaFichaPorNome(f, cl);                        // senão: é o nome de outro poder
  }
  //  Todas as cláusulas (separadas por vírgula/ponto-e-vírgula) precisam valer.
  function preReqOk(p, f, nivel, base) {
    const req = String(p.preReq || '').trim();
    if (!req) return true;
    return req.split(/[,;]/).map(s => s.trim()).filter(Boolean)
      .every(cl => clausulaOk(cl, f, nivel, base));
  }
  function pidsNaFicha(f) { return new Set(f.poderes.map(p => p.pid).filter(Boolean)); }

  //  Poderes DE CLASSE da classe do personagem (a variante usa a lista da
  //  básica), que passam no pré-requisito e ainda não estão na ficha.
  function poolClasse(classeChave, nivel, f) {
    const base = D().basicaDe(classeChave) || classeChave;
    const ja = pidsNaFicha(f);
    return (window.GA_PODERES_CLASSE || []).filter(p =>
      p.classe === base && !ja.has(p.id) && preReqOk(p, f, nivel, base));
  }
  //  Poderes gerais de certas gavetas (combate, destino, grupo, magia…).
  function poolGeral(categorias, nivel, f, base) {
    const ja = pidsNaFicha(f);
    return PODERES().filter(p =>
      categorias.indexOf(p.grupo) >= 0 && !ja.has(p.id) && preReqOk(p, f, nivel, base));
  }
  //  Poderes de raça (🧬, Heróis de Arton) marcados com a raça nas tags.
  function poolRaca(racaNome, nivel, f, base) {
    const ja = pidsNaFicha(f);
    return PODERES().filter(p =>
      p.grupo === 'raca' && !ja.has(p.id) && tagsTem(p.tags, racaNome) && preReqOk(p, f, nivel, base));
  }
  //  Pega `n` poderes UM A UM, refiltrando a cada vez — assim um poder que
  //  é pré-requisito de outro entra primeiro e libera o dependente, e o
  //  pool nunca oferece algo ilegal diante do estado atual da ficha.
  function pegarIterando(n, montarPool, aoPegar) {
    for (let i = 0; i < n; i++) {
      const pool = montarPool();
      if (!pool.length) break;
      aoPegar(pick(pool));
    }
  }

  function addPoderes(f, classeChave, nivel, base, racaNome) {
    const conj = ehConjurador(base);
    // ── de classe (~60% dos poderes do nível, no mínimo 1) ──
    const nClasse = Math.max(1, Math.round(nivel * 0.6));
    pegarIterando(nClasse, () => poolClasse(classeChave, nivel, f),
      p => f.poderes.push(poderParaFicha(p, 'classe')));
    // ── gerais (combate, destino, grupo; e magia só para conjurador) ──
    const cats = ['combate', 'destino', 'grupo'].concat(conj ? ['magia'] : []);
    const nGeral = Math.round(nivel * 0.4);
    pegarIterando(nGeral, () => poolGeral(cats, nivel, f, base),
      p => f.poderes.push(poderParaFicha(p, p.grupo)));
    // ── um poder de raça, quando a raça tem um (metade das vezes) ──
    if (chance(0.5)) {
      const pr = poolRaca(racaNome, nivel, f, base);
      if (pr.length) f.poderes.push(poderParaFicha(pick(pr), 'raca'));
    }
    // ── um poder da Tormenta, de vez em quando (nível 2+) ──
    if (nivel >= 2 && chance(0.22)) {
      const pt = poolGeral(['tormenta'], nivel, f, base);
      if (pt.length) f.poderes.push(poderParaFicha(pick(pt), 'tormenta'));
    }
  }

  // ════════════════════════════════════════════════════════════════
  //  gerar(opts) — junta tudo e entrega a ficha pronta, aberta na tela.
  //    opts.nivel   1..20, ou ausente/0 = ao acaso
  // ════════════════════════════════════════════════════════════════
  // ════════════════════════════════════════════════════════════════
  //  P4 — MAGIAS (26/11/2026), pelas regras de cada classe:
  //    arcanista/necromante: 3 + 1 por nível, com o ajuste do Caminho
  //      (D.magiasDoArcanista, a mesma conta da ficha); arcanas;
  //    clérigo/frade: 3 + 1 por nível; divinas;
  //    bardo/magimarcialista: 2 + 1 a cada nível par; arcanas de 3 escolas;
  //    druida/ermitão: 2 + 1 a cada nível par; divinas de 3 escolas;
  //    usurpador: nenhuma ("não aprende magias automaticamente", Heróis p. 41).
  //  "A cada nível, aprende uma magia de qualquer círculo que possa lançar":
  //  cada magia nova sai com o teto do nível em que foi aprendida.
  // ════════════════════════════════════════════════════════════════
  const ESCOLAS = ['Abjuração', 'Adivinhação', 'Convocação', 'Encantamento', 'Evocação', 'Ilusão', 'Necromancia', 'Transmutação'];
  function magiasConhecidas(classeChave, base, nivel, caminho) {
    if (classeChave === 'usurpador' || !ehConjurador(base) || nivel < 1) return 0;
    if (base === 'arcanista') {
      const r = caminho && D().magiasDoArcanista ? D().magiasDoArcanista(caminho, nivel) : null;
      return r ? r.total : 3 + (nivel - 1);
    }
    if (base === 'clerigo' || base === 'frade') return 3 + (nivel - 1);
    return 2 + Math.floor(nivel / 2);                       // bardo, druida
  }
  function addMagias(f, classeChave, nivel, base, caminho) {
    const total = magiasConhecidas(classeChave, base, nivel, caminho);
    if (!total || !Array.isArray(window.GA_MAGIAS)) return;
    const lista = base === 'arcanista' || base === 'bardo' ? 'arcana' : 'divina';
    let escolas = null;
    if (base === 'bardo' || base === 'druida') {
      escolas = pegarN(embaralhar(ESCOLAS), 3);
      f.anotacoes = (f.anotacoes || '') + '\nEscolas de magia (' +(D().classe(classeChave) || {}).nome + '): ' + escolas.join(', ') + '. A escolha não pode ser mudada.';
    }
    //  o teto de círculo de cada magia, na ordem em que foi aprendida
    const tetos = [];
    for (let n = 1; n <= nivel; n++) {
      const ganhou = magiasConhecidas(classeChave, base, n, caminho) - magiasConhecidas(classeChave, base, n - 1, caminho);
      for (let k = 0; k < ganhou; k++) tetos.push(n === 1 ? 1 : circuloMax(base, n));
    }
    const pool = window.GA_MAGIAS.filter(m => (m.listas || []).indexOf(lista) >= 0 && (!escolas || escolas.indexOf(m.escola) >= 0));
    const usadas = new Set();
    tetos.forEach(teto => {
      //  o círculo mais alto disponível na maior parte das vezes
      let circ = chance(0.6) ? teto : 1 + rand(teto);
      for (; circ >= 1; circ--) {
        const op = pool.filter(m => m.circulo === circ && !usadas.has(m.id));
        if (!op.length) continue;
        const m = pick(op); usadas.add(m.id);
        f.magias.push({ mid: m.id, nome: m.nome, circulo: m.circulo, pm: m.pm, tipo: m.tipo || '', escola: m.escola || '',
          classe: classeChave, execucao: m.execucao || '', alcance: m.alcance || '', alvo: m.alvo || m.area || m.efeito || '',
          duracao: m.duracao || '', resistencia: m.resistencia || '', resumo: m.resumo || '', obs: '' });
        return;
      }
    });
  }

  function gerar(opts) {
    opts = Object.assign({}, opts);
    if (!D() || !window.GA_Ficha || !window.GA_Ficha.criarEabrir) return null;
    if (opts.fundamentalista && opts.divindade === 'nenhuma') throw new Error('Escolha uma divindade para o fundamentalista.');

    const nivel = (opts.nivel >= 1 && opts.nivel <= 20) ? (opts.nivel | 0) : (1 + rand(20));

    // CLASSE (com Caminho do arcanista decidido já, porque ele manda no
    // atributo principal e no das CDs)
    const racaIds = Object.keys(RACAS).filter(id => PODERES().some(p => p.id === id));
    const classes = D().CLASSES.filter(c => !opts.classe || c.chave === opts.classe);
    const racas = racaIds.filter(id => !opts.raca || id === opts.raca);
    const pares = classes.flatMap(c => racas.map(r => ({c, r, deuses: DEUSES().filter(d => compativel(c, r, d, opts.fundamentalista))})))
      .filter(p => opts.divindade && opts.divindade !== 'nenhuma' ? p.deuses.some(d=>d.chave===opts.divindade) :
        opts.divindade === 'nenhuma' ? p.c.chave !== 'santo' : (!opts.fundamentalista && (!ehDivino(p.c.de || p.c.chave) || p.c.chave === 'usurpador')) || p.deuses.length);
    if (!pares.length) throw new Error('Raça, classe e divindade não têm uma combinação permitida. Deixe uma delas aleatória ou altere a seleção.');
    const par = pick(pares), classe = par.c;
    if (!classe) throw new Error('Classe indisponível.');
    const base = classe.de || classe.chave;
    if (!opts.divindade) opts.divindade = (opts.fundamentalista || ehDivino(base) || chance(0.55)) && par.deuses.length ? pick(par.deuses).chave : 'nenhuma';
    if (classe.chave === 'usurpador') opts.divindade = 'nenhuma';
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

    // RAÇA e variantes, incluindo a herança Moreau
    const racaId = par.r;
    if (!racaIds.includes(racaId)) throw new Error('Raça indisponível.');
    const raca = Object.assign({}, RACAS[racaId]);
    if (raca.variantes) raca.variante = pick(raca.variantes);
    let heranca;
    if (racaId === 'raca-moreau') {
      heranca = pick(PODERES().find(p=>p.id===racaId).escolhas[0].opcoes);
      const atr = {Força:'for', Destreza:'des', Constituição:'con', Inteligência:'int', Sabedoria:'sab', Carisma:'car'};
      const chave = Object.keys(atr).find(k=>heranca.texto[0].includes(k));
      raca.mods = {[atr[chave]]: 1};
    }

    // ATRIBUTOS (pontos + raça)
    const atributos = gerarAtributos(perfil, raca);

    // monta a ficha vazia e vai vestindo
    const f = {
      nome: opts.nome || pick(NOMES),
      jogador: '',
      anotacoes: '',
      classes: [{ classe: classe.chave, nivel: nivel }],
      atributos: atributos,
      xp: (D().XP_POR_NIVEL && D().XP_POR_NIVEL[nivel]) || 0,
      poderes: [],
      magias: [],
      pericias: {},
      oficios: [],
    };
    // normalizar (dentro de criarEabrir) exige os mapas; mas treinar()/addRaca
    // mexem antes. Então pré-preparo os mapas mínimos que esses passos usam.
    D().PERICIAS.forEach(p => { f.pericias[p.chave] = { treinada: false, outros: 0, atr: '' }; });
    f.oficios = [{ id: 'o1', esp: '', treinada: false, outros: 0, atr: '' },
                 { id: 'o2', esp: '', treinada: false, outros: 0, atr: '' }];

    addRaca(f, racaId);
    if (heranca) {
      f.poderes[0].obs = 'Herança: ' + heranca.nome;
      f.poderes[0].texto.push(...heranca.texto);
      if (heranca.nome === 'Raposa') f.deslocamento = 12;
    }
    addClasse(f, classe.chave, nivel, caminho);
    addOrigem(f, opts.origem);
    addDivindade(f, base, opts);
    addPoderes(f, classe.chave, nivel, base, f.raca);
    addMagias(f, classe.chave, nivel, base, caminho);

    window.GA_FichaEquipamento.gerar(f, nivel, opts.itens || 'nenhum', !!opts.fundamentalista);
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
      <p class="ga-modal-dica">Fixe o que quiser e deixe o restante ao acaso. A ficha fica editável; use o seletor de campanha nela para colocá-la em uma mesa. As magias saem pela regra da classe (quantas e de que círculo); as escolhas abertas de poderes ainda pedem revisão.</p>
      <div class="fi-ger-opcoes">
        <label class="fi-ger-nivelrad"><input type="radio" name="fiGerNivel" value="aleatorio" checked>
          <span>Nível ao acaso (1–20)</span></label>
        <label class="fi-ger-nivelrad"><input type="radio" name="fiGerNivel" value="fixo">
          <span>Nível escolhido:</span></label>
        <select class="fi-sel" data-ger-nivel disabled>${opts}</select>
      </div>
      <div class="fi-ger-seletores">
        <label>Raça<select class="fi-sel" data-ger-raca><option value="">Aleatória</option>${Object.keys(RACAS).map(id => PODERES().find(p => p.id === id)).filter(Boolean).map(p => '<option value="'+esc(p.id)+'">'+esc(p.nome)+'</option>').join('')}</select></label>
        <label>Classe<select class="fi-sel" data-ger-classe><option value="">Aleatória</option>${D().CLASSES.map(c => '<option value="'+esc(c.chave)+'">'+esc(c.nome)+'</option>').join('')}</select></label>
        <label>Origem<select class="fi-sel" data-ger-origem><option value="">Aleatória</option>${ORIGENS().map(o => '<option value="'+esc(o.id)+'">'+esc(o.nome)+'</option>').join('')}</select></label>
        <label>Divindade<select class="fi-sel" data-ger-divindade><option value="">Aleatória</option><option value="nenhuma">Nenhuma</option>${DEUSES().map(d => '<option value="'+esc(d.chave)+'">'+esc(d.nome)+'</option>').join('')}</select></label>
        <label><input type="checkbox" data-ger-fundamentalista> Fundamentalista (+1 poder concedido e dogmas)</label>
        <label>Itens<select class="fi-sel" data-ger-itens><option value="nenhum">Não gerar itens</option><option value="gastar">Gerar e consumir o dinheiro do nível</option><option value="gratis">Gerar sem gastar dinheiro</option></select></label>
      </div><p class="ga-modal-dica">Os itens gerados cabem, juntos, na riqueza do nível, inclusive no modo sem gasto. Entram no inventário; equipe-os e configure seus ataques na ficha.</p>
      <p data-ger-erro role="alert"></p>
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
    const div = overlay.querySelector('[data-ger-divindade]');
    const fund = overlay.querySelector('[data-ger-fundamentalista]');
    div.addEventListener('change', () => { fund.disabled = div.value === 'nenhuma'; if (fund.disabled) fund.checked = false; });
    overlay.querySelector('[data-ger-sortear]').addEventListener('click', () => {
      const fixo = overlay.querySelector('input[name="fiGerNivel"][value="fixo"]').checked;
      const nivel = fixo ? (parseInt(sel.value, 10) || 1) : 0;
      try {
        const escolhas = { nivel, fundamentalista: fund.checked };
        ['raca','classe','origem','divindade','itens'].forEach(k => escolhas[k] = overlay.querySelector('[data-ger-' + k + ']').value);
        gerar(escolhas);
        if (overlay._fechar) overlay._fechar();
      } catch (e) { overlay.querySelector('[data-ger-erro]').textContent = e.message; }
    });
  }

  return { abrir, gerar };
})();
