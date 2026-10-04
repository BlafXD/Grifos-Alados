# A cara de cada divindade nas fichas dos avatares — 4 de outubro de 2026

**Pedido dele:** *"Consegue alterar um pouco o visual de quando o mestre está usando a
ficha de algum dos Deuses? Tipo se estiver usando a ficha da Allihanna ser um pouco mais
verde e ter algumas raízes ou plantas? Faça em 2 levas: 10 primeiros Deuses e os outros
restantes 10 deuses depois."*

Onde: **📕 Fichas Prontas → ⛩ Deuses de Arton**, a aba que só o mestre tem. São as 20
fichas dos **avatares** dos Deuses Maiores; as 56 fichas dos servos (abissais, aspectos,
celestiais, fadas, gênios e gigantes) do mesmo livro **não** mudam.

## A regra que eu me dei: nada inventado

As duas peças do visual saem do **quadro de dados que o livro imprime para cada
divindade** — e esse mesmo quadro já aparece dentro do card, na caixa de cima. Então o
card explica a própria decoração:

| Peça na tela | De onde vem |
|---|---|
| a **faixa** de cores no alto do card | a linha **"Cores Significativas"**, na ordem e na quantidade do livro |
| a **moldura** (borda esquerda, o nome da divindade, a caixa de dados) | a primeira dessas cores que se lê sobre pergaminho |
| a **marca de água** no canto | o **"Símbolo Sagrado"** |

Por isso Marah tem **uma** listra (o livro dá só "Branco"), Azgher tem **duas**,
Kallyadranoch e Sszzaas têm **cinco**, e Wynna tem **seis** — as seis cores da magia.

**Três casos que o livro impôs e que estão anotados no código:**

- **Megalokk não tem cores.** O livro escreve "Cores Significativas. Nenhuma." Então ele
  não ganha faixa de cores: a listra é o **couro da garra** do símbolo sagrado, e isso
  **não é cor do livro** — é escolha minha, para o card não parecer quebrado.
- **Marah é só branco**, e borda branca some no pergaminho: a moldura usa a **prata da
  pena** do símbolo sagrado. Mesmo caso, menor, em **Azgher** (branco e dourado → a
  moldura é o dourado) e em **Tanna-Toh** (branco, amarelo e cinza claro → o amarelo).
- **Wynna** é "Cinza, **ou** as seis cores da magia combinadas": as seis fazem a faixa, o
  cinza faz a moldura. As duas metades da frase couberam.

## É de propósito que seja pouco

O que o mestre lê nesse card é um **statblock no meio do combate**. Nada pode disputar com
ele. Então: a faixa tem 4px, a marca de água fica em opacidade baixa atrás do quadro de
dados (nunca atrás dos números), e a caixa de dados leva **7%** da cor do deus. O
statblock em si — ataques, perícias, habilidades — não mudou de cor nenhuma.

A marca de água fica no **alto** do card, e não no pé: a ficha de um avatar passa de **dois
mil pixels** de altura, e ninguém rolaria até o fim para ver um desenho.

## As duas levas

| Leva | Deuses |
|---|---|
| **1** | Aharadak · Allihanna · Arsenal · Azgher · Hyninn · Kallyadranoch · Khalmyr · Lena · Lin-Wu · Marah |
| **2** | Megalokk · Nimb · Oceano · Sszzaas · Tanna-Toh · Tenebra · Thwor · Thyatis · Valkaria · Wynna |

É a ordem alfabética em que o livro imprime o Panteão. As duas levas estão marcadas no
meio da lista, em `js/deuses-visual-data.js`.

## Onde isso mora

- **`js/deuses-visual-data.js`** (novo): um registro por deus — `coresLivro` (a frase do
  livro, palavra por palavra), `cores` (a paleta em hex), `simbolo` e `motivo(c)`, que é o
  desenho em SVG recebendo a paleta. Mais a API: `de(nome)`, `faixa(d)`, `corEstrutural(d)`,
  `motivoUrl(d)` e `estilo(d)`, que devolve as três variáveis prontas para o atributo
  `style`.
- **`js/fichas-prontas.js`**: `visualDoDeus(f)` e, no `cardFicha`, a classe
  `fp-card--deus`, o `data-deus` e o `style` com as variáveis. Ficha sem deus conhecido
  **fica exatamente como era** — nada no desenho depende disto.
- **`css/fichas-prontas_style.css`**: a faixa (`.fp-card--deus::before`), a marca de água
  no `.vc-card-corpo`, a cor da caixa de dados e do nome da divindade.
- **`index.html`**: o `<script>` novo, antes do `fichas-prontas.js`. **Não entra no
  `jogadores.html`** — a aba não existe lá.

**Por que o desenho mora em JS e não em CSS:** um SVG dentro do CSS vira um `data-URI` de
uma linha, ilegível e impossível de ajustar. Em JS ele continua um desenho com coordenadas
e comentários — e pode ser pintado com as cores do próprio deus.

## A armadilha que custou a leva 1 inteira

`encodeURIComponent` cuida do `#` das cores, mas **não toca nos apóstrofos** — ele os
considera seguros. E são justamente eles, as aspas de cada atributo do SVG, que **fecham o
`url('…')` cedo demais**: o valor vira inválido e a imagem some **sem erro nenhum no
console** (o `background-image` calculado dá `none`). O conserto é uma linha —
`.replace(/'/g, '%27')` — e está comentado no arquivo.

Duas irmãs dela, da mesma leva:

- **A lua de Lena saiu como um risco fino.** O truque clássico de desenhar crescente com
  dois arcos (`A46 … A37 …`) **não funciona** quando a corda é maior que o diâmetro do
  segundo raio: o SVG estica o raio para o arco caber, os dois arcos viram o mesmo, e a
  lua tem largura zero. O crescente agora é **um caminho com dois círculos e
  `fill-rule='evenodd'`** — o de cima é furado pelo de baixo.
- **Cor clara não faz moldura.** Branco e dourado-claro sobre pergaminho não se vêem; daí
  os campos `estrutural` e `estruturalCor`.

## Testado (servidor local, Firebase desligado)

| O que | Resultado |
|---|---|
| as 20 fichas de avatar | todas com faixa, moldura e marca de água ✔ |
| as 56 fichas dos servos do mesmo livro | **intactas**, sem nenhuma variável nova ✔ |
| Allihanna | borda e nome verde-folha, faixa verde/verde/marrom, árvore com raízes no canto ✔ |
| Tenebra | faixa preto/roxo/azul, estrela de cinco pontas, e o texto do quadro continua legível por cima ✔ |
| Marah (uma cor) e Megalokk (nenhuma) | listra chapada, sem gradiente quebrado ✔ |
| Wynna (seis cores) | as seis listras, e a moldura no cinza ✔ |
| console | sem erro, nas duas páginas ✔ |
