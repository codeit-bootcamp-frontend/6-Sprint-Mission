import axios from "axios";
import postRefreshToken from "./postRefreshToken";
const panda_market_backend_api = process.env.NEXT_PUBLIC_BASE_URL;

const axiosInstance = axios.create({
  baseURL: panda_market_backend_api,
  timeout: 20000,
});

if (typeof window !== "undefined") {
  axiosInstance.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) return config;
      config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      //토큰 만료
      if (
        error.response?.status === 401 &&
        error.response.data.message === "jwt expired"
      ) {
        try {
          await postRefreshToken();
          const accessToken = localStorage.getItem("accessToken");
          const originalRequest = error.config;
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return await axios(originalRequest);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }
      alert(`에러발생: ${error.response.data.message} `);
      return Promise.reject(error);
    }
  );
}

export default axiosInstance;
