import axiosInstance from "@/apis/axiosInstance";

interface PostImageResponse {
  image?: null | Blob | MediaSource;
}

const postImage = async (image?: any) => {
  try {
    const formData = new FormData();
    if (image) {
      formData.append("image", image);
    }
    const { data } = await axiosInstance.post<PostImageResponse>(
      "/images/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return data;
  } catch (error) {
    console.error(`Failed to fetch data: ${error}`);
    throw error;
  }
};

export default postImage;
