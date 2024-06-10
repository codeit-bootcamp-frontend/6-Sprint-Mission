import React, { ChangeEvent, useState } from "react";
import styles from "@/styles/ArticleComment.module.css";
import { CommentResponse } from "@/lib/apis/getComment.api";
import Image from "next/image";
import formatTimeAgo from "@/utils/formatTimeAgo";
import Link from "next/link";
import { commentRegisterValidation } from "@/utils/validations";
import { postComment } from "@/lib/apis/postComment.api";
import { FormDataResponse } from "@/lib/apis/postComment.api";
import { useRouter } from "next/router";

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

interface Props {
  comments: CommentResponse[];
  setNewComment: (value: CommentResponse) => void;
}

function ArticleComment({ comments, setNewComment }: Props) {
  const [isButtonDisabled, setisButtonDisabled] = useState(true);
  const [comment, setComment] = useState("");
  const router = useRouter();
  const id = router.query.id;

  const handleTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    handleValidate(value);
    setComment(value);
  };

  const handleValidate = (value: string) => {
    const validate = commentRegisterValidation(value);
    setisButtonDisabled(validate);
  };

  const handleRegisterBtn = async () => {
    const isLogined = localStorage.getItem("accessToken");

    if (!isLogined) {
      alert("로그인이 필요합니다.");
      router.push("/SignIn");
    } else {
      const data = new FormData();
      data.append("content", comment);
      try {
        const res = await postComment(data as unknown as FormDataResponse, id);
        setNewComment(res);
      } catch (e) {
        console.error(`error: ${e}`);
        alert("댓글 등록에 실패하였습니다.");
      }
    }
  };

  return (
    <div className={styles["comment-wrapper"]}>
      <label htmlFor="comment-textarea" className={styles["comment-input-label"]}>
        댓글 달기
      </label>
      <textarea
        onChange={handleTextarea}
        name="comment-textarea"
        id="comment-textarea"
        className={styles["comment-textarea"]}
        placeholder="댓글을 입력해주세요."
      ></textarea>
      <button
        id="comment-register-btn"
        className={styles[isButtonDisabled ? "comment-register-btn" : "active"]}
        disabled={isButtonDisabled}
        onClick={handleRegisterBtn}
      >
        등록
      </button>
      {comments.length !== 0 ? (
        comments.map((comment) => {
          return <CommentList key={comment.id} {...comment} />;
        })
      ) : (
        <Image
          className={styles["no-comment-img"]}
          src="/images/Articles/no-comment.png"
          alt="댓글이 없을 때 출력되는 이미지"
          width={151}
          height={195}
        />
      )}
      <Link href="/boards" className={styles["go-back-btn"]}>
        목록으로 돌아가기
        <Image src="/images/Articles/go-back-icon.svg" alt="목록으로 돌아가기 버튼 아이콘" width={24} height={24} />
      </Link>
    </div>
  );
}

export default ArticleComment;
