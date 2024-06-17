export interface ArticleType {
  updatedAt: string;
  createdAt: string;
  likeCount: number;
  writer: {
    id: number;
    nickname: string;
  };
  image: string | null;
  content: string;
  title: string;
  id: number;
}

export interface ArticleComment {
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