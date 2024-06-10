import { axiosInstance } from "./api";
import postImage from "./postImage";

interface PostArticleParams {
  image?: File | null;
  content: string;
  title: string;
}

interface Response {
  createdAt: string;
  updatedAt: string;
  likeCount: number;
  writer: {
    id: number;
    nickname: string;
  };
  image: string | null;
  content: string;
  title: string;
  id: number;
}

export type PostArticle = (prop: PostArticleParams) => Promise<Response>;

const postArticle: PostArticle = async ({ image, content, title }) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (image) {
      const imageUrl = await postImage({ image });
      console.log(imageUrl);
      const { data } = await axiosInstance.post<Response>(
        `articles`,
        {
          image: imageUrl,
          content,
          title,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return data;
    } else {
      const { data } = await axiosInstance.post<Response>(
        `articles`,
        {
          content,
          title,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return data;
    }
  } catch (error) {
    console.error("APP ERROR: ", error);
    if (error instanceof Error) {
      throw new Error(`게시글을 등록할 수 없습니다`, error);
    }
    throw new Error("알 수 없는 오류로 게시글을 등록할 수 없습니다.");
  }
};

export default postArticle;
