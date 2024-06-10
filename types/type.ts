import { FormEvent, MouseEvent } from "react";

export type ChildrenProps = {
  children: React.ReactNode;
}

interface ArticleWriter {
  id: number;
  nickname: string;
}

export interface Article {
  id: number;
  title: string;
  content: string;
  image: string | null;
  likeCount: number;
  createdAt: string;
  updatedAt?: string;
  writer: ArticleWriter;
}

export type ArticleProps = {
  article: Article;
}

export type Articles = {
  articles: Article[];
}

export interface DataFormat<T> {
  list: T[];
  totalCount: number;
}

export interface DetailArticleDataFormat<T> {
  list: T[];
  nextCursor: number | null;
}

export interface InitialDataProps {
  initialData: Article[];
  initialTotalCount: number;
}

export interface SearchProps {
  keyword: string;
  articles: Article[];
}

// Comment
interface CommentWriter {
  id: number;
  nickname: string;
  image: string | null;
}

export interface CommentProps {
  id: number;
  content: string;
  createdAt: string;
  updatedAt?: string;
  writer: CommentWriter;
}

export interface DetailArticleProps {
  article: Article;
  comments: CommentProps[];
  nextCursor: number | null;
}

// Button
export interface Button {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>) => void;
  type: "button" | "submit" | "reset";
  form?: string;
}
