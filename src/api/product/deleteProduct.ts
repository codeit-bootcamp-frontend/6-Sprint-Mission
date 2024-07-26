import { authAxios } from 'api/api';

export const deleteProduct = async (productId: number) => {
  try {
    const response = await authAxios.delete(`products/${productId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
