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

## O que vem depois

2. **A ficha sobe para a mesa** — cada uma num nó com dono; o jogador escreve a
   dele, o mestre vê e edita todas.
3. **A ficha empresta ao resto** — o PV aparecendo na lista de iniciativa, e o
   item comprado na 🏪 Loja entrando no inventário com os espaços já contados.
