import { ReactNode } from "react";

interface LabelProps {
  htmlFor: string | undefined;
  children: ReactNode;
  className: string;
}

export default function Label({ htmlFor, children, ...props }: LabelProps) {
  return (
    <label htmlFor={htmlFor} {...props}>
      {children}
    </label>
  );
}
