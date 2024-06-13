export interface Writer {
  id: number;
  nickname: string;
}

export interface WriterWithImage extends Writer {
  image: string | null;
}
