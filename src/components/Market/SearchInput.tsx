import React from "react";
import SearchIcon from "../../assets/icon/ic_search.svg";
import "../../style/SearchInput.css";

export function SearchInput(): JSX.Element {
  return (
    <div className="search">
      <img src={SearchIcon} alt="검색" />
      <input placeholder="검색할 상품을 입력해주세요." />
    </div>
  );
}
