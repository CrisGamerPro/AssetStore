import path from "path";
import { promises as fs } from "fs";

// Aquí guardamos tokens en memoria (simple). Reinicia en cada despliegue.
let tokens = {};

// Endpoint principal
export default async function handler(req, res) {
  const { token } = req.query;

  const entry = tokens[token];
  if (!entry) {
    return res.status(403).json({ error: "Token inválido o expirado" });
  }

  if (Date.now() > entry.expira) {
    delete tokens[token];
    return res.status(403).json({ error: "El link ha expirado" });
  }

  try {
    const filePath = path.join(process.cwd(), "private-assets", entry.archivo);
    const data = await fs.readFile(filePath);

    res.setHeader("Content-Disposition", `attachment; filename=${entry.archivo}`);
    res.setHeader("Content-Type", "application/octet-stream");
    res.send(data);

    // Borra token después de usarlo (opcional)
    delete tokens[token];
  } catch (e) {
    res.status(500).json({ error: "Error al enviar archivo" });
  }
}

// 👉 función auxiliar que otros endpoints pueden usar
export function generarLink(archivo, baseUrl) {
  const token = Math.random().toString(36).substring(2, 12);
  tokens[token] = {
    archivo,
    expira: Date.now() + 5 * 60 * 1000 // 5 minutos
  };
  return `${baseUrl}/api/download?token=${token}`;
}
