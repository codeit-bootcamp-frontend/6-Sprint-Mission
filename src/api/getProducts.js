import { instance } from "./Axios";

export const getProducts = async () => {
  try {
    const response = await instance.get("/products");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};