const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),{webcrypto}=require('node:crypto');
// O Caderno virou só do mestre (25/11/2026) e a faxina tirou do caderno-core
// o que era da tela antiga (testes estendidos, objetivos, itens, publicação):
// aqui fica a Ascensão, o catálogo de deuses menores e as referências.
function contexto(){const c={window:{},crypto:webcrypto};for(const f of ['caderno-core','ascensao-divina','deuses-menores-data'])vm.runInNewContext(fs.readFileSync('js/'+f+'.js','utf8'),c);return c.window;}
test('catálogo reúne 63 deuses menores, sem verbetes vazios',()=>{const w=contexto();assert.equal(w.GA_DEUSES_MENORES.length,63);assert.equal(new Set(w.GA_DEUSES_MENORES.map(d=>d.id)).size,63);for(const d of w.GA_DEUSES_MENORES)for(const k of ['nome','livro','pagina','obrigacoes','poderNome','poderTexto'])assert.ok(d[k],d.nome+': '+k);});
test('candidato não ascende por mero cadastro; recompensas não contam duas vezes',()=>{const A=contexto().GA_Ascensao;let s=A.novo('Ana','f');assert.equal(s.status,0);assert.throws(()=>A.comando(s,{tipo:'feito'},true),/não decidiu/);s.caminho='ascender';s.conceito='Esperança';s.feito='Salvou uma cidade em jogo';s=A.comando(s,{tipo:'feito'},true);assert.throws(()=>A.comando(s,{tipo:'ascender'},true),/duas recompensas/);s=A.comando(s,{tipo:'busca',id:'1',finalidade:'ascensao',sucessos:3},true);s=A.comando(s,{tipo:'ascender'},true);assert.equal(s.status,1);assert.equal(A.saldo(s,'ascensao'),0);assert.throws(()=>A.comando(s,{tipo:'evoluir'},true),/duas recompensas/);assert.throws(()=>A.comando(s,{tipo:'dadiva',dadiva:'vigor'},true),/recompensa/);});
test('dádivas respeitam natureza, pré-requisitos, repetição e limite por status',()=>{const A=contexto().GA_Ascensao;let s=A.novo('Ana');Object.assign(s,{status:1,feitoAprovado:true,caminho:'ascender'});s=A.comando(s,{tipo:'busca',id:'1',finalidade:'dadiva',sucessos:3},true);assert.throws(()=>A.comando(s,{tipo:'dadiva',dadiva:'imortal'},true),/pré-requisito/);assert.throws(()=>A.comando(s,{tipo:'dadiva',dadiva:'conhecimento',escolha:'Religião'},true),/natureza/);s=A.comando(s,{tipo:'dadiva',dadiva:'semiimortal'},true);s=A.comando(s,{tipo:'dadiva',dadiva:'imortal'},true);assert.equal(s.dadivas.length,2);assert.throws(()=>A.comando(s,{tipo:'dadiva',dadiva:'vigor'},true),/limite/);});
test('desafio é único por intervalo e redução permanente só no resultado correto',()=>{const A=contexto().GA_Ascensao;let s=A.novo('Ana');s.status=1;s=A.comando(s,{tipo:'desafio',periodo:'a',dado:10},true);assert.throws(()=>A.comando(s,{tipo:'desafio',periodo:'a',dado:1},true),/Já existe/);assert.throws(()=>A.comando(s,{tipo:'resolver',periodo:'a',resultado:'falhou',reduzirStatus:true},true),/não reduz/);assert.equal(s.status,1);});
test('cada magia do catálogo tem referência de página e livro identificados',()=>{const c={window:{}};for(const f of ['magias-data','referencias-magias-data'])vm.runInNewContext(fs.readFileSync('js/'+f+'.js','utf8'),c);assert.equal(c.window.GA_MAGIAS.length,254);for(const m of c.window.GA_MAGIAS){const refs=c.window.GA_REFERENCIAS_MAGIAS[m.id];assert.ok(refs?.length,m.nome);for(const r of refs)assert.ok(r.livro&&Number.isInteger(r.pagina)&&r.pagina>0,m.nome);}});
test('perda de fama (mestre): ajusta status 0–5 sem descartar dádivas; remover e trocar respeitam pré-requisitos',()=>{const A=contexto().GA_Ascensao;let s=A.novo('Ana');Object.assign(s,{status:1,feitoAprovado:true,caminho:'ascender'});s=A.comando(s,{tipo:'busca',id:'1',finalidade:'dadiva',sucessos:3},true);s=A.comando(s,{tipo:'dadiva',dadiva:'defesa'},true);s=A.comando(s,{tipo:'dadiva',dadiva:'resiliencia'},true);assert.equal(s.dadivas.length,2);
  // perder fama NÃO apaga dádivas (Deuses de Arton, p. 237: quem decide é o mestre)
  s=A.comando(s,{tipo:'fama',delta:-1},true);assert.equal(s.status,0);assert.equal(s.dadivas.length,2);
  assert.throws(()=>A.comando(s,{tipo:'fama',delta:-1},true),/0 a 5/);
  s=A.comando(s,{tipo:'fama',delta:1},true);assert.equal(s.status,1);
  s=A.comando(s,{tipo:'remover-dadiva',indice:0},true);assert.equal(s.dadivas.length,1);
  const antes=s.dadivas[0].tipo;s=A.comando(s,{tipo:'trocar-dadiva',indice:0,dadiva:'vigor'},true);assert.equal(s.dadivas[0].tipo,'vigor');assert.notEqual(s.dadivas[0].tipo,antes);
  assert.throws(()=>A.comando(s,{tipo:'trocar-dadiva',indice:0,dadiva:'atributo',escolha:'Força'},true),/Status divino insuficiente/);});
