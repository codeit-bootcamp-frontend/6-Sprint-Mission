import { axiosInstance } from "./api";

interface PostArticleCommentParams {
  articleId: number;
  content: string;
}

interface Response {
  writer: {
    image: string;
    nickname: string;
    id: number;
  };
  updatedAt: string;
  createdAt: string;
  content: string;
  id: number;
}

export type PostArticleComment = (
  prop: PostArticleCommentParams
) => Promise<Response>;
//Post 요청일 경우 보통 리스폰스를 받아서 확인하나요?

const postArticleComment: PostArticleComment = async ({
  articleId,
  content,
}) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const { data } = await axiosInstance.post<Response>(
      `articles/${articleId}/comments`,
      { content },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
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
