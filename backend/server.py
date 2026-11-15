"""Servidor estático local opcional do Grifos Alados.

Uso: pip install flask; python backend/server.py
As notícias são lidas e salvas no Firebase, inclusive ao usar este servidor.
"""

import sys
import os

BACKEND_DIR = os.path.dirname(os.path.abspath(__file__))
ROOT_DIR = os.path.abspath(os.path.join(BACKEND_DIR, '..'))

try:
    from flask import Flask, jsonify, send_from_directory
except ImportError:
    print("\n[X] Flask nao encontrado. Instale com: pip install flask\n")
    sys.exit(1)

app = Flask(__name__, static_folder=ROOT_DIR, static_url_path='')
PORT = 8000


@app.route('/')
def index():
    return send_from_directory(ROOT_DIR, 'index.html')


@app.route('/api/noticias', methods=['POST'])
def save_noticias():
    """Clientes antigos não devem receber confirmação falsa de publicação."""
    return jsonify({'ok': False, 'erro': 'As noticias agora sao salvas no Firebase. Atualize a pagina.'}), 410


if __name__ == '__main__':
    print(f"\n[OK] Grifos Alados em http://localhost:{PORT}")
    print("Noticias: leitura e publicacao pelo Firebase. Ctrl+C para parar.\n")
    app.run(port=PORT, debug=False)
