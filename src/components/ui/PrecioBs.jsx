import React from 'react';
import { useTasaStore } from '../../lib/store';
import './PrecioBs.css';

export function PrecioBs({ precioUSD, className = '' }) {
  const tasa      = useTasaStore(s => s.tasa);
  const mostrarBs = useTasaStore(s => s.mostrarBs);
  const label     = useTasaStore(s => s.label);

  if (!mostrarBs || !tasa || !precioUSD) return null;

  const bs = (precioUSD * tasa).toLocaleString('es-VE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <span className={`precio-bs ${className}`}>
      {label} {bs}
    </span>
  );
}
