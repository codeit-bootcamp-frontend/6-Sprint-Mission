import { axiosInstance } from './axios';

type ImageUrlType = {
  url: string;
};
export const postImageUrl = async (formData: FormData, token: string): Promise<ImageUrlType> => {
  try {
    const response = await axiosInstance.post('images/upload', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch items: ${error}`);
    throw new Error('정보를 불러오는데 실패했습니다');
  }
};
