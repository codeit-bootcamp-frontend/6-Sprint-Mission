import { useRouter } from "next/router";
import { useState } from "react";
import styles from "./SearchForm.module.css";
import Image from "next/image";

export default function SearchForm({ initialValue = "" }) {
  const router = useRouter();
  const [value, setValue] = useState(initialValue);

  function handleChange(e) {
    setValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    router.push(`/boards?keyword=${value}`);
  }

  return (
    <form onSubmit={handleSubmit} className={styles.search_input_wrap}>
      <div className={styles.search_icon}>
        <Image fill src="/ic_search.png" alt="검색 아이콘" />
      </div>
      <input
        className={styles.search_input}
        name="keyword"
        value={value}
        placeholder="검색할 상품을 입력해 주세요"
        onChange={handleChange}
      />
    </form>
  );
}
