import { ReactNode } from "react";

interface Props {
  value: string;
  className?: string;
  disabled?: boolean;
}

export function SubmitButton({ value, className, disabled }: Props) {
  return (
    <input
      type="submit"
      className={
        "flex items-center justify-center rounded-lg bg-[#3692ff] text-white hover:cursor-pointer hover:bg-[#1967D6] disabled:bg-[#9CA3AF] " +
        className
      }
      disabled={disabled}
      value={value}
    />
  );
}

interface ButtonProps {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
}

export function Button({ children, className, disabled }: ButtonProps) {
  return (
    <button
      type="submit"
      className={
        "flex items-center justify-center rounded-lg bg-[#3692ff] text-white hover:cursor-pointer hover:bg-[#1967D6] disabled:bg-[#9CA3AF] " +
        className
      }
      disabled={disabled}
    >
      {children}
    </button>
  );
}
