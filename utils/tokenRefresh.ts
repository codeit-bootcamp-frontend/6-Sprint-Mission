import axios from "@/lib/axiosWithToken";

export const tokenRefresh = async (refreshToken: string) => {
  const { data } = await axios.post("/auth/refresh-token", {
    refreshToken,
  });

  const newAccessToken = data.accessToken;
  localStorage.setItem("accessToken", newAccessToken);
};
