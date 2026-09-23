// ════════════════════════════════════════════════════════════════════
//  FICHA-DISTINCOES.JS — a conta dos poderes de distinção que ESCALAM
//  Localização: /grifos-alados/js/ficha-distincoes.js
//
//  POR QUE ISTO EXISTE. Muitos poderes de distinção (Heróis de Arton,
//  cap. 2) crescem com a QUANTIDADE de poderes DAQUELA distinção que o
//  personagem possui — igualzinho aos poderes da Tormenta crescem com o
//  número de poderes da Tormenta. O livro é explícito (p. 104):
//    "Muitas distinções têm poderes com efeitos que variam de acordo com
//     o número de 'poderes da distinção' que você possui. […] refere-se
//     apenas aos poderes da distinção específica que fornece esse poder.
//     Mesmo que você tenha mais de uma distinção, esses efeitos nunca
//     contam os poderes das outras."
//
//  A MARCA NÃO CONTA. O livro separa os três elementos da distinção
//  (admissão, MARCA da distinção e PODERES da distinção). A marca é uma
//  habilidade automática, não um "poder da distinção" — então ela não
//  entra na conta que faz os outros crescerem (a ficha marca a marca com
//  `marca: true` e a exclui da contagem; ver nDistincao, em ficha.js).
//
//  COMO A SOMA FUNCIONA. Nas descrições, "outros poderes da distinção" =
//  todos menos aquele sendo lido — então, com n poderes, outros = n − 1:
//    • "+1 a cada dois outros poderes"   → 1 + ⌊(n−1)/2⌋
//    • "+1 a cada quatro outros poderes" → 1 + ⌊(n−1)/4⌋
//  É a mesma conta do arquivo da Tormenta, duplicada de propósito (regra
//  do projeto de 08/09/2026: "dado de regra se duplica, ferramenta se
//  compartilha") — mexer numa distinção nunca quebra a conta da Tormenta.
//
//  O TEXTO de cada poder NÃO mora aqui — vem de window.GA_PODERES
//  (js/poderes-raca-origem-data.js). Daqui sai só a conta do "Agora:".
//  Chave de cada escala = o id do poder na base.
// ════════════════════════════════════════════════════════════════════
(function () {
  'use strict';

  // "para cada dois / quatro OUTROS poderes" — n inclui o próprio poder
  const p2 = n => Math.floor((n - 1) / 2);
  const p4 = n => Math.floor((n - 1) / 4);
  const outros = n => n - 1;
  const nOutros = n => `${outros(n)} outro${outros(n) !== 1 ? 's' : ''} poder${outros(n) !== 1 ? 'es' : ''} da distinção`;
  const nTodos = n => `${n} poder${n !== 1 ? 'es' : ''} da distinção`;
  const calc2 = n => `1 base + ${p2(n)} (um a cada dois dos ${nOutros(n)})`;
  const calc4 = n => `1 base + ${p4(n)} (um a cada quatro dos ${nOutros(n)})`;

  // chave = id do poder em window.GA_PODERES
  const ESCALAS = {
    // ── Aeronauta Goblin (Heróis de Arton, p. 106) ──────────────────
    'dist-aeronauta-cabeca-nas-nuvens': {
      escala(n) {
        const b = 1 + p2(n);
        return { txt: `+${b} em testes de perícia, rolagens de dano e na CD de suas habilidades e itens enquanto pilota`,
                 calc: calc2(n) };
      },
    },

    // ── Algoz da Tormenta (Heróis de Arton, p. 111) ─────────────────
    'dist-algoz-desprezo-profano': {
      escala(n) {
        return { txt: `resistência a magia +${n}`, calc: `1 por poder da distinção (${nTodos(n)})` };
      },
    },
    'dist-algoz-ataque-corrupto': {
      escala(n) {
        const d = p2(n);
        return { txt: d ? `dano extra da matéria vermelha +${d}d6` : 'dano extra da matéria vermelha — ainda sem d6 extra',
                 calc: `+1d6 a cada dois dos ${nOutros(n)}` };
      },
    },

    // ── Amazona (Heróis de Arton, p. 113–114) ───────────────────────
    'dist-amazona-predadora': {
      escala(n) {
        return { txt: `+1 nos testes e no dano (até +${n} gastando 1 PM por ponto extra)`,
                 calc: `+1 base + até ${outros(n)} (um por PM, um por cada um dos ${nOutros(n)})` };
      },
    },
    'dist-amazona-nunca-ceder': {
      escala(n) {
        return { txt: `bônus +${n} no teste repetido`, calc: `igual ao total de poderes da distinção (${nTodos(n)})` };
      },
    },

    // ── Armadilheiro Mestre (Heróis de Arton, p. 116) ───────────────
    'dist-armadilheiro-armadilha-instantanea': {
      escala(n) {
        const q = 2 + outros(n);
        return { txt: `${q} armadilhas escolhidas`,
                 calc: `2 base + ${outros(n)} (uma a cada novo poder da distinção — os ${nOutros(n)})` };
      },
    },

    // ── Arqueiro de Lenórienn (Heróis de Arton, p. 120) ─────────────
    'dist-arqueiro-flecha-da-morte': {
      escala(n) {
        const d = 1 + p2(n), b = 2 + p2(n);
        return { txt: `dado extra +${d}, margem +${b}, CD +${b} (com Flecha de Toque/Explosiva) · até ${n} flecha${n !== 1 ? 's' : ''} da morte`,
                 calc: `+1 a cada dois dos ${nOutros(n)}; máximo de flechas = ${nTodos(n)}` };
      },
    },

    // ── Bruxo da Tormenta (Heróis de Arton, p. 123) ─────────────────
    //  O PI que se recebe por magia é limitado pelo TOTAL de poderes da
    //  distinção (n). (O LIMITE de PI é outra conta — 5× poderes da
    //  Tormenta —, que mora na marca; a ficha não a calcula.)
    'dist-bruxo-conjuracao-insana': {
      escala(n) {
        return { txt: `até +${n} na CD da magia (1 por PI recebido)`,
                 calc: `PI limitado pelo total de poderes da distinção (${nTodos(n)})` };
      },
    },
    'dist-bruxo-corromper-magia': {
      escala(n) {
        return { txt: `até +${n}d6 de dano de essência (1d6 por PI recebido)`,
                 calc: `PI limitado pelo total de poderes da distinção (${nTodos(n)})` };
      },
    },
    'dist-bruxo-escudo-rubro': {
      escala(n) {
        return { txt: `até +${2 * n} em resistência OU ${5 * n} de RD (2/5 por PI; dobrado contra a Tormenta)`,
                 calc: `PI limitado pelo total de poderes da distinção (${nTodos(n)})` };
      },
    },

    // ── Caçador de Cabeças (Heróis de Arton, p. 126) ────────────────
    'dist-cacador-cabecas-exterminar-presa': {
      escala(n) {
        return { txt: `${n} PM temporário${n !== 1 ? 's' : ''} contra a criatura marcada`,
                 calc: `1 por poder da distinção (${nTodos(n)})` };
      },
    },

    // ── Caçador de Dragões (Heróis de Arton, p. 128) ────────────────
    'dist-cacador-dragoes-destemor-inflamado': {
      escala(n) {
        return { txt: `+${2 + p2(n)} em testes de perícia e rolagens de dano ao sofrer medo`, calc: `2 base + ${p2(n)} (um a cada dois dos ${nOutros(n)})` };
      },
    },
    'dist-cacador-dragoes-alcar-aos-ceus': {
      escala(n) {
        const d = 1 + p2(n);
        return { txt: `+${d} dado${d !== 1 ? 's' : ''} extra${d !== 1 ? 's' : ''} de dano na investida (dobrado contra dragão)`, calc: calc2(n) };
      },
    },
    'dist-cacador-dragoes-danificar-as-asas': {
      escala(n) {
        return { txt: `CD +${n} para o caído e lento (dobrado contra dragão: +${2 * n})`, calc: `1 por poder da distinção (${nTodos(n)})` };
      },
    },
    'dist-cacador-dragoes-entortar-escamas': {
      escala(n) {
        return n >= 5
          ? { txt: '–5 na Defesa e –10 na RD do alvo até o fim da cena', calc: 'com 5+ poderes da distinção' }
          : { txt: '–2 na Defesa e –5 na RD do alvo até o fim da cena', calc: `passa a –5/–10 ao chegar a 5 poderes da distinção (você tem ${n})` };
      },
    },
  };

  window.GA_FICHA_DISTINCOES = {
    // O valor de agora, com n poderes DAQUELA distinção (a marca não conta).
    // Devolve null para poder de distinção que não escala (a maioria).
    escala(id, n) {
      const e = ESCALAS[id];
      if (!e || !n) return null;
      try { return e.escala(n); } catch (erro) { return null; }
    },
    temConta(id) { return !!ESCALAS[id]; },
    // deixadas à mão caso um dia a ficha queira conferir pré-requisitos
    // nomeados entre poderes de distinção (hoje eles vão no texto preReq).
    _p2: p2, _p4: p4,
  };
})();
