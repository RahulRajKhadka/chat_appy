import {create} from 'zustand';

export const useChatStore = create((set, get) => ({
  contacts: [],
  chatPartners: [],
  messages: {},
  isLoadingContacts: false,
  isLoadingMessages: false,
    selectedChatPartner: null,
    setContacts: (contacts) => set({ contacts }),
    setChatPartners: (chatPartners) => set({ chatPartners }),
    setMessagesForUser: (userId, messages) =>
        set((state) => ({
                
