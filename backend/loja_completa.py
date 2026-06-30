"""
╔══════════════════════════════════════════════════════════════════╗
║                      LOJA COMPLETA                               ║
║  Contém: LOJA NORMAL (itens/equipamentos) +                      ║
║          LOJA ESPECIAL (encantamentos)                           ║
║                                                                  ║
║  Localização: /grifos-alados/backend/loja_completa.py            ║
║  Saída:  ../data/loja.json          → itens da loja normal       ║
║          ../data/loja_especial.json → encantamentos sorteados    ║
╚══════════════════════════════════════════════════════════════════╝
"""

import re
import json
import random
import copy
from typing import List, Dict, Any, Optional

# ══════════════════════════════════════════════════════════════════
#
#  ██╗      ██████╗      ██╗ █████╗     ███╗   ██╗ ██████╗ ██████╗ ███╗   ███╗ █████╗ ██╗
#  ██║     ██╔═══██╗     ██║██╔══██╗    ████╗  ██║██╔═══██╗██╔══██╗████╗ ████║██╔══██╗██║
#  ██║     ██║   ██║     ██║███████║    ██╔██╗ ██║██║   ██║██████╔╝██╔████╔██║███████║██║
#  ██║     ██║   ██║██   ██║██╔══██║    ██║╚██╗██║██║   ██║██╔══██╗██║╚██╔╝██║██╔══██║██║
#  ███████╗╚██████╔╝╚█████╔╝██║  ██║    ██║ ╚████║╚██████╔╝██║  ██║██║ ╚═╝ ██║██║  ██║███████╗
#  ╚══════╝ ╚═════╝  ╚════╝ ╚═╝  ╚═╝    ╚═╝  ╚═══╝ ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝╚══════╝
#
#  Itens comuns com preços e descontos aleatórios
# ══════════════════════════════════════════════════════════════════

# ──────────────────────────────────────────────────────────────────
#  DADOS BRUTOS — LOJA NORMAL
# ──────────────────────────────────────────────────────────────────
RAW_WEAPONS = '''
Armas Simples
Corpo a Corpo — Leves
Adaga T$ 2 1d4 19 Curto Perfuração 1
Espada curta T$ 10 1d6 19 — Perfuração 1
Foice T$ 4 1d6 x3 — Corte 1
Bastão lúdico T$ 5 1d6 X2 - Impacto 1
Porrete T$ 2 1d6 X2 - Impacto 1

Corpo a Corpo — Uma Mão
Clava — 1d6 x2 — Impacto 1
Lança T$ 2 1d6 x2 Curto Perfuração 1
Maça T$ 12 1d8 x2 — Impacto 1

Corpo a Corpo — Duas Mãos
Bordão — 1d6/1d6 x2 — Impacto 2
Pique T$ 2 1d8 x2 — Perfuração 2
Tacape — 1d10 x2 — Impacto 2

Ataque à Distância — Uma Mão
Azagaia T$ 1 1d6 x2 Médio Perfuração 1
Besta leve T$ 35 1d8 19 Médio Perfuração 1
Virotes (20) T$ 2 — — — — 1
Funda — 1d4 x2 Médio Impacto 1
Pedras (20) T$ 0,5 — — — — 1
Besta de mão T$ 30 1d6 19 Curto Perfuração 1
Virotes (20) T$ 2 - - - - 1
Zarabatana T$ 5 1d3 X2 Curto Perfuração 1

Ataque à Distância — Duas Mãos
Arco curto T$ 30 1d6 x3 Médio Perfuração 2
Flechas (20) T$ 1 — — — — 1

Armas Marciais
Corpo a Corpo — Leves
Machadinha T$ 6 1d6 x3 Curto Corte 1
Adaga oposta T$ 12 1d4 19 - Perfuração 1
Agulha de Ahlen T$ 10 1d4 19 - Perfuração 1
Cinquedea T$ 18 1d4 19 - Perfuração 1
Dirk T$ 15 1d4 19 - Perfuração 1
Martelo leve T$ 2 1d4 X4 Curto Impacto 1
Neko-te T$ 10 1d4 19 - Corte 1

Corpo a Corpo — Uma Mão
Cimitarra T$ 15 1d6 18 — Corte 1
Espada longa T$ 15 1d8 19 — Corte 1
Florete T$ 20 1d6 18 — Perfuração 1
Machado de batalha T$ 10 1d8 x3 — Corte 1
Mangual T$ 8 1d8 x2 — Impacto 1
Martelo de guerra T$ 12 1d8 x3 — Impacto 1
Picareta T$ 8 1d6 x4 — Perfuração 1
Tridente T$ 15 1d8 x2 Curto Perfuração 1
Espada larga T$ 8 2d4 X2 - Corte 1
Espadim T$ 300 1d8 X2 - Corte 1
Gládio T$ 12 1d6 19/X3 - Perfuração 1
Maça-estrela T$ 20 2d4 X2 - Impacto e perfuração  1
Serrilheira T$ 25 1d6 19 - Corte 1

Corpo a Corpo — Duas Mãos
Alabarda T$ 10 1d10 x3 — Corte/perfuração 2
Alfange T$ 75 2d4 18 — Corte 2
Gadanho T$ 18 2d4 x4 — Corte 2
Lança montada T$ 10 1d8 x3 — Perfuração 2
Machado de guerra T$ 20 1d12 x3 — Corte 2
Marreta T$ 20 3d4 x2 — Impacto 2
Montante T$ 50 2d6 19 — Corte 2
Bico de corvo T$ 15 1d8 X3 - Impacto/ perfuração 2
Desmontador T$ 20 - - - - 2
Espada de execução T$ 75 2d6 18/X4 - Corte 2
Lança de justa T$ 3 1d8 X2 - Perfuração 2
Malho T$ 8 1d10 X2 - Impacto 2
Martelo longo T$ 12 2d4 X4 - Impacto/perfuração 2
Tan-korak T$ 40 1d8 X2 - Impacto 2
Tetsubo T$ 20 1d10 X2 - Impacto 2

Ataque à Distância — Uma Mão
Tai-tai T$ 60 2d4 X2 Médio Perfuração 2

Ataque à Distância — Duas Mãos
Arco longo T$ 100 1d8 x3 Médio Perfuração 2
Flechas (20) T$ 1 — — — — 1
Besta pesada T$ 50 1d12 19 Médio Perfuração 2
Virotes (20) T$ 2 — — — — 1
Arco montado T$ 45 1d6 X3 Médio Perfuração 2
Flechas (20) T$ 1 - - - - 1
Besta dupla T$ 125 1d8 19 Médio Perfuração 2
Virotes (20) T$ 2 - - - - 1

Armas Exóticas
Corpo a Corpo — Uma Mão
Chicote T$ 2 1d3 x2 — Corte 1
Espada bastarda T$ 35 1d10/1d12 19 — Corte 1
Katana T$ 100 1d8/1d10 19 — Corte 1
Machado anão T$ 30 1d10 x3 — Corte 1
Açoite finntroll T$ 30 1d8 X2 - Corte
Espada vespa T$ 75 2d4 18 - Corte ou perfuração 1
Lança de falange T$ 15 1d8 X3 Curto Perfuração 1
Machado de haste T$ 40 1d8/1d10 X3 - Corte 1
Mordida do diabo T$ 30 1d4 x2 - Perfuração 1
Pistola-punhal T$300 ** ** ** Perfuração 1
Presa de serpente T$ 1000 1d8 17 - Corte 1
Rapieira T$ 50 1d8 18 - Perfuração 1

Corpo a Corpo — Duas Mãos
Corrente de espinhos T$ 25 2d4/2d4 19 — Corte 2
Machado táurico T$ 50 2d8 x3 — Corte 2
Lança de fogo T$ 1000 ** ** ** Perfuração 2
Marrão T$ 50 4d4 X2 - Impacto 2
Montante cinético T$ 3000 2d6 19/X4 - Corte 2

Ataque à Distância — Uma Mão
Rede T$ 20 — — Curto — 1

Arpão T$ 30 1d10 X3 Curto Perfuração 1
Boleadeira T$ 12 1d4 X2 Curto Impacto 1
Chakram T$ 15 1d6 X3 Curto Corte 1

Ataque à Distância - Leve
Shuriken T$ 1 1d4 X2 Curto Perfuração 0,5

Ataque à Distância — Duas Mãos
Arco de guerra T$ 200 1d12 X3 Médio Perfuração 2
Flechas (20) T$ 1 - - - - 1
Balestra T$ 180 1d12 19 Médio Perfuração 2
Virotes (20) T$ 2 - - - - 1
Besta de repetição T$ 250 1d8 19 Médio Perfuração 2
Virotes (20) T$ 2 - - - - 1

Armas de Fogo
Ataque à Distância — Leve
Pistola T$ 250 2d6 19/x3 Curto Perfuração 1
Balas (20) T$ 20 — — — — 1
Garrucha T$ 250 2d4 19/X3 Curto Perfuração 1
Balas(20) T$ 20 - - - - 1
Traque T$ 75 2d6 19/X3 Curto Perfuração 1

Ataque à Distância — Duas Mãos
Mosquete T$ 500 2d8 19/x3 Médio Perfuração 2
Balas (20) T$ 20 — — — — 1
Arcabuz T$ 800 2d10 19/X3 Médio Perfuração 2
Bacamarte T$ 450 4d6 19/X3 Especial Perfuração 2
Canhão portátil T$ 3000 4d10 19/X3 Curto Impacto 2
Bola de ferro (1) T$ 5 - - - - 0,5
Sifão cáustico T$ 600 4d6 x2 Especial Ácido 2
'''

