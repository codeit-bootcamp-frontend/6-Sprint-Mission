interface MarketData {
  id: number;
  name: string;
  description: string;
  price: number;
  tags: string[];
  images: string[];
  ownerId: number;
  favoriteCount: number;
  createdAt: string;
  updatedAt: string;
}

interface MarketResponse {
  list: MarketData[];
  totalCount: number;
}

export interface ProductData {
  id: number;
  name: string;
  description: string;
  price: number;
  tags: string[];
  images: string[];
  ownerId: number;
  favoriteCount: number;
  createdAt: string;
  updatedAt: string;
  isFavorite: boolean;
}

export interface CommentData {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  writer: {
    id: number;
    nickname: string;
    image: string;
  };
}

export interface CommentResponse {
  list: CommentData[];
  nextCursor: string | null;
}

export async function getMarketData({ page = 1, size = 10, order = "recent" }: { page?: number; size?: number; order?: string }): Promise<MarketResponse> {
  const query = `page=${page}&pageSize=${size}&orderBy=${order}`;
  const res = await fetch(`https://panda-market-api.vercel.app/products?${query}`);
  const body = await res.json();
  return body as MarketResponse;
}

export async function getProductData(id: number): Promise<ProductData> {
  const res = await fetch(`https://panda-market-api.vercel.app/products/${id}`);
  const data = await res.json();
  return data as ProductData;
}

export async function getProductCommentData(id: number): Promise<CommentResponse> {
  const res = await fetch(`https://panda-market-api.vercel.app/products/${id}/comments?limit=10`);
  const data = await res.json();
  return data as CommentResponse;
}