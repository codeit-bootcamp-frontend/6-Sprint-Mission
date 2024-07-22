import { APP_BASE_URL } from "@/constants/common";
import { requestWithToken } from "./api";

export async function getComments(
  path: string,
  id: number,
  config: { limit: number; cursor: number },
) {
  const url =
    `${APP_BASE_URL}/${path}/${id}/comments` +
    `?limit=${config.limit}` +
    `&cursor=${config.cursor}`;
  return requestWithToken(url);
}

export async function createComment(path: string, id: number, comment: string) {
  const url = `${APP_BASE_URL}/${path}/${id}/comments`;
  const body = JSON.stringify({ content: comment });

  return requestWithToken(url, {
    method: "POST",
    body: body,
  });
}

export async function updateComment(commentId: number, comment: string) {
  const url = `${APP_BASE_URL}/comments/${commentId}`;
  const body = { content: comment };
  return requestWithToken(url, { method: "PATCH", body: JSON.stringify(body) });
}

export async function deleteComment(commentId: number) {
  const url = `${APP_BASE_URL}/comments/${commentId}`;
  return requestWithToken(url, { method: "DELETE" });
}

export async function getProductComments(
  productId: number,
  config: { limit: number; cursor: number },
) {
  return getComments("products", productId, config);
}

export async function createProductComment(productId: number, comment: string) {
  return createComment("products", productId, comment);
}

export async function getArticleComments(
  articleId: number,
  config: { limit: number; cursor: number },
) {
  return getComments("articles", articleId, config);
}

export async function createArticleComment(articleId: number, comment: string) {
  return createComment("articles", articleId, comment);
}
