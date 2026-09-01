// ════════════════════════════════════════════════════════════════════
//  DESCRICOES-CUSTOM.JS — Descrições penduradas em trechos de texto
//  Localização: /grifos-alados/js/descricoes-custom.js
//
//  O mestre seleciona um trecho ("Espada") numa caixa de texto rico e
//  clica em "※ Descrição": abre um modal para ESCREVER a descrição ou
//  BUSCAR uma pronta na base (itens, magias, condições, culinária,
//  poderes concedidos). O trecho vira <span class="ga-tip" data-tip="…">
//  — a mesma nuvem dos termos de regra (itens-descricoes.js): aparece ao
//  passar o mouse e FIXA ao clicar (para copiar).
//
//  MAGIAS têm caminho próprio. Quando o trecho É o nome de uma magia (ou
//  quando se escolhe uma na busca), o modal abre com o TEXTO INTEGRAL
//  dela — estatísticas, descrição, truque e aprimoramentos, montados por
//  Magias.textoPuro — e com dois interruptores que refazem o texto:
//    • "É um pergaminho?"  → acrescenta o preço do pergaminho (30 × PM²),
//                            o custo de aprender (250 × PM) e o trabalho.
//    • "Texto completo"    → desmarcado, cai no resumo de uma linha.
//
//  Consumidores: monstros.js (caixas do Combate) e mapa.js (nós do Mapa).
//  API: GA_Tip.editarSelecao(editorEl, aoConcluir) → true se abriu;
//       GA_Tip.abrirEditor({termo, atual, onSalvar, onRemover}).
// ════════════════════════════════════════════════════════════════════
window.GA_Tip = (function () {
  'use strict';

  const esc = window.GA_esc;

  // Colagens (PDF etc.) entram SEM quebras de linha: tudo vira um
  // parágrafo único — o PDF quebra no meio da frase, e emendar é o que
  // deixa o texto legível na nuvem.
  function limparColagem(t) {
    return String(t == null ? '' : t).replace(/\s+/g, ' ').trim();
  }

  // Ao APLICAR, porém, as quebras que ESTÃO na caixa são de propósito —
  // o texto integral de uma magia vem em linhas, e é assim que ele tem
  // de chegar na nuvem. Aqui só se apara o fim de cada linha, se juntam
  // os espaços repetidos de dentro dela e se somem as linhas vazias
  // repetidas. O RECUO do começo fica: é ele que alinha os itens de um
  // aprimoramento. (A nuvem respeita tudo: white-space:pre-wrap em
  // .ga-tip-pop-txt.)
  function limparTexto(t) {
    return String(t == null ? '' : t)
      .replace(/\r\n?/g, '\n')
      .split('\n').map(l => l.replace(/\s+$/, '').replace(/(\S)[ \t]{2,}/g, '$1 ')).join('\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  }

  // Formata preço em Tibares do mesmo jeito que o resto do site (loja.js,
  // formatarPreco): inteiro sem casas quando é redondo, 2 casas quando não é.
  function precoTexto(v) {
    const n = parseFloat(v);
    if (isNaN(n)) return String(v);
    return n % 1 === 0 ? n.toFixed(0) : n.toFixed(2);
  }

  // Ficha de atributos (texto puro) de uma arma/armadura/item geral do
  // catálogo da Loja (LojaCompleta.statsDeItem): dano/crítico/tipo/alcance/
  // peso/preço das armas; defesa/penalidade/peso/preço das armaduras;
  // peso/preço dos itens gerais (poções, equipamento de aventura, comida
  // etc.). '' se o item não tiver stats lá. Assim a nuvem já nasce com os
  // números — incluindo o preço em T$ — além da descrição.
  function statsTexto(nome) {
    const LC = (typeof LojaCompleta !== 'undefined') ? LojaCompleta : window.LojaCompleta;
    if (!LC || !LC.statsDeItem) return '';
    const st = LC.statsDeItem(nome);
    if (!st) return '';
    const p = [];
    if (st.kind === 'weapon') {
      if (st.dano)          p.push('Dano ' + st.dano);
      if (st.critico)       p.push('Crítico ' + String(st.critico).replace(/[xX]/g, '×'));
      if (st.tipo)          p.push(st.tipo);
      if (st.alcance)       p.push(st.alcance);
      if (st.peso != null)  p.push(st.peso + ' esp.');
      if (st.preco != null) p.push('T$ ' + precoTexto(st.preco));
      return p.join(' · ');
    }
    if (st.kind === 'armor') {
      if (st.bonus != null)  p.push('Defesa +' + st.bonus);
      if (st.penalidade)     p.push('Penalidade ' + st.penalidade);
      if (st.peso != null)   p.push(st.peso + ' esp.');
      if (st.preco != null)  p.push('T$ ' + precoTexto(st.preco));
      return p.join(' · ');
    }
    if (st.kind === 'misc') {
      if (st.peso != null)   p.push(st.peso + ' esp.');
      if (st.preco != null)  p.push('T$ ' + precoTexto(st.preco));
      return p.join(' · ');
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
    // Armas, armaduras E itens gerais do catálogo entram PRIMEIRO, com a
    // ficha de atributos (peso + preço em T$, e dano/defesa quando houver)
    // + a lore (quando houver). O resto entra como item comum.
    const usados = {};
    const LC = (typeof LojaCompleta !== 'undefined') ? LojaCompleta : window.LojaCompleta;
    if (LC && LC.catalogoNomes) {
      LC.catalogoNomes().forEach(it => {
        const chave = window.GA_semAcento(it.nome);
        if (usados[chave]) return;   // mesmo nome em 2 categorias do catálogo — 1 entrada só
        const stats = statsTexto(it.nome);
        if (!stats) return;
        const l = lore[chave];
        const fonte = it.kind === 'weapon' ? 'arma' : it.kind === 'armor' ? 'armadura' : 'item';
        add(it.nome, stats + (l && l.texto ? ' — ' + l.texto : ''), fonte);
        usados[chave] = true;
      });
    }
    Object.keys(lore).forEach(chave => {
      if (usados[chave]) return;
      add(lore[chave].nome, lore[chave].texto, 'item');
    });
    // Magias entram com o resumo de uma linha; o texto de verdade é
    // montado ao escolher (magiaTexto). Uma entrada por NOME: a magia que
    // está nas duas listas aparece duas vezes em TODAS, e na busca isso
    // era só uma linha repetida.
    const vistas = {};
    (((window.Magias || {}).TODAS) || []).forEach(m => {
      const k = window.GA_semAcento(m.nome);
      if (vistas[k]) return;
      vistas[k] = true;
      add(m.nome, m.descricao, 'magia');
    });
    const C = window.GA_CULINARIA;
    if (C) {
      (C.INGREDIENTES || []).forEach(i => add(i.nome, i.desc, 'ingrediente'));
      (C.PRATOS || []).forEach(p => add(p.nome, (p.flavor || '') + ' Benefício: ' + (p.beneficio || '') + '.', 'prato'));
    }
    (((window.GA_DEVOTOS || {}).poderes) || []).forEach(p =>
      add(p.nome, (p.magica ? 'Habilidade mágica. ' : '') + p.texto, 'poder concedido'));

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

  // ── MAGIAS ──────────────────────────────────────────────────────────
  //  O índice guarda só o resumo de uma linha; o texto de verdade é
  //  montado na hora (magiaTexto), para os interruptores do modal
  //  poderem trocá-lo sem nova busca. Tudo vem de js/magias.js — sem ele
  //  carregado, o caminho de magia simplesmente não aparece.
  function _M() { return (typeof Magias !== 'undefined') ? Magias : window.Magias; }

  // Registro da magia pelo nome, sem acento. A mesma magia pode estar nas
  // listas arcana E divina (duas entradas em TODAS); guardamos a primeira
  // — nome, círculo e escola são os mesmos, e é só isso que se usa aqui.
  let _porNome = null;
  function magiaDe(nome) {
    const M = _M();
    if (!M || !M.TODAS) return null;
    if (!_porNome) {
      _porNome = {};
      M.TODAS.forEach(m => {
        const k = window.GA_semAcento(m.nome);
        if (!_porNome[k]) _porNome[k] = m;
      });
    }
    // o trecho grifado costuma vir com a pontuação da frase junto
    const limpo = String(nome || '').replace(/^[\s"'“”«»(\[]+|[\s"'“”«»)\].,;:!?]+$/g, '');
    return _porNome[window.GA_semAcento(limpo)] || null;
  }

  // As MESMAS linhas de preço da Loja (loja.js, _linhasPrecoMagia):
  // comprar o pergaminho (30 × PM²), aprender a magia (250 × PM, poder
  // Escriba Arcano) e o trabalho que isso custa (1 dia por PM).
  function linhasPergaminho(reg) {
    const M = _M();
    if (!reg || !M || !M.montarPergaminho) return [];
    const p = M.montarPergaminho(reg);
    const fmt = n => Number(n).toLocaleString('pt-BR');
    const dias = `${p.diasAprender} dia${p.diasAprender !== 1 ? 's' : ''}`;
    return [
      `Pergaminho: T$ ${fmt(p.precoPergaminho)} · Peso: ½ espaço`,
      `Aprender: +T$ ${fmt(p.precoAprender)} (total T$ ${fmt(p.precoTotal)}) · ${dias} de trabalho`,
    ];
  }

  // Texto da magia para a nuvem.
  //  completo   → Magias.textoPuro: cabeçalho, estatísticas, a descrição
  //               integral, o truque e os aprimoramentos.
  //  compacto   → cabeçalho + o resumo de uma linha.
  //  pergaminho → as duas linhas de preço entram logo abaixo do nome,
  //               coladas no custo em PM (extrasNoCabecalho): a nuvem é
  //               estreita e não tem a moldura da Loja em volta, então o
  //               "isto é um pergaminho" tem de vir de cara.
  //  Os aprimoramentos saem separados por linha em branco pelo mesmo
  //  motivo — colados, viram um bloco só nessa largura.
  function magiaTexto(reg, opts) {
    const M = _M();
    if (!reg || !M) return '';
    opts = opts || {};
    const extras = opts.pergaminho ? linhasPergaminho(reg) : [];
    const t = M.textoDe ? M.textoDe(reg.nome) : null;
    if (opts.completo && t && M.textoPuro) {
      return M.textoPuro(reg.nome, extras,
        { extrasNoCabecalho: true, aprimoramentosSoltos: true });
    }

    const cab = t
      ? `${t.nome} — ${t.tipo} ${t.circulo} (${t.escola}) · ${t.pm} PM`
      : `${reg.nome} — ${(M.TIPO_LABEL || {})[reg.tipo] || ''} ${reg.circulo} (${reg.escola})`.replace(/ {2,}/g, ' ');
    return [cab].concat(extras, ['', (t && t.resumo) || reg.descricao || ''])
      .join('\n').replace(/\n{3,}/g, '\n\n').trim();
  }

  // ── Modal de edição ─────────────────────────────────────────────────
  //  opts: { termo, atual, onSalvar(texto), onRemover() }
  //  `termo` vem INTEIRO (só o rótulo é encurtado): é por ele que se
  //  descobre se o trecho é o nome de uma magia.
  function abrirEditor(opts) {
    opts = opts || {};
    // a nuvem pode estar fixada no próprio termo — solta antes de abrir
    // o modal, para não ficar flutuando por cima dele
    if (window.ItensDescricoes && window.ItensDescricoes.fecharNuvem) window.ItensDescricoes.fecharNuvem();
    const termoCurto = String(opts.termo || '');
    const overlay = window.GA_abrirModal(`
      <div class="ga-modal-cab">
        <strong>Descrição do trecho</strong>
        <button class="ga-modal-x" data-ga-fechar title="Fechar (Esc)">✕</button>
      </div>
      <p class="gd-termo">Trecho: <strong>${esc(termoCurto.length > 80 ? termoCurto.slice(0, 80) + '…' : termoCurto)}</strong></p>
      <input class="gd-busca" type="text" autocomplete="off"
             placeholder="Buscar descrição pronta (itens, magias, condições, pratos, poderes…)">
      <div class="gd-resultados"></div>
      <div class="gd-magia" hidden>
        <span class="gd-magia-rot">Magia</span>
        <strong class="gd-magia-nome"></strong>
        <label class="gd-opt" title="Acrescenta o preço do pergaminho (T$ 30 × PM²), o custo de aprender a magia (T$ 250 × PM, poder Escriba Arcano) e os dias de trabalho">
          <input type="checkbox" data-gd-opt="pergaminho"> É um pergaminho?
        </label>
        <label class="gd-opt" title="Completo: estatísticas, descrição integral, truque e aprimoramentos. Compacto: só o cabeçalho e o resumo de uma linha">
          <input type="checkbox" data-gd-opt="completo" checked>
          <span class="gd-opt-rot">Texto completo</span>
        </label>
      </div>
      <textarea class="gd-texto"
                placeholder="…ou escreva aqui a descrição com as suas palavras.">${esc(opts.atual || '')}</textarea>
      <p class="gd-dica">Cole textos à vontade — a colagem entra emendada num parágrafo só.
        As quebras que você deixar aqui a nuvem respeita.
        No texto, passe o mouse no trecho para ver a nuvem e CLIQUE no trecho para fixá-la (rolar e copiar).</p>
      <div class="gd-acoes">
        ${opts.atual ? '<button type="button" class="gd-btn gd-btn--remover" data-gd="remover">Remover descrição</button>' : ''}
        <button type="button" class="gd-btn" data-gd="aplicar">Aplicar</button>
      </div>`);
    overlay.classList.add('gd-overlay');

    const busca = overlay.querySelector('.gd-busca');
    const resultados = overlay.querySelector('.gd-resultados');
    const ta = overlay.querySelector('.gd-texto');

    // ── Painel da magia ──────────────────────────────────────────────
    //  Só aparece quando há uma magia em jogo (o trecho é o nome de uma,
    //  ou uma foi escolhida na busca). Os dois interruptores REFAZEM o
    //  texto da caixa; `refazer` fica false na abertura de uma descrição
    //  que já existia, para não apagar o que o mestre escreveu antes.
    const painel  = overlay.querySelector('.gd-magia');
    const cxPerg  = painel.querySelector('[data-gd-opt="pergaminho"]');
    const cxComp  = painel.querySelector('[data-gd-opt="completo"]');
    const rotComp = painel.querySelector('.gd-opt-rot');
    let magiaSel = null;

    function ligarMagia(reg, refazer) {
      magiaSel = reg || null;
      painel.hidden = !magiaSel;
      if (!magiaSel) return;
      painel.querySelector('.gd-magia-nome').textContent = magiaSel.nome;
      rotComp.textContent = cxComp.checked ? 'Texto completo' : 'Texto compacto';
      if (refazer) {
        ta.value = magiaTexto(magiaSel, { pergaminho: cxPerg.checked, completo: cxComp.checked });
        ta.scrollTop = 0;
      }
    }
    painel.addEventListener('change', () => ligarMagia(magiaSel, true));

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
      if (!it) return;
      // magia escolhida → entra o texto INTEGRAL dela (e os interruptores);
      // qualquer outra fonte → o texto do índice, como sempre foi.
      const reg = it.fonte === 'magia' ? magiaDe(it.nome) : null;
      if (reg) ligarMagia(reg, true);
      else { ligarMagia(null); ta.value = it.texto; }
      ta.focus();
    });

    // Trecho que É o nome de uma magia: o painel já abre ligado. Sem
    // descrição anterior, a caixa também já vem com o texto integral —
    // grifar "Bola de Fogo" na ficha e ter a magia inteira na nuvem é o
    // caminho comum. Havendo descrição, o texto dela é preservado até o
    // mestre mexer num dos interruptores.
    ligarMagia(magiaDe(opts.termo), !opts.atual);

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
        const texto = limparTexto(ta.value);
        if (!texto) {
          // aplicar vazio = tirar a descrição (se havia uma)
          if (opts.atual && opts.onRemover) opts.onRemover();
        } else if (opts.onSalvar) {
          opts.onSalvar(texto);
        }
        overlay._fechar();
      }
    });

    // caixa em foco quando já há texto nela (descrição antiga ou a magia
    // que o trecho trouxe sozinha); busca em foco quando ela está vazia
    (ta.value ? ta : busca).focus();
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
      termo,                       // inteiro: é por ele que se acha a magia
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

  return {
    editarSelecao, abrirEditor, buscar,
    magiaDe, magiaTexto,                  // usados pelo painel de magia
    _limparColagem: limparColagem,
    _limparTexto: limparTexto,
  };
})();