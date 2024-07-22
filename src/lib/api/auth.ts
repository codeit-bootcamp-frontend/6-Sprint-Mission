import { APP_BASE_URL } from "@/constants/common";
import { requestWithToken } from "./api";
import { deleteCookie, setCookie } from "cookies-next";
import { INITIAL_USER_ATOM } from "@/recoil/atoms/UserAtom";

type SingInRequestDataType = {
  email: string;
  password: string;
};

type SignUpRequestDataType = {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
};

export async function login(setUserAtom: any, data: SingInRequestDataType) {
  const response = await fetch(`${APP_BASE_URL}/auth/signIn`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Login failed: ${response.statusText}`);
  }

  const userData = await response.json();

  setCookie("accessToken", userData.accessToken, { maxAge: 60 * 60 * 24 }); // 1 day
  setCookie("refreshToken", userData.refreshToken, { maxAge: 60 * 60 * 24 });
  setUserAtom(userData);
}

export async function signUp(data: SignUpRequestDataType) {
  return await requestWithToken(`${APP_BASE_URL}/auth/signUp`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function logout(setUserAtom: any) {
  deleteCookie("accessToken");
  deleteCookie("refreshToken");
  setUserAtom(INITIAL_USER_ATOM);
}

export async function getUserInfo(setUserAtom: any) {
  const response = await requestWithToken(`${APP_BASE_URL}/users/me`);
  setUserAtom((prevAtom: typeof INITIAL_USER_ATOM) => ({
    ...prevAtom,
    user: response,
  }));
}

export async function getUserProducts() {
  return await requestWithToken(`${APP_BASE_URL}/users/me/products`);
}

export async function getUserFavorites() {
  return await requestWithToken(`${APP_BASE_URL}/users/me/favorites`);
}

export async function updateUserInfo(
  setUserAtom: any,
  updatedUserInfo: Partial<User>,
) {
  const formData = new FormData();

  for (const key in updatedUserInfo) {
    formData.append(key, JSON.stringify(updatedUserInfo[key as keyof User]));
  }

  const response = await requestWithToken(`${APP_BASE_URL}/users/me`, {
    method: "PATCH",
    body: formData,
    headers: { "Content-Type": "multipart/form-data" },
  });

  const updatedUser = response?.data ?? {};
  setUserAtom((prevAtom: typeof INITIAL_USER_ATOM) => ({
    ...prevAtom,
    user: updatedUser,
  }));
}
