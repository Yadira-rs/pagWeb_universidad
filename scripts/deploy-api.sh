#!/usr/bin/env bash
# Sube el código de services/pagweb-api y services/admisiones-api al
# servidor Ubuntu y reinicia ambos con pm2. Ver DEPLOY.md, sección
# "Desplegar las APIs propias", para la preparación de una sola vez
# (instalar Node/pm2, crear los .env en el servidor, etc.) — este script
# asume que eso ya está hecho.
set -euo pipefail

# ─── Edita estos valores con los datos de tu servidor ───
SERVER_USER="team3-feca"
SERVER_HOST="200.23.125.107"
SERVER_PORT="22"
API_BASE_PATH="/opt/facultad-api"
# ────────────────────────────────────────────────────────────

cd "$(dirname "$0")/.."

push_code() {
  local name="$1"
  echo "==> Subiendo services/$name/ ..."
  if command -v rsync >/dev/null 2>&1; then
    rsync -avz --delete \
      --exclude node_modules --exclude .env --exclude uploads \
      -e "ssh -p $SERVER_PORT" \
      "services/$name/" "$SERVER_USER@$SERVER_HOST:$API_BASE_PATH/$name/"
  else
    # Sin rsync (p. ej. Git Bash en Windows): empaqueta y manda por SSH.
    # No borra en el servidor archivos que ya no existan localmente.
    echo "    (rsync no está; usando tar + ssh)"
    tar czf - -C "services/$name" \
      --exclude node_modules --exclude .env --exclude uploads . \
      | ssh -p "$SERVER_PORT" "$SERVER_USER@$SERVER_HOST" \
        "mkdir -p '$API_BASE_PATH/$name' && tar xzf - -C '$API_BASE_PATH/$name'"
  fi
}

restart_service() {
  local name="$1"
  echo "==> Instalando dependencias y (re)arrancando $name con pm2 ..."
  ssh -p "$SERVER_PORT" "$SERVER_USER@$SERVER_HOST" \
    "cd '$API_BASE_PATH/$name' && npm install --omit=dev && (pm2 restart $name || pm2 start src/index.js --name $name)"
}

push_code "pagweb-api"
push_code "admisiones-api"
restart_service "pagweb-api"
restart_service "admisiones-api"

ssh -p "$SERVER_PORT" "$SERVER_USER@$SERVER_HOST" "pm2 save"

echo "==> Listo. 'pm2 logs' en el servidor para revisar que ambos servicios hayan arrancado bien."
