import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.MODE === "development" 
  ? "http://localhost:3000" 
  : window.location.origin;

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isSignUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  socket: null,
  onlineUsers: [],

  checkAuth: async () => {
    set({ isCheckingAuth: true }); // ✅ Set to true at start
    try {
      const response = await axiosInstance.get("/auth/check");
      set({ authUser: response.data.user });
      // get().connectSocket();
    } catch (error) {
      // ✅ Silent fail - don't show error toast on page load
      if (error.response?.status !== 401) {
        console.error("Error checking auth:", error);
      }
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false }); // ✅ Always set to false when done
    }
  },

  signup: async (data) => {
    set({ isSignUp: true });
    try {
      const response = await axiosInstance.post("/auth/signup", data);
      set({ authUser: response.data.user });
      toast.success("Account created successfully!");
      get().connectSocket();
    } catch (error) {
      const message = error.response?.data?.message || "Signup failed";
      toast.error(message);
      throw error;
    } finally {
      set({ isSignUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data.user });
      toast.success("Logged in successfully");
      get().connectSocket();
    } catch (error) {
      const message = error.response?.data?.message || "Login failed";
      toast.error(message);
      throw error;
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch (error) {
      toast.error("Error logging out");
      console.log("Logout error:", error);
    }
  },

  // ✅ UPDATED: Now accepts FormData or regular object
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      // Create FormData if data contains a File object
      let payload = data;
      
      if (data.profilePic instanceof File) {
        const formData = new FormData();
        
        // Append fullName if it exists
        if (data.fullName) {
          formData.append("fullName", data.fullName);
        }
        
        // Append profilePic file
        formData.append("profilePic", data.profilePic);
        
        payload = formData;
      }

      const res = await axiosInstance.put("/auth/update-profile", payload, {
        headers: payload instanceof FormData 
          ? { "Content-Type": "multipart/form-data" }
          : { "Content-Type": "application/json" }
      });

      set({ authUser: res.data.user });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("Error in update profile:", error);
      const message = error.response?.data?.message || "Update failed";
      toast.error(message);
      throw error;
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser, socket } = get();
    if (!authUser || socket?.connected) return;

    const socketInstance = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
      withCredentials: true,
    });

    socketInstance.connect();
    set({ socket: socketInstance });

    socketInstance.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  disconnectSocket: () => {
    const { socket } = get();
    if (socket?.connected) {
      socket.disconnect();
      set({ socket: null });
    }
  },
}));