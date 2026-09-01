// ════════════════════════════════════════════════════════════════════
//  ITENS-DESCRICOES.JS  —  Descrições de itens + glossário de tooltips
//  Localização: /grifos-alados/js/itens-descricoes.js
//
//  Consome window.GA_ITENS_DESC (gerado em itens-descricoes-data.js) e
//  expõe window.ItensDescricoes com:
//    .get(nome)    → string da descrição (ou null)
//    .html(nome)   → descrição com termos de regra marcados p/ tooltip
//    .marcar(txt)  → marca termos de regra em qualquer texto
//
//  Os termos do GLOSSARIO viram <span class="ga-tip" data-tip="…"> e
//  mostram a explicação ao passar o mouse (ver .ga-tip em css/style.css).
//  Usado pela Loja (loja.js) e pelo Gerador de Recompensas (recompensas.js).
// ════════════════════════════════════════════════════════════════════
window.ItensDescricoes = (function () {
  'use strict';

  const DESC = window.GA_ITENS_DESC || {};

  // ── Suplemento manual (js/itens-descricoes-extra-data.js): melhorias,
  //    materiais especiais e entradas em formato "Nome:" que o parser
  //    automático não captura. Mesma chave normalizada de DESC. ────────
  const EXTRA = window.GA_ITENS_DESC_EXTRA || {};

  // ── Variações de nome → chave canônica. ───────────────────────────
  //   • Recompensas lista armaduras-base com nomes curtos ("Couro",
  //     "Completa"), mas a descrição está sob o nome completo.
  //   • As tabelas de melhorias usam formas de gênero/número diferentes
  //     da entrada canônica (ex.: "Banhada a ouro" vs "banhado a ouro").
  const ALIASES = {
    'couro': 'armadura de couro',
    'completa': 'armadura completa',
    'banhada a ouro': 'banhado a ouro',
    'cravejada de gemas': 'cravejado de gemas',
    'discreta': 'discreto',
    'macabra': 'macabro',
    'espinhos': 'espinhosa',
    'espinhoso': 'espinhosa',
  };

  // ── Glossário: termo(s) → explicação exata ────────────────────────
  //  Cada entrada lista as variações (gênero/número) que podem aparecer
  //  no texto. Todas apontam para a mesma definição.
  const GLOSSARIO = [
    // ── Habilidades de armas ──
    { t: ['ágil', 'ágeis'], d: 'Habilidade de arma: pode ser usada com o poder Acuidade com Arma (somar Destreza, em vez de Força, ao ataque), mesmo não sendo uma arma leve.' },
    { t: ['adaptável', 'adaptáveis'], d: 'Habilidade de arma: arma de uma mão que, empunhada com as duas mãos, tem o dano aumentado em um passo.' },
    { t: ['alongada', 'alongado'], d: 'Habilidade de arma: dobra o alcance natural do atacante, mas não permite atacar um alvo adjacente.' },
    { t: ['desbalanceada', 'desbalanceado'], d: 'Habilidade de arma: impõe –2 em testes de ataque.' },
    { t: ['dupla'], d: 'Habilidade de arma: pode ser usada com Estilo de Duas Armas (e similares) para ataques adicionais, como uma arma de uma mão + uma arma leve. Cada ponta conta como uma arma separada para melhorias e encantos.' },
    { t: ['versátil', 'versáteis'], d: 'Habilidade de arma: fornece +2 em uma ou mais manobras de combate (conforme a arma), cumulativo com outros bônus de itens.' },
    { t: ['híbrida', 'híbrido'], d: 'Habilidade de arma: possui dois ou mais modos de uso; valem só as características do modo atual. Trocar de modo é ação de movimento (livre com Saque Rápido). Melhorias e encantos custam o dobro.' },
    { t: ['ocultável', 'ocultáveis'], d: 'Habilidade de arma: fornece +5 em testes de Ladinagem para escondê-la.' },
    { t: ['surpreendente'], d: 'Habilidade de arma: uma vez por cena, se sacada como ação livre e usada para atacar no mesmo turno, o alvo fica desprevenido contra esse ataque.' },

    // ── Proficiência ──
    { t: ['exótica', 'exóticas', 'exótico', 'exóticos'], d: 'Proficiência: arma de uso difícil, exige treinamento específico. Sem proficiência você sofre –5 nos testes de ataque.' },

    // ── Condições ──
    { t: ['desprevenido', 'desprevenida'], d: 'Condição: –5 na Defesa e não pode fazer reações.' },
    { t: ['vulnerável', 'vulneráveis'], d: 'Condição: –2 na Defesa.' },
    { t: ['em chamas'], d: 'Condição: sofre 1d6 de dano de fogo no início de cada turno. Apagar exige uma ação padrão e um teste de Reflexos (CD 15) — ou mergulhar na água.' },
    { t: ['enredado', 'enredada'], d: 'Condição: deslocamento reduzido à metade; não pode correr nem fazer investidas; –2 na Defesa e em testes de ataque.' },
    { t: ['lento', 'lenta'], d: 'Condição: só pode fazer uma ação padrão OU uma de movimento por turno (não as duas) e não pode usar ações livres que exijam esforço.' },
    { t: ['fatigado', 'fatigada'], d: 'Condição: não pode correr nem fazer investidas e sofre –2 em Força e Destreza. Piora para exausto; descansar remove.' },
    { t: ['exausto', 'exausta'], d: 'Condição: deslocamento reduzido à metade e –5 em Força e Destreza. Descansar reduz para fatigado.' },
    { t: ['cego', 'cega'], d: 'Condição: não enxerga — falha em testes que dependem de visão, fica desprevenido, sofre –5 em perícias de Força e Destreza e desloca-se à metade.' },
    { t: ['surdo', 'surda'], d: 'Condição: não escuta — –2 na Iniciativa e falha em testes que dependem de audição.' },
    { t: ['atordoado', 'atordoada'], d: 'Condição: larga o que estiver segurando, não pode fazer ações e fica desprevenido.' },
    { t: ['paralisado', 'paralisada'], d: 'Condição: não pode se mover nem agir (apenas ações mentais) e fica indefeso.' },
    { t: ['inconsciente'], d: 'Condição: desacordado e indefeso; não pode fazer ações.' },
    { t: ['indefeso', 'indefesa'], d: 'Condição: à mercê dos inimigos — pode sofrer um golpe de misericórdia (ex.: alvo caído, dormindo, paralisado ou inconsciente).' },
    { t: ['fascinado', 'fascinada'], d: 'Condição: fica absorto — não pode agir além de observar o que o fascina e sofre –5 em Percepção. Uma ação hostil contra ele encerra a condição.' },
    { t: ['enjoado', 'enjoada'], d: 'Condição: só pode realizar uma única ação padrão por turno (nenhuma outra ação).' },
    { t: ['caído', 'caída'], d: 'Condição: deitado no chão — –5 em ataques corpo a corpo. Atacantes corpo a corpo recebem +5 e atacantes à distância, –5. Levantar-se custa uma ação de movimento.' },
    { t: ['ofuscado', 'ofuscada'], d: 'Condição: –2 em testes de ataque e de Percepção.' },
    { t: ['sangrando'], d: 'Condição: perde pontos de vida no início de cada um dos seus turnos até a condição ser removida (cura mágica ou efeito apropriado).' },
    { t: ['confuso', 'confusa'], d: 'Condição: age de forma aleatória a cada turno (pode atacar a si mesmo, o alvo mais próximo, ou ficar à toa).' },
    { t: ['enfeitiçado', 'enfeitiçada'], d: 'Condição: trata a fonte do efeito como um aliado de confiança e não pode agir contra ela.' },
    { t: ['abalado', 'abalada'], d: 'Condição de medo: –2 em testes de perícia.' },
    { t: ['apavorado', 'apavorada'], d: 'Condição de medo: –5 em testes de perícia e, se possível, foge da fonte do medo.' },
    { t: ['alquebrado', 'alquebrada'], d: 'Condição: –5 em testes de perícia.' },

    // ── Efeitos defensivos recorrentes ──
    { t: ['camuflagem total'], d: 'Os ataques contra o alvo têm 50% de chance de errar e ele não pode ser alvo direto sem que o atacante saiba sua localização.' },
    { t: ['camuflagem leve'], d: 'Os ataques contra o alvo têm 20% de chance de errar.' },
    { t: ['fortificação'], d: 'Chance (conforme a % indicada) de converter um acerto crítico ou ataque furtivo sofrido em um acerto normal.' },
    { t: ['redução de dano'], d: 'Reduz o dano sofrido a cada golpe pelo valor indicado, do tipo especificado ("mundano" = dano de fontes não-mágicas).' },
    { t: ['resistência a magia'], d: 'Fornece um bônus em testes de resistência contra efeitos mágicos.' },
  ];

  // ── Normalização (igual à usada para gerar os dados) ──────────────
  function norm(s) {
    if (!s) return '';
    s = String(s).trim().replace(/\([^)]*\)/g, '').toLowerCase();
    s = s.normalize('NFD').replace(/[̀-ͯ]/g, '');
    s = s.replace(/[^a-z0-9 \-]/g, ' ').replace(/\s+/g, ' ').trim();
    return s;
  }

  // ── Índice variação → definição + regex mestre ────────────────────
  const variantDef = {};
  const variants = [];
  GLOSSARIO.forEach(g => g.t.forEach(v => {
    variantDef[v.toLowerCase()] = g.d;
    variants.push(v);
  }));
  variants.sort((a, b) => b.length - a.length); // mais longos primeiro
  const alt = variants
    .map(v => v.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|');

  let TERMRE;
  try {
    // Fronteiras Unicode (não quebra palavra dentro de acentuadas)
    TERMRE = new RegExp('(?<![\\p{L}\\p{M}])(' + alt + ')(?![\\p{L}\\p{M}])', 'giu');
  } catch (e) {
    TERMRE = new RegExp('\\b(' + alt + ')\\b', 'gi'); // fallback navegadores antigos
  }

  function escHtml(s) {
    return String(s).replace(/[&<>"]/g, c =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  }

  // Mesma escapada, mas para VALOR DE ATRIBUTO — as quebras de linha viram
  // entidades, senão o texto copiável perderia a formatação no data-*.
  function escAttr(s) {
    return escHtml(s).replace(/\r?\n/g, '&#10;');
  }

  // Marca cada termo de regra (apenas a 1ª ocorrência de cada um) com tooltip.
  function marcar(texto) {
    if (!texto) return '';
    const vistos = new Set();
    return escHtml(texto).replace(TERMRE, m => {
      const def = variantDef[m.toLowerCase()];
      if (!def || vistos.has(def)) return m;
      vistos.add(def);
      return `<span class="ga-tip" tabindex="0" data-tip="${escHtml(def)}">${m}</span>`;
    });
  }

  // ── Fallback p/ magias engarrafadas (poções, óleos e granadas do
  //    Gerador de Recompensas): reaproveita os resumos de window.Magias.
  //    Resolução preguiçosa, pois magias.js carrega DEPOIS deste arquivo. ─
  let _magiaIdx = null;
  function magiaDesc(n) {
    const todas = window.Magias && window.Magias.TODAS;
    if (!todas) return null;            // magias.js ainda não carregou
    if (_magiaIdx === null) {
      _magiaIdx = {};
      for (const m of todas) {
        const k = norm(m.nome);
        if (k && !(k in _magiaIdx)) _magiaIdx[k] = m.descricao;
      }
    }
    return _magiaIdx[n] || null;
  }

  function get(nome) {
    let n = norm(nome);
    if (!DESC[n] && !EXTRA[n] && ALIASES[n]) n = ALIASES[n];
    return DESC[n] || EXTRA[n] || magiaDesc(n) || null;
  }

  function html(nome) {
    const d = get(nome);
    return d ? marcar(d) : '';
  }

  // Bloco recolhível pronto (aba de pergaminho). Vazio se não houver descrição.
  //  opts.titulo → 1ª linha do texto copiado (padrão: o próprio nome do item)
  //  opts.linhas → contexto que entra logo abaixo do título, uma por linha
  //                (ex.: 'Preço: T$ 50', 'Dano: 1d8', 'Fonte: T20, p. 141').
  // O botão "⧉ Copiar" leva NOME + esse contexto + a descrição inteira.
  function bloco(nome, label, opts) {
    const h = html(nome);
    if (!h) return '';
    const o = opts || {};
    const linhas = (o.linhas || []).map(v => String(v == null ? '' : v).trim()).filter(Boolean);
    const texto = [String(o.titulo || nome || '').trim()]
      .concat(linhas, ['', get(nome) || ''])
      .join('\n').trim();
    return `<details class="ga-desc"><summary>${escHtml(label || 'Descrição')}</summary>`
         + `<div class="ga-desc-corpo">${h}`
         + `<button type="button" class="ga-desc-copiar" data-ga-copiar="${escAttr(texto)}"`
         + ` title="Copiar o texto completo (nome, valor e descrição)">⧉ Copiar</button>`
         + `</div></details>`;
  }

  // ── Botão "⧉ Copiar" dos blocos de descrição ───────────────────────
  //  Usa a API de área de transferência quando disponível e cai para o
  //  velho execCommand('copy') quando o navegador barra (páginas abertas
  //  direto do disco, por exemplo).
  function _copiarFallback(texto) {
    try {
      const ta = document.createElement('textarea');
      ta.value = texto;
      ta.setAttribute('readonly', '');
      ta.style.cssText = 'position:fixed;top:-1000px;left:-1000px;opacity:0';
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      ta.remove();
      return ok;
    } catch (e) { return false; }
  }

  // Devolve o botão ao rótulo original (cancelando um aviso em andamento).
  function _resetBotao(btn) {
    if (!btn) return;
    if (btn._gaTimer) { clearTimeout(btn._gaTimer); btn._gaTimer = null; }
    if (btn._gaLabel) btn.textContent = btn._gaLabel;
    btn.classList.remove('ga-copia--ok', 'ga-copia--erro');
  }

  function _avisarBotao(btn, txt, cls) {
    if (!btn._gaLabel) btn._gaLabel = btn.textContent;
    _resetBotao(btn);
    btn.textContent = txt;
    btn.classList.add(cls);
    btn._gaTimer = setTimeout(() => _resetBotao(btn), 1800);
  }

  function _copiarTexto(texto, btn) {
    const ok    = () => _avisarBotao(btn, '✓ Copiado!', 'ga-copia--ok');
    const falha = () => _avisarBotao(btn, '✕ Não deu', 'ga-copia--erro');
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(texto)
        .then(ok, () => { if (_copiarFallback(texto)) ok(); else falha(); });
      return;
    }
    if (_copiarFallback(texto)) ok(); else falha();
  }

  // ── Balão flutuante ("portal") dos termos .ga-tip ──────────────────
  //  O desenho antigo era 100% CSS (::after acima do termo), mas dentro
  //  de caixas com rolagem — como o texto rico da aba Combates — o
  //  overflow recortava o balão (só a barrinha aparecia). Agora um único
  //  elemento no <body>, posicionado com position:fixed, mostra a
  //  definição: nenhum contêiner consegue cortá-lo. Os <span class="ga-tip">
  //  já salvos nas fichas continuam valendo — o gatilho é delegado.
  let _pop = null;
  let _tipAtual = null;   // o <span> cuja definição está visível
  let _fixado = false;    // nuvem FIXADA por clique (para copiar o texto)

  function _popEl() {
    if (_pop) return _pop;
    _pop = document.createElement('div');
    _pop.className = 'ga-tip-pop';
    _pop.setAttribute('role', 'tooltip');
    _pop.hidden = true;
    const txt = document.createElement('div');
    txt.className = 'ga-tip-pop-txt';
    // rodapé — só aparece com a nuvem FIXADA (é quando ela aceita o mouse)
    const pe = document.createElement('div');
    pe.className = 'ga-tip-pop-pe';
    const pin = document.createElement('span');
    pin.className = 'ga-tip-pop-pin';
    pin.textContent = 'clique fora (ou Esc) para soltar';
    const copiar = document.createElement('button');
    copiar.type = 'button';
    copiar.className = 'ga-tip-pop-copiar';
    copiar.title = 'Copiar o trecho e a descrição inteira';
    copiar.textContent = '⧉ Copiar';
    pe.appendChild(pin);
    pe.appendChild(copiar);
    const seta = document.createElement('span');
    seta.className = 'ga-tip-pop-seta';
    _pop.appendChild(txt);
    _pop.appendChild(pe);
    _pop.appendChild(seta);
    document.body.appendChild(_pop);
    return _pop;
  }

  // Acima disto a nuvem vira "longa": mais larga, com teto de altura e o
  // texto rolando por dentro. É o caso do texto integral de uma magia
  // pendurada num trecho (GA_Tip) — a definição de uma regra do glossário
  // nunca chega perto.
  const LIMITE_LONGO = 420;

  function _mostrarTip(span) {
    const def = span.getAttribute('data-tip');
    if (!def) return;
    const pop = _popEl();
    _tipAtual = span;
    pop.querySelector('.ga-tip-pop-txt').textContent = def;
    pop.classList.remove('ga-tip-pop--abaixo', 'ga-tip-pop--solto');
    pop.classList.toggle('ga-tip-pop--longo', def.length > LIMITE_LONGO || def.indexOf('\n') >= 0);
    pop.hidden = false;

    // o botão do rodapé leva o TRECHO grifado (nome do item, da magia…)
    // junto com a descrição inteira — o mesmo formato dos blocos 📜.
    const btnCopiar = pop.querySelector('.ga-tip-pop-copiar');
    if (btnCopiar) {
      _resetBotao(btnCopiar);
      const termo = (span.textContent || '').trim();
      btnCopiar.setAttribute('data-ga-copiar', (termo ? termo + '\n\n' : '') + def);
    }

    // mede no canto (0,0), para o max-width valer sem a borda da janela
    pop.style.left = '0px';
    pop.style.top  = '0px';
    const r  = span.getBoundingClientRect();
    const vw = document.documentElement.clientWidth;
    const vh = document.documentElement.clientHeight;

    // Aviso do rodapé. Nas nuvens longas ele aparece já com a nuvem
    // SOLTA — que é quando o mestre precisa saber que o clique a fixa
    // (solta, ela não pega o mouse, então não rola nem copia).
    const txt = pop.querySelector('.ga-tip-pop-txt');
    const pin = pop.querySelector('.ga-tip-pop-pin');
    if (pin) {
      pin.textContent = pop.classList.contains('ga-tip-pop--fixado')
        ? 'clique fora (ou Esc) para soltar'
        : (txt.scrollHeight > txt.clientHeight + 1
          ? 'clique no trecho para fixar e rolar o texto'
          : 'clique no trecho para fixar e copiar');
    }

    const pw = pop.offsetWidth;
    const ph = pop.offsetHeight;

    let left = Math.round(r.left + r.width / 2 - pw / 2);
    left = Math.max(6, Math.min(left, vw - pw - 6));

    let top = Math.round(r.top - ph - 8);      // preferência: acima do termo
    if (top < 6) {                             // sem espaço → abre abaixo
      top = Math.round(r.bottom + 8);
      pop.classList.add('ga-tip-pop--abaixo');
      if (top + ph > vh - 6) {                 // nem abaixo cabe: encosta e
        top = Math.max(6, vh - ph - 6);        // solta a seta, que perdeu o alvo
        pop.classList.add('ga-tip-pop--solto');
      }
    }

    // a seta persegue o centro do termo mesmo com o balão preso na borda
    const seta = pop.querySelector('.ga-tip-pop-seta');
    const alvoX = r.left + r.width / 2 - left;
    seta.style.left = Math.round(Math.max(10, Math.min(alvoX, pw - 10))) + 'px';

    pop.style.left = left + 'px';
    pop.style.top  = top + 'px';
  }

  function _esconderTip() {
    if (_pop) { _pop.hidden = true; _pop.classList.remove('ga-tip-pop--fixado'); }
    _tipAtual = null;
    _fixado = false;
  }

  // Fixa a nuvem no termo (clique): ela ganha ponteiro/seleção de texto
  // para o mestre poder COPIAR o conteúdo. Clique fora ou Esc solta.
  function _fixarTip(span) {
    _mostrarTip(span);                          // garante a nuvem visível
    _pop.classList.add('ga-tip-pop--fixado');   // rodapé da nuvem fixada aparece…
    _mostrarTip(span);                          // …então re-mede e reposiciona
    _fixado = true;
  }

  if (typeof document !== 'undefined' && typeof document.addEventListener === 'function') {
    document.addEventListener('mouseover', e => {
      if (_fixado) return;   // fixada por clique: o mouse não a dispensa
      const alvo = e.target && e.target.closest ? e.target.closest('.ga-tip') : null;
      if (alvo) _mostrarTip(alvo);
      else if (_tipAtual) _esconderTip();
    });
    // botão "⧉ Copiar" dos blocos de descrição (Loja e Recompensas)
    document.addEventListener('click', e => {
      const btn = e.target && e.target.closest ? e.target.closest('[data-ga-copiar]') : null;
      if (!btn) return;
      e.preventDefault();
      e.stopPropagation();
      _copiarTexto(btn.getAttribute('data-ga-copiar') || '', btn);
    });
    // clique num termo FIXA a nuvem (de novo no mesmo termo = solta);
    // clique dentro da nuvem fixada não faz nada (selecionar/copiar)
    document.addEventListener('click', e => {
      const alvo = e.target && e.target.closest ? e.target.closest('.ga-tip') : null;
      if (alvo) {
        if (_fixado && _tipAtual === alvo) { _esconderTip(); return; }
        _fixarTip(alvo);
        return;
      }
      if (_fixado && _pop && _pop.contains(e.target)) return;
      if (_fixado) _esconderTip();
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && _fixado) _esconderTip();
    });
    // digitou em qualquer lugar → solta a nuvem (evita nuvem órfã ao editar)
    document.addEventListener('input', () => { if (_fixado) _esconderTip(); }, true);
    // teclado: os termos têm tabindex="0"
    document.addEventListener('focusin', e => {
      if (_fixado) return;
      const alvo = e.target && e.target.closest ? e.target.closest('.ga-tip') : null;
      if (alvo) _mostrarTip(alvo);
    });
    document.addEventListener('focusout', () => { if (_tipAtual && !_fixado) _esconderTip(); });
    // rolagem/redimensionamento deslocam o termo — o balão some em vez
    // de ficar flutuando solto (capture pega o scroll de qualquer caixa);
    // fixada, ela permanece, para dar tempo de copiar
    document.addEventListener('scroll', () => { if (_tipAtual && !_fixado) _esconderTip(); }, true);
    window.addEventListener('resize', () => { if (_tipAtual && !_fixado) _esconderTip(); });
  }

  return { get, html, bloco, marcar, norm,
           fecharNuvem: _esconderTip,   // fecha/solta a nuvem (usado pelo GA_Tip)
           _total: Object.keys(DESC).length + Object.keys(EXTRA).length,
           _glossario: GLOSSARIO };
})();
