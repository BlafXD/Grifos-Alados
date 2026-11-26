const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const flush = () => new Promise(resolve => setImmediate(resolve));

// Os scripts reais recebem snapshots e promessas controlados. Nenhum teste
// inicializa o SDK real, usa credenciais ou acessa o banco da campanha.
function ambiente(lado, { papel = lado === 'mestre' ? 'mestre' : 'jogador', initial = {} } = {}) {
  const values = new Map(Object.entries(initial)), subscriptions = [], writes = [], timers = new Map();
  const events = new Map(), elements = new Map(), absorcoes = [], redesenhos = [];
  let timerId = 0, listener, state, delayed = false;
  class Storage {
    getItem(k) { return values.has(k) ? values.get(k) : null; }
    setItem(k, v) { values.set(k, String(v)); }
    removeItem(k) { values.delete(k); }
  }
  const localStorage = new Storage();
  function element() {
    const children = new Map();
    return {
      className: '', dataset: {}, style: {},
      classList: { add() {}, remove() {}, contains: () => false },
      addEventListener() {}, setAttribute() {},
      querySelector(selector) { if (!children.has(selector)) children.set(selector, element()); return children.get(selector); },
    };
  }
  const document = {
    readyState: 'complete', activeElement: null,
    body: { appendChild(el) { if (el.id) elements.set(el.id, el); } },
    createElement: element, getElementById: id => elements.get(id) || null,
    querySelector: () => null, querySelectorAll: () => [],
    addEventListener(name, fn) { if (!events.has(name)) events.set(name, new Set()); events.get(name).add(fn); },
    removeEventListener(name, fn) { events.get(name)?.delete(fn); },
  };
  function reference(caminho) {
    return {
      on(event, ok, fail) { subscriptions.push({ caminho, ok, fail, active: true }); return ok; },
      off(event, ok) { subscriptions.filter(s => s.caminho === caminho && s.ok === ok).forEach(s => { s.active = false; }); },
      child(id) { return reference(caminho + '/' + id); },
      update(value) {
        const w = { caminho, value: structuredClone(value), uid: state.usuario?.uid };
        writes.push(w);
        return delayed ? new Promise((resolve, reject) => { w.resolve = resolve; w.reject = reject; }) : Promise.resolve();
      },
    };
  }
  const database = () => ({ ref: reference });
  database.ServerValue = { TIMESTAMP: 123 };
  function estado(uid, role) {
    return { configurado: true, pronto: true, usuario: uid ? { uid } : null, papel: role,
      mesaId: 'alpha', escreve: !!uid && !!role && role !== 'espectador',
      transmite: !!uid && ['mestre', 'auxiliar'].includes(role), souMembro: !!role };
  }
  state = estado('conta-a', papel);
  const GA_Sala = { id: 'alpha', chave: key => key + '@alpha' };
  const window = {
    localStorage, GA_Sala, GA_FIREBASE: { apiKey: 'local-mock' }, GA_esc: s => String(s || ''),
    GA_guardar(k, v) { localStorage.setItem(k, v); return true; },
    GA_Mesa: { aoMudar(fn) { listener = fn; fn(state); }, minhasMesas: () => ({}) },
    GA_Inbox: { mapa() { return JSON.parse(localStorage.getItem(GA_Sala.chave('grifosAlados.basesJogadoresInventario')) || '{}'); } },
    GA_Bases: { receberInbox(m, dono) { absorcoes.push({ m: structuredClone(m), dono }); return false; }, recarregar() { redesenhos.push('bases'); } },
    GA_Viagem: { receberInbox() { return false; }, recarregar() { redesenhos.push('viagem'); } },
    GA_Loja: { recarregar() { redesenhos.push('loja'); } },
    GA_abrirModal: () => element(),
  };
  const context = vm.createContext({ ...window, window, document, localStorage, Storage, Set,
    firebase: { apps: [{}], database },
    console: { warn() {} }, Element: class {},
    setTimeout(fn, ms) { const id = ++timerId; timers.set(id, { fn, ms }); return id; },
    clearTimeout(id) { timers.delete(id); },
  });
  vm.runInContext(fs.readFileSync(path.join(root, 'js/sync-' + lado + '.js'), 'utf8'), context);
  return {
    api: window[lado === 'mestre' ? 'GA_SyncMestre' : 'GA_SyncJogador'],
    values, writes, subscriptions, absorcoes, redesenhos, document, events,
    delayWrites() { delayed = true; },
    conta(uid, role = papel) { state = estado(uid, role); listener(state); },
    receive(caminho, value) {
      const s = subscriptions.findLast(s => s.active && s.caminho === caminho);
      assert(s, 'assinatura esperada: ' + caminho); s.ok({ val: () => value });
    },
    passar(ms) { for (const [id, task] of [...timers]) if (task.ms === ms) { timers.delete(id); task.fn(); } },
    set(k, v) { localStorage.setItem(k, v); },
    fire(name) { [...(events.get(name) || [])].forEach(fn => fn()); },
  };
}

test('mestre guarda o inventário recebido apenas na gaveta da campanha', () => {
  const h = ambiente('mestre', { initial: { 'grifosAlados.basesJogadoresInventario': '{"hub":true}' } });
  const inbox = { base: { jogadores: 'poção' } };
  h.receive('mesas/alpha/jogadores/inventario', inbox);
  assert.deepEqual(JSON.parse(h.values.get('grifosAlados.basesJogadoresInventario@alpha')), inbox);
  assert.equal(h.values.get('grifosAlados.basesJogadoresInventario'), '{"hub":true}');
});

