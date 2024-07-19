import PostRefreshToken from "@/apis/auth/PostRefreshToken";
import { Token } from "@/types/api";

export const saveTokenToLocalStorage = (token: Token): void => {
  localStorage.setItem("accessToken", token.accessToken);
  localStorage.setItem("refreshToken", token.refreshToken);
};

export const loadTokenToLocalStorage = (token: Token): void => {
  localStorage.getItem(token.accessToken);
  localStorage.getItem(token.refreshToken);
};

export const AccessTokenTOLocalStorage = async () => {
  if (
    !localStorage.getItem("accessToken") &&
    !localStorage.getItem("refreshToken")
  )
    console.log("로컬스토리지 확인해봐 뭐있나 없으면 로그인 ㄱㄱ");
  return;
  if (!localStorage.getItem("accessToken")) {
    const refreshToken = localStorage.getItem("refreshToken");
    const token = await PostRefreshToken(refreshToken);
    return token;
  } else {
    const token = localStorage.getItem("accessToken");
    return token;
  }
};
