import BestPost from "@/components/boardsComponents/BestPost";
import NormalPost from "@/components/boardsComponents/NormalPost";
import { boardsContainer } from "@/components/boardsComponents/boards.styled";
import Header from "@/components/shared/Header/Header";
import { subTitle } from "@/css/common/text.styled";
import { vstack } from "@/styled-system/patterns";

function Boards() {
  return (
    <div>
      <Header />
      <div className={boardsContainer}>
        <h2 className={subTitle}>베스트 게시글</h2>
        <div className={vstack()}>
          <BestPost />
          <NormalPost />
        </div>
      </div>
    </div>
  );
}

export default Boards;
