// ═══════════════════════════════════════════════════════════════════
//  NOTICIAS.JS — Renderização dinâmica e edição das notícias
//  Localização: /grifos-alados/js/noticias.js
//
//  Cada RPG tem a sua própria gazeta: os dados são uma lista de
//  CAMPANHAS ("Penitência de Azgher", "Nuevo Sol", …) e cada campanha
//  guarda os seus anos e notícias. A barra de abas no topo escolhe
//  qual noticiário está aberto; a escolha fica no localStorage.
//
//  Lê:    js/noticias-data.js  (window.NOTICIAS_DADOS)
//  Salva: data/noticias.json + js/noticias-data.js (POST /api/noticias),
//         ou pelo botão "⬇ Baixar arquivo", que gera o mesmo
//         js/noticias-data.js pelo navegador — sem precisar do server.py.
// ═══════════════════════════════════════════════════════════════════

(function () {
  'use strict';

  // ── ESTADO GLOBAL ────────────────────────────────────────────────
  const CAMP_KEY = 'grifosAlados.noticiasCampanha';

  let dados       = { campanhas: [] };
  let campAtiva   = 0;              // índice da campanha aberta
  let edicaoAtiva = false;

  // ── O QUE VEM DO BANCO ───────────────────────────────────────────
  //  A gazeta tem DOIS chãos, e a ordem importa: primeiro o arquivo
  //  `js/noticias-data.js` (que funciona offline, do disco, sem conta
  //  nenhuma), depois o banco POR CIMA — cada campanha publicada
  //  substitui a do arquivo, e as que só existem no banco entram no
  //  fim. Quem cuida do Firebase é o `js/noticias-mesa.js`; aqui só se
  //  desenha e se manda escrever.
  let remotas = {};                 // id → { nome, dono, noticias, autor }
  let meuUid  = '';
  let doArquivo = { campanhas: [] };   // o que veio do noticias-data.js, intacto

  // ── ID ÚNICO ─────────────────────────────────────────────────────
  function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  }

  // Id legível para a campanha ("Nuevo Sol" → "nuevo-sol"). É ele que
  // fica guardado no localStorage, então nunca muda ao renomear.
  function idDeCampanha(nome) {
    const base = (nome || '')
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')      // tira acentos
      .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'campanha';
    let id = base;
    let n  = 2;
    while (dados.campanhas.some(c => c.id === id)) id = base + '-' + (n++);
    return id;
  }

  // ── ESCAPE HTML (utilitário compartilhado, definido em script.js) ──
  const esc = window.GA_esc;

  // ── INICIALIZAÇÃO ────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    carregarNoticias();
    criarBotaoEdicao();

    // Atualiza visibilidade do botão ao trocar de seção
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () =>
        setTimeout(sincronizarBotaoEdicao, 60)
      );
    });
  });

  // ── CARREGAR ─────────────────────────────────────────────────────
  //  Lê as notícias da variável window.NOTICIAS_DADOS, definida pelo
  //  arquivo js/noticias-data.js. Como é um <script>, funciona mesmo
  //  com o index.html aberto offline (sem o server.py).
  function carregarNoticias() {
    doArquivo = normalizar(window.NOTICIAS_DADOS);
    dados = juntarComAMesa();
    if (!dados.campanhas.length) {
      console.warn('[noticias] noticias-data.js não encontrado ou sem campanhas.');
    }
    campAtiva = indiceCampanhaSalva();
    renderizar();
  }

  // O arquivo é a base; o banco entra por cima. Uma campanha publicada
  // manda no nome e nas notícias (é a versão viva dela); as que só
  // existem no banco entram no fim, na ordem em que o banco as devolve.
  function juntarComAMesa() {
    // as mesmas referências, não cópias: o que for editado numa campanha
    // do arquivo cai no arquivo na hora, e não se perde no próximo eco
    const saida = doArquivo.campanhas.slice();
    Object.keys(remotas).forEach(id => {
      const r = remotas[id] || {};
      const viva = {
        id: id,
        nome: r.nome || id,
        anos: paraLista(r.noticias).map(a => ({
          ano: (a && a.ano) || '',
          noticias: paraLista(a && a.noticias),
        })),
        daMesa: true,
        dono: r.dono || '',
        autor: r.autor || '',
      };
      const i = saida.findIndex(c => c.id === id);
      if (i >= 0) saida[i] = viva; else saida.push(viva);
    });
    return { campanhas: saida };
  }

  // O Realtime Database devolve array como objeto de chaves numéricas
  // quando falta um índice — e a gazeta veio de um arquivo escrito à
  // mão, então falta. Isto endireita os dois casos.
  function paraLista(v) {
    if (Array.isArray(v)) return v.filter(x => x != null);
    if (v && typeof v === 'object') {
      return Object.keys(v).sort((a, b) => Number(a) - Number(b)).map(k => v[k]).filter(x => x != null);
    }
    return [];
  }

  // Aceita o formato novo ({campanhas:[…]}) e também o antigo
  // ({anos:[…]}, de quando o site tinha um noticiário só).
  function normalizar(d) {
    let camps = [];
    if (d && Array.isArray(d.campanhas))  camps = d.campanhas;
    else if (d && Array.isArray(d.anos))  camps = [{ nome: 'Campanha', anos: d.anos }];

    return {
      campanhas: camps.map((c, i) => ({
        id:   c.id   || ('campanha-' + (i + 1)),
        nome: c.nome || ('Campanha ' + (i + 1)),
        anos: Array.isArray(c.anos) ? c.anos : [],
      })),
    };
  }

  function campanhaAtual() { return dados.campanhas[campAtiva] || null; }

  // Reabre a última campanha que o mestre estava lendo.
  function indiceCampanhaSalva() {
    let id = '';
    try { id = localStorage.getItem(CAMP_KEY) || ''; } catch (e) {}
    const i = dados.campanhas.findIndex(c => c.id === id);
    return i >= 0 ? i : 0;
  }

  function lembrarCampanha() {
    const c = campanhaAtual();
    if (c) window.GA_guardar(CAMP_KEY, c.id);
    else   { try { localStorage.removeItem(CAMP_KEY); } catch (e) {} }
  }

  // ── SALVAR ───────────────────────────────────────────────────────
  //  DOIS CAMINHOS, e o primeiro que servir é o que vale:
  //
  //   1. a GAZETA AO VIVO — se esta campanha é minha (ou ainda não tem
  //      dono) e eu entrei com o Google, ela sobe para `campanhas/<id>`
  //      e a manchete aparece na hora para quem estiver com o site
  //      aberto. É a etapa 5 do plano da mesa;
  //   2. o ARQUIVO — o caminho de sempre, para quem não tem banco: o
  //      server.py grava, e sem ele fica o "⬇ Baixar arquivo".
  //
  //  O caminho 2 não foi aposentado de propósito: é ele que mantém a
  //  gazeta de pé offline, do disco e sem conta nenhuma.
  let esperandoPublicar = false;

  function mesaNoticias() { return window.GA_NoticiasMesa || null; }
  function podePublicar(id) {
    const m = mesaNoticias();
    return !!(m && m.possoEscrever(id));
  }

  //  O ARQUIVO GUARDA TUDO O QUE É MEU. Trocar de nome, criar, remover e
  //  reordenar campanha mexe na LISTA, e a lista do banco é um mapa sem
  //  ordem — se o arquivo não acompanhasse, o próximo eco de qualquer
  //  campanha desfaria essas mudanças na tela. A gazeta de outra pessoa
  //  fica de fora: ela é dela, e o meu arquivo não a carrega.
  function guardarNoArquivo() {
    doArquivo = {
      campanhas: dados.campanhas
        // fica de fora só o que eu SEI ser de outra pessoa. Deslogado
        // não se sabe de ninguém — e perder a própria gazeta do backup
        // por causa disso seria bem pior do que carregar uma a mais.
        .filter(c => !(c.dono && meuUid && c.dono !== meuUid))
        .map(c => ({ id: c.id, nome: c.nome, anos: c.anos })),
    };
  }

  async function salvar() {
    guardarNoArquivo();
    const c = campanhaAtual();
    if (c && podePublicar(c.id)) {
      pendentes[c.id] = true;
      esperandoPublicar = true;
      mesaNoticias().publicar({ id: c.id, nome: c.nome, anos: c.anos });
      return;
    }
    try {
      const r = await fetch('/api/noticias', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(paraArquivo()),
      });
      if (!r.ok) throw new Error('HTTP ' + r.status);
      mostrarToast('✔ Salvo');
    } catch (e) {
      mostrarToast('⚠ Sem servidor — use "⬇ Baixar arquivo"');
      console.error('[noticias] Erro ao salvar:', e.message);
    }
  }

  // ── BAIXAR ───────────────────────────────────────────────────────
  //  Gera o js/noticias-data.js igualzinho ao que o server.py escreve.
  //  É só trocar o arquivo na pasta js/ e dar commit para publicar.
  //  O arquivo guarda só o que é dele: id, nome e anos. O que a gazeta
  //  ao vivo carimba por cima (dono, autor, "veio da mesa") fica de
  //  fora — senão o `noticias-data.js` do repositório encheria de uid.
  function paraArquivo() {
    guardarNoArquivo();
    return { campanhas: doArquivo.campanhas };
  }

  function baixarArquivo() {
    const conteudo =
      '// Noticias do Grifos Alados.\n' +
      '// Gerado ao salvar (server.py) ou pelo botao "Baixar arquivo" do site.\n' +
      '// Ele permite que as noticias sejam lidas mesmo offline (sem servidor).\n' +
      'window.NOTICIAS_DADOS = ' + JSON.stringify(paraArquivo(), null, 2) + ';\n';

    const url = URL.createObjectURL(
      new Blob([conteudo], { type: 'text/javascript;charset=utf-8' })
    );
    const a = document.createElement('a');
    a.href     = url;
    a.download = 'noticias-data.js';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    mostrarToast('⬇ Baixado — troque o js/noticias-data.js');
  }

  // ── TOAST ─────────────────────────────────────────────────────────
  function mostrarToast(msg) {
    let t = document.getElementById('ncToast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'ncToast';
      t.className = 'nc-toast';
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.add('nc-toast--visivel');
    clearTimeout(t._timer);
    t._timer = setTimeout(() => t.classList.remove('nc-toast--visivel'), 2200);
  }

  // ══════════════════════════════════════════════════════════════════
  //  O QUE CHEGA DO BANCO
  //  Chamado pelo noticias-mesa.js a cada mudança em `campanhas`.
  // ══════════════════════════════════════════════════════════════════
  const pendentes = {};        // id → tem edição minha ainda subindo

  //  Comparação estável: o Firebase devolve as chaves em outra ordem, e
  //  um JSON.stringify cru acharia diferença onde não há — o que faria
  //  a gazeta piscar a cada eco da própria escrita.
  function canon(v) {
    if (v === null || typeof v !== 'object') return JSON.stringify(v === undefined ? null : v);
    if (Array.isArray(v)) return '[' + v.map(canon).join(',') + ']';
    return '{' + Object.keys(v).sort().map(k => JSON.stringify(k) + ':' + canon(v[k])).join(',') + '}';
  }
  function miolo(c) { return canon({ nome: c.nome || '', anos: c.anos || [] }); }

  function receberDaMesa(mapa, uid) {
    remotas = mapa || {};
    meuUid = uid || '';

    // O que eu acabei de escrever ainda pode não ter voltado do banco.
    // Enquanto não voltar igual, a MINHA versão é a que fica na tela —
    // senão o eco de outra campanha apagaria a manchete meio digitada.
    const minhas = {};
    Object.keys(pendentes).forEach(id => {
      const local = dados.campanhas.find(c => c.id === id);
      if (!local) { delete pendentes[id]; return; }
      const r = remotas[id];
      const voltou = r && miolo({
        nome: r.nome,
        anos: paraLista(r.noticias).map(a => ({ ano: (a && a.ano) || '', noticias: paraLista(a && a.noticias) })),
      }) === miolo(local);
      if (voltou) delete pendentes[id];
      else minhas[id] = local;
    });

    const antes = canon(dados.campanhas.map(c => ({ id: c.id, m: miolo(c) })));
    const idAberta = (campanhaAtual() || {}).id;
    dados = juntarComAMesa();
    Object.keys(minhas).forEach(id => {
      const i = dados.campanhas.findIndex(c => c.id === id);
      if (i >= 0) dados.campanhas[i] = Object.assign(dados.campanhas[i], minhas[id]);
    });

    // a campanha aberta continua aberta, mesmo que a ordem tenha mudado
    const novo = dados.campanhas.findIndex(c => c.id === idAberta);
    if (novo >= 0) campAtiva = novo;
    else if (campAtiva >= dados.campanhas.length) campAtiva = Math.max(0, dados.campanhas.length - 1);

    if (canon(dados.campanhas.map(c => ({ id: c.id, m: miolo(c) }))) !== antes) renderizar();
    else pintarLinhaMesa();
    conferirPublicacao();
  }

  //  O aviso de "publicado" chega por duas portas e não se sabe qual
  //  vem primeiro: a promessa da escrita (mesaMudou) e o eco do banco
  //  (receberDaMesa, que é quem limpa a fila). Então as duas passam
  //  por aqui, e quem chegar depois é que avisa.
  function conferirPublicacao() {
    if (!esperandoPublicar) return;
    const e = mesaNoticias() ? mesaNoticias().estado() : null;
    if (!e) return;
    if (e.erro) {
      esperandoPublicar = false;
      mostrarToast('⚠ ' + (/permission/i.test(e.erro)
        ? 'o banco recusou: esta gazeta não é sua' : e.erro));
      return;
    }
    if (!Object.keys(pendentes).length) {
      esperandoPublicar = false;
      mostrarToast('📡 Publicado na gazeta ao vivo');
    }
  }

  // Login, erro do banco ou publicação concluída: só a linha 📡 muda.
  function mesaMudou() {
    conferirPublicacao();
    pintarLinhaMesa();
  }

  window.GA_Noticias = {
    receberDaMesa: receberDaMesa,
    mesaMudou: mesaMudou,
  };

  // ══════════════════════════════════════════════════════════════════
  //  RENDERIZAÇÃO
  // ══════════════════════════════════════════════════════════════════
  function renderizar() {
    const wrapper = document.querySelector('#noticias .wrapper');
    if (!wrapper) return;
    wrapper.innerHTML = '';

    if (campAtiva >= dados.campanhas.length) {
      campAtiva = Math.max(0, dados.campanhas.length - 1);
    }

    // Com uma campanha só, a barra some fora da edição: a gazeta fica
    // igual à de antes, sem aba sobrando para escolher.
    if (dados.campanhas.length > 1 || edicaoAtiva) {
      wrapper.appendChild(renderizarAbasCampanha());
    }
    if (edicaoAtiva) wrapper.appendChild(renderizarCtrlCampanha());
    const linha = linhaMesa();
    if (linha) wrapper.appendChild(linha);

    const camp = campanhaAtual();

    if (!camp) {
      wrapper.appendChild(avisoVazio('Nenhuma campanha cadastrada.'));
    } else if (!camp.anos.length) {
      wrapper.appendChild(avisoVazio('Nenhuma notícia em ' + camp.nome + '.'));
    } else {
      camp.anos.forEach((anoObj, ai) =>
        wrapper.appendChild(renderizarAno(anoObj, ai))
      );
    }

    if (edicaoAtiva && camp) {
      wrapper.appendChild(criarBotaoNovoAno());
    }

    // Ornamento final
    const orn = document.createElement('div');
    orn.className = 'ornament';
    orn.style.cssText = 'margin:2.5rem 0 0.5rem';
    orn.textContent   = '✦ ✦ ✦';
    wrapper.appendChild(orn);
  }

  function avisoVazio(texto) {
    const p = document.createElement('p');
    p.className   = 'nc-vazio';
    p.textContent = texto;
    return p;
  }

  // ── A LINHA DA GAZETA AO VIVO (📡) ───────────────────────────────
  //  Fora da edição ela é uma frase pequena, e só quando há o que
  //  dizer ("esta gazeta vem da mesa, ao vivo"). Na edição ela conta a
  //  história inteira: de quem é a campanha, se dá para publicar, e o
  //  que o banco respondeu.
  function linhaMesa() {
    const e = mesaNoticias() ? mesaNoticias().estado() : null;
    if (!e || !e.configurado) return null;          // site sem Firebase: nada a dizer
    const c = campanhaAtual();
    if (!c) return null;
    const p = document.createElement('p');
    p.className = 'nc-mesa-linha';
    p.dataset.ncMesa = '1';
    p.innerHTML = textoDaLinha(e, c);
    return p;
  }

  function pintarLinhaMesa() {
    const alvo = document.querySelector('#noticias [data-nc-mesa]');
    const e = mesaNoticias() ? mesaNoticias().estado() : null;
    const c = campanhaAtual();
    if (!alvo || !e || !c) return renderizar();     // a linha ainda não existe: desenha tudo
    alvo.innerHTML = textoDaLinha(e, c);
  }

  //  "permission_denied" não diz nada a quem escreve notícia. Na quase
  //  totalidade das vezes é a mesma coisa: as regras novas ainda não
  //  foram coladas no console do Firebase.
  function recadoDoBanco(err) {
    if (/permission/i.test(err)) {
      return 'o banco recusou. Se a gazeta ao vivo é nova aqui, falta publicar as regras ' +
             'do <strong>MODO-JOGADOR.md</strong> no console do Firebase — o nó <code>campanhas</code>.';
    }
    return esc(err);
  }

  function textoDaLinha(e, c) {
    const doBanco = !!remotas[c.id];
    const dono    = doBanco ? (remotas[c.id].dono || '') : '';
    const autor   = doBanco ? (remotas[c.id].autor || '') : '';
    const minha   = doBanco && dono && dono === e.meuUid;
    const orfa    = doBanco && !dono;
    const erro    = e.erro ? '<span class="nc-mesa-erro">⚠ ' + recadoDoBanco(e.erro) + '</span>' : '';

    if (!edicaoAtiva) {
      if (!doBanco) return '';                      // gazeta do arquivo: o leitor não precisa saber
      return '📡 <strong>Gazeta ao vivo</strong> — o que o mestre escrever aparece aqui sozinho' +
        (autor && !minha ? ' · escrita por <strong>' + esc(autor) + '</strong>' : '');
    }

    if (!e.usuario) {
      return '📡 Esta gazeta está <strong>só neste navegador</strong>. ' +
        'Entre com o Google na aba <strong>🎲 Mesa</strong> para publicá-la — aí ela aparece ' +
        'para quem abrir o site, sem passar por commit.' + erro;
    }
    if (doBanco && !minha && !orfa) {
      return '📡 A gazeta de <strong>' + esc(c.nome) + '</strong> é de <strong>' +
        esc(autor || 'outra pessoa') + '</strong>. O que você mudar aqui fica <strong>só neste ' +
        'navegador</strong> — o banco não vai aceitar.' + erro;
    }
    if (minha) {
      return '📡 <strong>No ar</strong>, e é sua: cada mudança sobe sozinha e aparece para quem ' +
        'estiver com o site aberto. ' +
        '<button type="button" class="nc-btn nc-btn-sm nc-btn-danger" data-acao="camp-tirar-do-ar">' +
        '✕ Tirar do ar</button>' + erro;
    }
    return '📡 Esta gazeta ainda <strong>não está no ar</strong>. ' +
      '<button type="button" class="nc-btn nc-btn-sm nc-btn-add" data-acao="camp-publicar">' +
      '📡 Publicar esta gazeta</button>' +
      (orfa ? ' <em>(ela existe no banco sem dono — publicar é assumi-la)</em>' : '') + erro;
  }

  // Publicar é a primeira subida: daí em diante toda edição sobe sozinha.
  function publicarCampanha() {
    const c = campanhaAtual();
    if (!c || !podePublicar(c.id)) return;
    pendentes[c.id] = true;
    esperandoPublicar = true;
    mesaNoticias().publicar({ id: c.id, nome: c.nome, anos: c.anos });
    mostrarToast('📡 Subindo…');
  }

  // Tirar do ar não apaga nada daqui: a campanha continua na tela e no
  // arquivo, e volta a ser só deste navegador.
  function tirarDoAr() {
    const c = campanhaAtual();
    if (!c || !remotas[c.id]) return;
    if (!confirm('Tirar "' + c.nome + '" da gazeta ao vivo?\n\n' +
                 'Ela some para quem abre o site. O que está escrito continua aqui, ' +
                 'e você pode publicar de novo depois.')) return;
    delete pendentes[c.id];
    mesaNoticias().apagar(c.id).then(() => mostrarToast('✔ Fora do ar'));
  }

  // ── ABAS DE CAMPANHA (uma gazeta por RPG) ────────────────────────
  function renderizarAbasCampanha() {
    const barra = document.createElement('nav');
    barra.className = 'nc-camp-abas';
    barra.setAttribute('aria-label', 'Campanhas');
    barra.innerHTML =
      '<span class="nc-camp-rot">⚜ Campanha</span>' +
      dados.campanhas.map((c, i) => `
        <button type="button" data-acao="camp-sel" data-ci="${i}"
          class="nc-camp-aba${i === campAtiva ? ' nc-camp-aba--ativa' : ''}"
          aria-pressed="${i === campAtiva}">${esc(c.nome)}</button>
      `).join('');
    return barra;
  }

  // ── CONTROLES DE CAMPANHA (só no modo edição) ────────────────────
  function renderizarCtrlCampanha() {
    const ctrl = document.createElement('div');
    ctrl.className = 'nc-camp-ctrl';
    const temCamp = !!campanhaAtual();
    ctrl.innerHTML = `
      <button class="nc-btn nc-btn-add nc-btn-sm" data-acao="camp-nova">+ Nova Campanha</button>
      ${temCamp ? `
        <button class="nc-btn nc-btn-sm" data-acao="camp-esq" title="Mover campanha para a esquerda">◀</button>
        <button class="nc-btn nc-btn-sm" data-acao="camp-dir" title="Mover campanha para a direita">▶</button>
        <button class="nc-btn nc-btn-sm" data-acao="camp-renomear">✏ Renomear</button>
        <button class="nc-btn nc-btn-danger nc-btn-sm" data-acao="camp-del">✕ Remover Campanha</button>
      ` : ''}
      <span class="nc-camp-sep" aria-hidden="true"></span>
      <button class="nc-btn nc-btn-sm" data-acao="baixar"
        title="Gera o js/noticias-data.js para você trocar na pasta e dar commit">⬇ Baixar arquivo</button>
    `;
    return ctrl;
  }

  // ── BLOCO DE ANO ─────────────────────────────────────────────────
  function renderizarAno(anoObj, ai) {
    const bloco  = document.createElement('div');
    bloco.className = 'year-block';

    // Cabeçalho
    const hdr = document.createElement('div');
    hdr.className = 'year-header';
    hdr.innerHTML = `<hr/><h2>Ano de ${esc(String(anoObj.ano))}</h2><hr/>`;

    if (edicaoAtiva) {
      const ctrl = document.createElement('div');
      ctrl.className = 'nc-ano-ctrl';
      ctrl.innerHTML = `
        <button class="nc-btn nc-btn-sm" data-ai="${ai}" data-acao="ano-up"   title="Mover ano para cima">▲ Ano</button>
        <button class="nc-btn nc-btn-sm" data-ai="${ai}" data-acao="ano-down" title="Mover ano para baixo">▼ Ano</button>
        <button class="nc-btn nc-btn-add nc-btn-sm" data-ai="${ai}" data-acao="add-noticia">+ Notícia</button>
        <button class="nc-btn nc-btn-danger nc-btn-sm" data-ai="${ai}" data-acao="del-ano">✕ Remover Ano</button>
      `;
      hdr.appendChild(ctrl);
    }
    bloco.appendChild(hdr);

    // Grid de notícias
    const grid = document.createElement('div');
    grid.className = 'news-grid';
    (anoObj.noticias || []).forEach((n, ni) =>
      grid.appendChild(renderizarCard(n, ai, ni))
    );
    bloco.appendChild(grid);
    return bloco;
  }

  // ── CARD ─────────────────────────────────────────────────────────
  function renderizarCard(noticia, ai, ni) {
    const card = document.createElement('div');
    // a 1ª matéria do ano mais recente é a manchete principal (destaque de capa)
    const ehLead = (ai === 0 && ni === 0);
    card.className = `news-card span-${noticia.span || 12}${ehLead ? ' news-lead' : ''}${edicaoAtiva ? ' nc-editavel' : ''}`;

    const corpo = document.createElement('div');
    const bodyHtml = esc(noticia.corpo || '').replace(/\n/g, '<br>');
    corpo.innerHTML = `
      <span class="news-tag">${esc(noticia.tag)}</span>
      <h3 class="news-title">${esc(noticia.titulo)}</h3>
      <span class="news-date">${esc(noticia.data)}</span>
      <hr class="news-rule"/>
      <p class="news-body">${bodyHtml}</p>
      ${noticia.ornamento ? '<div class="ornament">— ✦ —</div>' : ''}
    `;
    card.appendChild(corpo);

    if (edicaoAtiva) {
      const toolbar = document.createElement('div');
      toolbar.className = 'nc-toolbar';
      toolbar.innerHTML = `
        <button class="nc-btn nc-btn-sm" data-ai="${ai}" data-ni="${ni}" data-acao="up"   title="Mover para cima">↑</button>
        <button class="nc-btn nc-btn-sm" data-ai="${ai}" data-ni="${ni}" data-acao="down" title="Mover para baixo">↓</button>
        <button class="nc-btn nc-btn-sm" data-ai="${ai}" data-ni="${ni}" data-acao="edit">✏ Editar</button>
        <button class="nc-btn nc-btn-danger nc-btn-sm" data-ai="${ai}" data-ni="${ni}" data-acao="del">🗑 Excluir</button>
      `;
      card.appendChild(toolbar);
    }

    return card;
  }

  // ── BOTÃO NOVO ANO ────────────────────────────────────────────────
  function criarBotaoNovoAno() {
    const wrap = document.createElement('div');
    wrap.className = 'nc-novo-ano';
    wrap.innerHTML = `<button class="nc-btn nc-btn-add nc-btn-lg" data-acao="novo-ano">+ Novo Ano</button>`;
    return wrap;
  }

  // ══════════════════════════════════════════════════════════════════
  //  DELEGAÇÃO DE EVENTOS (evita onclick inline)
  //  Restrito à seção de Notícias: se ouvíssemos o document inteiro, o
  //  data-acao de outras abas colidiria (ex.: "del" das Anotações dispararia
  //  excluirNoticia com ai=null → TypeError).
  // ══════════════════════════════════════════════════════════════════
  (document.getElementById('noticias') || document).addEventListener('click', e => {
    const btn = e.target.closest('[data-acao]');
    if (!btn) return;

    const acao = btn.dataset.acao;
    const ai   = btn.dataset.ai !== undefined ? +btn.dataset.ai : null;
    const ni   = btn.dataset.ni !== undefined ? +btn.dataset.ni : null;
    const ci   = btn.dataset.ci !== undefined ? +btn.dataset.ci : null;

    switch (acao) {
      case 'camp-sel':      trocarCampanha(ci);           break;
      case 'camp-esq':      moverCampanha(-1);            break;
      case 'camp-dir':      moverCampanha( 1);            break;
      case 'camp-nova':     abrirModalCampanha('add');    break;
      case 'camp-renomear': abrirModalCampanha('edit');   break;
      case 'camp-del':      removerCampanha();            break;
      case 'camp-publicar':    publicarCampanha();        break;
      case 'camp-tirar-do-ar': tirarDoAr();               break;
      case 'baixar':        baixarArquivo();              break;
      case 'ano-up':        moverAno(ai, -1);             break;
      case 'ano-down':      moverAno(ai,  1);             break;
      case 'del-ano':       removerAno(ai);               break;
      case 'add-noticia':   abrirModal('add', ai);        break;
      case 'up':            moverNoticia(ai, ni, -1);     break;
      case 'down':          moverNoticia(ai, ni,  1);     break;
      case 'edit':          abrirModal('edit', ai, ni);   break;
      case 'del':           excluirNoticia(ai, ni);       break;
      case 'novo-ano':      abrirModalNovoAno();          break;
    }
  });

  // ══════════════════════════════════════════════════════════════════
  //  AÇÕES DE CAMPANHA
  // ══════════════════════════════════════════════════════════════════
  function trocarCampanha(ci) {
    if (ci == null || ci === campAtiva || !dados.campanhas[ci]) return;
    campAtiva = ci;
    lembrarCampanha();
    renderizar();
    // outra gazeta, outra manchete: volta para o topo
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  function moverCampanha(delta) {
    const arr  = dados.campanhas;
    const dest = campAtiva + delta;
    if (dest < 0 || dest >= arr.length) return;
    [arr[campAtiva], arr[dest]] = [arr[dest], arr[campAtiva]];
    campAtiva = dest;
    salvar(); renderizar();
  }

  function removerCampanha() {
    const c = campanhaAtual();
    if (!c) return;
    const qtd = (c.anos || []).reduce((s, a) => s + (a.noticias || []).length, 0);
    const noAr = !!remotas[c.id] && podePublicar(c.id);
    const msg = (qtd > 0
      ? `A campanha "${c.nome}" tem ${qtd} notícia(s). Deseja excluir mesmo assim?`
      : `Remover a campanha "${c.nome}"?`) +
      (noAr ? '\n\nEla está NO AR: sai também da gazeta ao vivo, para todo mundo.' : '');
    if (!confirm(msg)) return;

    if (noAr) mesaNoticias().apagar(c.id);
    delete pendentes[c.id];
    dados.campanhas.splice(campAtiva, 1);
    if (campAtiva >= dados.campanhas.length) {
      campAtiva = Math.max(0, dados.campanhas.length - 1);
    }
    lembrarCampanha();
    salvar(); renderizar();
  }

  // ══════════════════════════════════════════════════════════════════
  //  AÇÕES CRUD (sempre dentro da campanha aberta)
  // ══════════════════════════════════════════════════════════════════
  function moverAno(ai, delta) {
    const anos = campanhaAtual().anos;
    const dest = ai + delta;
    if (dest < 0 || dest >= anos.length) return;
    [anos[ai], anos[dest]] = [anos[dest], anos[ai]];
    salvar(); renderizar();
  }

  function removerAno(ai) {
    const ano = campanhaAtual().anos[ai];
    const qtd = (ano.noticias || []).length;
    const msg = qtd > 0
      ? `O bloco do Ano ${ano.ano} tem ${qtd} notícia(s). Deseja excluir mesmo assim?`
      : `Remover o bloco do Ano ${ano.ano}?`;
    if (!confirm(msg)) return;
    campanhaAtual().anos.splice(ai, 1);
    salvar(); renderizar();
  }

  function moverNoticia(ai, ni, delta) {
    const arr  = campanhaAtual().anos[ai].noticias;
    const dest = ni + delta;
    if (dest < 0 || dest >= arr.length) return;
    [arr[ni], arr[dest]] = [arr[dest], arr[ni]];
    salvar(); renderizar();
  }

  function excluirNoticia(ai, ni) {
    const n = campanhaAtual().anos[ai].noticias[ni];
    if (!confirm(`Excluir "${n.titulo}"?`)) return;
    campanhaAtual().anos[ai].noticias.splice(ni, 1);
    salvar(); renderizar();
  }

  // ── GARANTIR ANO EXISTE E INSERIR ────────────────────────────────
  function garantirAno(camp, anoNum) {
    let anoObj = camp.anos.find(a => a.ano === anoNum);
    if (!anoObj) {
      anoObj = { ano: anoNum, noticias: [] };
      camp.anos.push(anoObj);
      camp.anos.sort((a, b) => b.ano - a.ano);
    }
    return anoObj;
  }

  // ══════════════════════════════════════════════════════════════════
  //  MODAL ADD / EDIT DE NOTÍCIA
  // ══════════════════════════════════════════════════════════════════
  function abrirModal(modo, ai, ni) {
    fecharModal();

    const camp = campanhaAtual();
    if (!camp) return;

    const anoAtual = camp.anos[ai] ? camp.anos[ai].ano : '';
    let vals = { span: 12, tag: '', titulo: '', data: '', corpo: '', ornamento: false };

    if (modo === 'edit' && ni != null) {
      const n = camp.anos[ai].noticias[ni];
      vals = { span: n.span || 12, tag: n.tag || '',
               titulo: n.titulo || '', data: n.data || '',
               corpo: n.corpo || '', ornamento: !!n.ornamento };
    }

    const opcoesCamp = dados.campanhas.map((c, i) =>
      `<option value="${i}" ${i === campAtiva ? 'selected' : ''}>${esc(c.nome)}</option>`
    ).join('');

    const overlay = document.createElement('div');
    overlay.id = 'ncModal';
    overlay.className = 'nc-overlay';
    overlay.innerHTML = `
      <div class="nc-modal" role="dialog" aria-modal="true">
        <div class="nc-modal-header">
          <span>${modo === 'add' ? '+ Nova Notícia' : '✏ Editar Notícia'}</span>
          <button class="nc-modal-fechar" data-acao-modal="fechar" title="Fechar">✕</button>
        </div>

        <div class="nc-modal-corpo">

          <div class="nc-row-2">
            <label class="nc-campo">
              <span>Campanha</span>
              <select id="ncCampanha">${opcoesCamp}</select>
            </label>
            <label class="nc-campo">
              <span>Ano</span>
              <select id="ncAno"></select>
            </label>
          </div>

          <div class="nc-row-2">
            <label class="nc-campo" id="ncNovoAnoWrap" style="display:none">
              <span>Número do Ano</span>
              <input type="number" id="ncNovoAno" placeholder="Ex: 1425">
            </label>
            <label class="nc-campo">
              <span>Colunas (largura)</span>
              <select id="ncSpan">
                <option value="4"  ${vals.span==4  ?'selected':''}>4 — estreita</option>
                <option value="6"  ${vals.span==6  ?'selected':''}>6 — meia página</option>
                <option value="8"  ${vals.span==8  ?'selected':''}>8 — larga</option>
                <option value="12" ${vals.span==12 ?'selected':''}>12 — página inteira</option>
              </select>
            </label>
          </div>

          <label class="nc-campo">
            <span>Tag</span>
            <input type="text" id="ncTag" value="${esc(vals.tag)}"
              placeholder="Ex: ✦ Manchete · Ano Corrente">
          </label>

          <label class="nc-campo">
            <span>Título</span>
            <input type="text" id="ncTitulo" value="${esc(vals.titulo)}"
              placeholder="Título da notícia">
          </label>

          <label class="nc-campo">
            <span>Data / Local</span>
            <input type="text" id="ncData" value="${esc(vals.data)}"
              placeholder="Ex: Valkaria, 28º dia de Pomo — Ano 1424">
          </label>

          <label class="nc-campo">
            <span>Corpo</span>
            <textarea id="ncCorpo" rows="9"
              placeholder="Texto da notícia. Use Enter para parágrafos.">${esc(vals.corpo)}</textarea>
          </label>

          <label class="nc-campo nc-campo-inline">
            <input type="checkbox" id="ncOrnamento" ${vals.ornamento ? 'checked' : ''}>
            <span>Adicionar ornamento (— ✦ —) ao final do card</span>
          </label>

        </div>

        <div class="nc-modal-footer">
          <button class="nc-btn" data-acao-modal="fechar">Cancelar</button>
          <button class="nc-btn nc-btn-primary" data-acao-modal="salvar"
            data-modo="${modo}" data-ai="${ai}" data-ni="${ni ?? ''}">
            Salvar Notícia
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    // O ano vive DENTRO da campanha — trocar de campanha refaz a lista
    // de anos (é assim que uma notícia muda de gazeta).
    const selCamp = document.getElementById('ncCampanha');
    const selAno  = document.getElementById('ncAno');

    function alternarNovoAno() {
      document.getElementById('ncNovoAnoWrap').style.display =
        selAno.value === '__novo__' ? 'flex' : 'none';
    }

    function preencherAnos(ci, anoSel) {
      const c = dados.campanhas[ci];
      selAno.innerHTML =
        ((c && c.anos) || []).map(a =>
          `<option value="${a.ano}" ${a.ano == anoSel ? 'selected' : ''}>${a.ano}</option>`
        ).join('') + '<option value="__novo__">+ Novo ano…</option>';
      alternarNovoAno();
    }

    preencherAnos(campAtiva, anoAtual);
    selCamp.addEventListener('change', () => preencherAnos(+selCamp.value, anoAtual));
    selAno .addEventListener('change', alternarNovoAno);

    // Eventos do modal
    overlay.addEventListener('click', e => {
      const btn = e.target.closest('[data-acao-modal]');
      if (!btn && e.target === overlay) { fecharModal(); return; }
      if (!btn) return;
      const acao = btn.dataset.acaoModal;
      if (acao === 'fechar') { fecharModal(); return; }
      if (acao === 'salvar') {
        confirmarModal(btn.dataset.modo, +btn.dataset.ai,
          btn.dataset.ni !== '' ? +btn.dataset.ni : null);
      }
    });

    // Foco no título
    setTimeout(() => {
      const f = document.getElementById('ncTitulo');
      if (f) f.focus();
    }, 50);
  }

  function fecharModal() {
    const el = document.getElementById('ncModal');
    if (el) el.remove();
  }

  function confirmarModal(modo, ai, ni) {
    const ciDest   = +document.getElementById('ncCampanha').value;
    const campDest = dados.campanhas[ciDest];
    if (!campDest) { alert('Escolha uma campanha.'); return; }

    const anoSelect = document.getElementById('ncAno');
    const anoNum = anoSelect.value === '__novo__'
      ? parseInt(document.getElementById('ncNovoAno').value, 10)
      : parseInt(anoSelect.value, 10);

    if (isNaN(anoNum)) { alert('Informe um número de ano válido.'); return; }

    const titulo = document.getElementById('ncTitulo').value.trim();
    if (!titulo) { alert('O título é obrigatório.'); return; }

    const novaNoticia = {
      id:       uid(),
      span:     parseInt(document.getElementById('ncSpan').value, 10),
      tag:      document.getElementById('ncTag').value.trim(),
      titulo,
      data:     document.getElementById('ncData').value.trim(),
      corpo:    document.getElementById('ncCorpo').value.trim(),
      ornamento: document.getElementById('ncOrnamento').checked,
    };

    if (modo === 'add') {
      garantirAno(campDest, anoNum).noticias.push(novaNoticia);
    } else {
      const campOrigem = campanhaAtual();
      const anoOrigem  = campOrigem.anos[ai];
      novaNoticia.id   = anoOrigem.noticias[ni].id;   // preserva id original

      if (campOrigem === campDest && anoOrigem.ano === anoNum) {
        anoOrigem.noticias[ni] = novaNoticia;
      } else {
        // Muda de ano e/ou de campanha: remove e insere no destino
        anoOrigem.noticias.splice(ni, 1);
        garantirAno(campDest, anoNum).noticias.push(novaNoticia);
      }
    }

    // segue a matéria: se ela foi para outra gazeta, abrimos essa gazeta
    if (ciDest !== campAtiva) { campAtiva = ciDest; lembrarCampanha(); }

    fecharModal();
    salvar();
    renderizar();
  }

  // ── MODAL NOVA / RENOMEAR CAMPANHA ────────────────────────────────
  function abrirModalCampanha(modo) {
    fecharModal();
    const c = modo === 'edit' ? campanhaAtual() : null;
    if (modo === 'edit' && !c) return;

    const overlay = document.createElement('div');
    overlay.id = 'ncModal';
    overlay.className = 'nc-overlay';
    overlay.innerHTML = `
      <div class="nc-modal nc-modal-sm" role="dialog" aria-modal="true">
        <div class="nc-modal-header">
          <span>${modo === 'add' ? '+ Nova Campanha' : '✏ Renomear Campanha'}</span>
          <button class="nc-modal-fechar" data-acao-modal="fechar" title="Fechar">✕</button>
        </div>
        <div class="nc-modal-corpo">
          <label class="nc-campo">
            <span>Nome da Campanha</span>
            <input type="text" id="ncCampNome" value="${esc(c ? c.nome : '')}"
              placeholder="Ex: Nuevo Sol">
          </label>
        </div>
        <div class="nc-modal-footer">
          <button class="nc-btn" data-acao-modal="fechar">Cancelar</button>
          <button class="nc-btn nc-btn-primary" data-acao-modal="salvar-campanha"
            data-modo="${modo}">${modo === 'add' ? 'Criar Campanha' : 'Salvar'}</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    overlay.addEventListener('click', e => {
      const btn = e.target.closest('[data-acao-modal]');
      if (!btn && e.target === overlay) { fecharModal(); return; }
      if (!btn) return;
      if (btn.dataset.acaoModal === 'fechar') { fecharModal(); return; }
      if (btn.dataset.acaoModal === 'salvar-campanha') confirmarCampanha(btn.dataset.modo);
    });

    const campo = document.getElementById('ncCampNome');
    campo.addEventListener('keydown', e => {
      if (e.key === 'Enter') { e.preventDefault(); confirmarCampanha(modo); }
    });
    setTimeout(() => { campo.focus(); campo.select(); }, 50);
  }

  function confirmarCampanha(modo) {
    const nome = document.getElementById('ncCampNome').value.trim();
    if (!nome) { alert('Dê um nome à campanha.'); return; }

    if (modo === 'add') {
      dados.campanhas.push({ id: idDeCampanha(nome), nome, anos: [] });
      campAtiva = dados.campanhas.length - 1;
    } else {
      campanhaAtual().nome = nome;   // o id não muda — é ele que fica salvo
    }

    lembrarCampanha();
    fecharModal();
    salvar();
    renderizar();
  }

  // ── MODAL NOVO ANO (botão "+ Novo Ano") ───────────────────────────
  function abrirModalNovoAno() {
    fecharModal();
    if (!campanhaAtual()) return;

    const overlay = document.createElement('div');
    overlay.id = 'ncModal';
    overlay.className = 'nc-overlay';
    overlay.innerHTML = `
      <div class="nc-modal nc-modal-sm" role="dialog" aria-modal="true">
        <div class="nc-modal-header">
          <span>+ Novo Ano — ${esc(campanhaAtual().nome)}</span>
          <button class="nc-modal-fechar" data-acao-modal="fechar">✕</button>
        </div>
        <div class="nc-modal-corpo">
          <label class="nc-campo">
            <span>Número do Ano</span>
            <input type="number" id="ncNovoAnoNum" placeholder="Ex: 1419">
          </label>
        </div>
        <div class="nc-modal-footer">
          <button class="nc-btn" data-acao-modal="fechar">Cancelar</button>
          <button class="nc-btn nc-btn-primary" data-acao-modal="criar-ano">Criar Ano</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    overlay.addEventListener('click', e => {
      const btn = e.target.closest('[data-acao-modal]');
      if (!btn && e.target === overlay) { fecharModal(); return; }
      if (!btn) return;
      if (btn.dataset.acaoModal === 'fechar') { fecharModal(); return; }
      if (btn.dataset.acaoModal === 'criar-ano') {
        const camp = campanhaAtual();
        const num  = parseInt(document.getElementById('ncNovoAnoNum').value, 10);
        if (isNaN(num)) { alert('Informe um número válido.'); return; }
        if (camp.anos.find(a => a.ano === num)) { alert('Esse ano já existe nesta campanha.'); return; }
        camp.anos.push({ ano: num, noticias: [] });
        camp.anos.sort((a, b) => b.ano - a.ano);
        fecharModal();
        salvar();
        renderizar();
      }
    });

    setTimeout(() => {
      const f = document.getElementById('ncNovoAnoNum');
      if (f) f.focus();
    }, 50);
  }

  // ══════════════════════════════════════════════════════════════════
  //  BOTÃO MODO EDIÇÃO (fixo, aparece só na aba Notícias)
  // ══════════════════════════════════════════════════════════════════
  function criarBotaoEdicao() {
    if (document.getElementById('ncBtnEdicao')) return;
    const btn = document.createElement('button');
    btn.id        = 'ncBtnEdicao';
    btn.className = 'nc-btn-edicao';
    btn.textContent = '✏ Editar Notícias';
    btn.addEventListener('click', () => {
      edicaoAtiva = !edicaoAtiva;
      sincronizarBotaoEdicao();
      renderizar();
    });
    document.body.appendChild(btn);
    sincronizarBotaoEdicao();
  }

  function sincronizarBotaoEdicao() {
    const btn = document.getElementById('ncBtnEdicao');
    if (!btn) return;
    const sec = document.getElementById('noticias');
    const visivel = sec && sec.classList.contains('active');
    btn.style.display = visivel ? 'block' : 'none';
    if (edicaoAtiva) {
      btn.classList.add('nc-btn-edicao--ativa');
      btn.textContent = '✔ Sair da Edição';
    } else {
      btn.classList.remove('nc-btn-edicao--ativa');
      btn.textContent = '✏ Editar Notícias';
    }
  }

})();
