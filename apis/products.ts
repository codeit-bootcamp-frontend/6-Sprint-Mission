import axios from './instance';

export async function getProductById(id: number) {
  const res = await axios.get(`/products/${id}`);
  return res.data;
}

export async function getProductComments(productId: number) {
  const res = await axios.get(`/products/${productId}/comments?limit=100`);
  return res.data.list;
}

export async function postProductComment(productId: number, content: string) {
  const res = await axios.post(`/products/${productId}/comments`, { content });
  return res.data;
}
