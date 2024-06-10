import React, { useState, useRef, useEffect, useCallback, ChangeEvent } from "react";
import Image from "next/image";
import styles from "@/styles/addBoards.module.css";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

interface Props {
  name: string;
  value: File | null;
  onChange: (name: string, value: File | null) => void;
}

export default function ArticleImg({ name, value, onChange }: Props) {
  const [preview, setPreview] = useState<string | StaticImport>();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const nextImg = e.target.files?.[0];
    if (nextImg) {
      onChange(name, nextImg);
    }
  };

  const handleClearClick = useCallback(() => {
    const inputNode = inputRef.current;
    if (inputNode) {
      inputNode.value = "";
      onChange(name, null);
    }
  }, [name, onChange]);

  useEffect(() => {
    if (!value) return;
    const blob = typeof value === "string" ? new Blob([value], { type: "text/plain" }) : value;

    const nextPreview = URL.createObjectURL(blob);
    setPreview(nextPreview);

    return () => {
      URL.revokeObjectURL(nextPreview);
    };
  }, [value]);

  return (
    <div className={styles["article-img container"]}>
      <h3>상품 이미지</h3>
      <div className={styles["article-img"]}>
        <input
          type="file"
          name="iamge"
          id="article-img-input"
          onChange={handleFileChange}
          ref={inputRef}
          className={styles["article-img-input"]}
        />
        <label htmlFor="article-img-input" className={styles["article-img-label"]}>
          <Image
            className={styles["article-image-tag"]}
            src="/images/Articles/plus-icon.svg"
            alt="파일 이미지 선택"
            width={48}
            height={48}
          />
          <p className={styles["article-img-register-text"]}>이미지 등록</p>
        </label>
        {value && (
          <div className={styles["prev-img"]}>
            {preview && (
              <Image
                className={styles["article-prev-image-tag"]}
                src={preview}
                alt="파일 이미지 미리보기"
                fill
                style={{ objectFit: "cover" }}
              />
            )}
            <button type="button" onClick={handleClearClick}>
              X
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
