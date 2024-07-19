import postArticles from "@/apis/article/postArticles";
import postImage from "@/apis/postImage";
import Form from "@/components/addBoardComponents/Form";
import FormTitle from "@/components/addBoardComponents/FormTitle";
import Header from "@/components/shared/Header/Header";
import { css } from "@/styled-system/css";
import { AccessTokenTOLocalStorage } from "@/utils/localStorageToken";
import { useRouter } from "next/router";
import React, { useState } from "react";

interface PostData {
  content: string;
  title: string;
  image?: null | Blob | MediaSource;
}

function AddBoard() {
  const [postData, setUserData] = useState<PostData>({
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
    setUserData({
      ...postData,
      [name]: value,
    });
  };

  const onChangeImage = async (e: any) => {
    const file = e.target.files[0];
    setAddImage(file);
    const token = localStorage.getItem("accessToken");
    const response = await postImage(token, file);
    setUserData({
      ...postData,
      image: response.url,
    });
  };

  const handleSubmit = async () => {
    if (!isValid) return;
    const token = await AccessTokenTOLocalStorage();
    await postArticles(postData, token);
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
        <FormTitle isValid={isValid} handleSubmit={handleSubmit} />
        <Form
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
