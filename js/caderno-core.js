// O que sobrou do Caderno da campanha antigo e ainda tem dono (faxina de
// 25/11/2026): as ferramentas do Caderno do mestre (só a Ascensão usa) e duas
// listas de consulta que o 🔎 Consultor de tudo indexa. Saíram os testes
// estendidos, os objetivos, os itens inteligentes/amaldiçoados e a publicação
// na mesa — a tela deles foi apagada com o Caderno velho e nada mais os chamava.
window.GA_CadernoCore = (() => {
  'use strict';
  const copiar=x=>JSON.parse(JSON.stringify(x));
  const exigir=(v,m)=>{if(!v)throw Error(m);};
  const uid=()=>crypto.randomUUID();
  // Para o Consultor: as regras opcionais oficiais e onde estão no livro.
  const opcionais=[
    ['objetivos','Objetivos Heroicos','Heróis de Arton, pp. 292–293'],
    ['dominios','Domínios e regência','Heróis de Arton, pp. 314–327'],
    ['inteligentes','Itens mágicos inteligentes','Heróis de Arton, pp. 269–270'],
    ['maldicoes','Itens amaldiçoados','Heróis de Arton, pp. 271–274'],
    ['ascensao','Jogar como um deus menor','Deuses de Arton, pp. 233–237'],
    ['buscasOusadas','Buscas ousadas','Tormenta20, tempo entre aventuras'],
    ['testesAbertos','Testes estendidos abertos','Tormenta20, p. 223'],
    ['testesCumulativos','Testes estendidos cumulativos','Tormenta20, p. 223']
  ];
  // Para o Consultor: as sete categorias de Objetivo Heroico (Heróis de Arton, pp. 292–293).
  const objetivos=[
    ['Desafio','+2d4 PM temporários.','Fatigado','+1 em dois atributos diferentes.'],
    ['Descoberta','+2 em testes de Inteligência e perícias desse atributo.','Frustrado','+1 em Inteligência e um poder geral.'],
    ['Liderança','+2 em testes de Carisma e perícias desse atributo.','Alquebrado','+1 em Carisma e uma estrutura ou equivalente definido pelo mestre.'],
    ['Obra','+2 em resistências e +1d4 PM temporários.','Abalado','+1 em Constituição e a estrutura construída.'],
    ['Riqueza','Custo de habilidades reduzido em 1 PM.','Alquebrado','Escolha uma habilidade: custo reduzido em 2 PM (cumulativo). Pode gastar o dinheiro guardado.'],
    ['Salvação','+2 na Defesa.','Vulnerável','+2 na Defesa e resistências; parceiro escolhido pelo mestre.'],
    ['Vingança','Uma vez por rodada, +5 em uma rolagem de dano.','Fraco','+1 em Força e um poder de combate.']
  ].map(([nome,beneficio,penalidade,conclusao])=>({nome,beneficio,penalidade,conclusao}));
  // O caderno do mestre guarda só a Ascensão. Um caderno salvo na época do
  // Caderno antigo traz outros campos: o store os carrega junto e não mexe.
  function novo(){return {versao:1,revisao:0,ascensoes:[]};}
  return {novo,copiar,exigir,uid,opcionais,objetivos};
})();
