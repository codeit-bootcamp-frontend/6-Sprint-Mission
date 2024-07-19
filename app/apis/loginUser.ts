import { AxiosError } from 'axios';

import { instance } from './Axios';

type LoginData = {
  email: string;
  password: string;
};

type LoginResponse = {
  accessToken: string;
  refreshToken: string;
};

const loginUser = async (
  data: LoginData,
): Promise<LoginResponse | undefined> => {
  try {
    const response = await instance.post<LoginResponse>('/auth/signIn', data);
    const { accessToken, refreshToken } = response.data;

    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
    }

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('요청 실패 (Axios error):', error.message);
    } else {
      console.error('요청 실패 (Unknown error):', error);
    }
    return undefined;
  }
};

export default loginUser;
