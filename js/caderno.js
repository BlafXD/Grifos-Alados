// ═══════════════════════════════════════════════════════════════════
//  CADERNO.JS — O caderno do MESTRE (só no index.html), por campanha.
//  Um hub com sub-abas: 🐎 Viagens · ⏳ Tempo · 🔱 Ascensão de Deus menor.
//
//  Viagens e Tempo são desenhados pelos seus próprios módulos (viagem.js /
//  tempo.js) DENTRO dos painéis daqui — este arquivo só cuida do alternador
//  das sub-abas e da aba de Ascensão.
//
//  Ascensão (Deuses de Arton, pp. 233–237): candidatura → feito → buscas →
//  ascender → evoluir → dádivas → desafios. É só do mestre, então saíram o
//  gate "Regras acordadas" e o fluxo de "jogador propõe". Ferramentas do
//  mestre para a PERDA DE FAMA (p. 237, a fé é narrativa): ⚖ ±fama (status),
//  Remover e Trocar dádivas. Perder fama NÃO descarta poderes sozinho — o
//  caderno avisa o que passou do limite e o mestre decide.
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

  // ── Ascensão de Deus menor ───────────────────────────────────────
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
  const aviso=msg=>`<p class="ga-cad-aviso">⚠ ${esc(msg)}</p>`;
  const dica=t=>`<p class="ga-cad-dica">ℹ ${esc(t)}</p>`;
  function guia(){return `<details class="ga-cad-guia" data-cad-aberto="guia"><summary>📖 Como funciona a ascensão (Deuses de Arton, pp. 229–237)</summary>
    <p>Em Arton, qualquer mortal pode virar um deus menor — desde que represente um <strong>conceito, valor ou causa</strong> importante o bastante para atrair a fé de outros. É difícil e perigoso; o status divino (a fama) vai de 1 a 5 — acima disso, são deuses maiores.</p>
    <h4>1 · O feito</h4><p>O primeiro passo é um <strong>feito relevante, realizado em jogo</strong>, que transforme o personagem num símbolo com significado. Pode ser grandioso (salvar uma capital) ou de efeito restrito (proteger uma aldeia de um mal ancestral), mas importante. Não precisa ser sozinho; o mestre tem a palavra final sobre se basta.</p>
    <h4>2 · A busca</h4><p>Depois do feito, o personagem dedica o <strong>tempo entre aventuras</strong> a uma busca ligada à divindade pretendida — reunir fiéis, peregrinar, isolar-se para estudar. A mecânica da busca (Tormenta20, p. 278): o jogador escolhe uma perícia coerente, o mestre escolhe a segunda, e a terceira sai de 2d12 na Tabela 6-6. São <strong>três testes contra CD 20 + metade do nível</strong>.</p>
    <ul><li><strong>0 sucessos:</strong> nenhuma recompensa e um castigo.</li><li><strong>1 sucesso:</strong> nada (mas sem castigo).</li><li><strong>2 sucessos:</strong> uma recompensa.</li><li><strong>3 sucessos:</strong> duas recompensas.</li></ul>
    <p>Boas ideias e interpretação podem render +2 a +5, a critério do mestre. Variante <em>busca ousada</em>: +5 em todas as CDs e +1 recompensa se tiver 2–3 sucessos (decidida antes de rolar).</p>
    <h4>3 · Ascender</h4><p>Juntar <strong>duas recompensas dedicadas a "Ascender"</strong> (não precisam ser da mesma busca nem seguidas) torna o personagem deus menor de <strong>status 1</strong>. A natureza vira mortal ascendido (salvo guardião) e ele perde a devoção anterior — passa a ser devoto de si mesmo.</p>
    <h4>4 · Evoluir a fama (status)</h4><p>O poder de um deus vem dos fiéis. Para subir o status, buscar mais seguidores em outra busca: <strong>duas recompensas de "Elevar status" sobem +1</strong> (até 5). Mais status concede habilidades melhores aos devotos e deixa acumular mais dádivas.</p>
    <h4>5 · Dádivas (os poderes pessoais do deus)</h4><p>Dádivas são os <strong>benefícios pessoais</strong> da divindade (diferente do poder que ela concede aos fiéis). Não são automáticas: numa busca de finalidade "dádiva", <strong>cada recompensa dá uma dádiva</strong> à escolha, respeitando os pré-requisitos (natureza e status). O teto é <strong>duas dádivas por status divino</strong>. Contam como bônus de estrutura — não somam com os de bases, domínios e negócios.</p>
    <h4>6 · Desafios divinos</h4><p>Continuar deus dá trabalho. No <strong>início de cada tempo entre aventuras</strong>, role <strong>1d10 + status</strong> e registre o resultado: o caderno mostra a consequência, de "nenhum desafio" (2–6) até a Maldição de Deus Maior (14+), que pode reduzir o status para sempre.</p>
    <h4>Perder a fama</h4><p>"Uma divindade menor ausente, que não demonstra afeição ou preocupação por seus servos, acaba por perder seu respeito e sua fé" (p. 237). Quando os fiéis somem, o status cai — use o <strong>⚖</strong> para ajustar à mão. Perder fama não apaga dádivas sozinho: o caderno avisa o que passou do limite e você decide remover ou trocar.</p>
  </details>`;}
  const fichas=()=>window.GA_Ficha?.referenciasCaderno?.()||window.GA_Ficha?.minhasFichas()||[];
  function escolhaFicha(){return select('fichaId','Ficha',[['','Selecione uma ficha'],...fichas().map(f=>[f.id,f.nome||'Sem nome'])]);}
  const status=s=>s.status>=1?'Status divino '+s.status:(A.jaAscendeu(s)?'Sem fama — status 0 (perdeu a divindade)':'Candidato — ainda não ascendeu');
  // As 16 dádivas, com as que este deus ainda NÃO pode pegar desabilitadas e
  // o motivo ao lado (antes apareciam todas e só davam erro ao enviar).
  function selectDadiva(s){return `<label>Dádiva<select name="dadiva">${A.dadivas.map(x=>{const m=A.motivoDadiva(s,x.id);return `<option value="${esc(x.id)}"${m?' disabled':''}>${esc(x.nome)}${m?' — '+esc(m):''}</option>`;}).join('')}</select></label>`;}

  // um poder (dádiva) com os botões de mestre: Remover e Trocar
  function dadiva(s,g,i){
    const a=A.dadivas.find(x=>x.id===g.tipo);
    const abaixo=a&&a.status&&s.status<a.status;   // a fama caiu abaixo do que o poder exige
    const ref=s.id+'|'+i;
    return `<details class="ga-cad-card" data-cad-aberto="dad:${esc(s.id)}:${i}"><summary>${esc(a?a.nome:g.tipo)} ${esc(g.escolha||'')}${abaixo?' ⚠':''}</summary>
      ${linhas(a?a.texto:'')}<small>Deuses de Arton, p. ${a?a.pagina:'—'}</small>
      ${abaixo?aviso('Requer status '+a.status+'; a fama atual é '+s.status+'.'):''}
      <p>${btn('remover-dadiva','Remover poder',ref)}</p>
      ${s.status>=1?form('trocar-dadiva',select('dadiva','Trocar por',A.dadivas.map(x=>[x.id,x.nome]),g.tipo)+input('escolha','Escolha exigida (perícia, atributo ou magia)',g.escolha),'Trocar poder',ref):''}
    </details>`;
  }

  function ascensao(d){return guia()
    +dica('Cadastrar um candidato aqui é só organização — ninguém vira deus nem ganha poder por isso. A jornada começa pelo feito, em jogo (veja "Como funciona", acima).')
    +form('novo-divino',escolhaFicha()+input('nome','Nome do candidato'),'Registrar candidato')
    +(d.ascensoes.length?'':vazio('Nenhum candidato registrado ainda.'))
    +d.ascensoes.map(s=>{const foiDeus=A.jaAscendeu(s),limite=2*s.status,excesso=s.dadivas.length-limite;
      return artigo(s.nome,`<p><strong>${status(s)}</strong> • ${s.caminho==='indeciso'?'Sem decisão sobre ascender':s.caminho==='guardiao'?'Guardião de '+esc(s.divindade):'Ascensão própria'} • ${btn('remover-divino','Remover',s.id)}</p>
      ${foiDeus?`<p class="ga-cad-fama">⚖ Fama (status divino) — ajuste do mestre: ${s.status>0?btn('fama-menos','− Perder fama',s.id):''} <strong>${s.status}</strong> / 5 ${s.status<5?btn('fama-mais','+ Ganhar fama',s.id):''}</p>`:''}
      ${s.status===0&&!s.feitoAprovado?form('editar-divino',select('caminho','Decisão',[['indeciso','Ainda não decidiu'],['ascender','Tornar-se deus menor'],['guardiao','Ser guardião de uma divindade']],s.caminho)+select('natureza','Natureza da divindade',A.naturezas,s.natureza)+input('divindade','Divindade vinculada ao guardião',s.divindade)+input('conceito','Conceito',s.conceito)+area('feito','Feito realizado em jogo',s.feito),'Salvar candidatura',s.id):linhas(s.conceito+'\n'+s.feito)}
      <p>Feito ${s.feitoAprovado?'aprovado':'aguardando aprovação'}.</p>${s.feitoAprovado?'':s.caminho==='indeciso'?dica('Para aprovar o feito, escolha antes a Decisão (tornar-se deus menor ou guardião) e salve a candidatura.'):btn('aprovar-feito','Aprovar feito realizado',s.id)}
      <p>Recompensas disponíveis: ascensão ${A.saldo(s,'ascensao')} · evolução ${A.saldo(s,'evolucao')} · dádivas ${A.saldo(s,'dadiva')}.</p>
      ${s.feitoAprovado?dica('Busca = tempo entre aventuras dedicado à divindade (3 testes contra CD 20 + metade do nível). Finalidade: para que esta busca conta — Ascender (virar deus), Elevar status (subir a fama) ou Conquistar dádiva (ganhar um poder). Sucessos: 2 dão 1 recompensa, 3 dão 2; 0 ou 1 não dão nenhuma.')+form('busca-divina',input('nome','Nome da busca')+select('finalidade','Finalidade',s.status===0?[['ascensao','Ascender']]:[['evolucao','Elevar status'],['dadiva','Conquistar dádiva']])+input('sucessos','Sucessos nos três testes',2,'number','min="0" max="3" step="1"'),'Registrar resultado da busca',s.id):''}
      ${s.feitoAprovado?btn(s.status===0?'ascender':'evoluir',s.status===0?'Consumir duas recompensas e ascender':'Consumir duas recompensas e elevar status',s.id):''}
      ${s.feitoAprovado?dica(s.status===0?'Precisa de 2 recompensas de "Ascender" no saldo acima. Leva ao status divino 1.':'Precisa de 2 recompensas de "Elevar status" no saldo acima. Sobe a fama em 1 (até 5).'):''}
      <details data-cad-aberto="hist:${esc(s.id)}"><summary>Histórico de buscas (${s.buscas.length})</summary>${s.buscas.map(b=>`<p>${esc(b.nome)} — ${esc(b.finalidade)}: ${b.recompensas} recompensa(s), ${b.consumidas} consumida(s).</p>`).join('')}</details>
      ${foiDeus?`<h4>Dádivas (${s.dadivas.length}/${limite})</h4>${excesso>0?aviso(excesso+' dádiva(s) além do limite da fama atual ('+limite+'). Remova ou troque o que não cabe mais — o sistema não descarta sozinho (Deuses de Arton, p. 237).'):''}${s.dadivas.map((g,i)=>dadiva(s,g,i)).join('')||vazio('Nenhuma dádiva ainda.')}${s.status>=1?form('paladinos',check('aceitaPaladinos','A divindade aceita paladinos',s.aceitaPaladinos)+check('paladinoNoGrupo','Já há um paladino único no grupo',s.paladinoNoGrupo),'Atualizar elegibilidade',s.id)+form('dadiva',selectDadiva(s)+input('escolha','Escolha exigida: perícia, atributo ou magia'),'Conquistar dádiva',s.id):''}`:''}
      ${s.status>=1?`<h4>Desafios divinos</h4>${dica('No início de cada tempo entre aventuras, role 1d10 + status e registre em "Registrar desafio" — o caderno mostra a consequência. É o preço de continuar sendo um deus (p. 237).')}${s.desafios.map(x=>`<div class="ga-cad-card"><strong>${esc(x.periodo)} — ${x.dado} + ${x.status} = ${x.total}</strong>${linhas(A.desafio(x.total,x.status))}${x.resolvido?linhas(x.resultado):form('resolver-desafio',input('periodo','Período',x.periodo,'text','readonly')+area('resultado','Resolução em jogo')+(x.total>=14?check('reduzirStatus','Falhou nos testes: reduzir status permanentemente'):''),'Registrar resolução',s.id)}</div>`).join('')}${form('desafio-divino',input('periodo','Tempo entre aventuras')+input('dado','Resultado de 1d10',1,'number','min="1" max="10"'),'Registrar desafio',s.id)}`:''}`);
    }).join('');}

  // Redesenhar troca o painel inteiro: os <details> abertos (o 📖 guia, o
  // histórico, uma dádiva) voltam abertos, em vez de fechar a cada clique.
  function render(){const r=root();if(!r)return;const abertos=new Set([...r.querySelectorAll('details[data-cad-aberto]')].filter(x=>x.open).map(x=>x.dataset.cadAberto));const est=S.estado(),d=est.dados;r.innerHTML=`<p class="ga-cad-erro" role="alert" ${erro||est.erro?'':'hidden'}>${esc(erro||est.erro)}</p>`+ascensao(d);r.querySelectorAll('details[data-cad-aberto]').forEach(x=>{if(abertos.has(x.dataset.cadAberto))x.open=true;});}
  // O aviso de erro mora no alto do painel: depois de um clique que falhou,
  // leva a pessoa até ele (antes o clique parecia não fazer nada).
  function mostrarErro(){const alvo=root()?.querySelector('.ga-cad-erro');if(alvo&&!alvo.hidden)alvo.scrollIntoView({block:'nearest'});}

  function divino(d,id,a){const i=d.ascensoes.findIndex(s=>s.id===id);C.exigir(i>=0,'Candidatura não encontrada.');d.ascensoes[i]=A.comando(d.ascensoes[i],a,true);}

  function clicar(e){const b=e.target.closest('[data-cad]');if(!b)return;const a=b.dataset.cad;const [id,idx]=(b.dataset.id||'').split('|');erro='';try{
    if(a==='remover-divino'){if(!confirm('Remover esta ascensão do caderno? Não dá para desfazer.'))return;S.editar(d=>{d.ascensoes=d.ascensoes.filter(s=>s.id!==id);});return;}
    if(a==='remover-dadiva'&&!confirm('Remover este poder (dádiva) da divindade?'))return;
    S.editar(d=>{
      if(a==='aprovar-feito')divino(d,id,{tipo:'feito'});
      else if(a==='ascender')divino(d,id,{tipo:'ascender'});
      else if(a==='evoluir')divino(d,id,{tipo:'evoluir'});
      else if(a==='fama-mais')divino(d,id,{tipo:'fama',delta:1});
      else if(a==='fama-menos')divino(d,id,{tipo:'fama',delta:-1});
      else if(a==='remover-dadiva')divino(d,id,{tipo:'remover-dadiva',indice:+idx});
      else throw Error('Ação indisponível.');
    });
  }catch(err){erro=err.message;render();mostrarErro();}}

  function enviar(e){const f=e.target.closest('form[data-cad-form]');if(!f)return;e.preventDefault();const acao=f.dataset.cadForm;const [id,idx]=(f.dataset.id||'').split('|');const v=Object.fromEntries(new FormData(f));erro='';try{
    S.editar(d=>{
      if(acao==='novo-divino'){C.exigir(v.nome.trim()&&v.fichaId,'Escolha ficha e nome.');C.exigir(!d.ascensoes.some(s=>s.fichaId===v.fichaId),'Esta ficha já possui candidatura.');d.ascensoes.push(A.novo(v.nome,v.fichaId));}
      else if(acao==='editar-divino'){const s=d.ascensoes.find(s=>s.id===id);C.exigir(s.status===0&&!s.feitoAprovado,'Feito aprovado não pode ser reescrito.');for(const k of ['caminho','natureza','divindade','conceito','feito'])s[k]=v[k];if(s.caminho==='ascender')s.natureza='Mortal ascendido';}
      else if(acao==='busca-divina')divino(d,id,{tipo:'busca',id:C.uid(),nome:v.nome,finalidade:v.finalidade,sucessos:+v.sucessos});
      else if(acao==='dadiva')divino(d,id,{tipo:'dadiva',dadiva:v.dadiva,escolha:v.escolha});
      else if(acao==='trocar-dadiva')divino(d,id,{tipo:'trocar-dadiva',indice:+idx,dadiva:v.dadiva,escolha:v.escolha});
      else if(acao==='paladinos'){const s=d.ascensoes.find(s=>s.id===id);s.aceitaPaladinos=!!v.aceitaPaladinos;s.paladinoNoGrupo=!!v.paladinoNoGrupo;}
      else if(acao==='desafio-divino')divino(d,id,{tipo:'desafio',periodo:v.periodo,dado:+v.dado});
      else if(acao==='resolver-desafio')divino(d,id,{tipo:'resolver',periodo:v.periodo,resultado:v.resultado,reduzirStatus:!!v.reduzirStatus});
      else throw Error('Formulário indisponível.');
    });
  }catch(err){erro=err.message;const r=root(),alvo=r&&r.querySelector('.ga-cad-erro');if(alvo){alvo.hidden=false;alvo.textContent=erro;alvo.scrollIntoView({block:'nearest'});}}}

  function init(){const sec=document.getElementById('caderno');if(!sec)return;abas();const r=root();if(r){r.addEventListener('click',clicar);r.addEventListener('submit',enviar);}S.aoMudar(render);render();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
