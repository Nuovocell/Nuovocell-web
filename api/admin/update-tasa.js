const TOKEN = process.env.SANITY_TOKEN;
const PROJECT_ID = 'wwy5bykm';
const DATASET = 'production';
const API_V = '2024-01-01';

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // Simple password protection
  const { tasa, password } = req.body || {};
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'nuovocell2024';

  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Contraseña incorrecta' });
  }

  if (!tasa || isNaN(parseFloat(tasa)) || parseFloat(tasa) <= 0) {
    return res.status(400).json({ error: 'Tasa inválida' });
  }

  if (!TOKEN) {
    return res.status(500).json({ error: 'Token de Sanity no configurado' });
  }

  const mutations = [{
    createOrReplace: {
      _id: 'configuracion-principal',
      _type: 'configuracion',
      tasaCambio: parseFloat(tasa),
      mostrarBs: true,
      labelMoneda: 'Bs.',
    }
  }];

  const r = await fetch(
    `https://${PROJECT_ID}.api.sanity.io/v${API_V}/data/mutate/${DATASET}`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mutations }),
    }
  );

  const data = await r.json();

  if (r.ok) {
    console.log(`[Tasa] Actualizada a Bs. ${tasa}`);
    return res.status(200).json({ success: true, tasa: parseFloat(tasa) });
  } else {
    console.error('[Tasa] Error:', data);
    return res.status(500).json({ error: 'Error al actualizar en Sanity' });
  }
};
