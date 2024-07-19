import createQueryParams from "@/utils/createQueryParams";
import axiosInstance from "../axiosInstance";
import { GetArticlesResponse } from "@/types/articles";

interface GetArticlesParams {
  page?: number;
  pageSize?: number | string;
  orderBy?: "like" | "recent";
  keyword?: string;
}

/** 
 * @description 게시글 검색에 쓰는 쿼리 옵션
 * @params option {  
    page: 1,
    pageSize: "",
    orderBy: "like" | "recent",
    keyword: "",  }
 * @ref https://panda-market-api.vercel.app/#/articles
 */

const getArticles = async (
  option: GetArticlesParams = {
    page: 1,
    pageSize: 10,
    orderBy: "like",
    keyword: "",
  }
): Promise<GetArticlesResponse> => {
  const articlesParams = createQueryParams(option);
  try {
    const { data } = await axiosInstance.get<GetArticlesResponse>(
      `/articles?${articlesParams}`
    );
    return data;
  } catch (error) {
    console.error(`Failed to fetch data: ${error}`);
    throw error;
  }
};

export default getArticles;
