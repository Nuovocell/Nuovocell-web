import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { client, queries, urlFor } from '../lib/sanity';
import { CATALOGO_SEED, WA_URL } from '../lib/data';
import { useCartStore } from '../lib/store';
import { CasheaInstallments } from '../components/ui/CasheaInstallments';
import './ProductPage.css';

const ArrowLeft = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M19 12H5M12 5l-7 7 7 7"/>
  </svg>
);
const CartIcon = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
  </svg>
);
const WAIcon = () => (
  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);
const CheckIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const CATEGORY_LABELS = {
  smartphones: 'Smartphones',
  laptops: 'Laptops',
  accesorios: 'Accesorios',
  internet: 'Internet Portátil',
  usados: 'Usados Certificados',
  digitel: 'Digitel',
};

export default function ProductPage() {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [related, setRelated] = useState([]);
  const addItem = useCartStore(s => s.addItem);
  const items = useCartStore(s => s.items);
  const inCart = product ? items.some(i => i._id === product._id) : false;

  useEffect(() => {
    setLoading(true);
    window.scrollTo(0, 0);

    // Buscar por _id en Sanity
    client.fetch(queries.productById, { id })
      .then(data => {
        if (data) {
          setProduct(data);
          // Cargar productos relacionados de la misma categoría
          return client.fetch(queries.related, {
            categoria: data.categoria,
            id: data._id,
          });
        } else {
          // Fallback al seed
          const found = CATALOGO_SEED.find(p => p._id === id);
          setProduct(found || null);
          return [];
        }
      })
      .then(rel => setRelated(rel || []))
      .catch(() => {
        const found = CATALOGO_SEED.find(p => p._id === id);
        setProduct(found || null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const waMsg = product
    ? encodeURIComponent(`Hola! Estoy interesado en el ${product.nombre}. ¿Está disponible?`)
    : '';

  if (loading) {
    return (
      <main className="product-page">
        <div className="container product-page__skeleton">
          <div className="skeleton" style={{ height: '40px', width: '160px', marginBottom: '32px' }} />
          <div className="product-page__layout">
            <div className="skeleton" style={{ aspectRatio: '1', borderRadius: '12px' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="skeleton" style={{ height: '20px', width: '80px' }} />
              <div className="skeleton" style={{ height: '40px' }} />
              <div className="skeleton" style={{ height: '60px' }} />
              <div className="skeleton" style={{ height: '50px' }} />
              <div className="skeleton" style={{ height: '50px' }} />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="product-page">
        <div className="container product-page__notfound">
          <h2>Producto no encontrado</h2>
          <Link to="/catalogo" className="btn btn-primary">Ver catálogo</Link>
        </div>
      </main>
    );
  }

  const imgSrc = product.imagen
    ? urlFor(product.imagen).width(600).height(600).fit('crop').url()
    : null;

  const displayPrice = product.precio ?? product.precioMin;
  const catLabel = CATEGORY_LABELS[product.categoria] || product.categoria;

  return (
    <main className="product-page">
      <div className="container">

        {/* Breadcrumb */}
        <nav className="product-page__breadcrumb">
          <Link to="/catalogo">
            <ArrowLeft />
            Volver al catálogo
          </Link>
          {catLabel && (
            <>
              <span>/</span>
              <Link to={`/catalogo?cat=${product.categoria}`}>{catLabel}</Link>
            </>
          )}
        </nav>

        {/* Layout principal */}
        <div className="product-page__layout">

          {/* Imagen */}
          <div className="product-page__img-col">
            <div className="product-page__img-wrap card">
              {/* Badges */}
              <div className="product-page__badges">
                {product.esNuevo && <span className="badge badge-blue">Nuevo</span>}
                {product.esOferta && <span className="badge badge-amber">Oferta</span>}
                {product.categoria === 'usados' && <span className="badge badge-green">Usado Cert.</span>}
                {!product.disponible && (
                  <span className="badge" style={{ background: 'rgba(255,61,87,0.1)', color: 'var(--red)', border: '1px solid rgba(255,61,87,0.25)' }}>
                    Agotado
                  </span>
                )}
              </div>
              {imgSrc
                ? <img src={imgSrc} alt={product.nombre} className="product-page__img" />
                : (
                  <div className="product-page__img-placeholder">
                    <svg width="80" height="80" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" opacity="0.2">
                      <rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2"/>
                    </svg>
                    <span>Imagen próximamente</span>
                  </div>
                )
              }
            </div>
          </div>

          {/* Info */}
          <div className="product-page__info-col">
            {product.marca && (
              <p className="product-page__marca">{product.marca}</p>
            )}
            <h1 className="product-page__nombre">{product.nombre}</h1>

            {/* Categoría */}
            <Link
              to={`/catalogo?cat=${product.categoria}`}
              className="product-page__cat-link"
            >
              {catLabel}
            </Link>

            {/* Precio */}
            <div className="product-page__price-section">
              {displayPrice ? (
                <div className="product-page__price-row">
                  {product.precioAnterior && (
                    <span className="product-page__price-old">${product.precioAnterior}</span>
                  )}
                  <span className="product-page__price">${displayPrice}</span>
                  {product.precioAnterior && (
                    <span className="product-page__discount badge badge-amber">
                      -{Math.round((1 - displayPrice / product.precioAnterior) * 100)}%
                    </span>
                  )}
                </div>
              ) : (
                <p className="product-page__price-consult">
                  Consulta el precio por WhatsApp
                </p>
              )}
            </div>

            {/* Descripción */}
            {product.descripcion && (
              <p className="product-page__desc">{product.descripcion}</p>
            )}

            {/* Disponibilidad */}
            <div className={`product-page__stock${product.disponible ? ' product-page__stock--ok' : ' product-page__stock--out'}`}>
              <CheckIcon />
              {product.disponible ? 'Disponible en tienda' : 'Temporalmente agotado'}
            </div>

            {/* Acciones */}
            <div className="product-page__actions">
              {product.disponible && (
                <button
                  className={`btn product-page__btn-cart${inCart ? ' product-page__btn-cart--added' : ' btn-primary'}`}
                  onClick={() => addItem(product)}
                >
                  <CartIcon />
                  {inCart ? '✓ Añadido al carrito' : 'Agregar al carrito'}
                </button>
              )}
              <a
                href={`https://wa.me/584123621133?text=${waMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-wa product-page__btn-wa"
              >
                <WAIcon />
                Consultar por WhatsApp
              </a>
            </div>

            {/* Info extra */}
            <div className="product-page__perks">
              <div className="product-page__perk">
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                Garantía oficial
              </div>
              <div className="product-page__perk">
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="1" y="3" width="15" height="13"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
                </svg>
                Delivery nacional
              </div>
              <div className="product-page__perk">
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>
                </svg>
                Múltiples métodos de pago
              </div>
            </div>
          </div>
        </div>

        {/* Productos relacionados */}
        {related.length > 0 && (
          <section className="product-page__related">
            <div className="section-label">Más opciones</div>
            <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '24px' }}>
              Productos <span>relacionados</span>
            </h2>
            <div className="product-page__related-grid">
              {related.slice(0, 4).map(p => (
                <Link
                  key={p._id}
                  to={`/catalogo/${p._id}`}
                  className="product-page__related-card card"
                >
                  <div className="product-page__related-img">
                    {p.imagen
                      ? <img src={urlFor(p.imagen).width(200).height(200).fit('crop').url()} alt={p.nombre} />
                      : (
                        <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" opacity="0.3">
                          <rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2"/>
                        </svg>
                      )
                    }
                  </div>
                  <div className="product-page__related-info">
                    {p.marca && <p className="product-page__related-marca">{p.marca}</p>}
                    <p className="product-page__related-nombre">{p.nombre}</p>
                    <p className="product-page__related-price">
                      {p.precio ? `$${p.precio}` : 'Consultar precio'}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
