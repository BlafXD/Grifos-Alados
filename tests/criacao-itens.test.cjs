const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function calculadora() {
  const elements = new Map();
  const element = selector => {
    if (!elements.has(selector)) elements.set(selector, {
      value: ({ '.ci-categoria': 'arma-simples', '.ci-fracao': '3' })[selector] || '0',
      innerHTML: '', options: Array.from({ length: 6 }, (_, i) => ({ value: String(i) })),
      listeners: {}, addEventListener(name, fn) { this.listeners[name] = fn; },
      querySelector: element, querySelectorAll: () => [],
    });
    return elements.get(selector);
  };
  const window = { GA_esc: s => String(s ?? ''), GA_nl2br: s => s,
    GA_semAcento: s => String(s).normalize('NFD').replace(/\p{M}/gu, '').toLowerCase(),
    GA_guardar() {},
  };
  const context = vm.createContext({ window, console,
    document: { readyState: 'loading', addEventListener() {} },
    localStorage: { getItem: () => null },
  });
  for (const file of ['loja_completa.js', 'criacao-itens-data.js', 'criacao-itens.js']) {
    let source = fs.readFileSync(path.join(__dirname, '../js', file), 'utf8');
    if (file === 'criacao-itens.js') source = source.replace(/\}\)\(\);\s*$/,
      'window.ligarCalculadora = cont => { TAB = carregarTabela(); wireCalculadora(cont); }; })();');
    vm.runInContext(source, context, { filename: file });
  }
  window.ligarCalculadora({ querySelector: element, querySelectorAll: () => [] });
  return {
    selecionar(nome) {
      const item = vm.runInContext(`LojaCompleta.statsDeItem(${JSON.stringify(nome)})`, context);
      assert(item, 'o item deve existir no catálogo');
      element('.ci-item-resultados').listeners.click({ target: { closest: () => ({ dataset: {
        nome, preco: String(item.preco || 0), kind: item.kind, categoria: item.categoria,
      } }) } });
    },
    definir(selector, value) { const el = element(selector); el.value = String(value); el.listeners.change(); },
    categoria: () => element('.ci-categoria').value,
    valores: () => [...element('.ci-resultado').innerHTML.matchAll(/class="ci-res-val">([^<]+)/g)].map(m => m[1]),
  };
}

test('munição usa metade do acréscimo, sem reduzir o preço base nem a CD das melhorias', () => {
  const h = calculadora();
  h.selecionar('Flechas (20)');
  h.definir('.ci-melhorias', 1);
  assert.equal(h.categoria(), 'municao');
  assert.deepEqual(h.valores(), ['T$ 151', '20', 'T$ 50']);
  h.definir('.ci-melhorias', 2);
  h.definir('.ci-encantos', 1);
  assert.deepEqual(h.valores(), ['T$ 10.501', '35', 'T$ 3.500']);
});

test('a seleção automática distingue armas simples das marciais', () => {
  const h = calculadora();
  for (const nome of ['Adaga', 'Bastão lúdico', 'Porrete', 'Zarabatana', 'Besta de mão']) {
    h.selecionar(nome);
    assert.equal(h.categoria(), 'arma-simples', nome);
    assert.equal(h.valores()[1], '15', nome);
  }
  h.selecionar('Espada longa');
  h.definir('.ci-melhorias', 1);
  assert.equal(h.categoria(), 'arma-marcial');
  assert.deepEqual(h.valores(), ['T$ 315', '25', 'T$ 105']);
});

test('mudar de munição para arma retira o desconto e mantém a melhoria escolhida', () => {
  const h = calculadora();
  h.selecionar('Balas (20)');
  h.definir('.ci-melhorias', 1);
  assert.deepEqual(h.valores(), ['T$ 170', '20', 'T$ 56']);
  h.selecionar('Adaga');
  assert.deepEqual(h.valores(), ['T$ 302', '20', 'T$ 100']);
});
