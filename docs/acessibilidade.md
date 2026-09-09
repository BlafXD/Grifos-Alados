# Acessibilidade — o site no celular, no teclado e no leitor de tela

**Feito em:** 9 de setembro de 2026
**Estado:** construído e conferido nas 13 abas da edição do mestre e nas 7 da
edição dos jogadores, a 360px, 390px, 700px e 1090px de largura.

Dois arquivos novos, `css/acessibilidade.css` e `js/acessibilidade.js`, mais
quatro emendas em arquivos que já existiam. Nada aqui muda o desenho do site no
computador — a gazeta continua a mesma.

---

## 1. O diagnóstico

Antes de escrever qualquer coisa, uma varredura: as 13 abas abertas uma a uma
numa tela de 390px, medindo o que estourava a caixa, o tamanho de cada alvo de
toque e o que um leitor de tela encontraria. O que apareceu:

| O que | Quanto |
|---|---|
| Seções visíveis do menu numa tela de 390px | **3 de 13** — e sem nenhum sinal de que a faixa rolava |
| Seções visíveis do menu numa tela de 1536px | **12 de 13** — "🎲 Mesa" ficava do lado de fora |
| Declarações de fonte abaixo de 0,7rem | **237** (a menor: 0,46rem = **7,4px**) |
| Declarações de fonte em `px` | **zero** — tudo em `rem` |
| `aria-label` no app inteiro | 20 |
| Marco `<main>`, salto para o conteúdo | não existiam |
| Modal com foco preso | não — o `aria-modal` estava lá, o foco não |
| Tabela larga que o teclado alcança | nenhuma |

A linha que decidiu o resto foi a das fontes: **869 declarações em `rem`, zero em
`px`**. Isso quer dizer que mexer no `font-size` da raiz escala texto, respiro,
botão e tabela **juntos e na mesma proporção** — sem quebrar um layout sequer. É
a razão de o painel ⚙ ser a peça mais importante deste trabalho, e de os alvos de
toque terem custado tão pouco: quase todos cresceram de graça junto com a fonte.

---

## 2. A gaveta de seções

O problema nº 1 do celular. Treze seções somam ~1500px de faixa; numa tela de
390px apareciam três e meia, o corte era limpo e nada dizia que havia mais. Pior:
a seção **aberta** podia estar fora da tela.

Abaixo de **820px** o menu vira gaveta, e uma barra fixa toma o lugar dele:

```
☰  COMBATES                    trocar   ⚙
```

Três decisões que valem a pena registrar:

- **A gaveta é o próprio `<nav id="main-nav">` reestilizado**, não uma cópia. Os
  links continuam sendo os mesmos elementos, então o `estado-navegacao.js` (que
  restaura a aba no F5 chamando `link.click()`) e o `script.js` seguem
  funcionando sem saber que a gaveta existe.

- **Quem tranca a gaveta fechada é o atributo `inert`, não `visibility: hidden`.**
  A gaveta fechada continua na tela, só empurrada para fora por um `transform` —
  sem trancar, o Tab passearia por 13 links invisíveis antes da primeira notícia.
  O `visibility` foi a primeira tentativa e **não serve**: em transição, o foco
  tenta entrar num elemento que o navegador ainda considera invisível e
  simplesmente não entra. O `inert` é atributo, vale no mesmo instante, e ainda
  esconde a gaveta do leitor de tela — o que o `visibility` não fazia de graça.
  (Confirmado no teste: `link.click()` continua funcionando dentro de um `inert`,
  que é o que o F5 precisa.)

- **O fundo fica `inert` enquanto a gaveta está aberta.** Com isso o "foco preso"
  sai de graça; o laço manual de Tab ficou só como reserva para navegador sem
  `inert`.

**Acima de 820px** o menu não virou gaveta — ele passou a **quebrar linha**. As
13 seções nunca couberam em 1536px, e num jornal um índice de seções em duas
linhas é o normal. O `--nav-h` que o `script.js` publica já contava com isso.

