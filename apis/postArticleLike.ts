import { axiosInstance } from "./api";

interface PostArticleLikeParams {
  articleId: number;
}

interface Response {
  updatedAt: string;
  createdAt: string;
  likeCount: number;
  writer: {
    nickname: string;
    id: number;
  };
  image: string | null;
  content: string;
  title: string;
  id: number;
  isLiked: boolean;
}

export type PostArticleLike = (
  prop: PostArticleLikeParams
) => Promise<Response>;

const postArticleLike: PostArticleLike = async ({ articleId }) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const { data } = await axiosInstance.post<Response>(
      `articles/${articleId}/like`,
      {},
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
      throw new Error(`좋아요를 할 수 없습니다`);
    }
    throw new Error("알 수 없는 오류로 인해 좋아요를 할 수 없습니다.");
  }
};

export default postArticleLike;
