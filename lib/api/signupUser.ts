import axiosInstance from './axios';

export const signUpUser = async (email: string, nickname: string, password: string, passwordConfirmation: string) => {
  try {
    const response = await axiosInstance.post('auth/signUp', { email, password, nickname, passwordConfirmation });
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch items: ${error}`);
    throw new Error('정보를 불러오는데 실패했습니다');
  }
};
