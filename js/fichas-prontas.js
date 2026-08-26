// ═══════════════════════════════════════════════════════════════════
//  FICHAS-PRONTAS.JS — aba "📕 Fichas Prontas" (só do mestre)
//  Localização: /grifos-alados/js/fichas-prontas.js
//
//  Uma aba, um livro por sub-aba. Cada livro traz as fichas já prontas
//  agrupadas nas categorias do próprio livro, com busca e um botão que
//  manda uma cópia editável direto para a aba ⚔ Combates.
//
//  ⚠ Esta aba NÃO existe no jogadores.html — os jogadores não têm como
//    espiar o bestiário. A trava é a mais dura possível: o HTML deles
//    simplesmente não carrega nem a seção nem este arquivo.
//
//  Livros registrados em LIVROS (embaixo). Para plugar um livro novo
//  basta criar o js/<arquivo>-data.js no mesmo formato de
//  js/fichas-t20-data.js, incluí-lo no index.html e apontar `fonte`
//  para o global dele — nada mais nesta aba precisa mudar.
//
//  Formato esperado de cada livro:
//    window.X = {
//      livro, fonte,
//      categorias: [{
//        chave, nome, icone, cor, intro,
//        comuns: { titulo, aplicaSe, nota },   // opcional
//        fichas: [{ chave, nome, nd, tipo, papel, resumo, texto,
//                   habilidadesExtra }],
//        regras: [{ titulo, texto }],          // opcional
//      }],
//      regras: [{ cat, titulo, texto }],       // opcional (formato do Guia)
//      itens:  [{ nome, meta, texto }],        // opcional (formato do Guia)
//    }
// ═══════════════════════════════════════════════════════════════════
window.GA_FichasProntas = (function () {
  'use strict';

  const esc = window.GA_esc;
  const nl2br = window.GA_nl2br;
  const semAcento = window.GA_semAcento;
  const SB = window.GA_Statblock;

  // ── REGISTRO DOS LIVROS ──────────────────────────────────────────
  // `fonte` é o nome da variável global com os dados. Livro sem dados
  // carregados vira uma sub-aba "em breve" — é assim que Ameaças de
  // Arton e Deuses de Arton esperam a vez deles.
  const LIVROS = [
    { chave: 't20',          icone: '⚔', cor: '#8a4b1f',
      nome: 'Ameaças (Tormenta 20)', curto: 'Tormenta 20',
      fonte: 'FICHAS_T20',
      sub: 'As 80 criaturas do Capítulo 7 do livro básico, nos grupos da Tabela 7-1.' },
    { chave: 'ameacasArton', icone: '👹', cor: '#8f2f2f',
      nome: 'Ameaças de Arton', curto: 'Ameaças de Arton',
      fonte: 'FICHAS_AMEACAS_ARTON',
      sub: 'O bestiário grande de Arton, nas seções do livro: as criaturas das áreas de Tormenta, os povos brutos, o crime organizado, o culto de Aharadak, os dragões, os duyshidakk, os elementais, os monstros dos ermos, os gnolls, os golens, as igrejas de Arsenal e de Kallyadranoch, os impérios de Jade e de Tauron, os kobolds, os mascotes e familiares, os monstros de masmorra, as montarias, os mortos-vivos, as feras de Galrasia, os piratas e pistoleiros e os povos-trovão. Traz junto o capítulo de regras de ameaças (tipos, tamanho, papel de combate e as habilidades gerais), os simbiontes do Devorador e os tesouros arrancados das feras do mundo perdido.' },
    { chave: 'deusesArton',  icone: '⛩', cor: '#8a6a1f',
      nome: 'Deuses de Arton', curto: 'Deuses de Arton',
      fonte: 'FICHAS_DEUSES_ARTON',
      sub: 'Como o Panteão pisa em Arton: os avatares dos vinte Deuses Maiores, cada um com o quadro de dados da divindade dentro do card — e quem os deuses mandam quando um avatar seria demais (aspectos, celestiais, fadas, gênios e gigantes).' },
    { chave: 'npcs',         icone: '👤', cor: '#4a5a7a',
      nome: 'Guia de NPCs', curto: 'Guia de NPCs',
      fonte: 'GUIA_NPCS',
      sub: 'O povo de Arton: plebe, templo, lei, crime, corte e mercenários. Fichas de gente comum — nada a ver com os bestiários acima. Para trocar a raça, aplicar um truque mercenário ou tornar o NPC devoto de um deus, use o botão 📕 Fichas prontas dentro da cena, na aba ⚔ Combates.' },
  ];

  let livroAtivo = LIVROS[0].chave;
  let catAtiva = '';
  let termo = '';

  // ── ACESSO AOS DADOS ─────────────────────────────────────────────
  function dadosDe(l) { return window[l.fonte] || null; }
  function categoriasDe(l) {
    const d = dadosDe(l);
    return (d && Array.isArray(d.categorias)) ? d.categorias : [];
  }
  function livros() {
    return LIVROS.map(l => Object.assign({}, l, {
      dados: dadosDe(l), categorias: categoriasDe(l),
      disponivel: categoriasDe(l).length > 0,
    }));
  }
  function livro(chave) { return LIVROS.find(l => l.chave === chave) || null; }

  // { livro, cat, def } de uma ficha — usado pelo bestiário na inserção
  function ficha(livroChave, fichaChave) {
    const l = livro(livroChave);
    if (!l) return null;
    let achado = null;
    categoriasDe(l).forEach(cat => (cat.fichas || []).forEach(f => {
      if (f.chave === fichaChave) achado = { livro: l, cat: cat, def: f };
    }));
    return achado;
  }

  // Quadro de habilidades que o livro manda aplicar a TODAS as fichas do
  // grupo (Ódio Puro, Habilidades Dracônicas, Habilidades Lefeu). O texto
  // mora em cat.regras com o mesmo título; `aplicaSe` filtra pela linha de
  // tipo da ficha, porque o quadro nem sempre vale para o grupo inteiro.
  function comunsDe(ref) {
    if (!ref || !ref.cat || !ref.cat.comuns) return null;
    const c = ref.cat.comuns;
    if (c.aplicaSe && String(ref.def.tipo || '').indexOf(c.aplicaSe) < 0) return null;
    const r = (ref.cat.regras || []).find(x => x.titulo === c.titulo);
    return r ? { titulo: r.titulo, texto: r.texto, nota: c.nota } : null;
  }

  // ND em número, para ordenar ("1/4" → 0.25; ilegível vai pro fim)
  function ndValor(nd) {
    const s = String(nd || '').trim();
    if (/^[–—-]$/.test(s)) return -1;          // ficha de apoio, sem ND
    if (/^S\s*\+$/i.test(s)) return 901;       // patamar S+ (acima de tudo)
    if (/^S$/i.test(s)) return 900;            // patamar S
    const fr = s.match(/^(\d+)\s*\/\s*(\d+)$/);
    if (fr) return (+fr[1]) / (+fr[2]);
    const n = parseFloat(s.replace(',', '.'));
    return isNaN(n) ? 999 : n;
  }

  // lista plana de todas as fichas de todos os livros (busca global)
  function todas() {
    const out = [];
    LIVROS.forEach(l => categoriasDe(l).forEach(cat => (cat.fichas || []).forEach(f => {
      out.push({ livro: l, cat: cat, def: f });
    })));
    return out;
  }

  // ── CARDS ────────────────────────────────────────────────────────
  const PAPEIS = {
    solo:     { rot: 'Solo',     dica: 'Feita para enfrentar o grupo sozinha — muitos PV, combate de 3 a 5 rodadas.' },
    lacaio:   { rot: 'Lacaio',   dica: 'Feita para vir em bando — ataque e dano altos, poucos PV.' },
    especial: { rot: 'Especial', dica: 'Conjuradora, líder ou de uso fora do combate direto — leia a ficha antes de usar.' },
  };

  // Abertura do subgrupo, para as fichas que o livro deixou sem texto
  // próprio ("Orc combatente" vive sob o quadro "Orcs"). O texto mora em
  // cat.regras com o mesmo título.
  function subIntro(ref) {
    const t = ref.def && ref.def.subgrupo;
    if (!t) return null;
    return (ref.cat.regras || []).find(r => r.titulo === t) || null;
  }
  function subIntroHtml(ref) {
    const r = subIntro(ref);
    if (!r) return '';
    // Quadro em forma de ficha de dados ("Símbolo Sagrado. Um sol dourado.")
    // ganha o rótulo em negrito, linha por linha — é o formato do quadro das
    // divindades em Deuses de Arton. Quadro em prosa não bate na regra
    // (não tem ponto nos primeiros 30 caracteres) e sai inteiro.
    const corpo = nl2br(r.texto).split('<br>')
      .map(l => l.replace(/^([A-ZÀ-Ý][^.<]{2,28})\./, '<strong>$1.</strong>'))
      .join('<br>');
    return `<p class="npc-desc fp-sub-intro"><strong>${esc(r.titulo)}.</strong> ${corpo}</p>`;
  }

  // Quadro que já aparece INTEIRO dentro do card de uma ficha (via
  // `subgrupo`) e é de uma ficha só não ganha card próprio na lista — seria
  // a mesma caixa duas vezes. É o caso do quadro de dados de cada divindade
  // em Deuses de Arton. Quando várias fichas dividem o quadro ("Orcs",
  // "Dragões", "Cobras"), o card avulso continua sendo o lugar canônico.
  function jaMostradoNaFicha(cat, r) {
    return (cat.fichas || []).filter(f => f.subgrupo === r.titulo).length === 1;
  }

  function cardFicha(ref) {
    const f = ref.def, cat = ref.cat, l = ref.livro;
    // o quadro do subgrupo entra na busca junto com a ficha: é lá que moram
    // a arma preferida e a canalização de cada deus, e a abertura dos grupos
    // do Tormenta 20 ("Orcs", "Dragões")
    const quadro = subIntro(ref);
    const busca = semAcento([f.nome, f.alias, 'nd ' + f.nd, f.tipo, f.subgrupo, f.resumo,
                             cat.nome, l.nome, f.texto, quadro ? quadro.texto : ''].join(' '));
    const papel = PAPEIS[f.papel];
    // subgrupo: as 29 fichas que o livro deixou sem texto próprio vivem sob
    // uma abertura comum ("Orcs", "Cobras", "Dragões") — vale mostrar
    const sub = f.subgrupo ? `<span class="fp-sub">${esc(f.subgrupo)}</span> · ` : '';
    return `
      <details class="vc-card npc-card fp-card" data-busca="${esc(busca)}"
               data-fp-ficha="${esc(f.chave)}" data-fp-livro="${esc(l.chave)}"
               data-fp-cat="${esc(cat.chave)}" style="--cor:${cat.cor || l.cor}">
        <summary class="vc-card-cab">
          <span class="vc-card-nome">${esc(f.nome)} <span class="npc-nd">ND ${esc(f.nd)}</span></span>
          <span class="vc-card-meta">${sub}${esc(f.tipo || '')}${papel ? ` · <span class="fp-papel" title="${esc(papel.dica)}">${esc(papel.rot)}</span>` : ''}</span>
        </summary>
        <div class="vc-card-corpo">
          ${subIntroHtml(ref)}
          <div class="npc-block">${SB.bloco(f.texto)}</div>
          <div class="npc-acoes fp-acoes">
            <button type="button" class="npc-enviar" data-fp-enviar="${esc(f.chave)}" data-fp-livro="${esc(l.chave)}"
                    title="Insere uma cópia editável desta ficha na cena narrada (ou numa sessão própria) da aba ⚔ Combates">⚔ Enviar para o combate</button>
            <button type="button" class="fp-copiar" data-fp-copiar="${esc(f.chave)}" data-fp-livro="${esc(l.chave)}"
                    title="Copia o statblock em texto — para colar em qualquer lugar">📋 Copiar texto</button>
            <span class="npc-envio-info" hidden></span>
          </div>
        </div>
      </details>`;
  }

  function cardRegra(r) {
    const busca = semAcento([r.titulo, r.texto].join(' '));
    // textoComSelo (e não nl2br) porque um quadro pode trazer habilidade
    // mágica marcada — é o caso de Metamorfose Dracônica, em "Habilidades
    // Dracônicas", que vale para todos os dragões jovens ou mais velhos.
    return `
      <details class="vc-card vc-card--regra" data-busca="${esc(busca)}">
        <summary class="vc-card-cab"><span class="vc-card-nome">📖 ${esc(r.titulo)}</span></summary>
        <div class="vc-card-corpo"><div class="vc-regras">${SB.textoComSelo(r.texto)}</div></div>
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

  // ── DESENHO DA ABA ───────────────────────────────────────────────
  function barraLivros() {
    return `<nav class="fp-livros" aria-label="Livros de fichas prontas">` +
      LIVROS.map(l => {
        const n = categoriasDe(l).reduce((s, c) => s + (c.fichas || []).length, 0);
        const off = n ? '' : ' fp-livro--vazio';
        return `<button type="button" class="fp-livro${l.chave === livroAtivo ? ' fp-livro--ativo' : ''}${off}"
                        data-fp-livro-aba="${esc(l.chave)}" style="--cor:${l.cor}"
                        title="${esc(l.nome)}">
                  <span class="fp-livro-ico">${l.icone}</span>
                  <span class="fp-livro-nome">${esc(l.curto)}</span>
                  <span class="fp-livro-qtd">${n ? n : 'em breve'}</span>
                </button>`;
      }).join('') + `</nav>`;
  }

  function corpoDoLivro(l) {
    const cats = categoriasDe(l);
    if (!cats.length) {
      return `
        <div class="cr-embreve fp-embreve">
          <strong>${l.icone} ${esc(l.nome)} — ainda não carregado.</strong>
          <p>${esc(l.sub || '')}</p>
          <p class="fp-embreve-como">Quando as fichas deste livro estiverem prontas, salve-as em
          <code>js/${esc(l.fonte.toLowerCase().replace(/_/g, '-'))}-data.js</code> no mesmo formato de
          <code>js/fichas-t20-data.js</code> (a variável global precisa se chamar
          <code>window.${esc(l.fonte)}</code>), inclua o arquivo no <code>index.html</code>
          e esta sub-aba se enche sozinha.</p>
        </div>`;
    }

    // chips de categoria
    let chips = `<button type="button" class="fp-cat${catAtiva ? '' : ' fp-cat--ativa'}" data-fp-cat-chip="">Todas <span class="fp-cat-qtd">${cats.reduce((s, c) => s + (c.fichas || []).length, 0)}</span></button>`;
    cats.forEach(c => {
      chips += `<button type="button" class="fp-cat${catAtiva === c.chave ? ' fp-cat--ativa' : ''}"
                        data-fp-cat-chip="${esc(c.chave)}" style="--cor:${c.cor || l.cor}">
                  ${esc(c.icone || '')} ${esc(c.nome)} <span class="fp-cat-qtd">${(c.fichas || []).length}</span>
                </button>`;
    });

    const d = dadosDe(l) || {};
    const regrasSoltas = Array.isArray(d.regras) ? d.regras : [];
    const itens = Array.isArray(d.itens) ? d.itens : [];

    let grupos = '';
    cats.forEach(cat => {
      const fichas = (cat.fichas || []).slice()
        .sort((a, b) => ndValor(a.nd) - ndValor(b.nd) || a.nome.localeCompare(b.nome, 'pt'));
      const cards = fichas.map(f => cardFicha({ livro: l, cat: cat, def: f })).join('');
      const caixas = (cat.regras || []).filter(r => !jaMostradoNaFicha(cat, r)).map(cardRegra).join('') +
                     regrasSoltas.filter(r => r.cat === cat.chave).map(cardRegra).join('');
      const comuns = cat.comuns
        ? `<p class="fp-comuns">⚑ <strong>${esc(cat.comuns.titulo)}</strong> vale para as fichas deste grupo — ao enviar para o combate, o quadro entra junto na ficha. <em>${esc(cat.comuns.nota || '')}</em></p>`
        : '';
      grupos += `
        <div class="vc-grupo fp-grupo" data-fp-grupo="${esc(cat.chave)}">
          <h2 class="vc-grupo-titulo">${esc(cat.icone || '')} ${esc(cat.nome)}</h2>
          ${cat.intro ? `<p class="npc-intro">${nl2br(cat.intro)}</p>` : ''}
          ${comuns}
          <div class="vc-lista">${cards}${caixas}</div>
        </div>`;
    });

    const gerais = regrasSoltas.filter(r => r.cat === 'geral' || !r.cat).map(cardRegra).join('');

    return `
      <p class="fp-livro-sub">${esc(d.livro || l.nome)}${d.fonte ? ' · ' + esc(d.fonte) : ''} — ${esc(l.sub || '')}</p>
      <div class="fp-cats">${chips}</div>
      ${grupos}
      ${gerais ? `<div class="vc-grupo fp-grupo" data-fp-grupo="~geral"><h2 class="vc-grupo-titulo">📖 Regras gerais</h2><div class="vc-lista">${gerais}</div></div>` : ''}
      ${itens.length ? `<div class="vc-grupo fp-grupo" data-fp-grupo="~itens"><h2 class="vc-grupo-titulo">🗡 Itens especiais citados nas fichas</h2><div class="vc-lista">${itens.map(cardItem).join('')}</div></div>` : ''}`;
  }

  function render() {
    const cont = document.getElementById('fichas-prontas-content');
    if (!cont) return;
    const l = livro(livroAtivo) || LIVROS[0];

    cont.innerHTML = `
      <div class="cr-cabecalho">
        <h1>📕 Fichas Prontas</h1>
        <p class="cr-sub">Os bestiários e as galerias de NPCs dos livros, prontos para usar.
        Busque, abra a ficha e clique em <strong>⚔ Enviar para o combate</strong> — uma cópia editável cai na
        cena narrada da aba ⚔ Combates (sem cena narrada, numa sessão própria).
        <span class="fp-selo">🔒 aba só do mestre — não existe na edição dos jogadores</span></p>
      </div>
      ${barraLivros()}
      <input class="cr-busca fp-busca" type="text" value="${esc(termo)}"
             placeholder="Buscar ficha (orc, dragão, ND 5, morto-vivo, veneno…)" autocomplete="off">
      <p class="fp-busca-nota" data-fp-nota hidden></p>
      <div class="fp-corpo">${corpoDoLivro(l)}</div>`;

    aplicarFiltro(cont);
  }

  // ── BUSCA E FILTRO ───────────────────────────────────────────────
  function aplicarFiltro(cont) {
    cont = cont || document.getElementById('fichas-prontas-content');
    if (!cont) return;
    const t = semAcento(termo.trim());

    cont.querySelectorAll('[data-busca]').forEach(el => {
      const grupo = el.closest('[data-fp-grupo]');
      const daCat = !catAtiva || !grupo || grupo.dataset.fpGrupo === catAtiva;
      const bate = daCat && (!t || el.dataset.busca.indexOf(t) >= 0);
      el.style.display = bate ? '' : 'none';
      if (el.tagName === 'DETAILS') el.open = !!t && bate;
    });
    let achados = 0;
    cont.querySelectorAll('.fp-grupo').forEach(gr => {
      const visiveis = Array.from(gr.querySelectorAll('[data-busca]')).filter(c => c.style.display !== 'none');
      achados += visiveis.length;
      gr.style.display = visiveis.length ? '' : 'none';
    });

    // quantas fichas o mesmo termo acha nos OUTROS livros
    const nota = cont.querySelector('[data-fp-nota]');
    if (!nota) return;
    if (!t) { nota.hidden = true; return; }
    const fora = {};
    todas().forEach(ref => {
      if (ref.livro.chave === livroAtivo) return;
      const q = subIntro(ref);
      const b = semAcento([ref.def.nome, ref.def.alias, 'nd ' + ref.def.nd, ref.def.tipo, ref.def.resumo,
                           ref.cat.nome, ref.def.texto, q ? q.texto : ''].join(' '));
      if (b.indexOf(t) >= 0) fora[ref.livro.chave] = (fora[ref.livro.chave] || 0) + 1;
    });
    const outros = Object.keys(fora).map(k => {
      const l = livro(k);
      return `<button type="button" class="fp-ir-livro" data-fp-livro-aba="${esc(k)}">${l.icone} ${esc(l.curto)} (${fora[k]})</button>`;
    });
    nota.hidden = false;
    nota.innerHTML = achados
      ? `${achados} resultado${achados !== 1 ? 's' : ''} neste livro.` + (outros.length ? ' Também aparece em: ' + outros.join(' ') : '')
      : (outros.length
          ? `Nada aqui — mas aparece em: ${outros.join(' ')}`
          : 'Nenhuma ficha com esse termo em nenhum livro.');
  }

  // ── AÇÕES ────────────────────────────────────────────────────────
  function avisar(botao, html) {
    const info = botao.parentElement.querySelector('.npc-envio-info');
    if (!info) return;
    info.hidden = false;
    info.innerHTML = html;
    clearTimeout(info._timer);
    info._timer = setTimeout(() => { info.hidden = true; }, 6000);
  }

  function enviarParaCombate(botao) {
    const api = window.GA_Monstros;
    if (!api || typeof api.inserirFichaPronta !== 'function') {
      avisar(botao, 'A aba ⚔ Combates não carregou.');
      return;
    }
    const r = api.inserirFichaPronta(botao.dataset.fpLivro, botao.dataset.fpEnviar);
    if (!r) { avisar(botao, 'Não consegui montar esta ficha.'); return; }
    const extras = (r.aplicado && r.aplicado.length) ? ' — ' + esc(r.aplicado.join(' · ')) : '';
    avisar(botao, r.narrada
      ? `✓ <strong>${esc(r.nome)}</strong> entrou na cena narrada "${esc(r.cena)}"${extras}`
      : `✓ <strong>${esc(r.nome)}</strong> entrou em ${esc(r.sessao)} · ${esc(r.cena)} (aba ⚔ Combates)${extras}`);
  }

  function copiarTexto(botao) {
    const ref = ficha(botao.dataset.fpLivro, botao.dataset.fpCopiar);
    if (!ref) return;
    const txt = ref.def.texto;
    const ok = () => avisar(botao, '✓ statblock copiado.');
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(txt).then(ok, () => avisar(botao, 'Não consegui copiar.'));
    } else {
      const ta = document.createElement('textarea');
      ta.value = txt; document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); ok(); } catch (e) { avisar(botao, 'Não consegui copiar.'); }
      ta.remove();
    }
  }

  // ── INICIALIZAÇÃO ────────────────────────────────────────────────
  function init() {
    const cont = document.getElementById('fichas-prontas-content');
    if (!cont) return;                      // edição dos jogadores: nem existe

    try { render(); }
    catch (err) {
      console.error('[fichas-prontas] falha ao renderizar:', err);
      cont.innerHTML = `<div class="cr-erro"><strong>Erro ao montar a aba:</strong><br>${esc(err && err.message || err)}</div>`;
      return;
    }

    cont.addEventListener('click', e => {
      const aba = e.target.closest('[data-fp-livro-aba]');
      if (aba) { livroAtivo = aba.dataset.fpLivroAba; catAtiva = ''; render(); return; }
      const chip = e.target.closest('[data-fp-cat-chip]');
      if (chip) {
        catAtiva = chip.dataset.fpCatChip;
        cont.querySelectorAll('.fp-cat').forEach(b => b.classList.toggle('fp-cat--ativa', b === chip));
        aplicarFiltro(cont);
        return;
      }
      const env = e.target.closest('[data-fp-enviar]');
      if (env) { enviarParaCombate(env); return; }
      const cop = e.target.closest('[data-fp-copiar]');
      if (cop) { copiarTexto(cop); return; }
    });

    cont.addEventListener('input', e => {
      if (!e.target.classList || !e.target.classList.contains('fp-busca')) return;
      termo = e.target.value;
      aplicarFiltro(cont);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  return {
    LIVROS: LIVROS,
    livros: livros, livro: livro, ficha: ficha,
    categoriasDe: categoriasDe, comunsDe: comunsDe,
    ndValor: ndValor, todas: todas,
    // leva a aba até uma ficha específica (usado pelo bestiário)
    focar: function (livroChave, fichaChave) {
      livroAtivo = livroChave; catAtiva = ''; termo = '';
      render();
      const cont = document.getElementById('fichas-prontas-content');
      const alvo = cont && cont.querySelector('[data-fp-ficha="' + fichaChave + '"]');
      if (alvo) { alvo.open = true; alvo.scrollIntoView({ block: 'center' }); }
    },
  };
})();
