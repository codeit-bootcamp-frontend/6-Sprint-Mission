import ProfileDefault from "@/public/images/profile_default.png";
import EmptyComments from "@/public/images/Img_reply_empty.png";
import { Comment } from "@/types";

import Image from "next/image";
import formatTimeAgo from "@/utils/formatTimeAgo";
import { CommentSchemaType } from "@/schema/comment";

export default function CommentList({
  comments,
}: {
  comments: CommentSchemaType[];
}) {
  return (
    <>
      {comments?.map((comment) => {
        return (
          <div className="flex flex-col gap-6 mb-6" key={comment.id}>
            <div>{comment.content}</div>
            <div className="flex items-center gap-2">
              <Image
                src={ProfileDefault}
                width={32}
                height={32}
                alt="댓글프로필이미지"
              />
              <div>
                <p className="text-gray-600">{comment.writer.nickname}</p>
                <p className="text-gray-400">
                  {formatTimeAgo(comment.updatedAt)}
                </p>
              </div>
            </div>
            <hr className="h-[1px] bg-gray-200" />
          </div>
        );
      })}
    </>
  );
}
