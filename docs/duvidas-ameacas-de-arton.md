# *Ameaças de Arton* — o que ficou resolvido e o que ainda está aberto

Aberta em **27/08/2026**, quando a última leva do TXT (Puristas → Uivantes) entrou.
Fechada no mesmo dia, com as respostas do Caique e o **Apêndice C** do livro (a lista
de criaturas por ND).

**Estado: 427 fichas em 30 seções · 162 quadros de regra · 50 regras gerais · 8 itens.**
**Todos os 427 ND batem com o Apêndice C — zero divergência.**

---

## 1. O que o Apêndice C resolveu

A lista de criaturas por ND do próprio livro virou a régua: dá para bater **todas** as
fichas de uma vez, em vez de conferir uma a uma.

```
node "Inútil/_gerar-ameacas-arton.js"     # regera as fichas
node "Inútil/_conferir-montarias.js"      # cruza a aba 🐎 com as linhas "Parceiro"
```

### As dez deduções: nove certas, uma errada

| Ficha | Eu tinha deduzido | Livro | |
|---|---|---|---|
| Uraghian Jovem | 5 | **5** | ✅ |
| Água-viva Gigante | 8 | **8** | ✅ |
| Mantícora | 6 | **6** | ✅ |
| Grande Tachygloss | 16 | **16** | ✅ |
| Nagah Retalhador | 12 | **12** | ✅ |
| Arqueiro Escravo | 5 | **5** | ✅ |
| Kobold Xamã | 3 | **3** | ✅ |
| Dançarino de Guerra Veterano | 6 | **6** | ✅ |
| Nagah Sacerdotisa | 5 | **5** | ✅ |
| **Purificado** | 1/2 | **2** | ❌ |

O **Purificado** é a lição: o corpo dele é de ND 1/4 (Defesa 10, PV 9, nenhuma linha de
ataque, For 0/Des 2/Con 1) e eu subi um degrau só por causa da gema. O livro subiu
**três**: para ele, a ameaça é a bomba, não o hynne. A escada de Defesa/PV/ataque não
enxerga isso.

### Três ND que a cópia do PDF tinha trazido errados

O apêndice pegou coisas que ninguém tinha notado:

| Ficha | Estava | Agora | Por quê |
|---|---|---|---|
| **Namasqall** (Elementais) | 13 | **14** | ⚠ estava anotado como "conferido por você" desde a 2ª leva. A CD 36 do Maremoto ainda aponta 13 pela conta 10 + 2×ND, mas PV 700 é a mediana exata de ND 14 — e o apêndice é o próprio livro. **Vale reconferir na página da ficha.** |
| **Lefeu, Hurobakk** (Áreas de Tormenta) | 8 | **9** | o statblock diz 8, o apêndice diz 9 (p. 25). A ficha concorda com o apêndice: as três CDs dele são 28 = 10 + 2×9, e Defesa 35/PV 380/+28 é a mediana de ND 9. |
| **Elfo-do-Mar Pescador** (Sob as Ondas) | 3 | **2** | o statblock diz 3, o apêndice diz 2 (p. 316). A ficha concorda com o apêndice: Defesa 18/PV 14/ataque +14 é, número a número, o Trog Caçador, que é ND 2. PV 14 seria absurdo para um ND 3 deste livro (mediana 82). |

Nas duas últimas o **próprio livro se contradiz** — o cabeçalho do statblock diz um
número e o índice diz outro. Não é erro de cópia. Valeu o apêndice nos dois casos, mas
se você quiser conferir a página da ficha, é onde eu olharia primeiro.

### Três fichas do livro que não estão no sistema

O apêndice lista 430 criaturas; eu tenho 427. As três que faltam estão **fora do
Capítulo 1**, em páginas que nunca vieram no TXT:

| p. | ND | Criatura |
|---|---|---|
| 371 | 10 | Bispo do Forte Sagrado |
| 386 | 6 | Dejeto vivo |
| 389 | 5 | Cardume de aquin'ne |

**Se quiser essas três, é só colar as páginas delas** — o gerador aceita, mas elas não
pertencem a nenhuma das 30 seções e precisariam de um lugar.

