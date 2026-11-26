const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),{webcrypto}=require('node:crypto');
// As regras do banco moram em Inútil/ (fora do git desde 22/11/2026): procura nos dois
// lugares e, sem o arquivo, PULA os testes de regra com o motivo à vista.
function textoDasRegras(){for(const q of ['firebase-rules.json','Inútil/firebase-rules.json']){try{return fs.readFileSync(q,'utf8');}catch{}}return null;}
const SEM_REGRAS=textoDasRegras()?false:'firebase-rules.json não encontrado (nem na raiz nem em Inútil/)';
function ambiente(papel='mestre'){
  const store=new Map(),listeners=new Map(),writes=[];let onAuth,banco=null,postergar=false,concluir;
  const sessao={usuario:{uid:'ana'},souMembro:true,papel,escreve:papel!=='espectador'};
  function ref(path){return {child:p=>ref(path+'/'+p),on:(ev,fn)=>listeners.set(path,fn),off:()=>listeners.delete(path),set:async v=>writes.push({path,v}),remove:async()=>writes.push({path,remove:true}),transaction:async fn=>{const v=fn(banco);if(v===undefined)return {committed:false};if(postergar)await new Promise(r=>concluir=r);banco=v;writes.push({path,v});return {committed:true};}};}
  const window={GA_FIREBASE:{},GA_Sala:{id:'mesa',ehJogador:papel==='jogador'},addEventListener(){},GA_Mesa:{estado:()=>sessao,transmite:()=>['mestre','auxiliar'].includes(sessao.papel),db:()=>({ref}),aoMudar:fn=>onAuth=fn}};
  const ctx={window,crypto:webcrypto,console,document:{readyState:'complete'},localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v)}};
  for(const f of ['caderno-core','caderno-store'])vm.runInNewContext(fs.readFileSync('js/'+f+'.js','utf8'),ctx);
  return {S:window.GA_CadernoStore,C:window.GA_CadernoCore,listeners,writes,sessao,emitir(v){const master=['mestre','auxiliar'].includes(sessao.papel);listeners.get(master?'mesas/mesa/caderno':'mesas/mesa/caderno/publico')({val:()=>v});},banco:v=>banco=v,postergar:()=>postergar=true,concluir:()=>concluir(),mudar(uid,papel){sessao.usuario={uid};sessao.papel=papel;onAuth();}};
}
test('mestre publica projeção sem segredos e conserva arrays vazios',async()=>{const a=ambiente();a.emitir(null);a.S.editar(d=>{d.itens.push({id:'i',nome:'Espada',publicado:true,maldicoes:['SEGREDO'],revelacoes:[]});});await a.S.publicar();const v=a.writes[0].v;assert.ok(v.privado.includes('SEGREDO'));assert.ok(!v.publico.includes('SEGREDO'));assert.deepEqual(JSON.parse(v.publico).objetivos,[]);assert.equal(a.S.estado().dirty,false);assert.equal(a.S.estado().dados.revisao,1);});
test('publicação recusa revisão concorrente sem destruir rascunho',async()=>{const a=ambiente();a.emitir(null);a.S.editar(d=>d.aventura='Local');a.banco({revisao:1});await assert.rejects(a.S.publicar(),/Outro mestre/);assert.equal(a.writes.length,0);assert.equal(a.S.estado().dados.aventura,'Local');assert.equal(a.S.estado().dirty,true);});
test('edição durante publicação permanece pendente e recebe revisão nova',async()=>{const a=ambiente();a.emitir(null);a.S.editar(d=>d.aventura='Primeira');a.postergar();const p=a.S.publicar();a.S.editar(d=>d.aventura='Segunda');a.concluir();await p;assert.equal(a.S.estado().dados.aventura,'Segunda');assert.equal(a.S.estado().dados.revisao,1);assert.equal(a.S.estado().dirty,true);});
test('jogador só assina versão pública e não pode editar ou aprovar',async()=>{const a=ambiente('jogador');assert.ok(a.listeners.has('mesas/mesa/caderno/publico'));assert.ok(!a.listeners.has('mesas/mesa/caderno'));assert.throws(()=>a.S.editar(d=>d.regras.ascensao=true),/Somente o mestre/);a.emitir(JSON.stringify(a.C.novo()));await a.S.propor('ascensao',{nome:'Ana',fichaId:'f'});assert.match(a.writes[0].path,/cadernoPropostas\/ana\//);await assert.rejects(a.S.publicar(),/mestre/);});
test('troca de conta durante publicação não preenche o caderno da nova conta',async()=>{const a=ambiente();a.emitir(null);a.S.editar(d=>d.aventura='Privada de Ana');a.postergar();const p=a.S.publicar();a.mudar('bia','mestre');a.concluir();await p;assert.equal(a.S.estado().dados.aventura,'');});
test('regras do banco não concedem leitura de segredos aos membros comuns',{skip:SEM_REGRAS},()=>{const r=JSON.parse(textoDasRegras()).rules.mesas.$sala;const expr=r.caderno['.read'];assert.match(expr,/mestre/);assert.match(expr,/auxiliar/);assert.ok(!expr.includes("'jogador'"));assert.match(r.caderno.publico['.read'],/membros/);assert.match(r.cadernoPropostas.$uid.$id['.write'],/auth.uid === \$uid/);assert.equal(r.caderno.$outro['.validate'],false);});
test('expressões reais das regras bloqueiam segredos e escrita de jogador/espectador/estranho',{skip:SEM_REGRAS},()=>{
  const rules=JSON.parse(textoDasRegras()).rules;
  const database={mesas:{mesa:{dono:'m',membros:{m:{papel:'mestre'},a:{papel:'auxiliar'},j:{papel:'jogador'},e:{papel:'espectador'}}}}};
  const snapshot=value=>({val:()=>value??null,exists:()=>value!=null,child:path=>snapshot(path.split('/').reduce((v,k)=>v?.[k],value))});
  function allowed(path,op,uid){let rule=rules,parts=[],captures={};for(const key of [...path.split('/'),null]){const expr=rule?.['.'+op];if(expr===true||typeof expr==='string'&&vm.runInNewContext(expr,{auth:uid?{uid,token:{email_verified:true}}:null,root:snapshot(database),data:snapshot(database).child(parts.join('/')),newData:snapshot({}),...captures}))return true;if(key===null)return false;const k=Object.hasOwn(rule,key)?key:Object.keys(rule).find(k=>k.startsWith('$'));if(!k)return false;if(k.startsWith('$'))captures[k]=key;parts.push(key);rule=rule[k];}return false;}
  for(const uid of ['m','a']){assert.equal(allowed('mesas/mesa/caderno/privado','read',uid),true);assert.equal(allowed('mesas/mesa/caderno','write',uid),true);}
  for(const uid of ['j','e','x',null]){assert.equal(allowed('mesas/mesa/caderno','read',uid),false);assert.equal(allowed('mesas/mesa/caderno/privado','read',uid),false);assert.equal(allowed('mesas/mesa/caderno/publico','write',uid),false);}
  assert.equal(allowed('mesas/mesa/caderno/publico','read','j'),true);assert.equal(allowed('mesas/mesa/caderno/publico','read','x'),false);
  assert.equal(allowed('mesas/mesa/cadernoPropostas/j/p','write','j'),true);assert.equal(allowed('mesas/mesa/cadernoPropostas/j/p','write','e'),false);assert.equal(allowed('mesas/mesa/cadernoPropostas/j/p','write','x'),false);assert.equal(allowed('mesas/mesa/cadernoPropostas/m/p','write','j'),false);
});

// Revisão de 25/11/2026: o Caderno é da página do mestre — com o Firebase
// configurado, a bancada e quem não entrou na conta também editam; só quem a
// mesa CONFIRMA como jogador/espectador fica de fora.
function soLocal({sala='',usuario=null,papel=null,transmite=false}={}){
  const store=new Map();
  const window={GA_FIREBASE:{apiKey:'x'},GA_Sala:{id:sala,ehJogador:false},addEventListener(){},
    GA_Mesa:{estado:()=>({usuario,papel,souMembro:!!papel}),transmite:()=>transmite,db:()=>null,aoMudar(){}}};
  const ctx={window,crypto:webcrypto,console,document:{readyState:'complete'},localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v)}};
  for(const f of ['caderno-core','caderno-store'])vm.runInNewContext(fs.readFileSync('js/'+f+'.js','utf8'),ctx);
  return window.GA_CadernoStore;
}
test('bancada com Firebase configurado e sem login continua editável',()=>{
  const S=soLocal();S.editar(d=>{d.aventura='Na bancada';});
  assert.equal(S.estado().dados.aventura,'Na bancada');
  const L=soLocal({sala:'mesa',usuario:{uid:'u'}});L.editar(d=>{d.aventura='Logado, sem papel';});
  assert.equal(L.estado().dados.aventura,'Logado, sem papel');
});
test('quem a mesa confirma como jogador não edita o caderno pela página do mestre',()=>{
  const S=soLocal({sala:'mesa',usuario:{uid:'u'},papel:'jogador'});
  assert.throws(()=>S.editar(d=>{d.aventura='x';}),/Somente o mestre/);
});
