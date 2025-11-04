import axios from 'axios';

export const azxiosInstance = axios.create({
    BASEurl:import.meta.env.MODE=="development"