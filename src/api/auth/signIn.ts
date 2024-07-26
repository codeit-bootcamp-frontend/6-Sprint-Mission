import { baseAxios } from 'api/api';
import { LoginFormData } from 'types/auth';

/**
 * 로그인
 */
export const signIn = async (signInForm: LoginFormData) => {
  try {
    const response = await baseAxios.post('auth/signIn', signInForm);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
