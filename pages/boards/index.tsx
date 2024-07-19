import styles from "./style.module.css";
import BestPostSection from "@/components/BestPostSection";
import PostSection from "@/components/PostSection";

export default function BoardsPage() {
  return (
    <main className={styles.container}>
      <BestPostSection />
      <PostSection />
    </main>
  );
}
