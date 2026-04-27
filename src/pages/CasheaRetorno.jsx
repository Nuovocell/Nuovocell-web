import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './CasheaRetorno.css';

const WA_NUMBER = '584123621133';

export default function CasheaRetorno() {
  const [waUrl, setWaUrl] = useState('');

  useEffect(() => {
    const params  = new URLSearchParams(window.location.search);
    const orderId = params.get('idNumber') || params.get('order-payload-id') || 'N/A';

    const savedOrder = JSON.parse(sessionStorage.getItem('cashea_pending_order') || '{}');
    const productos  = (savedOrder.items || [])
      .map(i => `• ${i.nombre} x${i.qty}${i.precio ? ` — $${i.precio}` : ''}`)
      .join('\n');

    const total    = (savedOrder.items || []).reduce((s, i) => s + (i.precio || 0) * i.qty, 0);
    const enganche = total > 0 ? `$${(total * 0.40).toFixed(0)}` : 'a confirmar con Cashea';

    const msg = encodeURIComponent(
      `✅ *Pago aprobado con Cashea*\n\n` +
      `🔖 Orden Cashea: ${orderId}\n` +
      `💰 Enganche a cobrar: ${enganche}\n\n` +
      (productos ? `📦 *Productos:*\n${productos}\n\n` : '') +
      `👤 *Cliente:*\n` +
      `Nombre: ${savedOrder.nombre || 'N/A'}\n` +
      `Teléfono: ${savedOrder.telefono || 'N/A'}\n` +
      `Ciudad: ${savedOrder.ciudad || 'N/A'}\n` +
      `Entrega: ${
        savedOrder.entrega === 'retiro' ? 'Retiro en tienda' :
        savedOrder.entrega === 'delivery_local' ? 'Delivery local' : 'Envío nacional'
      }\n` +
      (savedOrder.sucursal ? `Sucursal: ${savedOrder.sucursal}\n` : '') +
      (savedOrder.direccion ? `Dirección: ${savedOrder.direccion}\n` : '') +
      `\n⚠️ Coordinar entrega y cobrar enganche inicial.`
    );

    setWaUrl(`https://wa.me/${WA_NUMBER}?text=${msg}`);
    sessionStorage.removeItem('cashea_pending_order');
  }, []);

  return (
    <div className="cashea-retorno cashea-retorno--success">
      <div className="cashea-retorno__icon">✅</div>
      <h1 className="cashea-retorno__title">¡Pago aprobado con Cashea!</h1>
      <p className="cashea-retorno__sub">
        Tu financiamiento fue aprobado exitosamente.<br/>
        Toca el botón de abajo para coordinar la entrega con un asesor.
      </p>

      {waUrl && (
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-wa cashea-retorno__btn cashea-retorno__btn--wa"
        >
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Coordinar entrega por WhatsApp
        </a>
      )}

      <Link to="/" className="cashea-retorno__link">
        Volver al inicio
      </Link>
    </div>
  );
}
