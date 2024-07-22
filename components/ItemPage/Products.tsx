import Link from "next/link";
import { Product } from "../../types/productTypes";
import styles from "./Products.module.scss";
import Image from "next/image";

// function formatDate(value) {
//     const date = new Date(value);
//     return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
// }

function BestProductItem({ item }: { item: Product }) {
  return (
    <div className={styles.container}>
      <div className={`${styles.image} ${styles.best}`}>
        <Image fill src={item.images[0]} alt={item.name} />
      </div>
      <Link className={styles.title} href={`/items/${item.id}`}>
        {item.name}
      </Link>
      <p className={styles.price}>{item.price.toLocaleString("ko-KR")}원</p>
      <div className={styles.likes}>
        <label className={styles.like_button}>
          <input type="checkbox" className={styles.like_toggle} />
          <span className={styles.toggle_button}></span>
        </label>
        <p className={styles.like_count}>{item.favoriteCount}</p>
      </div>
    </div>
  );
}

function AllProductItem({ item }: { item: Product }) {
  return (
    <div className={styles.container}>
      <div className={`${styles.image} ${styles.all}`}>
        <Image fill src={item.images[0]} alt={item.name} />
      </div>
      <Link className={styles.title} href={`/items/${item.id}`}>
        {item.name}
      </Link>
      <p className={styles.price}>{item.price.toLocaleString("ko-KR")}원</p>
      <div className={styles.likes}>
        <label className={styles.like_button}>
          <input type="checkbox" className={styles.like_toggle} />
          <span className={styles.toggle_button}></span>
        </label>
        <p className={styles.like_count}>{item.favoriteCount}</p>
      </div>
    </div>
  );
}

function BestProducts({ items, counts }: { items: Product[]; counts: number }) {
  console.log(items);
  return (
    <ul className={`${styles.list} ${styles.best}`}>
      {items.map((item, index) => {
        if (!(index > counts - 1)) {
          return (
            <li key={item.id} className={styles.items}>
              <BestProductItem item={item} />
            </li>
          );
        }
      })}
    </ul>
  );
}

function AllProducts({ items, counts }: { items: Product[]; counts: number }) {
  return (
    <ul className={`${styles.list} ${styles.all}`}>
      {items.map((item, index) => {
        if (index > counts - 1) {
          return <></>;
        }
        return (
          <li key={item.id} className={styles.items}>
            <AllProductItem item={item} />
          </li>
        );
      })}
    </ul>
  );
}

export { BestProducts, AllProducts };
