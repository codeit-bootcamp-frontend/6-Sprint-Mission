import Image from "next/image";

import { SearchInputProps } from "@/types";

import styles from "@/styles/Board.module.css";
import searchIC from "@/public/icon/ic_Search.svg";

export default function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <div className={styles.SearchContainer}>
      <Image
        width={15}
        height={15}
        src={searchIC}
        alt="검색 아이콘"
        className={styles.SearchIcon}
      />
      <input
        type="text"
        placeholder="검색할 상품을 입력해주세요"
        value={value}
        onChange={onChange}
        className={styles.SearchInput}
      />
    </div>
  );
}
