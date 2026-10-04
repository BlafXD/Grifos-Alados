// ════════════════════════════════════════════════════════════════════
//  DEUSES-VISUAL-DATA.JS — a cara de cada divindade nas fichas dos
//  avatares (aba 📕 Fichas Prontas → ⛩ Deuses de Arton, só do mestre)
//  Localização: /grifos-alados/js/deuses-visual-data.js
//
//  Pedido dele em 04/10/2026: "alterar um pouco o visual de quando o
//  mestre está usando a ficha de algum dos Deuses — se estiver usando a
//  ficha da Allihanna ser um pouco mais verde e ter algumas raízes ou
//  plantas". Ele pediu em DUAS LEVAS — os dez primeiros deuses e os dez
//  restantes —, e as duas estão aqui: a leva 1 e a leva 2 são marcadas
//  no meio da lista, na ordem alfabética do livro (de Aharadak a Marah,
//  e de Megalokk a Wynna).
//
//  ⚠ NADA AQUI É INVENTADO. As duas peças saem do quadro de dados que o
//  livro imprime para cada divindade (Deuses de Arton — e esse mesmo
//  quadro já aparece dentro do card, na caixa de cima):
//    • a PALETA é a linha "Cores Significativas", na ordem do livro e na
//      quantidade do livro: Marah tem uma cor, Azgher duas,
//      Kallyadranoch cinco.
//    • o MOTIVO é o "Símbolo Sagrado" — a arvorezinha dos druidas de
//      Allihanna, o sol de Azgher, a espada sobre a balança de Khalmyr.
//  O campo `coresLivro` guarda a frase do livro palavra por palavra, e é
//  ela que aparece na nuvem de mouse da faixa de cores. Onde o livro dá
//  nome de cor e não código, o código é a leitura mais próxima que ainda
//  se lê sobre pergaminho — e onde isso doeu, está anotado.
//
//  Formato de cada deus (a chave é a MESMA do js/devotos-data.js):
//    nome        — como o livro escreve
//    coresLivro  — a frase "Cores Significativas" do quadro, literal
//    cores       — a paleta em hex, na ordem do livro (1 a 5 cores)
//    estrutural  — índice da cor que vira borda e moldura (padrão 0).
//                  Serve para Azgher, cuja primeira cor é o branco:
//                  borda branca em pergaminho não aparece.
//    estruturalCor — cor de moldura fora da paleta, para o caso extremo
//                  (Marah, cuja ÚNICA cor do livro é o branco).
//    simbolo     — o Símbolo Sagrado, em uma linha (vai para a nuvem)
//    motivo(c)   — o desenho, em SVG, recebendo a paleta. Vira marca de
//                  água no canto do card; daí as opacidades baixas.
//                  Mora em JS, e não em CSS, para o desenho continuar
//                  legível (data-URI em CSS é uma linha ilegível) e para
//                  poder ser pintado com as cores do próprio deus.
// ════════════════════════════════════════════════════════════════════
window.GA_DEUSES_VISUAL = (function () {
  'use strict';

  // ── auxiliares de desenho ────────────────────────────────────────
  //  Raios em volta de um centro (o sol de Azgher, os espinhos do olho
  //  de Aharadak).
  function raios(n, cx, cy, r1, r2, cor, largura, opac) {
    let s = '';
    for (let i = 0; i < n; i++) {
      const a = (Math.PI * 2 * i) / n - Math.PI / 2;
      const x1 = (cx + Math.cos(a) * r1).toFixed(1), y1 = (cy + Math.sin(a) * r1).toFixed(1);
      const x2 = (cx + Math.cos(a) * r2).toFixed(1), y2 = (cy + Math.sin(a) * r2).toFixed(1);
      s += "<path d='M" + x1 + " " + y1 + "L" + x2 + " " + y2 + "' stroke='" + cor +
           "' stroke-width='" + largura + "' stroke-opacity='" + opac + "' stroke-linecap='round'/>";
    }
    return s;
  }
  //  Uma escama (meia-lua de cima): o símbolo de Kallyadranoch são
  //  "escamas de cinco cores".
  function escama(x, y, r, cor, opac) {
    return "<path d='M" + (x - r) + " " + y + "a" + r + " " + r + " 0 0 1 " + (r * 2) + " 0z' fill='" +
           cor + "' fill-opacity='" + opac + "'/>";
  }
  const ABRE = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'>";
  const FECHA = '</svg>';

  // ── LEVA 1: os dez primeiros deuses (04/10/2026) ─────────────────
  const deuses = {

    aharadak: {
      nome: 'Aharadak',
      coresLivro: 'Vermelho',
      // o livro dá UMA cor: as outras duas são o mesmo vermelho, mais
      // aberto e mais fundo, para o desenho ter sombra
      cores: ['#8e1f1f', '#c2452f', '#5a1414'],
      simbolo: 'um olho macabro de pupila vertical, cercado de espinhos',
      motivo: c => ABRE +
        "<path d='M12 60c18-24 78-24 96 0-18 24-78 24-96 0z' fill='" + c[1] + "' fill-opacity='.14' stroke='" + c[0] + "' stroke-width='3' stroke-opacity='.3'/>" +
        "<ellipse cx='60' cy='60' rx='8' ry='21' fill='" + c[2] + "' fill-opacity='.32'/>" +
        raios(10, 60, 60, 52, 62, c[0], 2.6, '.26') +
        FECHA,
    },

    allihanna: {
      nome: 'Allihanna',
      coresLivro: 'Verde-folha, verde-musgo, marrom',
      cores: ['#3f7a33', '#6f8a3c', '#6b4a2a'],
      simbolo: 'para druidas, uma pequena árvore — e, por baixo dela, as raízes',
      motivo: c => ABRE +
        "<g fill='none' stroke-linecap='round' stroke-opacity='.34'>" +
          "<path d='M60 104C58 86 58 74 60 56' stroke='" + c[2] + "' stroke-width='6'/>" +
          "<path d='M60 100c-10 6-18 9-30 9' stroke='" + c[2] + "' stroke-width='4'/>" +
          "<path d='M60 100c10 6 18 9 30 9' stroke='" + c[2] + "' stroke-width='4'/>" +
          "<path d='M60 103c-4 7-6 11-5 16' stroke='" + c[2] + "' stroke-width='3'/>" +
          "<path d='M60 103c4 7 6 11 5 16' stroke='" + c[2] + "' stroke-width='3'/>" +
          "<path d='M60 72C52 68 46 62 42 54' stroke='" + c[2] + "' stroke-width='3'/>" +
          "<path d='M60 66C68 62 74 56 78 48' stroke='" + c[2] + "' stroke-width='3'/>" +
        '</g>' +
        "<path d='M42 54C28 50 20 38 22 24c14-1 24 12 24 28z' fill='" + c[0] + "' fill-opacity='.3'/>" +
        "<path d='M78 48c14-4 22-16 20-30-14-1-24 12-24 28z' fill='" + c[1] + "' fill-opacity='.3'/>" +
        "<path d='M60 56C50 44 50 28 60 14c10 14 10 30 0 42z' fill='" + c[0] + "' fill-opacity='.24'/>" +
        FECHA,
    },

    arsenal: {
      nome: 'Arsenal',
      coresLivro: 'Púrpura, verde escuro',
      cores: ['#6b2f7a', '#2f5a33'],
      simbolo: 'duas armas cruzadas: o Martelo dos Trovões e a espada Holy Avenger',
      motivo: c => ABRE +
        "<g stroke-linecap='round' stroke-opacity='.32'>" +
          "<path d='M26 98 84 36' stroke='" + c[0] + "' stroke-width='7'/>" +
          "<path d='M74 24 98 48' stroke='" + c[0] + "' stroke-width='5' stroke-opacity='.26'/>" +
          "<path d='M88 32 98 22' stroke='" + c[0] + "' stroke-width='5'/>" +
          "<path d='M96 98 44 42' stroke='" + c[1] + "' stroke-width='6'/>" +
        '</g>' +
        "<rect x='20' y='18' width='30' height='20' rx='4' transform='rotate(-45 35 28)' fill='" + c[1] + "' fill-opacity='.3'/>" +
        FECHA,
    },

    azgher: {
      nome: 'Azgher',
      coresLivro: 'Branco, dourado',
      cores: ['#f2ead6', '#b8860b'],
      estrutural: 1,
      simbolo: 'um sol dourado',
      motivo: c => ABRE +
        raios(16, 60, 60, 34, 56, c[1], 3, '.3') +
        "<circle cx='60' cy='60' r='26' fill='" + c[1] + "' fill-opacity='.26'/>" +
        "<circle cx='60' cy='60' r='16' fill='" + c[0] + "' fill-opacity='.5'/>" +
        FECHA,
    },

    hyninn: {
      nome: 'Hyninn',
      coresLivro: 'Vermelho, cinza, preto',
      cores: ['#a32b2b', '#6e6e73', '#262626'],
      simbolo: 'uma adaga atravessando uma máscara, ou uma raposa',
      motivo: c => ABRE +
        "<path d='M60 20c18 0 30 8 30 20v24c0 20-30 34-30 34S30 84 30 64V40c0-12 12-20 30-20z' fill='" + c[1] + "' fill-opacity='.24' stroke='" + c[2] + "' stroke-width='2.5' stroke-opacity='.26'/>" +
        "<ellipse cx='46' cy='52' rx='8' ry='5' fill='" + c[2] + "' fill-opacity='.34'/>" +
        "<ellipse cx='74' cy='52' rx='8' ry='5' fill='" + c[2] + "' fill-opacity='.34'/>" +
        "<g stroke-linecap='round' stroke-opacity='.36'>" +
          "<path d='M16 106 92 26' stroke='" + c[0] + "' stroke-width='6'/>" +
          "<path d='M86 18 104 36' stroke='" + c[0] + "' stroke-width='4.5' stroke-opacity='.28'/>" +
        '</g>' +
        FECHA,
    },

    kallyadranoch: {
      nome: 'Kallyadranoch',
      coresLivro: 'vermelho, verde, azul, branco, preto',
      cores: ['#a32b2b', '#2f6b3a', '#2f5a8a', '#efe6d2', '#262626'],
      simbolo: 'a figura de um dragão, ou escamas de cinco cores',
      motivo: c => ABRE +
        escama(32, 58, 20, c[0], '.3') + escama(60, 58, 20, c[1], '.3') + escama(88, 58, 20, c[2], '.3') +
        escama(46, 84, 20, c[3], '.42') + escama(74, 84, 20, c[4], '.26') +
        "<path d='M14 40c16-14 38-18 56-8-14 2-24 8-30 18-8-10-16-12-26-10z' fill='" + c[0] + "' fill-opacity='.18'/>" +
        FECHA,
    },

    khalmyr: {
      nome: 'Khalmyr',
      coresLivro: 'Azul, branco, cinza',
      cores: ['#2f5a8a', '#eae1cd', '#7a7f85'],
      simbolo: 'espada sobreposta a uma balança',
      motivo: c => ABRE +
        "<g fill='none' stroke='" + c[2] + "' stroke-width='3' stroke-opacity='.3' stroke-linecap='round'>" +
          "<path d='M22 46h76'/><path d='M30 46 22 58'/><path d='M30 46 38 58'/><path d='M90 46 82 58'/><path d='M90 46 98 58'/>" +
          "<path d='M60 46v44'/><path d='M44 94h32'/>" +
        '</g>' +
        "<path d='M20 58a10 10 0 0 0 20 0z' fill='" + c[2] + "' fill-opacity='.26'/>" +
        "<path d='M80 58a10 10 0 0 0 20 0z' fill='" + c[2] + "' fill-opacity='.26'/>" +
        "<g stroke-linecap='round' stroke-opacity='.34'>" +
          "<path d='M60 12v74' stroke='" + c[0] + "' stroke-width='7'/>" +
          "<path d='M46 34h28' stroke='" + c[0] + "' stroke-width='4.5' stroke-opacity='.3'/>" +
        '</g>' +
        FECHA,
    },

    lena: {
      nome: 'Lena',
      coresLivro: 'Verde, amarelo, branco',
      cores: ['#4a8a52', '#d8b53a', '#efe6d2'],
      simbolo: 'lua crescente prateada',
      // A lua do livro é PRATEADA, e o branco da paleta sumia no
      // pergaminho: a lua leva a prata e os brotos levam as cores do livro.
      // O crescente é UM caminho com dois círculos e fill-rule evenodd (o
      // de cima é furado pelo de baixo). A primeira tentativa foi o truque
      // dos dois arcos — e ele NÃO funciona: a corda era maior que o
      // diâmetro do segundo raio, o SVG esticou o raio para caber, os dois
      // arcos viraram o mesmo, e sobrou um risco fino na tela.
      motivo: c => ABRE +
        "<path fill-rule='evenodd' fill='#aeb4ba' fill-opacity='.42' d='M14 60a46 46 0 1 0 92 0 46 46 0 1 0-92 0z M46 56a36 36 0 1 0 72 0 36 36 0 1 0-72 0z'/>" +
        "<path d='M96 86c8-2 13-8 12-16-8 0-13 7-12 16z' fill='" + c[0] + "' fill-opacity='.28'/>" +
        "<path d='M104 100c7-3 10-9 8-16-7 2-10 9-8 16z' fill='" + c[1] + "' fill-opacity='.26'/>" +
        FECHA,
    },

    linwu: {
      nome: 'Lin-Wu',
      coresLivro: 'Vermelho, verde, dourado',
      cores: ['#9e2b2b', '#2f6b4a', '#c79a3a'],
      simbolo: 'um dragão celestial',
      motivo: c => ABRE +
        "<path d='M8 104c26 6 26-20 44-28s24 6 34-6' fill='none' stroke='" + c[0] + "' stroke-width='7' stroke-opacity='.32' stroke-linecap='round'/>" +
        "<path d='M26 96l5-10 5 9zM44 84l5-10 5 9zM62 72l5-10 5 9z' fill='" + c[1] + "' fill-opacity='.34'/>" +
        "<path d='M98 44c10 0 16 7 16 15s-7 15-16 15c-8 0-14-6-14-13 0-9 6-17 14-17z' fill='" + c[0] + "' fill-opacity='.34'/>" +
        "<g fill='none' stroke='" + c[2] + "' stroke-width='3' stroke-opacity='.4' stroke-linecap='round'>" +
          "<path d='M100 44 94 28M112 46 116 30'/>" +
          "<path d='M94 70c-6 12-16 18-30 16'/>" +
        '</g>' +
        "<circle cx='104' cy='56' r='3' fill='" + c[2] + "' fill-opacity='.5'/>" +
        FECHA,
    },

    marah: {
      nome: 'Marah',
      coresLivro: 'Branco',
      cores: ['#f4eddc'],
      // a ÚNICA cor do livro é o branco, e moldura branca desaparece no
      // pergaminho: a estrutura usa a prata da pena do símbolo sagrado
      estruturalCor: '#9aa0a6',
      simbolo: 'uma pena sobre um coração',
      motivo: c => ABRE +
        "<path d='M60 104C30 84 16 66 16 50a22 22 0 0 1 44-8 22 22 0 0 1 44 8c0 16-14 34-44 54z' fill='" + c[0] + "' fill-opacity='.85' stroke='#9aa0a6' stroke-width='3' stroke-opacity='.55'/>" +
        "<path d='M96 16C72 30 54 54 46 84c24-8 44-30 50-58z' fill='#9aa0a6' fill-opacity='.22'/>" +
        "<path d='M98 14 44 88' fill='none' stroke='#9aa0a6' stroke-width='2.5' stroke-opacity='.4' stroke-linecap='round'/>" +
        FECHA,
    },


    // ── LEVA 2: os dez restantes (04/10/2026) ────────────────────

    megalokk: {
      nome: 'Megalokk',
      coresLivro: 'Nenhuma',
      // o livro diz, com todas as letras, que Megalokk NÃO tem cores
      // significativas — e isso fica assim: sem faixa de cores. A moldura
      // usa o couro da garra do símbolo, e não é cor do livro.
      cores: [],
      estruturalCor: '#6b5a44',
      simbolo: 'a figura de uma garra, ou de um monstro',
      motivo: () => ABRE +
        "<g fill='none' stroke='#6b5a44' stroke-linecap='round' stroke-opacity='.3'>" +
          "<path d='M22 14c2 30 14 54 36 70' stroke-width='9'/>" +
          "<path d='M48 10c2 32 14 58 38 76' stroke-width='9'/>" +
          "<path d='M76 16c0 30 10 54 30 70' stroke-width='9'/>" +
        '</g>' +
        "<path d='M54 86l10 6-12 4zM82 90l10 6-12 4zM102 86l10 6-12 4z' fill='#6b5a44' fill-opacity='.3'/>" +
        FECHA,
    },

    nimb: {
      nome: 'Nimb',
      coresLivro: 'Preto, branco, vermelho. púrpura',
      cores: ['#262626', '#efe6d2', '#a32b2b', '#6b2f7a'],
      simbolo: 'um dado de seis faces, com símbolos imprevisíveis em cada uma',
      motivo: c => ABRE +
        "<rect x='26' y='26' width='68' height='68' rx='10' transform='rotate(-14 60 60)' fill='" + c[1] + "' fill-opacity='.5' stroke='" + c[0] + "' stroke-width='3' stroke-opacity='.34'/>" +
        // os símbolos imprevisíveis: nenhum igual ao outro
        "<circle cx='44' cy='48' r='6' fill='" + c[2] + "' fill-opacity='.42'/>" +
        "<path d='M72 36l6 12-12 0z' fill='" + c[3] + "' fill-opacity='.42'/>" +
        "<path d='M46 78h16M54 70v16' stroke='" + c[0] + "' stroke-width='4' stroke-opacity='.36' stroke-linecap='round'/>" +
        "<path d='M74 70l14 14M88 70l-14 14' stroke='" + c[2] + "' stroke-width='4' stroke-opacity='.36' stroke-linecap='round'/>" +
        FECHA,
    },

    oceano: {
      nome: 'Oceano',
      coresLivro: 'Azulmarinho, verde-água',
      cores: ['#1f3f6b', '#3f9a8a'],
      simbolo: 'uma concha',
      motivo: c => ABRE +
        "<path d='M60 102 18 50a46 46 0 0 1 84 0z' fill='" + c[1] + "' fill-opacity='.26' stroke='" + c[0] + "' stroke-width='2.5' stroke-opacity='.3'/>" +
        "<g fill='none' stroke='" + c[0] + "' stroke-width='2.5' stroke-opacity='.3' stroke-linecap='round'>" +
          "<path d='M60 100V34M60 100 34 52M60 100 86 52M60 100 24 64M60 100 96 64'/>" +
        '</g>' +
        FECHA,
    },

    sszzaas: {
      nome: 'Sszzaas',
      coresLivro: 'Verde, preto, cinza, marrom, vermelho',
      cores: ['#3f6b35', '#262626', '#6e6e73', '#6b4a2a', '#a32b2b'],
      simbolo: 'uma naja vertendo veneno pelas presas',
      motivo: c => ABRE +
        // o capelo, largo e aberto
        "<path d='M60 40c-28 0-44 13-44 29 0 13 10 23 24 27h40c14-4 24-14 24-27 0-16-16-29-44-29z' fill='" + c[0] + "' fill-opacity='.28' stroke='" + c[1] + "' stroke-width='2.5' stroke-opacity='.24'/>" +
        // a cabeça, estreita, em cima do capelo
        "<path d='M60 12c-9 0-15 7-15 16s6 16 15 16 15-7 15-16-6-16-15-16z' fill='" + c[0] + "' fill-opacity='.4' stroke='" + c[1] + "' stroke-width='2' stroke-opacity='.3'/>" +
        // os olhos e as presas
        "<circle cx='54' cy='24' r='3' fill='" + c[1] + "' fill-opacity='.5'/>" +
        "<circle cx='66' cy='24' r='3' fill='" + c[1] + "' fill-opacity='.5'/>" +
        "<path d='M53 40l3 14 4-13zM64 40l4 13 3-14z' fill='" + c[2] + "' fill-opacity='.5'/>" +
        // o veneno pingando
        "<circle cx='56' cy='98' r='4' fill='" + c[4] + "' fill-opacity='.34'/>" +
        "<circle cx='66' cy='106' r='3' fill='" + c[4] + "' fill-opacity='.28'/>" +
        // o corpo, enrolado embaixo
        "<path d='M30 92c-8 10-4 22 10 22h44' fill='none' stroke='" + c[3] + "' stroke-width='7' stroke-opacity='.26' stroke-linecap='round'/>" +
        FECHA,
    },

    tannatoh: {
      nome: 'Tanna-Toh',
      coresLivro: 'Branco, amarelo, cinza claro',
      cores: ['#f2ead6', '#d8b53a', '#b9b2a4'],
      estrutural: 1,          // o branco do livro não faz moldura em pergaminho
      simbolo: 'rolo de pergaminho e pena',
      motivo: c => ABRE +
        // o rolo aberto
        "<path d='M22 40h76v52H22z' fill='" + c[0] + "' fill-opacity='.7' stroke='" + c[2] + "' stroke-width='2.5' stroke-opacity='.4'/>" +
        "<path d='M22 40a8 8 0 0 0 0 16h76a8 8 0 0 1 0-16zM22 76a8 8 0 0 1 0 16h76a8 8 0 0 0 0-16z' fill='" + c[2] + "' fill-opacity='.3'/>" +
        "<g stroke='" + c[2] + "' stroke-width='2.5' stroke-opacity='.45' stroke-linecap='round'>" +
          "<path d='M34 64h40M34 72h30'/>" +
        '</g>' +
        // a pena, atravessada
        "<path d='M104 14C86 26 74 44 70 64c16-6 30-24 34-50z' fill='" + c[1] + "' fill-opacity='.4'/>" +
        "<path d='M106 12 66 70' fill='none' stroke='" + c[1] + "' stroke-width='3' stroke-opacity='.5' stroke-linecap='round'/>" +
        FECHA,
    },

    tenebra: {
      nome: 'Tenebra',
      coresLivro: 'Preto, roxo, azul escuro',
      cores: ['#1d1d22', '#4a2a6b', '#22365e'],
      simbolo: 'estrela de cinco pontas',
      motivo: c => ABRE +
        "<circle cx='60' cy='60' r='48' fill='" + c[0] + "' fill-opacity='.14'/>" +
        "<path d='M60 14 74 48l36 3-27 24 8 35-31-19-31 19 8-35-27-24 36-3z' fill='" + c[1] + "' fill-opacity='.34'/>" +
        "<circle cx='22' cy='26' r='3' fill='" + c[2] + "' fill-opacity='.4'/>" +
        "<circle cx='100' cy='96' r='2.5' fill='" + c[2] + "' fill-opacity='.4'/>" +
        "<circle cx='104' cy='24' r='2' fill='" + c[2] + "' fill-opacity='.34'/>" +
        FECHA,
    },

    thwor: {
      nome: 'Thwor',
      coresLivro: 'Verde, vermelho, marrom, negro',
      cores: ['#4a7a35', '#a32b2b', '#6b4a2a', '#262626'],
      simbolo: 'um grande punho fechado',
      motivo: c => ABRE +
        // a mão fechada
        "<path d='M32 52c0-8 6-14 16-14h26c12 0 20 8 20 18v26c0 12-10 22-24 22H50c-11 0-18-7-18-18z' fill='" + c[0] + "' fill-opacity='.3' stroke='" + c[3] + "' stroke-width='2.5' stroke-opacity='.26'/>" +
        // os nós dos dedos, em cima
        "<path d='M34 50a9 9 0 0 1 18 0zM52 46a9 9 0 0 1 18 0zM70 46a9 9 0 0 1 18 0z' fill='" + c[0] + "' fill-opacity='.42'/>" +
        // as dobras dos dedos
        "<g fill='none' stroke='" + c[3] + "' stroke-width='2.5' stroke-opacity='.28' stroke-linecap='round'>" +
          "<path d='M52 52v30M70 48v34M88 52v28'/>" +
        '</g>' +
        // o polegar, atravessando a frente
        "<path d='M30 70c-8 2-12 8-10 14 2 7 10 10 18 8l22-6' fill='none' stroke='" + c[2] + "' stroke-width='9' stroke-opacity='.34' stroke-linecap='round'/>" +
        FECHA,
    },

    thyatis: {
      nome: 'Thyatis',
      coresLivro: 'Laranja, ouro, amarelo',
      cores: ['#c2622a', '#c79a3a', '#d8b53a'],
      simbolo: 'uma ave fênix',
      motivo: c => ABRE +
        // as asas abertas
        "<path d='M60 46C44 26 24 18 8 22c10 10 14 24 24 32 8 7 18 9 28 6z' fill='" + c[0] + "' fill-opacity='.3'/>" +
        "<path d='M60 46c16-20 36-28 52-24-10 10-14 24-24 32-8 7-18 9-28 6z' fill='" + c[1] + "' fill-opacity='.3'/>" +
        // o corpo e a cabeça
        "<path d='M60 42c6 0 10 6 10 14s-4 22-10 30c-6-8-10-22-10-30s4-14 10-14z' fill='" + c[0] + "' fill-opacity='.36'/>" +
        "<circle cx='60' cy='36' r='7' fill='" + c[0] + "' fill-opacity='.4'/>" +
        "<path d='M66 34l10-4-10-3z' fill='" + c[2] + "' fill-opacity='.5'/>" +
        // a cauda em chamas
        "<path d='M54 86c-6 12-6 22-2 32 4-8 8-12 8-20zM66 86c6 12 6 22 2 32-4-8-8-12-8-20z' fill='" + c[2] + "' fill-opacity='.34'/>" +
        FECHA,
    },

    valkaria: {
      nome: 'Valkaria',
      coresLivro: 'Vermelho, púrpura',
      cores: ['#a32b2b', '#6b2f7a'],
      simbolo: 'a Estátua de Valkaria, ou seis faixas entrelaçadas',
      motivo: c => {
        // as seis faixas: a mesma elipse girando de 30 em 30 graus,
        // alternando as duas cores do livro
        let s = '';
        for (let i = 0; i < 6; i++) {
          s += "<ellipse cx='60' cy='60' rx='46' ry='17' transform='rotate(" + (i * 30) +
               " 60 60)' fill='none' stroke='" + c[i % 2] + "' stroke-width='3' stroke-opacity='.26'/>";
        }
        return ABRE + s + "<circle cx='60' cy='60' r='7' fill='" + c[0] + "' fill-opacity='.3'/>" + FECHA;
      },
    },

    wynna: {
      nome: 'Wynna',
      coresLivro: 'Cinza, ou as seis cores da magia combinadas: verde azulado, vermelho, azul, verde, branco, preto',
      // a faixa leva as SEIS cores da magia; a moldura leva o cinza, que é
      // a outra metade da mesma frase do livro
      cores: ['#2f8a8a', '#a32b2b', '#2f5a8a', '#2f6b3a', '#efe6d2', '#262626'],
      estruturalCor: '#6e6e73',
      simbolo: 'anel metálico, com ou sem runas',
      motivo: c => {
        // o anel, e seis runas em volta — uma por cor da magia
        let s = "<circle cx='60' cy='60' r='38' fill='none' stroke='#6e6e73' stroke-width='9' stroke-opacity='.26'/>";
        for (let i = 0; i < 6; i++) {
          const a = (Math.PI * 2 * i) / 6 - Math.PI / 2;
          const x = (60 + Math.cos(a) * 38).toFixed(1), y = (60 + Math.sin(a) * 38).toFixed(1);
          s += "<circle cx='" + x + "' cy='" + y + "' r='6' fill='" + c[i] + "' fill-opacity='.5'/>";
        }
        return ABRE + s + FECHA;
      },
    },
  };

  // ── A API QUE A ABA USA ──────────────────────────────────────────
  //  "Lin-Wu" e "Tanna-Toh" viram linwu e tannatoh: é a MESMA chave do
  //  js/devotos-data.js, para os dois lugares falarem do mesmo deus.
  function chaveDe(nome) {
    return window.GA_semAcento(String(nome || '')).replace(/[^a-z0-9]/g, '');
  }
  function de(nome) {
    const k = chaveDe(nome);
    const d = deuses[k];
    return d ? Object.assign({ chave: k }, d) : null;
  }
  //  A cor que faz borda e moldura: a do livro, pulando as claras demais
  //  (ver `estrutural` e `estruturalCor`).
  function corEstrutural(d) {
    return d.estruturalCor || d.cores[d.estrutural || 0] || '#8a6a1f';
  }
  //  A faixa de cores significativas: uma listra por cor do livro, na
  //  ordem do livro, em fatias iguais. Uma cor só vira cor chapada — e
  //  NENHUMA cor (é o caso de Megalokk, e o livro diz isso com todas as
  //  letras) vira a cor da moldura, para o card não parecer quebrado.
  function faixa(d) {
    const n = d.cores.length;
    if (!n) return corEstrutural(d);
    if (n === 1) return d.cores[0];
    const partes = d.cores.map((cor, i) =>
      cor + ' ' + ((i * 100) / n).toFixed(2) + '% ' + (((i + 1) * 100) / n).toFixed(2) + '%');
    return 'linear-gradient(90deg,' + partes.join(',') + ')';
  }
  //  O desenho, pronto para o background-image.
  //  ⚠ O encodeURIComponent cuida do "#" das cores, mas NÃO toca nos
  //  apóstrofos — ele os considera seguros. E são justamente eles, os
  //  das aspas de cada atributo do SVG, que fecham o url('…') cedo
  //  demais: o valor vira inválido e a imagem inteira some SEM ERRO
  //  NENHUM no console (o background-image calculado dá "none"). Foi o
  //  defeito que apagou a marca de água na primeira tentativa; daí o
  //  replace dos apóstrofos por %27.
  function motivoUrl(d) {
    if (typeof d.motivo !== 'function') return 'none';
    const svg = encodeURIComponent(d.motivo(d.cores)).replace(/'/g, '%27');
    return "url('data:image/svg+xml," + svg + "')";
  }
  //  As três variáveis que o CSS lê, prontas para o atributo style.
  function estilo(d) {
    return '--deus-cor:' + corEstrutural(d) +
           ';--deus-faixa:' + faixa(d) +
           ';--deus-motivo:' + motivoUrl(d);
  }

  return {
    fonte: 'Deuses de Arton — o quadro de dados de cada divindade ("Cores Significativas" e "Símbolo Sagrado")',
    deuses: deuses,
    chaveDe: chaveDe,
    de: de,
    estilo: estilo,
    faixa: faixa,
    corEstrutural: corEstrutural,
    motivoUrl: motivoUrl,
  };
})();
