import axios from 'axios';

export const azxiosInstance = axios.create({
    BASEurl: import.meta.env.MODE == "development" ? "http://localhost:3000" : "https://your-production-url.com"