export interface articlesType {
  totalCount?: number;
  list: [
    {
      updatedAt: string;
      createdAt: string;
      likeCount: number;
      writer: {
        nickname: string;
        id: number;
      };
      image: string | null;
      content: string;
      title: string;
      id: number;
    }
  ];
}

export interface writingType {
  updatedAt: string;
  createdAt: string;
  likeCount: number;
  writer: {
    nickname: string;
    id: number;
  };
  image: string | null;
  content: string;
  title: string;
  id: number;
}

