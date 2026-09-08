# Mesa de verdade — salas, papéis, rolagens ao vivo e iniciativa

**Aberto em:** 8 de setembro de 2026
**Estado:** desenho. Nada implementado — este documento existe para a gente
concordar no formato antes de escrever a primeira linha.

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
        linhas/{id}    { nome, valor, tipo: 'jogador'|'criatura', uid?, ref?, ordem }
        atual          {id da linha da vez}
        rodada         1, 2, 3…
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

### A pegadinha do login do mestre

Hoje o mestre entra por **e-mail/senha** (`mestret20@gmail.com`) e os jogadores
pelo **Google**. São provedores diferentes: a mesma pessoa tem **`uid` diferente
em cada um**. Se ele se cadastrar como mestre com o `uid` do Google e depois
transmitir logado por e-mail/senha, o banco recusa.

Três saídas, da melhor para a pior:

1. **Registrar os DOIS `uid` como mestre** em `membros`. Custa nada, funciona
   nos dois logins, e o e-mail/senha continua sendo o que salva quando ele abrir
   o site fora do publicado. **É o que eu recomendo.**
2. Ele passa a entrar só pelo Google (aí o e-mail/senha vira decoração).
3. Vincular as contas no Firebase — mais trabalho, mesmo resultado.

> ⚠ Com o provedor de e-mail/senha ligado e uma conta `mestret20@gmail.com` já
> existente, entrar com o **Google** usando esse mesmo endereço pode devolver
> `auth/account-exists-with-different-credential`, dependendo da configuração de
> "uma conta por e-mail" do projeto. Se acontecer, é a saída 1 que resolve — cada
> login é uma conta, e as duas são mestre.

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

## 10. O que ainda falta responder

1. **Um jogador pode ter mais de um personagem na mesma mesa?** (o desenho acima
   já supõe que sim: `fichas/{fichaId}` com `dono`, em vez de `fichas/{uid}`)
2. **A iniciativa é da cena** (some quando o combate acaba) **ou da mesa** (uma
   lista solta que ele monta na hora)?
3. **Empate na iniciativa** — desempata sozinho (maior Destreza, como o livro) ou
   ele arrasta a linha na mão?
4. **O jogador vê o quê da lista?** Nome e ordem só, ou também o PV das criaturas?
5. **Quem rola a iniciativa do jogador** quando ele não está com o site aberto?
