# Melhorias — todos os limites, mapeados

**05/10/2026.** Pedido dele: *"Algumas melhorias só podem ser aplicadas para
CERTOS TIPOS de itens… Consegue listar TODAS essas condições? Não precisa
aplicar ainda, liste, entenda e mapeie todos os limites impostos de cada
melhoria (e item, tem itens que podem ter essa limitação)."*

**APLICADO em 06/10/2026** — o que mudou no código está no §8, no fim. Até
lá isto era só o mapa. Tudo conferido nos quatro PDFs: *Tormenta20* (p. 163–167), *Heróis de
Arton* (p. 239–240), *Ameaças de Arton* (p. 399) e *Deuses de Arton* (p. 54).

---

## 1 · As três regras que valem para TODA melhoria

Do texto de abertura de "Itens Superiores" (Tormenta20, p. 163–164):

1. **Só cinco categorias de item recebem melhoria.**
   > "Apenas itens das categorias **armas, armaduras e escudos, ferramentas,
   > vestuário e esotéricos** podem receber melhorias."
2. **Cada melhoria só pode ser aplicada uma vez ao mesmo item.**
3. **Um item superior tem de 1 a 4 melhorias.** (O preço e a CD de fabricação
   sobem pela Tabela 3-7.)

> ⚠ **O site modela só três das cinco categorias** (arma, armadura/escudo,
> esotérico). **Ferramenta e vestuário não existem no gerador** — e é de lá que
> vêm as 4 melhorias que faltam (§6).

---

## 2 · A categoria oficial de cada melhoria

É a **Tabela 3-8** (Tormenta20, p. 165) que manda, mais as tabelas equivalentes
dos outros três livros. Esta é a tabela-mãe do mapa:

| Categoria | Melhorias |
|---|---|
| **Armas** | Certeira · Pungente · Cruel · Atroz · Equilibrada · Harmonizada · Injeção alquímica · Maciça · Material especial · Mira telescópica · Precisa — **Heróis:** Farpada · Fósforo · Guarda · Incendiária · Pressurizada — **Ameaças:** Penetrante — **Deuses:** Conduíte |
| **Armaduras e escudos** | Ajustada · Sob medida · Delicada · Espinhosa (armadura) · Espinhoso (escudo) · Material especial · Polida · Reforçada · Selada — **Heróis:** Balístico · Injetora · Prudente — **Deuses:** Diligente · Inscrito |
| **Esotéricos** | Canalizador · Energético · Harmonizado · Material especial · Poderoso · Vigilante — **Heróis:** Potencializador |
| **Ferramentas e vestuário** | Aprimorado — **Heróis:** Brasonado · Usado — **Ameaças:** Multifuncional — **Deuses:** Diligente · Inscrito |
| **Qualquer das categorias acima** | Banhado a ouro · Cravejado de gemas · Discreto · Macabro — **Heróis:** Deslumbrante — **Deuses:** Canônico · Devotado |

**Total: 46 melhorias distintas** nos quatro livros.

**Duas leituras que o livro dá à MESMA melhoria**, conforme o item:
- **Espinhosa (Armadura)** causa dano a quem agarra · **Espinhoso (Escudo)**
  aumenta o dano do ataque com escudo em um passo.
- **Harmonizada (Arma)** reduz –1 PM de uma habilidade de ataque ·
  **Harmonizado (Esotérico)** reduz –1 PM de uma magia.

**Atenção ao "todas as categorias acima" do Deuses de Arton:** a tabela dele
tem só **dois** grupos (armas; armaduras, escudos, ferramentas e vestuários).
Então **Canônico e Devotado NÃO valem para esotéricos** — "acima" ali é menos
do que "acima" no Tormenta20.

---

## 3 · As restrições DURAS — o livro escreve "só pode"

São **13**. Esta é a lista que o gerador precisa obedecer.