RAW_ARMOR = '''
Armaduras Leves
Armadura acolchoada T$ 5 +1 0 2
Armadura de couro T$ 20 +2 0 2
Couro batido T$ 35 +3 –1 2
Gibão de peles T$ 25 +4 –3 2
Couraça T$ 500 +5 –4 2
Armadura Sensual T$55 +1 0 2
Armadura de Folhas T$75 +2 0 2
Armadura de engenhoqueiro goblin T$85 +3 -2 a -10 2
Armadura de Ossos T$120 +3 -2 2
Veste de teia de aranha T$ 3.000 +4 0 2
Cota de Moedas T$350 +4 -3 2
Colete fora da Lei T$750 +5 -5 2

Armaduras Pesadas
Brunea T$ 50 +5 –2 5
Cota de malha T$ 150 +6 –2 5
Loriga segmentada T$ 250 +7 –3 5
Meia armadura T$ 600 +8 –4 5
Armadura completa T$ 3000 +10 –5 5
Brigantina T$75 +6 0 5
Armadura de quitina T$350 +7 -3 5
Armadura de chumbo T$750 +7 -5 5
Armadura de justa T$1200 +9 -5 5
Armadura de hussardo alado T$4500 +10 -6 5
Armadura de pedra T$5500 +12 -5 5

Escudos
Escudo leve T$ 5 +1 –1 1
Escudo pesado T$ 15 +2 –2 2
Broquel T$25 - -1 0,5
Escudo de couro T$3 +1 -1 1
Escudo de vime T$15 +2 -2 2
Escudo torre T$45 +2 -4 2
Sagna T$20 +2 -3 2
'''

