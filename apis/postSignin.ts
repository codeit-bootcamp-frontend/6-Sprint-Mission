import { axiosInstance } from "./api";

interface PostSigninParams {
  email: string;
  password: string;
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

export type PostSignin = (prop: PostSigninParams) => Promise<Response>;

const postSignin: PostSignin = async ({
  email,
  password,
}) => {
  try {
    const { data } = await axiosInstance.post<Response>(`auth/signIn`, {
      email,
      password,
    });
    return data;
  } catch (error) {
    console.error("APP ERROR: ", error);
    if (error instanceof Error) {
      throw new Error(`로그인을 할 수 없습니다`);
    }
    throw new Error("알 수 없는 오류로 회원 가입을 할 수 없습니다.");
  }
};

export default postSignin;
