import { IBoardComment } from "@/@types";
import { API_URL } from "../containts";
import { refreshAccessToken, validateAndRefreshTokens } from "./authTokens";

//자유게시판 댓글 불러오기
export async function getBoardComments(id: number): Promise<IBoardComment[]> {
  try {
    const res = await fetch(`${API_URL}/articles/${id}/comments?limit=5`);
    const json = await res.json();
    return json.list;
  } catch (e) {
    console.log(e);
    return [];
  }
}

//자유게시판 댓글 등록 API Request
async function addBoardCommentRequest(
  id: number,
  content: string,
  accessToken: string
): Promise<Response> {
  return fetch(`${API_URL}/articles/${id}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ content: content }),
  });
}

//자유게시판 댓글 불러오기
export async function addBoardComment(
  id: number,
  content: string
): Promise<IBoardComment> {
  try {
    let accessToken = await validateAndRefreshTokens();
    let res = await addBoardCommentRequest(id, content, accessToken);

    if (res.status === 401) {
      accessToken = await refreshAccessToken(
        localStorage.getItem("refreshToken")!
      );
      res = await addBoardCommentRequest(id, content, accessToken);
    }
    const json = await res.json();
    return json;
  } catch (e) {
    return {} as IBoardComment;
  }
}
