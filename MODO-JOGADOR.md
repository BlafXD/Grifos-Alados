# 📡 Mesa ao vivo — os jogadores vendo a Loja, as Bases e as Viagens

A página **`jogadores.html`** é a "edição dos jogadores" da gazeta: mostra a **Loja
rolada** (com encantamentos e pergaminhos), as **Bases**, as **Viagens** e todas as
**Consultas** — tudo **só para ver** (nada de rolar, editar ou apagar). Quando você
mexe em algo no `index.html`, a página deles se atualiza sozinha em poucos segundos.

Para isso funcionar são precisos dois serviços gratuitos, configurados **uma vez só**
(uns 15 minutos): o **Firebase** (que carrega os dados do mestre até os jogadores) e
uma hospedagem para o site (**GitHub Pages**).

---

## Parte 1 — Criar o projeto no Firebase (~10 min)

1. Acesse <https://console.firebase.google.com> e entre com sua conta Google.
2. **Criar projeto** → nome `grifos-alados` (pode desligar o Google Analytics) → criar.
3. No menu lateral: **Criação (Build) → Realtime Database** → **Criar banco de dados**
   → local `United States` → comece em **modo bloqueado** → ativar.
4. Ainda no Realtime Database, abra a aba **Regras (Rules)**, apague o que estiver
   lá e cole isto **como está** — não há nada para trocar, fora o e-mail do
   paraquedas na penúltima seção (veja o aviso abaixo):

   ```json
   {
     "rules": {
       "usuarios": {
         "$uid": {
           ".read":  "auth != null && $uid === auth.uid",
           ".write": "auth != null && $uid === auth.uid"
         }
       },

       "mesas": {
         "$sala": {
           ".write": "auth != null && !data.exists() && newData.child('dono').val() === auth.uid && newData.child('membros').child(auth.uid).child('papel').val() === 'mestre'",

           "nome": {
             ".read":  true,
             ".write": "auth != null && (root.child('mesas').child($sala).child('membros').child(auth.uid).child('papel').val() === 'mestre' || !root.child('mesas').child($sala).child('dono').exists())"
           },
           "dono": {
             ".read":  true,
             ".write": "auth != null && !root.child('mesas').child($sala).child('dono').exists() && newData.val() === auth.uid"
           },
           "entradaLivre": {
             ".read":  true,
             ".write": "auth != null && (root.child('mesas').child($sala).child('membros').child(auth.uid).child('papel').val() === 'mestre' || !root.child('mesas').child($sala).child('dono').exists())"
           },
           "criadaEm": { ".read": true },

           "membros": {
             ".read":  "auth != null && root.child('mesas').child($sala).child('membros').child(auth.uid).exists()",
             ".write": "auth != null && (root.child('mesas').child($sala).child('membros').child(auth.uid).child('papel').val() === 'mestre' || !root.child('mesas').child($sala).child('dono').exists())",
             "$uid": {
               ".read":  "auth != null && $uid === auth.uid",
               ".write": "auth != null && (root.child('mesas').child($sala).child('membros').child(auth.uid).child('papel').val() === 'mestre' || !root.child('mesas').child($sala).child('dono').exists() || ($uid === auth.uid && !data.exists() && auth.token.email_verified == true && root.child('mesas').child($sala).child('entradaLivre').val() === true && newData.child('papel').val() === 'jogador'))"
             }
           },

           "pedidos": {
             ".read": "auth != null && root.child('mesas').child($sala).child('membros').child(auth.uid).child('papel').val() === 'mestre'",
             "$uid": {
               ".read":  "auth != null && $uid === auth.uid",
               ".write": "auth != null && ((auth.uid === $uid && auth.token.email_verified == true) || root.child('mesas').child($sala).child('membros').child(auth.uid).child('papel').val() === 'mestre')"
             }
           },

           "rolagens": {
             ".read":  "auth != null && root.child('mesas').child($sala).child('membros').child(auth.uid).exists()",
             ".write": "auth != null && root.child('mesas').child($sala).child('membros').child(auth.uid).child('papel').val() === 'mestre'",
             "$rolagem": {
               ".write": "auth != null && !data.exists() && root.child('mesas').child($sala).child('membros').child(auth.uid).exists() && root.child('mesas').child($sala).child('membros').child(auth.uid).child('papel').val() !== 'espectador' && newData.child('uid').val() === auth.uid"
             }
           },

           "dados": {
             ".read":  true,
             ".write": "auth != null && (root.child('mesas').child($sala).child('membros').child(auth.uid).child('papel').val() === 'mestre' || root.child('mesas').child($sala).child('membros').child(auth.uid).child('papel').val() === 'auxiliar')"
           },
           "meta": {
             ".read":  true,
             ".write": "auth != null && (root.child('mesas').child($sala).child('membros').child(auth.uid).child('papel').val() === 'mestre' || root.child('mesas').child($sala).child('membros').child(auth.uid).child('papel').val() === 'auxiliar')"
           },

           "jogadores": {
             "inventario": {
               ".read":  true,
               ".write": "auth != null && root.child('mesas').child($sala).child('membros').child(auth.uid).exists() && root.child('mesas').child($sala).child('membros').child(auth.uid).child('papel').val() !== 'espectador'"
             }
           }
         }
       }
     }
   }
   ```

   → **Publicar**.

   **Como ler isto.** Quem pode o quê não está escrito na regra: está no banco,
   em `mesas/<sala>/membros/<uid>` e no campo `dono`. A regra só pergunta ao
   banco. **Não há dono do site — há dono de cada mesa**, e é quem a criou.

   | Nó | Quem lê | Quem escreve |
   |---|---|---|
   | `dados` (loja, viagens, bases), `meta` | qualquer um com o link | o mestre da mesa |
   | `jogadores/inventario` | qualquer um com o link | **membros da mesa** |
   | `nome`, `campanhaId`, `entradaLivre`, `dono` | qualquer um | o mestre da mesa |
   | `membros` | membros (e cada um sempre lê o próprio) | o mestre; e o próprio, entrando numa mesa de porta aberta |
   | `pedidos` | o mestre (e cada um o seu) | quem pede, e o mestre |
   | `campanhas` | **qualquer um** (é a memória de Arton) | quem criou aquela campanha |

   > 🚪 **Porta aberta é o padrão.** Uma mesa nasce com `entradaLivre: true`:
   > quem abre o link e entra com o Google vira jogador num clique, e o mestre
   > vê o nome aparecer na lista (e pode tirar). Quem quiser mesa fechada troca
   > para "com aprovação" no cartão ✒ Esta mesa, e aí volta o pede-e-aprova.
   >
   > 🎩 **Quem cria é dono.** Qualquer pessoa logada cria a campanha dela e a
   > mesa dela, e vira mestre daquilo — ninguém precisa autorizar. O nome da
   > sala é **primeiro a chegar**: se já existir, o banco recusa e a aba avisa.
   >
   > ⚠ **Mesa sem membro nenhum pode ser assumida por quem chegar.** É como as
   > salas anteriores a esta aba voltam a ter dono. Consequência: **assuma as
   > suas hoje** — enquanto uma sala sua estiver sem membros, quem souber o
   > nome dela pode virar mestre no seu lugar. Depois de assumida, fecha.
   >
   > ⚠ **A permissão de um nó desce para todos os filhos** — regra de filho não
   > revoga a do pai. É por isso que `mesas/$sala` só é escrevível na CRIAÇÃO
   > (`!data.exists()`): qualquer `.write` largo ali em cima entregaria a mesa
   > inteira, fichas e rolagens junto.
   >
   > ⚠ **O `|| auth.token.email === 'mestret20@gmail.com'` em `dados` e `meta`
   > é o último resquício de nome próprio nas regras** — um paraquedas para a
   > transmissão do 📡 não cair enquanto o mestre da casa não confirmar por qual
   > conta transmite (a de senha e a do Google têm **`uid` diferente**, mesmo com
   > o mesmo e-mail). Troque pelo seu e-mail, ou **apague as duas linhas** depois
   > de conferir que o 📡 fica verde logado pelo Google.
   >
   > ⚠ **`email_verified == true`, com o `== true` escrito.** Sem ele o console
   > recusa com *"Left operand of && must be boolean"*: cada pedaço de um `&&`
   > precisa ser booleano, e o verificador não deduz o tipo dos campos de
   > `auth.token` sozinho. E ele fica só na linha de quem PEDE — nunca na do
   > mestre, cujo usuário de e-mail/senha nasce não verificado.

   **Teste no Simulador de regras antes de fechar o console:**

   | Simulação | Esperado |
   |---|---|
   | ler `mesas/mesa/dados` sem autenticação | passa |
   | escrever `mesas/mesa/dados` como jogador | **falha** |
   | escrever `mesas/mesa/jogadores/inventario` como membro | passa |
   | escrever `mesas/mesa/jogadores/inventario` sem login | **falha** |
   | ler `mesas/mesa/membros` sem login | **falha** |

