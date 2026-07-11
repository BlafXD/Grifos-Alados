// ═══════════════════════════════════════════════════════════════════
//  CULINARIA.JS — Sub-aba "🍳 Culinária" (Consultas rápidas)
//  Calculadora "Fabricar prato" (com Tempero Especial) + tabelas de
//  consulta (Tab. 4-7 Ingredientes, 4-8 Pratos) + cards de regra.
//  Lê window.GA_CULINARIA. Reutiliza .vc-* / .cr-* / .prog-table.
// ═══════════════════════════════════════════════════════════════════
(function () {
  'use strict';

  const esc = window.GA_esc;
  const nl2br = window.GA_nl2br;
  const semAcento = window.GA_semAcento;

  function fmtT(v) { return 'T$ ' + v; }

  // Nome de ingrediente com a nuvem de descrição (ga-tip: hover mostra,
  // clique fixa para copiar). Sem descrição, devolve só o nome escapado.
  function ingTip(nome) {
    const C = window.GA_CULINARIA;
    const ing = (C.INGREDIENTES || []).find(i => i.nome === nome);
    if (!ing || !ing.desc) return esc(nome);
    return `<span class="ga-tip" tabindex="0" data-tip="${esc(ing.desc)}">${esc(nome)}</span>`;
  }

  // Resultado da calculadora para o prato p (com/sem Tempero Especial).
  function montarResultado(p, tempero) {
    const C = window.GA_CULINARIA;
    const ings = p.ingredientes
      .map(n => `${ingTip(n)} <span class="cul-ing-preco">(${fmtT(C.PRECO_ING[n] || 0)})</span>`)
      .join(' · ');
    const custo = tempero ? p.custo + C.ESPECIARIAS : p.custo;
    const cd = tempero ? p.cd + 5 : p.cd;

    let blocoTempero = '';
    if (tempero) {
      let efeito;
      if (p.cat === 'num') {
        efeito = 'Bônus numérico aumenta em <strong>+1</strong> (incluindo rolagens de dados).';
      } else if (p.cat === 'pvpm') {
        const novo = Math.floor(p.tempVal * 1.5);
        efeito = `${p.tempTipo} temporários aumentam em <strong>+50%</strong>: ${p.tempVal} → <strong>${novo} ${esc(p.tempTipo)}</strong>.`;
      } else {
        efeito = 'Este efeito <strong>não é aprimorado</strong> pelo Tempero Especial.';
      }
      blocoTempero = `
        <div class="cul-res-tempero">
          <span class="cul-res-tempero-tag">✨ Tempero Especial</span>
          <span>+1 porção de especiarias (${fmtT(C.ESPECIARIAS)}) · CD +5. ${efeito}</span>
        </div>`;
    }

    return `
      <div class="cul-res-nome">${esc(p.nome)}</div>
      <div class="cul-res-flavor">${esc(p.flavor)}</div>
      <div class="cul-res-beneficio">🎁 ${esc(p.beneficio)}</div>
      <div class="cul-res-grade">
        <span class="cul-res-rot">🧺 Ingredientes</span><span>${ings}</span>
        <span class="cul-res-rot">💰 Custo p/ cozinhar</span><span>${fmtT(custo)} <em>— faz comida para o grupo (~5)</em></span>
        <span class="cul-res-rot">🎲 Teste</span><span>Ofício (cozinheiro), CD <strong>${cd}</strong>${tempero ? ' <em>(' + p.cd + ' + 5)</em>' : ''}</span>
        <span class="cul-res-rot">🏪 Comprar pronto</span><span>${fmtT(p.preco)} <em>— porção individual</em></span>
      </div>
      ${blocoTempero}`;
  }

  // tabela genérica (.prog-table) com linhas pesquisáveis (data-busca por <tr>).
  function tabelaPratos(pratos) {
    const linhas = pratos.map(p => {
      const busca = semAcento([p.nome, p.beneficio, p.ingredientes.join(' ')].join(' '));
      return `<tr data-busca="${esc(busca)}">
        <td><strong>${esc(p.nome)}</strong></td>
        <td>${esc(p.beneficio)}</td>
        <td>${p.ingredientes.map(ingTip).join(', ')}</td>
        <td>${fmtT(p.custo)}</td>
        <td>${p.cd}</td>
        <td>${fmtT(p.preco)}</td>
      </tr>`;
    }).join('');
    return `<div class="prog-table-wrap"><table class="prog-table">
      <caption>Tabela 4-8 — Pratos Especiais</caption>
      <thead><tr><th>Prato</th><th>Benefício</th><th>Ingredientes</th><th>Custo¹</th><th>CD</th><th>Preço²</th></tr></thead>
      <tbody>${linhas}</tbody></table></div>
      <p class="prog-table-nota">¹ Cozinhar gasta os ingredientes e faz comida para o grupo. ² Preço de uma porção individual comprada pronta.</p>`;
  }

  function tabelaIngredientes(ings) {
    const linhas = ings.map(i => `<tr data-busca="${esc(semAcento(i.nome + ' ' + (i.desc || '')))}">
        <td><strong>${esc(i.nome)}</strong></td>
        <td>${fmtT(i.preco)}</td>
        <td class="cul-ing-desc">${esc(i.desc || '—')}</td>
      </tr>`).join('');
    return `<div class="prog-table-wrap"><table class="prog-table">
      <caption>Tabela 4-7 — Ingredientes</caption>
      <thead><tr><th>Ingrediente</th><th>Preço</th><th>Descrição</th></tr></thead>
      <tbody>${linhas}</tbody></table></div>
      <p class="prog-table-nota">Preços de insumos de ótima qualidade. Cada ingrediente ocupa 0,5 espaço.
        Nos pratos e na calculadora, passe o mouse no nome do ingrediente para ver a descrição (clique fixa a nuvem).</p>`;
  }

  function cardRegra(r) {
    const busca = semAcento([r.titulo, r.texto].join(' '));
    return `
      <details class="vc-card vc-card--regra" data-busca="${esc(busca)}">
        <summary class="vc-card-cab"><span class="vc-card-nome">${esc(r.titulo)}</span></summary>
        <div class="vc-card-corpo"><div class="vc-regras">${nl2br(r.texto)}</div></div>
      </details>`;
  }

  function render() {
    const cont = document.getElementById('culinaria-content');
    if (!cont) return;
    const C = window.GA_CULINARIA;
    if (!C || !Array.isArray(C.PRATOS) || !C.PRATOS.length) {
      cont.innerHTML = `<div class="cr-erro"><strong>Os dados não carregaram.</strong><br>
        Verifique se <code>js/culinaria-data.js</code> está incluído antes de <code>js/culinaria.js</code>.</div>`;
      return;
    }

    const opcoes = C.PRATOS
      .map((p, i) => `<option value="${i}">${esc(p.nome)}</option>`).join('');

    cont.innerHTML = `
      <div class="cr-cabecalho">
        <h1>🍳 Culinária</h1>
        <p class="cr-sub">Regras avançadas de culinária (Tormenta20): monte um prato na calculadora ou consulte ingredientes, pratos e regras.</p>
      </div>

      <div class="cul-calc">
        <div class="cul-calc-cab">🍳 Fabricar prato</div>
        <div class="cul-calc-controles">
          <select id="culSel" class="cul-sel" aria-label="Prato especial">${opcoes}</select>
          <label class="cul-tempero" title="Gasta uma porção de especiarias; +5 na CD; aprimora o benefício">
            <input type="checkbox" id="culTempero"> ✨ Tempero Especial
          </label>
        </div>
        <div id="culResultado" class="cul-resultado"></div>
      </div>

      <input class="cr-busca" type="text" placeholder="Buscar prato ou regra (defesa, PM temporário, tempero…)" autocomplete="off">

      <div class="vc-grupo">
        <h2 class="vc-grupo-titulo">📖 Regras</h2>
        <div class="vc-lista">${C.REGRAS.map(cardRegra).join('')}</div>
      </div>

      <div class="vc-grupo">
        <h2 class="vc-grupo-titulo">🍽 Pratos Especiais</h2>
        ${tabelaPratos(C.PRATOS)}
      </div>

      <div class="vc-grupo cul-grupo-ing">
        <h2 class="vc-grupo-titulo">🧺 Ingredientes</h2>
        ${tabelaIngredientes(C.INGREDIENTES)}
      </div>`;

    // ── calculadora ──
    const sel  = cont.querySelector('#culSel');
    const temp = cont.querySelector('#culTempero');
    const out  = cont.querySelector('#culResultado');
    function atualizar() {
      const p = C.PRATOS[+sel.value] || C.PRATOS[0];
      out.innerHTML = montarResultado(p, temp.checked);
    }
    sel.addEventListener('change', atualizar);
    temp.addEventListener('change', atualizar);
    atualizar();

    // ── busca (filtra regras, tabela de pratos E tabela de ingredientes) ──
    const busca = cont.querySelector('.cr-busca');
    busca.addEventListener('input', () => {
      const termo = semAcento(busca.value.trim());
      cont.querySelectorAll('.vc-card').forEach(c => {
        const bate = !termo || c.dataset.busca.indexOf(termo) >= 0;
        c.style.display = bate ? '' : 'none';
        c.open = !!termo && bate;
      });
      cont.querySelectorAll('.prog-table tbody tr[data-busca]').forEach(tr => {
        tr.style.display = (!termo || tr.dataset.busca.indexOf(termo) >= 0) ? '' : 'none';
      });
    });
  }

  function init() {
    if (!document.getElementById('culinaria-content')) return;
    try { render(); }
    catch (err) {
      console.error('[culinaria] falha ao renderizar:', err);
      const cont = document.getElementById('culinaria-content');
      if (cont) cont.innerHTML = `<div class="cr-erro"><strong>Erro ao montar a aba:</strong><br>${esc(err && err.message || err)}</div>`;
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
