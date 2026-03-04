/* eslint-disable no-unused-vars */
import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../api/axios.config";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isLoggedIn: false,
      isLoading: false,
      error: null,

      login: async (credentials) => {
        set({
          isLoading: true,
          error: null,
        });
        try {
          const response =
            await api.post(
              "/users/login",
              credentials,
            );
          localStorage.setItem(
            "token",
            response.data.token,
          );
          set({
            user: response.data.user,
            isLoggedIn: true,
            isLoading: false,
          });
          return { success: true };
        } catch (err) {
          const message =
            err.response?.data
              ?.message ||
            "Invalid credentials.";
          set({
            error: message,
            isLoading: false,
          });
          return {
            success: false,
            message,
          };
        }
      },

      register: async (userData) => {
        set({
          isLoading: true,
          error: null,
        });
        try {
          const response =
            await api.post(
              "/users/register",
              userData,
            );
          localStorage.setItem(
            "token",
            response.data.token,
          );
          set({
            user: response.data.user,
            isLoggedIn: true,
            isLoading: false,
          });
          return { success: true };
        } catch (err) {
          const message =
            err.response?.data
              ?.message ||
            "Registration failed.";
          set({
            error: message,
            isLoading: false,
          });
          return {
            success: false,
            message,
          };
        }
      },

      googleLogin: async (token) => {
        set({
          isLoading: true,
          error: null,
        });
        try {
          const response =
            await api.post(
              "/users/google-login",
              { token },
            );
          const {
            user,
            token: jwtToken,
          } = response.data;
          localStorage.setItem(
            "token",
            jwtToken,
          );
          set({
            user,
            isLoggedIn: true,
            isLoading: false,
          });
          return { success: true };
        } catch (err) {
          set({
            error:
              err.response?.data
                ?.message ||
              "Google login failed",
            isLoading: false,
          });
          return { success: false };
        }
      },

      changePassword: async (
        passwordData,
      ) => {
        set({
          isLoading: true,
          error: null,
        });
        try {
          const userEmail =
            get().user?.email;
          const response =
            await api.put(
              "/users/change-password",
              {
                email: userEmail,
                ...passwordData,
              },
            );
          set({ isLoading: false });
          return {
            success: true,
            message:
              response.data.message,
          };
        } catch (err) {
          const message =
            err.response?.data
              ?.message ||
            "Error updating password.";
          set({
            error: message,
            isLoading: false,
          });
          return {
            success: false,
            message,
          };
        }
      },

      logout: () => {
        localStorage.removeItem(
          "token",
        );
        set({
          user: null,
          isLoggedIn: false,
          error: null,
        });
      },

      fetchAddresses: async () => {
        try {
          const response =
            await api.get("/addresses");
          return response.data;
        } catch (err) {
          console.error(
            "Error fetching addresses",
            err,
          );
          return [];
        }
      },
      addAddress: async (
        addressData,
      ) => {
        try {
          const response =
            await api.post(
              "/addresses",
              addressData,
            );
          return {
            success: true,
            message:
              "Address added successfully",
          };
        } catch (err) {
          return {
            success: false,
            message:
              err.response?.data
                ?.message ||
              "Failed to add address",
          };
        }
      },

      deleteAddress: async (addressId) => {
        try {
          await api.delete(`/addresses/${addressId}`);
          return {
            success: true,
            message: "Address deleted successfully",
          };
        } catch (err) {
          return {
            success: false,
            message:
              err.response?.data?.message || "Failed to delete address",
          };
        }
      },
    }),
    { name: "nari-astra-auth" },
  ),
);
