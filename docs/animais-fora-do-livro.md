# Animais & Montarias — o que não veio de *Ameaças de Arton*

Anotação de trabalho sobre a sub-aba **🐎 Animais & Montarias** (`js/animais-data.js`).
Começou em **26/08/2026**, quando o bestiário de *Ameaças de Arton* tinha sido importado
até a seção Povos-Trovão; atualizada em **27/08/2026** com o livro inteiro colado e em
**28/08/2026** contra o **PDF** do livro (430 fichas, 31 seções).

A régua nova é a **Tabela A-2: Parceiros**, p. 417 — um índice de 69 parceiros com tipo e
página, que eu não conhecia. A aba concorda com ela em tudo, **menos no Platan**: a A-2 diz
"Montaria (Médio)" e o statblock (p. 322) diz "montaria (Grande)". A ficha é `Animal
Grande`, então a A-2 é que errou; a aba está certa.

O cruzamento entre a aba e o livro é automático:

```
node "Inútil/_conferir-montarias.js"
```

O script compara os **números** de cada benefício (deslocamento, bônus, dados, PM, CD)
— não a redação, que na aba é resumida de propósito — e escreve
`Inútil/_relatorio-montarias.txt`. Vale rodar depois de cada leva nova do TXT.

**Situação atual: 58 entradas conferidas nos dois lados, 58 com os números batendo.
Nenhum parceiro do livro está fora da aba.**

A lista de dúvidas do livro fechado está em [duvidas-ameacas-de-arton.md](duvidas-ameacas-de-arton.md).

> **Familiares saíram desta aba.** Dez fichas do livro trazem uma linha `Familiar`
> separada da linha `Parceiro`, e esse benefício não cabia aqui. Desde 27/08/2026 elas
> vivem na sub-aba **🦉 Familiares** (`js/familiares-data.js`), com uma décima primeira
> que só existe em quadro: o **dragão filhote**.

---

## ✅ 1. As duas entradas "sem fonte" — resolvidas no PDF em 28/08/2026

Eram oito quando o TXT ia só até a letra P. As levas resolveram seis —
**Búfalo-de-Guerra** e **Hippossauro** em Reinos de Moreania, **Corcel de Comando**
em Puristas, **Platan** e **Selako** em Sob as Ondas, **Urso das Neves** em Uivantes.

As duas últimas ficaram abertas porque eu procurei no TXT colado, e o TXT só traz
statblocks. **Abrindo o PDF do livro, as duas apareceram** — e em nenhum dos dois casos
os números da aba estavam errados.

### Troll → **Troll Montaria** (Grande) · a fonte estava certa

Eu procurei uma *ficha* de troll com linha `Parceiro` e não achei, e concluí errado. A
regra não está numa ficha: está numa **caixa lateral, "Troll Montaria", na p. 344**, ao
lado do Cavaleiro Finntroll. O **Apêndice A, Tabela A-2** (p. 417) confirma, listando
"Troll montaria — Montaria (Grande) — 345".

> Nas raras ocasiões que um cavaleiro finntroll é derrotado e seu troll sobrevive, um
> personagem treinado em Adestramento pode conquistar a criatura e transformá-la em uma
> valiosa montaria. […] **Iniciante:** deslocamento 12m e, uma vez por rodada, +1d8 em uma
> rolagem de dano corpo a corpo. **Veterano:** o bônus vai para +1d10 e você recebe +2 em
> testes para agarrar e derrubar. **Mestre:** o bônus vai para +2d8 e o de agarrar e
> derrubar, para +5.

Bate número por número com a aba. A entrada foi **renomeada para "Troll Montaria"** (o
nome do livro) e ganhou um `obs` com a página e a condição de domar.

### Cão de Caça (Médio ou Pequeno) → **Tormenta 20, p. 262**

Não é deste livro mesmo — é da lista de montarias do capítulo de parceiros do
**Tormenta20 básico**, e o texto de lá é palavra por palavra o que estava na aba
(9 m + faro → 12 m + 2 na Defesa → derrubar como ação livre). Só a `fonte` mudou.

> **Nota sobre o `_conferir-montarias.js`:** ele lista **Troll Montaria** em *"na aba, sem
> ficha no TXT"*. É esperado — o script cruza a aba com as linhas `Parceiro` das fichas, e
> a regra do troll é caixa lateral, que o TXT não traz.

---

## 2. Fichas do livro que a aba cobre por outra entrada

Não são buraco — o script as separa num bloco próprio:

- **Gorlogg Alfa** — a ficha diz *"com as mesmas estatísticas de um gorlogg"*, e a aba
  já junta os dois em **Gorlogg / Gorlogg Alfa**.
