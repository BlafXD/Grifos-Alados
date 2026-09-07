# Conferência dos itens contra os livros

**Data:** 02/09/2026 · **Fonte:** os PDFs em `C:/Users/caiqu/Desktop/RPG/Tormenta 20/Livros`

**Estado do conserto: acabou — as seis etapas estão feitas.** Etapa 1 em
06/09/2026 (os 16 valores, os 4 nomes, a caixa e o `X`→`x`); etapas 2 e 3 em
07/09/2026 (os 58 encantos com a separação armadura × escudo, e os 8 itens
mágicos do *Ameaças*), mais o preço dos 84 itens específicos, que a etapa 3
revelou faltando; a **etapa 4**, também em 07/09/2026, que fechou as duas pontas
que sempre estiveram fora do plano — a melhoria **"Aprimorado"** (§2.4) e os
**Serviços** (§2.1), agora uma sub-aba da Loja; a **etapa 5**, que ela mesma
revelou — o gerador não conhecia as **restrições de tipo** das melhorias e podia
pôr mira telescópica em espada; e a **etapa 6**, a conferência completa das
melhorias contra os quatro livros, que achou uma melhoria inteira faltando
(*Multifuncional*, do *Ameaças*), pôs cada uma exatamente nas categorias que os
livros permitem e desfez duas atribuições erradas. O que cada uma fez está em
§6. **Nada continua em aberto.**

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
| **Ameaças de Arton** | 3-1 Novas Armas · 3-2 Novas Armaduras e Escudos · 3-3 Novos Itens Gerais · **Novas Melhorias (p. 399)** · Novos Itens Mágicos e Artefatos |
| **Deuses de Arton** v1.1 | 1-3 Itens Gerais · 1-4 Melhorias · Itens Litúrgicos |

### Contagem

| | livros | projeto | falta |
|---|---|---|---|
| Equipamento (nomes distintos) | 508 | 455 (458 linhas) | 0 (as 53 diferenças são Animais/Veículos/Serviços — §2.1) |
| Encantos (vagas por categoria) | 168 | 96 → **168** ✔ | **72 vagas / 58 nomes** — feito em 07/09 |
| Itens mágicos nomeados | 265 | 257 → **263** ✔ | **8** — feito em 07/09 (6 nas tabelas + 2 artefatos só com descrição) |
| Melhorias (nomes distintos) | 48 | 46 → **48** ✔ | **2** ("Aprimorado" e "Multifuncional") — feito em 07/09 |

*A conta de encantos é por vaga: armadura e escudo têm listas próprias — hoje
com conteúdo diferente (§5, item 4), o que tira 6 vagas das 174 do cálculo
antigo. São 58 nomes distintos, 20 deles valendo para as listas de proteção.
Em melhorias o projeto guarda mais verbetes do que nomes porque separa as formas
feminina e masculina (macabra/macabro), e guarda um registro a menos porque
junta num só a *Espinhosa (armadura)* e o *Espinhoso (escudo)* do T20 — daí 47
nomes cobrindo as 48 dos livros. Das 48, **quatro não entram em tabela d%
nenhuma**: Aprimorado (T20), Brasonado e Usado (Heróis) e Multifuncional
(Ameaças) são de **ferramenta e vestuário**, e não existe sorteio de ferramenta
superior. As quatro moram na aba "🔨 Criação de Itens" e no "📖 Descrição". O
sorteio ficou com **54 vagas em 43 nomes**: 23 em arma, 20 em armadura e escudo,
11 em esotérico (§6, etapa 6).*

**Descrições: 100%.** Usando o `ItensDescricoes.get()` real (com `ALIASES` e o
recurso às magias), **458/458** itens do catálogo, **168/168** encantos (eram
96/96 antes da etapa 2) e **736/736** entradas das tabelas de recompensa têm
verbete. Nenhuma nuvem "📖 Descrição" sai vazia. *(A conta de 02/09 dizia
720/720; esta soma as 18 tabelas de `js/recompensas.js`, inclusive as munições
extras e os 6 itens novos da etapa 3.)*

**Tabelas d%: íntegras.** As 17 tabelas de `js/recompensas.js` cobrem sua faixa
inteira sem buraco e sem retroceder. As que não param em 100 param onde devem:
`MAGICO_*` vão até 90 (91-100 é "item específico"); `POCAO_TABLE` vai até 120
porque a mesa estendeu a tabela com poções de outros livros; e desde a etapa 3
`ESPEC_ARMA` e `ACESSORIO_MAIOR` vão até 102, `ESPEC_ARMADURA` e
`ACESSORIO_MEDIO` até 101 — o dado cresceu junto com os itens do *Ameaças*
(veja §6), como já acontecia no `d120` das poções e no `d104` das munições.

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

