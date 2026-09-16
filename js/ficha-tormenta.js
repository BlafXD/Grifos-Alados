// ════════════════════════════════════════════════════════════════════
//  FICHA-TORMENTA.JS — a conta dos poderes da Tormenta NA FICHA
//  Localização: /grifos-alados/js/ficha-tormenta.js
//
//  POR QUE ISTO É UMA CÓPIA. O mesmo cálculo existe em js/tormenta-data.js,
//  que o bloco 🩸 das criaturas usa. A regra do projeto (08/09/2026) é
//  "dado de regra se duplica, ferramenta se compartilha", e em 15/09/2026
//  ele confirmou: duplicar. Assim, mexer na ficha do jogador nunca quebra
//  o Bestiário, e vice-versa. O TEXTO de cada poder não se repete aqui —
//  vem de window.GA_PODERES (js/poderes-data.js); daqui sai só a conta.
//
//  COMO A SOMA FUNCIONA (Tormenta20, p. 136)
//  Quase todo poder cresce com a QUANTIDADE de poderes da Tormenta. Nas
//  descrições, "outros poderes" = todos menos aquele sendo lido — então,
//  com n poderes, outros = n − 1:
//    • "+1 a cada dois outros poderes"   → 1 + ⌊(n−1)/2⌋
//    • "+1 a cada quatro outros poderes" → 1 + ⌊(n−1)/4⌋
//    • "por poder da Tormenta que possui" → n (conta ele mesmo)
//
//  DOIS CONTADORES, e é de propósito (pedido dele em 15/09/2026):
//    • n da ESCALA  — poderes da Tormenta da ficha + os que "contam como"
//      um poder da Tormenta sem ser (a Deformidade do lefou, JdA p. 24;
//      Heróis de Arton p. 67). Esses fazem os outros poderes crescerem.
//    • n do CARISMA — só os poderes da Tormenta de verdade. O livro é
//      explícito: os que "contam como" NÃO contam para a perda de Carisma.
//  A ficha só MOSTRA a perda de Carisma; quem muda o valor na caixa de
//  atributos é o jogador, como no Bestiário.
// ════════════════════════════════════════════════════════════════════
(function () {
  'use strict';

  // "para cada dois / quatro OUTROS poderes" — n inclui o próprio poder
  const p2 = n => Math.floor((n - 1) / 2);
  const p4 = n => Math.floor((n - 1) / 4);
  const outros = n => n - 1;
  // metros no padrão do livro: 1.5 → "1,5"
  const m = x => String(Math.round(x * 10) / 10).replace('.', ',');
  const nOutros = n => `${outros(n)} outro${outros(n) !== 1 ? 's' : ''} poder${outros(n) !== 1 ? 'es' : ''}`;
  const calc2 = n => `1 base + ${p2(n)} (um a cada dois dos ${nOutros(n)})`;
  const calc4 = n => `1 base + ${p4(n)} (um a cada quatro dos ${nOutros(n)})`;

  // chave = id do poder em window.GA_PODERES
  const ESCALAS = {
    'anatomia-insana': {
      escala(n) {
        const ch = Math.min(100, 25 + 25 * p2(n));
        const faces = ch / 25;
        const dado = ch >= 100 ? 'sempre ignora' : `${faces === 1 ? '1' : '1–' + faces} em 1d4`;
        return { txt: `${ch}% de ignorar o dano extra de crítico/furtivo (${dado})`,
                 calc: `25% base + ${25 * p2(n)}% (25% a cada dois dos ${nOutros(n)})` };
      },
    },
    'antenas': {
      escala(n) { return { txt: `+${1 + p2(n)} em Iniciativa, Percepção e Vontade`, calc: calc2(n) }; },
    },
    'armamento-aberrante': {
      req: { outros: 1 },
      escala(n) {
        const passos = p2(n);
        return { txt: passos
                   ? `dano da arma +${passos} passo${passos !== 1 ? 's' : ''} (ação de movimento, 1 PM)`
                   : 'dano normal da arma — ainda sem passos extras (ação de movimento, 1 PM)',
                 calc: `${passos} passo${passos !== 1 ? 's' : ''} (um a cada dois dos ${nOutros(n)})` };
      },
    },
    'articulacoes-flexiveis': {
      escala(n) { return { txt: `+${1 + p2(n)} em Acrobacia, Furtividade e Reflexos`, calc: calc2(n) }; },
    },
    'asas-insetoides': {
      req: { outros: 4 },
      escala(n) {
        const voo = 9 + 1.5 * outros(n);
        return { txt: `voo ${m(voo)}m até o fim do turno (1 PM)`,
                 calc: `9m base + ${m(1.5 * outros(n))}m (1,5m por cada um dos ${nOutros(n)})` };
      },
    },
    'carapaca': {
      escala(n) { return { txt: `+${1 + p2(n)} na Defesa`, calc: calc2(n) }; },
    },
    'corpo-aberrante': {
      req: { outros: 1 },
      escala(n) {
        const passos = 1 + p4(n);
        return { txt: `dano desarmado +${passos} passo${passos !== 1 ? 's' : ''}`, calc: calc4(n) };
      },
    },
    'cuspir-enxame': {
      escala(n) {
        const extra = p2(n);
        return { txt: extra
                   ? `2d6 de ácido por turno · até +${extra} PM para +${extra}d6 (máximo ${2 + extra}d6)`
                   : '2d6 de ácido por turno — ainda sem PM extra para aumentar',
                 calc: `2d6 base + até ${extra}d6 (1d6 por PM, um PM a cada dois dos ${nOutros(n)})` };
      },
    },
    'dentes-afiados': {
      escala() { return { txt: 'mordida 1d4, crítico x2, corte · 1 ataque extra por rodada (1 PM)', fixo: true }; },
    },
    'desprezar-a-realidade': {
      req: { outros: 4 },
      escala(n) {
        const ch = Math.min(50, 20 + 5 * p2(n));
        return { txt: `ignora terreno difícil · ${ch}% de falha em efeitos contra você (2 PM)`,
                 calc: `20% base + ${5 * p2(n)}% (5% a cada dois dos ${nOutros(n)})${ch === 50 ? ' — no teto de 50%' : ' · máximo 50%'}` };
      },
    },
    'empunhadura-rubra': {
      escala(n) { return { txt: `+${1 + p2(n)} em Luta até o fim da cena (1 PM)`, calc: calc2(n) }; },
    },
    'fome-de-mana': {
      escala(n) {
        return { txt: `até ${n} PM temporário${n !== 1 ? 's' : ''} por cena`,
                 calc: `igual ao total de poderes da Tormenta da ficha (${n})` };
      },
    },
    'larva-explosiva': {
      req: { poderes: ['dentes-afiados'] },
      escala(n) {
        const d = 4 + 2 * p2(n);
        return { txt: `${d}d4 de ácido em criaturas adjacentes (você é imune)`,
                 calc: `4d4 base + ${2 * p2(n)}d4 (2d4 a cada dois dos ${nOutros(n)})` };
      },
    },
    'legiao-aberrante': {
      req: { poderes: ['anatomia-insana'], outros: 3 },
      escala(n) {
        return { txt: `+${1 + p2(n)} contra manobras de combate e em resistência contra efeitos que tenham você como alvo`,
                 calc: calc2(n) };
      },
    },
    'maos-membranosas': {
      escala(n) { return { txt: `+${1 + p2(n)} em Atletismo, Fortitude e testes de agarrar`, calc: calc2(n) }; },
    },
    'membros-estendidos': {
      escala(n) {
        const passos = 1 + p4(n);
        return { txt: `alcance corpo a corpo +${m(1.5 * passos)}m`,
                 calc: `1,5m base + ${m(1.5 * p4(n))}m (1,5m a cada quatro dos ${nOutros(n)})` };
      },
    },
    'membros-extras': {
      req: { outros: 4 },
      escala() {
        return { txt: '2 patas insetoides 1d4, crítico x2, corte · 1 ataque extra com cada por rodada (2 PM)', fixo: true };
      },
    },
    'mente-aberrante': {
      escala(n) {
        const b = 1 + p2(n);
        return { txt: `resistência a efeitos mentais +${b} · ${b}d6 de dano psíquico em quem exigir o teste de Vontade`,
                 calc: calc2(n) };
      },
    },
    'olhos-vermelhos': {
      escala(n) { return { txt: `visão no escuro · +${1 + p2(n)} em Intimidação`, calc: calc2(n) }; },
    },
    'pele-corrompida': {
      escala(n) {
        const rd = 2 + 2 * p2(n);
        return { txt: `redução de ácido, eletricidade, fogo, frio, luz e trevas ${rd}`,
                 calc: `2 base + ${2 * p2(n)} (2 a cada dois dos ${nOutros(n)})` };
      },
    },
    'sangue-acido': {
      escala(n) {
        return { txt: `${n} ponto${n !== 1 ? 's' : ''} de dano de ácido em quem te acertar corpo a corpo`,
                 calc: `1 por poder da Tormenta da ficha (${n})` };
      },
    },
    'visco-rubro': {
      escala(n) {
        return { txt: `+${1 + p2(n)} nas rolagens de dano corpo a corpo até o fim da cena (1 PM)`, calc: calc2(n) };
      },
    },

    // ── Heróis de Arton ─────────────────────────────────────────────
    'bolsoes-insanos': {
      escala(n) {
        const esp = 2 + outros(n);
        return { txt: `limite de carga +${esp} espaços · +5 em Ladinagem para ocultar itens neles`,
                 calc: `2 base + ${outros(n)} (1 por cada um dos ${nOutros(n)})` };
      },
    },
    'carapaca-corrompida': {
      req: { poderes: ['carapaca'] },
      escala(n) { return { txt: `redução de dano ${1 + p2(n)}`, calc: calc2(n) }; },
    },
    'repulsivo': {
      escala(n) {
        return { txt: `–${n} no primeiro ataque de cada inimigo contra você em cada cena`,
                 calc: `igual ao total de poderes da Tormenta da ficha, incluindo este (${n})` };
      },
    },
    'secrecao-cicatrizante': {
      escala(n) {
        const k = p2(n);
        return { txt: `cura ${2 + k}d6+${2 + k} PV · enjoado 1 rodada (Fort CD Con${k ? ' +' + k : ''} evita) — ação padrão, 2 PM`,
                 calc: `2d6+2 base + ${k}d6+${k} e CD +${k} (um passo a cada dois dos ${nOutros(n)})` };
      },
    },
    'simetria-radial': {
      req: { outros: 4 },
      escala() { return { txt: 'não pode ser flanqueado nem ficar caído · +5 para evitar ser agarrado', fixo: true }; },
    },
    'tempo-mistico': {
      req: { outros: 2 },
      escala() {
        return { txt: '–1/–2/–3 passos de execução por 2 PM e 1d6/1d8/1d12 PV (só cura com descanso)', fixo: true };
      },
    },
  };

  window.GA_FICHA_TORMENTA = {
    // Texto de abertura da seção no livro (Tormenta20, p. 136).
    regra: 'Quando escolhe um poder da Tormenta, você perde 1 de Carisma. Para cada dois outros ' +
           'poderes da Tormenta, você perde mais 1 de Carisma. Essa perda representa deformidades ' +
           'físicas e o desaparecimento gradual de sua própria identidade. Um personagem reduzido a ' +
           'menos que Car –5 torna-se um NPC sob controle do mestre.',

    // O valor de agora, com n poderes contando (os da ficha + os que "contam como").
    // Devolve null para poder sem conta (os concedidos, de combate…).
    escala(id, n) {
      const e = ESCALAS[id];
      if (!e || !n) return null;
      try { return e.escala(n); } catch (erro) { return null; }
    },
    temConta(id) { return !!ESCALAS[id]; },

    // Carisma perdido com n poderes DA TORMENTA (os que "contam como" ficam de fora):
    // 1 pelo primeiro + 1 a cada dois outros. Só aviso — não mexe no atributo.
    carismaPerdido(n) { return n > 0 ? 1 + p2(n) : 0; },

    // Pré-requisitos que dá para conferir sozinho: quantidade de outros poderes
    // e poderes nomeados. "Car –1 ou menor" (Repulsivo) fica de fora — o Carisma
    // é do jogador. Devolve [] quando está tudo certo, ou o que falta.
    faltando(id, ids) {
      const e = ESCALAS[id];
      if (!e || !e.req) return [];
      const tem = Array.isArray(ids) ? ids : [];
      const falta = [];
      if (e.req.outros && (tem.length - 1) < e.req.outros) {
        falta.push(`${e.req.outros} outros poderes da Tormenta`);
      }
      (e.req.poderes || []).forEach(outro => {
        if (tem.indexOf(outro) < 0) {
          const p = (window.GA_PODERES || []).find(x => x.id === outro);
          falta.push((p && p.nome) || outro);
        }
      });
      return falta;
    },
  };
})();
