import axiosInstance from "../axiosInstance";

const postArticlesComment = async (content: string, id: string) => {
  try {
    await axiosInstance.post<any>(`/articles/${id}/comments`, { content });
  } catch (error) {
    console.error(`Failed to fetch data: ${error}`);
    throw error;
  }
};

export default postArticlesComment;
