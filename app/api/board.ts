import type { IBoard, IBoardComment, IBoardDetail } from "../../@types";
import { API_URL } from "../containts";
import { validateAndRefreshTokens, refreshAccessToken } from "./authTokens";

interface IBoardListParams {
  page: number;
  pageSize: number;
  orderBy: string;
  keywords?: string;
}

//자유게시판 목록 API
export async function getBoardList({
  page,
  pageSize,
  orderBy,
  keywords = "",
}: IBoardListParams): Promise<IBoard[]> {
  try {
    const res = await fetch(
      `${API_URL}/articles?page=${page}&pageSize=${pageSize}&orderBy=${orderBy}&keyword=${keywords}`
    );
    const json = await res.json();
    return json.list;
  } catch (e) {
    console.log(e);
    return [];
  }
}

//이미지 업로드 리퀘스트
async function uploadImageRequest(
  image: File,
  accessToken: string
): Promise<Response> {
  const formData = new FormData();
  formData.append("image", image);
  return fetch(`${API_URL}/images/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  });
}

//이미지 업로드 API
export async function uploadImage(image: File): Promise<string> {
  let accessToken = await validateAndRefreshTokens();
  let res = await uploadImageRequest(image, accessToken);

  if (res.status === 401) {
    //accessToken 만료시 refresh token으로 재발행
    accessToken = await refreshAccessToken(
      localStorage.getItem("refreshToken")!
    );
    res = await uploadImageRequest(image, accessToken);
  }

  const json = await res.json();
  return json.url;
}

//게시글 등록 리퀘스트
async function addBoardRequest(
  formData: FormData,
  accessToken: string
): Promise<Response> {
  return fetch(`${API_URL}/articles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(Object.fromEntries(formData)),
  });
}

//게시글 등록 API
export async function addBoard(formData: FormData): Promise<string> {
  try {
    let accessToken = await validateAndRefreshTokens();
    let res = await addBoardRequest(formData, accessToken);

    if (res.status === 401) {
      accessToken = await refreshAccessToken(
        localStorage.getItem("refreshToken")!
      );
      res = await addBoardRequest(formData, accessToken);
    }
    const json = await res.json();
    return json.id;
  } catch (e) {
    return "error";
  }
}

async function getBoardItemRequest(
  id: string,
  accessToken: string
): Promise<Response> {
  return fetch(`${API_URL}/articles/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

//자유게시판 상세 페이지 API
export async function getBoardItem(id: string): Promise<IBoardDetail> {
  try {
    let accessToken = await validateAndRefreshTokens();
    let res = await getBoardItemRequest(id, accessToken);

    if (res.status === 401) {
      accessToken = await refreshAccessToken(
        localStorage.getItem("refreshToken")!
      );
      res = await getBoardItemRequest(id, accessToken);
    }

    const json = await res.json();
    return json;
  } catch (e) {
    console.log(e);
    return {} as IBoardDetail;
  }
}

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
