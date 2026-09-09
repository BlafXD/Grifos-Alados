# Mesa de verdade — salas, papéis, rolagens ao vivo e iniciativa

**Aberto em:** 8 de setembro de 2026
**Estado:** etapa 1 construída em 8 de setembro (§11) e revista **duas vezes** no
mesmo dia — §12 (não há dono do site, há dono de cada mesa) e §14 (**uma mesa é
uma campanha**, e o login do 📡 virou a conta do Google). Esperando as regras
serem publicadas. Etapas 2 a 4 seguem no papel; as notícias viraram a §13.

> ⚠ **Comece pela §14 — é o desenho que vale.** As §§1-6, 11 e 12 são o caminho
> até ele, preservadas porque explicam POR QUE cada simplificação aconteceu; mas
> falam de coisas que não existem mais (o nó `campanhas`, o `uid` autorizado, o
> usuário de mestre com senha).

---

## 1. O que já está decidido

| Pergunta | Resposta dele |
|---|---|
| Campanha e mesa são a mesma coisa? | **Não.** Uma campanha é o mundo; ela pode ter **várias mesas** com objetivos diferentes. O comum é 1 para 1, e o site tem de deixar isso fácil. |
| Como um jogador entra? | Ele **pede para entrar** e o mestre **aprova dentro do app** — nunca mais mexer em regra no console para incluir gente. |
| Que tamanho tem a ficha? | Ficha **feita no app**, completa, pelo livro. Conversa à parte (§8). |
| Rolagem pode ser forjada? | **Sem problema.** Mesa de amigos; quem rola é o navegador de quem clicou. |
| Iniciativa | Todos na mesma lista — criaturas e jogadores. Um botão passa o turno, a linha da vez **brilha**. |

## 2. A virada, em uma frase

Hoje o Firebase é uma **transmissão de mão única**: o `sync-mestre.js` intercepta
o `setItem`, pega cinco chaves inteiras do `localStorage` e publica o retrato; a
página dos jogadores copia. Funciona porque existe **um escritor só**.

Ficha, rolagem e iniciativa são **estado compartilhado**: várias pessoas
escrevendo pedaços diferentes ao mesmo tempo. Chave inteira do `localStorage` não
serve mais — dois jogadores editando derrubariam um ao outro. O banco deixa de
ser espelho e vira **a fonte da verdade** daquilo que é da mesa.

O site passa a ter dois tipos de dado, e a fronteira é a regra de ouro do
projeto daqui para a frente:

- **as suas coisas** — bestiário, anotações, combates preparados, notícias,
  viagens, bases: continuam **locais**, como sempre foram;
- **as coisas da mesa** — sala, membros, fichas dos jogadores, rolagens,
  iniciativa: **nascem no banco**, e o `localStorage` no máximo guarda cópia
  para sobreviver a um F5 offline.

Nada do que existe muda de lugar. O que é novo nasce do outro lado.

## 3. Duas descobertas que encurtam o caminho

**O motor de dados já está pronto**, em `js/monstros.js`:

| O que | Onde |
|---|---|
| `rolarDado(lados)` | `js/monstros.js:3313` |
| Rolador de expressões (`1d20+3`, `+ - * / ( )`, com teto de 100 dados e d1000) | `tokenizar()` / o "chat" do Combates |
| 20 natural verde, 1 natural vermelho | `formatarD20()` |
| `rolarPericia(botao)` — rola direto da ficha da criatura | `js/monstros.js:3457` |
| Log de rolagens com teto e `renderLog()` | `dados.log`, na persistência do Combates |

Ou seja: **"rolagem em tempo real" não é construir um rolador — é trocar onde o
log mora.** Hoje ele é um array dentro do `localStorage` do mestre. Vira um nó da
mesa, e todo mundo assina.

**A Iniciativa já é uma perícia rolável** de toda criatura
(`js/monstros.js:24`, `{ chave: 'iniciativa', rolavel: true }`), e a aba
⚔ Combates já organiza **sessão → cena → criaturas lado a lado**, com condições,
PV e ambiente. A lista de iniciativa não nasce do zero: nasce da **cena que ele
já montou**, e o botão de rolar já existe em cada ficha.

## 4. O desenho no banco

Plano, não aninhado — no Realtime Database ler um nó traz tudo o que está
embaixo, então campanha não pode ser a mãe de tudo.

