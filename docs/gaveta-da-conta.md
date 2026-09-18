# A gaveta da conta — o dado seguindo a pessoa, não o navegador

**Aberto em 18 de setembro de 2026**, no mesmo dia da mudança para a Vercel e
depois de um dia inteiro perdido restaurando dados à mão. A pergunta dele, nas
palavras dele: *"e se a gente colocasse todas as funções logadas direto para a
conta do Google?"*

> **Leia antes:** `docs/mudanca-para-vercel.md` (por que a mudança doeu) e
> `docs/mesa-de-verdade.md` §4 e §6 (o desenho do banco e quem lê o quê). Este
> documento continua os dois; não re-derive o que está lá.

---

## 1. O problema, em uma frase

Hoje o dado mora no **navegador**. Trocar de endereço, de máquina ou de aba é
mudança de casa — e foi exatamente isso que custou o dia 18/09.

O que aconteceu, e que não pode voltar a acontecer:

- a gaveta é **por endereço**: `github.io`, `vercel.app`, `file://` e
  `127.0.0.1` são quatro cofres diferentes, e o site é o mesmo;
- a mala feita do `file://` era a cópia **velha** (bestiário de 11 KB contra
  379 KB) e quase entrou por cima da boa;
- uma **aba velha** aberta desde antes da restauração gravou o vazio que tinha
  em memória por cima de tudo;
- e a **digital** (`fichaSincronia`) viajou junto na mala, fazendo o navegador
  novo mentir para o banco — a cópia pobre da ficha descia por cima da boa a
  cada F5.

Nenhuma dessas quatro é um bug isolado. As quatro são a mesma coisa: **o dono do
dado é o navegador, e navegador é um lugar, não uma pessoa.**

## 2. A decisão de fundo: guardar na conta ≠ exigir conta

São duas perguntas diferentes, e as respostas são opostas.

| | Guardar na conta | Exigir conta |
|---|---|---|
| O que é | quem entra ganha sincronia | ninguém usa sem login |
| Custo | trabalho de código | mata o offline, mata o "só abrir o link" |
| Decisão | **fazer** | **não fazer** |

**Exigir login para tudo está fora**, e por três motivos que já são decisão
tomada neste projeto:

1. o README promete *"sem servidor, sem cadastro e sem custo"*, e o site abre
   com duplo-clique no `index.html` — é metade do valor dele;
2. em 08/09/2026 ficou decidido que **ver a mesa não pede login** (ver
   `docs/acesso-a-mesa.md`). O jogador que só quer olhar a Loja não vai passar a
   precisar de conta;
3. sem internet o site inteiro deixaria de abrir.

**O que vale é o outro lado:** o `localStorage` continua sendo a cópia de
trabalho — offline segue funcionando, a tela segue instantânea —, e quem está
logado ganha uma cópia na conta, que é quem manda quando as duas divergem.

## 3. A regra que organiza tudo (e que o dia 18/09 ensinou)

> **A nuvem guarda CONTEÚDO. A memória da conversa é de cada navegador e não
> viaja.**

`fichaSincronia` e `syncConhecido` são digitais: elas dizem *"o que ESTE
navegador já combinou com o banco"*. Levá-las para outro lugar faz o novo chegar
mentindo, e o site conclui "aqui não mudou nada" e sobrescreve calado.

Já está aplicada em dois lugares — a `mudanca.html` não põe digital na mala e
apaga a do destino. **Toda área nova tem de nascer com essa regra.**

## 4. O que já existe (não construir de novo)

Metade do caminho está pronta, e é a metade difícil:

| Peça | Onde | O que faz |
|---|---|---|
| Gaveta da conta | `usuarios/<uid>/fichas` | a ficha segue a pessoa, em qualquer aparelho |
| A conferência | `js/ficha.js`, `conferir()` | sobe / desce / **retida** (pergunta), com "↩ voltar" |
| Escrita por grupo | `js/ficha-mesa.js` | dois editando campos diferentes não se apagam |
| A trava do 📡 | `js/sync-mestre.js` | digital por chave, conflito pausa em âmbar |
| Poda do que é só do mestre | `valorParaEnviar()` | tira o 🙈; desde 18/09 poda o histórico de lojas |

