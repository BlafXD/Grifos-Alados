// ═══════════════════════════════════════════════════════════════════
//  CLIMA-FX.JS — o que SE MEXE no clima da ficha (27/11/2026)
//
//  O clima da ficha (ficha.js → pintarClima) pinta as bordas da tela com o
//  tom da condição, em CSS. Fogo e olhos fechando em CSS ficavam duros
//  ("o fogo não se mexe", "o fechar dos olhos tá feio" — pedido dele), então
//  esses moram aqui, num <canvas> por cima da tela, desenhado quadro a quadro:
//
//   🔥 fogo     — partículas que sobem em línguas que andam de lado, faíscas
//                 que voam alto e um brilho quente que pulsa embaixo. Do
//                 nível 3 em diante as chamas sobem também pelas laterais.
//   😴 apagado  — duas pálpebras em forma de amêndoa, de borda macia, que
//                 pesam devagar, "cochilam" (quase fecham), lutam e reabrem.
//                 Quanto maior o nível, menor a fresta e mais vezes cochila.
//
//  Só desenha: nada muda na conta da ficha. O canvas não recebe clique
//  (pointer-events: none). Para quando a aba da ficha não está à vista, quando
//  a página fica em segundo plano, e no "Menos movimento" do ⚙ (aí desenha um
//  quadro parado só). O "reduzir movimento" do Windows NÃO para — decisão dele
//  (o Windows dele vem com isso ligado e ele quer ver).
//
//  Uso: GA_ClimaFx.atualizar(host, clima, nivel) — host é o #fiClima.
//  Novos efeitos entram em EFEITOS com { iniciar(e), quadro(e) }.
// ═══════════════════════════════════════════════════════════════════
(function () {
  'use strict';

  const ESCALA = 0.5;   // o canvas em meia resolução: fogo e pálpebra são macios mesmo, e fica leve
  let host = null, canvas = null, ctx = null;
  let atual = '', nivel = 1, est = null, raf = 0, antes = 0;

  function semMovimento() { return document.documentElement.classList.contains('ga-sem-movimento'); }
  function visivel() { return !!host && host.getClientRects().length > 0 && !document.hidden; }
  function aleat(a, b) { return a + Math.random() * (b - a); }
  function suave(t) { t = Math.max(0, Math.min(1, t)); return t * t * (3 - 2 * t); }

  function garantirCanvas() {
    if (canvas && canvas.parentNode === host) return;
    canvas = document.createElement('canvas');
    canvas.className = 'fi-clima-fx';
    canvas.setAttribute('aria-hidden', 'true');
    host.appendChild(canvas);
    ctx = canvas.getContext('2d');
  }
  function medir() {
    const w = Math.max(1, Math.round(window.innerWidth * ESCALA)), h = Math.max(1, Math.round(window.innerHeight * ESCALA));
    if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; return true; }
    return false;
  }

  // ═══ 🔥 FOGO ══════════════════════════════════════════════════════
  //  As cores da chama, do miolo (quase branco) à fumaça: 32 "carimbos"
  //  redondos pré-desenhados, um por idade — desenhar um carimbo pronto é
  //  muito mais barato que montar um gradiente por partícula.
  const RAMPA = [
    [0.00, [255, 250, 220]], [0.12, [255, 226, 120]], [0.30, [255, 156, 40]],
    [0.55, [235, 82, 18]], [0.78, [150, 34, 10]], [1.00, [50, 14, 8]],
  ];
  function corNa(t) {
    for (let i = 1; i < RAMPA.length; i++) {
      if (t <= RAMPA[i][0]) {
        const [t0, c0] = RAMPA[i - 1], [t1, c1] = RAMPA[i], k = (t - t0) / (t1 - t0);
        return c0.map((v, j) => Math.round(v + (c1[j] - v) * k));
      }
    }
    return RAMPA[RAMPA.length - 1][1];
  }
  let carimbos = null;
  function fazerCarimbos() {
    if (carimbos) return carimbos;
    carimbos = [];
    for (let i = 0; i < 32; i++) {
      const c = document.createElement('canvas'); c.width = c.height = 64;
      const g = c.getContext('2d'), [r, gg, b] = corNa(i / 31);
      const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, `rgba(${r},${gg},${b},1)`);
      grad.addColorStop(0.4, `rgba(${r},${gg},${b},0.55)`);
      grad.addColorStop(1, `rgba(${r},${gg},${b},0)`);
      g.fillStyle = grad; g.fillRect(0, 0, 64, 64);
      carimbos.push(c);
    }
    return carimbos;
  }
  //  por nível (0–4): altura da chama (fração da tela), quantas nascem, faíscas, laterais
  const FOGO = [
    null,
    { alt: 0.13, taxa: 0.55, faisca: 4,  lado: 0 },
    { alt: 0.20, taxa: 0.85, faisca: 10, lado: 0 },
    { alt: 0.30, taxa: 1.15, faisca: 20, lado: 0.5 },
    { alt: 0.42, taxa: 1.5,  faisca: 34, lado: 1 },
  ];
  //  as "línguas": a altura da chama varia ao longo da borda e anda de lado
  function lingua(x, t) {
    return 0.55 + 0.25 * Math.sin(x * 0.021 + t * 1.9) + 0.2 * Math.sin(x * 0.047 - t * 2.7) * Math.sin(t * 0.8 + x * 0.004);
  }
  const fogo = {
    iniciar(e) { e.p = []; e.f = []; e.sobra = 0; e.sobraF = 0; fazerCarimbos(); },
    passo(e, dt) {
      const W = canvas.width, H = canvas.height, cfg = FOGO[nivel] || FOGO[1], t = e.t;
      // nascem embaixo, ao longo da borda
      e.sobra += W * cfg.taxa * dt * 2.2;
      while (e.sobra >= 1) {
        e.sobra--;
        const x = Math.random() * W, l = Math.max(0.15, lingua(x / ESCALA, t));
        const vida = aleat(0.55, 1.05) * (0.7 + l * 0.6);
        e.p.push({ x, y: H + aleat(0, 6), vx: aleat(-8, 8), vy: -(H * cfg.alt * l) / vida * aleat(0.8, 1.15),
          r: aleat(10, 20) * (0.8 + nivel * 0.12), vida, idade: 0, s: Math.random() * 6.28 });
      }
      // nas laterais (nível 3 e 4)
      if (cfg.lado) {
        e.sobraL = (e.sobraL || 0) + H * cfg.lado * dt * 1.6;
        while (e.sobraL >= 1) {
          e.sobraL--;
          const esq = Math.random() < 0.5, y = H * aleat(0.25, 1.05), vida = aleat(0.4, 0.8);
          e.p.push({ x: esq ? aleat(-4, W * 0.025) : W - aleat(-4, W * 0.025), y, vx: esq ? aleat(4, 16) : -aleat(4, 16),
            vy: -aleat(40, 90), r: aleat(8, 15) * (0.8 + nivel * 0.1), vida, idade: 0, s: Math.random() * 6.28 });
        }
      }
      // faíscas
      e.sobraF += cfg.faisca * dt;
      while (e.sobraF >= 1) {
        e.sobraF--;
        e.f.push({ x: Math.random() * W, y: H - aleat(0, H * cfg.alt * 0.4), vx: aleat(-15, 15), vy: -aleat(40, 110),
          vida: aleat(1.6, 3.6), idade: 0, s: Math.random() * 6.28, r: aleat(0.8, 1.8) });
      }
      // movimento: sobe, ondula, as de baixo puxam para o centro da língua
      for (let i = e.p.length - 1; i >= 0; i--) {
        const p = e.p[i];
        p.idade += dt;
        if (p.idade >= p.vida) { e.p.splice(i, 1); continue; }
        p.vx += Math.sin(p.y * 0.06 + t * 4 + p.s) * 60 * dt;
        p.vx *= 0.96;
        p.x += p.vx * dt; p.y += p.vy * dt;
        p.vy *= 0.995;
      }
      for (let i = e.f.length - 1; i >= 0; i--) {
        const f = e.f[i];
        f.idade += dt;
        if (f.idade >= f.vida || f.y < -10) { e.f.splice(i, 1); continue; }
        f.vx += Math.sin(t * 3 + f.s) * 30 * dt;
        f.x += f.vx * dt; f.y += f.vy * dt; f.vy *= 0.998;
      }
    },
    quadro(e) {
      const W = canvas.width, H = canvas.height, cfg = FOGO[nivel] || FOGO[1], t = e.t;
      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, W, H);
      // fumaça escura no alto (nível 3 e 4)
      if (nivel >= 3) {
        const g = ctx.createLinearGradient(0, 0, 0, H * 0.3);
        g.addColorStop(0, `rgba(25, 12, 8, ${0.22 * (nivel - 2)})`); g.addColorStop(1, 'rgba(25,12,8,0)');
        ctx.fillStyle = g; ctx.fillRect(0, 0, W, H * 0.3);
      }
      // o brilho que pulsa embaixo
      const pulso = 0.75 + 0.25 * Math.sin(t * 7.3) * Math.sin(t * 3.1 + 1);
      const gb = ctx.createLinearGradient(0, H, 0, H * (1 - cfg.alt * 1.6));
      gb.addColorStop(0, `rgba(255, 110, 20, ${0.55 * pulso})`);
      gb.addColorStop(0.5, `rgba(255, 70, 10, ${0.18 * pulso})`);
      gb.addColorStop(1, 'rgba(255, 60, 0, 0)');
      ctx.fillStyle = gb; ctx.fillRect(0, H * (1 - cfg.alt * 1.6), W, H * cfg.alt * 1.6);
      // as chamas: somam luz umas nas outras
      ctx.globalCompositeOperation = 'lighter';
      const C = carimbos;
      for (const p of e.p) {
        const k = p.idade / p.vida, r = p.r * (1 - k * 0.55), a = Math.pow(1 - k, 1.1) * 0.42;
        if (a <= 0.01) continue;
        ctx.globalAlpha = a;
        ctx.drawImage(C[Math.min(31, Math.floor(k * 32))], p.x - r, p.y - r, r * 2, r * 2);
      }
      for (const f of e.f) {
        const k = f.idade / f.vida, pisca = 0.6 + 0.4 * Math.sin(t * 20 + f.s * 5);
        ctx.globalAlpha = (1 - k) * pisca;
        ctx.fillStyle = k < 0.5 ? '#ffe39a' : '#ff9a3a';
        ctx.beginPath(); ctx.arc(f.x, f.y, f.r, 0, 6.283); ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
    },
  };

  // ═══ 😴 OLHOS FECHANDO (inconsciente) ═════════════════════════════
  //  A abertura `o` vai de 1 (olho aberto: só um sombreado nos cantos) a 0
  //  (fechado). Cada nível tem a abertura de base e o ritmo dos cochilos.
  const OLHO = [
    null,
    { base: 0.82, cada: [9, 14],  fundo: 0.10 },
    { base: 0.58, cada: [6, 10],  fundo: 0.05 },
    { base: 0.38, cada: [4.5, 7.5], fundo: 0.03 },
    { base: 0.2,  cada: [3, 5.5], fundo: 0.0 },
  ];
  //  um cochilo: fecha devagar, fica, acorda num susto (passa da base), treme e assenta
  function cochilo(e, t) {
    const c = OLHO[nivel] || OLHO[1];
    e.prox = t + aleat(c.cada[0], c.cada[1]);
    e.co = { ini: t, fecha: aleat(1.3, 2.2), fica: aleat(0.3, 1.1) + (nivel - 1) * 0.25, abre: aleat(0.25, 0.45) };
  }
  function fatorCochilo(e, t) {
    const co = e.co; if (!co) return 1;
    const c = OLHO[nivel] || OLHO[1], fundo = c.fundo / Math.max(0.05, c.base);
    let u = t - co.ini;
    if (u < co.fecha) return 1 - (1 - fundo) * Math.pow(suave(u / co.fecha), 1.4);
    u -= co.fecha;
    if (u < co.fica) return fundo;
    u -= co.fica;
    if (u < co.abre) return fundo + (1.12 - fundo) * suave(u / co.abre);
    u -= co.abre;
    if (u < 1.2) return 1 + 0.12 * Math.cos(u * 9) * (1 - u / 1.2);   // o tremido de quem luta para ficar acordado
    e.co = null; return 1;
  }
  const olhos = {
    iniciar(e) { e.prox = e.t + aleat(1.5, 3); e.co = null; e.o = (OLHO[nivel] || OLHO[1]).base; },
    passo(e) {
      const c = OLHO[nivel] || OLHO[1], t = e.t;
      if (!e.co && t >= e.prox) cochilo(e, t);
      //  a respiração: a pálpebra pesa e alivia, devagar
      const resp = 1 + 0.07 * Math.sin(t * 0.9) + 0.03 * Math.sin(t * 2.3);
      e.o = Math.max(0, Math.min(1.1, c.base * resp * fatorCochilo(e, t)));
    },
    quadro(e) {
      const W = canvas.width, H = canvas.height, o = e.o, N = 48;
      const cx = W / 2, cy = H / 2, larg = W * 0.78;
      //  a abertura: com o = 1 a fresta passa um pouco da tela (só os cantos
      //  ficam na sombra); a de cima desce mais que a de baixo sobe
      const cima = o * H * 0.62, baixo = o * H * 0.5;
      const curva = x => { const d = (x - cx) / larg; return Math.pow(Math.max(0, 1 - d * d), 0.75); };
      const borda = (deCima, desloca, dx) => {   // traça a borda de uma pálpebra
        ctx.beginPath();
        for (let i = 0; i <= N; i++) {
          const x = cx - larg + (2 * larg * i) / N;
          const y = deCima ? cy - cima * curva(x) - desloca : cy + baixo * curva(x) + desloca;
          if (i === 0) ctx.moveTo(x + dx, y); else ctx.lineTo(x + dx, y);
        }
      };
      ctx.save();
      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, W, H);
      // 1. a pele, escura
      ctx.fillStyle = 'rgb(9, 4, 3)'; ctx.fillRect(0, 0, W, H);
      // 2. a fresta: uma amêndoa recortada com borda macia (o recorte é a
      //    SOMBRA borrada de uma amêndoa desenhada fora da tela)
      const FORA = W * 3, macio = 10 + o * 22;
      ctx.globalCompositeOperation = 'destination-out';
      ctx.shadowColor = '#000'; ctx.shadowBlur = macio; ctx.shadowOffsetX = FORA;
      borda(true, 0, -FORA);
      for (let i = N; i >= 0; i--) { const x = cx - larg + (2 * larg * i) / N; ctx.lineTo(x - FORA, cy + baixo * curva(x)); }
      ctx.closePath(); ctx.fill();
      ctx.shadowOffsetX = 0;
      // 3. o volume: a beirada da pálpebra pega luz (só pinta onde já há pele)
      ctx.globalCompositeOperation = 'source-atop';
      ctx.lineJoin = 'round';
      ctx.shadowColor = 'rgba(110, 52, 38, 0.6)'; ctx.shadowBlur = 34;
      ctx.strokeStyle = 'rgba(90, 42, 30, 0.28)'; ctx.lineWidth = H * 0.06;
      borda(true, H * 0.035, 0); ctx.stroke();
      ctx.strokeStyle = 'rgba(80, 36, 28, 0.2)'; ctx.lineWidth = H * 0.04;
      borda(false, H * 0.025, 0); ctx.stroke();
      // 4. os cílios: a linha escura bem na beirada de cima (e mais fina embaixo)
      ctx.globalCompositeOperation = 'source-over';
      if (o > 0.005) {
        ctx.shadowColor = 'rgba(0, 0, 0, 0.9)'; ctx.shadowBlur = 8;
        ctx.strokeStyle = 'rgba(4, 2, 2, 0.85)'; ctx.lineWidth = Math.max(1.5, 4 * Math.min(1, o * 4));
        borda(true, macio * 0.15, 0); ctx.stroke();
        ctx.lineWidth = Math.max(1, 2 * Math.min(1, o * 4)); ctx.strokeStyle = 'rgba(4, 2, 2, 0.6)';
        borda(false, macio * 0.15, 0); ctx.stroke();
      }
      ctx.restore();
      // 5. quase fechado, a pouca luz que passa é vermelha
      const fecha = Math.max(0, Math.min(1, 1 - o));
      if (fecha > 0.65) { ctx.fillStyle = `rgba(70, 10, 6, ${((fecha - 0.65) * 0.55).toFixed(3)})`; ctx.fillRect(0, 0, W, H); }
      host.style.setProperty('--fecha', fecha.toFixed(3));
    },
  };

  const EFEITOS = { fogo: fogo, apagado: olhos };

  function laco(agora) {
    raf = 0;
    if (!atual || !est) return;
    const dt = Math.min(0.05, Math.max(0, (agora - antes) / 1000)); antes = agora;
    if (visivel()) {
      medir();
      est.t += dt;
      const ef = EFEITOS[atual];
      if (ef.passo) ef.passo(est, dt);
      ef.quadro(est);
    }
    if (!semMovimento()) raf = requestAnimationFrame(laco);
  }
  //  "Menos movimento": um quadro só, depois de simular uns segundos (para
  //  o fogo já estar aceso e o olho na fresta de base).
  function quadroParado() {
    const ef = EFEITOS[atual]; if (!ef || !est) return;
    medir();
    for (let i = 0; i < 90; i++) { est.t += 1 / 30; if (ef.passo) ef.passo(est, 1 / 30); }
    if (est.co) est.co = null;
    if (ef === olhos) est.o = (OLHO[nivel] || OLHO[1]).base;
    ef.quadro(est);
  }

  function parar() {
    if (raf) cancelAnimationFrame(raf); raf = 0;
    atual = ''; est = null;
    if (canvas) { canvas.remove(); canvas = null; ctx = null; }
    if (host) host.style.removeProperty('--fecha');
  }

  function atualizar(el, clima, nv) {
    host = el;
    const ef = (clima && nv > 0) ? EFEITOS[clima] : null;
    if (!ef) { if (atual) parar(); return; }
    const mudouNivel = nv !== nivel;
    nivel = nv;
    if (clima !== atual) {
      parar(); host = el; atual = clima;
      garantirCanvas(); medir();
      est = { t: 0 }; ef.iniciar(est);
    } else if (mudouNivel && ef === olhos) {
      est.co = null; est.prox = est.t + 1;
    }
    garantirCanvas();
    if (semMovimento()) { if (raf) cancelAnimationFrame(raf); raf = 0; quadroParado(); return; }
    if (!raf) { antes = performance.now(); raf = requestAnimationFrame(laco); }
  }

  //  voltou da aba de fundo ou desligou o "Menos movimento": retoma
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && atual && !raf && !semMovimento()) { antes = performance.now(); raf = requestAnimationFrame(laco); }
  });
  new MutationObserver(() => { if (atual && host) atualizar(host, atual, nivel); })
    .observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

  window.GA_ClimaFx = { atualizar: atualizar, efeitos: () => Object.keys(EFEITOS) };
})();
