const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'js/ficha-mesa.js'), 'utf8');
// As regras do banco moram em Inútil/ (fora do git, desde 22/11/2026). Procura
// nos dois lugares; sem o arquivo, os testes de regra são PULADOS com o motivo
// à vista — antes a falta derrubava o arquivo de testes inteiro.
function lerRegras() {
  for (const p of ['firebase-rules.json', 'Inútil/firebase-rules.json']) {
    try { return JSON.parse(fs.readFileSync(path.join(root, p), 'utf8')).rules; } catch (e) {}
  }
  return null;
}
const rules = lerRegras();
const SEM_REGRAS = rules ? false : 'firebase-rules.json não encontrado (nem na raiz nem em Inútil/)';
const ficha = { id: 'mael', nome: 'Mael', mesa: 'nuevosol', pv: { atual: 25 } };
const contaPath = 'usuarios/jogador/fichas/mael';
const mesaPath = 'mesas/nuevosol/fichas/jogador/mael';
const denied = () => Object.assign(new Error('PERMISSION_DENIED: Permission denied'), { code: 'PERMISSION_DENIED' });

function estado(uid = 'jogador', papel = 'jogador') {
  return { configurado: true, usuario: uid ? { uid, displayName: uid } : null,
    mesaId: 'nuevosol', papel, souMembro: !!uid && !!papel, escreve: !!uid && !!papel && papel !== 'espectador' };
}

function ambiente(initial = estado()) {
  let state = initial, listener, nextTimer = 0;
  const timers = new Map(), subscriptions = [], writes = [], failures = new Set(), warnings = [];
  const counters = { conferir: 0, redesenhar: 0 };
  const db = { ref(caminho) { return {
    on(event, ok, fail) { subscriptions.push({ caminho, ok, fail, active: true }); return ok; },
    off(event, ok) { for (const s of subscriptions) if (s.caminho === caminho && s.ok === ok) s.active = false; },
    set(value) { return write(caminho, 'set', value); },
    update(value) { return write(caminho, 'update', value); },
    remove() { return write(caminho, 'remove', null); },
  }; } };
  function write(caminho, method, value) {
    writes.push({ caminho, method, value, uid: state.usuario?.uid });
    return failures.has(caminho) ? Promise.reject(denied()) : Promise.resolve();
  }
  const window = {
    GA_Mesa: { db: () => db, aoMudar(fn) { listener = fn; fn(state); } },
    GA_Ficha: {
      receberDaMesa() {}, receberDaGaveta() {}, esperarConferencia() {},
      conferir() { counters.conferir++; }, mesaMudou() { counters.redesenhar++; },
    },
  };
  vm.runInNewContext(source, {
    window, document: { readyState: 'complete', addEventListener() {} },
    firebase: { database: { ServerValue: { TIMESTAMP: { '.sv': 'timestamp' } } } },
    console: { warn(...args) { warnings.push(args); } },
    setTimeout(fn) { const id = ++nextTimer; timers.set(id, fn); return id; },
    clearTimeout(id) { timers.delete(id); },
  }, { filename: 'ficha-mesa.js' });
  return {
    api: window.GA_FichaMesa, writes, failures, subscriptions, counters, warnings,
    change(next) { state = next; listener(next); },
    receive(caminho, value = {}) {
      const sub = subscriptions.findLast(s => s.active && s.caminho === caminho);
      assert(sub, 'assinatura esperada: ' + caminho); sub.ok({ val: () => value });
    },
    reject(caminho) {
      const sub = subscriptions.findLast(s => s.active && s.caminho === caminho);
      assert(sub, 'assinatura esperada: ' + caminho); sub.fail(denied());
    },
    async flush() {
      const callbacks = [...timers.values()]; timers.clear(); callbacks.forEach(fn => fn());
      await new Promise(resolve => setImmediate(resolve));
    },
  };
}

// Avalia as expressões reais de acesso usadas nestes caminhos. É um teste
// local de contratos, não substitui o emulador ou as regras implantadas.
function snapshot(value) {
  return {
    val: () => value ?? null,
    exists: () => value !== undefined && value !== null,
    child(key) { return snapshot(String(key).split('/').reduce((v, k) => v?.[k], value)); },
  };
}
function allowed(caminho, operation, uid, database) {
  let rule = rules, parts = [], captures = {};
  const auth = uid ? { uid, token: { email_verified: true } } : null;
  const all = caminho.split('/');
  for (let level = 0; rule && level <= all.length; level++) {
    const expression = rule['.' + operation];
    if (expression === true) return true;
    if (typeof expression === 'string' && vm.runInNewContext(expression, {
      auth, root: snapshot(database), data: snapshot(database).child(parts.join('/')),
      newData: snapshot({}), ...captures,
    })) return true;
    const key = all[level];
    const match = Object.hasOwn(rule, key) ? key : Object.keys(rule).find(k => k.startsWith('$'));
    if (!match) break;
    if (match.startsWith('$')) captures[match] = key;
    parts.push(key); rule = rule[match];
  }
  return false;
}

