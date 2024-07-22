import axios from "./axios";

interface GetProductsQueries {
  page?: number;
  pageSize?: number;
  orderBy?: "recent" | "favorite";
  keyword?: string;
}

export const getProducts = async ({
  page = 1,
  pageSize = 3,
  orderBy = "recent",
  keyword,
}: GetProductsQueries) => {
  try {
    const response = await axios.get("/products", {
      params: { page, pageSize, orderBy, keyword },
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch Data: ${error}`);
    throw error;
  }
};
