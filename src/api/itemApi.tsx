import { ItemType } from "../types/Items";
import { AddItemType } from "../types/Items";
import { Comment } from "../types/Items";

const PANDA_API = "https://panda-market-api.vercel.app/products";

export async function getProducts(params = {}) {
  // URLSearchParams을 이용하면 파라미터 값을 자동으로 쉽게 인코딩할 수 있어요.
  const query = new URLSearchParams(params).toString();

  try {
    const response = await fetch(`${PANDA_API}?${query}`);
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

export async function getProductById(productId: string) {
  // 제품 상세 정보를 가져오는 api입니다.
  try {
    const response = await fetch(`${PANDA_API}/${productId}`);
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

export async function getProductCommentsById(productId: string) {
  // 제품 상세 정보의 댓글을 가져오는 api입니다.
  try {
    const response = await fetch(`${PANDA_API}/${productId}/comments?limit=3`);
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
