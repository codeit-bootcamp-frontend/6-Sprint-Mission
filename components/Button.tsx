import { MouseEventHandler, ReactNode } from 'react';

type Props = {
  style?: {
    shape?: 'square' | 'rounded';
    size?: 'small' | 'large';
  };
  disabled?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
};

export default function Button({
  style = { shape: 'square', size: 'small' },
  disabled = false,
  onClick,
  children,
}: Props) {
  return (
    <button
      className={`${style.size === 'small' ? 'h-[42px] px-6' : 'h-12 px-9'} ${style.shape === 'square' ? 'rounded-lg' : 'rounded-full'} flex cursor-pointer items-center justify-center bg-primary-400 text-base font-semibold text-white hover:bg-primary-600 active:bg-primary-700 disabled:cursor-default disabled:bg-gray-400`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
