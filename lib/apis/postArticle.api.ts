import postInstance from "../instanceWithToken";
import { AxiosResponse } from "axios";

type FormDataResponse = {
  updatedAt: string;
  createdAt: string;
  likeCount: number;
  writer: {
    nickname: string;
    id: number;
  };
  image: string;
  content: string;
  title: string;

  id: number;
};

export interface ArticleFormData {
  title?: string;
  content?: string;
  image?: string | null;
}

// 게시글 등록용 POST API
export async function postArticle(formData: ArticleFormData) {
  try {
    const response: AxiosResponse<FormDataResponse> = await postInstance.post(`/articles`, formData);
    return response.data;
  } catch (e) {
    console.error(`error : ${e}`);
    throw new Error();
  }
}
