import {create} from 'zustand';

export const useChatStore = create((set, get) => ({
  contacts: [],
  chatPartners: [],
  messages: {},
  isLoadingContacts: false,
  isLoadingMessages: false,
  
