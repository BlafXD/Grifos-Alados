// ═══════════════════════════════════════════════════════════════════
//  FICHAS.JS — Fichas dos Jogadores (PDF)
//  Importa arquivos PDF (ex.: a "Ficha T20" preenchida de cada jogador)
//  e os guarda DENTRO do navegador, no IndexedDB — sobrevivem a F5 e
//  ao fechar a aba, como o resto do site. Nada sai do computador.
//  A visualização usa o leitor de PDF embutido do próprio navegador.
//  Localização: /grifos-alados/js/fichas.js
// ═══════════════════════════════════════════════════════════════════

(function () {
  'use strict';

  const DB_NOME = 'grifosAladosFichas';
  const STORE   = 'pdfs';
  const SEL_KEY = 'grifosAlados.fichaSelecionada';

  let db = null;            // conexão com o IndexedDB (null = indisponível)
  let persistente = true;   // false → as fichas valem só até fechar a página
  let fichas = [];          // [{ id, nome, tamanho, dados: ArrayBuffer }]
  let selecionada = null;   // id da ficha exibida
  let urlAtual = null;      // blob: URL da ficha exibida (revogada ao trocar)

  // ── BANCO (IndexedDB) ────────────────────────────────────────────
  function abrirBanco() {
    return new Promise(resolve => {
      let resolvido = false;
      const fim = v => { if (!resolvido) { resolvido = true; resolve(v); } };

      if (!window.indexedDB) { fim(null); return; }
      let req;
      try { req = indexedDB.open(DB_NOME, 1); }
      catch (e) { fim(null); return; }
      req.onupgradeneeded = () => {
        req.result.createObjectStore(STORE, { keyPath: 'id' });
      };
      req.onsuccess = () => fim(req.result);
      req.onerror   = () => fim(null);
      req.onblocked = () => fim(null);
      // se o navegador travar a abertura, segue sem persistência
      setTimeout(() => fim(null), 2000);
    });
  }

  function lerTodas() {
    return new Promise(resolve => {
      if (!db) { resolve([]); return; }
      try {
        const req = db.transaction(STORE, 'readonly').objectStore(STORE).getAll();
        req.onsuccess = () => resolve(req.result || []);
        req.onerror   = () => resolve([]);
      } catch (e) { resolve([]); }
    });
  }

  function gravarFicha(rec) {
    if (!db) return;
    try { db.transaction(STORE, 'readwrite').objectStore(STORE).put(rec); }
    catch (e) { console.warn('[fichas] Não foi possível gravar:', e.message); }
  }

  function apagarFicha(id) {
    if (!db) return;
    try { db.transaction(STORE, 'readwrite').objectStore(STORE).delete(id); }
    catch (e) { console.warn('[fichas] Não foi possível apagar:', e.message); }
  }

  // ── AUXILIARES ───────────────────────────────────────────────────
  function uid() {
    return 'f_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }
  const esc = window.GA_esc;
  function fmtTamanho(bytes) {
    if (!bytes && bytes !== 0) return '';
    return bytes >= 1048576
      ? (bytes / 1048576).toFixed(1).replace('.', ',') + ' MB'
      : Math.max(1, Math.round(bytes / 1024)) + ' KB';
  }
  function fichaPorId(id) {
    for (let i = 0; i < fichas.length; i++) if (fichas[i].id === id) return fichas[i];
    return null;
  }

  // ═══════════════════════════════════════════════════════════════
  //  RENDERIZAÇÃO
  // ═══════════════════════════════════════════════════════════════
  function render() {
    const cont = document.getElementById('fichas-content');
    if (!cont) return;

    let html = `
      <div class="fc-cabecalho">
        <h1>Fichas dos Jogadores</h1>
        <p class="fc-subtitulo">Guarde os PDFs das fichas e consulte-os sem sair do site</p>
      </div>`;

    if (!persistente) {
      html += `
        <div class="fc-aviso">⚠ O armazenamento permanente não está disponível neste navegador —
        as fichas importadas valem apenas até fechar esta página.</div>`;
    }

    // barra: abas das fichas + botão de adicionar
    let abas = '';
    fichas.forEach(f => {
      abas += `
        <button class="fc-aba ${f.id === selecionada ? 'fc-aba--ativa' : ''}"
                data-acao="mostrar" data-id="${f.id}" title="Abrir ${esc(f.nome)}">
          📄 <span class="fc-aba-nome">${esc(f.nome) || '(sem nome)'}</span>
        </button>`;
    });
    html += `
      <div class="fc-barra">
        ${abas}
        <button class="fc-add" data-acao="adicionar">＋ Adicionar ficha (PDF)</button>
        <input type="file" id="fc-arquivo" accept=".pdf,application/pdf" multiple hidden>
      </div>`;

    const f = fichaPorId(selecionada);
    if (f) {
      // recria a URL do PDF exibido (revoga a anterior)
      if (urlAtual) { try { URL.revokeObjectURL(urlAtual); } catch (e) {} }
      urlAtual = URL.createObjectURL(new Blob([f.dados], { type: 'application/pdf' }));

      html += `
        <div class="fc-info">
          <label class="fc-info-rotulo" for="fc-nome">Nome:</label>
          <input class="fc-nome" id="fc-nome" type="text" value="${esc(f.nome)}"
                 data-campo="nome" data-id="${f.id}" placeholder="Nome do jogador / personagem">
          <span class="fc-tamanho">${fmtTamanho(f.tamanho)}</span>
          <button class="fc-del" data-acao="remover" data-id="${f.id}" title="Remover esta ficha">✕ Remover</button>
        </div>
        <iframe class="fc-viewer" src="${urlAtual}" title="Ficha — ${esc(f.nome)}"></iframe>`;
    } else if (fichas.length === 0) {
      html += `
        <p class="fc-vazio">Nenhuma ficha guardada ainda.<br>
        Clique em <strong>＋ Adicionar ficha (PDF)</strong> e escolha o arquivo —
        por exemplo, a <em>Ficha T20</em> preenchida de cada jogador.<br>
        O PDF fica salvo neste navegador: importou uma vez, consulta sempre.</p>`;
    }

    cont.innerHTML = html;
  }

  // ═══════════════════════════════════════════════════════════════
  //  EVENTOS
  // ═══════════════════════════════════════════════════════════════
  function aoClicar(e) {
    const alvo = e.target.closest('[data-acao]');
    if (!alvo) return;
    const acao = alvo.dataset.acao;

    if (acao === 'adicionar') {
      const input = document.getElementById('fc-arquivo');
      if (input) input.click();
      return;
    }
    if (acao === 'mostrar') {
      selecionada = alvo.dataset.id;
      try { localStorage.setItem(SEL_KEY, selecionada); } catch (e2) {}
      render(); return;
    }
    if (acao === 'remover') {
      const f = fichaPorId(alvo.dataset.id);
      if (!f) return;
      if (!confirm('Remover a ficha "' + (f.nome || 'sem nome') + '" do navegador?')) return;
      apagarFicha(f.id);
      fichas = fichas.filter(x => x.id !== f.id);
      if (selecionada === f.id) selecionada = fichas.length ? fichas[0].id : null;
      try { localStorage.setItem(SEL_KEY, selecionada || ''); } catch (e2) {}
      render(); return;
    }
  }

  // troca de arquivo no seletor — lê e guarda cada PDF escolhido
  function aoEscolherArquivos(e) {
    const input = e.target;
    if (!input || input.id !== 'fc-arquivo' || !input.files || !input.files.length) return;

    const arquivos = Array.prototype.slice.call(input.files);
    let restantes = arquivos.length;

    arquivos.forEach(arq => {
      const ehPdf = (arq.type === 'application/pdf') || /\.pdf$/i.test(arq.name);
      if (!ehPdf) {
        alert('"' + arq.name + '" não é um PDF — arquivo ignorado.');
        if (--restantes === 0) render();
        return;
      }
      const leitor = new FileReader();
      leitor.onload = () => {
        const rec = {
          id: uid(),
          nome: arq.name.replace(/\.pdf$/i, ''),
          tamanho: arq.size,
          dados: leitor.result,        // ArrayBuffer
        };
        fichas.push(rec);
        gravarFicha(rec);
        selecionada = rec.id;
        try { localStorage.setItem(SEL_KEY, selecionada); } catch (e2) {}
        if (--restantes === 0) render();
      };
      leitor.onerror = () => {
        alert('Não foi possível ler "' + arq.name + '".');
        if (--restantes === 0) render();
      };
      leitor.readAsArrayBuffer(arq);
    });

    input.value = '';   // permite escolher o mesmo arquivo de novo
  }

  // renomear sem re-renderizar (não perde o foco nem recarrega o PDF)
  function aoDigitar(e) {
    const el = e.target;
    if (!el.dataset || el.dataset.campo !== 'nome') return;
    const f = fichaPorId(el.dataset.id);
    if (!f) return;
    f.nome = el.value;
    gravarFicha(f);
    // atualiza o rótulo da aba correspondente
    const aba = document.querySelector('.fc-aba[data-id="' + f.id + '"] .fc-aba-nome');
    if (aba) aba.textContent = f.nome || '(sem nome)';
  }

  // ── INICIALIZAÇÃO ────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    const secao = document.getElementById('fichas');
    if (!secao) return;

    render();   // mostra a seção de imediato; o banco carrega em seguida

    abrirBanco().then(conexao => {
      db = conexao;
      persistente = !!db;
      return lerTodas();
    }).then(registros => {
      fichas = registros.filter(r => r && r.id && r.dados);
      let sel = null;
      try { sel = localStorage.getItem(SEL_KEY); } catch (e) {}
      selecionada = fichaPorId(sel) ? sel : (fichas.length ? fichas[0].id : null);
      render();
    });

    secao.addEventListener('click',  aoClicar);
    secao.addEventListener('change', aoEscolherArquivos);
    secao.addEventListener('input',  aoDigitar);
  });

})();
