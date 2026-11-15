const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const arquivo = JSON.parse(fs.readFileSync(path.join(root, 'data/noticias.json'), 'utf8'));
const id = 'penitencia-de-azgher';

function ambiente(dono = false) {
  const publicadas = [];
  const window = { GA_esc: s => String(s || ''), GA_NoticiasMesa: {
    possoEscrever: () => true, souDono: () => dono,
    publicar: c => publicadas.push(JSON.parse(JSON.stringify(c)))
  } };
  const source = fs.readFileSync(path.join(root, 'js/noticias.js'), 'utf8').replace(/\}\)\(\);\s*$/, `
    window.teste = {
      carregar(d) { doArquivo = normalizar(d); dados = juntarComAMesa(); },
      receber(m) { remotas = m; dados = juntarComAMesa(); },
      campanhas: () => dados.campanhas, paraArquivo, podePublicar, textoDaLinha,
      moverNoticia, salvar, podeEditarAtual
    };
  })();`);
  vm.runInNewContext(source, { window, document: {
    addEventListener() {}, getElementById() { return null; }, querySelector() { return null; }
  } });
  window.teste.publicadas = publicadas;
  window.teste.carregar(JSON.parse(JSON.stringify(arquivo)));
  return window.teste;
}

test('a chegada atrasada do Firebase não substitui o acervo nem as três matérias novas', () => {
  const h = ambiente();
  const antes = JSON.stringify(h.campanhas().find(c => c.id === id));
  h.receber({ [id]: { atualizadoEm: 1793635002791, nome: 'Cópia antiga', noticias: [{ ano: 1424, noticias: [] }], dono: 'antigo', hoje: { dia: 1, mes: 1 } } });
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

test('exportação mantém o acervo; visitantes não publicam', () => {
  const h = ambiente();
  assert.equal(h.paraArquivo().campanhas.find(c => c.id === id).arquivada, true);
  assert.equal(h.podePublicar(id), false);
  assert.equal(h.podePublicar('nuevo-sol'), true);
  assert.match(h.textoDaLinha({}, h.campanhas().find(c => c.id === id)), /Acervo da campanha encerrada/);
});

test('dono reordena e edita online; leitor recebe a ordem nova após recarregar', async () => {
  const h = ambiente(true);
  assert.equal(h.podePublicar(id), true);
  assert.equal(h.podeEditarAtual(), true);
  h.moverNoticia(0, 0, 1);
  h.campanhas()[0].anos[0].noticias[0].titulo = 'Título revisado';
  await h.salvar();
  const publicada = h.publicadas.at(-1);
  assert.equal(publicada.anos[0].noticias[0].id, 'n1424e');
  assert.equal(publicada.anos[0].noticias[1].id, 'n1424d');
  const leitor = ambiente();
  leitor.receber({ [id]: { nome: publicada.nome, noticias: publicada.anos, atualizadoEm: 1793635002792 } });
  assert.equal(leitor.campanhas()[0].anos[0].noticias[0].titulo, 'Título revisado');
  assert.equal(leitor.campanhas()[0].arquivada, true);
  assert.equal(leitor.paraArquivo().campanhas[0].ignorarBancoAte, 1793635002791);
  assert.equal(leitor.podeEditarAtual(), false);
  assert.equal(leitor.podePublicar(id), false);
});

test('remoções posteriores à consolidação não ressuscitam as notícias locais', () => {
  const h = ambiente();
  h.receber({ [id]: { nome: 'Penitência de Azgher', noticias: [], atualizadoEm: 1793635002792 } });
  assert.equal(h.campanhas()[0].anos.length, 0);
});

test('o JSON e a versão offline contêm o mesmo acervo', () => {
  const context = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.join(root, 'js/noticias-data.js'), 'utf8'), context);
  assert.equal(JSON.stringify(context.window.NOTICIAS_DADOS), JSON.stringify(arquivo));
});

function bancoDoAcervo() {
  const escritas = [];
  const window = {
    NOTICIAS_DADOS: arquivo,
    GA_Mesa: {
      aoMudar() {},
      estado: () => ({ mesaId: id, mesa: { dono: 'outro-mestre' }, souMestre: false }),
      db: () => ({ ref: () => ({ update: upd => { escritas.push(upd); return Promise.resolve(); } }) })
    }
  };
  const source = fs.readFileSync(path.join(root, 'js/noticias-mesa.js'), 'utf8').replace(/\}\)\(\);\s*$/, `
    window.testeBanco = {
      conta(uid) { mesa = { configurado: true, usuario: uid ? { uid, displayName: 'Dono' } : null }; },
      corpo(id, c) { corpos[id] = c; }, enviar
    };
  })();`);
  vm.runInNewContext(source, {
    window, document: {}, setTimeout() {}, clearTimeout() {},
    firebase: { database: { ServerValue: { TIMESTAMP: 1793635002792 } } }
  });
  return { api: window.GA_NoticiasMesa, h: window.testeBanco, escritas };
}

test('envio real permite ao admin editar o acervo sem ser mestre e preserva o proprietário', () => {
  const { api, h, escritas } = bancoDoAcervo();
  h.conta(api.ADMIN_UID);
  h.corpo(id, { dono: 'outro-mestre' });
  assert.equal(api.possoEscrever(id), true);
  api.publicar(arquivo.campanhas[0]);
  h.enviar();
  assert.equal(escritas.length, 1);
  assert.equal(escritas[0]['campanhas/' + id + '/noticias'][0].noticias.length, arquivo.campanhas[0].anos[0].noticias.length);
  assert.equal(escritas[0]['campanhas/' + id + '/atualizadoEm'], 1793635002792);
  assert.equal('campanhas/' + id + '/dono' in escritas[0], false);
  h.corpo('outra-campanha', { dono: 'outro-mestre' });
  assert.equal(api.possoEscrever('outra-campanha'), false);
});

test('visitante e mestre de outra conta não enviam alterações do acervo', () => {
  const { api, h, escritas } = bancoDoAcervo();
  for (const uid of ['', 'outro-mestre']) {
    h.conta(uid);
    assert.equal(api.possoEscrever(id), false);
    api.publicar(arquivo.campanhas[0]);
    h.enviar();
  }
  assert.equal(escritas.length, 0);
});

test('trocar de conta durante a espera cancela a publicação pendente', () => {
  const { api, h, escritas } = bancoDoAcervo();
  h.conta(api.ADMIN_UID);
  api.publicar(arquivo.campanhas[0]);
  h.conta('outro-mestre');
  h.enviar();
  assert.equal(escritas.length, 0);
});
