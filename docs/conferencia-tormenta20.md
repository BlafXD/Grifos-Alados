# *Tormenta 20 — Edição Jogo do Ano* — conferência do bestiário

Feita em **28/08/2026**, contra o PDF do livro. É a segunda rodada do roteiro
"livro por livro": a primeira foi [*Ameaças de Arton*](duvidas-ameacas-de-arton.md).

**Resultado: o bestiário está completo e correto. 80 de 80 fichas, zero divergência de
ND, nenhuma faltando — e agora todas com papel de combate.**

---

## 1. As fichas conferem com a Tabela 7-1

O livro traz a **Tabela 7-1: Criaturas por Nível de Desafio** (p. 285), que é para o
Tormenta 20 o que o Apêndice C é para o *Ameaças de Arton*: a lista fechada do que o
capítulo tem. Ela foi extraída do PDF e cruzada com as fichas do sistema.

```
80 na Tabela 7-1  ×  80 no sistema  →  ZERO divergência de ND, nada faltando
```

Distribuição por ND na tabela:
`1/4=6 · 1/2=5 · 1=8 · 2=11 · 3=10 · 4=6 · 5=8 · 6=5 · 7=4 · 8=3 · 9=3 · 10=3 · 11=2 · 12=1 · 13=1 · 14=1 · 15=1 · 16=1 · 20=1`

O único nome que não casou de primeira é **erro de impressão do próprio livro**: a
Tabela 7-1 escreve "**Fintroll** feitor", com um *n*, enquanto o statblock (e o sistema)
escrevem "Finntroll Feitor". Mesma criatura, ND 6, seção Trolls Nobres. O sistema já
guardava a grafia da tabela como `alias`.

---

## 2. O papel de combate — 80 de 80

Mesma técnica de *Ameaças de Arton*: o papel é um **ícone vetorial** ao lado do nome, e
o diagramador usa sempre o mesmo path para o mesmo papel. Assina-se a geometria e
compara-se com a legenda que o próprio livro imprime.

```
node "Inútil/_extrair-papeis.js" t20      # lê o PDF → Regras - Tormenta 20 (papéis).txt
node "Inútil/_gerar-fichas-t20.js"        # o papel entra nas fichas
```

**Cada livro tem seu próprio desenho.** Os paths do Tormenta 20 não são os mesmos de
*Ameaças de Arton* — são maiores:

| Papel | *Ameaças de Arton* | *Tormenta 20* |
|---|---|---|
| solo | 1874 bytes de path | 2148 bytes |
| lacaio | 1468 | 1691 |
| especial | 1089 | 1246 |

Por isso o script não usa assinaturas fixas: ele **acha a legenda sozinho**, procurando
a página em que aparecem as palavras "Solo." / "Lacaio." / "Especial." e pegando o ícone
que fica à esquerda de cada uma. Funciona nos dois livros sem configuração.

### Como se sabe de quem é cada ícone

Aqui o casamento é diferente do *Ameaças de Arton*. Naquele livro metade dos nomes vem em
fonte CID e sai vazia, então foi preciso página + ND + tipo. Aqui a saída foi melhor:
**os ícones em ordem de leitura correspondem às fichas na ordem do arquivo de dados**, e
dá para provar isso — as **80 linhas de tipo batem uma a uma**:

```
conferência: 80/80 linhas de tipo batem na ordem de leitura ✓
```

O script **aborta** se alguma divergir. Não é um casamento por confiança: é verificado.

### O resultado

| Papel | Quantas | % |
|---|---|---|
| **solo** | 44 | 55% |
| **lacaio** | 24 | 30% |
| **especial** | 12 | 15% |

Sanidade — o livro diz que lacaio vem em bando com ND menor e solo são os grandes
monstros:

| Papel | n | ND mediano | mín–máx |
|---|---|---|---|
| lacaio | 24 | **1** | 1/4 – 8 |
| especial | 12 | 6 | 3 – 10 |
| solo | 44 | **5** | 1 – 20 |

Por seção, lê como decisão editorial:

| Seção | solo | lacaio | especial |
|---|---|---|---|
| 🐉 Os Dragões | **7** | 0 | 0 |
| 🌿 Os Trolls Nobres | 4 | 0 | 1 |
| 🏞 Ermos | 12 | 5 | 1 |
| 🕳 Masmorras | 7 | 4 | 0 |
| 💀 Reinos dos Mortos | 2 | **5** | 1 |
| 🪓 Os Duyshidakk | 3 | 2 | 3 |
| 🐍 Os Sszzaazitas | 3 | 4 | 2 |
| ⚜ Os Puristas | 3 | 2 | 2 |
| 🌀 A Tormenta | 3 | 2 | 2 |

Dragões: 7 solo, nenhum lacaio — exatamente como em *Ameaças de Arton*.

---

## 3. O que foi preciso construir para chegar aqui

O `Inútil/_pdf.js` (o leitor de PDF do projeto) ganhou duas coisas que este livro exigiu
e que valem para qualquer livro futuro:

**Descriptografia.** O PDF do Tormenta 20 é **cifrado em AES-256** (AESV3, revisão 6) —
é o caso dos PDF comprados com marca d'água personalizada. Abre sem pedir senha, mas o
conteúdo é cifrado. O leitor agora deriva a chave do arquivo a partir da senha de usuário
vazia (Algoritmo 2.B da ISO 32000-2) e decifra os streams. Sem isso, **nenhuma** das 407
páginas era legível.

**Fontes CID.** Quase todo o texto deste livro é escrito com fontes de subconjunto, em
que o content stream traz códigos, não letras. O leitor agora lê o `/ToUnicode` de cada
fonte e traduz. De quebra, a extração de texto virou um interpretador sequencial de
verdade, que acompanha `Tf`/`Tm`/`Td` na ordem — antes ela presumia que `Tm` vinha antes
de `Tf`, que é a ordem do *Ameaças de Arton* mas não a deste livro.

---

## 4. Situação dos quatro livros da aba

| Livro | Fichas | Papel de combate |
|---|---|---|
| **Ameaças de Arton** | 430 | ✅ 429 (só o Rival Espelho fica sem, e é certo) |
| **Tormenta 20** | 80 | ✅ 80 |
| **Deuses de Arton** | 66 | ⏳ o livro **usa** os mesmos ícones do Tormenta 20 — 63 encontrados no PDF. É o próximo. |
| **Guia de NPCs** | 94 | — o livro não usa papel de combate |

> **Sobre o Guia de NPCs:** não é omissão. Varri o PDF inteiro atrás dos seis desenhos
> conhecidos (três do Tormenta 20, três do *Ameaças de Arton*) e não há nenhum. Faz
> sentido: o livro é sobre gente comum, não sobre encontros.
