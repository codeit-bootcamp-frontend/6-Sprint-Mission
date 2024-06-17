import FileInput from "@/components/FileInput/FileInput";
import styles from "./AddBoard.module.css";
import { useReducer, useState } from "react";
import { useRouter } from "next/router";

interface ArticleInfo {
  articleTitle: string;
  articleContent: string;
  articleImage: File | null;
}

const AddBoard = () => {
  const [articleInfo, setArticleInfo] = useState<ArticleInfo>({
    articleTitle: "",
    articleContent: "",
    articleImage: null,
  });
  const router = useRouter();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleChange = (name: string, value: string | File | null) => {
    setArticleInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("submit 확인");
    //폼 제출 로직...
    //페이지 이동....
  };

  const isFormValid = articleInfo.articleTitle && articleInfo.articleContent;

  return (
    <div className={styles["add-item-page"]}>
      <form className={styles["add-item-form"]} onSubmit={handleSubmit}>
        <div className={styles["add-item-form-top"]}>
          <h1 className={styles["page-title"]}>게시글 쓰기</h1>
          <button
            className={styles["add-item-button"]}
            type="submit"
            disabled={!isFormValid}
          >
            등록
          </button>
        </div>
        <label className={styles["label"]} htmlFor="itemName">
          *제목
        </label>
        <input
          className={styles["item-info-input"]}
          type="text"
          name="articleTitle"
          value={articleInfo.articleTitle}
          onChange={handleInputChange}
          placeholder="제목을 입력해주세요"
        />
        <label className={styles["label"]} htmlFor="itemDescription">
          *내용
        </label>
        <textarea
          className={`${styles["item-info-input"]} ${styles["large-input"]} ${styles["textarea"]}`}
          name="articleContent"
          value={articleInfo.articleContent}
          onChange={handleInputChange}
          placeholder="내용을 입력해주세요"
        ></textarea>
        <label className={styles["label"]} htmlFor="itemImage">
          상품 이미지
        </label>
        <FileInput
          name="itemImage"
          value={articleInfo.articleImage}
          onChange={handleChange}
          className={styles["file-input"]}
        />
      </form>
    </div>
  );
};

export default AddBoard;
