export interface LoginData {
  email: string;
  password: string;
}
export type LoginDataKey = keyof LoginData;

export interface SignupData {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}
export type SignupDataKey = keyof SignupData;

export interface AuthResponseBody {
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
    email: string;
    image: string | null;
    nickname: string;
    updatedAt: string;
    createdAt: string;
  };
}