5. Menu lateral: **Criação → Authentication** → **Vamos começar** → aba
   **Método de login**:
   - ative **Google** (é só escolher um nome público e um e-mail de suporte). É
     por ele que **todo mundo** entra na aba 🎲 Mesa — mestre e jogadores, um
     caminho só;
   - ative também **E-mail/senha** e, na aba **Usuários** → **Adicionar usuário**,
     crie um usuário de mestre (e-mail + uma senha boa). Ele é o seu paraquedas:
     é o único login que funciona com o `index.html` aberto **do disco**
     (`file://`), onde o popup do Google não abre. Cadastre os DOIS `uid` como
     mestre na aba e você entra por qualquer um dos dois.
   - Ainda em Authentication, aba **Settings (Configurações) → Domínios
     autorizados**: confira que o endereço onde o site está publicado está na lista
     (algo como `SEU-USUARIO.github.io`). Sem isso o login dos jogadores devolve
     "este endereço não está autorizado". O `localhost` já vem autorizado.
6. Engrenagem ⚙ (canto superior esquerdo) → **Configurações do projeto** → seção
   **Seus aplicativos** → ícone **`</>` (Web)** → apelido `grifos` → registrar.
   O console mostra um bloco `const firebaseConfig = { ... }`.
7. Abra **`js/firebase-config.js`** neste projeto e troque o `null` pelos valores
   mostrados (o exemplo no próprio arquivo mostra o formato). Salve.

   > ⚠ Confira se o objeto tem a linha `databaseURL` — se o console não mostrar,
   > copie a URL que aparece no topo do Realtime Database
   > (algo como `https://grifos-alados-default-rtdb.firebaseio.com`).

