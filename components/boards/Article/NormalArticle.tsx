import { Article } from "@/interfaces/Article.interface";
import styles from "./Article.module.scss";
import Image from "next/image";
import formatDateWithDot from "@/utils/formatDateWithDot";
import filterImageSrc from "@/utils/filterImageSrc";
import ArticleImage from "./ArticleImage";
import LikeCount from "@/components/common/LikeCount";

export function NormalArticle({ article }: { article: Article }) {
  const imageSrc = filterImageSrc(article.image);

  return (
    <>
      <article className={styles.article}>
        <div className={styles.content}>
          <header className={styles.header}>
            <h3 className={styles.title}>{article.title}</h3>
            {imageSrc && <ArticleImage imageSrc={imageSrc} />}
          </header>

          <footer className={styles.footer}>
            <div className={styles.info_container}>
              <Image
                src="/icons/profile.svg"
                alt="프로필 이미지"
                width={24}
                height={24}
              />
              <p>{article.writer.nickname}</p>
              <p className={styles.created_at}>
                {formatDateWithDot(article.createdAt)}
              </p>
            </div>
            <LikeCount count={article.likeCount} size={24} />
          </footer>
        </div>
      </article>
      <div className={styles.divider} />
    </>
  );
}
