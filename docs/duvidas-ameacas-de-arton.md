# *Ameaças de Arton* — lista final de dúvidas

Fechada em **27/08/2026**, quando a última leva do TXT (Puristas → Uivantes) entrou.
O Capítulo 1 do livro está inteiro no sistema: **426 fichas em 30 seções**, mais
163 quadros de regra, 50 regras gerais e 9 itens.

Isto aqui é o que **eu não consegui resolver sozinho**. Nada disso trava o uso da aba —
tudo já está lá dentro. É só para você bater com o livro na mão quando der.

---

## 1. Mecânicas de parceria que a aba 🐎 não sabe representar

A sub-aba **Animais & Montarias** tem hoje três formatos: `montaria`,
`— (parceiro especial: <arquétipo>)` e `— (parceiro arcano)`. Nesta leva o livro
trouxe coisas que não cabem em nenhum dos três.

### 1.1 Falso Amigo — o parceiro que é um NPC infiltrado ⭐

**Nove fichas da seção Sszzaazitas** trazem uma linha `Falso Amigo` no lugar de uma linha
`Parceiro`. Não é bicho: é um sszzaazita disfarçado que **atua como um tipo de parceiro**
e pode trair o grupo a qualquer momento. O quadro *Falsos Amigos* dá a regra dura:
**+10 em Enganação** para manter o disfarce e **+10 em Vontade** contra efeitos que
revelariam sua identidade.

| Ficha | ND | Atua como |
|---|---|---|
| Iniciada de Sszzaas | 3 | Médico **iniciante** |
| Nagah Dormente | 3 | **Parceiro perseguidor** — sem grau |
| Hynne Dormente | 5 | Assassino **veterano** |
| Nagah Sacerdotisa | 5 | Médica **veterana** |
| Nagah Mística | 6 | Adepta **veterana** |
| Nagah Encantadora | 7 | Adepta **veterana** |
| Nagah Defensor | 7 | Fortão **veterano** |
| Cultista de Sszzaas | 7 | Médico **veterano** |
| Sszzaazita Celebrante | 16 | Médico **veterano** |

**Minhas dúvidas:**

1. **Isso entra na aba 🐎 ou não?** Não é montaria nem bicho de estimação — é uma ficha de
   combate que também serve de parceiro. Hoje o texto está só dentro do card da ficha, na
   aba 📕 Fichas prontas, mais o quadro *Falsos Amigos* na seção. **Acho que está certo
   assim**, mas se você quiser que apareça em Animais & Montarias eu monto uma seção nova
   ("Parceiros que são NPCs") em vez de misturar com os bichos.
2. **A Nagah Dormente é a única sem grau.** Todas as outras oito dizem "iniciante" ou
   "veterano"; ela diz só *"Falso Amigo Parceiro perseguidor"*. É assim no livro ou a
   cópia do PDF comeu a palavra?

### 1.2 Familiar — dez fichas têm um benefício que não está em lugar nenhum

Dez fichas trazem uma linha `Familiar`, **separada** da linha `Parceiro`. A aba não tem
esse conceito, então esse benefício não aparece em nenhuma consulta.

| Ficha | Seção | O que o familiar dá |
|---|---|---|
| **Stagh** | Uivantes *(novo)* | +1 na CD das suas magias de frio |
| Aquin'ne | Elementais | natação 9 m, lançar magias e respirar debaixo d'água |
| T'Peel | Elementais | carrega 2 espaços e permite lançar Queda Suave |
| Pakk | Elementais | permite lançar Explosão de Chamas (−1 PM se já souber) |
| Terrier | Elementais | redução de dano 2/impacto |
| Estirge | Ermos | 1 PV temporário cumulativo (exige uma ova de estirge) |
| Chibi-Kabuto | Império de Jade | +1 no bônus de Defesa que suas magias dão |
| Homúnculo | Mascotes | +1 PM para aprimorar magias de transmutação/veneno |
| Tentacute | Mascotes | 1×/rodada, sacar/guardar/pegar item em alcance curto |
| Asa-Assassina | Masmorras | 1 PM para deixar sangrando ao causar corte/perfuração |

