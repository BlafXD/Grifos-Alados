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
| `js/ficha-data.js` | as 29 perícias, as 30 classes (16 básicas e 14 variantes), os 6 atributos, os tamanhos, e o melhor amigo do Treinador (tipos, truques, parceiros) |
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
| PM | PM por nível × nível + o atributo das classes que lançam magia (uma vez cada atributo) | cap. 2; p. 226 |
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
2. **A tabela de PV/PM das classes** (30, desde 10/09/2026) não existe em
   nenhum outro lugar do projeto — criatura não tem classe. Nada a juntar.
3. **O rolador (`GA_Dados` / `GA_Rolagens`) é compartilhado, e deve ser.** Não é
   dado de ficha: é o dado da mesa, o mesmo que o bestiário e o painel de
   rolagens usam. É o que faz a rolagem da ficha aparecer para todo mundo.
4. **A caixa de texto rica (`GA_barraRica`, `.ga-rich`) também é compartilhada.**
   Mesma razão: é ferramenta de escrita do site inteiro, não conteúdo de ficha.

5. **O melhor amigo parece bicho de bestiário, e não é** (11/09/2026). Duas
   coisas dele têm gêmeas no `js/criar-ameaca-data.js`:
   - os **cinco tipos** (animal, construto, espírito, monstro, morto-vivo) têm
     os mesmos nomes dos tipos de criatura de lá — mas o pacote é outro: o do
     amigo é o da Heróis de Arton, p. 20–21 (+1 em For, Des e Sab para o
     animal…), e o de lá é o de Ameaças de Arton. *Não juntar*: o próprio livro
     diz que o amigo gorlogg "terá as características abaixo, não aquelas
     descritas em Tormenta20, p. 291";
   - as **armas naturais** (`ARMAS_NATURAIS`, linha 339). Ele pediu a lista como
     sugestão no campo do amigo (11/09/2026), e ela foi DUPLICADA no
     ficha-data.js, lida direto da Tabela 2-1 de Ameaças de Arton (p. 374) —
     não importada de lá. **A de lá tem 13 e a tabela tem 12**: o Pseudópode
     não está na tabela, vem da ficha de uma criatura. Para a aba ⚗ Criar
     Ameaça ele não atrapalha (é arma de verdade do livro), então ficou onde
     estava; só não entrou na ficha do amigo, que segue a tabela.

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

> **O rolador livre saiu do topo da ficha em 11/09/2026**, a pedido dele — ver
> "O traço forte e o celular", no fim. Os dados de cada perícia, ataque e dano
> continuam.

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

| | O que é (corrigido em 11/09/2026 — ver o fim do arquivo) | Formato |
|---|---|---|
| 🜂 **Resistências** | **bônus no teste** de Fortitude, Reflexos ou Vontade contra aquele efeito ("resistência a magia +2") — não tira dano | valor + efeito + de onde vem |
| 🛡 **Redução de dano** | ignora aquele tanto de **todo** dano ("RD 5"), a não ser que diga de qual; **dá para ter várias** | valor + tipo (ou "Geral") + de onde vem |
| 🚫 **Imunidades** | nenhuma consequência direta daquilo | o quê + de onde vem |

Mais o campo **🎓 Proficiências**, em linha, embaixo.

> ⚠ **A primeira versão desta tabela estava errada** — dizia que a resistência
> "tirava o dano daquele tipo" e que a RD era "de todo dano físico". Ele pegou
> em 11/09/2026, e o livro (p. 229) dá razão a ele. O cartão foi reescrito; a
> correção está em "A leva de 11 de setembro", no fim.

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

## 6. Os aprimoramentos que ACUMULAM (p. 171)

Ele apontou a regra: *"'Aumenta em...' — se tem isso, ele pode ser aumentado
várias vezes! Eu posso gastar +4 PM para aumentar +4d6"*. Está no livro, e o
teste é literal:

> "Para aprimoramentos que aumentam um valor (o texto começa com a palavra
> **«aumenta»**), você pode gastar aquela quantidade de PM várias vezes para
> acumular o aumento. A magia Bola de Fogo causa 6d6 pontos de dano e tem um
> aprimoramento que aumenta esse dano em +2d6 por +2 PM. Um arcanista de 11º
> nível pode gastar até 11 PM ao lançar essa magia, causando 14d6."
> — Tormenta 20, Magia, p. 171

