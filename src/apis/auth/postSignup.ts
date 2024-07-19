import { Token } from "@/types/api";
import axiosInstance from "../axiosInstance";

interface PostSignupParams {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

const postSignup = async (
  option: PostSignupParams = {
    email: "",
    nickname: "",
    password: "",
    passwordConfirmation: "",
  }
) => {
  try {
    const { data } = await axiosInstance.post<Token>("/auth/signUp", {
      email: option.email,
      nickname: option.nickname,
      password: option.password,
      passwordConfirmation: option.passwordConfirmation,
    });
    return data;
  } catch (error) {
    console.error(`Failed to fetch data: ${error}`);
    throw error;
  }
};

export default postSignup;
