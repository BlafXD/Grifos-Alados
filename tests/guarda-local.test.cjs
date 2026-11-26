// GA_GuardaLocal (js/guarda-local.js): o arquivo estragado NUNCA é
// sobrescrito sem deixar cópia, e o "desfazer" só confirma o que é
// definitivo (limpar o banco) quando o prazo acaba.
const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

function montar() {
  const guardado = {};
  const localStorage = {
    getItem: k => (k in guardado ? guardado[k] : null),
    setItem: (k, v) => { guardado[k] = String(v); },
    removeItem: k => { delete guardado[k]; },
  };
  const timers = [];
  const elementos = [];
  function el() {
    const e = { className: '', innerHTML: '', children: [], attrs: {}, ouvintes: {},
      setAttribute(k, v) { this.attrs[k] = v; },
      appendChild(c) { this.children.push(c); c.pai = this; elementos.push(c); },
      remove() { this.removido = true; },
      addEventListener(t, f) { this.ouvintes[t] = f; },
      querySelector() { return this.botao || (this.botao = { addEventListener: (t, f) => { this.clicar = f; } }); },
    };
    return e;
  }
  const document = { body: el(), createElement: el, addEventListener() {}, activeElement: null };
  const window = { addEventListener() {}, GA_esc: s => String(s), confirm: () => true };
  const ctx = { window, document, localStorage, console, setTimeout: (f, ms) => { timers.push(f); return timers.length; }, clearTimeout() {} };
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(__dirname, '..', 'js', 'guarda-local.js'), 'utf8'), ctx);
  return { G: window.GA_GuardaLocal, guardado, timers, elementos };
}

test('JSON estragado: devolve vazio, mas guarda a cópia crua antes', () => {
  const { G, guardado } = montar();
  guardado['grifosAlados.bases@x'] = '{"bases":[{"nome":"Torre"'; // cortado no meio
  const r = G.ler('grifosAlados.bases@x');
  assert.strictEqual(r.dados, null);
  assert.strictEqual(r.estragado, true);
  assert.strictEqual(guardado['grifosAlados.bases@x#estragado'], '{"bases":[{"nome":"Torre"');
  // uma segunda leitura não troca a cópia original
  guardado['grifosAlados.bases@x'] = '{lixo';
  G.ler('grifosAlados.bases@x');
  assert.strictEqual(guardado['grifosAlados.bases@x#estragado'], '{"bases":[{"nome":"Torre"');
  assert.match(G.avisoEstragado('grifosAlados.bases@x', 'Bases'), /estragado/);
});

test('JSON bom e ausente: lê normal, sem cópia nem aviso', () => {
  const { G, guardado } = montar();
  assert.deepStrictEqual(G.ler('k').dados, null);
  guardado.k = '{"viagens":[]}';
  assert.strictEqual(JSON.stringify(G.ler('k').dados), '{"viagens":[]}');
  assert.strictEqual(G.avisoEstragado('k', 'Viagens'), '');
});

test('desfazer: clicar desfaz e NÃO roda o definitivo; o prazo roda o definitivo', () => {
  const { G, timers, elementos } = montar();
  let desfez = 0, definitivo = 0;
  G.desfazer('Base removida', () => desfez++, () => definitivo++);
  const toast = elementos.find(e => e.className === 'gl-toast');
  toast.clicar();
  timers.forEach(f => f());
  assert.deepStrictEqual([desfez, definitivo], [1, 0]);

  G.desfazer('Viagem removida', () => desfez++, () => definitivo++);
  timers.slice(1).forEach(f => f());
  assert.deepStrictEqual([desfez, definitivo], [1, 1]);
});
