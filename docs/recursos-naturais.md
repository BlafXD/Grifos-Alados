# Recursos naturais — a regra opcional de tesouro, na ficha de cada criatura

**Data:** 13 de outubro de 2026
**Pedido dele:** *"Agora os recursos naturais do Ameaças"* — a parte que o
documento dos materiais especiais (`docs/materiais-especiais.md`, §8) tinha
deixado de fora de propósito: *"são outra coisa — matéria-prima de fabricação,
não material especial. Valem uma leva própria se ele quiser."*

**Fonte:** Ameaças de Arton, p. 401–402, com as Tabelas 3-5 e 3-6.

---

## 1 · Por que foi para a ficha da criatura, e não para o gerador

Ele escolheu "na ficha de cada criatura", e a razão é que **a ficha já tem tudo
o que a regra pede**. Uma linha de statblock e o ND resolvem os quatro números:

```
f.tipo = "Morto-vivo Médio"   →  a LINHA da Tabela 3-5 (o tipo)
                                 e a QUANTIDADE (o tamanho)
f.nd   = "7"                  →  o PATAMAR (Tabela 3-6)
                                 e a CD para extrair (15 + ND)
```

Então o bloco **🦴 Recursos naturais** se desenha sozinho dentro do card, nas
**430 fichas do Ameaças de Arton, nas 80 do Tormenta 20 e nas 76 do Deuses de
Arton** — sem ninguém digitar tipo, tamanho nem ND. Um rolador solto em
🎁 Recompensas pediria os três dados a cada uso para chegar ao mesmo lugar.

### O Guia de NPCs ficou fora, de propósito
O livro permite extrair recursos de criaturas inteligentes e até diz o preço
disso — *"pode ser considerado um tabu, um crime ou simplesmente um ato
hediondo, dependendo de onde os aventureiros estiverem"*. Mas aquela aba é de
**gente comum** (plebe, templo, lei, corte, mercenários), não um bestiário. Pôr
uma caixa de colheita na ficha do padeiro da vila é uma decisão de tom que o
livro não pediu. A regra continua lá para quem quiser: os cards de consulta
trazem a frase inteira.

---

## 2 · ⚠ A Tabela 3-5 não se lê por texto — nem por `-layout`

É a **quarta** tabela do projeto com esse problema (as Tab. 3-9 e 3-4 dos
materiais, a Tab. 3-12 do Heróis e a Tab. 2-3 do ⚗ Criar Ameaça), e a pior até
agora: no `pdftotext` sem `-layout` a grade sai com **43 valores para 42
células** — ou seja, nem dá para contar. E o `-layout` sai assim:

```
     Tipo de    Carapaça Couro  Fonte Ingrediente Mantimento   Osso Sucata
Criatura (1d6)
                1    2-3        —              —    4-5  6    —
      Animal
    Construto   1-2  —          3              —    —    —    6
     Espírito*
   Humanoide    —    —          1-3            4-6  —    —    —
     Monstro
   Morto-vivo   1    2          3              —    4    5-6  —
                1    2          3              4    5    6    —
                1    —          2-3            —    —    4-6  —
```

Os rótulos e as células **se desencontram**: as do Animal aparecem *acima* do
nome dele, o Espírito* fica sem células, e as que estão na linha do Humanoide
são as do Espírito*. Quem lesse assim daria ao humanoide a linha errada.

**O que fechou** foi descer até os **comandos de desenho** da página, onde cada
linha da tabela é um array `TJ` com as células na ordem e um `()` vazio onde o
livro imprime o travessão:

```
[(Animal)-5860(1)-4970(2-3)-4244()-5536()-6666(4-5)-5490(6)-4278()]TJ
[(Cons)20(trut)14(o)-4841(1-2)-4818()-4648(3)-5688()-6918()-5591()-4278(6)]TJ
[()-5071()-4244(1-3)-5031(4-6)-6666()-5591()-4127()]TJ        ← Espírito*
[(1)-5374(2)-4799(3)-5688()-7070(4)-5490(5-6)-3874()]TJ       ← Humanoide
[(1)-5374(2)-4799(3)-5839(4)-7221(5)-5894(6)-4278()]TJ        ← Monstro
[(1)-5222()-4244(2-3)-5284()-6918()-5338(4-6)-3874()]TJ       ← Morto-vivo
```

> **Para a próxima vez:** quando nem o `-layout` nem a ordem de leitura dão a
> tabela, o degrau abaixo das coordenadas é o `TJ`. O recorte vem com a ordem e
> com o kerning, que é o que confirma qual coluna é qual.

### A tabela, como o livro imprime

| Tipo de criatura (1d6) | Carapaça | Couro | Fonte | Ingrediente | Mantimento | Osso | Sucata |
|---|---|---|---|---|---|---|---|
| Animal | 1 | 2-3 | — | — | 4-5 | 6 | — |
| Construto | 1-2 | — | 3 | — | — | — | **6** |
| Espírito* | — | — | 1-3 | 4-6 | — | — | — |
| Humanoide | 1 | 2 | 3 | — | 4 | 5-6 | — |
| Monstro | 1 | 2 | 3 | 4 | 5 | 6 | — |
| Morto-vivo | 1 | — | 2-3 | — | — | 4-6 | — |

