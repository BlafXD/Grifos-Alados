# Quem pode escrever na mesa — decidido

**Aberto em:** 1º de setembro de 2026
**Decidido em:** 8 de setembro de 2026
**Estado:** o site já está pronto. **Falta a sua parte no console do Firebase** —
ver "O que falta você fazer", logo abaixo.

---

## 0. A decisão, e o que já foi feito

> Leia esta seção e a próxima. O resto do documento é a análise de 1º de
> setembro, preservada como está: é dela que as decisões saíram.

**O que você decidiu (8 de setembro de 2026):**

| Pergunta | Resposta |
|---|---|
| De onde você abre o `index.html`? | Do **site publicado** (`blafxd.github.io/Grifos-Alados/`), não do disco |
| Fecha a leitura também? | **Não.** Ler a mesa continua aberto a quem tem o link |
| Fecha a escrita? | **Sim** — só quem entrar com o Google e estiver na lista |
| Trocar o nome da sala? | **Não** — a sala `mesa` fica até a campanha acabar |
| Onde mora a lista? | **Opção A**: os e-mails na própria regra do banco |

Como você abre o site publicado, o login do Google **funcionaria** também para o
mestre — a pegadinha do `file://` (§1) não te pega. Mesmo assim o mestre segue no
**e-mail/senha**: já funciona, e é o que continua funcionando no dia em que você
abrir o `index.html` do disco (offline, no meio de uma sessão, num outro
computador). Não há nada a ganhar em trocar.

**O que já está no código** (nada disso depende do Firebase para ser verdade):

| Onde | O quê |
|---|---|
| `jogadores.html` | entrou o SDK `firebase-auth-compat.js`, que faltava na página deles |
| `js/sync-jogador.js` | bloco "QUEM PODE ESCREVER": botão **🔑 Entrar com o Google**, quem está logado, sair/trocar de conta, e a tradução dos erros do Google para o português |
| `js/sync-jogador.js` | escrita recusada pelo banco vira recado na tela ("*fulano@gmail.com não está nesta mesa — peça ao mestre*") e **re-trava** as caixas, em vez de morrer no console |
| `js/modo-jogador.js` | `permitirEdicao()`: as caixas `[data-jog-edita]` seguem o login, travando e destravando nos dois sentidos |
| `css/style.css` | o selinho do rodapé virou duas partes (estado da sala + login); caixa travada perde a barra de formatação e ganha o selo "🔒 entre para escrever" |
| `MODO-JOGADOR.md` | as regras novas, o passo do provedor Google, os domínios autorizados, como tirar alguém da mesa e cinco problemas comuns a mais |

Sem Firebase configurado — ou com o CDN fora do ar — nada disso aparece e a
página volta a ser a cópia local de sempre: não há banco do outro lado para
proteger.

## 0.1 O que falta VOCÊ fazer (console do Firebase, ~10 min)

O site já está pronto para isso; o que falta é do lado do serviço. O passo a
passo detalhado está no `MODO-JOGADOR.md` (partes 1.4 e 1.5):

1. **Authentication → Método de login → ativar `Google`.** O e-mail/senha do
   mestre continua ligado, como está.
2. **Authentication → Settings → Domínios autorizados**: confirmar que
   `blafxd.github.io` está lá (o `localhost` já vem de fábrica).
3. **Realtime Database → Regras**: trocar o `".write": true` do
   `jogadores/inventario` pela lista de e-mails — o bloco pronto está no
   `MODO-JOGADOR.md`, parte 1.4. **Junte os Gmails dos seus jogadores antes**:
   é o único dado que só você tem.
4. **Simulador de regras** (no próprio console), antes de fechar: uma escrita em
   `mesas/mesa/jogadores/inventario` com um e-mail da lista tem de passar, e com
   um de fora tem de falhar.
5. `git push` do site e um teste no link dos jogadores.

Enquanto o passo 3 não for publicado, a regra antiga continua valendo: as caixas
pedem login (isso é do site, já está no ar assim que você publicar), mas o banco
ainda aceita a escrita de quem entrar com qualquer conta Google. **É o passo 3
que fecha a porta**, não o botão.

---

## O problema, como ele está hoje

O link do `jogadores.html` foi para um grupo do Discord. Hoje, **qualquer
pessoa que abra esse link pode escrever** na caixa de inventário dos
jogadores — não precisa de login, de convite, de nada. Ainda não aconteceu
nada, mas é uma porta aberta.

