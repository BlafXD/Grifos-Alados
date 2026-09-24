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

## ✅ Feitas (12 de 36)

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

## ⏭ Faltam (24) — lista PROVISÓRIA

A extração de 2 colunas embaralha títulos e ordem; **o título e a página de cada uma são
conferidos no PDF na hora de transcrever**. A próxima é a 13.

> **Achado da leva 9–12 (o ✦ mágico).** No `-layout -enc UTF-8`, o ícone ✦ de "poder
> mágico" é extraído como um " e" solto grudado no fim do poder (ex.: "…Ás na Manga. e").
> Cace o marcador com `awk '/\. e[[:space:]]*$/'` na região da distinção — foi assim que se
> viu que só o **Jogo Perigoso** (Carteador) é mágico entre a 9 e a 12.

- [ ] 13. **Cavaleiro Feérico** (p. 141–145) — Conexão Feérica (marca); escalam Armadura da Floresta e Flagelo dos Duyshidakk
- [ ] 14. **Chapéu-Preto** (~p. 146) — marca "A Maldição do Chapéu Preto"
- [ ] 15. **Dracomante Real** (~p. 148)
- [ ] 16. **Drogadora** (~p. 149)
- [ ] 17. **Doutor Genial** (~p. 150) — goblin cientista *(conferir título)*
- [ ] 18. **Escapista Magnífico** (~p. 151)
- [ ] 19. **Gigante Furioso** (~p. 152)
- [ ] 20. **Ginete de Namalkah**
- [ ] 21. **Guerreiro Mágico** — treina na Academia Arcana
- [ ] 22. *(golpes + magia de Wynna)* — **conferir título** (~p. 150)
- [ ] 23. *(esotérico / componente único — "os três magos")* — **conferir título** (~p. 151)
- [ ] 24. **Médico de Salistick**
- [ ] 25. **Mestre Bêbado**
- [ ] 26. **Mestre Cozinheiro**
- [ ] 27. **Mestre dos Desejos** — qareen
- [ ] 28. **Mestre de Mahou-Jutsu** *(conferir título)*
- [ ] 29. **Mosqueteiro**
- [ ] 30. **Mutagenista**
- [ ] 31. **Pistoleiro de Smokestone**
- [ ] 32. **Professor de Magia**
- [ ] 33. **Senador** — minotauro
- [ ] 34. **Vigarista**

> São 34 nomes provisórios acima para 28 vagas porque algumas linhas ainda podem ser
> sidebar (não distinção) e outras podem estar faltando: **a contagem certa é 36 marcas**
> ("Marca da Distinção") no PDF. Ao transcrever, siga as marcas em ordem e ajuste esta
> lista — riscando o que entrar e corrigindo título/página.

## Método por distinção (o que fazer em cada uma)

1. Ler a distinção inteira no PDF (marca + poderes; separar equipamento, que vira `quadro`).
2. Um card por poder, com `distincao`, `marca`, `magica` (o ✦ do livro), `preReq`.
3. Se um poder escala pelo nº de poderes da distinção, encodar a fórmula em
   `js/ficha-distincoes.js` (ver as já feitas como molde: "+1 a cada dois outros" = `1 + p2(n)`;
   "para cada poder da distinção" = `n`; limiar em 5 poderes = `n >= 5`).
4. Validar: `node --check` nos dois arquivos + contagem por distinção sem id duplicado.
5. Fechar a leva com o título de commit em prosa.
