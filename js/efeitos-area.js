// ═══════════════════════════════════════════════════════════════════
//  EFEITOS-AREA.JS — o "lembrete guiado" dos efeitos em área na mesa
//  Carregado nas DUAS páginas, depois de iniciativa.js e ficha.js.
//
//  O QUE RESOLVE (pedido dele, 30/09/2026). Quando alguém lança uma magia
//  ou poder de ÁREA (Oração, Consagrar, Bênção…), marca quem está na área
//  e o efeito aparece na FICHA de cada afetado: "🔆 você está sob «Oração»
//  (de Aria): +1 em ataque, testes e resistência". Aliados recebem o bônus;
//  inimigos na área recebem o efeito CONTRÁRIO (Oração dá +1 aos aliados e
//  −2 aos inimigos). O jogador pode marcar até os NPCs que o mestre controla.
//
//  É "LEMBRETE GUIADO" (a escolha dele): o efeito é mostrado com todas as
//  letras na ficha de quem recebe, e as partes "por turno" entram no aviso
//  de início de turno que já existe. Os NÚMEROS o jogador aplica com os
//  Atributos Temporários e as Fontes de Defesa da ficha — a mesa não mexe
//  sozinha na conta de outro jogador.
//
//  ONDE MORA. Dentro de uma mesa → `mesas/<sala>/efeitosArea` no Firebase,
//  que TODO membro lê (o nó da mesa é de leitura pública). Fora de mesa (o
//  mestre jogando offline) → no localStorage deste navegador.
//
//  QUEM ESCREVE. O mestre escreve pela regra que já existe (`.write` do nó
//  da mesa é dele). O JOGADOR precisa de uma regra nova, pequena, no
//  console — está escrita em docs/efeitos-em-area.md. Sem ela, criar como
//  jogador dá "permission denied", que o módulo traduz num recado na tela.
//
//  QUEM CONSOME. A ficha (js/ficha.js) pergunta `paraFicha(f)` os efeitos
//  que miram AQUELA ficha e desenha o aviso; e registra `aoMudar` para
//  redesenhar quando a mesa muda. A lista de ALVOS do seletor vem do
//  GA_Iniciativa.combatentes() (a lista de combate).
// ═══════════════════════════════════════════════════════════════════
(function () {
  'use strict';

  const esc = window.GA_esc || (s => String(s == null ? '' : s));
  const semAcento = window.GA_semAcento || (s => String(s || '').toLowerCase());

  let mesa = null;                 // último estado do GA_Mesa
  let efeitos = {};                // id → efeito
  let ref = null, cb = null, salaLigada = '';
  let ouvintes = [];               // quem redesenha quando isto muda
  let ultimoErro = '';

  const LOCAL_KEY = 'grifosAlados.efeitosAreaLocal';

  // ── CONDIÇÃO PRONTA — o disparador do mestre (12/11/2026) ────────
  //  Preenche o formulário num clique com a Lista de Condições do T20
  //  (GA_CONDICOES, texto integral) e marca os JOGADORES como ⚔ inimigo
  //  (quem sofre); o mestre ajusta os alvos depois.
  //  REFORMA DE 25/11/2026 (pedido dele): saíram os três efeitos fixos
  //  (Oração, Bênção, Perdição — eram só exemplo e prendiam o painel a eles);
  //  no lugar, o campo "✨ Magia?" com as 254 magias do livro ou o que ele
  //  escrever. E a condição pronta NÃO preenche mais a duração ("cena"):
  //  quem decide quanto dura é o mestre.
  function catalogoCondicoes() {
    const C = window.GA_CONDICOES;
    if (!C || !Array.isArray(C.LISTA)) return [];
    return C.LISTA.map(c => ({ nome: c.nome, lado: 'contra', contra: c.texto, tipo: c.tipo || '' }));
  }
  //  O que o livro diz da magia escolhida, numa linha (só para consulta).
  function resumoMagia(m) {
    return [m.tipo && m.circulo ? m.tipo + ' ' + m.circulo + 'º círculo' : '',
            m.execucao ? 'execução: ' + m.execucao : '',
            m.alcance ? 'alcance: ' + m.alcance : '',
            m.duracao ? 'duração no livro: ' + m.duracao : ''].filter(Boolean).join(' · ');
  }

  function db() { return window.GA_Mesa ? window.GA_Mesa.db() : null; }
  function est() { return (window.GA_Mesa && window.GA_Mesa.estado) ? window.GA_Mesa.estado() : null; }
  function naMesa() { const e = est(); return !!(e && e.souMembro && e.mesaId); }
  function podeEscrever() { const e = est(); return !!(e && e.escreve); }
  function meuUid() { const e = est(); return (e && e.usuario) ? e.usuario.uid : ''; }
  function meuNome() {
    const e = est();
    return (e && e.usuario && (e.usuario.displayName || e.usuario.email)) || '';
  }
  function novoId() { return 'ea' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }

  function avisar() { ouvintes.forEach(fn => { try { fn(); } catch (e) {} }); }

  // ── ONDE OS EFEITOS MORAM ────────────────────────────────────────
  function base() { const e = est(); return 'mesas/' + e.mesaId + '/efeitosArea'; }
  function salvarLocal() {
    try { localStorage.setItem(LOCAL_KEY, JSON.stringify(efeitos)); } catch (e) {}
  }
  function carregarLocal() {
    try { efeitos = JSON.parse(localStorage.getItem(LOCAL_KEY) || '{}') || {}; }
    catch (e) { efeitos = {}; }
  }

  // ── ASSINATURA ───────────────────────────────────────────────────
  function desligar() {
    if (ref && cb) { try { ref.off('value', cb); } catch (e) {} }
    ref = null; cb = null; salaLigada = '';
  }
  function assinar() {
    const b = db();
    if (!naMesa() || !b) {
      // fora de mesa: a lista é a deste navegador (o mestre offline)
      desligar();
      if (salaLigada !== '@local') { salaLigada = '@local'; carregarLocal(); avisar(); }
      return;
    }
    const e = est();
    if (salaLigada === e.mesaId) return;
    desligar();
    salaLigada = e.mesaId;
    ref = b.ref(base());
    cb = ref.on('value', snap => {
      efeitos = snap.val() || {};
      avisar();
    }, err => {
      ultimoErro = (err && err.message) || '';
      console.warn('[efeitos-area] leitura:', ultimoErro);
    });
  }

  // ── ESCRITA ──────────────────────────────────────────────────────
  //  No banco quando numa mesa; no localStorage quando o mestre joga
  //  offline. O "permission denied" (jogador sem a regra nova) vira recado.
  function gravar(id, efeito, aoTerminar) {
    if (naMesa()) {
      const b = db();
      if (!b) { if (aoTerminar) aoTerminar('sem conexão'); return; }
      b.ref(base() + '/' + id).set(efeito)
        .then(() => { if (aoTerminar) aoTerminar(null); })
        .catch(e => {
          ultimoErro = e && e.message;
          console.warn('[efeitos-area] gravar:', ultimoErro);
          if (aoTerminar) aoTerminar(traduzErro(ultimoErro));
        });
      return;
    }
    efeitos[id] = efeito; salvarLocal(); avisar();
    if (aoTerminar) aoTerminar(null);
  }
  function remover(id) {
    if (naMesa()) {
      const b = db();
      if (b) b.ref(base() + '/' + id).remove()
        .catch(e => console.warn('[efeitos-area] remover:', e && e.message));
      return;
    }
    delete efeitos[id]; salvarLocal(); avisar();
  }
  function traduzErro(msg) {
    if (/permission|denied/i.test(msg || '')) {
      return 'O banco recusou: como jogador, criar efeito em área precisa de uma regra ' +
             'nova no Firebase — peça ao mestre. O mestre já consegue criar.';
    }
    return 'Não deu para salvar o efeito: ' + (msg || 'erro desconhecido') + '.';
  }

  // ── CASAR EFEITO ↔ FICHA ─────────────────────────────────────────
  //  Um alvo guarda fichaId, uid e nome. A ficha bate por qualquer um —
  //  o mesmo espírito frouxo do fichaDaLinha da iniciativa.
  function alvoBate(alvo, f) {
    if (!alvo || !f) return false;
    if (alvo.fichaId && alvo.fichaId === f.id) return true;
    const nf = semAcento(f.nome), nj = semAcento(f.jogador);
    const na = semAcento(alvo.nome);
    if (na && (na === nf || (nj && na === nj))) return true;
    if (alvo.uid && alvo.uid === meuUid() && na && na === nf) return true;
    return false;
  }
  //  Os efeitos que miram ESTA ficha, já resolvidos para o lado dela
  //  (aliado → o bônus; inimigo → o contrário).
  function paraFicha(f) {
    if (!f) return [];
    const saida = [];
    Object.keys(efeitos).forEach(id => {
      const ef = efeitos[id];
      if (!ef || !ef.alvos) return;
      let rel = '';
      Object.keys(ef.alvos).forEach(k => {
        const a = ef.alvos[k];
        if (a && a.rel && alvoBate(a, f)) rel = a.rel;
      });
      if (!rel) return;
      const texto = rel === 'inimigo' ? (ef.contrario || '') : (ef.bonus || '');
      saida.push({
        id: id, nome: ef.nome || 'efeito', de: ef.de || '', rel: rel,
        texto: texto, duracao: ef.duracao || '',
        // cura/dano por turno vale para qualquer um marcado (aliado ou
        // inimigo) — é uma zona que afeta quem está nela, não um bônus
        // de lado. Quem aplica é a PRÓPRIA ficha, no aviso do seu turno
        // (nunca escreve na ficha de outro — ver avisoDeTurno em ficha.js).
        porTurno: ef.porTurno || '', porTurnoTipo: ef.porTurnoTipo || '',
        souAutor: !!(ef.autorUid && ef.autorUid === meuUid()),
        criadoEm: ef.criadoEm || 0,
      });
    });
    return saida.sort((a, b) => (a.criadoEm || 0) - (b.criadoEm || 0));
  }

  //  Como o paraFicha, mas casando por NOME — para a CRIATURA, que não tem
  //  ficha para ler. As criaturas de uma cena têm nome único, e a iniciativa
  //  usa o mesmo nome, então o alvo marcado bate com o nome do card.
  function paraNome(nome) {
    if (!nome) return [];
    const alvo = semAcento(String(nome));
    const saida = [];
    Object.keys(efeitos).forEach(id => {
      const ef = efeitos[id];
      if (!ef || !ef.alvos) return;
      let rel = '';
      Object.keys(ef.alvos).forEach(k => {
        const a = ef.alvos[k];
        if (a && a.rel && a.nome && semAcento(String(a.nome)) === alvo) rel = a.rel;
      });
      if (!rel) return;
      saida.push({
        id: id, nome: ef.nome || 'efeito', de: ef.de || '', rel: rel,
        texto: rel === 'inimigo' ? (ef.contrario || '') : (ef.bonus || ''),
        duracao: ef.duracao || '', porTurno: ef.porTurno || '', porTurnoTipo: ef.porTurnoTipo || '',
        criadoEm: ef.criadoEm || 0,
      });
    });
    return saida.sort((a, b) => (a.criadoEm || 0) - (b.criadoEm || 0));
  }

  // ── O SELETOR / A OFICINA (o modal de criar) ─────────────────────
  function combatentes() {
    try { return (window.GA_Iniciativa && window.GA_Iniciativa.combatentes) ? window.GA_Iniciativa.combatentes() : []; }
    catch (e) { return []; }
  }
  //  Casa um alvo SALVO de um efeito ao combatente de AGORA (por ficha,
  //  uid ou nome) — os ids da iniciativa mudam quando o combate é remontado.
  function relDoAlvoSalvo(c, orig) {
    const alvos = (orig && orig.alvos) || {};
    if (alvos[c.id] && alvos[c.id].rel) return alvos[c.id].rel;
    for (const k in alvos) {
      const a = alvos[k];
      if (!a || !a.rel) continue;
      if (c.fichaId && a.fichaId && c.fichaId === a.fichaId) return a.rel;
      if (c.uid && a.uid && c.uid === a.uid) return a.rel;
      if (c.nome && semAcento(c.nome) === semAcento(a.nome || '')) return a.rel;
    }
    return 'fora';
  }
  //  A faixa "ativos agora" no alto da janela (sem o que está sendo editado).
  function htmlAtivos(exceto) {
    const ids = Object.keys(efeitos).filter(id => id !== exceto && efeitos[id])
      .sort((a, b) => (efeitos[b].criadoEm || 0) - (efeitos[a].criadoEm || 0));
    if (!ids.length) return '';
    return '<p class="ea-ativos-tit">Ativos agora</p><div class="ea-ativos-lista">' + ids.map(id => {
      const e = efeitos[id], alvos = Object.values(e.alvos || {});
      const al = alvos.filter(a => a && a.rel === 'aliado').length, ini = alvos.filter(a => a && a.rel === 'inimigo').length;
      return '<span class="ea-ativo"><span class="ea-ativo-nome">🔆 ' + esc(e.nome || 'efeito') + '</span>' +
        '<small>' + (e.de ? 'de ' + esc(e.de) + ' · ' : '') + (al ? '🛡 ' + al + ' ' : '') + (ini ? '⚔ ' + ini : '') +
        (e.duracao ? ' · ' + esc(e.duracao) : '') + '</small>' +
        '<button type="button" class="ea-ativo-bt" data-ea-editar="' + esc(id) + '" title="Editar — remarcar quem entrou ou saiu">✎</button>' +
        '<button type="button" class="ea-ativo-bt ea-ativo-bt--x" data-ea-tirar="' + esc(id) + '" title="Encerrar para todos">✕</button></span>';
    }).join('') + '</div>';
  }

  //  🔆 A FAIXA DA COLUNA (27/11/2026, pedido dele): como a do 🎯
  //  Controlador — na coluna flutuante, abre a janela no meio da tela. Só
  //  aparece para quem manda na iniciativa (o botão saiu de dentro dela).
  let lanc = null;
  function pintarLancador() {
    const pode = !!(window.GA_Iniciativa && window.GA_Iniciativa.mando && window.GA_Iniciativa.mando());
    if (!pode) { if (lanc && lanc.parentNode) lanc.remove(); return; }
    if (!lanc) {
      lanc = document.createElement('button');
      lanc.type = 'button'; lanc.id = 'gaEfeitosLanc'; lanc.className = 'ga-lanc ga-lanc--efeito';
      lanc.title = 'Disparar um efeito em área (magia, poder ou condição) e marcar quem está sob ele';
      lanc.addEventListener('click', () => abrirCriar());
    }
    if (!lanc.parentNode) {
      const col = window.GA_ColunaMesa ? window.GA_ColunaMesa() : document.body;
      const rol = document.getElementById('gaRolagens');
      if (rol && rol.parentNode === col) col.insertBefore(lanc, rol); else col.appendChild(lanc);
    }
    const n = Object.keys(efeitos).length;
    const html = '<span class="ga-lanc-ico" aria-hidden="true">🔆</span><span class="ga-lanc-tit">Efeito / condição</span>' +
      (n ? '<span class="ga-lanc-selo" title="Efeitos ativos agora">' + n + '</span>' : '') +
      '<span class="ga-lanc-abre" aria-hidden="true">⤢</span>';
    if (lanc.innerHTML !== html) lanc.innerHTML = html;
  }
  ouvintes.push(pintarLancador);
  setInterval(pintarLancador, 2000);

  //  `f` = ficha de quem lança (opcional). `efeitoId` REABRE um efeito já
  //  ativo para editar — inclusive remarcar quem entrou/saiu da área (#2).
  function abrirCriar(f, efeitoId) {
    if (!window.GA_abrirModal) return;
    const orig = (efeitoId && efeitos[efeitoId]) ? efeitos[efeitoId] : null;
    const editando = !!orig;
    const lista = combatentes();
    const deInicial = (orig && orig.de) || (f && f.nome) || meuNome() || 'alguém';
    const onIf = (c) => c ? ' ea-on' : '';

    const linhasAlvos = lista.length ? lista.map(c => {
      const rel0 = editando ? relDoAlvoSalvo(c, orig)
        : (f && ((c.fichaId && c.fichaId === f.id) || (semAcento(c.nome) === semAcento(f.nome))) ? 'aliado' : 'fora');
      return `
        <div class="ea-alvo" data-id="${esc(c.id)}" data-nome="${esc(c.nome)}"
             data-ficha="${esc(c.fichaId)}" data-uid="${esc(c.uid)}" data-tipo="${esc(c.tipo)}">
          <span class="ea-alvo-nome">${c.tipo === 'jogador' ? '🧑 ' : '👹 '}${esc(c.nome)}</span>
          <span class="ea-alvo-rel">
            <button type="button" class="ea-rel ea-rel--fora${onIf(rel0 === 'fora')}" data-rel="fora">— fora</button>
            <button type="button" class="ea-rel ea-rel--aliado${onIf(rel0 === 'aliado')}" data-rel="aliado">🛡 aliado</button>
            <button type="button" class="ea-rel ea-rel--inimigo${onIf(rel0 === 'inimigo')}" data-rel="inimigo">⚔ inimigo</button>
          </span>
        </div>`;
    }).join('') : `<p class="ea-vazio">Nenhum combatente na lista de agora. Monte a iniciativa no
        Painel de combate (⚔) para escolher os alvos — ou crie o efeito assim mesmo e marque os
        alvos quando o combate começar.</p>`;

    //  As condições prontas (o índice no array é o `value` da opção, que o
    //  handler usa de volta) e a lista das magias do livro para o "✨ Magia?".
    const conds = catalogoCondicoes();
    const prontos = conds;
    const magias = Array.isArray(window.GA_MAGIAS) ? window.GA_MAGIAS : [];
    const magiaInicial = editando ? (orig.magia || '') : '';

    const overlay = window.GA_abrirModal(`
      <div class="ga-modal-cab">
        <span>${editando ? '✎ Editar efeito' : '🔆 Efeitos e condições'}</span>
        <button type="button" class="ga-modal-x" data-ga-fechar aria-label="Fechar">✕</button>
      </div>
      <p class="ea-sub">${editando ? 'Mude o que quiser — inclusive quem entrou ou saiu da área.'
        : 'Uma magia, um poder ou uma condição: escolha o que é, o que faz e quem está sob ele. Aparece sozinho na ficha de cada afetado.'}</p>
      <div class="ea-ativos" id="eaAtivos">${htmlAtivos(efeitoId)}</div>
      <div class="ea-form">
       <div class="ea-grade">
        <div class="ea-col">
        <div class="ea-bloco">
          <p class="ea-bloco-tit"><span class="ea-num">1</span> O que é</p>
        <label class="ea-campo"><span>✨ Magia? <em>(opcional — escolha da lista ou escreva; vira o nome do efeito)</em></span>
          <input type="text" id="eaMagia" list="eaMagiasLista" value="${esc(magiaInicial)}" placeholder="digite ou escolha da lista" autocomplete="off">
          <datalist id="eaMagiasLista">${magias.map(m => `<option value="${esc(m.nome)}">`).join('')}</datalist>
          <small class="ea-magia-dica" id="eaMagiaDica" hidden></small></label>
        <div class="ea-campo">
          <span>🌀 Condição pronta <em>(opcional — um clique preenche o efeito e marca os jogadores)</em></span>
          <input type="search" id="eaCondBusca" class="ea-cond-busca" placeholder="🔍 procurar condição (ex.: chamas, medo, cego)" autocomplete="off">
          <div class="ea-conds" id="eaConds">${conds.map((p, i) => {
            const T = ((window.GA_CONDICOES && window.GA_CONDICOES.TIPOS) || []).find(x => x.chave === p.tipo);
            return `<button type="button" class="ea-cond" data-pronto="${i}" data-busca="${esc(semAcento(p.nome + ' ' + (T ? T.nome : '')))}"
              title="${esc(p.contra || '')}" style="--tipo:${T ? T.cor : 'var(--ink-faded)'}">${esc(p.nome)}${T ? '<small>' + esc(T.nome) + '</small>' : ''}</button>`;
          }).join('')}</div>
        </div>
        <label class="ea-campo"><span>Nome do efeito</span>
          <input type="text" id="eaNome" value="${esc(editando ? orig.nome : (f && f._efeitoNome || ''))}" placeholder="o nome da magia ou do poder" autocomplete="off"></label>
        </div>
        <div class="ea-bloco">
          <p class="ea-bloco-tit"><span class="ea-num">2</span> O que faz</p>
        <div class="ea-campo ea-montar">
          <span>🔧 Montar o efeito <em>(opcional — escolha o quanto e o que afeta; preenche os campos abaixo)</em></span>
          <div class="ea-montar-linha">
            <span class="ea-montar-val">
              <button type="button" class="ea-mstep" data-mstep="-1" title="Diminuir">−</button>
              <input type="number" id="eaMval" value="0" step="1" inputmode="numeric" aria-label="Valor do efeito">
              <button type="button" class="ea-mstep" data-mstep="1" title="Aumentar">+</button>
            </span>
            <span class="ea-montar-chips">
              <button type="button" class="ea-chip" data-alc="pericias">Perícias</button>
              <button type="button" class="ea-chip" data-alc="ataquedano">Ataque e dano</button>
              <button type="button" class="ea-chip" data-alc="defesa">Defesa</button>
              <button type="button" class="ea-chip" data-alc="resist">Resistências</button>
            </span>
          </div>
        </div>
        <label class="ea-campo"><span>O que os aliados ganham</span>
          <input type="text" id="eaBonus" value="${esc(editando ? (orig.bonus || '') : (f && f._efeitoBonus || ''))}" placeholder="ex.: +1 em ataque e dano" autocomplete="off"></label>
        <label class="ea-campo"><span>O que os inimigos sofrem <em>(opcional — o efeito contrário)</em></span>
          <input type="text" id="eaContra" value="${esc(editando ? (orig.contrario || '') : '')}" placeholder="ex.: −1 em ataque e dano" autocomplete="off"></label>
          <div class="ea-lado">
        <label class="ea-campo ea-campo--curto"><span>Duração <em>(opcional)</em></span>
          <input type="text" id="eaDur" value="${esc(editando ? (orig.duracao || '') : '')}" placeholder="ex.: 3 rodadas" autocomplete="off"></label>
        <div class="ea-campo">
          <span>Cura ou dano por turno <em>(opcional — vira um 🎲 no aviso de início de turno de quem recebe)</em></span>
          <div class="ea-turno-linha">
            <input type="text" id="eaPorTurno" value="${esc(editando ? (orig.porTurno || '') : '')}" placeholder="1d6" inputmode="text" autocomplete="off">
            <button type="button" class="ea-rel ea-rel--cura${onIf(editando && orig.porTurnoTipo === 'cura')}" data-turno-tipo="cura" title="Cura por turno">💚 cura</button>
            <button type="button" class="ea-rel ea-rel--dano${onIf(editando && orig.porTurnoTipo === 'dano')}" data-turno-tipo="dano" title="Dano por turno">💥 dano</button>
          </div>
        </div>
          </div>
        </div>
        </div>
        <div class="ea-col">
        <div class="ea-bloco ea-bloco--alvos">
          <p class="ea-bloco-tit"><span class="ea-num">3</span> Quem está na área</p>
        <p class="ea-de">De <strong>${esc(deInicial)}</strong></p>
        <div class="ea-alvos-cab">
          <span></span>
          ${lista.length ? `
            <span class="ea-marcar-todos">
              <button type="button" class="ea-rel-todos" data-marcar="aliado" title="Marca todo mundo da lista como aliado de uma vez">🛡 todos aliados</button>
              <button type="button" class="ea-rel-todos" data-marcar="inimigo" title="Marca todo mundo da lista como inimigo de uma vez">⚔ todos inimigos</button>
              <button type="button" class="ea-rel-todos" data-marcar="fora" title="Desmarca todo mundo">— todos fora</button>
            </span>` : ''}
        </div>
        <div class="ea-alvos" id="eaAlvos">${linhasAlvos}</div>
        </div>
        </div>
       </div>
        <p class="ea-recado" id="eaRecado" hidden></p>
        <div class="ga-modal-acoes ea-pe">
          <button type="button" class="ga-btn-sec" data-ga-fechar>Cancelar</button>
          <button type="button" class="ga-btn-principal" id="eaCriar">${editando ? '💾 Salvar alterações' : '🔆 Criar efeito'}</button>
        </div>
      </div>`);

    const caixaEa = overlay.querySelector('.ga-modal');
    if (caixaEa) caixaEa.classList.add('ea-modal');

    // os três botões de relação por combatente (um aceso por vez)
    overlay.querySelectorAll('.ea-alvo').forEach(row => {
      row.querySelectorAll('.ea-rel').forEach(btn => {
        btn.addEventListener('click', () => {
          row.querySelectorAll('.ea-rel').forEach(b => b.classList.remove('ea-on'));
          btn.classList.add('ea-on');
        });
      });
    });
    // "marcar todos": o mesmo clique que ele daria em cada linha, só que
    // em todas de uma vez — pensado pra Oração em 9 combatentes sem
    // precisar clicar linha por linha. Não distingue jogador de criatura:
    // as duas entram igual, porque um NPC também pode ser aliado.
    overlay.querySelectorAll('.ea-rel-todos').forEach(btn => {
      btn.addEventListener('click', () => {
        const rel = btn.dataset.marcar;
        overlay.querySelectorAll('.ea-alvo').forEach(row => {
          row.querySelectorAll('.ea-rel').forEach(b => {
            b.classList.toggle('ea-on', b.dataset.rel === rel);
          });
        });
      });
    });
    // cura OU dano por turno — nunca os dois; clicar no já aceso desliga
    // (volta a ser "sem efeito por turno", o padrão)
    const turnoBtns = overlay.querySelectorAll('[data-turno-tipo]');
    turnoBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const jaOn = btn.classList.contains('ea-on');
        turnoBtns.forEach(b => b.classList.remove('ea-on'));
        if (!jaOn) btn.classList.add('ea-on');
      });
    });

    // o cardápio pronto: preenche nome/efeito/duração e já marca os
    // JOGADORES no lado padrão (buff → aliado; penalidade/condição →
    // inimigo). As criaturas ficam como estão — o mestre as marca à mão.
    //  ✨ MAGIA? — escolhida da lista (as 254 do livro) ou escrita à mão.
    //  Vira o nome do efeito enquanto o mestre não escrever outro nome, e a
    //  linha de baixo mostra o que o livro diz dela. A duração NÃO é
    //  preenchida: fica só citada ("duração no livro"), quem decide é ele.
    const campoMagia = overlay.querySelector('#eaMagia');
    const campoNome = overlay.querySelector('#eaNome');
    let nomeDaMagia = !!(magiaInicial && campoNome.value === magiaInicial);
    function aoEscolherMagia() {
      const txt = (campoMagia.value || '').trim();
      if (!campoNome.value.trim() || nomeDaMagia) { campoNome.value = txt; nomeDaMagia = !!txt; }
      const m = magias.find(x => semAcento(x.nome) === semAcento(txt));
      const dica = overlay.querySelector('#eaMagiaDica');
      dica.hidden = !m;
      dica.textContent = m ? '📖 ' + resumoMagia(m) : '';
    }
    if (campoMagia) {
      campoMagia.addEventListener('input', aoEscolherMagia);
      campoNome.addEventListener('input', () => { nomeDaMagia = false; });
      if (magiaInicial) aoEscolherMagia();
    }

    const busca = overlay.querySelector('#eaCondBusca');
    if (busca) busca.addEventListener('input', () => {
      const q = semAcento(busca.value.trim());
      overlay.querySelectorAll('.ea-cond').forEach(b => { b.hidden = !!q && b.dataset.busca.indexOf(q) < 0; });
    });
    overlay.querySelectorAll('.ea-cond').forEach(btn => btn.addEventListener('click', () => {
      const p = prontos[parseInt(btn.dataset.pronto, 10)];
      if (!p) return;
      overlay.querySelectorAll('.ea-cond').forEach(b => b.classList.toggle('ea-on', b === btn));
      overlay.querySelector('#eaNome').value = p.nome || '';
      nomeDaMagia = false;              // o nome agora é o da condição
      overlay.querySelector('#eaBonus').value = p.bonus || '';
      overlay.querySelector('#eaContra').value = p.contra || '';
      const relPad = p.lado === 'bonus' ? 'aliado' : 'inimigo';
      overlay.querySelectorAll('.ea-alvo').forEach(row => {
        if (row.dataset.tipo !== 'jogador') return;
        row.querySelectorAll('.ea-rel').forEach(b => b.classList.toggle('ea-on', b.dataset.rel === relPad));
      });
    }));

    //  os efeitos ATIVOS no alto: ✎ reabre aquele, ✕ encerra para todos;
    //  a faixa se redesenha sozinha quando a mesa muda
    overlay.querySelector('#eaAtivos').addEventListener('click', e => {
      const ed = e.target.closest('[data-ea-editar]');
      if (ed) { overlay._fechar(); abrirCriar(null, ed.dataset.eaEditar); return; }
      const x = e.target.closest('[data-ea-tirar]');
      if (x) {
        const ef = efeitos[x.dataset.eaTirar];
        if (!window.confirm('Encerrar «' + ((ef && ef.nome) || 'efeito') + '» para todos?')) return;
        remover(x.dataset.eaTirar);
      }
    });
    const repintarAtivos = () => {
      if (!overlay.isConnected) { ouvintes = ouvintes.filter(fn => fn !== repintarAtivos); return; }
      const el = overlay.querySelector('#eaAtivos'); if (el) el.innerHTML = htmlAtivos(efeitoId);
    };
    ouvintes.push(repintarAtivos);

    // o COMPOSITOR 🔧: o valor (±) e os alcances montam os dois campos de
    // texto (como o painel ⚡ "O que está me afetando agora" da ficha).
    const ROT_ALC = { pericias: 'perícias', ataquedano: 'ataque e dano', defesa: 'Defesa', resist: 'testes de resistência' };
    function recomporEfeito() {
      const ons = Array.from(overlay.querySelectorAll('.ea-chip.ea-on')).map(c => c.dataset.alc);
      if (!ons.length) return;
      const v = parseInt(overlay.querySelector('#eaMval').value, 10) || 0;
      const txt = ons.map(k => ROT_ALC[k]).filter(Boolean).join(', ');
      const mag = Math.abs(v);
      overlay.querySelector('#eaBonus').value = (v < 0 ? '−' : '+') + mag + ' em ' + txt;
      overlay.querySelector('#eaContra').value = (v < 0 ? '+' : '−') + mag + ' em ' + txt;
    }
    overlay.querySelectorAll('.ea-chip').forEach(ch => ch.addEventListener('click', () => {
      ch.classList.toggle('ea-on'); recomporEfeito();
    }));
    overlay.querySelectorAll('.ea-mstep').forEach(b => b.addEventListener('click', () => {
      const inp = overlay.querySelector('#eaMval');
      inp.value = (parseInt(inp.value, 10) || 0) + (parseInt(b.dataset.mstep, 10) || 0);
      recomporEfeito();
    }));
    const mval = overlay.querySelector('#eaMval');
    if (mval) mval.addEventListener('input', recomporEfeito);

    overlay.querySelector('#eaCriar').addEventListener('click', () => {
      const nome = (overlay.querySelector('#eaNome').value || '').trim();
      const bonus = (overlay.querySelector('#eaBonus').value || '').trim();
      const contra = (overlay.querySelector('#eaContra').value || '').trim();
      const dur = (overlay.querySelector('#eaDur').value || '').trim();
      const turnoOn = overlay.querySelector('[data-turno-tipo].ea-on');
      const porTurnoTxt = (overlay.querySelector('#eaPorTurno').value || '').trim();
      const recado = overlay.querySelector('#eaRecado');
      if (!nome) { recado.hidden = false; recado.textContent = 'Dê um nome ao efeito.'; return; }
      // cura/dano por turno é tudo ou nada: dado sem tipo (ou tipo sem
      // dado) não quer dizer nada — e um dado digitado errado ("1d") só
      // seria descoberto no MEIO do combate, quando alguém tentasse rolar
      if (porTurnoTxt && !turnoOn) {
        recado.hidden = false; recado.textContent = 'Escolheu o dado de cura/dano por turno — falta marcar "💚 cura" ou "💥 dano".';
        return;
      }
      if (turnoOn && !porTurnoTxt) {
        recado.hidden = false; recado.textContent = 'Marcou cura/dano por turno — falta o dado (ex.: 1d6).';
        return;
      }
      if (porTurnoTxt && window.GA_Dados) {
        try { window.GA_Dados.avaliar(porTurnoTxt); }
        catch (e) { recado.hidden = false; recado.textContent = 'Dado de cura/dano por turno inválido: ' + (e && e.message || porTurnoTxt); return; }
      }
      let alvos = {};
      let algum = false;
      overlay.querySelectorAll('.ea-alvo').forEach(row => {
        const on = row.querySelector('.ea-rel.ea-on');
        const rel = on ? on.dataset.rel : 'fora';
        if (rel === 'fora') return;
        algum = true;
        alvos[row.dataset.id] = {
          rel: rel, nome: row.dataset.nome || '',
          fichaId: row.dataset.ficha || '', uid: row.dataset.uid || '',
        };
      });
      // editando SEM combatentes na lista de agora: não há como remarcar, e
      // reconstruir do vazio apagaria quem já estava na área — então preserva.
      if (editando && !lista.length) { alvos = orig.alvos || {}; algum = Object.keys(alvos).length > 0; }
      if (!algum && lista.length) {
        recado.hidden = false; recado.textContent = 'Marque quem está na área (pelo menos um aliado ou inimigo).';
        return;
      }
      const id = editando ? efeitoId : novoId();
      const efeito = {
        nome: nome, bonus: bonus, contrario: contra, duracao: dur,
        magia: ((overlay.querySelector('#eaMagia') || {}).value || '').trim(),
        porTurno: porTurnoTxt, porTurnoTipo: turnoOn ? turnoOn.dataset.turnoTipo : '',
        de: editando ? (orig.de || deInicial) : deInicial,
        autorUid: editando ? (orig.autorUid || meuUid()) : meuUid(),
        alvos: alvos, criadoEm: editando ? (orig.criadoEm || Date.now()) : Date.now(),
      };
      gravar(id, efeito, err => {
        if (err) { recado.hidden = false; recado.textContent = err; return; }
        overlay._fechar();
      });
    });
  }

  // ── API ──────────────────────────────────────────────────────────
  window.GA_EfeitosArea = {
    abrirCriar: abrirCriar,
    remover: remover,
    paraFicha: paraFicha,
    paraNome: paraNome,
    ativos: function () { return Object.assign({}, efeitos); },
    aoMudar: function (fn) { if (typeof fn === 'function') ouvintes.push(fn); },
  };

  // ── INÍCIO (a mesma dança dos `defer` dos vizinhos) ──────────────
  function init(segundaChance) {
    if (window.GA_Mesa) {
      window.GA_Mesa.aoMudar(function (e) { mesa = e; assinar(); });
      return;
    }
    if (!segundaChance && document.readyState !== 'complete') {
      document.addEventListener('DOMContentLoaded', function () { init(true); }, { once: true });
      return;
    }
    // sem mesa neste site: só a lista local (o mestre offline)
    carregarLocal(); avisar();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => init(false));
  else init(false);
})();
