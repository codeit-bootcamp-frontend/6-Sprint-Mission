// api.tsx
import { instance } from "./apiManager";

export const fetchProducts = async () => {
  try {
    const response = await instance.get("/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const fetchallProducts = async (orderBy: string) => {
  try {
    const response = await instance.get("/products", {
      params: {
        orderBy: orderBy,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

/*
export const fetchallProducts = async (sortBy: string) => {
  try {
    const response = await instance.get("/products", {
      params: {
        orderBy: sortBy,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
*/
