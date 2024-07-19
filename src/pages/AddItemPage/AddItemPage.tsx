import React, { useState, ChangeEvent } from "react";
import {
  Button,
  Container,
  FlexContainer,
  SectionTitle,
} from "../../styles/CommonStyles";
import styled from "styled-components";
import InputItem from "../../components/UI/InputItem";
import TagInput from "../../components/UI/TagInput";
import ImageUpload from "../../components/UI/ImageUpload";

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

interface TagInputProps {
  tags: string[];
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
}

const AddItemPage: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const addTag = (tag: string) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const isSubmitDisabled = !name || !description || !price || !tags.length;

  return (
    <Container>
      <form>
        <TitleSection>
          <SectionTitle>상품 등록하기</SectionTitle>
          <Button type="submit" disabled={isSubmitDisabled}>
            등록
          </Button>
        </TitleSection>

        <InputSection>
          <ImageUpload title="상품 이미지" setImageFiles={setImageFiles} />

          <InputItem
            id="name"
            label="상품명"
            value={name}
            onChange={(
              e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => setName(e.target.value)}
            placeholder="상품명을 입력해 주세요"
          />

          <InputItem
            id="description"
            label="상품 소개"
            value={description}
            onChange={(
              e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => setDescription(e.target.value)}
            placeholder="상품 소개를 입력해 주세요"
            isTextArea
          />

          <InputItem
            id="price"
            label="판매 가격"
            value={price}
            onChange={(
              e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => setPrice(e.target.value)}
            placeholder="판매 가격을 입력해 주세요"
          />

          <TagInput tags={tags} onAddTag={addTag} onRemoveTag={removeTag} />
        </InputSection>
      </form>
    </Container>
  );
};

export default AddItemPage;
