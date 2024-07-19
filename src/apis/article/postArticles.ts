import { Token } from "@/types/api";
import axiosInstance from "../axiosInstance";
import { PostData } from "@/components/addBoardComponents/Form";

const postArticles = async (
  option: PostData = {
    content: "",
    title: "",
    image: null,
  },
  token?: string | null
) => {
  const { image, ...restOption } = option;
  const payload = image ? option : restOption;

  try {
    const { data } = await axiosInstance.post<any>("/articles", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error(`Failed to fetch data: ${error}`);
    throw error;
  }
};

export default postArticles;
