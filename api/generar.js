import { generarLink } from "./download";

export default async function handler(req, res) {
  const { archivo } = req.query;

  if (!archivo) {
    return res.status(400).json({ error: "Falta archivo" });
  }

  // Obtener la URL base automáticamente
  const protocol = req.headers["x-forwarded-proto"] || "https";
  const host = req.headers.host;
  const baseUrl = `${protocol}://${host}`;

  const link = generarLink(archivo, baseUrl);

  res.status(200).json({ link });
}
