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
                                                      <rect width="80" height="32" rx="4" fill="#6D1ED4"/>
                                                            <text x="14" y="20" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="900" fill="white">Z</text>
                                                                  <text x="48" y="21" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="15" fontWeight="900" fill="white">zelle</text>
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

                                                                                                                                                                        const CREDIT_IMG_MAP = {
                                                                                                                                                                          Cashea: '/logos/cashea.png',
                                                                                                                                                                            'Zona Naranja': '/logos/zona-naranja.svg',
                                                                                                                                                                              Krece: '/logos/krece.svg',
                                                                                                                                                                                Chollo: '/logos/chollo.webp',
                                                                                                                                                                                  Lysto: '/logos/lysto.webp',
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
                                                                                                                                                                                    Cashea: 'https://play.google.com/store/apps/details?id=com.cashea.app',
                                                                                                                                                                                      'Zona Naranja': 'https://tuzonanaranja.com',
                                                                                                                                                                                        Krece: 'https://www.krece.app',
                                                                                                                                                                                          Chollo: 'https://chollo.app',
                                                                                                                                                                                            Lysto: 'https://lysto.app',
                                                                                                                                                                                            };

                                                                                                                                                                                            const CREDIT_FALLBACK = {
                                                                                                                                                                                              Cashea: { bg: '#F5C300', color: '#000' },
                                                                                                                                                                                                'Zona Naranja': { bg: '#FF6B00', color: '#fff' },
                                                                                                                                                                                                  Krece: { bg: '#29C5CC', color: '#fff' },
                                                                                                                                                                                                    Chollo: { bg: '#111', color: '#fff' },
                                                                                                                                                                                                      Lysto: { bg: '#0057FF', color: '#fff' },
                                                                                                                                                                                                      };

                                                                                                                                                                                                      export function PaymentLogo({ icon, label }) {
  const src = icon === 'pagomovil' ? '/logos/pagomovil.jpg' : null;
  const waMsg = PAYMENT_WA_MSGS[icon];
  const href = waMsg ? WA_BASE + waMsg : null;

  const inner = (
    <>
      <div className="payment-logo__img">
        {src
          ? <img src={src} alt={label} onError={e => { e.target.style.display = 'none'; }} />
          : SVG_LOGOS[icon] || <span>{label[0]}</span>
        }
      </div>
      <span className="payment-logo__label">{label}</span>
    </>
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
        {inner}
      </a>
    );
  }

  return <div className="payment-logo">{inner}</div>;
}

export function CreditBadge({ nombre, url }) {
                                                                                                                                                                                                                                                                            const src = CREDIT_IMG_MAP[nombre];
                                                                                                                                                                                                                                                                              const href = CREDIT_URLS[nombre] || url || '#';
                                                                                                                                                                                                                                                                                const fallback = CREDIT_FALLBACK[nombre] || { bg: '#333', color: '#fff' };
                                                                                                                                                                                                                                                                                  return (
                                                                                                                                                                                                                                                                                      <a
                                                                                                                                                                                                                                                                                            href={href}
                                                                                                                                                                                                                                                                                                  target="_blank"
                                                                                                                                                                                                                                                                                                        rel="noopener noreferrer"
                                                                                                                                                                                                                                                                                                              className="credit-badge credit-badge--img"
                                                                                                                                                                                                                                                                                                                  >
                                                                                                                                                                                                                                                                                                                        {src ? (
                                                                                                                                                                                                                                                                                                                                <img
                                                                                                                                                                                                                                                                                                                                          src={src}
                                                                                                                                                                                                                                                                                                                                                    alt={nombre}
                                                                                                                                                                                                                                                                                                                                                              className="credit-badge__img"
                                                                                                                                                                                                                                                                                                                                                                        onError={e => {
                                                                                                                                                                                                                                                                                                                                                                                    const p = e.target.parentNode;
                                                                                                                                                                                                                                                                                                                                                                                                p.style.background = fallback.bg;
                                                                                                                                                                                                                                                                                                                                                                                                            p.style.color = fallback.color;
                                                                                                                                                                                                                                                                                                                                                                                                                        p.innerHTML = nombre;
                                                                                                                                                                                                                                                                                                                                                                                                                                  }}
                                                                                                                                                                                                                                                                                                                                                                                                                                          />
                                                                                                                                                                                                                                                                                                                                                                                                                                                ) : (
                                                                                                                                                                                                                                                                                                                                                                                                                                                        <span style={{ color: fallback.color }}>{nombre}</span>
                                                                                                                                                                                                                                                                                                                                                                                                                                                              )}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                  </a>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                    );
                                                                                                                                                                                                                                                                                                                                                                                                                                                                    }
