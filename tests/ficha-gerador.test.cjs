const {test}=require('node:test');
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
function motor(seed=42){
 const math=Object.create(Math); math.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
 const window={GA_semAcento:s=>String(s||'').normalize('NFD').replace(/\p{M}/gu,'').toLowerCase(),GA_Ficha:{criarEabrir:f=>f}};
 const ctx=vm.createContext({window,Math:math,console,localStorage:{getItem:()=>null}});
 for(const file of ['ficha-data','poderes-data','poderes-classe-data','poderes-raca-origem-data','origens-data','devotos-data','loja_completa','materiais-data','ficha-gerador-dogmas','ficha-gerador-equipamento','ficha-gerador'])vm.runInContext(fs.readFileSync('js/'+file+'.js','utf8'),ctx);
 return window;
}
test('seleções fixas, nenhuma divindade e ausência de equipamento',()=>{
 const w=motor();const f=w.GA_FichaGerador.gerar({nivel:8,raca:'raca-anao',classe:'cavaleiro',origem:'acolito',divindade:'nenhuma'});
 assert.equal(f.raca,'Anão');assert.equal(f.classes[0].classe,'cavaleiro');assert.equal(f.classes[0].nivel,8);assert.equal(f.origem,'Acólito');assert.equal(f.divindade,'');assert.equal(f.tibares,7000);assert.equal(f.inventario.length,0);
});
test('fundamentalista recebe extra, dogma e arma favorita; clérigo recebe três',()=>{
 const w=motor();for(const classe of ['cavaleiro','clerigo']){
 const f=w.GA_FichaGerador.gerar({nivel:1,raca:'raca-humano',classe,divindade:'khalmyr',fundamentalista:true,itens:'gratis'});
 assert.equal(f.poderes.filter(p=>p.grupo==='concedido').length,classe==='clerigo'?3:2);
 assert.match(f.anotacoes,/Fundamentalista de Khalmyr/);assert.match(f.anotacoes,/necessitado por dia/);
 assert.match(f.anotacoes,/Espada longa/i);
 }
});
test('recusa combinações incompatíveis sem criar ficha',()=>{
 const w=motor();assert.throws(()=>w.GA_FichaGerador.gerar({raca:'raca-anao',classe:'paladino',divindade:'valkaria',fundamentalista:true}),/combinação/);
 assert.throws(()=>w.GA_FichaGerador.gerar({divindade:'nenhuma',fundamentalista:true}),/Escolha/);
 assert.equal(w.GA_FichaGerador.gerar({raca:'raca-moreau',classe:'paladino',divindade:'valkaria',fundamentalista:true}).divindade,'Valkaria');
});
test('sorteios respeitam orçamento, modos e alcançam melhorias, encantos e materiais',()=>{
 let superior=false,magico=false,material=false;
 for(let nivel=1;nivel<=20;nivel++)for(let seed=1;seed<=12;seed++){
 const gratis=motor(seed).GA_FichaGerador.gerar({nivel,classe:'cavaleiro',divindade:'nenhuma',itens:'gratis'});
 const pago=motor(seed).GA_FichaGerador.gerar({nivel,classe:'cavaleiro',divindade:'nenhuma',itens:'gastar'});
 const total=gratis.inventario.reduce((s,it)=>s+Number(/Preço total: T\$ ([\d.]+)\. /.exec(it.notas)[1]),0);
 assert(total<=gratis.tibares+0.001);assert(pago.tibares>=0);assert(Math.abs(pago.tibares+total-gratis.tibares)<0.001);
 assert.deepEqual(JSON.parse(JSON.stringify(gratis.inventario)),JSON.parse(JSON.stringify(pago.inventario)));
 superior ||= gratis.inventario.some(it=>/[1-4] melhoria/.test(it.notas));
 magico ||= gratis.inventario.some(it=>/[1-3] encanto/.test(it.notas));
 material ||= gratis.inventario.some(it=>/Adamante|Mitral|Tollon|Rubi|Gelo|Aço|Prata/.test(it.obs));
 }
 assert(superior&&magico&&material);
});
test('Moreau e origem especial preservam benefícios',()=>{
 const w=motor();const origem=w.GA_ORIGENS.find(o=>o.tipo==='especial');
 const f=w.GA_FichaGerador.gerar({raca:'raca-moreau',origem:origem.id,divindade:'nenhuma'});
 assert.equal(f.raca,'Moreau');assert.match(f.poderes[0].obs,/Herança:/);assert(f.poderes.some(p=>p.pid==='origem-'+origem.id));
});
test('todos os deuses oferecem dogma e três poderes ao clérigo fundamentalista',()=>{
 const w=motor();
 for(const deus of w.GA_DEVOTOS.deuses){
 const f=w.GA_FichaGerador.gerar({classe:'clerigo',raca:'raca-humano',divindade:deus.chave,fundamentalista:true,nivel:1});
 assert.equal(f.poderes.filter(p=>p.grupo==='concedido').length,3,deus.nome);
 assert.match(f.anotacoes,/Dogma:/);
 }
});
