import Image from "next/image";
import React from "react";
import plusIcon from "@/public/icons/ic_plus.svg";

const FileInput = ({
  id,
  onChange,
}: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div className="relative w-[282px] h-[282px] rounded-xl flex flex-col items-center justify-center gap-3 bg-gray-100">
      <Image src={plusIcon} alt="이미지 추가하기" />
      <p className="leading-[1.5] text-gray-400">이미지 등록</p>
      <input
        id={id}
        type="file"
        accept="image/*"
        onChange={onChange}
        className="absolute top-0 bottom-0 left-0 right-0 opacity-0 cursor-pointer"
      />
    </div>
  );
};

export default FileInput;
