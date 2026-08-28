# *Ameaças de Arton* — o que ficou resolvido e o que ainda está aberto

Aberta em **27/08/2026**, quando a última leva do TXT (Puristas → Uivantes) entrou.
Fechada no mesmo dia com as respostas do Caique e o **Apêndice C**.

**Reaberta e conferida contra os PDFs em 28/08/2026.** Desta vez não foi contra o TXT:
os oito livros da pasta `RPG/Tormenta 20/Livros` foram extraídos com `pdftotext` e lidos
página a página. **As quatro pendências que estavam abertas fecharam** — as três que
dependiam de você colar um texto foram respondidas pelo próprio livro. E caiu também a
pendência mais antiga do projeto: **o papel de combate**, que não era para ser
preenchido à mão (§6).

**Estado: 430 fichas · 429 com papel de combate · 162 quadros de regra · 50 regras
gerais · 8 itens · 11 familiares · 28 caixas de Reforços.**

---

## 1. A conferência de ND — refeita direto do PDF

O Apêndice C (p. 420–421) foi extraído do PDF e cruzado, um a um, com as 430 fichas do
sistema por um script de pareamento.

```
430 no Apêndice C  ×  430 no sistema  →  ZERO divergência de ND
```

O apêndice tem **25 faixas de ND**: `? · 1/4 · 1/2 · 1 … 20 · S · S+`. As sete criaturas
de **ND S** (Arquilich Ferren Asloth, Avatar de Aharadak, Avatar de Kallyadranoch,
Kishinauros) e **ND S+** (Gatzvalith, Sckhar, Tarso) estão com a faixa certa no sistema.

### As três fichas "onde o livro se contradizia" — o livro **não** se contradiz ⚠

Isto estava errado na versão anterior deste documento, e agora dá para afirmar o
contrário com a página na mão. Nos três casos o **cabeçalho do statblock concorda com o
apêndice**; a divergência era da cópia em TXT, não do livro.

| Ficha | p. | O que o statblock imprime | Apêndice C | Sistema |
|---|---|---|---|---|
| **Namasqall** | 91 | `Namasqall ND 14` | 14 | 14 ✅ |
| **Lefeu, Hurobakk** | 25 | `Lefeu, Hurobakk ND 9` | 9 | 9 ✅ |
| **Elfo-do-Mar Pescador** | 316 | `Elfo-do-Mar Pescador ND 2` | 2 | 2 ✅ |

O motivo do engano: nesse livro o selo de ND fica numa caixa gráfica separada, ao lado do
nome. A extração em ordem de leitura (`-raw`) joga esse selo para o meio ou para o fim do
bloco — foi assim que ele se perdeu ou se trocou na cópia. Em `-layout` ele volta para o
lado do nome, e aí os três aparecem certos.

**O aviso "vale reconferir na página da ficha" do Namasqall pode sair.** Conferido: é 14.

### As dez deduções de ND: nove certas, uma errada

Continua valendo, e o Apêndice C confirma. O **Purificado** é a única errada — eu tinha
deduzido 1/2 pela escada de Defesa/PV/ataque (o corpo dele é de ND 1/4) e o livro diz
**2**, porque para ele a ameaça é a bomba, não o hynne.

---

## 2. As pendências que estavam abertas — todas fecharam

### 2.1 Troll e Cão de Caça — as duas entradas "sem fonte" ✅

Eram duas perguntas diferentes, e o PDF responde as duas.

**Troll — a fonte estava certa o tempo todo.** Eu tinha procurado uma *ficha* de troll
com linha `Parceiro` e não achei. Mas a regra não está numa ficha: está numa **caixa
lateral chamada "Troll Montaria", na p. 344**, ao lado do Cavaleiro Finntroll. O
**Apêndice A, Tabela A-2** (p. 417) também a lista, como "Troll montaria — Montaria
(Grande) — 345". O texto:

> **Troll Montaria** — […] Nas raras ocasiões que um cavaleiro finntroll é derrotado e
> seu troll sobrevive, um personagem treinado em Adestramento pode conquistar a criatura
> e transformá-la em uma valiosa montaria. Um troll adestrado desta forma é um parceiro
> montaria Grande […] **Iniciante:** seu deslocamento muda para 12m e, uma vez por
> rodada, você recebe +1d8 em uma rolagem de dano corpo a corpo. **Veterano:** o bônus em
> rolagens aumenta para +1d10 e você recebe +2 em testes para agarrar e derrubar.
> **Mestre:** o bônus em rolagens aumenta para +2d8 e o bônus para agarrar e derrubar
> aumenta para +5.

