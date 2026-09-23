# Revisão completa do sistema — magias, poderes e o resto

**Feita em 22 de setembro de 2026**, a pedido dele: *"consegue fazer uma REVISÃO
COMPLETA de tudo do sistema? Desde as magias, até os poderes?"*. No mesmo pedido
veio a mudança da busca de descrições — *"preciso que TODOS os poderes apareçam
na opção 'Descrição', porque é bem útil na verdade!"* —, que está no fim.

É a quarta conferência do projeto por este método: depois das 680 fichas prontas
(`conferencia-fichas-prontas.md`), dos itens (`conferencia-itens.md`) e dos
bestiários, agora as duas bases que nunca tinham passado por ele: **as 254 magias
e os 808 poderes**.

## O método, e a armadilha que quase o estragou

Cada entrada é quebrada em **sondas de 8 palavras seguidas**, e cada sonda é
procurada no texto do PDF do livro dela. Sondar em pedaços é o que sobrevive à
quebra de página e ao rodapé; procurar a entrada inteira falharia em quase todas.

**A armadilha: o `pdftotext` desta máquina escreve em Latin-1, não em UTF-8.**
Lido como UTF-8, "você" vira "voc", "força" vira "for a" — e a conferência
acusou **459 dos 460 poderes** como divergentes. Com `-enc UTF-8` a mesma
varredura acusou 11. **Toda conferência futura contra PDF precisa do
`-enc UTF-8`.**

Outros três ajustes que separam defeito de artefato do extrator:

| O que o PDF faz | O que a conferência faz |
|---|---|
| marca d'água, número de página e título corrente **no meio do parágrafo** | tira essas linhas antes de comparar |
| quebra `mortos-vivos` na linha e devolve `mortos- -vivos` | junta os dois hifens |
| imprime "Pré-requisito**s**:" no plural quando há dois | compara o CONTEÚDO do pré-requisito, sem o rótulo |
| enfia tabela de classe, legenda e olho-de-página dentro do parágrafo | sonda **parágrafo a parágrafo**, e o resto se confere à mão |

## ✨ As 254 magias

**232 batem palavra por palavra** na primeira passagem; as 22 restantes foram
lidas à mão contra o PDF, e **10 eram defeito nosso**. Todas do mesmo tipo: o
hífen que o livro quebrou na linha e a colagem comeu.

| Magia | Estava | Livro |
|---|---|---|
| Couraça de Allihanna | "aprimoramentos ao lança**la**" | lançá-**la** |
| Desfazer Engenhoca | "a CD para ativa**la**" | ativá-**la** |
| Euforia de Valkaria | "impedindo**o** de ser intimidado" | impedindo-**o** |
| Farejar Fortuna (aprim.) | "um item recém**encontrado**" | recém-**encontrado** |
| Piscar | "chance de não afeta**lo**" | afetá-**lo** |
| Poção Explosiva (aprim.) | "uma palavra**chave**" | palavra-**chave** |
| Posse de Arsenal | "você pode invoca**lo**" | invocá-**lo** |
| Couraça de Allihanna (aprim.) | "custam **– 1** PM" | **–1** PM |
| Toque de Megalokk | "sofre **– 5** nas demais perícias" | **–5** |
| Orbe do Oceano (aprim.) | "sofra apenas metade do dano" | apenas **a** metade |

Depois do conserto: **239 batem palavra por palavra**, e as 15 restantes foram
conferidas uma a uma — são o extrator, não o dado. As mais ilustrativas:

- **Buraco Negro** e **Ligação Sombria**: o PDF enfia a palavra "MAGIA" (a aba
  lateral da página) no meio da frase;
- **Controlar a Gravidade**: o extrator perde a ligadura "fl" — o livro sai com
  "utuando" no lugar de "flutuando";
- **Momento de Tormenta**: o livro escreve "os fenômenos a seguir**.**" e nós
  "a seguir**:**" — deixado como está, porque os dois pontos é que anunciam a
  lista que vem;
