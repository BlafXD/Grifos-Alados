// Equipamento inicial: T20, p. 140, 164–167 e 334. Sem alterar o catálogo ou a loja.
window.GA_FichaEquipamento = (() => {
  'use strict';
  const RIQUEZA = [0, 0, 300, 600, 1000, 2000, 3000, 5000, 7000, 10000, 13000, 19000, 27000, 36000, 49000, 66000, 88000, 110000, 150000, 200000, 260000];
  const PRECO_MELHORIA = [0, 300, 3000, 9000, 18000];
  const PRECO_ENCANTO = [0, 18000, 36000, 72000];
  const pick = a => a[Math.floor(Math.random() * a.length)];
  const norm = s => String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const SIMPLES = ['Adaga','Espada curta','Foice','Clava','Lança','Maça','Bordão','Pique','Tacape'];
  const MARCIAIS = ['Machadinha','Martelo','Cimitarra','Espada longa','Florete','Machado de batalha','Mangual','Martelo de guerra','Picareta','Tridente','Alabarda','Alfange','Gadanho','Lança montada','Machado de guerra','Montante'];
  // Seleção conservadora: sem escolhas pendentes, pré-requisitos ou incompatibilidades.
  const MELHORIAS = {
    arma: [['Certeira', '+1 em testes de ataque'], ['Cruel', '+1 em dano'], ['Equilibrada', '+2 em manobras']],
    armaduraLeve: [['Ajustada', 'Penalidade de armadura reduzida em 1'], ['Selada', '+1 em testes de resistência']],
    armaduraPesada: [['Ajustada', 'Penalidade de armadura reduzida em 1'], ['Selada', '+1 em testes de resistência']],
    escudo: [['Ajustado', 'Penalidade de armadura reduzida em 1'], ['Selado', '+1 em testes de resistência']],
    esoterico: [['Canalizador', '+1 no limite de PM das magias'], ['Energético', '+1d6 em magias que causam dano']]
  };
  const ENCANTOS = {
    arma: [['Formidável', '+2 em ataque e dano'], ['Flamejante', '+1d6 de dano de fogo'], ['Congelante', '+1d6 de dano de frio']],
    armaduraLeve: [['Defensor', '+2 na Defesa']],
    armaduraPesada: [['Defensor', '+2 na Defesa']],
    escudo: [['Defensor', '+2 na Defesa']]
  };
  function gerar(f, nivel, modo, fundamentalista) {
    if (!['nenhum', 'gastar', 'gratis'].includes(modo)) throw new Error('Modo de equipamento inválido.');
    const riqueza = nivel === 1 ? Array.from({length:4}, () => 1 + Math.floor(Math.random()*6)).reduce((a,b)=>a+b,0) : RIQUEZA[nivel];
    f.tibares = riqueza;
    f.inventario = [];
    if (modo === 'nenhum') return;
    if (typeof LojaCompleta === 'undefined') throw new Error('O catálogo de equipamento ainda não está disponível.');
    const deus = ((window.GA_DEVOTOS || {}).deuses || []).find(d => d.nome === f.divindade);
    let saldo = riqueza;
    const catalogo = LojaCompleta.catalogoNomes().map(it => ({...it, st: LojaCompleta.statsDeItem(it.nome)}))
      .filter(it => Number.isFinite(it.st.preco) && it.st.preco > 0);
    const grupos = [
      it => it.kind === 'weapon' && (fundamentalista ? (deus && norm(it.nome) === norm(deus.arma)) : SIMPLES.includes(it.nome) || (/marciais/i.test(f.proficiencias) && MARCIAIS.includes(it.nome))),
      it => it.kind === 'armor' && !/Escudos/.test(it.categoria) && (!/Pesadas/.test(it.categoria) || /armaduras pesadas/i.test(f.proficiencias)) && (!deus || deus.chave !== 'allihanna' || ['Armadura acolchoada','Armadura de couro','Gibão de peles'].includes(it.nome)),
      it => it.categoria === 'Esotéricos',
      it => it.kind === 'misc' && /Equipamento de Aventura|Ferramentas|Vestuário/.test(it.categoria)
    ];
    // Uma arma, uma armadura, um esotérico e até três utilidades. Cada compra e
    // melhoria usa o saldo virtual, mesmo quando o jogador conserva as moedas.
    for (const filtro of [...grupos, grupos[3], grupos[3]]) {
      const pool = catalogo.filter(it => filtro(it) && it.st.preco <= saldo && !f.inventario.some(x => x.nome === it.nome));
      if (!pool.length) continue;
      const it = pick(pool), st = it.st, M = window.GA_MATERIAIS;
      const slot = M && M.slotDoItem(it.nome, st);
      let preco = st.preco, extras = [], nMel = 0, nEnc = 0;
      const opcoes = (MELHORIAS[slot] || []).map(([nome, efeito]) => ({nome, efeito, material: 0}));
      if (M && slot) for (const mat of M.queCabem(it.nome, st, {raros:false})) {
        const regra = mat.slots[slot];
        if (Number.isFinite(regra.preco) && !(deus && deus.chave === 'allihanna' && slot !== 'arma' && slot !== 'esoterico')) opcoes.push({nome:mat.nome, efeito:regra.efeito, material:regra.preco, mat:true});
      }
      let temMaterial = false;
      while (nMel < 4 && Math.random() < 0.8) {
        const delta = PRECO_MELHORIA[nMel+1] - PRECO_MELHORIA[nMel];
        const possiveis = opcoes.filter(o => !extras.some(x=>x.nome===o.nome) && !(o.mat && temMaterial) && preco + delta + o.material <= saldo);
        if (!possiveis.length) break;
        const o = pick(possiveis); extras.push(o); preco += delta + o.material; nMel++; temMaterial ||= !!o.mat;
      }
      while (nEnc < 3 && Math.random() < 0.75) {
        const delta = PRECO_ENCANTO[nEnc+1] - PRECO_ENCANTO[nEnc];
        const possiveis = (ENCANTOS[slot] || []).filter(([nome]) => !extras.some(x=>x.nome===nome) && !(fundamentalista && deus && deus.chave === 'tenebra' && nome === 'Flamejante'));
        if (!possiveis.length || preco + delta > saldo) break;
        const [nome, efeito] = pick(possiveis); extras.push({nome, efeito}); preco += delta; nEnc++;
      }
      saldo = Math.round((saldo - preco)*100)/100;
      f.inventario.push({id:'gi'+Math.random().toString(36).slice(2), nome:it.nome, qtd:1, espacos:Number.isFinite(st.peso)?st.peso:1, cada:true,
        obs: extras.map(x=>x.nome).join(', '),
        notas: 'Preço total: T$ '+preco+'. '+nMel+' melhoria(s), '+nEnc+' encanto(s).\n'+extras.map(x=>x.nome+': '+x.efeito).join('\n')+
          (deus && deus.chave === 'khalmyr' && nEnc ? '\nCriado por devoto de Khalmyr.' : '') });
    }
    f.tibares = modo === 'gastar' ? saldo : riqueza;
    f.anotacoes += '\nEquipamento inicial: orçamento T$ '+riqueza+'; itens T$ '+Math.round((riqueza-saldo)*100)/100+'. '+(modo === 'gastar'?'Custo descontado.':'Moedas preservadas.')+' T20, p. 140. Itens no inventário; configure os ataques e equipamentos usados.';
  }
  return {gerar, RIQUEZA};
})();
