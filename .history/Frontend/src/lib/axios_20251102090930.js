import axios from 'axios';

export const axiosInstance = axios.create({
    BASEURL: import.meta.env.MODE == "development" ? "http://localhost:3000" : "https://your-production-url.com",
    withCredentials:true,
});