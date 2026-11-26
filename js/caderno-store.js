// O caderno do mestre: guardado SÓ neste navegador, por conta e por campanha.
// Faxina de 25/11/2026: a publicação na mesa (`mesas/<sala>/caderno`) e as
// propostas dos jogadores (`cadernoPropostas`) eram do Caderno antigo — a tela
// nova nunca as usou, e as duas regras saíram do banco. Sem escuta remota, um
// caderno velho publicado lá não volta a sobrescrever o daqui.
window.GA_CadernoStore = (() => {
  'use strict';
  const C=window.GA_CadernoCore;
  let dados=C.novo(),erro='',assinatura='';
  const ouvintes=[];
  const mesa=()=>window.GA_Mesa?.estado()||{};
  const uid=()=>mesa().usuario?.uid||'local';
  const sala=()=>window.GA_Sala?.id||'hub';
  //  QUEM EDITA (revisão de 25/11/2026). O Caderno só existe no index.html,
  //  a página do mestre, e lá ele é editável na bancada, sem login e com o
  //  Firebase fora do ar. A trava é só para quem a mesa CONFIRMA que é
  //  jogador ou espectador (abriu a página do mestre pelo link errado).
  const mestre=()=>{
    if(window.GA_Sala?.ehJogador)return false;
    const e=mesa();
    if(window.GA_FIREBASE&&window.GA_Sala?.id&&e.usuario&&e.papel&&!window.GA_Mesa?.transmite())return false;
    return true;
  };
  // A chave é a mesma da época do Caderno antigo (conta · campanha · papel):
  // o que já foi guardado continua sendo achado.
  const chave=()=>`grifosAlados.caderno.${uid()}.${sala()}.${mestre()?'mestre':'jogador'}`;
  const avisar=()=>ouvintes.forEach(f=>f());
  function carregar(){try{const v=JSON.parse(localStorage.getItem(chave())||'null');dados=v?.dados?.versao===1?{...C.novo(),...v.dados}:C.novo();erro='';}catch{dados=C.novo();erro='O caderno local não pôde ser lido. Exporte um backup antes de alterar dados.';}}
  function salvar(){localStorage.setItem(chave(),JSON.stringify({dados}));}
  function editar(fn){C.exigir(mestre(),'Somente o mestre ou auxiliar pode registrar decisões da campanha.');const copia=C.copiar(dados);fn(copia);const anterior=dados;dados=copia;try{salvar();}catch(e){dados=anterior;throw e;}avisar();}
  // Entrou, saiu ou mudou de papel: a chave muda junto, e o caderno é relido.
  function conectar(){const nova=[uid(),sala(),mestre()].join('|');if(nova===assinatura)return;assinatura=nova;carregar();avisar();}
  function estado(){return {dados:C.copiar(dados),erro,mestre:mestre()};}
  function iniciar(){conectar();window.GA_Mesa?.aoMudar(conectar);}
  window.addEventListener('storage',e=>{if(e.key===chave()){carregar();avisar();}});
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',iniciar);else iniciar();
  return {estado,editar,aoMudar:f=>ouvintes.push(f)};
})();
