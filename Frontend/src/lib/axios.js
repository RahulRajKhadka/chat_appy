// In src/lib/axios.js
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const axiosInstance = axios.create({
  baseURL: `${API_URL}/api`,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Auto-detect and set Content-Type
    if (config.data instanceof FormData) {
      // Let browser set Content-Type with boundary for FormData
      delete config.headers['Content-Type'];
    } else if (config.data && typeof config.data === 'object') {
      // Set JSON content type for regular objects
      config.headers['Content-Type'] = 'application/json';
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;
      if (status === 401) {
        // Handle unauthorized
      }
      if (status >= 500) {
        console.error("Server error:", error.response.data);
      }
    }
    return Promise.reject(error);
  }
);