// ═══════════════════════════════════════════════════════════════════
//  ANOTACOES.JS — Anotações do Mestre
//  Árvore de ramos editáveis: cada ramo tem categoria, título, texto
//  e pode ramificar em sub-ramos (sem limite de profundidade).
//  Localização: /grifos-alados/js/anotacoes.js
//
//  Tudo é salvo no localStorage do navegador — sobrevive a F5 e ao
//  fechar a aba, exatamente como o Bestiário.
// ═══════════════════════════════════════════════════════════════════

(function () {
  'use strict';

  const STORAGE_KEY = 'grifosAlados.anotacoes';

  // Categorias de ramo — o texto manda, a cor é reforço visual.
  const CATS = [
    { chave: 'ideia',    nome: 'Ideia',    cor: '#7a3fa6' },
    { chave: 'encontro', nome: 'Encontro', cor: '#b3261e' },
    { chave: 'narracao', nome: 'Narração', cor: '#2f6f9e' },
    { chave: 'npc',      nome: 'NPC',      cor: '#1f7a6b' },
    { chave: 'lugar',    nome: 'Lugar',    cor: '#9a6a1a' },
    { chave: 'tesouro',  nome: 'Tesouro',  cor: '#8a7320' },
    { chave: 'regra',    nome: 'Regra',    cor: '#4a5a6a' },
    { chave: 'outro',    nome: 'Outro',    cor: '#6e6256' },
  ];
  const CAT_POR_CHAVE = {};
  CATS.forEach(c => { CAT_POR_CHAVE[c.chave] = c; });

  let dados = { ramos: [] };

  // ── PERSISTÊNCIA ─────────────────────────────────────────────────
  function carregar() {
    try {
      const txt = localStorage.getItem(STORAGE_KEY);
      if (txt) dados = JSON.parse(txt);
    } catch (e) {
      console.warn('[anotacoes] Não foi possível carregar:', e.message);
    }
    if (!dados || typeof dados !== 'object') dados = {};
    if (!Array.isArray(dados.ramos)) dados.ramos = [];
    dados.ramos.forEach(normalizarRamo);
  }

  function normalizarRamo(r) {
    if (typeof r.titulo !== 'string') r.titulo = '';
    if (typeof r.texto !== 'string')  r.texto = '';
    if (typeof r.cat !== 'string' || !CAT_POR_CHAVE[r.cat]) r.cat = 'outro';
    if (typeof r.aberto !== 'boolean') r.aberto = true;
    if (!r.id) r.id = uid('r');
    if (!Array.isArray(r.filhos)) r.filhos = [];
    r.filhos.forEach(normalizarRamo);
  }

  let _saveTimer = null;
  function _gravar() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dados));
    } catch (e) {
      console.warn('[anotacoes] Não foi possível salvar:', e.message);
    }
  }
  function salvar() {
    clearTimeout(_saveTimer);
    _saveTimer = setTimeout(_gravar, 250);
  }
  function salvarAgora() {
    clearTimeout(_saveTimer);
    _gravar();
  }

  // ── AUXILIARES ───────────────────────────────────────────────────
  function uid(p) {
    return p + '_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }
  const esc = window.GA_esc;

  function novoRamo() {
    return { id: uid('r'), aberto: true, cat: 'ideia', titulo: '', texto: '', filhos: [] };
  }

  // ── LOCALIZAÇÃO POR CAMINHO (data-caminho="0.2.1") ───────────────
  // O caminho é a sequência de índices da raiz até o ramo.
  function resolver(caminho) {
    const idx = String(caminho).split('.').map(Number);
    let lista = dados.ramos, no = null;
    for (let k = 0; k < idx.length; k++) {
      no = lista[idx[k]];
      if (!no) return null;
      lista = no.filhos;
    }
    return no;
  }
  // Lista que contém o ramo + posição dele nela (para mover/remover).
  function listaDe(caminho) {
    const idx = String(caminho).split('.').map(Number);
    let lista = dados.ramos;
    for (let k = 0; k < idx.length - 1; k++) lista = lista[idx[k]].filhos;
    return { lista: lista, i: idx[idx.length - 1] };
  }

  // ═══════════════════════════════════════════════════════════════
  //  RENDERIZAÇÃO
  // ═══════════════════════════════════════════════════════════════
  function render() {
    const cont = document.getElementById('anotacoes-content');
    if (!cont) return;
    const scrollY = window.scrollY;            // preserva a rolagem ao redesenhar

    let html = `
      <div class="an-cabecalho">
        <h1>Anotações do Mestre</h1>
        <p class="an-subtitulo">Ramifique ideias, encontros, NPCs e narrações — tudo salvo neste navegador</p>
        <div class="an-backup">
          <button class="an-backup-btn" data-acao="exportar-json"
                  title="Salvar um .json com todos os ramos — reimporte para restaurar (ex.: ao limpar o navegador)">⬇ Backup (.json)</button>
          <button class="an-backup-btn" data-acao="exportar-txt"
                  title="Exportar um .txt legível das anotações para ler ou imprimir">⬇ Exportar texto (.txt)</button>
          <button class="an-backup-btn an-backup-btn--imp" data-acao="importar-backup"
                  title="Carregar um backup .json — restaura os ramos e sub-ramos">⬆ Importar backup</button>
          <input type="file" id="anImportFile" accept=".json,application/json" hidden>
        </div>
      </div>`;

    if (dados.ramos.length === 0) {
      html += `<p class="an-vazio">Nenhum ramo ainda. Crie o primeiro e vá ramificando as ideias da campanha.</p>`;
    } else {
      dados.ramos.forEach((r, i) => { html += construirRamo(r, String(i), dados.ramos.length); });
    }

    html += `<button class="an-add an-add--raiz" data-acao="add-raiz">＋ Novo ramo</button>`;

    cont.innerHTML = html;

    // ajusta a altura de todas as caixas de texto ao conteúdo
    cont.querySelectorAll('.an-texto').forEach(ajustarAltura);

    // volta para onde o mestre estava (evita o "pulo" ao adicionar/remover/mover)
    window.scrollTo({ top: scrollY, behavior: 'instant' });
  }

  // Coloca o cursor no título de um ramo recém-criado (pelo seu caminho).
  function focarTitulo(caminho) {
    const cont = document.getElementById('anotacoes-content');
    if (!cont) return;
    const el = cont.querySelector('.an-titulo[data-caminho="' + caminho + '"]');
    if (el) el.focus();
  }

  function construirRamo(r, caminho, total) {
    const cat = CAT_POR_CHAVE[r.cat] || CAT_POR_CHAVE.outro;
    const partes = caminho.split('.');
    const i = +partes[partes.length - 1];
    const semSubir  = (i === 0)         ? 'disabled' : '';
    const semDescer = (i === total - 1) ? 'disabled' : '';

    let filhosHtml = '';
    r.filhos.forEach((f, k) => {
      filhosHtml += construirRamo(f, caminho + '.' + k, r.filhos.length);
    });

    let ops = '';
    CATS.forEach(c => {
      ops += `<option value="${c.chave}" ${c.chave === r.cat ? 'selected' : ''}>${c.nome}</option>`;
    });

    return `
      <div class="an-ramo ${r.aberto ? 'an-aberto' : ''}" style="--cor:${cat.cor}">
        <div class="an-ramo-cab">
          <button class="an-toggle" data-acao="toggle" data-caminho="${caminho}" title="Expandir / recolher">
            ${r.aberto ? '▾' : '▸'}
          </button>
          <select class="an-cat" data-campo="cat" data-caminho="${caminho}" title="Categoria do ramo">${ops}</select>
          <input class="an-titulo" type="text" value="${esc(r.titulo)}"
                 data-campo="titulo" data-caminho="${caminho}" placeholder="Título do ramo…">
          <span class="an-contador">${r.filhos.length} ramo${r.filhos.length !== 1 ? 's' : ''}</span>
          <button class="an-mini" data-acao="subir" data-caminho="${caminho}" ${semSubir} title="Mover para cima">↑</button>
          <button class="an-mini" data-acao="descer" data-caminho="${caminho}" ${semDescer} title="Mover para baixo">↓</button>
          <button class="an-mini an-mini--del" data-acao="del" data-caminho="${caminho}" title="Remover ramo">✕</button>
        </div>
        <div class="an-corpo">
          <textarea class="an-texto" rows="2"
                    placeholder="Anote a ideia, o encontro, a narração, o segredo…"
                    data-campo="texto" data-caminho="${caminho}">${esc(r.texto)}</textarea>
          ${r.filhos.length ? `<div class="an-filhos">${filhosHtml}</div>` : ''}
          <button class="an-add an-add--sub" data-acao="add-sub" data-caminho="${caminho}">＋ Ramificar</button>
        </div>
      </div>`;
  }

  // A caixa de texto cresce sozinha conforme o conteúdo.
  function ajustarAltura(t) {
    t.style.height = 'auto';
    t.style.height = (t.scrollHeight + 2) + 'px';
  }

  // ═══════════════════════════════════════════════════════════════
  //  EVENTOS
  // ═══════════════════════════════════════════════════════════════
  function aoClicar(e) {
    const alvo = e.target.closest('[data-acao]');
    if (!alvo) return;
    const acao = alvo.dataset.acao;

    if (acao === 'add-raiz') {
      dados.ramos.push(novoRamo());
      salvar(); render();
      focarTitulo(String(dados.ramos.length - 1));
      return;
    }
    if (acao === 'exportar-json') { exportarBackupAnotacoes(); return; }
    if (acao === 'exportar-txt')  { exportarTextoAnotacoes();  return; }
    if (acao === 'importar-backup') {
      const inp = document.getElementById('anImportFile');
      if (inp) inp.click();
      return;
    }
    if (acao === 'add-sub') {
      const no = resolver(alvo.dataset.caminho);
      if (!no) return;
      no.filhos.push(novoRamo());
      no.aberto = true;
      salvar(); render();
      focarTitulo(alvo.dataset.caminho + '.' + (no.filhos.length - 1));
      return;
    }
    if (acao === 'toggle') {
      const no = resolver(alvo.dataset.caminho);
      if (!no) return;
      no.aberto = !no.aberto;
      // alterna no próprio elemento — sem redesenhar a árvore (mantém a rolagem)
      const ramo = alvo.closest('.an-ramo');
      if (ramo) {
        ramo.classList.toggle('an-aberto', no.aberto);
        alvo.textContent = no.aberto ? '▾' : '▸';
        if (no.aberto) ramo.querySelectorAll('.an-texto').forEach(ajustarAltura);
      }
      salvar();
      return;
    }
    if (acao === 'subir' || acao === 'descer') {
      const ref = listaDe(alvo.dataset.caminho);
      const j = (acao === 'subir') ? ref.i - 1 : ref.i + 1;
      if (j < 0 || j >= ref.lista.length) return;
      const tmp = ref.lista[ref.i]; ref.lista[ref.i] = ref.lista[j]; ref.lista[j] = tmp;
      salvar(); render(); return;
    }
    if (acao === 'del') {
      const ref = listaDe(alvo.dataset.caminho);
      const no = ref.lista[ref.i];
      if (!no) return;
      const temConteudo = no.titulo || no.texto || no.filhos.length;
      if (temConteudo && !confirm('Remover este ramo e tudo dentro dele?')) return;
      ref.lista.splice(ref.i, 1);
      salvar(); render(); return;
    }
  }

  // Digitação — atualiza os dados sem re-renderizar (não perde o foco).
  function aoDigitar(e) {
    const el = e.target;
    const campo = el.dataset && el.dataset.campo;
    if (!campo || el.dataset.caminho == null) return;
    const no = resolver(el.dataset.caminho);
    if (!no) return;

    if (campo === 'titulo') { no.titulo = el.value; salvar(); return; }
    if (campo === 'texto')  {
      no.texto = el.value;
      ajustarAltura(el);
      salvar(); return;
    }
    if (campo === 'cat') {
      no.cat = el.value;
      const cat = CAT_POR_CHAVE[no.cat] || CAT_POR_CHAVE.outro;
      const card = el.closest('.an-ramo');
      if (card) card.style.setProperty('--cor', cat.cor);
      salvar(); return;
    }
  }

  // ══════════════════════════════════════════════════════════════════
  //  BACKUP / EXPORTAÇÃO / IMPORTAÇÃO — árvore de ramos inteira
  //  • JSON  → restauração sem perda (ramos e sub-ramos).
  //  • TXT   → versão legível e indentada para ler ou imprimir.
  //  • Importar JSON → Substituir tudo OU Adicionar (mesclar).
  // ══════════════════════════════════════════════════════════════════
  function _contarRamos(lista) {
    let n = 0;
    (lista || []).forEach(r => { n += 1 + _contarRamos(r.filhos); });
    return n;
  }

  function exportarBackupAnotacoes() {
    if (!dados.ramos.length) { alert('Não há nada para exportar — crie ao menos um ramo.'); return; }
    const pacote = {
      app: 'Grifos Alados',
      tipo: 'anotacoes',
      versao: 1,
      exportadoEm: new Date().toISOString(),
      ramos: dados.ramos,
    };
    baixarTxt(`anotacoes_${carimboArquivo()}.json`, JSON.stringify(pacote, null, 2));
  }

  // ── EXPORTAR: TXT legível e indentado ────────────────────────────
  function _txtRamo(r, nivel) {
    const ind = '  '.repeat(nivel);
    const cat = (CAT_POR_CHAVE[r.cat] || CAT_POR_CHAVE.outro).nome;
    let out = `${ind}• [${cat}] ${(r.titulo || '(sem título)').trim()}`;
    if ((r.texto || '').trim()) {
      r.texto.trim().split('\n').forEach(l => { out += `\n${ind}    ${l.trim()}`; });
    }
    (r.filhos || []).forEach(f => { out += '\n' + _txtRamo(f, nivel + 1); });
    return out;
  }

  function exportarTextoAnotacoes() {
    if (!dados.ramos.length) { alert('Não há nada para exportar — crie ao menos um ramo.'); return; }
    let txt = [
      '══════════════════════════════════════════════',
      '   GRIFOS ALADOS · ANOTAÇÕES DO MESTRE',
      `   Exportado em ${new Date().toLocaleString('pt-BR')}`,
      '══════════════════════════════════════════════',
      '',
    ].join('\n');
    txt += dados.ramos.map(r => _txtRamo(r, 0)).join('\n\n');
    baixarTxt(`anotacoes_${carimboArquivo()}.txt`, txt + '\n');
  }

  // ── IMPORTAR ─────────────────────────────────────────────────────
  function _normalizarRamoImport(r) {
    if (!r || typeof r !== 'object') return null;
    const ramo = {
      id: uid('r'),                                  // reid para nunca colidir
      aberto: typeof r.aberto === 'boolean' ? r.aberto : true,
      cat: (typeof r.cat === 'string' && CAT_POR_CHAVE[r.cat]) ? r.cat : 'outro',
      titulo: typeof r.titulo === 'string' ? r.titulo : '',
      texto: typeof r.texto === 'string' ? r.texto : '',
      filhos: [],
    };
    (Array.isArray(r.filhos) ? r.filhos : []).forEach(f => {
      const fn = _normalizarRamoImport(f);
      if (fn) ramo.filhos.push(fn);
    });
    return ramo;
  }

  function aoEscolherBackup(e) {
    const input = e.target;
    if (!input || input.id !== 'anImportFile' || !input.files || !input.files.length) return;
    const arq = input.files[0];
    input.value = '';

    const leitor = new FileReader();
    leitor.onload = () => {
      let parsed;
      try { parsed = JSON.parse(leitor.result); }
      catch (err) { alert('Arquivo inválido — não é um backup .json do Grifos Alados.'); return; }

      let bruto = Array.isArray(parsed) ? parsed
                : (parsed && Array.isArray(parsed.ramos)) ? parsed.ramos : null;
      if (!bruto) { alert('Backup sem ramos — verifique se é o arquivo .json das Anotações.'); return; }
      if (parsed && parsed.tipo && parsed.tipo !== 'anotacoes') {
        alert('Este arquivo é um backup de "' + parsed.tipo + '", não das Anotações.'); return;
      }

      const ramos = bruto.map(_normalizarRamoImport).filter(Boolean);
      if (!ramos.length) { alert('Nenhum ramo válido encontrado no arquivo.'); return; }
      abrirModalImportarBackup(ramos);
    };
    leitor.onerror = () => alert('Não foi possível ler o arquivo.');
    leitor.readAsText(arq);
  }

  function abrirModalImportarBackup(ramos) {
    const totalNovo = ramos.reduce((acc, r) => acc + 1 + _contarRamos(r.filhos), 0);
    const totalAtual = _contarRamos(dados.ramos);

    const overlay = GA_abrirModal(`
      <div class="ga-modal-cab">
        <span>⬆ Importar backup</span>
        <button class="ga-modal-x" data-ga-fechar title="Fechar">✕</button>
      </div>
      <p class="ga-modal-dica">O arquivo traz <strong>${ramos.length} ramo${ramos.length !== 1 ? 's' : ''} de raiz</strong>
        (${totalNovo} no total, com sub-ramos). Você tem ${totalAtual} ramo${totalAtual !== 1 ? 's' : ''} no momento.</p>
      <div class="ga-modal-acoes">
        <button class="ga-btn-sec" data-ga-fechar>Cancelar</button>
        <button class="ga-btn-sec" data-imp-modo="adicionar">➕ Adicionar (mesclar)</button>
        <button class="ga-btn-principal" data-imp-modo="substituir">♻ Substituir tudo</button>
      </div>`);

    overlay.addEventListener('click', e => {
      const btn = e.target.closest('[data-imp-modo]');
      if (!btn) return;
      if (btn.dataset.impModo === 'substituir') {
        if (totalAtual && !confirm('Isto APAGA os ' + totalAtual + ' ramos atuais e coloca os do arquivo no lugar. Continuar?')) return;
        dados.ramos = ramos;
      } else {
        dados.ramos = dados.ramos.concat(ramos);
      }
      salvarAgora();
      overlay._fechar();
      render();
    });
  }

  // ── INICIALIZAÇÃO ────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    const secao = document.getElementById('anotacoes');
    if (!secao) return;

    carregar();
    render();

    secao.addEventListener('click', aoClicar);
    secao.addEventListener('input', aoDigitar);
    secao.addEventListener('change', aoEscolherBackup);

    // a seção começa oculta (display:none) e nesse estado o scrollHeight
    // é 0 — reajusta as alturas quando a aba é aberta pela navegação
    const navLink = document.querySelector('.nav-link[data-section="anotacoes"]');
    if (navLink) navLink.addEventListener('click', () => {
      setTimeout(() => {
        secao.querySelectorAll('.an-texto').forEach(ajustarAltura);
      }, 0);
    });

    window.addEventListener('beforeunload', salvarAgora);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') salvarAgora();
    });
  });

})();
