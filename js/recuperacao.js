// Carregado depois da configuração e antes de qualquer conexão com o Firebase.
(() => {
  const chave='grifosAlados.recuperacao';
  function suspender(){
    window.GA_FIREBASE=null;
    try{window.GA_Mesa?.db()?.goOffline();}catch{}
  }
  if(localStorage.getItem(chave)){
    suspender();
    if(localStorage.getItem(chave)==='aplicando'){location.replace('backup.html');return;}
    const aviso=document.createElement('aside');aviso.className='ga-recuperacao';aviso.textContent='Recuperação: alterações ficam apenas neste navegador. ';
    const link=document.createElement('a');link.href='backup.html';link.textContent='Revisar backup e conexão';aviso.append(link);document.body.prepend(aviso);
  }
  window.addEventListener('storage',e=>{if(e.key===chave&&e.newValue==='aplicando'){suspender();location.replace('backup.html');}});
})();
