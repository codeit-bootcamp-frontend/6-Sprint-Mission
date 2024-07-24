import { AxiosError } from 'axios';
import { useQuery } from 'react-query';

import axiosInstance from './apiClient';

// axios와 useQuery를 사용하여 fetch하였습니다.
export default function useFetchComments(paramsOptions: {
  productId: number;
  limit: number;
}) {
  const { productId, limit } = paramsOptions;

  const fetchItems = async () => {
    const response = await axiosInstance.get(
      `${process.env.REACT_APP_API_URL}/products/${productId}/comments`,
      {
        params: {
          limit,
        },
      },
    );

    return response.data;
  };

  return useQuery<any, AxiosError>(['comments', productId], fetchItems);
}
