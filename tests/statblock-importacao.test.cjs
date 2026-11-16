const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function parser(comBibliotecas = false) {
  const window = { GA_esc: s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'),
    addEventListener() {} };
  const context = vm.createContext({
    window, console, setTimeout, clearTimeout,
    document: { readyState: 'loading', addEventListener() {}, getElementById: () => null },
    localStorage: { getItem: () => null },
  });
  for (const file of ['monstros.js', ...(comBibliotecas ? ['fichas-t20-data.js', 'fichas-ameacas-arton-data.js', 'deuses-arton-data.js', 'deuses-servos-data.js', 'npcs-data.js', 'npcs-lendas-data.js'] : [])]) {
    vm.runInContext(fs.readFileSync(path.join(__dirname, '../js', file), 'utf8'), context, { filename: file });
  }
  window.GA_Monstros.lerFicha.catalogo = [window.FICHAS_T20, window.FICHAS_AMEACAS_ARTON, window.FICHAS_DEUSES_ARTON, window.GUIA_NPCS]
    .filter(Boolean).flatMap(l => l.categorias.flatMap(c => c.fichas || []));
  return window.GA_Monstros.lerFicha;
}

const exemplo = `Criatura de teste ND 1
Humanoide Médio
Iniciativa −2, Percepção −3, visão no escuro
Defesa 15, Fort −1, Ref −2, Von −3, imunidade a veneno
Pontos de Vida 20
Deslocamento 9m (6q)
Corpo a Corpo Espada +5 (1d8+2).
For 2, Des −2, Con 1, Int 0, Sab −3, Car 0
Tesouro Nenhum.`;

test('importação preserva bônus negativos com o sinal de menos do PDF', () => {
  const { cr, avisos } = parser()(exemplo);
  assert.deepEqual(Array.from(avisos), []);
  for (const [campo, esperado] of [['iniciativa', '-2'], ['percepcao', '-3'], ['fortitude', '-1'], ['reflexos', '-2'], ['vontade', '-3']]) {
    assert.equal(cr.stats[campo].padrao, esperado, campo);
    assert.equal(cr.stats[campo].atual, esperado, campo + ' atual');
  }
  assert.match(cr.tags, /visão no escuro/);
  assert.match(cr.condicoes, /imunidade a veneno/);
});

test('números de combate das bibliotecas sobrevivem à importação', () => {
  const ler = parser(true);
  assert(ler.catalogo.length >= 680, `${ler.catalogo.length} fichas carregadas`);
  const problemas = [];
  const campos = [['iniciativa', 'Iniciativa'], ['percepcao', 'Percepção'], ['defesa', 'Defesa'],
    ['fortitude', 'Fort'], ['reflexos', 'Ref'], ['vontade', 'Von'], ['pv', 'Pontos de Vida'], ['pm', 'Pontos de Mana']];
  for (const ficha of ler.catalogo) {
    const { cr } = ler(ficha.texto);
    for (const [campo, rotulo] of campos) {
      const esperado = ficha.texto.match(new RegExp('\\b' + rotulo + '\\s+([+\\-–−]?\\s*(?:\\d*d\\d+(?:\\s*[+\\-–−]\\s*\\d+)?|[\\d.]+))'));
      if (!esperado) continue;
      const valor = esperado[1].replace(/\s|\./g, '').replace(/^\+/, '').replace(/[–−]/g, '-');
      if (cr.stats[campo].padrao !== valor) problemas.push(`${ficha.nome}: ${campo} ${cr.stats[campo].padrao} ≠ ${valor}`);
    }
  }
  assert.deepEqual(problemas, []);
});

test('importação aceita espaços depois do sinal e mantém o restante do bloco', () => {
  const ler = parser();
  for (const sinal of ['-', '–', '−']) {
    const { cr } = ler(exemplo.replaceAll('−', sinal + ' '));
    assert.equal(cr.stats.iniciativa.padrao, '-2');
    assert.equal(cr.stats.vontade.padrao, '-3');
    assert.equal(cr.nome, 'Criatura de teste');
  }
});
