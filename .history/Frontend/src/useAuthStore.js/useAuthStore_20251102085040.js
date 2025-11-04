
import {create} from 'zustand';

export const useAuthStore = create((set) => ({
 authUser:null,
 isCheckingAuth:true,

 checkAuth: async () => {
    try {
        const response = await azxiosInstance.get('/auth/checkAuth');
        set({authUser: response.data.user, isCheckingAuth:false});
    } catch (error) {
        set({authUser: null, isCheckingAuth:false});
    }
}));