---

## 2. O que mudou no sistema com as suas respostas

| Você disse | O que eu fiz |
|---|---|
| Falso Amigo fica só na ficha | Nada a mudar — já era assim. Fica anotado que uma sub-aba própria seria interessante depois. |
| Nagah Dormente sem grau é do livro | Nada a mudar. Fica literal. |
| Crie uma aba de **Familiares** em Consultas | Feito: **🦉 Familiares**, com as **11** criaturas que têm linha `Familiar` + 3 quadros de regra. Arquivos novos: `js/familiares-data.js` e `js/familiares.js`. |
| Besta de carga vira um `OBS:` | Feito no **Trobo**, e o **Cavalo de Carga** ganhou entrada própria na aba 🐎. ⚠ mas veja a pendência abaixo. |
| Mamute / Elemental do Veneno: resolvido? | Sim. Ficaram juntos em **Elefante / Mamute** e **Elemental do Veneno**. |
| "adepto guardião" é adepto **E** guardião | Nada a mudar. Fica literal — é o único parceiro do livro com dois arquétipos. |
| "Anão Médio" existe, mas o certo é Humanoide (anão) | Era exatamente o que eu tinha feito. Confirmado. |
| Rival Espelho é "???" mesmo | Virou **ficha** (ND ?), como o Apêndice C o lista. Aparece por último na seção Sszzaazitas. |
| Alto Sacerdote Finntroll: CD é 35 | A CD já estava na ficha — o que faltava era o espaço em `MagiasComo`, que colava a linha de Magias na anterior. Corrigido; a ficha inteira que você mandou bate com a minha, linha por linha. |
| Soro Supremo: não craftável, citado na ficha do soldado | Saiu da lista de itens. Agora é a última linha da ficha do **Soldado Superior**. |
| Filactério: só citado | Continua como quadro de regra na seção Reino dos Mortos. |
| Equipamento purista 1/4 no bloco de equipamento | Entrou em **⚔ Arsenal & Regras** (novo verbete "Equipamento purista (vale 1/4, não metade)") e na dica da caixa da comunidade, na **Loja**, ao lado da regra da metade. |
| Gema da Purificação / Libertação Mental são regra de ficha | Nada a mudar. Ficam no texto das fichas. |

---

## 3. O que continua aberto

### 3.1 Troll e Cão de Caça — as duas entradas sem fonte ⚠

Aqui eu me expliquei mal. De novo, do começo:

A aba **🐎 Animais & Montarias** tem 73 entradas. Sessenta delas dizem
`fonte: 'Ameaças de Arton'`. Eu consigo apontar, para 58 dessas 60, a ficha exata do
livro de onde os números saíram — o script confere e bate.

**Duas não têm ficha nenhuma por trás:**

**Cão de Caça.** A expressão "cão de caça" não aparece **uma única vez** nas 23.786
linhas do TXT do livro. Os benefícios que estão na aba (deslocamento 9 m + faro →
12 m + 2 na Defesa → derrubar como ação livre) vieram de algum lugar que não é este
livro. *(A entrada da lojinha — cão de caça por T$ 150 — está certa e é outra coisa:
aquela é do Tormenta20 básico.)*

**Troll.** O livro **não tem** uma ficha "Troll" com linha `Parceiro`. O único
troll-montaria que ele descreve é o do **Cavaleiro Finntroll**, e é o perfil montado do
NPC, não uma tabela para o jogador:

> **Corcel Troll** O cavaleiro finntroll cavalga um troll treinado, um parceiro montaria
> Grande. Enquanto estiver montado, seu deslocamento se torna 12m, ele recebe uma ação
> de movimento extra (apenas para se deslocar), os seguintes ataques (em adição ao seu
> açoite) e Dilacerar.

Os benefícios que estão na aba (+1d8 → +1d10 → +2d8 de dano, mais agarrar e derrubar)
não estão nessa frase nem em lugar nenhum do livro.

**A pergunta é só esta: o que faço com as duas?**
- **(a)** deixar como estão e trocar a fonte para "Wiki de Tormenta 20" (ou o livro certo, se você souber qual é);
- **(b)** tirar as duas da aba;
- **(c)** você me passa a página onde elas estão e eu conserto os números.

