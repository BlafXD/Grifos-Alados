# Quem pode escrever na mesa — decisão em aberto

**Aberto em:** 1º de setembro de 2026
**Estado:** só análise. Nada foi mudado no código nem nas regras do Firebase.
**Quem decide:** você.

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

## Resumo para quando você voltar

- A ideia está certa, e é o conserto de verdade. ✅
- **Mestre fica no e-mail/senha** — o Google quebraria o "abrir do disco".
- **Google só para os jogadores.**
- Decida se fecha **só a escrita** (recomendo) ou também a leitura.
- Comece pela lista de e-mails na regra (**opção A**); o **B** fica para
  quando a mesa girar de gente.
- **Enquanto isso: troque o nome da sala hoje.** É grátis e corta quem já
  tem o link.

**Ainda a responder:** de onde você abre o `index.html` — disco, localhost
ou site publicado?
