const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const read = name => fs.readFileSync(path.join(root, 'js', name), 'utf8');
const plain = value => JSON.parse(JSON.stringify(value));
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[c]));

function ambiente({ random = () => 0, saved = {}, document = {} } = {}) {
  const storage = new Map(Object.entries(saved));
  const events = {};
  const window = {
    GA_esc: esc, GA_nl2br: esc,
    GA_semAcento: value => String(value ?? '').normalize('NFD').replace(/\p{M}/gu, '').toLowerCase(),
    GA_guardar(key, value) { storage.set(key, value); return true; },
    GA_Sala: { chave: key => key },
    addEventListener() {},
  };
  const context = vm.createContext({
    window, GA_Sala: window.GA_Sala,
    document: { readyState: 'loading', getElementById: () => null,
      querySelectorAll: () => [], addEventListener(name, fn) { events[name] = fn; }, ...document },
    localStorage: { getItem: key => storage.get(key) ?? null, setItem: (key, value) => storage.set(key, value) },
    Math: Object.assign(Object.create(Math), { random }), console,
    setTimeout, clearTimeout, confirm: () => true,
  });
  return { context, window, storage, events,
    load(name, expose = '') {
      let source = read(name);
      if (expose) source = source.replace(/\}\)\(\);\s*$/, `${expose}\n})();`);
      vm.runInContext(source, context, { filename: name, timeout: 2000 });
    },
    run(code) { return vm.runInContext(code, context, { timeout: 2000 }); },
  };
}

function recompensas(options) {
  const env = ambiente(options);
  env.load('loja_completa.js');
  env.load('criacao-itens-data.js');
  env.load('recompensas.js');
  return env;
}

test('encontros fracionários seguem os exemplos oficiais do T20 p. 282', () => {
  const env = recompensas();
  for (const [grupo, nd, xp] of [
    [['1/4'], '1/4', 250], [['1/2'], '1/2', 500],
    [['1/4', '1/4'], '1/2', 500], [['1/2', '1/2'], '1', 1000],
    [Array(4).fill('1/4'), '1', 1000], [Array(8).fill('1/4'), '2', 2000],
    [['8', '8'], '10', 10000], [Array(4).fill('5'), '9', 9000],
  ]) {
    env.run(`encGrupo = ${JSON.stringify(grupo)}`);
    const result = env.run('calcEncontro()');
    assert.equal(result.ndStr, nd, grupo.join(' + '));
    assert.equal(result.xp, xp);
  }
});

test('0% nunca seleciona itens ou encantos, mesmo quando o sorteio retorna zero', () => {
  const env = recompensas();
  env.run(`LojaCompleta.definirConfig({
    itens: Object.fromEntries(['weapon','armor','misc'].map(k => [k, { modo:'porcentagem', prob:0 }])),
    encantos: Object.fromEntries(['arma','armadura','escudo','esoterico','acessorio'].map(k => [k, { modo:'ambos', qtd:3, prob:0 }]))
  })`);
  assert.equal(env.run('LojaCompleta.gerarLojaNormal().total_itens'), 0);
  assert(env.run('Object.values(LojaCompleta.gerarLojaEspecial().categorias).every(c => c.total === 0)'));
});

test('encontros mistos ou arredondados são identificados como estimativas', () => {
  const env = recompensas();
  for (const [grupo, estimado] of [
    [['8', '8'], false], [['1/4', '1/4'], false],
    [['8', '3'], true], [['1/4', '1/4', '1/4'], true],
    [['20', '20'], true],
  ]) {
    env.run(`encGrupo = ${JSON.stringify(grupo)}`);
    assert.equal(env.run('calcEncontro().aproximado'), estimado, grupo.join(' + '));
  }
});

