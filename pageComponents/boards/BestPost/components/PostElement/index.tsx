import formatTime from "@/utils/formatTime";
import styles from "./style.module.css";
import Image from "next/image";
import ic_medal from "@/images/ic_medal.svg";
import ic_heart from "@/images/ic_heart.svg";
import Link from "next/link";
import { ArticleType } from "@/constants/type";


const PostElement = ({
  post: { id, title, image, likeCount, updatedAt, writer },
}: {
  post: ArticleType;
}) => {
  const postingDate = formatTime(updatedAt);
  return (
    <Link href={`/boards/${id}`} className={styles.container}>
      <div className={styles.contents}>
        <div className={styles.best}>
          <div className={styles.best_contents}>
            <div className={styles.best_logo}>
              <Image src={ic_medal} alt="베스트 로고" fill />
            </div>
            <span>Best</span>
          </div>
        </div>
        <div className={styles.post}>
          <h2 className={styles.post_title}>{title}</h2>
          {image && (
            <div className={styles.post_image}>
              <Image src={image} alt="게시글 이미지" fill />
            </div>
          )}
        </div>
        <div className={styles.details}>
          <div className={styles.writer_likes}>
            <span className={styles.writer}>{writer.nickname}</span>
            <div className={styles.likes}>
              <div className={styles.likes_icon}>
                <Image src={ic_heart} alt="하트 이모티콘" fill />
              </div>
              <span className={styles.likes_count}>{likeCount}</span>
            </div>
          </div>
          <span className={styles.date}>{postingDate}</span>
        </div>
      </div>
    </Link>
  );
};

export default PostElement;