---

## 3. O painel ⚙

Mora no canto do masthead no computador (desenhado como carimbo de repartição) e
na barra fixa no celular — os dois cantos de baixo já têm dono: o 📡 na direita e
a coluna de rolagens/iniciativa na esquerda.

| Ajuste | O que faz |
|---|---|
| **Tamanho do texto** | Cinco degraus: 87,5% / 100% / 112,5% / 125% / 140%. Escala a gazeta inteira. |
| **Mais contraste** | `#6e5a44` sobre `#f2e8d5` dá **4,3:1** — abaixo do 4,5:1 que a WCAG pede para texto pequeno, e é justamente a cor dos rótulos miúdos. A chave escurece os tons apagados e engrossa as bordas. |
| **Menos movimento** | Desliga transições e a textura de ruído que cobre a página. |
| **Foco sempre visível** | O anel do teclado passa a aparecer também para o mouse. |

Tudo vai para `localStorage['grifosAlados.acessibilidade']` e vale nas duas
edições (mestre e jogadores).

**Sem escolha nenhuma, o celular já começa em 112,5%.** O motivo é aritmético:
0,6rem — o tamanho dos rótulos de tabela deste site — é 9,6px no padrão do
navegador. A 112,5% vira 10,8px.

> As preferências são aplicadas por um **script de oito linhas no `<head>`**, não
> pelo `acessibilidade.js`. O módulo é `defer`: aplicadas por ele, a página
> piscaria no tamanho errado a cada F5.

---

## 4. O menu falando que é menu

Eram 13 `<a href="#">`. Um leitor de tela anunciava treze "links para #" e não
dizia qual seção estava aberta. Agora são abas de verdade — `tablist` / `tab` /
`tabpanel`, com `aria-selected` e `aria-controls` — e o mesmo tratamento foi para
os cinco sistemas de sub-aba (Consultas, Anotações, Fichas, Criar Ameaça, Loja).

Três ganhos que vêm junto:

- **Setas andam, Tab pula.** As 15 sub-abas das Consultas eram 15 paradas de Tab
  antes do primeiro perigo; agora são uma. ↑↓←→ andam por dentro, Home/End vão às
  pontas. A ativação é **manual** (a seta move o foco, Enter/Espaço abre) — a
  automática re-renderizaria uma seção pesada a cada tecla.
- **O emoji virou enfeite.** `📰 Notícias` era lido "jornal Notícias"; o emoji foi
  para um `<span aria-hidden>`.
- **Trocar de aba é anunciado.** Antes, para quem enxerga a página inteira mudava
  e para quem ouve não acontecia nada. Uma região `aria-live` diz "Seção Combates
  aberta".

---

## 5. As tabelas largas

As tabelas de regras nascem com 447px numa coluna de 284px. Boa parte já rolava
dentro de um `.prog-table-wrap` — só que **rolava em silêncio e só com o dedo**:
uma div que rola e não recebe foco é conteúdo trancado para quem usa teclado.

O JS aproveita o invólucro que a aba já desenhou (não cria outro) e acrescenta:
borda "rasgada" do lado em que ainda há tabela, a legenda *↔ arraste ou use as
setas*, e `tabindex` + `role="region"` + rótulo com o título da tabela.

**Só a tabela que realmente não coube.** Marcar todas seria pior que não marcar
nenhuma: numa aba com 16 tabelas seriam 16 paradas de Tab e 16 marcos anunciados,
a maioria por tabelas que cabiam inteiras. A medida é refeita a cada troca de aba
e a cada mudança de largura.

---

## 6. Os botões de um caractere

Os `✕ ✎ 🗑 ↑ ↓ ⧉` ganharam duas coisas sem mudar de desenho:

