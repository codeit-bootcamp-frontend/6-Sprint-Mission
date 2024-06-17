import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://panda-market-api.vercel.app/',
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
