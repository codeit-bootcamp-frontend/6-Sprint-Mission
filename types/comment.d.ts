import { WriterWithImage } from './writer';

export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  writer: WriterWithImage;
}
