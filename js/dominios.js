window.GA_Dominios = (()=>{
  'use strict';
  const C=window.GA_CadernoCore,ex=C.exigir;
  const terrenos={'Colinas':[5,5],'Deserto':[4,6],'Floresta':[4,6],'Montanha':[3,7],'Pântano':[3,7],'Planície':[6,4],'Subterrâneo':[2,8]};
  const cortes=[{nome:'Inexistente',custo:0,bonus:-2},{nome:'Pobre',custo:1,bonus:0},{nome:'Comum',custo:3,bonus:0},{nome:'Rica',custo:5,bonus:0}];
  const popularidades=[{nome:'Odiado',bonus:-5},{nome:'Impopular',bonus:-2},{nome:'Tolerado',bonus:0},{nome:'Popular',bonus:1},{nome:'Adorado',bonus:2}];
  const impostos=[null,['1','1d3','1d3+1'],['1d3','1d3+1','2d4'],['1d4','2d4','2d6'],['1d6','2d4+1','2d6+2'],['1d8','2d6','2d8+2'],['1d10','2d6+1','2d10+2'],['1d12','2d8+1','2d12+2']];
  const tropas=[{id:'milicia',nome:'Milícia',requer:'campo-de-treinamento',custo:1,manutencao:.25,poder:1},{id:'bandidos',nome:'Bandidos',requer:'esconderijo',custo:2,manutencao:.5,poder:1},{id:'guardas',nome:'Guardas',requer:'torre-de-guarnicao',custo:2,manutencao:.5,poder:2},{id:'arqueiros',nome:'Arqueiros',requer:'pista-de-arquearia',custo:2,manutencao:.5,poder:2},{id:'caes',nome:'Cães de guerra',requer:'canil',custo:2,manutencao:.25,poder:2},{id:'cavaleiros',nome:'Cavaleiros',requer:'pista-de-justa',custo:6,manutencao:1,poder:5}];
  const eventos=[[2,'Ataque de dragão'],[7,'Invasores'],[11,'Monstro'],[15,'Peste'],[20,'Fenômeno natural'],[22,'Fenômeno mágico'],[26,'Questão diplomática'],[30,'Levante'],[35,'Intriga'],[42,'Questão de justiça'],[52,'Bandidos'],[56,'Corrupção'],[61,'Questão comercial'],[70,'Saqueadores'],[90,'Nenhum evento'],[100,'Regalia']];
  const possui=(d,id)=>d.construcoes.some(c=>c.tipo===id);
  const numero=(v,min=0,max=1000000)=>Number.isFinite(v)&&v>=min&&v<=max;
  function limite(d){const [nivel,potencial]=terrenos[d.terreno];return d.mistico?Math.max(0,potencial+(d.elementoMistico?1:0)-(d.civilizacaoMagica?0:d.nivelComum||0)):Math.min(7,((['Floresta','Subterrâneo'].includes(d.terreno)&&d.racaLigada)?6:nivel)+(d.rioMar?1:0));}
  function novo(v){ex(v.nome?.trim()&&v.regente?.trim(),'Informe nome e regente.');ex(terrenos[v.terreno],'Terreno inválido.');ex(!v.mistico||v.conjurador,'Um domínio místico exige níveis em classe com a habilidade Magias.');const d={id:C.uid(),nome:v.nome,regente:v.regente,terreno:v.terreno,mistico:!!v.mistico,rioMar:!!v.rioMar,elementoMistico:!!v.elementoMistico,racaLigada:!!v.racaLigada,civilizacaoMagica:!!v.civilizacaoMagica,nivelComum:v.nivelComum||0,nivel:v.nivel||1,tesouro:v.tesouro||0,corte:0,popularidade:2,revolta:false,construcoes:[],tropas:[],turnos:[]};ex(C.inteiro(d.nivel,1,limite(d))&&numero(d.tesouro),'Nível ou tesouro incompatível com o terreno.');return d;}
  function popularidade(d,delta){if(d.mistico)return;if(d.popularidade+delta<0)d.revolta=true;d.popularidade=Math.max(0,Math.min(4,d.popularidade+delta));if(d.popularidade>=1)d.revolta=false;}
  function iniciar(d,periodo,dado){ex(!d.turnos.some(t=>t.periodo===periodo),'Este período já tem turno.');ex(!d.turnos.some(t=>t.etapa!=='encerrado'),'Encerre o turno anterior.');ex(periodo?.trim(),'Identifique o período da campanha.');if(d.nivel>=3)ex(C.inteiro(dado,1,100),'Informe 1d100 para o evento.');const mod=(possui(d,'madeireira')?-10:0)+(possui(d,'mina')?-20:0),resultado=Math.max(1,(dado||100)+mod);d.turnos.push({id:C.uid(),periodo,etapa:d.nivel===0?'acoes':'eventos',dado:d.nivel>=3?dado:null,evento:d.nivel>=3?eventos.find(([n])=>resultado<=n)[1]:'Nenhum evento',modEvento:mod,log:[],acoes:[],penalidade:0,camponeses:0});}
  const atual=d=>{const t=d.turnos.at(-1);ex(t&&t.etapa!=='encerrado','Inicie um turno.');return t;};
  function rendimentos(d,faixa){ex(C.inteiro(faixa,0,2),'Faixa de impostos inválida.');const itens=[{id:'impostos',nome:d.mistico?'Renda mística':'Impostos',expressao:d.mistico?String(d.nivel):d.revolta?'0':impostos[d.nivel][faixa]+(faixa===2&&possui(d,'posto-de-pedagio')?'+'+d.nivel:'')}];
    d.construcoes.forEach(c=>{let exp={fazenda:(possui(d,'moinho')?'1d8':'1d6')+(possui(d,'celeiro')?'':'-2'),feira:possui(d,'mercado')?'1d8':'1d4',madeireira:'1d8',mina:'1d12',porto:'1d6'}[c.tipo];if(exp)itens.push({id:c.id,nome:window.GA_CONSTRUCOES_DOMINIO.find(x=>x.id===c.tipo).nome,expressao:exp});});return itens;
  }
  function faixaExpressao(exp){const m=/^(\d+)d(\d+)([+-]\d+)?$/.exec(exp);if(m)return [+m[1]+Number(m[3]||0),+m[1]*+m[2]+Number(m[3]||0)];const soma=exp.split('+').reduce((n,v)=>n+Number(v),0);return [soma,soma];}
  function tributar(d,v){const t=atual(d);ex(t.etapa==='impostos','Resolva os eventos primeiro.');const fontes=rendimentos(d,v.faixa);let ganho=0;for(const f of fontes){const n=v.rendas[f.id], [min,max]=faixaExpressao(f.expressao);ex(C.inteiro(n,min,max),'Resultado inválido para '+f.nome+' ('+f.expressao+').');ganho+=n;}
    ex(numero(v.ajuste,-1000000),'Ajuste de evento inválido.');ex(!v.ajuste||v.motivo?.trim(),'Justifique o ajuste com a consequência do evento.');
    let caixa=d.tesouro+ganho+v.ajuste;ex(caixa>=0,'A perda excede o tesouro disponível. Registre a resolução do evento.');
    const custoCorte=v.pagarCorte?cortes[d.corte].custo:0;const pagas=new Set(v.pagarTropas||[]);ex([...pagas].every(id=>d.tropas.some(u=>u.id===id)),'Unidade inválida.');const manut=d.tropas.filter(u=>pagas.has(u.id)).reduce((n,u)=>n+tropas.find(x=>x.id===u.tipo).manutencao,0);
    ex(caixa>=custoCorte+manut,'Tesouro insuficiente para a manutenção escolhida.');d.tesouro=caixa-custoCorte-manut;
    if(!v.pagarCorte&&d.corte>0){d.corte--;t.penalidade-=5;t.log.push('Corte sem manutenção: cai uma categoria; −5 nas ações deste turno.');}
    const perdidas=d.tropas.length-pagas.size;d.tropas=d.tropas.filter(u=>pagas.has(u.id));if(perdidas)t.log.push(perdidas+' unidade(s) perdida(s) por falta de manutenção.');
    popularidade(d,v.faixa===0?1:v.faixa===2?-1:0);t.impostos={fontes,rendas:v.rendas,ganho,ajuste:v.ajuste,motivo:v.motivo||'',manutencao:custoCorte+manut};t.etapa='acoes';
  }
  function usadas(todos,d,periodo){return todos.filter(x=>x.regente.trim().toLocaleLowerCase()===d.regente.trim().toLocaleLowerCase()).flatMap(x=>x.turnos.filter(t=>t.periodo===periodo)).reduce((n,t)=>n+t.acoes.length,0);}
  function acoesMax(todos,d){return 2+(todos.some(x=>x.regente.trim().toLocaleLowerCase()===d.regente.trim().toLocaleLowerCase()&&x.corte===3)?1:0);}
  function preparar(d,v){const t=atual(d);ex(t.etapa==='acoes','Conclua eventos e impostos primeiro.');let custo=0,cd=0,pericia='',nome=v.tipo;
    ex(d.nivel>0||v.tipo==='criar','Estas terras ainda não são um domínio. Tente a criação novamente.');
    switch(v.tipo){
      case 'criar':ex(d.nivel===0,'O domínio já foi criado.');ex(numero(v.tibares)&&v.tibares>=5000,'A criação exige T$ 5.000, mesmo em caso de falha.');cd=20;pericia='Nobreza';nome='Criar domínio (T$ 5.000)';break;
      case 'governar':ex(d.nivel<limite(d),'O terreno já atingiu o limite.');ex(!t.acoes.some(a=>a.tipo==='governar'),'Governar só pode ser tentado uma vez por turno.');custo=5*(d.nivel+1);cd=20+2*(d.nivel+1);pericia='Nobreza';break;
      case 'aumentar-corte':ex(d.corte<3,'A corte já é rica.');custo=1;cd=20;pericia='Nobreza';break;
      case 'diminuir-corte':ex(d.corte>0,'A corte já é inexistente.');cd=20;pericia='Nobreza';break;
      case 'conselheiro':ex(d.corte>=2,'A corte precisa ser comum ou rica.');ex(v.detalhe?.trim(),'Informe o novo conselheiro.');cd=20;pericia='Nobreza';break;
      case 'construir':{const c=window.GA_CONSTRUCOES_DOMINIO.find(c=>c.id===v.construcao);ex(c,'Escolha uma construção.');ex(d.construcoes.length<3*d.nivel,'Limite de construções: três vezes o nível.');ex(c.requer.every(id=>possui(d,id)),'Falta uma construção pré-requisito.');ex(!d.mistico||['Misticismo','Religião'].includes(c.pericia),'Domínios místicos só aceitam construções de Misticismo ou Religião.');ex(!c.terrenos||c.terrenos.includes(d.terreno)||(possui(d,'povoado-afastado')&&!d.construcoes.some(c=>c.terrenoAlternativo)&&v.terrenoAlternativo),'O terreno não satisfaz o pré-requisito. Um povoado afastado permite uma exceção.');custo=c.custo;pericia=c.pericia;cd=20+d.nivel;nome='Construir '+c.nome;break;}
      case 'convocar':ex(!d.mistico,'Domínios místicos não têm população para convocar.');custo=1;ex(C.inteiro(v.dado,1,6),'Informe 1d6 de unidades.');break;
      case 'extorquir':ex(!d.mistico,'Domínios místicos não cobram impostos.');pericia='Intimidação';cd=20+d.nivel;ex(C.inteiro(v.dado,1,6),'Informe 1d6 de LO.');break;
      case 'festival':ex(!d.mistico,'Domínios místicos não têm popularidade.');custo=1;pericia='Atuação';cd=20+d.nivel;break;
      case 'financas':ex(numero(v.quantidade,.001),'Informe a quantidade de LO.');ex(['entrada','saida'].includes(v.direcao),'Direção inválida.');if(v.direcao==='entrada')ex(numero(v.tibares)&&v.tibares>=v.quantidade*1000,'Saldo pessoal insuficiente.');else custo=v.quantidade;pericia='Nobreza';cd=20;break;
      case 'recrutar':{const tr=tropas.find(x=>x.id===v.tropa);ex(tr&&possui(d,tr.requer),'Falta a construção para recrutar esta tropa.');ex(C.inteiro(v.quantidade,1,d.nivel),'Máximo de unidades por ação igual ao nível.');custo=tr.custo*v.quantidade;break;}
      case 'resolver-evento':ex(v.detalhe?.trim(),'Registre o evento e a perícia indicada no livro.');pericia='Indicada pelo evento';cd=25+2*d.nivel;break;
      default:throw Error('Ação de domínio desconhecida.');
    }
    ex(d.tesouro>=custo,'Tesouro insuficiente: custo '+custo+' LO.');const bonus=v.tipo==='criar'?0:cortes[d.corte].bonus+(d.mistico?0:popularidades[d.popularidade].bonus)+t.penalidade+(v.tipo==='governar'&&possui(d,'banhos-publicos')?5:0);
    if(cd)ex(C.inteiro(v.total,-100,500),'Informe o resultado da perícia antes dos modificadores de domínio.');return {nome,custo,cd,pericia,bonus,total:cd?v.total+bonus:null,sucesso:!cd||v.total+bonus>=cd};
  }
  function agir(todos,d,v){const t=atual(d);ex(usadas(todos,d,t.periodo)<acoesMax(todos,d),'O regente já usou suas ações neste período.');const p=preparar(d,v);d.tesouro-=p.custo;t.acoes.push({...p,tipo:v.tipo,detalhe:v.detalhe||'',em:Date.now()});
    if(v.tipo==='criar')t.log.push('Registrar T$ 5.000 gastos na ficha do regente, mesmo com falha.');
    if(!p.sucesso){if(v.tipo==='financas'&&v.direcao==='saida')d.tesouro+=p.custo;return p;}
    switch(v.tipo){case 'criar':d.nivel=1;break;case 'governar':d.nivel++;break;case 'aumentar-corte':d.corte++;break;case 'diminuir-corte':d.corte--;break;case 'conselheiro':d.conselheiros=v.detalhe;break;
      case 'construir':d.construcoes.push({id:C.uid(),tipo:v.construcao,terrenoAlternativo:!!v.terrenoAlternativo});break;
      case 'convocar':t.camponeses+=v.dado;popularidade(d,-1);break;
      case 'extorquir':d.tesouro+=v.dado+d.nivel;popularidade(d,-1);break;
      case 'festival':popularidade(d,1);break;
      case 'financas':if(v.direcao==='entrada')d.tesouro+=v.quantidade;t.log.push(`Finanças: ${v.quantidade} LO ${v.direcao==='entrada'?'entram':'saem'} do domínio. Registrar ${v.quantidade*1000} T$ ${v.direcao==='entrada'?'gastos':'recebidos'} na ficha do regente.`);break;
      case 'recrutar':for(let n=0;n<v.quantidade;n++)d.tropas.push({id:C.uid(),tipo:v.tropa});break;
    }return p;
  }
  function evento(d,v){const t=atual(d);ex(t.etapa==='eventos','O evento já foi registrado.');ex(v.resolucao?.trim(),'Registre os efeitos do evento ou que não houve evento.');ex(C.inteiro(v.nivel,0,limite(d)),'Nível inválido após o evento.');ex(C.inteiro(v.popularidade,-4,4),'Variação de popularidade inválida.');ex(C.inteiro(v.corte,0,3),'Corte inválida.');ex(C.inteiro(v.modificador,-100,100),'Modificador inválido.');d.nivel=v.nivel;d.corte=v.corte;popularidade(d,v.popularidade);t.penalidade+=v.modificador;t.log.push(v.resolucao);d.construcoes=d.construcoes.filter(c=>!(v.construcoesPerdidas||[]).includes(c.id));d.tropas=d.tropas.filter(u=>!(v.tropasPerdidas||[]).includes(u.id));t.etapa=d.nivel===0?'encerrado':'impostos';}
  function encerrar(d,perda){const t=atual(d);ex(t.etapa==='acoes','Conclua as etapas antes de encerrar.');if(d.revolta&&d.construcoes.length){ex(d.construcoes.some(c=>c.id===perda),'Revolta: sorteie uma construção para destruir.');d.construcoes=d.construcoes.filter(c=>c.id!==perda);t.log.push('Construção destruída pela revolta: '+perda);}t.camponeses=0;t.etapa='encerrado';}
  return {terrenos,cortes,popularidades,impostos,tropas,eventos,novo,limite,iniciar,atual,rendimentos,tributar,usadas,acoesMax,preparar,agir,evento,encerrar,popularidade};
})();
