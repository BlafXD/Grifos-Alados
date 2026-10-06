// ─────────────────────────────────────────────────────────────────────
// GA_QR — gerador de QR Code em casa (modo byte, nível M, versões 1–10)
//
// Por que à mão: o QR do Pix não pode depender de serviço de fora. Mandar
// a chave para uma API de imagem é entregar o código de recebimento a um
// terceiro e deixar o cartão de doação quebrado quando o serviço cair.
// São ~180 linhas e funcionam offline, no `file://` inclusive.
//
// Segue a ISO/IEC 18004. Nível M: recupera ~15% do quadro sujo ou
// riscado, o meio-termo de sempre entre tamanho e tolerância.
// ─────────────────────────────────────────────────────────────────────
(function (raiz) {
  'use strict';

  // ── Corpo finito GF(256), primitivo 0x11D (o do QR) ────────────────
  const EXP = new Uint8Array(512), LOG = new Uint8Array(256);
  (function () {
    let x = 1;
    for (let i = 0; i < 255; i++) {
      EXP[i] = x; LOG[x] = i;
      x <<= 1; if (x & 0x100) x ^= 0x11D;
    }
    for (let i = 255; i < 512; i++) EXP[i] = EXP[i - 255];
  })();
  const mul = (a, b) => (a && b) ? EXP[LOG[a] + LOG[b]] : 0;

  // Polinômio gerador de grau n: (x−α⁰)(x−α¹)…(x−αⁿ⁻¹)
  function gerador(n) {
    let p = [1];
    for (let i = 0; i < n; i++) {
      const q = new Array(p.length + 1).fill(0);
      for (let j = 0; j < p.length; j++) {
        q[j]     ^= p[j];
        q[j + 1] ^= mul(p[j], EXP[i]);
      }
      p = q;
    }
    return p;
  }

  // Resto da divisão (Reed-Solomon): os n codewords de correção
  function correcao(dados, n) {
    const g = gerador(n);
    const r = new Uint8Array(dados.length + n);
    r.set(dados);
    for (let i = 0; i < dados.length; i++) {
      const c = r[i];
      if (!c) continue;
      for (let j = 0; j < g.length; j++) r[i + j] ^= mul(g[j], c);
    }
    return r.subarray(dados.length);
  }

  // ── Tabelas do nível M, versões 1–10 ───────────────────────────────
  // [codewords totais, EC por bloco, blocos g1, dados g1, blocos g2, dados g2]
  const TAB = {
    1:  [ 26, 10, 1, 16, 0,  0],
    2:  [ 44, 16, 1, 28, 0,  0],
    3:  [ 70, 26, 1, 44, 0,  0],
    4:  [100, 18, 2, 32, 0,  0],
    5:  [134, 24, 2, 43, 0,  0],
    6:  [172, 16, 4, 27, 0,  0],
    7:  [196, 18, 4, 31, 0,  0],
    8:  [242, 22, 2, 38, 2, 39],
    9:  [292, 22, 3, 36, 2, 37],
    10: [346, 26, 4, 43, 1, 44]
  };
  // centros dos padrões de alinhamento
  const ALINHA = {
    1: [], 2: [6, 18], 3: [6, 22], 4: [6, 26], 5: [6, 30],
    6: [6, 34], 7: [6, 22, 38], 8: [6, 24, 42], 9: [6, 26, 46], 10: [6, 28, 50]
  };

  // BCH(15,5) do formato e BCH(18,6) da versão: resto da divisão
  // binária por g, grudado atrás dos bits de dados.
  function bch(valor, g, grauG) {
    const grauPoly = 31 - Math.clz32(g);
    let v = valor << grauG;
    while (31 - Math.clz32(v) >= grauPoly) v ^= g << (31 - Math.clz32(v) - grauPoly);
    return (valor << grauG) | v;
  }

  function utf8(txt) {
    if (typeof TextEncoder === 'function') return new TextEncoder().encode(txt);
    const s = unescape(encodeURIComponent(txt)), b = new Uint8Array(s.length);
    for (let i = 0; i < s.length; i++) b[i] = s.charCodeAt(i);
    return b;
  }

  // ── Fluxo de bits: cabeçalho + dados + bloco + intercalação ────────
  function codewords(texto) {
    const bytes = utf8(texto);
    let versao = 0;
    for (let v = 1; v <= 10; v++) {
      const t = TAB[v], dados = t[2] * t[3] + t[4] * t[5];
      const cab = 4 + (v >= 10 ? 16 : 8);
      if (cab + bytes.length * 8 <= dados * 8) { versao = v; break; }
    }
    if (!versao) throw new Error('GA_QR: texto longo demais (máximo ~210 bytes)');

    const t = TAB[versao];
    const nDados = t[2] * t[3] + t[4] * t[5];
    const bits = [];
    const push = (val, n) => { for (let i = n - 1; i >= 0; i--) bits.push((val >> i) & 1); };

    push(0b0100, 4);                              // modo byte
    push(bytes.length, versao >= 10 ? 16 : 8);    // contagem
    for (const b of bytes) push(b, 8);
    for (let i = 0; i < 4 && bits.length < nDados * 8; i++) bits.push(0); // terminador
    while (bits.length % 8) bits.push(0);                                 // fecha o byte

    const dados = new Uint8Array(nDados);
    for (let i = 0; i < bits.length; i += 8) {
      let b = 0;
      for (let j = 0; j < 8; j++) b = (b << 1) | bits[i + j];
      dados[i / 8] = b;
    }
    // enchimento alternado 0xEC / 0x11
    for (let i = bits.length / 8, alterna = 0; i < nDados; i++, alterna ^= 1) {
      dados[i] = alterna ? 0x11 : 0xEC;
    }

    // blocos
    const blocos = [], ecs = [];
    let p = 0;
    for (let g = 0; g < 2; g++) {
      const qtd = g ? t[4] : t[2], tam = g ? t[5] : t[3];
      for (let i = 0; i < qtd; i++) {
        const bloco = dados.subarray(p, p + tam); p += tam;
        blocos.push(bloco);
        ecs.push(correcao(bloco, t[1]));
      }
    }

    // intercalação: 1º codeword de cada bloco, 2º de cada bloco…
    const fluxo = [];
    const maiorD = Math.max.apply(null, blocos.map(b => b.length));
    for (let i = 0; i < maiorD; i++)
      for (const b of blocos) if (i < b.length) fluxo.push(b[i]);
    for (let i = 0; i < t[1]; i++)
      for (const e of ecs) fluxo.push(e[i]);

    return { versao: versao, fluxo: Uint8Array.from(fluxo) };
  }

  // ── Desenho ────────────────────────────────────────────────────────
  const MASCARA = [
    (i, j) => (i + j) % 2 === 0,
    (i, j) => i % 2 === 0,
    (i, j) => j % 3 === 0,
    (i, j) => (i + j) % 3 === 0,
    (i, j) => ((i >> 1) + Math.floor(j / 3)) % 2 === 0,
    (i, j) => (i * j) % 2 + (i * j) % 3 === 0,
    (i, j) => ((i * j) % 2 + (i * j) % 3) % 2 === 0,
    (i, j) => ((i * j) % 3 + (i + j) % 2) % 2 === 0
  ];

  function esqueleto(versao) {
    const n = 17 + 4 * versao;
    const m = [];
    for (let i = 0; i < n; i++) m.push(new Array(n).fill(null));

    // localizadores + separadores
    [[0, 0], [0, n - 7], [n - 7, 0]].forEach(([r0, c0]) => {
      for (let r = -1; r <= 7; r++) for (let c = -1; c <= 7; c++) {
        const r1 = r0 + r, c1 = c0 + c;
        if (r1 < 0 || c1 < 0 || r1 >= n || c1 >= n) continue;
        const d = Math.max(Math.abs(r - 3), Math.abs(c - 3));
        m[r1][c1] = (d !== 2 && d <= 3);
      }
    });

    // temporização
    for (let i = 8; i < n - 8; i++) {
      if (m[6][i] === null) m[6][i] = (i % 2 === 0);
      if (m[i][6] === null) m[i][6] = (i % 2 === 0);
    }

    // alinhamento — os três cantos em cima dos localizadores não existem;
    // os que cruzam a temporização são desenhados e batem com ela.
    const cs = ALINHA[versao], pri = cs[0], ult = cs[cs.length - 1];
    cs.forEach(r0 => cs.forEach(c0 => {
      if ((r0 === pri && c0 === pri) || (r0 === pri && c0 === ult) ||
          (r0 === ult && c0 === pri)) return;
      for (let r = -2; r <= 2; r++) for (let c = -2; c <= 2; c++)
        m[r0 + r][c0 + c] = Math.max(Math.abs(r), Math.abs(c)) !== 1;
    }));

    // módulo sempre escuro + reserva do formato
    m[n - 8][8] = true;
    for (let i = 0; i < 9; i++) {
      if (m[8][i] === null) m[8][i] = false;
      if (m[i][8] === null) m[i][8] = false;
    }
    for (let i = n - 8; i < n; i++) {
      if (m[8][i] === null) m[8][i] = false;
      if (m[i][8] === null) m[i][8] = false;
    }

    // informação de versão (a partir da 7)
    if (versao >= 7) {
      const bits = bch(versao, 0x1F25, 12);
      for (let i = 0; i < 18; i++) {
        const b = ((bits >> i) & 1) === 1;
        m[Math.floor(i / 3)][i % 3 + n - 11] = b;
        m[i % 3 + n - 11][Math.floor(i / 3)] = b;
      }
    }
    return m;
  }

  function formato(m, mascara) {
    const n = m.length;
    const bits = bch((0b00 << 3) | mascara, 0x537, 10) ^ 0x5412;  // 00 = nível M
    for (let i = 0; i < 15; i++) {
      const b = ((bits >> i) & 1) === 1;
      if (i < 6)      m[i][8] = b;
      else if (i < 8) m[i + 1][8] = b;
      else            m[n - 15 + i][8] = b;

      if (i < 8)      m[8][n - i - 1] = b;
      else if (i < 9) m[8][7] = b;
      else            m[8][14 - i] = b;
    }
  }

  function penalidade(m) {
    const n = m.length;
    let p = 0;

    // N1 — fileiras de 5 ou mais da mesma cor
    const corrida = (pega) => {
      for (let a = 0; a < n; a++) {
        let cor = null, len = 0;
        for (let b = 0; b < n; b++) {
          const v = pega(a, b);
          if (v === cor) len++;
          else { if (len >= 5) p += 3 + (len - 5); cor = v; len = 1; }
        }
        if (len >= 5) p += 3 + (len - 5);
      }
    };
    corrida((a, b) => m[a][b]);
    corrida((a, b) => m[b][a]);

    // N2 — quadrados 2×2 de uma cor
    for (let i = 0; i < n - 1; i++) for (let j = 0; j < n - 1; j++) {
      const v = m[i][j];
      if (v === m[i][j + 1] && v === m[i + 1][j] && v === m[i + 1][j + 1]) p += 3;
    }

    // N3 — o 1:1:3:1:1 do localizador com 4 claros de um lado
    const ALVO  = [true, false, true, true, true, false, true, false, false, false, false];
    const ALVO2 = ALVO.slice().reverse();
    const casa = (pega, a, b, alvo) => {
      for (let k = 0; k < 11; k++) if (pega(a, b + k) !== alvo[k]) return false;
      return true;
    };
    for (let a = 0; a < n; a++) for (let b = 0; b + 11 <= n; b++) {
      if (casa((x, y) => m[x][y], a, b, ALVO))  p += 40;
      if (casa((x, y) => m[x][y], a, b, ALVO2)) p += 40;
      if (casa((x, y) => m[y][x], a, b, ALVO))  p += 40;
      if (casa((x, y) => m[y][x], a, b, ALVO2)) p += 40;
    }

    // N4 — desequilíbrio entre escuro e claro
    let escuros = 0;
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) if (m[i][j]) escuros++;
    p += Math.floor(Math.abs(escuros * 100 / (n * n) - 50) / 5) * 10;

    return p;
  }

  // Devolve a matriz booleana (true = módulo escuro), já com a melhor máscara.
  function matriz(texto) {
    const { versao, fluxo } = codewords(texto);
    const n = 17 + 4 * versao;
    let melhor = null, melhorP = Infinity;

    for (let mascara = 0; mascara < 8; mascara++) {
      const m = esqueleto(versao);
      const f = MASCARA[mascara];
      let byte = 0, bit = 7, inc = -1, linha = n - 1;

      for (let col = n - 1; col > 0; col -= 2) {
        if (col === 6) col--;
        for (;;) {
          for (let c = 0; c < 2; c++) {
            if (m[linha][col - c] !== null) continue;
            let escuro = byte < fluxo.length && ((fluxo[byte] >> bit) & 1) === 1;
            if (f(linha, col - c)) escuro = !escuro;
            m[linha][col - c] = escuro;
            if (--bit < 0) { byte++; bit = 7; }
          }
          linha += inc;
          if (linha < 0 || linha >= n) { linha -= inc; inc = -inc; break; }
        }
      }
      formato(m, mascara);
      const p = penalidade(m);
      if (p < melhorP) { melhorP = p; melhor = m; }
    }
    return melhor;
  }

  raiz.GA_QR = { matriz: matriz };
})(typeof window !== 'undefined' ? window : globalThis);

