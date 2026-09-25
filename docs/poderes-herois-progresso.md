# Poderes de classe do Heróis de Arton — o que falta

**Levantamento em 25/09/2026.** Motivador: "Ciclo da Vida" (druida) estava faltando.

## Diagnóstico

`js/poderes-classe-data.js` (349 poderes) traz três livros: `t20` (312, as 16
listas do básico completas), `deuses` (30 — **só o Frade**) e `herois` (22 — **só
o Treinador** + o Ritual do Lich do necromante).

Quando os suplementos entraram, **só as classes NOVAS** deles vieram (Frade,
Treinador). O capítulo **"Novos Poderes de Classe"** do Heróis de Arton
(Campeões de Arton, p. 54–77 do PDF), que dá poderes novos às **14 classes do
básico já presentes na ficha**, nunca foi importado. Por isso "Ciclo da Vida" e
toda a vizinhança dele sumiram.

## O que já está OK (conferido, não confundir)

- **Poderes GERAIS do Heróis** (Combate/Destino/Magia/Raça/Grupo, p. 78+) → já
  estão em `js/poderes-data.js`. Amostras conferidas: Arremesso Devastador, Briga
  de Rua, Chuva de Golpes, Encastelado, Coragem Aguerrida.
- **Novos Poderes Concedidos do Deuses de Arton** (p. 42, por divindade) → já
  estão em `js/devotos-data.js`. É a categoria de devoto, não de classe. Amostras:
  Corromper Equipamento, Estouro da Trobada, Chamado Monstruoso, Biblioteca Divina.
- **Novos Poderes de Montarias do Ameaças de Arton** → poderes gerais de montaria
  (Adestrar Montaria, Combate Montado, Dois Como Um) já em `poderes-data.js`.
  (Vale uma passada rápida para conferir se algum montaria menor escapou.)

**Conclusão:** o único buraco de poderes de CLASSE é o capítulo do Heróis abaixo.

## Método de extração

PDF em duas colunas. `pdftotext -layout`, depois reconstrução coluna a coluna
**detectando a calha por página** (script em scratchpad). Cuidado com: títulos de
duas linhas (ex. "Lorotas da Terra e do Mar", "Postura de Combate: …"), caixas de
regras que NÃO são poder ("Poderes de Brado", "Poderes de Paixão", "Novos Efeitos
de Golpe Pessoal"), e nomes repetidos entre classes ("Inércia do Aço" aparece em
cavaleiro E guerreiro). Contagem final de cada classe = ler a página, não confiar
só no script.

## O buraco: ~282 poderes em 14 classes

Contagens aproximadas (±1–2, a fechar na leitura de cada classe na importação).

| Classe | Qtde | 
|---|---|
| arcanista | 20 |
| barbaro | 20 |
| bardo | 20 |
| bucaneiro | 21 |
| cacador | 22 |
| cavaleiro | ~18 |
| clerigo | 21 |
| druida | 22 |
| guerreiro | 21 |
| inventor | 20 |
| ladino | 20 |
| lutador | 16 |
| nobre | 20 |
| paladino | 21 |
| **Total** | **~282** |

### Listas (candidatas, a conferir uma a uma na hora de importar)

- **arcanista:** Agrilhoar os Caídos, Alquimia Arcana, Apoteose Celestial,
  Apoteose Dracônica, Apoteose Feérica, Apoteose Rubra, Arcanista de Linha de
  Frente, Asas de Sapo, Contingência Arcana, Contramágica Superior, Especialista
  em Invocações, Familiar Aprimorado, Ingrediente Especial, Magia Performática,
  Memória Súbita, O Próprio Sangue, Raio Dividido, Sifão de Mana, Trama Célere,
  Transliteração Impossível
- **barbaro:** Alma Inabalável, Ampliar Brado, Arremesso Violento, Beberrão
  Selvagem, Brado: Assombroso, Brado: Retardante, Brado: Sísmico, Brado Vitorioso,
  Enigma do Aço, Espiritualista, Fúria Bestial, Fúria Elemental, Impiedoso,
  Invocar os Ancestrais, Manifestar Totem, Recuperação Gutural, Regeneração
  Sobrenatural, Revide, Rigidez Selvagem, Sede Sanguinária