> **✅ Os Serviços viraram sub-aba da Loja em 07/09/2026** — veja a etapa 4, em
> §6. Ao transcrevê-los, a conta saiu **24**, não 23 (e o total de linhas fora
> do catálogo, **51**, não 50): são 11 do T20, 10 do *Heróis* — contando as
> quatro faixas do Mercenário — e 3 do *Deuses*. Animais e Veículos continuam
> fora do catálogo de propósito: têm aba própria nas Consultas.

### 2.2 Encantos: **58 faltavam na loja** ⚠ era o maior buraco — ✅ resolvido em 07/09/2026

O `js/recompensas.js` já conhecia os encantos dos três livros (50 de arma, 45 de
armadura/escudo, 26 de esotérico). O `js/loja_completa.js` só tinha os do
**Tormenta 20** — e, nos esotéricos, só 10 dos 26.

| categoria | loja (antes) | livros | faltavam | loja (agora) |
|---|---|---|---|---|
| arma | 28 | 50 | **22** | 50 ✔ |
| armadura | 25 | 45 | **20** | 43 ✔ |
| escudo | 25 | 45 | **20** | 41 ✔ |
| esotérico | 10 | 26 | **16** | 26 ✔ |
| acessório | 8 | 8 | 0 ✔ | 8 ✔ |

Armadura e escudo não fecham em 45 porque a lista deixou de ser a mesma para os
dois (veja §5, item 4): 39 valem para ambos, 4 são só de armadura e 2 só de
escudo.

Todos os 58 vêm do **Heróis de Arton** (p. 256-261) e **todos já tinham
descrição no projeto** — faltava só entrarem no `ENCANTAMENTOS`:

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

**Consequência prática (antes do conserto):** a loja especial sorteava sobre 1/3
do repertório de encantos que o gerador de recompensas usa. Os dois lugares do
site discordavam sobre o que existe no mundo. **Hoje as duas abas sorteiam sobre
o mesmo repertório.**

### 2.3 Itens mágicos: 8 de *Ameaças de Arton* ausentes — ✅ resolvido em 07/09/2026

O livro tem um bloco "Novos Itens Mágicos" + "Novos Artefatos" (p. 402-403) que
não entrou em `js/recompensas.js` nem nas descrições. Os oito nomes só apareciam
como equipamento **dentro de fichas** em `js/fichas-ameacas-arton-data.js`.

**Cada um deles tem categoria impressa no livro** — é ela que diz em que tabela
do projeto o item entra:

| Item | O que o livro diz | Onde entrou | Preço |
|---|---|---|---|
| Chifre de unicórnio | Acessório maior | `ACESSORIO_MAIOR` | T$ 120.000 |
| Fragmento de filactério | Acessório maior | `ACESSORIO_MAIOR` | T$ 90.000 |
| Pilão conspurcado | Acessório médio | `ACESSORIO_MEDIO` | T$ 21.000 |
| Grilhão de descrença | Armadura específica menor | `ESPEC_ARMADURA` | T$ 24.000 |
| Pistola demoníaca | Arma específica média | `ESPEC_ARMA` | T$ 72.250 |
| Uyzrrak Da'ukthra | Arma específica média | `ESPEC_ARMA` | T$ 78.050 |
| **Amuleto do Abutre** | **Artefato** | — só descrição | (o livro não dá) |
| **Rompedor da Realidade** | **Artefato** | — só descrição | (o livro não dá) |

**São dois artefatos, não um.** O *Rompedor da Realidade* também está sob o
título "Novos Artefatos", e o próprio texto o chama de "*Este artefato lefeu*".
Como o sistema não tem categoria para artefato (não há tabela em que ele caiba,
e artefato não tem preço nem se fabrica), os dois ficaram **só com a descrição**,
para a nuvem "📖 Descrição" funcionar nas fichas que os carregam.

Os 257 demais itens mágicos nomeados (T20, Heróis e Deuses) já estavam lá.

### 2.4 Melhorias: faltavam duas — ✅ resolvido em 07/09/2026

O projeto conhecia 47 das **48** melhorias dos quatro livros. Faltavam duas, as
duas de **ferramenta e vestuário**: **"Aprimorado"** (T20, Tab. 3-8) e
**"Multifuncional"** (*Ameaças de Arton*, p. 399 — uma seção que a varredura de
02/09 não tinha lido; veja a etapa 6 em §6). Nenhuma das duas entra em tabela de
sorteio, porque o gerador só rola melhoria de arma, armadura e esotérico.

