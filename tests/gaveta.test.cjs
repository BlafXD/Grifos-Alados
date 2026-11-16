const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const source = fs.readFileSync(path.join(__dirname, '../js/gaveta.js'), 'utf8');
const flush = () => new Promise(resolve => setImmediate(resolve));

function ambiente(initial = {}) {
  const values = new Map(Object.entries(initial)), subscriptions = [], writes = [], timers = new Map(), recebidos = [];
  const failures = new Set(); let uid = 'alice', mudar, timerId = 0, delayed = false;
  class Storage {
    getItem(k) { return values.get(k) ?? null; }
    setItem(k, v) { if (failures.has(k)) throw new Error('QuotaExceededError'); values.set(k, String(v)); }
  }
  const localStorage = new Storage();
  const b = { ref(caminho) { return {
    on(event, ok, fail) { subscriptions.push({ caminho, ok, fail, active: true }); return ok; },
    off(event, cb) { subscriptions.filter(s => s.caminho === caminho && s.ok === cb).forEach(s => { s.active = false; }); },
    set(value) {
      const w = { caminho, value: structuredClone(value) }; writes.push(w);
      return delayed ? new Promise((resolve, reject) => { w.resolve = resolve; w.reject = reject; }) : Promise.resolve();
    },
  }; } };
  const window = {
    localStorage, GA_FIREBASE: { apiKey: 'local-mock' },
    GA_guardar(k, v) { try { localStorage.setItem(k, v); return true; } catch { return false; } },
    GA_Mesa: { db: () => b, estado: () => ({ usuario: uid ? { uid } : null }), aoMudar(fn) { mudar = fn; fn(); } },
  };
  const context = vm.createContext({ window, Storage, localStorage, document: { body: null },
    firebase: { database: { ServerValue: { TIMESTAMP: 123 } } }, navigator: { userAgent: 'local-test' },
    console: { warn() {} }, setTimeout(fn) { const id = ++timerId; timers.set(id, fn); return id; },
    clearTimeout(id) { timers.delete(id); },
  });
  vm.runInContext(source, context);
  window.GA_Gaveta.registrar({ nome: 'mapa', chave: 'mapa', aoReceber: x => recebidos.push(x) });
  return {
    api: window.GA_Gaveta, values, writes, subscriptions, failures, recebidos,
    conta(novo) { uid = novo; mudar(); },
    delayWrites() { delayed = true; },
    set(texto) { localStorage.setItem('mapa', texto); },
    tick() { const tasks = [...timers.values()]; timers.clear(); tasks.forEach(fn => fn()); },
    receive(texto) {
      const s = subscriptions.findLast(s => s.active && s.caminho === 'usuarios/' + uid + '/gaveta/mapa');
      assert(s); s.ok({ val: () => texto === null ? null : { conteudo: texto, em: 123, porQuem: 'outro aparelho' } });
    },
    fail() { subscriptions.findLast(s => s.active).fail(new Error('PERMISSION_DENIED')); },
  };
}

test('trocar de conta pede escolha antes de substituir o acervo da conta anterior', () => {
  const h = ambiente({ mapa: 'mapa de Alice' });
  h.receive('mapa de Alice');
  h.conta('bob'); h.receive('mapa de Bob');
  assert.equal(h.values.get('mapa'), 'mapa de Alice');
  assert(h.api.estado().retidas.mapa);
  assert.equal(h.writes.length, 0);
});

test('conta vazia não recebe automaticamente o acervo de outra conta', () => {
  const h = ambiente({ mapa: 'mapa de Alice' }); h.receive('mapa de Alice');
  h.conta('bob'); h.receive(null);
  assert.equal(h.writes.length, 0);
  assert.equal(h.api.estado().retidas.mapa.contaVazia, true);
  h.api.decidir('mapa', 'daqui');
  assert.equal(h.writes[0].caminho, 'usuarios/bob/gaveta/mapa');
});

test('snapshot atrasado da conta anterior não apaga o acervo da atual', () => {
  const h = ambiente(); const old = h.subscriptions[0];
  h.conta('bob'); h.receive('Bob');
  old.ok({ val: () => ({ conteudo: 'Alice' }) });
  assert.equal(h.values.get('mapa'), 'Bob');
});

