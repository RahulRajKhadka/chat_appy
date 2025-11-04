import {create} from 'zustand';

export const useChatStore = create((set, get) => ({
  contacts: [],
  chat: [],
  messages: {},
  activeTab:"Chats",
  isLoadingUser: false,
  isLoadingMessages: false,
isSoundEnabled:localStorage.getItem("isSoundEnabled")==true

toggleSound:()