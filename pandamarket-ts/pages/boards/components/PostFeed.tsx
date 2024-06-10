import { Post } from "@/types/articleResponseTypes";
import { formatDate } from "@/utils/utils";
import Heart from "../../../public/assets/icon/ic_heart.svg";
import Profile from "../../../public/assets/ui/ic_profile.svg";
import React from "react";
import Image from "next/image";

interface PostFeedProps {
  article: Post;
}

const PostFeed: React.FC<PostFeedProps> = ({ article }) => {
  let date = "";
  if (article?.createdAt) {
    const dateObject = new Date(article.createdAt ?? "");
    date = formatDate(dateObject);
  }
  return (
    <>
      {article && (
        <div className="pt-[24px]">
          <div className="pb-[24px]">
            <div className="flex place-content-between">
              <div className="sm:text-18px font-semibold md:text-20px lg:text-20px">
                {article.title}
              </div>
              {article.image && (
                <Image
                  className="h-[72px] w-[72px] shrink-0 grow-0 rounded-[8px] border-[1px] border-solid border-gray-200 px-[12px] py-[14px]"
                  src={article.image}
                  alt={`${article.writer.nickname}`}
                  width={48}
                  height={45}
                />
              )}
            </div>
            <div className="flex place-content-between">
              <div className="flex items-center gap-[8px]">
                <Profile />
                <div className="text-14px font-normal text-gray-600">
                  {article.writer.nickname}
                </div>
                <div className="font-normal text-gray-400">{date}</div>
              </div>
              <div className="flex items-center gap-[10px]">
                <Heart />
                <div className="text-16px font-normal text-gray-500">
                  {article.likeCount}
                </div>
              </div>
            </div>
          </div>
          <hr />
        </div>
      )}
    </>
  );
};

export default PostFeed;
