import React from 'react';
import './PaymentLogos.css';

// ─── Digitel Logo ──────────────────────────────────────────────────────────────
export function DigitelLogo({ size = 'md' }) {
    return (
          <div className={`digitel-logo digitel-logo--${size}`}>
                  <img
                            src="/logos/digitel.svg"
                            alt="Digitel"
                            onError={e => {
                                        e.target.replaceWith(Object.assign(document.createElementNS('http://www.w3.org/2000/svg','svg'),{
                                                      viewBox:'0 0 120 40',innerHTML:'<text x="0" y="30" font-family="Arial,sans-serif" font-size="28" font-weight="900" fill="#E30613">digitel</text><rect x="0" y="33" width="80" height="3" rx="1.5" fill="#E30613"/>'
                                        }));
                            }}
                          />
          </div>div>
        );
}

// ─── SVG Fallbacks para pagos ──────────────────────────────────────────────────
const SVG_LOGOS = {
    cash: (
          <svg viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="48" height="32" rx="4" fill="#1a7a3f"/>
                <text x="24" y="21" textAnchor="middle" fontFamily="Georgia,serif" fontSize="13" fontWeight="bold" fill="white">USD</text>text>
          </svg>svg>
        ),
    zelle: (
          <svg viewBox="0 0 80 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="80" height="32" rx="4" fill="#6D1ED4"/>
                <circle cx="14" cy="16" r="8" fill="white" opacity="0.15"/>
                <text x="14" y="20" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="900" fill="white">Z</text>text>
                <text x="48" y="21" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="15" fontWeight="900" fill="white">zelle</text>text>
          </svg>svg>
        ),
    pagomovil: (
          <svg viewBox="0 0 80 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="80" height="32" rx="4" fill="#E30613"/>
                <rect x="6" y="6" width="18" height="20" rx="3" fill="white" opacity="0.2"/>
                <text x="47" y="14" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="white" letterSpacing="0.5">PAGO</text>text>
                <text x="47" y="24" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="700" fill="white" letterSpacing="0.5">MOVIL</text>text>
          </svg>svg>
        ),
    binance: (
          <svg viewBox="0 0 80 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="80" height="32" rx="4" fill="#1E2026"/>
                <polygon points="10,16 13,13 16,16 13,19" fill="#F0B90B"/>
                <polygon points="16,10 22,16 16,22 10,16" fill="#F0B90B" opacity="0.6"/>
                <text x="50" y="21" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="800" fill="#F0B90B">Binance</text>text>
          </svg>svg>
        ),
    card: (
          <svg viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="48" height="32" rx="4" fill="#1a1a2e"/>
                <rect x="4" y="8" width="40" height="6" rx="1" fill="#4a9eff" opacity="0.6"/>
                <rect x="4" y="20" width="12" height="4" rx="1" fill="#fff" opacity="0.4"/>
                <rect x="18" y="20" width="8" height="4" rx="1" fill="#fff" opacity="0.4"/>
                <circle cx="36" cy="22" r="4" fill="#eb001b" opacity="0.8"/>
                <circle cx="41" cy="22" r="4" fill="#f79e1b" opacity="0.8"/>
          </svg>svg>
        ),
};

// ─── SVGs de crédito (estilo dark acordes a la web) ───────────────────────────
const CREDIT_SVGS = {
    Cashea: (
          <svg viewBox="0 0 120 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="120" height="48" rx="8" fill="#F5C300"/>
                <rect x="8" y="8" width="32" height="32" rx="6" fill="#000" opacity="0.15"/>
                <text x="24" y="30" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="20" fontWeight="900" fill="#000">C</text>text>
                <text x="78" y="30" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="16" fontWeight="800" fill="#000">cashea</text>text>
          </svg>svg>
        ),
    'Zona Naranja': (
          <svg viewBox="0 0 140 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="140" height="48" rx="8" fill="#FF6B00"/>
                <ellipse cx="20" cy="24" rx="10" ry="13" fill="none" stroke="white" strokeWidth="2.5"/>
                <line x1="10" y1="24" x2="30" y2="24" stroke="white" strokeWidth="2"/>
                <line x1="13" y1="15" x2="27" y2="33" stroke="white" strokeWidth="1.5"/>
                <line x1="13" y1="33" x2="27" y2="15" stroke="white" strokeWidth="1.5"/>
                <text x="84" y="20" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="white">TU ZONA</text>text>
                <text x="84" y="35" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="900" fill="white">NARANJA</text>text>
          </svg>svg>
        ),
    Krece: (
          <svg viewBox="0 0 120 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="120" height="48" rx="8" fill="#29B6C8"/>
                <rect x="8" y="8" width="32" height="32" rx="6" fill="white" opacity="0.2"/>
                <text x="24" y="31" textAnchor="middle" fontFamily="Arial Black,sans-serif" fontSize="18" fontWeight="900" fill="white">K</text>text>
                <text x="78" y="30" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="16" fontWeight="800" fill="white">krece</text>text>
          </svg>svg>
        ),
    Chollo: (
          <svg viewBox="0 0 120 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="120" height="48" rx="8" fill="#111"/>
                <text x="54" y="30" textAnchor="middle" fontFamily="Arial Black,sans-serif" fontSize="16" fontWeight="900" fill="white">Chollo</text>text>
                <text x="98" y="22" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="18" fontWeight="900" fill="#00C853">*</text>text>
          </svg>svg>
        ),
    Listo: (
          <svg viewBox="0 0 120 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="120" height="48" rx="8" fill="#0057FF"/>
                <rect x="8" y="12" width="28" height="24" rx="5" fill="white" opacity="0.15"/>
                <text x="22" y="30" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="14" fontWeight="900" fill="white">✓</text>text>
                <text x="78" y="30" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="16" fontWeight="800" fill="white">listo</text>text>
          </svg>svg>
        ),
};

const CREDIT_URLS = {
    'Cashea':       'https://www.cashea.app',
    'Zona Naranja': 'https://www.zonanaranja.com.ve',
    'Krece':        'https://www.krece.app',
    'Chollo':       'https://www.chollo.com.ve',
    'Listo':        'https://www.lysto.com.ve',
};

// ─── PaymentLogo ──────────────────────────────────────────────────────────────
export function PaymentLogo({ icon, label }) {
    const src = icon === 'pagomovil' ? '/logos/pagomovil.jpg' : null;
    return (
          <div className="payment-logo">
                <div className="payment-logo__img">
                  {src
                              ? <img src={src} alt={label} onError={e => { e.target.style.display='none'; }} />
                              : SVG_LOGOS[icon] || <span>{label[0]}</span>span>
                  }
                </div>div>
                <span className="payment-logo__label">{label}</span>span>
          </div>div>
        );
}

// ─── CreditBadge ──────────────────────────────────────────────────────────────
export function CreditBadge({ nombre, color, textColor, url }) {
    const svgIcon = CREDIT_SVGS[nombre];
    const href    = CREDIT_URLS[nombre] || url || '#';
    return (
          <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="credit-badge credit-badge--svg"
                  aria-label={nombre}
                >
            {svgIcon || <span style={{ color: textColor }}>{nombre}</span>span>}
          </a>a>
        );
}</svg>
