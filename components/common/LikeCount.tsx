import Image from "next/image";
import styles from "./LikeCount.module.scss";

function LikeCount({ count, size }: { count: number; size: number }) {
  const sizeClass = size >= 24 ? "big" : "small";

  return (
    <div className={`${styles.count_container} ${styles[sizeClass]}`}>
      <Image src="/icons/heart.svg" alt="좋아요" width={size} height={size} />
      <p>{count}</p>
    </div>
  );
}

export default LikeCount;
