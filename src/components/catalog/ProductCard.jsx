import React from 'react';
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

  const { nombre, categoria, imagen, precio, precioAnterior, precioMin,
          disponible, esNuevo, esOferta, marca } = product;

  const displayPrice = precio ?? precioMin;
  const wa = `https://wa.me/584123621133?text=${encodeURIComponent(`Hola! Me interesa el ${nombre} ¿está disponible?`)}`;

  const imgSrc = imagen ? urlFor(imagen).width(400).height(400).fit('crop').url() : null;

  return (
    <div className={`pcard card${!disponible ? ' pcard--sold' : ''}`}>
      {/* Badges */}
      <div className="pcard__badges">
        {esNuevo && <span className="badge badge-blue">{t('catalog.new')}</span>}
        {esOferta && <span className="badge badge-amber">{t('catalog.offer')}</span>}
        {categoria === 'usados' && <span className="badge badge-green">{t('catalog.used')}</span>}
        {!disponible && <span className="badge" style={{background:'rgba(255,61,87,0.1)',color:'var(--red)',border:'1px solid rgba(255,61,87,0.25)'}}>{t('catalog.sold_out')}</span>}
      </div>

      {/* Image */}
      <div className="pcard__img-wrap">
        {imgSrc
          ? <img src={imgSrc} alt={nombre} className="pcard__img" />
          : <div className="pcard__img-placeholder">📱</div>
        }
      </div>

      {/* Info */}
      <div className="pcard__body">
        {marca && <div className="pcard__marca">{marca}</div>}
        <h3 className="pcard__nombre">{nombre}</h3>

        {/* Price */}
        <div className="pcard__price-row">
          {displayPrice
            ? <>
                {precioAnterior && <span className="pcard__price-old">${precioAnterior}</span>}
                <span className="pcard__price">${displayPrice}</span>
              </>
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
              <CartIcon />
              {inCart ? '✓' : t('catalog.add_cart')}
            </button>
          )}
          <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-wa pcard__wa">
            <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            {t('catalog.wa_consult')}
          </a>
        </div>
      </div>
    </div>
  );
}
