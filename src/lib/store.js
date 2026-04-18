import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      // Checkout step: 'cart' | 'checkout'
      step: 'cart',
      // Customer data
      customer: {
        nombre: '',
        telefono: '',
        ciudad: '',
        entrega: 'retiro',      // 'retiro' | 'delivery_local' | 'delivery_nacional'
        sucursal: '',
        // Delivery local
        direccion: '',
        // Delivery nacional
        empresa_envio: '',      // MRW, Zoom, Tealca, etc.
        ciudad_destino: '',
        agencia_envio: '',
        metodoPago: '',
        notas: '',
      },

      addItem: (product) => {
        const { items } = get();
        const existing = items.find(i => i._id === product._id);
        if (existing) {
          set({ items: items.map(i => i._id === product._id ? { ...i, qty: i.qty + 1 } : i) });
        } else {
          set({ items: [...items, { ...product, qty: 1 }] });
        }
      },

      removeItem: (id) => set({ items: get().items.filter(i => i._id !== id) }),

      updateQty: (id, qty) => {
        if (qty <= 0) return get().removeItem(id);
        set({ items: get().items.map(i => i._id === id ? { ...i, qty } : i) });
      },

      clearCart: () => set({ items: [], step: 'cart', customer: {
        nombre: '', telefono: '', ciudad: '', entrega: 'retiro', sucursal: '',
        direccion: '', empresa_envio: '', ciudad_destino: '', agencia_envio: '',
        metodoPago: '', notas: '',
      }}),

      setStep: (step) => set({ step }),

      updateCustomer: (data) => set(s => ({ customer: { ...s.customer, ...data } })),

      get total() {
        return get().items.reduce((sum, i) => sum + (i.precio || 0) * i.qty, 0);
      },

      get count() {
        return get().items.reduce((sum, i) => sum + i.qty, 0);
      },

      // Build WhatsApp message with cart + customer data
      buildWAMessage: () => {
        const { items, customer } = get();
        if (items.length === 0) return '';

        const lines = items.map(i =>
          `• ${i.nombre} x${i.qty}${i.precio ? ` — $${i.precio}` : ''}`
        ).join('\n');

        const total = items.reduce((sum, i) => sum + (i.precio || 0) * i.qty, 0);
        const totalLine = total > 0 ? `\n💰 *Total estimado: $${total}*` : '';

        const clienteInfo = [
          customer.nombre     ? `👤 Nombre: ${customer.nombre}` : '',
          customer.telefono   ? `📱 Teléfono: ${customer.telefono}` : '',
          customer.ciudad     ? `📍 Ciudad: ${customer.ciudad}` : '',
          customer.entrega === 'retiro'           ? '🏪 Entrega: Retiro en tienda' :
          customer.entrega === 'delivery_local'    ? '🛵 Entrega: Delivery local' :
                                                    '📦 Entrega: Envío nacional',
          customer.sucursal        ? `🏢 Sucursal: ${customer.sucursal}` : '',
          customer.direccion       ? `📍 Dirección: ${customer.direccion}` : '',
          customer.empresa_envio   ? `🚚 Empresa de envío: ${customer.empresa_envio}` : '',
          customer.ciudad_destino  ? `📍 Ciudad destino: ${customer.ciudad_destino}` : '',
          customer.agencia_envio   ? `🏪 Agencia: ${customer.agencia_envio}` : '',
          customer.metodoPago ? `💳 Método de pago: ${customer.metodoPago}` : '',
          customer.notas      ? `📝 Notas: ${customer.notas}` : '',
        ].filter(Boolean).join('\n');

        const msg = `Hola! Quiero hacer el siguiente pedido en *Nuovocell*:\n\n` +
          `📦 *Productos:*\n${lines}${totalLine}\n\n` +
          `👤 *Datos del cliente:*\n${clienteInfo}\n\n` +
          `¿Pueden confirmarme disponibilidad y proceder con el pago? Gracias! 🙏`;

        return encodeURIComponent(msg);
      },
    }),
    {
      name: 'nuovocell-cart',
      partialize: (state) => ({ items: state.items }),
    }
  )
);

export const useUIStore = create((set) => ({
  cartOpen: false,
  aiOpen: false,
  mobileMenuOpen: false,
  toggleCart: () => set(s => ({ cartOpen: !s.cartOpen })),
  toggleAI: () => set(s => ({ aiOpen: !s.aiOpen })),
  toggleMenu: () => set(s => ({ mobileMenuOpen: !s.mobileMenuOpen })),
  closeAll: () => set({ cartOpen: false, aiOpen: false, mobileMenuOpen: false }),
}));
