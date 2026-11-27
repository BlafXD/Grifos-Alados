/* ═══════════════════════════════════════════════════════════════════
   DADO ANIMADO — o d20 que rola na tela, com som (26/11/2026)
   Pedido dele: "quando aparecer o pop up, pedindo o dado, quero que tenha
   uma animação de um dado rolando e tirando o valor dele" — e depois:
   "mais bem feita, mas sem deixar o site pesado" e "vamos para os áudios".

   GA_DadoAnimado.rolar(onde, valor, lados) → Promise
     · `onde`  — o elemento onde o dado aparece (é esvaziado);
     · `valor` — o número que JÁ SAIU (o sorteio é feito antes, por quem
                 chama: a animação só mostra, nunca decide);
     · `lados` — 20 por padrão.

   O MOVIMENTO é só CSS (transform 3D, sem imagem nem biblioteca): o dado
   entra pelo alto, tomba em X/Y/Z, quica TRÊS vezes perdendo força e
   assenta; uma sombra elíptica na "mesa" cresce nos impactos e encolhe
   nos pulos. O JS só troca a face (rápido no começo, devagar no fim).

   O SOM é sintetizado na hora (Web Audio): cada impacto é um estalo de
   madeira (ruído curto filtrado + um "toc"), e entre eles chocalham
   estalinhos fracos. Nenhum arquivo é baixado. 🔊/🔇 ao lado do dado,
   lembrado neste aparelho. Quem liga "Menos movimento" no painel ⚙ do
   site vê o número direto (e ouve um toc só).
   ═══════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  const DURACAO = 1300;
  //  os três impactos do CSS (18%, 46%, 70% de 1,3 s) e a força de cada um
  const IMPACTOS = [[0.18, 1], [0.46, 0.7], [0.70, 0.45], [0.92, 0.2]];
  const CHAVE_SOM = 'grifosAlados.somDados';

  function semMovimento() {
    //  a escolha do painel ⚙ do site ("Menos movimento"), e não a do sistema:
    //  o pedido dele é VER o dado rolar, e o Windows dele vem com as animações
    //  desligadas — seguir o sistema apagaria o que ele pediu sem dizer nada.
    return document.documentElement.classList.contains('ga-sem-movimento');
  }
  function somLigado() { try { return localStorage.getItem(CHAVE_SOM) !== '0'; } catch (e) { return true; } }
  function ligarSom(v) { try { localStorage.setItem(CHAVE_SOM, v ? '1' : '0'); } catch (e) {} }

  // ── O SOM ─────────────────────────────────────────────────────────
  let ctx = null, ruido = null;
  function audio() {
    if (ctx) return ctx;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    //  meio segundo de ruído branco, gerado uma vez e reaproveitado
    ruido = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.5), ctx.sampleRate);
    const d = ruido.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    return ctx;
  }
  //  um estalo de dado na madeira: `forca` 0..1, `quando` em segundos a partir de agora
  function estalo(forca, quando) {
    const c = audio(); if (!c) return;
    const t = c.currentTime + quando;
    const vol = 0.55 * forca;
    //  o "clac": ruído curto num passa-banda agudo (o plástico do dado)
    const src = c.createBufferSource(); src.buffer = ruido;
    const bp = c.createBiquadFilter(); bp.type = 'bandpass';
    bp.frequency.value = 2200 + Math.random() * 1600; bp.Q.value = 1.4;
    const g = c.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.003);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.05 + 0.04 * forca);
    src.connect(bp); bp.connect(g); g.connect(c.destination);
    src.start(t, Math.random() * 0.4, 0.12);
    //  o "toc": o corpo da mesa, um seno grave que morre rápido
    if (forca > 0.3) {
      const o = c.createOscillator(); o.type = 'sine';
      o.frequency.setValueAtTime(190 + 60 * Math.random(), t);
      o.frequency.exponentialRampToValueAtTime(90, t + 0.08);
      const g2 = c.createGain();
      g2.gain.setValueAtTime(0.0001, t);
      g2.gain.exponentialRampToValueAtTime(0.35 * forca, t + 0.004);
      g2.gain.exponentialRampToValueAtTime(0.0001, t + 0.1);
      o.connect(g2); g2.connect(c.destination);
      o.start(t); o.stop(t + 0.12);
    }
  }
  function somDaRolagem(curto) {
    if (!somLigado()) return;
    try {
      const c = audio(); if (!c) return;
      if (c.state === 'suspended') c.resume();
      if (curto) { estalo(0.8, 0); return; }
      const dur = DURACAO / 1000;
      IMPACTOS.forEach(([p, f]) => estalo(f, p * dur));
      //  o chocalhar entre os impactos: estalinhos fracos e espaçados ao acaso
      for (let k = 0; k < 7; k++) estalo(0.08 + Math.random() * 0.12, (0.2 + Math.random() * 0.6) * dur);
    } catch (e) {}
  }

  // ── O DESENHO ─────────────────────────────────────────────────────
  //  um d20 visto de frente: o hexágono de fora, o triângulo da face e as arestas
  function svgD20() {
    return '<svg class="ga-dado-svg" viewBox="0 0 100 100" aria-hidden="true">' +
      '<polygon class="ga-dado-casca" points="50,3 93,27 93,73 50,97 7,73 7,27"/>' +
      '<polygon class="ga-dado-lado ga-dado-lado--a" points="50,3 93,27 50,20"/>' +
      '<polygon class="ga-dado-lado ga-dado-lado--b" points="7,27 50,3 50,20"/>' +
      '<polygon class="ga-dado-lado ga-dado-lado--c" points="20,68 50,97 80,68"/>' +
      '<polygon class="ga-dado-face" points="50,20 80,68 20,68"/>' +
      '<line class="ga-dado-aresta" x1="93" y1="27" x2="80" y2="68"/>' +
      '<line class="ga-dado-aresta" x1="7" y1="27" x2="20" y2="68"/>' +
      '<line class="ga-dado-aresta" x1="93" y1="73" x2="80" y2="68"/>' +
      '<line class="ga-dado-aresta" x1="7" y1="73" x2="20" y2="68"/>' +
      '</svg>';
  }

  function rolar(onde, valor, lados) {
    lados = lados || 20;
    return new Promise(resolve => {
      if (!onde) { resolve(); return; }
      onde.innerHTML =
        '<div class="ga-dado ga-dado--rolando" role="img" aria-label="Dado de ' + lados + ' rolando">' +
          '<span class="ga-dado-sombra" aria-hidden="true"></span>' +
          '<span class="ga-dado-corpo">' + svgD20() + '<span class="ga-dado-num">?</span></span>' +
        '</div>' +
        '<button type="button" class="ga-dado-som" aria-pressed="' + somLigado() + '" title="Som dos dados (lembrado neste aparelho)">' +
          (somLigado() ? '🔊' : '🔇') + '</button>';
      const dado = onde.querySelector('.ga-dado'), num = dado.querySelector('.ga-dado-num');
      const botSom = onde.querySelector('.ga-dado-som');
      botSom.addEventListener('click', () => {
        const v = !somLigado(); ligarSom(v);
        botSom.textContent = v ? '🔊' : '🔇'; botSom.setAttribute('aria-pressed', String(v));
      });
      const fim = () => {
        num.textContent = String(valor);
        dado.classList.remove('ga-dado--rolando');
        dado.classList.add('ga-dado--parou');
        if (lados === 20 && valor === 20) dado.classList.add('ga-dado--critico');
        if (lados === 20 && valor === 1) dado.classList.add('ga-dado--falha');
        dado.setAttribute('aria-label', 'Dado de ' + lados + ': ' + valor);
        resolve();
      };
      if (semMovimento()) { somDaRolagem(true); fim(); return; }
      somDaRolagem(false);
      //  as faces trocam rápido no começo e devagar no fim, como um dado que
      //  perde força; a luz das faces laterais alterna junto (o dado "vira")
      const t0 = performance.now();
      let proxima = 0, lado = 0;
      function passo(agora) {
        const t = agora - t0;
        if (t >= DURACAO) { fim(); return; }
        if (t >= proxima) {
          let n; do { n = 1 + Math.floor(Math.random() * lados); } while (String(n) === num.textContent && lados > 1);
          num.textContent = String(n);
          dado.setAttribute('data-luz', String(lado = (lado + 1) % 3));
          proxima = t + 45 + 230 * Math.pow(t / DURACAO, 2);
        }
        requestAnimationFrame(passo);
      }
      requestAnimationFrame(passo);
    });
  }

  // ── O DADO EM TODA ROLAGEM (26/11/2026) ──────────────────────────
  //  Chamado pelo GA_Rolagens.rolarEPublicar — perícias, ataques e dano da
  //  ficha, os 🎯/💥 do ⚔ Combates. Um cartãozinho flutuante embaixo, no
  //  meio da tela, que NÃO trava nada: o dado rola, para, mostra o total e
  //  some sozinho (ou com um clique). Com um d20 na conta, o dado para no
  //  NATURAL e o total vem ao lado; sem d20 (dano), ele para no total.
  function pilhaToast() {
    let p = document.getElementById('gaDadoPilha');
    if (!p) {
      p = document.createElement('div');
      p.id = 'gaDadoPilha'; p.className = 'ga-dado-pilha';
      p.setAttribute('aria-live', 'polite');
      document.body.appendChild(p);
    }
    return p;
  }
  function mostrar(r, rotulo, expr) {
    if (!r || typeof r.total !== 'number' || !document.body) return;
    const d20 = (r.dados || []).find(d => d.lados === 20);
    const natural = d20 ? d20.rolls[0] : null;
    const p = pilhaToast();
    while (p.children.length >= 3) p.removeChild(p.firstChild);
    const card = document.createElement('div');
    card.className = 'ga-dado-toast';
    card.title = 'Clique para fechar';
    const esc = window.GA_esc || (s => String(s));
    card.innerHTML = '<div class="ga-dado-toast-dado"></div>' +
      '<div class="ga-dado-toast-txt"><span class="ga-dado-toast-rot">' + esc(rotulo || expr || 'Rolagem') + '</span>' +
      '<span class="ga-dado-toast-tot" hidden>' + (natural != null ? esc(expr || '') + ' = ' : '') + '<strong>' + esc(r.total) + '</strong></span></div>';
    p.appendChild(card);
    const tirar = () => { if (card.parentNode) card.parentNode.removeChild(card); };
    card.addEventListener('click', tirar);
    const alvo = card.querySelector('.ga-dado-toast-dado');
    rolar(alvo, natural != null ? natural : r.total, natural != null ? 20 : 0).then(() => {
      const som = alvo.querySelector('.ga-dado-som'); if (som) som.remove();   // o 🔊 mora no pop-up
      card.querySelector('.ga-dado-toast-tot').hidden = false;
      setTimeout(tirar, 2600);
    });
  }
  //  quanto esperar antes de mostrar um número que o dado ainda vai "tirar"
  function duracao() { return semMovimento() ? 0 : DURACAO; }

  // ── O SINO DA VEZ (26/11/2026) ───────────────────────────────────
  //  "É a sua vez!": dois toques de sino, curtos e suaves (seno com um
  //  harmônico), no mesmo 🔊/🔇 dos dados.
  function sino() {
    if (!somLigado()) return;
    try {
      const c = audio(); if (!c) return;
      if (c.state === 'suspended') c.resume();
      [[880, 0], [1318.5, 0.16]].forEach(([fr, dt]) => {
        const t = c.currentTime + dt;
        [1, 2.01].forEach((h, k) => {
          const o = c.createOscillator(); o.type = 'sine'; o.frequency.value = fr * h;
          const g = c.createGain();
          g.gain.setValueAtTime(0.0001, t);
          g.gain.exponentialRampToValueAtTime(k ? 0.04 : 0.16, t + 0.01);
          g.gain.exponentialRampToValueAtTime(0.0001, t + 0.9);
          o.connect(g); g.connect(c.destination); o.start(t); o.stop(t + 1);
        });
      });
    } catch (e) {}
  }

  window.GA_DadoAnimado = { rolar: rolar, mostrar: mostrar, duracao: duracao, sino: sino, somLigado: somLigado, ligarSom: ligarSom };
})();
