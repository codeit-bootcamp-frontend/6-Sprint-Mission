import { ORDER_MESSAGE, ORDER, Order } from "@/constants/boards";
import styles from "./Dropdown.module.scss";
import Image from "next/image";
import { useState } from "react";

function Dropdown({
  order,
  onOrderChange,
}: {
  order: Order;
  onOrderChange: (o: Order) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDropdownClick = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  const handleMenuClick = (newOrder: Order) => {
    onOrderChange(newOrder);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdown}>
      <button className={styles.button} onClick={handleDropdownClick}>
        <span>{ORDER_MESSAGE[order]}</span>
        <Image
          src="/icons/arrow_down.svg"
          alt="드롭다운"
          width={24}
          height={24}
        />
      </button>
      {isOpen && (
        <ul className={styles.menus}>
          <li
            className={styles.menu}
            onClick={() => handleMenuClick(ORDER.RECENT)}
          >
            최신순
          </li>
          <li
            className={styles.menu}
            onClick={() => handleMenuClick(ORDER.LIKE)}
          >
            좋아요순
          </li>
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
