import { AxiosError } from 'axios';
import { useQuery } from 'react-query';

import axiosInstance from './apiClient';

// axios와 useQuery를 사용하여 fetch하였습니다.
export default function useFetchItems(paramsOptions: {
  page: number;
  pageSize: number;
  orderBy: string;
}) {
  const { page, pageSize, orderBy } = paramsOptions;

  const fetchItems = async () => {
    const response = await axiosInstance.get(
      `${process.env.REACT_APP_API_URL}/products`,
      {
        params: {
          page,
          pageSize,
          orderBy,
        },
      },
    );

    return response.data;
  };

  return useQuery<any, AxiosError>(
    ['products', page, pageSize, orderBy],
    fetchItems,
  );
}
