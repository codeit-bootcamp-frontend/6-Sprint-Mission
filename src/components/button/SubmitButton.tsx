import React from "react";
import { PropsWithChildren } from "react";

interface ISubmitButtonProps {
  disabled?: boolean;
}

const SubmitButton = ({
  disabled,
  children,
}: PropsWithChildren<ISubmitButtonProps>) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`${
        disabled ? "bg-gray-400" : "bg-blue"
      } font-semibold leading-[1.2] text-white px-[23px] py-[11.5px] rounded-lg ml-auto`}
    >
      {children}
    </button>
  );
};

export default SubmitButton;