Isso não é um bug: é o desenho atual, e está documentado no `MODO-JOGADOR.md`.
A regra publicada no Firebase é esta:

```json
"mesas": {
  "$sala": {
    ".read": true,
    ".write": "auth != null && auth.token.email === 'SEU-EMAIL@AQUI.com'",
    "jogadores": { "inventario": { ".write": true } }
  }
}
```

Traduzindo o que cada linha permite hoje:

| Quem | Lê a mesa | Escreve na mesa | Escreve no inventário dos jogadores |
|---|---|---|---|
| Você (logado) | sim | sim | sim |
| Seu jogador | sim | não | **sim** |
| Um estranho com o link | sim | não | **sim** |

As duas últimas linhas são idênticas. **É exatamente esse o buraco:** o
sistema não sabe distinguir um jogador seu de um estranho, porque ninguém
se identifica.

O `sync-jogador.js` nunca chama `signIn` — não há autenticação nenhuma do
lado do jogador. A sala vem da URL (`?sala=nome`, padrão `mesa`) e é o único
"segredo" que existe.

**O estrago possível é limitado, mas real.** Tudo o que chega do banco passa
pelo `GA_limparHtml` antes de ser desenhado, então não há caminho para
executar script — é vandalismo, não invasão: apagar ou sujar o inventário do
grupo. E como esse nó não tem histórico nem desfazer, o que for apagado
sumiu.

---

## O que eu acho da ideia

**Está certa.** Trocar "quem tem o link" por "quem eu conheço" é o único
conserto de verdade. Um nome de sala secreto não resolve, porque um link é
feito para ser repassado — e o seu já foi.

Mas há três coisas a decidir antes de sair implementando.

### 1. A pegadinha: login do Google **quebra o mestre**

O login por Google (`signInWithPopup`) exige que a página esteja num
**domínio autorizado** no console do Firebase. O `file://` não é um domínio
— quando você abre o `index.html` direto do disco, `location.origin` é
`null` e o popup falha.

Já o `signInWithEmailAndPassword`, que você usa hoje, é uma chamada REST
comum: **funciona de qualquer lugar, inclusive do disco.**

> **Recomendação:** o mestre continua no e-mail/senha. O Google entra só
> para os jogadores, que acessam o site publicado de qualquer jeito. Não há
> ganho em mudar o seu login, e há um jeito claro de quebrar o seu fluxo
> de abrir o site do disco.

**A confirmar antes:** de onde você abre o `index.html` hoje — do disco, do
`localhost`, ou do site publicado? Se for do disco, a regra acima vale sem
discussão.

### 2. A pergunta escondida: quem **lê** também?

Sua mensagem é sobre quem *escreve*. Mas a regra de hoje tem `".read": true`
— **qualquer um com o link lê a mesa inteira**: notícias, loja, viagens,
bases. Fechar a escrita não fecha a leitura.

São duas decisões separadas:

- **Fechar só a escrita** → o jogador clica no link e já vê tudo; só precisa
  entrar com o Google quando for *escrever*. Mais simples, e o estranho
  continua lendo.
- **Fechar as duas** → ninguém vê nada sem entrar. Mais seguro, mas o
  "clicou no link, tá na mesa" acaba: todo jogador entra com o Google toda
  vez, e some a possibilidade de mostrar a gazeta para alguém de fora.

Não tenho como escolher por você — depende de quanto te incomoda alguém do
Discord ficar lendo a campanha. **Meu palpite:** fechar só a escrita já
resolve o que te preocupa, e custa muito menos experiência.

### 3. Onde mora a lista de quem pode

Três desenhos, do mais simples ao mais flexível:

**A) E-mails escritos na própria regra.** Para uma mesa de 4–6 amigos, é o
suficiente e leva uns 10 minutos.

```json
".write": "auth != null && auth.token.email_verified && (
   auth.token.email === 'MESTRE@gmail.com' ||
   auth.token.email === 'jogador1@gmail.com' ||
   auth.token.email === 'jogador2@gmail.com')"
```

*Custo de manter:* entrou jogador novo, você abre o console do Firebase e
edita a regra. Chato, mas raro.

**B) Lista dentro do próprio banco.** A regra consulta um nó que só você
escreve. Aí dá para **adicionar jogador de dentro do app**, sem abrir o
console.

