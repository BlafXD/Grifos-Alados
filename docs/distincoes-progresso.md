# Distinções na ficha — progresso da leva 3

**Aberto em:** 23 de setembro de 2026, no meio da leva 3 (distinções).
**Fonte:** Heróis de Arton, Capítulo 2: Distinções (p. 102–155). São **36 distinções**.

## Como as distinções entram na ficha

- **Um card por poder** (decisão dele, 23/09): a *Marca da Distinção* e cada *poder da
  distinção* viram um card no grupo 🎖 Distinção. O card guarda `distincao` (o slug da
  distinção dona) e `marca: true/false`.
- **Escalonamento** (motor `js/ficha-distincoes.js`): os poderes que crescem com o número
  de poderes *daquela* distinção mostram o "Agora:" sozinhos. **A marca NÃO conta** na
  soma (o livro a separa dos "poderes da distinção", p. 104).
- **Descritor "Tormenta"**: algumas distinções (Algoz da Tormenta) têm poderes que são
  *também* poderes da Tormenta. Ficam no grupo distinção com "· Tormenta" na etiqueta; o
  🩸 do cartão integra à conta da Tormenta se a mesa quiser.
- Dados em `js/poderes-raca-origem-data.js`; escalas em `js/ficha-distincoes.js`.

## ✅ Feitas (36 de 36) — COMPLETO 🎉

