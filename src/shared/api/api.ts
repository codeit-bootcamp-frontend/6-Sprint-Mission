import { AxiosError } from "axios";
import { instanceWithoutInterceptors } from "./axios";
import {
  GetCommentsProps,
  GetDatumProps,
  GetProductProps,
  PostAuthRefreshToken,
  SignInRequestData,
  SignInResponseData,
  SignUpRequestData,
  SignUpResponseData,
  SpecificCommentsData,
  SpecificProductData,
  TotalProductsData,
} from "./type";
import Cookies from "js-cookie";

// 나중에 전부 axios로 바꾸기
export async function getDatum({
  page = 1,
  pageSize = 10,
  orderBy = "recent",
  keyword,
}: GetDatumProps) {
  try {
    const searchParams = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
      orderBy,
    });
    if (keyword) searchParams.set("keyword", keyword);
    const response = await instanceWithoutInterceptors(`/products?`, {
      params: searchParams,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    alert(error);
    throw new Error();
  }
}

export const getProduct = async ({ productId }: GetProductProps) => {
  try {
    const response = await instanceWithoutInterceptors(
      `/products/${productId}`
    );
    const data: SpecificProductData = response.data;
    return data;
  } catch (error) {
    console.error(error);
    alert(error);
    throw Error();
  }
};

export const getComments = async ({
  productId = null,
  limit,
}: GetCommentsProps) => {
  try {
    const searchParams = new URLSearchParams({
      limit: limit.toString(),
    });
    const response = await instanceWithoutInterceptors(
      `/products/${productId}/comments`,
      {
        params: searchParams,
      }
    );
    const data: SpecificCommentsData = response.data;
    return data;
  } catch (error) {
    console.error(error);
    alert(error);
    throw new Error(`${productId}의 comments 데이터를 가져오지 못했습니다.`);
  }
};

export const postSignUp = async ({
  email,
  nickname,
  password,
  passwordConfirmation,
}: SignUpRequestData) => {
  try {
    const response = await instanceWithoutInterceptors.post(`/auth/signUp`, {
      email,
      nickname,
      password,
      passwordConfirmation,
    });
    const data: SignUpResponseData = response.data;
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response);
      alert(error.response?.data?.message);
      throw new Error();
    }
    throw new Error();
  }
};

export const postSignIn = async ({ email, password }: SignInRequestData) => {
  try {
    const response = await instanceWithoutInterceptors.post(`/auth/signIn`, {
      email,
      password,
    });
    const data: SignInResponseData = response.data;
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response);
      alert(error.response?.data?.message);
      throw new Error();
    }
    throw new Error();
  }
};

export const postAuthRefreshToken = async () => {
  try {
    const refreshToken = Cookies.get("refreshToken");
    if (refreshToken === undefined) {
      throw new Error("refreshToken이 없습니다.");
    }
    const response = await instanceWithoutInterceptors.post(
      `/auth/refresh-token`,
      { refreshToken }
    );
    const data: PostAuthRefreshToken = response.data;
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response);
      alert(error.response?.data?.message);
      throw new Error();
    }
    throw new Error();
  }
};
