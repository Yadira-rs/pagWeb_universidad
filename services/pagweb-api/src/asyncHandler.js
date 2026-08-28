// Envuelve un handler async de Express: si la promesa rechaza (ej. falla
// la conexión a Postgres), lo manda al error handler en vez de dejarlo
// como una promesa rechazada sin atrapar — eso, sin este wrapper, tumba
// el proceso entero en Node (desde la v15, unhandledRejection es fatal
// por default) en vez de responderle un error al cliente.
export const ah = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
