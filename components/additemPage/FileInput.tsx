import { postFile } from "@/api/api";
import { ProductForm } from "@/types/product";
import Image from "next/image";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

const FileInput = ({
  setValues,
}: {
  setValues: Dispatch<SetStateAction<ProductForm>>;
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [preview, setPreview] = useState<string>();

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    setInputValue(e.target.value);
    const selectedFile = e.target.files[0];
    const previewUrl = URL.createObjectURL(selectedFile);
    setPreview(previewUrl);

    const formData = new FormData();
    formData.append("image", selectedFile);
    // formData.get("image") 폼 데이터 안에 내용이 잘 저장되었는지 확인하는 메서드
    const fileUrlResponse = await postFile(formData);
    const fileUrlData = await fileUrlResponse.data;

    setValues((prev) => {
      return {
        ...prev,
        images: fileUrlData.url,
      };
    });
  };

  const handlePreviewDelete = () => {
    setValues((prev) => ({
      ...prev,
      images: "",
    }));
    setPreview("");
    setInputValue("");
  };

  return (
    <div>
      <div className="mb-12 text-18 font-bold text-[#1f2937]">상품 이미지</div>
      <div className="flex gap-24 h-290">
        <label
          className="flex h-282 w-282 cursor-pointer flex-col items-center justify-center rounded-12 bg-[#f3f4f6] text-[#9ca3af]"
          htmlFor="FileInput"
        >
          <div className="text-56 font-extralight">+</div>
          <div className="text-16">이미지 등록</div>
        </label>
        <input
          id="FileInput"
          className="hidden"
          type="file"
          placeholder="이미지 등록"
          onChange={handleFileChange}
        />
        {preview && (
          <div className="relative">
            <Image
              className="rounded-12"
              src={preview}
              width={282}
              height={282}
              alt="미리보기이미지"
            />
            <Image
              onClick={handlePreviewDelete}
              className="absolute right-8 top-8 cursor-pointer bg-[transparent]"
              src="/images/ic_X.svg"
              width={24}
              height={24}
              alt="x아이콘"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default FileInput;
