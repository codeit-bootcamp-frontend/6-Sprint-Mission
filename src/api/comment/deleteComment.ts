import { authAxios } from 'api/api';

export const deleteComment = async (commentId: number) => {
  try {
    const response = await authAxios.delete(`comments/${commentId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
