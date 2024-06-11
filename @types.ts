export interface IBoard {
  id: number;
  title: string;
  image?: string;
  writer: {
    nickname: string;
  };
  createdAt: string;
  likeCount: number;
}

export interface IBoardDetail extends IBoard {
  content: string;
  writer: {
    id: number;
    nickname: string;
  };
  updatedAt: string;
  isLiked: boolean;
}

export interface IBoardComment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  writer: {
    id: number;
    nickname: string;
    image?: string;
  };
}
