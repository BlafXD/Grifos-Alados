# Conferência dos itens contra os livros

**Data:** 02/09/2026 · **Fonte:** os PDFs em `C:/Users/caiqu/Desktop/RPG/Tormenta 20/Livros`

Mesma ideia da conferência das fichas: em vez de comparar o projeto com um TXT
colado, cada tabela de equipamento foi **lida do PDF** e cruzada com os dados do
site. O que vale como verdade é a tabela impressa no livro.

---

## 1. O que foi varrido

**Quatro livros têm itens.** Os outros quatro (Atlas de Arton, Guia de NPCs,
Deuses Menores e Encartes) foram varridos e **não trazem nenhuma tabela de
item** — o Atlas só cita a Tabela 8-1 do básico.

| Livro | Tabelas lidas |
|---|---|
| **Tormenta 20** (Ed. Jogo do Ano) | 3-3 Armas · 3-4 Munições · 3-5 Armaduras & Escudos · 3-6 Itens Gerais · 3-8 Melhorias · 8-8 a 8-15 (encantos, itens específicos, poções, acessórios) |
| **Heróis de Arton** v1.1 | 3-1 Armas · 3-2 Munições · 3-3 Armaduras & Escudos · 3-4 Itens Gerais · 3-5 Novas Melhorias · 3-9 a 3-12 · as quatro seções de **Encantos** (armas, armaduras & escudos, esotéricos, acessórios) |
| **Ameaças de Arton** | 3-1 Novas Armas · 3-2 Novas Armaduras e Escudos · 3-3 Novos Itens Gerais · Novos Itens Mágicos e Artefatos |
| **Deuses de Arton** v1.1 | 1-3 Itens Gerais · 1-4 Melhorias · Itens Litúrgicos |

### Contagem

| | livros | projeto | falta |
|---|---|---|---|
| Equipamento (nomes distintos) | 508 | 455 (458 linhas) | 0 (as 53 diferenças são Animais/Veículos/Serviços — §2.1) |
| Encantos (vagas por categoria) | 174 | 96 | **78 vagas / 58 nomes** |
| Itens mágicos nomeados | 265 | 257 | **8** |
| Melhorias (nomes distintos) | 46 | 46 | **1** ("Aprimorado") |

*A conta de encantos é por vaga: armadura e escudo têm listas próprias, com o
mesmo conteúdo. São 58 nomes distintos, 20 deles valendo para as duas listas.
Em melhorias o projeto guarda 49 verbetes porque separa as formas feminina e
masculina (macabra/macabro) e traz uma extra do Suplemento do Mestre
("Penetrante").*

**Descrições: 100%.** Usando o `ItensDescricoes.get()` real (com `ALIASES` e o
recurso às magias), **458/458** itens do catálogo, **96/96** encantos e
**720/720** entradas das tabelas de recompensa têm verbete. Nenhuma nuvem
"📖 Descrição" sai vazia.

**Tabelas d%: íntegras.** As 17 tabelas de `js/recompensas.js` cobrem 1–100 sem
buraco e sem retroceder. As três exceções são de propósito e conferem com o
livro: `MAGICO_*` param em 90 (91-100 é "item específico") e `POCAO_TABLE` vai
até 120 porque a mesa estendeu a tabela com poções de outros livros — o
`lookupPocao` rola `d120` de acordo.

---

## 2. Completude — está faltando algum item?

### 2.1 Equipamento mundano: nada falta

Os 458 itens do catálogo cobrem **todas** as linhas de equipamento das quatro
tabelas de Itens Gerais, das três de Armas, das três de Armaduras & Escudos e
das duas de Munições. Nenhum item de tabela ficou de fora.

Fora do catálogo ficaram 50 linhas, todas das seções **Animais**, **Veículos** e
**Serviços** — que a loja não vende por desenho (os animais estão em
`js/animais-data.js`, os veículos em `js/veiculos-data.js`). São elas:

- **T20** — Animais: Alforje, Cão de caça, Cavalo, Cavalo de guerra, Estábulo
  (por dia), Pônei, Pônei de guerra, Trobo · Veículos: Balão goblin, Carroça,
  Carruagem, Canoa, Veleiro · Serviços: Estadia (comum/confortável/luxuosa),
  Condução (terrestre/marítima/aérea), Curandeiro, Magia (1º/2º/3º círculo),
  Mensageiro
- **Heróis** — Veículos: Barcaça, Biga de guerra, Dirigível goblin, Jangada,
  Veleiro · Serviços: Banho quente, Bigode encerado, Instrução marcial,
  Maquiagem profissional, Mercenário (4 faixas), Ópera, Sarau informativo
