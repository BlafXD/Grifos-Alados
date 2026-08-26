# Animais & Montarias — o que não veio de *Ameaças de Arton*

Anotação de trabalho sobre a sub-aba **🐎 Animais & Montarias** (`js/animais-data.js`),
feita em **26/08/2026**, quando o bestiário de *Ameaças de Arton* foi importado até a
seção **Povos-Trovão** (320 fichas, 22 seções).

O cruzamento entre a aba e o livro é automático:

```
node "Inútil/_conferir-montarias.js"
```

O script compara os **números** de cada benefício (deslocamento, bônus, dados, PM, CD)
— não a redação, que na aba é resumida de propósito — e escreve
`Inútil/_relatorio-montarias.txt`. Vale rodar depois de cada leva nova do TXT.

**Situação atual: 48 entradas conferidas nos dois lados, 48 com os números batendo.**

---

## ⚠ 1. Oito entradas marcadas "Ameaças de Arton" que não existem no TXT

Estas oito estão na aba com a fonte `'Ameaças de Arton'`, mas **não têm statblock
nenhum** no `Inútil/Regras - Ameaças de Arton.txt` — nem na seção Montarias, nem em
nenhuma das outras 21 seções já coladas.

**Decidir depois:** manter (e talvez corrigir a fonte) ou tirar do sistema.

### Duas quase certamente chegam numa leva futura

O livro traz as seções em ordem alfabética, e o TXT parou em **"puristas"** (P).
Estas duas já são **citadas de passagem** no texto que temos, então a ficha delas
deve vir nas seções S e T:

| Criatura | Onde aparece hoje no TXT |
|---|---|
| **Selako** | linha 6229, na epígrafe do tendrículo: *"Tubarão terrestre? Quer dizer, um selako que anda com…"* |
| **Troll** | linhas 6841/6844 (comparação com o tendrículo) e 11996–12042 (o kill'bone caça trolls) |

### Seis não aparecem em lugar nenhum

Nenhuma menção, nem em epígrafe, nem em comparação. Provavelmente vieram da Wiki
de Tormenta 20 ou de outro livro, e a fonte na aba está errada.

#### Búfalo-de-Guerra (Grande)
- **Iniciante:** Deslocamento muda para 9 m e limite de carga +5 espaços. Uma vez por rodada, em investida montada, +1d8 em rolagem de dano corpo a corpo.
- **Veterano:** Como acima, mas deslocamento 12 m e ignora terreno difícil.
- **Mestre:** Como acima, mas o bônus de dano muda para +2d8 e você recebe uma ação de movimento extra por turno (apenas para se deslocar).

#### Cão de Caça (Médio ou Pequeno)
- **Iniciante:** Deslocamento 9 m, você pode usar faro e recebe uma ação de movimento extra por turno (apenas para se deslocar).
- **Veterano:** Como acima, mas deslocamento 12 m e +2 na Defesa.
- **Mestre:** Como acima; além disso, uma vez por rodada, ao acertar um ataque corpo a corpo, manobra derrubar como ação livre.

> O cão de caça também está em `ANIMAIS_COMPRA` (T$ 150), e lá o texto sai do
> Tormenta20 básico. Só a entrada do **bestiário de montarias** é que está sem
> origem — o TXT de *Ameaças* não tem a palavra "cão de caça" uma vez sequer.

#### Corcel de Comando (Grande) — *usa Pilotagem no lugar de Cavalgar*
- **Iniciante:** Deslocamento 12 m e você ignora a penalidade por terreno difícil.
- **Veterano:** Como acima, e pode lançar Campo de Força (só o efeito básico); se aprender a magia, custo –1 PM.
- **Mestre:** Como acima, e o alcance das suas habilidades baseadas em som (como Músicas de Bardo) aumenta um passo.

#### Hippossauro (Grande)
- **Iniciante:** Deslocamento 12 m e +2 em Diplomacia (macho) ou Furtividade (fêmea).
- **Veterano:** Como acima, mas deslocamento 15 m e, uma vez por rodada, +1d8 em rolagem de dano corpo a corpo.
- **Mestre:** Como acima, mas o bônus na perícia muda para +4 e você recebe uma ação de movimento extra (apenas para se deslocar).

#### Platan (Grande)
- **Iniciante:** Deslocamento de natação 9 m e uma ação de movimento extra (apenas para se deslocar).
- **Veterano:** Uma vez por rodada, como ação livre, gaste 1 PM para 2d6 de impacto em alcance curto.
- **Mestre:** Como acima, mas natação 15 m e pode gastar 4 PM para 6d6 de impacto em alcance curto.

#### Urso das Neves (Grande)
- **Iniciante:** Deslocamento 12 m e redução de frio 5.
- **Veterano:** Deslocamento de natação 12 m e a redução de frio sobe para 10.
- **Mestre:** Como acima, mas a redução de frio sobe para 20.

> A entrada "Urso" de *Ameaças* traz só três variedades — **panda, pardo e das
> cavernas**. Não existe urso das neves ali.

---

## ✅ 2. O que já foi corrigido em 26/08/2026

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

---

## 3. Duas fichas do livro que a aba cobre por outra entrada

Não são buraco — o script as separa num bloco próprio:

- **Cavalo de Carga** — no livro é *"parceiro besta de carga"*, categoria que a aba
  não lista; os cavalos comuns estão na entrada **Cavalo** (Tormenta 20).
- **Gorlogg Alfa** — a ficha dele diz *"com as mesmas estatísticas de um gorlogg"*,
  e a aba já junta os dois em **Gorlogg / Gorlogg Alfa**.