## Parte 2 — Publicar o site no GitHub Pages (~5 min)

1. Suba o projeto para um repositório no GitHub (pode ser público — os seus DADOS
   não vão para o repositório, eles ficam no Firebase; só o "programa" do site é público).
2. No repositório: **Settings → Pages → Source: Deploy from a branch** →
   branch `main`, pasta `/ (root)` → **Save**.
3. Em ~1 minuto o site fica em `https://SEU-USUARIO.github.io/NOME-DO-REPO/`.

> Alternativa sem GitHub: <https://app.netlify.com/drop> — arraste a pasta do projeto
> e pronto (mas aí cada atualização do site é um novo arrastar).

## Parte 3 — Usar no dia a dia

- **Você (mestre)**: abra o site publicado (`…/index.html`), clique no botão
  redondo **📡** no canto inferior direito, entre com o e-mail/senha de mestre e
  escolha o nome da **sala** (padrão: `mesa`). Pronto — a partir daí, toda mudança
  na Loja exibida, nas Bases e nas Viagens é transmitida sozinha (o botão fica
  com aro verde). "📤 Enviar agora" força um envio completo.
- **Jogadores**: recebem o link `…/jogadores.html?sala=mesa`. A página mostra um
  selinho no rodapé ("mesa atualizada às HH:MM") e se atualiza sozinha. **Para
  ver, não precisam de login nenhum.**
