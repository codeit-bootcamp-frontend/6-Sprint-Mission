import axiosInstance  from "./api";
import { ArticleType } from "@/constants/type";

interface GetArticlesParams {
  page: number;
  pageSize: number;
  orderBy: string;
  keyword?: string;
}


interface Articles {
  list: ArticleType[];
  totalCount: number;
}

export type GetArticlesType = (
  prop: GetArticlesParams
) => Promise<Articles | undefined>;

const getArticles: GetArticlesType = async ({
  page,
  pageSize,
  orderBy,
  keyword,
}) => {
  try {
    const { data } = await axiosInstance.get<Articles>(`articles`, {
      params: { page, pageSize, orderBy, keyword },
    });
    return data;
  } catch (error) {
    console.error("APP ERROR: ", error);
    if (error instanceof Error) {
      throw new Error(`게시글을 가져오는 데 실패했습니다: ${error.message}`);
    }
    throw new Error(
      "알 수 없는 오류로 인해 게시글을 가져오는 데 실패했습니다."
    );
  }
};

export { getArticles };
