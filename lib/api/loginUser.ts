import axiosInstance from './axios';

type LoginResponse = {
  accessToken: string;
};

export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.post('auth/signIn', { email, password });
    const { accessToken } = response.data;
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', accessToken);
    }
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch items: ${error}`);
    throw new Error('정보를 불러오는데 실패했습니다');
  }
};
