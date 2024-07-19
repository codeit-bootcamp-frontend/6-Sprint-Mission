import { AxiosError } from 'axios';

import { instance } from './Axios';

type SignUpData = {
  email: string;
  password: string;
  passwordConfirmation: string;
  nickname: string;
};

type SignUpResponse = {
  token: string;
};

const fetchData = async <T>(
  url: string,
  data?: SignUpData,
): Promise<T | undefined> => {
  try {
    const response = await instance.post<T>(url, JSON.stringify(data));
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

export const signUpUser = (
  data: SignUpData,
): Promise<SignUpResponse | undefined> => {
  return fetchData<SignUpResponse>('/auth/signup', data);
};
