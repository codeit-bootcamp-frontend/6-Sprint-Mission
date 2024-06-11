import axiosInstance from './axios';

type ArticleType = {
  image?: string;
  content: string;
  title: string;
};

export const postArticle = async (
  title: string,
  content: string,
  token: string,
  image?: string | undefined
): Promise<ArticleType> => {
  try {
    const response = await axiosInstance.post(
      `/articles`,
      { content, title, image },
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
