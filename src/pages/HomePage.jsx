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

/* ── Iconos SVG consistentes (Lucide-style stroke) ── */
const IconSmartphone = () => (
  <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
  </svg>
);
const IconLaptop = () => (
  <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M20 16V7a2 2 0 00-2-2H6a2 2 0 00-2 2v9m16 0H4m16 0l1.28 2.55A1 1 0 0120.37 20H3.63a1 1 0 01-.91-1.45L4 16"/>
  </svg>
);
const IconHeadphones = () => (
  <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M3 18v-6a9 9 0 0118 0v6"/><path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"/>
  </svg>
);
const IconWifi = () => (
  <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M5 12.55a11 11 0 0114.08 0M1.42 9a16 16 0 0121.16 0M8.53 16.11a6 6 0 016.95 0"/><circle cx="12" cy="20" r="1" fill="currentColor"/>
  </svg>
);
const IconBadgeCheck = () => (
  <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/><polyline points="9 12 11 14 15 10"/>
  </svg>
);
const IconDigitel4G = () => (
  <img src="/logos/digitel-g.png" alt="Digitel" style={{ width: 54, height: 54, objectFit: "contain", background: 'transparent' }} />
);
const IconWrench = () => (
  <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
  </svg>
);
const IconTruck = () => (
  <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <rect x="1" y="3" width="15" height="13"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
  </svg>
);
const IconMapPin = () => (
  <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);
const IconBot = () => (
  <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <rect x="3" y="11" width="18" height="10" rx="2"/><path d="M12 11V7"/><circle cx="12" cy="5" r="2"/><line x1="8" y1="15" x2="8" y2="15" strokeWidth="3"/><line x1="16" y1="15" x2="16" y2="15" strokeWidth="3"/><path d="M7 11v-1a2 2 0 012-2h6a2 2 0 012 2v1"/>
  </svg>
);

/* Iconos trust bar */
const IconPin = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);
const IconShip = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <rect x="1" y="3" width="15" height="13"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
  </svg>
);
const IconShield = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);
const IconCreditCard = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>
  </svg>
);
const IconDollar = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
  </svg>
);

const CATEGORIAS_HOME = [
  { id: 'smartphones', img: 'https://cdn.sanity.io/images/wwy5bykm/production/a678d75b2fb347676ccaf91a9a4bdb28e83db854-243x343.svg',  label: 'Smartphones',       color: '#00aaff' },
  { id: 'laptops',     img: 'https://cdn.sanity.io/images/wwy5bykm/production/ba4225a459413617d29554275e39ae3f1561e96f-341x482.svg', label: 'Laptops',           color: '#7c3aed' },
  { id: 'accesorios',  img: 'https://cdn.sanity.io/images/wwy5bykm/production/0a4a147844c894bc4335845e293ee37c4b5a373a-168x246.svg',  label: 'Accesorios',        color: '#00e676' },
  { id: 'repuestos',   img: 'https://cdn.sanity.io/images/wwy5bykm/production/7d6f8180e85e745dd773b20e36ea3341cc280fb7-200x201.svg', label: 'Repuestos',          color: '#ff6b35' },
  { id: 'internet',    img: 'https://cdn.sanity.io/images/wwy5bykm/production/b0efc91c6f7019432011e3e4f717ce3874353cd2-206x334.svg',   label: 'Internet Portátil', color: '#ffab00' },
  { id: 'digitel',     Icon: IconDigitel4G, label: 'Planes Digitel',    color: '#7B2D8B', externalUrl: DIGITEL_URL },
];

const TRUST_ITEMS = [
  { Icon: IconPin,        key: 'sucursales' },
  { Icon: IconShip,       key: 'envios' },
  { Icon: IconShield,     key: 'garantia' },
  { Icon: IconCreditCard, key: 'credito' },
  { Icon: IconDollar,     key: 'pagos' },
];

const SERVICES = [
  { Icon: IconWrench,  title: 'Servicio técnico',    desc: 'Reparación de pantallas, baterías, software y más. Diagnóstico gratis.', link: '/servicio-tecnico' },
  { Icon: IconTruck,   title: 'Delivery nacional',   desc: 'Enviamos tu pedido a cualquier parte de Venezuela de forma segura.',      link: '/sucursales' },
  { Icon: IconShield,  title: 'Calidad garantizada', desc: 'Productos originales con garantía oficial. Servicio al cliente confiable.', link: '/sucursales' },
  { Icon: IconBot,     title: 'Asistente IA',        desc: 'Consulta disponibilidad, precios y más con nuestro asistente virtual 24/7.', link: '/servicio-tecnico' },
];


