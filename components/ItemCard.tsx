import Link from "next/link";
import Image from "next/image";
import icoHeart from "@/src/img/ic_heart.svg";
import { Item } from "@/src/types/item";
import Styles from "./ItemCard.module.scss";
import ImgProductEmpty from "@/src/img/Img_product_empty-sm.png";

interface ItemCardProps {
  item: Item;
}

export default function ItemCard({ item }: ItemCardProps) {
  return (
    <>
      <div className={Styles["img-wrap"]}>
        <Link href={`/items/${item.id}`} className="link">
          <Image width="221" height="221" src={item?.images[0] ?? ImgProductEmpty} alt={item.name + " 이미지"} className={Styles.img} />
        </Link>
      </div>
      <div className={Styles.content}>
        <h2 className={Styles.title}>
          <Link href={`/items/${item.id}`} className={Styles.link}>
            {item.description}
          </Link>
        </h2>
        <p className={Styles.price}>{item.price.toLocaleString()}원</p>
        <p className={Styles.favorite}>
          <Image width="16" height="16" src={icoHeart} alt="좋아요" />
          <span>{item.favoriteCount}</span>
        </p>
      </div>
    </>
  );
}
