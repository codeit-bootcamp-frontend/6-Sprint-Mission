import axios, { AxiosRequestConfig, AxiosError } from "axios";
import {
  getToken,
  loadTokenFromLocalStorage,
  saveTokenToLocalStorage,
} from "@/utils/localStorageToken";
import PostRefreshToken from "@/apis/auth/PostRefreshToken";

interface InternalAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

const axiosConfig: AxiosRequestConfig = {
  baseURL: `${process.env.BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

const axiosInstance = axios.create(axiosConfig);

axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = await getToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig;
    if (!originalRequest.headers) {
      return Promise.reject(error);
    }
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const token = loadTokenFromLocalStorage();
      if (token?.refreshToken) {
        try {
          const newToken = await PostRefreshToken(token.refreshToken);
          saveTokenToLocalStorage(newToken);
          originalRequest.headers.Authorization = `Bearer ${newToken.accessToken}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          console.error(`Failed to refresh token: ${refreshError}`);
          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
