import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './CasheaRetorno.css';

const WA_NUMBER = '584123621133';

export default function CasheaRetorno() {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    // Get order ID from URL — Cashea may use different param names
    const params    = new URLSearchParams(window.location.search);
    const orderId   = params.get('idNumber') || params.get('order-payload-id') || params.get('orderId') || 'N/A';
    
    console.log('[Cashea Retorno] URL:', window.location.href);
    console.log('[Cashea Retorno] orderId:', orderId);

    // Recover saved order data
    const savedOrder = JSON.parse(sessionStorage.getItem('cashea_pending_order') || '{}');
    const productos  = (savedOrder.items || [])
      .map(i => `• ${i.nombre} x${i.qty}${i.precio ? ` — $${(i.precio * i.qty).toFixed(0)}` : ''}`)
      .join('\n');

    const total = (savedOrder.items || []).reduce((s, i) => s + (i.precio || 0) * i.qty, 0);
    const enganche = total > 0 ? `$${(total * 0.40).toFixed(0)}` : 'a confirmar';

    // Build WhatsApp message
    const msg = encodeURIComponent(
      `✅ *Pago aprobado con Cashea*\n\n` +
      `🔖 Orden Cashea: ${orderId}\n` +
      `💰 Enganche a cobrar: ${enganche}\n\n` +
      (productos ? `📦 *Productos:*\n${productos}\n\n` : '') +
      `👤 *Cliente:*\n` +
      `Nombre: ${savedOrder.nombre || 'N/A'}\n` +
      `Teléfono: ${savedOrder.telefono || 'N/A'}\n` +
      `Ciudad: ${savedOrder.ciudad || 'N/A'}\n` +
      `Entrega: ${savedOrder.entrega === 'retiro' ? 'Retiro en tienda' : savedOrder.entrega === 'delivery_local' ? 'Delivery local' : 'Envío nacional'}\n` +
      (savedOrder.sucursal ? `Sucursal: ${savedOrder.sucursal}\n` : '') +
      (savedOrder.direccion ? `Dirección: ${savedOrder.direccion}\n` : '') +
      `\n⚠️ Coordinar entrega y cobrar enganche inicial.`
    );

    // Clear session storage
    sessionStorage.removeItem('cashea_pending_order');

    // Open WhatsApp after 2 seconds
    setTimeout(() => {
      window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, '_blank');
      setOpened(true);
    }, 2000);
  }, []);

  return (
    <div className="cashea-retorno cashea-retorno--success">
      <div className="cashea-retorno__icon">✅</div>
      <h1 className="cashea-retorno__title">¡Pago aprobado con Cashea!</h1>
      <p className="cashea-retorno__sub">
        Tu financiamiento fue aprobado exitosamente.{' '}
        {opened
          ? 'Ya se abrió WhatsApp para coordinar la entrega.'
          : 'En un momento abrirá WhatsApp para coordinar la entrega y el cobro del enganche.'}
      </p>
      <div className="cashea-retorno__details">
        <p>Un asesor de Nuovocell te contactará para confirmar.</p>
      </div>
      <Link to="/" className="btn btn-primary cashea-retorno__btn">
        Volver al inicio
      </Link>
    </div>
  );
}