```
campanhas/{campanhaId}
    nome, slug, dono, criadaEm
    mesas/{mesaId}: true            ← só o índice

mesas/{mesaId}
    nome, campanhaId, criadaEm
    membros/{uid}      { nome, papel: 'mestre' | 'jogador', desde }
    pedidos/{uid}      { nome, email, quando }
    fichas/{fichaId}   { dono: uid, nome, ... }
    rolagens/{id}      { uid, nome, rotulo, formula, total, quando }
    iniciativa/
        linhas/{id}    { nome, tipo: 'jogador'|'criatura', ordem }   ← membros leem
        atual          {id da linha da vez}
        rodada         1, 2, 3…
        valores/{id}   { valor, des }                    ← SÓ o mestre lê
    dados/             ← O QUE JÁ EXISTE: loja, viagens, bases (público)
    jogadores/inventario/   ← O QUE JÁ EXISTE
```

**O `mesas/{mesaId}` continua sendo o que já é hoje.** A sala `mesa` de hoje vira
uma mesa desta lista, o `?sala=` do link dos jogadores continua valendo, e nada
do que está no ar precisa de migração — só de um `membros` novo.

**O `slug` da campanha é o mesmo das Notícias** (`{campanhas:[…]}`, ver a gazeta
por campanha). É a costura entre o que já existe e o que vem: as notícias de uma
campanha valem para todas as mesas dela.

## 5. Quem é quem: `uid`, não e-mail

A lista de e-mails na regra (feita em 08/09/2026) foi um degrau, e morre aqui.
Quem manda passa a ser o **`auth.uid`** e o nó `membros/{uid}`:

- `ehMembro` → `root.child('mesas/'+$mesa+'/membros/'+auth.uid).exists()`
- `ehMestre` → `…/membros/'+auth.uid+'/papel').val() === 'mestre'`

Duas consequências boas: incluir alguém vira **um clique no app** (o mestre
aprova o pedido, o app escreve o nó), e a página **lê** o papel de quem entrou —
some a falha de aviso de hoje, em que a caixa abre para qualquer conta e só
re-trava depois da primeira letra recusada.

**Decidido em 08/09/2026: todo mundo entra com o Google, o mestre inclusive.**
Um caminho de login só, para todos os papéis — menos código, menos regra, menos
explicação. O papel vem do `membros`, não de como a pessoa entrou.

### A pegadinha do login do mestre

Hoje o mestre entra por **e-mail/senha** (`mestret20@gmail.com`) e os jogadores
pelo **Google**. São provedores diferentes: a mesma pessoa tem **`uid` diferente
em cada um**. Se ele se cadastrar como mestre com o `uid` do Google e depois
transmitir logado por e-mail/senha, o banco recusa.

Três saídas, da melhor para a pior:

1. **Registrar os DOIS `uid` como mestre** em `membros`. Custa nada, funciona
   nos dois logins, e o e-mail/senha continua sendo o que salva quando ele abrir
   o site fora do publicado. **É o que eu recomendo, mesmo agora que o Google é o
   caminho principal** — é o seguro contra o dia em que o popup do Google não
   abrir no meio de uma sessão.
2. Ele passa a entrar só pelo Google (aí o e-mail/senha vira decoração).
3. Vincular as contas no Firebase — mais trabalho, mesmo resultado.

> ⚠ **Testar isso ANTES de precisar.** Com o provedor de e-mail/senha ligado e
> uma conta `mestret20@gmail.com` já existente, entrar com o Google no mesmo
> endereço pode dar `auth/account-exists-with-different-credential` — ou, pior de
> descobrir na hora, pode **substituir** o provedor de senha pelo do Google, e aí
> o login antigo para de funcionar. Qual dos dois acontece depende da
> configuração de contas do projeto. O teste é de um minuto: entrar com o Google
> uma vez e conferir em **Authentication → Users** se apareceu uma linha nova ou
> se a antiga mudou de provedor.

## 6. O que é público e o que é da mesa

Ele já decidiu que **ler continua aberto**. Isso vale para o que é gazeta; não
faz sentido para a ficha de um jogador. Então a leitura se divide:

| Nó | Quem lê | Quem escreve |
|---|---|---|
| `dados` (loja, viagens, bases) | **qualquer um com o link** | mestre |
| `jogadores/inventario` | qualquer um com o link | membros |
| `membros`, `fichas`, `rolagens`, `iniciativa` | **membros da mesa** | ver abaixo |
| `pedidos/{uid}` | o próprio e o mestre | o próprio (cria) e o mestre (apaga) |

Ou seja: quem abre o link continua vendo a loja, as bases e a gazeta sem login
nenhum. Para **ver a mesa ao vivo** — quem rolou o quê, de quem é a vez — aí
precisa entrar e ser da mesa. É a linha certa, e é a que o próprio jogo pede.

### Esboço das regras

