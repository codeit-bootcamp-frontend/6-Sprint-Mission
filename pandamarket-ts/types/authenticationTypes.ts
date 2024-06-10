export interface SignInResponse {
  refreshToken: string;
  accessToken: string;
  user: {
    updatedAt: string;
    createdAt: string;
    image?: {
      UrlType: string;
    };
    nickname: string;
    id: number;
    email: string;
  };
}
