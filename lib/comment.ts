import {
  CommentListRequestSchemaType,
  CommentListResponseSchemaType,
} from "@/schema/comment";
import instance from "./axios";

export const getCommentList = async (
  params: CommentListRequestSchemaType
): Promise<CommentListResponseSchemaType> => {
  const { articleId, ...rest } = params;
  const response = await instance.get(`/articles/${articleId}/comments`, {
    params: rest,
  });
  return response.data;
};
