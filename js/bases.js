// ═══════════════════════════════════════════════════════════════════
//  BASES.JS — Bases do grupo (Tormenta 20)
//  Visão geral e controle das bases dos jogadores, com regras e cálculos.
//  Várias bases salvas no localStorage. Cada base tem:
//    • Identidade — nome, tipo (com benefício) e porte (com estatísticas).
//    • Sítio Sagrado — toggle que reduz à metade o custo de porte e cômodos.
//    • Cálculos — custo investido, manutenção, cômodos usados/máx, segurança.
//    • Cômodos & Mobílias — escolhidos dos catálogos, com efeitos e avisos.
//    • Residentes e Inventário da base — caixas de texto livres.
// ═══════════════════════════════════════════════════════════════════

(function () {
  'use strict';

  const STORAGE_KEY = 'grifosAlados.bases';

  let dados = { bases: [] };

  // ── PERSISTÊNCIA ─────────────────────────────────────────────────
  function carregar() {
    try {
      const txt = localStorage.getItem(STORAGE_KEY);
      if (txt) dados = JSON.parse(txt);
    } catch (e) { console.warn('[bases] não carregou:', e.message); }
    if (!dados || typeof dados !== 'object') dados = {};
    if (!Array.isArray(dados.bases)) dados.bases = [];
    dados.bases.forEach(normalizarBase);
  }

  let _t = null;
  function _gravar() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(dados)); }
    catch (e) { console.warn('[bases] não salvou:', e.message); }
  }
  function salvar()      { clearTimeout(_t); _t = setTimeout(_gravar, 250); }
  function salvarAgora() { clearTimeout(_t); _gravar(); }

  // ── AUXILIARES ───────────────────────────────────────────────────
  function uid(p) { return p + '_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
  const esc = window.GA_esc;
  const nl2br = window.GA_nl2br;

  const PORTES   = window.BASE_PORTES   || [];
  const TIPOS    = window.BASE_TIPOS    || [];
  const COMODOS  = window.BASE_COMODOS  || [];
  const MOBILIAS = window.BASE_MOBILIAS || [];
  const CUSTO_COMODO = window.BASE_CUSTO_COMODO || 1000;

  const porteIdx   = ch => Math.max(0, PORTES.findIndex(p => p.chave === ch));
  const porteDef   = ch => PORTES.find(p => p.chave === ch) || PORTES[0];
  const tipoDef    = ch => TIPOS.find(t => t.chave === ch) || null;
  const comodoDef  = ch => COMODOS.find(c => c.chave === ch) || null;
  const mobiliaDef = ch => MOBILIAS.find(m => m.chave === ch) || null;

  function moeda(n) { return 'T$ ' + Number(n || 0).toLocaleString('pt-BR'); }

  function novaBase(n) {
    return {
      id: uid('base'), aberta: true, nome: 'Base ' + n,
      tipo: '', porte: 'minima', sitio: false, segAjuste: 0,
      residentes: '', residentesHtml: '', inventario: '', inventarioHtml: '',
      comodos: [], mobilias: [],
    };
  }

  function normalizarBase(b) {
    if (!b.id) b.id = uid('base');
    if (typeof b.nome !== 'string') b.nome = 'Base';
    if (typeof b.aberta !== 'boolean') b.aberta = true;
    if (typeof b.tipo !== 'string' || (b.tipo && !tipoDef(b.tipo))) b.tipo = '';
    if (!PORTES.some(p => p.chave === b.porte)) b.porte = 'minima';
    if (typeof b.sitio !== 'boolean') b.sitio = false;
    if (typeof b.segAjuste !== 'number') b.segAjuste = parseInt(b.segAjuste, 10) || 0;
    if (typeof b.residentes !== 'string') b.residentes = '';
    if (typeof b.inventario !== 'string') b.inventario = '';
    // residentes/inventário: texto rico (grifos e 📖) com espelho PURO nos
    // campos antigos (o export .txt lê o puro). Migração idempotente.
    b.residentesHtml = (typeof b.residentesHtml === 'string')
      ? window.GA_limparHtml(b.residentesHtml) : window.GA_nl2br(b.residentes);
    b.inventarioHtml = (typeof b.inventarioHtml === 'string')
      ? window.GA_limparHtml(b.inventarioHtml) : window.GA_nl2br(b.inventario);
    if (!Array.isArray(b.comodos)) b.comodos = [];
    if (!Array.isArray(b.mobilias)) b.mobilias = [];
    b.comodos = b.comodos.filter(c => c && comodoDef(c.chave));
    b.comodos.forEach(c => { if (!c.id) c.id = uid('cm'); });
    b.mobilias = b.mobilias.filter(m => m && mobiliaDef(m.chave));
    b.mobilias.forEach(m => { if (!m.id) m.id = uid('mb'); if (typeof m.comodoId !== 'string') m.comodoId = ''; });
  }

  function pegarBase(el) { return dados.bases[+el.dataset.b]; }

  // ── CÁLCULOS ─────────────────────────────────────────────────────
  function fatorSitio(b) { return b.sitio ? 0.5 : 1; }

  // Custo de construção do porte atual (acumulado a partir do mínimo).
  // Sítio Sagrado: já conta como base básica (grátis até básica) e paga
  // metade da diferença para cada porte acima de básica.
  function custoPorte(b) {
    const idx = porteIdx(b.porte);
    if (b.sitio) {
      const iBas = porteIdx('basica');
      if (idx <= iBas) return 0;
      return (porteDef(b.porte).custo - porteDef('basica').custo) / 2;
    }
    return porteDef(b.porte).custo;
  }

  function calc(b) {
    const pd = porteDef(b.porte);
    const cPorte = custoPorte(b);
    const cComodos = b.comodos.length * CUSTO_COMODO * fatorSitio(b);
    const cMobilias = b.mobilias.reduce((s, m) => s + (mobiliaDef(m.chave) ? mobiliaDef(m.chave).preco : 0), 0);

    let seg = (b.tipo && tipoDef(b.tipo) ? (tipoDef(b.tipo).seg || 0) : 0) + (b.segAjuste || 0);
    b.comodos.forEach(c => { const d = comodoDef(c.chave); if (d && d.seg) seg += d.seg; });
    b.mobilias.forEach(m => { const d = mobiliaDef(m.chave); if (d && d.seg) seg += d.seg; });
    seg = Math.max(0, seg);

    return {
      maxComodos: pd.comodos, usados: b.comodos.length, manut: pd.manut,
      custoPorte: cPorte, custoComodos: cComodos, custoMobilias: cMobilias,
      total: cPorte + cComodos + cMobilias, seg: seg,
    };
  }

  // Pré-requisitos não atendidos por um cômodo já presente na base.
  function prereqFaltando(b, chave) {
    const d = comodoDef(chave);
    if (!d) return [];
    const faltam = [];
    if (d.prereqPorte && porteIdx(b.porte) < porteIdx(d.prereqPorte)) {
      faltam.push('base ' + porteDef(d.prereqPorte).nome.toLowerCase() + ' ou melhor');
    }
    (d.prereqComodo || []).forEach(req => {
      if (!b.comodos.some(c => c.chave === req)) {
        const rd = comodoDef(req);
        faltam.push('cômodo ' + (rd ? rd.nome : req));
      }
    });
    return faltam;
  }

  // ═══════════════════════════════════════════════════════════════
  //  RENDERIZAÇÃO
  // ═══════════════════════════════════════════════════════════════
  function render() {
    const cont = document.getElementById('bases-content');
    if (!cont) return;

    let html = `
      <div class="bs-cabecalho">
        <h1>Bases do Grupo</h1>
        <p class="bs-subtitulo">Tipo, porte, cômodos e mobílias — com custos, manutenção e segurança calculados</p>
        <div class="bs-backup">
          <button class="bs-backup-btn" data-acao="exportar-json" title="Salvar um .json com todas as bases">⬇ Backup (.json)</button>
          <button class="bs-backup-btn" data-acao="exportar-txt" title="Exportar um .txt legível">⬇ Texto (.txt)</button>
          <button class="bs-backup-btn bs-backup-btn--imp" data-acao="importar-backup" title="Carregar um backup .json">⬆ Importar</button>
          <input type="file" id="bsImportFile" accept=".json,application/json" hidden>
        </div>
      </div>`;

    if (dados.bases.length === 0) {
      html += `<p class="bs-vazio">Nenhuma base ainda. Crie a primeira para o grupo ter um lugar para chamar de seu.</p>`;
    } else {
      dados.bases.forEach((b, bi) => { html += construirBase(b, bi); });
    }
    html += `<button class="bs-add bs-add--base" data-acao="add-base">＋ Nova base</button>`;

    cont.innerHTML = html;
  }

  function construirBase(b, bi) {
    const ds = `data-b="${bi}"`;
    const c = calc(b);
    const pd = porteDef(b.porte);
    const td = b.tipo ? tipoDef(b.tipo) : null;
    const semSubir  = (bi === 0) ? 'disabled' : '';
    const semDescer = (bi === dados.bases.length - 1) ? 'disabled' : '';

    if (!b.aberta) {
      return `
        <div class="bs-base bs-base--fechada">
          <div class="bs-base-cab">
            <button class="bs-toggle" data-acao="toggle-base" ${ds} title="Expandir">▸</button>
            <span class="bs-base-nome-ro">${esc(b.nome || '(base sem nome)')}</span>
            <span class="bs-base-tag">${esc(pd.nome)}</span>
            ${td ? `<span class="bs-base-tag bs-base-tag--tipo">${esc(td.nome)}</span>` : ''}
            <span class="bs-base-tag">🚪 ${c.usados}/${c.maxComodos}</span>
            <span class="bs-base-tag">🛡 ${c.seg}</span>
            <span class="bs-flex"></span>
            <button class="bs-mini" data-acao="subir-base" ${ds} ${semSubir} title="Mover para cima">↑</button>
            <button class="bs-mini" data-acao="descer-base" ${ds} ${semDescer} title="Mover para baixo">↓</button>
            <button class="bs-mini bs-mini--del" data-acao="del-base" ${ds} title="Remover base">✕</button>
          </div>
        </div>`;
    }

    // ── Identidade ──
    const tipoOpts = `<option value="">— escolha um tipo —</option>` + TIPOS.map(t =>
      `<option value="${t.chave}" ${t.chave === b.tipo ? 'selected' : ''}>${esc(t.nome)}</option>`).join('');
    const porteOpts = PORTES.map(p =>
      `<option value="${p.chave}" ${p.chave === b.porte ? 'selected' : ''}>${esc(p.nome)} — ${esc(p.comodos)} cômodos</option>`).join('');

    const identidade = `
      <div class="bs-bloco">
        <h3 class="bs-bloco-tit">🏰 Identidade</h3>
        <div class="bs-linha">
          <label class="bs-campo">Tipo
            <select class="bs-select" data-campo="tipo" ${ds}>${tipoOpts}</select>
          </label>
          <label class="bs-campo">Porte
            <select class="bs-select" data-campo="porte" ${ds}>${porteOpts}</select>
          </label>
        </div>
        ${td ? `<div class="bs-tipo-efeito"><span class="bs-tag-seg">${td.seg ? '🛡 +' + td.seg + ' seg.' : 'Benefício'}</span> ${esc(td.efeito)}</div>` : ''}
        <div class="bs-porte-info">Exemplos: ${esc(pd.exemplos)} · manutenção ${moeda(pd.manut)}/aventura · até ${pd.comodos} cômodos</div>
        <label class="bs-chk bs-chk--sitio">
          <input type="checkbox" data-campo="sitio" ${ds} ${b.sitio ? 'checked' : ''}>
          <span>⛩ <strong>Sítio Sagrado</strong> — conta como base básica e paga só metade do custo para aumentar o porte e construir cômodos</span>
        </label>
      </div>`;

    // ── Painel de cálculos ──
    const acima = c.usados > c.maxComodos;
    const calculos = `
      <div class="bs-bloco">
        <h3 class="bs-bloco-tit">🧮 Cálculos</h3>
        <div class="bs-stats">
          <div class="bs-stat">
            <span class="bs-stat-rot">Custo investido${b.sitio ? ' (½ Sítio)' : ''}</span>
            <span class="bs-stat-val">${moeda(c.total)}</span>
            <span class="bs-stat-sub">porte ${moeda(c.custoPorte)} · cômodos ${moeda(c.custoComodos)} · mobílias ${moeda(c.custoMobilias)}</span>
          </div>
          <div class="bs-stat">
            <span class="bs-stat-rot">Manutenção</span>
            <span class="bs-stat-val">${moeda(c.manut)}</span>
            <span class="bs-stat-sub">paga no início de cada aventura</span>
          </div>
          <div class="bs-stat ${acima ? 'bs-stat--alerta' : ''}">
            <span class="bs-stat-rot">Cômodos</span>
            <span class="bs-stat-val">${c.usados} / ${c.maxComodos}</span>
            <span class="bs-stat-sub">${acima ? '⚠ acima do limite do porte' : 'usados / máximo do porte'}</span>
          </div>
          <div class="bs-stat">
            <span class="bs-stat-rot">Segurança</span>
            <span class="bs-stat-val">🛡 ${c.seg}</span>
            <span class="bs-stat-sub">
              ajuste
              <button class="bs-seg-btn" data-acao="seg-menos" ${ds}>−</button>
              <input class="bs-seg-input" type="number" data-campo="segAjuste" ${ds} value="${esc(b.segAjuste)}">
              <button class="bs-seg-btn" data-acao="seg-mais" ${ds}>＋</button>
            </span>
          </div>
        </div>
        ${c.seg > 20 ? `<div class="bs-nota">Pela regra, a segurança máxima é 20.</div>` : ''}
      </div>`;

    // ── Cômodos ──
    const comodoAdd = `<select class="bs-select bs-add-sel" data-campo="add-comodo" ${ds}>
        <option value="">＋ Adicionar cômodo…</option>
        ${COMODOS.map(cm => `<option value="${cm.chave}">${esc(cm.nome)}</option>`).join('')}
      </select>`;
    let comodosLista = '';
    if (b.comodos.length === 0) {
      comodosLista = `<p class="bs-vazio-mini">Nenhum cômodo. Cada cômodo custa ${moeda(CUSTO_COMODO * fatorSitio(b))} para construir.</p>`;
    } else {
      comodosLista = b.comodos.map((c2, ci) => {
        const d = comodoDef(c2.chave); if (!d) return '';
        const faltam = prereqFaltando(b, c2.chave);
        return `
          <div class="bs-item">
            <div class="bs-item-cab">
              <span class="bs-item-nome">🚪 ${esc(d.nome)}</span>
              ${d.seg ? `<span class="bs-tag-seg">🛡 +${d.seg}</span>` : ''}
              <span class="bs-item-custo">${moeda(CUSTO_COMODO * fatorSitio(b))}</span>
              <button class="bs-mini bs-mini--del" data-acao="del-comodo" data-b="${bi}" data-i="${ci}" title="Remover cômodo">✕</button>
            </div>
            <div class="bs-item-efeito">${esc(d.efeito)}</div>
            ${faltam.length ? `<div class="bs-item-prereq">⚠ requer ${faltam.map(esc).join(', ')}</div>` : ''}
          </div>`;
      }).join('');
    }
    const blocoComodos = `
      <div class="bs-bloco">
        <h3 class="bs-bloco-tit">🚪 Cômodos <span class="bs-bloco-cont">${b.comodos.length}/${c.maxComodos}</span></h3>
        ${comodosLista}
        <div class="bs-add-linha">${comodoAdd}</div>
      </div>`;

    // ── Mobílias ──
    const mobAdd = `<select class="bs-select bs-add-sel" data-campo="add-mobilia" ${ds}>
        <option value="">＋ Adicionar mobília…</option>
        ${MOBILIAS.map(mb => `<option value="${mb.chave}">${esc(mb.nome)} — ${moeda(mb.preco)}</option>`).join('')}
      </select>`;
    let mobLista = '';
    if (b.mobilias.length === 0) {
      mobLista = `<p class="bs-vazio-mini">Nenhuma mobília. Cada cômodo pode conter uma mobília.</p>`;
    } else {
      // opções de cômodo para vincular a mobília
      const comodoVinc = b.comodos.map(c2 => {
        const d = comodoDef(c2.chave);
        return { id: c2.id, nome: d ? d.nome : c2.chave };
      });
      mobLista = b.mobilias.map((m, mi) => {
        const d = mobiliaDef(m.chave); if (!d) return '';
        const vincOpts = `<option value="">Exterior / avulsa</option>` + comodoVinc.map(cv =>
          `<option value="${cv.id}" ${cv.id === m.comodoId ? 'selected' : ''}>${esc(cv.nome)}</option>`).join('');
        return `
          <div class="bs-item">
            <div class="bs-item-cab">
              <span class="bs-item-nome">🪑 ${esc(d.nome)}</span>
              ${d.seg ? `<span class="bs-tag-seg">🛡 +${d.seg}</span>` : ''}
              <span class="bs-item-custo">${moeda(d.preco)}</span>
              <button class="bs-mini bs-mini--del" data-acao="del-mobilia" data-b="${bi}" data-i="${mi}" title="Remover mobília">✕</button>
            </div>
            <div class="bs-item-efeito">${esc(d.efeito)}</div>
            <div class="bs-item-onde">Instalação: ${esc(d.onde)}</div>
            <label class="bs-item-vinc">Instalada em
              <select class="bs-select bs-select--mini" data-campo="mobilia-comodo" data-b="${bi}" data-i="${mi}">${vincOpts}</select>
            </label>
          </div>`;
      }).join('');
    }
    const blocoMobilias = `
      <div class="bs-bloco">
        <h3 class="bs-bloco-tit">🪑 Mobílias <span class="bs-bloco-cont">${b.mobilias.length}</span></h3>
        ${mobLista}
        <div class="bs-add-linha">${mobAdd}</div>
      </div>`;

    // ── Residentes & Inventário ──
    const tipDesc = 'Pendurar uma descrição no trecho selecionado — escreva a sua ou busque na base (itens, magias, condições…). A nuvem aparece ao passar o mouse; CLIQUE no trecho para fixá-la e copiar';
    const blocoTextos = `
      <div class="bs-bloco bs-bloco--duplo">
        <div class="bs-meio">
          <h3 class="bs-bloco-tit">🧑‍🤝‍🧑 Residentes</h3>
          <div class="ga-rich-wrap">
            <div class="bs-textarea ga-rich" contenteditable="true" spellcheck="true"
                 data-campo="residentes" ${ds}
                 data-ph="Quem mora ou se beneficia da base — um por linha…">${b.residentesHtml}</div>
            <button type="button" class="ga-rich-btn" data-rich-desc title="${tipDesc}">📖</button>
          </div>
        </div>
        <div class="bs-meio">
          <h3 class="bs-bloco-tit">🎒 Inventário da base</h3>
          <div class="ga-rich-wrap">
            <div class="bs-textarea ga-rich" contenteditable="true" spellcheck="true"
                 data-campo="inventario" ${ds}
                 data-ph="Itens deixados na base pelos jogadores, suprimentos, tesouros guardados…">${b.inventarioHtml}</div>
            <button type="button" class="ga-rich-btn" data-rich-desc title="${tipDesc}">📖</button>
          </div>
        </div>
      </div>`;

    return `
      <div class="bs-base">
        <div class="bs-base-cab">
          <button class="bs-toggle" data-acao="toggle-base" ${ds} title="Recolher">▾</button>
          <input class="bs-base-nome" type="text" value="${esc(b.nome)}" data-campo="nome" ${ds} placeholder="Nome da base…">
          <span class="bs-base-tag">${esc(pd.nome)}</span>
          ${b.sitio ? `<span class="bs-base-tag bs-base-tag--sitio">⛩ Sítio</span>` : ''}
          <span class="bs-flex"></span>
          <button class="bs-mini" data-acao="subir-base" ${ds} ${semSubir} title="Mover para cima">↑</button>
          <button class="bs-mini" data-acao="descer-base" ${ds} ${semDescer} title="Mover para baixo">↓</button>
          <button class="bs-mini bs-mini--del" data-acao="del-base" ${ds} title="Remover base">✕</button>
        </div>
        <div class="bs-base-corpo">
          ${identidade}
          ${calculos}
          ${blocoComodos}
          ${blocoMobilias}
          ${blocoTextos}
        </div>
      </div>`;
  }

  // ═══════════════════════════════════════════════════════════════
  //  EVENTOS
  // ═══════════════════════════════════════════════════════════════
  function aoClicar(e) {
    const alvo = e.target.closest('[data-acao]');
    if (!alvo) return;
    const acao = alvo.dataset.acao;

    if (acao === 'add-base') {
      dados.bases.push(novaBase(dados.bases.length + 1));
      salvar(); render(); return;
    }
    if (acao === 'del-base') {
      const b = pegarBase(alvo);
      if (b && (b.nome || b.comodos.length || b.mobilias.length || b.residentes || b.inventario)
          && !confirm('Remover esta base e tudo dela?')) return;
      dados.bases.splice(+alvo.dataset.b, 1);
      salvar(); render(); return;
    }
    if (acao === 'toggle-base') {
      const b = pegarBase(alvo); b.aberta = !b.aberta;
      salvar(); render(); return;
    }
    if (acao === 'subir-base' || acao === 'descer-base') {
      const i = +alvo.dataset.b;
      const j = (acao === 'subir-base') ? i - 1 : i + 1;
      if (j < 0 || j >= dados.bases.length) return;
      const tmp = dados.bases[i]; dados.bases[i] = dados.bases[j]; dados.bases[j] = tmp;
      salvar(); render(); return;
    }
    if (acao === 'del-comodo') {
      const b = dados.bases[+alvo.dataset.b];
      b.comodos.splice(+alvo.dataset.i, 1);
      salvar(); render(); return;
    }
    if (acao === 'del-mobilia') {
      const b = dados.bases[+alvo.dataset.b];
      b.mobilias.splice(+alvo.dataset.i, 1);
      salvar(); render(); return;
    }
    if (acao === 'seg-menos' || acao === 'seg-mais') {
      const b = pegarBase(alvo);
      b.segAjuste = (parseInt(b.segAjuste, 10) || 0) + (acao === 'seg-mais' ? 1 : -1);
      salvar(); render(); return;
    }
    if (acao === 'exportar-json') { exportarJSON(); return; }
    if (acao === 'exportar-txt')  { exportarTXT();  return; }
    if (acao === 'importar-backup') {
      const inp = document.getElementById('bsImportFile');
      if (inp) inp.click();
      return;
    }
  }

  // input — caixas de texto/número (não re-renderiza, mantém o foco)
  function aoEntrada(e) {
    const el = e.target;
    const campo = el.dataset && el.dataset.campo;
    if (!campo || el.dataset.b == null) return;
    const b = pegarBase(el);
    if (!b) return;

    if (campo === 'nome')       { b.nome = el.value; salvar(); return; }
    if (campo === 'residentes') {
      b.residentesHtml = el.innerHTML;
      b.residentes = window.htmlParaTexto(el.innerHTML);   // espelho puro (export .txt)
      salvar(); return;
    }
    if (campo === 'inventario') {
      b.inventarioHtml = el.innerHTML;
      b.inventario = window.htmlParaTexto(el.innerHTML);
      salvar(); return;
    }
    if (campo === 'segAjuste')  { b.segAjuste = parseInt(el.value, 10) || 0; salvar(); atualizarSeg(el, b); return; }
  }

  // Atualiza só o número de segurança ao digitar o ajuste (sem re-render).
  function atualizarSeg(el, b) {
    const card = el.closest('.bs-base');
    if (!card) return;
    const c = calc(b);
    const val = card.querySelector('.bs-stat .bs-stat-val');
    // o valor de segurança é o 4º stat; busca pelo rótulo para garantir
    card.querySelectorAll('.bs-stat').forEach(st => {
      const rot = st.querySelector('.bs-stat-rot');
      if (rot && rot.textContent.trim() === 'Segurança') {
        const v = st.querySelector('.bs-stat-val');
        if (v) v.textContent = '🛡 ' + c.seg;
      }
    });
  }

  // change — selects e checkboxes (re-renderiza p/ recalcular)
  function aoMudar(e) {
    const el = e.target;
    const campo = el.dataset && el.dataset.campo;
    if (el.id === 'bsImportFile') { aoEscolherBackup(e); return; }
    if (!campo || el.dataset.b == null) return;
    const b = pegarBase(el);
    if (!b) return;

    if (campo === 'tipo')  { b.tipo = el.value; salvar(); render(); return; }
    if (campo === 'porte') { b.porte = el.value; salvar(); render(); return; }
    if (campo === 'sitio') { b.sitio = el.checked; salvar(); render(); return; }
    if (campo === 'add-comodo') {
      if (el.value) { b.comodos.push({ id: uid('cm'), chave: el.value }); salvar(); render(); }
      return;
    }
    if (campo === 'add-mobilia') {
      if (el.value) { b.mobilias.push({ id: uid('mb'), chave: el.value, comodoId: '' }); salvar(); render(); }
      return;
    }
    if (campo === 'mobilia-comodo') {
      const m = b.mobilias[+el.dataset.i];
      if (m) { m.comodoId = el.value; salvar(); }
      return;
    }
  }

  // ── BACKUP / EXPORTAÇÃO ──────────────────────────────────────────
  function exportarJSON() {
    if (!dados.bases.length) { alert('Não há bases para exportar.'); return; }
    const pacote = { app: 'Grifos Alados', tipo: 'bases', versao: 1, exportadoEm: new Date().toISOString(), bases: dados.bases };
    baixarTxt(`bases_${carimboArquivo()}.json`, JSON.stringify(pacote, null, 2));
  }

  function exportarTXT() {
    if (!dados.bases.length) { alert('Não há bases para exportar.'); return; }
    let txt = ['══════════════════════════════════════════════',
               '   GRIFOS ALADOS · BASES DO GRUPO',
               `   Exportado em ${new Date().toLocaleString('pt-BR')}`,
               '══════════════════════════════════════════════'].join('\n') + '\n';
    dados.bases.forEach(b => {
      const c = calc(b); const pd = porteDef(b.porte); const td = b.tipo ? tipoDef(b.tipo) : null;
      txt += `\n\n■ ${b.nome || '(base sem nome)'}\n${'═'.repeat(46)}`;
      txt += `\n  Porte: ${pd.nome} (até ${pd.comodos} cômodos)`;
      txt += `\n  Tipo: ${td ? td.nome : '—'}${b.sitio ? '  [Sítio Sagrado: custos pela metade]' : ''}`;
      txt += `\n  Custo investido: ${moeda(c.total)} (porte ${moeda(c.custoPorte)} · cômodos ${moeda(c.custoComodos)} · mobílias ${moeda(c.custoMobilias)})`;
      txt += `\n  Manutenção: ${moeda(c.manut)}/aventura`;
      txt += `\n  Segurança: ${c.seg}`;
      txt += `\n  Cômodos (${c.usados}/${c.maxComodos}):`;
      if (b.comodos.length) b.comodos.forEach(cm => { const d = comodoDef(cm.chave); if (d) txt += `\n    • ${d.nome}`; });
      else txt += `\n    (nenhum)`;
      txt += `\n  Mobílias:`;
      if (b.mobilias.length) b.mobilias.forEach(mb => { const d = mobiliaDef(mb.chave); if (d) txt += `\n    • ${d.nome} (${moeda(d.preco)})`; });
      else txt += `\n    (nenhuma)`;
      if ((b.residentes || '').trim()) txt += `\n  Residentes:\n${b.residentes.trim().split('\n').map(l => '    ' + l).join('\n')}`;
      if ((b.inventario || '').trim()) txt += `\n  Inventário:\n${b.inventario.trim().split('\n').map(l => '    ' + l).join('\n')}`;
    });
    baixarTxt(`bases_${carimboArquivo()}.txt`, txt + '\n');
  }

  function aoEscolherBackup(e) {
    const input = e.target;
    if (!input || input.id !== 'bsImportFile' || !input.files || !input.files.length) return;
    const arq = input.files[0];
    input.value = '';
    const leitor = new FileReader();
    leitor.onload = () => {
      let parsed;
      try { parsed = JSON.parse(leitor.result); }
      catch (err) { alert('Arquivo inválido — não é um backup .json do Grifos Alados.'); return; }
      if (parsed && parsed.tipo && parsed.tipo !== 'bases') {
        alert('Este arquivo é um backup de "' + parsed.tipo + '", não das Bases.'); return;
      }
      const bruto = Array.isArray(parsed) ? parsed : (parsed && Array.isArray(parsed.bases) ? parsed.bases : null);
      if (!bruto || !bruto.length) { alert('Backup sem bases — verifique o arquivo.'); return; }
      bruto.forEach(b => { b.id = uid('base'); normalizarBase(b); });
      const totalAtual = dados.bases.length;
      const overlay = GA_abrirModal(`
        <div class="ga-modal-cab"><span>⬆ Importar bases</span><button class="ga-modal-x" data-ga-fechar title="Fechar">✕</button></div>
        <p class="ga-modal-dica">O arquivo traz <strong>${bruto.length} base${bruto.length !== 1 ? 's' : ''}</strong>. Você tem ${totalAtual} no momento.</p>
        <div class="ga-modal-acoes">
          <button class="ga-btn-sec" data-ga-fechar>Cancelar</button>
          <button class="ga-btn-sec" data-imp-modo="adicionar">➕ Adicionar</button>
          <button class="ga-btn-principal" data-imp-modo="substituir">♻ Substituir tudo</button>
        </div>`);
      overlay.addEventListener('click', ev => {
        const btn = ev.target.closest('[data-imp-modo]');
        if (!btn) return;
        if (btn.dataset.impModo === 'substituir') {
          if (totalAtual && !confirm('Isto APAGA as ' + totalAtual + ' bases atuais. Continuar?')) return;
          dados.bases = bruto;
        } else {
          dados.bases = dados.bases.concat(bruto);
        }
        salvarAgora(); overlay._fechar(); render();
      });
    };
    leitor.onerror = () => alert('Não foi possível ler o arquivo.');
    leitor.readAsText(arq);
  }

  // ── API pública (edição dos jogadores) ──────────────────────────────
  //  O sync-jogador chama isto ao receber as bases do mestre: relê o
  //  localStorage (já escrito pelo sync) e redesenha — sem recarregar a
  //  página. Resolve a corrida do 1º carregamento (init lê antes do sync
  //  escrever) e não pisca a tela.
  window.GA_Bases = {
    recarregar: function () { carregar(); render(); }
  };

  // ── INICIALIZAÇÃO ────────────────────────────────────────────────
  function init() {
    const secao = document.getElementById('bases');
    if (!secao) return;
    carregar();
    try { render(); }
    catch (err) {
      console.error('[bases] falha ao renderizar:', err);
      const cont = document.getElementById('bases-content');
      if (cont) cont.innerHTML = `<div class="bs-erro"><strong>Erro ao montar a aba:</strong><br>${esc(err && err.message ? err.message : String(err))}</div>`;
    }
    secao.addEventListener('click', aoClicar);
    secao.addEventListener('input', aoEntrada);
    secao.addEventListener('change', aoMudar);
    // campos ricos: 📖 descrição pendurada + colar limpo (handlers globais)
    secao.addEventListener('mousedown', window.GA_richDescMousedown);
    secao.addEventListener('paste', window.GA_richPaste);
    window.addEventListener('beforeunload', salvarAgora);
    document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') salvarAgora(); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

})();