```json
"mesas": {
  "$sala": {
    ".read": true,
    ".write": "auth != null && auth.token.email === 'MESTRE@gmail.com'",
    "jogadores": {
      "inventario": {
        ".write": "auth != null && auth.token.email_verified && (
           auth.token.email === 'MESTRE@gmail.com' ||
           root.child('mesas/' + $sala + '/membros')
               .hasChild(auth.token.email.replace('.', ',')))"
      }
    }
  }
}
```

O `.replace('.', ',')` existe porque **chave do Firebase não aceita ponto**
— `fulano@gmail.com` vira `fulano@gmail,com` como nome do nó. É idioma
padrão do Realtime Database.

> ⚠ Não testei essas regras — escrevi de cabeça. **Rode no simulador de
> regras do console antes de publicar**, com um e-mail de dentro e um de
> fora da lista.

**C) Aprovação por UID.** O jogador entra, o sistema registra o pedido, você
aprova. É o mais robusto e o mais trabalhoso. Para uma mesa de amigos, é
canhão para matar mosca — **não recomendo**.

> **Recomendação:** comece pelo **A**. Se um dia a mesa girar de gente, o
> **B** é uma migração pequena (a regra muda, o app ganha uma telinha).

---

## O que teria de mudar no código

Se for adiante, o trabalho é mais ou menos este — chute de uma tarde:

| Onde | O quê |
|---|---|
| Console do Firebase | Ativar o provedor **Google** em Authentication; publicar a regra nova; conferir os domínios autorizados |
| `js/sync-jogador.js` | Um botão "Entrar com o Google" e o `signInWithPopup`; hoje o arquivo não tem autenticação nenhuma |
| `js/modo-jogador.js` | As caixas `[data-jog-edita]` ficam travadas até o login; hoje elas já nascem editáveis |
| `js/sync-jogador.js` | Tratar o "permission denied" com uma mensagem humana ("você não está nesta mesa — peça ao mestre") em vez do erro cru |
| `MODO-JOGADOR.md` | O passo a passo de instalação muda: hoje ele manda ativar só E-mail/senha |

Nada disso é difícil. O que dá trabalho é acertar as regras e testar com uma
conta de fora — é o passo que as pessoas pulam e é onde mora o erro.

---

## O que dá para fazer AGORA, antes de decidir

**Trocar o nome da sala. Dois minutos, zero código.**

O link que está no Discord aponta para a sala atual, e essa sala está
queimada — todo mundo que salvou o link continua com ela. Um nome novo e
aleatório não conserta o problema de fundo (o link novo também é
repassável), mas **corta o acesso de quem já tem o antigo** e te dá tempo
para decidir com calma.

1. No app, campo da sala do painel de sync → um nome aleatório
   (ex.: `mesa-k7fq2p`). Fica salvo em `localStorage['grifosAlados.syncSala']`.
2. Passe o link novo `jogadores.html?sala=mesa-k7fq2p` **em mensagem
   privada**, não no grupo.
3. Os dados da sala velha continuam no Firebase — apague pelo console quando
   confirmar que todo mundo migrou.

**Segunda coisa barata:** hoje o nó `jogadores/inventario` não tem cópia
nenhuma. Se alguém apagar, apagou. Vale considerar um backup periódico dele
(mesmo que manual) enquanto a porta estiver aberta.

---

## Resumo — respondido em 8 de setembro de 2026

- A ideia está certa, e é o conserto de verdade. ✅
- **Mestre fica no e-mail/senha** ✅ — não porque o Google quebraria (ele abre
  o site publicado, então funcionaria), mas porque não há o que ganhar
  trocando, e o e-mail/senha é o que sobrevive a abrir o site do disco.
- **Google só para os jogadores.** ✅ Feito.
- Fecha **só a escrita**; a leitura fica aberta a quem tem o link. ✅
- **Opção A** (e-mails na própria regra). ✅ O bloco pronto está no
  `MODO-JOGADOR.md`, parte 1.4.
- **Trocar o nome da sala: não.** A sala `mesa` fica até a campanha acabar —
  decisão dele, sabendo que o link velho continua valendo para LER. Com a
  escrita fechada, o estrago que sobra é o que se lê, não o que se apaga.
- Continua valendo a **segunda coisa barata** da seção acima: o nó
  `jogadores/inventario` não tem cópia nenhuma. Se alguém da mesa apagar,
  apagou.

**O que ainda falta:** os três passos no console do Firebase (§0.1) — e os
Gmails dos jogadores, que só você tem.
