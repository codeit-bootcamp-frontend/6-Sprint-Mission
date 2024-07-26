import { baseAxios } from 'api/api';
import { SignUpFormData } from 'types/auth';

/**
 * 회원가입
 */
export const signUp = async (signUpForm: SignUpFormData) => {
  try {
    const response = await baseAxios.post('auth/signUp', signUpForm);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
