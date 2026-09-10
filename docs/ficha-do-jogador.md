# A ficha de personagem — feita dentro do site

**Construída em 8 de setembro de 2026.** É a etapa 4 do plano da mesa
(`docs/mesa-de-verdade.md` §8), na primeira das três levas: a ficha inteira,
calculada e rolável, **salva no navegador**. A subida para a mesa vem depois.

## O que ele pediu, nas palavras dele

> "a ideia minha é para ser bem simples, não precisa colocar toooodas as raças e
> os demais, o que importa é a matemática das perícias, vida, pm e etc... O
> restante é só blocos enormes para escrever as habilidades!"

E, na mesma conversa, a regra que manda em tudo o que está aqui:

> "qualquer coisa que se relacione a ficha dos jogadores é somente dos JOGADORES
> e que não tenha nada a ver com fichas de criaturas"

## Três decisões, tomadas por ele

| Pergunta | Resposta |
|---|---|
| Onde a ficha mora | **Local agora, mesa depois** — nasce no `localStorage`, com a forma de dado já pronta para subir |
| Quem preenche | **Os dois lados** — o jogador na página dele, o mestre no painel |
| A ficha rola dado | **Sim, e cai na mesa** — pelo `GA_Rolagens`, que já existia |

## Os arquivos

| Arquivo | O quê |
|---|---|
| `js/ficha-data.js` | as 29 perícias, as 14 classes, os 6 atributos, os tamanhos |
| `js/ficha.js` | o modelo, as contas, a tela, a rolagem e o salvamento |
| `css/ficha_style.css` | o visual (prefixo `fi-`) |
| `index.html` | a 📖 Fichas ganhou **sub-abas**: ✍ Ficha de Personagem e 📄 Fichas em PDF |
| `jogadores.html` | aba nova **📖 Ficha**, logo depois das Notícias |
| `js/modo-jogador.js` | `ficha` entrou em `SECOES_LIVRES`, e a trava passou a respeitar essa lista |

## A matemática, conferida no livro

Tudo de Tormenta 20 — Edição Jogo do Ano, lido do PDF em 08/09/2026.

| O quê | Conta | Onde |
|---|---|---|
| Perícia | ⌊nível ÷ 2⌋ + atributo-chave + treino − penalidade de armadura + outros | p. 114 |
| Treino | +2 (1º–6º), +4 (7º–14º), +6 (15º+) | p. 114 |
| Defesa | 10 + Destreza + armadura + escudo + outros | p. 106 |
| PV | inicial da classe + Con, e (PV por nível + Con) por nível acima do 1º | cap. 2 |
| PM | PM por nível × nível | cap. 2 |
| Ataque | **é** teste de perícia — Luta (corpo a corpo) ou Pontaria (à distância) | cap. 5 |
| CD das habilidades | 10 + ⌊nível ÷ 2⌋ + atributo-chave | cap. 6 |
| Carga | 10 espaços + 2 por ponto de Força (ou −1 por ponto negativo) | p. 141 |
| Patamares | iniciante 1–4, veterano 5–10, campeão 11–16, lenda 17–20 | p. 39 |

**A fórmula da perícia bate com a Tabela 1-4 do livro**, que traz o bônus pronto
como "+2/+0", "+7/+3", "+13/+7" (treinada/não treinada) — conferido nos níveis
1, 2, 7, 15 e 17.

**São 29 perícias, não 30** (Tabela 2-1, p. 115). Só três sofrem penalidade de
armadura: **Acrobacia, Furtividade e Ladinagem**.

**Multiclasse funciona pela regra do livro:** o primeiro nível de uma classe nova
dá PV de nível *subsequente*, não do 1º (p. 40). Testado — guerreiro 3 + ladino 2
dá 46 PV e 17 PM, e a conta aparece por extenso embaixo do medidor.

## O que ela NÃO faz, de propósito

- **Não policia.** Não confere quantas perícias você pode treinar, nem
  pré-requisito de poder, nem se a classe permite a magia. Conta e mostra; a
  escolha é do jogador. Era o pedido de "bem simples", e é também o que evita a
  ficha brigar com a mesa de casa.
- **Não conhece raça, origem, poder, magia nem item.** Nada disso virou tabela:
  são cinco caixas de texto ricas (as mesmas do bestiário — grifo, ▣ caixa,
  ※ descrição, ⛶ expandir).
- **Não sobe para a mesa** ainda. A ficha do mestre e a do jogador são a mesma
  chave de `localStorage`; quem abre as duas páginas no mesmo navegador vê as
  mesmas fichas, e em navegadores diferentes cada um tem as suas.

## O que eu NÃO juntei — para ele decidir depois

Ele pediu que eu anotasse o que *pareceria* fazer sentido compartilhar, sem
compartilhar. Aqui está, e a recomendação é **deixar como está**:

1. **As 29 perícias existem duas vezes.** Em `js/ficha-data.js` (ficha) e em
   `js/criar-ameaca-data.js:297` (criatura), com os mesmos nomes e os mesmos
   atributos-chave. Juntar economizaria ~30 linhas — mas as duas listas
   **respondem a perguntas diferentes**: a de criatura tem `soTreinada` e
   `fixa` (que amarra a perícia a um campo do statblock); a de personagem tem
   `armadura`, `resist` e `ataque`, que não significam nada para uma ameaça. Um
   arquivo só passaria a carregar os dois vocabulários, e toda mudança de um
   lado precisaria ser pensada do outro. *Recomendo manter separado.*