**Minha dúvida:** três desses — **Homúnculo, Tentacute e Asa-Assassina** — já estão na aba,
mas **só** com o benefício de *parceiro especial*. O benefício de *familiar* deles ficou de
fora. Quer que eu crie um campo `fam` na aba (uma quarta linha, depois de Mestre), ou uma
sub-lista "Familiares" separada? Sem decisão sua eu não mexo, porque muda o layout da aba.

### 1.3 Parceiro besta de carga — categoria que a aba não lista

Duas fichas usam essa categoria, e o livro manda ver a regra na p. 416:

- **Cavalo de Carga** (ND 1/2) — *"é um parceiro besta de carga"*, e só isso.
- **Trobo** (ND 1) — *"pode ser usado como um parceiro besta de carga **ou** como uma
  montaria (Grande)"*.

A entrada **Trobo** da aba carrega só a metade montaria. **Confirma se a metade "besta de
carga" faz falta** — se fizer, ela vira uma `obs` na entrada, e o Cavalo de Carga ganha
entrada própria.

### 1.4 Parceiros que remetem a outra ficha

Dois casos novos, do mesmo tipo do Gorlogg Alfa que já existia:

- **Mamute** (Uivantes, ND 8) — *"parceiro montaria (Enorme) que fornece **os mesmos
  benefícios que um elefante**"*.
- **Elemental do Veneno Médio** (Sszzaazitas, ND 8) — *"parceiro com **as mesmas
  estatísticas** de um elemental do veneno pequeno"*.

**O que eu fiz:** juntei nas entradas que já existiam — **Elefante / Mamute** e
**Elemental do Veneno** (com os três tamanhos numa `obs`). **Se preferir entradas
separadas**, é uma linha em `js/animais-data.js`.

### 1.5 "parceiro adepto guardião veterano" — dois arquétipos na mesma frase

O **Elfo-do-Mar Druida** (ND 10, Sob as Ondas):

> **Companheiro Animal** O druida sempre está acompanhado de um canceronte que serve como
> um **parceiro adepto guardião veterano** (já contabilizado).

Em nenhum outro lugar do livro dois arquétipos aparecem colados assim. Ou é erro, ou
"adepto" ali é uma sobra de outra frase. **Confere no livro** — está copiado literal.

### 1.6 NPCs que já vêm montados (e de onde saiu o "Troll" da aba)

Quatro fichas descrevem o próprio NPC montado, com o perfil dele — não uma tabela
iniciante/veterano/mestre:

| NPC | Monta |
|---|---|
| Cavaleiro de Kally (ND 8) | corcel de Kally |
| Búfalo Paladino de Bullton (ND 6) | búfalo-de-guerra, *parceiro montaria veterano* |
| Elfo-do-Mar Chefe (ND 6) | selako |
| Cavaleiro Finntroll (ND 7) | **um troll treinado** |

É daí que vem a entrada **Troll** da aba — e ela **continua sem fonte**, porque o livro
não tem ficha "Troll" com linha *Parceiro*; ele manda ver o troll no Tormenta20 p. 308.
Junto com o **Cão de Caça** (que não aparece uma vez sequer no TXT), são as duas únicas
entradas da aba marcadas "Ameaças de Arton" sem statblock por trás. Detalhe em
[animais-fora-do-livro.md](animais-fora-do-livro.md).

### 1.7 Corcel de Comando — confirmado

A montaria mais estranha da aba (*usa **Pilotagem** no lugar de Cavalgar*) enfim ganhou
ficha, na seção Puristas, e o livro diz exatamente isso. **Não é dúvida mais** — fica
registrado porque era.

---

## 2. Os dez ND que ainda são dedução minha

O PDF não trouxe o ND destas fichas. Cada número saiu de duas contas do próprio livro:
a **CD ≈ 10 + 2×ND** dos testes de resistência, e a **escada** que as 426 fichas formam
(ND 4 → Defesa 23 / PV 120 / ataque +16 · ND 5 → 24/195/+17 · ND 6 → 26/210/+20 ·
ND 8 → 33/300/+26 · ND 12 → 42/580/+36 · ND 16 → 53/825/+44).

Vale o aviso: a escada **erra**. Na terceira leva eu tinha deduzido ND 4 para o Hobgoblin
Atirador e o livro dizia 5. Estão em ordem de **quanto eu confio**, do mais seguro para o
mais frágil:

