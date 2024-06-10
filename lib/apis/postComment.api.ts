import postInstance from "../instanceWithToken";
import { AxiosResponse } from "axios";

export interface FormDataResponse {
  content: string;
}

interface CommentResponse {
  writer: {
    image: string;
    nickname: string;
    id: number;
  };
  updatedAt: Date;
  createdAt: Date;
  content: string;
  id: number;
}

// 댓글 등록용 API
export async function postComment(formData: FormDataResponse, id: string | string[] | undefined) {
  try {
    const response: AxiosResponse<CommentResponse> = await postInstance.post(`/articles/${id}/comments`, formData);
    return response.data;
  } catch (e) {
    console.error(`error : ${e}`);
    throw new Error();
  }
}
