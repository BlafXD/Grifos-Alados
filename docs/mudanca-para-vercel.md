# A mudança para a Vercel — roteiro, riscos e a mala

**Aberto em 18 de setembro de 2026.** Decisão dele: tirar o site do GitHub Pages e
pôr na Vercel; **sem** funcionalidade paga, e **com** um botão de apoio voluntário
no lugar da assinatura (ver §6).

---

## 0. O domínio: você NÃO precisa comprar nada

Isto desfaz o susto dos preços em dólar:

- **`grifos-alados.vercel.app` é de graça e é para sempre.** Todo projeto na Vercel
  ganha um endereço `.vercel.app` sem custo nenhum, sem cartão, sem prazo. É um
  endereço definitivo, não um teste.
- **A Vercel não cobra para LIGAR um domínio próprio.** O que você viu caro é a
  Vercel *revendendo registro de domínio*. Ninguém é obrigado a comprar dela: um
  `.com.br` no **Registro.br** custa na casa dos R$ 40 por ano (confira o valor
  atual), e apontá-lo para a Vercel é de graça.
- **Portanto: vá de `.vercel.app` agora.** Se um dia o nome próprio importar, ele
  entra no MESMO projeto, sem refazer nada.

> ⚠ **O que custa não é o domínio — é trocar de endereço.** Cada endereço tem a sua
> própria gaveta no navegador (`localStorage` e `IndexedDB`). Mudar de endereço é
> mudança de casa: a mobília não vai sozinha. Por isso, **escolha UM endereço e use
> só ele nos links.** Hoje, com pouca gente, o custo da mudança é baixo — daqui a um
> ano, com a mesa cheia, é alto. É o melhor momento para mudar.

---

## 1. O que eu já fiz (feito em 18/09/2026)

### 1.1 O backup do mestre está tirado e conferido

Peguei a gaveta do site publicado (`https://blafxd.github.io`) direto do navegador dele:

```
C:\Users\caiqu\Desktop\Backups Grifos Alados\2026-09-18\
    grifos-alados-backup-mestre-2026-09-18.json     (1,5 MB)
```

Guardado **fora do repositório**, de propósito: dentro dele, um `git clean -xdf`
levaria junto. Conferido abrindo o JSON e contando o que tem dentro:

| O quê | Quanto |
|---|---|
| Chaves `grifosAlados.*` | 32 (e mais 6 de outros projetos que moram no mesmo `github.io`) |
| Bestiário e combates | 5 sessões |
| Mapa / linha do tempo | 40 nós |
| Anotações | 2 ramos |
| Fichas de personagem | 1 |
| Bases · Viagens | 1 · 1 |
| Lojas roladas | 5 no histórico |
| Sala do 📡 | `nuevosol` |
| Fichas em PDF (IndexedDB) | **nenhuma** — a gaveta dele não tem PDF importado |

### 1.2 A `mudanca.html` — a mala

Página nova na raiz do projeto. É **solta de propósito**: não carrega nenhum `js/`
do site, então funciona em qualquer endereço, inclusive num que ainda não subiu.

Faz três coisas:

1. **Diz em que gaveta você está** (mostra o endereço, em letras grandes) e lista o
   que tem guardado nela, com nome de gente — "Bestiário e combates", não
   `grifosAlados.monstros`.
2. **📥 Baixar a mala**: um `.json` só com **tudo** — o `localStorage` inteiro *e* as
   fichas em PDF do `IndexedDB` (convertidas em base64, em pedaços de 8 KB, porque
   um PDF inteiro de uma vez estoura a pilha do `apply()`).
3. **Abrir a mala no endereço novo**: escolhe o arquivo, **mostra a prévia antes de
   mexer em nada** (quantos itens não existem aqui, quantos já são idênticos, quais
   existem e estão *diferentes*) e só então oferece dois botões:
   **📦 Trazer só o que falta** (não encosta no que já existe) e
   **⚠ Trazer tudo por cima**.

Ela substitui os 9 botões de "Backup (.json)" espalhados pelas abas — que continuam
lá, e continuam servindo para backup de uma aba só.

### 1.3 Testada de ponta a ponta, não só "abre"

Servi o projeto em `http://127.0.0.1:8765` — que é uma **gaveta vazia de verdade**,
ou seja, o mesmo que o endereço novo será:

1. A página detectou a gaveta vazia e mandou ir direto ao passo 3. ✓
2. Carreguei a mala real do mestre: a prévia leu "22 itens que não existem aqui". ✓
3. "Trazer só o que falta" → **38 itens restaurados**. ✓
4. Abri o `index.html` nessa origem: **bestiário com as 5 sessões, a ficha no lugar,
   zero erros no console**, e o 📡 corretamente **desconectado** (sem login naquela
   origem, ele não transmite — nenhum risco de mandar por cima). ✓
