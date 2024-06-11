import React from 'react';

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button(props: IButtonProps) {
  const { children, disabled, ...buttonProps } = props;

  const buttonStyles = disabled
    ? 'w-[100%] h-[100%] text-[16px] text-[#ffffff] bg-[#cccccc] cursor-not-allowed'
    : 'w-[100%] h-[100%] text-[16px] text-[#ffffff] bg-[#3692ff]';

  return (
    <button className={buttonStyles} {...buttonProps}>
      {children}
    </button>
  );
}
