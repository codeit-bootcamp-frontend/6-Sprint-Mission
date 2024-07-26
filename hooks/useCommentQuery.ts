import { CommentListRequestSchemaType } from "@/schema/comment";
import { useQuery } from "@tanstack/react-query";
import query from "@/lib/queries";

export const useCommentList = (params: CommentListRequestSchemaType) =>
  useQuery({ ...query.comment.getCommentList({ ...params }) });