| Melhoria | Livro | O que o livro diz, literal | No site |
|---|---|---|---|
| **Aprimorado** | T20 164 | "só pode ser aplicada a uma **ferramenta ou vestuário que modifique uma perícia** (reduza uma penalidade ou forneça um bônus)" | **não existe** |
| **Delicada** | T20 164 | "só pode ser aplicada a **armaduras pesadas**" | ✅ `armaduraPesada` |
| **Mira telescópica** | T20 166 | "só pode ser aplicada em **armas de disparo (exceto fundas)**" | ✅ `disparo` |
| **Selada** | T20 166 | "só pode ser aplicado em **armaduras pesadas**" | ✅ `armaduraPesada` |
| **Balístico** | Heróis 239 | "só pode ser aplicada em **escudos**" | ✅ `escudo` |
| **Deslumbrante** | Heróis 239 | "Só pode ser aplicada em **armaduras e vestuários**" | ⚠️ `armadura` — **falta o vestuário** |
| **Farpada** | Heróis 239 | "Só pode ser aplicada em **armas de corte ou perfuração**" | ✅ `corteOuPerfuracao` |
| **Fósforo** | Heróis 239 | "só pode ser aplicada em **munições**" | ✅ `municao` |
| **Guarda** | Heróis 239 | "Só pode ser aplicada em **armas corpo a corpo**" | ✅ `corpoACorpo` |
| **Incendiária** | Heróis 239 | "só pode ser aplicada em **munições**" | ✅ `municao` |
| **Pressurizada** | Heróis 240 | "só pode ser aplicada a **armas corpo a corpo de impacto e armas de fogo**" | ✅ `impactoOuFogo` |
| **Multifuncional** | Ameaças 399 | "só pode ser aplicada em **um item que modifica uma perícia**" (ferramenta ou vestuário) | **não existe** |
| **Usado** | Heróis 240 | "**não pode ser aplicada por um artesão**, apenas adquirida quando o item é comprado de segunda mão" | **não existe** |

> **"Usado" é de outra natureza.** Não limita o TIPO de item, limita a
> PROCEDÊNCIA. Se um dia entrar no gerador, ela não pode sair de uma rolagem de
> item fabricado — só de tesouro encontrado ou compra de segunda mão.

### As três que o site restringe sem o livro proibir — ✅ DECIDIDO

O livro descreve o item típico sem dizer "só pode". A tabela do Heróis as põe em
**"armaduras e escudos"**; o texto corrido fala só em armadura. O site ficou com
a leitura estreita:

| Melhoria | O texto diz | A tabela do livro diz | O site hoje | A decidir |
|---|---|---|---|---|
| **Injetora** | "inserido dentro da **armadura**" | armaduras **e escudos** | `armadura` | **armaduras e escudos** |
| **Prudente** | "pode ser aplicada a **qualquer armadura**" | armaduras **e escudos** | `armadura` | **armaduras e escudos** |
| **Sob medida** | "Reduz a penalidade por armadura em 2" | armaduras **e escudos** | `armadura` | **armaduras e escudos** |

> **Decisão dele, 05/10/2026: vale a leitura da TABELA — "armaduras e escudos".**
> Era decisão de mesa, não erro de transcrição: as três mexem em coisa que
> escudo também tem (a penalidade de armadura, o corpo de quem veste).

**Como isso vira código (não feito ainda):** é *tirar*, não acrescentar. Basta
**remover o `so: "armadura"`** das três entradas de `MELHORIA_ARMADURA` — a
tabela de equipamento daquele sorteio já é a de "armaduras e escudos" (tem
Escudo leve, Escudo pesado, Broquel, Escudo torre…), e o teste `armadura` do
`RESTRICAO_MELHORIA` é justamente o que hoje peneira os escudos para fora
(`/^Armaduras/` não casa com a categoria `Escudos` do catálogo da Loja). Sem o
`so`, as três passam a caber em qualquer item daquele sorteio — que é o que ele
quer. **O teste `armadura` continua existindo** para quem precisa dele de
verdade: hoje, só o Deslumbrante (e esse ainda precisa virar
"armadura ou vestuário").

### E uma que é permissiva de propósito

- **Injeção alquímica** (T20 165) e **Polida** (T20 166) o site deixa sem
  restrição, e está certo: a injeção serve a qualquer arma, e a polida o livro
  escreve "A armadura **ou escudo**".

---

## 4 · Pré-requisitos e incompatibilidades

**Pré-requisito** = outra melhoria tem de estar no mesmo item antes.

| Melhoria | Exige |
|---|---|
| Atroz | Cruel |
| Pungente | Certeira |
| Sob medida | Ajustada |
| Harmonizada (arma) | **outra melhoria qualquer** |
| Farpada | Cruel |
| Penetrante | Cruel |
| Balístico | Reforçada |
| Deslumbrante | Banhado a ouro **ou** Cravejado de gemas |
| Potencializador | Canalizador |
| Devotado | Inscrito |

**Incompatíveis** (não coexistem no mesmo item):

