/* ═══════════════════════════════════════════════════════════════════
   GUARDA-LOCAL — a rede de segurança das Bases e da Viagem (26/11/2026)
   Pedido dele: "robustez maior de base e viagem… pra não ter erro de nada".
   Quatro peças, usadas pelos dois módulos:

   1. ler(chave)       — lê o JSON guardado. Se ele estiver ESTRAGADO, a
                         cópia crua vai para `<chave>#estragado` ANTES de
                         qualquer gravação — antes o próximo salvar gravava
                         uma lista vazia por cima e o conteúdo sumia.
   2. avisoEstragado() — a faixa que conta isso na tela, com o botão de
                         baixar o arquivo estragado (para tentar salvar à mão).
   3. desfazer()       — o aviso "Removido · ↶ Desfazer" de 10 s. O que só
                         pode acontecer DEPOIS (limpar a caixa dos jogadores
                         no banco) espera o aviso sumir sem desfazer.
   4. redesenhar()     — não redesenha debaixo do cursor: se alguém está
                         escrevendo na aba, o redesenho espera ele sair do
                         campo (os dados já foram relidos; só a tela espera).
   ═══════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  const SUFIXO = '#estragado';

  function ler(chave) {
    let txt = null;
    try { txt = localStorage.getItem(chave); } catch (e) { return { dados: null, estragado: false }; }
    if (!txt) return { dados: null, estragado: false };
    try { return { dados: JSON.parse(txt), estragado: false }; }
    catch (e) {
      try { if (!localStorage.getItem(chave + SUFIXO)) localStorage.setItem(chave + SUFIXO, txt); } catch (e2) {}
      console.warn('[guarda-local] conteúdo estragado em', chave, '— cópia guardada em', chave + SUFIXO);
      return { dados: null, estragado: true };
    }
  }
  function temEstragado(chave) {
    try { return !!localStorage.getItem(chave + SUFIXO); } catch (e) { return false; }
  }
  function avisoEstragado(chave, rotulo) {
    if (!temEstragado(chave)) return '';
    const esc = window.GA_esc || (s => String(s));
    return `<div class="gl-aviso" role="alert">
        <strong>⚠ O arquivo das ${esc(rotulo)} neste navegador estava estragado</strong> e não pôde ser lido.
        A cópia original foi guardada intacta — baixe-a para recuperar à mão (ou mande para quem cuida do site).
        <span class="gl-aviso-acoes">
          <button type="button" class="gl-btn" data-gl-baixar="${esc(chave)}">⬇ Baixar a cópia estragada</button>
          <button type="button" class="gl-btn gl-btn--sec" data-gl-esquecer="${esc(chave)}">Já resolvi — esquecer</button>
        </span>
      </div>`;
  }
  document.addEventListener('click', e => {
    const b = e.target.closest && e.target.closest('[data-gl-baixar], [data-gl-esquecer]');
    if (!b) return;
    if (b.hasAttribute('data-gl-baixar')) {
      const ch = b.getAttribute('data-gl-baixar');
      let txt = ''; try { txt = localStorage.getItem(ch + SUFIXO) || ''; } catch (err) {}
      if (window.baixarTxt) window.baixarTxt(ch.replace(/[^\w@.-]+/g, '_') + '_estragado.txt', txt);
      return;
    }
    const ch = b.getAttribute('data-gl-esquecer');
    if (!window.confirm('Apagar a cópia estragada guardada? Faça isso só depois de baixá-la ou de ter certeza de que não precisa dela.')) return;
    try { localStorage.removeItem(ch + SUFIXO); } catch (err) {}
    const av = b.closest('.gl-aviso'); if (av) av.remove();
  });

  // ── o aviso de desfazer ──────────────────────────────────────────
  let pilha = null;
  function desfazer(texto, aoDesfazer, depois) {
    if (!pilha) {
      pilha = document.createElement('div');
      pilha.className = 'gl-pilha';
      pilha.setAttribute('aria-live', 'polite');
      document.body.appendChild(pilha);
    }
    const esc = window.GA_esc || (s => String(s));
    const el = document.createElement('div');
    el.className = 'gl-toast';
    el.innerHTML = `<span>${esc(texto)}</span><button type="button" class="gl-btn">↶ Desfazer</button>`;
    pilha.appendChild(el);
    let feito = false;
    const fim = (desfez) => {
      if (feito) return; feito = true;
      clearTimeout(t); el.remove();
      try { if (desfez) aoDesfazer && aoDesfazer(); else depois && depois(); }
      catch (err) { console.warn('[guarda-local] desfazer:', err); }
    };
    const t = setTimeout(() => fim(false), 10000);
    el.querySelector('button').addEventListener('click', () => fim(true));
    //  fechar/recarregar a página confirma o que estava esperando
    window.addEventListener('pagehide', () => fim(false), { once: true });
  }

  // ── não redesenhar debaixo do cursor ─────────────────────────────
  function editandoDentro(cont) {
    const a = document.activeElement;
    if (!cont || !a || !cont.contains(a)) return false;
    return a.isContentEditable || /^(INPUT|TEXTAREA)$/.test(a.tagName) && !/^(checkbox|radio|button|file)$/i.test(a.type || '');
  }
  function redesenhar(cont, render) {
    if (!editandoDentro(cont)) { render(); return; }
    if (cont._glPendente) return;
    cont._glPendente = true;
    const solto = () => {
      setTimeout(() => {
        if (editandoDentro(cont)) return;                 // foi para outro campo da mesma aba
        cont.removeEventListener('focusout', solto);
        cont._glPendente = false;
        render();
      }, 0);
    };
    cont.addEventListener('focusout', solto);
  }

  window.GA_GuardaLocal = { ler, avisoEstragado, desfazer, redesenhar };
})();
