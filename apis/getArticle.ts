import { axiosInstance } from "./api";

interface GetArticleParams {
  articleId: number;
}

interface ArticleType {
  updatedAt: string;
  createdAt: string;
  likeCount: number;
  writer: {
    id: number;
    nickname: string;
  };
  image: string | null;
  content: string;
  title: string;
  id: number;
}

export type GetArticleType = (prop: GetArticleParams) => Promise<ArticleType>;

const getArticle: GetArticleType = async ({ articleId }) => {
  try {
    const { data } = await axiosInstance.get<ArticleType>(
      `articles/${articleId}`
    );
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

export default getArticle;
