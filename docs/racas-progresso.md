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

## A seguir (pedido dele, para depois)
As **caixas de escolher habilidade ao adicionar** uma raça (o caso Osteon:
clicar no Humano e pegar só "Versátil"). Servirá também para o Osteon/Yidishan
pegarem "uma habilidade de outra raça", e para escolher a herança do Moreau e
as bênçãos/talentos de Kallyanach/Kobolds.
