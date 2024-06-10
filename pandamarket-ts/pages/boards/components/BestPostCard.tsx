import React from "react";
import { formatDate } from "../../../utils/utils";
import { Post } from "@/types/articleResponseTypes";
import BestBadge from "../../../public/assets/boards/best_badge.svg";
import Image from "next/image";
import Heart from "../../../public/assets/icon/ic_heart.svg";
interface PostCardProps {
  article: Post;
}

const PostCard: React.FC<PostCardProps> = ({ article }) => {
  let date = "";
  if (article?.createdAt) {
    const dateObject = new Date(article.createdAt ?? "");
    date = formatDate(dateObject);
  }
  return (
    <>
      {article && (
        <div className="relative h-[169px] w-[384px] rounded-[8px] bg-gray-50 px-[24px] pb-[16px] pt-[46px]">
          <div className="absolute left-[24px] top-0">
            <BestBadge />
          </div>
          <div className="flex h-full flex-col place-content-between">
            <div className="flex gap-[8px]">
              <div className="text-20px font-semibold text-gray-800 md:text-[18px]">
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
              <div className="flex items-center gap-2">
                <div className="text-[14px] font-normal text-gray-600">
                  {article.writer.nickname}
                </div>
                <div className="flex items-center">
                  <Heart width={16} height={16} />
                  <div className="text-[14px] font-normal text-gray-500">
                    {article.likeCount}
                  </div>
                </div>
              </div>
              <div className="text-[14px] font-normal text-gray-400">
                {date}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostCard;
