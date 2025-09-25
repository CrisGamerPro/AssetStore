export default async function handler(req, res) {
  const { orderId } = req.query;

  // Validar con la API de PayPal que este orderId fue pagado realmente
  // (para simplificar, aquí no hago la validación completa)
  if (orderId) {
    return res.redirect("/descargas/espada.rbxm");
  }

  return res.status(403).json({ error: "No autorizado" });
}
