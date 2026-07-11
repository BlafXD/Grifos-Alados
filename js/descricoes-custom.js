// ════════════════════════════════════════════════════════════════════
//  DESCRICOES-CUSTOM.JS — Descrições penduradas em trechos de texto
//  Localização: /grifos-alados/js/descricoes-custom.js
//
//  O mestre seleciona um trecho ("Espada") numa caixa de texto rico e
//  clica em "📖 Descrição": abre um modal para ESCREVER a descrição ou
//  BUSCAR uma pronta na base (itens, magias, condições, culinária,
//  poderes concedidos). O trecho vira <span class="ga-tip" data-tip="…">
//  — a mesma nuvem dos termos de regra (itens-descricoes.js): aparece ao
//  passar o mouse e FIXA ao clicar (para copiar).
//
//  Consumidores: monstros.js (caixas do Combate) e mapa.js (nós do Mapa).
//  API: GA_Tip.editarSelecao(editorEl, aoConcluir) → true se abriu;
//       GA_Tip.abrirEditor({termo, atual, onSalvar, onRemover}).
// ════════════════════════════════════════════════════════════════════
window.GA_Tip = (function () {
  'use strict';

  const esc = window.GA_esc;

  // Colagens (PDF etc.) entram SEM quebras de linha: tudo vira um
  // parágrafo único — é assim que a nuvem exibe o texto.
  function limparColagem(t) {
    return String(t == null ? '' : t).replace(/\s+/g, ' ').trim();
  }

  // Ficha de atributos (texto puro) de uma arma/armadura do catálogo da
  // Loja (LojaCompleta.statsDeItem): dano/crítico/tipo/alcance/peso das
  // armas; defesa/penalidade/peso das armaduras. '' se o item não tiver
  // stats lá. Assim a nuvem já nasce com os números, além da descrição.
  function statsTexto(nome) {
    const LC = (typeof LojaCompleta !== 'undefined') ? LojaCompleta : window.LojaCompleta;
    if (!LC || !LC.statsDeItem) return '';
    const st = LC.statsDeItem(nome);
    if (!st) return '';
    const p = [];
    if (st.kind === 'weapon') {
      if (st.dano)         p.push('Dano ' + st.dano);
      if (st.critico)      p.push('Crítico ' + String(st.critico).replace(/[xX]/g, '×'));
      if (st.tipo)         p.push(st.tipo);
      if (st.alcance)      p.push(st.alcance);
      if (st.peso != null) p.push(st.peso + ' esp.');
      return p.length ? '⚔ ' + p.join(' · ') : '';
    }
    if (st.kind === 'armor') {
      if (st.bonus != null) p.push('Defesa +' + st.bonus);
      if (st.penalidade)    p.push('Penalidade ' + st.penalidade);
      if (st.peso != null)  p.push(st.peso + ' esp.');
      return p.length ? '🛡 ' + p.join(' · ') : '';
    }
    return '';
  }

  // ── Índice de busca (montado na 1ª abertura; toda fonte é opcional) ─
  let _indice = null;
  function indice() {
    if (_indice) return _indice;
    const lista = [];
    const add = (nome, texto, fonte) => {
      nome = String(nome || '').trim();
      texto = limparColagem(texto);
      if (nome && texto) lista.push({ nome, texto, fonte, busca: window.GA_semAcento(nome) });
    };
    const cap = s => s.charAt(0).toUpperCase() + s.slice(1);

    (((window.GA_CONDICOES || {}).LISTA) || []).forEach(c =>
      add(c.nome, c.texto + (c.tipo ? ' Efeito de ' + c.tipo.toLowerCase() + '.' : ''), 'condição'));
    // Descrições de itens (lore) indexadas por nome sem acento; D1 vence D2.
    const lore = {};
    const D1 = window.GA_ITENS_DESC || {};
    const D2 = window.GA_ITENS_DESC_EXTRA || {};
    Object.keys(D2).forEach(k => { lore[window.GA_semAcento(k)] = { nome: cap(k), texto: D2[k] }; });
    Object.keys(D1).forEach(k => { lore[window.GA_semAcento(k)] = { nome: cap(k), texto: D1[k] }; });
    // Armas e armaduras do catálogo entram PRIMEIRO, com a ficha de
    // atributos + a lore (quando houver). O resto entra como item comum.
    const usados = {};
    const LC = (typeof LojaCompleta !== 'undefined') ? LojaCompleta : window.LojaCompleta;
    if (LC && LC.catalogoNomes) {
      LC.catalogoNomes().forEach(it => {
        if (it.kind !== 'weapon' && it.kind !== 'armor') return;
        const stats = statsTexto(it.nome);
        if (!stats) return;
        const chave = window.GA_semAcento(it.nome);
        const l = lore[chave];
        add(it.nome, stats + (l && l.texto ? ' — ' + l.texto : ''),
            it.kind === 'weapon' ? 'arma' : 'armadura');
        usados[chave] = true;
      });
    }
    Object.keys(lore).forEach(chave => {
      if (usados[chave]) return;
      add(lore[chave].nome, lore[chave].texto, 'item');
    });
    (((window.Magias || {}).TODAS) || []).forEach(m => add(m.nome, m.descricao, 'magia'));
    const C = window.GA_CULINARIA;
    if (C) {
      (C.INGREDIENTES || []).forEach(i => add(i.nome, i.desc, 'ingrediente'));
      (C.PRATOS || []).forEach(p => add(p.nome, (p.flavor || '') + ' Benefício: ' + (p.beneficio || '') + '.', 'prato'));
    }
    (((window.GA_DEVOTOS || {}).poderes) || []).forEach(p =>
      add(p.nome, (p.magica ? '✨ Habilidade mágica. ' : '') + p.texto, 'poder concedido'));

    _indice = lista;
    return lista;
  }

  function buscar(termo) {
    termo = window.GA_semAcento(String(termo || '').trim());
    if (termo.length < 2) return [];
    const comeca = [], contem = [];
    for (const it of indice()) {
      if (it.busca.indexOf(termo) === 0) comeca.push(it);
      else if (it.busca.indexOf(termo) >= 0) contem.push(it);
    }
    return comeca.concat(contem).slice(0, 12);
  }

  // ── Modal de edição ─────────────────────────────────────────────────
  //  opts: { termo, atual, onSalvar(texto), onRemover() }
  function abrirEditor(opts) {
    opts = opts || {};
    // a nuvem pode estar fixada no próprio termo — solta antes de abrir
    // o modal, para não ficar flutuando por cima dele
    if (window.ItensDescricoes && window.ItensDescricoes.fecharNuvem) window.ItensDescricoes.fecharNuvem();
    const overlay = window.GA_abrirModal(`
      <div class="ga-modal-cab">
        <strong>📖 Descrição do trecho</strong>
        <button class="ga-modal-x" data-ga-fechar title="Fechar (Esc)">✕</button>
      </div>
      <p class="gd-termo">Trecho: <strong>${esc(opts.termo || '')}</strong></p>
      <input class="gd-busca" type="text" autocomplete="off"
             placeholder="🔎 Buscar descrição pronta (itens, magias, condições, pratos, poderes…)">
      <div class="gd-resultados"></div>
      <textarea class="gd-texto"
                placeholder="…ou escreva aqui a descrição com as suas palavras.">${esc(opts.atual || '')}</textarea>
      <p class="gd-dica">Cole textos à vontade — as quebras de linha são juntadas sozinhas.
        No texto, passe o mouse no trecho para ver a nuvem e CLIQUE no trecho para fixá-la (e copiar dela).</p>
      <div class="gd-acoes">
        ${opts.atual ? '<button type="button" class="gd-btn gd-btn--remover" data-gd="remover">🗑 Remover descrição</button>' : ''}
        <button type="button" class="gd-btn" data-gd="aplicar">💾 Aplicar</button>
      </div>`);
    overlay.classList.add('gd-overlay');

    const busca = overlay.querySelector('.gd-busca');
    const resultados = overlay.querySelector('.gd-resultados');
    const ta = overlay.querySelector('.gd-texto');

    // busca na base → lista clicável; clicar preenche a caixa de texto
    busca.addEventListener('input', () => {
      const achados = buscar(busca.value);
      resultados.innerHTML = achados.map((it, i) => `
        <button type="button" class="gd-res-item" data-gd-res="${i}">
          <span class="gd-res-fonte">${esc(it.fonte)}</span><strong>${esc(it.nome)}</strong>
          <span class="gd-res-previa">${esc(it.texto.slice(0, 110))}</span>
        </button>`).join('');
      resultados._achados = achados;
    });
    resultados.addEventListener('click', e => {
      const btn = e.target.closest('[data-gd-res]');
      if (!btn || !resultados._achados) return;
      const it = resultados._achados[+btn.dataset.gdRes];
      if (it) { ta.value = it.texto; ta.focus(); }
    });

    // colagem SEM quebras de linha (junta tudo num parágrafo)
    ta.addEventListener('paste', e => {
      e.preventDefault();
      const limpo = limparColagem((e.clipboardData || window.clipboardData).getData('text/plain'));
      const ini = ta.selectionStart, fim = ta.selectionEnd;
      ta.value = ta.value.slice(0, ini) + limpo + ta.value.slice(fim);
      ta.selectionStart = ta.selectionEnd = ini + limpo.length;
    });

    overlay.addEventListener('click', e => {
      const btn = e.target.closest('[data-gd]');
      if (!btn) return;
      if (btn.dataset.gd === 'remover') {
        if (opts.onRemover) opts.onRemover();
        overlay._fechar();
        return;
      }
      if (btn.dataset.gd === 'aplicar') {
        const texto = limparColagem(ta.value);
        if (!texto) {
          // aplicar vazio = tirar a descrição (se havia uma)
          if (opts.atual && opts.onRemover) opts.onRemover();
        } else if (opts.onSalvar) {
          opts.onSalvar(texto);
        }
        overlay._fechar();
      }
    });

    (opts.atual ? ta : busca).focus();
    return overlay;
  }

  // ── Seleção → descrição ─────────────────────────────────────────────
  //  Captura a seleção atual DENTRO de editorEl. Se ela toca um
  //  <span class="ga-tip"> existente, edita/remove aquele; senão embrulha
  //  o trecho num novo span. aoConcluir() roda após qualquer mudança
  //  (o chamador salva o innerHTML do jeito dele). Retorna true se abriu.
  function editarSelecao(editor, aoConcluir) {
    if (!editor) return false;
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return false;
    const range = sel.getRangeAt(0).cloneRange();
    if (!editor.contains(range.commonAncestorContainer)) return false;

    // descrição existente tocada pela seleção (ou cursor dentro dela)?
    const anc = range.commonAncestorContainer;
    const ancEl = anc.nodeType === 1 ? anc : anc.parentElement;
    let alvo = ancEl && ancEl.closest ? ancEl.closest('.ga-tip') : null;
    if (alvo && !editor.contains(alvo)) alvo = null;
    if (!alvo) {
      const tips = editor.querySelectorAll('.ga-tip');
      for (let i = 0; i < tips.length; i++) {
        if (sel.containsNode(tips[i], true)) { alvo = tips[i]; break; }
      }
    }

    if (!alvo && range.collapsed) return false;   // nada selecionado

    const termo = (alvo ? alvo.textContent : range.toString()).trim();
    if (!termo) return false;

    abrirEditor({
      termo: termo.length > 80 ? termo.slice(0, 80) + '…' : termo,
      atual: alvo ? (alvo.getAttribute('data-tip') || '') : '',
      onSalvar: texto => {
        if (alvo) {
          alvo.setAttribute('data-tip', texto);
        } else {
          const span = document.createElement('span');
          span.className = 'ga-tip';
          span.setAttribute('tabindex', '0');
          span.setAttribute('data-tip', texto);
          try {
            range.surroundContents(span);
          } catch (err) {
            // seleção cruzando negrito/grifo: extrai e re-insere
            span.appendChild(range.extractContents());
            range.insertNode(span);
          }
        }
        if (aoConcluir) aoConcluir();
      },
      onRemover: () => {
        if (!alvo) return;
        while (alvo.firstChild) alvo.parentNode.insertBefore(alvo.firstChild, alvo);
        alvo.parentNode.removeChild(alvo);
        editor.normalize();
        if (aoConcluir) aoConcluir();
      },
    });
    return true;
  }

  return { editarSelecao, abrirEditor, buscar, _limparColagem: limparColagem };
})();
