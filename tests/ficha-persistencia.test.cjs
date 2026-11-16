const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function ambiente() {
  const storage = new Map(), timers = new Map(), writes = [], rolls = [], deletes = [];
  let next = 0;
  const window = { GA_esc: s => String(s ?? ''), addEventListener() {},
    GA_guardar: (k, v) => storage.set(k, v),
    GA_Dados: {},
    GA_Rolagens: { rolarEPublicar(expr) { rolls.push(expr); return { total: 1, detalhe: 'resultado' }; } },
    GA_FichaMesa: { publicar(f, dono, grupos) { writes.push({ ficha: JSON.parse(JSON.stringify(f)), dono, grupos }); },
      apagar(...args) { deletes.push(args); }, estado: () => ({}) },
  };
  const context = vm.createContext({ window, console, confirm: () => true,
    document: { readyState: 'loading', addEventListener() {}, getElementById: () => null },
    localStorage: { getItem: k => storage.get(k) ?? null, setItem: (k, v) => storage.set(k, v) },
    setTimeout(fn) { const id = ++next; timers.set(id, fn); return id; }, clearTimeout: id => timers.delete(id),
  });
  for (const file of ['ficha-data.js', 'ficha.js']) {
    let source = fs.readFileSync(path.join(__dirname, '../js', file), 'utf8');
    // Exercita os handlers reais, sem acrescentar uma API de teste ao site.
    if (file === 'ficha.js') source = source.replace('window.GA_Ficha = {',
      'window.__fichaTeste = { aoClicar, aoEntrada, gastarPontos }; window.GA_Ficha = {');
    vm.runInContext(source, context, { filename: file });
  }
  return { api: window.GA_Ficha, writes, rolls, deletes, internals: window.__fichaTeste,
    click(acao, extra = {}) { window.__fichaTeste.aoClicar({ target: { closest: () => ({ dataset: { acao, ...extra } }) } }); },
    flush() { const fns = [...timers.values()]; timers.clear(); for (const fn of fns) fn(); },
  };
}

test('trocar de ficha antes dos 250 ms preserva o envio da ficha anterior', () => {
  const h = ambiente();
  h.api.criarEabrir({ id: 'a', nome: 'Aria', classes: [{ classe: 'guerreiro', nivel: 1 }] });
  h.api.criarEabrir({ id: 'b', nome: 'Borin', classes: [{ classe: 'barbaro', nivel: 1 }] });
  h.flush();
  assert.deepEqual(h.writes.map(x => x.ficha.id), ['a', 'b']);
  assert.deepEqual(h.api.minhasFichas().map(x => x.nome).join(','), 'Aria,Borin');
});

test('efeitos com ∑ de tudo e ataque/dano entram no dano e crítico uma vez', () => {
  const h = ambiente();
  h.api.criarEabrir({ id: 'a', nome: 'Aria',
    ataques: [{ nome: 'Espada', dano: '1d8+3', critico: 'x3', pericia: 'luta',
      danoExtra: [{ ativo: true, dado: '1d6', critico: false, fonte: 'Fogo' }] }],
    efeitosEmJogo: [
      { fonte: 'Oração', alcance: 'tudo', ativo: true, somar: true, valor: 2 },
      { fonte: 'Perdição', alcance: 'ataquedano', ativo: true, somar: true, valor: -1 },
      { fonte: 'Heroísmo', alcance: 'pericias', ativo: true, somar: true, valor: 6 },
      { fonte: 'Lembrete', alcance: 'tudo', ativo: true, somar: false, valor: 50 },
      { fonte: 'Desligado', alcance: 'tudo', ativo: false, somar: true, valor: 50 },
    ],
  });
  h.click('rolar-dano', { i: '0' });
  h.click('rolar-critico', { i: '0' });
  assert.deepEqual(h.rolls, ['1d8+3+1d6+1', '3d8+3+1d6+1']);
});

test('abrir outra ficha após salvar não reenvia a anterior inteira', () => {
  const h = ambiente();
  h.api.criarEabrir({ id: 'a', nome: 'Aria' }); h.flush();
  h.api.criarEabrir({ id: 'b', nome: 'Borin' }); h.flush();
  assert.deepEqual(h.writes.map(x => x.ficha.id), ['a', 'b']);
});
