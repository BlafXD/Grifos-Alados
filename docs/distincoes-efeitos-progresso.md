# Distinções automáticas em criaturas — o que ficou automático e o que não

**Aberto em:** 23 de outubro de 2026, a pedido dele: dar a um NPC/criatura os poderes de
uma distinção (Heróis de Arton ou Deuses de Arton) e o que é número simples — teste de
ataque, dano, Defesa, resistência, imunidade — já entrar sozinho, sem conta na mão.

**Onde mora:** aba ⚔ Combates (Painel de Combate), `js/monstros.js`, bloco nova "🎖
Distinções" dentro de cada criatura (igual ao "🩸 Poderes da Tormenta" que já existia). A
tabela do que é automático está em `js/distincoes-efeitos-data.js`. Não toca na ficha do
jogador nem no "✨ Poderes" — é só pra criatura do mestre.

## Como funciona

- **＋ Distinção** abre uma lista achatada dos 365 poderes (marcas primeiro em cada
  distinção, 🏷), busca por nome do poder OU da distinção. Marcar/desmarcar funciona como
  os Poderes da Tormenta.
- Cada distinção anexada vira um cartão com a conta de `n` (poderes daquela distinção,
  marca não conta — mesma regra de `js/ficha-distincoes.js`) e o texto de cada poder.
- **O que entra sozinho DE VERDADE (na rolagem):**
  - **Teste de ataque e dano** — soma no bônus que já aparece nos botões 🎯/💥 da caixa
    "Ataque e Habilidades" (o número final já sai certo ao clicar).
  - **Fortitude, Reflexos, Vontade, Iniciativa, Percepção** — soma ao clicar o 🎲 de cada
    um desses stats (a fórmula no log mostra "base + N distinção").
  - **Imunidade a um tipo de condição** (medo, mental, veneno, cansaço, atordoamento) —
    bloqueia a condição correspondente no modal "＋ Condição" (aparece cinza, 🚫, com o
    nome do poder que imuniza) e some da lista se já estiver marcada.
- **O que entra sozinho DE LEITURA (o mestre soma na mão)**, exatamente como o bloco da
  Tormenta já fazia pela Defesa/Carisma: Defesa, deslocamento, PV, PM, redução de dano e
  outras resistências (ex. "resistência a magia +N") aparecem calculados no cartão e, se
  forem sem condição, também na grade de atributos (`(+N distinção)` ao lado do rótulo) —
  mas não escrevem no campo Padrão/Atual, porque esses campos continuam editáveis à mão.
- **Bônus condicional de ataque/dano** (ex. "sob a Postura de Combate: Tomada Furtiva",
  "com armas de fogo") ganha um interruptor (☐/☑) no cartão do poder — só entra no botão
  de rolar enquanto ligado. O resto do texto (Defesa condicional etc.) só mostra a nota.

## Por que a maioria dos 365 poderes NÃO entrou na conta

Fechado o levantamento das **365 fichas** (uma a uma, lidas de `js/poderes-raca-origem-data.js`):
**28 poderes/marcas** (de 24 distinções diferentes) tinham um número fixo que dava pra
automatizar sem inventar nada. O resto — a enorme maioria — cai em alguma destas:

1. **Gasta PM por uso, numa quantidade que você escolhe na hora** (ex.: Predadora da
   Amazona, quase toda a Bruxo da Tormenta, Graça de Khalmyr). O número não é fixo — é
   limitado por algo (PM, Carisma, nível), mas quem decide quanto gastar é o mestre, a
   cada ativação. Não tem como automatizar sem adivinhar.
2. **Depende de magia específica** (CD ou dano de UMA magia, de um tipo elemental
   escolhido, ou de um item esotérico) — o sistema não sabe qual magia ou elemento o
   mestre vai usar naquele instante. Ex.: Mestre Dracônico (dracomante), Palma Mística
   (mahou-jutsu), quase toda a Numeromante e a Teurgista Hermético.
3. **Exige uma escolha feita uma vez** (estilo de combate, cabriola, pose, conceito do
   Akzath, elemento do mestre) que o sistema não tem onde guardar sem criar uma tela nova
   pra cada caso. Ex.: Estilo de Combate Arcano (guerreiro mágico), Cabriolas de Bobo,
   Pose de Combate (herói henshin).
4. **Afeta os INIMIGOS ou os ALIADOS**, não a própria criatura (debuff em quem foi
   atingido, buff em quem está na área) — dar isso automático exigiria escolher o alvo
   certo na cena, fora do que este bloco cobre. Ex.: Entortar Escamas (caçador de
   dragões), Içar a Bandeira Preta, a maioria da Dançarina de Marah.
