import { HTMLInputTypeAttribute } from "react";

interface InputProps {
  id: string;
  type: HTMLInputTypeAttribute;
  placeholder: string;
  className: string;
}

export default function Input({ id, type, ...props }: InputProps) {
  return <input id={id} type={type} required {...props} />;
}
