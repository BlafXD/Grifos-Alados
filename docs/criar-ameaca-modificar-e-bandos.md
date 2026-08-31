# Plano: "Como Modificar Criaturas" e "Como Criar Bandos" na aba ⚗ Criar Ameaça

Combinado com o Caique em **2026-08-31**, para fazer na tarde do mesmo dia.
Fonte: *Ameaças de Arton*, Capítulo 2, **p. 387–389** — as duas seções que
o manual traz depois dos oito passos. O texto delas **já está transcrito**
em `js/criar-ameaca-manual.js` (`MODIFICAR` e `BANDOS`), com o exemplo do
cardume de aquin'ne. Falta a *oficina*: hoje elas só se leem.

## Por que não entrou junto com os oito passos

Os oito passos partem do zero: papel + ND dão todos os números. Estas duas
partem de uma **criatura-base** e trabalham com a **diferença** entre a
ficha dela e a linha da Tabela 2-3 — é um segundo modelo de dados, não uma
conta a mais. É essa diferença que o livro manda **preservar** ao mudar o
ND.

## A ideia central (vale para as duas)

> "Compare as estatísticas de sua criatura com as listadas na linha de seu
> papel e ND na Tabela 2-3. Para cada estatística, verifique se o valor
> dela está de acordo com a tabela, acima ou abaixo, e **anote as
> diferenças** […] modifique as estatísticas de sua criatura para as do
> novo ND e **mantenha as diferenças**."

Exemplo do livro: animal solo de ND 2 com ataque +14 está 2 acima do
padrão; ao virar ND 5, o ataque vira **+19** (2 acima dos +17 do ND 5).

Isso já existe meio pronto no código: o campo `ajustes` da criatura guarda
deltas **em ND** (±1, ±2). O que falta é um segundo tipo de delta, **em
pontos**, porque a diferença da criatura-base raramente cai exatamente numa
linha vizinha da tabela.

## Passo 1 — o modelo de dados

Acrescentar à criatura (em `nova()` e `normalizar()` de `js/criar-ameaca.js`):

```js
base: null,        // { livro, chave, nome, nd, papel } — de onde veio
deltas: null,      // { defesa: +1, ataque: +2, pv: -20, … } em PONTOS
modo: 'nova',      // 'nova' | 'modificada' | 'bando'
bando: null,       // { quantidade: '8 a 12', ndBase: '2', patamaresSubidos: 1 }
```

`deltas` e `ajustes` convivem: primeiro a linha da Tabela 2-3 do novo ND,
depois `ajustes` (±ND, do Passo 3), depois `deltas` (pontos herdados da
base). Ou seja, em `stats()`:

```
valor = tabela[papel][ndComDelta(nd, ajustes[k])][k] + (deltas[k] || 0)
```

Cuidado: `stats()` hoje devolve `<chave>Nd` para a etiqueta "como ND 5".
Com `deltas` ativo a etiqueta passa a ser "ND 5 +2" — ajustar o
`atualizarCalculos()` junto.

## Passo 2 — de onde vem a criatura-base

Duas portas, nesta ordem de esforço:

1. **Das minhas ameaças** — escolher outra criatura já criada nesta aba.
   Trivial: os campos já estão no formato certo.
2. **Das Fichas Prontas** — `window.GA_FichasProntas` (`js/fichas-prontas.js`)
   dá `livros()` e `ficha(livro, chave)`; o texto do statblock passa pelo
   parser. **Não reescrever o parser:** usar o `parsearFicha()` que já vive
   no `monstros.js` — hoje ele é privado, então exportá-lo em
   `window.GA_Monstros` (do mesmo jeito que foi feito com
   `inserirFichaTexto`) e ler dali Defesa, Fort/Ref/Von, PV, ataque e CD.

Com a ficha-base lida, calcular os `deltas` é uma subtração contra
`parametros(papelBase, ndBase)`.

> **Atenção ao papel:** as fichas dos livros trazem `papel` (foi lido do
> desenho do ícone do PDF — ver `docs/conferencia-*.md`), mas o Rival
> Espelho de *Ameaças de Arton* não tem. Sem papel, não dá para calcular
> delta nenhum: pedir o papel ao mestre antes.

## Passo 3 — a tela de "Modificar"

Uma quarta sub-aba, **🔧 Modificar**, ou um modo dentro da Oficina (prefiro
o modo: reaproveita os oito passos inteiros). Ao ligar o modo:

- **Passo 0** vira "Novo Conceito" — o texto do livro já está em
  `MODIFICAR.blocos`.
- **Passo 2** (ND) ganha, ao lado, o ND da base e uma faixa mostrando
  quantos patamares subiu.
- **Passo 3** mostra três colunas por estatística: `base → tabela do novo
  ND → resultado`, com o delta em pontos visível e editável.
