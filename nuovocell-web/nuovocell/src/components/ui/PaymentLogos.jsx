import React from 'react';
import './PaymentLogos.css';

// SVG logos inline — no dependency on external CDN
const LOGOS = {
  cash: (
    <svg viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="32" rx="4" fill="#1a7a3f"/>
      <text x="24" y="21" textAnchor="middle" fontFamily="Georgia,serif" fontSize="13" fontWeight="bold" fill="white">USD</text>
    </svg>
  ),
  zelle: (
    <svg viewBox="0 0 80 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="80" height="32" rx="4" fill="#6D1ED4"/>
      <text x="40" y="21" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="14" fontWeight="900" fill="white" letterSpacing="-0.5">zelle</text>
      <circle cx="12" cy="16" r="8" fill="#white" opacity="0.2"/>
      <text x="12" y="20" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="900" fill="white">Z</text>
    </svg>
  ),
  pagomovil: (
    <svg viewBox="0 0 80 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="80" height="32" rx="4" fill="#E30613"/>
      <text x="40" y="13" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="7" fontWeight="700" fill="white" letterSpacing="0.5">PAGO</text>
      <text x="40" y="24" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="7" fontWeight="700" fill="white" letterSpacing="0.5">MÓVIL</text>
      <rect x="8" y="8" width="16" height="16" rx="3" fill="white" opacity="0.15"/>
      <text x="16" y="20" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="900" fill="white">📱</text>
    </svg>
  ),
  binance: (
    <svg viewBox="0 0 80 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="80" height="32" rx="4" fill="#1E2026"/>
      <polygon points="16,16 19,13 22,16 19,19" fill="#F0B90B"/>
      <polygon points="22,10 28,16 22,22 16,16" fill="#F0B90B" opacity="0.7"/>
      <text x="46" y="21" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="800" fill="#F0B90B">Binance</text>
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

// Digitel logo — brand colors: red #E30613
export function DigitelLogo({ size = 'md' }) {
  return (
    <div className={`digitel-logo digitel-logo--${size}`}>
      <svg viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="0" y="30" fontFamily="Arial,sans-serif" fontSize="28" fontWeight="900" fill="#E30613" letterSpacing="-1">digitel</text>
        <rect x="0" y="33" width="80" height="3" rx="1.5" fill="#E30613"/>
      </svg>
    </div>
  );
}

// Payment method pill with SVG logo
export function PaymentLogo({ icon, label }) {
  return (
    <div className="payment-logo">
      <div className="payment-logo__img">
        {LOGOS[icon] || <span>{label[0]}</span>}
      </div>
      <span className="payment-logo__label">{label}</span>
    </div>
  );
}

// Credit brand pill with brand color
export function CreditBadge({ nombre, color, textColor, url }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="credit-badge"
      style={{ background: color, color: textColor }}
    >
      {nombre}
    </a>
  );
}
