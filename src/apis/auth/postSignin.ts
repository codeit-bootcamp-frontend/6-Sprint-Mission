import { Token } from "@/types/api";
import axiosInstance from "../axiosInstance";

interface PostSigninParams {
  email: string;
  password: string;
}

const postSignin = async (
  option: PostSigninParams = {
    email: "",
    password: "",
  }
) => {
  try {
    const { data } = await axiosInstance.post<Token>("/auth/signIn", {
      email: option.email,
      password: option.password,
    });
    return data;
  } catch (error) {
    console.error(`Failed to fetch data: ${error}`);
    throw error;
  }
};

export default postSignin;
