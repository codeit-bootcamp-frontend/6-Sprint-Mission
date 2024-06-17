import instance from "./axiosInstance";
import {
  ArticleCommentsResponse,
  Articles,
  ImageUploadResponse,
  OrderBy,
  Post,
} from "../../types/articleResponseTypes";

import { SignInResponse } from "../../types/authenticationTypes";

//base GET 선언부
export async function GET<T>(
  endpoint: string,
  params?: Record<string, string | number>,
): Promise<T> {
  try {
    const response = await instance.get<T>(endpoint, { params });

    if (response.status < 200 || response.status >= 300) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    console.error("Failed to fetch articles:", error);
    throw error;
  }
}

// base POST 선언부
export async function POST<T>(
  endpoint: string,
  body?: FormData | Record<string, string> | PostSignInBody,
  headers?: Record<string, string>,
): Promise<T> {
  try {
    const response = await instance.post<T>(endpoint, body, { headers });
    if (response.status < 200 || response.status >= 300) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    console.error("Failed to fetch articles:", error);
    throw error;
  }
}

/**자유게시판 게시글 list 조회  */
export async function getArticles(
  orderBy: OrderBy,
  pageSize: number,
  keyword: string = "",
): Promise<Articles> {
  return await GET<Articles>("/articles", {
    orderBy,
    pageSize,
    keyword,
  });
}

/** 자유게시판 단일 게시글 조회 */
export async function getArticleById(id: string) {
  return await GET<Post>(`/articles/${id}`);
}

/** 자유게시판 단일 게시글 댓글 조회 */
export async function getArticleComments(id: string, limit: number = 3) {
  return await GET<ArticleCommentsResponse>(`/articles/${id}/comments`, {
    limit,
  });
}

/** 로그인 페이지가 없으므로 테스트용 계정으로 로그인 */
export async function testLogin(
  email: string = "test8465@email.com",
  password: string = "123456789",
) {
  return await POST<SignInResponse>("/auth/signIn", {
    email,
    password,
  });
}
/** 자유게시판 댓글 생성 */
export async function postArticleComment(
  articleId: string,
  content: Record<string, string>,
  accessToken: string,
) {
  return await POST(`/articles/${articleId}/comments`, content, {
    Authorization: `Bearer ${accessToken}`,
  });
}

export async function postImageUpload(image: FormData, accessToken: string) {
  return await POST<ImageUploadResponse>(`/images/upload`, image, {
    Authorization: `Bearer ${accessToken}`,
  });
}

export async function postArticle(
  image: string,
  content: string,
  title: string,
  accessToken: string,
) {
  const body = {
    image,
    content,
    title,
  };
  return await POST(`/articles`, body, {
    Authorization: `Bearer ${accessToken}`,
  });
}

interface PostSignInBody {
  email: string;
  password: string;
}

export async function postSignIn(body: PostSignInBody) {
  return await POST<SignInResponse>(`/auth/signIn`, body);
}

interface PostSignUpBody {
  email: string;
  password: string;
  nickname: string;
  passwordConfirmation: string;
}

export async function postSignUp(body: PostSignUpBody) {
  return await POST<SignInResponse>(`/auth/signUp`, body);
}