RAW_MISC = '''
Equipamento de Aventura
Água benta T$ 10 0,5
Algemas T$ 15 1
Arpéu T$ 5 1
Bandoleira de poções T$ 20 1
Barraca T$ 10 1
Corda T$ 1 1
Espelho T$ 10 1
Lampião T$ 7 1
Mochila T$ 2 —
Mochila de aventureiro T$ 50 —
Óleo T$ 0,1 0,5
Organizador de pergaminhos T$ 25 1
Pé de cabra T$ 2 1
Saco de dormir T$ 1 1
Símbolo sagrado T$ 5 1
Tocha T$ 0,11
Vara de madeira (3m) T$ 0,2 1
Ábaco T$ 45 1
Água benta concentrada T$ 60 0,5
Ampulheta T$ 45 1
Amuleto de Khalmyr T$ 30 1
Amuleto de Nimb T$ 30 1
Apanhador de sonhos T$ 40 1
Aparelho de chá T$ 30 1
Armação para mochila T$ 50 —
Asas do texugo T$ 200 2
Aspersório T$ 50 1
Astrolábio T$ 90 1
Bainha adornada T$ 100 1
Bússola T$ 45 1
Caixa de voz T$ 50 1
Cajado de pastor T$ 100 1
Cálice consagrado T$ 300 1
Cinto de utilidades T$ 50 1
Colar do suplicante T$ 30 1
Condecoração militar — 1
Corda de teia T$ 100 1
Dente de wishpago T$ 100 1
Dente falso T$ 300 —
Diagrama anatômico T$ 75 1
Emblema religioso T$ 30 1
Espelho refletor T$ 45 1
Estetoscópio T$ 60 1
Estrepes (bolsa para 3m) T$ 5 1
Favor da pessoa amada — 1
Férula T$ 100 1
Lampião de foco T$ 15 1
Leque T$ 3 1
Livro de métodos anti-Nimb T$ 100 1
Lupa T$ 30 1
Mapa T$ 30 1
Mecanismo de mola T$ 25 1
Mochila discreta T$ 20 1
Panfleto de aforismos T$ 30 1
Patuá T$ 50 1
Prancheta T$ 5 1
Sinete T$ 50 1
Texto sagrado T$ 60 1

Vestuário
Andrajos de aldeão T$ 1 1
Bandana T$ 5 1
Botas reforçadas T$ 20 1
Camisa bufante T$ 25 1
Capa esvoaçante T$ 25 1
Capa pesada T$ 15 1
Casaco longo T$ 20 1
Chapéu arcano T$ 50 1
Enfeite de elmo T$ 15 1
Farrapos de ermitão T$ 1 1
Gorro de ervas T$ 75 1
Luva de pelica T$ 5 1
Manopla T$ 10 1
Manto camuflado T$ 12 1
Manto eclesiástico T$ 20 1
Robe místico T$ 50 1
Sapatos de camurça T$ 8 1
Tabardo T$ 10 1
Traje da corte T$ 100 1
Traje de viajante T$ 10 —
Veste de seda T$ 25 1
Anel eclesiástico T$ 50 1
Avental de forja T$ 75 1
Camisolão T$ 12 1
Capa com dragonas T$ 50 1
Carcaça do predador... T$ 150 1
Casaca de apetrechos T$ 75 —
Chapéu emplumado T$ 50 1
Elmo leve T$ 15 1
Elmo pesado T$ 200 1
Garra feroz T$ 60 1
Garras do predador... T$ 300 1
Hábito monástico T$ 30 1
Hábito sacerdotal T$ 30 1
Jaqueta de couro T$ 15 1
Luva de falcoaria T$ 15 1
Luva magnética T$ 20 1
Manto de alto sacerdote T$ 300 1
Manto do mantor T$ 450 1
Manto pesado T$ 10 1
Máscara bucal T$ 3 1
Máscara completa T$ 15 1
Máscara de baile T$ 25 1
Máscara de soldador T$ 50 1
Monóculo T$ 50 1
Óculos de aeronauta T$ 15 1
Palmar T$ 12 1
Penas do predador T$ 100 1
Peruca T$ 20 1
Piercing de umbigo T$ 50 1
Rondel T$ 150 1
Roupão elegante T$ 150 1
Rufo T$ 25 1
Sandálias T$ 9 1
Sapatos confortáveis T$ 6 1
Sapatos de salto alto T$ 18 1
Sombreiro T$ 10 1
Tonsura T$ 3 1
Traje selako T$ 90 1
Túnica do Virtuoso T$ 25 1
Veste acolchoada T$ 60 1

Ferramentas
Alaúde élfico T$ 300 1
Coleção de livros T$ 75 1
Equipamento de viagem T$ 10 1
Estojo de disfarces T$ 50 1
Flauta mística T$ 150 1
Gazua T$ 5 1
Instrumentos de <ofício> T$ 30 1
Instrumento musical T$ 35 1
Luneta T$ 100 1
Maleta de medicamentos T$ 50 1
Sela T$ 20 1
Tambor das profundezas T$ 80 1
Apito de caça T$ 6 1
Baralho marcado T$ 15 1
Espelho cirúrgico T$ 12 1
Estandarte T$ 15 1
Estandarte portátil T$ 20 1
Molde pré-fabricado T$ 500 1
Trombeta do cruzado T$ 100 1

Esotéricos
Bolsa de pó T$ 300 1
Cajado arcano T$ 1000 2
Cetro elemental T$ 750 1
Costela de lich T$ 300 1
Dedo de ente T$ 200 1
Luva de ferro T$ 150 1
Medalhão de prata T$ 750 1
Orbe cristalino T$ 750 1
Tomo hermético T$ 1500 1
Varinha arcana T$ 100 1
Afiador solar T$ 100 1
Báculo da retribuição T$ 200 1
Compasso místico T$ 600 1
Contas de oração T$ 500 1
Estola T$ 150 1
Flauta convocadora T$ 300 1
Frasco purificador T$ 300 1
Mandala onírica T$ 300 1
Medalhão afiado T$ 900 1
Ostensório santificado T$ 750 1
Rede de almas T$ 1000 1
Turíbulo ungido T$ 100 1
Varinha armamentista T$ 600 1

Alquímicos — Preparados
Ácido T$ 10 0,5
Bálsamo restaurador T$ 10 0,5
Bomba T$ 50 0,5
Cosmético T$ 30 0,5
Elixir do amor T$ 100 0,5
Essência de mana T$ 50 0,5
Fogo alquímico T$ 10 0,5
Pó do desaparecimento T$ 100 0,5
Ácido concentrado T$ 60 0,5
Análgésico T$ 60 0,5
Bálsamo de drogadora T$ 60 0,5
Bomba de fumaça T$ 15 0,5
Elixir químico T$ 120 0,5
Estalinho Gury T$ 30 0,5
Éter elemental T$ 60 0,5
Extrato de gelo eterno T$ 60 0,5
Extrato de oxxdon T$ 180 0,5
Frasco abissal T$ 300 0,5
Granada redentora T$ 60 0,5
Incenso T$ 12 0,5
Isca putrefata T$ 60 0,5
Lágrima pétrea T$ 30 0,5
Lucidílico T$ 30 0,5
Óleo de baleia T$ 30 0,5
Óleo de besouro T$ 50 0,5
Pó azul T$ 150 0,5
Pó de cinza T$ 5 0,5
Pó do aparecimento T$ 30 0,5
Santa granada de mão T$ 150 0,5
Visco persistente T$ 25 0,5

Alquímicos — Catalisadores
Baga-de-fogo T$ 30 0,5
Dente-de-dragão T$ 45 0,5
Essência abissal T$ 150 0,5
Líquen lilás T$ 30 0,5
Musgo púrpura T$ 45 0,5
Ossos de monstro T$ 45 0,5
Pó de cristal T$ 30 0,5
Pó de giz T$ 30 0,5
Ramo verdejante T$ 45 0,5
Saco de sal T$ 45 0,5
Seixo de âmbar T$ 30 0,5
Terra de cemitério T$ 30 0,5
Água benta T$ 10 0,5
Corrosivo mineral T$ 150 0,5
Cristal reflexivo T$ 30 0,5
Essência fantasmal T$ 30 0,5
Favo de mel T$ 30 0,5
Fitilho consagrado T$ 30 0,5
Flor de orlyn T$ 30 0,5
Frasco de luz T$ 30 0,5
Gelo extremo T$ 150 0,5
Lantejoula T$ 30 0,5
Noz saltadora T$ 90 0,5
Pedaço de língua T$ 30 0,5
Pedra de sombras T$ 30 0,5
Pena de anjo T$ 30 0,5
Presa de Hyninn T$ 45 0,5
Raio cristalizado T$ 150 0,5
Vela eclesiástica T$ 60 0,5

Alquímicos — Venenos
Beladona T$ 1500 0,5
Bruma sonolenta T$ 150 0,5
Cicuta T$ 60 0,5
Essência de sombra T$ 100 0,5
Névoa tóxica T$ 30 0,5
Peçonha comum T$ 15 0,5
Peçonha concentrada T$ 90 0,5
Peçonha potente T$ 600 0,5
Pó de lich T$ 3000 0,5
Riso de Nimb T$ 150 0,5
Bolor hemorrágico T$ 60 0,5
Esporos de cogumelo T$ 75 0,5
Fumaça onírica T$ 150 0,5
Gás moroso R$ 60 0,5
Peçonha anciã T$ 1800 0,5
Peçonha irritante T$ 10 0,5
Seiva necrótica T$ 120 0,5
Veneno batráquio T$ 30 0,5

Alimentação
Batata valkariana T$ 2 0,5
Gorad quente T$ 18 0,5
Macarrão de Yuvalin T$ 6 0,5
Prato do aventureiro T$ 1 0,5
Ração de viagem (por dia) T$ 0,5 0,5
Refeição comum T$ 0,3 0,5
Sopa de peixe T$ 1 0,5
Abraço da noite T$ 3 —
Algravia T$ 3 —
Assado de entranhas T$ 2 —
Banquete de canceronte T$ 36 —
Bênção dos mares T$ 4 —
Bolinho de jade T$ 4 —
Bombas de saber T$ 3 —
Caldo de Lena T$ 3 —
Coc-au-triz T$ 54 —
Coragem de sangue T$ 4 —
Cozido de serpe T$ 12 —
Deleite mágico T$ 18 —
Frescor de Nimb T$ 1 —
Gorlogg ensopado T$ 6 —
Joia do deserto T$ 5 —
Justos de Khalmyr T$ 6 —
Justos virtuosos T$ 6 —
Manjar da paz T$ 7 —
Omelete monstruosa T$ 3 —
Ouro de dragão T$ 3 —
Ovos de raposa T$ 3 —
Pão de Thorw T$ 1 —
Presente da terra T$ 3 —
Renascer gentil T$ 30 —
Sashimi de kraken T$ 60 —
Suflê rubro T$ 4 —
Tesouro de Valkaria T$ 2 —

ALIMENTAÇÃO– PRATOS ESPECIAIS
Baga celeste cozida T$ 15 —
Cozido de pimenta T$ 10 —
Manjar de sombras T$ 20 —

ALIMENTAÇÃO – BEBIDAS
Baba de troll T$ 30 0,5
Barba queimada T$ 45 0,5
Cerveja deheoni T$ 15 0,5
Dilínio T$ 600 0,5
Grogue negro T$ 15 0,5
Grogue rubro T$ 45 0,5
Hidromel uivante T$ 21 0,5
Licor feérico T$ 450 0,5
Sidra ahleniense T$ 45 0,5
Vinho Pruss T$ 60 0,5
Vinho élfico T$ 90 0,5

ANIMAIS – ARMADURAS & VESTIMENTAS
Armadura de montaria leve T$ 600 2
Armadura de montaria pesada T$ 3000 5
Arreios namalkahnianos T$ 50 1
Caparazão T$ 75 1
Estribos T$ 60 1
Ornamento T$ 50 1

INSTRUMENTOS MUSICAIS
Cítara heptatônica T$ 250 1
Clarim deheoni T$ 150 1
Cornamusa de Doherimm T$ 750 2
Flauta sar-allan T$ 150 1
Gaita de foles T$ 500 1
Lira de casco de tartaruga T$ 300 1
Marionetes T$ 90 1
Pandeiro das estradas T$ 200 1
Tamborete marcial T$ 80 1
Trombeta tapistana T$ 300 1
Violino soprano T$ 300 1

APARATOS
Captador de luz T$ 450 *
Comutador T$ 300 *
Conversor-alimentador T$ 300 *
Engenho de automação T$ 600 *
Espera para melhorias T$ 150 *
Estabilizador T$ 900 *
Estimulador de sobrecarga T$ 750 *
Gatilho de corda T$ 1500 *
Giroscópio T$ 450 *
Ligação de convergência T$ 300 *
Remontagem de portabilidade T$ 300 *
Sequenciador de ativação T$ 600 *
Sistema de refrigeração T$ 900 *
Supressor de segurança T$ 300 *
Transformador místico T$ 600 *
'''