- **Jogadores, para ESCREVER**: no mesmo selinho do rodapé há o botão
  **🔑 Entrar com o Google**. Enquanto ninguém entra, as caixas que são deles
  ficam travadas, com um selo "🔒 entre para escrever"; depois de entrar, o
  selinho passa a dizer *"✍ escrevendo como fulano@gmail.com"* e elas abrem, com
  a barra de formatação e tudo. Quem entra com uma conta que **ainda não é da
  mesa** vê "🔒 você ainda não está nesta mesa" e um botão que leva à aba
  🎲 **Mesa**, onde pede para entrar; o mestre aprova por lá e a caixa abre
  sozinha, sem recarregar. O login fica guardado no navegador: é uma vez por
  aparelho.
- Continue preparando o jogo **onde quiser** (inclusive offline) — a transmissão
  só acontece quando você está no site publicado, logado no 📡.

## O que os jogadores veem (e o que não veem)

| Veem | Não veem |
|---|---|
| 🏪 Loja exibida: itens, encantamentos, pergaminhos, caixa e classificação da comunidade | 🎲 Gerar nova loja, ajustes de geração, histórico de lojas |
| 🐎 Viagens: ritmo, progresso, diário, paradas (o diário e as paradas eles **editam** — ver abaixo) | O que estiver marcado 🙈, botões de editar/rolar/apagar |
| 🏰 Bases: porte, cômodos, mobílias, cálculos, residentes, inventário (estes dois eles **editam** — ver abaixo) | Bases marcadas 🙈, backup/importar |
| 📚 Consultas completas (regras, guias, culinária…) | 📰 Notícias, ⚔ Combates, 🎁 Recompensas, 📜 Anotações, 📖 Fichas, ⏳ Tempo |

## 👁 / 🙈 — o que guardar só para você

Nas abas **Bases** e **Viagem**, cada item tem um botãozinho 👁 no cabeçalho.
Clicando nele o item vira 🙈 **"Só o mestre vê"**: ganha borda tracejada
avermelhada na sua tela e **não é transmitido** — não é só sumir do site deles,
o conteúdo nunca chega ao banco de dados que a página deles lê.

Dá para esconder:

| Aba | O que dá para esconder |
|---|---|
| 🏰 Bases | uma base inteira |
| 🐎 Viagem | uma viagem inteira, **cada linha do diário** e **cada parada narrada**, uma a uma |

Tudo nasce 👁 (visível). É esse detalhe que faz o "prepare antes, revele na
hora": você escreve `⚔ Assalto — bandidos na ponte` no diário, clica no 👁 para
deixar a linha 🙈, joga a cena, e quando o combate acontece clica de novo — a
linha aparece na tela deles em segundos. Uma parada narrada funciona igual:
deixe o santuário 🙈 até o grupo chegar lá.

**Atenção**: o que estiver 👁 nas Viagens e nas Bases fica visível aos jogadores —
segredos que você nem quer arriscar é melhor guardar nas Anotações/Combates,
que não são transmitidos de jeito nenhum.

## O que os jogadores editam

Fora estas caixas, a página deles é só de leitura — e mesmo estas só abrem
**depois de entrar com o Google** e de o mestre aprovar o pedido na aba 🎲 Mesa:

