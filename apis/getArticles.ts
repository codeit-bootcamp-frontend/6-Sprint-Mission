import { axiosInstance } from "./api";

interface GetArticlesParams {
  page: number;
  pageSize: number;
  orderBy: string;
  keyword?: string;
}

interface ArticleType {
  id: number;
  title: string;
  content: string;
  image: string | null;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
  writer: {
    id: number;
    nickname: string;
  };
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
