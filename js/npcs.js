// ═══════════════════════════════════════════════════════════════════
//  NPCS.JS — Sub-aba "👤 Guia de NPCs" (consulta rápida)
//  Lê window.GUIA_NPCS (js/npcs-data.js): fichas genéricas do livro
//  Guia de NPCs, por categoria, com busca global. Cada ficha tem um
//  botão que envia uma cópia para o combate (GA_Monstros.inserirNPC —
//  entra na cena narrada ou, sem cena narrada, numa sessão própria).
// ═══════════════════════════════════════════════════════════════════
(function () {
  'use strict';

  const esc = window.GA_esc;
  const nl2br = window.GA_nl2br;
  const semAcento = window.GA_semAcento;

  // rótulos padrão do statblock — abrem a linha e viram negrito
  const RE_ROTULO = /^(Iniciativa|Defesa|Pontos de Vida|Pontos de Mana|Deslocamento|Corpo a Corpo|À Distância|Perícias|Equipamento|Magias|Tesouro|Parceiro)\b/;
  // linha de atributos (For, Des, Con, Int, Sab, Car)
  const RE_ATRIBUTOS = /^For\s+[+\-–−]?(?:\d|[—–−-])/;
  // "Nome da Habilidade (Ação[, X PM])" — negrita o nome com a execução
  const RE_HABILIDADE = /^([A-ZÀ-Ý"“…][^.•]{0,64}?\((?:Livre|Padrão|Reação|Movimento|Completa|Reativa|1 hora)[^)]*\))/;
  // linha de tipo e tamanho ("Humanoide (humano) Médio", "Animal Grande"…)
  const RE_TIPO = /^(Humanoide|Animal|Animais|Construto|Esp[íi]rito|Morto[- ]?vivo|Monstro)\b/i;

  // texto → HTML escapado; marca termos de regra com tooltip se possível
  function marcar(txt) {
    return window.ItensDescricoes ? window.ItensDescricoes.marcar(txt) : esc(txt);
  }

  // Uma linha do statblock → HTML formatado
  function linhaHtml(linha) {
    const l = linha.trim();
    if (!l) return '';

    // marcador de magia
    if (l.startsWith('•')) {
      let h = marcar(l.replace(/^•\s*/, ''));
      // negrita "Nome da Magia (Ação, X PM)" no começo do marcador
      h = h.replace(/^([^(<]{2,48}?\([^)]*\))/, '<strong>$1</strong>');
      return `<div class="npc-linha npc-linha--magia">• ${h}</div>`;
    }
    // linha de tipo e tamanho
    if (RE_TIPO.test(l)) {
      return `<div class="npc-linha npc-linha--tipo">${esc(l)}</div>`;
    }
    // linha de atributos
    if (RE_ATRIBUTOS.test(l)) {
      return `<div class="npc-linha npc-linha--atrib">${esc(l)}</div>`;
    }

    let html = marcar(l);
    const mRot = l.match(RE_ROTULO);
    if (mRot && html.indexOf(mRot[1]) === 0) {
      html = '<strong>' + mRot[1] + '</strong>' + html.slice(mRot[1].length);
      // a linha de Equipamento carrega o Tesouro junto (formato do livro)
      if (mRot[1] === 'Equipamento') html = html.replace(/\bTesouro\b/, '<strong>Tesouro</strong>');
      return `<div class="npc-linha">${html}</div>`;
    }
    const mHab = l.match(RE_HABILIDADE);
    if (mHab && html.indexOf('<') !== 0) {
      // recomeça do texto puro para não cortar um tooltip no meio
      html = '<strong>' + esc(mHab[1]) + '</strong>' + marcar(l.slice(mHab[1].length));
      return `<div class="npc-linha npc-linha--hab">${html}</div>`;
    }
    return `<div class="npc-linha npc-linha--hab">${html}</div>`;
  }

  // Statblock completo (sem a 1ª linha, que vira o cabeçalho do card)
  function blocoHtml(f) {
    const linhas = f.texto.split('\n').slice(1);
    let html = '', emDescricao = true;
    linhas.forEach(l => {
      // tudo antes da linha de tipo é descrição/lore — itálico de gazeta
      if (emDescricao) {
        if (RE_TIPO.test(l.trim())) emDescricao = false;
        else { html += `<p class="npc-desc">${marcar(l.trim())}</p>`; return; }
      }
      html += linhaHtml(l);
    });
    return html;
  }

  function cardFicha(f, cat) {
    const busca = semAcento([f.nome, 'nd ' + f.nd, f.tipo, f.resumo, cat.nome, f.texto].join(' '));
    return `
      <details class="vc-card npc-card" data-busca="${esc(busca)}" style="--cor:${cat.cor || '#6e6256'}">
        <summary class="vc-card-cab">
          <span class="vc-card-nome">${esc(f.nome)} <span class="npc-nd">ND ${esc(f.nd)}</span></span>
          <span class="vc-card-meta">${esc(f.tipo || '')}</span>
        </summary>
        <div class="vc-card-corpo">
          <div class="npc-block">${blocoHtml(f)}</div>
          <div class="npc-acoes">
            <button type="button" class="npc-enviar" data-npc-enviar="${f.chave}"
                    title="Insere uma cópia editável desta ficha na cena narrada (ou numa sessão própria) da aba ⚔ Combates">⚔ Enviar para o combate</button>
            <span class="npc-envio-info" hidden></span>
          </div>
        </div>
      </details>`;
  }

  function cardRegra(r) {
    const busca = semAcento([r.titulo, r.texto].join(' '));
    return `
      <details class="vc-card vc-card--regra" data-busca="${esc(busca)}">
        <summary class="vc-card-cab"><span class="vc-card-nome">📖 ${esc(r.titulo)}</span></summary>
        <div class="vc-card-corpo"><div class="vc-regras">${nl2br(r.texto)}</div></div>
      </details>`;
  }

  function cardItem(it) {
    const busca = semAcento([it.nome, it.meta, it.texto].join(' '));
    return `
      <details class="vc-card npc-card--item" data-busca="${esc(busca)}">
        <summary class="vc-card-cab">
          <span class="vc-card-nome">${esc(it.nome)}</span>
          <span class="vc-card-meta">${esc(it.meta || '')}</span>
        </summary>
        <div class="vc-card-corpo"><div class="vc-regras">${nl2br(it.texto)}</div></div>
      </details>`;
  }

  function render() {
    const cont = document.getElementById('npcs-content');
    if (!cont) return;

    const g = window.GUIA_NPCS || {};
    const cats = Array.isArray(g.categorias) ? g.categorias : [];
    const regras = Array.isArray(g.regras) ? g.regras : [];
    const itens = Array.isArray(g.itens) ? g.itens : [];

    if (!cats.length) {
      cont.innerHTML = `<div class="cr-erro"><strong>Os dados não carregaram.</strong><br>
        Verifique se <code>js/npcs-data.js</code> está incluído antes de <code>js/npcs.js</code>.</div>`;
      return;
    }

    let grupos = '';
    cats.forEach(cat => {
      const cards = (cat.fichas || []).map(f => cardFicha(f, cat)).join('');
      const caixas = regras.filter(r => r.cat === cat.chave).map(cardRegra).join('');
      grupos += `
        <div class="vc-grupo">
          <h2 class="vc-grupo-titulo">${esc(cat.icone || '')} ${esc(cat.nome)}</h2>
          ${cat.intro ? `<p class="npc-intro">${nl2br(cat.intro)}</p>` : ''}
          <div class="vc-lista">${cards}${caixas}</div>
        </div>`;
    });

    const gerais = regras.filter(r => r.cat === 'geral' || !r.cat).map(cardRegra).join('');

    cont.innerHTML = `
      <div class="cr-cabecalho">
        <h1>👤 Guia de NPCs</h1>
        <p class="cr-sub">Fichas genéricas do povo de Arton — plebe, templo, lei, crime, corte e mercenários.
        O botão <strong>⚔ Enviar para o combate</strong> insere uma cópia editável na cena narrada da aba ⚔ Combates
        (sem cena narrada, cria a sessão "👤 NPCs do Guia"). Na própria cena também há o botão 👤 Guia de NPCs.</p>
      </div>
      <input class="cr-busca" type="text" placeholder="Buscar NPC (acólito, guarda, ND 2, nezumi, peçonha…)" autocomplete="off">
      ${grupos}
      ${gerais ? `<div class="vc-grupo"><h2 class="vc-grupo-titulo">📖 Regras gerais</h2><div class="vc-lista">${gerais}</div></div>` : ''}
      ${itens.length ? `<div class="vc-grupo"><h2 class="vc-grupo-titulo">🗡 Itens especiais citados nas fichas</h2><div class="vc-lista">${itens.map(cardItem).join('')}</div></div>` : ''}`;

    // busca global (mesmo comportamento das outras sub-abas)
    const busca = cont.querySelector('.cr-busca');
    busca.addEventListener('input', () => {
      const termo = semAcento(busca.value.trim());
      cont.querySelectorAll('[data-busca]').forEach(el => {
        const bate = !termo || el.dataset.busca.indexOf(termo) >= 0;
        el.style.display = bate ? '' : 'none';
        if (el.tagName === 'DETAILS') el.open = !!termo && bate;
      });
      cont.querySelectorAll('.vc-grupo').forEach(gr => {
        const algum = Array.from(gr.querySelectorAll('[data-busca]')).some(c => c.style.display !== 'none');
        gr.style.display = algum ? '' : 'none';
      });
    });

    // enviar para o combate
    cont.addEventListener('click', e => {
      const btn = e.target.closest('[data-npc-enviar]');
      if (!btn) return;
      const api = window.GA_Monstros;
      const info = btn.parentElement.querySelector('.npc-envio-info');
      if (!api || typeof api.inserirNPC !== 'function') {
        if (info) { info.hidden = false; info.textContent = 'A aba ⚔ Combates não carregou.'; }
        return;
      }
      const r = api.inserirNPC(btn.dataset.npcEnviar);
      if (!r) return;
      if (info) {
        info.hidden = false;
        info.innerHTML = r.narrada
          ? `✓ <strong>${esc(r.nome)}</strong> entrou na cena narrada "${esc(r.cena)}"`
          : `✓ <strong>${esc(r.nome)}</strong> entrou em ${esc(r.sessao)} · ${esc(r.cena)} (aba ⚔ Combates)`;
        clearTimeout(info._timer);
        info._timer = setTimeout(() => { info.hidden = true; }, 5000);
      }
    });
  }

  function init() {
    if (!document.getElementById('npcs-content')) return;
    try { render(); }
    catch (err) {
      console.error('[npcs] falha ao renderizar:', err);
      const cont = document.getElementById('npcs-content');
      if (cont) cont.innerHTML = `<div class="cr-erro"><strong>Erro ao montar a aba:</strong><br>${esc(err && err.message || err)}</div>`;
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
