// ═══════════════════════════════════════════════════════════════════
//  STATBLOCK.JS — desenho de uma ficha de criatura em texto do livro
//  Localização: /grifos-alados/js/statblock.js
//
//  As bibliotecas de fichas prontas (js/npcs-data.js, js/fichas-t20-data.js
//  e os livros que vierem) guardam o statblock como TEXTO, no formato do
//  livro: primeira linha "Nome ND X", depois a descrição, a linha de tipo
//  e uma seção por linha. Este módulo transforma esse texto no HTML de
//  leitura — negritando rótulos e nomes de habilidade e pendurando as
//  nuvens de descrição do ItensDescricoes nos termos de regra.
//
//  Consumidores: js/npcs.js e js/fichas-prontas.js (mestre e jogadores).
//  Quem transforma o MESMO texto em criatura editável do bestiário é o
//  parsearFicha() do monstros.js — este aqui é só a vitrine.
// ═══════════════════════════════════════════════════════════════════
window.GA_Statblock = (function () {
  'use strict';

  const esc = window.GA_esc;

  // rótulos padrão do statblock — abrem a linha e viram negrito
  const RE_ROTULO = /^(Iniciativa|Defesa|Pontos de Vida|Pontos de Mana|Deslocamento|Corpo a Corpo|À Distância|Perícias|Equipamento|Magias|Tesouro|Parceiro)\b/;
  // linha de atributos (For, Des, Con, Int, Sab, Car)
  const RE_ATRIBUTOS = /^For\s+[+\-–−]?(?:\d|[—–−-])/;
  // "Nome da Habilidade (Ação[, X PM])" — negrita o nome com a execução
  const RE_HABILIDADE = /^([A-ZÀ-Ý"“…][^.•]{0,64}?\((?:Livre|Padrão|padrão|Reação|Movimento|Completa|Reativa|1 hora)[^)]*\))/;
  // linha de tipo e tamanho ("Humanoide (humano) Médio", "Animal Grande"…)
  const RE_TIPO = /^(Humanoide|Animal|Animais|Construto|Esp[íi]rito|Morto[- ]?vivo|Monstro)\b/i;
  // habilidade sem execução entre parênteses: o nome é uma sequência de
  // palavras capitalizadas ("Sensibilidade a Luz", "Voz da Natureza") antes
  // da frase de descrição, que começa em artigo/pronome.
  const RE_HAB_SIMPLES = /^((?:[A-ZÀ-Ý][^\s]*)(?:\s+(?:d[aeoi]s?|[ao]s?|à|ao|aos|e|com|em|por|para)\s+[A-ZÀ-Ý][^\s]*|\s+[A-ZÀ-Ý][^\s]*){0,3})\s+(?=(?:O|A|Os|As|Um|Uma|Quando|Se|No|Na|Este|Esta|Sempre|Enquanto|Ao|Todo|Toda|Todos|Todas|Criaturas|Duas|Dois|Cada|Ele|Ela|Perde|Uma vez)\b)/;

  // texto → HTML escapado; marca termos de regra com tooltip se possível
  function marcar(txt) {
    return window.ItensDescricoes ? window.ItensDescricoes.marcar(txt) : esc(txt);
  }

  // ── SELO DE HABILIDADE MÁGICA ────────────────────────────────────
  // No livro é um ícone ao lado do nome da habilidade; nas bibliotecas
  // ele vive como um "✦" no começo da linha. Importa em jogo: só uma
  // habilidade MÁGICA pode ser alvo de Dissipar Magia (e de contramágica,
  // dissipar como reação) e é ela que cai dentro de uma área de anulação.
  const MARCA_MAGICA = '✦';
  const DICA_MAGICA = 'Habilidade mágica — pode ser alvo de Dissipar Magia (inclusive como contramágica) e é anulada onde a magia não funciona.';
  const seloMagico = '<span class="sb-magica" title="' + DICA_MAGICA + '" aria-label="habilidade mágica">' +
                     MARCA_MAGICA + '<span class="sb-magica-rot">mágica</span></span> ';

  // Uma linha do statblock → HTML formatado
  function linha(l) {
    l = String(l || '').trim();
    if (!l) return '';

    // habilidade mágica: tira o ✦ do texto e devolve como selo
    if (l.indexOf(MARCA_MAGICA) === 0) {
      const resto = linha(l.slice(MARCA_MAGICA.length).trim());
      return resto.replace(/^(<div class="[^"]*)"/, '$1 npc-linha--magica"')
                  .replace(/^(<div[^>]*>)/, '$1' + seloMagico);
    }

    // marcador de magia / engenhoca
    if (l.startsWith('•')) {
      let h = marcar(l.replace(/^•\s*/, ''));
      h = h.replace(/^([^(<]{2,48}?\([^)]*\))/, '<strong>$1</strong>');   // "Magia (Ação, X PM)"
      return '<div class="npc-linha npc-linha--magia">• ' + h + '</div>';
    }
    // item numerado dentro de uma habilidade ("1) Canhão elétrico. …")
    if (/^\d\)\s/.test(l)) {
      return '<div class="npc-linha npc-linha--magia">' + marcar(l) + '</div>';
    }
    if (RE_TIPO.test(l))      return '<div class="npc-linha npc-linha--tipo">' + esc(l) + '</div>';
    if (RE_ATRIBUTOS.test(l)) return '<div class="npc-linha npc-linha--atrib">' + esc(l) + '</div>';

    let html = marcar(l);
    const mRot = l.match(RE_ROTULO);
    if (mRot && html.indexOf(mRot[1]) === 0) {
      html = '<strong>' + mRot[1] + '</strong>' + html.slice(mRot[1].length);
      // a linha de Equipamento carrega o Tesouro junto (formato do livro)
      if (mRot[1] === 'Equipamento') html = html.replace(/\bTesouro\b/, '<strong>Tesouro</strong>');
      return '<div class="npc-linha">' + html + '</div>';
    }
    const mHab = l.match(RE_HABILIDADE) || l.match(RE_HAB_SIMPLES);
    if (mHab && html.indexOf('<') !== 0) {
      // recomeça do texto puro para não cortar um tooltip no meio
      html = '<strong>' + esc(mHab[1]) + '</strong>' + marcar(l.slice(mHab[1].length));
      return '<div class="npc-linha npc-linha--hab">' + html + '</div>';
    }
    return '<div class="npc-linha npc-linha--hab">' + html + '</div>';
  }

  // Statblock completo. `texto` é o campo da biblioteca; a 1ª linha
  // ("Nome ND X") vira o cabeçalho do card e não entra aqui.
  function bloco(texto) {
    const linhas = String(texto || '').split('\n').slice(1);
    let html = '', emDescricao = true;
    linhas.forEach(l => {
      // tudo antes da linha de tipo é descrição/lore — itálico de gazeta
      if (emDescricao) {
        if (RE_TIPO.test(l.trim())) emDescricao = false;
        else { if (l.trim()) html += '<p class="npc-desc">' + marcar(l.trim()) + '</p>'; return; }
      }
      html += linha(l);
    });
    return html;
  }

  // Texto solto (quadros de regra) → HTML com o selo mágico nas linhas
  // que começam com ✦. Mesma marca dos statblocks, para "Metamorfose
  // Dracônica" no quadro dos dragões aparecer igual às das fichas.
  function textoComSelo(txt) {
    return String(txt || '').split('\n').map(l => {
      const t = l.trim();
      if (t.indexOf(MARCA_MAGICA) !== 0) return esc(t);
      return seloMagico + esc(t.slice(MARCA_MAGICA.length).trim());
    }).join('<br>');
  }

  return { linha: linha, bloco: bloco, marcar: marcar, textoComSelo: textoComSelo, RE_TIPO: RE_TIPO };
})();
