import {
  ArticleListResponseType,
  ArticleListRequestType,
  ArticleResponseType,
} from "@/schema/article";
import instance from "./axios";

export const getArticles = async (
  params: ArticleListRequestType,
): Promise<ArticleListResponseType> => {
  const res = await instance.get("/articles", { params });
  return res.data;
};

export const getArticle = async (
  articleId: number,
): Promise<ArticleResponseType> => {
  const res = await instance.get(`/articles/${articleId}`);
  return res.data;
};
