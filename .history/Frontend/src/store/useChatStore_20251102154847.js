import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  allcontacts: [],
  chatPartners: [],
  messages: {},
  activeTab: "chats",
  selectedUser: null,
  isLoadingContacts: false,
  
  isLoadingChatPartners: false,
  isLoadingMessages: false,
  isSendingMessage: false,
  isSoundEnabled: localStorage.getItem("isSoundEnabled") === "true",

  toggleSound: () => {
    const newValue = !get().isSoundEnabled;
    localStorage.setItem("isSoundEnabled", newValue);
    set({ isSoundEnabled: newValue });
  },

  setActiveTab: (tab) => set({ activeTab: tab.toLowerCase() }),

  setSelectedUser: (user) => {
    set({ selectedUser: user });
    // Load messages when user is selected
    if (user) {
      get().getMessagesByUser(user._id);
    }
  },

  // Get all users (contacts)
  getAllContacts: async () => {
    set({ isLoadingContacts: true });
    try {
      const response = await axiosInstance.get("/messages/contacts");
      set({ contacts: response.data.contacts || [] });
    } catch (error) {
      console.error("Error fetching contacts:", error);
      toast.error("Failed to load contacts");
      set({ contacts: [] });
    } finally {
      set({ isLoadingContacts: false });
    }
  },

  // Get users you've chatted with
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

  // Get messages with a specific user
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

  // Send a message
  sendMessage: async (messageData) => {
    const { selectedUser } = get();
    if (!selectedUser) {
      toast.error("No user selected");
      return;
    }

    set({ isSendingMessage: true });
    try {
      const response = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        {
          text: messageData.text || "",
          image: messageData.image || null,
        }
      );

      
      set((state) => ({
        messages: {
          ...state.messages,
          [selectedUser._id]: [
            ...(state.messages[selectedUser._id] || []),
            response.data.message,
          ],
        },
      }));

      return response.data.message;
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message");
      throw error;
    } finally {
      set({ isSendingMessage: false });
    }
  },


  subscribeToMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.on("newMessage", (message) => {
      const { selectedUser } = get();
      
  
      if (selectedUser?._id === message.senderId || selectedUser?._id === message.receiverId) {
        set((state) => ({
          messages: {
            ...state.messages,
            [message.senderId === useAuthStore.getState().authUser?._id ? message.receiverId : message.senderId]: [
              ...(state.messages[message.senderId === useAuthStore.getState().authUser?._id ? message.receiverId : message.senderId] || []),
              message,
            ],
          },
        }));
      }

   
      if (get().isSoundEnabled && message.senderId !== useAuthStore.getState().authUser?._id) {
        const audio = new Audio("/notification.mp3");
        audio.play().catch(console.error);
      }

    
      get().getChatPartners();
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;
    socket.off("newMessage");
  },
}));