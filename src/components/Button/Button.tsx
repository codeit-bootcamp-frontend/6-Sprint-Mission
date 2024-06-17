import React, { ReactNode } from "react";
import classNames from "classnames";
import styles from "./Button.module.scss";

interface ButtonProps {
  onClick?: () => void;
  children: ReactNode;
  fullWidth?: boolean;
  disabled?: boolean; // 추가: disabled 상태 여부를 받아오는 prop
  width?: number;
  height?: number;
  radius?: number;
  fontSize?: number;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  fullWidth,
  disabled, // 추가: disabled prop을 받아옴
  width,
  height,
  radius,
  fontSize,
}) => {
  const buttonClassName = classNames(styles.button, {
    [styles.fullWidth]: fullWidth,
    [styles.disabled]: disabled,
  });

  const buttonStyle: React.CSSProperties = {};
  if (width) {
    buttonStyle.width = width;
  }
  if (height) {
    buttonStyle.height = height;
  }
  if (radius) {
    buttonStyle.borderRadius = radius;
  }
  if (fontSize) {
    buttonStyle.fontSize = fontSize;
  }

  return (
    <button
      className={buttonClassName}
      onClick={onClick}
      disabled={disabled}
      style={buttonStyle}
    >
      {children}
    </button>
  );
};

export default Button;
