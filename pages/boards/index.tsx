import BestPost from "@/pageComponents/boards/BestPost";
import styles from "./style.module.css";
import SearchPost from "@/pageComponents/boards/SearchPost";

const Boards = () => {
  return (
    <div className={styles.container}>
      <BestPost />
      <SearchPost />
    </div>
  );
};

export default Boards;