// ─────────────────────────────────────────────────────────────────────
// GA_Doacao — a caixa de doações da gazeta (Pix)
//
// Dois gatilhos, nenhum deles atravessado na frente de quem só quer
// jogar: o "Preço: 3 Tibares" do cabeçalho (que já estava lá, de
// brincadeira, e agora é clicável) e uma linha no rodapé de todas as
// abas. Nada de balão que aparece sozinho, nada de canto flutuante —
// os dois cantos de baixo já são das rolagens e do 📡.
//
// O código do Pix é "copia e cola" ESTÁTICO e sem valor: quem doa
// escolhe quanto. O QR é desenhado aqui mesmo (GA_QR), então a chave
// nunca sai do navegador de quem está lendo.
// ─────────────────────────────────────────────────────────────────────
(function () {
  'use strict';

  // Carga EMV do Pix (chave aleatória). O CRC16 do fim (6304DCC9) fecha
  // o texto inteiro: mexer em UM caractere aqui invalida o código no
  // banco. Para trocar de chave, gere a carga nova no app e cole junto.
  const CODIGO = '00020101021126580014br.gov.bcb.pix013641ded103-4281-4d09-98f9-8df217ba3e64' +
                 '5204000053039865802BR5915CAIQUE H BODNAR6013SAO JOSE DOS 62070503***6304DCC9';
  const NOME = 'CAIQUE H BODNAR';

  let svgPronto = null;   // o QR é o mesmo sempre: desenha uma vez

  // Preto no branco de verdade, não no pergaminho: o leitor de QR do
  // banco é o único "usuário" daqui que não perdoa pouco contraste.
  // O selo fica emoldurado pelo CSS, como um lambe colado no jornal.
  function svg() {
    if (svgPronto) return svgPronto;
    const m = window.GA_QR.matriz(CODIGO);
    const n = m.length, q = 4, lado = n + q * 2;   // q = zona de silêncio
    let d = '';
    for (let i = 0; i < n; i++)
      for (let j = 0; j < n; j++)
        if (m[i][j]) d += 'M' + (j + q) + ' ' + (i + q) + 'h1v1h-1z';
    // aria-hidden: para quem usa leitor de tela a informação é o código
    // em texto, logo abaixo — um quadrado de pontinhos não diz nada.
    svgPronto =
      '<svg class="ga-doar-qr" viewBox="0 0 ' + lado + ' ' + lado + '" ' +
      'xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" ' +
      'shape-rendering="crispEdges">' +
      '<rect width="' + lado + '" height="' + lado + '" fill="#fff"/>' +
      '<path d="' + d + '" fill="#000"/></svg>';
    return svgPronto;
  }

  function abrir() {
    if (!window.GA_abrirModal) return;
    const esc = window.GA_esc || (s => String(s));

    let quadro;
    try {
      quadro = svg();
    } catch (e) {
      // Sem o QR a doação ainda funciona: o código copiado é o que o
      // banco pede em "Pix Copia e Cola".
      quadro = '<p class="ga-doar-semqr">(não consegui desenhar o quadro aqui — ' +
               'use o código abaixo em <strong>Pix Copia e Cola</strong>)</p>';
    }

    window.GA_abrirModal(
      '<div class="ga-modal-cab">' +
        '<span>♦ Caixa de Doações</span>' +
        '<button class="ga-modal-x" data-ga-fechar title="Fechar">✕</button>' +
      '</div>' +
      '<p class="ga-modal-dica">A gazeta é de graça e continua de graça: nenhuma ficha, ' +
        'nenhuma rolagem e nenhuma aba dependem disto. Se o site te poupou uma noite de ' +
        'preparação e você quiser pagar os 3 Tibares da capa, é por aqui.</p>' +
      '<div class="ga-doar-selo">' + quadro + '</div>' +
      '<p class="ga-doar-para">Pix de <strong>' + esc(NOME) + '</strong><br>' +
        '<em>chave aleatória · sem valor fixo — você escolhe quanto</em></p>' +
      '<code class="ga-doar-codigo">' + esc(CODIGO) + '</code>' +
      '<div class="ga-modal-acoes">' +
        '<button type="button" class="ga-btn-principal ga-doar-copiar" ' +
          'data-ga-copiar="' + esc(CODIGO) + '">⧉ Copiar o código Pix</button>' +
      '</div>' +
      '<p class="ga-doar-rodape">Aponte a câmera do app do banco no quadro, ou cole o ' +
        'código em <strong>Pix Copia e Cola</strong>. Obrigado — de verdade. ✦</p>');
  }

  // ── Os gatilhos ────────────────────────────────────────────────────
  // Delegado no documento: serve ao botão do rodapé, ao preço do
  // cabeçalho e a qualquer outro [data-ga-doar] que venha a existir.
  document.addEventListener('click', e => {
    const alvo = e.target && e.target.closest ? e.target.closest('[data-ga-doar]') : null;
    if (!alvo) return;
    e.preventDefault();
    abrir();
  });

  window.GA_Doacao = { abrir: abrir, CODIGO: CODIGO, svg: svg };
})();