- **Alvo de dedo por baixo.** Um `::after` invisível de 2,75rem centrado no
  botão. O desenho fica igual; o alvo cresce. (O JS pula quem já usa `::after`
  para desenhar alguma coisa — sobrescrever apagaria o desenho.)
- **Nome de verdade.** O `title` que já existia virou `aria-label`. "✕" era lido
  como "sinal de multiplicação" ou como nada; agora é "Remover sessão".

Na aba Combates isso pegou 27 botões de uma vez.

---

## 7. O modal

O `aria-modal="true"` sozinho é promessa vazia: ele **diz** que a página atrás
está fora do ar, mas quem cumpre a promessa é o foco. Sem isso, o Tab passeava
pelas abas por baixo do modal e o leitor de tela lia a página inteira como se
nada estivesse aberto.

O `GA_abrirModal` (que todo export `.txt` do site usa) passou a: pôr o foco no
primeiro campo de verdade — pulando o ✕, porque ninguém abre um modal para
fechá-lo —, prender o Tab dentro dele, devolver o foco ao botão que o abriu,
tirar o nome do próprio cabeçalho e travar a rolagem da página atrás. No celular
ele virou folha colada embaixo, mais perto do polegar.

---

## 8. Dois problemas antigos que a varredura pegou

Não eram acessibilidade — eram bugs de celular que ninguém tinha visto porque
ninguém tinha aberto o site a 390px com conteúdo dentro.

**A aba Combates rolava de lado.** Bastava existir *uma* sessão: 503px de miolo
numa tela de 380px. A causa é `#monstros .wrapper`, que é `flex` com
`align-items: flex-start` — certo no computador, onde a barra lateral fica ao
lado e não deve esticar até o rodapé. Abaixo de 900px o próprio
`monstros_style.css` o vira `flex-direction: column`, e aí `flex-start` deixa de
significar "não estique a ALTURA" e passa a significar "não estique a LARGURA":
os filhos passam a se medir pelo conteúdo. `align-items: stretch` resolve.

**O nome da sessão aparecia como "Sessã".** O cabeçalho é uma linha só com sete
coisas (▾, nome, "0 cenas", ↑ ↓ ⧉ ✕); todas são `flex: 0 0 auto` e o nome é o
único que encolhe — então era o único a pagar a conta, e sobrava 54px dele.
Deixando a linha quebrar, o nome fica com a primeira e os botões com a segunda.

Além desses, dois letreiros presos em `white-space: nowrap` (o divisor de tipo da
Loja e o selo "🔒 aba só do mestre" das Fichas Prontas) empurravam a página uns
pixels para o lado. Depois de tudo, **nenhuma das 13 abas rola de lado a 380px**.

---

## 9. Os arquivos

| Arquivo | O que |
|---|---|
| `css/acessibilidade.css` | **novo** — carregado por último, de propósito: tudo aqui é ajuste por cima do que as abas desenharam |
| `js/acessibilidade.js` | **novo** — carregado logo depois do `script.js` e antes das abas |
| `index.html`, `jogadores.html` | marco `<main id="ga-conteudo">`, o script de preferências no `<head>`, e as duas linhas dos arquivos novos |
| `js/script.js` | foco preso no `GA_abrirModal`; o `--nav-h` passa a medir a barra ☰ quando o menu virou gaveta |

---

## 10. O que ficou de fora

- **Contraste dos elementos coloridos que não são texto** (as bordas de painel, o
  fio de ouro). A WCAG pede 3:1 para eles; não foram medidos um a um.
- **Teste com leitor de tela de verdade** (NVDA, VoiceOver). O que existe aqui é
  a semântica correta e a árvore de acessibilidade conferida no navegador — não é
  a mesma coisa que ouvir.
- **A aba Anotações → Mapa.** É um quadro de arrastar nós com pan/zoom; funciona
  no toque, mas não tem caminho de teclado. Precisaria de um modo lista.
- **As caixas de marcar** continuam com o desenho azul do sistema, que destoa do
  pergaminho. É estética, não acesso.
