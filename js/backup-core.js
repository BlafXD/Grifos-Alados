// Pacote de conteúdo local. Não contém credenciais nem marcadores de sincronização.
window.GA_Backup = (() => {
  'use strict';
  const VERSAO=1, BLOQUEIO='grifosAlados.recuperacao';
  const permitido=k=>k.startsWith('grifosAlados.') && !/gavetaSinc|fichaSincronia|recuperacao|fichaSubaba|ultimaMesa|migrad|abaAtiva|sessaoAba|dispositivo/i.test(k);
  const copia=x=>JSON.parse(JSON.stringify(x));
  async function digest(x){const bytes=new TextEncoder().encode(JSON.stringify(x));return [...new Uint8Array(await crypto.subtle.digest('SHA-256',bytes))].map(n=>n.toString(16).padStart(2,'0')).join('');}
  function banco(){return new Promise((resolve,reject)=>{const r=indexedDB.open('grifosAladosFichas',1);r.onupgradeneeded=()=>r.result.createObjectStore('pdfs',{keyPath:'id'});r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error);r.onblocked=()=>reject(new Error('Feche outras abas que estejam atualizando os PDFs.'));});}
  async function pdfs(){const db=await banco();try{return await new Promise((resolve,reject)=>{const t=db.transaction('pdfs'),r=t.objectStore('pdfs').getAll();r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error);});}finally{db.close();}}
  const base64=buffer=>{let s='';const b=new Uint8Array(buffer);for(let i=0;i<b.length;i+=8192)s+=String.fromCharCode(...b.subarray(i,i+8192));return btoa(s);};
  const buffer=s=>Uint8Array.from(atob(s),c=>c.charCodeAt(0)).buffer;
  async function exportar(){
    const entradas=[];
    for(const chave of Object.keys(localStorage).filter(permitido).sort()) entradas.push({tipo:'local',id:chave,valor:localStorage.getItem(chave)});
    for(const p of await pdfs())entradas.push({tipo:'pdf',id:p.id,valor:{...p,dados:base64(p.dados)}});
    const manifesto={versao:VERSAO,em:new Date().toISOString(),escopo:'Conteúdo presente neste navegador; não inclui dados remotos não carregados, autenticação ou configuração de sincronização.',locais:entradas.filter(e=>e.tipo==='local').length,pdfs:entradas.filter(e=>e.tipo==='pdf').length};
    const corpo={manifesto,entradas};return {...corpo,sha256:await digest(corpo)};
  }
  function segura(v){if(!v || typeof v!=='object')return;if(Object.keys(v).some(k=>['__proto__','constructor','prototype'].includes(k)))throw new Error('O pacote contém uma chave insegura.');Object.values(v).forEach(segura);}
  async function validar(p){
    if(!p || p.manifesto?.versao!==VERSAO || !Array.isArray(p.entradas) || p.entradas.length>20000)throw new Error('Formato ou versão de backup inválidos.');
    segura(p);
    if(await digest({manifesto:p.manifesto,entradas:p.entradas})!==p.sha256)throw new Error('Backup incompleto ou alterado: a verificação de integridade falhou.');
    const ids=new Set();
    for(const e of p.entradas){const id=e.tipo+':'+e.id;if(typeof e.id!=='string'||ids.has(id))throw new Error('Identificação repetida ou inválida.');ids.add(id);
      if(e.tipo==='local'){if(!permitido(e.id)||typeof e.valor!=='string')throw new Error('Chave local não permitida.');try{segura(JSON.parse(e.valor));}catch(err){if(err.message.includes('insegura'))throw err;}}
      else if(e.tipo==='pdf'){if(e.valor?.id!==e.id||typeof e.valor.dados!=='string')throw new Error('PDF inválido.');const b=new Uint8Array(buffer(e.valor.dados));if(new TextDecoder().decode(b.subarray(0,5))!=='%PDF-')throw new Error('Arquivo sem assinatura PDF.');}
      else throw new Error('Tipo de conteúdo desconhecido.');
    }
    if(p.manifesto.locais!==p.entradas.filter(e=>e.tipo==='local').length || p.manifesto.pdfs!==p.entradas.filter(e=>e.tipo==='pdf').length)throw new Error('O manifesto não corresponde ao conteúdo.');
    return p;
  }
  const obter=(obj,path)=>path.reduce((v,k)=>v?.[k],obj);
  function colocar(obj,path,valor){if(!path.length)return valor;let p=obj;for(const k of path.slice(0,-1)){if(!p[k]||typeof p[k]!=='object')p[k]={};p=p[k];}p[path.at(-1)]=valor;return obj;}
  function registros(valor){try{const raiz=JSON.parse(valor),listas=[];
    function visitar(v,path,depth){if(depth>12||!v||typeof v!=='object')return;
      if(Array.isArray(v)){if(v.length&&v.every(x=>x&&typeof x==='object'&&typeof x.id==='string'))listas.push({path,lista:v});return;}
      Object.entries(v).forEach(([k,x])=>visitar(x,path.concat(k),depth+1));
    }visitar(raiz,[],0);if(!listas.length)return null;
    let meta=copia(raiz);listas.forEach(l=>meta=colocar(meta,l.path,[]));
    function temConfig(v){if(Array.isArray(v))return v.length>0;if(v&&typeof v==='object')return Object.values(v).some(temConfig);return v!==undefined;}
    return {raiz,listas,meta,temConfig:temConfig(meta)};
  }catch{}return null;}
  async function previa(p){await validar(p);const existentes=new Map((await pdfs()).map(x=>[x.id,x]));const linhas=[];
    p.entradas.forEach((e,ei)=>{const atual=e.tipo==='pdf'?existentes.get(e.id):localStorage.getItem(e.id),r=e.tipo==='local'?registros(e.valor):null;
      if(r){let a;try{a=JSON.parse(atual);}catch{}r.listas.forEach(({path,lista})=>{const alista=obter(a,path);lista.forEach((v,ri)=>linhas.push({ei,ri,path,id:v.id,nome:v.nome||v.personagem||v.titulo||v.id,tipo:e.tipo,chave:e.id,grupo:path.join('.'),conflito:Array.isArray(alista)&&alista.some(x=>x.id===v.id),copiavel:true}));});
        if(r.temConfig)linhas.push({ei,ri:null,config:true,id:e.id,nome:'Configurações e contexto — '+e.id,tipo:e.tipo,chave:e.id,conflito:atual!=null,copiavel:false});
      }else linhas.push({ei,ri:null,id:e.id,nome:e.tipo==='pdf'?e.valor.nome:e.id,tipo:e.tipo,chave:e.id,conflito:atual!=null,copiavel:e.tipo==='pdf'});
    });return linhas;
  }
  function novosIds(obj,mapa=new Map()){function ids(v){if(!v||typeof v!=='object')return;if(typeof v.id==='string'&&!mapa.has(v.id))mapa.set(v.id,'rest-'+crypto.randomUUID());Object.values(v).forEach(ids);}ids(obj);function trocar(v){if(typeof v==='string')return mapa.get(v)||v;if(Array.isArray(v))return v.map(trocar);if(v&&typeof v==='object')return Object.fromEntries(Object.entries(v).map(([k,x])=>[mapa.get(k)||k,trocar(x)]));return v;}return trocar(obj);}
  async function aplicar(p,escolhas){
    await validar(p);const linhas=await previa(p),antes=new Map(),novos=new Map(),pdfAntes=await pdfs(),pdfNovos=new Map(pdfAntes.map(x=>[x.id,x]));
    if(!Array.isArray(escolhas)||escolhas.length!==linhas.length)throw new Error('Revise todas as escolhas antes de restaurar.');
    // Metadados de fichas PDF e arquivos binários usam o mesmo identificador.
    // Planeja os IDs antes de copiar para preservar os vínculos entre registros.
    const idsCopiados=new Map();
    linhas.forEach((l,i)=>{if(escolhas[i]==='copia')idsCopiados.set(l.id,idsCopiados.get(l.id)||'rest-'+crypto.randomUUID());});
    linhas.forEach((l,i)=>{if(escolhas[i]==='copia'&&l.ri!==null){const r=registros(p.entradas[l.ei].valor);novosIds(obter(r.raiz,l.path)[l.ri],idsCopiados);}});
    for(let i=0;i<linhas.length;i++){
      const l=linhas[i],e=p.entradas[l.ei],acao=escolhas[i];
      if(!['manter','substituir','copia'].includes(acao)||acao==='copia'&&!l.copiavel)throw new Error('Escolha de restauração inválida.');
      if(acao==='manter')continue;
      if(e.tipo==='pdf'){let v=copia(e.valor);if(acao==='copia'){v.id=idsCopiados.get(l.id);v.nome+=' (cópia)';}v.dados=buffer(v.dados);pdfNovos.set(v.id,v);continue;}
      if(!antes.has(e.id))antes.set(e.id,localStorage.getItem(e.id));
      if(l.ri===null&&!l.config){novos.set(e.id,e.valor);continue;}
      const origem=registros(e.valor);let atual;try{atual=JSON.parse(novos.get(e.id)??localStorage.getItem(e.id));}catch{}
      if(!atual||typeof atual!=='object')atual=copia(origem.meta);
      if(l.config){let meta=copia(origem.meta);for(const grupo of origem.listas)meta=colocar(meta,grupo.path,copia(obter(atual,grupo.path)||[]));novos.set(e.id,JSON.stringify(meta));continue;}
      if(!Array.isArray(obter(atual,l.path)))atual=colocar(atual,l.path,[]);
      const it=copia(obter(origem.raiz,l.path)[l.ri]);
      const lista=obter(atual,l.path),v=acao==='copia'?novosIds(it,idsCopiados):it;
      if(acao==='copia'&&v.nome)v.nome+=' (cópia)';
      const indice=lista.findIndex(x=>x.id===v.id);if(indice>=0)lista[indice]=v;else lista.push(v);
      novos.set(e.id,JSON.stringify(atual));
    }
    // Este módulo é executado em backup.html, sem Firebase. Outras abas são
    // levadas para a recuperação antes da escrita, e a nuvem permanece suspensa.
    localStorage.setItem(BLOQUEIO,'aplicando');
    await new Promise(r=>setTimeout(r,300));
    if([...antes].some(([k,v])=>localStorage.getItem(k)!==v)){localStorage.setItem(BLOQUEIO,'offline');throw new Error('Os dados mudaram em outra aba. Reabra a prévia antes de restaurar.');}
    let db;
    try{
      db=await banco();
      // Uma transação reúne todos os PDFs; quota/erro aborta o conjunto.
      await new Promise((resolve,reject)=>{const tx=db.transaction('pdfs','readwrite'),st=tx.objectStore('pdfs');st.clear();pdfNovos.forEach(v=>st.put(v));
        tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error||new Error('Restauração cancelada.'));});
      for(const [k,v]of novos)localStorage.setItem(k,v);
      localStorage.removeItem('grifosAlados.gavetaSinc');localStorage.removeItem('grifosAlados.fichaSincronia');
      localStorage.setItem(BLOQUEIO,'offline');
      return {locais:novos.size,pdfs:pdfNovos.size};
    }catch(err){
      for(const [k,v]of antes){if(v===null)localStorage.removeItem(k);else localStorage.setItem(k,v);}
      if(db)await new Promise((resolve,reject)=>{const tx=db.transaction('pdfs','readwrite'),st=tx.objectStore('pdfs');st.clear();pdfAntes.forEach(v=>st.put(v));tx.oncomplete=resolve;tx.onabort=()=>reject(tx.error);tx.onerror=()=>reject(tx.error);});
      localStorage.setItem(BLOQUEIO,'offline');throw err;
    }finally{db?.close();localStorage.setItem(BLOQUEIO,'offline');}
  }
  return {exportar,validar,previa,aplicar,permitido,novosIds,BLOQUEIO};
})();
