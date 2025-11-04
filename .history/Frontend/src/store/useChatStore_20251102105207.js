import {create} from 'zustand';

export const useChatStore = create((set, get) => ({
  contacts: [],
  chat: [],
  messages: {},
  activeTab:"Chats",
  isLoadingUser: false,
  isLoadingMessages: false,
isSoundEnabled:localStorage.getItem("isSoundEnabled")==true

    setContacts: (contacts) => set({ contacts }),
    setChatPartners: (chatPartners) => set({ chatPartners }),
    setMessagesForUser: (userId, messages) =>
        set((state) => ({
            messages: { ...state.messages, [userId]: messages },
        })),
    addMessageForUser: (userId, message) =>
        set((state) => ({
            messages: {
                ...state.messages,
                [userId]: [...(state.messages[userId] || []), message],
            },
        })),
    setIsLoadingContacts: (isLoading) => set({ isLoadingContacts: isLoading }),
    setIsLoadingMessages: (isLoading) => set({ isLoadingMessages: isLoading }),
    setSelectedChatPartner: (partner) => set({ selectedChatPartner: partner }),
}));

 
