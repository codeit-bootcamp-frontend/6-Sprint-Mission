import { axiosInstance } from '@/lib/api/axios';
import { AxiosInstance } from 'axios';
import { StringSchema } from 'yup';

type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  user: User;
};

type User = {
  id: number;
  email: string;
  image: null;
  nickname: string;
  updatedAt: string;
  createdAt: string;
};

export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.post('auth/signIn', { email, password });
    const { accessToken, refreshToken } = response.data;
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('accessToken', accessToken);
      sessionStorage.setItem('refreshToken', refreshToken);
    }
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch items: ${error}`);
    throw new Error('정보를 불러오는데 실패했습니다');
  }
};

export const signUpUser = async (email: string, password: string, nickname?: string, passwordConfirmation?: string) => {
  try {
    const response = await axiosInstance.post('auth/signUp', { email, password, nickname, passwordConfirmation });
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch items: ${error}`);
    throw new Error('정보를 불러오는데 실패했습니다');
  }
};

export async function postRefreshToken(axiosInstance: AxiosInstance) {
  axiosInstance.interceptors.request.use(
    config => {
      const accessToken = sessionStorage.getItem('accessToken');
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    response => response,
    async error => {
      const { config, response } = error;
      console.error('API call error:', error);

      if (
        response &&
        response.status === 401 &&
        response.data &&
        response.data.message === 'Unauthorized' &&
        !config._retry
      ) {
        config._retry = true;
        const refreshToken = sessionStorage.getItem('refreshToken');
        try {
          const refreshResponse = await axiosInstance.post('/auth/refresh-token', { refreshToken });

          if (refreshResponse.status === 200) {
            const { accessToken, refreshToken: newRefreshToken } = refreshResponse.data;
            sessionStorage.setItem('accessToken', accessToken);

            if (newRefreshToken) {
              sessionStorage.setItem('refreshToken', newRefreshToken);
            }

            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            return axiosInstance(config);
          }
        } catch (refreshError) {
          console.error('Refresh token error:', refreshError);
          sessionStorage.removeItem('accessToken');
          sessionStorage.removeItem('refreshToken');
          alert('LOGIN EXPIRED');
          window.location.replace('/login');
        }
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
}
