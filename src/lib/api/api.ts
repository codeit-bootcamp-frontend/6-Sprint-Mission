import { APP_BASE_URL } from "@/constants/common";
import { getCookie, setCookie } from "cookies-next";

async function refreshToken() {
  const refreshToken = getCookie("refreshToken");
  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  const response = await fetch(`${APP_BASE_URL}/auth/refresh-token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) {
    throw new Error(`Failed to refresh token: ${response.statusText}`);
  }

  const data = await response.json();
  const newAccessToken = data.accessToken;

  setCookie("accessToken", newAccessToken);
  return newAccessToken;
}

export async function requestWithToken(url: string, options?: RequestInit) {
  let accessToken = getCookie("accessToken");

  const headers = {
    ...(options?.headers || { "Content-Type": "application/json" }),
    Authorization: `Bearer ${accessToken}`,
  };

  let response = await fetch(url, {
    ...options,
    method: options?.method || "GET",
    headers,
  });

  if (!response.ok && response.status === 401) {
    // Access token이 만료된 경우
    try {
      accessToken = await refreshToken();

      // 새로운 Access Token으로 요청 재시도
      const retryHeaders = {
        ...(options?.headers || { "Content-Type": "application/json" }),
        Authorization: `Bearer ${accessToken}`,
      };

      response = await fetch(url, {
        ...options,
        method: options?.method || "GET",
        headers: retryHeaders,
      });
    } catch (error: any) {
      throw new Error(
        `세션이 만료되었습니다. 다시 로그인해주세요. Failed to refresh token: ${error.message}`,
      );
    }
  }

  if (!response.ok) {
    throw new Error(`서버 요청에 실패했습니다. ${response.statusText}`);
  }

  return response.json();
}
