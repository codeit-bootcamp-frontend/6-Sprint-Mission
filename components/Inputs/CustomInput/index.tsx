import { ChangeEvent } from "react";
import styles from "./style.module.css";

interface PropType {
  label: string;
  placeholder: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  id: string;
  name: string;
  type?: string;
}

const CustomInput = ({
  label,
  placeholder,
  value,
  onChange,
  id,
  name,
  type = "text",
}: PropType) => {
  return (
    //일반
    <div className={styles.container}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        type={type}
      />
    </div>
  );
};

export default CustomInput;
