import styles from "./SearchBar.module.css";
import Image from "next/image";

import postSearchIcon from "@/public/post-search-icon.png";

export default function SearchBar() {
  return (
    <div className={styles.searchBar}>
      <div className={styles.inputWrap}>
        <Image src={postSearchIcon} width={24} height={24} alt='검색 아이콘' />
        <input
          className={styles.searchInput}
          type='text'
          placeholder='검색할 상품을 입력해주세요'
        />
      </div>
    </div>
  );
}