test('melhorias não ignoram pré-requisitos, duplicatas ou tipo após sorteios desfavoráveis', () => {
  for (const random of [() => 0, () => 0.41, () => 0.999999]) {
    const env = recompensas({ random });
    for (const [tipo, nome] of [['Arma', 'Adaga'], ['Arma', 'Flechas (20)'], ['Armadura', 'Escudo leve'], ['Armadura', 'Armadura completa'], ['Esotérico', 'Cajado arcano']]) {
      const result = env.run(`(() => {
        const result = rolarMelhorias(${JSON.stringify(tipo)}, 4, ${JSON.stringify(nome)});
        const used = new Set();
        for (const { item } of result) {
          if (used.has(item.item) || melhoriaPrereqFalta(item.item, used) || melhoriaExclui(item.item, used) || !melhoriaCabe(item, ${JSON.stringify(nome)})) return false;
          used.add(item.item);
        }
        return result.length === 4;
      })()`);
      assert.equal(result, true, tipo + ': ' + nome);
    }
  }
});

test('encantos não repetem nem travam quando específicos estão excluídos', () => {
  for (const random of [() => 0, () => 0.999999]) {
    const env = recompensas({ random });
    const result = env.run('sorteiaMagicoPadrao("Arma", 3, false)');
    assert.equal(result.encantos.length, 3);
    assert.equal(new Set(result.encantos.map(x => x.item.item)).size, 3);
    const menor = env.run('sorteiaMagicoPadrao("Arma", 1, false)');
    assert.equal(!!menor.encantos[0].item.doisEncantos, false);
  }
});

test('categoria desmarcada nunca reaparece depois de 40 tentativas', () => {
  const env = recompensas({ random: () => 0.999999 });
  env.run('MODO_RECOMP = "customizavel"; CUSTOM_FILTROS.catDiverso = false;');
  const result = env.run('_rolarColuna({ m:[{ max:100, r:null }], i:[{ max:1, r:null }, { max:100, r:{t:"diverso"} }] })');
  assert.equal(result.resI.tipo, 'nada');
  assert.equal(result.dpI, 1);
});

test('filtro de acessórios desativado termina mesmo com o maior valor aleatório', () => {
  const env = recompensas({ random: () => 0.999999 });
  env.run('CUSTOM_FILTROS.acessorios = false;');
  const result = env.run('TABELAS.magico("menor", "customizavel")');
  assert.notEqual(result.tipo, 'Acessório');
});

test('calendário rejeita mês vazio em vez de transformar a notícia em Dia de Nimb', () => {
  const env = ambiente();
  env.load('calendario-data.js');
  env.load('calendario.js');
  for (const mes of [null, '', false, [], {}]) assert.equal(env.window.GA_Calendario.valida({ mes, dia: 1 }), null);
  assert.deepEqual(plain(env.window.GA_Calendario.valida({ mes: 0, dia: 1 })), { mes: 0, dia: 1 });
  assert.deepEqual(plain(env.window.GA_Calendario.valida({ mes: '1', dia: '30', ano: '0' }, true)), { mes: 1, dia: 30, ano: 0 });
});

test('Tempo recupera registros válidos quando uma entrada persistida é nula', () => {
  const env = ambiente({ saved: { 'grifosAlados.tempo': JSON.stringify({
    config: { medida: 'mes', custoVida: 'medio' },
    jogadores: [null, { nome: 'Ayla', acoes: [null, { mes: 'Caravana', tipo: 'busca', nota: 'Encontrar mentor' }] }],
  }) } });
  env.load('tempo-data.js');
  env.load('tempo.js', 'window.auditTempo = { carregar, dados: () => dados };');
  assert.doesNotThrow(() => env.window.auditTempo.carregar());
  const data = env.window.auditTempo.dados();
  assert.equal(data.jogadores.length, 1);
  assert.equal(data.jogadores[0].nome, 'Ayla');
  assert.equal(data.jogadores[0].acoes.length, 1);
  assert.equal(data.jogadores[0].acoes[0].nota, 'Encontrar mentor');
});
