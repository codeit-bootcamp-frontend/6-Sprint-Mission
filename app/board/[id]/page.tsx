"use client";
import { IBoardDetail } from "@/@types";
import {
  addLike,
  deleteBoard,
  deleteLike,
  getBoardItem,
} from "@/app/api/board";
import { useEffect, useState } from "react";
import styles from "./boardDetail.module.css";
import Image from "next/image";
import BoardComment from "@/components/boardCommentList";
import More from "@/components/morePopup";

export default function DetailBoard({ params }: { params: { id: string } }) {
  const [boardData, setBoardData] = useState<IBoardDetail | null>(null);
  const [morePopup, setMorePopup] = useState(false);

  useEffect(() => {
    document.title = "판다마켓 | 자유게시판 상세 페이지";
    const fetchBoardItem = async () => {
      const fetchedBoardItem = await getBoardItem(params.id);
      setBoardData(fetchedBoardItem);
    };
    fetchBoardItem();
  }, [params.id]);

  if (!boardData) {
    return;
  }
  const handleAddLike = async () => {
    const fetchedAddLike = await addLike(parseInt(params.id));
    setBoardData(fetchedAddLike);
  };
  const handleDeleteLike = async () => {
    const fetchedDeleteLike = await deleteLike(parseInt(params.id));
    setBoardData(fetchedDeleteLike);
  };
  const handleMoreToggle = () => {
    setMorePopup(!morePopup);
  };
  const userID = localStorage.getItem("userid");
  return (
    <div className="container">
      <div className="borderBottom">
        <div className={styles.title}>
          <h3>{boardData.title}</h3>
          {userID?.toString() == boardData.writer.id.toString() ? (
            <div className={styles.popUp}>
              <Image
                src="/images/ic_group.png"
                width={3}
                height={13}
                alt="더보기"
                onClick={handleMoreToggle}
                className="moreBtn"
              />
              {morePopup && (
                <More
                  id={parseInt(params.id)}
                  url={`/board/editBoard/${params.id}`}
                  funcName={deleteBoard}
                  redirectPageName="/board"
                />
              )}
            </div>
          ) : null}
        </div>
        <div className={styles.writer}>
          <Image
            src="/images/ic_profile.png"
            width={24}
            height={24}
            alt="profile"
          />
          <p className={styles.nickname}>{boardData.writer.nickname}</p>
          <p className={styles.date}>{boardData.createdAt.split("T")[0]}</p>
          <div className={styles.like}>
            {boardData.isLiked === false ? (
              <Image
                src="/images/img_like.png"
                width={13}
                height={12}
                alt="like"
                onClick={handleAddLike}
                className={styles.likeBtn}
              />
            ) : (
              <Image
                src="/images/img_fillLike.png"
                width={13}
                height={12}
                alt="like"
                onClick={handleDeleteLike}
                className={styles.likeBtn}
              />
            )}

            <p>{boardData.likeCount}</p>
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <p>{boardData.content}</p>
        {boardData.image && (
          <div className="previewArea">
            <Image
              src={boardData.image}
              alt={boardData.title}
              layout="fill"
              objectFit="cover"
              className="itemPreview"
            />
          </div>
        )}
      </div>
      <BoardComment id={boardData.id} />
    </div>
  );
}