Bate número por número com o que já estava na aba. **Feito:** a entrada virou
**"Troll Montaria"** (o nome do livro) e ganhou um `obs` com a p. 344 e a condição de
domar. A `fonte` continua *Ameaças de Arton*, que estava certa.

**Cão de Caça — a fonte estava errada.** Não é deste livro: é do **Tormenta20 básico,
p. 262**, na lista de montarias do capítulo de parceiros:

> **Cão de caça** — Médio ou pequeno. Cães de porte adequado são montarias comuns para
> personagens Pequenos ou Minúsculos. **Iniciante:** seu deslocamento muda para 9m, você
> pode usar faro e recebe uma ação de movimento extra por turno (apenas para se
> deslocar). **Veterano:** como acima, mas seu deslocamento muda para 12m e você recebe
> +2 na Defesa. **Mestre:** como acima; além disso, uma vez por rodada, quando acerta um
> ataque corpo a corpo, você pode fazer a manobra derrubar como uma ação livre.

Palavra por palavra o que estava na aba. **Feito:** só a `fonte` mudou, para
*Tormenta 20*. Os números não foram tocados.

> **Sobre `_conferir-montarias.js`:** depois desta rodada ele lista **Troll Montaria** em
> *"na aba, sem ficha no TXT"*. **Isso é esperado, não é erro.** O script cruza a aba com
> as linhas `Parceiro` das *fichas*, e a regra do troll não está numa ficha — está numa
> caixa lateral da p. 344, que o TXT colado não traz. Antes eram duas nessa lista; o Cão
> de Caça saiu ao ganhar a fonte certa.

### 2.2 As caixas de "Reforços" ✅

Elas **estão** no PDF. O que não sai na cópia é só o **título** "Reforços", que é texto
vetorizado; a lista de nomes está na camada de texto e saiu inteira.

Extraídas e guardadas em **`Inútil/Regras - Ameaças de Arton (reforços).txt`**.

**São 28 caixas, não 30.** *Mascotes & Familiares* e *Montarias* não têm — o que faz
sentido, são seções de parceiro, não de encontro (conferido página a página nas duas).
São **497 nomes** no total, da menor (*Duyshidakk*, 8) à maior (*Masmorras*, 47).

O **asterisco** é do livro e marca criatura que **não** está em *Ameaças de Arton* — vem
do Tormenta20 básico ou de outro livro.

**O bloco "⚔ Reforços" está na aba**, no topo de cada uma das 28 seções, fechado por
padrão. Dos 497 nomes, **381 viram link** e 116 ficam como texto (114 são o asterisco do
livro; 2 são erro de impressão — veja §3.3). O clique faz uma coisa diferente conforme o
que o nome é no livro:

| O nome é… | O que o clique faz | Quantos |
|---|---|---|
| uma ficha só | abre o card e rola até ele | 362 |
| um **título de entrada** que cobre várias fichas ("Trog", "Dragão Adulto") | filtra a aba só para elas, com uma faixa "✕ limpar" no topo | (entre os 362) |
| um **quadro de regra** ("Armadilhas Kobolds", "Elemental da Água") | abre o quadro | 18 |
| uma **seção inteira** ("Dragões") | liga o chip da categoria | 1 |
| marcado com asterisco | nada — fica esmaecido, com a dica de onde procurar | 114 |

A caixa some sozinha quando você digita na busca ou seleciona um reforço, e volta quando
limpa. Os outros três livros da aba não têm caixa nenhuma — o campo só existe aqui.

### 2.3 Bispo do Forte Sagrado — a Prece de Combate ✅

Conferido na **p. 371**: o livro imprime mesmo **`Prece de Combate (+2 PM)`**, sem o
"Livre,". Manter literal estava certo — **nada a fazer**.

Na mesma página, um detalhe que a versão anterior desta doc contava errado: o
`Escudo da Fé (Reação, 3 PM) Quando uma criatura em **alcance turno** sofre um ataque`
**é o que o livro imprime**, não um defeito da cópia. Continua sendo um erro do livro
(no Bispo de Guerra, p. 141, a mesma magia diz "alcance curto"), e o conserto continua
valendo — mas é errata, não limpeza de cópia.

### 2.4 A regra de "besta de carga" ✅

Está na **p. 416** (Apêndice A), e é curta:

> **Novo Tipo de Parceiro: Besta de Carga** — Uma criatura capaz de carregar peso, como
> um boi, burro ou mula. **Iniciante:** pode carregar 10 espaços de itens.
> **Veterano:** pode carregar 15 espaços. **Mestre:** pode carregar 20 espaços de itens.

