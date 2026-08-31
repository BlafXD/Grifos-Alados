// ═══════════════════════════════════════════════════════════════════
//  CRIAR-AMEACA.JS — Aba "⚗ Criar Ameaça"
//  A oficina do "Manual de Criação de Ameaças" (Ameaças de Arton,
//  Capítulo 2, p. 377–389): os oito passos do livro, com as Tabelas
//  2-2, 2-3 A/B/C e 2-4 aplicadas sozinhas, mais as ameaças que o
//  mestre criou (adicionar, editar, duplicar e remover).
//
//  A aba trabalha de três modos. "Nova" são os oito passos, do zero.
//  "Modificada" (p. 387) e "Bando" (p. 387–389) partem de uma
//  CRIATURA-BASE — uma ficha dos bestiários ou outra ameaça criada
//  aqui — e guardam a diferença dela para a linha da Tabela 2-3 do
//  ND original. É essa diferença que o livro manda preservar ao
//  mudar o ND ("anote as diferenças […] e mantenha as diferenças").
//
//  Lê window.GA_CRIAR_AMEACA (tabelas) e window.GA_CRIAR_AMEACA_MANUAL
//  (texto do manual + biblioteca de habilidades). Desenha o statblock
//  com window.GA_Statblock, o mesmo das Fichas Prontas.
//
//  As referências a outras páginas/livros viram nuvem de regra
//  (span.ga-tip): passar o mouse mostra a regra sem abrir o outro livro.
//
//  Guarda tudo em localStorage['grifosAlados.criarAmeaca'].
// ═══════════════════════════════════════════════════════════════════
(function () {
  'use strict';

  const CHAVE = 'grifosAlados.criarAmeaca';

  const esc = window.GA_esc;

  // Os dois arquivos de dados entram ANTES deste no index.html, então já
  // dá para resolvê-los aqui — é o que deixa window.GA_CriarAmeaca (lá no
  // fim) funcionar mesmo em páginas que não desenham a aba.
  let D = window.GA_CRIAR_AMEACA || null;            // tabelas
  let M = window.GA_CRIAR_AMEACA_MANUAL || null;     // texto do manual

  // ═══════════════════════════════════════════════════════════════
  //  ARMAZENAMENTO
  // ═══════════════════════════════════════════════════════════════
  let dados = { criaturas: [], atual: null };

  function carregar() {
    try {
      const txt = localStorage.getItem(CHAVE);
      if (txt) {
        const d = JSON.parse(txt);
        if (d && Array.isArray(d.criaturas)) dados = d;
      }
    } catch (e) {
      console.warn('[criar-ameaca] não foi possível carregar:', e.message);
    }
    // um backup editado à mão pode trazer buraco na lista; descarta em vez
    // de estourar no normalizar()
    dados.criaturas = dados.criaturas.filter(function (c) {
      return c && typeof c === 'object';
    });
    dados.criaturas.forEach(normalizar);
    if (!dados.criaturas.length) {
      const c = nova();
      dados.criaturas.push(c);
      dados.atual = c.id;
    }
    if (!criaturaAtual()) dados.atual = dados.criaturas[0].id;
  }

  let _timerSalvar = null;
  function salvar() {
    clearTimeout(_timerSalvar);
    _timerSalvar = setTimeout(salvarAgora, 400);
  }
  function salvarAgora() {
    clearTimeout(_timerSalvar);
    const c = criaturaAtual();
    if (c) c.alteradoEm = Date.now();
    try { localStorage.setItem(CHAVE, JSON.stringify(dados)); }
    catch (e) { console.warn('[criar-ameaca] não foi possível salvar:', e.message); }
  }

  let _seq = 0;
  function uid(p) { return (p || 'x') + Date.now().toString(36) + (_seq++).toString(36); }

  // ── Criatura em branco ────────────────────────────────────────────
  function nova() {
    return {
      id: uid('ca'),
      criadoEm: Date.now(), alteradoEm: Date.now(),
      nome: '', conceito: '', funcao: '',
      tipo: 'monstro', subtipo: '', tamanho: 'medio', papel: 'solo', nd: '1',
      forma: 'bipede', ritmo: 'normal', deslTerrestre: '', semTerrestre: false,
      deslExtras: [],
      ajustes: { defesa: 0, pv: 0, ataque: 0, dano: 0, cd: 0, resForte: 0, resMedia: 0, resFraca: 0 },
      resDistrib: { fort: 'resForte', ref: 'resMedia', von: 'resFraca' },
      usaPM: false, pmManual: '',
      sentidos: '', defesasExtra: '',
      iniciativaTreinada: false, iniciativaExtra: 0,
      percepcaoTreinada: false, percepcaoExtra: 0,
      ataques: [], habilidades: [], pericias: [],
      atributos: { for: 0, des: 0, con: 0, int: 0, sab: 0, car: 0 },
      equipamento: '', tesouro: 'padrao', tesouroObs: '', parceiro: '', notas: '',

      // ── Criatura derivada (p. 387–389) ───────────────────────────
      // 'nova' = os oito passos, do zero. 'modificada' e 'bando' partem
      // de uma criatura-base; veja o cabeçalho do arquivo.
      modo: 'nova',
      base: null,     // { livro, chave, nome, nd, papel, tamanho, cd, dano }
      deltas: null,   // desvio em PONTOS da linha do ND da criatura-base
      bando: null,    // { quantidade, faixa, multAplicado }
    };
  }

  // Um delta zerado para cada coluna da Tabela 2-3.
  function deltasZero() {
    const z = {};
    D.PARAM_COLUNAS.forEach(function (col) { z[col.chave] = 0; });
    return z;
  }
  function bandoNovo() {
    return { quantidade: '', faixa: '', multAplicado: 1, habsMult: 1, tamanhoAplicado: '' };
  }

  // Completa campos que uma criatura salva por uma versão anterior possa
  // não ter — assim uma coleção antiga nunca quebra a aba.
  function normalizar(c) {
    const base = nova();
    Object.keys(base).forEach(function (k) {
      if (c[k] === undefined) c[k] = base[k];
    });
    ['ajustes', 'resDistrib', 'atributos'].forEach(function (k) {
      c[k] = Object.assign({}, base[k], c[k] || {});
    });
    ['deslExtras', 'ataques', 'habilidades', 'pericias'].forEach(function (k) {
      if (!Array.isArray(c[k])) c[k] = [];
    });
    c.ataques.forEach(function (a) { if (!a.id) a.id = uid('at'); });
    c.habilidades.forEach(function (h) { if (!h.id) h.id = uid('hb'); });
    c.pericias.forEach(function (p) { if (!p.id) p.id = uid('pe'); });

    // criatura derivada: modo válido, delta completo, bando presente
    if (['nova', 'modificada', 'bando'].indexOf(c.modo) < 0) c.modo = 'nova';
    if (c.modo === 'nova') { c.base = null; c.deltas = null; c.bando = null; }
    if (c.deltas) c.deltas = Object.assign(deltasZero(), c.deltas);
    if (c.modo === 'bando') c.bando = Object.assign(bandoNovo(), c.bando || {});
    return c;
  }

  function criaturaAtual() {
    return dados.criaturas.find(function (c) { return c.id === dados.atual; }) || null;
  }

  // ═══════════════════════════════════════════════════════════════
  //  REGRAS DO MANUAL — as contas que a aba faz sozinha
  // ═══════════════════════════════════════════════════════════════

  // Linha da Tabela 2-3 (papel + ND) já com nomes de coluna.
  function parametros(papel, nd) {
    const linha = (D.PARAMETROS[papel] || D.PARAMETROS.solo)[nd];
    const out = {};
    D.PARAM_COLUNAS.forEach(function (col, i) { out[col.chave] = linha ? linha[i] : 0; });
    return out;
  }

  // "Ajustar cada estatística para o valor de 1 ou 2 ND a mais ou a
  // menos" (Passo 3): anda `delta` linhas na tabela, sem sair dela.
  function ndComDelta(nd, delta) {
    const i = D.NDS.indexOf(nd);
    if (i < 0) return nd;
    return D.NDS[Math.max(0, Math.min(D.NDS.length - 1, i + (delta || 0)))];
  }

  // Desvio em PONTOS herdado da criatura-base (0 numa ameaça nova).
  function pontos(c, chave) {
    return c.deltas ? (parseInt(c.deltas[chave], 10) || 0) : 0;
  }

  // Estatísticas finais da criatura. Três camadas, nesta ordem:
  //   1. a linha da Tabela 2-3 do papel e do ND;
  //   2. o ajuste de ±1/±2 ND do Passo 3 (anda na tabela, sem sair dela);
  //   3. o delta em PONTOS herdado da criatura-base (p. 387: "modifique
  //      as estatísticas de sua criatura para as do novo ND e mantenha as
  //      diferenças").
  function stats(c) {
    const out = {};
    D.PARAM_COLUNAS.forEach(function (col) {
      const nd = ndComDelta(c.nd, c.ajustes[col.chave] || 0);
      const pts = pontos(c, col.chave);
      out[col.chave] = parametros(c.papel, nd)[col.chave] + pts;
      out[col.chave + 'Nd'] = nd;
      out[col.chave + 'Pts'] = pts;
    });
    return out;
  }

  function ndNum(nd) { return D.ND_NUMERO[nd] != null ? D.ND_NUMERO[nd] : 1; }
  function patamarDe(nd) {
    const id = D.ND_PATAMAR[nd];
    return D.PATAMARES.find(function (p) { return p.id === id; }) || D.PATAMARES[0];
  }
  function papelDe(id) { return D.PAPEIS.find(function (p) { return p.id === id; }) || D.PAPEIS[0]; }
  function tamanhoDe(id) { return D.TAMANHOS.find(function (t) { return t.id === id; }) || D.TAMANHOS[2]; }
  function tipoDe(id) { return D.TIPOS.find(function (t) { return t.id === id; }) || D.TIPOS[4]; }

  // Cota de habilidades do Passo 5: de 1 a 2 por patamar (solo/lacaio),
  // de 2 a 3 (especial). "Uma ameaça solo de patamar campeão teria de
  // três a seis habilidades" — o multiplicador é a ordem do patamar.
  function cotaHabilidades(c) {
    const pap = papelDe(c.papel), pat = patamarDe(c.nd);
    return { min: pap.habs[0] * pat.ordem, max: pap.habs[1] * pat.ordem };
  }

  // Tabela 2-2 — linha de deslocamento para uma forma e um tamanho.
  function linhaDeslocamento(id, tamanhoId) {
    const porte = tamanhoDe(tamanhoId).porte;
    const todas = D.DESLOCAMENTOS.terrestre.concat(D.DESLOCAMENTOS.outros);
    return todas.find(function (l) {
      return l.id === id && (l.porte === '*' || l.porte === porte);
    }) || null;
  }
  function deslocamentoAuto(c) {
    const l = linhaDeslocamento(c.forma, c.tamanho);
    return l ? l[c.ritmo] || l.normal : '';
  }
  // Deslocamento especial: valor da tabela se for a forma PRINCIPAL de
  // movimento; senão, "um pouco menor que o deslocamento base (3m a
  // menos é um bom valor)".
  function deslocamentoExtraAuto(c, ex) {
    if (ex.principal) {
      const l = linhaDeslocamento(ex.id, c.tamanho);
      return l ? l[c.ritmo] || l.normal : '';
    }
    const base = metros(c.deslTerrestre || deslocamentoAuto(c));
    if (base == null) return '';
    return fmtMetros(Math.max(1.5, base - 3));
  }

  function metros(txt) {
    const m = String(txt || '').replace(',', '.').match(/([\d.]+)/);
    return m ? parseFloat(m[1]) : null;
  }
  function fmtMetros(v) {
    const s = (Math.round(v * 10) / 10).toString().replace('.', ',');
    return s + 'm';
  }
  // "9m" → "9m (6q)" — quadrados de 1,5m, como o livro imprime.
  function comQuadrados(txt) {
    const v = metros(txt);
    if (v == null) return String(txt || '');
    const q = Math.round(v / 1.5);
    return fmtMetros(v) + ' (' + q + 'q)';
  }

  // ── Dano: a conta do Passo 3 ─────────────────────────────────────
  //  "Some o menor resultado possível ao maior e divida por dois,
  //  arredondando para baixo." Com bônus inteiro isso é
  //  floor(Σ(N + N·X) / 2) + bônus.
  function dadosDe(txt) {
    const out = [];
    String(txt || '').replace(/(\d*)\s*d\s*(\d+)/gi, function (_, n, f) {
      out.push({ n: parseInt(n || '1', 10), f: parseInt(f, 10) });
      return '';
    });
    return out;
  }
  function mediaDados(txt) {
    const ds = dadosDe(txt);
    if (!ds.length) return 0;
    let min = 0, max = 0;
    ds.forEach(function (d) { min += d.n; max += d.n * d.f; });
    return Math.floor((min + max) / 2);
  }
  // Dano médio de um ataque completo (dados + extras + bônus).
  function mediaAtaque(a) {
    return mediaDados(String(a.dados || '') + ' ' + String(a.extra || '')) + (parseInt(a.bonus, 10) || 0);
  }
  // Ataques que entram na conta do dano médio por rodada (os
  // complementares usam a linha de 2 ND abaixo e ficam de fora).
  function ataquesPrincipais(c) {
    return c.ataques.filter(function (a) { return !a.secundario; });
  }
  function golpesPorRodada(c) {
    return ataquesPrincipais(c).reduce(function (s, a) { return s + (parseInt(a.qtd, 10) || 1); }, 0);
  }
  function danoPorGolpe(c) {
    const n = golpesPorRodada(c);
    if (!n) return 0;
    return Math.ceil(stats(c).dano / n);   // o livro arredonda para cima
  }
  function danoTotalAtual(c) {
    return ataquesPrincipais(c).reduce(function (s, a) {
      return s + mediaAtaque(a) * (parseInt(a.qtd, 10) || 1);
    }, 0);
  }
  // Bônus que falta para o ataque bater o dano por golpe.
  function bonusSugerido(c, a) {
    return danoPorGolpe(c) - mediaDados(String(a.dados || '') + ' ' + String(a.extra || ''));
  }
  // O dano por golpe é arredondado PARA CIMA (é o que o livro faz com o
  // dejeto vivo: 56 ÷ 3 = 19 por golpe, somando 57). Então a soma certa
  // não é um número só, é a faixa [alvo, alvo + golpes − 1].
  function danoConfere(c) {
    const golpes = golpesPorRodada(c);
    if (!golpes) return true;
    const dif = danoTotalAtual(c) - stats(c).dano;
    return dif >= 0 && dif < golpes;
  }

  // ── Perícias: ½ ND + atributo + treinamento + extra ──────────────
  function valorPericia(c, atrId, treinada, extra) {
    const n = ndNum(c.nd);
    return Math.floor(n / 2) +
           (parseInt(c.atributos[atrId], 10) || 0) +
           (treinada ? D.bonusTreinamento(n) : 0) +
           (parseInt(extra, 10) || 0);
  }
  function periciaDef(nome) {
    return D.PERICIAS.find(function (p) { return p.nome === nome; }) || null;
  }

  function pmSugerido(c) { return Math.max(1, Math.round(3 * ndNum(c.nd))); }
  function cdExtrair(c) { return 15 + Math.ceil(ndNum(c.nd)); }

  // O traço do negativo é o EN DASH "–" (U+2013), não o sinal de menos
  // "−" (U+2212): é o que as fichas dos livros usam em
  // js/fichas-*-data.js, e é o único que o parsearFicha() do monstros.js
  // reconhece. Com o U+2212 a linha "Von −1" chegava VAZIA na aba
  // Combates.
  function sinal(v) {
    const n = parseInt(v, 10) || 0;
    return (n >= 0 ? '+' : '–') + Math.abs(n);
  }
  // "3700" → "3.700": é assim que o livro imprime os PV de quatro
  // dígitos para cima (o Gatzvalith tem "Pontos de Vida 3.700").
  function milhar(v) {
    return String(v).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  // Modificador de tamanho: o livro imprime "0" no Médio, não "+0".
  function sinalZero(v) {
    return (parseInt(v, 10) || 0) === 0 ? '0' : sinal(v);
  }

  // ═══════════════════════════════════════════════════════════════
  //  CRIATURA-BASE — ler uma ficha do livro no formato desta aba
  // ═══════════════════════════════════════════════════════════════
  //  "Como Modificar Criaturas" e "Como Criar Bandos" partem de uma
  //  ficha pronta. Quem lê o statblock é o parsearFicha() do
  //  monstros.js (window.GA_Monstros.lerFicha) — o mesmo que já lê as
  //  585 fichas dos bestiários para a aba ⚔ Combates. Ele devolve a
  //  criatura no formato daquela aba, que guarda ataques e habilidades
  //  como texto corrido; aqui elas precisam vir separadas campo a
  //  campo, e é só essa separação que este trecho acrescenta (com o
  //  MESMO reconhecedor de nome de habilidade do statblock.js).

  // "–3", "−3", " +3 " → 3 / −3. O livro usa três traços diferentes.
  function inteiro(v) {
    const n = parseInt(String(v == null ? '' : v).replace(/[–—−]/g, '-').replace(/\s+/g, ''), 10);
    return isNaN(n) ? 0 : n;
  }

  // Divide por vírgula SEM cortar dentro de parênteses nem no meio de um
  // decimal: "4d4+12 corte, x2, mais 1d8 ácido" tem três partes, mas
  // "(+14 para nadar)" tem uma e "alcance 4,5m" também.
  function partesPorVirgula(txt) {
    const s = String(txt || '');
    const out = [];
    let nivel = 0, atual = '';
    s.split('').forEach(function (ch, i) {
      if (ch === '(') nivel++;
      else if (ch === ')') nivel = Math.max(0, nivel - 1);
      const decimal = /\d/.test(s[i - 1] || '') && /\d/.test(s[i + 1] || '');
      if (ch === ',' && nivel === 0 && !decimal) { out.push(atual); atual = ''; return; }
      atual += ch;
    });
    out.push(atual);
    return out.map(function (s) { return s.trim(); }).filter(Boolean);
  }

  // Desloca todo "+N"/"–N" de um texto livre por `delta`. É o que o livro
  // faz com a observação da perícia ao mudar o ND: o aquin'ne tem
  // "Atletismo +6 (+14 para nadar)" e o cardume, "+7 (+15 para nadar)".
  function deslocarBonus(txt, delta) {
    if (!delta) return String(txt || '');
    return String(txt || '').replace(/([+\-–−])(\d+)/g, function (_, sg, n) {
      return sinal((sg === '+' ? 1 : -1) * parseInt(n, 10) + delta);
    });
  }

  // Tipo, subtipo e tamanho a partir de "Espírito (elemental) Pequeno".
  const _TIPO_RE = [
    [/\bAnima(?:l|is)\b/i, 'animal'], [/\bConstru/i, 'construto'],
    [/\bEsp[íi]rito/i, 'espirito'], [/\bHumanoide/i, 'humanoide'],
    [/\bMort[oa]s?[- ]?viv[oa]s?\b/i, 'morto-vivo'], [/\bMonstro/i, 'monstro'],
  ];
  const _TAM_RE = [
    [/Min[úu]scul[oa]/i, 'minusculo'], [/Pequen[oa]/i, 'pequeno'], [/M[ée]di[oa]/i, 'medio'],
    [/Grande/i, 'grande'], [/Enorme/i, 'enorme'], [/Colossal/i, 'colossal'],
  ];
  function lerTipoTamanho(txt) {
    const t = String(txt || '');
    const out = { tipo: 'monstro', subtipo: '', tamanho: 'medio' };
    const msub = t.match(/\(([^)]*)\)/);
    if (msub) out.subtipo = msub[1].trim();
    _TIPO_RE.some(function (p) { if (p[0].test(t)) { out.tipo = p[1]; return true; } return false; });
    _TAM_RE.some(function (p) { if (p[0].test(t)) { out.tamanho = p[1]; return true; } return false; });
    return out;
  }

  // "For 4, Des 2, Con 2, Int –2, Sab 2, Car –2" → { for: 4, des: 2, … }
  function lerAtributos(txt) {
    const out = {};
    D.ATRIBUTOS.forEach(function (a) {
      const m = String(txt || '').match(new RegExp('\\b' + a.curto + '\\s+([+\\-–−]?\\d+)', 'i'));
      out[a.id] = m ? inteiro(m[1]) : 0;
    });
    return out;
  }

  // Uma linha de ataque pode trazer vários ataques colados por " e ":
  // "Mordida +18 (1d10+12) e duas garras +18 (1d8+12)". O "e" também
  // aparece DENTRO de um ataque ("Garras e presas +12"), então o corte só
  // vale onde os dois lados têm bônus próprio.
  function partirAtaques(txt) {
    const out = [];
    const temBonus = function (p) { return /[+\-–−]\s*\d/.test(p); };
    String(txt || '').split(/\s+e\s+/).forEach(function (p) {
      if (out.length && !temBonus(p)) { out[out.length - 1] += ' e ' + p; return; }
      out.push(p);
    });
    // o primeiro pedaço sem bônus é começo de nome, não ataque
    for (let i = 0; i < out.length - 1;) {
      if (!temBonus(out[i])) { out[i + 1] = out[i] + ' e ' + out[i + 1]; out.splice(i, 1); }
      else i++;
    }
    return out.filter(function (p) { return p.trim(); });
  }

  // Um ataque do statblock: "Tentáculo hídrico x2 +13 (2d4+6 corte)".
  // Devolve o ataque no formato da aba MAIS o valor de ataque lido, que
  // não mora no ataque (vem da Tabela 2-3, pelo ND).
  function lerAtaque(txt, alcance) {
    // O último grupo é a prosa que algumas fichas põem DEPOIS do dano
    // ("(3d8+6 trevas). Uma criatura viva atingida deve fazer…", da
    // Aparição) — sem ele o ataque inteiro não casava e sumia.
    //
    // Duas tentativas, e a ordem importa: o valor de ataque vem SEMPRE
    // depois de um espaço, e exigir isso é o que impede o "+1" de
    // "1d4+1 tentáculos +17" (o tigre-de-hyninn conta os tentáculos com
    // um dado) de ser confundido com o bônus. Só quando não há nenhum
    // sinal precedido de espaço é que vale o colado — é o caso da
    // "Adaga+12" do pistoleiro, que o livro imprime sem espaço.
    const t = String(txt || '');
    const m = t.match(/^(.*?\S)\s+([+\-–−]\s*\d+)\s*(?:\(([^)]*)\))?\s*(.*)$/) ||
              t.match(/^(.*?)\s*([+\-–−]\s*\d+)\s*(?:\(([^)]*)\))?\s*(.*)$/);
    if (!m) return null;
    let nome = m[1].trim(), qtd = 1;
    const mq = nome.match(/\s*x\s*(\d+)\s*$/i);
    if (mq) { qtd = parseInt(mq[1], 10) || 1; nome = nome.slice(0, mq.index).trim(); }

    const partes = partesPorVirgula(m[3] || '');
    const dano = partes.shift() || '';
    let dados = '', bonus = 0, tipo = '', colado = false;
    const extra = [];
    const md = dano.match(/^(\d*d\d+(?:\s*[+\-–−]\s*\d+)?)\s*(.*)$/i);
    if (md) {
      const mb = md[1].replace(/\s+/g, '').match(/^(\d*d\d+)([+\-–−]\d+)?$/i);
      dados = mb ? mb[1] : md[1].replace(/\s+/g, '');
      bonus = mb && mb[2] ? inteiro(mb[2]) : 0;
      // "corte" é tipo de dano; "mais 4d6 ácido" (o bulette escreve sem
      // vírgula) é dano EXTRA, e precisa sair daqui para entrar na média
      let resto = md[2].trim();
      const mt = resto.match(/^([a-zà-ÿ]+)\s+(.*)$/i);
      if (mt && D.TIPOS_DANO.indexOf(mt[1].toLowerCase()) >= 0) {
        tipo = mt[1];
        resto = mt[2].trim();
      } else if (!/\d*\s*d\s*\d/i.test(resto)) {
        tipo = resto;
        resto = '';
      }
      if (resto) { extra.push(resto); colado = true; }
    } else {
      tipo = dano;
    }
    let critico = '';
    partes.forEach(function (p) {
      if (/^(?:\d+\s*\/\s*)?x\s*\d+$/i.test(p)) critico = p;
      else extra.push(p);
    });
    return {
      ataque: { id: uid('at'), nome: nome || 'Ataque', qtd: qtd, alcance: alcance,
                dados: dados, bonus: bonus, tipo: tipo, critico: critico,
                extra: extra.join(', '), extraColado: colado, secundario: false,
                depois: String(m[4] || '').replace(/^\s*\.\s*/, '').replace(/\s*\.\s*$/, '').trim() },
      valorAtaque: inteiro(m[2]),
    };
  }

  // Uma habilidade do statblock: "Agarrar Aprimorado (Livre) Tentáculo
  // hídrico (teste +13)." O nome sai pelo mesmo reconhecedor que o
  // statblock.js usa para negritá-lo nas fichas dos livros.
  function lerHabilidade(linha) {
    const magica = linha.indexOf('✦') === 0;
    const txt = (magica ? linha.slice(1) : linha).trim();
    const SB = window.GA_Statblock;
    const m = SB ? (txt.match(SB.RE_HABILIDADE) || txt.match(SB.RE_HAB_SIMPLES)) : null;

    let nome = '', execucao = '—', corpo = txt;
    if (m) {
      nome = m[1].trim();
      corpo = txt.slice(m[1].length).trim();
      const me = nome.match(/^(.*?)\s*\(([^)]*)\)\s*$/);
      if (me) { nome = me[1].trim(); execucao = me[2].trim(); }
    }
    // execução fora da lista do <select> ("Padrão, 2 PM") voltaria a "—" e
    // o custo em PM se perderia: devolve o parêntese para o texto.
    if (D.EXECUCOES.indexOf(execucao) < 0) {
      if (execucao !== '—') corpo = '(' + execucao + ') ' + corpo;
      execucao = '—';
    }
    return { id: uid('hb'), nome: nome || 'Habilidade', execucao: execucao,
             texto: corpo, magica: magica };
  }

  // Lê uma ficha inteira (texto no formato do livro) para o formato desta
  // aba. `papel` é obrigatório: sem ele não há linha da Tabela 2-3 para
  // comparar, e sem comparação não há delta nenhum.
  // Devolve { c, lidos, avisos } ou null.
  function lerFichaBase(texto, papel) {
    const api = window.GA_Monstros;
    if (!api || typeof api.lerFicha !== 'function') return null;
    const r = api.lerFicha(texto);
    if (!r || !r.cr) return null;
    const cr = r.cr;
    const avisos = (r.avisos || []).slice();
    const c = nova();
    const st = function (k) { return (cr.stats[k] || {}).padrao || ''; };

    c.papel = ['solo', 'lacaio', 'especial'].indexOf(papel) >= 0 ? papel : 'solo';
    c.nome = cr.nome || '';
    c.conceito = cr.descricao || '';
    if (D.NDS.indexOf(cr.nd) >= 0) {
      c.nd = cr.nd;
    } else if (cr.nd) {
      avisos.push('O ND “' + cr.nd + '” não é uma linha da Tabela 2-3 — usei ND 1.');
    }

    const tt = lerTipoTamanho(cr.tipoTamanho);
    c.tipo = tt.tipo; c.subtipo = tt.subtipo; c.tamanho = tt.tamanho;
    c.sentidos = cr.tags || '';
    c.defesasExtra = cr.condicoes || '';
    c.atributos = lerAtributos(cr.atributos);
    // "Int —" (criatura sem mente): aqui o atributo é um número, então
    // vira 0 — o mestre precisa saber que essa nuance se perdeu
    const semValor = D.ATRIBUTOS.filter(function (a) {
      return new RegExp('\\b' + a.curto + '\\s+[—–−-](?!\\s*\\d)', 'i').test(cr.atributos || '');
    }).map(function (a) { return a.curto; });
    if (semValor.length) {
      avisos.push('O livro escreve ' + semValor.join(' e ') + ' como traço (sem valor). ' +
                  'Esta ficha guarda atributos como número, então ' +
                  (semValor.length === 1 ? 'virou' : 'viraram') + ' 0.');
    }

    // deslocamento: o valor da ficha já vem com "(6q)", que o statblock()
    // recoloca sozinho — guardar os dois duplicaria os quadrados.
    const semQuadrados = function (v) { return String(v || '').replace(/\s*\([^)]*\)\s*/g, '').trim(); };
    c.deslTerrestre = semQuadrados(st('deslocamento'));
    c.semTerrestre = !c.deslTerrestre;
    [['desVoo', 'voo'], ['desEscalada', 'escalada'],
     ['desEscavacao', 'escavacao'], ['desNatacao', 'natacao']].forEach(function (p) {
      const v = semQuadrados(st(p[0]));
      if (v) c.deslExtras.push({ id: p[1], principal: false, valor: v });
    });

    const pm = st('pm');
    if (pm) { c.usaPM = true; c.pmManual = pm; }

    // ── ataques e habilidades, linha a linha do texto original ──────
    //  Aqui o texto vem SEMPRE com uma linha por linha do statblock: é
    //  assim nas bibliotecas dos livros e no statblock() desta aba, as
    //  duas únicas fontes. (O parsearFicha() cola as linhas para dar
    //  conta do Ctrl+C do PDF; por isso ataque e habilidade se separam
    //  aqui, e não lá.)
    const lidos = { defesa: null, pv: null, ataque: null, dano: null, cd: null,
                    fort: null, ref: null, von: null };
    const ROTULO = /^(Iniciativa|Defesa|Pontos de Vida|Pontos de Mana|Deslocamento|Per[íi]cias|Equipamento|Tesouro|Parceiro)\b/i;
    const ATRIB = /^For\s+[+\-–−]?(?:\d|[—–−-])/;
    const magias = [];
    let linhaTesouro = '', linhaEquip = '';
    let dentro = false;

    String(texto || '').split('\n').map(function (l) { return l.trim(); })
      .filter(Boolean).forEach(function (l) {
        // depois dos atributos o statblock ainda traz habilidades soltas
        // (o aquin’ne fecha com "Familiar …", DEPOIS do Tesouro)
        if (ATRIB.test(l)) { dentro = true; return; }
        if (/^(Pontos de Vida|Pontos de Mana|Deslocamento)\b/i.test(l)) { dentro = true; return; }
        if (/^Tesouro\b/i.test(l)) { linhaTesouro = l.replace(/^Tesouro\s*/i, ''); return; }
        if (/^Equipamento\b/i.test(l)) { linhaEquip = l.replace(/^Equipamento\s*/i, ''); return; }
        if (!dentro || ROTULO.test(l)) return;
        if (/^(Magias\b|•)/.test(l)) { magias.push(l); return; }
        if (/^(Corpo a Corpo|À Dist[âa]ncia)\b/i.test(l)) {
          const alc = /^Corpo a Corpo/i.test(l) ? 'corpo' : 'distancia';
          // a ficha da criatura-base pode JÁ ser um bando (Turba Zumbi,
          // Falange): a marca fica guardada para voltar na ficha
          if (/\[Bando\]/i.test(l)) c.marcaBando = true;
          const linhaAtk = l.replace(/^(?:Corpo a Corpo|À Dist[âa]ncia)\s*/i, '')
                            .replace(/^\[Bando\]\s*/i, '')   // o bando já é um modo daqui
                            .replace(/\s*\.\s*$/, '');
          partirAtaques(linhaAtk).forEach(function (t) {
              const a = lerAtaque(t, alc);
              if (!a) return;
              a.ataque.valorLido = a.valorAtaque;
              c.ataques.push(a.ataque);
              if (lidos.ataque == null) lidos.ataque = a.valorAtaque;
            });
          return;
        }
        c.habilidades.push(lerHabilidade(l));
      });

    if (magias.length) {
      c.habilidades.push({ id: uid('hb'), nome: 'Magias', execucao: '—',
                           texto: magias.join('\n'), magica: true });
    }

    // tesouro: a categoria quando o livro a nomeia; senão a linha inteira
    // é recurso especial ("1 dose de éter elemental (CD 17 para extrair)").
    c.equipamento = linhaEquip.replace(/\s*\.\s*$/, '');
    const tes = linhaTesouro.replace(/\s*\.\s*$/, '');
    const mCat = tes.match(/^(Nenhum|Metade|Padrão|Padrao|Dobro)\b\s*/i);
    c.tesouro = 'nenhum';
    if (mCat) {
      const cat = mCat[1].toLowerCase();
      c.tesouro = /^padr/.test(cat) ? 'padrao' : cat;
      c.tesouroObs = tes.slice(mCat[0].length).trim();
    } else if (tes) {
      c.tesouroObs = tes;
    }

    // ── estatísticas de combate lidas (a base do delta) ─────────────
    lidos.defesa = st('defesa') ? inteiro(st('defesa')) : null;
    lidos.pv     = st('pv') ? inteiro(st('pv')) : null;
    lidos.fort   = st('fortitude') ? inteiro(st('fortitude')) : null;
    lidos.ref    = st('reflexos') ? inteiro(st('reflexos')) : null;
    lidos.von    = st('vontade') ? inteiro(st('vontade')) : null;
    lidos.dano   = c.ataques.length ? danoTotalAtual(c) : null;
    // Nem todo ataque da mesma linha usa o mesmo valor: o urso-coruja
    // morde a +16 e arranha a +15. O primeiro define o valor da criatura
    // (é ele que vira delta contra a tabela); os outros guardam a
    // diferença para o próprio ataque.
    c.ataques.forEach(function (a) {
      a.ajusteAtaque = (a.valorLido != null && lidos.ataque != null)
        ? a.valorLido - lidos.ataque : 0;
      delete a.valorLido;
    });
    // a CD do livro está no texto das habilidades ("Ref CD 16 evita"); a
    // do tesouro é outra conta (15 + ND) e não entra aqui.
    c.habilidades.some(function (h) {
      const m = String(h.texto || '').match(/\bCD\s+(\d+)(?!\s*para\s+extrair)/i);
      if (m) { lidos.cd = inteiro(m[1]); return true; }
      return false;
    });

    // resistências: a maior é a "forte", a do meio a "média", a menor a
    // "fraca" — é assim que o livro distribui os três valores da tabela.
    if (lidos.fort != null && lidos.ref != null && lidos.von != null) {
      const faixas = ['resForte', 'resMedia', 'resFraca'];
      [{ q: 'fort', v: lidos.fort }, { q: 'ref', v: lidos.ref }, { q: 'von', v: lidos.von }]
        .sort(function (a, b) { return b.v - a.v; })
        .forEach(function (o, i) { c.resDistrib[o.q] = faixas[i]; lidos[faixas[i]] = o.v; });
    }

    // ── estatísticas secundárias ───────────────────────────────────
    // Iniciativa entra como NÃO treinada e Percepção como treinada (é o
    // que o próprio manual faz no dejeto vivo: "precisam apenas de
    // Percepção treinada"). O que sobrar da conta vira "+extra", então o
    // valor impresso no livro é sempre reproduzido exatamente.
    const ini = st('iniciativa'), per = st('percepcao');
    if (ini) {
      c.iniciativaTreinada = false;
      c.iniciativaExtra = inteiro(ini) - valorPericia(c, 'des', false, 0);
    }
    if (per) {
      c.percepcaoTreinada = true;
      c.percepcaoExtra = inteiro(per) - valorPericia(c, 'sab', true, 0);
    }
    partesPorVirgula(cr.pericias || '').forEach(function (p) {
      const m = p.match(/^(.+?)\s*([+\-–−]\d+)\s*(?:\(([^]*)\))?\s*$/);
      if (!m) return;
      const nome = m[1].trim();
      const def = periciaDef(nome) || periciaDef(nome.replace(/\s*\([^)]*\)\s*$/, '').trim());
      if (!def) { avisos.push('Perícia “' + nome + '” não está na lista — ficou de fora.'); return; }
      const valor = inteiro(m[2]);
      const per2 = { id: uid('pe'), nome: def.nome, treinada: true, extra: 0,
                     obs: (m[3] || '').trim() };
      per2.extra = valor - valorPericia(c, def.atr, true, 0);
      // o texto entre parênteses ("+14 para nadar") acompanha o valor da
      // perícia quando o ND muda; guarda a régua para deslocá-lo depois
      if (per2.obs) per2.obsRef = { valor: valor, obs: per2.obs };
      c.pericias.push(per2);
    });

    return { c: c, lidos: lidos, avisos: avisos };
  }

  // ═══════════════════════════════════════════════════════════════
  //  DELTAS — a diferença que o livro manda anotar e preservar
  // ═══════════════════════════════════════════════════════════════
  //  "Compare as estatísticas de sua criatura com as listadas na linha
  //  de seu papel e ND na Tabela 2-3 […] e anote as diferenças."
  function deltasDe(papel, nd, lidos) {
    const p = parametros(papel, nd);
    const d = deltasZero();
    D.PARAM_COLUNAS.forEach(function (col) {
      const v = lidos[col.chave];
      if (v != null) d[col.chave] = v - p[col.chave];
    });
    return d;
  }

  // ═══════════════════════════════════════════════════════════════
  //  BANDOS (p. 387–389)
  // ═══════════════════════════════════════════════════════════════
  function patamaresSubidos(c) {
    if (!c.base) return 0;
    return Math.max(0, patamarDe(c.nd).ordem - patamarDe(c.base.nd).ordem);
  }
  function multDano(c) {
    return c.modo === 'bando' ? D.multBando(patamaresSubidos(c)) : 1;
  }
  // "1d8" → "3d8" com mult 3; "2d4" → "4d4" com mult 2.
  function multiplicarDados(dados, mult) {
    return String(dados || '').replace(/(\d*)d(\d+)/gi, function (_, n, f) {
      return ((parseInt(n || '1', 10) * mult) + 'd' + f);
    });
  }
  // Dano de habilidade: multiplica dados soltos, "N PV" e "N pontos de
  // dano" — os três jeitos que o livro escreve dano dentro de uma regra.
  function multiplicarTextoDano(txt, mult) {
    if (mult === 1) return String(txt || '');
    return String(txt || '')
      .replace(/(\d*)d(\d+)\s*([+\-–−])\s*(\d+)/gi, function (_, n, f, sg, b) {
        return (parseInt(n || '1', 10) * mult) + 'd' + f + sg + (parseInt(b, 10) * mult);
      })
      .replace(/(\d*)d(\d+)/gi, function (_, n, f) {
        return (parseInt(n || '1', 10) * mult) + 'd' + f;
      })
      .replace(/(\d+)\s+(PV|pontos de dano)\b/gi, function (_, n, r) {
        return (parseInt(n, 10) * mult) + ' ' + r;
      });
  }

  // Aplica ao bando o dano do item 4 do roteiro: o dano da criatura-base
  // multiplicado pelo aumento de patamar. Os ataques guardam o dano
  // ORIGINAL (`bandoBase`), então mudar o ND recalcula sem acumular.
  function aplicarDanoBando(c) {
    if (c.modo !== 'bando') return;
    const mult = multDano(c);
    let baseTotal = 0;
    c.ataques.forEach(function (a) {
      if (!a.bandoBase) a.bandoBase = { dados: a.dados, bonus: parseInt(a.bonus, 10) || 0, extra: a.extra };
      const b = a.bandoBase;
      if (!a.secundario) {
        baseTotal += (mediaDados(String(b.dados || '') + ' ' + String(b.extra || '')) + (b.bonus || 0)) *
                     (parseInt(a.qtd, 10) || 1);
      }
      a.dados = multiplicarDados(b.dados, mult);
      a.bonus = (b.bonus || 0) * mult;
      a.extra = multiplicarTextoDano(b.extra, mult);
    });
    // O dano de um bando NÃO sai da Tabela 2-3: é o da criatura-base
    // vezes o aumento de patamar. Guardar isso como delta em pontos faz
    // o "alvo por golpe" do Passo 4 apontar para o número certo.
    if (c.deltas) {
      c.deltas.dano = baseTotal * mult -
        parametros(c.papel, ndComDelta(c.nd, c.ajustes.dano || 0)).dano;
    }
    c.bando.multAplicado = mult;
  }

  // Habilidades: o mesmo dano ×patamar, mas "exceto magias". Fica num
  // botão porque mexe em texto corrido escrito à mão.
  function aplicarDanoHabilidades(c) {
    const mult = multDano(c);
    let n = 0;
    c.habilidades.forEach(function (h) {
      if (h.magica) return;                       // "exceto magias"
      if (!h.bandoBase) h.bandoBase = h.texto;
      const novo = multiplicarTextoDano(h.bandoBase, mult);
      if (novo !== h.texto) n++;
      h.texto = novo;
    });
    if (c.bando) c.bando.habsMult = mult;
    return n;
  }

  // Os números que o livro escreve POR EXTENSO no meio do texto e que
  // não se recalculam sozinhos quando o ND ou o tamanho mudam.
  function fotoDerivada(c) {
    const s = stats(c);
    return { cd: s.cd, cdExtrair: cdExtrair(c), ataque: s.ataque,
             manobras: tamanhoDe(c.tamanho).manobras };
  }

  // Ao mudar o ND de uma criatura derivada: a CD das habilidades, a CD
  // para extrair do tesouro, o valor entre parênteses das perícias e o
  // teste de manobra escrito dentro de uma habilidade. Esta é a costura.
  function sincronizarDerivada(c, antes) {
    if (c.modo === 'nova' || !c.base || !antes) return;
    const agora = fotoDerivada(c);

    const trocar = function (txt, de, para) {
      if (!de || de === para) return String(txt || '');
      return String(txt || '').replace(new RegExp('\\bCD\\s+' + de + '\\b', 'g'), 'CD ' + para);
    };
    // o teste de agarrar sai do valor de ataque MAIS o modificador de
    // manobras do tamanho — os dois mudam num bando, e o livro soma os
    // dois: o aquin’ne agarra com +13 e o cardume, com +21
    const dTeste = (agora.ataque - antes.ataque) + (agora.manobras - antes.manobras);
    const arrumar = function (txt) {
      let t = trocar(txt, antes.cd, agora.cd);
      if (dTeste) {
        t = t.replace(/\(teste\s*([+\-–−]\d+)\)/gi, function (_, v) {
          return '(teste ' + sinal(inteiro(v) + dTeste) + ')';
        });
      }
      return t;
    };
    c.habilidades.forEach(function (h) {
      h.texto = arrumar(h.texto);
      if (h.bandoBase) h.bandoBase = arrumar(h.bandoBase);
    });
    // no tesouro a CD é outra conta (15 + ND), então é outra troca
    c.tesouroObs = trocar(c.tesouroObs, antes.cdExtrair, agora.cdExtrair);

    // "(+14 para nadar)" acompanha o valor da própria perícia
    c.pericias.forEach(function (p) {
      if (!p.obsRef) return;
      const def = periciaDef(p.nome);
      if (!def) return;
      const v = valorPericia(c, def.atr, p.treinada, p.extra);
      p.obs = deslocarBonus(p.obsRef.obs, v - p.obsRef.valor);
    });
    if (c.modo === 'bando') aplicarDanoBando(c);
  }

  // "Esta mudança no tamanho afeta testes de Furtividade" (item 3). O
  // cardume é a prova: o aquin'ne Pequeno tem Furtividade +4 e o cardume
  // Médio tem +3 — um ponto A MAIS pelo ND e dois A MENOS pelo tamanho.
  // `tamanhoAplicado` guarda o tamanho que a perícia já reflete, para
  // trocar o tamanho duas vezes não somar o ajuste duas vezes.
  function ajustarFurtividade(c) {
    if (c.modo !== 'bando' || !c.base) return;
    const de = tamanhoDe(c.bando.tamanhoAplicado || c.base.tamanho).furtividade;
    const para = tamanhoDe(c.tamanho).furtividade;
    const d = para - de;
    if (d) c.pericias.forEach(function (p) {
      if (p.nome === 'Furtividade') p.extra = (parseInt(p.extra, 10) || 0) + d;
    });
    c.bando.tamanhoAplicado = c.tamanho;
  }

  // Item 2 e 3 do roteiro de bandos: a faixa de ND e o salto de tamanho
  // que o livro sugere para uma quantidade de indivíduos.
  function aplicarFaixaBando(c, faixaId) {
    const f = D.BANDO_FAIXAS.find(function (x) { return x.id === faixaId; });
    if (!f || !c.base || c.modo !== 'bando') return;
    const antes = fotoDerivada(c);
    c.bando.faixa = faixaId;
    c.nd = ndComDelta(c.base.nd, Math.round((f.nd[0] + f.nd[1]) / 2));
    const ord = tamanhoDe(c.base.tamanho).ordem;
    c.tamanho = D.TAMANHOS[Math.min(D.TAMANHOS.length - 1, ord + f.tam)].id;
    atualizarDerivada(c, antes);
  }

  // Tudo que precisa correr depois de mexer no ND ou no tamanho de uma
  // criatura derivada, na ordem certa.
  function atualizarDerivada(c, antes) {
    if (c.modo === 'nova') return;
    ajustarFurtividade(c);
    sincronizarDerivada(c, antes);
  }

  // ── Criar a criatura derivada ─────────────────────────────────────
  // As estatísticas de combate de uma ameaça já pronta desta aba —
  // servem de "criatura-base" tanto quanto uma ficha do livro.
  function lidosDe(c) {
    const s = stats(c);
    const l = {};
    D.PARAM_COLUNAS.forEach(function (col) { l[col.chave] = s[col.chave]; });
    return l;
  }

  // `cBase` é uma criatura no formato desta aba; `lidos`, as estatísticas
  // dela; `origem`, de onde ela veio (para a etiqueta do painel).
  function derivar(cBase, lidos, modo, origem) {
    const c = JSON.parse(JSON.stringify(cBase));
    c.id = uid('ca');
    c.criadoEm = c.alteradoEm = Date.now();
    c.ataques.forEach(function (a) { a.id = uid('at'); });
    c.habilidades.forEach(function (h) { h.id = uid('hb'); });
    c.pericias.forEach(function (p) { p.id = uid('pe'); });

    c.modo = modo;
    c.deltas = deltasDe(c.papel, c.nd, lidos);
    // o desvio agora é medido em pontos; os ±ND do Passo 3 já estão
    // embutidos no que foi lido e contariam duas vezes
    c.ajustes = deltasZero();
    c.base = {
      livro: (origem && origem.livro) || '', chave: (origem && origem.chave) || '',
      nome: cBase.nome || 'criatura-base', nd: c.nd, papel: c.papel,
      tamanho: c.tamanho, avisos: (origem && origem.avisos) || [],
      // as estatísticas da criatura-base, guardadas como fato: o dano de
      // um bando reescreve o delta contra a linha do ND NOVO, e aí não
      // dá mais para reconstruir o valor original de trás para a frente
      lidos: JSON.parse(JSON.stringify(lidos)),
    };

    if (modo === 'bando') {
      c.bando = bandoNovo();
      c.bando.tamanhoAplicado = c.tamanho;
      c.nome = 'Bando de ' + (cBase.nome || 'criaturas');
      // item 5: "a criatura recebe a habilidade Bando"
      const def = M.HABILIDADES_GERAIS.find(function (h) { return h.nome === 'Bando'; });
      if (def && !c.habilidades.some(function (h) { return h.nome === 'Bando'; })) {
        c.habilidades.push({ id: uid('hb'), nome: def.nome, execucao: def.acao || '—',
                             texto: def.texto, magica: !!def.magica });
      }
      aplicarFaixaBando(c, 'dez');
      // item 4: o dano das habilidades sobe junto com o dos ataques.
      // Depois da faixa, para o texto já sair com a CD do ND do bando.
      aplicarDanoHabilidades(c);
    } else {
      c.nome = (cBase.nome || 'Ameaça') + ' (versão nova)';
    }
    return c;
  }

  // ═══════════════════════════════════════════════════════════════
  //  STATBLOCK — o texto no formato do livro
  // ═══════════════════════════════════════════════════════════════
  function statblock(c) {
    const s = stats(c);
    const tam = tamanhoDe(c.tamanho);
    const tipo = tipoDe(c.tipo);
    const L = [];

    L.push((c.nome || 'Ameaça sem nome') + ' ND ' + c.nd);
    if (c.conceito) String(c.conceito).split(/\n+/).forEach(function (p) {
      if (p.trim()) L.push(p.trim());
    });

    const sub = c.subtipo ? ' (' + c.subtipo.replace(/^\(|\)$/g, '') + ')' : '';
    L.push(tipo.nome + sub + ' ' + tam.nome);

    const ini = valorPericia(c, 'des', c.iniciativaTreinada, c.iniciativaExtra);
    const per = valorPericia(c, 'sab', c.percepcaoTreinada, c.percepcaoExtra);
    L.push('Iniciativa ' + sinal(ini) + ', Percepção ' + sinal(per) +
           (c.sentidos ? ', ' + c.sentidos : ''));

    L.push('Defesa ' + s.defesa +
           ', Fort ' + sinal(s[c.resDistrib.fort]) +
           ', Ref ' + sinal(s[c.resDistrib.ref]) +
           ', Von ' + sinal(s[c.resDistrib.von]) +
           (c.defesasExtra ? ', ' + c.defesasExtra : ''));

    L.push('Pontos de Vida ' + milhar(s.pv));
    if (c.usaPM) L.push('Pontos de Mana ' + (c.pmManual || pmSugerido(c)));

    // Deslocamento
    const partes = [];
    if (!c.semTerrestre) partes.push(comQuadrados(c.deslTerrestre || deslocamentoAuto(c)));
    c.deslExtras.forEach(function (ex) {
      const v = ex.valor || deslocamentoExtraAuto(c, ex);
      if (v) partes.push((D.DESL_ROTULOS[ex.id] || ex.id) + ' ' + comQuadrados(v));
    });
    if (partes.length) L.push('Deslocamento ' + partes.join(', '));

    // Ataques
    ['corpo', 'distancia'].forEach(function (alc) {
      const lista = c.ataques.filter(function (a) { return (a.alcance || 'corpo') === alc; });
      if (!lista.length) return;
      const rot = alc === 'corpo' ? 'Corpo a Corpo' : 'À Distância';
      // o livro marca a linha de ataque do bando: "Corpo a Corpo [Bando]
      // Tentáculo hídrico x2 +19 (4d4+12 corte)."
      const marca = (c.modo === 'bando' || c.marcaBando) ? '[Bando] ' : '';
      L.push(rot + ' ' + marca + lista.map(function (a) { return textoAtaque(c, a); }).join(' e ') + '.');
    });

    // Habilidades (o ✦ inicial é o selo de habilidade mágica)
    c.habilidades.forEach(function (h) {
      if (!h.nome && !h.texto) return;
      const exec = h.execucao && h.execucao !== '—' ? ' (' + h.execucao + ')' : '';
      L.push((h.magica ? '✦ ' : '') + (h.nome || 'Habilidade') + exec + ' ' + (h.texto || ''));
    });

    L.push(D.ATRIBUTOS.map(function (a) {
      const v = parseInt(c.atributos[a.id], 10) || 0;
      return a.curto + ' ' + (v < 0 ? '–' + Math.abs(v) : v);
    }).join(', '));

    const per2 = c.pericias.filter(function (p) { return p.nome; }).map(function (p) {
      const def = periciaDef(p.nome);
      const v = def ? valorPericia(c, def.atr, p.treinada, p.extra) : 0;
      return p.nome + ' ' + sinal(v) + (p.obs ? ' (' + p.obs + ')' : '');
    });
    if (per2.length) L.push('Perícias ' + per2.join(', ') + '.');

    if (c.parceiro) L.push('Parceiro ' + c.parceiro);

    // Sem categoria mas com recurso especial, o livro imprime só o
    // recurso ("Tesouro 2d4 doses de éter elemental…"), sem "Nenhum".
    const tes = (D.TESOUROS.find(function (t) { return t.id === c.tesouro; }) || {}).nome || 'Padrão';
    const linhaTes = c.tesouro === 'nenhum'
      ? (c.tesouroObs || 'Nenhum')
      : tes + (c.tesouroObs ? ' ' + c.tesouroObs : '');
    if (c.equipamento) L.push('Equipamento ' + c.equipamento + ' Tesouro ' + linhaTes + '.');
    else L.push('Tesouro ' + linhaTes + '.');

    return L.join('\n');
  }

  // "Tentáculo hídrico x2 +19 (4d4+12 corte)"
  //
  // Ataque repetido sai como "Nome xN". O livro usa as duas formas — o
  // dejeto vivo imprime "Três pseudópodes", o cardume imprime "Tentáculo
  // hídrico x2" — e o numeral por extenso exige concordância de gênero e
  // número que o nome livre não dá ("Dois garras", "Dois mordidas"). Quem
  // quiser o numeral escreve o nome já assim ("Três pseudópodes") e deixa
  // a quantidade servindo só para a conta do dano.
  function textoAtaque(c, a) {
    const s = stats(c);
    // ataque complementar usa a linha de 2 ND abaixo (Passo 4)
    const base = (a.secundario
      ? parametros(c.papel, ndComDelta(c.nd, -2)).ataque
      : s.ataque) + (parseInt(a.ajusteAtaque, 10) || 0);
    const qtd = parseInt(a.qtd, 10) || 1;
    const nome = a.nome || 'Ataque';
    const rotulo = qtd > 1 ? nome + ' x' + qtd : nome;
    // bônus 0 não aparece — e "0" vindo do <input> é string, que é
    // truthy: sem o parseInt saía "1d8+0" na ficha.
    const bonus = parseInt(a.bonus, 10) || 0;
    // "extraColado" veio do livro grudado no dano, sem vírgula ("1d4 mais
    // 1d4 ácido" do glop, contra "1d8+10 impacto, x2, mais 1d8 ácido" do
    // dejeto vivo) — o livro usa as duas formas, e a ficha lida volta na
    // forma em que entrou.
    const dano = [
      (a.dados || '') + (bonus ? (bonus > 0 ? '+' : '') + bonus : ''),
      a.tipo || '',
      a.extraColado ? (a.extra || '') : '',
    ].filter(Boolean).join(' ');
    const det = [dano, a.critico || '', a.extraColado ? '' : (a.extra || '')]
      .filter(Boolean).join(', ');
    // o que a ficha do livro escreve DEPOIS do dano volta com a mesma
    // pontuação: frase nova entra com ponto ("… trevas). Uma criatura
    // viva…"), alternativa e continuação de lista entram coladas
    // ("… x3) ou chifres +14…", "… 19), garra +30…").
    const dep = String(a.depois || '');
    const cola = !dep ? ''
      : (/^[,;]/.test(dep) ? dep : (/^[A-ZÀ-Ý]/.test(dep) ? '. ' + dep : ' ' + dep));
    return rotulo + ' ' + sinal(base) + (det ? ' (' + det + ')' : '') + cola;
  }

  // ═══════════════════════════════════════════════════════════════
  //  TEXTO DO MANUAL → HTML (com as nuvens de regra)
  // ═══════════════════════════════════════════════════════════════
  //  [[chave|trecho]] vira <span class="ga-tip" data-tip="…">trecho</span>.
  function marcarRefs(txt) {
    const partes = [];
    let resto = String(txt == null ? '' : txt);
    const RE = /\[\[([a-z0-9-]+)\|([^\]]+)\]\]/gi;
    let ult = 0, m;
    while ((m = RE.exec(resto))) {
      partes.push(esc(resto.slice(ult, m.index)));
      const ref = M.REFERENCIAS[m[1]];
      if (ref) {
        const dica = ref.titulo + ' — ' + ref.fonte + '\n\n' + ref.texto;
        partes.push('<span class="ga-tip ca-ref" tabindex="0" data-tip="' + esc(dica) + '">' +
                    esc(m[2]) + '<span class="ca-ref-selo">📖</span></span>');
      } else {
        partes.push(esc(m[2]));
      }
      ult = m.index + m[0].length;
    }
    partes.push(esc(resto.slice(ult)));
    return partes.join('');
  }

  function blocosHTML(blocos) {
    return blocos.map(function (b) {
      if (b.sub) return '<h4 class="ca-man-sub">' + marcarRefs(b.sub) + '</h4>';
      if (b.p) return '<p class="ca-man-p">' + marcarRefs(b.p) + '</p>';
      if (b.exemplo) return '<p class="ca-man-ex">' + marcarRefs(b.exemplo) + '</p>';
      if (b.lista) return '<ul class="ca-man-lista">' +
        b.lista.map(function (i) { return '<li>' + marcarRefs(i) + '</li>'; }).join('') + '</ul>';
      if (b.quadro) return '<div class="ca-quadro"><div class="ca-quadro-tit">' +
        esc(b.quadro.titulo) + '</div>' +
        b.quadro.texto.split('\n\n').map(function (p) {
          return '<p>' + marcarRefs(p) + '</p>';
        }).join('') + '</div>';
      if (b.tabela) return tabelaHTML(b.tabela);
      return '';
    }).join('');
  }

  // ═══════════════════════════════════════════════════════════════
  //  TABELAS DE REFERÊNCIA
  // ═══════════════════════════════════════════════════════════════
  function tab(titulo, cab, linhas, nota, destaque) {
    const key = Number.isInteger(destaque) ? destaque : -1;
    const cls = function (i) { return i === key ? ' class="prog-col-key"' : ''; };
    const ths = cab.map(function (ct, i) { return '<th' + cls(i) + '>' + esc(ct) + '</th>'; }).join('');
    const trs = linhas.map(function (l) {
      const marca = l._marcada ? ' class="ca-linha-atual"' : '';
      return '<tr' + marca + '>' + l.map(function (ct, i) {
        return '<td' + cls(i) + '>' + esc(ct) + '</td>';
      }).join('') + '</tr>';
    }).join('');
    return '<div class="prog-table-wrap"><table class="prog-table">' +
      (titulo ? '<caption>' + esc(titulo) + '</caption>' : '') +
      '<thead><tr>' + ths + '</tr></thead><tbody>' + trs + '</tbody></table></div>' +
      (nota ? '<p class="prog-table-nota">' + esc(nota) + '</p>' : '');
  }

  function tabelaParametros(papelId, ndAtual) {
    const pap = papelDe(papelId);
    const linhas = D.NDS.map(function (nd) {
      const p = parametros(papelId, nd);
      const l = [nd, patamarDe(nd).nome, sinal(p.ataque), String(p.dano), String(p.defesa),
                 sinal(p.resForte), sinal(p.resMedia), sinal(p.resFraca),
                 String(p.pv), String(p.cd)];
      if (nd === ndAtual) l._marcada = true;
      return l;
    });
    return tab('Tabela 2-3 — Parâmetros de Criaturas · ' + pap.nome,
      ['ND', 'Patamar', 'Ataque', 'Dano Médio', 'Defesa',
       'Res. Forte (80%)', 'Res. Média (50%)', 'Res. Fraca (20%)', 'PV', 'Efeito Padrão (CD)'],
      linhas,
      'Ameaças de Arton, p. 382–384. As três resistências são distribuídas entre Fortitude, Reflexos e Vontade conforme o conceito da ameaça.');
  }

  function tabelaHTML(id, c) {
    if (c === undefined) c = criaturaAtual();
    if (id === 'funcoes') {
      return tab('Funções mais comuns de ameaças (Passo 0)',
        ['Função', 'Papel sugerido', 'O que é'],
        D.FUNCOES.map(function (f) {
          return [f.nome, papelDe(f.papel).nome, f.desc];
        }),
        'Ameaças de Arton, p. 378. São referências, não uma classificação rígida.');
    }
    if (id === 'desl') {
      const linhas = D.DESLOCAMENTOS.terrestre.concat(D.DESLOCAMENTOS.outros).map(function (l) {
        return [l.rotulo, l.lento, l.normal, l.rapido];
      });
      return tab('Tabela 2-2 — Deslocamentos de Criaturas',
        ['Deslocamento', 'Lento', 'Normal', 'Rápido'], linhas,
        'Ameaças de Arton, p. 379. Deslocamentos abaixo de 6m podem deixar a ameaça muito fraca; acima de 18m dão uma vantagem tática importante.');
    }
    if (id === 'parametros') {
      const papel = c ? c.papel : 'solo';
      const nd = c ? c.nd : null;
      return '<div class="ca-tabs-param">' +
        D.PAPEIS.map(function (p) {
          return '<button type="button" class="ca-tab-param' + (p.id === papel ? ' ca-tab-param--ativa' : '') +
            '" data-acao="tab-param" data-papel="' + p.id + '">' + esc(p.icone + ' ' + p.nome) + '</button>';
        }).join('') + '</div><div id="caTabelaParam">' + tabelaParametros(papel, nd) + '</div>';
    }
    if (id === 'atributos') {
      return tab('Tabela 2-4 — Categorias de Atributos',
        ['Categoria', 'Valor de Atributo'],
        D.ATRIBUTO_CATEGORIAS.map(function (a) { return [a.nome, a.rotulo]; }),
        'Ameaças de Arton, p. 385.');
    }
    if (id === 'passos') {
      return tab('Tabela 3-2 — Dano de Armas (passos)',
        D.PASSOS_CABECALHO, D.PASSOS_DANO.map(function (l) { return l.slice(); }),
        'Tormenta20, p. 143. Ache o dado na coluna “Normal” e ande para os lados.');
    }
    if (id === 'tamanhos') {
      return tab('Tabela 1-1 — Tamanho de Criaturas',
        ['Categoria', 'Exemplos', 'Espaço / alcance natural', 'Furtividade / Manobras', 'Arma natural', 'Desarmado'],
        D.TAMANHOS.map(function (t) {
          return [t.nome, t.exemplos, t.espaco, sinalZero(t.furtividade) + ' / ' + sinalZero(t.manobras),
                  t.danoNatural, t.desarmado];
        }),
        'Ameaças de Arton, p. 13. O dado de arma natural e de ataque desarmado vem do Capítulo 1.');
    }
    if (id === 'pericias') {
      return tab('Perícias e atributos-chave',
        ['Perícia', 'Atributo-chave', 'Só treinada?'],
        D.PERICIAS.map(function (p) {
          const a = D.ATRIBUTOS.find(function (x) { return x.id === p.atr; });
          return [p.nome, a ? a.curto : p.atr, p.soTreinada ? 'sim' : '—'];
        }),
        'Tormenta20, Tabela 2-1. Valor = metade do ND + atributo-chave + treinamento (+2 até ND 6, +4 de 7 a 14, +6 de 15 em diante).');
    }
    return '';
  }

  // ═══════════════════════════════════════════════════════════════
  //  DESENHO DA ABA
  // ═══════════════════════════════════════════════════════════════
  function render() {
    const cont = document.getElementById('criar-ameaca-content');
    if (!cont) return;
    const c = criaturaAtual();

    // o que estava aberto/visível antes deste render
    const abertos = [];
    cont.querySelectorAll('details[open][id]').forEach(function (d) { abertos.push(d.id); });
    const botaoAtivo = cont.querySelector('.ca-subtab--ativa');
    const subaba = botaoAtivo ? botaoAtivo.dataset.caTab : 'oficina';

    cont.innerHTML =
      '<div class="cr-cabecalho">' +
        '<h1>⚗ Criar Ameaça</h1>' +
        '<p class="cr-sub">O <em>Manual de Criação de Ameaças</em> (' + esc(D.FONTE.livro) + ', ' +
          esc(D.FONTE.capitulo) + ', ' + esc(D.FONTE.paginas) + ') com as tabelas aplicadas sozinhas. ' +
          'Escolha papel e ND: Defesa, resistências, PV, ataque, dano médio e CD saem prontos da Tabela 2-3. ' +
          'Em <strong>🔧 Modificar</strong> e <strong>👥 Bando</strong> a oficina parte de uma criatura pronta, ' +
          'anota a diferença dela para a tabela e mantém essa diferença no ND novo. ' +
          'Onde o livro manda consultar outra página, passe o mouse — a regra aparece aqui 📖.</p>' +
      '</div>' +
      '<nav class="ca-subtabs" aria-label="Criar ameaça">' +
        '<button type="button" class="ca-subtab ca-subtab--ativa" data-ca-tab="oficina">🛠 Oficina</button>' +
        '<button type="button" class="ca-subtab" data-ca-tab="manual">📖 O manual inteiro</button>' +
        '<button type="button" class="ca-subtab" data-ca-tab="tabelas">📊 Tabelas</button>' +
      '</nav>' +
      '<div data-ca-panel="oficina">' + (c ? painelOficina(c) : '') + '</div>' +
      '<div data-ca-panel="manual" hidden>' + painelManual() + '</div>' +
      '<div data-ca-panel="tabelas" hidden>' + painelTabelas(c) + '</div>';

    // devolve o que estava aberto antes: o render é total, e sem isto um
    // clique no ND fecharia todo "O que o livro diz" que estivesse aberto
    // e jogaria o mestre de volta para a sub-aba Oficina.
    abertos.forEach(function (id) {
      const d = document.getElementById(id);
      if (d) d.open = true;
    });
    ativarSubaba(subaba);

    atualizarCalculos();
  }

  // Troca a sub-aba visível (Oficina / Manual / Tabelas).
  function ativarSubaba(nome) {
    const sec = document.getElementById('criar-ameaca');
    if (!sec) return;
    const alvo = nome || 'oficina';
    sec.querySelectorAll('[data-ca-tab]').forEach(function (b) {
      b.classList.toggle('ca-subtab--ativa', b.dataset.caTab === alvo);
    });
    sec.querySelectorAll('[data-ca-panel]').forEach(function (p) {
      p.hidden = (p.dataset.caPanel !== alvo);
    });
  }

  // ── Barra "Minhas ameaças" ────────────────────────────────────────
  function barraCriaturas(c) {
    const ordenadas = dados.criaturas.slice().sort(function (a, b) {
      return (b.alteradoEm || 0) - (a.alteradoEm || 0);
    });
    const chips = ordenadas.map(function (x) {
      const pap = papelDe(x.papel);
      return '<button type="button" class="ca-chip' + (x.id === c.id ? ' ca-chip--ativo' : '') +
        '" data-acao="abrir" data-id="' + x.id + '" title="' + esc(x.nome || 'Ameaça sem nome') + '">' +
        '<span class="ca-chip-icone">' + esc(pap.icone) + '</span>' +
        '<span class="ca-chip-nome">' + esc(x.nome || 'sem nome') + '</span>' +
        '<span class="ca-chip-nd">ND ' + esc(x.nd) + '</span></button>';
    }).join('');

    return '<div class="ca-barra">' +
      '<div class="ca-barra-cab">' +
        '<span class="ca-barra-tit">📜 Minhas ameaças <em>(' + dados.criaturas.length + ')</em></span>' +
        '<div class="ca-barra-acoes">' +
          '<button type="button" class="ca-btn ca-btn--nova" data-acao="nova">＋ Nova ameaça</button>' +
          '<button type="button" class="ca-btn ca-btn--deriva" data-acao="derivar" data-modo="modificada" ' +
            'title="Partir de uma criatura pronta e mudar o ND mantendo as diferenças (p. 387)">🔧 Modificar…</button>' +
          '<button type="button" class="ca-btn ca-btn--deriva" data-acao="derivar" data-modo="bando" ' +
            'title="Transformar uma criatura pronta num bando (p. 387–389)">👥 Bando…</button>' +
          '<button type="button" class="ca-btn" data-acao="duplicar">⧉ Duplicar</button>' +
          '<button type="button" class="ca-btn ca-btn--perigo" data-acao="remover">🗑 Remover</button>' +
          '<button type="button" class="ca-btn" data-acao="backup">⬇ Backup (.json)</button>' +
          '<label class="ca-btn ca-btn--arquivo">⬆ Importar' +
            '<input type="file" accept="application/json,.json" data-acao="importar" hidden></label>' +
        '</div>' +
      '</div>' +
      '<div class="ca-chips">' + chips + '</div>' +
    '</div>';
  }

  // ── Painel: Oficina ───────────────────────────────────────────────
  function painelOficina(c) {
    return barraCriaturas(c) +
      '<div class="ca-oficina">' +
        '<div class="ca-passos">' +
          painelBase(c) +
          passo0(c) + passo1(c) + passo2(c) + passo3(c) +
          passo4(c) + passo5(c) + passo6(c) + passo7(c) +
        '</div>' +
        '<aside class="ca-previa-col">' + previaHTML(c) + '</aside>' +
      '</div>';
  }

  // Casca de um passo: cabeçalho numerado + controles + "o que o livro diz".
  function cascaPasso(def, corpo) {
    return '<article class="ca-passo" id="ca-passo-' + def.id + '">' +
      // <div>, não <header>: o style.css desenha as faixas do masthead
      // em qualquer <header> da página.
      '<div class="ca-passo-cab">' +
        '<span class="ca-passo-num">' + (def.n != null ? def.n : '•') + '</span>' +
        '<div class="ca-passo-tit">' +
          '<h2>' + esc(def.icone + ' ' + (def.n != null ? 'Passo ' + def.n + ': ' : '') + def.titulo) + '</h2>' +
          '<p>' + esc(def.resumo || '') + '</p>' +
        '</div>' +
      '</div>' +
      '<div class="ca-passo-corpo">' + corpo + '</div>' +
      '<details class="ca-livro" id="ca-livro-' + def.id + '">' +
        '<summary>📖 O que o livro diz</summary>' +
        '<div class="ca-livro-txt">' + blocosHTML(def.blocos) + '</div>' +
      '</details>' +
    '</article>';
  }
  function passoDef(id) {
    return M.PASSOS.find(function (p) { return p.id === id; });
  }

  function campo(rot, html, dica) {
    return '<label class="ca-campo">' +
      '<span class="ca-campo-rot">' + rot + (dica ? '<em>' + esc(dica) + '</em>' : '') + '</span>' +
      html + '</label>';
  }

  // ── PAINEL DA CRIATURA-BASE (p. 387–389) ──────────────────────────
  //  Só aparece nos modos "modificada" e "bando". Usa a mesma casca dos
  //  oito passos, com o texto do livro dentro do "📖 O que o livro diz".
  function painelBase(c) {
    if (c.modo === 'nova' || !c.base) return '';
    const bando = c.modo === 'bando';
    const pb = papelDe(c.base.papel), pn = papelDe(c.papel);

    const corpo =
      '<div class="ca-base-card">' +
        '<div class="ca-base-lado">' +
          '<span class="ca-base-rot">Criatura-base</span>' +
          '<strong>' + esc(c.base.nome) + '</strong>' +
          '<span class="ca-base-meta">' + esc(pb.icone + ' ' + pb.nome) + ' · ND ' + esc(c.base.nd) +
            ' · ' + esc(tamanhoDe(c.base.tamanho).nome) +
            (c.base.livro ? ' · <em>' + esc(c.base.livro) + '</em>' : '') + '</span>' +
        '</div>' +
        '<span class="ca-base-seta" aria-hidden="true">➜</span>' +
        '<div class="ca-base-lado">' +
          '<span class="ca-base-rot">' + (bando ? 'Bando' : 'Versão nova') + '</span>' +
          '<strong>' + esc(c.nome || 'sem nome') + '</strong>' +
          '<span class="ca-base-meta">' + esc(pn.icone + ' ' + pn.nome) + ' · ND ' + esc(c.nd) +
            ' · ' + esc(tamanhoDe(c.tamanho).nome) + '</span>' +
        '</div>' +
        '<button type="button" class="ca-mini" data-acao="zerar-deltas" ' +
          'title="Pôr todas as diferenças em zero: a ameaça passa a cair exatamente na linha da Tabela 2-3">' +
          '↺ Zerar as diferenças</button>' +
      '</div>' +
      '<p class="ca-nota ca-nota--auto" data-calc="base-patamar"></p>' +
      // o que a leitura da ficha não conseguiu trazer inteiro
      ((c.base.avisos || []).length
        ? '<p class="ca-nota ca-nota--info"><strong>Ao ler a ficha:</strong> ' +
          c.base.avisos.map(esc).join(' · ') + '</p>'
        : '') +
      (bando ? bandoHTML(c) : '') +
      '<p class="ca-nota">As diferenças em pontos ficam à vista no <strong>Passo 3</strong>, uma coluna por estatística: ' +
        'o valor da base, a linha da Tabela 2-3 do ND novo e a diferença — que você pode editar.</p>';

    return cascaPasso(bando ? M.BANDOS : M.MODIFICAR, corpo);
  }

  // Os itens 1 a 7 do roteiro de bandos que viram controle.
  function bandoHTML(c) {
    const b = c.bando;
    const faixas = D.BANDO_FAIXAS.map(function (f) {
      const nd = f.nd[0] === f.nd[1] ? '+' + f.nd[0] : '+' + f.nd[0] + ' a +' + f.nd[1];
      const tam = f.tam ? '+' + f.tam + ' categoria' + (f.tam > 1 ? 's' : '') + ' de tamanho' : 'mesmo tamanho';
      return '<button type="button" class="ca-faixa' + (b.faixa === f.id ? ' ca-faixa--ativa' : '') +
        '" data-acao="bando-faixa" data-faixa="' + f.id + '" title="' + esc(f.fonte) + '">' +
        '<span class="ca-faixa-rot">' + esc(f.rotulo) + '</span>' +
        '<span class="ca-faixa-num">ND ' + nd + ' · ' + tam + '</span></button>';
    }).join('');

    const selTam = '<select class="ca-select" data-acao="bando-tamanho">' +
      D.TAMANHOS.map(function (t) {
        return '<option value="' + t.id + '"' + (c.tamanho === t.id ? ' selected' : '') + '>' +
          esc(t.nome) + '</option>';
      }).join('') + '</select>';

    return '<div class="ca-sub-rot">1) Composição do bando</div>' +
      campo('Quantidade de criaturas',
        '<input type="text" class="ca-input" data-campo-bando="quantidade" value="' + esc(b.quantidade) +
        '" placeholder="oito a doze aquin’ne">',
        'só descritiva — não tem efeito em regras') +
      '<div class="ca-sub-rot">2) e 3) ND e tamanho, pela quantidade</div>' +
      '<div class="ca-faixas">' + faixas + '</div>' +
      '<p class="ca-nota">Um clique põe o ND no meio da faixa e sobe o tamanho. Depois dá para mexer no ND ' +
        'lá no Passo 2 — o bando continua herdando as diferenças da criatura-base.</p>' +
      '<div class="ca-grade">' + campo('Tamanho do bando', selTam) + '</div>' +
      '<p class="ca-nota ca-nota--auto" data-calc="bando-tamanho"></p>' +
      '<div class="ca-sub-rot">4) e 5) Dano e habilidades</div>' +
      '<div class="ca-conta-dano" data-calc="bando-dano"></div>' +
      '<div class="ca-hab-acoes">' +
        '<button type="button" class="ca-btn" data-acao="bando-dano-habs" ' +
          'title="Refaz o dano escrito no texto das habilidades a partir do original da criatura-base">' +
          '✖ Refazer o dano das habilidades</button>' +
      '</div>' +
      '<div class="ca-sub-rot">7) Equipamento e tesouro</div>' +
      '<p class="ca-nota" data-calc="bando-tesouro"></p>';
  }

  // ── PASSO 0 ───────────────────────────────────────────────────────
  function passo0(c) {
    const funcoes = '<option value="">— sem função definida —</option>' +
      D.FUNCOES.map(function (f) {
        return '<option value="' + f.id + '"' + (c.funcao === f.id ? ' selected' : '') + '>' +
          esc(f.nome) + ' → ' + esc(papelDe(f.papel).nome) + '</option>';
      }).join('');
    const f = D.FUNCOES.find(function (x) { return x.id === c.funcao; });

    return cascaPasso(passoDef('conceito'),
      '<div class="ca-grade">' +
        campo('Nome da ameaça',
          '<input type="text" class="ca-input" data-campo="nome" value="' + esc(c.nome) + '" placeholder="Dejeto Vivo">') +
        campo('Função no encontro',
          '<select class="ca-select" data-campo="funcao">' + funcoes + '</select>',
          'sugere o papel de combate') +
      '</div>' +
      (f ? '<p class="ca-nota ca-nota--info"><strong>' + esc(f.nome) + '.</strong> ' + esc(f.desc) + '</p>' : '') +
      campo('Conceito / descrição <em>(vira o texto de lore da ficha)</em>',
        '<textarea class="ca-area" rows="4" data-campo="conceito" placeholder="Uma criatura amorfa que vive nos esgotos de grandes cidades…">' +
        esc(c.conceito) + '</textarea>') +
      '<p class="ca-nota">Uma boa criatura é aquela que pode ser descrita em poucas palavras — o dragão é “réptil alado que cospe fogo”.</p>');
  }

  // ── PASSO 1 ───────────────────────────────────────────────────────
  function passo1(c) {
    const tam = tamanhoDe(c.tamanho);
    const tipo = tipoDe(c.tipo);

    const selTipo = '<select class="ca-select" data-campo="tipo">' + D.TIPOS.map(function (t) {
      return '<option value="' + t.id + '"' + (c.tipo === t.id ? ' selected' : '') + '>' + esc(t.nome) + '</option>';
    }).join('') + '</select>';

    const selTam = '<select class="ca-select" data-campo="tamanho">' + D.TAMANHOS.map(function (t) {
      return '<option value="' + t.id + '"' + (c.tamanho === t.id ? ' selected' : '') + '>' +
        esc(t.nome) + ' — ' + esc(t.exemplos) + '</option>';
    }).join('') + '</select>';

    const botoesPapel = D.PAPEIS.map(function (p) {
      return '<button type="button" class="ca-papel' + (c.papel === p.id ? ' ca-papel--ativo' : '') +
        '" data-acao="papel" data-papel="' + p.id + '">' +
        '<span class="ca-papel-icone">' + esc(p.icone) + '</span>' +
        '<span class="ca-papel-nome">' + esc(p.nome) + '</span>' +
        '<span class="ca-papel-curto">' + esc(p.curto) + '</span></button>';
    }).join('');

    // deslocamento
    const linha = linhaDeslocamento(c.forma, c.tamanho);
    const selForma = '<select class="ca-select" data-campo="forma">' +
      '<option value="bipede"' + (c.forma === 'bipede' ? ' selected' : '') + '>Bípede</option>' +
      '<option value="quadrupede"' + (c.forma === 'quadrupede' ? ' selected' : '') + '>Quadrúpede</option>' +
      '</select>';
    const selRitmo = '<select class="ca-select" data-campo="ritmo">' +
      ['lento', 'normal', 'rapido'].map(function (r) {
        const rot = r === 'rapido' ? 'Rápido' : r.charAt(0).toUpperCase() + r.slice(1);
        return '<option value="' + r + '"' + (c.ritmo === r ? ' selected' : '') + '>' + rot + '</option>';
      }).join('') + '</select>';

    const extrasDisp = ['voo', 'escalada', 'escavacao', 'natacao'];
    const extras = extrasDisp.map(function (id) {
      const ex = c.deslExtras.find(function (e) { return e.id === id; });
      const rot = D.DESL_ROTULOS[id];
      const marcado = !!ex;
      return '<div class="ca-desl-extra' + (marcado ? ' ca-desl-extra--on' : '') + '">' +
        '<label class="ca-chk"><input type="checkbox" data-acao="desl-extra" data-desl="' + id + '"' +
          (marcado ? ' checked' : '') + '> ' + esc(rot.charAt(0).toUpperCase() + rot.slice(1)) + '</label>' +
        (marcado
          ? '<label class="ca-chk ca-chk--mini"><input type="checkbox" data-acao="desl-principal" data-desl="' + id + '"' +
              (ex.principal ? ' checked' : '') + '> principal</label>' +
            '<input type="text" class="ca-input ca-input--mini" data-desl-valor="' + id + '" value="' +
              esc(ex.valor || deslocamentoExtraAuto(c, ex)) + '">'
          : '') +
        '</div>';
    }).join('');

    return cascaPasso(passoDef('tipo'),
      '<div class="ca-grade">' +
        campo('Tipo', selTipo) +
        campo('Subtipo / raça <em>(opcional)</em>',
          '<input type="text" class="ca-input" data-campo="subtipo" value="' + esc(c.subtipo) + '" placeholder="humano, lefeu, elemental…">') +
        campo('Tamanho', selTam) +
      '</div>' +
      (tipo.habilidades
        ? '<p class="ca-nota ca-nota--auto"><strong>O tipo ' + esc(tipo.nome) + ' já dá:</strong> ' + esc(tipo.habilidades) + '. ' +
          '<button type="button" class="ca-mini" data-acao="usar-hab-tipo">Pôr nas defesas</button></p>'
        : '') +
      '<p class="ca-nota ca-nota--auto"><strong>' + esc(tam.nome) + ':</strong> ocupa ' + esc(tam.espaco) +
        ' · Furtividade ' + sinalZero(tam.furtividade) + ' / manobras ' + sinalZero(tam.manobras) +
        ' · arma natural ' + esc(tam.danoNatural) + ' · desarmado ' + esc(tam.desarmado) + '.</p>' +
      '<div class="ca-sub-rot">Papel de combate</div>' +
      '<div class="ca-papeis">' + botoesPapel + '</div>' +
      '<p class="ca-nota">' + esc(papelDe(c.papel).dica) + '</p>' +
      '<div class="ca-sub-rot">Deslocamento <em>(Tabela 2-2)</em></div>' +
      '<div class="ca-grade">' +
        campo('Forma', selForma) +
        campo('Ritmo', selRitmo) +
        campo('Deslocamento terrestre',
          '<input type="text" class="ca-input" data-campo="deslTerrestre" value="' +
          esc(c.deslTerrestre || deslocamentoAuto(c)) + '">') +
      '</div>' +
      '<label class="ca-chk"><input type="checkbox" data-campo="semTerrestre"' +
        (c.semTerrestre ? ' checked' : '') + '> A criatura não tem deslocamento terrestre</label>' +
      (linha ? '<p class="ca-nota ca-nota--auto"><strong>' + esc(linha.rotulo) + ':</strong> lento ' +
        esc(linha.lento) + ' · normal ' + esc(linha.normal) + ' · rápido ' + esc(linha.rapido) + '.</p>' : '') +
      '<div class="ca-desl-extras">' + extras + '</div>' +
      '<p class="ca-nota">Deslocamento especial que <em>não</em> é a forma principal de movimento sai 3m menor que o terrestre — é a conta que este painel já faz.</p>');
  }

  // ── PASSO 2 ───────────────────────────────────────────────────────
  function passo2(c) {
    const grade = D.NDS.map(function (nd) {
      return '<button type="button" class="ca-nd ca-nd--' + patamarDe(nd).id +
        (c.nd === nd ? ' ca-nd--ativo' : '') + '" data-acao="nd" data-nd="' + nd + '">' + esc(nd) + '</button>';
    }).join('');
    const pat = patamarDe(c.nd);

    return cascaPasso(passoDef('nd'),
      '<div class="ca-nd-grade">' + grade + '</div>' +
      '<p class="ca-nota ca-nota--auto"><strong>Patamar ' + esc(pat.nome) + '.</strong> ' + esc(pat.desc) + '</p>' +
      '<p class="ca-nota">Este ND decide sozinho todos os números do Passo 3, a cota de habilidades do Passo 5, ' +
        'o valor das perícias do Passo 6 e a CD para extrair recursos do Passo 7.</p>');
  }

  // ── PASSO 3 ───────────────────────────────────────────────────────
  //  Cada estatística tem um seletor de ±ND: é o "ajustar para o valor
  //  de 1 ou 2 níveis de desafio a mais ou a menos" do livro.
  //  Numa criatura DERIVADA aparecem três colunas a mais — o valor da
  //  criatura-base, a linha da Tabela 2-3 do ND novo e a diferença em
  //  pontos entre as duas. É a diferença que o livro manda preservar, e
  //  ela fica editável: o mestre pode mudar de ideia sobre um desvio.
  function linhaStat(c, chave, rotulo) {
    const opcoes = [-2, -1, 0, 1, 2].map(function (d) {
      return '<option value="' + d + '"' + ((c.ajustes[chave] || 0) === d ? ' selected' : '') + '>' +
        (d === 0 ? '±0' : (d > 0 ? '+' : '−') + Math.abs(d)) + '</option>';
    }).join('');
    const derivada = c.modo !== 'nova' && !!c.deltas && !!c.base;
    return '<div class="ca-stat' + (derivada ? ' ca-stat--deriva' : '') + '">' +
      '<span class="ca-stat-rot">' + esc(rotulo) + '</span>' +
      (derivada
        ? '<span class="ca-stat-base" data-calc="statbase-' + chave + '" title="Valor da criatura-base">—</span>' +
          '<span class="ca-stat-seta" aria-hidden="true">➜</span>' +
          '<span class="ca-stat-tab" data-calc="stattab-' + chave + '" title="Linha da Tabela 2-3 no ND novo">—</span>' +
          '<input type="number" class="ca-input ca-input--num ca-stat-pts" data-delta-pts="' + chave + '" value="' +
            (parseInt(c.deltas[chave], 10) || 0) + '" title="Diferença em pontos herdada da criatura-base">'
        : '') +
      '<span class="ca-stat-val" data-calc="stat-' + chave + '">—</span>' +
      '<select class="ca-stat-aj" data-ajuste="' + chave + '" title="Usar o valor de outro ND (±1 ou ±2)">' +
        opcoes + '</select>' +
      '<span class="ca-stat-nd" data-calc="statnd-' + chave + '"></span>' +
    '</div>';
  }

  function passo3(c) {
    const selRes = function (qual, rot) {
      return '<label class="ca-campo ca-campo--mini"><span class="ca-campo-rot">' + rot + '</span>' +
        '<select class="ca-select" data-res="' + qual + '">' +
        [['resForte', 'Forte (80%)'], ['resMedia', 'Média (50%)'], ['resFraca', 'Fraca (20%)']].map(function (o) {
          return '<option value="' + o[0] + '"' + (c.resDistrib[qual] === o[0] ? ' selected' : '') + '>' + o[1] + '</option>';
        }).join('') + '</select></label>';
    };

    return cascaPasso(passoDef('combate'),
      '<div class="ca-stats">' +
        linhaStat(c, 'defesa', 'Defesa') +
        linhaStat(c, 'pv', 'Pontos de Vida') +
        linhaStat(c, 'ataque', 'Valor de ataque') +
        linhaStat(c, 'dano', 'Dano médio / rodada') +
        linhaStat(c, 'cd', 'CD de habilidades') +
        linhaStat(c, 'resForte', 'Resistência forte') +
        linhaStat(c, 'resMedia', 'Resistência média') +
        linhaStat(c, 'resFraca', 'Resistência fraca') +
      '</div>' +
      '<div class="ca-sub-rot">Distribuição das resistências</div>' +
      '<div class="ca-grade ca-grade--3">' +
        selRes('fort', 'Fortitude') + selRes('ref', 'Reflexos') + selRes('von', 'Vontade') +
      '</div>' +
      '<p class="ca-nota" data-calc="res-resumo"></p>' +
      '<div class="ca-grade">' +
        campo('Defesas e imunidades extras <em>(entram na linha de Defesa)</em>',
          '<input type="text" class="ca-input" data-campo="defesasExtra" value="' + esc(c.defesasExtra) +
          '" placeholder="resistência a alquimia e magia +5, imunidade a veneno…">') +
      '</div>' +
      '<label class="ca-chk"><input type="checkbox" data-campo="usaPM"' + (c.usaPM ? ' checked' : '') +
        '> Esta ameaça usa pontos de mana <em>(o livro recomenda evitar)</em></label>' +
      (c.usaPM
        ? campo('Pontos de Mana',
            '<input type="text" class="ca-input ca-input--mini" data-campo="pmManual" value="' +
            esc(c.pmManual) + '" placeholder="' + pmSugerido(c) + '">',
            '3 PM por ND = ' + pmSugerido(c))
        : ''));
  }

  // ── PASSO 4 ───────────────────────────────────────────────────────
  function cardAtaque(c, a, i) {
    const armas = '<option value="">— arma natural —</option>' + D.ARMAS_NATURAIS.map(function (w) {
      return '<option value="' + esc(w.nome) + '|' + esc(w.tipo) + '">' + esc(w.nome) + '</option>';
    }).join('');
    const tipos = '<option value="">— tipo de dano —</option>' + D.TIPOS_DANO.map(function (t) {
      return '<option value="' + esc(t) + '"' + (a.tipo === t ? ' selected' : '') + '>' + esc(t) + '</option>';
    }).join('');

    return '<div class="ca-ataque" data-ataque="' + a.id + '">' +
      '<div class="ca-ataque-topo">' +
        '<input type="text" class="ca-input ca-ataque-nome" data-atk="nome" value="' + esc(a.nome) +
          '" placeholder="Mordida, Espada longa, Pseudópode…">' +
        '<select class="ca-select ca-select--mini" data-atk-arma title="Preencher com uma arma natural">' + armas + '</select>' +
        '<button type="button" class="ca-mini ca-mini--perigo" data-acao="rem-ataque" data-id="' + a.id + '" title="Remover ataque">✕</button>' +
      '</div>' +
      '<div class="ca-ataque-linha">' +
        '<label class="ca-mini-campo"><span>Qtd</span><input type="number" min="1" max="9" class="ca-input ca-input--num" data-atk="qtd" value="' + (parseInt(a.qtd, 10) || 1) + '"></label>' +
        '<label class="ca-mini-campo"><span>Alcance</span><select class="ca-select ca-select--mini" data-atk="alcance">' +
          '<option value="corpo"' + ((a.alcance || 'corpo') === 'corpo' ? ' selected' : '') + '>Corpo a corpo</option>' +
          '<option value="distancia"' + (a.alcance === 'distancia' ? ' selected' : '') + '>À distância</option>' +
          '</select></label>' +
        '<label class="ca-mini-campo"><span>Dados</span><input type="text" class="ca-input ca-input--num2" data-atk="dados" value="' + esc(a.dados) + '" placeholder="1d8"></label>' +
        '<span class="ca-passo-dado">' +
          '<button type="button" class="ca-mini" data-acao="passo-dado" data-id="' + a.id + '" data-delta="-1" title="−1 passo de dano">−</button>' +
          '<button type="button" class="ca-mini" data-acao="passo-dado" data-id="' + a.id + '" data-delta="1" title="+1 passo de dano">+</button>' +
        '</span>' +
        '<label class="ca-mini-campo"><span>Bônus</span><input type="number" class="ca-input ca-input--num" data-atk="bonus" value="' + (parseInt(a.bonus, 10) || 0) + '"></label>' +
        '<button type="button" class="ca-mini ca-mini--ok" data-acao="fechar-dano" data-id="' + a.id + '" title="Ajustar o bônus para bater o dano médio do ND">🎯 Fechar o dano</button>' +
      '</div>' +
      '<div class="ca-ataque-linha">' +
        '<label class="ca-mini-campo"><span>Tipo</span><select class="ca-select ca-select--mini" data-atk="tipo">' + tipos + '</select></label>' +
        '<label class="ca-mini-campo"><span>Crítico</span><input type="text" class="ca-input ca-input--num2" data-atk="critico" value="' + esc(a.critico) + '" placeholder="x2, 19/x3…"></label>' +
        '<label class="ca-mini-campo ca-mini-campo--larga"><span>Extra</span><input type="text" class="ca-input" data-atk="extra" value="' + esc(a.extra) + '" placeholder="mais 1d8 ácido"></label>' +
      '</div>' +
      '<div class="ca-ataque-pe">' +
        '<label class="ca-chk ca-chk--mini"><input type="checkbox" data-atk="secundario"' + (a.secundario ? ' checked' : '') +
          '> Ataque complementar <em>(usa a linha de 2 ND abaixo e não conta no dano médio)</em></label>' +
        '<span class="ca-ataque-conta" data-calc="atk-' + a.id + '"></span>' +
      '</div>' +
    '</div>';
  }

  function passo4(c) {
    const lista = c.ataques.map(function (a, i) { return cardAtaque(c, a, i); }).join('') ||
      '<p class="ca-vazio">Nenhum ataque ainda. Clique em “＋ Adicionar ataque”.</p>';
    return cascaPasso(passoDef('ataques'),
      '<div class="ca-conta-dano" data-calc="conta-dano"></div>' +
      '<div class="ca-ataques">' + lista + '</div>' +
      '<button type="button" class="ca-btn ca-btn--nova" data-acao="add-ataque">＋ Adicionar ataque</button>');
  }

  // ── PASSO 5 ───────────────────────────────────────────────────────
  function cardHabilidade(c, h) {
    const execs = D.EXECUCOES.map(function (e) {
      return '<option value="' + esc(e) + '"' + ((h.execucao || '—') === e ? ' selected' : '') + '>' + esc(e) + '</option>';
    }).join('');
    return '<div class="ca-hab" data-hab="' + h.id + '">' +
      '<div class="ca-hab-topo">' +
        '<input type="text" class="ca-input ca-hab-nome" data-hab-campo="nome" value="' + esc(h.nome) + '" placeholder="Nome da habilidade">' +
        '<select class="ca-select ca-select--mini" data-hab-campo="execucao" title="Ação necessária">' + execs + '</select>' +
        '<label class="ca-chk ca-chk--mini" title="Habilidade mágica: sujeita a tudo que afeta habilidades mágicas">' +
          '<input type="checkbox" data-hab-campo="magica"' + (h.magica ? ' checked' : '') + '> ✦ mágica</label>' +
        '<button type="button" class="ca-mini ca-mini--perigo" data-acao="rem-hab" data-id="' + h.id + '" title="Remover habilidade">✕</button>' +
      '</div>' +
      '<textarea class="ca-area" rows="3" data-hab-campo="texto" placeholder="Regra da habilidade…">' + esc(h.texto) + '</textarea>' +
    '</div>';
  }

  function passo5(c) {
    const grupos = [];
    M.HABILIDADES_GERAIS.forEach(function (h) {
      let g = grupos.find(function (x) { return x.nome === h.grupo; });
      if (!g) { g = { nome: h.grupo, itens: [] }; grupos.push(g); }
      g.itens.push(h);
    });
    const biblioteca = grupos.map(function (g) {
      return '<div class="ca-bib-grupo"><span class="ca-bib-rot">' + esc(g.nome) + '</span>' +
        g.itens.map(function (h) {
          return '<button type="button" class="ca-bib-item" data-acao="add-hab-lib" data-nome="' + esc(h.nome) +
            '" title="' + esc(h.texto) + '">' + esc(h.nome) + '</button>';
        }).join('') + '</div>';
    }).join('');

    const lista = c.habilidades.map(function (h) { return cardHabilidade(c, h); }).join('') ||
      '<p class="ca-vazio">Nenhuma habilidade ainda. Use a biblioteca abaixo ou crie uma.</p>';

    return cascaPasso(passoDef('habilidades'),
      '<div class="ca-cota" data-calc="cota"></div>' +
      '<div class="ca-habs">' + lista + '</div>' +
      '<div class="ca-hab-acoes">' +
        '<button type="button" class="ca-btn ca-btn--nova" data-acao="add-hab">＋ Habilidade em branco</button>' +
        '<span class="ca-nota ca-nota--inline">Sentidos:</span>' +
        '<input type="text" class="ca-input ca-input--sentidos" data-campo="sentidos" value="' + esc(c.sentidos) +
          '" placeholder="visão no escuro, percepção às cegas (médio)…">' +
      '</div>' +
      '<details class="ca-bib" id="ca-bib"><summary>📚 Biblioteca de habilidades gerais <em>(Capítulo 1, p. 15–17)</em></summary>' +
        '<p class="ca-nota">Um clique põe o texto na ficha, já com o ND e a CD desta criatura no lugar.</p>' +
        '<div class="ca-bib-lista">' + biblioteca + '</div></details>');
  }

  // ── PASSO 6 ───────────────────────────────────────────────────────
  function passo6(c) {
    const atribs = D.ATRIBUTOS.map(function (a) {
      return '<div class="ca-atrib">' +
        '<span class="ca-atrib-rot">' + esc(a.nome) + '</span>' +
        '<input type="number" class="ca-input ca-input--num" data-atrib="' + a.id + '" value="' +
          (parseInt(c.atributos[a.id], 10) || 0) + '">' +
        '<span class="ca-atrib-cat" data-calc="atrib-' + a.id + '"></span>' +
      '</div>';
    }).join('');

    const disponiveis = D.PERICIAS.filter(function (p) { return !p.fixa; });
    const opcoes = '<option value="">＋ Adicionar perícia…</option>' + disponiveis.map(function (p) {
      const a = D.ATRIBUTOS.find(function (x) { return x.id === p.atr; });
      return '<option value="' + esc(p.nome) + '">' + esc(p.nome) + ' (' + (a ? a.curto : '') + ')' +
        (p.soTreinada ? ' — só treinada' : '') + '</option>';
    }).join('');

    const linhas = c.pericias.map(function (p) {
      const def = periciaDef(p.nome);
      const a = def ? D.ATRIBUTOS.find(function (x) { return x.id === def.atr; }) : null;
      return '<div class="ca-per" data-per="' + p.id + '">' +
        '<span class="ca-per-nome">' + esc(p.nome) + '<em>' + (a ? a.curto : '') + '</em></span>' +
        '<label class="ca-chk ca-chk--mini"><input type="checkbox" data-per-campo="treinada"' +
          (p.treinada ? ' checked' : '') + '> treinada</label>' +
        '<label class="ca-mini-campo"><span>+extra</span><input type="number" class="ca-input ca-input--num" data-per-campo="extra" value="' +
          (parseInt(p.extra, 10) || 0) + '"></label>' +
        '<input type="text" class="ca-input ca-input--mini" data-per-campo="obs" value="' + esc(p.obs || '') +
          '" placeholder="+15 para nadar">' +
        '<span class="ca-per-val" data-calc="per-' + p.id + '">—</span>' +
        '<button type="button" class="ca-mini ca-mini--perigo" data-acao="rem-per" data-id="' + p.id + '">✕</button>' +
      '</div>';
    }).join('');

    return cascaPasso(passoDef('secundarias'),
      '<div class="ca-sub-rot">Atributos <em>(Tabela 2-4)</em></div>' +
      '<div class="ca-atribs">' + atribs + '</div>' +
      '<div class="ca-sub-rot">Iniciativa e Percepção</div>' +
      '<div class="ca-fixas">' +
        '<div class="ca-per">' +
          '<span class="ca-per-nome">Iniciativa<em>Des</em></span>' +
          '<label class="ca-chk ca-chk--mini"><input type="checkbox" data-campo="iniciativaTreinada"' +
            (c.iniciativaTreinada ? ' checked' : '') + '> treinada</label>' +
          '<label class="ca-mini-campo"><span>+extra</span><input type="number" class="ca-input ca-input--num" data-campo="iniciativaExtra" value="' +
            (parseInt(c.iniciativaExtra, 10) || 0) + '"></label>' +
          '<span class="ca-per-val" data-calc="ini">—</span>' +
        '</div>' +
        '<div class="ca-per">' +
          '<span class="ca-per-nome">Percepção<em>Sab</em></span>' +
          '<label class="ca-chk ca-chk--mini"><input type="checkbox" data-campo="percepcaoTreinada"' +
            (c.percepcaoTreinada ? ' checked' : '') + '> treinada</label>' +
          '<label class="ca-mini-campo"><span>+extra</span><input type="number" class="ca-input ca-input--num" data-campo="percepcaoExtra" value="' +
            (parseInt(c.percepcaoExtra, 10) || 0) + '"></label>' +
          '<span class="ca-per-val" data-calc="per">—</span>' +
        '</div>' +
      '</div>' +
      '<div class="ca-sub-rot">Outras perícias</div>' +
      '<div class="ca-pers">' + (linhas || '<p class="ca-vazio">Nenhuma perícia listada — as não listadas valem metade do ND + atributo-chave.</p>') + '</div>' +
      '<select class="ca-select ca-select--add" data-acao="add-per">' + opcoes + '</select>' +
      '<p class="ca-nota" data-calc="per-formula"></p>');
  }

  // ── PASSO 7 ───────────────────────────────────────────────────────
  function passo7(c) {
    const tesouros = D.TESOUROS.map(function (t) {
      return '<option value="' + t.id + '"' + (c.tesouro === t.id ? ' selected' : '') + '>' +
        esc(t.nome) + ' — ' + esc(t.desc) + '</option>';
    }).join('');
    return cascaPasso(passoDef('tesouro'),
      campo('Equipamento',
        '<input type="text" class="ca-input" data-campo="equipamento" value="' + esc(c.equipamento) +
        '" placeholder="Espada longa, armadura de couro…">') +
      '<div class="ca-grade">' +
        campo('Categoria de tesouro', '<select class="ca-select" data-campo="tesouro">' + tesouros + '</select>') +
        campo('Tesouro especial / observação',
          '<input type="text" class="ca-input" data-campo="tesouroObs" value="' + esc(c.tesouroObs) +
          '" placeholder="(exceto itens alquímicos), 1d6 doses de ácido (CD 21 para extrair)">') +
      '</div>' +
      '<p class="ca-nota ca-nota--auto" data-calc="cd-extrair"></p>' +
      campo('Parceiro <em>(opcional)</em>',
        '<input type="text" class="ca-input" data-campo="parceiro" value="' + esc(c.parceiro) +
        '" placeholder="Lobo (veja o Apêndice A)">') +
      campo('Anotações do mestre <em>(não entram na ficha)</em>',
        '<textarea class="ca-area" rows="2" data-campo="notas">' + esc(c.notas) + '</textarea>'));
  }

  // ── Prévia da ficha ───────────────────────────────────────────────
  function previaHTML(c) {
    return '<div class="ca-previa">' +
      '<div class="ca-previa-cab">' +
        '<span class="ca-previa-tit">Ficha</span>' +
        '<div class="ca-previa-acoes">' +
          '<button type="button" class="ca-mini" data-acao="copiar">⧉ Copiar</button>' +
          '<button type="button" class="ca-mini" data-acao="baixar">⬇ .txt</button>' +
          '<button type="button" class="ca-mini ca-mini--ok" data-acao="enviar-combate" title="Criar esta ameaça na aba Combates">➜ Combates</button>' +
        '</div>' +
      '</div>' +
      '<div class="ca-previa-corpo" id="caPrevia"></div>' +
      '<div class="ca-avisos" id="caAvisos"></div>' +
    '</div>';
  }

  // ── Painel: o manual inteiro ──────────────────────────────────────
  function painelManual() {
    const secoes = []
      .concat(M.PASSOS.map(function (p) {
        return { titulo: '📌 Passo ' + p.n + ': ' + p.titulo, blocos: p.blocos };
      }))
      .concat([
        { titulo: M.MODIFICAR.icone + ' ' + M.MODIFICAR.titulo, blocos: M.MODIFICAR.blocos },
        { titulo: M.BANDOS.icone + ' ' + M.BANDOS.titulo, blocos: M.BANDOS.blocos },
      ])
      .concat(M.EXEMPLOS.map(function (e) {
        return { titulo: e.icone + ' ' + e.titulo, blocos: e.blocos, ficha: e.ficha };
      }));

    return '<div class="ca-manual">' +
      '<div class="ca-man-abertura">' + blocosHTML(M.ABERTURA) + '</div>' +
      secoes.map(function (s, i) {
        return '<details class="ca-man-secao" id="ca-man-' + i + '"><summary>' + esc(s.titulo) + '</summary>' +
          '<div class="ca-man-corpo">' + blocosHTML(s.blocos) +
          (s.ficha ? '<div class="ca-ficha-livro"><div class="ca-ficha-nome">' +
              esc(s.ficha.split('\n')[0]) + '</div>' +
              window.GA_Statblock.bloco(s.ficha) + '</div>' : '') +
          '</div></details>';
      }).join('') +
      '<p class="ca-fonte">✦ ' + esc(D.FONTE.livro + ' · ' + D.FONTE.capitulo + ' · ' + D.FONTE.secao + ', ' + D.FONTE.paginas) + ' ✦</p>' +
    '</div>';
  }

  // ── Painel: tabelas ───────────────────────────────────────────────
  function painelTabelas(c) {
    return '<div class="ca-tabelas">' +
      tabelaHTML('parametros', c) +
      tabelaHTML('desl') +
      tabelaHTML('tamanhos') +
      tabelaHTML('atributos') +
      tabelaHTML('passos') +
      tabelaHTML('pericias') +
      tabelaHTML('funcoes') +
    '</div>';
  }

  // ═══════════════════════════════════════════════════════════════
  //  ATUALIZAÇÃO DOS VALORES CALCULADOS (sem re-render)
  // ═══════════════════════════════════════════════════════════════
  function elCalc(sel) {
    return document.querySelector('#criar-ameaca-content [data-calc="' + sel + '"]');
  }
  function mostrar(sel, txt) {
    const el = elCalc(sel);
    if (el) el.textContent = txt;
  }
  function mostrarHTML(sel, html) {
    const el = elCalc(sel);
    if (el) el.innerHTML = html;
  }

  function atualizarCalculos() {
    const c = criaturaAtual();
    if (!c || !document.getElementById('criar-ameaca-content')) return;
    const s = stats(c);

    // Passo 3 — estatísticas
    const derivada = c.modo !== 'nova' && !!c.deltas && !!c.base;
    const linhaBase = derivada ? parametros(c.base.papel, c.base.nd) : null;
    D.PARAM_COLUNAS.forEach(function (col) {
      const k = col.chave;
      const fmt = function (v) { return col.sinal ? sinal(v) : String(v); };
      mostrar('stat-' + k, fmt(s[k]));
      const ndAj = s[k + 'Nd'];
      const pts = s[k + 'Pts'];
      mostrar('statnd-' + k,
        (ndAj === c.nd ? 'ND ' + c.nd : 'como ND ' + ndAj) + (pts ? ' ' + sinal(pts) : ''));
      if (derivada) {
        // o valor que a criatura-base tinha de fato; sem ele (ficha lida
        // pela metade), a reconstrução pela linha dela mais o delta
        const lido = c.base.lidos && c.base.lidos[k];
        mostrar('statbase-' + k, fmt(lido != null ? lido : linhaBase[k] + pts));
        mostrar('stattab-' + k, fmt(parametros(c.papel, ndAj)[k]));
      }
    });
    if (derivada) atualizarPainelBase(c, s);
    mostrar('res-resumo',
      'Fort ' + sinal(s[c.resDistrib.fort]) +
      ' · Ref ' + sinal(s[c.resDistrib.ref]) +
      ' · Von ' + sinal(s[c.resDistrib.von]) +
      '  —  o livro dá três valores por ND e deixa você distribuí-los.');

    // Passo 4 — conta do dano
    const golpes = golpesPorRodada(c);
    const porGolpe = danoPorGolpe(c);
    const atual = danoTotalAtual(c);
    const el = document.querySelector('#criar-ameaca-content [data-calc="conta-dano"]');
    if (el) {
      const bate = danoConfere(c);
      const nAtk = ataquesPrincipais(c).length;
      el.className = 'ca-conta-dano' + (golpes ? (bate ? ' ca-conta-dano--ok' : ' ca-conta-dano--dif') : '');
      el.innerHTML = golpes
        ? '<span><strong>Dano médio do ND:</strong> ' + s.dano + '</span>' +
          '<span><strong>Golpes por rodada:</strong> ' + golpes + '</span>' +
          '<span><strong>Por golpe:</strong> ' + porGolpe +
            (porGolpe * golpes !== s.dano ? ' <em>(arredondado para cima)</em>' : '') + '</span>' +
          '<span><strong>Somando os ataques:</strong> ' + atual + (bate ? ' ✓' : ' ⚠') + '</span>' +
          (nAtk > 3 ? '<span class="ca-alerta">Mais de três ataques — o livro só recomenda isso para chefões.</span>' : '')
        : '<span>Dano médio deste ND: <strong>' + s.dano + '</strong>. Adicione um ataque para dividi-lo.</span>';
    }
    c.ataques.forEach(function (a) {
      const m = mediaAtaque(a);
      const q = parseInt(a.qtd, 10) || 1;
      const alvo = a.secundario ? null : porGolpe;
      const txt = 'média ' + m + (q > 1 ? ' × ' + q + ' = ' + (m * q) : '') +
        (alvo != null
          ? '  ·  alvo por golpe: ' + alvo + (m === alvo ? ' ✓' : ' (' + sinal(alvo - m) + ' no bônus)')
          : '  ·  ataque complementar');
      mostrar('atk-' + a.id, txt);
    });

    // Passo 5 — cota de habilidades
    const cota = cotaHabilidades(c);
    const n = c.habilidades.length;
    const elc = elCalc('cota');
    if (elc) {
      const dentro = n >= cota.min && n <= cota.max;
      // "aumente ou diminua a quantidade de habilidades apenas se o novo
      // ND resultar em uma criatura de patamar diferente da original.
      // Caso contrário, o melhor é trocar habilidades." (p. 387)
      const mesmoPatamar = derivada && patamarDe(c.nd).id === patamarDe(c.base.nd).id;
      elc.className = 'ca-cota' + (mesmoPatamar ? '' : (n === 0 ? '' : (dentro ? ' ca-cota--ok' : ' ca-cota--fora')));
      elc.innerHTML = mesmoPatamar
        ? '<strong>' + n + '</strong> habilidade' + (n === 1 ? '' : 's') + ', as mesmas de ' +
          esc(c.base.nome) + '. O ND mudou dentro do <em>mesmo patamar</em>, então o livro pede ' +
          '<strong>trocar</strong> habilidades, não acrescentar nem tirar. ' +
          'CD das habilidades: <strong>' + s.cd + '</strong>.'
        : '<strong>' + n + '</strong> habilidade' + (n === 1 ? '' : 's') +
          ' — uma ameaça <em>' + esc(papelDe(c.papel).nome.toLowerCase()) + '</em> de patamar <em>' +
          esc(patamarDe(c.nd).nome.toLowerCase()) + '</em> tem de <strong>' + cota.min + ' a ' + cota.max + '</strong>. ' +
          (derivada ? 'O patamar mudou, então aqui o livro deixa acrescentar ou tirar. ' : '') +
          'CD das habilidades desta criatura: <strong>' + s.cd + '</strong>.';
    }

    // Passo 6 — atributos e perícias
    D.ATRIBUTOS.forEach(function (a) {
      const v = parseInt(c.atributos[a.id], 10) || 0;
      const cat = D.ATRIBUTO_CATEGORIAS.find(function (x) {
        return x.valores.indexOf(v) >= 0 || (x.nome === 'Excepcional' && v >= 8) || (x.nome === 'Incapaz' && v <= -5);
      });
      mostrar('atrib-' + a.id, cat ? cat.nome : '');
    });
    mostrar('ini', sinal(valorPericia(c, 'des', c.iniciativaTreinada, c.iniciativaExtra)));
    mostrar('per', sinal(valorPericia(c, 'sab', c.percepcaoTreinada, c.percepcaoExtra)));
    c.pericias.forEach(function (p) {
      const def = periciaDef(p.nome);
      mostrar('per-' + p.id, def ? sinal(valorPericia(c, def.atr, p.treinada, p.extra)) : '—');
    });
    const nn = ndNum(c.nd);
    mostrar('per-formula', 'Valor = metade do ND (' + Math.floor(nn / 2) + ') + atributo-chave' +
      ' + treinamento (' + sinal(D.bonusTreinamento(nn)) + ' neste ND) + extra. ' +
      'Bônus de +2 ou +5 para quem é particularmente hábil; +10 para capacidade mágica na perícia.');

    // Passo 7
    mostrar('cd-extrair', 'CD para extrair um recurso do corpo desta criatura: 15 + ND = ' + cdExtrair(c) + '.');

    // Prévia
    const txt = statblock(c);
    const prev = document.getElementById('caPrevia');
    if (prev) {
      prev.innerHTML = '<div class="ca-ficha-nome">' + esc(txt.split('\n')[0]) + '</div>' +
        window.GA_Statblock.bloco(txt);
    }
    const av = document.getElementById('caAvisos');
    if (av) av.innerHTML = avisos(c, s).map(function (a) {
      return '<p class="ca-aviso ca-aviso--' + a.tipo + '">' + a.txt + '</p>';
    }).join('');
  }

  // Os valores calculados do painel da criatura-base (e do bando).
  function atualizarPainelBase(c, s) {
    const patB = patamarDe(c.base.nd), patN = patamarDe(c.nd);
    const subiu = patN.ordem - patB.ordem;
    const nB = ndNum(c.base.nd), nN = ndNum(c.nd);
    // o livro diz "metade da mudança no ND"; a conta real da perícia é a
    // metade de cada ND, que só difere daquela quando as paridades mudam
    const dPer = Math.floor(nN / 2) - Math.floor(nB / 2);
    const trB = D.bonusTreinamento(nB), trN = D.bonusTreinamento(nN);

    mostrar('base-patamar',
      'ND ' + c.base.nd + ' ➜ ND ' + c.nd + ' (' + sinal(nN - nB) + ') · patamar ' +
      (subiu === 0
        ? patB.nome + ', o mesmo — o livro pede trocar habilidades, não acrescentar'
        : patB.nome + ' ➜ ' + patN.nome + ' (' + Math.abs(subiu) + ' ' +
          (Math.abs(subiu) === 1 ? 'patamar' : 'patamares') + (subiu > 0 ? ' acima' : ' abaixo') + ')') +
      ' · perícias ' + sinal(dPer) + ' pela metade do ND' +
      (trB !== trN
        ? ' · atenção: o bônus de treinamento muda de ' + sinal(trB) + ' para ' + sinal(trN) +
          ' — as perícias treinadas sobem sozinhas, confira se é o que você quer'
        : ''));

    if (c.modo !== 'bando' || !c.bando) return;

    const tamB = tamanhoDe(c.base.tamanho), tamN = tamanhoDe(c.tamanho);
    const catg = tamN.ordem - tamB.ordem;
    mostrar('bando-tamanho',
      tamB.nome + ' ➜ ' + tamN.nome +
      (catg === 0 ? ' (o mesmo tamanho)'
                  : ' — ' + Math.abs(catg) + ' categoria' + (Math.abs(catg) === 1 ? '' : 's') +
                    (catg > 0 ? ' acima' : ' abaixo')) +
      '. Furtividade ' + sinalZero(tamN.furtividade) + ', manobras ' + sinalZero(tamN.manobras) +
      (catg ? ' — a Furtividade da lista de perícias já foi ajustada em ' +
              sinal(tamN.furtividade - tamB.furtividade) + '.' : '.'));

    const mult = multDano(c);
    const subiuPat = patamaresSubidos(c);
    const habsFora = (c.bando.habsMult || 1) !== mult;
    const el = elCalc('bando-dano');
    if (el) {
      el.className = 'ca-conta-dano' + (habsFora ? ' ca-conta-dano--dif' : ' ca-conta-dano--ok');
      el.innerHTML =
        '<span><strong>Patamares subidos:</strong> ' + subiuPat + '</span>' +
        '<span><strong>Dano do bando:</strong> ×' + mult +
          (mult === 1 ? ' <em>(mesmo patamar: dano igual ao da base)</em>' : '') + '</span>' +
        '<span><strong>Somando os ataques:</strong> ' + danoTotalAtual(c) + '</span>' +
        '<span class="ca-alerta">' + (habsFora
          ? 'O texto das habilidades ainda está em ×' + (c.bando.habsMult || 1) +
            ' — use o botão abaixo para refazer.'
          : 'Magias não entram na multiplicação.') + '</span>';
    }

    const tes = (D.TESOUROS.find(function (t) { return t.id === c.tesouro; }) || {}).nome || 'Padrão';
    mostrar('bando-tesouro',
      'Mantenha a categoria (' + (c.tesouro === 'nenhum' && c.tesouroObs ? 'só o recurso especial' : tes) +
      '), mas use a linha do ND ' + c.nd + '. A CD para extrair já virou ' + cdExtrair(c) +
      ' (era ' + (15 + Math.ceil(ndNum(c.base.nd))) + '). Aumente as quantidades conforme o número de ' +
      'criaturas — no cardume o livro troca “1 dose” por “2d4 doses”.');
  }

  // Conferências que o próprio manual pede.
  function avisos(c, s) {
    const out = [];
    if (!c.nome) out.push({ tipo: 'info', txt: 'A ameaça ainda não tem nome (Passo 0).' });
    if (!c.ataques.length) out.push({ tipo: 'info', txt: 'Nenhum ataque no Passo 4 — o dano médio deste ND é <strong>' + s.dano + '</strong>.' });
    const dif = danoTotalAtual(c) - s.dano;
    if (c.ataques.length && !danoConfere(c)) {
      out.push({ tipo: 'aviso', txt: 'A soma dos ataques dá <strong>' + danoTotalAtual(c) + '</strong>, ' +
        (dif > 0 ? dif + ' acima' : Math.abs(dif) + ' abaixo') + ' do dano médio do ND (' + s.dano + '). ' +
        'Use “🎯 Fechar o dano” em cada ataque.' });
    }
    const cota = cotaHabilidades(c);
    if (c.habilidades.length && c.habilidades.length > cota.max) {
      out.push({ tipo: 'aviso', txt: 'Mais habilidades (' + c.habilidades.length + ') que o máximo do patamar (' + cota.max + '). ' +
        'O livro admite exceções — “qualidade é melhor que quantidade”.' });
    }
    const base = metros(c.deslTerrestre || deslocamentoAuto(c));
    if (!c.semTerrestre && base != null) {
      if (base < 6) out.push({ tipo: 'aviso', txt: 'Deslocamento abaixo de 6m pode deixar a ameaça muito fraca.' });
      if (base > 18) out.push({ tipo: 'aviso', txt: 'Deslocamento acima de 18m dá uma vantagem tática importante — sobretudo com ataques à distância.' });
    }
    let ajustados = 0;
    Object.keys(c.ajustes).forEach(function (k) { if (c.ajustes[k]) ajustados++; });
    if (ajustados) out.push({ tipo: 'info', txt: ajustados + ' estatística' + (ajustados === 1 ? '' : 's') +
      ' fora da linha do ND. O livro pede compensar aumentos com reduções equivalentes.' });
    return out;
  }

  // ═══════════════════════════════════════════════════════════════
  //  EVENTOS
  // ═══════════════════════════════════════════════════════════════
  function alvoAtaque(el) {
    const card = el.closest('[data-ataque]');
    const c = criaturaAtual();
    if (!card || !c) return null;
    return c.ataques.find(function (a) { return a.id === card.dataset.ataque; }) || null;
  }
  function alvoHab(el) {
    const card = el.closest('[data-hab]');
    const c = criaturaAtual();
    if (!card || !c) return null;
    return c.habilidades.find(function (h) { return h.id === card.dataset.hab; }) || null;
  }
  function alvoPer(el) {
    const card = el.closest('[data-per]');
    const c = criaturaAtual();
    if (!card || !c) return null;
    return c.pericias.find(function (p) { return p.id === card.dataset.per; }) || null;
  }

  // Campos cujo 'change' é tratado por aoMudar (mudam a estrutura da
  // página ou derivam outros valores). O 'input' NÃO pode tocá-los —
  // senão aoMudar não consegue mais comparar com o valor anterior.
  const CAMPOS_ESTRUTURAIS = { tipo: 1, tamanho: 1, forma: 1, ritmo: 1, funcao: 1 };

  function aoDigitar(e) {
    const c = criaturaAtual();
    const el = e.target;
    if (!c || !el || !el.dataset || !el.isConnected) return;

    if (el.dataset.campo) {
      const k = el.dataset.campo;
      if (CAMPOS_ESTRUTURAIS[k]) return;
      c[k] = (el.type === 'checkbox') ? el.checked : el.value;
      if (k === 'usaPM' || k === 'semTerrestre') { salvar(); render(); return; }
      salvar(); atualizarCalculos(); return;
    }
    if (el.dataset.atk) {
      const a = alvoAtaque(el);
      if (!a) return;
      a[el.dataset.atk] = (el.type === 'checkbox') ? el.checked : el.value;
      salvar(); atualizarCalculos(); return;
    }
    if (el.dataset.habCampo) {
      const h = alvoHab(el);
      if (!h) return;
      h[el.dataset.habCampo] = (el.type === 'checkbox') ? el.checked : el.value;
      salvar(); atualizarCalculos(); return;
    }
    if (el.dataset.perCampo) {
      const p = alvoPer(el);
      if (!p) return;
      p[el.dataset.perCampo] = (el.type === 'checkbox') ? el.checked : el.value;
      salvar(); atualizarCalculos(); return;
    }
    if (el.dataset.atrib) {
      c.atributos[el.dataset.atrib] = parseInt(el.value, 10) || 0;
      salvar(); atualizarCalculos(); return;
    }
    if (el.dataset.ajuste) {
      c.ajustes[el.dataset.ajuste] = parseInt(el.value, 10) || 0;
      salvar(); atualizarCalculos(); return;
    }
    if (el.dataset.deltaPts) {
      if (!c.deltas) c.deltas = deltasZero();
      const antes = fotoDerivada(c);
      c.deltas[el.dataset.deltaPts] = parseInt(el.value, 10) || 0;
      atualizarDerivada(c, antes);
      salvar(); atualizarCalculos(); return;
    }
    if (el.dataset.campoBando) {
      if (!c.bando) c.bando = bandoNovo();
      c.bando[el.dataset.campoBando] = el.value;
      salvar(); return;
    }
    if (el.dataset.res) {
      c.resDistrib[el.dataset.res] = el.value;
      salvar(); atualizarCalculos(); return;
    }
    if (el.dataset.deslValor) {
      const ex = c.deslExtras.find(function (x) { return x.id === el.dataset.deslValor; });
      if (ex) { ex.valor = el.value; salvar(); atualizarCalculos(); }
      return;
    }
  }

  function aoMudar(e) {
    const c = criaturaAtual();
    const el = e.target;
    if (!c || !el || !el.dataset) return;

    // tipo / tamanho / forma / ritmo → o deslocamento automático muda junto
    if (el.dataset.campo === 'tipo' || el.dataset.campo === 'tamanho' ||
        el.dataset.campo === 'forma' || el.dataset.campo === 'ritmo') {
      const deslAntes = deslocamentoAuto(c);
      const foto = fotoDerivada(c);
      c[el.dataset.campo] = el.value;
      // só reescreve o campo se ele ainda estiver no valor automático
      if (!c.deslTerrestre || c.deslTerrestre === deslAntes) c.deslTerrestre = deslocamentoAuto(c);
      c.deslExtras.forEach(function (ex) {
        ex.valor = deslocamentoExtraAuto(c, ex);
      });
      // num bando, mudar o tamanho mexe na Furtividade (Tabela 1-1)
      if (el.dataset.campo === 'tamanho') atualizarDerivada(c, foto);
      salvar(); render(); return;
    }
    if (el.dataset.campo === 'funcao') {
      c.funcao = el.value;
      const f = D.FUNCOES.find(function (x) { return x.id === c.funcao; });
      if (f) c.papel = f.papel;              // a função sugere o papel
      salvar(); render(); return;
    }
    if (el.dataset.acao === 'add-per') {
      if (!el.value) return;
      if (!c.pericias.some(function (p) { return p.nome === el.value; })) {
        c.pericias.push({ id: uid('pe'), nome: el.value, treinada: true, extra: 0, obs: '' });
      }
      el.value = '';
      salvar(); render(); return;
    }
    if (el.hasAttribute('data-atk-arma')) {
      const a = alvoAtaque(el);
      if (!a || !el.value) return;
      const par = el.value.split('|');
      a.nome = par[0];
      a.tipo = par[1] || '';
      a.dados = tamanhoDe(c.tamanho).danoNatural;
      a.critico = a.critico || 'x2';
      a.bonus = bonusSugerido(c, a);
      el.value = '';
      salvar(); render(); return;
    }
    if (el.dataset.acao === 'desl-extra') {
      const id = el.dataset.desl;
      if (el.checked) {
        const ex = { id: id, principal: false, valor: '' };
        ex.valor = deslocamentoExtraAuto(c, ex);
        c.deslExtras.push(ex);
      } else {
        c.deslExtras = c.deslExtras.filter(function (x) { return x.id !== id; });
      }
      salvar(); render(); return;
    }
    if (el.dataset.acao === 'desl-principal') {
      const ex = c.deslExtras.find(function (x) { return x.id === el.dataset.desl; });
      if (ex) { ex.principal = el.checked; ex.valor = deslocamentoExtraAuto(c, ex); }
      salvar(); render(); return;
    }
    if (el.dataset.acao === 'bando-tamanho') {
      const antes = fotoDerivada(c);
      c.tamanho = el.value;
      atualizarDerivada(c, antes);
      salvar(); render();
      return;
    }
    if (el.dataset.acao === 'importar') {
      importarArquivo(el);
      return;
    }
  }

  function aoClicar(e) {
    const el = e.target && e.target.closest ? e.target.closest('[data-acao], [data-ca-tab]') : null;
    if (!el) return;
    const c = criaturaAtual();

    // sub-abas
    if (el.dataset.caTab) { ativarSubaba(el.dataset.caTab); return; }

    const acao = el.dataset.acao;

    if (acao === 'nova') {
      const n = nova();
      dados.criaturas.push(n);
      dados.atual = n.id;
      salvarAgora(); render();
      const campoNome = document.querySelector('#criar-ameaca-content [data-campo="nome"]');
      if (campoNome) campoNome.focus();
      return;
    }
    if (acao === 'abrir') {
      dados.atual = el.dataset.id;
      salvarAgora(); render();
      return;
    }
    if (acao === 'duplicar') {
      if (!c) return;
      const copia = JSON.parse(JSON.stringify(c));
      copia.id = uid('ca');
      copia.nome = (c.nome || 'Ameaça') + ' (cópia)';
      copia.criadoEm = copia.alteradoEm = Date.now();
      copia.ataques.forEach(function (a) { a.id = uid('at'); });
      copia.habilidades.forEach(function (h) { h.id = uid('hb'); });
      copia.pericias.forEach(function (p) { p.id = uid('pe'); });
      dados.criaturas.push(copia);
      dados.atual = copia.id;
      salvarAgora(); render();
      return;
    }
    if (acao === 'remover') {
      if (!c) return;
      confirmarRemocao(c);
      return;
    }
    if (acao === 'backup') { baixarBackup(); return; }

    if (acao === 'papel') { if (c) { c.papel = el.dataset.papel; salvar(); render(); } return; }
    if (acao === 'nd') {
      if (!c) return;
      // numa criatura derivada o ND arrasta junto a CD escrita no texto
      // das habilidades, a observação das perícias e o dano do bando
      const antes = fotoDerivada(c);
      c.nd = el.dataset.nd;
      atualizarDerivada(c, antes);
      salvar(); render();
      return;
    }

    // ── criatura-base (p. 387–389) ─────────────────────────────────
    if (acao === 'derivar') { abrirModalBase(el.dataset.modo); return; }
    if (acao === 'zerar-deltas') {
      if (!c || !c.deltas) return;
      const antes = fotoDerivada(c);
      c.deltas = deltasZero();
      atualizarDerivada(c, antes);
      salvar(); render();
      return;
    }
    if (acao === 'bando-faixa') {
      if (!c || c.modo !== 'bando') return;
      aplicarFaixaBando(c, el.dataset.faixa);
      salvar(); render();
      return;
    }
    if (acao === 'bando-dano-habs') {
      if (!c || c.modo !== 'bando') return;
      aplicarDanoHabilidades(c);
      salvar(); render();
      return;
    }

    if (acao === 'usar-hab-tipo') {
      if (!c) return;
      const t = tipoDe(c.tipo);
      if (!t.habilidades) return;
      c.defesasExtra = c.defesasExtra ? c.defesasExtra + ', ' + t.habilidades : t.habilidades;
      salvar(); render();
      return;
    }

    if (acao === 'add-ataque') {
      if (!c) return;
      const a = { id: uid('at'), nome: '', qtd: 1, alcance: 'corpo',
                  dados: tamanhoDe(c.tamanho).danoNatural, bonus: 0,
                  tipo: '', critico: 'x2', extra: '', secundario: false };
      c.ataques.push(a);
      // já nasce com o bônus que fecha o dano médio do ND
      a.bonus = bonusSugerido(c, a);
      salvar(); render();
      return;
    }
    if (acao === 'rem-ataque') {
      if (!c) return;
      c.ataques = c.ataques.filter(function (a) { return a.id !== el.dataset.id; });
      salvar(); render();
      return;
    }
    if (acao === 'fechar-dano') {
      if (!c) return;
      const a = c.ataques.find(function (x) { return x.id === el.dataset.id; });
      if (!a) return;
      a.bonus = bonusSugerido(c, a);
      salvar(); render();
      return;
    }
    if (acao === 'passo-dado') {
      if (!c) return;
      const a = c.ataques.find(function (x) { return x.id === el.dataset.id; });
      if (!a) return;
      a.dados = passoDado(a.dados, parseInt(el.dataset.delta, 10) || 0);
      a.bonus = bonusSugerido(c, a);
      salvar(); render();
      return;
    }

    if (acao === 'add-hab') {
      if (!c) return;
      c.habilidades.push({ id: uid('hb'), nome: '', execucao: '—', texto: '', magica: false });
      salvar(); render();
      return;
    }
    if (acao === 'add-hab-lib') {
      if (!c) return;
      const def = M.HABILIDADES_GERAIS.find(function (h) { return h.nome === el.dataset.nome; });
      if (!def) return;
      const s = stats(c);
      const texto = def.texto
        .replace(/\{ND\}/g, c.nd)
        .replace(/\{CD\}/g, s.cd)
        .replace(/\{ATAQUE\}/g, sinal(s.ataque));
      c.habilidades.push({ id: uid('hb'), nome: def.nome, execucao: def.acao || '—',
                           texto: texto, magica: !!def.magica });
      salvar(); render();
      return;
    }
    if (acao === 'rem-hab') {
      if (!c) return;
      c.habilidades = c.habilidades.filter(function (h) { return h.id !== el.dataset.id; });
      salvar(); render();
      return;
    }
    if (acao === 'rem-per') {
      if (!c) return;
      c.pericias = c.pericias.filter(function (p) { return p.id !== el.dataset.id; });
      salvar(); render();
      return;
    }

    if (acao === 'tab-param') {
      const cont = document.getElementById('caTabelaParam');
      if (!cont) return;
      document.querySelectorAll('#criar-ameaca-content [data-acao="tab-param"]').forEach(function (b) {
        b.classList.toggle('ca-tab-param--ativa', b === el);
      });
      cont.innerHTML = tabelaParametros(el.dataset.papel, c ? c.nd : null);
      return;
    }

    if (acao === 'copiar')  { if (c) copiar(statblock(c), el); return; }
    if (acao === 'baixar')  { if (c) baixarFicha(c); return; }
    if (acao === 'enviar-combate') { if (c) enviarParaCombates(c, el); return; }
  }

  // Sobe ou desce um passo na escada de dano (Tabela 3-2).
  function passoDado(atual, delta) {
    const escada = D.ESCADA_DADOS;
    const i = escada.indexOf(String(atual || '').trim());
    if (i < 0) return atual;
    return escada[Math.max(0, Math.min(escada.length - 1, i + delta))];
  }

  // ═══════════════════════════════════════════════════════════════
  //  MODAL — escolher a criatura-base
  // ═══════════════════════════════════════════════════════════════
  //  Duas portas: as fichas dos bestiários (js/fichas-prontas.js) e as
  //  ameaças já criadas nesta aba. O papel de combate é obrigatório: sem
  //  ele não há linha da Tabela 2-3 para comparar, e sem comparação não
  //  há diferença nenhuma para anotar.

  // Todas as fichas de um livro, achatadas para a lista de busca.
  function fichasDoLivro(livroChave) {
    const B = window.GA_FichasProntas;
    const l = B && B.livro(livroChave);
    if (!l) return [];
    const out = [];
    B.livros().forEach(function (x) {
      if (x.chave !== livroChave) return;
      (x.categorias || []).forEach(function (cat) {
        (cat.fichas || []).forEach(function (f) {
          out.push({ chave: f.chave, nome: f.nome, nd: f.nd, tipo: f.tipo,
                     papel: f.papel, grupo: cat.nome });
        });
      });
    });
    return out;
  }

  function listaBaseHTML(fonte, termo) {
    const t = window.GA_semAcento ? window.GA_semAcento(termo || '').toLowerCase()
                                  : String(termo || '').toLowerCase();
    const casa = function (nome) {
      if (!t) return true;
      const n = window.GA_semAcento ? window.GA_semAcento(nome).toLowerCase() : String(nome).toLowerCase();
      return n.indexOf(t) >= 0;
    };

    let itens = [];
    if (fonte === 'minhas') {
      itens = dados.criaturas.filter(function (x) { return casa(x.nome || 'sem nome'); })
        .map(function (x) {
          return { chave: x.id, nome: x.nome || 'Ameaça sem nome', nd: x.nd,
                   tipo: tipoDe(x.tipo).nome + ' ' + tamanhoDe(x.tamanho).nome,
                   papel: x.papel, grupo: '' };
        });
    } else {
      itens = fichasDoLivro(fonte).filter(function (f) { return casa(f.nome); });
    }
    if (!itens.length) return '<p class="ca-vazio">Nada com esse nome.</p>';

    const LIMITE = 60;
    const html = itens.slice(0, LIMITE).map(function (f) {
      const meta = esc('ND ' + (f.nd || '—') + (f.tipo ? ' · ' + f.tipo : '') +
                       (f.grupo ? ' · ' + f.grupo : ''));
      // ficha sem papel de combate (o Rival Espelho é o caso do livro):
      // o mestre escolhe na hora, senão não há delta a calcular
      if (['solo', 'lacaio', 'especial'].indexOf(f.papel) < 0) {
        return '<div class="ca-base-item ca-base-item--sempapel">' +
          '<span class="ca-base-item-nome">' + esc(f.nome) + '</span>' +
          '<span class="ca-base-item-meta">' + meta + ' · <em>sem papel no livro — escolha:</em></span>' +
          '<span class="ca-base-papeis">' + D.PAPEIS.map(function (p) {
            return '<button type="button" class="ca-mini" data-base-pick="' + esc(f.chave) +
              '" data-papel="' + p.id + '">' + esc(p.icone + ' ' + p.nome) + '</button>';
          }).join('') + '</span></div>';
      }
      const pap = papelDe(f.papel);
      return '<button type="button" class="ca-base-item" data-base-pick="' + esc(f.chave) + '">' +
        '<span class="ca-base-item-nome">' + esc(f.nome) + '</span>' +
        '<span class="ca-base-item-meta">' + esc(pap.icone + ' ' + pap.nome) + ' · ' + meta + '</span>' +
      '</button>';
    }).join('');

    return html + (itens.length > LIMITE
      ? '<p class="ca-nota">Mais ' + (itens.length - LIMITE) + ' — refine a busca.</p>' : '');
  }

  function abrirModalBase(modo) {
    const bando = modo === 'bando';
    const B = window.GA_FichasProntas;
    const livros = B ? B.livros().filter(function (l) { return l.disponivel; }) : [];
    const fontes = [{ chave: 'minhas', rotulo: '📜 Minhas ameaças' }].concat(
      livros.map(function (l) { return { chave: l.chave, rotulo: l.icone + ' ' + l.curto }; }));
    const inicial = livros.length ? livros[0].chave : 'minhas';

    const ov = window.GA_abrirModal(
      '<div class="ga-modal-cab"><span>' + (bando ? '👥 Criar um bando' : '🔧 Modificar uma criatura') + '</span>' +
      '<button type="button" class="ga-modal-x" data-ga-fechar>✕</button></div>' +
      '<p class="ga-modal-dica">' +
        (bando
          ? 'Escolha a criatura-base. O bando herda as diferenças dela para a Tabela 2-3, sobe de ND e de tamanho pela quantidade de indivíduos e multiplica o dano pelo aumento de patamar.'
          : 'Escolha a criatura-base. A aba anota a diferença de cada estatística dela para a linha do seu papel e ND na Tabela 2-3, e mantém essa diferença quando você mudar o ND.') +
      '</p>' +
      '<div class="ca-base-busca">' +
        '<select class="ca-select" data-base-fonte>' + fontes.map(function (f) {
          return '<option value="' + f.chave + '"' + (f.chave === inicial ? ' selected' : '') + '>' +
            esc(f.rotulo) + '</option>';
        }).join('') + '</select>' +
        '<input type="search" class="ca-input" data-base-termo placeholder="Buscar pelo nome…" autofocus>' +
      '</div>' +
      '<div class="ca-base-lista" data-base-lista>' + listaBaseHTML(inicial, '') + '</div>');

    const selFonte = ov.querySelector('[data-base-fonte]');
    const inpTermo = ov.querySelector('[data-base-termo]');
    const lista = ov.querySelector('[data-base-lista]');
    const redesenhar = function () {
      lista.innerHTML = listaBaseHTML(selFonte.value, inpTermo.value);
    };
    selFonte.addEventListener('change', redesenhar);
    inpTermo.addEventListener('input', redesenhar);

    lista.addEventListener('click', function (e) {
      const bt = e.target.closest('[data-base-pick]');
      if (!bt) return;
      const res = criarDerivada(selFonte.value, bt.dataset.basePick, modo, bt.dataset.papel);
      if (!res || !res.c) {
        alert('Não foi possível ler a ficha desta criatura.');
        return;
      }
      dados.criaturas.push(res.c);
      dados.atual = res.c.id;
      salvarAgora();
      ov._fechar();
      render();
      if (res.avisos && res.avisos.length) {
        console.warn('[criar-ameaca] ao ler a criatura-base:', res.avisos.join(' · '));
      }
    });
    setTimeout(function () { inpTermo.focus(); }, 30);
  }

  // Monta a criatura derivada a partir de uma das duas fontes.
  // Devolve { c, avisos } ou null.
  function criarDerivada(fonte, chave, modo, papelForcado) {
    if (fonte === 'minhas') {
      const orig = dados.criaturas.find(function (x) { return x.id === chave; });
      if (!orig) return null;
      return { c: derivar(orig, lidosDe(orig), modo,
                          { livro: 'criada nesta aba', chave: orig.id }), avisos: [] };
    }
    const B = window.GA_FichasProntas;
    const ref = B && B.ficha(fonte, chave);
    if (!ref) return null;
    const papel = ['solo', 'lacaio', 'especial'].indexOf(papelForcado) >= 0
      ? papelForcado : ref.def.papel;
    const lido = lerFichaBase(ref.def.texto, papel);
    if (!lido) return null;
    return { c: derivar(lido.c, lido.lidos, modo,
                        { livro: ref.livro.curto || fonte, chave: chave, avisos: lido.avisos }),
             avisos: lido.avisos };
  }

  // ── Remoção com confirmação (nada some por clique acidental) ──────
  function confirmarRemocao(c) {
    const ov = window.GA_abrirModal(
      '<div class="ga-modal-cab"><span>🗑 Remover ameaça</span>' +
      '<button type="button" class="ga-modal-x" data-ga-fechar>✕</button></div>' +
      '<p class="ga-modal-dica">Remover <strong>' + esc(c.nome || 'esta ameaça sem nome') +
      '</strong> (ND ' + esc(c.nd) + ')? Isso não pode ser desfeito.</p>' +
      '<div class="ga-modal-acoes">' +
        '<button type="button" class="ca-btn" data-ga-fechar>Cancelar</button>' +
        '<button type="button" class="ca-btn ca-btn--perigo" data-ca-confirmar>Remover</button>' +
      '</div>');
    ov.querySelector('[data-ca-confirmar]').addEventListener('click', function () {
      dados.criaturas = dados.criaturas.filter(function (x) { return x.id !== c.id; });
      if (!dados.criaturas.length) {
        const n = nova();
        dados.criaturas.push(n);
        dados.atual = n.id;
      } else if (dados.atual === c.id) {
        dados.atual = dados.criaturas[0].id;
      }
      salvarAgora();
      ov._fechar();
      render();
    });
  }

  // ── Exportar / importar ───────────────────────────────────────────
  function copiar(txt, botao) {
    const rot = botao ? botao.textContent : '';
    function ok() {
      if (!botao) return;
      botao.textContent = '✓ Copiado';
      setTimeout(function () { botao.textContent = rot; }, 1400);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(txt).then(ok, function () { copiarFallback(txt, ok); });
    } else {
      copiarFallback(txt, ok);
    }
  }
  function copiarFallback(txt, ok) {
    const ta = document.createElement('textarea');
    ta.value = txt;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); ok(); } catch (e) {}
    document.body.removeChild(ta);
  }

  function baixarFicha(c) {
    const nome = (c.nome || 'ameaca').replace(/[^\wÀ-ÿ -]/g, '').trim() || 'ameaca';
    window.baixarTxt(nome + '_ND' + c.nd.replace('/', '-') + '.txt', statblock(c));
  }
  function baixarBackup() {
    const blob = new Blob([JSON.stringify(dados, null, 2)], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'grifos-alados_ameacas-criadas_' + window.carimboArquivo() + '.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }
  function importarArquivo(input) {
    const arq = input.files && input.files[0];
    if (!arq) return;
    const leitor = new FileReader();
    leitor.onload = function () {
      let d = null;
      try { d = JSON.parse(String(leitor.result)); } catch (e) {}
      if (!d || !Array.isArray(d.criaturas)) {
        alert('Este arquivo não é um backup de ameaças criadas.');
        input.value = '';
        return;
      }
      let novas = 0;
      d.criaturas.forEach(function (x) {
        if (!x || typeof x !== 'object') return;
        normalizar(x);
        x.id = uid('ca');                       // nunca sobrescreve o que já existe
        x.nome = x.nome || 'Ameaça importada';
        dados.criaturas.push(x);
        novas++;
      });
      if (novas) dados.atual = dados.criaturas[dados.criaturas.length - 1].id;
      salvarAgora();
      input.value = '';
      render();
    };
    leitor.readAsText(arq, 'utf-8');
  }

  // Manda a ficha para a aba Combates (o mesmo parser do "Importar do
  // livro"). Sem essa ponte, o mestre teria que copiar e colar à mão.
  function enviarParaCombates(c, botao) {
    const api = window.GA_Monstros;
    if (!api || typeof api.inserirFichaTexto !== 'function') {
      copiar(statblock(c), botao);
      alert('A aba Combates não está disponível nesta página — a ficha foi copiada para a área de transferência.');
      return;
    }
    const r = api.inserirFichaTexto(statblock(c), { papel: c.papel, sessao: '⚗ Ameaças criadas' });
    if (!r) { alert('Não foi possível criar a ficha na aba Combates.'); return; }
    const rot = botao.textContent;
    botao.textContent = '✓ Em ' + r.cena;
    setTimeout(function () { botao.textContent = rot; }, 2200);
  }

  // ═══════════════════════════════════════════════════════════════
  //  INICIALIZAÇÃO
  // ═══════════════════════════════════════════════════════════════
  function init() {
    const secao = document.getElementById('criar-ameaca');
    if (!secao) return;

    D = window.GA_CRIAR_AMEACA;
    M = window.GA_CRIAR_AMEACA_MANUAL;
    const cont = document.getElementById('criar-ameaca-content');
    if (!D || !M || !window.GA_Statblock) {
      if (cont) cont.innerHTML = '<div class="cr-erro"><strong>Os dados não carregaram.</strong><br>' +
        'Verifique se <code>js/criar-ameaca-data.js</code>, <code>js/criar-ameaca-manual.js</code> e ' +
        '<code>js/statblock.js</code> estão incluídos antes de <code>js/criar-ameaca.js</code>.</div>';
      return;
    }

    try {
      carregar();
      render();
    } catch (err) {
      console.error('[criar-ameaca] falha ao renderizar:', err);
      if (cont) cont.innerHTML = '<div class="cr-erro"><strong>Erro ao montar a aba:</strong><br>' +
        esc(err && err.message || err) + '</div>';
      return;
    }

    // 'input' cuida dos valores; 'change' cuida do que muda a estrutura
    // da página (tipo, tamanho, forma, ritmo, função, listas).
    secao.addEventListener('input', aoDigitar);
    secao.addEventListener('change', aoMudar);
    secao.addEventListener('click', aoClicar);

    window.addEventListener('beforeunload', salvarAgora);
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'hidden') salvarAgora();
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  // ═══════════════════════════════════════════════════════════════
  //  API PÚBLICA
  // ═══════════════════════════════════════════════════════════════
  //  As duas primeiras são a porta de entrada de fora da aba (uma ficha
  //  do bestiário pode mandar "modifique esta criatura" para cá). As
  //  outras são as contas puras do manual, sem DOM nenhum — é por elas
  //  que dá para conferir o exemplo do livro fora do navegador.
  window.GA_CriarAmeaca = {
    // Cria a ameaça derivada de uma ficha pronta e abre a aba nela.
    // Devolve { nome, nd, modo } ou null.
    modificar: function (livro, chave, papel) { return _derivarEabrir(livro, chave, 'modificada', papel); },
    bando:     function (livro, chave, papel) { return _derivarEabrir(livro, chave, 'bando', papel); },

    lerFicha: lerFichaBase,      // texto do livro → criatura desta aba
    deltas:   deltasDe,          // papel + ND + estatísticas → diferenças
    derivar:  derivar,           // criatura-base → modificada ou bando
    stats:    stats,             // tabela + ±ND + diferenças
    statblock: statblock,        // criatura → ficha no formato do livro
    faixaBando: aplicarFaixaBando,
  };

  function _derivarEabrir(livro, chave, modo, papel) {
    if (!D) return null;
    const res = criarDerivada(livro, chave, modo, papel);
    if (!res || !res.c) return null;
    dados.criaturas.push(res.c);
    dados.atual = res.c.id;
    salvarAgora();
    if (document.getElementById('criar-ameaca-content')) render();
    return { nome: res.c.nome, nd: res.c.nd, modo: modo };
  }
})();
