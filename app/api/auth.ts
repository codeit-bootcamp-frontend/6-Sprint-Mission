import { ISignInUser, ISignUpUser, IUser } from "@/@types";
import { API_URL } from "@/app/containts";
import { saveTokens } from "./authTokens";

interface SignUpResponse {
  success: boolean;
  message: string;
}

//자유게시판 목록 API
export async function signUp(data: ISignUpUser): Promise<SignUpResponse> {
  try {
    const res = await fetch(`${API_URL}/auth/signUp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    //동일한 이메일, 닉네임이 있을 경우
    if (res.status === 400) {
      return {
        success: false,
        message: json.message,
      };
    } else {
      return {
        success: true,
        message: "회원 가입이 성공적으로 완료되었습니다.",
      };
    }
  } catch (e) {
    return {
      success: false,
      message: "회원 가입 중 오류가 발생했습니다. 다시 시도해주세요.",
    };
  }
}

//토큰 가져오기 -> 로그인 임
export async function signIn(userData: ISignInUser): Promise<SignUpResponse> {
  const res = await fetch(`${API_URL}/auth/signIn`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  const json = await res.json();

  // 토큰 저장
  const accessToken = json.accessToken;
  const refreshToken = json.refreshToken;
  const userId = json.user.id;

  saveTokens(accessToken, userId, refreshToken);

  try {
    return {
      success: true,
      message: "로그인이 성공적으로 완료되었습니다.",
    };
  } catch (e) {
    return {
      success: false,
      message: "로그인 중 오류가 발생했습니다. 다시 시도해주세요.",
    };
  }
}
