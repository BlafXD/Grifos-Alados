# Os materiais especiais — a leva que faltava

**Data:** 13 de outubro de 2026
**Pedido dele:** *"Agora adiciona os ~15 materiais especiais que faltam"* — a
pendência que o mapa das melhorias (`docs/melhorias-limites.md`, §5 e §8) tinha
deixado aberta em 06/10 com o rótulo "leva à parte".

**São 14, e não 15.** O mapa contava a **espada de coral** como material. Ela
não é: é uma *cimitarra de lanajuste* feita pela técnica secreta da Irmandade dos
Pescadores — o mesmo material, numa aplicação que custa **+T$ 1.800 em vez de
+T$ 600** e, de brinde, deixa a vítima sangrando no crítico. Ficou como
observação do lanajuste, que é onde o livro a põe.

---

## 1 · O problema: a melhoria era uma porta sem nada atrás

"Material especial" nunca foi um efeito. É uma **porta**: a melhoria diz que o
item é feito de alguma coisa, e quem dá o benefício é o material. O sistema
parava na porta, em dois lugares:

- o **Gerador de Recompensas** rolava a melhoria e imprimia
  *"** Mestre define o material"*;
- a aba **🔨 Criação de Itens** dizia, com todas as letras, que a Tabela 3-9
  *"não está incluída neste Regras.txt; consulte o livro"*.

E tinha um terceiro, mais silencioso: a entrada `'material especial'` do
"📖 Descrição" trazia **nove** materiais resumidos em uma linha cada — faltavam
cinco (couraça de kaiju, couro de bulette, cristal de sol, pena de kraken e
quitina razza) e nenhum trazia preço.

---

## 2 · Onde estão os 14, e o que cada livro dá

| Livro | Materiais | Tabela de preço |
|---|---:|---|
| Tormenta20, p. 166–167 | 6 | Tabela 3-9 |
| Ameaças de Arton, p. 399–401 | 8 | Tabela 3-4 |
| Heróis de Arton | **0** | — |
| Deuses de Arton | **0** | — |

Os dois últimos foram varridos inteiros. O que eles têm é melhoria (e, no
Heróis, uma magia que **empresta** o mitral: o aprimoramento de +5 PM de *Mão de
Mitral*, p. 255) — material novo, nenhum.

```
Tormenta20        aço-rubi · adamante · gelo eterno · madeira Tollon ·
                  matéria vermelha · mitral
Ameaças de Arton  casco de monstro · couraça de kaiju · couro de bulette ·
                  cristal de sol · lanajuste · pena de kraken · prata ·
                  quitina razza
```

---

## 3 · ⚠ A Tabela 3-9 NÃO se lê por texto

Esta é a armadilha caríssima desta leva, e a mesma da Tab. 3-12 do Heróis e da
Tab. 2-3 do ⚗ Criar Ameaça: **o `pdftotext -layout` devolve a tabela podre de um
jeito que parece sã.** A coluna do **Mitral** é arrancada para cima — as quatro
células dela aparecem empilhadas na linha "Arma" — e as linhas de baixo deslizam
uma coluna para a esquerda:

```
          Item             Aço-Rubi Adamante    Gelo         Madeira    Matéria   Mitral
          Arma                                Eterno         Tollon   Vermelha   + T$ 1.500
                           + T$ 6.000  + T$ 3.000                                + T$ 1.500
                                        + T$ 600             + T$ 1.500  …        + T$ 12.000
          Armadura leve    + T$ 3.000  + T$ 6.000   + T$ 1.500   —   + T$ 6.000   + T$ 3.000
```

Lida assim, a **armadura leve de mitral** custaria +T$ 3.000 (é **1.500**) e a
**pesada** +T$ 18.000 (é **12.000**). Uma conferência que acreditasse no
`-layout` passaria batida, porque a tabela torta continua tendo seis colunas e
cinco linhas.

**O que fechou:** ler o PDF pelas coordenadas, com o leitor do próprio projeto
(`Inútil/_pdf.js` → `textos()`), agrupando as células pelo `x` de cada coluna do
cabeçalho. A Tabela 3-4 do Ameaças foi lida do mesmo jeito — e nela cada linha
sai como **um único bloco de texto**, o que a torna inequívoca:

```
131.1  "Casco de monstro+T$ 750+T$ 750+ T$ 6.000+T$ 750+T$ 6.000"
129.1  "Lanajuste+T$ 600+T$ 1.500+T$ 3.000+T$ 1.500+T$ 3.000"
127.4  "+T$ 600+T$ 1.500+T$ 3.000+T$ 1.500+ T$ 400"   ← a linha da prata
```

