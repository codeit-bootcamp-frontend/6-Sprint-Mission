import axiosInstance from './axios';

type CommentType = {
  content: string;
};

export const postComment = async (content: string, articleId: string, token: string): Promise<CommentType> => {
  try {
    const response = await axiosInstance.post(
      `/articles/${articleId}/comments`,
      { content },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Failed to post comment: ${error}`);
    throw new Error('댓글 작성에 실패했습니다');
  }
};
