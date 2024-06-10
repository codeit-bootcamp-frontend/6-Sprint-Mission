import { useRef, useState, useEffect, ChangeEvent } from "react";
import plusIcon from "@/images/ic_plus.png";
import deleteImgButton from "@/images/ic_X_for_img.png";
import Image from "next/image";
import styles from "./style.module.css";

interface PropType {
  value?: File | null;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onDelete: () => void;
  name: string;
}

const CustomFileInput = ({ value, onChange, onDelete, name }: PropType) => {
  const [preview, setPreview] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!value) return;
    const nextPreview = URL.createObjectURL(value);
    setPreview(nextPreview);

    return () => {
      setPreview("");
      URL.revokeObjectURL(nextPreview);
    };
  }, [value]);

  const handleClearClick = () => {
    const inputNode = inputRef.current;
    if (!inputNode) return;
    inputNode.value = "";
    onDelete();
  };

  return (
    <div className={styles.container}>
      <label>상품 이미지</label>
      <div className={styles.content}>
        <label htmlFor="fileInput">
          <div className={styles.btn_upload}>
            <Image src={plusIcon} alt="플러스 버튼" />
            <span>이미지 등록</span>
          </div>
        </label>
        <input
          id="fileInput"
          type="file"
          name={name}
          ref={inputRef}
          accept="image/png, image/jpeg"
          onChange={onChange}
          className={styles.fileInput}
        />
        {value && (
          <div className={styles.preview_section}>
            <Image src={preview} alt="이미지 미리보기" fill />
            <Image
              src={deleteImgButton}
              alt="이미지 삭제"
              className={styles.preview_delete_btn}
              onClick={handleClearClick}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomFileInput;
