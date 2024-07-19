import { IdParam } from "@/types/api";
import axiosInstance from "../axiosInstance";
import { ArticleId } from "@/types/articles";

const getArticlesId = async (id: IdParam): Promise<ArticleId> => {
  try {
    const { data } = await axiosInstance.get<ArticleId>(`/articles/${id}`);
    return data;
  } catch (error) {
    console.error(`Failed to fetch data: ${error}`);
    throw error;
  }
};

export default getArticlesId;
