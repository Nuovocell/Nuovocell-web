// Vercel Serverless Function — Cashea Order Cancellation

const { HttpsProxyAgent } = require('https-proxy-agent');

const FIXIE_URL   = process.env.FIXIE_URL || 'http://fixie:kVWcgnRudjBmKUS@criterium.usefixie.com:80';
const PRIVATE_KEY = process.env.CASHEA_PRIVATE_KEY;
const BASE_URL    = process.env.CASHEA_BASE_URL || 'https://external.cashea.app';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://nuovocell.com.ve');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { idNumber } = req.body;
  if (!idNumber) return res.status(400).json({ error: 'idNumber is required' });
  if (!PRIVATE_KEY) return res.status(500).json({ error: 'Cashea private key not configured' });

  const agent = new HttpsProxyAgent(FIXIE_URL);

  try {
    const cancelRes = await fetch(`${BASE_URL}/orders/${idNumber}`, {
      method:  'DELETE',
      headers: { 'Authorization': `ApiKey ${PRIVATE_KEY}` },
      agent,
    });

    if (cancelRes.status === 200) {
      return res.status(200).json({ success: true, idNumber });
    } else {
      return res.status(cancelRes.status).json({ error: `Cancel failed: ${cancelRes.status}` });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}
