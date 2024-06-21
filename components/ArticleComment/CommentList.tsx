import React from "react";
import Image from "next/image";
import styles from "@/styles/ArticleComment.module.css";
import { CommentResponse } from "@/lib/apis/getComment.api";
import formatTimeAgo from "@/utils/formatTimeAgo";

function CommentList({ content, createdAt, writer }: CommentResponse) {
  return (
    <div className={styles["comment-container"]}>
      <div className={styles["comment-container__top"]}>
        <p className={styles["comment-content"]}>{content}</p>
        <button className={styles["comment-edit-btn"]}>
          <Image src="/images/Articles/hamburger-icon.svg" alt="게시글 수정 버튼" width={24} height={24} />
        </button>
      </div>
      <div className={styles["comment-container__bottom"]}>
        <Image src="/images/Articles/profile.png" alt="댓글 작성자 프로필 이미지" width={32} height={32}></Image>
        <div className={styles["comment-writer__info"]}>
          <span className={styles["comment-writer__nickname"]}>{writer.nickname}</span>
          <span className={styles["comment-writer__time"]}>{formatTimeAgo(createdAt)}</span>
        </div>
      </div>
    </div>
  );
}

export default CommentList;
