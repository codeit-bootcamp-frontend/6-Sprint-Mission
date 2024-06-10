import React, { useState, MouseEvent } from "react";
import { ChangeEvent, KeyboardEvent } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "@/styles/BoardNavBar.module.css";

interface Props {
  handleOrderBy: (value: string) => void;
  handleKeyword: (value: string) => void;
}

const BoardNavBar = ({ handleOrderBy, handleKeyword }: Props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownMenu, setDropdownMenu] = useState<string | null>("최신순");
  const router = useRouter();

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value === "") {
      handleKeyword(value);
    }
  };

  const handleSearchInputKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      const { value } = e.target as HTMLInputElement;
      handleKeyword(value);
    }
  };

  const handleDropdownOpen = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const setDropDownMenuByClick = (e: MouseEvent) => {
    const { textContent } = e.target as HTMLElement;
    setDropdownMenu(textContent);
    setIsDropdownOpen(false);
    if (textContent) {
      if (textContent === "최신순") {
        handleOrderBy("recent");
      } else {
        handleOrderBy("like");
      }
    }
  };

  const handlePathByCondition = () => {
    const isLogined = localStorage.getItem("accessToken");

    if (isLogined) {
      router.push("/boards/addBoards");
    } else {
      alert("로그인이 필요합니다.");
      router.push("/SignIn");
    }
  };

  return (
    <div className={styles["board-nav-bar"]}>
      <div className={styles["board-nav-bar__top"]}>
        <h2 className={styles["board-nav-bar__title"]}>게시글</h2>
        <button className={styles["board-nav-bar__write-btn"]} onClick={handlePathByCondition}>
          글쓰기
        </button>
      </div>

      <div className={styles["board-nav-bar__bottom"]}>
        <label htmlFor="search"></label>
        <Image
          id="search-icon"
          className={styles["board-nav-bar__search-icon"]}
          src="/images/Articles/search-icon.png"
          alt="검색 아이콘"
          width={16}
          height={16}
        />
        <input
          onChange={handleSearchInput}
          onKeyDown={handleSearchInputKeyDown}
          className={styles["board-nav-bar__search-bar"]}
          id="search"
          type="text"
          placeholder="검색할 상품을 입력해주세요"
        />

        <div className={styles["board-nav-bar__dropdown"]} onClick={handleDropdownOpen}>
          <span className={styles["dropdown-value"]}>{dropdownMenu}</span>
          <Image
            src="/images/Articles/dropdown-mobile.png"
            className={styles["dropdown-mobile-icon"]}
            alt="제품 페이지 드롭다운 메뉴 모바일 아이콘"
            width={24}
            height={24}
          />
          <Image
            src="/images/Articles/dropdown-arrow.png"
            className={styles[isDropdownOpen ? "dropdown-open-icon" : "dropdown-icon"]}
            alt="제품 페이지 드롭다운 메뉴 아이콘"
            width={24}
            height={24}
          />
        </div>
        {isDropdownOpen && (
          <div className={styles["dropdown-menu"]} onClick={setDropDownMenuByClick}>
            <span>최신순</span>
            <span>좋아요순</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default BoardNavBar;