# ──────────────────────────────────────────────────────────────────
#  EXPRESSÕES REGULARES E AUXILIARES — LOJA NORMAL
# ──────────────────────────────────────────────────────────────────
PRICE_RE       = re.compile(r'(?:T\$|R\$)\s*((?:\*\*|\*|[0-9\.,]+))')
GENERIC_PRICE_RE = re.compile(r'(?:T\$|R\$)\s*((?:\*\*|\*|[0-9\.,]+))')
ARMOR_PARTS_RE = re.compile(
    r'^(?P<n>.+?)\s+(?:T\$|R\$)\s*(?P<price>(?:\*\*|\*|[0-9\.\,]+))'
    r'\s+(?P<bonus>[-+]?\d+|[-+]\d+|[-])'
    r'\s+(?P<penalty>[-+]?\d+(?:\s*a\s*[-+]?\d+)?|[-])'
    r'\s+(?P<weight>[0-9\.,]+)\s*$', re.I)


def _parse_price(raw: str) -> Optional[float]:
    if raw is None:
        return None
    rp = raw.strip()
    if rp in ('**', '*'):
        return rp
    if rp.count('.') > 1 and ',' in rp:
        rp = rp.replace('.', '')
    rp = rp.replace(',', '.')
    try:
        return float(rp)
    except Exception:
        return None


def _normalize_dash(s: str) -> str:
    return s.replace('\u2014', '-').replace('\u2013', '-').replace('—', '-').replace('–', '-')


def parse_weapon_line(line: str, current_category: Optional[str] = None) -> Optional[Dict[str, Any]]:
    line = line.rstrip()
    if not line or re.match(r'^\s*$', line):
        return None
    if re.match(r'^(Armas|Corpo a Corpo|Ataque|Armas Marciais|Armas Exóticas|Armas de Fogo)', line, re.I) \
            and not re.search(r'(T\$|R\$|\d+d|\*\*)', line):
        return None
    price_match = PRICE_RE.search(line)
    price_raw = price_val = None
    if price_match:
        price_raw = price_match.group(1)
        price_val = _parse_price(price_raw)
        name = line[:price_match.start()].strip()
        tail = _normalize_dash(line[price_match.end():].strip())
        tokens = [t for t in re.split(r'\s+', tail) if t != '']
    else:
        tokens = [t for t in re.split(r'\s+', line) if t != '']
        if len(tokens) >= 2 and re.search(r'\d+d\d+|\*\*', ' '.join(tokens[1:4])):
            name = tokens[0]; tokens = tokens[1:]
        else:
            return None
    name = re.sub(r'\s+', ' ', name).strip()
    damage = crit = alcance = tipo = peso = None
    if tokens:
        last = tokens[-1]
        if re.match(r'^[0-9]+[\,\.]?[0-9]*$|^[0-9]+[,\.][0-9]+$', last):
            peso = last.replace(',', '.'); tokens = tokens[:-1]
        elif last.isdigit() and len(tokens) >= 2 and re.match(r'^[A-Za-zÀ-ÿ\-]+$', tokens[-2]):
            peso = last; tokens = tokens[:-1]
    if tokens: tipo    = tokens[-1]; tokens = tokens[:-1]
    if tokens: alcance = tokens[-1]; tokens = tokens[:-1]
    if tokens: crit    = tokens[-1]; tokens = tokens[:-1]
    if tokens: damage  = ' '.join(tokens)
    if alcance in ('-', '—', '--'):
        alcance = 'Corpo a corpo'
    if isinstance(peso, str):
        try: peso = float(peso)
        except Exception: pass
    return {
        'kind': 'weapon', 'name': name,
        'price_raw': price_raw, 'price': price_val,
        'damage': damage, 'crit': crit, 'alcance': alcance,
        'tipo': tipo, 'peso': peso,
        'category': current_category, 'appearance_prob_percent': None
    }


