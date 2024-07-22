import { axiosInstance } from './axios';

export type LikeResponse = {
  updatedAt: string;
  createdAt: string;
  likeCount: number;
  writer: Writer;
  image: string;
  content: string;
  title: string;
  id: number;
  isLiked: boolean;
};

type Writer = {
  nickname: string;
  id: number;
};

export type ErrorMessage = {
  message: string;
};

export const postLike = async (
  articleId: string | undefined,
  token: string | null
): Promise<LikeResponse | ErrorMessage> => {
  try {
    const res = await axiosInstance.post(
      `/articles/${articleId}/like`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.data) throw new Error('No response data');
    return res.data as LikeResponse;
  } catch (err) {
    if (err instanceof Error) {
      return { message: err.message };
    }

    return { message: '좋아요 포스팅 중 알 수 없는 오류가 발생했습니다.' };
  }
};

export const deleteLike = async (
  articleId: string | undefined,
  token: string | null
): Promise<LikeResponse | ErrorMessage> => {
  try {
    const res = await axiosInstance.delete(`/articles/${articleId}/like`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.data) throw new Error('No response data');
    return res.data as LikeResponse;
  } catch (err) {
    if (err instanceof Error) {
      return { message: err.message };
    }

    return { message: '좋아요 취소 중 알 수 없는 오류가 발생했습니다.' };
  }
};