- **Couraça de Allihanna**, 5º aprimoramento: **o livro tem um erro de digitação**
  ("o alvo é recoberto esporos de cogumelo", sem o "de"); nós escrevemos certo, e
  fica assim.

**Estrutura: nada a corrigir.** Nenhum id repetido, nenhum nome repetido, todo PM
bate com a tabela do círculo (1→1, 2→3, 3→6, 4→10, 5→15), toda escola existe,
todo `tipo` combina com as `listas`, nenhum aprimoramento sem PM ou sem texto.

> **O `magias-data.js` não tem mais gerador.** O `Inútil/Regras.txt` de hoje não
> traz mais as magias (foi reescrito para outras levas), então o arquivo é a
> ÚNICA cópia — e o conserto foi nele, de propósito.

## ✨ Os 808 poderes

**449 + 341 batem palavra por palavra** na primeira passagem. À mão, **dois eram
defeito nosso**:

1. **Desarmar Aprimorado** (Tormenta20, p. 125) — faltava um **"e"**: o livro diz
   "assim por diante) **e** 1d6 para a distância".
2. **Estilo de Duas Armas** (p. 125) — o quadro **"Poderes Gerais: Usar ou Não?"**,
   que é uma coluna lateral do capítulo, estava **colado no fim do texto do
   poder**. Quem abrisse Estilo de Duas Armas na ficha lia um ensaio sobre usar ou
   não poderes gerais como se fosse regra da manobra. Passou para o campo
   `quadro`, que a ficha já desenha como caixa à parte (o mesmo lugar do Javali
   Doherita) — assim o texto do livro não se perde e não se confunde com o poder.

As 14 restantes foram lidas à mão: **são todas artefato do PDF**. O padrão mais
comum é a **tabela da classe** impressa no meio do parágrafo (Canalizar Energia,
Companheiro Animal, Golpe Pessoal, Fuga Formidável, Sacrário da Misericórdia), e
depois a legenda de imagem (Âmago de Escultor, Inspiração Concedida) e o título
corrente (Espírito de União). As tabelas de **Meditação Autoafirmativa** e **Nimb**
foram conferidas no `-layout`: as CDs 15/20/25/20/20/17/22 e as seis linhas do
1d6 estão certas — o `-raw` é que perde a coluna.

**Estrutura: nada a corrigir.** Nenhum id repetido, nenhum poder sem texto ou sem
página, todo livro e todo grupo conhecidos, toda classe existe na ficha, e a
contagem que cada lista declara bate com a quantidade de poderes que ela tem.

## 🌀 As 35 condições

**35 de 35.** A única acusada (Lento) tem a legenda "aventureiros enfrentam todo
tipo de situação adversa" impressa no meio do parágrafo, duas vezes.

## Varredura tipográfica nas 38 bases

A classe de defeito das magias foi procurada em **todas** as bases do site.
Achou mais cinco, nos mesmos moldes:

| Arquivo | Estava | Fica |
|---|---|---|
| `itens-descricoes-data.js` | "o custo para lança**la**" | lançá-**la** |
| `itens-descricoes-data.js` | "você precisa empunha**la**" | empunhá-**la** |
| `itens-descricoes-data.js` | "ação padrão para arremessa**la**" | arremessá-**la** |
| `itens-descricoes-data.js` | "Mortos**–**vivos" (traço de meia) | Mortos**-**vivos |
| `npcs-lendas-data.js` | "compulsão de protege**lo**" | protegê-**lo** |

O do `npcs-lendas-data.js` foi consertado **no `Inútil/Regras.txt`** e o arquivo
regerado — antes disso o gerador foi rodado sem mudar nada e reproduziu o arquivo
commitado byte a byte, que é a regra da casa. Os outros quatro foram no próprio
`-data.js`: o `Texto Importante!.txt` que os gerou não está no repositório.

