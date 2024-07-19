export interface ProductComment {
  writer: {
    image: string;
    nickname: string;
    id: number;
  };
  updatedAt: Date;
  createdAt: Date;
  content: string;
  id: number;
}

export interface ProductCommentListResponse {
  nextCursor: number;
  list: ProductComment[];
}
