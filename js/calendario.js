// ═══════════════════════════════════════════════════════════════════
//  CALENDARIO.JS — o Calendário Artoniano: a conta, a escrita e o seletor
//  Lê:  js/calendario-data.js (window.CALENDARIO_ARTON)
//  Usado por: noticias.js — a data de cada notícia e o "hoje" da gazeta
//
//  O QUE O LIVRO DÁ (Atlas de Arton, p. 30–33): 12 meses de 30 dias, a
//  semana de sete, os Dias de Nimb fora dos meses (de 2 a 8 por ano), o
//  ano zero na chegada dos elfos a Lamnor (antes dele, "AE") e as duas
//  formas de escrever uma data:
//    culta      "Valk 10 sob Caravana, mil quatrocentos e vinte anos da
//                chegada dos elfos"
//    coloquial  "10 de Caravana de mil quatrocentos e vinte"
//  A "curta" daqui é a coloquial com o ano em algarismos, do jeito que o
//  próprio livro escreve "o ano atual é 1420".
//
//  O QUE O LIVRO NÃO DÁ, e é conta do site: em que dia da semana cai cada
//  data. O único ponto de apoio é aquele exemplo — 10/01/1420 é Valk — e
//  a semana corre dali de sete em sete. Os Dias de Nimb ficam FORA da
//  semana, como ficam fora dos meses: se entrassem, cada ano empurraria a
//  semana de 2 a 8 dias que ninguém sabe prever ("até hoje nenhum cálculo
//  funcionou"), e nenhuma data depois de 1420 teria dia da semana.
//  Por essa conta, o Dia do Reencontro de 1420 caiu num Haya — o dia de
//  festejos, o que combina com o maior feriado do ano.
// ═══════════════════════════════════════════════════════════════════
(function () {
  'use strict';

  const CAL = window.CALENDARIO_ARTON;
  if (!CAL) { console.warn('[calendario] calendario-data.js não carregou'); return; }
  const esc = window.GA_esc;

  const DIAS_NO_MES  = 30;
  const MESES_NO_ANO = 12;

  const CONTA_DA_SEMANA =
    'O dia da semana é conta do site: o livro dá um ponto de apoio só — 10 de Caravana ' +
    'de 1420 é Valk (p. 30) — e a semana corre dali de sete em sete. Os Dias de Nimb ' +
    'ficam fora dela, como ficam fora dos meses.';

  function anoOk(a) { return typeof a === 'number' && isFinite(a) && Math.floor(a) === a; }
  function mes(n) { return CAL.meses[n - 1] || null; }
  function semana(s) { return CAL.semana[s - 1] || null; }
  function dd(n) { return (n < 10 ? '0' : '') + n; }

  // ── VALIDAR ──────────────────────────────────────────────────────
  //  Uma data daqui é { dia, mes } — mês de 1 a 12, ou 0 para os Dias de
  //  Nimb (dia de 1 a 8, e `apos`, o mês depois do qual eles caíram, se a
  //  carta de Nimb disse). O "hoje" da campanha carrega o `ano` junto; a
  //  data de uma notícia não, porque o ano dela é o do bloco em que está.
  //  Devolve uma cópia limpa, ou null — nunca um campo `undefined`, que o
  //  Realtime Database recusa.
  function valida(q, comAno) {
    if (!q || typeof q !== 'object') return null;
    const m = Number(q.mes), d = Number(q.dia);
    if (!Number.isInteger(m) || m < 0 || m > MESES_NO_ANO) return null;
    if (!Number.isInteger(d) || d < 1 || d > (m === 0 ? CAL.nimb.max : DIAS_NO_MES)) return null;
    const out = { dia: d, mes: m };
    if (m === 0) {
      const ap = Number(q.apos);
      if (Number.isInteger(ap) && ap >= 1 && ap <= MESES_NO_ANO) out.apos = ap;
    }
    if (comAno) {
      const a = (q.ano === '' || q.ano == null) ? NaN : Number(q.ano);
      if (!anoOk(a)) return null;
      out.ano = a;
    }
    return out;
  }

  // ── A SEMANA ─────────────────────────────────────────────────────
  //  1 = Valk … 7 = Leen; 0 quando não há dia da semana (Dias de Nimb,
  //  ou o ano ainda não foi escolhido).
  function diaDaSemana(ano, m, dia) {
    if (!anoOk(ano) || !m) return 0;
    const a = CAL.ancora;
    const n = (ano - a.ano) * DIAS_NO_MES * MESES_NO_ANO + (m - a.mes) * DIAS_NO_MES + (dia - a.dia);
    return (((n + a.semana - 1) % 7) + 7) % 7 + 1;
  }

  // ── AS DATAS ESPECIAIS ───────────────────────────────────────────
  //  A festa em que o dia cai — o Sckharal e a Grande Feira duram uma
  //  semana —, com `n` dizendo qual dia dela é.
  function festa(m, dia) {
    if (!m) return null;
    for (let i = 0; i < CAL.datas.length; i++) {
      const f = CAL.datas[i];
      if (f.mes === m && dia >= f.dia && dia < f.dia + (f.dias || 1)) {
        return Object.assign({ n: dia - f.dia + 1 }, f);
      }
    }
    return null;
  }

  // ── O ANO POR EXTENSO ────────────────────────────────────────────
  const UNIDADES = ['zero', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove',
    'dez', 'onze', 'doze', 'treze', 'catorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove'];
  const DEZENAS  = ['', '', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa'];
  const CENTENAS = ['', 'cento', 'duzentos', 'trezentos', 'quatrocentos', 'quinhentos',
    'seiscentos', 'setecentos', 'oitocentos', 'novecentos'];

  function ate999(n) {
    if (n < 20) return UNIDADES[n];
    if (n < 100) return DEZENAS[Math.floor(n / 10)] + (n % 10 ? ' e ' + UNIDADES[n % 10] : '');
    if (n === 100) return 'cem';
    return CENTENAS[Math.floor(n / 100)] + (n % 100 ? ' e ' + ate999(n % 100) : '');
  }

  // "mil e vinte", "mil e quatrocentos" — mas "mil quatrocentos e vinte":
  // depois do milhar, o "e" só entra quando o resto é redondo ou pequeno.
  function porExtenso(n) {
    n = Math.abs(Math.trunc(n));
    if (n < 1000) return ate999(n);
    if (n >= 1e6) return String(n);
    const mil = Math.floor(n / 1000), resto = n % 1000;
    const cab = mil === 1 ? 'mil' : ate999(mil) + ' mil';
    if (!resto) return cab;
    return cab + (resto < 100 || resto % 100 === 0 ? ' e ' : ' ') + ate999(resto);
  }

  // O ano em algarismos: 1424 — ou "10 AE", antes da chegada dos elfos.
  function anoNum(a) { return a < 0 ? (-a) + ' AE' : String(a); }

  function sufixoDoAno(a, forma) {
    if (!anoOk(a)) return '';
    if (forma === 'culta') {
      if (a === 0) return ', no ano da chegada dos elfos';
      const n = Math.abs(a);
      return ', ' + porExtenso(n) + (n === 1 ? ' ano' : ' anos') + (a < 0 ? ' antes' : '') + ' da chegada dos elfos';
    }
    if (a === 0) return ' do ano da chegada dos elfos';
    if (forma === 'curta') return ' de ' + anoNum(a);
    return ' de ' + porExtenso(a) + (a < 0 ? ' AE' : '');
  }

  // ── ESCREVER A DATA ──────────────────────────────────────────────
  const FORMAS = [
    { chave: 'coloquial', nome: 'Coloquial', exemplo: '10 de Caravana de mil quatrocentos e vinte' },
    { chave: 'culta',     nome: 'Culta',     exemplo: 'Valk 10 sob Caravana, mil quatrocentos e vinte anos da chegada dos elfos' },
    { chave: 'curta',     nome: 'Curta',     exemplo: '10 de Caravana de 1420' },
  ];
  function formaOk(f) { return FORMAS.some(x => x.chave === f) ? f : 'coloquial'; }

  function escrever(q, ano, forma) {
    q = valida(q);
    if (!q) return '';
    forma = formaOk(forma);
    let base;
    if (q.mes === 0) {
      base = q.dia + 'º Dia de Nimb' + (q.apos ? ' (após ' + mes(q.apos).nome + ')' : '');
    } else if (forma === 'culta') {
      const s = semana(diaDaSemana(ano, q.mes, q.dia));
      base = (s ? s.nome + ' ' : '') + q.dia + ' sob ' + mes(q.mes).nome;
    } else {
      base = q.dia + ' de ' + mes(q.mes).nome;
    }
    return base + sufixoDoAno(ano, forma);
  }

  // A do alto da gazeta: curta, e com o "sob" que é a marca da forma
  // culta — "Dallia 28 sob Pomo, 1424".
  function compacta(q, ano) {
    q = valida(q);
    if (!q) return '';
    const a = anoOk(ano) ? ', ' + anoNum(ano) : '';
    if (q.mes === 0) return q.dia + 'º Dia de Nimb' + a;
    const s = semana(diaDaSemana(ano, q.mes, q.dia));
    return (s ? s.nome + ' ' : '') + q.dia + ' sob ' + mes(q.mes).nome + a;
  }

  // Para comparar datas (qual notícia é a mais recente). Os Dias de Nimb
  // entram logo depois do mês em que caíram; sem ele, no fim do ano.
  function ordem(q, ano) {
    q = valida(q);
    if (!q || !anoOk(ano)) return -Infinity;
    const noAno = q.mes === 0 ? (q.apos || MESES_NO_ANO) * DIAS_NO_MES + q.dia / 10
                              : (q.mes - 1) * DIAS_NO_MES + q.dia;
    return ano * 400 + noAno;
  }

  // ── A NUVEM ──────────────────────────────────────────────────────
  //  O que o livro diz daquele dia, para a nuvem de mouse (.ga-tip): o
  //  dia da semana, o mês e a estação, e a festa, se houver.
  function nuvem(q, ano) {
    q = valida(q);
    if (!q) return '';
    const a = anoOk(ano) ? ano : null;
    const linhas = [];
    if (q.mes === 0) {
      linhas.push(escrever(q, a, 'curta'));
      linhas.push('✦ Dias de Nimb — ' + CAL.nimb.desc);
    } else {
      const M = mes(q.mes), E = CAL.estacoes[M.estacao];
      const s = semana(diaDaSemana(a, q.mes, q.dia));
      linhas.push((s ? s.nome + ', ' : '') + dd(q.dia) + '/' + dd(q.mes) + (a !== null ? '/' + anoNum(a) : ''));
      if (s) linhas.push(s.nome + ' — ' + s.desc);
      linhas.push(E.icone + ' ' + M.nome + ', o ' + q.mes + 'º mês do ano (' + E.nome.toLowerCase() + ') — ' + M.desc);
      const f = festa(q.mes, q.dia);
      if (f) linhas.push('✦ ' + f.nome + (f.dias > 1 ? ' (' + f.n + 'º de ' + f.dias + ' dias)' : '') + ' — ' + f.desc);
    }
    linhas.push('— Calendário Artoniano, ' + CAL.fonte);
    return linhas.join('\n\n');
  }

  // ── LER UMA DATA ESCRITA À MÃO ───────────────────────────────────
  //  A gazeta nasceu com as datas digitadas, e todas no mesmo molde:
  //  "Valkaria, 28º dia de Pomo (Fevereiro) — Ano 1424". Isto acha a data
  //  dentro do texto (nesse molde ou nas formas daqui) e devolve o dia e
  //  o mês, o que vem ANTES dela (o local, com a vírgula) e ela mesma do
  //  jeito que foi escrita — é o que deixa pôr a nuvem nas notícias
  //  antigas sem mudar uma letra do que o mestre escreveu.
  //  O `\b` antes do número impede que o "24" de "1424" passe por dia.
  const PALAVRA = '([A-Za-zÀ-ÖØ-öø-ÿ]+)';
  const MOLDES = [
    { nimb: true,  re: '\\b(\\d)\\s*[º°ª]?\\s*dia\\s+de\\s+nimb(?:\\s*\\(\\s*ap[oó]s\\s+' + PALAVRA + '\\s*\\))?' },
    {              re: '\\b(\\d{1,2})\\s*[º°ª]?\\s*dia\\s+de\\s+' + PALAVRA },       // 28º dia de Pomo
    { culta: true, re: PALAVRA + '\\s+(\\d{1,2})\\s+sob\\s+' + PALAVRA },           // Dallia 28 sob Pomo
    {              re: '\\b(\\d{1,2})\\s+de\\s+' + PALAVRA },                         // 28 de Pomo
  ];

  function semAcento(s) {
    return String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }
  function mesPeloNome(nome) {
    const alvo = semAcento(nome);
    for (let i = 0; i < CAL.meses.length; i++) {
      if (semAcento(CAL.meses[i].nome) === alvo) return i + 1;
    }
    return 0;
  }

  function daCasca(molde, m) {
    if (molde.nimb) return valida({ mes: 0, dia: +m[1], apos: m[2] ? mesPeloNome(m[2]) : 0 });
    const mm = mesPeloNome(molde.culta ? m[3] : m[2]);
    return mm ? valida({ mes: mm, dia: +(molde.culta ? m[2] : m[1]) }) : null;
  }

  function ler(texto) {
    const t = String(texto || '');
    if (!t) return null;
    for (let k = 0; k < MOLDES.length; k++) {
      const re = new RegExp(MOLDES[k].re, 'gi');
      let m;
      while ((m = re.exec(t))) {
        const q = daCasca(MOLDES[k], m);
        if (!q) continue;
        const antes = t.slice(0, m.index);
        return Object.assign(q, {
          antes: antes,
          local: antes.replace(/[\s,;:—–-]+$/, '').trim(),
          resto: t.slice(m.index),
        });
      }
    }
    return null;
  }

  // ══════════════════════════════════════════════════════════════════
  //  O SELETOR — um mês por vez, em grade de Valk a Leen
  //  Serve às duas datas da gazeta:
  //    • a de uma notícia: o ano é o do bloco e vem de fora (op.ano);
  //    • o "hoje" da campanha: o ano se escolhe aqui (op.anoProprio), e
  //      as setas atravessam de Pyra para Caravana do ano seguinte.
  //  op.hoje marca o dia de hoje da campanha na grade. Devolve
  //  { valor(), redesenhar() } e avisa cada mudança em op.aoMudar().
  //  A moldura (setas, mês, ano) é desenhada UMA vez: redesenhar o campo
  //  do ano a cada tecla tiraria o cursor de dentro dele.
  // ══════════════════════════════════════════════════════════════════
  function opcoesDeMes(comNimb) {
    let h = '', estacao = '';
    CAL.meses.forEach((m, i) => {
      if (m.estacao !== estacao) {
        if (estacao) h += '</optgroup>';
        estacao = m.estacao;
        const e = CAL.estacoes[estacao];
        h += '<optgroup label="' + esc(e.icone + ' ' + e.nome) + '">';
      }
      h += '<option value="' + (i + 1) + '">' + esc(m.nome) + '</option>';
    });
    h += '</optgroup>';
    if (comNimb) h += '<optgroup label="Fora dos meses"><option value="0">✦ Dias de Nimb</option></optgroup>';
    return h;
  }

  function tip(texto, rotulo) {
    return '<span class="ga-tip" tabindex="0" data-tip="' + esc(texto) + '">' + esc(rotulo) + '</span>';
  }

  function seletor(raiz, op) {
    op = op || {};
    const ini = valida(op.valor) || { dia: 1, mes: 1 };
    const v = { dia: ini.dia, mes: ini.mes, apos: ini.apos || 0 };
    const anoIni = op.valor ? Number(op.valor.ano) : NaN;
    let anoProprio = op.anoProprio ? (anoOk(anoIni) ? anoIni : CAL.anoDoLivro) : null;

    function ano() {
      if (op.anoProprio) return anoProprio;
      const a = op.ano ? op.ano() : null;
      return anoOk(a) ? a : null;
    }

    // A linha das setas é só do mês. O ano, quando é daqui, ganha uma linha
    // dele; quando vem de fora, aparece na frase de baixo — dividindo a
    // linha com as setas, no celular ele espremia o nome do mês em "Pom".
    raiz.classList.add('cal');
    raiz.innerHTML =
      (op.anoProprio
        ? '<label class="cal-ano-rot"><span>Ano</span>' +
          '<input type="number" class="cal-ano" data-cal-campo="ano" step="1"></label>'
        : '') +
      '<div class="cal-topo">' +
        '<button type="button" class="cal-nav" data-cal-nav="-1" aria-label="Mês anterior">‹</button>' +
        '<select class="cal-mes" data-cal-campo="mes" aria-label="Mês">' + opcoesDeMes(true) + '</select>' +
        '<button type="button" class="cal-nav" data-cal-nav="1" aria-label="Próximo mês">›</button>' +
      '</div>' +
      '<div class="cal-dias"></div>' +
      '<label class="cal-apos" hidden><span>Caíram no fim de</span>' +
        '<select data-cal-campo="apos"><option value="0">— a carta de Nimb não disse</option>' +
        opcoesDeMes(false) + '</select></label>' +
      '<p class="cal-info" aria-live="polite"></p>';

    const selMes   = raiz.querySelector('[data-cal-campo="mes"]');
    const inpAno   = raiz.querySelector('[data-cal-campo="ano"]');
    const selApos  = raiz.querySelector('[data-cal-campo="apos"]');
    const rotApos  = raiz.querySelector('.cal-apos');
    const navs     = raiz.querySelectorAll('[data-cal-nav]');
    const caixa    = raiz.querySelector('.cal-dias');
    const info     = raiz.querySelector('.cal-info');
    if (inpAno) inpAno.value = anoProprio;

    function podeIr(delta) {
      if (v.mes === 0) return false;                        // os Dias de Nimb não têm vizinho
      const m = v.mes + delta;
      if (m >= 1 && m <= MESES_NO_ANO) return true;
      return !!op.anoProprio && anoProprio !== null;       // só o "hoje" atravessa o ano
    }

    function ir(delta) {
      let m = v.mes + delta;
      if (m < 1 || m > MESES_NO_ANO) {
        if (!op.anoProprio || anoProprio === null) return;
        anoProprio += m < 1 ? -1 : 1;
        inpAno.value = anoProprio;
        m = m < 1 ? MESES_NO_ANO : 1;
      }
      v.mes = m;
    }

    function gradeMes(a) {
      const M = mes(v.mes);
      const primeiro = diaDaSemana(a, v.mes, 1);             // 0 = ano ainda não escolhido
      const hj = valida(op.hoje, true);
      let h = '<div class="cal-grade" role="group" aria-label="' + esc('Dias de ' + M.nome) + '">';
      if (primeiro) {
        // o nome inteiro, e o curto para o celular ("Hed", "Ast", "Dal")
        CAL.semana.forEach(s => {
          h += '<span class="cal-sem' + (s.nota ? ' cal-sem--nota' : '') + '" aria-hidden="true" title="' +
               esc(s.nome + ' — ' + s.desc) + '"><span class="cal-sem-longo">' + esc(s.nome) +
               '</span><span class="cal-sem-curto">' + esc(s.curto || s.nome) + '</span></span>';
        });
        for (let i = 1; i < primeiro; i++) h += '<span class="cal-vazio" aria-hidden="true"></span>';
      }
      for (let d = 1; d <= DIAS_NO_MES; d++) {
        const s = semana(diaDaSemana(a, v.mes, d));
        const f = festa(v.mes, d);
        const ehHoje = !!hj && hj.mes === v.mes && hj.dia === d && hj.ano === a;
        const sel = d === v.dia;
        const rot = (s ? s.nome + ', ' : '') + d + ' de ' + M.nome + (f ? ' — ' + f.nome : '') +
                    (ehHoje ? ' (hoje na campanha)' : '');
        h += '<button type="button" class="cal-dia' + (f ? ' cal-dia--festa' : '') +
             (ehHoje ? ' cal-dia--hoje' : '') + (sel ? ' cal-dia--sel' : '') +
             '" data-cal-dia="' + d + '" aria-pressed="' + sel + '" title="' + esc(rot) +
             '" aria-label="' + esc(rot) + '">' + d + '</button>';
      }
      h += '</div>';
      if (!primeiro) h += '<p class="cal-aviso">Escolha o ano para a grade mostrar os dias da semana.</p>';
      return h;
    }

    function gradeNimb() {
      let h = '<div class="cal-nimb" role="group" aria-label="Dias de Nimb">';
      for (let d = 1; d <= CAL.nimb.max; d++) {
        const sel = d === v.dia;
        h += '<button type="button" class="cal-dia' + (sel ? ' cal-dia--sel' : '') + '" data-cal-dia="' + d +
             '" aria-pressed="' + sel + '" aria-label="' + d + 'º Dia de Nimb">' + d + 'º</button>';
      }
      return h + '</div>';
    }

    function linhaInfo(a) {
      const doAno = a !== null ? ' de ' + esc(anoNum(a)) : '';
      if (v.mes === 0) {
        return '✦ <strong>' + v.dia + 'º Dia de Nimb' + doAno + '</strong> — fora de qualquer mês, e aqui ' +
          'também fora da semana. O ano tem de ' + CAL.nimb.min + ' a ' + CAL.nimb.max + ', e só a carta de ' +
          'Nimb diz quantos e depois de qual mês. ' + tip(CAL.nimb.desc, 'O que acontece nesses dias');
      }
      const M = mes(v.mes), E = CAL.estacoes[M.estacao];
      const s = semana(diaDaSemana(a, v.mes, v.dia));
      const f = festa(v.mes, v.dia);
      return (s ? '<strong>' + tip(s.nome + ' — ' + s.desc + '\n\n' + CONTA_DA_SEMANA, s.nome) + '</strong>' +
                  (s.nota ? ' <em>(' + esc(s.nota) + ')</em>' : '') + ', ' : '') +
        v.dia + ' de ' + tip(M.desc, M.nome) + doAno + ' · ' + E.icone + ' ' + esc(E.nome) +
        (f ? ' · ✦ ' + tip(f.desc, f.nome + (f.dias > 1 ? ' (' + f.n + 'º de ' + f.dias + ' dias)' : '')) : '');
    }

    function desenhar() {
      const a = ano();
      selMes.value = String(v.mes);
      rotApos.hidden = v.mes !== 0;
      selApos.value = String(v.apos || 0);
      navs.forEach(b => { b.disabled = !podeIr(+b.dataset.calNav); });
      caixa.innerHTML = v.mes === 0 ? gradeNimb() : gradeMes(a);
      info.innerHTML = linhaInfo(a);
    }

    function valor() {
      const out = { dia: v.dia, mes: v.mes };
      if (v.mes === 0 && v.apos) out.apos = v.apos;
      if (op.anoProprio) out.ano = anoProprio;             // pode ser null: quem salva confere
      return out;
    }

    function mudou() {
      desenhar();
      if (op.aoMudar) op.aoMudar(valor());
    }

    raiz.addEventListener('click', e => {
      const b = e.target.closest('[data-cal-dia], [data-cal-nav]');
      if (!b || !raiz.contains(b) || b.disabled) return;
      const dia = b.dataset.calDia;
      if (dia) v.dia = +dia; else ir(+b.dataset.calNav);
      mudou();
      // o botão do dia foi redesenhado: o foco do teclado volta para o novo
      if (dia) {
        const novo = caixa.querySelector('[data-cal-dia="' + v.dia + '"]');
        if (novo) novo.focus();
      }
    });
    raiz.addEventListener('change', e => {
      const campo = e.target.dataset && e.target.dataset.calCampo;
      if (campo === 'mes') {
        v.mes = +e.target.value;
        if (v.mes === 0 && v.dia > CAL.nimb.max) v.dia = 1;
      } else if (campo === 'apos') {
        v.apos = +e.target.value;
      } else return;
      mudou();
    });
    raiz.addEventListener('input', e => {
      if (!(e.target.dataset && e.target.dataset.calCampo === 'ano')) return;
      const n = parseInt(e.target.value, 10);
      anoProprio = isFinite(n) ? n : null;
      mudou();
    });

    desenhar();
    return { valor: valor, redesenhar: desenhar };
  }

  window.GA_Calendario = {
    FORMAS: FORMAS,
    formaOk: formaOk,
    anoDoLivro: CAL.anoDoLivro,
    valida: valida,
    mes: mes,
    diaDaSemana: diaDaSemana,
    festa: festa,
    porExtenso: porExtenso,
    anoNum: anoNum,
    escrever: escrever,
    compacta: compacta,
    ordem: ordem,
    nuvem: nuvem,
    ler: ler,
    seletor: seletor,
  };
})();
