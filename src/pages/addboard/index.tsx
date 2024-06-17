import postArticles from "@/apis/article/postArticles";
import postImage from "@/apis/postImage";
import ArticleForm from "@/components/addBoardComponents/ArticleForm";
import ArticleFormTitle from "@/components/addBoardComponents/ArticleFormTitle";
import Header from "@/components/shared/Header/Header";
import { css } from "@/styled-system/css";
import { getToken } from "@/utils/localStorageToken";
import { useRouter } from "next/router";
import React, { useState } from "react";

interface PostData {
  content: string;
  title: string;
  image?: null | Blob | MediaSource;
}

function AddBoard() {
  const [postData, setPostData] = useState<PostData>({
    content: "",
    title: "",
    image: null,
  });
  const router = useRouter();
  const [addImage, setAddImage] = useState<Blob | MediaSource>();

  const onChangeInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPostData({
      ...postData,
      [name]: value,
    });
  };

  const onChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      console.error("파일골라라");
      return;
    }
    const file = e.target.files[0];
    setAddImage(file);
    const token = localStorage.getItem("accessToken");
    const response = await postImage(file);
    setPostData({
      ...postData,
      image: response.image,
    });
  };

  const handleSubmit = async () => {
    if (!isValid) return;
    await postArticles(postData);
    router.push("/boards");
  };
  const isValid: boolean = !!(postData.content && postData.title);

  return (
    <div>
      <Header />
      <div
        className={css({
          m: "auto",
          maxW: "1200px",
          p: { base: "16px", md: "16px 24px", xl: "24px" },
        })}
      >
        <ArticleFormTitle isValid={isValid} handleSubmit={handleSubmit} />
        <ArticleForm
          postData={postData}
          file={addImage}
          onChangeInput={onChangeInput}
          onChangeImage={onChangeImage}
        />
      </div>
    </div>
  );
}

export default AddBoard;
