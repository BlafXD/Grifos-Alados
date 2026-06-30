// ═══════════════════════════════════════════════════════════════════
//  NOTICIAS.JS — Renderização dinâmica e edição das notícias
//  Localização: /grifos-alados/js/noticias.js
//
//  Lê: /data/noticias.json  (via GET  /api/noticias)
//  Salva: /data/noticias.json (via POST /api/noticias)
// ═══════════════════════════════════════════════════════════════════

(function () {
  'use strict';

  // ── ESTADO GLOBAL ────────────────────────────────────────────────
  let dados      = { anos: [] };
  let edicaoAtiva = false;

  // ── ID ÚNICO ─────────────────────────────────────────────────────
  function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  }

  // ── ESCAPE HTML (utilitário compartilhado, definido em script.js) ──
  const esc = window.GA_esc;

  // ── INICIALIZAÇÃO ────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    carregarNoticias();
    criarBotaoEdicao();

    // Atualiza visibilidade do botão ao trocar de seção
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () =>
        setTimeout(sincronizarBotaoEdicao, 60)
      );
    });
  });

  // ── CARREGAR ─────────────────────────────────────────────────────
  //  Lê as notícias da variável window.NOTICIAS_DADOS, definida pelo
  //  arquivo js/noticias-data.js. Como é um <script>, funciona mesmo
  //  com o index.html aberto offline (sem o server.py).
  function carregarNoticias() {
    const d = window.NOTICIAS_DADOS;
    if (d && Array.isArray(d.anos)) {
      dados = d;
    } else {
      console.warn('[noticias] noticias-data.js não encontrado ou inválido.');
      dados = { anos: [] };
    }
    renderizar();
  }

  // ── SALVAR ───────────────────────────────────────────────────────
  //  Salvar grava arquivos no computador, o que um navegador sozinho
  //  não pode fazer — por isso o server.py precisa estar rodando.
  async function salvar() {
    try {
      const r = await fetch('/api/noticias', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(dados),
      });
      if (!r.ok) throw new Error('HTTP ' + r.status);
      mostrarToast('✔ Salvo');
    } catch (e) {
      mostrarToast('⚠ Para salvar, rode o server.py');
      console.error('[noticias] Erro ao salvar:', e.message);
    }
  }

  // ── TOAST ─────────────────────────────────────────────────────────
  function mostrarToast(msg) {
    let t = document.getElementById('ncToast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'ncToast';
      t.className = 'nc-toast';
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.add('nc-toast--visivel');
    clearTimeout(t._timer);
    t._timer = setTimeout(() => t.classList.remove('nc-toast--visivel'), 2200);
  }

  // ══════════════════════════════════════════════════════════════════
  //  RENDERIZAÇÃO
  // ══════════════════════════════════════════════════════════════════
  function renderizar() {
    const wrapper = document.querySelector('#noticias .wrapper');
    if (!wrapper) return;
    wrapper.innerHTML = '';

    if (!dados.anos || !dados.anos.length) {
      const vazio = document.createElement('p');
      vazio.className = 'nc-vazio';
      vazio.textContent = 'Nenhuma notícia cadastrada.';
      wrapper.appendChild(vazio);
    } else {
      dados.anos.forEach((anoObj, ai) =>
        wrapper.appendChild(renderizarAno(anoObj, ai))
      );
    }

    if (edicaoAtiva) {
      wrapper.appendChild(criarBotaoNovoAno());
    }

    // Ornamento final
    const orn = document.createElement('div');
    orn.className = 'ornament';
    orn.style.cssText = 'margin:2.5rem 0 0.5rem';
    orn.textContent   = '✦ ✦ ✦';
    wrapper.appendChild(orn);
  }

  // ── BLOCO DE ANO ─────────────────────────────────────────────────
  function renderizarAno(anoObj, ai) {
    const bloco  = document.createElement('div');
    bloco.className = 'year-block';

    // Cabeçalho
    const hdr = document.createElement('div');
    hdr.className = 'year-header';
    hdr.innerHTML = `<hr/><h2>Ano de ${esc(String(anoObj.ano))}</h2><hr/>`;

    if (edicaoAtiva) {
      const ctrl = document.createElement('div');
      ctrl.className = 'nc-ano-ctrl';
      ctrl.innerHTML = `
        <button class="nc-btn nc-btn-sm" data-ai="${ai}" data-acao="ano-up"   title="Mover ano para cima">▲ Ano</button>
        <button class="nc-btn nc-btn-sm" data-ai="${ai}" data-acao="ano-down" title="Mover ano para baixo">▼ Ano</button>
        <button class="nc-btn nc-btn-add nc-btn-sm" data-ai="${ai}" data-acao="add-noticia">+ Notícia</button>
        <button class="nc-btn nc-btn-danger nc-btn-sm" data-ai="${ai}" data-acao="del-ano">✕ Remover Ano</button>
      `;
      hdr.appendChild(ctrl);
    }
    bloco.appendChild(hdr);

    // Grid de notícias
    const grid = document.createElement('div');
    grid.className = 'news-grid';
    (anoObj.noticias || []).forEach((n, ni) =>
      grid.appendChild(renderizarCard(n, ai, ni))
    );
    bloco.appendChild(grid);
    return bloco;
  }

  // ── CARD ─────────────────────────────────────────────────────────
  function renderizarCard(noticia, ai, ni) {
    const card = document.createElement('div');
    // a 1ª matéria do ano mais recente é a manchete principal (destaque de capa)
    const ehLead = (ai === 0 && ni === 0);
    card.className = `news-card span-${noticia.span || 12}${ehLead ? ' news-lead' : ''}${edicaoAtiva ? ' nc-editavel' : ''}`;

    const corpo = document.createElement('div');
    const bodyHtml = esc(noticia.corpo || '').replace(/\n/g, '<br>');
    corpo.innerHTML = `
      <span class="news-tag">${esc(noticia.tag)}</span>
      <h3 class="news-title">${esc(noticia.titulo)}</h3>
      <span class="news-date">${esc(noticia.data)}</span>
      <hr class="news-rule"/>
      <p class="news-body">${bodyHtml}</p>
      ${noticia.ornamento ? '<div class="ornament">— ✦ —</div>' : ''}
    `;
    card.appendChild(corpo);

    if (edicaoAtiva) {
      const toolbar = document.createElement('div');
      toolbar.className = 'nc-toolbar';
      toolbar.innerHTML = `
        <button class="nc-btn nc-btn-sm" data-ai="${ai}" data-ni="${ni}" data-acao="up"   title="Mover para cima">↑</button>
        <button class="nc-btn nc-btn-sm" data-ai="${ai}" data-ni="${ni}" data-acao="down" title="Mover para baixo">↓</button>
        <button class="nc-btn nc-btn-sm" data-ai="${ai}" data-ni="${ni}" data-acao="edit">✏ Editar</button>
        <button class="nc-btn nc-btn-danger nc-btn-sm" data-ai="${ai}" data-ni="${ni}" data-acao="del">🗑 Excluir</button>
      `;
      card.appendChild(toolbar);
    }

    return card;
  }

  // ── BOTÃO NOVO ANO ────────────────────────────────────────────────
  function criarBotaoNovoAno() {
    const wrap = document.createElement('div');
    wrap.className = 'nc-novo-ano';
    wrap.innerHTML = `<button class="nc-btn nc-btn-add nc-btn-lg" data-acao="novo-ano">+ Novo Ano</button>`;
    return wrap;
  }

  // ══════════════════════════════════════════════════════════════════
  //  DELEGAÇÃO DE EVENTOS (evita onclick inline)
  //  Restrito à seção de Notícias: se ouvíssemos o document inteiro, o
  //  data-acao de outras abas colidiria (ex.: "del" das Anotações dispararia
  //  excluirNoticia com ai=null → TypeError).
  // ══════════════════════════════════════════════════════════════════
  (document.getElementById('noticias') || document).addEventListener('click', e => {
    const btn = e.target.closest('[data-acao]');
    if (!btn) return;

    const acao = btn.dataset.acao;
    const ai   = btn.dataset.ai !== undefined ? +btn.dataset.ai : null;
    const ni   = btn.dataset.ni !== undefined ? +btn.dataset.ni : null;

    switch (acao) {
      case 'ano-up':       moverAno(ai, -1);            break;
      case 'ano-down':     moverAno(ai,  1);             break;
      case 'del-ano':      removerAno(ai);               break;
      case 'add-noticia':  abrirModal('add', ai);        break;
      case 'up':           moverNoticia(ai, ni, -1);     break;
      case 'down':         moverNoticia(ai, ni,  1);     break;
      case 'edit':         abrirModal('edit', ai, ni);   break;
      case 'del':          excluirNoticia(ai, ni);       break;
      case 'novo-ano':     abrirModalNovoAno();          break;
    }
  });

  // ══════════════════════════════════════════════════════════════════
  //  AÇÕES CRUD
  // ══════════════════════════════════════════════════════════════════
  function moverAno(ai, delta) {
    const dest = ai + delta;
    if (dest < 0 || dest >= dados.anos.length) return;
    [dados.anos[ai], dados.anos[dest]] = [dados.anos[dest], dados.anos[ai]];
    salvar(); renderizar();
  }

  function removerAno(ai) {
    const ano = dados.anos[ai];
    const qtd = (ano.noticias || []).length;
    const msg = qtd > 0
      ? `O bloco do Ano ${ano.ano} tem ${qtd} notícia(s). Deseja excluir mesmo assim?`
      : `Remover o bloco do Ano ${ano.ano}?`;
    if (!confirm(msg)) return;
    dados.anos.splice(ai, 1);
    salvar(); renderizar();
  }

  function moverNoticia(ai, ni, delta) {
    const arr  = dados.anos[ai].noticias;
    const dest = ni + delta;
    if (dest < 0 || dest >= arr.length) return;
    [arr[ni], arr[dest]] = [arr[dest], arr[ni]];
    salvar(); renderizar();
  }

  function excluirNoticia(ai, ni) {
    const n = dados.anos[ai].noticias[ni];
    if (!confirm(`Excluir "${n.titulo}"?`)) return;
    dados.anos[ai].noticias.splice(ni, 1);
    salvar(); renderizar();
  }

  // ── GARANTIR ANO EXISTE E INSERIR ────────────────────────────────
  function garantirAno(anoNum) {
    let anoObj = dados.anos.find(a => a.ano === anoNum);
    if (!anoObj) {
      anoObj = { ano: anoNum, noticias: [] };
      dados.anos.push(anoObj);
      dados.anos.sort((a, b) => b.ano - a.ano);
    }
    return anoObj;
  }

  // ══════════════════════════════════════════════════════════════════
  //  MODAL ADD / EDIT
  // ══════════════════════════════════════════════════════════════════
  function abrirModal(modo, ai, ni) {
    fecharModal();

    const anoAtual = dados.anos[ai]?.ano ?? '';
    let vals = { ano: anoAtual, span: 12, tag: '', titulo: '', data: '', corpo: '', ornamento: false };

    if (modo === 'edit' && ni != null) {
      const n = dados.anos[ai].noticias[ni];
      vals = { ano: anoAtual, span: n.span || 12, tag: n.tag || '',
               titulo: n.titulo || '', data: n.data || '',
               corpo: n.corpo || '', ornamento: !!n.ornamento };
    }

    const opcoesAnos = dados.anos.map(a =>
      `<option value="${a.ano}" ${a.ano == vals.ano ? 'selected' : ''}>${a.ano}</option>`
    ).join('');

    const overlay = document.createElement('div');
    overlay.id = 'ncModal';
    overlay.className = 'nc-overlay';
    overlay.innerHTML = `
      <div class="nc-modal" role="dialog" aria-modal="true">
        <div class="nc-modal-header">
          <span>${modo === 'add' ? '+ Nova Notícia' : '✏ Editar Notícia'}</span>
          <button class="nc-modal-fechar" data-acao-modal="fechar" title="Fechar">✕</button>
        </div>

        <div class="nc-modal-corpo">

          <div class="nc-row-2">
            <label class="nc-campo">
              <span>Ano</span>
              <select id="ncAno">
                ${opcoesAnos}
                <option value="__novo__">+ Novo ano…</option>
              </select>
            </label>
            <label class="nc-campo" id="ncNovoAnoWrap" style="display:none">
              <span>Número do Ano</span>
              <input type="number" id="ncNovoAno" placeholder="Ex: 1425">
            </label>
            <label class="nc-campo">
              <span>Colunas (largura)</span>
              <select id="ncSpan">
                <option value="4"  ${vals.span==4  ?'selected':''}>4 — estreita</option>
                <option value="6"  ${vals.span==6  ?'selected':''}>6 — meia página</option>
                <option value="8"  ${vals.span==8  ?'selected':''}>8 — larga</option>
                <option value="12" ${vals.span==12 ?'selected':''}>12 — página inteira</option>
              </select>
            </label>
          </div>

          <label class="nc-campo">
            <span>Tag</span>
            <input type="text" id="ncTag" value="${esc(vals.tag)}"
              placeholder="Ex: ✦ Manchete · Ano Corrente">
          </label>

          <label class="nc-campo">
            <span>Título</span>
            <input type="text" id="ncTitulo" value="${esc(vals.titulo)}"
              placeholder="Título da notícia">
          </label>

          <label class="nc-campo">
            <span>Data / Local</span>
            <input type="text" id="ncData" value="${esc(vals.data)}"
              placeholder="Ex: Valkaria, 28º dia de Pomo — Ano 1424">
          </label>

          <label class="nc-campo">
            <span>Corpo</span>
            <textarea id="ncCorpo" rows="9"
              placeholder="Texto da notícia. Use Enter para parágrafos.">${esc(vals.corpo)}</textarea>
          </label>

          <label class="nc-campo nc-campo-inline">
            <input type="checkbox" id="ncOrnamento" ${vals.ornamento ? 'checked' : ''}>
            <span>Adicionar ornamento (— ✦ —) ao final do card</span>
          </label>

        </div>

        <div class="nc-modal-footer">
          <button class="nc-btn" data-acao-modal="fechar">Cancelar</button>
          <button class="nc-btn nc-btn-primary" data-acao-modal="salvar"
            data-modo="${modo}" data-ai="${ai}" data-ni="${ni ?? ''}">
            Salvar Notícia
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    // Toggle novo-ano input
    document.getElementById('ncAno').addEventListener('change', function () {
      const wrap = document.getElementById('ncNovoAnoWrap');
      wrap.style.display = this.value === '__novo__' ? 'flex' : 'none';
    });

    // Eventos do modal
    overlay.addEventListener('click', e => {
      const btn = e.target.closest('[data-acao-modal]');
      if (!btn && e.target === overlay) { fecharModal(); return; }
      if (!btn) return;
      const acao = btn.dataset.acaoModal;
      if (acao === 'fechar') { fecharModal(); return; }
      if (acao === 'salvar') {
        confirmarModal(btn.dataset.modo, +btn.dataset.ai,
          btn.dataset.ni !== '' ? +btn.dataset.ni : null);
      }
    });

    // Foco no título
    setTimeout(() => {
      const f = document.getElementById('ncTitulo');
      if (f) f.focus();
    }, 50);
  }

  function fecharModal() {
    const el = document.getElementById('ncModal');
    if (el) el.remove();
  }

  function confirmarModal(modo, ai, ni) {
    const anoSelect = document.getElementById('ncAno');
    const anoNum = anoSelect.value === '__novo__'
      ? parseInt(document.getElementById('ncNovoAno').value, 10)
      : parseInt(anoSelect.value, 10);

    if (isNaN(anoNum)) { alert('Informe um número de ano válido.'); return; }

    const titulo = document.getElementById('ncTitulo').value.trim();
    if (!titulo) { alert('O título é obrigatório.'); return; }

    const novaNoticia = {
      id:       uid(),
      span:     parseInt(document.getElementById('ncSpan').value, 10),
      tag:      document.getElementById('ncTag').value.trim(),
      titulo,
      data:     document.getElementById('ncData').value.trim(),
      corpo:    document.getElementById('ncCorpo').value.trim(),
      ornamento: document.getElementById('ncOrnamento').checked,
    };

    if (modo === 'add') {
      garantirAno(anoNum).noticias.push(novaNoticia);
    } else {
      const anoOrigem = dados.anos[ai];
      novaNoticia.id  = anoOrigem.noticias[ni].id; // preserva id original

      if (anoOrigem.ano === anoNum) {
        anoOrigem.noticias[ni] = novaNoticia;
      } else {
        // Muda de ano: remove e insere no destino
        anoOrigem.noticias.splice(ni, 1);
        garantirAno(anoNum).noticias.push(novaNoticia);
      }
    }

    fecharModal();
    salvar();
    renderizar();
  }

  // ── MODAL NOVO ANO (botão "+ Novo Ano") ───────────────────────────
  function abrirModalNovoAno() {
    fecharModal();
    const overlay = document.createElement('div');
    overlay.id = 'ncModal';
    overlay.className = 'nc-overlay';
    overlay.innerHTML = `
      <div class="nc-modal nc-modal-sm" role="dialog" aria-modal="true">
        <div class="nc-modal-header">
          <span>+ Novo Ano</span>
          <button class="nc-modal-fechar" data-acao-modal="fechar">✕</button>
        </div>
        <div class="nc-modal-corpo">
          <label class="nc-campo">
            <span>Número do Ano</span>
            <input type="number" id="ncNovoAnoNum" placeholder="Ex: 1419">
          </label>
        </div>
        <div class="nc-modal-footer">
          <button class="nc-btn" data-acao-modal="fechar">Cancelar</button>
          <button class="nc-btn nc-btn-primary" data-acao-modal="criar-ano">Criar Ano</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    overlay.addEventListener('click', e => {
      const btn = e.target.closest('[data-acao-modal]');
      if (!btn && e.target === overlay) { fecharModal(); return; }
      if (!btn) return;
      if (btn.dataset.acaoModal === 'fechar') { fecharModal(); return; }
      if (btn.dataset.acaoModal === 'criar-ano') {
        const num = parseInt(document.getElementById('ncNovoAnoNum').value, 10);
        if (isNaN(num)) { alert('Informe um número válido.'); return; }
        if (dados.anos.find(a => a.ano === num)) { alert('Esse ano já existe.'); return; }
        dados.anos.push({ ano: num, noticias: [] });
        dados.anos.sort((a, b) => b.ano - a.ano);
        fecharModal();
        salvar();
        renderizar();
      }
    });

    setTimeout(() => {
      const f = document.getElementById('ncNovoAnoNum');
      if (f) f.focus();
    }, 50);
  }

  // ══════════════════════════════════════════════════════════════════
  //  BOTÃO MODO EDIÇÃO (fixo, aparece só na aba Notícias)
  // ══════════════════════════════════════════════════════════════════
  function criarBotaoEdicao() {
    if (document.getElementById('ncBtnEdicao')) return;
    const btn = document.createElement('button');
    btn.id        = 'ncBtnEdicao';
    btn.className = 'nc-btn-edicao';
    btn.textContent = '✏ Editar Notícias';
    btn.addEventListener('click', () => {
      edicaoAtiva = !edicaoAtiva;
      sincronizarBotaoEdicao();
      renderizar();
    });
    document.body.appendChild(btn);
    sincronizarBotaoEdicao();
  }

  function sincronizarBotaoEdicao() {
    const btn = document.getElementById('ncBtnEdicao');
    if (!btn) return;
    const sec = document.getElementById('noticias');
    const visivel = sec && sec.classList.contains('active');
    btn.style.display = visivel ? 'block' : 'none';
    if (edicaoAtiva) {
      btn.classList.add('nc-btn-edicao--ativa');
      btn.textContent = '✔ Sair da Edição';
    } else {
      btn.classList.remove('nc-btn-edicao--ativa');
      btn.textContent = '✏ Editar Notícias';
    }
  }

})();
