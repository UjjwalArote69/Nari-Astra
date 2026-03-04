import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      isCartOpen: false,
  
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
      
      addItem: (product, quantity, packSize) => {
        const cart = get().cart;
        const cartId = `${product.id}-${packSize}`;
        const existingItem = cart.find((item) => item.cartId === cartId);

        if (existingItem) {
          set({
            cart: cart.map((item) =>
              item.cartId === cartId ? { ...item, quantity: item.quantity + quantity } : item
            ),
          });
        } else {
          set({ cart: [...cart, { ...product, quantity, packSize, cartId }] });
        }
        set({ isCartOpen: true });
      },

      removeItem: (cartId) => set((state) => ({
        cart: state.cart.filter((item) => item.cartId !== cartId)
      })),

      getTotalCount: () => get().cart.reduce((acc, item) => acc + item.quantity, 0),
      getTotalPrice: () => get().cart.reduce((acc, item) => acc + (item.price * item.quantity), 0),
    }),
    { name: 'nari-astra-storage' }
  )
);