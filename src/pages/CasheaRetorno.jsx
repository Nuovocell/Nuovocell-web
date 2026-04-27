import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../lib/store';
import './CasheaRetorno.css';

const WA_NUMBER = '584123621133';

export default function CasheaRetorno() {
  const [status, setStatus]   = useState('loading'); // loading | success | error
  const [details, setDetails] = useState(null);
  const [errMsg, setErrMsg]   = useState('');
  const clearCart = useCartStore(s => s.clearCart);

  useEffect(() => {
    const params   = new URLSearchParams(window.location.search);
    // Cashea may send either 'idNumber' or 'order-payload-id'
    const idNumber = params.get('idNumber') || params.get('order-payload-id');

    console.log('[Cashea Retorno] URL params:', window.location.search);
    console.log('[Cashea Retorno] idNumber:', idNumber);

    if (!idNumber) {
      setStatus('error');
      setErrMsg(`No se recibió el número de orden. URL: ${window.location.href}`);
      return;
    }

    // Call backend to confirm down-payment
    fetch('/api/cashea/confirm', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ idNumber }),
    })
      .then(r => r.json())
      .then(data => {
        if (data.success) {
          setDetails(data);
          setStatus('success');
          clearCart();

          // Build WhatsApp message with all order details
          const savedOrder = JSON.parse(sessionStorage.getItem('cashea_pending_order') || '{}');
          const productos = (savedOrder.items || [])
            .map(i => `• ${i.nombre} x${i.qty}${i.precio ? ` — $${i.precio}` : ''}`)
            .join('\n');
          
          const msg = encodeURIComponent(
            `✅ *Pago Cashea Confirmado*\n\n` +
            `🔖 Orden Cashea: ${idNumber}\n` +
            `💰 Enganche cobrado: $${data.downPayment}\n` +
            `📋 Invoice: ${data.invoiceId || 'N/A'}\n\n` +
            `📦 *Productos:*\n${productos || 'Ver orden en sistema'}\n\n` +
            `👤 *Cliente:*\n` +
            `Nombre: ${savedOrder.nombre || 'N/A'}\n` +
            `Teléfono: ${savedOrder.telefono || 'N/A'}\n` +
            `Ciudad: ${savedOrder.ciudad || 'N/A'}\n` +
            `Entrega: ${savedOrder.entrega === 'retiro' ? 'Retiro en tienda' : savedOrder.entrega === 'delivery_local' ? 'Delivery local' : 'Envío nacional'}\n` +
            (savedOrder.sucursal ? `Sucursal: ${savedOrder.sucursal}\n` : '') +
            (savedOrder.direccion ? `Dirección: ${savedOrder.direccion}\n` : '') +
            `\n⚠️ Coordinar entrega y confirmar pago inicial.`
          );
          
          // Clear session storage
          sessionStorage.removeItem('cashea_pending_order');
          
          // Open WhatsApp immediately
          window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, '_blank');
        } else {
          setStatus('error');
          setErrMsg(data.error || 'Error al confirmar el pago con Cashea.');
        }
      })
      .catch(() => {
        setStatus('error');
        setErrMsg('Error de conexión. Por favor contacta a soporte.');
      });
  }, [clearCart]);

  if (status === 'loading') return (
    <div className="cashea-retorno cashea-retorno--loading">
      <div className="cashea-retorno__spinner" />
      <p>Confirmando tu pago con Cashea...</p>
    </div>
  );

  if (status === 'success') return (
    <div className="cashea-retorno cashea-retorno--success">
      <div className="cashea-retorno__icon">✅</div>
      <h1 className="cashea-retorno__title">¡Pago confirmado!</h1>
      <p className="cashea-retorno__sub">
        Tu pago inicial con Cashea fue procesado exitosamente.<br/>
        En unos segundos abrirá WhatsApp para coordinar la entrega.
      </p>
      {details && (
        <div className="cashea-retorno__details">
          <p>🔖 Orden: <strong>{details.idNumber}</strong></p>
          <p>💰 Enganche: <strong>${details.downPayment}</strong></p>
        </div>
      )}
      <Link to="/" className="btn btn-primary cashea-retorno__btn">
        Volver al inicio
      </Link>
    </div>
  );

  return (
    <div className="cashea-retorno cashea-retorno--error">
      <div className="cashea-retorno__icon">❌</div>
      <h1 className="cashea-retorno__title">Ocurrió un problema</h1>
      <p className="cashea-retorno__sub">{errMsg}</p>
      <a
        href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hola, tuve un problema al pagar con Cashea. ¿Pueden ayudarme?')}`}
        target="_blank" rel="noopener noreferrer"
        className="btn btn-wa cashea-retorno__btn"
      >
        Contactar soporte
      </a>
      <Link to="/" className="cashea-retorno__link">Volver al inicio</Link>
    </div>
  );
}
