import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const response = await axiosInstance.get("/auth/check");
      set({ authUser: response.data.user, isCheckingAuth: false });
    } catch (error) {
        conso
      set({ authUser: null, isCheckingAuth: false });
    }
  },
}));
