export interface GetArticlesResponse {
  list: Article[];
  totalCount: number;
}
export interface Article {
  content: string;
  createdAt: string;
  id: number;
  image: string | null;
  likeCount: number;
  title: string;
  updatedAt: string;
  writer: { id: number; nickname: string };
}

export interface ArticleId extends Article {
  isLiked: false | true;
}