| Par | Onde |
|---|---|
| Maciça × Precisa | "Uma arma não pode ser maciça e precisa" (T20 165/166) |
| Delicada × Reforçada | "Uma armadura não pode ser delicada e reforçada" (T20 164/166) |

✅ **O site já tem os 10 pré-requisitos e os 2 pares, e todos os nomes casam**
(conferido por script: nenhum pré-requisito aponta para melhoria inexistente).

---

## 5 · Material especial — a melhoria que esconde outra camada de limites

"Material especial" não é um efeito: é uma **porta** para um material, e cada
material tem as suas próprias regras.

**Quem pode:** "**Armas, armaduras, escudos e esotéricos** podem ser feitos ou
banhados de um material especial" (T20 p. 166) — **ferramenta e vestuário
ficam de fora**, mesmo podendo receber outras melhorias.

### Tormenta20 (p. 166–167) — 6 materiais

| Material | Limite próprio |
|---|---|
| Aço-rubi | — (arma, armadura/escudo, esotérico) |
| Adamante | — |
| Gelo eterno | — |
| **Madeira Tollon** | **"Apenas armas de madeira — arcos, bordões, clavas, lanças, piques e tacapes —, escudos leves e esotéricos"** — lista fechada |
| Matéria vermelha | — (impõe –2 em perícias de Carisma, exceto Intimidação) |
| Mitral | — |

### Ameaças de Arton (p. 399+) — materiais de monstro

Estrutura diferente: cada um diz quantas **peças** exige e alguns só servem a
parte dos itens.

| Material | Limite próprio |
|---|---|
| Casco de monstro | — |
| Couraça de kaiju | exige 1 peça (3 para armadura pesada) |
| **Couro de bulette** | **só Armadura** — não tem linha de Arma nem de Esotérico |
| **Cristal de sol** | **"Só pode ser aplicado a armas de corte ou perfuração"** (na linha Arma) |
| Lanajuste · Espada de coral · Pena de kraken · Prata · Quitina razza | peças por tipo de item |

> **No site, "Material especial" é uma entrada só, com o `obs` "Mestre define o
> material".** Nenhum dos 6 + ~9 materiais está modelado, nem as restrições
> deles. É a maior lacuna do mapa, e a mais trabalhosa.

---

## 6 · O placar: o que o site tem × o que os livros têm

```
46 melhorias nos quatro livros
42 no gerador  (23 arma + 20 armadura + 11 esotérico = 54 entradas,
                 42 melhorias distintas depois de juntar as formas
                 masculina/feminina da mesma melhoria)
 4 faltando
```

**As 4 que faltam — todas de ferramenta/vestuário**, categoria que o gerador não
sorteia:

| Melhoria | Livro | Efeito |
|---|---|---|
| **Aprimorado** | T20 164 | +1 na perícia que o item já modifica |
| **Brasonado** | Heróis 242 | usa a perícia do item para mudar atitude |
| **Usado** | Heróis 242 | rola de novo um 1 natural, 1×/dia |
| **Multifuncional** | Ameaças 399 | o item passa a servir a uma segunda perícia do mesmo atributo |

**Dois erros de cobertura nas que existem:**

1. **Deslumbrante** está marcada como `armadura`, mas o livro diz "armaduras **e
   vestuários**".
2. **Devotado** (Deuses) é "para todas as categorias acima" = armas **+**
   armaduras/escudos/ferramentas/vestuários. No site ela só está na lista de
   **armadura** — **falta na de arma**.

E uma de forma: **Espinhos** é uma entrada só na lista de armadura, mas o livro
imprime duas versões com efeitos diferentes (armadura × escudo). Quem rolar
"Espinhos" num escudo lê o efeito da armadura.

---

## 7 · O outro lado: os ITENS que impõem limites

Não é só a melhoria que restringe — alguns itens restringem de volta.