```
mesas/$mesa
  ".write": "!data.exists() && newData.child('membros/'+auth.uid+'/papel').val() === 'mestre'"
      ← só serve para CRIAR uma mesa nova, fazendo-se mestre dela. Numa mesa que
        já existe isso é falso, e valem as regras de baixo.

  dados        .read: true            .write: ehMestre
  membros      .read: ehMembro        .write: ehMestre
  pedidos/$uid .read: ehMestre || $uid === auth.uid
               .write: ($uid === auth.uid && !data.exists()) || ehMestre
  fichas       .read: ehMembro
       /$f     .write: ehMestre || (ehMembro && newData.child('dono').val() === auth.uid)
  rolagens     .read: ehMembro        .write: ehMestre        ← só o mestre limpa
       /$r     .write: ehMembro && !data.exists() && newData.child('uid').val() === auth.uid
  iniciativa   .read: ehMembro        .write: ehMestre
  jogadores/inventario  .read: true   .write: ehMembro
```

Duas coisas de propósito:

- **Rolagem é só de acrescentar.** O `!data.exists()` no filho impede editar ou
  apagar uma rolagem já feita — ninguém "conserta" um 1 natural. Só o mestre, com
  a permissão do nó pai, limpa o log inteiro.
- **A permissão de um nó desce para os filhos** (regra rasa vence regra funda —
  foi a armadilha de 08/09/2026). Por isso o `$mesa` só é escrevível na criação:
  qualquer `.write` largo ali em cima entregaria a mesa inteira.

### Quem pode CRIAR uma campanha ou uma mesa

Pergunta que não existia antes e passa a existir: hoje ninguém cria nada — a sala
é um nome no `localStorage`. Com a aba nova, criar é escrever no banco.

E a chave do Firebase **é pública** (está no `js/firebase-config.js`, num
repositório público — e tudo bem, ela só identifica o projeto). Isso significa
que uma regra do tipo "qualquer um logado cria campanha" deixa um estranho criar
salas no banco dele e gastar a cota dele. Não é catastrófico, é sujeira — e é
evitável com uma linha:

```
campanhas/$c  ".write": "!data.exists() && auth.uid === 'UID-DO-CAIQUE'"
mesas/$m      ".write": "!data.exists() && auth.uid === 'UID-DO-CAIQUE'
                          && newData.child('membros/'+auth.uid+'/papel').val() === 'mestre'"
```

**Quem cria é só ele.** Jogador nunca cria: jogador **pede para entrar**. No dia
em que um amigo for mestrar no mesmo site, acrescenta-se o `uid` dele à lista —
mesma manobra da lista de e-mails, agora com `uid` e para um punhado de pessoas
que não muda.

### O passo de migração (uma vez)

A sala `mesa` que já está no ar não tem `membros`, e a regra de `membros` exige
ser mestre — dá um nó cego. Resolve-se pelo **console do Firebase**, escrevendo à
mão, uma vez só:

```
mesas/mesa/membros/<uid-do-mestre> = { nome: "Caique", papel: "mestre" }
```

O `uid` aparece em Authentication → Users. Feito isso, todo o resto se faz pelo
app.

## 7. Os arquivos

**Novos**

| Arquivo | O quê |
|---|---|
| `js/mesa.js` | o miolo: quem sou eu, qual o meu papel, qual a mesa/campanha. Expõe `GA_Mesa` (`papel()`, `souMestre()`, `membros()`, `entrar()`, `pedir()`, `aprovar()`). É de quem todo o resto pergunta. |
| `js/mesa-aba.js` | a aba 🎲 **Mesa** nas DUAS páginas: criar campanha, criar mesa, o link, os pedidos para aprovar, a lista de membros, o rolador de bolso e o log. |
| `js/iniciativa.js` | a lista, a ordenação, o "passar turno" e a linha que brilha. |
| `css/mesa_style.css` | o de sempre. |
| `js/ficha-personagem*.js` | etapa 4, conversa à parte. |

**Mudados**

| Arquivo | O quê |
|---|---|
| `js/monstros.js` | o log de rolagens deixa de ser só `dados.log`: cada rolagem também vai para `rolagens/` da mesa (e o painel passa a mostrar as dos jogadores). O `rolarPericia` da Iniciativa ganha um "→ mandar para a lista". |
| `js/sync-jogador.js` | o login sai daqui e passa a ser do `GA_Mesa`; a trava das caixas passa a consultar o **papel**, não o "está logado". |
| `js/modo-jogador.js` | idem: `permitirEdicao()` passa a receber o papel. |
| `js/sync-mestre.js` | a regra de escrita vira `ehMestre` em vez do e-mail; o resto continua. |
| `MODO-JOGADOR.md` | as regras novas e o passo de migração. |

## 8. A ficha, que é a etapa longa

