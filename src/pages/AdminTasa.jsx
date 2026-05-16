import React, { useState, useEffect } from 'react';
import './AdminTasa.css';

const SANITY_PROJECT = 'wwy5bykm';
const SANITY_DATASET = 'production';
const SANITY_API_V = '2024-01-01';
const SANITY_TOKEN = process.env.REACT_APP_SANITY_TOKEN_READ;

export default function AdminTasa() {
  const [tasa, setTasa]         = useState('');
  const [password, setPassword] = useState('');
  const [tasaActual, setTasaActual] = useState(null);
  const [loading, setLoading]   = useState(false);
  const [msg, setMsg]           = useState(null);

  // Load current rate
  useEffect(() => {
    fetch(
      `https://${SANITY_PROJECT}.api.sanity.io/v${SANITY_API_V}/data/query/${SANITY_DATASET}?query=*[_type=="configuracion"][0]{tasaCambio,labelMoneda}`
    )
      .then(r => r.json())
      .then(d => setTasaActual(d.result?.tasaCambio))
      .catch(() => {});
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);

    try {
      const res = await fetch('/api/admin/update-tasa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tasa, password }),
      });
      const data = await res.json();

      if (data.success) {
        setMsg({ type: 'success', text: `✅ Tasa actualizada a Bs. ${data.tasa} por $1` });
        setTasaActual(data.tasa);
        setTasa('');
        setPassword('');
      } else {
        setMsg({ type: 'error', text: `❌ ${data.error}` });
      }
    } catch (err) {
      setMsg({ type: 'error', text: '❌ Error de conexión' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-tasa">
      <div className="admin-tasa__card">
        <div className="admin-tasa__logo">
          <img src="/logos/nuovocell-logo.png" alt="Nuovocell" />
        </div>

        <h1 className="admin-tasa__title">Tasa de cambio</h1>

        {tasaActual && (
          <div className="admin-tasa__actual">
            <span>Tasa actual:</span>
            <strong>Bs. {tasaActual.toLocaleString('es-VE', { minimumFractionDigits: 2 })} por $1</strong>
          </div>
        )}

        <form className="admin-tasa__form" onSubmit={handleSubmit}>
          <div className="admin-tasa__group">
            <label>Nueva tasa (Bs. por $1)</label>
            <input
              type="number"
              step="0.01"
              min="0"
              placeholder="Ej: 92.50"
              value={tasa}
              onChange={e => setTasa(e.target.value)}
              required
            />
          </div>

          <div className="admin-tasa__group">
            <label>Contraseña</label>
            <input
              type="password"
              placeholder="Contraseña de administrador"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          {msg && (
            <div className={`admin-tasa__msg admin-tasa__msg--${msg.type}`}>
              {msg.text}
            </div>
          )}

          <button
            type="submit"
            className="admin-tasa__btn"
            disabled={loading}
          >
            {loading ? 'Actualizando...' : 'Actualizar tasa'}
          </button>
        </form>

        <p className="admin-tasa__note">
          Al actualizar, todos los precios en la página se convierten automáticamente.
        </p>
      </div>
    </div>
  );
}
