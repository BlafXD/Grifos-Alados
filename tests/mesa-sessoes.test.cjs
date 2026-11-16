const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');

function ambiente() {
  const subs = []; let authChanged;
  const db = { ref(caminho) { return {
    on(event, ok, fail) { subs.push({ caminho, ok, fail, active: true }); return ok; },
    off(event, cb) { subs.filter(s => s.caminho === caminho && s.ok === cb).forEach(s => { s.active = false; }); },
  }; } };
  const window = { GA_FIREBASE: { apiKey: 'local-mock' }, GA_esc: String, GA_Sala: { id: 'alpha' } };
  const auth = { onAuthStateChanged(fn) { authChanged = fn; } };
  vm.runInNewContext(fs.readFileSync(path.join(root, 'js/mesa.js'), 'utf8'), {
    window, document: { readyState: 'complete', getElementById: () => null },
    firebase: { apps: [{}], app: () => ({}), database: () => db, auth: () => auth }, console,
  });
  return {
    api: window.GA_Mesa, subs,
    conta(uid) { authChanged(uid ? { uid } : null); },
    receive(caminho, value) {
      const s = subs.findLast(s => s.active && s.caminho === caminho); assert(s);
      s.ok({ val: () => value }); return s;
    },
  };
}

test('papel atrasado da sessão anterior não transforma a conta atual em mestre', () => {
  const h = ambiente(); h.conta('alice');
  const old = h.subs.find(s => s.caminho === 'mesas/alpha/membros/alice');
  h.conta('bob'); h.receive('mesas/alpha/membros/bob', { papel: 'jogador' });
  old.ok({ val: () => ({ papel: 'mestre' }) });
  assert.equal(h.api.estado().papel, 'jogador');
  assert.equal(h.api.estado().transmite, false);
});

test('sair da mesa limpa lista de membros e pedidos que já não podem ser lidos', () => {
  const h = ambiente(); h.conta('alice');
  h.receive('mesas/alpha/membros/alice', { papel: 'mestre' });
  const lista = h.receive('mesas/alpha/membros', { alice: { papel: 'mestre' } });
  const pedidos = h.receive('mesas/alpha/pedidos', { bob: { nome: 'Bob', email: 'privado@exemplo.test' } });
  h.receive('mesas/alpha/membros/alice', null);
  lista.ok({ val: () => ({ alice: { papel: 'mestre' } }) });
  pedidos.ok({ val: () => ({ bob: { email: 'privado@exemplo.test' } }) });
  assert.deepEqual(Object.keys(h.api.estado().membros), []);
  assert.equal(h.api.estado().souMembro, false);
  assert(lista.active === false && pedidos.active === false);
});

test('nome de campanha no atalho entra como texto, inclusive no botão', () => {
  const criados = [], spans = {};
  function el(tag) {
    const e = { tag, children: [], style: {}, setAttribute() {}, addEventListener() {},
      appendChild(child) { this.children.push(child); }, remove() {},
      querySelector(sel) { return spans[sel] || (spans[sel] = {}); } };
    criados.push(e); return e;
  }
  const nome = '<img src=x onerror=alert(1)>';
  const local = {
    'grifosAlados.monstros': JSON.stringify({ cenaNarrada: 'c1', sessoes: [{ mesa: 'outra', cenas: [{ id: 'c1', nome: 'Cena' }] }] }),
  };
  const window = { GA_Sala: { id: 'alpha', link: id => '?mesa=' + id },
    GA_Mesa: { minhasMesas: () => ({ outra: nome }), aoMudar() {} } };
  vm.runInNewContext(fs.readFileSync(path.join(root, 'js/mesa-de-hoje.js'), 'utf8'), {
    window,
    localStorage: { getItem: key => local[key] || null, setItem: (k, v) => { local[k] = v; } },
    sessionStorage: { getItem: () => null },
    document: { readyState: 'complete', createElement: el, querySelector: () => null,
      getElementById: () => ({ parentNode: { insertBefore() {} } }) },
  });
  assert.equal(spans['.ga-hoje-btn'].textContent, 'Ir para «' + nome + '»');
  assert(criados.every(e => !(e.innerHTML || '').includes('<img')));
});
