import { AxiosError } from 'axios';

import { instance } from './Axios';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  tags: string[];
  images: string[];
  favoriteCount: number;
  createdAt: string;
  ownerId: string;
}

export interface ProductResponse {
  totalCount: number;
  list: Product[];
}

export interface GetProductsParams {
  page?: number;
  pageSize?: number;
  orderBy?: 'favorite' | 'recent';
  keyword?: string;
}

const handleAxiosError = (error: unknown) => {
  if (error instanceof AxiosError) {
    console.error('Axios error:', error.message);
  } else {
    console.error('Unknown error:', error);
  }
};

export const getProducts = async (
  params: GetProductsParams = {},
): Promise<ProductResponse | undefined> => {
  try {
    const response = await instance.get<ProductResponse>('/products', {
      params: {
        page: params.page || 1,
        pageSize: params.pageSize || 10,
        orderBy: params.orderBy,
        keyword: params.keyword,
      },
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    return undefined;
  }
};
