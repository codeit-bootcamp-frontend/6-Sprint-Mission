import { ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  isChecked: boolean;
};

export default function SubmitButton({ children, isChecked }: ButtonProps) {
  return (
    <button className={`px-6 py-3 text-white rounded-lg ${isChecked ? 'bg-brand-blue' : 'bg-cool-gray400'}`}>
      {children}
    </button>
  );
}
