import { Articles } from "@/interfaces/Article.interface";
import Spinner from "@/components/common/Spinner";
import styles from "./ArticleList.module.scss";
import Link from "next/link";
import { BestArticle } from "../Article/BestArticle";
import { NormalArticle } from "../Article/NormalArticle";

function ArticleList({
  articles,
  isLoading,
  loadingError,
  isBest = false,
}: {
  articles: Articles | undefined;
  isLoading: boolean;
  loadingError: Error | null;
  isBest?: boolean;
}) {
  const className = isBest ? styles.best : styles.normal;
  console.log(isLoading);

  if (isLoading) {
    return (
      <div className={styles.spinner_container}>
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <ol className={`${styles.list} ${className}`}>
        {articles?.list.map((article) => (
          <li key={article.id}>
            <Link href={`/boards/${article.id}`}>
              {isBest ? (
                <BestArticle article={article} />
              ) : (
                <NormalArticle article={article} />
              )}
            </Link>
            <div className={styles.divider} />
          </li>
        ))}
      </ol>
      {loadingError && <p>{loadingError.message}</p>}
    </>
  );
}

export default ArticleList;
