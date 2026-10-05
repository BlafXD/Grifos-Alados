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

    // ── Mestre Bêbado (Heróis de Arton, p. 185) ─────────────────────
    'dist-bebado-felicidade-engarrafada': {
      escala(n) {
        return { txt: `recipiente com ${5 + 2 * n} goles`,
                 calc: `5 base + 2 por poder da distinção (${nTodos(n)})` };
      },
    },
    'dist-bebado-logica-alcoolica': {
      escala(n) {
        const b = 2 + p2(n), d = String(3 + 1.5 * p2(n)).replace('.', ',');
        return { txt: `benefício aleatório +${b} (ou +${d}m de deslocamento)`,
                 calc: `2 base, +1 a cada dois dos ${nOutros(n)}` };
      },
    },
    'dist-bebado-bafo-de-troll': {
      escala(n) {
        return { txt: `hálito enjoa 1d4+1 rodadas (Fort CD Con +${n} reduz a 1)`,
                 calc: `1 por poder da distinção (${nTodos(n)})` };
      },
    },
    'dist-bebado-bafo-de-dragao': {
      escala(n) {
        return { txt: `sopro: até ${n} goles (2d6 de fogo cada; Reflexos CD Con +${n})`,
                 calc: `1 por poder da distinção (${nTodos(n)})` };
      },
    },
    'dist-bebado-bebida-revigorante': {
      escala(n) {
        return { txt: `até ${n} gole${n !== 1 ? 's' : ''} extra${n !== 1 ? 's' : ''} (+2d6 PV ou +1 condição cada)`,
                 calc: `1 por poder da distinção (${nTodos(n)})` };
      },
    },
    'dist-bebado-luta-ridicula': {
      escala(n) {
        return { txt: `+${n} no teste de finta (bebendo um gole)`,
                 calc: `1 por poder da distinção (${nTodos(n)})` };
      },
    },

    // ── Mestre Cozinheiro (Heróis de Arton, p. 187–188) ─────────────
    'dist-cozinheiro-tudo-que-ha-de-bom': {
      escala(n) {
        const i = 1 + p2(n);
        return { txt: `${i} ingrediente${i !== 1 ? 's' : ''} monstruoso${i !== 1 ? 's' : ''} por prato`,
                 calc: `1 base, +1 a cada dois dos ${nOutros(n)}` };
      },
    },
    'dist-cozinheiro-banquete-de-aventureiros': {
      escala(n) {
        return { txt: `banquete: até ${n} ingredientes → ${n} dado${n !== 1 ? 's' : ''} de auxílio`,
                 calc: `1 por poder da distinção (${nTodos(n)})` };
      },
    },
    'dist-cozinheiro-guardar-num-potinho': {
      escala(n) {
        return { txt: `lanche dura ${n} dia${n !== 1 ? 's' : ''}`,
                 calc: `1 por poder da distinção (${nTodos(n)})` };
      },
    },

    // ── Mestre Mahou-Jutsu (Heróis de Arton, p. 195) ────────────────
    'dist-mahou-mahou-jutsu': {
      escala(n) {
        return { txt: `magia arcana até o ${n}º círculo (limitado também pelo que você lança)`,
                 calc: `círculo máximo = total de poderes da distinção (${nTodos(n)})` };
      },
    },
    'dist-mahou-punho-arcano': {
      escala(n) {
        return { txt: `CD da magia +${1 + p2(n)} ao acertar o soco`,
                 calc: `1 base, +1 a cada dois dos ${nOutros(n)}` };
      },
    },

    // ── Mutagenista (Heróis de Arton, p. 200) ───────────────────────
    'dist-mutagenista-fabricar-mutagenicos': {
      escala(n) {
        const tipos = 'tonificantes' + (p2(n) >= 1 ? ', energizantes' : '') + (p2(n) >= 2 ? ' e despersonalizantes' : '');
        return { txt: `${n} mutagênico${n !== 1 ? 's' : ''} ativo${n !== 1 ? 's' : ''}; fabrica ${tipos}`,
                 calc: `limite ativo = total de poderes (${nTodos(n)}); energizante com 2 outros poderes, despersonalizante com 4` };
      },
    },
    'dist-mutagenista-organismo-reagente': {
      escala(n) {
        return { txt: `+${1 + p2(n)} em perícia / por dado dos preparados que ingere`,
                 calc: `1 base, +1 a cada dois dos ${nOutros(n)}` };
      },
    },

    // ── Pistoleiro de Smokestone (Heróis de Arton, p. 203) ──────────
    'dist-pistoleiro-rapido-no-gatilho': {
      escala(n) {
        return { txt: `+${2 * n} em Iniciativa`,
                 calc: `+2 por poder da distinção (${nTodos(n)})` };
      },
    },

    // ── Professor de Magia (Heróis de Arton, p. 206–207) ────────────
    'dist-professor-pedagogia-magica': {
      escala(n) {
        const u = 1 + p2(n);
        return { txt: `cada aluno lança a magia ${u}×/dia`,
                 calc: `1 base, +1 a cada dois dos ${nOutros(n)}` };
      },
    },
    'dist-professor-orgulho-do-mestre': {
      escala(n) {
        return { txt: `até ${2 * n} PM temporários por cena (1 por magia de aliado que acerta)`,
                 calc: `2 por poder da distinção (${nTodos(n)})` };
      },
    },

    // ── Senador (Heróis de Arton, p. 209) ───────────────────────────
    'dist-senador-cofres-fundos': {
      escala(n) {
        const item = n >= 5 ? '; requisita item mágico médio' : (n >= 3 ? '; requisita item mágico menor' : '');
        return { txt: `+${4 * n} no teste de Carisma para fundos${item}`,
                 calc: `+4 por poder da distinção (${nTodos(n)}); item com 3, médio com 5` };
      },
    },
    'dist-senador-apoio-popular': {
      escala(n) {
        const niv = p2(n);
        return { txt: niv ? `parceiros da Autoridade Feudal +${niv} nível${niv !== 1 ? 'is' : ''}` : 'parceiros da Autoridade Feudal (iniciantes)',
                 calc: `+1 nível a cada dois dos ${nOutros(n)}` };
      },
    },
    'dist-senador-inocencia-convicta': {
      escala(n) {
        return { txt: `refaz a resistência com Nobreza +${n}`,
                 calc: `1 por poder da distinção (${nTodos(n)})` };
      },
    },
    'dist-senador-um-minotauro-de-bem': {
      escala(n) {
        return { txt: `+${1 + outros(n)} em perícias de Carisma e na CD das suas habilidades`,
                 calc: `1 base, +1 por cada um dos ${nOutros(n)}` };
      },
    },

    // ── Vigarista (Heróis de Arton, p. 213) ─────────────────────────
    'dist-vigarista-aquele-papinho': {
      escala(n) {
        return { txt: `+${1 + outros(n)} em Diplomacia, Enganação, Intuição e na CD das suas habilidades de Carisma`,
                 calc: `1 base, +1 por cada um dos ${nOutros(n)}` };
      },
    },
    'dist-vigarista-efeito-placebo': {
      escala(n) {
        return { txt: `${n} magia${n !== 1 ? 's' : ''} de 1º círculo à escolha (elixir vira poção)`,
                 calc: `1 por poder da distinção (${nTodos(n)})` };
      },
    },
    'dist-vigarista-reliquias-sagradas': {
      escala(n) {
        return { txt: `até ${n} relíquia${n !== 1 ? 's' : ''} sagrada${n !== 1 ? 's' : ''} (acessório mágico menor falso)`,
                 calc: `1 por poder da distinção (${nTodos(n)})` };
      },
    },

    // ══════════════════════════════════════════════════════════════
    //  DISTINÇÕES DO DEUSES DE ARTON (cap. 2, p. 66–141)
    //  Mesma regra do Heróis — o livro repete a explicação na p. 68.
    // ══════════════════════════════════════════════════════════════

    // ── Bufão de Hyninn (Deuses de Arton, p. 71–72) ─────────────────
    'dist-bufao-cabriolas-de-bobo': {
      // "Escolha duas cabriolas. A cada OUTRO poder da distinção você
      // pode escolher uma nova" → 2 de base + 1 por outro poder.
      escala(n) {
        const q = 2 + outros(n);
        return { txt: `${q} cabriolas escolhidas`,
                 calc: `2 de base + ${outros(n)} (uma por cada um dos ${nOutros(n)})` };
      },
    },
    'dist-bufao-quem-ri-por-ultimo': {
      escala(n) {
        const b = 1 + p2(n);
        return { txt: `+${b} em testes de perícia e na CD das suas habilidades contra quem já agiu na rodada`,
                 calc: calc2(n) };
      },
    },

    // ── Cavaleiro da Luz (Deuses de Arton, p. 75) ──────────────────
    'dist-cav-luz-alcunha': {
      escala(n) {
        return { txt: `até ${n} PM por teste de perícia de Carisma (+2 cada)`,
                 calc: `limitado pelo total de poderes da distinção (${nTodos(n)})` };
      },
    },

    // ── Colecionador Monstruoso (Deuses de Arton, p. 80–81) ────────
    'dist-colecionador-forma-monstruosa': {
      escala(n) {
        return { txt: `até ${n} PM extra${n !== 1 ? 's' : ''} na Forma Selvagem, em habilidades de monstros devorados`,
                 calc: `limitado pelo total de poderes da distinção (${nTodos(n)})` };
      },
    },
    'dist-colecionador-predacao-monstruosa': {
      escala(n) {
        const v = 1 + p2(n);
        return { txt: `acumula até ${v}× (+${10 * v} PV e +${v} em ataque e dano com armas naturais)`,
                 calc: calc2(n) };
      },
    },

    // ── Dançarina de Marah (Deuses de Arton, p. 84) ────────────────
    'dist-dancarina-transe-dancante': {
      escala(n) {
        const b = 2 + p2(n);
        return { txt: `+${b} em testes de resistência e na Defesa dentro da aura`,
                 calc: `2 de base + ${p2(n)} (um a cada dois dos ${nOutros(n)})` };
      },
    },

    // ── Detetive de Tanna-Toh (Deuses de Arton, p. 86–87) ──────────
    //  A distinção inteira escala: os cinco poderes crescem com o total.
    'dist-detetive-tracar-perfil': {
      escala(n) {
        return { txt: `+${n} em testes de perícia e na CD das suas habilidades contra o alvo perfilado`,
                 calc: `1 por poder da distinção (${nTodos(n)})` };
      },
    },
    'dist-detetive-classificar-como-suspeito': {
      escala(n) {
        return { txt: `até ${n} suspeito${n !== 1 ? 's' : ''} por aventura`,
                 calc: `limitado pelo total de poderes da distinção (${nTodos(n)})` };
      },
    },
    'dist-detetive-elementar': {
      escala(n) {
        return { txt: `lê cenas de até ${2 * n} dia${2 * n !== 1 ? 's' : ''} atrás`,
                 calc: `2 dias por poder da distinção (${nTodos(n)})` };
      },
    },
    'dist-detetive-informantes': {
      escala(n) {
        const q = 1 + outros(n);
        return { txt: `${q} informante${q !== 1 ? 's' : ''}`,
                 calc: `1 de base + ${outros(n)} (um por cada um dos ${nOutros(n)})` };
      },
    },
    'dist-detetive-sequencia-dedutiva': {
      escala(n) {
        return { txt: `bônus cumulativo de dedução até +${n}`,
                 calc: `limitado pelo total de poderes da distinção (${nTodos(n)})` };
      },
    },

    // ── Forjador Litúrgico (Deuses de Arton, p. 94) ────────────────
    'dist-forjador-virtude-do-forjador': {
      escala(n) {
        const m = Math.min(4, 1 + outros(n));
        return { txt: `armas superiores com ${m} melhoria${m !== 1 ? 's' : ''}` + (m === 4 ? ' (no teto do livro)' : ''),
                 calc: `1 de base + ${outros(n)} (uma por cada um dos ${nOutros(n)}), até 4` };
      },
    },
    'dist-forjador-armamento-trabalhado': {
      escala(n) {
        const m = Math.min(4, n);
        return { txt: `até ${2 * n} PM extras na Conjurar Arma → ${m} melhoria${m !== 1 ? 's' : ''}` +
                      (n >= 5 ? ' (o teto de 4 chega antes)' : ''),
                 calc: `o dobro do total de poderes da distinção (${nTodos(n)}), 2 PM por melhoria, até 4` };
      },
    },

    // ── Guardião da Realidade (Deuses de Arton, p. 97) ─────────────
    //  Quem escala aqui é a MARCA — e a conta é dos poderes, que é o
    //  que `n` já traz (a marca nunca se conta).
    'dist-guardiao-escudo-da-realidade': {
      escala(n) {
        return { txt: `+5 em testes de resistência · +${5 + n} contra efeitos da Tormenta`,
                 calc: `5 de base + ${n} (um por poder da distinção)` };
      },
    },

    // ── Herói Henshin (Deuses de Arton, p. 101) ────────────────────
    'dist-henshin-pose-de-combate': {
      escala(n) {
        const q = 1 + outros(n);
        return { txt: `${q} pose${q !== 1 ? 's' : ''} de combate escolhida${q !== 1 ? 's' : ''}`,
                 calc: `1 de base + ${outros(n)} (uma por cada um dos ${nOutros(n)})` };
      },
    },

    // ── Improvisador de Lena (Deuses de Arton, p. 104) ─────────────
    'dist-improvisador-efeito-cenografico': {
      escala(n) {
        return { txt: `CD Int +${n} no teste de Fortitude do golpe cenográfico`,
                 calc: `1 por poder da distinção (${nTodos(n)})` };
      },
    },
    'dist-improvisador-habilidade-improvisada': {
      escala(n) {
        return { txt: `usa a habilidade de classe emprestada como personagem de nível ${n}`,
                 calc: `o total de poderes da distinção (${nTodos(n)})` };
      },
    },
    'dist-improvisador-poder-improvisado': {
      escala(n) {
        return { txt: `conta como nível ${n} em qualquer classe, para o poder emprestado`,
                 calc: `o total de poderes da distinção (${nTodos(n)})` };
      },
    },

    // ── Inquisidor de Wynna (Deuses de Arton, p. 107) ──────────────
    'dist-inquisidor-magia-sagrada': {
      escala(n) {
        const extra = outros(n);
        return { txt: `+1d8 por 2 PM, e até +${extra}d8 a mais por +${extra} PM` +
                      (extra ? '' : ' — ainda sem d8 adicional'),
                 calc: `1d8 de base + 1d8 por cada um dos ${nOutros(n)}` };
      },
    },

    // ── Mestre de Armearia (Deuses de Arton, p. 110) ───────────────
    'dist-armearia-prata-da-casa': {
      escala(n) {
        const b = 1 + p2(n);
        return { txt: `+${b} em ataque e dano com armas de fogo que você fabricou`, calc: calc2(n) };
      },
    },

    // ── Pacificador (Deuses de Arton, p. 117) ──────────────────────
    'dist-pacificador-dor-sem-morte': {
      escala(n) {
        return { txt: `CD do Fortitude +${n} (fraco, frustrado ou lento)`,
                 calc: `1 por poder da distinção (${nTodos(n)})` };
      },
    },
    'dist-pacificador-golpe-paralisante': {
      escala(n) {
        return { txt: `CD do Fortitude +${n} contra a paralisia`,
                 calc: `1 por poder da distinção (${nTodos(n)})` };
      },
    },
    'dist-pacificador-pacificacao': {
      escala(n) {
        return { txt: `até ${n}× por aventura (+${10 * n} PV e +${2 * n} PM, se usar todas)`,
                 calc: `o total de poderes da distinção (${nTodos(n)})` };
      },
    },

    // ── Pregador (Deuses de Arton, p. 120) ─────────────────────────
    'dist-pregador-vender-indulgencias': {
      escala(n) {
        return { txt: `até ${n} PM temporário${n !== 1 ? 's' : ''} por cena`,
                 calc: `o total de poderes da distinção (${nTodos(n)})` };
      },
    },

    // ── Sombra de Tenebra (Deuses de Arton, p. 123) ────────────────
    'dist-sombra-caminhar-nas-trevas': {
      escala(n) {
        const passos = p2(n);
        const acao = passos >= 2 ? 'livre' : passos === 1 ? 'de movimento' : 'padrão';
        return { txt: `lança Manto de Sombras com ação ${acao}`,
                 calc: `padrão de base, desce um passo a cada dois dos ${nOutros(n)} (${passos} passo${passos !== 1 ? 's' : ''})` };
      },
    },
    'dist-sombra-clone-sombrio': {
      escala(n) {
        const extras = p2(n);
        return { txt: `o clone causa ${n}d6 de frio · até ${1 + extras} clone${1 + extras !== 1 ? 's' : ''} (+3 PM cada extra)`,
                 calc: `1d6 por poder da distinção (${nTodos(n)}); +1 clone a cada dois dos ${nOutros(n)}` };
      },
    },
    'dist-sombra-miragem-de-sombras': {
      escala(n) {
        const tem = outros(n) >= 3;
        return { txt: tem ? 'com o aprimoramento +2PM da aura de camuflagem leve'
                          : `sem o aprimoramento ainda (faltam ${3 - outros(n)} outro${3 - outros(n) !== 1 ? 's' : ''} poder${3 - outros(n) !== 1 ? 'es' : ''})`,
                 calc: `o livro pede três outros poderes da distinção (você tem ${outros(n)})` };
      },
    },
    'dist-sombra-moldar-sombra': {
      escala(n) {
        const b = 1 + p2(n);
        return { txt: `ferramentas de sombra dão +${b} na perícia`, calc: calc2(n) };
      },
    },

    // ── Sortudo de Nimb (Deuses de Arton, p. 126) ──────────────────
    //  Aqui o dado DESCE: quanto menor, mais fácil tirar o 1 que acende
    //  a sorte da cena. Mesma escada de passos do dano (Tabela 3-2).
    'dist-sortudo-sorte-visitante': {
      escala(n) {
        const passos = p2(n);
        const D = (window.GA_FichaData && window.GA_FichaData.passoDeDano)
          ? window.GA_FichaData.passoDeDano('1d8', -passos).dado : '1d8';
        return { txt: `role ${D} no início da cena (o 1 acende a sorte)`,
                 calc: `1d8 de base, desce um passo a cada dois dos ${nOutros(n)} (${passos} passo${passos !== 1 ? 's' : ''})` };
      },
    },

    // ── Sumo-Sacerdote (Deuses de Arton, p. 129) ───────────────────
    'dist-sumo-bencao-do-patrono': {
      escala(n) {
        const q = 1 + outros(n);
        return { txt: `${q} poder${q !== 1 ? 'es' : ''} concedido${q !== 1 ? 's' : ''} a mais`,
                 calc: `1 de base + ${outros(n)} (um por cada um dos ${nOutros(n)})` };
      },
    },
    'dist-sumo-evolucao-espiritual': {
      escala(n) {
        return { txt: `+${5 * n} PV, +${2 * n} PM e +${n} na CD das suas magias divinas e poderes concedidos`,
                 calc: `5 PV, 2 PM e 1 de CD por poder da distinção (${nTodos(n)})` };
      },
    },
    'dist-sumo-presente-dos-deuses': {
      escala(n) {
        return { txt: `Magias como clérigo de nível ${2 * n}`,
                 calc: `o dobro dos poderes da distinção (${nTodos(n)})` };
      },
    },
    'dist-sumo-punicao-divina': {
      escala(n) {
        return { txt: `Vontade CD Sab +${n} para escapar da punição`,
                 calc: `1 por poder da distinção (${nTodos(n)})` };
      },
    },

    // ── Taumaturgista (Deuses de Arton, p. 132) ────────────────────
    //  A marca escala com "a cada DOIS poderes da distinção" — sem o
    //  "outros", então conta todos: ⌊n/2⌋ magias a mais, teto de 3
    //  (são só três magias na lista).
    'dist-taumaturgista-auxiliar-divino': {
      escala(n) {
        const q = Math.min(3, 1 + t2(n));
        return { txt: `${q} das três magias (Conjurar Monstro · Montaria Arcana · Servos Invisíveis)`,
                 calc: `1 de base + ${t2(n)} (uma a cada dois dos ${nTodos(n)}), até as 3 da lista` };
      },
    },
    'dist-taumaturgista-amigo-de-outro-mundo': {
      escala(n) {
        const subiu = p2(n);
        const nivel = subiu >= 2 ? 'mestre' : subiu === 1 ? 'veterano' : 'iniciante';
        return { txt: `o amigo de outro mundo é parceiro ${nivel}`,
                 calc: `iniciante de base, sobe um nível a cada dois dos ${nOutros(n)} (${subiu} nível${subiu !== 1 ? 'is' : ''})` };
      },
    },

    // ── Teurgista Hermético (Deuses de Arton, p. 135) ──────────────
    'dist-teurgista-teurgia-aplicada': {
      escala(n) {
        return { txt: `+${n} no nível das duas classes conjuradoras (até o seu nível de personagem)`,
                 calc: `o total de poderes da distinção (${nTodos(n)})` };
      },
    },

    // ── Tirano do Terceiro (Deuses de Arton, p. 141) ───────────────
    //  O quadro do companheiro dragão cresce por DEGRAUS, não por conta
    //  contínua: três poderes o fazem veterano, os cinco o fazem mestre
    //  (e aí ele vira dragão adulto).
    'dist-tirano-companheiro-dragao': {
      escala(n) {
        const nivel = n >= 5 ? 'mestre — e vira dragão adulto, Enorme, com Aura Aterradora'
                    : n >= 3 ? 'veterano' : 'iniciante';
        const falta = n >= 5 ? '' : ` (faltam ${(n >= 3 ? 5 : 3) - n} para ${n >= 3 ? 'mestre' : 'veterano'})`;
        return { txt: `companheiro dragão ${nivel}`,
                 calc: `iniciante até 2 poderes, veterano com 3, mestre com 5 — você tem ${nTodos(n)}${falta}` };
      },
    },
    'dist-tirano-dadivas-do-dragao': {
      escala(n) {
        const q = 1 + p2(n);
        return { txt: `${q} magia${q !== 1 ? 's' : ''} divina${q !== 1 ? 's' : ''} de 1º círculo`,
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
