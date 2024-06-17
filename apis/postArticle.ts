import axiosInstance from "./api";
import postImage from "./postImage";
import { ArticleType } from "@/constants/type";

interface PostArticleParams {
  image?: File | null;
  content: string;
  title: string;
}

export type PostArticle = (prop: PostArticleParams) => Promise<ArticleType>;

const postArticle: PostArticle = async ({ image, content, title }) => {
  try {
    if (image) {
      const imageUrl = await postImage({ image });
      const { data } = await axiosInstance.post<ArticleType>(`articles`, {
        image: imageUrl,
        content,
        title,
      });
      return data;
    } else {
      const { data } = await axiosInstance.post<ArticleType>(`articles`, {
        content,
        title,
      });
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
