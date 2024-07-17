import styles from "@/components/PostArticles.module.css";
import Image from "next/image";
import signImg from "@/public/sign-img.png";
import heartIcon from "@/public/ic_heart.png";

export default function PostArticles({
  title,
  content,
  updatedAt,
  image,
  likeCount,
  writer,
}) {
  return (
    <li className={styles.userPost}>
      <div className={styles.userText}>
        <h1 className={styles.articleTitle}>{title}</h1>
        {!image ?? (
          <Image src={image} width={72} height={72} alt='상품 이미지' />
        )}
      </div>
      <div className={styles.userInfoWrap}>
        <div className={styles.userInfo}>
          <Image
            className={styles.userProfileImg}
            src={signImg}
            width={24}
            height={24}
            alt='유저 이미지'
          />
          <span className={styles.userName}>{writer.nickname}</span>
          <div className={styles.userArticleDateWrap}>
            <span className={styles.articleDate}>
              {new Date(updatedAt).getFullYear()}
            </span>
            <span className={styles.articleDate}>
              . {new Date(updatedAt).getMonth() + 1}
            </span>
            <span className={styles.articleDate}>
              . {new Date(updatedAt).getDay()}
            </span>
          </div>
        </div>
        <div className={styles.userLikeCount}>
          <Image src={heartIcon} width={24} height={24} alt='좋아요 아이콘' />
          <span className={styles.likeCount}>{likeCount}</span>
        </div>
      </div>
    </li>
  );
}
