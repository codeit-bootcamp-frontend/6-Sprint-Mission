"use client";

import { IBoardComment } from "@/@types";
import { getBoardComments } from "@/app/api/board";
import { useEffect, useState } from "react";
import BoardCommentItem from "./boardCommentItem";
import BoardAddComment from "./boardAddComment";
import Link from "next/link";
import Image from "next/image";

export default function BoardCommentList({ id }: { id: number }) {
  const [comments, setComments] = useState<IBoardComment[]>([]);
  useEffect(() => {
    const fetchComments = async () => {
      const fetchedComments = await getBoardComments(id);
      setComments(fetchedComments);
    };
    fetchComments();
  }, [id]);

  const handleNewComment = (comment: IBoardComment) => {
    setComments([comment, ...comments]);
  };
  return (
    <div>
      <BoardAddComment onClickBtn={handleNewComment} id={id} />
      {comments.length > 0 ? (
        comments.map((comment) => {
          return <BoardCommentItem key={comment.id} comment={comment} />;
        })
      ) : (
        <div className="emptyList">
          <Image
            src="/images/img_replyEmpty.png"
            alt="댓글이 없습니다."
            width={140}
            height={140}
          />
          <p>
            아직 댓글이 없어요,
            <br />
            지금 댓글을 달아보세요!
          </p>
        </div>
      )}
      <Link href="/board" prefetch className="roundBtn">
        목록으로 돌아가기
        <Image
          src="/images/ic_back.png"
          alt="목록으로 돌아가기"
          width={24}
          height={24}
        />
      </Link>
    </div>
  );
}
