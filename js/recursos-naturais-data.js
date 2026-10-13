// ════════════════════════════════════════════════════════════════════
//  RECURSOS-NATURAIS-DATA.JS — a regra opcional de tesouro do
//  Ameaças de Arton (p. 401–402)
//
//  "Certas criaturas, como dragões, elementais e monstros peçonhentos,
//  fornecem recursos específicos como parte de seus tesouros. Entretanto,
//  existem outros materiais de grande utilidade que podem ser extraídos
//  de ameaças." São SETE tipos de recurso, e a graça é que a ficha da
//  criatura já tem tudo o que a regra pede:
//
//     f.tipo = "Morto-vivo Médio"   → a LINHA da Tabela 3-5 (o tipo)
//                                     e a QUANTIDADE (o tamanho)
//     f.nd   = "7"                  → o PATAMAR (Tabela 3-6) e a CD
//                                     para extrair (15 + ND)
//
//  Por isso este módulo é só dado + conta: quem desenha é o
//  js/fichas-prontas.js, no card de cada criatura.
//
//  ── ⚠ A TABELA 3-5 NÃO SE LÊ POR TEXTO ───────────────────────────
//  No `pdftotext` (nos dois modos) a grade sai com 43 valores para 42
//  células, e as linhas não casam com os rótulos. Nem o `-layout` ajuda:
//  ele empilha os nomes de linha fora de ordem (Animal depois das células
//  dele, Espírito* sem células, Humanoide com as de Espírito*). O que
//  fechou foi descer até os COMANDOS DE DESENHO da página, onde cada
//  linha é um array `TJ` com as células na ordem e o espaço vazio `()`
//  onde o livro imprime o travessão:
//
//      [(Animal)-5860(1)-4970(2-3)-4244()-5536()-6666(4-5)-5490(6)-4278()]TJ
//      [(Cons)20(trut)14(o)-4841(1-2)-4818()-4648(3)…-5591()-4278(6)]TJ
//
//  É a terceira tabela do projeto que só se lê assim — ver as Tab. 3-9 e
//  3-4 em docs/materiais-especiais.md e a Tab. 3-12 do Heróis.
//
//  ── ⚠ O BURACO DA LINHA "CONSTRUTO" É DO LIVRO ───────────────────
//  Na linha do construto o livro imprime carapaça 1-2, fonte 3 e sucata
//  **6** — e deixa o 4 e o 5 sem nada. Todas as outras cinco linhas
//  cobrem 1–6 sem falha. Conferido três vezes: no texto, no `-layout` e
//  no array `TJ` acima, onde a última célula é literalmente `(6)` e a
//  distância até ela (-4278) é a mesma da coluna de sucata das outras
//  linhas. NÃO foi "consertado" para 4-6: o que está aqui é o que o
//  livro imprime, e a aba avisa o que fazer quando o d6 cai no vão (o
//  próprio texto manda escolher o recurso como método principal — rolar
//  é a alternativa).
// ════════════════════════════════════════════════════════════════════
window.GA_RECURSOS_NATURAIS = (function () {
  'use strict';

  /* ── OS SETE RECURSOS (Ameaças de Arton, p. 401–402) ──────────────
     `valePatamar` diz se a Tabela 3-6 (valor/qualidade por patamar) se
     aplica: ela fala de "recursos que podem ser empregados como
     matéria-prima", e dois recursos têm escala própria — o ingrediente
     serve "independente de seu patamar" e o mantimento se mede em
     refeições, não em T$. */
  const RECURSOS = [
    { chave: 'carapaca', nome: 'Carapaça', icone: '🐚', valePatamar: true,
      vira: 'couraças, lorigas segmentadas, meias armaduras, armaduras completas e escudos pesados',
      texto: 'Diversos tipos de carapaças servem como matéria-prima para couraças, lorigas segmentadas, meias armaduras, armaduras completas e escudos pesados. Esses itens contam como itens naturais para devotos de Allihanna, mas são mais frágeis que metal; cada vez que você sofre um acerto crítico, há 10% (1 em 1d10) de chance de que o item seja destruído. Um item mágico ou feito inteiramente de peças de uma criatura lenda não sofre esse efeito.' },

    { chave: 'couro', nome: 'Couro', icone: '🟤', valePatamar: true,
      vira: 'armaduras acolchoadas, armaduras de couro, gibões de peles e escudos leves',
      texto: 'Serve como matéria-prima para armaduras acolchoadas, armaduras de couro, gibões de peles e escudos leves. Ao fabricar uma versão mágica desses itens, você pode gastar 10 peças de couro de lendas para reduzir o custo do item em –1 PM.' },

    { chave: 'fonte', nome: 'Fonte', icone: '✨', valePatamar: true,
      vira: 'itens esotéricos',
      texto: 'Das penas de uma fênix às presas de um vampiro, várias criaturas carregam uma fagulha mística que pode ser usada como matéria-prima de itens esotéricos. Além disso, ao fabricar um acessório mágico, você pode gastar 10 fontes de lendas para reduzir o custo do item em –1 PM.' },

    { chave: 'ingrediente', nome: 'Ingrediente', icone: '🧪', valePatamar: false,
      vira: 'itens alquímicos e poções mágicas',
      texto: 'Diversas criaturas produzem substâncias que podem ser empregadas como ingredientes para itens alquímicos e poções mágicas, independente de seu patamar.' },

    { chave: 'mantimento', nome: 'Mantimento', icone: '🍖', valePatamar: false,
      vira: 'alimento — cada porção alimenta quatro pessoas',
      texto: 'Carne, leite, ovos e outros materiais podem ser usados como alimentos. Cada porção alimenta quatro pessoas; mantimentos de uma criatura iniciante contam como uma refeição comum, de uma criatura veterana ou campeã contam como um prato especial (determinado pelo mestre) e de uma criatura lenda contam como dois pratos especiais (com efeitos cumulativos).' },

    { chave: 'osso', nome: 'Osso', icone: '🦴', valePatamar: true,
      vira: 'armas',
      texto: 'Ossos das mais variadas partes de criaturas servem como matéria-prima de armas. Peças de patamar veterano também podem ser usadas nas melhorias espinhoso ou macabro. Além disso, ao fabricar uma maça do terror ou um item tumular ou assustador, você pode gastar 10 peças de osso de lendas para reduzir o custo do item em –1 PM.' },

    { chave: 'sucata', nome: 'Sucata', icone: '⚙', valePatamar: true,
      vira: 'engenhocas e itens de metal',
      texto: 'Partes de golens e outras criaturas artificiais servem como matéria-prima de engenhocas e itens de metal. Além disso, quando fabrica uma engenhoca, você pode gastar uma peça de sucata para receber um bônus no teste de Ofício (cumulativo com bônus de outros itens), conforme o patamar da criatura: veterano, +2; campeão, +5; lenda, +10.' },
  ];

  /* ── TABELA 3-5: RECURSOS NATURAIS ────────────────────────────────
     Uma linha por tipo de criatura, com as faixas do d6. As colunas da
     tabela impressa são carapaça, couro, fonte, ingrediente,
     mantimento, osso e sucata; aqui só entram as células que têm faixa
     (as outras o livro imprime como travessão). */
  const TIPOS = [
    { chave: 'animal',     nome: 'Animal',
      faixas: [['carapaca', 1, 1], ['couro', 2, 3], ['mantimento', 4, 5], ['osso', 6, 6]] },

    { chave: 'construto',  nome: 'Construto',
      // ⚠ 4 e 5 ficam sem nada: é assim que o livro imprime (ver o cabeçalho).
      faixas: [['carapaca', 1, 2], ['fonte', 3, 3], ['sucata', 6, 6]] },

    { chave: 'espirito',   nome: 'Espírito',
      nota: 'Use esta linha para criaturas incorpóreas de qualquer tipo.',
      faixas: [['fonte', 1, 3], ['ingrediente', 4, 6]] },

    { chave: 'humanoide',  nome: 'Humanoide',
      faixas: [['carapaca', 1, 1], ['couro', 2, 2], ['fonte', 3, 3], ['mantimento', 4, 4], ['osso', 5, 6]] },

    { chave: 'monstro',    nome: 'Monstro',
      faixas: [['carapaca', 1, 1], ['couro', 2, 2], ['fonte', 3, 3], ['ingrediente', 4, 4],
               ['mantimento', 5, 5], ['osso', 6, 6]] },

    { chave: 'mortoVivo',  nome: 'Morto-vivo',
      faixas: [['carapaca', 1, 1], ['fonte', 2, 3], ['osso', 4, 6]] },
  ];

  /* ── TABELA 3-6: TIPOS DE RECURSOS NATURAIS ───────────────────────
     O valor e o grau de qualidade do que se fabrica com a matéria-prima,
     pelo patamar da ameaça de onde ela saiu. Campeão e Lenda dão os dois
     "itens mágicos" — a diferença está no valor. */
  const PATAMARES = [
    { id: 'iniciante', nome: 'Iniciante', valor: 20,   qualidade: 'itens normais' },
    { id: 'veterano',  nome: 'Veterano',  valor: 100,  qualidade: 'itens superiores' },
    { id: 'campeao',   nome: 'Campeão',   valor: 500,  qualidade: 'itens mágicos' },
    { id: 'lenda',     nome: 'Lenda',     valor: 2500, qualidade: 'itens mágicos' },
  ];

  /* ── QUANTIDADE PELO TAMANHO ──────────────────────────────────────
     "criaturas Pequenas e Médias fornecem 1 unidade do recurso,
     criaturas Grandes e Enormes fornecem 2 unidades e criaturas
     Colossais fornecem 5 unidades. Criaturas Minúsculas são muito
     pequenas para produzir recursos." */
  const UNIDADES = {
    'minusculo': 0, 'pequeno': 1, 'medio': 1,
    'grande': 2, 'enorme': 2, 'colossal': 5,
  };

  // A chave é sem acento (a linha de tipo de três fichas vem sem), mas o
  // que aparece na tela tem de ser o nome como o livro escreve.
  const TAMANHO_NOME = {
    'minusculo': 'Minúsculo', 'pequeno': 'Pequeno', 'medio': 'Médio',
    'grande': 'Grande', 'enorme': 'Enorme', 'colossal': 'Colossal',
  };

  function semAcento(s) {
    return String(s == null ? '' : s).normalize('NFD').replace(/\p{M}/gu, '').toLowerCase().trim();
  }

  /* ── LER A LINHA DE TIPO DA FICHA ─────────────────────────────────
     A ficha traz uma linha só: "Morto-vivo Médio", "Monstro (dragão)
     Enorme", "Humanoide (goblin) Pequeno", "Espirito (elemental) Médio"
     (sem acento numas três). O primeiro nome é a linha da Tabela 3-5 e o
     último, o tamanho — o parêntese do meio é o subtipo, que a tabela
     ignora. */
  function lerTipo(linha) {
    const s = semAcento(linha).replace(/\([^)]*\)/g, ' ').replace(/\s+/g, ' ').trim();
    const tam = (s.match(/\b(minusculo|minuscula|pequeno|pequena|medio|media|grande|enorme|colossal)\b/) || [])[1] || '';
    let tipo = '';
    // "Morta-viva (osteon) Média" existe: a Rainha Euphana, no Guia de
    // NPCs. O livro flexiona o tipo em gênero, então o teste aceita os dois.
    if (/^mort[oa]-?\s?viv[oa]/.test(s)) tipo = 'mortoVivo';
    else if (/^animal/.test(s))     tipo = 'animal';
    else if (/^construto/.test(s))  tipo = 'construto';
    else if (/^espirito/.test(s))   tipo = 'espirito';
    else if (/^humanoide/.test(s))  tipo = 'humanoide';
    else if (/^monstro/.test(s))    tipo = 'monstro';
    // o tamanho é guardado na forma do livro, sem a flexão de gênero
    const tamNorm = tam.replace(/a$/, 'o');
    return {
      tipo: tipo || '',
      tipoNome: tipo ? TIPOS.find(t => t.chave === tipo).nome : '',
      tamanho: tamNorm,
      tamanhoNome: TAMANHO_NOME[tamNorm] || '',
      unidades: tamNorm in UNIDADES ? UNIDADES[tamNorm] : null,
    };
  }

  /* ── PATAMAR DO ND ────────────────────────────────────────────────
     Usa a tabela de patamares da ⚗ Criar Ameaça quando ela está
     carregada (é a mesma do livro, e assim existe uma verdade só); o
     fallback cobre as páginas que não carregam aquele arquivo. */
  function patamarDe(nd) {
    const s = String(nd == null ? '' : nd).trim();
    const D = window.GA_CRIAR_AMEACA;
    if (D && D.ND_PATAMAR && D.ND_PATAMAR[s]) {
      return PATAMARES.find(p => p.id === D.ND_PATAMAR[s]) || null;
    }
    if (/^S\+?$/i.test(s)) return PATAMARES[3];
    const n = parseFloat(s.replace(',', '.').replace(/^1\/4$/, '0.25').replace(/^1\/2$/, '0.5'));
    if (!isFinite(n)) return null;
    if (n <= 4)  return PATAMARES[0];
    if (n <= 10) return PATAMARES[1];
    if (n <= 16) return PATAMARES[2];
    return PATAMARES[3];
  }

  // "exigem uma hora de trabalho e um sucesso em um teste de
  // Sobrevivência ou de um Ofício relacionado ao recurso, com CD 15 + ND
  // da criatura". ND S e S+ não têm número: aí não há CD para calcular.
  function cdExtrair(nd) {
    const s = String(nd == null ? '' : nd).trim();
    if (/^S\+?$/i.test(s)) return null;
    const n = parseFloat(s.replace(',', '.').replace(/^1\/4$/, '0.25').replace(/^1\/2$/, '0.5'));
    if (!isFinite(n)) return null;
    return 15 + Math.floor(n);
  }

  function recurso(chave) { return RECURSOS.find(r => r.chave === chave) || null; }
  function tipo(chave)    { return TIPOS.find(t => t.chave === chave) || null; }

  // As faixas de uma linha, já com o recurso resolvido e o rótulo do d6.
  function faixasDe(tipoChave) {
    const t = tipo(tipoChave);
    if (!t) return [];
    return t.faixas.map(([rc, de, ate]) => ({
      recurso: recurso(rc), de, ate,
      rotulo: de === ate ? String(de) : de + '-' + ate,
    }));
  }

  // Os números do d6 que a linha deixa sem recurso (só o construto tem).
  function vaosDe(tipoChave) {
    const cobertos = new Set();
    for (const f of faixasDe(tipoChave)) for (let i = f.de; i <= f.ate; i++) cobertos.add(i);
    const vaos = [];
    for (let i = 1; i <= 6; i++) if (!cobertos.has(i)) vaos.push(i);
    return vaos;
  }

  // Rola 1d6 na linha. `recurso: null` = caiu num vão do livro.
  function sortear(tipoChave) {
    const d6 = Math.floor(Math.random() * 6) + 1;
    const f = faixasDe(tipoChave).find(x => d6 >= x.de && d6 <= x.ate);
    return { d6, recurso: f ? f.recurso : null };
  }

  /* ── A FICHA JÁ TEM RECURSO ESPECIAL? ─────────────────────────────
     "Recursos naturais podem ser incluídos em qualquer criatura que já
     não possua um recurso especial." Quem já tem traz isso na linha de
     Tesouro, e a marca é sempre a mesma: a CD para extrair ("1d4 doses
     de veneno batráquio (CD 17 para extrair)"). É pista, não trava — a
     aba mostra o bloco de todo modo e avisa, porque a decisão de
     complementar ou substituir o tesouro é do mestre. */
  function recursoEspecialDe(texto) {
    const linha = (String(texto || '').match(/^Tesouro[^\n]*/m) || [])[0];
    if (!linha) return null;
    if (!/para\s+extrair/i.test(linha)) return null;
    return linha.replace(/^Tesouro\s*/, '').trim();
  }

  /* ── TUDO O QUE O CARD PRECISA, DE UMA FICHA ──────────────────────
     Devolve null quando a regra não se aplica: ficha sem linha de tipo
     reconhecível, ou criatura Minúscula ("muito pequena para produzir
     recursos"). */
  function daFicha(f) {
    if (!f) return null;
    const t = lerTipo(f.tipo);
    if (!t.tipo) return null;
    return {
      tipo: t.tipo, tipoNome: t.tipoNome,
      tamanho: t.tamanho, tamanhoNome: t.tamanhoNome,
      unidades: t.unidades,
      minuscula: t.unidades === 0,
      nd: String(f.nd == null ? '' : f.nd).trim(),
      cd: cdExtrair(f.nd),
      patamar: patamarDe(f.nd),
      faixas: faixasDe(t.tipo),
      vaos: vaosDe(t.tipo),
      notaDoTipo: (tipo(t.tipo) || {}).nota || '',
      especial: recursoEspecialDe(f.texto),
    };
  }

  /* ── AS DUAS TABELAS, PRONTAS PARA DESENHAR ───────────────────────
     Mesmo formato das tabelas da aba 🔨 Criação de Itens:
     { cab: [...], linhas: [[...]] }. */
  function tabela35() {
    const cab = ['Tipo de criatura (1d6)'].concat(RECURSOS.map(r => r.nome));
    const linhas = TIPOS.map(t => {
      const porRec = {};
      for (const f of faixasDe(t.chave)) porRec[f.recurso.chave] = f.rotulo;
      return [t.nome + (t.nota ? '*' : '')]
        .concat(RECURSOS.map(r => porRec[r.chave] || '—'));
    });
    return { cab, linhas };
  }

  function tabela36() {
    return {
      cab: ['Patamar da ameaça', 'Valor / Qualidade'],
      linhas: PATAMARES.map(p => [
        p.nome, 'T$ ' + p.valor.toLocaleString('pt-BR') + ' para ' + p.qualidade,
      ]),
    };
  }

  return {
    RECURSOS, TIPOS, PATAMARES, UNIDADES,
    lerTipo, patamarDe, cdExtrair, recurso, tipo,
    faixasDe, vaosDe, sortear, recursoEspecialDe, daFicha,
    tabela35, tabela36,
  };
})();
