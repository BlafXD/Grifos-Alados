# Conferência das Fichas Prontas — os quatro livros, linha por linha

Feita em **2 de setembro de 2026**, contra os PDF dos próprios livros.

As conferências anteriores ([Ameaças de Arton](duvidas-ameacas-de-arton.md),
[Tormenta 20](conferencia-tormenta20.md), [Deuses de Arton](conferencia-deuses-de-arton.md))
responderam **"está faltando alguma ficha?"** e **"o ND está certo?"**. Esta responde a
pergunta que faltava: **"o que está escrito dentro da ficha é o que o livro imprime?"**

**Resultado: sim. 9.947 das 10.161 linhas são idênticas ao livro, palavra por palavra
(97,9%), e nenhuma das 214 restantes muda um número de regra.** As informalidades são
todas de formatação — e sete delas custam um campo na hora de mandar a ficha para o
combate.

---

## 0. Estado — tudo corrigido em 2 de setembro de 2026

Os achados abaixo foram consertados **nos geradores** (nunca nos `-data.js`, que são
arquivos gerados) e os quatro arquivos regerados no mesmo dia.

| Achado | Estado |
|---|---|
| §2.1 · Sete fichas perdem o Equipamento | **RESOLVIDO** — 26 fichas corrigidas ao todo; o parser real não perde mais nenhum campo em 680 fichas |
| §2.2 · Texto colado em dez fichas | **RESOLVIDO** |
| §2.2 · `óDiO aO PRevIsíVEl` do Avatar de Nimb | **NÃO ERA DEFEITO** — veja a retificação abaixo |
| §2.3 · Linhas de statblock fundidas | **RESOLVIDO** — e a varredura achou mais três (Aspecto de Marah, Khorr’benn, Lorde Vectorius), 9 no total |
| §2.4 · Política dos quadrados | **DECIDIDA E APLICADA** — os metros mandam, o quadrado é conta |

### Retificação: o Avatar de Nimb está certo

O relatório listou `óDiO aO PRevIsíVEl` como título embaralhado a consertar. **Estava
errado.** No mesmo statblock, "Aura Caótica Derradeira", "Centelha Divina" e "*Eu Movo as
Peças!*" saem do PDF com a caixa normal — só esse título vem embaralhado. Ou seja, está
assim **no texto do livro**, de propósito: é a piada para o deus do Caos. O
`_gerar-deuses-arton.js` já tratava disso na mão (`HABILIDADES_A_MAO`), e continua.

A regra que descola o nome da habilidade da descrição foi escrita exigindo **duas**
minúsculas antes do artigo justamente para não estragar esse caso: `CostasO` vira
`Costas O`, mas `óDiO` (que tem maiúscula antes) fica intacto.

### A política dos quadrados

**Os metros mandam; o quadrado é conta (1q = 1,5m).** Quando o livro imprime um quadrado
que não fecha com os metros, vale a conta. Os quatro geradores agora recalculam sozinhos e
registram cada correção no relatório. Hoje isso muda duas fichas — Sacerdote Finntroll e
Alto Sacerdote Finntroll, de `6m (6q)` para `6m (4q)` — e confirma as três que já estavam
assim (Avatar de Allihanna, Avatar de Tenebra, Mercador Desonesto).

### Um bug de gerador que apareceu no caminho

Antes de mexer em qualquer coisa, cada gerador foi rodado **sem alteração** para conferir
se reproduzia o arquivo já commitado. Quatro reproduziram byte a byte. O
`_gerar-npcs-lendas.js` **não**: ele devolvia **115 fichas em vez de 94**, enfiando os 20
avatares do *Deuses de Arton* dentro do Guia de NPCs.

A causa é de uma palavra. O gerador acha o fim da seção do livro com
`/^Agora é livro\b/`, e quem escreveu o `Regras.txt` abriu o Guia de NPCs com *"Agora é
livro 'Guia de NPCS'!"* mas o Deuses de Arton com *"Agora é **o** livro 'Deuses de Arton
v1.1'!"*. Sem casar o fim, a varredura ia até o fim do arquivo. O artigo agora é opcional
(`/^Agora é (?:o )?livro\b/`) e o gerador voltou a reproduzir exatamente as 94 fichas.

