import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCartStore } from '../../lib/store';
import { urlFor } from '../../lib/sanity';
import './ProductCard.css';

const CartIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
  </svg>
);

export default function ProductCard({ product }) {
  const { t } = useTranslation();
  const addItem = useCartStore(s => s.addItem);
  const items = useCartStore(s => s.items);
  const inCart = items.some(i => i._id === product._id);

  const { _id, nombre, categoria, imagen, precio, precioAnterior, precioMin,
          disponible, esNuevo, esOferta, marca } = product;

  const displayPrice = precio ?? precioMin;
  const waMsg = encodeURIComponent(`Hola! Me interesa el ${nombre} ¿está disponible?`);

  const imgSrc = imagen ? urlFor(imagen).width(400).height(400).fit('crop').url() : null;

  return (
    <div className={`pcard card${!disponible ? ' pcard--sold' : ''}`}>
      {/* Badges */}
      <div className="pcard__badges">
        {esNuevo && <span className="badge badge-blue">{t('catalog.new')}</span>}
        {esOferta && <span className="badge badge-amber">{t('catalog.offer')}</span>}
        {categoria === 'usados' && <span className="badge badge-green">{t('catalog.used')}</span>}
        {!disponible && (
          <span className="badge" style={{ background: 'rgba(255,61,87,0.1)', color: 'var(--red)', border: '1px solid rgba(255,61,87,0.25)' }}>
            {t('catalog.sold_out')}
          </span>
        )}
      </div>

      {/* Imagen — link a detalle */}
      <Link to={`/catalogo/${_id}`} className="pcard__img-wrap">
        {imgSrc
          ? <img src={imgSrc} alt={nombre} className="pcard__img" />
          : (
            <div className="pcard__img-placeholder">
              <svg width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24" opacity="0.3">
                <rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2"/>
              </svg>
            </div>
          )
        }
      </Link>

      {/* Info */}
      <div className="pcard__body">
        {marca && <div className="pcard__marca">{marca}</div>}

        {/* Nombre — link a detalle */}
        <Link to={`/catalogo/${_id}`} className="pcard__nombre-link">
          <h3 className="pcard__nombre">{nombre}</h3>
        </Link>

        {/* Price */}
        <div className="pcard__price-row">
          {displayPrice
            ? (
              <>
                {precioAnterior && <span className="pcard__price-old">${precioAnterior}</span>}
                <span className="pcard__price">${displayPrice}</span>
              </>
            )
            : <span className="pcard__price-consult">{t('catalog.no_price')}</span>
          }
        </div>

        {/* Actions */}
        <div className="pcard__actions">
          {disponible && (
            <button
              className={`btn pcard__add${inCart ? ' pcard__add--added' : ' btn-primary'}`}
              onClick={() => addItem(product)}
            >
              {inCart ? '✓ Agregado' : '+ Agregar'}
            </button>
          )}
          <Link to={`/catalogo/${_id}`} className="btn btn-outline pcard__detail">
            Ver detalles
          </Link>
        </div>
      </div>
    </div>
  );
}