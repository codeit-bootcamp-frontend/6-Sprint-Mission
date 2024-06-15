import { ProductListFetcherParams } from '@/types/productTypes';

export async function getProducts({
  orderBy,
  pageSize,
  page = 1,
}: ProductListFetcherParams) {
  const params = new URLSearchParams({
    orderBy,
    pageSize: String(pageSize),
    page: String(page),
  })

  try {
    const res = await fetch(
      `https://panda-market-api.vercel.app/products?${params}`
    );

    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`)
    }
    const body = await res.json();
    return body;
  } catch (error) {
    console.error('상품을 불러오는데 실패했습니다', error);
    throw error;
  }
}

export async function getProductDetail(productId: number) {
  if (!productId) {
    throw new Error("Invalid product ID");
  }

  try {
    const res = await fetch(
      `https://panda-market-api.vercel.app/products/${productId}`
    );
    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`);
    }
    const body = await res.json();
    return body;
  } catch (error) {
    console.error('상품정보를 불러오는데 실패했습니다', error);
    throw error;
  };
}

export async function getProductComments({
  productId,
  limit = 10,
}: {
  productId: number;
  limit?: number;
}) {
  if (!productId) {
    throw new Error('Invalid product ID');
  }

  const params = {
    limit: String(limit),
  };

  try {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(
      `https://panda-market-api.vercel.app/products/${productId}/comments?${query}`
    );
    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`);
    }
    const body = await res.json();
    return body;
  } catch (error) {
    console.error('상품 댓글을 불러오는데 실패했습니다', error);
    throw error;
  }
}