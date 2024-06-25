import Image from "next/image";
import React from "react";
import Input from "./input/Input";
import searchIcon from "@/public/icons/search_icon.svg";

interface SearchFormProps {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}

const SearchForm = ({ value, onChange, onSubmit }: SearchFormProps) => {
  const handleSubmitSearch: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <form onSubmit={handleSubmitSearch} className="flex-1 relative">
      <Image
        src={searchIcon}
        alt="검색"
        width={15}
        className="absolute top-2/4 left-5 -translate-y-2/4"
      />
      <input
        type="search"
        value={value}
        placeholder="검색할 상품을 입력해주세요"
        onChange={onChange}
        className="text-gray-800 placeholder:text-gray-400 leading-[1.5] flex-1 focus:outline-0 w-full px-[9px] py-[9px] pl-[45px] bg-gray-100 rounded-xl flex items-center gap-2"
      />
    </form>
  );
};

export default SearchForm;
