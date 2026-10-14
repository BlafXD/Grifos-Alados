# Ferramenta e vestuário superiores — a quarta categoria

**Data:** 14 de outubro de 2026.
**Pedido dele:** *"Finalize todas as pendências numa só leva."*
**O que isto fecha:** a última linha aberta do mapa das melhorias
(`docs/melhorias-limites.md`, §8), que dizia

```
FICA     o teste de ferramenta/vestuário com perícia (depende de o gerador
         passar a sortear essas categorias)
```

Com esta leva, as **46 melhorias dos quatro livros estão no gerador**. Eram 42.

---

## 1 · O problema: o livro dá melhoria, mas não dá tesouro

A **Tabela 3-8** do *Tormenta20* (p. 165) tem cinco grupos de melhoria, e um
deles é **"Ferramentas e vestuário"**. Mas o capítulo de tesouro não sabe disso:

- a **Tabela 8-5: Itens Superiores** (p. 332) imprime faixas de d% para **três**
  categorias — Armas, Armaduras/Escudos e Esotéricos;
- e a instrução do tesouro Superior (p. 331) repete as três com todas as
  letras: *"Role para determinar se é uma arma, armadura/escudo ou esotérico,
  como acima."*

Não é esquecimento meu, é o livro: **ferramenta e vestuário recebem melhoria,
mas não têm tabela de tesouro.** Era por isso que quatro melhorias viviam
exiladas na aba 🔨 Criação de Itens e no "📖 Descrição", sem nunca poder sair
numa rolagem:

| Melhoria | Livro | Efeito |
|---|---|---|
| **Aprimorado** | Tormenta20, p. 164 | +1 na perícia que o item já modifica |
| **Brasonado** | Heróis de Arton, p. 239 | troca o teste de Diplomacia pelo de uma perícia em que o item dê bônus |
| **Usado** | Heróis de Arton, p. 240 | 1×/dia, rola de novo um 1 natural num teste com o item |
| **Multifuncional** | Ameaças de Arton, p. 399 | o item passa a servir a uma segunda perícia do mesmo atributo-chave |

---

## 2 · A decisão: entra, mas pelo Customizável

O gerador tem dois conjuntos de regras, e a diferença entre eles é exatamente
esta: o **Padrão** é a tabela oficial, e o **Customizável** é onde mora tudo que
o livro não escreve (as munições do suplemento que não cabiam no d%, o catálogo
inteiro da Loja, o "superior **e** encantado", os materiais que não se vendem).

A quarta categoria é a definição de "coisa que o livro não escreve". Então ela
entrou **como caixa do Customizável**, desligada por padrão:

> 🧰 **Ferramenta e vestuário superiores** — *Deixar o Superior cair também em
> ferramenta, vestuário e instrumento.*

**Com a caixa desligada — e no Padrão — nada muda.** Conferido em 12 000
rolagens: o dado do tipo continua d6, o da melhoria continua d%, e a categoria
nova nunca aparece.

---

## 3 · As três perguntas que a leva teve de responder

### 3.1 — Que dado escolhe a categoria?

O livro manda `1d6`: 1-3 arma, 4-5 armadura/escudo, 6 esotérico. Com a caixa
ligada, **o dado ganha uma face: vira d7, e o 7 é a quarta categoria.**

É a conta mais honesta que existe aqui. As três do livro **mantêm a proporção
exata entre si** (3 : 2 : 1), e a nova entra com o peso da menor delas. Medido
em 20 000 rolagens: 8 615 armas, 5 687 armaduras, 2 888 esotéricos, 2 810
ferramentas — ou seja, 3 : 2 : 1 : 1.

A face só entra no tesouro **Superior**. O **Equipamento mundano**, que usa a
mesma função, segue no d6 do livro — ferramenta e vestuário já saem por lá
quando o Mestre liga o "catálogo inteiro da Loja".

