# Recompensas — a conferência do Padrão e o catálogo completo

**05/10/2026.** Dois pedidos numa frase:

> *"Confirme o docx de geração de recompensas da nossa aba 'Recompensas' do
> Padrão! E no modo custom ter alguma marcação para 'ABSOLUTAMENTE TODOS OS
> ITENS?', digo, dos mundanos é claro, porque está faltando alguns… flechas,
> armas… Mas manter as opções de 'Itens mágicos' 'Acessórios', e etc…"*

---

## 1 · O Padrão conferido contra o livro

Tudo contra **Tormenta20 — Edição Jogo do Ano**, Capítulo 8, pelo PDF
(`pdftotext -enc UTF-8 -table`, que é o modo que não embaralha coluna).

### Tabela 8-1: Tesouro por Nível de Desafio (p. 328–329) — **exata**

Script que lê as 22 linhas de ND do PDF, traduz cada célula para a forma do
`ND_TABLE` (`{dice, bonus, mult, cur}`, `{riq, tier, cnt/cntX/cntB, pct}`,
`{t:'pocao'|'equip'|'sup'|'mag'|'diverso', …}`) e compara faixa a faixa:

```
180 faixas conferidas · 0 divergência(s)
```

São as duas colunas (Dinheiro e Itens) dos 22 NDs — `1/4`, `1/2`, `1`…`20`.
Confere **o limite superior de cada faixa de d%** e **o resultado inteiro**,
incluindo os sufixos `+%` (bônus de 20% na rolagem de tipo) e `2D` (rolar 2d6 e
escolher). Nada a corrigir.

### Tabela 8-2: Riquezas (p. 330) — **exata**

As 13 linhas de valor (`4d4` ~10 T$ … `4d12×10.000` ~260.000 T$) e as três
colunas de faixa (Menor / Média / Maior) batem uma a uma com `RIQUEZA_ROWS` e
`RIQUEZA_TABLE`.

### Tabelas 8-3 e 8-4 (p. 331) — **completas**, com os d% reescalados

Aqui o site **não é** a tabela do livro: ele a esticou com os itens de *Heróis
de Arton*, *Ameaças de Arton* e *Deuses de Arton*, e redistribuiu os 100 números
do d% para caber todo mundo. O que se confere é a **completude**:

| Coluna do livro | nomes lidos do PDF | fora das tabelas do site |
|---|---:|---:|
| 8-3 Itens Diversos | 47 | **0** |
| 8-4 Armas | 40 | **0** |
| 8-4 Armaduras & Escudos | 11 | **0** |
| 8-4 Esotéricos | 10 | **0** (ver abaixo) |

> **O livro briga consigo mesmo num nome.** A Tabela 8-4 imprime *"Orbe
> cristalina"*; a Tabela 3-6 (p. 155) e a descrição do item (p. 160) imprimem
> *"Orbe cristalino"*. O site usa **cristalino**, que é o que está nos dois
> outros lugares. Não é defeito.

**Ressalva honesta do método:** a leitura das colunas de 8-3/8-4 é por regex
sobre PDF de três colunas e pegou 47 dos ~55 nomes de Itens Diversos. Dos que
leu, nenhum falta. As colunas de arma, armadura e esotérico saíram inteiras.

---

## 2 · "Absolutamente todos os itens mundanos"

### O que estava faltando, contado

As tabelas oficiais — mesmo esticadas — cabem nos 100 números de um d%, e 100
nomes não são o mundo inteiro. Cruzando com o catálogo da Loja
(`LojaCompleta.catalogoNomes()`, 458 itens, 455 sem as três repetições):

```
200 itens mundanos NUNCA podiam ser sorteados
  198 diversos   toda a Alimentação (34), as Bebidas (11), os Pratos (3),
                 os Venenos (18), os Aparatos (15), 33 de Equipamento de
                 Aventura (corda, tocha, mochila, saco de dormir, pé de
                 cabra…), 31 de Vestuário, 9 Ferramentas, 9 Instrumentos
    1 arma       Dardos (20)
    1 armadura   Armadura acolchoada
    0 esotéricos
```

E não era descuido do site: **a Tabela 8-4 do próprio livro começa a coluna de
armadura em "Couro"** — a acolchoada, a mais barata do jogo, não está lá. O site
copiou a omissão do livro, que é o comportamento certo para o modo Padrão.

### A chave

No modo **🎛 Customizável**, grupo **"🎒 Absolutamente todos os itens
mundanos"**. Ligada, os **quatro sorteios de item mundano** param de rolar na
tabela curta e passam a rolar no catálogo inteiro da Loja, com peso igual para
cada item:

```
diverso    d294      arma    d105      armadura & escudo  d30      esotérico  d26
```

contra os `d%` de sempre. O dado mostrado no resultado acompanha.

**O que ela não faz.** Nada de mágico muda: encanto, item mágico específico,
acessório nomeado, poção e melhoria seguem nas tabelas do livro. Quem liga isto
quer mais variedade de bugiganga, não mais poder. E no modo **Padrão** a chave
não vale nem marcada.

### A fonte de cada item

O item que **também** está numa tabela oficial mantém o livro e a página dela —
inclusive os que a Loja grafa diferente (`Completa` ↔ `Armadura completa`,
`Couro` ↔ `Armadura de couro`), pela ponte que o `NOME_NA_LOJA` já fazia. O que
só existe no catálogo mostra a **categoria da Loja** no lugar da referência:

```
📖 Tormenta20  p. 151            (Flechas (20), que está na tabela)
🏪 Catálogo da Loja  Vestuário   (Máscara bucal, que não está)
```

Vale na tela, no `.txt` de exportação e no texto do botão "⧉ Copiar". Imprimir
uma página que não existe seria pior que não imprimir nenhuma.

> **O que dá para melhorar depois:** o catálogo da Loja não guarda livro e
> página por item. Se guardasse, os 455 teriam referência de verdade em vez da
> categoria. É uma mudança em `js/loja_completa.js`, não aqui.

### Onde ver

O **📋 Catálogo de Tesouros** ganhou quatro seções novas, marcadas *"só no
Customizável"*, listando **o que a caixa acrescenta** (198 / 1 / 1 / 0) — e não
o pool inteiro, que repetiria os 100 nomes já listados acima.

### Um achado de dados, à parte

**`Dardos (20)` está no catálogo da Loja e em nenhum dos oito PDFs da pasta.**
Não é de *Tormenta20* (a Tabela 3-4: Munições tem só Balas, Flechas, Pedras e
Virotes), nem de *Heróis de Arton* (a Tabela 3-2: Munições tem Bola de ferro,
Flechas assobiadoras, Flechas de caça, Flechas pesadas e Virotes pesados). Em
*Ameaças de Arton* aparece só como equipamento de uma criatura ("Dardos x20").
Pode ter vindo de outra fonte — vale conferir de onde, um dia.

---

## 3 · Como refazer a conferência

```bash
cd "/c/Users/caiqu/Desktop/RPG/Tormenta 20/Livros"
pdftotext -enc UTF-8 -table "Tormenta20-Edicao-Jogo-do-Ano-17-11-2023.pdf" t20.txt
```

**`-table` é o modo certo para as tabelas destes livros** — melhor que `-layout`,
que interleava as colunas de valor pela posição vertical e embaralhou a Tabela
2-2 de *Ameaças de Arton* até ficar irreconhecível. O `-enc UTF-8` não é
opcional: sem ele o `pdftotext` desta máquina devolve Latin-1 e todo acento vira
lixo.

A página impressa do *Tormenta20* é a página do PDF menos 2.
