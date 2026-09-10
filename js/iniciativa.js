// ═══════════════════════════════════════════════════════════════════
//  INICIATIVA.JS — a ordem do combate, na tela do mestre e da mesa
//  Carregado nas DUAS páginas. Uma lista só, de cima para baixo, com
//  criaturas e jogadores misturados; um botão passa o turno e a linha
//  da vez brilha na tela de todo mundo.
//
//  ONDE A LISTA MORA — DUAS CASAS (revisto em 08/09/2026):
//   • dentro de uma mesa → no Firebase, e todo mundo vê ao vivo;
//   • fora dela → no localStorage DESTE navegador, só para o mestre.
//  A segunda existe porque o painel antes sumia inteiro para quem não
//  estava numa mesa: quem joga na mesa da sala de casa, sem conta e sem
//  banco, também precisa da ordem do combate na tela. A lista local só
//  existe na página do MESTRE (a que tem a aba ⚔ Combates) — no
//  jogadores.html a iniciativa é sempre a da mesa, senão cada jogador
//  teria uma ordem só dele, que não é ordem nenhuma.
//
//  QUEM VÊ O QUÊ na mesa (decidido em 08/09/2026, ver
//  docs/mesa-de-verdade.md §10): o jogador vê **nome e ordem**, mais
//  nada — nem PV, nem defesa, nem o valor rolado. Por isso os números
//  moram num nó à parte, `iniciativaValores`, que só o mestre lê. A
//  lista pública tem nome, tipo (para o ícone) e posição.
//
//  QUEM MEXE: mestre e auxiliar. A ordem nasce do valor (maior primeiro,
//  desempatando pelo modificador de Iniciativa — que em T20 é a
//  Destreza, como o livro manda), mas o mestre ARRASTA qualquer linha,
//  inclusive a de um jogador: é assim que se atrasa uma ação, se prepara
//  outra, e todo o resto que muda a ordem no meio do combate.
//
//  As criaturas vêm da cena que ele está narrando na aba ⚔ Combates
//  (GA_Combates.cenaParaIniciativa), e os jogadores, de quem está na
//  mesa mais o GRUPO — os nomes que ele já digitou na mão, que voltam
//  sozinhos no combate seguinte (é a mesma gente toda semana).
//
//  Quem abre a lista é o botão "⚔ Iniciativa" do Painel de combate
//  (js/monstros.js chama GA_Iniciativa.abrir()).
// ═══════════════════════════════════════════════════════════════════
(function () {
  'use strict';

  const esc = window.GA_esc;

  let mesa = null;            // último estado do GA_Mesa
  let linhas = {};            // id → { nome, tipo, ordem }
  let valores = {};           // id → { valor, mod }   (só o mestre)
  let atual = null, rodada = 1;
  let refs = [], salaLigada = '';
  let recado = '';            // aviso de uma vez só, no lugar da lista vazia

  const LOCAL_KEY   = 'grifosAlados.iniciativaLocal';    // a lista deste navegador
  const GRUPO_KEY   = 'grifosAlados.iniciativaGrupo';    // os nomes dos jogadores
  const ABERTO_KEY  = 'grifosAlados.iniciativaAberta';   // recolhido ou não
  const VISIVEL_KEY = 'grifosAlados.iniciativaVisivel';  // aberto pelo botão ⚔

  function db() { return window.GA_Mesa ? window.GA_Mesa.db() : null; }

  // ── ONDE ESTAMOS ─────────────────────────────────────────────────
  let _paginaMestre = null;
  function paginaDoMestre() {
    // a aba ⚔ Combates só existe no index.html; os scripts são `defer`,
    // então o DOM já está montado quando isto roda pela primeira vez
    if (_paginaMestre === null) _paginaMestre = !!document.getElementById('monstros');
    return _paginaMestre;
  }
  function naMesa() { return !!(mesa && mesa.souMembro); }
  function local()  { return paginaDoMestre() && !naMesa(); }
  function mando()  { return local() || !!(mesa && mesa.transmite); }   // mestre ou auxiliar
  function base()    { return 'mesas/' + mesa.mesaId + '/iniciativa'; }
  //  Os valores moram FORA do nó da iniciativa, e não dentro dele: no
  //  Firebase a permissão de leitura DESCE para os filhos, então um
  //  "valores" aninhado seria legível por qualquer membro — e o combinado
  //  é que o jogador não vê número nenhum. Nó irmão, regra própria.
  function baseVal() { return 'mesas/' + mesa.mesaId + '/iniciativaValores'; }

  // ── A LISTA DESTE NAVEGADOR ──────────────────────────────────────
  function zerar() { linhas = {}; valores = {}; atual = null; rodada = 1; }
  function salvarLocal() {
    try {
      localStorage.setItem(LOCAL_KEY, JSON.stringify({
        linhas: linhas, valores: valores, atual: atual, rodada: rodada,
      }));
    } catch (e) {}
  }
  function carregarLocal() {
    try {
      const j = JSON.parse(localStorage.getItem(LOCAL_KEY) || 'null');
      linhas  = (j && j.linhas)  || {};
      valores = (j && j.valores) || {};
      atual   = (j && j.atual)   || null;
      rodada  = (j && j.rodada)  || 1;
    } catch (e) { zerar(); }
  }

  // O GRUPO: os nomes que o mestre digitou na mão. Ficam guardados para
  // voltarem sozinhos na próxima vez que ele montar — mesa de amigos é a
  // mesma gente toda semana, e redigitar quatro nomes por combate cansa.
  // Tirar alguém da lista com o ✕ também tira do grupo (é o que "não
  // quero mais este aqui" quer dizer).
  function grupo() {
    try { const g = JSON.parse(localStorage.getItem(GRUPO_KEY) || '[]'); return Array.isArray(g) ? g : []; }
    catch (e) { return []; }
  }
  function salvarGrupo(g) { try { localStorage.setItem(GRUPO_KEY, JSON.stringify(g.slice(0, 30))); } catch (e) {} }
  function chave(nome) { return String(nome || '').trim().toLowerCase(); }
  function lembrarNoGrupo(nome) {
    const g = grupo();
    if (!chave(nome) || g.some(n => chave(n) === chave(nome))) return;
    g.push(String(nome).trim()); salvarGrupo(g);
  }
  function esquecerDoGrupo(nome) {
    salvarGrupo(grupo().filter(n => chave(n) !== chave(nome)));
  }

  // ── A FICHA DE QUEM ESTÁ NA LISTA ────────────────────────────────
  //  O PV que aparece ao lado do nome sai da ficha de personagem, e sai
  //  pela porta que o ficha.js abriu (`GA_Ficha.visiveis`). Quem vê o
  //  quê continua sendo decisão do BANCO, não desta tela: o jogador só
  //  enxerga as fichas dele, o mestre e o auxiliar enxergam as da mesa.
  //  Ou seja — o jogador vê o próprio PV na lista, e o do vizinho não
  //  chega nem aqui. Nada de criatura entra por este caminho.
  function fichasVisiveis() {
    try {
      return (window.GA_Ficha && window.GA_Ficha.visiveis) ? window.GA_Ficha.visiveis() : [];
    } catch (e) { return []; }
  }
  function maisNova(lista) {
    return lista.slice().sort((a, b) => (b.atualizadoEm || 0) - (a.atualizadoEm || 0))[0];
  }
  //  Três maneiras de casar, da mais firme para a mais frouxa: o id
  //  guardado na linha, o dono (o uid de quem está na mesa) e o nome.
  //  O nome vale pelos DOIS lados da ficha — o do personagem e o de
  //  quem joga —, porque o mestre tanto digita "Zézinho" quanto
  //  "Cleber" no campo de quem faltou.
  function fichaDaLinha(l, fichas) {
    if (!l || l.tipo !== 'jogador') return null;
    const lista = fichas || fichasVisiveis();
    if (!lista.length) return null;
    if (l.fichaId) {
      const f = lista.find(x => x.id === l.fichaId);
      if (f) return f;
    }
    const doNome = lista.filter(f => chave(f.nome) && chave(f.nome) === chave(l.nome));
    if (l.uid) {
      const daPessoa = lista.filter(f => f.dono === l.uid);
      const casado = doNome.find(f => f.dono === l.uid);
      if (casado) return casado;
      if (daPessoa.length) return maisNova(daPessoa);
    }
    if (doNome.length) return maisNova(doNome);
    const doJogador = lista.filter(f => chave(f.jogador) && chave(f.jogador) === chave(l.nome));
    if (doJogador.length) return maisNova(doJogador);
    return null;
  }
  //  A ficha de um membro da mesa, na hora de montar a lista: com uma
  //  só, é ela; com várias, a mexida mais recentemente (e o nome do
  //  personagem aparece na nuvem, para o engano não ser mudo).
  function fichaDoMembro(uid, fichas) {
    const dele = (fichas || fichasVisiveis()).filter(f => f.dono === uid);
    return dele.length ? maisNova(dele) : null;
  }

  // ── ASSINATURAS ──────────────────────────────────────────────────
  function desligarRefs() {
    refs.forEach(r => { try { r.ref.off('value', r.cb); } catch (e) {} });
    refs = [];
    salaLigada = '';
  }
  function ligar(caminho, cb) {
    const b = db(); if (!b) return;
    const ref = b.ref(caminho);
    const fn = ref.on('value', snap => { cb(snap.val()); render(); },
      err => console.warn('[iniciativa] ' + caminho + ':', err && err.message));
    refs.push({ ref: ref, cb: fn });
  }
  function assinar() {
    if (local()) {                    // fora de mesa: a lista é a deste navegador
      if (salaLigada === '@local') return;
      desligarRefs(); salaLigada = '@local'; recado = '';
      return carregarLocal();
    }
    if (!naMesa()) { desligarRefs(); zerar(); return; }
    if (mesa.mesaId === salaLigada) return;
    desligarRefs(); zerar(); recado = '';
    salaLigada = mesa.mesaId;
    ligar(base() + '/linhas', v => { linhas = v || {}; });
    ligar(base() + '/atual',  v => { atual = v || null; });
    ligar(base() + '/rodada', v => { rodada = v || 1; });
    // os valores são só do mestre — assinar sendo jogador daria um
    // "permission denied" no console a cada carga, e por nada
    if (mando()) ligar(baseVal(), v => { valores = v || {}; });
  }

  // ── A LISTA ──────────────────────────────────────────────────────
  function emOrdem() {
    return Object.keys(linhas)
      .map(id => Object.assign({ id: id }, linhas[id]))
      .sort((a, b) => (a.ordem || 0) - (b.ordem || 0));
  }
  function quantas() { return Object.keys(linhas).length; }
  function idSeguinte() {
    const lista = emOrdem();
    if (!lista.length) return null;
    const i = lista.findIndex(l => l.id === atual);
    return { proximo: lista[(i + 1) % lista.length].id, virou: i >= 0 && i === lista.length - 1 };
  }

  // ── ESCRITAS (só quem manda) ─────────────────────────────────────
  // O patch vem no formato do Firebase ('linhas/ID/ordem': 2). Na lista
  // local, aplicamos os mesmos caminhos à mão — assim o resto do arquivo
  // não precisa saber em que casa a lista está.
  function aplicarLocal(caminho, valor) {
    const p = String(caminho).split('/');
    if (p[0] === 'atual')  { atual  = valor; return; }
    if (p[0] === 'rodada') { rodada = valor; return; }
    if (p[0] === 'linhas' && p[1] && p[2] && linhas[p[1]]) linhas[p[1]][p[2]] = valor;
  }
  function gravar(patch) {
    if (!mando()) return;
    if (local()) {
      Object.keys(patch).forEach(k => aplicarLocal(k, patch[k]));
      salvarLocal(); return render();
    }
    const b = db(); if (!b) return;
    b.ref(base()).update(patch)
      .catch(e => console.warn('[iniciativa] não deu para gravar:', e && e.message));
  }

  // Monta a lista do zero: as criaturas da cena narrada + quem está na
  // mesa + o grupo. Cada criatura rola 1d20 + o modificador dela; os
  // jogadores entram sem valor, para o mestre preencher com o que cada
  // um rolou.
  function montar() {
    if (!mando()) return;
    recado = '';
    const cena = window.GA_Combates ? window.GA_Combates.cenaParaIniciativa() : null;
    const novas = [];

    const criaturas = cena ? cena.criaturas : [];
    // três goblins numa cena viram "Goblin 1", "Goblin 2", "Goblin 3": a
    // lista serve para saber DE QUEM é a vez, e três linhas idênticas com
    // valores diferentes não dizem isso. Nome que aparece uma vez só fica
    // como está.
    const repetidos = {};
    criaturas.forEach(cr => { const k = chave(cr.nome); repetidos[k] = (repetidos[k] || 0) + 1; });
    const contados = {};
    criaturas.forEach(cr => {
      const k = chave(cr.nome);
      let nome = cr.nome;
      if (repetidos[k] > 1) { contados[k] = (contados[k] || 0) + 1; nome = cr.nome + ' ' + contados[k]; }
      const d = window.GA_Dados ? window.GA_Dados.rolar(20) : 0;
      novas.push({ nome: nome, tipo: 'criatura', valor: d + (cr.mod || 0), mod: cr.mod || 0 });
    });

    // os jogadores entram sempre, mesmo sem valor: a lista tem de mostrar
    // o grupo inteiro, e o que falta é o número
    const fichas = fichasVisiveis();
    const vistos = {};
    function jogador(nome, uid, ficha) {
      const k = chave(nome);
      if (!k || vistos[k]) return;
      vistos[k] = 1;
      novas.push({
        nome: String(nome).trim(), tipo: 'jogador', valor: null,
        // o modificador de Iniciativa em T20 É a Destreza, e é ele que
        // desempata quem rolou o mesmo número
        mod: ficha ? (ficha.des || 0) : 0,
        uid: uid || '', fichaId: ficha ? ficha.id : '',
      });
    }
    if (naMesa()) {
      Object.keys(mesa.membros || {}).forEach(uid => {
        const m = mesa.membros[uid];
        if (!m || m.papel === 'espectador') return;
        // Quando dá para saber qual é a ficha, a linha nasce com o nome
        // do PERSONAGEM e amarrada a ela — é o que traz o PV para o lado
        // do nome, e o que tira da lista de combate o nome da conta.
        const f = fichaDoMembro(uid, fichas);
        jogador((f && f.nome) || m.nome || 'jogador', uid, f);
      });
    }
    // um nome por vez: o forEach entrega o índice no segundo argumento,
    // e ele viraria o `uid` da linha
    grupo().forEach(n => jogador(n, '', fichaDaLinha({ tipo: 'jogador', nome: n }, fichas)));

    if (!novas.length) {
      recado = cena
        ? 'A cena "' + cena.nome + '" não tem criaturas. Escreva aqui embaixo quem entra no combate.'
        : 'Nenhuma cena para montar. Escolha a cena que você está narrando no Painel de combate — ou escreva os nomes aqui embaixo.';
      return render();
    }
    gravarLista(novas);
  }

  // Ordena por valor (maior primeiro), desempatando pelo modificador —
  // que em T20 é a Destreza. Sem valor vai para o fim, esperando o número.
  function ordenar(lista) {
    return lista.slice().sort((a, b) => {
      const va = (a.valor == null) ? -Infinity : a.valor;
      const vb = (b.valor == null) ? -Infinity : b.valor;
      if (vb !== va) return vb - va;
      if ((b.mod || 0) !== (a.mod || 0)) return (b.mod || 0) - (a.mod || 0);
      return String(a.nome).localeCompare(String(b.nome), 'pt-BR');
    });
  }

  function gravarLista(lista, manterAtual) {
    if (!mando()) return;
    const ordenada = ordenar(lista);
    const publico = { linhas: {}, rodada: manterAtual ? (rodada || 1) : 1 };
    const secreto = {};
    ordenada.forEach((l, i) => {
      const id = l.id || ('l' + Date.now().toString(36) + i.toString(36));
      const linha = { nome: String(l.nome || ''), tipo: l.tipo === 'jogador' ? 'jogador' : 'criatura', ordem: i };
      // De quem é a linha e qual ficha ela puxa. É público, como o resto
      // da lista — e não abre nada: quem lê a FICHA continua sendo só o
      // dono dela e o mestre, pela regra do banco.
      if (l.uid) linha.uid = String(l.uid);
      if (l.fichaId) linha.fichaId = String(l.fichaId);
      publico.linhas[id] = linha;
      secreto[id] = { valor: (l.valor == null ? null : l.valor), mod: l.mod || 0 };
    });
    const ids = Object.keys(publico.linhas);
    publico.atual = (manterAtual && ids.indexOf(atual) >= 0) ? atual : (ids.length ? ids[0] : null);

    if (local()) {
      linhas = publico.linhas; valores = secreto;
      atual = publico.atual;   rodada = publico.rodada;
      salvarLocal(); return render();
    }
    const b = db(); if (!b) return;
    // os dois numa escrita só: a lista e os valores não podem ficar
    // desencontrados nem por um instante
    b.ref('mesas/' + mesa.mesaId).update({ iniciativa: publico, iniciativaValores: secreto })
      .catch(e => console.warn('[iniciativa] não deu para montar:', e && e.message));
  }

  // A lista de agora, no formato que o gravarLista come.
  function listaAtual() {
    return emOrdem().map(l => ({
      id: l.id, nome: l.nome, tipo: l.tipo,
      uid: l.uid || '', fichaId: l.fichaId || '',
      valor: (valores[l.id] && valores[l.id].valor != null) ? valores[l.id].valor : null,
      mod: (valores[l.id] && valores[l.id].mod) || 0,
    }));
  }

  function passarTurno() {
    if (!mando()) return;
    const p = idSeguinte();
    if (!p) return;
    gravar(p.virou ? { atual: p.proximo, rodada: (rodada || 1) + 1 } : { atual: p.proximo });
  }

  // Arrastar é ↑/↓: troca a ordem com a vizinha e regrava só as duas.
  function mover(id, passo) {
    if (!mando()) return;
    const lista = emOrdem();
    const i = lista.findIndex(l => l.id === id);
    const j = i + passo;
    if (i < 0 || j < 0 || j >= lista.length) return;
    const patch = {};
    patch['linhas/' + lista[i].id + '/ordem'] = j;
    patch['linhas/' + lista[j].id + '/ordem'] = i;
    gravar(patch);
  }

  function mudarValor(id, valor) {
    if (!mando()) return;
    const n = parseInt(valor, 10);
    const v = isNaN(n) ? null : n;
    if (local()) {
      if (!valores[id]) valores[id] = { valor: null, mod: 0 };
      valores[id].valor = v;
      return salvarLocal();   // sem render: o campo está sob o dedo dele
    }
    const b = db(); if (!b) return;
    b.ref(baseVal() + '/' + id + '/valor').set(v)
      .catch(e => console.warn('[iniciativa] não deu para mudar o valor:', e && e.message));
  }
  function reordenar() { gravarLista(listaAtual(), true); }

  function remover(id) {
    if (!mando()) return;
    const alvo = linhas[id];
    if (alvo && alvo.tipo === 'jogador') esquecerDoGrupo(alvo.nome);
    const lista = listaAtual().filter(l => l.id !== id);
    if (!lista.length) return limpar();
    gravarLista(lista, true);
  }

  // Aceita vários nomes de uma vez ("Cleber, Zézinho, Elias"): é assim
  // que se monta o grupo na primeira vez. O valor digitado vale para o
  // primeiro nome; o resto entra sem número.
  function acrescentar(txt, valor) {
    if (!mando()) return;
    const nomes = String(txt || '').split(',').map(s => s.trim()).filter(Boolean);
    if (!nomes.length) return;
    const n = parseInt(valor, 10);
    const novas = nomes.map((nome, i) => ({
      nome: nome, tipo: 'jogador', valor: (i === 0 && !isNaN(n)) ? n : null, mod: 0,
    }));
    nomes.forEach(lembrarNoGrupo);
    recado = '';
    gravarLista(listaAtual().concat(novas), true);
  }

  function limpar() {
    if (!mando()) return;
    if (local()) {
      zerar(); recado = '';
      try { localStorage.removeItem(LOCAL_KEY); } catch (e) {}
      return render();
    }
    const b = db(); if (!b) return;
    b.ref('mesas/' + mesa.mesaId).update({ iniciativa: null, iniciativaValores: null })
      .catch(e => console.warn('[iniciativa] não deu para limpar:', e && e.message));
  }

  // ── O PAINEL ─────────────────────────────────────────────────────
  let painel = null;
  let aberto = true;      // recolhido ou expandido
  let visivel = false;    // fora de mesa: só aparece quando ele abre pelo ⚔
  let chamando = false;   // pisca uma vez, quando abre pelo botão
  let chamada = null;
  let tinhaLista = false; // para reabrir sozinho quando um combate começa
  try { aberto  = localStorage.getItem(ABERTO_KEY)  !== '0'; } catch (e) {}
  try { visivel = localStorage.getItem(VISIVEL_KEY) === '1'; } catch (e) {}
  function guardar(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  function montarPainel() {
    if (painel) return painel;
    painel = document.createElement('div');
    painel.id = 'gaIniciativa';
    painel.className = 'ga-ini';
    const col = window.GA_ColunaMesa ? window.GA_ColunaMesa() : document.body;
    col.insertBefore(painel, col.firstChild);   // acima das rolagens
    painel.addEventListener('click', aoClicar);
    painel.addEventListener('change', aoMudar);
    painel.addEventListener('keydown', e => {
      if (e.key !== 'Enter') return;
      if (e.target.id === 'gaIniNome' || e.target.id === 'gaIniValor') {
        e.preventDefault();
        acrescentarDoCampo();
      }
    });
    return painel;
  }
  function valorDe(id) { const el = document.getElementById(id); return el ? String(el.value || '').trim() : ''; }
  function acrescentarDoCampo() {
    acrescentar(valorDe('gaIniNome'), valorDe('gaIniValor'));
    const n = document.getElementById('gaIniNome');  if (n) n.value = '';
    const v = document.getElementById('gaIniValor'); if (v) v.value = '';
  }

  function aoClicar(e) {
    const btn = e.target.closest('[data-ini]');
    if (!btn) return;
    e.preventDefault();
    const acao = btn.dataset.ini, id = btn.dataset.id;
    if (acao === 'toggle') {
      aberto = !aberto; guardar(ABERTO_KEY, aberto ? '1' : '0');
      return render();
    }
    if (acao === 'fechar') {
      visivel = false; guardar(VISIVEL_KEY, '0');
      return render();
    }
    if (acao === 'montar') {
      // remontar zera o combate em andamento — pergunta antes
      if (quantas() && !confirm('Montar de novo apaga a ordem deste combate e rola tudo outra vez. Continuar?')) return;
      return montar();
    }
    // o PV: abre a ficha daquela pessoa na aba do site. Vale para o
    // jogador também — a ficha dele é dele.
    if (acao === 'ficha') {
      if (window.GA_Ficha && window.GA_Ficha.abrirNaTela) window.GA_Ficha.abrirNaTela(btn.dataset.ficha);
      return;
    }
    if (acao === 'passar')  return passarTurno();
    if (acao === 'limpar')  return limpar();
    if (acao === 'sobe')    return mover(id, -1);
    if (acao === 'desce')   return mover(id, 1);
    if (acao === 'tira')    return remover(id);
    if (acao === 'ordena')  return reordenar();
    if (acao === 'add')     return acrescentarDoCampo();
    if (acao === 'vez') return gravar({ atual: id });    // clicar numa linha dá a vez a ela
  }
  function aoMudar(e) {
    const campo = e.target.closest('input[data-ini-valor]');
    if (campo) mudarValor(campo.dataset.iniValor, campo.value);
  }

  // ── O PV DA FICHA, AO LADO DO NOME ───────────────────────────────
  //  Cabe num painel de 19rem porque só o essencial é grande: o número
  //  forte é o que a pessoa TEM agora — o atual mais o temporário, que
  //  é o primeiro a ser gasto (p. 105) —, e o pequeno é o máximo. A cor
  //  conta de longe como vai a vida; a nuvem conta por escrito.
  //  Clicar abre a ficha: é lá que o dano se aplica, com a regra dos
  //  temporários no meio. Daqui não se mexe em PV de ninguém.
  function nomeDoDono(uid) {
    const m = mesa && mesa.membros && mesa.membros[uid];
    return (m && m.nome) || '';
  }
  function pvHtml(l, fichas) {
    const f = fichaDaLinha(l, fichas);
    if (!f) return '';
    const temp  = f.pv.temp || 0;
    const max   = f.pv.max || 0;
    // O que ela TEM para gastar é o atual mais o temporário — e é esse
    // número que manda no tamanho e na cor. Separar os dois faria a cor
    // dizer "caído" ao lado de um número vivo (PV atual negativo com
    // temporário em pé, que se digita direto no campo).
    const total = f.pv.atual + temp;
    const parte = max > 0 ? total / max : 1;
    const cor = total <= 0   ? ' ga-ini-pv--caido'
              : parte <= 0.25 ? ' ga-ini-pv--mal'
              : parte <= 0.5  ? ' ga-ini-pv--meio' : '';
    const dono = nomeDoDono(f.dono);
    const titulo = 'PV de ' + (f.nome || 'sem nome') + (dono ? ' (ficha de ' + dono + ')' : '') +
      ': ' + f.pv.atual + ' de ' + max +
      (temp ? ' · ' + temp + ' temporário' + (temp > 1 ? 's' : '') + ', gastos primeiro' : '') +
      (total <= 0 ? ' · caído' : '') +
      ' · clique para abrir a ficha';
    return '<button type="button" class="ga-ini-pv' + cor + (temp ? ' ga-ini-pv--temp' : '') + '"' +
      ' data-ini="ficha" data-ficha="' + esc(f.id) + '" data-ini-pv="' + esc(l.id) + '"' +
      ' title="' + esc(titulo) + '">' +
      '<b>' + total + '</b><i>/' + max + '</i></button>';
  }

  function linhaHtml(l, i, fichas) {
    const eu = l.id === atual;
    const v = valores[l.id] || {};
    const icone = l.tipo === 'jogador' ? '🧑' : '👹';
    const controles = mando() ? '' +
      '<input class="ga-ini-val" type="number" inputmode="numeric" value="' +
        (v.valor == null ? '' : esc(v.valor)) + '" data-ini-valor="' + esc(l.id) + '" title="Valor da iniciativa">' +
      '<button type="button" class="ga-ini-mini" data-ini="sobe" data-id="' + esc(l.id) + '" title="Subir">↑</button>' +
      '<button type="button" class="ga-ini-mini" data-ini="desce" data-id="' + esc(l.id) + '" title="Descer">↓</button>' +
      '<button type="button" class="ga-ini-mini ga-ini-mini--x" data-ini="tira" data-id="' + esc(l.id) + '" title="Tirar da lista">✕</button>'
      : '';
    return '<li class="ga-ini-linha' + (eu ? ' ga-ini-linha--vez' : '') + '">' +
      '<button type="button" class="ga-ini-nome" data-ini="' + (mando() ? 'vez' : '') + '" data-id="' + esc(l.id) + '"' +
        (mando() ? ' title="Dar a vez a esta linha"' : ' disabled') + '>' +
        '<span class="ga-ini-pos">' + (i + 1) + '</span>' + icone + ' ' + esc(l.nome) +
      '</button>' + pvHtml(l, fichas) + controles +
    '</li>';
  }

  // O PV mudou na ficha e o dedo do mestre está dentro do painel (ele
  // digita o valor da iniciativa de alguém): redesenhar arrancaria o
  // foco no meio do número. Então só os PV são repintados, no lugar.
  function pintarPvs() {
    if (!painel) return;
    const fichas = fichasVisiveis();
    painel.querySelectorAll('[data-ini-pv]').forEach(el => {
      const l = linhas[el.dataset.iniPv];
      if (!l) return;
      const novo = pvHtml(Object.assign({ id: el.dataset.iniPv }, l), fichas);
      if (!novo) return;                       // a ficha sumiu: fica como está até o próximo render
      const molde = document.createElement('div');
      molde.innerHTML = novo;
      const b = molde.firstChild;
      el.className = b.className;
      el.title = b.title;
      el.innerHTML = b.innerHTML;
    });
  }

  // Um combate que começa abre o painel sozinho — inclusive ao recarregar
  // a página com a lista salva, e inclusive quando quem montou foi o
  // auxiliar do outro lado da mesa. É a transição de vazia para cheia que
  // manda; enquanto ela não vem, o ✕ mantém o painel fechado.
  function conferirLista() {
    const n = quantas();
    if (n && !tinhaLista) { visivel = true; guardar(VISIVEL_KEY, '1'); }
    tinhaLista = n > 0;
  }

  function render() {
    conferirLista();
    const lista = emOrdem();
    const temLista = lista.length > 0;
    // Quem vê o painel:
    //  • o mestre na página dele → o que ele mandou (o ✕ fecha, o botão
    //    ⚔ Iniciativa do Painel de combate traz de volta);
    //  • o auxiliar no jogadores.html → sempre, que lá não há botão nenhum
    //    para reabrir;
    //  • o jogador → só quando há combate.
    const comBotao = paginaDoMestre() && mando();
    const mostrar = comBotao ? visivel
                  : mando()  ? true
                             : (naMesa() && temLista);
    if (!mostrar) {
      if (painel) { painel.remove(); painel = null; }
      return;
    }
    const el = montarPainel();
    el.className = 'ga-ini' + (aberto ? '' : ' ga-ini--fechado') + (chamando ? ' ga-ini--chamou' : '');

    let corpo = '';
    if (aberto) {
      const fichas = fichasVisiveis();
      corpo = temLista
        ? '<ol class="ga-ini-lista">' + lista.map((l, i) => linhaHtml(l, i, fichas)).join('') + '</ol>'
        : '<p class="ga-ini-vazio">' + esc(recado ||
            'Nenhuma iniciativa rolada. Monte com a cena que você está narrando.') + '</p>';
      if (mando()) {
        corpo += '<div class="ga-ini-acoes">' +
          '<button type="button" class="ga-ini-btn ga-ini-btn--forte" data-ini="montar" ' +
            'title="Rola 1d20 para cada criatura da cena narrada e traz os jogadores">' +
            (temLista ? '⚔ Montar de novo' : '⚔ Montar com a cena') + '</button>' +
          (temLista ? '<button type="button" class="ga-ini-btn" data-ini="ordena" title="Reordenar pelos valores">⇅ Ordenar</button>' +
                      '<button type="button" class="ga-ini-btn ga-ini-btn--x" data-ini="limpar">🗑 Limpar</button>' : '') +
        '</div>';
        corpo += '<div class="ga-ini-add">' +
          '<input type="text" id="gaIniNome" placeholder="quem faltou (vários, por vírgula)" autocomplete="off">' +
          '<input type="number" id="gaIniValor" placeholder="ini" inputmode="numeric">' +
          '<button type="button" class="ga-ini-btn" data-ini="add">＋</button>' +
        '</div>';
        if (local()) {
          corpo += '<p class="ga-ini-nota">Esta lista está só nesta tela. Entre numa mesa (aba 🎲) para os jogadores verem a ordem.</p>';
        }
      }
    }

    el.innerHTML =
      '<div class="ga-ini-cab">' +
        '<button type="button" class="ga-ini-tit" data-ini="toggle" title="Recolher / abrir">⚔ Iniciativa' +
          (temLista ? ' <span class="ga-ini-rodada">rodada ' + rodada + '</span>' : '') + '</button>' +
        (aberto && mando() && temLista
          ? '<button type="button" class="ga-ini-passar" data-ini="passar" title="Passar o turno">▶</button>' : '') +
        '<button type="button" class="ga-ini-x" data-ini="toggle" title="' + (aberto ? 'Recolher' : 'Abrir') + '">' +
          (aberto ? '▾' : '▴') + '</button>' +
        (comBotao ? '<button type="button" class="ga-ini-x" data-ini="fechar" ' +
            'title="Fechar (o botão ⚔ Iniciativa do Painel de combate traz de volta)">✕</button>' : '') +
      '</div>' + corpo;
  }

  // ── O QUE O PAINEL DE COMBATE CHAMA ──────────────────────────────
  // Um clique só: abre a lista, e se ela estiver vazia já monta com a
  // cena narrada. Nunca apaga um combate em andamento — para refazer há
  // o "⚔ Montar de novo" de dentro do painel, que pergunta antes.
  function abrir() {
    visivel = true; guardar(VISIVEL_KEY, '1');
    aberto  = true; guardar(ABERTO_KEY,  '1');
    if (!quantas()) montar();
    render();
    piscar();
  }
  function piscar() {
    chamando = true;
    if (painel) painel.classList.add('ga-ini--chamou');
    clearTimeout(chamada);
    chamada = setTimeout(() => {
      chamando = false;
      if (painel) painel.classList.remove('ga-ini--chamou');
    }, 1600);
  }
  window.GA_Iniciativa = {
    abrir: abrir,
    quantas: quantas,
    rodadaAtual: function () { return rodada; },
  };

  // ⚠ O GA_Mesa nasce no mesa.js, que é carregado DEPOIS deste arquivo
  //  nas duas páginas (ele depende do Firebase, que vem do CDN). E um
  //  script `defer` roda com document.readyState já em "interactive" —
  //  não em "loading". Ou seja: o init() de baixo acontecia ANTES de o
  //  mesa.js existir, caía no `else` e NUNCA registrava o aoMudar.
  //
  //  Para o mestre isso passava despercebido, porque a lista local dele
  //  não depende do banco. Para o JOGADOR, era a iniciativa não aparecer
  //  nunca — nem depois de entrar na mesa, nem com combate rolando.
  //  Por isso a segunda chance: se o GA_Mesa ainda não chegou, tenta de
  //  novo no fim da fila dos `defer`.
  //  O MESMO CUIDADO VALE PARA O GA_Ficha: o ficha.js também é carregado
  //  depois deste arquivo, e é dele que vem o PV que aparece na lista.
  //  Registrar cedo demais aqui seria o mesmo defeito de antes, calado.
  let fichaLigada = false;
  function ligarFicha() {
    if (fichaLigada || !window.GA_Ficha || !window.GA_Ficha.aoMudar) return;
    fichaLigada = true;
    window.GA_Ficha.aoMudar(function () {
      // com o dedo dentro do painel (ele digita a iniciativa de alguém),
      // redesenhar arrancaria o foco: só os PV são repintados
      if (painel && painel.contains(document.activeElement)) return pintarPvs();
      render();
    });
  }

  function init(segundaChance) {
    ligarFicha();
    if (window.GA_Mesa) {
      window.GA_Mesa.aoMudar(function (e) { mesa = e; assinar(); render(); });
      return;
    }
    // Ainda há `defer` na fila? O mesa.js é um deles. O DOMContentLoaded
    // só dispara depois que TODOS rodaram — é lá que se sabe de verdade
    // se este site tem mesa ou não.
    if (!segundaChance && document.readyState !== 'complete') {
      document.addEventListener('DOMContentLoaded', function () { init(true); }, { once: true });
      return;
    }
    // sem Firebase (CDN fora do ar, config em branco) a lista local
    // continua de pé — ela nunca dependeu do banco
    assinar(); render();
  }
  init();
})();