test('os endereços do mestre e do jogador escolhem a mesma campanha', () => {
  const code = fs.readFileSync(path.join(root, 'js/mesa-endereco.js'), 'utf8');
  for (const address of ['index.html?mesa=nuevosol', 'jogadores.html?sala=nuevosol']) {
    const url = new URL(address, 'https://grifos.test/');
    const window = {};
    vm.runInNewContext(code, {
      window, URL, URLSearchParams, location: { href: url.href, search: url.search },
      localStorage: { getItem: () => null, setItem() {} },
      document: {
        documentElement: { classList: { contains: () => url.pathname.endsWith('jogadores.html') } },
        getElementById: () => null,
      },
    });
    assert.equal(window.GA_Sala.id, 'nuevosol');
  }
});

test('regras: jogador acessa sua ficha; mestre edita pela mesa sem acessar a conta alheia', { skip: SEM_REGRAS }, () => {
  const database = { mesas: { nuevosol: { dono: 'mestre', membros: {
    mestre: { papel: 'mestre' }, jogador: { papel: 'jogador' }, outro: { papel: 'jogador' },
  } } } };
  assert(allowed(mesaPath, 'read', 'jogador', database));
  assert(allowed(mesaPath, 'write', 'jogador', database));
  assert(allowed(mesaPath, 'write', 'mestre', database));
  assert(allowed(contaPath, 'write', 'jogador', database));
  assert(!allowed(contaPath, 'write', 'mestre', database));
  assert(!allowed(mesaPath, 'write', 'outro', database));
  assert(!allowed('mesas/nuevosol/fichas', 'read', 'jogador', database));
});

test('mestre publica a edição do jogador somente na mesa', async () => {
  const h = ambiente(estado('mestre', 'mestre'));
  h.api.publicar(ficha, 'jogador', new Set(['pv'])); await h.flush();
  assert.deepEqual(h.writes.map(w => w.caminho), [mesaPath]);
  assert.equal(h.writes[0].method, 'update');
  assert.equal(h.writes[0].value.pv.atual, 25);
});

test('erro informa qual ficha e qual campanha recusaram a escrita', async () => {
  const h = ambiente(); h.failures.add(mesaPath);
  h.api.publicar(ficha, null, new Set(['pv'])); await h.flush();
  assert.match(h.api.estado().erro, /Mael/);
  assert.match(h.api.estado().erro, /nuevosol/);
  assert(h.counters.redesenhar > 1, 'o aviso precisa aparecer sem esperar outro evento da mesa');
});

test('sucesso na conta não apaga falha da mesa; sucesso no mesmo destino resolve o aviso', async () => {
  const h = ambiente(); h.failures.add(mesaPath);
  h.api.publicar(ficha, null, new Set(['pv'])); await h.flush();
  assert.match(h.api.estado().erro, /PERMISSION_DENIED/);
  h.failures.delete(mesaPath);
  h.api.publicar(ficha, null, new Set(['pv'])); await h.flush();
  assert.equal(h.api.estado().erro, '');
});

test('leitura negada não é tratada como banco vazio para liberar a conferência', () => {
  const h = ambiente();
  h.receive('usuarios/jogador/fichas');
  h.reject('mesas/nuevosol/fichas/jogador');
  assert.equal(h.counters.conferir, 0);
});

test('trocar de conta descarta envios ainda pendentes da conta anterior', async () => {
  const h = ambiente();
  h.api.publicar(ficha, null, new Set(['pv']));
  h.change(estado('outra-conta', 'mestre')); await h.flush();
  assert.equal(h.writes.length, 0);
});

test('erro de assinatura antiga não aparece depois da troca de conta', () => {
  const h = ambiente();
  const old = h.subscriptions.find(s => s.caminho === 'mesas/nuevosol/fichas/jogador');
  h.change(estado('outra-conta', 'jogador')); old.fail(denied());
  assert.equal(h.api.estado().erro, '');
});

test('uma falha da conta também bloqueia a conferência inicial', () => {
  const h = ambiente();
  h.receive('mesas/nuevosol/fichas/jogador');
  h.reject('usuarios/jogador/fichas');
  assert.equal(h.counters.conferir, 0);
});

