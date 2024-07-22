import { StaticImport } from "next/dist/shared/lib/get-img-props";

export interface WriterProps {
  id: number;
  nickname: string;
}

export interface PostArticlesProps {
  id: number;
  title: string;
  content?: string;
  updatedAt: string;
  image?: string | StaticImport;
  likeCount: string;
  writer: WriterProps;
}

export type ArticlesArray = PostArticlesProps[];
