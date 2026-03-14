import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SUCURSALES } from '../lib/data';
import './SucursalesPage.css';

const PinIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);

const ClockIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
  </svg>
);

const WAIcon = () => (
  <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function SucursalesPage() {
  const { t } = useTranslation();
  const [activeCity, setActiveCity] = useState('todas');

  const cities = ['todas', ...new Set(SUCURSALES.map(s => s.ciudad))];

  const filtered = activeCity === 'todas'
    ? SUCURSALES
    : SUCURSALES.filter(s => s.ciudad === activeCity);

  return (
    <main className="suc-page">
      <div className="container">
        {/* Header */}
        <div className="suc-page__header">
          <div className="section-label">{t('sucursales.title')}</div>
          <h1 className="section-title">
            Nuestras <span>sucursales</span>
          </h1>
          <p className="suc-page__sub">
            8 puntos de venta en Venezuela. Visítanos y encuentra el equipo ideal.
          </p>
        </div>

        {/* City filter */}
        <div className="suc-page__filters">
          {cities.map(city => (
            <button
              key={city}
              className={`catalog-page__cat${activeCity === city ? ' active' : ''}`}
              onClick={() => setActiveCity(city)}
            >
              {city === 'todas' ? 'Todas las ciudades' : city}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="suc-page__grid">
          {filtered.map((suc, i) => (
            <SucursalCard key={suc._id} suc={suc} index={i} t={t} />
          ))}
        </div>

        {/* Contact CTA */}
        <div className="suc-page__cta">
          <p>¿Necesitas más información sobre alguna sucursal?</p>
          <a
            href={`https://wa.me/584123621133?text=${encodeURIComponent('Hola! Quiero información sobre sus sucursales.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-wa"
          >
            <WAIcon />
            Consultar por WhatsApp
          </a>
        </div>
      </div>
    </main>
  );
}

function SucursalCard({ suc, index, t }) {
  const mapsUrl = suc.coordenadas?.lat
    ? `https://maps.google.com/?q=${suc.coordenadas.lat},${suc.coordenadas.lng}`
    : `https://maps.google.com/?q=${encodeURIComponent(suc.direccion + ' ' + suc.ciudad + ' Venezuela')}`;

  const waMsg = encodeURIComponent(`Hola! Quiero información sobre la sucursal ${suc.nombre}.`);

  return (
    <div className="suc-card card" style={{ animationDelay: `${index * 0.05}s` }}>
      {/* Header */}
      <div className="suc-card__header">
        <div>
          <p className="suc-card__ciudad">{suc.ciudad}</p>
          <h3 className="suc-card__nombre">{suc.nombre}</h3>
        </div>
        {suc.esDigitel && (
          <span className="badge badge-blue suc-card__digitel">Digitel</span>
        )}
      </div>

      {/* Address */}
      <div className="suc-card__info">
        <div className="suc-card__info-row">
          <PinIcon />
          <p>{suc.direccion}</p>
        </div>
        <div className="suc-card__info-row suc-card__info-row--horario">
          <ClockIcon />
          <div className="suc-card__horario">
            {suc.horario.map((h, i) => (
              <div key={i} className="suc-card__horario-row">
                <span className="suc-card__dias">{h.dias}</span>
                <span className="suc-card__horas">{h.horas}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="suc-card__actions">
        <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline suc-card__btn">
          <PinIcon />
          {t('sucursales.como_llegar')}
        </a>
        <a
          href={`https://wa.me/${suc.whatsapp.replace(/\D/g,'')}?text=${waMsg}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-wa suc-card__btn"
        >
          <WAIcon />
          WhatsApp
        </a>
      </div>
    </div>
  );
}
