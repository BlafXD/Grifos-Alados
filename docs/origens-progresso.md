# Origens na ficha — progresso (Frente 3 do plano de 28/09/2026)

Objetivo (pedido dele): **todas as origens** na ficha, e poder **escolher os
benefícios** — pela regra, só se pega **2 benefícios** de uma origem (ex.: em
Seguidor, 2 perícias, OU 2 poderes, OU 1 + 1). Mais: poder pegar **só o poder
especial de OUTRA origem** (há habilidades que permitem isso).

## Conferência — o que existe e o que falta (28/09/2026)

Conferido pelos PDFs em `RPG/Tormenta 20/Livros`:

- **Tormenta20 (Jogo do Ano)** — **35 origens** (o núcleo). Já temos, em
  `js/poderes-raca-origem-data.js`, só o **Poder Único** de cada uma (grupo
  `origem`, com o nome da origem no campo `tags`). **FALTA** o resto de cada
  origem: a **lista de benefícios** (perícias treinadas + os poderes que ela
  oferece), de onde se escolhe 2.
- **Heróis de Arton** — capítulo "Novas origens" (impressas p. 46–53). São
  **origens ESPECIAIS**, com estrutura DIFERENTE do núcleo: dão **um benefício
  ÚNICO fixo** (não "escolha 2") + uma linha de **Itens**. ~25 origens
  (Bacharel, Boticário, Caçador de Ratos, Cão de Briga, Carcereiro, Carpinteiro
  de Guilda, Catador da Catástrofe, Chef Hynne, Cirurgião-Barbeiro, …). Nota do
  livro: "Efeitos de origens contam como habilidades para fins de acúmulo"; e se
  o benefício treina uma perícia em que já é treinado, treina outra de classe.
  **FALTAM todas** — não estão no sistema.
- **Deuses de Arton** — NÃO tem seção de origens (conferido).
- Ameaças de Arton / Atlas / Guias — bestiário e cenário, sem origens de jogador.
- `o-mundo-dos-deuses` — **PROIBIDO** (edição antiga), não entra.

Total a cobrir: **~35 do núcleo (completar os benefícios) + ~25 do Heróis
(transcrever inteiras).**

## Como a ficha trata origem hoje

`f.origem` é **texto livre** (campo da identidade). Não há seletor estruturado de
origem nem de benefícios. O Poder Único aparece só na busca de poderes (grupo
`origem`, cartão 🌿). Ou seja, a Frente 3 é um **recurso novo**, não um ajuste.

## Desenho proposto (a validar/executar)

**Dado novo — `js/origens-data.js`:** `window.GA_ORIGENS = [ { id, nome, livro,
pagina, tipo:'nucleo'|'especial', beneficios:[ {tipo:'pericia'|'poder', nome,
texto} ], poderUnico:{ id, texto }, itens:[...] (Heróis), nota } ]`.
- Núcleo: `beneficios` = as perícias e poderes da origem; a UI deixa marcar **2**.
- Especial (Heróis): `beneficios` = o benefício fixo (entra inteiro, sem escolha);
  `itens` listados.

**UI (cartão 🌿):** escolher a origem → marcar 2 benefícios (com trava de 2) →
o Poder Único entra automático; e um atalho "**pegar só o poder de outra
origem**". Guardar em `f.origemEscolha = { origem, beneficios:[...] }`.

## Estágios (para entregar revisável, como foi nas distinções)

1. ✅ **FEITO (28/09/2026) — Dado + motor + UI do NÚCLEO (35), "escolha 2".**
   - `js/origens-data.js` com as 35 (conferidas contra a Tabela 1-19 E contra o
     Poder Único que já tínhamos — casaram 35/35). Incluído nas duas páginas.
   - `f.origemEscolha = { origem, itens:[{nome,tipo}] }` (padrão no normalizar).
   - `blocoOrigem(f)` no topo do cartão 🌿: seletor da origem + chips de
     benefício (perícia/poder/vaga livre), com trava no limite e contador n/N.
     Trocar de origem zera os itens e sincroniza o campo de texto "Origem".
   - Testado no navegador (Firebase off): Seguidor 1+1, trava em 2/2, Amnésico
     0/3 + nota, persistência no reload, zero erro de console.
   - **Ainda NÃO aplica** efeitos (não treina a perícia nem adiciona o poder):
     por decisão de desenho, marcar é só a ESCOLHA; aplicar fica com quem já faz
     isso na ficha (treinar perícia, ＋ Adicionar poder). Rever se ele quiser
     que aplique sozinho.