5. **Limpei a gaveta de teste do `127.0.0.1`** (`localStorage.clear()` + apagar o
   `IndexedDB`) e apaguei o arquivo de teste. Deixar uma cópia velha num segundo
   endereço é exatamente o que causou o incidente de 15/09 — ver §20 de
   `docs/mesa-de-verdade.md`.

---

## 2. Os passos, na ordem, para você

**Antes de qualquer coisa:** o backup do §1.1 já está tirado. Se você mexer no site
entre hoje e o dia da mudança, tire outro pela `mudanca.html`.

### Passo 1 — Subir a `mudanca.html` para o ar ANTES de tudo

`git push` com este commit. A página precisa existir **no endereço velho** para
todo mundo fazer a mala de lá: `https://blafxd.github.io/Grifos-Alados/mudanca.html`

### Passo 2 — Criar o projeto na Vercel

1. <https://vercel.com> → entrar com o GitHub.
2. **Add New → Project** → escolher o repositório `Grifos-Alados`.
3. **Framework Preset: `Other`** · Build Command: *vazio* · Output Directory: `./`
   — não há build, não há `package.json`, não há nada para compilar.
4. **Deploy.** Em menos de um minuto o site está em `grifos-alados.vercel.app`.

> Nada no código precisa mudar. Eu conferi: **zero URLs fixas** (`blafxd`,
> `github.io`, `Grifos-Alados`) e **zero caminhos absolutos** em `src=`/`href=` no
> projeto inteiro. São 139 arquivos, 8,3 MiB.

### Passo 3 — O item que quebra TUDO se esquecido

**Firebase → Authentication → Settings → Authorized domains → Add domain →
`grifos-alados.vercel.app`**

Sem isso, **todo login com o Google falha** (`auth/unauthorized-domain`) — o seu, o
do Hadson e o dos jogadores. O 📡 não entra, a ficha não sobe, ninguém escreve nada.
É um campo de texto e leva dez segundos; é o único item verdadeiramente obrigatório.

Deixe `blafxd.github.io` na lista também, enquanto os dois endereços conviverem.

### Passo 4 — Trazer as suas coisas

1. Abra `blafxd.github.io/Grifos-Alados/mudanca.html` → **📥 Baixar a mala**.
2. Abra `grifos-alados.vercel.app/mudanca.html` → escolha o arquivo →
   **📦 Trazer só o que falta**.
3. Abra o site novo e confira: bestiário, anotações, mapa, bases.
4. **Só então** clique no 📡 e entre com o Google.

> ⚠ **A hora de mais risco é o primeiro 📡 no endereço novo.** A trava de 15/09 vai
> ver que este navegador nunca conversou com o banco e vai **pausar em âmbar** em vez
> de publicar — é o certo. **Não clique em "📤 Mandar a daqui por cima" antes de
> conferir que a Loja, as Bases e as Viagens já estão na tela.** Se estiverem, mandar
> por cima é seguro. Se a tela estiver vazia, mandar por cima **apaga a mesa dos
> jogadores**.

### Passo 5 — Os dois endereços convivendo (um mês)

**Não desligue o GitHub Pages no mesmo dia.** Todo link `?sala=` que você já entregou
aponta para lá. Deixe os dois no ar por umas semanas e, no endereço velho, ponha um
aviso no topo do `index.html` e do `jogadores.html`:

> 📦 **O Grifos Alados mudou de casa:** <https://grifos-alados.vercel.app>
> Antes de mudar, passe na 🧳 [mudanca.html](mudanca.html) para levar as suas coisas.

Quando ninguém mais aparecer no endereço velho, desligue o Pages (Settings → Pages →
Source: None) e atualize os links do `README.md`.

---

## 3. O que o HADSON precisa fazer

Ele é o mestre da Penitência de Azgher e tem a **gaveta dele**, com as coisas dele —
nada do que está no seu backup é dele.

1. **Mala, no navegador dele**: abrir `blafxd.github.io/Grifos-Alados/mudanca.html`
   → 📥 Baixar a mala → guardar o arquivo.
2. Abrir `grifos-alados.vercel.app/mudanca.html` → 📦 Trazer só o que falta.
3. Entrar no 📡 com o Google **só depois** de conferir que as coisas dele estão na tela.
4. **Se ele mestra de mais de um computador** (o de casa e o notebook, por exemplo):
   cada um é uma gaveta. Ou faz a mala nos dois, ou escolhe **um** para ser o oficial
   e usa só ele para transmitir.

E as duas pendências que já estavam abertas antes desta conversa, e que continuam
sendo dele:

- A sala **`mesa`** (Penitência) está **órfã** — sem `dono`. Basta ele abrir o
  `index.html` e virar mestre dela.
- A **gazeta da Penitência** está no seu nome: você faz "✕ Tirar do ar", ele faz
  "📡 Publicar esta gazeta".

---

## 4. O que os JOGADORES precisam fazer

