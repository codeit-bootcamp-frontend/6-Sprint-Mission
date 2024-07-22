import { axiosInstance } from './axios';

type ItemsResponse = {
  updatedAt: string;
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

type GetItemResponse = {
  totalCount: number;
  list: ItemsResponse[];
};

export const getItems = async (): Promise<GetItemResponse> => {
  try {
    const response = await axiosInstance.get<GetItemResponse>('/products');
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch items: ${error}`);
    throw new Error('정보를 불러오는데 실패했습니다');
  }
};

export type ItemResponse = {
  createdAt: string;
  favoriteCount: number;
  ownerId: number;
  images: string[];
  tags: string[];
  price: number;
  description: string;
  name: string;
  id: number;
  isFavorite: boolean;
};

export const getItemsId = async (productId: number): Promise<ItemResponse | undefined> => {
  try {
    const productIdNumber = productId;
    const response = await axiosInstance.get<ItemResponse>(`/products/${productIdNumber}`);
    return response.data;
  } catch (error) {
    console.log(`Failed to fetch items: ${error}`);
    console.error(`정보를 불러오는데 실패했습니다`);
  }
};

type WriterResponse = {
  nickname: string;
  image: string;
  id: number;
};

export type GetCommentsResponse = {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  writer: WriterResponse;
  itemId: string | undefined;
};

type GetCommentListResponse = {
  nextCursor: number;
  list: GetCommentsResponse[];
};

export const getItemsComments = async (
  productId: string | undefined,
  cursor: number | null,
  limit: number
): Promise<GetCommentListResponse | undefined> => {
  try {
    const response = await axiosInstance.get<GetCommentListResponse>(`/products/${productId}/comments`, {
      params: {
        cursor,
        limit,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch data: ${error}`);
    return undefined;
  }
};

type CommentType = {
  content: string;
};

export const postItemComment = async (
  content: string,
  itemId: string | undefined,
  token: string | null
): Promise<CommentType> => {
  try {
    const response = await axiosInstance.post(
      `/products/${itemId}/comments`,
      { content },
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

export const patchItemComment = async (
  content: string,
  commentId: number | undefined,
  token: string | null
): Promise<CommentType> => {
  try {
    const response = await axiosInstance.patch(
      `/comments/${commentId}`,
      { content },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Failed to patch comment: ${error}`);
    throw new Error('댓글 수정에 실패했습니다');
  }
};

type DeleteComment = {
  id: string;
};

export const deleteItemComment = async (
  commentId: number | undefined,
  token: string | null
): Promise<DeleteComment> => {
  try {
    const response = await axiosInstance.delete(`/comments/${commentId}`, {
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
