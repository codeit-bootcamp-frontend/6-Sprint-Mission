import { getArticleComments } from "@/pages/api/api";
import { Comment } from "@/types/articleResponseTypes";
import React, { useEffect, useState } from "react";
import Profile from "@/public/assets/ui/ic_profile.svg";
import EmptyComments from "@/public/assets/ui/empty_article_comments.svg";

interface AddCommentProps {
  currentId: string | string[];
  comment: { content: string };
}

const CommentList = ({ currentId, comment }: AddCommentProps) => {
  const [comments, setComments] = useState<Comment[] | null>(null);

  let stringId = "";
  if (Array.isArray(currentId)) {
    stringId = currentId[0];
  } else if (typeof currentId === "string") {
    stringId = currentId;
  } else {
    throw new Error("id is not string");
  }

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await getArticleComments(stringId);
        const commentList: Comment[] = response.list;
        if (!response) {
          throw new Error("댓글을 찾을 수 없습니다");
        }
        setComments(commentList);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.error("알 수 없는 오류 발생");
        }
      }
    };
    fetchComments();
  }, [stringId, comment]);

  return (
    <>
      {comments?.length ? (
        <div className="mt-[24px] flex flex-col gap-[24px]">
          {comments.map((comment) => (
            <div className="flex flex-col gap-[24px]" key={comment.id}>
              <div className="text-[14px] font-normal text-gray-800">
                {comment.content}
              </div>
              <div className="flex gap-[8px]">
                <Profile width="32" height="32" />
                <div className="text-[12px] font-normal text-gray-600">
                  {comment.writer.nickname}
                </div>
              </div>
              <hr className="stroke-gray-200" />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center">
          <EmptyComments />
        </div>
      )}
    </>
  );
};

export default CommentList;
