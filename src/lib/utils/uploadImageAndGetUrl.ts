import { APP_BASE_URL } from "@/constants/common";
import { requestWithToken } from "@/lib/api/api";

const uploadImageAndGetUrl = async (image: File) => {
  if (typeof image === "string") return console.log("file만 받을 수 있습니다");

  try {
    const formData = new FormData();
    formData.append("image", image, image.name);

    const response = await requestWithToken(`${APP_BASE_URL}/images/upload`, {
      method: "POST",
      body: formData,
      headers: {},
    });
    const data = await response;
    return data.url;
  } catch (error) {
    alert(`Error uploading image: ${error}`);
    throw error;
  }
};

export default uploadImageAndGetUrl;
