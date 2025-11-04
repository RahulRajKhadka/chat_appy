import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useChatStore = create((set, get) => ({
  contacts: [],
  chatPartners: [], // ✅ Add this for chat list
  messages: {},
  activeTab: "chats", // ✅ lowercase to match comparison
  selectedUser: null,
  isLoadingUser: false,
  isLoadingMessages: false,
  isLoadingChatPartners: false,
  isSoundEnabled: localStorage.getItem("isSoundEnabled") === "true",

  toggleSound: () => {
    const newValue = !get().isSoundEnabled;
    localStorage.setItem("isSoundEnabled", newValue);
    set({ isSoundEnabled: newValue });
  },

  setActiveTab: (tab) => set({ activeTab: tab.toLowerCase() }), // ✅ Normalize

  setSelectedUser: (user) => set({ selectedUser: user }),

  // ✅ FIXED: Correct API path
  getAllContacts: async () => {
    set({ isLoadingUser: true });
    try {
      const response = await axiosInstance.get("/messages/contacts");
      set({ contacts: response.data.contacts || [] });
    } catch (error) {
      console.error("Error fetching contacts:", error);
      toast.error("Failed to load contacts");
      set({ contacts: [] });
    } finally {
      set({ isLoadingUser: false });
    }
  },

  // ✅ NEW: Get chat partners (people you've chatted with)
  getChatPartners: async () => {
    set({ isLoadingChatPartners: true });
    try {
      const response = await axiosInstance.get("/messages/chats");
      set({ chatPartners: response.data.chatPartners || [] });
    } catch (error) {
      console.error("Error fetching chat partners:", error);
      toast.error("Failed to load chats");
      set({ chatPartners: [] });
    } finally {
      set({ isLoadingChatPartners: false });
    }
  },

  // ✅ FIXED: Correct API path
  getMessagesByUser: async (userId) => {
    set({ isLoadingMessages: true });
    try {
      const response = await axiosInstance.get(`/messages/${userId}`);
      set((state) => ({
        messages: {
          ...state.messages,
          [userId]: response.data.messages || [],
        },
      }));
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast.error("Failed to load messages");
    } finally {
      set({ isLoadingMessages: false });
    }
  },

  // ✅ FIXED: Correct field names and API path
  sendMessage: async (userId, messageData) => {
    try {
      // Ensure correct field names
      const payload = {
        text: messageData.text || "",
        image: messageData.image || null,
      };

      const response = await axiosInstance.post(
        `/messages/send/${userId}`,
        payload
      );

      // Update local state
      set((state) => ({
        messages: {
          ...state.messages,
          [userId]: [...(state.messages[userId] || []), response.data.message],
        },
      }));

      return response.data.message;
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message");
      throw error;
    }
  },

  // ✅ NEW: Subscribe to socket messages
  subscribeToMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.on("newMessage", (message) => {
      const { selectedUser } = get();
      // Only update if we're viewing this conversation
      if (selectedUser?._id === message.senderId) {
        set((state) => ({
          messages: {
            ...state.messages,
            [message.senderId]: [
              ...(state.messages[message.senderId] || []),
              message,
            ],
          },
        }));
      }

      // Refresh chat partners list to update last message
      get().getChatPartners();
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;
    socket.off("newMessage");
  },
}));
