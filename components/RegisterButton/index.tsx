import React from "react";

interface RegisterButtonProp {
  width: number;
  height: number;
  disabled: boolean;
  children: string;
  onClick?: () => void;
}

const RegisterButton = ({
  width,
  height,
  disabled,
  children,
  onClick
}: RegisterButtonProp) => {
  const style = {
    width: `${width}px`,
    height: `${height}px`,
    backgroundColor: disabled ? "#9CA3AF" : "#3692FF",
    color: "white",
    cursor: disabled ? "not-allowed" : "pointer",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
  };

  return (
    <button style={style} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};

export default RegisterButton;
