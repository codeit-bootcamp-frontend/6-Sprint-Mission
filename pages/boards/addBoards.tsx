import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import ArticleImg from "@/components/ArticleImg";
import styles from "@/styles/addBoards.module.css";
import { useRouter } from "next/router";
import { articleRegisterValidation } from "@/utils/validations";
import { postArticle } from "@/lib/apis/postArticle.api";
import { getImageUrl } from "@/lib/apis/getImageUrl.api";
import { ArticleFormData } from "@/lib/apis/postArticle.api";
import { ImageData } from "@/lib/apis/getImageUrl.api";

export interface ArticleValue {
  title: string;
  content: string;
  image: File | null;
}

interface ImageUrl {
  image: string | File | null;
}

const WriteArticle = () => {
  const [articleValue, setArticleValue] = useState<ArticleValue>({
    image: null,
    content: "",
    title: "",
  });

  const [isValidBtn, setIsValidBtn] = useState<boolean>(true);
  const router = useRouter();

  const handleChange = (name: string, value: string | File | null) => {
    setArticleValue((prevArticleValue) => ({
      ...prevArticleValue,
      [name]: value,
    }));
  };

  const handleInputValuesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleTextAreaValuesChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    const imageData = new FormData();
    try {
      data.append("title", articleValue.title);
      data.append("content", articleValue.content);
      if (articleValue.image) {
        imageData.append("image", articleValue.image);
        const res = await getImageUrl(imageData as ImageData);
        const url = res?.url;
        if (url) {
          data.append("image", url);
          try {
            await postArticle(data as ArticleFormData);
            router.push("/boards");
          } catch (e) {
            console.error(`error : ${e}`);
            alert("등록에 실패했습니다.");
          }
        }
      } else {
        try {
          await postArticle(data as ArticleFormData);
          router.push("/boards");
        } catch (e) {
          console.error(`error : ${e}`);
          alert("등록에 실패했습니다.");
        }
      }
    } catch (e) {
      console.error(`error : ${e}`);
      alert("잘못된 파일 형식입니다.");
    }
  };

  useEffect(() => {
    const isValidInput = articleRegisterValidation({ ...articleValue });
    setIsValidBtn(isValidInput);
  }, [articleValue]);

  return (
    <form className={styles["article-form"]} onSubmit={handleSubmit}>
      <div className={styles["article-form-top"]}>
        <h2 className={styles["article-form-top-title"]}>게시글 쓰기</h2>
        <button
          id="register-btn"
          className={styles[isValidBtn ? "register-btn" : "active"]}
          disabled={isValidBtn}
          type="submit"
        >
          등록
        </button>
      </div>
      <div className={styles["article-name container"]}>
        <h3>
          <span className={styles["article-name-span"]}>*</span>제목
        </h3>
        <label htmlFor="article-title" className={styles["article-title-label"]}></label>
        <input
          name="title"
          type="text"
          id="article-title"
          className={styles["article-title-input"]}
          placeholder="제목을 입력해주세요"
          onChange={handleInputValuesChange}
          value={articleValue.title}
        />
      </div>
      <div className={styles["article-content container"]}>
        <h3>
          <span className={styles["article-content-span"]}>*</span>내용
        </h3>
        <label htmlFor="article-content" className={styles["article-content-label"]}></label>
        <textarea
          name="content"
          className={styles["article-content-textarea"]}
          id="article-content"
          placeholder="내용을 입력해주세요"
          onChange={handleTextAreaValuesChange}
          value={articleValue.content}
        ></textarea>
      </div>
      <ArticleImg name="image" value={articleValue.image} onChange={handleChange} />
    </form>
  );
};

export default WriteArticle;