function DigitelBanner() {
  const isMobile = () => window.innerWidth <= 768;
  const getTheme = () => document.documentElement.getAttribute('data-theme') || 'dark';
  const getKey = () => `${getTheme()}-${isMobile() ? 'mobile' : 'desktop'}`;

  const [imgSrc, setImgSrc] = useState(() => {
    const imgs = {
      'dark-desktop': 'https://cdn.sanity.io/images/wwy5bykm/production/78a5fb5711cadf4065f765d8f1bdf21fa6aeb699-2501x834.jpg',
      'light-desktop': 'https://cdn.sanity.io/images/wwy5bykm/production/7e82bbfa965b233e8fc7c3b31ae6af473ecdaad2-2501x834.jpg',
      'dark-mobile': 'https://cdn.sanity.io/images/wwy5bykm/production/edff88bf1ee9b9b60ecab2decbeb516b204cae18-1668x1668.jpg',
      'light-mobile': 'https://cdn.sanity.io/images/wwy5bykm/production/abc3ed1539a97c9c559ad0b6d22b24b26b70853d-1668x1668.jpg',
    };
    return imgs['dark-desktop'];
  });

  useEffect(() => {
    const imgs = {
      'dark-desktop': 'https://cdn.sanity.io/images/wwy5bykm/production/78a5fb5711cadf4065f765d8f1bdf21fa6aeb699-2501x834.jpg',
      'light-desktop': 'https://cdn.sanity.io/images/wwy5bykm/production/7e82bbfa965b233e8fc7c3b31ae6af473ecdaad2-2501x834.jpg',
      'dark-mobile': 'https://cdn.sanity.io/images/wwy5bykm/production/edff88bf1ee9b9b60ecab2decbeb516b204cae18-1668x1668.jpg',
      'light-mobile': 'https://cdn.sanity.io/images/wwy5bykm/production/abc3ed1539a97c9c559ad0b6d22b24b26b70853d-1668x1668.jpg',
    };
    const update = () => setImgSrc(imgs[getKey()] || imgs['dark-desktop']);
    update();
    window.addEventListener('resize', update);
    const obs = new MutationObserver(update);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => { window.removeEventListener('resize', update); obs.disconnect(); };
  }, []); // eslint-disable-line

  return (
    <section className="home-digitel">
      <img src={imgSrc} alt="Adquiere tu línea Digitel 4G LTE con Nuovocell" className="home-digitel__banner-img" />
    </section>
  );
}

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
      <Hero trustItems={TRUST_ITEMS} />

      {/* Categories */}
      <section className="section home-cats">
        <div className="container">
          <div className="home-cats__header">
            <div>
              <div className="section-label">Explora</div>
              <h2 className="section-title">Categorías</h2>
            </div>
            <a href="/catalogo" className="home-cats__ver-mas">
              Ver todo el catálogo
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
          <div className="home-cats__grid">
            {CATEGORIAS_HOME.map(({ id, Icon, img, label, color, externalUrl }) => (
              externalUrl ? (
                <a
                  key={id}
                  href={externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="home-cat-card card"
                  style={{ '--cat-color': color }}
                >
                  <span className="home-cat-card__icon" style={{ color, background: id === 'digitel' ? 'transparent' : undefined }}>
                    {img ? <img src={img} alt={label} className="home-cat-card__img" /> : Icon && <Icon />}
                  </span>
                  <span className="home-cat-card__label">{label}</span>
                  <svg className="home-cat-card__arrow" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
              ) : (
              <Link
                key={id}
                to={`/catalogo?cat=${id}`}
                className="home-cat-card card"
                style={{ '--cat-color': color }}
              >
                <span className="home-cat-card__icon" style={{ color }}>
                  {img ? <img src={img} alt={label} className="home-cat-card__img" /> : Icon && <Icon />}
                </span>
                <span className="home-cat-card__label">{label}</span>
                <svg className="home-cat-card__arrow" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
              )
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
      <DigitelBanner />

      {/* Métodos de pago */}
      <section className="section home-pagos">
        <div className="container">
          <div className="section-label">Facilidades</div>
          <h2 className="section-title">Métodos de <span>pago</span></h2>
          <p className="home-pagos__sub">Haz click en cualquier método para consultar los datos de pago por WhatsApp.</p>
          <div className="home-pagos__grid">
            {PAGOS.map(p => <PaymentLogo key={p.label} icon={p.icon} label={p.label} />)}
          </div>
        </div>
      </section>

      {/* Crédito disponible */}
      <section className="section home-credito-section">
        <div className="container">
          <div className="section-label">Financiamiento</div>
          <h2 className="section-title">Crédito <span>disponible</span></h2>
          <p className="home-credito-section__sub">Lleva tu equipo hoy y págalo en cuotas sin intereses con nuestras alianzas.</p>
          <div className="home-credito__tags">
            {CREDITO.map(c => <CreditBadge key={c.nombre} {...c} />)}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section home-services">
        <div className="container">
          <div className="section-label">Servicios</div>
          <h2 className="section-title">Más que una <span>tienda</span></h2>
          <div className="home-services__grid">
            {SERVICES.map(({ Icon, title, desc, link }) => (
              <div key={title} className="home-service-card card">
                <span className="home-service-card__icon"><Icon /></span>
                <h3 className="home-service-card__title">{title}</h3>
                <p className="home-service-card__desc">{desc}</p>
                {link && (
                  <Link to={link} className="home-service-card__link">Ver más →</Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}










