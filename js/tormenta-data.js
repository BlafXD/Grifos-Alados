// ════════════════════════════════════════════════════════════════════
//  TORMENTA-DATA.JS  —  Poderes da Tormenta (para as fichas do Bestiário)
//  Localização: /grifos-alados/js/tormenta-data.js
//
//  Fonte: Tormenta20 (Poderes da Tormenta) + os poderes marcados como
//  "Suplemento" no arquivo de referência da campanha.
//  Consumido por monstros.js: bloco "🩸 Poderes da Tormenta" na ficha da
//  criatura, que soma sozinho o valor atual de cada poder.
//
//  COMO A SOMA FUNCIONA
//  Quase todo poder cresce com a QUANTIDADE de poderes da Tormenta que a
//  criatura tem. Nas descrições, "outros poderes" = todos menos aquele
//  sendo lido — por isso, com n poderes na ficha, outros = n − 1:
//    • "+1 a cada dois outros poderes"   → 1 + ⌊(n−1)/2⌋
//    • "+1 a cada quatro outros poderes" → 1 + ⌊(n−1)/4⌋
//    • "por poder da Tormenta que possui" → n (conta ele mesmo)
//  Cada poder abaixo traz escala(n) → { txt, calc } com o valor JÁ somado
//  (txt) e a conta que levou até ele (calc).
//
//  O QUE NÃO É AUTOMÁTICO: a perda de Carisma. O sistema só avisa e
//  mostra a conta — quem ajusta o Car na caixa "Atributos" é o mestre.
// ════════════════════════════════════════════════════════════════════
(function () {
  'use strict';

  // "para cada dois / quatro OUTROS poderes" — n inclui o próprio poder
  const p2 = n => Math.floor((n - 1) / 2);
  const p4 = n => Math.floor((n - 1) / 4);
  const outros = n => n - 1;
  // metros no padrão do livro: 1.5 → "1,5"
  const m = x => String(Math.round(x * 10) / 10).replace('.', ',');
  // "3 outros poderes" / "1 outro poder"
  const nOutros = n => `${outros(n)} outro${outros(n) !== 1 ? 's' : ''} poder${outros(n) !== 1 ? 'es' : ''}`;
  // conta padrão dos poderes "+1 a cada dois outros"
  const calc2 = n => `1 base + ${p2(n)} (um a cada dois dos ${nOutros(n)})`;
  const calc4 = n => `1 base + ${p4(n)} (um a cada quatro dos ${nOutros(n)})`;

  const PODERES = [
    // ── Tormenta20 ──────────────────────────────────────────────────
    {
      chave: 'anatomiaInsana', nome: 'Anatomia Insana', fonte: 'Tormenta20',
      desc: 'Você tem 25% de chance (resultado "1" em 1d4) de ignorar o dano adicional de um acerto crítico ou ataque furtivo. A chance aumenta em +25% para cada dois outros poderes da Tormenta que você possui.',
      escala(n) {
        const ch = Math.min(100, 25 + 25 * p2(n));
        const faces = ch / 25;                       // 25% = "1", 50% = "1–2"…
        const dado = ch >= 100 ? 'sempre ignora' : `${faces === 1 ? '1' : '1–' + faces} em 1d4`;
        return { txt: `${ch}% de ignorar o dano extra de crítico/furtivo (${dado})`,
                 calc: `25% base + ${25 * p2(n)}% (25% a cada dois dos ${nOutros(n)})` };
      },
    },
    {
      chave: 'antenas', nome: 'Antenas', fonte: 'Tormenta20',
      desc: 'Você recebe +1 em Iniciativa, Percepção e Vontade. Este bônus aumenta em +1 para cada dois outros poderes da Tormenta que você possui.',
      escala(n) {
        return { txt: `+${1 + p2(n)} em Iniciativa, Percepção e Vontade`, calc: calc2(n) };
      },
    },
    {
      chave: 'armamentoAberrante', nome: 'Armamento Aberrante', fonte: 'Tormenta20',
      preReq: 'outro poder da Tormenta', req: { outros: 1 },
      desc: 'Você pode gastar uma ação de movimento e 1 PM para produzir uma versão orgânica de qualquer arma corpo a corpo ou de arremesso com a qual seja proficiente — ela brota do seu braço, ombro ou costas como uma planta grotesca e então se desprende. O dano da arma aumenta em um passo para cada dois outros poderes da Tormenta que você possui. A arma dura pela cena, então se desfaz numa poça de gosma.',
      escala(n) {
        const passos = p2(n);
        return { txt: passos
                   ? `dano da arma +${passos} passo${passos !== 1 ? 's' : ''} (ação de movimento, 1 PM)`
                   : 'dano normal da arma — ainda sem passos extras (ação de movimento, 1 PM)',
                 calc: `${passos} passo${passos !== 1 ? 's' : ''} (um a cada dois dos ${nOutros(n)})` };
      },
    },
    {
      chave: 'articulacoesFlexiveis', nome: 'Articulações Flexíveis', fonte: 'Tormenta20',
      desc: 'Você recebe +1 em Acrobacia, Furtividade e Reflexos. Este bônus aumenta em +1 para cada dois outros poderes da Tormenta que você possui.',
      escala(n) {
        return { txt: `+${1 + p2(n)} em Acrobacia, Furtividade e Reflexos`, calc: calc2(n) };
      },
    },
    {
      chave: 'asasInsetoides', nome: 'Asas Insetoides', fonte: 'Tormenta20',
      preReq: 'quatro outros poderes da Tormenta', req: { outros: 4 },
      desc: 'Você pode gastar 1 PM para receber deslocamento de voo 9m até o fim do seu turno. O deslocamento aumenta em +1,5m para cada outro poder da Tormenta que você possui.',
      escala(n) {
        const voo = 9 + 1.5 * outros(n);
        return { txt: `voo ${m(voo)}m até o fim do turno (1 PM)`,
                 calc: `9m base + ${m(1.5 * outros(n))}m (1,5m por cada um dos ${nOutros(n)})` };
      },
    },
    {
      chave: 'carapaca', nome: 'Carapaça', fonte: 'Tormenta20',
      desc: 'Sua pele é recoberta por placas quitinosas. Você recebe +1 na Defesa. Este bônus aumenta em +1 para cada dois outros poderes da Tormenta que você possui.',
      escala(n) {
        return { txt: `+${1 + p2(n)} na Defesa`, calc: calc2(n) };
      },
    },
    {
      chave: 'corpoAberrante', nome: 'Corpo Aberrante', fonte: 'Tormenta20',
      preReq: 'outro poder da Tormenta', req: { outros: 1 },
      desc: 'Crostas vermelhas em várias partes de seu corpo tornam seus ataques mais perigosos. Seu dano desarmado aumenta em um passo, mais um passo para cada quatro outros poderes da Tormenta que você possui.',
      escala(n) {
        const passos = 1 + p4(n);
        return { txt: `dano desarmado +${passos} passo${passos !== 1 ? 's' : ''}`, calc: calc4(n) };
      },
    },
    {
      chave: 'cuspirEnxame', nome: 'Cuspir Enxame', fonte: 'Tormenta20',
      desc: 'Você pode gastar uma ação completa e 2 PM para criar um enxame de insetos rubros em um ponto a sua escolha em alcance curto e com duração sustentada. O enxame tem tamanho Médio e pode passar pelo espaço de outras criaturas. Uma vez por rodada, você pode gastar uma ação de movimento para mover o enxame 9m. No final do seu turno, o enxame causa 2d6 pontos de dano de ácido a qualquer criatura no espaço que ele estiver ocupando. Para cada dois outros poderes da Tormenta que possui, você pode gastar +1 PM quando usa este poder para aumentar o dano do enxame em +1d6.',
      escala(n) {
        const extra = p2(n);
        return { txt: extra
                   ? `2d6 de ácido por turno · até +${extra} PM para +${extra}d6 (máximo ${2 + extra}d6)`
                   : '2d6 de ácido por turno — ainda sem PM extra para aumentar',
                 calc: `2d6 base + até ${extra}d6 (1d6 por PM, um PM a cada dois dos ${nOutros(n)})` };
      },
    },
    {
      chave: 'dentesAfiados', nome: 'Dentes Afiados', fonte: 'Tormenta20',
      desc: 'Você recebe uma arma natural de mordida (dano 1d4, crítico x2, corte). Uma vez por rodada, quando usa a ação agredir para atacar com outra arma, pode gastar 1 PM para fazer um ataque corpo a corpo extra com a mordida.',
      escala() {
        return { txt: 'mordida 1d4, crítico x2, corte · 1 ataque extra por rodada (1 PM)', fixo: true };
      },
    },
    {
      chave: 'desprezarARealidade', nome: 'Desprezar a Realidade', fonte: 'Tormenta20',
      preReq: 'quatro outros poderes da Tormenta', req: { outros: 4 },
      desc: 'Você pode gastar 2 PM para ficar no limiar da realidade até o início de seu próximo turno. Nesse estado, você ignora terreno difícil e causa 20% de chance de falha em efeitos usados contra você (não apenas ataques). Para cada dois outros poderes de Tormenta que você possuir, essa chance aumenta em 5% (máximo de 50%).',
      escala(n) {
        const ch = Math.min(50, 20 + 5 * p2(n));
        return { txt: `ignora terreno difícil · ${ch}% de falha em efeitos contra você (2 PM)`,
                 calc: `20% base + ${5 * p2(n)}% (5% a cada dois dos ${nOutros(n)})${ch === 50 ? ' — no teto de 50%' : ' · máximo 50%'}` };
      },
    },
    {
      chave: 'empunhaduraRubra', nome: 'Empunhadura Rubra', fonte: 'Tormenta20',
      desc: 'Você pode gastar 1 PM para cobrir suas mãos com uma carapaça rubra. Até o final da cena, você recebe +1 em Luta. Este bônus aumenta em +1 para cada dois outros poderes da Tormenta que você possui.',
      escala(n) {
        return { txt: `+${1 + p2(n)} em Luta até o fim da cena (1 PM)`, calc: calc2(n) };
      },
    },
    {
      chave: 'fomeDeMana', nome: 'Fome de Mana', fonte: 'Tormenta20',
      desc: 'Quando passa em um teste de resistência para resistir a uma habilidade mágica, você recebe 1 PM temporário cumulativo. Você pode ganhar um máximo de PM temporários por cena desta forma igual ao número de poderes da Tormenta que possui.',
      escala(n) {
        return { txt: `até ${n} PM temporário${n !== 1 ? 's' : ''} por cena`,
                 calc: `igual ao total de poderes da Tormenta da ficha (${n})` };
      },
    },
    {
      chave: 'larvaExplosiva', nome: 'Larva Explosiva', fonte: 'Tormenta20',
      preReq: 'Dentes Afiados', req: { poderes: ['dentesAfiados'] },
      desc: 'Se uma criatura que tenha sofrido dano de sua mordida nesta cena for reduzida a 0 ou menos PV, ela explode em chuva cáustica, morrendo e causando 4d4 pontos de dano de ácido em criaturas adjacentes. Para cada dois outros poderes da Tormenta que você possui, o dano aumenta em +2d4. Você é imune a esse dano.',
      escala(n) {
        const d = 4 + 2 * p2(n);
        return { txt: `${d}d4 de ácido em criaturas adjacentes (você é imune)`,
                 calc: `4d4 base + ${2 * p2(n)}d4 (2d4 a cada dois dos ${nOutros(n)})` };
      },
    },
    {
      chave: 'legiaoAberrante', nome: 'Legião Aberrante', fonte: 'Tormenta20',
      preReq: 'Anatomia Insana e três outros poderes da Tormenta',
      req: { poderes: ['anatomiaInsana'], outros: 3 },
      desc: 'Seu corpo se transforma em uma massa de insetos rubros. Você pode atravessar qualquer espaço por onde seja possível passar uma moeda (mas considera esses espaços como terreno difícil) e recebe +1 em testes contra manobras de combate e de resistência contra efeitos que tenham você como alvo (mas não efeitos de área). Este bônus aumenta em +1 para cada dois outros poderes da Tormenta que você possui.',
      escala(n) {
        return { txt: `+${1 + p2(n)} contra manobras de combate e em resistência contra efeitos que tenham você como alvo`,
                 calc: calc2(n) };
      },
    },
    {
      chave: 'maosMembranosas', nome: 'Mãos Membranosas', fonte: 'Tormenta20',
      desc: 'Você recebe +1 em Atletismo, Fortitude e testes de agarrar. Este bônus aumenta em +1 para cada dois outros poderes da Tormenta que você possui.',
      escala(n) {
        return { txt: `+${1 + p2(n)} em Atletismo, Fortitude e testes de agarrar`, calc: calc2(n) };
      },
    },
    {
      chave: 'membrosEstendidos', nome: 'Membros Estendidos', fonte: 'Tormenta20',
      desc: 'Seus braços e armas naturais são grotescamente mais longos que o normal, o que aumenta seu alcance natural para ataques corpo a corpo em +1,5m. Para cada quatro outros poderes da Tormenta que você possui, esse alcance aumenta em +1,5m.',
      escala(n) {
        const passos = 1 + p4(n);
        return { txt: `alcance corpo a corpo +${m(1.5 * passos)}m`,
                 calc: `1,5m base + ${m(1.5 * p4(n))}m (1,5m a cada quatro dos ${nOutros(n)})` };
      },
    },
    {
      chave: 'membrosExtras', nome: 'Membros Extras', fonte: 'Tormenta20',
      preReq: 'quatro outros poderes da Tormenta', req: { outros: 4 },
      desc: 'Você possui duas armas naturais de patas insetoides que saem de suas costas, ombros ou flancos. Uma vez por rodada, quando usa a ação agredir para atacar com outra arma, pode gastar 2 PM para fazer um ataque corpo a corpo extra com cada uma (dano 1d4, crítico x2, corte). Se possuir Ambidestria ou Estilo de Duas Armas, pode empunhar armas leves em suas patas insetoides (mas ainda precisa pagar 2 PM para atacar com elas e sofre a penalidade de –2 em todos os ataques).',
      escala() {
        return { txt: '2 patas insetoides 1d4, crítico x2, corte · 1 ataque extra com cada por rodada (2 PM)', fixo: true };
      },
    },
    {
      chave: 'menteAberrante', nome: 'Mente Aberrante', fonte: 'Tormenta20',
      desc: 'Você recebe resistência a efeitos mentais +1. Além disso, sempre que precisa fazer um teste de Vontade para resistir a uma habilidade, a criatura que usou essa habilidade sofre 1d6 pontos de dano psíquico. Para cada dois outros poderes da Tormenta que você possui o bônus em testes de resistência aumenta em +1 e o dano aumenta em +1d6.',
      escala(n) {
        const b = 1 + p2(n);
        return { txt: `resistência a efeitos mentais +${b} · ${b}d6 de dano psíquico em quem exigir o teste de Vontade`,
                 calc: calc2(n) };
      },
    },
    {
      chave: 'olhosVermelhos', nome: 'Olhos Vermelhos', fonte: 'Tormenta20',
      desc: 'Você recebe visão no escuro e +1 em Intimidação. Este bônus aumenta em +1 para cada dois outros poderes da Tormenta que você possui.',
      escala(n) {
        return { txt: `visão no escuro · +${1 + p2(n)} em Intimidação`, calc: calc2(n) };
      },
    },
    {
      chave: 'peleCorrompida', nome: 'Pele Corrompida', fonte: 'Tormenta20',
      desc: 'Sua carne foi mesclada à matéria vermelha. Você recebe redução de ácido, eletricidade, fogo, frio, luz e trevas 2. Esta RD aumenta em +2 para cada dois outros poderes da Tormenta que você possui.',
      escala(n) {
        const rd = 2 + 2 * p2(n);
        return { txt: `redução de ácido, eletricidade, fogo, frio, luz e trevas ${rd}`,
                 calc: `2 base + ${2 * p2(n)} (2 a cada dois dos ${nOutros(n)})` };
      },
    },
    {
      chave: 'sangueAcido', nome: 'Sangue Ácido', fonte: 'Tormenta20',
      desc: 'Quando você sofre dano por um ataque corpo a corpo, o atacante sofre 1 ponto de dano de ácido por poder da Tormenta que você possui.',
      escala(n) {
        return { txt: `${n} ponto${n !== 1 ? 's' : ''} de dano de ácido em quem te acertar corpo a corpo`,
                 calc: `1 por poder da Tormenta da ficha (${n})` };
      },
    },
    {
      chave: 'viscoRubro', nome: 'Visco Rubro', fonte: 'Tormenta20',
      desc: 'Você pode gastar 1 PM para expelir um líquido grosso e corrosivo. Até o final da cena, você recebe +1 nas rolagens de dano corpo a corpo. Este bônus aumenta em +1 para cada dois outros poderes da Tormenta que você possui.',
      escala(n) {
        return { txt: `+${1 + p2(n)} nas rolagens de dano corpo a corpo até o fim da cena (1 PM)`, calc: calc2(n) };
      },
    },

    // ── Suplemento ──────────────────────────────────────────────────
    {
      chave: 'bolsoesInsanos', nome: 'Bolsões Insanos', fonte: 'Suplemento',
      desc: 'Seu corpo possui espaços vazios sob sua pele ou carapaça, possibilitando que você carregue mais itens, em lugares nos quais eles dificilmente serão achados. Seu limite de carga aumenta em 2 espaços, mais 1 espaço para cada outro poder da Tormenta que você possui, e você recebe +5 em testes de Ladinagem para ocultar itens nesses espaços.',
      escala(n) {
        const esp = 2 + outros(n);
        return { txt: `limite de carga +${esp} espaços · +5 em Ladinagem para ocultar itens neles`,
                 calc: `2 base + ${outros(n)} (1 por cada um dos ${nOutros(n)})` };
      },
    },
    {
      chave: 'carapacaCorrompida', nome: 'Carapaça Corrompida', fonte: 'Suplemento',
      preReq: 'Carapaça', req: { poderes: ['carapaca'] },
      desc: 'As placas quitinosas que recobrem seu corpo são especialmente grossas, formadas por matéria vermelha que parece repelir os elementos físicos de Arton. Você recebe redução de dano 1. Essa RD aumenta em +1 para cada dois outros poderes da Tormenta que você possui.',
      escala(n) {
        return { txt: `redução de dano ${1 + p2(n)}`, calc: calc2(n) };
      },
    },
    {
      chave: 'repulsivo', nome: 'Repulsivo', fonte: 'Suplemento',
      preReq: 'Car –1 ou menor (confira na caixa Atributos — o sistema não checa)',
      desc: 'A presença da Tempestade Rubra em você é tão forte que é difícil olhar em sua direção. O primeiro ataque de cada inimigo contra você em cada cena sofre uma penalidade igual ao total de poderes da Tormenta que você possui (incluindo este). Após o primeiro ataque, os inimigos já se acostumaram com sua aparência atroz e não sofrem mais essa penalidade.',
      escala(n) {
        return { txt: `–${n} no primeiro ataque de cada inimigo contra você em cada cena`,
                 calc: `igual ao total de poderes da Tormenta da ficha, incluindo este (${n})` };
      },
    },
    {
      chave: 'secrecaoCicatrizante', nome: 'Secreção Cicatrizante', fonte: 'Suplemento',
      desc: 'Você pode gastar uma ação padrão e 2 PM para secretar um fluido rubro e viscoso sobre você mesmo ou uma criatura adjacente. O alvo recupera 2d6+2 PV mas fica enjoado por 1 rodada (Fort CD Con evita). Para cada dois outros poderes da Tormenta que você possui, a cura aumenta em +1d6+1 e a CD aumenta em +1.',
      escala(n) {
        const k = p2(n);
        return { txt: `cura ${2 + k}d6+${2 + k} PV · enjoado 1 rodada (Fort CD Con${k ? ' +' + k : ''} evita) — ação padrão, 2 PM`,
                 calc: `2d6+2 base + ${k}d6+${k} e CD +${k} (um passo a cada dois dos ${nOutros(n)})` };
      },
    },
    {
      chave: 'simetriaRadial', nome: 'Simetria Radial', fonte: 'Suplemento',
      preReq: 'quatro outros poderes da Tormenta', req: { outros: 4 },
      desc: 'Aos poucos, seu físico se rearranjou, abandonando a anatomia artoniana quase que por completo. Seus olhos ficam em lados opostos da cabeça e sua boca fica no topo. Seu tórax adquiriu forma tubular e seus braços e pernas são distribuídos em seu corpo de forma que você não tem mais dois "lados". Você não pode ser flanqueado ou ficar caído e recebe um bônus de +5 para evitar ser agarrado.',
      escala() {
        return { txt: 'não pode ser flanqueado nem ficar caído · +5 para evitar ser agarrado', fixo: true };
      },
    },
    {
      chave: 'tempoMistico', nome: 'Tempo Místico', fonte: 'Suplemento',
      preReq: 'dois outros poderes da Tormenta', req: { outros: 2 },
      desc: 'Você é capaz de acessar uma pequena parte do controle dos lefeu sobre o tempo. Uma vez por rodada, quando você lança uma magia com execução de movimento, padrão ou completa, pode gastar 2 PM e perder 1d6, 1d8 ou 1d12 PV para diminuir o tempo de execução da magia em um, dois ou três passos, respectivamente (até um mínimo de ação livre). Essa perda de vida só pode ser curada com descanso.',
      escala() {
        return { txt: '–1/–2/–3 passos de execução por 2 PM e 1d6/1d8/1d12 PV (só cura com descanso)', fixo: true };
      },
    },
  ];

  const porChave = {};
  PODERES.forEach(p => { porChave[p.chave] = p; });

  window.GA_TORMENTA = {
    PODERES: PODERES,
    porChave: porChave,

    // Texto de abertura da seção no livro.
    regra: 'Estes poderes oferecem habilidades ligadas à tempestade rubra. Quando escolhe um poder ' +
           'da Tormenta, você perde 1 de Carisma. Para cada dois outros poderes da Tormenta, você perde ' +
           'mais 1 de Carisma. Essa perda representa deformidades físicas e o desaparecimento gradual de ' +
           'sua própria identidade. Um personagem reduzido a menos que Car –5 torna-se um NPC sob ' +
           'controle do mestre.',

    // Carisma perdido com n poderes: 1 pelo primeiro + 1 a cada dois outros.
    // NÃO é aplicado em lugar nenhum — só mostrado como aviso ao mestre.
    carismaPerdido(n) { return n > 0 ? 1 + p2(n) : 0; },

    // Pré-requisitos que dá para conferir sozinho (quantidade de outros
    // poderes e poderes nomeados). "Car –1 ou menor" fica de fora: o
    // Carisma mora numa caixa de texto livre da ficha.
    // Devolve [] quando está tudo certo, ou a lista do que falta.
    faltando(chave, escolhidos) {
      const p = porChave[chave];
      if (!p || !p.req) return [];
      const lista = Array.isArray(escolhidos) ? escolhidos : [];
      const falta = [];
      if (p.req.outros && (lista.length - 1) < p.req.outros) {
        falta.push(`${p.req.outros} outros poderes da Tormenta`);
      }
      (p.req.poderes || []).forEach(ch => {
        if (lista.indexOf(ch) < 0) falta.push((porChave[ch] || {}).nome || ch);
      });
      return falta;
    },
  };
})();
