import { ArticleId } from "@/types/articles";
import axiosInstance from "../axiosInstance";

interface GetArticlesIdCommentResponse {
  list: ArticleId[];
  nextCursor: null | string;
}

const getArticlesIdComment = async (
  articleId?: string | string[]
): Promise<GetArticlesIdCommentResponse> => {
  try {
    const { data } = await axiosInstance.get<GetArticlesIdCommentResponse>(
      `/articles/${articleId}/comments?limit=100`
    );
    return data;
  } catch (error) {
    console.error(`Failed to fetch data: ${error}`);
    throw error;
  }
};

export default getArticlesIdComment;
