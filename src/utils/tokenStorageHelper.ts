import { User } from "../types";

export const setAccessToken = (token: string): void => {
  localStorage.setItem("accessToken", token);
};

export const getAccessToken = (): string | null => {
  return localStorage.getItem("accessToken");
};

export const removeAccessToken = (): void => {
  localStorage.removeItem("accessToken");
};

export const setRefreshToken = (token: string): void => {
  localStorage.setItem("refreshToken", token);
};

export const getRefreshToken = (): string | null => {
  return localStorage.getItem("refreshToken");
};

export const removeRefreshToken = (): void => {
  localStorage.removeItem("refreshToken");
};

export const clearTokens = (): void => {
  removeAccessToken();
  removeRefreshToken();
};

export const setUser = (user: User): void => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const removeUser = (): void => {
  localStorage.removeItem("user");
};

export const clearStorage = (): void => {
  clearTokens();
  removeUser();
};