1. **Aeronauta Goblin** (p. 105–108) — escala: Cabeça nas Nuvens.
2. **Algoz da Tormenta** (p. 109–111) — escalam: Desprezo Profano, Ataque Corrupto.
3. **Amazona** (p. 112–114) — escalam: Predadora, Nunca Ceder.
4. **Armadilheiro Mestre** (p. 114–117) — escala: Armadilha Instantânea.
5. **Arqueiro de Lenórienn** (p. 118–120) — escala: Flecha da Morte (7 poderes mágicos ✦).
6. **Bruxo da Tormenta** (p. 120–123) — escalam: Conjuração Insana, Corromper Magia, Escudo Rubro.
7. **Caçador de Cabeças** (p. 123–126) — escala: Exterminar Presa.
8. **Caçador de Dragões** (p. 126–129) — escalam: Destemor Inflamado, Alçar aos Céus, Danificar as Asas, Entortar Escamas.
9. **Campeão de Dojo** (p. 130–132) — escala: Controlar a Respiração (a cura sobe um PASSO de dado, 2d6 → 3d6…, teto 4d12, reusando `passoDeDano` da ficha-data).
10. **Capitão do Conclave Pirata** (p. 132–135) — escalam: Içar a Bandeira Preta (5 PV + 1 PM temp por poder), Língua Afiada (2d6 psíquico por poder). Marca traz o quadro *Solidariedade Pirata*.
11. **Carteador** (p. 135–138) — escalam: Dado Viciado (1d6 + 1d6 a cada dois outros), Jogo Perigoso (círculo das magias sobe; **único poder mágico ✦** da leva).
12. **Cavaleiro do Corvo** (p. 138–141) — 7 poderes; escalam: A Qualquer Custo (benefícios de missão), Postura de Combate: Tomada Furtiva (+1 a cada dois outros). Marca traz o quadro *A Língua dos Corvos*.
13. **Cavaleiro Feérico** (p. 142–144) — marca Conexão Feérica (+1 PM por poder); escalam Arte Élfica (círculo máx = total de poderes), Armadura da Floresta (melhorias a cada dois OUTROS), Flagelo dos Duyshidakk (+dano = total), Lâminas Feéricas (margem +1 "a cada dois poderes" = ⌊n/2⌋, sem "outros" — usa `t2`, novo helper). Só **Arma da Floresta** é ✦.
14. **Chapéu-Preto** (p. 145–147) — marca Esse Maldito Chapéu (quadro *A Maldição do Chapéu Preto*); escalam Olhos de Chumbo (−2 −1 a cada dois outros) e Rápido ou Morto (Iniciativa +2 e deslocamento +3m, subindo +1/+1,5m a cada dois outros). Nenhum ✦.
15. **Cobaia dos Médicos Monstros** (p. 148–150) — marca Procedimento Inicial (quadro *Implantes*: regras + 10 implantes, Olho Anulador e Olho Desintegrador são ✦); escalam Enxerto Experimental (dado 1d4 sobe um passo por OUTRO poder, via `passoDeDano`) e Corpo Resiliente (limite de implantes +1, +1 a cada dois outros). Nenhum PODER é ✦ (o ✦ está nos implantes-item do quadro).
16. **Dracomante Real** (p. 150–152) — marca Mestre Dracônico (escolhe o Dragão-Real mestre e a essência elemental, +2 de dano do tipo); escalam Afinidade Dracônica (redução 3 por poder da distinção contra o tipo do mestre) e Memória Dracônica (magias memorizadas a mais = total de poderes). ✦: Majestade Elemental e Verdadeiro Poder (aprende Metamorfose / Transformação em Dragão). Sem quadro (o box "Benthos e a Magia" é só lore de admissão).
17. **Drogadora** (p. 153–156) — marca Tradição da Cura (Sab como atributo-chave de Ofício alquimista); quadro *Receitas da Drogadora* em Remédios da Floresta. Quatro escalam por total/2-outros: Curandeira Exímia (+bônus = total), Aspersão Curativa (nº de secreções), Laboratório Natural (fabricações/dia = total), Perfume Intoxicante (+2 subindo a cada dois outros), e as receitas de Remédios da Floresta (+1 de até 2º círculo por poder). Nenhum ✦. **Plural em `ão`**: "secreção→secreções", "fabricação→fabricações" (não dá para só somar sufixo).
18. **Engenhoqueiro Goblin** (p. 156–159) — marca Engenhocaria Goblinoide (fabrica pela metade do custo, mas a engenhoca explode ao falhar feio); quadro *Gambiarras* em Aprimorar Bugiganga. Escalam Aprimorar Bugiganga (gambiarras por engenhoca = total), Autodestruição (PM na explosão = total, +2d6/PM) e Manutenção Precária (1d3 + total de engenhocas). Nenhum ✦.
19. **Escapista Magnífico** (p. 159–162) — marca Vantagem Secreta (anula uma fonte de penalidades). Escalam Aparência Insignificante (+CD do poder Aparência Inofensiva) e Peguei um Bobo (CD do Comando SIMULADO, +1 a cada dois outros). Nenhum ✦ (Peguei um Bobo é magia simulada).
20. **Gigante Furioso** (p. 162–165) — marca Desprezar os Pequenos (RD 2 por categoria de diferença). Escala só Fúria dos Gigantes (categorias de tamanho, e é ✦); os demais crescem com o TAMANHO, não com o nº de poderes.
21. **Ginete de Namalkah** (p. 165–168) — marca Amalkhan (quadro *Irmão Cavalo*). **NENHUMA escala no motor**: os poderes crescem com o NÍVEL do parceiro montaria, não com o nº de poderes (fica no texto). Nenhum ✦.
22. **Guerreiro Mágico** (p. 168–171) — marca Arma Arcana (magia empunhando arma). Escala Estilo de Combate Arcano (bônus do estilo +1 por outro poder). ✦: Fogo e Aço.
23. **Infiltrador de Wynlla** (p. 171–174) — marca Ladinagem Mágica (✦). Escala Trapaça Arcana (círculo: 1º, e 2º com 3+ poderes; magias conhecidas = 2 + outros). ✦: Ladinagem Mágica (marca) e Criar Armadilha Mágica. Magia Traiçoeira é um poder-Aprimoramento (Custo +2 PM).
24. **Mago da Ordem do Vazio** (p. 175–177) — marca Componente Especial (troca componentes materiais por um componente único; quadro *Componentes Especiais*). Escalam Ingrediente Secreto (PM de +2d6 essência por PM) e Inovação Particular (CD +2 por poder contra anular/dissipar). Nenhum ✦.
25. **Mago de Batalha de Wynlla** (p. 177–180) — marca Armamento Esotérico (item esotérico → +1 na CD). Quadro *Conjuração Magibélica* (técnicas Expandir/Fortalecer/Intensificar/Potencializar) no poder Conjuração Magibélica. Escalam Conjurador Encouraçado (Defesa por outro poder), Conjuração Magibélica (nº de técnicas = 1 + outros exceto Conjurador Encouraçado) e Infantaria Arcana (+dano do Arcano de Batalha = total). Nenhum ✦.
26. **Médico de Salistick** (p. 180–183) — marca Ciências Médicas (Int como atributo-chave de Cura; não pode ser devoto). Escalam Medicina Avançada (usos/dia, cura em d10), Medicina Preventiva (5 PV temp + 1 em resistência por poder) e Saúde Perfeita (+2 PM por poder). Nenhum ✦.
27. **Mestre Bêbado** (p. 183–186) — marca Felicidade Engarrafada (recipiente 5 goles + 2 por poder). Escalam quase todos: Lógica Alcoólica (benefício aleatório +2 a cada dois outros), Bafo de Troll/Dragão (CD e goles = total), Bebida Revigorante (goles) e Luta Ridícula (finta). Nenhum ✦.
28. **Mestre Cozinheiro** (p. 186–189) — marca Panela de Estimação; quadro *Ingredientes Monstruosos* em Tudo que Há de Bom. Escalam Tudo que Há de Bom (ingredientes por prato), Banquete de Aventureiros (ingredientes/dados = total) e Guardar num Potinho (dias do lanche). Nenhum ✦.
29. **Mestre dos Desejos** (p. 189–192) — só qareen. Marca Desejo de Servir. **NÃO escala** pelo nº de poderes (efeitos fixos). ✦: O Segundo Desejo, O Último Desejo (lança a magia Desejo), Gênio da Lâmpada e Sempre Disponível (4).
30. **Mestre Mahou-Jutsu** (p. 192–195) — marca Palma Mística. Escalam Mahou-jutsu (círculo = total) e Punho Arcano (CD +1 a cada dois outros). ✦: Defesa da Magia.
31. **Mosqueteiro de Rishantor** (p. 195–198) — marca Equipamento Real (tabardo/florete/chapéu; não pode ser devoto de energia negativa). **NÃO escala** por nº de poderes (Heroísmo Galante tem limiar "todos os poderes"). Nenhum ✦ (Valentia é Heroísmo SIMULADO).
32. **Mutagenista** (p. 199–201) — marca Preparação Corporal; quadro *Mutagênicos* em Fabricar Mutagênicos. Escalam Fabricar Mutagênicos (limite ativo = total; energizante com 2 outros, despersonalizante com 4) e Organismo Reagente. Nenhum ✦ (mutagênicos são magia simulada).
33. **Pistoleiro de Smokestone** (p. 201–204) — marca Honra do Pistoleiro; quadro *O Código do Pistoleiro* (nada de armadura pesada, deuses, magia). Escala só Rápido no Gatilho (+2 Iniciativa por poder). Nenhum ✦. (7 cards — 6 poderes.)
34. **Professor de Magia** (p. 204–207) — marca Pena e Pergaminho (✦, aprende magia de adivinhação). Escalam Pedagogia Mágica (usos por aluno) e Orgulho do Mestre (PM temporários = 2× poderes). Demonstrações Práticas não tem preReq impresso (null).
35. **Senador** (p. 207–210) — minotauro; marca Retórica Impecável. Escalam Cofres Fundos (fundos e itens requisitados), Apoio Popular (nível dos parceiros), Inocência Convicta e Um Minotauro de Bem. O box "O Curso de Honra" é lore. Nenhum ✦.
36. **Vigarista** (p. 210–213) — marca Tirar Leite de Pedra. Escalam Aquele Papinho, Efeito Placebo (elixir vira poção) e Relíquias Sagradas. Nenhum ✦ (tudo farsa/magia simulada).

