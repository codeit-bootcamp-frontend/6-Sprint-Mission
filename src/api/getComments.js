import { instance } from "./Axios";

export const getComments = async (productId, limit) => {
  try {
    const response = await instance.get(`/products/${productId}/comments`, {
      params: {
        limit,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
