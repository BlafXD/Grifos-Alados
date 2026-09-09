// ═══════════════════════════════════════════════════════════════════
//  MODO-JOGADOR.JS — trava de "só visualizar" do jogadores.html
//  Os jogadores navegam, buscam, abrem descrições e nuvens — mas não
//  rolam, não editam e não apagam nada. A garantia DURA é do banco (a
//  mesa só o mestre escreve; as caixas que são deles, só as contas
//  Google que ele listou nas regras); aqui é a experiência: esconder e
//  bloquear os controles de mestre para ninguém se confundir.
//
//  Política: Consultas (#perigos) é livre (é tudo material de regra,
//  incluindo a calculadora de Culinária, que não guarda nada). Loja,
//  Viagem e Bases ficam só-leitura, fora as caixas [data-jog-edita]:
//  liberamos navegação (abas da loja, busca, recolher/expandir, nuvens
//  ga-tip) e bloqueamos o resto na
//  fase de captura — os módulos usam listeners delegados, então o
//  stopPropagation aqui impede qualquer handler de rodar.
// ═══════════════════════════════════════════════════════════════════
(function () {
  'use strict';

  document.documentElement.classList.add('ga-jogador');

  // As caixas [data-jog-edita] são deles — mas só depois de entrar com o
  // Google: quem escreve na mesa é a conta que o mestre listou nas regras
  // do banco (ver MODO-JOGADOR.md). Quem avisa desse login é o
  // sync-jogador.js, pelo permitirEdicao() do fim do arquivo. Se ele nunca
  // chamar — Firebase não configurado, CDN fora do ar —, fica como sempre
  // foi: liberadas, porque aí não há banco nenhum do outro lado.
  let edicaoLiberada = true;

  // sempre permitidos, em qualquer aba. As caixas marcadas com
  // [data-jog-edita] são as que os jogadores escrevem de propósito (na aba
  // Bases: Residentes, Inventário da base e o Inventário dos jogadores; na
  // Viagem: o diário e as paradas que o mestre revelou) — entram inteiras,
  // com a barra de formatação delas.
  const PERMITIDOS =
    '.nav-link, .cr-subtab, .nc-camp-aba, summary, .ga-tip, .ga-tip-pop, ' +
    '.loja-aba, .loja-busca, .cr-busca, .vg-toggle, .bs-toggle, .vg-regras, ' +
    '[data-jog-edita]';

  // Seções onde a trava NÃO vale. Consultas é material de regra, e a Mesa
  // é de todo mundo: é lá que o jogador entra na conta, pede para entrar e
  // vê quem está na mesa. Travar a Mesa junto com o resto deixava os
  // botões dela mudos — o que acontecia até 08/09/2026.
  //  ficha: a folha do jogador é DELE — escreve, rola e apaga à vontade.
  const SECOES_LIVRES = { perigos: true, mesa: true, ficha: true };

  function bloquearClique(e) {
    const t = e.target;
    if (!(t instanceof Element)) return;
    if (t.closest(PERMITIDOS)) return;
    const sec = t.closest('section');
    if (!sec || SECOES_LIVRES[sec.id]) return;
    if (t.closest('button, [data-acao], [data-rich-desc], [data-aj-toggle], ' +
                  '[data-log-ver], [data-log-limpar], select, input, label, [contenteditable]')) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  function bloquearEntrada(e) {
    const t = e.target;
    if (!(t instanceof Element)) return;
    if (t.closest('.loja-busca, .cr-busca')) return;   // buscar pode, sempre
    if (t.closest('[data-jog-edita]')) return;         // as caixas que são deles
    const sec = t.closest('section');
    if (!sec || SECOES_LIVRES[sec.id]) return;
    e.stopPropagation();                             // nenhum handler salva nada
  }

  // Uma seção LIVRE não é travada por nada — nem pela trava geral, nem
  // pelo login. A ficha de personagem é o caso: ela mora no localStorage
  // deste navegador e nunca chega ao banco, então exigir a conta do Google
  // para escrever nela seria trancar a porta de uma casa vazia.
  function emSecaoLivre(el) {
    const sec = el.closest('section');
    return !!(sec && SECOES_LIVRES[sec.id]);
  }

  // as caixas ricas deixam de ser editáveis — menos as marcadas com
  // [data-jog-edita], que existem para eles escreverem
  function travarEdicao() {
    document.querySelectorAll('[contenteditable="true"]').forEach(el => {
      if (el.closest('[data-jog-edita]') || emSecaoLivre(el)) return;
      el.setAttribute('contenteditable', 'false');
    });
    // as deles seguem o login, nos dois sentidos: destravam quando alguém
    // entra e voltam a travar quando sai. Por isso o seletor pega
    // [contenteditable] inteiro, e não só o ="true" de cima — uma caixa
    // travada não se acharia sozinha para ser destravada.
    document.querySelectorAll('[data-jog-edita] [contenteditable]').forEach(el => {
      if (emSecaoLivre(el)) return;
      el.setAttribute('contenteditable', edicaoLiberada ? 'true' : 'false');
    });
  }

  function init() {
    document.addEventListener('click',  bloquearClique, true);
    document.addEventListener('input',  bloquearEntrada, true);
    document.addEventListener('change', bloquearEntrada, true);
    document.addEventListener('paste',  bloquearEntrada, true);

    travarEdicao();
    // qualquer re-render futuro (troca de loja no histórico etc.) re-trava
    new MutationObserver(travarEdicao)
      .observe(document.body, { childList: true, subtree: true });

    // volta para onde o jogador estava antes do auto-recarregar do sync
    let secao = '', scroll = 0;
    try {
      secao = sessionStorage.getItem('gaJog.secao') || '';
      scroll = parseInt(sessionStorage.getItem('gaJog.scroll'), 10) || 0;
      sessionStorage.removeItem('gaJog.secao');
      sessionStorage.removeItem('gaJog.scroll');
    } catch (e) {}
    if (secao) {
      const link = document.querySelector('.nav-link[data-section="' + secao + '"]');
      if (link) link.click();
    }
    if (scroll) setTimeout(() => window.scrollTo({ top: scroll, behavior: 'auto' }), 60);
  }

  // O sync-jogador.js chama isto sempre que o login muda.
  //  `comCadeado` = já dá para mostrar na tela que está travado. No primeiro
  //  instante da página ainda não se sabe se a sessão do Google vai ser
  //  retomada; travar já é certo, mas desenhar o cadeado para quem estava
  //  logado seria uma mentira de meio segundo.
  window.GA_ModoJogador = {
    permitirEdicao: function (pode, comCadeado) {
      edicaoLiberada = !!pode;
      document.documentElement.classList.toggle('ga-jog-travado', !pode && comCadeado !== false);
      travarEdicao();
    },
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
