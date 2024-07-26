import { ChangeEvent, useEffect, useRef, useState } from "react";
import PlusIcon from "assets/icon/ic_plus.svg";
import * as S from "./ImageInput.style";

interface ImageInputProps {
  name: string;
  onImageChange: (file: File | null) => void;
  deaultValue?: string;
}

export default function ImageInput({
  name,
  onImageChange,
  deaultValue,
}: ImageInputProps) {
  const [preview, setPreview] = useState(deaultValue ?? "");
  const imgFileRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    imgFileRef.current?.click();
  };

  const handleImgFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files || files.length === 0) return;
    const file = files[0];

    onImageChange(file);

    const nextPreview = URL.createObjectURL(file);

    setPreview(nextPreview);
  };

  const handleImgFileDelete = () => {
    const inputNode = imgFileRef.current;

    if (!inputNode) return;

    inputNode.value = "";
    onImageChange(null);
    setPreview("");
  };

  useEffect(() => {
    if (preview) {
      return () => {
        URL.revokeObjectURL(preview);
      };
    }
  }, [preview]);

  return (
    <S.ImageInputContainer>
      <S.ImageInput onClick={handleClick}>
        <input
          name={name}
          onChange={handleImgFileChange}
          ref={imgFileRef}
          type="file"
          accept="image/png, image/jpeg"
        />
        <img src={PlusIcon} alt="img-file" />
        <h1>이미지 등록</h1>
      </S.ImageInput>
      {preview && <PreviewImage url={preview} onDelete={handleImgFileDelete} />}
    </S.ImageInputContainer>
  );
}

interface PreviewImageProps {
  url: string;
  onDelete: () => void;
}

function PreviewImage({ url, onDelete }: PreviewImageProps) {
  return (
    <S.PreviewImage>
      <img src={url} alt="img-file" />
      <S.StyledXIcon onClick={onDelete} />
    </S.PreviewImage>
  );
}
