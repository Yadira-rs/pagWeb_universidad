import { timingSafeEqual } from "node:crypto";

// Mecanismo de seguridad servicio-a-servicio: un secreto compartido, no
// una cuenta de usuario. Esta llamada no representa a ninguna persona
// (no hay "usuario" en una notificación interna), así que reutilizar el
// JWT de Supabase Auth no aplicaría — por eso aquí el mecanismo es
// distinto al de Admisiones API↔Frontend (Bearer JWT de usuario).
function tokensMatch(a, b) {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  // Longitud distinta ya delata que no coinciden; comparar solo cuando
  // miden lo mismo evita filtrar esa longitud por temporización.
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export function requireServiceToken(req, res, next) {
  const token = req.get("x-service-token");
  const expected = process.env.SERVICE_TOKEN;

  if (!expected) {
    console.error("Falta SERVICE_TOKEN en el entorno del servicio.");
    return res.status(500).json({ error: "Servicio mal configurado." });
  }

  if (!token || !tokensMatch(token, expected)) {
    return res.status(401).json({ error: "Falta o es inválido el header X-Service-Token." });
  }

  next();
}
