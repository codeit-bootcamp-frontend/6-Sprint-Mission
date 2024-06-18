import { API_URL } from "../containts";

// 토큰 저장 함수
export function saveTokens(
  accessToken: string,
  userid?: string,
  refreshToken?: string
) {
  localStorage.setItem("accessToken", accessToken);
  if (refreshToken) {
    localStorage.setItem("refreshToken", refreshToken);
  }
  if (userid) {
    //임시 유저 정보 저장
    localStorage.setItem("userid", userid);
  }
}

// 토큰 가져오기 함수
export function getStoredTokens() {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  return { accessToken, refreshToken };
}

// 토큰 갱신 함수
export async function refreshAccessToken(refreshToken: string) {
  const res = await fetch(`${API_URL}/auth/refresh-token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken: refreshToken }),
  });
  const data = await res.json();
  const { accessToken } = data;
  saveTokens(accessToken);
  return accessToken;
}

// 토큰 유효성 확인 및 갱신 함수
export async function validateAndRefreshTokens() {
  const { accessToken, refreshToken } = getStoredTokens();
  if (!accessToken || !refreshToken) {
    throw new Error("No tokens found");
  }
  const isTokenExpired = false;
  if (isTokenExpired) {
    return await refreshAccessToken(refreshToken);
  }

  return accessToken;
}