def parse_armor_line(line: str, current_category: Optional[str] = None) -> Optional[Dict[str, Any]]:
    ln = line.strip()
    if not ln: return None
    if re.match(r'^(Armaduras|Escudos|Armadura|Escudo)', ln, re.I) and not re.search(r'(T\$|R\$|\d)', ln):
        return None
    ln = _normalize_dash(ln)
    m = ARMOR_PARTS_RE.match(ln)
    if m:
        name       = m.group('n').strip()
        price_raw  = m.group('price').strip()
        price_val  = _parse_price(price_raw)
        bonus_raw  = m.group('bonus').strip()
        penalty_raw= m.group('penalty').strip()
        weight_raw = m.group('weight').strip().replace(',', '.')
        try: weight_val = float(weight_raw)
        except Exception: weight_val = None
        bonus = None
        if bonus_raw and bonus_raw != '-':
            try: bonus = int(bonus_raw)
            except Exception: bonus = bonus_raw
        penalty = penalty_raw if penalty_raw != '-' else None
        return {
            'kind': 'armor', 'name': name,
            'price_raw': price_raw, 'price': price_val,
            'armor_bonus': bonus, 'armor_penalty': penalty, 'armor_weight': weight_val,
            'category': current_category, 'appearance_prob_percent': None
        }
    if 'T$' in ln or 'R$' in ln:
        parts = re.split(r'(?:T\$|R\$)', ln, maxsplit=1)
        if len(parts) == 2:
            name = parts[0].strip()
            tokens = [t for t in re.split(r'\s+', parts[1].strip()) if t != '']
            if tokens:
                price_raw = tokens[0]; price_val = _parse_price(price_raw)
                bonus = penalty = weight_val = None
                if len(tokens) >= 2:
                    try: bonus = int(tokens[1]) if tokens[1] != '-' else None
                    except Exception: bonus = tokens[1]
                if len(tokens) >= 3:
                    penalty = ' '.join(tokens[2:-1]) if len(tokens) > 3 else tokens[2]
                if len(tokens) >= 4:
                    try: weight_val = float(tokens[-1].replace(',', '.'))
                    except Exception: weight_val = None
                return {
                    'kind': 'armor', 'name': name,
                    'price_raw': price_raw, 'price': price_val,
                    'armor_bonus': bonus, 'armor_penalty': penalty, 'armor_weight': weight_val,
                    'category': current_category, 'appearance_prob_percent': None
                }
    return None


def parse_misc_line(line: str, current_category: Optional[str] = None) -> Optional[Dict[str, Any]]:
    ln = line.strip()
    if not ln: return None
    if re.match(
        r'^(Equipamento|Vestuário|Ferramentas|Esotéricos|Alquímicos|Alimentação'
        r'|INSTRUMENTOS|APARATOS|Alimentação)', ln, re.I
    ) and not re.search(r'(T\$|R\$|\d)', ln):
        return None
    ln = _normalize_dash(ln)
    price_match = GENERIC_PRICE_RE.search(ln)
    price_raw = price_val = weight_val = None
    name = ln; tail_tokens = []
    if price_match:
        price_raw = price_match.group(1); price_val = _parse_price(price_raw)
        name = ln[:price_match.start()].strip()
        tail = _normalize_dash(ln[price_match.end():].strip())
        tail_tokens = [t for t in re.split(r'\s+', tail) if t != '']
        if tail_tokens:
            last = tail_tokens[-1]
            if re.match(r'^[0-9]+[\,\.]?[0-9]*$|^[0-9]+,[0-9]+$', last):
                try:
                    weight_val = float(last.replace(',', '.')); tail_tokens = tail_tokens[:-1]
                except Exception: weight_val = None
            elif last in ('-', '—', '–'):
                weight_val = None; tail_tokens = tail_tokens[:-1]
    else:
        tokens = [t for t in re.split(r'\s+', ln) if t != '']
        if tokens and re.match(r'^[0-9]+[\,\.]?[0-9]*$', tokens[-1]):
            try:
                weight_val = float(tokens[-1].replace(',', '.')); name = ' '.join(tokens[:-1])
            except Exception: name = ln
        else:
            name = ln
    name = re.sub(r'\s+', ' ', name).strip().strip(' -–—')
    return {
        'kind': 'misc', 'name': name if name else None,
        'price_raw': price_raw, 'price': price_val, 'weight': weight_val,
        'category': current_category, 'appearance_prob_percent': None
    }


# ──────────────────────────────────────────────────────────────────
#  MONTAGEM DAS LISTAS — LOJA NORMAL
# ──────────────────────────────────────────────────────────────────
def _build_list(raw: str, parse_fn, category_keywords: List[str],
                assign_random_prob: bool = False,
                prob_low: float = 5.0, prob_high: float = 60.0,
                seed: Optional[int] = None) -> List[Dict[str, Any]]:
    raw = raw.replace('T$\n', 'T$ ').replace('R$\n', 'R$ ')
    items: List[Dict[str, Any]] = []
    current_category = None
    rng = random.Random(seed)
    for ln in raw.splitlines():
        stripped = ln.strip()
        if not stripped: continue
        if (len(stripped.split()) <= 6
                and any(k.lower() in stripped.lower() for k in category_keywords)
                and not re.search(r'(T\$|R\$|\d)', stripped)):
            current_category = stripped; continue
        parsed = parse_fn(ln, current_category=current_category)
        if parsed:
            parsed['appearance_prob_percent'] = (
                round(rng.uniform(prob_low, prob_high), 2) if assign_random_prob else 25.0
            )
            items.append(parsed)
    return items


