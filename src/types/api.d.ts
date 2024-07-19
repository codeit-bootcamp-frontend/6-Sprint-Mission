export interface Token {
  accessToken: string;
  refreshToken: string;
  user?: {
    id: number;
    email: string;
    image: null;
    nickname: string;
    updatedAt: Date;
    createdAt: Date;
  };
}

export type IdParam = string | string[] | null;
