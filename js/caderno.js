// ═══════════════════════════════════════════════════════════════════
//  CADERNO.JS — O caderno do MESTRE (só no index.html), por campanha.
//  Um hub com sub-abas: 🐎 Viagens · ⏳ Tempo · 🔱 Ascensão de Deus menor.
//
//  Viagens e Tempo são desenhados pelos seus próprios módulos (viagem.js /
//  tempo.js) DENTRO dos painéis daqui — este arquivo só cuida do alternador
//  das sub-abas e da aba de Ascensão.
//
//  Histórico: o Caderno antigo (Sessão, Objetivos, Testes, Obrigações,
//  Domínios, Regras acordadas, Busca e Deuses menores) foi desmontado — a
//  Busca e os Deuses viraram sub-abas das Consultas; o resto saiu. A
//  ascensão foi preservada e re-alojada aqui, sem o antigo gate de "Regras
//  acordadas" e sem o fluxo de "jogador propõe", porque agora é só do mestre.
//  A reconstrução mais profunda da ascensão (revisar a regra; a saída por
//  perda de fama) fica para depois; aqui já há um Remover simples.
// ═══════════════════════════════════════════════════════════════════
(function(){
  'use strict';
  const C=window.GA_CadernoCore,S=window.GA_CadernoStore,A=window.GA_Ascensao,esc=window.GA_esc;
  let erro='';

  // ── alternador das sub-abas do Caderno ───────────────────────────
  function abas(){
    const sec=document.getElementById('caderno');
    const bar=sec&&sec.querySelector('.cad-subtabs');
    if(!bar)return;
    bar.addEventListener('click',e=>{
      const b=e.target.closest('[data-cad-tab]');
      if(!b)return;
      const alvo=b.dataset.cadTab;
      bar.querySelectorAll('[data-cad-tab]').forEach(x=>x.classList.toggle('cr-subtab--ativa',x===b));
      sec.querySelectorAll('[data-cad-panel]').forEach(p=>{p.hidden=(p.dataset.cadPanel!==alvo);});
    });
  }

  // ── Ascensão de Deus menor (Deuses de Arton, pp. 233–237) ────────
  const root=()=>document.getElementById('caderno-ascensao');
  const input=(name,label,value='',type='text',extra='')=>`<label>${esc(label)}<input name="${name}" type="${type}" value="${esc(value)}" ${extra}></label>`;
  const area=(name,label,value='')=>`<label>${esc(label)}<textarea name="${name}" rows="3">${esc(value)}</textarea></label>`;
  const select=(name,label,values,value='')=>`<label>${esc(label)}<select name="${name}">${values.map(v=>{const [k,n]=Array.isArray(v)?v:[v,v];return `<option value="${esc(k)}" ${k===value?'selected':''}>${esc(n)}</option>`;}).join('')}</select></label>`;
  const check=(name,label,checked=false)=>`<label class="ga-check"><input type="checkbox" name="${name}" ${checked?'checked':''}> ${esc(label)}</label>`;
  const btn=(acao,label,id='')=>`<button type="button" data-cad="${acao}" data-id="${esc(id)}">${esc(label)}</button>`;
  const form=(acao,body,label='Salvar',id='')=>`<form data-cad-form="${acao}" data-id="${esc(id)}"><div class="ga-campos">${body}</div><button>${esc(label)}</button></form>`;
  const artigo=(title,body)=>`<article class="ga-cad-card"><h3>${esc(title)}</h3>${body}</article>`;
  const vazio=msg=>`<p class="ga-vazio">${esc(msg)}</p>`;
  const linhas=s=>`<div class="ga-texto">${esc(s)}</div>`;
  const fichas=()=>window.GA_Ficha?.referenciasCaderno?.()||window.GA_Ficha?.minhasFichas()||[];
  function escolhaFicha(){return select('fichaId','Ficha',[['','Selecione uma ficha'],...fichas().map(f=>[f.id,f.nome||'Sem nome'])]);}
  const status=(s)=>s===0?'Candidato — ainda não ascendeu':'Status divino '+s;

  function ascensao(d){return `<p>Deuses de Arton, pp. 233–237. O feito deve acontecer em jogo e ser aprovado por você. Duas recompensas de buscas dedicadas permitem ascender; cada aumento de status exige outras duas. Cada dádiva usa uma recompensa própria, até duas dádivas por status. Seus benefícios não se acumulam com os de bases, domínios e negócios.</p>`+form('novo-divino',escolhaFicha()+input('nome','Nome do candidato'),'Registrar candidato')+(d.ascensoes.length?'':vazio('Nenhum candidato registrado ainda.'))+d.ascensoes.map(s=>artigo(s.nome,`<p><strong>${status(s.status)}</strong> • ${s.caminho==='indeciso'?'Sem decisão sobre ascender':s.caminho==='guardiao'?'Guardião de '+esc(s.divindade):'Ascensão própria'} • ${btn('remover-divino','Remover',s.id)}</p>${s.status===0&&!s.feitoAprovado?form('editar-divino',select('caminho','Decisão',[['indeciso','Ainda não decidiu'],['ascender','Tornar-se deus menor'],['guardiao','Ser guardião de uma divindade']],s.caminho)+select('natureza','Natureza da divindade',A.naturezas,s.natureza)+input('divindade','Divindade vinculada ao guardião',s.divindade)+input('conceito','Conceito',s.conceito)+area('feito','Feito realizado em jogo',s.feito),'Salvar candidatura',s.id):linhas(s.conceito+'\n'+s.feito)}
      <p>Feito ${s.feitoAprovado?'aprovado':'aguardando aprovação'}.</p>${!s.feitoAprovado?btn('aprovar-feito','Aprovar feito realizado',s.id):''}
      <p>Recompensas disponíveis: ascensão ${A.saldo(s,'ascensao')} · evolução ${A.saldo(s,'evolucao')} · dádivas ${A.saldo(s,'dadiva')}.</p>
      ${s.feitoAprovado?form('busca-divina',input('nome','Nome da busca')+select('finalidade','Finalidade',s.status===0?[['ascensao','Ascender']]:[['evolucao','Elevar status'],['dadiva','Conquistar dádiva']])+input('sucessos','Sucessos nos três testes',2,'number','min="0" max="3" step="1"'),'Registrar resultado da busca',s.id):''}
      ${s.feitoAprovado?btn(s.status===0?'ascender':'evoluir',s.status===0?'Consumir duas recompensas e ascender':'Consumir duas recompensas e elevar status',s.id):''}
      <details><summary>Histórico de buscas (${s.buscas.length})</summary>${s.buscas.map(b=>`<p>${esc(b.nome)} — ${esc(b.finalidade)}: ${b.recompensas} recompensa(s), ${b.consumidas} consumida(s).</p>`).join('')}</details>
      ${s.status?`<h4>Dádivas (${s.dadivas.length}/${2*s.status})</h4>${s.dadivas.map(g=>{const a=A.dadivas.find(x=>x.id===g.tipo);return `<details><summary>${esc(a.nome)} ${esc(g.escolha)}</summary>${linhas(a.texto)}<small>Deuses de Arton, p. ${a.pagina}</small></details>`;}).join('')}${form('paladinos',check('aceitaPaladinos','A divindade aceita paladinos',s.aceitaPaladinos)+check('paladinoNoGrupo','Já há um paladino único no grupo',s.paladinoNoGrupo),'Atualizar elegibilidade',s.id)+form('dadiva',select('dadiva','Dádiva',A.dadivas.map(x=>[x.id,x.nome]))+input('escolha','Escolha exigida: perícia, atributo ou magia'),'Conquistar dádiva',s.id)}
      <h4>Desafios divinos</h4>${s.desafios.map(x=>`<div class="ga-cad-card"><strong>${esc(x.periodo)} — ${x.dado} + ${x.status} = ${x.total}</strong>${linhas(A.desafio(x.total,x.status))}${x.resolvido?linhas(x.resultado):form('resolver-desafio',input('periodo','Período',x.periodo,'text','readonly')+area('resultado','Resolução em jogo')+(x.total>=14?check('reduzirStatus','Falhou nos testes: reduzir status permanentemente'):''),'Registrar resolução',s.id)}</div>`).join('')}${form('desafio-divino',input('periodo','Tempo entre aventuras')+input('dado','Resultado de 1d10',1,'number','min="1" max="10"'),'Registrar desafio',s.id)}`:''}`)).join('');}

  function render(){const r=root();if(!r)return;const est=S.estado(),d=est.dados;r.innerHTML=`<p class="ga-cad-erro" role="alert" ${erro||est.erro?'':'hidden'}>${esc(erro||est.erro)}</p>`+ascensao(d);}

  function divino(d,id,a){const i=d.ascensoes.findIndex(s=>s.id===id);C.exigir(i>=0,'Candidatura não encontrada.');d.ascensoes[i]=A.comando(d.ascensoes[i],a,true);}

  function clicar(e){const b=e.target.closest('[data-cad]');if(!b)return;const a=b.dataset.cad,id=b.dataset.id;erro='';try{
    if(a==='remover-divino'){if(!confirm('Remover esta ascensão do caderno? Não dá para desfazer.'))return;S.editar(d=>{d.ascensoes=d.ascensoes.filter(s=>s.id!==id);});return;}
    S.editar(d=>{
      if(['aprovar-feito','ascender','evoluir'].includes(a))divino(d,id,{tipo:a==='aprovar-feito'?'feito':a});
      else throw Error('Ação indisponível.');
    });
  }catch(err){erro=err.message;render();}}

  function enviar(e){const f=e.target.closest('form[data-cad-form]');if(!f)return;e.preventDefault();const acao=f.dataset.cadForm,id=f.dataset.id,v=Object.fromEntries(new FormData(f));erro='';try{
    S.editar(d=>{
      if(acao==='novo-divino'){C.exigir(v.nome.trim()&&v.fichaId,'Escolha ficha e nome.');C.exigir(!d.ascensoes.some(s=>s.fichaId===v.fichaId),'Esta ficha já possui candidatura.');d.ascensoes.push(A.novo(v.nome,v.fichaId));}
      else if(acao==='editar-divino'){const s=d.ascensoes.find(s=>s.id===id);C.exigir(s.status===0&&!s.feitoAprovado,'Feito aprovado não pode ser reescrito.');for(const k of ['caminho','natureza','divindade','conceito','feito'])s[k]=v[k];if(s.caminho==='ascender')s.natureza='Mortal ascendido';}
      else if(acao==='busca-divina')divino(d,id,{tipo:'busca',id:C.uid(),nome:v.nome,finalidade:v.finalidade,sucessos:+v.sucessos});
      else if(acao==='dadiva')divino(d,id,{tipo:'dadiva',dadiva:v.dadiva,escolha:v.escolha});
      else if(acao==='paladinos'){const s=d.ascensoes.find(s=>s.id===id);s.aceitaPaladinos=!!v.aceitaPaladinos;s.paladinoNoGrupo=!!v.paladinoNoGrupo;}
      else if(acao==='desafio-divino')divino(d,id,{tipo:'desafio',periodo:v.periodo,dado:+v.dado});
      else if(acao==='resolver-desafio')divino(d,id,{tipo:'resolver',periodo:v.periodo,resultado:v.resultado,reduzirStatus:!!v.reduzirStatus});
      else throw Error('Formulário indisponível.');
    });
  }catch(err){erro=err.message;const r=root(),alvo=r&&r.querySelector('.ga-cad-erro');if(alvo){alvo.hidden=false;alvo.textContent=erro;alvo.scrollIntoView({block:'nearest'});}}}

  function init(){const sec=document.getElementById('caderno');if(!sec)return;abas();const r=root();if(r){r.addEventListener('click',clicar);r.addEventListener('submit',enviar);}S.aoMudar(render);render();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
