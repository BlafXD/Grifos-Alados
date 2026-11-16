const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const id = 'penitencia-de-azgher';
const admin = 'uxcc4lwMDceDqGFRrMwctv1Gi9D2';
const copia = JSON.parse(fs.readFileSync(path.join(root, 'data/noticias.json'), 'utf8')).campanhas[0];
const gazeta = () => ({ nome: copia.nome, noticias: structuredClone(copia.anos), dono: admin });

// Exercita os dois scripts reais com eventos do Firebase controlados,
// sem rede, servidor local ou escritas no banco de produção.
function ambiente({ uid = '', configurado = true, search = '' } = {}) {
  const assinaturas = new Map(), timers = new Map(), escritas = [], eventos = {};
  let escrever = () => Promise.resolve();
  let timerId = 0, mudouConta;
  let sessao = { configurado, usuario: uid ? { uid, displayName: 'Dono' } : null,
    mesaId: 'mesa', mesa: { dono: 'outro-mestre' }, souMestre: false };
  function elemento() {
    return { children: [], dataset: {}, style: {}, classList: { add() {}, remove() {}, contains: () => true },
      set innerHTML(v) { this.children = []; this.html = v; }, get innerHTML() { return this.html || ''; },
      setAttribute(k, v) { this[k] = v; }, appendChild(e) { this.children.push(e); }, addEventListener() {} };
  }
  const wrapper = elemento(), toast = elemento();
  let mostrarWrapper = false;
  const document = {
    readyState: 'complete', body: elemento(), createElement: elemento,
    addEventListener(nome, fn) { eventos[nome] = fn; },
    getElementById: nome => nome === 'ncToast' ? toast : null,
    querySelector: seletor => mostrarWrapper && seletor === '#noticias .wrapper' ? wrapper : null,
    querySelectorAll: () => []
  };
  const banco = { ref: (caminho = '') => ({
    on(evento, ok, falha) { assinaturas.set(caminho, { ok, falha }); return ok; },
    off(evento, cb) { if (assinaturas.get(caminho)?.ok === cb) assinaturas.delete(caminho); },
    update(dados) { escritas.push(structuredClone(dados)); return escrever(dados); }
  }) };
  const window = {
    GA_esc: s => String(s || ''), GA_guardar() {}, scrollTo() {},
    // Se o código antigo voltar a ser usado, os testes detectarão a manchete.
    NOTICIAS_DADOS: { campanhas: [{ id, nome: 'ESTÁTICO', anos: [{ ano: 1424, noticias: [{ titulo: 'ANTIGA' }] }] }] },
    GA_Mesa: { db: () => configurado ? banco : null, estado: () => sessao,
      aoMudar(fn) { mudouConta = fn; fn(sessao); } }
  };
  const context = vm.createContext({ window, document, console, URLSearchParams,
    location: { search, href: 'https://example.com/index.html' },
    localStorage: { getItem: () => null, removeItem() {} },
    setTimeout(fn, ms) { const chave = ++timerId; timers.set(chave, { fn, ms }); return chave; },
    clearTimeout(chave) { timers.delete(chave); },
    firebase: { database: { ServerValue: { TIMESTAMP: 123456 } } }, confirm: () => true
  });
  const source = fs.readFileSync(path.join(root, 'js/noticias.js'), 'utf8').replace(/\}\)\(\);\s*$/, `
    window.teste = {
      carregarNoticias, campanhas: () => dados.campanhas, paraArquivo, podeEditarAtual,
      leitura: () => estadoDaLeitura(campanhaAtual()), moverNoticia, salvar, renderizar,
      nova() { dados.campanhas.push({ id: 'nova', nome: 'Nova', anos: [] }); campAtiva = dados.campanhas.length - 1; salvar(); }
    };
  })();`);
  vm.runInContext(source, context);
  vm.runInContext(fs.readFileSync(path.join(root, 'js/noticias-mesa.js'), 'utf8'), context);
  window.teste.carregarNoticias();
  return {
    ...window.teste, api: window.GA_NoticiasMesa, escritas, wrapper, toast, assinaturas,
    escrita(fn) { escrever = fn; },
    mostrar() { mostrarWrapper = true; window.teste.renderizar(); },
    emitir(caminho, valor) {
      assert.ok(assinaturas.has(caminho), `Assinatura de ${caminho}`);
      assinaturas.get(caminho).ok({ val: () => structuredClone(valor) });
    },
    falhar(caminho) { assinaturas.get(caminho).falha(new Error('PERMISSION_DENIED')); },
    passar(ms) {
      for (const [chave, tarefa] of [...timers]) if (tarefa.ms === ms) {
        timers.delete(chave); tarefa.fn();
      }
    },
    conta(novoUid) { sessao = { ...sessao, usuario: novoUid ? { uid: novoUid } : null }; mudouConta(sessao); }
  };
}

