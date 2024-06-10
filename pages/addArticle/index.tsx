import postArticle from "@/apis/postArticle";
import CustomFileInput from "@/components/Inputs/CustomFileInput";
import CustomInput from "@/components/Inputs/CustomInput";
import CustomTextArea from "@/components/Inputs/CustomTextArea";
import RegisterButton from "@/components/RegisterButton";
import { useRouter } from "next/router";
import React, { ChangeEvent, useState } from "react";

interface NewArticle {
  title: string;
  content: string;
  image: File | null;
}

const AddArticle = () => {
  const router = useRouter();
  const [newArticle, setNewArticle] = useState<NewArticle>({
    title: "",
    content: "",
    image: null,
  });
  const buttonActivate = newArticle.title && newArticle.content;

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewArticle((prevValues: NewArticle) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewArticle((prevValues: NewArticle) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  //사진 입력
  const upLoadImg = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;

    if (files && files.length > 0) {
      setNewArticle((prevValues) => ({
        ...prevValues,
        [name]: files[0],
      }));
    }
  };

  //사진 삭제
  const cancelUPLoadImg = () => {
    setNewArticle((prevValues) => ({
      ...prevValues,
      image: null,
    }));
  };

  const handleEnrollButton = async () => {
    try {
      await postArticle({
        image: newArticle.image,
        content: newArticle.content,
        title: newArticle.title,
      });
      alert("게시글을 등록하였습니다");
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      router.push("/boards");
    }
  };

  return (
    <div className="max-w-[122rem] h-screen px-[1rem] mx-auto my-[2.4rem] flex flex-col gap-[2.4rem]">
      <div className="flex justify-between">
        <h2 className="font-bold text-[2rem] leading-[2.4rem] my-auto mx-0">
          게시글 쓰기
        </h2>
        <RegisterButton
          width={74}
          height={42}
          disabled={!buttonActivate}
          onClick={handleEnrollButton}
        >
          등록
        </RegisterButton>
      </div>

      <CustomInput
        label="*제목"
        placeholder="제목을 입력하세요"
        id="title"
        name="title"
        value={newArticle.title}
        onChange={handleTitleChange}
      />
      <CustomTextArea
        label="*내용"
        placeholder="내용을 입력하세요"
        id="content"
        name="content"
        textAreaHeight={200}
        value={newArticle.content}
        onChange={handleContentChange}
      />
      <CustomFileInput
        name="image"
        value={newArticle.image}
        onChange={upLoadImg}
        onDelete={cancelUPLoadImg}
      />
    </div>
  );
};

export default AddArticle;