\* A linha do Espírito serve para criaturas incorpóreas de qualquer tipo.

---

## 3 · ⚠ O buraco da linha do construto é do livro

Repare na linha do **Construto**: carapaça 1-2, fonte 3, sucata **6**. O **4 e o
5 não têm nada** — e as outras cinco linhas cobrem os seis números do d6 sem
falha.

Isso foi conferido **três vezes**, por três caminhos independentes:

1. o texto corrido do `pdftotext`;
2. o `-layout`;
3. o array `TJ` acima, onde a última célula é literalmente `(6)` — e a distância
   até ela (`-4278`) é a **mesma** que leva à coluna de sucata na linha do
   Animal (`-5490(6)-4278()`), o que prova que a célula está na coluna certa.

**Não foi remendado para "4-6".** Era tentador: a sucata é justamente *"partes de
golens e outras criaturas artificiais"*, então 4-6 faria todo o sentido de mesa.
Mas o que está no sistema é o que o livro imprime, e o bloco **avisa** quando o
tipo tem vão:

> ⚠ A linha do Construto deixa o **4 e o 5** sem recurso: é assim que o livro
> imprime a Tabela 3-5. Caindo aí, escolha o recurso (o texto manda escolher;
> rolar é a alternativa) ou role de novo.

E isso é fiel ao próprio texto, que põe a escolha como método principal:
*"escolha um tipo apropriado à criatura em questão. **Alternativamente**, você
pode rolar na linha referente ao tipo da criatura"*.

---

## 4 · O que o bloco mostra

```
🦴 Recursos naturais            Construto Colossal · ND 14

Esta criatura já tem um recurso especial no tesouro: 1d6 engrenagens
(CD 29 para extrair; …). Pela regra, recurso natural é para quem ainda
não tem um — mas complementar ou substituir o tesouro é decisão sua.

Regra opcional de tesouro. Escolha o recurso apropriado à criatura, ou
role 1d6 na linha do Construto:
  1-2  🐚 Carapaça   couraças, lorigas, meias armaduras, completas, escudos pesados
    3  ✨ Fonte      itens esotéricos
    6  ⚙ Sucata     engenhocas e itens de metal
⚠ A linha do Construto deixa o 4 e o 5 sem recurso…

Quantidade   5 unidades (Colossal)
Extrair      1 hora · Sobrevivência ou um Ofício relacionado, CD 29 (15 + ND 14).
             Falhando, os recursos estragam.
Patamar      Campeão → T$ 500 para itens mágicos

[🎲 Rolar o recurso]   1d6 = 6 → ⚙ Sucata × 5 · T$ 2.500 em matéria-prima
                       para itens mágicos
📖 Ameaças de Arton, p. 401–402 · Tabelas 3-5 e 3-6
```

O 🎲 rola na linha certa, **destaca a faixa que saiu** na própria lista (em vez
de virar um texto solto) e multiplica o valor do patamar pelas unidades do
tamanho.

Três casos que o bloco trata à parte:

- **Criatura Minúscula** → o bloco aparece só para dizer que ela é *"muito
  pequena para produzir recursos"*. Sumir deixaria a dúvida de pé.
- **A ficha já tem recurso especial** → o aviso de cima. A regra diz que recurso
  natural é *"para qualquer criatura que já não possua um recurso especial"*, mas
  complementar ou substituir o tesouro é decisão do mestre, então é **pista, não
  trava**. A marca que denuncia é sempre a mesma na linha de Tesouro: a *"CD X
  para extrair"*.
- **ND S e S+** → não há número para somar. Em vez de inventar um, o bloco
  imprime *CD 15 + ND* e diz que ali o mestre define.

### Os dois recursos que a Tabela 3-6 não mede
O valor por patamar vale para a matéria-prima. **Ingrediente** serve
*"independente de seu patamar"* e **mantimento** se mede em refeições, não em
T$ — então o 🎲 não inventa um preço para eles: diz o que são.

---

## 5 · Onde mais isto aparece

Um grupo novo na sub-aba **👹 Regras de Ameaças** das Consultas: a regra inteira,
as duas tabelas e **um card por recurso** com o verbete do livro — dez cards.
Eles são montados do **mesmo** `js/recursos-naturais-data.js` que desenha o bloco
nas fichas: digitar a grade do d6 outra vez ali seria criar uma segunda verdade
para a mesma tabela.

Esses cards entram **nas duas páginas** (o `jogadores.html` também), porque são
consulta de regra. O bloco 🦴 na ficha, não: a aba 📕 Fichas Prontas é do mestre.

---

## 6 · Como foi conferido

**As 940 fichas dos quatro livros** passaram pelo módulo:

