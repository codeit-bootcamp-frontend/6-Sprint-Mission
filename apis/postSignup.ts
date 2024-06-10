import { axiosInstance } from "./api";

interface PostSignupParams {
  email: string;
  nickName: string;
  password: string;
  passwordConfirmation: string;
}

interface Response {
  accessToken: string;
  refreshToken: string;
  user: {
    email: string;
    id: number;
    image: null;
    nickname: string;
    updatedAt: string;
    createdAt: number;
  };
}

export type PostSignup = (prop: PostSignupParams) => Promise<Response>;

const postSignup: PostSignup = async ({
  email,
  nickName,
  password,
  passwordConfirmation,
}) => {
  try {
    const { data } = await axiosInstance.post<Response>(`auth/signUp`, {
      email,
      nickName,
      password,
      passwordConfirmation,
    });
    return data;
  } catch (error) {
    console.error("APP ERROR: ", error);
    if (error instanceof Error) {
      throw new Error(`회원 가입을 할 수 없습니다`);
    }
    throw new Error("알 수 없는 오류로 회원 가입을 할 수 없습니다.");
  }
};

export default postSignup;
