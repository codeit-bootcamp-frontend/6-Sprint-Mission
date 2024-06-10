import { Container } from "@/styles/CommonStyles";
import React, { useState } from "react";
import { useRouter } from "next/router";
import InputItem from "@/components/ui/InputItem";
import ImageUpload from "@/components/ui/ImageUpload";

const AddBoardPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const isSubmitDisabled = !title || !description;
  const router = useRouter();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isSubmitDisabled) {
      return router.push(`/boards`);
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <div>
          <div>게시글 쓰기</div>
          <button type="submit" disabled={isSubmitDisabled}>
            등록
          </button>
        </div>
        <InputItem
          id="title"
          label="게시글 제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력해 주세요"
        />
        <InputItem
          id="description"
          label="게시글 내용"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="내용을 입력해 주세요"
          isTextArea
        />
        <ImageUpload />
      </form>
    </Container>
  );
};

export default AddBoardPage;
