# A letra da gazeta — os cinco papéis de fonte

Aberto em **05/10/2026**, a partir de um pedido de uma linha:

> *"Consegue utilizar outra fonte para os Grifos Alados? A fonte que estamos
> usando é beeem difícil de ler!"*

---

## 1 · O que estava errado, medido

O site tinha quatro fontes e **896 declarações** espalhadas por 22 arquivos de
CSS, cada uma escolhendo a fonte pelo nome. Contadas:

| Fonte | Declarações | Para quê |
|---|---:|---|
| **Cinzel** | 480 | títulos **e** todo rótulo, aba, chip, botão, cabeçalho de tabela |
| **Crimson Pro** | 256 | o texto que se lê: regra, descrição, campo |
| **IM Fell English** | 141 | dica, aviso, "nenhum ainda", subtítulo de aba |
| **UnifrakturMaguntia** | 15 | o nome do jornal e os títulos de seção |

Os dois focos do problema aparecem quando se cruza a fonte com o **tamanho do
próprio bloco**:

### Cinzel abaixo de 0,80rem — 355 dos 480 blocos

```
sem font-size      17
< 0,80rem         355   ← aqui
0,80–0,94rem       58
0,95–1,19rem       39
>= 1,20rem          9
outra unidade       2
```

Cinzel é uma **capitular romana** (o parente do Trajan): desenhada para letra
grande cortada em pedra. Em 11px a haste fina some, e **258 desses blocos ainda
forçavam caixa alta**, que apaga a silhueta da palavra — as duas coisas que
fazem ler rápido. Em títulos, Cinzel é bonito e ninguém reclamou; o que saiu foi
o uso dele como letra de trabalho.

### IM Fell English nas dicas — 141 blocos, quase todos miúdos

IM Fell English é a digitalização de um tipo de **1670**: contorno comido pela
tinta, inclinação forte, desenho irregular de propósito. Estava justamente nas
**dicas, avisos e vazios**, entre 0,68 e 0,92rem. É o pior lugar possível para
uma letra desgastada — e foi o que ele viu primeiro.

---

## 2 · As três vozes

A troca não foi "achar uma fonte mais legível". Foi dar a cada fonte um
**papel**, e o papel diz **quem está falando**:

| Voz | Quem é | Fonte |
|---|---|---|
| **a GAZETA** | o nome do jornal e os títulos | UnifrakturMaguntia · Cinzel |
| **o LIVRO** | o texto de Tormenta 20: regra, descrição, o que a página diz | Crimson Pro |
| **o SITE** | a ferramenta falando com você: rótulo, dica, aviso, "mochila vazia" | Alegreya Sans · Alegreya Sans SC |

Olhando um trecho, dá para saber de quem é a frase **antes de ler**. Essa é a
regra inteira.

## 3 · Os cinco papéis

Vivem no `:root` do `css/fonts.css`, e são a **única** coisa que o resto do site
conhece — nenhum outro arquivo escreve o nome de uma fonte.

```css
--ga-fonte-gazeta   'UnifrakturMaguntia'          o nameplate. Decoração, nunca informação.
--ga-fonte-titulo   'Cinzel'                      títulos de seção e de cartão, números grandes
--ga-fonte-rotulo   'Alegreya Sans SC'            rótulo, aba, chip, cabeçalho de tabela, botão
--ga-fonte-corpo    'Crimson Pro'                 regra, descrição, o texto que se lê
--ga-fonte-nota     'Alegreya Sans'               dica, aviso, "nenhum ainda", subtítulo
--ga-fonte-mono     'Courier New'                 número que precisa alinhar em coluna
```

**A divisão do Cinzel foi por tamanho, não a olho.** Um script leu bloco a bloco
e mandou para `--ga-fonte-titulo` o que declara `font-size >= 0,95rem` (51
blocos: os h1 das abas, `.news-title`, `.mz-nome`, os números grandes de Defesa e
atributo, as capitulares) e para `--ga-fonte-rotulo` todo o resto (428). Os dois
únicos blocos sem `font-size` que são título por natureza — `.news-title` e
`.mz-nome` — entraram na lista à mão.

## 4 · A escolha: Alegreya Sans e Alegreya Sans SC