⚠ **O `OBS:` que estava lá dizia o contrário do livro.** Ele afirmava que a besta de
carga *"não tem os três degraus"* — tem, e os três **são** a capacidade de carga
(10 → 15 → 20 espaços). **Feito:** o `OBS:` foi trocado pela regra de verdade nas duas
entradas que o usavam (**Cavalo de Carga** e **Trobo**).

---

## 3. Achados novos do PDF

### 3.1 Tabela A-2: Parceiros (p. 417) — a régua da aba 🐎

O livro tem um índice de parceiros que eu não conhecia: **69 criaturas**, com tipo e
página. Serve para a aba 🐎 o mesmo que o Apêndice C serve para o bestiário. Cruzada com
a aba, ela concorda em tudo — **menos num ponto, onde o livro briga consigo mesmo:**

| | Statblock | Tabela A-2 | Sistema |
|---|---|---|---|
| **Platan** (p. 322) | "parceiro montaria **(Grande)**" | "Montaria (**Médio**)" | Grande ✅ |

A ficha é `Animal Grande` e o statblock diz Grande; a A-2 é que errou. O sistema já está
do lado certo.

A A-2 também grafa **"Hipossauro"** com um *p*, enquanto a ficha (p. 297) e o índice
alfabético grafam **"Hippossauro"**. As duas grafias são do livro.

### 3.2 As três fichas "Fora do Capítulo 1" são exemplos resolvidos

Conferidas as três páginas, e elas não são statblocks órfãos: são os **exemplos
trabalhados do Capítulo 2** (como criar uma ameaça).

| p. | Ficha | O que é |
|---|---|---|
| 371 | **Bispo do Forte Sagrado** ND 10 | o exemplo de **Chefe Final**. A habilidade *Templo* traz os quatro elementos de arena da p. 370 (fonte curativa, linhas místicas, selo místico, torreta) — é a regra da página anterior aplicada. |
| 386 | **dejeto vivo** ND 6 | o exemplo de **criação de ameaça passo a passo** (p. 385–386). O ND 6 é escolhido no Passo 2, com justificativa. |
| 389 | **Cardume de Aquin'ne** ND 5 | o exemplo de **criação de bando**, em 7 passos, a partir do aquin'ne da p. 88. |

