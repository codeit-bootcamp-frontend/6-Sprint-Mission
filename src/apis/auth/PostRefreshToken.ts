import { Token } from "@/types/api";
import axiosInstance from "../axiosInstance";

const PostRefreshToken = async (
  refreshToken: string | null
): Promise<string> => {
  try {
    const { data } = await axiosInstance.post<string>("/auth/refresh-token", {
      refreshToken: refreshToken,
    });
    return data;
  } catch (error) {
    console.error(`Failed to fetch data: ${error}`);
    throw error;
  }
};

export default PostRefreshToken;