Sem resposta, elas ficam como estão — com a fonte errada.

### 3.2 As caixas de "Reforços" ⚠

Também me expliquei mal. A abertura do Capítulo 1 promete isto:

> Cada seção inclui uma caixa de "Reforços" — criaturas de outras seções que se encaixam
> tematicamente no grupo. Os reforços funcionam como uma sugestão de outras criaturas
> que combinam com o tema.

Ou seja: na seção **Gnolls**, por exemplo, deveria haver uma caixinha dizendo algo como
"reforços: hiena, hienodonte, ogro, warg…" — uma lista de nomes de outras seções que
combinam com aquele tema, para o mestre montar encontro sem folhear o livro inteiro.

**Nenhuma das 30 caixas veio na cópia.** A palavra "Reforços" aparece exatamente uma vez
nas 23.786 linhas: naquela frase da abertura. O texto delas simplesmente não está no TXT.

**A pergunta:** vale colar essas 30 caixinhas? São listas curtas, só de nomes. Se você
colar, eu ponho um bloco "⚔ Reforços" no topo de cada seção da aba de fichas prontas,
com os nomes clicáveis. Se achar que não vale, eu tiro isso da lista de pendências e a
gente esquece.

### 3.3 A regra de "besta de carga" não veio

A ficha do Cavalo de Carga diz só isto: *"O cavalo de carga é um parceiro besta de carga
(veja a página 416)"*. A **p. 416 está fora do Capítulo 1** — a regra em si nunca foi
colada em TXT nenhum (procurei nos quatro que temos).

Coloquei o `OBS:` que dava para sustentar: que é uma categoria própria, diferente de
montaria e de parceiro especial, que não tem os três degraus, e que a regra está naquela
página. **Se você colar o texto da p. 416, eu troco o OBS pela regra de verdade** — e aí
o Trobo e o Cavalo de Carga ficam completos.

---

## 4. Coisas que ficaram registradas, sem ação

- **Coruja Druida** sai como "Humanoide (**M**oreau) Médio", com M maiúsculo; as outras
  duas fichas moreau vêm com minúscula. Deixado como o livro.
- **Defeituoso** sai como "Monstro Médio", sem subtipo — está certo: é um prisioneiro
  mutado nos experimentos finntroll, não um finntroll. Por isso fica de fora do quadro
  *Habilidades de Finntroll*, que a aba anexa às outras sete fichas da seção.
- **Wisphago** e **Verme do Gelo Adulto** — o gerador reclamava que gastam PM sem ter
  linha de Pontos de Mana. Alarme falso: nos dois casos o PM é de *outra* criatura.
- **O papel de combate** (solo/lacaio/especial) continua vazio nas 427 fichas, como
  combinado — no livro é um ícone, e ícone não sobrevive à cópia.

---

## 5. Deslizes do livro consertados nesta rodada

Nenhum número de regra foi tocado.

| Ficha / quadro | Veio | Virou |
|---|---|---|
| **Protetor-Refém** | linha de tipo "Anão Médio" | "Humanoide (anão) Médio" — sem isso a ficha **sumia inteira** |
| Alto Sacerdote Finntroll | "…(já contabilizado). **MagiasComo** um clérigo de Tenebra" | "… Magias Como um clérigo…" (sem o espaço, o bloco de magias sumia para o bestiário) |
| T'Peel | a linha de Familiar acabava sem ponto | ponto final |
| Perdigueiro Troll | "é **um um** parceiro especial" | "é um parceiro especial" |
| Platan | "natação 9m **e e** você recebe" | "natação 9m e você recebe" |
| Hippossauro | "(**hipossauro** fêmea)", com um *p* a menos | "(hippossauro fêmea)" |
| Sacerdote Finntroll | "de Megalokk. **TesouroPadrão**." | "… Tesouro Padrão." |
| entrada dos moreau | título "**Moreau 301**" (o 301 é o número da página) | "Moreau" |
| entrada do selako | título "**Selako ND 2**" | "Selako" |
