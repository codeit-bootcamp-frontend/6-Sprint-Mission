import { ChangeEvent, FormEvent, MouseEvent, useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import TitleContainer from "components/TitleContainer";
import { RectangleButton } from "components/Button";
import DeleteIC from "public/icon/ic_delete.svg";
import styled from "styled-components";
import PlusIcon from "public/icon/ic_plus.svg";
import useAxiosFetch from "hooks/useAxiosFetch";
import { ACCESS_TOKEN } from "utils/accessToken";

export default function AddBoard() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);

  const router = useRouter();
  const { isLoading, error, axiosFetch } = useAxiosFetch();

  const handlePreviewImage = (e: ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files?.[0];
    if (imageFile) {
      let imageUrl = URL.createObjectURL(imageFile);
      setImagePreview(imageUrl);
      setImage(imageFile);
    }
  };

  const handleDeleteImage = () => {
    setImage(null);
    setImagePreview(null);
  }

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let imageUrl = "";

    if (image) {
      const imageFormData = new FormData();
      imageFormData.append("image", image);

      const imageUploadRes = await axiosFetch({
        method: 'POST',
        url: "/images/upload",
        data: imageFormData,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${ACCESS_TOKEN}`
        },
      });

      imageUrl = imageUploadRes?.data?.url;
    }

    const formData = new FormData();
    formData.append("content", content);
    formData.append("title", title);
    if (imageUrl) {
      formData.append("image", imageUrl);
    }

    const res = await axiosFetch({
      method: 'POST',
      url: "/articles",
      data: formData,
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`
      },
      // withCredentials: true,
    });

    const { id } = res?.data;
    router.push(`/addboard/${id}`);
  };

  const isButtonDisabled = !(title && content);

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  return (
    <>
      <TitleContainer>
        <Title>게시글 등록하기</Title>
        <RectangleButton
          type="submit"
          disabled={isButtonDisabled}
          onClick={handleSubmit}
        >
          등록
        </RectangleButton>
      </TitleContainer>
      <form id="form" onSubmit={handleSubmit}>
        <Label htmlFor="title">*제목</Label>
        <Input
          id="title"
          type="text"
          placeholder="제목을 입력해주세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Label htmlFor="content">*내용</Label>
        <TextArea
          id="content"
          placeholder="내용을 입력해주세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Label htmlFor="imageUpload">이미지</Label>
        <ImageUploadContainer>
          <ImageUpload as="label" htmlFor="imageUpload">
            <AddImageIcon width={48} height={48} alt="이미지 추가" />
            <span>이미지 등록</span>
            <input
              id="imageUpload"
              type="file"
              accept=".png, jpeg, jpg"
              style={{ display: "none" }}
              onChange={handlePreviewImage}
            />
          </ImageUpload>
          {imagePreview && (
            <ImagePreviewContainer>
              <ImagePreview
                src={imagePreview}
                width={168}
                height={168}
                alt="Preview"
              />
              <DeleteImage onClick={handleDeleteImage} />
            </ImagePreviewContainer>
          )}
        </ImageUploadContainer>
      </form>
    </>
  );
}

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 700;
  line-height: 2.3rem;
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 700;
  line-height: 1.7rem;
  margin-bottom: 12px;
`;

const Input = styled.input`
  width: 100%;
  height: 56px;
  padding: 16px 24px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colorPalette.inputBackgroundColor};
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 2.4rem;
  color: ${({ theme }) => theme.colorPalette.inputPlaceholderColor};
  margin: 12px 0;

  &::placeholder {
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 2.4rem;
    color: ${({ theme }) => theme.colorPalette.inputPlaceholderColor};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 200px;
  padding: 16px 24px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colorPalette.inputBackgroundColor};
  margin: 12px 0;
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 2.4rem;
  color: ${({ theme }) => theme.colorPalette.inputPlaceholderColor};

  &::placeholder {
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 2.4rem;
    color: ${({ theme }) => theme.colorPalette.inputPlaceholderColor};
  }
`;

const ImageUploadContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ImageUpload = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 168px;
  height: 168px;
  border-radius: 12px;
  margin: 12px 0;
  background: ${({ theme }) => theme.colorPalette.inputBackgroundColor};
  cursor: pointer;
`;

const AddImageIcon = styled(PlusIcon)``;

const ImagePreviewContainer = styled.div`
  position: relative;
  margin-left: 16px;
`;

const ImagePreview = styled(Image)`
  border-radius: 12px;
`;

const DeleteImage = styled(DeleteIC)`
  position: absolute;
  top: 8px;
  right: 8px;
  cursor: pointer;
`;
