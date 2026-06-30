// ═══════════════════════════════════════════════════════════════════
//  LOJA.JS — Renderiza as lojas geradas por js/loja_completa.js
//  Localização: /grifos-alados/js/loja.js
//  A loja é gerada inteiramente no navegador (sem servidor).
//  Requer que loja_completa.js seja carregado ANTES deste arquivo.
// ═══════════════════════════════════════════════════════════════════

(function () {
  'use strict';

  // ── CONFIGURAÇÃO ────────────────────────────────────────────────
  const TIPO_ICONES = {
    weapon:    '⚔',
    armor:     '🛡',
    misc:      '🎒',
    arma:      '⚔',
    armadura:  '🛡',
    esoterico: '🔮',
    acessorio: '💍',
  };

  const TIPO_LABELS = {
    weapon:    'Armas',
    armor:     'Armaduras & Escudos',
    misc:      'Equipamentos & Itens',
    arma:      'Armas',
    armadura:  'Armaduras & Escudos',
    esoterico: 'Esotéricos',
    acessorio: 'Acessórios',
  };

  const ORDEM_TIPOS_NORMAL   = ['weapon', 'armor', 'misc'];
  const ORDEM_TIPOS_ESPECIAL = ['arma', 'armadura', 'esoterico', 'acessorio'];

  // ── INICIALIZAÇÃO ────────────────────────────────────────────────
  // Carrega a loja quando a aba é clicada (lazy) ou se já estiver ativa.
  let _carregado = false;

  // Chave do localStorage onde os ajustes de geração ficam guardados.
  const CONFIG_STORAGE_KEY = 'grifosAlados.lojaConfig';
  // Chave separada para os ajustes da aba de Magias (pergaminhos).
  const MAGIAS_CONFIG_KEY  = 'grifosAlados.magiasConfig';

  // Histórico das últimas lojas geradas — os DADOS completos ficam
  // salvos no navegador, então a loja exibida sobrevive a F5 e a
  // fechar a página. Máximo de 5 lojas; clicar numa entrada reabre-a.
  const LOG_STORAGE_KEY = 'grifosAlados.lojaLog';
  const LOG_SEL_KEY     = 'grifosAlados.lojaLogSel';
  const LOG_MAX         = 5;
  let _log    = [];     // [{ id, quando, normal, especial }] — mais nova primeiro
  let _logSel = null;   // id da loja exibida no momento

  // Estado (aberto/fechado) dos painéis de ajuste — sobrevive às
  // re-renderizações da loja dentro da mesma sessão.
  const _ajustesAbertos = { normal: false, especial: false, magias: false };

  // ── HISTÓRICO (localStorage) ─────────────────────────────────────
  function carregarLog() {
    try {
      const txt = localStorage.getItem(LOG_STORAGE_KEY);
      if (txt) _log = JSON.parse(txt);
    } catch (e) {
      console.warn('[loja] Não foi possível carregar o histórico:', e.message);
    }
    if (!Array.isArray(_log)) _log = [];
    _log = _log.filter(en => en && en.id && en.normal && en.especial);
    try { _logSel = localStorage.getItem(LOG_SEL_KEY) || null; } catch (e) {}
  }

  function salvarLog() {
    try {
      localStorage.setItem(LOG_STORAGE_KEY, JSON.stringify(_log));
    } catch (e) {
      console.warn('[loja] Não foi possível salvar o histórico:', e.message);
    }
  }

  function salvarLogSel() {
    try { localStorage.setItem(LOG_SEL_KEY, _logSel || ''); } catch (e) {}
  }

  function entradaSelecionada() {
    for (let i = 0; i < _log.length; i++) if (_log[i].id === _logSel) return _log[i];
    return _log[0] || null;
  }

  // Gera uma loja nova e registra no histórico (vira a exibida).
  function novaEntradaLog() {
    const ent = {
      id: 'l_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
      quando: Date.now(),
      normal:   LojaCompleta.gerarLojaNormal(),
      especial: LojaCompleta.gerarLojaEspecial(),
      magias:   (typeof Magias !== 'undefined') ? Magias.gerar() : null,
    };
    _log.unshift(ent);
    while (_log.length > LOG_MAX) _log.pop();
    _logSel = ent.id;
    salvarLog(); salvarLogSel();
    return ent;
  }

  function formatarDataLog(ts) {
    const d = new Date(ts);
    const p = n => String(n).padStart(2, '0');
    return `${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()} ${p(d.getHours())}:${p(d.getMinutes())}`;
  }

  document.addEventListener('DOMContentLoaded', () => {
    const secaoLoja = document.getElementById('loja');
    if (!secaoLoja) return;

    // Aplica os ajustes salvos ANTES da primeira geração.
    carregarConfigSalva();
    carregarConfigMagias();
    carregarLog();

    // Ouvintes delegados — ficam no #loja-content (que nunca é recriado),
    // então não se acumulam a cada re-renderização.
    const lojaContent = document.getElementById('loja-content');
    if (lojaContent) {
      lojaContent.addEventListener('input', aoMudarAjuste);
      lojaContent.addEventListener('input', aoBuscar);
      lojaContent.addEventListener('click', aoClicarAjuste);
      lojaContent.addEventListener('click', aoClicarLog);
    }

    if (secaoLoja.classList.contains('active')) {
      carregarLoja();
    }

    document.querySelectorAll('.nav-link').forEach(link => {
      if (link.dataset.section === 'loja') {
        link.addEventListener('click', () => carregarLoja());
      }
    });
  });

  function carregarLoja() {
    if (_carregado) return;
    _carregado = true;

    const container = document.getElementById('loja-content');
    if (!container) return;

    // Restaura a última loja salva; só gera uma nova se não houver nenhuma.
    try {
      let ent = entradaSelecionada();
      if (!ent) ent = novaEntradaLog();
      _logSel = ent.id;
      salvarLogSel();
      renderizarLoja(container, ent.normal, ent.especial, ent.magias);
    } catch (err) {
      renderizarErro(container, err);
    }
  }

  // ── TELA DE ERRO ─────────────────────────────────────────────────
  function renderizarErro(container, err) {
    container.innerHTML = `
      <div class="loja-error">
        <div class="loja-error-titulo">⚠ Não foi possível montar o mercado</div>
        <p class="loja-error-msg">
          A loja é gerada por <code>js/loja_completa.js</code>. Verifique se esse
          arquivo está na pasta <code>js/</code> e se ele é carregado <strong>antes</strong>
          de <code>loja.js</code> no <code>index.html</code>.
        </p>
        <p class="loja-error-detalhe">Detalhe técnico: ${err.message}</p>
      </div>`;
  }

  // ══════════════════════════════════════════════════════════════════
  //  AJUSTES DE GERAÇÃO (por tipo)
  // ══════════════════════════════════════════════════════════════════
  const AJUSTE_ITENS_LABELS = {
    weapon: { icone: '⚔', nome: 'Armas' },
    armor:  { icone: '🛡', nome: 'Armaduras & Escudos' },
    misc:   { icone: '🎒', nome: 'Equipamentos & Itens' },
  };

  const AJUSTE_ENC_LABELS = {
    arma:      { icone: '⚔', nome: 'Armas' },
    armadura:  { icone: '🛡', nome: 'Armaduras' },
    escudo:    { icone: '🔰', nome: 'Escudos' },
    esoterico: { icone: '🔮', nome: 'Esotéricos' },
    acessorio: { icone: '💍', nome: 'Acessórios' },
  };

  // ── PERSISTÊNCIA (localStorage) ──────────────────────────────────
  function carregarConfigSalva() {
    try {
      const txt = localStorage.getItem(CONFIG_STORAGE_KEY);
      if (txt) LojaCompleta.definirConfig(JSON.parse(txt));
    } catch (e) {
      console.warn('[loja] Não foi possível ler os ajustes salvos:', e.message);
    }
  }

  function salvarConfig() {
    try {
      localStorage.setItem(
        CONFIG_STORAGE_KEY,
        JSON.stringify(LojaCompleta.obterConfig())
      );
    } catch (e) {
      console.warn('[loja] Não foi possível salvar os ajustes:', e.message);
    }
  }

  // ── PERSISTÊNCIA DOS AJUSTES DE MAGIAS ───────────────────────────
  function carregarConfigMagias() {
    if (typeof Magias === 'undefined') return;
    try {
      const txt = localStorage.getItem(MAGIAS_CONFIG_KEY);
      if (txt) Magias.definirConfig(JSON.parse(txt));
    } catch (e) {
      console.warn('[loja] Não foi possível ler os ajustes de magias:', e.message);
    }
  }

  function salvarConfigMagias() {
    if (typeof Magias === 'undefined') return;
    try {
      localStorage.setItem(MAGIAS_CONFIG_KEY, JSON.stringify(Magias.obterConfig()));
    } catch (e) {
      console.warn('[loja] Não foi possível salvar os ajustes de magias:', e.message);
    }
  }

  // ── CONTROLADOR GENÉRICO (modo / quantidade / chance / repetir) ──
  //  Monta uma linha de ajuste com seletor de MODO e os controles que
  //  cada modo usa. O CSS escurece os controles fora do modo atual.
  //    grupo: 'itens' | 'encantos'  ·  tipo: chave do tipo/categoria
  //    total: quantos itens daquele tipo existem no catálogo
  //    cfg:   { modo, qtd, prob, repetir, [descMin, descMax] }
  function construirControladorLinha(grupo, tipo, lb, total, cfg, comDesconto) {
    const modo = cfg.modo || 'quantidade';
    const opt  = (v, txt) => `<option value="${v}" ${modo === v ? 'selected' : ''}>${txt}</option>`;

    const desconto = comDesconto ? `
          <div class="aj-controle aj-c-desc">
            <label class="aj-label">Desconto aplicável</label>
            <div class="aj-desconto">
              <span>de</span>
              <input type="number" class="aj-num" min="0" max="99" value="${cfg.descMin}"
                     data-grupo="${grupo}" data-tipo="${tipo}" data-campo="descMin">
              <span>% até</span>
              <input type="number" class="aj-num" min="0" max="99" value="${cfg.descMax}"
                     data-grupo="${grupo}" data-tipo="${tipo}" data-campo="descMax">
              <span>%</span>
            </div>
          </div>` : '';

    return `
        <div class="aj-linha" data-modo="${modo}">
          <div class="aj-tipo">${lb.icone} ${lb.nome}
            <span class="aj-total">${total} no catálogo</span>
          </div>
          <div class="aj-controle aj-c-modo">
            <label class="aj-label">Modo</label>
            <select class="aj-sel" data-grupo="${grupo}" data-tipo="${tipo}" data-campo="modo">
              ${opt('quantidade', 'Quantidade')}
              ${opt('porcentagem', 'Porcentagem')}
              ${opt('ambos', 'Ambos')}
            </select>
          </div>
          <div class="aj-controle aj-c-qtd">
            <label class="aj-label">Quantidade (0–${total})</label>
            <input type="number" class="aj-num aj-num--qtd" min="0" max="999" value="${cfg.qtd}"
                   data-grupo="${grupo}" data-tipo="${tipo}" data-campo="qtd">
          </div>
          <div class="aj-controle aj-c-prob">
            <label class="aj-label">Chance de cada item</label>
            <div class="aj-slider-wrap">
              <input type="range" class="aj-slider" min="0" max="100" value="${cfg.prob}"
                     data-grupo="${grupo}" data-tipo="${tipo}" data-campo="prob">
              <span class="aj-valor">${cfg.prob}%</span>
            </div>
          </div>
          <div class="aj-controle aj-c-repetir">
            <label class="aj-label">Permitir repetidos</label>
            <label class="mag-switch">
              <input type="checkbox" data-grupo="${grupo}" data-tipo="${tipo}" data-campo="repetir"
                     ${cfg.repetir ? 'checked' : ''}>
              <span>Sim, pode repetir</span>
            </label>
          </div>
          ${desconto}
        </div>`;
  }

  // ── PAINEL: ITENS MUNDANOS ───────────────────────────────────────
  function construirAjustesItens() {
    const cfg    = LojaCompleta.obterConfig();
    const totais = LojaCompleta.totaisItens();
    const aberto = _ajustesAbertos.normal;
    let linhas = '';

    ['weapon', 'armor', 'misc'].forEach(tipo => {
      linhas += construirControladorLinha(
        'itens', tipo, AJUSTE_ITENS_LABELS[tipo], totais[tipo] || 0, cfg.itens[tipo], true);
    });

    return `
      <div class="aj-painel ${aberto ? 'aj-painel--aberto' : ''}">
        <button type="button" class="aj-cabecalho" data-aj-toggle="normal">
          <span>⚙ Ajustar geração dos itens</span>
          <span class="aj-seta">${aberto ? '▲' : '▼'}</span>
        </button>
        <div class="aj-corpo">
          ${linhas}
          <p class="aj-dica">
            <strong>Quantidade</strong>: vêm exatamente N itens sorteados. ·
            <strong>Porcentagem</strong>: cada item do catálogo tem a chance de aparecer. ·
            <strong>Ambos</strong>: sorteia N candidatos e cada um ainda passa pela chance (ex.: 100 a 60%).
            Os ajustes são salvos automaticamente. Clique em
            <strong>🎲 Gerar Nova Loja</strong> para ver o resultado.
          </p>
        </div>
      </div>`;
  }

  // ── PAINEL: ENCANTAMENTOS ────────────────────────────────────────
  function construirAjustesEncantos() {
    const cfg    = LojaCompleta.obterConfig();
    const totais = LojaCompleta.totaisEncantos();
    const aberto = _ajustesAbertos.especial;
    let linhas = '';

    ['arma', 'armadura', 'escudo', 'esoterico', 'acessorio'].forEach(tipo => {
      linhas += construirControladorLinha(
        'encantos', tipo, AJUSTE_ENC_LABELS[tipo], totais[tipo] || 0, cfg.encantos[tipo], false);
    });

    return `
      <div class="aj-painel ${aberto ? 'aj-painel--aberto' : ''}">
        <button type="button" class="aj-cabecalho" data-aj-toggle="especial">
          <span>⚙ Ajustar geração dos encantamentos</span>
          <span class="aj-seta">${aberto ? '▲' : '▼'}</span>
        </button>
        <div class="aj-corpo">
          ${linhas}
          <p class="aj-dica">
            <strong>Quantidade</strong>: N encantamentos sorteados. ·
            <strong>Porcentagem</strong>: cada encantamento tem a chance de aparecer. ·
            <strong>Ambos</strong>: N candidatos, cada um passando pela chance.
            Os ajustes são salvos automaticamente. Clique em
            <strong>🎲 Gerar Nova Loja</strong> para ver o resultado.
          </p>
        </div>
      </div>`;
  }

  // ── LÊ TODOS OS CONTROLES DO DOM E MONTA UM OBJETO DE CONFIG ──────
  function lerAjustesDoDOM() {
    const cfg = LojaCompleta.obterConfig();
    document
      .querySelectorAll('#loja-content [data-grupo][data-campo]')
      .forEach(el => {
        const { grupo, tipo, campo } = el.dataset;
        const dest = grupo === 'itens' ? cfg.itens : grupo === 'encantos' ? cfg.encantos : null;
        if (!dest) return;
        const alvo = dest[tipo] || (dest[tipo] = {});
        if (campo === 'repetir')      alvo.repetir = el.checked;
        else if (campo === 'modo')    alvo.modo = el.value;
        else                          alvo[campo] = Number(el.value);
      });
    return cfg;
  }

  // ── EVENTO: mudança em qualquer controle de ajuste ───────────────
  function aoMudarAjuste(e) {
    const el = e.target;
    if (!el.matches) return;

    // ── Controles da aba Magias ──────────────────────────────────
    if (el.matches('.mag-ctrl')) {
      // troca de modo → atualiza o dim dos controles da linha
      if (el.dataset.campo === 'modo') {
        const linha = el.closest('.aj-linha');
        if (linha) linha.dataset.modo = el.value;
      }
      LojaCompleta_aplicarMagias();
      return;
    }

    if (!el.matches('[data-grupo][data-campo]')) return;

    // troca de modo → atualiza o atributo que controla o dim via CSS
    if (el.dataset.campo === 'modo') {
      const linha = el.closest('.aj-linha');
      if (linha) linha.dataset.modo = el.value;
    }

    // atualiza o número exibido ao lado do slider
    if (el.classList.contains('aj-slider')) {
      const valor = el.parentElement.querySelector('.aj-valor');
      if (valor) valor.textContent = el.value + '%';
    }

    LojaCompleta.definirConfig(lerAjustesDoDOM());
    salvarConfig();
  }

  // Lê os controles da aba Magias do DOM e grava na config de Magias.
  function LojaCompleta_aplicarMagias() {
    if (typeof Magias === 'undefined') return;
    const modoEl = document.getElementById('mag-modo');
    const qtdEl  = document.getElementById('mag-qtd');
    const probEl = document.getElementById('mag-prob');
    const repEl  = document.getElementById('mag-repeticao');
    const probVal = document.getElementById('mag-prob-val');
    if (probEl && probVal) probVal.textContent = probEl.value + '%';
    const circs  = [];
    document.querySelectorAll('#loja-content .mag-circulo').forEach(cb => {
      // cada checkbox marca um círculo INCLUÍDO; os desmarcados são excluídos
      if (!cb.checked) circs.push(Number(cb.dataset.circulo));
    });
    Magias.definirConfig({
      modo:              modoEl ? modoEl.value : undefined,
      quantidade:        qtdEl ? Number(qtdEl.value) : undefined,
      prob:              probEl ? Number(probEl.value) : undefined,
      permitirRepeticao: repEl ? repEl.checked : undefined,
      circulosExcluidos: circs,
    });
    salvarConfigMagias();
  }

  // ── EVENTO: clique no cabeçalho de um painel (abrir/fechar) ───────
  function aoClicarAjuste(e) {
    const toggle = e.target.closest('[data-aj-toggle]');
    if (!toggle) return;

    const qual = toggle.dataset.ajToggle;          // 'normal' | 'especial'
    _ajustesAbertos[qual] = !_ajustesAbertos[qual];

    const painel = toggle.closest('.aj-painel');
    painel.classList.toggle('aj-painel--aberto', _ajustesAbertos[qual]);
    const seta = painel.querySelector('.aj-seta');
    if (seta) seta.textContent = _ajustesAbertos[qual] ? '▲' : '▼';
  }

  // ══════════════════════════════════════════════════════════════════
  //  BUSCA NAS LOJAS (Normal / Especial / Magias)
  //  Filtra os cards já renderizados (esconde os que não batem) e recolhe
  //  as seções que ficarem vazias. Some/reaparece conforme se digita.
  // ══════════════════════════════════════════════════════════════════
  function _normBusca(s) {
    return String(s == null ? '' : s).normalize('NFD').replace(/\p{M}/gu, '').toLowerCase();
  }
  function buscaHTML(alvo, ph) {
    return `<input type="text" class="loja-busca" data-busca-alvo="${alvo}" placeholder="${ph}" autocomplete="off">`;
  }
  function aoBuscar(e) {
    const inp = e.target;
    if (!inp.matches || !inp.matches('.loja-busca')) return;
    const painel = inp.closest('.loja-painel');
    if (!painel) return;
    const termo = _normBusca(inp.value.trim());

    if (inp.dataset.buscaAlvo === 'especial') {
      painel.querySelectorAll('.especial-encantamento').forEach(el => {
        el.style.display = (!termo || _normBusca(el.textContent).indexOf(termo) >= 0) ? '' : 'none';
      });
      painel.querySelectorAll('.especial-card').forEach(card => {
        const algum = Array.from(card.querySelectorAll('.especial-encantamento')).some(el => el.style.display !== 'none');
        card.style.display = algum ? '' : 'none';
      });
      return;
    }

    // Normal e Magias: cada item é um .item-card dentro de .loja-grid-itens / .loja-bloco-tipo
    painel.querySelectorAll('.item-card').forEach(el => {
      el.style.display = (!termo || _normBusca(el.textContent).indexOf(termo) >= 0) ? '' : 'none';
    });
    painel.querySelectorAll('.loja-grid-itens').forEach(grid => {
      const algum = Array.from(grid.querySelectorAll('.item-card')).some(el => el.style.display !== 'none');
      grid.style.display = algum ? '' : 'none';
      const cab = grid.previousElementSibling;            // .loja-divisor-cat
      if (cab && cab.classList.contains('loja-divisor-cat')) cab.style.display = algum ? '' : 'none';
    });
    painel.querySelectorAll('.loja-bloco-tipo').forEach(bloco => {
      const algum = Array.from(bloco.querySelectorAll('.item-card')).some(el => el.style.display !== 'none');
      bloco.style.display = algum ? '' : 'none';
    });
  }

  // ── RENDERIZAÇÃO PRINCIPAL ───────────────────────────────────────
  function renderizarLoja(container, dadosNormal, dadosEspecial, dadosMagias) {
    const totalItens  = dadosNormal.total_itens || 0;
    const totalEncs   = contarEncantamentos(dadosEspecial);
    // Magias podem faltar em lojas antigas do histórico → gera na hora.
    if (!dadosMagias && typeof Magias !== 'undefined') dadosMagias = Magias.gerar();
    const totalMagias = (dadosMagias && dadosMagias.total) || 0;

    container.innerHTML = `
      <div class="loja-cabecalho">
        <div class="loja-titulo-principal">Mercado & Encantamentos</div>
        <p class="loja-subtitulo">Inventário gerado para as Cidades do Reinado de Arton</p>
      </div>

      <div class="loja-abas">
        <button class="loja-aba ativa" data-painel="painel-normal">
          ⚔ Loja Normal
          <span class="loja-aba-count">${totalItens} iten${totalItens !== 1 ? 's' : ''}</span>
        </button>
        <button class="loja-aba" data-painel="painel-especial">
          ✨ Loja Especial
          <span class="loja-aba-count">${totalEncs} encantamento${totalEncs !== 1 ? 's' : ''}</span>
        </button>
        <button class="loja-aba" data-painel="painel-magias">
          📜 Magias
          <span class="loja-aba-count">${totalMagias} pergaminho${totalMagias !== 1 ? 's' : ''}</span>
        </button>
      </div>

      <div class="loja-gerar-wrapper">
        <button class="loja-btn-gerar" id="btnGerarLoja" onclick="gerarNovaLoja()">
          🎲 Gerar Nova Loja
        </button>
        <button class="loja-btn-exportar" id="btnExportarLoja" title="Exportar a loja em .txt para enviar aos jogadores">
          ⬇ Exportar loja
        </button>
        <span class="loja-btn-status" id="lojaStatus"></span>
      </div>

      ${construirLogLojas()}

      <div id="painel-normal" class="loja-painel ativo">
        ${construirAjustesItens()}
        ${construirLojaNormal(dadosNormal)}
      </div>
      <div id="painel-especial" class="loja-painel">
        ${construirAjustesEncantos()}
        ${construirLojaEspecial(dadosEspecial)}
      </div>
      <div id="painel-magias" class="loja-painel">
        ${construirAjustesMagias()}
        ${construirLojaMagias(dadosMagias)}
      </div>
    `;

    // Troca de abas
    container.querySelectorAll('.loja-aba').forEach(aba => {
      aba.addEventListener('click', () => {
        container.querySelectorAll('.loja-aba').forEach(a => a.classList.remove('ativa'));
        container.querySelectorAll('.loja-painel').forEach(p => p.classList.remove('ativo'));
        aba.classList.add('ativa');
        document.getElementById(aba.dataset.painel).classList.add('ativo');
      });
    });

    // Exportar a loja exibida em .txt (Discord)
    const btnExp = document.getElementById('btnExportarLoja');
    if (btnExp) btnExp.onclick = abrirModalExportarLoja;
  }

  // ── PAINEL DO HISTÓRICO (últimas 5 lojas) ────────────────────────
  function construirLogLojas() {
    if (!_log.length) return '';

    let linhas = '';
    _log.forEach(ent => {
      const ativa  = ent.id === _logSel;
      const tItens = ent.normal.total_itens || 0;
      const tEncs  = contarEncantamentos(ent.especial);
      linhas += `
        <button type="button" class="log-loja-item ${ativa ? 'log-loja-item--ativa' : ''}"
                data-log-ver="${ent.id}" title="${ativa ? 'Loja exibida no momento' : 'Reabrir esta loja'}">
          <span class="log-loja-quando">${formatarDataLog(ent.quando)}</span>
          <span class="log-loja-resumo">${tItens} iten${tItens !== 1 ? 's' : ''} · ${tEncs} encantamento${tEncs !== 1 ? 's' : ''}</span>
          ${ativa ? '<span class="log-loja-atual">exibida</span>' : ''}
        </button>`;
    });

    return `
      <div class="log-loja">
        <div class="log-loja-cab">
          <span>📜 Últimas lojas (${_log.length}/${LOG_MAX}) — clique para reabrir</span>
          <button type="button" class="log-loja-limpar" data-log-limpar
                  title="Apagar o histórico (mantém a loja exibida)">✕ Limpar</button>
        </div>
        <div class="log-loja-lista">${linhas}</div>
      </div>`;
  }

  // Re-renderiza a loja selecionada preservando a aba (normal/especial) aberta.
  function rerenderAtual() {
    const container = document.getElementById('loja-content');
    const ent = entradaSelecionada();
    if (!container || !ent) return;
    const painelAtivo =
      (container.querySelector('.loja-painel.ativo') || {}).id || 'painel-normal';
    renderizarLoja(container, ent.normal, ent.especial, ent.magias);
    restaurarPainel(container, painelAtivo);
  }

  function restaurarPainel(container, painelAtivo) {
    const alvo = document.getElementById(painelAtivo);
    if (!alvo) return;
    container.querySelectorAll('.loja-aba').forEach(a => a.classList.remove('ativa'));
    container.querySelectorAll('.loja-painel').forEach(p => p.classList.remove('ativo'));
    alvo.classList.add('ativo');
    const abaAlvo = container.querySelector(`.loja-aba[data-painel="${painelAtivo}"]`);
    if (abaAlvo) abaAlvo.classList.add('ativa');
  }

  // ── EVENTO: cliques no histórico (reabrir / limpar) ──────────────
  function aoClicarLog(e) {
    const ver = e.target.closest('[data-log-ver]');
    if (ver) {
      if (ver.dataset.logVer === _logSel) return;   // já é a exibida
      _logSel = ver.dataset.logVer;
      salvarLogSel();
      rerenderAtual();
      return;
    }
    if (e.target.closest('[data-log-limpar]')) {
      if (!confirm('Apagar o histórico de lojas anteriores? A loja exibida no momento é mantida.')) return;
      const atual = entradaSelecionada();
      _log = atual ? [atual] : [];
      _logSel = atual ? atual.id : null;
      salvarLog(); salvarLogSel();
      rerenderAtual();
    }
  }

  // ══════════════════════════════════════════════════════════════════
  //  LOJA NORMAL
  // ══════════════════════════════════════════════════════════════════
  function construirLojaNormal(dados) {
    const itens = dados.itens || [];
    if (!itens.length) {
      return '<p class="loja-vazia">Nenhum item disponível nesta geração. Execute novamente o script Python.</p>';
    }

    // Agrupa por tipo_item → categoria
    const porTipo = {};
    itens.forEach(item => {
      const tipo = item.tipo_item || 'misc';
      const cat  = item.categoria || 'Outros';
      if (!porTipo[tipo]) porTipo[tipo] = {};
      if (!porTipo[tipo][cat]) porTipo[tipo][cat] = [];
      porTipo[tipo][cat].push(item);
    });

    // Busca + resumo
    let html = buscaHTML('normal', '🔍 Buscar item — nome, dano, tipo…');
    html += `<div class="loja-resumo">`;
    html += `<span class="loja-resumo-item">Total: <strong>${itens.length} itens</strong></span>`;
    ORDEM_TIPOS_NORMAL.forEach(tipo => {
      if (!porTipo[tipo]) return;
      const qtd = Object.values(porTipo[tipo]).flat().length;
      html += `<span class="loja-resumo-item">${TIPO_LABELS[tipo]}: <strong>${qtd}</strong></span>`;
    });
    html += `</div>`;

    // Itens por tipo e categoria
    ORDEM_TIPOS_NORMAL.forEach(tipo => {
      if (!porTipo[tipo]) return;

      html += `
        <div class="loja-bloco-tipo">
          <div class="loja-divisor-tipo">
            <hr/>
            <h3>${TIPO_ICONES[tipo] || '•'} ${TIPO_LABELS[tipo] || tipo}</h3>
            <hr/>
          </div>`;

      Object.entries(porTipo[tipo]).forEach(([cat, catItens]) => {
        html += `
          <div class="loja-divisor-cat">
            <hr/>
            <h4>${cat}</h4>
            <hr/>
          </div>
          <div class="loja-grid-itens">
            ${catItens.map(item => construirCardItem(item)).join('')}
          </div>`;
      });

      html += `</div>`;
    });

    return html;
  }

  function construirCardItem(item) {
    const precoOrig  = formatarPreco(item.preco_original);
    const precoFinal = formatarPreco(item.preco_final);
    const desconto   = item.desconto_pct;

    // Stats relevantes por tipo
    let statsHtml = '';
    if (item.tipo_item === 'weapon') {
      if (item.dano)      statsHtml += statSpan('Dano', item.dano);
      if (item.critico)   statsHtml += statSpan('Crítico', item.critico);
      if (item.alcance)   statsHtml += statSpan('Alcance', item.alcance);
      if (item.tipo_arma) statsHtml += statSpan('Tipo', item.tipo_arma);
      if (item.peso != null) statsHtml += statSpan('Peso', item.peso);
    } else if (item.tipo_item === 'armor') {
      if (item.bonus_armadura != null)   statsHtml += statSpan('Bônus', `+${item.bonus_armadura}`);
      if (item.penalidade_armadura)      statsHtml += statSpan('Penalidade', item.penalidade_armadura);
      if (item.peso_armadura != null)    statsHtml += statSpan('Peso', item.peso_armadura);
    } else {
      if (item.peso != null) statsHtml += statSpan('Peso', item.peso);
    }

    // Descrição do item em aba recolhível (+ tooltips de regra), se houver.
    const descHtml = window.ItensDescricoes ? ItensDescricoes.bloco(item.nome) : '';

    // Sem desconto real (0% ou preço inalterado): mostra um único valor,
    // evitando o redundante "T$ 5 → T$ 5".
    const semDesconto = desconto === 0 || precoOrig === precoFinal;
    const badge = desconto != null
      ? `<span class="item-badge-desconto">${desconto > 0 ? '-' : ''}${desconto}%</span>`
      : '';
    const precosHtml = semDesconto
      ? `<span class="item-preco-final">T$ ${precoFinal}</span>`
      : `<span class="item-preco-orig">T$ ${precoOrig}</span>
         <span class="item-seta">→</span>
         <span class="item-preco-final">T$ ${precoFinal}</span>`;

    return `
      <div class="item-card">
        <div class="item-topo">
          <span class="item-nome">${item.nome || '—'}</span>
          ${badge}
        </div>
        <div class="item-precos">
          ${precosHtml}
        </div>
        ${statsHtml ? `<hr class="item-linha"/><div class="item-stats">${statsHtml}</div>` : ''}
        ${descHtml}
      </div>`;
  }

  function statSpan(label, valor) {
    return `<span class="item-stat"><strong>${label}:</strong> ${valor}</span>`;
  }

  // ══════════════════════════════════════════════════════════════════
  //  LOJA ESPECIAL
  // ══════════════════════════════════════════════════════════════════
  function construirLojaEspecial(dados) {
    const cats = dados.categorias || {};
    let html = buscaHTML('especial', '🔍 Buscar encantamento — nome ou efeito…');
    html += `<div class="especial-grid">`;

    ORDEM_TIPOS_ESPECIAL.forEach(cat => {
      let info = cats[cat] || { total: 0, encantamentos: [] };

      // Armadura e escudo compartilham o mesmo pool — une os dois sem duplicatas
      if (cat === 'armadura') {
        const infoEscudo  = cats['escudo'] || { total: 0, encantamentos: [] };
        const vistos      = new Set((info.encantamentos || []).map(e => e.name));
        const exclusivos  = (infoEscudo.encantamentos || []).filter(e => !vistos.has(e.name));
        info = {
          total:         (info.total || 0) + exclusivos.length,
          encantamentos: [...(info.encantamentos || []), ...exclusivos],
        };
      }

      const encants    = info.encantamentos || [];
      const icone      = TIPO_ICONES[cat] || '✦';
      const label      = TIPO_LABELS[cat] || cat;
      const totalLabel = `${info.total} encantamento${info.total !== 1 ? 's' : ''}`;

      html += `
        <div class="especial-card">
          <div class="especial-card-cabecalho">
            <span class="especial-icone">${icone}</span>
            <span class="especial-label">${label}</span>
            <span class="especial-contagem">${totalLabel}</span>
          </div>
          <div class="especial-lista">`;

      if (!encants.length) {
        html += `<div class="especial-vazio">Nenhum encantamento sorteado nesta geração.</div>`;
      } else {
        encants.forEach(e => {
          const encDesc = window.ItensDescricoes ? ItensDescricoes.bloco(e.name) : '';
          html += `
            <div class="especial-encantamento">
              <span class="enc-nome">${e.name}</span>
              <span class="enc-sep">·</span>
              <span class="enc-efeito">${e.effect}</span>
            </div>
            ${encDesc}`;
        });
      }

      html += `</div></div>`;
    });

    html += `</div>`;
    return html;
  }

  // ══════════════════════════════════════════════════════════════════
  //  LOJA — MAGIAS (pergaminhos)
  // ══════════════════════════════════════════════════════════════════
  const CIRCULO_ROMANO = { 1: 'I', 2: 'II', 3: 'III', 4: 'IV', 5: 'V' };

  // ── PAINEL DE AJUSTES DA ABA MAGIAS ──────────────────────────────
  function construirAjustesMagias() {
    if (typeof Magias === 'undefined') return '';
    const cfg    = Magias.obterConfig();
    const aberto = _ajustesAbertos.magias;
    const excl   = new Set(cfg.circulosExcluidos || []);

    let circulos = '';
    [1, 2, 3, 4, 5].forEach(c => {
      const pm = Magias.PM_POR_CIRCULO[c];
      circulos += `
        <label class="mag-circulo-item">
          <input type="checkbox" class="mag-ctrl mag-circulo" data-circulo="${c}"
                 ${excl.has(c) ? '' : 'checked'}>
          <span>${c}º círculo <em>(${pm} PM · T$ ${Magias.precoPergaminho(c).toLocaleString('pt-BR')})</em></span>
        </label>`;
    });

    const modo = cfg.modo || 'quantidade';
    const total = (Magias.TODAS || []).length;
    const optModo = (v, txt) => `<option value="${v}" ${modo === v ? 'selected' : ''}>${txt}</option>`;

    return `
      <div class="aj-painel ${aberto ? 'aj-painel--aberto' : ''}">
        <button type="button" class="aj-cabecalho" data-aj-toggle="magias">
          <span>⚙ Ajustar geração dos pergaminhos</span>
          <span class="aj-seta">${aberto ? '▲' : '▼'}</span>
        </button>
        <div class="aj-corpo">
          <div class="aj-linha" data-modo="${modo}">
            <div class="aj-tipo">📜 Pergaminhos
              <span class="aj-total">${total} no catálogo</span>
            </div>
            <div class="aj-controle aj-c-modo">
              <label class="aj-label" for="mag-modo">Modo</label>
              <select id="mag-modo" class="aj-sel mag-ctrl">
                ${optModo('quantidade', 'Quantidade')}
                ${optModo('porcentagem', 'Porcentagem')}
                ${optModo('ambos', 'Ambos')}
              </select>
            </div>
            <div class="aj-controle aj-c-qtd">
              <label class="aj-label" for="mag-qtd">Quantos devem aparecer</label>
              <input type="number" id="mag-qtd" class="aj-num aj-num--qtd mag-ctrl" min="0" max="999"
                     value="${cfg.quantidade}">
            </div>
            <div class="aj-controle aj-c-prob">
              <label class="aj-label">Chance de cada magia</label>
              <div class="aj-slider-wrap">
                <input type="range" id="mag-prob" class="aj-slider mag-ctrl" min="0" max="100"
                       value="${cfg.prob}">
                <span class="aj-valor" id="mag-prob-val">${cfg.prob}%</span>
              </div>
            </div>
            <div class="aj-controle aj-c-repetir">
              <label class="aj-label">Permitir magias repetidas</label>
              <label class="mag-switch">
                <input type="checkbox" id="mag-repeticao" class="mag-ctrl"
                       ${cfg.permitirRepeticao ? 'checked' : ''}>
                <span>Sim, pode repetir</span>
              </label>
            </div>
          </div>
          <div class="aj-linha aj-linha--enc">
            <div class="aj-tipo">✶ Círculos disponíveis</div>
            <div class="mag-circulos">${circulos}</div>
          </div>
          <p class="aj-dica">
            <strong>Quantidade</strong>: N pergaminhos sorteados. ·
            <strong>Porcentagem</strong>: cada magia tem a chance de aparecer. ·
            <strong>Ambos</strong>: N candidatas, cada uma passando pela chance (ex.: 100 a 60%).
            Os ajustes são salvos automaticamente. Clique em
            <strong>🎲 Gerar Nova Loja</strong> para ver o resultado.
            Desmarque um círculo para que ele <strong>não</strong> apareça na loja.
          </p>
        </div>
      </div>`;
  }

  // ── LISTA DE PERGAMINHOS ─────────────────────────────────────────
  function construirLojaMagias(dados) {
    if (typeof Magias === 'undefined') {
      return '<p class="loja-vazia">Módulo de magias não carregado (js/magias.js).</p>';
    }
    const pergaminhos = (dados && dados.pergaminhos) || [];

    if (!pergaminhos.length) {
      return `<p class="loja-vazia">Nenhum pergaminho nesta geração. Ajuste a
        quantidade ou os círculos disponíveis e gere a loja novamente.</p>`;
    }

    // agrupa por círculo
    const porCirculo = {};
    pergaminhos.forEach(p => {
      (porCirculo[p.circulo] = porCirculo[p.circulo] || []).push(p);
    });

    // busca + resumo
    let html = buscaHTML('magias', '🔍 Buscar pergaminho — magia, escola, tipo…');
    html += `<div class="loja-resumo">`;
    html += `<span class="loja-resumo-item">Total: <strong>${pergaminhos.length} pergaminhos</strong></span>`;
    [1, 2, 3, 4, 5].forEach(c => {
      if (!porCirculo[c]) return;
      html += `<span class="loja-resumo-item">${c}º círculo: <strong>${porCirculo[c].length}</strong></span>`;
    });
    html += `</div>`;

    // explicação da regra
    html += `
      <div class="mag-nota">
        <strong>📖 Pergaminhos.</strong> O preço em destaque é o custo para
        <em>comprar</em> o pergaminho: <strong>T$ 30 × (PM da magia)²</strong>. Um
        arcanista com o poder <em>Escriba Arcano</em> pode <em>aprender</em> a magia
        pagando à parte T$ 250 por PM e gastando 1 dia de trabalho por PM.
        Cada pergaminho ocupa ½ espaço de inventário.
      </div>`;

    // cards por círculo
    [1, 2, 3, 4, 5].forEach(c => {
      if (!porCirculo[c]) return;
      const pm = Magias.PM_POR_CIRCULO[c];
      html += `
        <div class="loja-bloco-tipo">
          <div class="loja-divisor-tipo">
            <hr/>
            <h3>📜 ${c}º Círculo — ${pm} PM</h3>
            <hr/>
          </div>
          <div class="loja-grid-itens">
            ${porCirculo[c].map(construirCardMagia).join('')}
          </div>
        </div>`;
    });

    return html;
  }

  function construirCardMagia(p) {
    const fmt = n => n.toLocaleString('pt-BR');
    const tipoClasse = p.tipo === 'divina' ? 'mag-tipo-divina' : 'mag-tipo-arcana';
    const tipoLabel  = p.tipoLabel || (p.tipo === 'divina' ? 'Divina' : 'Arcana');
    return `
      <div class="item-card mag-card ${tipoClasse}">
        <div class="item-topo">
          <span class="item-nome">${p.nome}</span>
          <span class="mag-circulo-badge">${CIRCULO_ROMANO[p.circulo]} · ${p.pm} PM</span>
        </div>
        ${(p.tipo || p.escola) ? `
        <div class="mag-classificacao">
          <span class="mag-tipo-badge ${tipoClasse}">${tipoLabel}</span>
          ${p.escola ? `<span class="mag-escola">${p.escola}</span>` : ''}
        </div>` : ''}
        ${p.descricao ? `<p class="mag-desc">${p.descricao}</p>` : ''}
        <div class="item-precos">
          <span class="mag-preco-label">Pergaminho</span>
          <span class="item-preco-final">T$ ${fmt(p.precoPergaminho)}</span>
        </div>
        <hr class="item-linha"/>
        <div class="item-stats">
          <span class="item-stat"><strong>Aprender:</strong> +T$ ${fmt(p.precoAprender)} (total T$ ${fmt(p.precoTotal)})</span>
          <span class="item-stat"><strong>Trabalho:</strong> ${p.diasAprender} dia${p.diasAprender !== 1 ? 's' : ''}</span>
          <span class="item-stat"><strong>Peso:</strong> ½ espaço</span>
        </div>
      </div>`;
  }

  // ── UTILITÁRIOS ──────────────────────────────────────────────────
  function formatarPreco(val) {
    if (val === null || val === undefined) return '—';
    if (val === '**' || val === '*')       return '**';
    const n = parseFloat(val);
    if (isNaN(n)) return String(val);
    return n % 1 === 0 ? n.toFixed(0) : n.toFixed(2);
  }

  function contarEncantamentos(dados) {
    return Object.values(dados.categorias || {})
      .reduce((acc, cat) => acc + (cat.total || 0), 0);
  }

  // ══════════════════════════════════════════════════════════════════
  //  EXPORTAÇÃO — .txt para os jogadores (Discord)
  //  O mestre escolhe quais seções entram (Normal / Especial / Magias).
  // ══════════════════════════════════════════════════════════════════
  function _expPreco(item) {
    const desc = item.desconto_pct;
    const orig = formatarPreco(item.preco_original);
    const fin  = formatarPreco(item.preco_final);
    if (desc != null && Number(desc) > 0) {
      return `T$ ${orig} → T$ ${fin}  (-${desc}%)`;
    }
    return `T$ ${fin}  (SEM DESCONTO)`;
  }

  function _expItemStats(item) {
    const p = [];
    if (item.tipo_item === 'weapon') {
      if (item.dano)      p.push(`Dano ${item.dano}`);
      if (item.critico)   p.push(`Crítico ${item.critico}`);
      if (item.alcance)   p.push(`Alcance ${item.alcance}`);
      if (item.tipo_arma) p.push(`Tipo ${item.tipo_arma}`);
      if (item.peso != null) p.push(`Peso ${item.peso}`);
    } else if (item.tipo_item === 'armor') {
      if (item.bonus_armadura != null) p.push(`Bônus +${item.bonus_armadura}`);
      if (item.penalidade_armadura)    p.push(`Penalidade ${item.penalidade_armadura}`);
      if (item.peso_armadura != null)  p.push(`Peso ${item.peso_armadura}`);
    } else if (item.peso != null) {
      p.push(`Peso ${item.peso}`);
    }
    return p.join(' · ');
  }

  // Quebra um texto longo em linhas indentadas, para o .txt dos jogadores.
  function _expWrap(texto, largura, indent) {
    const linhas = [];
    let atual = '';
    String(texto).split(/\s+/).forEach(p => {
      if (atual && (atual + ' ' + p).length > largura) { linhas.push(indent + atual); atual = p; }
      else { atual = atual ? atual + ' ' + p : p; }
    });
    if (atual) linhas.push(indent + atual);
    return linhas.length ? linhas.join('\n') + '\n' : '';
  }

  // Descrição em texto puro (sem HTML/tooltips) para o export.
  function _expDesc(nome) {
    if (!window.ItensDescricoes) return '';
    const d = ItensDescricoes.get(nome);
    return d ? _expWrap(d, 74, '        ') : '';
  }

  function _expSecaoNormal(dados) {
    const itens = (dados && dados.itens) || [];
    if (!itens.length) return '';
    const porTipo = {};
    itens.forEach(item => {
      const tipo = item.tipo_item || 'misc';
      const cat  = item.categoria || 'Outros';
      (porTipo[tipo] = porTipo[tipo] || {});
      (porTipo[tipo][cat] = porTipo[tipo][cat] || []).push(item);
    });

    let out = `\n⚔ LOJA NORMAL — ${itens.length} iten${itens.length !== 1 ? 's' : ''}\n${'═'.repeat(46)}\n`;
    ORDEM_TIPOS_NORMAL.forEach(tipo => {
      if (!porTipo[tipo]) return;
      out += `\n${TIPO_LABELS[tipo] || tipo}\n${'─'.repeat(30)}\n`;
      Object.entries(porTipo[tipo]).forEach(([cat, lista]) => {
        out += `  ${cat}:\n`;
        lista.forEach(item => {
          const stats = _expItemStats(item);
          out += `    • ${item.nome || '—'} — ${_expPreco(item)}\n`;
          if (stats) out += `        ${stats}\n`;
          out += _expDesc(item.nome);
        });
      });
    });
    return out;
  }

  function _expSecaoEspecial(dados) {
    const cats = (dados && dados.categorias) || {};
    let linhas = '';
    ORDEM_TIPOS_ESPECIAL.forEach(cat => {
      let info = cats[cat] || { total: 0, encantamentos: [] };
      if (cat === 'armadura') {
        const infoEscudo = cats['escudo'] || { total: 0, encantamentos: [] };
        const vistos     = new Set((info.encantamentos || []).map(e => e.name));
        const extras     = (infoEscudo.encantamentos || []).filter(e => !vistos.has(e.name));
        info = { encantamentos: [...(info.encantamentos || []), ...extras] };
      }
      const encs = info.encantamentos || [];
      if (!encs.length) return;
      linhas += `\n${TIPO_LABELS[cat] || cat}\n${'─'.repeat(30)}\n`;
      encs.forEach(e => {
        linhas += `    • ${e.name} — ${e.effect}\n`;
        linhas += _expDesc(e.name);
      });
    });
    if (!linhas) return '';
    const total = contarEncantamentos(dados);
    return `\n✨ LOJA ESPECIAL — ${total} encantamento${total !== 1 ? 's' : ''}\n${'═'.repeat(46)}\n${linhas}`;
  }

  function _expSecaoMagias(dados) {
    const perg = (dados && dados.pergaminhos) || [];
    if (!perg.length) return '';
    const porC = {};
    perg.forEach(p => { (porC[p.circulo] = porC[p.circulo] || []).push(p); });

    let out = `\n📜 MAGIAS (Pergaminhos) — ${perg.length} pergaminho${perg.length !== 1 ? 's' : ''}\n${'═'.repeat(46)}\n`;
    [1, 2, 3, 4, 5].forEach(c => {
      if (!porC[c]) return;
      const pm = Magias.PM_POR_CIRCULO[c];
      out += `\n${c}º Círculo — ${pm} PM\n${'─'.repeat(30)}\n`;
      porC[c].forEach(p => {
        const tipoLbl = p.tipoLabel || (p.tipo === 'divina' ? 'Divina' : 'Arcana');
        out += `    • ${p.nome} (${tipoLbl} · ${p.escola}) — Pergaminho T$ ${p.precoPergaminho.toLocaleString('pt-BR')}\n`;
        if (p.descricao) out += `        ${p.descricao}\n`;
        out += `        Aprender: +T$ ${p.precoAprender.toLocaleString('pt-BR')} (total T$ ${p.precoTotal.toLocaleString('pt-BR')}) · ${p.diasAprender} dia${p.diasAprender !== 1 ? 's' : ''}\n`;
      });
    });
    return out;
  }

  function exportarLoja(secoes) {
    const ent = entradaSelecionada();
    if (!ent) return;
    let txt = [
      '══════════════════════════════════════════════',
      '   GRIFOS ALADOS · MERCADO & ENCANTAMENTOS',
      `   Gerada em ${formatarDataLog(ent.quando)}`,
      '══════════════════════════════════════════════',
      '',
    ].join('\n');

    if (secoes.normal)   txt += _expSecaoNormal(ent.normal);
    if (secoes.especial) txt += _expSecaoEspecial(ent.especial);
    if (secoes.magias)   txt += _expSecaoMagias(ent.magias);

    baixarTxt(`loja_${carimboArquivo()}.txt`, txt + '\n');
  }

  function abrirModalExportarLoja() {
    const overlay = GA_abrirModal(`
      <div class="ga-modal-cab">
        <span>⬇ Exportar loja</span>
        <button class="ga-modal-x" data-ga-fechar title="Fechar">✕</button>
      </div>
      <p class="ga-modal-dica">Escolha quais seções da loja exibida entram no arquivo.</p>
      <div class="ga-modal-lista">
        <label class="ga-check"><input type="checkbox" data-ga-sec="normal" checked>
          <span><strong>⚔ Loja Normal</strong> — itens com preço e desconto</span></label>
        <label class="ga-check"><input type="checkbox" data-ga-sec="especial" checked>
          <span><strong>✨ Loja Especial</strong> — encantamentos</span></label>
        <label class="ga-check"><input type="checkbox" data-ga-sec="magias" checked>
          <span><strong>📜 Magias</strong> — pergaminhos</span></label>
      </div>
      <div class="ga-modal-acoes">
        <button class="ga-btn-principal" data-ga-baixar>⬇ Baixar .txt</button>
      </div>`);

    overlay.addEventListener('click', e => {
      if (e.target.closest('[data-ga-baixar]')) {
        const sec = {};
        overlay.querySelectorAll('input[data-ga-sec]').forEach(c => { sec[c.dataset.gaSec] = c.checked; });
        if (!sec.normal && !sec.especial && !sec.magias) { alert('Selecione ao menos uma seção.'); return; }
        exportarLoja(sec);
        overlay._fechar();
      }
    });
  }

  // ── BOTÃO: GERAR NOVA LOJA ──────────────────────────────────────
  // Gera uma nova loja na hora, no navegador — sem servidor.
  window.gerarNovaLoja = function () {
    const btn    = document.getElementById('btnGerarLoja');
    const status = document.getElementById('lojaStatus');
    if (!btn) return;

    const container = document.getElementById('loja-content');
    if (!container) return;

    // Salva qual painel está ativo antes de re-renderizar
    const painelAtivo =
      (container.querySelector('.loja-painel.ativo') || {}).id || 'painel-normal';

    btn.disabled       = true;
    btn.textContent    = '⏳ Gerando...';
    status.textContent = '';

    // pequeno atraso só para dar o feedback visual do botão
    setTimeout(() => {
      try {
        // gera, registra no histórico (vira a loja exibida) e re-renderiza
        const ent = novaEntradaLog();

        // renderizarLoja recria todo o conteúdo do container — inclusive
        // o #lojaStatus e o #btnGerarLoja. Por isso o status é definido
        // DEPOIS, no elemento recém-criado.
        renderizarLoja(container, ent.normal, ent.especial, ent.magias);

        const totalEnc    = contarEncantamentos(ent.especial);
        const totalMag    = (ent.magias && ent.magias.total) || 0;
        const statusNovo  = document.getElementById('lojaStatus');
        if (statusNovo) {
          statusNovo.textContent =
            `✔ ${ent.normal.total_itens} itens · ${totalEnc} encantamentos · ${totalMag} pergaminhos`;
        }

        // Restaura a aba que estava aberta (renderizarLoja é síncrono)
        restaurarPainel(container, painelAtivo);
      } catch (err) {
        status.textContent = '⚠ Erro: ' + err.message;
        btn.disabled    = false;
        btn.textContent = '🎲 Gerar Nova Loja';
      }
    }, 200);
  };

})();