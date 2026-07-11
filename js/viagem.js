// ═══════════════════════════════════════════════════════════════════
//  VIAGEM.JS — Painel de Viagem (Tormenta 20)
//  Várias viagens salvas no localStorage. Cada viagem tem:
//    • Ritmo & Distância — calculadora da Tabela 6-4 (deslocamento →
//      km/h e km/dia) com reduções de terreno/clima e marcha forçada.
//    • Progresso — barra km percorrido/total, dias, suprimentos.
//    • Diário de viagem — registro manual de eventos (chuva, assalto…).
//    • Paradas narradas — santuários, ruínas, acampamentos…
// ═══════════════════════════════════════════════════════════════════

(function () {
  'use strict';

  const STORAGE_KEY = 'grifosAlados.viagens';

  // Tabela 6-4: deslocamento (m) → km por hora (×0,5). Por dia = ×8.
  const DESLOCS = [
    { v: '4.5', label: '4,5 m' },
    { v: '6',   label: '6 m'   },
    { v: '7.5', label: '7,5 m' },
    { v: '9',   label: '9 m'   },
    { v: '12',  label: '12 m'  },
  ];

  // Atalhos do diário (registro manual, sem rolagem).
  const ATALHOS_DIARIO = [
    { rotulo: '🌧 Chuva',    prefixo: '🌧 Chuva — ' },
    { rotulo: '⚔ Assalto',   prefixo: '⚔ Assalto — ' },
    { rotulo: '👣 Encontro', prefixo: '👣 Encontro — ' },
    { rotulo: '💰 Achado',   prefixo: '💰 Achado — ' },
    { rotulo: '🏕 Descanso', prefixo: '🏕 Descanso — ' },
    { rotulo: '✍ Outro',     prefixo: '' },
  ];

  let dados = { viagens: [] };

  // ── PERSISTÊNCIA ─────────────────────────────────────────────────
  function carregar() {
    try {
      const txt = localStorage.getItem(STORAGE_KEY);
      if (txt) dados = JSON.parse(txt);
    } catch (e) { console.warn('[viagem] não carregou:', e.message); }
    if (!dados || typeof dados !== 'object') dados = {};
    if (!Array.isArray(dados.viagens)) dados.viagens = [];
    dados.viagens.forEach(normalizarViagem);
  }

  let _t = null;
  function _gravar() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(dados)); }
    catch (e) { console.warn('[viagem] não salvou:', e.message); }
  }
  function salvar()     { clearTimeout(_t); _t = setTimeout(_gravar, 250); }
  function salvarAgora(){ clearTimeout(_t); _gravar(); }

  // ── AUXILIARES ───────────────────────────────────────────────────
  function uid(p) { return p + '_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
  const esc = window.GA_esc;
  const nl2br = window.GA_nl2br;
  function fmt(n) {
    if (!isFinite(n)) return '0';
    return Number(n).toLocaleString('pt-BR', { maximumFractionDigits: 2 });
  }

  function novaViagem(n) {
    return {
      id: uid('vg'), aberta: true, nome: 'Viagem ' + n,
      transporte: { tipo: 'pe', chave: '', pvAtual: null, manual: false, deslocManual: '' },
      desloc: '9', deslocManual: '', terrenoDificil: false, climaRuim: false, marcha: false,
      distTotal: '', distFeita: '', dias: 0, suprimentos: '',
      diario: [], paradas: [],
    };
  }
  function normalizarViagem(v) {
    if (!v.id) v.id = uid('vg');
    if (typeof v.nome !== 'string') v.nome = 'Viagem';
    if (typeof v.aberta !== 'boolean') v.aberta = true;
    if (typeof v.desloc !== 'string') v.desloc = '9';
    if (typeof v.deslocManual !== 'string') v.deslocManual = '';
    // meio de transporte (a pé / veículo / montaria) — migra dados antigos
    if (!v.transporte || typeof v.transporte !== 'object') v.transporte = { tipo: 'pe', chave: '', pvAtual: null };
    if (typeof v.transporte.tipo !== 'string') v.transporte.tipo = 'pe';
    if (typeof v.transporte.chave !== 'string') v.transporte.chave = '';
    if (typeof v.transporte.pvAtual !== 'number') v.transporte.pvAtual = null;   // null = PV cheio
    if (typeof v.transporte.manual !== 'boolean') v.transporte.manual = false;   // override manual de metros
    if (typeof v.transporte.deslocManual !== 'string') v.transporte.deslocManual = '';
    ['terrenoDificil', 'climaRuim', 'marcha'].forEach(k => { if (typeof v[k] !== 'boolean') v[k] = false; });
    ['distTotal', 'distFeita', 'suprimentos'].forEach(k => { if (typeof v[k] !== 'string') v[k] = ''; });
    if (typeof v.dias !== 'number') v.dias = parseInt(v.dias, 10) || 0;
    if (!Array.isArray(v.diario)) v.diario = [];
    if (!Array.isArray(v.paradas)) v.paradas = [];
    // diário/paradas: texto rico (grifos e 📖) com espelho PURO em .texto
    // (o export .txt lê o puro). Migração idempotente de dados antigos.
    v.diario.forEach(d => {
      if (!d.id) d.id = uid('d');
      if (typeof d.texto !== 'string') d.texto = '';
      d.textoHtml = (typeof d.textoHtml === 'string')
        ? window.GA_limparHtml(d.textoHtml) : window.GA_nl2br(d.texto);
    });
    v.paradas.forEach(p => {
      if (!p.id) p.id = uid('p');
      if (typeof p.nome !== 'string') p.nome = '';
      if (typeof p.texto !== 'string') p.texto = '';
      p.textoHtml = (typeof p.textoHtml === 'string')
        ? window.GA_limparHtml(p.textoHtml) : window.GA_nl2br(p.texto);
    });
  }

  function pegarViagem(el) { return dados.viagens[+el.dataset.v]; }

  // ── CÁLCULO DE RITMO E PROGRESSO ─────────────────────────────────
  // Deslocamento (m) que vale para o ritmo: do veículo/montaria escolhido
  // ou, se "a pé", o valor manual. Devolve string (ex.: "9", "12").
  function transporteAtual(v) {
    const t = v.transporte || { tipo: 'pe', chave: '' };
    if (t.tipo === 'veiculo') return (window.VEICULOS || []).find(x => x.chave === t.chave) || null;
    if (t.tipo === 'montaria') return (window.ANIMAIS_COMPRA || []).find(x => x.chave === t.chave) || null;
    return null;
  }
  function deslocEfetivo(v) {
    const t = v.transporte || {};
    const obj = transporteAtual(v);
    if (obj) {
      // veículo/montaria: deslocamento da ficha, ou um valor "Manual" digitado
      if (t.manual) return (t.deslocManual || '').trim() || '0';
      if (obj.deslocMetros) return String(obj.deslocMetros);
    }
    // a pé: valor fixo da tabela ou um deslocamento "Manual" digitado
    if (v.desloc === 'manual') return (v.deslocManual || '').trim() || '0';
    return v.desloc;
  }

  // Veículo do transporte (ou null) e seus PV (atual/máximo).
  function veiculoDaViagem(v) {
    const t = v.transporte || {};
    if (t.tipo !== 'veiculo') return null;
    return (window.VEICULOS || []).find(x => x.chave === t.chave) || null;
  }
  function pvInfo(v) {
    const veic = veiculoDaViagem(v);
    if (!veic) return null;
    const pvMax = veic.pv;
    const pvAtual = (v.transporte.pvAtual != null) ? v.transporte.pvAtual : pvMax;
    return { veic: veic, pvMax: pvMax, pvAtual: pvAtual };
  }
  // Aplica um novo PV ao veículo da viagem e avisa as duas abas (evento) —
  // é o que mantém a vida sincronizada entre Viagem e Monstros.
  function _aplicarPV(v, pv) {
    const info = pvInfo(v);
    if (!info) return;
    pv = Math.max(-info.pvMax, Math.min(info.pvMax, parseInt(pv, 10) || 0));
    v.transporte.pvAtual = pv;
    salvar();
    window.dispatchEvent(new CustomEvent('ga-veiculo-pv', { detail: { viagemId: v.id, pvAtual: pv } }));
  }
  function ritmo(v) {
    const desl = deslocEfetivo(v);
    const map = { '4.5': 2.25, '6': 3, '7.5': 3.75, '9': 4.5, '12': 6 };
    const baseH = (map[desl] != null) ? map[desl] : (parseFloat(String(desl).replace(',', '.')) || 0) * 0.5;
    let f = 1;
    if (v.terrenoDificil) f *= 0.5;
    if (v.climaRuim) f *= 0.5;
    if (v.marcha) f *= 2;
    const kmH = baseH * f;
    return { kmH: kmH, kmDia: kmH * 8 };
  }
  function progresso(v) {
    const total = parseFloat(String(v.distTotal).replace(',', '.')) || 0;
    const feita = parseFloat(String(v.distFeita).replace(',', '.')) || 0;
    const pct = total > 0 ? Math.max(0, Math.min(100, feita / total * 100)) : 0;
    const faltam = Math.max(0, total - feita);
    const r = ritmo(v);
    const diasRest = r.kmDia > 0 ? Math.ceil(faltam / r.kmDia) : null;
    return { total, feita, pct, faltam, diasRest };
  }

  // ═══════════════════════════════════════════════════════════════
  //  RENDERIZAÇÃO
  // ═══════════════════════════════════════════════════════════════
  function render() {
    const cont = document.getElementById('viagem-content');
    if (!cont) return;

    let html = `
      <div class="vg-cabecalho">
        <h1>Painel de Viagem</h1>
        <p class="vg-subtitulo">Ritmo, distância, eventos e paradas das jornadas pelos ermos de Arton</p>
        <div class="vg-backup">
          <button class="vg-backup-btn" data-acao="exportar-json" title="Salvar um .json com todas as viagens">⬇ Backup (.json)</button>
          <button class="vg-backup-btn" data-acao="exportar-txt" title="Exportar um .txt legível">⬇ Texto (.txt)</button>
          <button class="vg-backup-btn vg-backup-btn--imp" data-acao="importar-backup" title="Carregar um backup .json">⬆ Importar</button>
          <input type="file" id="vgImportFile" accept=".json,application/json" hidden>
        </div>
      </div>`;

    if (dados.viagens.length === 0) {
      html += `<p class="vg-vazio">Nenhuma viagem ainda. Crie a primeira para começar a jornada.</p>`;
    } else {
      dados.viagens.forEach((v, vi) => { html += construirViagem(v, vi); });
    }
    html += `<button class="vg-add vg-add--viagem" data-acao="add-viagem">＋ Nova viagem</button>`;

    cont.innerHTML = html;
  }

  function construirViagem(v, vi) {
    const r = ritmo(v);
    const p = progresso(v);
    const semSubir  = (vi === 0) ? 'disabled' : '';
    const semDescer = (vi === dados.viagens.length - 1) ? 'disabled' : '';

    // ── Ritmo & Distância (com meio de transporte) ──
    const t = v.transporte || { tipo: 'pe', chave: '' };
    const chk = (campo, on, rotulo) =>
      `<label class="vg-chk"><input type="checkbox" data-campo="${campo}" data-v="${vi}" ${on ? 'checked' : ''}> ${rotulo}</label>`;

    // seletor de meio de transporte (a pé / veículos / montarias compráveis)
    const veics = window.VEICULOS || [];
    const monts = (window.ANIMAIS_COMPRA || []).filter(a => a.deslocMetros);
    let topts = `<option value="pe:" ${t.tipo === 'pe' ? 'selected' : ''}>🚶 A pé / outro (manual)</option>`;
    if (veics.length) {
      topts += `<optgroup label="🚗 Veículos">` + veics.map(x =>
        `<option value="veiculo:${esc(x.chave)}" ${t.tipo === 'veiculo' && t.chave === x.chave ? 'selected' : ''}>${esc(x.nome)} (${esc(x.desloc)})</option>`).join('') + `</optgroup>`;
    }
    if (monts.length) {
      topts += `<optgroup label="🐎 Montarias">` + monts.map(x =>
        `<option value="montaria:${esc(x.chave)}" ${t.tipo === 'montaria' && t.chave === x.chave ? 'selected' : ''}>${esc(x.nome)} (${x.deslocMetros} m)</option>`).join('') + `</optgroup>`;
    }

    // deslocamento: a pé (tabela ou manual) ou fixado pelo transporte escolhido
    let deslocUI;
    if (t.tipo === 'pe') {
      const opts = DESLOCS.map(d => `<option value="${d.v}" ${d.v === v.desloc ? 'selected' : ''}>${d.label}</option>`).join('')
        + `<option value="manual" ${v.desloc === 'manual' ? 'selected' : ''}>✍ Manual…</option>`;
      const manualUI = (v.desloc === 'manual')
        ? `<label class="vg-campo-inline vg-desloc-manual">Metros
            <input type="number" class="vg-input vg-input--num" min="0" step="0.5"
                   placeholder="ex.: 15" value="${esc(v.deslocManual)}"
                   data-campo="deslocManual" data-v="${vi}"></label>
           <span class="vg-desloc-dica">deslocamento do mais lento, já com efeitos de velocidade</span>`
        : '';
      deslocUI = `<label class="vg-campo-inline">Deslocamento do grupo (mais lento)
        <select class="vg-select" data-campo="desloc" data-v="${vi}">${opts}</select></label>${manualUI}`;
    } else {
      // veículo/montaria: usa o deslocamento da ficha ou permite digitar à mão
      const obj = transporteAtual(v);
      const fichaM = (obj && obj.deslocMetros) ? obj.deslocMetros + ' m' : '—';
      const opts = `<option value="ficha" ${!t.manual ? 'selected' : ''}>Da ficha (${esc(fichaM)})</option>`
        + `<option value="manual" ${t.manual ? 'selected' : ''}>✍ Manual…</option>`;
      const manualUI = t.manual
        ? `<label class="vg-campo-inline vg-desloc-manual">Metros
            <input type="number" class="vg-input vg-input--num" min="0" step="0.5"
                   placeholder="ex.: 15" value="${esc(t.deslocManual)}"
                   data-campo="transpDeslocManual" data-v="${vi}"></label>
           <span class="vg-desloc-dica">deslocamento já com efeitos de velocidade</span>`
        : `<div class="vg-desloc-fix">Deslocamento: <strong>${esc(deslocEfetivo(v))} m</strong>`
          + (obj ? ` <span class="vg-desloc-fonte">— ${esc(obj.nome)}</span>` : '') + `</div>`;
      deslocUI = `<label class="vg-campo-inline">Deslocamento
        <select class="vg-select" data-campo="deslocModoTransp" data-v="${vi}">${opts}</select></label>${manualUI}`;
    }

    const blocoRitmo = `
      <div class="vg-bloco">
        <h3 class="vg-bloco-tit">🧭 Ritmo &amp; Distância</h3>
        <div class="vg-linha">
          <label class="vg-campo-inline vg-campo-inline--full">Meio de transporte
            <select class="vg-select" data-campo="transporte" data-v="${vi}">${topts}</select>
          </label>
        </div>
        <div class="vg-linha">${deslocUI}</div>
        <div class="vg-chks">
          ${chk('terrenoDificil', v.terrenoDificil, 'Terreno difícil (½)')}
          ${chk('climaRuim', v.climaRuim, 'Clima ruim (½)')}
          ${chk('marcha', v.marcha, 'Marcha forçada (×2)')}
        </div>
        <div class="vg-ritmo-out">
          Ritmo efetivo: <strong>${fmt(r.kmH)} km/h</strong> · <strong>${fmt(r.kmDia)} km/dia</strong>
        </div>
        ${v.marcha ? `<div class="vg-aviso">⚠ Marcha forçada: a cada hora, Fortitude (CD 15 +1 por teste anterior) ou perde 1d6 PV.</div>` : ''}
      </div>`;

    // ── Progresso ──
    const blocoProgresso = `
      <div class="vg-bloco">
        <h3 class="vg-bloco-tit">📍 Progresso</h3>
        <div class="vg-linha">
          <label class="vg-campo-inline">Distância total (km)
            <input class="vg-num" type="text" inputmode="decimal" data-campo="distTotal" data-v="${vi}" value="${esc(v.distTotal)}" placeholder="0">
          </label>
          <label class="vg-campo-inline">Percorrido (km)
            <input class="vg-num" type="text" inputmode="decimal" data-campo="distFeita" data-v="${vi}" value="${esc(v.distFeita)}" placeholder="0">
          </label>
        </div>
        <div class="vg-bar"><div class="vg-bar-fill" style="width:${p.pct}%"></div></div>
        <div class="vg-bar-txt">${fmt(p.pct)}% · faltam <strong>${fmt(p.faltam)} km</strong>${p.diasRest != null && p.faltam > 0 ? ` · ~${p.diasRest} dia${p.diasRest !== 1 ? 's' : ''} neste ritmo` : ''}</div>
        <div class="vg-linha vg-linha--dias">
          <span class="vg-dias-rot">Dias de viagem</span>
          <button class="vg-step" data-acao="dia-menos" data-v="${vi}" title="–1 dia">−</button>
          <input class="vg-dias" type="text" inputmode="numeric" data-campo="dias" data-v="${vi}" value="${esc(v.dias)}">
          <button class="vg-step" data-acao="dia-mais" data-v="${vi}" title="+1 dia">＋</button>
          <span class="vg-dica">guia faz Sobrevivência/dia para não se perder</span>
        </div>
        <div class="vg-linha">
          <label class="vg-campo-inline vg-campo-inline--full">Suprimentos / rações
            <input class="vg-input" type="text" data-campo="suprimentos" data-v="${vi}" value="${esc(v.suprimentos)}" placeholder="Ex.: 5 rações por personagem">
          </label>
        </div>
        <div class="vg-dica">sem comida/água: Fortitude/dia (CD 15 +1) → fatigado → exausto → inconsciente → morte.</div>
      </div>`;

    // ── Diário de viagem ──
    let atalhos = '';
    ATALHOS_DIARIO.forEach((a, ai) => {
      atalhos += `<button class="vg-atalho" data-acao="quick-diario" data-v="${vi}" data-prefixo="${esc(a.prefixo)}">${esc(a.rotulo)}</button>`;
    });
    let diarioItens = '';
    if (v.diario.length === 0) {
      diarioItens = `<p class="vg-vazio-menor">Nada registrado. Use os atalhos acima para anotar o que acontece na estrada.</p>`;
    } else {
      v.diario.forEach((d, di) => {
        diarioItens += `
          <div class="vg-diario-item">
            <div class="ga-rich-wrap">
              <div class="vg-textarea ga-rich" contenteditable="true" spellcheck="true"
                   data-campo="diario-texto" data-v="${vi}" data-d="${di}"
                   data-ph="O que aconteceu…">${d.textoHtml}</div>
              <button type="button" class="ga-rich-btn" data-rich-desc
                      title="Pendurar uma descrição no trecho selecionado — escreva a sua ou busque na base (itens, magias, condições…). A nuvem aparece ao passar o mouse; CLIQUE no trecho para fixá-la e copiar">📖</button>
            </div>
            <button class="vg-del" data-acao="del-diario" data-v="${vi}" data-d="${di}" title="Remover">✕</button>
          </div>`;
      });
    }
    const blocoDiario = `
      <div class="vg-bloco">
        <h3 class="vg-bloco-tit">📜 Diário de viagem</h3>
        <div class="vg-atalhos">${atalhos}</div>
        <div class="vg-diario-lista">${diarioItens}</div>
      </div>`;

    // ── Paradas narradas ──
    let paradasHtml = '';
    if (v.paradas.length === 0) {
      paradasHtml = `<p class="vg-vazio-menor">Nenhuma parada. Crie uma para narrar um santuário, ruína, acampamento…</p>`;
    } else {
      v.paradas.forEach((pa, pi) => {
        paradasHtml += `
          <div class="vg-parada">
            <div class="vg-parada-cab">
              <input class="vg-parada-nome" type="text" data-campo="parada-nome" data-v="${vi}" data-p="${pi}"
                     value="${esc(pa.nome)}" placeholder="Nome da parada (ex.: Santuário de Khalmyr)">
              <button class="vg-del" data-acao="del-parada" data-v="${vi}" data-p="${pi}" title="Remover">✕</button>
            </div>
            <div class="ga-rich-wrap">
              <div class="vg-textarea vg-textarea--parada ga-rich" contenteditable="true" spellcheck="true"
                   data-campo="parada-texto" data-v="${vi}" data-p="${pi}"
                   data-ph="Narração / efeito desta parada…">${pa.textoHtml}</div>
              <button type="button" class="ga-rich-btn" data-rich-desc
                      title="Pendurar uma descrição no trecho selecionado — escreva a sua ou busque na base (itens, magias, condições…). A nuvem aparece ao passar o mouse; CLIQUE no trecho para fixá-la e copiar">📖</button>
            </div>
          </div>`;
      });
    }
    const blocoParadas = `
      <div class="vg-bloco">
        <h3 class="vg-bloco-tit">⛩ Paradas narradas</h3>
        <div class="vg-paradas-lista">${paradasHtml}</div>
        <button class="vg-add vg-add--parada" data-acao="add-parada" data-v="${vi}">＋ Parada</button>
      </div>`;

    return `
      <div class="vg-viagem ${v.aberta ? 'vg-aberta' : ''}">
        <div class="vg-viagem-cab">
          <button class="vg-toggle" data-acao="toggle-viagem" data-v="${vi}" title="Expandir / recolher">${v.aberta ? '▾' : '▸'}</button>
          <input class="vg-nome" type="text" data-campo="nome" data-v="${vi}" value="${esc(v.nome)}" placeholder="Nome da viagem">
          <button class="vg-mover" data-acao="subir-viagem" data-v="${vi}" ${semSubir} title="Mover para cima">↑</button>
          <button class="vg-mover" data-acao="descer-viagem" data-v="${vi}" ${semDescer} title="Mover para baixo">↓</button>
          <button class="vg-del" data-acao="del-viagem" data-v="${vi}" title="Remover viagem">✕</button>
        </div>
        <div class="vg-viagem-corpo">
          <div class="vg-grade">
            ${blocoRitmo}
            ${blocoProgresso}
          </div>
          ${blocoFichaTransporte(v, vi)}
          ${blocoDiario}
          ${blocoParadas}
          ${blocoCombate(v, vi)}
          ${blocoRegras()}
        </div>
      </div>`;
  }

  // Ficha do meio de transporte. Para veículos, mostra estatísticas e um
  // controlador de PV (a MESMA vida compartilhada com a aba Monstros).
  function blocoFichaTransporte(v, vi) {
    const info = pvInfo(v);
    if (!info) return '';   // só veículos têm ficha com PV
    const veic = info.veic;
    const row = (rot, val, wide) => {
      val = (val == null ? '' : String(val)).trim();
      if (!val) return '';
      return `<div class="vg-fic-stat${wide ? ' vg-fic-stat--wide' : ''}"><span class="vg-fic-rot">${esc(rot)}</span><span>${esc(val)}</span></div>`;
    };
    return `
      <div class="vg-bloco vg-ficha-veiculo">
        <h3 class="vg-bloco-tit">🚗 ${esc(veic.nome)} <span class="vg-ficha-tam">${esc(veic.tamanho)}</span></h3>
        <div class="vg-pv" data-vpv-box="${esc(v.id)}">
          <span class="vg-pv-rot">PV do veículo</span>
          <button class="vg-step" data-acao="veic-pv-menos" data-v="${vi}" title="−1 PV">−</button>
          <input class="vg-pv-in" type="text" inputmode="numeric" data-campo="veic-pv" data-v="${vi}" data-vpv="${esc(v.id)}" value="${esc(info.pvAtual)}">
          <span class="vg-pv-max">/ ${esc(info.pvMax)}</span>
          <button class="vg-step" data-acao="veic-pv-mais" data-v="${vi}" title="+1 PV">＋</button>
          <button class="vg-pv-full" data-acao="veic-pv-full" data-v="${vi}" title="Restaurar PV cheio">↺ cheio</button>
        </div>
        <div class="vg-ficha-stats">
          ${row('Deslocamento', veic.desloc)}
          ${veic.rd ? row('Redução de dano', veic.rd) : ''}
          ${row('Tração', veic.tracao)}
          ${row('Defesa', veic.defesa, true)}
          ${row('Tripulação', veic.tripulacao, true)}
          ${row('Passageiros / carga', veic.capacidade, true)}
          ${row('Cobertura', veic.cobertura, true)}
        </div>
        ${veic.regras ? `<div class="vg-ficha-regras">${nl2br(veic.regras)}</div>` : ''}
        <div class="vg-dica">Pilotar em situação ruim: Pilotagem CD 15 (CD 25 se muito ruim). A 0 PV o veículo para de funcionar; com PV negativo igual a −½ do máximo, é destruído.</div>
      </div>`;
  }

  // Bloco "Combate em viagem": botão que cria a cena no Monstros +
  // cartão recolhível com as regras rápidas de veículo em combate.
  function blocoCombate(v, vi) {
    const regras = window.VEICULOS_REGRAS || [];
    const minis = ['embarcando', 'pilotando', 'colisoes', 'atropelamento', 'atacar', 'rodas', 'tracao', 'aeronaves']
      .map(ch => regras.find(r => r.chave === ch))
      .filter(Boolean)
      .map(r => `<details class="vg-regra-mini"><summary>${esc(r.titulo)}</summary><div class="vg-regra-mini-corpo">${nl2br(r.texto)}</div></details>`)
      .join('');
    return `
      <div class="vg-bloco">
        <h3 class="vg-bloco-tit">⚔ Combate em viagem</h3>
        <p class="vg-dica">Assalto na estrada, briga em carroça, perseguição… deixe pronto pra estourar.</p>
        <button class="vg-add vg-add--combate" data-acao="criar-combate" data-v="${vi}">⚔ Criar cena de combate no Monstros</button>
        ${minis ? `<div class="vg-combate-regras"><span class="vg-combate-rot">Regras rápidas de veículo em combate</span>${minis}</div>` : ''}
      </div>`;
  }

  function blocoRegras() {
    return `
      <details class="vg-regras">
        <summary>📖 Regras de viagem (consulta)</summary>
        <div class="vg-regras-corpo">
          <p><strong>Velocidade (Tabela 6-4).</strong> Por hora = deslocamento × 0,5 km; por dia = por hora × 8 (ritmo normal de 8h). Use o deslocamento do membro mais lento do grupo.</p>
          <p><strong>Terreno e clima.</strong> Terreno difícil (florestas, pântanos…) ou clima ruim (chuva, neblina…) reduzem a distância à metade. As reduções são cumulativas. A critério do mestre, testes de Sobrevivência podem anulá-las.</p>
          <p><strong>Marcha forçada.</strong> A distância por hora dobra, mas a cada hora o personagem faz Fortitude (CD 15 +1 por teste anterior) ou perde 1d6 PV.</p>
          <p><strong>Perdendo-se.</strong> Sem estrada ou marco (rio, praia), o guia faz Sobrevivência por dia ou o grupo se perde (viaja em direção aleatória). 1×/dia, cada um pode fazer Sobrevivência (CD 20 –1 por dia perdido) para perceber e corrigir o rumo.</p>
          <p><strong>Suprimentos.</strong> 1 dia sem água/comida sem problema; depois, Fortitude/dia (CD 15 +1) → fatigado → exausto → inconsciente → morte. Sobrevivência acha suprimentos no caminho.</p>
        </div>
      </details>`;
  }

  // Atualiza só os números de progresso de um card (sem re-render, p/ não
  // perder o foco enquanto se digita a distância).
  function atualizarProgresso(el) {
    const card = el.closest('.vg-viagem');
    const v = pegarViagem(el);
    if (!card || !v) return;
    const p = progresso(v);
    const fill = card.querySelector('.vg-bar-fill');
    const txt  = card.querySelector('.vg-bar-txt');
    if (fill) fill.style.width = p.pct + '%';
    if (txt) txt.innerHTML = `${fmt(p.pct)}% · faltam <strong>${fmt(p.faltam)} km</strong>` +
      (p.diasRest != null && p.faltam > 0 ? ` · ~${p.diasRest} dia${p.diasRest !== 1 ? 's' : ''} neste ritmo` : '');
  }

  // Atualiza o ritmo (km/h · km/dia) e o progresso em tempo real, sem
  // re-renderizar — usado pelo campo de deslocamento manual.
  function atualizarRitmo(el) {
    const card = el.closest('.vg-viagem');
    const v = pegarViagem(el);
    if (!card || !v) return;
    const r = ritmo(v);
    const out = card.querySelector('.vg-ritmo-out');
    if (out) out.innerHTML =
      `Ritmo efetivo: <strong>${fmt(r.kmH)} km/h</strong> · <strong>${fmt(r.kmDia)} km/dia</strong>`;
    atualizarProgresso(el);
  }

  // ═══════════════════════════════════════════════════════════════
  //  EVENTOS
  // ═══════════════════════════════════════════════════════════════
  function aoClicar(e) {
    const alvo = e.target.closest('[data-acao]');
    if (!alvo) return;
    const acao = alvo.dataset.acao;

    if (acao === 'add-viagem') {
      dados.viagens.push(novaViagem(dados.viagens.length + 1));
      salvar(); render(); return;
    }
    if (acao === 'del-viagem') {
      if (!confirm('Remover esta viagem e tudo dela?')) return;
      dados.viagens.splice(+alvo.dataset.v, 1);
      salvar(); render(); return;
    }
    if (acao === 'toggle-viagem') {
      const v = pegarViagem(alvo); v.aberta = !v.aberta;
      salvar(); render(); return;
    }
    if (acao === 'subir-viagem' || acao === 'descer-viagem') {
      const i = +alvo.dataset.v;
      const j = (acao === 'subir-viagem') ? i - 1 : i + 1;
      if (j < 0 || j >= dados.viagens.length) return;
      const tmp = dados.viagens[i]; dados.viagens[i] = dados.viagens[j]; dados.viagens[j] = tmp;
      salvar(); render(); return;
    }
    if (acao === 'dia-mais' || acao === 'dia-menos') {
      const v = pegarViagem(alvo);
      v.dias = Math.max(0, (parseInt(v.dias, 10) || 0) + (acao === 'dia-mais' ? 1 : -1));
      salvar(); render(); return;
    }
    if (acao === 'veic-pv-menos' || acao === 'veic-pv-mais') {
      const v = pegarViagem(alvo); const info = pvInfo(v);
      if (info) { _aplicarPV(v, info.pvAtual + (acao === 'veic-pv-mais' ? 1 : -1)); render(); }
      return;
    }
    if (acao === 'veic-pv-full') {
      const v = pegarViagem(alvo); const info = pvInfo(v);
      if (info) { _aplicarPV(v, info.pvMax); render(); }
      return;
    }
    if (acao === 'quick-diario') {
      const v = pegarViagem(alvo);
      const prefixo = alvo.dataset.prefixo || '';
      v.diario.push({ id: uid('d'), texto: prefixo, textoHtml: esc(prefixo) });
      salvar(); render(); return;
    }
    if (acao === 'criar-combate') {
      const v = pegarViagem(alvo);
      if (!window.GA_Monstros || typeof window.GA_Monstros.criarCombateViagem !== 'function') {
        alert('Não foi possível falar com a aba Monstros. Recarregue a página e tente de novo.');
        return;
      }
      const evento = prompt('Qual é o evento do combate? (ex.: Assalto na estrada, Emboscada de bandidos)', 'Assalto na estrada');
      if (evento === null) return;   // cancelou
      const desc = (evento || '').trim();
      window.GA_Monstros.criarCombateViagem(v.nome, desc, v.id);
      const linha = '⚔ Combate — ' + (desc || 'sem descrição') + ' (cena criada na aba Monstros)';
      v.diario.push({ id: uid('d'), texto: linha, textoHtml: esc(linha) });
      salvarAgora();
      const link = document.querySelector('.nav-link[data-section="monstros"]');
      if (link) link.click();        // leva o mestre para a cena recém-criada
      render(); return;
    }
    if (acao === 'del-diario') {
      pegarViagem(alvo).diario.splice(+alvo.dataset.d, 1);
      salvar(); render(); return;
    }
    if (acao === 'add-parada') {
      pegarViagem(alvo).paradas.push({ id: uid('p'), nome: '', texto: '', textoHtml: '' });
      salvar(); render(); return;
    }
    if (acao === 'del-parada') {
      pegarViagem(alvo).paradas.splice(+alvo.dataset.p, 1);
      salvar(); render(); return;
    }
    if (acao === 'exportar-json') { exportarJSON(); return; }
    if (acao === 'exportar-txt')  { exportarTXT();  return; }
    if (acao === 'importar-backup') {
      const inp = document.getElementById('vgImportFile');
      if (inp) inp.click();
      return;
    }
  }

  // input — campos de texto/número/textarea (não re-renderiza)
  function aoEntrada(e) {
    const el = e.target;
    const campo = el.dataset && el.dataset.campo;
    if (!campo || el.dataset.v == null) return;
    const v = pegarViagem(el);
    if (!v) return;

    if (campo === 'nome')        { v.nome = el.value; salvar(); return; }
    if (campo === 'veic-pv')     { _aplicarPV(v, el.value); return; }   // sem render — mantém o foco
    if (campo === 'suprimentos') { v.suprimentos = el.value; salvar(); return; }
    if (campo === 'deslocManual') { v.deslocManual = el.value; salvar(); atualizarRitmo(el); return; }
    if (campo === 'transpDeslocManual') { v.transporte.deslocManual = el.value; salvar(); atualizarRitmo(el); return; }
    if (campo === 'dias')        { v.dias = parseInt(el.value, 10) || 0; salvar(); return; }
    if (campo === 'distTotal' || campo === 'distFeita') {
      v[campo] = el.value; salvar(); atualizarProgresso(el); return;
    }
    if (campo === 'diario-texto') {
      const d = v.diario[+el.dataset.d];
      d.textoHtml = el.innerHTML;
      d.texto = window.htmlParaTexto(el.innerHTML);   // espelho puro (export .txt)
      salvar(); return;
    }
    if (campo === 'parada-nome')  { v.paradas[+el.dataset.p].nome = el.value; salvar(); return; }
    if (campo === 'parada-texto') {
      const pa = v.paradas[+el.dataset.p];
      pa.textoHtml = el.innerHTML;
      pa.texto = window.htmlParaTexto(el.innerHTML);
      salvar(); return;
    }
  }

  // change — select de deslocamento e checkboxes (re-renderiza p/ recalcular)
  function aoMudar(e) {
    const el = e.target;
    const campo = el.dataset && el.dataset.campo;
    if (campo === 'transporte') {
      const parts = String(el.value).split(':');
      const v = pegarViagem(el);
      const tipo = parts[0] || 'pe', chave = parts.slice(1).join(':');
      let pvAtual = null;
      if (tipo === 'veiculo') {
        const veic = (window.VEICULOS || []).find(x => x.chave === chave);
        pvAtual = veic ? veic.pv : null;     // veículo começa com PV cheio
      }
      v.transporte = { tipo: tipo, chave: chave, pvAtual: pvAtual, manual: false, deslocManual: '' };
      salvar(); render(); return;
    }
    if (campo === 'desloc') { pegarViagem(el).desloc = el.value; salvar(); render(); return; }
    if (campo === 'deslocModoTransp') {
      pegarViagem(el).transporte.manual = (el.value === 'manual'); salvar(); render(); return;
    }
    if (campo === 'terrenoDificil' || campo === 'climaRuim' || campo === 'marcha') {
      pegarViagem(el)[campo] = el.checked; salvar(); render(); return;
    }
    if (el.id === 'vgImportFile') { aoEscolherBackup(e); return; }
  }

  // ── BACKUP ───────────────────────────────────────────────────────
  function exportarJSON() {
    if (!dados.viagens.length) { alert('Não há viagens para exportar.'); return; }
    const pacote = { app: 'Grifos Alados', tipo: 'viagens', versao: 1, exportadoEm: new Date().toISOString(), viagens: dados.viagens };
    baixarTxt(`viagens_${carimboArquivo()}.json`, JSON.stringify(pacote, null, 2));
  }

  function exportarTXT() {
    if (!dados.viagens.length) { alert('Não há viagens para exportar.'); return; }
    let txt = ['══════════════════════════════════════════════',
               '   GRIFOS ALADOS · PAINEL DE VIAGEM',
               `   Exportado em ${new Date().toLocaleString('pt-BR')}`,
               '══════════════════════════════════════════════'].join('\n') + '\n';
    dados.viagens.forEach(v => {
      const r = ritmo(v), p = progresso(v);
      const mods = [v.terrenoDificil && 'terreno difícil', v.climaRuim && 'clima ruim', v.marcha && 'marcha forçada'].filter(Boolean).join(', ');
      const obj = transporteAtual(v);
      txt += `\n\n■ ${v.nome || '(viagem sem nome)'}\n${'═'.repeat(46)}`;
      txt += `\n  Transporte: ${obj ? obj.nome : 'A pé'}`;
      txt += `\n  Deslocamento: ${deslocEfetivo(v)} m${mods ? ' (' + mods + ')' : ''}`;
      txt += `\n  Ritmo: ${fmt(r.kmH)} km/h · ${fmt(r.kmDia)} km/dia`;
      txt += `\n  Progresso: ${fmt(p.feita)}/${fmt(p.total)} km (${fmt(p.pct)}%) · ${v.dias} dia(s)`;
      if ((v.suprimentos || '').trim()) txt += `\n  Suprimentos: ${v.suprimentos.trim()}`;
      if (v.diario.length) {
        txt += `\n\n  Diário:`;
        v.diario.forEach(d => { if ((d.texto || '').trim()) txt += `\n   • ${d.texto.trim().replace(/\n/g, ' ')}`; });
      }
      if (v.paradas.length) {
        txt += `\n\n  Paradas:`;
        v.paradas.forEach(pa => {
          txt += `\n   ⛩ ${pa.nome || '(sem nome)'}`;
          if ((pa.texto || '').trim()) pa.texto.trim().split('\n').forEach(l => txt += `\n      ${l}`);
        });
      }
    });
    baixarTxt(`viagens_${carimboArquivo()}.txt`, txt + '\n');
  }

  function aoEscolherBackup(e) {
    const input = e.target;
    if (!input.files || !input.files.length) return;
    const arq = input.files[0];
    input.value = '';
    const leitor = new FileReader();
    leitor.onload = () => {
      let parsed;
      try { parsed = JSON.parse(leitor.result); }
      catch (err) { alert('Arquivo inválido — não é um backup .json de viagens.'); return; }
      const bruto = Array.isArray(parsed) ? parsed : (parsed && Array.isArray(parsed.viagens)) ? parsed.viagens : null;
      if (!bruto) { alert('Backup sem viagens.'); return; }
      if (parsed && parsed.tipo && parsed.tipo !== 'viagens') { alert('Este arquivo é um backup de "' + parsed.tipo + '", não de viagens.'); return; }
      const viagens = bruto.filter(x => x && typeof x === 'object');
      viagens.forEach(x => { x.id = uid('vg'); normalizarViagem(x); });
      if (!viagens.length) { alert('Nenhuma viagem válida no arquivo.'); return; }
      const sub = dados.viagens.length && confirm('OK = SUBSTITUIR todas as viagens atuais.\nCancelar = ADICIONAR as do arquivo às atuais.');
      dados.viagens = sub ? viagens : dados.viagens.concat(viagens);
      salvarAgora(); render();
    };
    leitor.onerror = () => alert('Não foi possível ler o arquivo.');
    leitor.readAsText(arq);
  }

  // ── API pública (consumida pela aba Monstros — vida do veículo) ──
  window.GA_Viagem = {
    fichaTransporte: function (viagemId) {
      const v = dados.viagens.find(x => x.id === viagemId);
      if (!v) return null;
      const info = pvInfo(v);
      if (!info) return null;
      return { nome: info.veic.nome, tamanho: info.veic.tamanho, defesa: info.veic.defesa,
               desloc: info.veic.desloc, pvMax: info.pvMax, pvAtual: info.pvAtual };
    },
    setVeiculoPV: function (viagemId, pv) {
      const v = dados.viagens.find(x => x.id === viagemId);
      if (v) _aplicarPV(v, pv);
    },
    // edição dos jogadores: sync-jogador relê o localStorage e redesenha
    // as viagens transmitidas pelo mestre, sem recarregar a página.
    recarregar: function () { carregar(); render(); }
  };

  // ── INICIALIZAÇÃO ────────────────────────────────────────────────
  function init() {
    const secao = document.getElementById('viagem');
    if (!secao) return;
    carregar();
    try { render(); }
    catch (err) {
      console.error('[viagem] falha ao renderizar:', err);
      const cont = document.getElementById('viagem-content');
      if (cont) cont.innerHTML = `<div class="vg-erro"><strong>Erro ao montar a aba:</strong><br>${esc(err && err.message ? err.message : String(err))}</div>`;
    }
    secao.addEventListener('click', aoClicar);
    secao.addEventListener('input', aoEntrada);
    secao.addEventListener('change', aoMudar);
    // campos ricos: 📖 descrição pendurada + colar limpo (handlers globais)
    secao.addEventListener('mousedown', window.GA_richDescMousedown);
    secao.addEventListener('paste', window.GA_richPaste);
    window.addEventListener('beforeunload', salvarAgora);
    document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') salvarAgora(); });
    // sincroniza o PV do veículo quando a aba Monstros o altera (mesma vida)
    window.addEventListener('ga-veiculo-pv', function (e) {
      const d = e.detail || {};
      document.querySelectorAll('input[data-vpv="' + d.viagemId + '"]').forEach(function (inp) {
        if (document.activeElement !== inp) inp.value = d.pvAtual;
      });
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

})();
