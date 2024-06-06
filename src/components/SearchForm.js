import styles from "./SearchForm.module.css";
import searchIcon from "../assets/ic_search.svg";

function SearchForm({ onSearch, searchQuery, setSearchQuery }) {
  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div className={styles.search}>
      <img className={styles.icon} src={searchIcon} alt="검색 아이콘" />
      <input
        type="text"
        placeholder="검색할 상품을 입력해주세요"
        value={searchQuery}
        onChange={handleInputChange}
      />
    </div>
  );
}

export default SearchForm;
