import { APP_BASE_URL } from "@/constants/common";
import { ItemSortOptionsKeys } from "@/types/SortOptions";
import { requestWithToken } from "./api";
import { BEST_ITEM_LIMIT } from "@/constants/pageLimit";

export async function getProducts(config: {
  page?: number;
  limit?: number;
  keyword?: string;
  order?: ItemSortOptionsKeys;
}) {
  const { page = 1, limit = 10, keyword = "", order = "recent" } = config;

  const url = `${APP_BASE_URL}/products?page=${page}&pageSize=${limit}&orderBy=${order}&keyword=${keyword}`;
  const options = {
    method: "GET",
  };

  return requestWithToken(url, options);
}

export async function getBestProducts() {
  return getProducts({ order: "favorite", limit: BEST_ITEM_LIMIT["large"] });
}

export async function getProductDetail(productId: string) {
  const url = `${APP_BASE_URL}/products/${productId}`;
  return requestWithToken(url);
}

export async function createProduct(data: ItemCreationData) {
  const url = `${APP_BASE_URL}/products`;
  return requestWithToken(url, { method: "POST", body: JSON.stringify(data) });
}

export async function updateProduct(
  productId: string,
  data: Partial<ItemCreationData>,
) {
  const url = `${APP_BASE_URL}/products/${productId}`;
  return requestWithToken(url, { method: "PATCH", body: JSON.stringify(data) });
}

export async function deleteProduct(productId: string) {
  const url = `${APP_BASE_URL}/products/${productId}`;
  return requestWithToken(url, { method: "DELETE" });
}

///
export async function getFavoriteStatus(
  path: string,
  id: string,
): Promise<{ favoriteCount: number; isFavorite: boolean }> {
  const url = `${APP_BASE_URL}/${path}/${id}`;

  const { favoriteCount, isFavorite } = await requestWithToken(url);
  return { favoriteCount, isFavorite };
}

export async function favorite(path: string, id: string) {
  const url = `${APP_BASE_URL}/${path}/${id}/favorite`;
  return requestWithToken(url, { method: "POST" });
}

export async function deleteFavorite(path: string, id: string) {
  const url = `${APP_BASE_URL}/${path}/${id}/favorite`;
  return requestWithToken(url, { method: "DELETE" });
}