## ⏭ Faltam (0) — nada! O Capítulo 2 (Distinções) do Heróis de Arton está COMPLETO

As 36 distinções entraram (227 cards no grupo `distincao`: 36 marcas + 191 poderes,
21 mágicas ✦). Fechado em 25/09/2026.

<details><summary>lista real da ToC (histórico)</summary>

> **Lista corrigida em 25/09/2026 pela ToC do PDF** (p. 3–4 do arquivo). A antiga lista
> provisória estava fora de ordem e com títulos inexistentes ("Doutor Genial",
> "Cavaleiro Bandido"…) e omitia Cobaia, Engenhoqueiro Goblin, Infiltrador de Wynlla e os
> dois Magos de Wynlla. A página é a de INÍCIO na ToC — os poderes vêm 1–2 páginas depois.
> A próxima é a 16.

> **Achado (o ✦ mágico).** No `-layout -enc UTF-8`, o ✦ de "poder mágico" sai como um
> " e" solto no fim do poder. Cace com `awk '/\. e[[:space:]]*$/'`; a coluna direita pode
> esconder o marcador, então confirme no corpo reconstruído por página.

- [x] 32. **Mutagenista** (p. 199)
- [x] 33. **Pistoleiro de Smokestone** (p. 202)
- [x] 34. **Professor de Magia** (p. 205)
- [x] 35. **Senador** (p. 208)
- [x] 36. **Vigarista** (p. 211)

</details>

## Método por distinção (o que fazer em cada uma)

