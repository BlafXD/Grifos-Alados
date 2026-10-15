// ═══════════════════════════════════════════════════════════════════
//  PNJS.JS — Sub-aba "👥 PNJs & Tavernas" (Consultas rápidas, só mestre)
//  Três ferramentas sobre js/pnjs-data.js:
//    • DC de Reação Social — Vontade do PNJ (Tabela 6-1) e o
//      modificador de persuasão da atitude atual (p. 259).
//    • PNJ Relâmpago — nome de um povo (p. 361/364) + arquétipo
//      (Cap. 6, p. 257–258) + atitude inicial, tudo sorteado.
//    • Taverna Instantânea — porte econômico da comunidade (p. 270–273),
//      um prato sorteado de js/culinaria-data.js e um dono sorteado
//      pelo mesmo gerador de PNJ.
//  Reaproveita as classes .cul-calc/.cul-sel/.cul-resultado (já usadas
//  pela calculadora de Culinária) para não duplicar CSS.
// ═══════════════════════════════════════════════════════════════════
(function () {
  'use strict';

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }
  function sorteio(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  // Pantheon maior — mesma lista de js/deuses-visual-data.js (não repetida
  // como dependência de carregamento; são os 20 nomes do quadro de cada deus).
  const DEUSES_MAIORES = ['Aharadak', 'Allihanna', 'Arsenal', 'Azgher', 'Hyninn',
    'Kallyadranoch', 'Khalmyr', 'Lena', 'Lin-Wu', 'Marah', 'Megalokk', 'Nimb',
    'Oceano', 'Sszzaas', 'Tanna-Toh', 'Tenebra', 'Thwor', 'Thyatis', 'Valkaria', 'Wynna'];

  function regioesAtlas() {
    const O = window.GA_ORIGENS;
    if (!Array.isArray(O)) return [];
    const set = new Set();
    O.forEach(o => { if (o.livro === 'atlas' && o.regiao) o.regiao.split(/,\s*/).forEach(r => set.add(r)); });
    return Array.from(set);
  }

  // ── Gerador de nome por povo (js/pnjs-data.js → NOMES) ───────────
  function gerarNome(povoChave) {
    const N = window.GA_PNJS.NOMES;
    const chaves = Object.keys(N);
    const chave = povoChave && N[povoChave] ? povoChave : sorteio(chaves);
    const d = N[chave];

    if (d.composto3) {
      // táurico: prenome + linhagem + sobrenome, OU um nome único de plebeu
      if (Math.random() < 0.3 && d.unicos.length) {
        return { povo: d.nome, nome: sorteio(d.unicos), pagina: d.pagina };
      }
      return { povo: d.nome, nome: `${sorteio(d.prenomes)} ${sorteio(d.linhagens)} ${sorteio(d.sobrenomes)}`, pagina: d.pagina };
    }
    if (d.composto) {
      // humano/anão: primeiro nome + um padrão de sobrenome do livro
      const primeiro = sorteio(d.primeiros);
      if (chave === 'anao') {
        return { povo: d.nome, nome: `${primeiro} ${sorteio(d.sobrenomes)}`, pagina: d.pagina };
      }
      // humano: filho de / de um lugar do Atlas / de um deus / sem sobrenome
      const regioes = regioesAtlas();
      const opcoes = ['semSobrenome', 'filhoDe', 'deDeus'];
      if (regioes.length) opcoes.push('deLugar');
      const padrao = sorteio(opcoes);
      let nome = primeiro;
      if (padrao === 'filhoDe') {
        const outros = d.primeiros.filter(n => n !== primeiro);
        nome += ', filho(a) de ' + sorteio(outros.length ? outros : d.primeiros);
      } else if (padrao === 'deLugar') {
        nome += ' de ' + sorteio(regioes);
      } else if (padrao === 'deDeus') {
        nome += ' de ' + sorteio(DEUSES_MAIORES);
      }
      return { povo: d.nome, nome, pagina: d.pagina };
    }
    // simples: sorteio puro entre os exemplos literais do livro
    return { povo: d.nome, nome: sorteio(d.nomes), pagina: d.pagina };
  }

  // ── Tool A: DC de Reação Social ───────────────────────────────────
  function montarReacao() {
    const P = window.GA_PNJS;
    const cont = document.getElementById('pnjs-content');
    const patSel = cont.querySelector('#pnjPatamar');
    const forte  = cont.querySelector('#pnjForte').checked;
    const atSel  = cont.querySelector('#pnjAtitude');
    const out    = cont.querySelector('#pnjReacaoOut');

    const pat = P.PATAMARES.find(p => p.chave === patSel.value);
    const at  = P.ATITUDES.find(a => a.chave === atSel.value);
    const vontade = forte ? pat.forte : pat.fraca;

    out.innerHTML = `
      <div class="cul-res-nome">Vontade do PNJ: +${vontade}</div>
      <div class="cul-res-flavor">${esc(pat.nome)} (${esc(pat.exemplo)}) — perícia ${forte ? 'forte' : 'fraca'} para este conceito.</div>
      <div class="cul-res-beneficio">${esc(at.nome)}: ${esc(at.mod)}</div>
      <div class="cul-res-grade">
        <span class="cul-res-rot">ATITUDE</span><span>${esc(at.texto)}</span>
        <span class="cul-res-rot">MUDAR ATITUDE</span><span>${esc(P.MUDAR_ATITUDE)}</span>
      </div>`;
  }

  // ── Tool B: PNJ Relâmpago ─────────────────────────────────────────
  function montarPNJ() {
    const P = window.GA_PNJS;
    const cont = document.getElementById('pnjs-content');
    const povoSel = cont.querySelector('#pnjPovo');
    const out = cont.querySelector('#pnjGeradoOut');

    const { povo, nome, pagina } = gerarNome(povoSel.value || null);
    const arq = sorteio(P.ARQUETIPOS);
    const at  = sorteio(P.ATITUDES);

    out.innerHTML = `
      <div class="cul-res-nome">${esc(nome)}</div>
      <div class="cul-res-flavor">${esc(povo)} (Nomes em Arton, p. ${pagina}) — categoria de atitude inicial: ${esc(at.nome)}.</div>
      <div class="cul-res-beneficio">${esc(arq.nome)}</div>
      <div class="cul-res-grade"><span class="cul-res-rot">P. ${arq.pagina}</span><span>${esc(arq.texto)}</span></div>`;
  }

  // ── Tool C: Taverna Instantânea ───────────────────────────────────
  const COMUNIDADES = {
    aldeia: { nome: 'Aldeia', populacao: 'até 1.000 habitantes',
      economia: 'Um único armazém (ou mercadores ambulantes). Apenas itens de até T$ 50 estão disponíveis, em quantidades limitadas (1d6 exemplares de cada ou menos). Tem 1d4×T$ 100 em dinheiro disponível.' },
    vila: { nome: 'Vila', populacao: 'até 5.000 habitantes',
      economia: 'Um mercado com lojas e oficinas. Itens de até T$ 1.000 estão disponíveis; itens raros existem em quantidades limitadas (2d6 exemplares de cada) ou não existem. Tem 1d6×T$ 1.000 em dinheiro disponível.' },
    cidade: { nome: 'Cidade', populacao: 'até 25.000 habitantes',
      economia: 'Praticamente qualquer item ou serviço mundano está disponível. Itens acima de T$ 10.000 podem não estar disponíveis. Tem 2d4×T$ 10.000 em dinheiro disponível.' },
    metropole: { nome: 'Metrópole', populacao: '~100 mil habitantes (as maiores, como Valkaria e Tiberus, passam de 1 milhão)',
      economia: 'Oficinas locais, caravanas e navios do mundo inteiro suprem os bazares com tudo que se possa imaginar — o que falta nas lojas respeitáveis se acha no mercado clandestino, até itens mágicos em leilões exclusivos. O dinheiro disponível é virtualmente ilimitado.' },
  };

  function montarTaverna() {
    const cont = document.getElementById('pnjs-content');
    const tipoSel = cont.querySelector('#pnjComunidade');
    const out = cont.querySelector('#pnjTavernaOut');
    const c = COMUNIDADES[tipoSel.value];

    const C = window.GA_CULINARIA;
    const prato = (C && Array.isArray(C.PRATOS) && C.PRATOS.length) ? sorteio(C.PRATOS) : null;
    const dono = gerarNome(null);
    const atDono = sorteio(window.GA_PNJS.ATITUDES);

    out.innerHTML = `
      <div class="cul-res-nome">${esc(c.nome)} — ${esc(c.populacao)}</div>
      <div class="cul-res-flavor">${esc(c.economia)}</div>
      <div class="cul-res-grade">
        <span class="cul-res-rot">DONO(A)</span><span>${esc(dono.nome)} (${esc(dono.povo)}) — categoria de atitude com o grupo, de saída: ${esc(atDono.nome)}.</span>
        ${prato ? `<span class="cul-res-rot">NO CARDÁPIO</span><span><strong>${esc(prato.nome)}</strong> — ${esc(prato.flavor)} (${esc(prato.beneficio)}; T$ ${esc(prato.preco)})</span>` : ''}
      </div>
      <p class="mz-enc-nota" style="margin-top:0.6rem">O nome da taverna fica por sua conta — não há lista de nomes de estabelecimento no livro para sortear sem inventar.</p>`;
  }

  // ── Referência: arquétipos, atitudes e nomes ─────────────────────
  function cardArquetipo(a) {
    return `
      <details class="vc-card vc-card--regra">
        <summary class="vc-card-cab"><span class="vc-card-nome">${esc(a.nome)}</span> <span class="cul-ing-preco">p. ${a.pagina}</span></summary>
        <div class="vc-card-corpo"><div class="vc-regras">${esc(a.texto)}</div></div>
      </details>`;
  }
  function cardNomes(chave, d) {
    const lista = d.composto3
      ? [...d.prenomes, ...d.linhagens, ...d.sobrenomes, ...d.unicos]
      : d.composto
        ? [...d.primeiros, ...(d.sobrenomes || [])]
        : d.nomes;
    return `
      <details class="vc-card vc-card--regra">
        <summary class="vc-card-cab"><span class="vc-card-nome">${esc(d.nome)}</span> <span class="cul-ing-preco">p. ${d.pagina}</span></summary>
        <div class="vc-card-corpo">
          <div class="vc-regras">${esc(d.nota)}</div>
          <p class="cul-ing-preco" style="margin-top:0.5rem">Peças do livro: ${lista.map(esc).join(', ')}</p>
        </div>
      </details>`;
  }

  function render() {
    const cont = document.getElementById('pnjs-content');
    if (!cont) return;
    const P = window.GA_PNJS;
    if (!P) {
      cont.innerHTML = `<div class="cr-erro"><strong>Os dados não carregaram.</strong><br>
        Verifique se <code>js/pnjs-data.js</code> está incluído antes de <code>js/pnjs.js</code>.</div>`;
      return;
    }

    const opPatamar = P.PATAMARES.map(p => `<option value="${p.chave}">${esc(p.nome)}</option>`).join('');
    const opAtitude = P.ATITUDES.map(a => `<option value="${a.chave}" ${a.padrao ? 'selected' : ''}>${esc(a.nome)}</option>`).join('');
    const opPovo = '<option value="">🎲 qualquer povo</option>' +
      Object.keys(P.NOMES).map(k => `<option value="${k}">${esc(P.NOMES[k].nome)}</option>`).join('');
    const opComunidade = Object.keys(COMUNIDADES).map(k => `<option value="${k}">${esc(COMUNIDADES[k].nome)}</option>`).join('');

    cont.innerHTML = `
      <div class="cr-cabecalho">
        <h1>👥 PNJs &amp; Tavernas</h1>
        <p class="cr-sub">Três atalhos de preparo do mestre, tirados do Capítulo 6: O Mestre (atitude, arquétipos,
          nomes por povo) e da Culinária já cadastrada. Nenhum NPC aqui precisa de ficha — é só o que a cena exige.</p>
      </div>

      <div class="cul-calc">
        <div class="cul-calc-cab">🎯 DC de Reação Social</div>
        <div class="cul-calc-controles">
          <select id="pnjPatamar" class="cul-sel">${opPatamar}</select>
          <label class="cul-tempero"><input type="checkbox" id="pnjForte"> perícia forte p/ este PNJ</label>
          <select id="pnjAtitude" class="cul-sel">${opAtitude}</select>
        </div>
        <div id="pnjReacaoOut" class="cul-resultado"></div>
      </div>

      <div class="cul-calc">
        <div class="cul-calc-cab">🎭 PNJ Relâmpago</div>
        <div class="cul-calc-controles">
          <select id="pnjPovo" class="cul-sel">${opPovo}</select>
          <button type="button" id="pnjGerarBtn" class="urb-btn">🎲 Sortear PNJ</button>
        </div>
        <div id="pnjGeradoOut" class="cul-resultado"></div>
      </div>

      <div class="cul-calc">
        <div class="cul-calc-cab">🍺 Taverna Instantânea</div>
        <div class="cul-calc-controles">
          <select id="pnjComunidade" class="cul-sel">${opComunidade}</select>
          <button type="button" id="pnjTavernaBtn" class="urb-btn">🎲 Sortear taverna</button>
        </div>
        <div id="pnjTavernaOut" class="cul-resultado"></div>
      </div>

      <div class="vc-grupo">
        <h2 class="vc-grupo-titulo">🎭 Arquétipos de NPCs (p. 257–258)</h2>
        <div class="vc-lista">${P.ARQUETIPOS.map(cardArquetipo).join('')}</div>
      </div>

      <div class="vc-grupo">
        <h2 class="vc-grupo-titulo">🗣 Nomes em Arton (p. 361–364)</h2>
        <div class="vc-lista">${Object.keys(P.NOMES).map(k => cardNomes(k, P.NOMES[k])).join('')}</div>
      </div>`;

    cont.querySelector('#pnjPatamar').addEventListener('change', montarReacao);
    cont.querySelector('#pnjForte').addEventListener('change', montarReacao);
    cont.querySelector('#pnjAtitude').addEventListener('change', montarReacao);
    cont.querySelector('#pnjGerarBtn').addEventListener('click', montarPNJ);
    cont.querySelector('#pnjTavernaBtn').addEventListener('click', montarTaverna);

    montarReacao();
    montarPNJ();
    montarTaverna();
  }

  function init() {
    if (!document.getElementById('pnjs-content')) return;
    try { render(); }
    catch (err) {
      console.error('[pnjs] falha ao renderizar:', err);
      const cont = document.getElementById('pnjs-content');
      if (cont) cont.innerHTML = `<div class="cr-erro"><strong>Erro ao montar a aba:</strong><br>${esc(err && err.message || err)}</div>`;
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