Ele quer a ficha **completa, feita no app, pelo livro** — não o PDF importado de
hoje. É, sozinha, maior que sala + rolagens + iniciativa somadas, e merece o
próprio documento. O que já está do lado dele:

- o catálogo de **458 itens** com preço, espaços e descrição (a Loja);
- as **magias** com mecânica completa;
- as **condições**, os **poderes concedidos**, as regras de perícia;
- o `js/statblock.js` e a aba ⚗ Criar Ameaça, que já mostram como este projeto
  desenha uma ficha e calcula um valor derivado.

O que falta decidir, quando chegar a hora: quanto a ficha **calcula** (só guarda
números, ou soma atributo + treino + nível e valida pré-requisito?), se ela
acompanha **evolução de nível**, e se o mestre pode editar a ficha do jogador.

## 9. A ordem de construir

Cada etapa termina com algo que dá para usar na mesa da semana seguinte.

1. **Sala e papéis** — a aba 🎲 Mesa, os pedidos, a aprovação, as regras por
   `uid`. Tudo pendura nisto, e de quebra conserta a trava do inventário.
2. **Rolagens ao vivo** — o log do Combates vira nó da mesa; o jogador ganha o
   mesmo rolador numa caixinha. É pequeno (o motor existe) e é o que dá a alegria
   imediata de ver o dado do outro aparecer.
3. **Iniciativa** — a lista na cena do Combates: as criaturas que já estão ali,
   mais os membros da mesa; rolar, ordenar, passar turno, brilhar.
4. **Ficha de personagem** — a longa.

## 10. As cinco de detalhe — respondidas em 8 de setembro

1. **Um jogador pode ter mais de um personagem na mesma mesa: SIM.** Por isso
   `fichas/{fichaId}` com um campo `dono`, e não `fichas/{uid}`.
2. **A iniciativa é da CENA do combate.** Com uma ressalva que muda o desenho: a
   cena é preparação dele e **continua local** (é onde moram os PV, as condições
   e o que os jogadores não podem ver). O que sobe para a mesa é só a **lista
   viva** — "o combate que está rolando agora". O botão é *"começar a iniciativa
   com as criaturas desta cena"*; quando o combate acaba, ele limpa.
3. **Desempate automático pela Destreza**, como o livro manda — mas **só o mestre
   arrasta**, e arrasta qualquer linha, inclusive a dos jogadores. É o que
   permite atrasar a ação, preparar e todo o resto que muda a ordem no meio do
   combate.
4. **O jogador não vê NADA da criatura: nome e ordem, só.** Daí o
   `iniciativa/valores` separado, que só o mestre lê — a lista pública tem
   `nome`, `tipo` (para o ícone) e `ordem`, mais o ponteiro do `atual`. Se um dia
   ele quiser mostrar os números, é mudar de nó, não de desenho.
5. **Jogador ausente: o mestre digita.** A linha entra na mão, com nome e valor —
   o mesmo caminho de uma criatura, sem `uid` nenhum. Quando a mesa rodar de
   verdade a gente vê se isso incomoda.

---

## 11. Etapa 1 — construída em 8 de setembro de 2026

Sala, papéis e pedidos estão no código. **Ainda não estão no ar**: falta
publicar as regras novas (§11.2) e você assumir a mesa.

### 11.1 O que entrou

| Arquivo | O quê |
|---|---|
| `js/mesa.js` (novo) | o módulo inteiro: conta, sala, papel, membros, pedidos, criar campanha e mesa, trocar de mesa. Expõe `GA_Mesa`, de quem todo o resto pergunta |
| `css/mesa_style.css` (novo) | a aba na mesma gazeta das outras |
| `index.html`, `jogadores.html` | a aba **🎲 Mesa** nas duas, com a mesma `<section id="mesa">` |
| `js/sync-jogador.js` | o login saiu daqui: quem responde "posso escrever?" agora é o papel na mesa, não "está logado" |
| `js/sync-mestre.js` | `initializeApp` só se ninguém tiver criado o app antes |
| `MODO-JOGADOR.md` | as regras novas e o que mudou no dia a dia |

**Um app do Firebase para o site inteiro.** Os três módulos que falam com o
banco (`mesa`, `sync-mestre`, `sync-jogador`) agora dividem a mesma
inicialização — `initializeApp` duas vezes estoura, e antes só não estourava
porque nunca havia dois na mesma página.

**A aba mostra o que o papel permite**, não o que o arquivo tem: a mesma
`mesa.js` roda nas duas páginas. Visitante vê "entrar"; logado sem papel vê
"pedir para entrar"; jogador vê quem está na mesa; mestre vê os pedidos, o
link, os membros e o painel de campanhas.

### 11.2 Como ligar (na ordem)

