import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

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

      clearCart: () => set({ items: [] }),

      get total() {
        return get().items.reduce((sum, i) => sum + (i.precio || 0) * i.qty, 0);
      },

      get count() {
        return get().items.reduce((sum, i) => sum + i.qty, 0);
      },

      // Build WhatsApp message with cart content
      buildWAMessage: () => {
        const { items } = get();
        if (items.length === 0) return '';

        const lines = items.map(i =>
          `• ${i.nombre} x${i.qty}${i.precio ? ` — $${i.precio}` : ''}`
        ).join('\n');

        return encodeURIComponent(
          `Hola! Me interesa el siguiente equipo de Nuovocell:\n\n${lines}\n\n¿Pueden confirmarme disponibilidad y precio final?`
        );
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