Dois números que parecem erro de digitação e **são do livro**: casco de monstro
em esotérico custa **+T$ 6.000** (oito vezes o que custa em arma) e a prata em
esotérico custa **+T$ 400** — não 4.000.

> **Para a próxima vez:** tabela de preço com muitas colunas não se confere por
> texto, em nenhum dos dois modos do `pdftotext`. São dez minutos de `_pdf.js`.

---

## 4 · O que cada material aceita — e a ausência é regra

No `js/materiais-data.js` cada material tem um objeto `slots` com até cinco
chaves: `arma`, `armaduraLeve`, `armaduraPesada`, `escudo`, `esoterico`. **A
chave só existe quando o livro dá aquela linha ao material**, e é assim que as
proibições entram sem precisar de teste nenhum:

| Material | O limite, e de onde sai |
|---|---|
| **Couro de bulette** | **não vai em arma nem em escudo** — o verbete só traz as linhas "Armadura" e "Esotérico" |
| **Madeira Tollon** | **não vai em armadura** (a Tabela 3-9 imprime "—" nas duas linhas) e, em arma, só nas de madeira: *"arcos, bordões, clavas, lanças, piques e tacapes"* — lista fechada; em escudo, só nos **leves** |
| **Cristal de sol** | em **arma**, só nas de **corte ou perfuração** (o próprio verbete diz) |

Três materiais têm regra que não é restrição e virou observação no card: a
**prata** é revestimento e pode se combinar com um segundo material (cada um
contando como uma melhoria separada), a **matéria vermelha** impõe –2 em perícias
de Carisma (exceto Intimidação) e o **casco de monstro** é frágil (+1 ponto de
dano por dado de impacto num item mundano).

E a regra-mãe, que vem do T20 p. 166: **ferramenta e vestuário recebem outras
melhorias, mas não recebem material especial.** É por isso que `slotDoItem`
devolve `null` para elas — e com isso o gerador cai de volta no aviso antigo em
vez de inventar um material.

### A única conta que é nossa, e está marcada
A madeira Tollon aceita "escudos **leves**", e **os livros nunca classificam os
sete escudos do catálogo** — só os nomeiam. `ESCUDOS_LEVES` é lido da linha de
regra de cada um: bônus de Defesa +1 (ou nenhum) e penalidade –1, que é o degrau
do *Escudo leve* do livro. Dá **Escudo leve, Escudo de couro e Broquel**; ficam
fora o Escudo pesado, o de vime, o torre e o Sagna. É a mesma política dos
quadrados: quando o livro não imprime, a conta é nossa e vem escrita.

---

## 5 · Como o sorteio ficou

Quando a melhoria cai em **"Material especial"**, `sortearMaterial()` também
rola o material — **uniforme entre os que caibam naquele item**, com o dado do
tamanho real do pool (d14, d13, d9…), do mesmo jeito que o sorteio no catálogo
inteiro da Loja mostra d321. O card desenha, abaixo da melhoria:

```
◇ Melhoria 2: Material especial   ⚠ ** O material sai sorteado junto (Tabelas 3-9 e 3-4)
   ◇ d13 = 4 → Madeira Tollon   [Arma] [+T$ 1.500]
      ◇ Conta como mágica para vencer redução de dano. Habilidades ativadas ao
        fazer um ataque ou usar a ação agredir têm o custo reduzido em –1 PM.
      ◇ 📖 Tormenta20  p. 167
```

O material entra também no **nome montado** ("Espada longa (certeira, Material
especial: Adamante)"), no **preço somado**, no **"⧉ Copiar tudo"**, no **.txt
exportado** e no **histórico** das últimas rolagens.

### Os cinco que o livro não vende
A nota da Tabela 3-4 diz: *"materiais não listados são raros e não são
encontrados à venda"*. São **couraça de kaiju, couro de bulette, cristal de sol,
pena de kraken e quitina razza**, e o que a fabricação cobra deles são **peças**
do monstro (1, ou 3 numa armadura pesada), não T$.

Eles **continuam no pool por padrão**, porque tesouro é achado, não comprado — um
monte com uma armadura de couraça de kaiju é exatamente o que *"obtido apenas a
partir de um kaiju abatido"* descreve. O card e o .txt avisam que o item não tem
preço de mercado, e o total mostrado é o do resto. Quem quiser tesouro que caiba
na nota tem, no modo **Customizável**, a caixa "🪨 Materiais especiais → deixar
sair também os 5 raros" para desmarcar: aí o pool cai para os 9 com preço.

