const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '../js/iniciativa.js'), 'utf8');
const json = value => JSON.parse(JSON.stringify(value));

function ambiente(combate, { online = false, transmite = true } = {}) {
  const storage = new Map([['grifosAlados.iniciativaLocal', JSON.stringify(combate)]]);
  const avisos = [], subscriptions = [], panels = [];
  let listener;
  let mesa = { mesaId: 'campanha', souMembro: online, transmite,
    usuario: { uid: 'mestre' }, membros: {}, minhasMesas: {} };
  const initial = { ...combate };
  function node() {
    return { innerHTML: '', handlers: {}, classList: { add() {}, remove() {} },
      addEventListener(type, cb) { this.handlers[type] = cb; },
      remove() {}, contains() { return false; }, querySelector() { return null; }, querySelectorAll() { return []; } };
  }
  function snapshotAt(p) {
    if (p.endsWith('/iniciativa')) return initial;
    if (p.includes('/iniciativa/')) return initial[p.split('/').at(-1)] ?? null;
    return combate.valores || {};
  }
  const db = { ref(p) { return {
    on(event, cb) { subscriptions.push({ path: p, cb, active: true }); cb({ val: () => snapshotAt(p) }); return cb; },
    off(event, cb) { const s = subscriptions.find(s => s.cb === cb); if (s) s.active = false; },
    update(patch) { Object.assign(initial, patch); emit(); return Promise.resolve(); },
  }; } };
  function emit() {
    for (const s of subscriptions.filter(s => s.active && !s.path.endsWith('iniciativaValores'))) {
      s.cb({ val: () => snapshotAt(s.path) });
    }
  }
  const window = {
    GA_esc: s => String(s ?? ''),
    GA_Ficha: { avisoTurno(id, rodada) { avisos.push({ id, rodada }); }, visiveis: () => [] },
    GA_Mesa: { db: () => db, aoMudar(cb) { listener = cb; cb(mesa); } },
  };
  vm.runInNewContext(source, {
    window, console, confirm: () => true,
    setTimeout: () => 0, clearTimeout() {},
    localStorage: { getItem: k => storage.get(k) ?? null, setItem: (k, v) => storage.set(k, v), removeItem: k => storage.delete(k) },
    document: { readyState: 'complete', activeElement: null,
      getElementById: id => id === 'monstros' ? {} : null,
      createElement: node, body: { insertBefore(el) { panels.push(el); } },
    },
  }, { filename: 'iniciativa.js' });
  return { api: window.GA_Iniciativa, avisos, subscriptions,
    change(patch) { mesa = { ...mesa, ...patch }; listener(mesa); },
    click(acao, id) {
      panels.at(-1).handlers.click({ preventDefault() {}, target: { closest: () => ({ dataset: { ini: acao, id } }) } });
    },
    saved() { return JSON.parse(storage.get('grifosAlados.iniciativaLocal')); },
  };
}

function combate(extra = {}) {
  return { linhas: {
    a: { nome: 'Aria', fichaId: 'f-a', tipo: 'jogador', ordem: 0 },
    b: { nome: 'Borin', fichaId: 'f-b', tipo: 'jogador', ordem: 1 },
  }, atual: 'a', rodada: 3, valores: {}, ...extra };
}

for (const online of [false, true]) {
  test(`aviso de turno usa o combatente e a rodada novos (${online ? 'mesa' : 'local'})`, () => {
    const h = ambiente(combate(), { online });
    assert.equal(h.avisos.length, 0, 'carregar não abre um turno que já estava em andamento');
    h.api.passar();
    h.api.passar();
    assert.deepEqual(h.avisos, [{ id: 'f-b', rodada: 3 }, { id: 'f-a', rodada: 4 }]);
    assert.equal(h.api.rodadaAtual(), 4);
  });

  test(`único sobrevivente recebe aviso a cada rodada (${online ? 'mesa' : 'local'})`, () => {
    const data = combate(); data.linhas.b.morto = true;
    const h = ambiente(data, { online });
    h.api.passar();
    h.api.passar();
    assert.deepEqual(h.avisos, [{ id: 'f-a', rodada: 4 }, { id: 'f-a', rodada: 5 }]);
  });
}

test('prévia do turno pula os mortos como o botão de passar', () => {
  const data = combate(); data.linhas.b.morto = true;
  const h = ambiente(data);
  assert.equal(h.api.cenaAgora().proximo.nome, 'Aria');
  assert.equal(h.api.cenaAgora().viraRodada, true);
});

test('todos mortos deixam a prévia sem próximo combatente', () => {
  const data = combate(); data.linhas.a.morto = data.linhas.b.morto = true;
  const h = ambiente(data);
  assert.equal(h.api.cenaAgora().proximo, null);
  h.api.passar();
  assert.equal(h.api.rodadaAtual(), 3);
});

test('promover e rebaixar na mesma mesa atualiza os valores privados da iniciativa', () => {
  const h = ambiente(combate(), { online: true, transmite: false });
  assert.equal(h.subscriptions.filter(s => s.active && s.path.endsWith('iniciativaValores')).length, 0);
  h.change({ transmite: true });
  assert.equal(h.subscriptions.filter(s => s.active && s.path.endsWith('iniciativaValores')).length, 1);
  h.change({ transmite: false });
  assert.equal(h.subscriptions.filter(s => s.active && s.path.endsWith('iniciativaValores')).length, 0);
  assert.equal(h.avisos.length, 0, 'trocar papel não deve disparar início de turno');
});

test('setas conservam ordens únicas quando um morto foi para o fim da lista', () => {
  const data = combate();
  data.linhas.a.morto = true;
  data.linhas.c = { nome: 'Cora', tipo: 'jogador', ordem: 2 };
  const h = ambiente(data);
  h.click('desce', 'b');
  assert.deepEqual(json(h.api.combatentes()).map(x => x.id), ['c', 'b', 'a']);
  assert.equal(new Set(Object.values(h.saved().linhas).map(x => x.ordem)).size, 3);
});

test('resposta de iniciativa de uma sessão encerrada não substitui a lista atual', () => {
  const h = ambiente(combate(), { online: true });
  const antiga = h.subscriptions.find(s => s.path.endsWith('/iniciativa'));
  h.change({ usuario: { uid: 'outra-conta' } });
  antiga.cb({ val: () => ({ linhas: { x: { nome: 'Campanha anterior', ordem: 0 } }, atual: 'x', rodada: 99 }) });
  assert.equal(h.api.rodadaAtual(), 3);
  assert.deepEqual(json(h.api.combatentes()).map(x => x.nome), ['Aria', 'Borin']);
});
