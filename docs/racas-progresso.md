# Raças na ficha — progresso

## Núcleo (Tormenta20 Jogo do Ano) — 17
As 8 principais + 9 extras, em `js/poderes-raca-origem-data.js`, grupo
`raca-hab` (um card por raça, todas as habilidades no `texto[]`), p. 19–31.

## Ameaças de Arton — 26 (leva de 29/09/2026)

Ele pediu "todas as outras raças". As raças jogáveis do bestiário são as que
têm o quadro **"\<Raça\>: Habilidades de Raça"**. São **26**:

> Meio-Orc (31), Orc (33), Tabrachi (37), Ogro (40), Bugbear (79), Hobgoblin
> (84), Centauro (105), Gnoll (115), Kallyanach (151), Kaijin (157), Kappa
> (158), Mashin (160), Nezumi (162), Tengu (164), Minauro (175), Kobolds
> (183), Harpia (201), Ceratops (265), Pteros (267), Velocis (268), Voracis
> (270), Yidishan (300), Moreau (303), Elfo-do-Mar (316), Nagah (333),
> Finntroll (339).

O **suplemento** "FIX Desmoralizar Burguês" só reimprime um subconjunto disso;
o oficial é o **Ameaças de Arton**. O **Heróis de Arton NÃO tem raças novas**
(só "Raças Abertas", regra opcional). **Deuses de Arton** também não.

### Como entraram
- `js/poderes-raca-origem-data.js`, grupo `raca-hab`, `livro: 'ameacas'`, um
  card por raça. Estrutura do quadro do livro: linha de **atributos** +
  habilidades nomeadas + **Longevidade** + **Devotos** (o Ameaças põe esses
  dois no quadro; o núcleo não punha). Total `raca-hab`: 17 → **43**.
- **Nenhuma mudança de UI:** o chip 🌿 "Habilidade de raça" da busca "Adicionar
  habilidade" já lista o grupo; `GA_PODERES_LIVROS.ameacas` já existia; o
  recount no fim do arquivo atualiza o `quantos` do chip (17 → 43) sozinho.

### Casos especiais
- **Kallyanach, Kobolds, Mashin** têm listas de "escolha 2" (Bênção de
  Kallyadranoch / Talentos do Bando / Maravilha Mecânica) — os poderes viraram
  linhas com "•" no `texto[]`.
- **Mashin** é um *chassi* de golem (não uma raça comum); sem Longevidade/
  Devotos, como no livro. Complementa a raça Golem do núcleo.
- **Moreau** é uma raça com **12 heranças** (Coruja, Hiena, Raposa, Serpente,
  Búfalo, Coelho, Crocodilo, Gato, Leão, Lobo, Morcego, Urso). Um só card, com
  a base ("escolha uma herança" + Longevidade + Devotos) e as 12 heranças em
  seguida (51 linhas no total).
- **Kobolds** é um bando tratado como uma criatura só (nome no plural, como o
  livro).

### Fidelidade (reproduzido como o PDF imprime, mesmo quando estranho)
- **Devoção** (não "Devotos") nos thera: Ceratops, Pteros, Velocis, Voracis.
- **Finntroll**: "Devotos. **Kallyanadroch**, …" — grafia do livro (as duas
  extrações batem; noutros quadros é "Kallyadranoch").
- **✦** (habilidade mágica) em 3 linhas: Kallyanach (Prática Arcana), Kappa
  (Cura das Águas), Moreau (Sapiência, herança da Coruja). Na extração o ✦ vem
  como um " e" solto no fim — trocado pelo glifo.

### Método
`pdftotext -enc UTF-8` em **modo leitura (sem `-layout`/`-raw`)** — o único
limpo em coluna dupla dentro dos statblocks; foi ele que revelou o **Tengu**,
que o `-layout` tinha escondido. Páginas atribuídas pelo rodapé de cada folha.

### Conferência (node)
43 `raca-hab` (17 + 26), 26 do Ameaças com os nomes certos, ids únicos, 3 ✦,
Moreau com 51 linhas, bytes do ✦/¼/⅓/’ literais em UTF-8, zero escape `\u`.
**Ainda NÃO testado no clique-a-clique do navegador** (mesma razão das origens);
é dado aditivo no grupo `raca-hab` já testado, sem mudança de código de UI.

## Caixas de escolher habilidade ao adicionar (29/09/2026) — FEITO

