# A campanha está no endereço — o conserto do "gerei a loja e não foi"

**Data:** 13 de outubro de 2026
**Pedido dele:** *"Eu sinto que essa parada de Mestre por mesa, as mesas em
geral está muito bugado… Poderia ficar com tudo, dai na aba 'Mesa' aparecesse
todas as mesas! Dai era só meio que apertar para entrar."*

---

## 1. O defeito, com prova

Três coisas foram medidas no banco antes de tocar em código. Leitura pública,
nada escrito.

**(a) `mesas/mesa` é a Penitência de Azgher.** O nó tem `nome` = "Penitência de
Azgher" e `dono` = `81NG9Qt…` — o Hadson, que já assumiu a sala (aquela
pendência de 11/09 fechou sozinha).

**(b) O site caía nessa sala por padrão.** O `mesaId()` do `js/mesa.js`
terminava em `|| 'mesa'`, nos **dois** lados. Ou seja: todo `index.html` que
nunca tivesse escolhido campanha — e todo `jogadores.html` sem `?sala=` —
apontava para dentro da campanha de outra pessoa.

**(c) E uma gaveta só servia todas as campanhas.** `mesas/mesa/dados/viagens` e
`mesas/nuevosol/dados/viagens` estavam **byte a byte iguais** (a mesma "Viagem
1"), e as `bases` também. Era o mesmo `localStorage` de um navegador só,
publicado em duas campanhas diferentes.

**Por que a loja do mestre "não ia".** Nada a ver com permissão. Era a **trava
do 📡** (15/09) fazendo o que foi desenhada para fazer: ela compara o que está
aqui com o que está no banco, e o que estava no banco tinha vindo de outro
navegador. Para o navegador do mestre aquilo é "mudou por outra mão" → **pausa**,
e só o "📤 Mandar a daqui por cima" atravessa. A trava nunca previu *duas
pessoas* — ela foi feita para uma pessoa com dois endereços.

Achados menores do mesmo problema: existem `mesas/nuevosol` **e**
`mesas/nuevo-sol`, as duas chamadas "Nuevo Sol" (a segunda parada desde 08/09),
e uma `mesas/penitencia` órfã de julho. É o que acontece quando o id da sala vem
de uma chave escondida em vez do endereço.

---

## 2. O desenho novo

**A campanha está no endereço.** É a frase inteira.

```
index.html                   → a BANCADA: suas coisas, local, 📡 desligado
index.html?mesa=nuevosol     → esta aba É o Nuevo Sol
jogadores.html?sala=nuevosol → a visão dos jogadores dela
```

Três regras saem daí:

1. **Nada cai numa sala por padrão.** Sem `?mesa=`, não há mesa: o 📡 fica
   cinza e tracejado, e nenhuma linha vai para o banco. O link de jogador sem
   `?sala=` diz o que está faltando em vez de entrar na mesa de alguém.
2. **A gaveta é da campanha.** `grifosAlados.bases` dentro do Nuevo Sol é
   `grifosAlados.bases@nuevosol`. São seis chaves: as cinco que o 📡 transmite
   (`lojaLog`, `lojaLogSel`, `lojaComunidade`, `viagens`, `bases`) e o espelho
   da caixa de entrada dos jogadores.
3. **Cinco campanhas são cinco abas.** A sala era do navegador; passou a ser da
   aba. Dá para deixar duas abertas lado a lado.

O que **não** é da campanha, de propósito: bestiário, anotações, mapa, fichas,
ajustes da Loja e acessibilidade. Isso é seu, não da mesa — e o ⚔ Combates já
tem a etiqueta dele desde 08/09.

### O arquivo novo
`js/mesa-endereco.js`, carregado logo depois do `script.js` e **antes** de todo
mundo que lê a gaveta (loja, bases, viagem, `mesa.js` e os dois syncs). Ele
expõe `window.GA_Sala`: `id`, `ehHub`, `chave(nome)`, `link(id)`,
`linkJogador(id)`, `idDe(nome)` e `abrir(id)`.

### A mudança de uma vez só
Quem já usava o site tem tudo nas chaves sem sufixo. A `grifosAlados.syncSala`
diz para qual campanha este navegador vinha publicando — é ela que autoriza
dizer "isto é daquela mesa". Então, uma vez:

- **copia** (não move) as seis chaves para `…@<syncSala>`;
- o que está sem sufixo **fica**, e vira a bancada do HUB;
- marca `grifosAlados.gavetaPorMesa` para não repetir.

**Sem `syncSala`, não se migra nada.** O padrão antigo era cair em `mesa`, que é
a campanha do Hadson: carimbar a bancada deste navegador como sendo dela seria
repetir exatamente o defeito que esta mudança veio consertar.

---

## 3. A gaveta vazia BAIXA, não briga

Com a gaveta por campanha, abrir uma mesa pela primeira vez num navegador é
gaveta vazia aqui e loja publicada lá. Pela trava isso é "conflito" — e seria o
mesmo sintoma de antes, com outra causa.

Mas conflito é quando **as duas** têm coisa diferente. Não havendo nada aqui,
não há o que perder: o `sync-mestre.js` traz a cópia da mesa para a gaveta,
marca a digital (`conhecido`) e redesenha a aba. A partir daí a próxima loja que
o mestre rolar sai como "minha mudança" e **publica sozinha**.

Só desce o que está **vazio** aqui. Chave com conteúdo diferente continua sendo
conflito, e continua decidida pelo "📤 Mandar a daqui por cima" — ninguém perde
anotação por isso.

Detalhe que custaria uma ida e volta: essa escrita no `localStorage` passa pelo
mesmo `setItem` que dispara a transmissão. Há uma trava (`baixando`) para o
navegador não devolver ao banco o que o banco acabou de mandar.

---

## 4. Uma correção de dado que veio junto

`criarCampanha()` escolhia entre `set()` e `update()` olhando o que já tinha
carregado. Com a campanha vindo do endereço dá para criar um nome **sem nunca
ter aberto aquela sala**, e aí o `set()` cairia numa mesa órfã que tem `dados`,
`fichas` e `membros` dentro — e apagaria tudo. Agora é **sempre `update()`**,
que escreve os mesmos campos de uma mesa nova sem tocar em irmão nenhum.

Na mesma linha, `criadaEm` saiu da escrita: nas regras do banco esse campo só
tem `.read`, então escrevê-lo cai na regra do nó `$sala`, que exige
`!data.exists()`. Numa mesa órfã isso é falso e **derrubaria o update inteiro**,
que é atômico — assumir uma campanha sem dono pararia de funcionar por causa de
um carimbo de data que o site não lê em lugar nenhum.

---

## 5. O que ficou de fora, e por quê

**A proposta literal** era mover as ferramentas do mestre para dentro do
`jogadores.html`. Não foi por aí: significaria reescrever as abas do mestre na
outra página e desmontar, aba por aba, a trava de só-leitura do
`modo-jogador.js` — muito mais obra para o mesmo resultado. Com a campanha no
endereço, o `index.html?mesa=…` **já é** "entrar naquela mesa", com um código só
e sem duplicar nada.

**As regras do Firebase não mudaram.** Nenhuma precisou. Elas vivem no console,
e a cópia fiel está em `docs/regras-firebase.md`.

---

## 6. O que ainda é seu para fazer

- **A gazeta da Penitência continua no seu nome.**
  `campanhas/penitencia-de-azgher/dono` é o seu uid, então o Hadson não consegue
  escrever nela. Você faz "✕ Tirar do ar", ele faz "📡 Publicar esta gazeta".
- **`mesas/nuevo-sol` é duplicata de `mesas/nuevosol`** (a viva é a `nuevosol`,
  a outra parou em 08/09) e **`mesas/penitencia`** é órfã de julho, com só um
  `meta` dentro. Nenhuma das duas atrapalha agora — ninguém mais cai nelas por
  acaso —, mas dá para apagá-las no console quando quiser.
- O id da campanha nas **Notícias** (`penitencia-de-azgher`) e o id da **sala**
  (`mesa`) são diferentes. Funciona, porque são coisas separadas no banco; só é
  bom saber antes de estranhar.
