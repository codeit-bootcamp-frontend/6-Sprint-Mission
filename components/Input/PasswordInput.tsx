import { ChangeEvent, ChangeEventHandler, useState } from "react";
import Styles from "./Input.module.scss";

interface PasswordInputProps {
  id: string;
  name: string;
  value: string;
  className?: string;
  required?: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
  setIsInvalid: (value: boolean) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function PasswordInput({ id, name, value, className, required, inputRef, setIsInvalid, onChange }: PasswordInputProps) {
  const [isEmpty, setIsEmpty] = useState(false);

  const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      inputRef.current?.setAttribute("type", "text");
    } else {
      inputRef.current?.setAttribute("type", "password");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length < 8) {
      setIsInvalid(true);
      setIsEmpty(true);
    } else {
      setIsInvalid(false);
      setIsEmpty(false);
    }
  };

  return (
    <>
      <span className="section-form__pw-box">
        <input type="password" name={name} value={value} className={`${Styles.input} ${className}`} placeholder="비밀번호를 입력해주세요" minLength={8} required={required} ref={inputRef} onChange={handleChange} />
        <input type="checkbox" id={id} className="blind chk-visibility" onChange={handleCheck} />
        <label htmlFor={id} className="spr visibility-off">
          <span className="blind">비밀번호 보기/숨기기</span>
        </label>
      </span>
      {isEmpty && <p className="alert">비밀번호를 8자 이상 입력하세요.</p>}
    </>
  );
}
