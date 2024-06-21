import React, { useState } from "react";
import ImageUpload from "../ImageUpload";
import InputItem from "../InputItem";
import styles from "@/styles/AddArticle.module.css";
import { createArticle, createImageUrl } from "@/api/api";
import { ArticleFormData } from "@/types/type";

export default function AddArticle() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [image, setImage] = useState<string | File | null>("");

  const isSubmitDisabled = !title || !content;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const accessToken = localStorage.getItem("accessToken");
    let imageUrl;

    if (!accessToken) {
      alert("로그인이 필요합니다.");
      return;
    }

    if (image) {
      const formData = new FormData();
      formData.append("image", image);

      try {
        // createImageUrl 호출 시, 이미지 데이터를 FormData로 전달
        const response = await createImageUrl(formData, accessToken);
        imageUrl = response.url;
      } catch (error) {
        console.error("이미지 업로드 실패", error);
      }
    } else {
      setImage(null);
    }

    const articleData = {
      title: title,
      content: content,
      image: imageUrl,
    };

    try {
      const response = await createArticle(articleData, accessToken);
      alert("게시글이 성공적으로 등록되었습니다.");
    } catch (error) {
      alert("게시글 등록에 실패했습니다.");
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className={styles.titleSection}>
          <h1 className={styles.sectionTitle}>게시글 쓰기</h1>
          <button
            type="submit"
            className={`${styles.button} ${
              isSubmitDisabled ? styles.buttonDisabled : ""
            }`}
            disabled={isSubmitDisabled}
          >
            등록
          </button>
        </div>

        <div className={styles.inputSection}>
          <InputItem
            id="title"
            label="*제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력해 주세요"
          />

          <InputItem
            id="content"
            label="*내용"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력해 주세요"
            isTextArea
          />
          <ImageUpload title="게시글 이미지" setImage={setImage} />
        </div>
      </form>
    </div>
  );
}