Depois do conserto, **as 38 bases passam limpas** pelos seis padrões (ênclise sem
hífen, pronome grudado, composto grudado, traço solto antes de número, hífen
invisível e hífen duplo de quebra).

## O que NÃO se confere por texto

`acoes-data.js`, `regras-itens-data.js` e `magia-regras-data.js` **são resumos de
propósito** — o cabeçalho deles diz "Transcrito de…", e o texto vira lista de
tópicos ("Padrão — executa uma tarefa"). Comparar palavra por palavra com o livro
acusaria 27 "erros" que não são erros. O que se conferiu neles foram os
**números**, que é onde um erro machuca: o limiar de morte (–10 ou metade dos PV
totais, com o exemplo do Oberon), o teste de Constituição CD 15 do sangramento, o
mínimo de 3m da investida, o Reflexos CD 20 da beirada e os 50% do ataque à
distância contra quem está agarrado. **Todos batem.**

## Estrutura do site inteiro

| Conferência | Resultado |
|---|---|
| arquivos que `index.html` (105), `jogadores.html` (80) e `mudanca.html` pedem | ✔ todos existem |
| sintaxe dos 86 arquivos de `js/` | ✔ todos compilam |
| `js/` que nenhuma página carrega (peso morto) | ✔ nenhum |
| lista de poder de classe sem classe na ficha | ✔ nenhuma |
| variante de classe sem classe na ficha | ✔ nenhuma |
| classe básica sem lista de poderes | ✔ nenhuma |
| slug de condição repetido · tipo de efeito desconhecido | ✔ nenhum |
| poder concedido que só existe na base dos devotos | ✔ nenhum (os 147 estão entre os 208) |
| as 13 abas do `index.html` e as 7 do `jogadores.html` | ✔ desenham, console sem um erro |

## 🔎 TODOS os poderes na Descrição

A busca do **※ Descrição** (e do 🔎 "Esse item já existe?") indexava itens,
magias, condições, pratos, ingredientes e **só os 147 poderes concedidos** dos
devotos. Agora indexa **os 808**: os 460 de fora de classe e os 348 de classe.

Cada poder entra com o texto que se quer ler sem abrir o PDF, na ordem do livro:

```
Poder de combate. Sempre que faz um ataque corpo a corpo, você pode sofrer
–2 no teste de ataque para receber +5 na rolagem de dano.
Pré-requisito: For 1. (Tormenta20, p. 124)
```

- a etiqueta diz de que **tipo** ele é — *poder de combate*, *poder concedido*,
  *poder da Tormenta*, *poder de raça*, e nos de classe *poder de guerreiro*,
  *poder de caçador*…;
- os **deuses** de um concedido e as **raças** de um poder de raça entram entre
  parênteses, porque é o que o livro imprime ao lado do nome;
- **habilidade mágica** (o ✦ do livro), **pré-requisito**, **custo** e o **quadro**
  entram cada um no seu lugar, e a **página** fecha o texto;
- os 16 nomes que se repetem entre classes (Aumento de Atributo está nas 16) viram
  **uma linha só** quando o texto é igual, dizendo de quantas classes ele é — senão
  buscar "aumento" enchia a lista com a mesma coisa dezesseis vezes;
- os 147 concedidos dos devotos **não duplicam**: os 208 da base de poderes vêm
  primeiro, e a base dos devotos só entra com o que faltar (hoje, nada).

**Conferido**: os **808** poderes são achados pelo nome na busca, nas duas
páginas; escolher um enche a caixa com o texto inteiro; e o console fica limpo.

## Uma coisa que a revisão mostrou e que NÃO foi feita

**Habilidade de classe não é poder de classe, e o site não tem as habilidades.**
Procurar "Ataque Furtivo" na Descrição não acha nada: o que está nas bases são os
*poderes* que cada classe escolhe, não as habilidades que ela ganha de graça
(Ataque Furtivo, Evasão, Durão, Especialista…). Elas estão na tabela de cada
classe no livro, e fora do site. Fica anotado — é a próxima base, se ele quiser.
