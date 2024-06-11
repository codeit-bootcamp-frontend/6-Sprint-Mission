"use client";
import { IBoardDetail } from "@/@types";
import { getBoardItem } from "@/app/api/board";
import { useEffect, useState } from "react";
import styles from "./boardDetail.module.css";
import Image from "next/image";
import BoardComment from "@/components/boardCommentList";

export default function DetailBoard({ params }: { params: { id: string } }) {
  const [boardData, setBoardData] = useState<IBoardDetail | null>(null);

  useEffect(() => {
    const fetchBoardItem = async () => {
      const fetchedBoardItem = await getBoardItem(params.id);
      setBoardData(fetchedBoardItem);
    };
    fetchBoardItem();
  }, [params.id]);

  if (!boardData) {
    return;
  }

  const createdAt = boardData.createdAt.split("T");

  return (
    <div className="container">
      <div className="borderBottom">
        <div className={styles.title}>
          <h3>{boardData.title}</h3>
          <Image
            src="/images/ic_group.png"
            width={3}
            height={13}
            alt="더보기"
          />
        </div>
        <div className={styles.writer}>
          <Image
            src="/images/ic_profile.png"
            width={24}
            height={24}
            alt="profile"
          />
          <p className={styles.nickname}>{boardData.writer.nickname}</p>
          <p className={styles.date}>{createdAt[0]}</p>
          <div className={styles.like}>
            <Image
              src="/images/img_like.png"
              width={13}
              height={12}
              alt="like"
            />
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
