export type Article = {
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
};

export interface ArticleData {
  list: Array<Article>;
  totalCount: number;
}

export interface GetArticleProps {
  pageSize?: number;
  orderBy?: string;
  keyword?: string;
}

export type Comments = {
  nextCursor: number | null;
  list: {
    writer: {
      image: string | null;
      nickname: string;
      id: number;
    };
    updatedAt: string;
    createdAt: string;
    content: string;
    id: number;
  }[];
};

export type UserData = {
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
    email: string;
    image: null | string;
    nickname: string;
    updatedAt: string;
    createdAt: string;
  };
};

export type ImageUrlObject = {
  url: string;
};
