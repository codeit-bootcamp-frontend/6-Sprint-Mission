import { baseAxios } from './api';
import { type OrderType } from 'constants/orderOption';
import { isAxiosError, AxiosResponse } from 'axios';
import { ProductResponse } from 'types/item';

interface getProductDetailProps {
  page?: number;
  pageSize?: number;
  orderBy?: OrderType;
}

export const getProducts = async ({
  page = 1,
  pageSize = 10,
  orderBy = 'recent',
}: getProductDetailProps) => {
  try {
    const response: AxiosResponse<ProductResponse> = await baseAxios.get(
      'products',
      {
        params: {
          page,
          pageSize,
          orderBy,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw error.response?.data;
    } else {
      throw new Error('상품을 불러오기 실패');
    }
  }
};