test('F5 começa carregando, sem conteúdo estático, e recebe a ordem exata do banco', () => {
  const h = ambiente();
  assert.equal(h.leitura().texto, 'Carregando notícias…');
  assert.equal(h.campanhas()[0].anos.length, 0);
  h.mostrar();
  assert.equal(h.wrapper['aria-busy'], 'true');
  assert.ok(h.wrapper.children.some(e => e.textContent === 'Carregando notícias…' && e.role === 'status'));
  h.emitir('gazeta/publicas', null);
  h.emitir('campanhas/' + id, gazeta());
  assert.equal(h.leitura(), null);
  assert.equal(h.wrapper['aria-busy'], 'false');
  assert.equal(h.campanhas()[0].anos[0].noticias[0].id, 'n1424f');
  assert.equal(h.campanhas()[0].anos.flatMap(a => a.noticias).length, 18);
});

test('campanha sem notícias e banco vazio encerram o carregamento sem ressuscitar artigos', () => {
  const h = ambiente();
  h.emitir('gazeta/publicas', null);
  h.emitir('campanhas/' + id, { nome: 'Vazia', dono: admin });
  assert.equal(h.leitura(), null);
  assert.equal(h.campanhas()[0].anos.length, 0);
  h.emitir('campanhas/' + id, null);
  assert.equal(h.campanhas().length, 0);
  assert.match(h.leitura().texto, /Nenhuma campanha/);
});

test('falha de consulta oferece nova tentativa e a resposta posterior recupera a tela', () => {
  const h = ambiente();
  h.falhar('campanhas/' + id);
  assert.equal(h.leitura().erro, true);
  h.mostrar();
  assert.ok(h.wrapper.children.some(e => e.textContent === 'Tentar novamente'));
  h.api.tentarNovamente();
  assert.equal(h.leitura().carregando, true);
  h.emitir('campanhas/' + id, gazeta());
  assert.equal(h.leitura(), null);
});

test('consulta sem resposta atinge o prazo; o listener ainda pode recuperar a conexão', () => {
  const h = ambiente();
  h.passar(12000);
  assert.equal(h.leitura().erro, true);
  h.emitir('campanhas/' + id, gazeta());
  assert.equal(h.leitura(), null);
});

test('Firebase indisponível não mostra as matérias embutidas antigas', () => {
  const h = ambiente({ configurado: false });
  assert.equal(h.leitura().erro, true);
  assert.equal(h.campanhas()[0].anos.length, 0);
  assert.equal(h.podeEditarAtual(), false);
});

test('gazeta padrão funciona fora da vitrine e link direto carrega outra campanha', () => {
  const h = ambiente({ search: '?gazeta=outra' });
  assert.ok(h.assinaturas.has('campanhas/' + id));
  assert.ok(h.assinaturas.has('campanhas/outra'));
  h.emitir('campanhas/outra', { nome: 'Outra', noticias: [], dono: 'mestre' });
  assert.equal(h.leitura(), null);
});

test('dono edita e reordena sem ser mestre; um novo carregamento recebe a edição', async () => {
  const h = ambiente({ uid: admin });
  h.emitir('campanhas/' + id, gazeta());
  assert.equal(h.podeEditarAtual(), true);
  h.moverNoticia(0, 0, 1);
  h.campanhas()[0].anos[0].noticias[0].titulo = 'Título revisado';
  await h.salvar();
  h.passar(700);
  await Promise.resolve();
  assert.equal(h.escritas.length, 1);
  const noticias = h.escritas[0]['campanhas/' + id + '/noticias'];
  assert.equal(noticias[0].noticias[0].id, 'n1424e');
  const leitor = ambiente();
  leitor.emitir('campanhas/' + id, { ...gazeta(), noticias });
  assert.equal(leitor.campanhas()[0].anos[0].noticias[0].titulo, 'Título revisado');
  assert.equal(leitor.podeEditarAtual(), false);
});

