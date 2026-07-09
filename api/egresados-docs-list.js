import { list } from "@vercel/blob";

export default async function handler(request, response) {
  if (request.method !== "POST") {
    return response.status(405).json({ error: "Método no permitido" });
  }

  const { password } = request.body || {};

  if (!process.env.ADMIN_PASSWORD) {
    return response.status(500).json({ error: "ADMIN_PASSWORD no está configurado en el servidor" });
  }

  if (password !== process.env.ADMIN_PASSWORD) {
    return response.status(401).json({ error: "Contraseña incorrecta" });
  }

  try {
    const { blobs } = await list({ prefix: "egresados-docs/meta/" });

    const records = await Promise.all(
      blobs.map(async (blob) => {
        const res = await fetch(blob.url);
        if (!res.ok) return null;
        const data = await res.json();
        return { ...data, id: blob.pathname };
      })
    );

    const docs = records
      .filter(Boolean)
      .sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

    return response.status(200).json({ docs });
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}
