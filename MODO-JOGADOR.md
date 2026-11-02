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
   lá e cole **o conteúdo de `firebase-rules.json`** — ele é a cópia fiel
   das regras que estão no ar, e passa no `JSON.parse` como está.

   > 📌 **A cópia das regras vive em um arquivo só**, desde 02/11/2026:
   > `firebase-rules.json`. Antes ela estava escrita aqui DENTRO, e o
   > resultado foi o previsível — este arquivo ficou para trás (ainda falava do
   > paraquedas de um e-mail que já tinha saído do ar). Quem precisa comparar
   > com o console abre o JSON; quem precisa entender POR QUE cada linha é
   > assim lê o `docs/regras-firebase.md` — que é caderno de bordo e fica só no
   > disco de quem mantém o projeto, não no GitHub.

   → **Publicar**.

   **Como ler isto.** Quem pode o quê não está escrito na regra: está no banco,
   em `mesas/<sala>/membros/<uid>` e no campo `dono`. A regra só pergunta ao
   banco. **Há dono de cada mesa** — quem a criou — e, desde 02/11/2026, **há um
   dono do site**: um uid escrito nas regras, que lê as listas de `campanhas` e
   `mesas`, carimba a vitrine da gazeta e apaga abuso. É tudo o que ele pode a
   mais; de resto, mesa de cada um é de cada um.

   | Nó | Quem lê | Quem escreve |
   |---|---|---|
   | `dados` (loja, viagens, bases), `meta` | qualquer um com o link | o mestre da mesa |
   | `fichas/<uid>` | **o dono dela e o mestre** — mais ninguém | o dono e o mestre |
   | `jogadores/inventario` | qualquer um com o link | **membros da mesa** |
   | `nome`, `campanhaId`, `entradaLivre`, `dono` | qualquer um | o mestre da mesa |
   | `membros` | membros (e cada um sempre lê o próprio) | o mestre; e o próprio, entrando numa mesa de porta aberta |
   | `pedidos` | o mestre (e cada um o seu) | quem pede, e o mestre |
   | `campanhas/<id>` | **qualquer um que tenha o id** (é o link da gazeta) | quem criou aquela campanha |
   | `campanhas` (a LISTA) | **só o dono do site** — não dá para enumerar as gazetas | ninguém |
   | `gazeta/publicas` | **qualquer um**, sem login (é a vitrine) | **só o dono do site** |
   | `usuarios/<uid>/campanhas` | só a própria conta | só a própria conta |

   > 📰 **`campanhas` é a gazeta ao vivo** (desde 10/09/2026), e desde
   > **02/11/2026 ela nasce OCULTA**. Cada campanha guarda as próprias notícias
   > em `campanhas/<id>/noticias`; **quem tem o id lê a gazeta inteira, sem
   > login** — é esse o link que o mestre manda aos jogadores dele
   > (`?gazeta=<id>`) — mas **a LISTA das campanhas não é pública**, então
   > ninguém descobre a gazeta de quem não lhe deu o link. O que todo visitante
   > baixa ao abrir o site é `gazeta/publicas`: a **vitrine**, um nome e um
   > autor por campanha, escrita só pelo dono do site no 🛡 Painel do dono. O
   > corpo de uma gazeta só desce quando a aba dela é aberta.
   >
   > Isso mudou porque o site foi divulgado no Reddit. O desenho anterior
   > (`campanhas` inteira de leitura pública, todas as campanhas na tela de
   > todo mundo) fazia duas coisas ruins: qualquer pessoa logada publicava na
   > gazeta que todos veem, e **cada visitante baixava todas as gazetas do banco
   > a cada F5**.
   > **Enquanto este bloco não for publicado, a gazeta continua funcionando** —
   > ela cai no `js/noticias-data.js` do repositório, e só o mestre, editando,
   > vê o aviso de que o banco recusou.

   > 📖 **`fichas` é o único nó da mesa que não é público.** A loja, a gazeta e
   > as bases são de leitura aberta a quem tem o link — a ficha de alguém não
   > é. A regra dá leitura ao **dono dela** e ao **mestre/auxiliar**, e só: um
   > jogador não lê a ficha do outro nem sabendo o `uid` dele, porque o pedido
   > nunca chega ao banco. Escrever, idem — o dono escreve a sua, e o mestre
   > escreve todas (é o que deixa ele baixar o PV no meio do combate).

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
   > ⚠ **Há UM nome próprio nas regras**: o uid do dono do site, em
   > `campanhas/.read`, `mesas/.read`, `gazeta/publicas/.write` e no `||` que
   > deixa apagar abuso. Quem for usar este projeto em outro Firebase troca esse
   > uid pelo seu nos quatro lugares (e no `ADMIN_UID` de `js/noticias-mesa.js`
   > e `js/painel-dono.js`) — ou apaga as quatro linhas, e fica sem painel. O
   > paraquedas antigo, o e-mail `mestret20@gmail.com` em `dados` e `meta`, **já
   > saiu do ar**: este arquivo é que ficou falando dele.
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
   | ler `campanhas/penitencia-de-azgher` sem login | passa (é o link da gazeta) |
   | ler `campanhas` sem login | **falha** (não dá para listar as gazetas) |
   | ler `campanhas` como o dono do site | passa |
   | ler `gazeta/publicas` sem login | passa (é a vitrine) |
   | escrever `gazeta/publicas/x` como qualquer pessoa logada | **falha** |
   | escrever `gazeta/publicas/x` como o dono do site | passa |
   | criar `campanhas/nova` com `dono` = o próprio uid | passa |
   | escrever `campanhas/<de outra pessoa>/nome` | **falha** |
   | apagar `campanhas/<de outra pessoa>` como o dono do site | passa |

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

