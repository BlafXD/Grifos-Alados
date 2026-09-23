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
