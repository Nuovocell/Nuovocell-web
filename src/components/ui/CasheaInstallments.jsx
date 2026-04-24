import React from 'react';
import './CasheaInstallments.css';

// Cashea SPLIT plan: 40% enganche + 3 cuotas de 20%
export function CasheaInstallments({ price, variant = 'compact' }) {
  if (!price || price <= 0) return null;

  const enganche = (price * 0.40).toFixed(0);
  const cuota    = (price * 0.20).toFixed(0);

  if (variant === 'compact') {
    return (
      <div className="cashea-inst cashea-inst--compact">
        <img
          src="https://cdn.sanity.io/images/wwy5bykm/production/5849e1c8f236b473d7527da16b90782c476d64b2-417x418.jpg"
          alt="Cashea"
          className="cashea-inst__logo"
        />
        <span className="cashea-inst__text">
          Paga en 4 cuotas: <strong>${enganche} de enganche</strong> + 3 × ${cuota}
        </span>
      </div>
    );
  }

  // detailed variant — for cart checkout
  return (
    <div className="cashea-inst cashea-inst--detailed">
      <div className="cashea-inst__header">
        <img
          src="https://cdn.sanity.io/images/wwy5bykm/production/5849e1c8f236b473d7527da16b90782c476d64b2-417x418.jpg"
          alt="Cashea"
          className="cashea-inst__logo"
        />
        <span className="cashea-inst__title">Paga con Cashea</span>
      </div>
      <div className="cashea-inst__breakdown">
        <div className="cashea-inst__row cashea-inst__row--highlight">
          <span>Hoy (enganche 40%)</span>
          <strong>${enganche}</strong>
        </div>
        <div className="cashea-inst__row">
          <span>Cuota 1 (mes 1)</span>
          <span>${cuota}</span>
        </div>
        <div className="cashea-inst__row">
          <span>Cuota 2 (mes 2)</span>
          <span>${cuota}</span>
        </div>
        <div className="cashea-inst__row">
          <span>Cuota 3 (mes 3)</span>
          <span>${cuota}</span>
        </div>
      </div>
      <p className="cashea-inst__note">
        * Los montos exactos los confirma Cashea al momento del pago.
      </p>
    </div>
  );
}
