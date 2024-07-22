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
  isLiked: boolean;
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

export type PostArticleType = {
  image?: string;
  content: string;
  title: string;
};

export type Item = {
  updatedAt: string;
  createdAt: string;
  favoriteCount: number;
  ownerId: number;
  images: string[];
  tags: string[];
  price: number;
  description: string;
  name: string;
  id: number;
};

export type ItemProps = {
  totalCount?: number;
  list?: Item[];
};

export type ItemForSaleType = Pick<Item, 'favoriteCount' | 'price' | 'name' | 'id' | 'images'>;
export type BestItemType = Omit<ItemForSaleType, 'images'> & { image: string };
