// ═══════════════════════════════════════════════════════════════════
//  PARCEIROS (Tormenta 20, p. 259–262) — 03/11/2026
//
//  "Parceiros são NPCs que se aventuram com o grupo." Eles NÃO têm
//  turno e NÃO agem: cada um ajuda UM personagem, dando um bônus que
//  depende do TIPO e do nível de poder (iniciante, veterano, mestre).
//
//  O limite é por patamar, e está escrito com todas as letras na p. 260:
//    · personagens iniciantes (até o 4º nível) …… 1 parceiro
//    · veteranos e campeões (do 5º ao 16º) ……… até 2
//    · lendas (do 17º em diante) ………………… até 3
//  "Se um efeito fornecer um parceiro temporário além do seu limite,
//  você não se beneficiará dele — mas pode passá-lo para outro
//  personagem." Por isso a ficha conta e avisa, mas não impede: é o
//  mestre quem decide, e há uma pilha de poderes que dão parceiro
//  "que não conta em seu limite" (daí a chave ☆ de cada linha).
//
//  Os textos são os do livro, palavra por palavra. Onde o livro põe
//  uma observação fora da escada iniciante/veterano/mestre, ela vem em
//  `nota` — e não misturada no nível, que foi o cuidado de sempre aqui.
//  As montarias são um tipo específico de parceiro (p. 261) e trazem a
//  categoria de tamanho ao lado do nome, como o livro imprime.
// ═══════════════════════════════════════════════════════════════════
window.GA_PARCEIROS = {
  // Tabela do limite, por nível de personagem (p. 260).
  LIMITES: [
    { ate: 4,   quantos: 1, patamar: 'iniciante' },
    { ate: 16,  quantos: 2, patamar: 'veterano e campeão' },
    { ate: 999, quantos: 3, patamar: 'lenda' },
  ],
  NIVEIS: [
    { id: 'iniciante', nome: 'Iniciante', dado: 'd4' },
    { id: 'veterano',  nome: 'Veterano',  dado: 'd6' },
    { id: 'mestre',    nome: 'Mestre',    dado: 'd8' },
  ],

  TIPOS: [
    // ── os doze tipos de parceiro (p. 260–261) ──────────────────────
    { id: 'adepto', nome: 'Adepto', grupo: 'Parceiros',
      resumo: 'Um conjurador capaz de ajudá-lo a lançar suas magias.',
      iniciante: 'O custo para lançar suas magias de 1º círculo diminui −1 PM.',
      veterano:  'Como acima, mas também reduz o custo de suas magias de 2º círculo.',
      mestre:    'Como acima, e esta redução se torna cumulativa com outras reduções.' },

    { id: 'ajudante', nome: 'Ajudante', grupo: 'Parceiros',
      resumo: 'Um bardo, nobre ou sábio que ajuda com palavras firmes ou encorajadoras.',
      iniciante: 'Você recebe +2 em duas perícias.',
      veterano:  'Muda para +2 em três perícias.',
      mestre:    'Muda para +4 em três perícias.',
      nota: 'As perícias são definidas pelo parceiro. Um ajudante não pode fornecer bônus em Luta ou Pontaria.' },

    { id: 'assassino', nome: 'Assassino', grupo: 'Parceiros',
      resumo: 'Um ladino ou outro tipo furtivo e letal.',
      iniciante: 'Você pode usar a habilidade Ataque Furtivo +1d6. Se já possui a habilidade, o bônus é cumulativo.',
      veterano:  'Além do Ataque Furtivo, fornece bônus por flanquear contra um inimigo por rodada.',
      mestre:    'Muda o dano do Ataque Furtivo para +2d6.',
      nota: 'Além de fornecer +2 em testes de ataque corpo a corpo, o bônus por flanquear facilita que o personagem use seu Ataque Furtivo.' },

    { id: 'atirador', nome: 'Atirador', grupo: 'Parceiros',
      resumo: 'Um arqueiro, besteiro ou outro combatente à distância.',
      iniciante: 'Uma vez por rodada, você recebe +1d6 em uma rolagem de dano à distância.',
      veterano:  'Muda para +1d10.',
      mestre:    'Muda para +2d8.' },

    { id: 'combatente', nome: 'Combatente', grupo: 'Parceiros',
      resumo: 'Um bucaneiro, guerreiro, paladino ou animal de caça.',
      iniciante: '+2 em testes de ataque.',
      veterano:  'Muda para +3 em testes de ataque.',
      mestre:    'Muda para +4 em testes de ataque e, uma vez por rodada, você pode gastar 5 PM para fazer um ataque extra.' },

    { id: 'destruidor', nome: 'Destruidor', grupo: 'Parceiros',
      resumo: 'Um arcanista ou inventor.',
      iniciante: 'Uma vez por rodada, como uma ação livre, você pode gastar 1 PM para causar 2d6 pontos de dano de ácido, eletricidade, fogo ou frio (de acordo com o parceiro) em um alvo em alcance curto.',
      veterano:  'Como acima, mas você também pode gastar 2 PM para causar 4d6 pontos de dano.',
      mestre:    'Como acima, mas você também pode gastar 4 PM para causar 6d6 pontos de dano em uma área de 6m de raio em alcance médio.' },

    { id: 'fortao', nome: 'Fortão', grupo: 'Parceiros',
      resumo: 'Um bárbaro, lutador ou outro tipo que bate primeiro e pensa depois.',
      iniciante: 'Uma vez por rodada, você recebe +1d8 em uma rolagem de dano corpo a corpo.',
      veterano:  'Muda para +1d12.',
      mestre:    'Muda para +3d6.' },

    { id: 'guardiao', nome: 'Guardião', grupo: 'Parceiros',
      resumo: 'Um cavaleiro, cão de guarda ou outro NPC cuja função primária é proteger.',
      iniciante: 'Você recebe +2 na Defesa.',
      veterano:  'Muda para +3.',
      mestre:    'Muda para +4 na Defesa e +2 em testes de resistência.' },

    { id: 'magivocador', nome: 'Magivocador', grupo: 'Parceiros',
      resumo: 'Um conjurador especializado em magias ofensivas.',
      iniciante: 'O dano de suas magias aumenta em +1 dado do mesmo tipo.',
      veterano:  'Como acima, e a CD para resistir a suas magias aumenta em +1.',
      mestre:    'Como acima, mas dobra os bônus (para um total de +2 dados de dano e +2 na CD).' },

    { id: 'medico', nome: 'Médico', grupo: 'Parceiros',
      resumo: 'Um clérigo, druida, herbalista ou outro NPC com capacidades curativas.',
      iniciante: 'Uma vez por rodada você pode gastar 1 PM para curar 1d8+1 PV de uma criatura adjacente.',
      veterano:  'Como acima, mas você pode gastar 3 PM para curar 3d8+3 PV ou remover uma condição prejudicial (como abalado ou fatigado).',
      mestre:    'Como acima, mas você também pode gastar 5 PM para curar 6d8+6 PV.' },

    { id: 'perseguidor', nome: 'Perseguidor', grupo: 'Parceiros',
      resumo: 'Um caçador, animal farejador ou outro especialista em localizar alvos.',
      iniciante: '+2 em Percepção e Sobrevivência.',
      veterano:  'Você pode usar Sentidos Aguçados.',
      mestre:    'Você pode usar Percepção às Cegas.' },

    { id: 'vigilante', nome: 'Vigilante', grupo: 'Parceiros',
      resumo: 'Um vigia ou animal de guarda, sempre atento aos arredores.',
      iniciante: '+2 em Percepção e Iniciativa.',
      veterano:  'Você pode usar Esquiva Sobrenatural.',
      mestre:    'Você pode usar Olhos nas Costas.' },

    // ── as seis montarias (p. 261–262) ──────────────────────────────
    { id: 'cavalo', nome: 'Cavalo', grupo: 'Montarias', tamanho: 'Grande', montaria: true,
      resumo: 'A montaria mais comum do Reinado.',
      iniciante: 'Seu deslocamento muda para 12m e você recebe uma ação de movimento extra por turno (apenas para se deslocar).',
      veterano:  'Como acima, mas seu deslocamento muda para 15m e você recebe +2 em ataques corpo a corpo.',
      mestre:    'Como acima, mas você recebe uma segunda ação de movimento extra por turno (novamente, apenas para se deslocar).',
      nota: 'Estas estatísticas também se aplicam a pôneis (tamanho Médio).' },

    { id: 'cao-de-caca', nome: 'Cão de caça', grupo: 'Montarias', tamanho: 'Médio ou Pequeno', montaria: true,
      resumo: 'Cães de porte adequado são montarias comuns para personagens Pequenos ou Minúsculos.',
      iniciante: 'Seu deslocamento muda para 9m, você pode usar faro e recebe uma ação de movimento extra por turno (apenas para se deslocar).',
      veterano:  'Como acima, mas seu deslocamento muda para 12m e você recebe +2 na Defesa.',
      mestre:    'Como acima; além disso, uma vez por rodada, quando acerta um ataque corpo a corpo, você pode fazer a manobra derrubar como uma ação livre.' },

    { id: 'lobo-das-cavernas', nome: 'Lobo-das-cavernas', grupo: 'Montarias', tamanho: 'Grande', montaria: true,
      resumo: 'Primos primitivos e maiores dos lobos comuns, são usados como montaria por goblinoides e aventureiros selvagens.',
      iniciante: 'Seu deslocamento muda para 12m e você recebe uma ação de movimento extra por turno (apenas para se deslocar).',
      veterano:  'Como acima, mas seu deslocamento muda para 15m e, uma vez por rodada, você recebe +1d8 em uma rolagem de dano corpo a corpo.',
      mestre:    'Como acima; além disso, uma vez por rodada, quando acerta um ataque corpo a corpo, você pode fazer a manobra derrubar como uma ação livre.',
      nota: 'Estas estatísticas também se aplicam a lobos comuns (tamanho Médio).' },

    { id: 'grifo', nome: 'Grifo', grupo: 'Montarias', tamanho: 'Grande', montaria: true,
      resumo: 'Esta fera majestosa é muito cobiçada por heróis.',
      iniciante: 'Uma vez por rodada, você recebe +1d8 em uma rolagem de dano corpo a corpo (um grifo iniciante é um filhote e não pode ser usado como montaria).',
      veterano:  'Como acima, mas pode ser usado como montaria, mudando seu deslocamento para voo 18m.',
      mestre:    'Como acima, mas você recebe uma ação de movimento extra por turno (apenas para se deslocar).' },

    { id: 'gorlogg', nome: 'Gorlogg', grupo: 'Montarias', tamanho: 'Grande', montaria: true,
      resumo: 'Esta besta primitiva é usada como montaria pelos mais selvagens.',
      iniciante: 'Seu deslocamento muda para 12m e, uma vez por rodada, você recebe +1d6 em uma rolagem de dano corpo a corpo.',
      veterano:  'Como acima, mas o bônus em rolagens de dano corpo a corpo muda para +1d10.',
      mestre:    'Seu deslocamento muda para 15m e o bônus em rolagens de dano corpo a corpo muda para +2d8.' },

    { id: 'trobo', nome: 'Trobo', grupo: 'Montarias', tamanho: 'Grande', montaria: true,
      resumo: 'Usados como animais de carga e tração, trobos também servem como montarias.',
      iniciante: 'Seu deslocamento muda para 9m e você recebe uma ação de movimento extra por turno (apenas para se deslocar) e +1 em testes de resistência.',
      veterano:  'Como acima, mas seu deslocamento muda para 12m e o bônus em testes de resistência muda para +2.',
      mestre:    'Como acima, mas o bônus em testes de resistência muda para +5.' },
  ],

  //  As regras que a ficha repete em miúdo, porque a mesa esquece.
  REGRAS: [
    'Parceiros <strong>não têm turno e não realizam ações</strong>: cada um ajuda <strong>um</strong> personagem, com um bônus (p. 260).',
    'Cada parceiro ajuda <strong>só um personagem por vez</strong>. No início do seu turno, uma <strong>ação de movimento</strong> passa um parceiro para outro personagem em alcance curto até o fim da cena — e, se for animal, é preciso ser treinado em <strong>Adestramento</strong>.',
    'Parceiros <strong>não podem ser alvos de ações hostis</strong>; em situações dramáticas, o mestre pode decidir que algo acontece com eles.',
    'Parceiro vindo de <strong>habilidade</strong> só muda de poder quando a própria habilidade mandar. Montaria <strong>comprada</strong> é sempre parceiro iniciante (p. 261).',
    'Na variante <em>Parceiros Vulneráveis</em>, a cada dano que você sofre rola-se um dado por parceiro — <strong>d4</strong> iniciante, <strong>d6</strong> veterano, <strong>d8</strong> mestre. No “1” ele fica ferido; no segundo “1”, morre.',
  ],
  FONTE: 'Tormenta 20, p. 259–262 (Capítulo Seis — O Mestre).',

  //  Quantos parceiros este nível pode ter, e o nome do patamar.
  limite: function (nivel) {
    const n = Math.max(1, parseInt(nivel, 10) || 1);
    return this.LIMITES.find(function (l) { return n <= l.ate; }) || this.LIMITES[this.LIMITES.length - 1];
  },
  porId: function (id) {
    return this.TIPOS.find(function (t) { return t.id === id; }) || null;
  },
};
