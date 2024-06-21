import React, { useState } from "react";
import { Label } from "./InputItem";
import styled, { css } from "styled-components";
import PlusIcon from "@/public/icon/ic_plus.svg";
import DeleteButton from "./DeleteButton";
import Image from "next/image";

interface ImageUploadProps {
  title?: string;
  setImage: (file: File | string | null) => void;
}

function ImageUpload({ title, setImage }: ImageUploadProps) {
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>("");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreviewUrl(imageUrl);
      setImage(file); // 이미지 파일을 상위 컴포넌트로 전달
    } else {
      setImage(null); // 파일이 선택되지 않았을 때
    }
  };

  const handleDelete = () => {
    setImage(null);
    setImagePreviewUrl(""); // 미리보기 URL 리셋
  };

  return (
    <div>
      {title && <Label>{title}</Label>}

      <ImageUploadContainer>
        <UploadButton htmlFor="image-upload">
          <Image src={PlusIcon} alt="이미지 등록"></Image>
          이미지 등록
        </UploadButton>

        <HiddenFileInput
          id="image-upload"
          type="file"
          onChange={handleImageChange}
          accept="image/*"
        />

        {imagePreviewUrl && (
          <ImagePreview src={imagePreviewUrl}>
            <DeleteButtonWrapper>
              <DeleteButton onClick={handleDelete} label="이미지 파일" />
            </DeleteButtonWrapper>
          </ImagePreview>
        )}
      </ImageUploadContainer>
    </div>
  );
}

export default ImageUpload;

const ImageUploadContainer = styled.div`
  display: flex;
  gap: 8px;

  @media (min-width: 768px) and (max-width: 1023px) {
    gap: 18px;
  }

  @media (min-width: 1024px) {
    gap: 24px;
  }
`;

const squareStyles = css`
  width: calc(50% - 4px);
  max-width: 200px;
  aspect-ratio: 1 / 1;
  border-radius: 12px;

  @media (min-width: 768px) and (max-width: 1023px) {
    width: 162px;
  }

  @media (min-width: 1024px) {
    width: 282px;
  }
`;

const UploadButton = styled.label`
  background-color: #f3f4f6;
  color: #9ca3af;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #f9fafb;
  }

  ${squareStyles}
`;

const ImagePreview = styled.div<{ src: string }>`
  background-image: url(${({ src }) => src});
  background-size: cover;
  background-position: center;
  position: relative;

  ${squareStyles}
`;

const DeleteButtonWrapper = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
`;

const HiddenFileInput = styled.input`
  display: none;
`;
