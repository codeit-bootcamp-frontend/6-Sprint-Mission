import { axiosInstance } from './axios';

export const postLike = async (articleId: number) => {
  try {
    await axiosInstance.post(`/articles/${articleId}/like`);
  } catch (error) {
    console.error(`Failed to post comment: ${error}`);
    throw new Error('좋아요 버튼 누르기에 실패!');
  }
};

export const deleteLike = async (articleId: number) => {
  try {
    await axiosInstance.delete(`/articles/${articleId}/like`);
  } catch (error) {
    console.error(`Failed to post comment: ${error}`);
    throw new Error('좋아요 버튼 누르기에 실패!');
  }
};
