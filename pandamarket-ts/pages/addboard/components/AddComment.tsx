import { postArticleComment } from "@/pages/api/api";
import React from "react";

interface AddCommentProps {
  currentId: string | string[];
  accessToken: string;
  comment: { content: string };
  onTextAreaChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const AddComment = ({
  currentId,
  comment,
  onTextAreaChange,
  onSubmit,
}: AddCommentProps) => {
  let stringId = "";
  if (Array.isArray(currentId)) {
    stringId = currentId[0];
  } else if (typeof currentId === "string") {
    stringId = currentId;
  } else {
    throw new Error("id is not string");
  }
  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="flex flex-col gap-[16px]">
          <label
            htmlFor="comment"
            className="text-[16px] font-semibold text-gray-900"
          >
            댓글 달기
          </label>
          <textarea
            value={comment.content}
            className="placeholder:gray-400 placeholder: h-[104px] rounded-[12px] bg-gray-200 px-[24px] pb-[64px] pt-[16px] placeholder:text-[14px] placeholder:font-normal"
            name="comment"
            onChange={onTextAreaChange}
            placeholder="댓글을 입력해주세요."
          />
          <div className="flex flex-row-reverse">
            <button
              type="submit"
              className={`${comment.content === "" ? "bg-gray-400" : "bg-blue"} h-[42px] w-[74px] rounded-[8px] text-[16px] font-semibold text-white`}
            >
              등록
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddComment;
