import { ProductListFetcherParams } from "@/types/productTypes";

export async function getProducts({
  orderBy,
  pageSize,
  page = 1,
}: ProductListFetcherParams) {
  const params = new URLSearchParams({
    orderBy,
    pageSize: String(pageSize),
    page: String(page),
  });

  try {
    const response = await fetch(
      `https://panda-market-api.vercel.app/products?${params}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const body = await response.json();
    return body;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error;
  }
}

export async function getProductDetail(productId: number) {
  if (!productId) {
    throw new Error("Invalid product ID");
  }

  try {
    const response = await fetch(
      `https://panda-market-api.vercel.app/products/${productId}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const body = await response.json();
    return body;
  } catch (error) {
    console.error("Failed to fetch product detail:", error);
    throw error;
  }
}

export async function getProductComments({
  productId,
  limit = 10,
}: {
  productId: number;
  limit?: number;
}) {
  if (!productId) {
    throw new Error("Invalid product ID");
  }

  const params = {
    limit: String(limit),
  };

  try {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(
      `https://panda-market-api.vercel.app/products/${productId}/comments?${query}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const body = await response.json();
    return body;
  } catch (error) {
    console.error("Failed to fetch product comments:", error);
    throw error;
  }
}

export async function getArticleComments({
  articleId,
  limit = 10,
}: {
  articleId: number;
  limit?: number;
}) {
  if (!articleId) {
    throw new Error("Invalid article ID");
  }

  const params = {
    limit: String(limit),
  };

  try {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(
      `https://panda-market-api.vercel.app/articles/${articleId}/comments?${query}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const body = await response.json();
    return body;
  } catch (error) {
    console.error("Failed to fetch article comments:", error);
    throw error;
  }
}
