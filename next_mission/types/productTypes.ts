// BestItemsSection과 AllItemsSection 모두에서 사용되므로 별도로 type 파일을 생성

export interface Product {
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
}

export interface ProductListResponse {
  totalCount: number;
  list: Product[];
}

export type ProductSortOption = "recent" | "favorite";

export interface ProductListFetcherParams {
  orderBy: ProductSortOption;
  pageSize: number;
  page?: number;
}
