// ═══════════════════════════════════════════════════════════════════
//  MESA-DE-HOJE.JS — o atalho para onde você estava jogando
//
//  Pedido em 01/11/2026, junto da leva dos menus: com as treze seções
//  guardadas em quatro menus, a coisa mais frequente do site (voltar
//  para a campanha de ontem e continuar a cena) ficava a dois cliques e
//  uma lembrança — "qual era o endereço daquela mesa?".
//
//  A faixa só aparece quando há PARA ONDE IR, e ela não decide nada: é
//  um link. Isso é regra do projeto, não timidez — desde 13/10/2026
//  nada neste site cai numa campanha por padrão (ver mesa-endereco.js),
//  porque uma aba que escolhe mesa sozinha foi exatamente o defeito que
//  publicou a loja de um mestre na mesa de outro.
//
//  Três situações, três frases:
//
//   • NA BANCADA (sem `?mesa=`), e existe uma campanha conhecida:
//     "⟶ A mesa de hoje: «Penitência» — continuar" → o link dela.
//   • DENTRO da campanha, com cena sendo narrada nela:
//     "⟶ Continuar a cena «A ponte»" → abre o ⚔ Combates.
//   • DENTRO de uma campanha, mas a cena narrada é de OUTRA:
//     "⟶ A cena «A ponte» é da campanha «Nuevo Sol»" → o link de lá.
//     Esta terceira é o aviso de 17/10/2026 virando atalho: antes dela,
//     uma cena de outra mesa entrava na iniciativa ao vivo sem avisar.
//
//  DE ONDE VEM CADA COISA (e por que não de um lugar só):
//   • a campanha desta aba  → GA_Sala.id, que é o endereço;
//   • o nome bonito dela    → GA_Mesa (o nó público `mesas/<id>`), que
//     só chega se houver Firebase; sem ele, mostramos o id do endereço;
//   • a cena narrada        → o localStorage do bestiário, que NÃO é
//     por mesa de propósito (o bestiário é seu, não da campanha) — daí
//     a sessão dela carregar `s.mesa` para dizer de quem a cena é.
// ═══════════════════════════════════════════════════════════════════
(function () {
  'use strict';

  const CHAVE_CARIMBO = 'grifosAlados.mesaDeHoje';
  const CHAVE_BESTIARIO = 'grifosAlados.monstros';
  const CHAVE_DISPENSADA = 'gaMesaDeHoje.dispensada';   // sessionStorage: volta amanhã

  const Sala = window.GA_Sala || { id: '', link: function (i) { return 'index.html?mesa=' + i; } };
  let faixa = null, nomeDaMesa = '';

  function lerJSON(deposito, chave) {
    try {
      const v = deposito.getItem(chave);
      return v ? JSON.parse(v) : null;
    } catch (e) { return null; }
  }

  // ── O CARIMBO ────────────────────────────────────────────────────
  //  Qual foi a última campanha em que esta pessoa esteve. Vale só na
  //  bancada, para oferecer a volta; dentro da campanha o endereço já
  //  diz tudo. Gravado a cada visita, com o nome quando ele chega.
  function carimbar() {
    if (!Sala.id) return;
    try {
      localStorage.setItem(CHAVE_CARIMBO, JSON.stringify({
        id: Sala.id, nome: nomeDaMesa || '', em: Date.now()
      }));
    } catch (e) {}
  }

  // ── A CENA QUE ESTÁ SENDO NARRADA ────────────────────────────────
  //  Devolve { cena, mesa } ou null. `mesa` é '' nas sessões antigas,
  //  que nasceram antes de a campanha entrar no endereço — uma cena sem
  //  campanha marcada serve a qualquer uma, como no monstros.js.
  function cenaNarrada() {
    const d = lerJSON(localStorage, CHAVE_BESTIARIO);
    if (!d || !d.cenaNarrada || !Array.isArray(d.sessoes)) return null;
    for (let i = 0; i < d.sessoes.length; i++) {
      const s = d.sessoes[i] || {};
      const cenas = Array.isArray(s.cenas) ? s.cenas : [];
      for (let j = 0; j < cenas.length; j++) {
        if (cenas[j] && cenas[j].id === d.cenaNarrada) {
          return { cena: cenas[j].nome || 'Cena', mesa: s.mesa || '' };
        }
      }
    }
    return null;
  }

  // Um id de campanha (`nuevo-sol`) só é bonito quando alguém guardou o
  // nome; do contrário, devolver o id cru é mais honesto do que inventar
  // uma capitalização que não é a que o mestre escreveu.
  function rotuloDaMesa(id) {
    if (!id) return '';
    if (id === Sala.id && nomeDaMesa) return nomeDaMesa;
    const c = lerJSON(localStorage, CHAVE_CARIMBO);
    if (c && c.id === id && c.nome) return c.nome;
    const minhas = (window.GA_Mesa && window.GA_Mesa.minhasMesas && window.GA_Mesa.minhasMesas()) || {};
    return minhas[id] || id;
  }

  // ── O QUE OFERECER ───────────────────────────────────────────────
  //  Devolve { texto, acao, href?, chave } ou null para "não há nada a
  //  dizer" — e nesse caso a faixa não existe, em vez de existir vazia.
  function oQueOferecer() {
    const cena = cenaNarrada();

    if (!Sala.id) {
      // na bancada: a cena narrada sabe de qual campanha é; se não há
      // cena, vale a última campanha visitada
      if (cena && cena.mesa) {
        return { chave: 'hub-cena-' + cena.mesa + '-' + cena.cena,
          href: Sala.link(cena.mesa),
          rotulo: 'A mesa de hoje',
          texto: '«' + rotuloDaMesa(cena.mesa) + '» — a cena «' + cena.cena + '» está marcada como narrando',
          botao: 'Abrir a campanha' };
      }
      const c = lerJSON(localStorage, CHAVE_CARIMBO);
      if (c && c.id) {
        return { chave: 'hub-ultima-' + c.id,
          href: Sala.link(c.id),
          rotulo: 'Onde você estava',
          texto: '«' + rotuloDaMesa(c.id) + '»',
          botao: 'Voltar à campanha' };
      }
      return null;
    }

    if (!cena) return null;

    // a cena narrada é de outra campanha: o aviso que já existia na
    // iniciativa, agora com a porta de saída junto
    if (cena.mesa && cena.mesa !== Sala.id) {
      return { chave: 'cruzada-' + cena.mesa + '-' + cena.cena,
        href: Sala.link(cena.mesa),
        rotulo: 'Atenção',
        texto: 'a cena «' + cena.cena + '» que está marcada como narrando é da campanha «' +
               rotuloDaMesa(cena.mesa) + '», não desta',
        botao: 'Ir para «' + rotuloDaMesa(cena.mesa) + '»' };
    }

    return { chave: 'cena-' + Sala.id + '-' + cena.cena,
      secao: 'monstros',
      rotulo: 'Continuar',
      texto: 'a cena «' + cena.cena + '»' + (nomeDaMesa ? ' em «' + nomeDaMesa + '»' : ''),
      botao: 'Abrir o combate' };
  }

  function dispensada(chave) {
    try { return sessionStorage.getItem(CHAVE_DISPENSADA) === chave; } catch (e) { return false; }
  }

  function dispensar(chave) {
    try { sessionStorage.setItem(CHAVE_DISPENSADA, chave); } catch (e) {}
    if (faixa) { faixa.remove(); faixa = null; }
  }

  // ── A FAIXA ──────────────────────────────────────────────────────
  //  Não é sticky de propósito: quem gruda no topo é a faixa de seções
  //  (e, no celular, a barra ☰), e o script.js mede a altura DELA para
  //  publicar o --nav-h. Uma segunda barra grudada mexeria nessa conta e
  //  empurraria o conteúdo de todas as abas.
  function montar() {
    const o = oQueOferecer();
    if (faixa) { faixa.remove(); faixa = null; }
    if (!o || dispensada(o.chave)) return;

    faixa = document.createElement('div');
    faixa.className = 'ga-hoje';
    faixa.setAttribute('role', 'complementary');
    faixa.setAttribute('aria-label', 'Atalho para a sua mesa');

    const alvo = document.createElement(o.href ? 'a' : 'button');
    alvo.className = 'ga-hoje-ir';
    if (o.href) alvo.href = o.href;
    else alvo.type = 'button';
    alvo.innerHTML = '<span class="ga-hoje-seta" aria-hidden="true">⟶</span>' +
      '<span class="ga-hoje-rot">' + o.rotulo + ':</span>' +
      '<span class="ga-hoje-txt"></span>' +
      '<span class="ga-hoje-btn">' + o.botao + '</span>';
    // o texto entra como TEXTO: nome de campanha e de cena são escritos
    // pelo mestre, e um «<img onerror>» de nome de cena não vira HTML aqui
    alvo.querySelector('.ga-hoje-txt').textContent = o.texto;

    if (!o.href) {
      alvo.addEventListener('click', function () {
        const link = document.querySelector('.nav-link[data-section="' + o.secao + '"]');
        if (link) link.click();     // o mesmo caminho que o menu usa
      });
    }

    const x = document.createElement('button');
    x.type = 'button';
    x.className = 'ga-hoje-x';
    x.setAttribute('aria-label', 'Esconder este atalho até a próxima visita');
    x.textContent = '✕';
    x.addEventListener('click', function () { dispensar(o.chave); });

    faixa.appendChild(alvo);
    faixa.appendChild(x);

    // depois da faixa de seções — e, no celular, depois da barra ☰, que
    // o acessibilidade.js insere ali como vizinha dela
    const nav = document.getElementById('main-nav');
    const barra = document.querySelector('.ga-barra-movel');
    const antes = barra || nav;
    if (antes && antes.parentNode) antes.parentNode.insertBefore(faixa, antes.nextSibling);
  }

  function iniciar() {
    carimbar();
    montar();

    // o nome bonito da campanha chega depois (é uma leitura do banco):
    // quando chegar, o carimbo e a frase se corrigem sozinhos
    if (window.GA_Mesa && window.GA_Mesa.aoMudar) {
      window.GA_Mesa.aoMudar(function (est) {
        const novo = (est && est.mesa && est.mesa.nome) || '';
        if (novo === nomeDaMesa) return;
        nomeDaMesa = novo;
        carimbar();
        montar();
      });
    }
  }

  //  O GATILHO, e por que não é o `readyState === 'loading'` de sempre.
  //  Com `defer` o estado já é 'interactive' aqui, mas o
  //  DOMContentLoaded AINDA NÃO disparou — então esperar por ele é o que
  //  coloca esta faixa DEPOIS do acessibilidade.js, que é quem cria a
  //  barra ☰ do celular ao lado da qual ela precisa nascer. Rodar na
  //  hora (o reflexo do 'interactive') punha a faixa acima da barra.
  //  Ver a nota do defer-readystate-interactive.
  if (document.readyState === 'complete') iniciar();
  else document.addEventListener('DOMContentLoaded', iniciar);
})();
