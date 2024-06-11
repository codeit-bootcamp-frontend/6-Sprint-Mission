import { IBoardComment } from "@/@types";
import formatTime from "@/utills/timeFormat";
import Image from "next/image";

export default function BoardCommentItem({
  comment,
}: {
  comment: IBoardComment;
}) {
  return (
    <div className="borderBottom">
      <div className="flexBetween">
        <p>{comment.content}</p>
        <Image src="/images/ic_group.png" width={3} height={13} alt="더보기" />
      </div>
      <div className="profileArea">
        <Image
          src="/images/ic_profile.png"
          alt="profile"
          width={32}
          height={32}
          className="profile"
        />
        <div className="profileText">
          <p className="nickname">{comment.writer.nickname}</p>
          <p className="regDate">{formatTime(comment.createdAt)}</p>
        </div>
      </div>
    </div>
  );
}
