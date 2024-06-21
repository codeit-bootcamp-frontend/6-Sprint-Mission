import React, { ChangeEvent, useState, useRef, useEffect } from "react";
import styles from "@/styles/ArticleComment.module.css";
import { CommentResponse } from "@/lib/apis/getComment.api";
import Image from "next/image";
import Link from "next/link";
import { commentRegisterValidation } from "@/utils/validations";
import { postComment } from "@/lib/apis/postComment.api";
import { FormDataResponse } from "@/lib/apis/postComment.api";
import { useRouter } from "next/router";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import CommentList from "./CommentList";

interface Props {
  comments: CommentResponse[];
  setNewComment: (value: CommentResponse) => void;
  cursor: number | null;
  getComments: (value: number | null) => void;
  loading: boolean;
}

function ArticleComment({ comments, setNewComment, cursor, getComments, loading }: Props) {
  const [isButtonDisabled, setisButtonDisabled] = useState(true);
  const [comment, setComment] = useState("");
  const router = useRouter();
  const id = router.query.id;

  const loadingRef = useRef(null);
  const interesting = useIntersectionObserver(loadingRef);

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

  useEffect(() => {
    if (interesting && cursor !== null) {
      getComments(cursor);
    }
  }, [interesting]);

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
      <div ref={loadingRef}>
        {loading && (
          <div className={styles["comment-loading-container"]}>
            <Image
              className={styles["comment-loading-spinner"]}
              src="/images/Articles/spinner.svg"
              alt="댓글 로딩 아이콘"
              width={48}
              height={48}
            ></Image>
          </div>
        )}
      </div>
      <Link href="/boards" className={styles["go-back-btn"]}>
        목록으로 돌아가기
        <Image src="/images/Articles/go-back-icon.svg" alt="목록으로 돌아가기 버튼 아이콘" width={24} height={24} />
      </Link>
    </div>
  );
}

export default ArticleComment;
