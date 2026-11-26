// A versão privada nunca é lida por jogadores. Publicação usa transação e
// projeção explícita, evitando substituir a edição mais recente de outro mestre.
window.GA_CadernoStore = (() => {
  'use strict';
  const C=window.GA_CadernoCore;
  let dados=C.novo(),dirty=false,remoto=null,ref=null,assinatura='',erro='',propostas={},refPropostas=null,leituraPropostas=null;
  const ouvintes=[];
  const mesa=()=>window.GA_Mesa?.estado()||{};
  const uid=()=>mesa().usuario?.uid||'local';
  const sala=()=>window.GA_Sala?.id||'hub';
  //  QUEM EDITA (revisão de 25/11/2026). O Caderno só existe no index.html,
  //  a página do mestre, e lá ele é editável na bancada, sem login e com o
  //  Firebase fora do ar. A trava é só para quem a mesa CONFIRMA que é
  //  jogador ou espectador (abriu a página do mestre pelo link errado).
  //  Antes, com o Firebase configurado, exigia ser mestre DESTA mesa — e no
  //  site publicado a Ascensão recusava tudo na bancada e sem login.
  const mestre=()=>{
    if(window.GA_Sala?.ehJogador)return false;
    const e=mesa();
    if(window.GA_FIREBASE&&window.GA_Sala?.id&&e.usuario&&e.papel&&!window.GA_Mesa?.transmite())return false;
    return true;
  };
  const chave=()=>`grifosAlados.caderno.${uid()}.${sala()}.${mestre()?'mestre':'jogador'}`;
  const avisar=()=>ouvintes.forEach(f=>f());
  function carregar(){try{const v=JSON.parse(localStorage.getItem(chave())||'null');dados=v?.dados?.versao===1?{...C.novo(),...v.dados}:C.novo();dirty=!!v?.dirty;}catch{dados=C.novo();dirty=false;erro='O caderno local não pôde ser lido. Exporte um backup antes de alterar dados.';}}
  function salvar(){localStorage.setItem(chave(),JSON.stringify({dados,dirty}));}
  function editar(fn){C.exigir(mestre(),'Somente o mestre ou auxiliar pode registrar decisões da campanha.');const copia=C.copiar(dados);fn(copia);const anterior=dados,antes=dirty;dados=copia;dirty=true;try{salvar();}catch(e){dados=anterior;dirty=antes;throw e;}avisar();}
  async function publicar(){C.exigir(mestre()&&ref,'Entre como mestre em uma mesa para publicar.');C.exigir(remoto!==null,'Aguarde a leitura da mesa antes de publicar.');const local=C.copiar(dados),esperada=dados.revisao||0;local.revisao=esperada+1;const destino=ref,origem=assinatura;
    const r=await destino.transaction(atual=>{if((atual?.revisao||0)!==esperada)return;return {revisao:local.revisao,privado:JSON.stringify(local),publico:JSON.stringify(C.publico(local))};},undefined,false);
    C.exigir(r.committed,'Outro mestre alterou o caderno. Guarde um backup e carregue a versão da mesa antes de publicar novamente.');
    if(origem!==assinatura)return;
    // Uma edição feita enquanto a transação viajava continua pendente.
    const aindaIgual=JSON.stringify({...dados,revisao:local.revisao})===JSON.stringify(local);
    dados.revisao=local.revisao;dirty=!aindaIgual;remoto=C.copiar(local);salvar();avisar();
  }
  function receberMesa(){C.exigir(remoto,'A mesa ainda não foi carregada.');dados={...C.novo(),...C.copiar(remoto)};dirty=false;salvar();avisar();}
  async function propor(tipo,valor){C.exigir(['objetivo','ascensao','acordo'].includes(tipo),'Proposta inválida.');C.exigir(refPropostas&&mesa().escreve&&!mestre(),'Entre como jogador desta mesa para enviar uma proposta.');const id=C.uid();await refPropostas.child(uid()).child(id).set({id,tipo,valor:JSON.stringify(valor),uid:uid(),em:Date.now()});}
  async function removerProposta(dono,id){C.exigir(mestre()&&refPropostas,'Somente o mestre pode arquivar propostas.');await refPropostas.child(dono).child(id).remove();}
  function conectar(){const est=mesa(),nova=[uid(),sala(),mestre(),est.papel||''].join('|');if(nova===assinatura)return;
    if(ref)ref.off();if(leituraPropostas)leituraPropostas.off();ref=null;refPropostas=null;leituraPropostas=null;assinatura=nova;remoto=null;propostas={};erro='';carregar();
    const db=window.GA_Mesa?.db();if(db&&sala()!=='hub'&&est.souMembro){const base=db.ref('mesas/'+sala());ref=mestre()?base.child('caderno'):base.child('caderno/publico');const origem=nova;
      ref.on('value',snap=>{if(assinatura!==origem)return;try{const raw=mestre()?snap.val()?.privado:snap.val(),v=typeof raw==='string'?JSON.parse(raw):raw;remoto={...C.novo(),...(v||{})};if(!dirty||!mestre()){dados=C.copiar(remoto);dirty=false;salvar();}avisar();}catch(e){erro='O caderno recebido não pôde ser lido: '+e.message;avisar();}},e=>{erro='Não foi possível ler o caderno da mesa: '+e.message;avisar();});
      refPropostas=base.child('cadernoPropostas');leituraPropostas=mestre()?refPropostas:refPropostas.child(uid());
      leituraPropostas.on('value',snap=>{if(assinatura!==origem)return;propostas=mestre()?(snap.val()||{}):{[uid()]:snap.val()||{}};avisar();},e=>{if(assinatura!==origem)return;erro='Não foi possível ler propostas: '+e.message;avisar();});
    }avisar();
  }
  function estado(){return {dados:C.copiar(dados),dirty,remoto:remoto&&C.copiar(remoto),erro,mestre:mestre(),online:!!ref,propostas:C.copiar(propostas)};}
  function iniciar(){conectar();window.GA_Mesa?.aoMudar(conectar);}
  window.addEventListener('storage',e=>{if(e.key===chave()){carregar();avisar();}});
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',iniciar);else iniciar();
  return {estado,editar,publicar,receberMesa,propor,removerProposta,aoMudar:f=>ouvintes.push(f)};
})();