- **bardo:** Acorde Místico, Acorde Poderoso, Adereço Musical, Apresentação
  Impactante, Balada do Atirador, Celebridade Artoniana, Dança Acrobática, Espada
  Encantada, História de Acampamento, Inspiração Espirituosa, Inspiração Resoluta,
  Inspiração Revigorante, Magia Performática, Mago Vermelho, Música: Marcha
  Vitoriosa, Música: Réquiem Sombrio, Música: Sonata da Distração, Portas da Fama,
  Ressoar, Triunfo do Amor
- **bucaneiro:** Ardil Afiado, Bloqueio Desconcertante, Bom de Trago, Charme
  Cafajeste, Cobrir de Pólvora, Cortejo de Espadas, Dançar nas Cordas, Entrada
  Triunfal, Esgrima Sambur, Estampido Ensurdecedor, Estocada no Flanco, Gole da
  Coragem, Golpe Humilhante, Introdução Calorosa, Lobo do Mar, Lorotas da Terra e
  do Mar, Onda de Sangue, Passo das Ondas, Pirouette, Remise, Sucesso Atrai Sucesso
- **cacador:** Armadilha Alquímica, Avanço do Predador, Batedor Marcial,
  Curandeiro dos Ermos, Elo com a Natureza Maior, Explorador Viajado, Flecheiro,
  Golpe do Predador, Herói do Povo, Identificar Presas, Lâminas Guardiãs, Lanceiro,
  Pega!, Primeiro Sangue, Sequência Dilaceradora, Sequência do Predador, Sombra dos
  Ermos, Tiro de Abate, Tiro Trespassante, Tempestade de Lâminas, Tocaia
  Habilidosa, Último Sangue
- **cavaleiro:** Armas da Cavalaria, Cavaleiro das Paixões, Cavaleiro Bandido,
  Cavaleiro Sagrado, Duelista Escudado, Duelo Irrecusável, Grão-Mestre, Honra
  Compartilhada, Inércia do Aço, Investida Convicta, Investida Defensiva, Mestre
  das Posturas, Postura de Combate: Sequência Blindada, Paixão: Amor, Paixão:
  Honra, Paixão: Hospitalidade, Paixão: Lealdade, Presença de Muralha (conferir)
- **clerigo:** Acólito Escudeiro, Arma Divina, Bênção de Batalha, Canalizar
  Abençoado, Canalizar Concentrado, Canalizar Profanado, Canalizar Poderoso,
  Conversão de Fé, Dizimar Infiéis, Égide da Fé, Força da Devoção, Liturgia
  Marcial, Mestre Celebrante, Missa: Compartilhar Milagre, Missa: Imposição da
  Vontade, Missa: Mente Abençoada, Presente dos Deuses, Punição Divina,
  Representante Divino, Solo Profanado, Solo Sagrado
- **druida:** Arma Tradicional, Auspício do Crepúsculo, Auspício da Madrugada,
  Auspício da Meia-Noite, Banquete Selvagem, **Ciclo da Vida**, Companheiro
  Aberrante, Companheiro Elemental, Erupção Elemental, Força da Natureza, Forma
  Aberrante, Forma de Cardume, Forma Elemental, Forma Esquelética, Forma Vegetal,
  Instinto Venenoso, Metamorfose Instantânea, Oráculo da Natureza, Orador dos
  Elementos, Proteção Fúngica, Transformação Repugnante, Xamã Místico
- **guerreiro:** Análise Tática, Arremesso de Investida, Bloqueio Brutal, Corte
  Ágil, Criar Oportunidade, Defesa Estratégica, Determinação Inabalável,
  Estrategista Inspirador, Executor, Fender Defesas, Inércia do Aço, Investida
  Ricochete, Manobra Dupla, Mente Disciplinada, Operações Combinadas, Ordens de
  Engajamento, Recuperar Fôlego, Resiliência Marcial, Soldado de Infantaria, Velho
  de Guerra, Xadrez de Batalha
