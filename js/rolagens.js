// ═══════════════════════════════════════════════════════════════════
//  ROLAGENS.JS — os dados da casa, e o log que a mesa inteira vê
//  Carregado nas DUAS páginas. Faz duas coisas:
//
//  1. GA_Dados — o rolador. Estava dentro do monstros.js e servia só ao
//     mestre; virou módulo porque a página dos jogadores precisa do
//     MESMO rolador, e duas cópias divergiriam no primeiro conserto.
//     Entende dados (XdY), números e + − × ÷ com parênteses.
//
//  2. GA_Rolagens — o log ao vivo. Cada rolagem vai para
//     `mesas/<sala>/rolagens` e aparece na tela de todo mundo em
//     segundos. É só de ACRESCENTAR: a regra do banco não deixa editar
//     nem apagar uma rolagem já feita, então ninguém "conserta" um 1
//     natural. Só o mestre limpa o log inteiro.
//
//  Quem rola é o navegador de quem clicou — sem servidor, um jogador
//  PODE forjar um resultado. Numa mesa de amigos isso é aceitável, e o
//  histórico visível para todos é o que mantém a coisa honesta.
//  Decidido em 08/09/2026; ver docs/mesa-de-verdade.md §1.
// ═══════════════════════════════════════════════════════════════════
(function () {
  'use strict';

  const esc = window.GA_esc;

  // ═══ 1. O ROLADOR ═════════════════════════════════════════════════
  const MAX_QTD_DADOS  = 100;    // máximo de dados numa única rolagem
  const MAX_LADOS_DADO = 1000;   // máximo de lados de um dado

  function rolar(lados) { return 1 + Math.floor(Math.random() * lados); }

  // 20 natural fica verde, 1 natural fica vermelho.
  function formatarD20(v) {
    if (v === 20) return '<span class="mz-d20-max">20</span>';
    if (v === 1)  return '<span class="mz-d20-min">1</span>';
    return String(v);
  }

  function tokenizar(txt) {
    const s = String(txt || '').replace(/\s+/g, '').toLowerCase();
    if (s === '') throw new Error('Digite uma expressão.');

    const re = /(\d*d\d+)|(\d+)|([+\-*/()])/y;
    const tokens = [];
    let m, pos = 0;
    while ((m = re.exec(s)) !== null) {
      pos = re.lastIndex;
      if (m[1]) {                                   // dado XdY
        const partes = m[1].split('d');
        const qtd   = partes[0] === '' ? 1 : parseInt(partes[0], 10);
        const lados = parseInt(partes[1], 10);
        if (qtd < 1 || qtd > MAX_QTD_DADOS)
          throw new Error('Quantidade de dados deve ser de 1 a ' + MAX_QTD_DADOS + '.');
        if (lados < 2 || lados > MAX_LADOS_DADO)
          throw new Error('Tipo de dado inválido (use d2 até d' + MAX_LADOS_DADO + ').');
        const rolls = [];
        for (let i = 0; i < qtd; i++) rolls.push(rolar(lados));
        rolls.sort((a, b) => b - a);                // ordem decrescente
        tokens.push({ tipo: 'dado', qtd: qtd, lados: lados, rolls: rolls,
                      total: rolls.reduce((a, b) => a + b, 0) });
      } else if (m[2]) {
        tokens.push({ tipo: 'num', valor: parseInt(m[2], 10) });
      } else if (m[3] === '(') {
        tokens.push({ tipo: 'abre' });
      } else if (m[3] === ')') {
        tokens.push({ tipo: 'fecha' });
      } else {
        tokens.push({ tipo: 'op', op: m[3] });
      }
    }
    if (pos !== s.length)
      throw new Error('Não entendi "' + s.slice(pos, pos + 8) + '"…');
    if (tokens.length === 0) throw new Error('Digite uma expressão.');
    return tokens;
  }

  // Respeita a ordem matemática (× e ÷ antes de + e −).
  function calcular(tokens) {
    let i = 0;
    function expr() {
      let v = termo();
      while (tokens[i] && tokens[i].tipo === 'op' &&
             (tokens[i].op === '+' || tokens[i].op === '-')) {
        const op = tokens[i++].op;
        const r = termo();
        v = (op === '+') ? v + r : v - r;
      }
      return v;
    }
    function termo() {
      let v = fator();
      while (tokens[i] && tokens[i].tipo === 'op' &&
             (tokens[i].op === '*' || tokens[i].op === '/')) {
        const op = tokens[i++].op;
        const r = fator();
        if (op === '/') {
          if (r === 0) throw new Error('Divisão por zero.');
          v = v / r;
        } else { v = v * r; }
      }
      return v;
    }
    function fator() {
      const t = tokens[i];
      if (!t) throw new Error('Expressão incompleta.');
      if (t.tipo === 'num')  { i++; return t.valor; }
      if (t.tipo === 'dado') { i++; return t.total; }
      if (t.tipo === 'op' && t.op === '-') { i++; return -fator(); }
      if (t.tipo === 'op' && t.op === '+') { i++; return  fator(); }
      if (t.tipo === 'abre') {
        i++;
        const v = expr();
        if (!tokens[i] || tokens[i].tipo !== 'fecha')
          throw new Error('Parêntese não fechado.');
        i++;
        return v;
      }
      throw new Error('Expressão malformada.');
    }
    const resultado = expr();
    if (i !== tokens.length) throw new Error('Expressão malformada.');
    return resultado;
  }

  // A string de detalhamento, com os dados à vista.
  function detalhar(tokens) {
    const simbolo = { '+': '+', '-': '−', '*': '×', '/': '÷' };
    return tokens.map(t => {
      if (t.tipo === 'num')   return String(t.valor);
      if (t.tipo === 'op')    return simbolo[t.op] || t.op;
      if (t.tipo === 'abre')  return '(';
      if (t.tipo === 'fecha') return ')';
      if (t.tipo === 'dado') {
        const vals = t.rolls.map(r => t.lados === 20 ? formatarD20(r) : r).join(', ');
        return t.qtd + 'd' + t.lados + ' (' + vals + ')';
      }
      return '';
    }).join(' ');
  }

  // Rola uma expressão inteira. Estoura com mensagem em português se o
  // que foi digitado não fizer sentido — quem chama mostra o recado.
  function avaliar(txt) {
    const tokens = tokenizar(txt);
    const total  = calcular(tokens);
    const totalFmt = Number.isInteger(total) ? total : Math.round(total * 100) / 100;
    return {
      total: totalFmt,
      detalhe: detalhar(tokens) + ' = <strong>' + totalFmt + '</strong>',
    };
  }

  window.GA_Dados = {
    rolar: rolar, formatarD20: formatarD20, avaliar: avaliar,
    MAX_QTD_DADOS: MAX_QTD_DADOS, MAX_LADOS_DADO: MAX_LADOS_DADO,
  };

  // ═══ 2. O LOG DA MESA ═════════════════════════════════════════════
  const LIMITE = 40;          // quantas rolagens o painel guarda à vista
  let ref = null, cb = null, salaLigada = '';
  let lista = [];             // as últimas rolagens, mais antiga primeiro
  let mesa = null;            // último estado do GA_Mesa

  function db() { return window.GA_Mesa ? window.GA_Mesa.db() : null; }

  function ligar() {
    const b = db();
    if (!b || !mesa || !mesa.souMembro) return desligar();
    const sala = mesa.mesaId;
    if (sala === salaLigada) return;
    desligar();
    salaLigada = sala;
    ref = b.ref('mesas/' + sala + '/rolagens').limitToLast(LIMITE);
    cb = ref.on('value', snap => {
      const v = snap.val() || {};
      lista = Object.keys(v).map(k => Object.assign({ id: k }, v[k]))
        .sort((a, b2) => (a.quando || 0) - (b2.quando || 0));
      render();
    }, err => console.warn('[rolagens]', err && err.message));
  }
  function desligar() {
    if (ref && cb) { try { ref.off('value', cb); } catch (e) {} }
    ref = null; cb = null; salaLigada = ''; lista = [];
  }

  // Manda uma rolagem para a mesa. `entrada` é o mesmo formato do log do
  // Combates ({criatura, pericia, formula, tipo}) — assim o painel e a
  // aba ⚔ mostram a mesma coisa do mesmo jeito.
  function publicar(entrada) {
    const b = db();
    if (!b || !mesa || !mesa.escreve || !entrada) return;
    const u = mesa.usuario;
    b.ref('mesas/' + mesa.mesaId + '/rolagens').push({
      uid:      u.uid,
      autor:    u.displayName || u.email || 'alguém',
      criatura: String(entrada.criatura || ''),
      pericia:  String(entrada.pericia || ''),
      formula:  String(entrada.formula || ''),
      tipo:     String(entrada.tipo || 'chat'),
      quando:   firebase.database.ServerValue.TIMESTAMP,
    }).catch(e => console.warn('[rolagens] não deu para publicar:', e && e.message));
  }

  // Rola e publica em um passo — é o que o painel e os botões usam.
  //  Sem `rotulo` não se põe "criatura" nenhuma: a linha do autor já diz
  //  quem rolou, e repetir o nome logo abaixo era só eco.
  function rolarEPublicar(expr, rotulo) {
    const r = avaliar(expr);            // estoura se a expressão não presta
    publicar({ criatura: rotulo ? '🎲 ' + rotulo : '', pericia: expr, formula: r.detalhe, tipo: 'chat' });
    return r;
  }

  function limpar() {
    const b = db();
    if (!b || !mesa || !mesa.souMestre) return;
    b.ref('mesas/' + mesa.mesaId + '/rolagens').remove()
      .catch(e => console.warn('[rolagens] não deu para limpar:', e && e.message));
  }

  window.GA_Rolagens = {
    publicar: publicar, rolarEPublicar: rolarEPublicar, limpar: limpar,
    lista: () => lista.slice(),
  };

  // ═══ 3. O PAINEL FLUTUANTE ════════════════════════════════════════
  //  Fica no canto de baixo à ESQUERDA, longe do 📡 (canto direito) e do
  //  selinho da página dos jogadores (embaixo, no meio). Aparece só para
  //  quem é da mesa — visitante não tem o que ver aqui.
  // A coluna do canto de baixo à esquerda, dividida com a Iniciativa:
  //  dois painéis fixos no mesmo canto se cobririam, então eles moram
  //  numa pilha só. Quem chegar primeiro cria; a iniciativa entra por
  //  cima (é o que se olha durante o combate).
  function coluna() {
    let col = document.getElementById('gaColunaMesa');
    if (!col) {
      col = document.createElement('div');
      col.id = 'gaColunaMesa';
      col.className = 'ga-coluna-mesa';
      document.body.appendChild(col);
    }
    return col;
  }
  window.GA_ColunaMesa = coluna;

  let painel = null, aberto = true;
  const ABERTO_KEY = 'grifosAlados.rolagensAberto';
  try { aberto = localStorage.getItem(ABERTO_KEY) !== '0'; } catch (e) {}

  function montarPainel() {
    if (painel) return painel;
    painel = document.createElement('div');
    painel.id = 'gaRolagens';
    painel.className = 'ga-rol';
    coluna().appendChild(painel);
    painel.addEventListener('click', e => {
      if (e.target.closest('[data-rol-toggle]')) {
        aberto = !aberto;
        try { localStorage.setItem(ABERTO_KEY, aberto ? '1' : '0'); } catch (err) {}
        return render();
      }
      if (e.target.closest('[data-rol-limpar]')) return limpar();
      if (e.target.closest('[data-rol-rolar]')) return rolarDoPainel();
    });
    painel.addEventListener('keydown', e => {
      if (e.key === 'Enter' && e.target.id === 'gaRolExpr') { e.preventDefault(); rolarDoPainel(); }
    });
    return painel;
  }

  function rolarDoPainel() {
    const campo = document.getElementById('gaRolExpr');
    const aviso = document.getElementById('gaRolAviso');
    if (!campo) return;
    const txt = (campo.value || '').trim();
    if (!txt) return;
    try {
      rolarEPublicar(txt);
      campo.value = '';
      if (aviso) aviso.textContent = '';
    } catch (err) {
      if (aviso) aviso.textContent = '⚠ ' + err.message;
    }
  }

  function linha(r) {
    return '<div class="ga-rol-item">' +
      '<div class="ga-rol-quem">' + esc(r.autor || '') +
        (r.criatura ? ' <span class="ga-rol-alvo">' + esc(r.criatura) + '</span>' : '') + '</div>' +
      (r.pericia ? '<div class="ga-rol-pericia">' + esc(r.pericia) + '</div>' : '') +
      '<div class="ga-rol-formula">' + (r.formula || '') + '</div>' +
    '</div>';
  }

  function render() {
    // sem mesa, sem painel: quem não é da mesa não tem log para ver
    if (!mesa || !mesa.souMembro) {
      if (painel) { painel.remove(); painel = null; }
      return;
    }
    const el = montarPainel();
    el.className = 'ga-rol' + (aberto ? '' : ' ga-rol--fechado');
    const corpo = aberto ? '' +
      '<div class="ga-rol-lista" id="gaRolLista">' +
        (lista.length ? lista.map(linha).join('')
                      : '<p class="ga-rol-vazio">Nenhuma rolagem ainda nesta mesa.</p>') +
      '</div>' +
      (mesa.escreve ? '' +
        '<div class="ga-rol-chat">' +
          '<input type="text" id="gaRolExpr" placeholder="1d20+5" autocomplete="off">' +
          '<button type="button" class="ga-rol-btn" data-rol-rolar>rolar</button>' +
        '</div><p class="ga-rol-aviso" id="gaRolAviso"></p>'
        : '<p class="ga-rol-aviso">Você está como espectador — vê as rolagens, não rola.</p>')
      : '';
    el.innerHTML =
      '<div class="ga-rol-cab">' +
        '<button type="button" class="ga-rol-tit" data-rol-toggle>🎲 Rolagens' +
          (lista.length ? ' <span class="ga-rol-cont">' + lista.length + '</span>' : '') + '</button>' +
        (aberto && mesa.souMestre ? '<button type="button" class="ga-rol-x" data-rol-limpar title="Limpar o log da mesa">🗑</button>' : '') +
        '<button type="button" class="ga-rol-x" data-rol-toggle title="' + (aberto ? 'Recolher' : 'Abrir') + '">' + (aberto ? '▾' : '▴') + '</button>' +
      '</div>' + corpo;
    const cx = document.getElementById('gaRolLista');
    if (cx) cx.scrollTop = cx.scrollHeight;
  }

  function init() {
    if (!window.GA_Mesa) return;
    window.GA_Mesa.aoMudar(e => {
      mesa = e;
      ligar();
      render();
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