1. **Publique as regras** do `MODO-JOGADOR.md`, parte 1.4. Elas já vêm com o
   seu `uid` e com o cinto de segurança do e-mail do mestre, para a
   transmissão não cair no meio do caminho.
2. **`git push`** — só ele publica o site.
3. Abra o site publicado, aba **🎲 Mesa**, **Entrar com o Google**.
4. A mesa `mesa` não tem membros: aparece **"Assumir esta mesa"**. Clique.
   Seu nome entra em "Quem está na mesa" como mestre.
5. Confira que o **📡 continua transmitindo** (aro verde). Se você entrou pelo
   Google e o 📡 estava no e-mail/senha, são duas contas: entre de novo pelo 📡
   e, na aba, cadastre o segundo `uid` como mestre — ou deixe o cinto de
   segurança da regra no lugar.
6. Mande o link da aba para um jogador e peça para ele **pedir para entrar**.
   O pedido aparece na sua aba em segundos; aprove como **jogador**.
7. Só depois disso, se quiser, apague da regra as duas ocorrências de
   `|| auth.token.email === 'mestret20@gmail.com'`.

### 11.3 O que ainda NÃO faz (é a etapa 2 em diante)

Rolagem ao vivo, iniciativa e ficha. A aba hoje resolve **quem é quem** — que
era o que faltava para tudo o mais poder existir.

---

## 12. A virada de dono — 8 de setembro de 2026 (segunda revisão)

A etapa 1 nasceu com um desenho de **casa com porteiro**: um `uid` autorizado
criava campanhas e mesas, e todo mundo pedia para entrar. Bastou usar para ficar
claro que era burocracia demais. O pedido dele, nas palavras dele: *"quem tem o
email logado pudesse já criar a sua própria campanha… quero menos burocracia e
mais liberdade, sem ter que eu ficar mexendo"*.

**Não há dono do site. Há dono de cada mesa.**

| Antes | Agora |
|---|---|
| Só um `uid` cria campanha e mesa | **Qualquer pessoa logada** cria as suas, e vira mestre delas |
| Jogador pede, mestre aprova (sempre) | **Porta aberta é o padrão**: entra com um clique. A aprovação vira uma opção por mesa (`entradaLivre`) |
| O nome da sala saía do nome da mesa | O mestre **escolhe o nome da sala**, que é o que vai no link; vale primeiro a chegar |
| As regras tinham o `uid` dele escrito | As regras não têm nome próprio nenhum — só `dono` e `membros` |
| `campanhas` só para quem está logado | `campanhas` é **público** (preparando as notícias, §13) |

**Como a mesa sabe quem é o dono:** o campo `dono`, escrito na criação. Ele é
público de propósito, junto com `nome`, `campanhaId` e `entradaLivre` — é a
placa na porta, que alguém precisa ler ANTES de entrar em conta nenhuma. Nada
disso é conteúdo de jogo.

**Mesa órfã é a que não tem `dono`** — as salas anteriores a esta aba, e
qualquer nome de sala que ninguém usou. Quem chegar logado assume. É como as
salas antigas voltam a ter mestre, e é uma porta que se fecha sozinha no
instante em que alguém a atravessa.

> ⚠ **Consequência prática: assuma as suas salas hoje.** Enquanto uma sala sua
> estiver sem `dono`, quem souber o nome dela pode virar mestre no seu lugar — e
> `mesa` é o nome mais adivinhável que existe. Depois de assumida, tranca.

**O erro que a banca de teste pegou:** eu deduzia "mesa sem mestre" de
`membros` estar vazio. Mas `membros` só quem já está na mesa consegue ler, então
para um visitante ele vem **sempre** vazio — e o botão "Assumir esta mesa"
aparecia para qualquer estranho, em cima de mesa cheia. A regra do banco teria
recusado a escrita, mas a tela mentia. Lição que vale para as próximas etapas:
**um estado que a tela mostra a quem está de fora tem de vir de um nó que quem
está de fora consegue ler.**

## 13. As notícias, quando chegarem (etapa 5)

Ele já disse aonde isso vai, e vale anotar antes de esquecer:

- as notícias de uma campanha só o **mestre daquela campanha** edita;
- **qualquer pessoa que entrar nos Grifos Alados vê as notícias de todas as
  campanhas** — *"porque ficam nas memórias"*: a gazeta é o registro do mundo,
  não o mural de um grupo.

Hoje elas vivem em `js/noticias-data.js`, um arquivo do repositório, e só ele
edita — o que ele aceita por enquanto. Quando virar etapa, mudam para
`campanhas/<c>/noticias` no banco, com `.read: true` e escrita do dono da
campanha. **O `campanhas` já foi aberto para leitura pública nesta revisão**,
exatamente para esse dia.

---