### 3.2 — Que itens podem sair?

Não há Tabela 8-4 para esta categoria, então **não existe tabela curta para
escolher**: a lista é sempre o catálogo da Loja, com as três categorias que o
Tormenta20 trata como ferramenta e vestuário para efeito de melhoria —
**Ferramentas (19) + Vestuário (61) + Instrumentos Musicais (11) = 91 itens**,
em ordem alfabética, peso igual, **d91**.

O instrumento musical entra porque o livro manda: *"é considerado um item
ligado à perícia Atuação"* (T20, p. 158), justamente para efeito de melhorias.

> Eles continuam no pool `Diverso` também, **de propósito**: o sorteio de item
> diverso do catálogo completo não muda em nada por causa desta leva.

### 3.3 — Que melhorias podem cair?

As **13** que os quatro livros dão à categoria — e esta é a **única tabela do
arquivo sem faixas de d%**, porque o livro não imprime nenhuma. As treze entram
com **peso igual** e o sorteio é um **d13**, o mesmo caminho que o gerador já
usa quando a lista não vem do livro (o catálogo da Loja e o pool de materiais
rolam o dado do próprio tamanho). Inventar faixas seria fingir uma fonte.

| # | Melhoria | Livro | Grupo de origem |
|---:|---|---|---|
| 1 | Aprimorado | T20 164 | Ferramentas e vestuário |
| 2 | Banhado a ouro | T20 164 | Qualquer das categorias acima |
| 3 | Brasonado | Heróis 239 | Ferramentas e vestuário |
| 4 | Canônico | Deuses 54 | Todas as categorias acima |
| 5 | Cravejado de gemas | T20 164 | Qualquer das categorias acima |
| 6 | Deslumbrante | Heróis 239 | Qualquer das acima — mas o verbete estreita |
| 7 | Devotado | Deuses 54 | Todas as categorias acima |
| 8 | Diligente | Deuses 54 | Armaduras, escudos, ferramentas e vestuários |
| 9 | Discreto | T20 164 | Qualquer das categorias acima |
| 10 | Inscrito | Deuses 54 | Armaduras, escudos, ferramentas e vestuários |
| 11 | Macabro | T20 165 | Qualquer das categorias acima |
| 12 | Multifuncional | Ameaças 399 | Ferramentas e vestuário |
| 13 | Usado | Heróis 240 | Ferramentas e vestuário |

**O Devotado cabe aqui, e não na arma.** O pré-requisito dele é o **Inscrito**,
que a Tab. 1-4 do *Deuses* dá a armaduras, escudos, **ferramentas e
vestuários** — mas não a armas. Era por isso que ele ficava fora da tabela de
arma (um pré-requisito impossível só gastaria rolagem); nesta tabela o Inscrito
existe, e o Devotado sai normalmente, depois dele.

**Material especial NÃO entra.** *"Armas, armaduras, escudos e esotéricos podem
ser feitos ou banhados de um material especial"* (T20, p. 166) — a lista não tem
ferramenta nem vestuário. É a única das quatro tabelas sem a porta do material,
e o teste de 20 000 rolagens confirma que nenhuma ferramenta superior saiu com
material.

---

## 4 · A parte difícil: o que é "um item que modifica uma perícia"

Duas das treze dependem disso, e as duas dizem **"só pode"**:

> **Aprimorado** (T20, p. 164) — *"só pode ser aplicada a uma ferramenta ou
> vestuário que **modifique uma perícia** (reduza uma penalidade ou forneça um
> bônus) e fornece um bônus de +1 nessa perícia (ou aumenta o bônus fornecido
> em +1). Por exemplo, uma maleta de medicamentos aprimorada fornece +1 em Cura
> e uma luva de pelica aprimorada fornece +2 em Ladinagem."*

> **Multifuncional** (Ameaças, p. 399) — *"só pode ser aplicada em um item que
> modifica uma perícia (fornecendo bônus ou reduzindo penalidade)."*