**Correção de um erro deste relatório:** a versão de 02/09 dizia que a nuvem
"📖 Descrição" também não a encontrava. **Encontra** — `aprimorado` está no
`js/itens-descricoes-extra-data.js` desde o primeiro commit, e o
`ItensDescricoes.get('Aprimorado')` devolve o verbete inteiro. O que faltava era
só o *lugar*: nenhuma tabela do site dizia que ela existe, nem em que categoria.

**O conserto (etapa 4).** A Tabela 3-8 inteira — as 31 linhas, nas cinco
categorias do livro — virou card da sub-aba **🔨 Criação de Itens**
(`js/criacao-itens-data.js`), logo abaixo da Tabela 3-7, que já morava lá. É
onde o próprio livro manda olhar ("as melhorias para cada categoria de item
estão listadas na Tabela 3-8") e onde a calculadora já aceitava *ferramenta* e
*vestuário* como categoria de fabricação. Na etapa 6 ele ganhou um irmão: um
segundo card com as **19 melhorias dos outros três livros**, nas categorias de
cada um.

**Nem "Aprimorado" nem "Multifuncional" entram em tabela d%,** e não devem
entrar: o livro só tem tabela de tesouro para item superior de arma, armadura e
esotérico. Rolar ferramenta superior seria regra inventada.

#### Duas melhorias na tabela errada — ✅ resolvido em 07/09/2026 (etapa 5)

Transcrever a Tabela 3-8 obrigou a ler as categorias das outras três tabelas de
melhoria, e a do *Heróis* (**Tab. 3-5**, p. 240) só se lê pela geometria — o
`-layout` embaralha nome e cabeçalho. Lida pelo `_pdf.js`, com o y de cada
texto, ela diz:

| categoria (Heróis, Tab. 3-5) | melhorias |
|---|---|
| armas | Farpada, Fósforo, Guarda, Incendiária, Pressurizada |
| armaduras e escudos | Balístico, Injetora, Prudente |
| esotéricos | Potencializador |
| **ferramentas e vestuário** | **Brasonado, Usado** |
| qualquer das categorias acima | Deslumbrante |

Ou seja: **Brasonado e Usado são melhorias de ferramenta e vestuário**, e no
`js/recompensas.js` elas estão nas **três** tabelas de sorteio (arma, armadura e
esotérico). O efeito das duas confirma o livro — ambas mexem em *teste de
perícia com o item*, que é o que ferramenta e vestuário fazem.

**Uma quarta leitura, independente, fechou a questão.** O *Suplemento do Mestre*
(o compilado que o projeto já cita em Penetrante) reimprime a Tab. 3-5 com as
mesmas cinco categorias, e lá está, com todas as letras: *melhorias para
ferramentas e vestuário — Brasonado, Diligente, Inscrito, Multifuncional,
Usado*. As duas saíram das três tabelas de sorteio na etapa 5 (§6).

Duas coisas menores que a mesma leitura mostrou:

- **O *Heróis* se contradiz no Deslumbrante.** A Tab. 3-5 o põe em "qualquer das
  categorias acima"; o verbete dele (p. 239) diz "só pode ser aplicada em
  armaduras e vestuários". O projeto o tem só em armadura — que as duas versões
  aceitam —, e agora com a restrição `so:"armadura"`, que é a leitura mais
  estrita das duas.
- **Os oito `pag:"??"` do `recompensas.js` tinham resposta** — todos corrigidos.
  As do *Heróis* estão na Tab. 3-5 (p. 240), com o verbete em **p. 239**
  (Fósforo, Brasonado) ou **p. 240** (Usado, Prudente); Devotado está na Tab. 1-4
  do *Deuses*, **p. 54**; e **Penetrante** é do ***Ameaças de Arton*, p. 399**
  (etapa 6) — não do Suplemento, que só o reimprime. O `livro:` do Fósforo também
  mudou: dizia "Suplemento do Mestre" e agora diz *Heróis de Arton*.
- **O Suplemento não é fonte, é compilado.** Ele reimprime a Tab. 3-5 inteira do
  *Heróis* e as melhorias do *Ameaças*, e chega a introduzir erro de cópia (troca
  "ataques com escudo" por "ataques com socos" no Balístico). Serve para
  conferir; a categoria oficial de cada melhoria é a do livro dela.

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

4. **Encantos só de escudo aplicáveis a armadura.** ✅ **Resolvido em
   07/09/2026.** O livro marca **Animado** e **Esmagador** como "Apenas escudos.
   Para armaduras, role novamente" (T20, Tab. 8-10). O `recompensas.js`
   respeitava isso (`obs:"** Apenas escudos"`); o `loja_completa.js` usava a
   **mesma lista de 25 encantos** para armadura e escudo, então a loja podia
   oferecer uma armadura *animada*. Agora são duas listas: **43 de armadura** (as
   39 comuns + Ancorada, Densa, Enraizada e Ligeira, que no *Heróis* falam só de
   armadura) e **41 de escudo** (as 39 comuns + Animado e Esmagador).

5. **Encantos que contam dobrado sem marca.** **Magnífica** (arma) e
   **Guardião** (armadura/escudo) contam como dois encantos no livro; na loja
   entram como um qualquer.

6. **`Instrumentos de <ofício>`** guarda o marcador literal `<ofício>` no nome.

7. **Traço curto onde o livro usa travessão.** Dano, crítico e tipo das 14
   linhas sem valor guardam `"-"`; o livro imprime `"—"`.

8. **"Corte ou perfuração"** (Espada vespa) — o livro escreve
   "Corte ou **P**erfuração".

---

## 6. O conserto — o que fazer (decidido em 02/09/2026)

O plano é **nesta ordem** (risco crescente, esforço crescente):

**Etapa 1 — os 16 valores e os 4 nomes. ✅ FEITA EM 06/09/2026.** Tudo no
`ITENS_BASE`, em `js/loja_completa.js:22` (o array inteiro é uma linha só).
Foram **56 trocas em 53 itens**: os 12 preços e os 3 espaços de §3, o crítico do
Espadim e o tipo do Tai-tai, os 4 nomes de §4.1, a caixa das 5 armaduras (§4.2)
e 30 críticos `X`→`x` (§5, item 1) — **o Tetsubo ficou com `X2`**, que é o que o
livro imprime. Antes de trocar, cada valor foi **reconferido no PDF** (veja o
quadro abaixo). Junto saíram mais duas coisas que a etapa exigia:

- **As 4 chaves de descrição** em `js/itens-descricoes-data.js`
  (`carcaca do predador` → `carcaca do predador primal`, idem garras e penas, e
  `pao de thorw` → `pao de thwor`). A chave é o nome normalizado: sem isso, o
  item renomeado perderia a nuvem "📖 Descrição". Conferido com o `get()` real —
  **458 de 458 itens continuam com descrição, zero buraco novo**.
- **O `catalogo.json`**, que era um despejo dos dois literais (ITENS_BASE e
  ENCANTAMENTOS) e **não era lido por nada no site**. Foi regravado para não
  ficar contradizendo os livros e, em **07/09/2026, apagado** — decisão do
  Caique. Um despejo que ninguém lê só serve para envelhecer e mentir.

*Reconferência no PDF, item por item (06/09/2026):* os 10 valores do **Deuses de
Arton** saem limpos da Tab. 1-3 no `pdftotext -layout` (Cajado de pastor T$ 12/2
espaços, Colar T$ 100, Panfleto T$ 60, Manto T$ 100, Frasco T$ 100, Rede T$ 600,
Bombas T$ 4, Justos T$ 2, Ouro T$ 6, Suflê T$ 3, Tonsura "—" espaços) e o nome
do pão é **Pão de Thwor**. A **Veste de teia de aranha T$ 3.000** e a **Tocha
T$ 0,1 · 1 espaço** também. Já o **Heróis** só se lê pela geometria: no
`-layout` a Tabela 3-1 sai com nome e valores de linhas diferentes emparelhados,
o que faz o Espadim parecer "T$ 10 · 1d4 · 19". Agrupando por y exato, a linha
verdadeira é **`Espadim T$ 300 · 1d8 · 20 · — · Corte · 1`** e
**`Tai-tai T$ 60 · 2d4 · x2 · Médio · Impacto · 2`**. E o **X do Tetsubo é mesmo
só dele**: no run cru da tabela do Ameaças (`"TetsuboT$ 201d10X2—Impacto2"`) as
vizinhas saem `x2`, `x3`, `19/x3` em minúscula.

**Etapa 2 — os 58 encantos. ✅ FEITA EM 07/09/2026.** Os três `MAGICO_*` de
`js/recompensas.js` viraram a ordem e o repertório do `ENCANTAMENTOS` de
`js/loja_completa.js` — as listas passaram de 28/25/25/10/8 para
**50/43/41/26/8**, e a de armadura deixou de ser cópia da de escudo (§5, item 4).
Conferido depois de gravar: as 168 entradas geram sem erro, **nenhuma ficou sem
efeito e nenhuma ficou sem descrição** no `ItensDescricoes.get()` real, e os dois
únicos nomes que saíram de alguma lista foram Animado e Esmagador, da armadura.

Duas coisas que a etapa mostrou e que o plano não previa:

- **O "efeito curto" só existe como coluna no Tormenta 20.** A Tab. 8-8 e a
  8-10 têm mesmo uma coluna *Efeito* ("Duplica margem de ameaça"), e é dela que
  vieram os 61 encantos que a loja já tinha. **O *Heróis de Arton* não tem tabela
  nenhuma de encanto** — as quatro seções dele são texto corrido ("*Alvorada.* A
  arma brilha como o sol matinal..."). Então os 58 efeitos novos foram
  **resumidos da descrição conferida**, no mesmo registro de cada categoria — que
  é exatamente o que já se tinha feito com os 10 esotéricos que a loja tinha.
- **Quem restringe o encanto ao escudo é a tabela; quem o restringe à armadura é
  a frase.** O T20 marca Animado e Esmagador com a nota "¹Apenas escudos". No
  *Heróis* não há nota: Ancorada, Densa, Enraizada e Ligeira se reconhecem por
  começarem com "*A armadura...*" / "*Esta armadura...*", enquanto as outras 16
  dizem "*O item...*" ou falam direto com o portador.

**Etapa 3 — os 8 itens mágicos do *Ameaças de Arton*. ✅ FEITA EM 07/09/2026.**
Os **seis** que têm categoria entraram nas tabelas de `js/recompensas.js` pela
categoria que o livro lhes dá (o quadro está em §2.3); os **dois artefatos**
ficaram só com descrição. As oito descrições foram transcritas do PDF
(p. 402-403) para `js/itens-descricoes-extra-data.js` — o bloco de específicos
passou de 81 para 84 verbetes, e nasceram duas seções, "Acessórios mágicos
(Ameaças de Arton)" e "Artefatos".

**O dado da tabela cresce; ninguém perde faixa.** Um item novo numa tabela d%
cheia obriga a escolher entre espremer as faixas de quem já está lá e aumentar o
dado. O projeto já tinha respondido isso duas vezes — o **d120** das poções e o
**d104** das munições extras —, então cada item novo virou **uma face a mais**:

| tabela | antes | agora |
|---|---|---|
| `ESPEC_ARMA` | 49 itens, d% | 51 itens, **d102** |
| `ESPEC_ARMADURA` | 24 itens, d% | 25 itens, **d101** |
| `ACESSORIO_MEDIO` | 61 itens, d% | 62 itens, **d101** |
| `ACESSORIO_MAIOR` | 37 itens, d% | 39 itens, **d102** |

Quem rola o dado passou a perguntar à tabela quantas faces ela tem
(`ladosDaTabela`), e a rolagem que aparece na tela mostra o dado certo
(`rotuloDado`: "d%" enquanto forem 100 faces, "d102" quando não forem). O
`ESPEC_ESOTER` e o `ACESSORIO_MENOR` continuam em d% — o *Ameaças* não lhes
acrescentou nada.

**Etapa 3-bis — o preço dos 84 específicos. ✅ FEITA EM 07/09/2026.** A etapa 3
deixou à vista que as tabelas `ESPEC_*` não guardavam preço nenhum: os livros
imprimem, mas o projeto só guardava preço de acessório e de poção, então a linha
"Preço" não saía para nenhum item nomeado. Agora os **84 têm `preco`**, no mesmo
formato das tabelas de acessório, e o preço aparece nos três lugares que já o
mostravam para acessório: a linha da rolagem, o "⧉ Copiar" e o catálogo.

Cada preço saiu do livro, por **três leituras diferentes conforme o livro**:

| livro | onde está o preço | como foi lido |
|---|---|---|
| **Tormenta 20** (31) | Tab. 8-9 (armas e esotéricos) e 8-11 (armaduras) | a tabela d%, no `-layout` |
| **Heróis de Arton** (31) | Tab. 3-9, 3-10 e 3-11, coluna *Preço* | a tabela, no `-layout` |
| **Deuses de Arton** (19) | última frase do verbete | prosa, no `-raw` |
| **Ameaças de Arton** (3) | última frase do verbete | prosa, no `-raw` |

E **cada leitura foi reconferida por outro caminho**: as tabelas do T20 são
ordenadas por preço, então a sequência lida tem de subir — sobe, nas 19 linhas;
as do *Heróis* foram relidas no `-raw` (30 de 31 batendo, a 31ª é a de nome
quebrado); e as do *Deuses* foram relidas cortando o `-layout` na calha entre as
colunas, 18 de 19 batendo. As duas que ficaram de fora dessas reconferências
foram lidas à mão no PDF.

**Duas armadilhas cobraram caro aqui** (e explicam por que a segunda leitura não
é luxo):

- **A palavra quebrada no fim da linha esconde a frase inteira.** O *Deuses*
  imprime "Armadura es-\npecífica média, preço T$ 54.000." — a busca por
  "Armadura específica" não acha, e o item herda o preço do verbete seguinte.
  Foi o caso da **Armadura do julgamento**, que quase entrou com T$ 25.000 em vez
  de **T$ 54.000**. Emende os hífens de fim de linha antes de procurar.
- **Nome quebrado em duas linhas, de novo.** Na Tab. 3-10 do *Heróis* a linha sai
  "Armadura das   Maior   T$ 40.500" e o "sombras profundas" fica na linha de
  baixo. Vale a mesma regra de §7: o fragmento em minúscula continua o de cima.

**Etapa 4 — as duas pontas soltas. ✅ FEITA EM 07/09/2026.** Eram o que sempre
esteve fora do plano: a melhoria "Aprimorado" (§2.4) e os Serviços (§2.1).

*A melhoria* virou a **Tabela 3-8 inteira** (31 linhas, cinco categorias) num
card novo da sub-aba 🔨 Criação de Itens — o detalhe está em §2.4, inclusive a
correção do que este relatório dizia de errado sobre a nuvem "📖 Descrição".

*Os Serviços* viraram a **sub-aba 🛎 Serviços da Loja**, em `js/servicos-data.js`
(dados) + `js/loja.js` (painel, busca e exportação). São as **24 linhas de
preço** dos três livros que têm serviço, com a descrição de cada uma transcrita
da prosa:

| livro | tabela → prosa | linhas |
|---|---|---|
| **Tormenta 20** | Tab. 3-6 (p. 157) → p. 163 | 11 — estadia (3), condução (3), curandeiro, magia (3), mensageiro |
| **Heróis de Arton** | Tab. 3-4 (p. 229) → pp. 238-239 | 10 — mercenário (4 faixas), banho quente, bigode encerado, instrução marcial, maquiagem, ópera, sarau |
| **Deuses de Arton** | Tab. 1-3 (p. 50) → p. 54 | 3 — casamento, cerimônia religiosa, sacramento |

Cinco decisões que a etapa exigiu, e o porquê de cada uma:

1. **Serviço não é item sorteado.** A lista é fixa e igual à do livro: sem
   desconto, sem estoque, sem teto de preço da comunidade (o teto vale para o
   que está na prateleira; e nenhum livro diz que aldeia não tem estalagem).
   Onde o livro **fala** de disponibilidade — estadia luxuosa "só nas melhores
   estalagens", ópera "só em grandes cidades", cerimônia "num templo da sua
   divindade" —, a frase dele vai escrita no card, no campo *Onde*.
2. **Uma linha do livro pode ter várias faixas de preço.** Condução, Magia e
   Mercenário são cabeçalhos com preços embaixo. Viraram um card com as faixas
   listadas, e é por isso que 17 cards valem 24 linhas de preço.
3. **As descrições entram na base do site.** O `servicos-data.js` registra cada
   uma em `GA_ITENS_DESC_EXTRA` (sem sobrescrever nada), então o serviço é achado
   pelo mesmo "📖 Descrição" dos itens — na aba e na busca das caixas de texto.
   Fonte única: o texto mora num arquivo só.
4. **Os 16 mercenários do *Heróis* entraram junto** (p. 238). O livro não põe
   preço no verbete de cada um — quem paga é a faixa da tabela, achada pelo
   tipo e nível que a última frase do verbete indica (*"Guardião iniciante"* →
   parceiro iniciante, T$ 30). O tipo virou **nuvem de mouse** com o benefício
   do parceiro (`PARCEIRO_TIPOS`, de `js/animais-data.js`); nos três que são
   capangas, a nuvem traz o tamanho e as estatísticas do grupo (*Capangas*,
   p. 241). Como o texto de veterano começa em "como acima", a nuvem mostra
   iniciante **e** veterano.
5. **Os mercenários não viram verbete do site.** "Sombra", "Matador" e
   "Arauto" são palavras comuns demais para entrar na base de descrições — eles
   vivem dentro do card do Mercenário.

Conferência: preço e nome de **cada uma das 24 linhas** foram lidos em duas
extrações independentes de cada PDF (`-layout` e `-raw`), como nas etapas
anteriores.

**Etapa 5 — que melhoria cabe em que item. ✅ FEITA EM 07/09/2026.** Saiu do
achado de §2.4 e cresceu: não era só o Brasonado na tabela errada — o gerador
não sabia **nenhuma** das restrições de tipo dos verbetes. Ele podia entregar
mira telescópica numa espada, munição incendiária numa maça, armadura de couro
selada. Três consertos, todos em `js/recompensas.js`:

**1. Brasonado e Usado saíram das três tabelas.** São melhorias de ferramenta e
vestuário (§2.4), e o gerador não sorteia ferramenta superior — o livro não tem
tabela de tesouro para isso. Com a saída dos dois, as faixas do d% foram
**reescaladas proporcionalmente**: cada melhoria manteve a mesma chance
relativa e as três tabelas voltaram a fechar em 100 sem buraco (arma 24→22
linhas, armadura 21→19, esotérico 14→12). O par "Brasonado × Discreto" saiu
junto de `MELHORIA_EXCLUI`, que ficou sem uso.

**2. As páginas que faltavam entraram** (os oito `pag:"??"`), e o Fósforo mudou
de livro — veja §2.4.

**3. Cada melhoria restrita ganhou um campo `so:`**, testado contra o item-base
já sorteado. Só entrou o que o livro restringe com todas as letras:

| melhoria | `so:` | o que o livro diz |
|---|---|---|
| Fósforo, Incendiária | `municao` | "só pode ser aplicada em munições" |
| Farpada | `corteOuPerfuracao` | "só em armas de corte ou perfuração" |
| Guarda | `corpoACorpo` | "só em armas corpo a corpo" |
| Pressurizada | `impactoOuFogo` | "só a armas corpo a corpo de impacto e armas de fogo" |
| Mira telescópica | `disparo` | "só em armas de disparo (exceto fundas)" |
| Balístico | `escudo` | "só pode ser aplicada em escudos" |
| Delicada, Selada | `armaduraPesada` | "só pode ser aplicada em armaduras pesadas" |
| Deslumbrante, Injetora, Prudente, Sob medida | `armadura` | o verbete fala só de "armadura" |

A última linha é a única leitura que não vem de um "só": o livro é cuidadoso em
escrever **"armadura ou escudo"** quando quer as duas (Polida, Reforçada,
Ajustada), então onde ele diz só "armadura" o escudo fica de fora. Onde o livro
descreve sem proibir, nada foi restringido — a injeção alquímica continua
cabendo em qualquer arma, e a polida em armadura ou escudo.

**Quem responde "cabe ou não" é o catálogo da Loja.** O `statsDeItem()` passou a
devolver também a `categoria` do item ("Corpo a Corpo — Leves", "Armaduras
Pesadas", "Escudos"), e é ela que decide. Duas coisas o catálogo não separa, e
por isso viraram listas nominais em `recompensas.js`: **munição** (o catálogo a
guarda como arma sem dano, mas Rede e Desmontador também são armas sem dano) e
**arma de disparo × de arremesso** (a diferença não está em coluna nenhuma das
tabelas de arma; é o verbete de cada uma que diz).

**A prova.** 20.000 itens superiores sorteados + 8.000 pelo caminho "Superior +
Encantado": **nenhuma** combinação impossível, nenhum Brasonado ou Usado. Nas
42 duplas conferidas à mão o resultado bate com o livro em todas — mira
telescópica sai em arco e besta mas não em espada nem em funda, selada sai em
completa mas não em couro, couraça (que o T20 lista como armadura **leve**) não
recebe selada nem delicada. E ninguém ficou sem opção: o item-base mais
restrito do gerador ainda aceita 12 melhorias.

A restrição aparece na tela, junto da melhoria rolada ("⚠ Só armas de
disparo"), no texto do "⧉ Copiar" e no Catálogo de Tesouros.

*Três melhorias marcadas como "para qualquer das categorias acima" ficaram, na
etapa 5, cada uma numa tabela só. A etapa 6 resolveu as três.*

**Etapa 6 — a conferência completa das melhorias. ✅ FEITA EM 07/09/2026.** As
quatro tabelas de melhoria dos livros foram lidas do PDF **pela geometria** (o
`-layout` embaralha nas duas primeiras) e cruzadas, uma a uma, com as 47 do
projeto. Quatro consertos:

**1. Faltava uma melhoria inteira: MULTIFUNCIONAL.** Ela está no *Ameaças de
Arton*, **p. 399**, numa seção "Itens Superiores → Novas Melhorias" que a
conferência de 02/09 não tinha varrido — o §1 dizia que o *Ameaças* só trazia
armas, armaduras, itens gerais e itens mágicos. A seção tem exatamente duas
melhorias, e ambas trazem a categoria no próprio nome: *Multifuncional
(ferramenta ou vestuário)* e *Penetrante (arma)*. A descrição de Multifuncional
entrou no `js/itens-descricoes-extra-data.js`.

**2. PENETRANTE não é do "Suplemento do Mestre".** É do *Ameaças*, p. 399 — o
`livro:` e o `pag:"??"` dele foram corrigidos, e agora **nenhuma** linha das
tabelas de melhoria tem página desconhecida. O Suplemento é um **compilado**: ele
reimprime o que está nos livros (inclusive a Tab. 3-5 inteira do *Heróis*), e por
isso não vale como fonte de categoria — a categoria oficial é a do livro.

**3. CANÔNICO estava na tabela errada.** A Tab. 1-4 do *Deuses* (lida pela
geometria: cabeçalho 2,3 unidades acima do primeiro nome) tem três grupos —
*armas*; *armaduras, escudos, ferramentas e vestuários*; e *todas as categorias
acima*. **Esotérico não aparece em lugar nenhum dela.** Canônico e Devotado estão
no terceiro grupo, então:

| melhoria | onde estava | onde está agora | por quê |
|---|---|---|---|
| **Canônico** | só esotérico | **arma + armadura/escudo** | "todas as categorias acima" da Tab. 1-4 — que não inclui esotérico |
| **Devotado** | armadura | armadura (sem mudança) | mesma linha da tabela, mas exige **Inscrito**, que é de armadura, escudo, ferramenta e vestuário: numa arma o pré-requisito é impossível |
| **Deslumbrante** | armadura | armadura (sem mudança) | a Tab. 3-5 diz "qualquer categoria", mas o verbete dele manda mais: "só pode ser aplicada em armaduras e vestuários" |

**4. As faixas do d% foram reescaladas de novo** (maior resto), com as tabelas
reordenadas em ordem alfabética: **arma 23 linhas, armadura 20, esotérico 11** —
54 vagas em 43 nomes, todas fechando em 100 sem buraco.

E a aba 🔨 Criação de Itens ganhou um **segundo card**, "Melhorias dos outros
três livros", com as 19 do *Heróis*, do *Deuses* e do *Ameaças* nas categorias
de cada livro — o efeito curto de cada uma saiu da própria tabela do livro,
lido pela geometria (foi assim que se viu que o compilado do Suplemento troca
"ataques com **escudo**" por "ataques com **socos**" no Balístico).

**A prova, de novo:** 20.000 itens superiores + 8.000 pelo caminho "Superior +
Encantado", nenhuma combinação impossível; as 42 duplas conferidas à mão batem
com os livros; e nenhuma das quatro melhorias de ferramenta/vestuário (Aprimorado,
Brasonado, Usado, Multifuncional) aparece em tabela de sorteio.

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
- **A categoria da tabela não é a regra inteira: o verbete restringe mais.** A
  Tab. 3-8 põe a mira telescópica em "melhorias para armas", e é o texto dela
  que diz "só em armas de disparo (exceto fundas)". Ler só a tabela deixa passar
  munição incendiária em maça. E, quando o livro quer armadura **e** escudo, ele
  escreve os dois ("A armadura ou escudo…", "Se for uma armadura… Se for um
  escudo…"); onde escreve só "armadura", o escudo está fora.
- **Compilado não é fonte.** O "Suplemento do Mestre" reúne num arquivo só o que
  está nos livros — serve para conferir e foi o que confirmou o Brasonado —, mas
  erra na cópia (o Balístico virou "ataques com socos") e mistura as categorias
  de livros diferentes. A categoria e o texto que valem são os do livro.
- **Uma seção pode escapar da varredura por não ter tabela.** As duas melhorias
  do *Ameaças* (p. 399) só se acham lendo os títulos do capítulo: não há tabela
  nenhuma ali, e a busca de 02/09 procurava tabelas. Quando um livro é
  "suplemento de outro", vale varrer os TÍTULOS de seção, não só as tabelas.
- **Tabela com cabeçalho de categoria no meio: o cabeçalho fica ACIMA da
  primeira linha do grupo.** Na Tab. 3-5 do *Heróis* o `-layout` cola o
  cabeçalho na linha do primeiro nome ("Farpada  Melhorias para armas") e
  espalha os efeitos por outras alturas — dá para ler tudo errado sem parecer
  errado. Pelo `_pdf.js`, o y resolve em dez linhas de script: cada cabeçalho
  está ~2,2 unidades acima do primeiro nome do seu grupo, e os nomes distam
  ~2,2 entre si. Foi assim que se descobriu que Brasonado e Usado são melhorias
  de **ferramenta e vestuário** (§2.4).
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
- **A categoria de um item mágico está na última frase do verbete.** No
  *Ameaças* não há tabela de itens mágicos: cada verbete termina dizendo o que
  o item é e quanto custa ("*Acessório maior, preço T$ 120.000.*"). É essa
  frase que decide em qual tabela do projeto ele entra — e é ela que denuncia
  o artefato, que não tem nem categoria nem preço.
- **Nem todo livro traz a mesma coisa em tabela.** O mesmo assunto sai como
  tabela com coluna de resumo no básico e como texto corrido no suplemento (os
  encantos: Tab. 8-8/8-10 no T20, quatro seções de prosa no *Heróis*). Antes de
  procurar a coluna, confirme que ela existe naquele livro — e, quando não
  existir, a restrição que a tabela daria numa nota de rodapé vai estar dita
  dentro da frase ("*A armadura...*" em vez de "*O item...*").
