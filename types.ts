export type ArticleList = {
  totalCount: number;
  list: ArticleProps[];
};

export type ArticleProps = {
  updatedAt: string;
  createdAt: string;
  likeCount: number;
  writer: Writer;
  image: null | string;
  content: string;
  title: string;
  id: number;
};

type Writer = {
  nickname: string;
  id: number;
};

export type CommentProps = {
  writer: CommentWriter;
  updatedAt: string;
  createdAt: string;
  content: string;
  id: number;
};

type CommentWriter = {
  image: string | null;
  nickname: string;
  id: number;
};