**O critério é o parêntese do livro, e só ele:** o item **dá** um bônus num
teste de perícia, ou **tira/reduz** uma penalidade num teste de perícia de quem
o usa.

O exemplo da **maleta de medicamentos** é o que fecha a segunda metade — ela
não dá bônus nenhum; o que ela faz é livrar do *"–5 em Cura"* de quem não a tem.
Gazua, sela, estojo de disfarces, equipamento de viagem e instrumentos de ofício
são da mesma família, e entram pelo mesmo motivo.

Nenhuma coluna do catálogo separa "dá bônus de perícia" de "não dá" — quem
responde é o verbete de cada item. Então a lista é **nominal**, como a de
munições e a de armas de disparo que já existiam no arquivo (`ITENS_PERICIA`,
em `js/recompensas.js`).

### Quem entrou: 60 dos 91

| Categoria | Entram | Ficam de fora |
|---|---:|---:|
| Ferramentas | 16 | 3 |
| Instrumentos Musicais | 11 | 0 |
| Vestuário | 33 | 28 |

Os **11 instrumentos** entram inteiros pela regra da p. 158, e com eles as
quatro ferramentas que dizem *"conta como um instrumento musical"* (alaúde
élfico, flauta mística, tambor das profundezas, trombeta do cruzado).

**Fortitude, Reflexos e Vontade são perícias** em Tormenta20, e *"resistência a
\<efeito\> +X"* é bônus em teste de resistência — por isso capa pesada, gorro de
ervas, veste de seda, enfeite de elmo e sombreiro entram.

### Quem ficou de fora, e por quê — são decisões, não esquecimento

| O caso | Exemplos | Por quê |
|---|---|---|
| Só **impõe** penalidade | elmo leve e pesado (–2/–5 em Iniciativa e Percepção), sandálias, tonsura, veste acolchoada, sapatos de salto alto | O parêntese do livro lista duas formas de modificar, e as duas são **a favor** de quem usa. Um "+1 na perícia que o item já modifica" num elmo seria um elmo mágico que conserta o próprio defeito. |
| Modifica o teste **dos outros** | luva magnética (–5 na Percepção da vítima), máscara bucal | O bônus não é de quem usa o item. |
| Deixa **repetir** o teste | máscara de baile | Repetir é o que a melhoria **Usado** faz; não é o que o Aprimorado mede. |
| **Pula** o teste | sapatos confortáveis, palmar | Ignorar um teste não é modificá-lo. |
| Não mexe em perícia | estandarte, molde pré-fabricado, camisolão, chapéu arcano, rondel, manopla… | — |

A lista marcada aparece inteira no **Catálogo de Tesouros**, item por item, com
"modifica uma perícia" ou "não modifica perícia" ao lado do nome.

### Duas que o livro descreve sem proibir

