# *Deuses de Arton* — conferência do bestiário

Feita em **28/08/2026**, contra o PDF do livro. Terceira rodada do roteiro "livro por
livro" — depois de [*Ameaças de Arton*](duvidas-ameacas-de-arton.md) e do
[*Tormenta 20*](conferencia-tormenta20.md).

**Resultado: o livro fechou. 76 fichas, 76 com papel de combate, e a Tabela 4-1 bate
inteira.** A conferência achou 10 fichas que o livro tinha e o sistema não — a seção
**Abissais** inteira —, e elas entraram no mesmo dia, extraídas do próprio PDF.

---

## 1. As 10 fichas que faltavam: a seção Abissais ✅

O livro traz a **Tabela 4-1: Ameaças por Nível de Desafio** (p. 319), a lista fechada do
Capítulo 4. Cruzada com o sistema, sobravam dez nomes:

```
79 na Tabela 4-1  =  66 fichas + 3 perigos + 10 abissais (que faltavam)
79 na Tabela 4-1  =  76 fichas + 3 perigos                (agora)
```

Não era ficha solta perdida: era uma **seção inteira** que nunca foi colada no TXT que o
gerador lê (`Inútil/Regras Parte 2 do Deuses de Arton.txt` — procurei lá por "Diabrete",
"Súcubo", "Abahddon": zero ocorrências).

### Abissais (10) — p. impressas 252 a 266

Os planares malignos: *"Diabos. Demônios. Abissais. Infernais. […] Os nativos dos reinos
de deuses maléficos têm muitos nomes."*

| ND | Criatura | p. PDF | Papel |
|---|---|---|---|
| 2 | Diabrete | 256 | lacaio |
| 4 | Diabrete Negociante | 256 | especial |
| 5 | Súcubo | 261 | especial |
| 6 | Aucharai | 255 | solo |
| 7 | Rhayrivel | 260 | solo |
| 8 | Trio de Carvarel | 255 | solo |
| 10 | Jhumariel | 257 | solo |
| 14 | Margharon | 258 | especial |
| S | Abahddon | 262 | solo |
| S | Lamashtu | 265 | solo |

Vieram junto **dois quadros de regra** (Barganhas, no diabrete negociante; Contrato
Infernal, no margharon) e **dois itens** (Saliva Ácida, do jhumariel; Kazidhaan, a arma
de Abahddon), que entraram na lista de itens do livro.

### Como o texto saiu do livro

Sem esperar a cópia: o `Inútil/_extrair-abissais.js` tira as 15 páginas do PDF com
`pdftotext -raw` e recorta faixa por faixa. O que o `-raw` erra e o script conserta está
documentado dentro dele; em resumo, três coisas:

1. **A paginação e o título decorativo.** Cada página larga "Capítulo 4", o número e o
   nome da criatura repetido duas vezes (é o título em duas demãos de tinta).
2. **O selo de ND**, que neste livro é uma caixa gráfica ao lado do nome. O `-raw` joga
   esse pedaço para o fim do statblock, para o meio da lista de magias ou colado na frente
   de uma linha de prosa (*"ND 6 servindo a devotos do mal"*). Os dez ND foram conferidos
   no `-layout`, que devolve o selo para o lado do nome.
3. **A ordem dentro da página.** O jhumariel abre no pé da página e continua no alto da
   coluna da direita; a descrição da Lamashtu é cortada ao meio pelo quadro do Kazidhaan;
   quatro statblocks são partidos por uma virada de página.

**Conferência:** os 10 statblocks e as 10 descrições batem **palavra por palavra** com o
PDF (3.338 palavras de statblock e 2.272 de descrição, comparadas token a token).

### O parágrafo agora é lido, não adivinhado

O refluxo de prosa do gerador achava o fim de parágrafo pela **largura da linha** — e essa
medida erra justamente aqui, porque em metade das páginas desta seção o texto contorna uma
ilustração e a coluna muda de largura no meio do parágrafo.

Como o texto sai do PDF, dá para saber a resposta em vez de estimá-la: **todo parágrafo do
livro abre indentado**, e o `-layout` guarda essa posição. O extrator lê o recuo de cada
linha (medido sempre contra a linha de baixo, nunca contra uma margem fixa) e marca com
`¶` a linha que abre parágrafo; o gerador quebra exatamente nelas. O TXT copiado à mão não
tem marca nenhuma e continua sendo refluído como sempre foi.

### Um conserto que valeu para o livro todo

O selo `✦` de habilidade mágica fecha a habilidade — o que vem depois é sempre outra. O
refluxo não sabia disso, e no **aucharai** a habilidade *Escurecer Olhos* engolia a
*Protegido pela Escuridão* (o nome dela tem uma ligação, "pela", que a regra de título de
habilidade não conhecia). Com o selo virando quebra de parágrafo, as duas voltaram a ser
duas. Regerados, os **46 servos que já existiam saíram byte a byte idênticos** — a mudança
só acrescenta.

### Os 3 "perigos" da tabela já estavam no sistema ✅

A Tabela 4-1 lista mais três nomes que não são fichas de criatura: **Vento Abrasador**
(ND 3), **Pântano Amaldiçoado** (ND 5) e **Cataclismo** (ND 17). São **perigos complexos**
— têm *Objetivo* e *Efeito*, não statblock — e já estavam no projeto, em
`js/perigos-data.js` → `PERIGOS_COMPLEXOS`, que é o lugar certo deles.

Coerente com isso: eles **não têm ícone de papel** no livro.