- **Passo 5** aplica a regra: *"aumente ou diminua a quantidade de
  habilidades apenas se o novo ND resultar em patamar diferente do
  original. Caso contrário, o melhor é trocar habilidades."* → se o patamar
  não mudou, avisar em vez de cobrar a cota nova.
- **Passo 6** aplica: *"modifique cada perícia em um valor igual à metade
  da mudança no ND"* → `Math.floor((ndNovo − ndBase) / 2)` somado em cada
  perícia, e **avisar quando o bônus de treinamento mudar de faixa**
  (as viradas são em ND 7 e ND 15 — `D.bonusTreinamento()` já sabe disso).

## Passo 4 — a tela de "Bando"

Os oito passos do livro (p. 387–389), na ordem:

1. **Composição** — campo de texto livre ("oito a doze aquin'ne"). Só
   descritivo, sem efeito de regra.
2. **ND** — sugerir pela quantidade: bando de ~10 = ND base **+2 a +4**;
   dezenas ou ~100 = **+6 a +8**. Botões com essas faixas prontas.
3. **Tamanho** — automático: 10 criaturas = **+1 categoria**; 100 = **+3
   categorias**, com teto em Colossal. `D.TAMANHOS` está ordenado por
   `ordem`, então é `TAMANHOS[Math.min(5, ordem + n)]`.
4. **Estatísticas** — a mesma conta de "Modificar" (tabela do novo ND +
   deltas da base), **exceto dano**.
5. **Dano** — a regra própria do bando: mesmo patamar → **dano igual ao da
   base**; subiu 1 patamar → **×2**; 2 → **×4**; 3 → **×6**. E *magias não
   entram na multiplicação*. Multiplicar a quantidade de dados e o bônus
   (o cardume vira `4d4+12`, o dobro de `2d4+6`).
6. **Habilidade Bando** — inserir automaticamente (já está na biblioteca do
   Passo 5, `M.HABILIDADES_GERAIS`, grupo "Variadas"); e o marcador
   `[Bando]` na linha de ataque, como o livro imprime:
   `Corpo a Corpo [Bando] Tentáculo hídrico x2 +19 (4d4+12 corte).`
7. **Perícias** — mesma regra do "Modificar" (metade da mudança de ND).
8. **Tesouro** — manter a categoria, mas usar a linha do ND do bando;
   aumentar quantidades e **recalcular a CD de extração** pelo novo ND
   (`cdExtrair()` já faz).

## O teste que fecha

O mesmo método dos oito passos: **reproduzir o exemplo do livro**.
Partir do **aquin'ne** (lacaio ND 2, Pequeno, ataque +13 — *1 abaixo* dos
+14 da tabela) e chegar no **Cardume de Aquin'ne** impresso na p. 389:

```
Cardume de Aquin’ne ND 5
Espírito (elemental) Médio
Defesa 23, Fort +14, Ref +11, Von +6
Pontos de Vida 40
Corpo a Corpo [Bando] Tentáculo hídrico x2 +19 (4d4+12 corte).
Perícias Atletismo +7 (+15 para nadar), Furtividade +3 (+13 na água).
Tesouro 2d4 doses de éter elemental (frio) (CD 20 para extrair).
```

Os números da linha lacaio ND 5 já foram conferidos: `[20, 56, 23, 16, 11,
6, 40, 20]`. O ataque **+19** é o `20 − 1` do delta herdado, e é
exatamente esse "−1" que o modelo de `deltas` precisa reproduzir. A ficha
do aquin'ne está na p. 88 do livro (`RPG/Tormenta 20/Livros/T20 - Ameaças
de Arton.pdf`, página 90 do PDF) — extrair com `pdftotext -layout`.

## Onde mexer

| Arquivo | O quê |
|---|---|
| `js/criar-ameaca.js` | `nova()`/`normalizar()` (campos novos), `stats()` (somar `deltas`), telas de Modificar e Bando, avisos das regras de patamar. |
| `js/criar-ameaca-manual.js` | Nada — o texto de `MODIFICAR` e `BANDOS` já está lá. |
| `js/criar-ameaca-data.js` | Talvez uma tabela de multiplicador de dano por patamar subido (×2/×4/×6) e as faixas de ND/tamanho por quantidade. |
| `js/monstros.js` | Exportar `parsearFicha` em `window.GA_Monstros` para ler a ficha-base das Fichas Prontas. |
| `css/criar-ameaca_style.css` | A grade de três colunas `base → tabela → resultado` do Passo 3. |

## Lembretes que valem para qualquer edição nesta aba

- `<article>`, nunca `<section>` aninhada (some).
- `<div>`, nunca `<header>` aninhado (ganha as faixas do masthead).
- Negativo é EN DASH `–` (U+2013), não `−` (U+2212).
- Todo `<details>` novo precisa de `id` — é por ele que o `render()`
  devolve o que estava aberto.
