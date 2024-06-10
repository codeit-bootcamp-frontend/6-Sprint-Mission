import React, { useState, ChangeEvent } from "react";
import { Label } from "@/components/ui/InputItem";
import styled, { css } from "styled-components";
import Image from "next/image";
import PlusIcon from "@/public/images/icons/ic_plus.svg";
import DeleteButton from "./DeleteButton";

const ImageUploadContainer = styled.div`
  display: flex;
  gap: 8px;

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    gap: 18px;
  }

  @media ${({ theme }) => theme.mediaQuery.desktop} {
    gap: 24px;
  }
`;

const squareStyles = css`
  width: calc(50% - 4px);
  max-width: 200px;
  aspect-ratio: 1 / 1;
  border-radius: 12px;

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    width: 162px;
  }

  @media ${({ theme }) => theme.mediaQuery.desktop} {
    width: 282px;
  }
`;

const UploadButton = styled.label`
  background-color: ${({ theme }) => theme.colors.gray[100]};
  color: ${({ theme }) => theme.colors.gray[400]};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray[50]};
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

interface ImageUploadProps {
  title?: string;
}

function ImageUpload({ title }: ImageUploadProps) {
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>("");

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreviewUrl(imageUrl);
    }
  };

  const handleDelete = () => {
    setImagePreviewUrl("");
  };

  return (
    <div>
      {title && <Label>{title}</Label>}

      <ImageUploadContainer>
        <UploadButton htmlFor="image-upload">
          <Image src={PlusIcon} alt="등록아이콘" width={48} height={48} />
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