> Isso só apareceu porque o `Regras.txt` é reaproveitado por três geradores e foi
> reescrito depois que o `npcs-lendas-data.js` foi gerado. **Rodar o gerador antes de
> editá-lo, e exigir que ele reproduza o arquivo atual, é o que separa "regerar" de
> "sobrescrever com outra coisa".**

### O que mudou, ficha a ficha

Cada arquivo foi comparado com uma cópia do anterior **ficha a ficha** (`chave` + `texto`
carregados com `new Function`; o diff de linha do git não serve, os blocos se deslocam):

| Arquivo | Fichas | Com diferença |
|---|---|---|
| `js/fichas-t20-data.js` | 80 → 80 | 1 (Aparição) |
| `js/fichas-ameacas-arton-data.js` | 430 → 430 | 14 |
| `js/deuses-servos-data.js` | 76 → 76 | 5 |
| `js/npcs-lendas-data.js` | 94 → 94 | 6 |
| `js/deuses-arton-data.js` | — | 0 (nada a corrigir nos avatares) |

Depois da correção, medido de novo: **9.965 linhas idênticas ao livro** (eram 9.947),
**zero** colagens de nossa autoria, **zero** quadrados que não fecham, e o
`parsearFicha()` real não perde campo em nenhuma das 680 fichas — sobram só os três casos
legítimos (Rival Espelho, Luminar e Gigante Máximo, que o livro imprime sem números).

---

## 1. Como foi conferido

```bash
pdftotext -raw    -enc UTF-8 "<livro>.pdf" livro.txt   # ordem de leitura
pdftotext -layout -enc UTF-8 "<livro>.pdf" livro.txt   # posição na página
```

O texto do livro vira uma cadeia única (hifenização de fim de linha refeita, acentos
normalizados, pontuação virando espaço). Cada linha de cada ficha é procurada nessa
cadeia. Quem casa, casa **exatamente** — não é semelhança, é a mesma sequência de
palavras e números.

| | |
|---|---|
| Fichas conferidas | **680** (80 Tormenta 20 · 430 Ameaças de Arton · 76 Deuses de Arton · 94 Guia de NPCs) |
| Linhas comparadas | **10.161** |
| Idênticas ao livro | **9.947** (97,9%) |
| Diferem só em espaçamento | 42 |
| Diferença de conteúdo | 166 |
| Não encontradas | 6 |

Foram feitas ainda três checagens que a comparação linha a linha não cobre:

- **A checagem inversa** — alinhar cada ficha ao trecho do PDF e olhar o que o livro
  imprime *entre* duas linhas que a ficha tem. Serve para achar habilidade que sumiu.
- **A aritmética dos quadrados** — todo `Xm (Yq)` precisa fechar `Y = X ÷ 1,5`.
- **O parser de verdade** — o `parsearFicha()` do `js/monstros.js` rodado nas 680 fichas,
  conferindo se cada campo chega preenchido do outro lado.

### A completude foi revalidada

| Livro | Lista fechada do livro | Resultado |
|---|---|---|
| Ameaças de Arton | Apêndice C (Criaturas por ND, p. 420–421) | **430 × 430**, zero divergência de ND |
| Tormenta 20 | Tabela 7-1 (p. 285) | **80 × 80**, zero divergência de ND |

---

## 2. As informalidades

### 2.1 — CUSTA UM CAMPO · Sete fichas perdem o Equipamento no combate

O rótulo ficou colado na primeira palavra: **`EquipamentoCoroa majestosa…`**. A âncora do
parser (`js/monstros.js:4116`) é `/\bEquipamento\s+[A-ZÀ-Ý]/` — exige o espaço. Sem ele, o
campo Equipamento nasce **vazio** na criatura que vai para a aba ⚔ Combates.

Confirmado rodando o parser real nas 680 fichas: estas sete são as únicas que perdem um
campo.