**A conferência do `ficha.js` é o coração e já está escrita.** O trabalho desta
etapa é, em boa parte, generalizá-la para fora da ficha.

## 5. O desenho

```
usuarios/{uid}/
    fichas/{fichaId}            ← JÁ EXISTE
    gaveta/
        bestiario   { conteudo, em, porQuem }
        anotacoes   { conteudo, em, porQuem }
        mapa        { conteudo, em, porQuem }
        tempo       { conteudo, em, porQuem }
        recompensas { conteudo, em, porQuem }
        criarAmeaca { conteudo, em, porQuem }
        prefs       { conteudo, em, porQuem }
```

**Uma área por nó, e nunca um nó só com tudo dentro.** No Realtime Database ler
um nó traz tudo o que está embaixo: juntar as sete faria abrir as Anotações
baixar o bestiário junto. Foi exatamente o erro do `mesas/<sala>/dados`, que
carregava 756 KB de histórico de loja em toda abertura de página (consertado em
18/09/2026 — ver §8).

- `conteudo` — o mesmo texto que hoje vai no `localStorage`.
- `em` — carimbo do servidor. É o desempate da conferência.
- `porQuem` — apelido do aparelho, só para a tela dizer *"mudou no celular"*.

**E não há regra nova a publicar.** A que já está no ar cobre tudo isto:

```json
"usuarios": { "$uid": {
  ".read":  "auth != null && $uid === auth.uid",
  ".write": "auth != null && $uid === auth.uid"
} }
```

No Firebase a permissão de um nó **desce para todos os filhos**, então
`usuarios/<uid>/gaveta/<área>` já nasce lendo e escrevendo só para o dono. É a
mesma regra que a ficha usa desde 09/09 — e é a primeira vez que essa cascata
joga a favor: em 08/09 ela foi a armadilha que obrigou a mover os valores da
iniciativa para um nó irmão (`docs/mesa-de-verdade.md` §17).

Nada de leitura pública aqui. A gaveta é do mestre; a **mesa** continua sendo o
lugar do que é compartilhado, com as regras que já existem.

## 6. O que NÃO vai para a gaveta

Decidir isto agora evita a conta de luz depois:

| Chave | Tamanho real (mesa do Caique) | Decisão |
|---|---|---|
| `lojaLog` | **756 KB** | **fica fora.** É histórico; a loja exibida já vai para a mesa |
| `monstros` | 379 KB | vai, mas é a primeira a merecer poda |
| `anotacoesMapa` | 162 KB | vai |
| `fichasPersonagem` | 31 KB | já está lá |
| `anotacoes` | 20 KB | vai |
| `fichaRolagens` | 13 KB | **fica fora** — é registro da sessão, não acervo |
| o resto | < 1 KB cada | vai |
| `fichaSincronia`, `syncConhecido` | — | **nunca** (§3) |

Sobram ~600 KB por mestre. O plano gratuito do Realtime Database é da ordem de
**1 GB guardado e 10 GB baixados por mês** (confira o valor atual): o que
aperta não é o guardado, é o **baixado**, e por isso a §7 existe.

## 7. Três armadilhas que esta etapa tem

**a) Baixar a gaveta inteira a cada abertura.** 600 KB × cada F5 × cada mestre
come a cota rápido. A saída: guardar junto do `conteudo` uma **digital** e
assinar primeiro só ela (`usuarios/<uid>/gaveta/<área>/dig`, um nó irmão de
poucos bytes). Igual? Não baixa nada. Diferente? Aí sim busca o conteúdo. É a
mesma ideia da trava do 📡, aplicada à leitura.

**b) Escrita de blob perde edição simultânea.** Mandar a área inteira faz o
último a falar apagar o outro. O bestiário e as anotações são estruturas
grandes: ou se escreve **por ramo/sessão** (como o `ficha-mesa.js` faz por
grupo), ou se aceita "um aparelho por vez" e a conferência pergunta. **Para
começar, aceitar** — e deixar a conferência perguntar é honesto e é barato.

