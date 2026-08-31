# "Como Modificar Criaturas" e "Como Criar Bandos" na aba ⚗ Criar Ameaça

Feito em **2026-08-31**. Fonte: *Ameaças de Arton*, Capítulo 2, **p. 387–389**
— as duas seções que o manual traz depois dos oito passos. O texto delas já
estava transcrito em `js/criar-ameaca-manual.js` (`MODIFICAR` e `BANDOS`);
o que faltava era a oficina, e é ela que este documento descreve.

## A ideia central

> "Compare as estatísticas de sua criatura com as listadas na linha de seu
> papel e ND na Tabela 2-3. Para cada estatística, verifique se o valor
> dela está de acordo com a tabela, acima ou abaixo, e **anote as
> diferenças** […] modifique as estatísticas de sua criatura para as do
> novo ND e **mantenha as diferenças**."

Era isso que a aba não sabia fazer. O campo `ajustes` já guardava desvios
**em ND** (±1, ±2 — o Passo 3). Faltava um segundo tipo de delta, **em
pontos**, porque a diferença de uma criatura-base quase nunca cai exatamente
numa linha vizinha da tabela.

## O modelo de dados

Em `nova()` e `normalizar()` de `js/criar-ameaca.js`:

```js
modo: 'nova',   // 'nova' | 'modificada' | 'bando'
base: null,     // { livro, chave, nome, nd, papel, tamanho, lidos, avisos }
deltas: null,   // desvio em PONTOS da linha do ND da criatura-base
bando: null,    // { quantidade, faixa, multAplicado, habsMult, tamanhoAplicado }
```

`stats()` passou a ter **três camadas**, nesta ordem:

1. a linha da Tabela 2-3 do papel e do ND;
2. o ajuste de ±1/±2 ND do Passo 3 (anda na tabela, sem sair dela);
3. o delta em **pontos** herdado da criatura-base.

`base.lidos` guarda as estatísticas da criatura-base como **fato**, e não
como conta: num bando, o delta de dano é reescrito contra a linha do ND
novo, e aí não dá mais para reconstruir o valor original de trás para a
frente.

## De onde vem a criatura-base

Duas portas, no modal que os botões **🔧 Modificar…** e **👥 Bando…** abrem:

1. **Fichas prontas** — os bestiários de `js/fichas-prontas.js`, com busca
   por nome. Ficha sem `papel` no livro (o Rival Espelho) mostra os três
   botões de papel na própria linha: sem papel não há linha da tabela para
   comparar, e sem comparação não há diferença nenhuma para anotar.
2. **Minhas ameaças** — qualquer ameaça já criada na aba.

Também dá para chamar de fora: `window.GA_CriarAmeaca.modificar(livro,
chave)` e `.bando(livro, chave)`. É o gancho para um dia pôr um botão
"🔧 Modificar esta criatura" dentro da aba 📕 Fichas Prontas.

### Quem lê a ficha

`parsearFicha()` do `monstros.js`, exportado como `window.GA_Monstros.lerFicha`
— o mesmo que já lê as 585 fichas para a aba ⚔ Combates. Ele devolve a
criatura no formato *daquela* aba, que guarda ataques e habilidades como
texto corrido; aqui elas precisam vir separadas campo a campo, e é só essa
separação que o `lerFichaBase()` acrescenta — usando o **mesmo**
reconhecedor de nome de habilidade do `statblock.js` (`RE_HABILIDADE` e
`RE_HAB_SIMPLES`, agora exportados).

A separação de ataques foi a parte que mais custou; a varredura das 509
fichas com papel achou tudo isto:

- **vários ataques na mesma linha**, colados por `" e "` com a segunda em
  minúscula (`"Mordida +18 (1d10+12) e duas garras +18 (1d8+12)"`) — o corte
  só vale onde os dois lados têm bônus próprio, senão `"Garras e presas"`
  viraria dois ataques;
- **bônus diferente por ataque** (o urso-coruja morde a +16 e arranha a
  +15) → campo `ajusteAtaque`, em pontos sobre o valor da criatura;
- **dano extra grudado sem vírgula** (`"3d8+24 mais 4d6 ácido"` do bulette,
  contra `"1d8+10 impacto, x2, mais 1d8 ácido"` do dejeto) — o livro usa as
  duas formas, e o campo `extraColado` faz a ficha voltar como entrou;
- **prosa depois do dano** (`"(3d8+6 trevas). Uma criatura viva atingida
  deve fazer…"` da Aparição) → campo `depois`, sem o qual o ataque inteiro
  não casava e **sumia**;
- **o `+` separado do número** (`"mordida + 26"` do gnoll) e **colado ao
  nome** (`"Adaga+12"` do pistoleiro): duas tentativas de regex, e a ordem
  importa — exigir espaço antes do sinal é o que impede o `+1` de
  `"1d4+1 tentáculos +17"` (o tigre-de-hyninn conta os tentáculos com um
  dado) de virar o bônus de ataque;
- **decimal dentro da vírgula** (`"alcance 4,5m"` do otyugh).

## O que a oficina faz sozinha

**Modificar** (p. 387):

- **Passo 3** ganha três colunas por estatística: `base ➜ linha do ND novo ➜
  diferença`, com a diferença **editável**.
- **Passo 5** aplica *"aumente ou diminua a quantidade de habilidades apenas
  se o novo ND resultar em patamar diferente"*: mesmo patamar, a cota
  some e no lugar dela entra o aviso de **trocar** habilidades.
- **Passo 6**: as perícias se recalculam sozinhas (metade do ND), e a aba
  **avisa** quando o bônus de treinamento cruza ND 7 ou 15.