| Aba | Caixa | Quem escreve | Onde fica guardado |
|---|---|---|---|
| 🏰 Bases | 📝 Inventário dos jogadores | só eles (você vê e pode limpar) | só no `jogadores/inventario` — nunca entra no seu arquivo |
| 🏰 Bases | 🧑‍🤝‍🧑 Residentes | você **e** eles | o seu arquivo de Bases (backup e export `.txt` inclusos) |
| 🏰 Bases | 🎒 Inventário da base | você **e** eles | idem |
| 🐎 Viagem | 📜 cada linha do diário **revelada** | você **e** eles | o seu arquivo de Viagens (backup e export `.txt` inclusos) |
| 🐎 Viagem | ⛩ o texto de cada parada **revelada** | você **e** eles | idem |

Nas caixas das Bases eles têm a barra completa de formatação (grifos coloridos,
▣ caixa de leitura, **Ctrl+B** / **Ctrl+I**); nas da Viagem, os mesmos atalhos de
teclado — só o 📖 Descrição é seu. O **nome** da parada, os atalhos do diário
(🌧 Chuva, ⚔ Assalto…), o ＋ Parada e os ✕ continuam só seus: eles escrevem
dentro das caixas que já existem, não criam nem apagam.

Como funciona: quando um jogador escreve, a edição vai para o
`jogadores/inventario` e aparece na hora na tela dele e na dos outros. Assim que
o seu `index.html` estiver aberto e conectado, ele **absorve** essa edição para o
seu arquivo e reenvia para todos. A partir daí é um campo seu como qualquer
outro. Item 🙈 não aparece para eles, então também não tem como ser escrito.

> ⚠ **Não há travas nem histórico**: vale o último que escreveu, e eles podem
> apagar o que você tinha escrito nessas caixas. Se você editar uma delas
> depois, a sua versão vence. Se preferir que uma das caixas das Bases volte a
> ser só sua, é uma linha em `js/bases.js` (a lista `CAMPOS_JOGADOR`).
>
> O que a lista de membros garante é **quem** pode escrever: são as pessoas da
> sua mesa, não "quem tiver o link". Entre elas, continua sendo confiança —
> qualquer uma pode apagar o que a outra escreveu.

### Tirar alguém da mesa

Na aba 🎲 **Mesa**, em "Quem está na mesa", botão **tirar da mesa**. Vale na
hora, sem console e sem trocar o link: a próxima tecla que ela digitar já vai ser
recusada pelo banco. Ler ela continua podendo, como qualquer um com o link.

## Problemas comuns

- **Botão 📡 diz "falta configurar"** → `js/firebase-config.js` ainda está `null`.
- **"permission denied" ao transmitir** → o e-mail nas REGRAS (parte 1.4) não é
  exatamente o mesmo do usuário criado (parte 1.5), ou você não está logado.
- **Jogadores veem "sem permissão para ler"** → as regras não foram publicadas, ou o
  `".read": true` foi alterado.
- **"🔒 entre para escrever" nas caixas deles** → é o normal antes do login:
  clicar no **🔑 Entrar com o Google** do selinho do rodapé resolve.
- **"você ainda não está nesta mesa"** → é o normal antes de ser aprovado. A
  pessoa clica no botão, cai na aba 🎲 Mesa e pede para entrar; você aprova lá,
  e a caixa dela abre sozinha. Se o pedido não aparecer para você, confira se
  vocês dois estão na **mesma sala** (o `?sala=` do link dela e a mesa aberta na
  sua aba).
- **"o navegador bloqueou a janela do Google"** → o pop-up do login foi barrado;
  liberar pop-ups para o endereço do site e clicar de novo.
- **"este endereço não está autorizado no Firebase"** → falta o domínio publicado
  em **Authentication → Settings → Domínios autorizados** (parte 1.5).
- **"o login com o Google ainda não foi ligado"** → falta ativar o provedor
  **Google** em Authentication → Método de login (parte 1.5).
- **Página dos jogadores não atualiza** → confira se o selinho do rodapé mostra a
  sala certa (o `?sala=…` do link deles precisa ser igual à sala do seu 📡).
- **Sem internet** → tudo continua funcionando localmente; a transmissão volta
  sozinha quando a conexão voltar (clique em "📤 Enviar agora" para garantir).