- **Mamute** — a ficha diz *"os mesmos benefícios que um elefante"*, e a aba já junta os
  dois em **Elefante / Mamute**.
- **Elemental do Veneno Médio** — a ficha diz *"as mesmas estatísticas de um elemental do
  veneno pequeno"*, e a aba junta os três tamanhos em **Elemental do Veneno**.

---

## 3. O que entrou na aba em 27/08/2026 (quinta leva)

Três parceiros novos, todos **parceiro especial**:

| Entrada | Arquétipo | Seção do livro |
|---|---|---|
| **Carcaju** | fortão | Uivantes (ND 1) |
| **Elemental do Veneno** | assassino | Sszzaazitas (ND 2 / 8 / 12) |
| **Perdigueiro Troll** | perseguidor | Trolls Nobres (ND 1) |

Mais o **Cavalo de Carga**, que ganhou entrada própria com o tamanho
`— (parceiro besta de carga)`. É uma categoria nova, criada neste livro.

⚠ **Corrigido em 28/08/2026:** o `OBS:` dizia que a besta de carga *"não tem os três
degraus"*. **Tem** — e os três são a capacidade de carga. A regra, na p. 416 (Apêndice A),
é esta:

> **Novo Tipo de Parceiro: Besta de Carga** — Uma criatura capaz de carregar peso, como um
> boi, burro ou mula. **Iniciante:** pode carregar 10 espaços de itens. **Veterano:** 15
> espaços. **Mestre:** 20 espaços de itens.

O texto real substituiu o `OBS:` no **Cavalo de Carga** e no **Trobo**, que serve para as
duas coisas.

E o **Corcel de Comando**, que já estava na aba sem ficha para conferir, teve confirmada
a regra mais estranha dele: *usa Pilotagem no lugar de Cavalgar*. É a única montaria do
livro assim.

---

## ✅ 4. O que já foi corrigido em 26/08/2026

A aba tinha sido montada em boa parte a partir da Wiki de Tormenta 20, e a Wiki
diverge do livro em alguns pontos. O livro passou a valer.

### Trocas de nome

| Antes | Agora | Motivo |
|---|---|---|
| Urso Negro | **Urso Pardo** | o texto já era, número a número, o do urso pardo do livro |
| Cocatriz Imperador | **Cocatriz-Real** | é o nome do livro; e "Cocatriz Imperador" não existe no TXT |

### Números que estavam errados

| Entrada | Estava | Livro |
|---|---|---|
| **Tigre** | +2 em Iniciativa (ini) e +2 em ataque/dano na 1ª rodada (vet) | **+5** nos dois |
| **Rinoceronte Lanoso** ⇄ **Brontotério** | os benefícios estavam trocados entre os dois, e os do "lanoso" nem batiam com o brontotério | cada um com o seu |
| **Corcel de Kally** | 2d8 de fogo no cone (mes) | **3d8** |
| **Dromedário** | veterano só com o +2 em Percepção/Sobrevivência | falta o cuspe: *uma vez por rodada, 1 PM para 1d4+3 de impacto em alcance curto* |
| **Unicórnio** | vet: "1×/cena, remova condição negativa ou maldição de adjacente" | vet: *deslocamento 15 m e você pode lançar **Purificação**; se aprender, –1 PM* |

### Deslocamento em terra que a aba omitia

O livro dá o deslocamento normal **junto** com o de natação/escavação/voo; a aba
guardava só o segundo. Corrigido em: **Baleote, Bulette, Cavalo Glacial, Dai-Kabuto,
Dragão, Sapo Atroz, Tatu-Montanha e Tuntram**.

### Observações que faltavam

- **Unicórnio** — a `obs` antiga ("apenas devotos de Allihanna, Lena ou Marah, ou
  com dois poderes de Virtude Paladinesca") não é o que o livro diz. O livro deixa
  na mão do mestre: *"unicórnios só aceitam ser cavalgados por quem considerem
  digno, e seus critérios nem sempre são transparentes"*.
- **Dragão** — o livro tem duas regras duras que faltavam: um dragão **não pode ser
  escolhido como opção de uma habilidade** (tem de ser conquistado em jogo) e
  **conta como dois parceiros** no seu limite.

### 14 parceiros do livro que faltavam na aba

Doze são **parceiro especial** (não montaria), por isso entraram com o tamanho
no formato `— (parceiro especial: <arquétipo>)`, como a Pantera e o Dragonete já
usavam:

Asa-Assassina, Bogum, Cão de Kally, **Cocatriz**, Escudeiro, Fofo, Gambá, Hiena,
Homúnculo, Kill'Bone, Ko-Kabuto, Malafex, Tentacute e Verilêmur — mais a
**Cocatriz-Real** e o **Urso Pardo**, que são montaria.
