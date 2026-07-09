import { put } from "@vercel/blob";

export default async function handler(request, response) {
  if (request.method !== "POST") {
    return response.status(405).json({ error: "Método no permitido" });
  }

  const { nombre, carrera, generacion, tipo, fileUrl, fileName } = request.body || {};

  if (!nombre || !fileUrl || !fileName) {
    return response.status(400).json({ error: "Faltan datos obligatorios" });
  }

  const record = {
    nombre: String(nombre).slice(0, 200),
    carrera: String(carrera || "").slice(0, 200),
    generacion: String(generacion || "").slice(0, 50),
    tipo: String(tipo || "").slice(0, 100),
    fileUrl: String(fileUrl),
    fileName: String(fileName).slice(0, 300),
    fecha: new Date().toISOString(),
  };

  try {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    await put(`egresados-docs/meta/${id}.json`, JSON.stringify(record), {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: false,
    });

    return response.status(200).json({ ok: true });
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}
