import axios, { AxiosError } from "axios";

const instance = axios.create({
  baseURL: "https://panda-market-api.vercel.app",
});

let isRefreshing = false;
let refreshPromise: Promise<any> | null = null;

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !isRefreshing) {
      isRefreshing = true;

      if (!refreshPromise) {
        refreshPromise = instance.post("/auth/refresh-token");

        try {
          const { data } = await refreshPromise;
          localStorage.setItem("accessToken", data.accessToken);
          originalRequest!.headers.Authorization = `Bearer ${data.accessToken}`;
          isRefreshing = false;
          refreshPromise = null;
          return instance(originalRequest!); // 재요청
        } catch (refreshError) {
          console.error("Refresh token request failed:", refreshError);
          isRefreshing = false;
          refreshPromise = null;
          return Promise.reject(refreshError);
        }
      }
      return refreshPromise.then(() => instance(originalRequest!));
    }
    return Promise.reject(error);
  }
);

export default instance;
