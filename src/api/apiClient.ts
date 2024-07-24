import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// 액세스 토큰을 로컬 스토리지에서 가져오는 함수
const getAccessToken = () => localStorage.getItem('accessToken');

// 리프레시 토큰을 이용해 새 액세스 토큰을 발급받는 함수
const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/refresh-token`,
      { refreshToken },
    );
    const { accessToken } = response.data;
    localStorage.setItem('accessToken', accessToken);
    return accessToken;
  } catch (error) {
    // 리프레시 토큰도 만료된 경우 로그아웃 처리
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    return null;
  }
};

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;
    if (error.response?.status === 401) {
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        originalRequest!.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest!);
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
