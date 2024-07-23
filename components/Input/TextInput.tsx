import { useState } from "react";
import Styles from "./Input.module.scss";

interface TextInputProps {
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
  className: string;
  required: boolean;
  placeholder: string;
}

export default function TextInput({ name, value, onChange, id, className, required, placeholder }: TextInputProps) {
  const [content, setContent] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 0) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  };

  if (name === "nickname") {
    return (
      <>
        <input type="text" name={name} value={value} onChange={handleChange} id={id} className={`${Styles.input} ${className}`} placeholder={placeholder} required={required} />
        {isEmpty && <p className="alert">닉네임을 입력하세요.</p>}
      </>
    );
  }
  return <input type="text" name={name} value={value} onChange={onChange} id={id} className={`${Styles.input} ${className}`} placeholder={placeholder} required={required} />;
}
