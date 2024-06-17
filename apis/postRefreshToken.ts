import axiosInstance from "./api";

export default async function postRefreshToken(): Promise<void> {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) {
    throw new Error("No refresh token");
  }

  try {
    const { data } = await axiosInstance.post("auth/refresh-token", {
      refreshToken,
    });

    localStorage.setItem("accessToken", data.accessToken);
  } catch (error) {
    console.error("APP ERROR: ", error);
    if (error instanceof Error) {
      throw new Error(`토큰 갱신 실패`);
    }
    throw new Error("알 수 없는 오류로 인해 토큰 갱신 실패.");
  }
}
