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

- **A ficha ainda não empresta ao resto do site**: o PV não aparece na lista de
  iniciativa, e o item comprado na 🏪 Loja não entra sozinho no inventário.
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
