import { ChangeEvent } from "react";
import styles from "./style.module.css";

interface PropType {
  label: string;
  placeholder: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  id: string;
  name: string;
  textAreaHeight: number;
}

const CustomTextArea = ({
  label,
  placeholder,
  value,
  onChange,
  id,
  name,
  textAreaHeight,
}: PropType) => {
  return (
    <div className={styles.container}>
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{ height: `${textAreaHeight}px` }}
      />
    </div>
  );
};

export default CustomTextArea;
