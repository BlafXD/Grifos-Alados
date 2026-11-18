// Histórico local de operações. Reversões comparam somente os campos alterados.
window.GA_HistoricoJogo = (() => {
  'use strict';
  const clone = x => x === undefined ? null : JSON.parse(JSON.stringify(x));
  const igual = (a,b) => JSON.stringify(a) === JSON.stringify(b);
  const key = () => 'grifosAlados.historicoJogo.' + ((window.GA_Mesa?.estado()?.usuario?.uid) || 'local') + '.' + (window.GA_Sala?.id || 'hub');
  const ler = () => { try {const v=JSON.parse(localStorage.getItem(key()) || '[]');return Array.isArray(v)?v:[];} catch {return [];} };
  const gravar = v => localStorage.setItem(key(),JSON.stringify(v.slice(-150)));
  function caminho(obj, path) {
    const partes=path.split('.');
    if(partes.some(p=>['__proto__','constructor','prototype'].includes(p))) throw new Error('Campo inválido.');
    let pai=obj;
    for(const p of partes.slice(0,-1)) {if(!pai || typeof pai[p]!=='object')throw new Error('O campo não existe mais.');pai=pai[p];}
    return {pai,chave:partes.at(-1)};
  }
  function foto(obj, paths) {return paths.map(path=>{const {pai,chave}=caminho(obj,path);return {path,valor:clone(pai[chave])};});}
  function registrar(alvo,rotulo,antes,obj) {
    const campos=antes.map(a=>({...a,depois:foto(obj,[a.path])[0].valor})).filter(a=>!igual(a.valor,a.depois));
    if(!campos.length)return;
    const h=ler();h.push({id:Date.now().toString(36)+Math.random().toString(36).slice(2),alvo,rotulo,em:Date.now(),campos});
    try {gravar(h);} catch(e){console.warn('[histórico] não foi possível guardar a operação',e);}
  }
  function desfazer(id,alvo,obj) {
    const h=ler(),op=h.find(x=>x.id===id && x.alvo===alvo && !x.desfeita);
    if(!op)throw new Error('Esta operação não está mais disponível.');
    const destinos=op.campos.map(c=>({...c,...caminho(obj,c.path)}));
    if(destinos.some(c=>!igual(clone(c.pai[c.chave]),c.depois))) throw new Error('Esses campos mudaram depois desta ação. Ajuste manualmente para preservar a alteração mais recente.');
    // Reserva o registro antes da reversão, para falha de armazenamento não
    // permitir reaplicar indefinidamente a mesma ação.
    op.desfeita=Date.now();gravar(h);
    destinos.forEach(c=>{c.pai[c.chave]=clone(c.valor);});
    return destinos.map(c=>c.path.split('.')[0]);
  }
  function abrir(alvo,resolver,salvar) {
    const esc=window.GA_esc;
    const lista=ler().filter(x=>x.alvo===alvo).reverse();
    const modal=window.GA_abrirModal(`<div class="ga-modal-cab"><span>Histórico de jogo</span><button type="button" data-ga-fechar class="ga-modal-x" aria-label="Fechar">✕</button></div>
      <p>Desfazer preserva os outros campos. Se o valor já mudou, a reversão é recusada.</p>
      <p data-hj-erro role="alert"></p>${lista.map(o=>`<div class="ga-historico-linha"><span>${esc(o.rotulo)}<small> ${new Date(o.em).toLocaleString('pt-BR')}</small></span><button type="button" class="ga-btn-sec" data-hj-id="${esc(o.id)}" ${o.desfeita?'disabled':''}>${o.desfeita?'Desfeita':'Desfazer'}</button></div>`).join('') || '<p>Nenhuma alteração registrada.</p>'}`);
    modal?.addEventListener('click',e=>{const b=e.target.closest('[data-hj-id]');if(!b)return;try{const obj=resolver();if(!obj)throw new Error('Esta ficha não está mais disponível.');const campos=desfazer(b.dataset.hjId,alvo,obj);salvar(campos);b.disabled=true;b.textContent='Desfeita';}catch(err){modal.querySelector('[data-hj-erro]').textContent=err.message;}});
  }
  return {foto,registrar,desfazer,abrir,listar:ler};
})();