2. ✅ **FEITO (28/09/2026) — Origens especiais do Heróis (30).** Transcritas do
   PDF em modo de LEITURA (pdftotext sem `-layout` nem `-raw` — o único que sai
   limpo em coluna dupla; guardar isso), com benefício fixo + itens, `tipo:
   'especial'`, p. 46–53. O seletor virou dois optgroups (Tormenta20 35 ×
   Heróis 30); origem especial mostra o benefício e os itens, sem "escolha 2".
   Testado (Bacharel mostra benefício+itens+fonte; voltar a uma núcleo restaura
   os chips). São **30**, não ~25: Bacharel, Boticário, Caçador de Ratos, Cão de
   Briga, Carcereiro, Carpinteiro de Guilda, Catador da Catástrofe, Chef Hynne,
   Cirurgião-Barbeiro, Citadino Abastado, Cocheiro, Construtor, Contrabandista,
   Coureiro, Escriba, Espião, Ferreiro Militar, Freira, Goradista, Insciente,
   Interrogador, Ladrão de Túmulos, Menestrel, Mensageiro, Náufrago, Padeiro,
   Pedinte, Pescador, Servo, Suporte de Tropas.
3. ✅ **FEITO — "Poder de outra origem".** Já era possível pela arquitetura: os
   35 poderes-assinatura do núcleo são do grupo `origem` e aparecem no ＋
   Adicionar do cartão 🌿 (chip 🎯 Origem), independente da origem escolhida.
   Só adicionei a NOTA que aponta o caminho. Testado: com Acólito, achei e pude
   adicionar "Amigo Especial" (poder da origem Amigo dos Animais).

## Total: 65 origens (35 núcleo + 30 especiais). Frente 3 COMPLETA.

## Leva extra (29/09/2026) — Origens Regionais do Atlas de Arton (66)

Ele notou que faltavam origens e pediu para achar as "Origens Regionais" nos
livros oficiais. Ficam no **Atlas de Arton, Apêndice, p. 470–479** (a seção diz
"São 66 Origens Regionais"). O suplemento (FIX Desmoralizar Burguês, p. 115) é só
reimpressão — o oficial é o Atlas. Estrutura idêntica às especiais do Heróis
(benefício único fixo + itens), mais o campo novo **`regiao`** (o reino/local,
tirado da "Tabela: Origens Regionais", p. 472–473).

- **Dado:** as 66 entradas em `js/origens-data.js`, `tipo: 'especial'`,
  `livro: 'atlas'`, `regiao`, benefício e itens. `GA_ORIGENS_LIVROS.atlas =
  'Atlas de Arton'`. Total geral de origens: **65 → 131**.
- **UI (`js/ficha.js`, `blocoOrigem`):** o seletor ganhou um **3º optgroup**
  ("Atlas de Arton — Origens Regionais"); o bloco da especial passou a mostrar a
  📍 região e, quando regional, cita a regra da p. 470 (em vez da p. 46 do
  Heróis). Nova classe CSS `.fi-orig-regiao`.
- **Extração:** `pdftotext -enc UTF-8` em modo LEITURA (sem `-layout`/`-raw`) —
  o único que sai limpo na coluna dupla. UTF-8 conserta os acentos que o modo
  padrão embaralhava (é→�).
- **Fidelidade conferida (node):** 66 entradas, ids únicos, todas com `regiao`,
  sintaxe OK. O ✦ (habilidade mágica) só no **Descendente Colleniano** (o "PM. e"
  da extração era o glifo ✦) — bytes `e2 9c a6`, não escape. "1o círculo" →
  "1º círculo" (Estudante da Academia, Plebeu Arcano).
- **Fielmente reproduzido um erro do livro:** Querido Filho imprime "Você
  redução de frio e trevas 5…" (falta o "recebe"); as duas extrações batem, então
  é do PDF — mantido como está.
- **Páginas por origem:** atribuídas pelos cabeçalhos de folha (p. 470–479); nos
  limites de página pode haver ±1 (o modo leitura reordena rodapé/box). Se ele
  quiser, dá para afinar conferindo o `-layout` folha a folha.
- **Ainda NÃO testado no clique-a-clique do navegador** (exigiria subir servidor
  + Chrome com Firebase neutralizado; risco de tocar no banco oficial). O caminho
  de render espelha o da especial do Heróis, que já foi testado.

## Origens especiais/regionais no "Adicionar habilidade" (29/09/2026)

Buraco notado por ele: o chip **🎯 Origem** da busca "Adicionar habilidade" só
tinha os **35** Poderes Únicos do núcleo. As **30 especiais** (Heróis) e as **66
regionais** (Atlas) estavam só no seletor 🌿 — mas o benefício delas é uma
habilidade e também deve poder ser adicionado.

