# Animais & Montarias — o que não veio de *Ameaças de Arton*

Anotação de trabalho sobre a sub-aba **🐎 Animais & Montarias** (`js/animais-data.js`).
Começou em **26/08/2026**, quando o bestiário de *Ameaças de Arton* tinha sido importado
até a seção Povos-Trovão; atualizada em **27/08/2026**, com o livro inteiro colado
(426 fichas, 30 seções).

O cruzamento entre a aba e o livro é automático:

```
node "Inútil/_conferir-montarias.js"
```

O script compara os **números** de cada benefício (deslocamento, bônus, dados, PM, CD)
— não a redação, que na aba é resumida de propósito — e escreve
`Inútil/_relatorio-montarias.txt`. Vale rodar depois de cada leva nova do TXT.

**Situação atual: 57 entradas conferidas nos dois lados, 57 com os números batendo.
Nenhum parceiro do livro está fora da aba.**

A lista de dúvidas do livro fechado está em [duvidas-ameacas-de-arton.md](duvidas-ameacas-de-arton.md).

---

## ⚠ 1. Duas entradas marcadas "Ameaças de Arton" que não existem no livro

Eram oito quando o TXT ia só até a letra P. As últimas levas resolveram seis delas —
**Búfalo-de-Guerra** e **Hippossauro** vieram em Reinos de Moreania, **Corcel de Comando**
em Puristas, **Platan** e **Selako** em Sob as Ondas, **Urso das Neves** em Uivantes, e
todos os números da aba bateram com os do livro.

Sobraram duas, e agora que o capítulo acabou não há mais leva para esperar:

### Troll (Grande)

O livro **não tem** ficha "Troll" com linha *Parceiro*. O único troll-montaria que ele
descreve é o do **Cavaleiro Finntroll** (ND 7, seção Trolls Nobres):

> **Corcel Troll** O cavaleiro finntroll cavalga um troll treinado, um parceiro montaria
> Grande. Enquanto estiver montado, seu deslocamento se torna 12m, ele recebe uma ação de
> movimento extra (apenas para se deslocar), os seguintes ataques (em adição ao seu açoite)
> e Dilacerar.

Isso é o perfil montado **do NPC**, não uma tabela iniciante/veterano/mestre. A ficha do
troll em si o livro manda ver no Tormenta20, p. 308. Os benefícios que estão hoje na aba
(+1d8 → +1d10 → +2d8 de dano, mais agarrar/derrubar) continuam sem fonte que eu tenha
conseguido achar.

### Cão de Caça (Médio ou Pequeno)

A expressão "cão de caça" **não aparece uma única vez** no TXT do livro. A entrada de
`ANIMAIS_COMPRA` (T$ 150) está certa — o texto dela vem do Tormenta20 básico. Só a
entrada do **bestiário de montarias** é que está sem origem:

- **Iniciante:** Deslocamento 9 m, você pode usar faro e recebe uma ação de movimento extra por turno (apenas para se deslocar).
- **Veterano:** Como acima, mas deslocamento 12 m e +2 na Defesa.
- **Mestre:** Como acima; além disso, uma vez por rodada, ao acertar um ataque corpo a corpo, manobra derrubar como ação livre.

**Decidir:** manter as duas com a fonte trocada (Wiki? outro livro?) ou tirar do sistema.

---

## 2. Fichas do livro que a aba cobre por outra entrada

Não são buraco — o script as separa num bloco próprio:

- **Cavalo de Carga** — no livro é *"parceiro besta de carga"*, categoria que a aba não
  lista; os cavalos comuns estão na entrada **Cavalo** (Tormenta 20).
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
