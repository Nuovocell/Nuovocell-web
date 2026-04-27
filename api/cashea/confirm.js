const { HttpsProxyAgent } = require('https-proxy-agent');

const FIXIE_URL   = process.env.FIXIE_URL;
const PRIVATE_KEY = process.env.PRIVATE_API_KEY;
const BASE_URL    = 'https://external.cashea.app';
const STORE_ID    = parseInt(process.env.Store_ID || '34981');
const STORE_NAME  = process.env.Store_Name || 'Web Nuovocell';
const EXT_CLIENT  = process.env.External_Client_ID || '3279';

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { idNumber } = req.body || {};
  if (!idNumber) return res.status(400).json({ error: 'idNumber is required' });
  if (!PRIVATE_KEY) return res.status(500).json({ error: 'Cashea private key not configured' });

  const headers = {
    'Authorization': `ApiKey ${PRIVATE_KEY}`,
    'Content-Type': 'application/json'
  };

  const agent = FIXIE_URL ? new HttpsProxyAgent(FIXIE_URL) : undefined;
  const fetchOpts = agent ? { headers, agent } : { headers };

  try {
    const orderRes = await fetch(`${BASE_URL}/orders/${idNumber}`, fetchOpts);

    if (!orderRes.ok) {
      const err = await orderRes.text();
      console.error(`[Cashea] GET failed: ${orderRes.status} ${err}`);
      return res.status(orderRes.status).json({ error: `Order not found: ${orderRes.status}` });
    }

    const order = await orderRes.json();
    const downPayment = parseFloat(order.orderDetails?.downPayment);

    if (!downPayment || isNaN(downPayment)) {
      return res.status(422).json({ error: 'Invalid downPayment amount' });
    }

    const confirmRes = await fetch(`${BASE_URL}/orders/${idNumber}/down-payment`, {
      ...fetchOpts,
      method: 'POST',
      body: JSON.stringify({ amount: downPayment }),
    });

    if (confirmRes.status === 201) {
      return res.status(200).json({ success: true, idNumber, downPayment, invoiceId: order.invoiceId || null });
    } else {
      const errBody = await confirmRes.text();
      return res.status(confirmRes.status).json({ error: `Confirmation failed: ${confirmRes.status}`, detail: errBody });
    }

  } catch (err) {
    console.error('[Cashea] Error:', err.message);
    return res.status(500).json({ error: 'Internal server error', detail: err.message });
  }
};
