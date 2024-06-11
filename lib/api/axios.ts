import axios from 'axios';

export const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
