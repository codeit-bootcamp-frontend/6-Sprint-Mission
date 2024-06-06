import styles from "./CardContainer.module.css";
import Button from "./Button";
import Dropdown from "./Dropdown";
import SearchForm from "./SearchForm";
import Card from "./Card";
import { Link } from "react-router-dom";

function CardContainer({
  category,
  productList,
  group,
  position,
  onSearch,
  searchQuery,
  setSearchQuery,
}) {
  return (
    <div className={styles["card-container"]}>
      <header className={`${styles.header} ${styles[position]}`}>
        <h1 className={styles.category}>{category}</h1>
        {category === "전체 상품" && (
          <div className={styles.left}>
            <SearchForm
              onSearch={onSearch}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            <Link to="/addItem">
              <Button text="상품 등록하기" />
            </Link>
            <Dropdown />
          </div>
        )}
      </header>
      <div className={`${styles.list} ${styles[group]}`}>
        {productList.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default CardContainer;
