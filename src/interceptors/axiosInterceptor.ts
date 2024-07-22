import axiosInstance from '../api/axiosInstance';

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      const refreshToken = localStorage.getItem('refreshToken');
      const response = await axiosInstance.post('auth/refresh-token', {
        refreshToken,
      });

      if (response.status === 200) {
        const newAccessToken = response?.data?.accessToken;
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;

        return axiosInstance(error.config);
      }
    }

    return Promise.reject(error);
  },
);
