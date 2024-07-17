import styles from "@/components/BestPostArticles.module.css";
import Image from "next/image";
import medal from "@/public/ic_medal.png";
import heartIcon from "@/public/ic_heart.png";

export default function BestPostArticles({
  title,
  image,
  likeCount,
  updatedAt,
  writer,
}) {
  return (
    <li className={styles.bestItem}>
      <div className={styles.bestItemWrap}>
        <div className={styles.badge}>
          <div className={styles.badgeWrap}>
            <Image src={medal} width={16} height={16} alt='메달 아이콘' />
            <span>Best</span>
          </div>
        </div>
        <div className={styles.bestUserContents}>
          <h1 className={styles.bestTitle}>{title}</h1>
          {image ? (
            <div className={styles.userProductImg}>
              <Image
                className={styles.productImg}
                width={48}
                height={44.57}
                src={image}
                alt='상품 이미지'
              />
            </div>
          ) : null}
        </div>
        <div className={styles.bestUserInfoWrap}>
          <div className={styles.bestUserInfo}>
            <span>{writer.nickname}</span>
            <div className={styles.bestUserCount}>
              <Image src={heartIcon} width={16} height={16} alt='하트 아이콘' />
              <span className={styles.likeCount}>{likeCount}</span>
            </div>
          </div>
          <div className={styles.bestUserDate}>
            <span>{new Date(updatedAt).getFullYear()}</span>
            <span>. {new Date(updatedAt).getMonth() + 1}</span>
            <span>. {new Date(updatedAt).getDay()}</span>
          </div>
        </div>
      </div>
    </li>
  );
}
