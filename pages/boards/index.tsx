import ArticleSection from "@/components/boards/ArticleSection/ArticleSection";
import BestArticleSection from "@/components/boards/ArticleSection/BestArticleSection";
import styles from "@/styles/Boards.module.scss";

function Boards() {
  return (
    <main className={styles.main}>
      <BestArticleSection />
      <ArticleSection />
    </main>
  );
}

export default Boards;