2. **A tabela de PV/PM das 14 classes** não existe em nenhum outro lugar do
   projeto — criatura não tem classe. Nada a juntar.
3. **O rolador (`GA_Dados` / `GA_Rolagens`) é compartilhado, e deve ser.** Não é
   dado de ficha: é o dado da mesa, o mesmo que o bestiário e o painel de
   rolagens usam. É o que faz a rolagem da ficha aparecer para todo mundo.
4. **A caixa de texto rica (`GA_barraRica`, `.ga-rich`) também é compartilhada.**
   Mesma razão: é ferramenta de escrita do site inteiro, não conteúdo de ficha.

Ou seja: **dados de regra ficam separados; ferramentas continuam comuns.**

## Armadilhas desta etapa

- **`<section>` dentro de uma aba some.** O `css/style.css` usa
  `section { display: none }` / `section.active { display: flow-root }` para
  trocar de aba — então os cartões da ficha, que eu tinha escrito como
  `<section class="fi-cartao">`, ficavam invisíveis: o HTML estava todo lá, com
  altura zero. Viraram `<div>`. **Dentro de uma aba, nunca use `<section>`.**
- **`flex-basis` não segura a largura de um `<input>`.** O medidor de PV tinha
  `flex: 0 0 4.2rem` e o campo aparecia com 274px, empurrando o "/ 36" e o "+"
  para fora. O Chrome usa a largura intrínseca do campo; é preciso `width`
  junto. Vale para todo campo em linha flex.
- **Toda aba nova no `jogadores.html` nasce muda** — já anotado na etapa 3, e
  mordeu de novo, por outro lado: além de entrar em `SECOES_LIVRES`, as caixas
  ricas eram travadas por `travarEdicao()`, que só liberava as `[data-jog-edita]`
  **e só depois do login com o Google**. A ficha é local e nunca chega ao banco,
  então exigir conta para escrever nela era trancar a porta de uma casa vazia.
  Agora `travarEdicao()` pula as seções livres.

---

# A segunda leva — 9 de setembro de 2026

A etapa 2 ("a ficha sobe para a mesa") saiu, e com ela seis pedidos dele numa
conversa só. O que segue é o que mudou.

## 1. O mestre vê a ficha dos jogadores, ao vivo

> "eu permiti entrar uma pessoa e ela cria a ficha dela dentro do sistema, eu
> como mestre gostaria de VER a ficha, consultar ela, rolar dados e etc...
> Tudo em tempo real! Diminuir PV eu mesmo..."

Cada ficha sobe para `mesas/<sala>/fichas/<uid>/<id>`. Na 📖 Fichas do mestre
apareceu uma **segunda fileira de abas** — as fichas dos jogadores, com o nome
de quem é dono. Ele abre, consulta, rola qualquer perícia e baixa o PV; a tela
do jogador acompanha em segundos.

**Quem vê o quê** — e isto é regra de banco, não botão escondido:

| Quem | Lê | Escreve |
|---|---|---|
| o dono da ficha | a dele, em qualquer aparelho | a dele |
| mestre e auxiliar | **todas** as da mesa | todas |
| os outros jogadores | **nada** | nada |

`fichas` é o primeiro nó da mesa que **não** é de leitura pública: a loja e a
gazeta são abertas a quem tem o link, a ficha de alguém não. As regras estão em
`MODO-JOGADOR.md` e **precisam ser republicadas no console do Firebase** — sem
isso o banco recusa, e a linha 📡 da ficha mostra o erro em vez de fingir que
foi.

**Sem login, nada disso acontece**: a ficha continua sendo a folha local de
sempre, e a linha 📡 diz o que fazer para o mestre passar a vê-la.

### As duas decisões de engenharia

- **A escrita é por GRUPO, não pela ficha inteira.** Quando o mestre baixa o PV
  enquanto o jogador escreve no inventário, os dois escrevem no mesmo instante;
  mandar a ficha toda faria o último a falar apagar o outro. O que sobe é só
  `pv`, ou só `inventario`, e o banco junta. Quem marca o que sujou é o
  `gravarCampo()`, pelo primeiro pedaço do `data-campo`.
- **Toda ficha que chega passa pelo `normalizar`.** Ela vem do navegador de
  outra pessoa, que pode estar numa versão mais velha do site — e um cartão que
  lê `f.defesa.armadura` de um `f.defesa` que não existe derruba o *render*
  inteiro. Quem pagaria seria o mestre, no meio do combate, com a tela travada
  na ficha anterior e nenhum aviso. Foi um bug de verdade, pego no teste com uma
  ficha de um campo só.

## 2. PV e PM temporários, valendo de verdade

> "(O que pode acontecer do jogador ao tomar dano, invés de descer os PV
> temporários pode acabar acontecendo dele diminuir os PV atual!!!)"

Ele estava certo, e o livro concorda (p. 105, no texto):

