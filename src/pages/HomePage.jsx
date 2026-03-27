import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Hero from '../components/sections/Hero';
import ProductCard from '../components/catalog/ProductCard';
import { client, queries } from '../lib/sanity';
import { CATALOGO_SEED, PAGOS, CREDITO, WA_URL, DIGITEL_URL } from '../lib/data';
import { PaymentLogo, CreditBadge, DigitelLogo } from '../components/ui/PaymentLogos';
import '../components/ui/PaymentLogos.css';
import './HomePage.css';

const CATEGORIAS_HOME = [
  { id: 'smartphones', icon: '📱', label: 'Smartphones', color: '#00aaff' },
  { id: 'laptops', icon: '💻', label: 'Laptops', color: '#7c3aed' },
  { id: 'accesorios', icon: '🎧', label: 'Accesorios', color: '#00e676' },
  { id: 'internet', icon: '📶', label: 'Internet Portátil', color: '#ffab00' },
  { id: 'usados', icon: '✅', label: 'Usados Cert.', color: '#06b6d4' },
  { id: 'digitel', icon: '📡', label: 'Digitel', color: '#ff3d57' },
];

export default function HomePage() {
  const { t } = useTranslation();
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    client.fetch(queries.destacados)
      .then(data => setFeatured(data && data.length ? data : CATALOGO_SEED.slice(0, 8)))
      .catch(() => setFeatured(CATALOGO_SEED.slice(0, 8)));
  }, []);

  return (
    <main>
      <Hero />

      {/* Categories */}
      <section className="section home-cats">
        <div className="container">
          <div className="section-label">Explora</div>
          <h2 className="section-title">Categorías</h2>
          <div className="home-cats__grid">
            {CATEGORIAS_HOME.map(cat => (
              <Link
                key={cat.id}
                to={`/catalogo?cat=${cat.id}`}
                className="home-cat-card card"
                style={{ '--cat-color': cat.color }}
              >
                <span className="home-cat-card__icon">{cat.icon}</span>
                <span className="home-cat-card__label">{cat.label}</span>
                <svg className="home-cat-card__arrow" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="section home-featured">
        <div className="container">
          <div className="home-featured__header">
            <div>
              <div className="section-label">Destacados</div>
              <h2 className="section-title">Productos <span>populares</span></h2>
            </div>
            <Link to="/catalogo" className="btn btn-outline">
              Ver todo el catálogo
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
          <div className="home-featured__grid">
            {featured.map(p => <ProductCard key={p._id} product={p} />)}
          </div>
        </div>
      </section>

      {/* Digitel banner */}
      <section className="home-digitel">
        <div className="container home-digitel__inner">
          <div className="home-digitel__content">
            <span className="badge badge-blue">✓ Agente Autorizado</span>
            <DigitelLogo size="lg" />
            <p>Activa tu línea, recarga tu saldo o elige el plan ideal para ti. Atención en todas nuestras sucursales.</p>
            <div className="home-digitel__actions">
              <a
                href={DIGITEL_URL}
                className="btn btn-primary"
                target="_blank" rel="noopener noreferrer"
              >
                Tenemos planes a tu medida
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
              <a
                href={`https://wa.me/584123621133?text=${encodeURIComponent('Hola! Quiero información sobre planes Digitel.')}`}
                className="btn btn-wa"
                target="_blank" rel="noopener noreferrer"
              >
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Consultar por WhatsApp
              </a>
            </div>
          </div>
          <div className="home-digitel__visual">
            <div className="home-digitel__digitel-icon">
              <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" width="180">
                <circle cx="100" cy="100" r="90" fill="#E30613" opacity="0.08"/>
                <circle cx="100" cy="100" r="60" fill="#E30613" opacity="0.12"/>
                <circle cx="100" cy="100" r="30" fill="#E30613" opacity="0.2"/>
                <circle cx="100" cy="100" r="10" fill="#E30613"/>
                {[0,45,90,135,180,225,270,315].map((angle, i) => (
                  <line
                    key={i}
                    x1="100" y1="100"
                    x2={100 + 85 * Math.cos((angle * Math.PI) / 180)}
                    y2={100 + 85 * Math.sin((angle * Math.PI) / 180)}
                    stroke="#E30613" strokeWidth="1.5" opacity="0.3"
                  />
                ))}
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Payments & Credit */}
      <section className="section home-pagos">
        <div className="container">
          <div className="section-label">Facilidades</div>
          <h2 className="section-title">Métodos de <span>pago y crédito</span></h2>
          <div className="home-pagos__grid">
            {PAGOS.map(p => (
              <PaymentLogo key={p.label} icon={p.icon} label={p.label} />
            ))}
          </div>
          <div className="home-credito">
            <p className="home-credito__label">Crédito disponible con:</p>
            <div className="home-credito__tags">
              {CREDITO.map(c => (
                <CreditBadge key={c.nombre} {...c} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services CTA */}
      <section className="section home-services">
        <div className="container">
          <div className="section-label">Servicios</div>
          <h2 className="section-title">Más que una <span>tienda</span></h2>
          <div className="home-services__grid">
            {[
              { icon: '🔧', title: 'Servicio técnico', desc: 'Reparación de pantallas, baterías, software y más. Diagnóstico gratis.', link: '/servicio-tecnico' },
              { icon: '🚚', title: 'Delivery nacional', desc: 'Enviamos tu pedido a cualquier parte de Venezuela de forma segura.', link: null },
              { icon: '📍', title: '8 sucursales', desc: 'Valencia, Naguanagua, Morón, Yaracal y Mirimire. Siempre cerca de ti.', link: '/sucursales' },
              { icon: '🤖', title: 'Asistente IA', desc: 'Consulta disponibilidad, precios y más con nuestro asistente virtual 24/7.', link: null },
            ].map(s => (
              <div key={s.title} className="home-service-card card">
                <span className="home-service-card__icon">{s.icon}</span>
                <h3 className="home-service-card__title">{s.title}</h3>
                <p className="home-service-card__desc">{s.desc}</p>
                {s.link && (
                  <Link to={s.link} className="home-service-card__link">
                    Ver más →
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
