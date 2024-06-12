import { useRouter } from "next/router";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "@/utils/axios";
import timeString from "@/utils/timeString";
import getUser from "@/utils/getUser";
import Comment from "@/components/boards/id/comment";
import styles from "@/styles/post.module.css";
import ic_back from "@/public/icon/ic_back.png";
import user_icon from "@/public/icon/user_icon.svg";
import ViewHr from "@/public/icon/view_hr.svg";
import heartImg from "@/public/icon/ic_heart.svg";
import reply_empty from "@/public/icon/img_reply_empty.svg";
import nullImg from "@/public/icon/null.png";
import { GetServerSideProps } from "next";
import { PostViewProps, getUserData, getUserMessage } from "@/types";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;

  try {
    const [articleRes, commentsRes] = await Promise.all([
      axios.get(`/articles/${id}`),
      axios.get(`/articles/${id}/comments?limit=99`), // 모든 댓글 로드
    ]);

    return {
      props: {
        article: articleRes.data,
        comments: commentsRes.data.list ?? [],
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      notFound: true,
    };
  }
};

export default function PostView({
  article,
  comments: initialComments,
}: PostViewProps) {
  const [newComment, setNewComment] = useState<string>("");
  const [isEdit, setIsEdit] = useState<number | null>(null);
  const [currentCommentPage, setCurrentCommentPage] = useState(1);
  const [editedComments, setEditedComments] = useState(initialComments);

  const COMMENTS_PER_PAGE = 5; // 페이지 당 댓글 수

  const observer = useRef<IntersectionObserver | null>(null);
  const lastCommentRef = useRef<HTMLDivElement | null>(null);

  const router = useRouter();
  const id = router.query["id"];
  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  const currentComments = editedComments.slice(
    0,
    currentCommentPage * COMMENTS_PER_PAGE
  );

  async function postComment() {
    if (!accessToken) {
      return alert("로그인 ㄱ");
    } else if (newComment === "") {
      return alert("댓글작성 ㄱ");
    } else if (newComment.length <= 2) {
      return alert("좀만 더 길게 작성 ㄱ");
    }

    try {
      const userData = await getUser(accessToken);

      if (!userData || (userData as getUserMessage).message) {
        alert("다시 로그인 ㄱ");
        router.push("/mypage");
        return;
      }

      if ((userData as getUserData).nickname) {
        const res = await axios.post(
          `/articles/${id}/comments`,
          { content: newComment },
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );

        setEditedComments((prevComments) => [res.data, ...prevComments]);
        setNewComment("");
      }
    } catch (error: any) {
      console.log("댓글을 작성하는 중 오류가 발생했습니다.", error);

      alert("로그인 다시 ㄱ");
    }
  }

  async function handleEditClick(commentId: number) {
    setIsEdit(commentId);
  }

  function handleCancelClick() {
    setIsEdit(null);
  }

  async function handleSaveEdit(commentId: number, newContent: string) {
    if (!accessToken) {
      return alert("로그인 ㄱ");
    }

    try {
      const userData = await getUser(accessToken);

      if (!userData || (userData as getUserMessage).message) {
        alert("다시 로그인 ㄱ");
        router.push("/mypage");
        return;
      }

      if ((userData as getUserData).nickname) {
        const res = await axios.patch(
          `/comments/${commentId}`,
          { content: newContent },
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );

        if (res.status === 200) {
          setEditedComments((prevComments) =>
            prevComments.map((comment) =>
              comment.id === commentId
                ? { ...comment, content: newContent }
                : comment
            )
          );
          setIsEdit(null);
        }
      }
    } catch (error: any) {
      console.log("댓글을 수정하는 중 오류가 발생했습니다.", error);
      if (error.response.status === 403) {
        return alert("권한이 없음");
      }
      alert("로그인 다시 ㄱ");
    }
  }

  async function handleDeleteClick(commentId: number) {
    if (!accessToken) {
      return alert("로그인 ㄱ");
    }

    try {
      const userData = await getUser(accessToken);

      if (!userData || (userData as getUserMessage).message) {
        alert("다시 로그인 ㄱ");
        router.push("/mypage");
        return;
      }

      if ((userData as getUserData).nickname) {
        const res = await axios.delete(`/comments/${commentId}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (res.status === 200) {
          alert("삭제 완료");
          setEditedComments((prevComments) =>
            prevComments.filter((comment) => comment.id !== commentId)
          );
        }
      }
    } catch (error: any) {
      if (error.response.status === 401 || error.response.status === 403) {
        return alert("권한 ㄴ");
      }
    }
  }

  const observerCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        setCurrentCommentPage((prevPage) => prevPage + 1);
      }
    },
    []
  );

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    });

    if (lastCommentRef.current) {
      observer.current.observe(lastCommentRef.current);
    }

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [observerCallback, lastCommentRef.current]);

  const imageSrc = article?.image
    ? article.image.startsWith(
        "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com"
      )
      ? article.image
      : nullImg
    : null;

  return (
    article && (
      <div className={styles.viewBestContainer}>
        <div className={styles.viewPostTop}>
          <span className={styles.viewPostTitle}>{article.title}</span>
          <div className={styles.viewPostInfo}>
            <Image width={24} height={24} alt="프로필사진" src={user_icon} />
            <span className={styles.Writer}>{article.writer.nickname}</span>
            <span className={styles.times}>
              {timeString(article.createdAt)}
            </span>
            <Image height={24} width={24} alt="이게뭐지;" src={ViewHr} />
            <Image width={16} height={16} alt="하트" src={heartImg} />
            <span className={styles.LikeCount}>{article.likeCount}</span>
          </div>
          <div className={styles.viewPostDes}>
            {imageSrc && (
              <Image width={512} height={512} src={imageSrc} alt="zzz" />
            )}
            <br />
            <span className={styles.viewPostContent}>{article.content}</span>
          </div>
        </div>
        <div className={styles.viewPostMiddle}>
          <span className={styles.viewAddText}>댓글 달기</span>
          <textarea
            className={styles.viewAddContent}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="댓글을 입력해주세요."
          />
          <div className={styles.viewAddBtnContainer}>
            <button
              className={`${styles.viewAddBtn} ${
                newComment === "" ? "" : styles.active
              }`}
              onClick={postComment}
            >
              등록
            </button>
          </div>
        </div>
        <div className={styles.viewPostBottom}>
          {currentComments.length > 0 ? (
            currentComments.map((comment, index) => {
              const isLastComment = currentComments.length === index + 1;
              return (
                <div
                  key={comment.id}
                  ref={isLastComment ? lastCommentRef : null} // 마지막 댓글에 ref 추가
                >
                  <Comment
                    comment={comment}
                    isEdit={isEdit === comment.id}
                    onEdit={handleEditClick}
                    onDelete={handleDeleteClick}
                    onCancelEdit={handleCancelClick}
                    onSaveEdit={handleSaveEdit}
                  />
                </div>
              );
            })
          ) : (
            <div className={styles.commentEmptyContainer}>
              <Image
                width={140}
                height={140}
                src={reply_empty}
                alt="no comment"
              />
              <p>
                아직 댓글이 없어요,
                <br />
                지금 댓글을 달아보세요!
              </p>
            </div>
          )}
        </div>
        <div className={styles.backContainer}>
          <div>
            <Link href="/boards" className={styles.backBtn}>
              목록으로 돌아가기
            </Link>
            <Image
              width={24}
              height={24}
              src={ic_back}
              alt="back to items"
              className={styles.backImg}
            />
          </div>
        </div>
      </div>
    )
  );
}