test('leituras bem-sucedidas liberam a conferência uma vez', () => {
  const h = ambiente();
  h.receive('usuarios/jogador/fichas');
  assert.equal(h.counters.conferir, 0);
  h.receive('mesas/nuevosol/fichas/jogador');
  assert.equal(h.counters.conferir, 1);
  h.receive('mesas/nuevosol/fichas/jogador');
  assert.equal(h.counters.conferir, 1);
});

test('nova sessão retoma a conferência depois de uma leitura recusada', () => {
  const h = ambiente();
  h.receive('usuarios/jogador/fichas'); h.reject('mesas/nuevosol/fichas/jogador');
  h.change(estado(null, null)); h.change(estado());
  h.receive('usuarios/jogador/fichas'); h.receive('mesas/nuevosol/fichas/jogador');
  assert.equal(h.counters.conferir, 1);
  assert.equal(h.api.estado().erro, '');
});

test('trocar a mesa com a mesma conta refaz ambas as leituras', () => {
  const h = ambiente();
  h.receive('usuarios/jogador/fichas'); h.receive('mesas/nuevosol/fichas/jogador');
  h.change({ ...estado(), mesaId: 'outra' });
  h.receive('usuarios/jogador/fichas'); h.receive('mesas/outra/fichas/jogador');
  assert.equal(h.counters.conferir, 2);
});

test('falha da ficha de outra campanha não é atribuída ao Mael', async () => {
  const h = ambiente();
  h.failures.add('mesas/antiga/fichas/jogador/outra');
  h.api.publicar({ id: 'outra', nome: 'Personagem antigo', mesa: 'antiga' }, null, null);
  await h.flush();
  h.api.publicar(ficha, null, new Set(['pv'])); await h.flush();
  assert.match(h.api.estado().erro, /Personagem antigo/);
  assert.match(h.api.estado().erro, /antiga/);
  assert.doesNotMatch(h.api.estado().erro, /Mael|nuevosol/);
});

test('fichas de donos diferentes com o mesmo id não se sobrescrevem na fila', async () => {
  const h = ambiente(estado('mestre', 'mestre'));
  h.api.publicar({ ...ficha, nome: 'Primeiro' }, 'jogador-a', new Set(['nome']));
  h.api.publicar({ ...ficha, nome: 'Segundo' }, 'jogador-b', new Set(['nome']));
  await h.flush();
  assert.deepEqual(h.writes.map(w => [w.caminho, w.value.nome]), [
    ['mesas/nuevosol/fichas/jogador-a/mael', 'Primeiro'],
    ['mesas/nuevosol/fichas/jogador-b/mael', 'Segundo'],
  ]);
});

test('excluir uma ficha pessoal remove da campanha vinculada, sem tocar a mesa aberta', async () => {
  const h = ambiente();
  h.api.apagar('mael', null, 'outra'); await h.flush();
  assert.deepEqual(h.writes.map(w => w.caminho), ['mesas/outra/fichas/jogador/mael', contaPath]);
});

test('excluir ficha só da conta não tenta apagar homônima da mesa', async () => {
  const h = ambiente();
  h.api.apagar('mael', null, ''); await h.flush();
  assert.deepEqual(h.writes.map(w => w.caminho), [contaPath]);
});

test('exclusão no HUB também remove a cópia vinculada a uma campanha', async () => {
  const h = ambiente({ ...estado('jogador', null), mesaId: '' });
  h.api.apagar('mael', null, 'nuevosol'); await h.flush();
  assert.deepEqual(h.writes.map(w => w.caminho), [mesaPath, contaPath]);
});

test('tirar ficha alheia desta mesa não apaga a conta nem o envio de outro dono', async () => {
  const h = ambiente(estado('mestre', 'mestre'));
  h.api.publicar(ficha, 'jogador-a', new Set(['pv']));
  h.api.publicar(ficha, 'jogador-b', new Set(['pv']));
  h.api.apagar('mael', 'jogador-a'); await h.flush();
  assert.deepEqual(h.writes.map(w => [w.caminho, w.method]), [
    ['mesas/nuevosol/fichas/jogador-a/mael', 'remove'],
    ['mesas/nuevosol/fichas/jogador-b/mael', 'update'],
  ]);
});

test('falha ao apagar aparece no estado da ficha', async () => {
  const h = ambiente(); h.failures.add(mesaPath);
  h.api.apagar('mael', null, 'nuevosol'); await h.flush();
  assert.match(h.api.estado().erro, /apagar.*mael.*nuevosol/);
});
