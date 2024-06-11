import { getBoardList } from "../api/board";
import BestBoard from "@/components/bestBoard";
import styles from "./board.module.css";
import BoardList from "@/components/boardList";

export default async function Board() {
  const bestBoard = await getBoardList({
    page: 1,
    pageSize: 3,
    orderBy: "like",
  });
  return (
    <div className="container">
      <h3>베스트 게시글</h3>
      <div className={styles.bestBoard}>
        {bestBoard.map((board) => {
          return <BestBoard key={board.id} board={board} />;
        })}
      </div>
      <BoardList />
    </div>
  );
}
