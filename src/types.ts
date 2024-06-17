export interface ProductItem {
  id: number;
  name: string;
  price: number;
  description: string;
  images: string;
  favoriteCount: number;
  category: string;
  tags: string[];
}

export interface Product {
  list: ProductItem[];
}

export interface GetProductsParams {
  pageSize?: number;
  orderBy?: string;
}

export interface User {
  id: number;
  email: string;
  image: null | string; // null 또는 string 타입
  nickname: string;
  updatedAt: string;
  createdAt: string;
}
export interface UserSignUpData {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface UserLoginData {
  email: string;
  password: string;
}
