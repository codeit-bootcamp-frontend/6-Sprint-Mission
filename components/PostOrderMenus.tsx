import styles from "./PostOrderMenus.module.css";
import Image from "next/image";

import orderMenuIcon from "@/public/ic_arrow_down.png";

export default function PostOrderMenus() {
  return (
    <div className={styles.postOrderMenus}>
      <div className={styles.postOrderMenu}>
        <span>
          최신 순
          <Image
            src={orderMenuIcon}
            width={24}
            height={24}
            alt='화살표 아이콘'
          />
        </span>
      </div>
      <ul className={styles.orderOptions}>
        <li className={styles.orderOption}>
          <span>최신 순</span>
        </li>
        <li className={styles.orderOption}>
          <span>좋아요 순</span>
        </li>
      </ul>
    </div>
  );
}
