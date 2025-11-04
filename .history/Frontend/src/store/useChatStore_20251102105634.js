import {create} from 'zustand';

export const useChatStore = create((set, get) => ({
  contacts: [],
  chat: [],
  messages: {},
  activeTab:"Chats",
  isLoadingUser: false,
  isLoadingMessages: false,
isSoundEnabled:localStorage.getItem("isSoundEnabled")==true

toggleSound:()=>{
    localStorage.setItems("isSoundEnabled", !get().isSoundEnabled)
    set(isSoundEnabled:!get().isSoundEnabled)}
},

setActiveTab:(tab)