import React from 'react';
import { useTranslation } from 'react-i18next';
import { useCartStore, useUIStore } from '../../lib/store';
import { WA_URL, SUCURSALES, PAGOS } from '../../lib/data';
import './Cart.css';

const CloseIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const TrashIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/>
  </svg>
);

const WAIcon = () => (
  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const BackIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <path d="M19 12H5M12 5l-7 7 7 7"/>
  </svg>
);


// ── Cashea Checkout Button ────────────────────────────────────
const CASHEA_PUBLIC_KEY = process.env.REACT_APP_CASHEA_PUBLIC_KEY || '6639416be49c36e98d5876d4fc29cdc4bee4d7490516bcd5c4589c07379c3136';
const CASHEA_STORE_ID   = parseInt(process.env.REACT_APP_CASHEA_STORE_ID || '12467');
const CASHEA_EXT_CLIENT = process.env.REACT_APP_CASHEA_EXTERNAL_CLIENT_ID || '1097';
const CASHEA_REDIRECT   = 'https://nuovocell.com.ve/checkout/cashea/retorno';

function CasheaCheckoutButton({ items, customer, total, isValid }) {
  const containerRef = React.useRef(null);
  const [sdkReady, setSdkReady] = React.useState(false);
  const [sdkError, setSdkError] = React.useState(false);

  // Load Cashea SDK script dynamically
  React.useEffect(() => {
    if (document.getElementById('cashea-sdk')) { setSdkReady(true); return; }
    const script = document.createElement('script');
    script.id  = 'cashea-sdk';
    script.src = 'https://unpkg.com/cashea-web-checkout-sdk@latest/dist/webcheckout-sdk.min.js';
    script.onload = () => setSdkReady(true);
    script.onerror = () => setSdkError(true);
    document.head.appendChild(script);
    return () => {};
  }, []);

  // Render button when SDK is ready
  React.useEffect(() => {
    if (!sdkReady || !containerRef.current || !isValid || !window.WebCheckoutSDK) return;

    // Clear previous button
    containerRef.current.innerHTML = '';

    const sdk = new window.WebCheckoutSDK({ apiKey: CASHEA_PUBLIC_KEY });

    const invoiceId = `NC-${Date.now()}`;

    const payload = {
      deliveryMethod:         customer.entrega === 'retiro' ? 'IN_STORE' : 'DELIVERY',
      redirectUrl:            CASHEA_REDIRECT,
      merchantName:           'Nuovocell',
      identificationNumber:   customer.cedula || '',
      invoiceId,
      externalClientId:       CASHEA_EXT_CLIENT,
      deliveryPrice:          0,
      orders: [{
        store: { id: CASHEA_STORE_ID, name: 'Nuovocell', enabled: true },
        products: items.map(item => ({
          id:          item._id,
          name:        item.nombre,
          price:       item.precio || 0,
          quantity:    item.qty,
          sku:         item._id,
          description: item.nombre,
          imageUrl:    item.imagen ? `https://cdn.sanity.io/images/wwy5bykm/production/${item.imagen.asset._ref.replace('image-','').replace('-jpg','.jpg').replace('-png','.png').replace('-webp','.webp')}` : 'https://nuovocell.com.ve/logos/nuovocell-logo.png',
          tax:         0,
          discount:    0,
        })),
      }],
    };

    try {
      sdk.createCheckoutButton({ payload, container: containerRef.current });
    } catch(e) {
      console.error('[Cashea SDK]', e);
      setSdkError(true);
    }
  }, [sdkReady, isValid, items, customer, total]);

  if (sdkError) return (
    <p className="checkout-form__required-hint">
      Error al cargar Cashea. Intenta recargar la página.
    </p>
  );

  if (!isValid) return (
    <button className="btn btn-cashea cart__checkout cart__checkout--disabled" disabled>
      <img src="https://cdn.sanity.io/images/wwy5bykm/production/5849e1c8f236b473d7527da16b90782c476d64b2-417x418.jpg" alt="Cashea" style={{width:18,height:18,borderRadius:4}} />
      Pagar con Cashea
    </button>
  );

  return <div ref={containerRef} className="cashea-sdk-container" />;
}

