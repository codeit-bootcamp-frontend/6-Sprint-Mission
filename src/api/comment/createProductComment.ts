import { authAxios } from 'api/api';

export const createProductComment = async ({
  productId,
  content,
}: {
  productId: number;
  content: string;
}) => {
  try {
    const response = await authAxios.post(`products/${productId}/comments`, {
      content,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
