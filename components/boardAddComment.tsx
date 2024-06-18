"use client";

import { IBoardComment } from "@/@types";
import { addBoardComment } from "@/app/api/comment";
import { useEffect, useState } from "react";

interface addComment {
  onClickBtn: (content: IBoardComment) => void;
  id: number;
}
export default function BoardAddComment({ onClickBtn, id }: addComment) {
  const [content, setContent] = useState("");
  const [isContentValid, setIsContentValid] = useState(true);

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  useEffect(() => {
    if (content.trim() === "") {
      setIsContentValid(true);
    } else {
      setIsContentValid(false);
    }
  }, [content]);

  const fetchComment = async () => {
    setContent("");
    const fetchedcomment = await addBoardComment(id, content);
    onClickBtn(fetchedcomment);
  };

  return (
    <div className="mb20">
      <p className="strong">
        <strong>댓글 달기</strong>
      </p>
      <div className="defaultForm textRight">
        <textarea
          name="content"
          id="content"
          value={content}
          cols={20}
          rows={5}
          onChange={handleOnChange}
          placeholder="댓글을 입력하세요"
        />
        <button
          type="submit"
          onClick={fetchComment}
          className="primaryBtn"
          disabled={isContentValid}
        >
          등록
        </button>
      </div>
    </div>
  );
}
