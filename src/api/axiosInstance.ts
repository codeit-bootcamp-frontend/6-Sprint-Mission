import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://panda-market-api.vercel.app/',
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
