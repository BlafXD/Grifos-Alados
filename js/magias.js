// ═══════════════════════════════════════════════════════════════════
//  MAGIAS.JS — Gerador de pergaminhos de magia para o Gerador de Loja
//  Localização: /grifos-alados/js/magias.js
//  Deve ser carregado ANTES de loja.js (que renderiza a aba "Magias").
//
//  Regras de preço:
//    • COMPRAR o pergaminho: T$ 30 × (PM da magia)²  (PM mínimo 1).
//        Ex.: 1º círculo (1 PM) = T$ 30; 3º círculo (6 PM) = T$ 1.080.
//    • APRENDER a magia (poder Escriba Arcano): T$ 250 × PM, gastando
//        1 dia de trabalho por PM. Esse custo é ADICIONAL ao do pergaminho.
//
//  Peso: pergaminhos são itens muito leves → ocupam ½ espaço.
//
//  Dados: cada magia carrega TIPO (arcana | divina), CÍRCULO, ESCOLA e
//  DESCRIÇÃO. As magias arcanas e divinas são listadas separadamente;
//  uma mesma magia pode existir nas duas listas (entradas distintas).
// ═══════════════════════════════════════════════════════════════════

const Magias = (function () {
  'use strict';

  // ── Constantes de PM por círculo e regras de preço ────────────────
  const PRECO_APRENDER_POR_PM  = 250;  // aprender a magia (Escriba Arcano)
  const PRECO_PERGAMINHO_FATOR = 30;   // comprar o pergaminho: 30 × PM²
  const PM_POR_CIRCULO = { 1: 1, 2: 3, 3: 6, 4: 10, 5: 15 };
  const PESO_PERGAMINHO = 0.5;

  // ═══════════════════════════════════════════════════════════════
  //  BANCO DE MAGIAS
  //  Estrutura: DADOS[tipo][círculo][escola] = [ [nome, descrição], ... ]
  //  tipo: 'arcana' | 'divina'
  // ═══════════════════════════════════════════════════════════════
  const DADOS = {
    // ───────────────────────── MAGIAS ARCANAS ──────────────────────
    arcana: {
      1: {
        "Abjuração": [
          ["Alarme", `Avisa quando alguém invadir uma área protegida.`],
          ["Armadura Arcana", `Aumenta sua Defesa.`],
          ["Resistência a Energia", `Fornece resistência contra um tipo de dano a sua escolha.`],
          ["Tranca Arcana", `Tranca um item que possa ser aberto ou fechado.`],
        ],
        "Adivinhação": [
          ["Aviso", `Envia um alerta telepático para uma criatura.`],
          ["Compreensão", `Você entende qualquer coisa escrita ou falada e pode ouvir pensamentos.`],
          ["Concentração de Combate", `Ao atacar, você pode rolar dois dados e ficar com o melhor.`],
          ["Descobrir Fraqueza", `Você analisa uma criatura em busca de pontos fracos.`],
          ["Farejar Fortuna", `Você descobre tesouros não sendo carregados por criaturas inteligentes.`],
          ["Percepção Rubra", `Adquire por um tempo a percepção estranha dos lefeu.`],
          ["Visão Mística", `Você pode ver auras mágicas.`],
        ],
        "Convocação": [
          ["Açoite Flamejante", `Um açoite de fogo surge em suas mãos.`],
          ["Área Escorregadia", `Criaturas na área podem cair ou objeto afetado pode ser derrubado.`],
          ["Assobio Perigoso", `Convoca criaturas perigosas que atacam a todos.`],
          ["Conjurar Monstro", `Convoca um monstro sob seu comando.`],
          ["Espírito Balístico", `Invoca um pequeno espírito que dispara contra os inimigos.`],
          ["Névoa", `Cria uma névoa que oferece camuflagem.`],
          ["Teia", `Criaturas na área ficam enredadas.`],
        ],
        "Encantamento": [
          ["Adaga Mental", `Alvo sofre dano psíquico e pode ficar atordoado.`],
          ["Discrição", `Torna sua aparência desinteressante, despercebido facilmente por todos.`],
          ["Enfeitiçar", `Alvo se torna prestativo e pode realizar um pedido seu.`],
          ["Hipnotismo", `Alvos ficam fascinados.`],
          ["Sono", `Alvo cai em um sono profundo ou fica exausto.`],
        ],
        "Evocação": [
          ["Armadura Elemental", `Armadura que faz a quem atacou o usuário sofrer dano do tipo de energia escolhido.`],
          ["Dardo Gélido", `Dispara um dardo gélido.`],
          ["Explosão de Chamas", `Cone causa dano de fogo.`],
          ["Flecha de Luz", `Lança uma flecha luminosa contra o alvo.`],
          ["Luz", `Objeto ilumina como uma tocha.`],
          ["Seta Infalível de Talude", `Dispara setas de energia que acertam automaticamente.`],
          ["Toque Chocante", `Toque causa dano de eletricidade.`],
        ],
        "Ilusão": [
          ["Criar Ilusão", `Cria uma ilusão visual ou sonora.`],
          ["Disfarce Ilusório", `Muda a aparência de uma ou mais criaturas.`],
          ["Distração Fugaz", `Produz uma ilusão de grande interesse da pessoa.`],
          ["Imagem Espelhada", `Cria duplicatas para confundir os inimigos, oferecendo bônus na Defesa.`],
          ["Leque Cromático", `Criaturas na área ficam ofuscadas ou atordoadas.`],
        ],
        "Necromancia": [
          ["Amedrontar", `O alvo fica abalado ou apavorado.`],
          ["Escuridão", `Objeto emana uma área de escuridão.`],
          ["Raio do Enfraquecimento", `O alvo fica fatigado ou vulnerável.`],
          ["Vitalidade Fantasma", `Você recebe pontos de vida temporários.`],
        ],
        "Transmutação": [
          ["Arma Mágica", `Arma recebe bônus ou poderes mágicos.`],
          ["Maaais Klunc", `Ganha enorme força bruta mas perde seu intelecto.`],
          ["Ossos de Adamante", `Ganha ossos extremamente resistentes.`],
          ["Primor Atlético", `Alvo recebe bônus no deslocamento e em testes de Atletismo.`],
          ["Punho de Mitral", `Transforma suas mãos em mitral que aprimora golpes desarmados.`],
          ["Queda Suave", `Alvo cai lentamente.`],
          ["Toque do Horizonte", `Melhora a precisão de armas de ataque a distância.`],
          ["Transmutar Objetos", `Pode consertar ou fabricar um objeto temporário.`],
        ],
      },
      2: {
        "Abjuração": [
          ["Campo de Força", `Cria uma película protetora que absorve dano.`],
          ["Desfazer Engenhoca", `Desfaz efeitos ativos de engenhocas.`],
          ["Dissipar Magia", `Encerra os efeitos de magias ativas em um alvo ou área.`],
          ["Refúgio", `Cria um domo para abrigar o conjurador e seus aliados.`],
          ["Runa de Proteção", `Runa protege passagem ou objeto.`],
          ["Traição Mágica", `Causa dano com base nas magias de círculos o afetando.`],
        ],
        "Adivinhação": [
          ["Ligação Telepática", `Estabelece um vínculo telepático entre duas ou mais criaturas.`],
          ["Localização", `Determina em que direção está um objeto ou criatura a sua escolha.`],
          ["Mapear", `Traça um esboço de mapa dos arredores.`],
          ["Viagem Onírica", `Faz você adormecer e sair do seu corpo físico, se tornando um espírito.`],
        ],
        "Convocação": [
          ["Amarras Etéreas", `Laços de energia prendem o alvo.`],
          ["Momento de Tormenta", `Convoca uma nuvem rubra que tem alguns efeitos.`],
          ["Montaria Arcana", `Convoca um cavalo que serve como montaria.`],
          ["Salto Dimensional", `Teletransporta você e outras criaturas para um ponto dentro do alcance.`],
          ["Servos Invisíveis", `Seres invisíveis realizam tarefas para você.`],
          ["Transposição", `Faz criaturas voluntárias trocar de lugar.`],
        ],
        "Encantamento": [
          ["Desafio Corajoso", `Se torna influência de ações hostis.`],
          ["Desespero Esmagador", `Criaturas na área perdem a vontade de lutar.`],
          ["Marca da Obediência", `Símbolo mágico obriga o alvo a cumprir uma ordem.`],
          ["Sussurros Insanos", `Deixa o alvo confuso.`],
        ],
        "Evocação": [
          ["Bola de Fogo", `Esfera incandescente explode, causando dano em todas as criaturas na área.`],
          ["Emular Magia", `Pode lançar magias que tenha visto ser lançada desde sua última rodada.`],
          ["Flecha Ácida", `Dispara um projétil de ácido que corrói armaduras e outros objetos.`],
          ["Relâmpago", `Causa dano de eletricidade em criaturas numa linha.`],
          ["Sopro das Uivantes", `Explosão em cone causa dano de frio e empurra alvos.`],
        ],
        "Ilusão": [
          ["Aparência Perfeita", `Aumenta o Carisma e concede bônus em perícias sociais.`],
          ["Camuflagem Ilusória", `A imagem do alvo fica distorcida, concedendo camuflagem.`],
          ["Esculpir Sons", `Altera os sons emitidos pelos alvos.`],
          ["Invisibilidade", `Você se torna invisível por um curto período.`],
        ],
        "Necromancia": [
          ["Aura de Morte", `Se alimenta de sua força vital e das outras criaturas na área.`],
          ["Conjurar Mortos-Vivos", `Ergue mortos-vivos para lutar por você.`],
          ["Crânio Voador de Vladislav", `Crânio flutuante causa dano em um alvo.`],
          ["Toque Vampírico", `Toque causa dano e absorve pontos de vida.`],
        ],
        "Transmutação": [
          ["Alterar Tamanho", `Aumenta ou diminui o tamanho de objetos e criaturas.`],
          ["Conjurar Armadilha", `Modifica o terreno para se tornar uma armadilha.`],
          ["Máquina de Combate", `Sobrecarrega a fonte de um construto, se tornando ágil e forte mas se quebrando a cada ação padrão.`],
          ["Metamorfose", `Transforma o corpo do alvo.`],
          ["Piscar", `Está transitando entre o plano etéreo e material na mesma velocidade de um "piscar".`],
          ["Poção Explosiva", `Transforma o conteúdo da poção em algo volátil e explosivo.`],
          ["Velocidade", `Alvo pode fazer ações adicionais.`],
        ],
      },
      3: {
        "Abjuração": [
          ["Âncora Dimensional", `Impede o alvo de se afastar de um ponto, mesmo com teletransporte.`],
          ["Dificultar Detecção", `Protege uma criatura ou objeto contra detecção e vidência.`],
          ["Globo de Invulnerabilidade", `Esfera protege contra magias de 1º e 2º círculos.`],
        ],
        "Adivinhação": [
          ["Contato Extraplanar", `Você barganha com criaturas de outros planos para obter ajuda.`],
          ["Lendas e Histórias", `Descobre detalhes sobre criaturas, objetos e lugares.`],
          ["Vidência", `Pode ver e ouvir os arredores de uma criatura.`],
        ],
        "Convocação": [
          ["Convocação Instantânea", `Teletransporta um objeto marcado para suas mãos.`],
          ["Enxame Rubro de Ichabod", `Invoca uma massa rastejante de demônios da Tormenta.`],
          ["Teletransporte", `Transporta você e outras criaturas e objetos para um local instantaneamente.`],
        ],
        "Encantamento": [
          ["Imobilizar", `Alvo fica lento ou paralisado.`],
          ["Selo de Mana", `Você sela a energia de uma criatura, impedindo que use pontos de mana.`],
        ],
        "Evocação": [
          ["Erupção Glacial", `Estacas de gelo explodem do chão, ferindo e derrubando os alvos.`],
          ["Lança Ígnea de Aleph", `Projétil de magma explode no alvo, causando dano por rodada.`],
          ["Muralha Elemental", `Evoca um muro feito de fogo ou gelo.`],
        ],
        "Ilusão": [
          ["Ilusão Lacerante", `Cria uma ilusão perigosa que pode causar dano real.`],
          ["Manto de Sombras", `Conjurador se cobre de sombras mágicas para vários efeitos.`],
          ["Miragem", `Altera uma área de forma ilusória.`],
        ],
        "Necromancia": [
          ["Coração Imortal", `Concentra sua força vital em uma parte específica, recebendo benefícios enormes.`],
          ["Ferver Sangue", `Criatura tem seu sangue aquecido até borbulhar, causando dano.`],
          ["Servo Morto-Vivo", `Cria um parceiro morto-vivo sob seu comando.`],
          ["Tentáculos de Trevas", `Tentáculos de energia negativa atacam e agarram criaturas na área.`],
        ],
        "Transmutação": [
          ["Pele de Pedra", `Endurece sua pele, fornecendo redução de dano.`],
          ["Telecinesia", `Move e arremessa criaturas e objetos com a mente.`],
          ["Transformação de Guerra", `Você recebe habilidades superiores de combate, mas perde a habilidade de lançar magias.`],
          ["Voo", `Você recebe deslocamento voo 12m.`],
        ],
      },
      4: {
        "Abjuração": [
          ["Campo Antimagia", `Barreira suprime todos os efeitos mágicos.`],
          ["Libertação", `O alvo fica imune a efeitos que impeçam ou restrinjam movimentação.`],
        ],
        "Adivinhação": [
          ["Sonho", `Você entra nos sonhos de uma criatura e pode interagir com ela lá.`],
          ["Visão da Verdade", `Você enxerga através de camuflagem, escuridão, ilusão e transmutação.`],
        ],
        "Convocação": [
          ["Conjurar Elemental", `Convoca um elemental como parceiro.`],
          ["Mão Poderosa de Talude", `Mão gigante feita de energia pode realizar várias ações.`],
          ["Viagem Planar", `Viaja até outro plano de existência.`],
        ],
        "Encantamento": [
          ["Alterar Memória", `Pode apagar ou modificar a memória recente do alvo.`],
          ["Marionete", `Controla o corpo do alvo.`],
        ],
        "Evocação": [
          ["Raio Polar", `Causa dano de frio e congela alvo.`],
          ["Relâmpago Flamejante de Reynard", `Dispara rajadas de fogo e relâmpago.`],
          ["Talho Invisível de Edauros", `Lâmina de ar em alta velocidade corta os alvos.`],
        ],
        "Ilusão": [
          ["Duplicata Ilusória", `Imagem projetada copia seus movimentos e ações.`],
          ["Explosão Caleidoscópica", `Explosão de luzes e sons desabilita os alvos.`],
        ],
        "Necromancia": [
          ["Assassino Fantasmagórico", `Conjura um fantasma que persegue e tenta matar o alvo.`],
          ["Muralha de Ossos", `Barreira de ossos afiados impede o avanço dos inimigos.`],
        ],
        "Transmutação": [
          ["Animar Objetos", `Objetos comuns ganham vida e obedecem a seus comandos.`],
          ["Controlar a Gravidade", `Manipula os efeitos da gravidade em uma área.`],
          ["Desintegrar", `Raio transforma um alvo em pó.`],
          ["Forma Etérea", `Você pode se tornar etéreo enquanto a magia durar.`],
          ["Transformação em Dragão", `Se torna algo semelhante a um "Dragão".`],
        ],
      },
      5: {
        "Abjuração": [
          ["Aprisionamento", `Prende o alvo de diversas formas poderosas.`],
          ["Engenho de Mana", `Disco de energia flutuante é capaz de absorver magias e gerar PM.`],
          ["Invulnerabilidade", `Recebe uma série de imunidades físicas ou mentais a sua escolha.`],
        ],
        "Adivinhação": [
          ["Alterar Destino", `Enxerga o futuro, podendo alterar o resultado de um teste.`],
          ["Projetar Consciência", `Pode observar qualquer local ou criatura.`],
        ],
        "Convocação": [
          ["Buraco Negro", `Abre uma ruptura no espaço que suga tudo ao redor.`],
          ["Chuva de Meteoros", `Convoca um enorme meteorito incandescente.`],
          ["Semiplano", `Cria uma pequena dimensão.`],
        ],
        "Encantamento": [
          ["Legião", `Você pode dominar a mente de vários alvos ao mesmo tempo e comandar suas vontades.`],
          ["Palavra Primordial", `Palavras mágicas podem atordoar, cegar e até matar uma criatura.`],
          ["Possessão", `Transfere sua consciência para o corpo do alvo, tomando controle total.`],
        ],
        "Evocação": [
          ["Barragem Elemental de Vectorius", `Lança esferas elementais explosivas.`],
          ["Deflagração de Mana", `Explosão de energia bruta causa dano e afeta magias e itens mágicos.`],
          ["Mata-Dragão", `Dispara uma rajada de energia destruidora.`],
        ],
        "Ilusão": [
          ["Réquiem", `Prende os alvos em uma realidade ilusória que se repete infinitamente.`],
          ["Sombra Assassina", `Manifesta uma cópia ilusória do alvo, que luta contra ele.`],
        ],
        "Necromancia": [
          ["Roubar a Alma", `Arranca a alma do alvo e a prende em um objeto.`],
          ["Toque da Morte", `Pode matar uma criatura instantaneamente.`],
        ],
        "Transmutação": [
          ["Controlar o Tempo", `Acelera, avança ou para o tempo.`],
          ["Desejo", `Modifica a realidade a seu bel-prazer.`],
        ],
      },
    },

    // ───────────────────────── MAGIAS DIVINAS ──────────────────────
    divina: {
      1: {
        "Abjuração": [
          ["Escapatória de Hyninn", `Ganha agilidade e Ladinagem.`],
          ["Escudo da Fé", `Protege uma criatura.`],
          ["Frescor de Lena", `Purifica o ar ao redor, exceto por magia.`],
          ["Instante Estoico", `Invoca a proteção de Khalmyr.`],
          ["Orbe do Oceano", `Cria um globo protetor de água salgada.`],
          ["Proteção de Tauron", `Oferece a proteção do Deus da Força.`],
          ["Proteção Divina", `Alvo recebe bônus em testes de resistência.`],
          ["Resistência a Energia", `Fornece resistência contra um tipo de dano a sua escolha.`],
          ["Santuário", `Inimigos devem passar num teste de Vontade para atacá-lo.`],
          ["Sigilo de Sszzaas", `Preserva informações próprias.`],
          ["Suporte Ambiental", `Ignora efeitos de calor e frio e pode respirar na água.`],
        ],
        "Adivinhação": [
          ["Aviso", `Envia um alerta telepático para uma criatura.`],
          ["Compreensão", `Você entende qualquer coisa escrita ou falada e pode ouvir pensamentos.`],
          ["Detectar Ameaças", `Detecta perigos ao seu redor.`],
          ["Futuro Melhor", `Enxerga todas as possibilidades de eventos recentes.`],
          ["Orientação", `Alvo recebe bônus nos testes de perícia.`],
          ["Percepção Rubra", `Adquire por um tempo a percepção estranha dos lefeu.`],
          ["Visão Mística", `Você pode ver auras mágicas.`],
        ],
        "Convocação": [
          ["Arma Espiritual", `Cria uma arma de energia que ataca seus inimigos.`],
          ["Caminhos da Natureza", `Convoca um espírito que guia você e seus aliados em terreno selvagem.`],
          ["Criar Elementos", `Cria uma quantidade minúscula de água, ar, fogo ou terra.`],
          ["Névoa", `Cria uma névoa que oferece camuflagem.`],
          ["Posse de Arsenal", `Cria um vínculo poderoso entre você e seu item.`],
        ],
        "Encantamento": [
          ["Acalmar Animal", `Um animal fica prestativo.`],
          ["Bênção", `Fornece bônus em ataques e dano.`],
          ["Comando", `Força o alvo a obedecer a uma ordem.`],
          ["Discrição", `Torna sua aparência desinteressante, despercebido facilmente por todos.`],
          ["Euforia de Valkaria", `Enche o alvo de disposição e apaga o medo em seu coração.`],
          ["Paixão de Marah", `Se torna mais interessante e atraente.`],
          ["Tranquilidade", `Acalma criaturas na área.`],
          ["Voz da Razão", `Sua mente transborda conhecimentos e argumentos de Tanna-Toh.`],
        ],
        "Evocação": [
          ["Bofetada de Nimb", `Algo bem humilhante; alvo fica desprevenido e vulnerável.`],
          ["Consagrar", `Abençoa a área, maximizando PV curados por luz.`],
          ["Curar Ferimentos", `Seu toque recupera pontos de vida.`],
          ["Despedaçar", `Som alto e agudo causa atordoamento e dano de impacto.`],
          ["Flecha de Luz", `Lança uma flecha luminosa contra o alvo.`],
          ["Fúria dos Antepassados", `Invoca a alma de um antepassado para acusar o alvo de seus erros.`],
          ["Luz", `Objeto ilumina como uma tocha.`],
          ["Poder de Kallyadranoch", `Manifesta uma pequena parte da força do Deus dos Dragões.`],
          ["Siroco de Azgher", `Invoca a fúria do Deus do Sol em uma breve tempestade de areia.`],
          ["Sorriso da Fortuna", `Concede a capacidade de trapacear em jogos.`],
        ],
        "Ilusão": [
          ["Perturbação Sombria", `Cria uma área escura e cheia de assombrações.`],
        ],
        "Necromancia": [
          ["Escuridão", `Objeto emana uma área de escuridão.`],
          ["Execução de Thwor", `Transforma seu próximo ataque em um crítico.`],
          ["Infligir Ferimentos", `Seu toque causa dano de trevas e pode deixar fraco.`],
          ["Infortúnio de Sszzaas", `Faz o alvo ficar mais suscetível a efeitos nocivos.`],
          ["Perdição", `Inimigos sofrem penalidade nos ataques e danos.`],
          ["Profanar", `Conspurca a área, maximizando dano de trevas.`],
        ],
        "Transmutação": [
          ["Abençoar Alimentos", `Purifica refeição, que também fornece bônus temporários.`],
          ["Arma de Jade", `Transforma a arma no material de jade.`],
          ["Arma Mágica", `Arma recebe bônus ou poderes mágicos.`],
          ["Armamento da Natureza", `Arma natural ou primitiva causa dano como se fosse maior.`],
          ["Arsenal de Allihanna", `Invoca uma arma de madeira.`],
          ["Controlar Plantas", `Vegetação enreda criaturas.`],
          ["Magia Dadivosa", `Aposte com a mana para receber... mana.`],
          ["Toque de Megalokk", `Transforma você em um monstro.`],
        ],
      },
      2: {
        "Abjuração": [
          ["Círculo da Justiça", `Causa penalidades em Enganação, Furtividade e Ladinagem.`],
          ["Couraça de Allihanna", `Transforma armadura e vestimenta em algo arbóreo.`],
          ["Desfazer Engenhoca", `Desfaz efeitos ativos de engenhocas.`],
          ["Dissipar Magia", `Encerra os efeitos de uma magia ativa em um alvo ou área.`],
          ["Runa de Proteção", `Runa protege passagem ou objeto.`],
          ["Traição da Lâmina", `Amaldiçoa a arma de um inimigo.`],
          ["Traição Mágica", `Causa dano com base nas magias de círculos o afetando.`],
          ["Vestimenta da Fé", `Traje, armadura ou escudo recebe bônus na Defesa.`],
        ],
        "Adivinhação": [
          ["Augúrio", `Diz se uma ação trará resultados bons, ruins ou ambos.`],
          ["Condição", `Monitora a condição (PV, condições, magias afetando) de criaturas tocadas.`],
          ["Globo da Verdade de Gwen", `Globo revela cena vista pelo conjurador.`],
          ["Mente Divina", `Fornece bônus em um ou mais atributos mentais.`],
          ["Voz Divina", `Permite conversar com criaturas variadas, plantas, rochas e cadáveres.`],
        ],
        "Convocação": [
          ["Enxame de Pestes", `Convoca um enxame que causa dano toda rodada.`],
          ["Momento de Tormenta", `Convoca uma nuvem rubra que tem alguns efeitos.`],
          ["Soco de Arsenal", `Alvo sofre dano de impacto e é empurrado.`],
        ],
        "Encantamento": [
          ["Aliado Animal", `Um animal prestativo se torna um parceiro.`],
          ["Marca da Obediência", `Símbolo mágico obriga o alvo a cumprir uma ordem.`],
          ["Oração", `Aliados recebem bônus e inimigos sofrem penalidades em testes e rolagens.`],
        ],
        "Evocação": [
          ["Controlar Fogo", `Move ou apaga uma chama, esquenta um objeto ou cria armas flamejantes.`],
          ["Emular Magia", `Pode lançar magias que tenha visto ser lançada desde sua última rodada.`],
          ["Punição do Profano", `Inflige dano a devotos de divindades adversárias.`],
          ["Purificação", `Toque remove condições prejudiciais.`],
          ["Raio Solar", `Linha causa dano de luz e deixa criaturas ofuscadas.`],
          ["Tempestade Divina", `Causa penalidades e permite fazer relâmpagos caírem.`],
        ],
        "Ilusão": [
          ["Silêncio", `Cria uma área em que é impossível ouvir sons ou lançar magias.`],
        ],
        "Necromancia": [
          ["Conjurar Mortos-Vivos", `Ergue mortos-vivos para lutar por você.`],
          ["Miasma Mefítico", `Nuvem causa dano de ácido e enjoo.`],
          ["Rogar Maldição", `O alvo sofre efeitos prejudiciais variados.`],
        ],
        "Transmutação": [
          ["Controlar Madeira", `Fortalece, molda, repele ou deforma um objeto de madeira.`],
          ["Físico Divino", `Fornece bônus em um ou mais atributos físicos.`],
        ],
      },
      3: {
        "Abjuração": [
          ["Banimento", `Expulsa criaturas de outros planos e destrói mortos-vivos.`],
          ["Proteção contra Magia", `Concede bônus em testes de resistência contra magias.`],
        ],
        "Adivinhação": [
          ["Comunhão com a Natureza", `Você recebe dados para usar como bônus em testes de perícias.`],
          ["Lendas e Histórias", `Descobre detalhes sobre criaturas, objetos e magias.`],
          ["Vidência", `Pode ver e ouvir os arredores de uma criatura.`],
        ],
        "Convocação": [
          ["Servo Divino", `Invoca um espírito para realizar uma tarefa, por um preço.`],
          ["Viagem Arbórea", `Você pode usar árvores e plantas para se teletransportar.`],
        ],
        "Encantamento": [
          ["Despertar Consciência", `Plantas e animais ganham consciência e se tornam parceiros.`],
          ["Heroísmo", `Alvo fica imune a medo e ganha bônus contra inimigos mais poderosos do que ele.`],
          ["Imobilizar", `Alvo fica lento ou paralisado.`],
          ["Missão Divina", `Alvo deve cumprir uma tarefa, ou sofrer penalidades em testes.`],
          ["Selo de Mana", `Você sela a energia de uma criatura, impedindo que use pontos de mana.`],
        ],
        "Evocação": [
          ["Coluna de Chamas", `Os céus despejam luz e fogo sobre seus inimigos.`],
          ["Dispersar as Trevas", `Dispersão anula magias, protege aliados e cega inimigos.`],
          ["Sopro da Salvação", `Cone cura aliados e remove condições prejudiciais.`],
        ],
        "Ilusão": [
          ["Manto de Sombras", `Conjurador se cobre de sombras mágicas para vários efeitos.`],
        ],
        "Necromancia": [
          ["Anular a Luz", `Explosão anula magias, protege aliados e enjoa inimigos.`],
          ["Coração Imortal", `Concentra sua força vital em uma parte específica, recebendo benefícios enormes.`],
          ["Poeira da Podridão", `Nuvem causa dano de trevas e impede magia de cura.`],
          ["Servo Morto-Vivo", `Cria um parceiro morto-vivo sob seu comando.`],
        ],
        "Transmutação": [
          ["Controlar Água", `Congela, derrete, evapora, aumenta ou reduz o nível de um corpo d'água.`],
          ["Controlar Terra", `Amolece, molda ou solidifica uma área de terra, pedra ou similar.`],
          ["Pele de Pedra", `Endurece sua pele, fornecendo redução de dano.`],
          ["Potência Divina", `Você aumenta de tamanho e recebe bônus de Força e redução de dano, mas perde a habilidade de lançar magias.`],
        ],
      },
      4: {
        "Abjuração": [
          ["Cúpula de Repulsão", `Campo de força invisível impede a aproximação de um tipo de criatura.`],
          ["Libertação", `O alvo fica imune a efeitos que impeçam ou restrinjam movimentação.`],
        ],
        "Adivinhação": [
          ["Premonição", `Você vislumbra o futuro e pode refazer testes.`],
          ["Visão da Verdade", `Você enxerga através de camuflagem, escuridão, ilusão e transmutação.`],
        ],
        "Convocação": [
          ["Guardião Divino", `Elemental de luz cura aliados.`],
          ["Viagem Planar", `Viaja até outro plano de existência.`],
        ],
        "Encantamento": [
          ["Conceder Milagre", `Alvo pode lançar uma de suas magias de 2º círculo ou menor.`],
        ],
        "Evocação": [
          ["Círculo da Restauração", `Círculo de energia luminosa restaura PV e PM.`],
          ["Cólera de Azgher", `Explosão solar cega, incendeia e causa dano.`],
          ["Manto do Cruzado", `Invoca um manto de energia que concede poderes a quem o vestir.`],
          ["Terremoto", `Tremor de terra causa dano de impacto.`],
        ],
        "Necromancia": [
          ["Ligação Sombria", `Alvo sofre todo dano e efeitos negativos que você sofrer.`],
          ["Muralha de Ossos", `Barreira de ossos afiados impede o avanço dos inimigos.`],
        ],
        "Transmutação": [
          ["Controlar o Clima", `Muda o clima de uma área.`],
        ],
      },
      5: {
        "Abjuração": [
          ["Aura Divina", `Emana poder divino bruto, afetando as criaturas na área.`],
          ["Invulnerabilidade", `Recebe uma série de imunidades físicas ou mentais a sua escolha.`],
          ["Lágrimas de Wynna", `Alvo perde a capacidade de lançar magias arcanas.`],
        ],
        "Adivinhação": [
          ["Projetar Consciência", `Pode observar qualquer local ou criatura.`],
        ],
        "Convocação": [
          ["Buraco Negro", `Abre uma ruptura no espaço que suga tudo ao redor.`],
          ["Intervenção Divina", `Convoca sua divindade para que realize um milagre.`],
        ],
        "Encantamento": [
          ["Palavra Primordial", `Palavras mágicas podem atordoar, cegar e até matar uma criatura.`],
        ],
        "Evocação": [
          ["Fúria do Panteão", `Nuvem gera efeitos destrutivos.`],
          ["Katana Celestial", `Um corte vindo diretamente dos céus.`],
          ["Segunda Chance", `Cura e ressuscita aliados.`],
        ],
        "Necromancia": [
          ["Reanimação Impura", `Ressuscita uma criatura morta, mas como um zumbi sob seu controle.`],
          ["Roubar a Alma", `Arranca a alma do alvo e a prende em um objeto.`],
          ["Toque da Morte", `Pode matar uma criatura instantaneamente.`],
        ],
      },
    },
  };

  const TIPO_LABEL = { arcana: 'Arcana', divina: 'Divina' };

  // ── Lista achatada de registros [{ nome, circulo, escola, tipo, descricao }] ──
  //    POR_CIRCULO[c] = registros daquele círculo (arcanos + divinos).
  const TODAS = [];
  const POR_CIRCULO = { 1: [], 2: [], 3: [], 4: [], 5: [] };
  for (const tipo of ['arcana', 'divina']) {
    for (const c of [1, 2, 3, 4, 5]) {
      const escolas = DADOS[tipo][c] || {};
      for (const escola of Object.keys(escolas)) {
        for (const [nome, descricao] of escolas[escola]) {
          const reg = { nome, circulo: c, escola, tipo, descricao };
          TODAS.push(reg);
          POR_CIRCULO[c].push(reg);
        }
      }
    }
  }

  // ── Configuração padrão ──────────────────────────────────────────
  //  modo              → 'quantidade' (N exato) | 'porcentagem' (cada
  //                      magia tem `prob`% de aparecer) | 'ambos'
  //                      (sorteia `quantidade` candidatas e cada uma
  //                      ainda passa por uma chance de `prob`%).
  //  quantidade        → quantos pergaminhos devem aparecer na loja
  //  prob              → chance (%) de cada magia, nos modos % e ambos
  //  permitirRepeticao → pode sortear a mesma magia mais de uma vez?
  //  circulosExcluidos → lista de círculos que NÃO devem aparecer
  const MODOS_VALIDOS = ['quantidade', 'porcentagem', 'ambos'];
  const CONFIG_PADRAO = {
    modo: 'quantidade',
    quantidade: 8,
    prob: 50,
    permitirRepeticao: false,
    circulosExcluidos: [],
  };

  let _config = _clonar(CONFIG_PADRAO);

  function _clonar(o) { return JSON.parse(JSON.stringify(o)); }

  function _clamp(v, min, max) {
    v = Number(v);
    if (isNaN(v)) v = min;
    return Math.max(min, Math.min(max, Math.round(v)));
  }

  // ── Preço / custo de aprendizado ──────────────────────────────────
  function pmDe(circulo) { return PM_POR_CIRCULO[circulo] || 0; }

  // Preço de COMPRA do pergaminho: T$ 30 × (PM²), PM mínimo 1.
  function precoPergaminho(circulo) {
    const pm = Math.max(1, pmDe(circulo));
    return PRECO_PERGAMINHO_FATOR * pm * pm;
  }

  // Custo para APRENDER a magia (poder Escriba Arcano): T$ 250 × PM.
  function precoAprender(circulo) { return pmDe(circulo) * PRECO_APRENDER_POR_PM; }

  // Monta o objeto completo de um pergaminho de uma magia.
  //  Aceita um registro { nome, circulo, escola, tipo, descricao } OU
  //  a forma antiga montarPergaminho(nome, circulo).
  function montarPergaminho(reg, circuloArg) {
    let nome, circulo, escola = '', tipo = '', descricao = '';
    if (reg && typeof reg === 'object') {
      ({ nome, circulo, escola = '', tipo = '', descricao = '' } = reg);
    } else {
      nome = reg; circulo = circuloArg;
    }
    const pm       = pmDe(circulo);
    const compra   = precoPergaminho(circulo);
    const aprender = precoAprender(circulo);
    return {
      nome,
      circulo,
      escola,
      tipo,                                // 'arcana' | 'divina'
      tipoLabel:       TIPO_LABEL[tipo] || '',
      descricao,
      pm,
      peso:            PESO_PERGAMINHO,
      precoPergaminho: compra,             // comprar o pergaminho (30 × PM²)
      precoAprender:   aprender,           // custo ADICIONAL para aprender (250 × PM)
      precoTotal:      compra + aprender,  // comprar + aprender
      diasAprender:    pm,                 // 1 dia por PM
    };
  }

  // ── API de configuração ──────────────────────────────────────────
  function obterConfig() { return _clonar(_config); }

  function definirConfig(novo) {
    if (!novo || typeof novo !== 'object') return;
    if (MODOS_VALIDOS.includes(novo.modo)) {
      _config.modo = novo.modo;
    }
    if (novo.quantidade != null) {
      _config.quantidade = _clamp(novo.quantidade, 0, 999);
    }
    if (novo.prob != null) {
      _config.prob = _clamp(novo.prob, 0, 100);
    }
    if (novo.permitirRepeticao != null) {
      _config.permitirRepeticao = !!novo.permitirRepeticao;
    }
    if (Array.isArray(novo.circulosExcluidos)) {
      _config.circulosExcluidos = novo.circulosExcluidos
        .map(Number)
        .filter(c => c >= 1 && c <= 5);
    }
  }

  // ── Geração ──────────────────────────────────────────────────────
  function _embaralhar(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // Amostragem unificada: devolve a lista de magias sorteadas do pool
  // `permitidas`, conforme o modo (quantidade / porcentagem / ambos).
  function _amostrar(permitidas, cfg) {
    if (!permitidas.length) return [];
    const modo    = MODOS_VALIDOS.includes(cfg.modo) ? cfg.modo : 'quantidade';
    const qtd     = _clamp(cfg.quantidade, 0, 999);
    const prob    = _clamp(cfg.prob, 0, 100);
    const repetir = !!cfg.permitirRepeticao;

    // modo porcentagem: cada magia do catálogo é testada uma vez
    if (modo === 'porcentagem') {
      return permitidas.filter(() => Math.random() * 100 <= prob);
    }

    // modos quantidade / ambos: monta `qtd` candidatas
    let candidatas;
    if (repetir) {
      candidatas = [];
      for (let i = 0; i < qtd; i++) {
        candidatas.push(permitidas[Math.floor(Math.random() * permitidas.length)]);
      }
    } else {
      candidatas = _embaralhar(permitidas).slice(0, qtd);
    }

    // no modo ambos, cada candidata ainda passa por uma chance de prob%
    if (modo === 'ambos') {
      candidatas = candidatas.filter(() => Math.random() * 100 <= prob);
    }
    return candidatas;
  }

  function gerar() {
    const cfg = _config;
    const excl = new Set(cfg.circulosExcluidos || []);
    const permitidas = TODAS.filter(m => !excl.has(m.circulo));

    const pergaminhos = _amostrar(permitidas, cfg).map(m => montarPergaminho(m));

    // ordena por círculo, depois tipo (arcana antes de divina) e por nome
    pergaminhos.sort((a, b) =>
      (a.circulo - b.circulo) ||
      (a.tipo < b.tipo ? -1 : a.tipo > b.tipo ? 1 : 0) ||
      (a.nome < b.nome ? -1 : a.nome > b.nome ? 1 : 0));

    return {
      tipo: 'magias',
      total: pergaminhos.length,
      pergaminhos,
      config: _clonar(cfg),
    };
  }

  // ── Exportação ───────────────────────────────────────────────────
  return {
    PRECO_APRENDER_POR_PM,
    PRECO_PERGAMINHO_FATOR,
    PM_POR_CIRCULO,
    PESO_PERGAMINHO,
    TIPO_LABEL,
    DADOS,
    POR_CIRCULO,
    TODAS,
    precoPergaminho,
    precoAprender,
    montarPergaminho,
    gerar,
    obterConfig,
    definirConfig,
    CONFIG_PADRAO: _clonar(CONFIG_PADRAO),
  };
})();

// Expõe globalmente p/ outros módulos. itens-descricoes.js usa
// window.Magias.TODAS como fallback de descrição de poções, óleos e
// granadas no Gerador de Recompensas e na Loja.
window.Magias = Magias;
