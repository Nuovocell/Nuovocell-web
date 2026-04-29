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
  zinli: (
    <svg viewBox="0 0 80 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="80" height="32" rx="4" fill="#6A0DAD"/>
      <text x="40" y="21" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="14" fontWeight="900" fill="white">Zinli</text>
    </svg>
  ),
  mercantil: (
    <svg viewBox="0 0 80 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="80" height="32" rx="4" fill="#C8102E"/>
      <text x="40" y="14" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="7" fontWeight="700" fill="white">Mercantil</text>
      <text x="40" y="25" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="7" fontWeight="700" fill="white">Panamá</text>
    </svg>
  ),
  banesco: (
    <svg viewBox="0 0 80 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="80" height="32" rx="4" fill="#0033A0"/>
      <text x="40" y="14" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="7" fontWeight="700" fill="white">Banesco</text>
      <text x="40" y="25" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="7" fontWeight="700" fill="white">Panamá</text>
    </svg>
  ),
  transferencia: (
    <svg viewBox="0 0 80 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="80" height="32" rx="4" fill="#1a7a3f"/>
      <text x="40" y="14" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="7" fontWeight="700" fill="white">Transferencia</text>
      <text x="40" y="25" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="7" fontWeight="700" fill="white">Bancaria</text>
    </svg>
  ),
};

const CREDIT_LOGOS = {
  Cashea:           'https://cdn.sanity.io/images/wwy5bykm/production/5849e1c8f236b473d7527da16b90782c476d64b2-417x418.jpg',
  'Chollo': 'https://cdn.sanity.io/images/wwy5bykm/production/132d47544ea71248316f0f17c75efa85854538f4-417x418.jpg',
  Krece:            'https://cdn.sanity.io/images/wwy5bykm/production/b19f7606644ce2531358006b586a1c9c09050e87-417x418.jpg',
  Weppa:            'https://cdn.sanity.io/images/wwy5bykm/production/d57da0aaa9c165ee74849bc3ab20b88c2e7d5f0f-200x80.svg',
};

const WA_BASE = 'https://wa.me/584123621133?text=';

const PAYMENT_WA_MSGS = {
  cash:          encodeURIComponent('Hola! 👋 Estoy interesado en realizar un pago en *Efectivo USD*. ¿Me pueden indicar cómo proceder y en cuál sucursal puedo hacerlo? Gracias.'),
  pagomovil:     encodeURIComponent('Hola! 👋 Quiero realizar un pago por *Pago Móvil*. ¿Me pueden proporcionar los datos bancarios (banco, número de teléfono, cédula y nombre del titular)? Gracias.'),
  zinli:         encodeURIComponent('Hola! 👋 Quiero realizar un pago a través de *Zinli*. ¿Me pueden proporcionar el número de cuenta o usuario de Zinli para realizar la transferencia? Gracias.'),
  mercantil:     encodeURIComponent('Hola! 👋 Quiero realizar un pago por *Mercantil Panamá*. ¿Me pueden indicar los datos de la cuenta (número de cuenta, nombre del titular y banco) para proceder? Gracias.'),
  banesco:       encodeURIComponent('Hola! 👋 Quiero realizar un pago por *Banesco Panamá*. ¿Me pueden indicar los datos de la cuenta (número de cuenta, nombre del titular y banco) para proceder? Gracias.'),
  transferencia: encodeURIComponent('Hola! 👋 Quiero realizar un pago por *Transferencia Bancaria*. ¿Me pueden proporcionar los datos bancarios completos (banco, número de cuenta, nombre del titular y RIF/cédula)? Gracias.'),
  binance:       encodeURIComponent('Hola! 👋 Quiero realizar un pago por *Binance Pay*. ¿Me pueden proporcionar el ID de Binance Pay o el Pay ID para realizar la transferencia? Gracias.'),
  card:          encodeURIComponent('Hola! 👋 Quiero pagar con *tarjeta de débito/crédito*. ¿En cuál de sus sucursales puedo realizar el pago con tarjeta? Gracias.'),
};

const CREDIT_URLS = {
  Cashea:           'https://play.google.com/store/apps/details?id=com.cashea.app',
  'Chollo': 'https://chollo.app',
  Krece:            'https://www.krece.app',
  Weppa:            'https://weppa.app',
};

const CREDIT_FALLBACK = {
  Cashea:           { bg: '#F5C300', color: '#000' },
  'Chollo': { bg: '#0033CC', color: '#fff' },
  Krece:            { bg: '#29C5CC', color: '#000' },
  Weppa:            { bg: '#6C3CE1', color: '#fff' },
};

export function PaymentLogo({ icon, label }) {
  const [isDark, setIsDark] = React.useState(
    document.documentElement.getAttribute('data-theme') !== 'light'
  );
  React.useEffect(() => {
    const obs = new MutationObserver(() => {
      setIsDark(document.documentElement.getAttribute('data-theme') !== 'light');
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => obs.disconnect();
  }, []);
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
      <span className="payment-logo__label" style={{color: isDark ? "rgba(255,255,255,0.9)" : "#111"}}>{label}</span>
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
  const [isDark, setIsDark] = React.useState(
    document.documentElement.getAttribute('data-theme') !== 'light'
  );
  React.useEffect(() => {
    const obs = new MutationObserver(() => {
      setIsDark(document.documentElement.getAttribute('data-theme') !== 'light');
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => obs.disconnect();
  }, []);
  const imgSrc = CREDIT_LOGOS[nombre];
  const href = CREDIT_URLS[nombre] || url || '#';
  const fallback = CREDIT_FALLBACK[nombre] || { bg: '#333', color: '#fff' };
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`credit-badge credit-badge--img${nombre === "Weppa" ? " credit-badge--weppa" : ""}`}
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
      <span className="credit-badge__label" style={{color: isDark ? "rgba(255,255,255,0.9)" : "#111"}}>{nombre}</span>
    </a>
  );
}
