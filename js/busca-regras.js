window.GA_BuscaRegras = (()=>{
  'use strict';
  let cache;
  const texto=v=>Array.isArray(v)?v.map(texto).join('\n'):v&&typeof v==='object'?Object.entries(v).map(([k,x])=>k+': '+texto(x)).join('\n'):String(v??'');
  function indice(){if(cache)return cache;const out=[];
    function add(tipo,arr,fonte){(arr||[]).forEach((d,i)=>{const nome=d.nome||d.titulo;if(!nome)return;const origem=typeof fonte==='function'?fonte(d):fonte;out.push({id:tipo+':'+(d.id||d.chave||i),tipo,nome,fonte:origem,conteudo:texto(d.texto||d.descricao||d.efeito||d),busca:window.GA_semAcento(nome+' '+texto(d))});});}
    add('Poder',window.GA_PODERES,d=>(window.GA_PODERES_LIVROS?.[d.livro]||d.livro||'Catálogo de poderes')+(d.pagina?', p. '+d.pagina:''));
    add('Magia',(window.GA_MAGIAS||[]).map(m=>({...m,texto:[m.tipo+' '+m.circulo+' • '+m.escola,'Execução: '+m.execucao+' • Alcance: '+m.alcance,'Duração: '+m.duracao,'Alvo/área: '+(m.alvo||m.area||m.efeito||'—'),'Resistência: '+(m.resistencia||'—'),...(m.descricao||[]),m.truque?'Truque: '+m.truque:'',...(m.aprimoramentos||[]).map(a=>(a.pm>=0?'+':'')+a.pm+' PM: '+a.texto+(a.itens?'\n'+a.itens.join('\n'):''))]})),d=>(window.GA_REFERENCIAS_MAGIAS?.[d.id]||[]).map(r=>r.livro+', p. '+r.pagina).join(' / ')||'Catálogo existente — referência de página ainda não identificada');
    add('Condição',window.GA_CONDICOES?.lista||window.GA_CONDICOES?.LISTA,'Tormenta20, pp. 394–395');
    add('Ação',window.REGRAS_ACOES,'Tormenta20 — A Rodada de Combate');
    add('Regra de magia',window.REGRAS_MAGIA,'Tormenta20 — Magias');
    add('Regra de item',window.REGRAS_ITENS,'Tormenta20 — Equipamento');
    add('Item ou melhoria',Object.entries({...window.GA_ITENS_DESC_EXTRA,...window.GA_ITENS_DESC}).map(([nome,texto])=>({id:nome,nome,texto})),'Catálogo de itens — Tormenta20 / Heróis de Arton (origem individual não registrada no catálogo)');
    for(const nome of ['FICHAS_T20','FICHAS_AMEACAS_ARTON','FICHAS_DEUSES_ARTON']){const livro=window[nome];if(livro)add('Criatura',livro.categorias?.flatMap(c=>(c.fichas||[]).map(f=>({...f,id:nome+':'+f.chave}))),d=>livro.livro+(d.pagina?', p. '+d.pagina:' — '+(livro.fonte||'Ameaças')));}
    add('Perigo',window.PERIGOS_COMPLEXOS,d=>d.fonte);
    add('Deus menor',window.GA_DEUSES_MENORES,d=>d.livro+', p. '+d.pagina);
    add('Dádiva',window.GA_Ascensao?.dadivas,d=>'Deuses de Arton, p. '+d.pagina);
    add('Objetivo heroico',window.GA_CadernoCore?.objetivos,'Heróis de Arton, pp. 292–293');
    add('Regra opcional',window.GA_CadernoCore?.opcionais.map(([id,nome,texto])=>({id,nome,texto})),d=>d.texto);
    cache=out;return out;
  }
  function buscar(q,tipo=''){const termos=window.GA_semAcento(q).split(/\s+/).filter(Boolean);return indice().filter(r=>(!tipo||r.tipo===tipo)&&termos.every(t=>r.busca.includes(t)));}
  return {indice,buscar,encontrar:id=>indice().find(r=>r.id===id)};
})();
