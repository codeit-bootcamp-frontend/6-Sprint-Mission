import instance from "@/lib/axios";
import { AxiosResponse } from "axios";

export type ArticleResponse = {
  id: number;
  title: string;
  content: string;
  image: string;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
  writer: WriterResponse;
};

export type WriterResponse = {
  id: number;
  nickname: string;
};

export type ArticlesResponse = {
  list: ArticleResponse[];
  totalCount: number;
};

export interface OrderQuery {
  orderBy?: string | string[];
  keyword?: string | string[];
  page?: string | string[];
}

// 게시글 목록 받아오는 API
export async function getArticles({ orderBy = "recent", keyword = "", page = "1" }: OrderQuery) {
  const formattedOrderBy = Array.isArray(orderBy) ? orderBy[0] : orderBy;
  const formattedKeyword = Array.isArray(keyword) ? keyword[0] : keyword;
  const formattedPage = Array.isArray(page) ? page[0] : page;

  const params = new URLSearchParams({
    orderBy: formattedOrderBy,
    keyword: formattedKeyword,
    pageSize: "5",
    page: formattedPage,
  });
  try {
    const response: AxiosResponse<ArticlesResponse> = await instance.get(`/articles?${params.toString()}`);
    return response.data;
  } catch (e) {
    console.error(`error : ${e}`);
    throw new Error();
  }
}

// 단일 게시글 받아오는 API
export async function getArticle(id: string | string[] | undefined) {
  try {
    const response: AxiosResponse<ArticleResponse> = await instance.get(`/articles/${id}`);
    return response.data;
  } catch (e) {
    console.log(`error : ${e}`);
    throw new Error();
  }
}

// 베스트 게시글 목록 받아오는 API
export async function getBestArticles(pageSize: number) {
  const params = new URLSearchParams({
    page: "1",
    pageSize: pageSize.toString(),
    orderBy: "like",
  });
  try {
    const response: AxiosResponse<ArticlesResponse> = await instance.get(`/articles?${params.toString()}`);
    return response.data;
  } catch (e) {
    console.error(`error : ${e}`);
    throw new Error();
  }
}
