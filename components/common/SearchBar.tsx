import Image from "next/image";
import { KeyboardEvent, useState } from "react";
import styles from "./SearchBar.module.scss";

function SearchBar({
  onKeywordChange,
}: {
  onKeywordChange: (k: string) => void;
}) {
  const [value, setValue] = useState("");

  const handleChange = ({ target }: { target: HTMLInputElement }) => {
    setValue(target.value);
  };

  const handleEnterDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode !== 13) return; // 엔터
    onKeywordChange(e.currentTarget.value);
  };

  return (
    <div className={styles.search_bar}>
      <Image src="/icons/search.svg" alt="검색" width={24} height={24} />
      <input
        type="text"
        id="keyword"
        placeholder="검색할 상품을 입력해주세요"
        value={value}
        onChange={handleChange}
        onKeyDown={handleEnterDown}
      />
    </div>
  );
}

export default SearchBar;
