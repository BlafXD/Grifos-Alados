# A perícia que não está na ficha da criatura — 4 de outubro de 2026

**Pedido dele:** "preciso de uma nota nas fichas das criaturas do mestre no bloco de
perícias, pois existe uma regra que: se a criatura precisar rolar uma perícia que
não está na ficha tem um cálculo para saber qual seria o bônus (se eu não me engano
é: '10 + 1/2 ND + Atributo', algo assim…)".

## A regra, conferida no PDF

Quase: **o 10 não entra**. A regra está no Passo 6 do manual de criar ameaças
(**Ameaças de Arton, p. 384** — "Estatísticas Secundárias"), e é literal:

> "As estatísticas secundárias de uma ameaça são seus valores de atributo e suas
> perícias (incluindo Iniciativa e Percepção). […] eles poderão ser importantes caso
> a ameaça precise fazer um teste de atributo, e também para definir **as perícias
> não listadas em sua ficha (que, quando aplicáveis, possuem modificador igual à
> metade do ND da criatura + seu atributo-chave, como normal)**."

Ou seja: **½ ND + atributo-chave**, e mais nada.

**Quatro detalhes que a nota precisa carregar, porque o livro os impõe:**

1. **Sem bônus de treinamento.** O +2/+4/+6 é das perícias **treinadas**, e uma
   perícia que não está na ficha não é treinada.
2. **A metade do ND arredonda para baixo.** Quem prova isso é o exemplo do próprio
   livro (Capítulo 1, "Luta e Pontaria"): o **ogro caçador de ND 7** atira com
   **+3** — "metade do ND 7 + Destreza 0". 7 ÷ 2 = 3, não 4.
3. **As perícias que EXIGEM treinamento a criatura simplesmente não rola** — é o
   "quando aplicáveis" do texto. São 11: Adestramento, Atuação, Conhecimento,
   Guerra, Jogatina, Ladinagem, Misticismo, Nobreza, Ofício, Pilotagem e Religião.
4. **Luta e Pontaria são à parte:** valem o **ataque listado**, e uma criatura com
   um ataque é sempre treinada na perícia correspondente. Sem ataque daquele tipo e
   sem a perícia na lista, ela não é treinada (e cai na conta acima).

E o **ND S e S+ conta como ND 20** para o que não está listado (Ameaças de Arton,
p. 12) — é o que a nota usa.

## O que apareceu na tela

Na ficha de cada criatura da aba **⚔ Combates**, logo abaixo da caixa **Perícias**,
uma linha só:

```
ℹ PERÍCIA FORA DA LISTA   metade do ND +3 + o atributo-chave:
   [For +7] [Des +3] [Con +6] [Int +1] [Sab +3] [Car +2]
   sem bônus de treinamento; as que exigem treino ela não rola;
   Luta e Pontaria valem o ataque listado.
```

A nota **faz a conta**: lê o **ND** do cabeçalho e a caixa **Atributos** da própria
ficha e mostra o valor pronto de cada atributo-chave. No meio do combate o mestre
precisa do número, não do parágrafo — então a regra inteira, a página e as perícias
de cada atributo ficam nas **nuvens de mouse** (o ℹ, cada pílula, e os dois trechos
sublinhados).

- Pílula **apagada com "?"**: falta o ND, ou aquele atributo não está escrito na
  linha de Atributos.
- A nuvem de cada pílula lista as perícias daquele atributo que a criatura **pode**
  rolar sem treino (fora as que já têm linha própria no statblock: Iniciativa,
  Percepção, Fortitude, Reflexos e Vontade).
- Digitar o ND ou os Atributos **refaz a nota na hora**, sem redesenhar a ficha (um
  redesenho tiraria o foco do campo a cada tecla — a mesma razão do `mas-guardas`).

## Onde isso mora

- `js/monstros.js`: `notaPericiasHtml(cr)` e a dupla que lê a ficha
  (`_atributosDaCriatura`, `_ndDeNaoListadas`); o `atualizarNotaPericias()` que
  refaz a linha ao digitar; a nota entra pela volta das `CAIXAS`, no `cx.chave ===
  'pericias'`.
- As perícias e os seus atributos-chave vêm de `window.GA_CRIAR_AMEACA.PERICIAS`
  (a Tabela 2-1, já conferida para a aba ⚗ Criar Ameaça) — ninguém digitou a lista
  duas vezes. Sem essa base carregada, a nota aparece sem as nuvens de perícia.
- `css/monstros_style.css`: `.mz-per-nota` e as pílulas.

## Armadilha (custou uma rodada)

`new RegExp('\b' + ...)` — a contrabarra escrita por ferramenta **vira um
caractere** (backspace, U+0008), e a expressão nunca casava: os seis atributos
saíam "?" com o ND certo ao lado. O conserto foi usar **literal de regex**
(`/\b(for|des|con|int|sab|car)[a-zà-ÿ]*\s*([+\-–—−]?\s*\d+)/gi`), onde o escape é o
que parece ser. Vale a mesma lição já anotada em memória sobre `\u`.

A classe de letras é `[a-zà-ÿ]` e não `[a-z]`: sem isso, "Constituição" e
"Inteligência" (quem escreve o atributo por extenso) ficavam de fora, porque a
busca parava no "ã" e no "ê".

## Testado (servidor local, Firebase desligado)

| Criatura | ND | Conta | Resultado |
|---|---|---|---|
| Ogro Caçador (For 4, Des 0, Con 3, Int –2, Sab 0, Car –1) | 7 | ½ ND +3 | For +7 · **Des +3** · Con +6 · Int +1 · Sab +3 · Car +2 ✔ (bate com o +3 de Pontaria do livro) |
| Dragão Vermelho (For 11 … Car 4) | 16 | ½ ND +8 | For +19 · Des +9 · Con +16 · Int +12 · Sab +12 · Car +12 ✔ |
| Ratazana (For –1, Des 2 …) | 1/2 | ½ ND +0 | For –1 · Des +2 · Con +0 · Int –4 · Sab +1 · Car –3 ✔ |
| Soberano (For 10 … Car 8) | S | ½ ND +10 | For +20 · Des +15 · Con +19 · Int +16 · Sab +16 · Car +18 ✔ (S = ND 20) |
| sem ND e sem atributos | — | "metade do ND" | seis pílulas "?" apagadas, sem conta inventada ✔ |
| digitar ND 7 → 15 | | | a conta vai a +7 e as seis pílulas se refazem, **sem perder o foco** ✔ |
| digitar a linha de Atributos | | | as pílulas acompanham letra por letra ✔ |
| console | | | sem erro ✔ |
