import { Comment } from './comment';
import { Writer } from './writer';

export interface Board {
  id: number;
  title: string;
  content: string;
  image: string | null;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
  writer: Writer;
}

export interface BoardWithLiked extends Board {
  isLiked: boolean;
}

export { Comment as BoardComment };
