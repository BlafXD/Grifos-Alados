╔══════════════════════════════════════════════════════════════════╗
║                    GRIFOS ALADOS — Instruções                    ║
║              Ferramenta de mesa para Tormenta 20                  ║
╚══════════════════════════════════════════════════════════════════╝

O QUE É
───────
Um site local com quatro ferramentas para as sessões de RPG:

  ⚔  Notícias               — jornal de Arton, editável
  🎁  Gerador de Recompensas — sorteia dinheiro e itens por ND
  🏪  Gerador de Loja        — sorteia o inventário de uma loja
  🐉  Monstros               — fichas de criatura, com rolador de dados

Funciona TUDO OFFLINE — as fontes ficam embutidas na pasta e as
notícias podem ser lidas sem o servidor. Bom para levar em viagem.

COMO USAR (o dia a dia)
───────────────────────
Para apenas USAR o site (ler notícias, sortear loja/recompensas,
montar criaturas), basta abrir o arquivo:

      index.html        (duplo-clique)

Não precisa de internet nem de instalar nada.

COMO EDITAR AS NOTÍCIAS
───────────────────────
Para ADICIONAR ou EDITAR notícias, é preciso rodar o servidor — um
navegador sozinho não tem permissão de gravar arquivos no PC.

1. Instale o Flask (somente na primeira vez):
      pip install flask

2. Entre na pasta backend e rode o servidor:
      cd grifos-alados/backend
      python server.py

3. Abra no navegador:  http://localhost:8000

4. Use o botão "✏ Editar Notícias" para criar/editar/remover.

5. Ao terminar, pode fechar o servidor (Ctrl+C no terminal).
   As notícias editadas ficam SALVAS no arquivo e continuam
   aparecendo normalmente quando o site for aberto offline depois.

ESTRUTURA DE PASTAS
───────────────────
grifos-alados/
├── index.html              ← página principal
├── Grifos_Alados.png       ← ícone do site (favicon)
├── README.txt              ← este arquivo
├── css/
│   ├── fonts.css           ← fontes embutidas (uso offline)
│   ├── style.css           ← estilos globais
│   ├── noticias_style.css  ← estilos da aba Notícias
│   ├── loja_style.css      ← estilos da aba Loja
│   └── monstros_style.css  ← estilos da aba Monstros
├── fonts/                  ← arquivos das fontes (.woff2)
├── js/
│   ├── script.js           ← navegação entre as abas
│   ├── noticias.js         ← aba Notícias
│   ├── noticias-data.js    ← as notícias salvas (gerado pelo server.py)
│   ├── recompensas.js      ← aba Gerador de Recompensas
│   ├── loja.js             ← aba Gerador de Loja (interface; Normal/Especial/Magias)
│   ├── loja_completa.js    ← dados e sorteio da Loja
│   ├── magias.js           ← pergaminhos de magia (aba Magias da Loja)
│   └── monstros.js         ← aba Monstros
├── data/
│   └── noticias.json       ← cópia das notícias em JSON (backup)
└── backend/
    ├── server.py           ← servidor local (só para editar Notícias)
    └── loja_completa.py    ← antigo gerador da loja (não é mais usado)

ONDE FICAM SALVOS OS DADOS
──────────────────────────
  • Notícias  → em js/noticias-data.js (e uma cópia em
                data/noticias.json). Viajam junto no .zip — quem
                receber o .zip vê as mesmas notícias.
  • Monstros  → na "memória" do navegador (localStorage). Ficam
                salvos neste computador e sobrevivem a fechar a aba
                ou reiniciar — mas NÃO viajam dentro do .zip.
  • Loja e Recompensas → são sorteadas na hora, a cada clique.
