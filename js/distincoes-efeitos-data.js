// ════════════════════════════════════════════════════════════════════
//  DISTINCOES-EFEITOS-DATA.JS — o que, nas 59 distinções (365 poderes +
//  marcas), dá para aplicar sozinho numa criatura do Painel de Combate
//  Localização: /grifos-alados/js/distincoes-efeitos-data.js
//
//  Pedido dele (23/10/2026): dar distinção pra NPC/criatura e o que ela
//  concede já entrar sozinho — teste de ataque já soma, resistência já
//  anota, imunidade já bloqueia a condição. Li as 365 fichas (as mesmas
//  de js/poderes-raca-origem-data.js, grupo 'distincao') uma a uma.
//
//  O CORTE: a maioria dos poderes gasta PM por uso, exige uma escolha
//  (estilo, cabriola, elemento do mestre dracônico…), afeta magia
//  específica, ou só faz sentido olhando o texto (invocar aliado,
//  fabricar item, ressuscitar). Isso é PARTE do jogo, não "falta
//  automatizar" — não dá pra aplicar sem inventar uma interface pra
//  cada caso. Só entram aqui os poderes com um número ou efeito FIXO,
//  que não depende de uma escolha feita a cada uso. O resto continua
//  aparecendo como texto no cartão da distinção (igual sempre apareceu),
//  e a lista completa de "por que ficou de fora" mora em
//  docs/distincoes-efeitos-progresso.md.
//
//  CADA ENTRADA é um array de efeitos (um poder raramente dá só uma
//  coisa). Campos possíveis, todos opcionais exceto `tipo`:
//    tipo     — 'ataque' | 'dano' | 'ataqueDano' | 'defesa' | 'iniciativa'
//               | 'fortitude' | 'reflexos' | 'vontade' | 'pv' | 'pm'
//               | 'deslocamento' | 'rd' | 'resistencia' | 'imunidade'
//    modo     — 'sempre' (padrão) ou 'condicional' (só quando a `cond`
//               for verdade — pra ataque/dano/ataqueDano isso liga um
//               interruptor na ficha; pros outros tipos é só a nota)
//    bonus(n) — número (ou função de n) somado ao teste/rolagem
//    dado(n)  — string de dado extra ("+1d6") pra somar no DANO
//    metros(n)— metros extras de deslocamento
//    valorRD(n), tipoDano — para 'rd'/'resistencia' (texto livre do tipo)
//    condCategorias / condChaves — categorias/chaves de CONDICOES
//               (js/monstros.js) que a 'imunidade' bloqueia
//    cond     — texto da condição/gatilho (sempre mostrado)
//    excecao  — ressalva do livro que o sistema não aplica por conta
//
//  n = poderes DAQUELA distinção na criatura, SEM contar a marca — a
//  mesma regra de js/ficha-distincoes.js (duplicada de propósito; ver
//  "dado de regra se duplica" nas memórias do projeto).
// ════════════════════════════════════════════════════════════════════
(function () {
  'use strict';

  const p2 = n => Math.floor((n - 1) / 2);
  const outros = n => n - 1;

  window.GA_DISTINCOES_EFEITOS = {

    // ── Aeronauta Goblin ───────────────────────────────────────────
    'dist-aeronauta-estou-bem-pessoal': [
      { tipo: 'rd', modo: 'sempre', valorRD: 5, tipoDano: 'fogo e impacto' },
    ],

    // ── Algoz da Tormenta ────────────────────────────────────────────
    'dist-algoz-servo-e-senhor': [   // marca
      { tipo: 'imunidade', modo: 'sempre', condCategorias: ['medo', 'mental'],
        excecao: 'não cobre a Insanidade da Tormenta em si (sem condição equivalente aqui), nem efeitos do lekael a quem o algoz serve' },
    ],
    'dist-algoz-desprezo-profano': [
      { tipo: 'resistencia', modo: 'sempre', bonus: n => n, tipoDano: 'efeitos mágicos' },
    ],
    'dist-algoz-ataque-corrupto': [
      { tipo: 'dano', modo: 'sempre', dado: n => { const d = p2(n); return d ? `+${d}d6` : ''; },
        cond: 'dano extra de matéria vermelha, em todos os seus ataques' },
    ],

    // ── Amazona ──────────────────────────────────────────────────────
    'dist-amazona-armadura-das-amazonas': [   // marca
      { tipo: 'defesa', modo: 'condicional', bonus: 2, cond: 'se não estiver usando armadura pesada' },
    ],

    // ── Caçador de Dragões ───────────────────────────────────────────
    'dist-cacador-dragoes-destemor-inflamado': [
      { tipo: 'imunidade', modo: 'sempre', condCategorias: ['medo'], excecao: 'fobias raciais continuam valendo' },
    ],

    // ── Cavaleiro do Corvo ───────────────────────────────────────────
    'dist-corvo-nao-tenho-nome': [   // marca
      { tipo: 'imunidade', modo: 'sempre', condCategorias: ['medo'] },
    ],
    'dist-corvo-reconhecimento-e-infiltracao': [
      { tipo: 'deslocamento', modo: 'sempre', metros: 3 },
    ],
    'dist-corvo-atras-das-linhas-inimigas': [
      { tipo: 'imunidade', modo: 'sempre', condChaves: ['atordoado'], condCategorias: ['cansaco'] },
    ],
    'dist-corvo-tomada-furtiva': [
      { tipo: 'ataqueDano', modo: 'condicional', bonus: n => 2 + p2(n),
        cond: 'ataques à distância, sob a Postura de Combate: Tomada Furtiva' },
    ],

    // ── Cavaleiro Feérico ────────────────────────────────────────────
    'dist-feerico-conexao-feerica': [   // marca
      { tipo: 'pm', modo: 'sempre', bonus: n => n },
    ],
    'dist-feerico-flagelo-dos-duyshidakk': [
      { tipo: 'dano', modo: 'condicional', bonus: n => n, cond: 'contra bandos, enxames e duyshidakk' },
    ],

    // ── Chapéu-Preto ─────────────────────────────────────────────────
    'dist-chapeu-coracao-duro': [
      { tipo: 'dano', modo: 'sempre', bonus: 2, cond: 'em rolagens de dano com armas' },
      { tipo: 'imunidade', modo: 'sempre', condCategorias: ['medo'],
        excecao: 'ou +2 em Vontade se já for imune a medo (não automatizado); não remove fobias raciais' },
    ],
    'dist-chapeu-rapido-ou-morto': [
      { tipo: 'iniciativa', modo: 'sempre', bonus: n => 2 + p2(n) },
      { tipo: 'deslocamento', modo: 'sempre', metros: n => 3 + 1.5 * p2(n) },
    ],

    // ── Ginete de Namalkah ───────────────────────────────────────────
    'dist-ginete-amalkhan': [   // marca
      { tipo: 'defesa', modo: 'sempre', bonus: 1 },
      { tipo: 'reflexos', modo: 'sempre', bonus: 1 },
    ],

    // ── Mago de Batalha de Wynlla ────────────────────────────────────
    'dist-batalha-conjurador-encouracado': [
      { tipo: 'defesa', modo: 'condicional', bonus: n => outros(n), cond: 'com armaduras pesadas' },
    ],

    // ── Médico de Salistick ──────────────────────────────────────────
    'dist-medico-saude-perfeita': [
      { tipo: 'imunidade', modo: 'sempre', condCategorias: ['veneno'] },
      { tipo: 'pm', modo: 'sempre', bonus: n => 2 * n },
    ],

    // ── Mosqueteiro de Rishantor ─────────────────────────────────────
    'dist-mosqueteiro-equipamento-real': [   // marca
      { tipo: 'ataqueDano', modo: 'condicional', bonus: 1,
        cond: 'usando o tabardo, o florete/rapieira e o chapéu emplumado do traje' },
      { tipo: 'defesa', modo: 'condicional', bonus: 1,
        cond: 'usando o tabardo, o florete/rapieira e o chapéu emplumado do traje' },
    ],

    // ── Mutagenista ──────────────────────────────────────────────────
    'dist-mutagenista-preparacao-corporal': [   // marca
      { tipo: 'fortitude', modo: 'sempre', bonus: 2 },
    ],

    // ── Pistoleiro de Smokestone ─────────────────────────────────────
    'dist-pistoleiro-honra-do-pistoleiro': [   // marca
      { tipo: 'dano', modo: 'condicional', bonus: 2, cond: 'com armas de fogo leves ou de uma mão' },
    ],
    'dist-pistoleiro-rapido-no-gatilho': [
      { tipo: 'iniciativa', modo: 'sempre', bonus: n => 2 * n },
    ],

    // ── Cavaleiro de Khalmyr ─────────────────────────────────────────
    'dist-cav-khalmyr-seguir-a-norma': [   // marca
      { tipo: 'fortitude', modo: 'sempre', bonus: 2 },
      { tipo: 'vontade', modo: 'sempre', bonus: 2 },
    ],

    // ── Guardião da Realidade ────────────────────────────────────────
    'dist-guardiao-escudo-da-realidade': [   // marca
      { tipo: 'resistencia', modo: 'sempre', bonus: 5, tipoDano: 'geral (todos os testes de resistência)' },
      { tipo: 'resistencia', modo: 'condicional', bonus: n => 5 + n,
        cond: 'contra efeitos da Tormenta (em vez do +5 geral, não somado a ele)' },
    ],

    // ── Herói Henshin ────────────────────────────────────────────────
    'dist-henshin-armadura-especial': [   // marca
      { tipo: 'defesa', modo: 'condicional', bonus: 1, cond: 'enquanto estiver com o traje de combate transformado' },
    ],

    // ── Mestre de Armearia ───────────────────────────────────────────
    'dist-armearia-prata-da-casa': [
      { tipo: 'ataqueDano', modo: 'condicional', bonus: n => 1 + p2(n),
        cond: 'com armas de fogo fabricadas pelo próprio' },
    ],

    // ── Pacificador ──────────────────────────────────────────────────
    'dist-pacificador-armas-da-paz': [   // marca
      { tipo: 'ataqueDano', modo: 'condicional', bonus: 1, cond: 'com ataques que causam dano não letal' },
    ],

    // ── Sombra de Tenebra ────────────────────────────────────────────
    'dist-sombra-ameaca-das-sombras': [   // marca
      { tipo: 'dano', modo: 'condicional', dado: '+1d6',
        cond: 'no dano de Ataque Furtivo, em área de escuridão (exige ter a habilidade Ataque Furtivo)' },
    ],

    // ── Sumo-Sacerdote ───────────────────────────────────────────────
    'dist-sumo-evolucao-espiritual': [
      { tipo: 'pv', modo: 'sempre', bonus: n => 5 * n },
      { tipo: 'pm', modo: 'sempre', bonus: n => 2 * n },
    ],
  };
})();