test('visitante na página do mestre não absorve nem apaga edições de jogadores', () => {
  const h = ambiente('mestre', { papel: 'jogador' });
  h.receive('mesas/alpha/jogadores/inventario', { base: { residentes: 'Ana' } });
  h.api.limparInbox('base', 'residentes');
  assert.equal(h.absorcoes.length, 0);
  assert.equal(h.writes.length, 0);
});

test('mestre que pula entre dois campos absorve o inventário quando termina de digitar', () => {
  const h = ambiente('mestre');
  h.document.activeElement = { tagName: 'INPUT' };
  h.receive('mesas/alpha/jogadores/inventario', { base: { residentes: 'Ana' } });
  h.fire('focusout');
  h.document.activeElement = { tagName: 'TEXTAREA' };
  h.passar(0);
  assert.equal(h.absorcoes.length, 0);
  h.fire('focusout'); h.document.activeElement = null; h.passar(0);
  assert.equal(h.absorcoes.length, 1);
  assert.equal(h.absorcoes[0].m.base.residentes, 'Ana');
});

test('jogadores deixam de mostrar os dados apagados da campanha', () => {
  const h = ambiente('jogador');
  h.receive('mesas/alpha/dados', { bases: '{"bases":[{"id":"b1"}]}', viagens: '{"viagens":[{"id":"v1"}]}' });
  h.receive('mesas/alpha/dados', null);
  assert.deepEqual(JSON.parse(h.values.get('grifosAlados.bases@alpha')), { bases: [] });
  assert.equal(h.values.get('grifosAlados.lojaLog@alpha'), '[]');
  assert(h.redesenhos.includes('bases'));
});

// 25/11/2026: a Viagem virou 100% do mestre — o sync do jogador nem a grava.
test('as viagens não descem mais para os jogadores', () => {
  const h = ambiente('jogador');
  h.receive('mesas/alpha/dados', { viagens: '{"viagens":[{"id":"v1"}]}' });
  assert.equal(h.values.get('grifosAlados.viagens@alpha'), undefined);
});

test('trocar de conta cancela a edição de inventário ainda não enviada', () => {
  const h = ambiente('jogador');
  h.api.escreverInbox('base', 'jogadores', 'da conta A');
  h.conta('conta-b'); h.passar(900);
  assert.equal(h.writes.length, 0);
  h.api.escreverInbox('base', 'jogadores', 'da conta B'); h.passar(900);
  assert.equal(h.writes.length, 1);
  assert.equal(h.writes[0].uid, 'conta-b');
});

test('espectador não envia edição pendente nem agenda uma nova', () => {
  const h = ambiente('jogador');
  h.api.escreverInbox('base', 'jogadores', 'pendente');
  h.conta('conta-a', 'espectador');
  h.api.escreverInbox('base', 'jogadores', 'sem permissão'); h.passar(900);
  assert.equal(h.writes.length, 0);
});

test('segunda edição do mestre aguarda confirmação do envio em voo e depois é transmitida', async () => {
  const h = ambiente('mestre');
  h.receive('mesas/alpha/dados', {});
  h.delayWrites();
  h.set('grifosAlados.bases@alpha', '{"bases":[{"id":"b","nome":"Primeiro"}]}'); h.passar(2500);
  const first = h.writes[0];
  assert(first);
  h.receive('mesas/alpha/dados', first.value); // eco otimista do SDK
  h.set('grifosAlados.bases@alpha', '{"bases":[{"id":"b","nome":"Segundo"}]}'); h.passar(2500);
  assert.equal(h.writes.length, 1);
  first.resolve(); await flush();
  const dados = h.writes.filter(w => w.caminho === 'mesas/alpha/dados');
  assert.equal(dados.length, 2);
  assert.match(dados[1].value.bases, /Segundo/);
});

test('confirmação de envio antigo não faz nova escrita após sair da conta', async () => {
  const h = ambiente('mestre');
  h.receive('mesas/alpha/dados', {}); h.delayWrites();
  h.set('grifosAlados.bases@alpha', '{"bases":[{"id":"b"}]}'); h.passar(2500);
  const old = h.writes[0];
  h.conta(null, null); old.resolve(); await flush();
  assert.equal(h.writes.length, 1, 'não deve escrever o meta usando outra sessão');
});

test('falha do envio em voo libera a edição seguinte sem entrar em laço de tentativas', async () => {
  const h = ambiente('mestre');
  h.receive('mesas/alpha/dados', {}); h.delayWrites();
  h.set('grifosAlados.bases@alpha', '{"bases":[{"nome":"Primeiro"}]}'); h.passar(2500);
  h.set('grifosAlados.bases@alpha', '{"bases":[{"nome":"Segundo"}]}'); h.passar(2500);
  h.writes[0].reject(new Error('offline')); await flush();
  assert.equal(h.writes.length, 2);
  assert.match(h.writes[1].value.bases, /Segundo/);
  h.writes[1].reject(new Error('offline')); await flush();
  assert.equal(h.writes.length, 2);
});