def _remover_duplicatas(items: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    mapa: Dict = {}
    for it in items:
        key = (
            (it.get('kind') or '').lower(),
            (it.get('name') or '').lower(),
            (it.get('category') or '').lower()
        )
        if key not in mapa:
            mapa[key] = dict(it)
        else:
            ex = mapa[key]
            p_n, p_o = it.get('price'), ex.get('price')
            if isinstance(p_n, (int, float)) and isinstance(p_o, (int, float)):
                ex['price'] = min(p_o, p_n); ex['price_raw'] = ex.get('price_raw') or it.get('price_raw')
            elif isinstance(p_n, (int, float)):
                ex['price'] = p_n; ex['price_raw'] = it.get('price_raw')
            else:
                ex['price_raw'] = ex.get('price_raw') or it.get('price_raw')
                ex['price'] = ex.get('price') or it.get('price')
            try:
                a = float(ex.get('appearance_prob_percent') or 0)
                b = float(it.get('appearance_prob_percent') or 0)
                ex['appearance_prob_percent'] = round((a + b) / 2.0, 2)
            except Exception:
                ex['appearance_prob_percent'] = ex.get('appearance_prob_percent') or it.get('appearance_prob_percent')
            for fld in ['damage','crit','alcance','tipo','peso','armor_bonus','armor_penalty','armor_weight','weight']:
                if not ex.get(fld) and it.get(fld) is not None:
                    ex[fld] = it[fld]
    return list(mapa.values())


# Construção dos pools de itens
WEAPON_ITEMS = _build_list(RAW_WEAPONS, parse_weapon_line,
    category_keywords=['Armas','Corpo a Corpo','Ataque','Armas Marciais','Armas Exóticas','Armas de Fogo'],
    assign_random_prob=True, prob_low=5.0, prob_high=60.0)
ARMOR_ITEMS  = _build_list(RAW_ARMOR, parse_armor_line,
    category_keywords=['Armaduras','Escudos','Armadura','Escudo'],
    assign_random_prob=True, prob_low=5.0, prob_high=60.0)
MISC_ITEMS   = _build_list(RAW_MISC, parse_misc_line,
    category_keywords=['Equipamento','Vestuário','Ferramentas','Esotéricos','Alquímicos',
                       'Alimentação','INSTRUMENTOS','APARATOS'],
    assign_random_prob=True, prob_low=5.0, prob_high=60.0)

WEAPON_ITEMS = _remover_duplicatas(WEAPON_ITEMS)
ARMOR_ITEMS  = _remover_duplicatas(ARMOR_ITEMS)
MISC_ITEMS   = _remover_duplicatas(MISC_ITEMS)
ALL_ITEMS    = _remover_duplicatas(WEAPON_ITEMS + ARMOR_ITEMS + MISC_ITEMS)


# ──────────────────────────────────────────────────────────────────
#  GERAÇÃO DA LOJA NORMAL
# ──────────────────────────────────────────────────────────────────
def gerar_loja_normal(items: List[Dict[str, Any]],
                      seed: Optional[int] = None,
                      faixa_desconto: tuple = (1, 80)) -> List[Dict[str, Any]]:
    """
    Sorteia itens para aparecer na loja e aplica descontos aleatórios.
    Retorna lista de dicionários (compatível com JSON).
    """
    rng = random.Random(seed)
    rows: List[Dict[str, Any]] = []
    for it in items:
        prob = float(it.get('appearance_prob_percent', 25.0)) / 100.0
        if rng.random() > prob:
            continue
        price_raw = it.get('price')
        desconto  = rng.randint(faixa_desconto[0], faixa_desconto[1])
        if isinstance(price_raw, (float, int)):
            preco_final = round(price_raw * (1 - desconto / 100.0), 2)
        elif price_raw in ('**', '*'):
            preco_final = price_raw
        else:
            preco_final = None
        row: Dict[str, Any] = {
            'tipo_item':            it.get('kind'),
            'categoria':            it.get('category'),
            'nome':                 it.get('name'),
            'preco_original':       price_raw,
            'desconto_pct':         desconto,
            'preco_final':          preco_final,
            'probabilidade_aparecer': it.get('appearance_prob_percent'),
        }
        if it.get('kind') == 'weapon':
            row.update({'dano': it.get('damage'), 'critico': it.get('crit'),
                        'alcance': it.get('alcance'), 'tipo_arma': it.get('tipo'),
                        'peso': it.get('peso'), 'bonus_armadura': None,
                        'penalidade_armadura': None, 'peso_armadura': None})
        elif it.get('kind') == 'armor':
            row.update({'dano': None, 'critico': None, 'alcance': None, 'tipo_arma': None,
                        'peso': None, 'bonus_armadura': it.get('armor_bonus'),
                        'penalidade_armadura': it.get('armor_penalty'),
                        'peso_armadura': it.get('armor_weight')})
        else:
            row.update({'dano': None, 'critico': None, 'alcance': None, 'tipo_arma': None,
                        'peso': it.get('weight'), 'bonus_armadura': None,
                        'penalidade_armadura': None, 'peso_armadura': None})
        rows.append(row)
    rows.sort(key=lambda r: (r.get('tipo_item') or '', r.get('categoria') or '', r.get('nome') or ''))
    return rows


def listar_loja_normal(rows: List[Dict[str, Any]], titulo: str = 'Loja Normal'):
    """Imprime a loja normal no terminal (sem pandas)."""
    if not rows:
        print(f"{titulo}: Nenhum item disponível nesta geração."); return
    print(f"\n{'═'*60}")
    print(f"  {titulo} — Total de itens: {len(rows)}")
    print(f"{'═'*60}")
    for r in rows:
        desc = f"-{r['desconto_pct']}%" if r.get('desconto_pct') is not None else ''
        preco = f"T${r['preco_final']}" if r.get('preco_final') not in (None,'**','*') else str(r.get('preco_final','?'))
        print(f"  [{r.get('tipo_item','?'):6s}] {str(r.get('nome','?')):<40s} "
              f"orig=T${r.get('preco_original','?')}  {desc:5s}  final={preco}")
    print()


# ══════════════════════════════════════════════════════════════════
#
#  ██╗      ██████╗      ██╗ █████╗     ███████╗███████╗██████╗
#  ██║     ██╔═══██╗     ██║██╔══██╗    ██╔════╝██╔════╝██╔══██╗
#  ██║     ██║   ██║     ██║███████║    █████╗  ███████╗██████╔╝
#  ██║     ██║   ██║██   ██║██╔══██║    ██╔══╝  ╚════██║██╔═══╝
#  ███████╗╚██████╔╝╚█████╔╝██║  ██║    ███████╗███████║██║
#  ╚══════╝ ╚═════╝  ╚════╝ ╚═╝  ╚═╝    ╚══════╝╚══════╝╚═╝
#
#  Encantamentos mágicos para armas, armaduras, escudos, etc.
# ══════════════════════════════════════════════════════════════════

# ──────────────────────────────────────────────────────────────────
#  CONFIGURAÇÃO DE PROBABILIDADE GLOBAL — LOJA ESPECIAL
# ──────────────────────────────────────────────────────────────────
PROB_ESP         = 5                        # percentual base por encantamento
PROB_ESP_DECIMAL = PROB_ESP / 100.0

# ──────────────────────────────────────────────────────────────────
#  POOLS DE ENCANTAMENTOS — LOJA ESPECIAL
# ──────────────────────────────────────────────────────────────────
ENCANTAMENTOS_ARMAS: List[Dict[str, Any]] = [
    {"name": "Ameaçadora",   "effect": "Duplica margem de ameaça",                  "appearance_prob_percent": PROB_ESP},
    {"name": "Anticriatura", "effect": "Bônus contra tipo de criatura",             "appearance_prob_percent": PROB_ESP},
    {"name": "Arremesso",    "effect": "Pode ser arremessada",                      "appearance_prob_percent": PROB_ESP},
    {"name": "Assassina",    "effect": "Aumenta ataque furtivo",                    "appearance_prob_percent": PROB_ESP},
    {"name": "Caçadora",     "effect": "Ignora camuflagem leve/total e cobertura leve", "appearance_prob_percent": PROB_ESP},
    {"name": "Congelante",   "effect": "+1d6 de dano de frio",                      "appearance_prob_percent": PROB_ESP},
    {"name": "Conjuradora",  "effect": "Pode guardar e lançar magias",              "appearance_prob_percent": PROB_ESP},
    {"name": "Corrosiva",    "effect": "+1d6 de dano de ácido",                     "appearance_prob_percent": PROB_ESP},
    {"name": "Dançarina",    "effect": "Ataca sozinha",                             "appearance_prob_percent": PROB_ESP},
    {"name": "Defensora",    "effect": "Defesa +2",                                 "appearance_prob_percent": PROB_ESP},
    {"name": "Destruidora",  "effect": "Bônus contra construtos",                   "appearance_prob_percent": PROB_ESP},
    {"name": "Dilacerante",  "effect": "+10 de dano em acertos críticos",           "appearance_prob_percent": PROB_ESP},
    {"name": "Drenante",     "effect": "Crítico drena vítima",                      "appearance_prob_percent": PROB_ESP},
    {"name": "Elétrica",     "effect": "+1d6 de dano de eletricidade",              "appearance_prob_percent": PROB_ESP},
    {"name": "Energética",   "effect": "Bônus em ataque",                           "appearance_prob_percent": PROB_ESP},
    {"name": "Excruciante",  "effect": "Causa fraqueza",                            "appearance_prob_percent": PROB_ESP},
    {"name": "Flamejante",   "effect": "+1d6 de dano de fogo",                      "appearance_prob_percent": PROB_ESP},
    {"name": "Formidável",   "effect": "Ataque e dano +2",                          "appearance_prob_percent": PROB_ESP},
    {"name": "Lancinante",   "effect": "Causa crítico terrível",                    "appearance_prob_percent": PROB_ESP},
    {"name": "Magnífica",    "effect": "Ataque e dano +4",                          "appearance_prob_percent": PROB_ESP},
    {"name": "Piedosa",      "effect": "Dano não letal",                            "appearance_prob_percent": PROB_ESP},
    {"name": "Profana",      "effect": "Bônus contra devotos do Bem",               "appearance_prob_percent": PROB_ESP},
    {"name": "Sagrada",      "effect": "Bônus contra devotos do Mal",               "appearance_prob_percent": PROB_ESP},
    {"name": "Sanguinária",  "effect": "Causa sangramento",                         "appearance_prob_percent": PROB_ESP},
    {"name": "Trovejante",   "effect": "Causa atordoamento",                        "appearance_prob_percent": PROB_ESP},
    {"name": "Tumular",      "effect": "+1d8 de dano de trevas",                    "appearance_prob_percent": PROB_ESP},
    {"name": "Veloz",        "effect": "Fornece ataque extra",                      "appearance_prob_percent": PROB_ESP},
    {"name": "Venenosa",     "effect": "Causa envenenamento",                       "appearance_prob_percent": PROB_ESP},
]

ENCANTAMENTOS_ARMADURAS_ESCUDOS: List[Dict[str, Any]] = [
    {"name": "Abascanto",       "effect": "Resistência contra magia",           "appearance_prob_percent": PROB_ESP},
    {"name": "Abençoado",       "effect": "Resistência contra trevas",          "appearance_prob_percent": PROB_ESP},
    {"name": "Acrobático",      "effect": "Bônus em Acrobacia",                 "appearance_prob_percent": PROB_ESP},
    {"name": "Alado",           "effect": "Deslocamento de voo 12m",            "appearance_prob_percent": PROB_ESP},
    {"name": "Animado",         "effect": "Escudo defende sozinho",             "appearance_prob_percent": PROB_ESP},
    {"name": "Assustador",      "effect": "Causa efeito de medo",               "appearance_prob_percent": PROB_ESP},
    {"name": "Cáustica",        "effect": "Resistência contra ácido",           "appearance_prob_percent": PROB_ESP},
    {"name": "Defensor",        "effect": "Defesa +2",                          "appearance_prob_percent": PROB_ESP},
    {"name": "Escorregadio",    "effect": "Bônus para escapar",                 "appearance_prob_percent": PROB_ESP},
    {"name": "Esmagador",       "effect": "Escudo causa mais dano",             "appearance_prob_percent": PROB_ESP},
    {"name": "Fantasmagórico",  "effect": "Lança Manto de Sombras",             "appearance_prob_percent": PROB_ESP},
    {"name": "Fortificado",     "effect": "Chance de ignorar crítico",          "appearance_prob_percent": PROB_ESP},
    {"name": "Gélido",          "effect": "Resistência contra frio",            "appearance_prob_percent": PROB_ESP},
    {"name": "Guardião",        "effect": "Defesa +4",                          "appearance_prob_percent": PROB_ESP},
    {"name": "Hipnótico",       "effect": "Fascina inimigos",                   "appearance_prob_percent": PROB_ESP},
    {"name": "Ilusório",        "effect": "Camufla-se como item comum",         "appearance_prob_percent": PROB_ESP},
    {"name": "Incandescente",   "effect": "Resistência contra fogo",            "appearance_prob_percent": PROB_ESP},
    {"name": "Invulnerável",    "effect": "Redução de dano",                    "appearance_prob_percent": PROB_ESP},
    {"name": "Opaco",           "effect": "Redução de energia",                 "appearance_prob_percent": PROB_ESP},
    {"name": "Protetor",        "effect": "Resistência +2",                     "appearance_prob_percent": PROB_ESP},
    {"name": "Refletor",        "effect": "Reflete magia",                      "appearance_prob_percent": PROB_ESP},
    {"name": "Relampejante",    "effect": "Resistência contra eletricidade",    "appearance_prob_percent": PROB_ESP},
    {"name": "Reluzente",       "effect": "Causa efeito de cegueira",           "appearance_prob_percent": PROB_ESP},
    {"name": "Sombrio",         "effect": "Bônus em Furtividade",               "appearance_prob_percent": PROB_ESP},
    {"name": "Zeloso",          "effect": "Atrai ataques em aliados",           "appearance_prob_percent": PROB_ESP},
]

ENCANTAMENTOS_ESOTERICOS: List[Dict[str, Any]] = [
    {"name": "Abafador",   "effect": "Falha: CDs do alvo -2 (1r)",               "appearance_prob_percent": PROB_ESP},
    {"name": "Bélico",     "effect": "Magias de dano: +1d10 essência",           "appearance_prob_percent": PROB_ESP},
    {"name": "Caridoso",   "effect": "Ao curar aliado: +1PM temporário",         "appearance_prob_percent": PROB_ESP},
    {"name": "Chocante",   "effect": "Elétricas: +1d; ofusca 1r",                "appearance_prob_percent": PROB_ESP},
    {"name": "Clemente",   "effect": "Curas: +1 dado de cura",                   "appearance_prob_percent": PROB_ESP},
    {"name": "Contido",    "effect": "1PM: converte dano em não letal",           "appearance_prob_percent": PROB_ESP},
    {"name": "Emergencial","effect": "4PM: reação cura aliado ao sofrer dano",   "appearance_prob_percent": PROB_ESP},
    {"name": "Glacial",    "effect": "Frio: +1d; alvo vulnerável 1r",            "appearance_prob_percent": PROB_ESP},
    {"name": "Majestoso",  "effect": "CD+1 magias arcanas",                      "appearance_prob_percent": PROB_ESP},
    {"name": "Nímbico",    "effect": "Rerolls; pares custam 1PM",                "appearance_prob_percent": PROB_ESP},
]

ENCANTAMENTOS_ACESSORIOS: List[Dict[str, Any]] = [
    {"name": "Aconchegante", "effect": "Melhora descanso em uma categoria",      "appearance_prob_percent": PROB_ESP},
    {"name": "Ajudante",     "effect": "Bônus da perícia +2 (ferramenta)",       "appearance_prob_percent": PROB_ESP},
    {"name": "Autoritário",  "effect": "+2 Intimidação; +2 CD em medo",          "appearance_prob_percent": PROB_ESP},
    {"name": "Compacto",     "effect": "Não ocupa espaços",                      "appearance_prob_percent": PROB_ESP},
    {"name": "Imaculado",    "effect": "+2 Diplomacia; +2CD em Aparência",       "appearance_prob_percent": PROB_ESP},
    {"name": "Insinuante",   "effect": "+2 Enganação; +2CD efeitos mentais",     "appearance_prob_percent": PROB_ESP},
    {"name": "Ligeiro",      "effect": "Vestir/remover ação livre",              "appearance_prob_percent": PROB_ESP},
    {"name": "Prontidão",    "effect": "Surge nas mãos; empunhar ação livre",    "appearance_prob_percent": PROB_ESP},
]

_ENCHANT_MAP: Dict[str, List[Dict[str, Any]]] = {
    'arma':      ENCANTAMENTOS_ARMAS,
    'armadura':  ENCANTAMENTOS_ARMADURAS_ESCUDOS,
    'escudo':    ENCANTAMENTOS_ARMADURAS_ESCUDOS,
    'esoterico': ENCANTAMENTOS_ESOTERICOS,
    'acessorio': ENCANTAMENTOS_ACESSORIOS,
}


def get_all_enchants() -> Dict[str, List[Dict[str, Any]]]:
    """Retorna cópia profunda de todos os pools de encantamentos."""
    return copy.deepcopy(_ENCHANT_MAP)


def roll_once_for_item(item_type: str,
                       independent: bool = True,
                       max_per_item: Optional[int] = None,
                       rng: Optional[random.Random] = None) -> List[Dict[str, Any]]:
    """
    Executa UMA tentativa para um tipo de item e retorna os encantamentos sorteados.

    Parâmetros
    ----------
    item_type   : 'arma', 'armadura', 'escudo', 'esoterico' ou 'acessorio'
    independent : True  → cada encantamento testado individualmente pela sua chance
                  False → um único teste global; se passar, escolhe 1 aleatório do pool
    max_per_item: limita o número máximo de encantamentos retornados (None = sem limite)
    rng         : instância de random.Random (None = cria uma nova)
    """
    if rng is None:
        rng = random.Random()
    key = item_type.lower()
    if key not in _ENCHANT_MAP:
        return []
    pool = _ENCHANT_MAP[key]
    if not independent:
        if rng.random() <= PROB_ESP_DECIMAL:
            return [copy.deepcopy(rng.choice(pool))]
        return []
    hits: List[Dict[str, Any]] = []
    for e in pool:
        try:
            p_dec = float(e.get('appearance_prob_percent', PROB_ESP)) / 100.0
        except (TypeError, ValueError):
            p_dec = PROB_ESP_DECIMAL
        if rng.random() <= p_dec:
            hits.append(copy.deepcopy(e))
    if max_per_item is not None and len(hits) > max_per_item:
        hits = rng.sample(hits, k=max_per_item)
    return hits


def gerar_loja_especial(seed: Optional[int] = None) -> Dict[str, Any]:
    """
    Sorteia encantamentos para cada categoria.
    Retorna dicionário pronto para serialização JSON.
    """
    rng = random.Random(seed)
    categorias = ['arma', 'armadura', 'escudo', 'esoterico', 'acessorio']
    resultado: Dict[str, Any] = {
        'tipo': 'loja_especial',
        'categorias': {}
    }
    for cat in categorias:
        encantamentos = roll_once_for_item(cat, independent=True, max_per_item=None, rng=rng)
        resultado['categorias'][cat] = {
            'total': len(encantamentos),
            'encantamentos': encantamentos
        }
    return resultado


def listar_loja_especial(dados: Dict[str, Any]):
    """Imprime a loja especial no terminal."""
    print(f"\n{'═'*60}")
    print("  LOJA ESPECIAL — Encantamentos Disponíveis")
    print(f"{'═'*60}")
    for cat, info in dados.get('categorias', {}).items():
        total = info.get('total', 0)
        print(f"\n  [{cat.upper():10s}] → {total} encantamento(s)")
        for ench in info.get('encantamentos', []):
            print(f"    • {ench['name']}: {ench['effect']} (p={ench.get('appearance_prob_percent')}%)")
    print()


# ══════════════════════════════════════════════════════════════════
#  GERAÇÃO DOS ARQUIVOS JSON
# ══════════════════════════════════════════════════════════════════
def salvar_json(dados: Any, caminho: str, indent: int = 2):
    """Salva `dados` em `caminho` como JSON formatado."""
    with open(caminho, 'w', encoding='utf-8') as f:
        json.dump(dados, f, ensure_ascii=False, indent=indent)
    print(f"  ✔  Arquivo salvo: {caminho}")


# ══════════════════════════════════════════════════════════════════
#  PONTO DE ENTRADA
# ══════════════════════════════════════════════════════════════════
if __name__ == '__main__':
    import os

    # ── LOJA NORMAL ──────────────────────────────────────────────
    print("\n⚙  Gerando Loja Normal...")
    loja_normal_dados = gerar_loja_normal(ALL_ITEMS, seed=None)
    listar_loja_normal(loja_normal_dados)

    saida_normal = {
        'tipo':        'loja_normal',
        'total_itens': len(loja_normal_dados),
        'itens':       loja_normal_dados
    }
    salvar_json(saida_normal, os.path.join(os.path.dirname(__file__), '..', 'data', 'loja.json'))

    # ── LOJA ESPECIAL ─────────────────────────────────────────────
    print("\n⚙  Gerando Loja Especial...")
    loja_especial_dados = gerar_loja_especial(seed=None)
    listar_loja_especial(loja_especial_dados)
    salvar_json(loja_especial_dados, os.path.join(os.path.dirname(__file__), '..', 'data', 'loja_especial.json'))

    print("\n✅  Pronto! Arquivos gerados:")
    print(f"     • loja.json          gerado com sucesso")
    print(f"     • loja_especial.json gerado com sucesso\n")
