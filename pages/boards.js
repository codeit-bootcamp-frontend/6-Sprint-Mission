import styles from "@/styles/Boards.module.css";
import BestPost from "@/components/BestPost";
import Post from "@/components/Post";

export default function Boards() {
  return (
    <main className={styles.container}>
      <BestPost />
      <Post />
    </main>
  );
}
