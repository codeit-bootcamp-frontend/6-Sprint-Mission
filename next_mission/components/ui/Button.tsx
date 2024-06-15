import Link from 'next/link';
import React from 'react';
import CloseIcon from '@/public/images/icons/ic_x.svg';

interface ButtonProps {
  children: string;
  label: string;
  href?: string;
  type?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

// Todo : 재사용성 높게 만들기 => type
const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  label,
  href,
  type,
  disabled,
}) => {
  return <Link href="">{children}</Link>;

  // 이미지가 있을 때 <Image src={CloseIcon} />;
};

export default Button;
