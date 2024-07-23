"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAsync from "@/src/hooks/useAsync";
import { createItems, postArticle, uploadImg } from "@/src/api/api";
import Input from "@/components/Input";
import Button from "@/components/Button/Button";
import Header from "@/components/Header";
import { useAuth } from "@/src/contexts/AuthProvider";

export default function AddBoardPage() {
  const { user } = useAuth(true);
  const [isLoading, loadingError, onSubmitAsync] = useAsync(createItems);
  const [values, setValues] = useState({
    title: "",
    content: "",
    image: "",
  });
  const router = useRouter();

  const handleChange = (name: string, value: string) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", values.content);
    if (values.image) {
      const imgForm = new FormData();
      imgForm.append("image", values.image);

      const response = await uploadImg(imgForm);
      if (!response) return;
      formData.append("image", response);
    }

    const jsonObject: { [key: string]: any } = {};
    formData.forEach((value, key) => {
      jsonObject[key] = value;
    });

    const response = await postArticle(jsonObject);
    if (!response) return;

    router.push(`/boards/${response.id}`);
  };

  if (!user) {
    return null;
  }
  return (
    <>
      <Header />
      <section className="section-add">
        <form onSubmit={handleSubmit}>
          <div className="section-wrap">
            <header className="section-header">
              <h2 className="section-tit">게시글 쓰기</h2>
              <Button type="submit" id="submit-article" size="small" disabled={values.title === "" || values.content === ""} className="btn-small btn-submit">
                등록
              </Button>
            </header>
            <section className="section-addItem-content">
              <h3 className="section-tit">
                <sup>
                  *<span className="blind">필수 입력사항</span>
                </sup>
                제목
              </h3>
              <Input.Text name="title" value={values.title} onChange={handleInputChange} placeholder="제목을 입력해주세요" />
            </section>
            <section className="section-addItem-content">
              <h3 className="section-tit">
                <sup>
                  *<span className="blind">필수 입력사항</span>
                </sup>
                내용
              </h3>
              <Input.Textarea name="content" value={values.content} onChange={handleInputChange} size="large" placeholder="내용을 입력해주세요" />
            </section>
            <section className="section-addItem-content">
              <h3 className="section-tit">상품 이미지</h3>
              <Input.File name="image" value={values.image} onChange={handleChange} />
            </section>
          </div>
        </form>
      </section>
    </>
  );
}
