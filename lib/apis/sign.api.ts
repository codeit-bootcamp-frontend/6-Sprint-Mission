import instance from "@/lib/instance";
import axios, { AxiosResponse } from "axios";

interface SignUpFormData {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

interface SignInFormData {
  email: string;
  password: string;
}

interface SignResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
    email: string;
    image: null | string;
    nickname: string;
    updatedAt: Date;
    createdAt: Date;
  };
}

// 회원가입 및 로그인 API
export async function signUp(formData: SignUpFormData) {
  try {
    const response: AxiosResponse<SignResponse> = await instance.post("/auth/signUp", formData);
    if (response.status === 201 || response.status === 200) {
      return response.data;
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data.message;
    } else {
      throw new Error("예상치 못한 오류가 발생했습니다!");
    }
  }
}

export async function signIn(formData: SignInFormData) {
  try {
    const response: AxiosResponse<SignResponse> = await instance.post("/auth/signIn", formData);
    if (response.status === 201 || response.status === 200) {
      return response.data;
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data.message;
    } else {
      throw new Error("예상치 못한 오류가 발생했습니다!");
    }
  }
}