O caso Osteon: ao adicionar uma habilidade de raça pelo "Adicionar habilidade",
se a raça tem mais de uma linha, a tela de detalhe vira **caixas (tudo marcado
por padrão)**; desmarque o que não for pegar. O botão mostra "＋ Adicionar (N)"
com a contagem e trava em 0. Só o que ficou marcado entra no `texto` do card.

- Onde: `telaPoder` dentro de `abrirBuscaPoder`, em `js/ficha.js`. Gate
  `escolheHab = grupo === 'raca-hab' && texto.length > 1 && !jaTem`. Fora daí
  (outros grupos, raça já na ficha, uma linha só) o texto é só leitura, como era.
- Ao adicionar: `texto` = só as linhas marcadas (`filter` pelos `data-hab`
  marcados); o resto do card (nome, livro, página, pid) fica igual.
- CSS: `.fi-pod-escolha` / `.fi-pod-escolha-cab` em `css/ficha_style.css`
  (linha desmarcada esmaece via `:has(input:not(:checked))`).
- Serve o **Osteon** e o **Yidishan** (pegar UMA habilidade de outra raça — é
  só adicionar o card daquela raça e deixar só a linha desejada), a **herança
  do Moreau** (deixar a base + uma herança) e as **bênçãos/talentos** de
  Kallyanach e Kobolds (deixar as 2 escolhidas).
- **Não testado no clique-a-clique do navegador** ainda; sintaxe conferida
  (`node --check`), e o caminho de adicionar é o mesmo já existente, só com o
  `texto` filtrado. Como é UI interativa, vale um teste no navegador.

## Heróis + Deuses e sub-cards de escolha (29/09/2026) — total 49 raças

Ele notou o Duende faltando e que o Moreau (51 caixas) estava horrível. Duas
correções numa leva só (escolha dele):

**1. As 7 raças que faltavam.** Eu tinha errado ao dizer que Heróis/Deuses não
tinham raças — o `-layout` mangled me enganou. Achadas em modo leitura:
- **Heróis de Arton, Cap. 1 "Novas Raças" (p. 8–15):** Duende (8), Eiradaan
  (12), Galokk (13), Meio-Elfo (14), Sátiro (15).
- **Deuses de Arton:** Inevitável (chassi de golem, p. 277) e **Suraggel
  Variantes** (22 heranças planares, p. 36) — estas entraram como uma escolha
  OPCIONAL no card do Suraggel (substituem Luz Sagrada ou Sombras Profanas).
- O **Duende** é oficial (Heróis, p. 8–11); o suplemento só o reimprime.
- Os Guias (NPCs, Deuses Menores) e o Atlas NÃO têm raças (conferido). Total de
  `raca-hab`: 26 → **49** (17 núcleo + 26 Ameaças + 6 novas cards).

**2. Sub-cards de escolha (o pedido do Moreau).** Raças com escolha ganharam um
campo `escolhas` no dado, separando a habilidade-base das opções:
```
escolhas: [ { rotulo, escolher: <n>|null, nota?, opcoes: [ {nome, texto:[…]} ] } ]
```
- `escolher: 1` → só uma marcável (as outras travam ao marcar; desmarcável);
  `escolher: 2` → até duas; `escolher: null` → sem limite (Mashin).
- No seletor (`telaPoder`, `js/ficha.js`): habilidades-base viram caixas (tudo
  marcado, como antes), e cada `escolha` vira um grupo com **sub-cards** e um
  contador n/N; ao adicionar, o `texto` do card = base marcada + as opções
  escolhidas. Reestruturadas: **Moreau** (1 herança de 12), **Kallyanach** (2
  bênçãos de 6), **Kobolds** (2 talentos de 10), **Mashin** (maravilhas, sem
  limite), e as novas **Duende** (Natureza 1/3 + Tamanho 1/4 + Presentes 3/12) e
  **Suraggel** (herança planar 1/22, opcional).
- CSS: `.fi-pod-grupo`, `.fi-pod-sub`, `.fi-pod-sub--off` (esmaece o não
  escolhido) em `css/ficha_style.css`. Raças simples seguem com as caixas planas.
- **Conferência (node):** 49 `raca-hab`, contrato das `escolhas` todo válido (79
  sub-opções), ids únicos, sintaxe OK. **Falta o teste no clique-a-clique do
  navegador** — é a parte mais interativa da leva, vale conferir aí.
