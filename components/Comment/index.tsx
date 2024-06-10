import React from "react";
import KebabButton from "../KebabButton";
import Image from "next/image";
import ic_user from "@/images/ic_user.png";
import formatTime from "@/utils/formatTime";

interface CommentProp {
  nickname: string;
  image: string | null;
  updatedAt: string;
  content: string;
}

const Comment = ({ nickname, image, updatedAt, content }: CommentProp) => {
  const date = formatTime(updatedAt);
  return (
    <div className="min-h-[9.7rem] pb-[2.4rem] sm:pb-[1.6rem] border-b-[0.1rem] border-gray-200">
      <div className="flex justify-between mb-[2.4rem]">
        <h3 className="font-normal text-[1.4rem] leading-[1.7rem] text-gray-800">
          {content}
        </h3>
        <div className="align-top">
          <KebabButton width={24} height={24} />
        </div>
      </div>

      <div className="flex gap-[0.8rem]">
        {image ? (
          <Image src={image} alt="유저 아이콘" width={32} height={32} />
        ) : (
          <Image src={ic_user} alt="유저 아이콘" width={32} height={32} />
        )}
        <div className="flex flex-col gap-[0.4rem]">
          <span className="font-normal text-[1.2rem] leading-[1.4rem] text-gray-600">{nickname}</span>
          <span className="font-normal text-[1.2rem] leading-[1.4rem] text-gray-400">{date}</span>
        </div>
      </div>
    </div>
  );
};

export default Comment;
