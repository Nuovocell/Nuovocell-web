import React from 'react';
import './PaymentLogos.css';

// ─── Digitel Logo ──────────────────────────────────────────────────────────────────────────

export function DigitelLogo({ size = 'md' }) {
  return (
    <div className={`digitel-logo digitel-logo--${size}`}>
      <img
        src="/logos/digitel.svg"
        alt="Digitel"
        onError={e => {
          e.target.replaceWith(
            Object.assign(document.createElementNS('http://www.w3.org/2000/svg', 'svg'), {
              innerHTML: `<text x="0" y="30" font-family="Arial,sans-serif" font-size="28" font-weight="900" fill="#E30613" letter-spacing="-1">digitel</text><rect x="0" y="33" width="80" height="3" rx="1.5" fill="#E30613"/>`,
            })
          );
        }}
      />
    </div>
  );
}

// ─── SVG Fallbacks ──────────────────────────────────────────────────────────────────────────

const SVG_LOGOS = {
  cash: (
    <svg viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="32" rx="4" fill="#1a7a3f"/>
      <text x="24" y="21" textAnchor="middle" fontFamily="Georgia,serif" fontSize="13" fontWeight="bold" fill="white">USD</text>
    </svg>
  ),
  zelle: (
    <svg viewBox="0 0 80 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="80" height="32" rx="4" fill="#6D1ED4"/>
      <circle cx="14" cy="16" r="8" fill="white" opacity="0.15"/>
      <text x="14" y="20" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="900" fill="white">Z</text>
      <text x="48" y="21" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="15" fontWeight="900" fill="white">zelle</text>
    </svg>
  ),
  pagomovil: (
    <svg viewBox="0 0 80 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="80" height="32" rx="4" fill="#E30613"/>
      <rect x="6" y="6" width="18" height="20" rx="3" fill="white" opacity="0.2"/>
      <text x="47" y="14" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="white" letterSpacing="0.5">PAGO</text>
      <text x="47" y="24" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="white" letterSpacing="0.5">MÓVIL</text>
    </svg>
  ),
  binance: (
    <svg viewBox="0 0 80 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="80" height="32" rx="4" fill="#1E2026"/>
      <polygon points="10,16 13,13 16,16 13,19" fill="#F0B90B"/>
      <polygon points="16,10 22,16 16,22 10,16" fill="#F0B90B" opacity="0.6"/>
      <text x="50" y="21" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="800" fill="#F0B90B">Binance</text>
    </svg>
  ),
  card: (
    <svg viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="32" rx="4" fill="#1a1a2e"/>
      <rect x="4" y="8" width="40" height="6" rx="1" fill="#4a9eff" opacity="0.6"/>
      <rect x="4" y="20" width="12" height="4" rx="1" fill="#fff" opacity="0.4"/>
      <rect x="18" y="20" width="8" height="4" rx="1" fill="#fff" opacity="0.4"/>
      <circle cx="36" cy="22" r="4" fill="#eb001b" opacity="0.8"/>
      <circle cx="41" cy="22" r="4" fill="#f79e1b" opacity="0.8"/>
    </svg>
  ),
};

// ─── PaymentLogo ──────────────────────────────────────────────────────────────────────────

const IMG_MAP = {
  pagomovil: '/logos/pagomovil.jpg',
};

export function PaymentLogo({ icon, label }) {
  const src = IMG_MAP[icon];
  return (
    <div className="payment-logo">
      <div className="payment-logo__img">
        {src ? (
          <img
            src={src}
            alt={label}
            onError={e => { e.target.style.display = 'none'; }}
          />
        ) : (
          SVG_LOGOS[icon] || <span>{label[0]}</span>
        )}
      </div>
      <span className="payment-logo__label">{label}</span>
    </div>
  );
}

// ─── CreditBadge ──────────────────────────────────────────────────────────────────────────

const CREDIT_IMG_MAP = {
  'Cashea':       '/logos/cashea.png',
  'Zona Naranja': '/logos/zona-naranja.png',
  'Krece':        '/logos/krece.jpg',
  'Chollo':       '/logos/chollo.webp',
  'Listo':        '/logos/lysto.png',
};

const CREDIT_URLS = {
  'Cashea':       'https://www.cashea.app',
  'Zona Naranja': 'https://www.zonanaranja.com.ve',
  'Krece':        'https://www.krece.app',
  'Chollo':       'https://www.chollo.com.ve',
  'Listo':        'https://www.lysto.com.ve',
};

export function CreditBadge({ nombre, color, textColor, url }) {
  const src = CREDIT_IMG_MAP[nombre];
  const href = CREDIT_URLS[nombre] || url || '#';

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`credit-badge${src ? ' credit-badge--img' : ''}`}
      style={src ? {} : { background: color, color: textColor }}
    >
      {src ? (
        <img
          src={src}
          alt={nombre}
          className="credit-badge__img"
          onError={e => {
            const parent = e.target.parentNode;
            parent.classList.remove('credit-badge--img');
            parent.style.background = color;
            parent.style.color = textColor;
            parent.innerHTML = nombre;
          }}
        />
      ) : (
        nombre
      )}
    </a>
  );
}
