export interface IArticle {
  id: number;
  title: string;
  content: string;
  image: string | null;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
  writer: {
    id: number;
    nickname: string;
  };
}

export interface ILoadArticlesParams {
  page?: number;
  pageSize?: number;
  orderBy?: 'recent' | 'like';
  keyword?: string;
}

export interface IArticleComment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  writer: {
    id: number;
    nickname: string;
    image: string | null;
  };
}

export interface IBoardValues {
  title: string;
  content: string;
  imgFile: File | null;
}

export interface ISigninValues {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

export interface IUser {
  id: number;
  email: string;
  nickname: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
}
