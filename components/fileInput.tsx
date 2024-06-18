"use client";
import { useEffect, useRef, useState, ChangeEvent } from "react";
import Image from "next/image";

interface IFormInput {
  onChange: (file: File | null) => void;
  image: string | null;
}

export default function FileInput({ onChange, image }: IFormInput) {
  const [preview, setPreview] = useState("");

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const imgTarget = e.target.files;
    if (!imgTarget || imgTarget.length === 0) return;
    const file = imgTarget[0];
    console.log(`파일 이름 : ${file}`);
    onChange(file);

    const nextPreview = URL.createObjectURL(file);
    setPreview(nextPreview);
  };

  const handleClearClick = () => {
    const inputNode = inputRef.current;
    if (!inputNode) return;

    inputNode.value = "";
    onChange(null);
    setPreview("");
  };
  useEffect(() => {
    if (image !== null) {
      setPreview(image);
    }
  }, [image]);
  useEffect(() => {
    const revokePreview = () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };

    return revokePreview;
  }, [preview]);

  return (
    <div className="FileInput">
      <label htmlFor="imgInput">
        <Image
          src="/images/img_emptyImage.png"
          alt="이미지 등록 이미지"
          width={282}
          height={282}
          className="imgPlaceholder"
          priority
        />
      </label>
      {preview && (
        <div className="previewArea">
          <Image
            src={preview}
            layout="fill"
            objectFit="cover"
            alt="상품 이미지 미리보기"
            className="itemPreview"
          />
          <Image
            src="/images/ic_delete.png"
            alt="상품 이미지 미리보기 삭제"
            width={22}
            height={24}
            onClick={handleClearClick}
            className="imgPreviewDeleteBtn"
          />
        </div>
      )}

      <input
        type="file"
        onChange={handleChange}
        id="imgInput"
        ref={inputRef}
        style={{ display: "none" }}
      />
    </div>
  );
}
