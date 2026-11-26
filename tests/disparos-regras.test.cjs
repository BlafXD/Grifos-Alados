// Regras do banco para os 🎯 disparos (controlador do mestre e ajuda entre
// aliados): quem lê a caixa de quem, quem escreve o quê, e que a CD secreta
// só o mestre vê. Avalia as EXPRESSÕES REAIS do firebase-rules.json.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
function lerRegras() {
  for (const p of ['firebase-rules.json', 'Inútil/firebase-rules.json']) {
    try { return JSON.parse(fs.readFileSync(path.join(root, p), 'utf8')).rules; } catch (e) {}
  }
  return null;
}
const rules = lerRegras();
const SEM = rules ? false : 'firebase-rules.json não encontrado (nem na raiz nem em Inútil/)';

const pegar = (obj, partes) => partes.reduce((v, k) => (v == null ? undefined : v[k]), obj);
function snap(obj, partes) {
  const v = pegar(obj, partes);
  return {
    val: () => (v === undefined ? null : v),
    exists: () => v !== undefined && v !== null,
    child: p => snap(obj, partes.concat(String(p).split('/'))),
    hasChildren: ks => !!v && typeof v === 'object' && ks.every(k => v[k] !== undefined && v[k] !== null),
    isString: () => typeof v === 'string',
    isNumber: () => typeof v === 'number',
  };
}
function avaliar(expr, ctx) {
  return vm.runInNewContext(expr.replace(/newData\.val\(\)\.length/g, 'String(newData.val()).length'), ctx);
}
// escrever `valor` em `caminho` como `uid`: .write em cascata + .validate nos nós tocados
function pode(caminho, valor, uid, banco) {
  const partes = caminho.split('/');
  const depois = JSON.parse(JSON.stringify(banco));
  const pai = pegar(depois, partes.slice(0, -1)) || (() => {
    let o = depois; partes.slice(0, -1).forEach(k => { o[k] = o[k] || {}; o = o[k]; }); return o;
  })();
  if (valor === null) delete pai[partes.at(-1)]; else pai[partes.at(-1)] = valor;
  const auth = uid ? { uid, token: { email_verified: true } } : null;
  let regra = rules, caps = {}, liberado = false;
  for (let i = 0; i <= partes.length; i++) {
    const aqui = partes.slice(0, i);
    const ctx = { auth, root: snap(banco, []), data: snap(banco, aqui), newData: snap(depois, aqui), ...caps };
    if (!liberado && typeof regra['.write'] === 'string' && avaliar(regra['.write'], ctx)) liberado = true;
    if (i > 0 && valor !== null && typeof regra['.validate'] === 'string' && !avaliar(regra['.validate'], ctx)) return false;
    if (i === partes.length) break;
    const k = partes[i];
    const chave = Object.hasOwn(regra, k) ? k : Object.keys(regra).find(x => x.startsWith('$'));
    if (!chave) break;
    if (chave.startsWith('$')) caps[chave] = k;
    regra = regra[chave];
  }
  // validação dos filhos do valor escrito (um nível, o que basta aqui)
  if (liberado && valor && typeof valor === 'object') {
    for (const [k, v] of Object.entries(valor)) {
      const r = regra && (regra[k] || (regra.acao && k === 'acao' ? regra.acao : null));
      if (r && typeof r === 'object') {
        if (typeof r['.validate'] === 'string') {
          const ctx = { auth, root: snap(banco, []), newData: snap(depois, partes.concat(k)), ...caps };
          if (!avaliar(r['.validate'], ctx)) return false;
        }
        if (v && typeof v === 'object') for (const k2 of Object.keys(v)) {
          const r2 = r[k2];
          if (r2 && typeof r2['.validate'] === 'string' &&
              !avaliar(r2['.validate'], { auth, root: snap(banco, []), newData: snap(depois, partes.concat(k, k2)), ...caps })) return false;
        }
      }
    }
  }
  return liberado;
}
function podeLer(caminho, uid, banco) {
  const partes = caminho.split('/');
  const auth = uid ? { uid, token: { email_verified: true } } : null;
  let regra = rules, caps = {};
  for (let i = 0; i <= partes.length; i++) {
    const ctx = { auth, root: snap(banco, []), data: snap(banco, partes.slice(0, i)), ...caps };
    if (typeof regra['.read'] === 'string' && avaliar(regra['.read'], ctx)) return true;
    if (regra['.read'] === true) return true;
    if (i === partes.length) return false;
    const k = partes[i];
    const chave = Object.hasOwn(regra, k) ? k : Object.keys(regra).find(x => x.startsWith('$'));
    if (!chave) return false;
    if (chave.startsWith('$')) caps[chave] = k;
    regra = regra[chave];
  }
  return false;
}

