import React, { useState } from "react";
import {
  Button,
  Container,
  FlexContainer,
  SectionTitle,
} from "../styles/CommonStyles";
import styled from "styled-components";
import InputItem from "./UI/InputItem";
import TagInput from "./UI/TagInput";
import ImageUpload from "./UI/ImageUpload";

const TitleSection = styled(FlexContainer)`
  margin-bottom: 16px;
`;

const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    gap: 24px;
  }
`;

function AddItemPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState(new Set());

  const addTag = (tag) => {
    setTags((prevTags) => new Set([...prevTags, tag]));
  };

  const removeTag = (tagToRemove) => {
    setTags((prevTags) => {
      const newTags = new Set(prevTags);
      newTags.delete(tagToRemove);
      return newTags;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기에 폼 제출 처리 로직 추가
  };

  const isSubmitDisabled = !name || !description || !price || tags.size === 0;

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <TitleSection>
          <SectionTitle>상품 등록하기</SectionTitle>
          <Button type="submit" disabled={isSubmitDisabled}>
            등록
          </Button>
        </TitleSection>

        <InputSection>
          <ImageUpload title="상품 이미지" />

          <InputItem
            id="name"
            label="상품명"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="상품명을 입력해 주세요"
          />

          <InputItem
            id="description"
            label="상품 소개"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="상품 소개를 입력해 주세요"
            isTextArea
          />

          <InputItem
            id="price"
            label="판매 가격"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="판매 가격을 입력해 주세요"
          />

          <TagInput
            tags={[...tags]}
            onAddTag={addTag}
            onRemoveTag={removeTag}
          />
        </InputSection>
      </form>
    </Container>
  );
}

export default AddItemPage;
