import { ImageResponseBody } from "@/interfaces/Image.interface";
import axios from "@/lib/axiosWithToken";
import { AxiosResponse } from "axios";

export const uploadImage = async (image: File) => {
  const formData = new FormData();
  formData.append("image", image);

  const res: AxiosResponse<ImageResponseBody> = await axios.post(
    "/images/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        test: "hi",
      },
    }
  );
  return res.data.url;
};
