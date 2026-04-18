import React from 'react';
import './PaymentLogos.css';

export function DigitelLogo({ size = 'md' }) {
  return (
    <div className={`digitel-logo digitel-logo--${size}`}>
      <img src="/logos/digitel.svg" alt="Digitel" />
    </div>
  );
}

const SVG_LOGOS = {
  cash: (
    <svg viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="32" rx="4" fill="#1a7a3f"/>
      <text x="24" y="21" textAnchor="middle" fontFamily="Georgia,serif" fontSize="13" fontWeight="bold" fill="white">USD</text>
    </svg>
  ),
  zelle: (
    <svg viewBox="0 0 80 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="80" height="32" rx="4" fill="white" stroke="#6D1ED4" strokeWidth="1.5"/>
      <text x="14" y="20" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="900" fill="#6D1ED4">Z</text>
      <text x="48" y="21" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="15" fontWeight="900" fill="#6D1ED4">zelle</text>
    </svg>
  ),
  pagomovil: (
    <svg viewBox="0 0 80 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="80" height="32" rx="4" fill="#E30613"/>
      <text x="47" y="14" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="white">PAGO</text>
      <text x="47" y="24" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="white">MOVIL</text>
    </svg>
  ),
  binance: (
    <svg viewBox="0 0 80 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="80" height="32" rx="4" fill="#1E2026"/>
      <polygon points="10,16 13,13 16,16 13,19" fill="#F0B90B"/>
      <text x="50" y="21" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="800" fill="#F0B90B">Binance</text>
    </svg>
  ),
  card: (
    <svg viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="32" rx="4" fill="#1a1a2e"/>
      <rect x="4" y="8" width="40" height="6" rx="1" fill="#4a9eff" opacity="0.6"/>
      <circle cx="36" cy="22" r="4" fill="#eb001b" opacity="0.8"/>
      <circle cx="41" cy="22" r="4" fill="#f79e1b" opacity="0.8"/>
    </svg>
  ),
};

const CREDIT_LOGOS = {
  Cashea:           'https://cdn.sanity.io/images/wwy5bykm/production/5849e1c8f236b473d7527da16b90782c476d64b2-417x418.jpg',
  'Chollo Crédito': 'https://cdn.sanity.io/images/wwy5bykm/production/132d47544ea71248316f0f17c75efa85854538f4-417x418.jpg',
  Krece:            'https://cdn.sanity.io/images/wwy5bykm/production/b19f7606644ce2531358006b586a1c9c09050e87-417x418.jpg',
  Lysto:            'https://cdn.sanity.io/images/wwy5bykm/production/e586bd893e5247a97d133072a9682021316bb07d-417x418.jpg',
};

const WA_BASE = 'https://wa.me/584123621133?text=';

const PAYMENT_WA_MSGS = {
  cash:      encodeURIComponent('Hola! Quiero pagar en efectivo USD. ¿Cómo procedo?'),
  zelle:     encodeURIComponent('Hola! Quiero pagar por Zelle. ¿Cuál es el correo/número?'),
  pagomovil: encodeURIComponent('Hola! Quiero pagar por Pago Móvil. ¿Cuáles son los datos?'),
  binance:   encodeURIComponent('Hola! Quiero pagar por Binance Pay. ¿Cuál es el ID?'),
  card:      encodeURIComponent('Hola! Quiero pagar con tarjeta débito/crédito. ¿En qué sucursal puedo hacerlo?'),
};

const CREDIT_URLS = {
  Cashea:           'https://play.google.com/store/apps/details?id=com.cashea.app',
  'Chollo Crédito': 'https://chollo.app',
  Krece:            'https://www.krece.app',
  Lysto:            'https://lysto.app',
};

const CREDIT_FALLBACK = {
  Cashea:           { bg: '#F5C300', color: '#000' },
  'Chollo Crédito': { bg: '#0033CC', color: '#fff' },
  Krece:            { bg: '#29C5CC', color: '#000' },
  Lysto:            { bg: '#FF6600', color: '#fff' },
};

export function PaymentLogo({ icon, label }) {
  const src = icon === 'pagomovil' ? '/logos/pagomovil.jpg' : null;
  const waMsg = PAYMENT_WA_MSGS[icon];
  const href = waMsg ? WA_BASE + waMsg : null;

  const card = (
    <div className="payment-logo__card">
      <div className="payment-logo__img">
        {src
          ? <img src={src} alt={label} onError={e => { e.target.style.display = 'none'; }} />
          : SVG_LOGOS[icon] || <span>{label[0]}</span>
        }
      </div>
      <span className="payment-logo__label">{label}</span>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="payment-logo payment-logo--link"
        title={`Consultar pago con ${label}`}
      >
        {card}
      </a>
    );
  }

  return <div className="payment-logo">{card}</div>;
}

export function CreditBadge({ nombre, url }) {
  const imgSrc = CREDIT_LOGOS[nombre];
  const href = CREDIT_URLS[nombre] || url || '#';
  const fallback = CREDIT_FALLBACK[nombre] || { bg: '#333', color: '#fff' };
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="credit-badge credit-badge--img"
      title={nombre}
    >
      {imgSrc ? (
        <img
          src={imgSrc}
          alt={nombre}
          className="credit-badge__logo"
          onError={e => { e.target.style.display = 'none'; }}
        />
      ) : (
        <span style={{ background: fallback.bg, color: fallback.color, padding: '6px 12px', borderRadius: '6px', fontWeight: 700 }}>
          {nombre}
        </span>
      )}
    </a>
  );
}
