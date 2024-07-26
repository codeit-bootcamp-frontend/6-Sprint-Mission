import { baseAxios } from 'api/api';
import { STORAGE_KEYS } from 'constants/storageKey';

/**
 * access 토큰 재발급
 */
export const reissueToken = async () => {
  try {
    const response = await baseAxios.post('auth/refresh-token', {
      refreshToken: localStorage.getItem(STORAGE_KEYS.refreshToken),
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
