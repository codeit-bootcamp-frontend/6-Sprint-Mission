import axiosInstance from './axiosInstance';
import { AuthResponse, SignInFormValues } from '../types/auth';

export async function getAllProducts({ page = 1, pageSize = 10, orderBy = 'recent' }) {
  const query = `page=${page}&pageSize=${pageSize}&orderBy=${orderBy}`;
  const { data } = await axiosInstance.get(`products?${query}`);
  return data;
}

export async function getBestProducts() {
  const { data } = await axiosInstance.get('/products?pageSize=100&orderBy=favorite');
  return data;
}

export async function getProductDetail(params: string | undefined) {
  const { data } = await axiosInstance.get(`products/${params}`);
  return data;
}

export async function getComments(params: string | undefined) {
  const query = 10;
  const { data } = await axiosInstance.get(`products/${params}/comments?limit=${query}`);
  return data;
}

export async function postComment({
  productId,
  content,
}: {
  productId: string | undefined;
  content: string;
}) {
  const accessToken = localStorage.getItem('accessToken');
  const { data } = await axiosInstance.post(
    `products/${productId}/comments`,
    { content },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return data;
}

export async function postProduct(productData: {
  name: string;
  description: string;
  price: number;
  images: string[] | null;
  tags: string[];
}) {
  const accessToken = localStorage.getItem('accessToken');
  const { data } = await axiosInstance.post('products', productData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data;
}

export async function postImage(imageFile: File) {
  const accessToken = localStorage.getItem('accessToken');
  const formData = new FormData();
  formData.append('image', imageFile);

  const { data } = await axiosInstance.post('images/upload', formData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
}

// Auth
export async function signIn(params: SignInFormValues) {
  const { data } = await axiosInstance.post(`auth/signin`, params);
  return data;
}

export async function signUp(...rest: AuthResponse[]) {
  try {
    const { data } = await axiosInstance.post(`auth/signup`, ...rest);
    return data;
  } catch (error) {
    throw error;
  }
}
