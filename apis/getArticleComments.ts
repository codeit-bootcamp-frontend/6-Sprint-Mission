import { axiosInstance } from "./api";

interface GetArticleCommentsParams {
  articleId: number;
  limit: number;
  cursor?: number;
}

interface GetArticleCommentsReturn {
  list: {
    id: number;
    content: string;
    createdAt: string;
    updatedAt: string;
    writer: {
      id: number;
      nickname: string;
      image: string | null;
    };
  }[];
  nextCursor: number;
}


export type getArticleCommentsType = (
  prop: GetArticleCommentsParams
) => Promise<GetArticleCommentsReturn>;

const getArticleComments: getArticleCommentsType = async ({
  articleId,
  limit,
  cursor,
}) => {
  try {
    const { data } = await axiosInstance.get<GetArticleCommentsReturn>(
      `articles/${articleId}/comments`,
      {
        params: { limit, cursor },
      }
    );
    return data;
  } catch (error) {
    console.error("APP ERROR: ", error);
    if (error instanceof Error) {
      throw new Error(`댓글을 가져오는 데 실패했습니다: ${error.message}`);
    }
    throw new Error("알 수 없는 오류가 발생했어요 ㅠ.");
  }
};

export default getArticleComments;
