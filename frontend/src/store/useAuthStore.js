import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../api/axios.config';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isLoggedIn: false,
      isLoading: false,
      error: null,

      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.post('/users/login', credentials);
          set({ user: response.data.user, isLoggedIn: true, isLoading: false });
          return { success: true };
        } catch (err) {
          const message = err.response?.data?.message || "Invalid credentials.";
          set({ error: message, isLoading: false });
          return { success: false, message };
        }
      },

      register: async (userData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.post('/users/register', userData);
          set({ user: response.data.user, isLoggedIn: true, isLoading: false });
          return { success: true };
        } catch (err) {
          const message = err.response?.data?.message || "Registration failed.";
          set({ error: message, isLoading: false });
          return { success: false, message };
        }
      },

      changePassword: async (passwordData) => {
        set({ isLoading: true, error: null });
        try {
          const userEmail = get().user?.email;
          const response = await api.put('/users/change-password', {
            email: userEmail,
            ...passwordData
          });
          set({ isLoading: false });
          return { success: true, message: response.data.message };
        } catch (err) {
          const message = err.response?.data?.message || "Error updating password.";
          set({ error: message, isLoading: false });
          return { success: false, message };
        }
      },

      logout: () => set({ user: null, isLoggedIn: false, error: null }),
    }),
    { name: 'nari-astra-auth' }
  )
);