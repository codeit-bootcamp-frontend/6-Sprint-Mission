import { tokenRefresh } from "@/utils/tokenRefresh";
import axios, { AxiosError } from "axios";

const instance = axios.create({
  baseURL: "https://panda-market-api.vercel.app/",
});

instance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    alert("로그인이 필요합니다.");
    window.location.href = "/login";
    return config;
  }

  config.headers["Authorization"] = `Bearer ${accessToken}`;

  return config;
});

instance.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest.headers._retry
    ) {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        await tokenRefresh(refreshToken);
      }
      originalRequest.headers._retry = true;
      return instance(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default instance;