> ✅ A dúvida da rodada anterior está respondida: os três estavam marcados com
> `fonte: 'Deuses e Heróis'`, que não é livro nenhum do projeto. Eles são impressos em
> *Deuses de Arton* (p. PDF 318–319, na seção "Perigos Complexos"), e a `fonte` foi
> corrigida para **Deuses de Arton** — como nos outros 14 perigos, que trazem o nome do
> livro de onde saíram.

### As duas contas fecharam uma na outra

O que deu confiança no achado é que ele apareceu **por dois caminhos independentes**:

- pela **Tabela 4-1**: 79 no livro − 66 fichas − 3 perigos = 10 faltando;
- pelos **ícones do PDF**: 76 ícones encontrados − 66 casados = 10 órfãos, e os 10 órfãos
  eram exatamente estes 10 Abissais.

E fecharam de novo no fim: o extrator de papéis agora diz **casados: 76 / 76**, sem órfão
nenhum.

---

## 2. O papel de combate — 76 de 76

```
node "Inútil/_extrair-abissais.js"         # o TXT dos abissais, tirado do PDF
node "Inútil/_extrair-papeis.js" deuses    # lê o PDF → Regras - Deuses de Arton (papéis).txt
node "Inútil/_gerar-deuses-arton.js"       # os 20 avatares
node "Inútil/_gerar-deuses-servos.js"      # os 56 servos
```

| Papel | Quantas |
|---|---|
| **solo** | 41 |
| **especial** | 30 |
| **lacaio** | 5 |

Só **5 lacaios** em 76 — coerente com um livro de avatares, aspectos e gênios, em que
quase nada é tropa. São o **Diabrete** (ND 2, abissal), o **Pilly** (ND 3, celestial), o
**Sátiro Arqueiro** (ND 2), o **Galokk Capanga** (ND 6) e o **Galokk Guarda-Costas**
(ND 10) — os dois galokk sendo justamente os capangas dos gigantes.

ND por papel: lacaio mediano **3**, especial **10**, solo **15**.

Por seção, lê como decisão editorial:

| Seção | solo | lacaio | especial |
|---|---|---|---|
| ⛩ Deuses Maiores | 14 | 0 | 6 |
| 😈 Abissais | 6 | 1 | 3 |
| 🕊 Aspectos dos Deuses | **6** | 0 | 0 |
| 😇 Celestiais | 8 | 1 | 3 |
| 🍄 Fadas | 0 | 1 | **11** |
| 🧞 Gênios | 0 | 0 | **6** |
| 🗿 Gigantes | 7 | 2 | 1 |

As **Fadas e os Gênios são quase todos "especial"** — o que bate com a regra do livro
básico, que reserva esse papel a conjuradores, líderes e criaturas de uso fora do combate
direto. Fada e gênio negociam, encantam e fazem pacto; não é tropa nem chefe.

Os **Abissais são o único grupo do livro com os três papéis** — o que faz sentido: é a
única seção montada como um exército, com o diabrete de lacaio embaixo e Abahddon e
Lamashtu de solo no topo.

### Duas coisas novas que este livro exigiu

**Ele não repete a legenda dos papéis.** É suplemento: assume que você tem o básico. O
script agora aceita `legendaDe`, e pega os desenhos de referência do **Tormenta 20** —
são literalmente os mesmos.

**O ícone pode vir girado 180°.** O do **Avatar de Nimb** (p. 197) tem todos os números
do path negados. É o mesmo desenho de "solo" de cabeça para baixo — e, no deus da
loucura, é difícil não achar que foi de propósito.

Isso obrigou a trocar a identificação por **assinatura** (hash) por **comparação com
tolerância**, que era o certo desde o começo:

> O diagramador varia a última casa decimal entre duas cópias do mesmo desenho. Arredondar
> antes de hashear não resolve — o erro cai na fronteira do arredondamento e dois desenhos
> idênticos ganham hashes diferentes. Foi o que escondeu 13 ícones deste livro na primeira
> passada (paths de 2147 bytes que são o solo de 2148, com diferença máxima de **0,001**).

Agora a comparação é numérica, com tolerância de 0,05, e testa também a versão girada.
Rodei os três livros de novo: *Ameaças de Arton* e *Tormenta 20* deram **resultado
idêntico** ao que já estava commitado.

---

## 3. O que ficou de fora, de propósito

O livro fecha cada seção de servos com uma **caixa listando criaturas do mesmo tipo que
estão em outros livros** — nos abissais é *"Ber-baram, Cão do Inferno, Demônio da Pólvora,
Duplo, Elemental do Veneno…"* (p. impressa 263); há caixas iguais nos celestiais (p. 284)
e nos gênios (p. 305). Nenhuma delas está no projeto: o título é desenho, não texto, e a
cópia manual do livro nunca as trouxe. Fica registrado como omissão **consistente** — ou
entram as três, ou não entra nenhuma.

---

## 4. Situação dos quatro livros da aba

| Livro | Fichas | Papel de combate | Conferido contra a lista do livro |
|---|---|---|---|
| **Ameaças de Arton** | 430 | ✅ 429 (o Rival Espelho não tem, e é certo) | ✅ Apêndice C — 430/430 |
| **Tormenta 20** | 80 | ✅ 80 | ✅ Tabela 7-1 — 80/80 |
| **Deuses de Arton** | 76 | ✅ 76 | ✅ Tabela 4-1 — 79/79 (76 fichas + 3 perigos) |
| **Guia de NPCs** | 94 | — o livro não usa | — |

**680 fichas na aba, 585 com papel de combate.** Os três bestiários estão conferidos
contra a lista fechada do próprio livro.
