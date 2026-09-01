# Revisão do projeto — Grifos Alados

**Data:** 4 de agosto de 2026
**Commit revisado:** `583c568` (main, sincronizado com `origin/main`)
**Escopo:** todo o repositório — 86 arquivos rastreados, 7,1 MB

---

## 0. Estado dos achados — conferido em 1º de setembro de 2026

> Este documento é um retrato de 4 de agosto. **Leia esta tabela antes do
> resto**: quatro dos seis achados já foram resolvidos, e a seção 4 continua
> descrevendo-os como se estivessem abertos. O que valia naquela data está
> preservado ali de propósito — o histórico é útil —, mas é aqui que se
> descobre o que ainda importa.

| Achado | Estado hoje |
|---|---|
| 4.1 · Sala do sync previsível | **ABERTO.** A sala padrão continua `mesa`. Não é código: é escolher um nome não adivinhável em `localStorage['grifosAlados.syncSala']` e passar `jogadores.html?sala=<nome>` para a mesa. |
| 4.2 · `backend/loja_completa.py` morto | **RESOLVIDO** — arquivo apagado. |
| 4.3 · 2,36 MB síncronos | **RESOLVIDO em parte.** Os `defer` estão em todos os scripts das duas páginas. O peso, porém, **cresceu**: veja o achado novo abaixo. |
| 4.4 · Falha silenciosa do `localStorage` | **RESOLVIDO.** Todo save passa por `GA_guardar` (`js/script.js`), que reconhece o erro de espaço e mostra uma tarja fixa. O único `setItem` cru que sobrou é o de dentro do próprio helper. |
| 4.5 · 10 melhorias com `p. ??` | **RESOLVIDO** — nenhuma ocorrência restante. |
| 4.6 · Campos sem rótulo | **RESOLVIDO.** Eram 34 no `index` e 23 no `jogadores`; hoje são **0 e 0**, medidos depois dos scripts rodarem. |

### Achados novos de 1º de setembro

**NOVO · MÉDIA — O peso da página triplicou: 2,36 MB → 7,65 MB.** O favicon
sozinho eram 2,31 MB (a arte de 1024 px servida como ícone de aba); isso foi
resolvido na mesma data com um `favicon.png` de 64 px e 9,5 KB. Restam **5,34
MB**, quase todos de dados de livro que entram inteiros no primeiro
carregamento — `fichas-ameacas-arton-data.js` sozinho tem 1,2 MB, e quem só
vai abrir a Loja paga por ele. O conserto de verdade é carregar os dados de
cada aba sob demanda; é reforma grande e segue sem urgência enquanto o uso
for local.

**NOVO · BAIXA — `data/magias.json` é cópia morta.** 434 KB que nenhum script
carrega (o site lê `js/magias-data.js`). Em 1º de setembro as 254 magias ainda
batiam byte a byte entre os dois. O risco é o dia em que não baterem, porque
nada avisa.

**NOVO · BAIXA — `README.md` e `README.txt` dizem a mesma coisa** em dois
formatos. Dois lugares para atualizar; um vai ficar para trás.

**NOVO · BAIXA — a pasta `Inútil/` não é versionada** (só o `.gitkeep`). É
decisão deliberada — é rascunho pessoal —, mas é lá que vivem as ferramentas
que leem os PDFs dos livros e os `.txt` extraídos deles. Se o disco morrer, o
caminho de importar um livro novo vai junto.

### O que foi medido de novo em 1º de setembro

| | |
|---|---|
| Erros de sintaxe | 0 / 71 arquivos JS |
| Erros ao carregar as duas páginas | 0 (nenhum `console.error`, nenhum `warn`) |
| Colisões no escopo global | 0 / 152 declarações |
| `<script>`/`<link>` apontando para arquivo inexistente | 0 |
| `console.log` esquecidos | 0 |
| Campos sem rótulo acessível | 0 / 117 (index) · 0 / 40 (jogadores) |
| Botões sem rótulo acessível | 0 / 384 (index) · 0 / 90 (jogadores) |
| Chaves de `localStorage` | 22 (eram 19) |
| `localStorage.setItem` fora do `GA_guardar` | 0 |

