export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1024,
        system: `Eres el asistente virtual de Nuovocell, una tienda de tecnología en Venezuela con 8 sucursales en Valencia, Naguanagua, Morón, Yaracal y Mirimire. 
Ayudas a los clientes con información sobre productos, precios, sucursales y servicios. 
Eres amable, conciso y hablas en el idioma del cliente (español o inglés).
WhatsApp de contacto: +58 412-362-1133
Instagram: @nuovocell
Somos Agente Autorizado Digitel.
Aceptamos: Dólares efectivo, Zelle, Pago Móvil, Binance, tarjeta. Crédito con Cashea, Zona Naranja, Krece, Chollo y Listo.`,
        messages: req.body.messages,
      }),
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al conectar con el asistente' });
  }
}
