import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { client, queries, urlFor } from '../../lib/sanity';
import { WA_URL, DIGITEL_URL } from '../../lib/data';
import './Hero.css';

const WAIcon = () => (
  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const TRUST_ITEMS = [
  {
    key: 'digitel',
    icon: (
      <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M1 6l5 6-5 6M8 6h8M8 12h6M8 18h8"/>
      </svg>
    ),
  },
  {
    key: 'envios',
    icon: (
      <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <rect x="1" y="3" width="15" height="13"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
  },
  {
    key: 'garantia',
    icon: (
      <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    key: 'credito',
    icon: (
      <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>
      </svg>
    ),
  },
  {
    key: 'pagos',
    icon: (
      <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
      </svg>
    ),
  },
];

export default function Hero() {
  const { t } = useTranslation();
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    client.fetch(queries.destacados)
      .then(data => { if (data && data.length) setFeatured(data); })
      .catch(() => {});
  }, []);

  return (
    <section className="hero">
      {/* Background effects */}
      <div className="hero__bg">
        <div className="hero__glow hero__glow--1" />
        <div className="hero__glow hero__glow--2" />
        <div className="hero__grid" />
      </div>

      <div className="hero__inner container">
        <div className="hero__content">
          {/* Badge Agente Autorizado — con logotema Digitel segun guia de marca */}
          <a href={DIGITEL_URL} target="_blank" rel="noopener noreferrer" className="hero__digitel-badge">
            <div className="hero__digitel-logotema">
              <span className="hero__digitel-agente">Agente Autorizado</span>
              <span className="hero__digitel-nombre">DIGITEL</span>
            </div>
          </a>

          {/* Title */}
          <h1 className="hero__title">
            <span className="hero__title-line">{t('hero.title1')}</span>
            <span className="hero__title-line hero__title-blue">{t('hero.title2')}</span>
          </h1>

          {/* Subtitle */}
          <p className="hero__sub">{t('hero.sub')}</p>

          {/* CTAs */}
          <div className="hero__ctas">
            <Link to="/catalogo" className="btn btn-primary hero__cta-main">
              {t('hero.cta_catalog')}
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn btn-wa">
              <WAIcon />
              {t('hero.cta_wa')}
            </a>
          </div>

          {/* Trust bar — chips/etiquetas con iconos SVG (Lai) */}
          <div className="hero__trust">
            {TRUST_ITEMS.map(item => (
              <div key={item.key} className="hero__trust-chip">
                <span className="hero__trust-icon">{item.icon}</span>
                <span>{t(`trust.${item.key}`)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — product image grid with 3D hover */}
        <div className="hero__visual" aria-hidden="false">
          <div className="hero__phone-grid">
            {featured.slice(0, 6).map((p, i) => (
              <Link
                key={p._id}
                to="/catalogo"
                className="hero__phone-card"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {p.imagen ? (
                  <div className="hero__phone-icon hero__phone-icon--img">
                    <img
                      src={p.imagen ? urlFor(p.imagen).width(120).height(120).fit('contain').url() : ''}
                      alt={p.nombre}
                    />
                  </div>
                ) : (
                  <div className="hero__phone-icon">
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2"/>
                    </svg>
                  </div>
                )}
                <div className="hero__phone-brand">{p.marca || ''}</div>
                <div className="hero__phone-name">{p.nombre}</div>
                {p.precio && <div className="hero__phone-price">${p.precio}</div>}
              </Link>
            ))}
          </div>
          <div className="hero__sucursales-badge">
            <span className="hero__suc-num">8</span>
            <span className="hero__suc-label" style={{color:'#FCFCFC'}}>SUCURSALES<br/>EN VENEZUELA</span>
          </div>
        </div>
      </div>
    </section>
  );
}
