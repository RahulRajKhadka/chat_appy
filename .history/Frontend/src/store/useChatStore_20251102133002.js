import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useChatStore = create((set, get) => ({
  contacts: [],
  chat: [],
  chatPartners:[],
  messages: {},
  activeTab: "chats",
  selectedUser: null,
  isLoadingUser: false,
  isLoadingMessages: false,
  isSoundEnabled: localStorage.getItem("isSoundEnabled") === "true",

  toggleSound: () => {
    const newValue = !get().isSoundEnabled;
    localStorage.setItem("isSoundEnabled", newValue);
    set({ isSoundEnabled: newValue });
  },

  setActiveTab: (tab) => set({ activeTab: tab }),

  setSelectedUser: (user) => set({ selectedUser: user }),

  getAllContacts: async () => {
    set({ isLoadingUser: true });
    try {
      const response = await axiosInstance.get("/message/contacts");
      set({ contacts: response.data.contacts || [] });
    } catch (error) {
      console.error("Error fetching contacts:", error);
      set({ contacts: [] });
    } finally {
      set({ isLoadingUser: false });
    }
  },

  getMessagesByUser: async (userId) => {
    set({ isLoadingMessages: true });
    try {
      const response = await axiosInstance.get(`/messages/${userId}`);
      set((state) => ({
        messages: { ...state.messages, [userId]: response.data.messages || [] },
      }));
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      set({ isLoadingMessages: false });
    }
  },

  sendMessage: async (userId, messageData) => {
  try {
    const response = await axiosInstance.post(
      `/messages/send/${userId}`, 
      messageData 
    );
    set((state) => ({
      messages: {
        ...state.messages,
        [userId]: [...(state.messages[userId] || []), response.data.message],
      },
    }));
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
},
}));
