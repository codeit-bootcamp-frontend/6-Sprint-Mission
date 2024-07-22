export type Product = {
  createdAt: Date;
  favoriteCount: number;
  ownerId: number;
  images: string[];
  tags: string[];
  price: number;
  description: string;
  name: string;
  id: number;
  isFavorite: boolean;
};

export type ProductListResponse = {
  totalCount: number;
  list: Product[];
};
