(() => {
  'use strict';
  const B=window.GA_Backup,$=s=>document.querySelector(s);let pacote=null,linhas=[];
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const status=s=>$('#backup-status').textContent=s;
  function download(p,nome){const u=URL.createObjectURL(new Blob([JSON.stringify(p)],{type:'application/json'})),a=document.createElement('a');a.href=u;a.download=nome;a.click();setTimeout(()=>URL.revokeObjectURL(u),1000);}
  function offline(){$('#backup-offline').hidden=!localStorage.getItem(B.BLOQUEIO);}
  $('#backup-exportar').onclick=async()=>{try{const p=await B.exportar();download(p,'grifos-alados-backup-'+new Date().toISOString().slice(0,10)+'.json');status(p.manifesto.locais+' grupos de dados e '+p.manifesto.pdfs+' PDFs incluídos.');}catch(e){status('Não foi possível concluir o backup: '+e.message);}};
  $('#backup-arquivo').onchange=async e=>{pacote=null;$('#backup-aplicar').hidden=true;$('#backup-previa').replaceChildren();const file=e.target.files[0];if(!file)return;try{
    if(file.size>200*1024*1024)throw new Error('O limite por pacote é 200 MB.');
    const p=JSON.parse(await file.text());linhas=await B.previa(p);pacote=p;
    status(linhas.length+' registros; '+linhas.filter(l=>l.conflito).length+' conflitos. Escolha o destino de cada registro.');
    $('#backup-previa').innerHTML=linhas.map((l,i)=>`<label class="ga-backup-linha"><span>${esc(l.nome)}<small>${esc(l.chave)}${l.grupo?' / '+esc(l.grupo):''} · ${l.conflito?'Já existe neste navegador':'Novo registro'}</small></span><select data-backup-i="${i}" aria-label="Destino de ${esc(l.nome)}"><option value="manter" ${l.conflito?'selected':''}>Manter como está</option><option value="substituir" ${l.conflito?'':'selected'}>${l.conflito?'Substituir':'Importar'}</option>${l.copiavel?'<option value="copia">Importar como cópia</option>':''}</select></label>`).join('');
    $('#backup-aplicar').hidden=false;
  }catch(err){status(err.message);}};
  $('#backup-aplicar').onclick=async()=>{if(!pacote)return;const b=$('#backup-aplicar');b.disabled=true;try{
    // A cópia anterior é entregue antes de começar, além do rollback em memória.
    download(await B.exportar(),'grifos-alados-antes-da-restauracao.json');
    const escolhas=[...document.querySelectorAll('[data-backup-i]')].map(e=>e.value);
    const r=await B.aplicar(pacote,escolhas);status('Restauração concluída: '+r.locais+' grupos locais atualizados, '+r.pdfs+' PDFs disponíveis. Sincronização suspensa.');pacote=null;b.hidden=true;offline();
  }catch(e){status('A restauração não foi concluída: '+e.message);offline();}finally{b.disabled=false;}};
  $('#backup-reconectar').onclick=()=>{localStorage.removeItem(B.BLOQUEIO);location.href='index.html';};offline();
})();
