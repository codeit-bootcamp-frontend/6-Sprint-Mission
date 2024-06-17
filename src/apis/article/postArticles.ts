import { Token } from "@/types/api";
import axiosInstance from "../axiosInstance";
import { PostData } from "@/components/addBoardComponents/ArticleForm";

const postArticles = async (
  option: PostData = {
    content: "",
    title: "",
    image: null,
  }
) => {
  const { image, ...restOption } = option;
  const payload = image ? option : restOption;

  try {
    await axiosInstance.post<any>("/articles", payload);
  } catch (error) {
    console.error(`Failed to fetch data: ${error}`);
    throw error;
  }
};

export default postArticles;