**Bando** (p. 387–389), os itens do roteiro que viraram controle:

| Item | O que a aba faz |
|---|---|
| 1) Composição | campo de texto livre, só descritivo |
| 2) e 3) ND e tamanho | três faixas prontas do livro; um clique põe o ND no meio da faixa e sobe o tamanho |
| 4) Estatísticas | tabela do ND novo + deltas da base |
| 4) Dano | dano da base × patamar subido (×2/×4/×6), recalculado do original a cada mudança de ND |
| 5) Habilidades | insere **Bando**; o dano do texto das habilidades multiplica no botão "✖ Refazer", e o painel avisa quando ele fica para trás do ND |
| 6) Perícias | metade do ND, mais o ajuste de Furtividade pelo tamanho |
| 7) Tesouro | CD de extração recalculada; nota lembrando de aumentar as quantidades |

E a marca `[Bando]` na linha de ataque, como o livro imprime.

### A costura que o livro escreve por extenso

Ao mudar o ND ou o tamanho, quatro números que moram **dentro do texto** não
se recalculariam sozinhos. `fotoDerivada()` tira uma foto do estado antes,
e `sincronizarDerivada()` acerta:

- a **CD das habilidades** (`"Ref CD 16 evita"` → `"CD 20"`);
- a **CD para extrair** do tesouro, que é outra conta (15 + ND);
- a **observação da perícia** (`"+14 para nadar"` → `"+15"`), deslocada pela
  mudança da própria perícia;
- o **teste de manobra** dentro da habilidade (`"(teste +13)"` → `"+21"`),
  deslocado pelo valor de ataque **mais** o modificador de manobras do
  tamanho novo — a soma dos dois é exatamente o que o livro faz.

## O teste que fechou

`lerFicha` + `derivar` no aquin'ne (lacaio ND 2, p. 88) reproduzem o
**Cardume de Aquin'ne** da p. 389:

| | livro | aba |
|---|---|---|
| Tipo e tamanho | Espírito (elemental) Médio | ✓ |
| Defesa / Fort / Ref / Von | 23 / +14 / +11 / +6 | ✓ |
| Ataque | +19 | ✓ |
| Dano | 4d4+12 | ✓ |
| CD | 20 | ✓ |
| Perícias | Atletismo +7 (+15 para nadar), Furtividade +3 (+13 na água) | ✓ |
| Teste de agarrar | +21 | ✓ |
| Habilidade | perde 10 PV (Ref CD 20 evita) | ✓ |
| Tesouro | CD 20 para extrair | ✓ |
| **Pontos de Vida** | **40** | **47** |

### O PV é um deslize do livro, não da aba

Conferido no PDF: o aquin'ne tem **21 PV** (p. 91) onde a linha lacaio ND 2
pede **14** (p. 385) — uma diferença de **+7**. O cardume impresso tem
**40 PV**, que é a linha lacaio ND 5 **crua**, sem os +7. Ou seja: o livro
manda *"para as demais estatísticas de combate, basta repetir esse
processo"*, carrega a diferença no ataque (+19, não +20), nas resistências
(+14, não +16) e na CD — e **não** carrega no PV.

A aba segue a regra escrita e dá 47. A diferença fica à vista na coluna de
pontos do Passo 3 (`21 ➜ 40 ➜ +7 = 47`); quem quiser os 40 do livro põe
`0` naquele campo, ou clica em "↺ Zerar as diferenças".

O bulette confirma a regra por outro lado: o livro diz que ele *"tem Defesa
32, 1 ponto acima da Defesa de uma criatura de seu tipo e ND"*, e é
exatamente `+1` que a aba anota ao lê-lo.

## A varredura das 509 fichas

Derivar sem mudar o ND tem de devolver a ficha **igual**. Resultado:

| Linha | Fora |
|---|---|
| Defesa (Defesa, Fort, Ref, Von + defesas especiais) | **0 de 509** |
| Pontos de Vida | 2 — e as duas são o livro se contradizendo (o Dragão-Rei imprime "1400" onde todo mundo imprime "3.700"; a Aparição cola PV e Deslocamento na mesma linha) |
| Linha de ataque | 6 — erro de digitação do livro sendo normalizado ("Adaga+12" ganha espaço, "+ 26" perde) e uma reordenação de crítico |
| Atributos | 48 — todas o mesmo caso: `Int —` |

O `Int —` (criatura sem mente) não tem como caber num campo numérico. A aba
**avisa na tela** quando isso acontece, em vez de trocar em silêncio.

## Onde ficou

| Arquivo | O quê |
|---|---|
| `js/criar-ameaca.js` | o modelo, o leitor, os deltas, as contas de bando, o modal, o painel e a grade de três colunas |
| `js/criar-ameaca-data.js` | `BANDO_DANO_MULT`, `BANDO_FAIXAS`, `multBando()` |
| `js/monstros.js` | exporta `GA_Monstros.lerFicha` (o `parsearFicha`) |
| `js/statblock.js` | exporta `RE_HABILIDADE` e `RE_HAB_SIMPLES` |
| `css/criar-ameaca_style.css` | cartão da base, faixas do bando, grade de três colunas, lista do modal |

## Lembretes que valem para qualquer edição nesta aba

- `<article>`, nunca `<section>` aninhada (some).
- `<div>`, nunca `<header>` aninhado (ganha as faixas do masthead).
- Negativo é EN DASH `–` (U+2013), não `−` (U+2212).
- Todo `<details>` novo precisa de `id` — é por ele que o `render()`
  devolve o que estava aberto.
