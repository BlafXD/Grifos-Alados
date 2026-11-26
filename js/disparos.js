// ═══════════════════════════════════════════════════════════════════
//  DISPAROS.JS — 🎯 o controlador do mestre e o ✨ disparo para aliados
//  (25/11/2026, pedido dele). Carregado nas DUAS páginas.
//
//  O QUE ISTO FAZ. O mestre escolhe quem, qual teste (perícia ou atributo)
//  e a CD — secreta ou revelada — e na tela de cada jogador aparece um
//  pop-up com o dado e o bônus DA FICHA dele, um campo para somar ajuda
//  (uma magia, um aliado) e o 🎲. O resultado volta para o mestre, que
//  dispara, num clique, o dano (total ou metade, com o tipo) ou a condição
//  em quem falhou. O jogador também dispara para um aliado: cura ou bônus,
//  que o aliado ACEITA antes de entrar na ficha dele.
//
//  ONDE MORA. `mesas/<sala>/disparos/<uid>/<id>` — uma caixa por pessoa: o
//  jogador lê só a dele; o mestre e o auxiliar leem todas. A CD secreta NÃO
//  vai junto: mora em `mesas/<sala>/disparosCd/<id>`, que só o mestre lê
//  (no banco, quem lê um nó lê tudo o que está embaixo dele).
//
//  QUEM ESCREVE A FICHA. Sempre o dono, na página dele: o dano e a
//  condição que o mestre dispara chegam à caixa do jogador e a ficha
//  daquele aparelho aplica sozinha (GA_Ficha.aplicarDeFora); o que um
//  aliado manda espera o "Aceitar". Ninguém escreve a ficha de outro.
// ═══════════════════════════════════════════════════════════════════
(function () {
  'use strict';
  const esc = window.GA_esc;
  const VALIDADE_MS = 6 * 60 * 60 * 1000;   // pedido de mais de 6 h atrás não abre pop-up
  const TIPOS_DANO = ['ácido', 'corte', 'eletricidade', 'essência', 'fogo', 'frio', 'impacto',
                      'luz', 'perfuração', 'psíquico', 'trevas'];

  let mesa = null;
  let refMinha = null, cbMinha = null, ligadaMinha = '';
  let refTodas = null, cbTodas = null, refCds = null, cbCds = null, ligadaTodas = '';
  let caixa = {};      // id → disparo   (a MINHA caixa)
  let todas = {};      // uid → { id → disparo }   (só mestre/auxiliar)
  let cds = {};        // id → { cd }   (só mestre/auxiliar)
  const tratados = new Set();   // ids que esta página já mostrou/aplicou
  const ouvintes = [];

  function db() { return window.GA_Mesa ? window.GA_Mesa.db() : null; }
  function sala() { return (mesa && mesa.mesaId) || ''; }
  function meuUid() { return (mesa && mesa.usuario && mesa.usuario.uid) || ''; }
  function meuNome() { const u = mesa && mesa.usuario; return (u && (u.displayName || String(u.email || '').split('@')[0])) || 'alguém'; }
  function naMesa() { return !!(mesa && mesa.souMembro && sala() && db()); }
  function mando() { return naMesa() && !!mesa.transmite; }
  function escreve() { return naMesa() && !!mesa.escreve; }
  function base() { return 'mesas/' + sala() + '/disparos'; }
  function carimbo() {
    return (typeof firebase !== 'undefined' && firebase.database && firebase.database.ServerValue)
      ? firebase.database.ServerValue.TIMESTAMP : Date.now();
  }
  function novoId() { return 'd' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
  function avisar() { ouvintes.forEach(fn => { try { fn(); } catch (e) {} }); }
  function rolarD20() { return window.GA_Dados ? window.GA_Dados.rolar(20) : 1 + Math.floor(Math.random() * 20); }
  function d20Html(v) { return window.GA_Dados && window.GA_Dados.formatarD20 ? window.GA_Dados.formatarD20(v) : String(v); }
  function sinal(n) { return (n < 0 ? '−' : '+') + Math.abs(n); }

  // ── O CATÁLOGO DE TESTES (perícias e atributos da ficha) ───────────
  function catalogo() {
    const D = window.GA_FichaData || {};
    return {
      pericias: (D.PERICIAS || []).map(p => ({ tipo: 'pericia', chave: p.chave, rotulo: p.nome })),
      atributos: (D.ATRIBUTOS || []).map(a => ({ tipo: 'atributo', chave: a.chave, rotulo: a.nome })),
    };
  }
  function acharTeste(valor) {
    const c = catalogo();
    return c.pericias.concat(c.atributos).find(t => t.tipo + ':' + t.chave === valor) || null;
  }

  // ═══ ESCUTAS ══════════════════════════════════════════════════════
  function desligar() {
    if (refMinha && cbMinha) { try { refMinha.off('value', cbMinha); } catch (e) {} }
    if (refTodas && cbTodas) { try { refTodas.off('value', cbTodas); } catch (e) {} }
    if (refCds && cbCds) { try { refCds.off('value', cbCds); } catch (e) {} }
    refMinha = cbMinha = refTodas = cbTodas = refCds = cbCds = null;
    ligadaMinha = ligadaTodas = '';
    caixa = {}; todas = {}; cds = {};
  }
  function ligar() {
    const b = db();
    if (!naMesa() || !b || !meuUid()) { if (ligadaMinha || ligadaTodas) desligar(); return; }
    const assinatura = sala() + '|' + meuUid();
    if (ligadaMinha !== assinatura) {
      if (refMinha && cbMinha) { try { refMinha.off('value', cbMinha); } catch (e) {} }
      ligadaMinha = assinatura;
      const ref = refMinha = b.ref(base() + '/' + meuUid());
      cbMinha = ref.on('value', snap => {
        if (refMinha !== ref) return;
        caixa = snap.val() || {};
        tratarMinhaCaixa();
        avisar();
      }, err => console.warn('[disparos] minha caixa:', err && err.message));
    }
    const assinaturaM = mando() ? assinatura : '';
    if (ligadaTodas !== assinaturaM) {
      if (refTodas && cbTodas) { try { refTodas.off('value', cbTodas); } catch (e) {} }
      if (refCds && cbCds) { try { refCds.off('value', cbCds); } catch (e) {} }
      refTodas = cbTodas = refCds = cbCds = null; todas = {}; cds = {};
      ligadaTodas = assinaturaM;
      if (assinaturaM) {
        const r1 = refTodas = b.ref(base());
        cbTodas = r1.on('value', snap => { if (refTodas !== r1) return; todas = snap.val() || {}; avisar(); },
          err => console.warn('[disparos] caixas da mesa:', err && err.message));
        const r2 = refCds = b.ref('mesas/' + sala() + '/disparosCd');
        cbCds = r2.on('value', snap => { if (refCds !== r2) return; cds = snap.val() || {}; avisar(); },
          err => console.warn('[disparos] CDs:', err && err.message));
      }
    }
  }

  // ═══ O LADO DO JOGADOR: a caixa que chega ═════════════════════════
  const abertos = {};   // id → cartão na tela (para sumir se outra aba responder)
  function recente(d) { return !d.em || typeof d.em !== 'number' || (Date.now() - d.em) < VALIDADE_MS; }
  function tratarMinhaCaixa() {
    Object.keys(caixa).forEach(id => {
      const d = caixa[id];
      if (!d || typeof d !== 'object' || tratados.has(id)) return;
      if (d.tipo === 'rolagem' && !d.resposta && recente(d)) { tratados.add(id); popupRolagem(id, d); }
      else if (d.tipo === 'aplicar' && !d.aplicado && recente(d)) { tratados.add(id); aplicarDoMestre(id, d); }
      else if (d.tipo === 'efeito' && !d.resposta && recente(d)) { tratados.add(id); popupEfeito(id, d); }
    });
    //  Respondido em OUTRA aba (ou apagado pelo mestre): o cartão daqui some.
    Object.keys(abertos).forEach(id => {
      const c = abertos[id], d = caixa[id];
      if (c._respondiAqui) return;
      if (!d || d.resposta || d.aplicado) { fecharCartao(c); delete abertos[id]; }
    });
  }
  //  REIVINDICAR, não só escrever: com a página aberta em duas abas (ou no
  //  celular e no computador), as duas recebem o mesmo pedido. A transação
  //  deixa só a PRIMEIRA gravar — e só quem gravou rola/aplica. Sem isto, o
  //  dano do mestre entraria duas vezes na ficha.
  function reivindicar(id, campo, valor) {
    const b = db(); if (!b) return Promise.resolve(false);
    return b.ref(base() + '/' + meuUid() + '/' + id + '/' + campo)
      .transaction(atual => (atual ? undefined : valor))
      .then(r => !!(r && r.committed))
      .catch(e => { console.warn('[disparos] reivindicar:', e && e.message); return false; });
  }
  function completar(id, campo, extra) {
    const b = db(); if (!b) return;
    b.ref(base() + '/' + meuUid() + '/' + id + '/' + campo).update(extra)
      .catch(e => console.warn('[disparos] completar:', e && e.message));
  }

  //  A pilha de pop-ups: no alto da tela, de tamanho que não passa batido,
  //  sem travar a página (o jogador pode olhar a ficha antes de rolar).
  function pilha() {
    let p = document.getElementById('gdPilha');
    if (!p) {
      p = document.createElement('div');
      p.id = 'gdPilha';
      p.className = 'gd-pilha';
      p.setAttribute('aria-live', 'polite');
      document.body.appendChild(p);
    }
    return p;
  }
  function cartao(html, classe, id) {
    //  <div>, não <section>: o site esconde toda <section> fora da aba aberta, e
    //  a trava da página dos jogadores (modo-jogador.js) barra clique dentro de
    //  <section> que não seja livre — o 🎲 do pop-up ficava mudo.
    const c = document.createElement('div');
    if (id) abertos[id] = c;
    c.className = 'gd-pop' + (classe ? ' ' + classe : '');
    c.setAttribute('role', 'dialog');
    c.innerHTML = html;
    pilha().appendChild(c);
    const foco = c.querySelector('[data-gd-foco]');
    if (foco) setTimeout(() => { try { foco.focus(); } catch (e) {} }, 30);
    return c;
  }
  function fecharCartao(c) {
    if (c && c.parentNode) c.parentNode.removeChild(c);
    Object.keys(abertos).forEach(k => { if (abertos[k] === c) delete abertos[k]; });
  }

  function popupRolagem(id, d) {
    const alvo = d.alvo || {};
    const info = (window.GA_Ficha && window.GA_Ficha.bonusTeste) ? window.GA_Ficha.bonusTeste(d.fichaId, alvo) : null;
    const bonus = info ? info.bonus : 0;
    const cdTxt = (typeof d.cd === 'number') ? 'CD ' + d.cd : 'CD secreta';
    const c = cartao(`
      <p class="gd-pop-de">🎲 ${esc(d.deNome || 'O mestre')} pede um teste</p>
      <h3 class="gd-pop-tit">${esc(alvo.rotulo || 'Teste')} <span class="gd-pop-cd">${esc(cdTxt)}</span></h3>
      ${d.motivo ? `<p class="gd-pop-motivo">${esc(d.motivo)}</p>` : ''}
      <p class="gd-pop-quem">${esc(d.fichaNome || (info && info.ficha) || 'Seu personagem')}</p>
      <p class="gd-pop-conta">1d20 ${esc(sinal(bonus))}${info ? ' <small>(o bônus da sua ficha)</small>'
        : ' <small>(a ficha não está neste aparelho — some à mão no campo abaixo)</small>'}</p>
      <label class="gd-pop-extra">＋ bônus de fora <small>(magia, ajuda de aliado…)</small>
        <input type="number" step="1" value="0" inputmode="numeric" data-gd-extra></label>
      <div class="gd-pop-acoes">
        <button type="button" class="gd-btn gd-btn--forte" data-gd-rolar data-gd-foco>🎲 Rolar</button>
      </div>
      <p class="gd-pop-res" data-gd-res hidden></p>`, 'gd-pop--rolagem', id);
    c.querySelector('[data-gd-rolar]').addEventListener('click', function () {
      const extra = parseInt(c.querySelector('[data-gd-extra]').value, 10) || 0;
      const d20 = rolarD20();
      const total = d20 + bonus + extra;
      const res = c.querySelector('[data-gd-res]');
      let veredito = '';
      if (typeof d.cd === 'number') veredito = total >= d.cd ? ' — ✔ passou!' : ' — ✖ não passou';
      res.hidden = false;
      res.innerHTML = 'Resultado: <strong>' + total + '</strong> <small>(1d20 ' + d20Html(d20) + ' ' + esc(sinal(bonus)) +
        (extra ? ' ' + esc(sinal(extra)) : '') + ')</small>' + esc(veredito) + '<br><small>enviado ao mestre</small>';
      this.disabled = true;
      c.querySelector('[data-gd-extra]').disabled = true;
      const acoes = c.querySelector('.gd-pop-acoes');
      acoes.innerHTML = '<button type="button" class="gd-btn" data-gd-ok>Fechar</button>';
      acoes.querySelector('[data-gd-ok]').addEventListener('click', () => fecharCartao(c));
      c._respondiAqui = true;
      reivindicar(id, 'resposta', { d20: d20, bonus: bonus, extra: extra, total: total, em: Date.now() }).then(ok => {
        if (!ok) { res.innerHTML = 'Este pedido já foi respondido em outra aba ou aparelho.'; return; }
      //  também no log de rolagens da mesa (sem a CD, que pode ser secreta)
      try {
        if (window.GA_Rolagens && window.GA_Rolagens.publicar) {
          window.GA_Rolagens.publicar({ criatura: '🎯 ' + (d.fichaNome || 'Teste'), pericia: alvo.rotulo || '',
            formula: '1d20 (' + d20Html(d20) + ') ' + sinal(bonus) + (extra ? ' ' + sinal(extra) : '') + ' = <strong>' + total + '</strong>',
            tipo: 'disparo' });
        }
      } catch (e) {}
      });
    });
  }

  function aplicarDoMestre(id, d) {
    const acao = d.acao || {};
    //  a ficha precisa estar AQUI: sem ela, outra aba/aparelho do jogador aplica
    if (!(window.GA_Ficha && window.GA_Ficha.ehDaqui && window.GA_Ficha.ehDaqui(d.fichaId))) { tratados.delete(id); return; }
    reivindicar(id, 'aplicado', { em: Date.now(), msg: '' }).then(ok => {
      if (!ok) return;
      const msg = window.GA_Ficha.aplicarDeFora(d.fichaId, acao) || 'nada a aplicar';
      completar(id, 'aplicado', { msg: msg });
      mostrarAplicado(d, acao, msg);
    });
  }
  function mostrarAplicado(d, acao, msg) {
    const c = cartao(`
      <p class="gd-pop-de">⚔ ${esc(d.deNome || 'O mestre')}</p>
      <h3 class="gd-pop-tit">${esc(d.fichaNome || 'Seu personagem')}: ${esc(msg)}</h3>
      ${acao.porQue ? `<p class="gd-pop-motivo">${esc(acao.porQue)}</p>` : ''}
      <div class="gd-pop-acoes"><button type="button" class="gd-btn" data-gd-ok data-gd-foco>Entendi</button></div>`, 'gd-pop--aplicado');
    c.querySelector('[data-gd-ok]').addEventListener('click', () => fecharCartao(c));
  }

  function textoDaAcao(acao) {
    if (!acao) return '';
    if (acao.cura) return '+' + acao.cura + ' PV de cura' + (acao.curaExpr ? ' (' + acao.curaExpr + ')' : '');
    if (acao.efeito) {
      const e = acao.efeito;
      const alc = { tudo: 'perícias, ataque e dano', pericias: 'perícias', ataquedano: 'ataque e dano', defesa: 'Defesa' }[e.alcance] || e.alcance;
      const dur = { cena: 'cena', dia: '1 dia', rodadas: 'rodadas', permanente: 'permanente', outro: 'outro' }[e.duracao] || e.duracao;
      return sinal(parseInt(e.valor, 10) || 0) + ' em ' + alc + ' (' + dur + ')';
    }
    return '';
  }
  function popupEfeito(id, d) {
    //  De jogador para jogador só passa o que AJUDA: cura e bônus. Dano e
    //  condição são do mestre (a regra do banco também barra; aqui, de novo).
    const bruto = d.acao || {};
    const acao = { porQue: bruto.porQue || '' };
    if (bruto.cura) { acao.cura = bruto.cura; acao.curaExpr = bruto.curaExpr || ''; }
    if (bruto.efeito) acao.efeito = bruto.efeito;
    const fonte = (acao.efeito && acao.efeito.fonte) || acao.porQue || '';
    const c = cartao(`
      <p class="gd-pop-de">✨ ${esc(d.deNome || 'Um aliado')} ${fonte ? 'usou <strong>' + esc(fonte) + '</strong> em você' : 'mandou para você'}</p>
      <h3 class="gd-pop-tit">${esc(textoDaAcao(acao))}</h3>
      <p class="gd-pop-quem">${esc(d.fichaNome || 'Seu personagem')}</p>
      <div class="gd-pop-acoes">
        <button type="button" class="gd-btn gd-btn--forte" data-gd-sim data-gd-foco>✔ Aceitar</button>
        <button type="button" class="gd-btn" data-gd-nao>Recusar</button>
      </div>`, 'gd-pop--efeito', id);
    c.querySelector('[data-gd-sim]').addEventListener('click', () => {
      c._respondiAqui = true;
      reivindicar(id, 'resposta', { aceito: true, em: Date.now() }).then(ok => {
        if (ok) {
          const msg = (window.GA_Ficha && window.GA_Ficha.aplicarDeFora) ? window.GA_Ficha.aplicarDeFora(d.fichaId, acao) : '';
          completar(id, 'resposta', { msg: msg || 'a ficha não está neste aparelho' });
        }
        fecharCartao(c);
      });
    });
    c.querySelector('[data-gd-nao]').addEventListener('click', () => {
      c._respondiAqui = true;
      reivindicar(id, 'resposta', { aceito: false, em: Date.now() }).then(() => fecharCartao(c));
    });
  }

  // ═══ O LADO DO MESTRE: o 🎯 controlador ═══════════════════════════
  function alvosDaMesa() {
    const lista = (window.GA_Ficha && window.GA_Ficha.visiveis) ? window.GA_Ficha.visiveis() : [];
    //  SÓ AS FICHAS VINCULADAS A ESTA CAMPANHA: as dos jogadores já vêm do
    //  nó dela no banco, mas as fichas do próprio mestre, sem campanha, também
    //  passavam pelo visiveis() — e iam parar na lista de quem rola.
    return lista.filter(f => f && f.dono && f.id && f.mesa === sala());
  }
  function opcoesTeste(sel) {
    const c = catalogo();
    const op = t => `<option value="${esc(t.tipo + ':' + t.chave)}"${sel === t.tipo + ':' + t.chave ? ' selected' : ''}>${esc(t.rotulo)}</option>`;
    return '<option value="">— escolha —</option>' +
      '<optgroup label="Perícias">' + c.pericias.map(op).join('') + '</optgroup>' +
      '<optgroup label="Atributos (1d20 + atributo)">' + c.atributos.map(op).join('') + '</optgroup>';
  }
  function opcoesCondicao() {
    const L = (window.GA_CONDICOES && window.GA_CONDICOES.LISTA) || [];
    return '<option value="">— nenhuma —</option>' + L.map(x => `<option value="${esc(x.nome)}">${esc(x.nome)}</option>`).join('');
  }

  //  Os pedidos agrupados por LOTE (um "🎲 Pedir" = um lote), do mais novo.
  function lotes() {
    const porLote = {};
    Object.keys(todas).forEach(uid => {
      const caixaDele = todas[uid] || {};
      Object.keys(caixaDele).forEach(id => {
        const d = caixaDele[id];
        if (!d || d.tipo !== 'rolagem' || !d.lote) return;
        const l = porLote[d.lote] || (porLote[d.lote] = { id: d.lote, em: 0, itens: [], aplicados: [] });
        l.em = Math.max(l.em, typeof d.em === 'number' ? d.em : 0);
        l.itens.push(Object.assign({ id: id, uid: uid }, d));
      });
      Object.keys(caixaDele).forEach(id => {
        const d = caixaDele[id];
        if (d && d.tipo === 'aplicar' && d.lote && porLote[d.lote]) porLote[d.lote].aplicados.push(Object.assign({ id: id, uid: uid }, d));
      });
    });
    return Object.keys(porLote).map(k => porLote[k]).sort((a, b) => b.em - a.em);
  }
  function cdDe(d) {
    if (typeof d.cd === 'number') return d.cd;
    const s = cds[d.id];
    return s && typeof s.cd === 'number' ? s.cd : null;
  }

  function htmlRespostas() {
    const ls = lotes().slice(0, 5);
    if (!ls.length) return '<p class="gd-vazio">Nenhum pedido ainda. Escolha quem, o teste e a CD, e peça.</p>';
    return ls.map(l => {
      const primeiro = l.itens[0] || {};
      const cd = cdDe(primeiro);
      const linhas = l.itens.map(d => {
        const r = d.resposta;
        const ap = l.aplicados.filter(a => a.fichaId === d.fichaId).map(a => a.aplicado ? '✔ ' + (a.aplicado.msg || 'aplicado') : '⏳ a aplicar').join(' · ');
        let estado = '<span class="gd-esperando">⏳ esperando o jogador rolar</span>';
        if (r && typeof r.total === 'number') {
          const passou = cd == null ? null : r.total >= cd;
          estado = '<strong>' + r.total + '</strong> <small>(' + r.d20 + ' ' + sinal(r.bonus || 0) + (r.extra ? ' ' + sinal(r.extra) : '') + ')</small> ' +
            (passou === null ? '' : passou ? '<span class="gd-ok">✔ passou</span>' : '<span class="gd-falhou">✖ falhou</span>');
        }
        return `<li class="gd-linha"><span class="gd-linha-nome">🧑 ${esc(d.fichaNome || 'ficha')}</span> ${estado}${ap ? ' <span class="gd-aplicado">' + esc(ap) + '</span>' : ''}</li>`;
      }).join('');
      const resp = l.itens.filter(d => d.resposta && typeof d.resposta.total === 'number').length;
      return `
        <div class="gd-lote" data-gd-lote="${esc(l.id)}">
          <p class="gd-lote-cab"><strong>${esc((primeiro.alvo && primeiro.alvo.rotulo) || 'Teste')}</strong> · CD ${cd == null ? '?' : cd}${typeof primeiro.cd === 'number' ? ' (revelada)' : ' (secreta)'}
            ${primeiro.motivo ? ' · ' + esc(primeiro.motivo) : ''} <small>${resp}/${l.itens.length} rolaram</small></p>
          <ul class="gd-linhas">${linhas}</ul>
          <div class="gd-aplicar">
            <span class="gd-aplicar-tit">💥 Dano</span>
            <input type="text" class="gd-in-curto" data-gd-dano placeholder="ex.: 6d6 ou 21" aria-label="Dano (número ou dado)">
            <select data-gd-tipo aria-label="Tipo de dano"><option value="">sem tipo</option>${TIPOS_DANO.map(t => `<option>${esc(t)}</option>`).join('')}</select>
            <label>quem falhou <select data-gd-falhou aria-label="Quem falhou recebe"><option value="1">total</option><option value="0.5">metade</option><option value="0">nada</option></select></label>
            <label>quem passou <select data-gd-passou aria-label="Quem passou recebe"><option value="0.5">metade</option><option value="0">nada</option><option value="1">total</option></select></label>
            <span class="gd-aplicar-tit">🌀 Quem falhou fica</span>
            <select data-gd-cond aria-label="Condição para quem falhou">${opcoesCondicao()}</select>
            <button type="button" class="gd-btn gd-btn--forte" data-gd-aplicar="${esc(l.id)}">Aplicar</button>
          </div>
        </div>`;
    }).join('');
  }

  function abrirControlador() {
    if (!window.GA_abrirModal) return;
    if (!mando()) {
      window.GA_abrirModal(`<div class="ga-modal-cab"><span>🎯 Controlador do mestre</span>
        <button type="button" class="ga-modal-x" data-ga-fechar aria-label="Fechar">✕</button></div>
        <p class="gd-vazio">O controlador manda pedidos para a tela dos jogadores, então ele precisa de uma campanha
        aberta (o endereço com <code>?mesa=</code>) e de você entrar na conta como mestre ou auxiliar dela.</p>`);
      return;
    }
    const alvos = alvosDaMesa();
    const overlay = window.GA_abrirModal(`
      <div class="ga-modal-cab"><span>🎯 Controlador do mestre</span>
        <button type="button" class="ga-modal-x" data-ga-fechar aria-label="Fechar">✕</button></div>
      <div class="gd-ctl">
        <div class="gd-bloco">
          <p class="gd-bloco-tit">1 · Quem rola</p>
          ${alvos.length ? `<div class="gd-alvos">${alvos.map(f => `
            <label class="gd-alvo"><input type="checkbox" data-gd-alvo value="${esc(f.id)}" data-uid="${esc(f.dono)}" data-nome="${esc(f.nome || 'ficha')}">
              🧑 ${esc(f.nome || 'ficha')}${f.jogador ? ' <small>(' + esc(f.jogador) + ')</small>' : ''}</label>`).join('')}</div>
            <p class="gd-mini"><button type="button" class="gd-link" data-gd-todos="1">marcar todos</button> · <button type="button" class="gd-link" data-gd-todos="">ninguém</button></p>`
          : '<p class="gd-vazio">Nenhuma ficha de jogador nesta campanha ainda — o jogador precisa vincular a ficha dele à mesa.</p>'}
        </div>
        <div class="gd-bloco">
          <p class="gd-bloco-tit">2 · O teste</p>
          <div class="gd-teste">
            <label>Perícia ou atributo <select id="gdTeste">${opcoesTeste('pericia:vontade')}</select></label>
            <label>CD <input type="number" id="gdCd" min="0" step="1" inputmode="numeric" placeholder="ex.: 15"></label>
            <label class="gd-check"><input type="checkbox" id="gdRevelar"> mostrar a CD ao jogador</label>
          </div>
          <label class="gd-motivo">Motivo <small>(opcional — o jogador vê)</small>
            <input type="text" id="gdMotivo" placeholder="ex.: o sopro do dragão" autocomplete="off"></label>
          <p class="gd-recado" id="gdRecado" hidden></p>
          <div class="ga-modal-acoes"><button type="button" class="ga-btn-principal" id="gdPedir">🎲 Pedir o teste</button></div>
        </div>
        <div class="gd-bloco">
          <p class="gd-bloco-tit">3 · Respostas <button type="button" class="gd-link gd-limpar" data-gd-limpar>🧹 limpar tudo</button></p>
          <div id="gdRespostas">${htmlRespostas()}</div>
        </div>
      </div>`);
    const caixaModal = overlay.querySelector('.ga-modal');
    if (caixaModal) caixaModal.classList.add('gd-modal');

    // as respostas chegam sozinhas (o modal fica aberto enquanto os jogadores rolam)
    const repintar = () => {
      const alvo = overlay.querySelector('#gdRespostas');
      if (!alvo || !overlay.isConnected) {          // o modal fechou: sai da lista
        const i = ouvintes.indexOf(repintar); if (i >= 0) ouvintes.splice(i, 1);
        return;
      }
      if (alvo.contains(document.activeElement)) return;   // não arranca o que ele está digitando
      alvo.innerHTML = htmlRespostas();
    };
    ouvintes.push(repintar);

    overlay.addEventListener('click', e => {
      const todos = e.target.closest('[data-gd-todos]');
      if (todos) { overlay.querySelectorAll('[data-gd-alvo]').forEach(cb => { cb.checked = !!todos.dataset.gdTodos; }); return; }
      if (e.target.closest('#gdPedir')) return pedir(overlay);
      const ap = e.target.closest('[data-gd-aplicar]');
      if (ap) return aplicarLote(ap.closest('.gd-lote'), ap.dataset.gdAplicar);
      if (e.target.closest('[data-gd-limpar]')) {
        if (!window.confirm('Apagar todos os pedidos e respostas desta mesa? (As fichas não mudam.)')) return;
        const b = db();
        if (b) b.ref('mesas/' + sala()).update({ disparos: null, disparosCd: null })
          .catch(err => console.warn('[disparos] limpar:', err && err.message));
      }
    });
  }

  function pedir(overlay) {
    const recado = overlay.querySelector('#gdRecado');
    const dizer = t => { recado.hidden = !t; recado.textContent = t || ''; };
    const marcados = Array.from(overlay.querySelectorAll('[data-gd-alvo]:checked'));
    const teste = acharTeste(overlay.querySelector('#gdTeste').value);
    const cdTxt = overlay.querySelector('#gdCd').value.trim();
    const cd = cdTxt === '' ? null : parseInt(cdTxt, 10);
    if (!marcados.length) return dizer('Marque quem vai rolar.');
    if (!teste) return dizer('Escolha a perícia ou o atributo.');
    if (cdTxt !== '' && (isNaN(cd) || cd < 0)) return dizer('A CD precisa ser um número.');
    const revelar = overlay.querySelector('#gdRevelar').checked;
    const motivo = overlay.querySelector('#gdMotivo').value.trim().slice(0, 120);
    const b = db(); if (!b) return dizer('Sem conexão com a mesa.');
    const lote = novoId();
    const patch = {};
    marcados.forEach(cb => {
      const id = novoId();
      patch['disparos/' + cb.dataset.uid + '/' + id] = {
        tipo: 'rolagem', de: meuUid(), deNome: meuNome(), em: carimbo(), lote: lote,
        fichaId: cb.value, fichaNome: cb.dataset.nome,
        alvo: { tipo: teste.tipo, chave: teste.chave, rotulo: teste.rotulo },
        motivo: motivo, cd: (revelar && cd != null) ? cd : null,
      };
      if (cd != null) patch['disparosCd/' + id] = { cd: cd };
    });
    dizer('');
    b.ref('mesas/' + sala()).update(patch)
      .then(() => dizer('Pedido enviado — as respostas aparecem abaixo conforme cada um rola.'))
      .catch(err => dizer('Não deu para enviar: ' + (err && err.message)));
  }

  //  O dano é rolado UMA vez para o grupo (é assim que o efeito em área
  //  funciona na mesa) e repartido: total, metade (para baixo) ou nada,
  //  conforme quem passou ou falhou. A condição vai só para quem falhou.
  function aplicarLote(el, loteId) {
    if (!el) return;
    const l = lotes().find(x => x.id === loteId);
    if (!l) return;
    const danoTxt = (el.querySelector('[data-gd-dano]').value || '').trim();
    const tipo = el.querySelector('[data-gd-tipo]').value;
    const fFalhou = parseFloat(el.querySelector('[data-gd-falhou]').value);
    const fPassou = parseFloat(el.querySelector('[data-gd-passou]').value);
    const condicao = el.querySelector('[data-gd-cond]').value;
    let dano = 0, danoRot = '';
    if (danoTxt) {
      if (/^\d+$/.test(danoTxt)) dano = parseInt(danoTxt, 10);
      else if (window.GA_Dados) {
        try { const r = window.GA_Dados.avaliar(danoTxt); dano = Math.max(0, Math.round(r.total)); danoRot = danoTxt + ' = ' + dano; }
        catch (e) { window.alert('Dano inválido: ' + (e && e.message)); return; }
      }
    }
    if (!dano && !condicao) return;
    const motivo = (l.itens[0] && l.itens[0].motivo) || ((l.itens[0] && l.itens[0].alvo && l.itens[0].alvo.rotulo) || '');
    const cd = cdDe(l.itens[0] || {});
    const patch = {};
    l.itens.forEach(d => {
      const r = d.resposta;
      if (!r || typeof r.total !== 'number') return;            // quem não rolou fica de fora
      const passou = cd != null && r.total >= cd;
      const fator = passou ? fPassou : fFalhou;
      const acao = { porQue: motivo };
      if (dano && fator > 0) { acao.dano = Math.floor(dano * fator); if (tipo) acao.tipoDano = tipo; }
      if (condicao && !passou) acao.condicao = condicao;
      if (!acao.dano && !acao.condicao) return;
      const id = novoId();
      patch[d.uid + '/' + id] = { tipo: 'aplicar', de: meuUid(), deNome: meuNome(), em: carimbo(), lote: l.id,
        fichaId: d.fichaId, fichaNome: d.fichaNome, acao: acao };
    });
    if (!Object.keys(patch).length) { window.alert('Ninguém para aplicar: espere os jogadores rolarem.'); return; }
    const b = db(); if (!b) return;
    b.ref(base()).update(patch)
      .then(() => { if (danoRot) { try { window.GA_Rolagens && window.GA_Rolagens.publicar({ criatura: '💥 ' + (motivo || 'Dano'), pericia: tipo || '', formula: esc(danoRot), tipo: 'disparo' }); } catch (e) {} } })
      .catch(err => console.warn('[disparos] aplicar:', err && err.message));
  }

  // ═══ ✨ AJUDAR UM ALIADO (o disparo do jogador) ═══════════════════
  //  Os alvos saem da lista de iniciativa (que todo membro lê): quem é
  //  jogador e tem a ficha amarrada. A ficha dos outros o jogador não lê —
  //  e nem precisa: manda para a caixa do aliado, que aceita lá.
  function aliados() {
    const lista = (window.GA_Iniciativa && window.GA_Iniciativa.combatentes) ? window.GA_Iniciativa.combatentes() : [];
    return lista.filter(c => c.tipo === 'jogador' && c.uid && c.fichaId);
  }
  function abrirAjuda() {
    if (!window.GA_abrirModal) return;
    const lista = aliados();
    const podeAgora = escreve();
    const overlay = window.GA_abrirModal(`
      <div class="ga-modal-cab"><span>✨ Ajudar um aliado</span>
        <button type="button" class="ga-modal-x" data-ga-fechar aria-label="Fechar">✕</button></div>
      <div class="gd-ctl">
        ${!podeAgora ? '<p class="gd-vazio">Entre na conta e na mesa (como jogador) para mandar ajuda.</p>' : !lista.length
          ? '<p class="gd-vazio">Os aliados aparecem aqui quando o mestre monta a iniciativa com as fichas de vocês.</p>' : `
        <div class="gd-bloco">
          <p class="gd-bloco-tit">Para quem</p>
          <select id="gdAliado">${lista.map(c => `<option value="${esc(c.uid + '|' + c.fichaId)}" data-nome="${esc(c.nome)}">${esc(c.nome)}</option>`).join('')}</select>
        </div>
        <div class="gd-bloco">
          <p class="gd-bloco-tit">O quê</p>
          <label>De onde vem <small>(a magia, o poder…)</small>
            <input type="text" id="gdFonte" list="gdMagiasLista" placeholder="digite ou escolha da lista" autocomplete="off"></label>
          <datalist id="gdMagiasLista">${(window.GA_MAGIAS || []).map(m => `<option value="${esc(m.nome)}">`).join('')}</datalist>
          <div class="gd-teste">
            <label class="gd-check"><input type="radio" name="gdQue" value="cura" checked> 💚 cura</label>
            <label class="gd-check"><input type="radio" name="gdQue" value="bonus"> ✨ bônus</label>
          </div>
          <div class="gd-teste" data-gd-se="cura">
            <label>Quanto cura <input type="text" id="gdCura" placeholder="ex.: 2d8+2" autocomplete="off"></label>
          </div>
          <div class="gd-teste" data-gd-se="bonus" hidden>
            <label>Valor <input type="number" id="gdValor" value="1" step="1" inputmode="numeric"></label>
            <label>Em <select id="gdAlcance"><option value="tudo">perícias, ataque e dano</option><option value="pericias">perícias</option><option value="ataquedano">ataque e dano</option><option value="defesa">Defesa</option></select></label>
            <label>Por <select id="gdDuracao"><option value="cena">cena</option><option value="rodadas">rodadas</option><option value="dia">1 dia</option><option value="outro">outro</option></select></label>
          </div>
          <p class="gd-recado" id="gdRecado" hidden></p>
          <div class="ga-modal-acoes"><button type="button" class="ga-btn-principal" id="gdMandar">✨ Mandar</button></div>
        </div>`}
      </div>`);
    overlay.addEventListener('change', e => {
      if (e.target.name !== 'gdQue') return;
      overlay.querySelectorAll('[data-gd-se]').forEach(x => { x.hidden = x.dataset.gdSe !== e.target.value; });
    });
    overlay.addEventListener('click', e => {
      if (!e.target.closest('#gdMandar')) return;
      const recado = overlay.querySelector('#gdRecado');
      const dizer = t => { recado.hidden = !t; recado.textContent = t || ''; };
      const sel = overlay.querySelector('#gdAliado');
      const [uid, fichaId] = String(sel.value || '').split('|');
      const nomeAliado = sel.selectedOptions[0] ? sel.selectedOptions[0].dataset.nome : '';
      const fonte = overlay.querySelector('#gdFonte').value.trim().slice(0, 80);
      const que = (overlay.querySelector('input[name="gdQue"]:checked') || {}).value;
      const acao = { porQue: fonte };
      if (que === 'cura') {
        const expr = overlay.querySelector('#gdCura').value.trim();
        if (!expr) return dizer('Quanto cura? (um número ou um dado, ex.: 2d8+2)');
        let total = 0;
        if (/^\d+$/.test(expr)) total = parseInt(expr, 10);
        else {
          try { total = Math.max(0, Math.round(window.GA_Dados.avaliar(expr).total)); }
          catch (err) { return dizer('Não entendi o dado: ' + (err && err.message)); }
        }
        if (!total) return dizer('A cura saiu 0.');
        acao.cura = total; acao.curaExpr = expr;
      } else {
        const valor = parseInt(overlay.querySelector('#gdValor').value, 10) || 0;
        if (!valor) return dizer('O bônus precisa de um valor.');
        acao.efeito = { fonte: fonte || 'ajuda', valor: valor,
          alcance: overlay.querySelector('#gdAlcance').value, duracao: overlay.querySelector('#gdDuracao').value };
      }
      const b = db(); if (!b || !uid) return dizer('Sem conexão com a mesa.');
      const id = novoId();
      b.ref(base() + '/' + uid + '/' + id).set({ tipo: 'efeito', de: meuUid(), deNome: meuNome(), em: carimbo(),
        fichaId: fichaId, fichaNome: nomeAliado, acao: acao })
        .then(() => {
          dizer('Mandado para ' + nomeAliado + ' — ' + textoDaAcao(acao) + '. Entra na ficha quando aceitarem.');
          try { if (acao.cura && window.GA_Rolagens) window.GA_Rolagens.publicar({ criatura: '💚 ' + (fonte || 'Cura'), pericia: nomeAliado, formula: esc(acao.curaExpr) + ' = <strong>' + acao.cura + '</strong>', tipo: 'disparo' }); } catch (err) {}
        })
        .catch(err => dizer('O banco recusou: ' + (err && err.message)));
    });
  }

  // ═══ INÍCIO ═══════════════════════════════════════════════════════
  window.GA_Disparos = {
    abrirControlador: abrirControlador,
    abrirAjuda: abrirAjuda,
    podeControlar: mando,
    podeAjudar: escreve,
    aoMudar: fn => { if (typeof fn === 'function') ouvintes.push(fn); },
    //  para testes: o que o mestre vê agora
    _lotes: lotes,
  };

  //  O GA_Mesa vem antes deste arquivo nas duas páginas, mas a segunda
  //  chance no DOMContentLoaded fica (ver [[defer-readystate-interactive]]).
  function init(segunda) {
    if (window.GA_Mesa && window.GA_Mesa.aoMudar) {
      window.GA_Mesa.aoMudar(e => { mesa = e; ligar(); avisar(); });
      return;
    }
    if (!segunda && document.readyState !== 'complete') {
      document.addEventListener('DOMContentLoaded', () => init(true), { once: true });
    }
  }
  init();
})();
