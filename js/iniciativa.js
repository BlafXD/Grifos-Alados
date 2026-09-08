// ═══════════════════════════════════════════════════════════════════
//  INICIATIVA.JS — a ordem do combate, ao vivo para a mesa inteira
//  Carregado nas DUAS páginas. Uma lista só, de cima para baixo, com
//  criaturas e jogadores misturados; um botão passa o turno e a linha
//  da vez brilha na tela de todo mundo.
//
//  QUEM VÊ O QUÊ (decidido em 08/09/2026, ver docs/mesa-de-verdade.md
//  §10): o jogador vê **nome e ordem**, mais nada — nem PV, nem defesa,
//  nem o valor rolado. Por isso os números moram num nó à parte,
//  `iniciativa/valores`, que só o mestre lê. A lista pública tem nome,
//  tipo (para o ícone) e posição.
//
//  QUEM MEXE: mestre e auxiliar. A ordem nasce do valor (maior primeiro,
//  desempatando pelo modificador de Iniciativa — que em T20 é a
//  Destreza, como o livro manda), mas o mestre ARRASTA qualquer linha,
//  inclusive a de um jogador: é assim que se atrasa uma ação, se prepara
//  outra, e todo o resto que muda a ordem no meio do combate.
//
//  As criaturas vêm da cena que ele está narrando na aba ⚔ Combates
//  (GA_Combates.cenaParaIniciativa), e os jogadores, de quem está na
//  mesa. Quem faltou entra na mão, com nome e valor digitados.
// ═══════════════════════════════════════════════════════════════════
(function () {
  'use strict';

  const esc = window.GA_esc;

  let mesa = null;            // último estado do GA_Mesa
  let linhas = {};            // id → { nome, tipo, ordem }
  let valores = {};           // id → { valor, mod }   (só o mestre)
  let atual = null, rodada = 1;
  let refs = [], salaLigada = '';

  function db() { return window.GA_Mesa ? window.GA_Mesa.db() : null; }
  function mando() { return !!(mesa && mesa.transmite); }   // mestre ou auxiliar
  function base() { return 'mesas/' + mesa.mesaId + '/iniciativa'; }
  //  Os valores moram FORA do nó da iniciativa, e não dentro dele: no
  //  Firebase a permissão de leitura DESCE para os filhos, então um
  //  "valores" aninhado seria legível por qualquer membro — e o combinado
  //  é que o jogador não vê número nenhum. Nó irmão, regra própria.
  function baseVal() { return 'mesas/' + mesa.mesaId + '/iniciativaValores'; }

  // ── ASSINATURAS ──────────────────────────────────────────────────
  function desligar() {
    refs.forEach(r => { try { r.ref.off('value', r.cb); } catch (e) {} });
    refs = [];
    salaLigada = '';
    linhas = {}; valores = {}; atual = null; rodada = 1;
  }
  function ligar(caminho, cb) {
    const b = db(); if (!b) return;
    const ref = b.ref(caminho);
    const fn = ref.on('value', snap => { cb(snap.val()); render(); },
      err => console.warn('[iniciativa] ' + caminho + ':', err && err.message));
    refs.push({ ref: ref, cb: fn });
  }
  function assinar() {
    if (!mesa || !mesa.souMembro) return desligar();
    if (mesa.mesaId === salaLigada) return;
    desligar();
    salaLigada = mesa.mesaId;
    ligar(base() + '/linhas', v => { linhas = v || {}; });
    ligar(base() + '/atual',  v => { atual = v || null; });
    ligar(base() + '/rodada', v => { rodada = v || 1; });
    // os valores são só do mestre — assinar sendo jogador daria um
    // "permission denied" no console a cada carga, e por nada
    if (mando()) ligar(baseVal(), v => { valores = v || {}; });
  }

  // ── A LISTA ──────────────────────────────────────────────────────
  function emOrdem() {
    return Object.keys(linhas)
      .map(id => Object.assign({ id: id }, linhas[id]))
      .sort((a, b) => (a.ordem || 0) - (b.ordem || 0));
  }
  function idSeguinte() {
    const lista = emOrdem();
    if (!lista.length) return null;
    const i = lista.findIndex(l => l.id === atual);
    return { proximo: lista[(i + 1) % lista.length].id, virou: i >= 0 && i === lista.length - 1 };
  }

  // ── ESCRITAS (só quem manda) ─────────────────────────────────────
  function gravar(patch) {
    const b = db(); if (!b || !mando()) return;
    b.ref(base()).update(patch)
      .catch(e => console.warn('[iniciativa] não deu para gravar:', e && e.message));
  }

  // Monta a lista do zero: as criaturas da cena narrada + quem está na
  // mesa. Cada criatura rola 1d20 + o modificador dela; os jogadores
  // entram sem valor, para o mestre preencher com o que cada um rolou.
  function montar() {
    if (!mando()) return;
    const cena = window.GA_Combates ? window.GA_Combates.cenaParaIniciativa() : null;
    const novas = [];

    (cena ? cena.criaturas : []).forEach(cr => {
      const d = window.GA_Dados ? window.GA_Dados.rolar(20) : 0;
      novas.push({ nome: cr.nome, tipo: 'criatura', valor: d + (cr.mod || 0), mod: cr.mod || 0 });
    });
    // os jogadores da mesa entram sempre, mesmo sem valor: a lista tem de
    // mostrar o grupo inteiro, e o que falta é o número
    Object.keys(mesa.membros || {}).forEach(uid => {
      const m = mesa.membros[uid];
      if (!m || m.papel === 'espectador') return;
      novas.push({ nome: m.nome || 'jogador', tipo: 'jogador', valor: null, mod: 0 });
    });

    if (!novas.length) return;
    gravarLista(novas);
  }

  // Ordena por valor (maior primeiro), desempatando pelo modificador —
  // que em T20 é a Destreza. Sem valor vai para o fim, esperando o número.
  function ordenar(lista) {
    return lista.slice().sort((a, b) => {
      const va = (a.valor == null) ? -Infinity : a.valor;
      const vb = (b.valor == null) ? -Infinity : b.valor;
      if (vb !== va) return vb - va;
      if ((b.mod || 0) !== (a.mod || 0)) return (b.mod || 0) - (a.mod || 0);
      return String(a.nome).localeCompare(String(b.nome), 'pt-BR');
    });
  }

  function gravarLista(lista, manterAtual) {
    const b = db(); if (!b || !mando()) return;
    const ordenada = ordenar(lista);
    const publico = { linhas: {}, rodada: rodada || 1 };
    const secreto = {};
    ordenada.forEach((l, i) => {
      const id = l.id || ('l' + Date.now().toString(36) + i.toString(36));
      publico.linhas[id] = { nome: String(l.nome || ''), tipo: l.tipo === 'jogador' ? 'jogador' : 'criatura', ordem: i };
      secreto[id] = { valor: (l.valor == null ? null : l.valor), mod: l.mod || 0 };
    });
    const ids = Object.keys(publico.linhas);
    publico.atual = (manterAtual && ids.indexOf(atual) >= 0) ? atual : (ids.length ? ids[0] : null);
    // os dois numa escrita só: a lista e os valores não podem ficar
    // desencontrados nem por um instante
    b.ref('mesas/' + mesa.mesaId).update({ iniciativa: publico, iniciativaValores: secreto })
      .catch(e => console.warn('[iniciativa] não deu para montar:', e && e.message));
  }

  // A lista de agora, no formato que o gravarLista come.
  function listaAtual() {
    return emOrdem().map(l => ({
      id: l.id, nome: l.nome, tipo: l.tipo,
      valor: (valores[l.id] && valores[l.id].valor != null) ? valores[l.id].valor : null,
      mod: (valores[l.id] && valores[l.id].mod) || 0,
    }));
  }

  function passarTurno() {
    if (!mando()) return;
    const p = idSeguinte();
    if (!p) return;
    gravar(p.virou ? { atual: p.proximo, rodada: (rodada || 1) + 1 } : { atual: p.proximo });
  }

  // Arrastar é ↑/↓: troca a ordem com a vizinha e regrava só as duas.
  function mover(id, passo) {
    if (!mando()) return;
    const lista = emOrdem();
    const i = lista.findIndex(l => l.id === id);
    const j = i + passo;
    if (i < 0 || j < 0 || j >= lista.length) return;
    const patch = {};
    patch['linhas/' + lista[i].id + '/ordem'] = j;
    patch['linhas/' + lista[j].id + '/ordem'] = i;
    gravar(patch);
  }

  function mudarValor(id, valor) {
    if (!mando()) return;
    const n = parseInt(valor, 10);
    const b = db(); if (!b) return;
    b.ref(baseVal() + '/' + id + '/valor').set(isNaN(n) ? null : n)
      .catch(e => console.warn('[iniciativa] não deu para mudar o valor:', e && e.message));
  }
  function reordenar() { gravarLista(listaAtual(), true); }

  function remover(id) {
    if (!mando()) return;
    const lista = listaAtual().filter(l => l.id !== id);
    if (!lista.length) return limpar();
    gravarLista(lista, true);
  }
  function acrescentar(nome, valor) {
    if (!mando() || !nome) return;
    const n = parseInt(valor, 10);
    gravarLista(listaAtual().concat([{ nome: nome, tipo: 'jogador', valor: isNaN(n) ? null : n, mod: 0 }]), true);
  }
  function limpar() {
    const b = db(); if (!b || !mando()) return;
    b.ref('mesas/' + mesa.mesaId).update({ iniciativa: null, iniciativaValores: null })
      .catch(e => console.warn('[iniciativa] não deu para limpar:', e && e.message));
  }

  // ── O PAINEL ─────────────────────────────────────────────────────
  let painel = null, aberto = true;
  const ABERTO_KEY = 'grifosAlados.iniciativaAberta';
  try { aberto = localStorage.getItem(ABERTO_KEY) !== '0'; } catch (e) {}

  function montarPainel() {
    if (painel) return painel;
    painel = document.createElement('div');
    painel.id = 'gaIniciativa';
    painel.className = 'ga-ini';
    const col = window.GA_ColunaMesa ? window.GA_ColunaMesa() : document.body;
    col.insertBefore(painel, col.firstChild);   // acima das rolagens
    painel.addEventListener('click', aoClicar);
    painel.addEventListener('change', aoMudar);
    painel.addEventListener('keydown', e => {
      if (e.key !== 'Enter') return;
      if (e.target.id === 'gaIniNome' || e.target.id === 'gaIniValor') {
        e.preventDefault();
        acrescentar(valorDe('gaIniNome'), valorDe('gaIniValor'));
        const n = document.getElementById('gaIniNome'); if (n) n.value = '';
        const v = document.getElementById('gaIniValor'); if (v) v.value = '';
      }
    });
    return painel;
  }
  function valorDe(id) { const el = document.getElementById(id); return el ? String(el.value || '').trim() : ''; }

  function aoClicar(e) {
    const btn = e.target.closest('[data-ini]');
    if (!btn) return;
    e.preventDefault();
    const acao = btn.dataset.ini, id = btn.dataset.id;
    if (acao === 'toggle') {
      aberto = !aberto;
      try { localStorage.setItem(ABERTO_KEY, aberto ? '1' : '0'); } catch (err) {}
      return render();
    }
    if (acao === 'montar')  return montar();
    if (acao === 'passar')  return passarTurno();
    if (acao === 'limpar')  return limpar();
    if (acao === 'sobe')    return mover(id, -1);
    if (acao === 'desce')   return mover(id, 1);
    if (acao === 'tira')    return remover(id);
    if (acao === 'ordena')  return reordenar();
    if (acao === 'add') {
      acrescentar(valorDe('gaIniNome'), valorDe('gaIniValor'));
      const n = document.getElementById('gaIniNome'); if (n) n.value = '';
      const v = document.getElementById('gaIniValor'); if (v) v.value = '';
      return;
    }
    if (acao === 'vez') return gravar({ atual: id });    // clicar numa linha dá a vez a ela
  }
  function aoMudar(e) {
    const campo = e.target.closest('input[data-ini-valor]');
    if (campo) mudarValor(campo.dataset.iniValor, campo.value);
  }

  function linhaHtml(l, i) {
    const eu = l.id === atual;
    const v = valores[l.id] || {};
    const icone = l.tipo === 'jogador' ? '🧑' : '👹';
    const controles = mando() ? '' +
      '<input class="ga-ini-val" type="number" inputmode="numeric" value="' +
        (v.valor == null ? '' : esc(v.valor)) + '" data-ini-valor="' + esc(l.id) + '" title="Valor da iniciativa">' +
      '<button type="button" class="ga-ini-mini" data-ini="sobe" data-id="' + esc(l.id) + '" title="Subir">↑</button>' +
      '<button type="button" class="ga-ini-mini" data-ini="desce" data-id="' + esc(l.id) + '" title="Descer">↓</button>' +
      '<button type="button" class="ga-ini-mini ga-ini-mini--x" data-ini="tira" data-id="' + esc(l.id) + '" title="Tirar da lista">✕</button>'
      : '';
    return '<li class="ga-ini-linha' + (eu ? ' ga-ini-linha--vez' : '') + '">' +
      '<button type="button" class="ga-ini-nome" data-ini="' + (mando() ? 'vez' : '') + '" data-id="' + esc(l.id) + '"' +
        (mando() ? ' title="Dar a vez a esta linha"' : ' disabled') + '>' +
        '<span class="ga-ini-pos">' + (i + 1) + '</span>' + icone + ' ' + esc(l.nome) +
      '</button>' + controles +
    '</li>';
  }

  function render() {
    if (!mesa || !mesa.souMembro) {
      if (painel) { painel.remove(); painel = null; }
      return;
    }
    const lista = emOrdem();
    // sem lista e sem mando, não há nada a mostrar para um jogador
    if (!lista.length && !mando()) {
      if (painel) { painel.remove(); painel = null; }
      return;
    }
    const el = montarPainel();
    el.className = 'ga-ini' + (aberto ? '' : ' ga-ini--fechado');

    let corpo = '';
    if (aberto) {
      corpo = lista.length
        ? '<ol class="ga-ini-lista">' + lista.map(linhaHtml).join('') + '</ol>'
        : '<p class="ga-ini-vazio">Nenhuma iniciativa rolada. Monte com a cena que você está narrando.</p>';
      if (mando()) {
        corpo += '<div class="ga-ini-acoes">' +
          '<button type="button" class="ga-ini-btn ga-ini-btn--forte" data-ini="montar">⚔ Montar com a cena</button>' +
          (lista.length ? '<button type="button" class="ga-ini-btn" data-ini="ordena" title="Reordenar pelos valores">⇅ Ordenar</button>' +
                          '<button type="button" class="ga-ini-btn ga-ini-btn--x" data-ini="limpar">🗑 Limpar</button>' : '') +
        '</div>';
        if (lista.length) {
          corpo += '<div class="ga-ini-add">' +
            '<input type="text" id="gaIniNome" placeholder="quem faltou" autocomplete="off">' +
            '<input type="number" id="gaIniValor" placeholder="ini" inputmode="numeric">' +
            '<button type="button" class="ga-ini-btn" data-ini="add">＋</button>' +
          '</div>';
        }
      }
    }

    el.innerHTML =
      '<div class="ga-ini-cab">' +
        '<button type="button" class="ga-ini-tit" data-ini="toggle">⚔ Iniciativa' +
          (lista.length ? ' <span class="ga-ini-rodada">rodada ' + rodada + '</span>' : '') + '</button>' +
        (aberto && mando() && lista.length
          ? '<button type="button" class="ga-ini-passar" data-ini="passar" title="Passar o turno">▶</button>' : '') +
        '<button type="button" class="ga-ini-x" data-ini="toggle" title="' + (aberto ? 'Recolher' : 'Abrir') + '">' +
          (aberto ? '▾' : '▴') + '</button>' +
      '</div>' + corpo;
  }

  function init() {
    if (!window.GA_Mesa) return;
    window.GA_Mesa.aoMudar(e => {
      mesa = e;
      assinar();
      render();
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