- **Ameaças** — Animais: Bulette, Capivara, Corcel do deserto, Dromedário,
  Elefante, Hiena, Leão, Rinoceronte, Urso pardo
- **Deuses** — Serviços: Casamento (por pessoa), Cerimônia religiosa, Sacramento

> Vale decidir se os **Serviços** (23 linhas, com preço) merecem uma sub-aba
> própria — hoje eles não existem em lugar nenhum do site.

### 2.2 Encantos: **58 faltam na loja** ⚠ o maior buraco

O `js/recompensas.js` já conhece os encantos dos três livros (50 de arma, 45 de
armadura/escudo, 26 de esotérico). O `js/loja_completa.js` só tem os do
**Tormenta 20** — e, nos esotéricos, só 10 dos 26.

| categoria | loja | livros | faltam |
|---|---|---|---|
| arma | 28 | 50 | **22** |
| armadura | 25 | 45 | **20** |
| escudo | 25 | 45 | **20** |
| esotérico | 10 | 26 | **16** |
| acessório | 8 | 8 | 0 ✔ |

Todos os 58 vêm do **Heróis de Arton** (p. 256-261) e **todos já têm descrição
no projeto** — falta só entrarem no `ENCANTAMENTOS`:

- **Arma:** Alvorada · Anátema · Brumosa · Cantante · Ciclônica · Crescente ·
  Cristalina · Cronal · Cuidadora · Espreitadora · Frenética · Gárgula ·
  Horrenda · Indignada · Infestada · Manáfaga · Rebote · Reflexiva · Ressonante ·
  Sepulcral · Sombria · Vampírica
- **Armadura & escudo:** Abissal · Ancorada · Anulador · Arbóreo · Astuto ·
  Densa · Égide · Enraizada · Esmérico · Estígio · Etéreo · Geomântico ·
  Ligeira · Luminescente · Prístino · Purificador · Reanimador · Replicante ·
  Resiliente · Vórtice
- **Esotérico:** Embusteiro · Encadeado · Escultor · Frugal · Imperioso ·
  Implacável · Incriminador · Inflamável · Inquisidor · Insistente ·
  Khalmyrita · Pulverizante · Retaliador · Sanguessuga · Traiçoeiro · Verdugo

**Consequência prática:** a loja especial sorteia hoje sobre 1/3 do repertório
de encantos que o gerador de recompensas usa. Os dois lugares do site discordam
sobre o que existe no mundo.

### 2.3 Itens mágicos: 8 de *Ameaças de Arton* ausentes

O livro tem um bloco "Novos Itens Mágicos" + "Novos Artefatos" (p. 402-403) que
não entrou em `js/recompensas.js` nem nas descrições. Os oito nomes só aparecem
como equipamento **dentro de fichas** em `js/fichas-ameacas-arton-data.js`:

Chifre de Unicórnio · Fragmento de Filactério · Grilhão de Descrença ·
Pilão Conspurcado · Pistola Demoníaca · Rompedor da Realidade ·
Uyzrrak Da'ukthra · **Amuleto do Abutre** (artefato)

Os 257 demais itens mágicos nomeados (T20, Heróis e Deuses) estão todos lá.

### 2.4 Melhorias: falta uma

As 47 melhorias de `recompensas.js` cobrem T20, Heróis, Deuses e até o
Suplemento do Mestre. A única do livro que não existe em lugar nenhum é
**"Aprimorado"** (T20, Tabela 3-8, "Melhorias para ferramentas e vestuário") —
coerente com o gerador só rolar melhoria de arma/armadura/esotérico, mas a nuvem
"📖 Descrição" também não a encontra.

---

## 3. Erros de conteúdo — 16 valores divergem do livro

Todos foram confirmados por **duas extrações independentes** do mesmo PDF
(o leitor posicional do projeto e o `pdftotext -layout`). Todos vivem no
`ITENS_BASE`, em `js/loja_completa.js:22`.

### Preços (12)

