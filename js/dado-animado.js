/* ═══════════════════════════════════════════════════════════════════
   DADO ANIMADO — o d20 que rola na tela (26/11/2026)
   Pedido dele: "quando aparecer o pop up, pedindo o dado, quero que tenha
   uma animação de um dado rolando e tirando o valor dele".

   GA_DadoAnimado.rolar(onde, valor, lados) → Promise
     · `onde`  — o elemento onde o dado aparece (é esvaziado);
     · `valor` — o número que JÁ SAIU (o sorteio é feito antes, por quem
                 chama: a animação só mostra, nunca decide);
     · `lados` — 20 por padrão (a forma muda só no rótulo).
   O dado gira e quica por ~1,3 s trocando de face e para no valor. 20
   natural brilha dourado; 1 natural fica vermelho apagado. Quem ligou
   "Menos movimento" no painel ⚙ do site vê o número direto.
   ═══════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  const DURACAO = 1300;

  function semMovimento() {
    //  a escolha do painel ⚙ do site ("Menos movimento"), e não a do sistema:
    //  o pedido dele é VER o dado rolar, e o Windows dele vem com as animações
    //  desligadas — seguir o sistema apagaria o que ele pediu sem dizer nada.
    return document.documentElement.classList.contains('ga-sem-movimento');
  }

  //  um d20 visto de frente: o hexágono de fora e o triângulo da face
  function svgD20() {
    return '<svg class="ga-dado-svg" viewBox="0 0 100 100" aria-hidden="true">' +
      '<polygon class="ga-dado-casca" points="50,3 93,27 93,73 50,97 7,73 7,27"/>' +
      '<polygon class="ga-dado-face" points="50,20 80,68 20,68"/>' +
      '<line class="ga-dado-aresta" x1="50" y1="3" x2="50" y2="20"/>' +
      '<line class="ga-dado-aresta" x1="93" y1="27" x2="80" y2="68"/>' +
      '<line class="ga-dado-aresta" x1="7" y1="27" x2="20" y2="68"/>' +
      '<line class="ga-dado-aresta" x1="50" y1="97" x2="80" y2="68"/>' +
      '<line class="ga-dado-aresta" x1="50" y1="97" x2="20" y2="68"/>' +
      '<line class="ga-dado-aresta" x1="93" y1="27" x2="50" y2="20"/>' +
      '<line class="ga-dado-aresta" x1="7" y1="27" x2="50" y2="20"/>' +
      '</svg>';
  }

  function rolar(onde, valor, lados) {
    lados = lados || 20;
    return new Promise(resolve => {
      if (!onde) { resolve(); return; }
      onde.innerHTML = '<div class="ga-dado ga-dado--rolando" role="img" aria-label="Dado de ' + lados +
        ' rolando">' + svgD20() + '<span class="ga-dado-num">?</span></div>';
      const dado = onde.firstChild, num = dado.querySelector('.ga-dado-num');
      const fim = () => {
        num.textContent = String(valor);
        dado.classList.remove('ga-dado--rolando');
        dado.classList.add('ga-dado--parou');
        if (lados === 20 && valor === 20) dado.classList.add('ga-dado--critico');
        if (valor === 1) dado.classList.add('ga-dado--falha');
        dado.setAttribute('aria-label', 'Dado de ' + lados + ': ' + valor);
        resolve();
      };
      if (semMovimento()) { fim(); return; }
      //  as faces trocam rápido no começo e devagar no fim, como um dado
      //  que perde força na mesa
      const t0 = performance.now();
      let proxima = 0;
      function passo(agora) {
        const t = agora - t0;
        if (t >= DURACAO) { fim(); return; }
        if (t >= proxima) {
          let n; do { n = 1 + Math.floor(Math.random() * lados); } while (n === +num.textContent && lados > 1);
          num.textContent = String(n);
          proxima = t + 40 + 220 * Math.pow(t / DURACAO, 2);
        }
        requestAnimationFrame(passo);
      }
      requestAnimationFrame(passo);
    });
  }

  window.GA_DadoAnimado = { rolar: rolar };
})();
