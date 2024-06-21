import BestBadge from "@/public/img/img_bestbadge.svg";
import { ArticleType, ArticleProps } from "@/types/type";
import Image from "next/image";
import styles from "@/styles/BestArticle.module.css";
import heart from "@/public/icon/ic_heart.svg";
import BestArticleList from "./BestArticleList";
import Link from "next/link";

export default function BestArticle({ article }: ArticleProps) {
  const date = new Date(article.updatedAt).getDate();
  const month = new Date(article.updatedAt).getMonth() + 1;
  const year = new Date(article.updatedAt).getFullYear();
  const createdDate = `${year}. ${month}. ${date}`;

  return (
    <>
      <Link href={`/addboard/${article.id}`} passHref>
        <div className={styles["Article-container"]}>
          <Image
            className={styles["Article-BestBadge"]}
            src={BestBadge}
            alt="Best Badge"
          />
          <div className={styles["Article-container-text"]}>
            <div className={styles["Article-header"]}>
              <div className={styles["Article-header-title"]}>
                {article.title}
              </div>

              {article.image && (
                <div className={styles["Article-img-container"]}>
                  <Image
                    className={styles["Article-img"]}
                    src={article.image}
                    alt={`${article.title} 게시글 이미지`}
                    width={44}
                    height={44}
                  />
                </div>
              )}
            </div>
            <div className={styles["Article-user"]}>
              <div className={styles["Article-user-name"]}>
                {article.writer.nickname}
                <Image src={heart} alt="하트!" width={16} />
                {article.likeCount}+
              </div>

              <div className={styles["Article-date"]}>{createdDate}</div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