5. **Fabrica, invoca ou ressuscita algo** — item, aliado, montaria, poção — e o valor
   certo depende de escolhas (tipo da montaria, qual item). Ex.: quase toda distinção que
   dá um parceiro/montaria (Amazona, Ginete de Namalkah, Cavaleiro da Luz, Tirano do
   Terceiro…), todas as 6 de Mestre Cozinheiro, Mestre dos Desejos, Engenhoqueiro Goblin.
6. **É sorte/dado aleatório por rodada ou cena** (ex.: Lógica Alcoólica rola 1d6 e dá um
   bônus DIFERENTE por rodada; Sorte Visitante e quase toda a Sortudo de Nimb) — não dá
   pra "já aplicar" uma coisa que muda a cada rolagem sem rolar o dado certo na hora.
7. **Só afeta perícia, não combate** (Diplomacia, Ofício, Investigação, Nobreza…) — a
   ficha de criatura deste sistema não tem um bloco de perícias com bônus somável; fica
   só no texto, como já era.
8. **Precisa ler o atributo da própria criatura** (ex. "soma sua Sabedoria na Defesa") —
   o sistema não lê o modificador de atributo da caixa de texto livre "Atributos" de
   forma confiável; fica pro mestre.

Nada disso é bug nem "esquecimento" — é a mecânica real do livro, que entrelaça número
com escolha. O texto de TODO poder continua no cartão da distinção, igual sempre esteve.

## As 28 entradas que entraram (os 24 casos claros)

| Distinção | Poder | O que ficou automático |
|---|---|---|
| Aeronauta Goblin | Estou Bem, Pessoal! | RD 5 contra fogo e impacto (nota) |
| Algoz da Tormenta | Servo e Senhor (marca) | imunidade a medo e efeitos mentais |
| Algoz da Tormenta | Desprezo Profano | resistência a magia +n (nota) |
| Algoz da Tormenta | Ataque Corrupto | dano extra +Xd6 (todos os ataques) |
| Amazona | Armadura das Amazonas (marca) | Defesa +2 (interruptor: sem armadura pesada) |
| Caçador de Dragões | Destemor Inflamado | imunidade a medo |
| Cavaleiro do Corvo | Não Tenho Nome (marca) | imunidade a medo |
| Cavaleiro do Corvo | Reconhecimento e Infiltração | deslocamento +3m |
| Cavaleiro do Corvo | Atrás das Linhas Inimigas | imunidade a atordoamento e cansaço |
| Cavaleiro do Corvo | Tomada Furtiva | ataque e dano +X (interruptor: à distância, na postura) |
| Cavaleiro Feérico | Conexão Feérica (marca) | PM +n |
| Cavaleiro Feérico | Flagelo dos Duyshidakk | dano +n (interruptor: vs. bandos/enxames/duyshidakk) |
| Chapéu-Preto | Coração Duro | dano +2 (armas) e imunidade a medo |
| Chapéu-Preto | Rápido ou Morto | Iniciativa +X e deslocamento +Xm |
| Ginete de Namalkah | Amalkhan (marca) | Defesa +1 e Reflexos +1 |
| Mago de Batalha de Wynlla | Conjurador Encouraçado | Defesa +X (interruptor: armadura pesada) |
| Médico de Salistick | Saúde Perfeita | imunidade a veneno, PM +2n |
| Mosqueteiro de Rishantor | Equipamento Real (marca) | ataque, dano e Defesa +1 (interruptor: com o traje) |
| Mutagenista | Preparação Corporal (marca) | Fortitude +2 |
| Pistoleiro de Smokestone | Honra do Pistoleiro (marca) | dano +2 (interruptor: armas de fogo leves/1 mão) |
| Pistoleiro de Smokestone | Rápido no Gatilho | Iniciativa +2n |
| Cavaleiro de Khalmyr | Seguir a Norma (marca) | Fortitude +2 e Vontade +2 |
| Guardião da Realidade | Escudo da Realidade (marca) | resistência +5 (nota; +5+n contra Tormenta) |
| Herói Henshin | Armadura Especial (marca) | Defesa +1 (interruptor: com o traje transformado) |
| Mestre de Armearia | Prata da Casa | ataque e dano +X (interruptor: armas de fogo fabricadas por ele) |
| Pacificador | Armas da Paz (marca) | ataque e dano +1 (interruptor: dano não letal) |
| Sombra de Tenebra | Ameaça das Sombras (marca) | dano furtivo +1d6 (interruptor: na escuridão) |
| Sumo-Sacerdote | Evolução Espiritual | PV +5n e PM +2n |

## Como fechar mais no futuro

Se quiser cobrir mais algum caso, o padrão é: abrir `js/distincoes-efeitos-data.js`,
achar a distinção (comentário com o nome dela) e acrescentar uma entrada nova com o `id`
exato do poder (confira em `js/poderes-raca-origem-data.js`, grupo `distincao`). Os tipos
aceitos, o que cada campo faz e por que `n` nunca conta a marca estão explicados no
cabeçalho do próprio arquivo.
