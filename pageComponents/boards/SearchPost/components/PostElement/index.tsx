import styles from "./style.module.css";
import Image from "next/image";
import Link from "next/link";
import ic_user from "@/images/ic_user.png";
import ic_heart from "@/images/ic_heart.svg";
import formatTime from "@/utils/formatTime";

interface PostType {
  id: number;
  title: string;
  content: string;
  image: string | null;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
  writer: {
    id: number;
    nickname: string;
  };
}
const PostElement = ({ post }: { post: PostType }) => {
  const { id, title, image, likeCount, updatedAt, writer } = post;
  const postingDate = formatTime(updatedAt);
  return (
    <Link href={`/boards/${id}`} className={styles.container}>
      <div className={styles.title_img}>
        <h2 className={styles.title}>{title}</h2>
        {image && (
          <Image src={image} alt="게시글 사진" width={72} height={72} />
        )}
      </div>
      <div className={styles.details}>
        <div className={styles.writer_date}>
          <Image src={ic_user} alt="유저 아이콘" width={24} height={24} />
          <span className={styles.nickName}>{writer.nickname}</span>
          <span className={styles.date}>{postingDate}</span>
        </div>
        <div className={styles.likes}>
          <Image src={ic_heart} alt="하트 아이콘" width={24} height={24} />
          <span className={styles.likes_count}>{`${likeCount}+`}</span>
        </div>
      </div>
    </Link>
  );
};

export default PostElement;
