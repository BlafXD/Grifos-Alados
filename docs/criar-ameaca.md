# ⚗ Criar Ameaça — o Manual de Criação de Ameaças virou aba

Aba nova do mestre (`index.html` → `⚗ Criar Ameaça`), com o
**Manual de Criação de Ameaças** de *Ameaças de Arton*
(Capítulo 2 — Regras Avançadas de Ameaças, **p. 377–387** do livro;
p. 379–389 do PDF), transcrito do PDF oficial e com as tabelas aplicadas
sozinhas.

## O que a aba tem

Três sub-abas:

| Sub-aba | O que é |
|---|---|
| **🛠 Oficina** | Os oito passos do livro, um painel cada, com as contas prontas. Em cima, a barra **📜 Minhas ameaças** (adicionar, abrir, duplicar, remover, backup, importar). À direita, a ficha montando-se em tempo real. |
| **📖 O manual inteiro** | O texto corrido dos oito passos, os quadros laterais, "Como Modificar Criaturas", "Como Criar Bandos" e os dois exemplos do livro (Dejeto Vivo e Cardume de Aquin'ne) com as fichas impressas. |
| **📊 Tabelas** | Tabela 2-3 A/B/C (com a linha do ND atual destacada), 2-2, 1-1, 2-4, 3-2 (Tormenta20 p. 143), perícias e funções. |

Cada passo da Oficina tem um `📖 O que o livro diz` que abre o texto
literal daquele passo — a regra fica ao lado do controle, não noutra aba.

## O que ele calcula sozinho

- **Passo 1** — tamanho dá espaço ocupado, Furtividade/manobras e o dado
  de arma natural; o deslocamento sai da **Tabela 2-2** por forma
  (bípede/quadrúpede), porte e ritmo. Deslocamento especial que **não** é
  a forma principal de movimento sai 3m menor que o terrestre.
- **Passo 3** — Defesa, PV, ataque, dano médio, CD e as três resistências
  vêm da **Tabela 2-3**, na seção do papel. Cada estatística tem um
  seletor **±1 / ±2 ND** (o "ajustar para o valor de 1 ou 2 níveis de
  desafio a mais ou a menos" do livro), e a aba escreve embaixo *"como
  ND 5"*. As três resistências são distribuídas entre Fortitude, Reflexos
  e Vontade em três seletores.
- **Passo 4** — divide o dano médio pelos golpes por rodada
  (arredondando **para cima**, como o livro), e o botão **🎯 Fechar o
  dano** acha o bônus que bate o alvo. Os botões **− / +** sobem e descem
  passos na escada da Tabela 3-2 e reajustam o bônus junto. Ataque
  marcado como *complementar* usa a linha de 2 ND abaixo e sai da conta.
- **Passo 5** — a cota de habilidades do patamar (1 a 2 por patamar para
  solo/lacaio, 2 a 3 para especial) e a CD da criatura. A biblioteca traz
  as **27 habilidades gerais do Capítulo 1** (p. 15–17); um clique põe o
  texto na ficha já com o ND e a CD desta criatura.
- **Passo 6** — a categoria de cada atributo (Tabela 2-4) e o valor de
  cada perícia: `metade do ND + atributo-chave + treinamento + extra`,
  com o treinamento mudando em ND 7 e 15.
- **Passo 7** — CD para extrair recurso = 15 + ND.

Os avisos ao pé da ficha são conferências que o próprio manual pede:
dano fora da faixa, habilidades acima da cota do patamar, deslocamento
abaixo de 6m ou acima de 18m, e quantas estatísticas estão fora da linha
do ND ("compense aumentos com reduções equivalentes").

## As nuvens 📖 (referências a outras páginas e livros)

Onde o manual manda consultar outro lugar, o trecho vira uma nuvem de
regra (`span.ga-tip`, a mesma do resto do site): **passar o mouse mostra
a regra ali mesmo**; clicar fixa a nuvem para copiar. São 18 verbetes,
copiados da página que o livro cita:

`papeis` (p. 12) · `tipos` (p. 13–14) · `tamanhos` (Tabela 1-1, p. 13) ·
`desl-especiais` (p. 15) · `nd-s` (p. 12) · `extrair-recurso` (p. 13) ·
`hab-bando` (p. 15) · `hab-magias` (p. 16) · `hab-magica` (p. 384) ·
`cap1-habilidades` · `dano-por-tamanho` · `apendice-a` ·
`chefe-final` (p. 368) · `t20-patamares` (T20 p. 35) ·
`t20-dano-armas` (T20 p. 143) · `t20-pericias` (T20 p. 114) ·
`t20-mergulhar` (T20 p. 238) · `t20-tesouro` (T20 cap. 8).

No texto do manual a marca é `[[chave|trecho visível]]`; quem converte é
o `marcarRefs()` do `criar-ameaca.js`.

## Como a Tabela 2-3 foi conferida

No PDF, as Tabelas 2-3 **A** e **C** saem com a coluna de ND desalinhada
das linhas de números (o selo de ND é caixa gráfica, o mesmo problema já
registrado nas conferências de ND). A ordem foi fechada por quatro
âncoras do próprio texto do manual:

1. "ND 1/4, para a qual o dano médio é 8" → linha 1 = ND 1/4.
2. "monstro solo de ND 4 … valor de +16 … dano médio 24" → linha 6 = ND 4.
3. "ameaça solo de ND 11, o que indica Defesa 41" → linha 13 = ND 11.
4. A ficha-exemplo do **dejeto vivo** (solo ND 6): ataque +20, dano 56,
   Defesa 27 (reduzida para 24 = ND 5), PV 240 (aumentado para 280 =
   ND 7), resistências 18/12/6, CD 22.

A Tabela 2-3 **B** (lacaios) já sai alinhada no `pdftotext -layout`, e
bate com a ficha do **cardume de aquin'ne** (lacaio ND 5): Defesa 23,
PV 40, Ref +11 (média), Von +6 (fraca), CD 20.

**Teste que fecha a aba:** montar o dejeto vivo pelos oito passos e
comparar a ficha gerada com a impressa na p. 386. Foi feito, e sai
idêntica linha a linha — inclusive `Deslocamento 6m (4q), escalada 6m
(4q), natação 6m (4q)` e `Tesouro Padrão (exceto itens alquímicos), 1d6
doses de ácido (CD 21 para extrair)`.

## Arquivos

| Arquivo | O que guarda |
|---|---|
| `js/criar-ameaca-data.js` | As tabelas fechadas: 2-3 A/B/C, 2-2, 1-1, 2-4, 3-2, tipos, papéis, patamares, funções, perícias, armas naturais, tesouros. |
| `js/criar-ameaca-manual.js` | O texto do manual (abertura, oito passos, quadros, modificar, bandos, dois exemplos), a biblioteca de habilidades gerais e as 18 referências das nuvens. |
| `js/criar-ameaca.js` | A aba: contas, oficina, CRUD, statblock e prévia. |
| `css/criar-ameaca_style.css` | Estilo da aba. Traz também duas melhorias na nuvem compartilhada (`white-space: pre-line` e `max-height` no `.ga-tip-pop-txt`), porque as regras trazidas de outros livros têm parágrafos e são longas. |

Três armadilhas que custaram um teste cada:

- **`<section>` aninhada some.** O `style.css` tem `section { display: none }`
  (só `section.active` aparece), então os painéis de passo tiveram que
  virar `<article>`.
- **`<header>` aninhado ganha as faixas do masthead.** O `style.css`
  desenha `::before`/`::after` listrados em qualquer `<header>` — o
  cabeçalho de cada passo é `<div>`.
- **O traço do negativo é o EN DASH `–` (U+2013), não o sinal de menos
  `−` (U+2212).** É o que as fichas dos livros usam em `js/fichas-*-data.js`
  e o único que o `parsearFicha()` do `monstros.js` reconhece. Com o
  U+2212 a linha `Von −1` chegava **vazia** na aba Combates — sem erro
  nenhum, só um campo em branco.

## Ponte para a aba Combates

O botão **➜ Combates** da prévia manda a ficha para o bestiário pela
API nova `GA_Monstros.inserirFichaTexto(texto, { papel, sessao })`
(`js/monstros.js`), que usa o mesmo `parsearFicha()` do "📋 Importar do
livro". Sem cena narrada, a criatura cai numa sessão **⚗ Ameaças
criadas**.

## Onde os dados ficam

`localStorage['grifosAlados.criarAmeaca']` =
`{ criaturas: [...], atual: '<id>' }`. Nada vai para o Firebase — é
ferramenta de mestre, e a aba **não existe no `jogadores.html`**.
O botão **⬇ Backup (.json)** baixa a coleção inteira e o **⬆ Importar**
acrescenta (nunca sobrescreve: cada ficha importada ganha id novo).

## O que ficou de fora — e é a próxima tarefa

**"Como Modificar Criaturas"** e **"Como Criar Bandos"** estão no manual
(sub-aba 📖) mas **não são automatizados**. Combinado com o Caique em
2026-08-31: fica para a tarde. O plano está em
[`criar-ameaca-modificar-e-bandos.md`](criar-ameaca-modificar-e-bandos.md).