| Livro | Fichas | Com a regra resolvida |
|---|---:|---|
| Tormenta 20 | 80 | **80** |
| Ameaças de Arton | 430 | **429** |
| Deuses de Arton | 76 | **76** |
| Guia de NPCs | 94 | **94** (o parser resolve; o bloco não entra lá) |

A única que não resolve é o **Rival Espelho**, cujo tipo na ficha é literalmente
`"???"` — é o espelho do próprio grupo, e o livro não lhe dá tipo. O bloco
simplesmente não aparece nela, que é o certo.

Dois defeitos de leitura que a varredura achou e que foram consertados:

- **"Morta-viva (osteon) Média"** — a Rainha Euphana, no Guia de NPCs: o livro
  **flexiona o tipo em gênero**, e o teste só aceitava "Morto-vivo". Agora aceita
  os dois.
- **três fichas escrevem "Espirito" sem acento** — o parser normaliza antes de
  comparar, então as três caem na linha certa.

Mais:

- **as duas tabelas**, célula por célula, contra os comandos `TJ` do PDF;
- a distribuição do d6: **6 000 rolagens por linha**, e cada faixa saiu na
  proporção do tamanho dela (o vão do construto em ~2 000 de 6 000, que é
  exatamente 2 dos 6 números);
- a leitura de tipo e tamanho de todas as combinações que as fichas usam — por
  linha da Tabela 3-5 dá **170 humanoides, 141 monstros, 74 animais, 52
  mortos-vivos, 38 espíritos e 34 construtos**; por tamanho, **15 minúsculas (0
  unidades), 286 de 1, 181 de 2 e 27 de 5**;
- **111 fichas** já trazem recurso especial no Tesouro e recebem o aviso;
- as **7 fichas de ND S/S+** (Gatzvalith, Avatar de Aharadak, Sckhar,
  Kishinauros, Avatar de Kallyadranoch, Tarso e o Arquilich Ferren Asloth) caem
  no caminho do "15 + ND", sem CD inventada;
- no navegador: **429 blocos** desenhados na aba do Ameaças de Arton, o 🎲
  funcionando com o destaque na faixa, os dez cards de consulta nas duas páginas,
  e **nenhum erro no console**.

### Um defeito de layout que só o navegador mostrou
O card desta aba tem **~350px mesmo num monitor de 1536px** — a lista é uma grade
de várias colunas. A grade de três colunas que eu havia escrito dava **66px** para
a coluna da matéria-prima: o texto ficava com 122px de altura e **transbordava na
horizontal**. E a `@media (max-width: 560px)` nunca ia salvar, porque ela mede a
**janela**, não o card.

Consertado com **consulta de contêiner**: o padrão são duas colunas (o d6 e o
nome, com a matéria-prima descendo uma linha), e as três colunas só entram
`@container fp-recursos (min-width: 30rem)`. A faixa caiu de 132px para 69px de
altura e o transbordo acabou.

> **Para a próxima vez:** nesta aba, `@media` por largura de janela não diz nada
> — o card é estreito de qualquer jeito. Quem mede é `@container`.

---

## 7 · O que mudou no projeto

| Arquivo | O que |
|---|---|
| `js/recursos-naturais-data.js` | **novo** — os 7 recursos, a Tabela 3-5 (com o vão do construto), a Tabela 3-6, a quantidade por tamanho, o patamar e a CD por ND, o sorteio e a detecção de recurso especial |
| `js/fichas-prontas.js` | `blocoRecursos()` no card de cada ficha e `rolarRecurso()` no 🎲 |
| `js/ameacas-data.js` | o grupo novo de dez cards de consulta, montado do mesmo módulo |
| `css/fichas-prontas_style.css` | o bloco `.fp-rn-*`, com a consulta de contêiner |
| `index.html` · `jogadores.html` | a tag do script novo |

O patamar vem da tabela de patamares da ⚗ Criar Ameaça (`GA_CRIAR_AMEACA.ND_PATAMAR`)
quando ela está carregada, para existir uma verdade só; o módulo tem um fallback
próprio para as páginas que não a carregam.

Nada aqui toca o Firebase, e nada muda em ficha de jogador.

---

## 8 · O que ficou de fora

- **Rolar o recurso não escreve nada em lugar nenhum.** O resultado aparece ao
  lado do botão e vai embora quando o card fecha — é consulta, como o resto da
  aba. Se um dia valer levar o recurso para o tesouro de uma cena da ⚔ Combates,
  é outra leva, e o caminho já existe (o `⚔ Enviar para o combate` do mesmo card).
- **O recurso não entra no "📋 Copiar texto"**, que leva o statblock como o livro
  imprime. Misturar uma regra opcional ali estragaria a cópia fiel.
- **O gerador de 🎁 Recompensas não ganhou um rolador solto** — foi a opção que
  ele não escolheu. Para uma criatura inventada na ⚗ Criar Ameaça, o caminho
  continua sendo o Passo 7 de lá, que já calcula a CD 15 + ND.
