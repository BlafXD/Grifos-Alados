# As regras do Firebase, conferidas

**06/10/2026.** As regras vivem no console do Firebase, não no repositório —
este arquivo passa a ser a cópia fiel delas, para dar para comparar e para
voltar atrás se alguma edição no console sair errada.

Conferi a versão que está no ar contra **todos os caminhos que o código usa**
(um `grep` dos `.ref()` dos 50 arquivos de `js/`, com os dinâmicos resolvidos:
`base()` do `efeitos-area.js` é `mesas/<id>/efeitosArea`, o do `ficha-mesa.js`
é `mesas/<campanha>/fichas/<uid>`, e `uidGaveta`/`uidLigado` são **sempre o
próprio uid**). O site só escreve em três raízes — `usuarios/`, `mesas/` e
`campanhas/` — e **nenhum caminho ficou sem regra**.

## Uma mudança só: apagar campanha órfã

A regra de `campanhas/$camp` era:

```
auth != null
&& (data.child('dono').val() === auth.uid || !data.child('dono').exists())
&& (!newData.exists() || newData.child('dono').val() === auth.uid)
```

O `!data.child('dono').exists()` é a **válvula do legado**: deixa a primeira
publicação carimbar `dono` numa campanha antiga que não tinha o campo (o
`js/noticias-mesa.js` faz isso sozinho — *"Campanha nova (ou órfã) ganha dono
na mesma escrita"*). Isso é de propósito e continua valendo.

O buraco estava no outro lado do `||`: **apagar** é uma escrita cujo `newData`
não existe, e aí a segunda linha passava de graça. Resultado: **qualquer pessoa
logada podia apagar uma campanha sem dono** — a gazeta dela sumiria para todo
mundo, sem deixar rastro.

A regra nova troca só a última linha:

```
&& (newData.child('dono').val() === auth.uid
    || (!newData.exists() && data.child('dono').val() === auth.uid))
```

Ou seja: **quem apaga tem de ser o dono registrado**. Quem escreve numa órfã
continua podendo — desde que se carimbe como dono na mesma escrita, que é o que
o site já faz.

Conferido caso a caso (as nove situações, nas duas versões da regra):

| Situação | Antes | Agora |
|---|---|---|
| criar campanha nova | pode | pode |
| dono edita a própria | pode | pode |
| dono apaga a própria | pode | pode |
| assumir campanha órfã (publicando) | pode | pode |
| estranho edita a minha | barrado | barrado |
| estranho apaga a minha | barrado | barrado |
| **estranho apaga uma órfã** | **podia** | **barrado** |
| dono tira o próprio `dono` do nó | barrado | barrado |
| sem login | barrado | barrado |

## Uma faxina: `mesas/$sala/membros`

O `.write` do nó **`membros`** (o pai, não o `$uid`) também tinha a válvula
`|| !dono.exists()`, e ali ela não serve para nada: quem assume uma mesa órfã
escreve `membros/<uid>` dentro de um `update()` de vários caminhos, e o Firebase
valida **caminho a caminho** — cai na regra do `$uid`, nunca na do pai. A única
escrita no nó inteiro é a criação da mesa, que entra pela regra do `$sala` e
cascateia. Com a válvula ali, um estranho podia **apagar a lista de membros**
de uma mesa sem dono e trancar todo mundo para fora. Agora o pai é só do mestre.

> As válvulas de `nome`, `entradaLivre` e `dono` **ficam** — são elas que fazem
> o botão **"🎩 Esta campanha não tem mestre → Assumir esta campanha"**
> funcionar (`js/mesa.js`, `criarCampanha`/`blocoEntrada`).

## Antes de colar: carimbe os donos

Enquanto existir mesa ou campanha **sem `dono`**, qualquer pessoa logada ainda
pode **assumi-la** (é a válvula, e é recurso de propósito). Para fechar de vez:

1. No console, olhe `mesas/*/dono` e `campanhas/*/dono`.
2. Mesa sem dono: abra-a no site com a sua conta e clique **"Assumir esta
   campanha"** — ou escreva o seu uid no campo `dono`, na mão.
3. Campanha sem dono: publique uma vez por ela; o `dono` entra sozinho.
4. Com todas carimbadas, dá para tirar as três válvulas `!dono.exists()`
   restantes (`nome`, `entradaLivre`, `dono`) — aí o "Assumir" deixa de
   funcionar, o que só importa se você for criar mesa fora do site.

Depois de colar, rode o **simulador de regras** do console com os quatro casos
do fim da tabela acima: eles são o que distingue a regra nova da velha.

## O ruleset no ar

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
          ".write": "auth != null && root.child('mesas').child($sala).child('membros').child(auth.uid).child('papel').val() === 'mestre'",
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

        "iniciativa": {
          ".read":  "auth != null && root.child('mesas').child($sala).child('membros').child(auth.uid).exists()",
          ".write": "auth != null && (root.child('mesas').child($sala).child('membros').child(auth.uid).child('papel').val() === 'mestre' || root.child('mesas').child($sala).child('membros').child(auth.uid).child('papel').val() === 'auxiliar')"
        },
        "iniciativaValores": {
          ".read":  "auth != null && (root.child('mesas').child($sala).child('membros').child(auth.uid).child('papel').val() === 'mestre' || root.child('mesas').child($sala).child('membros').child(auth.uid).child('papel').val() === 'auxiliar')",
          ".write": "auth != null && (root.child('mesas').child($sala).child('membros').child(auth.uid).child('papel').val() === 'mestre' || root.child('mesas').child($sala).child('membros').child(auth.uid).child('papel').val() === 'auxiliar')"
        },

        "dados": {
          ".read":  true,
          ".write": "auth != null && (root.child('mesas').child($sala).child('membros').child(auth.uid).child('papel').val() === 'mestre' || root.child('mesas').child($sala).child('membros').child(auth.uid).child('papel').val() === 'auxiliar')"
        },
        "meta": {
          ".read":  true,
          ".write": "auth != null && (root.child('mesas').child($sala).child('membros').child(auth.uid).child('papel').val() === 'mestre' || root.child('mesas').child($sala).child('membros').child(auth.uid).child('papel').val() === 'auxiliar')"
        },

        "fichas": {
          ".read":  "auth != null && (root.child('mesas').child($sala).child('membros').child(auth.uid).child('papel').val() === 'mestre' || root.child('mesas').child($sala).child('membros').child(auth.uid).child('papel').val() === 'auxiliar')",
          "$uid": {
            ".read":  "auth != null && ($uid === auth.uid || root.child('mesas').child($sala).child('membros').child(auth.uid).child('papel').val() === 'mestre' || root.child('mesas').child($sala).child('membros').child(auth.uid).child('papel').val() === 'auxiliar')",
            ".write": "auth != null && (($uid === auth.uid && root.child('mesas').child($sala).child('membros').child(auth.uid).exists() && root.child('mesas').child($sala).child('membros').child(auth.uid).child('papel').val() !== 'espectador') || root.child('mesas').child($sala).child('membros').child(auth.uid).child('papel').val() === 'mestre' || root.child('mesas').child($sala).child('membros').child(auth.uid).child('papel').val() === 'auxiliar')"
          }
        },

        "efeitosArea": {
          ".read":  "auth != null && root.child('mesas').child($sala).child('membros').child(auth.uid).exists()",
          ".write": "auth != null && root.child('mesas').child($sala).child('membros').child(auth.uid).exists() && root.child('mesas').child($sala).child('membros').child(auth.uid).child('papel').val() !== 'espectador'"
        },

        "jogadores": {
          "inventario": {
            ".read":  true,
            ".write": "auth != null && root.child('mesas').child($sala).child('membros').child(auth.uid).exists() && root.child('mesas').child($sala).child('membros').child(auth.uid).child('papel').val() !== 'espectador'"
          }
        }
      }
    },

    "campanhas": {
      ".read": true,
      "$camp": {
        ".write": "auth != null && (data.child('dono').val() === auth.uid || !data.child('dono').exists()) && (newData.child('dono').val() === auth.uid || (!newData.exists() && data.child('dono').val() === auth.uid))"
      }
    }
  }
}
```

> **Cole em uma linha cada regra.** O texto que você me mandou vinha com
> quebras de linha no meio de algumas condições (`membros`, `pedidos`,
> `rolagens`) — é o terminal quebrando o parágrafo, não o console; JSON não
> aceita quebra de linha dentro de uma string, e o console recusaria. O bloco
> acima já está fechado e **passa no `JSON.parse`**.

## O que é público de propósito

Vale saber, porque não é descuido: `campanhas` inteira, e de cada mesa o
`nome`, o `dono`, o `entradaLivre`, o `criadaEm`, o `dados`, o `meta` e o
`jogadores/inventario` são de **leitura pública** — é o que faz a gazeta e a
mesa aparecerem para quem ainda não entrou. O que exige ser membro: `membros`,
`rolagens`, `iniciativa` e `efeitosArea`. O que é só do dono: `usuarios/<uid>`
(a gaveta e as fichas da conta) e a ficha de cada jogador, que além dele só o
mestre e o auxiliar leem.