De Juan Pablo del Peral, desenhadas para **livro**: caloroso, pouco contraste,
haste firme que aguenta 11px, e o SC com **versalete de verdade**. Ao lado do
Cinzel soam da mesma casa; em corpo miúdo, leem-se de longe melhor.

Baixadas só no subconjunto **`latin`** do Google Fonts, que cobre o português
inteiro (U+0000–00FF pega ç ã õ á ê ü) mais os travessões e as aspas curvas
(U+2000–206F). Cinco arquivos, **118 KB somados**, em `/fonts` como todas as
outras — nada vem do Google em tempo de execução, e o site segue 100% offline.

### A caixa alta saiu junto — 262 blocos

Com versalete, forçar `text-transform: uppercase` desperdiça o recurso: volta
tudo a ser capitular. Testados os três jeitos lado a lado, nos tamanhos reais do
site:

```
A · Cinzel CAIXA ALTA         elegante e arejado, mas pálido e largo (quebra em 2 linhas)
B · Alegreya SC CAIXA ALTA    mais escuro e compacto, ainda sem silhueta de palavra
C · Alegreya SC VERSALETE     IɴᴠᴇɴᴛÁʀɪᴏ · Qᴜᴀɴᴛᴀs — lê mais rápido E ocupa menos
```

C ganhou. O `text-transform: uppercase` foi removido dos 256 blocos que usam
`--ga-fonte-rotulo` e dos 6 que herdavam a fonte de um deles. O
`letter-spacing` ficou: versalete pede entrelinha aberta.

Os três blocos que mantêm caixa alta em **outro** papel (`.year-header h2` e
`.ga-modal-cab`, que são Cinzel de título, e `.bs-tag-compart`) não foram
tocados: capitular romana em título é o uso certo dela.

## 5 · A volta

No painel **⚙ Acessibilidade**, chave **"Letra antiga da gazeta"**. Ligada,
grava `letraAntiga: true` e põe `data-ga-letra="antiga"` no `<html>` — o
`css/fonts.css` devolve os dois papéis que mudaram:

```css
html[data-ga-letra="antiga"] {
  --ga-fonte-rotulo: 'Cinzel', serif;
  --ga-fonte-nota:   'IM Fell English', serif;
}
```

Mais nada no site precisa saber que existe uma escolha: quem lê o papel lê a
troca junto. Os arquivos do IM Fell English continuam em `/fonts` por isso.

É a única chave daquele painel que **não** facilita a leitura, e está lá por
isso: a troca foi grande, e ninguém deve ficar preso a ela. O pré-paint do
`<head>` das duas páginas aplica a chave antes da primeira pintura, como já fazia
com o tamanho do texto.

**Honestidade sobre a volta:** ela devolve as **fontes**, não a caixa alta. Como
a lowercase do Cinzel também é versalete, o modo antigo sai em versalete Cinzel
em vez de capitular cheia. Guardar os 256 seletores para reaplicar o
`uppercase` seria 10 KB de CSS gerado que apodrece no primeiro `rename` de
classe — não vale.

## 6 · O que não mudou

- **O nameplate.** Um jornal troca a letra do miolo e mantém a testeira. Blackletter fica.
- **Cinzel nos títulos e nos números grandes.** Era onde ele era bonito.
- **Crimson Pro no texto do livro.** Já era a escolha certa.
- **Zero px.** As 896 declarações continuam todas em `rem`, que é o que faz a régua do ⚙ escalar a gazeta inteira.

## 7 · Como refazer ou trocar de novo

Trocar a fonte do site inteiro agora é **mexer em um arquivo**: os seis papéis no
topo do `css/fonts.css`. Para dividir um papel em dois (separar, digamos, o
rótulo de tabela do rótulo de botão), os scripts do dia estão no scratchpad da
sessão e são curtos de refazer — eles percorrem `seletor { ... }` com regex e
decidem pelo `font-size` do próprio bloco.

Conferido depois da troca: **nenhum elemento passou a transbordar** em nenhuma
das abas (as fontes novas são mais estreitas que o Cinzel), **zero rolagem
horizontal** no desktop e no iframe de 390px, e os cinco pesos carregam com os
acentos vindo da Alegreya, não do fallback.
