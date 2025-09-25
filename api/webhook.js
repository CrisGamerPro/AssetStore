export default async function handler(req, res) {
  if (req.method === "POST") {
    const event = req.body;

    // Aquí validas la firma de PayPal (recomendado en producción)
    if (event.event_type === "CHECKOUT.ORDER.APPROVED") {
      console.log("Pago confirmado:", event);

      // Respuesta a PayPal (200 OK obligatorio)
      return res.status(200).send("OK");
    }
  }

  res.status(400).json({ error: "Evento no válido" });
}
