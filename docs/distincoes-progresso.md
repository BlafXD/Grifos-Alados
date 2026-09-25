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

## ✅ Feitas (26 de 36)

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

## ⏭ Faltam (10) — lista REAL da ToC (p. 184–211)

> **Lista corrigida em 25/09/2026 pela ToC do PDF** (p. 3–4 do arquivo). A antiga lista
> provisória estava fora de ordem e com títulos inexistentes ("Doutor Genial",
> "Cavaleiro Bandido"…) e omitia Cobaia, Engenhoqueiro Goblin, Infiltrador de Wynlla e os
> dois Magos de Wynlla. A página é a de INÍCIO na ToC — os poderes vêm 1–2 páginas depois.
> A próxima é a 16.

> **Achado (o ✦ mágico).** No `-layout -enc UTF-8`, o ✦ de "poder mágico" sai como um
> " e" solto no fim do poder. Cace com `awk '/\. e[[:space:]]*$/'`; a coluna direita pode
> esconder o marcador, então confirme no corpo reconstruído por página.

- [ ] 27. **Mestre Bêbado** (p. 184) — próxima. Artista marcial tamuraniano; marca Felicidade Engarrafada (recipiente de goles, +2 por poder); poderes vistos: Bafo de Troll (baforada de fogo, CD Con + nº de poderes).
- [ ] 28. **Mestre Cozinheiro** (p. 187)
- [ ] 29. **Mestre dos Desejos** (p. 190) — qareen
- [ ] 30. **Mestre Mahou-Jutsu** (p. 193)
- [ ] 31. **Mosqueteiro de Rishantor** (p. 196)
- [ ] 32. **Mutagenista** (p. 199)
- [ ] 33. **Pistoleiro de Smokestone** (p. 202)
- [ ] 34. **Professor de Magia** (p. 205)
- [ ] 35. **Senador** (p. 208)
- [ ] 36. **Vigarista** (p. 211)

## Método por distinção (o que fazer em cada uma)

1. Ler a distinção inteira no PDF (marca + poderes; separar equipamento, que vira `quadro`).
2. Um card por poder, com `distincao`, `marca`, `magica` (o ✦ do livro), `preReq`.
3. Se um poder escala pelo nº de poderes da distinção, encodar a fórmula em
   `js/ficha-distincoes.js` (ver as já feitas como molde: "+1 a cada dois outros" = `1 + p2(n)`;
   "para cada poder da distinção" = `n`; limiar em 5 poderes = `n >= 5`).
4. Validar: `node --check` nos dois arquivos + contagem por distinção sem id duplicado.
5. Fechar a leva com o título de commit em prosa.
