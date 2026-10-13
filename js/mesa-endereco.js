// ═══════════════════════════════════════════════════════════════════
//  MESA-ENDERECO.JS — QUAL MESA É ESTA ABA, e qual gaveta ela abre
//
//  Carregado nas DUAS páginas, logo depois do script.js e ANTES de todo
//  mundo que lê o localStorage da mesa (loja, bases, viagem, os dois
//  syncs e o mesa.js). É o primeiro a falar porque é ele que decide em
//  que gaveta os outros vão mexer.
//
//  ── O QUE MUDOU, E POR QUÊ (13/10/2026) ──────────────────────────
//  Até aqui a mesa do mestre vinha de uma chave escondida do
//  localStorage (`grifosAlados.syncSala`) e, quando ela estava vazia,
//  o site caía numa sala chamada `mesa`. Três coisas ruins saíam daí:
//
//   1. `mesas/mesa` é uma campanha de verdade (a Penitência de Azgher).
//      Qualquer index.html que nunca tivesse escolhido campanha
//      transmitia PARA DENTRO DELA. Foi o que aconteceu: o navegador de
//      uma pessoa publicava a loja na mesa de outra, e o mestre de
//      verdade, cuja cópia era diferente, ficava barrado pela trava do
//      📡 — "gerei a loja e não foi" tinha essa causa.
//   2. Uma gaveta só para todas as campanhas. A mesma "Viagem 1" e as
//      mesmas Bases foram parar em `mesas/mesa/dados` e em
//      `mesas/nuevosol/dados`, byte a byte iguais — porque eram o mesmo
//      localStorage publicado duas vezes.
//   3. Não dava para ter duas campanhas abertas ao mesmo tempo: a sala
//      era do NAVEGADOR, não da aba.
//
//  Agora a mesa está no ENDEREÇO:
//
//      index.html                   → o HUB: a sua bancada. Local, e só.
//      index.html?mesa=nuevosol     → esta aba É o Nuevo Sol
//      jogadores.html?sala=nuevosol → a visão dos jogadores dela
//
//  Consequências que valem por regra:
//   • NADA cai numa sala por padrão. Sem `?mesa=`, não há mesa: o 📡
//     fica desligado e nenhuma linha vai para o banco.
//   • A gaveta das coisas da mesa é por mesa: `grifosAlados.bases`
//     dentro do Nuevo Sol é `grifosAlados.bases@nuevosol`. O que você
//     monta numa campanha não aparece na outra, nem é publicado nela.
//   • Cinco campanhas são cinco abas, cada uma com o nome na tela.
//
//  O que NÃO entra na gaveta por mesa, de propósito: o bestiário, as
//  anotações, o mapa, as fichas, os ajustes da Loja e a acessibilidade.
//  Isso é seu, não da campanha — e o ⚔ Combates já tem a etiqueta dele.
// ═══════════════════════════════════════════════════════════════════
(function () {
  'use strict';

  const SALA_ANTIGA_KEY = 'grifosAlados.syncSala';
  const MIGRADA_KEY     = 'grifosAlados.gavetaPorMesa';

  // As chaves que SÃO da campanha. As cinco primeiras são exatamente as
  // que o 📡 transmite; a sexta é o espelho da caixa de entrada dos
  // jogadores, que também é de uma mesa só.
  const CHAVES_DA_MESA = [
    'grifosAlados.lojaLog',
    'grifosAlados.lojaLogSel',
    'grifosAlados.lojaComunidade',
    'grifosAlados.viagens',
    'grifosAlados.bases',
    'grifosAlados.basesJogadoresInventario',
  ];

  function ehJogador() {
    return document.documentElement.classList.contains('ga-jogador');
  }

  // O nome da campanha vira o id da sala: "Purista" → "purista", "Nuevo
  // Sol" → "nuevo-sol". Normalizar nos DOIS lados faz "?mesa=Purista" e
  // "?mesa=purista" caírem na mesma mesa — é o tipo de link que alguém
  // escreve à mão. Devolve '' para vazio: aqui NÃO há sala padrão.
  function idDe(nome) {
    return String(nome || '').normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }

  // `?mesa=` é o nome da página do mestre e `?sala=` o da dos jogadores,
  // mas os dois valem nas duas: o link que circula na mesa é o de
  // `?sala=`, e colá-lo no index tem de levar o mestre à campanha certa,
  // não ao HUB.
  function doEndereco() {
    let p;
    try { p = new URLSearchParams(location.search); } catch (e) { return ''; }
    return idDe((p.get('mesa') || p.get('sala') || '').trim());
  }

  const ID = doEndereco();

  // ── A GAVETA ─────────────────────────────────────────────────────
  //  No HUB, a chave é ela mesma — a bancada de quem abriu o site é a
  //  gaveta de sempre, e nada muda para quem nunca entra em mesa.
  function chave(nome) {
    if (!ID || CHAVES_DA_MESA.indexOf(nome) < 0) return nome;
    return nome + '@' + ID;
  }

  // ── A MUDANÇA DE UMA VEZ SÓ ──────────────────────────────────────
  //  Quem já usava o site tem as coisas da campanha nas chaves sem
  //  sufixo. A `syncSala` diz para qual mesa este navegador vinha
  //  publicando: é ela quem autoriza dizer "isto aqui é daquela mesa".
  //
  //  COPIA, não move. O que está na gaveta sem sufixo continua lá e vira
  //  a bancada do HUB — perder anotação é o erro caro deste projeto, e
  //  uma cópia a mais nunca machucou ninguém.
  //
  //  Sem `syncSala` não se migra NADA. O padrão antigo era cair em
  //  `mesa`, que é a campanha de outra pessoa; carimbar a bancada deste
  //  navegador como sendo dela seria repetir o defeito que esta mudança
  //  veio consertar.
  function migrar() {
    let jaFoi = null, antiga = '';
    try {
      jaFoi  = localStorage.getItem(MIGRADA_KEY);
      antiga = idDe((localStorage.getItem(SALA_ANTIGA_KEY) || '').trim());
    } catch (e) { return; }
    if (jaFoi) return;

    let copiadas = 0;
    if (antiga) {
      CHAVES_DA_MESA.forEach(nome => {
        try {
          const v = localStorage.getItem(nome);
          if (v == null) return;
          const destino = nome + '@' + antiga;
          if (localStorage.getItem(destino) != null) return;   // já tem: não pisa
          localStorage.setItem(destino, v);
          copiadas++;
        } catch (e) { console.warn('[mesa] não deu para copiar ' + nome + ':', e && e.message); }
      });
    }
    try { localStorage.setItem(MIGRADA_KEY, antiga || '-'); } catch (e) {}
    if (copiadas) console.warn('[mesa] ' + copiadas + ' chaves copiadas para a gaveta de «' + antiga + '»');
  }
  migrar();

  // ── LINKS ────────────────────────────────────────────────────────
  function link(id, pagina) {
    const alvo = pagina || 'index.html';
    const i = idDe(id);
    try { return new URL(alvo + (i ? '?mesa=' + encodeURIComponent(i) : ''), location.href).href; }
    catch (e) { return alvo + (i ? '?mesa=' + encodeURIComponent(i) : ''); }
  }
  function linkJogador(id) {
    const i = idDe(id) || ID;
    try { return new URL('jogadores.html?sala=' + encodeURIComponent(i), location.href).href; }
    catch (e) { return 'jogadores.html?sala=' + i; }
  }

  // Trocar de mesa é trocar de endereço: a aba inteira (gaveta, 📡,
  // iniciativa, rolagens) nasce de novo apontada para a campanha certa,
  // em vez de meia dúzia de módulos tentarem se re-apontar no ar.
  function abrir(id) {
    const destino = link(id, ehJogador() ? 'jogadores.html' : 'index.html');
    if (ehJogador()) return (location.href = linkJogador(id));
    location.href = destino;
  }

  window.GA_Sala = {
    id:       ID,            // '' = HUB (nenhuma mesa)
    ehHub:    !ID,
    ehJogador: ehJogador(),
    idDe:     idDe,
    chave:    chave,
    link:     link,
    linkJogador: linkJogador,
    abrir:    abrir,
    CHAVES_DA_MESA: CHAVES_DA_MESA.slice(),
  };
})();