**c) O cache que vira verdade.** É a armadilha do dia 18/09 vestida de roupa
nova. O `localStorage` é **cópia de trabalho**, nunca fonte da verdade quando
há conta logada. Em dúvida, **perguntar** — a ficha retida com "↩ voltar" é o
padrão de tela desta etapa inteira.

## 8. Já feito neste dia: a loja exibida em vez do armarinho inteiro

Entrou antes desta etapa por ser pequeno e valer na sessão seguinte.

**O que era:** `mesas/<sala>/dados` carregava o `lojaLog` — 756 KB, 5 lojas,
três delas com 206 KB. E os dois lados escutam o nó **pai**:

```
sync-mestre.js   refBanco = db.ref('mesas/' + s + '/dados')
sync-jogador.js  db.ref('mesas/' + sala + '/dados').on('value', …)
```

Como ler um nó traz tudo o que está embaixo, **toda abertura de página, de
qualquer pessoa, baixava 756 KB de histórico** só para mostrar a loja da vez.
Seis pessoas, seis aberturas: ~27 MB por sessão, por mesa.

**O que é agora:** o `valorParaEnviar()` — o mesmo gancho que já tirava o 🙈 das
bases e viagens — manda do `lojaLog` apenas a **loja exibida**, numa lista de um
item só. **756 KB → 11 KB, um corte de 98,5%.**

Três detalhes que fazem isso funcionar sem tocar no `loja.js`:

- o `entradaSelecionada()` do outro lado procura o id do `lojaLogSel` e, não
  achando, cai no primeiro da lista — que aqui é o único. Os dois caminhos dão
  no mesmo item;
- o `_log` é `unshift`, então `[0]` é a mais nova — o mesmo que o mestre vê;
- **trocar de loja no histórico mexe só no `lojaLogSel`.** Como agora o conteúdo
  do `lojaLog` *depende* dessa seleção, o gatilho do `setItem` marca as duas
  chaves juntas. Sem isso, o mestre trocaria a vitrine e os jogadores
  continuariam vendo a loja anterior, sem nada parecer errado dos dois lados.

**Testado** com os dados reais: a poda escolhe a loja do `lojaLogSel`, e a
edição dos jogadores renderiza dela as 30 peças da loja normal, 8 encantamentos,
4 pergaminhos e 24 serviços.

O histórico continua inteiro no navegador do mestre, como sempre.

## 9. A ordem de construir

1. ~~**`prefs` primeiro** (< 1 KB): o ⚙ Acessibilidade seguindo a conta. É a área
   mais boba do site e serve de cobaia para o nó, a regra e a conferência.~~
   **FEITA em 18/09/2026** — ver §11.
2. **`anotacoes` + `mapa`**: as duas juntas, porque uma referencia a outra.
3. **`bestiario`**: a maior, e a que mais se ganha.
4. **`tempo`, `recompensas`, `criarAmeaca`**: pequenas, em uma leva.
5. **A digital antes do conteúdo** (§7a) — só depois que houver duas áreas de
   pé, quando o custo já se mede.

**Não migrar tudo de uma vez.** Cada área que sobe tem de conviver com as que
ainda não subiram, e o site precisa seguir funcionando deslogado o tempo inteiro.

## 10. Como saber que deu certo

- Abrir o site em outro computador, entrar com o Google e ver o bestiário
  aparecer — sem mala, sem arquivo, sem `mudanca.html`.
- Editar a mesma área nos dois e receber a pergunta *"mudou aqui e lá — qual
  fica?"*, com a perdedora guardada e um "↩ voltar".
- Deslogado, tudo continuar funcionando como hoje, inclusive offline.
- E a `mudanca.html` virar o que ela deve ser: a saída de emergência de quem
  não usa conta — não o caminho normal de ninguém.

---