| Ficha | Anotei | Por quê | Confiança |
|---|---|---|---|
| **Uraghian Jovem** (Sanguinárias) | **5** | rajada Ref CD 20 = 10+2×5, e Defesa 24/PV 200/+17 é a mediana de ND 5 número a número (oito fichas de ND 5 repetem esse trio) | alta |
| **Água-viva Gigante** (Sob as Ondas) | **8** | Defesa 33/PV 320/+26 é a mediana de ND 8 nos três números; fecha a escada da entrada: água-viva 1, irukanjin 4, enxame 6, gigante 8 | alta |
| **Mantícora** (Moreania) | **6** | espinhos Ref CD 22 = 10+2×6, e o trio bate com a Górgona (ND 6, 26/231/+20). A Primal é ND 14 | alta |
| **Grande Tachygloss** (Sanguinárias) | **16** | 53/800/+43 = a mediana de ND 16; três fichas de ND 16 repetem isso. Fica logo abaixo do Razza'Kham, ND 17 | alta |
| **Nagah Retalhador** (Sszzaazitas) | **12** | 43/600/+36 = a mediana de ND 12. A peçonha Fort CD 33 cai entre ND 11 e 12 | média |
| **Arqueiro Escravo** (Tauron) | **5** | ficha sem CD nenhuma; fui pelo gêmeo estatístico dela, o Hobgoblin Atirador (ND 5) | média |
| **Kobold Xamã** (Kobolds) | **3** | Aura de Medo Von CD 19 = a do Acólito de Kally (ND 3), e conjura em 3º nível | média |
| **Dançarino de Guerra Veterano** (Puristas) | **6** | 28/175/+20 cai em ND 6. **Mas** a outra dupla adepto→veterano da seção (Arcanos de Guerra) pula de **ND 4 para ND 11** — se o livro fez o mesmo aqui, meu número está muito errado | **baixa** |
| **Nagah Sacerdotisa** (Sszzaazitas) | **5** | os indícios brigam: 23/140/+15 e a conjuração em 7º nível (as nagahs conjuram 2 níveis acima do ND) dizem **5**; mas a peçonha concentrada dela é Fort CD 22, e nas outras quatro fichas do livro com essa peçonha a CD é exatamente 10+2×ND — CD 22 daria **6** | **baixa** |
| **Purificado** (Puristas) | **1/2** | o corpo é de ND 1/4 (Defesa 10, PV 9, sem ataque nenhum), mas a gema explode por 6d6 de essência em alcance curto. Subi um degrau por causa dela | **a mais frágil** |

Para trocar qualquer um: tabela `ND_FALTANDO` em `Inútil/_gerar-ameacas-arton.js`, depois
`node "Inútil/_gerar-ameacas-arton.js"`.

---

## 3. O que o livro promete e a cópia não trouxe

### 3.1 As caixas de "Reforços" — todas as 30

A abertura do capítulo diz:

> Além disso, cada seção inclui uma caixa de "Reforços" — criaturas de outras seções que
> se encaixam tematicamente no grupo.

A palavra "Reforços" aparece **uma única vez** no TXT inteiro: nessa frase. Nenhuma das 30
caixas veio na cópia. Se elas importarem para a aba (seriam ótimas para montar encontro),
seria preciso colar essa parte à mão — são 30 listas curtas de nomes.

### 3.2 O papel de combate (solo / lacaio / especial)

Continua vazio nas 426 fichas, como combinamos: no livro é um **ícone**, e ícone não
sobrevive à cópia do PDF. A aba assume "lacaio" até você trocar na ficha.

---

## 4. Deslizes do livro (ou da cópia) que eu consertei — confira

Nenhum número de regra foi tocado. Estes são os que mudam alguma coisa visível:

| Ficha / quadro | O que veio | O que virou |
|---|---|---|
| **Protetor-Refém** (ND 5) | linha de tipo **"Anão Médio"** | "Humanoide (anão) Médio" |
| Perdigueiro Troll | "é **um um** parceiro especial" | "é um parceiro especial" |
| Platan | "natação 9m **e e** você recebe" | "natação 9m e você recebe" |
| Hippossauro | "(**hipossauro** fêmea)" com um *p* a menos | "(hippossauro fêmea)" |
| Sacerdote Finntroll | "símbolo sagrado de Megalokk. **TesouroPadrão**." | "… Tesouro Padrão." |
| entrada dos moreau | título "**Moreau 301**" (o 301 é o número da página) | "Moreau" |
| entrada do selako | título "**Selako ND 2**" | "Selako" |

