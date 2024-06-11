import Image from "next/image";
import type { IBoard } from "../@types";
import styles from "../styles/boardItem.module.css";
import Link from "next/link";

export default function BoardItem({ board }: { board: IBoard }) {
  const createdAt = board.createdAt.split("T");
  return (
    <div className={styles.boardItem}>
      <div className={styles.boardContent}>
        <p>{board.title}</p>
        {board.image && (
          <Image src={board.image} alt={board.title} width={72} height={72} />
        )}
      </div>
      <div className={styles.boardFoot}>
        <div className={styles.profile}>
          <Image
            src="/images/ic_profile.png"
            alt="profile"
            width={24}
            height={24}
          />
          <span>{board.writer.nickname}</span>
          <span className={styles.boardDate}>{createdAt[0]}</span>
        </div>
        <div className={styles.boardLike}>
          <Image src="/images/img_like.png" alt="like" width={13} height={12} />
          <span>{board.likeCount}</span>
        </div>
      </div>
    </div>
  );
}
