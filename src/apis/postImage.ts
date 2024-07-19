import axiosInstance from "@/apis/axiosInstance";

interface PostImageResponse {
  url?: null | Blob | MediaSource;
}

const postImage = async (token: string | null, image?: any) => {
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
          Authorization: `Bearer ${token}`,
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