**Brasonado** e **Usado** também falam de perícia (*"outra perícia na qual o
item forneça bônus"*, *"um teste de perícia com o item"*), mas **não escrevem
"só pode ser aplicada a"**. Pela regra da casa — *só entra em
`RESTRICAO_MELHORIA` o que o livro restringe com todas as letras* —, as duas
ficaram **sem `so`**, como a injeção alquímica e a polida. O que elas ganharam
foi uma observação no card, avisando que só rendem em item que dê bônus de
perícia.

O **Usado** tem ainda a cláusula *"não pode ser aplicada por um artesão, apenas
adquirida quando o item é comprado de segunda mão"*. Ela **não** barra o
gerador: tesouro é item **achado**, não fabricado. O aviso no card diz isso.

### E o par que voltou

O verbete do Brasonado termina com *"Um item não pode ser brasonado e
discreto"* (Heróis, p. 239). O par estava em `MELHORIA_EXCLUI` e saiu em
07/09/2026, junto com o Brasonado. **Voltou nesta leva** — é a única tabela em
que os dois coexistem.

---

## 5 · O que mudou no código

| Arquivo | O quê |
|---|---|
| `js/recompensas.js` | `MELHORIA_FERRAM` (13 linhas, d13) · `ITENS_PERICIA` (os 60 nomes) · o teste `periciaDoItem` e o rótulo dele · `poolFerramenta()` (os 91 da Loja) · `tabelaMelhoria(tipo)`, que dá a cada tabela o seu dado · a face nova no `TABELAS.equipamento(true)` · `ferramentaSuperiorLigada()` · o par `['Brasonado','Discreto']` de volta · o Deslumbrante com os quatro nomes de pré-requisito (masculino **e** feminino) · duas seções novas no Catálogo de Tesouros |
| `index.html` | a caixa 🧰 no painel do modo Customizável |
| `js/criacao-itens-data.js` | a nota da Tabela 3-5 não diz mais que as quatro "NÃO saem no Gerador de Recompensas" |

**Uma sutileza de gênero.** A mesma melhoria aparece em duas tabelas com
desinências diferentes: na de armadura o livro imprime *banhada* e *cravejada*;
na de ferramenta e vestuário, *banhado* e *cravejado*. O pré-requisito do
Deslumbrante é conferido **pelo nome**, então ele passou a listar as quatro
formas — sem isso, o Deslumbrante nunca sairia na tabela nova (o pré-requisito
jamais casaria) e ninguém perceberia: ele simplesmente não apareceria.

---

## 6 · Como ficou conferido

Arreio em Node, carregando `loja_completa.js`, `materiais-data.js`,
`criacao-itens-data.js` e `recompensas.js` num contexto de VM — **sem
navegador**, sem Firebase.

| Prova | Resultado |
|---|---|
| Os 60 nomes de `ITENS_PERICIA` existem no catálogo da Loja | **60/60** — nenhum nome errado (um nome errado seria um item que nunca casa, e calado) |
| A tabela nova fecha | 13 linhas, `max` de 1 a 13, nenhum nome repetido, sem "Material especial" |
| Todo `so` tem teste e rótulo | sim (`periciaDoItem`, `armaduraOuVestuario`) |
| Nenhum pré-requisito impossível **dentro** da tabela | 0 |
| **20 000 itens superiores** com a caixa ligada | **0 erros**: nenhuma melhoria em item proibido, nenhum pré-requisito quebrado, nenhuma repetida no mesmo item, nenhum material especial em ferramenta |
| As 13 saem todas | sim — da mais comum (Canônico, 1 724) à mais rara (Devotado, 97, que depende do Inscrito vir antes) |
| Proporção das categorias | 8 615 : 5 687 : 2 888 : 2 810 ≈ **3 : 2 : 1 : 1** |
| O item-base sorteado é sempre das três categorias certas | sim |
| **12 000 rolagens** no Padrão, no Customizável com a caixa desligada, e no Padrão com a caixa marcada | **nada mudou**: d6, d%, três categorias, 0 erros |
| O Equipamento **mundano** nunca ganha a face nova | conferido nas 12 000 |
| Preço somado | hábito sacerdotal (T$ 30) + 3 melhorias (T$ 9 000) = **T$ 9 030** — a Tabela 3-7 entra igual nas quatro categorias |
| As 13 têm descrição no "📖 Descrição" | 13/13, já estavam em `js/itens-descricoes-extra-data.js` |

**A armadilha que o arreio revelou:** `const` no topo de um script clássico é
**ligação léxica**, não propriedade de `window` — `ctx.MELHORIA_FERRAM` vem
`undefined` mesmo com o arquivo carregado. É a mesma pegadinha que o
`poolLoja()` já comentava sobre o `LojaCompleta`. Toda prova aqui foi feita
**rodando a expressão dentro do contexto**, não lendo o objeto de fora — senão o
teste passa medindo nada.
