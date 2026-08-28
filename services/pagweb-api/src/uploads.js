import express from "express";
import fs from "node:fs/promises";
import jwt from "jsonwebtoken";
import path from "node:path";
import { ah } from "./asyncHandler.js";
import { requireAuth } from "./auth.js";

// "Buckets" = carpetas en disco, en vez de Supabase Storage. `public:true`
// se sirve como archivo estático (equivalente a getPublicUrl); `public:
// false` solo se descarga con un enlace firmado de corta duración
// (equivalente a createSignedUrl).
const UPLOADS_DIR = process.env.UPLOADS_DIR || "./uploads";
const BUCKETS = {
  "site-media": { public: true, uploadPerm: "auth" },
  "egresados-docs": { public: false, uploadPerm: "public" },
};

function bucketDir(bucket) {
  return path.join(UPLOADS_DIR, bucket);
}

function safeFilename(filename) {
  return typeof filename === "string" && filename.length > 0 && !filename.includes("..") && !filename.includes("/");
}

async function ensureDirs() {
  for (const bucket of Object.keys(BUCKETS)) {
    await fs.mkdir(bucketDir(bucket), { recursive: true });
  }
}
ensureDirs();

export const uploadsRouter = express.Router();

// Sirve los archivos del bucket público directo (equivalente a
// getPublicUrl): en dev, Express los sirve él mismo; en el servidor real,
// Apache puede tomar este mismo path con un Alias y evitarle el trabajo a
// Node (ver DEPLOY.md), sin que el resto del código cambie.
uploadsRouter.use("/site-media", express.static(bucketDir("site-media")));

// Contrato: POST /api/uploads/:bucket/:filename — body: bytes crudos del
// archivo. Según el bucket, requiere sesión o es público (egresados-docs
// acepta subida pública: el formulario "Subir mis documentos" no tiene
// login). Responde { path, publicUrl } (publicUrl solo si el bucket es
// público).
uploadsRouter.post(
  "/:bucket/:filename",
  (req, res, next) => {
    const bucket = BUCKETS[req.params.bucket];
    if (!bucket) return res.status(404).json({ error: "Bucket desconocido." });
    return (bucket.uploadPerm === "public" ? (_r, _s, n) => n() : requireAuth)(req, res, next);
  },
  express.raw({ limit: "15mb", type: () => true }),
  ah(async (req, res) => {
    const { bucket: bucketName, filename } = req.params;
    if (!safeFilename(filename)) return res.status(400).json({ error: "Nombre de archivo inválido." });

    await fs.writeFile(path.join(bucketDir(bucketName), filename), req.body);

    const bucket = BUCKETS[bucketName];
    const publicUrl = bucket.public ? `${req.protocol}://${req.get("host")}/api/uploads/${bucketName}/${filename}` : null;
    res.status(201).json({ path: filename, publicUrl });
  })
);

// Contrato: POST /api/uploads/:bucket/:filename/sign — Bearer JWT.
// Body: { expiresIn? } (segundos, default 60). Responde { signedUrl }.
uploadsRouter.post("/:bucket/:filename/sign", requireAuth, ah(async (req, res) => {
  const { bucket, filename } = req.params;
  if (!BUCKETS[bucket]) return res.status(404).json({ error: "Bucket desconocido." });
  if (!safeFilename(filename)) return res.status(400).json({ error: "Nombre de archivo inválido." });

  const expiresIn = Number(req.body?.expiresIn) || 60;
  const token = jwt.sign({ bucket, filename, purpose: "file_download" }, process.env.JWT_SECRET, {
    expiresIn: `${expiresIn}s`,
  });
  const signedUrl = `${req.protocol}://${req.get("host")}/api/uploads/${bucket}/${filename}/download?token=${token}`;
  res.json({ signedUrl });
}));

// Contrato: GET /api/uploads/:bucket/:filename/download?token=... — el
// enlace que genera /sign. Sin sesión: solo funciona con un token válido
// y no vencido, igual que una signed URL de Supabase Storage.
uploadsRouter.get("/:bucket/:filename/download", async (req, res) => {
  const { bucket, filename } = req.params;
  try {
    const payload = jwt.verify(req.query.token, process.env.JWT_SECRET);
    if (payload.purpose !== "file_download" || payload.bucket !== bucket || payload.filename !== filename) {
      throw new Error("mismatch");
    }
  } catch {
    return res.status(401).json({ error: "Enlace inválido o vencido." });
  }
  res.download(path.join(bucketDir(bucket), filename));
});

// Contrato: DELETE /api/uploads/:bucket — Bearer JWT. Body: { paths: [...] }.
uploadsRouter.delete("/:bucket", requireAuth, async (req, res) => {
  const bucket = req.params.bucket;
  if (!BUCKETS[bucket]) return res.status(404).json({ error: "Bucket desconocido." });
  const paths = Array.isArray(req.body?.paths) ? req.body.paths : [];

  for (const filename of paths) {
    if (!safeFilename(filename)) continue;
    await fs.unlink(path.join(bucketDir(bucket), filename)).catch(() => {});
  }
  res.status(204).end();
});
