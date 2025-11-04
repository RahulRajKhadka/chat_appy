import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { signup } from "../../../Backend/src/controllers/auth.controller";

export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSignUp:false

  checkAuth: async () => {
    try {
      const response = await axiosInstance.get("/auth/check");
      set({ authUser: response.data.user, isCheckingAuth: false });
    } catch (error) {
        console.error("Error checking auth:", error);
      set({ authUser: null, isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set
    try {
      const response = await axiosInstance.post("/auth/signup", data);
      set({ authUser: response.data.user, isSignUp: false });
    } catch (error) {
      console.error("Error signing up:", error);
      set({ authUser: null, isSignUp: false });
    }
  },

}));
