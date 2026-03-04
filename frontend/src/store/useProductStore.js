import { create } from 'zustand';
import { getProducts } from '../api/product.service';

export const useProductStore = create((set) => ({
  products: [],
  isLoading: false,
  error: null,

  // Professional UX: Store handles loading and error states centrally
  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await getProducts();
      set({ products: data, isLoading: false });
    } catch (err) {
      set({ error: `Could not load products. Please try again later. ${err}` , isLoading: false });
    }
  },
}));