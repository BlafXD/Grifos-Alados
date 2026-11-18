window.GA_ItensInteligentes = (()=>{
  'use strict';
  const menores=[[10,'Adaga Mental'],[15,'Bênção (apenas no usuário)'],[19,'Compreensão'],[22,'Controlar Plantas'],[26,'Criar Ilusão'],[31,'Disfarce Ilusório'],[33,'Escuridão'],[36,'Hipnotismo'],[40,'Visão Mística'],[45,'Vitalidade Fantasma'],[55,'Treinado em Conhecimento e Religião'],[65,'Treinado em Diplomacia e Nobreza'],[75,'Treinado em Enganação e Jogatina'],[80,'Treinado em Intimidação e Sobrevivência'],[90,'Treinado em Intuição e Percepção'],[100,'Treinado em Misticismo']];
  const maiores=[[8,'Augúrio'],[14,'Campo de Força'],[20,'Círculo da Justiça'],[26,'Condição'],[31,'Controlar Fogo'],[40,'Curar Ferimentos'],[45,'Desespero Esmagador'],[50,'Globo da Verdade de Gwen'],[55,'Ligação Telepática'],[60,'Localização'],[65,'Purificação'],[75,'Raio Solar'],[80,'Soco de Arsenal'],[85,'Sopro das Uivantes'],[90,'Velocidade'],[100,'+1 em um atributo do usuário']];
  const capacidades=[{max:25,mods:[-1,0,-2],sentidos:'Visão e audição normais',comunicacao:'empatia',menores:1,maiores:0},{max:50,mods:[0,1,-1],sentidos:'Visão e audição normais',comunicacao:'empatia',menores:2,maiores:0},{max:75,mods:[1,2,0],sentidos:'Visão no escuro',comunicacao:'fala',menores:2,maiores:1},{max:90,mods:[2,3,1],sentidos:'Percepção às cegas (curto)',comunicacao:'fala',menores:3,maiores:1},{max:100,mods:[3,4,2],sentidos:'Percepção às cegas (médio)',comunicacao:'telepatia',menores:3,maiores:2}];
  function gerar(grau,rolar=n=>1+Math.floor(Math.random()*n)){
    const C=window.GA_CadernoCore;C.exigir(C.graus[grau],'Categoria inválida.');const registro=[];const dado=n=>{const v=rolar(n);C.exigir(C.inteiro(v,1,n),'Rolagem inválida.');registro.push({faces:n,valor:v});return v;};
    const attrs=[0,0,0].map(()=>Math.floor((dado(6)+dado(6)+dado(6)-10)/2));
    // Cada característica tem sua própria rolagem na tabela, conforme p. 269.
    const faixa=()=>capacidades.find(x=>dadoAtual<=x.max);let dadoAtual=dado(100);const mods=faixa().mods;dadoAtual=dado(100);const sentidos=faixa().sentidos;dadoAtual=dado(100);const comunicacao=faixa().comunicacao;dadoAtual=dado(100);const q=faixa();
    function poderes(tab,n){const result=[];let tentativas=0;while(result.length<n){C.exigir(++tentativas<1000,'Não foi possível gerar poderes distintos.');const r=dado(100),p=tab.find(x=>r<=x[0])[1];if(!result.includes(p))result.push(p);}return result;}
    const i={grau,int:attrs[0]+mods[0],sab:attrs[1]+mods[1],car:attrs[2]+mods[2],sentidos,comunicacao,menores:poderes(menores,q.menores),maiores:poderes(maiores,q.maiores),atributoChave:'Carisma',rolagens:registro};
    if(i.maiores.includes('+1 em um atributo do usuário'))i.atributoUsuario=['Força','Destreza','Constituição','Inteligência','Sabedoria','Carisma'][dado(6)-1];return i;
  }
  return {gerar,menores,maiores,capacidades};
})();
