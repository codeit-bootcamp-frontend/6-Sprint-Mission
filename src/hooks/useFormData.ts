import uploadImageAndGetUrl from "@/lib/utils/uploadImageAndGetUrl";
import { useState } from "react";

type FormValues = {
  [key: string]: any;
};

const useFormData = (initialData: FormValues) => {
  const [formData, setFormData] = useState(initialData);

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      const fieldValue = prevFormData[name];

      if (Array.isArray(fieldValue)) {
        // 필드 값이 배열인 경우 배열을 업데이트
        return {
          ...prevFormData,
          [name]: [...fieldValue, value],
        };
      } else {
        // 필드 값이 배열이 아닌 경우 일반 값 업데이트
        return {
          ...prevFormData,
          [name]: value,
        };
      }
    });
  };

  const handleImageChange = async (image: File | string) => {
    let uploadedImageUrl = image;
    if (typeof image !== "string") {
      uploadedImageUrl = await uploadImageAndGetUrl(image);
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      image: uploadedImageUrl,
    }));
  };

  const handleImagesChange = async (images: File[] | string[]) => {
    const uploadedImages = await Promise.all(
      images.map(async (image: File | string) => {
        if (typeof image === "string") {
          return image;
        }
        return await uploadImageAndGetUrl(image);
      }),
    );

    setFormData((prevFormData) => ({
      ...prevFormData,
      images: [...(prevFormData.images || []), ...uploadedImages],
    }));
  };

  const deleteFieldValue = (field: string, deleteValue: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: prevFormData[field].filter((el: any) => el !== deleteValue),
    }));
  };

  return {
    formData,
    setFormData,
    handleChange,
    handleImageChange,
    handleImagesChange,
    deleteFieldValue,
  };
};

export default useFormData;
