import axios from "@/lib/axios";
import { privateApi } from "@/lib/axios";

const RECENT = "recent";
export const PAGE_SIZE = 10;

export async function getArticlesData({
  page = 1,
  pageSize = 10,
  orderBy = RECENT,
  keyword = "",
}) {
  const query = `page=${page}&pageSize=${pageSize}&orderBy=${orderBy}&keyword=${keyword}`;
  const res = await axios.get(`/articles?${query}`);
  const data = res.data;

  return data;
}

export async function getArticle(id) {
  const res = await axios.get(`/articles/${id}`);
  const data = res.data;

  return data;
}

export async function getArticleComments({ articleId, limit }) {
  try {
    const res = await axios.get(
      `/articles/${articleId}/comments?limit=${limit}`,
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function postArticle(values) {
  const accessToken = localStorage.getItem("accessToken");

  const res = await axios.post(`/articles`, values, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res;
}

export async function postFile(file) {
  const res = await axios.post(`/images/upload`, file, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res;
}

export async function postArticleComment({ articleId, content }) {
  const accessToken = localStorage.getItem("accessToken");

  const res = await axios.post(
    `/articles/${articleId}/comments`,
    { content },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return res;
}

export async function signUpUser(formValues) {
  const res = await axios.post(`/auth/signUp`, formValues, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = res.data;
  return data.user?.id;
}

export async function signInUser({ email, password }) {
  const res = await axios.post(
    `/auth/signIn`,
    { email, password },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  const data = res.data;

  const accessToken = data.accessToken;
  const refreshToken = data.refreshToken;
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);

  return data.user?.id;
}

export async function deleteComment(commentId) {
  try {
    const accessToken = localStorage.getItem("accessToken");

    const res = await axios.delete(`/comments/${commentId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (res.ok) {
      return true;
    } else {
      const failData = res.data;
      throw new Error(failData.message);
    }
  } catch (err) {
    window.alert(err.message);
  }
}

export async function patchComment({ targetId, newContent }) {
  try {
    const accessToken = localStorage.getItem("accessToken");

    const res = await axios.patch(
      `/comments/${targetId}`,
      { newContent },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    const data = res.data;
    if (res.ok) {
      return data;
    } else {
      throw new Error(data.message);
    }
  } catch (err) {
    window.alert(err.message);
  }
}

// export async function postRefreshToken() {
//   const refreshToken = localStorage.getItem("refreshToken");

//   const res = axios.post(`/auth/refresh-token`, {
//     headers: {
//       Authorization: `Bearer ${refreshToken}`,
//     },
//   });

//   if (res.ok) {
//     const data = res.data;
//     localStorage.setItem("accessToken", data.accessToken);
//     localStorage.setItem("refreshToken", data.refreshToken);
//     return data.accessToken;
//   } else {
//     throw new Error("토큰을 새로 받아오지 못했습니다");
//   }
// }
