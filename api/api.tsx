import axios from "@/lib/axios";
import { ArticleType, ArticleFormData } from "@/types/type";

// getArticle 함수(게시글)
export async function getArticle(
  page: number,
  pageSize: number,
  orderby: string,
  keyword: string
): Promise<ArticleType[]> {
  const res = await axios.get(
    `/articles?page=${page}&pageSize=${pageSize}&orderBy=${orderby}&keyword=${keyword}`
  );

  const articleList = res.data.list;
  return articleList;
}

// getBestArticle 함수(베스트 게시글)
export async function getBestArticle(
  page: number,
  pageSize: number,
  orderby: string
): Promise<ArticleType[]> {
  const res = await axios.get(
    `/articles?page=${page}&pageSize=${pageSize}&orderBy=${orderby}`
  );

  const articleList = res.data.list;
  return articleList;
}

//createArticle 함수(게시글 작성)
export async function createArticle(
  formData: ArticleFormData,
  accessToken: string | null
) {
  try {
    const res = await axios.post(`/articles`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch (e) {
    console.error(`error : ${e}`);
    throw new Error();
  }
}

//createImageUrl함수(서버에 이미지를 올리기 위한 사전작업)
export async function createImageUrl(
  image: FormData,
  accessToken: string | null
) {
  try {
    const res = await axios.post(`/images/upload`, image, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch (e) {
    throw new Error("이미지 업로드에 실패했습니다.");
  }
}
