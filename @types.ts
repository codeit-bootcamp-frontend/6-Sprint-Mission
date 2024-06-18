export interface IBoard {
  id: number;
  title: string;
  image?: string;
  writer: {
    nickname: string;
  };
  createdAt: string;
  likeCount: number;
}

export interface IBoardDetail extends IBoard {
  content: string;
  writer: {
    id: number;
    nickname: string;
  };
  updatedAt: string;
  isLiked: boolean;
}

export interface IBoardComment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  writer: {
    id: number;
    nickname: string;
    image?: string;
  };
}

export interface IUser {
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
    email: string;
    image?: string;
    nickname: string;
    updatedAt: string;
    createdAt: string;
  };
}

export interface ISignUpUser {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

export interface ISignInUser {
  email: string;
  password: string;
}
