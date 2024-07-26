import { authAxios } from 'api/api';

export const updateComment = async ({
  commentId,
  content,
}: {
  commentId: number;
  content: string;
}) => {
  try {
    const response = await authAxios.patch(`comments/${commentId}`, {
      content,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
