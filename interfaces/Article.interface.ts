export interface Article {
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

export interface Articles {
  list: Article[];
  totalCount: number;
}

export interface ArticleData {
  title: string;
  content: string;
  image?: string;
}
