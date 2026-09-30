# 🔆 Efeitos em área — o "lembrete guiado"

**Aberto e feito em:** 30 de setembro de 2026.
**O que é:** quando alguém lança uma magia ou poder de **área** (Oração, Bênção,
Consagrar…), marca quem está na área e o efeito aparece na **ficha de cada
afetado** — aliados recebem o bônus, inimigos recebem o **efeito contrário**, e dá
para marcar até os **NPCs que o mestre controla**.

É **lembrete guiado** (a sua escolha): a ficha **mostra** o efeito com todas as
letras e o repete no aviso de início de turno; os **números** você aplica com os
**Atributos temporários** e as **Fontes de Defesa** que já existem na ficha. A mesa
não mexe sozinha na conta de outro jogador.

## Onde no site
- **Lançar:** botão **🔆 Lançar efeito** no cartão *🔆 Efeitos em área* da ficha.
  Abre a oficina: nome, o que os aliados ganham, o que os inimigos sofrem (opcional),
  duração, e a lista de combate para marcar cada um como **aliado**, **inimigo** ou
  **fora**. A lista de alvos vem da iniciativa (monte o combate no Painel ⚔).
- **Ver:** o mesmo cartão lista os efeitos **sobre você** (🛡 em você / ⚔ contra você),
  e o **✕** encerra um efeito (quem lançou, ou o mestre).

## Onde os dados moram
No Firebase, em `mesas/<sala>/efeitosArea` — **irmão** da iniciativa. Como o nó da
mesa é de **leitura pública** (`".read": true`), **todo membro já lê** os efeitos
sem mudar regra nenhuma. Fora de uma mesa (o mestre jogando offline), fica no
`localStorage` deste navegador.

## ⚠ O que VOCÊ precisa fazer no console

> **Correção (30/09/2026):** o ruleset ATUAL da mesa é granular — cada nó tem a
> sua regra, e **não há mais `.read: true` na mesa inteira**. Ou seja, aqui **nem o
> mestre** escreve/lê `efeitosArea` sem uma regra própria (diferente do doc antigo,
> que supunha `.read: true` + escrita geral do mestre). Então o `efeitosArea`
> precisa de **`.read` E `.write` próprios**, no padrão dos vizinhos (`iniciativa`,
> `jogadores/inventario`). Sem ele, o efeito só funciona **offline** (localStorage).

Em **Realtime Database → Regras**, dentro de `mesas` → `$sala`, o `efeitosArea` é um
**nó IRMÃO** de `fichas`, `iniciativa` e `jogadores` (filho direto de `$sala`) —
**nunca dentro de `fichas`** (senão a regra governa o caminho errado E as regras do
`fichas` se perdem, quebrando a subida de ficha do jogador e a leitura do mestre):

```json
"efeitosArea": {
  ".read":  "auth != null && root.child('mesas').child($sala).child('membros').child(auth.uid).exists()",
  ".write": "auth != null && root.child('mesas').child($sala).child('membros').child(auth.uid).exists() && root.child('mesas').child($sala).child('membros').child(auth.uid).child('papel').val() !== 'espectador'"
}
```

- **Lê:** qualquer membro da mesa (como `iniciativa`).
- **Escreve:** todo membro menos espectador (como `jogadores/inventario`) — mestre,
  auxiliar e jogadores criam/encerram efeito.

**Antes de publicar:** faça o **backup** e rode o **simulador de regras** — uma
escrita em `mesas/<sua-sala>/efeitosArea/teste` (com `.child('uid')` seu) por um
membro tem de **passar**, e por uma conta de fora (ou deslogada) tem de **falhar**;
uma leitura de `mesas/<sua-sala>/efeitosArea` por um membro tem de **passar**.

Enquanto a regra não estiver publicada, quem tentar criar vê um recado na tela
("o banco recusou…") e o efeito só vale **offline**, neste navegador.

## No código (já feito)
- `js/efeitos-area.js` (novo): o modelo, o sync (`efeitosArea`), a oficina e o
  casamento efeito↔ficha. Exposto em `window.GA_EfeitosArea`.
- `js/iniciativa.js`: expõe `GA_Iniciativa.combatentes()` (a lista de alvos).
- `js/ficha.js`: o cartão *🔆 Efeitos em área*, o botão de lançar, e o lembrete no
  aviso de início de turno.
- `js/efeitos-area.js` carregado nas duas páginas (index e jogadores).