test('o desafio divino 13 é Interferência Pessoal (não Intolerância Mágica)',()=>{const A=contexto().GA_Ascensao;assert.match(A.desafio(13,0),/Interferência Pessoal/);assert.ok(!/Intolerância/.test(A.desafio(13,0)));});

// Revisão de 25/11/2026: o deus que perde a fama toda continua deus caído
// (o ⚖ não some), e o seletor sabe por que uma dádiva ainda não serve.
test('quem ascendeu e caiu a 0 sem dádivas continua deus caído, não candidato',()=>{const A=contexto().GA_Ascensao;let s=A.novo('Ana','f');
  assert.equal(A.jaAscendeu(s),false,'cadastro não é ascensão');
  Object.assign(s,{caminho:'ascender',feitoAprovado:true});
  s=A.comando(s,{tipo:'busca',id:'b1',nome:'Busca',finalidade:'ascensao',sucessos:3},true);
  s=A.comando(s,{tipo:'ascender'},true);assert.equal(s.status,1);assert.equal(s.ascendeu,true);
  s=A.comando(s,{tipo:'fama',delta:-1},true);assert.equal(s.status,0);assert.equal(s.dadivas.length,0);
  assert.equal(A.jaAscendeu(s),true,'caiu, mas ascendeu');
  s=A.comando(s,{tipo:'fama',delta:1},true);assert.equal(s.status,1,'o ⚖ devolve a fama');
  const antigo=A.novo('Bia');antigo.buscas=[{finalidade:'ascensao',recompensas:2,consumidas:2}];
  assert.equal(A.jaAscendeu(antigo),true,'registro de antes da marca: as 2 recompensas gastas contam');
});
test('motivoDadiva aponta status, natureza, dádiva exigida e repetição',()=>{const A=contexto().GA_Ascensao;const s=A.novo('Ana');s.status=1;
  const livres=A.dadivas.filter(d=>A.motivoDadiva(s,d.id)==='');assert.ok(livres.length>0,'algumas servem logo no status 1');
  const alta=A.dadivas.find(d=>(d.status||1)>1);if(alta)assert.match(A.motivoDadiva(s,alta.id),/status/);
  const comNatureza=A.dadivas.find(d=>d.naturezas&&!d.naturezas.includes(s.natureza));if(comNatureza)assert.match(A.motivoDadiva(s,comNatureza.id),/^só /);
  const unica=A.dadivas.find(d=>!d.repete&&A.motivoDadiva(s,d.id)==='');s.dadivas.push({tipo:unica.id,escolha:'x'});assert.equal(A.motivoDadiva(s,unica.id),'já tem');
});

// Faxina de 25/11/2026 — devoção e guardião (Deuses de Arton, p. 234 e o quadro "Guardiões Divinos").
function ascendido(caminho,extra={}){const A=contexto().GA_Ascensao;let s=A.novo('Ana','f');Object.assign(s,{caminho,feitoAprovado:true,divindade:caminho==='guardiao'?'Espada Viva':''});if(caminho==='guardiao')s.natureza='Item desperto';
  s=A.comando(s,{tipo:'busca',id:'b',nome:'B',finalidade:'ascensao',sucessos:3},true);return {A,s:A.comando(s,{tipo:'ascender',...extra},true)};}
test('ao ascender, perde a devoção anterior e vira devoto de si mesmo; o guardião, do deus que serve',()=>{
  const {s}=ascendido('ascender',{devocaoAnterior:'Khalmyr',concedidos:['Armas da Ambição','Coragem Total']});
  assert.equal(s.natureza,'Mortal ascendido');assert.equal(s.devotoDe,'si mesmo');assert.equal(s.devocaoAnterior,'Khalmyr');
  assert.deepEqual(JSON.parse(JSON.stringify(s.concedidosAnteriores)),['Armas da Ambição','Coragem Total']);
  const g=ascendido('guardiao').s;assert.equal(g.natureza,'Item desperto','o guardião mantém a natureza do deus');assert.equal(g.devotoDe,'Espada Viva');
});
test('só o mestre autoriza, dádiva a dádiva, o que vale para o guardião',()=>{
  let {A,s}=ascendido('guardiao');s=A.comando(s,{tipo:'busca',id:'d',nome:'D',finalidade:'dadiva',sucessos:2},true);s=A.comando(s,{tipo:'dadiva',dadiva:'defesa'},true);
  s=A.comando(s,{tipo:'guardiao-dadiva',indice:0,valor:true},true);assert.equal(s.dadivas[0].paraGuardiao,true);
  s=A.comando(s,{tipo:'guardiao-dadiva',indice:0,valor:false},true);assert.equal(s.dadivas[0].paraGuardiao,false);
  const m=ascendido('ascender').s;m.dadivas.push({tipo:'defesa',escolha:''});
  assert.throws(()=>A.comando(m,{tipo:'guardiao-dadiva',indice:0,valor:true},true),/guardião/);
});
