// Deuses de Arton v1.1, pp. 229–237. Progressão de PJ ou guardião, não de NPC.
window.GA_Ascensao = (() => {
  'use strict';
  const naturezas=['Mortal ascendido','Conceito vivo','Entidade primordial','Dragão-Real','Item desperto'];
  const dadivas=[
    {id:'conhecimento',nome:'Ampliar Conhecimento',naturezas:['Conceito vivo'],texto:'Treinado em até três perícias associadas ao conceito, aprovadas pelo mestre.',pagina:234},
    {id:'atributo',nome:'Aprimoramento Divino',status:2,texto:'+1 em um atributo.',pagina:234},
    {id:'aptidao',nome:'Aptidão Divina',naturezas:['Entidade primordial','Dragão-Real','Mortal ascendido'],repete:true,texto:'+5 em uma perícia ligada ao conceito, exceto Luta ou Pontaria. Repetível para perícias diferentes.',pagina:234},
    {id:'clero',nome:'Clero',requer:'paroquia',texto:'Sacerdote parceiro adepto, magivocador ou médico: iniciante; veterano no status 3; mestre no 5. +2 em Religião e em outra perícia do conceito, exceto Luta ou Pontaria. Reposição: uma semana.',pagina:235},
    {id:'defesa',nome:'Defesa Divina',texto:'+2 na Defesa.',pagina:235},
    {id:'essencia',nome:'Essência Divina',texto:'+1 PM por status divino.',pagina:235},
    {id:'imortal',nome:'Imortal',requer:'semiimortal',texto:'Imune a cansaço, efeitos metabólicos e veneno. Sem longevidade máxima; ainda pode morrer violentamente ou por razões excepcionais.',pagina:235},
    {id:'intuicao',nome:'Intuição Divina',texto:'Soma o status divino em Intuição. Ao ficar surpreendido, pode testar pressentimento para ignorar a condição.',pagina:235},
    {id:'manifestacao',nome:'Manifestação Divina',texto:'1 PM e ação de movimento: +5 em um teste de perícia de uma criatura ou +1 nos testes de uma perícia por uma cena. Pode encantar um item com +1 em determinados testes por uma cena. Pequenas manifestações narrativas do conceito dependem do mestre.',pagina:235},
    {id:'milagre',nome:'Milagre',repete:true,texto:'Aprende uma magia divina de 1º círculo (Sab). Ao escolher novamente, a nova magia pode ter círculo até o número de Milagres, limitado pelo status divino. Também satisfaz pré-requisitos desse círculo.',pagina:236},
    {id:'paladino',nome:'Paladino Único',texto:'Exige aceitar paladinos e nenhum membro do grupo ser o paladino único. Parceiro iniciante; veterano no status 4; mestre no 5. Reposição: uma semana de oração.',pagina:236},
    {id:'paroquia',nome:'Paróquia',texto:'Devotos fervorosos como parceiro; descanso uma categoria acima e auxílio cotidiano. Iniciantes; veteranos no status 2; mestres no 3. Reposição: uma semana de pregação.',pagina:236},
    {id:'presenca',nome:'Presença Divina',texto:'+5 em Diplomacia e Intimidação contra treinados em Religião ou devotos. No início da cena, 1 PM permite testar uma dessas perícias com essas pessoas.',pagina:236},
    {id:'resiliencia',nome:'Resiliência Divina',texto:'+2 em testes de resistência.',pagina:236},
    {id:'semiimortal',nome:'Semi-imortal',naturezas:['Entidade primordial','Dragão-Real','Mortal ascendido'],texto:'Bônus igual ao status divino contra cansaço, efeitos metabólicos e veneno.',pagina:236},
    {id:'vigor',nome:'Vigor Divino',texto:'+10 PV por status divino.',pagina:236}
  ];
  const clonar=x=>JSON.parse(JSON.stringify(x));
  const normal=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim().toLowerCase();
  function periciaValida(nome){return (window.GA_FichaData?.PERICIAS||[]).some(p=>normal(p.nome)===normal(nome))||/^oficio\s*\([^)]+\)$/i.test(normal(nome));}
  const exigir=(ok,msg)=>{if(!ok)throw new Error(msg);};
  function novo(nome,fichaId=''){return {id:crypto.randomUUID(),nome,fichaId,caminho:'indeciso',natureza:'Mortal ascendido',divindade:'',conceito:'',feito:'',feitoAprovado:false,status:0,buscas:[],dadivas:[],desafios:[],aceitaPaladinos:false,paladinoNoGrupo:false};}
  function saldo(s,tipo){return s.buscas.filter(b=>b.finalidade===tipo).reduce((n,b)=>n+b.recompensas-(b.consumidas||0),0);}
  function consumir(s,tipo,q){for(const b of s.buscas.filter(b=>b.finalidade===tipo)){const n=Math.min(q,b.recompensas-(b.consumidas||0));b.consumidas=(b.consumidas||0)+n;q-=n;if(!q)break;}}
  function validarDadiva(s,id,escolha){const d=dadivas.find(x=>x.id===id);exigir(d,'Dádiva inexistente.');exigir(s.status>=1,'Ascenda antes de conquistar dádivas.');exigir(s.dadivas.length<2*s.status,'O limite é duas dádivas por status divino.');exigir(s.status>=(d.status||1),'Status divino insuficiente.');exigir(!d.naturezas||d.naturezas.includes(s.natureza),'Esta natureza não satisfaz o pré-requisito.');exigir(!d.requer||s.dadivas.some(x=>x.tipo===d.requer),'Falta a dádiva pré-requisito.');exigir(d.repete||!s.dadivas.some(x=>x.tipo===id),'Esta dádiva não pode ser escolhida novamente.');
    if(id==='aptidao'){exigir(escolha&&!/^(luta|pontaria)$/i.test(escolha),'Escolha uma perícia do conceito, exceto Luta ou Pontaria.');exigir(!s.dadivas.some(x=>x.tipo===id&&x.escolha.toLowerCase()===escolha.toLowerCase()),'Esta perícia já recebeu Aptidão Divina.');}
    if(id==='milagre'||id==='atributo'||id==='conhecimento')exigir(escolha,'Registre a escolha aprovada pelo mestre.');
    if(id==='aptidao')exigir(periciaValida(escolha),'Escolha uma perícia oficial. Para Ofício, informe a especialidade entre parênteses.');
    if(id==='atributo')exigir(['forca','destreza','constituicao','inteligencia','sabedoria','carisma'].includes(normal(escolha)),'Escolha um dos seis atributos.');
    if(id==='conhecimento'){const nomes=escolha.split(',').map(x=>x.trim());exigir(nomes.length>=1&&nomes.length<=3&&nomes.every(periciaValida)&&new Set(nomes.map(normal)).size===nomes.length,'Escolha até três perícias oficiais diferentes, separadas por vírgulas.');}
    if(id==='milagre'){const magia=(window.GA_MAGIAS||[]).find(m=>normal(m.nome)===normal(escolha)||m.id===escolha),max=Math.min(s.status,s.dadivas.filter(d=>d.tipo==='milagre').length+1);exigir(magia&&magia.listas?.includes('divina')&&magia.circulo<=max,'Escolha uma magia divina de até '+max+'º círculo.');exigir(!s.dadivas.some(d=>d.tipo==='milagre'&&normal(d.escolha)===normal(magia.nome)),'Esta magia já foi aprendida por Milagre.');}
    if(id==='paladino')exigir(s.aceitaPaladinos&&!s.paladinoNoGrupo,'Exige aceitar paladinos e não ter um paladino único no grupo.');return d;
  }
  function comando(estado,acao,mestre){const s=clonar(estado);exigir(mestre,'Esta decisão precisa da aprovação do mestre.');
    switch(acao.tipo){
      case 'feito':exigir(['ascender','guardiao'].includes(s.caminho),'O personagem ainda não decidiu trilhar esse caminho.');exigir(s.feito.trim()&&s.conceito.trim(),'Registre o feito em jogo e seu conceito.');s.feitoAprovado=true;break;
      case 'busca':{
        exigir(s.feitoAprovado,'O feito precisa ser aprovado primeiro.');exigir(['ascensao','evolucao','dadiva'].includes(acao.finalidade),'Finalidade inválida.');exigir(acao.finalidade==='ascensao'?s.status===0:s.status>=1,'A finalidade não corresponde ao estágio atual.');
        exigir(acao.id&&!s.buscas.some(b=>b.id===acao.id),'Esta busca já foi registrada.');exigir(Number.isInteger(acao.sucessos)&&acao.sucessos>=0&&acao.sucessos<=3,'Informe os sucessos dos três testes.');
        const recompensas=acao.sucessos>=2?acao.sucessos-1+(acao.ousada?1:0):0;
        s.buscas.push({id:acao.id,nome:acao.nome||'Busca',finalidade:acao.finalidade,sucessos:acao.sucessos,ousada:!!acao.ousada,recompensas,castigos:acao.sucessos===0?1:0,consumidas:0,em:Date.now()});break;
      }
      case 'ascender':exigir(s.status===0&&s.feitoAprovado&&saldo(s,'ascensao')>=2,'A ascensão exige feito aprovado e duas recompensas de buscas.');exigir(s.caminho!=='indeciso','Escolha o caminho.');exigir(naturezas.includes(s.natureza),'Natureza inválida.');if(s.caminho==='ascender')s.natureza='Mortal ascendido';exigir(s.caminho!=='guardiao'||s.divindade.trim(),'Registre o deus vinculado ao guardião.');consumir(s,'ascensao',2);s.status=1;s.ascendeu=true;
        // DEVOÇÃO (Deuses de Arton, p. 234): quem ascende perde a devoção anterior e
        // vira devoto de si mesmo; o guardião vira devoto do deus menor que serve.
        // Fica registrado de quem ele era devoto e o que dependia disso — a ficha não
        // é tocada daqui: quem revisa os poderes concedidos é o mestre, na ficha.
        s.devocaoAnterior=String(acao.devocaoAnterior||'').trim().slice(0,120);
        s.concedidosAnteriores=(Array.isArray(acao.concedidos)?acao.concedidos:[]).map(x=>String(x).slice(0,80)).filter(Boolean).slice(0,40);
        s.devotoDe=s.caminho==='guardiao'?s.divindade.trim():'si mesmo';break;
      case 'evoluir':exigir(s.status>=1&&s.status<5,'A progressão de deus menor termina no status 5.');exigir(saldo(s,'evolucao')>=2,'São necessárias duas recompensas para subir um status.');consumir(s,'evolucao',2);s.status++;break;
      case 'dadiva':validarDadiva(s,acao.dadiva,(acao.escolha||'').trim());exigir(saldo(s,'dadiva')>=1,'A dádiva exige uma recompensa dedicada a ela.');consumir(s,'dadiva',1);s.dadivas.push({tipo:acao.dadiva,escolha:(acao.escolha||'').trim(),em:Date.now()});break;
      case 'desafio':exigir(s.status>=1,'Desafios divinos começam após ascender.');exigir(acao.periodo&&!s.desafios.some(d=>d.periodo===acao.periodo),'Já existe um desafio neste tempo entre aventuras.');exigir(Number.isInteger(acao.dado)&&acao.dado>=1&&acao.dado<=10,'Use um resultado de 1d10.');s.desafios.push({periodo:acao.periodo,dado:acao.dado,status:s.status,total:acao.dado+s.status,resolvido:false,resultado:''});break;
      case 'resolver':{const d=s.desafios.find(d=>d.periodo===acao.periodo);exigir(d&&!d.resolvido,'Desafio inexistente ou já resolvido.');exigir(acao.resultado?.trim(),'Registre a resolução.');d.resolvido=true;d.resultado=acao.resultado;if(acao.reduzirStatus){exigir(d.total>=14,'Este desafio não reduz permanentemente o status.');s.status=Math.max(0,s.status-1);}break;}
      // Ajustes do MESTRE (perda de fama e remanejo de poderes). A fé de um
      // deus menor é narrativa — quem a mede é o mestre (Deuses de Arton, p.
      // 237). Perder fama NÃO descarta dádivas sozinho: o mestre remove ou
      // troca à mão o que não cabe mais na fama atual.
      case 'fama':exigir(acao.delta===1||acao.delta===-1,'Ajuste de fama inválido.');{const n=s.status+acao.delta;exigir(n>=0&&n<=5,'A fama (status divino) vai de 0 a 5.');s.status=n;}break;
      case 'remover-dadiva':{const i=acao.indice;exigir(Number.isInteger(i)&&s.dadivas[i],'Dádiva não encontrada.');s.dadivas.splice(i,1);}break;
      case 'trocar-dadiva':{const i=acao.indice;exigir(Number.isInteger(i)&&s.dadivas[i],'Dádiva a trocar não encontrada.');const antiga=s.dadivas[i];s.dadivas.splice(i,1);const escolha=(acao.escolha||'').trim();validarDadiva(s,acao.dadiva,escolha);s.dadivas.splice(i,0,{tipo:acao.dadiva,escolha,em:Date.now(),trocadaDe:antiga.tipo});}break;
      // GUARDIÃO (quadro "Guardiões Divinos", p. 234): as dádivas são do deus; o
      // guardião recebe as que, a critério do mestre, possam se aplicar a ele —
      // e fica escrito quais o mestre autorizou.
      case 'guardiao-dadiva':{exigir(s.caminho==='guardiao','Só um guardião divino recebe dádivas do deus que serve.');const i=acao.indice;exigir(Number.isInteger(i)&&s.dadivas[i],'Dádiva não encontrada.');s.dadivas[i].paraGuardiao=!!acao.valor;}break;
      default:throw new Error('Ação desconhecida.');
    }return s;
  }
  function desafio(total,status){if(total<=6)return 'Nenhum desafio.';if(total<=8)return 'Súplicas dos Fiéis: Religião ou perícia do conceito aprovada, CD '+(20+2*status)+'. Falha: PM máximos −1 por nível durante a próxima aventura.';if(total===9)return 'Ladainha Incessante: fatigado na próxima aventura, mesmo se imune.';if(total===10)return 'Reza Torta: frustrado na próxima aventura, mesmo se imune.';if(total===11)return 'Inquisidores: status divino reduzido em 1 durante a próxima aventura.';if(total===12)return 'Visita Extraplanar: um espírito de ND equivalente ao grupo aparece na próxima aventura.';if(total===13)return 'Interferência Pessoal: um item mágico escolhido aleatoriamente é destruído.';return 'Maldição de Deus Maior: três testes de perícias diferentes; exige três sucessos. Falha reduz o status em 1 e deixa alquebrado na próxima aventura.';}
  // JÁ FOI DEUS? (revisão de 25/11/2026) Quem ascendeu e perdeu a fama até
  // 0 continua sendo um deus caído, não um candidato: o ⚖ precisa continuar
  // ali para devolver a fama. A marca nasce no "ascender"; para os registros
  // de antes dela, vale ter gastado as duas recompensas de ascensão.
  function jaAscendeu(s){return !!(s&&(s.ascendeu||s.status>=1||(s.dadivas||[]).length>0||(s.buscas||[]).filter(b=>b.finalidade==='ascensao').reduce((n,b)=>n+(b.consumidas||0),0)>=2));}
  // Por que esta dádiva AINDA não serve para este deus — '' = serve. Só os
  // pré-requisitos dela (status, natureza, dádiva exigida, repetição); a
  // escolha (perícia/atributo) e o teto de 2×status ficam com o validarDadiva.
  function motivoDadiva(s,id){const d=dadivas.find(x=>x.id===id);if(!d)return 'inexistente';if((s.status||0)<(d.status||1))return 'pede status '+(d.status||1);if(d.naturezas&&!d.naturezas.includes(s.natureza))return 'só '+d.naturezas.join(' ou ');if(d.requer&&!(s.dadivas||[]).some(x=>x.tipo===d.requer)){const r=dadivas.find(x=>x.id===d.requer);return 'pede '+(r?r.nome:d.requer);}if(!d.repete&&(s.dadivas||[]).some(x=>x.tipo===id))return 'já tem';return '';}
  return {novo,comando,saldo,validarDadiva,dadivas,naturezas,desafio,jaAscendeu,motivoDadiva};
})();