---

## 1. Sumário

O projeto está **saudável**. Não há erro de sintaxe, erro de carregamento,
arquivo quebrado nem inconsistência nas tabelas de dados. As duas páginas
(`index.html` e `jogadores.html`) sobem limpas, sem um único `console.error`.

Foram encontrados **6 achados**: 1 de prioridade alta (escrita sem autenticação
no sync), 3 médios e 2 baixos. Nenhum deles quebra o site hoje.

O ponto mais forte do projeto é a disciplina do código: 51 scripts clássicos
dividindo um único escopo global, com **zero colisões de nome** entre 150
declarações de topo. Isso não acontece por acaso.

| | |
|---|---|
| Erros de sintaxe | 0 / 53 arquivos JS |
| Erros no carregamento das páginas | 0 |
| `<script>` ou `<link>` apontando para arquivo inexistente | 0 |
| Colisões no escopo global | 0 / 150 declarações |
| Tabelas de rolagem íntegras | 17 / 17 |
| Itens sem descrição | 0 / 726 |
| `console.log` esquecidos | 0 |

---

## 2. Como foi verificado

Tudo aqui é medido, não estimado. Os métodos:

- **Sintaxe:** `node --check` em cada um dos 53 arquivos de `js/`.
- **Carregamento real:** as duas páginas montadas no jsdom, com os 51 (e 42)
  scripts locais executados na ordem exata das tags `<script>`, capturando
  exceções e `console.error`.
- **Colisões globais:** extração de toda declaração `const/let/var/function/class`
  na coluna 0 de cada arquivo, cruzando os nomes entre arquivos.
- **Integridade das tabelas:** verificação de que as faixas de `max` são
  crescentes, sem duplicata e terminando no valor certo do dado (100, 90 ou 120).
- **Segurança:** injeção de 5 cargas de XSS em `GA_esc` e 8 em `GA_limparHtml`,
  conferindo o DOM resultante e se algum script chegou a executar.
- **Peso:** soma dos bytes de todo recurso referenciado pelo `index.html`.

**O que NÃO foi verificado:** as regras do Firebase Realtime Database (vivem no
console do Firebase, não no repositório); a correção das regras de Tormenta20
além das tabelas que foram tocadas; e a aparência real em navegador — nada aqui
substitui abrir o site e olhar.

---

## 3. O que está bem

**Arquitetura.** Sem build, sem framework, sem dependência de CDN para o
essencial. Fontes embutidas em `fonts/`. O site abre do disco e funciona. Para
uma ferramenta de mesa que precisa rodar num notebook sem internet, essa é a
escolha certa — e ela foi mantida com consistência.

**Separação dados/lógica.** O padrão `X-data.js` (dados) + `X.js` (renderização)
se repete em 14 abas. Facilita achar e editar conteúdo sem tocar em código.

**Sanitização.** `GA_limparHtml` é uma allowlist de verdade. Nas 8 cargas
testadas — `<script>`, `<img onerror>`, `<svg onload>`, `<iframe>`,
`href="javascript:"`, `onclick` inline, `<form>/<input>` e `style` com
`javascript:` — **nenhuma sobreviveu**, e `<b>`, `<i>` e `<br>` legítimos
passaram intactos. Nenhum script chegou a executar.

**Higiene.** Zero `console.log` esquecido (37 `console.warn` e 17
`console.error`, todos deliberados). Todas as 25 chamadas de
`localStorage.setItem` estão dentro de `try/catch`. Um único `TODO` real no
código inteiro.

**Comentários.** Os cabeçalhos explicam *por que*, não *o que* — inclusive
decisões de regra ("os preços são cumulativos", "munição paga metade"). É o tipo
de comentário que ainda vale daqui a um ano.

---

## 4. Achados

### 4.1 — ALTA · Jogadores escrevem no banco sem autenticação, em sala de nome previsível

**Onde:** `js/sync-jogador.js:33` e `:99`

A sala vem da URL e cai num padrão adivinhável:

```js
const sala = (new URLSearchParams(location.search).get('sala') || 'mesa').trim() || 'mesa';
```

E a escrita acontece sem nenhum login:

```js
dbRef.child(id).set(paraEnviar[id])   // dbRef = mesas/<sala>/jogadores/inventario
```

O mestre faz login com e-mail e senha (`sync-mestre.js:248`) e só ele escreve em
`dados`. Mas o nó `jogadores/inventario` é gravável **anonimamente** por
desenho — é o que permite o jogador editar o próprio inventário. Como a sala
padrão é literalmente `mesa`, qualquer pessoa que chegue ao endereço do site
consegue escrever nesse nó.

**Impacto real:** limitado. O conteúdo é texto de inventário, e a página do
mestre passa tudo por `GA_limparHtml` antes de renderizar (`js/bases.js:100`),
então não há caminho para execução de script. O estrago possível é vandalismo:
apagar ou sujar a lista de itens dos jogadores.

**O que fazer:** trocar o nome da sala por algo não adivinhável. Já é suportado
sem mexer em código — o jogador entra por `jogadores.html?sala=<nome>` e o mestre
define em `localStorage['grifosAlados.syncSala']`. Um nome aleatório resolve a
maior parte do risco. Se quiser fechar de vez, o caminho é autenticação anônima
do Firebase com regra por UID — mas isso é bem mais trabalho para um ganho que
talvez não valha numa mesa entre amigos.

> Nota: as chaves em `js/firebase-config.js` estarem no GitHub **não** é um
> problema. Chaves web do Firebase identificam o projeto, não autorizam nada;
> quem autoriza são as regras do banco. O comentário no arquivo já diz isso
> corretamente.

---

### 4.2 — MÉDIA · `backend/loja_completa.py` é código morto e já derivou do catálogo real

**Onde:** `backend/loja_completa.py` (1.104 linhas)

Nada carrega esse arquivo: `server.py` não o importa, e ele não gera o
`js/loja_completa.js` (só escreve o próprio JSON). É uma porta em Python da
mesma lógica, mantida em paralelo — e que ficou para trás:

| | Python | JavaScript |
|---|---|---|
| Itens no catálogo | 71 | 458 |
| `Dente de wisphago` | grafado `wishpago` (erro antigo) | corrigido |
| `Elixir quimérico` | grafado `Elixir químico` (erro antigo) | corrigido |
| `Ankh solar`, `Tomo de guerra`, `Tomo do rancor` | ausentes | presentes |

O risco hoje é zero, porque ninguém executa. O risco amanhã é você (ou eu) abrir
esse arquivo procurando o catálogo e trabalhar em cima de dados errados.

**O que fazer:** apagar, ou renomear para algo que grite que está obsoleto e
anotar isso no `README`. Não vale sincronizar os dois à mão.

---

### 4.3 — MÉDIA · 2,36 MB carregados de forma síncrona e bloqueante

**Onde:** `index.html` — 54 tags `<script>`, **nenhuma** com `defer` ou `async`

| Recurso | Peso |
|---|---|
| JS (51 arquivos) | 1.687 KB |
| Fontes (6 woff2) | 440 KB |
| CSS (14 arquivos) | 275 KB |
| HTML | 19 KB |
| **Total** | **2,36 MB** |

Os cinco maiores: `monstros.js` (237 KB), `recompensas.js` (176 KB),
`itens-descricoes-data.js` (169 KB), `itens-descricoes-extra-data.js` (97 KB),
`loja_completa.js` (85 KB).

Cada script bloqueia o desenho da página até baixar e executar. Do disco isso é
imperceptível; no GitHub Pages, na primeira visita e em conexão fraca, é uma
espera visível.

**O que fazer:** o caminho mais barato é acrescentar `defer` nas tags. Ele
preserva a ordem de execução — que aqui importa, já que `recompensas.js` depende
de `loja_completa.js` e das descrições — e libera o navegador para desenhar
antes. É uma mudança pequena, mas mexe na inicialização de 14 abas: só vale com
um teste de carregamento das duas páginas depois. Carregar os dados de cada aba
sob demanda daria muito mais ganho, mas é uma reforma grande e não recomendo
agora.

