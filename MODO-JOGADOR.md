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
4. Ainda no Realtime Database, abra a aba **Regras (Rules)**, apague o que estiver lá
   e cole isto — trocando `SEU-EMAIL@AQUI.com` pelo seu (o mesmo do passo 5) e
   `JOGADOR1@gmail.com`, `JOGADOR2@gmail.com`… pelos **Gmails dos seus jogadores**:

   ```json
   {
     "rules": {
       "mesas": {
         "$sala": {
           ".read": true,
           ".write": "auth != null && auth.token.email === 'SEU-EMAIL@AQUI.com'",
           "jogadores": {
             "inventario": {
               ".write": "auth != null && auth.token.email_verified && (auth.token.email === 'SEU-EMAIL@AQUI.com' || auth.token.email === 'JOGADOR1@gmail.com' || auth.token.email === 'JOGADOR2@gmail.com')"
             }
           }
         }
       }
     }
   }
   ```

   → **Publicar**. (Tradução: qualquer um com o link **lê** tudo — isso é de
   propósito, para o link continuar servindo de "abriu, está na mesa". Só você,
   logado, **escreve** na mesa; e em `jogadores/inventario` escrevem **você e as
   contas Google que estão nessa lista**, mais ninguém. É o único ponto de escrita
   deles, de propósito: por ele passam a caixa "📝 Inventário dos jogadores", as
   edições que eles fazem em **Residentes** e **Inventário da base** e as do
   **diário** e das **paradas** de uma viagem — ver "O que os jogadores editam",
   abaixo.)

   > A linha do `.write` é comprida e sem quebras **de propósito**: quebrar uma
   > linha no meio do texto entre aspas faz o console recusar as regras. Para
   > acrescentar um jogador depois, é só somar mais um
   > `|| auth.token.email === 'NOVO@gmail.com'` e publicar de novo.
   >
   > **Teste antes de fechar o console:** no botão **Simulador de regras**, faça
   > uma escrita em `mesas/mesa/jogadores/inventario` autenticada com um e-mail
   > da lista (tem de passar) e com um de fora (tem de falhar).
5. Menu lateral: **Criação → Authentication** → **Vamos começar** → aba
   **Método de login**:
   - ative **E-mail/senha** e, na aba **Usuários** → **Adicionar usuário**, crie o
     SEU usuário de mestre (e-mail + uma senha boa). O mestre entra por aqui, e não
     pelo Google, porque o login do Google exige domínio autorizado e **falha se
     você abrir o `index.html` direto do disco** (`file://`);
   - ative também **Google** (é só escolher um nome público e um e-mail de
     suporte). É por ele que os **jogadores** entram para escrever.
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
  a barra de formatação e tudo. Quem entrar com uma conta que **não está na lista
  das regras** (parte 1.4) recebe, na hora em que tentar escrever, um recado
  dizendo para pedir ao mestre — o banco recusa, e a página conta isso em vez de
  fingir que salvou. O login fica guardado no navegador: é uma vez por aparelho.
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
**depois de entrar com o Google** (parte 3), com a conta na lista das regras:

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
> O que a lista de e-mails garante é **quem** pode escrever: são as pessoas da
> sua mesa, não "quem tiver o link". Entre elas, continua sendo confiança —
> qualquer uma pode apagar o que a outra escreveu.

### Tirar alguém da mesa

Apague o `|| auth.token.email === '…'` daquela pessoa nas regras (parte 1.4) e
publique. Vale na hora, sem precisar mexer no site nem trocar o link: a próxima
tecla que ela digitar já vai ser recusada pelo banco. Ler ela continua podendo,
como qualquer um com o link.

## Problemas comuns

- **Botão 📡 diz "falta configurar"** → `js/firebase-config.js` ainda está `null`.
- **"permission denied" ao transmitir** → o e-mail nas REGRAS (parte 1.4) não é
  exatamente o mesmo do usuário criado (parte 1.5), ou você não está logado.
- **Jogadores veem "sem permissão para ler"** → as regras não foram publicadas, ou o
  `".read": true` foi alterado.
- **"🔒 entre para escrever" nas caixas deles** → é o normal antes do login:
  clicar no **🔑 Entrar com o Google** do selinho do rodapé resolve.
- **"fulano@gmail.com não está nesta mesa"** → esse e-mail não está na lista da
  regra (parte 1.4). Acrescente `|| auth.token.email === 'fulano@gmail.com'`,
  publique, e peça para a pessoa **recarregar a página**. Confira também se ela
  entrou com a conta certa (o botão "trocar de conta" troca).
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