1. Ler a distinção inteira no PDF (marca + poderes; separar equipamento, que vira `quadro`).
2. Um card por poder, com `distincao`, `marca`, `magica` (o ✦ do livro), `preReq`.
3. Se um poder escala pelo nº de poderes da distinção, encodar a fórmula em
   `js/ficha-distincoes.js` (ver as já feitas como molde: "+1 a cada dois outros" = `1 + p2(n)`;
   "para cada poder da distinção" = `n`; limiar em 5 poderes = `n >= 5`).
4. Validar: `node --check` nos dois arquivos + contagem por distinção sem id duplicado.
5. Fechar a leva com o título de commit em prosa.

---

## ✅ O segundo livro de distinções — levantado e IMPORTADO (05/10/2026)

> Esta seção foi escrita quando o *Deuses de Arton* estava inteiro de fora. As
> 23 **já entraram**, em 8 levas, no mesmo dia — o relatório da importação está
> logo abaixo, em "As 8 levas". O levantamento fica porque é a conta que
> justifica o trabalho.

Pergunta dele: *"Tem todas as distinções de todos os livros?"* **Não.** As 36 acima
são o *Heróis de Arton* inteiro. O **Deuses de Arton** tem o seu próprio Capítulo 2 de
Distinções, **p. 66–141, com 23 distinções**, e nenhuma delas está no site.

Conferido PDF por PDF — só dois livros têm o capítulo:

| Livro | Capítulo | Distinções | No site |
|---|---|---:|---|
| Heróis de Arton | 2, p. 102–155 | 36 | ✅ 227 cards |
| **Deuses de Arton** | 2, p. 66–141 | **23** | ❌ 0 |