Então quem começa com "aumenta" ganha **− ×N ＋** no lugar do liga/desliga, e a
linha mostra o acumulado: *"→ +8d6 ao todo, por 8 PM"*. São **153 dos 671**
aprimoramentos do livro. O `m.apr` guarda o índice repetido (`[0,0,0,0]` = quatro
vezes o primeiro), o que manteve a ficha velha funcionando sem migração nenhuma.

**O aumento é calculado, não adivinhado:** pego o PRIMEIRO `+XdY` (ou `+X`) do
texto e multiplico só ele. Sem número reconhecível ("aumenta o dano da arma em
mais um passo"), a tela mostra só o ×N e cala a boca sobre o resto.

**E entrou o teto de PM** (p. 224): *"para habilidades com custo variável, o
máximo de PM que você pode gastar por uso é igual ao seu nível NA CLASSE que
fornece a habilidade"*. Passou disso, aparece o aviso em carmim — e **não
impede**, porque só quem está com a ficha na mão sabe qual classe deu a magia.

**Conferido com o exemplo do próprio livro:** arcanista de 11º nível, Bola de
Fogo, quatro vezes o +2 PM → 11 PM no total, "+8d6 ao todo". A quinta vez passa
do teto e o aviso aparece.

## 🐛 O chip da mesa em cima dos botões

Print do celular dele: o painel ⚙ aberto e o chip da mesa por cima dos botões do
rodapé. **A causa é geral e valia para todo modal do site** — o chip
(`z-index: 9000`) e a coluna de rolagens/iniciativa (`8500`) nascem acima do
overlay do modal (`1000`). Agora `body.ga-modal-aberto` esconde os dois: ver
magia, buscar magia, exportar loja e acessibilidade ficaram livres.

E, como ele pediu, **o chip encolhe**: um ▾ no canto o reduz a um 📡, e um clique
nele devolve tudo. Fica guardado no navegador — quem recolheu quer recolhido
amanhã.

> **Nota de teste:** o `getComputedStyle` lido pelo bridge da extensão devolveu
> `visible` para um elemento que estava escondido (até com `style` inline). A
> foto da tela é que valeu. Quando o CSS "não aplicar" e a regra estiver lá,
> tire um screenshot antes de sair caçando o problema no lugar errado.

## 🐛 De quebra: o cadeado que mentia

Na página dos jogadores, **todas** as caixas ricas da ficha mostravam
"🔒 entre para escrever" e ficavam apagadas — mesmo aceitando escrita. O
`modo-jogador.js` já libera a ficha desde a primeira leva (`SECOES_LIVRES`), mas
o CSS tinha ficado para trás. Agora `#ficha` está fora das três regras de trava.
As outras seções (Bases, Viagem) seguem com o cadeado, que lá é verdade.

## As classes que faltavam (10/09/2026, à noite)

A ficha só conhecia as 14 classes do livro básico, e a mesa dele usa mais. Agora
são **30**: as 14, mais o **Frade** e o **Treinador**, mais as **14 classes
variantes** do Heróis de Arton. Tudo lido do PDF, e cada número conferido em
DUAS fontes — o livro oficial e o suplemento que ele usa na mesa (que bate):

| Classe | Onde | PV inicial | PV/nível | PM/nível |
|---|---|---|---|---|
| Frade | Deuses de Arton, p. 39 | 12 | 3 | 6 |
| Treinador | Heróis de Arton, p. 16 | 12 | 3 | 4 |

**Das 14 variantes, dez copiam a básica e quatro NÃO** — e são essas quatro que
passariam batido numa cópia de "é igual à básica":

| Variante | De | O que troca |
|---|---|---|
| Burguês | nobre | 12 PV e 3/nível (o nobre tem 16 e 4) |
| Ermitão | druida | 12 PV e 3/nível (o druida tem 16 e 4) |
| Magimarcialista | bardo | 16 PV e 4/nível (o bardo tem 12 e 3) |
| Santo | paladino | 4 PM/nível (o paladino tem 3) |

**No dado, a variante só escreve o que troca.** O livro diz "Pontos de Vida:
como o inventor básico", e o `VARIANTES` de `js/ficha-data.js` diz a mesma
coisa: o Alquimista é só `{ de: 'inventor' }`, e o número vem da básica. Os
quatro que trocam têm o número escrito ao lado, e só eles — a exceção aparece
de longe.

**Na tela, é uma lista só, em dois grupos** (decisão dele): *Classes básicas*
(as 16, em ordem alfabética) e *Classes variantes* (as 14, cada uma com a
básica entre parênteses — "Burguês (nobre)"). A outra opção era a variante como
marca da básica, numa segunda lista; perdeu porque obriga a saber de que
básica a variante vem.

**E o aviso de multiclasse**, que diz e não trava: *"Não é possível fazer
multiclasse entre uma classe básica e uma de suas variantes — para todos os
efeitos, ambas são a mesma classe"* (Heróis de Arton, p. 22). Burguês numa
linha e Nobre na outra acendem um aviso em carmim embaixo das classes; a mesma
classe em duas linhas também. O `GA_FichaData.basicaDe()` é quem responde "que
classe é esta para as regras".

**A armadilha, que já tinha mordido à tarde:** a tabela das variantes do
suplemento (Tabela 1.5-21) sai TORTA do `pdftotext` e casa guerreiro com
alquimista. O par certo sai do bloco de PV e PM de cada seção ("como o inventor
básico") — e a Tabela 1-2 do Heróis de Arton, que sai alinhada, confirma os 14.

**Testado no navegador**, no index e no `jogadores.html`, no computador e a 390px
de largura: as seis que têm número próprio (Frade, Treinador e as quatro
variantes que trocam) e uma que copia (Necromante = arcanista) dão a conta
certa, com a linha por extenso embaixo do medidor ("PV = Burguês: 12 + 1 +
10×(3 + 1)"), e o
multiclasse legítimo (Burguês 11 + Guerreiro 2 = 65 PV, 50 PM) não acende aviso
nenhum.

**O que ficou de fora:** ~~o *melhor amigo* do Treinador~~ — ele pediu na mesma
noite, e entrou: ver a seção seguinte.

## O PM que faltava e o melhor amigo do Treinador (11/09/2026)

Os dois pedidos, nas palavras dele: *"faz o melhor amigo do Treinador também,
além de poder aumentar o PM máximo das fichas dos jogadores!"*

### O PM: a ficha esquecia o atributo de quem lança magia

O campo manual já existia ("PM de outras fontes", que o mestre também edita na
ficha do jogador pela mesa — a regra do banco deixa). O que faltava era o
**livro**: toda classe que lança magia **soma o atributo-chave no total de PM**,
uma vez só, e a ficha não somava. Era PM a menos em todo conjurador da mesa:

| Classe | Soma no PM | Onde |
|---|---|---|
| Arcanista | o atributo do Caminho (Bruxo e Mago: Int; Feiticeiro: Car) — a ficha usa o da CD | p. 37 |
| Bardo | Carisma | p. 44 |
| Clérigo, Druida | Sabedoria | p. 57, 61 |
| Paladino | Carisma, pelo Abençoado | p. 82 |
| Frade | Sabedoria | Deuses de Arton, p. 39 |
| Necromante | Inteligência (não tem Caminho) | Heróis de Arton, p. 35 |
| Usurpador | **Carisma** — o clérigo soma Sabedoria | Heróis de Arton, p. 41 |
| Magimarcialista, Ermitão, Santo | como a básica (Car, Sab, Car) | Heróis de Arton |

**O mesmo atributo não soma duas vezes** — o livro dá o exemplo pronto: *"um
clérigo/druida não soma duas vezes sua Sabedoria nos pontos de mana"* (p. 226).
Atributos diferentes, sim: clérigo/necromante soma Sab e Int. A conta por
extenso mostra cada um: `PM = 6×11 + Int 4 (arcanista)`.

E os dois campos manuais ganharam o nome do que fazem: **＋ PV máximo** e **＋ PM
máximo**, com a dica dos poderes que costumam ir ali (Vitalidade, Sarado,
Vontade de Ferro, Totem Espiritual, Elo com a Natureza) e do negativo para a
Penalidade de PM (p. 221).

> ⚠ **Quem já tinha posto o atributo à mão em "PM de outras fontes" agora conta
> duas vezes** — a conta por extenso embaixo do medidor mostra, e é só tirar.

### O melhor amigo (Heróis de Arton, p. 17–22)

Um cartão **🐾 Melhor amigo**, depois dos Ataques, que só aparece com o
Treinador na ficha (o dado fica guardado sem ele — tirar a classe por engano não
apaga o bicho). O livro diz que o amigo "possui uma ficha completa", e é o que
ele ganhou:

- **Tipo** (animal, construto, espírito, monstro, morto-vivo): o pacote do tipo
  entra sozinho — os atributos ao trocar de tipo (sai o do velho, entra o do
  novo), e as duas perícias do animal já vêm treinadas, com o ✓ verde "do tipo".
- **Tipo de parceiro**: os 12 de Tormenta20 (p. 260–261) e as 6 montarias
  (p. 262), com o bônus escrito no degrau certo — iniciante, veterano com Amigo
  Veterano, mestre com Amigo Mestre.
- **Atributos** guardados já com o tipo somado (For 1, Des 1, Con 1, Int –4,
  Sab 1, Car 0 de base).
- **PV** = 16 + Con + (nível − 1) × (4 + Con), com medidor, ± e o estado:
  *caído* em 0, *morto* em −10 ou −metade do máximo, o que for mais baixo
  (Tormenta20, p. 236) — e o lembrete de que o treinador fica atordoado por 1d4
  rodadas.
- **Defesa** = 10 + Des dele + **Car do treinador** + metade do nível.
- **As 10 perícias** que o livro deixa escolher (3 à escolha), roláveis.
- **Ataques** com o dado da arma: a Força (e o Treinamento Marcial) entram
  sozinhas no dano — ao contrário dos ataques do personagem, porque aqui a arma
  e a Força são as do bicho e ninguém lembra de corrigir o texto.
- **Os 22 truques** com o texto do livro, marcáveis como os aprimoramentos, com
  a conta "o nível dá N" (2, e +1 a cada três níveis). Os de número entram nas
  contas: Treinamento Defensivo, Veloz, Amigo Feroz, Treinamento Marcial,
  Redução de Dano, Amigão (+1 For e Enorme, desfeito ao desmarcar) e Anatomia
  Humanoide (Int –2).
- **Treino especializado** (5º): Conquistar pelos Números abre o segundo amigo;
  Treino Intensivo dá +4 PV por nível, RD 5/10/15 e truques.
- **Treinador Eclético**: o amigo passa a usar o nível de personagem para PV,
  perícias e Defesa — e só para isso; os truques seguem o nível de treinador.
- **📣 Direcionar** (p. 17): arma o próximo teste do amigo (e o ataque é teste
  de perícia), soma o Car do treinador e desconta os 2 PM do treinador pelo
  caminho de sempre (os temporários primeiro).

**O nível do amigo é o de TREINADOR** — "Para efeitos baseados no nível do
melhor amigo, use o nível do treinador" (p. 20). Num treinador 6/guerreiro 4, o
amigo é de 6º; com Treinador Eclético, de 10º.

**A RD se soma**: Treino Intensivo e o truque Redução de Dano são habilidades
diferentes, e "efeitos de habilidades e perícias acumulam entre si, exceto
quando vierem da mesma habilidade" (p. 226).

**O PV ATUAL do amigo mora à parte**, em `amigosPv` (id → PV), e não dentro de
`amigos`. A escrita da mesa é por grupo, e o PV é o que o mestre baixa no meio
do combate: se morasse junto, o jogador escrevendo a descrição do bicho mandaria
o PV velho e desfaria o golpe. Pelo mesmo motivo, o amigo cheio é a
**ausência** da chave, e não `null` — o banco apaga null, e a ficha que voltasse
dele pareceria outra e se redesenharia à toa (testado: o segundo eco idêntico
não redesenha nada).

**O que a ficha NÃO faz sozinha na arma:** a margem de ameaça (+1 do animal, +2
do Amigo Feroz) e o passo de dano (Amigo Feroz, Amigão) dependem de qual arma é
— o livro deixa escolher entre as de Ameaças de Arton, p. 374. A nota embaixo
dos ataques lembra, e o jogador escreve.

**As 12 armas naturais como sugestão** (pedido dele, 11/09/2026). O nome da
arma do amigo sugere as 12 da Tabela 2-1 de Ameaças de Arton (p. 374): cascos,
cauda, chifres, ferrão, garra, marrada, mordida, pancada, pinça, presas,
tentáculo e tromba. Escolher uma **preenche o tipo de dano** dela (a tabela só
dá isso: nome e tipo) — sem ligar para maiúscula nem acento ("pinca" acha a
Pinça). Não passa por cima do que o jogador escreveu: só troca o tipo vazio ou
um dos três do livro (corte, impacto, perfuração); "perfuração e veneno" fica.
**O dano continua 1d8 ×2**, que é a regra do amigo (Heróis de Arton, p. 20): o
"1d6 para uma criatura Pequena ou Média" da mesma página de Ameaças é regra de
ameaça.

**Testado no navegador** (index, `jogadores.html` e a 390px): treinador 6 com
Car 3 → amigo com 42 PV e Defesa 17; animal → For/Des/Sab 2, Percepção +7;
monstro desfaz o animal; Veloz → Defesa +2, 15 m e Atletismo treinado;
Treinamento Defensivo → Defesa 23; Treino Intensivo → 66 PV e RD 5, com o truque
RD 10; Amigão liga e desliga; Direcionar rola 1d20+10 e tira 2 PM; 0 PV → caído,
−33 → morto; o segundo amigo aparece com Conquistar pelos Números.

## O traço forte e o celular (11/09/2026)

O pedido: *"dê uma melhorada no design das fichas dos jogadores, deixe alguns
traços mais fortes e deixe as coisas mais bonitas e com boas práticas para quem
usa celular! Aliás, remova o rolador do topo da ficha."*

**O rolador livre saiu.** Na mesa, quem rola à mão é o painel 🎲 Rolagens (o
mesmo do mestre, com o campo de expressão); na ficha, rola o que tem número —
perícia, ataque, dano, crítico e o melhor amigo. Fora de mesa, o painel não
aparece, e a ficha fica só com esses botões.

**A referência do traço forte é a ficha de papel do Tormenta 20**: moldura de
tinta em volta de cada quadro e o título numa faixa preta. É uma camada só, no
fim do `css/ficha_style.css` ("TRAÇO FORTE"), por cima das levas anteriores —
para voltar ao traço fino, é apagar aquele bloco.

- Cada cartão ganhou **moldura de 2px em tinta** e o título virou **faixa
  escura com fio de ouro**. No celular a faixa é o marco que o polegar procura
  numa ficha comprida. O melhor amigo continua verde, agora na faixa.
- A identidade, que não tem título, é a **capa**: friso de 6px no alto.
- **Atributos** em quadro de tinta, com o nome numa tarja preta em cima (como
  na folha impressa); a **Defesa** num quadro igual.
- Os **campos** ganharam a linha de escrever embaixo (2px), e as divisórias
  pontilhadas claras viraram linha cheia.
- O **"outros" das perícias** virou um espaço em branco com traço embaixo:
  antes, a caixa de "0" pesava mais que o valor da perícia.

**O que era do celular:**

- **O ataque se lê de cima para baixo.** Abaixo de 900px a linha caía numa
  grade de "o que couber", e o botão `+4 🎲` ia parar ao lado do texto do dano.
  Agora cada peça tem o seu lugar (grid com áreas nomeadas): a arma e o ✕; a
  perícia, o extra e o ataque; o dano; o crítico; o tipo e o alcance. As peças
  sem classe própria são achadas pelo fim do `data-campo` (`[data-campo$=".dano"]`).
- **O item do inventário vira a conta por extenso**: `[−] 3 [+] × 0,5 cada =
  1,5 esp.`, com ✎ ✕ ao lado do nome. Para isso as três peças da conta ganharam
  um invólucro, `.fi-inv-conta-linha`, que no computador é `display: contents`
  (as três continuam sendo colunas da tabela) e no celular é uma linha só.
- **A linha da classe cabe a 360px**: com "Machado de Pedra (bárbaro)" na lista
  e o ✕ do tamanho do dedo, passava da tela; agora a lista encolhe.
- **Alvos de dedo de verdade** onde a fileira é apertada: o [−][PV][+] com 44px,
  o ✓ das perícias com 36px, os ✕ ✎ ＋ com 45px. O `::after` invisível do
  `acessibilidade.js` não serve ali — ele mede, vê o vizinho encostado e desiste
  (é o certo) —, então o botão cresce de fato.
- `touch-action: manipulation` em todo botão da ficha: apertar o − três vezes
  seguidas não dá mais zoom de toque duplo.

**🐛 A armadilha que isto revelou — e que vale para qualquer aba:** a regra do
`css/acessibilidade.css` que põe **16px em todo campo no celular** (para o
iPhone não dar zoom ao focar) tem especificidade (0,3,1) —
`input:not([type=checkbox]):not([type=radio]):not([type=range])` — e passa por
cima de qualquer classe de aba. Ela **encolhia os números grandes da ficha**: o
atributo de 1,7rem virava 1rem, o PV de 1,15rem também. Numa tela de
computador isso NUNCA aparece, porque a regra é `(pointer: coarse)`. O conserto
é o `#ficha-content` na frente, dentro do mesmo `(pointer: coarse)`; e maior que
16px o iPhone continua sem zoom.

> **Como testar o celular de verdade no computador:** o iframe de 390px pega a
> largura (e o texto a 112,5%), mas não o `(pointer: coarse)`. Copie as regras
> desse `@media` para um `<style>` dentro do iframe — foi assim que o encolhimento
> apareceu. Sem isso, o teste mostra um celular que não existe.

**Testado** no index e no `jogadores.html`, a 360, 390, 560 e 700px (com as
regras de toque injetadas) e no computador: nada rola de lado, o ± do item e do
PV funcionam, a perícia rola, e o rolador sumiu.

**O respiro que faltava** (mesmo dia, pelos prints dele, `Inútil/Print 1` e `Print 2`):

- **O título encostava no menu**, na página dos jogadores. As abas que abrem com
  título (Bases, Viagem, Mesa) descem **1,8rem** no cabeçalho; a ficha descia
  zero. Agora desce o mesmo — só quando é a primeira coisa da aba
  (`.wrapper > #ficha-content:first-child`): no index ela vem depois das
  sub-abas ✍ / 📄, e lá o respiro já existe.
- **As sub-abas do index** ficavam a 9px do menu; as de Consultas e Anotações, a
  19px. Ganharam o mesmo `padding-top: 0.6rem` delas.
- **A grade dos números colava no cartão de baixo** ("O que apara o dano"): os
  três cartões de dentro zeram a margem (quem separa é o `gap`), e a grade não
  tinha margem própria. Agora tem os mesmos 0,9rem de todo cartão — medido: todo
  par de blocos da ficha fica a 14px, sem exceção.

---

# A leva de 11 de setembro de 2026 — o que ele pegou usando a ficha

Sete pedidos numa mensagem só, e um deles só para anotar (está no fim).

## 1. Resistência ≠ RD — e a primeira versão tinha errado as duas

> "Resistência é bônus na rolagem CONTRA AQUELE EFEITO! É diferente de Redução
> de dano […] E RD o texto também está errado! Não é somente para DANO FÍSICO, é
> literal tudo!"

Ele tinha razão nas duas, e o livro diz com todas as letras (Tormenta 20 JdA,
**p. 229**, PDF 235 — o glossário de habilidades):

- **Resistência a \<Efeito\>**: "um bônus em testes de resistência contra efeitos
  do tipo especificado" — *resistência a magia +2* dá +2 no Fortitude, Reflexos
  ou Vontade contra habilidades mágicas. **Não tira dano nenhum.**
- **Redução de Dano (RD)**: "ignora parte do dano que sofre" — de **todo** dano.
  Pode ser de um tipo só (*redução de fogo 10*), e o que vem depois da barra fica
  de fora (*RD 10/mágico* vale para tudo menos o mágico).
- **Imunidade**: nenhuma consequência direta daquilo.

O cartão virou **🛡 Resistências, RD e imunidades** (o "o que apara o dano" não
servia, porque resistência não apara dano) e cada lista ganhou a frase do livro.
A caixa de tipo da RD, que sugeria "todo dano físico", agora sugere **Geral**, e
o número da resistência sugere **+2**. A nota de baixo diz a regra numa linha:
*resistência entra no teste; RD entra no dano*.

## 2. O selo "só treinada" nos Ofícios

As perícias comuns desenham o selo pelo `marcasDe()`; as linhas de Ofício só
desenhavam o ✕ e o ＋. O dado já dizia `treinada: true` (p. 121) — faltava pôr
o selo na tela, nas duas linhas.

## 3. O texto da arma (✎)

Embaixo de cada ataque, uma **caixa rica** com a barra de sempre: o encanto, o
que a arma faz no crítico, a habilidade que custa PM — "algo que o jogador sabe
que aquela espada é capaz". Mesmo molde do item do inventário: `notas` e
`aberto` dentro de cada ataque, e o ✎ dobra e desdobra. **Nasce aberta** (o
pedido era a caixa "abaixo da espada"); dobrada com texto dentro, o ✎ fica
tracejado. Sobe para a mesa no grupo `ataques`.

## 4. 🐛 As pílulas que vazavam, e o ✕ para fechar

A print 3 dele mostrava o dano e o crítico saindo da pílula, um por cima do
outro. **A causa:** o `pintarResultado()` escrevia `el.className = 'fi-res'` — e
apagava o `fi-res--atq` (que manda a pílula ocupar a linha inteira embaixo do
ataque) e o `fi-res--crit` (o listrado). Sem eles, os três resultados caíam nas
primeiras colunas da grade, a de 5rem e a de 2,8rem. Agora só a marca de erro
liga e desliga (`classList.toggle`). **Quem mexer ali: nunca troque o className
inteiro** — as classes da pílula dizem onde ela mora.

E cada pílula ganhou um **✕**: rolar Percepção, Reflexos e Vontade numa sessão
deixava a ficha pontilhada de resultados velhos. O ✕ tira só daqui; o painel
🎲 Rolagens da mesa é o histórico de todo mundo e continua como está. No celular
a conta quebra dentro da pílula, e o ✕ cresce para o dedo.

## 5. "💥 Crítico"

O botão era "💥 ×2" e virou **💥 Crítico**, a pedido dele — nos ataques do
personagem e nos do melhor amigo. O ×N foi para a dica do mouse, com a conta
pronta (*2d12+15 (×2 — só os dados multiplicam, p. 142)*), e o campo "19/×3" ao
lado continua dizendo o multiplicador.

## 6. As magias com o texto inteiro, e o recolher

O cartão de cada magia mostrava o **resumo** de uma linha ("Esfera
incandescente explode…"). Agora mostra o **texto do livro** — a descrição e o
truque, buscados na base na hora de desenhar (as 254 têm). Os aprimoramentos não
se repetem no texto: estão logo abaixo, com botão. Sem a base, fica o resumo que
a ficha guardou.

Com o texto inteiro, a lista de um conjurador de nível alto fica comprida e o
inventário vai lá para o fim. Então:

- o **nome** da magia recolhe e abre aquele cartão (sobra a linha do nome, com o
  🔥 à mão para lançar);
- **▸ Recolher todas** / **▾ Abrir todas**, no título do cartão.

**O que está recolhido é do navegador, não da ficha** (`localStorage`,
`grifosAlados.fichaMagiasFechadas`): o mestre recolhendo as magias de um jogador
não pode recolhê-las na tela do jogador, e não há por que mandar isso à mesa.

O 👁 e o modal da magia saíram — o texto que eles mostravam agora está no
cartão. O modal da busca ("＋ Adicionar magia") continua igual.

## 7. Anotado, não feito: rolar a magia

> "Anote para si uma ideia mas eu não quero nenhuma execução dessa ideia ainda"

Um dado na própria magia, para rolar o dano, a cura etc. **já com os
aprimoramentos ligados**. Quando ele pedir: o dado da magia está no texto
(`descricao`, ex.: "causando 6d6 pontos de dano de fogo"), e o aumento de cada
aprimoramento cumulativo já é lido pelo `aumentoVezes()` (o primeiro "+XdY").

## Testado

No `jogadores.html` servido por Node **com o Firebase desligado**, com uma ficha
de teste (arcanista 11, espada longa 1d12+15, quatro magias): as três pílulas do
ataque inteiras e cada uma na sua linha, o ✕ fechando só a sua, o ✎ guardando o
texto, o recolher uma e todas, os selos dos Ofícios e o cartão novo. No iframe
de 390px, com as regras de toque: nada passa da tela, e o ✎ e o ✕ sobem para a
linha do nome da arma. **Não medido**: o agrupamento dos dois botões do título
das Magias no celular, feito depois — a máquina ficou sem memória e o servidor
de teste caiu.
