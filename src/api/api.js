import instance from "./axiosInstance.ts";

export async function getProducts({
  page = 1,
  pageSize = 10,
  orderBy = "favorite",
}) {
  try {
    const response = await instance.get("products", {
      params: {
        page,
        pageSize,
        orderBy,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}
