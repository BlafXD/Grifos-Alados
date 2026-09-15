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
//     Desde 15/09/2026 o mestre e o auxiliar podem rolar ESCONDIDO (o
//     🙈 do painel): a rolagem não vai para o banco, fica só neste
//     aparelho, e o "👁 revelar" de cada uma a manda para a mesa quando
//     ele quiser. Ver "AS ROLAGENS ESCONDIDAS", mais abaixo.
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

  // ── AS ROLAGENS ESCONDIDAS (15/09/2026) ──────────────────────────
  //  O pedido: "eles conseguem ver as minhas rolagens e eu gostaria de
  //  uma opção para esconder e o mesmo botão para revelar caso eu
  //  queira". O 👁 no cabeçalho do painel vira 🙈 e liga o modo; o mesmo
  //  botão o desliga. Ligado, o que o mestre ou o auxiliar rola — no
  //  painel, no ⚔ Combates ou numa ficha — NÃO vai para o banco.
  //
  //  Não é esconder na tela: é não mandar. O jogador não tem como ler o
  //  que nunca chegou ao banco — a mesma ideia do 🙈 das Bases e das
  //  Viagens. Por isso a escondida mora SÓ no aparelho que rolou (escolha
  //  dele, que dispensou regra nova no Firebase), e o preço está dito:
  //  o auxiliar não vê a do mestre, e o celular não vê a do computador.
  //
  //  Cada escondida tem o seu "👁 revelar": ela vai para a mesa naquela
  //  hora, levando o horário em que foi rolada (`roladaEm`), e dali em
  //  diante é uma rolagem como qualquer outra — só de acrescentar.
  const SEGREDO_KEY = 'grifosAlados.rolagensSegredo';
  const OCULTAS_KEY = 'grifosAlados.rolagensOcultas';
  let segredo = false;
  let ocultas = {};           // sala → [{ id, uid, autor, criatura, pericia, formula, tipo, quando }]
  try { segredo = localStorage.getItem(SEGREDO_KEY) === '1'; } catch (e) {}
  try { ocultas = JSON.parse(localStorage.getItem(OCULTAS_KEY) || '{}') || {}; } catch (e) { ocultas = {}; }
  const revelando = {};       // id → a escrita ainda não voltou
  let recado = '';            // o que deu errado ao revelar, para o painel dizer

  // Só quem transmite a mesa (mestre e auxiliar) esconde: é o dado de
  // quem narra que o jogador não pode ver.
  function podeEsconder() { return !!(mesa && mesa.souMembro && mesa.transmite); }
  function emSegredo() { return segredo && podeEsconder(); }
  function ocultasDaSala() {
    const s = mesa && mesa.mesaId;
    return (s && Array.isArray(ocultas[s])) ? ocultas[s] : [];
  }
  function guardarOcultas() {
    // sala sem nada escondido não ocupa lugar no localStorage
    Object.keys(ocultas).forEach(s => {
      if (!Array.isArray(ocultas[s]) || !ocultas[s].length) delete ocultas[s];
    });
    window.GA_guardar(OCULTAS_KEY, JSON.stringify(ocultas));
  }
  function ligarSegredo(sim) {
    segredo = !!sim;
    window.GA_guardar(SEGREDO_KEY, segredo ? '1' : '0');
    render();
  }

  // Manda uma rolagem para a mesa. `entrada` é o mesmo formato do log do
  // Combates ({criatura, pericia, formula, tipo}) — assim o painel e a
  // aba ⚔ mostram a mesma coisa do mesmo jeito.
  function publicar(entrada) {
    const b = db();
    if (!b || !mesa || !mesa.escreve || !entrada) return;
    const u = mesa.usuario;
    const linha = {
      uid:      u.uid,
      autor:    u.displayName || u.email || 'alguém',
      criatura: String(entrada.criatura || ''),
      pericia:  String(entrada.pericia || ''),
      formula:  String(entrada.formula || ''),
      tipo:     String(entrada.tipo || 'chat'),
    };
    if (emSegredo()) return esconder(linha);
    linha.quando = firebase.database.ServerValue.TIMESTAMP;
    b.ref('mesas/' + mesa.mesaId + '/rolagens').push(linha)
      .catch(e => console.warn('[rolagens] não deu para publicar:', e && e.message));
  }

  function esconder(linha) {
    const s = mesa.mesaId;
    const l = Array.isArray(ocultas[s]) ? ocultas[s] : (ocultas[s] = []);
    l.push(Object.assign({
      id: 'o' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      quando: Date.now(),
    }, linha));
    if (l.length > LIMITE) l.splice(0, l.length - LIMITE);
    guardarOcultas();
    render();
  }

  // Revelar é publicar DEPOIS, com o horário de quando foi rolada. A
  // regra do banco só aceita rolagem com o uid de quem escreve: a
  // escondida feita com outra conta neste navegador não passa — e o
  // painel diz isso, em vez de falhar calado.
  function revelar(id) {
    const b = db();
    const s = mesa && mesa.mesaId;
    const o = ocultasDaSala().find(x => x.id === id);
    if (!b || !o || revelando[id] || !mesa.escreve) return Promise.resolve(false);
    if (!mesa.usuario || o.uid !== mesa.usuario.uid) {
      recado = 'essa foi rolada com outra conta — entre com ela para revelar';
      render();
      return Promise.resolve(false);
    }
    revelando[id] = true;
    render();
    return b.ref('mesas/' + s + '/rolagens').push({
      uid: o.uid, autor: o.autor, criatura: o.criatura, pericia: o.pericia,
      formula: o.formula, tipo: o.tipo,
      quando: firebase.database.ServerValue.TIMESTAMP,
      roladaEm: o.quando,
    }).then(() => {
      delete revelando[id];
      if (Array.isArray(ocultas[s])) ocultas[s] = ocultas[s].filter(x => x.id !== id);
      guardarOcultas();
      render();
      return true;
    }, e => {
      delete revelando[id];
      recado = 'não deu para revelar: ' + ((e && e.message) || 'erro');
      render();
      return false;
    });
  }

  // Uma de cada vez, na ordem em que foram roladas: elas chegam à mesa na
  // mesma ordem em que aconteceram.
  function revelarTodas() {
    return ocultasDaSala().map(o => o.id)
      .reduce((p, id) => p.then(() => revelar(id)), Promise.resolve());
  }

  // Rola e publica em um passo — é o que o painel e os botões usam.
  //  Sem `rotulo` não se põe "criatura" nenhuma: a linha do autor já diz
  //  quem rolou, e repetir o nome logo abaixo era só eco.
  function rolarEPublicar(expr, rotulo) {
    const r = avaliar(expr);            // estoura se a expressão não presta
    publicar({ criatura: rotulo ? '🎲 ' + rotulo : '', pericia: expr, formula: r.detalhe, tipo: 'chat' });
    return r;
  }

  // O 🗑 do mestre esvazia o log da mesa inteira — e, junto, as que ELE
  // escondeu neste aparelho (as da sala aberta).
  function limpar() {
    const b = db();
    if (!b || !mesa || !mesa.souMestre) return;
    if (ocultas[mesa.mesaId]) { delete ocultas[mesa.mesaId]; guardarOcultas(); render(); }
    b.ref('mesas/' + mesa.mesaId + '/rolagens').remove()
      .catch(e => console.warn('[rolagens] não deu para limpar:', e && e.message));
  }
  // O auxiliar não limpa a mesa, mas as escondidas dele são dele.
  function limparOcultas() {
    if (!mesa || !ocultas[mesa.mesaId]) return;
    delete ocultas[mesa.mesaId];
    guardarOcultas();
    render();
  }

  // O que o painel mostra: o log da mesa e as escondidas deste aparelho,
  // tudo na ordem em que aconteceu.
  function listaDaTela() {
    const minhas = (mesa && mesa.souMembro)
      ? ocultasDaSala().map(o => Object.assign({ oculta: true }, o)) : [];
    return lista.concat(minhas).sort((a, b2) => (a.quando || 0) - (b2.quando || 0));
  }

  window.GA_Rolagens = {
    publicar: publicar, rolarEPublicar: rolarEPublicar, limpar: limpar,
    lista: () => lista.slice(),
    ocultas: () => ocultasDaSala().slice(),
    emSegredo: emSegredo,
    esconder: ligarSegredo,             // esconder(true) liga, esconder(false) desliga
    revelar: revelar, revelarTodas: revelarTodas,
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
      if (e.target.closest('[data-rol-segredo]')) return ligarSegredo(!segredo);
      const rev = e.target.closest('[data-rol-revelar]');
      if (rev) return revelar(rev.dataset.rolRevelar);
      if (e.target.closest('[data-rol-revelar-todas]')) return revelarTodas();
      if (e.target.closest('[data-rol-limpar-ocultas]')) return limparOcultas();
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
    if (!campo) return;
    const txt = (campo.value || '').trim();
    if (!txt) return;
    try {
      campo.value = '';
      rolarEPublicar(txt);
      const aviso = document.getElementById('gaRolAviso');
      if (aviso) aviso.textContent = '';
    } catch (err) {
      const c = document.getElementById('gaRolExpr');
      if (c) c.value = txt;
      const aviso = document.getElementById('gaRolAviso');
      if (aviso) aviso.textContent = '⚠ ' + err.message;
    }
  }

  function hora(t) {
    try { return new Date(t).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }); }
    catch (e) { return ''; }
  }

  function linha(r) {
    let pe = '';
    if (r.oculta) {
      pe = '<div class="ga-rol-pe">' +
        '<span class="ga-rol-tag" title="Não foi para a mesa: está só neste aparelho">🙈 só você vê · ' +
          esc(hora(r.quando)) + '</span>' +
        '<button type="button" class="ga-rol-revelar" data-rol-revelar="' + esc(r.id) + '"' +
          (revelando[r.id] ? ' disabled' : '') +
          ' title="Mandar esta rolagem para a mesa — todo mundo passa a ver">' +
          (revelando[r.id] ? 'revelando…' : '👁 revelar') + '</button>' +
      '</div>';
    } else if (r.roladaEm) {
      pe = '<div class="ga-rol-revelada" title="Foi rolada escondida e revelada depois">👁 revelada · rolada às ' +
        esc(hora(r.roladaEm)) + '</div>';
    }
    return '<div class="ga-rol-item' + (r.oculta ? ' ga-rol-item--oculta' : '') + '">' +
      '<div class="ga-rol-quem">' + esc(r.autor || '') +
        (r.criatura ? ' <span class="ga-rol-alvo">' + esc(r.criatura) + '</span>' : '') + '</div>' +
      (r.pericia ? '<div class="ga-rol-pericia">' + esc(r.pericia) + '</div>' : '') +
      '<div class="ga-rol-formula">' + (r.formula || '') + '</div>' +
      pe +
    '</div>';
  }

  // A faixa diz o estado com todas as letras: rolar achando que a mesa
  // está vendo (ou que não está) é o engano que este modo pode causar.
  function faixa(nOcultas) {
    if (!emSegredo() && !nOcultas) return '';
    return '<div class="ga-rol-faixa">' +
      (emSegredo()
        ? '<span>🙈 <strong>Rolando escondido.</strong> O que você rolar fica só neste aparelho.</span>'
        : '<span>👁 Suas rolagens voltaram a aparecer para a mesa.</span>') +
      (nOcultas
        ? '<span class="ga-rol-faixa-acoes">' +
            '<button type="button" class="ga-rol-revelar" data-rol-revelar-todas' +
              ' title="Mandar para a mesa, na ordem em que foram roladas">👁 revelar ' +
              (nOcultas === 1 ? 'a escondida' : 'as ' + nOcultas) + '</button>' +
            (mesa.souMestre ? '' :
              '<button type="button" class="ga-rol-revelar ga-rol-revelar--sec" data-rol-limpar-ocultas' +
              ' title="Apagar as escondidas deste aparelho, sem revelar">✕ apagar</button>') +
          '</span>'
        : '') +
    '</div>';
  }

  function render() {
    // sem mesa, sem painel: quem não é da mesa não tem log para ver
    if (!mesa || !mesa.souMembro) {
      if (painel) { painel.remove(); painel = null; }
      return;
    }
    const el = montarPainel();
    const itens = listaDaTela();
    const nOcultas = itens.filter(r => r.oculta).length;
    // redesenhar não pode engolir a expressão que está sendo digitada
    const campoAntes = document.getElementById('gaRolExpr');
    const digitado = campoAntes ? campoAntes.value : '';
    const tinhaFoco = !!campoAntes && document.activeElement === campoAntes;

    el.className = 'ga-rol' + (aberto ? '' : ' ga-rol--fechado') + (emSegredo() ? ' ga-rol--segredo' : '');
    const corpo = aberto ? '' +
      faixa(nOcultas) +
      '<div class="ga-rol-lista" id="gaRolLista">' +
        (itens.length ? itens.map(linha).join('')
                      : '<p class="ga-rol-vazio">Nenhuma rolagem ainda nesta mesa.</p>') +
      '</div>' +
      (mesa.escreve ? '' +
        '<div class="ga-rol-chat">' +
          '<input type="text" id="gaRolExpr" placeholder="' + (emSegredo() ? '1d20+5 · escondido' : '1d20+5') +
            '" autocomplete="off">' +
          '<button type="button" class="ga-rol-btn" data-rol-rolar>rolar</button>' +
        '</div><p class="ga-rol-aviso" id="gaRolAviso">' + (recado ? '⚠ ' + esc(recado) : '') + '</p>'
        : '<p class="ga-rol-aviso">Você está como espectador — vê as rolagens, não rola.</p>')
      : '';
    recado = '';
    el.innerHTML =
      '<div class="ga-rol-cab">' +
        '<button type="button" class="ga-rol-tit" data-rol-toggle>🎲 Rolagens' +
          (itens.length ? ' <span class="ga-rol-cont">' + itens.length + '</span>' : '') + '</button>' +
        (podeEsconder()
          ? '<button type="button" class="ga-rol-x ga-rol-olho' + (segredo ? ' ga-rol-olho--on' : '') + '" data-rol-segredo' +
            ' aria-pressed="' + (segredo ? 'true' : 'false') + '" title="' + (segredo
              ? 'Rolando ESCONDIDO: o que você rola fica só neste aparelho. Clique para voltar a mostrar à mesa.'
              : 'Suas rolagens aparecem para a mesa. Clique para rolar escondido.') + '">' +
            (segredo ? '🙈' : '👁') + '</button>'
          : '') +
        (aberto && mesa.souMestre ? '<button type="button" class="ga-rol-x" data-rol-limpar title="Limpar o log da mesa (e as suas escondidas)">🗑</button>' : '') +
        '<button type="button" class="ga-rol-x" data-rol-toggle title="' + (aberto ? 'Recolher' : 'Abrir') + '">' + (aberto ? '▾' : '▴') + '</button>' +
      '</div>' + corpo;
    const campo = document.getElementById('gaRolExpr');
    if (campo && digitado) campo.value = digitado;
    if (campo && tinhaFoco) campo.focus();
    const cx = document.getElementById('gaRolLista');
    if (cx) cx.scrollTop = cx.scrollHeight;
  }

  // ⚠ Mesma armadilha da iniciativa.js: o mesa.js é carregado DEPOIS
  //  deste arquivo, e um script `defer` roda com readyState já em
  //  "interactive" — não em "loading". O init() acontecia antes de o
  //  GA_Mesa existir, dava o `return` mudo, e o painel de rolagens da
  //  mesa não aparecia para ninguém, nunca.
  function init(segundaChance) {
    if (!window.GA_Mesa) {
      // o mesa.js ainda pode estar na fila dos `defer`; o
      // DOMContentLoaded só dispara depois que todos rodaram
      if (!segundaChance && document.readyState !== 'complete') {
        document.addEventListener('DOMContentLoaded', () => init(true), { once: true });
      }
      return;
    }
    window.GA_Mesa.aoMudar(e => {
      mesa = e;
      ligar();
      render();
    });
  }
  init();
})();