- **inventor:** Alquimista Exímio, Alterar Programação, Aparato Personalizado,
  Armadura Avançada, Armadura Mecanizada, Artesão Criativo, Autômato Alquímico,
  Autômato Engenhocado, Catalisador Experimental, Estilista, Explicação Científica,
  Explorar Fraqueza, Farmácia Mágica, Forçar a Calibragem, Galvanização, Gênio
  Inovador, Golpe de Gênio, Infusão Distante, Oficina Esotérica, Saraivada Alquímica
- **ladino:** Ameaça Brutal, Assassino em Série, Ataque Furtivo Letal,
  Bombardeiro Furtivo, Chefe de Gangue, Conhecimento Anatômico, Enganar os Olhos,
  Finta Acrobática, Improvisação Arcana, Investida Rasteira, Mestre Assassino,
  Mestre Envenenador, Papo Furado, Precisão Furtiva, Rei do Crime, Sabotagem
  Corrosiva, Senhor do Submundo, Truque de Palco, Truque do Chapéu, Vestido para a
  Ocasião
- **lutador:** Aquecimento, Caminhar pelas Paredes, Caminho Suave, Combinação:
  Esquiva Técnica, Combinação: Quebra-guarda, Combinação: Um-Dois, Corpo Fechado,
  Dança Marcial, Gingado Elusivo, Invencível, Jogo de Pernas, Mestre das
  Combinações, Rilhar os Dentes, Rolamento Escapatório, Ruas Furiosas, Sequência
  Defensiva
- **nobre:** Agente de Elite, Comandante de Campo, Comitiva, Discurso de Batalha,
  Fofocas da Corte, Guarda Pessoal, Hedonismo Aristocrático, Instigar Violência,
  Insuflar Investida, Legado Mágico, Líder Enérgico, Líder Impiedoso, Linhagem
  Distinta, Ordens Agressivas, Ordens Encorajadoras, Palavras de Efeito, Palavras
  Ressonantes, Protocolo Impecável, Senescal, Voz Límpida
- **paladino:** Arma Juramentada, Arma Sacramentada, Aura Vingadora, Bloqueio
  Divino, Convicção Heroica, Expurgo Sagrado, Escudo Fraterno, Escudo Sagrado,
  Fulgor Ardente, Guardião Celestial, Investida Sagrada, Julgamento Divino:
  Desafio, Julgamento Divino: Proteção, Julgamento Divino: Redenção, Julgamento
  Divino: Retribuição, Luz Purificadora, Manto de Batalha, Paladino do Reino,
  Rajada Divina, Sacrifício, Sentença Dobrada

## Situação da importação

**Leva 1 — FEITA em 25/09/2026** (143 poderes; `quantos` atualizado; base agora
com 492 poderes de classe):
- [x] arcanista (20) · bárbaro (20) · bardo (20) · bucaneiro (21) · caçador (22)
  · cavaleiro (20) · clérigo (20)
- Ajustes na conferência: "Mestre Celebrante" do Heróis NÃO entrou — é uma caixa
  que esclarece o poder homônimo do t20 (p. 58), não um poder novo (as três
  "Missa:" ao lado é que são novas). "Magia Performática" entra em arcanista E
  bardo (o livro imprime nas duas). Cavaleiro rende 20 com as 3 "Postura de
  Combate:" + "Mestre das Posturas" que a extração tinha fundido. Bucaneiro rende
  21 (o "Calorosa" era lixo de tabela; Estampido/Gole/Lorotas estavam engolidos).
- Mágicas ✦ da leva 1 (9): arcanista Agrilhoar os Caídos; bárbaro Espiritualista,
  Fúria Elemental, Invocar os Ancestrais, Manifestar Totem; bardo Acorde Místico,
  Acorde Poderoso, Música: Réquiem Sombrio; caçador Elo com a Natureza Maior.

**Leva 2 — pendente** (ordem: druida, guerreiro, inventor, ladino, lutador,
nobre, paladino). Contagens provisórias da tabela acima (druida 22, guerreiro 21,
inventor 20, ladino 20, lutador 16, nobre 20, paladino 21 ≈ 140), a fechar exato
na leitura de cada classe. Atenção às armadilhas já vistas: títulos de duas linhas
(Julgamento Divino:, Postura, Combinação:), caixas de regra que não são poder, e
nomes repetidos entre classes ("Inércia do Aço" também é do guerreiro).
