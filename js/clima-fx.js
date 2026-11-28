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
//   …e as outras 18 (etapa 4): sangue escorrendo, névoa do cego, clarão do
//   ofuscado, bolhas de veneno, sombras e olhos do medo, "?" do confuso,
//   estrelinhas do atordoado, corações do enfeitiçado, anéis do fascinado,
//   gelo do lento, pedra que racha, cipós do preso, poeira, chuva, ondas
//   abafadas do surdo, mira da guarda baixa e poeira do chão.
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
    host.classList.add('fi-clima--fx');
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

  // ═══ AS OUTRAS CONDIÇÕES (27/11/2026, etapa 4) ════════════════════
  //  Cada clima ganhou um desenho que diz o que ele É, sem precisar ler:
  //  sangue escorre, a névoa do cego fecha, o veneno borbulha, o medo tem
  //  olhos no escuro, o atordoado vê estrelas, a pedra racha e sobe pelas
  //  bordas… O nível (0–4) manda em quanto: mais gotas, mais névoa, mais
  //  da borda tomada. As peças comuns ficam aqui em cima.

  //  quanto pesa cada nível (1 = o normal)
  function F() { return [0, 0.55, 0.8, 1.05, 1.35][nivel] || 0.8; }
  //  carimbo redondo e macio de uma cor (cacheado: 'r,g,b' → canvas)
  const carimboCor = {};
  function bolha(cor) {
    if (carimboCor[cor]) return carimboCor[cor];
    const c = document.createElement('canvas'); c.width = c.height = 64;
    const g = c.getContext('2d'), gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    gr.addColorStop(0, `rgba(${cor},1)`); gr.addColorStop(0.45, `rgba(${cor},0.5)`); gr.addColorStop(1, `rgba(${cor},0)`);
    g.fillStyle = gr; g.fillRect(0, 0, 64, 64);
    return (carimboCor[cor] = c);
  }
  function mancha(cor, x, y, r, a) {
    if (a <= 0.005 || r <= 0) return;
    ctx.globalAlpha = Math.min(1, a); ctx.drawImage(bolha(cor), x - r, y - r, r * 2, r * 2);
  }
  //  um ponto perto de uma das 4 bordas, com a direção "para dentro"
  function naBorda(W, H, prof) {
    const lado = Math.floor(Math.random() * 4), d = Math.random() * prof;
    if (lado === 0) return { x: Math.random() * W, y: d, nx: 0, ny: 1 };
    if (lado === 1) return { x: Math.random() * W, y: H - d, nx: 0, ny: -1 };
    if (lado === 2) return { x: d, y: Math.random() * H, nx: 1, ny: 0 };
    return { x: W - d, y: Math.random() * H, nx: -1, ny: 0 };
  }
  //  vinheta: escurece/colore as bordas (o miolo fica limpo)
  function vinheta(cor, a, miolo) {
    const W = canvas.width, H = canvas.height, R = Math.hypot(W, H) / 2;
    const g = ctx.createRadialGradient(W / 2, H / 2, R * (miolo == null ? 0.45 : miolo), W / 2, H / 2, R);
    g.addColorStop(0, `rgba(${cor},0)`); g.addColorStop(1, `rgba(${cor},${Math.min(1, a)})`);
    ctx.globalAlpha = 1; ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  }
  //  o motor de partículas que quase todos usam
  function particulas(cfg) {
    return {
      iniciar(e) { e.p = []; e.sobra = 0; if (cfg.iniciar) cfg.iniciar(e); },
      passo(e, dt) {
        const W = canvas.width, H = canvas.height;
        e.sobra += cfg.taxa(W, H) * dt;
        while (e.sobra >= 1) { e.sobra--; e.p.push(Object.assign({ idade: 0, s: Math.random() * 6.283, vx: 0, vy: 0 }, cfg.nasce(W, H, e))); }
        for (let i = e.p.length - 1; i >= 0; i--) {
          const p = e.p[i];
          p.idade += dt;
          if (p.idade >= p.vida) { e.p.splice(i, 1); continue; }
          if (cfg.mover) cfg.mover(p, dt, e, W, H);
          p.x += p.vx * dt; p.y += p.vy * dt;
        }
        if (cfg.passo) cfg.passo(e, dt, W, H);
      },
      quadro(e) {
        const W = canvas.width, H = canvas.height;
        ctx.save();
        ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1;
        ctx.clearRect(0, 0, W, H);
        if (cfg.fundo) cfg.fundo(e, W, H);
        ctx.globalCompositeOperation = cfg.modo || 'source-over';
        for (const p of e.p) cfg.desenha(p, p.idade / p.vida, e, W, H);
        ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1;
        if (cfg.frente) cfg.frente(e, W, H);
        ctx.restore();
      },
    };
  }
  //  "entra e sai" suave ao longo da vida (0 no começo e no fim)
  function vaiVem(k) { return Math.sin(Math.PI * Math.min(1, Math.max(0, k))); }

  //  GALHOS: linhas que nascem nas bordas e entram na tela se ramificando —
  //  rachaduras da pedra, cristais de gelo, cipós. Geradas uma vez (pelo
  //  tamanho do canvas); o nível só revela MAIS ou MENOS delas (`prof`).
  function gerarGalhos(W, H, n, passo, curva, ramo) {
    const seg = [];
    function cresce(x, y, ang, comp, larg, prof0, nivel0) {
      let px = x, py = y, a = ang;
      const passos = Math.max(2, Math.round(comp / passo));
      for (let i = 0; i < passos; i++) {
        a += (Math.random() - 0.5) * curva;
        const nx = px + Math.cos(a) * passo, ny = py + Math.sin(a) * passo;
        const prof = prof0 + (i / passos) * (1 - prof0) * 0.9;
        seg.push({ x1: px, y1: py, x2: nx, y2: ny, w: larg * (1 - i / passos * 0.7), prof: prof, n: nivel0, s: Math.random() * 6.28 });
        if (nivel0 < 3 && Math.random() < ramo) cresce(nx, ny, a + (Math.random() < 0.5 ? -1 : 1) * aleat(0.4, 1.1), comp * aleat(0.3, 0.55), larg * 0.6, prof, nivel0 + 1);
        px = nx; py = ny;
      }
    }
    for (let i = 0; i < n; i++) {
      const b = naBorda(W, H, 2);
      const ang = Math.atan2(b.ny, b.nx) + (Math.random() - 0.5) * 0.9;
      cresce(b.x, b.y, ang, Math.min(W, H) * aleat(0.28, 0.55), aleat(1.6, 3.2), 0, 0);
    }
    return seg;
  }
  //  a cobertura anda devagar até o alvo do nível (a pedra "sobe", o gelo "cresce")
  function cobrir(e, dt, alvo) { e.cob = (e.cob || 0) + (alvo - (e.cob || 0)) * Math.min(1, dt * 0.7); }
  function galhosProntos(e, W, H, gerar) {
    if (!e.g || e.gW !== W || e.gH !== H) { e.g = gerar(W, H); e.gW = W; e.gH = H; }
    return e.g;
  }

  // ── 🩸 SANGRANDO: gotas que se formam no alto e escorrem, com rastro;
  //    as bordas pulsam vermelho no ritmo de um coração
  const sangue = particulas({
    taxa: () => 2.2 * F() + 0.6,
    nasce: (W, H) => ({ x: Math.random() * W, y: -4, vida: aleat(4, 7), w: aleat(2.2, 4.5),
      alvo: H * aleat(0.08, 0.2 + 0.28 * F()), y0: -4 }),
    mover: (p, dt, e) => {
      //  escorre aos trancos: anda, quase para, anda
      const ritmo = 0.25 + 0.75 * Math.pow(Math.abs(Math.sin(e.t * 0.9 + p.s)), 3);
      p.vy = p.y < p.alvo ? 26 * ritmo + 4 : 0;
    },
    fundo: (e, W, H) => {
      const bat = e.t % 1.15, pulso = Math.max(0, Math.cos(bat * 9)) * (bat < 0.35 ? 1 : 0.0);
      vinheta('120,0,8', 0.35 * F() + 0.3 * pulso * F(), 0.5);
      const g = ctx.createLinearGradient(0, 0, 0, H * 0.06);
      g.addColorStop(0, `rgba(95,0,6,${0.75 * F()})`); g.addColorStop(1, 'rgba(95,0,6,0)');
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H * 0.06);
    },
    desenha: (p, k) => {
      const a = k > 0.8 ? (1 - k) / 0.2 : 1;
      const g = ctx.createLinearGradient(0, p.y0, 0, p.y);
      g.addColorStop(0, `rgba(90,0,6,${0.85 * a})`); g.addColorStop(1, `rgba(140,4,12,${0.95 * a})`);
      ctx.globalAlpha = 1; ctx.strokeStyle = g; ctx.lineWidth = p.w; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(p.x, p.y0); ctx.lineTo(p.x, p.y); ctx.stroke();
      // a gota na ponta, mais gorda, com um brilho
      ctx.fillStyle = `rgba(150,6,14,${a})`;
      ctx.beginPath(); ctx.ellipse(p.x, p.y + p.w * 0.6, p.w * 0.95, p.w * 1.35, 0, 0, 6.283); ctx.fill();
      ctx.fillStyle = `rgba(255,150,150,${0.45 * a})`;
      ctx.beginPath(); ctx.arc(p.x - p.w * 0.3, p.y + p.w * 0.2, p.w * 0.28, 0, 6.283); ctx.fill();
    },
  });

  // ── 🌫 CEGO: névoa branca que vem das bordas e fecha sobre a tela
  const cego = particulas({
    taxa: () => 3 * F(),
    nasce: (W, H) => {
      const b = naBorda(W, H, 4), dentro = Math.random() * Math.min(W, H) * 0.35 * F();
      return { x: b.x + b.nx * dentro, y: b.y + b.ny * dentro, vx: aleat(-6, 6), vy: aleat(-4, 4),
        r: Math.min(W, H) * aleat(0.18, 0.34), vida: aleat(6, 11) };
    },
    iniciar: (e) => { e.p = []; },
    fundo: () => vinheta('245,245,240', 0.5 * F(), 0.35),
    desenha: (p, k) => mancha('250,250,246', p.x, p.y, p.r * (0.85 + 0.3 * k), 0.32 * F() * vaiVem(k)),
  });

  // ── ☀ OFUSCADO: um clarão num canto, raios girando devagar e reflexos de lente
  const ofuscado = {
    iniciar(e) { e.p = []; },
    passo() {},
    quadro(e) {
      const W = canvas.width, H = canvas.height, t = e.t, f = F();
      ctx.save(); ctx.clearRect(0, 0, W, H);
      const sx = W * (0.12 + 0.04 * Math.sin(t * 0.21)), sy = H * (0.1 + 0.04 * Math.cos(t * 0.17));
      ctx.globalCompositeOperation = 'lighter';
      // os raios
      for (let i = 0; i < 14; i++) {
        const ang = i * 6.283 / 14 + t * 0.06, comp = Math.hypot(W, H) * (0.35 + 0.25 * f) * (0.7 + 0.3 * Math.sin(i * 7.1 + t * 0.8));
        const larg = 0.05 + 0.03 * Math.sin(i * 3.3);
        const g = ctx.createLinearGradient(sx, sy, sx + Math.cos(ang) * comp, sy + Math.sin(ang) * comp);
        g.addColorStop(0, `rgba(255,248,215,${0.35 * f})`); g.addColorStop(1, 'rgba(255,240,200,0)');
        ctx.fillStyle = g; ctx.globalAlpha = 1;
        ctx.beginPath(); ctx.moveTo(sx, sy);
        ctx.lineTo(sx + Math.cos(ang - larg) * comp, sy + Math.sin(ang - larg) * comp);
        ctx.lineTo(sx + Math.cos(ang + larg) * comp, sy + Math.sin(ang + larg) * comp);
        ctx.closePath(); ctx.fill();
      }
      // o sol
      mancha('255,250,225', sx, sy, Math.min(W, H) * (0.25 + 0.2 * f), 0.9);
      mancha('255,255,255', sx, sy, Math.min(W, H) * 0.08, 1);
      // os reflexos, na linha do sol até o lado oposto
      const cores = ['255,200,120', '160,220,255', '200,255,190', '255,170,220', '255,240,160'];
      for (let i = 0; i < 6; i++) {
        const u = 0.35 + i * 0.22, x = sx + (W / 2 - sx) * 2 * u, y = sy + (H / 2 - sy) * 2 * u;
        mancha(cores[i % 5], x, y, Math.min(W, H) * (0.03 + 0.05 * ((i * 37) % 5) / 5), 0.25 * f);
      }
      ctx.restore();
    },
  };

  // ── 🧪 ENVENENADO (e doente, enjoado): bolhas verdes sobem das bordas e
  //    estouram; um vapor verde rasteja embaixo
  const veneno = particulas({
    taxa: () => 9 * F(),
    nasce: (W, H) => {
      const daBase = Math.random() < 0.7;
      return { x: daBase ? Math.random() * W : (Math.random() < 0.5 ? aleat(0, W * 0.06) : W - aleat(0, W * 0.06)),
        y: daBase ? H + 6 : H * aleat(0.3, 1), vy: -aleat(18, 45), r: aleat(2.5, 7) * (0.8 + F() * 0.4),
        vida: aleat(2, 4.5), sobe: H * aleat(0.12, 0.25 + 0.3 * F()) };
    },
    mover: (p, dt, e) => { p.vx = Math.sin(e.t * 2.2 + p.s) * 10; },
    fundo: (e, W, H) => {
      vinheta('70,140,20', 0.3 * F(), 0.5);
      for (let i = 0; i < 7; i++) {
        const x = W * ((i / 6 + e.t * 0.015 * (i % 2 ? 1 : -1)) % 1 + 1) % W;
        mancha('90,170,40', (x + W) % W, H * (0.98 - 0.03 * Math.sin(e.t + i)), H * (0.12 + 0.1 * F()), 0.28 * F());
      }
    },
    desenha: (p, k) => {
      const estoura = k > 0.88, a = estoura ? (1 - k) / 0.12 : Math.min(1, k * 5);
      const r = estoura ? p.r * (1 + (k - 0.88) * 14) : p.r;
      ctx.globalAlpha = 0.85 * a;
      ctx.strokeStyle = 'rgba(170,235,80,0.9)'; ctx.lineWidth = estoura ? 1 : 1.3;
      ctx.fillStyle = 'rgba(80,150,20,0.25)';
      ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, 6.283); if (!estoura) ctx.fill(); ctx.stroke();
      if (!estoura) { ctx.fillStyle = 'rgba(235,255,200,0.8)'; ctx.beginPath(); ctx.arc(p.x - r * 0.35, p.y - r * 0.35, r * 0.25, 0, 6.283); ctx.fill(); }
    },
  });

  // ── 😱 APAVORADO / 😨 ABALADO: sombras que avançam das bordas no ritmo de
  //    um coração disparado; no apavorado, olhos se abrem no escuro
  function medoFx(forte) {
    return particulas({
      taxa: () => (forte ? 7 : 4) * F(),
      nasce: (W, H) => {
        const b = naBorda(W, H, 2);
        return { x: b.x, y: b.y, nx: b.nx, ny: b.ny, r: Math.min(W, H) * aleat(0.16, 0.3), vida: aleat(2.5, 4.5), ent: Math.min(W, H) * aleat(0.08, 0.2) * F() };
      },
      mover: (p, dt) => { const k = p.idade / p.vida; p.vx = p.nx * p.ent * Math.cos(k * Math.PI); p.vy = p.ny * p.ent * Math.cos(k * Math.PI); },
      iniciar: (e) => { e.olhos = []; e.proxOlho = 2; },
      passo: (e, dt, W, H) => {
        if (!forte || nivel < 2) return;
        if (e.t > e.proxOlho) {
          const b = naBorda(W, H, Math.min(W, H) * 0.09);
          e.olhos.push({ x: b.x, y: b.y, ini: e.t, dura: aleat(1.8, 3.2), r: aleat(1.6, 2.6) * (0.8 + F() * 0.3) });
          e.proxOlho = e.t + aleat(0.6, 2.2) / F();
        }
        e.olhos = e.olhos.filter(o => e.t - o.ini < o.dura);
      },
      fundo: (e) => {
        const bpm = forte ? 1.9 + nivel * 0.25 : 1.3, fase = (e.t * bpm) % 1;
        const bat = fase < 0.12 ? fase / 0.12 : fase < 0.3 ? 1 - (fase - 0.12) / 0.18 : 0;
        vinheta(forte ? '70,15,95' : '80,45,110', (forte ? 0.6 : 0.42) * F() + 0.3 * bat * F(), 0.38 - 0.08 * bat);
      },
      desenha: (p, k) => mancha(forte ? '55,10,80' : '70,40,100', p.x, p.y, p.r, 0.7 * vaiVem(k) * F()),
      frente: (e) => {
        for (const o of e.olhos) {
          const u = (e.t - o.ini) / o.dura, pisca = (u > 0.45 && u < 0.5) ? 0.15 : 1;
          const a = vaiVem(u) * pisca;
          for (const lado of [-1, 1]) {
            mancha('255,40,30', o.x + lado * o.r * 3.2, o.y, o.r * 3.5, 0.5 * a);
            ctx.globalAlpha = a; ctx.fillStyle = '#ffd7a0';
            ctx.beginPath(); ctx.ellipse(o.x + lado * o.r * 3.2, o.y, o.r, o.r * 0.55 * pisca + 0.1, 0, 0, 6.283); ctx.fill();
          }
        }
      },
    });
  }

  // ── 😵 CONFUSO: pontos coloridos girando em espiral e "?" flutuando
  const confuso = particulas({
    taxa: () => 14 * F(),
    nasce: (W, H) => ({ ang: Math.random() * 6.283, raio: Math.hypot(W, H) * aleat(0.32, 0.55), vida: aleat(3, 5),
      hue: Math.floor(Math.random() * 360), r: aleat(1.5, 3.5), x: 0, y: 0 }),
    mover: (p, dt, e, W, H) => {
      p.ang += dt * (0.9 + 0.6 * F()); p.raio *= 1 - dt * 0.05;
      p.x = W / 2 + Math.cos(p.ang) * p.raio * 1.25 - p.vx * dt; p.y = H / 2 + Math.sin(p.ang) * p.raio * 0.8 - p.vy * dt;
    },
    iniciar: (e) => { e.q = []; for (let i = 0; i < 7; i++) e.q.push({ s: Math.random() * 6.28, u: Math.random(), v: Math.random() }); },
    fundo: (e) => vinheta(`${Math.round(150 + 60 * Math.sin(e.t))},${Math.round(70 + 40 * Math.sin(e.t * 1.3))},${Math.round(200 + 40 * Math.cos(e.t * 0.7))}`, 0.32 * F(), 0.45),
    modo: 'lighter',
    desenha: (p, k) => { ctx.globalAlpha = 0.9 * vaiVem(k); ctx.fillStyle = `hsl(${(p.hue + p.idade * 90) % 360},90%,65%)`;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.fill(); },
    frente: (e, W, H) => {
      const n = Math.round(2 + nivel * 1.3);
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      for (let i = 0; i < n && i < e.q.length; i++) {
        const q = e.q[i], perto = i % 2 ? q.u : 1 - q.u;
        const x = W * (perto < 0.5 ? 0.04 + 0.12 * q.v : 0.84 + 0.12 * q.v), y = H * ((q.v * 0.8 + 0.1 + e.t * 0.02 * (i % 2 ? 1 : -1)) % 1 + 1) % H;
        ctx.save(); ctx.translate(x, (y + H) % H); ctx.rotate(Math.sin(e.t * 1.3 + q.s) * 0.5);
        ctx.globalAlpha = 0.35 + 0.25 * Math.sin(e.t * 2 + q.s);
        ctx.font = `bold ${Math.round(Math.min(W, H) * (0.05 + 0.015 * nivel))}px Georgia, serif`;
        ctx.fillStyle = `hsl(${(e.t * 40 + i * 50) % 360},70%,70%)`; ctx.fillText('?', 0, 0);
        ctx.restore();
      }
    },
  });

  // ── 💫 ATORDOADO / PASMO: estrelinhas girando no alto da tela, e a
  //    vista dá um "branco" de leve a cada volta
  function estrela(x, y, r, giro) {
    ctx.beginPath();
    for (let i = 0; i < 10; i++) {
      const a = giro + i * Math.PI / 5, rr = i % 2 ? r * 0.45 : r;
      if (i === 0) ctx.moveTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr); else ctx.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr);
    }
    ctx.closePath(); ctx.fill();
  }
  const atordoado = {
    iniciar() {}, passo() {},
    quadro(e) {
      const W = canvas.width, H = canvas.height, t = e.t, n = 3 + nivel;
      ctx.save(); ctx.clearRect(0, 0, W, H);
      const flash = Math.pow(Math.max(0, Math.sin(t * 1.6)), 12);
      vinheta('255,250,210', 0.3 * F() + 0.35 * flash * F(), 0.4);
      const cx = W / 2, cy = H * 0.13, rx = W * (0.1 + 0.03 * nivel), ry = H * 0.045;
      const lista = [];
      for (let i = 0; i < n; i++) { const a = t * 2.4 + i * 6.283 / n; lista.push({ a, x: cx + Math.cos(a) * rx, y: cy + Math.sin(a) * ry, z: Math.sin(a) }); }
      lista.sort((p, q) => p.z - q.z);
      for (const s of lista) {
        const esc = 0.65 + 0.35 * (s.z + 1) / 2, r = Math.min(W, H) * 0.022 * esc * (0.9 + F() * 0.2);
        mancha('255,230,120', s.x, s.y, r * 3, 0.45 * esc);
        ctx.globalAlpha = 0.55 + 0.45 * esc; ctx.fillStyle = '#ffe680'; estrela(s.x, s.y, r, t * 3 + s.a);
        ctx.fillStyle = '#fffbe0'; estrela(s.x, s.y, r * 0.45, t * 3 + s.a);
      }
      ctx.restore();
    },
  };

  // ── 💗 ENFEITIÇADO: coraçõezinhos e brilhos sobem rodopiando
  function coracao(x, y, r) {
    ctx.beginPath(); ctx.moveTo(x, y + r * 0.9);
    ctx.bezierCurveTo(x - r * 1.6, y - r * 0.1, x - r * 0.7, y - r * 1.3, x, y - r * 0.45);
    ctx.bezierCurveTo(x + r * 0.7, y - r * 1.3, x + r * 1.6, y - r * 0.1, x, y + r * 0.9);
    ctx.fill();
  }
  const encanto = particulas({
    taxa: () => 5 * F(),
    nasce: (W, H) => {
      const lado = Math.random();
      return { x: lado < 0.6 ? Math.random() * W : (lado < 0.8 ? aleat(0, W * 0.1) : W - aleat(0, W * 0.1)), y: H + 8,
        vy: -aleat(25, 50), r: aleat(3, 7) * (0.8 + F() * 0.3), vida: aleat(4, 7), brilho: Math.random() < 0.35 };
    },
    mover: (p, dt, e) => { p.vx = Math.sin(e.t * 1.6 + p.s) * 18; },
    fundo: () => vinheta('240,110,190', 0.35 * F(), 0.45),
    desenha: (p, k, e) => {
      const a = vaiVem(k);
      if (p.brilho) { mancha('255,220,240', p.x, p.y, p.r * 2.2, 0.8 * a * (0.6 + 0.4 * Math.sin(e.t * 8 + p.s))); return; }
      mancha('255,120,190', p.x, p.y, p.r * 2.5, 0.35 * a);
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(Math.sin(e.t * 2 + p.s) * 0.35);
      ctx.globalAlpha = 0.85 * a; ctx.fillStyle = '#ff6fb3'; coracao(0, 0, p.r); ctx.restore();
    },
  });

  // ── 🌀 FASCINADO: anéis dourados encolhendo para o centro (hipnose) e
  //    brilhos puxados em espiral
  const fascinio = particulas({
    taxa: () => 12 * F(),
    nasce: (W, H) => ({ ang: Math.random() * 6.283, raio: Math.hypot(W, H) * 0.55, vida: aleat(3, 4.5), r: aleat(1, 2.4), x: 0, y: 0 }),
    mover: (p, dt, e, W, H) => {
      p.ang += dt * 1.2; p.raio *= 1 - dt * 0.35;
      p.x = W / 2 + Math.cos(p.ang) * p.raio - p.vx * dt; p.y = H / 2 + Math.sin(p.ang) * p.raio * 0.7 - p.vy * dt;
    },
    fundo: (e, W, H) => {
      vinheta('240,190,70', 0.28 * F(), 0.45);
      const R = Math.hypot(W, H) * 0.55;
      ctx.lineWidth = 1.5;
      for (let i = 0; i < 6; i++) {
        const u = ((i / 6) - e.t * 0.12 % 1 + 1) % 1, r = R * u;
        ctx.globalAlpha = 0.22 * F() * Math.sin(Math.PI * u) * (u > 0.25 ? 1 : u / 0.25);
        ctx.strokeStyle = '#f3cf6a';
        ctx.beginPath(); ctx.ellipse(W / 2, H / 2, r, r * 0.7, 0, 0, 6.283); ctx.stroke();
      }
    },
    modo: 'lighter',
    desenha: (p, k) => mancha('255,215,120', p.x, p.y, p.r * 3, 0.7 * vaiVem(k)),
  });

  // ── ❄ LENTO: gelo cristalizando nas bordas e flocos que caem devagar demais
  const lento = {
    iniciar(e) { e.p = []; e.cob = 0; },
    passo(e, dt) {
      const W = canvas.width, H = canvas.height;
      cobrir(e, dt, 0.15 + 0.35 * (nivel / 4));
      galhosProntos(e, W, H, (w, h) => gerarGalhos(w, h, 34, 4, 0.12, 0.32));
      e.sobra = (e.sobra || 0) + 6 * F() * dt;
      while (e.sobra >= 1) { e.sobra--; e.p.push({ x: Math.random() * W, y: -4, r: aleat(0.8, 2), vida: aleat(8, 14), idade: 0, s: Math.random() * 6.28 }); }
      for (let i = e.p.length - 1; i >= 0; i--) {
        const p = e.p[i]; p.idade += dt;
        if (p.idade > p.vida) { e.p.splice(i, 1); continue; }
        p.y += dt * 9; p.x += Math.sin(e.t * 0.5 + p.s) * dt * 4;
      }
    },
    quadro(e) {
      const W = canvas.width, H = canvas.height;
      ctx.save(); ctx.clearRect(0, 0, W, H);
      vinheta('150,200,240', 0.45 * F(), 0.4);
      ctx.lineCap = 'round';
      for (const s of e.g) {
        if (s.prof > e.cob) continue;
        ctx.globalAlpha = 0.6 * (1 - s.prof / Math.max(0.01, e.cob) * 0.7);
        ctx.strokeStyle = s.n ? '#e8f6ff' : '#cdeaff'; ctx.lineWidth = s.w * 0.7;
        ctx.beginPath(); ctx.moveTo(s.x1, s.y1); ctx.lineTo(s.x2, s.y2); ctx.stroke();
      }
      for (const p of e.p) { ctx.globalAlpha = 0.8 * vaiVem(p.idade / p.vida); ctx.fillStyle = '#eef8ff'; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.fill(); }
      ctx.restore();
    },
  };

  // ── 🪨 PETRIFICADO: a pedra sobe pelas bordas, granulada, e racha
  let texturaPedra = null;
  function pedraTextura() {
    if (texturaPedra) return texturaPedra;
    const c = document.createElement('canvas'); c.width = c.height = 128;
    const g = c.getContext('2d'); g.fillStyle = '#7d7a72'; g.fillRect(0, 0, 128, 128);
    for (let i = 0; i < 2200; i++) {
      const v = Math.floor(aleat(70, 160)); g.fillStyle = `rgba(${v},${v - 3},${v - 10},${aleat(0.2, 0.6)})`;
      g.fillRect(Math.random() * 128, Math.random() * 128, aleat(1, 3), aleat(1, 3));
    }
    return (texturaPedra = c);
  }
  const pedra = {
    iniciar(e) { e.cob = 0; },
    passo(e, dt) {
      cobrir(e, dt, 0.2 + 0.6 * (nivel / 4));
      galhosProntos(e, canvas.width, canvas.height, (w, h) => gerarGalhos(w, h, 18, 7, 0.9, 0.22));
    },
    quadro(e) {
      const W = canvas.width, H = canvas.height, R = Math.hypot(W, H) / 2;
      ctx.save(); ctx.clearRect(0, 0, W, H);
      // a pedra: a textura, recortada por uma vinheta que avança com a cobertura
      ctx.fillStyle = ctx.createPattern(pedraTextura(), 'repeat'); ctx.globalAlpha = 0.92; ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = 'destination-in'; ctx.globalAlpha = 1;
      const miolo = Math.max(0.05, 0.95 - e.cob * 0.85);
      const g = ctx.createRadialGradient(W / 2, H / 2, R * miolo, W / 2, H / 2, R * (miolo + 0.22));
      g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,1)');
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      // as rachaduras, escuras com uma beirada clara
      ctx.globalCompositeOperation = 'source-over'; ctx.lineCap = 'round';
      for (const s of e.g) {
        if (s.prof > e.cob) continue;
        ctx.globalAlpha = 0.85; ctx.strokeStyle = '#2b2925'; ctx.lineWidth = s.w;
        ctx.beginPath(); ctx.moveTo(s.x1, s.y1); ctx.lineTo(s.x2, s.y2); ctx.stroke();
        ctx.globalAlpha = 0.35; ctx.strokeStyle = '#c9c4b8'; ctx.lineWidth = Math.max(0.6, s.w * 0.35);
        ctx.beginPath(); ctx.moveTo(s.x1 + 1, s.y1 + 1); ctx.lineTo(s.x2 + 1, s.y2 + 1); ctx.stroke();
      }
      ctx.restore();
    },
  };

  // ── 🌿 PRESO (paralisado, agarrado, enredado, imóvel): cipós crescem dos
  //    cantos e das bordas, com folhas, balançando de leve
  const preso = {
    iniciar(e) { e.cob = 0; },
    passo(e, dt) {
      cobrir(e, dt, 0.25 + 0.6 * (nivel / 4));
      galhosProntos(e, canvas.width, canvas.height, (w, h) => gerarGalhos(w, h, 16, 6, 0.55, 0.12));
    },
    quadro(e) {
      const W = canvas.width, H = canvas.height, t = e.t;
      ctx.save(); ctx.clearRect(0, 0, W, H);
      vinheta('40,60,20', 0.4 * F(), 0.45);
      ctx.lineCap = 'round';
      for (const s of e.g) {
        if (s.prof > e.cob) continue;
        const bal = Math.sin(t * 1.1 + s.s) * 1.2 * s.prof;
        ctx.globalAlpha = 0.95; ctx.strokeStyle = s.n ? '#4f6a22' : '#3d4f1a'; ctx.lineWidth = s.w * 1.6;
        ctx.beginPath(); ctx.moveTo(s.x1 + bal, s.y1); ctx.lineTo(s.x2 + bal, s.y2); ctx.stroke();
        if (s.s < 1.1 && s.n) {   // uma folha de vez em quando
          ctx.fillStyle = '#6d8f2e'; ctx.save(); ctx.translate(s.x2 + bal, s.y2); ctx.rotate(s.s * 5 + Math.sin(t + s.s) * 0.2);
          ctx.beginPath(); ctx.ellipse(3, 0, 4, 1.8, 0, 0, 6.283); ctx.fill(); ctx.restore();
        }
      }
      ctx.restore();
    },
  };

  // ── 🥱 FRAQUEZA (exausto, fatigado, debilitado, fraco): a vista pesa e
  //    escurece devagar, como respiração cansada; poeira cai
  const fraqueza = particulas({
    taxa: () => 6 * F(),
    nasce: (W, H) => ({ x: Math.random() * W, y: -4, vy: aleat(6, 14), r: aleat(0.7, 1.6), vida: aleat(6, 11) }),
    mover: (p, dt, e) => { p.vx = Math.sin(e.t * 0.6 + p.s) * 4; },
    fundo: (e, W, H) => {
      const resp = 0.5 + 0.5 * Math.sin(e.t * 0.7);
      vinheta('95,85,72', (0.45 + 0.25 * resp) * F(), 0.4 - 0.1 * resp);
      //  a vista "apaga" de leve de tempos em tempos (a tonteira de quem está sem forças)
      const apaga = Math.pow(Math.max(0, Math.sin(e.t * 0.45)), 16);
      if (apaga > 0.01) { ctx.globalAlpha = 1; ctx.fillStyle = `rgba(10,8,6,${0.45 * apaga * F()})`; ctx.fillRect(0, 0, W, H); }
    },
    desenha: (p, k) => { ctx.globalAlpha = 0.75 * vaiVem(k); ctx.fillStyle = '#d4c6ae'; ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 1.4, 0, 6.283); ctx.fill(); },
  });

  // ── 🌧 MENTE (esmorecido, frustrado, alquebrado): chuva fina caindo em
  //    diagonal e uma nuvem cinza-azulada no alto
  const mente = particulas({
    taxa: (W) => W * 0.09 * F(),
    nasce: (W, H) => ({ x: aleat(-W * 0.1, W * 1.05), y: -10, vx: -40, vy: aleat(260, 380), comp: aleat(8, 16), vida: 2 }),
    mover: (p, dt, e, W, H) => { if (p.y > H + 20) p.idade = p.vida; },
    fundo: (e, W, H) => {
      vinheta('40,60,100', 0.4 * F(), 0.45);
      const g = ctx.createLinearGradient(0, 0, 0, H * 0.25);
      g.addColorStop(0, `rgba(45,55,80,${0.45 * F()})`); g.addColorStop(1, 'rgba(45,55,80,0)');
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H * 0.25);
    },
    desenha: (p) => {
      ctx.globalAlpha = 0.35; ctx.strokeStyle = '#b9cbe6'; ctx.lineWidth = 0.8;
      ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x + p.vx * 0.04, p.y - p.comp); ctx.stroke();
    },
  });

  // ── 🔇 SURDO: ondas de som saindo dos lados, abafadas — somem antes de chegar
  const surdo = particulas({
    taxa: () => 1.4,
    nasce: (W, H) => ({ x: Math.random() < 0.5 ? -4 : W + 4, y: H * aleat(0.3, 0.7), vida: aleat(2.2, 3), x0: 0 }),
    fundo: () => vinheta('110,110,125', 0.4 * F(), 0.45),
    desenha: (p, k, e, W, H) => {
      const r = Math.min(W, H) * (0.05 + 0.35 * k), dir = p.x < W / 2 ? 0 : Math.PI;
      ctx.strokeStyle = '#c8c8d4'; ctx.lineWidth = 2;
      for (let i = 0; i < 3; i++) {
        const rr = r - i * Math.min(W, H) * 0.03; if (rr <= 0) continue;
        ctx.globalAlpha = 0.45 * (1 - k) * (1 - i * 0.3) * F();
        ctx.beginPath(); ctx.arc(p.x, p.y, rr, dir - 0.7, dir + 0.7); ctx.stroke();
      }
      // o risco que corta: o som não passa
      if (k > 0.3) { ctx.globalAlpha = 0.25 * (1 - k); ctx.lineWidth = 2.5; ctx.strokeStyle = '#8a8a96';
        const x = p.x + Math.cos(dir) * r * 0.8; ctx.beginPath(); ctx.moveTo(x - 6, p.y - 10); ctx.lineTo(x + 6, p.y + 10); ctx.stroke(); }
    },
  });

  // ── ⚠ GUARDA BAIXA (desprevenido, indefeso, surpreendido, vulnerável):
  //    clarões de alerta nas bordas e uma mira que se fecha no centro
  const guarda = {
    iniciar(e) { e.flash = []; e.prox = 0.5; }, passo(e, dt) {
      if (e.t > e.prox) { e.flash.push({ lado: Math.floor(Math.random() * 4), ini: e.t }); e.prox = e.t + aleat(0.6, 1.8) / F(); }
      e.flash = e.flash.filter(f => e.t - f.ini < 0.6);
    },
    quadro(e) {
      const W = canvas.width, H = canvas.height, t = e.t, f = F();
      ctx.save(); ctx.clearRect(0, 0, W, H);
      vinheta('235,140,40', 0.3 * f + 0.1 * Math.sin(t * 3), 0.45);
      for (const fl of e.flash) {
        const u = (t - fl.ini) / 0.6, a = (1 - u) * 0.55 * f, prof = Math.min(W, H) * 0.12;
        const [x0, y0, x1, y1] = fl.lado === 0 ? [0, 0, 0, prof] : fl.lado === 1 ? [0, H, 0, H - prof] : fl.lado === 2 ? [0, 0, prof, 0] : [W, 0, W - prof, 0];
        const g = ctx.createLinearGradient(x0, y0, x1, y1);
        g.addColorStop(0, `rgba(255,150,40,${a})`); g.addColorStop(1, 'rgba(255,150,40,0)');
        ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      }
      // a mira: quatro cantoneiras que se fecham e abrem
      const fecha = 0.5 + 0.5 * Math.sin(t * 1.4), m = Math.min(W, H) * (0.34 - 0.08 * fecha), l = Math.min(W, H) * 0.06;
      ctx.globalAlpha = 0.35 * f; ctx.strokeStyle = '#ff7a2a'; ctx.lineWidth = 2;
      for (const [sx, sy] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) {
        const x = W / 2 + sx * m * 1.5, y = H / 2 + sy * m;
        ctx.beginPath(); ctx.moveTo(x, y - sy * l); ctx.lineTo(x, y); ctx.lineTo(x - sx * l, y); ctx.stroke();
      }
      ctx.restore();
    },
  };

  // ── 🟫 CHÃO (caído, sobrecarregado): poeira levantando embaixo e a
  //    borda de baixo pesada
  const chao = particulas({
    taxa: () => 6 * F(),
    nasce: (W, H) => ({ x: Math.random() * W, y: H + aleat(0, 10), vx: aleat(-12, 12), vy: -aleat(6, 18), r: Math.min(W, H) * aleat(0.05, 0.1), vida: aleat(3, 6) }),
    mover: (p) => { p.vy *= 0.995; },
    fundo: (e, W, H) => {
      const g = ctx.createLinearGradient(0, H, 0, H * (1 - 0.35 * F()));
      g.addColorStop(0, `rgba(150,105,55,${0.7 * F()})`); g.addColorStop(1, 'rgba(150,105,55,0)');
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    },
    desenha: (p, k) => mancha('200,160,105', p.x, p.y, p.r * (0.7 + k * 0.9), 0.5 * vaiVem(k) * F()),
  });

  const EFEITOS = {
    fogo: fogo, apagado: olhos, sangue: sangue, cego: cego, ofuscado: ofuscado, veneno: veneno,
    pavor: medoFx(true), medo: medoFx(false), confuso: confuso, atordoado: atordoado, encanto: encanto,
    fascinio: fascinio, lento: lento, pedra: pedra, preso: preso, fraqueza: fraqueza, mente: mente,
    surdo: surdo, guarda: guarda, chao: chao,
  };

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
    if (host) { host.style.removeProperty('--fecha'); host.classList.remove('fi-clima--fx'); }
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
