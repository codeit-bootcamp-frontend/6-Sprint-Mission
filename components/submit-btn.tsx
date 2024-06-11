import { ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  checkValue: boolean;
};

export default function SubmitButton({ children, checkValue }: ButtonProps) {
  return (
    <button className={`px-6 py-3 text-white rounded-lg ${checkValue ? 'bg-brand-blue' : 'bg-cool-gray400'}`}>
      {children}
    </button>
  );
}
