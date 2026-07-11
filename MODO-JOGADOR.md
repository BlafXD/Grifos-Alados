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
   e cole isto (troque o e-mail pelo SEU, o mesmo do passo 5):

   ```json
   {
     "rules": {
       "mesas": {
         "$sala": {
           ".read": true,
           ".write": "auth != null && auth.token.email === 'SEU-EMAIL@AQUI.com'"
         }
       }
     }
   }
   ```

   → **Publicar**. (Tradução: qualquer um com o link **lê**; só você, logado, **escreve**.)
5. Menu lateral: **Criação → Authentication** → **Vamos começar** → aba
   **Método de login** → ative **E-mail/senha**. Depois, na aba **Usuários** →
   **Adicionar usuário** → crie o SEU usuário de mestre (e-mail + uma senha boa).
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
  selinho no rodapé ("mesa atualizada às HH:MM") e se atualiza sozinha.
- Continue preparando o jogo **onde quiser** (inclusive offline) — a transmissão
  só acontece quando você está no site publicado, logado no 📡.

## O que os jogadores veem (e o que não veem)

| Veem | Não veem |
|---|---|
| 🏪 Loja exibida: itens, encantamentos, pergaminhos, caixa e classificação da comunidade | 🎲 Gerar nova loja, ajustes de geração, histórico de lojas |
| 🐎 Viagens: ritmo, progresso, diário, paradas | Botões de editar/rolar/apagar |
| 🏰 Bases: porte, cômodos, mobílias, cálculos, residentes, inventário | Backup/importar |
| 📚 Consultas completas (regras, guias, culinária…) | 📰 Notícias, ⚔ Combates, 🎁 Recompensas, 📜 Anotações, 📖 Fichas, ⏳ Tempo |

**Atenção**: o que estiver escrito nas Viagens e nas Bases fica visível aos jogadores —
segredos de mestre é melhor guardar nas Anotações/Combates, que não são transmitidos.

## Problemas comuns

- **Botão 📡 diz "falta configurar"** → `js/firebase-config.js` ainda está `null`.
- **"permission denied" ao transmitir** → o e-mail nas REGRAS (parte 1.4) não é
  exatamente o mesmo do usuário criado (parte 1.5), ou você não está logado.
- **Jogadores veem "sem permissão para ler"** → as regras não foram publicadas, ou o
  `".read": true` foi alterado.
- **Página dos jogadores não atualiza** → confira se o selinho do rodapé mostra a
  sala certa (o `?sala=…` do link deles precisa ser igual à sala do seu 📡).
- **Sem internet** → tudo continua funcionando localmente; a transmissão volta
  sozinha quando a conexão voltar (clique em "📤 Enviar agora" para garantir).