const banco = () => ({ mesas: { m: { dono: 'mestre', membros: {
  mestre: { papel: 'mestre' }, ana: { papel: 'jogador' }, bia: { papel: 'jogador' }, eva: { papel: 'espectador' } },
  disparos: { ana: { d1: { tipo: 'rolagem', de: 'mestre', em: 1 } } }, disparosCd: { d1: { cd: 15 } } } } });

test('cada jogador lê só a própria caixa; a CD secreta só o mestre', { skip: SEM }, () => {
  const b = banco();
  assert(podeLer('mesas/m/disparos/ana', 'ana', b));
  assert(!podeLer('mesas/m/disparos/ana', 'bia', b), 'a Bia não lê a caixa da Ana');
  assert(!podeLer('mesas/m/disparos', 'ana', b), 'jogador não lê todas as caixas');
  assert(podeLer('mesas/m/disparos', 'mestre', b));
  assert(!podeLer('mesas/m/disparosCd', 'ana', b), 'a CD secreta não chega ao jogador');
  assert(podeLer('mesas/m/disparosCd', 'mestre', b));
});

test('o mestre pede teste e aplica dano; o jogador responde na própria caixa', { skip: SEM }, () => {
  const b = banco();
  assert(pode('mesas/m/disparos/bia/d2', { tipo: 'rolagem', de: 'mestre', em: 2 }, 'mestre', b));
  assert(pode('mesas/m/disparos/ana/d3', { tipo: 'aplicar', de: 'mestre', em: 3, acao: { dano: 12, tipoDano: 'fogo' } }, 'mestre', b));
  assert(pode('mesas/m/disparosCd/d2', { cd: 18 }, 'mestre', b));
  assert(pode('mesas/m/disparos/ana/d1/resposta', { total: 17, d20: 12 }, 'ana', b), 'a Ana responde');
  assert(!pode('mesas/m/disparos/ana/d1/resposta', { total: 30 }, 'bia', b), 'a Bia não responde pela Ana');
  assert(!pode('mesas/m/disparos/ana/d1', null, 'ana', b), 'o jogador não apaga o pedido');
  assert(!pode('mesas/m/disparosCd/d1', { cd: 1 }, 'ana', b), 'jogador não mexe na CD');
});

test('jogador manda ajuda (efeito) a um aliado — mas nunca dano, condição ou pedido de teste', { skip: SEM }, () => {
  const b = banco();
  assert(pode('mesas/m/disparos/bia/e1', { tipo: 'efeito', de: 'ana', em: 4, acao: { cura: 9 } }, 'ana', b));
  assert(!pode('mesas/m/disparos/bia/e2', { tipo: 'efeito', de: 'bia', em: 4, acao: { cura: 9 } }, 'ana', b), 'não assina por outro');
  assert(!pode('mesas/m/disparos/bia/e3', { tipo: 'rolagem', de: 'ana', em: 4 }, 'ana', b), 'pedido de teste é do mestre');
  assert(!pode('mesas/m/disparos/bia/e4', { tipo: 'efeito', de: 'ana', em: 4, acao: { dano: 50 } }, 'ana', b), 'dano é do mestre');
  assert(!pode('mesas/m/disparos/bia/e5', { tipo: 'efeito', de: 'ana', em: 4, acao: { condicao: 'Atordoado' } }, 'ana', b), 'condição é do mestre');
  assert(!pode('mesas/m/disparos/bia/e6', { tipo: 'efeito', de: 'eva', em: 4, acao: { cura: 1 } }, 'eva', b), 'espectador não manda');
  assert(!pode('mesas/m/disparos/bia/e7', { tipo: 'efeito', de: 'zé', em: 4, acao: { cura: 1 } }, 'zé', b), 'estranho não manda');
  assert(!pode('mesas/m/disparos/ana/d1', { tipo: 'efeito', de: 'bia', em: 5 }, 'bia', b), 'não sobrescreve o que já existe');
});
