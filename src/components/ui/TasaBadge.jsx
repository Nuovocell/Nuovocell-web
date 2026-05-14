import React from 'react';
import { useTasaStore } from '../../lib/store';
import './TasaBadge.css';

export function TasaBadge() {
  const tasa   = useTasaStore(s => s.tasa);
  const label  = useTasaStore(s => s.label);
  const loaded = useTasaStore(s => s.loaded);

  if (!loaded || !tasa) return null;

  return (
    <div className="tasa-badge" title="Tasa de cambio del día">
      <span className="tasa-badge__icon">💱</span>
      <span className="tasa-badge__text">
        $1 = <strong>{label} {tasa.toLocaleString('es-VE', { minimumFractionDigits: 2 })}</strong>
      </span>
    </div>
  );
}
