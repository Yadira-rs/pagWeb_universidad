#!/usr/bin/env bash
# Construye el sitio y lo sube al servidor Ubuntu de la universidad.
# Ver DEPLOY.md para cómo se preparó el servidor la primera vez.
set -euo pipefail

# ─── Edita estos valores con los datos de tu servidor ───
SERVER_USER="feca"
SERVER_HOST="127.0.0.1"
SERVER_PORT="2222"
SERVER_PATH="/var/www/feca/dist"
# ────────────────────────────────────────────────────────────

cd "$(dirname "$0")/.."

echo "==> Construyendo el sitio (npm run build)..."
npm run build

echo "==> Subiendo dist/ a $SERVER_USER@$SERVER_HOST:$SERVER_PATH ..."
if command -v rsync >/dev/null 2>&1; then
  # rsync borra en el servidor lo que ya no existe en dist/ (más limpio
  # con el paso del tiempo, ya que Vite genera nombres de archivo con hash).
  rsync -avz --delete -e "ssh -p $SERVER_PORT" dist/ "$SERVER_USER@$SERVER_HOST:$SERVER_PATH/"
else
  scp -P "$SERVER_PORT" -r dist/* "$SERVER_USER@$SERVER_HOST:$SERVER_PATH/"
fi

echo "==> Listo. Revisa http://$SERVER_HOST/"
