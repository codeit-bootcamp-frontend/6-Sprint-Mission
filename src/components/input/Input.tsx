import React from "react";

const Input = ({
  id,
  type = "text",
  value,
  onChange,
  placeholder,
}: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="text-gray-800 placeholder:text-gray-400 leading-[1.5] flex-1 focus:outline-0 w-full px-6 py-4 bg-gray-100 rounded-xl flex items-center gap-2 "
    />
  );
};

export default Input;
