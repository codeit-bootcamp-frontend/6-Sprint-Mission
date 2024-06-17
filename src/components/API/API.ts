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

export async function getMarketData({
  page = 1,
  size = 10,
  order = "recent",
}: {
  page?: number;
  size?: number;
  order?: string;
}): Promise<MarketResponse> {
  const query = `page=${page}&pageSize=${size}&orderBy=${order}`;
  const res = await fetch(
    `https://panda-market-api.vercel.app/products?${query}`
  );
  const body = await res.json();
  return body as MarketResponse;
}

export async function getProductData(id: number): Promise<ProductData> {
  const res = await fetch(`https://panda-market-api.vercel.app/products/${id}`);
  const data = await res.json();
  return data as ProductData;
}

export async function getProductCommentData(
  id: number
): Promise<CommentResponse> {
  const res = await fetch(
    `https://panda-market-api.vercel.app/products/${id}/comments?limit=10`
  );
  const data = await res.json();
  return data as CommentResponse;
}

interface SignupData {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

export async function postSignup({
  email,
  nickname,
  password,
  passwordConfirmation,
}: SignupData) {
  try {
    const res = await fetch("https://panda-market-api.vercel.app/auth/signUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        nickname,
        password,
        passwordConfirmation,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "회원가입 중 오류가 발생했습니다.");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

interface SigninData {
  email: string;
  password: string;
}

export async function postSignin({ email, password }: SigninData) {
  try {
    const res = await fetch("https://panda-market-api.vercel.app/auth/signIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "회원가입 중 오류가 발생했습니다.");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
