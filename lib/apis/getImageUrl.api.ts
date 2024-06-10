import postInstance from "../instanceWithToken";
import { AxiosResponse } from "axios";

export type imageResponse = {
  url: string;
};

export type ImageData = {
  image?: string | File | null;
};

export async function getImageUrl(image: ImageData) {
  try {
    const response: AxiosResponse<imageResponse> = await postInstance.post("/images/upload", image);
    if (response.status === 200 || response.status === 201) {
      return response.data;
    }
  } catch (e) {
    console.log(`error : ${e}`);
    throw new Error();
  }
}
