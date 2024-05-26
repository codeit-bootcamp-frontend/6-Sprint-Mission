import React, { useState } from "react";
import { Label } from "./InputItem";
import styled, { css } from "styled-components";
import { ReactComponent as PlusIcon } from "../../assets/images/icons/ic_plus.svg";
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
  // 작은 화면에서는 max-width가 되기 전까지는 UploadButton과 ImagePreview가 각각 gap을 포함해 컨테이너 너비의 절반을 차지하도록 함
  width: calc(50% - 4px);
  max-width: 200px;
  aspect-ratio: 1 / 1; // 정사각형 비율 유지
  border-radius: 12px;

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    width: 162px;
  }

  @media ${({ theme }) => theme.mediaQuery.desktop} {
    width: 282px;
  }
`;

// file input과 연관 짓기 위해 버튼이 대신 label로 설정
const UploadButton = styled.label`
  background-color: ${({ theme }) => theme.colors.gray[1]};
  color: ${({ theme }) => theme.colors.gray[0]};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-size: 16px;
  cursor: pointer; // 버튼이 아닌 label을 사용한 경우 별도로 추가해 주세요

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray[2]};
  }

  ${squareStyles}
`;

const ImagePreview = styled.div`
  background-image: url(${({ src }) => src});
  background-size: cover;
  background-position: center;
  position: relative; // DeleteButton 포지셔닝을 위해 추가

  ${squareStyles}
`;

const DeleteButtonWrapper = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
`;

// 브라우저 기본 '파일 선택' 버튼 대신 커스텀 버튼을 사용하기 위해 file input을 숨김 처리
const HiddenFileInput = styled.input`
  display: none;
`;

function ImageUpload({ title }) {
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // 미리보기 주소 값(Object URL) 생성
      const imageUrl = URL.createObjectURL(file);
      setImagePreviewUrl(imageUrl);
    }
  };

  const handleDelete = () => {
    setImagePreviewUrl(""); // 미리보기 URL 리셋
  };

  return (
    <div>
      {title && <Label>{title}</Label>}

      <ImageUploadContainer>
        {/* HiddenFileInput의 id와 label의 htmlFor 값을 매칭해 주세요 */}
        <UploadButton htmlFor="image-upload">
          <PlusIcon />
          이미지 등록
        </UploadButton>

        <HiddenFileInput
          id="image-upload"
          type="file"
          onChange={handleImageChange}
          accept="image/*" // 이미지 파일만 업로드 가능하도록 제한
        />

        {/* 업로드된 이미지가 있으면 썸네일 렌더링 */}
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
