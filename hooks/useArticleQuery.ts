import { useQuery } from "@tanstack/react-query";
import query from "@/lib/queries";

export const useArticle = (articleId: number) =>
  useQuery({ ...query.article.getArticle(articleId) });

export default useArticle;
