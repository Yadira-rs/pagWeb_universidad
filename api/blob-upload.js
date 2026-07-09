import { handleUpload } from "@vercel/blob/client";

const ALLOWED_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export default async function handler(request, response) {
  if (request.method !== "POST") {
    return response.status(405).json({ error: "Método no permitido" });
  }

  try {
    const jsonResponse = await handleUpload({
      body: request.body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        // Todos los archivos de egresados viven bajo este prefijo fijo,
        // sin importar lo que mande el cliente, para no permitir escribir
        // en otra parte del Blob store.
        const safeName = pathname.split("/").pop();
        return {
          allowedContentTypes: ALLOWED_TYPES,
          maximumSizeInBytes: 10 * 1024 * 1024, // 10 MB
          addRandomSuffix: true,
          pathname: `egresados-docs/files/${safeName}`,
        };
      },
    });

    return response.status(200).json(jsonResponse);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
}
