import { instance } from "./Axios";

export const uploadImage = async (
  imgFile: File,
  accessToken: string
): Promise<string | undefined> => {
  try {
    const formData = new FormData();
    formData.append("image", imgFile);

    const response = await instance.post("/images/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 200) {
      return response.data.url;
    } else {
      console.error("Error uploading image:", response.statusText);
      return undefined;
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    return undefined;
  }
};

export const postArticle = async (
  title: string,
  content: string,
  imageUrl: string | undefined,
  accessToken: string
): Promise<void> => {
  try {
    const requestBody = {
      title,
      content,
      image: imageUrl,
    };

    const response = await instance.post("/articles", requestBody, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status !== 200) {
      throw new Error("Failed to post article");
    }
  } catch (error) {
    console.error("Error posting article:", error);
    throw error;
  }
};
