"use client";
import styles from "./addBoard.module.css";
import { addBoard, uploadImage } from "../../api/board";
import { useEffect, useRef, useState } from "react";
import FileInput from "@/components/fileInput";
import { useRouter } from "next/navigation";

export default function AddBoard() {
  const formRef = useRef<HTMLFormElement>(null);
  const [image, setImage] = useState<File | null>(null);
  const router = useRouter();

  useEffect(() => {
    document.title = "판다마켓 | 자유게시판 게시글 등록";
  }, []);

  //이제 formdata 안써야지.
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      if (image) {
        const imageData = await uploadImage(image);
        formData.append("image", imageData);
      }

      //필수 값인 title과 content에 값이 있는지 확인
      const FormTitle = formData.get("title");
      const content = formData.get("content");

      if (
        !FormTitle ||
        FormTitle.toString().trim() === "" ||
        !content ||
        content.toString().trim() === ""
      ) {
        alert("제목과 내용은 필수 값입니다.");
        return;
      }

      const postBoard = await addBoard(formData);

      await router.push(`/board/${postBoard}`);
    }
  };
  const handleImageChange = (file: File | null) => {
    setImage(file);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} ref={formRef} className="defaultForm">
        <div className={styles.addBoardHeader}>
          <h3>게시글 쓰기</h3>
          <button type="submit" className="primaryBtn">
            등록
          </button>
        </div>
        <label>
          *제목
          <input
            type="text"
            name="title"
            id="title"
            placeholder="제목을 입력해주세요"
          />
        </label>
        <label>
          *내용
          <textarea
            name="content"
            id="content"
            cols={30}
            rows={10}
            placeholder="내용을 입력해주세요"
          />
        </label>
        <label htmlFor="image" className={styles.imgTitle}>
          이미지
        </label>
        <FileInput onChange={handleImageChange} image={null} />
      </form>
    </div>
  );
}
