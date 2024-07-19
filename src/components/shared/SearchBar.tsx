import { css } from "@/styled-system/css";
import Image from "next/image";
import searchIcon from "@/assets/icons/search_ic.svg";
import { inputRecipe } from "@/css/recipe/inputRecipe.styled";

interface SearchBarProps {
  searchValue: string;
  onChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function SearchBar({ onChangeInput, searchValue }: SearchBarProps) {
  return (
    <div
      className={css({
        position: "relative",
        w: "full",
      })}
    >
      <Image
        src={searchIcon}
        alt="searchIcon"
        className={css({ position: "absolute", top: "9px", left: "16px" })}
      />
      <input
        type="text"
        placeholder="검색할 상품을 입력해주세요"
        className={inputRecipe({ visual: "search" })}
        onChange={onChangeInput}
        value={searchValue}
      />
    </div>
  );
}

export default SearchBar;
