import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Hero from '../components/sections/Hero';
import ProductCard from '../components/catalog/ProductCard';
import { client, queries } from '../lib/sanity';
import { CATALOGO_SEED, PAGOS, CREDITO, WA_URL } from '../lib/data';
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
            <a
              href={`https://wa.me/584123621133?text=${encodeURIComponent('Hola! Quiero información sobre planes Digitel.')}`}
              className="btn btn-primary"
              target="_blank" rel="noopener noreferrer"
            >
              Consultar planes
            </a>
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
