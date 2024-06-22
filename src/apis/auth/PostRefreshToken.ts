import axiosInstance from "../axiosInstance";
import { Token } from "@/types/api";

const postRefreshToken = async (refreshToken?: string): Promise<Token> => {
  try {
    const { data } = await axiosInstance.post<Token>("/auth/refresh-token", {
      refreshToken: refreshToken,
    });
    return data;
  } catch (error) {
    console.error(`Failed to fetch data: ${error}`);
    throw error;
  }
};

export default postRefreshToken;
