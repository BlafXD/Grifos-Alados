"""
╔══════════════════════════════════════════════════════════════════╗
║  SERVER.PY — Servidor local do site Grifos Alados                ║
║  Localização: /grifos-alados/backend/server.py                   ║
║                                                                  ║
║  O site (Recompensas, Loja, Monstros e a LEITURA das Notícias)   ║
║  funciona offline, abrindo o index.html direto. Este servidor    ║
║  só é necessário para EDITAR/SALVAR as Notícias:                 ║
║                                                                  ║
║    POST /api/noticias  -> grava as noticias em dois arquivos:    ║
║        - data/noticias.json    (copia legivel em JSON)           ║
║        - js/noticias-data.js   (lido pelo site, inclusive        ║
║                                 offline, sem servidor)           ║
║                                                                  ║
║  Como usar:                                                      ║
║    cd grifos-alados/backend                                      ║
║    pip install flask                                             ║
║    python server.py                                              ║
║                                                                  ║
║  Acesse: http://localhost:8000                                   ║
╚══════════════════════════════════════════════════════════════════╝
"""

import sys
import os
import json as json_lib

BACKEND_DIR = os.path.dirname(os.path.abspath(__file__))
ROOT_DIR    = os.path.abspath(os.path.join(BACKEND_DIR, '..'))

try:
    from flask import Flask, jsonify, send_from_directory, request
except ImportError:
    print("\n[X]  Flask nao encontrado. Instale com:\n    pip install flask\n")
    sys.exit(1)

# -- configuracao -------------------------------------------------
app      = Flask(__name__, static_folder=ROOT_DIR, static_url_path='')
PORT     = 8000
DATA_DIR = os.path.join(ROOT_DIR, 'data')
JS_DIR   = os.path.join(ROOT_DIR, 'js')


# -- pagina principal ---------------------------------------------
@app.route('/')
def index():
    return send_from_directory(ROOT_DIR, 'index.html')


# =================================================================
#  NOTICIAS -- salvar
# =================================================================
@app.route('/api/noticias', methods=['POST'])
def save_noticias():
    """Recebe as noticias do site e grava nos dois arquivos.

    A leitura das noticias e feita pelo proprio site via
    js/noticias-data.js, entao aqui so precisamos GRAVAR.
    """
    dados = request.get_json(force=True, silent=True)
    if dados is None:
        return jsonify({'ok': False, 'erro': 'JSON invalido'}), 400

    texto_json = json_lib.dumps(dados, ensure_ascii=False, indent=2)

    # 1) copia legivel em JSON puro (backup)
    os.makedirs(DATA_DIR, exist_ok=True)
    with open(os.path.join(DATA_DIR, 'noticias.json'), 'w', encoding='utf-8') as f:
        f.write(texto_json)

    # 2) arquivo .js que o site carrega -- funciona offline, sem servidor
    os.makedirs(JS_DIR, exist_ok=True)
    with open(os.path.join(JS_DIR, 'noticias-data.js'), 'w', encoding='utf-8') as f:
        f.write('// Noticias do Grifos Alados.\n')
        f.write('// Este arquivo e gerado/atualizado pelo server.py ao salvar.\n')
        f.write('// Ele permite que as noticias sejam lidas mesmo offline (sem servidor).\n')
        f.write('window.NOTICIAS_DADOS = ' + texto_json + ';\n')

    return jsonify({'ok': True})


# -- inicia servidor ----------------------------------------------
if __name__ == '__main__':
    print(f"\n[OK]  Grifos Alados rodando em  http://localhost:{PORT}")
    print(f"      Pasta raiz: {ROOT_DIR}")
    print( "      O server.py so e preciso para editar as Noticias.")
    print( "      Pressione Ctrl+C para parar.\n")
    app.run(port=PORT, debug=False)