- **Ponte derivada, sem duplicar texto:** no fim de `js/origens-data.js`, para
  cada origem `tipo:'especial'` (Heróis e Atlas), geramos uma entrada de busca
  no grupo `origem` de `window.GA_PODERES` (id `origem-<slug>`, nome = a origem,
  `tags` = a região nas regionais, `texto = [beneficio]`). `GA_ORIGENS` continua
  a fonte única. Roda depois de `poderes-raca-origem-data.js` e antes de
  `ficha.js`.
- O grupo `origem` da busca foi de **35 → 131** (35 t20 + 30 herois + 66 atlas);
  o contador do chip 🎯 é atualizado ali mesmo (o recount anterior via só 35).
- **Sem mudança de UI:** a busca já lista o grupo `origem`; só cresceu a base.
- Conferido por node: 131 no grupo, sem id duplicado, chip = 131.

## Armadilhas já conhecidas (memória)

- PDF em colunas: `-layout` embaralha, `-raw` junta; os nomes das origens do
  Heróis exigem transcrição cuidadosa, uma a uma (não dá para varrer). Para uma
  seção grande em coluna dupla, o **modo leitura (`pdftotext -enc UTF-8`, sem
  flags)** saiu limpo — foi como as 66 regionais entraram.
- Página do PDF ≠ impressa.
- Conferir sempre contra o texto do livro (fidelidade é a prioridade dele).

---

## Frente 3 FECHADA — as três pontas soltas (05/10/2026)

O recurso estava inteiro (131 origens, seletor, "escolha 2", ponte para a busca),
mas três coisas ficaram escritas aqui como pendentes. As três fecharam.

### 1. O benefício escolhido agora APLICA na ficha

Era a maior: marcar um benefício era **só a escolha**, e a nota mandava o jogador
treinar a perícia na lista e trazer o poder no ＋ Adicionar. Era o único lugar da
ficha em que algo escolhido não virava nada.

Cada benefício escolhido ganha um **"aplicar"** colado no chip, que escreve a
coisa de verdade:

| Benefício | O que o "aplicar" faz |
|---|---|
| perícia | marca `treinada` naquela perícia |
| `Ofício (x)` | preenche uma linha de Ofício com a especialidade, já treinada |
| poder | empurra o cartão do poder para o bloco de poderes |
| vaga do mestre | nada — o botão fica `com o mestre`, desligado, explicando |

**Nada é aplicado sozinho** e **nada fica sintético**: depois de aplicado é
treino e poder como qualquer outro. Desmarcar o treino na lista de perícias faz
o botão voltar a dizer "aplicar" — ele lê o estado da ficha, não guarda bandeira
nenhuma. (Provado no navegador: destreinei Cura e o botão voltou.)

O Ofício **reaproveita uma linha vazia** antes de criar outra — o normalizar já
deixa duas à vista, e empilhar uma terceira em branco seria sujeira.

### 2. As 66 regionais do Atlas, enfim testadas no navegador

Era o "ainda NÃO testado no clique-a-clique". Agora foi: região 📍, fonte, o
benefício, os itens, a citação da regra da p. 470 e **zero chips de "escolha 2"**
(regional não escolhe). Amostra de quatro espalhadas pela lista — Agricultor
Sambur (Sambúrdia, p. 470), Descendente Colleniano (Ahlen, 473), Nômade
Sar-Allan (Halak-Tûr, 476) e Um com os Kami (Tamu-ra, 479). Zero erro de
console.

> **Armadilha de teste que custou uma rodada:** cada troca de origem **redesenha
> a ficha**, e o `<select>` vira nó órfão. Guardar a referência e trocar o
> `.value` no laço não faz nada — e o teste *parece* achar que as 66 têm todas a
> mesma região. **Reconsulte o DOM entre um passo e outro.** Vale igual para os
> chips de benefício.

### 3. As páginas das regionais: estavam exatas, não ±1

Esta doc dizia "nos limites de página pode haver ±1". **Não há.** Conferido por
script: as p. 470–479 extraídas uma a uma e o nome de cada origem procurado na
página que o dado declara.

```
66 origens regionais conferidas · página exata: 66 · errou por 1: 0 · não achei: 0
```

### Sanidade do dado, de novo

131 origens (35 núcleo · 30 Heróis · 66 Atlas), **nenhum id repetido**, nenhuma
regional sem região, nenhum benefício vazio, todas as páginas dentro da faixa do
seu livro, e o grupo `origem` da busca com os 131. E, do lado da aplicação:
**todo poder citado por uma origem do núcleo existe em `GA_PODERES`** (35/35), e
as únicas "perícias" citadas que não estão na lista da ficha são as quatro
variantes de `Ofício (…)` — que é justamente o caso que o aplicar trata à parte.