| item | livro | projeto | livro/página |
|---|---|---|---|
| **Veste de teia de aranha** | T$ 3.000 | **T$ 3** | Ameaças, Tab. 3-2 |
| Tocha | T$ 0,1 | **T$ 0,11** | T20, Tab. 3-6 |
| Cajado de pastor | T$ 12 | T$ 100 | Deuses, Tab. 1-3 |
| Colar do suplicante | T$ 100 | T$ 30 | Deuses, Tab. 1-3 |
| Panfleto de aforismos | T$ 60 | T$ 30 | Deuses, Tab. 1-3 |
| Manto de alto sacerdote | T$ 100 | T$ 300 | Deuses, Tab. 1-3 |
| Frasco purificador | T$ 100 | T$ 300 | Deuses, Tab. 1-3 |
| Rede de almas | T$ 600 | T$ 1.000 | Deuses, Tab. 1-3 |
| Bombas de saber | T$ 4 | T$ 3 | Deuses, Tab. 1-3 |
| Justos de Khalmyr | T$ 2 | T$ 6 | Deuses, Tab. 1-3 |
| Ouro de dragão | T$ 6 | T$ 3 | Deuses, Tab. 1-3 |
| Suflê rubro | T$ 3 | T$ 4 | Deuses, Tab. 1-3 |

A **Veste de teia de aranha** é a mais grave: uma armadura leve **+4 de Defesa,
0 de penalidade** saindo por T$ 3 em vez de T$ 3.000 quebra qualquer loja gerada.

A **Tocha** denuncia o defeito de importação: o preço "T$ 0,1" e a coluna
Espaços "1" foram **colados** — virou `price: 0.11` e `weight: null`. Vale
procurar o mesmo padrão em qualquer importação futura de tabela de três colunas.

### Espaços (3)

| item | livro | projeto |
|---|---|---|
| Tocha | 1 | `null` (some da ficha) |
| Cajado de pastor | 2 | 1 |
| Tonsura | — | 1 |

### Arma (2)

| item | campo | livro | projeto |
|---|---|---|---|
| **Espadim** | crítico | **20** | X2 |
| **Tai-tai** | tipo | **Impacto** | Perfuração |

*(Heróis de Arton, Tabela 3-1. O Espadim é `T$ 300 · 1d8 · 20 · — · Corte · 1`.)*

---

## 4. Nomes

### 4.1 Errados (4)

| projeto | livro |
|---|---|
| Pão de **Thorw** | Pão de **Thwor** (o deus anão) |
| Carcaça do predador**...** | Carcaça do predador **primal** |
| Garras do predador**...** | Garras do predador **primal** |
| Penas do predador | Penas do predador **primal** |

Os três "predador" ficaram com o nome truncado na importação — dois com
reticências literais no dado, um simplesmente cortado. São itens de *Vestuário*
do Deuses de Arton (T$ 150 / T$ 300 / T$ 100).

### 4.2 Caixa divergente (5)

O livro escreve o nome das armaduras em caixa de frase; o projeto usa Iniciais
Maiúsculas em cinco delas — e só nelas, o que também é inconsistente com as
outras 20 armaduras do próprio catálogo:

Armadura **S**ensual · Armadura de **F**olhas · Armadura de **O**ssos ·
Cota de **M**oedas · Colete fora da **L**ei

---

## 5. Informalidades (não quebram nada, mas o catálogo discorda de si mesmo)

1. **Crítico com "X" maiúsculo × "x" minúsculo — 32 contra 31.** Os itens
   importados do *Tormenta 20* usam `x2`/`x3`; os do *Heróis* e do *Ameaças*
   usam `X2`/`X3`/`19/X3`. Os livros imprimem sempre minúsculo — a única
   exceção é o **Tetsubo** (*Ameaças*), que sai `X2` no próprio livro e está
   certo no projeto.

2. **Munição com alcance "Corpo a corpo" — 12 linhas.** O livro traz "—" na
   coluna Alcance das munições; a importação traduziu "—" para "Corpo a corpo"
   em todo o catálogo, o que faz sentido para arma corpo a corpo mas não para
   um pacote de flechas.

3. **Três nomes de campo para a mesma coluna.** "Espaços" é `peso` em arma,
   `armor_weight` em armadura e `weight` em item geral. O
   `_montarLinhaItem()` normaliza os três na hora de exibir, então funciona —
   mas qualquer código novo que leia `ITENS_BASE` direto precisa saber disso.

4. **Encantos só de escudo aplicáveis a armadura.** O livro marca **Animado** e
   **Esmagador** como "Apenas escudos. Para armaduras, role novamente" (T20,
   Tab. 8-10). O `recompensas.js` respeita isso (`obs:"** Apenas escudos"`); o
   `loja_completa.js` usa a **mesma lista de 25 encantos** para armadura e
   escudo, então a loja pode oferecer uma armadura *animada*.

