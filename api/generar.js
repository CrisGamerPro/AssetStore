import { generarLink } from "./download";

export default async function handler(req, res) {
  const { archivo } = req.query;

  if (!archivo) {
    return res.status(400).json({ error: "Falta archivo" });
  }

  // 🚨 Aquí deberías validar con PayPal que el pago es real
  // Ahora lo simplificamos y siempre genera link
  const link = generarLink(archivo);

  res.status(200).json({ link });
}
