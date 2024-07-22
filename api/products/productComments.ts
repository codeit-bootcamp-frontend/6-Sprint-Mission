import axios from "@/lib/axios";
const limit = 5;

const getProductComments = async (productId: number) => {
  const res = await axios.get(`products/${productId}/comments?limit=${limit}`);
  return res.data;
};

export default getProductComments;

export const postProductComment = async ({
  productId,
  inputValue,
}: {
  productId: number;
  inputValue: string;
}) => {
  const res = await axios.post(`products/${productId}/comments`, {
    content: inputValue,
  });
  return res.data;
};

export const patchProductComment = async ({
  commentId,
  newValue,
}: {
  commentId: number;
  newValue: string;
}) => {
  const res = await axios.patch(`/comments/${commentId}`, {
    content: newValue,
  });
};