### Uma decisão de mesa que vale conferir
**Munição paga metade do acréscimo das melhorias e dos encantos** (T20, p. 151:
*"uma munição com uma melhoria, por exemplo, custa +T$ 150, em vez de +T$ 300"*).
O preço do material **não** foi dividido pela metade: ele é parcela à parte
("pago **além** do preço da melhoria", T20 p. 166) e tem tabela própria, e o
exemplo do livro fala da Tabela 3-7. Então um pacote de flechas de mitral com uma
melhoria sai por T$ 1 + 150 + 1.500 = **T$ 1.651**. Se a sua mesa ler que
"aumento no preço de um pacote de munição superior" inclui o material, é meia
linha em `precoMontagem` — está comentada lá.

---

## 6 · Como foi conferido

Sem navegador (a extensão do Chrome não estava conectada), mas pelo mesmo código
que a página roda: `js/loja_completa.js` + `js/materiais-data.js` +
`js/recompensas.js` carregados num contexto com DOM de mentira.

- **os dois números das tabelas**, célula por célula, contra as coordenadas do
  PDF — as duas fecham;
- **161 itens do catálogo** podem receber material (105 armas, 12 armaduras
  leves, 11 pesadas, 7 escudos, 26 esotéricos), e a lista de quem aceita cada
  material foi conferida por extenso: a madeira Tollon cabe em **42** (13 armas
  de madeira + 3 escudos leves + 26 esotéricos) e o cristal de sol em **73 das
  107 armas**;
- **60 000 itens superiores sorteados**, 150 078 melhorias, **18 989** delas
  "Material especial": nenhum material caiu em slot que não aceita, nenhum preço
  ou número de peças divergiu da linha certa da tabela, e **todos os 14 saíram**;
- quem apareceu em cada slot bate com o livro — **13** em arma e em escudo (fora
  o couro de bulette), **13** nas duas armaduras (fora a madeira Tollon) e os
  **14** em esotérico;
- o **preço** foi provado nos três casos que importam: espada longa + 1 melhoria
  + adamante = T$ 3.315 (15 + 300 + 3.000); com pena de kraken, T$ 315 e o aviso
  de que não há preço de mercado; flechas (20) + 1 melhoria + adamante =
  T$ 1.651;
- as **14 fichas** respondem no "📖 Descrição" (`ItensDescricoes.get('Adamante')`
  e os outros treze), sem colidir com nenhuma chave que já existia — e `prata`
  não atropelou o `medalhao de prata`;
- o desenho do card e o texto do "⧉ Copiar tudo" foram varridos em busca de
  `undefined`, `NaN` e `T$ null`: nenhuma ocorrência.

---

## 7 · O que mudou no projeto

| Arquivo | O que |
|---|---|
| `js/materiais-data.js` | **novo** — os 14 materiais, as duas tabelas de preço, as listas fechadas, as restrições e as fichas do "📖 Descrição" |
| `js/recompensas.js` | `sortearMaterial()`, o material dentro de `rolarMelhorias`, `linhaMaterial()` no card, a parcela do material em `precoMontagem`, `_recTxtMaterial()` no .txt, duas seções novas no Catálogo de Tesouros e o filtro `materiaisRaros` |
| `js/criacao-itens-data.js` | o card "Materiais especiais" virou três: a regra, a **Tabela 3-9** e a **Tabela 3-4** — montadas do `GA_MATERIAIS`, para não existir uma segunda verdade da mesma tabela |
| `js/itens-descricoes.js` | `materialDesc()` na cadeia de busca |
| `js/itens-descricoes-extra-data.js` | a entrada `'material especial'` deixou de repetir nove materiais resumidos e passou a ser a porta que aponta para as 14 fichas |
| `index.html` · `jogadores.html` | a tag do script novo e, no index, a caixa "🪨 Materiais especiais" do Customizável |
| `css/style.css` | as etiquetas do material no card (`.rc-mat-*`) |

Nada precisou mudar nas regras do Firebase, e nada aqui toca o banco.

---

## 8 · O que ficou de fora, de propósito

- **Ferramenta e vestuário** continuam sem sortear como item superior (a Tabela
  8-4 do livro só manda rolar arma, armadura/escudo e esotérico), então as duas
  melhorias de perícia — *Aprimorado* e *Multifuncional* — seguem só na aba de
  Criação de Itens e no "📖 Descrição". Isso é da outra pendência do mapa, não
  desta.
- **Combinar dois materiais no mesmo item** (a licença que a prata dá) é coisa do
  Mestre: a melhoria não sai duas vezes no mesmo item, e forçar isso seria
  inventar uma regra de sorteio que o livro não tem. A observação da prata no
  card diz que pode.
- **Os recursos naturais** do Ameaças (p. 401–402: carapaça, couro, fonte,
  ingrediente, mantimento, osso, sucata, com as Tabelas 3-5 e 3-6) são outra
  coisa — matéria-prima de fabricação, não material especial. Não entraram, e
  valem uma leva própria se ele quiser.