Consequência prática: a nota que essas três carregam ("o parágrafo de lore ficou na
página original do livro") **está errada** — não existe lore para elas em lugar nenhum,
porque são exercícios, não entradas de bestiário. Vale trocar a nota por isto.

### 3.3 Um erro de impressão novo

Na caixa de Reforços do **Império de Jade** (p. 166) o livro lista **"Lefel Veridak"** e
**"Lefeu Veridak"** — o mesmo lefeu duas vezes, um deles com a letra trocada.

---

## 4. Os "deslizes" do §5 antigo — quais são do livro e quais eram da cópia

A tabela antiga chamava todos de "deslizes do livro". Conferindo no PDF, metade era da
cópia. A distinção importa: o que é do livro é **errata** (mexer exige critério), o que é
da cópia é **limpeza** (mexer é obrigatório).

**Do livro** — confirmado no PDF:

| Ficha | O livro imprime |
|---|---|
| **Protetor-Refém** (p. 344) | linha de tipo `Anão Médio`, sem subtipo. Vira "Humanoide (anão) Médio"; sem isso a ficha sumia. |
| **Perdigueiro Troll** (p. 343) | "é **um um** parceiro especial" |
| **Platan** (p. 322) | "natação 9m **e e** você recebe" |
| **Bispo do Forte Sagrado** (p. 371) | Escudo da Fé "em **alcance turno**" (o Bispo de Guerra diz "curto") |
| **dejeto vivo** (p. 386) | nome do statblock em caixa baixa, sozinho entre os 430 |
| **Hippossauro** (p. 297) | a própria página traz "Hippossauro" e "Hipossauro" |

**Da cópia do PDF** — o livro está certo:

| Vinha como | O livro tem |
|---|---|
| `MagiasComo um clérigo de Tenebra` | `Magias Como um clérigo…`, com o espaço |
| `TesouroPadrão` | `Tesouro Padrão.` — zero ocorrências coladas no PDF |
| `Moreau 301` / `Selako ND 2` no título | o "301" é o número da página e o "ND 2" é o selo da caixa gráfica |
| T'Peel sem ponto final | — |

---

## 5. Coisas que ficaram registradas, sem ação

- **Coruja Druida** sai como "Humanoide (**M**oreau) Médio" — conferido na p. 301, é do
  livro. As outras duas fichas moreau vêm com minúscula.
- **Defeituoso** sai como "Monstro Médio", sem subtipo — conferido na p. 339, é do livro
  e está certo: é um prisioneiro mutado nos experimentos finntroll, não um finntroll.
- **Rival Espelho** é ND "?" mesmo — o Apêndice C abre com uma faixa `ND ?` só para ele.
- **Wisphago** e **Verme do Gelo Adulto** gastam PM sem ter linha de Pontos de Mana:
  alarme falso do gerador, nos dois casos o PM é de *outra* criatura.
- **O papel de combate** deixou de ser pendência — veja a §6.

---

## 6. O papel de combate — lido do PDF, não preenchido à mão ✅

A premissa antiga era que ícone não sai do PDF. **É falsa.** O ícone de papel
(solo / lacaio / especial) é um **desenho vetorial** — uma sequência de curvas no
content stream da página. Não é caractere nenhum, e por isso nunca apareceu em cópia
de texto: procurei até caractere solto, do jeito que o selo ✦ de habilidade mágica
sobrevive como um "e", e este não deixa rastro.

Mas o diagramador desenha **literalmente o mesmo path** para o mesmo papel. Então dá
para assinar a geometria (os números do path, arredondados) e comparar com a legenda
da p. 12, onde o livro imprime os três ícones ao lado dos nomes.

**A prova de que a leitura fechou:** as três assinaturas aparecem
**251 + 100 + 82 = 433** vezes no livro. Tirando as 3 da própria legenda, sobram
**250 + 99 + 81 = 430** — exatamente uma para cada ficha do Apêndice C.

```
node "Inútil/_extrair-papeis.js"        # lê o PDF → Regras … (papéis).txt
node "Inútil/_gerar-ameacas-arton.js"   # o papel entra nas fichas
```

**Resultado: 429 das 430.** A única sem papel é o **Rival Espelho** (p. 335), e está
certo: o livro não lhe dá ícone, porque ele copia o personagem — o ND sai `?` e a
linha de tipo sai `???`.

| Papel | Quantas | O que o livro diz |
|---|---|---|
| **solo** | 249 | "grandes monstros e vilões" |
| **lacaio** | 99 | "humanoides e monstros pequenos", vêm em bando |
| **especial** | 81 | conjuradores, líderes, uso fora do combate |

### Por que dá para confiar

Quatro checagens independentes, todas batendo:

1. **Contagem exata** — 430 ícones para 430 fichas, nem um a mais.
2. **Visual** — abri a p. 12 e conferi: o ícone de três garras é o *Lacaio* (topo da
   coluna direita), o circular é o *Especial* (meio dela). O terceiro, na coluna da
   esquerda, é o *Solo*.
3. **ND × papel** — lacaio tem ND mediano **2**; solo, **7**. Entre as 22 fichas de
   ND 1/4 e 1/2, 16 são lacaio; entre as 22 de ND 17+, 19 são solo. É exatamente o
   que o texto da regra descreve.
4. **Distribuição por seção** — Dragões: 12 solo, 0 lacaio. Sanguinárias: 10 solo, 0
   lacaio. Mascotes & Familiares: 0 solo, 8 lacaio. Igreja de Arsenal: 5 especial
   (são clérigos). Lê como decisão editorial, não como ruído.

### Os outros três livros da aba

| Livro | Situação |
|---|---|
| **Deuses de Arton** | não tem papel de combate — a expressão não aparece no livro |
| **Guia de NPCs** | idem |
| **Tormenta 20** | ⚠ **tem** o conceito, mas o ícone não é path vetorial. Os XObjects das páginas são camadas de página inteira e as fontes são CID: o ícone deve ser um glifo de fonte símbolo, que é outra investigação. As 80 fichas continuam sem papel. |

Um ganho de tabela: para ler o Tormenta 20 foi preciso ensinar o `Inútil/_pdf.js` a
abrir **PDF criptografado** (AES-256/AESV3 com senha de usuário vazia, que é o caso
dos PDF comprados com marca d'água). Isso vale para qualquer livro futuro.

---

## 7. Como refazer esta conferência

```bash
cd "/c/Users/caiqu/Desktop/RPG/Tormenta 20/Livros"
pdftotext -layout -enc UTF-8 "T20 - Ameaças de Arton.pdf" ameacas.txt   # selo de ND no lugar
pdftotext -raw    -enc UTF-8 "T20 - Ameaças de Arton.pdf" raw.txt       # ordem de leitura
```

A página impressa é a **página do PDF menos 2**. Use `-layout` quando a posição na página
importar (selo de ND, tabelas) e `-raw` quando a ordem de leitura importar (Apêndice C,
Tabela A-2, caixas de Reforços) — as duas erram coisas diferentes, e é olhando as duas
que dá para saber qual está certa.
