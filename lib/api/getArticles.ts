import { ArticleProps, ArticleList } from '@/types';
import axiosInstance from './axios';

export const getArticles = async (
  page: number,
  pageSize: number,
  orderBy: string[] | string,
  keyword?: string[] | string
): Promise<ArticleList> => {
  const query = `page=${page}&pageSize=${pageSize}&orderBy=${orderBy}&keyword=${keyword}`;
  try {
    const response = await axiosInstance.get(`/articles?${query}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch items: ${error}`);
    throw new Error('정보를 불러오는데 실패했습니다');
  }
};

export const getBestArticles = async (page: number, pageSize: number, orderBy: string): Promise<ArticleProps[]> => {
  const query = `page=${page}&pageSize=${pageSize}&orderBy=${orderBy}`;
  try {
    const response = await axiosInstance.get(`/articles?${query}`);
    return response.data.list ?? [];
  } catch (error) {
    console.error(`Failed to fetch items: ${error}`);
    throw new Error('정보를 불러오는데 실패했습니다');
  }
};
