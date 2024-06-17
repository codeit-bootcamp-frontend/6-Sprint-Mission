import instance from "@/lib/axios";
import axiosGetInstance from "@/lib/axiosGetInstance";

// GET
// 페이지네이션을 위한 전체 게시글 수
export async function getTotalPosts() {
  try {
    const params = new URLSearchParams({
      pageSize: "10000",
      orderBy: "recent",
    });

    const { data } = await axiosGetInstance.get("/articles?", { params });
    return data.list.length;
  } catch (error) {
    console.error("getTotalPosts 함수에서 오류 발생:", error);
    throw error;
  }
}

export async function getPosts({
  orderBy = "",
  keyword = "",
  page = 1,
  pageSize = 10,
}) {
  try {
    const params = new URLSearchParams({
      orderBy,
      keyword,
      page: page.toString(),
      pageSize: pageSize.toString(),
    });
    const { data } = await axiosGetInstance.get(
      `/articles?${params.toString()}`,
    );
    return data.list;
  } catch (error) {
    console.error("getPosts 함수에서 오류 발생:", error);
    throw error;
  }
}

export async function getBestPosts({ pageSize = 3 }) {
  try {
    const params = new URLSearchParams({ orderBy: "like" });

    const { data } = await axiosGetInstance.get(
      `/articles?&pageSize=${pageSize}`,
      {
        params,
      },
    );
    return data.list;
  } catch (error) {
    console.error("getBestPosts 함수에서 오류 발생:", error);
    throw error;
  }
}

export async function getPostsDetail(articleId: string) {
  try {
    const { data } = await axiosGetInstance.get(`/articles/${articleId}`);
    return data;
  } catch (error) {
    console.error("getPostsDetail 함수에서 오류 발생:", error);
    throw error;
  }
}

export async function getPostsComments(articleId: string) {
  try {
    const params = new URLSearchParams({ limit: "100" });
    const { data } = await axiosGetInstance.get(
      `/articles/${articleId}/comments?`,
      {
        params,
      },
    );
    return data.list;
  } catch (error) {
    console.error("getPostsComments 함수에서 오류 발생:", error);
    throw error;
  }
}

// POST
export async function postImages(formData: FormData, token: string) {
  try {
    const response = await instance.post("/images/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.url;
  } catch (error) {
    console.error("postImages 함수에서 오류 발생:", error);
  }
}

type PostData = {
  title: string;
  content: string;
  image?: string;
};

export async function postArticles(postData: PostData, token: string) {
  try {
    const response = await instance.post("/articles", postData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("postArticles 함수에서 오류 발생:", error);
  }
}

export async function postArticleComments(
  articleId: string,
  content: string,
  token: string,
) {
  try {
    await instance.post(
      `/articles/${articleId}/comments`,
      { content },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  } catch (error) {
    console.error("postArticleComments 함수에서 오류 발생:", error);
  }
}
