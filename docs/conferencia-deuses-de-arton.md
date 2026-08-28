# *Deuses de Arton* — conferência do bestiário

Feita em **28/08/2026**, contra o PDF do livro. Terceira rodada do roteiro "livro por
livro" — depois de [*Ameaças de Arton*](duvidas-ameacas-de-arton.md) e do
[*Tormenta 20*](conferencia-tormenta20.md).

**Resultado: o papel de combate entrou nas 66 fichas — e a conferência achou 13 fichas
que o livro tem e o sistema não.**

---

## 1. ⚠ Faltam 13 fichas: os Abissais e os Perigos

O livro traz a **Tabela 4-1: Ameaças por Nível de Desafio** (p. 319), a lista fechada do
Capítulo 4. Cruzada com o sistema:

```
79 na Tabela 4-1  ×  66 no sistema  →  13 faltando
```

E não é ficha solta perdida: são **duas seções inteiras** que nunca foram coladas no TXT
que o gerador lê (`Inútil/Regras Parte 2 do Deuses de Arton.txt`). Procurei lá por
"Diabrete", "Súcubo", "Abahddon", "Vento Abrasador", "Cataclismo": zero ocorrências.

### Abissais (10) — p. 252 a 266

Os planares malignos: *"Diabos. Demônios. Abissais. Infernais. […] Os nativos dos reinos
de deuses maléficos têm muitos nomes."*

| ND | Criatura | p. PDF | Papel (já lido do ícone) |
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

### Perigos (3)

| ND | Criatura |
|---|---|
| 3 | Vento Abrasador |
| 5 | Pântano Amaldiçoado |
| 17 | Cataclismo |

Estes **não têm ícone de papel** — e faz sentido: são perigos de ambiente, não criaturas
com ficha de combate no sentido normal.

### As duas contas fecham uma na outra

O que dá confiança nesse achado é que ele apareceu **por dois caminhos independentes**:

- pela **Tabela 4-1**: 79 no livro − 66 no sistema = 13 faltando;
- pelos **ícones do PDF**: 76 ícones encontrados − 66 casados = 10 órfãos, e os 10 órfãos
  são exatamente os 10 Abissais. Os 3 Perigos não têm ícone, o que fecha 76 + 3 = 79.

**O que falta fazer:** colar os statblocks dessas 13 no TXT-fonte (ou extraí-los do PDF)
e regerar. As páginas estão listadas acima.

---

## 2. O papel de combate — 66 de 66

```
node "Inútil/_extrair-papeis.js" deuses    # lê o PDF → Regras - Deuses de Arton (papéis).txt
node "Inútil/_gerar-deuses-arton.js"       # os 20 avatares
node "Inútil/_gerar-deuses-servos.js"      # os 46 servos
```

| Papel | Quantas |
|---|---|
| **solo** | 35 |
| **especial** | 27 |
| **lacaio** | 4 |

Só **4 lacaios** em 66 — coerente com um livro de avatares, aspectos e gênios, em que
quase nada é tropa. São o **Pilly** (ND 3, celestial), o **Sátiro Arqueiro** (ND 2), o
**Galokk Capanga** (ND 6) e o **Galokk Guarda-Costas** (ND 10) — os dois galokk sendo
justamente os capangas dos gigantes.

ND por papel: lacaio mediano **6**, especial **11**, solo **15**.

Por seção, lê como decisão editorial:

| Seção | solo | lacaio | especial |
|---|---|---|---|
| ⛩ Deuses Maiores | 14 | 0 | 6 |
| 🕊 Aspectos dos Deuses | **6** | 0 | 0 |
| 😇 Celestiais | 8 | 1 | 3 |
| 🍄 Fadas | 0 | 1 | **11** |
| 🧞 Gênios | 0 | 0 | **6** |
| 🗿 Gigantes | 7 | 2 | 1 |

As **Fadas e os Gênios são quase todos "especial"** — o que bate com a regra do livro
básico, que reserva esse papel a conjuradores, líderes e criaturas de uso fora do combate
direto. Fada e gênio negociam, encantam e fazem pacto; não é tropa nem chefe.

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
> idênticos ganham hashes diferentes. Foi o que escondeu 13 ícones deste livro (paths de
> 2147 bytes que são o solo de 2148, com diferença máxima de **0,001**).

Agora a comparação é numérica, com tolerância de 0,05, e testa também a versão girada.
Rodei os três livros de novo: *Ameaças de Arton* e *Tormenta 20* deram **resultado
idêntico** ao que já estava commitado.

---

## 3. Situação dos quatro livros da aba

| Livro | Fichas | Papel de combate | Conferido contra a lista do livro |
|---|---|---|---|
| **Ameaças de Arton** | 430 | ✅ 429 (o Rival Espelho não tem, e é certo) | ✅ Apêndice C — 430/430 |
| **Tormenta 20** | 80 | ✅ 80 | ✅ Tabela 7-1 — 80/80 |
| **Deuses de Arton** | 66 | ✅ 66 | ⚠ Tabela 4-1 — **13 faltando** |
| **Guia de NPCs** | 94 | — o livro não usa | — |

**676 fichas na aba, 575 com papel de combate.**
