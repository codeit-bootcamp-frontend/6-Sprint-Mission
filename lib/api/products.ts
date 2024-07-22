import { axiosInstance } from './axios';

type PostProduct = {
  createdAt: string;
  favoriteCount: number;
  ownerId: number;
  images: string[];
  tags: string[];
  price: number;
  description: string;
  name: string;
  id: number;
};

type Props = {
  name: string;
  description: string;
  images: string[] | undefined;
  tags: string[];
  price: number;
  token: string | null;
};

export const postProduct = async ({ name, description, images, tags, price, token }: Props): Promise<PostProduct> => {
  try {
    const response = await axiosInstance.post(
      `/products`,
      { name, description, images, tags, price },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Failed to post comment: ${error}`);
    throw new Error('댓글 작성에 실패했습니다');
  }
};

type PatchProps = {
  name: string;
  description: string;
  images: string[] | undefined;
  tags: string[];
  price: number;
  token: string | null;
  productId: number;
};

export const patchProduct = async ({
  name,
  description,
  images,
  tags,
  price,
  token,
  productId,
}: PatchProps): Promise<PostProduct> => {
  try {
    const response = await axiosInstance.patch(
      `/products/${productId}`,
      { name, description, images, tags, price },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Failed to post comment: ${error}`);
    throw new Error('댓글 작성에 실패했습니다');
  }
};

type DeleteProduct = {
  id: string;
};

export const deleteProduct = async (productId: string | undefined, token: string | null): Promise<DeleteProduct> => {
  try {
    const response = await axiosInstance.delete(`/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to delete comment: ${error}`);
    throw new Error('댓글 삭제에 실패했습니다');
  }
};
