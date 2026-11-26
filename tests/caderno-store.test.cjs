// O caderno do mestre é local (faxina de 25/11/2026): quem edita, onde guarda
// e que ele não fala mais com o banco. Substitui o antigo caderno-sync.test.cjs,
// que testava a publicação na mesa e as propostas — as duas saíram.
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),{webcrypto}=require('node:crypto');

function caderno({sala='',usuario=null,papel=null,transmite=false,firebase=true,ehJogador=false,store=new Map()}={}){
  const estado={usuario,papel,souMembro:!!papel};let ouvinte=null;
  const window={GA_FIREBASE:firebase?{apiKey:'x'}:null,GA_Sala:{id:sala,ehJogador},addEventListener(){},
    GA_Mesa:{estado:()=>estado,transmite:()=>transmite,db:()=>{throw new Error('o caderno não deve tocar o banco');},aoMudar(fn){ouvinte=fn;fn(estado);}}};
  const ctx={window,crypto:webcrypto,console,document:{readyState:'complete'},localStorage:{getItem:k=>store.has(k)?store.get(k):null,setItem:(k,v)=>store.set(k,String(v))}};
  for(const f of ['caderno-core','caderno-store'])vm.runInNewContext(fs.readFileSync('js/'+f+'.js','utf8'),ctx);
  return {S:window.GA_CadernoStore,store,mudar(novo){Object.assign(estado,novo);ouvinte&&ouvinte(estado);}};
}
const nomes=S=>JSON.parse(JSON.stringify(S.estado().dados.ascensoes.map(s=>s.nome)));   // sai do vm como dado comum
const registrar=(S,nome)=>S.editar(d=>{d.ascensoes.push({id:nome,nome});});

test('bancada com Firebase configurado e sem login continua editável',()=>{
  const {S}=caderno();registrar(S,'Na bancada');
  assert.deepEqual(nomes(S),['Na bancada']);
  const L=caderno({sala:'mesa',usuario:{uid:'u'}}).S;registrar(L,'Logado, sem papel');
  assert.equal(L.estado().dados.ascensoes.length,1);
});

test('quem a mesa confirma como jogador (ou abre a página dos jogadores) não edita',()=>{
  const {S}=caderno({sala:'mesa',usuario:{uid:'u'},papel:'jogador'});
  assert.throws(()=>registrar(S,'x'),/Somente o mestre/);
  const J=caderno({ehJogador:true}).S;
  assert.throws(()=>registrar(J,'x'),/Somente o mestre/);
});

test('mestre e auxiliar da mesa editam; sem Firebase a bancada edita',()=>{
  for(const papel of ['mestre','auxiliar']){const {S}=caderno({sala:'mesa',usuario:{uid:'u'},papel,transmite:true});registrar(S,papel);assert.equal(S.estado().dados.ascensoes.length,1);}
  const {S}=caderno({firebase:false});registrar(S,'offline');assert.equal(S.estado().dados.ascensoes.length,1);
});

test('guarda só no navegador, na chave de sempre, e um caderno antigo continua achado',()=>{
  const store=new Map([['grifosAlados.caderno.u.mesa.mestre',JSON.stringify({dados:{versao:1,revisao:3,ascensoes:[{id:'a',nome:'Antiga'}],itens:[{id:'i'}]},dirty:true})]]);
  const {S}=caderno({sala:'mesa',usuario:{uid:'u'},papel:'mestre',transmite:true,store});
  assert.deepEqual(nomes(S),['Antiga'],'lê o formato antigo');
  registrar(S,'Nova');
  const salvo=JSON.parse(store.get('grifosAlados.caderno.u.mesa.mestre'));
  assert.deepEqual(salvo.dados.ascensoes.map(x=>x.nome),['Antiga','Nova']);
});

test('trocar de conta troca de caderno (cada conta tem o seu)',()=>{
  const store=new Map();
  const c=caderno({sala:'mesa',usuario:{uid:'ana'},papel:'mestre',transmite:true,store});
  registrar(c.S,'da Ana');
  c.mudar({usuario:{uid:'bia'}});
  assert.equal(c.S.estado().dados.ascensoes.length,0,'a Bia não vê o caderno da Ana');
  c.mudar({usuario:{uid:'ana'}});
  assert.deepEqual(nomes(c.S),['da Ana']);
});