---

### 4.4 — MÉDIA · Falha silenciosa quando o `localStorage` enche

**Onde:** as 25 chamadas de `localStorage.setItem`, em 19 chaves

Todas estão protegidas por `try/catch` — o site nunca quebra por isso, o que é
bom. O problema é o que acontece depois: a exceção é engolida e **o usuário não
é avisado de que os dados não foram salvos**. Não há nenhuma referência a
`QuotaExceeded` no projeto inteiro.

As chaves que crescem sem limite com o uso são `grifosAlados.monstros`,
`grifosAlados.bases`, `grifosAlados.anotacoes` e `grifosAlados.anotacoesMapa`.
Nenhuma tem teto de tamanho no código. O limite típico do navegador é ~5 MB por
origem, somando todas as 19 chaves.

**Cenário:** numa campanha longa, com muitas fichas de monstro e anotações, o
mestre salva, o navegador recusa, e ele descobre a perda depois — sem nunca ter
visto um aviso.

**O que fazer:** nos `catch`, distinguir o erro de quota e mostrar um aviso na
tela ("não foi possível salvar: armazenamento cheio"). É pouco código e evita a
única forma de perda de dados que encontrei.

---

### 4.5 — BAIXA · 10 entradas de melhoria sem página confirmada

**Onde:** `js/recompensas.js` — já registrado no `TODO` da linha 756

| Tabela | Entradas |
|---|---|
| `MELHORIA_ARMA` | Fósforo, Penetrante *(livro citado como "Suplemento do Mestre", a revisar)*, Usado, Brasonado |
| `MELHORIA_ARMADURA` | Prudente, Usado, Brasonado, Devotado |
| `MELHORIA_ESOTER` | Usado, Brasonado |

Aparecem como `p. ??` na tela e no texto copiado. Todas **têm descrição
completa** — falta só a referência de página. Cosmético.

---

### 4.6 — BAIXA · 27 campos de formulário sem rótulo associado

**Onde:** `index.html` (27 de 78 campos) e `jogadores.html` (23 de 42)

São campos sem `<label for>`, sem `aria-label`, sem `placeholder` e sem estar
dentro de um `<label>`. Um leitor de tela anuncia "campo de edição" sem dizer
para quê.

O resto da acessibilidade está bem: `lang="pt-BR"`, `<title>` e `viewport`
presentes nas duas páginas, e **os 146 botões do `index` e os 107 do
`jogadores` têm rótulo acessível** — nenhum botão mudo.

Se o site é usado só por você e pela sua mesa, isso tem prioridade baixa mesmo.

---

## 5. Números do projeto

| | |
|---|---|
| Arquivos rastreados | 86 (7,1 MB) |
| JavaScript | 53 arquivos, 1,9 MB |
| CSS | 14 arquivos, 300 KB |
| Abas / seções | 14 |
| Itens no catálogo da Loja | 458 |
| Verbetes de descrição | 859 |
| Termos no glossário de tooltips | 38 |
| Itens nas tabelas de recompensa | 726 (17 tabelas) |
| Chaves de `localStorage` | 19 |
| Commits | 26 |

---

## 6. Recomendações, em ordem

1. **Trocar o nome da sala do sync** por algo não adivinhável (§4.1). Custo:
   dois minutos, sem tocar em código. É o melhor retorno da lista.
2. **Avisar quando o `localStorage` encher** (§4.4). Custo: baixo. É a única
   perda de dados silenciosa que existe hoje.
3. **Apagar o `backend/loja_completa.py`** (§4.2). Custo: um comando. Remove uma
   armadilha para o futuro.
4. **Acrescentar `defer` nas tags `<script>`** (§4.3), com teste de carregamento
   das duas páginas em seguida.
5. As páginas faltantes (§4.5) e os rótulos de campo (§4.6) quando sobrar tempo.

Nada aqui é urgente. O projeto está em bom estado — as recomendações são de
robustez, não de conserto.
