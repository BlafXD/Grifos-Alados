const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

test('anotações preserva raízes e filhos válidos quando o salvamento contém entradas inválidas', () => {
  const source = fs.readFileSync(path.join(__dirname, '../js/anotacoes.js'), 'utf8')
    .replace(/\}\)\(\);\s*$/, 'window.auditAnotacoes = () => { carregar(); return dados; }; })();');
  const saved = { ramos: [null, 7, [], { titulo: 'Missão', texto: 'Descobrir o templo',
    filhos: [null, false, { titulo: 'Pista', texto: 'Mapa antigo' }],
  }] };
  const window = { GA_esc: String, GA_nl2br: String, GA_limparHtml: String, addEventListener() {} };
  vm.runInNewContext(source, { window, console,
    document: { readyState: 'loading', addEventListener() {} },
    localStorage: { getItem: () => JSON.stringify(saved) },
    setTimeout, clearTimeout,
  }, { filename: 'anotacoes.js' });
  const result = window.auditAnotacoes();
  assert.equal(result.ramos.length, 1);
  assert.equal(result.ramos[0].titulo, 'Missão');
  assert.equal(result.ramos[0].filhos.length, 1);
  assert.equal(result.ramos[0].filhos[0].texto, 'Mapa antigo');
  assert(result.ramos[0].id);
  assert(result.ramos[0].filhos[0].id);
});
