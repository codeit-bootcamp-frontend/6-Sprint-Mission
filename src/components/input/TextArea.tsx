import React from "react";

interface ITextArea extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  heightStyle: number;
}

const TextArea = ({
  id,
  value,
  onChange,
  placeholder,
  heightStyle,
}: ITextArea) => {
  return (
    <textarea
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`h-[${heightStyle}px] text-gray-800 placeholder:text-gray-400 leading-[1.5] flex-1 focus:outline-0 w-full px-6 py-4 bg-gray-100 rounded-xl flex items-center gap-2 resize-none`}
    />
  );
};

export default TextArea;
