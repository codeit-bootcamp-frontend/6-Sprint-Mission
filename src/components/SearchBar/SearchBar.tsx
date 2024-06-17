import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./SearchBar.module.scss";
import searchIcon from "@/public/svgs/search.svg";
import useDebounce from "@/src/hooks/useDebounce";

interface SearchBarProps {
  keyword: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ keyword }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce<string>(searchTerm, 2000);

  useEffect(() => {
    if (debouncedSearchTerm) {
      keyword(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, keyword]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    keyword(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <div className={styles.searchIcon}>
        <Image src={searchIcon} alt="검색 아이콘" width={24} height={24} />
      </div>
      <input
        className={styles.searchBar}
        type="text"
        placeholder="검색할 상품을 입력해주세요"
        value={searchTerm}
        onChange={handleChange}
      />
    </form>
  );
};

export default SearchBar;
