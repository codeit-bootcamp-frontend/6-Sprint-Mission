import { ChangeEvent, ChangeEventHandler, useState } from "react";
import Styles from "./Input.module.scss";

interface EmailInputProps {
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  id: string;
  className: string;
  required: boolean;
  setIsInvalid: (value: boolean) => void;
}

export default function EmailInput({ name, value, id, className, required, setIsInvalid, onChange }: EmailInputProps) {
  const [isEmpty, setIsEmpty] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checkValidity()) {
      setIsInvalid(false);
    } else {
      setIsInvalid(true);
    }
    if (e.target.value.length === 0) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
    onChange(e);
  };
  return (
    <>
      <input type="email" name={name} value={value} onChange={handleChange} id={id} className={`${Styles.input} ${className}`} placeholder="이메일을 입력해주세요" required={required} />
      {isEmpty && <p className="alert">이메일을 입력하세요.</p>}
    </>
  );
}
