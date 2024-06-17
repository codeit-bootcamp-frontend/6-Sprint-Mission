import { ChangeEvent, useRef, useState } from "react";
import styles from "./ImageInput.module.scss";
import Image from "next/image";

function ImageInput({
  name,
  onChange,
  onDeleteClick,
}: {
  name: string;
  onChange: (f: File) => void;
  onDeleteClick: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [tempImage, setTempImage] = useState("");

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files === null || !files[0]) return;
    onChange(files[0]);
    setTempImage(URL.createObjectURL(files[0]));
  };

  const handleImgDelete = () => {
    if (!inputRef.current) return;

    const inputNode = inputRef.current as HTMLInputElement;
    inputNode.value = "";
    onDeleteClick();
    setTempImage("");
  };

  return (
    <div>
      <div className={styles.card_container}>
        <label htmlFor={name}>
          <div className={styles.add_card}>
            <Image
              src="/icons/plus.svg"
              alt="이미지 추가"
              width={48}
              height={48}
            />
            <p>이미지 등록</p>
          </div>
        </label>

        {tempImage && (
          <div className={styles.image_card}>
            <Image
              src={tempImage}
              alt="이미지"
              fill
              style={{ objectFit: "cover" }}
            />
            <button
              className={styles.delete_btn}
              type="button"
              onClick={handleImgDelete}
            >
              <Image
                src="/icons/X.svg"
                alt="이미지 삭제"
                width={22}
                height={24}
              />
            </button>
          </div>
        )}
      </div>

      <input
        className={styles.hidden}
        id={name}
        type="file"
        accept="image/jpeg, image/png"
        onChange={handleImageChange}
        ref={inputRef}
      />
    </div>
  );
}

export default ImageInput;
