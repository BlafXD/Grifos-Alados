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
      return 'O banco recusou: como jogador, criar efeito em área precisa da regra nova no ' +
             'Firebase (peça ao mestre — está em docs/efeitos-em-area.md). O mestre já consegue criar.';
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

  // ── O SELETOR / A OFICINA (o modal de criar) ─────────────────────
  function combatentes() {
    try { return (window.GA_Iniciativa && window.GA_Iniciativa.combatentes) ? window.GA_Iniciativa.combatentes() : []; }
    catch (e) { return []; }
  }
  //  `f` é a ficha de quem está lançando (opcional): dá o nome do
  //  personagem para o "de", e marca ele como aliado por padrão.
  function abrirCriar(f) {
    if (!window.GA_abrirModal) return;
    const lista = combatentes();
    const deInicial = (f && f.nome) || meuNome() || 'alguém';

    const linhasAlvos = lista.length ? lista.map(c => {
      const meu = f && ((c.fichaId && c.fichaId === f.id) || (semAcento(c.nome) === semAcento(f.nome)));
      return `
        <div class="ea-alvo" data-id="${esc(c.id)}" data-nome="${esc(c.nome)}"
             data-ficha="${esc(c.fichaId)}" data-uid="${esc(c.uid)}">
          <span class="ea-alvo-nome">${c.tipo === 'jogador' ? '🧑 ' : '👹 '}${esc(c.nome)}</span>
          <span class="ea-alvo-rel">
            <button type="button" class="ea-rel ea-rel--fora ea-on" data-rel="fora">— fora</button>
            <button type="button" class="ea-rel ea-rel--aliado${meu ? '' : ''}" data-rel="aliado">🛡 aliado</button>
            <button type="button" class="ea-rel ea-rel--inimigo" data-rel="inimigo">⚔ inimigo</button>
          </span>
        </div>`;
    }).join('') : `<p class="ea-vazio">Nenhum combatente na lista de agora. Monte a iniciativa no
        Painel de combate (⚔) para escolher os alvos — ou crie o efeito assim mesmo e marque os
        alvos quando o combate começar.</p>`;

    const overlay = window.GA_abrirModal(`
      <div class="ga-modal-cab">
        <span>🔆 Novo efeito em área</span>
        <button type="button" class="ga-modal-x" data-ga-fechar aria-label="Fechar">✕</button>
      </div>
      <div class="ea-form">
        <label class="ea-campo"><span>Nome do efeito</span>
          <input type="text" id="eaNome" value="${esc(f && f._efeitoNome || '')}" placeholder="Oração, Bênção, Consagrar…" autocomplete="off"></label>
        <label class="ea-campo"><span>O que os aliados ganham</span>
          <input type="text" id="eaBonus" value="${esc(f && f._efeitoBonus || '')}" placeholder="+1 em ataque, testes de perícia e resistência" autocomplete="off"></label>
        <label class="ea-campo"><span>O que os inimigos sofrem <em>(opcional — o efeito contrário)</em></span>
          <input type="text" id="eaContra" placeholder="−1 em ataque, testes e resistência" autocomplete="off"></label>
        <label class="ea-campo ea-campo--curto"><span>Duração <em>(opcional)</em></span>
          <input type="text" id="eaDur" placeholder="cena, 5 rodadas, sustentada…" autocomplete="off"></label>
        <div class="ea-campo">
          <span>Cura ou dano por turno <em>(opcional — vira um 🎲 no aviso de início de turno de quem recebe)</em></span>
          <div class="ea-turno-linha">
            <input type="text" id="eaPorTurno" placeholder="1d6" inputmode="text" autocomplete="off">
            <button type="button" class="ea-rel ea-rel--cura" data-turno-tipo="cura" title="Cura por turno">💚 cura</button>
            <button type="button" class="ea-rel ea-rel--dano" data-turno-tipo="dano" title="Dano por turno">💥 dano</button>
          </div>
        </div>
        <p class="ea-de">De <strong>${esc(deInicial)}</strong></p>
        <div class="ea-alvos-cab">
          <span>Quem está na área</span>
          ${lista.length ? `
            <span class="ea-marcar-todos">
              <button type="button" class="ea-rel-todos" data-marcar="aliado" title="Marca todo mundo da lista como aliado de uma vez">🛡 todos aliados</button>
              <button type="button" class="ea-rel-todos" data-marcar="inimigo" title="Marca todo mundo da lista como inimigo de uma vez">⚔ todos inimigos</button>
              <button type="button" class="ea-rel-todos" data-marcar="fora" title="Desmarca todo mundo">— todos fora</button>
            </span>` : ''}
        </div>
        <div class="ea-alvos" id="eaAlvos">${linhasAlvos}</div>
        <p class="ea-recado" id="eaRecado" hidden></p>
        <div class="ga-modal-acoes">
          <button type="button" class="ga-btn-sec" data-ga-fechar>Cancelar</button>
          <button type="button" class="ga-btn-principal" id="eaCriar">🔆 Criar efeito</button>
        </div>
      </div>`);

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
      const alvos = {};
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
      if (!algum && lista.length) {
        recado.hidden = false; recado.textContent = 'Marque quem está na área (pelo menos um aliado ou inimigo).';
        return;
      }
      const id = novoId();
      const efeito = {
        nome: nome, bonus: bonus, contrario: contra, duracao: dur,
        porTurno: porTurnoTxt, porTurnoTipo: turnoOn ? turnoOn.dataset.turnoTipo : '',
        de: deInicial, autorUid: meuUid(), alvos: alvos, criadoEm: Date.now(),
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