## 11. Etapa 1 — o motor e a cobaia (18 de setembro de 2026)

### O que entrou

| Arquivo | O quê |
|---|---|
| **`js/gaveta.js`** (novo) | o motor: registra áreas, assina `usuarios/<uid>/gaveta/<área>`, confere e decide |
| `js/acessibilidade.js` | ganhou `GA_Acess.receber()` e registra a área `prefs` |
| `index.html`, `jogadores.html` | `<script src="js/gaveta.js" defer>` logo depois do `mesa.js` |
| `mudanca.html` | `grifosAlados.gavetaSinc` entrou na lista das digitais que **não viajam** |

**Nenhuma regra nova no Firebase.** Descoberta ao conferir: `usuarios/$uid` já é
`.read`/`.write` só do dono, e no Firebase a permissão **desce para os filhos**.
`usuarios/<uid>/gaveta/<área>` já nasce protegido. É a primeira vez que essa
cascata joga a favor — em 08/09 ela foi a armadilha que obrigou a mover os
valores da iniciativa para um nó irmão.

### A porta

```js
GA_Gaveta.registrar({
  nome: 'prefs',                    // o nó no banco (e no gavetaSinc)
  chave: 'grifosAlados.acessibilidade',
  politica: 'maisNovo',             // ou 'perguntar' (o padrão)
  aoReceber: texto => { … }         // aplicar sem esperar um F5
});
GA_Gaveta.decidir(nome, 'daqui' | 'dela');   // quando a área ficou retida
GA_Gaveta.estado();                          // { ligada, areas, retidas, erro }
```

### Duas decisões desta etapa

**`prefs` usa `'maisNovo'`, e é a exceção.** Abrir uma janela perguntando *"qual
tamanho de letra fica?"* seria pior do que qualquer engano que o desempate possa
cometer. **Conteúdo não usa isso:** `'maisNovo'` compara o relógio do servidor
com o desta máquina, e computador com a hora errada erra o desempate junto. Para
bestiário, anotações e mapa vale `'perguntar'`, que não depende de relógio nenhum.

**A fila de inscrição.** O `acessibilidade.js` carrega na linha 435 do
`index.html`; o `gaveta.js`, na 528 (ele precisa do `mesa.js`). Quem quer se
registrar cedo deixa o pedido em `window.GA_GavetaFila`, e o `gaveta.js` esvazia
a fila ao nascer. Sem isso a área nunca se registraria — **e em silêncio**, que é
o pior jeito de não funcionar.

### Como foi provado

Um arreio em Node monta um mundo de mentira (`localStorage`, `firebase`,
`GA_Mesa`) e roda a tabela de decisão inteira — **12 casos, todos passando**:

| | Caso | Esperado |
|---|---|---|
| A | o banco não conhece a área | sobe |
| B | só de lá mudou | desce, e avisa a aba |
| C | só daqui mudou | sobe |
| D/E | os dois mudaram · `maisNovo` | fica o mais recente |
| F | os dois mudaram · `perguntar` | **retém**: nada sobe nem desce |
| G | iguais | não faz nada |
| H | navegador novo, nunca combinou nada | **retém** — é a trava do dia 18/09 |
| I/J | vazio dos dois lados · vazio aqui | não inventa · desce |
| K/L | `decidir('daqui')` · `decidir('dela')` | sobe a daqui · desce a de lá |

E no navegador, **deslogado**, nas duas páginas: `GA_Gaveta` existe, a área
`prefs` está registrada, a fila esvaziou, `ligada: false`, **nada é gravado no
banco nem no `gavetaSinc`**, e o `receber()` aplica e desfaz o tamanho de texto e
o contraste sem F5. Sem conta, o site é exatamente o que sempre foi.

### O que falta para fechar a etapa

O teste de ponta a ponta com **duas contas de verdade em dois aparelhos** — esse
depende de ele entrar com o Google no site publicado. O caminho é: entrar,
mudar o tamanho do texto, abrir em outro navegador com a mesma conta e ver o
tamanho chegar sozinho.
