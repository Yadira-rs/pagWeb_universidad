import jwt from "jsonwebtoken";

// Valida el JWT que emite Supabase Auth cuando un admin inicia sesión en
// el panel (#/admin). Lo verificamos localmente con el JWT Secret del
// proyecto en vez de llamarle a Supabase en cada request: así este
// servicio puede seguir aceptando o rechazando peticiones aunque
// Supabase Auth esté lento o caído en ese instante, siempre que el token
// todavía sea válido.
export function requireAuth(req, res, next) {
  const header = req.get("authorization") || "";
  const [scheme, token] = header.split(" ");

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ error: "Falta el header Authorization: Bearer <token>." });
  }

  const secret = process.env.SUPABASE_JWT_SECRET;
  if (!secret) {
    console.error("Falta SUPABASE_JWT_SECRET en el entorno del servicio.");
    return res.status(500).json({ error: "Servicio mal configurado." });
  }

  try {
    const payload = jwt.verify(token, secret, { audience: "authenticated" });
    req.user = { id: payload.sub, email: payload.email };
    next();
  } catch {
    return res.status(401).json({ error: "Token inválido o expirado." });
  }
}
