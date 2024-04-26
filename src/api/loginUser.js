import { instance } from "./Axios";

export const LoginUser = async (data) => {
  try {
    const response = await instance.post("/auth/signIn", JSON.stringify(data));
    return response.data;
  } catch (error) {
    console.error("로그인 실패:", error);
  }
};
