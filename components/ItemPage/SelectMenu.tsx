import React, { Dispatch, SetStateAction } from "react";
import useToggle from "../../src/hooks/useToggle";
import SortIcon from "../../src/assets/images/icons/ic_sort.svg";
import { ProductSortOption } from "../../types/productTypes";
import useWindowSize from "../../src/hooks/useWindowSize";
import styles from "./SelectMenu.module.scss";

export default function SelectMenu({
  order,
  setOrder,
}: {
  order: ProductSortOption;
  setOrder: (order: ProductSortOption) => {};
}) {
  const [isOpen, setIsOpen] = useToggle(false);
  const windowWidth = useWindowSize();

  const onOpen = () => {
    setIsOpen();
  };

  const onClose = () => {
    setIsOpen();
  };

  const orderValue = {
    recent: "최신순",
    favorite: "좋아요순",
  };

  return (
    <div>
      <button
        onClick={onOpen}
        aria-label="Order Selection"
        className={styles.sort_button}
      >
        {windowWidth > 500 ? <div>{orderValue[order]}</div> : <SortIcon />}
      </button>

      {isOpen && (
        <div className={styles.toggle_menu}>
          <div onClick={() => setOrder("recent")}>최신순</div>
          <hr style={{ width: "90%", opacity: "0.3" }} />
          <div onClick={() => setOrder("favorite")}>좋아요순</div>
        </div>
      )}
    </div>
  );
}
