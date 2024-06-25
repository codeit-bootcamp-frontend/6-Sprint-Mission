import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "@/lib/axios";
import Input from "@/src/components/input/Input";
import TextArea from "@/src/components/input/TextArea";
import FileInput from "@/src/components/input/FileInput";
import deleteIcon from "@/public/icons/ic_X.svg";
import SubmitButton from "@/src/components/button/SubmitButton";

interface IarticleType {
  title: string;
  content: string;
  image?: string;
}

const AddBoard = () => {
  const [disabled, setDisabled] = useState(true);
  const [articleValues, setArticleValues] = useState<IarticleType>({
    title: "",
    content: "",
    image: "",
  });

  const onChangeText: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    setArticleValues((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };

  const onChangeFileInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const imgUrl = URL.createObjectURL(e.target.files[0]);
      setArticleValues((prev) => {
        return { ...prev, image: `${imgUrl}` };
      });
    } else {
      console.log("No file selected or file input cleared");
    }
  };

  const onClickDeleteIcon = () => {
    setArticleValues((prev) => {
      return { ...prev, image: "" };
    });
  };

  /**
   * @TODO 로그인 기능 구현 후 이어서 작업
   */
  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    const { title, content, image } = articleValues;
    if (image) {
      try {
        const formData = new FormData();
        formData.append("image", image);

        const res = await axios.post("/images/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } catch (error) {
        console.error("post image error!");
      }
    }
  };

  useEffect(() => {
    const { title, content } = articleValues;
    title !== "" && content !== "" ? setDisabled(false) : setDisabled(true);
  }, [articleValues]);

  return (
    <div className="px-6 py-6 max-w-[1200px] w-full mx-auto">
      <form onSubmit={handleFormSubmit}>
        <div className="flex justify-between items-center">
          <SubmitButton disabled={disabled}>등록</SubmitButton>
        </div>
        <div className="grid gap-6 mt-6">
          <div className="grid gap-3">
            <label htmlFor="title" className="text-lg font-bold leading-[1.2]">
              *제목
            </label>
            <Input
              id="title"
              value={articleValues.title}
              onChange={onChangeText}
              placeholder="제목을 입력해주세요"
            />
          </div>
          <div className="grid gap-3">
            <label
              htmlFor="content"
              className="text-lg font-bold leading-[1.2]"
            >
              *내용
            </label>
            <TextArea
              id="content"
              value={articleValues.content}
              onChange={onChangeText}
              placeholder="내용을 입력해주세요"
              heightStyle={282}
            />
          </div>
          <div className="grid gap-3">
            <label htmlFor="image" className="text-lg font-bold leading-[1.2]">
              이미지
            </label>
            <div className="flex gap-6">
              <FileInput id={"image"} onChange={onChangeFileInput} />
              {articleValues.image !== "" && (
                <div className="relative w-[282px] h-[282px] rounded-xl overflow-hidden">
                  <Image
                    src={`${articleValues.image}`}
                    alt="이미지 미리보기"
                    fill
                    objectFit="contain"
                  />
                  <Image
                    src={deleteIcon}
                    alt="삭제"
                    onClick={onClickDeleteIcon}
                    className="absolute top-2 right-2 cursor-pointer"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddBoard;
