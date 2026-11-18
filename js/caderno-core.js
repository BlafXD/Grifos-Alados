// Regras de acompanhamento. Resultados são registrados pelo mestre; não se
// aplicam modificadores silenciosos às fichas nem se inventam efeitos de jogo.
window.GA_CadernoCore = (() => {
  'use strict';
  const copiar=x=>JSON.parse(JSON.stringify(x));
  const exigir=(v,m)=>{if(!v)throw Error(m);};
  const uid=()=>crypto.randomUUID();
  const inteiro=(n,min,max)=>Number.isSafeInteger(n)&&n>=min&&n<=max;
  const opcionais=[
    ['objetivos','Objetivos Heroicos','Heróis de Arton, pp. 292–293'],
    ['dominios','Domínios e regência','Heróis de Arton, pp. 314–327'],
    ['inteligentes','Itens mágicos inteligentes','Heróis de Arton, pp. 269–270'],
    ['maldicoes','Itens amaldiçoados','Heróis de Arton, pp. 271–274'],
    ['ascensao','Jogar como um deus menor','Deuses de Arton, pp. 233–237'],
    ['buscasOusadas','Buscas ousadas','Tormenta20, tempo entre aventuras'],
    ['testesAbertos','Testes estendidos abertos','Tormenta20, p. 223'],
    ['testesCumulativos','Testes estendidos cumulativos','Tormenta20, p. 223']
  ];
  const objetivos=[
    ['Desafio','+2d4 PM temporários.','Fatigado','+1 em dois atributos diferentes.'],
    ['Descoberta','+2 em testes de Inteligência e perícias desse atributo.','Frustrado','+1 em Inteligência e um poder geral.'],
    ['Liderança','+2 em testes de Carisma e perícias desse atributo.','Alquebrado','+1 em Carisma e uma estrutura ou equivalente definido pelo mestre.'],
    ['Obra','+2 em resistências e +1d4 PM temporários.','Abalado','+1 em Constituição e a estrutura construída.'],
    ['Riqueza','Custo de habilidades reduzido em 1 PM.','Alquebrado','Escolha uma habilidade: custo reduzido em 2 PM (cumulativo). Pode gastar o dinheiro guardado.'],
    ['Salvação','+2 na Defesa.','Vulnerável','+2 na Defesa e resistências; parceiro escolhido pelo mestre.'],
    ['Vingança','Uma vez por rodada, +5 em uma rolagem de dano.','Fraco','+1 em Força e um poder de combate.']
  ].map(([nome,beneficio,penalidade,conclusao])=>({nome,beneficio,penalidade,conclusao}));
  function novo(){return {versao:1,revisao:0,regras:{},acordos:[],referencias:[],ascensoes:[],objetivos:[],testes:[],perigos:[],lembretes:[],itens:[],dominios:[],sessao:'',aventura:'',cena:''};}
  function novoTeste(nome,meta,cd,aberto=false,cumulativo=false){exigir([3,5,7].includes(meta),'Escolha 3, 5 ou 7 sucessos.');exigir(inteiro(cd,0,100),'CD inválida.');return {id:uid(),nome,meta,cd,aberto,cumulativo,rodada:1,estado:'em curso',rolagens:[]};}
  function teste(t,a){const s=copiar(t);exigir(!['sucesso','falha'].includes(s.estado),'Este teste já terminou.');
    if(a.tipo==='pausar'){s.estado=s.estado==='pausado'?'em curso':'pausado';return s;}
    exigir(s.estado==='em curso','Retome o teste antes de registrar ações.');
    if(a.tipo==='rodada'){s.rodada++;return s;}
    exigir(a.tipo==='rolar','Ação inválida.');exigir(a.personagem?.trim()&&a.pericia?.trim(),'Informe personagem e perícia.');exigir(inteiro(a.total,-100,500),'Resultado inválido.');
    exigir(!s.rolagens.some(r=>r.rodada===s.rodada&&r.personagem===a.personagem),'Este personagem já agiu nesta rodada.');
    const usadas=s.rolagens.map(r=>r.pericia.toLocaleLowerCase('pt-BR'));
    const pericia=a.pericia.trim().toLocaleLowerCase('pt-BR');
    const jaAjudou=s.rolagens.some(r=>r.ajuda&&r.pericia.trim().toLocaleLowerCase('pt-BR')===pericia);
    exigir(!jaAjudou&&(!(s.aberto||a.ajuda)||!usadas.includes(pericia)),'Esta perícia já foi usada e não pode ser reutilizada, inclusive para ajudar.');
    const cd=s.cd+(s.cumulativo?2*s.rolagens.filter(r=>!r.ajuda).length:0);
    s.rolagens.push({personagem:a.personagem,pericia:a.pericia,total:a.total,ajuda:!!a.ajuda,cd:a.ajuda?null:cd,sucesso:a.ajuda?null:a.total>=cd,rodada:s.rodada});
    const cont=contarTeste(s);if(cont.falhas>=3)s.estado='falha';else if(cont.sucessos>=s.meta)s.estado='sucesso';return s;
  }
  function contarTeste(t){return {sucessos:t.rolagens.filter(r=>!r.ajuda&&r.sucesso).length,falhas:t.rolagens.filter(r=>!r.ajuda&&!r.sucesso).length};}
  function novoObjetivo(fichaId,personagem,categoria,descricao){exigir(objetivos.some(o=>o.nome===categoria),'Categoria inválida.');exigir(fichaId&&descricao.trim(),'Escolha uma ficha e descreva seu objetivo.');return {id:uid(),fichaId,personagem,categoria,descricao,estado:'proposto',usos:[],penalidades:[],eventos:[]};}
  function objetivo(o,a,mestre){const s=copiar(o);exigir(mestre,'O mestre precisa aprovar esta decisão.');
    if(a.tipo==='aprovar'){exigir(s.estado==='proposto','Objetivo já decidido.');s.estado='ativo';}
    else {exigir(s.estado==='ativo','Objetivo não está ativo.');exigir(a.aventura?.trim()&&a.cena?.trim(),'Identifique a aventura e a cena.');
      if(a.tipo==='beneficio'){exigir(!s.usos.some(u=>u.aventura===a.aventura),'O benefício já foi usado nesta aventura.');exigir(a.relacionada===true,'A cena precisa estar diretamente ligada ao objetivo.');s.usos.push({aventura:a.aventura,cena:a.cena});}
      else if(a.tipo==='afastamento'){exigir(a.justificativa?.trim(),'Registre como a cena afastou o personagem do objetivo.');s.penalidades.push({aventura:a.aventura,cena:a.cena,motivo:a.justificativa});}
      else if(a.tipo==='concluir')s.estado='concluído';
      else if(a.tipo==='abandonar'){s.estado='abandonado';s.penalidades.push({aventura:a.aventura,cena:a.cena,motivo:'Abandono: penalidade por uma aventura.'});}
      else throw Error('Decisão inválida.');
    }s.eventos.push({tipo:a.tipo,em:Date.now(),aventura:a.aventura||'',cena:a.cena||''});return s;
  }
  const graus={menor:{nivel:9,ego:5},medio:{nivel:13,ego:10},maior:{nivel:17,ego:15},artefato:{nivel:20,ego:20}};
  function inteligente(i){const g=graus[i.grau];exigir(g,'Categoria de item inválida.');for(const a of ['int','sab','car'])exigir(inteiro(i[a],-10,30),'Atributo inválido.');exigir(['empatia','fala','telepatia'].includes(i.comunicacao),'Comunicação inválida.');const soma=i.int+i.sab+i.car;return {nivel:g.nivel,pm:g.nivel+soma,ego:g.ego+soma+(i.menores||[]).length+2*(i.maiores||[]).length+({empatia:0,fala:1,telepatia:2}[i.comunicacao])};}
  function itemAcao(i,a){const s=copiar(i),calc=inteligente(s.inteligente);const atual=Number.isFinite(s.pm)?s.pm:calc.pm;
    if(a.tipo==='gastar'){exigir(inteiro(a.custo,1,1000),'Custo em PM inválido.');const custo=a.custo*(a.usuario?2:1);exigir(atual>=custo,'O item não tem PM suficientes.');s.pm=atual-custo;}
    else if(a.tipo==='descansar'){exigir(a.oitoHoras===true,'São necessárias oito horas inerte.');s.pm=Math.min(calc.pm,atual+calc.nivel);}
    else if(a.tipo==='conflito'){exigir(inteiro(a.total,-100,500),'Resultado inválido.');const falta=calc.ego-a.total;s.conflitos=s.conflitos||[];s.conflitos.push({em:Date.now(),total:a.total,cd:calc.ego,resultado:falta<=0?'A ação é permitida.':falta>=10?'O item controla o usuário por um dia.':'A ação é impedida; só pode tentar novamente após um dia.'});}
    else throw Error('Ação inválida.');return s;
  }
  // Lista positiva: nenhuma propriedade secreta do item atravessa esta fronteira.
  function itemPublico(i){const p={id:i.id,nome:i.nome,portador:i.portador||'',fichaId:i.fichaId||'',inventarioId:i.inventarioId||'',descricao:i.descricao||'',revelacoes:(i.revelacoes||[]).filter(r=>r.publicada).map(r=>({id:r.id,texto:r.texto}))};if(i.inteligenteRevelado&&i.inteligente){p.inteligente=Object.fromEntries(['grau','int','sab','car','sentidos','comunicacao','menores','maiores','atributoChave','atributoUsuario'].filter(k=>i.inteligente[k]!==undefined).map(k=>[k,copiar(i.inteligente[k])]));p.pm=i.pm??inteligente(i.inteligente).pm;}return p;}
  function publico(s){return {versao:1,revisao:s.revisao,regras:copiar(s.regras),acordos:copiar(s.acordos),referencias:copiar(s.referencias),ascensoes:copiar(s.ascensoes),objetivos:copiar(s.objetivos),testes:copiar(s.testes),perigos:s.perigos.map(p=>({id:p.id,chave:p.chave,nome:p.nome,rodada:p.rodada,estado:p.estado,marcadores:copiar(p.marcadores),log:copiar(p.log)})),lembretes:copiar(s.lembretes),itens:s.itens.filter(i=>i.publicado).map(itemPublico),dominios:copiar(s.dominios),sessao:s.sessao,aventura:s.aventura,cena:s.cena};}
  return {novo,copiar,exigir,inteiro,uid,opcionais,objetivos,novoTeste,teste,contarTeste,novoObjetivo,objetivo,graus,inteligente,itemAcao,itemPublico,publico};
})();