## 🙈 Rolagens escondidas (o mestre e o auxiliar)

No painel **🎲 Rolagens**, o **👁** do cabeçalho vira **🙈**: a partir daí o que você
rola — no painel, no ⚔ Combates ou numa ficha — **não vai para a mesa**. Fica só no
seu painel, tracejado, com um **👁 revelar** em cada uma; revelar manda a rolagem para
todo mundo naquela hora, com o horário em que ela foi rolada. Clicar no 🙈 volta a
mostrar as próximas (e as que ficaram escondidas continuam lá, para revelar depois).

- Não é esconder só na tela: a rolagem **não sai deste aparelho** — o jogador não tem
  como ver o que nunca chegou ao banco.
- Por isso mesmo, a escondida aparece **só no aparelho em que foi rolada**: o
  auxiliar não vê a sua, e o seu celular não vê a do computador.
- Não precisa mexer nas regras do Firebase.

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
- **📡 âmbar e "⚠ Parte da transmissão está pausada"** → o banco da campanha tem uma
  versão da Loja, das Bases ou das Viagens que **não saiu deste navegador**: foi
  publicada de outro navegador, de outro aparelho ou do site aberto de outro endereço
  (o `index.html` do computador e o site publicado não dividem o que guardam, mas
  dividem o banco). Nada é mandado por cima sozinho. Se a certa é a daqui,
  **📤 Mandar a daqui por cima**; se é a de lá, **Agora não** — e continue no navegador
  onde ela está.
- **"⚠ Esta ficha está diferente da da mesa" (ou "da sua conta")** → a ficha mudou
  aqui e lá desde a última vez que este navegador conversou com o banco. Nada dela
  sobe nem desce até alguém escolher, e a versão que perder fica guardada neste
  navegador, com um **↩ Voltar para ela**.
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
  sala certa (o `?sala=…` do link deles precisa ser igual à campanha aberta na sua
  aba). Desde 13/10/2026 a campanha do mestre está no **endereço** dele também:
  `index.html?mesa=<campanha>`. O `index.html` pelado é a **bancada** — o 📡 fica
  cinza e tracejado e não transmite nada, de propósito.
- **"🔗 Falta a sala no link"** no selinho deles → o link que circulou perdeu o
  `?sala=…`. Antes disso, um link sem sala caía numa campanha chamada `mesa`, que é
  a campanha de alguém — por isso agora ele reclama em vez de entrar.
- **Sem internet** → tudo continua funcionando localmente; a transmissão volta
  sozinha quando a conexão voltar (clique em "📤 Enviar agora" para garantir).