test('conta comum não edita a gazeta do dono; sair cancela o envio agendado', () => {
  const h = ambiente({ uid: admin });
  h.emitir('campanhas/' + id, gazeta());
  h.moverNoticia(0, 0, 1);
  h.conta('outro');
  assert.equal(h.api.possoEscrever(id), false);
  h.passar(700);
  assert.equal(h.escritas.length, 0);
});

test('uma campanha recém-criada não se perde enquanto aguarda o eco do banco', () => {
  const h = ambiente({ uid: admin });
  h.emitir('campanhas/' + id, gazeta());
  h.nova();
  h.emitir('gazeta/publicas', null);
  assert.ok(h.campanhas().some(c => c.id === 'nova'));
  h.passar(700);
  assert.equal(h.escritas[0]['campanhas/nova/nome'], 'Nova');
});

test('exportação é backup JSON e nenhuma página carrega o antigo script de notícias', () => {
  const h = ambiente();
  assert.equal(h.paraArquivo().campanhas.length, 0);
  h.emitir('campanhas/' + id, gazeta());
  assert.equal(h.paraArquivo().campanhas[0].anos.flatMap(a => a.noticias).length, 18);
  for (const file of ['index.html', 'jogadores.html']) {
    assert.doesNotMatch(fs.readFileSync(path.join(root, file), 'utf8'), /noticias-data\.js/);
  }
  assert.doesNotMatch(fs.readFileSync(path.join(root, 'js/noticias.js'), 'utf8'), /NOTICIAS_DADOS|\/api\/noticias/);
});

test('índice atrasado de outra conta não injeta campanhas na conta atual', () => {
  const h = ambiente({ uid: 'alice' });
  const antigo = h.assinaturas.get('usuarios/alice/campanhas');
  h.conta('bob');
  h.emitir('usuarios/bob/campanhas', { 'de-bob': 'Bob' });
  antigo.ok({ val: () => ({ 'de-alice': 'Alice' }) });
  assert.deepEqual(Object.keys(h.api.estado().minhas), ['de-bob']);
  assert.equal(h.assinaturas.has('campanhas/de-alice'), false);
});

test('callback de tentativa anterior não sobrescreve a gazeta após reconectar', () => {
  const h = ambiente();
  const antigo = h.assinaturas.get('campanhas/' + id);
  h.api.tentarNovamente(); h.emitir('campanhas/' + id, gazeta());
  antigo.ok({ val: () => null });
  assert.equal(h.campanhas()[0].anos.flatMap(a => a.noticias).length, 18);
});

test('erro de envio de uma sessão encerrada não aparece para a próxima conta', async () => {
  const h = ambiente({ uid: admin }); h.emitir('campanhas/' + id, gazeta());
  let falhar;
  h.escrita(() => new Promise((resolve, reject) => { falhar = reject; }));
  h.moverNoticia(0, 0, 1); h.passar(700);
  h.conta('bob'); falhar(new Error('PERMISSION_DENIED')); await new Promise(r => setImmediate(r));
  assert.equal(h.api.estado().erro, '');
  assert.equal(h.api.estado().salvando, false);
});

test('salvar outra gazeta não esconde erro de publicação da primeira', async () => {
  const h = ambiente({ uid: admin }); h.emitir('campanhas/' + id, gazeta());
  h.escrita(dados => Object.keys(dados).some(k => k.startsWith('campanhas/' + id + '/'))
    ? Promise.reject(new Error('PERMISSION_DENIED')) : Promise.resolve());
  h.moverNoticia(0, 0, 1); h.passar(700); await new Promise(r => setImmediate(r));
  h.api.publicar({ id: 'segunda', nome: 'Outra', anos: [] }); h.passar(700);
  await new Promise(r => setImmediate(r));
  assert.match(h.api.estado().erro, /PERMISSION_DENIED/);
  h.escrita(() => Promise.resolve());
  h.api.publicar({ id, nome: copia.nome, anos: copia.anos }); h.passar(700);
  await new Promise(r => setImmediate(r));
  assert.equal(h.api.estado().erro, '');
});
