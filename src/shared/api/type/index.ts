export interface GetDatumProps {
  page?: number;
  pageSize?: number;
  orderBy?: string;
  keyword?: string;
}

export interface GetProductProps {
  productId: string;
}

export interface GetCommentsProps {
  productId: string | null;
  limit: number;
}

export interface TotalProductsData {
  totalCount: number;
  list: {
    createdAt: string;
    favoriteCount: number;
    ownerId: number;
    images: [string];
    tags: [string];
    price: number;
    description: string;
    name: string;
    id: number;
  }[];
}

export interface SpecificProductData {
  createdAt: string;
  favoriteCount: number;
  ownerId: number;
  images: [string];
  tags: [string];
  price: number;
  description: string;
  name: string;
  id: number;
  isFavorite: boolean;
}

export interface SpecificCommentsData {
  nextCursor: number;
  list: [
    {
      writer: {
        image: string;
        nickname: string;
        id: number;
      };
      updatedAt: string;
      createdAt: string;
      content: string;
      id: number;
    }
  ];
}

export interface SignUpRequestData {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

export interface SignUpResponseData {
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
    email: string;
    image: string | null;
    nickname: string;
    updatedAt: string;
    createdAt: string;
  };
}

export interface SignInRequestData {
  email: string;
  password: string;
}

export interface SignInResponseData {
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
    email: string;
    image: string | null;
    nickname: string;
    updatedAt: string;
    createdAt: string;
  };
}

export interface PostAuthRefreshToken {
  accessToken: string;
}
