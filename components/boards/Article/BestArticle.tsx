import { Article } from "@/interfaces/Article.interface";
import styles from "./Article.module.scss";
import Image from "next/image";
import formatDateWithDot from "@/utils/formatDateWithDot";
import filterImageSrc from "@/utils/filterImageSrc";
import ArticleImage from "./ArticleImage";
import LikeCount from "@/components/common/LikeCount";

export function BestArticle({ article }: { article: Article }) {
  const imageSrc = filterImageSrc(article.image);

  return (
    <article className={`${styles.article} ${styles.best}`}>
      <Image
        className={styles.badge}
        src="/images/badge.png"
        alt="베스트 상품 뱃지"
        width="102"
        height="30"
      />

      <div className={styles.content}>
        <header className={styles.header}>
          <h3 className={styles.title}>{article.title}</h3>
          {imageSrc && <ArticleImage imageSrc={imageSrc} />}
        </header>

        <footer className={styles.footer}>
          <div className={styles.info_container}>
            <p>{article.writer.nickname}</p>
            <LikeCount count={article.likeCount} size={16} />
          </div>
          <p className={styles.created_at}>
            {formatDateWithDot(article.createdAt)}
          </p>
        </footer>
      </div>
    </article>
  );
}
