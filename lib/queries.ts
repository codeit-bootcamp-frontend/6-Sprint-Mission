import { createQueryKeyStore } from "@lukemorales/query-key-factory";
import { getArticle } from "./article";
import { CommentListRequestSchemaType } from "@/schema/comment";
import { getCommentList } from "./comment";

const query = createQueryKeyStore({
  article: {
    getArticle: (articleId: number) => ({
      queryKey: [articleId],
      queryFn: () => getArticle(articleId),
    }),
  },
  comment: {
    getCommentList: (params: CommentListRequestSchemaType) => ({
      queryKey: [params],
      queryFn: () => getCommentList(params),
    }),
  },
});

export default query;
