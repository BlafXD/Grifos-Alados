// ═══════════════════════════════════════════════════════════════════
//  PAINEL-DONO.JS — o que existe no banco, para o dono do site
//  Carregado só no index.html, depois do mesa.js e do noticias-mesa.js.
//  Abre pelo botão "🛡 Painel do dono", na edição da aba 📰 Notícias.
//
//  POR QUE ELE EXISTE (02/11/2026). O site foi divulgado no Reddit, e
//  até aqui não havia NENHUMA forma de saber o que estranhos estavam
//  criando sem abrir o console do Firebase: as campanhas davam para
//  listar pela URL do banco, e as mesas não davam de jeito nenhum —
//  `mesas` nunca teve `.read`, de propósito, para a sala de um grupo
//  não ser bisbilhotável. Este painel é a resposta: as regras passam a
//  dar leitura dos dois nós ao uid do dono do site, e ele vê daqui.
//
//  TRÊS COISAS SE FAZEM AQUI, e nenhuma delas dá para fazer no site
//  fora deste painel:
//    • 🌟 APROVAR uma campanha na vitrine — é o carimbo que a faz
//      aparecer na lista de quem abre o site. Sem ele toda gazeta nasce
//      e vive oculta, visível só para o dono dela e para quem tem o
//      link. A vitrine é o "currículo dos Grifos": as campanhas que
//      valeram a visita.
//    • 🗑 APAGAR abuso — campanha ou mesa de qualquer pessoa.
//    • 🔗 ABRIR qualquer uma, para ler antes de aprovar.
//
//  COMO ELE LÊ, E POR QUE NÃO PELO SDK. As campanhas descem de uma vez
//  (`campanhas.json`), que é o que todo visitante baixava antes desta
//  mudança — aqui é uma vez, sob clique, e não a cada F5 de cada um.
//  As MESAS, não: dentro de `mesas/<id>` moram as fichas dos jogadores,
//  e um `once('value')` no nó inteiro arrastaria megabytes de dado que
//  não interessa a esta tela. Então as mesas vêm pelo REST do banco com
//  `?shallow=true` (só as chaves) e depois campo a campo — nome, dono,
//  entrada e a contagem de membros. É o único lugar do site que fala
//  REST com o Firebase, e é por isso.
// ═══════════════════════════════════════════════════════════════════
(function () {
  'use strict';

  const ADMIN_UID = 'uxcc4lwMDceDqGFRrMwctv1Gi9D2';
  let aberto = false;
  //  `campanhas/<id>/mesas` existe no banco em campanha antiga, escrito
  //  à mão antes de haver código para isso. Não se usa e não se apaga.

  function cfg() { return window.GA_FIREBASE || null; }
  function mesa() { return window.GA_Mesa || null; }
  function db() { return mesa() ? mesa().db() : null; }
  function usuario() {
    const e = mesa() ? mesa().estado() : null;
    return (e && e.usuario) || null;
  }
  function souDono() { const u = usuario(); return !!(u && u.uid === ADMIN_UID); }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, c =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }
  function kb(n) {
    if (n < 1024) return n + ' B';
    if (n < 1024 * 1024) return (n / 1024).toFixed(1) + ' kB';
    return (n / 1048576).toFixed(2) + ' MB';
  }
  function quando(ms) {
    if (!ms) return '—';
    try { return new Date(ms).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' }); }
    catch (e) { return String(ms); }
  }

  // ── O REST DO BANCO, com o meu token ─────────────────────────────
  //  `?shallow=true` devolve só as chaves de um nó: é com isto que dá
  //  para listar as mesas sem baixar o que está dentro delas.
  let token = '';
  async function meuToken() {
    const u = mesa() && mesa().auth ? mesa().auth().currentUser : null;
    if (!u) throw new Error('sem login');
    token = await u.getIdToken();
    return token;
  }
  async function pegar(caminho, shallow) {
    const c = cfg();
    if (!c || !c.databaseURL) throw new Error('sem databaseURL');
    const url = c.databaseURL.replace(/\/$/, '') + '/' + caminho + '.json?auth=' +
      encodeURIComponent(token) + (shallow ? '&shallow=true' : '');
    const r = await fetch(url);
    if (!r.ok) throw new Error('HTTP ' + r.status + ' em ' + caminho);
    return r.json();
  }

  // ── JUNTAR O RETRATO ─────────────────────────────────────────────
  async function levantar() {
    await meuToken();
    const meu = usuario().uid;

    const [camps, publicas, indice] = await Promise.all([
      pegar('campanhas').catch(e => ({ __erro: e.message })),
      pegar('gazeta/publicas').catch(() => ({})),
      pegar('usuarios/' + meu + '/campanhas').catch(() => ({})),
    ]);

    const erroCamp = camps && camps.__erro ? camps.__erro : '';
    const lista = [];
    if (!erroCamp) {
      Object.keys(camps || {}).forEach(id => {
        const c = camps[id] || {};
        const anos = c.noticias || [];
        const chaves = Array.isArray(anos) ? anos.filter(Boolean) : Object.keys(anos).map(k => anos[k]);
        let noticias = 0;
        chaves.forEach(a => {
          const n = a && a.noticias;
          noticias += Array.isArray(n) ? n.filter(Boolean).length : (n ? Object.keys(n).length : 0);
        });
        lista.push({
          id: id,
          nome: c.nome || id,
          autor: c.autor || '',
          dono: c.dono || '',
          minha: c.dono === meu,
          anos: chaves.length,
          noticias: noticias,
          bytes: JSON.stringify(c).length,
          em: c.atualizadoEm || c.criadaEm || 0,
          publica: !!(publicas && publicas[id]),
          noIndice: !!(indice && indice[id]),
        });
      });
      //  VITRINE PENDURADA NO VAZIO. Se quem escreveu uma campanha
      //  aprovada a tirar do ar, o carimbo dela fica em
      //  `gazeta/publicas` sem gazeta nenhuma por baixo — e ninguém o
      //  veria, porque esta lista nasce do nó `campanhas`. Então as
      //  sobras entram aqui, para dar para limpá-las.
      Object.keys(publicas || {}).forEach(id => {
        if (camps && camps[id]) return;
        const p = publicas[id] || {};
        lista.push({
          id: id, nome: p.nome || id, autor: p.autor || '', dono: '', minha: false,
          anos: 0, noticias: 0, bytes: 0, em: p.em || 0, publica: true, sobra: true,
        });
      });
      lista.sort((a, b) => (b.em || 0) - (a.em || 0));
    }

    //  As mesas, chave a chave. Uma de cada vez ia ficar lento com
    //  muitas salas, então as consultas de cada mesa vão em paralelo.
    let salas = [], erroMesa = '';
    try {
      const ids = Object.keys((await pegar('mesas', true)) || {});
      salas = await Promise.all(ids.map(async id => {
        const [nome, dono, criadaEm, livre, membros] = await Promise.all([
          pegar('mesas/' + id + '/nome').catch(() => null),
          pegar('mesas/' + id + '/dono').catch(() => null),
          pegar('mesas/' + id + '/criadaEm').catch(() => null),
          pegar('mesas/' + id + '/entradaLivre').catch(() => null),
          pegar('mesas/' + id + '/membros', true).catch(() => null),
          ]);
        return {
          id: id,
          nome: nome || id,
          dono: dono || '',
          minha: dono === meu,
          criadaEm: criadaEm || 0,
          livre: livre === true,
          membros: membros ? Object.keys(membros).length : 0,
        };
      }));
      salas.sort((a, b) => (b.criadaEm || 0) - (a.criadaEm || 0));
    } catch (e) { erroMesa = e.message; }

    return { lista: lista, salas: salas, erroCamp: erroCamp, erroMesa: erroMesa };
  }

  // ── A TELA ───────────────────────────────────────────────────────
  function fechar() {
    const m = document.getElementById('pdModal');
    if (m) m.remove();
    aberto = false;
  }

  function moldura(corpo) {
    let m = document.getElementById('pdModal');
    if (!m) {
      m = document.createElement('div');
      m.id = 'pdModal';
      m.className = 'nc-overlay';
      m.addEventListener('click', ev => {
        if (ev.target === m) return fechar();
        const btn = ev.target.closest('[data-pd]');
        if (btn) agir(btn.dataset.pd, btn.dataset.id, btn.dataset.nome);
      });
      document.addEventListener('keydown', function esc_(ev) {
        if (!document.getElementById('pdModal')) {
          return document.removeEventListener('keydown', esc_);
        }
        if (ev.key === 'Escape') fechar();
      });
      document.body.appendChild(m);
    }
    m.innerHTML =
      '<div class="nc-modal pd-modal" role="dialog" aria-modal="true" aria-label="Painel do dono">' +
        '<div class="nc-modal-header">' +
          '<span>🛡 Painel do dono</span>' +
          '<button class="nc-modal-fechar" data-pd="fechar" title="Fechar">✕</button>' +
        '</div>' +
        '<div class="nc-modal-corpo pd-corpo">' + corpo + '</div>' +
      '</div>';
    return m;
  }

  function tabelaCampanhas(d) {
    if (d.erroCamp) {
      return '<p class="nc-mesa-erro">⚠ O banco recusou a lista das campanhas: ' + esc(d.erroCamp) +
        '<br>É o sinal de que as <strong>regras novas</strong> ainda não foram coladas no console — ' +
        'é a regra <code>campanhas/.read</code> com o seu uid que abre esta lista.</p>';
    }
    if (!d.lista.length) return '<p class="nc-vazio">Nenhuma campanha no banco.</p>';
    const linhas = d.lista.map(c => '' +
      '<tr' + (c.publica ? ' class="pd-publica"' : '') + '>' +
        '<td><strong>' + esc(c.nome) + '</strong><br><code class="pd-id">' + esc(c.id) + '</code></td>' +
        '<td>' + (c.minha ? '<span class="pd-selo pd-selo--eu">você</span>' : esc(c.autor || '—') +
          (c.dono ? '' : '<br><em>sem dono (órfã)</em>')) + '</td>' +
        '<td>' + (c.sobra ? '<em>⚠ carimbo sem gazeta</em>'
          : c.anos + ' ano(s)<br>' + c.noticias + ' notícia(s)') + '</td>' +
        '<td>' + kb(c.bytes) + '</td>' +
        '<td>' + esc(quando(c.em)) + '</td>' +
        '<td>' + (c.publica
          ? '<span class="pd-selo pd-selo--pub">🌟 na vitrine</span>'
          : '<span class="pd-selo">🔒 oculta</span>') + '</td>' +
        '<td class="pd-acoes">' +
          '<button class="nc-btn nc-btn-sm" data-pd="abrir" data-id="' + esc(c.id) + '">👁 Abrir</button>' +
          '<button class="nc-btn nc-btn-sm ' + (c.publica ? 'nc-btn-danger' : 'nc-btn-add') + '" ' +
            'data-pd="' + (c.publica ? 'tirar' : 'aprovar') + '" data-id="' + esc(c.id) + '" ' +
            'data-nome="' + esc(c.nome) + '">' + (c.publica ? '🙈 Tirar' : '🌟 Aprovar') + '</button>' +
          '<button class="nc-btn nc-btn-sm nc-btn-danger" data-pd="apagar-camp" data-id="' + esc(c.id) + '" ' +
            'data-nome="' + esc(c.nome) + '">🗑</button>' +
        '</td>' +
      '</tr>').join('');
    const total = d.lista.reduce((s, c) => s + c.bytes, 0);
    return '<table class="pd-tab"><thead><tr>' +
      '<th>Campanha</th><th>De quem</th><th>Tamanho</th><th>Bytes</th><th>Última edição</th>' +
      '<th>Vitrine</th><th>&nbsp;</th></tr></thead><tbody>' + linhas + '</tbody></table>' +
      '<p class="pd-rodape">' + d.lista.length + ' campanha(s), ' + kb(total) + ' no total. ' +
      'Só as <strong>🌟 da vitrine</strong> aparecem para quem abre o site; as 🔒 ocultas só pelo link.</p>';
  }

  function tabelaMesas(d) {
    if (d.erroMesa) {
      return '<p class="nc-mesa-erro">⚠ O banco recusou a lista das mesas: ' + esc(d.erroMesa) +
        '<br>É a regra <code>mesas/.read</code> com o seu uid que abre esta lista — ' +
        'sem ela, só o console do Firebase mostra as salas.</p>';
    }
    if (!d.salas.length) return '<p class="nc-vazio">Nenhuma mesa no banco.</p>';
    const linhas = d.salas.map(s => '' +
      '<tr>' +
        '<td><strong>' + esc(s.nome) + '</strong><br><code class="pd-id">' + esc(s.id) + '</code></td>' +
        '<td>' + (s.minha ? '<span class="pd-selo pd-selo--eu">você</span>'
          : (s.dono ? '<code class="pd-id">' + esc(s.dono.slice(0, 10)) + '…</code>' : '<em>sem dono</em>')) + '</td>' +
        '<td>' + s.membros + '</td>' +
        '<td>' + (s.livre ? 'aberta' : 'por pedido') + '</td>' +
        '<td>' + esc(quando(s.criadaEm)) + '</td>' +
        '<td class="pd-acoes">' +
          '<button class="nc-btn nc-btn-sm" data-pd="abrir-mesa" data-id="' + esc(s.id) + '">👁 Abrir</button>' +
          '<button class="nc-btn nc-btn-sm nc-btn-danger" data-pd="apagar-mesa" data-id="' + esc(s.id) + '" ' +
            'data-nome="' + esc(s.nome) + '">🗑</button>' +
        '</td>' +
      '</tr>').join('');
    return '<table class="pd-tab"><thead><tr>' +
      '<th>Mesa</th><th>Mestre</th><th>Membros</th><th>Entrada</th><th>Criada</th><th>&nbsp;</th>' +
      '</tr></thead><tbody>' + linhas + '</tbody></table>' +
      '<p class="pd-rodape">' + d.salas.length + ' mesa(s). A sala é privada: ninguém além dos membros ' +
      'lê o que há dentro dela — e esta lista existe porque a regra dá leitura ao seu uid.</p>';
  }

  //  O ÍNDICE DA CONTA, de uma vez. `usuarios/<uid>/campanhas` nasceu
  //  junto com a gazeta oculta: é por ele que o site sabe quais
  //  campanhas são suas sem poder listar o nó `campanhas`. As campanhas
  //  que já existiam antes disso não têm o carimbo — e sem ele a sua
  //  própria gazeta só desce quando a aba dela é aberta. Este botão
  //  carimba todas as suas de uma vez; some quando não falta nenhuma.
  let faltamIdx = [];
  function botaoIndice(d) {
    if (d.erroCamp) return '';
    faltamIdx = d.lista.filter(c => c.minha && !c.noIndice);
    if (!faltamIdx.length) return '';
    return '<p class="pd-rodape"><button class="nc-btn nc-btn-sm nc-btn-add" data-pd="indexar">' +
      '🔖 Reconhecer as minhas (' + faltamIdx.length + ')</button> ' +
      'Grava o índice <code>usuarios/&lt;uid&gt;/campanhas</code> das suas campanhas — é o que faz ' +
      'a sua gazeta descer inteira em qualquer navegador onde você entrar.</p>';
  }

  function pintar(d) {
    moldura(
      '<h4 class="pd-tit">📰 Gazetas (campanhas)</h4>' + tabelaCampanhas(d) + botaoIndice(d) +
      '<h4 class="pd-tit">🎲 Mesas</h4>' + tabelaMesas(d) +
      '<p class="pd-rodape"><button class="nc-btn nc-btn-sm" data-pd="recarregar">↻ Recarregar</button> ' +
      'Isto é uma foto do banco agora; ele não fica escutando.</p>'
    );
  }

  async function abrir() {
    if (!souDono()) return;
    aberto = true;
    moldura('<p class="nc-vazio">Lendo o banco…</p>');
    try {
      const d = await levantar();
      if (aberto) pintar(d);
    } catch (e) {
      moldura('<p class="nc-mesa-erro">⚠ ' + esc(e.message) + '</p>');
    }
  }

  // ── AS AÇÕES ─────────────────────────────────────────────────────
  function toast(msg) {
    let t = document.getElementById('ncToast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'ncToast'; t.className = 'nc-toast';
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.add('nc-toast--visivel');
    clearTimeout(t._timer);
    t._timer = setTimeout(() => t.classList.remove('nc-toast--visivel'), 2400);
  }

  function agir(acao, id, nome) {
    const b = db();
    if (acao === 'fechar') return fechar();
    if (acao === 'recarregar') return abrir();
    if (acao === 'abrir') {
      const m = window.GA_NoticiasMesa;
      return void window.open(m ? m.linkDa(id, 'index.html') : ('index.html?gazeta=' + id), '_blank');
    }
    if (acao === 'abrir-mesa') {
      return void window.open('index.html?mesa=' + encodeURIComponent(id), '_blank');
    }
    if (!b) return;

    if (acao === 'indexar') {
      const u = usuario();
      if (!u || !faltamIdx.length) return;
      const upd = {};
      faltamIdx.forEach(c => { upd['usuarios/' + u.uid + '/campanhas/' + c.id] = String(c.nome || c.id); });
      return void b.ref().update(upd)
        .then(() => { toast('🔖 ' + faltamIdx.length + ' campanha(s) reconhecida(s)'); abrir(); },
              e => toast('⚠ ' + e.message));
    }
    if (acao === 'aprovar') {
      //  O nome e o autor são copiados para a vitrine de propósito: é
      //  ela que a tela de todo visitante lê, e assim a lista não
      //  precisa abrir campanha nenhuma para escrever as abas.
      return void pegar('campanhas/' + id + '/autor').catch(() => '').then(autor =>
        b.ref('gazeta/publicas/' + id).set({
          nome: String(nome || id),
          autor: String(autor || ''),
          em: firebase.database.ServerValue.TIMESTAMP,
        }).then(() => { toast('🌟 "' + nome + '" entrou na vitrine'); abrir(); },
                e => toast('⚠ ' + e.message)));
    }
    if (acao === 'tirar') {
      return void b.ref('gazeta/publicas/' + id).remove()
        .then(() => { toast('🙈 Fora da vitrine'); abrir(); }, e => toast('⚠ ' + e.message));
    }
    if (acao === 'apagar-camp') {
      if (!confirm('APAGAR a gazeta "' + nome + '" do banco?\n\n' +
                   'Isto some para todo mundo, inclusive para quem a escreveu, e não tem volta.\n' +
                   'Faça isto para abuso — para só esconder, use "🙈 Tirar da vitrine".')) return;
      const upd = {};
      upd['campanhas/' + id] = null;
      upd['gazeta/publicas/' + id] = null;
      return void b.ref().update(upd)
        .then(() => { toast('🗑 Apagada'); abrir(); }, e => toast('⚠ ' + e.message));
    }
    if (acao === 'apagar-mesa') {
      if (!confirm('APAGAR a mesa "' + nome + '" do banco?\n\n' +
                   'Somem as fichas, a iniciativa e as rolagens dela, para todos os membros. ' +
                   'Não tem volta.')) return;
      return void b.ref('mesas/' + id).remove()
        .then(() => { toast('🗑 Mesa apagada'); abrir(); }, e => toast('⚠ ' + e.message));
    }
  }

  window.GA_PainelDono = { abrir: abrir, souDono: souDono };
})();
