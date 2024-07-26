import axios, { isAxiosError } from 'axios';
import { STORAGE_KEYS } from 'constants/storageKey';
import { reissueToken } from './auth/reissueToken';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export const baseAxios = axios.create({
  baseURL: baseUrl,
  timeout: 20000,
});

/** 토큰 있는 API 요청 클라이언트 */
export const authAxios = axios.create({
  baseURL: baseUrl,
  timeout: 30000,
});

authAxios.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem(
    STORAGE_KEYS.accessToken
  )}`;

  return config;
});

authAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { config } = error;

    if (isAxiosError(error)) {
      if (error.response?.status === 401) {
        const res = await reissueToken();
        localStorage.setItem(STORAGE_KEYS.accessToken, res.accessToken);

        return axios({
          ...config,
          headers: {
            ...config.headers,
            Authorization: `Bearer ${localStorage.getItem(
              STORAGE_KEYS.accessToken
            )}`,
          },
        });
      }
    }

    return Promise.reject(error);
  }
);