### A boa notícia: quase nada

O que é **da mesa** mora no Firebase e **volta sozinho** no endereço novo, é só entrar
com a mesma conta do Google:

- ✅ a **ficha de personagem** — ela fica em `usuarios/<uid>/fichas`, a "gaveta da
  conta". No endereço novo ela aparece com o botão **"trazer"**;
- ✅ a Loja publicada, as Bases, as Viagens, a gazeta;
- ✅ o inventário do grupo, as rolagens, a iniciativa da mesa.

### O que NÃO volta sozinho, e o aviso que vale a pena mandar

- ❌ **As fichas em PDF importadas** (a aba 📖 Fichas). Vivem só no `IndexedDB`
  daquele navegador, não têm cópia em lugar nenhum e **somem** na mudança.
- ❌ As preferências do ⚙ Acessibilidade (tamanho de texto, contraste).
- ❌ A iniciativa local de quem mestra fora de mesa.

**Recado pronto para mandar no grupo:**

> 🦅 **O Grifos Alados mudou de endereço:** https://grifos-alados.vercel.app
>
> A sua **ficha de personagem volta sozinha** — é só entrar com o mesmo Google e
> clicar em "trazer". O link da mesa agora é
> `https://grifos-alados.vercel.app/jogadores.html?sala=NOME-DA-SALA`.
>
> **Só se você importou a sua ficha em PDF no site:** ela não vai sozinha. Antes de
> mudar, abra https://blafxd.github.io/Grifos-Alados/mudanca.html no MESMO celular/
> computador de sempre, clique em **📥 Baixar a mala**, guarde o arquivo; depois abra
> a mesma página no endereço novo e clique em **📦 Trazer só o que falta**. Leva um
> minuto. (Ou, mais simples: importe o PDF de novo lá.)

> 💡 Quem só **olha** a mesa (espectador, sem login e sem PDF importado) não precisa
> fazer nada: é trocar o link e pronto.

---

## 5. O que pode quebrar — a lista honesta

| O quê | Chance | O que fazer |
|---|---|---|
| **Login com Google morre em todo mundo** | **Alta**, se esquecer o Passo 3 | Domínio autorizado no Firebase. É o único item obrigatório. |
| Mestre publica navegador vazio por cima da mesa | Média, se apressar o 📡 | A trava de 15/09 já pausa em âmbar. Não clicar "mandar por cima" sem conferir a tela. |
| Links `?sala=` antigos param | Alta, se desligar o Pages cedo | Manter os dois no ar um mês, com aviso no endereço velho. |
| Fichas em PDF dos jogadores somem | Alta, e é irreversível | O recado do §4. É o único dado do projeto sem cópia em lugar nenhum. |
| O site em si não funcionar na Vercel | **Muito baixa** | Sem build, sem framework, sem caminho absoluto. Conferido. |
| `backend/server.py` não subir | Certa, e não importa | É Flask, é local, e a gazeta migrou para o Firebase em 10/09. |

---

## 6. O botão de apoio (no lugar da assinatura)

Decidido: **nada de funcionalidade paga**, e nada de conversa com a Jambô. No lugar,
um convite discreto.

**Por que isto é diferente de cobrar:** apoio voluntário, **sem contrapartida** — sem
"assinante vê mais", sem "apoiador tem aba extra" — não vende o conteúdo dos livros a
ninguém. É gorjeta, não é acesso. No minuto em que o apoio destrava alguma coisa, ele
vira venda, e a conversa muda inteira.

**O que fazer** (quando você quiser; não é parte da mudança):

1. Abrir conta num de: **Apoia.se**, **Ko-fi**, **Buy Me a Coffee** ou
   **Mercado Pago** (link de pagamento).
2. **Se for PIX, use uma chave ALEATÓRIA**, nunca CPF, telefone ou e-mail — chave
   pessoal num site público é dado pessoal exposto para sempre.
3. Me passar o link. Eu ponho um **☕ Apoiar** discreto no rodapé das duas páginas,
   com um texto honesto no lugar de promessa:

   > *Feito por uma pessoa só, de graça, por gosto. Tormenta 20 é da Jambô Editora —
   > este é um projeto de fã. Se o site te ajuda na mesa, você pode ajudar de volta.*

4. **Não prometa nada em troca.** Nem "acesso antecipado", nem "seu nome na gazeta",
   nem prioridade em pedido. A promessa é o que transforma doação em venda.

---

## 7. Quando estiver tudo no ar

- [ ] `README.md`: trocar os dois links (mestre e jogadores) para o endereço novo.
- [ ] `MODO-JOGADOR.md` Parte 2: o roteiro do GitHub Pages vira o da Vercel.
- [ ] Guardar o `.json` da mala num lugar fora do computador (Drive, pendrive).
- [ ] Desligar o Pages só depois de a mesa inteira ter migrado.
