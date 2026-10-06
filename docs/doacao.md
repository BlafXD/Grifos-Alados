# A caixa de doações (Pix)

Dois gatilhos, um modal, nenhum canto novo ocupado. Tudo em `js/doacao.js`
(o gerador de QR vem junto) e no bloco final do `css/style.css`.

## Onde aparece

| Gatilho | Onde | Por quê |
|---|---|---|
| `Preço: 3 Tibares` | cabeçalho de `index.html` e `jogadores.html` | o texto já existia (era a piada da capa); virou botão e não ocupou espaço nenhum |
| `♦ Apoiar a gazeta · Pix ♦` | rodapé das duas páginas | o rodapé é o mesmo em todas as 13 abas, então aparece sempre |

Os dois cantos de baixo **já eram** das rolagens ao vivo (esquerda) e do 📡
(direita) — por isso nada flutua. Qualquer elemento novo com
`data-ga-doar` passa a abrir a caixa também: o clique é delegado no
documento.

## O código do Pix

A carga fica numa constante só, no alto do `js/doacao.js`:

```
00020101021126580014br.gov.bcb.pix0136<chave>5204000053039865802BR5915CAIQUE H BODNAR6013SAO JOSE DOS 62070503***6304DCC9
```

É o formato EMV®, em blocos de `id + tamanho + valor`:

| id | valor | o que é |
|---|---|---|
| `00` | `01` | versão do formato |
| `01` | `11` | **estático** — pode ser pago quantas vezes quiser |
| `26` | `br.gov.bcb.pix` + a chave aleatória | a conta que recebe |
| `52` | `0000` | ramo do comércio: nenhum |
| `53` | `986` | moeda: real |
| `58` | `BR` | país |
| `59` | `CAIQUE H BODNAR` | o nome que aparece no app de quem doa |
| `60` | `SAO JOSE DOS ` | cidade (o banco corta em 13 letras) |
| `62` | `***` | identificador livre |
| `63` | `DCC9` | **CRC16** de todo o texto acima |

Não existe bloco `54`: a carga **não tem valor** — quem doa digita quanto
quiser.

### Para trocar de chave

Gere a carga nova no app do banco ("Pix Copia e Cola" / "QR Code") e cole
inteira por cima da constante. **Não edite um pedaço**: o `6304XXXX` do fim
é o CRC16/CCITT-FALSE de tudo que vem antes, e um caractere trocado faz o
banco recusar o código. Para conferir uma carga à mão:

```js
let crc = 0xFFFF;
for (const ch of carga.slice(0, -4)) {          // tudo menos os 4 do fim
  crc ^= ch.charCodeAt(0) << 8;
  for (let i = 0; i < 8; i++) crc = (crc & 0x8000) ? ((crc << 1) ^ 0x1021) & 0xFFFF : (crc << 1) & 0xFFFF;
}
crc.toString(16).toUpperCase();                 // tem de bater com os 4 últimos
```

## O QR é desenhado aqui

`GA_QR.matriz(texto)` (no mesmo arquivo) devolve a matriz do QR em modo
byte, nível M, versões 1 a 10 — a carga do Pix cabe na versão 8 (49×49).
Nenhuma imagem é baixada e nenhum serviço de fora vê a chave; funciona
offline e até em `file://`.

Conferido de duas formas, em 06/10/2026:

1. **módulo a módulo** contra a biblioteca `qrcode` do npm (uma
   implementação independente): matrizes idênticas em todos os tamanhos
   testados, de 1 a 213 bytes;
2. **de ponta a ponta**: o `<svg>` que o site monta foi rasterizado e lido
   pelo `jsQR` (outro decodificador), que devolveu a carga do Pix
   caractere por caractere.

> As duas bibliotecas foram usadas **só na conferência**, no scratchpad da
> sessão. O site não depende de nenhuma delas.

O selo é preto no branco de verdade, não no pergaminho: o leitor do banco
é o único "usuário" do site que não perdoa pouco contraste. A moldura
dupla em volta é que faz ele parecer colado na folha.

## Detalhes que custaram pensamento

- **O botão de copiar não tem código próprio.** Ele é um `[data-ga-copiar]`,
  e quem copia é o ouvinte que o `js/itens-descricoes.js` já mantinha para
  a Loja e as Recompensas — com o "✓ Copiado!" verde e o plano B do
  `execCommand` para quando o navegador barra a área de transferência.
  Por isso o ⧉ mora no **texto** do botão: o aviso troca o `textContent`
  e devolve o rótulo inteiro depois.
- **O `<svg>` é `aria-hidden`.** Para quem usa leitor de tela a informação
  é a carga em texto, logo abaixo; um quadrado de pontinhos não diz nada.
- **No dedo** (`@media (pointer: coarse)`, em `css/acessibilidade.css`) o
  botão do rodapé cresce para 2,75rem como os outros botões do site, e o
  preço do cabeçalho ganha 2rem de altura **de verdade** — não o
  `.ga-alvo`, cujo retângulo invisível comeria o toque da linha de data
  logo acima, que é vizinha e não tem para onde fugir.
- O nome e a cidade **aparecem** no modal porque já estão dentro da carga:
  todo Pix mostra o nome de quem recebe no app de quem paga.
