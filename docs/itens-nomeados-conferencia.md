# Os 232 itens mágicos nomeados, conferidos contra os quatro livros

**Data:** 13 de outubro de 2026
**Motivo:** o bloco **🌟 Específicos** novo da 🏪 Loja sorteia esses itens. Antes
de deixar o gerador tirá-los da cartola, valia provar que a lista está certa e
**completa** — "absolutamente todos, de todos os livros", nas palavras do pedido.
**Fonte no código:** `js/recompensas.js`, as seis tabelas `ESPEC_*` e
`ACESSORIO_*`, hoje também exportadas em `window.GA_ItensNomeados`.

---

## Resultado

| Livro | Itens | Conferido | Divergências |
|---|---:|---|---:|
| Tormenta20 | 96 | nome **e** preço, contra as Tabelas 8-9, 8-11, 8-13, 8-14 e 8-15 | **0** |
| Heróis de Arton | 95 | nome, categoria **e** preço, contra as Tabelas 3-9, 3-10, 3-11 e 3-12 | **0** |
| Deuses de Arton | 35 | categoria **e** preço, contra a frase que fecha cada verbete | **0** |
| Ameaças de Arton | 6 | idem | **0** |
| **Total** | **232** | | **0** |

E no sentido inverso — **o que o livro tem e o código não**: nenhuma linha das
tabelas do Tormenta20 nem das do Heróis ficou de fora. As quatro tabelas foram
lidas inteiras e casaram uma a uma.

Por categoria, como o gerador as usa:

| Tabela do código | Itens | T20 | Heróis | Deuses | Ameaças |
|---|---:|---:|---:|---:|---:|
| `ESPEC_ARMA` | 54 | 18 | 17 | 17 | 2 |
| `ESPEC_ARMADURA` (armaduras **e** escudos) | 25 | 13 | 10 | 1 | 1 |
| `ESPEC_ESOTER` | 4 | — | 4 | — | — |
| `ACESSORIO_MENOR` | 47 | 21 | 23 | 3 | — |
| `ACESSORIO_MEDIO` | 63 | 22 | 30 | 10 | 1 |
| `ACESSORIO_MAIOR` | 39 | 22 | 11 | 4 | 2 |

---

## Como cada livro foi lido (e por que não dá para usar o mesmo método nos quatro)

### Tormenta20 — tabela limpa
`pdftotext -layout` resolve: as cinco tabelas saem com faixa, nome e preço na
mesma linha. **96/96** com nome e preço idênticos.

### Heróis de Arton — duas tabelas boas e uma quebrada
As Tabelas **3-9, 3-10 e 3-11** saem certas no modo de ORDEM DE LEITURA (o
`pdftotext` **sem** `-layout`), em que cada célula vira uma linha: nome,
categoria, preço. **31/31.**

A **Tabela 3-12** (os 64 acessórios) **não sai nos dois modos**, e é uma
armadilha cara: no `-layout` os nomes longos quebram em duas linhas e a coluna
de preço **não**, então a tabela inteira fica deslocada — e deslocada ela
*parece* uma tabela boa. Comparar assim acusa divergência em cinco itens que
estão corretos:

| Item | O que a leitura torta "provava" | O que o livro diz |
|---|---|---|
| Cinturão do trobo | Maior, T$ 30.000 | **Menor, T$ 3.000** |
| Amuleto da visão etérea | Média, T$ 10.500 | **Menor, T$ 3.000** |
| Papiro das estrelas | T$ 3.000 | **T$ 1.500** |
| Monóculo da franqueza | T$ 1.500 | **T$ 4.500** |
| Pérola da nulificação | T$ 12.000 | **T$ 3.000** |

É a mesma armadilha da Tabela 2-3 do ⚗ Criar Ameaça. O que fechou a questão foi
**ler o PDF pelas coordenadas**, com o leitor do próprio projeto
(`Inútil/_pdf.js`, a função `textos()`): pegar os pedaços de texto de cada
coluna pelo `x`, ordená-los pelo `y` e juntar ao de cima todo nome que começa
com minúscula (a continuação de um nome quebrado). Assim saem **32 nomes, 32
categorias e 32 preços** em cada metade da tabela — e os **64/64** batem com o
código, categoria e preço.

> **Para a próxima vez:** tabela larga do Heróis não se confere por texto. O
> caminho é o `_pdf.js` por coordenadas, e ele leva dez minutos.

### Deuses de Arton e Ameaças de Arton — não há tabela
Nesses dois o item nomeado vem no meio do capítulo do deus, e quem diz o que ele
é e quanto custa é a **frase que fecha o verbete**: *"Arma específica média,
preço T$ 54.000."* Então a conferência é por essa frase. Três detalhes que
custaram tempo:

- **O `-layout` não serve aqui.** A página é de duas colunas, e colar as linhas
  mistura a coluna vizinha no meio da frase: `…magnífica. Arma` + *texto da outra
  coluna* + `específica média, preço T$ 54.000`. O `pdftotext` **sem** `-layout`
  segue a ordem de leitura e devolve cada parágrafo inteiro.
- **O nome aparece antes do verbete**, nas listas de cada divindade. Procurar o
  fecho "depois da primeira aparição do nome" pega o item errado — tem de aceitar
  **qualquer** aparição que tenha, logo adiante, um fecho com a categoria e o
  preço que o código afirma.
- **O livro nem sempre escreve "preço".** O *Coração corrompido* fecha em
  *"Acessório maior, T$ 45.000."*, sem a palavra. Uma expressão que a exija dá o
  item como errado — e ele está certo.

### A armadilha da normalização
A função que tira acento e pontuação para comparar **come o `T$` e o ponto do
milhar**. A primeira versão desta conferência devolveu *0 de 41* por isso, e não
por erro no catálogo. Quem comparar preço tem de preservar `$` e `.`.

---

## O que isto NÃO conferiu

O **texto** dos poderes de cada item (o que a Vingadora sagrada faz) não foi
reconferido aqui — ele não entra na Loja, que mostra nome, preço e a referência
de livro e página. A conferência de conteúdo das descrições é a de
`docs/conferencia-itens.md`.
