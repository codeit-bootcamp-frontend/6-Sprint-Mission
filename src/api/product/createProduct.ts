import { authAxios } from 'api/api';
import { ProductFormData } from 'types/product';

export const createProduct = async (product: ProductFormData) => {
  try {
    const response = await authAxios.post('products', product);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
