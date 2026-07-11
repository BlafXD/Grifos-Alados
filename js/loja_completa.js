// ═════════════════════════════════════════════════════
//  LOJA_COMPLETA.JS — Geração da loja (normal + especial)
//  Convertido de backend/loja_completa.py — roda 100% no navegador.
//  Localização: /grifos-alados/js/loja_completa.js
//
//  A geração agora é controlada por TIPO de item, via um objeto de
//  configuração (ver CONFIG_PADRAO). A aba de Ajustes em loja.js lê e
//  escreve essa configuração através de obterConfig() / definirConfig().
//
//  Uso (em loja.js):
//    LojaCompleta.definirConfig(meuConfig);   // opcional
//    const normal   = LojaCompleta.gerarLojaNormal();
//    const especial = LojaCompleta.gerarLojaEspecial();
// ═════════════════════════════════════════════════════

const LojaCompleta = (function () {
  'use strict';

  // ── DADOS BASE (pré-parseados do loja_completa.py) ────────────
  //  Campos estáveis de cada item. A probabilidade e o desconto NÃO
  //  ficam aqui — são controlados por tipo, no objeto _config abaixo.
  const ITENS_BASE = [{"kind": "weapon","name": "Adaga","category": "Corpo a Corpo — Leves","price": 2.0,"damage": "1d4","crit": "19","alcance": "Curto","tipo": "Perfuração","peso": 1.0},{"kind": "weapon","name": "Espada curta","category": "Corpo a Corpo — Leves","price": 10.0,"damage": "1d6","crit": "19","alcance": "Corpo a corpo","tipo": "Perfuração","peso": 1.0},{"kind": "weapon","name": "Foice","category": "Corpo a Corpo — Leves","price": 4.0,"damage": "1d6","crit": "x3","alcance": "Corpo a corpo","tipo": "Corte","peso": 1.0},{"kind": "weapon","name": "Bastão lúdico","category": "Corpo a Corpo — Leves","price": 5.0,"damage": "1d6","crit": "X2","alcance": "Corpo a corpo","tipo": "Impacto","peso": 1.0},{"kind": "weapon","name": "Porrete","category": "Corpo a Corpo — Leves","price": 2.0,"damage": "1d6","crit": "X2","alcance": "Corpo a corpo","tipo": "Impacto","peso": 1.0},{"kind": "weapon","name": "Clava","category": "Corpo a Corpo — Uma Mão","price": null,"damage": "1d6","crit": "x2","alcance": "Corpo a corpo","tipo": "Impacto","peso": 1.0},{"kind": "weapon","name": "Lança","category": "Corpo a Corpo — Uma Mão","price": 2.0,"damage": "1d6","crit": "x2","alcance": "Curto","tipo": "Perfuração","peso": 1.0},{"kind": "weapon","name": "Maça","category": "Corpo a Corpo — Uma Mão","price": 12.0,"damage": "1d8","crit": "x2","alcance": "Corpo a corpo","tipo": "Impacto","peso": 1.0},{"kind": "weapon","name": "Bordão","category": "Corpo a Corpo — Duas Mãos","price": null,"damage": "1d6/1d6","crit": "x2","alcance": "Corpo a corpo","tipo": "Impacto","peso": 2.0},{"kind": "weapon","name": "Pique","category": "Corpo a Corpo — Duas Mãos","price": 2.0,"damage": "1d8","crit": "x2","alcance": "Corpo a corpo","tipo": "Perfuração","peso": 2.0},{"kind": "weapon","name": "Tacape","category": "Corpo a Corpo — Duas Mãos","price": null,"damage": "1d10","crit": "x2","alcance": "Corpo a corpo","tipo": "Impacto","peso": 2.0},{"kind": "weapon","name": "Azagaia","category": "Ataque à Distância — Uma Mão","price": 1.0,"damage": "1d6","crit": "x2","alcance": "Médio","tipo": "Perfuração","peso": 1.0},{"kind": "weapon","name": "Besta leve","category": "Ataque à Distância — Uma Mão","price": 35.0,"damage": "1d8","crit": "19","alcance": "Médio","tipo": "Perfuração","peso": 1.0},{"kind": "weapon","name": "Virotes (20)","category": "Ataque à Distância — Uma Mão","price": 2.0,"damage": "-","crit": "-","alcance": "Corpo a corpo","tipo": "-","peso": 1.0},{"kind": "weapon","name": "Funda","category": "Ataque à Distância — Uma Mão","price": null,"damage": "1d4","crit": "x2","alcance": "Médio","tipo": "Impacto","peso": 1.0},{"kind": "weapon","name": "Pedras (20)","category": "Ataque à Distância — Uma Mão","price": 0.5,"damage": "-","crit": "-","alcance": "Corpo a corpo","tipo": "-","peso": 1.0},{"kind": "weapon","name": "Besta de mão","category": "Ataque à Distância — Uma Mão","price": 30.0,"damage": "1d6","crit": "19","alcance": "Curto","tipo": "Perfuração","peso": 1.0},{"kind": "weapon","name": "Zarabatana","category": "Ataque à Distância — Uma Mão","price": 5.0,"damage": "1d3","crit": "X2","alcance": "Curto","tipo": "Perfuração","peso": 1.0},{"kind": "weapon","name": "Dardos (20)","category": "Ataque à Distância — Uma Mão","price": 2.0,"damage": "-","crit": "-","alcance": "Corpo a corpo","tipo": "-","peso": 0.5},{"kind": "weapon","name": "Arco curto","category": "Ataque à Distância — Duas Mãos","price": 30.0,"damage": "1d6","crit": "x3","alcance": "Médio","tipo": "Perfuração","peso": 2.0},{"kind": "weapon","name": "Flechas (20)","category": "Ataque à Distância — Duas Mãos","price": 1.0,"damage": "-","crit": "-","alcance": "Corpo a corpo","tipo": "-","peso": 1.0},{"kind": "weapon","name": "Machadinha","category": "Corpo a Corpo — Leves","price": 6.0,"damage": "1d6","crit": "x3","alcance": "Curto","tipo": "Corte","peso": 1.0},{"kind": "weapon","name": "Adaga oposta","category": "Corpo a Corpo — Leves","price": 12.0,"damage": "1d4","crit": "19","alcance": "Corpo a corpo","tipo": "Perfuração","peso": 1.0},{"kind": "weapon","name": "Agulha de Ahlen","category": "Corpo a Corpo — Leves","price": 10.0,"damage": "1d4","crit": "19","alcance": "Corpo a corpo","tipo": "Perfuração","peso": 1.0},{"kind": "weapon","name": "Cinquedea","category": "Corpo a Corpo — Leves","price": 18.0,"damage": "1d4","crit": "19","alcance": "Corpo a corpo","tipo": "Perfuração","peso": 1.0},{"kind": "weapon","name": "Dirk","category": "Corpo a Corpo — Leves","price": 15.0,"damage": "1d4","crit": "19","alcance": "Corpo a corpo","tipo": "Perfuração","peso": 1.0},{"kind": "weapon","name": "Martelo leve","category": "Corpo a Corpo — Leves","price": 2.0,"damage": "1d4","crit": "X4","alcance": "Curto","tipo": "Impacto","peso": 1.0},{"kind": "weapon","name": "Neko-te","category": "Corpo a Corpo — Leves","price": 10.0,"damage": "1d4","crit": "19","alcance": "Corpo a corpo","tipo": "Corte","peso": 1.0},{"kind": "weapon","name": "Cimitarra","category": "Corpo a Corpo — Uma Mão","price": 15.0,"damage": "1d6","crit": "18","alcance": "Corpo a corpo","tipo": "Corte","peso": 1.0},{"kind": "weapon","name": "Espada longa","category": "Corpo a Corpo — Uma Mão","price": 15.0,"damage": "1d8","crit": "19","alcance": "Corpo a corpo","tipo": "Corte","peso": 1.0},{"kind": "weapon","name": "Florete","category": "Corpo a Corpo — Uma Mão","price": 20.0,"damage": "1d6","crit": "18","alcance": "Corpo a corpo","tipo": "Perfuração","peso": 1.0},{"kind": "weapon","name": "Machado de batalha","category": "Corpo a Corpo — Uma Mão","price": 10.0,"damage": "1d8","crit": "x3","alcance": "Corpo a corpo","tipo": "Corte","peso": 1.0},{"kind": "weapon","name": "Mangual","category": "Corpo a Corpo — Uma Mão","price": 8.0,"damage": "1d8","crit": "x2","alcance": "Corpo a corpo","tipo": "Impacto","peso": 1.0},{"kind": "weapon","name": "Martelo de guerra","category": "Corpo a Corpo — Uma Mão","price": 12.0,"damage": "1d8","crit": "x3","alcance": "Corpo a corpo","tipo": "Impacto","peso": 1.0},{"kind": "weapon","name": "Picareta","category": "Corpo a Corpo — Uma Mão","price": 8.0,"damage": "1d6","crit": "x4","alcance": "Corpo a corpo","tipo": "Perfuração","peso": 1.0},{"kind": "weapon","name": "Tridente","category": "Corpo a Corpo — Uma Mão","price": 15.0,"damage": "1d8","crit": "x2","alcance": "Curto","tipo": "Perfuração","peso": 1.0},{"kind": "weapon","name": "Espada larga","category": "Corpo a Corpo — Uma Mão","price": 8.0,"damage": "2d4","crit": "X2","alcance": "Corpo a corpo","tipo": "Corte","peso": 1.0},{"kind": "weapon","name": "Espadim","category": "Corpo a Corpo — Uma Mão","price": 300.0,"damage": "1d8","crit": "X2","alcance": "Corpo a corpo","tipo": "Corte","peso": 1.0},{"kind": "weapon","name": "Gládio","category": "Corpo a Corpo — Uma Mão","price": 12.0,"damage": "1d6","crit": "19/X3","alcance": "Corpo a corpo","tipo": "Perfuração","peso": 1.0},{"kind": "weapon","name": "Maça-estrela","category": "Corpo a Corpo — Uma Mão","price": 20.0,"damage": "2d4","crit": "X2","alcance": "Corpo a corpo","tipo": "Impacto e perfuração","peso": 1.0},{"kind": "weapon","name": "Clava-grão","category": "Corpo a Corpo — Uma Mão","price": 90.0,"damage": "1d6","crit": "x2","alcance": "Corpo a corpo","tipo": "Impacto","peso": 1.0},{"kind": "weapon","name": "Espada canora","category": "Corpo a Corpo — Uma Mão","price": 50.0,"damage": "1d6","crit": "19","alcance": "Corpo a corpo","tipo": "Perfuração","peso": 1.0},{"kind": "weapon","name": "Serrilheira","category": "Corpo a Corpo — Uma Mão","price": 25.0,"damage": "1d6","crit": "19","alcance": "Corpo a corpo","tipo": "Corte","peso": 1.0},{"kind": "weapon","name": "Alabarda","category": "Corpo a Corpo — Duas Mãos","price": 10.0,"damage": "1d10","crit": "x3","alcance": "Corpo a corpo","tipo": "Corte/perfuração","peso": 2.0},{"kind": "weapon","name": "Alfange","category": "Corpo a Corpo — Duas Mãos","price": 75.0,"damage": "2d4","crit": "18","alcance": "Corpo a corpo","tipo": "Corte","peso": 2.0},{"kind": "weapon","name": "Gadanho","category": "Corpo a Corpo — Duas Mãos","price": 18.0,"damage": "2d4","crit": "x4","alcance": "Corpo a corpo","tipo": "Corte","peso": 2.0},{"kind": "weapon","name": "Lança montada","category": "Corpo a Corpo — Duas Mãos","price": 10.0,"damage": "1d8","crit": "x3","alcance": "Corpo a corpo","tipo": "Perfuração","peso": 2.0},{"kind": "weapon","name": "Machado de guerra","category": "Corpo a Corpo — Duas Mãos","price": 20.0,"damage": "1d12","crit": "x3","alcance": "Corpo a corpo","tipo": "Corte","peso": 2.0},{"kind": "weapon","name": "Marreta","category": "Corpo a Corpo — Duas Mãos","price": 20.0,"damage": "3d4","crit": "x2","alcance": "Corpo a corpo","tipo": "Impacto","peso": 2.0},{"kind": "weapon","name": "Montante","category": "Corpo a Corpo — Duas Mãos","price": 50.0,"damage": "2d6","crit": "19","alcance": "Corpo a corpo","tipo": "Corte","peso": 2.0},{"kind": "weapon","name": "Bico de corvo","category": "Corpo a Corpo — Duas Mãos","price": 15.0,"damage": "1d8","crit": "X3","alcance": "Corpo a corpo","tipo": "Impacto/perfuração","peso": 2.0},{"kind": "weapon","name": "Desmontador","category": "Corpo a Corpo — Duas Mãos","price": 20.0,"damage": "-","crit": "-","alcance": "Corpo a corpo","tipo": "-","peso": 2.0},{"kind": "weapon","name": "Espada de execução","category": "Corpo a Corpo — Duas Mãos","price": 75.0,"damage": "2d6","crit": "18/X4","alcance": "Corpo a corpo","tipo": "Corte","peso": 2.0},{"kind": "weapon","name": "Lança de justa","category": "Corpo a Corpo — Duas Mãos","price": 3.0,"damage": "1d8","crit": "X2","alcance": "Corpo a corpo","tipo": "Perfuração","peso": 2.0},{"kind": "weapon","name": "Malho","category": "Corpo a Corpo — Duas Mãos","price": 8.0,"damage": "1d10","crit": "X2","alcance": "Corpo a corpo","tipo": "Impacto","peso": 2.0},{"kind": "weapon","name": "Martelo longo","category": "Corpo a Corpo — Duas Mãos","price": 12.0,"damage": "2d4","crit": "X4","alcance": "Corpo a corpo","tipo": "Impacto/perfuração","peso": 2.0},{"kind": "weapon","name": "Tan-korak","category": "Corpo a Corpo — Duas Mãos","price": 40.0,"damage": "1d8","crit": "X2","alcance": "Corpo a corpo","tipo": "Impacto","peso": 2.0},{"kind": "weapon","name": "Tetsubo","category": "Corpo a Corpo — Duas Mãos","price": 20.0,"damage": "1d10","crit": "X2","alcance": "Corpo a corpo","tipo": "Impacto","peso": 2.0},{"kind": "weapon","name": "Tai-tai","category": "Ataque à Distância — Uma Mão","price": 60.0,"damage": "2d4","crit": "X2","alcance": "Médio","tipo": "Perfuração","peso": 2.0},{"kind": "weapon","name": "Arco longo","category": "Ataque à Distância — Duas Mãos","price": 100.0,"damage": "1d8","crit": "x3","alcance": "Médio","tipo": "Perfuração","peso": 2.0},{"kind": "weapon","name": "Besta pesada","category": "Ataque à Distância — Duas Mãos","price": 50.0,"damage": "1d12","crit": "19","alcance": "Médio","tipo": "Perfuração","peso": 2.0},{"kind": "weapon","name": "Virotes (20)","category": "Ataque à Distância — Duas Mãos","price": 2.0,"damage": "-","crit": "-","alcance": "Corpo a corpo","tipo": "-","peso": 1.0},{"kind": "weapon","name": "Arco montado","category": "Ataque à Distância — Duas Mãos","price": 45.0,"damage": "1d6","crit": "X3","alcance": "Médio","tipo": "Perfuração","peso": 2.0},{"kind": "weapon","name": "Besta dupla","category": "Ataque à Distância — Duas Mãos","price": 125.0,"damage": "1d8","crit": "19","alcance": "Médio","tipo": "Perfuração","peso": 2.0},{"kind": "weapon","name": "Chicote","category": "Corpo a Corpo — Uma Mão","price": 2.0,"damage": "1d3","crit": "x2","alcance": "Corpo a corpo","tipo": "Corte","peso": 1.0},{"kind": "weapon","name": "Espada bastarda","category": "Corpo a Corpo — Uma Mão","price": 35.0,"damage": "1d10/1d12","crit": "19","alcance": "Corpo a corpo","tipo": "Corte","peso": 1.0},{"kind": "weapon","name": "Katana","category": "Corpo a Corpo — Uma Mão","price": 100.0,"damage": "1d8/1d10","crit": "19","alcance": "Corpo a corpo","tipo": "Corte","peso": 1.0},{"kind": "weapon","name": "Machado anão","category": "Corpo a Corpo — Uma Mão","price": 30.0,"damage": "1d10","crit": "x3","alcance": "Corpo a corpo","tipo": "Corte","peso": 1.0},{"kind": "weapon","name": "Kimbata","category": "Corpo a Corpo — Leves","price": 12.0,"damage": "1d4","crit": "18","alcance": "Corpo a corpo","tipo": "Corte","peso": 1.0},{"kind": "weapon","name": "Açoite finntroll","category": "Corpo a Corpo — Uma Mão","price": 30.0,"damage": "1d8","crit": "X2","alcance": "Corpo a corpo","tipo": "Corte","peso": 1.0},{"kind": "weapon","name": "Espada vespa","category": "Corpo a Corpo — Uma Mão","price": 75.0,"damage": "2d4","crit": "18","alcance": "Corpo a corpo","tipo": "Corte ou perfuração","peso": 1.0},{"kind": "weapon","name": "Espada-gadanho","category": "Corpo a Corpo — Uma Mão","price": 40.0,"damage": "1d6","crit": "18","alcance": "Corpo a corpo","tipo": "Corte","peso": 1.0},{"kind": "weapon","name": "Khopesh","category": "Corpo a Corpo — Uma Mão","price": 20.0,"damage": "1d8","crit": "19/x3","alcance": "Corpo a corpo","tipo": "Corte","peso": 1.0},{"kind": "weapon","name": "Lança de falange","category": "Corpo a Corpo — Uma Mão","price": 15.0,"damage": "1d8","crit": "X3","alcance": "Curto","tipo": "Perfuração","peso": 1.0},{"kind": "weapon","name": "Machado de haste","category": "Corpo a Corpo — Uma Mão","price": 40.0,"damage": "1d8/1d10","crit": "X3","alcance": "Corpo a corpo","tipo": "Corte","peso": 1.0},{"kind": "weapon","name": "Mordida do diabo","category": "Corpo a Corpo — Uma Mão","price": 30.0,"damage": "1d4","crit": "x2","alcance": "Corpo a corpo","tipo": "Perfuração","peso": 1.0},{"kind": "weapon","name": "Pistola-punhal","category": "Corpo a Corpo — Uma Mão","price": 300.0,"damage": "**","crit": "**","alcance": "**","tipo": "Perfuração","peso": 1.0},{"kind": "weapon","name": "Presa de serpente","category": "Corpo a Corpo — Uma Mão","price": 1000.0,"damage": "1d8","crit": "17","alcance": "Corpo a corpo","tipo": "Corte","peso": 1.0},{"kind": "weapon","name": "Rapieira","category": "Corpo a Corpo — Uma Mão","price": 50.0,"damage": "1d8","crit": "18","alcance": "Corpo a corpo","tipo": "Perfuração","peso": 1.0},{"kind": "weapon","name": "Corrente de espinhos","category": "Corpo a Corpo — Duas Mãos","price": 25.0,"damage": "2d4/2d4","crit": "19","alcance": "Corpo a corpo","tipo": "Corte","peso": 2.0},{"kind": "weapon","name": "Machado táurico","category": "Corpo a Corpo — Duas Mãos","price": 50.0,"damage": "2d8","crit": "x3","alcance": "Corpo a corpo","tipo": "Corte","peso": 2.0},{"kind": "weapon","name": "Lança de fogo","category": "Corpo a Corpo — Duas Mãos","price": 1000.0,"damage": "**","crit": "**","alcance": "**","tipo": "Perfuração","peso": 2.0},{"kind": "weapon","name": "Marrão","category": "Corpo a Corpo — Duas Mãos","price": 50.0,"damage": "4d4","crit": "X2","alcance": "Corpo a corpo","tipo": "Impacto","peso": 2.0},{"kind": "weapon","name": "Montante cinético","category": "Corpo a Corpo — Duas Mãos","price": 3000.0,"damage": "2d6","crit": "19/X4","alcance": "Corpo a corpo","tipo": "Corte","peso": 2.0},{"kind": "weapon","name": "Rede","category": "Ataque à Distância — Uma Mão","price": 20.0,"damage": "-","crit": "-","alcance": "Curto","tipo": "-","peso": 1.0},{"kind": "weapon","name": "Arpão","category": "Ataque à Distância — Uma Mão","price": 30.0,"damage": "1d10","crit": "X3","alcance": "Curto","tipo": "Perfuração","peso": 1.0},{"kind": "weapon","name": "Boleadeira","category": "Ataque à Distância — Uma Mão","price": 12.0,"damage": "1d4","crit": "X2","alcance": "Curto","tipo": "Impacto","peso": 1.0},{"kind": "weapon","name": "Chakram","category": "Ataque à Distância — Uma Mão","price": 15.0,"damage": "1d6","crit": "X3","alcance": "Curto","tipo": "Corte","peso": 1.0},{"kind": "weapon","name": "Shuriken","category": "Ataque à Distância — Leve","price": 1.0,"damage": "1d4","crit": "X2","alcance": "Curto","tipo": "Perfuração","peso": 0.5},{"kind": "weapon","name": "Arco de guerra","category": "Ataque à Distância — Duas Mãos","price": 200.0,"damage": "1d12","crit": "X3","alcance": "Médio","tipo": "Perfuração","peso": 2.0},{"kind": "weapon","name": "Balestra","category": "Ataque à Distância — Duas Mãos","price": 180.0,"damage": "1d12","crit": "19","alcance": "Médio","tipo": "Perfuração","peso": 2.0},{"kind": "weapon","name": "Besta de repetição","category": "Ataque à Distância — Duas Mãos","price": 250.0,"damage": "1d8","crit": "19","alcance": "Médio","tipo": "Perfuração","peso": 2.0},{"kind": "weapon","name": "Flechas assobiadoras (20)","category": "Ataque à Distância — Duas Mãos","price": 20.0,"damage": "-","crit": "-","alcance": "Corpo a corpo","tipo": "-","peso": 1.0},{"kind": "weapon","name": "Flechas de caça (20)","category": "Ataque à Distância — Duas Mãos","price": 10.0,"damage": "-","crit": "-","alcance": "Corpo a corpo","tipo": "-","peso": 1.0},{"kind": "weapon","name": "Flechas pesadas (20)","category": "Ataque à Distância — Duas Mãos","price": 10.0,"damage": "-","crit": "-","alcance": "Corpo a corpo","tipo": "-","peso": 1.0},{"kind": "weapon","name": "Virotes pesados (20)","category": "Ataque à Distância — Duas Mãos","price": 20.0,"damage": "-","crit": "-","alcance": "Corpo a corpo","tipo": "-","peso": 1.0},{"kind": "weapon","name": "Pistola","category": "Ataque à Distância — Leve","price": 250.0,"damage": "2d6","crit": "19/x3","alcance": "Curto","tipo": "Perfuração","peso": 1.0},{"kind": "weapon","name": "Balas (20)","category": "Ataque à Distância — Leve","price": 20.0,"damage": "-","crit": "-","alcance": "Corpo a corpo","tipo": "-","peso": 1.0},{"kind": "weapon","name": "Garrucha","category": "Ataque à Distância — Leve","price": 250.0,"damage": "2d4","crit": "19/X3","alcance": "Curto","tipo": "Perfuração","peso": 1.0},{"kind": "weapon","name": "Traque","category": "Ataque à Distância — Leve","price": 75.0,"damage": "2d6","crit": "19/X3","alcance": "Curto","tipo": "Perfuração","peso": 1.0},{"kind": "weapon","name": "Mosquete","category": "Ataque à Distância — Duas Mãos","price": 500.0,"damage": "2d8","crit": "19/x3","alcance": "Médio","tipo": "Perfuração","peso": 2.0},{"kind": "weapon","name": "Balas (20)","category": "Ataque à Distância — Duas Mãos","price": 20.0,"damage": "-","crit": "-","alcance": "Corpo a corpo","tipo": "-","peso": 1.0},{"kind": "weapon","name": "Arcabuz","category": "Ataque à Distância — Duas Mãos","price": 800.0,"damage": "2d10","crit": "19/X3","alcance": "Médio","tipo": "Perfuração","peso": 2.0},{"kind": "weapon","name": "Bacamarte","category": "Ataque à Distância — Duas Mãos","price": 450.0,"damage": "4d6","crit": "19/X3","alcance": "Especial","tipo": "Perfuração","peso": 2.0},{"kind": "weapon","name": "Canhão portátil","category": "Ataque à Distância — Duas Mãos","price": 3000.0,"damage": "4d10","crit": "19/X3","alcance": "Curto","tipo": "Impacto","peso": 2.0},{"kind": "weapon","name": "Bola de ferro (1)","category": "Ataque à Distância — Duas Mãos","price": 5.0,"damage": "-","crit": "-","alcance": "Corpo a corpo","tipo": "-","peso": 0.5},{"kind": "weapon","name": "Sifão cáustico","category": "Ataque à Distância — Duas Mãos","price": 600.0,"damage": "4d6","crit": "x2","alcance": "Especial","tipo": "Ácido","peso": 2.0},{"kind": "armor","name": "Armadura acolchoada","category": "Armaduras Leves","price": 5.0,"armor_bonus": 1,"armor_penalty": "0","armor_weight": 2.0},{"kind": "armor","name": "Armadura de couro","category": "Armaduras Leves","price": 20.0,"armor_bonus": 2,"armor_penalty": "0","armor_weight": 2.0},{"kind": "armor","name": "Couro batido","category": "Armaduras Leves","price": 35.0,"armor_bonus": 3,"armor_penalty": "-1","armor_weight": 2.0},{"kind": "armor","name": "Gibão de peles","category": "Armaduras Leves","price": 25.0,"armor_bonus": 4,"armor_penalty": "-3","armor_weight": 2.0},{"kind": "armor","name": "Couraça","category": "Armaduras Leves","price": 500.0,"armor_bonus": 5,"armor_penalty": "-4","armor_weight": 2.0},{"kind": "armor","name": "Armadura Sensual","category": "Armaduras Leves","price": 55.0,"armor_bonus": 1,"armor_penalty": "0","armor_weight": 2.0},{"kind": "armor","name": "Armadura de Folhas","category": "Armaduras Leves","price": 75.0,"armor_bonus": 2,"armor_penalty": "0","armor_weight": 2.0},{"kind": "armor","name": "Armadura de engenhoqueiro goblin","category": "Armaduras Leves","price": 85.0,"armor_bonus": 3,"armor_penalty": "-2 a -10","armor_weight": 2.0},{"kind": "armor","name": "Armadura de Ossos","category": "Armaduras Leves","price": 120.0,"armor_bonus": 3,"armor_penalty": "-2","armor_weight": 2.0},{"kind": "armor","name": "Veste de teia de aranha","category": "Armaduras Leves","price": 3.0,"armor_bonus": 4,"armor_penalty": "0","armor_weight": 2.0},{"kind": "armor","name": "Cota de Moedas","category": "Armaduras Leves","price": 350.0,"armor_bonus": 4,"armor_penalty": "-3","armor_weight": 2.0},{"kind": "armor","name": "Colete fora da Lei","category": "Armaduras Leves","price": 750.0,"armor_bonus": 5,"armor_penalty": "-5","armor_weight": 2.0},{"kind": "armor","name": "Brunea","category": "Armaduras Pesadas","price": 50.0,"armor_bonus": 5,"armor_penalty": "-2","armor_weight": 5.0},{"kind": "armor","name": "Cota de malha","category": "Armaduras Pesadas","price": 150.0,"armor_bonus": 6,"armor_penalty": "-2","armor_weight": 5.0},{"kind": "armor","name": "Loriga segmentada","category": "Armaduras Pesadas","price": 250.0,"armor_bonus": 7,"armor_penalty": "-3","armor_weight": 5.0},{"kind": "armor","name": "Meia armadura","category": "Armaduras Pesadas","price": 600.0,"armor_bonus": 8,"armor_penalty": "-4","armor_weight": 5.0},{"kind": "armor","name": "Armadura completa","category": "Armaduras Pesadas","price": 3000.0,"armor_bonus": 10,"armor_penalty": "-5","armor_weight": 5.0},{"kind": "armor","name": "Brigantina","category": "Armaduras Pesadas","price": 75.0,"armor_bonus": 6,"armor_penalty": "0","armor_weight": 5.0},{"kind": "armor","name": "Armadura de quitina","category": "Armaduras Pesadas","price": 350.0,"armor_bonus": 7,"armor_penalty": "-3","armor_weight": 5.0},{"kind": "armor","name": "Armadura de chumbo","category": "Armaduras Pesadas","price": 750.0,"armor_bonus": 7,"armor_penalty": "-5","armor_weight": 5.0},{"kind": "armor","name": "Armadura de justa","category": "Armaduras Pesadas","price": 1200.0,"armor_bonus": 9,"armor_penalty": "-5","armor_weight": 5.0},{"kind": "armor","name": "Armadura de hussardo alado","category": "Armaduras Pesadas","price": 4500.0,"armor_bonus": 10,"armor_penalty": "-6","armor_weight": 5.0},{"kind": "armor","name": "Armadura de pedra","category": "Armaduras Pesadas","price": 5500.0,"armor_bonus": 12,"armor_penalty": "-5","armor_weight": 5.0},{"kind": "armor","name": "Escudo leve","category": "Escudos","price": 5.0,"armor_bonus": 1,"armor_penalty": "-1","armor_weight": 1.0},{"kind": "armor","name": "Escudo pesado","category": "Escudos","price": 15.0,"armor_bonus": 2,"armor_penalty": "-2","armor_weight": 2.0},{"kind": "armor","name": "Broquel","category": "Escudos","price": 25.0,"armor_bonus": null,"armor_penalty": "-1","armor_weight": 0.5},{"kind": "armor","name": "Escudo de couro","category": "Escudos","price": 3.0,"armor_bonus": 1,"armor_penalty": "-1","armor_weight": 1.0},{"kind": "armor","name": "Escudo de vime","category": "Escudos","price": 15.0,"armor_bonus": 2,"armor_penalty": "-2","armor_weight": 2.0},{"kind": "armor","name": "Escudo torre","category": "Escudos","price": 45.0,"armor_bonus": 2,"armor_penalty": "-4","armor_weight": 2.0},{"kind": "armor","name": "Sagna","category": "Escudos","price": 20.0,"armor_bonus": 2,"armor_penalty": "-3","armor_weight": 2.0},{"kind": "misc","name": "Água benta","category": "Equipamento de Aventura","price": 10.0,"weight": 0.5},{"kind": "misc","name": "Algemas","category": "Equipamento de Aventura","price": 15.0,"weight": 1.0},{"kind": "misc","name": "Arpéu","category": "Equipamento de Aventura","price": 5.0,"weight": 1.0},{"kind": "misc","name": "Bandoleira de poções","category": "Equipamento de Aventura","price": 20.0,"weight": 1.0},{"kind": "misc","name": "Barraca","category": "Equipamento de Aventura","price": 10.0,"weight": 1.0},{"kind": "misc","name": "Corda","category": "Equipamento de Aventura","price": 1.0,"weight": 1.0},{"kind": "misc","name": "Espelho","category": "Equipamento de Aventura","price": 10.0,"weight": 1.0},{"kind": "misc","name": "Lampião","category": "Equipamento de Aventura","price": 7.0,"weight": 1.0},{"kind": "misc","name": "Mochila","category": "Equipamento de Aventura","price": 2.0,"weight": null},{"kind": "misc","name": "Mochila de aventureiro","category": "Equipamento de Aventura","price": 50.0,"weight": null},{"kind": "misc","name": "Óleo","category": "Equipamento de Aventura","price": 0.1,"weight": 0.5},{"kind": "misc","name": "Organizador de pergaminhos","category": "Equipamento de Aventura","price": 25.0,"weight": 1.0},{"kind": "misc","name": "Pé de cabra","category": "Equipamento de Aventura","price": 2.0,"weight": 1.0},{"kind": "misc","name": "Saco de dormir","category": "Equipamento de Aventura","price": 1.0,"weight": 1.0},{"kind": "misc","name": "Símbolo sagrado","category": "Equipamento de Aventura","price": 5.0,"weight": 1.0},{"kind": "misc","name": "Tocha","category": "Equipamento de Aventura","price": 0.11,"weight": null},{"kind": "misc","name": "Vara de madeira (3m)","category": "Equipamento de Aventura","price": 0.2,"weight": 1.0},{"kind": "misc","name": "Ábaco","category": "Equipamento de Aventura","price": 45.0,"weight": 1.0},{"kind": "misc","name": "Água benta concentrada","category": "Equipamento de Aventura","price": 60.0,"weight": 0.5},{"kind": "misc","name": "Ampulheta","category": "Equipamento de Aventura","price": 45.0,"weight": 1.0},{"kind": "misc","name": "Amuleto de Khalmyr","category": "Equipamento de Aventura","price": 30.0,"weight": 1.0},{"kind": "misc","name": "Amuleto de Nimb","category": "Equipamento de Aventura","price": 30.0,"weight": 1.0},{"kind": "misc","name": "Apanhador de sonhos","category": "Equipamento de Aventura","price": 40.0,"weight": 1.0},{"kind": "misc","name": "Aparelho de chá","category": "Equipamento de Aventura","price": 30.0,"weight": 1.0},{"kind": "misc","name": "Armação para mochila","category": "Equipamento de Aventura","price": 50.0,"weight": null},{"kind": "misc","name": "Asas do texugo","category": "Equipamento de Aventura","price": 200.0,"weight": 2.0},{"kind": "misc","name": "Aspersório","category": "Equipamento de Aventura","price": 50.0,"weight": 1.0},{"kind": "misc","name": "Astrolábio","category": "Equipamento de Aventura","price": 90.0,"weight": 1.0},{"kind": "misc","name": "Bainha adornada","category": "Equipamento de Aventura","price": 100.0,"weight": 1.0},{"kind": "misc","name": "Bússola","category": "Equipamento de Aventura","price": 45.0,"weight": 1.0},{"kind": "misc","name": "Caixa de voz","category": "Equipamento de Aventura","price": 50.0,"weight": 1.0},{"kind": "misc","name": "Cajado de pastor","category": "Equipamento de Aventura","price": 100.0,"weight": 1.0},{"kind": "misc","name": "Cálice consagrado","category": "Equipamento de Aventura","price": 300.0,"weight": 1.0},{"kind": "misc","name": "Cinto de utilidades","category": "Equipamento de Aventura","price": 50.0,"weight": 1.0},{"kind": "misc","name": "Colar do suplicante","category": "Equipamento de Aventura","price": 30.0,"weight": 1.0},{"kind": "misc","name": "Condecoração militar","category": "Equipamento de Aventura","price": null,"weight": 1.0},{"kind": "misc","name": "Corda de teia","category": "Equipamento de Aventura","price": 100.0,"weight": 1.0},{"kind": "misc","name": "Dente de wishpago","category": "Equipamento de Aventura","price": 100.0,"weight": 1.0},{"kind": "misc","name": "Dente falso","category": "Equipamento de Aventura","price": 300.0,"weight": null},{"kind": "misc","name": "Diagrama anatômico","category": "Equipamento de Aventura","price": 75.0,"weight": 1.0},{"kind": "misc","name": "Emblema religioso","category": "Equipamento de Aventura","price": 30.0,"weight": 1.0},{"kind": "misc","name": "Espelho refletor","category": "Equipamento de Aventura","price": 45.0,"weight": 1.0},{"kind": "misc","name": "Estetoscópio","category": "Equipamento de Aventura","price": 60.0,"weight": 1.0},{"kind": "misc","name": "Estrepes (bolsa para 3m)","category": "Equipamento de Aventura","price": 5.0,"weight": 1.0},{"kind": "misc","name": "Favor da pessoa amada","category": "Equipamento de Aventura","price": null,"weight": 1.0},{"kind": "misc","name": "Férula","category": "Equipamento de Aventura","price": 100.0,"weight": 1.0},{"kind": "misc","name": "Lampião de foco","category": "Equipamento de Aventura","price": 15.0,"weight": 1.0},{"kind": "misc","name": "Leque","category": "Equipamento de Aventura","price": 3.0,"weight": 1.0},{"kind": "misc","name": "Livro de métodos anti-Nimb","category": "Equipamento de Aventura","price": 100.0,"weight": 1.0},{"kind": "misc","name": "Lupa","category": "Equipamento de Aventura","price": 30.0,"weight": 1.0},{"kind": "misc","name": "Mapa","category": "Equipamento de Aventura","price": 30.0,"weight": 1.0},{"kind": "misc","name": "Mecanismo de mola","category": "Equipamento de Aventura","price": 25.0,"weight": 1.0},{"kind": "misc","name": "Mochila discreta","category": "Equipamento de Aventura","price": 20.0,"weight": 1.0},{"kind": "misc","name": "Panfleto de aforismos","category": "Equipamento de Aventura","price": 30.0,"weight": 1.0},{"kind": "misc","name": "Patuá","category": "Equipamento de Aventura","price": 50.0,"weight": 1.0},{"kind": "misc","name": "Prancheta","category": "Equipamento de Aventura","price": 5.0,"weight": 1.0},{"kind": "misc","name": "Sinete","category": "Equipamento de Aventura","price": 50.0,"weight": 1.0},{"kind": "misc","name": "Texto sagrado","category": "Equipamento de Aventura","price": 60.0,"weight": 1.0},{"kind": "misc","name": "Andrajos de aldeão","category": "Vestuário","price": 1.0,"weight": 1.0},{"kind": "misc","name": "Bandana","category": "Vestuário","price": 5.0,"weight": 1.0},{"kind": "misc","name": "Botas reforçadas","category": "Vestuário","price": 20.0,"weight": 1.0},{"kind": "misc","name": "Camisa bufante","category": "Vestuário","price": 25.0,"weight": 1.0},{"kind": "misc","name": "Capa esvoaçante","category": "Vestuário","price": 25.0,"weight": 1.0},{"kind": "misc","name": "Capa pesada","category": "Vestuário","price": 15.0,"weight": 1.0},{"kind": "misc","name": "Casaco longo","category": "Vestuário","price": 20.0,"weight": 1.0},{"kind": "misc","name": "Chapéu arcano","category": "Vestuário","price": 50.0,"weight": 1.0},{"kind": "misc","name": "Enfeite de elmo","category": "Vestuário","price": 15.0,"weight": 1.0},{"kind": "misc","name": "Farrapos de ermitão","category": "Vestuário","price": 1.0,"weight": 1.0},{"kind": "misc","name": "Gorro de ervas","category": "Vestuário","price": 75.0,"weight": 1.0},{"kind": "misc","name": "Luva de pelica","category": "Vestuário","price": 5.0,"weight": 1.0},{"kind": "misc","name": "Manopla","category": "Vestuário","price": 10.0,"weight": 1.0},{"kind": "misc","name": "Manto camuflado","category": "Vestuário","price": 12.0,"weight": 1.0},{"kind": "misc","name": "Manto eclesiástico","category": "Vestuário","price": 20.0,"weight": 1.0},{"kind": "misc","name": "Robe místico","category": "Vestuário","price": 50.0,"weight": 1.0},{"kind": "misc","name": "Sapatos de camurça","category": "Vestuário","price": 8.0,"weight": 1.0},{"kind": "misc","name": "Tabardo","category": "Vestuário","price": 10.0,"weight": 1.0},{"kind": "misc","name": "Traje da corte","category": "Vestuário","price": 100.0,"weight": 1.0},{"kind": "misc","name": "Traje de viajante","category": "Vestuário","price": 10.0,"weight": null},{"kind": "misc","name": "Veste de seda","category": "Vestuário","price": 25.0,"weight": 1.0},{"kind": "misc","name": "Anel eclesiástico","category": "Vestuário","price": 50.0,"weight": 1.0},{"kind": "misc","name": "Avental de forja","category": "Vestuário","price": 75.0,"weight": 1.0},{"kind": "misc","name": "Camisolão","category": "Vestuário","price": 12.0,"weight": 1.0},{"kind": "misc","name": "Capa com dragonas","category": "Vestuário","price": 50.0,"weight": 1.0},{"kind": "misc","name": "Carcaça do predador...","category": "Vestuário","price": 150.0,"weight": 1.0},{"kind": "misc","name": "Casaca de apetrechos","category": "Vestuário","price": 75.0,"weight": null},{"kind": "misc","name": "Chapéu emplumado","category": "Vestuário","price": 50.0,"weight": 1.0},{"kind": "misc","name": "Elmo leve","category": "Vestuário","price": 15.0,"weight": 1.0},{"kind": "misc","name": "Elmo pesado","category": "Vestuário","price": 200.0,"weight": 1.0},{"kind": "misc","name": "Garra feroz","category": "Vestuário","price": 60.0,"weight": 1.0},{"kind": "misc","name": "Garras do predador...","category": "Vestuário","price": 300.0,"weight": 1.0},{"kind": "misc","name": "Hábito monástico","category": "Vestuário","price": 30.0,"weight": 1.0},{"kind": "misc","name": "Hábito sacerdotal","category": "Vestuário","price": 30.0,"weight": 1.0},{"kind": "misc","name": "Jaqueta de couro","category": "Vestuário","price": 15.0,"weight": 1.0},{"kind": "misc","name": "Luva de falcoaria","category": "Vestuário","price": 15.0,"weight": 1.0},{"kind": "misc","name": "Luva magnética","category": "Vestuário","price": 20.0,"weight": 1.0},{"kind": "misc","name": "Manto de alto sacerdote","category": "Vestuário","price": 300.0,"weight": 1.0},{"kind": "misc","name": "Manto do mantor","category": "Vestuário","price": 450.0,"weight": 1.0},{"kind": "misc","name": "Manto pesado","category": "Vestuário","price": 10.0,"weight": 1.0},{"kind": "misc","name": "Máscara bucal","category": "Vestuário","price": 3.0,"weight": 1.0},{"kind": "misc","name": "Máscara completa","category": "Vestuário","price": 15.0,"weight": 1.0},{"kind": "misc","name": "Máscara de baile","category": "Vestuário","price": 25.0,"weight": 1.0},{"kind": "misc","name": "Máscara de soldador","category": "Vestuário","price": 50.0,"weight": 1.0},{"kind": "misc","name": "Monóculo","category": "Vestuário","price": 50.0,"weight": 1.0},{"kind": "misc","name": "Óculos de aeronauta","category": "Vestuário","price": 15.0,"weight": 1.0},{"kind": "misc","name": "Palmar","category": "Vestuário","price": 12.0,"weight": 1.0},{"kind": "misc","name": "Penas do predador","category": "Vestuário","price": 100.0,"weight": 1.0},{"kind": "misc","name": "Peruca","category": "Vestuário","price": 20.0,"weight": 1.0},{"kind": "misc","name": "Piercing de umbigo","category": "Vestuário","price": 50.0,"weight": 1.0},{"kind": "misc","name": "Rondel","category": "Vestuário","price": 150.0,"weight": 1.0},{"kind": "misc","name": "Roupão elegante","category": "Vestuário","price": 150.0,"weight": 1.0},{"kind": "misc","name": "Rufo","category": "Vestuário","price": 25.0,"weight": 1.0},{"kind": "misc","name": "Sandálias","category": "Vestuário","price": 9.0,"weight": 1.0},{"kind": "misc","name": "Sapatos confortáveis","category": "Vestuário","price": 6.0,"weight": 1.0},{"kind": "misc","name": "Sapatos de salto alto","category": "Vestuário","price": 18.0,"weight": 1.0},{"kind": "misc","name": "Sombreiro","category": "Vestuário","price": 10.0,"weight": 1.0},{"kind": "misc","name": "Tonsura","category": "Vestuário","price": 3.0,"weight": 1.0},{"kind": "misc","name": "Traje selako","category": "Vestuário","price": 90.0,"weight": 1.0},{"kind": "misc","name": "Túnica do Virtuoso","category": "Vestuário","price": 25.0,"weight": 1.0},{"kind": "misc","name": "Veste acolchoada","category": "Vestuário","price": 60.0,"weight": 1.0},{"kind": "misc","name": "Alaúde élfico","category": "Ferramentas","price": 300.0,"weight": 1.0},{"kind": "misc","name": "Coleção de livros","category": "Ferramentas","price": 75.0,"weight": 1.0},{"kind": "misc","name": "Equipamento de viagem","category": "Ferramentas","price": 10.0,"weight": 1.0},{"kind": "misc","name": "Estojo de disfarces","category": "Ferramentas","price": 50.0,"weight": 1.0},{"kind": "misc","name": "Flauta mística","category": "Ferramentas","price": 150.0,"weight": 1.0},{"kind": "misc","name": "Gazua","category": "Ferramentas","price": 5.0,"weight": 1.0},{"kind": "misc","name": "Instrumentos de <ofício>","category": "Ferramentas","price": 30.0,"weight": 1.0},{"kind": "misc","name": "Instrumento musical","category": "Ferramentas","price": 35.0,"weight": 1.0},{"kind": "misc","name": "Luneta","category": "Ferramentas","price": 100.0,"weight": 1.0},{"kind": "misc","name": "Maleta de medicamentos","category": "Ferramentas","price": 50.0,"weight": 1.0},{"kind": "misc","name": "Sela","category": "Ferramentas","price": 20.0,"weight": 1.0},{"kind": "misc","name": "Tambor das profundezas","category": "Ferramentas","price": 80.0,"weight": 1.0},{"kind": "misc","name": "Apito de caça","category": "Ferramentas","price": 6.0,"weight": 1.0},{"kind": "misc","name": "Baralho marcado","category": "Ferramentas","price": 15.0,"weight": 1.0},{"kind": "misc","name": "Espelho cirúrgico","category": "Ferramentas","price": 12.0,"weight": 1.0},{"kind": "misc","name": "Estandarte","category": "Ferramentas","price": 15.0,"weight": 1.0},{"kind": "misc","name": "Estandarte portátil","category": "Ferramentas","price": 20.0,"weight": 1.0},{"kind": "misc","name": "Molde pré-fabricado","category": "Ferramentas","price": 500.0,"weight": 1.0},{"kind": "misc","name": "Trombeta do cruzado","category": "Ferramentas","price": 100.0,"weight": 1.0},{"kind": "misc","name": "Bolsa de pó","category": "Esotéricos","price": 300.0,"weight": 1.0},{"kind": "misc","name": "Cajado arcano","category": "Esotéricos","price": 1000.0,"weight": 2.0},{"kind": "misc","name": "Cetro elemental","category": "Esotéricos","price": 750.0,"weight": 1.0},{"kind": "misc","name": "Costela de lich","category": "Esotéricos","price": 300.0,"weight": 1.0},{"kind": "misc","name": "Dedo de ente","category": "Esotéricos","price": 200.0,"weight": 1.0},{"kind": "misc","name": "Luva de ferro","category": "Esotéricos","price": 150.0,"weight": 1.0},{"kind": "misc","name": "Medalhão de prata","category": "Esotéricos","price": 750.0,"weight": 1.0},{"kind": "misc","name": "Orbe cristalino","category": "Esotéricos","price": 750.0,"weight": 1.0},{"kind": "misc","name": "Tomo hermético","category": "Esotéricos","price": 1500.0,"weight": 1.0},{"kind": "misc","name": "Varinha arcana","category": "Esotéricos","price": 100.0,"weight": 1.0},{"kind": "misc","name": "Afiador solar","category": "Esotéricos","price": 100.0,"weight": 1.0},{"kind": "misc","name": "Báculo da retribuição","category": "Esotéricos","price": 200.0,"weight": 1.0},{"kind": "misc","name": "Compasso místico","category": "Esotéricos","price": 600.0,"weight": 1.0},{"kind": "misc","name": "Contas de oração","category": "Esotéricos","price": 500.0,"weight": 1.0},{"kind": "misc","name": "Estola","category": "Esotéricos","price": 150.0,"weight": 1.0},{"kind": "misc","name": "Flauta convocadora","category": "Esotéricos","price": 300.0,"weight": 1.0},{"kind": "misc","name": "Frasco purificador","category": "Esotéricos","price": 300.0,"weight": 1.0},{"kind": "misc","name": "Mandala onírica","category": "Esotéricos","price": 300.0,"weight": 1.0},{"kind": "misc","name": "Medalhão afiado","category": "Esotéricos","price": 900.0,"weight": 1.0},{"kind": "misc","name": "Ostensório santificado","category": "Esotéricos","price": 750.0,"weight": 1.0},{"kind": "misc","name": "Rede de almas","category": "Esotéricos","price": 1000.0,"weight": 1.0},{"kind": "misc","name": "Turíbulo ungido","category": "Esotéricos","price": 100.0,"weight": 1.0},{"kind": "misc","name": "Varinha armamentista","category": "Esotéricos","price": 600.0,"weight": 1.0},{"kind": "misc","name": "Ácido","category": "Alquímicos — Preparados","price": 10.0,"weight": 0.5},{"kind": "misc","name": "Bálsamo restaurador","category": "Alquímicos — Preparados","price": 10.0,"weight": 0.5},{"kind": "misc","name": "Bomba","category": "Alquímicos — Preparados","price": 50.0,"weight": 0.5},{"kind": "misc","name": "Cosmético","category": "Alquímicos — Preparados","price": 30.0,"weight": 0.5},{"kind": "misc","name": "Elixir do amor","category": "Alquímicos — Preparados","price": 100.0,"weight": 0.5},{"kind": "misc","name": "Essência de mana","category": "Alquímicos — Preparados","price": 50.0,"weight": 0.5},{"kind": "misc","name": "Fogo alquímico","category": "Alquímicos — Preparados","price": 10.0,"weight": 0.5},{"kind": "misc","name": "Pó do desaparecimento","category": "Alquímicos — Preparados","price": 100.0,"weight": 0.5},{"kind": "misc","name": "Ácido concentrado","category": "Alquímicos — Preparados","price": 60.0,"weight": 0.5},{"kind": "misc","name": "Análgésico","category": "Alquímicos — Preparados","price": 60.0,"weight": 0.5},{"kind": "misc","name": "Bálsamo de drogadora","category": "Alquímicos — Preparados","price": 60.0,"weight": 0.5},{"kind": "misc","name": "Bomba de fumaça","category": "Alquímicos — Preparados","price": 15.0,"weight": 0.5},{"kind": "misc","name": "Elixir químico","category": "Alquímicos — Preparados","price": 120.0,"weight": 0.5},{"kind": "misc","name": "Estalinho Gury","category": "Alquímicos — Preparados","price": 30.0,"weight": 0.5},{"kind": "misc","name": "Éter elemental","category": "Alquímicos — Preparados","price": 60.0,"weight": 0.5},{"kind": "misc","name": "Extrato de gelo eterno","category": "Alquímicos — Preparados","price": 60.0,"weight": 0.5},{"kind": "misc","name": "Extrato de oxxdon","category": "Alquímicos — Preparados","price": 180.0,"weight": 0.5},{"kind": "misc","name": "Frasco abissal","category": "Alquímicos — Preparados","price": 300.0,"weight": 0.5},{"kind": "misc","name": "Granada redentora","category": "Alquímicos — Preparados","price": 60.0,"weight": 0.5},{"kind": "misc","name": "Incenso","category": "Alquímicos — Preparados","price": 12.0,"weight": 0.5},{"kind": "misc","name": "Isca putrefata","category": "Alquímicos — Preparados","price": 60.0,"weight": 0.5},{"kind": "misc","name": "Lágrima pétrea","category": "Alquímicos — Preparados","price": 30.0,"weight": 0.5},{"kind": "misc","name": "Lucidílico","category": "Alquímicos — Preparados","price": 30.0,"weight": 0.5},{"kind": "misc","name": "Óleo de baleia","category": "Alquímicos — Preparados","price": 30.0,"weight": 0.5},{"kind": "misc","name": "Óleo de besouro","category": "Alquímicos — Preparados","price": 50.0,"weight": 0.5},{"kind": "misc","name": "Pó azul","category": "Alquímicos — Preparados","price": 150.0,"weight": 0.5},{"kind": "misc","name": "Pó de cinza","category": "Alquímicos — Preparados","price": 5.0,"weight": 0.5},{"kind": "misc","name": "Pó do aparecimento","category": "Alquímicos — Preparados","price": 30.0,"weight": 0.5},{"kind": "misc","name": "Santa granada de mão","category": "Alquímicos — Preparados","price": 150.0,"weight": 0.5},{"kind": "misc","name": "Visco persistente","category": "Alquímicos — Preparados","price": 25.0,"weight": 0.5},{"kind": "misc","name": "Baga-de-fogo","category": "Alquímicos — Catalisadores","price": 30.0,"weight": 0.5},{"kind": "misc","name": "Dente-de-dragão","category": "Alquímicos — Catalisadores","price": 45.0,"weight": 0.5},{"kind": "misc","name": "Essência abissal","category": "Alquímicos — Catalisadores","price": 150.0,"weight": 0.5},{"kind": "misc","name": "Líquen lilás","category": "Alquímicos — Catalisadores","price": 30.0,"weight": 0.5},{"kind": "misc","name": "Musgo púrpura","category": "Alquímicos — Catalisadores","price": 45.0,"weight": 0.5},{"kind": "misc","name": "Ossos de monstro","category": "Alquímicos — Catalisadores","price": 45.0,"weight": 0.5},{"kind": "misc","name": "Pó de cristal","category": "Alquímicos — Catalisadores","price": 30.0,"weight": 0.5},{"kind": "misc","name": "Pó de giz","category": "Alquímicos — Catalisadores","price": 30.0,"weight": 0.5},{"kind": "misc","name": "Ramo verdejante","category": "Alquímicos — Catalisadores","price": 45.0,"weight": 0.5},{"kind": "misc","name": "Saco de sal","category": "Alquímicos — Catalisadores","price": 45.0,"weight": 0.5},{"kind": "misc","name": "Seixo de âmbar","category": "Alquímicos — Catalisadores","price": 30.0,"weight": 0.5},{"kind": "misc","name": "Terra de cemitério","category": "Alquímicos — Catalisadores","price": 30.0,"weight": 0.5},{"kind": "misc","name": "Água benta","category": "Alquímicos — Catalisadores","price": 10.0,"weight": 0.5},{"kind": "misc","name": "Corrosivo mineral","category": "Alquímicos — Catalisadores","price": 150.0,"weight": 0.5},{"kind": "misc","name": "Cristal reflexivo","category": "Alquímicos — Catalisadores","price": 30.0,"weight": 0.5},{"kind": "misc","name": "Essência fantasmal","category": "Alquímicos — Catalisadores","price": 30.0,"weight": 0.5},{"kind": "misc","name": "Favo de mel","category": "Alquímicos — Catalisadores","price": 30.0,"weight": 0.5},{"kind": "misc","name": "Fitilho consagrado","category": "Alquímicos — Catalisadores","price": 30.0,"weight": 0.5},{"kind": "misc","name": "Flor de orlyn","category": "Alquímicos — Catalisadores","price": 30.0,"weight": 0.5},{"kind": "misc","name": "Frasco de luz","category": "Alquímicos — Catalisadores","price": 30.0,"weight": 0.5},{"kind": "misc","name": "Gelo extremo","category": "Alquímicos — Catalisadores","price": 150.0,"weight": 0.5},{"kind": "misc","name": "Lantejoula","category": "Alquímicos — Catalisadores","price": 30.0,"weight": 0.5},{"kind": "misc","name": "Noz saltadora","category": "Alquímicos — Catalisadores","price": 90.0,"weight": 0.5},{"kind": "misc","name": "Pedaço de língua","category": "Alquímicos — Catalisadores","price": 30.0,"weight": 0.5},{"kind": "misc","name": "Pedra de sombras","category": "Alquímicos — Catalisadores","price": 30.0,"weight": 0.5},{"kind": "misc","name": "Pena de anjo","category": "Alquímicos — Catalisadores","price": 30.0,"weight": 0.5},{"kind": "misc","name": "Presa de Hyninn","category": "Alquímicos — Catalisadores","price": 45.0,"weight": 0.5},{"kind": "misc","name": "Raio cristalizado","category": "Alquímicos — Catalisadores","price": 150.0,"weight": 0.5},{"kind": "misc","name": "Vela eclesiástica","category": "Alquímicos — Catalisadores","price": 60.0,"weight": 0.5},{"kind": "misc","name": "Beladona","category": "Alquímicos — Venenos","price": 1500.0,"weight": 0.5},{"kind": "misc","name": "Bruma sonolenta","category": "Alquímicos — Venenos","price": 150.0,"weight": 0.5},{"kind": "misc","name": "Cicuta","category": "Alquímicos — Venenos","price": 60.0,"weight": 0.5},{"kind": "misc","name": "Essência de sombra","category": "Alquímicos — Venenos","price": 100.0,"weight": 0.5},{"kind": "misc","name": "Névoa tóxica","category": "Alquímicos — Venenos","price": 30.0,"weight": 0.5},{"kind": "misc","name": "Peçonha comum","category": "Alquímicos — Venenos","price": 15.0,"weight": 0.5},{"kind": "misc","name": "Peçonha concentrada","category": "Alquímicos — Venenos","price": 90.0,"weight": 0.5},{"kind": "misc","name": "Peçonha potente","category": "Alquímicos — Venenos","price": 600.0,"weight": 0.5},{"kind": "misc","name": "Pó de lich","category": "Alquímicos — Venenos","price": 3000.0,"weight": 0.5},{"kind": "misc","name": "Riso de Nimb","category": "Alquímicos — Venenos","price": 150.0,"weight": 0.5},{"kind": "misc","name": "Bolor hemorrágico","category": "Alquímicos — Venenos","price": 60.0,"weight": 0.5},{"kind": "misc","name": "Esporos de cogumelo","category": "Alquímicos — Venenos","price": 75.0,"weight": 0.5},{"kind": "misc","name": "Fumaça onírica","category": "Alquímicos — Venenos","price": 150.0,"weight": 0.5},{"kind": "misc","name": "Gás moroso","category": "Alquímicos — Venenos","price": 60.0,"weight": 0.5},{"kind": "misc","name": "Peçonha anciã","category": "Alquímicos — Venenos","price": 1800.0,"weight": 0.5},{"kind": "misc","name": "Peçonha irritante","category": "Alquímicos — Venenos","price": 10.0,"weight": 0.5},{"kind": "misc","name": "Seiva necrótica","category": "Alquímicos — Venenos","price": 120.0,"weight": 0.5},{"kind": "misc","name": "Veneno batráquio","category": "Alquímicos — Venenos","price": 30.0,"weight": 0.5},{"kind": "misc","name": "Batata valkariana","category": "Alimentação","price": 2.0,"weight": 0.5},{"kind": "misc","name": "Gorad quente","category": "Alimentação","price": 18.0,"weight": 0.5},{"kind": "misc","name": "Macarrão de Yuvalin","category": "Alimentação","price": 6.0,"weight": 0.5},{"kind": "misc","name": "Prato do aventureiro","category": "Alimentação","price": 1.0,"weight": 0.5},{"kind": "misc","name": "Ração de viagem (por dia)","category": "Alimentação","price": 0.5,"weight": 0.5},{"kind": "misc","name": "Refeição comum","category": "Alimentação","price": 0.3,"weight": 0.5},{"kind": "misc","name": "Sopa de peixe","category": "Alimentação","price": 1.0,"weight": 0.5},{"kind": "misc","name": "Abraço da noite","category": "Alimentação","price": 3.0,"weight": null},{"kind": "misc","name": "Algravia","category": "Alimentação","price": 3.0,"weight": null},{"kind": "misc","name": "Assado de entranhas","category": "Alimentação","price": 2.0,"weight": null},{"kind": "misc","name": "Banquete de canceronte","category": "Alimentação","price": 36.0,"weight": null},{"kind": "misc","name": "Bênção dos mares","category": "Alimentação","price": 4.0,"weight": null},{"kind": "misc","name": "Bolinho de jade","category": "Alimentação","price": 4.0,"weight": null},{"kind": "misc","name": "Bombas de saber","category": "Alimentação","price": 3.0,"weight": null},{"kind": "misc","name": "Caldo de Lena","category": "Alimentação","price": 3.0,"weight": null},{"kind": "misc","name": "Coc-au-triz","category": "Alimentação","price": 54.0,"weight": null},{"kind": "misc","name": "Coragem de sangue","category": "Alimentação","price": 4.0,"weight": null},{"kind": "misc","name": "Cozido de serpe","category": "Alimentação","price": 12.0,"weight": null},{"kind": "misc","name": "Deleite mágico","category": "Alimentação","price": 18.0,"weight": null},{"kind": "misc","name": "Frescor de Nimb","category": "Alimentação","price": 1.0,"weight": null},{"kind": "misc","name": "Gorlogg ensopado","category": "Alimentação","price": 6.0,"weight": null},{"kind": "misc","name": "Joia do deserto","category": "Alimentação","price": 5.0,"weight": null},{"kind": "misc","name": "Justos de Khalmyr","category": "Alimentação","price": 6.0,"weight": null},{"kind": "misc","name": "Justos virtuosos","category": "Alimentação","price": 6.0,"weight": null},{"kind": "misc","name": "Manjar da paz","category": "Alimentação","price": 7.0,"weight": null},{"kind": "misc","name": "Omelete monstruosa","category": "Alimentação","price": 3.0,"weight": null},{"kind": "misc","name": "Ouro de dragão","category": "Alimentação","price": 3.0,"weight": null},{"kind": "misc","name": "Ovos de raposa","category": "Alimentação","price": 3.0,"weight": null},{"kind": "misc","name": "Pão de Thorw","category": "Alimentação","price": 1.0,"weight": null},{"kind": "misc","name": "Presente da terra","category": "Alimentação","price": 3.0,"weight": null},{"kind": "misc","name": "Renascer gentil","category": "Alimentação","price": 30.0,"weight": null},{"kind": "misc","name": "Sashimi de kraken","category": "Alimentação","price": 60.0,"weight": null},{"kind": "misc","name": "Suflê rubro","category": "Alimentação","price": 4.0,"weight": null},{"kind": "misc","name": "Tesouro de Valkaria","category": "Alimentação","price": 2.0,"weight": null},{"kind": "misc","name": "Baga celeste cozida","category": "Alimentação — Pratos Especiais","price": 15.0,"weight": null},{"kind": "misc","name": "Cozido de pimenta","category": "Alimentação — Pratos Especiais","price": 10.0,"weight": null},{"kind": "misc","name": "Manjar de sombras","category": "Alimentação — Pratos Especiais","price": 20.0,"weight": null},{"kind": "misc","name": "Baba de troll","category": "Alimentação — Bebidas","price": 30.0,"weight": 0.5},{"kind": "misc","name": "Barba queimada","category": "Alimentação — Bebidas","price": 45.0,"weight": 0.5},{"kind": "misc","name": "Cerveja deheoni","category": "Alimentação — Bebidas","price": 15.0,"weight": 0.5},{"kind": "misc","name": "Dilínio","category": "Alimentação — Bebidas","price": 600.0,"weight": 0.5},{"kind": "misc","name": "Grogue negro","category": "Alimentação — Bebidas","price": 15.0,"weight": 0.5},{"kind": "misc","name": "Grogue rubro","category": "Alimentação — Bebidas","price": 45.0,"weight": 0.5},{"kind": "misc","name": "Hidromel uivante","category": "Alimentação — Bebidas","price": 21.0,"weight": 0.5},{"kind": "misc","name": "Licor feérico","category": "Alimentação — Bebidas","price": 450.0,"weight": 0.5},{"kind": "misc","name": "Sidra ahleniense","category": "Alimentação — Bebidas","price": 45.0,"weight": 0.5},{"kind": "misc","name": "Vinho Pruss","category": "Alimentação — Bebidas","price": 60.0,"weight": 0.5},{"kind": "misc","name": "Vinho élfico","category": "Alimentação — Bebidas","price": 90.0,"weight": 0.5},{"kind": "misc","name": "Armadura de montaria leve","category": "Animais — Armaduras & Vestimentas","price": 600.0,"weight": 2.0},{"kind": "misc","name": "Armadura de montaria pesada","category": "Animais — Armaduras & Vestimentas","price": 3000.0,"weight": 5.0},{"kind": "misc","name": "Arreios namalkahnianos","category": "Animais — Armaduras & Vestimentas","price": 50.0,"weight": 1.0},{"kind": "misc","name": "Caparazão","category": "Animais — Armaduras & Vestimentas","price": 75.0,"weight": 1.0},{"kind": "misc","name": "Estribos","category": "Animais — Armaduras & Vestimentas","price": 60.0,"weight": 1.0},{"kind": "misc","name": "Ornamento","category": "Animais — Armaduras & Vestimentas","price": 50.0,"weight": 1.0},{"kind": "misc","name": "Cítara heptatônica","category": "Instrumentos Musicais","price": 250.0,"weight": 1.0},{"kind": "misc","name": "Clarim deheoni","category": "Instrumentos Musicais","price": 150.0,"weight": 1.0},{"kind": "misc","name": "Cornamusa de Doherimm","category": "Instrumentos Musicais","price": 750.0,"weight": 2.0},{"kind": "misc","name": "Flauta sar-allan","category": "Instrumentos Musicais","price": 150.0,"weight": 1.0},{"kind": "misc","name": "Gaita de foles","category": "Instrumentos Musicais","price": 500.0,"weight": 1.0},{"kind": "misc","name": "Lira de casco de tartaruga","category": "Instrumentos Musicais","price": 300.0,"weight": 1.0},{"kind": "misc","name": "Marionetes","category": "Instrumentos Musicais","price": 90.0,"weight": 1.0},{"kind": "misc","name": "Pandeiro das estradas","category": "Instrumentos Musicais","price": 200.0,"weight": 1.0},{"kind": "misc","name": "Tamborete marcial","category": "Instrumentos Musicais","price": 80.0,"weight": 1.0},{"kind": "misc","name": "Trombeta tapistana","category": "Instrumentos Musicais","price": 300.0,"weight": 1.0},{"kind": "misc","name": "Violino soprano","category": "Instrumentos Musicais","price": 300.0,"weight": 1.0},{"kind": "misc","name": "Captador de luz","category": "Aparatos","price": 450.0,"weight": null},{"kind": "misc","name": "Comutador","category": "Aparatos","price": 300.0,"weight": null},{"kind": "misc","name": "Conversor-alimentador","category": "Aparatos","price": 300.0,"weight": null},{"kind": "misc","name": "Engenho de automação","category": "Aparatos","price": 600.0,"weight": null},{"kind": "misc","name": "Espera para melhorias","category": "Aparatos","price": 150.0,"weight": null},{"kind": "misc","name": "Estabilizador","category": "Aparatos","price": 900.0,"weight": null},{"kind": "misc","name": "Estimulador de sobrecarga","category": "Aparatos","price": 750.0,"weight": null},{"kind": "misc","name": "Gatilho de corda","category": "Aparatos","price": 1500.0,"weight": null},{"kind": "misc","name": "Giroscópio","category": "Aparatos","price": 450.0,"weight": null},{"kind": "misc","name": "Ligação de convergência","category": "Aparatos","price": 300.0,"weight": null},{"kind": "misc","name": "Remontagem de portabilidade","category": "Aparatos","price": 300.0,"weight": null},{"kind": "misc","name": "Sequenciador de ativação","category": "Aparatos","price": 600.0,"weight": null},{"kind": "misc","name": "Sistema de refrigeração","category": "Aparatos","price": 900.0,"weight": null},{"kind": "misc","name": "Supressor de segurança","category": "Aparatos","price": 300.0,"weight": null},{"kind": "misc","name": "Transformador místico","category": "Aparatos","price": 600.0,"weight": null}];

  const ENCANTAMENTOS = {
  "arma": [
    {
      "name": "Ameaçadora",
      "effect": "Duplica margem de ameaça"
    },
    {
      "name": "Anticriatura",
      "effect": "Bônus contra tipo de criatura"
    },
    {
      "name": "Arremesso",
      "effect": "Pode ser arremessada"
    },
    {
      "name": "Assassina",
      "effect": "Aumenta ataque furtivo"
    },
    {
      "name": "Caçadora",
      "effect": "Ignora camuflagem leve/total e cobertura leve"
    },
    {
      "name": "Congelante",
      "effect": "+1d6 de dano de frio"
    },
    {
      "name": "Conjuradora",
      "effect": "Pode guardar e lançar magias"
    },
    {
      "name": "Corrosiva",
      "effect": "+1d6 de dano de ácido"
    },
    {
      "name": "Dançarina",
      "effect": "Ataca sozinha"
    },
    {
      "name": "Defensora",
      "effect": "Defesa +2"
    },
    {
      "name": "Destruidora",
      "effect": "Bônus contra construtos"
    },
    {
      "name": "Dilacerante",
      "effect": "+10 de dano em acertos críticos"
    },
    {
      "name": "Drenante",
      "effect": "Crítico drena vítima"
    },
    {
      "name": "Elétrica",
      "effect": "+1d6 de dano de eletricidade"
    },
    {
      "name": "Energética",
      "effect": "Bônus em ataque"
    },
    {
      "name": "Excruciante",
      "effect": "Causa fraqueza"
    },
    {
      "name": "Flamejante",
      "effect": "+1d6 de dano de fogo"
    },
    {
      "name": "Formidável",
      "effect": "Ataque e dano +2"
    },
    {
      "name": "Lancinante",
      "effect": "Causa crítico terrível"
    },
    {
      "name": "Magnífica",
      "effect": "Ataque e dano +4"
    },
    {
      "name": "Piedosa",
      "effect": "Dano não letal"
    },
    {
      "name": "Profana",
      "effect": "Bônus contra devotos do Bem"
    },
    {
      "name": "Sagrada",
      "effect": "Bônus contra devotos do Mal"
    },
    {
      "name": "Sanguinária",
      "effect": "Causa sangramento"
    },
    {
      "name": "Trovejante",
      "effect": "Causa atordoamento"
    },
    {
      "name": "Tumular",
      "effect": "+1d8 de dano de trevas"
    },
    {
      "name": "Veloz",
      "effect": "Fornece ataque extra"
    },
    {
      "name": "Venenosa",
      "effect": "Causa envenenamento"
    }
  ],
  "armadura": [
    {
      "name": "Abascanto",
      "effect": "Resistência contra magia"
    },
    {
      "name": "Abençoado",
      "effect": "Resistência contra trevas"
    },
    {
      "name": "Acrobático",
      "effect": "Bônus em Acrobacia"
    },
    {
      "name": "Alado",
      "effect": "Deslocamento de voo 12m"
    },
    {
      "name": "Animado",
      "effect": "Escudo defende sozinho"
    },
    {
      "name": "Assustador",
      "effect": "Causa efeito de medo"
    },
    {
      "name": "Cáustica",
      "effect": "Resistência contra ácido"
    },
    {
      "name": "Defensor",
      "effect": "Defesa +2"
    },
    {
      "name": "Escorregadio",
      "effect": "Bônus para escapar"
    },
    {
      "name": "Esmagador",
      "effect": "Escudo causa mais dano"
    },
    {
      "name": "Fantasmagórico",
      "effect": "Lança Manto de Sombras"
    },
    {
      "name": "Fortificado",
      "effect": "Chance de ignorar crítico"
    },
    {
      "name": "Gélido",
      "effect": "Resistência contra frio"
    },
    {
      "name": "Guardião",
      "effect": "Defesa +4"
    },
    {
      "name": "Hipnótico",
      "effect": "Fascina inimigos"
    },
    {
      "name": "Ilusório",
      "effect": "Camufla-se como item comum"
    },
    {
      "name": "Incandescente",
      "effect": "Resistência contra fogo"
    },
    {
      "name": "Invulnerável",
      "effect": "Redução de dano"
    },
    {
      "name": "Opaco",
      "effect": "Redução de energia"
    },
    {
      "name": "Protetor",
      "effect": "Resistência +2"
    },
    {
      "name": "Refletor",
      "effect": "Reflete magia"
    },
    {
      "name": "Relampejante",
      "effect": "Resistência contra eletricidade"
    },
    {
      "name": "Reluzente",
      "effect": "Causa efeito de cegueira"
    },
    {
      "name": "Sombrio",
      "effect": "Bônus em Furtividade"
    },
    {
      "name": "Zeloso",
      "effect": "Atrai ataques em aliados"
    }
  ],
  "escudo": [
    {
      "name": "Abascanto",
      "effect": "Resistência contra magia"
    },
    {
      "name": "Abençoado",
      "effect": "Resistência contra trevas"
    },
    {
      "name": "Acrobático",
      "effect": "Bônus em Acrobacia"
    },
    {
      "name": "Alado",
      "effect": "Deslocamento de voo 12m"
    },
    {
      "name": "Animado",
      "effect": "Escudo defende sozinho"
    },
    {
      "name": "Assustador",
      "effect": "Causa efeito de medo"
    },
    {
      "name": "Cáustica",
      "effect": "Resistência contra ácido"
    },
    {
      "name": "Defensor",
      "effect": "Defesa +2"
    },
    {
      "name": "Escorregadio",
      "effect": "Bônus para escapar"
    },
    {
      "name": "Esmagador",
      "effect": "Escudo causa mais dano"
    },
    {
      "name": "Fantasmagórico",
      "effect": "Lança Manto de Sombras"
    },
    {
      "name": "Fortificado",
      "effect": "Chance de ignorar crítico"
    },
    {
      "name": "Gélido",
      "effect": "Resistência contra frio"
    },
    {
      "name": "Guardião",
      "effect": "Defesa +4"
    },
    {
      "name": "Hipnótico",
      "effect": "Fascina inimigos"
    },
    {
      "name": "Ilusório",
      "effect": "Camufla-se como item comum"
    },
    {
      "name": "Incandescente",
      "effect": "Resistência contra fogo"
    },
    {
      "name": "Invulnerável",
      "effect": "Redução de dano"
    },
    {
      "name": "Opaco",
      "effect": "Redução de energia"
    },
    {
      "name": "Protetor",
      "effect": "Resistência +2"
    },
    {
      "name": "Refletor",
      "effect": "Reflete magia"
    },
    {
      "name": "Relampejante",
      "effect": "Resistência contra eletricidade"
    },
    {
      "name": "Reluzente",
      "effect": "Causa efeito de cegueira"
    },
    {
      "name": "Sombrio",
      "effect": "Bônus em Furtividade"
    },
    {
      "name": "Zeloso",
      "effect": "Atrai ataques em aliados"
    }
  ],
  "esoterico": [
    {
      "name": "Abafador",
      "effect": "Falha: CDs do alvo -2 (1r)"
    },
    {
      "name": "Bélico",
      "effect": "Magias de dano: +1d10 essência"
    },
    {
      "name": "Caridoso",
      "effect": "Ao curar aliado: +1PM temporário"
    },
    {
      "name": "Chocante",
      "effect": "Elétricas: +1d; ofusca 1r"
    },
    {
      "name": "Clemente",
      "effect": "Curas: +1 dado de cura"
    },
    {
      "name": "Contido",
      "effect": "1PM: converte dano em não letal"
    },
    {
      "name": "Emergencial",
      "effect": "4PM: reação cura aliado ao sofrer dano"
    },
    {
      "name": "Glacial",
      "effect": "Frio: +1d; alvo vulnerável 1r"
    },
    {
      "name": "Majestoso",
      "effect": "CD+1 magias arcanas"
    },
    {
      "name": "Nímbico",
      "effect": "Rerolls; pares custam 1PM"
    }
  ],
  "acessorio": [
    {
      "name": "Aconchegante",
      "effect": "Melhora descanso em uma categoria"
    },
    {
      "name": "Ajudante",
      "effect": "Bônus da perícia +2 (ferramenta)"
    },
    {
      "name": "Autoritário",
      "effect": "+2 Intimidação; +2 CD em medo"
    },
    {
      "name": "Compacto",
      "effect": "Não ocupa espaços"
    },
    {
      "name": "Imaculado",
      "effect": "+2 Diplomacia; +2CD em Aparência"
    },
    {
      "name": "Insinuante",
      "effect": "+2 Enganação; +2CD efeitos mentais"
    },
    {
      "name": "Ligeiro",
      "effect": "Vestir/remover ação livre"
    },
    {
      "name": "Prontidão",
      "effect": "Surge nas mãos; empunhar ação livre"
    }
  ]
};

  const ORDEM_CATEGORIAS_ESPECIAL = ['arma', 'armadura', 'escudo', 'esoterico', 'acessorio'];

  // ╔══════════════════════════════════════════════════╗
  // ║  CONFIGURAÇÃO POR TIPO / CATEGORIA                                ║
  // ║  Cada controlador (item ou encantamento) tem um MODO:             ║
  // ║    'quantidade'  → vêm exatamente `qtd` itens, sorteados do total ║
  // ║    'porcentagem' → cada item do catálogo tem `prob`% de aparecer  ║
  // ║    'ambos'       → sorteia `qtd` candidatos e cada um ainda passa  ║
  // ║                    por uma chance de `prob`% (ex.: 100 a 60%)     ║
  // ║  repetir → no modo quantidade/ambos, o mesmo item pode repetir    ║
  // ║            (permite pedir mais itens do que o catálogo tem).      ║
  // ║  itens (weapon/armor/misc) ainda têm descMin/descMax de desconto. ║
  // ╚═══════════════════════════════════════════════════╝
  const CONFIG_PADRAO = {
    itens: {
      weapon: { modo: 'quantidade', qtd: 10, prob: 25, repetir: false, descMin: 1, descMax: 80 },
      armor:  { modo: 'quantidade', qtd: 10, prob: 25, repetir: false, descMin: 1, descMax: 80 },
      misc:   { modo: 'quantidade', qtd: 10, prob: 25, repetir: false, descMin: 1, descMax: 80 },
    },
    encantos: {
      arma:      { modo: 'quantidade', qtd: 3, prob: 5, repetir: false },
      armadura:  { modo: 'quantidade', qtd: 3, prob: 5, repetir: false },
      escudo:    { modo: 'quantidade', qtd: 3, prob: 5, repetir: false },
      esoterico: { modo: 'quantidade', qtd: 3, prob: 5, repetir: false },
      acessorio: { modo: 'quantidade', qtd: 3, prob: 5, repetir: false },
    },
  };

  const MODOS_VALIDOS = ['quantidade', 'porcentagem', 'ambos'];

  let _config = _clonar(CONFIG_PADRAO);

  // ╔══════════════════════════════════════════════════╗
  // ║  CLASSIFICAÇÃO DA COMUNIDADE (Ambientes Urbanos, T20)             ║
  // ║  Cada tipo de comunidade limita o que a loja pode ter:            ║
  // ║   teto    → preço máximo dos itens à venda (null = sem limite)    ║
  // ║   estoque → 'todos' rola 1d6 por item (aldeia);                   ║
  // ║             'raros' rola 2d6 só nos itens raros (vila)            ║
  // ║   caixa   → dinheiro da comunidade p/ COMPRAR dos jogadores       ║
  // ║   magicos → encantamentos/pergaminhos à venda (só metrópole)      ║
  // ╚═══════════════════════════════════════════════════╝
  const CLASSIFICACOES = {
    livre: {
      rotulo: 'Livre (sem limites)', icone: '🎲', pop: null,
      teto: null, estoque: null, caixa: null, magicos: true,
      resumo: 'Comporta-se como hoje: todo o catálogo disponível, sem estoque nem caixa.',
    },
    aldeia: {
      rotulo: 'Aldeia', icone: '🏡', pop: 'até 1.000 habitantes',
      teto: 50, estoque: 'todos',
      caixa: { qtd: 1, dado: 4, mult: 100, formula: '1d4 × T$ 100' },
      magicos: false,
      resumo: 'Um único armazém: apenas itens de até T$ 50, em quantidades limitadas (1d6 de cada).',
    },
    vila: {
      rotulo: 'Vila', icone: '🏘', pop: 'até 5.000 habitantes',
      teto: 1000, estoque: 'raros',
      caixa: { qtd: 1, dado: 6, mult: 1000, formula: '1d6 × T$ 1.000' },
      magicos: false,
      resumo: 'Mercado com lojas e oficinas: itens de até T$ 1.000; itens raros em quantidades limitadas (2d6 de cada — raros: armas exóticas e de fogo, alquímicos, esotéricos, aparatos e itens acima de T$ 300).',
    },
    cidade: {
      rotulo: 'Cidade', icone: '🏰', pop: 'até 25.000 habitantes',
      teto: 10000, estoque: null,
      caixa: { qtd: 2, dado: 4, mult: 10000, formula: '2d4 × T$ 10.000' },
      magicos: false,
      resumo: 'Praticamente qualquer item mundano; só itens acima de T$ 10.000 podem faltar.',
    },
    metropole: {
      rotulo: 'Metrópole', icone: '🌆', pop: '~100.000+ habitantes',
      teto: null, estoque: null, caixa: null, magicos: true,
      resumo: 'Bazares supridos pelo mundo inteiro — tudo disponível, até itens mágicos (em leilões exclusivos). Dinheiro virtualmente ilimitado.',
    },
  };
  const ORDEM_CLASSIFICACOES = ['livre', 'aldeia', 'vila', 'cidade', 'metropole'];

  // Armas de fogo (e suas munições) — "proibidas em todo o Reinado"
  // (Lei & Ordem). Identificadas por nome, como aparecem no catálogo.
  const ARMAS_FOGO = new Set([
    'Pistola', 'Garrucha', 'Traque', 'Mosquete', 'Arcabuz', 'Bacamarte',
    'Canhão portátil', 'Pistola-punhal', 'Lança de fogo', 'Sifão cáustico',
    'Balas (20)', 'Bola de ferro (1)',
  ]);

  // Itens "raros" numa vila (armas exóticas, alquímicos, superiores…).
  // Armas exóticas: conforme as seções "Armas Exóticas" das tabelas dos
  // livros (Tormenta20 Tab. 3-3 e Heróis de Arton). Pistola-punhal e
  // Lança de fogo (híbridas de fogo) ficam só em ARMAS_FOGO, que também
  // conta como rara. Além delas: categorias de nicho inteiras + qualquer
  // item acima de T$ 300 (proxy de "superior/valioso demais para
  // produção local").
  const ARMAS_EXOTICAS = new Set([
    'Açoite finntroll', 'Arco de guerra', 'Arpão', 'Balestra',
    'Besta de repetição', 'Boleadeira', 'Chakram', 'Chicote',
    'Corrente de espinhos', 'Espada bastarda', 'Espada vespa',
    'Espada-gadanho', 'Katana', 'Khopesh', 'Kimbata', 'Lança de falange',
    'Machado anão', 'Machado de haste', 'Machado táurico', 'Marrão',
    'Montante cinético', 'Mordida do diabo', 'Presa de serpente',
    'Rapieira', 'Rede', 'Shuriken',
  ]);
  const CATEGORIAS_RARAS = new Set([
    'Alquímicos — Preparados', 'Alquímicos — Catalisadores',
    'Alquímicos — Venenos', 'Esotéricos', 'Aparatos',
  ]);
  const PRECO_RARO = 300;

  function _ehItemRaro(it) {
    if (CATEGORIAS_RARAS.has(it.category)) return true;
    if (ARMAS_EXOTICAS.has(it.name) || ARMAS_FOGO.has(it.name)) return true;
    return typeof it.price === 'number' && it.price > PRECO_RARO;
  }

  // Estado da comunidade selecionada (vale para as PRÓXIMAS gerações).
  const COMUNIDADE_PADRAO = { classe: 'livre', semArmasFogo: true };
  let _comunidade = _clonar(COMUNIDADE_PADRAO);

  function obterComunidade() { return _clonar(_comunidade); }

  function definirComunidade(nova) {
    if (!nova || typeof nova !== 'object') return;
    if (CLASSIFICACOES[nova.classe]) _comunidade.classe = nova.classe;
    if (nova.semArmasFogo != null)   _comunidade.semArmasFogo = !!nova.semArmasFogo;
  }

  function _rolarDados(qtd, faces) {
    let total = 0;
    for (let i = 0; i < qtd; i++) total += 1 + Math.floor(Math.random() * faces);
    return total;
  }

  // Rola o dinheiro disponível da comunidade selecionada.
  // null → caixa ilimitada (livre / metrópole).
  function rolarCaixa(classe) {
    const cl = CLASSIFICACOES[classe || _comunidade.classe];
    if (!cl || !cl.caixa) return null;
    return {
      formula: cl.caixa.formula,
      valor:   _rolarDados(cl.caixa.qtd, cl.caixa.dado) * cl.caixa.mult,
    };
  }

  // Aplica os limites da comunidade ao pool de itens-base de um tipo.
  function _filtrarPoolComunidade(pool) {
    const cl = CLASSIFICACOES[_comunidade.classe] || CLASSIFICACOES.livre;
    let out = pool;
    if (_comunidade.classe !== 'livre' && _comunidade.semArmasFogo) {
      out = out.filter(it => !ARMAS_FOGO.has(it.name));
    }
    if (cl.teto != null) {
      // Itens sem preço numérico ("—") continuam: são improvisos/baratos.
      out = out.filter(it => typeof it.price !== 'number' || it.price <= cl.teto);
    }
    return out;
  }

  // Rola o estoque de uma linha já montada (null = ilimitado).
  function _rolarEstoqueLinha(linha, itemBase) {
    const cl = CLASSIFICACOES[_comunidade.classe] || CLASSIFICACOES.livre;
    let est = null;
    if (cl.estoque === 'todos')                            est = _rolarDados(1, 6);
    else if (cl.estoque === 'raros' && _ehItemRaro(itemBase)) est = _rolarDados(2, 6);
    if (est != null) {
      linha.estoque    = est;
      linha.estoqueMax = est;
    }
    return linha;
  }

  // ── AUXILIARES ────────────────────────────────────
  function _clonar(o) { return JSON.parse(JSON.stringify(o)); }

  function _clamp(v, min, max) {
    v = Number(v);
    if (isNaN(v)) v = min;
    return Math.max(min, Math.min(max, v));
  }

  function _int(v, min, max) { return Math.round(_clamp(v, min, max)); }

  // comparador igual à ordenação padrão do Python
  function _cmp(a, b) { return a < b ? -1 : a > b ? 1 : 0; }

  // embaralhamento Fisher–Yates (cópia)
  function _embaralhar(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // ── AMOSTRAGEM UNIFICADA (usada por itens, encantos e — via cópia — magias)
  //  Devolve a lista de itens-base escolhidos do `pool`, segundo o modo.
  //  Pode conter repetidos quando `repetir` é true (modos quantidade/ambos).
  function _amostrar(pool, cfg) {
    if (!pool || !pool.length) return [];
    const modo    = MODOS_VALIDOS.includes(cfg.modo) ? cfg.modo : 'quantidade';
    const qtd     = _int(cfg.qtd != null ? cfg.qtd : 0, 0, 999);
    const prob    = _clamp(cfg.prob != null ? cfg.prob : 0, 0, 100);
    const repetir = !!cfg.repetir;

    // modo porcentagem: testa CADA item do catálogo uma vez
    if (modo === 'porcentagem') {
      return pool.filter(() => Math.random() * 100 <= prob);
    }

    // modos quantidade / ambos: monta `qtd` candidatos
    let candidatos;
    if (repetir) {
      candidatos = [];
      for (let i = 0; i < qtd; i++) {
        candidatos.push(pool[Math.floor(Math.random() * pool.length)]);
      }
    } else {
      candidatos = _embaralhar(pool).slice(0, qtd);
    }

    // no modo ambos, cada candidato ainda precisa passar na chance de prob%
    if (modo === 'ambos') {
      candidatos = candidatos.filter(() => Math.random() * 100 <= prob);
    }
    return candidatos;
  }

  // ── API DE CONFIGURAÇÃO (usada pela aba de Ajustes) ──────────
  function obterConfig() {
    return _clonar(_config);
  }

  // Normaliza a parte comum de um controlador (modo/qtd/prob/repetir),
  // partindo de `base` (a config atual daquele tipo) e sobrescrevendo
  // com o que vier em `c`. Tolera formatos antigos.
  function _normComum(c, base) {
    const out = _clonar(base);
    if (typeof c === 'number') {        // formato antigo: era só a % → modo porcentagem
      out.modo = 'porcentagem';
      out.prob = _clamp(c, 0, 100);
      return out;
    }
    if (!c || typeof c !== 'object') return out;
    if (MODOS_VALIDOS.includes(c.modo)) out.modo = c.modo;
    if (c.qtd     != null) out.qtd     = _int(c.qtd, 0, 999);
    if (c.prob    != null) out.prob    = _clamp(c.prob, 0, 100);
    if (c.repetir != null) out.repetir = !!c.repetir;
    return out;
  }

  function definirConfig(novo) {
    if (!novo || typeof novo !== 'object') return;
    for (const tipo of ['weapon', 'armor', 'misc']) {
      const c = novo.itens && novo.itens[tipo];
      if (c == null) continue;
      const item = _normComum(c, _config.itens[tipo]);
      if (typeof c === 'object' && (c.descMin != null || c.descMax != null)) {
        let dMin = _clamp(c.descMin != null ? c.descMin : item.descMin, 0, 99);
        let dMax = _clamp(c.descMax != null ? c.descMax : item.descMax, 0, 99);
        if (dMin > dMax) { const t = dMin; dMin = dMax; dMax = t; }
        item.descMin = dMin;
        item.descMax = dMax;
      }
      _config.itens[tipo] = item;
    }
    for (const cat of ORDEM_CATEGORIAS_ESPECIAL) {
      if (novo.encantos && novo.encantos[cat] != null) {
        _config.encantos[cat] = _normComum(novo.encantos[cat], _config.encantos[cat]);
      }
    }
  }

  // ═══════════════════════════════════════════════════
  //  LOJA NORMAL
  // ═══════════════════════════════════════════════════
  // Agrupa o catálogo base por tipo (weapon/armor/misc).
  function _itensPorTipo() {
    const grupos = { weapon: [], armor: [], misc: [] };
    for (const it of ITENS_BASE) {
      (grupos[it.kind] || (grupos[it.kind] = [])).push(it);
    }
    return grupos;
  }

  // Monta a "linha" de loja de um item-base, rolando um desconto novo.
  function _montarLinhaItem(it, cfg) {
    const desconto = cfg.descMin +
      Math.floor(Math.random() * (cfg.descMax - cfg.descMin + 1));

    let precoFinal;
    if (typeof it.price === 'number') {
      precoFinal = Math.round(it.price * (1 - desconto / 100) * 100) / 100;
    } else if (it.price === '**' || it.price === '*') {
      precoFinal = it.price;
    } else {
      precoFinal = null;
    }

    const linha = {
      tipo_item:              it.kind,
      categoria:              it.category,
      nome:                   it.name,
      preco_original:         (it.price === undefined ? null : it.price),
      desconto_pct:           desconto,
      preco_final:            precoFinal,
    };

    if (it.kind === 'weapon') {
      linha.dano = it.damage;  linha.critico = it.crit;  linha.alcance = it.alcance;
      linha.tipo_arma = it.tipo;  linha.peso = it.peso;
      linha.bonus_armadura = null;  linha.penalidade_armadura = null;  linha.peso_armadura = null;
    } else if (it.kind === 'armor') {
      linha.dano = null;  linha.critico = null;  linha.alcance = null;
      linha.tipo_arma = null;  linha.peso = null;
      linha.bonus_armadura = it.armor_bonus;
      linha.penalidade_armadura = it.armor_penalty;
      linha.peso_armadura = it.armor_weight;
    } else {
      linha.dano = null;  linha.critico = null;  linha.alcance = null;  linha.tipo_arma = null;
      linha.peso = it.weight;
      linha.bonus_armadura = null;  linha.penalidade_armadura = null;  linha.peso_armadura = null;
    }
    return linha;
  }

  function gerarLojaNormal() {
    const grupos = _itensPorTipo();
    const linhas = [];

    for (const tipo of ['weapon', 'armor', 'misc']) {
      const cfg = _config.itens[tipo] || CONFIG_PADRAO.itens[tipo] || CONFIG_PADRAO.itens.misc;
      const pool = _filtrarPoolComunidade(grupos[tipo] || []);
      const escolhidos = _amostrar(pool, cfg);
      for (const it of escolhidos) {
        linhas.push(_rolarEstoqueLinha(_montarLinhaItem(it, cfg), it));
      }
    }

    linhas.sort((a, b) =>
      _cmp(a.tipo_item || '', b.tipo_item || '') ||
      _cmp(a.categoria || '', b.categoria || '') ||
      _cmp(a.nome || '',      b.nome || ''));

    return { tipo: 'loja_normal', total_itens: linhas.length, itens: linhas };
  }

  // ═══════════════════════════════════════════════════
  //  LOJA ESPECIAL (encantamentos)
  // ═══════════════════════════════════════════════════
  function gerarLojaEspecial() {
    const categorias = {};

    for (const cat of ORDEM_CATEGORIAS_ESPECIAL) {
      const pool = ENCANTAMENTOS[cat] || [];
      const cfg  = _config.encantos[cat] || CONFIG_PADRAO.encantos[cat] || { modo: 'quantidade', qtd: 3, prob: 5, repetir: false };
      const escolhidos = _amostrar(pool, cfg);
      const hits = escolhidos.map(e => ({ name: e.name, effect: e.effect }));
      categorias[cat] = { total: hits.length, encantamentos: hits };
    }

    return { tipo: 'loja_especial', categorias: categorias };
  }

  // ── TOTAIS DISPONÍVEIS NO CATÁLOGO (para os seletores 0..total) ──
  function totaisItens() {
    const t = { weapon: 0, armor: 0, misc: 0 };
    for (const it of ITENS_BASE) if (t[it.kind] != null) t[it.kind]++;
    return t;
  }
  function totaisEncantos() {
    const t = {};
    for (const cat of ORDEM_CATEGORIAS_ESPECIAL) t[cat] = (ENCANTAMENTOS[cat] || []).length;
    return t;
  }

  // ── LOOKUP DE ATRIBUTOS POR NOME (p/ o Gerador de Recompensas) ──────
  //  Acha um item-base do catálogo pelo nome e devolve seus atributos de
  //  combate (dano/crítico/tipo/alcance de armas; bônus/penalidade de
  //  armaduras). Comparação sem acento/maiúsculas. null se não houver.
  function statsDeItem(nome) {
    if (!nome) return null;
    const norm = s => String(s).normalize('NFD').replace(/\p{M}/gu, '').toLowerCase().trim();
    const alvo = norm(nome);
    for (const it of ITENS_BASE) {
      if (norm(it.name) !== alvo) continue;
      if (it.kind === 'weapon')
        return { kind: 'weapon', dano: it.damage, critico: it.crit, tipo: it.tipo, alcance: it.alcance, peso: it.peso };
      if (it.kind === 'armor')
        return { kind: 'armor', bonus: it.armor_bonus, penalidade: it.armor_penalty, peso: it.armor_weight };
      return { kind: 'misc', peso: it.weight };
    }
    return null;
  }

  // Nomes de todos os itens-base do catálogo, com o tipo (weapon/armor/misc).
  // Usado pela busca do "📖 Descrição" para listar TODA arma/armadura com
  // seus atributos, mesmo as que não têm texto de lore.
  function catalogoNomes() {
    return ITENS_BASE.map(it => ({ nome: it.name, kind: it.kind }));
  }

  // ── EXPORTAÇÃO ──────────────────────────────────────
  return {
    gerarLojaNormal:   gerarLojaNormal,
    gerarLojaEspecial: gerarLojaEspecial,
    obterConfig:       obterConfig,
    definirConfig:     definirConfig,
    totaisItens:       totaisItens,
    totaisEncantos:    totaisEncantos,
    statsDeItem:       statsDeItem,
    catalogoNomes:     catalogoNomes,
    CONFIG_PADRAO:     _clonar(CONFIG_PADRAO),
    // classificação da comunidade (ambientes urbanos)
    CLASSIFICACOES:       _clonar(CLASSIFICACOES),
    ORDEM_CLASSIFICACOES: ORDEM_CLASSIFICACOES.slice(),
    obterComunidade:      obterComunidade,
    definirComunidade:    definirComunidade,
    rolarCaixa:           rolarCaixa,
  };
})();