## 14. Uma mesa é uma campanha — 8 de setembro de 2026 (terceira revisão)

A segunda revisão (§12) tirou o porteiro, mas deixou **duas entidades**: campanha
por cima, mesa por baixo. Ao usar, virou passo a mais para nada — e a decisão da
§1 ("uma campanha pode ter várias mesas") foi revogada por quem a tomou:
*"esquece a parada de 'uma campanha ter várias mesas', uma mesa é uma campanha!"*

**Agora há uma coisa só.** O nome que o mestre escreve é, ao mesmo tempo, o
título da mesa, o id da sala e o link dos jogadores:

```
"Purista"  →  mesas/purista  →  jogadores.html?sala=purista
```

O nó `campanhas` **deixou de existir**. `mesas/{sala}` tem `nome`, `dono`,
`entradaLivre`, `criadaEm`, `membros`, `pedidos`, `dados`, `meta` e
`jogadores/inventario`. E cada pessoa guarda o próprio índice em
`usuarios/{uid}/mesas` — é dali que sai a lista "Suas campanhas", sem ninguém
precisar varrer o banco inteiro.

**O `?sala=` é normalizado nos dois lados.** `?sala=Purista`, `?sala=purista` e
`?sala=PURISTA` caem na mesma mesa. Antes, o link com maiúscula abria uma sala
vazia — e é o tipo de link que uma pessoa escreve à mão.

### Quatro papéis

| Papel | Transmite (`dados`) | Escreve as caixas | Mexe em quem entra |
|---|---|---|---|
| **mestre** | sim | sim | sim |
| **auxiliar** | sim | sim | não |
| **jogador** | não | sim | não |
| **espectador** | não | **não** | não |

O espectador é membro — vê a mesa e, quando as etapas 2 e 3 chegarem, verá as
rolagens e a iniciativa — mas não escreve nada.

### O login do 📡 mudou (era a reclamação da print)

O modal do botão 📡 pedia **e-mail e senha** de um usuário criado à mão no
console do Firebase, e devolvia `auth/invalid-credential` para quem não tinha
esse usuário. Agora ele pede a **conta do Google** — a mesma do site inteiro —
e, logo abaixo, o nome da campanha. Escreveu o nome, é mestre dela. Não existe
mais "usuário de mestre" separado.

Quem entra logado mas não mestra aquela sala vê o porquê e a lista das
campanhas dele, para trocar sem sair do modal.

### O que isso apaga do que veio antes

- as §§5-6 e §12 falam de `campanhas` como nó próprio — **não existe mais**;
- o `js/firebase-config.js` continua igual;
- o provedor **E-mail/senha** do Firebase não é mais necessário para nada; pode
  ficar ligado como paraquedas do `file://`, mas ninguém o usa no fluxo normal.

### Anotado para depois: Combates por campanha

Ele quer **sub-abas na aba ⚔ Combates, uma por campanha em que ele é mestre**.
Hoje as sessões e cenas moram todas num blob só (`grifosAlados.monstros`), sem
saber de que mesa são — o que já incomoda com duas campanhas rodando.

É trabalho **local**, não de banco: o combate preparado continua sendo dele e do
navegador dele. O caminho provável é um campo `mesa` em cada sessão, com a barra
de sub-abas filtrando por ela (o mesmo desenho das campanhas nas Notícias).

Vale fazer **antes da etapa 3**: a iniciativa nasce da cena do Combates, e é
mais limpo puxar "as criaturas da cena aberta desta campanha" do que descobrir
depois que a cena não sabe a que mesa pertence.

---

## 15. Etapa 2 — rolagens ao vivo (8 de setembro de 2026)

Feita. Toda rolagem do site aparece na tela de quem está na mesa, em segundos.

### O que entrou

| Arquivo | O quê |
|---|---|
| `js/rolagens.js` (novo) | duas coisas: **`GA_Dados`**, o rolador; e **`GA_Rolagens`**, o log ao vivo + o painel flutuante |
| `css/rolagens_style.css` (novo) | o painel, no canto de baixo à esquerda |
| `js/monstros.js` | **−131 linhas**: a cópia do rolador saiu daqui; e todo registro no log passa por `registrarLog()`, que também publica na mesa |
| `index.html`, `jogadores.html` | o módulo novo, logo depois do `statblock.js` |
| regras | o nó `rolagens`, **só de acrescentar** |

**O rolador virou compartilhado, e isso era o ponto.** Ele morava dentro do
`monstros.js` (que só o `index.html` carrega) e a página dos jogadores precisava
do MESMO — entender `1d20+3`, parênteses, o teto de 100 dados, o 20 verde e o 1
vermelho. Duas cópias divergiriam no primeiro conserto, então ele saiu para
`GA_Dados` e o Combates passou a chamá-lo. O chat de rolagens continua idêntico:
`2d6 + 3 * 2` devolve `2d6 (6, 1) + 3 × 2 = 13`, e `1d20 +` ainda responde
"⚠ Expressão incompleta".