O **Protetor-Refém** é o mais sério: sem esse conserto a ficha **sumia inteira** do
resultado (o gerador acha as fichas pela linha de tipo, e "Anão" não é um dos oito tipos do
T20 — todo anão do sistema é *Humanoide (anão)*). Ele foi a 426ª ficha, e só apareceu
porque fui atrás de uma caixa de regra fantasma chamada "Anão Médio". **Vale a conferida.**

---

## 5. Coisas que o livro deixou em aberto (não são erro meu)

- **Rival Espelho** (Sszzaazitas) — o livro imprime **ND ???**, tipo **???** e a primeira
  habilidade **???**, porque ele copia a ficha do personagem. Não dá para virar ficha de
  combate: ficou como quadro de regra dentro da seção. **Se você quiser** que ele apareça
  na lista de fichas mesmo assim (com ND "???"), eu mudo.
- **Alto Sacerdote Finntroll** (ND 12) — duas magias sem CD nenhuma: *Pele de Pedra*
  ("Fort evita") e *Toque Vampírico* ("Fort reduz à metade"). Pela conjuração dele
  (mago de 15º nível, CD 35) as duas deveriam ser **CD 35**. Não escrevi nada: o livro não
  escreveu.
- **Coruja Druida** (Moreania) — sai como "Humanoide (**M**oreau) Médio", com M maiúsculo;
  as outras duas fichas moreau vêm com minúscula. Deixei como o livro.
- **Defeituoso** (Trolls Nobres) — sai como "Monstro Médio", sem subtipo. **Está certo**:
  ele é um prisioneiro mutado nos experimentos finntroll, não um finntroll — por isso
  fica de fora do quadro *Habilidades de Finntroll*, que a aba anexa automaticamente às
  outras sete fichas da seção.
- **Wisphago** e **Verme do Gelo Adulto** — o gerador reclamou que gastam PM sem ter linha
  de Pontos de Mana. **Alarme falso**: nos dois casos o PM é de *outra* criatura (Fome de
  Mana drena PM da vítima; Frio Extremo encarece habilidades de fogo dos outros).

---

## 6. Regras novas que dá para colocar mecanicamente no sistema

Você pediu no topo do TXT para eu citar regra que ainda não exista mecanicamente. Da quinta
leva, estas são as candidatas:

1. **Soro Supremo** (Puristas) — já entrou como **item** da aba. Teste estendido de
   Ofício (alquimista) CD 40, 5 sucessos antes de 3 falhas, sobre o corpo de um soldado
   superior; a dose dá **+1 permanente** em For, Des ou Con (só uma por personagem).
   Cabe na aba de **criação de itens**?
2. **O Filactério de um Lich** — item mágico maior, **Defesa 20, RD 40, 50 PV**; destruí-lo
   é a única forma de matar um lich de vez, e o que sobra é um *fragmento de filactério*
   (que aparece na linha de Tesouro de três fichas). Ficou como quadro de regra. Vira item
   também?
3. **Equipamento Purista** — equipamento purista é vendido por **um quarto** do preço, não
   pela metade. Isso é uma regra de **loja**, e a loja hoje não sabe disso.
4. **Gema da Purificação** (Purificado) — desativar exige ação completa e teste de
   Ladinagem ou Misticismo **CD 20**; falhar detona na hora. É um perigo/armadilha.
5. **Libertação Mental** (Protetor-Refém) — deixar o alvo esmorecido/exausto/enfeitiçado e
   depois um teste estendido de Diplomacia **CD 20, 3 sucessos**, cada teste uma ação
   completa. Também é mecânica de cena, não de ficha.
6. **Ódio Puro** e **O Exército Purista** — são lore com números soltos (efetivos,
   hierarquia). Não vi regra dura para extrair; deixei como quadro.

---

## 7. Como refazer tudo

```
node "Inútil/_gerar-ameacas-arton.js"     # regera js/fichas-ameacas-arton-data.js
node "Inútil/_conferir-montarias.js"      # cruza a aba 🐎 com as linhas "Parceiro"
```

Os dois relatórios saem em `Inútil/_relatorio-ameacas-arton.txt` e
`Inútil/_relatorio-montarias.txt`.