test('recusa de leitura não é confundida com gaveta vazia no salvamento seguinte', () => {
  const h = ambiente({ mapa: 'local' }); h.fail();
  h.set('edição local'); h.tick();
  assert.equal(h.writes.length, 0);
  assert.match(h.api.estado().erro, /PERMISSION_DENIED/);
});

test('armazenamento cheio não confirma a versão que não foi gravada no aparelho', () => {
  const h = ambiente(); h.failures.add('mapa'); h.receive('remoto');
  assert.equal(h.recebidos.length, 0);
  assert.equal(h.values.has('grifosAlados.gavetaSinc'), false);
  assert.match(h.api.estado().erro, /Libere espaço/);
});

test('não substitui uma versão se não foi possível salvar a cópia de segurança', () => {
  const h = ambiente({ mapa: 'original' }); h.receive('outra versão');
  h.failures.add('grifosAlados.gavetaGuardadas'); h.api.decidir('mapa', 'dela');
  assert.equal(h.values.get('mapa'), 'original');
  assert(h.api.estado().retidas.mapa);
  assert.match(h.api.estado().erro, /cópia de segurança/);
});

test('voltar à cópia anterior também preserva a atual quando não há espaço para backup', () => {
  const h = ambiente({ mapa: 'original' }); h.receive('outra versão');
  h.api.decidir('mapa', 'dela');
  assert.equal(h.values.get('mapa'), 'outra versão');
  h.failures.add('grifosAlados.gavetaGuardadas');
  h.api.desfazer('mapa');
  assert.equal(h.values.get('mapa'), 'outra versão');
  assert.equal(JSON.parse(h.values.get('grifosAlados.gavetaGuardadas')).mapa.conteudo, 'original');
  assert.equal(h.writes.length, 0);
});

test('falha ao aplicar versão da conta mantém a escolha disponível para tentar novamente', () => {
  const h = ambiente({ mapa: 'original' }); h.receive('outra versão');
  h.failures.add('mapa'); h.api.decidir('mapa', 'dela');
  assert.equal(h.values.get('mapa'), 'original');
  assert(h.api.estado().retidas.mapa);
  h.failures.delete('mapa'); h.api.decidir('mapa', 'dela');
  assert.equal(h.values.get('mapa'), 'outra versão');
  assert.equal(h.api.estado().retidas.mapa, undefined);
});

test('voltar alterna as duas cópias e só transmite após preservar a versão substituída', () => {
  const h = ambiente({ mapa: 'original' }); h.receive('outra versão');
  h.api.decidir('mapa', 'dela');
  h.api.desfazer('mapa');
  assert.equal(h.values.get('mapa'), 'original');
  assert.equal(JSON.parse(h.values.get('grifosAlados.gavetaGuardadas')).mapa.conteudo, 'outra versão');
  assert.equal(h.writes[0].value.conteudo, 'original');
});

test('confirmação de escrita antiga não marca a nova conta como sincronizada', async () => {
  const h = ambiente({ mapa: 'Alice' }); h.delayWrites(); h.receive(null);
  h.conta('bob'); h.writes[0].resolve(); await flush();
  assert.equal(h.values.has('grifosAlados.gavetaSinc'), false);
});

test('edição durante o envio aguarda a confirmação e depois envia a última versão', async () => {
  const h = ambiente({ mapa: 'primeiro' }); h.delayWrites(); h.receive(null);
  h.receive('primeiro'); h.set('segundo'); h.tick();
  assert.equal(h.writes.length, 1);
  h.writes[0].resolve(); await flush();
  assert.equal(h.writes.length, 2);
  assert.equal(h.writes[1].value.conteudo, 'segundo');
});

test('eco otimista seguido de recusa não substitui a edição local pelo rollback', async () => {
  const h = ambiente({ mapa: 'anterior' }); h.receive('anterior'); h.delayWrites();
  h.set('edição'); h.tick(); h.receive('edição'); h.receive('anterior');
  h.writes[0].reject(new Error('PERMISSION_DENIED')); await flush();
  assert.equal(h.values.get('mapa'), 'edição');
  assert.match(h.api.estado().erro, /PERMISSION_DENIED/);
});
