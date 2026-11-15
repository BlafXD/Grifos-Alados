const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const arquivo = JSON.parse(fs.readFileSync(path.join(root, 'data/noticias.json'), 'utf8'));
const id = 'penitencia-de-azgher';

function ambiente() {
  const window = { GA_esc: s => String(s || ''), GA_NoticiasMesa: { possoEscrever: () => true } };
  const source = fs.readFileSync(path.join(root, 'js/noticias.js'), 'utf8').replace(/\}\)\(\);\s*$/, `
    window.teste = {
      carregar(d) { doArquivo = normalizar(d); dados = juntarComAMesa(); },
      receber(m) { remotas = m; dados = juntarComAMesa(); },
      campanhas: () => dados.campanhas, paraArquivo, podePublicar, textoDaLinha
    };
  })();`);
  vm.runInNewContext(source, { window, document: { addEventListener() {}, getElementById() { return null; } } });
  window.teste.carregar(JSON.parse(JSON.stringify(arquivo)));
  return window.teste;
}

test('a chegada atrasada do Firebase não substitui o acervo nem as três matérias novas', () => {
  const h = ambiente();
  const antes = JSON.stringify(h.campanhas().find(c => c.id === id));
  h.receber({ [id]: { nome: 'Cópia antiga', noticias: [{ ano: 1424, noticias: [] }], dono: 'antigo', hoje: { dia: 1, mes: 1 } } });
  assert.equal(JSON.stringify(h.campanhas().find(c => c.id === id)), antes);
  const noticias = h.campanhas().find(c => c.id === id).anos.flatMap(a => a.noticias);
  for (const chave of ['n1424d', 'n1424e', 'n1424f', 'mvzfyh6iishl']) {
    assert.equal(noticias.filter(n => n.id === chave).length, 1);
  }
  assert.equal(noticias.length, 18);
});

test('índice parcial e ausência no banco também preservam o acervo', () => {
  const h = ambiente();
  const antes = JSON.stringify(h.campanhas());
  h.receber({ [id]: { nome: 'Penitência de Azgher', semCorpo: true } });
  assert.equal(JSON.stringify(h.campanhas()), antes);
  h.receber({});
  assert.equal(JSON.stringify(h.campanhas()), antes);
});

test('campanhas ativas continuam usando a versão ao vivo, incluindo remoções', () => {
  const h = ambiente();
  h.receber({ 'nuevo-sol': { nome: 'Nuevo Sol', noticias: [{ ano: 1424, noticias: [{ id: 'ao-vivo', titulo: 'Nova' }] }] } });
  assert.equal(h.campanhas().find(c => c.id === 'nuevo-sol').anos[0].noticias[0].id, 'ao-vivo');
  h.receber({ 'nuevo-sol': { nome: 'Nuevo Sol', noticias: [] } });
  assert.equal(h.campanhas().find(c => c.id === 'nuevo-sol').anos.length, 0);
});

test('exportação mantém o acervo; edição dele não publica na sala antiga', () => {
  const h = ambiente();
  assert.equal(h.paraArquivo().campanhas.find(c => c.id === id).arquivada, true);
  assert.equal(h.podePublicar(id), false);
  assert.equal(h.podePublicar('nuevo-sol'), true);
  assert.match(h.textoDaLinha({}, h.campanhas().find(c => c.id === id)), /Acervo da campanha encerrada/);
});

test('o JSON e a versão offline contêm o mesmo acervo', () => {
  const context = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.join(root, 'js/noticias-data.js'), 'utf8'), context);
  assert.equal(JSON.stringify(context.window.NOTICIAS_DADOS), JSON.stringify(arquivo));
});
