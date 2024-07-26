import { authAxios } from './api';

/**
 * 이미지 업로드
 */
export const createImage = async (image: File) => {
  const formData = new FormData();
  formData.append('image', image);
  try {
    const response = await authAxios.post('images/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
