import { useEffect, useRef, useState } from "react";
import styles from "./FileInput.module.css";
import plusIcon from "@/public/ic_plus.svg";
import Image from "next/image";

interface FileInputProps {
  name: string;
  value: File | null;
  onChange: (name: string, value: File | null) => void;
  className?: string;
}

function FileInput({ name, value, onChange }: FileInputProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("핸들체인지 시작");
    const nextValue = e.target.files ? e.target.files[0] : null;
    console.log("File chosen:", nextValue);
    onChange(name, nextValue);
    if (nextValue) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        console.log("Preview URL:", preview);
      };
      reader.readAsDataURL(nextValue);
      console.log("이미지 굿");
    } else {
      setPreview(null);
    }
  };

  // const handleClearClick = () => {
  //   const inputNode = inputRef.current;
  //   if (!inputNode) return;
  //   inputNode.value = "";
  //   onChange(name, null);
  // };

  useEffect(() => {
    if (!value) return;
    const nextPreview = URL.createObjectURL(value);
    setPreview(nextPreview);

    return () => {
      setPreview(null);
      URL.revokeObjectURL(nextPreview);
    };
  }, [value]);

  return (
    <div>
      <input
        className={styles["file-input"]}
        type="file"
        accept="image/*"
        onChange={handleChange}
        ref={inputRef}
      />
      <div className={styles["image-input-container"]}>
        <button
          className={styles["item-image-input-button"]}
          onClick={() => inputRef.current?.click()}
        >
          <div className={styles["button-inner-contents"]}>
            <Image src={plusIcon} alt="plus icon" />
            <span>이미지 등록</span>
          </div>
        </button>
        {preview && (
          <Image
            className={styles["image-preview"]}
            src={preview}
            alt="이미지 미리보기"
          />
        )}
        {/* {value && <button onClick={handleClearClick}>X</button>} */}
      </div>
    </div>
  );
}

export default FileInput;
