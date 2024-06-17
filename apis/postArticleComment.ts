import axiosInstance  from "./api";
import { ArticleComment } from "@/constants/type";

interface PostArticleCommentParams {
  articleId: number;
  content: string;
}
export type PostArticleComment = (
  prop: PostArticleCommentParams
) => Promise<ArticleComment>;

const postArticleComment: PostArticleComment = async ({
  articleId,
  content,
}) => {
  try {
    const { data } = await axiosInstance.post<ArticleComment>(
      `articles/${articleId}/comments`,
      { content },
    );
    return data;
  } catch (error) {
    console.error("APP ERROR: ", error);
    if (error instanceof Error) {
      throw new Error(`댓글을 등록할 수 없습니다`);
    }
    throw new Error("알 수 없는 오류로 댓글을 등록할 수 없습니다.");
  }
};

export default postArticleComment;
