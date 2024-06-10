import { axiosInstance } from "./axios";

axiosInstance.interceptors.response.use(response => response, async error => {
  if (error.response.status === 401) {
    const response = await axiosInstance.post('/auth/refresh-token', {}, { withCredentials: true });

    if (response.status === 200) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${response.data['accessToken']}`;
      
      return axiosInstance(error.config);
    }
  }

  return error;
});
