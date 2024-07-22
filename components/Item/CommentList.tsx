import { patchProductComment } from "@/api/products/productComments";
import { Comment } from "@/types";
import formatTimeAgo from "@/utils/formatTimeAgo";
import axios from "@/lib/axios";
import Image from "next/image";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

const CommentList = ({
  comment,
  setIsChangeComment,
}: {
  comment: Comment;
  setIsChangeComment: Dispatch<SetStateAction<boolean>>;
}) => {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [isEditInput, setIsEditInput] = useState(false);
  const [newValue, setNewValue] = useState(comment.content);

  const handleNewValueChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewValue(e.target.value);
  };

  const handleButtonVisible = () => {
    setIsOpenDropdown(!isOpenDropdown);
  };

  const handleEditComment = () => {
    setIsEditInput(!isEditInput);
    setIsOpenDropdown(!isOpenDropdown);
  };

  const handlePatchComment = async () => {
    await patchProductComment({ commentId: comment.id, newValue });
    setIsChangeComment((prev) => !prev);
    setIsEditInput(!isEditInput);
  };

  const handleDeleteComment = async () => {
    await axios.delete(`/comments/${comment.id}`);
    setIsChangeComment((prev) => !prev);
    setIsEditInput(!isEditInput);
  };

  return (
    <>
      {comment ? (
        <div className="flex flex-col gap-16 pb-16 border-b border-solid border-gray-20 md:gap-24">
          <div className="relative flex items-start justify-between">
            {isEditInput ? (
              <div className="relative flex flex-col w-full">
                <textarea
                  value={newValue}
                  onChange={handleNewValueChange}
                  className="h-60 resize-none rounded-12 bg-gray-10 px-16 py-8 text-12 font-normal leading-[24px]"
                />
                <button
                  onClick={handlePatchComment}
                  className="absolute bottom-[-36px] right-0 h-30 w-50 cursor-pointer items-center rounded-8 bg-blue px-12 py-6 text-12 font-semibold leading-[12px] text-gray-50"
                >
                  등록
                </button>
              </div>
            ) : (
              <div className="text-14 font-normal leading-[24px] text-black-800">
                {comment.content}
              </div>
            )}
            <Image
              onClick={handleButtonVisible}
              className="cursor-pointer"
              src="/images/ic_kebab.svg"
              width={24}
              height={24}
              alt="케밥아이콘"
            />
            {isOpenDropdown ? (
              <div className="absolute flex-col h-64 py-6 bg-white right-8 top-24 w-72 rounded-6 text-12 border-1px-solid-gray-30 flex-center md:h-74 md:w-86 md:text-14">
                <div
                  onClick={handleEditComment}
                  className="px-8 py-4 cursor-pointer text-black-900 flex-center hover:rounded-4 hover:bg-skyblue md:px-12"
                >
                  수정하기
                </div>
                <div
                  onClick={handleDeleteComment}
                  className="px-8 py-4 cursor-pointer text-black-900 flex-center hover:rounded-4 hover:bg-skyblue md:px-12"
                >
                  삭제하기
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="flex items-center gap-8">
            {comment.writer.image ? (
              <div className="relative w-32 h-32">
                <Image fill src={comment.writer.image} alt="작성자 이미지" />
              </div>
            ) : (
              <div className="h-32 w-32 rounded-full bg-skyblue text-12 font-semibold leading-[15px] text-white flex-center">
                {comment.writer.nickname.charAt(0).toUpperCase()}
              </div>
            )}

            <div className="flex flex-col gap-4">
              <div className="text-12 font-normal leading-[18px] text-gray-600">
                {comment.writer.nickname}
              </div>
              <div className="text-12 font-normal leading-[18px] text-gray-400">
                {formatTimeAgo(comment.createdAt)}
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default CommentList;
