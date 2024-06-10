export interface Writer {
  id: number;
  nickname: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  image: string | null;
  likeCount: number;
  createdAt?: string;
  updatedAt?: string;
  writer: Writer;
}

export interface Articles {
  list: Post[];
  totalCount: number;
}

export interface Comment {
  writer: { image: string; nickname: string; id: number };
  updatedAt: string;
  createdAt: string;
  content: string;
  id: number;
}

export interface ArticleCommentsResponse {
  nextCursor: number;
  list: Comment[];
}

export interface ImageUploadResponse {
  url: string;
}

export type OrderBy = "like" | "recent";
