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

// Literal type을 사용하면 문자열이나 숫자에 정확한 값을 지정할 수 있어요.
// 예: 상품을 정렬할 때 사용되는 key 값이 정해져 있다면, "string"으로 타이핑하는 것보다 특정 값만 허용하는 것이 훨씬 안정적이겠죠.
// Literal type을 정의할 때는 interface 보다는 type을 사용하는 것이 일반적이에요.

export type ProductSortOption = "recent" | "favorite";
