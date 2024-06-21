import { ArticleType, ArticleProps } from "@/types/type";
import Image from "next/image";
import profileimg from "@/public/user/userprofile.svg";
import heart from "@/public/icon/ic_heart.svg";
import styles from "@/styles/Article.module.css";
import Link from "next/link";

export default function Article({ article }: ArticleProps) {
  const date = new Date(article.updatedAt).getDate();
  const month = new Date(article.updatedAt).getMonth() + 1;
  const year = new Date(article.updatedAt).getFullYear();
  const createdDate = `${year}. ${month}. ${date}`;
  return (
    <Link href={`/addboard/${article.id}`} passHref>
      <div className={styles["Article-container"]}>
        <div className={styles["Article-header"]}>
          <div className={styles["Article-header-title"]}>{article.title}</div>
          {article.image && (
            <Image
              className={styles["Article-header-img"]}
              src={article.image}
              alt={`${article.title} 게시글 이미지`}
              width={44}
              height={44}
            />
          )}
        </div>
        <div className={styles["Article-user"]}>
          <Image src={profileimg} alt="유저 프로필 이미지" width={24} />
          <div className={styles["Article-user-name"]}>
            {article.writer.nickname}
          </div>
          <div className={styles["Article-date"]}>{createdDate}</div>
          <div className={styles["Article-like"]}>
            <Image src={heart} alt="하트!" width={24} />
            <div className={styles["Article-like-text"]}>
              {article.likeCount}+
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
