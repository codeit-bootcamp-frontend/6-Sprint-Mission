import styles from "./BestArticleSection.module.scss";
import BestArticleList from "@/components/boards/ArticleList/BestArticleList";

function BestArticleSection() {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>베스트 게시글</h2>
      <BestArticleList />
    </section>
  );
}

export default BestArticleSection;