> "Certos efeitos fornecem PV **ou PM** temporários. Eles são somados a seus
> pontos atuais, mesmo que ultrapassem o máximo. Pontos temporários são
> **sempre os primeiros a serem gastos**. Caso não seja especificado o
> contrário, pontos temporários desaparecem no fim do dia."

Antes, "PV temporários" era um número solto que não entrava em conta nenhuma.
Agora:

- **PM temporários** ganhou o bloco ao lado do de PV — é a mesma regra, e o
  livro cita os dois na mesma frase;
- o medidor tem um **selo dourado** (`⛨ 5 temp`) e a barra ganhou uma **faixa
  hachurada** por cima da vida: dá para ver de longe que há escudo em pé;
- todo dano passa por `gastarPontos()`, que **come o temporário primeiro** — e
  o eco conta de onde saiu cada ponto: *"🩸 −9 PV: 6 dos temporários e 3 do PV"*;
- **curar não devolve temporário** ("você nunca pode recuperar mais pontos do
  que perdeu", p. 105 — e o temporário não é perda);
- entrou uma caixa **Sofrer / curar** com 🩸 PV · ✚ PV · 🔥 PM · ✚ PM, para não
  precisar clicar nove vezes no `−`.

## 3. Um dado em cada perícia, e o rolador livre

O 🎲 saiu do implícito: cada perícia tem o seu, e a rolagem vai para a mesa
inteira. Ao lado, a mesma caixa de expressão do painel do mestre —
`2d6+3`, `(2d8+4)×2` — com atalhos de d20, d%, 2d6, d8, d6 e d4. Enter rola.

## 4. O inventário conta os espaços

> "eu posso ter UMA armadura que pesa 5! Mas se eu pegar outra da mesma armadura
> eu posso dizer que tenho DUAS armaduras que JUNTAS pesam 5!"

O inventário deixou de ser uma caixa de texto e virou lista, com a conta da
p. 141: **1 item = 1 espaço**; ½ para alquímicos, poções e pergaminhos; 2 para
armas de duas mãos, armaduras leves e escudos pesados; 5 para armaduras pesadas
e baús; 10 para o que for muito grande. **Cada mil moedas ocupam 1 espaço**,
então o campo de T$ entra na conta sozinho.

E o botão **cada / no total** é a resposta ao pedido dele: em `cada`, duas
poções de ½ dão 1 espaço (a regra); em `no total`, o monte inteiro ocupa o que
está escrito, quantas unidades forem — que é a decisão do mestre, e o próprio
livro a autoriza ("em caso de dúvida, o mestre deve decidir o que achar mais
coerente").

A **Carga** parou de ser um número digitado à mão: sai daí. E o aviso de
sobrecarga (−5 de armadura, −3m de deslocamento) aparece quando passa do limite.

## 5. Magias vindas da base do site

O "＋ Adicionar magia" busca nas **mesmas 254 magias** da aba 📚 Consultas
(`window.GA_MAGIAS`) — nome, escola, círculo, tipo. O que entra já vem com
círculo, PM, execução, alcance, alvo, duração e resistência preenchidos; o
**🔥 gastar** desconta os PM do círculo (dos temporários primeiro) e o **👁 ver**
abre o texto integral, com truque e aprimoramentos.

A ficha **não guarda uma segunda cópia do livro**: guarda o `id` da magia e o
que se lê na mesa. O texto inteiro é buscado na hora.

## 6. Dois Ofícios (ou quantos quiser)

> "posso ser um alquimista com um engenhoqueiro!"

O livro é literal (p. 121): **"Ofício na verdade são várias perícias
diferentes."** Então Ofício saiu do mapa de perícias — onde só cabia um — e
virou lista: cada linha tem a sua especialidade, o seu treino e o seu bônus. Ser
alquimista não faz de você um engenhoqueiro.

O ＋ acrescenta outro; o campo tem a lista do livro (armeiro, artesão,
alquimista, cozinheiro, alfaiate) como sugestão, porque o próprio livro manda
inventar os que faltarem.

## O que não se perdeu

As caixas de texto de **Magias** e **Inventário** continuam existindo — desceram
para dentro dos cartões novos, como anotação livre. O que já estava escrito
segue onde estava.

## O que ficou de fora

- ~~**A ficha ainda não empresta ao resto do site**: o PV não aparece na lista de
  iniciativa, e o item comprado na 🏪 Loja não entra sozinho no inventário.~~
  **Feito em 10/09/2026** — é a terceira leva, no fim deste documento.
- **Conflito de escrita é "o último ganha", por grupo.** Dois editando o mesmo
  grupo ao mesmo tempo (os dois no PV) ainda é o último a falar. Basta para uma
  mesa de amigos; não é um editor colaborativo.
- **Sem registro de quem editou.** Quem baixou o PV não fica anotado.

---

# A revisão — 9 de setembro de 2026 (mesmo dia)

Ele usou e voltou com sete apontamentos. Todos feitos; dois deles eram bug.

## 1. 🐛 A iniciativa não aparecia para o jogador. Nunca.

E o painel de rolagens da mesa, também não. **A causa é a mesma, e é a
armadilha mais cara deste projeto:**

> Um script com `defer` roda com `document.readyState` já em **`"interactive"`**,
> não em `"loading"`.

O `iniciativa.js` e o `rolagens.js` terminavam assim:

```js
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();                       // ← é sempre este que roda
```

Como os dois são carregados **antes** do `mesa.js` (que depende do CDN do
Firebase e por isso fica no fim), o `init()` acontecia com `window.GA_Mesa`
ainda `undefined`. O `iniciativa.js` caía no `else` e o `rolagens.js` dava um
`return` mudo — **nenhum dos dois chegava a registrar o `aoMudar`**. Depois
disso, entrar na mesa não adiantava: ninguém estava escutando.

Para o **mestre** passava despercebido, porque a lista dele é local e não
depende do banco. Para o **jogador**, era a ordem do combate não existir.

O conserto é uma segunda chance no `DOMContentLoaded` — que só dispara depois
que **todos** os `defer` rodaram, e é lá que se sabe de verdade se este site tem
mesa:

```js
function init(segundaChance) {
  if (window.GA_Mesa) { …registrar…; return; }
  if (!segundaChance && document.readyState !== 'complete') {
    document.addEventListener('DOMContentLoaded', () => init(true), { once: true });
    return;
  }
  …seguir sem mesa…
}
```

**Conferido com um A/B**: servindo a versão antiga, o painel não aparece (0
linhas); servindo a nova, aparece com a rodada e a ordem. O `ficha-mesa.js` já
nascia com essa guarda — foi ela que fez a pergunta certa aqui.

## 2. O resultado da rolagem, onde se clicou

Era uma faixa no alto da ficha: rolar Percepção lá embaixo queria dizer **subir
a página inteira** para ler o número. A faixa saiu. Agora cada botão que rola
tem o seu lugar de resposta, ao lado dele, e o que saiu fica lá até a próxima
rolagem daquele mesmo botão.

Vale para as 28 perícias, os ofícios, o ataque, o dano, o crítico e o rolador
livre.

## 3. Histórico de rolagens

Cartão novo no fim da ficha: as **30 últimas** rolagens daquele personagem, com
hora, o que foi rolado e o detalhe dos dados. Fica no `localStorage`
(`grifosAlados.fichaRolagens`), por ficha — sobrevive ao F5 e ao fechar o
navegador. Não é o log da mesa (esse é do `GA_Rolagens`, mora no canto e é
compartilhado): é o caderninho de quem está com a ficha aberta.

## 4. Ataque, dano e crítico — e o crítico é à mão

O botão de ataque virou `+5 🎲`, o de dano `🎲 dano`, e entrou um **`💥 ×N`**.
O ×N sai do que estiver escrito no campo de crítico (`19/×3` → ×3; vazio → ×2,
o padrão do livro) e acompanha o campo enquanto se digita.

**A conta é a da p. 142, no texto:**

> "Neste caso, multiplique **os dados** de dano por 2. Bônus numéricos e dados
> extras **não são multiplicados**. Por exemplo, um dano de **1d8+3 torna-se
> 2d8+3**."

Então `1d12+3` com ×4 vira `4d12+3` — e o +3 **não** quadruplica. É rolado à
mão de propósito: quem decide se o 20 virou crítico é a mesa.

## 5. Dois Ofícios, sempre à vista

O segundo estava atrás de um ＋. Agora a ficha nasce com **dois**, sempre
visíveis — ter dois é o caso normal, e uma linha vazia não atrapalha. O ＋
continua ali para o terceiro em diante, e o ✕ só aparece a partir do terceiro.

## 6. A lista de magias

Agrupada **por círculo**, como o livro lista e como se procura na mesa. O nome
inteiro virou botão: clicou, abre o texto completo com truque e aprimoramentos —
não precisa mais ir às Consultas com a ficha aberta do lado.

E o **＋ Adicionar magia** ganhou um segundo passo: a busca leva à magia
inteira, e só depois de lê-la há um "＋ Adicionar esta magia". Antes um toque na
lista já jogava a magia na ficha, e o dedo escorregando numa lista de 254 nomes
é fácil demais. A busca também marca o que **já está na ficha**.

## 7. A moeda não pesa

O livro diz que mil moedas ocupam 1 espaço (p. 141), mas a mesa dele não usa
isso. Agora a conta **nasce desligada**, e um botão 🪶 ao lado do T$ liga a regra
do livro para quem quiser. O rodapé do inventário diz qual das duas está valendo.

## 8. Saiu: o bloco "Sofrer / curar"

A pedido dele. O **−** e o **+** dos medidores continuam descontando dos
temporários primeiro (a regra da p. 105 não mudou de lugar) — mas um golpe de 9
agora é ou nove cliques no −, ou digitar o PV novo direto no campo, e **digitar
direto não passa pela regra dos temporários**. Fica registrado aqui porque é o
preço da simplificação, e é fácil de esquecer.

---

# A terceira leva — 10 de setembro de 2026

**A ficha passa a emprestar ao resto do site.** Eram as duas pontas soltas
anotadas em "O que ficou de fora": o **PV na lista de iniciativa** e o **item da
🏪 Loja no inventário**. Com elas, a etapa 4 do plano da mesa fecha.

## A regra que desenhou as duas: mão única

A ficha **não conhece** a iniciativa nem a Loja. Ela abre duas portas e fica
quieta; quem sabe da ficha é quem chama.

| Porta (`window.GA_Ficha`) | Quem usa | O que faz |
|---|---|---|
| `visiveis()` | `iniciativa.js` | devolve as fichas que ESTE navegador enxerga, com os números **já calculados** (PV, PM, Defesa, nível, Destreza) |
| `aoMudar(cb)` | `iniciativa.js` | avisa quando qualquer número muda — é o que faz o PV da lista acompanhar o da ficha |
| `receberItem(item)` | `loja.js` | guarda um item no inventário da ficha **aberta** e desconta o T$ |
| `abrirNaTela(id)` | `iniciativa.js` | troca a aba do site e traz aquela ficha para a frente |

Isso mantém de pé a fronteira de 08/09/2026 (*"qualquer coisa que se relacione a
ficha dos jogadores é somente dos JOGADORES e que não tenha nada a ver com fichas
de criaturas"*): **nada de criatura entra pelas portas**, e a ficha continua sem
importar uma linha do bestiário. O que atravessa é o PV **saindo**, para uma
lista que já misturava os dois lados.

## 1. O PV na lista de iniciativa

Cada linha de jogador que tem ficha à vista ganha, ao lado do nome, um selo
`42/42`: o número forte é o que a pessoa **tem para gastar** (o atual mais o
temporário, que é o primeiro a ser gasto — p. 105) e o pequeno é o máximo.

- **A cor conta de longe:** normal, dourado abaixo de metade, carmim abaixo de um
  quarto, e fundo carmim quando chega a zero. Um sublinhado dourado diz que há PV
  temporário em pé.
- **Clicar no selo abre aquela ficha** — troca de aba, entra na sub-aba certa e
  rola até ela. É de propósito que o dano **não** se aplica daqui: a regra dos
  temporários mora no `gastarPontos()` da ficha, e o bloco "Sofrer / curar" saiu
  a pedido dele. O selo mostra; quem baixa é a ficha.
- **Quem vê o quê continua sendo decisão do BANCO**, não desta tela. `visiveis()`
  devolve o que as regras já deixaram chegar: o jogador enxerga só as fichas
  dele, o mestre e o auxiliar enxergam as da mesa. Ou seja, **o jogador vê o
  próprio PV na lista e o do vizinho não chega nem ao navegador**.

**A lista passou a nascer com o nome do PERSONAGEM.** Ao montar, cada membro da
mesa é procurado entre as fichas visíveis: achou, a linha nasce com o nome do
personagem e amarrada à ficha (`uid` + `fichaId`, campos novos e públicos, que
não abrem nada — quem lê a ficha continua sendo só o dono e o mestre); não achou,
fica o nome da conta, como antes. Com mais de uma ficha da mesma pessoa, vale a
**mexida mais recentemente**, e a nuvem do selo diz de quem é ("PV de Zézinho
(ficha de Cleber)"), para o engano não ser mudo.

De quebra, o **desempate** passou a valer para os jogadores: o `mod` da linha
nasce com a Destreza da ficha, que em T20 **é** o modificador de Iniciativa. Ele
continua morando no nó secreto (`iniciativaValores`), fora do alcance dos
jogadores.

### A armadilha desta leva

**Redesenhar o painel arrancaria o foco do campo de iniciativa.** O mestre digita
"18" no valor de alguém enquanto o PV de outro muda — e um `innerHTML` no meio
disso engole o número. Por isso o aviso de mudança de ficha tem dois caminhos: se
o foco está **dentro** do painel, só os selos são repintados no lugar
(`pintarPvs()`); fora dele, o render normal. Conferido no dublê: o "18" digitado
continuou no campo enquanto o selo do vizinho ia de 5 para 40.

## 2. O item da Loja no inventário

Cada card da 🏪 Loja ganhou **🎒 Levar para a ficha** — nas armas, armaduras e
equipamentos, e nos **pergaminhos** (que já entram com ½ espaço, como o livro
manda).

- **São dois botões: `🎒 Levar — T$ 12` e `sem pagar`.** O primeiro desconta o
  dinheiro da ficha; o segundo põe na mochila sem mexer no T$ — o que o mestre
  deu, o que a mesa achou, o que já era seu. O Shift+clique continua valendo como
  atalho de teclado, e o preço no rótulo do botão diz o que vai acontecer antes
  de acontecer.
- **Vai para a ficha ABERTA**, e a resposta diz de quem é a mochila — inclusive
  quando o mestre está com a ficha de um jogador na tela, que é como ele entrega
  o que a mesa achou.
- **Os espaços saem da tabela do livro** (a coluna que o gerador chama de `peso`
  / `armor_weight`), e a anotação leva o que se lê no card: dano, crítico,
  alcance, bônus de armadura, e o preço pago.
- **O mesmo item comprado duas vezes vira ×2**, não duas linhas iguais.
- **O site não policia.** Sem dinheiro que cubra, o item vai do mesmo jeito e o
  T$ fica como estava — com o aviso escrito ao lado do botão. Passou do limite de
  carga, o aviso da p. 141 aparece junto ("−5 de armadura e −3m"), e ninguém é
  impedido de nada.
- **A resposta nasce ao lado do botão que a pediu**, como as rolagens da ficha, e
  fica lá até a próxima compra daquele item.

### 🐛 O Shift não existe no celular

Nasceu **só** com Shift+clique, e ele apontou o buraco no mesmo dia: *"como uma
pessoa de celular faria isso?"* — não faria. Metade da mesa joga no telefone, e
para essa metade a função simplesmente não existia. Pior: mesmo no teclado,
ninguém adivinha uma tecla escondida numa dica de mouse.

Daí os **dois botões visíveis**. E, no toque, os dois entraram na lista de alvos
grandes do `css/acessibilidade.css` (`@media (pointer: coarse)` → `2.75rem` de
altura), onde já moram os botões de ação do site. Medido num card de 360px de
largura — a largura de celular —, os dois cabem na mesma linha com folga.

**A lição, que vale para o resto do site:** atalho de teclado é **enfeite**;
tudo o que só existe com uma tecla apertada não existe para quem joga no
telefone.

### A trava do jogadores.html, e a exceção do tamanho de um botão

Na página dos jogadores a Loja inteira é só-leitura: o `modo-jogador.js` bloqueia,
na fase de captura, o clique em qualquer botão dentro de qualquer `<section>`
travada. O 🎒 morreria ali — e ele é justamente o botão que o **jogador** mais
usa.

Entrou então `[data-jog-livre]` na lista de permitidos: **um botão solto que
escapa da trava da seção dele**. A régua para usá-lo é estreita — só entra o
controle cujo efeito pertence a quem clicou. O 🎒 escreve na ficha de quem
clicou, nunca na loja do mestre; o 📦 de estoque, que é do mestre, continua mudo
lá. Conferido com um A/B: botão comum dentro da Loja não recebe o clique, botão
com `data-jog-livre` recebe.

## 3. O recibo, no fim da ficha

Pedido dele junto com os dois botões: um lugar para **o jogador consultar o que
comprou**. É o cartão **🧾 O que veio da Loja**, logo abaixo do 🎲 Histórico de
rolagens — mesmo desenho, mesma altura, mesma régua de 30 linhas.

Cada linha traz **quando, o quê e quanto**: `10/09 14:32 · Espada longa · T$ 12`.
As três formas de entrar têm cara própria — pago (`T$ 12`), de graça (`sem pagar
· vale T$ 12`) e o que não coube no bolso (`⚠ não pagou — faltou T$ 160`, em
carmim). No cabeçalho, o total gasto ali.

**Ele mora DENTRO da ficha (`f.compras`), e não no `localStorage` como o
histórico de rolagens.** É a diferença que faz a coisa funcionar: quem compra
pode ser o **mestre**, na tela dele — e o recibo tem de aparecer para o jogador,
que é quem vai olhar a mochila e não lembrar de ter comprado nada. Por isso a
linha também guarda **quem comprou**, quando não foi o dono: `· por Caique`.

Sobe para a mesa como qualquer outro pedaço, no grupo `compras` — que é próprio,
então o recibo nunca briga com o PV nem com o inventário na hora de gravar.
O 🗑 **Limpar** esvazia o recibo e **não devolve nada**: o que está na mochila
continua lá.

## O que eu NÃO juntei (fica anotado, ele decide)

- **A arma comprada não vira ataque na ficha.** Seria natural — "Espada longa"
  com dano 1d8 e crítico 19 já está na anotação —, mas a perícia do ataque não sai
  do dado: "Lança" tem alcance *Curto* e é de Luta; "Azagaia", também Curto, é de
  Pontaria. Chutar erraria calado. Hoje o dano fica na anotação do item, para
  copiar.
- **Comprar não dá baixa no estoque da prateleira.** São duas contas diferentes:
  o 📦 é do mestre e diz o que a loja tem; o 🎒 é do comprador. E na página dos
  jogadores a loja é só um espelho — dar baixa lá seria escrever num reflexo.
- **A Loja Especial (encantamentos) e os 🛎 Serviços não têm o botão.** Encanto
  não é item de mochila (é um adjetivo de um item que você já tem), e serviço é
  gasto, não carga. Se ele quiser, o caminho é o mesmo.

## O que foi conferido, e como

Servindo o site em `http://localhost:8765` com `Cache-Control: no-store` (sem
isso o Chrome serve o JS velho e o A/B mente), nas duas páginas:

| O quê | Resultado |
|---|---|
| Selo com PV, PM, Defesa e Destreza vindos das contas do livro | bárbaro nível 3 com Con +2 → 42 PV, 9 PM, Defesa 13 ✔ |
| PV mudando na ficha → selo acompanha | 42 → 8, e a cor vira carmim ✔ |
| PV temporário | `0 + 10 temp` mostra 10 e não é caído; `−3 + 6 temp` mostra 3 ✔ |
| Foco preservado enquanto o selo se atualiza | ✔ |
| Clique no selo abre a ficha | Notícias → 📖 Fichas, sub-aba ✍ Ficha ✔ |
| Mesa com membros, no dublê (Firebase de mentira) | linhas com nome de personagem, `uid`, `fichaId`; espectador fora; `mod` = Destreza no nó secreto ✔ |
| Comprar, comprar de novo, Shift, e sem dinheiro | ×2, sem cobrança, e aviso com o dinheiro intacto ✔ |
| Os dois botões (o que paga, o "sem pagar") e o Shift como atalho | os três caminhos, e o T$ certo em cada um ✔ |
| O recibo 🧾 | sobrevive ao F5, e o 🗑 Limpar não toca no inventário ✔ |
| O mestre comprando na ficha de um jogador | item e T$ na ficha DELE, e o recibo diz "por Caique" ✔ |
| Os dois botões num card de 360px (celular) | na mesma linha, sem vazar ✔ |
| Botão na página dos jogadores | vivo; botão comum na mesma seção, mudo ✔ |
| Sem ficha nenhuma | "Nenhuma ficha aberta — abra ou crie a sua na aba 📖 Fichas" ✔ |

**O banco real não entrou no teste** (exigiria a conta dele), como na leva
anterior: a mesa foi provada com dublê. O que depende do banco é o mesmo caminho
que a leva 2 já usa todo dia.

---

# A gaveta da conta — 10 de setembro de 2026

Pergunta dele, e ela achou um buraco:

> "As fichas dos jogadores são salvas SOMENTE NO DISPOSITIVO deles ou é ligado ao
> EMAIL dele? Seria possível ser salvo as coisas dos jogadores ligado ao EMAIL?"

**A resposta era "meio e meio", e o meio que faltava era o que importa.** A ficha
já subia para a mesa sob o uid da conta (leva 2) — mas o site **nunca a trazia de
volta**: o `aplicarChegada()` só atualizava fichas que já existissem naquele
navegador (*"ficha que só existe na mesa: não puxo"*). Trocar de celular era
começar do zero. E ela morava **dentro da mesa**: fora de uma, não existia; com a
campanha encerrada, ia junto.

## O desenho: uma gaveta por conta

`usuarios/<uid>/fichas/<id>` — as fichas da PESSOA, não da mesa nem do aparelho.

| | Onde | Quem lê |
|---|---|---|
| o aparelho | `localStorage` | quem está com o navegador |
| a **conta** | `usuarios/<uid>/fichas/<id>` | **só o dono** |
| a mesa | `mesas/<sala>/fichas/<uid>/<id>` | o dono e o mestre |

**Não precisou tocar nas regras do Firebase.** `usuarios/$uid` já era `só o dono
lê e escreve` desde a aba 🎲 Mesa — é onde a lista de mesas dele já morava. A
gaveta entrou por essa porta que já estava aberta.

A escrita virou dois destinos no mesmo salvamento (`js/ficha-mesa.js`): a mesa,
se eu estou numa e posso escrever; e a gaveta, **se a ficha é minha**. A ficha de
um jogador que o mestre está editando **não** vai para a gaveta dele — a regra do
banco não deixaria, e não deve deixar mesmo.

## Quem manda, quando os dois falam

Essa foi a decisão de projeto da leva, e ela evita um bug que seria feio:

> **A ficha que também está na mesa segue a MESA. A gaveta cuida do resto.**

É a mesa que carrega o PV que o mestre acabou de baixar; a gaveta pode estar um
segundo atrás. Se as duas mandassem igual, o eco da gaveta velha ressuscitaria o
PV cheio no meio do combate. Em troca, toda mudança que chega **pela mesa** é
reenviada para a gaveta na hora (`guardarNaConta()`), senão o outro aparelho
ficaria com o número velho para sempre.

## O celular novo

Entrando com a mesma conta num navegador vazio, aparece a barra **🗄 Na sua
conta**, com um botão por ficha: `⬇ Zézinho — Bárbaro 3`. Um clique e ela é
local como qualquer outra.

**Ela não entra sozinha, e isso é de propósito:** o que eu apaguei neste
navegador não pode voltar do banco no próximo login. Trazer é decisão de quem
está com a ficha na mão.

## O que foi conferido (dublê, com a regra do banco imitada)

| O quê | Resultado |
|---|---|
| Entrar na conta **sem mesa nenhuma** | a ficha sobe para `usuarios/u-eu/fichas` ✔ |
| Navegador vazio + conta com ficha | barra 🗄 com "⬇ Zézinho · Bárbaro 3"; o clique traz completa (nível, T$, PV 42) ✔ |
| O outro aparelho mexeu | nome e T$ mudam nesta tela sozinhos ✔ |
| O mestre baixa o PV pela mesa | a tela vai a 7 **e a gaveta acompanha**; o eco seguinte não desfaz ✔ |
| Apagar a ficha | some do aparelho, da mesa e da conta ✔ |
| O mestre editando a ficha de um jogador | **nenhuma** escrita na gaveta alheia ✔ |

**O que continua igual:** duas telas editando a MESMA ficha ao mesmo tempo ainda
é "o último a falar ganha", por grupo. Serve para mesa de amigos; não é editor
colaborativo.

---

# A leva do jogador — 10 de setembro de 2026

Ele usou a ficha de verdade e voltou com cinco pedidos. Todos feitos; o último
era o que ele mesmo tinha marcado como "pode ficar para depois".

## 1. O que apara o dano — e o que NÃO é teste de resistência

> "preciso de caixas de texto para colocar Resistência (**Teste de resistência é
> diferente de REDUÇÃO DE DANO!**), Redução de Dano (ele pode ter várias ao mesmo
> tempo), imunidades e proficiência"

Cartão novo, entre os números e as perícias, com **três listas separadas** —
porque são três regras diferentes que a mesa vive confundindo:

| | O que é | Formato |
|---|---|---|
| 🜂 **Resistências** | tira aquele tanto do dano **daquele tipo** ("resistência a fogo 10") | valor + tipo + de onde vem |
| 🛡 **Redução de dano** | tira de todo dano físico ("RD 5"); **dá para ter várias** | valor + condição + de onde vem |
| 🚫 **Imunidades** | não lhe atinge, ponto | o quê + de onde vem |

Mais o campo **🎓 Proficiências**, em linha, embaixo.

**A distinção que ele fez questão de marcar está escrita no cartão:** *"Teste de
resistência é outra coisa — Fortitude, Reflexos e Vontade são perícias em
Tormenta 20"*. Elas continuam na lista das 29, com o selo `resistência`, e o
cartão novo cuida só do que apara o dano **depois** que ele acontece.

Cada linha é `{ valor, do_, obs }` e sobe para a mesa no seu próprio grupo
(`resistencias`, `reducoes`, `imunidades`) — o mestre pode escrever numa enquanto
o jogador escreve na outra.

## 2. XP, e o quanto falta para subir

Campo **XP** ao lado da classe, com a frase que se quer ler no fim da sessão:

> faltam **2.500** XP para o nível 6 *(12.500 de 15.000)*

Mais uma barrinha do caminho andado. A tabela é a **1-4: Níveis de Personagem
(p. 34)**, lida do PDF em 10/09/2026 — a MESMA de onde sai o bônus de perícia que
a ficha já calculava, e as duas colunas batem linha a linha (1º +2/+0 … 20º
+16/+10). Ela mora em `js/ficha-data.js` como `XP_POR_NIVEL`.

**O XP não sobe ninguém de nível.** Subir é escolher poder, perícia e mais coisa
— quem faz isso é o jogador, no campo de nível. Quando os dois discordam a ficha
**diz** (*"a tabela já lhe dá o nível 6"*) e não conserta nada sozinha. É a mesma
política de sempre: conta e mostra, não policia.

## 3. Uma caixa de texto por item

> "seria interessante ter uma caixa de texto abaixo de cada item para eu escrever
> mais sobre a espada… por exemplo eu tenho um machado táurico com vampírica que
> exige que eu gaste PM para usar uma habilidade"

Cada linha do inventário ganhou um **✎** que abre, logo abaixo dela, uma caixa
rica de verdade (a mesma do resto do site: grifo, ▣ caixa, ※ descrição). O
estado aberto/fechado fica guardado, e o ✎ de um item que tem texto escrito fica
**marcado** mesmo fechado — senão o texto some de vista e ninguém lembra dele.

A `Anotação` curta continua na linha ("na mochila do Elias"); a caixa é para o
que o item **faz**.

## 4. A carga também dentro do inventário

Estava só lá em cima, no cartão de Defesa & Carga. Agora o 🎒 abre com a própria
conta — **`2` de `10` espaços**, uma barra, e o aviso da p. 141 quando passa do
limite (−5 de armadura e −3m; acima do dobro, não carrega). A de cima continua
onde estava.

## 5. Os aprimoramentos com botão

> "invés do jogador ter que ficar fazendo cálculo, poderia ter alguma forma mais
> prática para só apertar o botão de adicionar ou remover os efeitos de
> 'Aprimorado' para saber quantos PM gasto e quanto aumenta o benefício"

Cada magia da ficha lista os aprimoramentos **dela**, com um botão por linha:

```
✨ APRIMORAMENTOS        6 PM (3 da magia + 3)        ✦ limpar
  [＋ +2 PM]  aumenta o dano em +2d6.
  [＋ +2 PM]  muda a área para esfera flamejante…
  [− +3 PM]   muda a duração para um dia…              ← ligado
```

Ligou, o total no alto e o **🔥 do canto** mudam juntos; o 🔥 gasta esse total
(dos temporários primeiro, p. 105) e o histórico registra "Bola de Fogo
(aprimorada)". A escolha **fica guardada** na ficha — na mesa a mesma combinação
se repete toda semana.

**Isto só foi barato porque o dado já existia estruturado.** Os aprimoramentos
das 254 magias estão em `js/magias-data.js` como `{ pm, condicao, texto, requer,
itens }` — 235 magias têm pelo menos um. O `condicao` ("Apenas Druidas") e o
`requer` (círculo mínimo) viram selo na linha; os `itens` (3 magias os têm, como
Animar Objetos) aparecem quando o aprimoramento está ligado.

**Sem a base carregada** (ficha exportada em `.json`, site sem `magias-data.js`)
o cartão simplesmente não aparece e o 🔥 volta a ser o PM do círculo.

## 🐛 De quebra: o cadeado que mentia

Na página dos jogadores, **todas** as caixas ricas da ficha mostravam
"🔒 entre para escrever" e ficavam apagadas — mesmo aceitando escrita. O
`modo-jogador.js` já libera a ficha desde a primeira leva (`SECOES_LIVRES`), mas
o CSS tinha ficado para trás. Agora `#ficha` está fora das três regras de trava.
As outras seções (Bases, Viagem) seguem com o cadeado, que lá é verdade.