5. **Encantos que contam dobrado sem marca.** **Magnífica** (arma) e
   **Guardião** (armadura/escudo) contam como dois encantos no livro; na loja
   entram como um qualquer.

6. **`Instrumentos de <ofício>`** guarda o marcador literal `<ofício>` no nome.

7. **Traço curto onde o livro usa travessão.** Dano, crítico e tipo das 14
   linhas sem valor guardam `"-"`; o livro imprime `"—"`.

8. **"Corte ou perfuração"** (Espada vespa) — o livro escreve
   "Corte ou **P**erfuração".

---

## 6. Pendente — o que fazer (decidido em 02/09/2026)

Nada foi corrigido nesta varredura. O Caique vai aplicar depois, **nesta ordem**
(risco crescente, esforço crescente):

**Etapa 1 — os 16 valores e os 4 nomes.** Tudo no `ITENS_BASE`, em
`js/loja_completa.js:22` (o array inteiro é uma linha só). Risco baixo, é troca
de literal. As tabelas de §3 e §4.1 têm valor de origem e valor de destino de
cada um. Comece pela **Veste de teia de aranha** (T$ 3 → T$ 3.000), que é a
única com efeito de jogo real. Na mesma passada dá para resolver a caixa das 5
armaduras (§4.2) e o `X`/`x` do crítico (§5, item 1) — mas **o Tetsubo fica com
`X2`**, que é o que o livro imprime.

**Etapa 2 — os 58 encantos.** Copiar de `MAGICO_ARMA`, `MAGICO_ARMADURA` e
`MAGICO_ESOTER` (`js/recompensas.js`) para o `ENCANTAMENTOS` de
`js/loja_completa.js:24`. Os nomes estão em §2.2; todos já têm descrição, então
não é preciso escrever texto nenhum. Dois cuidados: o campo do encanto na loja é
`{name, effect}` com o efeito curto (a coluna "Efeito" da tabela do livro), e
**`Animado` e `Esmagador` não deveriam entrar na lista de armadura** (§5, item 4)
— hoje as listas de armadura e escudo são idênticas, e essa é a hora de separá-las.

**Etapa 3 — os 8 itens mágicos do *Ameaças de Arton*.** É a mais trabalhosa:
além da entrada nas tabelas de `js/recompensas.js`, cada um precisa de
**descrição nova** em `js/itens-descricoes-extra-data.js` (nenhum dos oito tem).
O texto está no PDF, p. 402-403 — e o *Amuleto do Abutre* é artefato, então cabe
decidir se entra no sorteio de recompensa ou fica só como item consultável.

**Fora de escopo, a decidir:** a melhoria "Aprimorado" (§2.4) e as 23 linhas de
**Serviços** (§2.1), que hoje não existem em canto nenhum do site.

---

## 7. O que fica de método

- **Ler tabela de livro exige o x de cada campo.** Nem `pdftotext -layout` nem
  agrupar por proximidade funcionam: as colunas dos livros são
  **centralizadas**, então "a maior coluna ≤ x" erra e o vizinho engole o campo.
  O que funciona é **coluna mais próxima do centro**.
- **Cada livro tem sua escala de texto.** No T20 as linhas distam ~15 unidades;
  no *Heróis*, ~1,65 (a tabela é desenhada num sistema de coordenadas
  escalado). Tolerância proporcional ao `tam` da fonte **não** resolve, porque
  o `tam` vem da matriz `Tm` e ignora o `cm`. O que resolve é **y exato**
  (tolerância 0,35): as células de uma linha saem do PDF com o mesmo y.
- **O *Ameaças de Arton* desenha cada linha de tabela como um único run**
  (`"Neko-teT$ 101d419—Corte1"`). Não há coluna nenhuma para ler; as três
  tabelas dele foram transcritas à mão do PDF.
- **Nome que quebra em duas linhas:** o fragmento que começa em **minúscula**
  continua o de cima. Essa regra sozinha resolveu os 14 nomes partidos da
  Tabela 3-12 do *Heróis* ("Botas do andarilho" + "das sombras").
- **A armadilha do heredoc voltou.** `cat > x.js <<'EOF'` **também** come as
  barras invertidas de uma regex — o `\\[` do script virou `\[`... e depois
  nada. Script de análise se escreve com a ferramenta de escrita, não com
  heredoc.
- **Confira a cobertura de descrição com o `get()` real, não com uma
  normalização sua.** Minha primeira conta acusou 63 itens sem verbete; o
  `ItensDescricoes.get()` de verdade — com `ALIASES` e o recurso às magias —
  acha todos os 720.
