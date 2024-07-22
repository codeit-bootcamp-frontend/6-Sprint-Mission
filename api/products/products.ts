import axios from "@/lib/axios";
import { ProductForm } from "@/types/product";

export const PAGE_SIZE = 10;

const getProductsData = async ({
  page = 1,
  pageSize = PAGE_SIZE,
  orderBy = "recent",
  keyword = "",
}) => {
  const query = `page=${page}&pageSize=${pageSize}&orderBy=${orderBy}&keyword=${keyword}`;
  const res = await axios.get(`products/?${query}`);
  return res.data;
};

export default getProductsData;

export const postProduct = async (values: ProductForm) => {
  const res = await axios.post(`products`, values);
  return res.data;
};

export const patchProduct = async ({
  productId,
  values,
}: {
  productId: number;
  values: any;
}) => {
  const res = await axios.patch(`products/${productId}`, values);
};

export const deleteProduct = async (productId: number) => {
  await axios.delete(`products/${productId}`);
};
