export const ACCESS_TOKEN = 'accessToken';
export const REFRESH_TOKEN = 'refreshToken';

export interface articlesType extends articleType {
  totalCount?: number;
  list: articleType[];
}

export interface writingType {
  updatedAt: string;
  createdAt: string;
  likeCount: number;
  writer: {
    nickname: string;
    id: number;
  };
  image: string | null;
  content: string;
  title: string;
  id: number;
}

export interface articleType {
  updatedAt: string;
  createdAt: string;
  likeCount: number;
  writer: {
    nickname: string;
    id: number;
  };
  image: string | null;
  content: string;
  title: string;
  id: number;
}

export interface commentsType extends commentType {
  list: commentType[];
  nextCursor: number;
}

export interface commentType {
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

