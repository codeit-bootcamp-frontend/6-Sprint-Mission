import axios, {
  Axios,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from 'axios';

import Cookies from 'js-cookie';
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
});

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    const token = Cookies.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // 요청이 실패할 경우 실행됩니다.
    return Promise.reject(error);
  }
);
export default instance;