| Item | O limite | Onde |
|---|---|---|
| **Munição** | Recebe melhorias e encantos **como arma**, mas "efeitos de munições **não acumulam** com os da arma de disparo"; e o aumento de preço é **metade** do de uma arma | T20 151 |
| **Instrumento musical** | Recebe melhorias **de ferramenta** (conta como item ligado a Atuação) **e de esotérico** (mas afetam só magias lançadas por bardos) | T20 158 |
| **Ferramenta / vestuário** | Recebem melhoria, **mas não material especial** | T20 163 e 166 |
| **Armadura pesada** | É a única que aceita **Delicada** e **Selada** | T20 164/166 |
| **Escudo** | É o único que aceita **Balístico**; e lê o **Espinhoso** na versão dele | Heróis 239 · T20 165 |
| **Arma de disparo (exceto funda)** | É a única que aceita **Mira telescópica** | T20 166 |
| **Arma de fogo e híbrida** | Além das melhorias, aceita **inovações** (mestre de armearia) — até 4, pela CD/preço da Tabela 3-7; e inovação **não tem valor comercial** | Deuses 111 |
| **Arma natural / ataque desarmado** | Não é objeto: não pode ser desarmada nem quebrada, e não recebe melhoria | T20 147 |
| **Item avariado** | –5 nos testes em que é empregado (arma/ferramenta) ou –5 na Defesa (armadura/escudo); avariar de novo **destrói** | Ameaças 375 |

---

## 8 · Como isto vira código, quando ele pedir

O gerador já tem a peça certa: `RESTRICAO_MELHORIA` em `js/recompensas.js`, um
mapa de testes que recebem **o nome do item sorteado e os atributos dele no
catálogo da Loja** (categoria e tipo de dano), e o `melhoriaCabe()` que descarta
e relança. Hoje são **8 testes**; o mapa acima pede:

- **2 testes novos**: `ferramentaOuVestuarioComPericia` (Aprimorado,
  Multifuncional) e `armaduraOuVestuario` (Deslumbrante).
- **1 restrição a TIRAR** (decidido em 05/10/2026): o `so: "armadura"` de
  **Injetora, Prudente e Sob medida** — elas passam a valer para armaduras
  **e escudos**, que é o que a tabela do livro diz.
- **1 correção de cobertura**: Devotado também na lista de arma.
- **1 leva à parte**: os ~15 materiais especiais, cada um com o seu limite e as
  suas "peças" — isso é tamanho de leva própria, não de ajuste.

### O que foi aplicado em 06/10/2026

```
FEITO    tirado o so:"armadura" de Injetora, Prudente e Sob medida
FEITO    Deslumbrante: armadura → armaduraOuVestuario (teste e rótulo novos)
FEITO    Espinhos virou Espinhosa (41–42, armadura) × Espinhoso (43–44, escudo)
NÃO      Devotado na lista de arma — ver abaixo
FICA     o teste de ferramenta/vestuário com perícia (depende de o gerador
         passar a sortear essas categorias)
FICA     os ~15 materiais especiais e os limites de cada um
```

**Por que o Devotado NÃO entrou na tabela de arma.** A Tab. 1-4 do *Deuses* o
põe em "todas as categorias acima", e isso inclui armas — mas o **pré-requisito
dele é o Inscrito**, que a mesma tabela só dá a armaduras, escudos, ferramentas
e vestuários. Numa arma o pré-requisito é impossível: o gerador descarta e
relança (é assim que `rolarMelhorias` trata pré-requisito), então a linha nunca
sairia — só gastaria rolagem e faria o Catálogo de Tesouros prometer uma
melhoria que não existe ali. É contradição do livro, e a leitura que o site já
tinha escolhido em 07/09/2026 continua valendo. **Se você quiser o contrário**
(a tabela do livro acima do pré-requisito), é uma linha em `MELHORIA_ARMA` — e
aí vale soltar o Inscrito para arma também, senão nada muda na prática.

**Como ficou conferido** (no navegador, com o Firebase desligado):

- as três tabelas fecham em 100 sem buraco, crescentes, sem nome repetido
  (23 arma · **21** armadura · 11 esotérico);
- todo `so` tem teste e rótulo, e nenhum teste ficou órfão;
- **os 155 itens** que o gerador pode sortear estão no catálogo da Loja — ou
  seja, nenhum escapa das restrições por falta de dado (`melhoriaCabe` libera
  quem não está lá);
- **20 000 itens superiores sorteados**: nenhuma melhoria caiu em item
  proibido, nenhum pré-requisito quebrado, nenhuma repetida no mesmo item;
- escudo agora recebe Injetora, Prudente, Sob medida e **Espinhoso**, e não
  recebe Delicada, Selada, Deslumbrante nem **Espinhosa** — a armadura, o
  contrário.

E duas delas dependem de uma mudança maior: **o gerador precisaria sortear
ferramenta e vestuário** como item superior, o que hoje não acontece — a Tabela
8-4 do livro só manda rolar arma, armadura/escudo e esotérico.
