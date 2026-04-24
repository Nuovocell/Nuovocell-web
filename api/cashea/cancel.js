// Vercel Serverless Function — Cashea Order Cancellation
// Called when user abandons checkout or order needs to be cancelled
// Test orders MUST be cancelled per Cashea guidelines

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://nuovocell.com.ve');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { idNumber } = req.body;
  if (!idNumber) return res.status(400).json({ error: 'idNumber is required' });

  const PRIVATE_KEY = process.env.CASHEA_PRIVATE_KEY;
  const BASE_URL    = process.env.CASHEA_BASE_URL || 'https://external.cashea.app';

  if (!PRIVATE_KEY) return res.status(500).json({ error: 'Cashea private key not configured' });

  try {
    const cancelRes = await fetch(`${BASE_URL}/orders/${idNumber}`, {
      method: 'DELETE',
      headers: { 'Authorization': `ApiKey ${PRIVATE_KEY}` },
    });

    if (cancelRes.status === 200) {
      console.log(`[Cashea] Order ${idNumber} cancelled`);
      return res.status(200).json({ success: true, idNumber });
    } else {
      const errBody = await cancelRes.text();
      console.error(`[Cashea] DELETE failed: ${cancelRes.status} ${errBody}`);
      return res.status(cancelRes.status).json({ error: `Cancel failed: ${cancelRes.status}` });
    }

  } catch (err) {
    console.error('[Cashea] Cancel error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
