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
  // "a cada dois poderes da distinção" (sem "outros") — conta TODOS, ⌊n/2⌋
  const t2 = n => Math.floor(n / 2);
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

    // ── Campeão de Dojo (Heróis de Arton, p. 131) ───────────────────
    //  A cura sobe um PASSO de dado (Tabela 3-2) a cada dois outros
    //  poderes; o passo em si é a mesma conta do dano da ficha.
    'dist-campeao-dojo-controlar-a-respiracao': {
      escala(n) {
        const passos = p2(n);
        const D = (window.GA_FichaData && window.GA_FichaData.passoDeDano)
          ? window.GA_FichaData.passoDeDano('2d6', passos).dado : '2d6';
        return { txt: `cura ${D} pontos de vida por PM gasto`,
                 calc: `2d6 base, +1 passo a cada dois dos ${nOutros(n)} (${passos} passo${passos !== 1 ? 's' : ''})` };
      },
    },

    // ── Capitão do Conclave Pirata (Heróis de Arton, p. 134) ────────
    'dist-conclave-icar-a-bandeira-preta': {
      escala(n) {
        return { txt: `aliados recebem ${5 * n} PV e ${n} PM temporário${n !== 1 ? 's' : ''}`,
                 calc: `5 PV e 1 PM por poder da distinção (${nTodos(n)})` };
      },
    },
    'dist-conclave-lingua-afiada': {
      escala(n) {
        return { txt: `até +${2 * n}d6 de dano psíquico não letal`,
                 calc: `2d6 por poder da distinção (${nTodos(n)})` };
      },
    },

    // ── Carteador (Heróis de Arton, p. 137) ─────────────────────────
    'dist-carteador-dado-viciado': {
      escala(n) {
        const d = 1 + p2(n);
        return { txt: `${d}d6 de dado de auxílio no início da cena`, calc: calc2(n) };
      },
    },
    'dist-carteador-jogo-perigoso': {
      escala(n) {
        const c = 1 + p2(n);
        return { txt: `pode escolher magias até o ${c}º círculo`,
                 calc: `1º base + ${p2(n)} círculo${p2(n) !== 1 ? 's' : ''} (um a cada dois dos ${nOutros(n)})` };
      },
    },

    // ── Cavaleiro do Corvo (Heróis de Arton, p. 140–141) ────────────
    'dist-corvo-a-qualquer-custo': {
      escala(n) {
        const b = 1 + p2(n);
        return { txt: `${b} benefício${b !== 1 ? 's' : ''} de missão (Busca e Destruição, Guerra Não Convencional, Inteligência Militar)`,
                 calc: calc2(n) };
      },
    },
    'dist-corvo-tomada-furtiva': {
      escala(n) {
        return { txt: `+${2 + p2(n)} em ataque e dano à distância (sob a postura)`,
                 calc: `2 base + ${p2(n)} (um a cada dois dos ${nOutros(n)})` };
      },
    },

    // ── Cavaleiro Feérico (Heróis de Arton, p. 143–144) ─────────────
    //  A marca (+1 PM por poder) e três poderes usam o TOTAL de poderes
    //  da distinção; a Armadura conta os OUTROS (a cada dois). Lâminas
    //  Feéricas diz "a cada dois poderes da distinção" (sem "outros") =
    //  ⌊n/2⌋, então usa t2, não p2.
    'dist-feerico-conexao-feerica': {
      escala(n) {
        return { txt: `+${n} PM (marca)`, calc: `1 por poder da distinção (${nTodos(n)})` };
      },
    },
    'dist-feerico-arte-elfica': {
      escala(n) {
        return { txt: `Música/magia arcana até o ${n}º círculo (limitado também pelo que você lança)`,
                 calc: `círculo máximo = total de poderes da distinção (${nTodos(n)})` };
      },
    },
    'dist-feerico-armadura-da-floresta': {
      escala(n) {
        const m = p2(n);
        return { txt: m ? `${m} melhoria${m !== 1 ? 's' : ''} na armadura (fora material especial)`
                        : 'ainda sem melhoria extra na armadura',
                 calc: `uma a cada dois dos ${nOutros(n)}` };
      },
    },
    'dist-feerico-flagelo-dos-duyshidakk': {
      escala(n) {
        return { txt: `+${n} em rolagens de dano contra bandos, enxames e duyshidakk`,
                 calc: `1 por poder da distinção (${nTodos(n)})` };
      },
    },
    'dist-feerico-laminas-feericas': {
      escala(n) {
        const b = t2(n);
        return { txt: `margem de ameaça +${b} com espada longa ou florete`,
                 calc: `+1 a cada dois poderes da distinção (${nTodos(n)})` };
      },
    },

    // ── Chapéu-Preto (Heróis de Arton, p. 146–147) ──────────────────
    'dist-chapeu-olhos-de-chumbo': {
      escala(n) {
        const p = 2 + p2(n);
        return { txt: `−${p} em rolagens de dano e na Defesa (aura de medo 9m)`,
                 calc: `−2 base, −1 a cada dois dos ${nOutros(n)}` };
      },
    },
    'dist-chapeu-rapido-ou-morto': {
      escala(n) {
        const i = 2 + p2(n), d = 3 + 1.5 * p2(n);
        const ds = String(d).replace('.', ',');
        return { txt: `+${i} em Iniciativa e +${ds}m de deslocamento`,
                 calc: `+2/+3m base, +1/+1,5m a cada dois dos ${nOutros(n)}` };
      },
    },

    // ── Cobaia dos Médicos Monstros (Heróis de Arton, p. 149) ───────
    //  Enxerto Experimental sobe o dado 1d4 um PASSO por cada OUTRO
    //  poder (mesmo passoDeDano da ficha, como o Campeão de Dojo).
    'dist-cobaia-enxerto-experimental': {
      escala(n) {
        const passos = outros(n);
        const D = (window.GA_FichaData && window.GA_FichaData.passoDeDano)
          ? window.GA_FichaData.passoDeDano('1d4', passos).dado : '1d4';
        return { txt: `role ${D} no início da cena (o implante experimental só falha no 1)`,
                 calc: `1d4 base, +1 passo por cada um dos ${nOutros(n)} (${passos} passo${passos !== 1 ? 's' : ''})` };
      },
    },
    'dist-cobaia-corpo-resiliente': {
      escala(n) {
        return { txt: `limite de implantes +${1 + p2(n)}`,
                 calc: `+1 base, +1 a cada dois dos ${nOutros(n)}` };
      },
    },

    // ── Dracomante Real (Heróis de Arton, p. 152) ───────────────────
    'dist-dracomante-afinidade-draconica': {
      escala(n) {
        return { txt: `redução ${3 * n} contra o dano do tipo do seu mestre (e +2 na CD dessas magias)`,
                 calc: `3 por poder da distinção (${nTodos(n)})` };
      },
    },
    'dist-dracomante-memoria-draconica': {
      escala(n) {
        return { txt: `+${n} magia${n !== 1 ? 's' : ''} memorizada${n !== 1 ? 's' : ''} por dia (do tipo do seu mestre)`,
                 calc: `1 por poder da distinção (${nTodos(n)})` };
      },
    },

    // ── Drogadora (Heróis de Arton, p. 155–156) ─────────────────────
    'dist-drogadora-curandeira-exima': {
      escala(n) {
        return { txt: `+${n} em Cura e Ofício (alquimista) (seu corpo é a maleta)`,
                 calc: `1 por poder da distinção (${nTodos(n)})` };
      },
    },
    'dist-drogadora-aspersao-curativa': {
      escala(n) {
        const v = 1 + p2(n);
        return { txt: `${v} ${v !== 1 ? 'secreções' : 'secreção'} por uso (cada: 3 PV → 3d6+3 PV ou 1 condição)`,
                 calc: `1 base, +1 a cada dois dos ${nOutros(n)}` };
      },
    },
    'dist-drogadora-laboratorio-natural': {
      escala(n) {
        return { txt: `${n} ${n !== 1 ? 'fabricações' : 'fabricação'} instantânea${n !== 1 ? 's' : ''} por dia`,
                 calc: `1 por poder da distinção (${nTodos(n)})` };
      },
    },
    'dist-drogadora-perfume-intoxicante': {
      escala(n) {
        return { txt: `+${2 + p2(n)} em Adestramento, Diplomacia e nos ataques contra alvos marcados`,
                 calc: `2 base, +1 a cada dois dos ${nOutros(n)}` };
      },
    },
    'dist-drogadora-remedios-da-floresta': {
      escala(n) {
        return { txt: `+${n} receita${n !== 1 ? 's' : ''} de até 2º círculo (além das de 1º = Sabedoria)`,
                 calc: `1 por poder da distinção (${nTodos(n)})` };
      },
    },

    // ── Engenhoqueiro Goblin (Heróis de Arton, p. 158) ──────────────
    'dist-engenhoqueiro-aprimorar-bugiganga': {
      escala(n) {
        return { txt: `até ${n} gambiarra${n !== 1 ? 's' : ''} por engenhoca (cada uma sobe +1 na falha automática)`,
                 calc: `1 por poder da distinção (${nTodos(n)})` };
      },
    },
    'dist-engenhoqueiro-autodestruicao': {
      escala(n) {
        return { txt: `até ${n} PM na explosão (+2d6 de dano por PM), raio 1d4 × 1,5m`,
                 calc: `PM limitado pelo total de poderes da distinção (${nTodos(n)})` };
      },
    },
    'dist-engenhoqueiro-manutencao-precaria': {
      escala(n) {
        return { txt: `1d3 + ${n} engenhocas no tempo entre aventuras`,
                 calc: `1d3 + 1 por poder da distinção (${nTodos(n)})` };
      },
    },

    // ── Escapista Magnífico (Heróis de Arton, p. 161) ───────────────
    'dist-escapista-aparencia-insignificante': {
      escala(n) {
        return { txt: `+${n} na CD para resistir à sua Aparência Inofensiva (e 1×/cena por inimigo)`,
                 calc: `1 por poder da distinção (${nTodos(n)})` };
      },
    },
    'dist-escapista-peguei-um-bobo': {
      escala(n) {
        return { txt: `Comando simulado com CD Car +${p2(n)}`,
                 calc: `+1 a cada dois dos ${nOutros(n)}` };
      },
    },

    // ── Gigante Furioso (Heróis de Arton, p. 164) ───────────────────
    //  (Os outros poderes escalam com o TAMANHO, não com n — ficam no texto.)
    'dist-gigante-furia-dos-gigantes': {
      escala(n) {
        const c = 1 + p2(n);
        return { txt: `+${c} categoria${c !== 1 ? 's' : ''} de tamanho (Força +${2 * c}), gastando 2 PM por categoria`,
                 calc: `1 base, +1 a cada dois dos ${nOutros(n)}` };
      },
    },

    // ── Guerreiro Mágico (Heróis de Arton, p. 170) ──────────────────
    'dist-guerreiro-magico-estilo-de-combate-arcano': {
      escala(n) {
        return { txt: `bônus do estilo escolhido em +${1 + outros(n)}`,
                 calc: `1 base, +1 por cada um dos ${nOutros(n)}` };
      },
    },

    // ── Infiltrador de Wynlla (Heróis de Arton, p. 173) ─────────────
    'dist-infiltrador-trapaca-arcana': {
      escala(n) {
        const magias = 2 + outros(n);
        return { txt: `${n >= 3 ? 'magias de 1º e 2º círculo' : 'magias de 1º círculo'} · ${magias} magia${magias !== 1 ? 's' : ''} conhecida${magias !== 1 ? 's' : ''}`,
                 calc: `2 base + 1 por cada um dos ${nOutros(n)}; 2º círculo com 3+ poderes` };
      },
    },

    // ── Mago da Ordem do Vazio (Heróis de Arton, p. 176) ────────────
    'dist-vazio-ingrediente-secreto': {
      escala(n) {
        return { txt: `até ${n} PM (+2d6 de essência por PM aos que falharem na resistência)`,
                 calc: `PM limitado pelo total de poderes da distinção (${nTodos(n)})` };
      },
    },
    'dist-vazio-inovacao-particular': {
      escala(n) {
        return { txt: `quem tenta anular/dissipar faz Vontade (CD da magia +${2 * n})`,
                 calc: `+2 por poder da distinção (${nTodos(n)})` };
      },
    },

    // ── Mago de Batalha de Wynlla (Heróis de Arton, p. 178–180) ─────
    'dist-batalha-conjurador-encouracado': {
      escala(n) {
        return { txt: `+${outros(n)} na Defesa com armaduras pesadas`,
                 calc: `+1 por cada um dos ${nOutros(n)}` };
      },
    },
    'dist-batalha-conjuracao-magibelica': {
      escala(n) {
        // 1 técnica base + 1 por outro poder da distinção, exceto o
        // Conjurador Encouraçado (pré-requisito sempre presente) → n-1.
        const t = Math.max(1, n - 1);
        return { txt: `${t} técnica${t !== 1 ? 's' : ''} de conjuração magibélica`,
                 calc: `1 base + 1 por outro poder da distinção (exceto Conjurador Encouraçado)` };
      },
    },
    'dist-batalha-infantaria-arcana': {
      escala(n) {
        return { txt: `+${n} ao dano do Arcano de Batalha (empunhando esotérico)`,
                 calc: `1 por poder da distinção (${nTodos(n)})` };
      },
    },

    // ── Médico de Salistick (Heróis de Arton, p. 182–183) ───────────
    'dist-medico-medicina-avancada': {
      escala(n) {
        const u = p2(n);
        return { txt: `Medicina cura em d10 · +${u} uso${u !== 1 ? 's' : ''} por criatura a cada dia`,
                 calc: `+1 a cada dois dos ${nOutros(n)}` };
      },
    },
    'dist-medico-medicina-preventiva': {
      escala(n) {
        return { txt: `cada pessoa: ${5 * n} PV temporários e +${n} em testes de resistência (1 dia)`,
                 calc: `5 PV e +1 por poder da distinção (${nTodos(n)})` };
      },
    },
    'dist-medico-saude-perfeita': {
      escala(n) {
        return { txt: `+${2 * n} PM (além de +1 Con e imunidade a veneno)`,
                 calc: `+2 por poder da distinção (${nTodos(n)})` };
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