Nos outros sete a palavra aparece só no sentido comum ("sem distinção entre nobres e
plebeus"): Atlas 8×, Ameaças 2×, Deuses Menores 1×, zero no básico e no Guia de NPCs.
**Total que existe: 59. O site tem 36 (61%).**

### As 23 que faltam

Todas de devoto — o capítulo é a contraparte religiosa do capítulo do *Heróis*.
Página impressa, e a Marca de cada uma:

| # | Distinção | p. | Marca da Distinção |
|---:|---|---:|---|
| 1 | Bufão de Hyninn | 70 | Chapéu do Bobo |
| 2 | Cavaleiro da Luz | 73 | Etiqueta da Ordem da Luz |
| 3 | Cavaleiro de Khalmyr | 76 | Seguir a Norma |
| 4 | Colecionador Monstruoso | 79 | Através da Selvageria |
| 5 | Dançarina de Marah | 82 | — |
| 6 | Detetive de Tanna-Toh | 85 | Nada Além de Fatos |
| 7 | Exegeta do Akzath | 88 | Compreender o Akzath |
| 8 | Forjador Litúrgico | 92 | Ferreiro Sagrado |
| 9 | Guardião da Realidade | 95 | Escudo da Realidade |
| 10 | Herói Henshin | 98 | Armadura Especial |
| 11 | Improvisador de Lena | 102 | Código do Improvisador |
| 12 | Inquisidor de Wynna | 105 | Padroeira Adotiva |
| 13 | Mestre de Armearia | 108 | Domínio da Pólvora |
| 14 | Numeromante | 112 | Matemágica para iniciantes |
| 15 | Pacificador | 115 | Armas da Paz |
| 16 | Pregador | 118 | Vista Grossa |
| 17 | Sombra de Tenebra | 121 | Ameaça das Sombras |
| 18 | Sortudo de Nimb | 124 | Sorte Boba |
| 19 | Sumo-Sacerdote | 127 | Autoridade Divina |
| 20 | Taumaturgista | 130 | Auxiliar Divino |
| 21 | Teurgista Hermético | 133 | Princípio Hermético |
| 22 | Tibarita | 136 | Poder Monetário |
| 23 | Tirano do Terceiro | 139 | — |

(Os dois "—" são marcas cujo nome a extração não isolou; saem na leitura página a
página.)

**Tamanho do trabalho:** pela média do *Heróis* (227 cards ÷ 36 = 6,3 por distinção),
são **~145 cards** — mesma ordem de grandeza da leva de 23/09. O motor
(`js/ficha-distincoes.js`) **não precisa mudar**: o escalonamento "por poder da
distinção" é a mesma regra nos dois livros, e o `livro: 'deuses'` já é um valor aceito.

### A armadilha que quase fez eu contar 18

O sumário do *Deuses de Arton* é de **três colunas**, e a terceira — onde estão
Sumo-Sacerdote, Taumaturgista, Teurgista Hermético, Tibarita e Tirano do Terceiro —
cai fora do recorte se você ler só o começo da página do índice. O capítulo também
não acaba onde parece: o rodapé corrido vai até **"Distinções 141"**. Confira sempre
pelo rodapé, não pela última linha do índice que você conseguiu ler.

**Nada foi importado.** Fica para quando ele pedir.

---

## As 8 levas — as 23 do *Deuses de Arton* (05/10/2026)

**Feito. 138 cards, 23 distinções, zero divergência contra o PDF.**

| | Leva | Distinções | Cards |
|---|---|---|---:|
| 1 | Bufão de Hyninn · Cavaleiro da Luz · Cavaleiro de Khalmyr | 3 | 18 |
| 2 | Colecionador Monstruoso · Dançarina de Marah · Detetive de Tanna-Toh | 3 | 18 |
| 3 | Exegeta do Akzath · Forjador Litúrgico · Guardião da Realidade | 3 | 15 |
| 4 | Herói Henshin · Improvisador de Lena · Inquisidor de Wynna | 3 | 18 |
| 5 | Mestre de Armearia · Numeromante · Pacificador | 3 | 18 |
| 6 | Pregador · Sombra de Tenebra · Sortudo de Nimb | 3 | 21 |
| 7 | Sumo-Sacerdote · Taumaturgista · Teurgista Hermético | 3 | 18 |
| 8 | Tibarita · Tirano do Terceiro | 2 | 12 |

**O grupo 🎖 Distinção ficou com 365 cards e as 59 distinções que existem:**
227 do *Heróis de Arton* (36) + 138 do *Deuses de Arton* (23).

### O que mudou no motor

**Nada de arquitetura.** O `js/ficha-distincoes.js` ganhou **38 escalas novas**
e nenhuma função nova — a regra "por poder da distinção" é a mesma nos dois
livros (o *Deuses* repete a explicação na p. 68). Três detalhes dessa leva:

- **A marca pode escalar.** No *Heróis* ela nunca escalava. Aqui o **Escudo da
  Realidade** (guardião), o **Auxiliar Divino** (taumaturgista) e o
  **Companheiro Dragão** (tirano) crescem com o número de poderes — e o
  `nDistincao()` já devolve o número certo, porque a marca nunca se conta.
- **Escada de dado para BAIXO.** A *Sorte Visitante* do sortudo de Nimb desce o
  d8 um passo a cada dois outros poderes (quanto menor, mais fácil tirar o 1 que
  acende a sorte). É o mesmo `passoDeDano` da ficha, com passo negativo.
- **Degraus, não conta contínua.** O companheiro dragão vira veterano com 3
  poderes e mestre com 5; a escala mostra quantos faltam para o próximo degrau.

### O campo `deus` saiu do papel

Ele existia em `GA_PODERES` desde sempre e **nenhum card o preenchia**. Como
este capítulo é todo de devoto, ele virou a etiqueta do deus no cartão (ao lado
da etiqueta da distinção) e entrou na busca. Quatorze das 23 têm deus
declarado pelo livro; as outras nove (guardião da realidade, herói henshin,
pregador, sumo-sacerdote, teurgista…) o livro não amarra a um deus só, e ficam
com `deus: null`.

### Como foi conferido

Um script (`conferir-distincoes.js`, no scratchpad da sessão) normaliza o texto
dos dois lados — sem acento, sem pontuação, **sem hífen** — e procura cada
trecho do card dentro do rio de palavras do capítulo extraído do PDF:

```
346 trechos idênticos ao PDF · 4 idênticos em duas partes · 0 divergência(s)
```

Os "em duas partes" são quatro frases que o livro parte na virada de página
(Monstro Supremo, Classificar como Suspeito, Arma de Estimação e Dádivas do
Dragão): as duas metades existem literalmente, e o script confirma as duas.

**Por que o hífen sai da comparação:** o PDF quebra palavra no fim da linha e
cola as sílabas — "Tanna-Toh" vira "TannaToh", "Pré-requisito" vira
"Prérequisito". É a armadilha já registrada para extração deste projeto.

E a sanidade estrutural, por script: **nenhum id repetido** entre os 365 cards,
**exatamente uma marca por distinção** nas 23, e **nenhum poder que fale em
escalar sem ter conta** no motor.

### Os deslizes do livro que ficaram literais

Como sempre neste projeto, erro de impressão não se conserta calado:

| Onde | O livro imprime | Conferido |
|---|---|---|
| Campeão Abnegado (p. 78) | "Quanto maior **a humilde**, maior a força." | `-layout` p. 78 |
| Morte, conceito do exegeta (p. 90) | "já feito **nesa** mesma cena" | `-layout` p. 90 |
| Conhecimento, conceito do exegeta (p. 90) | "o conhecimento do **Azkath**" (o resto do capítulo grafa *Akzath*) | `-layout` p. 90 |
| Amigo de Outro Mundo (p. 132) | "pilly, luminar, pégaso **e ou** dragonete" | `-layout` p. 132 |
| titereiro Planar (p. 132) | título em **caixa baixa**, único do capítulo | `-layout` p. 132 |
| Clone Sombrio (p. 123) | pré-requisito "Miragem **das** Sombras", mas o poder se chama "Miragem **de** Sombras" | p. 123 |

### Uma decisão de forma

As listas longas que o livro imprime **dentro** do poder (as cabriolas do bufão,
os conceitos dos dois círculos do exegeta, as poses do henshin, as inovações do
armeiro, os informantes do detetive, os efeitos da barganha planar) viraram
**quadro** do card, que é como a ficha mostra lista longa — e não parágrafos
soltos no meio do texto da regra. O texto é o do livro, palavra por palavra; só
o marcador "•" sai, porque o quadro já lista.

---

## A vitrine: o cartão DA distinção, não os poderes soltos (05/10/2026)

Pedido dele, logo depois da importação: *"na parte de adicionar poderes da
distinção seria interessante ter o card DA distinção e não os poderes soltos"*.

**Por que ele tem razão.** Com os dois livros são **59 distinções e 365 poderes**
numa lista só. Para achar "Clone Sombrio" era preciso **saber o nome do poder
antes de procurá-lo** — que é o contrário de como se escolhe na mesa: primeiro
se escolhe a ORDEM, depois o que aprender dentro dela.

**O que mudou.** O chip **🎖 Distinção** do "✨ Adicionar poder" deixa de listar
poderes e passa a mostrar **um cartão por distinção**:

```
🎖 Sombra de Tenebra                                    [Tenebra]
Deuses de Arton, p. 123
Marca: Ameaça das Sombras
Para o sombra de Tenebra, as trevas revelam as fraquezas dos inimigos.
                                            ✓ você já é — 4 de 6 poderes
```

Clicando, entra-se nela: os chips dão lugar a uma **faixa de volta** (← todas as
distinções · nome · deus · "marca + 4 de 6 poderes na ficha") e a lista vira só
a dela, **com a marca primeiro**, etiquetada *marca da distinção*.

### As decisões

- **A busca procura a distinção INTEIRA** — nome, deus, livro e o texto de todos
  os poderes dela. Digitar "clone sombrio" ou "Tenebra" acha o sombra de Tenebra
  sem você saber o nome da ordem. Entrar numa distinção **limpa a busca**, porque
  o que ela filtrava era a lista de ordens.
- **O resumo do cartão é a primeira linha da MARCA**, tirada do livro — não um
  resumo meu. Preso em duas linhas por CSS: o modal tem teto de 460px (uma
  coluna só), e 59 cartões de altura livre viram rolagem sem fim.
- **A marca NÃO é adicionada sozinha.** Entrando numa distinção que você ainda
  não tem, uma faixa âmbar avisa: *"Você ainda não é Tibarita. Ao entrar na
  distinção o personagem recebe a marca Poder Monetário — ela é automática, está
  primeiro na lista, e não conta na soma que faz os outros poderes crescerem."*
  O livro diz que a marca vem junto (Deuses p. 68, Heróis p. 104), mas quem põe
  na ficha é o jogador — é a regra de casa de não mexer na ficha por ele.
- **Trocar de chip zera a distinção aberta.** Sem isso, estar "dentro" do bufão
  de Hyninn e clicar em ⚔ Classe deixaria o filtro ligado por baixo, e a lista
  de classe sairia vazia sem dizer por quê.
- **O cartão de uma distinção que a ficha já tem** fica com a tarja verde e o
  "✓ você já é", com a conta de poderes que o "Agora:" vai usar.

### Provado no navegador

59 cartões; busca por poder e por deus achando a ordem dona; entrar, a faixa, a
marca na frente, o "já está na ficha" em cada poder que a ficha tem; voltar
devolvendo os 59; trocar de chip limpando o filtro; **zero erro de console**;
nenhum cartão transbordando e nenhuma rolagem horizontal, nem no desktop nem no
iframe de 390px.