**Um só ponto de registro.** Os sete lugares do Combates que empurravam no log
(`perícia`, chat, teste de morte, masmorra…) agora chamam `registrarLog()`, que
guarda no log local **e** publica na mesa. Quem não está numa mesa não perde
nada: o log local é o de sempre.

**A rolagem é só de acrescentar.** A regra do banco recusa editar ou apagar uma
rolagem já feita — ninguém "conserta" um 1 natural. Só o mestre limpa o log
inteiro, pelo 🗑 do painel.

**O painel fica no canto de baixo à ESQUERDA**, porque o 📡 mora no canto
direito e o selinho da página dos jogadores fica embaixo, no meio. Recolhe com
um clique no título, e lembra o estado. Espectador vê e não rola.

### A armadilha do dia

O `js/monstros.js` está em **CRLF**, e os scripts de troca em massa procuravam
com `\n`. Nenhuma busca de mais de uma linha casava, sem erro nenhum — só
"NÃO ACHEI". Quem for mexer em arquivo grande deste projeto por script:
normalize para `\n`, faça a troca, e devolva o CRLF na hora de gravar.

E a segunda: um `replace` global de `dados.log.push(` por `registrarLog(`
pegou **a linha de dentro da própria `registrarLog`**, criando uma recursão
infinita que o `node --check` não vê. Troca global em cima de código que você
acabou de inserir pede uma conferida no que foi inserido.

---

## 16. Combates por campanha (8 de setembro de 2026)

Feito, e é **tudo local**: o combate que o mestre prepara continua no navegador
dele. A campanha aqui é só a etiqueta que separa as mesas que ele mestra.

**Cada sessão tem uma dona** (`sessao.mesa`, o id da sala). Uma barra de
sub-abas no topo da aba ⚔ filtra por ela: **Todas**, uma por campanha, e
**Sem campanha** quando houver sessões de antes desta divisão — nada se perde, e
o seletor no cabeçalho de cada sessão adota uma órfã com um clique.

A lista de campanhas sai do `GA_Mesa.minhasMesas()`. **Uma sessão pode apontar
para uma campanha que este navegador não conhece** (backup restaurado de outro
aparelho): ela entra na barra pelo id mesmo, senão a sessão ficaria inalcançável.

**Sessão nova nasce na campanha aberta** — ou, em "Todas", na mesa que o 📡 está
transmitindo.

**O índice de cenas e o painel de combate seguem o mesmo filtro.** O painel é a
mesa de agora; ficha de outra campanha ali seria engano na hora do combate.

### A armadilha desta etapa

Todo `data-s` do HTML é um **índice absoluto** em `dados.sessoes`. Filtrar a
lista sem cuidado renumeraria tudo e faria o mestre editar a sessão errada — a
de outra campanha. Por isso `sessoesVisiveis()` devolve `{s, si}` com o índice
ORIGINAL, e o `render` usa esse `si`.

O teste que fecha isso: com o filtro em Nuevo Sol, renomear a única sessão
visível (que é a de índice 1) tem de mudar `sessoes[1]`, e não `sessoes[0]`.
Conferido.

---

## 17. Etapa 3 — a iniciativa (8 de setembro de 2026)

Feita, e com ela a mesa ao vivo fica de pé: sala, papéis, rolagens e a ordem do
combate. Falta só a ficha (§8).

### O que entrou

| Arquivo | O quê |
|---|---|
| `js/iniciativa.js` (novo) | a lista, a ordem, o turno e o painel |
| `css/iniciativa_style.css` (novo) | o painel, e a **coluna** que ele divide com as rolagens |
| `js/monstros.js` | expõe `GA_Combates.cenaParaIniciativa()` — o **mínimo** da cena narrada |
| `js/mesa.js` | o estado passa a incluir `membros` (a lista monta com eles) |
| `js/rolagens.js` | o painel dele passou a morar na coluna compartilhada |
| regras | `iniciativa` (membros leem) e `iniciativaValores` (só quem manda) |

**"⚔ Montar com a cena"** pega as criaturas da cena que ele está narrando na aba
Combates, rola `1d20 + modificador` para cada uma, e põe junto todo mundo da
mesa (menos os espectadores). Os jogadores entram **sem valor** — o mestre
digita o que cada um rolou, no campo ao lado do nome.

