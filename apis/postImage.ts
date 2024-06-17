import axiosInstance from "./api";

interface PostImageParams {
  image: File;
}
export type PostImage = (prop: PostImageParams) => Promise<string>;

const postImage: PostImage = async ({ image }) => {
  const formData = new FormData();
  formData.append("image", image);
  try {
    const { data } = await axiosInstance.post<Response>(
      `images/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return data.url;
  } catch (error) {
    console.error("APP ERROR: ", error);
    if (error instanceof Error) {
      throw new Error(`이미지 업로드 실패`);
    }
    throw new Error("알 수 없는 오류로 이미지 업로드 실패");
  }
};

export default postImage;