function CartStep({ items, removeItem, updateQty, total, hasTotal, onNext, onClose, t }) {
  return (
    <>
      <div className="cart__header">
        <div>
          <h2 className="cart__title">{t('cart.title')}</h2>
        </div>
        <button className="cart__close" onClick={onClose}><CloseIcon /></button>
      </div>

      <div className="cart__body">
        {items.length === 0 ? (
          <div className="cart__empty">
            <div className="cart__empty-icon">🛍️</div>
            <p className="cart__empty-text">{t('cart.empty')}</p>
            <p className="cart__empty-sub">{t('cart.empty_sub')}</p>
          </div>
        ) : (
          <ul className="cart__list">
            {items.map(item => (
              <li key={item._id} className="cart__item">
                <div className="cart__item-info">
                  <span className="cart__item-name">{item.nombre}</span>
                  {item.precio
                    ? <span className="cart__item-price">${item.precio}</span>
                    : <span className="cart__item-price cart__item-price--na">{t('catalog.no_price')}</span>
                  }
                </div>
                <div className="cart__item-actions">
                  <div className="cart__qty">
                    <button onClick={() => updateQty(item._id, item.qty - 1)}>−</button>
                    <span>{item.qty}</span>
                    <button onClick={() => updateQty(item._id, item.qty + 1)}>+</button>
                  </div>
                  <button className="cart__remove" onClick={() => removeItem(item._id)}>
                    <TrashIcon />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {items.length > 0 && (
        <div className="cart__footer">
          {hasTotal && (
            <div className="cart__total">
              <span>{t('cart.total')}</span>
              <span className="cart__total-num">${total.toFixed(0)}</span>
            </div>
          )}
          <button className="btn btn-primary cart__checkout" onClick={onNext}>
            Continuar con el pedido
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      )}
    </>
  );
}

function CheckoutStep({ items, customer, updateCustomer, onBack, onSubmit, total, hasTotal }) {
  const sucursalesOpts = SUCURSALES.map(s => s.nombre);
  const pagosOpts = PAGOS.map(p => p.label);
  const isValid = customer.nombre.trim() && customer.telefono.trim() && customer.metodoPago;

  return (
    <>
      <div className="cart__header">
        <button className="cart__back" onClick={onBack}>
          <BackIcon />
          <span>Volver al carrito</span>
        </button>
      </div>

      <div className="cart__body cart__body--form">
        <div className="checkout-form">

          {/* Datos personales */}
          <div className="checkout-form__group">
            <label className="checkout-form__label">Nombre completo *</label>
            <input className="checkout-form__input" type="text"
              placeholder="Ej: Juan Pérez"
              value={customer.nombre}
              onChange={e => updateCustomer({ nombre: e.target.value })} />
          </div>

          <div className="checkout-form__group">
            <label className="checkout-form__label">WhatsApp *</label>
            <input className="checkout-form__input" type="tel"
              placeholder="0412-1234567"
              value={customer.telefono}
              onChange={e => updateCustomer({ telefono: e.target.value })} />
          </div>

          <div className="checkout-form__group">
            <label className="checkout-form__label">Ciudad</label>
            <input className="checkout-form__input" type="text"
              placeholder="Valencia, Carabobo"
              value={customer.ciudad}
              onChange={e => updateCustomer({ ciudad: e.target.value })} />
          </div>

          <div className="checkout-form__divider" />

          {/* Entrega */}
          <div className="checkout-form__group">
            <label className="checkout-form__label">¿Cómo recibes tu pedido?</label>
            <div className="checkout-form__radio-group">
              <label className={`checkout-form__radio${customer.entrega === 'retiro' ? ' active' : ''}`}>
                <input type="radio" value="retiro" checked={customer.entrega === 'retiro'}
                  onChange={() => updateCustomer({ entrega: 'retiro', sucursal: '', direccion: '', empresa_envio: '', ciudad_destino: '', agencia_envio: '' })} />
                🏪 Retiro en tienda
              </label>
              <label className={`checkout-form__radio${customer.entrega === 'delivery_local' ? ' active' : ''}`}>
                <input type="radio" value="delivery_local" checked={customer.entrega === 'delivery_local'}
                  onChange={() => updateCustomer({ entrega: 'delivery_local', sucursal: '', empresa_envio: '', ciudad_destino: '', agencia_envio: '' })} />
                🛵 Delivery (ciudad)
              </label>
              <label className={`checkout-form__radio${customer.entrega === 'delivery_nacional' ? ' active' : ''}`}>
                <input type="radio" value="delivery_nacional" checked={customer.entrega === 'delivery_nacional'}
                  onChange={() => updateCustomer({ entrega: 'delivery_nacional', sucursal: '', direccion: '' })} />
                📦 Envío nacional
              </label>
            </div>
          </div>

          {/* Retiro: elegir sucursal de Nuovocell */}
          {customer.entrega === 'retiro' && (
            <div className="checkout-form__group">
              <label className="checkout-form__label">¿En cuál sucursal Nuovocell retiras?</label>
              <select className="checkout-form__select"
                value={customer.sucursal}
                onChange={e => updateCustomer({ sucursal: e.target.value })}>
                <option value="">Selecciona una sucursal</option>
                {sucursalesOpts.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          )}

          {/* Delivery local: dirección exacta */}
          {customer.entrega === 'delivery_local' && (
            <div className="checkout-form__group">
              <label className="checkout-form__label">Dirección de entrega</label>
              <textarea className="checkout-form__textarea"
                placeholder="Urb., calle, edificio, apto, punto de referencia..."
                value={customer.direccion}
                onChange={e => updateCustomer({ direccion: e.target.value })} />
            </div>
          )}

          {/* Delivery nacional: empresa + ciudad + agencia */}
          {customer.entrega === 'delivery_nacional' && (<>
            <div className="checkout-form__group">
              <label className="checkout-form__label">Empresa de envío preferida</label>
              <select className="checkout-form__select"
                value={customer.empresa_envio}
                onChange={e => updateCustomer({ empresa_envio: e.target.value })}>
                <option value="">Selecciona la empresa</option>
                {['MRW', 'Zoom', 'Tealca', 'Domesa', 'Otra'].map(e => <option key={e} value={e}>{e}</option>)}
              </select>
            </div>
            <div className="checkout-form__group">
              <label className="checkout-form__label">Ciudad / Estado destino</label>
              <input className="checkout-form__input" type="text"
                placeholder="Ej: Caracas, Dtto. Capital"
                value={customer.ciudad_destino}
                onChange={e => updateCustomer({ ciudad_destino: e.target.value })} />
            </div>
            <div className="checkout-form__group">
              <label className="checkout-form__label">Sucursal de la empresa de envío</label>
              <input className="checkout-form__input" type="text"
                placeholder="Ej: MRW Las Mercedes, Agencia #342"
                value={customer.agencia_envio}
                onChange={e => updateCustomer({ agencia_envio: e.target.value })} />
            </div>
          </>)}

          <div className="checkout-form__divider" />

          {/* Pago */}
          <div className="checkout-form__group">
            <label className="checkout-form__label">Cédula de identidad</label>
            <input className="checkout-form__input" type="text"
              placeholder="Ej: 12345678 (solo números, sin V)"
              value={customer.cedula || ''}
              onChange={e => updateCustomer({ cedula: e.target.value.replace(/[^0-9]/g,'') })} />
          </div>

          <div className="checkout-form__group">
            <label className="checkout-form__label">Método de pago *</label>
            <select className="checkout-form__select"
              value={customer.metodoPago}
              onChange={e => updateCustomer({ metodoPago: e.target.value })}>
              <option value="">Selecciona un método</option>
              {pagosOpts.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          <div className="checkout-form__group">
            <label className="checkout-form__label">Notas / variante</label>
            <textarea className="checkout-form__textarea"
              placeholder="Color, almacenamiento, alguna pregunta..."
              value={customer.notas}
              onChange={e => updateCustomer({ notas: e.target.value })} />
          </div>

        </div>
      </div>

      <div className="cart__footer">
        {hasTotal && (
          <div className="cart__total">
            <span>Total estimado</span>
            <span className="cart__total-num">${total.toFixed(0)}</span>
          </div>
        )}
        {customer.metodoPago === 'Cashea (Crédito)' ? (
          <CasheaCheckoutButton
            items={items}
            customer={customer}
            total={total}
            isValid={isValid}
          />
        ) : (
          <button
            className={`btn btn-wa cart__checkout${!isValid ? ' cart__checkout--disabled' : ''}`}
            onClick={isValid ? onSubmit : undefined}
            disabled={!isValid}
          >
            <WAIcon />
            Enviar pedido por WhatsApp
          </button>
        )}
        {!isValid
          ? <p className="checkout-form__required-hint">Completa nombre, WhatsApp y método de pago</p>
          : <p className="cart__note">Un asesor confirmará disponibilidad y coordinará el pago.</p>
        }
      </div>
    </>
  );
}

export default function Cart() {
  const { t } = useTranslation();
  const { cartOpen, toggleCart } = useUIStore();
  const items = useCartStore(s => s.items);
  const removeItem = useCartStore(s => s.removeItem);
  const updateQty = useCartStore(s => s.updateQty);
  const buildWAMessage = useCartStore(s => s.buildWAMessage);
  const step = useCartStore(s => s.step);
  const setStep = useCartStore(s => s.setStep);
  const customer = useCartStore(s => s.customer);
  const updateCustomer = useCartStore(s => s.updateCustomer);

  const total = items.reduce((sum, i) => sum + (i.precio || 0) * i.qty, 0);
  const hasTotal = items.some(i => i.precio);

  const handleSubmit = () => {
    const msg = buildWAMessage();
    window.open(`https://wa.me/584123621133?text=${msg}`, '_blank');
    setStep('cart');
  };

  return (
    <>
      <div
        className={`cart-overlay${cartOpen ? ' cart-overlay--open' : ''}`}
        onClick={toggleCart}
      />
      <aside className={`cart${cartOpen ? ' cart--open' : ''}`}>
        {step === 'cart' ? (
          <CartStep
            items={items}
            removeItem={removeItem}
            updateQty={updateQty}
            total={total}
            hasTotal={hasTotal}
            onNext={() => setStep('checkout')}
            onClose={toggleCart}
            t={t}
          />
        ) : (
          <CheckoutStep
            items={items}
            customer={customer}
            updateCustomer={updateCustomer}
            onBack={() => setStep('cart')}
            onSubmit={handleSubmit}
            total={total}
            hasTotal={hasTotal}
          />
        )}
      </aside>
    </>
  );
}