**A ordem sai do valor, o desempate sai do modificador.** O livro desempata por
Destreza; na ficha de criatura deste projeto não há campo de Destreza, mas o
modificador de Iniciativa **é** o valor de Destreza dela — então desempatar por
ele é a mesma regra, com o dado que existe. Conferido no teste: Goblin (mod 4) e
Ogro (mod 1) empatados em 8, e o Goblin ficou na frente.

**Quem manda arrasta.** ↑ e ↓ em qualquer linha, inclusive a de um jogador — é
como se atrasa ou se prepara uma ação. Clicar num nome dá a vez a ele. O ▶ passa
o turno, e quando dá a volta a **rodada** sobe sozinha.

**O jogador vê nome e ordem, e nada mais** — sem valores, sem botões, sem poder
clicar. Testado nas duas telas.

### A armadilha desta etapa (e ela era séria)

O primeiro desenho guardava os valores em `iniciativa/valores`, aninhado. **No
Firebase a permissão de LEITURA desce para os filhos**, e `iniciativa` é legível
por qualquer membro — ou seja, o nó "secreto" seria lido por todos, e a regra
filha não teria como restringir (regra de filho só ACRESCENTA permissão, nunca
tira). Os valores viraram um nó **irmão**, `mesas/<sala>/iniciativaValores`,
com regra própria de mestre e auxiliar.

É a mesma armadilha da cascata que já tinha aparecido na escrita (§12) — desta
vez do lado da leitura, que é mais silenciosa: nada falha, o segredo só não é
segredo.

---

## 18. A lista fora da mesa, e o botão que a chama (8 de setembro de 2026)

A etapa 3 subiu com um defeito que só aparece de fora: **o painel de iniciativa
não existia para quem não estava numa mesa.** O `render()` saía na primeira
linha se `souMembro` fosse falso, então o mestre que abre o site e vai direto
narrar — sem login, sem sala, sem banco — não via lista nenhuma e não tinha por
onde pedir uma. Foi o que ele relatou: *"a lista de iniciativa que para mim não
aparece"*.

### Duas casas para a mesma lista

| Onde ele está | Onde a lista mora | Quem vê |
|---|---|---|
| Numa mesa | `mesas/<sala>/iniciativa` (+ `iniciativaValores`) | a mesa inteira, ao vivo |
| Fora de mesa | `localStorage` → `grifosAlados.iniciativaLocal` | só a tela dele |

O resto do arquivo não sabe em qual das duas está: as escritas passam todas por
`gravar()` / `gravarLista()`, e é lá dentro que a bifurcação acontece. O patch do
Firebase (`'linhas/ID/ordem': 2`) é aplicado à mão na lista local pelo
`aplicarLocal()` — mesmo formato, mesma chamada, duas casas.

**A lista local só existe na página do MESTRE** (a que tem a aba ⚔ Combates —
é assim que o `paginaDoMestre()` decide). No `jogadores.html` a iniciativa
continua sendo só a da mesa: uma lista local ali daria a cada jogador uma ordem
particular, que não é ordem nenhuma.

### O botão

Na barra "Narrando a cena" do **Painel de combate** (`js/monstros.js`,
`construirPainel`), ao lado do "⚔ Combate em viagem": **⚔ Iniciativa**. Um
clique só — abre o painel e, se a lista estiver vazia, já monta com a cena
narrada. Ele nunca apaga um combate em andamento; para refazer há o "⚔ Montar
de novo" de dentro do painel, que pergunta antes. O painel mora no canto de
baixo à esquerda, longe de onde o olho estava, então ele **pisca** quando abre
assim (`.ga-ini--chamou`).

### Quando o painel aparece

| Quem | Regra |
|---|---|
| Mestre/auxiliar no `index.html` | o que ele mandou — o ✕ fecha, o botão ⚔ traz de volta |
| Auxiliar no `jogadores.html` | sempre (lá não há botão nenhum para reabrir) |
| Jogador | só quando há combate |

E **um combate que começa abre o painel sozinho**: o `conferirLista()` liga o
`visivel` na transição de lista vazia para cheia — o que também cobre recarregar
a página no meio do combate, e o auxiliar montando a lista do outro lado da mesa.

### O grupo

Os nomes digitados na mão (o campo aceita vários, separados por vírgula) ficam
guardados em `grifosAlados.iniciativaGrupo` e **voltam sozinhos** na próxima
montagem, sem valor, esperando o número. Mesa de amigos é a mesma gente toda
semana. Tirar alguém com o ✕ da linha também o tira do grupo.

### Criaturas repetidas

Três goblins na cena viram "Goblin 1", "Goblin 2", "Goblin 3". A lista serve
para saber **de quem** é a vez, e três linhas idênticas com valores diferentes
não dizem isso. Nome que aparece uma vez só fica como está.
