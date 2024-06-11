import { Article, Comments, UserData } from "../model";
import { BASE_URL } from "../constants/constants";
import { getCookie, setCookie } from "../lib/login";
import { ImageUrlObject } from "../model/index";

export async function getArticleWithId(id: string) {
  try {
    const res = await fetch(`${process.env.BASE_URL}/articles/${id}`);
    const data: Article = await res.json();
    return data;
  } catch (error) {
    throw new Error();
  }
}

export async function getCommentWithId(id: string, cursor: number | null) {
  try {
    const res = await fetch(
      `${process.env.BASE_URL}/articles/${id}/comments?limit=10${cursor !== null ? `&&cursor=${cursor}` : ""}`,
    );
    const data: Comments = await res.json();
    return data;
  } catch (error) {
    throw new Error();
  }
}

type PostArticle = {
  image?: File;
  content: string;
  title: string;
};

export async function postArticle(data: PostArticle) {
  try {
    const refreshToken = getCookie("refreshToken");
    if (!refreshToken) return;
    if (!getCookie("accessToken")) {
      await postRefreshToken(refreshToken);
    }
    const Credential = getCookie("accessToken");
    let { image, content, title } = data;
    let postData;
    if (!Credential) return;
    if (image) {
      const data: ImageUrlObject = await postImage(image);
      if (data == null) {
        postData = { content, title };
      } else {
        postData = { content, title, image: data.url };
      }
    } else {
      postData = { content, title };
    }
    const response = await fetch(`${BASE_URL}/articles`, {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Credential}`,
      },
    });
    const Data = await response.json();
  } catch (err) {
    console.error("Error:", err);
  }
}

export async function postImage(imageFile: File) {
  let formData = new FormData();
  formData.append("image", imageFile);
  try {
    const refreshToken = getCookie("refreshToken");
    if (!refreshToken) return;
    if (!getCookie("accessToken")) {
      await postRefreshToken(refreshToken);
    }
    const Credential = getCookie("accessToken");
    const response = await fetch(`${BASE_URL}/images/upload`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${Credential}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    return null;
  } catch (err) {
    throw new Error();
  }
}

export async function getToken() {
  try {
    const response = await fetch(`${BASE_URL}/auth/signIn`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "example@email.com",
        password: "password",
      }),
    });
    const data: UserData = await response.json();
    return data;
  } catch (err) {
    throw new Error();
  }
}

export async function postComment(id: string, content: string) {
  try {
    const refreshToken = getCookie("refreshToken");
    if (!refreshToken) return;
    if (!getCookie("accessToken")) {
      await postRefreshToken(refreshToken);
    }
    const Credential = getCookie("accessToken") as string;
    const response = await fetch(`${BASE_URL}/articles/${id}/comments`, {
      method: "POST",
      body: JSON.stringify({ content }),
      headers: {
        Authorization: `Bearer ${Credential}`,
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    return null;
  } catch (err) {
    throw new Error();
  }
}

async function postRefreshToken(refreshToken: string) {
  try {
    const response = await fetch(`${BASE_URL}/auth/refresh-token`, {
      method: "POST",
      body: JSON.stringify({ refreshToken }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data: { accessToken: string } = await response.json();
      setCookie("accessToken", data.accessToken, { "max-age": 1800 });
      return data;
    }
    return null;
  } catch (err) {
    throw new Error();
  }
}

export async function postArticleLike(id: number) {
  try {
    const refreshToken = getCookie("refreshToken");
    if (!refreshToken) return;
    if (!getCookie("accessToken")) {
      await postRefreshToken(refreshToken);
    }
    const Credential = getCookie("accessToken");
    if (!Credential) return;

    const response = await fetch(`${BASE_URL}/articles/${id}/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Credential}`,
      },
    });
    if (response.ok) return response.status;
    else return response.status;
  } catch (err) {
    return;
  }
}
