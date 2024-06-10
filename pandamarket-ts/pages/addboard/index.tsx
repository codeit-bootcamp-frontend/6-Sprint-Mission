import Layout from "@/components/UI/Layout";
import React, { useEffect, useRef, useState } from "react";
import FileInputImage from "@/public/assets/ui/file_input.svg";
import { postArticle, postImageUpload, testLogin } from "../api/api";
import { SignInResponse } from "@/types/authenticationTypes";
import { is } from "date-fns/locale";

export const getServerSideProps = async () => {
  let { accessToken }: SignInResponse = await testLogin();
  if (!accessToken) {
    accessToken = "";
  }
  return {
    props: { accessToken },
  };
};

interface indexProps {
  accessToken: string;
}

const index = ({ accessToken }: indexProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const [uploadedImage, setUploadedImage] = useState<string>("");

  const isFormValid = () => {
    return titleRef.current?.value && contentRef.current?.value;
  };

  const handleInputChange = () => {
    if (submitButtonRef.current) {
      if (isFormValid()) {
        submitButtonRef.current.classList.add("bg-blue");
        submitButtonRef.current.classList.remove("bg-gray-400");
      } else {
        submitButtonRef.current.classList.add("bg-gray-400");
        submitButtonRef.current.classList.remove("bg-blue");
      }
    }
  };

  // 억지로 DOM 조작해서 색상을 바꿔 봤는데 이렇게 하는건지 잘 모르겠습니다. onChnage로 하는게 좀 더 편하긴 하네요
  useEffect(() => {
    titleRef.current?.addEventListener("input", handleInputChange);
    contentRef.current?.addEventListener("input", handleInputChange);

    return () => {
      titleRef.current?.removeEventListener("input", handleInputChange);
      contentRef.current?.removeEventListener("input", handleInputChange);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormValid()) {
      let imageUrl = "";
      // 이미지 업로드
      if (imageRef.current?.files && imageRef.current.files[0]) {
        const file = imageRef.current.files[0];
        if (file.size > 5 * 1024 * 1024) {
          alert("5MB 이하의 이미지만 업로드 가능합니다.");
          return;
        }
        const formData = new FormData();
        formData.append("image", file);
        const { url } = await postImageUpload(formData, accessToken);
        imageUrl = url;
        setUploadedImage(imageUrl);
      }

      // 폼 제출
      const data = {
        title: titleRef.current?.value || "",
        content: contentRef.current?.value || "",
        image: uploadedImage,
      };
      const response = await postArticle(
        data.image,
        data.content,
        data.title,
        accessToken,
      );
      console.log(response);
    }
  };

  return (
    <>
      <Layout>
        <form onSubmit={handleSubmit}>
          <div className="mt-[16px] flex flex-col gap-[24px] font-bold text-gray-800">
            <div className="flex place-content-between items-center">
              <h1 className="text-[20px]">상품등록하기</h1>
              <button
                ref={submitButtonRef}
                className="rounded-[8px] bg-gray-400 px-[23px] py-[12px] text-[16px] font-semibold text-white"
              >
                등록
              </button>
            </div>
            <div className="flex flex-col gap-[24px] sm:text-[14px] md:text-[18px] lg:text-[18px]">
              <div className="flex flex-col gap-[12px]">
                <label htmlFor="title">*제목</label>
                <input
                  ref={titleRef}
                  type="text"
                  id="title"
                  className="h-[56px] w-full rounded-[12px] bg-gray-100 px-[24px] py-[16px] font-normal placeholder:text-[16px]"
                  placeholder="제목을 입력해주세요"
                />
              </div>
              <div className="flex flex-col gap-[12px]">
                <label htmlFor="content">*내용</label>
                <textarea
                  ref={contentRef}
                  name="content"
                  id="content"
                  className="h-[200px] w-full resize-none rounded-[12px] bg-gray-100 pb-[160px] pl-[24px] pt-[16px] placeholder:text-[16px] placeholder:font-normal"
                  placeholder="내용을 입력해주세요"
                />
              </div>
              <div className="flex flex-col gap-[12px]">
                <label htmlFor="image">이미지</label>
                <label htmlFor="image" className="cursor-pointer">
                  <FileInputImage />
                </label>
                <input
                  ref={imageRef}
                  type="file"
                  id="image"
                  className="hidden"
                />
              </div>
            </div>
          </div>
        </form>
      </Layout>
    </>
  );
};

export default index;
