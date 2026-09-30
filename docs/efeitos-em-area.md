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

## ⚠ O que VOCÊ precisa fazer no console (só para o JOGADOR criar)

O **mestre já consegue criar** sem mexer em nada: a escrita do nó da mesa é dele.
Para o **jogador** também poder lançar (o seu caso quando você joga na Mesa do
Hadson), falta **uma regra**, no mesmo espírito da do inventário dos jogadores.

Em **Realtime Database → Regras**, dentro de `mesas` → `$sala`, adicione o nó
`efeitosArea` como irmão de `fichas`:

```json
"mesas": {
  "$sala": {
    ".read": true,
    ".write": "auth != null && auth.token.email === 'SEU-EMAIL@AQUI.com'",

    "efeitosArea": {
      ".write": "auth != null && auth.token.email_verified"
    }
  }
}
```

Isso deixa **qualquer pessoa logada (com e-mail verificado)** criar/encerrar efeito
naquela mesa. Como o efeito é só um lembrete (não apaga ficha, não mexe em PV),
esse nível é seguro e simples — é o mesmo grau de abertura que o
`jogadores/inventario` já teve.

**Se quiser fechar só para a sua lista** (como fez no inventário), troque a linha
do `efeitosArea` pela mesma condição que você usa no `fichas`/`inventario` — por
e-mail:

```json
"efeitosArea": {
  ".write": "auth != null && auth.token.email_verified && (
     auth.token.email === 'MESTRE@gmail.com' ||
     auth.token.email === 'jogador1@gmail.com' ||
     auth.token.email === 'jogador2@gmail.com')"
}
```

**Antes de publicar:** faça o **backup** e rode o **simulador de regras** (como você
já faz) — uma escrita em `mesas/<sua-sala>/efeitosArea/teste` com uma conta de
dentro tem de **passar**, e com uma conta de fora (ou deslogada) tem de **falhar**.

Enquanto a regra não estiver publicada, o jogador que tentar criar vê um recado na
tela ("o banco recusou… peça ao mestre"); **o mestre cria normalmente**.

## No código (já feito)
- `js/efeitos-area.js` (novo): o modelo, o sync (`efeitosArea`), a oficina e o
  casamento efeito↔ficha. Exposto em `window.GA_EfeitosArea`.
- `js/iniciativa.js`: expõe `GA_Iniciativa.combatentes()` (a lista de alvos).
- `js/ficha.js`: o cartão *🔆 Efeitos em área*, o botão de lançar, e o lembrete no
  aviso de início de turno.
- `js/efeitos-area.js` carregado nas duas páginas (index e jogadores).