| Livro | Ficha | ND | O que está colado |
|---|---|---|---|
| Ameaças de Arton | Dracomante | 5 | `EquipamentoPergaminho de armadura arcana…` |
| Ameaças de Arton | Lich de Aslothia | 18 | `EquipamentoCoroa majestosa…` |
| Ameaças de Arton | Sszzaazita Celebrante | 16 | `EquipamentoEstojo de disfarces aprimorado…` |
| Guia de NPCs | Gregor Vahn | 12 | `EquipamentoArmadura completa defensora…` |
| Guia de NPCs | Sislach Narsogg | 15 | `EquipamentoAvir (veja p. 55)…` |
| Guia de NPCs | Stridnix | 7 | `EquipamentoAdaga formidável…` |
| Guia de NPCs | Vladislav Tpish | 14 | `EquipamentoAnel da proteção…` |

**O conserto é de uma linha, e no gerador.** O `_gerar-ameacas-arton.js` já tem exatamente
essa regra para o ataque (linha 833):

```js
if (/^Corpo a Corpo(?=[A-ZÀ-Ý])/.test(s)) { … s = s.replace(/^Corpo a Corpo/, 'Corpo a Corpo '); }
```

Falta a irmã dela para `Equipamento`, `Perícias` e `À Distância` — e o mesmo nos geradores
do Deuses de Arton e do Guia de NPCs. Editar os `-data.js` à mão não resolve: são arquivos
gerados, e a próxima rodada do gerador desfaz.

### 2.2 — LEITURA · Mais dez fichas com texto colado

Os números estão todos certos; o que sofre é a leitura na tela.

| Livro | Ficha | O que está colado |
|---|---|---|
| Ameaças de Arton | Kishinauros | `Armamento AdaptativoA cada rodada…` |
| Ameaças de Arton | Dracomante Superior | `Intimidação+19` |
| Ameaças de Arton | Quimera | `(teste+28)` |
| Ameaças de Arton | Pistoleiro | `Corpo a Corpo Adaga+12` |
| Ameaças de Arton | Líder Pistoleiro | `Corpo a Corpo Adaga+16` |
| Ameaças de Arton | Chapéu-Preto | `Percepção+12` · `Bala nas CostasO` · `Mão FirmeO` |
| Ameaças de Arton | Voracis Rainha | `Sobrevivência+13` |
| Ameaças de Arton | Raposa Bucaneira | `À DistânciaPistola-punhal` |
| Ameaças de Arton | Sszzaazita Celebrante | `Cobra em Pele de CordeiroO` · `Manto do TraidorO` |
| Deuses de Arton | Aspecto de Marah | `Atuação+16, Conhecimento+6` |

E um caso à parte, que não é espaço faltando:

**Avatar de Nimb — `óDiO aO PRevIsíVEl`.** O livro imprime esse título de habilidade em
**versalete**, e a extração devolve a caixa embaralhada. Deveria ler-se **"Ódio ao
Previsível"**. É o único título nessa situação nas 680 fichas.

### 2.3 — LEITURA · Seis linhas de statblock fundidas

Duas linhas do livro vieram numa só. **Não quebra nada** — o `parsearFicha()` achata as
quebras de linha antes de ler, então os campos saem corretos; o estrago é só visual, no
card da ficha.

| Livro | Ficha | Linha |
|---|---|---|
| Tormenta 20 | Aparição | `Pontos de Vida 110 Deslocamento Voo 18m (12q)` |
| Ameaças de Arton | Velocis Caçador | `Iniciativa +7, … visão na penumbra Defesa 21 (23 contra ataques à distância)…` |
| Deuses de Arton | Parcus | `Deslocamento 12m (8q) Corpo a Corpo Dois punhos trovejantes…` |
| Deuses de Arton | Dríade | `Pontos de Mana 24 Caminhar em Árvores (Completa)…` |
| Deuses de Arton | Náiade | `Pontos de Mana 18 Abraço das Águas (Movimento)…` |
| Deuses de Arton | Gigante Máximo | `Deslocamento 45m (30q), sem redução… Ataques Colossais (Padrão)…` |

### 2.4 — DECISÃO SUA · A política dos quadrados está inconsistente

Os livros erram a conversão de metros para quadrados em cinco lugares (1q = 1,5m). As
fichas trataram o mesmo erro de **três maneiras diferentes**:

| Ficha | O livro imprime | A ficha traz | |
|---|---|---|---|
| Avatar de Allihanna | `escalada 15m (6q)` | `escalada 15m (10q)` | **corrigido** (15m = 10q) |
| Avatar de Tenebra | `Deslocamento 18m (8q)` | `Deslocamento 18m (12q)` | **corrigido** (18m = 12q) |
| Mercador Desonesto | `natação 12m` | `natação 12m (8q)` | **acrescentado** |
| Sacerdote Finntroll | `Deslocamento 6m (6q)` | `Deslocamento 6m (6q)` | **mantido** (6m = 4q) |
| Alto Sacerdote Finntroll | `Deslocamento 6m (6q)` | `Deslocamento 6m (6q)` | **mantido** (6m = 4q) |

Nenhuma das duas escolhas é errada — mas convém que seja **uma só**. Se a regra é "a ficha
reproduz o livro", os dois avatares precisam voltar a `(6q)` e `(8q)`. Se é "a ficha fecha
a conta", os dois Finntroll precisam ir para `(4q)`. São as únicas cinco ocorrências em
680 fichas.

---

## 3. O que o livro erra e a ficha já conserta

Nada a fazer aqui — está registrado só para você saber por que a ficha não é cópia literal
nesses pontos.

| Ficha(s) | O livro imprime | A ficha traz |
|---|---|---|
| Dragão Adulto, Dragão Venerável, Dragão-Rei (T20) e Dragão Venerável da Equidade | `Magia O dragão…` | `Magias O dragão…` |
| Daitengu | `Pontos de Magia 64` | `Pontos de Mana 64` |
| Dragão Filhote do Bosque | `visão no esuro` | `visão no escuro` |
| Senhor do Gigante Rubro Forma Final | `1d4 sementes rubra` | `1d4 sementes rubras` |
| Tentacute e Tropa de Tentacutes | `Perícia Furtividade` | `Perícias Furtividade` |
| Dragão Adulto dos Segredos | `Von+25` | `Von +25` |

E a Tabela 7-1 do Tormenta 20 escreve **"Fintroll feitor"** com um *n* onde o statblock
escreve "Finntroll" — o sistema já guarda a grafia da tabela como `alias`.

---

## 4. O que foi verificado e está impecável

- **Todos os números de regra.** Defesa, PV, PM, Fortitude, Reflexos, Vontade, atributos,
  bônus de ataque, dano, margem de ameaça, perícias, CD, alcance: nenhuma divergência em
  680 fichas.
- **A prosa.** As 159 divergências de descrição são, sem exceção, mobília de página que a
  ordem de leitura do PDF injeta no meio do parágrafo (`ND 3`, número de página, nome da
  criatura vizinha). Nenhuma troca de palavra.
- **As fichas que parecem incompletas, mas não são:**
  - **Luminar** (ND –) — o livro imprime mesmo `Defesa —, Fort —, Ref —, Von —` e
    `Pontos de Vida —`. É criatura de apoio, não tem números.
  - **Gigante Máximo** (ND S+) — o livro imprime `Pontos de Vida Especial (veja Grande
    Demais)`.
  - **Fera-Mãe** (ND 13) — não tem linha de ataque no livro: é planta, só habilidades.
  - **Rival Espelho** (ND ?) — não tem statblock nenhum, porque copia o personagem. É
    também a única ficha sem papel de combate, e está certo.
- **Papel de combate.** O `criaturaDeFichaPronta()` (`js/monstros.js:4897`) sobrepõe o
  papel deduzido pelo parser com o `papel` declarado na ficha — os 585 papéis lidos do PDF
  chegam intactos no combate.
- **Chaves.** 680 chaves de ficha, nenhuma duplicada.

---

## 5. Recomendações, em ordem

1. **Ensinar os geradores a descolar `Equipamento`, `Perícias` e `À Distância`** (§2.1).
   É a mesma regra que já existe para `Corpo a Corpo`, e devolve o campo Equipamento a
   sete fichas.
2. **Decidir a política dos quadrados** (§2.4) e aplicá-la nas cinco ocorrências.
3. **Consertar o `óDiO aO PRevIsíVEl` do Avatar de Nimb** (§2.2).
4. As colagens restantes (§2.2) e as linhas fundidas (§2.3), quando sobrar tempo — são só
   leitura.

Nada aqui é urgente, e nada aqui muda uma regra de jogo. As fichas estão de acordo com os
livros.
